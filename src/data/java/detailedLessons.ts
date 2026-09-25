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
    followUpAnswer?: string;
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
import { stringsLessons } from './sublessons/stringsLessons';
import { arraysLessons } from './sublessons/arraysLessons';
import { methodsLessons } from './sublessons/methodsLessons';
import { oopLessons } from './sublessons/oopLessons';

import { fundamentalsExercises } from './sublessons/fundamentalsExercises';
import { dataTypesExercises } from './sublessons/dataTypesExercises';
import { operatorsExercises } from './sublessons/operatorsExercises';
import { controlFlowExercises } from './sublessons/controlFlowExercises';
import { stringsExercises } from './sublessons/stringsExercises';
import { arraysExercises } from './sublessons/arraysExercises';
import { methodsExercises } from './sublessons/methodsExercises';
import { oopExercises } from './sublessons/oopExercises';

export const ALL_SUBLESSON_EXERCISES: Record<string, ProgrammingExercise[]> = {
  ...fundamentalsExercises,
  ...dataTypesExercises,
  ...operatorsExercises,
  ...controlFlowExercises,
  ...stringsExercises,
  ...arraysExercises,
  ...methodsExercises,
  ...oopExercises,
};

const rawLessons: Record<string, DetailedLesson> = {
  ...fundamentalsLessons,
  ...dataTypesLessons,
  ...operatorsLessons,
  ...controlFlowLessons,
  ...stringsLessons,
  ...arraysLessons,
  ...methodsLessons,
  ...oopLessons,
};

// Populate programmingExercises for every sub-lesson so none is empty
export const DETAILED_LESSONS: Record<string, DetailedLesson> = Object.fromEntries(
  Object.entries(rawLessons).map(([key, lesson]) => [
    key,
    {
      ...lesson,
      programmingExercises: ALL_SUBLESSON_EXERCISES[lesson.id] || lesson.programmingExercises || [],
    }
  ])
);

// ============================================================
// HELPER FUNCTIONS FOR SUB-LESSON NAVIGATION
// ============================================================

