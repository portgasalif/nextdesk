"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getRequestStatusColor } from "@/lib/utils/statusHelpers";

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
  const pendingRequests = requests.filter(
    (req) => req.status === "pending",
  ).length;
  const completedRequests = requests.filter(
    (req) => req.status === "completed",
  ).length;

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

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6 ">
        <h1 className="text-3xl font-bold mb-2 text-slate-800">My Requests</h1>
        <p className="text-slate-600 mb-6">
          Track and manage your submitted requests
        </p>

        <div className="flex gap-4 justify-between items-center">
          <div className="grid grid-cols-2 max-w-sm gap-4">
            <div className="border border-gray-100 shadow-sm p-4  text-center rounded-xl">
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl  font-bold text-yellow-800">
                {pendingRequests}
              </p>
            </div>
            <div className="border border-gray-100 shadow-sm p-4  text-center rounded-xl">
              <p className="text-sm text-gray-600">Completed Requests</p>
              <p className="text-2xl  font-bold text-green-800">
                {completedRequests}
              </p>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="text-white font-semibold py-3 px-5 w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 rounded-xl cursor-pointer "
              onClick={() => router.push("/dashboardEmployee/new-request")}
            >
              New Request
            </button>
          </div>
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
                    {new Date(request.createdAt).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-base">
                    <span
                      className={`px-3 py-1.5 rounded-full font-semibold text-sm ${getRequestStatusColor(
                        request.status,
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
