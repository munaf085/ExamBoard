# ExamBoard — Testing & Quality Assurance Guide

**Test Runner:** Vitest 5.0  
**Environment:** happy-dom  
**Total Tests:** 35 Passing  

---

## 1. Test Architecture Overview

The ExamBoard testing strategy operates across three distinct verification layers:
1. **Domain Logic Tests:** Verify pure business logic (scoring, streaks, progress calculation) in isolation from React or browser DOM.
2. **Storage Repository Tests:** Verify that local persistence, JSON parsing, and defensive fallbacks operate reliably under unexpected inputs.
3. **Curriculum Integrity Tests & Audits:** Verify that educational data (38 modules, 77 sublessons, 671 exercises, flashcards, questions) is preserved without regression.

---

## 2. Test Suites Summary

### `tests/domain.test.ts` (12 tests)
- **MCQ Scoring:** Accurate score calculation, empty answers handling, out-of-range choices.
- **Weak Topic Classification:** Correct identification of topics with score < 70%.
- **Progress Math:** Module percentage completion, overall syllabus completion, edge case clamping ([0, 100]).
- **Activity Streak:** Consecutive day streak calculation, same-day multiple completions, gap day streak resets.
- **Flashcard Logic:** Shuffling invariants (preserves length and elements), module filtering, mastery calculation.
- **Interview Scoring:** Weighted score calculation from rating rubrics.

### `tests/storage.test.ts` (11 tests)
- **Progress Repository:** Reading default progress, marking lessons complete, toggling completed state.
- **Self Evaluations:** Saving and retrieving self-evaluation ratings.
- **Solved Assignments:** Tracking completed coding exercises.
- **Defensive Recovery:**
  - Graceful recovery and fallback when `localStorage` contains malformed JSON (`{invalid}`).
  - Graceful recovery when `localStorage` contains non-array corrupted types.

### `tests/curriculum.test.ts` (7 tests)
- Verifies exact module count (38).
- Verifies section count (8).
- Verifies flashcards count (>= 70).
- Verifies interview questions count (>= 80).
- Verifies unique IDs across modules and sections.

### `tests/sublessons.test.ts` (5 tests)
- Validates sublesson manifest structure.
- Verifies sublesson-to-module mappings.
- Confirms non-empty content fields for all sublessons.

---

## 3. How to Run Tests

### Running the Vitest Suite
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npx vitest

# Run a specific test suite
npx vitest run tests/domain.test.ts
```

### Running the Curriculum Audit Script
```bash
node scripts/audit_complete_curriculum.cjs
```
This script traverses all sublesson directories, parses TS AST tokens for `lessonNumber` and `solutionCode`, and asserts exact counts. If any lesson or exercise is missing, it exits with code 1.

### Running TypeScript & Lint Checks
```bash
# TypeScript compiler validation
npx tsc --noEmit

# Oxlint linter check
npm run lint
```
