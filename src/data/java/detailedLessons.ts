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
import { recursionLessons } from './sublessons/recursionLessons';
import { patternsLessons } from './sublessons/patternsLessons';
import { oopLessons } from './sublessons/oopLessons';
import { dsaLessons } from './sublessons/dsaLessons';
import { collectionsLessons } from './sublessons/collectionsLessons';
import { exceptionsLessons } from './sublessons/exceptionsLessons';
import { streamsLessons } from './sublessons/streamsLessons';

import { fundamentalsExercises } from './sublessons/fundamentalsExercises';
import { dataTypesExercises } from './sublessons/dataTypesExercises';
import { operatorsExercises } from './sublessons/operatorsExercises';
import { controlFlowExercises } from './sublessons/controlFlowExercises';
import { stringsExercises } from './sublessons/stringsExercises';
import { arraysExercises } from './sublessons/arraysExercises';
import { methodsExercises } from './sublessons/methodsExercises';
import { recursionExercises } from './sublessons/recursionExercises';
import { patternsExercises } from './sublessons/patternsExercises';
import { oopExercises } from './sublessons/oopExercises';
import { dsaExercises } from './sublessons/dsaExercises';
import { collectionsExercises } from './sublessons/collectionsExercises';
import { exceptionsExercises } from './sublessons/exceptionsExercises';
import { streamsExercises } from './sublessons/streamsExercises';

export const ALL_SUBLESSON_EXERCISES: Record<string, ProgrammingExercise[]> = {
  ...fundamentalsExercises,
  ...dataTypesExercises,
  ...operatorsExercises,
  ...controlFlowExercises,
  ...stringsExercises,
  ...arraysExercises,
  ...methodsExercises,
  ...recursionExercises,
  ...patternsExercises,
  ...oopExercises,
  ...dsaExercises,
  ...collectionsExercises,
  ...exceptionsExercises,
  ...streamsExercises,
};

