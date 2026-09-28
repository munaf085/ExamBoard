import { DetailedLesson } from '../detailedLessons';
import { cf41_43_lessons } from './controlFlow/cf41_43_lessons';
import { cf44_challenge_lessons } from './controlFlow/cf44_challenge_lessons';
import { cf44_46_lessons } from './controlFlow/cf44_46_lessons';
import { cf47_49_lessons } from './controlFlow/cf47_49_lessons';
import { cf57_challenge_lessons } from './controlFlow/cf57_challenge_lessons';

// ============================================================
// MODULE 4 & 5: CONTROL FLOW, DECISION MAKING & LOOPS
// (LESSONS 4.1 - 4.4, LESSONS 5.1 - 5.7)
// ============================================================
export const controlFlowLessons: Record<string, DetailedLesson> = {
  ...cf41_43_lessons,
  ...cf44_challenge_lessons,
  ...cf44_46_lessons,
  ...cf47_49_lessons,
  ...cf57_challenge_lessons,
};
