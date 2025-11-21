import React from 'react'

export default function QuizQuestion({ q, onAnswer, selected }: { q: any; onAnswer: (i: number) => void; selected?: number | null }) {
  return (
    <div className="p-4 bg-white border rounded-md space-y-3">
      <div className="text-base font-medium text-slate-800">{q.text}</div>
      <div className="space-y-2">
        {q.choices.map((c: string, i: number) => (
          <label key={i} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={q.id}
              checked={selected === i}
              onChange={() => onAnswer(i)}
              className="accent-blue-500"
            />
            <span className="text-slate-700">{c}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
