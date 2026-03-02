"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function ClassAnalyticsPage() {
  const params = useParams()
  const classId = params.id as string

  // Mock data for charts
  const scoreDistribution = [
    { range: "0-20%", students: 2, fill: "#ef4444" },
    { range: "21-40%", students: 3, fill: "#f97316" },
    { range: "41-60%", students: 5, fill: "#eab308" },
    { range: "61-80%", students: 12, fill: "#84cc16" },
    { range: "81-100%", students: 10, fill: "#22c55e" },
  ]

  const performanceTrend = [
    { week: "Week 1", avgScore: 62, attempts: 25 },
    { week: "Week 2", avgScore: 68, attempts: 28 },
    { week: "Week 3", avgScore: 72, attempts: 32 },
    { week: "Week 4", avgScore: 75, attempts: 35 },
    { week: "Week 5", avgScore: 78, attempts: 38 },
  ]

  const studentPerformance = [
    { id: 1, name: "John Doe", quizzesCompleted: 8, averageScore: 82, lastActive: "Today" },
    { id: 2, name: "Jane Smith", quizzesCompleted: 7, averageScore: 88, lastActive: "Yesterday" },
    { id: 3, name: "Mike Johnson", quizzesCompleted: 5, averageScore: 71, lastActive: "2 days ago" },
    { id: 4, name: "Sarah Williams", quizzesCompleted: 9, averageScore: 85, lastActive: "Today" },
    { id: 5, name: "Tom Brown", quizzesCompleted: 3, averageScore: 58, lastActive: "1 week ago" },
  ]

  const metrics = [
    { label: "Class Average", value: "76%", change: "+3%", icon: "📊" },
    { label: "Completion Rate", value: "92%", change: "+5%", icon: "✓" },
    { label: "Active Students", value: "28/32", change: "87%", icon: "👥" },
    { label: "Avg Time/Quiz", value: "12min", change: "-2min", icon: "⏱️" },
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
          <Link href={`/teacher/classes/${classId}`} className="text-primary hover:underline text-sm mb-2 block">
            ← Back to Class
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Class Analytics</h1>
          <p className="text-muted-foreground">Performance tracking and insights for Mathematics 101</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                  <p className="text-xs text-green-500 mt-1">{metric.change}</p>
                </div>
                <div className="text-3xl">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Student grades across all quizzes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="range" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="students" radius={[8, 8, 0, 0]}>
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Weekly average scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrend} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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
      </div>

      {/* Student Performance Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>Individual student metrics and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Quizzes Completed</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentPerformance.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-foreground">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.quizzesCompleted}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{student.averageScore}%</span>
                      <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${student.averageScore >= 80 ? "bg-green-500" : student.averageScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${student.averageScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.averageScore >= 70 ? "default" : "secondary"}>
                      {student.averageScore >= 80 ? "Excellent" : student.averageScore >= 70 ? "Good" : "Needs Help"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{student.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
