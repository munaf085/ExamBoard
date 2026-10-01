import { describe, it, expect } from 'vitest';
import {
  evaluateAnswer,
  calculateMcqScore,
  calculateModuleProgress,
  calculateOverallProgress,
  determineWeakStrongModules,
  calculateFlashcardMastery,
  calculateInterviewScore
} from '@/lib/domain';

describe('Domain Logic: Pure Business Rules', () => {
  describe('MCQ Scoring', () => {
    it('evaluates answers correctly', () => {
      expect(evaluateAnswer(1, 1)).toBe(true);
      expect(evaluateAnswer(0, 2)).toBe(false);
    });

    it('calculates score for empty questions list', () => {
      const result = calculateMcqScore({}, []);
      expect(result.score).toBe(0);
      expect(result.total).toBe(0);
      expect(result.passed).toBe(false);
    });

    it('calculates score, percentage and mastery accurately', () => {
      const questions = [
        { id: 'q1', correctAnswer: 0 },
        { id: 'q2', correctAnswer: 1 },
        { id: 'q3', correctAnswer: 2 },
        { id: 'q4', correctAnswer: 3 },
      ];
      const answers = { q1: 0, q2: 1, q3: 2, q4: 0 }; // 3/4 correct = 75%
      const result = calculateMcqScore(answers, questions);

      expect(result.score).toBe(3);
      expect(result.total).toBe(4);
      expect(result.percentage).toBe(75);
      expect(result.passed).toBe(true);
      expect(result.performance).toBe('Proficient');
    });

    it('classifies 100% as Mastered', () => {
      const questions = [{ id: 'q1', correctAnswer: 2 }];
      const result = calculateMcqScore({ q1: 2 }, questions);
      expect(result.percentage).toBe(100);
      expect(result.performance).toBe('Mastered');
    });
  });

  describe('Progress Calculation', () => {
    it('calculates module progress with subsets of completed lessons', () => {
      const moduleLessons = ['l1', 'l2', 'l3', 'l4'];
      const completed = ['l1', 'l3', 'extra-lesson'];

      const result = calculateModuleProgress(moduleLessons, completed);
      expect(result.completed).toBe(2);
      expect(result.total).toBe(4);
      expect(result.percentage).toBe(50);
      expect(result.isComplete).toBe(false);
    });

    it('identifies completed modules correctly', () => {
      const moduleLessons = ['l1', 'l2'];
      const completed = ['l1', 'l2'];

      const result = calculateModuleProgress(moduleLessons, completed);
      expect(result.completed).toBe(2);
      expect(result.isComplete).toBe(true);
      expect(result.percentage).toBe(100);
    });

    it('calculates overall curriculum progress with bounds safety', () => {
      expect(calculateOverallProgress(10, 20)).toBe(50);
      expect(calculateOverallProgress(0, 77)).toBe(0);
      expect(calculateOverallProgress(77, 77)).toBe(100);
      expect(calculateOverallProgress(100, 77)).toBe(100); // capped at 100%
      expect(calculateOverallProgress(5, 0)).toBe(0); // division by zero safety
    });

    it('detects strong and weak modules based on accuracy thresholds', () => {
      const moduleQuestionMap = {
        'mod-a': ['q1', 'q2', 'q3', 'q4'],
        'mod-b': ['q5', 'q6', 'q7', 'q8'],
      };
      const mcqResults = {
        q1: { correct: true, attempts: 1 },
        q2: { correct: true, attempts: 1 },
        q3: { correct: true, attempts: 1 },
        q4: { correct: true, attempts: 1 }, // 4/4 = 100% -> strong
        q5: { correct: false, attempts: 1 },
        q6: { correct: false, attempts: 1 },
        q7: { correct: false, attempts: 1 },
        q8: { correct: true, attempts: 1 }, // 1/4 = 25% -> weak
      };

      const { weak, strong } = determineWeakStrongModules(mcqResults, moduleQuestionMap);
      expect(strong).toContain('mod-a');
      expect(weak).toContain('mod-b');
    });
  });

  describe('Flashcard Mastery', () => {
    it('calculates flashcard mastery metrics', () => {
      const result = calculateFlashcardMastery(['f1', 'f2', 'f3'], 10);
      expect(result.knownCount).toBe(3);
      expect(result.totalCount).toBe(10);
      expect(result.remainingCount).toBe(7);
      expect(result.percentage).toBe(30);
      expect(result.isCompleted).toBe(false);
    });

    it('handles deduplication and complete mastery', () => {
      const result = calculateFlashcardMastery(['f1', 'f1', 'f2'], 2);
      expect(result.knownCount).toBe(2);
      expect(result.isCompleted).toBe(true);
      expect(result.percentage).toBe(100);
    });
  });

  describe('Mock Interview Scoring', () => {
    it('scores mock interview responses with fractional weighting', () => {
      const results: Record<string, 'know' | 'partial' | 'dont-know' | null> = {
        'i1': 'know',      // 1.0
        'i2': 'partial',   // 0.5
        'i3': 'dont-know', // 0.0
        'i4': 'know',      // 1.0
      }; // Total points: 2.5 / 4 = 62.5% -> 63%

      const score = calculateInterviewScore(results, 4);
      expect(score.totalQuestions).toBe(4);
      expect(score.evaluatedCount).toBe(4);
      expect(score.knowCount).toBe(2);
      expect(score.partialCount).toBe(1);
      expect(score.dontKnowCount).toBe(1);
      expect(score.scorePercentage).toBe(63);
      expect(score.rating).toBe('Solid Understanding');
    });

    it('identifies Placement Ready candidates (>= 80%)', () => {
      const results: Record<string, 'know' | 'partial' | 'dont-know' | null> = {
        'i1': 'know',
        'i2': 'know',
        'i3': 'know',
        'i4': 'know',
        'i5': 'partial',
      }; // 4.5 / 5 = 90%
      const score = calculateInterviewScore(results, 5);
      expect(score.scorePercentage).toBe(90);
      expect(score.rating).toBe('Placement Ready');
    });
  });
});
