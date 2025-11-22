"use client"

import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { label: "Dashboard", href: "/student/dashboard", icon: "📊" },
    { label: "Classes", href: "/student/classes", icon: "📚" },
    { label: "Quizzes", href: "/student/quizzes", icon: "📝" },
    { label: "Progress", href: "/student/progress", icon: "📈" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
<<<<<<< HEAD
          <Link href="/" className="flex items-center gap-2">
=======
          <Link href="/student/dashboard" className="flex items-center gap-2">
>>>>>>> 12cd839 (feat: initialized ui)
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
<<<<<<< HEAD
            <span className="font-bold text-foreground hidden sm:inline">EasyLearn </span>
=======
            <span className="font-bold text-foreground hidden sm:inline">EasyLearn AI</span>
>>>>>>> 12cd839 (feat: initialized ui)
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`gap-2 ${isActive(item.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  S
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled className="text-muted-foreground text-sm">
                Student Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/auth/login")} className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-1 px-6 pb-4 overflow-x-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                className={`gap-2 whitespace-nowrap ${isActive(item.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