export function getDetailedLesson(id?: string): DetailedLesson | undefined {
  if (!id) return undefined;
  if (DETAILED_LESSONS[id]) return DETAILED_LESSONS[id];

  const cleanId = id.trim().toLowerCase();
  if (DETAILED_LESSONS[cleanId]) return DETAILED_LESSONS[cleanId];

  // Specific common aliases
  const aliases: Record<string, string> = {
    'if-else-ladders': 'if-else-ladder',
    'if-else': 'if-else-ladder',
    'while-loops': 'while-loop',
    'for-loop': 'for-loop-deep-dive',
    'for-loops': 'for-loop-deep-dive',
    'do-while-loops': 'do-while-loop',
    'do-while': 'do-while-loop',
    'nested-loops': 'nested-loops-and-tracing',
    'switch': 'switch-statement',
    'switches': 'switch-statement',
    'switch-expression': 'switch-expressions',
    'variables': 'variables-and-scope',
    'primitive-types': 'primitive-types-deep-dive',
    'wrapper-class': 'wrapper-classes',
    'strings': 'string-immutability-and-memory',
    'string': 'string-immutability-and-memory',
    'string-pool': 'string-immutability-and-memory',
    'string-immutability': 'string-immutability-and-memory',
    'string-equality': 'string-equality-and-comparisons',
    'string-methods': 'string-methods-and-manipulation',
    'stringbuilder': 'stringbuilder-vs-stringbuffer',
    'string-builder': 'stringbuilder-vs-stringbuffer',
    'arrays': 'array-declaration-and-memory',
    'array': 'array-declaration-and-memory',
    'array-memory': 'array-declaration-and-memory',
    'array-traversals': 'array-traversals-and-algorithms',
    'array-algorithms': 'array-traversals-and-algorithms',
    'arrays-class': 'arrays-utility-class',
    'arrays-utility': 'arrays-utility-class',
    '2d-arrays': 'two-dimensional-arrays-and-matrices',
    'matrices': 'two-dimensional-arrays-and-matrices',
    'matrix': 'two-dimensional-arrays-and-matrices',
    'methods': 'method-anatomy-and-returns',
    'method': 'method-anatomy-and-returns',
    'pass-by-value': 'pass-by-value-deep-dive',
    'method-overloading': 'method-overloading-and-varargs',
    'overloading': 'method-overloading-and-varargs',
    'varargs': 'method-overloading-and-varargs',
    'recursion': 'recursion-and-call-stack',
    'call-stack': 'recursion-and-call-stack',
    'classes': 'classes-objects-instantiation',
    'class': 'classes-objects-instantiation',
    'objects': 'classes-objects-instantiation',
    'object': 'classes-objects-instantiation',
    'constructors': 'constructors-and-chaining',
    'constructor': 'constructors-and-chaining',
    'static': 'static-vs-instance-members',
    'encapsulation': 'encapsulation-principles',
    'access-modifiers': 'access-modifiers-deep-dive',
    'getters-setters': 'getters-setters-defensive-copying',
    'immutability': 'immutable-class-pattern',
    'immutable': 'immutable-class-pattern',
    'inheritance': 'extends-and-is-a',
    'extends': 'extends-and-is-a',
    'super': 'super-constructor-chaining',
    'overriding': 'method-overriding-rules',
    'final': 'final-keyword-in-oop',
    'polymorphism': 'compile-vs-runtime-polymorphism',
    'dynamic-dispatch': 'dynamic-method-dispatch',
    'vtable': 'dynamic-method-dispatch',
    'casting': 'casting-and-classcastexception',
    'downcasting': 'casting-and-classcastexception',
    'upcasting': 'casting-and-classcastexception',
    'instanceof': 'instanceof-and-pattern-matching',
    'pattern-matching': 'instanceof-and-pattern-matching',
    'abstraction': 'abstract-classes-and-methods',
    'abstract-class': 'abstract-classes-and-methods',
    'abstract': 'abstract-classes-and-methods',
    'interfaces': 'interfaces-contracts-and-types',
    'interface': 'interfaces-contracts-and-types',
    'default-methods': 'default-and-static-methods',
    'object-class': 'object-root-class',
    'tostring': 'tostring-and-representation',
    'equals-hashcode': 'equals-hashcode-contract',
    'equals': 'equals-hashcode-contract',
    'hashcode': 'equals-hashcode-contract',
    'cloning': 'cloning-shallow-deep-copy',
    'clone': 'cloning-shallow-deep-copy',
  };

  if (aliases[cleanId] && DETAILED_LESSONS[aliases[cleanId]]) {
    return DETAILED_LESSONS[aliases[cleanId]];
  }

  // If ending with 's', try singular
  if (cleanId.endsWith('s') && DETAILED_LESSONS[cleanId.slice(0, -1)]) {
    return DETAILED_LESSONS[cleanId.slice(0, -1)];
  }

  // If singular, try plural
  if (DETAILED_LESSONS[cleanId + 's']) {
    return DETAILED_LESSONS[cleanId + 's'];
  }

  // Search across all lessons by fuzzy slug or title
  return Object.values(DETAILED_LESSONS).find(l =>
    l.id.toLowerCase() === cleanId ||
    l.id.toLowerCase().replace(/s$/, '') === cleanId.replace(/s$/, '') ||
    l.id.replace(/-/g, '').toLowerCase() === cleanId.replace(/-/g, '').toLowerCase() ||
    l.title.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanId.replace(/[^a-z0-9]/g, '')
  );
}

export function getAllDetailedLessons(): DetailedLesson[] {
  const uniqueLessons = new Map<string, DetailedLesson>();
  for (const lesson of Object.values(DETAILED_LESSONS)) {
    uniqueLessons.set(lesson.id, lesson);
  }
  return Array.from(uniqueLessons.values()).sort((a, b) =>
    a.lessonNumber.localeCompare(b.lessonNumber, undefined, { numeric: true })
  );
}

export function getLessonsForModule(moduleId: string): DetailedLesson[] {
  const uniqueLessons = new Map<string, DetailedLesson>();
  for (const lesson of Object.values(DETAILED_LESSONS)) {
    if (lesson.moduleId === moduleId) {
      uniqueLessons.set(lesson.id, lesson);
    }
  }
  return Array.from(uniqueLessons.values()).sort((a, b) =>
    a.lessonNumber.localeCompare(b.lessonNumber, undefined, { numeric: true })
  );
}

export function getAdjacentLessons(currentId: string): { prev?: DetailedLesson; next?: DetailedLesson } {
  const current = getDetailedLesson(currentId);
  if (!current) return {};
  const moduleLessons = getLessonsForModule(current.moduleId);
  const idx = moduleLessons.findIndex(l => l.id === current.id);
  if (idx !== -1) {
    return {
      prev: idx > 0 ? moduleLessons[idx - 1] : undefined,
      next: idx < moduleLessons.length - 1 ? moduleLessons[idx + 1] : undefined
    };
  }
  const all = getAllDetailedLessons();
  const allIdx = all.findIndex(l => l.id === current.id);
  return {
    prev: allIdx > 0 ? all[allIdx - 1] : undefined,
    next: allIdx < all.length - 1 ? all[allIdx + 1] : undefined
  };
}