const rawLessons: Record<string, DetailedLesson> = {
  ...fundamentalsLessons,
  ...dataTypesLessons,
  ...operatorsLessons,
  ...controlFlowLessons,
  ...stringsLessons,
  ...arraysLessons,
  ...methodsLessons,
  ...recursionLessons,
  ...patternsLessons,
  ...oopLessons,
  ...dsaLessons,
  ...collectionsLessons,
  ...exceptionsLessons,
  ...streamsLessons,
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
    'recursion-and-call-stack': 'recursion-and-call-stack',
    'recursion-head-tail-tree': 'recursion-head-tail-tree',
    'head-tail-recursion': 'recursion-head-tail-tree',
    'tail-recursion': 'recursion-head-tail-tree',
    'recursion-arrays-and-strings': 'recursion-arrays-and-strings',
    'recursion-arrays': 'recursion-arrays-and-strings',
    'divide-and-conquer': 'recursion-arrays-and-strings',
    'recursion-backtracking-foundations': 'recursion-backtracking-foundations',
    'backtracking': 'recursion-backtracking-foundations',
    'backtracking-foundations': 'recursion-backtracking-foundations',
    'classes': 'what-is-a-class',
    'class': 'what-is-a-class',
    'objects': 'creating-objects-with-new',
    'object': 'creating-objects-with-new',
    'classes-objects-instantiation': 'creating-objects-with-new',
    'constructors': 'constructors-initialization',
    'constructor': 'constructors-initialization',
    'constructors-and-chaining': 'constructors-initialization',
    'this': 'this-keyword-and-chaining',
    'this-keyword': 'this-keyword-and-chaining',
    'static': 'static-vs-instance',
    'static-vs-instance-members': 'static-vs-instance',
    'why-oop': 'why-oop-fundamentals',
    'memory': 'references-and-memory',
    'references': 'references-and-memory',
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
    'big-o': 'big-o-asymptotic-analysis',
    'asymptotic': 'big-o-asymptotic-analysis',
    'complexity': 'big-o-asymptotic-analysis',
    'linear-search': 'linear-search-and-sentinels',
    'sentinel-search': 'linear-search-and-sentinels',
    'binary-search': 'binary-search-bounds-and-invariants',
    'binary-search-bounds': 'binary-search-bounds-and-invariants',
    'lower-bound': 'binary-search-bounds-and-invariants',
    'upper-bound': 'binary-search-bounds-and-invariants',
    'merge-sort': 'merge-quick-timsort-internals',
    'quicksort': 'merge-quick-timsort-internals',
    'quick-sort': 'merge-quick-timsort-internals',
    'timsort': 'merge-quick-timsort-internals',
    'stack': 'stack-adt-and-arraydeque',
    'stacks': 'stack-adt-and-arraydeque',
    'arraydeque': 'stack-adt-and-arraydeque',
    'monotonic-stack': 'stack-adt-and-arraydeque',
    'queue': 'queue-adt-and-ring-buffers',
    'queues': 'queue-adt-and-ring-buffers',
    'ring-buffer': 'queue-adt-and-ring-buffers',
    'ring-buffers': 'queue-adt-and-ring-buffers',
    'linked-list': 'singly-doubly-linked-lists',
    'linked-lists': 'singly-doubly-linked-lists',
    'doubly-linked-list': 'singly-doubly-linked-lists',
    'floyd-cycle': 'floyd-cycle-detection-and-pointers',
    'fast-slow-pointers': 'floyd-cycle-detection-and-pointers',
    'cycle-detection': 'floyd-cycle-detection-and-pointers',
    'two-pointers': 'two-pointers-converging',
    'two-pointer': 'two-pointers-converging',
    'converging-pointers': 'two-pointers-converging',
    'two-sum-sorted': 'two-pointers-converging',
    'container-water': 'two-pointers-converging',
    'trapping-water': 'two-pointers-converging',
    'fast-slow': 'fast-slow-pointer-traversal',
    'fast-slow-pointer': 'fast-slow-pointer-traversal',
    'fast-slow-traversal': 'fast-slow-pointer-traversal',
    'sliding-window': 'fixed-size-sliding-window',
    'fixed-sliding-window': 'fixed-size-sliding-window',
    'fixed-window': 'fixed-size-sliding-window',
    'sliding-window-max': 'fixed-size-sliding-window',
    'dynamic-window': 'dynamic-sliding-window',
    'variable-sliding-window': 'dynamic-sliding-window',
    'longest-substring': 'dynamic-sliding-window',
    'min-window-substring': 'dynamic-sliding-window',
    'collections': 'collections-framework-overview',
    'collections-overview': 'collections-framework-overview',
    'collections-framework': 'collections-framework-overview',
    'iterators': 'collections-framework-overview',
    'iterator': 'collections-framework-overview',
    'fail-fast': 'collections-framework-overview',
    'arraylist': 'arraylist-vs-linkedlist-internals',
    'linkedlist': 'arraylist-vs-linkedlist-internals',
    'arraylist-vs-linkedlist': 'arraylist-vs-linkedlist-internals',
    'arraylist-internals': 'arraylist-vs-linkedlist-internals',
    'linkedlist-internals': 'arraylist-vs-linkedlist-internals',
    'set': 'set-hierarchy-and-treeset',
    'sets': 'set-hierarchy-and-treeset',
    'hashset': 'set-hierarchy-and-treeset',
    'linkedhashset': 'set-hierarchy-and-treeset',
    'treeset': 'set-hierarchy-and-treeset',
    'set-hierarchy': 'set-hierarchy-and-treeset',
    'navigableset': 'set-hierarchy-and-treeset',
    'priorityqueue': 'queue-deque-and-priorityqueue',
    'priority-queue': 'queue-deque-and-priorityqueue',
    'deque': 'queue-deque-and-priorityqueue',
    'arraydeque-queue': 'queue-deque-and-priorityqueue',
    'hashmap': 'hashmap-internal-architecture',
    'hashmap-internals': 'hashmap-internal-architecture',
    'hashmap-architecture': 'hashmap-internal-architecture',
    'hash-spreading': 'hashmap-internal-architecture',
    'hash-collisions': 'hash-collisions-and-treeification',
    'treeification': 'hash-collisions-and-treeification',
    'treenode': 'hash-collisions-and-treeification',
    'hashmap-treeification': 'hash-collisions-and-treeification',
    'hashmap-resizing': 'hashmap-resizing-and-rehash',
    'rehashing': 'hashmap-resizing-and-rehash',
    'load-factor': 'hashmap-resizing-and-rehash',
    'concurrenthashmap': 'concurrenthashmap-internals',
    'concurrent-hashmap': 'concurrenthashmap-internals',
    'chm': 'concurrenthashmap-internals',
    'generics': 'generic-types-and-methods',
    'generic-types': 'generic-types-and-methods',
    'generic-methods': 'generic-types-and-methods',
    'type-erasure': 'type-erasure-and-bridge-methods',
    'bridge-methods': 'type-erasure-and-bridge-methods',
    'synthetic-bridge-methods': 'type-erasure-and-bridge-methods',
    'wildcards': 'wildcards-and-pecs-principle',
    'pecs': 'wildcards-and-pecs-principle',
    'pecs-principle': 'wildcards-and-pecs-principle',
    'producer-extends': 'wildcards-and-pecs-principle',
    'generics-limitations': 'generics-limitations-and-heap-pollution',
    'heap-pollution': 'generics-limitations-and-heap-pollution',
    'generic-arrays': 'generics-limitations-and-heap-pollution',
    'throwable': 'throwable-hierarchy-checked-unchecked',
    'checked-unchecked': 'throwable-hierarchy-checked-unchecked',
    'checked-exceptions': 'throwable-hierarchy-checked-unchecked',
    'try-catch-finally': 'try-catch-finally-execution-order',
    'try-catch': 'try-catch-finally-execution-order',
    'finally': 'try-catch-finally-execution-order',
    'multi-catch': 'try-catch-finally-execution-order',
    'try-with-resources': 'try-with-resources-autocloseable',
    'autocloseable': 'try-with-resources-autocloseable',
    'suppressed-exceptions': 'try-with-resources-autocloseable',
    'custom-exceptions': 'custom-exceptions-best-practices',
    'exception-chaining': 'custom-exceptions-best-practices',
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
  if (!moduleId) return [];
  const clean = moduleId.trim().toLowerCase().replace(/\/$/, '');
  const moduleAliases: Record<string, string> = {
    '1': 'java-fundamentals',
    'fundamentals': 'java-fundamentals',
    '2': 'java-data-types',
    'data-types': 'java-data-types',
    '3': 'java-operators',
    'operators': 'java-operators',
    '4': 'java-control-flow',
    'control-flow': 'java-control-flow',
    '5': 'java-loops',
    'loops': 'java-loops',
    '6': 'java-patterns',
    'patterns': 'java-patterns',
    'java-patterns': 'java-patterns',
    'pattern-programs': 'java-patterns',
    'p1': 'java-patterns',
    'patterns-star': 'java-patterns',
    'star-patterns': 'java-patterns',
    'p2': 'java-patterns',
    'patterns-number': 'java-patterns',
    'number-patterns': 'java-patterns',
    'p3': 'java-patterns',
    'patterns-character': 'java-patterns',
    'character-patterns': 'java-patterns',
    'p4': 'java-patterns',
    'patterns-matrix': 'java-patterns',
    'matrix-patterns': 'java-patterns',
    '7': 'java-methods',
    'methods': 'java-methods',
    '8': 'java-arrays',
    'arrays': 'java-arrays',
    '9': 'java-strings',
    'strings': 'java-strings',
    '10': 'java-recursion',
    'recursion': 'java-recursion',
    'java-recursion': 'java-recursion',
    '11': 'java-oop-basics',
    'oop': 'java-oop-basics',
    'oop-basics': 'java-oop-basics',
    'java-oop': 'java-oop-basics',
    '12': 'java-encapsulation',
    'encapsulation': 'java-encapsulation',
    '13': 'java-inheritance',
    'inheritance': 'java-inheritance',
    '14': 'java-polymorphism',
    'polymorphism': 'java-polymorphism',
    '15': 'java-abstraction',
    'abstraction': 'java-abstraction',
    'interfaces': 'java-abstraction',
    '16': 'java-object-class',
    'object-class': 'java-object-class',
    'object': 'java-object-class',
    '17': 'java-dsa-foundations',
    'dsa-foundations': 'java-dsa-foundations',
    'dsa': 'java-dsa-foundations',
    'searching': 'java-dsa-foundations',
    'sorting': 'java-dsa-foundations',
    '18': 'java-dsa-stacks-queues',
    'dsa-stacks-queues': 'java-dsa-stacks-queues',
    'stacks-queues': 'java-dsa-stacks-queues',
    'stacks': 'java-dsa-stacks-queues',
    'queues': 'java-dsa-stacks-queues',
    'linked-lists': 'java-dsa-stacks-queues',
    '19': 'java-dsa-patterns',
    'dsa-patterns': 'java-dsa-patterns',
    'two-pointers': 'java-dsa-patterns',
    'sliding-window': 'java-dsa-patterns',
    '20': 'java-collections',
    'collections': 'java-collections',
    'java-collections': 'java-collections',
    '21': 'java-hashing',
    'hashing': 'java-hashing',
    'java-hashing': 'java-hashing',
    '22': 'java-generics',
    'generics': 'java-generics',
    'java-generics': 'java-generics',
    '23': 'java-exceptions',
    'exceptions': 'java-exceptions',
    'exception-handling': 'java-exceptions',
    'java-exceptions': 'java-exceptions',
    '24': 'java-streams',
    'streams': 'java-streams',
    'lambdas': 'java-streams',
    'java-streams': 'java-streams',
  };
  const targetId = moduleAliases[clean] || clean;

  const uniqueLessons = new Map<string, DetailedLesson>();
  for (const lesson of Object.values(DETAILED_LESSONS)) {
    if (
      lesson.moduleId === targetId ||
      lesson.moduleId.toLowerCase() === clean ||
      moduleAliases[lesson.moduleId.toLowerCase()] === clean
    ) {
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
  const all = getAllDetailedLessons();
  const allIdx = all.findIndex(l => l.id === current.id);
  if (allIdx !== -1) {
    return {
      prev: allIdx > 0 ? all[allIdx - 1] : undefined,
      next: allIdx < all.length - 1 ? all[allIdx + 1] : undefined
    };
  }
  return {};
}
