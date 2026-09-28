import { ProgrammingExercise } from '../detailedLessons';
import { arraysExercises as rawArraysExercises } from './arrays/arraysExercises';
import { arraysChallengeExercises } from './arrays/arraysChallenge_exercises';

// ============================================================
// MODULE 8: ARRAYS & 2D MATRIX EXERCISES (LESSONS 8.1 - 8.5)
// 10 dedicated coding assignments per lesson (50 total)
// ============================================================
export const arraysExercises: Record<string, ProgrammingExercise[]> = {
  ...rawArraysExercises,
  ...arraysChallengeExercises,
};
