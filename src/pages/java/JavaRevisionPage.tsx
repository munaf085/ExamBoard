import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Split, AlertTriangle, Code, Calculator } from 'lucide-react';
import CopyButton from '../../components/CopyButton';

const DIFFERENCES = [
  { title: 'JDK vs JRE vs JVM', col1Name: 'Concept', col1: 'JDK: Dev Kit (JRE + tools). JRE: Runtime (JVM + libs). JVM: Executes bytecode.', col2Name: 'Usage', col2: 'JDK for compiling, JRE for running, JVM for execution.' },
  { title: '== vs equals()', col1Name: '== Operator', col1: 'Compares memory references for objects. Compares values for primitives.', col2Name: 'equals() Method', col2: 'Compares semantic values (if overridden). Default Object.equals() uses ==.' },
  { title: 'String vs StringBuilder', col1Name: 'String', col1: 'Immutable, thread-safe, stored in String pool.', col2Name: 'StringBuilder', col2: 'Mutable, not thread-safe, better for concatenation.' },
  { title: 'ArrayList vs LinkedList', col1Name: 'ArrayList', col1: 'Backed by dynamic array. Fast random access O(1). Slow middle insertion O(n).', col2Name: 'LinkedList', col2: 'Doubly linked list. Fast insertion O(1). Slow access O(n).' },
  { title: 'HashMap vs Hashtable', col1Name: 'HashMap', col1: 'Not thread-safe, allows one null key and multiple null values. Fast.', col2Name: 'Hashtable', col2: 'Thread-safe (synchronized), no null keys/values. Slow.' },
  { title: 'HashSet vs TreeSet', col1Name: 'HashSet', col1: 'Backed by HashMap. Unordered. O(1) operations.', col2Name: 'TreeSet', col2: 'Backed by TreeMap. Sorted naturally or via Comparator. O(log n).' },
  { title: 'Comparable vs Comparator', col1Name: 'Comparable', col1: 'java.lang. Single sorting sequence (compareTo). Modifies original class.', col2Name: 'Comparator', col2: 'java.util. Multiple sorting sequences (compare). Doesn\'t modify original.' },
  { title: 'throw vs throws', col1Name: 'throw', col1: 'Used to explicitly throw an exception within a method.', col2Name: 'throws', col2: 'Used in method signature to declare exceptions it might throw.' },
  { title: 'final vs finally vs finalize', col1Name: 'Keyword', col1: 'final: constant. finally: try-catch block. finalize(): GC method.', col2Name: 'Type', col2: 'Modifier / Block / Method' },
  { title: 'Overloading vs Overriding', col1Name: 'Overloading', col1: 'Same name, different parameters. Compile-time polymorphism.', col2Name: 'Overriding', col2: 'Same signature in subclass. Runtime polymorphism.' },
  { title: 'Abstract class vs Interface', col1Name: 'Abstract Class', col1: 'Can have state. Single inheritance. Constructors allowed.', col2Name: 'Interface', col2: 'No state (only public static final). Multiple inheritance.' },
  { title: 'Checked vs Unchecked Exception', col1Name: 'Checked', col1: 'Compile-time. Extends Exception. Must be handled.', col2Name: 'Unchecked', col2: 'Runtime. Extends RuntimeException. Optional handling.' },
  { title: 'synchronized vs volatile', col1Name: 'synchronized', col1: 'Guarantees mutual exclusion and visibility.', col2Name: 'volatile', col2: 'Guarantees visibility of changes across threads. No mutual exclusion.' },
  { title: 'Runnable vs Thread', col1Name: 'Runnable', col1: 'Interface. Better for OOP (can extend another class).', col2Name: 'Thread', col2: 'Class. Cannot extend another class if extending Thread.' },
  { title: 'Stream vs Collection', col1Name: 'Stream', col1: 'Declarative sequence of elements. Doesn\'t store data.', col2Name: 'Collection', col2: 'In-memory data structure storing elements.' },
  { title: '@Controller vs @RestController', col1Name: '@Controller', col1: 'Returns views (HTML/JSP).', col2Name: '@RestController', col2: 'Returns data (JSON/XML). @Controller + @ResponseBody.' },
  { title: 'PUT vs PATCH', col1Name: 'PUT', col1: 'Replaces entire resource. Idempotent.', col2Name: 'PATCH', col2: 'Partial update of resource. Not necessarily idempotent.' },
  { title: 'Authentication vs Authorization', col1Name: 'Authentication', col1: 'Who are you? (Login, Tokens).', col2Name: 'Authorization', col2: 'What can you do? (Roles, Permissions).' }
];

