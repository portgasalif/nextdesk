export default function DashboardEmployeePage() {
  //mockdata
  const requests = [
    {
      subject: "Laptop won't boot",
      category: "IT Support",
      date: "2024-01-15",
      status: "pending",
    },
    {
      subject: "AC broken room 201",
      category: "Facilities",
      date: "2024-01-14",
      status: "completed",
    },
  ];

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
            <tr key={index}>
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
                {request.date}
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
