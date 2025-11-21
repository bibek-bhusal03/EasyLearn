export const studentProfile = {
  id: 's1',
  name: 'Ava Johnson',
  email: 'ava.johnson@student.edu',
  avatar: '',
  grade: '8th Grade',
  school: 'Lincoln Middle School',
  avgScore: 78,
  totalQuizzes: 24,
  streak: 7,
  joinedDate: 'September 2024',
  badges: [
    { id: 'b1', name: 'Quick Learner', icon: 'star', color: '#F59E0B' },
    { id: 'b2', name: 'Perfect Score', icon: 'trophy', color: '#10B981' },
    { id: 'b3', name: 'Week Streak', icon: 'flame', color: '#EF4444' },
  ],
};

export const chapters = [
  {
    id: 'c1',
    title: 'Fractions',
    description: 'Learn to add, subtract, multiply and divide fractions',
    progress: 72,
    status: 'In Progress',
    lessons: 8,
    completedLessons: 6,
    icon: 'divide',
    color: '#8B5CF6'
  },
  {
    id: 'c2',
    title: 'Decimals',
    description: 'Master decimal operations and conversions',
    progress: 45,
    status: 'In Progress',
    lessons: 6,
    completedLessons: 3,
    icon: 'decimal',
    color: '#3B82F6'
  },
  {
    id: 'c3',
    title: 'Percentages',
    description: 'Calculate percentages in real-world scenarios',
    progress: 90,
    status: 'Mastered',
    lessons: 5,
    completedLessons: 5,
    icon: 'percent',
    color: '#10B981'
  },
  {
    id: 'c4',
    title: 'Algebra Basics',
    description: 'Introduction to variables and equations',
    progress: 30,
    status: 'In Progress',
    lessons: 10,
    completedLessons: 3,
    icon: 'function',
    color: '#F59E0B'
  },
  {
    id: 'c5',
    title: 'Geometry',
    description: 'Explore shapes, angles, and measurements',
    progress: 0,
    status: 'New',
    lessons: 8,
    completedLessons: 0,
    icon: 'triangle',
    color: '#EC4899'
  },
  {
    id: 'c6',
    title: 'Statistics',
    description: 'Learn mean, median, mode and data analysis',
    progress: 0,
    status: 'New',
    lessons: 6,
    completedLessons: 0,
    icon: 'chart',
    color: '#06B6D4'
  },
];

export const recentActivity = [
  {
    id: 'a1',
    type: 'quiz',
    title: 'Fractions Quiz',
    score: 85,
    date: 'Today',
    chapter: 'Fractions',
  },
  {
    id: 'a2',
    type: 'lesson',
    title: 'Adding Fractions',
    completed: true,
    date: 'Yesterday',
    chapter: 'Fractions',
  },
  {
    id: 'a3',
    type: 'quiz',
    title: 'Decimals Quiz',
    score: 72,
    date: '2 days ago',
    chapter: 'Decimals',
  },
  {
    id: 'a4',
    type: 'achievement',
    title: 'Week Streak',
    description: '7 days in a row!',
    date: '3 days ago',
  },
];

export const weeklyProgress = [
  { day: 'Mon', score: 75 },
  { day: 'Tue', score: 82 },
  { day: 'Wed', score: 68 },
  { day: 'Thu', score: 90 },
  { day: 'Fri', score: 85 },
  { day: 'Sat', score: 78 },
  { day: 'Sun', score: 88 },
];

export const performanceStats = {
  totalQuizzes: 24,
  avgScore: 78,
  bestScore: 100,
  improvement: 12,
  timeSpent: '15h 30m',
  questionsAnswered: 240,
  correctAnswers: 187,
  streak: 7,
};

export const subjectPerformance = [
  { subject: 'Fractions', score: 85, quizzes: 8 },
  { subject: 'Decimals', score: 72, quizzes: 6 },
  { subject: 'Percentages', score: 92, quizzes: 5 },
  { subject: 'Algebra', score: 68, quizzes: 5 },
];

export const sampleQuiz = {
  id: 'q1',
  title: 'Fractions Quiz',
  chapter: 'Fractions',
  timeLimit: 300, // 5 minutes in seconds
  questions: [
    {
      id: 'q1-1',
      text: 'What is 1/2 + 1/4?',
      choices: ['1/4', '3/4', '1', '2/4'],
      answerIndex: 1
    },
    {
      id: 'q1-2',
      text: 'Which is larger: 2/3 or 3/5?',
      choices: ['2/3', '3/5', 'They are equal', 'Cannot determine'],
      answerIndex: 0
    },
    {
      id: 'q1-3',
      text: 'Simplify 8/12 to its lowest terms',
      choices: ['4/6', '2/3', '3/4', '1/2'],
      answerIndex: 1
    },
    {
      id: 'q1-4',
      text: 'What is 3/4 × 2/5?',
      choices: ['6/20', '3/10', '5/9', '6/9'],
      answerIndex: 1
    },
    {
      id: 'q1-5',
      text: 'Convert 0.75 to a fraction',
      choices: ['3/4', '7/5', '1/4', '3/5'],
      answerIndex: 0
    },
  ],
};

export const leaderboard = [
  { rank: 1, name: 'Emma Wilson', score: 95, avatar: '' },
  { rank: 2, name: 'James Chen', score: 92, avatar: '' },
  { rank: 3, name: 'Ava Johnson', score: 78, avatar: '', isCurrentUser: true },
  { rank: 4, name: 'Michael Brown', score: 75, avatar: '' },
  { rank: 5, name: 'Sophia Davis', score: 72, avatar: '' },
];

export const upcomingQuizzes = [
  { id: 'uq1', title: 'Algebra Test', date: 'Tomorrow', chapter: 'Algebra Basics' },
  { id: 'uq2', title: 'Geometry Quiz', date: 'In 3 days', chapter: 'Geometry' },
];

export const achievements = [
  { id: 'ach1', title: 'First Quiz', description: 'Complete your first quiz', unlocked: true, icon: 'checkmark.circle', color: '#10B981' },
  { id: 'ach2', title: 'Perfect Score', description: 'Score 100% on any quiz', unlocked: true, icon: 'star.fill', color: '#F59E0B' },
  { id: 'ach3', title: 'Week Warrior', description: 'Study 7 days in a row', unlocked: true, icon: 'flame.fill', color: '#EF4444' },
  { id: 'ach4', title: 'Math Master', description: 'Complete all chapters', unlocked: false, icon: 'crown.fill', color: '#8B5CF6' },
  { id: 'ach5', title: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', unlocked: false, icon: 'bolt.fill', color: '#3B82F6' },
  { id: 'ach6', title: 'Top 10', description: 'Reach top 10 on leaderboard', unlocked: false, icon: 'trophy.fill', color: '#EC4899' },
];
