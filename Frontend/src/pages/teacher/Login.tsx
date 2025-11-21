import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Card from "@/components/ui/card"

export default function TeacherLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">
            Teacher Login
          </h1>
          <div className="space-y-3">
            <label className="block text-sm text-slate-600">Email</label>
            <Input placeholder="teacher@example.com" />
            <label className="block text-sm text-slate-600">Password</label>
            <Input placeholder="••••••" type="password" />
            <Button className="w-full mt-2">Continue</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
