"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EmployeeNavbar from "@/components/EmployeeNavbar";

type User = {
  id: number;
  username: string;
  name: string;
  role: string;
  department: string;
  createdAt: string;
};

export default function ProfileEmployeePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userAccount = localStorage.getItem("user");
    if (!userAccount) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(userAccount));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <EmployeeNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-slate-600">Manage your account information</p>
          </div>

          {/* Profile Info Card */}
          <div className="bg-white shadow-xl rounded-xl p-8 border border-slate-200 mb-6">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-600">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Username
                </label>
                <p className="text-lg text-slate-900 mt-1">{user.username}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Full Name
                </label>
                <p className="text-lg text-slate-900 mt-1">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Department
                </label>
                <p className="text-lg text-slate-900 mt-1">{user.department}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Role
                </label>
                <p className="text-lg text-slate-900 mt-1 capitalize">{user.role}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Member Since
                </label>
                <p className="text-lg text-slate-900 mt-1">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => router.push("/profileEmployee/change-password")}
              className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-between"
            >
              <span>Change Password</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
