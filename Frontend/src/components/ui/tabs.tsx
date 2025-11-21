import React from 'react'

export function Tabs({ children, defaultValue }: any) {
  return <div>{children}</div>
}

export function TabsList({ children }: any) {
  return <div className="flex gap-2">{children}</div>
}

export function TabsTrigger({ children, value }: any) {
  return <button className="px-3 py-1 rounded-md text-sm bg-white border">{children}</button>
}

export function TabsContent({ children }: any) {
  return <div className="mt-3">{children}</div>
}
