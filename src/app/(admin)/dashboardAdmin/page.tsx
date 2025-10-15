"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
          console.log("Failed to fetch:", data.message);
        }
      } catch (error) {
        console.log(`failed to fetch: ${error}`);
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

  const handleStatusChange = (id: number, newStatus: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
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
                    className="border border-gray-300 rounded px-3 py-2 text-base"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
