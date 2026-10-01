const fs = require('fs');
const path = require('path');

// Run via npx tsx
async function run() {
  const { getAllDetailedLessons } = await import('../src/data/java/detailedLessons.ts');
  const lessons = getAllDetailedLessons();
  const summaries = lessons.map(l => ({
    id: l.id,
    moduleId: l.moduleId,
    moduleTitle: l.moduleTitle,
    lessonNumber: l.lessonNumber,
    title: l.title,
    subtitle: l.subtitle,
    estimatedMinutes: l.estimatedMinutes,
    exerciseCount: (l.programmingExercises || []).length,
    quizCount: (l.miniQuiz || []).length,
    interviewCount: (l.interviewQuestions || []).length,
  }));

  const outDir = path.join(__dirname, '../src/lib/curriculum');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const fileContent = `// ============================================================
// LIGHTWEIGHT SUBLESSON MANIFEST (OPTIMIZED FOR FAST ROADMAP LOADS)
// Automatically generated: ${summaries.length} sublessons
// ============================================================

import { SubLessonSummary } from '@/types';

export const SUBLESSON_MANIFEST: SubLessonSummary[] = ${JSON.stringify(summaries, null, 2)};

export function getSublessonSummariesForModule(moduleId: string): SubLessonSummary[] {
  if (!moduleId) return [];
  const clean = moduleId.trim().toLowerCase();
  return SUBLESSON_MANIFEST.filter(
    s => s.moduleId === clean || s.moduleId.toLowerCase() === clean
  );
}

export function getSublessonSummary(id: string): SubLessonSummary | undefined {
  if (!id) return undefined;
  const clean = id.trim().toLowerCase();
  return SUBLESSON_MANIFEST.find(s => s.id === clean || s.id.toLowerCase() === clean);
}

export function getAllSublessonSummaries(): SubLessonSummary[] {
  return SUBLESSON_MANIFEST;
}
`;

  fs.writeFileSync(path.join(outDir, 'sublessonManifest.ts'), fileContent, 'utf8');
  console.log(`Successfully generated sublessonManifest.ts with ${summaries.length} sublesson summaries.`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
