import React from 'react'
import { students, chartData } from '@/lib/mockData'
import ProgressChart from '@/components/shared/ProgressChart'
import Card from "@/components/ui/card"
import Avatar from "@/components/ui/avatar"
import ScoreBadge from "@/components/shared/ScoreBadge"

export default function StudentAnalytics() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Student Analytics
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <ProgressChart data={chartData.progressOverTime} />
        <Card>
          <h3 className="text-lg font-medium mb-3">Top Students</h3>
          <ul className="space-y-3">
            {students.map((s) => (
              <li key={s.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={s.name} size={36} />
                  <div className="text-sm text-slate-700">{s.name}</div>
                </div>
                <div>
                  <ScoreBadge score={s.score} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
