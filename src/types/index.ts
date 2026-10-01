// ============================================================
// EXAMBOARD JAVA PLATFORM — TYPE DEFINITIONS
// ============================================================

export type Difficulty = 'Easy' | 'Medium' | 'Hard';


export interface JavaModule {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  icon: string; // lucide icon name
  topics: string[];
  prerequisites: string[];
  lessonCount: number;
  mcqCount: number;
  codingCount: number;
  interviewCount: number;
  section: JavaSection;
}

export type JavaSection =
  | 'fundamentals'
  | 'oop'
  | 'collections'
  | 'advanced'
  | 'spring'
  | 'database'
  | 'dsa'
  | 'testing';

export interface JavaLesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  explanation: string;
  keyConcepts: KeyConcept[];
  codeExamples: CodeExample[];
  commonMistakes: string[];
  interviewTips: string[];
  revisionPoints: string[];
}

export interface KeyConcept {
  term: string;
  definition: string;
}

export interface CodeExample {
  title: string;
  code: string;
  output?: string;
  explanation: string;
}

export interface JavaMCQ {
  id: string;
  moduleId: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: Difficulty;
  type: 'conceptual' | 'output' | 'debugging' | 'syntax';
  tags: string[];
}

export interface JavaCodingProblem {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  examples: ProblemExample[];
  difficulty: Difficulty;
  hints: string[];
  approach: string;
  solutionExplanation: string;
  javaSolution: string;
  tags: string[];
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface JavaInterviewQuestion {
  id: string;
  moduleId: string;
  question: string;
  expectedAnswer: string;
  followUps: string[];
  keyPoints: string[];
  difficulty: Difficulty;
  type: 'definition' | 'why' | 'how' | 'difference' | 'scenario' | 'coding' | 'debugging';
  tags: string[];
}

export interface JavaFlashcard {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  difficulty: Difficulty;
  tags: string[];
}

export interface JavaProgress {
  lessonsCompleted: string[]; // lesson IDs
  mcqResults: Record<string, { correct: boolean; attempts: number }>;
  codingAttempted: string[];
  interviewReviewed: string[];
  flashcardsKnown: string[];
  mockInterviewsDone: number;
  weakModules: string[];
  strongModules: string[];
  lastUpdated: number;
}

export interface MockInterviewResult {
  questionId: string;
  selfScore: 'know' | 'partial' | 'dont-know';
}

export interface MiniQuizQuestion {
  id?: string;
  question: string;
  options: string[];
  correctIndex: number;
  correctOptionIndex?: number;
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
  difficulty?: Difficulty;
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
  beginnerMistakes?: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
    codeSnippet?: string;
  }[];
  interviewQuestions: {
    question: string;
    answer?: string;
    expectedAnswer?: string;
    followUp?: string;
    followUpAnswer?: string;
    keyPhrases?: string[];
    commonMistake?: string;
    commonMistakeAnswer?: string;
    focus?: string;
  }[];
  miniQuiz: MiniQuizQuestion[];
  practiceProblem?: PracticeProblem;
  practiceProblems?: PracticeProblem[];
  programmingExercises?: ProgrammingExercise[];
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    explanation?: string;
    output?: string;
  }[];
  interviewTakeaways?: string[];
  cheatSheet?: {
    summary: string;
    syntaxTemplate?: string;
    rules: { rule: string; explanation: string }[];
    quickComparison?: { aspect: string; optionA: string; optionB: string; optionC?: string }[];
    quickDefinitions?: {
      term: string;
      oneLiner: string;
      interviewExplanation?: string;
      realWorldExample?: string;
      codeExample?: string;
    }[];
    differences?: {
      title: string;
      conceptA: string;
      conceptB: string;
      keyDifference: string;
      comparisonPoints?: { feature: string; a: string; b: string }[];
    }[];
    mostAskedQuestions?: {
      question: string;
      answer: string;
      codeSnippet?: string;
      trapsToAvoid?: string;
    }[];
  };
}

export interface SubLessonSummary {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  exerciseCount: number;
  quizCount: number;
  interviewCount: number;
}

