"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Question {
  id: number
  question: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer: string
}

interface QuizSession {
  quizId: number
  currentQuestionIndex: number
  answers: Record<number, string | null>
  startTime: number
  timeLeft: number
  isSubmitted: boolean
}

const QUIZ_TIME_LIMIT = 600 // 10 minutes in seconds

export default function StudentQuizPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string
  const { toast } = useToast()

  const [quizSession, setQuizSession] = useState<QuizSession>({
    quizId: Number(quizId),
    currentQuestionIndex: 0,
    answers: {},
    startTime: Date.now(),
    timeLeft: QUIZ_TIME_LIMIT,
    isSubmitted: false,
  })

  const [showConfirmQuit, setShowConfirmQuit] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  // Mock quiz data
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the solution to 2x + 5 = 13?",
      type: "multiple-choice",
      options: ["x = 4", "x = 9", "x = 6", "x = 8"],
      correctAnswer: "x = 4",
    },
    {
      id: 2,
      question: "Which of the following is a linear equation?",
      type: "multiple-choice",
      options: ["y = x²", "y = 2x + 3", "y = x³", "y = 1/x"],
      correctAnswer: "y = 2x + 3",
    },
    {
      id: 3,
      question: "The slope of a horizontal line is 0.",
      type: "true-false",
      correctAnswer: "true",
    },
    {
      id: 4,
      question: "What is the y-intercept of y = 3x - 2?",
      type: "multiple-choice",
      options: ["2", "-2", "3", "-3"],
      correctAnswer: "-2",
    },
    {
      id: 5,
      question: "Two parallel lines have the same slope.",
      type: "true-false",
      correctAnswer: "true",
    },
  ]

  // Timer countdown
  useEffect(() => {
    if (quizSession.isSubmitted) return

    const timer = setInterval(() => {
      setQuizSession((prev) => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer)
          // Auto submit when time runs out
          handleSubmitQuiz()
          return prev
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizSession.isSubmitted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = questions[quizSession.currentQuestionIndex]
  const answered =
    quizSession.answers[currentQuestion.id] !== undefined && quizSession.answers[currentQuestion.id] !== null

  const handleAnswer = (answer: string) => {
    setQuizSession((prev) => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: answer },
    }))
  }

  const handleNext = () => {
    if (quizSession.currentQuestionIndex < questions.length - 1) {
      setQuizSession((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }))
    }
  }

  const handlePrevious = () => {
    if (quizSession.currentQuestionIndex > 0) {
      setQuizSession((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }))
    }
  }

  const handleGoToQuestion = (index: number) => {
    setQuizSession((prev) => ({
      ...prev,
      currentQuestionIndex: index,
    }))
  }

  const handleSubmitQuiz = () => {
    setQuizSession((prev) => ({ ...prev, isSubmitted: true }))
    setShowConfirmSubmit(false)
    toast({ title: "Success", description: "Quiz submitted successfully!" })
  }

  const handleQuitQuiz = () => {
    router.push("/student/dashboard")
  }

  if (quizSession.isSubmitted) {
    return (
      <QuizSummary
        quizId={quizId}
        questions={questions}
        answers={quizSession.answers}
        timeLeft={quizSession.timeLeft}
      />
    )
  }

  const timeColor =
    quizSession.timeLeft <= 60 ? "text-red-400" : quizSession.timeLeft <= 180 ? "text-yellow-400" : "text-green-400"

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quiz In Progress</h1>
            <p className="text-muted-foreground text-sm mt-1">Mathematics 101 - Linear Equations</p>
          </div>
          <div className={`text-center p-4 rounded-lg bg-card/50 border border-border/50 ${timeColor}`}>
            <p className="text-sm font-medium text-muted-foreground mb-1">Time Left</p>
            <p className="text-3xl font-bold font-mono">{formatTime(quizSession.timeLeft)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">
              Question {quizSession.currentQuestionIndex + 1} of {questions.length}
            </p>
            <p className="text-sm font-medium text-muted-foreground">
              {Object.values(quizSession.answers).filter((a) => a !== null && a !== undefined).length} answered
            </p>
          </div>
          <Progress value={((quizSession.currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                    <Badge variant="secondary" className="mt-3">
                      {currentQuestion.type.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Multiple Choice */}
                {currentQuestion.type === "multiple-choice" && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          quizSession.answers[currentQuestion.id] === option
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/50 bg-background/30 text-foreground hover:border-primary/50 hover:bg-background/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              quizSession.answers[currentQuestion.id] === option
                                ? "border-primary bg-primary"
                                : "border-border/50"
                            }`}
                          >
                            {quizSession.answers[currentQuestion.id] === option && (
                              <svg className="w-4 h-4 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* True/False */}
                {currentQuestion.type === "true-false" && (
                  <div className="grid grid-cols-2 gap-4">
                    {["true", "false"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`p-6 rounded-lg border-2 transition-all font-semibold text-lg ${
                          quizSession.answers[currentQuestion.id] === option
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border/50 bg-background/30 text-foreground hover:border-primary/50"
                        }`}
                      >
                        {option.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}

                {/* Short Answer */}
                {currentQuestion.type === "short-answer" && (
                  <div className="space-y-3">
                    <textarea
                      value={quizSession.answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Enter your answer here..."
                      className="w-full h-32 p-4 rounded-lg bg-background/30 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Type your answer in the text field above. Your response will be reviewed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8 justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={quizSession.currentQuestionIndex === 0}
                  className="border-border/50 bg-transparent"
                >
                  ← Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={quizSession.currentQuestionIndex === questions.length - 1}
                  className="bg-primary hover:bg-primary/90"
                >
                  Next →
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmQuit(true)}
                  className="border-border/50 text-muted-foreground hover:text-foreground"
                >
                  Quit
                </Button>
                <Button onClick={() => setShowConfirmSubmit(true)} className="bg-primary hover:bg-primary/90 px-8">
                  Submit Quiz
                </Button>
              </div>
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-base">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => handleGoToQuestion(idx)}
                      className={`w-full aspect-square rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
                        quizSession.currentQuestionIndex === idx
                          ? "bg-primary text-primary-foreground ring-2 ring-primary/50"
                          : quizSession.answers[q.id] !== undefined && quizSession.answers[q.id] !== null
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                            : "bg-background/30 text-muted-foreground border border-border/50 hover:border-primary/50"
                      }`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-primary" />
                    <span className="text-muted-foreground">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500/30" />
                    <span className="text-muted-foreground">Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-background/30 border border-border/50" />
                    <span className="text-muted-foreground">Unanswered</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quit Confirmation */}
        <Dialog open={showConfirmQuit} onOpenChange={setShowConfirmQuit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quit Quiz?</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">Are you sure you want to quit? Your progress will not be saved.</p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmQuit(false)}>
                Continue Quiz
              </Button>
              <Button variant="destructive" onClick={handleQuitQuiz}>
                Quit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Submit Confirmation */}
        <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Quiz?</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              You have {Object.values(quizSession.answers).filter((a) => a !== null && a !== undefined).length} of{" "}
              {questions.length} questions answered. Are you sure you want to submit?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
                Continue
              </Button>
              <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

interface QuizSummaryProps {
  quizId: string
  questions: Question[]
  answers: Record<number, string | null>
  timeLeft: number
}

function QuizSummary({ quizId, questions, answers, timeLeft }: QuizSummaryProps) {
  const router = useRouter()

  const calculateResults = () => {
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const correct = calculateResults()
  const total = questions.length
  const percentage = Math.round((correct / total) * 100)
  const totalTime = 600 - timeLeft

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getGrade = (percent: number) => {
    if (percent >= 90) return { grade: "A", color: "text-green-400", bgColor: "bg-green-500/20" }
    if (percent >= 80) return { grade: "B", color: "text-blue-400", bgColor: "bg-blue-500/20" }
    if (percent >= 70) return { grade: "C", color: "text-yellow-400", bgColor: "bg-yellow-500/20" }
    return { grade: "F", color: "text-red-400", bgColor: "bg-red-500/20" }
  }

  const gradeInfo = getGrade(percentage)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Result Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground">Great job! Here's how you did.</p>
        </div>

        {/* Score Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Grade */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Grade</p>
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${gradeInfo.bgColor}`}>
                  <span className={`text-5xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</span>
                </div>
              </div>

              {/* Score */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Score</p>
                <div className="space-y-1">
                  <p className="text-5xl font-bold text-foreground">
                    {correct}/{total}
                  </p>
                  <p className={`text-2xl font-semibold ${gradeInfo.color}`}>{percentage}%</p>
                </div>
              </div>

              {/* Time */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Time Taken</p>
                <p className="text-3xl font-bold text-foreground">{formatTime(totalTime)}</p>
                <p className="text-sm text-muted-foreground">({Math.round((totalTime / 60) * 10) / 10} min)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Correct Answers</p>
                <p className="text-4xl font-bold text-green-400">{correct}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Incorrect Answers</p>
                <p className="text-4xl font-bold text-red-400">{total - correct}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">Questions</p>
                <p className="text-4xl font-bold text-blue-400">{total}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Review Your Answers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, idx) => {
              const isCorrect = answers[q.id] === q.correctAnswer
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`mt-1 flex-shrink-0 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">
                        Question {idx + 1}: {q.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className={isCorrect ? "text-green-400" : "text-muted-foreground"}>
                          Your answer: <span className="font-medium">{answers[q.id] || "Not answered"}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-green-400">
                            Correct answer: <span className="font-medium">{q.correctAnswer}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => router.push("/student/dashboard")} className="border-border/50 px-8">
            Back to Dashboard
          </Button>
          <Button className="bg-primary hover:bg-primary/90 px-8">Retake Quiz</Button>
        </div>
      </div>
    </div>
  )
}
