import AdminNavbar from "@/components/AdminNavbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}