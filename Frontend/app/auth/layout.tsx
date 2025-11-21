import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full dark bg-gradient-to-br from-background via-background to-card/30">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">{children}</div>
    </div>
  )
}
