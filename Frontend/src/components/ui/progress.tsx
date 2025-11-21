import React from 'react'

export function Progress({ value = 0, className = '' }: { value?: number; className?: string }) {
  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${className}`}>
      <div style={{ width: `${value}%`, backgroundColor: '#6366F1' }} className="h-2" />
    </div>
  )
}
