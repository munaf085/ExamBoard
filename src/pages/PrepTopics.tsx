import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const topics = [
  {
    title: 'C# Fundamentals',
    color: 'border-blue-700/40',
    items: [
      'Data types: int, string, bool, double, float, char, decimal',
      'Value types vs Reference types',
      'var keyword — implicit typing',
      'null, nullable types (int?), null-coalescing ??',
      'String methods: Length, Substring, Contains, Replace, Split, Trim, ToUpper, ToLower',
      'StringBuilder for efficient string concatenation',
      'Arrays: declaration, initialization, multi-dimensional',
      'List<T>, Dictionary<K,V>, HashSet<T>',
      'foreach, for, while, do-while loops',
      'if/else, switch, ternary operator',
      'Methods: parameters, return types, default parameters',
      'ref and out keywords',
      'Exception handling: try/catch/finally/throw',
      'using statement and IDisposable',
      'LINQ: Where, Select, OrderBy, FirstOrDefault, ToList, Count',
      'async/await, Task, Task<T>',
      'Pattern matching, is, as',
    ],
  },
  {
    title: 'OOP Concepts',
    color: 'border-purple-700/40',
    items: [
      'Encapsulation — private fields + public properties',
      'Abstraction — hiding implementation details',
      'Inheritance — base/derived class, : syntax',
      'Polymorphism — compile-time (overloading) and runtime (overriding)',
      'Access modifiers: public, private, protected, internal',
      'Constructors: default, parameterized, static',
      'Static members vs instance members',
      'Properties: auto-implemented, get/set',
      'Method overloading vs method overriding',
      'virtual, override, new keywords',
      'abstract class vs interface differences',
      'sealed class — prevents inheritance',
      'Interfaces: multiple implementation, default methods (C# 8+)',
      'Generics: List<T>, Dictionary<K,V>, constraints where T: class',
      'Boxing and unboxing',
      'IEnumerable, ICollection, IList hierarchy',
    ],
  },
  {
    title: '.NET / ASP.NET Core',
    color: 'border-emerald-700/40',
    items: [
      'What is .NET — cross-platform runtime',
      'ASP.NET Core — web framework built on .NET',
      'MVC pattern: Model, View, Controller roles',
      'Web API — HTTP-based API without Views',
      'Controllers and Action methods',
      'Routing: convention-based and attribute routing [Route]',
      'Middleware pipeline — ordered request/response processing',
      'Dependency Injection (DI) — built-in IoC container',
      'DI Lifetimes: Transient (new each time), Scoped (per request), Singleton (one instance)',
      'IServiceCollection, services.AddScoped/AddTransient/AddSingleton',
      'appsettings.json — configuration management',
      'IConfiguration — reading config values',
      'ILogger — structured logging',
      'Model binding — automatic parameter binding from request',
      'Data Annotations — [Required], [MaxLength], [EmailAddress], etc.',
      'DTO — Data Transfer Object pattern',
      'Entity Framework Core — ORM for SQL Server',
      'DbContext, DbSet<T>, LINQ queries',
      'Code First vs Database First approach',
      'Migrations: Add-Migration, Update-Database',
      'async/await in controllers — async Task<IActionResult>',
    ],
  },
  {
    title: 'Web API & HTTP',
    color: 'border-cyan-700/40',
    items: [
      'HTTP Methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (remove)',
      'REST principles: stateless, uniform interface, resource-based URLs',
      'Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error',
      'JSON serialization/deserialization with System.Text.Json',
      'Request headers: Content-Type, Authorization, Accept',
      '[HttpGet], [HttpPost], [HttpPut], [HttpDelete] attributes',
      'Route parameters: [Route("{id}")], [FromRoute], [FromBody], [FromQuery]',
      'IActionResult return types: Ok(), NotFound(), BadRequest(), Created()',
      'Authentication: JWT Bearer tokens, basic concepts',
      'Authorization: [Authorize] attribute, roles, policies',
    ],
  },
  {
    title: 'SQL Server',
    color: 'border-yellow-700/40',
    items: [
      'SELECT — retrieve data from tables',
      'WHERE — filter rows',
      'ORDER BY — sort results (ASC/DESC)',
      'GROUP BY — aggregate groups of rows',
      'HAVING — filter groups (use after GROUP BY)',
      'DISTINCT — remove duplicate rows',
      'Aggregate functions: COUNT, SUM, AVG, MIN, MAX',
      'INNER JOIN — rows matching in both tables',
      'LEFT JOIN — all rows from left, matching from right (NULL if no match)',
      'RIGHT JOIN — all rows from right',
      'FULL OUTER JOIN — all rows from both',
      'Subqueries — nested SELECT',
      'EXISTS — check if subquery returns rows',
      'NULL handling — IS NULL, IS NOT NULL (NOT = NULL)',
      'PRIMARY KEY — unique identifier, not null',
      'FOREIGN KEY — reference to another table\'s PK',
      'UNIQUE constraint — unique values (allows one NULL)',
      'Indexes: Clustered (sorts data) vs Non-Clustered (separate structure)',
      'Normalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency)',
      'Transactions — ACID: Atomicity, Consistency, Isolation, Durability',
      'DELETE (rows, logged), TRUNCATE (all rows, minimal log), DROP (removes table)',
      'Stored Procedures — reusable SQL code blocks',
      'Views — virtual table (SELECT only)',
      'CASE WHEN — conditional logic in SQL',
      'Window functions: ROW_NUMBER(), RANK(), DENSE_RANK() OVER(PARTITION BY)',
    ],
  },
  {
    title: 'DSA — Data Structures & Algorithms',
    color: 'border-red-700/40',
    items: [
      'Array — fixed-size, O(1) access, O(n) search',
      'String operations — reverse, palindrome check, frequency count',
      'Linked List — Node has data + next pointer, O(n) access',
      'Stack — LIFO, push/pop, O(1) operations',
      'Queue — FIFO, enqueue/dequeue, O(1) operations',
      'Hash Map/Dictionary — O(1) average lookup',
      'Linear Search — O(n), Binary Search — O(log n)',
      'Bubble Sort — O(n²), Selection Sort — O(n²)',
      'Time Complexity: O(1) constant, O(n) linear, O(n²) quadratic, O(log n) logarithmic',
      'Space Complexity — additional memory used by algorithm',
      'Recursion — function calling itself, base case required',
      'Two-pointer technique — for sorted arrays',
      'Common problems: reverse array, find duplicates, two sum, Fibonacci, palindrome, missing number',
    ],
  },
  {
    title: 'HTML / CSS / JavaScript',
    color: 'border-orange-700/40',
    items: [
      'HTML semantic elements: <header>, <main>, <section>, <article>, <footer>, <nav>',
      'Forms: <form>, <input>, <select>, <textarea>, action, method attributes',
      'Input types: text, email, password, number, checkbox, radio, submit',
      'CSS selectors: element, .class, #id, descendant, child (>), pseudo-class (:hover, :first-child)',
      'Box model: margin → border → padding → content',
      'display: block, inline, inline-block, flex, grid, none',
      'Flexbox: justify-content, align-items, flex-direction, flex-wrap',
      'Position: static, relative, absolute, fixed, sticky',
      'JavaScript: var (function-scoped), let (block-scoped), const (block-scoped, immutable binding)',
      '== vs === (loose vs strict equality)',
      'Arrow functions: const add = (a, b) => a + b',
      'Array methods: map, filter, reduce, forEach, find, includes',
      'Promise, async/await for asynchronous code',
      'DOM manipulation: getElementById, querySelector, addEventListener',
      'Event bubbling vs capturing',
      'JSON.parse() and JSON.stringify()',
    ],
  },
  {
    title: 'Operating Systems',
    color: 'border-slate-600',
    items: [
      'Process — running program with its own memory space',
      'Thread — lightweight unit of execution within a process',
      'Process vs Thread — processes are isolated; threads share memory',
      'Multithreading — multiple threads running concurrently',
      'Deadlock — circular wait where processes block each other',
      'Deadlock conditions (all 4 must hold): Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'Context switching — saving and restoring process/thread state',
      'Stack — stores local variables, function calls (LIFO)',
      'Heap — dynamic memory allocation (new/malloc)',
      'Virtual Memory — allows processes to use more memory than physically available',
    ],
  },
  {
    title: 'Agile / SDLC',
    color: 'border-indigo-700/40',
    items: [
      'SDLC phases: Planning, Requirements, Design, Development, Testing, Deployment, Maintenance',
      'Waterfall — sequential, each phase complete before next',
      'Agile — iterative, incremental development with frequent releases',
      'Scrum — Agile framework with defined roles and ceremonies',
      'Sprint — fixed time-box (usually 2 weeks) to complete work',
      'Product Backlog — prioritized list of features/requirements',
      'Sprint Backlog — tasks selected for current sprint',
      'Daily Standup — 15-min daily sync: What did I do? What will I do? Any blockers?',
      'Sprint Review — demo completed work to stakeholders',
      'Sprint Retrospective — team reflects on process improvement',
      'Product Owner — defines requirements, prioritizes backlog',
      'Scrum Master — facilitates Scrum, removes impediments',
      'Development Team — builds the product',
      'User Story: As a [user], I want [feature] so that [benefit]',
      'Kanban — visual workflow board, WIP limits',
    ],
  },
];

export default function PrepTopics() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/" className="text-slate-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-lg font-bold text-white">Preparation Topics</h1>
            <p className="text-xs text-slate-400">Study guide for Atyati .NET Interview</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 mb-6 text-blue-200 text-sm">
          <strong>📌 Focus areas for your interview:</strong> C# basics, OOP concepts, SQL joins and queries,
          ASP.NET Core Web API, Dependency Injection lifetimes, loop tracing, DSA fundamentals, and
          basic aptitude. Cover all topics below systematically.
        </div>

        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div key={i} className={`bg-slate-800 border ${topic.color} rounded-xl overflow-hidden`}>
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-white font-semibold">{topic.title}</span>
                  <span className="text-slate-500 text-sm">({topic.items.length} topics)</span>
                </div>
                {expanded[i] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {expanded[i] && (
                <div className="px-5 pb-5">
                  <ul className="space-y-2">
                    {topic.items.map((item, j) => (
                      <li key={j} className="text-slate-300 text-sm flex items-start gap-2.5">
                        <span className="text-slate-500 flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
