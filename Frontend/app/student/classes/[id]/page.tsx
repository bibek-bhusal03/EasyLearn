"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Chapter {
  id: number
  number: number
  title: string
  progress: number
  completed: boolean
  contentType: "pdf" | "video" | "text"
  quizzes: number
  completedQuizzes: number
}

export default function StudentClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id as string
  const { toast } = useToast()

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      number: 1,
      title: "Introduction to Linear Equations",
      progress: 100,
      completed: true,
      contentType: "pdf",
      quizzes: 2,
      completedQuizzes: 2,
    },
    {
      id: 2,
      number: 2,
      title: "Solving Linear Equations",
      progress: 100,
      completed: true,
      contentType: "pdf",
      quizzes: 3,
      completedQuizzes: 3,
    },
    {
      id: 3,
      number: 3,
      title: "Graphing Linear Functions",
      progress: 60,
      completed: false,
      contentType: "video",
      quizzes: 2,
      completedQuizzes: 1,
    },
    {
      id: 4,
      number: 4,
      title: "Systems of Linear Equations",
      progress: 30,
      completed: false,
      contentType: "pdf",
      quizzes: 3,
      completedQuizzes: 1,
    },
    {
      id: 5,
      number: 5,
      title: "Advanced Applications",
      progress: 0,
      completed: false,
      contentType: "text",
      quizzes: 4,
      completedQuizzes: 0,
    },
  ])

  const classData = {
    id: classId,
    name: "Mathematics 101",
    instructor: "Dr. Smith",
    code: "MATH101",
  }

  const totalProgress = Math.round(chapters.reduce((sum, ch) => sum + ch.progress, 0) / chapters.length)

  const getContentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "video":
        return "🎥"
      case "text":
        return "📝"
      default:
        return "📚"
    }
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link href="/student/classes" className="text-primary hover:underline text-sm mb-2 block">
            ← Back to Classes
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-1">{classData.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-muted-foreground">Instructor: {classData.instructor}</p>
            <p className="text-muted-foreground">
              Code: <Badge variant="secondary">{classData.code}</Badge>
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="border-border/50">
          Back
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-foreground">
                {chapters.filter((ch) => ch.completed).length} of {chapters.length} chapters completed
              </p>
              <p className="text-lg font-bold text-primary">{totalProgress}%</p>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Chapters List */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Course Chapters</h2>
          <p className="text-muted-foreground text-sm">Study materials and assessments for each chapter</p>
        </div>

        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getContentIcon(chapter.contentType)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Chapter {chapter.number}: {chapter.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Content Type:{" "}
                            <span className="font-medium text-foreground capitalize">{chapter.contentType}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {chapter.completed && <Badge className="bg-green-500/20 text-green-400 shrink-0">Completed</Badge>}
                  </div>

                  {/* Progress and Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Progress Bar */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-muted-foreground">Chapter Progress</p>
                        <p className="text-xs font-bold text-primary">{chapter.progress}%</p>
                      </div>
                      <Progress value={chapter.progress} className="h-2" />
                    </div>

                    {/* Quiz Stats */}
                    <div className="text-center p-2 rounded-lg bg-background/30 border border-border/50">
                      <p className="text-xs text-muted-foreground font-medium">Quizzes</p>
                      <p className="text-sm font-bold text-foreground mt-1">
                        {chapter.completedQuizzes}/{chapter.quizzes}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/student/classes/${classId}/chapters/${chapter.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      {chapter.progress === 100 ? "Review Chapter" : "Continue Chapter"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-border/50 justify-start text-left mb-2 bg-transparent">
              📚 Class Materials
            </Button>
            <Button variant="outline" className="w-full border-border/50 justify-start text-left bg-transparent">
              📋 Syllabus & Guidelines
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base">Help & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full border-border/50 justify-start text-left mb-2 bg-transparent">
              ❓ FAQ
            </Button>
            <Button variant="outline" className="w-full border-border/50 justify-start text-left bg-transparent">
              💬 Contact Instructor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
