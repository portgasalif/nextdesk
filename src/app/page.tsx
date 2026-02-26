"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      toast.error("Please enter both username and password.");
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
          toast.success("Login successful! Welcome Admin.");
        } else {
          router.push("/dashboardEmployee");
          toast.success(`Login successful! Welcome ${data.user.name}.`);
        }
      } else {
        toast.error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: "admin" | "employee") => {
    const demoUsername = role === "admin" ? "demo_admin" : "demo_employee";
    const demoPassword = role === "admin" ? "admin123" : "user123";
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: demoUsername,
          password: demoPassword,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (role === "admin") {
          router.push("/dashboardAdmin");
          toast.success("Demo login successful! Welcome Admin.");
        } else {
          router.push("/dashboardEmployee");
          toast.success(`Demo login successful! Welcome ${data.user.name}.`);
        }
      } else {
        toast.error(data.message || "Demo login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during demo login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">NextDesk</h1>
            <p className="text-gray-600 text-sm">IT Help Desk System</p>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username-input"
                type="text"
                placeholder="Enter your username"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password-input"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-center text-gray-400 font-medium uppercase tracking-wider">
              Try Demo Account
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-2.5 px-4 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                onClick={() => handleDemoLogin("employee")}
                disabled={loading}
              >
                Employee
              </button>
              <button
                type="button"
                className="py-2.5 px-4 bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                onClick={() => handleDemoLogin("admin")}
                disabled={loading}
              >
                Admin
              </button>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-3 py-4 px-6 border border-blue-950 text-blue-950 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200"
            onClick={() => router.push("/auth/register")}
          >
            Create Account
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              disabled
              className="text-sm text-gray-400 cursor-not-allowed"
              title="Feature coming soon"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
