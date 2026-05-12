"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getLeaveStatusColor } from "@/lib/utils/statusHelpers";

type Leave = {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string | null;
  status: string;
  createdAt: string;
  user: {
    name: string;
    department: string | null;
  };
};
export default function LeaveManagement() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [loading, setLoading] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const totalLeaves = leaves.length;
  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "pending",
  ).length;
  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "approved",
  ).length;
  const rejectedLeaves = leaves.filter(
    (leave) => leave.status === "rejected",
  ).length;
  const filteredLeaves = leaves.filter((leave) => {
    const searchTerm = search.toLowerCase();
    const matchSearch =
      (leave.user.name.toLowerCase().includes(searchTerm) ||
        leave.leaveType.toLowerCase().includes(searchTerm) ||
        leave.reason?.toLowerCase().includes(searchTerm)) ??
      false;

    const matchStatus = statusFilter === "all" || leave.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setLoading(id);
    const userAccount = localStorage.getItem("user");
    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          approvedBy:
            newStatus === "approved" ? JSON.parse(userAccount!).id : null,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave.id === id ? { ...leave, status: newStatus } : leave,
          ),
        );
        toast.success("Leave status updated successfully");
      } else {
        toast.error(data.message || "Failed to update leave status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(null);
    }
  };
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const userAccount = localStorage.getItem("user");
        if (!userAccount) {
          toast.error("User not logged in");
          router.push("/");
          return;
        }

        const response = await fetch("/api/leaves");
        const data = await response.json();

        if (response.ok) {
          setLeaves(data.leaves);
        } else {
          console.error("Failed to fetch:", data.message);
          toast.error("Failed to fetch leaves");
        }
      } catch (error) {
        console.error("failed to fetch leaves:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchLeaves();
  }, [router]);
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">
          Employee Leaves
        </h1>
        <p className="text-slate-600 mb-6">
          Review and approve leave requests from all employees
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="border border-gray-100 shadow-sm p-4 text-center rounded-xl ">
            <p className="text-sm text-gray-600">Total Leave Requests</p>
            <p className="text-2xl font-bold text-gray-800">{totalLeaves}</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-4 text-center rounded-xl ">
            <p className="text-sm text-gray-600">Total Pending Requests</p>
            <p className="text-2xl font-bold text-gray-800">{pendingLeaves}</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-4 text-center rounded-xl ">
            <p className="text-sm text-gray-600">Total Rejected Requests</p>
            <p className="text-2xl font-bold text-gray-800">{rejectedLeaves}</p>
          </div>
          <div className="border border-gray-100 shadow-sm p-4 text-center rounded-xl ">
            <p className="text-sm text-gray-600">Total Approved Requests</p>
            <p className="text-2xl font-bold text-gray-800">{approvedLeaves}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name, leave type , or reason"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-xl w-3/4 focus:ring-2 focus:ring-blue-500 focus:outline-none  "
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-xl w-1/4 focus:ring-2 focus:ring-blue-500 focus:outline-none  "
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-gray-100">
        <table className="w-full text-center">
          <thead className="bg-blue-900">
            <tr>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                No
              </th>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                Employee
              </th>

              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                Leave Type
              </th>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                Start Date
              </th>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                End Date
              </th>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                Reason
              </th>
              <th className="px-6 py-3 uppercase font-medium tracking-wider text-white text-sm">
                Action
              </th>
            </tr>
          </thead>
          {isFetching ? (
            <tbody>
              <tr>
                <td colSpan={7} className="py-16">
                  <div className="flex justify-center items-center">
                    <MoonLoader color="#1e3a8a" size={60} />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-200">
              {filteredLeaves.map((leave, index) => (
                <tr
                  key={leave.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-base text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {leave.user.name} <br />
                    <span className="text-sm text-gray-500">
                      {leave.user.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {formatDate(leave.startDate)}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {formatDate(leave.endDate)}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    <select
                      value={leave.status}
                      onChange={(e) =>
                        handleStatusChange(leave.id, e.target.value)
                      }
                      className={`border border-gray-300 rounded px-3 py-2 ${getLeaveStatusColor(
                        leave.status,
                      )} disabled:cursor-not-allowed`}
                      disabled={loading === leave.id}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
