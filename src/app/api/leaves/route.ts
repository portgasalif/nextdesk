import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, leaveType, startDate, endDate, reason } =
      await request.json();

    if (!userId || !leaveType || !startDate || !endDate) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    if (new Date(endDate) < new Date(startDate)) {
      return NextResponse.json(
        { message: "End date must be after or equal to start date" },
        { status: 400 }
      );
    }
    const newLeave = await prisma.leave.create({
      data: {
        userId,
        leaveType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
      },
    });
    return NextResponse.json(
      {
        status: "success",
        leave: newLeave,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Leave creation error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    let leaves;
    if (userId) {
      leaves = await prisma.leave.findMany({
        where: { userId: parseInt(userId) },
        include: { user: true },
      });
    } else {
      leaves = await prisma.leave.findMany({
        include: { user: true },
      });
    }
    return NextResponse.json({ leaves });
  } catch (error) {
    console.error("Leave creation error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
