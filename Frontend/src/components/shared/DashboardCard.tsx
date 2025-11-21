import React from 'react'
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export default function DashboardCard({ title, value, children }: { title: string; value?: string | number; children?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">{title}</div>
            {value && (
              <div className="text-2xl font-semibold text-slate-900">
                {value}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  )
}
