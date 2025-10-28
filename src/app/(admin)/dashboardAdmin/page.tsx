"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

type Request = {
  id: number;
  user: {
    name: string;
    department: string;
  };
  subject: string;
  category: string;
  createdAt: string;
  status: string;
};

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userAccount = localStorage.getItem("user");
        if (!userAccount) {
          alert("User not logged in");
          router.push("/");
          return;
        }

        const response = await fetch("/api/requests");
        const data = await response.json();
        if (response.ok) {
          setRequests(data.requests);
        } else {
          console.error("Failed to fetch:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchRequests();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setLoading(id);
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setLoading(null);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage all employee requests</p>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-blue-900">
            <tr>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                No
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                Employee
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                Subject
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                Category
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                Date
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
                Status
              </th>
              <th className="px-6 py-3 text-sm uppercase font-medium tracking-wider text-white">
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
              {requests.map((request, index) => (
                <tr
                  key={request.id}
                  className="even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-base text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900 font-medium">
                    {request.user.name} <br />
                    <span className="text-sm text-gray-500">
                      {request.user.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900">
                    {request.subject}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900">
                    {request.category}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-900">
                    <span
                      className={`px-2 py-1 rounded-full font-semibold text-base ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request.id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading === request.id}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
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
