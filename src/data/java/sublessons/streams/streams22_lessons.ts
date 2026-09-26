import { DetailedLesson } from '../../detailedLessons';
import { streams22_1_2_Lessons } from './streams22_1_2_lessons';
import { streams22_3_4_Lessons } from './streams22_3_4_lessons';

// ============================================================
// MODULE 22: JAVA 8+ STREAMS & LAMBDAS (LESSONS 22.1 - 22.4)
// Authoritative FAANG-Standard Streams & Lambdas Curriculum
// ============================================================

export const streams22Lessons: Record<string, DetailedLesson> = {
  ...streams22_1_2_Lessons,
  ...streams22_3_4_Lessons,
};
