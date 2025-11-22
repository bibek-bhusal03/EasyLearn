"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthPage() {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary mb-4">
          <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">EasyLearn</h1>
        <p className="text-muted-foreground">Intelligent learning, simplified</p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle>Choose Your Role</CardTitle>
          <CardDescription>Select how you want to access EasyLearn AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/auth/login" className="block">
            <Button variant="default" className="w-full h-11 text-base bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register" className="block">
            <Button variant="outline" className="w-full h-11 text-base border-border/50 bg-transparent">
              Create Account
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>New to EasyLearn AI?</p>
        <Link href="/auth/register" className="text-primary hover:underline font-medium">
          Sign up to get started
        </Link>
      </div>
    </div>
  )
}
