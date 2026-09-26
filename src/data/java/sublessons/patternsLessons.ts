import { DetailedLesson } from '../detailedLessons';
import { patternsLessons as pat } from './patterns/patternsLessons';

// ============================================================
// SECTION: PATTERN PROGRAMS & LOGIC BUILDING
// Aggregate dictionary of Pattern Programs detailed sub-lessons
// ============================================================

export const patternsLessons: Record<string, DetailedLesson> = {
  ...pat,
};
