import { DetailedLesson } from '../detailedLessons';
import { methodsLessons as rawMethodsLessons } from './methods/methodsLessons';
import { methodsChallenge_lessons } from './methods/methodsChallenge_lessons';

// ============================================================
// MODULE 7: METHODS IN JAVA (LESSONS 7.1 - 7.4)
// ============================================================
export const methodsLessons: Record<string, DetailedLesson> = {
  ...rawMethodsLessons,
  ...methodsChallenge_lessons,
};
