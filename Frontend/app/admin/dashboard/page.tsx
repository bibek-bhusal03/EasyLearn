"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const metrics = [
    { label: "Total Users", value: 127, icon: "👥", color: "bg-blue-500/20 text-blue-400" },
    { label: "Total Teachers", value: 32, icon: "👨‍🏫", color: "bg-purple-500/20 text-purple-400" },
    { label: "Total Students", value: 89, icon: "🎓", color: "bg-green-500/20 text-green-400" },
    { label: "Active Classes", value: 12, icon: "📚", color: "bg-orange-500/20 text-orange-400" },
    { label: "Total Quizzes", value: 145, icon: "📝", color: "bg-pink-500/20 text-pink-400" },
    { label: "System Health", value: "99.8%", icon: "🟢", color: "bg-emerald-500/20 text-emerald-400" },
  ]

  const recentActivity = [
    { id: 1, user: "John Doe", action: "Created new class", time: "2 hours ago", type: "class" },
    { id: 2, user: "Sarah Smith", action: "Generated quiz", time: "3 hours ago", type: "quiz" },
    { id: 3, user: "Mike Johnson", action: "Joined class", time: "4 hours ago", type: "enrollment" },
    { id: 4, user: "Emma Wilson", action: "Completed quiz", time: "5 hours ago", type: "quiz" },
    { id: 5, user: "Alex Brown", action: "Uploaded PDF", time: "6 hours ago", type: "content" },
  ]

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and key metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => (
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-20 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base">
          <span className="text-2xl mr-2">+</span>
          Add User
        </Button>
        <Button variant="outline" className="h-20 border-border/50 font-semibold text-base bg-transparent">
          View Reports
        </Button>
        <Button variant="outline" className="h-20 border-border/50 font-semibold text-base bg-transparent">
          System Settings
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-foreground">User</TableHead>
                <TableHead className="text-foreground">Action</TableHead>
                <TableHead className="text-foreground">Type</TableHead>
                <TableHead className="text-foreground">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id} className="border-border/50">
                  <TableCell className="font-medium text-foreground">{activity.user}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.action}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium capitalize">
                      {activity.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
