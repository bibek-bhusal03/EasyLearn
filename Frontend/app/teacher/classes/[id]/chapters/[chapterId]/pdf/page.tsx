"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PDFFile {
  id: number
  name: string
  size: number
  uploadedAt: string
  pages: number
  status: "ready" | "processing"
}

export default function PDFManagementPage() {
  const params = useParams()
  const classId = params.id as string
  const chapterId = params.chapterId as string
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const [uploadedPDFs, setUploadedPDFs] = useState<PDFFile[]>([
    { id: 1, name: "Linear Equations Introduction", size: 2.5, uploadedAt: "2024-01-18", pages: 12, status: "ready" },
    { id: 2, name: "Practice Problems Set 1", size: 1.8, uploadedAt: "2024-01-20", pages: 8, status: "ready" },
  ])

  const [libraryPDFs] = useState<PDFFile[]>([
    { id: 3, name: "Algebra Fundamentals", size: 3.2, uploadedAt: "2024-01-10", pages: 15, status: "ready" },
    { id: 4, name: "Advanced Equations", size: 4.1, uploadedAt: "2024-01-12", pages: 20, status: "ready" },
    { id: 5, name: "Graphing Techniques", size: 2.9, uploadedAt: "2024-01-15", pages: 14, status: "ready" },
  ])

  const [selectedPDFForQuiz, setSelectedPDFForQuiz] = useState<PDFFile | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        toast({ title: "Success", description: `${file.name} selected` })
      } else {
        toast({ title: "Error", description: "Please select a PDF file", variant: "destructive" })
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
        toast({ title: "Success", description: `${file.name} selected` })
      } else {
        toast({ title: "Error", description: "Please select a PDF file", variant: "destructive" })
      }
    }
  }

  const handleUploadPDF = async () => {
    if (!selectedFile) {
      toast({ title: "Error", description: "Please select a file first", variant: "destructive" })
      return
    }

    setIsUploading(true)
    let progress = 0

    const uploadInterval = setInterval(() => {
      progress += Math.random() * 30
      if (progress > 100) progress = 100
      setUploadProgress(progress)

      if (progress === 100) {
        clearInterval(uploadInterval)
        const newPDF: PDFFile = {
          id: Math.max(...uploadedPDFs.map((p) => p.id), 0) + 1,
          name: selectedFile.name.replace(".pdf", ""),
          size: Number.parseFloat((selectedFile.size / 1024 / 1024).toFixed(2)),
          uploadedAt: new Date().toISOString().split("T")[0],
          pages: Math.floor(Math.random() * 20) + 5,
          status: "ready",
        }
        setUploadedPDFs([...uploadedPDFs, newPDF])
        setSelectedFile(null)
        setUploadProgress(0)
        setIsUploading(false)
        toast({ title: "Success", description: "PDF uploaded successfully" })
      }
    }, 300)
  }

  const handleDeletePDF = (id: number) => {
    setUploadedPDFs(uploadedPDFs.filter((p) => p.id !== id))
    toast({ title: "Deleted", description: "PDF removed from chapter" })
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div>
        <Link
          href={`/teacher/classes/${classId}/chapters/${chapterId}`}
          className="text-primary hover:underline text-sm mb-2 block"
        >
          ← Back to Chapter
        </Link>
        <h1 className="text-3xl font-bold text-foreground mb-2">PDF Management</h1>
        <p className="text-muted-foreground">Upload new PDFs or select from existing library</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-background/50">
          <TabsTrigger value="upload">Upload PDF</TabsTrigger>
          <TabsTrigger value="library">PDF Library</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Upload New PDF</CardTitle>
              <CardDescription>Add a PDF file to this chapter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/10" : "border-border/50 bg-background/30"
                }`}
              >
                <div className="space-y-4">
                  <div className="text-4xl">📄</div>
                  <div>
                    <p className="font-semibold text-foreground">Drag and drop your PDF here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <label>
                    <input type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                    <Button variant="outline" className="border-border/50 cursor-pointer bg-transparent">
                      Browse Files
                    </Button>
                  </label>
                </div>
              </div>

              {/* Selected File Preview */}
              {selectedFile && (
                <div className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Upload Progress */}
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Uploading...</span>
                        <span className="text-foreground font-medium">{Math.round(uploadProgress)}%</span>
                      </div>
                      <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handleUploadPDF}
                    disabled={isUploading}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isUploading ? "Uploading..." : "Upload PDF"}
                  </Button>
                </div>
              )}

              {/* Upload Tips */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <p className="text-sm font-medium text-foreground">Tips for best results:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Use high-quality PDFs for better text extraction</li>
                  <li>Maximum file size: 50 MB</li>
                  <li>Supported formats: PDF</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded PDFs List */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Chapter PDFs</CardTitle>
              <CardDescription>PDFs assigned to this chapter</CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedPDFs.length > 0 ? (
                <div className="space-y-2">
                  {uploadedPDFs.map((pdf) => (
                    <div
                      key={pdf.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl">📄</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{pdf.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {pdf.pages} pages • {pdf.size} MB • Uploaded {new Date(pdf.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{pdf.status}</Badge>
                        <Link href={`/teacher/classes/${classId}/chapters/${chapterId}/quiz/generate?pdf=${pdf.id}`}>
                          <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                            Generate Quiz
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePDF(pdf.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No PDFs uploaded yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Library Tab */}
        <TabsContent value="library" className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>PDF Library</CardTitle>
              <CardDescription>Select from previously uploaded PDFs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {libraryPDFs.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-2xl">📚</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{pdf.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {pdf.pages} pages • {pdf.size} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUploadedPDFs([...uploadedPDFs, pdf])
                          toast({ title: "Success", description: "PDF added to chapter" })
                        }}
                        className="border-border/50"
                      >
                        Add to Chapter
                      </Button>
                      <Link href={`/teacher/classes/${classId}/chapters/${chapterId}/quiz/generate?pdf=${pdf.id}`}>
                        <Button variant="outline" size="sm" className="border-border/50 bg-transparent">
                          Generate Quiz
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
