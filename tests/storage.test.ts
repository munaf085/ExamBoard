import { describe, it, expect, beforeEach } from 'vitest';
import {
  getJavaProgress,
  markLessonComplete,
  unmarkLessonComplete,
  toggleLessonComplete,
  recordMcqResult,
  saveSelfEvaluation,
  getSelfEvaluations,
  toggleSolvedAssignment,
  getSolvedAssignments,
  resetJavaProgress
} from '@/lib/storage/progressStorage';

describe('ProgressService & Local Storage Abstraction', () => {
  // In-memory mock localStorage
  beforeEach(() => {
    window.localStorage.clear();
    resetJavaProgress();
  });

  it('should return default progress when storage is empty', () => {
    const progress = getJavaProgress();
    expect(progress).toBeDefined();
    expect(progress.lessonsCompleted).toEqual([]);
    expect(progress.mcqResults).toEqual({});
    expect(progress.weakModules).toEqual([]);
    expect(progress.strongModules).toEqual([]);
  });

  it('should mark and unmark a lesson complete', () => {
    markLessonComplete('what-is-java');
    expect(getJavaProgress().lessonsCompleted).toContain('what-is-java');

    unmarkLessonComplete('what-is-java');
    expect(getJavaProgress().lessonsCompleted).not.toContain('what-is-java');
  });

  it('should toggle a lesson complete state', () => {
    const isDone = toggleLessonComplete('what-is-java');
    expect(isDone).toBe(true);
    expect(getJavaProgress().lessonsCompleted).toContain('what-is-java');

    const isUndone = toggleLessonComplete('what-is-java');
    expect(isUndone).toBe(false);
    expect(getJavaProgress().lessonsCompleted).not.toContain('what-is-java');
  });

  it('should record MCQ results and attempts', () => {
    recordMcqResult('fund-1', true);
    const p1 = getJavaProgress();
    expect(p1.mcqResults['fund-1']).toEqual({ correct: true, attempts: 1 });

    recordMcqResult('fund-1', false);
    const p2 = getJavaProgress();
    expect(p2.mcqResults['fund-1']).toEqual({ correct: false, attempts: 2 });
  });

  it('should save and retrieve self-evaluations', () => {
    saveSelfEvaluation('what-is-java', 'mastered');
    const evals = getSelfEvaluations();
    expect(evals['what-is-java']).toBeDefined();
    expect(evals['what-is-java'].rating).toBe('mastered');
  });

  it('should toggle and retrieve solved assignments', () => {
    const added = toggleSolvedAssignment('assignment-1');
    expect(added).toBe(true);
    expect(getSolvedAssignments()).toContain('assignment-1');

    const removed = toggleSolvedAssignment('assignment-1');
    expect(removed).toBe(false);
    expect(getSolvedAssignments()).not.toContain('assignment-1');
  });

  it('should reset all progress', () => {
    markLessonComplete('what-is-java');
    saveSelfEvaluation('what-is-java', 'mastered');
    toggleSolvedAssignment('assignment-1');

    resetJavaProgress();

    expect(getJavaProgress().lessonsCompleted).toEqual([]);
    expect(getSelfEvaluations()).toEqual({});
    expect(getSolvedAssignments()).toEqual([]);
  });

  describe('Corrupted Storage Recovery & Defensive Fallbacks', () => {
    it('should recover gracefully when java_progress contains malformed JSON', () => {
      window.localStorage.setItem('java_progress', 'INVALID_JSON{{{---');
      const progress = getJavaProgress();
      expect(progress).toBeDefined();
      expect(progress.lessonsCompleted).toEqual([]);
      expect(progress.mcqResults).toEqual({});
    });

    it('should recover gracefully when java_self_eval contains malformed JSON', () => {
      window.localStorage.setItem('java_self_eval', '{corrupt json');
      const evals = getSelfEvaluations();
      expect(evals).toEqual({});
    });

    it('should recover gracefully when java_solved_assignments is not an array', () => {
      window.localStorage.setItem('java_solved_assignments', '{"not":"an array"}');
      const solved = getSolvedAssignments();
      expect(solved).toEqual([]);
    });
  });

  describe('LocalProgressRepository Class (Standard Interface)', () => {
    it('should implement the async ProgressRepository interface', async () => {
      const { localProgressRepository } = await import('@/lib/storage/localProgressRepository');
      await localProgressRepository.resetProgress();

      const p0 = await localProgressRepository.getProgress();
      expect(p0.lessonsCompleted).toEqual([]);

      p0.lessonsCompleted.push('lesson-test-1');
      await localProgressRepository.saveProgress(p0);

      const p1 = await localProgressRepository.getProgress();
      expect(p1.lessonsCompleted).toContain('lesson-test-1');

      await localProgressRepository.saveSelfEvaluation('lesson-test-1', 'mastered');
      const evals = await localProgressRepository.getSelfEvaluations();
      expect(evals['lesson-test-1'].rating).toBe('mastered');

      const isSolved = await localProgressRepository.toggleSolvedAssignment('assign-1');
      expect(isSolved).toBe(true);
      const solved = await localProgressRepository.getSolvedAssignments();
      expect(solved).toContain('assign-1');

      await localProgressRepository.markInterviewReviewed('jt-1');
      const reviewed = await localProgressRepository.getReviewedInterviews();
      expect(reviewed).toContain('jt-1');

      await localProgressRepository.markFlashcardKnown('jf_1');
      const known = await localProgressRepository.getKnownFlashcards();
      expect(known).toContain('jf_1');
    });
  });
});
