import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  markLessonComplete,
  getSelfEvaluations,
  saveSelfEvaluation,
  SelfEvalRating
} from '../../utils/javaStorage';

type ActiveTab = 'takeaways' | 'cheatsheet' | 'practice' | 'interview' | 'quiz' | 'all';

export default function JavaSubLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [selfEvals, setSelfEvals] = useState<Record<string, { rating: SelfEvalRating }>>({});
  const [activeTab, setActiveTab] = useState<ActiveTab>('takeaways');

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

  // Practice Problems state (multi-problem support)
  const [practiceSelected, setPracticeSelected] = useState<Record<number, number>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Interviewer Question state: which questions have their answers revealed
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  const lesson: DetailedLesson | undefined = lessonId ? getDetailedLesson(lessonId) : undefined;
  const adjacent = lesson ? getAdjacentLessons(lesson.id) : { prev: undefined, next: undefined };
  const allLessons = getAllDetailedLessons();

  const currentLessonIndex = allLessons.findIndex(l => l.id === lesson?.id);

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

    // Reset interactive states when switching lesson
    setQuizAnswers({});
    setQuizRevealed({});
    setPracticeSelected({});
    setPracticeRevealed({});
    setShowHints({});
    setRevealedQuestions({});
    setActiveTab('takeaways');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  const handleToggleComplete = () => {
    if (!lesson) return;
    markLessonComplete(lesson.id);
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

  // Group lessons by module
  const modulesGrouped = allLessons.reduce<Record<string, { title: string; lessons: DetailedLesson[] }>>((acc, l) => {
    if (!acc[l.moduleId]) {
      acc[l.moduleId] = { title: l.moduleTitle, lessons: [] };
    }
    acc[l.moduleId].lessons.push(l);
    return acc;
  }, {});

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
              {lesson.lessonNumber}
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
          className={`fixed lg:sticky top-[53px] bottom-0 left-0 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto z-50 transition-transform duration-200 shadow-2xl lg:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{ height: 'calc(100vh - 53px)' }}
        >
          <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Java Basics Sub-Topics
              </h3>
              <p className="text-[11px] text-slate-500">
                {currentLessonIndex + 1} of {allLessons.length} Lessons
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            {Object.entries(modulesGrouped).map(([modId, modData]) => (
              <div key={modId} className="space-y-1">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  {modData.title}
                </div>
                {modData.lessons.map(sub => {
                  const active = sub.id === lesson.id;
                  const done = completedLessons.includes(sub.id);
                  const evalRating = selfEvals[sub.id]?.rating;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSidebarOpen(false);
                        navigate(`/java/lesson/${sub.id}`);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition min-h-[42px] ${
                        active
                          ? 'bg-blue-600/25 text-blue-200 font-semibold border border-blue-500/50 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <div className={`w-2 h-2 rounded-full shrink-0 ${active ? 'bg-blue-400' : 'bg-slate-600'}`} />
                        )}
                        <span className="truncate">{sub.lessonNumber}: {sub.title}</span>
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
            ))}
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
          {/* Header Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {lesson.moduleTitle}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                ~{lesson.estimatedMinutes} mins
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">
                Lesson {currentLessonIndex + 1} of {allLessons.length}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-1.5">
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {lesson.subtitle}
            </p>

            {/* Quick Intuition Analogy */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed italic">
                "{lesson.beginnerAnalogy}"
              </p>
            </div>
          </div>

          {/* ── FAST TABS FOR INTERVIEW PREP (MOBILE OPTIMIZED) ── */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 scrollbar-none">
            <button
              onClick={() => setActiveTab('takeaways')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'takeaways'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interview Summary</span>
            </button>

            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'cheatsheet'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>📋 Cheat Sheet</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Examples & Practice ({practiceProblemsList.length + 1})</span>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'interview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Self-Evaluate ({lesson.interviewQuestions.length} Qs)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mini Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 text-slate-500 hover:text-slate-300 border border-slate-800'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>All in One</span>
            </button>
          </div>

          {/* ── TAB 1: INTERVIEW SUMMARY / TAKEAWAYS (NO TEXTBOOK FILLER) ── */}
          {(activeTab === 'takeaways' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>3 Golden Rules to Remember in an Interview</span>
                </div>

                <div className="space-y-2.5">
                  {(lesson.interviewTakeaways || lesson.coreExplanation.slice(0, 3)).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center shrink-0 text-xs">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Mental Model */}
              {lesson.diagram && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                    <Terminal className="w-4 h-4" />
                    <span>Visual Mental Model</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
                    <pre className="font-mono text-xs sm:text-sm text-indigo-300 leading-relaxed">
                      {lesson.diagram}
                    </pre>
                  </div>
                </div>
              )}

              {/* Common Interview Traps */}
              {lesson.beginnerMistakes && lesson.beginnerMistakes.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Interview Traps & Common Gotchas</span>
                  </div>
                  <div className="space-y-2.5">
                    {lesson.beginnerMistakes.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/90 border border-rose-500/20 rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm">
                        <div className="font-bold text-rose-300">
                          🛑 Trap: {item.mistake}
                        </div>
                        <div className="text-slate-400">
                          <strong className="text-slate-300">Why it happens: </strong> {item.whyItHappens}
                        </div>
                        <div className="text-emerald-400 font-medium">
                          <strong className="text-emerald-300">✓ The Fix: </strong> {item.howToFix}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Standard Syntax Template:
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

          {/* ── TAB 2: PLENTY OF EXAMPLES & PRACTICE PROBLEMS ── */}
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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm">
                              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                                {pIdx + 1}
                              </span>
                              <span>{prob.title}</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Practice #{pIdx + 1}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {prob.problemStatement}
                          </p>

                          {prob.code && (
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 overflow-x-auto">
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
                              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                                Exact Solution: {prob.solution}
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
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Java 21</span>
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
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Console Output:
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
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Scenario</span>
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

          {/* ── TAB 3: INTERVIEWER SIMULATION & SELF-EVALUATION ── */}
          {(activeTab === 'interview' || activeTab === 'all') && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-950/20 via-slate-900 to-slate-900 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm uppercase tracking-wider">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>Interviewer Simulator ({lesson.interviewQuestions.length} Questions)</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    Test how well you would speak in an interview
                  </span>
                </div>

                <div className="space-y-4">
                  {lesson.interviewQuestions.map((q, idx) => {
                    const isRevealed = revealedQuestions[idx];

                    return (
                      <div
                        key={idx}
                        className="bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 rounded-xl p-4 space-y-3 transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm sm:text-base font-bold text-purple-200">
                            Q{idx + 1}: {q.question}
                          </h4>
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
                            <span>{isRevealed ? 'Hide' : 'Reveal Answer'}</span>
                          </button>
                        </div>

                        {!isRevealed ? (
                          <div className="p-3 rounded-lg bg-slate-900/60 border border-dashed border-slate-800 text-xs text-slate-400 flex items-center gap-2 italic">
                            <Volume2 className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>
                              Practice answering out loud first, then click "Reveal Answer" to grade yourself!
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-1">
                            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                              <strong className="text-purple-300 block mb-1">
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
                                <strong>Common Fresher Mistake: </strong> {q.commonMistakeAnswer}
                              </div>
                            )}

                            {q.followUp && (
                              <div className="text-xs text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 rounded-lg p-2.5">
                                <strong>Expected Follow-Up Question: </strong> {q.followUp}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Self-Rating Score Buttons */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    How confident are you with this sub-topic?
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
                        <div className="text-xs sm:text-sm font-semibold text-slate-200">
                          {qIdx + 1}. {quiz.question}
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
                  <div className="truncate max-w-[200px]">{adjacent.prev.lessonNumber}: {adjacent.prev.title}</div>
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
                  <div className="truncate max-w-[200px]">{adjacent.next.lessonNumber}: {adjacent.next.title}</div>
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
