"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";

type Request = {
  id: number;
  subject: string;
  category: string;
  createdAt: string;
  status: string;
};

export default function DashboardEmployeePage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userAccount = localStorage.getItem("user");
        if (!userAccount) {
          toast.error("User not logged in");
          router.push("/");
          return;
        }
        const user = JSON.parse(userAccount);
        const response = await fetch(`/api/requests?userId=${user.id}`);
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

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-800">
            My Requests
          </h1>
          <p className="text-slate-600">
            Track and manage your submitted requests
          </p>
        </div>
        <div>
          <button
            type="button"
            className="text-white font-semibold py-3 px-5 w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 rounded-xl cursor-pointer "
            onClick={() => router.push("/dashboardEmployee/new-request")}
          >
            New Leave Request
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
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
          {isFetching ? (
            <tbody>
              <tr>
                <td colSpan={5} className="py-16">
                  <div className="flex justify-center items-center">
                    <MoonLoader color="#1e3a8a" size={60} />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
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
          )}
        </table>
      </div>
    </div>
  );
}
