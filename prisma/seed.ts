import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const employeePassword = await bcrypt.hash("user123", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { username: "demo_admin" },
    update: {},
    create: {
      username: "demo_admin",
      password: adminPassword,
      name: "Demo Admin",
      role: "admin",
      department: "IT",
    },
  });

  console.log("Created admin user:", admin.username);

  // Create employee user
  const employee = await prisma.user.upsert({
    where: { username: "demo_employee" },
    update: {},
    create: {
      username: "demo_employee",
      password: employeePassword,
      name: "Demo Employee",
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
