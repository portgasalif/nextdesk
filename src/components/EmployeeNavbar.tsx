"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmployeeNavbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow border-b flex justify-between items-center p-4 h-16">
      <h2
        className="text-xl font-bold 
  text-blue-900"
      >
        NextDesk
      </h2>
      <div className="space-x-4 flex items-center text-blue-900">
        <Link
          href="/dashboardEmployee"
          className={`hover:text-blue-500 transition-colors duration-200 ${pathname === "/dashboardEmployee" ? "text-blue-600 font-semibold" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          href="/leaveRequest"
          className={`hover:text-blue-500 transition-colors duration-200 ${pathname === "/leaveRequest" ? "text-blue-600 font-semibold" : ""}`}
        >
          My Leaves
        </Link>
        <Link
          href="/profileEmployee"
          className={`hover:text-blue-500 transition-colors duration-200 ${pathname === "/profileEmployee" ? "text-blue-600 font-semibold" : ""}`}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
