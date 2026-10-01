import { describe, it, expect } from 'vitest';
import {
  getAllDetailedLessons,
  getDetailedLesson,
  getLessonsForModule,
  getAdjacentLessons
} from '@/data/java/detailedLessons';
import { SUBLESSON_MANIFEST, getSublessonSummariesForModule } from '@/lib/curriculum/sublessonManifest';

describe('Java Sublessons Integrity', () => {
  it('should load all detailed sublessons', () => {
    const all = getAllDetailedLessons();
    expect(all.length).toBeGreaterThanOrEqual(77);
  });

  it('should retrieve a known sublesson by ID with full fields', () => {
    const lesson = getDetailedLesson('what-is-java');
    expect(lesson).toBeDefined();
    expect(lesson?.id).toBe('what-is-java');
    expect(lesson?.title).toBeTruthy();
    expect(lesson?.beginnerAnalogy).toBeTruthy();
    expect(lesson?.coreExplanation.length).toBeGreaterThan(0);
    expect(lesson?.codeSnippet.code).toBeTruthy();
  });

  it('should retrieve lessons for a module', () => {
    const oopLessons = getLessonsForModule('java-oop-basics');
    expect(oopLessons.length).toBeGreaterThan(0);
    oopLessons.forEach(l => {
      expect(l.moduleId).toBe('java-oop-basics');
      expect(l.title).toBeTruthy();
    });
  });

  it('should return adjacent lessons', () => {
    const adjacent = getAdjacentLessons('what-is-java');
    expect(adjacent).toBeDefined();
    expect(adjacent.next).toBeDefined();
  });

  it('should have lightweight manifest matching sublessons', () => {
    expect(SUBLESSON_MANIFEST.length).toBeGreaterThanOrEqual(77);
    const fundamentals = getSublessonSummariesForModule('java-fundamentals');
    expect(fundamentals.length).toBeGreaterThan(0);
    expect(fundamentals[0].id).toBeTruthy();
    expect(fundamentals[0].title).toBeTruthy();
  });
});
