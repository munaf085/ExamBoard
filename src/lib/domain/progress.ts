/**
 * Pure domain functions for progress calculation and skill diagnosis.
 * No dependencies on React, browser APIs, or storage.
 */

export interface ModuleProgressResult {
  completed: number;
  total: number;
  percentage: number;
  isComplete: boolean;
}

/**
 * Calculates progress for a specific module given its lesson IDs and the list of completed IDs.
 */
export function calculateModuleProgress(
  moduleLessonIds: string[],
  completedLessonIds: string[]
): ModuleProgressResult {
  if (!moduleLessonIds || moduleLessonIds.length === 0) {
    return { completed: 0, total: 0, percentage: 0, isComplete: false };
  }

  const completedSet = new Set(completedLessonIds);
  let completed = 0;
  for (const id of moduleLessonIds) {
    if (completedSet.has(id)) {
      completed++;
    }
  }

  const total = moduleLessonIds.length;
  const percentage = Math.round((completed / total) * 100);
  const isComplete = completed === total;

  return {
    completed,
    total,
    percentage,
    isComplete,
  };
}

/**
 * Calculates overall progress percentage across the curriculum.
 */
export function calculateOverallProgress(
  completedCount: number,
  totalCount: number
): number {
  if (totalCount <= 0) return 0;
  return Math.min(100, Math.round((completedCount / totalCount) * 100));
}

/**
 * Analyzes MCQ attempt results by module to classify modules into weak or strong categories.
 * A module is classified as 'strong' if accuracy >= 75% with at least 3 questions attempted.
 * A module is classified as 'weak' if accuracy < 50% with at least 2 questions attempted.
 */
export function determineWeakStrongModules(
  mcqResults: Record<string, { correct: boolean; attempts: number }>,
  moduleToQuestionIds: Record<string, string[]>
): { weak: string[]; strong: string[] } {
  const weak: string[] = [];
  const strong: string[] = [];

  for (const [moduleId, qIds] of Object.entries(moduleToQuestionIds)) {
    if (!qIds || qIds.length === 0) continue;

    let attemptedCount = 0;
    let correctCount = 0;

    for (const qId of qIds) {
      const res = mcqResults[qId];
      if (res && res.attempts > 0) {
        attemptedCount++;
        if (res.correct) {
          correctCount++;
        }
      }
    }

    if (attemptedCount >= 3) {
      const accuracy = correctCount / attemptedCount;
      if (accuracy >= 0.75) {
        strong.push(moduleId);
      } else if (accuracy < 0.5) {
        weak.push(moduleId);
      }
    } else if (attemptedCount >= 2) {
      const accuracy = correctCount / attemptedCount;
      if (accuracy < 0.5) {
        weak.push(moduleId);
      }
    }
  }

  return { weak, strong };
}
