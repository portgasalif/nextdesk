"use client";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();

  const handleEmployeeLogin = () => {
    router.push("/dashboard/new-request");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          NextDesk - IT Help Desk
        </h1>
        <div className="flex flex-col space-y-4 ">
          <input
            type="text"
            placeholder="Username"
            required
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            onClick={handleEmployeeLogin}
          >
            Login as Employee
          </button>
          <button
            type="submit"
            className="bg-gray-300 text-white py-2 rounded-md hover:bg-gray-500 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            onClick={handleEmployeeLogin}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
