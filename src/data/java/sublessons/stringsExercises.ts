import { ProgrammingExercise } from '../detailedLessons';
import { stringsExercises as rawStringsExercises } from './strings/stringsExercises';
import { stringsChallengeExercises } from './strings/stringsChallenge_exercises';

// ============================================================
// MODULE 9: STRINGS & STRING POOL EXERCISES (LESSONS 9.1 - 9.5)
// 10 dedicated coding assignments per lesson (50 total)
// ============================================================
export const stringsExercises: Record<string, ProgrammingExercise[]> = {
  ...rawStringsExercises,
  ...stringsChallengeExercises,
};
