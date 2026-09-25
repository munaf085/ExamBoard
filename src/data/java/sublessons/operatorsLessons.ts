import { DetailedLesson } from '../detailedLessons';
import { op31_33_lessons } from './operators/op31_33_lessons';
import { op34_36_lessons } from './operators/op34_36_lessons';
import { op37_39_lessons } from './operators/op37_39_lessons';

// ============================================================
// MODULE 3: OPERATORS & EXPRESSIONS (LESSONS 3.1 - 3.9)
// ============================================================
export const operatorsLessons: Record<string, DetailedLesson> = {
  ...op31_33_lessons,
  ...op34_36_lessons,
  ...op37_39_lessons,
};
