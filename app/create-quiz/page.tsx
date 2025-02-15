"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
export default function CreateQuizPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    questions: "",
    maxScore: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // hardcoded teacher ID for now
  const teacherId = getCookie("teacherId");
  // const teacherId = "85269a52-2605-425e-8faf-026abb644d71";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          teacherId, // Send teacher ID with the request
          questions: Number(formData.questions),
          maxScore: Number(formData.maxScore),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Quiz created successfully!");
        setSuccess(true);
        setFormData({ title: "", description: "", scheduledAt: "", questions: "", maxScore: "" });
      } else {
        setMessage(data.error || "Failed to create quiz");
        setSuccess(false);
      }
    } catch (error) {
      setMessage(error + " Something went wrong. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-md shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>

      {message && success && <p className="text-center text-green-500">{message}</p>}
      {message && !success && <p className="text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Quiz Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="datetime-local"
          name="scheduledAt"
          value={formData.scheduledAt}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          name="questions"
          placeholder="Number of Questions"
          value={formData.questions}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <input
          type="number"
          name="maxScore"
          placeholder="Max Score"
          value={formData.maxScore}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
}
