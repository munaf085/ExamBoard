# ExamBoard — Backend Readiness & Repository Architecture

**Status:** Future-Proof Contract Layer Implemented  
**Current Active Driver:** `LocalProgressRepository` (localStorage with defensive recovery)  
**Target Backend:** PostgreSQL + Redis + Auth (JWT / Session)  

---

## 1. Architectural Philosophy

ExamBoard requires zero active backend today (no running PostgreSQL database, no Redis cache server, no live auth service). However, to prevent costly UI rewrites when migrating to a production backend, the application has been restructured using the **Repository Pattern** and **Pure Domain Business Logic**.

### Core Invariants:
1. **No direct `localStorage` access in React components:** UI components must not call `window.localStorage` directly.
2. **Abstract Interface Contracts:** All data persistence is mediated by strongly typed TypeScript repository interfaces.
3. **Pure Domain Services:** Scoring, completion percentage, streak calculation, and evaluation algorithms reside in pure, testable domain modules.

---

## 2. Pure Domain Layer (`src/lib/domain/`)

The domain layer contains zero dependencies on React, Next.js, or browser APIs:

- **`mcq.ts`**:
  - `calculateMcqScore(answers, questions)`: Pure scoring engine.
  - `classifyWeakStrongTopics(history)`: Algorithmic classification of concepts needing revision.
- **`progress.ts`**:
  - `computeModuleProgress(moduleId, completedLessons, totalSublessons)`: Percentage calculations.
  - `computeCurriculumProgress(completedLessons, totalSublessons)`: Overall syllabus completion.
  - `calculateStreak(activityTimestamps)`: Consecutive day streak calculation.
- **`flashcards.ts`**:
  - `filterFlashcardsByModule(cards, moduleId)`: Module-level filtering.
  - `shuffleFlashcards(cards)`: Non-destructive Fisher-Yates array shuffling.
  - `calculateFlashcardMastery(knownCards, totalCards)`: Mastery percentage.
- **`mockInterview.ts`**:
  - `calculateMockInterviewScore(ratings)`: Weighted interview performance computation.
  - `formatDuration(seconds)`: Time formatting utility.

---

## 3. Storage Abstraction Layer (`src/lib/storage/`)

### Key Architecture:
- `STORAGE_KEYS` (`storageKeys.ts`): Single source of truth for local storage keys (`examboard_java_progress`, `examboard_java_weak_strong`, etc.).
- `ProgressRepository` (`progressRepository.ts`): Abstract contract defining async operations:
```typescript
export interface ProgressRepository {
  getProgress(): Promise<JavaProgress>;
  saveProgress(progress: JavaProgress): Promise<void>;
  toggleLesson(lessonId: string): Promise<JavaProgress>;
  resetProgress(): Promise<void>;
  recordMcqResult(moduleId: string, score: number, total: number): Promise<void>;
  getSelfEvaluations(): Promise<Record<string, { rating: string; timestamp: number }>>;
  saveSelfEvaluation(lessonId: string, rating: string): Promise<void>;
  getSolvedAssignments(): Promise<string[]>;
  toggleSolvedAssignment(key: string): Promise<string[]>;
}
```
- `LocalProgressRepository` (`localProgressRepository.ts`): Active implementation wrapping `localStorage` with:
  - SSR guard (`typeof window === 'undefined'`).
  - Corrupted JSON recovery (automatic reset with fallback to default state on malformed data).
  - Synchronous convenience methods maintaining backward compatibility for legacy utilities (`src/utils/javaStorage.ts`).

---

## 4. Future Backend Repository Contracts (`src/lib/repositories/`)

Four ready-to-implement repository interfaces have been defined for backend integration:

1. **`UserRepository` (`userRepository.ts`)**:
   - `getUser(id)`
   - `updateUserProfile(id, profile)`
   - `getUserSettings(id)`
   - `updateUserSettings(id, settings)`
2. **`AttemptRepository` (`attemptRepository.ts`)**:
   - `recordCodingAttempt(attempt)`
   - `getCodingAttempts(userId, problemId)`
   - `recordQuizAttempt(attempt)`
   - `getQuizAttempts(userId, moduleId)`
3. **`SyncRepository` (`syncRepository.ts`)**:
   - `pullPendingSync(userId, lastSyncedAt)`
   - `pushLocalBatch(userId, changes)`
   - `resolveConflict(conflictResolution)`

---

## 5. Migration Blueprint to Live Backend

When transitioning to a live backend (PostgreSQL + Prisma/Drizzle + API Routes / Server Actions):
1. Create `src/lib/storage/apiProgressRepository.ts` implementing `ProgressRepository`.
2. Swap the injected repository instance in `src/lib/storage/index.ts` from `LocalProgressRepository` to `ApiProgressRepository`.
3. Zero changes will be required in any lesson component, dashboard, or quiz view.
