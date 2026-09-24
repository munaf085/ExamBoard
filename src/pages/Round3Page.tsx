import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { round3Questions } from '../data/round3Questions';
import { InterviewQuestion, InterviewScore } from '../types';
import { saveInterviewSession as storeSave } from '../utils/storage';
import {
  ArrowLeft, ChevronRight, Eye, Star,
  RotateCcw, Save, CheckCircle
} from 'lucide-react';

function genId() { return `r3_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }

export default function Round3Page() {
  const [sessionId] = useState(genId);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<Record<string, InterviewScore>>({});
  const [savedMsg, setSavedMsg] = useState(false);
  const [filterCat, setFilterCat] = useState('All');
  const [filterDiff, setFilterDiff] = useState('All');

  const categories = ['All', ...Array.from(new Set(round3Questions.map(q => q.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = round3Questions.filter(q => {
    if (filterCat !== 'All' && q.category !== filterCat) return false;
    if (filterDiff !== 'All' && q.difficulty !== filterDiff) return false;
    return true;
  });

  const q = filtered[currentIdx] as InterviewQuestion | undefined;

  const scoreForQ = q ? (scores[q.id] || {
    questionId: q.id,
    technicalCorrectness: 0,
    explanation: 0,
    problemSolving: 0,
    codingAbility: 0,
    communication: 0,
    notes: '',
  }) : null;

  const updateScore = useCallback((field: keyof InterviewScore, value: number | string) => {
    if (!q) return;
    setScores(prev => {
      const existing = prev[q.id] || {
        questionId: q.id,
        technicalCorrectness: 0,
        explanation: 0,
        problemSolving: 0,
        codingAbility: 0,
        communication: 0,
        notes: '',
      };
      return {
        ...prev,
        [q.id]: { ...existing, [field]: value } as InterviewScore,
      };
    });
  }, [q]);

  const handleSave = () => {
    storeSave({
      id: sessionId,
      round: 3,
      date: new Date().toISOString(),
      scores: Object.values(scores),
      overallNotes: '',
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const totalScore = scoreForQ
    ? (scoreForQ.technicalCorrectness + scoreForQ.explanation + scoreForQ.problemSolving + scoreForQ.codingAbility + scoreForQ.communication)
    : 0;

  if (!q) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400">No questions available.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <div>
              <h1 className="text-lg font-bold text-white">Round 3 — Technical Interview 2</h1>
              <p className="text-xs text-slate-400">SQL • .NET • ASP.NET • Web API • DI • EF • Frontend</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedMsg && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved</span>}
            <button onClick={handleSave} className="btn-secondary py-1.5 px-3 text-sm">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Category:</span>
            <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setCurrentIdx(0); setShowAnswer(false); }}
              className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-1.5">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Difficulty:</span>
            <select value={filterDiff} onChange={e => { setFilterDiff(e.target.value); setCurrentIdx(0); setShowAnswer(false); }}
              className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-1.5">
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="ml-auto text-slate-400 text-sm self-center">{currentIdx + 1} / {filtered.length}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Question Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-500 text-sm">Q{currentIdx + 1}</span>
                <span className={`badge ${{ Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' }[q.difficulty] || 'badge-blue'}`}>{q.difficulty}</span>
                <span className="badge badge-blue">{q.category}</span>
              </div>

              <h2 className="text-white text-xl font-semibold leading-relaxed">{q.question}</h2>

              {q.followUps && q.followUps.length > 0 && (
                <div className="bg-slate-700/40 rounded-lg p-4">
                  <div className="text-slate-400 text-xs font-bold uppercase mb-2">Follow-up Questions</div>
                  <ul className="space-y-1.5">
                    {q.followUps.map((fu, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />{fu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!showAnswer ? (
                <button onClick={() => setShowAnswer(true)} className="btn-secondary text-sm">
                  <Eye className="w-4 h-4" /> Reveal Expected Answer
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-emerald-900/20 border border-emerald-700/40 rounded-xl p-5">
                    <div className="text-emerald-400 text-xs font-bold uppercase mb-2">Expected Answer</div>
                    <p className="text-emerald-100 text-sm leading-relaxed">{q.expectedAnswer}</p>
                  </div>
                  {q.keyPoints && q.keyPoints.length > 0 && (
                    <div className="bg-slate-700/40 rounded-xl p-4">
                      <div className="text-slate-400 text-xs font-bold uppercase mb-2">Key Points</div>
                      <ul className="space-y-1.5">
                        {q.keyPoints.map((kp, i) => (
                          <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />{kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button disabled={currentIdx === 0} onClick={() => { setCurrentIdx(i => i-1); setShowAnswer(false); }}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-40">← Previous</button>
              <button onClick={() => setShowAnswer(false)} className="btn-secondary py-2 px-3 text-sm">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button disabled={currentIdx === filtered.length - 1} onClick={() => { setCurrentIdx(i => i+1); setShowAnswer(false); }}
                className="btn-primary py-2 px-4 text-sm disabled:opacity-40">Next →</button>
            </div>
          </div>

          {/* Scoring Panel */}
          {scoreForQ && (
            <div className="space-y-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> Interviewer Score
                </h3>
                <div className="space-y-3">
                  {([
                    ['technicalCorrectness', 'Technical Accuracy'],
                    ['explanation', 'Explanation'],
                    ['problemSolving', 'Problem Solving'],
                    ['codingAbility', 'Coding Ability'],
                    ['communication', 'Communication'],
                  ] as const).map(([field, label]) => (
                    <div key={field}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-yellow-400 font-bold">{(scoreForQ as any)[field]}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(v => (
                          <button key={v} onClick={() => updateScore(field, v)}
                            className={`flex-1 h-6 rounded text-xs font-bold transition-all ${(scoreForQ as any)[field] >= v ? 'bg-yellow-500 text-slate-900' : 'bg-slate-700 text-slate-500 hover:bg-slate-600'}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 bg-slate-900/60 rounded-lg p-3 flex justify-between">
                  <span className="text-slate-400 text-sm">Total</span>
                  <span className={`font-extrabold text-xl ${totalScore >= 20 ? 'text-green-400' : totalScore >= 15 ? 'text-yellow-400' : 'text-red-400'}`}>{totalScore}/25</span>
                </div>
                <textarea
                  value={(scoreForQ as any).notes || ''}
                  onChange={e => updateScore('notes' as any, e.target.value)}
                  placeholder="Notes..."
                  className="mt-3 w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-300 text-sm resize-none h-16 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
