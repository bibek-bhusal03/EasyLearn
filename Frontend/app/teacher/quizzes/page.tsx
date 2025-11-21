"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Quiz {
  id: number
  title: string
  chapter: string
  questions: number
  difficulty: string
  status: "published" | "draft"
  createdAt: string
  averageScore?: number
}

export default function QuizzesPage() {
  const { toast } = useToast()
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: "Solving Linear Equations",
      chapter: "Linear Equations",
      questions: 10,
      difficulty: "medium",
      status: "published",
      createdAt: "2024-01-18",
      averageScore: 78,
    },
    {
      id: 2,
      title: "Graphing Lines",
      chapter: "Linear Equations",
      questions: 8,
      difficulty: "easy",
      status: "published",
      createdAt: "2024-01-20",
      averageScore: 85,
    },
    {
      id: 3,
      title: "Systems of Equations",
      chapter: "Linear Equations",
      questions: 12,
      difficulty: "hard",
      status: "draft",
      createdAt: "2024-01-22",
    },
  ])

  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleEditQuiz = (quiz: Quiz) => {
    setEditingQuiz({ ...quiz })
    setEditDialogOpen(true)
  }

  const handleUpdateQuiz = () => {
    if (!editingQuiz) return
    setQuizzes(quizzes.map((q) => (q.id === editingQuiz.id ? editingQuiz : q)))
    setEditDialogOpen(false)
    toast({ title: "Success", description: "Quiz updated successfully" })
  }

  const handleDeleteQuiz = (id: number) => {
    const quiz = quizzes.find((q) => q.id === id)
    setQuizzes(quizzes.filter((q) => q.id !== id))
    toast({ title: "Deleted", description: `"${quiz?.title}" has been removed` })
  }

  const handlePublishQuiz = (id: number) => {
    setQuizzes(
      quizzes.map((q) => (q.id === id ? { ...q, status: q.status === "published" ? "draft" : "published" } : q)),
    )
    toast({ title: "Success", description: "Quiz status updated" })
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage all your quizzes</p>
        </div>
        <Link href="/teacher/dashboard">
          <Button variant="outline" className="border-border/50 bg-transparent">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Quizzes Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Quizzes</CardTitle>
              <CardDescription>{quizzes.length} quizzes total</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Chapter</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Avg Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizzes.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium text-foreground">{quiz.title}</TableCell>
                  <TableCell className="text-muted-foreground">{quiz.chapter}</TableCell>
                  <TableCell className="text-muted-foreground">{quiz.questions}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{quiz.difficulty}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={quiz.status === "published" ? "default" : "outline"}>{quiz.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {quiz.averageScore ? `${quiz.averageScore}%` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuiz(quiz)}
                        className="border-border/50"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublishQuiz(quiz.id)}
                        className="border-border/50"
                      >
                        {quiz.status === "published" ? "Unpublish" : "Publish"}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Quiz?</DialogTitle>
                          </DialogHeader>
                          <p className="text-muted-foreground">
                            Are you sure you want to delete "{quiz.title}"? This cannot be undone.
                          </p>
                          <div className="flex gap-3 justify-end">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive" onClick={() => handleDeleteQuiz(quiz.id)}>
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Quiz Modal */}
      {editDialogOpen && editingQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-border/50 bg-card backdrop-blur-sm w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Edit Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quizTitle">Quiz Title</Label>
                <Input
                  id="quizTitle"
                  value={editingQuiz.title}
                  onChange={(e) => setEditingQuiz({ ...editingQuiz, title: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quizDifficulty">Difficulty</Label>
                  <select
                    id="quizDifficulty"
                    value={editingQuiz.difficulty}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, difficulty: e.target.value })}
                    className="w-full p-2 rounded-lg bg-background/50 border border-border/50 text-foreground"
                  >
                    <option>easy</option>
                    <option>medium</option>
                    <option>hard</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quizQuestions">Number of Questions</Label>
                  <Input
                    id="quizQuestions"
                    type="number"
                    value={editingQuiz.questions}
                    onChange={(e) => setEditingQuiz({ ...editingQuiz, questions: Number(e.target.value) })}
                    className="bg-background/50 border-border/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-border/50">
                  Cancel
                </Button>
                <Button onClick={handleUpdateQuiz} className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
