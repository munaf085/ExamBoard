import { DetailedLesson } from '../../detailedLessons';
import { patternsP1_P2_lessons } from './patternsP1_P2_lessons';
import { patternsP3_P4_lessons } from './patternsP3_P4_lessons';

// ============================================================
// SECTION: PATTERN PROGRAMS & LOGIC BUILDING (LESSONS P1 - P4)
// P1: Star Patterns & Pyramids
// P2: Number Patterns & Series (Floyd's & Pascal)
// P3: Character & Alphabet Patterns
// P4: Advanced Matrix & Spiral Patterns
// ============================================================

export const patternsLessons: Record<string, DetailedLesson> = {
  ...patternsP1_P2_lessons,
  ...patternsP3_P4_lessons,
};
