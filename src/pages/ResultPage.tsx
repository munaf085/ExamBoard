import { useParams, Link } from 'react-router-dom';
import { getResultById } from '../utils/storage';
import { getDiagnostic, formatTime, getPerformanceLabel } from '../utils/scoring';
import { CATEGORY_LABELS } from '../types';
import {
  Trophy, Clock, CheckCircle, XCircle, MinusCircle,
  TrendingUp, AlertCircle, BookOpen, ArrowLeft, RotateCcw
} from 'lucide-react';

export default function ResultPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const result = sessionId ? getResultById(sessionId) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Result not found.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const diagnostic = getDiagnostic(result);
  const perfLabel = getPerformanceLabel(result.percentage);

  const perfColor = result.percentage >= 70 ? 'text-green-400' : result.percentage >= 50 ? 'text-yellow-400' : 'text-red-400';
  const perfBg = result.percentage >= 70 ? 'from-green-900/30' : result.percentage >= 50 ? 'from-yellow-900/30' : 'from-red-900/30';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/test-selection" className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-white">Test Result — {result.paperLabel}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Score Card */}
        <div className={`bg-gradient-to-br ${perfBg} to-slate-800/50 border border-slate-700 rounded-2xl p-8`}>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center flex-shrink-0">
              <div className={`text-6xl font-extrabold ${perfColor}`}>{result.percentage}%</div>
              <div className="text-slate-400 text-sm mt-1">{perfLabel}</div>
            </div>
            <div className="flex-1 w-full">
              {/* Score bar */}
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.percentage >= 70 ? 'bg-green-500' :
                    result.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-green-400 font-bold text-xl">
                    <CheckCircle className="w-4 h-4" />
                    {result.correct}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">Correct</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-red-400 font-bold text-xl">
                    <XCircle className="w-4 h-4" />
                    {result.incorrect}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">Incorrect</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-slate-400 font-bold text-xl">
                    <MinusCircle className="w-4 h-4" />
                    {result.unanswered}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">Unanswered</div>
                </div>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="flex items-center gap-1.5 text-slate-300 mb-1">
                <Clock className="w-4 h-4" />
                Time Taken
              </div>
              <div className="text-2xl font-bold text-white">{formatTime(result.timeSpent)}</div>
              <div className="text-slate-400 text-xs">{result.score}/{result.total} marks</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" /> Category Breakdown
          </h2>
          <div className="space-y-4">
            {result.categoryBreakdown.map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 text-sm">{CATEGORY_LABELS[cat.category] || cat.label}</span>
                  <span className={`text-sm font-bold ${
                    cat.percentage >= 75 ? 'text-green-400' :
                    cat.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {cat.correct}/{cat.total}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cat.percentage >= 75 ? 'bg-green-500' :
                      cat.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Report */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Strong Areas */}
          {diagnostic.strong.length > 0 && (
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-5">
              <h3 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Strong Areas
              </h3>
              <ul className="space-y-1.5">
                {diagnostic.strong.map(s => (
                  <li key={s} className="text-green-200 text-sm flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Areas to Revise */}
          {diagnostic.revise.length > 0 && (
            <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-5">
              <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Areas to Revise
              </h3>
              <ul className="space-y-1.5">
                {diagnostic.revise.map(r => (
                  <li key={r} className="text-red-200 text-sm flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Missed Question Types */}
        {diagnostic.missed.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Questions Missed by Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {diagnostic.missed.map(m => (
                <div key={m.label} className="bg-slate-900/60 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-slate-300 text-sm">{m.label}</span>
                  <span className="text-amber-400 font-bold text-sm">{m.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Revision */}
        {diagnostic.recommended.length > 0 && (
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5">
            <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Recommended Revision
            </h3>
            <ol className="space-y-1.5">
              {diagnostic.recommended.map((r, i) => (
                <li key={r} className="text-blue-200 text-sm flex items-center gap-2">
                  <span className="bg-blue-800 text-blue-200 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Link to={`/review/${sessionId}`} className="btn-primary">
            <BookOpen className="w-4 h-4" />
            Review All Answers
          </Link>
          <Link to={`/test-instructions/${result.paperId}`} className="btn-secondary">
            <RotateCcw className="w-4 h-4" />
            Retake This Test
          </Link>
          <Link to="/test-selection" className="btn-secondary">
            Choose Another Paper
          </Link>
          <Link to="/dashboard" className="btn-secondary">
            View Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
