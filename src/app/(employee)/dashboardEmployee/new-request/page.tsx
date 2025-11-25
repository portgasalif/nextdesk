"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewRequestPage() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const userAccount = localStorage.getItem("user");
      if (!userAccount) {
        toast.error("User not logged in");
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
        toast.success("Request submitted successfully!");
        router.push("/dashboardEmployee");
      } else {
        toast.error(data.message || "Request submission failed");
        console.error("Request submission failed:", data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Request submission error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 ">
      <div className="max-w-4xl mx-auto bg-white  rounded-xl shadow-xl border border-slate-200 p-8 ">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create New Request
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="category"
              className="block font-medium text-slate-900 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-2 border rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300"
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
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block font-medium text-slate-900 mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Brief description of your request"
              required
              className="w-full px-4 py-2 border rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-slate-900 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide detailed information about your request"
              required
              rows={4}
              className="w-full px-4 py-2 border rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 border-gray-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full text-white py-4 px-6 rounded-xl bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
