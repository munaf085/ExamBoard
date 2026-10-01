import Link from 'next/link';
import { Coffee, ChevronRight, BookOpen, BrainCircuit, Zap, Layers, Sparkles, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 max-w-3xl">
        <div className="inline-flex items-center justify-center bg-emerald-900/40 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Coffee className="w-4 h-4 mr-2" /> Java Placement & Interview Mastery Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Java Engineering</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Comprehensive, zero-gap technical preparation: 37 deep modules, 77 analogical sub-lessons, 
          671 hand-crafted coding exercises, JVM interview traps, and full F2F mock interview simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
        {/* Master Curriculum */}
        <Link 
          href="/java"
          className="group relative bg-slate-800/60 border border-slate-700/80 hover:border-emerald-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-emerald-900/20 flex flex-col"
        >
          <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Master Curriculum</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            37 Modules across 8 Sections: Fundamentals, OOP, DSA, Collections, Advanced Java, Database, and Spring Boot.
          </p>
          <div className="flex items-center text-emerald-400 font-semibold text-sm group-hover:text-emerald-300">
            Explore Syllabus <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Mock Interview */}
        <Link 
          href="/java/mock-interview"
          className="group relative bg-slate-800/60 border border-slate-700/80 hover:border-purple-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-purple-900/20 flex flex-col"
        >
          <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30 group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">F2F Mock Interview</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            Simulate realistic technical interviews with randomized Core Java, OOP, and Spring questions with follow-ups.
          </p>
          <div className="flex items-center text-purple-400 font-semibold text-sm group-hover:text-purple-300">
            Start Simulation <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Revision & Traps */}
        <Link 
          href="/java/revision"
          className="group relative bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-amber-900/20 flex flex-col"
        >
          <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Fast Revision Hub</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            18 Concept Differences matrices, 10 JVM Interview Traps, and rapid-fire syntax cheatsheets for last-minute prep.
          </p>
          <div className="flex items-center text-amber-400 font-semibold text-sm group-hover:text-amber-300">
            Quick Revision <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Flashcards */}
        <Link 
          href="/java/flashcards"
          className="group relative bg-slate-800/60 border border-slate-700/80 hover:border-cyan-500/50 rounded-2xl p-6 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-cyan-900/20 flex flex-col"
        >
          <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/30 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Flashcard Drills</h2>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            70+ Spaced-repetition flashcards covering memory management, collections, threading, and Spring annotations.
          </p>
          <div className="flex items-center text-cyan-400 font-semibold text-sm group-hover:text-cyan-300">
            Practice Cards <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm border-t border-slate-800 pt-8 w-full max-w-4xl">
        <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-emerald-400" /> 37 Modules • 8 Sections</span>
        <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-emerald-400" /> 77 Sublessons</span>
        <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /> 671 Coding Exercises</span>
      </div>
    </div>
  );
}
