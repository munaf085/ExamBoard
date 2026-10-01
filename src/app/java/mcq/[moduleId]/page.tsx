'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle, XCircle, ArrowLeft,
  RefreshCw, Star, ChevronRight, Award
} from 'lucide-react';
import { JavaMCQ } from '@/types';
import { recordMcqResult, updateWeakStrong } from '@/utils/javaStorage';
import { JAVA_MCQ_MAP, ALL_JAVA_MCQS } from '@/data/java/index';
import CopyButton from '@/components/CopyButton';

// ─────────────────────────────────────────────────────────────
// MODULE LABEL MAP
// ─────────────────────────────────────────────────────────────
const MODULE_LABELS: Record<string, string> = {
  'java-fundamentals': '☕ Java Fundamentals',
  'java-data-types':   '📊 Data Types & Variables',
  'java-operators':    '⚡ Operators',
  'java-control-flow': '🔀 Decision Making & Branching',
  'java-loops':        '🔄 Loops & Iterations',
  'java-strings':      '📝 Strings',
  'java-arrays':       '📦 Arrays',
  'java-methods':      '🔧 Methods & Recursion',
  'java-oop-basics':   '🏗️ OOP Basics',
  'java-inheritance':  '🌳 Inheritance',
  'java-abstraction':  '🛡️ Abstraction & Interfaces',
  'java-exceptions':   '⚡ Exception Handling',
  'java-collections':  '📚 Collections',
  'java-streams':      '💨 Streams & Lambdas',
};

