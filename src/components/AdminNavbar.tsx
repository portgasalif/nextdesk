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
          href="/dashboardAdmin"
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
          className="px-3 py-1.5 text-sm border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold rounded-lg transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
