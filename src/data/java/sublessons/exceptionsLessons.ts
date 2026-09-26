import { DetailedLesson } from '../detailedLessons';
import { ex21Lessons } from './exceptions/ex21_lessons';

// ============================================================
// SECTION 5: ADVANCED CORE JAVA - EXCEPTION HANDLING
// Aggregate dictionary of Exception Handling detailed sub-lessons
// ============================================================

export const exceptionsLessons: Record<string, DetailedLesson> = {
  ...ex21Lessons,
};
