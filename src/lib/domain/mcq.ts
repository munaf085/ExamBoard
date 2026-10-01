/**
 * Pure domain functions for MCQ scoring and evaluation.
 * No dependencies on React, browser APIs, or storage.
 */

export interface McqQuestionLike {
  id: string;
  correctAnswer: number;
}

export interface McqScoreResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  performance: 'Mastered' | 'Proficient' | 'Needs Review';
}

/**
 * Evaluates whether a selected option matches the correct answer index.
 */
export function evaluateAnswer(selectedOption: number, correctAnswer: number): boolean {
  return selectedOption === correctAnswer;
}

/**
 * Calculates total score, percentage, and performance classification for a set of answers.
 */
export function calculateMcqScore(
  answers: Record<string, number>,
  questions: McqQuestionLike[],
  passThreshold = 70
): McqScoreResult {
  if (!questions || questions.length === 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      passed: false,
      performance: 'Needs Review',
    };
  }

  let score = 0;
  for (const q of questions) {
    if (answers[q.id] !== undefined && answers[q.id] === q.correctAnswer) {
      score += 1;
    }
  }

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= passThreshold;

  let performance: 'Mastered' | 'Proficient' | 'Needs Review';
  if (percentage >= 85) {
    performance = 'Mastered';
  } else if (percentage >= 70) {
    performance = 'Proficient';
  } else {
    performance = 'Needs Review';
  }

  return {
    score,
    total,
    percentage,
    passed,
    performance,
  };
}
