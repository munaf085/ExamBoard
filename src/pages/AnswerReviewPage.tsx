import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getResultById, getSession } from '../utils/storage';
import { getQuestionsForPaper } from '../data/index';
import { isCorrect } from '../utils/scoring';
import { WrittenQuestion, PaperId } from '../types';
import { CheckCircle, XCircle, MinusCircle, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

export default function AnswerReviewPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const result = sessionId ? getResultById(sessionId) : null;

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Result not found. <Link to="/" className="text-blue-400">Go home</Link></p>
      </div>
    );
  }

  const session = getSession(result.paperId);
  const questions = getQuestionsForPaper(result.paperId as PaperId);
  const answers = session?.answers || {};

  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');

  const filteredQuestions = questions.filter(q => {
    const ans = answers[q.id];
    const unanswered = ans === null || ans === undefined;
    const correct = !unanswered && isCorrect(q, ans);

    if (filter === 'correct') return correct;
    if (filter === 'incorrect') return !correct && !unanswered;
    if (filter === 'unanswered') return unanswered;
    return true;
  });

  const correct = questions.filter(q => {
    const ans = answers[q.id];
    return ans !== null && ans !== undefined && isCorrect(q, ans);
  }).length;
  const incorrect = questions.filter(q => {
    const ans = answers[q.id];
    return ans !== null && ans !== undefined && !isCorrect(q, ans);
  }).length;
  const unanswered = questions.filter(q => answers[q.id] === null || answers[q.id] === undefined).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to={`/result/${sessionId}`} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">Answer Review — {result.paperLabel}</h1>
            <p className="text-xs text-slate-400">{result.score}/{result.total} correct</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-6">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all',        label: `All (${questions.length})`,      cls: 'bg-blue-600' },
            { key: 'correct',    label: `Correct (${correct})`,           cls: 'bg-green-700' },
            { key: 'incorrect',  label: `Incorrect (${incorrect})`,       cls: 'bg-red-700' },
            { key: 'unanswered', label: `Unanswered (${unanswered})`,     cls: 'bg-slate-600' },
          ].map(({ key, label, cls }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === key ? `${cls} text-white` : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, i) => (
            <ReviewCard
              key={q.id}
              question={q}
              index={questions.indexOf(q)}
              answer={answers[q.id]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

interface ReviewCardProps {
  question: WrittenQuestion;
  index: number;
  answer: number | number[] | null | undefined;
}

function ReviewCard({ question: q, index, answer }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const unanswered = answer === null || answer === undefined;
  const correct = !unanswered && isCorrect(q, answer);

  const status = unanswered ? 'unanswered' : correct ? 'correct' : 'incorrect';

  const statusConfig = {
    correct:    { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-400', border: 'border-green-700/40', bg: 'bg-green-900/10', label: 'Correct' },
    incorrect:  { icon: <XCircle className="w-4 h-4" />,     color: 'text-red-400',   border: 'border-red-700/40',   bg: 'bg-red-900/10',   label: 'Incorrect' },
    unanswered: { icon: <MinusCircle className="w-4 h-4" />, color: 'text-slate-400', border: 'border-slate-700',   bg: 'bg-slate-800/40', label: 'Unanswered' },
  }[status];

  const getAnswerLabel = (ans: number | number[] | null | undefined): string => {
    if (ans === null || ans === undefined) return '—';
    if (Array.isArray(ans)) return ans.map(a => String.fromCharCode(65 + a)).join(', ');
    return String.fromCharCode(65 + ans);
  };

  const getCorrectLabel = (): string => {
    if (Array.isArray(q.correctAnswer)) return q.correctAnswer.map(a => String.fromCharCode(65 + a)).join(', ');
    return String.fromCharCode(65 + q.correctAnswer);
  };

  return (
    <div className={`${statusConfig.bg} border ${statusConfig.border} rounded-xl overflow-hidden`}>
      {/* Summary Row */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
      >
        <span className={statusConfig.color}>{statusConfig.icon}</span>
        <span className="text-slate-400 text-sm font-medium w-10 flex-shrink-0">Q{index + 1}</span>
        <span className="text-slate-300 text-sm flex-1 truncate">{q.question}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs font-bold ${statusConfig.color}`}>{statusConfig.label}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-700/50 pt-4 space-y-4">
          <p className="text-white text-sm leading-relaxed">{q.question}</p>

          {q.code && (
            <div className="code-block text-xs">{q.code}</div>
          )}

          {/* Options */}
          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              const isCorrectOpt = Array.isArray(q.correctAnswer)
                ? q.correctAnswer.includes(idx)
                : q.correctAnswer === idx;

              const userSelected = Array.isArray(answer)
                ? answer.includes(idx)
                : answer === idx;

              let cls = 'bg-slate-800 border-slate-600 text-slate-300';
              if (isCorrectOpt) cls = 'bg-green-900/40 border-green-600 text-green-200';
              else if (userSelected && !isCorrectOpt) cls = 'bg-red-900/40 border-red-600 text-red-200';

              return (
                <div key={idx} className={`flex items-start gap-2 text-sm p-3 rounded-lg border ${cls}`}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                  {isCorrectOpt && <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />}
                  {userSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Answer Summary */}
          <div className="bg-slate-900/60 rounded-lg p-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-slate-400 mb-1">Your Answer</div>
              <div className={`font-bold ${unanswered ? 'text-slate-400' : correct ? 'text-green-400' : 'text-red-400'}`}>
                {getAnswerLabel(answer)}
              </div>
            </div>
            <div>
              <div className="text-slate-400 mb-1">Correct Answer</div>
              <div className="text-green-400 font-bold">{getCorrectLabel()}</div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <div className="text-blue-400 text-xs font-bold uppercase mb-1.5">Explanation</div>
            <p className="text-blue-100 text-sm leading-relaxed">{q.explanation}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500">
            <span>Category: {q.category}</span>
            <span>•</span>
            <span>Difficulty: {q.difficulty}</span>
            <span>•</span>
            <span>Type: {q.type}</span>
          </div>
        </div>
      )}
    </div>
  );
}
