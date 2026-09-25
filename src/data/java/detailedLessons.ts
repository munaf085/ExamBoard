// ============================================================
// DEDICATED INNER LESSONS FOR BEGINNERS
// Deep, individual sub-topic lessons for Fundamentals,
// Data Types, Operators, and Control Flow.
// ============================================================

export interface MiniQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PracticeProblem {
  title: string;
  problemStatement: string;
  code?: string;
  options?: string[];
  correctOptionIndex?: number;
  hint: string;
  solution: string;
  explanation: string;
}

export interface ProgrammingExercise {
  id?: string;
  title: string;
  problemStatement: string;
  hint?: string;
  solutionCode: string;
  output?: string;
  explanation?: string;
}

export interface DetailedLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  beginnerAnalogy: string;
  coreExplanation: string[];
  diagram?: string;
  codeSnippet: {
    title: string;
    code: string;
    lineByLineExplanation: { line: string; explanation: string }[];
    output: string;
  };
  beginnerMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
    followUp?: string;
    keyPhrases?: string[];
    commonMistakeAnswer?: string;
  }[];
  miniQuiz: MiniQuizQuestion[];
  practiceProblem?: PracticeProblem;
  practiceProblems?: PracticeProblem[];
  programmingExercises?: ProgrammingExercise[];
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    output?: string;
  }[];
  interviewTakeaways?: string[];
  cheatSheet?: {
    summary: string;
    syntaxTemplate?: string;
    rules: { rule: string; explanation: string }[];
    quickComparison?: { aspect: string; optionA: string; optionB: string }[];
  };
}

import { fundamentalsLessons } from './sublessons/fundamentalsLessons';
import { dataTypesLessons } from './sublessons/dataTypesLessons';
import { operatorsLessons } from './sublessons/operatorsLessons';
import { controlFlowLessons } from './sublessons/controlFlowLessons';

export const DETAILED_LESSONS: Record<string, DetailedLesson> = {
  ...fundamentalsLessons,
  ...dataTypesLessons,
  ...operatorsLessons,
  ...controlFlowLessons,
};

// ============================================================
// HELPER FUNCTIONS FOR SUB-LESSON NAVIGATION
// ============================================================

export function getDetailedLesson(id: string): DetailedLesson | undefined {
  return DETAILED_LESSONS[id];
}

export function getAllDetailedLessons(): DetailedLesson[] {
  return Object.values(DETAILED_LESSONS).sort((a, b) =>
    a.lessonNumber.localeCompare(b.lessonNumber, undefined, { numeric: true })
  );
}

export function getLessonsForModule(moduleId: string): DetailedLesson[] {
  return Object.values(DETAILED_LESSONS)
    .filter(l => l.moduleId === moduleId)
    .sort((a, b) => a.lessonNumber.localeCompare(b.lessonNumber, undefined, { numeric: true }));
}

export function getAdjacentLessons(currentId: string): { prev?: DetailedLesson; next?: DetailedLesson } {
  const current = DETAILED_LESSONS[currentId];
  if (!current) return {};
  const moduleLessons = getLessonsForModule(current.moduleId);
  const idx = moduleLessons.findIndex(l => l.id === currentId);
  if (idx !== -1) {
    return {
      prev: idx > 0 ? moduleLessons[idx - 1] : undefined,
      next: idx < moduleLessons.length - 1 ? moduleLessons[idx + 1] : undefined
    };
  }
  const all = getAllDetailedLessons();
  const allIdx = all.findIndex(l => l.id === currentId);
  return {
    prev: allIdx > 0 ? all[allIdx - 1] : undefined,
    next: allIdx < all.length - 1 ? all[allIdx + 1] : undefined
  };
}
