"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type User = {
  id: number;
  name: string;
  username: string;
  department: string;
  role: string;
  createdAt: string;
  annualLeaveQuota: number;
};

export default function ProfileEmployeePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [usedDays, setusedDays] = useState<number | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          router.push("/");
          return;
        } else {
          const user = JSON.parse(userData);
          setUser(user);
          const res = await fetch(`/api/leaves?userId=${user.id}`);
          const data = await res.json();
          const filteredLeaves = data.leaves.filter((leave: any) => {
            return (
              leave.status === "approved" &&
              new Date(leave.startDate).getFullYear() ===
                new Date().getFullYear()
            );
          });

          const totalUsedDays = filteredLeaves.reduce(
            (total: number, leave: any) => {
              const newDays =
                new Date(leave.endDate).getTime() -
                new Date(leave.startDate).getTime();
              const newDaysResult =
                Math.floor(newDays / (1000 * 60 * 60 * 24)) + 1;
              return total + newDaysResult;
            },
            0,
          );

          setusedDays(totalUsedDays);
        }
      } catch (error) {
        toast.error("Failed to load leave data");
      }
    };
    fetchData();
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="px-4 py-8 min-h-screen ">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">My Profile</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-800 ">{user.name}</h1>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8  ">
            <div>
              <label className="text-lg text-gray-500 uppercase tracking-wide font-semibold">
                Department
              </label>
              <p className="font-semibold text-gray-800 mt-1">
                {user.department}
              </p>
            </div>
            <div>
              <label className="text-lg text-gray-500 uppercase tracking-wide font-semibold">
                Leave Quota
              </label>
              <p className="font-semibold text-gray-800 mt-1">
                {usedDays === null ? "..." : user.annualLeaveQuota - usedDays}{" "}
                days remaining
              </p>
            </div>
            <div>
              <label className="text-lg text-gray-500 uppercase tracking-wide font-semibold">
                Employee Since
              </label>
              <p className="font-semibold text-gray-800 mt-1">
                {new Date(user.createdAt).toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <button
            type="button"
            className="text-white font-semibold py-4 px-6 w-full bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 rounded-xl "
            onClick={() => {
              router.push("/profileEmployee/change-password");
            }}
          >
            Change Password
          </button>
          <button
            type="button"
            className="text-white font-semibold py-4 px-6 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
