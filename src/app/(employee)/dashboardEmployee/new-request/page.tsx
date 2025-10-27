"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRequestPage() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const userAccount = localStorage.getItem("user");
      if (!userAccount) {
        alert("User not logged in");
        router.push("/");
        return;
      }
      const user = JSON.parse(userAccount);
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          subject,
          description,
          userId: user.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/dashboardEmployee");
      } else {
        alert(data.message || "Request submission failed");
        console.error("Request submission failed:", data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Request submission error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-black mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Request
        </h1>
        <form className="flex flex-col space-y-2 " onSubmit={handleSubmit}>
          <label className=" font-medium text-gray-700">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="IT Support">IT Support</option>
            <option value="Facilities">Facilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Equipment">Equipment</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Other">Other</option>
          </select>

          <label className=" font-medium text-gray-700">Subject</label>
          <input
            type="text"
            placeholder="Brief description of your request"
            required
            className="px-4 py-2 border rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <label className=" font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Provide detailed information about your request"
            required
            rows={4}
            className="px-4 py-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-950 text-white py-2 rounded-md hover:bg-blue-800 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
