import React from 'react'

export function Alert({ children }: { children: React.ReactNode }) {
  return <div className="p-3 bg-amber-50 border-l-4 border-amber-400 text-amber-700 rounded">{children}</div>
}
