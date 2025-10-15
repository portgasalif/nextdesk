"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Request = {
  id: number;
  subject: string;
  category: string;
  createdAt: string;
  status: string;
};

export default function DashboardEmployeePage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userAccount = localStorage.getItem("user");
        if (!userAccount) {
          alert("User not logged in");
          router.push("/");
          return;
        }
        const user = JSON.parse(userAccount);
        const response = await fetch(`/api/requests?userId=${user.id}`);
        const data = await response.json();
        if (response.ok) {
          setRequests(data.requests);
        } else {
          console.log("Failed to fetch:", data.message);
        }
      } catch (error) {
        console.log(`failed to fetch: ${error}`);
      }
    };
    fetchRequests();
  }, [router]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 ">My Requests</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Subject
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Category
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {index + 1}{" "}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {request.subject}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {request.category}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {new Date(request.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-left">
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
