import EmployeeNavbar from "@/components/EmployeeNavbar";
export default function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <EmployeeNavbar />
      </header>
      <div>{children}</div>
    </div>
  );
}
