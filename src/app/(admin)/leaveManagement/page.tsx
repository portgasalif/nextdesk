"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";

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
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            leave.id === id ? { ...leave, status: newStatus } : leave
          )
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
        <p>Review and approve leave requests from all employees</p>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
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
              {leaves.map((leave, index) => (
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
                      className={`border border-gray-300 rounded px-3 py-2 ${getStatusColor(
                        leave.status
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
