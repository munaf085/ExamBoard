import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';
import { JavaMCQ } from '../../types';
import { recordMcqResult, updateWeakStrong } from '../../utils/javaStorage';
import { JAVA_MODULES } from '../../data/java/curriculum';

const FALLBACK_QUESTIONS: JavaMCQ[] = [
  {
    id: 'fallback-1',
    moduleId: 'any',
    question: 'Which keyword is used to create an object in Java?',
    options: ['create', 'new', 'make', 'object'],
    correctAnswer: 1,
    explanation: 'The "new" keyword allocates memory for the object on the heap and invokes the constructor.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['java', 'basics']
  },
  {
    id: 'fallback-2',
    moduleId: 'any',
    question: 'What is the size of int variable in Java?',
    options: ['8 bit', '16 bit', '32 bit', '64 bit'],
    correctAnswer: 2,
    explanation: 'In Java, an int is a 32-bit signed two\'s complement integer.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['java', 'data-types']
  },
  {
    id: 'fallback-3',
    moduleId: 'any',
    question: 'Which of the following is not an OOPS concept in Java?',
    options: ['Polymorphism', 'Inheritance', 'Compilation', 'Encapsulation'],
    correctAnswer: 2,
    explanation: 'Compilation is a process, not an Object-Oriented Programming (OOP) concept. The four main concepts are Abstraction, Encapsulation, Inheritance, and Polymorphism.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['java', 'oop']
  },
  {
    id: 'fallback-4',
    moduleId: 'any',
    question: 'What is the default value of a boolean variable in Java?',
    options: ['true', 'false', 'null', '0'],
    correctAnswer: 1,
    explanation: 'The default value of a boolean primitive type in Java is false.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['java', 'data-types']
  },
  {
    id: 'fallback-5',
    moduleId: 'any',
    question: 'Which of these cannot be used for a variable name in Java?',
    options: ['identifier', 'keyword', 'identifier & keyword', 'none of the mentioned'],
    correctAnswer: 1,
    explanation: 'Keywords are reserved words in Java and cannot be used as variable names.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['java', 'basics']
  }
];

const JavaMCQPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [questions, setQuestions] = useState<JavaMCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<JavaMCQ[]>([]);

  const module = JAVA_MODULES.find(m => m.id === moduleId);

  useEffect(() => {
    // In a real app, we'd fetch questions by moduleId
    // For now, we use fallbacks
    setQuestions(FALLBACK_QUESTIONS);
  }, [moduleId]);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const currentQ = questions[currentIndex];
    const isCorrect = index === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setWrongQuestions(prev => [...prev, currentQ]);
    }
    
    recordMcqResult(currentQ.id, isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      if (moduleId) {
        const accuracy = Math.round((score / questions.length) * 100);
        updateWeakStrong(moduleId, accuracy);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
    setWrongQuestions([]);
  };

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-300 min-h-screen bg-slate-900">Loading questions...</div>;
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
          
          <div className="mb-8">
            <div className="text-6xl font-bold text-blue-400 mb-2">{percentage}%</div>
            <p className="text-xl text-slate-300">You scored {score} out of {questions.length}</p>
          </div>

          {wrongQuestions.length > 0 && (
            <div className="text-left mb-8 bg-slate-900 p-6 rounded-lg border border-slate-700">
              <h3 className="text-xl font-bold mb-4 text-orange-400">Areas for Review:</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                {wrongQuestions.map((wq, i) => (
                  <li key={i} className="border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-slate-200 mb-1">{wq.question}</p>
                    <p className="text-green-400">Correct Answer: {wq.options[wq.correctAnswer]}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button onClick={restartQuiz} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              <RefreshCw className="w-5 h-5" /> Try Again
            </button>
            <Link to={`/java/module/${moduleId}`} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors">
              <BookOpen className="w-5 h-5" /> Back to Module
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to={`/java/module/${moduleId}`} className="text-slate-400 hover:text-white transition-colors flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </Link>
          <div className="text-sm font-semibold bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 md:p-8 shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-800/50">
              {currentQ.difficulty}
            </span>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>

          {currentQ.code && (
            <pre className="bg-slate-950 p-4 rounded-lg mb-6 border border-slate-700 overflow-x-auto text-green-400 text-sm">
              <code>{currentQ.code}</code>
            </pre>
          )}

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonStyle = "bg-slate-900 border-slate-700 hover:border-blue-500 text-slate-300";
              
              if (showExplanation) {
                if (index === currentQ.correctAnswer) {
                  buttonStyle = "bg-green-900/30 border-green-500 text-green-300";
                } else if (index === selectedAnswer) {
                  buttonStyle = "bg-red-900/30 border-red-500 text-red-300";
                } else {
                  buttonStyle = "bg-slate-900 border-slate-700 opacity-50";
                }
              } else if (index === selectedAnswer) {
                buttonStyle = "bg-blue-900/30 border-blue-500 text-blue-300";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ${buttonStyle}`}
                >
                  <div className="flex items-center">
                    <span className="font-bold mr-4 text-slate-500 w-6">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                  {showExplanation && index === currentQ.correctAnswer && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && <XCircle className="w-5 h-5 text-red-500" />}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className="bg-slate-900 p-5 rounded-lg border border-slate-700 mb-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <span className="text-green-400 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Correct!</span>
                ) : (
                  <span className="text-red-400 flex items-center gap-2"><XCircle className="w-5 h-5" /> Incorrect</span>
                )}
              </h3>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JavaMCQPage;

