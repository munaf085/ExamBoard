import { DetailedLesson } from '../detailedLessons';
import { stringsLessons as rawStringsLessons } from './strings/stringsLessons';

// ============================================================
// MODULE 6: STRINGS & STRING POOL (LESSONS 6.1 - 6.4)
// ============================================================
export const stringsLessons: Record<string, DetailedLesson> = {
  ...rawStringsLessons,
};
