"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function CreateQuizPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    questions: "",
    maxScore: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const teacherId = getCookie("teacherId");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          teacherId,
          questions: Number(formData.questions),
          maxScore: Number(formData.maxScore),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast({ title: "Quiz Created", description: "The quiz has been successfully created!" });
        setFormData({ title: "", description: "", scheduledAt: "", questions: "", maxScore: "" });
        router.push("/dashboard");
      } else {
        toast({ title: "Error", description: data.error || "Failed to create quiz", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <Sidebar />

      <main className="mx-auto flex-1 flex flex-col items-center justify-center p-10 md:ml-64">
        <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create a Quiz</h2>
            <p className="text-gray-600 dark:text-gray-400">Fill in the details to create a new quiz</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">Quiz Title</label>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter quiz title"
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter quiz description"
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium dark:text-gray-300">Schedule Date & Time</label>
                <Input
                  type="datetime-local"
                  name="scheduledAt"
                  value={formData.scheduledAt}
                  onChange={handleChange}
                  required
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300">Number of Questions</label>
                  <Input
                    type="number"
                    name="questions"
                    value={formData.questions}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium dark:text-gray-300">Max Score</label>
                  <Input
                    type="number"
                    name="maxScore"
                    value={formData.maxScore}
                    onChange={handleChange}
                    required
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
