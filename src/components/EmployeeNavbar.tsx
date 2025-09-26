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
          href=""
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Dashboard
        </a>
        <a
          href=""
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Progress
        </a>
        <a
          href=""
          className="hover:text-blue-500 transition-colors duration-200 "
        >
          Profile
        </a>
        <button className="hover:text-blue-500 transition-colors duration-200 ">
          Logout
        </button>
      </div>
    </nav>
  );
}
