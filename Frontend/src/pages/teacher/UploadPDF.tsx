import React from 'react'
import DashboardCard from '@/components/shared/DashboardCard'
import { Button } from '@/components/ui/button'

export default function UploadPDF() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Upload PDF</h2>
      <div className="max-w-lg">
        <DashboardCard title="Upload Lesson PDF">
          <input type="file" accept="application/pdf" className="block w-full" />
          <div className="mt-3">
            <Button>Upload</Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  )
}
