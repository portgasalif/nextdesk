"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners";

type Leave = {
  id: number;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
};
export default function LeaveRequestPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setLeaves([
        {
          id: 1,
          leaveType: "Cuti Tahunan",
          startDate: "2024-01-15",
          endDate: "2024-01-17",
          status: "approved",
        },
        {
          id: 2,
          leaveType: "Sakit",
          startDate: "2024-12-20",
          endDate: "2024-12-21",
          status: "pending",
        },
        {
          id: 3,
          leaveType: "Darurat",
          startDate: "2023-11-10",
          endDate: "2023-11-10",
          status: "rejected",
        },
      ]);
      setIsFetching(false);
    }, 1000);
  }, []);
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
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-800">
            Leave Request
          </h1>
          <p className="text-slate-600">
            This is the Leave Request page for employees.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="text-white font-semibold py-3 px-5 w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 rounded-xl cursor-pointer "
            onClick={() => router.push("/leaveRequest/new-leave-request")}
          >
            New Leave Request
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 ">
        <table className="w-full text-center">
          <thead className="bg-gradient-to-r from-slate-800 to-slate-900">
            <tr>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                No
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Leaves Type
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                Start Date
              </th>
              <th className="px-6 py-4 text-sm uppercase font-semibold tracking-wider text-white">
                End Date
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
              {leaves.map((leave, index) => (
                <tr
                  className="even:bg-slate-50 hover:bg-slate-100 transition-all duration-200"
                  key={leave.id}
                >
                  <td className="px-6 py-4 text-base text-slate-900 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-700 ">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-700 ">
                    {leave.startDate}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-700 ">
                    {leave.endDate}
                  </td>
                  <td className="px-6 py-4 text-base text-slate-700 ">
                    {
                      <span
                        className={`px-3 py-1.5 rounded-full font-semibold text-sm ${getStatusColor(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                    }
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
