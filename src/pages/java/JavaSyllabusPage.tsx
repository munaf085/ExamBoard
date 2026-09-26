import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, CheckCircle, Clock, Search, Printer,
  Coffee, Layers, GitBranch, Package, Zap, Database, Leaf, Shield,
  ChevronDown, ChevronUp, Star, ArrowUp, CheckCircle2, Circle, Sparkles
} from 'lucide-react';
import { JAVA_MODULES, JAVA_SECTIONS } from '../../data/java/curriculum';
import { getLessonsForModule } from '../../data/java/detailedLessons';
import { getJavaProgress, markLessonComplete } from '../../utils/javaStorage';

const SECTION_ICONS: Record<string, React.ElementType> = {
  fundamentals: Coffee,
  patterns: Sparkles,
  oop: Layers,
  dsa: GitBranch,
  collections: Package,
  advanced: Zap,
  database: Database,
  spring: Leaf,
  testing: Shield,
};

export default function JavaSyllabusPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [completed, setCompleted] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    JAVA_SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  useEffect(() => {
    const p = getJavaProgress();
    setCompleted(p.lessonsCompleted);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When searching, auto-expand matching sections
  useEffect(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const updated: Record<string, boolean> = {};
      JAVA_SECTIONS.forEach(sec => {
        const hasMatch = JAVA_MODULES.filter(m => m.section === sec.id).some(m =>
          m.title.toLowerCase().includes(term) ||
          m.description.toLowerCase().includes(term) ||
          m.topics.some(t => t.toLowerCase().includes(term))
        );
        if (hasMatch) updated[sec.id] = true;
      });
      setExpandedSections(prev => ({ ...prev, ...updated }));
    }
  }, [searchTerm]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAll = (expand: boolean) => {
    setExpandedSections(
      JAVA_SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: expand }), {})
    );
  };

  const handleToggleComplete = (moduleId: string) => {
    if (completed.includes(moduleId)) {
      setCompleted(prev => prev.filter(id => id !== moduleId));
      return;
    }
    markLessonComplete(moduleId);
    setCompleted(prev => [...prev, moduleId]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter modules
  const filteredModules = JAVA_MODULES.filter(m => {
    const matchesSearch = !searchTerm.trim() || (
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchesSection = selectedSection === 'all' || m.section === selectedSection;

    const isDone = completed.includes(m.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'done' && isDone) ||
      (statusFilter === 'todo' && !isDone);

    return matchesSearch && matchesSection && matchesStatus;
  });

  const sectionsToDisplay = selectedSection === 'all'
    ? JAVA_SECTIONS
    : JAVA_SECTIONS.filter(s => s.id === selectedSection);

  const completedCount = completed.length;
  const totalModulesCount = JAVA_MODULES.length;
  const progressPercent = Math.round((completedCount / totalModulesCount) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      
      {/* ── 1. MINIMALIST TOP NAV BAR (HACKERRANK STYLE) ── */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/java"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Java Track Syllabus</span>
                <span className="text-[11px] font-normal text-slate-400 hidden xs:inline">
                  ({totalModulesCount} Modules · 8 Sections)
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Compact Progress Bar */}
            <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Progress:</span>
              <span className="font-mono font-bold text-emerald-400">{completedCount}/{totalModulesCount}</span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden xs:block">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">({progressPercent}%)</span>
            </div>

            <button
              onClick={() => window.print()}
              className="hidden md:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>

            <Link
              to="/java/module/java-fundamentals"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition active:scale-95"
            >
              Start Learning →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-4">

        {/* ── 2. COMPACT SEARCH & FILTER CONTROLS ── */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-2.5 sm:p-3 rounded-2xl shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search topics (e.g. HashMap, PECS, Spring Boot, Binary Search)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-14 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Status & View Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Status Filter */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition ${statusFilter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('todo')}
                className={`px-2.5 py-1 rounded-lg transition ${statusFilter === 'todo' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                To-Do
              </button>
              <button
                onClick={() => setStatusFilter('done')}
                className={`px-2.5 py-1 rounded-lg transition ${statusFilter === 'done' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Done
              </button>
            </div>

            {/* Expand / Collapse All */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => toggleAll(true)}
                className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                Expand
              </button>
              <button
                onClick={() => toggleAll(false)}
                className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* ── 3. CLEAN SECTION PILLS (HACKERRANK STYLE TRACKS) ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
              selectedSection === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>All Sections</span>
            <span className="text-[10px] font-mono opacity-80">({totalModulesCount})</span>
          </button>

          {JAVA_SECTIONS.map((sec, idx) => {
            const secMods = JAVA_MODULES.filter(m => m.section === sec.id);
            const isSelected = selectedSection === sec.id;
            const SecIcon = SECTION_ICONS[sec.id] || BookOpen;

            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <SecIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{idx + 1}. {sec.label}</span>
                <span className="text-[10px] font-mono opacity-75">({secMods.length})</span>
              </button>
            );
          })}
        </div>

        {/* Search Results Summary (If Active) */}
        {searchTerm.trim() && (
          <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl">
            <span>
              Showing <strong className="text-emerald-400 font-bold">{filteredModules.length}</strong> modules matching <strong className="text-white">"{searchTerm}"</strong>
            </span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-emerald-400 hover:underline"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* ── 4. CURRICULUM SECTIONS & MODULE ROWS ── */}
        <div className="space-y-4 pt-1">
          {sectionsToDisplay.map((section, secIdx) => {
            const sectionModules = filteredModules.filter(m => m.section === section.id);
            if (sectionModules.length === 0) return null;

            const isExpanded = expandedSections[section.id];
            const SecIcon = SECTION_ICONS[section.id] || BookOpen;
            const sectionCompletedCount = sectionModules.filter(m => completed.includes(m.id)).length;

            return (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 sm:px-5 py-3 flex items-center justify-between bg-slate-900 hover:bg-slate-850 transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                      <SecIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-blue-400 font-bold tracking-wider">SECTION {secIdx + 1}</span>
                        <span className="text-slate-600 text-xs">•</span>
                        <span className="text-[11px] text-slate-400">{sectionModules.length} Modules</span>
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-white">
                        {section.label}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {sectionCompletedCount}/{sectionModules.length} Done
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Modules List inside Section */}
                {isExpanded && (
                  <div className="p-2 sm:p-3 space-y-2 border-t border-slate-800/80 bg-slate-950/40">
                    {sectionModules.map((mod) => {
                      const isModDone = completed.includes(mod.id);
                      const subLessons = getLessonsForModule(mod.id);

                      return (
                        <div
                          key={mod.id}
                          className={`p-3 sm:p-4 rounded-xl border transition ${
                            isModDone
                              ? 'bg-slate-900/70 border-emerald-500/30'
                              : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">

                            {/* Left: Checkbox + Title + Meta */}
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => handleToggleComplete(mod.id)}
                                  className="text-slate-400 hover:text-emerald-400 transition"
                                  title={isModDone ? 'Mark as incomplete' : 'Mark as completed'}
                                >
                                  {isModDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                                  )}
                                </button>

                                <h3 className="text-sm sm:text-base font-bold text-white truncate">
                                  {mod.title}
                                </h3>

                                <span
                                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                    mod.difficulty === 'Easy'
                                      ? 'bg-green-500/20 text-green-400'
                                      : mod.difficulty === 'Medium'
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-red-500/20 text-red-400'
                                  }`}
                                >
                                  {mod.difficulty}
                                </span>

                                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  {mod.estimatedMinutes}m
                                </span>
                              </div>

                              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                                {mod.description}
                              </p>

                              {/* Clean Sub-Lessons Pills */}
                              {subLessons.length > 0 ? (
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mr-0.5">
                                    Sub-Lessons:
                                  </span>
                                  {subLessons.map(sub => {
                                    const isSubDone = completed.includes(sub.id);
                                    const cleanNum = sub.lessonNumber.replace(/^Lesson\s+/i, '');
                                    return (
                                      <Link
                                        key={sub.id}
                                        to={`/java/lesson/${sub.id}`}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border transition ${
                                          isSubDone
                                            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-blue-500/60 hover:text-white'
                                        }`}
                                      >
                                        <span className="font-mono text-blue-400 font-bold text-[10px]">{cleanNum}</span>
                                        <span className="truncate max-w-[140px] sm:max-w-[200px]">{sub.title}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {mod.topics.slice(0, 5).map((topic, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="bg-slate-950 text-slate-400 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1 lg:pt-0">
                              {subLessons.length > 0 ? (
                                <Link
                                  to={`/java/lesson/${subLessons[0].id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Learn</span>
                                </Link>
                              ) : (
                                <Link
                                  to={`/java/module/${mod.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>Learn</span>
                                </Link>
                              )}

                              <Link
                                to={`/java/mcq/${mod.id}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                              >
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span>MCQs</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white shadow-xl transition border border-slate-700 active:scale-95 z-40"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
