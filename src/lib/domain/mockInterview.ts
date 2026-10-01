/**
 * Pure domain functions for mock interview evaluation and scoring.
 * No dependencies on React, browser APIs, or storage.
 */

export type InterviewResponseLevel = 'know' | 'partial' | 'dont-know' | null;

export interface InterviewScoreResult {
  totalQuestions: number;
  evaluatedCount: number;
  knowCount: number;
  partialCount: number;
  dontKnowCount: number;
  scorePercentage: number;
  rating: 'Placement Ready' | 'Solid Understanding' | 'Needs Focused Revision';
}

/**
 * Calculates interview performance metrics based on user self-evaluation:
 * - 'know': 1.0 point
 * - 'partial': 0.5 point
 * - 'dont-know': 0.0 points
 */
export function calculateInterviewScore(
  results: Record<string, InterviewResponseLevel>,
  totalQuestions: number
): InterviewScoreResult {
  const safeTotal = Math.max(1, totalQuestions);
  let knowCount = 0;
  let partialCount = 0;
  let dontKnowCount = 0;
  let evaluatedCount = 0;

  for (const level of Object.values(results)) {
    if (!level) continue;
    evaluatedCount++;
    if (level === 'know') {
      knowCount++;
    } else if (level === 'partial') {
      partialCount++;
    } else if (level === 'dont-know') {
      dontKnowCount++;
    }
  }

  const rawScore = (knowCount * 1.0) + (partialCount * 0.5);
  const scorePercentage = Math.round((rawScore / safeTotal) * 100);

  let rating: 'Placement Ready' | 'Solid Understanding' | 'Needs Focused Revision';
  if (scorePercentage >= 80) {
    rating = 'Placement Ready';
  } else if (scorePercentage >= 60) {
    rating = 'Solid Understanding';
  } else {
    rating = 'Needs Focused Revision';
  }

  return {
    totalQuestions: safeTotal,
    evaluatedCount,
    knowCount,
    partialCount,
    dontKnowCount,
    scorePercentage,
    rating,
  };
}
