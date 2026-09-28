import { ProgrammingExercise } from '../detailedLessons';
import { methodsExercises as rawMethodsExercises } from './methods/methodsExercises';
import { methodsChallenge_exercises } from './methods/methodsChallenge_exercises';

// ============================================================
// MODULE 7: METHODS IN JAVA EXERCISES (LESSONS 7.1 - 7.4)
// Exactly 10 dedicated coding assignments per lesson (40 total)
// ============================================================
export const methodsExercises: Record<string, ProgrammingExercise[]> = {
  ...rawMethodsExercises,
  ...methodsChallenge_exercises,
};
