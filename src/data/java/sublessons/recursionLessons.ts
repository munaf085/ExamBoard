import { DetailedLesson } from '../detailedLessons';
import { recursionLessons as rec } from './recursion/recursionLessons';
import { recursionChallengeLessons } from './recursion/recursionChallenge_lessons';

// ============================================================
// MODULE 10: RECURSION & CALL STACK (LESSONS 10.1 - 10.5)
// ============================================================

export const recursionLessons: Record<string, DetailedLesson> = {
  ...rec,
  ...recursionChallengeLessons,
};
