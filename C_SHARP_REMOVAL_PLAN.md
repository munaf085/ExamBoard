# C# / .NET Track Removal & Dependency Audit Plan

**Document Version:** 1.0.0  
**Status:** Audit Completed — Awaiting User Approval  
**Target Platform:** ExamBoard (Java-Focused Learning & Interview Platform)  
**Author:** Principal Software Architect & Migration Lead  

---

## 1. Overview & Objectives
As part of ExamBoard's strategic pivot to an exclusive **Java Learning & Placement Platform**, the legacy C#/.NET track is being permanently decommissioned. 

This document provides a comprehensive dependency analysis of every file, component, data set, route, storage key, and type definition associated with the C#/.NET track. It ensures that 100% of C# artifacts are cleanly eliminated without breaking or compromising any Java curriculum data, exercises, or shared UI utilities.

---

## 2. Complete C# / .NET Inventory & Audit

### 2.1 C# Multiple Choice Question Banks (src/data/questions/)

#### 1. src/data/questions/easy1.ts
- **PURPOSE:** 40 beginner-level multiple-choice questions for .NET written paper easy-1 (syntax, definitions, basic output).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 2. src/data/questions/easy2.ts
- **PURPOSE:** 40 beginner-level questions for .NET written paper easy-2 (loops, basic OOP, simple SQL).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 3. src/data/questions/medium1.ts
- **PURPOSE:** 40 intermediate questions for .NET written paper medium-1 (C# code tracing, SQL queries, DSA).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 4. src/data/questions/medium2.ts
- **PURPOSE:** 40 intermediate questions for .NET written paper medium-2 (ASP.NET Web API, DI, SQL joins).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 5. src/data/questions/hard1.ts
- **PURPOSE:** 40 advanced questions for .NET written paper hard-1 (multi-step tracing, architecture, complex joins).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 6. src/data/questions/hard2.ts
- **PURPOSE:** 40 advanced questions for .NET written paper hard-2 (memory leaks, async/await, delegates).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 7. src/data/questions/hard3.ts
- **PURPOSE:** 40 tricky questions for .NET written paper hard-3 (nested loops, edge cases).
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 8. src/data/questions/csharp_oop.ts
- **PURPOSE:** 40 C# OOP focused questions for paper csharp-oop-1.
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 9. src/data/questions/topic_csharp_basics.ts
- **PURPOSE:** 40 questions covering C# value/reference types, strings, arrays, enums, operators.
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 10. src/data/questions/topic_csharp_oop.ts
- **PURPOSE:** 40 questions covering C# inheritance, polymorphism, encapsulation, abstraction, interfaces.
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 11. src/data/questions/topic_csharp_adv.ts
- **PURPOSE:** 40 questions covering C# delegates, LINQ, garbage collection, async/await.
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion).
- **SAFE TO DELETE:** YES (100% C# specific).
- **DEPENDENTS:** src/data/index.ts.
- **ACTION:** Delete file.

#### 12. src/data/questions/ (Directory)
- **PURPOSE:** Directory holding C# question papers only (Java questions live in src/data/java/questions/).
- **DEPENDENCIES:** None.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** None after question files are removed.
- **ACTION:** Delete directory once empty.

---

### 2.2 C# Interview Questions & Aggregations

#### 13. src/data/index.ts
- **PURPOSE:** Aggregator and validator for all 11 C# question papers. Exports llQuestions, getQuestionsForPaper(), getTotalQuestionCount(), and alidateQuestions().
- **DEPENDENCIES:** All files in src/data/questions/ and src/types/index.ts.
- **SAFE TO DELETE:** YES (.NET only; Java has src/data/java/index.ts).
- **DEPENDENTS:** src/pages/TestRunnerPage.tsx, src/pages/AnswerReviewPage.tsx.
- **ACTION:** Delete file.

#### 14. src/data/round2Questions.ts (46 KB)
- **PURPOSE:** Question dataset for .NET Round 2 Technical F2F interview (C#, OOP, DSA basics).
- **DEPENDENCIES:** src/types/index.ts (InterviewQuestion).
- **SAFE TO DELETE:** YES (Java uses src/data/java/interviews/javaRound2Questions.ts).
- **DEPENDENTS:** src/pages/Round2Page.tsx.
- **ACTION:** Delete file.

#### 15. src/data/round3Questions.ts (40 KB)
- **PURPOSE:** Question dataset for .NET Round 3 Advanced Technical F2F interview (ASP.NET Web API, SQL, System Design).
- **DEPENDENCIES:** src/types/index.ts (InterviewQuestion).
- **SAFE TO DELETE:** YES (Java uses src/data/java/interviews/javaRound3Questions.ts).
- **DEPENDENTS:** src/pages/Round3Page.tsx.
- **ACTION:** Delete file.

#### 16. src/data/hrQuestions.ts (6.8 KB)
- **PURPOSE:** Behavioral and culture fit questions for .NET Round 4 HR interview.
- **DEPENDENCIES:** src/types/index.ts (HRQuestion).
- **SAFE TO DELETE:** YES (C# hiring process specific).
- **DEPENDENTS:** src/pages/Round4Page.tsx.
- **ACTION:** Delete file.

---

### 2.3 C# Pages & Views (src/pages/)

#### 17. src/pages/DotNetDashboard.tsx
- **PURPOSE:** Navigation dashboard and landing hub for the .NET track.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/types/index.ts (PAPERS), src/utils/storage.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 18. src/pages/TestSelectionPage.tsx
- **PURPOSE:** Written test paper selector for C# papers with difficulty filters.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/types/index.ts, src/utils/storage.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 19. src/pages/TestInstructionsPage.tsx
- **PURPOSE:** Pre-test instructions and rules modal for .NET papers.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 20. src/pages/TestRunnerPage.tsx
- **PURPOSE:** 60-minute timed, proctored written test runner for C# papers.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/data/index.ts, src/utils/scoring.ts, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 21. src/pages/ResultPage.tsx
- **PURPOSE:** Test score diagnostics, pass/fail badge, and category progress bars for .NET exams.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 22. src/pages/AnswerReviewPage.tsx
- **PURPOSE:** Detailed question-by-question review of candidate answers for .NET exams.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/data/index.ts, src/utils/storage.ts, src/utils/scoring.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 23. src/pages/Round2Page.tsx
- **PURPOSE:** Interviewer scoring rubric for .NET Technical F2F Round 2.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/data/round2Questions.ts, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 24. src/pages/Round3Page.tsx
- **PURPOSE:** Interviewer scoring rubric for .NET Advanced Technical F2F Round 3.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/data/round3Questions.ts, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 25. src/pages/Round4Page.tsx
- **PURPOSE:** Interviewer scoring rubric for .NET Behavioral/HR Round 4.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/data/hrQuestions.ts, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 26. src/pages/PreparationDashboard.tsx
- **PURPOSE:** Preparation stats and performance overview for .NET candidate tests.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 27. src/pages/PreviousAttempts.tsx
- **PURPOSE:** Historical test attempt log for .NET exams.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/utils/storage.ts, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 28. src/pages/PrepTopics.tsx
- **PURPOSE:** Topic directory and deep link navigator for C# subjects.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

#### 29. src/pages/MockInterviewMode.tsx
- **PURPOSE:** Sequential 4-round .NET interview pipeline simulation.
- **DEPENDENCIES:** 
eact-router-dom, lucide-react, src/types/index.ts.
- **SAFE TO DELETE:** YES.
- **DEPENDENTS:** src/App.tsx.
- **ACTION:** Delete file.

---

### 2.4 C# Utilities & Storage (src/utils/)

#### 30. src/utils/storage.ts
- **PURPOSE:** LocalStorage CRUD operations for tyati_sessions, tyati_results, and tyati_interview_sessions.
- **DEPENDENCIES:** src/types/index.ts (TestSession, TestResult, InterviewSession).
- **SAFE TO DELETE:** YES (Java uses src/utils/javaStorage.ts exclusively).
- **DEPENDENTS:** All .NET pages listed above.
- **ACTION:** Delete file.

#### 31. src/utils/scoring.ts
- **PURPOSE:** MCQ answer evaluation and categorical scoring for written .NET exams.
- **DEPENDENCIES:** src/types/index.ts (WrittenQuestion, TestResult, Category, CategoryScore).
- **SAFE TO DELETE:** YES (Java MCQs in JavaMCQPage.tsx use localized self-contained scoring and javaStorage.recordMcqResult).
- **DEPENDENTS:** TestRunnerPage.tsx, AnswerReviewPage.tsx.
- **ACTION:** Delete file.

---

### 2.5 C# Types & Type Definitions (src/types/index.ts)

#### 32. src/types/index.ts (Lines 1 to 211)
- **PURPOSE:** Type declarations for C# questions, papers, sessions, and interview rubrics.
- **SPECIFIC TYPES TO REMOVE:**
  - QuestionType
  - Category
  - PaperId
  - WrittenQuestion
  - CodingQuestion
  - InterviewQuestion
  - HRQuestion
  - TestSession
  - TestResult
  - CategoryScore
  - InterviewScore
  - InterviewSession
  - PaperMeta
  - PAPERS
  - CATEGORY_LABELS
- **TYPES TO PRESERVE:**
  - Difficulty ('Easy' | 'Medium' | 'Hard'): Used by Java modules, MCQs, and exercises!
  - All Java interfaces (lines 213–342): JavaModule, JavaSection, JavaLesson, KeyConcept, CodeExample, JavaMCQ, JavaCodingProblem, ProblemExample, JavaInterviewQuestion, JavaFlashcard, JavaProgress, MockInterviewResult.
- **ACTION:** Modify src/types/index.ts to delete all C# types and export only Difficulty and the Java interfaces.

---

### 2.6 Routing & Navigation Integrations

#### 33. src/pages/HomePage.tsx
- **PURPOSE:** Landing page currently displaying dual widgets for .NET and Java tracks.
- **SAFE TO DELETE:** NO (Component is preserved, but .NET card widget and /dotnet link must be removed).
- **ACTION:** Refactor HomePage.tsx into a dedicated Java Learning & Interview Portal landing page.

#### 34. src/App.tsx
- **PURPOSE:** Central routing table.
- **SAFE TO DELETE:** NO (During Vite phase, remove 13 .NET routes and imports; during Next.js phase, replaced by pp/).
- **ACTION:** Remove all .NET imports and <Route> entries.

#### 35. LocalStorage Keys to Deprecate / Clear
- tyati_sessions / tyati_session_
- tyati_results
- tyati_interview_sessions
- **ACTION:** Exclude from future storage abstractions; provide migration utility to purge legacy keys.

---

## 3. Java Protection Map (Untouchable Assets)

The following components and datasets constitute the core Java product and MUST NOT be modified or deleted during C# removal:

`
+-----------------------------------------------------------------------------------+
| JAVA ECOSYSTEM COMPONENT      | REPOSITORY LOCATION                               |
+-------------------------------+---------------------------------------------------+
| 1. Master Curriculum Meta     | src/data/java/curriculum.ts (37 modules, 8 sects) |
| 2. Detailed Sublessons (77)   | src/data/java/detailedLessons.ts & sublessons/    |
| 3. Coding Assignments (671)   | src/data/java/sublessons/*/*Exercises.ts          |
| 4. Multiple Choice Questions  | src/data/java/questions/*.ts                      |
| 5. Core Interview Question Bank| src/data/java/interviews/javaRound2Questions.ts   |
| 6. Spring & SQL Interview Bank| src/data/java/interviews/javaRound3Questions.ts   |
| 7. JVM Interview Traps (25)   | src/data/java/interviews/javaInterviewTraps.ts    |
| 8. Flashcards Repository (70+)| src/data/java/javaFlashcards.ts                   |
| 9. Coding Challenge Problems  | src/data/java/javaCodingProblems.ts               |
| 10. Central Java Data Index   | src/data/java/index.ts                            |
| 11. Java LocalStorage Utility | src/utils/javaStorage.ts                          |
| 12. Shared UI Copy Button     | src/components/CopyButton.tsx                     |
| 13. Java Master Syllabus View | src/pages/JavaDashboard.tsx                       |
| 14. Java Module Directory     | src/pages/java/JavaModulePage.tsx                 |
| 15. 7-Tab Sublesson Engine    | src/pages/java/JavaSubLessonPage.tsx (103 KB)     |
| 16. Java MCQ Trainer View     | src/pages/java/JavaMCQPage.tsx                    |
| 17. Java Flashcard View       | src/pages/java/JavaFlashcardsPage.tsx             |
| 18. Java Mock Interview View  | src/pages/java/JavaMockInterviewPage.tsx          |
| 19. Fast Revision & Traps View| src/pages/java/JavaRevisionPage.tsx               |
| 20. Curriculum Build Scripts  | scripts/*.py, scripts/*.cjs                       |
+-----------------------------------------------------------------------------------+
`

---

## 4. Execution Plan & Safe Deletion Sequence

`mermaid
graph TD
    A[Step 1: Refactor src/pages/HomePage.tsx<br>Remove .NET Card] --> B[Step 2: Clean src/App.tsx<br>Remove 13 .NET Routes]
    B --> C[Step 3: Delete 13 .NET Page Files<br>src/pages/*.tsx]
    C --> D[Step 4: Delete .NET Utils<br>src/utils/storage.ts & scoring.ts]
    D --> E[Step 5: Delete .NET Data<br>src/data/questions/* & round*.ts]
    E --> F[Step 6: Purge C# Types<br>src/types/index.ts Lines 1-211]
    F --> G[Step 7: Run TypeScript & Build Check<br>tsc -b && vite build]
    G --> H[Step 8: Verify Zero Broken Java Imports]
`

### Verification Criteria:
1. 
pm run build must compile with **0 TypeScript errors**.
2. 
pm run lint must pass without broken import errors.
3. 
ode scripts/audit_complete_curriculum.cjs must confirm all 77 sublessons and 671 exercises remain fully intact.
