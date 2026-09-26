import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, HelpCircle,
  AlertTriangle, Lightbulb, Code2, BookOpen, Terminal,
  Menu, X, Sparkles, ChevronRight, CheckCircle, RotateCcw,
  Eye, EyeOff, Award, Check, ChevronDown, ListFilter,
  Volume2, ThumbsUp, ThumbsDown, Clock, FileText, Split, CheckSquare
} from 'lucide-react';
import {
  DETAILED_LESSONS,
  getDetailedLesson,
  getAllDetailedLessons,
  getAdjacentLessons,
  DetailedLesson,
  PracticeProblem
} from '../../data/java/detailedLessons';
import {
  getJavaProgress,
  toggleLessonComplete,
  getSelfEvaluations,
  saveSelfEvaluation,
  SelfEvalRating,
  getSolvedAssignments,
  toggleSolvedAssignment
} from '../../utils/javaStorage';
import { JAVA_MODULES, JAVA_SECTIONS } from '../../data/java/curriculum';
import CopyButton from '../../components/CopyButton';

type ActiveTab = 'lesson' | 'cheatsheet' | 'practice' | 'assignments' | 'interview_qa' | 'quiz' | 'all';

export function formatLessonNum(numStr?: string): string {
  if (!numStr) return '';
  return numStr.replace(/^Lesson\s+/i, '').trim();
}

