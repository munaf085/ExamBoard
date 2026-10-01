import Link from 'next/link';
import { Compass, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6">
        <Compass className="w-8 h-8 text-amber-400" />
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-3">Topic or Route Not Found</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The Java module, lesson, or resource you are looking for does not exist or has been relocated within the curriculum.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/java"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-emerald-900/20"
        >
          <BookOpen className="w-4 h-4" /> Java Syllabus & Modules
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl border border-slate-700 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>
    </div>
  );
}
