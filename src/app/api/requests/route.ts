import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { subject, description, category, userId } = await request.json();

    if (!subject || !description || !category || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const newRequest = await prisma.request.create({
      data: {
        subject,
        description,
        category,
        userId,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        request: newRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    let requests;
    if (userId) {
      requests = await prisma.request.findMany({
        where: { userId: parseInt(userId) },
        include: { user: true },
      });
    } else {
      requests = await prisma.request.findMany({
        include: { user: true },
      });
    }
    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Request fetching error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