// ─────────────────────────────────────────────────────────────
// BUILT-IN QUESTIONS (so basics always work even without files)
// ─────────────────────────────────────────────────────────────
const BUILTIN_QUESTIONS: Record<string, JavaMCQ[]> = {
  'java-fundamentals': [
    { id: 'fund-1', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['jvm'],
      question: 'Which component is responsible for executing Java bytecode?',
      options: ['JDK', 'JRE', 'JVM', 'javac'],
      correctAnswer: 2,
      explanation: 'The JVM (Java Virtual Machine) executes bytecode. JDK is the full development kit, JRE is the runtime environment (JVM + libraries), and javac is the compiler.' },
    { id: 'fund-2', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['compilation'],
      question: 'What file extension does the Java compiler produce?',
      options: ['.java', '.exe', '.class', '.bin'],
      correctAnswer: 2,
      explanation: 'javac compiles .java source files into .class bytecode files. The .class file contains platform-neutral bytecode executed by the JVM.' },
    { id: 'fund-3', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['main'],
      question: 'Which of the following is the correct signature for the main method?',
      options: [
        'public void main(String args)',
        'public static void main(String[] args)',
        'static void main(String args[])',
        'public static int main(String[] args)'
      ],
      correctAnswer: 1,
      explanation: 'The exact required signature is: public static void main(String[] args). It must be public (accessible by JVM), static (no instance needed), void (no return), and accept a String array.' },
    { id: 'fund-4', moduleId: 'java-fundamentals', difficulty: 'Medium', type: 'output', tags: ['print'],
      question: 'What is the output of: System.out.print("A"); System.out.println("B"); System.out.print("C");',
      options: ['A B C', 'AB\nC', 'A\nB\nC', 'ABC'],
      correctAnswer: 1,
      explanation: 'System.out.print("A") prints A without newline. println("B") prints B and moves to new line. print("C") prints C on the next line. Result is AB on line 1, C on line 2.' },
    { id: 'fund-5', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['naming'],
      question: 'Which identifier is INVALID in Java?',
      options: ['_myVar', '$price', '2ndPlace', 'userName_1'],
      correctAnswer: 2,
      explanation: 'Java identifiers cannot begin with a digit. 2ndPlace starts with 2, which causes a compile error. Identifiers may start with a letter, underscore (_), or dollar sign ($).' },
  ],
  'java-data-types': [
    { id: 'dt-1', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['primitives'],
      question: 'How many primitive data types exist in Java?',
      options: ['6', '7', '8', '10'],
      correctAnswer: 2,
      explanation: 'Java has exactly 8 primitive types: byte, short, int, long, float, double, boolean, and char. String is a class/reference type, not a primitive.' },
    { id: 'dt-2', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['sizes'],
      question: 'What is the size of an int in Java?',
      options: ['2 bytes (16 bits)', '4 bytes (32 bits)', '8 bytes (64 bits)', 'Platform-dependent'],
      correctAnswer: 1,
      explanation: 'In Java, an int is ALWAYS 4 bytes (32 bits), regardless of the operating system or architecture. This ensures WORA (Write Once, Run Anywhere).' },
    { id: 'dt-3', moduleId: 'java-data-types', difficulty: 'Medium', type: 'output', tags: ['overflow'],
      question: 'What is the value of: byte b = 127; b++; System.out.println(b);',
      options: ['128', '-128', 'Compile error', 'Runtime exception'],
      correctAnswer: 1,
      explanation: 'byte ranges from -128 to 127. When 127 is incremented with ++, it overflows in two\'s complement binary to -128. Note: b = b + 1 would cause compile error without cast, but b++ includes an implicit cast.' },
    { id: 'dt-4', moduleId: 'java-data-types', difficulty: 'Medium', type: 'syntax', tags: ['literals'],
      question: 'Which of the following float declarations requires an \'f\' or \'F\' suffix?',
      options: ['float f = 10;', 'float f = 3.14;', 'float f = 0;', 'float f = -5;'],
      correctAnswer: 1,
      explanation: 'In Java, 3.14 without a suffix is a double literal (8 bytes). Assigning double to float (4 bytes) loses precision, causing a compile error unless written as 3.14f or 3.14F. Integer literals (10, 0, -5) can be implicitly widened to float.' },
    { id: 'dt-5', moduleId: 'java-data-types', difficulty: 'Hard', type: 'output', tags: ['char'],
      question: 'What is the output of: char c = \'A\'; System.out.println(c + 1);',
      options: ['B', '66', 'A1', 'Compile error'],
      correctAnswer: 1,
      explanation: 'In arithmetic expressions (c + 1), char is promoted to int. The ASCII/Unicode value of \'A\' is 65. 65 + 1 = 66, which is printed as an integer. To print \'B\', you must explicitly cast: (char)(c + 1).' },
  ],
  'java-operators': [
    { id: 'op-1', moduleId: 'java-operators', difficulty: 'Medium', type: 'output', tags: ['pre-post'],
      question: 'int x = 5; int y = x++ + ++x; What are x and y?',
      options: ['x = 7, y = 12', 'x = 7, y = 11', 'x = 6, y = 12', 'x = 7, y = 13'],
      correctAnswer: 0,
      explanation: 'Step 1: x++ evaluates to 5 (post-increment, x becomes 6). Step 2: ++x pre-increments x from 6 to 7 and evaluates to 7. Step 3: y = 5 + 7 = 12. Final x = 7, y = 12.' },
    { id: 'op-2', moduleId: 'java-operators', difficulty: 'Easy', type: 'conceptual', tags: ['short-circuit'],
      question: 'What is the difference between && and & in boolean expressions?',
      options: [
        '&& evaluates both sides; & is short-circuit',
        '&& is short-circuit; & evaluates both sides always',
        'They are completely identical',
        '&& is bitwise; & is logical'
      ],
      correctAnswer: 1,
      explanation: '&& is the short-circuit logical AND: if the left operand is false, the right operand is NOT evaluated. & is the non-short-circuit logical AND (or bitwise AND): both operands are always evaluated, which can cause NullPointerExceptions if checking null on the left.' },
    { id: 'op-3', moduleId: 'java-operators', difficulty: 'Medium', type: 'output', tags: ['ternary'],
      question: 'What is the output of: int a = 10, b = 20; int min = (a < b) ? a : b; System.out.println(min);',
      options: ['10', '20', 'true', 'Compile error'],
      correctAnswer: 0,
      explanation: 'The condition (10 < 20) is true, so the ternary operator evaluates and returns the expression after ? which is a (10).' },
    { id: 'op-4', moduleId: 'java-operators', difficulty: 'Hard', type: 'output', tags: ['bitwise'],
      question: 'What is the result of 8 >> 2 and 8 << 2?',
      options: ['4 and 16', '2 and 32', '2 and 16', '4 and 32'],
      correctAnswer: 1,
      explanation: 'Right shift (8 >> 2) divides by 2^2 = 8 / 4 = 2. Left shift (8 << 2) multiplies by 2^2 = 8 * 4 = 32.' },
    { id: 'op-5', moduleId: 'java-operators', difficulty: 'Easy', type: 'syntax', tags: ['instanceof'],
      question: 'What does the instanceof operator do in Java?',
      options: [
        'Creates a new instance of a class',
        'Tests if an object is an instance of a specific class or interface',
        'Returns the memory address of an object',
        'Compares two objects for equality'
      ],
      correctAnswer: 1,
      explanation: 'instanceof checks whether the object referenced by the variable is an instance of the specified class, subclass, or interface at runtime. It returns a boolean.' },
  ],
  'java-control-flow': [
    { id: 'cf-1', moduleId: 'java-control-flow', difficulty: 'Easy', type: 'conceptual', tags: ['switch'],
      question: 'Which of the following types CANNOT be used in a switch expression prior to Java 21 pattern matching?',
      options: ['int', 'String', 'double', 'enum'],
      correctAnswer: 2,
      explanation: 'float and double (and boolean) cannot be used in a standard switch statement because floating-point representation involves precision issues that make exact equality matching unreliable.' },
    { id: 'cf-2', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'output', tags: ['fall-through'],
      question: 'What is the output if x = 2 and no break statements are used in case 2 and 3?\nswitch(x) { case 2: System.out.print("A"); case 3: System.out.print("B"); default: System.out.print("C"); }',
      options: ['A', 'AB', 'ABC', 'Compile error'],
      correctAnswer: 2,
      explanation: 'Without break statements, switch exhibits fall-through execution. When x=2 matches, it prints "A", then falls through to case 3 printing "B", then falls through to default printing "C". Total output: "ABC".' },
    { id: 'cf-3', moduleId: 'java-control-flow', difficulty: 'Easy', type: 'conceptual', tags: ['while'],
      question: 'Which loop is guaranteed to execute its body at least once?',
      options: ['for loop', 'while loop', 'do-while loop', 'for-each loop'],
      correctAnswer: 2,
      explanation: 'A do-while loop evaluates its condition AT THE END of the iteration, guaranteeing that the body executes at least once even if the condition is initially false.' },
    { id: 'cf-4', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'output', tags: ['break-continue'],
      question: 'What is the output of: for(int i=0; i<5; i++) { if(i==2) continue; if(i==4) break; System.out.print(i); }',
      options: ['013', '01234', '0134', '01'],
      correctAnswer: 0,
      explanation: 'i=0: prints 0. i=1: prints 1. i=2: continue skips the print. i=3: prints 3. i=4: break terminates the loop immediately. Output is 013.' },
    { id: 'cf-5', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'conceptual', tags: ['scoping'],
      question: 'What happens if a variable declared inside an if-block is accessed outside that block?',
      options: [
        'It has a default value (0 or null)',
        'Compile error: variable cannot be resolved',
        'Runtime exception: ScopeException',
        'It retains the value from the if-block'
      ],
      correctAnswer: 1,
      explanation: 'Variables in Java have block scope delimited by {}. A variable declared inside an if-block ceases to exist once the block closes. Accessing it outside produces a compile-time error.' },
  ],
};

