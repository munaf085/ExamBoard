/**
 * Future backend contracts for student quiz, coding, and interview attempts.
 * Pure interface definitions ready for future PostgreSQL/Redis persistence.
 * DO NOT IMPLEMENT LIVE DATABASE CALLS NOW.
 */

export interface QuizAttemptRecord {
  id: string;
  userId: string;
  moduleId: string;
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  attemptNumber: number;
  durationSeconds?: number;
  attemptedAt: string;
}

export interface CodeSubmissionRecord {
  id: string;
  userId: string;
  exerciseId: string;
  code: string;
  status: 'passed' | 'failed' | 'syntax_error' | 'timeout';
  executionTimeMs?: number;
  submittedAt: string;
}

export interface MockInterviewRecord {
  id: string;
  userId: string;
  roundType: 'round2_core' | 'round3_spring' | 'traps';
  questionsCount: number;
  knowCount: number;
  partialCount: number;
  dontKnowCount: number;
  scorePercentage: number;
  completedAt: string;
}

export interface AttemptRepository {
  recordQuizAttempt(attempt: Omit<QuizAttemptRecord, 'id' | 'attemptedAt'>): Promise<QuizAttemptRecord>;
  getQuizAttemptsForModule(userId: string, moduleId: string): Promise<QuizAttemptRecord[]>;

  recordCodeSubmission(submission: Omit<CodeSubmissionRecord, 'id' | 'submittedAt'>): Promise<CodeSubmissionRecord>;
  getCodeSubmissions(userId: string, exerciseId: string): Promise<CodeSubmissionRecord[]>;

  recordMockInterview(result: Omit<MockInterviewRecord, 'id' | 'completedAt'>): Promise<MockInterviewRecord>;
  getMockInterviewHistory(userId: string): Promise<MockInterviewRecord[]>;
}
