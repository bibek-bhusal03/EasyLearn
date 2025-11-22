"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function TeacherDashboard() {
  const { toast } = useToast()
  const [classes, setClasses] = useState([
    { id: 1, name: "Mathematics 101", students: 32, chapters: 5, quizzes: 12 },
    { id: 2, name: "Physics Basics", students: 28, chapters: 4, quizzes: 8 },
    { id: 3, name: "Chemistry Advanced", students: 25, chapters: 6, quizzes: 15 },
  ])
  const [showCreateClass, setShowCreateClass] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateClass = async () => {
    if (!newClassName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a class name",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    setTimeout(() => {
      const newClass = {
        id: classes.length + 1,
        name: newClassName,
        students: 0,
        chapters: 0,
        quizzes: 0,
      }
      setClasses([...classes, newClass])
      setNewClassName("")
      setShowCreateClass(false)
      toast({
        title: "Success",
        description: `Class "${newClassName}" created successfully`,
      })
      setIsCreating(false)
    }, 600)
  }

  const handleDeleteClass = (id: number) => {
    const classToDelete = classes.find((c) => c.id === id)
    setClasses(classes.filter((c) => c.id !== id))
    toast({
      title: "Class Deleted",
      description: `"${classToDelete?.name}" has been removed`,
    })
  }

  const metrics = [
    {
      label: "Total Students",
      value: classes.reduce((sum, c) => sum + c.students, 0),
      icon: "👥",
      color: "bg-blue-500/20 text-blue-400",
    },
    { label: "Active Classes", value: classes.length, icon: "📚", color: "bg-purple-500/20 text-purple-400" },
    {
      label: "Total Quizzes",
      value: classes.reduce((sum, c) => sum + c.quizzes, 0),
      icon: "📝",
      color: "bg-green-500/20 text-green-400",
    },
    { label: "Pending Reviews", value: 5, icon: "⏳", color: "bg-orange-500/20 text-orange-400" },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Teacher! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening in your classes today</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Dialog open={showCreateClass} onOpenChange={setShowCreateClass}>
          <DialogTrigger asChild>
            <Button className="h-20 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
              <span className="text-2xl mr-2">+</span>
              Create New Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  placeholder="e.g., Advanced Python"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button
                onClick={handleCreateClass}
                disabled={isCreating}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isCreating ? "Creating..." : "Create Class"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

<<<<<<< HEAD
        {/* <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
=======
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
>>>>>>> 12cd839 (feat: initialized ui)
          <CardContent className="pt-6 h-20 flex items-center justify-center">
            <Link href="/teacher/quizzes" className="w-full">
              <Button
                variant="outline"
                className="w-full h-full border-border/50 text-base font-semibold bg-transparent"
              >
                Generate Quiz
              </Button>
            </Link>
          </CardContent>
<<<<<<< HEAD
        </Card> */}

        {/* <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
=======
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
>>>>>>> 12cd839 (feat: initialized ui)
          <CardContent className="pt-6 h-20 flex items-center justify-center">
            <Link href="/teacher/analytics" className="w-full">
              <Button
                variant="outline"
                className="w-full h-full border-border/50 text-base font-semibold bg-transparent"
              >
                View Analytics
              </Button>
            </Link>
          </CardContent>
<<<<<<< HEAD
        </Card> */}
=======
        </Card>
>>>>>>> 12cd839 (feat: initialized ui)
      </div>

      {/* Classes List */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground">Your Classes</h2>
          <p className="text-muted-foreground text-sm">Manage and view all your classes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {classes.map((cls) => (
            <Card
              key={cls.id}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/60 transition-colors"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm mt-1">
                      ID: CLASS-{String(cls.id).padStart(3, "0")}
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                        ⋮
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Class?</DialogTitle>
                      </DialogHeader>
                      <p className="text-muted-foreground">
                        Are you sure you want to delete "{cls.name}"? This action cannot be undone.
                      </p>
                      <div className="flex gap-3 justify-end">
                        <Button variant="outline" onClick={() => setShowCreateClass(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleDeleteClass(cls.id)
                            setShowCreateClass(false)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Students</p>
                    <p className="text-2xl font-bold text-foreground">{cls.students}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Chapters</p>
                    <p className="text-2xl font-bold text-foreground">{cls.chapters}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Quizzes</p>
                    <p className="text-2xl font-bold text-foreground">{cls.quizzes}</p>
                  </div>
                </div>
                <Link href={`/teacher/classes/${cls.id}`} className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">Manage Class</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
