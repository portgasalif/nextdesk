"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
    } catch (error) {
      console.log("An error occurred. Please try again.", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 ">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-slate-800">
            Change Password
          </h1>
          <p className="text-slate-600">Update your account password</p>
        </div>
        <button
          type="button"
          className="font-semibold py-3 px-6 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-100"
          onClick={() => router.push("/profileEmployee")}
        >
          Back
        </button>
        <div className="bg-white rounded-xl shadow-lg p-8 border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-700 font-medium mb-2 text-lg block">
                Current Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium mb-2 text-lg block">
                New Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500  focus:outline-none focus:border-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium text-lg mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                className="bg-gray-50 border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-4">
              <button className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-950 rounded-xl font-semibold hover:from-blue-950 hover:to-blue-900 text-white  ">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
