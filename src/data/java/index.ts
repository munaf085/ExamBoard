// ============================================================
// JAVA INTERVIEW PLATFORM — CENTRAL DATA INDEX
// ============================================================

// Curriculum
export { JAVA_MODULES, JAVA_SECTIONS } from './curriculum';

// MCQ Question Banks
export { javaFundamentalsQuestions } from './questions/javaFundamentalsQuestions';
export { javaDataTypesQuestions } from './questions/javaDataTypesQuestions';
export { javaStringsQuestions } from './questions/javaStringsQuestions';
export { javaControlFlowQuestions } from './questions/javaControlFlowQuestions';
export { javaOOPQuestions } from './questions/javaOOPQuestions';
export { javaExceptionsQuestions } from './questions/javaExceptionsQuestions';
export { javaCollectionsQuestions } from './questions/javaCollectionsQuestions';
export { javaStreamsQuestions } from './questions/javaStreamsQuestions';

// Interview Questions
export { javaRound2Questions } from './interviews/javaRound2Questions';
export { javaRound3Questions } from './interviews/javaRound3Questions';
export { javaInterviewTraps } from './interviews/javaInterviewTraps';

// Flashcards & Coding
export { javaFlashcards } from './javaFlashcards';
export { javaCodingProblems } from './javaCodingProblems';

// ---- Aggregated MCQ map (moduleId → questions) ----
import { javaFundamentalsQuestions } from './questions/javaFundamentalsQuestions';
import { javaDataTypesQuestions } from './questions/javaDataTypesQuestions';
import { javaStringsQuestions } from './questions/javaStringsQuestions';
import { javaControlFlowQuestions } from './questions/javaControlFlowQuestions';
import { javaOOPQuestions } from './questions/javaOOPQuestions';
import { javaExceptionsQuestions } from './questions/javaExceptionsQuestions';
import { javaCollectionsQuestions } from './questions/javaCollectionsQuestions';
import { javaStreamsQuestions } from './questions/javaStreamsQuestions';
import { JavaMCQ } from '../../types';

export const JAVA_MCQ_MAP: Record<string, JavaMCQ[]> = {
  'java-fundamentals': javaFundamentalsQuestions as any,
  'java-data-types': javaDataTypesQuestions as any,
  'java-strings': javaStringsQuestions as any,
  'java-control-flow': javaControlFlowQuestions as any,
  'java-loops': javaControlFlowQuestions as any,
  'java-oop-basics': javaOOPQuestions as any,
  'java-inheritance': javaOOPQuestions as any,
  'java-abstraction': javaOOPQuestions as any,
  'java-exceptions': javaExceptionsQuestions as any,
  'java-collections': javaCollectionsQuestions as any,
  'java-streams': javaStreamsQuestions as any,
};

export const ALL_JAVA_MCQS: JavaMCQ[] = [
  ...(javaFundamentalsQuestions as any),
  ...(javaDataTypesQuestions as any),
  ...(javaStringsQuestions as any),
  ...(javaControlFlowQuestions as any),
  ...(javaOOPQuestions as any),
  ...(javaExceptionsQuestions as any),
  ...(javaCollectionsQuestions as any),
  ...(javaStreamsQuestions as any),
];
