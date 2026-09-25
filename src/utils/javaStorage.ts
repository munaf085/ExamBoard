import { JavaProgress, MockInterviewResult } from '../types';

const JAVA_PROGRESS_KEY = 'java_progress';

export function getJavaProgress(): JavaProgress {
  const raw = localStorage.getItem(JAVA_PROGRESS_KEY);
  if (!raw) return {
    lessonsCompleted: [],
    mcqResults: {},
    codingAttempted: [],
    interviewReviewed: [],
    flashcardsKnown: [],
    mockInterviewsDone: 0,
    weakModules: [],
    strongModules: [],
    lastUpdated: Date.now(),
  };
  try { return JSON.parse(raw) as JavaProgress; } catch { return getJavaProgress(); }
}

export function saveJavaProgress(progress: JavaProgress): void {
  progress.lastUpdated = Date.now();
  localStorage.setItem(JAVA_PROGRESS_KEY, JSON.stringify(progress));
}

export function markLessonComplete(lessonId: string): void {
  const p = getJavaProgress();
  if (!p.lessonsCompleted.includes(lessonId)) p.lessonsCompleted.push(lessonId);
  saveJavaProgress(p);
}

export function recordMcqResult(mcqId: string, correct: boolean): void {
  const p = getJavaProgress();
  const existing = p.mcqResults[mcqId];
  p.mcqResults[mcqId] = { correct, attempts: (existing?.attempts ?? 0) + 1 };
  saveJavaProgress(p);
}

export function markFlashcardKnown(cardId: string): void {
  const p = getJavaProgress();
  if (!p.flashcardsKnown.includes(cardId)) p.flashcardsKnown.push(cardId);
  saveJavaProgress(p);
}

export function markInterviewReviewed(qId: string): void {
  const p = getJavaProgress();
  if (!p.interviewReviewed.includes(qId)) p.interviewReviewed.push(qId);
  saveJavaProgress(p);
}

export function updateWeakStrong(moduleId: string, score: number): void {
  const p = getJavaProgress();
  if (score >= 70) {
    if (!p.strongModules.includes(moduleId)) p.strongModules.push(moduleId);
    p.weakModules = p.weakModules.filter(m => m !== moduleId);
  } else {
    if (!p.weakModules.includes(moduleId)) p.weakModules.push(moduleId);
    p.strongModules = p.strongModules.filter(m => m !== moduleId);
  }
  saveJavaProgress(p);
}

export function resetJavaProgress(): void {
  localStorage.removeItem(JAVA_PROGRESS_KEY);
}

// ─────────────────────────────────────────────────────────────
// LESSON SELF-EVALUATION INTERVIEW RATINGS
// ─────────────────────────────────────────────────────────────
const JAVA_SELF_EVAL_KEY = 'java_self_eval';

export type SelfEvalRating = 'mastered' | 'partial' | 'revise';

export interface SelfEvalRecord {
  lessonId: string;
  rating: SelfEvalRating;
  timestamp: number;
}

export function getSelfEvaluations(): Record<string, SelfEvalRecord> {
  const raw = localStorage.getItem(JAVA_SELF_EVAL_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export function saveSelfEvaluation(lessonId: string, rating: SelfEvalRating): void {
  const evals = getSelfEvaluations();
  evals[lessonId] = { lessonId, rating, timestamp: Date.now() };
  localStorage.setItem(JAVA_SELF_EVAL_KEY, JSON.stringify(evals));
}

// ─────────────────────────────────────────────────────────────
// PRACTICE ASSIGNMENTS SOLVED TRACKER
// ─────────────────────────────────────────────────────────────
const JAVA_SOLVED_ASSIGNMENTS_KEY = 'java_solved_assignments';

export function getSolvedAssignments(): string[] {
  const raw = localStorage.getItem(JAVA_SOLVED_ASSIGNMENTS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as string[]; } catch { return []; }
}

export function toggleSolvedAssignment(assignmentKey: string): boolean {
  const solved = getSolvedAssignments();
  const exists = solved.includes(assignmentKey);
  const updated = exists ? solved.filter(k => k !== assignmentKey) : [...solved, assignmentKey];
  localStorage.setItem(JAVA_SOLVED_ASSIGNMENTS_KEY, JSON.stringify(updated));
  return !exists;
}

