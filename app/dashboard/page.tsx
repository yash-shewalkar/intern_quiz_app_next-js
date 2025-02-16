"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, TrashIcon, PencilIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";

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
  const { toast } = useToast();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async (quizId: string) => {
    try {
      const res = await fetch(`/api/quizzes/${quizId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
        toast({ title: "Quiz Deleted", description: "The quiz has been removed successfully." });
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      toast({ title: "Error", description: "Failed to delete quiz.", variant: "destructive" });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className={`flex-1 flex flex-col items-center justify-center p-6 ${isMobile ? "mx-auto" : "ml-64"}`}>
        <h2 className="text-3xl font-bold text-center">Quiz Management</h2>
        <p className="text-gray-700 dark:text-gray-400 mb-6 text-center">Manage and monitor all your quizzes from one place</p>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : quizzes.length === 0 ? (
          <p className="text-gray-500 text-center">No quizzes available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full px-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="shadow-md transition-transform hover:scale-105 hover:shadow-lg p-4 dark:bg-gray-800 dark:text-white">
                <CardHeader>
                  <h3 className="text-lg font-semibold">{quiz.title}</h3>
                  <p className="text-gray-600 text-sm dark:text-white">{quiz.description}</p>
                </CardHeader>
                <CardContent className="text-sm text-gray-4 00">
                  <p>📅 Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                  <p>📅 Scheduled: {quiz.scheduledAt ? new Date(quiz.scheduledAt).toLocaleString() : "Not Set"}</p>
                  <p>❓ Questions: {quiz.questions}</p>
                  <p>🏆 Max Marks: {quiz.maxScore}</p>
                </CardContent>

                {/* Buttons: Ensure proper layout with flex-wrap */}
                <CardFooter className="flex flex-wrap justify-between gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => router.push(`/dashboard/edit/${quiz.id}`)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex items-center">
                        <TrashIcon className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>Are you sure you want to delete this quiz?</AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button onClick={() => handleDelete(quiz.id)}>Yes, Delete</Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
