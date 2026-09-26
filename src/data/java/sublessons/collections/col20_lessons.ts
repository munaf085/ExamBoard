import { DetailedLesson } from '../../detailedLessons';
import { col20_1_2_Lessons } from './col20_1_2_lessons';
import { col20_3_4_Lessons } from './col20_3_4_lessons';

// ============================================================
// MODULE 20: GENERICS & TYPE SAFETY (LESSONS 20.1 - 20.4)
// Authoritative FAANG-Standard Generics Core Curriculum
// ============================================================

export const col20Lessons: Record<string, DetailedLesson> = {
  ...col20_1_2_Lessons,
  ...col20_3_4_Lessons,
};
