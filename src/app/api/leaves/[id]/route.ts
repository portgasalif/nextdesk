import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const { status, approvedBy } = await request.json();

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid leave ID" },
        { status: 400 }
      );
    }
    if (!status) {
      return NextResponse.json(
        {
          message: "Status is required",
        },
        {
          status: 400,
        }
      );
    }

    const validStatuses = ["approved", "rejected", "pending"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          message: "Invalid status value",
        },
        { status: 400 }
      );
    }
    const existingLeaveRequest = await prisma.leave.findUnique({
      where: { id },
    });
    if (!existingLeaveRequest) {
      return NextResponse.json(
        {
          message: "Leave request not found",
        },
        { status: 404 }
      );
    }
    const updatedLeaveRequest = await prisma.leave.update({
      where: { id },
      data: { status, approvedBy },
      include: { user: true, approver: true },
    });
    return NextResponse.json(
      {
        message: "Leave request status updated successfully",
        leave: updatedLeaveRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating leave request status:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
