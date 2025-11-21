"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface GeneratedQuestion {
  id: number
  question: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer?: string
}

export default function QuizGenerationPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const classId = params.id as string
  const chapterId = params.chapterId as string
  const pdfId = searchParams.get("pdf")
  const { toast } = useToast()

  const [quizTitle, setQuizTitle] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [questionCount, setQuestionCount] = useState("10")
  const [questionTypes, setQuestionTypes] = useState({
    multipleChoice: true,
    trueFalse: false,
    shortAnswer: false,
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const [editingQuestion, setEditingQuestion] = useState<GeneratedQuestion | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  const handleGenerateQuiz = async () => {
    if (!quizTitle.trim()) {
      toast({ title: "Error", description: "Please enter a quiz title", variant: "destructive" })
      return
    }

    if (!questionTypes.multipleChoice && !questionTypes.trueFalse && !questionTypes.shortAnswer) {
      toast({
        title: "Error",
        description: "Please select at least one question type",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    const generateInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(generateInterval)
          generateSampleQuestions()
          setIsGenerating(false)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 400)
  }

  const generateSampleQuestions = () => {
    const count = Number.parseInt(questionCount)
    const questions: GeneratedQuestion[] = []

    const sampleQuestions = [
      {
        type: "multiple-choice",
        question: "What is the solution to 2x + 5 = 13?",
        options: ["x = 4", "x = 9", "x = 6", "x = 8"],
        correctAnswer: "x = 4",
      },
      {
        type: "multiple-choice",
        question: "Which of the following is a linear equation?",
        options: ["y = x²", "y = 2x + 3", "y = x³", "y = 1/x"],
        correctAnswer: "y = 2x + 3",
      },
      {
        type: "true-false",
        question: "The slope of a horizontal line is 0.",
        correctAnswer: "true",
      },
      {
        type: "multiple-choice",
        question: "What is the y-intercept of y = 3x - 2?",
        options: ["2", "-2", "3", "-3"],
        correctAnswer: "-2",
      },
      {
        type: "true-false",
        question: "Two parallel lines have the same slope.",
        correctAnswer: "true",
      },
      {
        type: "short-answer",
        question: "Solve: 3(x - 2) = 15",
        correctAnswer: "x = 7",
      },
    ]

    for (let i = 0; i < count; i++) {
      const sample = sampleQuestions[i % sampleQuestions.length]
      questions.push({
        id: i + 1,
        question: sample.question,
        type: sample.type as "multiple-choice" | "true-false" | "short-answer",
        options: sample.options,
        correctAnswer: sample.correctAnswer,
      })
    }

    setGeneratedQuestions(questions)
    setShowPreview(true)
    toast({ title: "Success", description: "Quiz generated successfully!" })
  }

  const handleSaveQuiz = () => {
    if (generatedQuestions.length === 0) {
      toast({ title: "Error", description: "No questions to save", variant: "destructive" })
      return
    }

    toast({ title: "Success", description: `Quiz "${quizTitle}" created with ${generatedQuestions.length} questions` })
    // Redirect back to chapter
    setTimeout(() => {
      window.location.href = `/teacher/classes/${classId}/chapters/${chapterId}`
    }, 1500)
  }

  const handleDeleteQuestion = (id: number) => {
    setGeneratedQuestions(generatedQuestions.filter((q) => q.id !== id))
    toast({ title: "Deleted", description: "Question removed" })
  }

  const handleEditQuestion = (question: GeneratedQuestion) => {
    setEditingQuestion(question)
    setEditDialogOpen(true)
  }

  const handleUpdateQuestion = () => {
    if (!editingQuestion) return
    setGeneratedQuestions(generatedQuestions.map((q) => (q.id === editingQuestion.id ? editingQuestion : q)))
    setEditDialogOpen(false)
    toast({ title: "Success", description: "Question updated" })
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Generate Quiz from PDF</h1>
        <p className="text-muted-foreground">AI-powered quiz generation with customizable options</p>
      </div>

      {!showPreview ? (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quiz Configuration</CardTitle>
            <CardDescription>Set parameters for quiz generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quiz Title */}
            <div className="space-y-2">
              <Label htmlFor="quizTitle">Quiz Title</Label>
              <Input
                id="quizTitle"
                placeholder="e.g., Solving Linear Equations Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="bg-background/50 border-border/50"
              />
            </div>

            {/* Question Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="questionCount">Number of Questions</Label>
                <select
                  id="questionCount"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                  className="w-full p-2 rounded-lg bg-background/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="5">5 questions</option>
                  <option value="10">10 questions</option>
                  <option value="15">15 questions</option>
                  <option value="20">20 questions</option>
                </select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 rounded-lg bg-background/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Question Types */}
            <div className="space-y-3">
              <Label>Question Types</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="multipleChoice"
                    checked={questionTypes.multipleChoice}
                    onChange={(e) => setQuestionTypes({ ...questionTypes, multipleChoice: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Label htmlFor="multipleChoice" className="m-0 cursor-pointer">
                    Multiple Choice
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="trueFalse"
                    checked={questionTypes.trueFalse}
                    onChange={(e) => setQuestionTypes({ ...questionTypes, trueFalse: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Label htmlFor="trueFalse" className="m-0 cursor-pointer">
                    True/False
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="shortAnswer"
                    checked={questionTypes.shortAnswer}
                    onChange={(e) => setQuestionTypes({ ...questionTypes, shortAnswer: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <Label htmlFor="shortAnswer" className="m-0 cursor-pointer">
                    Short Answer
                  </Label>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
              <p className="text-sm font-medium text-foreground">Generation Info:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Uses AI to extract key concepts from the PDF</li>
                <li>Questions are customizable after generation</li>
                <li>Typically takes 30-60 seconds to generate</li>
              </ul>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateQuiz}
              disabled={isGenerating}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating... {Math.round(generationProgress)}%
                </div>
              ) : (
                "Generate Quiz"
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Generated Questions Preview */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{quizTitle}</CardTitle>
                  <CardDescription>{generatedQuestions.length} questions generated</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setShowPreview(false)} className="border-border/50">
                  Back to Config
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="p-4 rounded-lg bg-card/30 border border-border/50 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Question {index + 1}</span>
                        <Badge variant="secondary">{question.type.replace("-", " ")}</Badge>
                      </div>
                      <p className="text-foreground font-medium">{question.question}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                        className="border-border/50"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Question Options */}
                  {question.type === "multiple-choice" && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded text-sm ${
                            option === question.correctAnswer
                              ? "bg-green-500/20 text-green-600 border border-green-500/30"
                              : "bg-background/30 text-muted-foreground border border-border/50"
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}) {option}
                          {option === question.correctAnswer && " ✓"}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="space-y-2">
                      <div
                        className={`p-2 rounded text-sm ${
                          "true" === question.correctAnswer
                            ? "bg-green-500/20 text-green-600 border border-green-500/30"
                            : "bg-background/30 text-muted-foreground border border-border/50"
                        }`}
                      >
                        True {question.correctAnswer === "true" && " ✓"}
                      </div>
                      <div
                        className={`p-2 rounded text-sm ${
                          "false" === question.correctAnswer
                            ? "bg-green-500/20 text-green-600 border border-green-500/30"
                            : "bg-background/30 text-muted-foreground border border-border/50"
                        }`}
                      >
                        False {question.correctAnswer === "false" && " ✓"}
                      </div>
                    </div>
                  )}

                  {question.type === "short-answer" && (
                    <div className="p-2 rounded text-sm bg-green-500/20 text-green-600 border border-green-500/30">
                      Expected Answer: {question.correctAnswer}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowPreview(false)} className="border-border/50">
              Modify Configuration
            </Button>
            <Button onClick={handleSaveQuiz} className="bg-primary hover:bg-primary/90">
              Save Quiz
            </Button>
          </div>
        </>
      )}

      {/* Edit Question Modal */}
      {editDialogOpen && editingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="border-border/50 bg-card backdrop-blur-sm w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Edit Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editQuestion">Question Text</Label>
                <textarea
                  id="editQuestion"
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  className="w-full h-24 p-3 rounded-lg bg-background/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {editingQuestion.type === "multiple-choice" && editingQuestion.options && (
                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {editingQuestion.options.map((option, idx) => (
                    <Input
                      key={idx}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options!]
                        newOptions[idx] = e.target.value
                        setEditingQuestion({ ...editingQuestion, options: newOptions })
                      }}
                      className="bg-background/50 border-border/50"
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="border-border/50">
                  Cancel
                </Button>
                <Button onClick={handleUpdateQuestion} className="bg-primary hover:bg-primary/90">
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
