import { ProgrammingExercise } from '../../detailedLessons';
import { patternsExercisesP1_P2 } from './patternsExercisesP1_P2';
import { patternsExercisesP3_P4 } from './patternsExercisesP3_P4';
import { patternsP5_challenge_exercises } from './patternsP5_challenge_exercises';

// ============================================================
// SECTION: PATTERN PROGRAMS EXERCISES (50 EXERCISES TOTAL)
// 10 Exercises per sub-lesson across Modules P1 - P5
// ============================================================
export const patternsExercises: Record<string, ProgrammingExercise[]> = {
  ...patternsExercisesP1_P2,
  ...patternsExercisesP3_P4,
  ...patternsP5_challenge_exercises,
};
