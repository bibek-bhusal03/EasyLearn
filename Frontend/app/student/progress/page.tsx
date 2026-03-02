"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentProgressPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock overall progress data
  const overallMetrics = [
    { label: "Overall Progress", value: 68, icon: "📊", color: "bg-blue-500/20 text-blue-400" },
    { label: "Average Score", value: "78%", icon: "🎯", color: "bg-purple-500/20 text-purple-400" },
    { label: "Quizzes Completed", value: 24, icon: "✅", color: "bg-green-500/20 text-green-400" },
    { label: "Learning Streak", value: "12 days", icon: "🔥", color: "bg-orange-500/20 text-orange-400" },
  ]

  // Class-specific progress
  const classProgress = [
    {
      id: 1,
      name: "Mathematics 101",
      progress: 75,
      avgScore: 82,
      quizzesCompleted: 9,
      totalQuizzes: 12,
      chapters: 4,
      totalChapters: 5,
    },
    {
      id: 2,
      name: "Physics Basics",
      progress: 60,
      avgScore: 71,
      quizzesCompleted: 4,
      totalQuizzes: 8,
      chapters: 2,
      totalChapters: 4,
    },
    {
      id: 3,
      name: "Chemistry Advanced",
      progress: 45,
      avgScore: 68,
      quizzesCompleted: 5,
      totalQuizzes: 15,
      chapters: 2,
      totalChapters: 6,
    },
  ]

  // Quiz score trend data
  const scoresTrend = [
    { week: "Week 1", avgScore: 65, attempts: 4 },
    { week: "Week 2", avgScore: 70, attempts: 5 },
    { week: "Week 3", avgScore: 72, attempts: 6 },
    { week: "Week 4", avgScore: 75, attempts: 7 },
    { week: "Week 5", avgScore: 78, attempts: 8 },
  ]

  // Score distribution across classes
  const scoreDistribution = [
    { range: "0-20%", count: 0, fill: "#ef4444" },
    { range: "21-40%", count: 1, fill: "#f97316" },
    { range: "41-60%", count: 3, fill: "#eab308" },
    { range: "61-80%", count: 12, fill: "#84cc16" },
    { range: "81-100%", count: 8, fill: "#22c55e" },
  ]

  // Recent quiz attempts
  const recentQuizzes = [
    {
      id: 1,
      title: "Linear Equations Quiz",
      class: "Mathematics 101",
      score: 85,
      date: "2 days ago",
      status: "Passed",
    },
    { id: 2, title: "Forces & Motion", class: "Physics Basics", score: 72, date: "3 days ago", status: "Passed" },
    { id: 3, title: "Atomic Structure", class: "Chemistry Advanced", score: 68, date: "4 days ago", status: "Passed" },
    { id: 4, title: "Equations Practice", class: "Mathematics 101", score: 78, date: "5 days ago", status: "Passed" },
  ]

  // Achievements/Badges
  const achievements = [
    { id: 1, title: "Quiz Master", description: "Completed 10 quizzes", earned: true, date: "3 weeks ago" },
    { id: 2, title: "Consistent Learner", description: "7-day learning streak", earned: true, date: "2 weeks ago" },
    { id: 3, title: "High Achiever", description: "80+ average score", earned: true, date: "1 week ago" },
    { id: 4, title: "Perfect Score", description: "100% on any quiz", earned: false, date: null },
    { id: 5, title: "Class Champion", description: "Highest score in class", earned: false, date: null },
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 border border-border rounded-lg p-2 text-sm">
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Learning Progress</h1>
          <p className="text-muted-foreground">Track your academic performance and achievements</p>
        </div>
        <Link href="/student/dashboard" className="text-primary hover:underline text-sm">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallMetrics.map((metric, idx) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Score Trend</CardTitle>
            <CardDescription>Your weekly average performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoresTrend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)" }} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="avgScore" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Score Distribution */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Quiz performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class-by-Class Progress */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Progress by Class</CardTitle>
          <CardDescription>Your performance in each enrolled class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {classProgress.map((cls) => (
            <div key={cls.id} className="pb-6 border-b border-border/50 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Chapters: {cls.chapters}/{cls.totalChapters} | Quizzes: {cls.quizzesCompleted}/{cls.totalQuizzes}
                  </p>
                </div>
                <Badge
                  className={`${cls.avgScore >= 80 ? "bg-green-500/20 text-green-400" : cls.avgScore >= 70 ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}
                >
                  {cls.avgScore}% avg
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-muted-foreground">Overall Progress</p>
                    <p className="text-xs font-bold text-primary">{cls.progress}%</p>
                  </div>
                  <Progress value={cls.progress} className="h-2" />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tabs for Recent Quizzes & Achievements */}
      <Tabs defaultValue="quizzes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-border/50">
          <TabsTrigger value="quizzes">Recent Quizzes</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Recent Quizzes Tab */}
        <TabsContent value="quizzes">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Quiz Attempts</CardTitle>
              <CardDescription>Your latest quiz submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Quiz Title</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentQuizzes.map((quiz) => (
                    <TableRow key={quiz.id} className="border-border/50">
                      <TableCell className="font-medium text-foreground">{quiz.title}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{quiz.class}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{quiz.score}%</span>
                          <div className="w-12 h-2 bg-background/50 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: `${quiz.score}%` }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{quiz.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400">{quiz.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
              <CardDescription>Milestones you have unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? "border-border/50 bg-background/30"
                        : "border-border/30 bg-background/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      </div>
                      <span className="text-2xl">{achievement.earned ? "🏆" : "🔒"}</span>
                    </div>
                    {achievement.earned && <p className="text-xs text-green-400 mt-2">Earned {achievement.date}</p>}
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
