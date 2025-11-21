import React from 'react'

export default function UserAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-slate-200 text-slate-800 font-medium"
    >
      {initials}
    </div>
  )
}
