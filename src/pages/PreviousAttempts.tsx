import { Link } from 'react-router-dom';
import { getAllResults, clearResult } from '../utils/storage';
import { formatTime } from '../utils/scoring';
import { ArrowLeft, Trash2, Eye, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function PreviousAttempts() {
  const [results, setResults] = useState(getAllResults);

  const handleDelete = (id: string) => {
    if (!confirm('Delete this result?')) return;
    clearResult(id);
    setResults(getAllResults());
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-lg font-bold text-white">Previous Attempts</h1>
            <p className="text-xs text-slate-400">{results.length} attempt{results.length !== 1 ? 's' : ''} recorded</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {results.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-400 mb-2">No attempts yet</h2>
            <p className="text-slate-500 mb-6">Complete a written test to see results here.</p>
            <Link to="/test-selection" className="btn-primary">Take a Test</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map(r => (
              <div key={r.id} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">{r.paperLabel}</span>
                    <span className={`badge ${{
                      Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard'
                    }[r.paperId.includes('easy') ? 'Easy' : r.paperId.includes('medium') ? 'Medium' : 'Hard'] || 'badge-blue'}`}>
                      {r.paperId.includes('easy') ? 'Easy' : r.paperId.includes('medium') ? 'Medium' : 'Hard'}
                    </span>
                  </div>
                  <div className="text-slate-400 text-sm">{new Date(r.date).toLocaleString()}</div>
                  <div className="text-slate-400 text-xs mt-1">Time: {formatTime(r.timeSpent)} | {r.correct}/{r.total} correct</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-2xl font-extrabold ${r.percentage >= 70 ? 'text-green-400' : r.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {r.percentage}%
                  </div>
                  <Link to={`/result/${r.id}`} className="btn-secondary py-1.5 px-3 text-sm">
                    <Eye className="w-4 h-4" /> View
                  </Link>
                  <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-900/20 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
