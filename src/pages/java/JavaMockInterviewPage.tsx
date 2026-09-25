import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle, X, ChevronRight, BookOpen, Repeat } from 'lucide-react';
import { JavaInterviewQuestion } from '../../types';
import { markInterviewReviewed } from '../../utils/javaStorage';

// Fallback data
const FALLBACK_QUESTIONS: JavaInterviewQuestion[] = [
  {
    id: 'int-1',
    moduleId: 'java-fundamentals',
    question: 'How does the JVM handle memory management?',
    expectedAnswer: 'The JVM divides memory into several regions, primarily the Heap (for objects) and Stack (for method frames and local variables). It uses Garbage Collection to automatically reclaim memory from objects that are no longer referenced.',
    keyPoints: [
      'Heap space for objects',
      'Stack space for threads/local variables',
      'Garbage Collection (Minor/Major GC)',
      'Metaspace (formerly PermGen) for class metadata'
    ],
    difficulty: 'Medium',
    type: 'how',
    tags: ['jvm', 'memory'],
    followUps: ['Can you force Garbage Collection?', 'What is a memory leak in Java?'],
  },
  {
    id: 'int-2',
    moduleId: 'java-strings',
    question: 'Explain the String pool and why Strings are immutable.',
    expectedAnswer: 'The String pool is a special memory region in the Heap. When creating a String literal, JVM checks the pool first and returns the reference if it exists, saving memory. Strings are immutable so they can be safely shared in the pool, used as secure hash keys, and are inherently thread-safe.',
    keyPoints: [
      'Memory optimization via sharing',
      'Security (DB connections, class loading)',
      'Thread safety',
      'Hashcode caching performance'
    ],
    difficulty: 'Medium',
    type: 'why',
    tags: ['strings', 'memory'],
    followUps: ['What happens when you use new String("abc")?', 'Difference between StringBuilder and StringBuffer?'],
  },
  {
    id: 'int-3',
    moduleId: 'java-oop-basics',
    question: 'Difference between abstract class and interface in Java 8+?',
    expectedAnswer: 'Abstract classes can have state (instance variables) and constructors, while interfaces cannot. A class can implement multiple interfaces but extend only one abstract class. Since Java 8, interfaces can have default and static methods.',
    keyPoints: [
      'Multiple inheritance (Interfaces) vs Single (Abstract class)',
      'State/Instance variables (Abstract class only)',
      'Constructors (Abstract class only)',
      'Default/Static methods in Interfaces (Java 8+)'
    ],
    difficulty: 'Medium',
    type: 'difference',
    tags: ['oop', 'interfaces'],
    followUps: ['When would you choose an abstract class over an interface?'],
  }
];

let interviewQuestions: JavaInterviewQuestion[] = [];
try {
  // @ts-ignore
  const data = require('../../data/java/interviews/javaRound2Questions');
  interviewQuestions = data.javaRound2Questions || FALLBACK_QUESTIONS;
} catch (e) {
  interviewQuestions = FALLBACK_QUESTIONS;
}

type ResponseLevel = 'know' | 'partial' | 'dont-know' | null;

