"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          router.push("/dashboardAdmin");
        } else {
          router.push("/dashboardEmployee");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          NextDesk - IT Help Desk
        </h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
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
            type="submit"
            className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-3">
          <button
            type="button"
            className="w-full py-2 text-blue-950 border border-blue-950 rounded-md hover:bg-blue-50 transition-all duration-300"
          >
            Register
          </button>
          <button
            type="button"
            className="w-full py-2 text-gray-600 hover:text-blue-950 transition-colors duration-300 text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}
