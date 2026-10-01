import { JavaProgress, SelfEvalRating, SelfEvaluation } from '@/types';
import { ProgressRepository } from './progressRepository';
import { STORAGE_KEYS } from './storageKeys';

/**
 * Returns fresh clone of the default JavaProgress object to prevent shared reference mutations.
 */
export function getDefaultProgress(): JavaProgress {
  return {
    lessonsCompleted: [],
    mcqResults: {},
    codingAttempted: [],
    interviewReviewed: [],
    flashcardsKnown: [],
    mockInterviewsDone: 0,
    weakModules: [],
    strongModules: [],
    lastUpdated: 0,
  };
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    console.warn(`[LocalProgressRepository] Failed to read ${key} from localStorage:`, err);
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`[LocalProgressRepository] Failed to write ${key} to localStorage:`, err);
  }
}

function safeRemoveItem(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[LocalProgressRepository] Failed to remove ${key} from localStorage:`, err);
  }
}

/**
 * Concrete browser-backed implementation of ProgressRepository.
 * Handles SSR safety, defensive JSON deserialization, and state corruption recovery.
 */
export class LocalProgressRepository implements ProgressRepository {
  // Synchronous reader methods for immediate React state initialization
  public getProgressSync(): JavaProgress {
    const raw = safeGetItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return getDefaultProgress();
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null) {
        return getDefaultProgress();
      }
      return {
        lessonsCompleted: Array.isArray(parsed.lessonsCompleted) ? parsed.lessonsCompleted : [],
        mcqResults: (parsed.mcqResults && typeof parsed.mcqResults === 'object') ? parsed.mcqResults : {},
        codingAttempted: Array.isArray(parsed.codingAttempted) ? parsed.codingAttempted : [],
        interviewReviewed: Array.isArray(parsed.interviewReviewed) ? parsed.interviewReviewed : [],
        flashcardsKnown: Array.isArray(parsed.flashcardsKnown) ? parsed.flashcardsKnown : [],
        mockInterviewsDone: typeof parsed.mockInterviewsDone === 'number' ? parsed.mockInterviewsDone : 0,
        weakModules: Array.isArray(parsed.weakModules) ? parsed.weakModules : [],
        strongModules: Array.isArray(parsed.strongModules) ? parsed.strongModules : [],
        lastUpdated: typeof parsed.lastUpdated === 'number' ? parsed.lastUpdated : Date.now(),
      };
    } catch {
      console.warn('[LocalProgressRepository] Corrupted progress detected. Falling back to default.');
      return getDefaultProgress();
    }
  }

  public saveProgressSync(progress: JavaProgress): void {
    safeSetItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }

  public getSelfEvaluationsSync(): Record<string, SelfEvaluation> {
    const raw = safeGetItem(STORAGE_KEYS.SELF_EVAL);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return (typeof parsed === 'object' && parsed !== null) ? parsed : {};
    } catch {
      return {};
    }
  }

  public saveSelfEvaluationSync(lessonId: string, rating: SelfEvalRating): void {
    const evals = this.getSelfEvaluationsSync();
    evals[lessonId] = {
      lessonId,
      rating,
      evaluatedAt: new Date().toISOString(),
    };
    safeSetItem(STORAGE_KEYS.SELF_EVAL, JSON.stringify(evals));
  }

  public getSolvedAssignmentsSync(): string[] {
    const raw = safeGetItem(STORAGE_KEYS.SOLVED_ASSIGNMENTS);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public toggleSolvedAssignmentSync(assignmentId: string): boolean {
    const solved = this.getSolvedAssignmentsSync();
    const index = solved.indexOf(assignmentId);
    let isNowSolved = false;

    if (index >= 0) {
      solved.splice(index, 1);
    } else {
      solved.push(assignmentId);
      isNowSolved = true;
    }

    safeSetItem(STORAGE_KEYS.SOLVED_ASSIGNMENTS, JSON.stringify(solved));
    return isNowSolved;
  }

  public getReviewedInterviewsSync(): string[] {
    const raw = safeGetItem(STORAGE_KEYS.INTERVIEW_REVIEWED);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public markInterviewReviewedSync(questionId: string): void {
    const reviewed = this.getReviewedInterviewsSync();
    if (!reviewed.includes(questionId)) {
      reviewed.push(questionId);
      safeSetItem(STORAGE_KEYS.INTERVIEW_REVIEWED, JSON.stringify(reviewed));
    }
  }

  public getKnownFlashcardsSync(): string[] {
    const raw = safeGetItem(STORAGE_KEYS.KNOWN_FLASHCARDS);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public markFlashcardKnownSync(flashcardId: string): void {
    const known = this.getKnownFlashcardsSync();
    if (!known.includes(flashcardId)) {
      known.push(flashcardId);
      safeSetItem(STORAGE_KEYS.KNOWN_FLASHCARDS, JSON.stringify(known));
    }
  }

  // Promise-based standard interface methods
  public async getProgress(): Promise<JavaProgress> {
    return this.getProgressSync();
  }

  public async saveProgress(progress: JavaProgress): Promise<void> {
    this.saveProgressSync(progress);
  }

  public async resetProgress(): Promise<void> {
    safeRemoveItem(STORAGE_KEYS.PROGRESS);
    safeRemoveItem(STORAGE_KEYS.SELF_EVAL);
    safeRemoveItem(STORAGE_KEYS.SOLVED_ASSIGNMENTS);
    safeRemoveItem(STORAGE_KEYS.INTERVIEW_REVIEWED);
    safeRemoveItem(STORAGE_KEYS.KNOWN_FLASHCARDS);
  }

  public async getSelfEvaluations(): Promise<Record<string, SelfEvaluation>> {
    return this.getSelfEvaluationsSync();
  }

  public async saveSelfEvaluation(lessonId: string, rating: SelfEvalRating): Promise<void> {
    this.saveSelfEvaluationSync(lessonId, rating);
  }

  public async getSolvedAssignments(): Promise<string[]> {
    return this.getSolvedAssignmentsSync();
  }

  public async toggleSolvedAssignment(assignmentId: string): Promise<boolean> {
    return this.toggleSolvedAssignmentSync(assignmentId);
  }

  public async getReviewedInterviews(): Promise<string[]> {
    return this.getReviewedInterviewsSync();
  }

  public async markInterviewReviewed(questionId: string): Promise<void> {
    this.markInterviewReviewedSync(questionId);
  }

  public async getKnownFlashcards(): Promise<string[]> {
    return this.getKnownFlashcardsSync();
  }

  public async markFlashcardKnown(flashcardId: string): Promise<void> {
    this.markFlashcardKnownSync(flashcardId);
  }
}

export const localProgressRepository = new LocalProgressRepository();
