import { DetailedLesson } from '../../detailedLessons';
import { ex21_1_2_Lessons } from './ex21_1_2_lessons';
import { ex21_3_4_Lessons } from './ex21_3_4_lessons';

// ============================================================
// MODULE 21: EXCEPTION HANDLING (LESSONS 21.1 - 21.4)
// Authoritative FAANG-Standard Exception Handling Curriculum
// ============================================================

export const ex21Lessons: Record<string, DetailedLesson> = {
  ...ex21_1_2_Lessons,
  ...ex21_3_4_Lessons,
};
