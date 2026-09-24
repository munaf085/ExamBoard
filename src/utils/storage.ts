import { TestSession, TestResult, InterviewSession } from '../types';

const SESSIONS_KEY = 'atyati_sessions';
const RESULTS_KEY = 'atyati_results';
const INTERVIEW_SESSIONS_KEY = 'atyati_interview_sessions';

// ---- Test Sessions ----

export function saveSession(session: TestSession): void {
  const key = `atyati_session_${session.paperId}`;
  localStorage.setItem(key, JSON.stringify(session));
}

export function getSession(paperId: string): TestSession | null {
  const key = `atyati_session_${paperId}`;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TestSession;
  } catch {
    return null;
  }
}

export function clearSession(paperId: string): void {
  localStorage.removeItem(`atyati_session_${paperId}`);
}

// ---- Results ----

export function saveResult(result: TestResult): void {
  const results = getAllResults();
  const idx = results.findIndex(r => r.id === result.id);
  if (idx >= 0) {
    results[idx] = result;
  } else {
    results.unshift(result);
  }
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function getAllResults(): TestResult[] {
  const raw = localStorage.getItem(RESULTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TestResult[];
  } catch {
    return [];
  }
}

export function getResultById(id: string): TestResult | null {
  return getAllResults().find(r => r.id === id) || null;
}

export function getResultsForPaper(paperId: string): TestResult[] {
  return getAllResults().filter(r => r.paperId === paperId);
}

export function clearResult(id: string): void {
  const results = getAllResults().filter(r => r.id !== id);
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

// ---- Interview Sessions ----

export function saveInterviewSession(session: InterviewSession): void {
  const sessions = getAllInterviewSessions();
  const idx = sessions.findIndex(s => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(INTERVIEW_SESSIONS_KEY, JSON.stringify(sessions));
}

export function getAllInterviewSessions(): InterviewSession[] {
  const raw = localStorage.getItem(INTERVIEW_SESSIONS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as InterviewSession[];
  } catch {
    return [];
  }
}

export function getInterviewSession(id: string): InterviewSession | null {
  return getAllInterviewSessions().find(s => s.id === id) || null;
}

// ---- Dashboard stats ----

export function getDashboardStats() {
  const results = getAllResults();
  if (results.length === 0) {
    return {
      testsCompleted: 0,
      avgScore: 0,
      bestScore: 0,
      categoryStats: {},
    };
  }

  const avgScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;
  const bestScore = Math.max(...results.map(r => r.percentage));

  // Category aggregates
  const catMap: Record<string, { correct: number; total: number }> = {};
  for (const r of results) {
    for (const c of r.categoryBreakdown) {
      if (!catMap[c.category]) catMap[c.category] = { correct: 0, total: 0 };
      catMap[c.category].correct += c.correct;
      catMap[c.category].total += c.total;
    }
  }

  return {
    testsCompleted: results.length,
    avgScore: Math.round(avgScore),
    bestScore: Math.round(bestScore),
    categoryStats: catMap,
  };
}
