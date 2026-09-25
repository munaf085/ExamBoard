import { ProgrammingExercise } from '../detailedLessons';
import { oop9Exercises } from './oop/oop9_exercises';
import { oop10Exercises } from './oop/oop10_exercises';
import { oop11Exercises } from './oop/oop11_exercises';
import { oop12Exercises } from './oop/oop12_exercises';
import { oop13Exercises } from './oop/oop13_exercises';
import { oop14Exercises } from './oop/oop14_exercises';

// ============================================================
// SECTION 2: OBJECT-ORIENTED PROGRAMMING (MODULES 9 - 14)
// Aggregate dictionary of all 240 OOP hands-on coding exercises
// (10 exercises per sub-lesson * 24 sub-lessons)
// ============================================================

export const oopExercises: Record<string, ProgrammingExercise[]> = {
  ...oop9Exercises,
  ...oop10Exercises,
  ...oop11Exercises,
  ...oop12Exercises,
  ...oop13Exercises,
  ...oop14Exercises,
};