const TRAPS = [
  { title: 'String Pool Trap', text: 's1="Java" and s2="Java" refer to the same object (s1==s2 is true). But new String("Java") creates a new object in the heap (== is false).' },
  { title: 'Integer Caching', text: 'Java caches Integers from -128 to 127. Integer a=127, b=127 -> a==b is true. Integer c=128, d=128 -> c==d is false.' },
  { title: 'finally Always Runs', text: 'A finally block executes even if the try block has a return statement. If finally also returns, it overrides the try return.' },
  { title: 'Pass by Value', text: 'Java is strictly pass-by-value. For objects, the *reference* is passed by value. You can modify the object\'s state, but not reassign the reference.' },
  { title: 'String Concatenation Order', text: 'Evaluation is left-to-right. 1 + 2 + "3" = "33" (3 + "3"). But "3" + 1 + 2 = "312" (String + int = String).' },
  { title: 'Overriding vs Overloading', text: 'Changing return type is NOT enough to overload a method. Overriding requires same exact signature (or covariant return type).' },
  { title: 'Null Instance Methods', text: 'Static methods can be called on a null reference variable without throwing NullPointerException because they are resolved at compile time based on the declared type.' },
  { title: 'Double/Float Precision', text: '0.1 + 0.2 != 0.3. Use BigDecimal for precise calculations like currency.' },
  { title: 'Collection modification', text: 'Modifying a collection while iterating with a foreach loop throws ConcurrentModificationException. Use Iterator.remove().' },
  { title: 'equals() and hashCode()', text: 'If you override equals(), you MUST override hashCode(). Equal objects must have equal hashcodes, or they will fail in HashMaps/HashSets.' }
];

const SYNTAX = [
  { title: 'Class & Main Method', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}' },
  { title: 'Interface (Java 8+)', code: 'public interface Flyable {\n    void fly(); // abstract\n    \n    default void land() {\n        System.out.println("Landing");\n    }\n}' },
  { title: 'Lambda Expression', code: 'List<String> list = Arrays.asList("A", "B", "C");\nlist.forEach(item -> System.out.println(item));' },
  { title: 'Stream Example', code: 'List<Integer> evens = numbers.stream()\n    .filter(n -> n % 2 == 0)\n    .map(n -> n * 2)\n    .collect(Collectors.toList());' },
  { title: 'try-with-resources', code: 'try (BufferedReader br = new BufferedReader(new FileReader(path))) {\n    return br.readLine();\n} catch (IOException e) {\n    e.printStackTrace();\n}' },
  { title: 'Generic Class', code: 'public class Box<T> {\n    private T item;\n    public void set(T item) { this.item = item; }\n    public T get() { return item; }\n}' },
  { title: 'Comparable Implementation', code: 'class Person implements Comparable<Person> {\n    int age;\n    @Override\n    public int compareTo(Person other) {\n        return Integer.compare(this.age, other.age);\n    }\n}' },
  { title: 'Custom Exception', code: 'public class InvalidAgeException extends Exception {\n    public InvalidAgeException(String msg) {\n        super(msg);\n    }\n}' }
];

const JavaRevisionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'differences' | 'traps' | 'syntax' | 'formulas'>('differences');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/java" className="text-slate-400 hover:text-white transition-colors flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white">Java Quick Reference</h1>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto bg-slate-800 p-1 rounded-xl border border-slate-700 mb-8 hide-scrollbar">
          <button onClick={() => setActiveTab('differences')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${activeTab === 'differences' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>
            <Split className="w-4 h-4" /> 📋 Key Differences
          </button>
          <button onClick={() => setActiveTab('traps')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${activeTab === 'traps' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>
            <AlertTriangle className="w-4 h-4" /> ⚠️ Interview Traps
          </button>
          <button onClick={() => setActiveTab('syntax')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${activeTab === 'syntax' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>
            <Code className="w-4 h-4" /> 🔤 Syntax Reference
          </button>
          <button onClick={() => setActiveTab('formulas')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${activeTab === 'formulas' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>
            <Calculator className="w-4 h-4" /> 📌 Quick Formulas
          </button>
        </div>

        {/* Content */}
        <div className="animate-in fade-in duration-500">
          
          {activeTab === 'differences' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIFFERENCES.map((diff, i) => (
                <div key={i} className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-4">
                    <h3 className="font-bold text-lg text-blue-400">{diff.title}</h3>
                    <CopyButton text={`${diff.title}\n\n${diff.col1Name}:\n${diff.col1}\n\n${diff.col2Name}:\n${diff.col2}`} label="Copy" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">{diff.col1Name}</h4>
                      <p className="text-sm text-slate-300">{diff.col1}</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">{diff.col2Name}</h4>
                      <p className="text-sm text-slate-300">{diff.col2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'traps' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRAPS.map((trap, i) => (
                <div key={i} className="bg-slate-800 rounded-xl border border-orange-900/50 p-5 shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-orange-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {trap.title}
                    </h3>
                    <CopyButton text={`${trap.title}\n\n${trap.text}`} label="Copy" />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{trap.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'syntax' && (
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {SYNTAX.map((syn, i) => (
                <div key={i} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden break-inside-avoid shadow-lg">
                  <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                    <h3 className="font-bold text-green-400 text-sm">{syn.title}</h3>
                    <CopyButton text={syn.code} label="Copy Syntax" />
                  </div>
                  <pre className="p-4 text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono">
                    <code>{syn.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'formulas' && (
            <div className="space-y-8">
              
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <div className="bg-slate-900 p-4 border-b border-slate-700"><h3 className="font-bold text-purple-400">Big O Complexity</h3></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800 text-slate-400">
                      <tr><th className="p-4">Data Structure</th><th className="p-4">Access</th><th className="p-4">Search</th><th className="p-4">Insertion</th><th className="p-4">Deletion</th></tr>
                    </thead>
                    <tbody className="text-slate-300 divide-y divide-slate-700/50">
                      <tr><td className="p-4 font-semibold">Array</td><td className="p-4 text-green-400">O(1)</td><td className="p-4 text-orange-400">O(n)</td><td className="p-4 text-orange-400">O(n)</td><td className="p-4 text-orange-400">O(n)</td></tr>
                      <tr><td className="p-4 font-semibold">LinkedList</td><td className="p-4 text-orange-400">O(n)</td><td className="p-4 text-orange-400">O(n)</td><td className="p-4 text-green-400">O(1)</td><td className="p-4 text-green-400">O(1)</td></tr>
                      <tr><td className="p-4 font-semibold">HashMap</td><td className="p-4 text-slate-500">-</td><td className="p-4 text-green-400">O(1)</td><td className="p-4 text-green-400">O(1)</td><td className="p-4 text-green-400">O(1)</td></tr>
                      <tr><td className="p-4 font-semibold">TreeMap</td><td className="p-4 text-slate-500">-</td><td className="p-4 text-yellow-400">O(log n)</td><td className="p-4 text-yellow-400">O(log n)</td><td className="p-4 text-yellow-400">O(log n)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                  <h3 className="font-bold text-purple-400 mb-4 border-b border-slate-700 pb-2">Visibility Modifiers</h3>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex justify-between border-b border-slate-700/50 pb-2"><span>public</span> <span>Anywhere</span></li>
                    <li className="flex justify-between border-b border-slate-700/50 pb-2"><span>protected</span> <span>Same package + Subclasses</span></li>
                    <li className="flex justify-between border-b border-slate-700/50 pb-2"><span>default (no mod)</span> <span>Same package only</span></li>
                    <li className="flex justify-between"><span>private</span> <span>Same class only</span></li>
                  </ul>
                </div>
                
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                  <h3 className="font-bold text-purple-400 mb-4 border-b border-slate-700 pb-2">Common String Methods</h3>
                  <ul className="space-y-2 text-sm text-slate-300 font-mono">
                    <li>.length()</li>
                    <li>.charAt(int index)</li>
                    <li>.substring(int begin, int end)</li>
                    <li>.indexOf(String str)</li>
                    <li>.trim() / .strip()</li>
                    <li>.split(String regex)</li>
                    <li>.toLowerCase() / .toUpperCase()</li>
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default JavaRevisionPage;
