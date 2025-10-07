"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    router.push("/dashboardEmployee");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          NextDesk - IT Help Desk
        </h1>
        <form className="flex flex-col space-y-4 ">
          <input
            type="text"
            placeholder="Username"
            required
            className="px-4 py-2 border rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