function renderInlineMarkdown(content: string): React.ReactNode {
  const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="bg-slate-800 text-emerald-300 font-mono text-xs sm:text-sm px-1.5 py-0.5 rounded border border-slate-700/80"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-4">
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const lines = trimmed.split('\n');
        const isList = lines.length > 1 && lines.every(l => {
          const t = l.trim();
          return t.startsWith('- ') || t.startsWith('* ') || /^\d+\.\s/.test(t);
        });

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-2.5 my-2 pl-1">
              {lines.map((line, lIdx) => {
                const lineContent = line.trim().replace(/^[-*]\s+|\d+\.\s+/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-2.5 text-slate-300 text-sm sm:text-base leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 shrink-0" />
                    <span>{renderInlineMarkdown(lineContent)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {renderInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default function JavaSubLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selfEvals, setSelfEvals] = useState<Record<string, { rating: SelfEvalRating }>>({});
  const [questionRatings, setQuestionRatings] = useState<Record<number, SelfEvalRating>>({});
  const [solvedAssignments, setSolvedAssignments] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('lesson');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const activeLessonRef = React.useRef<HTMLButtonElement | null>(null);

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

  // Practice Problems state (multi-problem support)
  const [practiceSelected, setPracticeSelected] = useState<Record<number, number>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Interviewer Question state: which questions have their answers revealed
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  // Hands-on programming exercises state
  const [revealedExercises, setRevealedExercises] = useState<Record<number, boolean>>({});
  const [showExerciseHints, setShowExerciseHints] = useState<Record<number, boolean>>({});

  const lesson: DetailedLesson | undefined = lessonId ? getDetailedLesson(lessonId) : undefined;
  const adjacent = lesson ? getAdjacentLessons(lesson.id) : { prev: undefined, next: undefined };
  const allLessons = getAllDetailedLessons();

  const currentLessonIndex = allLessons.findIndex(l => l.id === lesson?.id);

  const currentModule = JAVA_MODULES.find(
    m => m.id === lesson?.moduleId || m.id.toLowerCase() === lesson?.moduleId?.toLowerCase()
  );
  const currentSectionId = currentModule?.section || 'fundamentals';
  const [selectedSection, setSelectedSection] = useState<string>(currentSectionId);

  // Sync selectedSection whenever active lesson's section changes
  useEffect(() => {
    if (currentModule?.section) {
      setSelectedSection(currentModule.section);
    }
  }, [currentModule?.section]);

  // Auto-expand module containing the active lesson
  useEffect(() => {
    if (lesson?.moduleId) {
      setExpandedModules(prev => ({ ...prev, [lesson.moduleId]: true }));
    }
  }, [lesson?.moduleId]);

  // Smoothly scroll active lesson into view when sidebar opens or route changes
  useEffect(() => {
    if (activeLessonRef.current) {
      const timer = setTimeout(() => {
        activeLessonRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sidebarOpen, lessonId]);

  // Normalize practice problems list
  const practiceProblemsList: PracticeProblem[] = lesson?.practiceProblems
    ? lesson.practiceProblems
    : lesson?.practiceProblem
    ? [lesson.practiceProblem]
    : [];

  useEffect(() => {
    const progress = getJavaProgress();
    setCompletedLessons(progress.lessonsCompleted || []);
    setSelfEvals(getSelfEvaluations());
    setSolvedAssignments(getSolvedAssignments());

    // Reset interactive states when switching lesson
    setQuizAnswers({});
    setQuizRevealed({});
    setPracticeSelected({});
    setPracticeRevealed({});
    setShowHints({});
    setRevealedQuestions({});
    setRevealedExercises({});
    setShowExerciseHints({});
    setQuestionRatings({});

    // Read initial tab from URL query param
    const queryTab = searchParams.get('tab');
    if (queryTab) {
      if (queryTab === 'takeaways' || queryTab === 'lesson') setActiveTab('lesson');
      else if (queryTab === 'interview' || queryTab === 'interview_qa' || queryTab === 'self-eval' || queryTab === 'self_eval') setActiveTab('interview_qa');
      else if (['lesson', 'cheatsheet', 'practice', 'assignments', 'interview_qa', 'quiz', 'all'].includes(queryTab)) {
        setActiveTab(queryTab as ActiveTab);
      } else {
        setActiveTab('lesson');
      }
    } else {
      setActiveTab('lesson');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId, searchParams]);

  const handleToggleSolvedAssignment = (assignmentKey: string) => {
    toggleSolvedAssignment(assignmentKey);
    setSolvedAssignments(getSolvedAssignments());
  };

  const handleToggleComplete = () => {
    if (!lesson) return;
    toggleLessonComplete(lesson.id);
    const progress = getJavaProgress();
    setCompletedLessons([...progress.lessonsCompleted]);
  };

  const handleSelfRate = (rating: SelfEvalRating) => {
    if (!lesson) return;
    saveSelfEvaluation(lesson.id, rating);
    setSelfEvals(getSelfEvaluations());
    // Auto-mark completed if mastered
    if (rating === 'mastered' && !completedLessons.includes(lesson.id)) {
      handleToggleComplete();
    }
  };

  const handleSelectQuizOption = (qIdx: number, optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
    setQuizRevealed(prev => ({ ...prev, [qIdx]: true }));
  };

  // Get modules belonging to the selected section
  const sectionModules = JAVA_MODULES.filter(m => m.section === selectedSection);
  const sectionModuleIds = new Set(sectionModules.map(m => m.id.toLowerCase()));

  // Filter lessons to only those in the selected section
  const sectionLessons = allLessons.filter(l =>
    sectionModuleIds.has(l.moduleId.toLowerCase())
  );

  // Group lessons by module for the selected section
  const modulesGrouped = sectionLessons.reduce<Record<string, { title: string; lessons: DetailedLesson[] }>>((acc, l) => {
    if (!acc[l.moduleId]) {
      acc[l.moduleId] = { title: l.moduleTitle, lessons: [] };
    }
    acc[l.moduleId].lessons.push(l);
    return acc;
  }, {});

  const currentSectionInfo = JAVA_SECTIONS.find(s => s.id === selectedSection);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-xl">
          <HelpCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Lesson Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">
            The sub-topic "{lessonId}" could not be located in the curriculum.
          </p>
          <div className="space-y-2">
            <Link
              to="/java/lesson/what-is-java"
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm transition"
            >
              Start at Lesson 1.1: What is Java
            </Link>
            <Link
              to="/java/syllabus"
              className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 font-semibold rounded-xl text-sm transition"
            >
              View Full Syllabus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);
  const currentRating = selfEvals[lesson.id]?.rating;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-24 md:pb-12">
      {/* ── STICKY TOP APP BAR (MOBILE FIRST) ── */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/90 px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition lg:hidden active:scale-95"
            aria-label="Open syllabus menu"
          >
            <Menu className="w-5 h-5 text-blue-400" />
          </button>

          <Link
            to="/java/syllabus"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Syllabus</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 shrink-0">
              {formatLessonNum(lesson.lessonNumber)}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate max-w-[150px] sm:max-w-xs md:max-w-md">
              {lesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick link to Revision cheat sheets */}
          <Link
            to="/java/revision"
            className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-blue-300 px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/80 transition"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>All Cheatsheets</span>
          </Link>

          {/* Rating Badge */}
          {currentRating && (
            <span
              className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                currentRating === 'mastered'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : currentRating === 'partial'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span className="capitalize">{currentRating}</span>
            </span>
          )}

          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition active:scale-95 ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden xs:inline">Learned</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span className="hidden xs:inline">Mark Done</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── MAIN BODY CONTAINER ── */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* ── CURRICULUM DRAWER / SIDEBAR ── */}
        <aside
          className={`fixed lg:sticky top-[53px] bottom-0 left-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-3 sm:p-4 overflow-y-auto z-50 transition-transform duration-200 shadow-2xl lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{ height: 'calc(100vh - 53px)' }}
        >
          <div className="mb-3 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Curriculum Sub-Topics
              </h3>
              <p className="text-[11px] text-slate-400">
                {currentSectionInfo?.label || 'Active Section'} · {sectionLessons.length} Lessons
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Section Switcher dropdown */}
          <div className="mb-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Section:
            </label>
            <div className="relative">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 hover:border-blue-500/50 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer pr-8"
              >
                {JAVA_SECTIONS.map((sec) => {
                  const secMods = JAVA_MODULES.filter(m => m.section === sec.id);
                  return (
                    <option key={sec.id} value={sec.id} className="bg-slate-900 text-slate-200 py-1">
                      {sec.label} ({secMods.length} Modules)
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            {Object.keys(modulesGrouped).length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs bg-slate-950/40 rounded-xl border border-slate-800 space-y-2">
                <p>No sub-lessons loaded for this section yet.</p>
                <button
                  onClick={() => setSelectedSection(currentSectionId)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold transition"
                >
                  Return to {currentSectionInfo?.label || 'Current Section'}
                </button>
              </div>
            ) : (
              Object.entries(modulesGrouped).map(([modId, modData]) => {
              const isModOpen = expandedModules[modId] ?? (modId === lesson.moduleId);
              const doneCount = modData.lessons.filter(l => completedLessons.includes(l.id)).length;
              const hasActive = modData.lessons.some(l => l.id === lesson.id);

              return (
                <div key={modId} className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  <button
                    onClick={() => setExpandedModules(prev => ({ ...prev, [modId]: !isModOpen }))}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition ${
                      hasActive ? 'bg-slate-800/80 text-blue-300 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      {isModOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      )}
                      <span className="text-xs truncate font-bold">{modData.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {doneCount}/{modData.lessons.length}
                    </span>
                  </button>

                  {isModOpen && (
                    <div className="p-1 space-y-0.5 border-t border-slate-800/60 bg-slate-950/40">
                      {modData.lessons.map(sub => {
                        const active = sub.id === lesson.id;
                        const done = completedLessons.includes(sub.id);
                        const evalRating = selfEvals[sub.id]?.rating;
                        const cleanNum = formatLessonNum(sub.lessonNumber);
                        return (
                          <button
                            key={sub.id}
                            ref={active ? activeLessonRef : null}
                            onClick={() => {
                              setSidebarOpen(false);
                              navigate(`/java/lesson/${sub.id}`);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                              active
                                ? 'bg-blue-600/25 text-blue-200 font-semibold border border-blue-500/40 shadow-sm'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate pr-2">
                              {done ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              ) : (
                                <span className="font-mono text-[10px] font-semibold text-blue-400/80 shrink-0 min-w-[20px]">
                                  {cleanNum}
                                </span>
                              )}
                              <span className="truncate">{sub.title}</span>
                            </div>
                            {evalRating ? (
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                                  evalRating === 'mastered'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : evalRating === 'partial'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-rose-500/20 text-rose-400'
                                }`}
                              >
                                {evalRating[0]}
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                                {sub.estimatedMinutes}m
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }))}
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/75 z-40 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* ── LESSON CONTENT AREA ── */}
        <main className="flex-1 p-3 sm:p-5 md:p-8 max-w-4xl mx-auto w-full space-y-5">
          {/* Compact, Slim Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[11px]">
                  {formatLessonNum(lesson.lessonNumber)}
                </span>
                <span className="text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
                  {lesson.moduleTitle}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>⏱ ~{lesson.estimatedMinutes}m read</span>
                <span>·</span>
                <span>Topic {currentLessonIndex + 1}/{allLessons.length}</span>
              </div>
            </div>

            <h1 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
              {lesson.title}
            </h1>
            {lesson.subtitle && (
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                {lesson.subtitle}
              </p>
            )}
          </div>

          {/* ── EASY NAVIGATION TABS FOR EACH TOPIC (STICKY & MOBILE-OPTIMIZED) ── */}
          <div className="sticky top-[49px] sm:top-[53px] z-30 bg-slate-950/95 backdrop-blur-md pt-2 pb-2 -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6 border-b border-slate-800/90 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto scroll-smooth overscroll-x-contain scrollbar-none pb-0.5">
              {/* 1. Lesson */}
              <button
                onClick={() => setActiveTab('lesson')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'lesson'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Lesson</span>
              </button>

              {/* 2. 📋 Cheat Sheet */}
              <button
                onClick={() => setActiveTab('cheatsheet')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'cheatsheet'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Cheat Sheet</span>
              </button>

              {/* 3. Examples */}
              <button
                onClick={() => setActiveTab('practice')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'practice'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Examples ({practiceProblemsList.length})</span>
              </button>

              {/* 4. Practice */}
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'assignments'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Practice ({lesson.programmingExercises?.length || 0})</span>
              </button>

              {/* 5. Interview Q&A */}
              <button
                onClick={() => setActiveTab('interview_qa')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'interview_qa'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>Q&A ({lesson.interviewQuestions?.length || 0})</span>
              </button>

              {/* 6. Quiz */}
              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'quiz'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Quiz ({lesson.miniQuiz?.length || 0})</span>
              </button>

              {/* 7. All */}
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 active:scale-95 ${
                  activeTab === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>All</span>
              </button>
            </div>
          </div>

          {/* ── TAB 1: LESSON OVERVIEW ── */}
          {(activeTab === 'lesson' || activeTab === 'all') && (
            <article className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 sm:p-7 md:p-9 space-y-7 text-slate-300 leading-relaxed shadow-sm">
              {/* 1. Intuitive Analogy */}
              {lesson.beginnerAnalogy && (
                <section className="space-y-3 pb-6 border-b border-slate-800/70">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>💡 An Easy Way to Think About It</span>
                  </h2>
                  <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-3 pl-1">
                    {renderFormattedText(lesson.beginnerAnalogy)}
                  </div>
                </section>
              )}

              {/* 2. Core Concepts (Natural Paragraphs, No Grids, No Boxes around every item!) */}
              <section className="space-y-4 pb-6 border-b border-slate-800/70">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>📖 How It Works in Java</span>
                </h2>
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed pl-1">
                  {lesson.coreExplanation.map((point, idx) => (
                    <div key={idx} className="leading-relaxed">
                      {renderFormattedText(point)}
                    </div>
                  ))}
                </div>
              </section>

              {/* 3. Syntax Template (if available) */}
              {lesson.cheatSheet?.syntaxTemplate && (
                <section className="space-y-3 pb-6 border-b border-slate-800/70">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>⚙️ Syntax Structure</span>
                    </h2>
                    <CopyButton text={lesson.cheatSheet.syntaxTemplate} label="Copy Syntax" />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
                    <pre className="font-mono text-xs sm:text-sm text-amber-300 leading-relaxed">
                      <code>{lesson.cheatSheet.syntaxTemplate}</code>
                    </pre>
                  </div>
                  {lesson.cheatSheet.summary && (
                    <p className="text-xs text-slate-400 leading-relaxed pl-1">
                      📌 {lesson.cheatSheet.summary}
                    </p>
                  )}
                </section>
              )}

              {/* 4. Code in Action */}
              {lesson.codeSnippet && (
                <section className="space-y-4 pb-6 border-b border-slate-800/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>💻 Code in Action: {lesson.codeSnippet.title}</span>
                    </h2>
                    <CopyButton text={lesson.codeSnippet.code} label="Copy Code" />
                  </div>

                  {/* Code Block */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
                    <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                      <code>{lesson.codeSnippet.code}</code>
                    </pre>
                  </div>

                  {/* Line by line explanation */}
                  {lesson.codeSnippet.lineByLineExplanation && lesson.codeSnippet.lineByLineExplanation.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h3 className="text-xs font-semibold text-slate-400">Step-by-step walkthrough:</h3>
                      <div className="space-y-2">
                        {lesson.codeSnippet.lineByLineExplanation.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                          >
                            <code className="font-mono text-emerald-400 font-bold shrink-0 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20 text-xs">
                              {item.line}
                            </code>
                            <span className="text-slate-300">{item.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Output */}
                  {lesson.codeSnippet.output && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-xs font-semibold text-slate-400">Console Output:</div>
                      <div className="bg-black/70 border border-slate-800 rounded-xl p-3.5 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre">
                        {lesson.codeSnippet.output}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* 5. Memory Architecture Diagram */}
              {lesson.diagram && (
                <section className="space-y-3 pb-6 border-b border-slate-800/70">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>🗺️ Memory Model</span>
                    </h2>
                    <CopyButton text={lesson.diagram} label="Copy Diagram" />
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
                    <pre className="font-mono text-xs sm:text-sm text-indigo-300 leading-relaxed">
                      {lesson.diagram}
                    </pre>
                  </div>
                </section>
              )}

              {/* 6. Practical Real-World Examples */}
              {lesson.codeExamples && lesson.codeExamples.length > 0 && (
                <section className="space-y-5 pb-6 border-b border-slate-800/70">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>🚀 Practical Examples ({lesson.codeExamples.length})</span>
                  </h2>

                  <div className="space-y-5">
                    {lesson.codeExamples.map((ex, exIdx) => (
                      <div key={exIdx} className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-slate-200 text-sm">
                            {exIdx + 1}. {ex.title}
                          </h3>
                          <CopyButton text={ex.code} label="Copy Code" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{ex.description}</p>
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
                          <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                            <code>{ex.code}</code>
                          </pre>
                        </div>
                        {ex.output && (
                          <div className="bg-black/70 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 whitespace-pre">
                            <span className="text-slate-500 text-[10px] uppercase block mb-1">Expected Output:</span>
                            {ex.output}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 7. Key Takeaways */}
              {lesson.interviewTakeaways && lesson.interviewTakeaways.length > 0 && (
                <section className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>⭐ Summary & Key Points</span>
                  </h2>
                  <ul className="space-y-2.5 pl-1">
                    {lesson.interviewTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{renderInlineMarkdown(item)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          )}

          {/* ── TAB: DEDICATED TOPIC CHEAT SHEET ── */}
          {(activeTab === 'cheatsheet' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Topic Cheat Sheet & Quick Reference</span>
                  </div>
                  <Link
                    to="/java/revision"
                    className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Full Cheat Sheet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {lesson.cheatSheet ? (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">Summary: </strong>
                      {lesson.cheatSheet.summary}
                    </div>

                    {lesson.cheatSheet.syntaxTemplate && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Standard Syntax Template:
                          </div>
                          <CopyButton text={lesson.cheatSheet.syntaxTemplate} label="Copy Syntax" />
                        </div>
                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
                          <pre className="font-mono text-xs sm:text-sm text-amber-300 leading-relaxed">
                            <code>{lesson.cheatSheet.syntaxTemplate}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {lesson.cheatSheet.rules && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Core Rules:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {lesson.cheatSheet.rules.map((r, rIdx) => (
                            <div key={rIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                              <div className="font-bold text-slate-200">📌 {r.rule}</div>
                              <div className="text-slate-400 leading-relaxed">{r.explanation}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {lesson.cheatSheet.quickComparison && (
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Interview Comparison Table:
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-slate-800">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-850 text-slate-300 font-bold uppercase text-[10px]">
                              <tr>
                                <th className="p-2.5">Aspect</th>
                                <th className="p-2.5 text-blue-300">Option A</th>
                                <th className="p-2.5 text-emerald-300">Option B</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                              {lesson.cheatSheet.quickComparison.map((row, cIdx) => (
                                <tr key={cIdx} className="hover:bg-slate-800/40">
                                  <td className="p-2.5 font-semibold text-slate-300">{row.aspect}</td>
                                  <td className="p-2.5 text-slate-400 font-mono text-[11px]">{row.optionA}</td>
                                  <td className="p-2.5 text-slate-400 font-mono text-[11px]">{row.optionB}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Fallback auto-generated quick rules from coreExplanation */
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Quick Reference Points for {lesson.title}:
                    </p>
                    <div className="space-y-2">
                      {lesson.coreExplanation.map((point, pIdx) => (
                        <div key={pIdx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                          <CheckSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 3: PLENTY OF EXAMPLES & PRACTICE PROBLEMS ── */}
          {(activeTab === 'practice' || activeTab === 'all') && (
            <div className="space-y-6">
              {/* Practice Challenges Section */}
              {practiceProblemsList.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>Interactive Practice Problems ({practiceProblemsList.length} Puzzles)</span>
                  </div>

                  <div className="space-y-4">
                    {practiceProblemsList.map((prob, pIdx) => {
                      const chosen = practiceSelected[pIdx];
                      const revealed = practiceRevealed[pIdx];
                      const hintOpen = showHints[pIdx];

                      return (
                        <div
                          key={pIdx}
                          className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm">
                              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                                {pIdx + 1}
                              </span>
                              <span>{prob.title}</span>
                            </div>
                            <div className="flex items-center gap-2 self-start sm:self-auto">
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                                Practice #{pIdx + 1}
                              </span>
                              <CopyButton
                                text={`${prob.title}\n\n${prob.problemStatement}${prob.code ? `\n\nCode:\n${prob.code}` : ''}`}
                                label="Copy Problem"
                              />
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {prob.problemStatement}
                          </p>

                          {prob.code && (
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
                              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/60">
                                <span className="text-[10px] font-mono text-slate-500">Java Snippet</span>
                                <CopyButton text={prob.code} label="Copy Code" />
                              </div>
                              <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                                <code>{prob.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* Options if provided */}
                          {prob.options && (
                            <div className="space-y-2">
                              <div className="text-xs font-semibold text-slate-400">
                                Select what you predict the output will be:
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {prob.options.map((opt, optIdx) => {
                                  const isCorrect = optIdx === prob.correctOptionIndex;
                                  const isChosen = chosen === optIdx;
                                  let btnStyle = 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-700';

                                  if (revealed) {
                                    if (isCorrect) {
                                      btnStyle = 'border-emerald-500/80 bg-emerald-500/20 text-emerald-300 font-semibold';
                                    } else if (isChosen) {
                                      btnStyle = 'border-rose-500/80 bg-rose-500/20 text-rose-300';
                                    } else {
                                      btnStyle = 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-60';
                                    }
                                  } else if (isChosen) {
                                    btnStyle = 'border-blue-500 bg-blue-500/20 text-blue-200';
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => {
                                        setPracticeSelected(prev => ({ ...prev, [pIdx]: optIdx }));
                                        setPracticeRevealed(prev => ({ ...prev, [pIdx]: true }));
                                      }}
                                      className={`p-3 rounded-xl border text-xs sm:text-sm font-mono text-left transition flex items-center justify-between ${btnStyle}`}
                                    >
                                      <span>{opt}</span>
                                      {revealed && isCorrect && (
                                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Actions: Hint & Tracing Solution */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <button
                              onClick={() => setShowHints(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                            >
                              {hintOpen ? 'Hide Hint' : '💡 Need a Hint?'}
                            </button>

                            <button
                              onClick={() => setPracticeRevealed(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
                            >
                              {revealed ? 'Hide Step-by-Step Tracing' : 'Reveal Tracing Solution'}
                            </button>
                          </div>

                          {hintOpen && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                              <strong>Hint: </strong>{prob.hint}
                            </div>
                          )}

                          {revealed && (
                            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                  Exact Solution: {prob.solution}
                                </div>
                                <CopyButton text={`Solution: ${prob.solution}\n\nTracing:\n${prob.explanation}`} label="Copy Tracing" />
                              </div>
                              <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {prob.explanation}
                              </pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Standard Code In Action Snippet */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Code2 className="w-4 h-4" />
                    <span>Primary Example: {lesson.codeSnippet.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Java 21</span>
                    <CopyButton text={lesson.codeSnippet.code} label="Copy Code" />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                    <code>{lesson.codeSnippet.code}</code>
                  </pre>
                </div>

                {/* Line by line explanation */}
                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Line-by-Line Breakdown:
                  </h4>
                  <div className="space-y-1.5">
                    {lesson.codeSnippet.lineByLineExplanation.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2.5"
                      >
                        <code className="font-mono text-emerald-400 font-semibold shrink-0">
                          {item.line}
                        </code>
                        <span className="text-slate-300">{item.explanation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output */}
                {lesson.codeSnippet.output && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Console Output:
                      </div>
                      <CopyButton text={lesson.codeSnippet.output} label="Copy Output" />
                    </div>
                    <div className="bg-black/70 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 whitespace-pre">
                      {lesson.codeSnippet.output}
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Real-World Code Examples if present */}
              {lesson.codeExamples && lesson.codeExamples.length > 0 && (
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>Additional Real-World Scenarios ({lesson.codeExamples.length} Examples)</span>
                  </div>

                  <div className="space-y-4">
                    {lesson.codeExamples.map((ex, exIdx) => (
                      <div key={exIdx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-200 text-sm">{ex.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">Scenario</span>
                            <CopyButton text={ex.code} label="Copy Code" />
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{ex.description}</p>

                        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
                          <pre className="font-mono text-xs text-emerald-300 leading-relaxed">
                            <code>{ex.code}</code>
                          </pre>
                        </div>

                        {ex.output && (
                          <div className="bg-black/70 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 whitespace-pre">
                            {ex.output}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 4: DEDICATED HANDS-ON CODING ASSIGNMENTS ── */}
          {(activeTab === 'assignments' || (activeTab === 'all' && lesson.programmingExercises && lesson.programmingExercises.length > 0)) && (
            <div className="space-y-4">
              {lesson.programmingExercises && lesson.programmingExercises.length > 0 ? (
                <>
                  {/* Assignment Progress Header */}
                  <div className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>Practice Coding Assignments ({lesson.programmingExercises.length} Challenges)</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Solve hands-on on your own first, then reveal the runnable Java solution!
                        </p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {lesson.programmingExercises.filter((_, idx) => solvedAssignments.includes(`${lesson.id}-ex-${idx}`)).length} / {lesson.programmingExercises.length} Solved
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/60">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            (lesson.programmingExercises.filter((_, idx) => solvedAssignments.includes(`${lesson.id}-ex-${idx}`)).length /
                              lesson.programmingExercises.length) *
                              100
                          )}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Assignment Problem Cards */}
                  <div className="space-y-4">
                    {lesson.programmingExercises.map((prog, pIdx) => {
                      const isRevealed = revealedExercises[pIdx];
                      const isHint = showExerciseHints[pIdx];
                      const assignmentKey = `${lesson.id}-ex-${pIdx}`;
                      const isSolved = solvedAssignments.includes(assignmentKey);
                      const difficultyTier = pIdx < 3 ? 'Easy' : pIdx < 7 ? 'Medium' : 'Hard';
                      const diffColor = difficultyTier === 'Easy'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : difficultyTier === 'Medium'
                          ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-400 border-rose-500/30';

                      return (
                        <div
                          key={pIdx}
                          className={`border rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5 transition ${
                            isSolved
                              ? 'bg-slate-900/90 border-emerald-500/40 shadow-emerald-950/20'
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                            <div className="flex items-center gap-2.5">
                              <span className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                                isSolved
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              }`}>
                                {pIdx + 1}
                              </span>
                              <div>
                                <h4 className="font-bold text-slate-100 text-sm sm:text-base">
                                  {prog.title.replace(/^\d+[\.\s\-]+/, '')}
                                </h4>
                                <span className="text-[10px] text-slate-500 font-mono">
                                  Challenge #{pIdx + 1} of {lesson.programmingExercises!.length}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-start sm:self-center">
                              <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${diffColor}`}>
                                {difficultyTier}
                              </span>
                              <CopyButton
                                text={`${prog.title}\n\nDifficulty: ${difficultyTier}\n\nProblem Statement:\n${prog.problemStatement}${prog.hint ? `\n\nHint: ${prog.hint}` : ''}`}
                                label="Copy Problem"
                              />
                              <button
                                onClick={() => handleToggleSolvedAssignment(assignmentKey)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                                  isSolved
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{isSolved ? 'Solved ✓' : 'Mark Solved'}</span>
                              </button>
                            </div>
                          </div>

                          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/60">
                            <strong className="text-amber-300/90 block mb-1 uppercase text-[11px] tracking-wide">
                              Problem Statement:
                            </strong>
                            <p className="whitespace-pre-wrap">{prog.problemStatement}</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {prog.hint && (
                              <button
                                onClick={() => setShowExerciseHints(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5"
                              >
                                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isHint ? 'Hide Hint' : '💡 Need a Hint?'}</span>
                              </button>
                            )}
                            <button
                              onClick={() => setRevealedExercises(prev => ({ ...prev, [pIdx]: !prev[pIdx] }))}
                              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm flex items-center gap-1.5"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isRevealed ? 'Hide Solution' : 'Reveal Complete Java Solution'}</span>
                            </button>
                          </div>

                          {isHint && prog.hint && (
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                              <strong className="text-amber-300">💡 Hint: </strong>{prog.hint}
                            </div>
                          )}

                          {isRevealed && (
                            <div className="space-y-3 pt-2">
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                                  <span>Optimal Java Implementation:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-500 font-mono">Java 8+ / 17 / 21</span>
                                    <CopyButton text={prog.solutionCode} label="Copy Java Code" />
                                  </div>
                                </div>
                                <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-3.5 overflow-x-auto shadow-inner">
                                  <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                                    <code>{prog.solutionCode}</code>
                                  </pre>
                                </div>
                              </div>

                              {prog.output && (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                      Sample Run / Expected Output:
                                    </div>
                                    <CopyButton text={prog.output} label="Copy Output" />
                                  </div>
                                  <div className="bg-black/80 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-300 whitespace-pre">
                                    {prog.output}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
                  <p className="text-sm">No programming assignments specified for this sub-lesson yet.</p>
                  <p className="text-xs text-slate-500 mt-1">Check out the Examples & Tracing tab for code walkthroughs.</p>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 5: INTERVIEW Q&A ── */}
          {(activeTab === 'interview_qa' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm uppercase tracking-wider">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Interview Questions & Model Answers ({lesson.interviewQuestions.length} Questions)</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Comprehensive technical responses and keyword highlights
                  </span>
                </div>

                <div className="space-y-4">
                  {lesson.interviewQuestions.map((q, idx) => {
                    const isRevealed = revealedQuestions[idx];
                    const qRating = questionRatings[idx];

                    return (
                      <div
                        key={idx}
                        className={`bg-slate-950/80 border transition rounded-xl p-4 space-y-3 ${
                          qRating === 'mastered'
                            ? 'border-emerald-500/40 bg-emerald-950/10'
                            : qRating === 'partial'
                            ? 'border-amber-500/40 bg-amber-950/10'
                            : qRating === 'revise'
                            ? 'border-rose-500/40 bg-rose-950/10'
                            : 'border-slate-800 hover:border-indigo-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm sm:text-base font-bold text-indigo-200">
                            <span className="text-indigo-400 mr-1.5 font-mono">Q{idx + 1}:</span>
                            {q.question}
                          </h4>
                          <div className="flex items-center gap-2 shrink-0">
                            {qRating && (
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                qRating === 'mastered'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : qRating === 'partial'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}>
                                {qRating}
                              </span>
                            )}
                            <CopyButton
                              text={`Question: ${q.question}\n\nModel Answer:\n${q.answer}${q.keyPhrases && q.keyPhrases.length > 0 ? `\n\nKey Concepts: ${q.keyPhrases.join(', ')}` : ''}${q.commonMistakeAnswer ? `\n\nCommon Mistake: ${q.commonMistakeAnswer}` : ''}${q.followUp ? `\n\nFollow-up Question: ${q.followUp}` : ''}${q.followUpAnswer ? `\nFollow-up Answer: ${q.followUpAnswer}` : ''}`}
                              label="Copy Q&A"
                            />
                            <button
                              onClick={() =>
                                setRevealedQuestions(prev => ({
                                  ...prev,
                                  [idx]: !prev[idx]
                                }))
                              }
                              className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1"
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              <span>{isRevealed ? 'Hide' : 'Reveal'}</span>
                            </button>
                          </div>
                        </div>

                        {!isRevealed ? (
                          <div className="p-3 rounded-lg bg-slate-900/60 border border-dashed border-slate-800 text-xs text-slate-400 flex items-center gap-2 italic">
                            <Volume2 className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span>
                              Think through your technical answer first, then click "Reveal Answer" to check accuracy!
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-1">
                            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                              <strong className="text-indigo-300 block mb-1">
                                🌟 Ideal Model Answer:
                              </strong>
                              {q.answer}
                            </div>

                            {q.keyPhrases && q.keyPhrases.length > 0 && (
                              <div className="space-y-1.5">
                                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                                  Keywords the interviewer wants to hear:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {q.keyPhrases.map((phrase, pIdx) => (
                                    <span
                                      key={pIdx}
                                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-300"
                                    >
                                      ✓ {phrase}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {q.commonMistakeAnswer && (
                              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/25 text-xs text-rose-300">
                                <strong>🛑 Common Fresher Mistake: </strong> {q.commonMistakeAnswer}
                              </div>
                            )}

                            {q.followUp && (
                              <div className="text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-2.5 space-y-1.5">
                                <div>
                                  <strong>Expected Follow-Up Question: </strong> {q.followUp}
                                </div>
                                {q.followUpAnswer && (
                                  <div className="pt-1.5 border-t border-cyan-500/20 text-slate-200 leading-relaxed">
                                    <strong className="text-cyan-400">💡 Confident Follow-Up Answer: </strong> {q.followUpAnswer}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Speaking Fluency Self-Rate on the Question */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                          <span className="text-[11px] text-slate-400 font-medium">Your Speaking Fluency:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setQuestionRatings(prev => ({ ...prev, [idx]: 'mastered' }))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                                qRating === 'mastered'
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>🟢 Mastered</span>
                            </button>
                            <button
                              onClick={() => setQuestionRatings(prev => ({ ...prev, [idx]: 'partial' }))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                                qRating === 'partial'
                                  ? 'bg-amber-600 text-white shadow-sm'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                              }`}
                            >
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              <span>🟡 Needs Polish</span>
                            </button>
                            <button
                              onClick={() => setQuestionRatings(prev => ({ ...prev, [idx]: 'revise' }))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                                qRating === 'revise'
                                  ? 'bg-rose-600 text-white shadow-sm'
                                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                              }`}
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                              <span>🔴 Revise</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Overall Sub-Topic Evaluation Rating */}
                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Overall Sub-Topic Mastery Rating:
                    </span>
                    {currentRating && (
                      <span className={`text-[11px] uppercase font-bold px-2 py-0.5 rounded ${
                        currentRating === 'mastered'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : currentRating === 'partial'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        Current: {currentRating}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleSelfRate('mastered')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition flex flex-col items-center gap-1 ${
                        currentRating === 'mastered'
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/50'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>🟢 Mastered</span>
                    </button>

                    <button
                      onClick={() => handleSelfRate('partial')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition flex flex-col items-center gap-1 ${
                        currentRating === 'partial'
                          ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>🟡 Needs Polish</span>
                    </button>

                    <button
                      onClick={() => handleSelfRate('revise')}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition flex flex-col items-center gap-1 ${
                        currentRating === 'revise'
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-rose-500/50'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                      <span>🔴 Revise Again</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: QUICK QUIZ ── */}
          {(activeTab === 'quiz' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Sub-Topic Mini Quiz</span>
                </div>

                <div className="space-y-4">
                  {lesson.miniQuiz.map((quiz, qIdx) => {
                    const chosen = quizAnswers[qIdx];
                    const revealed = quizRevealed[qIdx];
                    const isCorrect = chosen === quiz.correctIndex;

                    return (
                      <div key={qIdx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs sm:text-sm font-semibold text-slate-200">
                            {qIdx + 1}. {quiz.question}
                          </div>
                          <CopyButton
                            text={`${quiz.question}\n${quiz.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}${revealed ? `\n\nCorrect Answer: ${quiz.options[quiz.correctIndex]}\nExplanation: ${quiz.explanation}` : ''}`}
                            label="Copy Quiz"
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {quiz.options.map((opt, optIdx) => {
                            let optStyle = 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300';
                            if (revealed) {
                              if (optIdx === quiz.correctIndex) {
                                optStyle = 'border-emerald-500/80 bg-emerald-500/20 text-emerald-300 font-semibold';
                              } else if (chosen === optIdx) {
                                optStyle = 'border-rose-500/80 bg-rose-500/20 text-rose-300';
                              } else {
                                optStyle = 'border-slate-800/40 bg-slate-900/40 text-slate-500 opacity-60';
                              }
                            } else if (chosen === optIdx) {
                              optStyle = 'border-blue-500 bg-blue-500/20 text-blue-200';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                                disabled={revealed}
                                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${optStyle}`}
                              >
                                <span>{opt}</span>
                                {revealed && optIdx === quiz.correctIndex && (
                                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {revealed && (
                          <div
                            className={`text-xs p-3 rounded-xl border leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            }`}
                          >
                            <strong>{isCorrect ? 'Correct! ' : 'Not quite. '}</strong>
                            {quiz.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── DESKTOP FOOTER NAVIGATION ── */}
          <div className="pt-6 border-t border-slate-800/80 hidden md:flex items-center justify-between gap-4">
            {adjacent.prev ? (
              <button
                onClick={() => navigate(`/java/lesson/${adjacent.prev!.id}`)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Previous Lesson</div>
                  <div className="truncate max-w-[200px]">{formatLessonNum(adjacent.prev.lessonNumber)} · {adjacent.prev.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <button
                onClick={() => navigate(`/java/lesson/${adjacent.next!.id}`)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition shadow-lg shadow-blue-500/20"
              >
                <div className="text-right">
                  <div className="text-[10px] text-blue-200 uppercase font-mono">Next Lesson</div>
                  <div className="truncate max-w-[200px]">{formatLessonNum(adjacent.next.lessonNumber)} · {adjacent.next.title}</div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to={`/java/mcq/${lesson.moduleId}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition"
              >
                <span>Finished Section! Practice MCQs</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>

      {/* ── STICKY BOTTOM APP BAR (MOBILE FRIENDLY & THUMB ACCESSIBLE) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <button
          onClick={() => {
            if (adjacent.prev) navigate(`/java/lesson/${adjacent.prev.id}`);
          }}
          disabled={!adjacent.prev}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition min-h-[44px] ${
            adjacent.prev
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95'
              : 'bg-slate-900 text-slate-600 border border-slate-800/40 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/60 min-h-[44px]"
        >
          <span className="text-[10px] font-mono text-blue-400 font-bold">
            {currentLessonIndex + 1}/{allLessons.length}
          </span>
          <span className="text-[10px] text-slate-400 truncate max-w-[80px]">Topics</span>
        </button>

        {adjacent.next ? (
          <button
            onClick={() => navigate(`/java/lesson/${adjacent.next!.id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-500/20 active:scale-95 min-h-[44px]"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to={`/java/mcq/${lesson.moduleId}`}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition min-h-[44px]"
          >
            <span>MCQs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </nav>
    </div>
  );
}
