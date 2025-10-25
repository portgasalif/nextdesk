"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  username: string;
  department: string;
  role: string;
  createdAt: string;
};

export default function ProfileEmployeePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("User not logged in");
      router.push("/");
      return;
    } else {
      const user = JSON.parse(userData);
      setUser(user);
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="px-4 py-8 min-h-screen ">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
