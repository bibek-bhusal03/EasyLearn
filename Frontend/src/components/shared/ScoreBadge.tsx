import React from 'react'
import Badge from "@/components/ui/badge"

export default function ScoreBadge({ score }: { score: number }) {
  let variant: "default" | "success" | "warning" | "danger" = "default"
  if (score >= 85) variant = "success"
  else if (score < 60) variant = "danger"

  return <Badge variant={variant}>{score}%</Badge>
}
