// ============================================================
// ATYATI .NET INTERVIEW SIMULATOR — TYPE DEFINITIONS
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
  | 'Aptitude';

export type PaperId =
  | 'easy-1'
  | 'easy-2'
  | 'medium-1'
  | 'medium-2'
  | 'hard-1'
  | 'hard-2'
  | 'hard-3'
  | 'csharp-oop-1';

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
};
