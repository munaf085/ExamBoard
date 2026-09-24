import { WrittenQuestion, TestResult, Category, CATEGORY_LABELS, CategoryScore, PaperId } from '../types';

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function calculateResult(
  questions: WrittenQuestion[],
  answers: Record<string, number | number[] | null>,
  paperId: PaperId,
  paperLabel: string,
  timeSpent: number,
  sessionId: string,
): TestResult {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  const missedTypes: Record<string, number> = {};
  const catMap: Record<string, { correct: number; total: number }> = {};

  for (const q of questions) {
    const cat = q.category;
    if (!catMap[cat]) catMap[cat] = { correct: 0, total: 0 };
    catMap[cat].total++;

    const answer = answers[q.id];
    if (answer === null || answer === undefined) {
      unanswered++;
      missedTypes[q.type] = (missedTypes[q.type] || 0) + 1;
    } else if (isCorrect(q, answer)) {
      correct++;
      catMap[cat].correct++;
    } else {
      incorrect++;
      missedTypes[q.type] = (missedTypes[q.type] || 0) + 1;
    }
  }

  const total = questions.length;
  const percentage = Math.round((correct / total) * 100);

  const categoryBreakdown: CategoryScore[] = Object.entries(catMap).map(([category, { correct: c, total: t }]) => ({
    category: category as Category,
    label: CATEGORY_LABELS[category as Category] || category,
    correct: c,
    total: t,
    percentage: t > 0 ? Math.round((c / t) * 100) : 0,
  }));

  return {
    id: sessionId,
    paperId,
    paperLabel,
    date: new Date().toISOString(),
    score: correct,
    total,
    percentage,
    correct,
    incorrect,
    unanswered,
    timeSpent,
    categoryBreakdown,
    missedTypes: missedTypes as any,
  };
}

export function isCorrect(
  q: WrittenQuestion,
  answer: number | number[] | null,
): boolean {
  if (answer === null || answer === undefined) return false;
  if (Array.isArray(q.correctAnswer)) {
    if (!Array.isArray(answer)) return false;
    const correct = [...q.correctAnswer].sort().join(',');
    const given = [...answer].sort().join(',');
    return correct === given;
  }
  return answer === q.correctAnswer;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function getPerformanceLabel(pct: number): string {
  if (pct >= 85) return 'Excellent';
  if (pct >= 70) return 'Good';
  if (pct >= 50) return 'Satisfactory';
  if (pct >= 35) return 'Needs Practice';
  return 'Requires Revision';
}

export function getDiagnostic(result: TestResult): {
  strong: string[];
  revise: string[];
  missed: { label: string; count: number }[];
  recommended: string[];
} {
  const strong: string[] = [];
  const revise: string[] = [];

  for (const c of result.categoryBreakdown) {
    if (c.total === 0) continue;
    if (c.percentage >= 75) strong.push(c.label);
    else if (c.percentage < 60) revise.push(c.label);
  }

  const missed = Object.entries(result.missedTypes || {})
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([type, count]) => ({
      label: friendlyTypeName(type),
      count: count as number,
    }));

  const recommended: string[] = [];
  for (const c of result.categoryBreakdown.sort((a, b) => a.percentage - b.percentage)) {
    if (recommended.length >= 3) break;
    if (c.percentage < 70 && c.total > 0) recommended.push(c.label);
  }

  return { strong, revise, missed, recommended };
}

function friendlyTypeName(type: string): string {
  const map: Record<string, string> = {
    'single-choice': 'Multiple Choice',
    'multiple-choice': 'Multiple-Select',
    'code-output': 'C# Output Tracing',
    'loop-trace': 'Loop Tracing',
    'sql-analysis': 'SQL Analysis',
    'code-debug': 'Code Debugging',
    'scenario': 'Scenario Questions',
    'dsa-reasoning': 'DSA Reasoning',
    'aptitude': 'Aptitude',
    'logical': 'Logical Reasoning',
    'coding': 'Short Coding',
  };
  return map[type] || type;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
