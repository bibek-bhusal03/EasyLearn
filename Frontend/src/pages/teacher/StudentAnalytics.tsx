import React from 'react'
import { students, chartData } from '@/lib/mockData'
import ProgressChart from '@/components/shared/ProgressChart'

export default function StudentAnalytics() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Student Analytics</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <ProgressChart data={chartData.progressOverTime} />
        <div className="bg-white border rounded-md p-4">
          <h3 className="text-lg font-medium mb-3">Top Students</h3>
          <ul className="space-y-2">
            {students.map((s) => (
              <li key={s.id} className="flex items-center justify-between">
                <div>{s.name}</div>
                <div className="text-sm text-slate-600">{s.score}%</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
