# ExamBoard — Performance & Bundle Slicing Audit

**Platform:** Next.js 16 App Router (Turbopack)  
**React Version:** 19  

---

## 1. The Core Performance Challenge

In the initial migration from Vite SPA to Next.js App Router, the Java educational dataset—containing 77 detailed lessons with over 671 rich coding problems, line-by-line explanations, test cases, and code solutions—totaled over **7.5 MB** of static TypeScript objects.

When client components imported `getDetailedLesson` or `ALL_DETAILED_LESSONS` directly (for example, in the dashboard sidebar or syllabus list), Next.js was forced to compile the entire curriculum into the client-side JavaScript bundles. This resulted in:
1. Significant initial page load payload on `/java` and `/java/module/[moduleId]`.
2. Heavy CPU hydration overhead on mobile devices.
3. Unnecessary re-evaluation of educational data that the user had not yet navigated to.

---

## 2. Architectural Solution: Manifest-Driven Bundle Slicing

To resolve this bottleneck, we engineered a two-tier data resolution architecture:

### Tier 1: Lightweight Manifest (`SUBLESSON_MANIFEST`)
- Created `src/lib/curriculum/sublessonManifest.ts`.
- Extracts strictly essential navigation and metadata fields:
```typescript
export interface SubLessonSummary {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  exerciseCount: number;
  quizCount: number;
  interviewCount: number;
}
```
- Payload footprint: **~22 KB** (a 99.7% reduction compared to the full 7.5 MB dataset).
- Used everywhere for listings, sidebars, progress indicators, search filtering, and next/prev topic calculations.

### Tier 2: On-Demand Dynamic Resolution (`getDetailedLesson(id)`)
- Server Components at `/java/lesson/[lessonId]` dynamically resolve only the specific lesson requested at request time.
- Heavy lesson content (code snippets, line-by-line analyses, 10 practice problems per lesson) is sent strictly to the specific lesson page being viewed.

---

## 3. Server Component Architecture & Static Prerendering

### Route-Level Optimization Table

| Route | Rendering Mode | Optimization Strategy |
| :--- | :---: | :--- |
| `/` | **Static (prerendered)** | Instant landing redirection; zero client JS bundle overhead. |
| `/_not-found` | **Static (prerendered)** | Custom styled 404 page prerendered at build time. |
| `/java` | **Static (prerendered)** | Dashboard powered by `SUBLESSON_MANIFEST`. Fully prerendered. |
| `/java/flashcards` | **Static (prerendered)** | Prerendered shell; lightweight client interactive flashcard deck. |
| `/java/revision` | **Static (prerendered)** | Comparison matrices & traps statically prerendered with copy utilities. |
| `/java/mock-interview` | **Static (prerendered)** | Static F2F simulator interface with dynamic question review. |
| `/java/syllabus` | **Static (prerendered)** | Complete course syllabus generated ahead of time. |
| `/java/module/[moduleId]` | **Dynamic (server-rendered)** | Pure Server Component redirect. Bypasses intermediate client bundles. |
| `/java/lesson/[lessonId]` | **Dynamic (server-rendered)** | Dynamic server-side lesson resolution with `notFound()` and dynamic SEO metadata. |
| `/java/mcq/[moduleId]` | **Dynamic (server-rendered)** | Server Component layout for dynamic SEO + isolated client quiz engine. |

---

## 4. Next.js 16 Production Build Results

Output from `npm run build`:
- **Turbopack Build Duration:** ~6.2 seconds.
- **Static Pages Generation:** 8 static pages generated in ~1.18 seconds.
- **Route Errors:** 0.
- **Type Failures:** 0.

By separating metadata extraction from client components and utilizing server-side redirects, client bundle sizes remain lean, responsive, and ready for high-concurrency production deployments.
