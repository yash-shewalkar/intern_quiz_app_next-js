import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface Quiz {
  id: string;
  title: string;
  description: string;
  scheduledAt: string;
  status: "active" | "inactive";
}

interface QuizCardsProps {
  quizzes: Quiz[];
}

export default function QuizCards({ quizzes }: QuizCardsProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <Card key={quiz.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Date:</strong> {quiz.scheduledAt}</p>
              <Badge variant={quiz.status === "active" ? "success" : "secondary"}>
                {quiz.status}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push(`/dashboard/edit/${quiz.id}`)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => console.log("Delete quiz", quiz.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center w-full">No quizzes available</p>
      )}
    </div>
  );
}
