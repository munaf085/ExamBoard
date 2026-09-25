import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { WrittenQuestion, PaperId, PAPERS } from '../types';
import { getQuestionsForPaper } from '../data/index';
import { saveSession, getSession, saveResult } from '../utils/storage';
import { calculateResult, formatTime, generateSessionId, isCorrect } from '../utils/scoring';
import {
  ChevronLeft, ChevronRight, Flag, X, Send, AlertTriangle,
  Eye, EyeOff, Clock
} from 'lucide-react';

type NavStatus = 'unanswered' | 'answered' | 'marked' | 'current';

export default function TestRunnerPage() {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const paper = PAPERS.find(p => p.id === paperId);

  const [questions, setQuestions] = useState<WrittenQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | number[] | null>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionId] = useState(() => generateSessionId());
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  // Load questions
  useEffect(() => {
    if (!paperId || !paper) return;
    const qs = getQuestionsForPaper(paperId as PaperId);

    // Check for existing session
    const existing = getSession(paperId);
    if (existing && !existing.submitted) {
      const elapsed = Math.floor((Date.now() - existing.startTime) / 1000);
      const remaining = Math.max(0, paper.durationMinutes * 60 - elapsed);
      setTimeRemaining(remaining);
      setAnswers(existing.answers);
      setMarkedForReview(new Set(existing.markedForReview));
    } else {
      setTimeRemaining(paper.durationMinutes * 60);
    }

    setQuestions(qs);
    startTimeRef.current = Date.now();
  }, [paperId, paper]);

  // Timer — must depend on questions.length so it re-runs AFTER the load effect sets timeRemaining
  useEffect(() => {
    if (submitted) return;
    // questions.length > 0 means the load effect has run and timeRemaining is now set
    if (questions.length === 0) return;

    // Clear any stale interval before creating a fresh one
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [submitted, questions.length]); // re-fires when questions load (0 → 40)

  // Auto-submit when timer hits zero
  useEffect(() => {
    if (timeRemaining === 0 && questions.length > 0 && !submitted) {
      submitTest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  // Save session on every change
  useEffect(() => {
    if (!paperId || questions.length === 0 || submitted) return;
    saveSession({
      paperId: paperId as PaperId,
      startTime: startTimeRef.current,
      answers,
      markedForReview: [...markedForReview],
      submitted: false,
      timeSpent: paper ? paper.durationMinutes * 60 - timeRemaining : 0,
    });
  }, [answers, markedForReview, submitted]);

  // Tab visibility anti-cheat
  useEffect(() => {
    const handler = () => {
      if (document.hidden && !submitted) {
        setWarningCount(prev => prev + 1);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 4000);
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [submitted]);

  // Prevent accidental navigation
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!submitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [submitted]);

  const submitTest = useCallback(() => {
    if (submitted || questions.length === 0) return;
    setSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const timeSpent = paper ? paper.durationMinutes * 60 - timeRemaining : 0;
    const result = calculateResult(
      questions, answers,
      paperId as PaperId,
      paper?.label || '',
      timeSpent,
      sessionId,
    );
    saveResult(result);
    saveSession({
      paperId: paperId as PaperId,
      startTime: startTimeRef.current,
      answers,
      markedForReview: [...markedForReview],
      submitted: true,
      timeSpent,
      submittedAt: Date.now(),
    });
    navigate(`/result/${sessionId}`);
  }, [submitted, questions, answers, markedForReview, timeRemaining, paperId, paper, sessionId, navigate]);

  if (!paper || questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];
  const answeredCount = Object.values(answers).filter(v => v !== null && v !== undefined).length;
  const unansweredCount = questions.length - answeredCount;
  const isLow = timeRemaining <= 300 && timeRemaining > 0;
  const isCritical = timeRemaining <= 60;

  const getNavStatus = (idx: number): NavStatus => {
    const qid = questions[idx].id;
    if (idx === currentIdx) return 'current';
    if (markedForReview.has(qid)) return 'marked';
    if (answers[qid] !== null && answers[qid] !== undefined) return 'answered';
    return 'unanswered';
  };

  const handleAnswer = (optIdx: number) => {
    const qid = q.id;
    if (Array.isArray(q.correctAnswer)) {
      // Multiple select
      const current = (answers[qid] as number[] | null) || [];
      const next = current.includes(optIdx)
        ? current.filter(x => x !== optIdx)
        : [...current, optIdx];
      setAnswers(prev => ({ ...prev, [qid]: next.length ? next : null }));
    } else {
      setAnswers(prev => ({ ...prev, [qid]: optIdx }));
    }
  };

  const clearAnswer = () => {
    setAnswers(prev => ({ ...prev, [q.id]: null }));
  };

  const toggleMark = () => {
    setMarkedForReview(prev => {
      const next = new Set(prev);
      if (next.has(q.id)) next.delete(q.id);
      else next.add(q.id);
      return next;
    });
  };

  const isSelected = (optIdx: number): boolean => {
    const ans = answers[q.id];
    if (ans === null || ans === undefined) return false;
    if (Array.isArray(ans)) return ans.includes(optIdx);
    return ans === optIdx;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Tab warning */}
      {showWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2 px-6 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Warning: Tab switch detected ({warningCount} time{warningCount > 1 ? 's' : ''}). Please stay on this tab.
          </span>
          <button onClick={() => setShowWarning(false)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Top Bar */}
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-slate-400 text-sm font-medium hidden sm:block">Our Tech .NET MOCK TEST</span>
            <span className="text-slate-600 hidden sm:block">|</span>
            <span className="text-white font-semibold text-sm">
              Question {currentIdx + 1} / {questions.length}
            </span>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 font-mono font-bold text-lg px-4 py-1.5 rounded-lg ${
            isCritical ? 'bg-red-600 text-white animate-pulse' :
            isLow ? 'bg-amber-600/80 text-white' :
            'bg-slate-800 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            {formatTime(timeRemaining)}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">{answeredCount}/{questions.length} answered</span>
            <button
              onClick={() => setNavOpen(prev => !prev)}
              className="sm:hidden btn-secondary py-1.5 px-3 text-sm"
            >
              {navOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-danger py-1.5 px-4 text-sm"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 py-6 gap-6">
        {/* Question Panel */}
        <div className="flex-1 min-w-0">
          <QuestionCard
            question={q}
            index={currentIdx}
            isSelected={isSelected}
            onAnswer={handleAnswer}
            isMarked={markedForReview.has(q.id)}
          />

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(i => i - 1)}
                className="btn-secondary py-2 px-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={clearAnswer} className="btn-secondary py-2 px-4 text-sm">
                <X className="w-4 h-4" /> Clear
              </button>
              <button
                onClick={toggleMark}
                className={`py-2 px-4 text-sm rounded-lg border font-medium transition-all flex items-center gap-1.5 ${
                  markedForReview.has(q.id)
                    ? 'bg-amber-600 border-amber-500 text-white'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-amber-500'
                }`}
              >
                <Flag className="w-4 h-4" />
                {markedForReview.has(q.id) ? 'Unmark' : 'Mark for Review'}
              </button>
            </div>
            <button
              disabled={currentIdx === questions.length - 1}
              onClick={() => setCurrentIdx(i => i + 1)}
              className="btn-primary py-2 px-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigator Sidebar */}
        <div className={`w-64 flex-shrink-0 ${navOpen ? 'block' : 'hidden'} sm:block`}>
          <QuestionNavigator
            count={questions.length}
            currentIdx={currentIdx}
            getStatus={getNavStatus}
            onSelect={setCurrentIdx}
            answeredCount={answeredCount}
            markedCount={markedForReview.size}
          />
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-600 rounded-2xl p-8 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-2">Submit Test?</h3>
            <p className="text-slate-400 mb-4">
              You have answered <span className="text-white font-bold">{answeredCount}</span> of{' '}
              <span className="text-white font-bold">{questions.length}</span> questions.
            </p>
            {unansweredCount > 0 && (
              <div className="bg-amber-900/30 border border-amber-700/50 rounded-lg px-4 py-2.5 mb-4 text-amber-300 text-sm">
                {unansweredCount} question{unansweredCount > 1 ? 's' : ''} remain unanswered.
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 btn-secondary py-2.5 text-sm"
              >
                Continue Test
              </button>
              <button
                onClick={() => { setShowSubmitModal(false); submitTest(); }}
                className="flex-1 btn-danger py-2.5 text-sm"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- QuestionCard ----
interface QuestionCardProps {
  question: WrittenQuestion;
  index: number;
  isSelected: (optIdx: number) => boolean;
  onAnswer: (optIdx: number) => void;
  isMarked: boolean;
}

function QuestionCard({ question: q, index, isSelected, onAnswer, isMarked }: QuestionCardProps) {
  const typeLabel: Record<string, string> = {
    'single-choice': 'MCQ',
    'multiple-choice': 'Multiple Select',
    'code-output': 'Output Question',
    'loop-trace': 'Loop Trace',
    'sql-analysis': 'SQL Query',
    'code-debug': 'Debug the Code',
    'scenario': 'Scenario',
    'dsa-reasoning': 'DSA',
    'aptitude': 'Aptitude',
    'logical': 'Logical',
    'coding': 'Coding',
  };

  const diffBadge = {
    Easy: 'badge-easy',
    Medium: 'badge-medium',
    Hard: 'badge-hard',
  }[q.difficulty] || 'badge-blue';

  return (
    <div className={`bg-slate-800 border ${isMarked ? 'border-amber-600/60' : 'border-slate-700'} rounded-2xl p-6`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="text-slate-500 text-sm font-medium">Q{index + 1}.</span>
        <span className="badge badge-blue">{typeLabel[q.type] || q.type}</span>
        <span className={`badge ${diffBadge}`}>{q.difficulty}</span>
        <span className="badge" style={{ background: '#1e3a5f', color: '#93c5fd' }}>{q.category}</span>
        {isMarked && (
          <span className="badge" style={{ background: '#78350f', color: '#fcd34d' }}>
            🚩 Marked
          </span>
        )}
        {Array.isArray(q.correctAnswer) && (
          <span className="badge" style={{ background: '#2d1b69', color: '#c4b5fd' }}>
            Multiple Answers
          </span>
        )}
      </div>

      {/* Question Text */}
      <p className="text-white text-base leading-relaxed mb-4">{q.question}</p>

      {/* Code Block */}
      {q.code && (
        <div className="code-block mb-4">{q.code}</div>
      )}

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt, idx) => {
          const selected = isSelected(idx);
          return (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                selected
                  ? 'bg-blue-600/30 border-blue-500 text-white'
                  : 'bg-slate-700/40 border-slate-600 text-slate-300 hover:border-blue-500/50 hover:bg-slate-700'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 flex-shrink-0 ${
                selected ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'
              }`}>
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- QuestionNavigator ----
interface NavigatorProps {
  count: number;
  currentIdx: number;
  getStatus: (idx: number) => NavStatus;
  onSelect: (idx: number) => void;
  answeredCount: number;
  markedCount: number;
}

function QuestionNavigator({ count, currentIdx, getStatus, onSelect, answeredCount, markedCount }: NavigatorProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 sticky top-20">
      <h3 className="text-white font-semibold text-sm mb-3">Question Navigator</h3>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-blue-500" />
          Current
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-600" />
          Answered
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-slate-600" />
          Unanswered
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-amber-500" />
          Flagged
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-1.5 mb-4 max-h-72 overflow-y-auto">
        {Array.from({ length: count }, (_, i) => {
          const status = getStatus(i);
          const colorMap: Record<NavStatus, string> = {
            current: 'bg-blue-500 text-white ring-2 ring-blue-300',
            answered: 'bg-green-700 text-white hover:bg-green-600',
            marked: 'bg-amber-600 text-white hover:bg-amber-500',
            unanswered: 'bg-slate-700 text-slate-300 hover:bg-slate-600',
          };
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-full aspect-square rounded text-xs font-bold transition-all ${colorMap[status]}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="border-t border-slate-700 pt-3 space-y-1.5 text-xs text-slate-400">
        <div className="flex justify-between">
          <span>Answered</span>
          <span className="text-green-400 font-semibold">{answeredCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Unanswered</span>
          <span className="text-slate-300 font-semibold">{count - answeredCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Flagged</span>
          <span className="text-amber-400 font-semibold">{markedCount}</span>
        </div>
      </div>
    </div>
  );
}

