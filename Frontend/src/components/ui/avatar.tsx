import * as React from 'react'

export function Avatar({ name, size = 40, className = '' }: { name: string; size?: number; className?: string }) {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  return (
    <div style={{ width: size, height: size }} className={`rounded-full bg-slate-200 text-slate-800 font-medium flex items-center justify-center ${className}`}>
      {initials}
    </div>
  )
}

export default Avatar
