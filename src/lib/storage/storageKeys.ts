/**
 * Centralized registry of local storage keys.
 * All client-side persistence must use these keys.
 */
export const STORAGE_KEYS = {
  PROGRESS: 'java_progress',
  SELF_EVAL: 'java_self_eval',
  SOLVED_ASSIGNMENTS: 'java_solved_assignments',
  INTERVIEW_REVIEWED: 'java_interview_reviewed',
  KNOWN_FLASHCARDS: 'java_known_flashcards',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
