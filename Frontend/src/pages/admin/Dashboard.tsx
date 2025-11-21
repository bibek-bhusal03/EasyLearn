import React from 'react'
import DashboardCard from '@/components/shared/DashboardCard'
import ProgressChart from '@/components/shared/ProgressChart'
import { chartData } from '@/lib/mockData'

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardCard title="Schools" value={12} />
        <DashboardCard title="Active Users" value={320} />
        <DashboardCard title="Pending Invites" value={4} />
      </div>
      <div className="mt-6">
        <ProgressChart data={chartData.progressOverTime} />
      </div>
    </div>
  )
}
