export const students = [
  { id: 's1', name: 'Ava Johnson', score: 85, progress: 0.85 },
  { id: 's2', name: 'Liam Smith', score: 72, progress: 0.72 },
  { id: 's3', name: 'Olivia Brown', score: 60, progress: 0.6 },
  { id: 's4', name: 'Noah Davis', score: 95, progress: 0.95 },
  { id: 's5', name: 'Emma Wilson', score: 48, progress: 0.48 },
]

export const sampleQuiz = {
  id: 'q1',
  title: 'Intro to Fractions',
  questions: [
    {
      id: 'q1-1',
      text: 'What is 1/2 + 1/4?',
      choices: ['1/4', '3/4', '1', '2/4'],
      answerIndex: 1,
    },
    {
      id: 'q1-2',
      text: 'Which is larger: 2/3 or 3/5?',
      choices: ['2/3', '3/5', 'They are equal', 'Cannot say'],
      answerIndex: 0,
    },
    {
      id: 'q1-3',
      text: 'What is 50% as a fraction?',
      choices: ['1/4', '1/3', '1/2', '2/3'],
      answerIndex: 2,
    },
    {
      id: 'q1-4',
      text: 'Choose the equivalent fraction for 2/4.',
      choices: ['1/2', '3/4', '2/3', '4/8'],
      answerIndex: 0,
    },
    {
      id: 'q1-5',
      text: 'Simplify 6/8.',
      choices: ['3/4', '2/3', '6/8', '1/2'],
      answerIndex: 0,
    },
  ],
}

export const chartData = {
  progressOverTime: [
    { day: 'Week 1', avg: 40 },
    { day: 'Week 2', avg: 52 },
    { day: 'Week 3', avg: 60 },
    { day: 'Week 4', avg: 72 },
    { day: 'Week 5', avg: 78 },
  ],
  performanceDistribution: [
    { name: 'A', value: 12 },
    { name: 'B', value: 30 },
    { name: 'C', value: 40 },
    { name: 'D', value: 18 },
  ],
}
