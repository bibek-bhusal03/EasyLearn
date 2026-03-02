"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TeacherAnalyticsPage() {
  // Mock data
  const overallMetrics = [
    { label: "Total Students", value: 89, icon: "👥", change: "+5 this month" },
    { label: "Classes Taught", value: 4, icon: "📚", change: "Active now" },
    { label: "Quizzes Created", value: 47, icon: "📝", change: "+12 this month" },
    { label: "Avg Class Score", value: "78%", icon: "📊", change: "+2% this month" },
  ]

  const classPerformance = [
    { class: "Mathematics 101", students: 28, avgScore: 82, completion: "94%" },
    { class: "Physics Advanced", students: 24, avgScore: 76, completion: "88%" },
    { class: "Chemistry Basics", students: 20, avgScore: 73, completion: "85%" },
    { class: "Biology Fundamentals", students: 17, avgScore: 79, completion: "91%" },
  ]

  const scoreTimeline = [
    { week: "Week 1", avgScore: 72, attempts: 45 },
    { week: "Week 2", avgScore: 75, attempts: 52 },
    { week: "Week 3", avgScore: 76, attempts: 58 },
    { week: "Week 4", avgScore: 78, attempts: 65 },
    { week: "Week 5", avgScore: 79, attempts: 71 },
    { week: "Week 6", avgScore: 81, attempts: 78 },
  ]

  const studentProgress = [
    { rank: 1, name: "John Doe", classes: 4, avgScore: 87, quizzesCompleted: 24 },
    { rank: 2, name: "Sarah Smith", classes: 3, avgScore: 84, quizzesCompleted: 18 },
    { rank: 3, name: "Mike Johnson", classes: 4, avgScore: 81, quizzesCompleted: 22 },
    { rank: 4, name: "Emily Wilson", classes: 2, avgScore: 79, quizzesCompleted: 14 },
    { rank: 5, name: "Alex Brown", classes: 3, avgScore: 76, quizzesCompleted: 16 },
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
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Teaching Analytics</h1>
        <p className="text-muted-foreground">Your performance across all classes</p>
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
                  <p className="text-xs text-primary mt-1">{metric.change}</p>
                </div>
                <div className="text-3xl">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Timeline */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Average scores over time across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTimeline} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
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

        {/* Quiz Attempts */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quiz Activity</CardTitle>
            <CardDescription>Student attempts per week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreTimeline} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="attempts" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Class Performance Summary</CardTitle>
          <CardDescription>Performance metrics for each of your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Completion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classPerformance.map((cls, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-foreground">{cls.class}</TableCell>
                  <TableCell className="text-muted-foreground">{cls.students}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{cls.avgScore}%</span>
                      <div className="w-12 h-2 bg-background/50 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${cls.avgScore}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{cls.completion}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Students */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>Your most engaged and highest-scoring students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Quizzes Completed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProgress.map((student) => (
                <TableRow key={student.rank}>
                  <TableCell>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">#{student.rank}</Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.classes}</TableCell>
                  <TableCell className="font-semibold text-foreground">{student.avgScore}%</TableCell>
                  <TableCell className="text-muted-foreground">{student.quizzesCompleted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
