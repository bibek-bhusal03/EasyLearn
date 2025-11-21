"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const roles = [
    {
      title: "Student",
      description: "Learn, take quizzes, and track your progress",
      icon: "🎓",
      href: "/student/dashboard",
      color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30",
    },
    {
      title: "Teacher",
      description: "Create classes, manage students, and generate quizzes",
      icon: "👨‍🏫",
      href: "/teacher/dashboard",
      color: "from-purple-500/20 to-pink-500/20 border-pink-500/30",
    },
    {
      title: "Admin",
      description: "Manage users, analytics, and system settings",
      icon: "⚙️",
      href: "/admin/dashboard",
      color: "from-orange-500/20 to-red-500/20 border-red-500/30",
    },
  ]

  const features = [
    { icon: "✨", title: "AI-Powered Quizzes", description: "Generate intelligent quizzes from any content" },
    { icon: "📊", title: "Real-Time Analytics", description: "Track student progress and performance metrics" },
    { icon: "🎯", title: "Smart Learning Paths", description: "Personalized learning recommendations" },
    { icon: "🔐", title: "Secure Platform", description: "Enterprise-grade security and privacy" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 dark">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
         <Link href={"/"}> <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-foreground">EasyLearn </span>
          </div></Link>
          <Link href="/auth/login">
            <Button variant="outline" className="border-border/50 bg-transparent">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            AI-Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Learning Platform
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create, teach, and learn with intelligent AI-powered educational tools. Generate quizzes, track progress,
            and inspire learning.
          </p>
          <Link href="/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 px-8 text-base">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Role Selection */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Choose Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <Link key={role.href} href={role.href}>
              <Card
                className={`border bg-gradient-to-br ${role.color} hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer h-full`}
              >
                <CardHeader>
                  <div className="text-5xl mb-4">{role.icon}</div>
                  <CardTitle className="text-foreground">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{role.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enter as {role.title}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
              <CardContent className="pt-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-muted-foreground text-sm">
          <p>EasyLearn AI - Transforming Education with Artificial Intelligence</p>
        </div>
      </footer>
    </div>
  )
}
