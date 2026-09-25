import { ProgrammingExercise } from '../detailedLessons';
import { op31_33_exercises } from './operators/op31_33_exercises';
import { op34_36_exercises } from './operators/op34_36_exercises';
import { op37_39_exercises } from './operators/op37_39_exercises';

// ============================================================
// MODULE 3: OPERATORS & EXPRESSIONS EXERCISES (LESSONS 3.1 - 3.9)
// Exactly 10 dedicated coding assignments per lesson (90 total)
// ============================================================
export const operatorsExercises: Record<string, ProgrammingExercise[]> = {
  ...op31_33_exercises,
  ...op34_36_exercises,
  ...op37_39_exercises,
};
