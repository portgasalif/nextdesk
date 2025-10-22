import EmployeeNavbar from "@/components/EmployeeNavbar";
export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmployeeNavbar />
      {children}
    </>
  );
}
