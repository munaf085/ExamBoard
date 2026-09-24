import { useState } from 'react';
import { Link } from 'react-router-dom';
import { hrQuestions } from '../data/hrQuestions';
import { HRQuestion } from '../types';
import { saveInterviewSession as storeSave } from '../utils/storage';
import { ArrowLeft, Eye, ChevronRight, Save, CheckCircle, Lightbulb } from 'lucide-react';

function genId() { return `r4_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }

export default function Round4Page() {
  const [sessionId] = useState(genId);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showGuidance, setShowGuidance] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedMsg, setSavedMsg] = useState(false);
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(hrQuestions.map(q => q.category)))];

  const filtered = filterCat === 'All' ? hrQuestions : hrQuestions.filter(q => q.category === filterCat);
  const q = filtered[currentIdx] as HRQuestion | undefined;

  const handleSave = () => {
    storeSave({
      id: sessionId,
      round: 4,
      date: new Date().toISOString(),
      scores: [],
      overallNotes: Object.entries(notes).map(([id, n]) => `${id}: ${n}`).join('\n'),
    });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <div>
              <h1 className="text-lg font-bold text-white">Round 4 — HR Interview</h1>
              <p className="text-xs text-slate-400">Communication • Behaviour • Career Goals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedMsg && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved</span>}
            <button onClick={handleSave} className="btn-secondary py-1.5 px-3 text-sm">
              <Save className="w-4 h-4" /> Save Notes
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-slate-400 text-sm self-center">Category:</span>
          <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setCurrentIdx(0); setShowGuidance(false); }}
            className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-1.5">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="ml-auto text-slate-400 text-sm self-center">{currentIdx + 1} / {filtered.length}</div>
        </div>

        {q && (
          <div className="space-y-5">
            {/* Question Card */}
            <div className="bg-slate-800 border border-amber-700/30 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-slate-500 text-sm">Q{currentIdx + 1}</span>
                <span className="badge" style={{ background: '#78350f', color: '#fcd34d' }}>{q.category}</span>
                <span className="badge" style={{ background: '#1e3a5f', color: '#93c5fd' }}>HR Round</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-relaxed">{q.question}</h2>
            </div>

            {/* Guidance */}
            {!showGuidance ? (
              <button onClick={() => setShowGuidance(true)} className="btn-secondary text-sm">
                <Eye className="w-4 h-4" /> Show Interviewer Guidance
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-5">
                  <div className="text-amber-400 text-xs font-bold uppercase mb-2 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" /> Interviewer Guidance
                  </div>
                  <p className="text-amber-100 text-sm leading-relaxed">{q.guidance}</p>
                </div>
                {q.sampleAnswer && (
                  <div className="bg-slate-700/40 rounded-xl p-5">
                    <div className="text-slate-400 text-xs font-bold uppercase mb-2">Sample Answer Framework</div>
                    <p className="text-slate-200 text-sm leading-relaxed">{q.sampleAnswer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <div className="text-slate-400 text-sm font-medium mb-2">Interviewer Notes for this question:</div>
              <textarea
                value={notes[q.id] || ''}
                onChange={e => setNotes(prev => ({ ...prev, [q.id]: e.target.value }))}
                placeholder="Write observations about the candidate's response..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 text-sm resize-none h-28 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button disabled={currentIdx === 0} onClick={() => { setCurrentIdx(i => i-1); setShowGuidance(false); }}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-40">← Previous</button>
              <div className="flex items-center gap-1">
                {filtered.slice(Math.max(0, currentIdx-2), Math.min(filtered.length, currentIdx+3)).map((_, relIdx) => {
                  const absIdx = Math.max(0, currentIdx-2) + relIdx;
                  return (
                    <button key={absIdx} onClick={() => { setCurrentIdx(absIdx); setShowGuidance(false); }}
                      className={`w-8 h-8 rounded text-xs font-bold transition-all ${absIdx === currentIdx ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>
                      {absIdx + 1}
                    </button>
                  );
                })}
              </div>
              <button disabled={currentIdx === filtered.length - 1} onClick={() => { setCurrentIdx(i => i+1); setShowGuidance(false); }}
                className="btn-primary py-2 px-4 text-sm disabled:opacity-40">Next →</button>
            </div>

            {/* All Questions List */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
              <h3 className="text-white font-semibold text-sm mb-3">All HR Questions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {filtered.map((fq, i) => (
                  <button key={fq.id} onClick={() => { setCurrentIdx(i); setShowGuidance(false); }}
                    className={`text-left px-3 py-2 rounded text-xs transition-all ${
                      i === currentIdx ? 'bg-amber-600 text-white' :
                      notes[fq.id] ? 'bg-green-900/30 text-green-300' : 'bg-slate-700 text-slate-400 hover:text-white'
                    }`}>
                    {i+1}. {fq.question.slice(0, 50)}{fq.question.length > 50 ? '...' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
