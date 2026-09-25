// ============================================================
// MASTER AGGREGATED JAVA LESSONS INDEX
// ============================================================

import { JavaLessonData, BASICS_LESSONS } from './basicsLessons';
import { OOP_LESSONS } from './oopLessons';
import { DSA_LESSONS } from './dsaLessons';
import { COLLECTIONS_LESSONS } from './collectionsLessons';
import { ADVANCED_LESSONS } from './advancedLessons';
import { DATABASE_LESSONS } from './databaseLessons';
import { SPRING_LESSONS } from './springLessons';
import { ENGINEERING_LESSONS } from './engineeringLessons';

export type { JavaLessonData };

export const ALL_JAVA_LESSONS: Record<string, JavaLessonData> = {
  ...BASICS_LESSONS,
  ...OOP_LESSONS,
  ...DSA_LESSONS,
  ...COLLECTIONS_LESSONS,
  ...ADVANCED_LESSONS,
  ...DATABASE_LESSONS,
  ...SPRING_LESSONS,
  ...ENGINEERING_LESSONS,
};
