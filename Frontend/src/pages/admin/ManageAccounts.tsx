import React from 'react'
import { students } from '@/lib/mockData'
import { Button } from '@/components/ui/button'

export default function ManageAccounts() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Manage Accounts</h2>
      <div className="bg-white border rounded-md p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="pb-2">Name</th>
              <th className="pb-2">Score</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.name}</td>
                <td className="py-2">{s.score}%</td>
                <td className="py-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2">Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
