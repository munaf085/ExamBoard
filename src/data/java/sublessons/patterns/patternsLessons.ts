import { DetailedLesson } from '../../detailedLessons';
import { patternsP1_P2_lessons } from './patternsP1_P2_lessons';
import { patternsP3_P4_lessons } from './patternsP3_P4_lessons';
import { patternsP5_challenge_lessons } from './patternsP5_challenge_lessons';

// ============================================================
// SECTION: PATTERN PROGRAMS & LOGIC BUILDING (LESSONS P1 - P5)
// ============================================================
export const patternsLessons: Record<string, DetailedLesson> = {
  ...patternsP1_P2_lessons,
  ...patternsP3_P4_lessons,
  ...patternsP5_challenge_lessons,
};
