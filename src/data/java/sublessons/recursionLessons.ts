import { DetailedLesson } from '../detailedLessons';
import { recursionLessons as rec } from './recursion/recursionLessons';

// ============================================================
// MODULE 9: RECURSION & CALL STACK
// Aggregate dictionary of Recursion detailed sub-lessons
// ============================================================

export const recursionLessons: Record<string, DetailedLesson> = {
  ...rec,
};
