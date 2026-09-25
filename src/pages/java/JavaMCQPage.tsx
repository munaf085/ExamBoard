import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle, XCircle, ArrowRight, ArrowLeft,
  RefreshCw, Star, ChevronRight, Award
} from 'lucide-react';
import { JavaMCQ } from '../../types';
import { recordMcqResult, updateWeakStrong } from '../../utils/javaStorage';
import { JAVA_MCQ_MAP, ALL_JAVA_MCQS } from '../../data/java/index';
import CopyButton from '../../components/CopyButton';

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
      explanation: 'print() does not add newline. println() adds a newline. So: print("A") → A, println("B") → B\\n, print("C") → C. Result: AB on first line, C on second.' },
    { id: 'fund-5', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['wora'],
      question: 'Java is called platform-independent because:',
      options: [
        'Java programs are compiled to machine code directly',
        'Java source code runs without compilation',
        'Java bytecode can run on any OS with a JVM installed',
        'Java uses the same operating system libraries everywhere'
      ],
      correctAnswer: 2,
      explanation: 'Java compiles to bytecode (not machine code). Any OS with a JVM installed can execute this bytecode — hence "Write Once, Run Anywhere".' },
    { id: 'fund-6', moduleId: 'java-fundamentals', difficulty: 'Medium', type: 'conceptual', tags: ['jdk-jre-jvm'],
      question: 'Which of the following contains the Java compiler (javac)?',
      options: ['JVM only', 'JRE only', 'JDK only', 'Both JRE and JDK'],
      correctAnswer: 2,
      explanation: 'Only the JDK contains javac (the compiler). JRE only has the JVM and class libraries (to RUN programs). JVM is just the bytecode execution engine.' },
    { id: 'fund-7', moduleId: 'java-fundamentals', difficulty: 'Easy', type: 'conceptual', tags: ['naming'],
      question: 'If a class is named "BankAccount", what must the file be named?',
      options: ['bank_account.java', 'BankAccount.java', 'bankaccount.java', 'Bank.java'],
      correctAnswer: 1,
      explanation: 'The file name must exactly match the public class name, including capitalization. BankAccount.java is required for a public class BankAccount.' },
    { id: 'fund-8', moduleId: 'java-fundamentals', difficulty: 'Hard', type: 'output', tags: ['output'],
      question: 'What is the output?\nSystem.out.println(1 + 2 + "Java" + 3 + 4);',
      options: ['"1234Java"', '"Java1234"', '"3Java34"', '"3Java7"'],
      correctAnswer: 2,
      explanation: 'Java evaluates left to right: 1+2=3 (numeric), then 3+"Java"="3Java" (string concat), then "3Java"+3="3Java3", then "3Java34".' },
  ],
  'java-data-types': [
    { id: 'dt-1', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['primitives'],
      question: 'How many primitive data types does Java have?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 2,
      explanation: 'Java has exactly 8 primitive types: byte, short, int, long, float, double, char, boolean.' },
    { id: 'dt-2', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['default'],
      question: 'What is the default value of an int instance variable in Java?',
      options: ['null', '-1', '1', '0'],
      correctAnswer: 3,
      explanation: 'Instance variables (class fields) of type int have a default value of 0. Local variables have NO default and must be initialized.' },
    { id: 'dt-3', moduleId: 'java-data-types', difficulty: 'Medium', type: 'output', tags: ['casting'],
      question: 'What is the output?\ndouble d = 9.7;\nint i = (int) d;\nSystem.out.println(i);',
      options: ['9.7', '10', '9', 'Error'],
      correctAnswer: 2,
      explanation: 'Narrowing cast from double to int truncates (drops) the decimal part. 9.7 becomes 9. Note: it does NOT round up.' },
    { id: 'dt-4', moduleId: 'java-data-types', difficulty: 'Hard', type: 'output', tags: ['integer-cache'],
      question: 'What is the output?\nInteger a = 127; Integer b = 127;\nSystem.out.println(a == b);\nInteger c = 128; Integer d = 128;\nSystem.out.println(c == d);',
      options: ['true\ntrue', 'false\nfalse', 'true\nfalse', 'false\ntrue'],
      correctAnswer: 2,
      explanation: 'Java caches Integer objects for values -128 to 127. So Integer 127 uses the cached object (a==b is true). 128 is outside the cache, so new objects are created (c==d is false). Always use .equals() for Integer comparison!' },
    { id: 'dt-5', moduleId: 'java-data-types', difficulty: 'Medium', type: 'output', tags: ['overflow'],
      question: 'What is the output?\nbyte b = 127;\nb++;\nSystem.out.println(b);',
      options: ['128', '127', '-128', 'Compilation Error'],
      correctAnswer: 2,
      explanation: 'byte range is -128 to 127. Adding 1 to 127 overflows and wraps around to -128. This is integer overflow behavior in Java.' },
    { id: 'dt-6', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['autoboxing'],
      question: 'What is autoboxing in Java?',
      options: [
        'Manually converting primitive to wrapper class',
        'Automatic conversion from primitive to wrapper class',
        'Converting wrapper class to primitive',
        'Boxing a method return value'
      ],
      correctAnswer: 1,
      explanation: 'Autoboxing is the automatic conversion from a primitive type to its corresponding wrapper class. E.g., Integer i = 5; (int 5 is auto-boxed to Integer). Unboxing is the reverse.' },
    { id: 'dt-7', moduleId: 'java-data-types', difficulty: 'Easy', type: 'conceptual', tags: ['float'],
      question: 'Which suffix is required for a float literal in Java?',
      options: ['d', 'f', 'l', 'No suffix needed'],
      correctAnswer: 1,
      explanation: 'Decimal literals default to double in Java. To create a float, you must add the f (or F) suffix: float f = 3.14f; Without it, 3.14 is a double and assignment would require a cast.' },
    { id: 'dt-8', moduleId: 'java-data-types', difficulty: 'Medium', type: 'output', tags: ['division'],
      question: 'What is the output?\nSystem.out.println(10 / 3);\nSystem.out.println(10 / 3.0);',
      options: ['3\n3.33', '3\n3.3333333333333335', '3.33\n3.33', '3\n3.0'],
      correctAnswer: 1,
      explanation: '10/3 is integer division (both ints) = 3. 10/3.0 has a double operand, so result is double = 3.3333333333333335.' },
  ],
  'java-strings': [
    { id: 'str-1', moduleId: 'java-strings', difficulty: 'Easy', type: 'conceptual', tags: ['immutability'],
      question: 'What happens when you modify a String in Java?',
      options: [
        'The original String is modified in place',
        'A new String object is created',
        'The String is converted to StringBuilder',
        'A NullPointerException is thrown'
      ],
      correctAnswer: 1,
      explanation: 'Strings are immutable in Java. Any "modification" creates a brand new String object. The original is unchanged.' },
    { id: 'str-2', moduleId: 'java-strings', difficulty: 'Medium', type: 'output', tags: ['pool'],
      question: 'What is the output?\nString s1 = "Hello";\nString s2 = "Hello";\nString s3 = new String("Hello");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1 == s3);',
      options: ['true\ntrue', 'false\nfalse', 'true\nfalse', 'false\ntrue'],
      correctAnswer: 2,
      explanation: 's1 and s2 are literals pointing to the same String pool object (== is true). s3 uses new String() which creates a new heap object outside the pool (== is false). Use .equals() to compare content.' },
    { id: 'str-3', moduleId: 'java-strings', difficulty: 'Easy', type: 'output', tags: ['methods'],
      question: 'What is the output?\nString s = "Hello World";\nSystem.out.println(s.length());\nSystem.out.println(s.charAt(6));',
      options: ['11\nW', '10\nW', '11\nw', '10\no'],
      correctAnswer: 0,
      explanation: '"Hello World" has 11 characters (including space). charAt(6) returns \'W\' (index 0=H,1=e,2=l,3=l,4=o,5=space,6=W).' },
    { id: 'str-4', moduleId: 'java-strings', difficulty: 'Medium', type: 'output', tags: ['substring'],
      question: 'What is the output?\nString s = "JavaProgramming";\nSystem.out.println(s.substring(4));\nSystem.out.println(s.substring(4, 11));',
      options: ['Programming\nProgram', 'Programming\nProgram', 'Programm\nProgram', 'Programming\nProgramm'],
      correctAnswer: 0,
      explanation: 'substring(4) returns from index 4 to end: "Programming". substring(4, 11) returns from index 4 to 10 (end is exclusive): "Program" (indices 4-10 = 7 chars).' },
    { id: 'str-5', moduleId: 'java-strings', difficulty: 'Medium', type: 'conceptual', tags: ['stringbuilder'],
      question: 'Which is the best choice for building a string in a loop?',
      options: ['String with + operator', 'StringBuffer always', 'StringBuilder', 'char array'],
      correctAnswer: 2,
      explanation: 'StringBuilder is best for single-threaded string building. String + in a loop creates a new object each iteration (O(n^2) total). StringBuffer is thread-safe but slower. StringBuilder is the fastest.' },
    { id: 'str-6', moduleId: 'java-strings', difficulty: 'Hard', type: 'output', tags: ['concat'],
      question: 'What is the output?\nSystem.out.println("A" + 1 + 2);\nSystem.out.println(1 + 2 + "A");',
      options: ['A12\n3A', 'A3\n3A', '3A\nA12', 'A12\nA12'],
      correctAnswer: 0,
      explanation: 'Java evaluates left to right. "A"+1 = "A1" (string concat), "A1"+2 = "A12". For 1+2+"A": 1+2=3 (numeric), 3+"A"="3A".' },
    { id: 'str-7', moduleId: 'java-strings', difficulty: 'Easy', type: 'conceptual', tags: ['comparison'],
      question: 'Which method should you use to compare String content in Java?',
      options: ['==', '.compareTo()', '.equals()', 'Both .equals() and .compareTo()'],
      correctAnswer: 2,
      explanation: '.equals() compares the actual content of two Strings. == compares object references (memory addresses). Always use .equals() for String content comparison. Use .equalsIgnoreCase() for case-insensitive.' },
    { id: 'str-8', moduleId: 'java-strings', difficulty: 'Medium', type: 'output', tags: ['split'],
      question: 'What is the output?\nString s = "a,b,c,d";\nString[] parts = s.split(",");\nSystem.out.println(parts.length);\nSystem.out.println(parts[2]);',
      options: ['4\nc', '3\nc', '4\nb', '3\nb'],
      correctAnswer: 0,
      explanation: '"a,b,c,d".split(",") produces ["a","b","c","d"] — 4 elements. parts[2] is "c" (0-indexed).' },
  ],
  'java-control-flow': [
    { id: 'cf-1', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'output', tags: ['loop'],
      question: 'What is the output?\nfor(int i=0; i<3; i++) System.out.print(i + " ");',
      options: ['0 1 2 3', '1 2 3', '0 1 2', '1 2 3 4'],
      correctAnswer: 2,
      explanation: 'i starts at 0, runs while i<3 (0,1,2), prints each then adds space. Output: 0 1 2' },
    { id: 'cf-2', moduleId: 'java-control-flow', difficulty: 'Hard', type: 'output', tags: ['switch'],
      question: 'What is the output? (note: no break in case 2)\nint x = 2;\nswitch(x) {\n  case 1: System.out.println("one"); break;\n  case 2: System.out.println("two");\n  case 3: System.out.println("three"); break;\n  default: System.out.println("other");\n}',
      options: ['two', 'two\nthree', 'two\nthree\nother', 'three'],
      correctAnswer: 1,
      explanation: 'Case 2 matches, prints "two". No break, so execution falls through to case 3 and prints "three". Then break exits. Output: two then three.' },
    { id: 'cf-3', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'output', tags: ['do-while'],
      question: 'What is the output?\nint i = 10;\ndo {\n  System.out.println(i);\n  i++;\n} while (i < 5);',
      options: ['Nothing (loop never runs)', '10', '10\n11', 'Infinite loop'],
      correctAnswer: 1,
      explanation: 'do-while always executes the body ONCE before checking the condition. i=10, prints 10, i becomes 11, condition (11<5) is false — loop ends. Output: 10.' },
    { id: 'cf-4', moduleId: 'java-control-flow', difficulty: 'Easy', type: 'conceptual', tags: ['break-continue'],
      question: 'What is the difference between break and continue?',
      options: [
        'break skips current iteration; continue exits loop',
        'break exits the loop; continue skips current iteration',
        'Both exit the current loop',
        'break exits the program; continue skips method'
      ],
      correctAnswer: 1,
      explanation: 'break completely exits the nearest enclosing loop or switch. continue skips the rest of the CURRENT iteration and moves to the next iteration of the loop.' },
    { id: 'cf-5', moduleId: 'java-control-flow', difficulty: 'Hard', type: 'output', tags: ['nested'],
      question: 'What is the output?\nfor(int i=1;i<=3;i++) {\n  for(int j=1;j<=3;j++) {\n    if(j==2) break;\n    System.out.print(i+""+j+" ");\n  }\n}',
      options: ['11 12 13 21 22 23 31 32 33', '11 21 31', '11 21 31 ', '12 22 32'],
      correctAnswer: 2,
      explanation: 'Inner loop breaks when j==2. So for each i, only j=1 prints. Prints 11, 21, 31 with trailing space.' },
    { id: 'cf-6', moduleId: 'java-control-flow', difficulty: 'Medium', type: 'output', tags: ['continue'],
      question: 'What is the output?\nfor(int i=1;i<=5;i++) {\n  if(i==3) continue;\n  System.out.print(i+" ");\n}',
      options: ['1 2 3 4 5', '1 2 4 5', '1 2', '3 4 5'],
      correctAnswer: 1,
      explanation: 'continue skips the rest of the current iteration when i==3. So 3 is not printed. Output: 1 2 4 5' },
  ],
  'java-arrays': [
    { id: 'arr-1', moduleId: 'java-arrays', difficulty: 'Easy', type: 'conceptual', tags: ['basics'],
      question: 'What is the index of the last element in an array of size n?',
      options: ['n', 'n-1', 'n+1', '1'],
      correctAnswer: 1,
      explanation: 'Arrays are 0-indexed. First element is at index 0, last element is at index n-1 for an array of size n. Accessing index n throws ArrayIndexOutOfBoundsException.' },
    { id: 'arr-2', moduleId: 'java-arrays', difficulty: 'Easy', type: 'conceptual', tags: ['length'],
      question: 'How do you get the length of an array named "arr" in Java?',
      options: ['arr.length()', 'arr.size()', 'arr.length', 'length(arr)'],
      correctAnswer: 2,
      explanation: 'Arrays have a "length" property (field), not a method. Use arr.length (no parentheses). Contrast with String which uses str.length() (method with parentheses).' },
    { id: 'arr-3', moduleId: 'java-arrays', difficulty: 'Medium', type: 'output', tags: ['default'],
      question: 'What is the output?\nint[] arr = new int[3];\nSystem.out.println(arr[0]);\nSystem.out.println(arr[1]);',
      options: ['null\nnull', '0\n0', 'Error', 'undefined\nundefined'],
      correctAnswer: 1,
      explanation: 'new int[3] creates array of 3 integers, all initialized to 0 (default value for int). Output: 0 then 0.' },
    { id: 'arr-4', moduleId: 'java-arrays', difficulty: 'Hard', type: 'output', tags: ['reference'],
      question: 'What is the output?\nint[] a = {1,2,3};\nint[] b = a;\nb[0] = 99;\nSystem.out.println(a[0]);',
      options: ['1', '99', 'Error', 'null'],
      correctAnswer: 1,
      explanation: 'Arrays are reference types. int[] b = a; makes b point to the SAME array as a. Modifying b[0] modifies the shared array. So a[0] is also 99.' },
  ],
  'java-methods': [
    { id: 'meth-1', moduleId: 'java-methods', difficulty: 'Medium', type: 'output', tags: ['pass-by-value'],
      question: 'What is the output?\nstatic void change(int x) { x = 100; }\npublic static void main(String[] a) {\n  int n = 5;\n  change(n);\n  System.out.println(n);\n}',
      options: ['100', '5', '0', 'Error'],
      correctAnswer: 1,
      explanation: 'Java passes primitives by value. A copy of n (5) is passed to change(). The method changes the local copy to 100, but n in main() is unchanged. Output: 5.' },
    { id: 'meth-2', moduleId: 'java-methods', difficulty: 'Easy', type: 'conceptual', tags: ['overloading'],
      question: 'What is method overloading?',
      options: [
        'Subclass providing different implementation of parent method',
        'Multiple methods with same name but different parameter lists in same class',
        'A method calling itself recursively',
        'Inheriting methods from parent class'
      ],
      correctAnswer: 1,
      explanation: 'Method overloading is having multiple methods with the same name but different parameter lists (different type, number, or order of parameters) in the SAME class. Resolved at compile-time.' },
    { id: 'meth-3', moduleId: 'java-methods', difficulty: 'Hard', type: 'output', tags: ['recursion'],
      question: 'What is the output?\nstatic int fact(int n) {\n  if(n==0) return 1;\n  return n * fact(n-1);\n}\nSystem.out.println(fact(4));',
      options: ['24', '12', '4', 'StackOverflow'],
      correctAnswer: 0,
      explanation: 'fact(4) = 4 * fact(3) = 4 * 3 * fact(2) = 4 * 3 * 2 * fact(1) = 4 * 3 * 2 * 1 * fact(0) = 4*3*2*1*1 = 24.' },
  ],
  'java-operators': [
    { id: 'op-1', moduleId: 'java-operators', difficulty: 'Easy', type: 'output', tags: ['precedence'],
      question: 'What is the output?\nSystem.out.println(5 + 3 * 2);',
      options: ['16', '11', '13', '10'],
      correctAnswer: 1,
      explanation: 'Multiplication (*) has higher precedence than addition (+). So 3 * 2 = 6, then 5 + 6 = 11.' },
    { id: 'op-2', moduleId: 'java-operators', difficulty: 'Medium', type: 'output', tags: ['increment'],
      question: 'What is the output?\nint a = 5;\nint b = a++ + ++a;\nSystem.out.println("b=" + b + ", a=" + a);',
      options: ['b=12, a=7', 'b=11, a=7', 'b=12, a=6', 'b=10, a=6'],
      correctAnswer: 0,
      explanation: 'a++ uses 5, then increments a to 6. ++a increments a to 7, then uses 7. So b = 5 + 7 = 12, and final a = 7.' },
    { id: 'op-3', moduleId: 'java-operators', difficulty: 'Easy', type: 'conceptual', tags: ['short-circuit'],
      question: 'What is the difference between & and && in Java?',
      options: [
        '& is logical AND; && is bitwise AND',
        '&& short-circuits (skips right side if left is false); & evaluates both operands',
        'Both are identical in all cases',
        '& can only be used with numbers'
      ],
      correctAnswer: 1,
      explanation: '&& is the short-circuit conditional AND operator — if the left operand is false, the right operand is not evaluated. & always evaluates both operands.' },
    { id: 'op-4', moduleId: 'java-operators', difficulty: 'Easy', type: 'conceptual', tags: ['instanceof'],
      question: 'Which operator is used to test if an object is an instance of a specific class or interface?',
      options: ['typeof', 'instanceof', 'is', 'type'],
      correctAnswer: 1,
      explanation: 'The instanceof operator checks whether an object reference is an instance of a specified class, subclass, or interface, returning true or false.' },
    { id: 'op-5', moduleId: 'java-operators', difficulty: 'Easy', type: 'output', tags: ['modulo'],
      question: 'What is the output?\nSystem.out.println(14 % 4);',
      options: ['3', '2', '3.5', '0'],
      correctAnswer: 1,
      explanation: 'The modulo operator % returns the remainder of integer division. 14 divided by 4 is 3 with remainder 2.' },
    { id: 'op-6', moduleId: 'java-operators', difficulty: 'Medium', type: 'output', tags: ['ternary'],
      question: 'What is the output?\nint score = 75;\nString result = score >= 60 ? (score >= 90 ? "A" : "B") : "F";\nSystem.out.println(result);',
      options: ['A', 'B', 'F', 'Compilation Error'],
      correctAnswer: 1,
      explanation: 'Nested ternary: score >= 60 is true (75 >= 60). Then score >= 90 is false (75 >= 90 is false), so "B" is returned.' },
    { id: 'op-7', moduleId: 'java-operators', difficulty: 'Hard', type: 'output', tags: ['precedence'],
      question: 'What is the output?\nboolean res = true || false && false;\nSystem.out.println(res);',
      options: ['true', 'false', 'Compilation Error', 'Runtime Error'],
      correctAnswer: 0,
      explanation: 'Logical AND (&&) has higher precedence than logical OR (||). So (false && false) evaluates first to false. Then (true || false) evaluates to true.' },
  ],
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function JavaMCQPage() {
  const { moduleId = 'java-fundamentals' } = useParams<{ moduleId: string }>();

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
      const pct = Math.round(((score + (selected === q.correctAnswer ? 1 : 0)) / questions.length) * 100);
      // use score+1 if last was correct
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
          <Link to={`/java/module/${moduleId}`} className="text-blue-400 underline">← Back to Learn</Link>
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
            <Link to={`/java/module/${moduleId}`}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Lesson
            </Link>
            <Link to="/java"
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
          <Link to={`/java/module/${moduleId}`}
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
