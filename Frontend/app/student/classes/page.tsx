"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EnrolledClass {
  id: number
  name: string
  instructor: string
  progress: number
  chapters: number
  completedChapters: number
  quizzes: number
  completedQuizzes: number
  nextQuiz: string
  daysUntilDue: number
  status: "active" | "completed"
}

export default function StudentClassesPage() {
  const { toast } = useToast()
  const [classes, setClasses] = useState<EnrolledClass[]>([
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. Smith",
      progress: 75,
      chapters: 5,
      completedChapters: 4,
      quizzes: 12,
      completedQuizzes: 9,
      nextQuiz: "Chapter 5 Quiz",
      daysUntilDue: 2,
      status: "active",
    },
    {
      id: 2,
      name: "Physics Basics",
      instructor: "Prof. Johnson",
      progress: 60,
      chapters: 4,
      completedChapters: 2,
      quizzes: 8,
      completedQuizzes: 4,
      nextQuiz: "Motion & Forces",
      daysUntilDue: 5,
      status: "active",
    },
    {
      id: 3,
      name: "Chemistry Advanced",
      instructor: "Dr. Williams",
      progress: 45,
      chapters: 6,
      completedChapters: 2,
      quizzes: 15,
      completedQuizzes: 5,
      nextQuiz: "Bonding Theory",
      daysUntilDue: 3,
      status: "active",
    },
  ])

  const [showJoinModal, setShowJoinModal] = useState(false)
  const [classCode, setClassCode] = useState("")

  const handleJoinClass = () => {
    if (!classCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class code",
        variant: "destructive",
      })
      return
    }

    const newClass: EnrolledClass = {
      id: Math.max(...classes.map((c) => c.id), 0) + 1,
      name: `Class ${classCode}`,
      instructor: "Instructor Name",
      progress: 0,
      chapters: 5,
      completedChapters: 0,
      quizzes: 8,
      completedQuizzes: 0,
      nextQuiz: "Chapter 1 Quiz",
      daysUntilDue: 7,
      status: "active",
    }

    setClasses([...classes, newClass])
    setClassCode("")
    setShowJoinModal(false)
    toast({
      title: "Success",
      description: "Class joined successfully!",
    })
  }

  const handleDropClass = (id: number) => {
    setClasses(classes.filter((cls) => cls.id !== id))
    toast({
      title: "Dropped",
      description: "You have dropped this class",
    })
  }

  const activeClasses = classes.filter((c) => c.status === "active")
  const completedClasses = classes.filter((c) => c.status === "completed")

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Classes</h1>
          <p className="text-muted-foreground">Track your progress in each enrolled class</p>
        </div>
        <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="mr-2">+</span>
              Join Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join a New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classCode">Class Code</Label>
                <Input
                  id="classCode"
                  placeholder="Enter the class code from your instructor"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                  className="bg-background/50 border-border/50"
                  maxLength={10}
                />
              </div>
              <Button onClick={handleJoinClass} className="w-full bg-primary hover:bg-primary/90">
                Join Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Classes */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Active Classes</h2>
          <p className="text-muted-foreground text-sm">Keep up with your ongoing coursework</p>
        </div>

        {activeClasses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeClasses.map((cls) => (
              <Card
                key={cls.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <CardDescription className="text-muted-foreground text-sm mt-1">
                        Instructor: {cls.instructor}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Progress Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Overall Progress</p>
                      <p className="text-sm font-bold text-primary">{cls.progress}%</p>
                    </div>
                    <Progress value={cls.progress} className="h-2" />
                  </div>

                  {/* Chapter & Quiz Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-border/50">
                      <p className="text-muted-foreground text-xs font-medium">Chapters</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {cls.completedChapters}/{cls.chapters}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-border/50">
                      <p className="text-muted-foreground text-xs font-medium">Quizzes</p>
                      <p className="text-2xl font-bold text-foreground mt-1">
                        {cls.completedQuizzes}/{cls.quizzes}
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-background/30 border border-border/50">
                      <p className="text-muted-foreground text-xs font-medium">Next Due</p>
                      <p className="text-2xl font-bold text-orange-400 mt-1">{cls.daysUntilDue}d</p>
                    </div>
                  </div>

                  {/* Next Quiz Info */}
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-sm font-medium text-muted-foreground">Next Quiz</p>
                    <p className="text-foreground font-semibold mt-1">{cls.nextQuiz}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due in {cls.daysUntilDue} days</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href={`/student/classes/${cls.id}`} className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">Continue Learning</Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleDropClass(cls.id)}
                      className="border-border/50 text-destructive hover:text-destructive"
                    >
                      Drop
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't enrolled in any classes yet</p>
              <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">Join Your First Class</Button>
                </DialogTrigger>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Classes */}
      {completedClasses.length > 0 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Completed Classes</h2>
            <p className="text-muted-foreground text-sm">Classes you have finished</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedClasses.map((cls) => (
              <Card key={cls.id} className="border-border/50 bg-card/50 backdrop-blur-sm opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">{cls.name}</CardTitle>
                      <CardDescription className="text-muted-foreground text-sm mt-1">
                        Instructor: {cls.instructor}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs font-medium">Chapters</p>
                      <p className="text-xl font-bold text-foreground">
                        {cls.completedChapters}/{cls.chapters}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs font-medium">Quiz Score</p>
                      <p className="text-xl font-bold text-green-400">100%</p>
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
