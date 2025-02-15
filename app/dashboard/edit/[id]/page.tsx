"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditQuiz() {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id;

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: 0,
    maxScore: 0,
    scheduledAt: "", // Store in `datetime-local` format (YYYY-MM-DDTHH:MM)
  });

  // Fetch quiz details
  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizzes/${quizId}`);
        if (!res.ok) throw new Error("Failed to fetch quiz");

        const data = await res.json();

        if (data.success && data.quiz) {
          console.log("Fetched Quiz Data:", data.quiz);

          setQuiz({
            title: data.quiz.title || "",
            description: data.quiz.description || "",
            scheduledAt: data.quiz.scheduledAt
              ? new Date(data.quiz.scheduledAt).toISOString().slice(0, 16) // Convert to `YYYY-MM-DDTHH:MM`
              : "",
            questions: data.quiz.questions || 0,
            maxScore: data.quiz.maxScore || 0,
          });
        } else {
          console.error("Error fetching quiz:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert `scheduledAt` to full `Date` object for Prisma
    const updatedQuiz = {
      ...quiz,
      questions: Number(quiz.questions), // Convert to integer
      maxScore: Number(quiz.maxScore),   // Convert to integer
      scheduledAt: quiz.scheduledAt ? new Date(quiz.scheduledAt) : null, // Convert back to full DateTime
    };

    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQuiz),
      });

      const data = await res.json();
      if (data.success) {
        alert("Quiz updated successfully!");
        router.push("/dashboard");
      } else {
        alert("Error updating quiz: " + data.error);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6 text-black bg-white border">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Scheduled Date:</label>
          <input
            type="datetime-local"
            name="scheduledAt"
            value={quiz.scheduledAt}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Questions:</label>
          <input
            type="number"
            name="questions"
            value={quiz.questions}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Max Score:</label>
          <input
            type="number"
            name="maxScore"
            value={quiz.maxScore}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}
