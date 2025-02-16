"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";

export default function EditQuiz() {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.id;

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      scheduledAt: "",
      questions: 0,
      maxScore: 0,
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quizzes/${quizId}`);
        if (!res.ok) throw new Error("Failed to fetch quiz");

        const data = await res.json();

        if (data.success && data.quiz) {
          setValue("title", data.quiz.title || "");
          setValue("description", data.quiz.description || "");
          setValue(
            "scheduledAt",
            data.quiz.scheduledAt ? new Date(data.quiz.scheduledAt).toISOString().slice(0, 16) : ""
          );
          setValue("questions", data.quiz.questions || 0);
          setValue("maxScore", data.quiz.maxScore || 0);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchQuiz();
  }, [quizId, setValue]);

  interface QuizFormData {
    title: string;
    description: string;
    scheduledAt: string;
    questions: number;
    maxScore: number;
  }

  const onSubmit = async (data: QuizFormData) => {
    const updatedQuiz = {
      ...data,
      questions: Number(data.questions),
      maxScore: Number(data.maxScore),
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
    };

    try {
      const res = await fetch(`/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQuiz),
      });

      const result = await res.json();
      if (result.success) {
        toast({ title: "Success", description: "Quiz updated successfully!", variant: "default" });
        router.push("/dashboard");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="mx-auto md:ml-64 flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Edit Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Title</FormLabel>
                        <FormControl>
                          <Input {...field} required className="dark:bg-gray-700 dark:text-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="dark:text-gray-300">Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} required className="dark:bg-gray-700 dark:text-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduledAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Scheduled Date</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} className="dark:bg-gray-700 dark:text-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="questions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Number of Questions</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} required className="dark:bg-gray-700 dark:text-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-gray-300">Max Score</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} required className="dark:bg-gray-700 dark:text-white" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </FormProvider>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
