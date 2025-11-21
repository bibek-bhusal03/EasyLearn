type QuizResult = {
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
};

let lastResult: QuizResult | null = null;

export function setLastResult(r: QuizResult) {
  lastResult = r;
}

export function getLastResult(): QuizResult | null {
  return lastResult;
}

export type { QuizResult };
