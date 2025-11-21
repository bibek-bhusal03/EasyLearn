import React from 'react'
import DashboardCard from '@/components/shared/DashboardCard'
import { sampleQuiz } from '@/lib/mockData'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

export default function Chapters() {
  const chapters = [
    { id: 'c1', title: 'Fractions', progress: 0.72 },
    { id: 'c2', title: 'Decimals', progress: 0.45 },
    { id: 'c3', title: 'Percentages', progress: 0.9 },
  ]

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Chapters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {chapters.map((c) => (
          <DashboardCard key={c.id} title={c.title} value={`${Math.round(c.progress * 100)}%`}>
            <Progress value={Math.round(c.progress * 100)} className="h-3" />
            <div className="mt-3">
              <Button>Start Quiz</Button>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  )
}
