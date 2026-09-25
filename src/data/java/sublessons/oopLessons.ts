import { DetailedLesson } from '../detailedLessons';
import { oop9Lessons } from './oop/oop9_lessons';
import { oop10Lessons } from './oop/oop10_lessons';
import { oop11Lessons } from './oop/oop11_lessons';
import { oop12Lessons } from './oop/oop12_lessons';
import { oop13Lessons } from './oop/oop13_lessons';
import { oop14Lessons } from './oop/oop14_lessons';

// ============================================================
// SECTION 2: OBJECT-ORIENTED PROGRAMMING (MODULES 9 - 14)
// Aggregate dictionary of all 24 OOP detailed sub-lessons
// ============================================================

export const oopLessons: Record<string, DetailedLesson> = {
  ...oop9Lessons,
  ...oop10Lessons,
  ...oop11Lessons,
  ...oop12Lessons,
  ...oop13Lessons,
  ...oop14Lessons,
};
