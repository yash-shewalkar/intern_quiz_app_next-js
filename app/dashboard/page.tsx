"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  scheduledAt: string | null;
  questions: number;
  maxScore: number;
}

export default function DashboardPage() {
  const teacherId = getCookie("teacherId");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!teacherId) return;

    async function fetchQuizzes() {
      try {
        const res = await fetch(`/api/quizzes?teacherId=${teacherId}`);
        const data = await res.json();
        if (data.success) {
          setQuizzes(data.quizzes);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [teacherId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const res = await fetch(`/api/quizzes/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 text-black">
      <h2 className="text-2xl font-bold text-white">Quiz Management</h2>
      <p className="text-slate-200 mb-4">Manage and monitor all your quizzes from one place</p>
      <p className="text-slate-200 mb-4">{teacherId}</p>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="p-4 border rounded-lg shadow-sm bg-white relative">
              <h3 className="text-lg font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>

              <div className="grid grid-cols-2 mt-2 text-gray-500 text-sm">
                <p>📅 Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                <p>📅 Scheduled: {quiz.scheduledAt ? new Date(quiz.scheduledAt).toLocaleString() : "Not Set"}</p>

                <p>❓ Questions: {quiz.questions}</p>
                <p>🏆 Max Marks: {quiz.maxScore}</p>
              </div>

              {/* Edit & Delete Icons */}
              <div className="absolute top-3 right-3 space-x-2">
                <button onClick={() => router.push(`/dashboard/edit/${quiz.id}`)} className="text-blue-600 hover:text-blue-800">
                  ✏️
                </button>
                <button onClick={() => handleDelete(quiz.id)} className="text-red-600 hover:text-red-800">
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
