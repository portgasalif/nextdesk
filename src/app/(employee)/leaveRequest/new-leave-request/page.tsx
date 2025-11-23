"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLeaveRequestPage() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Leave Request Page
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="leave-type-select"
              className="block  font-medium text-gray-700 mb-2"
            >
              Leave Type
            </label>
            <select
              id="leave-type-select"
              name="leave-type-select"
              onChange={(e) => setLeaveType(e.target.value)}
              value={leaveType}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label
                htmlFor="start-date"
                className="block  font-medium text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                id="start-date"
                name="start-date"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="end-date"
                className="block  font-medium text-gray-700 mb-2"
              >
                End Date
              </label>
              <input
                id="end-date"
                name="end-date"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block font-medium text-gray-700 mb-2"
            >
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Provide detailed information about your request"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
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
