import { WrittenQuestion } from '../../types';

export const hard2Questions: WrittenQuestion[] = [
  // CSharp / OOP (8)
  {
    id: 'H2-CS-001', paperId: 'hard-2', category: 'CSharp', difficulty: 'Hard', type: 'code-output',
    question: 'What is the output of this constructor chaining code?',
    code: 'class A { public A() { Console.Write("A1 "); } public A(int x) : this() { Console.Write("A2 "); } } class B : A { public B() : base(5) { Console.Write("B1 "); } } B obj = new B();',
    options: ['A1 A2 B1 ', 'A2 A1 B1 ', 'B1 A2 A1 ', 'Compilation Error'], correctAnswer: 0,
    explanation: 'B calls base(5). A(int) calls this(), meaning A() runs first ("A1 "), then A(int) ("A2 "), then B() ("B1 ").', tags: ['C#', 'Constructors']
  },
  {
    id: 'H2-CS-002', paperId: 'hard-2', category: 'CSharp', difficulty: 'Medium', type: 'single-choice',
    question: 'What does explicit interface implementation accomplish?',
    options: ['It hides the interface members from the class\'s public interface unless explicitly cast', 'It makes the interface methods static', 'It improves performance', 'It prevents the class from being inherited'], correctAnswer: 0,
    explanation: 'Explicit implementations do not appear on the class\'s public surface; the instance must be cast to the interface to call them.', tags: ['C#', 'Interface']
  },
  {
    id: 'H2-CS-003', paperId: 'hard-2', category: 'CSharp', difficulty: 'Medium', type: 'single-choice',
    question: 'What does the generic constraint `where T : class, new()` mean?',
    options: ['T must be a reference type and have a parameterless constructor', 'T must be a class inherited from new()', 'T must be a static class', 'T can be any value type with a constructor'], correctAnswer: 0,
    explanation: '`class` constrains T to reference types. `new()` constrains T to have a public parameterless constructor.', tags: ['C#', 'Generics']
  },
  {
    id: 'H2-CS-004', paperId: 'hard-2', category: 'CSharp', difficulty: 'Hard', type: 'single-choice',
    question: 'What is a primary benefit of using a `readonly struct` in C#?',
    options: ['It forces all methods to return void', 'It ensures immutability and prevents defensive copies by the compiler, improving performance', 'It allows the struct to inherit from classes', 'It automatically implements IDisposable'], correctAnswer: 1,
    explanation: 'A readonly struct guarantees state cannot change, allowing the compiler to optimize and avoid hidden defensive copies when passing by in/ref.', tags: ['C#', 'Structs']
  },
  {
    id: 'H2-CS-005', paperId: 'hard-2', category: 'CSharp', difficulty: 'Medium', type: 'code-output',
    question: 'C# 8+ switch expression output:',
    code: 'int x = 5; string result = x switch { > 10 => "Big", 5 => "Five", _ => "Other" }; Console.Write(result);',
    options: ['Big', 'Five', 'Other', 'Compilation Error'], correctAnswer: 1,
    explanation: 'The value is exactly 5, so it matches the 5 pattern.', tags: ['C#', 'Pattern Matching']
  },
  {
    id: 'H2-CS-006', paperId: 'hard-2', category: 'CSharp', difficulty: 'Medium', type: 'code-output',
    question: 'Null coalescing assignment output:',
    code: 'string s = null; s ??= "Hello"; s ??= "World"; Console.Write(s);',
    options: ['Hello', 'World', 'HelloWorld', 'null'], correctAnswer: 0,
    explanation: '`s ??= "Hello"` assigns "Hello" because s is null. The second assignment does nothing because s is no longer null.', tags: ['C#', 'Operators']
  },
  {
    id: 'H2-CS-007', paperId: 'hard-2', category: 'CSharp', difficulty: 'Hard', type: 'single-choice',
    question: 'How does string interning behave in .NET?',
    options: ['All dynamically concatenated strings are interned automatically', 'String literals are interned by default, meaning identical literals share the same memory reference', 'String interning prevents garbage collection entirely', 'It encrypts strings in memory'], correctAnswer: 1,
    explanation: 'The CLR maintains a pool (intern pool) of string literals. Identical string literals use the same reference to save memory.', tags: ['C#', 'Strings']
  },
  {
    id: 'H2-CS-008', paperId: 'hard-2', category: 'CSharp', difficulty: 'Easy', type: 'single-choice',
    question: 'Can you place a `return` statement inside a `finally` block in C#?',
    options: ['Yes', 'No, it causes a compilation error', 'Only if the try block throws an exception', 'Yes, but it overrides the return in the try block'], correctAnswer: 1,
    explanation: 'Control cannot leave a finally block via break, continue, return, or goto. It yields a compiler error.', tags: ['C#', 'Exceptions']
  },

  // DotNet/WebAPI (7)
  {
    id: 'H2-DN-001', paperId: 'hard-2', category: 'WebAPI', difficulty: 'Medium', type: 'multiple-choice',
    question: 'What are key differences between Minimal APIs and Controller-based APIs? (Select multiple)',
    options: ['Minimal APIs do not support Model Binding', 'Minimal APIs have less ceremony and boilerplate', 'Controllers support Action Filters natively, Minimal APIs traditionally use Endpoint Filters', 'Minimal APIs cannot connect to databases'], correctAnswer: [1, 2],
    explanation: 'Minimal APIs reduce boilerplate and use Endpoint Filters instead of MVC Action Filters. Both support model binding and DB access.', tags: ['WebAPI', 'Minimal APIs']
  },
  {
    id: 'H2-DN-002', paperId: 'hard-2', category: 'WebAPI', difficulty: 'Hard', type: 'single-choice',
    question: 'Output Caching vs Response Caching in .NET 7+: What is a major advantage of Output Caching?',
    options: ['It caches client-side in the browser only', 'It ignores HTTP cache headers by default and caches on the server, avoiding issues with strict client cache headers', 'It only works with Minimal APIs', 'It is synchronous only'], correctAnswer: 1,
    explanation: 'Output caching is a server-side feature that dictates its own cache policy regardless of what headers the client sends, making it more robust for server load reduction.', tags: ['WebAPI', 'Caching']
  },
  {
    id: 'H2-DN-003', paperId: 'hard-2', category: 'DotNet', difficulty: 'Medium', type: 'single-choice',
    question: 'What is SignalR primarily used for?',
    options: ['Object-Relational Mapping', 'Adding real-time web functionality to applications', 'Building static websites', 'Data encryption'], correctAnswer: 1,
    explanation: 'SignalR enables server code to push content to connected clients instantly (e.g., via WebSockets).', tags: ['.NET', 'SignalR']
  },
  {
    id: 'H2-DN-004', paperId: 'hard-2', category: 'WebAPI', difficulty: 'Easy', type: 'single-choice',
    question: 'What is the purpose of Health Check endpoints in ASP.NET Core?',
    options: ['To monitor memory leaks natively', 'To allow load balancers or orchestrators (like Kubernetes) to verify app availability and dependencies', 'To automatically fix bugs', 'To check for code syntax errors'], correctAnswer: 1,
    explanation: 'Health checks expose an endpoint so infrastructure can monitor if the app is alive and ready to serve traffic.', tags: ['WebAPI', 'Health Checks']
  },
  {
    id: 'H2-DN-005', paperId: 'hard-2', category: 'WebAPI', difficulty: 'Medium', type: 'single-choice',
    question: 'What HTTP status code is typically returned by Rate Limiting middleware when a client exceeds the limit?',
    options: ['400 Bad Request', '401 Unauthorized', '429 Too Many Requests', '503 Service Unavailable'], correctAnswer: 2,
    explanation: 'HTTP 429 indicates the user has sent too many requests in a given amount of time.', tags: ['WebAPI', 'Rate Limiting']
  },
  {
    id: 'H2-DN-006', paperId: 'hard-2', category: 'WebAPI', difficulty: 'Medium', type: 'single-choice',
    question: 'Problem Details (RFC 7807) in ASP.NET Core provides a standard format for:',
    options: ['Returning success payloads', 'Structuring machine-readable error responses in HTTP APIs', 'Logging errors to a file', 'Validating JSON schemas'], correctAnswer: 1,
    explanation: 'ProblemDetails is a standard specification for returning error information in HTTP APIs.', tags: ['WebAPI', 'Error Handling']
  },
  {
    id: 'H2-DN-007', paperId: 'hard-2', category: 'DotNet', difficulty: 'Hard', type: 'single-choice',
    question: 'Why use a Typed HttpClient (configured via IHttpClientFactory) instead of instantiating new HttpClient() everywhere?',
    options: ['It avoids socket exhaustion by managing message handlers properly', 'It is the only way to send POST requests', 'It makes the requests synchronous', 'It automatically authenticates all requests'], correctAnswer: 0,
    explanation: 'IHttpClientFactory manages the lifecycle of underlying HttpMessageHandlers to prevent socket exhaustion and DNS caching issues.', tags: ['.NET', 'HttpClient']
  },

  // SQL (8)
  {
    id: 'H2-SQ-001', paperId: 'hard-2', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'What does the SQL MERGE statement do?',
    options: ['Joins two tables without a foreign key', 'Performs insert, update, or delete operations on a target table based on the results of a join with a source table', 'Combines results of multiple SELECT statements (like UNION)', 'Truncates a table and inserts new rows'], correctAnswer: 1,
    explanation: 'MERGE is an "upsert" operation that synchronizes two tables based on a condition.', tags: ['SQL', 'MERGE']
  },
  {
    id: 'H2-SQ-002', paperId: 'hard-2', category: 'SQL', difficulty: 'Medium', type: 'single-choice',
    question: 'PIVOT vs UNPIVOT: Which one turns columns into rows?',
    options: ['PIVOT', 'UNPIVOT', 'Both', 'Neither'], correctAnswer: 1,
    explanation: 'UNPIVOT rotates columns into rows. PIVOT rotates rows into columns.', tags: ['SQL', 'Pivot']
  },
  {
    id: 'H2-SQ-003', paperId: 'hard-2', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'How is a Recursive CTE structured?',
    options: ['With a WHILE loop inside the CTE', 'With an anchor member query, a UNION ALL, and a recursive member query referencing the CTE', 'Using the RECURSIVE keyword in SQL Server', 'By using nested subqueries'], correctAnswer: 1,
    explanation: 'A recursive CTE has an anchor query (base case) UNION ALL with a recursive query that references the CTE itself.', tags: ['SQL', 'CTE']
  },
  {
    id: 'H2-SQ-004', paperId: 'hard-2', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'Trigger INSTEAD OF vs AFTER: When would you use an INSTEAD OF trigger?',
    options: ['To log changes after they occur', 'To execute business logic instead of the actual INSERT/UPDATE/DELETE, often on a View', 'To prevent SELECT queries', 'Only when working with temporary tables'], correctAnswer: 1,
    explanation: 'INSTEAD OF triggers intercept the operation, preventing the original action and running your code instead; useful for updating complex views.', tags: ['SQL', 'Triggers']
  },
  {
    id: 'H2-SQ-005', paperId: 'hard-2', category: 'SQL', difficulty: 'Medium', type: 'single-choice',
    question: 'What is a "Phantom Read"?',
    options: ['Reading uncommitted data from another transaction', 'A transaction reads a row twice but gets different values because another transaction updated it', 'A transaction runs a query twice and sees new rows added by another committed transaction in the second run', 'Reading from a dropped table'], correctAnswer: 2,
    explanation: 'Phantom reads occur when new rows are inserted (or deleted) that match a query\'s WHERE clause between executions in the same transaction.', tags: ['SQL', 'Isolation']
  },
  {
    id: 'H2-SQ-006', paperId: 'hard-2', category: 'SQL', difficulty: 'Medium', type: 'single-choice',
    question: 'What makes an index a "Covering Index" for a specific query?',
    options: ['It includes all the columns referenced in the query (SELECT, JOIN, WHERE), eliminating the need to look up data in the base table', 'It is a clustered index', 'It spans across multiple tables', 'It automatically rebuilds itself'], correctAnswer: 0,
    explanation: 'If an index "covers" the query, the engine can satisfy the query reading only the index pages, avoiding costly key lookups.', tags: ['SQL', 'Indexes']
  },
  {
    id: 'H2-SQ-007', paperId: 'hard-2', category: 'SQL', difficulty: 'Hard', type: 'multiple-choice',
    question: 'Why does the Query Optimizer use Statistics? (Select multiple)',
    options: ['To estimate the number of rows a query will return', 'To decide between an Index Scan or an Index Seek', 'To automatically rewrite complex queries into simpler ones', 'To choose the most efficient join algorithms (Hash, Merge, Nested Loop)'], correctAnswer: [0, 1, 3],
    explanation: 'Statistics provide data distribution info, helping the optimizer estimate cardinality and cost out different execution plans.', tags: ['SQL', 'Performance']
  },
  {
    id: 'H2-SQ-008', paperId: 'hard-2', category: 'SQL', difficulty: 'Easy', type: 'single-choice',
    question: 'Which function parses JSON text and returns a tabular output in SQL Server?',
    options: ['OPENJSON', 'JSON_VALUE', 'JSON_QUERY', 'PARSE_JSON'], correctAnswer: 0,
    explanation: 'OPENJSON is a table-valued function that parses JSON text and returns rows and columns.', tags: ['SQL', 'JSON']
  },

  // DSA (7)
  {
    id: 'H2-DS-001', paperId: 'hard-2', category: 'DSA', difficulty: 'Hard', type: 'dsa-reasoning',
    question: 'Implementing a Queue using two Stacks: If we have Stack1 (inbox) and Stack2 (outbox), what happens on a Dequeue operation if Stack2 is empty?',
    options: ['Return null', 'Pop all elements from Stack1 and push them into Stack2, then pop from Stack2', 'Push the top element of Stack1 to Stack2', 'Throw an Underflow exception immediately'], correctAnswer: 1,
    explanation: 'To maintain FIFO order, all elements from the inbox must be transferred to the outbox (reversing their order) before popping.', tags: ['DSA', 'Queue', 'Stack']
  },
  {
    id: 'H2-DS-002', paperId: 'hard-2', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'Floyd\'s Cycle-Finding Algorithm uses what approach to detect a cycle in a linked list?',
    options: ['A Hash table storing visited nodes', 'Two pointers (slow and fast) moving at different speeds', 'Modifying node values to a specific flag', 'Reversing the linked list'], correctAnswer: 1,
    explanation: 'The tortoise and hare (slow and fast) pointers will eventually meet if there is a cycle.', tags: ['DSA', 'LinkedList']
  },
  {
    id: 'H2-DS-003', paperId: 'hard-2', category: 'DSA', difficulty: 'Hard', type: 'single-choice',
    question: 'Kadane\'s algorithm is used to solve which problem efficiently?',
    options: ['Shortest path in a graph', 'Maximum contiguous subarray sum', 'Longest common subsequence', 'Minimum spanning tree'], correctAnswer: 1,
    explanation: 'Kadane\'s algorithm solves the maximum subarray problem in O(N) time.', tags: ['DSA', 'Algorithms']
  },
  {
    id: 'H2-DS-004', paperId: 'hard-2', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'What is a Trie data structure primarily optimized for?',
    options: ['Sorting numbers', 'Prefix matching and string retrieval (like autocomplete)', 'Balancing binary trees', 'Graph traversal'], correctAnswer: 1,
    explanation: 'A Trie (prefix tree) stores strings character by character, making prefix searches extremely fast (O(length of word)).', tags: ['DSA', 'Trees']
  },
  {
    id: 'H2-DS-005', paperId: 'hard-2', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'Hash collision handling: What is "Chaining"?',
    options: ['Finding the next open slot in the array (Linear Probing)', 'Storing colliding elements in a linked list at the same bucket index', 'Resizing the hash table', 'Using two hash functions'], correctAnswer: 1,
    explanation: 'Chaining handles collisions by having each bucket point to a linked list of entries that hash to the same index.', tags: ['DSA', 'Hashing']
  },
  {
    id: 'H2-DS-006', paperId: 'hard-2', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'BFS vs DFS: Which data structure is typically used to implement Breadth-First Search iteratively?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Hash Map'], correctAnswer: 1,
    explanation: 'A Queue ensures nodes are explored level by level in FIFO order.', tags: ['DSA', 'Graphs']
  },
  {
    id: 'H2-DS-007', paperId: 'hard-2', category: 'DSA', difficulty: 'Hard', type: 'single-choice',
    question: 'Space complexity of a recursive vs iterative approach (assuming same time complexity):',
    options: ['Recursive generally uses more space due to call stack overhead', 'Iterative generally uses more space', 'They always use the exact same amount of space', 'Recursive uses no space'], correctAnswer: 0,
    explanation: 'Each recursive call adds a frame to the call stack, leading to O(N) or O(log N) space complexity, whereas iterative might use O(1).', tags: ['DSA', 'Complexity']
  },

  // Frontend (4)
  {
    id: 'H2-FE-001', paperId: 'hard-2', category: 'Frontend', difficulty: 'Hard', type: 'code-output',
    question: 'JavaScript Hoisting output:',
    code: 'console.log(a); var a = 5; console.log(b); let b = 10;',
    options: ['5 then 10', 'undefined then ReferenceError', 'ReferenceError for both', 'undefined then 10'], correctAnswer: 1,
    explanation: '`var a` is hoisted and initialized to undefined. `let b` is hoisted but resides in the Temporal Dead Zone, throwing a ReferenceError if accessed before initialization.', tags: ['JavaScript', 'Hoisting']
  },
  {
    id: 'H2-FE-002', paperId: 'hard-2', category: 'Frontend', difficulty: 'Medium', type: 'single-choice',
    question: 'CSS Grid vs Flexbox: What is a common rule of thumb?',
    options: ['Flexbox is for 1D layouts (row or column), Grid is for 2D layouts (rows and columns)', 'Grid is older and deprecated', 'Flexbox is only for mobile', 'They are identical, just different syntax'], correctAnswer: 0,
    explanation: 'Flexbox aligns items in a single direction (1D), while Grid handles both dimensions (2D) simultaneously.', tags: ['CSS', 'Layout']
  },
  {
    id: 'H2-FE-003', paperId: 'hard-2', category: 'Frontend', difficulty: 'Medium', type: 'single-choice',
    question: 'What is the purpose of Web Workers in JavaScript?',
    options: ['To style the web page dynamically', 'To run scripts in background threads, keeping the main UI thread responsive', 'To store data offline', 'To intercept network requests'], correctAnswer: 1,
    explanation: 'Web Workers allow heavy computational tasks to run on a background thread without blocking the UI.', tags: ['JavaScript', 'Web Workers']
  },
  {
    id: 'H2-FE-004', paperId: 'hard-2', category: 'Frontend', difficulty: 'Hard', type: 'single-choice',
    question: 'Service Worker caching strategy "Cache First" means:',
    options: ['Always fetch from network, if it fails, use cache', 'Always fetch from cache, if it misses, go to network', 'Fetch from network and cache simultaneously, use whichever returns first', 'Ignore the network entirely'], correctAnswer: 1,
    explanation: 'Cache First strategy prioritizes cached assets for speed and offline capability, falling back to the network only if the asset is not cached.', tags: ['JavaScript', 'Service Workers']
  },

  // OS (3)
  {
    id: 'H2-OS-001', paperId: 'hard-2', category: 'OS', difficulty: 'Medium', type: 'single-choice',
    question: 'Memory management: Paging vs Segmentation. Which is true?',
    options: ['Paging divides memory into fixed-size blocks; Segmentation divides memory into variable-size blocks based on logical segments', 'Paging prevents internal fragmentation entirely', 'Segmentation is used primarily for disk storage, Paging for RAM', 'Both cause external fragmentation'], correctAnswer: 0,
    explanation: 'Pages are fixed size (e.g., 4KB), causing internal fragmentation. Segments are variable size based on program modules, causing external fragmentation.', tags: ['OS', 'Memory']
  },
  {
    id: 'H2-OS-002', paperId: 'hard-2', category: 'OS', difficulty: 'Hard', type: 'single-choice',
    question: 'What is Thrashing in an operating system?',
    options: ['A security breach', 'When the CPU spends more time paging (swapping memory to disk) than executing processes', 'When a process writes to unallocated memory', 'Rapid context switching between high-priority threads'], correctAnswer: 1,
    explanation: 'Thrashing occurs when active memory exceeds physical RAM, causing constant swapping that tanks performance.', tags: ['OS', 'Virtual Memory']
  },
  {
    id: 'H2-OS-003', paperId: 'hard-2', category: 'OS', difficulty: 'Easy', type: 'single-choice',
    question: 'Which of the following best prevents thrashing?',
    options: ['Increasing CPU speed', 'Adding more physical RAM or reducing the degree of multiprogramming', 'Switching to a faster hard drive', 'Disabling the cache'], correctAnswer: 1,
    explanation: 'Thrashing is fundamentally a memory exhaustion issue. More RAM or fewer concurrent processes solves it.', tags: ['OS', 'Thrashing']
  },

  // Agile (3)
  {
    id: 'H2-AG-001', paperId: 'hard-2', category: 'Agile', difficulty: 'Hard', type: 'multiple-choice',
    question: 'In the Scaled Agile Framework (SAFe), what occurs during PI (Program Increment) Planning? (Select multiple)',
    options: ['Teams commit to PI Objectives', 'The Product Owner single-handedly writes all code', 'Cross-functional teams identify dependencies', 'Management sets the vision and context'], correctAnswer: [0, 2, 3],
    explanation: 'PI Planning is a face-to-face event where teams align on vision, identify dependencies, and commit to objectives.', tags: ['Agile', 'SAFe']
  },
  {
    id: 'H2-AG-002', paperId: 'hard-2', category: 'Agile', difficulty: 'Medium', type: 'single-choice',
    question: 'Epic vs Feature vs Story: What is the correct hierarchy from largest to smallest?',
    options: ['Story -> Feature -> Epic', 'Epic -> Story -> Feature', 'Epic -> Feature -> Story', 'Feature -> Epic -> Story'], correctAnswer: 2,
    explanation: 'Epics are large initiatives broken into Features, which are further sliced into User Stories for sprint execution.', tags: ['Agile', 'Requirements']
  },
  {
    id: 'H2-AG-003', paperId: 'hard-2', category: 'Agile', difficulty: 'Medium', type: 'single-choice',
    question: 'What is the primary role of a Scrum Master?',
    options: ['To manage the project budget', 'To act as a servant-leader, removing impediments and facilitating Scrum events', 'To write the detailed technical specs', 'To assign daily tasks to developers'], correctAnswer: 1,
    explanation: 'The Scrum Master coaches the team in Scrum practices and removes blockers (impediments).', tags: ['Agile', 'Scrum']
  }
];
