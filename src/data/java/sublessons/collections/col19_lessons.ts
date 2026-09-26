import { DetailedLesson } from '../../detailedLessons';
import { col19_1_2_Lessons } from './col19_1_2_lessons';
import { col19_3_4_Lessons } from './col19_3_4_lessons';

// ============================================================
// MODULE 19: HASHING & HASHMAP INTERNALS (LESSONS 19.1 - 19.4)
// Authoritative FAANG-Standard Hashing Core Curriculum
// ============================================================

export const col19Lessons: Record<string, DetailedLesson> = {
  ...col19_1_2_Lessons,
  ...col19_3_4_Lessons,
};
