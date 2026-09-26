import { ProgrammingExercise } from '../detailedLessons';
import { recursionExercises as rec } from './recursion/recursionExercises';

// ============================================================
// MODULE 9: RECURSION & CALL STACK
// Aggregate dictionary of Recursion hands-on exercises
// ============================================================

export const recursionExercises: Record<string, ProgrammingExercise[]> = {
  ...rec,
};
