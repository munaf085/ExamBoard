import { ProgrammingExercise } from '../detailedLessons';
import { patternsExercises as pat } from './patterns/patternsExercises';

// ============================================================
// SECTION: PATTERN PROGRAMS & LOGIC BUILDING
// Aggregate dictionary of Pattern Programs hands-on exercises
// ============================================================

export const patternsExercises: Record<string, ProgrammingExercise[]> = {
  ...pat,
};
