"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AdminAnalyticsPage() {
  // Mock data
  const userGrowth = [
    { month: "Jan", teachers: 5, students: 20, admins: 1 },
    { month: "Feb", teachers: 8, students: 35, admins: 1 },
    { month: "Mar", teachers: 12, students: 52, admins: 2 },
    { month: "Apr", teachers: 18, students: 71, admins: 2 },
    { month: "May", teachers: 25, students: 89, admins: 2 },
    { month: "Jun", teachers: 32, students: 127, admins: 3 },
  ]

  const platformMetrics = [
    { label: "Total Users", value: 167, change: "+12% this month" },
    { label: "Classes Created", value: 52, change: "+8 this month" },
    { label: "Quizzes Generated", value: 386, change: "+145 this month" },
    { label: "Avg Users/Day", value: 145, change: "98% uptime" },
  ]

  const roleDistribution = [
    { name: "Students", value: 127, fill: "#3b82f6" },
    { name: "Teachers", value: 32, fill: "#8b5cf6" },
    { name: "Admins", value: 3, fill: "#ec4899" },
  ]

  const topClasses = [
    { name: "Mathematics 101", students: 28, quizzes: 15, engagement: "95%" },
    { name: "Physics Advanced", students: 24, quizzes: 12, engagement: "88%" },
    { name: "English Literature", students: 22, quizzes: 18, engagement: "92%" },
    { name: "Chemistry Basics", students: 20, quizzes: 10, engagement: "85%" },
    { name: "Computer Science", students: 19, quizzes: 14, engagement: "90%" },
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Platform Analytics</h1>
        <p className="text-muted-foreground">System-wide metrics and performance data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((metric, idx) => (
          <Card key={idx} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
              <p className="text-xs text-primary mt-2">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user acquisition by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.5)" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="teachers" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="admins" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Role Distribution */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>By role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Classes */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Top Classes</CardTitle>
          <CardDescription>Most active classes by student engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topClasses.map((cls, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors"
              >
                <div>
                  <p className="font-semibold text-foreground">{cls.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {cls.students} students · {cls.quizzes} quizzes
                  </p>
                </div>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{cls.engagement}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
