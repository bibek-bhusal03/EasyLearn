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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Chapter {
  id: number
  title: string
  description: string
  order: number
  status: "draft" | "published"
  content_type: "pdf" | "video" | "text"
  quizzes: number
  createdAt: string
  lastUpdated: string
}

export default function ChaptersPage() {
  const params = useParams()
  const classId = params.id as string
  const { toast } = useToast()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showReorderModal, setShowReorderModal] = useState(false)

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "Introduction to Algebra",
      description: "Learn the basics of algebraic expressions and equations",
      order: 1,
      status: "published",
      content_type: "pdf",
      quizzes: 2,
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "Linear Equations",
      description: "Solve and graph linear equations",
      order: 2,
      status: "published",
      content_type: "video",
      quizzes: 3,
      createdAt: "2024-01-12",
      lastUpdated: "2024-01-18",
    },
    {
      id: 3,
      title: "Quadratic Equations",
      description: "Master quadratic functions and applications",
      order: 3,
      status: "draft",
      content_type: "pdf",
      quizzes: 0,
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-20",
    },
  ])

  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
<<<<<<< HEAD
  const [formData, setFormData] = useState<{ title: string; description: string; content_type: "pdf" | "video" | "text" }>({
    title: "",
    description: "",
    content_type: "pdf",
=======
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content_type: "pdf" as const,
>>>>>>> 12cd839 (feat: initialized ui)
  })

  const handleCreateChapter = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const newChapter: Chapter = {
      id: Math.max(...chapters.map((c) => c.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      order: chapters.length + 1,
      status: "draft",
      content_type: formData.content_type,
      quizzes: 0,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setChapters([...chapters, newChapter])
    setFormData({ title: "", description: "", content_type: "pdf" })
    setShowCreateModal(false)
    toast({
      title: "Success",
      description: `Chapter "${formData.title}" created successfully`,
    })
  }

  const handleEditChapter = () => {
    if (!selectedChapter || !formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setChapters(
      chapters.map((ch) =>
        ch.id === selectedChapter.id
          ? {
              ...ch,
              title: formData.title,
              description: formData.description,
              content_type: formData.content_type,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : ch,
      ),
    )
    setFormData({ title: "", description: "", content_type: "pdf" })
    setShowEditModal(false)
    toast({
      title: "Success",
      description: `Chapter updated successfully`,
    })
  }

  const handleDeleteChapter = () => {
    if (!selectedChapter) return

    setChapters(chapters.filter((ch) => ch.id !== selectedChapter.id))
    setShowDeleteModal(false)
    toast({
      title: "Deleted",
      description: `"${selectedChapter.title}" has been removed`,
    })
  }

  const handleReorderChapter = (id: number, direction: "up" | "down") => {
    const index = chapters.findIndex((ch) => ch.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === chapters.length - 1)) {
      return
    }

    const newChapters = [...chapters]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    ;[newChapters[index], newChapters[swapIndex]] = [newChapters[swapIndex], newChapters[index]]

    newChapters.forEach((ch, idx) => {
      ch.order = idx + 1
    })

    setChapters(newChapters)
    toast({
      title: "Reordered",
      description: `Chapter moved ${direction}`,
    })
  }

  const openEditModal = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    setFormData({
      title: chapter.title,
      description: chapter.description,
      content_type: chapter.content_type,
    })
    setShowEditModal(true)
  }

  const openDeleteModal = (chapter: Chapter) => {
    setSelectedChapter(chapter)
    setShowDeleteModal(true)
  }

  const getContentTypeBadge = (type: string) => {
    const typeConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
      pdf: { label: "PDF", variant: "secondary" },
      video: { label: "Video", variant: "default" },
      text: { label: "Text", variant: "outline" },
    }
    return typeConfig[type] || { label: type, variant: "default" }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" }> = {
      published: { variant: "default" },
      draft: { variant: "secondary" },
    }
    return statusConfig[status] || { variant: "default" }
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/teacher/classes/${classId}`} className="text-primary hover:underline text-sm mb-2 block">
            ← Back to Class
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Chapter Management</h1>
          <p className="text-muted-foreground">Create and organize chapters for your class</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="mr-2">+</span>
              New Chapter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Chapter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Chapter Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Algebra"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Briefly describe what students will learn..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-24 p-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type</Label>
                <select
                  id="contentType"
                  value={formData.content_type}
                  onChange={(e) =>
                    setFormData({ ...formData, content_type: e.target.value as "pdf" | "video" | "text" })
                  }
                  className="w-full p-2 rounded-lg bg-background/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <Button onClick={handleCreateChapter} className="w-full bg-primary hover:bg-primary/90">
                Create Chapter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Chapters</p>
            <p className="text-3xl font-bold text-foreground mt-2">{chapters.length}</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Published</p>
            <p className="text-3xl font-bold text-primary mt-2">
              {chapters.filter((ch) => ch.status === "published").length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm font-medium">Total Quizzes</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {chapters.reduce((sum, ch) => sum + ch.quizzes, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chapters Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Your Chapters</CardTitle>
          <CardDescription>Manage all chapters in this class</CardDescription>
        </CardHeader>
        <CardContent>
          {chapters.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-foreground">Order</TableHead>
                  <TableHead className="text-foreground">Title</TableHead>
                  <TableHead className="text-foreground">Type</TableHead>
                  <TableHead className="text-foreground text-center">Status</TableHead>
                  <TableHead className="text-foreground text-center">Quizzes</TableHead>
                  <TableHead className="text-foreground">Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chapters.map((chapter) => (
                  <TableRow key={chapter.id} className="border-border/50">
                    <TableCell className="font-medium text-foreground">{chapter.order}</TableCell>
                    <TableCell>
                      <Link href={`/teacher/classes/${classId}/chapters/${chapter.id}`}>
                        <span className="text-primary hover:underline font-medium">{chapter.title}</span>
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{chapter.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getContentTypeBadge(chapter.content_type).variant}>
                        {getContentTypeBadge(chapter.content_type).label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getStatusBadge(chapter.status).variant}>
                        {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">{chapter.quizzes}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(chapter.lastUpdated).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderChapter(chapter.id, "up")}
                          disabled={chapter.order === 1}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                          title="Move up"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorderChapter(chapter.id, "down")}
                          disabled={chapter.order === chapters.length}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                          title="Move down"
                        >
                          ↓
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(chapter)}
                          className="border-border/50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(chapter)}
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
              <p className="text-muted-foreground">No chapters yet. Create one to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Chapter Title</Label>
              <Input
                id="editTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <textarea
                id="editDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 p-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editContentType">Content Type</Label>
              <select
                id="editContentType"
                value={formData.content_type}
                onChange={(e) => setFormData({ ...formData, content_type: e.target.value as "pdf" | "video" | "text" })}
                className="w-full p-2 rounded-lg bg-background/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="pdf">PDF</option>
                <option value="video">Video</option>
                <option value="text">Text</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowEditModal(false)} className="border-border/50">
                Cancel
              </Button>
              <Button onClick={handleEditChapter} className="bg-primary hover:bg-primary/90">
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
            <DialogTitle>Delete Chapter?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete "{selectedChapter?.title}"? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="border-border/50">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteChapter}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
