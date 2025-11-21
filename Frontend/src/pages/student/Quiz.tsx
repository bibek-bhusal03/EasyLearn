import React, { useState } from 'react'
import QuizQuestion from '@/components/shared/QuizQuestion'
import { sampleQuiz } from '@/lib/mockData'
import { Button } from '@/components/ui/button'

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  function setAnswer(qid: string, idx: number) {
    setAnswers((s) => ({ ...s, [qid]: idx }))
  }

  const correct = Object.entries(answers).reduce((acc, [qid, idx]) => {
    const q = sampleQuiz.questions.find((x) => x.id === qid)
    if (!q) return acc
    return acc + (q.answerIndex === idx ? 1 : 0)
  }, 0)

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">{sampleQuiz.title}</h2>
      <div className="space-y-4">
        {sampleQuiz.questions.map((q) => (
          <QuizQuestion key={q.id} q={q} selected={answers[q.id]} onAnswer={(i) => setAnswer(q.id, i)} />
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={() => alert(`Score: ${correct} / ${sampleQuiz.questions.length}`)}>Submit</Button>
      </div>
    </div>
  )
}
