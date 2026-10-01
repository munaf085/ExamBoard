import { describe, it, expect } from 'vitest';
import { JAVA_MODULES, JAVA_SECTIONS } from '@/data/java/curriculum';

describe('Java Curriculum Integrity', () => {
  it('should have all 38 modules', () => {
    expect(JAVA_MODULES.length).toBe(38);
  });

  it('should have exactly 8 sections', () => {
    expect(JAVA_SECTIONS.length).toBe(8);
  });

  it('should have all 8 valid section IDs', () => {
    const sectionIds = JAVA_SECTIONS.map(s => s.id);
    expect(sectionIds).toEqual([
      'fundamentals',
      'oop',
      'dsa',
      'collections',
      'advanced',
      'database',
      'spring',
      'testing',
    ]);
  });

  it('should have complete metadata for every module', () => {
    const validSections = new Set(JAVA_SECTIONS.map(s => s.id));
    const validDifficulties = new Set(['Easy', 'Medium', 'Hard']);

    JAVA_MODULES.forEach(module => {
      expect(module.id).toBeTruthy();
      expect(module.title).toBeTruthy();
      expect(module.description).toBeTruthy();
      expect(validDifficulties.has(module.difficulty)).toBe(true);
      expect(module.estimatedMinutes).toBeGreaterThan(0);
      expect(module.topics.length).toBeGreaterThan(0);
      expect(validSections.has(module.section)).toBe(true);
    });
  });

  it('should have unique module IDs', () => {
    const ids = JAVA_MODULES.map(m => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
