"use client";
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
        <a
          href="/dashboardEmployee"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Dashboard
        </a>
        <a
          href="/dashboardEmployee/new-request"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          New Request
        </a>
        <a
          href="/profileEmployee"
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Profile
        </a>
      </div>
    </nav>
  );
}