export default function JavaMCQPage() {
  const params = useParams();
  const moduleId = (params?.moduleId as string) || 'java-fundamentals';

  // Get questions: prefer real question bank, fall back to built-ins or ALL_JAVA_MCQS
  const questions = useMemo<JavaMCQ[]>(() => {
    const real = JAVA_MCQ_MAP[moduleId] || [];
    const builtin = BUILTIN_QUESTIONS[moduleId] || [];
    let all = [...builtin, ...real];
    if (all.length === 0) {
      all = ALL_JAVA_MCQS.slice(0, 15);
    }
    // deduplicate by id
    const seen = new Set<string>();
    return all.filter(q => { if (seen.has(q.id)) return false; seen.add(q.id); return true; });
  }, [moduleId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<JavaMCQ[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[currentIdx];
  const label = MODULE_LABELS[moduleId] || moduleId;

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    const correct = idx === q.correctAnswer;
    recordMcqResult(q.id, correct);
    if (correct) {
      setScore(s => s + 1);
    } else {
      setWrong(prev => [...prev, q]);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      const finalScore = selected === q?.correctAnswer ? score + 1 : score;
      updateWeakStrong(moduleId, Math.round((finalScore / questions.length) * 100));
      setDone(true);
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
    setWrong([]);
    setDone(false);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No questions found for this module.</p>
          <Link href={`/java/module/${moduleId}`} className="text-blue-400 underline">← Back to Learn</Link>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ──
  if (done) {
    const finalScore = score;
    const pct = Math.round((finalScore / questions.length) * 100);
    const grade = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good job!' : 'Keep practicing!';
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 text-center mb-6">
            <Award className={`w-16 h-16 mx-auto mb-4 ${pct >= 80 ? 'text-yellow-400' : pct >= 60 ? 'text-blue-400' : 'text-slate-500'}`} />
            <h1 className="text-3xl font-extrabold text-white mb-1">{grade}</h1>
            <p className="text-slate-400 mb-6">{label}</p>
            <div className="text-6xl font-black mb-2" style={{ color: pct >= 80 ? '#4ade80' : pct >= 60 ? '#60a5fa' : '#f87171' }}>
              {pct}%
            </div>
            <p className="text-slate-400">{finalScore} / {questions.length} correct</p>
            <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
              <div className="h-3 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#4ade80' : pct >= 60 ? '#60a5fa' : '#f87171' }} />
            </div>
          </div>

          {wrong.length > 0 && (
            <div className="bg-slate-800 rounded-xl border border-red-500/20 p-5 mb-4">
              <h2 className="font-bold text-red-400 mb-3">❌ Review Wrong Answers ({wrong.length})</h2>
              <div className="space-y-3">
                {wrong.map((wq, i) => (
                  <div key={i} className="bg-slate-900/60 rounded-lg p-4 text-sm">
                    <p className="font-medium text-slate-200 mb-2">{wq.question}</p>
                    <p className="text-green-400">✓ {wq.options[wq.correctAnswer as number]}</p>
                    <p className="text-slate-400 mt-2 text-xs">{wq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 flex-wrap">
            <button onClick={handleRestart}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <Link href={`/java/module/${moduleId}`}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Lesson
            </Link>
            <Link href="/java"
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              Java Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ──
  const isCorrect = selected === q.correctAnswer;
  const progress = Math.round(((currentIdx) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href={`/java/module/${moduleId}`}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Lesson
          </Link>
          <span className="text-sm text-slate-400 font-medium">
            Question {currentIdx + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
          <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Module label & difficulty */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-slate-400">{label}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            q.difficulty === 'Easy' ? 'bg-green-900/40 text-green-400' :
            q.difficulty === 'Hard' ? 'bg-red-900/40 text-red-400' :
            'bg-yellow-900/40 text-yellow-400'
          }`}>{q.difficulty}</span>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-5">
          <div className="flex items-start justify-between gap-4 mb-2">
            <p className="text-lg font-semibold text-white leading-relaxed whitespace-pre-wrap">{q.question}</p>
            <CopyButton
              text={`${q.question}${q.code ? `\n\n${q.code}` : ''}\n\nOptions:\n${q.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}${showAnswer ? `\n\nCorrect Answer: ${q.options[q.correctAnswer]}\nExplanation: ${q.explanation}` : ''}`}
              label="Copy Question"
              className="shrink-0"
            />
          </div>
          {q.code && (
            <div className="mt-4">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-700/60">
                <span className="text-[11px] font-mono text-slate-400">Java Code</span>
                <CopyButton text={q.code} label="Copy Code" />
              </div>
              <pre className="bg-slate-950 text-green-300 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap border border-slate-700">
                {q.code}
              </pre>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid gap-3 mb-5">
          {q.options.map((opt, i) => {
            let style = 'bg-slate-800 border-slate-700 hover:border-indigo-400 hover:bg-slate-700';
            if (showAnswer) {
              if (i === q.correctAnswer) style = 'bg-green-900/30 border-green-500';
              else if (i === selected && !isCorrect) style = 'bg-red-900/30 border-red-500';
              else style = 'bg-slate-800 border-slate-700 opacity-50';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showAnswer}
                className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${style}`}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
                {showAnswer && i === q.correctAnswer && <CheckCircle className="ml-auto w-4 h-4 text-green-400" />}
                {showAnswer && i === selected && !isCorrect && i !== q.correctAnswer && <XCircle className="ml-auto w-4 h-4 text-red-400" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && (
          <div className={`rounded-xl p-4 mb-5 border text-sm ${isCorrect ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-slate-300">{q.explanation}</p>
          </div>
        )}

        {/* Score & Next */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-400">Score: <span className="text-white font-bold">{score}</span></span>
          </div>
          {showAnswer && (
            <button onClick={handleNext}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
              {currentIdx + 1 >= questions.length ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
