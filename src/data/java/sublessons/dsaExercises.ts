import { ProgrammingExercise } from '../detailedLessons';
import { dsa15Exercises } from './dsa/dsa15_exercises';
import { dsa16Exercises } from './dsa/dsa16_exercises';

// ============================================================
// SECTION 3: DATA STRUCTURES & ALGORITHMS (MODULES 15 - 17)
// Aggregate dictionary of DSA hands-on coding exercises
// ============================================================

export const dsaExercises: Record<string, ProgrammingExercise[]> = {
  ...dsa15Exercises,
  ...dsa16Exercises,
};
