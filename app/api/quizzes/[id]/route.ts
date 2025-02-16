import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//  GET QUIZ BY ID
export async function GET(req: NextRequest, { params }: { params: Promise< { id: string } >}) {
  const id =(await params).id;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        scheduledAt: true,
        questions: true,
        maxScore: true,
      },
    });

    if (!quiz) {
      return NextResponse.json({ success: false, error: "Quiz not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, quiz });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) + " Database error" }, { status: 500 });
  }
}

//  UPDATE QUIZ BY ID
export async function PUT(req: NextRequest, { params }: { params:  Promise< { id: string } >}){
  const id =(await params).id;
  try {
    const body = await req.json(); // Get all update fields dynamically

    // Ensure at least one field is being updated
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ success: false, error: "No updates provided" }, { status: 400 });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id:id },
      data: body, // Pass the entire request body to update multiple fields dynamically
    });

    return NextResponse.json({
      success: true,
      message: "Quiz updated successfully",
      quiz: updatedQuiz,
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) + " Quiz not found or database error" }, { status: 500 });
  }
}

// DELETE QUIZ BY ID
export async function DELETE(req: NextRequest, { params }: { params: Promise< { id: string } >}) {
  const id =(await params).id;
  try {
    await prisma.quiz.delete({ where: { id: id } });

    return NextResponse.json({ success: true, message: "Quiz deleted successfully" });

  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) + " Quiz not found or database error" }, { status: 500 });
  }
}
