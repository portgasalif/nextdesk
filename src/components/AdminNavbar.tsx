"use client";
import { useRouter } from "next/navigation";
export default function AdminNavbar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <nav className="bg-white shadow border-b flex justify-between items-center p-4 h-16">
      <h2
        className="text-xl font-bold
  text-blue-900"
      >
        NextDesk Admin
      </h2>
      <div className="space-x-4 flex items-center text-blue-900">
        <a
          href="/dashboard"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Dashboard
        </a>
        <span
          className="text-gray-400 cursor-not-allowed"
          title="Feature coming soon"
        >
          Reports
        </span>
        <span
          className="text-gray-400 cursor-not-allowed"
          title="Feature coming soon"
        >
          Settings
        </span>
        <button
          onClick={handleLogout}
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
