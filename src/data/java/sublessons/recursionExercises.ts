import { ProgrammingExercise } from '../detailedLessons';
import { recursionExercises as rec } from './recursion/recursionExercises';
import { recursionChallengeExercises } from './recursion/recursionChallenge_exercises';

// ============================================================
// MODULE 10: RECURSION & CALL STACK EXERCISES (LESSONS 10.1 - 10.5)
// ============================================================

export const recursionExercises: Record<string, ProgrammingExercise[]> = {
  ...rec,
  ...recursionChallengeExercises,
};
