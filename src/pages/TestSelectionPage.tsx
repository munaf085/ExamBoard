import { Link } from 'react-router-dom';
import { PAPERS } from '../types';
import { getResultsForPaper } from '../utils/storage';
import { ArrowLeft, Clock, CheckCircle, BookOpen, ChevronRight } from 'lucide-react';

export default function TestSelectionPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">Round 1 — Written Test</h1>
            <p className="text-xs text-slate-400">Select a mock paper to begin</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Choose Your Mock Paper</h2>
          <p className="text-slate-400">
            6 papers across 3 difficulty levels. Each paper has 40 questions and a 60-minute timer.
            All questions are unique across papers.
          </p>
        </div>

        {/* Difficulty Groups */}
        {(['Easy', 'Medium', 'Hard'] as const).map(diff => {
          const papers = PAPERS.filter(p => p.difficulty === diff);
          const colors = {
            Easy: { border: 'border-green-700/30', badge: 'bg-green-900 text-green-300', accent: 'text-green-400' },
            Medium: { border: 'border-yellow-700/30', badge: 'bg-yellow-900 text-yellow-300', accent: 'text-yellow-400' },
            Hard: { border: 'border-red-700/30', badge: 'bg-red-900 text-red-300', accent: 'text-red-400' },
          }[diff];

          return (
            <div key={diff} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`${colors.badge} text-xs font-bold px-3 py-1 rounded-full`}>{diff.toUpperCase()}</span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {papers.map(paper => {
                  const results = getResultsForPaper(paper.id);
                  const best = results.length > 0 ? Math.max(...results.map(r => r.percentage)) : null;
                  const attempts = results.length;

                  return (
                    <div
                      key={paper.id}
                      className={`bg-slate-800/60 border ${colors.border} rounded-xl p-6 flex flex-col gap-4 hover:bg-slate-800 transition-all`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white">{paper.label}</h3>
                          <p className="text-slate-400 text-sm mt-0.5">{paper.description}</p>
                        </div>
                        <BookOpen className={`w-5 h-5 ${colors.accent} flex-shrink-0`} />
                      </div>

                      <div className="flex items-center gap-6 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {paper.questionCount} Questions
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {paper.durationMinutes} Minutes
                        </span>
                        {attempts > 0 && (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                            {attempts} attempt{attempts > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      {best !== null && (
                        <div className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between">
                          <span className="text-slate-400 text-sm">Best Score</span>
                          <span className={`font-bold text-lg ${best >= 70 ? 'text-green-400' : best >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {best}%
                          </span>
                        </div>
                      )}

                      <Link
                        to={`/test-instructions/${paper.id}`}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
                      >
                        {attempts > 0 ? 'Retake Test' : 'Start Test'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