const JavaMockInterviewPage: React.FC = () => {
  const [questions, setQuestions] = useState<JavaInterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState<ResponseLevel>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<Record<string, ResponseLevel>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Randomize for the session
    const shuffled = [...interviewQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled.length > 0 ? shuffled : FALLBACK_QUESTIONS);
  }, []);

  const handleResponse = (level: ResponseLevel) => {
    setResponse(level);
    setShowAnswer(true);
    setResults(prev => ({ ...prev, [questions[currentIndex].id]: level }));
    markInterviewReviewed(questions[currentIndex].id);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setResponse(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) return <div className="p-8 text-center bg-slate-900 min-h-screen">Loading...</div>;

  if (isFinished) {
    const scores = Object.values(results);
    const strong = scores.filter(s => s === 'know').length;
    const partial = scores.filter(s => s === 'partial').length;
    const weak = scores.filter(s => s === 'dont-know').length;
    
    // Find weak topics
    const weakModules = new Set<string>();
    Object.entries(results).forEach(([qId, res]) => {
      if (res === 'dont-know' || res === 'partial') {
        const q = questions.find(q => q.id === qId);
        if (q) weakModules.add(q.moduleId);
      }
    });

    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-3xl bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Interview Simulation Complete</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-900 border border-green-900/50 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{strong}</div>
              <div className="text-sm text-slate-400">Strong Areas</div>
            </div>
            <div className="bg-slate-900 border border-yellow-900/50 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{partial}</div>
              <div className="text-sm text-slate-400">Need Review</div>
            </div>
            <div className="bg-slate-900 border border-red-900/50 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">{weak}</div>
              <div className="text-sm text-slate-400">Weak Areas</div>
            </div>
          </div>

          {weakModules.size > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-400" /> Recommended Topics to Revise
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(weakModules).map(mod => (
                  <Link key={mod} to={`/java/module/${mod}`} className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-600">
                    {mod}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              <Repeat className="w-5 h-5" /> Try Again
            </button>
            <Link to="/java/revision" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors">
              <BookOpen className="w-5 h-5" /> Go to Revision Mode
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/java" className="text-slate-400 hover:text-white transition-colors flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" /> End Interview
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-slate-400">
              Q {currentIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex gap-2 mb-4">
              <span className="bg-blue-900/40 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-800/50">
                {currentQ.difficulty}
              </span>
              <span className="bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded-full">
                {currentQ.moduleId}
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
              {currentQ.question}
            </h2>

            {!showAnswer ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleResponse('know')}
                  className="flex flex-col items-center justify-center p-6 bg-slate-900 hover:bg-green-900/20 border-2 border-slate-700 hover:border-green-500 rounded-xl transition-all group"
                >
                  <Check className="w-10 h-10 text-slate-500 group-hover:text-green-500 mb-2" />
                  <span className="font-bold text-lg group-hover:text-green-400">I Know This</span>
                </button>
                <button
                  onClick={() => handleResponse('partial')}
                  className="flex flex-col items-center justify-center p-6 bg-slate-900 hover:bg-yellow-900/20 border-2 border-slate-700 hover:border-yellow-500 rounded-xl transition-all group"
                >
                  <AlertCircle className="w-10 h-10 text-slate-500 group-hover:text-yellow-500 mb-2" />
                  <span className="font-bold text-lg group-hover:text-yellow-400">Partially Know</span>
                </button>
                <button
                  onClick={() => handleResponse('dont-know')}
                  className="flex flex-col items-center justify-center p-6 bg-slate-900 hover:bg-red-900/20 border-2 border-slate-700 hover:border-red-500 rounded-xl transition-all group"
                >
                  <X className="w-10 h-10 text-slate-500 group-hover:text-red-500 mb-2" />
                  <span className="font-bold text-lg group-hover:text-red-400">Don't Know</span>
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 mb-6">
                  <h3 className="text-lg font-bold text-slate-300 mb-3 uppercase tracking-wider text-xs">Expected Answer</h3>
                  <p className="text-lg text-slate-200 leading-relaxed mb-6">{currentQ.expectedAnswer}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Key Points to Mention
                      </h4>
                      <ul className="space-y-2">
                        {currentQ.keyPoints.map((kp, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                            <span className="text-slate-500 mt-1">â€¢</span> {kp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {currentQ.followUps && (
                      <div>
                        <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" /> Potential Follow-ups
                        </h4>
                        <ul className="space-y-2">
                          {currentQ.followUps.map((fu, i) => (
                            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                              <span className="text-slate-500 mt-1">â†³</span> {fu}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    You answered: <strong className={
                      response === 'know' ? 'text-green-400' : 
                      response === 'partial' ? 'text-yellow-400' : 'text-red-400'
                    }>{
                      response === 'know' ? 'I Know This' : 
                      response === 'partial' ? 'Partially Know' : 'Don\'t Know'
                    }</strong>
                  </div>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next Question <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaMockInterviewPage;

