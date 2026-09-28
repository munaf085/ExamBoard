import { DetailedLesson } from '../detailedLessons';
import { arraysLessons as rawArraysLessons } from './arrays/arraysLessons';
import { arraysChallengeLessons } from './arrays/arraysChallenge_lessons';

// ============================================================
// MODULE 8: ARRAYS & 2D MATRIX (LESSONS 8.1 - 8.5)
// ============================================================
export const arraysLessons: Record<string, DetailedLesson> = {
  ...rawArraysLessons,
  ...arraysChallengeLessons,
};
