import { JavaProgress, MockInterviewResult, SelfEvaluation } from '@/types';
export type { SelfEvaluation };

const JAVA_PROGRESS_KEY = 'java_progress';
const JAVA_SELF_EVAL_KEY = 'java_self_eval';
const JAVA_SOLVED_ASSIGNMENTS_KEY = 'java_solved_assignments';

export type SelfEvalRating = 'mastered' | 'partial' | 'revise';

export interface SelfEvalRecord {
  lessonId: string;
  rating: SelfEvalRating;
  timestamp: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`LocalStorage read failed for key: ${key}`, e);
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`LocalStorage write failed for key: ${key}`, e);
  }
}

function safeRemoveItem(key: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`LocalStorage remove failed for key: ${key}`, e);
  }
}

function getDefaultProgress(): JavaProgress {
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

import { localProgressRepository } from './localProgressRepository';

export class ProgressService {
  static getProgress(): JavaProgress {
    return localProgressRepository.getProgressSync();
  }

  static saveProgress(progress: JavaProgress): void {
    localProgressRepository.saveProgressSync(progress);
  }

  static markLessonComplete(lessonId: string): void {
    const p = this.getProgress();
    if (!p.lessonsCompleted.includes(lessonId)) {
      p.lessonsCompleted.push(lessonId);
      this.saveProgress(p);
    }
  }

  static unmarkLessonComplete(lessonId: string): void {
    const p = this.getProgress();
    p.lessonsCompleted = p.lessonsCompleted.filter(id => id !== lessonId);
    this.saveProgress(p);
  }

  static toggleLessonComplete(lessonId: string): boolean {
    const p = this.getProgress();
    const isDone = p.lessonsCompleted.includes(lessonId);
    if (isDone) {
      p.lessonsCompleted = p.lessonsCompleted.filter(id => id !== lessonId);
    } else {
      p.lessonsCompleted.push(lessonId);
    }
    this.saveProgress(p);
    return !isDone;
  }

  static recordMcqResult(mcqId: string, correct: boolean): void {
    const p = this.getProgress();
    const existing = p.mcqResults[mcqId];
    p.mcqResults[mcqId] = { correct, attempts: (existing?.attempts ?? 0) + 1 };
    this.saveProgress(p);
  }

  static markFlashcardKnown(cardId: string): void {
    localProgressRepository.markFlashcardKnownSync(cardId);
  }

  static markInterviewReviewed(qId: string): void {
    localProgressRepository.markInterviewReviewedSync(qId);
  }

  static updateWeakStrong(moduleId: string, score: number): void {
    const p = this.getProgress();
    if (score >= 70) {
      if (!p.strongModules.includes(moduleId)) p.strongModules.push(moduleId);
      p.weakModules = p.weakModules.filter(m => m !== moduleId);
    } else {
      if (!p.weakModules.includes(moduleId)) p.weakModules.push(moduleId);
      p.strongModules = p.strongModules.filter(m => m !== moduleId);
    }
    this.saveProgress(p);
  }

  static resetProgress(): void {
    localProgressRepository.resetProgress();
  }

  static getSelfEvaluations(): Record<string, SelfEvaluation> {
    return localProgressRepository.getSelfEvaluationsSync();
  }

  static saveSelfEvaluation(lessonId: string, rating: SelfEvalRating): void {
    localProgressRepository.saveSelfEvaluationSync(lessonId, rating);
  }

  static getSolvedAssignments(): string[] {
    return localProgressRepository.getSolvedAssignmentsSync();
  }

  static toggleSolvedAssignment(assignmentKey: string): boolean {
    return localProgressRepository.toggleSolvedAssignmentSync(assignmentKey);
  }
}

// Convenience functional exports matching original javaStorage.ts interface
export const getJavaProgress = () => ProgressService.getProgress();
export const saveJavaProgress = (p: JavaProgress) => ProgressService.saveProgress(p);
export const markLessonComplete = (id: string) => ProgressService.markLessonComplete(id);
export const unmarkLessonComplete = (id: string) => ProgressService.unmarkLessonComplete(id);
export const toggleLessonComplete = (id: string) => ProgressService.toggleLessonComplete(id);
export const recordMcqResult = (id: string, c: boolean) => ProgressService.recordMcqResult(id, c);
export const markFlashcardKnown = (id: string) => ProgressService.markFlashcardKnown(id);
export const markInterviewReviewed = (id: string) => ProgressService.markInterviewReviewed(id);
export const updateWeakStrong = (id: string, s: number) => ProgressService.updateWeakStrong(id, s);
export const resetJavaProgress = () => ProgressService.resetProgress();
export const getSelfEvaluations = () => ProgressService.getSelfEvaluations();
export const saveSelfEvaluation = (id: string, r: SelfEvalRating) => ProgressService.saveSelfEvaluation(id, r);
export const getSolvedAssignments = () => ProgressService.getSolvedAssignments();
export const toggleSolvedAssignment = (key: string) => ProgressService.toggleSolvedAssignment(key);
