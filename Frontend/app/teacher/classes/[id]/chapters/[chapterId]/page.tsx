"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ChapterDetailPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id as string
  const chapterId = params.chapterId as string
  const { toast } = useToast()

  const [chapter] = useState({
    id: chapterId,
    title: "Linear Equations",
    description: "Solve and graph linear equations in one and two variables",
    order: 2,
    status: "published",
    content_type: "video",
    quizzes: 3,
    createdAt: "2024-01-12",
    lastUpdated: "2024-01-18",
  })

  const [quizzes] = useState([
    { id: 1, title: "Solving Linear Equations", questions: 10, difficulty: "medium" },
    { id: 2, title: "Graphing Lines", questions: 8, difficulty: "easy" },
    { id: 3, title: "Systems of Equations", questions: 12, difficulty: "hard" },
  ])

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/teacher/classes/${classId}/chapters`}
            className="text-primary hover:underline text-sm mb-2 block"
          >
            ← Back to Chapters
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">{chapter.title}</h1>
          <p className="text-muted-foreground">Chapter {chapter.order}</p>
        </div>
        <div className="flex gap-2">
          
          <Link href={`/teacher/classes/${classId}/chapters/${chapterId}/pdf`}>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="mr-2">📄</span>
              Manage PDFs + Create Quiz
            </Button>
          </Link>
          {/* <Button className="bg-primary hover:bg-primary/90">
            <span className="mr-2">+</span>
            Create Quiz
          </Button> */}
        </div>
      </div>

      {/* Chapter Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Content Type</p>
            <Badge className="mt-2">{chapter.content_type.toUpperCase()}</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Status</p>
            <Badge variant={chapter.status === "published" ? "default" : "secondary"} className="mt-2">
              {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Quizzes</p>
            <p className="text-3xl font-bold text-foreground mt-2">{quizzes.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground mt-2">{new Date(chapter.lastUpdated).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Chapter Description */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-base leading-relaxed">{chapter.description}</p>
        </CardContent>
      </Card>

      {/* Associated Quizzes */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Associated Quizzes</CardTitle>
              <CardDescription>Quizzes created for this chapter</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Link href={`/teacher/classes/${classId}/chapters/${chapterId}/pdf`}>
                <Button className="bg-primary hover:bg-primary/90">
                  <span className="mr-2">+</span>
                  New Quiz
                </Button></Link>
              </DialogTrigger>
             
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {quizzes.length > 0 ? (
            <div className="space-y-2">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50"
                >
                  <div>
                    <Link href={`/teacher/classes/${classId}/quizzes/${quiz.id}`}>
                      <p className="font-medium text-primary hover:underline">{quiz.title}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground">{quiz.questions} questions</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{quiz.difficulty}</Badge>
                    <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                    Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No quizzes created yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
