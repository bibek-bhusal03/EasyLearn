import React from 'react'
import DashboardCard from '@/components/shared/DashboardCard'
import ProgressChart from '@/components/shared/ProgressChart'
import { chartData } from '@/lib/mockData'

export default function HomeDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Teacher Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Active Students" value={120} />
        <DashboardCard title="Avg Score" value={`${72}%`} />
        <DashboardCard title="Quizzes" value={8} />
      </div>
      <div className="mt-6">
        <ProgressChart data={chartData.progressOverTime} />
      </div>
    </div>
  )
}
