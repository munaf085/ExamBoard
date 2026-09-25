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
