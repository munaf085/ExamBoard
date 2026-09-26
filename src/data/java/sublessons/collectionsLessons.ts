import { DetailedLesson } from '../detailedLessons';
import { col18Lessons } from './collections/col18_lessons';
import { col19Lessons } from './collections/col19_lessons';

// ============================================================
// SECTION 4: COLLECTIONS & GENERICS (MODULES 18 - 20)
// Aggregate dictionary of Collections & Generics detailed sub-lessons
// ============================================================

export const collectionsLessons: Record<string, DetailedLesson> = {
  ...col18Lessons,
  ...col19Lessons,
};
