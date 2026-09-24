import { useParams, useNavigate, Link } from 'react-router-dom';
import { PAPERS, PaperId } from '../types';
import { ArrowLeft, Clock, BookOpen, AlertTriangle, CheckSquare } from 'lucide-react';

export default function TestInstructionsPage() {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const paper = PAPERS.find(p => p.id === paperId);

  if (!paper) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Paper not found.</p>
          <Link to="/test-selection" className="btn-primary">Back to Selection</Link>
        </div>
      </div>
    );
  }

  const diffColors = {
    Easy:   { badge: 'bg-green-900 text-green-300' },
    Medium: { badge: 'bg-yellow-900 text-yellow-300' },
    Hard:   { badge: 'bg-red-900 text-red-300' },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/test-selection" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">{paper.label}</h1>
            <p className="text-xs text-slate-400">Test Instructions</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Paper Info */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className={`${diffColors[paper.difficulty].badge} text-xs font-bold px-3 py-1 rounded-full`}>
              {paper.difficulty.toUpperCase()}
            </span>
            <span className="text-slate-500 text-sm">Round 1 — Written Test</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">{paper.label}</h2>
          <p className="text-slate-400 mb-6">{paper.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-bold text-xl">{paper.questionCount}</div>
                <div className="text-slate-400 text-sm">Questions</div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-white font-bold text-xl">{paper.durationMinutes} min</div>
                <div className="text-slate-400 text-sm">Time Limit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-blue-400" />
            Instructions
          </h3>
          <ul className="space-y-3 text-slate-300">
            {[
              `This test contains ${paper.questionCount} questions across multiple categories.`,
              `You have ${paper.durationMinutes} minutes to complete the test. The timer starts immediately when you click "Start Test".`,
              'Each question carries 1 mark. There is no negative marking.',
              'You can navigate freely between questions using the question navigator or Previous/Next buttons.',
              'Use "Mark for Review" to flag questions you want to revisit later.',
              'The test auto-submits when the timer reaches zero.',
              'You can review all answers with explanations after submission.',
              'Do not refresh or close the browser during the test.',
              'Question types include: MCQ, output tracing, code debugging, SQL analysis, aptitude, and scenario questions.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-900/50 text-blue-400 text-xs rounded-full flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-amber-900/20 border border-amber-700/40 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-amber-200 text-sm">
            <strong>Academic Integrity:</strong> This is a practice simulator. Answer honestly to get
            accurate feedback on your preparation level. Switching browser tabs during the test will
            be tracked as a warning.
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => navigate(`/test/${paperId}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-blue-900/40"
        >
          Start Test — {paper.label}
        </button>

        <p className="text-center text-slate-500 text-sm mt-3">
          Timer begins immediately after clicking Start Test.
        </p>
      </main>
    </div>
  );
}
