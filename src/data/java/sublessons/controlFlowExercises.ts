import { ProgrammingExercise } from '../detailedLessons';
import { cf41_43_exercises } from './controlFlow/cf41_43_exercises';
import { cf44_challenge_exercises } from './controlFlow/cf44_challenge_exercises';
import { cf44_46_exercises } from './controlFlow/cf44_46_exercises';
import { cf47_49_exercises } from './controlFlow/cf47_49_exercises';
import { cf57_challenge_exercises } from './controlFlow/cf57_challenge_exercises';

// ============================================================
// MODULE 4 & 5: CONTROL FLOW EXERCISES
// Module 4: 40 exercises (4.1 - 4.4)
// Module 5: 70 exercises (5.1 - 5.7)
// Exactly 10 dedicated coding assignments per lesson (110 total)
// ============================================================
export const controlFlowExercises: Record<string, ProgrammingExercise[]> = {
  ...cf41_43_exercises,
  ...cf44_challenge_exercises,
  ...cf44_46_exercises,
  ...cf47_49_exercises,
  ...cf57_challenge_exercises,
};
