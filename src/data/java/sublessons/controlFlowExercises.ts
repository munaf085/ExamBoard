import { ProgrammingExercise } from '../detailedLessons';
import { cf41_43_exercises } from './controlFlow/cf41_43_exercises';
import { cf44_46_exercises } from './controlFlow/cf44_46_exercises';
import { cf47_49_exercises } from './controlFlow/cf47_49_exercises';

// ============================================================
// MODULE 4: CONTROL FLOW EXERCISES (LESSONS 4.1 - 4.9)
// Exactly 10 dedicated coding assignments per lesson (90 total)
// ============================================================
export const controlFlowExercises: Record<string, ProgrammingExercise[]> = {
  ...cf41_43_exercises,
  ...cf44_46_exercises,
  ...cf47_49_exercises,
};
