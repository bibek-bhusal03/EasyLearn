"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

export default function StudentDashboard() {
  const { toast } = useToast()
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Mathematics 101",
      instructor: "Dr. Smith",
      progress: 75,
      chapters: 5,
      completedChapters: 4,
      nextQuiz: "Chapter 5 Quiz",
      daysUntilDue: 2,
    },
    {
      id: 2,
      name: "Physics Basics",
      instructor: "Prof. Johnson",
      progress: 60,
      chapters: 4,
      completedChapters: 2,
      nextQuiz: "Motion & Forces",
      daysUntilDue: 5,
    },
    {
      id: 3,
      name: "Chemistry Advanced",
      instructor: "Dr. Williams",
      progress: 45,
      chapters: 6,
      completedChapters: 2,
      nextQuiz: "Bonding Theory",
      daysUntilDue: 3,
    },
  ])

  const [showJoinClass, setShowJoinClass] = useState(false)
  const [classCode, setClassCode] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class code",
        variant: "destructive",
      })
      return
    }

    setIsJoining(true)
    setTimeout(() => {
      const newClass = {
        id: classes.length + 1,
        name: `Class ${classCode}`,
        instructor: "Instructor Name",
        progress: 0,
        chapters: 5,
        completedChapters: 0,
        nextQuiz: "Chapter 1 Quiz",
        daysUntilDue: 7,
      }
      setClasses([...classes, newClass])
      setClassCode("")
      setShowJoinClass(false)
      toast({
        title: "Success",
        description: `Joined class successfully!`,
      })
      setIsJoining(false)
    }, 600)
  }

  const metrics = [
    {
      label: "Classes Enrolled",
      value: classes.length,
      icon: "📚",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      label: "Overall Progress",
      value: Math.round(classes.reduce((sum, c) => sum + c.progress, 0) / classes.length) + "%",
      icon: "📈",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      label: "Quizzes Completed",
      value: 8,
      icon: "✅",
      color: "bg-green-500/20 text-green-400",
    },
    { label: "Assignments Due", value: 3, icon: "⏳", color: "bg-orange-500/20 text-orange-400" },
  ]

  const upcomingAssignments = [
    { id: 1, title: "Physics Quiz - Motion", class: "Physics Basics", dueDate: "2 days", priority: "high" },
    {
      id: 2,
      title: "Chemistry Assignment - Bonding",
      class: "Chemistry Advanced",
      dueDate: "3 days",
      priority: "medium",
    },
    { id: 3, title: "Math Problem Set 5", class: "Mathematics 101", dueDate: "5 days", priority: "low" },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Student! 👋</h1>
        <p className="text-muted-foreground">Keep up your learning journey and stay on track with your classes</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center text-xl`}>
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Dialog open={showJoinClass} onOpenChange={setShowJoinClass}>
          <DialogTrigger asChild>
            <Button className="h-20 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
              <span className="text-2xl mr-2">+</span>
              Join a Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Join Class</DialogTitle>
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
              <Button onClick={handleJoinClass} disabled={isJoining} className="w-full bg-primary hover:bg-primary/90">
                {isJoining ? "Joining..." : "Join Class"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6 h-20 flex items-center justify-center">
            <Link href="/student/progress" className="w-full">
              <Button
                variant="outline"
                className="w-full h-full border-border/50 text-base font-semibold bg-transparent"
              >
                View Full Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assignments */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">Upcoming Assignments</h2>
          <p className="text-muted-foreground text-sm">Don't miss your deadlines</p>
        </div>

        <div className="space-y-3">
          {upcomingAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{assignment.class}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p
                      className={`text-sm font-medium ${
                        assignment.priority === "high"
                          ? "text-red-400"
                          : assignment.priority === "medium"
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >
                      Due in {assignment.dueDate}
                    </p>
                    <Button variant="outline" size="sm" className="mt-2 border-border/50 bg-transparent">
                      Start Assignment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enrolled Classes */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">Your Classes</h2>
          <p className="text-muted-foreground text-sm">Track your progress in each class</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {classes.map((cls) => (
            <Card
              key={cls.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
            >
              <CardHeader>
                <div>
                  <CardTitle className="text-lg">{cls.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm mt-1">
                    Instructor: {cls.instructor}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-foreground">Progress</p>
                    <p className="text-sm font-bold text-primary">{cls.progress}%</p>
                  </div>
                  <Progress value={cls.progress} className="h-2" />
                </div>

                {/* Class Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Chapters</p>
                    <p className="text-xl font-bold text-foreground">
                      {cls.completedChapters}/{cls.chapters}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Next Quiz</p>
                    <p className="text-sm font-semibold text-foreground">{cls.nextQuiz}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Due In</p>
                    <p className="text-lg font-bold text-orange-400">{cls.daysUntilDue}d</p>
                  </div>
                </div>

                <Link href={`/student/classes/${cls.id}`} className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">Continue Learning</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
