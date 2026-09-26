import { ProgrammingExercise } from '../detailedLessons';
import { col18Exercises } from './collections/col18_exercises';
import { col19Exercises } from './collections/col19_exercises';

// ============================================================
// SECTION 4: COLLECTIONS & GENERICS (MODULES 18 - 20)
// Aggregate dictionary of Collections & Generics hands-on exercises
// ============================================================

export const collectionsExercises: Record<string, ProgrammingExercise[]> = {
  ...col18Exercises,
  ...col19Exercises,
};
