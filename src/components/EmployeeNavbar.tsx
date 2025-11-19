"use client";
import Link from "next/link";

export default function EmployeeNavbar() {
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
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Dashboard
        </Link>
        <Link
          href="/leaveRequest"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          My Leaves
        </Link>
        <Link
          href="/profileEmployee"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}
