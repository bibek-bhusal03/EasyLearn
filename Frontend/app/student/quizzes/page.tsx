"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface StudentQuiz {
  id: number
  title: string
  class: string
  questions: number
  difficulty: string
  status: "available" | "completed" | "attempted"
  score?: number
  attempts: number
  dueDate: string
}

export default function StudentQuizzesPage() {
  const { toast } = useToast()
  const [quizzes, setQuizzes] = useState<StudentQuiz[]>([
    {
      id: 1,
      title: "Solving Linear Equations",
      class: "Mathematics 101",
      questions: 10,
      difficulty: "medium",
      status: "completed",
      score: 85,
      attempts: 1,
      dueDate: "2024-01-25",
    },
    {
      id: 2,
      title: "Graphing Lines",
      class: "Mathematics 101",
      questions: 8,
      difficulty: "easy",
      status: "available",
      attempts: 0,
      dueDate: "2024-01-28",
    },
    {
      id: 3,
      title: "Systems of Equations",
      class: "Mathematics 101",
      questions: 12,
      difficulty: "hard",
      status: "attempted",
      score: 72,
      attempts: 1,
      dueDate: "2024-01-30",
    },
    {
      id: 4,
      title: "Force and Motion",
      class: "Physics Basics",
      questions: 15,
      difficulty: "medium",
      status: "available",
      attempts: 0,
      dueDate: "2024-02-02",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "attempted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "available":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "hard":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const groupedQuizzes = {
    available: quizzes.filter((q) => q.status === "available"),
    completed: quizzes.filter((q) => q.status === "completed"),
    attempted: quizzes.filter((q) => q.status === "attempted"),
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Quizzes</h1>
          <p className="text-muted-foreground">{quizzes.length} quizzes across all your classes</p>
        </div>
        <Link href="/student/dashboard">
          <Button variant="outline" className="border-border/50 bg-transparent">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Available Quizzes */}
      {groupedQuizzes.available.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Available Quizzes</h2>
            <p className="text-muted-foreground text-sm">Quizzes you can take now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupedQuizzes.available.map((quiz) => (
              <Card
                key={quiz.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <CardDescription className="mt-1">{quiz.class}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{quiz.questions} questions</span>
                    <span className="text-muted-foreground">Due {quiz.dueDate}</span>
                  </div>

                  <Link href={`/student/quizzes/${quiz.id}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90">Start Quiz</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Quizzes */}
      {groupedQuizzes.completed.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Completed Quizzes</h2>
            <p className="text-muted-foreground text-sm">You've successfully completed these quizzes</p>
          </div>

          <div className="space-y-3">
            {groupedQuizzes.completed.map((quiz) => (
              <Card
                key={quiz.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{quiz.class}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{quiz.score}%</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <Link href={`/student/quizzes/${quiz.id}`}>
                        <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                          Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Attempted Quizzes */}
      {groupedQuizzes.attempted.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">In Progress</h2>
            <p className="text-muted-foreground text-sm">You can retake these quizzes</p>
          </div>

          <div className="space-y-3">
            {groupedQuizzes.attempted.map((quiz) => (
              <Card
                key={quiz.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{quiz.class}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">{quiz.score}%</p>
                        <p className="text-xs text-muted-foreground">Last Score</p>
                      </div>
                      <Link href={`/student/quizzes/${quiz.id}`}>
                        <Button className="bg-primary hover:bg-primary/90" size="sm">
                          Retake
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
