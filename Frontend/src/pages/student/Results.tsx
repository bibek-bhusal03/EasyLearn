import React from 'react'
import DashboardCard from '@/components/shared/DashboardCard'
import ScoreBadge from '@/components/shared/ScoreBadge'
import { Alert } from '@/components/ui/alert'

export default function Results() {
  const score = 72
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Results</h2>
      <div className="max-w-md">
        <DashboardCard title="Quiz Result">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-medium text-slate-800">Fractions Quiz</div>
              <div className="text-sm text-slate-600">Good attempt — review the tips below</div>
            </div>
            <ScoreBadge score={score} />
          </div>
          <div className="mt-4">
            <Alert>
              Review fractions basics: convert to common denominators before adding.
            </Alert>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
