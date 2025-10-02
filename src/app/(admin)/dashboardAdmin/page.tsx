"use client";
import { useState } from "react";

export default function AdminDashboardPage() {
  // Mock data semua request dari berbagai employee
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      subject: "Laptop won't boot",
      category: "IT Support",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      subject: "AC broken room 201",
      category: "Facilities",
      date: "2024-01-14",
      status: "in-progress",
    },
    {
      id: 3,
      employeeName: "Bob Wilson",
      subject: "Printer not working",
      category: "IT Support",
      date: "2024-01-13",
      status: "completed",
    },
    {
      id: 4,
      employeeName: "Sarah Johnson",
      subject: "Need new office chair",
      category: "Equipment",
      date: "2024-01-12",
      status: "pending",
    },
  ]);

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
                  {request.employeeName}
                </td>
                <td className="px-6 py-4 text-base text-gray-900">
                  {request.subject}
                </td>
                <td className="px-6 py-4 text-base text-gray-900">
                  {request.category}
                </td>
                <td className="px-6 py-4 text-base text-gray-900">
                  {request.date}
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
