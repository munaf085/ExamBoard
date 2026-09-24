import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { round2Questions } from '../data/round2Questions';
import { InterviewQuestion, InterviewScore } from '../types';
import { saveInterviewSession as storeSave } from '../utils/storage';
import {
  ArrowLeft, ChevronRight, Eye, EyeOff, Star,
  RotateCcw, Save, CheckCircle
} from 'lucide-react';

function generateSessionIdLocal() {
  return `r2_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
}

export default function Round2Page() {
  const [sessionId] = useState(generateSessionIdLocal);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [scores, setScores] = useState<Record<string, InterviewScore>>({});
  const [savedMsg, setSavedMsg] = useState(false);
  const [filterCat, setFilterCat] = useState<string>('All');
  const [filterDiff, setFilterDiff] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(round2Questions.map(q => q.category)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = round2Questions.filter(q => {
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
      round: 2,
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

  if (filtered.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">No questions match the filter.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <div>
              <h1 className="text-lg font-bold text-white">Round 2 — Technical Interview 1</h1>
              <p className="text-xs text-slate-400">C# • OOP • DSA • Programming Fundamentals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedMsg && <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Saved</span>}
            <button onClick={handleSave} className="btn-secondary py-1.5 px-3 text-sm">
              <Save className="w-4 h-4" /> Save Session
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Category:</span>
            <select
              value={filterCat}
              onChange={e => { setFilterCat(e.target.value); setCurrentIdx(0); setShowAnswer(false); }}
              className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-1.5"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Difficulty:</span>
            <select
              value={filterDiff}
              onChange={e => { setFilterDiff(e.target.value); setCurrentIdx(0); setShowAnswer(false); }}
              className="bg-slate-800 border border-slate-600 text-slate-200 text-sm rounded-lg px-3 py-1.5"
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="ml-auto text-slate-400 text-sm flex items-center">
            {currentIdx + 1} / {filtered.length} questions
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-2 space-y-4">
            {q && <InterviewQuestionCard
              question={q}
              index={currentIdx}
              showAnswer={showAnswer}
              onReveal={() => setShowAnswer(true)}
            />}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => { setCurrentIdx(i => i - 1); setShowAnswer(false); }}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                onClick={() => { setCurrentIdx(i => i); setShowAnswer(false); }}
                className="btn-secondary py-2 px-3 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                disabled={currentIdx === filtered.length - 1}
                onClick={() => { setCurrentIdx(i => i + 1); setShowAnswer(false); }}
                className="btn-primary py-2 px-4 text-sm disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Scoring Panel */}
          {q && scoreForQ && (
            <div className="space-y-4">
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> Interviewer Score
                </h3>
                <div className="space-y-4">
                  {([
                    ['technicalCorrectness', 'Technical Accuracy'],
                    ['explanation', 'Clarity of Explanation'],
                    ['problemSolving', 'Problem Solving'],
                    ['codingAbility', 'Coding Ability'],
                    ['communication', 'Communication'],
                  ] as const).map(([field, label]) => (
                    <div key={field}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-yellow-400 font-bold">{(scoreForQ as any)[field]}/5</span>
                      </div>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(v => (
                          <button
                            key={v}
                            onClick={() => updateScore(field, v)}
                            className={`flex-1 h-7 rounded text-xs font-bold transition-all ${
                              (scoreForQ as any)[field] >= v
                                ? 'bg-yellow-500 text-slate-900'
                                : 'bg-slate-700 text-slate-500 hover:bg-slate-600'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-slate-900/60 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Total</span>
                  <span className={`font-extrabold text-xl ${totalScore >= 20 ? 'text-green-400' : totalScore >= 15 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {totalScore} / 25
                  </span>
                </div>
                <textarea
                  value={(scoreForQ as any).notes || ''}
                  onChange={e => updateScore('notes' as any, e.target.value)}
                  placeholder="Interviewer notes..."
                  className="mt-3 w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-300 text-sm resize-none h-20 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Question List */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">Quick Navigate</h3>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filtered.slice(0, 20).map((fq, i) => (
                    <button
                      key={fq.id}
                      onClick={() => { setCurrentIdx(i); setShowAnswer(false); }}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-all ${
                        i === currentIdx
                          ? 'bg-blue-600 text-white'
                          : scores[fq.id] ? 'bg-green-900/30 text-green-300' : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {i + 1}. {fq.question.slice(0, 45)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface IQCardProps {
  question: InterviewQuestion;
  index: number;
  showAnswer: boolean;
  onReveal: () => void;
}

function InterviewQuestionCard({ question: q, index, showAnswer, onReveal }: IQCardProps) {
  const diffBadge: Record<string, string> = {
    Easy: 'bg-green-900 text-green-300',
    Medium: 'bg-yellow-900 text-yellow-300',
    Hard: 'bg-red-900 text-red-300',
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-slate-500 text-sm">Q{index + 1}</span>
        <span className={`badge ${diffBadge[q.difficulty]}`}>{q.difficulty}</span>
        <span className="badge badge-blue">{q.category}</span>
      </div>

      <h2 className="text-white text-xl font-semibold leading-relaxed">{q.question}</h2>

      {q.followUps && q.followUps.length > 0 && (
        <div className="bg-slate-700/40 rounded-lg p-4">
          <div className="text-slate-400 text-xs font-bold uppercase mb-2">Follow-up Questions</div>
          <ul className="space-y-1.5">
            {q.followUps.map((fu, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                {fu}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!showAnswer ? (
        <button onClick={onReveal} className="btn-secondary text-sm">
          <Eye className="w-4 h-4" /> Reveal Expected Answer
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl p-5">
            <div className="text-blue-400 text-xs font-bold uppercase mb-2">Expected Answer</div>
            <p className="text-blue-100 text-sm leading-relaxed">{q.expectedAnswer}</p>
          </div>

          {q.keyPoints && q.keyPoints.length > 0 && (
            <div className="bg-slate-700/40 rounded-xl p-4">
              <div className="text-slate-400 text-xs font-bold uppercase mb-2">Key Points</div>
              <ul className="space-y-1.5">
                {q.keyPoints.map((kp, i) => (
                  <li key={i} className="text-slate-200 text-sm flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    {kp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
