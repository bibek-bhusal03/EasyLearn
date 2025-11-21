import React from 'react'

export default function ScoreBadge({ score }: { score: number }) {
  let cls = 'bg-amber-400 text-white'
  if (score >= 85) cls = 'bg-green-500 text-white'
  else if (score < 60) cls = 'bg-red-500 text-white'

  return (
    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${cls}`}>{score}%</span>
  )
}
