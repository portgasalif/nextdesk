import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const username = data.username?.trim();
    const password = data.password?.trim();
    const name = data.name?.trim();
    const department = data.department?.trim();

    if (!username || !password || !name || !department) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 409 }
      );
    }
    const pass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: pass,
        name,
        department,
        role: "employee",
      },
    });
    const { password: _, ...user } = newUser;
    return NextResponse.json(
      {
        message: "Registration successful",
        user: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
