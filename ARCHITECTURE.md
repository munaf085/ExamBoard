# ExamBoard — System Architecture & Blueprint

**Framework:** Next.js 16.3.8 App Router  
**UI Library:** React 19  
**Language:** TypeScript 5.8  
**Styling:** Tailwind CSS v4  

---

## 1. Directory Structure

```text
ExamBoard/
├── src/
│   ├── app/                           # Next.js App Router (Routes & Layouts)
│   │   ├── layout.tsx                 # Root layout with site metadata & dark theme
│   │   ├── page.tsx                   # Landing page redirecting to /java
│   │   ├── error.tsx                  # Global error boundary
│   │   ├── not-found.tsx              # Global 404 handler
│   │   └── java/                      # Java Track root
│   │       ├── layout.tsx             # Java layout with metadata
│   │       ├── loading.tsx            # Java dashboard loading skeleton
│   │       ├── page.tsx               # Server Component for dashboard
│   │       ├── JavaDashboardClient.tsx# Client interactive dashboard
│   │       ├── syllabus/              # Full curriculum syllabus view
│   │       ├── flashcards/            # Flashcards route (Server layout + client deck)
│   │       ├── revision/              # Revision matrices & JVM traps
│   │       ├── mock-interview/        # F2F Interview simulator
│   │       ├── mcq/[moduleId]/        # Interactive module quiz (Server layout + client)
│   │       ├── module/[moduleId]/     # Server Component redirecting to first sublesson
│   │       └── lesson/[lessonId]/     # Sublesson workspace
│   │           ├── page.tsx           # Server Component fetching lesson & SEO
│   │           ├── loading.tsx        # Skeleton loader for lesson workspace
│   │           └── LessonWorkspaceClient.tsx # 7-tab interactive workspace
│   ├── components/                    # Shared reusable UI components
│   │   ├── CopyButton.tsx             # Copy-to-clipboard button
│   │   └── Navigation.tsx             # Navigation header
│   ├── data/java/                     # Core Java curriculum data
│   │   ├── curriculum.ts              # 38 modules and 8 sections definition
│   │   ├── detailedLessons.ts         # Central dynamic lesson loader
│   │   ├── javaFlashcards.ts          # 70 comprehensive flashcards
│   │   ├── sublessons/                # 77 sublessons organized by domain
│   │   │   ├── operators/
│   │   │   ├── controlFlow/
│   │   │   ├── strings/
│   │   │   ├── arrays/
│   │   │   ├── methods/
│   │   │   └── oop/
│   │   └── interviews/                # 105 interview questions & traps
│   ├── lib/
│   │   ├── curriculum/
│   │   │   └── sublessonManifest.ts   # 22KB lightweight navigation manifest
│   │   ├── domain/                    # Pure, framework-agnostic business logic
│   │   │   ├── mcq.ts
│   │   │   ├── progress.ts
│   │   │   ├── flashcards.ts
│   │   │   └── mockInterview.ts
│   │   ├── repositories/              # Future backend contract interfaces
│   │   └── storage/                   # Active storage repository abstraction
│   ├── types/                         # TypeScript domain & UI schemas
│   └── utils/                         # Storage & utility helpers
├── tests/                             # Vitest automated test suite
├── scripts/                           # Standalone curriculum audit scripts
└── .oxlintrc.json                     # Oxlint configuration
```

---

## 2. Sublesson Workspace & 7-Tab Experience

The `LessonWorkspaceClient` provides a distraction-free technical learning environment equipped with:

1. **`lesson`**: Beginner analogy, core explanations, line-by-line breakdown, and common beginner pitfalls.
2. **`cheatsheet`**: Key syntax points, fast copyable snippets, and memory triggers.
3. **`practice`**: Interactive coding problems with starter code, hints, test cases, and hidden solutions.
4. **`assignments`**: Challenge tasks with self-tracking checkmarks.
5. **`interview_qa`**: Conceptual F2F interview questions with model answers.
6. **`quiz`**: Instant-feedback multiple-choice check for understanding.
7. **`all`**: Linear unified reading mode for fast revision.

### Keyboard Accessibility
Full WAI-ARIA tab navigation:
- `ArrowRight` / `ArrowLeft`: Navigate between tabs with automatic focus.
- `Home` / `End`: Jump directly to first / last tab.
