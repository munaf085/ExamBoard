import { ProgrammingExercise } from '../../detailedLessons';
import { patternsExercisesP1_P2 } from './patternsExercisesP1_P2';
import { patternsExercisesP3_P4 } from './patternsExercisesP3_P4';

// ============================================================
// SECTION: PATTERN PROGRAMS & LOGIC BUILDING (40 EXERCISES)
// 10 Exercises per sub-lesson across Modules P1 - P4
// Fully runnable Java programs with complete ASCII outputs
// ============================================================

export const patternsExercises: Record<string, ProgrammingExercise[]> = {
  ...patternsExercisesP1_P2,
  ...patternsExercisesP3_P4,
};
