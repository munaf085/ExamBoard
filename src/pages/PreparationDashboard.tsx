import { Link } from 'react-router-dom';
import { getDashboardStats, getAllResults } from '../utils/storage';
import { CATEGORY_LABELS, Category } from '../types';
import { ArrowLeft, BarChart3, Trophy, Target, TrendingUp } from 'lucide-react';

export default function PreparationDashboard() {
  const stats = getDashboardStats();
  const results = getAllResults();

  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-lg font-bold text-white">Preparation Dashboard</h1>
            <p className="text-xs text-slate-400">Track your progress across all topics</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {stats.testsCompleted === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-400 mb-2">No tests taken yet</h2>
            <p className="text-slate-500 mb-6">Complete a written test to see your progress here.</p>
            <Link to="/test-selection" className="btn-primary">Start a Test</Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={<BarChart3 className="w-5 h-5 text-blue-400" />} label="Tests Completed" value={stats.testsCompleted} />
              <StatCard icon={<Target className="w-5 h-5 text-yellow-400" />} label="Average Score" value={`${stats.avgScore}%`} />
              <StatCard icon={<Trophy className="w-5 h-5 text-green-400" />} label="Best Score" value={`${stats.bestScore}%`} />
              <StatCard icon={<TrendingUp className="w-5 h-5 text-purple-400" />} label="Total Questions" value={results.reduce((s, r) => s + r.total, 0)} />
            </div>

            {/* Category Performance */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-5">Category Performance</h2>
              <div className="space-y-4">
                {categories.map(cat => {
                  const data = stats.categoryStats[cat];
                  if (!data || data.total === 0) return null;
                  const pct = Math.round((data.correct / data.total) * 100);
                  return (
                    <div key={cat}>
                      <div className="flex justify-between items-center mb-1.5 text-sm">
                        <span className="text-slate-300">{CATEGORY_LABELS[cat]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{data.correct}/{data.total}</span>
                          <span className={`font-bold ${pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {pct}%
                          </span>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent attempts */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Recent Attempts</h2>
              <div className="space-y-3">
                {results.slice(0, 5).map(r => (
                  <div key={r.id} className="flex items-center justify-between bg-slate-900/50 rounded-xl p-4">
                    <div>
                      <div className="text-white font-medium text-sm">{r.paperLabel}</div>
                      <div className="text-slate-400 text-xs">{new Date(r.date).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${r.percentage >= 70 ? 'text-green-400' : r.percentage >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {r.percentage}%
                        </div>
                        <div className="text-slate-400 text-xs">{r.score}/{r.total}</div>
                      </div>
                      <Link to={`/result/${r.id}`} className="btn-secondary py-1.5 px-3 text-xs">View</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="text-white font-bold text-xl">{value}</div>
        <div className="text-slate-400 text-xs">{label}</div>
      </div>
    </div>
  );
}
