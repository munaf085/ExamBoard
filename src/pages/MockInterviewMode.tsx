import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Clock, BookOpen, Users } from 'lucide-react';

type MockRound = 'intro' | 'round1' | 'round2' | 'round3' | 'round4' | 'summary';

export default function MockInterviewMode() {
  const [currentRound, setCurrentRound] = useState<MockRound>('intro');
  const [results, setResults] = useState<Record<string, string>>({
    round1: '',
    round2: '',
    round3: '',
    round4: '',
  });

  if (currentRound === 'intro') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        <header className="border-b border-slate-700 bg-slate-900">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-lg font-bold text-white">Mock Interview Mode</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-12 flex-1">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-900/40 border border-pink-700/40 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-pink-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Full Interview Simulation</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Experience the complete Our Tech interview process in sequence. Complete each round one by
              one and receive a comprehensive preparation report at the end.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              { round: 1, title: 'Written Test', desc: 'Technology + Aptitude (40 questions, 60 min)', icon: <BookOpen className="w-5 h-5" />, color: 'text-blue-400' },
              { round: 2, title: 'Technical Interview 1', desc: 'C# + OOP + DSA (Interviewer mode)', icon: <ChevronRight className="w-5 h-5" />, color: 'text-purple-400' },
              { round: 3, title: 'Technical Interview 2', desc: 'SQL + .NET + Web API (Interviewer mode)', icon: <ChevronRight className="w-5 h-5" />, color: 'text-emerald-400' },
              { round: 4, title: 'HR Interview', desc: 'Communication + Behaviour (30 questions)', icon: <Users className="w-5 h-5" />, color: 'text-amber-400' },
            ].map(r => (
              <div key={r.round} className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center gap-4">
                <span className={`${r.color} flex-shrink-0`}>{r.icon}</span>
                <div>
                  <span className="text-slate-400 text-xs font-medium">ROUND {r.round}</span>
                  <div className="text-white font-semibold">{r.title}</div>
                  <div className="text-slate-400 text-sm">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentRound('round1')}
            className="w-full btn-primary py-4 text-lg justify-center"
          >
            Begin Full Simulation →
          </button>
        </main>
      </div>
    );
  }

  if (currentRound === 'summary') {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <header className="border-b border-slate-700 bg-slate-900">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="text-lg font-bold text-white">Simulation Complete</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/40 border border-green-700/40 rounded-2xl mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-2">Interview Simulation Complete</h2>
            <p className="text-slate-400">Here is your session summary. Review each round for detailed feedback.</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { key: 'round1', title: 'Written Test', href: '/test-selection', color: 'border-blue-700/40' },
              { key: 'round2', title: 'Technical Interview 1', href: '/round2', color: 'border-purple-700/40' },
              { key: 'round3', title: 'Technical Interview 2', href: '/round3', color: 'border-emerald-700/40' },
              { key: 'round4', title: 'HR Interview', href: '/round4', color: 'border-amber-700/40' },
            ].map(r => (
              <div key={r.key} className={`bg-slate-800 border ${r.color} rounded-xl p-5`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-white font-semibold mb-1">{r.title}</div>
                    <div className="text-slate-300 text-sm">
                      {results[r.key] || 'Not recorded'}
                    </div>
                  </div>
                  <Link to={r.href} className="btn-secondary py-1.5 px-3 text-xs">Review</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-5 mb-6">
            <h3 className="text-blue-400 font-bold mb-3">📌 Key Takeaways</h3>
            <ul className="text-blue-200 text-sm space-y-1.5">
              <li>• Review any written test answers where you scored below 70%</li>
              <li>• Re-practice topics flagged in technical rounds</li>
              <li>• Refine your HR answers for fluency and confidence</li>
              <li>• Focus on weak categories identified in the dashboard</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setCurrentRound('intro'); setResults({ round1: '', round2: '', round3: '', round4: '' }); }}
              className="flex-1 btn-secondary py-3">
              Start New Simulation
            </button>
            <Link to="/dashboard" className="flex-1 btn-primary py-3 justify-center">View Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  // Round navigation screens
  const roundData: Record<string, { title: string; desc: string; href: string; next: MockRound; color: string; accent: string }> = {
    round1: { title: 'Round 1 — Written Test', desc: 'Select a mock paper and complete the timed written test. Come back here when done.', href: '/test-selection', next: 'round2', color: 'bg-blue-900/20 border-blue-700/40', accent: 'text-blue-400' },
    round2: { title: 'Round 2 — Technical Interview 1', desc: 'Practice C#, OOP, and DSA questions with the interviewer panel. Score yourself after each question.', href: '/round2', next: 'round3', color: 'bg-purple-900/20 border-purple-700/40', accent: 'text-purple-400' },
    round3: { title: 'Round 3 — Technical Interview 2', desc: 'Practice SQL, .NET, Web API, and frontend questions. Use the interviewer scoring panel.', href: '/round3', next: 'round4', color: 'bg-emerald-900/20 border-emerald-700/40', accent: 'text-emerald-400' },
    round4: { title: 'Round 4 — HR Interview', desc: 'Go through all HR questions. Record notes for each response.', href: '/round4', next: 'summary', color: 'bg-amber-900/20 border-amber-700/40', accent: 'text-amber-400' },
  };

  const rd = roundData[currentRound as string];
  if (!rd) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className={`max-w-lg w-full ${rd.color} border rounded-2xl p-8 text-center`}>
        <div className="text-slate-400 text-sm font-medium mb-2">MOCK INTERVIEW MODE</div>
        <h2 className={`text-2xl font-extrabold text-white mb-3`}>{rd.title}</h2>
        <p className="text-slate-300 mb-6">{rd.desc}</p>

        <Link to={rd.href} className={`btn-primary w-full justify-center py-3 mb-3`}>
          Go to {rd.title.split('—')[1].trim()} →
        </Link>
        <button
          onClick={() => {
            setResults(prev => ({ ...prev, [currentRound as string]: 'Completed' }));
            setCurrentRound(rd.next);
          }}
          className="btn-secondary w-full justify-center py-2.5"
        >
          Mark as Done & Continue →
        </button>
        <button onClick={() => setCurrentRound('intro')} className="mt-3 text-slate-500 text-sm hover:text-slate-300 transition-colors">
          Back to Intro
        </button>
      </div>
    </div>
  );
}

