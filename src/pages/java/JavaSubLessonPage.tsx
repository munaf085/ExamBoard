import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, HelpCircle,
  AlertTriangle, Lightbulb, Code2, BookOpen, Terminal,
  Menu, X, Sparkles, ChevronRight, CheckCircle, RotateCcw
} from 'lucide-react';
import {
  DETAILED_LESSONS,
  getDetailedLesson,
  getAllDetailedLessons,
  getAdjacentLessons,
  DetailedLesson
} from '../../data/java/detailedLessons';
import { getJavaProgress, markLessonComplete } from '../../utils/javaStorage';

export default function JavaSubLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<number, boolean>>({});

  const lesson: DetailedLesson | undefined = lessonId ? getDetailedLesson(lessonId) : undefined;
  const adjacent = lesson ? getAdjacentLessons(lesson.id) : { prev: undefined, next: undefined };
  const allLessons = getAllDetailedLessons();

  useEffect(() => {
    const progress = getJavaProgress();
    setCompletedLessons(progress.lessonsCompleted || []);
    // Reset quiz state when switching lesson
    setQuizAnswers({});
    setQuizRevealed({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonId]);

  const handleToggleComplete = () => {
    if (!lesson) return;
    markLessonComplete(lesson.id);
    const progress = getJavaProgress();
    setCompletedLessons([...progress.lessonsCompleted]);
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
      <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
          <HelpCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Lesson Not Found</h2>
          <p className="text-sm text-slate-400 mb-6">
            The sub-topic "{lessonId}" could not be located in the curriculum.
          </p>
          <div className="space-y-2">
            <Link
              to="/java/lesson/what-is-java"
              className="block w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg text-sm transition"
            >
              Start at Lesson 1.1: What is Java
            </Link>
            <Link
              to="/java/syllabus"
              className="block w-full py-2.5 px-4 bg-slate-700 hover:bg-slate-600 font-semibold rounded-lg text-sm transition"
            >
              View Full Syllabus
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = completedLessons.includes(lesson.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition lg:hidden"
            title="Toggle Curriculum Menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            to="/java/syllabus"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          <span className="text-slate-600">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {lesson.lessonNumber}
            </span>
            <span className="text-sm font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {lesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Learned ✓</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4 text-slate-400" />
                <span>Mark Learned</span>
              </>
            )}
          </button>

          <Link
            to={`/java/mcq/${lesson.moduleId}`}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition"
          >
            <span>Practice MCQs</span>
          </Link>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Navigation Drawer / Sidebar */}
        <aside
          className={`fixed lg:sticky top-[57px] bottom-0 left-0 w-80 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto z-30 transition-transform duration-200 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
          style={{ height: 'calc(100vh - 57px)' }}
        >
          <div className="mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Java Basics Sub-Topics
            </h3>
            <span className="text-xs text-blue-400 font-semibold">
              {allLessons.length} Lessons
            </span>
          </div>

          <div className="space-y-6">
            {Object.entries(modulesGrouped).map(([modId, modData]) => (
              <div key={modId} className="space-y-1.5">
                <div className="text-xs font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                  {modData.title}
                </div>
                {modData.lessons.map(sub => {
                  const active = sub.id === lesson.id;
                  const done = completedLessons.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSidebarOpen(false);
                        navigate(`/java/lesson/${sub.id}`);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition ${
                        active
                          ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-blue-400' : 'bg-slate-600'}`} />
                        )}
                        <span className="truncate">{sub.lessonNumber}: {sub.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                        {sub.estimatedMinutes}m
                      </span>
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
            className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          />
        )}

        {/* Lesson Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto space-y-8 w-full">
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {lesson.moduleTitle}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {lesson.lessonNumber}
              </span>
              <span className="text-xs text-slate-400">
                ⏱️ Estimated read: {lesson.estimatedMinutes} mins
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {lesson.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {lesson.subtitle}
            </p>
          </div>

          {/* 1. Beginner Real-World Analogy */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 text-amber-400 font-bold text-sm sm:text-base">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Real-World Intuition (Beginner Analogy)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base italic">
              "{lesson.beginnerAnalogy}"
            </p>
          </div>

          {/* 2. Core Concepts / Step-by-Step Explanation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm sm:text-base">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span>Core Understanding</span>
            </div>
            <ul className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {lesson.coreExplanation.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Visual Architecture / ASCII Diagram */}
          {lesson.diagram && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm sm:text-base">
                <Terminal className="w-5 h-5" />
                <span>Visual Mental Model</span>
              </div>
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-indigo-300 leading-relaxed">
                  {lesson.diagram}
                </pre>
              </div>
            </div>
          )}

          {/* 4. Code Example & Line-by-Line Tracing */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm sm:text-base">
                <Code2 className="w-5 h-5" />
                <span>Code In Action: {lesson.codeSnippet.title}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Java</span>
            </div>

            {/* Code Box */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed">
                <code>{lesson.codeSnippet.code}</code>
              </pre>
            </div>

            {/* Line-by-Line Explanation Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Line-by-Line Explanation:
              </h4>
              <div className="space-y-2">
                {lesson.codeSnippet.lineByLineExplanation.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
                  >
                    <code className="font-mono text-emerald-400 font-semibold shrink-0">
                      {item.line}
                    </code>
                    <span className="text-slate-300">{item.explanation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Console Output */}
            {lesson.codeSnippet.output && (
              <div className="space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Console Output:
                </div>
                <div className="bg-black/70 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 whitespace-pre">
                  {lesson.codeSnippet.output}
                </div>
              </div>
            )}
          </div>

          {/* 5. Common Beginner Mistakes */}
          {lesson.beginnerMistakes && lesson.beginnerMistakes.length > 0 && (
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Common Beginner Traps & How to Fix Them</span>
              </div>
              <div className="space-y-3">
                {lesson.beginnerMistakes.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-rose-500/20 rounded-xl p-4 space-y-2">
                    <div className="text-sm font-bold text-rose-300">
                      ❌ Trap: {item.mistake}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      <strong className="text-slate-300">Why it happens: </strong>
                      {item.whyItHappens}
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-400 font-medium">
                      <strong className="text-emerald-300">✓ The Fix: </strong>
                      {item.howToFix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Interview Questions & Follow-ups */}
          {lesson.interviewQuestions && lesson.interviewQuestions.length > 0 && (
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm sm:text-base">
                <Sparkles className="w-5 h-5" />
                <span>Interview Q&A (What Freshers Are Asked)</span>
              </div>
              <div className="space-y-3">
                {lesson.interviewQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-purple-500/20 rounded-xl p-4 space-y-2">
                    <div className="text-sm sm:text-base font-bold text-purple-200">
                      Q: {q.question}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-purple-300">Model Answer: </strong>
                      {q.answer}
                    </div>
                    {q.followUp && (
                      <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-md p-2 mt-2">
                        <strong>Interviewer Follow-up: </strong> {q.followUp}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Interactive Mini-Quiz */}
          {lesson.miniQuiz && lesson.miniQuiz.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
                <HelpCircle className="w-5 h-5" />
                <span>Quick Check: Test What You Just Learned</span>
              </div>

              <div className="space-y-6">
                {lesson.miniQuiz.map((quiz, qIdx) => {
                  const chosen = quizAnswers[qIdx];
                  const revealed = quizRevealed[qIdx];
                  const isCorrect = chosen === quiz.correctIndex;

                  return (
                    <div key={qIdx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                      <div className="text-sm font-semibold text-slate-200">
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
                              optStyle = 'border-slate-800/40 bg-slate-900/40 text-slate-500';
                            }
                          } else if (chosen === optIdx) {
                            optStyle = 'border-blue-500 bg-blue-500/20 text-blue-200';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                              disabled={revealed}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${optStyle}`}
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
                          className={`text-xs p-3 rounded-lg border leading-relaxed ${
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
          )}

          {/* Footer Navigation Buttons */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {adjacent.prev ? (
              <button
                onClick={() => navigate(`/java/lesson/${adjacent.prev!.id}`)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition border border-slate-700"
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition shadow-lg shadow-blue-500/20"
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition"
              >
                <span>Finished Section! Practice MCQs</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
