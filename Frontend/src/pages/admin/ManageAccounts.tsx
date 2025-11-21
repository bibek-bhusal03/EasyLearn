import React from 'react'
import { students } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeaderCell,
} from "@/components/ui/table"
import Card from "@/components/ui/card"

export default function ManageAccounts() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Manage Accounts
      </h2>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Score</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <tbody>
            {students.map((s) => (
              <TableRow key={s.id} className="border-t">
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.score}%</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" className="ml-2">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}
