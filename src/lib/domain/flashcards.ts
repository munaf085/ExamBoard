/**
 * Pure domain functions for flashcard mastery and review scheduling.
 * No dependencies on React, browser APIs, or storage.
 */

export interface FlashcardMasteryResult {
  knownCount: number;
  totalCount: number;
  remainingCount: number;
  percentage: number;
  isCompleted: boolean;
}

/**
 * Calculates user's flashcard retention and mastery rate.
 */
export function calculateFlashcardMastery(
  knownCardIds: string[],
  totalCards: number
): FlashcardMasteryResult {
  const safeTotal = Math.max(0, totalCards);
  const uniqueKnown = new Set(knownCardIds).size;
  const knownCount = Math.min(uniqueKnown, safeTotal);
  const remainingCount = Math.max(0, safeTotal - knownCount);
  const percentage = safeTotal > 0 ? Math.round((knownCount / safeTotal) * 100) : 0;
  const isCompleted = safeTotal > 0 && knownCount === safeTotal;

  return {
    knownCount,
    totalCount: safeTotal,
    remainingCount,
    percentage,
    isCompleted,
  };
}
