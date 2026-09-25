import { ProgrammingExercise } from '../detailedLessons';
import { stringsExercises as rawStringsExercises } from './strings/stringsExercises';

// ============================================================
// MODULE 6: STRINGS & STRING POOL EXERCISES (LESSONS 6.1 - 6.4)
// 10 dedicated coding assignments per lesson (40 total)
// ============================================================
export const stringsExercises: Record<string, ProgrammingExercise[]> = {
  ...rawStringsExercises,
};
