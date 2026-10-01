'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error telemetry in client console
    console.error('[ExamBoard Application Error]:', error.message);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-rose-400" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Something Went Wrong</h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        An unexpected application error occurred while loading this view. You can reload the component or return to the syllabus.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-emerald-900/20"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/java"
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl border border-slate-700 transition-colors text-sm"
        >
          <Home className="w-4 h-4" /> Java Dashboard
        </Link>
      </div>
    </div>
  );
}
