import React from 'react'
import { students, sampleQuiz } from '@/lib/mockData'
import ScoreBadge from '@/components/shared/ScoreBadge'

export default function QuizPreview() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Quiz Preview</h2>
      <div className="bg-white border rounded-md p-4">
        <div className="mb-3 text-sm text-slate-600">{sampleQuiz.title}</div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="pb-2">Student</th>
              <th className="pb-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.name}</td>
                <td className="py-2">
                  <ScoreBadge score={s.score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
