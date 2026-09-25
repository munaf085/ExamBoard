import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen, Code, AlertTriangle, Target, RefreshCw,
  CheckCircle, ChevronDown, ChevronRight, ArrowLeft,
  Lightbulb, Star, Coffee, List, Shield, Layers, GitBranch,
  Package, Zap, Database, Leaf
} from 'lucide-react';
import { JAVA_MODULES, JAVA_SECTIONS } from '../../data/java/curriculum';
import { ALL_JAVA_LESSONS } from '../../data/java/lessons/index';
import { getJavaProgress, markLessonComplete } from '../../utils/javaStorage';

const SECTION_ICONS: Record<string, React.ElementType> = {
  fundamentals: Coffee,
  oop: Layers,
  dsa: GitBranch,
  collections: Package,
  advanced: Zap,
  database: Database,
  spring: Leaf,
  testing: Shield,
};

// ─────────────────────────────────────────────────────────────
// COLLAPSIBLE SECTION COMPONENT
// ─────────────────────────────────────────────────────────────
function Section({ title, icon: Icon, children, defaultOpen = false, accent = 'blue', forceOpen }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean; accent?: string; forceOpen?: boolean | null;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (forceOpen !== null && forceOpen !== undefined) {
      setOpen(forceOpen);
    }
  }, [forceOpen]);

  const colors: Record<string, string> = {
    blue: 'text-blue-400 border-blue-500/30',
    green: 'text-green-400 border-green-500/30',
    yellow: 'text-yellow-400 border-yellow-500/30',
    purple: 'text-purple-400 border-purple-500/30',
    red: 'text-red-400 border-red-500/30',
    cyan: 'text-cyan-400 border-cyan-500/30',
  };
  const color = colors[accent] || colors.blue;

  return (
    <div className={`rounded-xl border ${color.split(' ')[1]} bg-slate-800/50 mb-4 overflow-hidden shadow-sm`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} />
          <span className="font-semibold text-slate-100 text-base">{title}</span>
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-slate-400" />
          : <ChevronRight className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-slate-700/50 pt-4">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function JavaModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState(moduleId || 'java-fundamentals');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    fundamentals: true,
    oop: true,
    dsa: false,
    collections: false,
    advanced: false,
    database: false,
    spring: false,
    testing: false,
  });
  const [forceExpandAll, setForceExpandAll] = useState<boolean | null>(null);

  useEffect(() => {
    const p = getJavaProgress();
    setCompleted(p.lessonsCompleted);
  }, []);

  useEffect(() => {
    if (moduleId) {
      setActiveModule(moduleId);
      // Automatically expand section containing active module
      const targetMod = JAVA_MODULES.find(m => m.id === moduleId);
      if (targetMod) {
        setExpandedSections(prev => ({ ...prev, [targetMod.section]: true }));
      }
    }
  }, [moduleId]);

  const lesson = ALL_JAVA_LESSONS[activeModule];
  const moduleInfo = JAVA_MODULES.find(m => m.id === activeModule);
  const isDone = completed.includes(activeModule);

  const toggleSection = (secId: string) => {
    setExpandedSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const handleMarkDone = () => {
    markLessonComplete(activeModule);
    setCompleted(prev => [...prev, activeModule]);
  };

  const handleTopicClick = (id: string) => {
    setActiveModule(id);
    navigate(`/java/module/${id}`, { replace: true });
  };

  // Find next module in syllabus
  const currentIndex = JAVA_MODULES.findIndex(m => m.id === activeModule);
  const nextModule = currentIndex >= 0 && currentIndex < JAVA_MODULES.length - 1 ? JAVA_MODULES[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-80 min-h-screen bg-slate-800 border-r border-slate-700 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-800/95 backdrop-blur z-10">
          <Link to="/java" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Java Dashboard
          </Link>
          <span className="text-xs font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
            {completed.length}/{JAVA_MODULES.length} Done
          </span>
        </div>

        {/* Sidebar Topics Menu */}
        <div className="p-3 space-y-2">
          {JAVA_SECTIONS.map(section => {
            const isSecOpen = expandedSections[section.id];
            const sectionModules = JAVA_MODULES.filter(m => m.section === section.id);
            const hasActiveModule = sectionModules.some(m => m.id === activeModule);
            const SecIcon = SECTION_ICONS[section.id] || BookOpen;

            return (
              <div key={section.id} className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/40">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    hasActiveModule ? 'text-emerald-300 bg-slate-750' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <SecIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{section.label}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({sectionModules.length})</span>
                  </span>
                  {isSecOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {isSecOpen && (
                  <div className="p-1 space-y-0.5 bg-slate-900/70 border-t border-slate-800">
                    {sectionModules.map(m => {
                      const done = completed.includes(m.id);
                      const active = m.id === activeModule;
                      return (
                        <button
                          key={m.id}
                          onClick={() => handleTopicClick(m.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between gap-2 text-xs ${
                            active
                              ? 'bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 font-semibold'
                              : 'hover:bg-slate-700/70 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{m.title}</span>
                          {done && <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Tools */}
          <div className="mt-4 pt-4 border-t border-slate-700/80 space-y-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">⚡ Quick Links</p>
            <Link to={`/java/mcq/${activeModule}`}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <Star className="w-3.5 h-3.5 text-yellow-400" /> Practice MCQs for This Topic
            </Link>
            <Link to="/java/mock-interview"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <Coffee className="w-3.5 h-3.5 text-orange-400" /> Technical Mock Interview
            </Link>
            <Link to="/java/revision"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Revision Cheatsheets
            </Link>
            <Link to="/java/flashcards"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <List className="w-3.5 h-3.5 text-purple-400" /> Core Java Flashcards
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Java Full Syllabus Module</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                {moduleInfo?.title || activeModule}
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  moduleInfo?.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                  moduleInfo?.difficulty === 'Hard' ? 'bg-red-900/50 text-red-400' :
                  'bg-yellow-900/50 text-yellow-400'
                }`}>{moduleInfo?.difficulty || 'Beginner'}</span>
                <span>⏱ {moduleInfo?.estimatedMinutes || 45} mins</span>
                {isDone && <span className="text-green-400 flex items-center gap-1 text-xs font-semibold bg-green-900/30 px-2 py-0.5 rounded"><CheckCircle className="w-3.5 h-3.5" /> Learned</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setForceExpandAll(prev => prev === true ? false : true)}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Expand or collapse all cards"
              >
                {forceExpandAll === true ? 'Collapse All' : 'Expand All'}
              </button>
              <button
                onClick={handleMarkDone}
                disabled={isDone}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isDone
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                {isDone ? '✓ Completed' : 'Mark as Learned'}
              </button>
            </div>
          </div>

          {lesson ? (
            <>
              {/* Intro */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 mb-6">
                <p className="text-slate-300 leading-relaxed text-sm">{lesson.intro}</p>
              </div>

              {/* Key Concepts */}
              <Section title="📘 Key Concepts & Definitions" icon={BookOpen} defaultOpen={true} accent="blue" forceOpen={forceExpandAll}>
                <div className="grid md:grid-cols-2 gap-3">
                  {lesson.keyConcepts.map((c, i) => (
                    <div key={i} className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
                      <h3 className="font-bold text-blue-300 text-sm mb-1">{c.term}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">{c.definition}</p>
                      {c.example && (
                        <code className="text-xs text-emerald-400 bg-slate-950 px-2 py-1 rounded mt-2 block border border-slate-800 font-mono">{c.example}</code>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Code Examples */}
              <Section title="💻 Code Examples & Tracing" icon={Code} defaultOpen={true} accent="green" forceOpen={forceExpandAll}>
                <div className="space-y-5">
                  {lesson.codeExamples.map((ex, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-slate-700">
                      <div className="bg-slate-750 px-4 py-2 text-xs font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-700">
                        <Code className="w-3.5 h-3.5 text-emerald-400" /> {ex.title}
                      </div>
                      <pre className="bg-slate-950 p-4 text-xs text-green-300 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
                        <code>{ex.code}</code>
                      </pre>
                      {ex.output && (
                        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Output:</span>
                          <pre className="text-emerald-400 text-xs mt-1 whitespace-pre-wrap font-mono">{ex.output}</pre>
                        </div>
                      )}
                      {ex.note && (
                        <div className="bg-yellow-900/20 border-t border-yellow-500/20 px-4 py-2">
                          <p className="text-yellow-300 text-xs">💡 {ex.note}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Common Mistakes */}
              <Section title="⚠️ Common Traps & Mistakes" icon={AlertTriangle} accent="red" forceOpen={forceExpandAll}>
                <ul className="space-y-2.5">
                  {lesson.commonMistakes.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30">
                      <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Interview Tips */}
              <Section title="🎯 Freshers Interview Tips" icon={Target} accent="purple" forceOpen={forceExpandAll}>
                <ul className="space-y-2.5">
                  {lesson.interviewTips.map((tip, i) => (
                    <li key={i} className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
                      <span className="text-purple-300 font-bold">💬 Pro Tip: </span>{tip}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Interview Q&A */}
              <Section title="❓ Common Interview Questions & Answers" icon={Lightbulb} accent="yellow" forceOpen={forceExpandAll}>
                <div className="space-y-3">
                  {lesson.interviewQuestions.map((qa, i) => (
                    <div key={i} className="bg-slate-900/70 rounded-lg border border-slate-700/60 overflow-hidden">
                      <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
                        <p className="font-semibold text-yellow-300 text-xs">Q: {qa.q}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-slate-300 text-xs leading-relaxed">A: {qa.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Revision Points */}
              <Section title="📌 Quick Revision Points" icon={RefreshCw} accent="cyan" forceOpen={forceExpandAll}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {lesson.revisionPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs bg-slate-900/40 p-2 rounded border border-slate-800">
                      <span className="text-cyan-400 flex-shrink-0 font-bold">•</span>
                      <span className="text-slate-300">{pt}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          ) : (
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 font-semibold mb-2">{moduleInfo?.title || activeModule}</p>
              <p className="text-slate-400 text-sm mb-4">Detailed lesson content is loading. Please select any module from the left menu.</p>
              <div className="flex justify-center gap-3">
                <Link to={`/java/mcq/${activeModule}`} className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg font-medium">
                  Practice MCQs
                </Link>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-800 items-center justify-between">
            <Link
              to={`/java/mcq/${activeModule}`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Star className="w-4 h-4" /> Practice MCQs for This Topic
            </Link>

            {nextModule && (
              <button
                onClick={() => handleTopicClick(nextModule.id)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <span>Next: {nextModule.title}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
