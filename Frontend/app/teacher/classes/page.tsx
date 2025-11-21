"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Class {
  id: number
  name: string
  code: string
  students: number
  chapters: number
  quizzes: number
  createdAt: string
  status: "active" | "archived"
}

export default function ClassesPage() {
  const { toast } = useToast()
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      name: "Mathematics 101",
      code: "MATH101",
      students: 32,
      chapters: 5,
      quizzes: 12,
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Physics Basics",
      code: "PHYS101",
      students: 28,
      chapters: 4,
      quizzes: 8,
      createdAt: "2024-02-01",
      status: "active",
    },
    {
      id: 3,
      name: "Chemistry Advanced",
      code: "CHEM201",
      students: 25,
      chapters: 6,
      quizzes: 15,
      createdAt: "2024-02-20",
      status: "active",
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    code: "",
  })

  const handleCreateClass = async () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newClass: Class = {
      id: Math.max(...classes.map((c) => c.id), 0) + 1,
      name: formData.name,
      code: formData.code,
      students: 0,
      chapters: 0,
      quizzes: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    }

    setClasses([...classes, newClass])
    setFormData({ name: "", code: "" })
    setShowCreateModal(false)
    toast({
      title: "Success",
      description: `Class "${formData.name}" created successfully`,
    })
  }

  const handleEditClass = () => {
    if (!selectedClass || !formData.name.trim() || !formData.code.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setClasses(
      classes.map((cls) => (cls.id === selectedClass.id ? { ...cls, name: formData.name, code: formData.code } : cls)),
    )
    setFormData({ name: "", code: "" })
    setShowEditModal(false)
    toast({
      title: "Success",
      description: `Class updated successfully`,
    })
  }

  const handleDeleteClass = () => {
    if (!selectedClass) return

    setClasses(classes.filter((cls) => cls.id !== selectedClass.id))
    setShowDeleteModal(false)
    toast({
      title: "Deleted",
      description: `"${selectedClass.name}" has been removed`,
    })
  }

  const openEditModal = (cls: Class) => {
    setSelectedClass(cls)
    setFormData({ name: cls.name, code: cls.code })
    setShowEditModal(true)
  }

  const openDeleteModal = (cls: Class) => {
    setSelectedClass(cls)
    setShowDeleteModal(true)
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Management</h1>
          <p className="text-muted-foreground">Create and manage all your classes</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="text-lg mr-2">+</span>
              New Class
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
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classCode">Class Code</Label>
                <Input
                  id="classCode"
                  placeholder="e.g., PYTHON101"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button onClick={handleCreateClass} className="w-full bg-primary hover:bg-primary/90">
                Create Class
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Classes</p>
            <p className="text-3xl font-bold text-foreground mt-2">{classes.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Students</p>
            <p className="text-3xl font-bold text-foreground mt-2">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Quizzes</p>
            <p className="text-3xl font-bold text-foreground mt-2">{classes.reduce((sum, c) => sum + c.quizzes, 0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Classes</CardTitle>
          <CardDescription>Manage all your classes in one place</CardDescription>
        </CardHeader>
        <CardContent>
          {classes.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-foreground">Name</TableHead>
                  <TableHead className="text-foreground">Code</TableHead>
                  <TableHead className="text-foreground text-center">Students</TableHead>
                  <TableHead className="text-foreground text-center">Chapters</TableHead>
                  <TableHead className="text-foreground text-center">Quizzes</TableHead>
                  <TableHead className="text-foreground">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="border-border/50">
                    <TableCell>
                      <Link href={`/teacher/classes/${cls.id}`}>
                        <span className="text-primary hover:underline font-medium">{cls.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cls.code}</TableCell>
                    <TableCell className="text-center font-medium">{cls.students}</TableCell>
                    <TableCell className="text-center font-medium">{cls.chapters}</TableCell>
                    <TableCell className="text-center font-medium">{cls.quizzes}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(cls.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(cls)}
                          className="border-border/50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(cls)}
                          className="text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No classes yet. Create one to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editClassName">Class Name</Label>
              <Input
                id="editClassName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editClassCode">Class Code</Label>
              <Input
                id="editClassCode"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="border-border/50">
                Cancel
              </Button>
              <Button onClick={handleEditClass} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Class?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{selectedClass?.name}"? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="border-border/50">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteClass}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
