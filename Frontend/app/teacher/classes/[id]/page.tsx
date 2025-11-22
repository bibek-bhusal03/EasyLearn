"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ClassDetailPage() {
  const params = useParams()
  const classId = params.id as string
  const { toast } = useToast()

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", joinedAt: "2024-01-20" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", joinedAt: "2024-01-22" },
  ])

  const handleInviteStudent = async () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      })
      return
    }

    const newStudent = {
      id: Math.max(...students.map((s) => s.id), 0) + 1,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      joinedAt: new Date().toISOString().split("T")[0],
    }

    setStudents([...students, newStudent])
    setInviteEmail("")
    setShowInviteModal(false)
    toast({
      title: "Success",
      description: `Invitation sent to ${inviteEmail}`,
    })
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/teacher/classes" className="text-primary hover:underline text-sm mb-2 block">
            ← Back to Classes
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mathematics 101</h1>
          <p className="text-muted-foreground">Class Code: MATH101</p>
        </div>
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="mr-2">+</span>
              Invite Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Student to Class</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentEmail">Student Email</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  placeholder="student@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button onClick={handleInviteStudent} className="w-full bg-primary hover:bg-primary/90">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Students</p>
            <p className="text-3xl font-bold text-foreground mt-2">{students.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Chapters</p>
            <p className="text-3xl font-bold text-foreground mt-2">5</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Quizzes</p>
            <p className="text-3xl font-bold text-foreground mt-2">12</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Avg. Score</p>
            <p className="text-3xl font-bold text-foreground mt-2">78%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="space-y-4">
        {/* Students List */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Enrolled Students</CardTitle>
            <CardDescription>All students in this class</CardDescription>
          </CardHeader>
          <CardContent>
            {students.length > 0 ? (
              <div className="space-y-2">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Joined {new Date(student.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No students enrolled yet</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
<<<<<<< HEAD
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href={`/teacher/classes/${classId}/invitations`}>
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent cursor-pointer">
=======
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href={`/teacher/classes/${classId}/invitations`}>
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent">
>>>>>>> 12cd839 (feat: initialized ui)
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">✉️</span>
                <span>Manage Invitations</span>
              </div>
            </Button>
          </Link>
          <Link href={`/teacher/classes/${classId}/chapters`}>
<<<<<<< HEAD
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent cursor-pointer">
=======
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent">
>>>>>>> 12cd839 (feat: initialized ui)
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📚</span>
                <span>Manage Chapters</span>
              </div>
            </Button>
          </Link>
<<<<<<< HEAD
          
          <Link href={`/teacher/classes/${classId}/analytics`}>
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent cursor-pointer">
=======
          <Link href={`/teacher/classes/${classId}/quizzes`}>
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📝</span>
                <span>Create Quiz</span>
              </div>
            </Button>
          </Link>
          <Link href={`/teacher/classes/${classId}/analytics`}>
            <Button variant="outline" className="w-full h-20 border-border/50 bg-transparent">
>>>>>>> 12cd839 (feat: initialized ui)
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">📊</span>
                <span>View Analytics</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
