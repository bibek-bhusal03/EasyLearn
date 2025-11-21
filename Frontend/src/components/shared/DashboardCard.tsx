import React from 'react'
import { cn } from '@/lib/utils'

export default function DashboardCard({ title, value, children }: { title: string; value?: string | number; children?: React.ReactNode }) {
  return (
    <div className={cn('p-4 bg-white border rounded-md shadow-sm hover:shadow-md')}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">{title}</div>
          {value && <div className="text-2xl font-semibold text-slate-900">{value}</div>}
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
