"use client";

import { ModeToggle } from "@/components/darkmode";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// Import ShadCN Background Component


export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar />



      {/* Main Content - Centered Relative to Sidebar */}
      <main className="mx-auto md:ml-64 flex-1 flex flex-col items-center justify-center p-10 relative z-10">
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Welcome to QuizMaster!
            </h1>
            <ModeToggle />
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            Create, manage, and take quizzes with ease. Whether you're a teacher, student, or just love quizzes, this platform has everything you need.
          </p>

          <Separator className="mb-10" />

          {/* Tabs Section (Above Features) */}
          <div className="mb-16">
            <Tabs defaultValue="create" className="w-full">
              {/* Tabs List with Bigger Text */}
              <TabsList className="grid w-full grid-cols-2 h-fit bg-muted dark:bg-gray-800 ">
                <TabsTrigger value="create" className="text-lg md:text-xl py-3 dark:text-gray-100">
                  Create Quiz
                </TabsTrigger>
                <TabsTrigger value="manage" className="text-lg md:text-xl py-3 ">
                  Manage Quiz
                </TabsTrigger>
              </TabsList>

              {/* Create Quiz Tab Content */}
              <TabsContent value="create" className="mt-6 space-y-6">
                <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
                  <CardTitle className="text-2xl font-bold">Create Your Own Quiz</CardTitle>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
                    Start building engaging quizzes with customizable options.
                  </p>
                  <button className="mt-6 px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                   onClick={()=> router.push("/create-quiz")}>
                    Start Creating
                  </button>
                </Card>
              </TabsContent>

              {/* Manage Quiz Tab Content */}
              <TabsContent value="manage" className="mt-6 space-y-6">
                <Card className="p-8 bg-white dark:bg-gray-800 shadow-lg">
                  <CardTitle className="text-2xl font-bold">Manage Your Quizzes</CardTitle>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mt-3">
                    View, edit, and track the performance of your quizzes.
                  </p>
                  <button className="mt-6 px-8 py-4 text-lg font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700"
                   onClick={()=> router.push("/dashboard")}>
                    Go to Dashboard
                  </button>
                </Card>
              </TabsContent>
            </Tabs>

          </div>

          {/* Features Section - Zig-Zag Layout */}
          <div className="space-y-16">
            {/* Feature 1 - Normal Order */}
            <Card className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-lg">
              <Image
                src="/online-exam.png"
                alt="Create Quiz"
                width={400}
                height={250}
                className=" object-contain w-full md:w-1/2"
              />
              <CardContent className="md:w-1/2 md:pl-10 text-center md:text-left">
                <CardTitle className="text-xl font-semibold">Create Your Own Quiz</CardTitle>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Design quizzes with customizable questions, set difficulty levels, and schedule them for later.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 - Reverse Order */}
            <Card className="flex flex-col md:flex-row-reverse items-center bg-white dark:bg-gray-800 shadow-lg">
              <Image
                src="/creative.png"
                alt="Manage Quiz"
                width={400}
                height={250}
                className="object-contain w-full md:w-1/2"
              />
              <CardContent className="md:w-1/2 md:pr-10 text-center md:text-left">
                <CardTitle className="text-xl font-semibold">Manage Your Quizzes</CardTitle>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  View and edit your quizzes through a comprehensive dashboard.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 - Normal Order */}
            <Card className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700 p-4 transition-all duration-300">
              <Image
                src="/essentials.png"
                alt="Try Now"
                width={400}
                height={250}
                className="object-contain w-full md:w-1/2 h-90 mx-7"
              />
              <CardContent className="md:w-1/2 md:pl-10 text-center md:text-left">
                {/* Try it Now Text with Hover Effect */}
                <Button
                  variant="outline"
                  className="text-2xl font-bold w-full py-6 border-gray-400 dark:border-gray-900 transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-white hover:border-gray-700"
                  onClick={()=> router.push("/create-quiz")}
                >
                  <span className="group-hover:hidden">Try it Now! 🚀</span>
                  <span className="hidden group-hover:inline">Create Quiz ✍️</span>
                </Button>


                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  Organize and create engaging quizzes for your students!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
