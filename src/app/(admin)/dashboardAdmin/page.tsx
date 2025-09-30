"use client";
import { useState } from "react";

export default function AdminDashboardPage() {
  // Mock data semua request dari berbagai employee
  const [requests, setRequests] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      subject: "Laptop won't boot",
      category: "IT Support",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      subject: "AC broken room 201",
      category: "Facilities",
      date: "2024-01-14",
      status: "in-progress",
    },
    {
      id: 3,
      employeeName: "Bob Wilson",
      subject: "Printer not working",
      category: "IT Support",
      date: "2024-01-13",
      status: "completed",
    },
    {
      id: 4,
      employeeName: "Sarah Johnson",
      subject: "Need new office chair",
      category: "Equipment",
      date: "2024-01-12",
      status: "pending",
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage all employee requests</p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Employee</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>{request.employeeName}</td>
                <td>{request.subject}</td>
                <td>{request.category}</td>
                <td>{request.date}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
