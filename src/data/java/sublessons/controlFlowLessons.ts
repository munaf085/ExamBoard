import { DetailedLesson } from '../detailedLessons';
import { cf41_43_lessons } from './controlFlow/cf41_43_lessons';
import { cf44_46_lessons } from './controlFlow/cf44_46_lessons';
import { cf47_49_lessons } from './controlFlow/cf47_49_lessons';

// ============================================================
// MODULE 4: CONTROL FLOW & LOOPS (LESSONS 4.1 - 4.9)
// ============================================================
export const controlFlowLessons: Record<string, DetailedLesson> = {
  ...cf41_43_lessons,
  ...cf44_46_lessons,
  ...cf47_49_lessons,
};
