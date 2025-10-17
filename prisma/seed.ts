import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const employeePassword = await bcrypt.hash("employee123", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      name: "Admin User",
      role: "admin",
      department: "IT",
    },
  });

  console.log("Created admin user:", admin.username);

  // Create employee user
  const employee = await prisma.user.upsert({
    where: { username: "employee" },
    update: {},
    create: {
      username: "employee",
      password: employeePassword,
      name: "Employee User",
      role: "employee",
      department: "Sales",
    },
  });

  console.log("Created employee user:", employee.username);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
