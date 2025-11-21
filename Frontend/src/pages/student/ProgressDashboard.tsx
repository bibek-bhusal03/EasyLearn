import React from 'react'
import ProgressChart from '@/components/shared/ProgressChart'
import { chartData } from '@/lib/mockData'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function ProgressDashboard() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Progress Dashboard</h2>
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <ProgressChart data={chartData.progressOverTime} />
        </TabsContent>
        <TabsContent value="weekly">
          <ProgressChart data={chartData.progressOverTime} />
        </TabsContent>
        <TabsContent value="monthly">
          <ProgressChart data={chartData.progressOverTime} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
