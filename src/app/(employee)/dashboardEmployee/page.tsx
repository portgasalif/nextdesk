"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Request = {
  id: number;
  subject: string;
  category: string;
  createdAt: string;
  status: string;
};

export default function DashboardEmployeePage() {
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
        const user = JSON.parse(userAccount);
        const response = await fetch(`/api/requests?userId=${user.id}`);
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
        return "bg-amber-100 text-amber-800";
      case "in-progress":
        return "bg-sky-100 text-sky-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          My Requests
        </h1>
        <p className="text-slate-600">Track and manage your submitted requests</p>
      </div>
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full text-center">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-900">
            <tr>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                No
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Subject
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Category
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Date
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {requests.map((request, index) => (
              <tr
                key={request.id}
                className="even:bg-slate-50 hover:bg-slate-100 transition-all duration-200"
              >
                <td className="px-6 py-4 text-base text-slate-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-base text-slate-900">
                  {request.subject}
                </td>
                <td className="px-6 py-4 text-base text-slate-700">
                  {request.category}
                </td>
                <td className="px-6 py-4 text-base text-slate-700">
                  {new Date(request.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-base">
                  <span
                    className={`px-3 py-1.5 rounded-full font-semibold text-sm ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
