import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, CheckCircle, Clock, Search, Printer,
  Coffee, Layers, GitBranch, Package, Zap, Database, Leaf, Shield,
  ChevronDown, ChevronUp, Star, ExternalLink, Award
} from 'lucide-react';
import { JAVA_MODULES, JAVA_SECTIONS } from '../../data/java/curriculum';
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

export default function JavaSyllabusPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [completed, setCompleted] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    JAVA_SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: true }), {})
  );

  useEffect(() => {
    const p = getJavaProgress();
    setCompleted(p.lessonsCompleted);
  }, []);

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
      // already completed
      return;
    }
    markLessonComplete(moduleId);
    setCompleted(prev => [...prev, moduleId]);
  };

  // Filter modules based on search term
  const filteredModules = JAVA_MODULES.filter(m => {
    const term = searchTerm.toLowerCase();
    return (
      m.title.toLowerCase().includes(term) ||
      m.description.toLowerCase().includes(term) ||
      m.topics.some(t => t.toLowerCase().includes(term))
    );
  });

  const totalTime = JAVA_MODULES.reduce((sum, m) => sum + m.estimatedMinutes, 0);
  const totalHours = Math.round(totalTime / 60);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/java"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Java Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700 transition-colors shadow-sm"
              title="Print syllabus or Save as PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" /> Print / Save PDF
            </button>
            <Link
              to="/java/module/java-fundamentals"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md"
            >
              <BookOpen className="w-4 h-4" /> Start Learning
            </Link>
          </div>
        </div>

        {/* Header Hero Banner */}
        <header className="bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-800/60 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Coffee className="w-3.5 h-3.5" /> Full Fresher to Architect Syllabus
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                Complete Java Interview Syllabus
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
                A single-page, zero-gap study roadmap covering Core Java, Object-Oriented Programming, Data Structures & Algorithms, Collections, Advanced Concurrency, SQL/JDBC, Spring Boot Microservices, and Testing.
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-xl flex flex-col items-center justify-center min-w-[200px] shadow-lg">
              <span className="text-xs uppercase font-bold text-slate-400 mb-1">Your Progress</span>
              <div className="text-3xl font-extrabold text-emerald-400 mb-1">
                {Math.round((completed.length / JAVA_MODULES.length) * 100)}%
              </div>
              <span className="text-xs text-slate-400">
                {completed.length} of {JAVA_MODULES.length} Modules Done
              </span>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden border border-slate-700">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(completed.length / JAVA_MODULES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/60 text-xs text-slate-300">
            <div>
              <span className="text-slate-400 block font-medium">Total Sections</span>
              <span className="text-lg font-bold text-white">{JAVA_SECTIONS.length} Sections</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Total Modules</span>
              <span className="text-lg font-bold text-white">{JAVA_MODULES.length} Modules</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Estimated Time</span>
              <span className="text-lg font-bold text-white">~{totalHours} Hours</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Questions & Practice</span>
              <span className="text-lg font-bold text-white">200+ MCQs & Traps</span>
            </div>
          </div>
        </header>

        {/* Filter and Expand Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700/60">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search any topic (e.g. String pool, Binary Search, Spring Boot, Singleton, HashMap)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => toggleAll(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={() => toggleAll(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Syllabus Content: 8 Sections */}
        <div className="space-y-6">
          {JAVA_SECTIONS.map((section, secIdx) => {
            const sectionModules = filteredModules.filter(m => m.section === section.id);
            if (sectionModules.length === 0) return null;

            const isExpanded = expandedSections[section.id];
            const SecIcon = SECTION_ICONS[section.id] || BookOpen;
            const completedCount = sectionModules.filter(m => completed.includes(m.id)).length;

            return (
              <div
                key={section.id}
                className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden shadow-md"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-slate-800 hover:bg-slate-750 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <SecIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-bold">SECTION {secIdx + 1}</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-400">{sectionModules.length} Modules</span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-white">
                        {section.label}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-700 hidden sm:inline-block">
                      {completedCount}/{sectionModules.length} Done
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Modules List */}
                {isExpanded && (
                  <div className="p-4 md:p-6 space-y-4 bg-slate-900/40 border-t border-slate-700/60">
                    {sectionModules.map((mod) => {
                      const isModDone = completed.includes(mod.id);

                      return (
                        <div
                          key={mod.id}
                          className={`p-4 md:p-5 rounded-xl border transition-all ${
                            isModDone
                              ? 'bg-slate-900/80 border-emerald-500/30'
                              : 'bg-slate-900/60 border-slate-700/80 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                            {/* Left: Info */}
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <button
                                  onClick={() => handleToggleComplete(mod.id)}
                                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
                                    isModDone
                                      ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/40'
                                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-slate-200'
                                  }`}
                                  title="Mark as completed"
                                >
                                  <CheckCircle className={`w-3.5 h-3.5 ${isModDone ? 'text-emerald-400' : 'text-slate-500'}`} />
                                  <span>{isModDone ? 'Completed' : 'Mark Learned'}</span>
                                </button>

                                <h3 className="text-base md:text-lg font-bold text-white">
                                  {mod.title}
                                </h3>

                                <span
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                    mod.difficulty === 'Easy'
                                      ? 'bg-green-500/20 text-green-400'
                                      : mod.difficulty === 'Medium'
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-red-500/20 text-red-400'
                                  }`}
                                >
                                  {mod.difficulty}
                                </span>

                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-500" />
                                  {mod.estimatedMinutes}m
                                </span>
                              </div>

                              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                                {mod.description}
                              </p>

                              {/* Topics Pills */}
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {mod.topics.map((topic, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="bg-slate-800 text-slate-300 border border-slate-700/80 px-2 py-0.5 rounded text-[11px] font-mono"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex sm:flex-row lg:flex-col gap-2 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                              <Link
                                to={`/java/module/${mod.id}`}
                                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Learn Lesson</span>
                              </Link>
                              <Link
                                to={`/java/mcq/${mod.id}`}
                                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm"
                              >
                                <Star className="w-3.5 h-3.5 text-yellow-400" />
                                <span>Practice MCQ</span>
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

        {/* Footer Navigation */}
        <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-base">Ready to start practicing?</h4>
            <p className="text-xs text-slate-400">
              Pick Module 1: Java Fundamentals or jump directly into Mock Interviews.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/java/mock-interview"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Mock Interview
            </Link>
            <Link
              to="/java/module/java-fundamentals"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors shadow-md"
            >
              Start Module 1
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
