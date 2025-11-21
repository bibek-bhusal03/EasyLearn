import React from 'react'
import { students, sampleQuiz } from '@/lib/mockData'
import ScoreBadge from '@/components/shared/ScoreBadge'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "@/components/ui/table"
import Card from "@/components/ui/card"

export default function QuizPreview() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Quiz Preview</h2>
      <Card>
        <div className="mb-3 text-sm text-slate-600">{sampleQuiz.title}</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Student</TableHeaderCell>
              <TableHeaderCell>Score</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {students.map((s) => (
              <TableRow key={s.id} className="border-t">
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  <ScoreBadge score={s.score} />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
