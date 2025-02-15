import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// CREATE QUIZ (POST)
export async function POST(req: NextRequest) {
    try {
        const { title, description, scheduledAt, questions, maxScore, teacherId } = await req.json();

        if (!teacherId) {
            return NextResponse.json({ error: "Teacher ID is required" }, { status: 400 });
        }

        const quiz = await prisma.quiz.create({
            data: {
                title,
                description,
                scheduledAt: new Date(scheduledAt),
                questions,
                maxScore,
                teacherId,
            },
        });

        return NextResponse.json(quiz, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong: " + error }, { status: 500 });
    }
}

// GET QUIZZES BY TEACHER ID (GET)
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const teacherId = searchParams.get("teacherId");

        if (!teacherId) {
            return NextResponse.json({ success: false, error: "Teacher ID is required" }, { status: 400 });
        }

        const quizzes = await prisma.quiz.findMany({
            where: { teacherId },
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

        return NextResponse.json({ success: true, quizzes });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ success: false, error: "Database error: " + error }, { status: 500 });
    }
}
