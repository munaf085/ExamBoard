// ============================================================
// Our Tech .NET INTERVIEW SIMULATOR — TYPE DEFINITIONS
// ============================================================

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'code-output'
  | 'loop-trace'
  | 'sql-analysis'
  | 'code-debug'
  | 'scenario'
  | 'dsa-reasoning'
  | 'aptitude'
  | 'logical'
  | 'coding';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Category =
  | 'CSharp'
  | 'OOP'
  | 'DotNet'
  | 'WebAPI'
  | 'SQL'
  | 'DSA'
  | 'Frontend'
  | 'OS'
  | 'Agile'
  | 'Aptitude'
  | 'Java'
  | 'JavaOOP'
  | 'JavaCollections'
  | 'JavaAdvanced'
  | 'JavaSpring'
  | 'JavaDSA'
  | 'JavaSQL';

export type PaperId =
  | 'easy-1'
  | 'easy-2'
  | 'medium-1'
  | 'medium-2'
  | 'hard-1'
  | 'hard-2'
  | 'hard-3'
  | 'csharp-oop-1'
  | 'topic-csharp-basics'
  | 'topic-csharp-oop'
  | 'topic-csharp-adv'
  | 'topic-java-basics'
  | 'topic-java-oop' 
  | 'topic-java-adv'
  | 'java-easy-1'
  | 'java-medium-1'
  | 'java-final';

export interface WrittenQuestion {
  id: string;
  paperId: PaperId;
  category: Category;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  tags: string[];
}

export interface CodingQuestion {
  id: string;
  type: 'coding';
  category: Category;
  difficulty: Difficulty;
  question: string;
  expectedConcept: string;
  solution: string;
  explanation: string;
  tags: string[];
}

// ---- Interview Rounds ----

export interface InterviewQuestion {
  id: string;
  round: 2 | 3 | 4;
  category: string;
  difficulty: Difficulty;
  question: string;
  followUps?: string[];
  expectedAnswer: string;
  keyPoints: string[];
  tags: string[];
}

export interface HRQuestion {
  id: string;
  category: string;
  question: string;
  guidance: string;
  sampleAnswer?: string;
}

// ---- Test Session ----

export interface TestSession {
  paperId: PaperId;
  startTime: number;
  answers: Record<string, number | number[] | null>;
  markedForReview: string[];
  submitted: boolean;
  timeSpent: number; // seconds
  submittedAt?: number;
}

export interface TestResult {
  id: string;
  paperId: PaperId;
  paperLabel: string;
  date: string;
  score: number;
  total: number;
  percentage: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  timeSpent: number;
  categoryBreakdown: CategoryScore[];
  missedTypes: Record<QuestionType, number>;
}

export interface CategoryScore {
  category: Category;
  label: string;
  correct: number;
  total: number;
  percentage: number;
}

// ---- Interview Session ----

export interface InterviewScore {
  questionId: string;
  technicalCorrectness: number; // 0-5
  explanation: number;          // 0-5
  problemSolving: number;       // 0-5
  codingAbility: number;        // 0-5
  communication: number;        // 0-5
  notes: string;
}

export interface InterviewSession {
  id: string;
  round: 2 | 3 | 4;
  date: string;
  scores: InterviewScore[];
  overallNotes: string;
}

// ---- Paper Metadata ----

export interface PaperMeta {
  id: PaperId;
  label: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  questionCount: number;
  durationMinutes: number;
}

export const PAPERS: PaperMeta[] = [
  { id: 'easy-1',   label: 'Easy Test 1',   difficulty: 'Easy',   description: 'Definitions, syntax, basic output',            questionCount: 40, durationMinutes: 60 },
  { id: 'easy-2',   label: 'Easy Test 2',   difficulty: 'Easy',   description: 'Simple OOP, SQL, loops',                       questionCount: 40, durationMinutes: 60 },
  { id: 'medium-1', label: 'Medium Test 1', difficulty: 'Medium', description: 'Code tracing, SQL reasoning, DSA concepts',    questionCount: 40, durationMinutes: 60 },
  { id: 'medium-2', label: 'Medium Test 2', difficulty: 'Medium', description: 'Web API, DI, debugging, SQL joins',            questionCount: 40, durationMinutes: 60 },
  { id: 'hard-1',   label: 'Hard Test 1',   difficulty: 'Hard',   description: 'Multi-step reasoning, combined concepts',      questionCount: 40, durationMinutes: 60 },
  { id: 'hard-2',   label: 'Hard Test 2',   difficulty: 'Hard',   description: 'Advanced tracing, SQL, DSA, debugging',       questionCount: 40, durationMinutes: 60 },
  { id: 'hard-3',   label: 'Tricky Logic',  difficulty: 'Hard',   description: 'Nested loops, complex conditions, trick questions', questionCount: 40, durationMinutes: 60 },
  { id: 'csharp-oop-1', label: 'C# & OOP Mastery', difficulty: 'Medium', description: 'Dedicated test strictly for C# basics and Object-Oriented Programming', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-csharp-basics', label: 'Topic: C# Basics & Types', difficulty: 'Medium', description: 'Exclusively covers Value/Ref types, Strings, Arrays, Enums, and Operators', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-csharp-oop', label: 'Topic: C# OOP Deep Dive', difficulty: 'Hard', description: 'Exclusively covers Inheritance, Polymorphism, Encapsulation, Abstraction, and Interfaces', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-csharp-adv', label: 'Topic: C# Advanced & Memory', difficulty: 'Hard', description: 'Exclusively covers Delegates, LINQ, Exceptions, Garbage Collection, and async/await', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-java-basics', label: 'Java Basics & Types', difficulty: 'Easy', description: 'JVM, Data Types, Operators, Control Flow, Strings', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-java-oop', label: 'Java OOP Deep Dive', difficulty: 'Medium', description: 'Classes, Inheritance, Polymorphism, Abstraction, Interfaces', questionCount: 40, durationMinutes: 60 },
  { id: 'topic-java-adv', label: 'Java Advanced & Collections', difficulty: 'Hard', description: 'Collections, Generics, Streams, Lambda, Exception Handling', questionCount: 40, durationMinutes: 60 },
  { id: 'java-easy-1', label: 'Java Mock Test 1', difficulty: 'Easy', description: 'Full mixed Java mock paper for beginners', questionCount: 40, durationMinutes: 60 },
  { id: 'java-medium-1', label: 'Java Mock Test 2', difficulty: 'Medium', description: 'Intermediate Java mock with code-output and OOP tracing', questionCount: 40, durationMinutes: 60 },
  { id: 'java-final', label: 'Java Final Assessment', difficulty: 'Hard', description: 'Complete Java assessment covering all topics', questionCount: 40, durationMinutes: 60 },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  CSharp:   'C# / OOP',
  OOP:      'OOP',
  DotNet:   '.NET / ASP.NET',
  WebAPI:   'Web API',
  SQL:      'SQL / DBMS',
  DSA:      'DSA / Programming',
  Frontend: 'HTML/CSS/JS',
  OS:       'Operating Systems',
  Agile:    'Agile / SDLC',
  Aptitude: 'Aptitude',
  Java: 'Java',
  JavaOOP: 'Java OOP',
  JavaCollections: 'Collections & Generics',
  JavaAdvanced: 'Advanced Java',
  JavaSpring: 'Spring / Spring Boot',
  JavaDSA: 'Java DSA',
  JavaSQL: 'SQL / JDBC',
};

// ============================================================
// JAVA INTERVIEW PLATFORM — EXTENDED TYPE DEFINITIONS
// ============================================================

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
  | 'patterns'
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

