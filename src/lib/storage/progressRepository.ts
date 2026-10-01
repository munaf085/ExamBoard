import { JavaProgress, SelfEvalRating, SelfEvaluation } from '@/types';

/**
 * Standard repository contract for learner progress.
 * Decouples the UI from storage mechanism (LocalStorage now, REST/GraphQL/PostgreSQL later).
 */
export interface ProgressRepository {
  getProgress(): Promise<JavaProgress>;
  saveProgress(progress: JavaProgress): Promise<void>;
  resetProgress(): Promise<void>;

  getSelfEvaluations(): Promise<Record<string, SelfEvaluation>>;
  saveSelfEvaluation(lessonId: string, rating: SelfEvalRating): Promise<void>;

  getSolvedAssignments(): Promise<string[]>;
  toggleSolvedAssignment(assignmentId: string): Promise<boolean>;

  getReviewedInterviews(): Promise<string[]>;
  markInterviewReviewed(questionId: string): Promise<void>;

  getKnownFlashcards(): Promise<string[]>;
  markFlashcardKnown(flashcardId: string): Promise<void>;
}
