import { WrittenQuestion, PaperId } from '../types';
import { easy1Questions } from './questions/easy1';
import { easy2Questions } from './questions/easy2';
import { medium1Questions } from './questions/medium1';
import { medium2Questions } from './questions/medium2';
import { hard1Questions } from './questions/hard1';
import { hard2Questions } from './questions/hard2';
import { hard3Questions } from './questions/hard3';

export const allQuestions: WrittenQuestion[] = [
  ...easy1Questions,
  ...easy2Questions,
  ...medium1Questions,
  ...medium2Questions,
  ...hard1Questions,
  ...hard2Questions,
  ...hard3Questions,
];

export function getQuestionsForPaper(paperId: PaperId): WrittenQuestion[] {
  return allQuestions.filter(q => q.paperId === paperId);
}

export function getTotalQuestionCount(): number {
  return allQuestions.length;
}

export function validateQuestions(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const q of allQuestions) {
    if (ids.has(q.id)) errors.push(`Duplicate ID: ${q.id}`);
    ids.add(q.id);

    if (!q.question) errors.push(`${q.id}: missing question text`);
    if (!q.explanation) errors.push(`${q.id}: missing explanation`);
    if (!q.options || q.options.length < 2) errors.push(`${q.id}: insufficient options`);

    if (Array.isArray(q.correctAnswer)) {
      for (const a of q.correctAnswer) {
        if (a < 0 || a >= q.options.length) errors.push(`${q.id}: invalid correctAnswer index ${a}`);
      }
    } else {
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        errors.push(`${q.id}: invalid correctAnswer index ${q.correctAnswer}`);
      }
    }
  }

  // Check paper counts
  const papers: PaperId[] = ['easy-1', 'easy-2', 'medium-1', 'medium-2', 'hard-1', 'hard-2'];
  for (const paperId of papers) {
    const count = allQuestions.filter(q => q.paperId === paperId).length;
    if (count !== 40) errors.push(`Paper ${paperId} has ${count} questions (expected 40)`);
  }

  return { valid: errors.length === 0, errors };
}

