import { DetailedLesson } from '../../detailedLessons';
import { col18_1_2_Lessons } from './col18_1_2_lessons';
import { col18_3_4_Lessons } from './col18_3_4_lessons';

// ============================================================
// MODULE 18: COLLECTIONS FRAMEWORK (LESSONS 18.1 - 18.4)
// Authoritative FAANG-Standard Collections Core Curriculum
// ============================================================

export const col18Lessons: Record<string, DetailedLesson> = {
  ...col18_1_2_Lessons,
  ...col18_3_4_Lessons,
};
