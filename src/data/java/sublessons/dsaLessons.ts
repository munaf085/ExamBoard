import { DetailedLesson } from '../detailedLessons';
import { dsa15Lessons } from './dsa/dsa15_lessons';
import { dsa16Lessons } from './dsa/dsa16_lessons';
import { dsa17Lessons } from './dsa/dsa17_lessons';

// ============================================================
// SECTION 3: DATA STRUCTURES & ALGORITHMS (MODULES 15 - 17)
// Aggregate dictionary of DSA detailed sub-lessons
// ============================================================

export const dsaLessons: Record<string, DetailedLesson> = {
  ...dsa15Lessons,
  ...dsa16Lessons,
  ...dsa17Lessons,
};
