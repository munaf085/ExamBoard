import { WrittenQuestion } from '../../types';

export const hard1Questions: WrittenQuestion[] = [
  // CSharp / OOP (8)
  {
    id: 'H1-CS-001', paperId: 'hard-1', category: 'CSharp', difficulty: 'Hard', type: 'code-output',
    question: 'What is the output of this C# inheritance chain?',
    code: 'class A { public A() { Console.Write("A "); } } class B : A { public B() { Console.Write("B "); } } class C : B { public C() { Console.Write("C "); } } C obj = new C();',
    options: ['C B A ', 'A B C ', 'C ', 'Compilation Error'], correctAnswer: 1,
    explanation: 'Constructors are called from the base class down to the derived class.', tags: ['C#', 'OOP', 'Constructors']
  },
  {
    id: 'H1-CS-002', paperId: 'hard-1', category: 'CSharp', difficulty: 'Hard', type: 'code-output',
    question: 'What is the output with explicit interface implementation?',
    code: 'interface I1 { void Print(); } interface I2 { void Print(); } class MyClass : I1, I2 { void I1.Print() { Console.Write("I1 "); } void I2.Print() { Console.Write("I2 "); } } MyClass obj = new MyClass(); ((I1)obj).Print();',
    options: ['I1', 'I2', 'Compilation Error', 'Runtime Exception'], correctAnswer: 0,
    explanation: 'Explicit interface implementation requires casting to the interface to call the method.', tags: ['C#', 'Interface']
  },
  {
    id: 'H1-CS-003', paperId: 'hard-1', category: 'CSharp', difficulty: 'Medium', type: 'single-choice',
    question: 'Static vs instance method confusion: Can a static method access non-static members of the same class directly?',
    options: ['Yes, always', 'No, never', 'Only if the members are protected', 'Yes, using the this keyword'], correctAnswer: 1,
    explanation: 'Static methods belong to the class, not an instance, so they cannot access instance members directly.', tags: ['C#', 'Static']
  },
  {
    id: 'H1-CS-004', paperId: 'hard-1', category: 'CSharp', difficulty: 'Hard', type: 'code-output',
    question: 'Operator overloading output:',
    code: 'class Box { public int Size { get; set; } public static Box operator +(Box a, Box b) => new Box { Size = a.Size + b.Size }; } Box b1 = new Box { Size = 5 }; Box b2 = new Box { Size = 10 }; Console.Write((b1 + b2).Size);',
    options: ['5', '10', '15', 'Compilation Error'], correctAnswer: 2,
    explanation: 'The + operator is overloaded to sum the Size properties. 5 + 10 = 15.', tags: ['C#', 'Operators']
  },
  {
    id: 'H1-CS-005', paperId: 'hard-1', category: 'CSharp', difficulty: 'Hard', type: 'single-choice',
    question: 'Which statement about covariance and contravariance in C# is correct?',
    options: ['Covariance applies to method arguments, contravariance to return types', 'Covariance applies to return types (out), contravariance to arguments (in)', 'Both only apply to classes, not interfaces', 'Covariance and contravariance are identical concepts'], correctAnswer: 1,
    explanation: 'In C#, out indicates covariance (return types), and in indicates contravariance (input parameters).', tags: ['C#', 'Generics']
  },
  {
    id: 'H1-CS-006', paperId: 'hard-1', category: 'CSharp', difficulty: 'Medium', type: 'code-output',
    question: 'Exception propagation output:',
    code: 'try { throw new Exception("A"); } catch (Exception ex) { Console.Write("B "); throw; } finally { Console.Write("C "); }',
    options: ['B C (and exception thrown)', 'C B (and exception thrown)', 'B C', 'Compilation Error'], correctAnswer: 0,
    explanation: 'Catch block executes first ("B "), then finally block ("C ") before the exception propagates up.', tags: ['C#', 'Exceptions']
  },
  {
    id: 'H1-CS-007', paperId: 'hard-1', category: 'CSharp', difficulty: 'Hard', type: 'code-output',
    question: 'Delegate invocation order:',
    code: 'Action d = () => Console.Write("1 "); d += () => Console.Write("2 "); d += () => Console.Write("3 "); d -= () => Console.Write("2 "); d();',
    options: ['1 2 3 ', '1 3 ', '3 2 1 ', 'Compilation error or unexpected output'], correctAnswer: 0,
    explanation: 'The subtraction fails to remove the anonymous lambda because it is a different delegate instance. All 3 execute.', tags: ['C#', 'Delegates']
  },
  {
    id: 'H1-CS-008', paperId: 'hard-1', category: 'CSharp', difficulty: 'Medium', type: 'code-output',
    question: 'LINQ chained queries deferred execution:',
    code: 'var list = new List<int> { 1, 2 }; var q = list.Where(x => x > 1); list.Add(3); Console.Write(q.Count());',
    options: ['1', '2', '0', 'Exception'], correctAnswer: 1,
    explanation: 'LINQ uses deferred execution. The query evaluates when Count() is called, so it sees 1, 2, 3 and returns elements > 1, which are 2 and 3.', tags: ['C#', 'LINQ']
  },

  // DotNet/WebAPI (7)
  {
    id: 'H1-DN-001', paperId: 'hard-1', category: 'DotNet', difficulty: 'Hard', type: 'single-choice',
    question: 'What happens if a Singleton service takes a Scoped service as a constructor dependency?',
    options: ['It works normally, creating a new scoped service per request', 'A runtime exception (Capturing Dependency) occurs by default in .NET Core', 'The scoped service behaves as a transient service', 'The singleton service behaves as a scoped service'], correctAnswer: 1,
    explanation: 'Capturing a scoped dependency within a singleton causes scope validation to throw an exception, as the scoped service would act as a singleton.', tags: ['.NET', 'DI']
  },
  {
    id: 'H1-DN-002', paperId: 'hard-1', category: 'WebAPI', difficulty: 'Medium', type: 'multiple-choice',
    question: 'Custom middleware execution order: Which of the following is true? (Select multiple)',
    options: ['Middleware runs in the exact order it is added in Program.cs/Startup.cs', 'UseRouting must come before UseEndpoints', 'UseAuthorization can come before UseAuthentication', 'Middleware execution order does not matter'], correctAnswer: [0, 1],
    explanation: 'Order matters. UseRouting must precede UseEndpoints, and Authentication must precede Authorization.', tags: ['WebAPI', 'Middleware']
  },
  {
    id: 'H1-DN-003', paperId: 'hard-1', category: 'WebAPI', difficulty: 'Medium', type: 'single-choice',
    question: 'Difference between Action Filter and Middleware?',
    options: ['Action filters run before routing, middleware runs after', 'Middleware is MVC-specific, action filters are global', 'Action filters have access to MVC context (ModelState, Controllers), Middleware does not', 'They are exactly the same thing'], correctAnswer: 2,
    explanation: 'Action filters are part of the MVC pipeline and have access to things like ModelState and Action arguments, while middleware sits in the global HTTP pipeline.', tags: ['WebAPI', 'Filters']
  },
  {
    id: 'H1-DN-004', paperId: 'hard-1', category: 'WebAPI', difficulty: 'Hard', type: 'single-choice',
    question: 'IActionResult vs ActionResult<T>: What is the primary benefit of ActionResult<T>?',
    options: ['It prevents returning HTTP 404', 'It implicitly casts the type T to OkObjectResult and improves OpenAPI/Swagger documentation', 'It is faster than IActionResult', 'It automatically validates the model state'], correctAnswer: 1,
    explanation: 'ActionResult<T> allows returning either type T or an IActionResult, improving Swagger docs by inherently declaring the return type.', tags: ['WebAPI', 'Controllers']
  },
  {
    id: 'H1-DN-005', paperId: 'hard-1', category: 'WebAPI', difficulty: 'Medium', type: 'single-choice',
    question: 'Model state validation flow in ASP.NET Core API controllers (with [ApiController]):',
    options: ['You must manually check ModelState.IsValid in every action', 'Invalid model state automatically triggers a 400 Bad Request response before the action executes', 'Validation only occurs if explicit attributes are placed on the action', 'Model binding happens after validation'], correctAnswer: 1,
    explanation: 'The [ApiController] attribute enables automatic model state validation, returning 400 immediately if invalid.', tags: ['WebAPI', 'Validation']
  },
  {
    id: 'H1-DN-006', paperId: 'hard-1', category: 'DotNet', difficulty: 'Medium', type: 'single-choice',
    question: 'When should you use AsNoTracking() in EF Core?',
    options: ['When you intend to update the retrieved entities', 'For read-only queries where you do not plan to save changes back to the DB', 'When deleting multiple records', 'To enable lazy loading'], correctAnswer: 1,
    explanation: 'AsNoTracking() improves performance for read-only queries by avoiding the overhead of setting up change tracking.', tags: ['EFCore', 'Performance']
  },
  {
    id: 'H1-DN-007', paperId: 'hard-1', category: 'DotNet', difficulty: 'Hard', type: 'single-choice',
    question: 'What is the purpose of ConfigureAwait(false) in a class library?',
    options: ['To speed up database queries', 'To avoid deadlocks by not resuming the continuation on the original synchronization context', 'To run the task on the main UI thread', 'To prevent exceptions from bubbling up'], correctAnswer: 1,
    explanation: 'It tells the awaiter not to capture the current SynchronizationContext, which helps avoid deadlocks in UI or legacy ASP.NET apps.', tags: ['C#', 'Async']
  },

  // SQL (8)
  {
    id: 'H1-SQ-001', paperId: 'hard-1', category: 'SQL', difficulty: 'Hard', type: 'sql-analysis',
    question: 'Which query retrieves departments with an average salary greater than 50000?',
    options: ['SELECT Dept, AVG(Salary) FROM Emp GROUP BY Dept WHERE AVG(Salary) > 50000', 'SELECT Dept, AVG(Salary) FROM Emp HAVING AVG(Salary) > 50000', 'SELECT Dept, AVG(Salary) FROM Emp GROUP BY Dept HAVING AVG(Salary) > 50000', 'SELECT Dept FROM Emp WHERE Salary > 50000 GROUP BY Dept'], correctAnswer: 2,
    explanation: 'HAVING is used to filter after aggregations (GROUP BY). WHERE cannot be used with aggregate functions directly.', tags: ['SQL', 'GROUP BY']
  },
  {
    id: 'H1-SQ-002', paperId: 'hard-1', category: 'SQL', difficulty: 'Medium', type: 'sql-analysis',
    question: 'What does ROW_NUMBER() OVER(PARTITION BY DepartmentId ORDER BY Salary DESC) do?',
    options: ['Calculates the sum of salaries per department', 'Assigns a sequential integer to each row within a department, reset per department, ordered by salary', 'Finds the highest salary overall', 'Ranks salaries leaving gaps for ties'], correctAnswer: 1,
    explanation: 'ROW_NUMBER assigns unique sequential integers. PARTITION BY resets the sequence for each department.', tags: ['SQL', 'Window Functions']
  },
  {
    id: 'H1-SQ-003', paperId: 'hard-1', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'DENSE_RANK() vs RANK(): If there is a tie for 1st place, what is the rank of the next record?',
    options: ['RANK(): 2, DENSE_RANK(): 2', 'RANK(): 3, DENSE_RANK(): 2', 'RANK(): 2, DENSE_RANK(): 3', 'RANK(): 3, DENSE_RANK(): 3'], correctAnswer: 1,
    explanation: 'RANK leaves gaps (1, 1, 3). DENSE_RANK does not (1, 1, 2).', tags: ['SQL', 'Ranking']
  },
  {
    id: 'H1-SQ-004', paperId: 'hard-1', category: 'SQL', difficulty: 'Medium', type: 'single-choice',
    question: 'What is a Common Table Expression (CTE) primarily used for?',
    options: ['Creating physical temporary tables in the database', 'Providing a temporary result set that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement', 'Defining constraints on a table', 'Creating clustered indexes'], correctAnswer: 1,
    explanation: 'A CTE is a temporary named result set available only during the execution scope of a single statement.', tags: ['SQL', 'CTE']
  },
  {
    id: 'H1-SQ-005', paperId: 'hard-1', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'How does a correlated subquery differ from an ordinary subquery?',
    options: ['It runs faster than an ordinary subquery', 'It executes exactly once for the entire outer query', 'It references one or more columns from the outer query and executes once for each row evaluated by the outer query', 'It can only be used in the FROM clause'], correctAnswer: 2,
    explanation: 'Correlated subqueries depend on the outer query for their values, forcing them to execute per row of the outer query.', tags: ['SQL', 'Subquery']
  },
  {
    id: 'H1-SQ-006', paperId: 'hard-1', category: 'SQL', difficulty: 'Medium', type: 'single-choice',
    question: 'Index Scan vs Index Seek: Which is generally faster for finding a specific row?',
    options: ['Index Scan, because it reads the entire index', 'Index Seek, because it navigates the B-tree structure directly to the row', 'They perform exactly the same', 'Table Scan is faster than both'], correctAnswer: 1,
    explanation: 'An Index Seek uses the B-tree to quickly find specific rows, whereas a Scan touches every row/page in the index.', tags: ['SQL', 'Performance']
  },
  {
    id: 'H1-SQ-007', paperId: 'hard-1', category: 'SQL', difficulty: 'Hard', type: 'multiple-choice',
    question: 'Which scenarios are likely to cause a Deadlock? (Select multiple)',
    options: ['Transaction A locks Table1, Transaction B locks Table2. Both wait for each other\'s lock.', 'Two queries reading from the same table simultaneously with NOLOCK', 'A single transaction updating millions of rows', 'Transaction A updates Table1 then Table2. Transaction B updates Table2 then Table1.'], correctAnswer: [0, 3],
    explanation: 'Deadlocks occur when two or more transactions hold locks on resources the other transactions need, creating a cycle of dependencies.', tags: ['SQL', 'Transactions']
  },
  {
    id: 'H1-SQ-008', paperId: 'hard-1', category: 'SQL', difficulty: 'Hard', type: 'single-choice',
    question: 'Which transaction isolation level prevents dirty reads, non-repeatable reads, and phantom reads?',
    options: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], correctAnswer: 3,
    explanation: 'SERIALIZABLE is the highest isolation level and prevents all three phenomena.', tags: ['SQL', 'Isolation']
  },

  // DSA (7)
  {
    id: 'H1-DS-001', paperId: 'hard-1', category: 'DSA', difficulty: 'Medium', type: 'dsa-reasoning',
    question: 'In reversing a singly linked list iteratively, what are the standard three pointers typically used?',
    options: ['head, tail, mid', 'prev, curr, next', 'first, second, last', 'node, right, left'], correctAnswer: 1,
    explanation: 'prev (initially null), curr (initially head), and next (to store curr.next temporarily) are used.', tags: ['DSA', 'LinkedList']
  },
  {
    id: 'H1-DS-002', paperId: 'hard-1', category: 'DSA', difficulty: 'Easy', type: 'single-choice',
    question: 'When implementing a Stack using an array, what condition indicates an overflow?',
    options: ['top == -1', 'top == 0', 'top == array.length - 1', 'top == array.length'], correctAnswer: 2,
    explanation: 'If the top index equals the array\'s max index (length - 1), no more elements can be pushed.', tags: ['DSA', 'Stack']
  },
  {
    id: 'H1-DS-003', paperId: 'hard-1', category: 'DSA', difficulty: 'Hard', type: 'single-choice',
    question: 'What is the time complexity of searching an element in a rotated sorted array using modified Binary Search?',
    options: ['O(N)', 'O(N log N)', 'O(log N)', 'O(1)'], correctAnswer: 2,
    explanation: 'By checking which half of the array is normally sorted, binary search still achieves O(log N).', tags: ['DSA', 'Search']
  },
  {
    id: 'H1-DS-004', paperId: 'hard-1', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'Which sorting algorithm has a worst-case time complexity of O(N log N)?',
    options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Insertion Sort'], correctAnswer: 1,
    explanation: 'Merge Sort always takes O(N log N). Quick Sort\'s worst case is O(N^2).', tags: ['DSA', 'Sorting']
  },
  {
    id: 'H1-DS-005', paperId: 'hard-1', category: 'DSA', difficulty: 'Medium', type: 'single-choice',
    question: 'How does memoization improve the recursive calculation of Fibonacci numbers?',
    options: ['It uses an iterative loop instead of recursion', 'It stores the results of expensive function calls and returns the cached result when the same inputs occur', 'It multithreads the calculations', 'It limits the depth of the recursion tree'], correctAnswer: 1,
    explanation: 'Memoization caches results, reducing the time complexity from O(2^N) to O(N).', tags: ['DSA', 'Dynamic Programming']
  },
  {
    id: 'H1-DS-006', paperId: 'hard-1', category: 'DSA', difficulty: 'Hard', type: 'single-choice',
    question: 'Best way to find all pairs in an array that sum to a target value in O(N) time?',
    options: ['Nested loops', 'Sort the array then use two pointers', 'Use a HashSet/Dictionary to store complements', 'Binary Search'], correctAnswer: 2,
    explanation: 'Hashing allows O(1) lookups for the complement (target - current_element), achieving O(N) total time.', tags: ['DSA', 'Hashing']
  },
  {
    id: 'H1-DS-007', paperId: 'hard-1', category: 'DSA', difficulty: 'Medium', type: 'code-output',
    question: 'String reversal word by word: What does "Hello World" become if you split by space, reverse the array, and join?',
    options: ['dlroW olleH', 'World Hello', 'Hello World', 'WorldHello'], correctAnswer: 1,
    explanation: 'Splitting by space gives ["Hello", "World"]. Reversing gives ["World", "Hello"]. Joining with space gives "World Hello".', tags: ['DSA', 'Strings']
  },

  // Frontend (4)
  {
    id: 'H1-FE-001', paperId: 'hard-1', category: 'Frontend', difficulty: 'Medium', type: 'single-choice',
    question: 'What is the purpose of the prototype chain in JavaScript?',
    options: ['To implement class-based strict inheritance', 'To provide a mechanism for objects to inherit properties and methods from other objects', 'To format output strings', 'To chain Promises together'], correctAnswer: 1,
    explanation: 'JavaScript uses prototype-based inheritance where objects delegate to their prototype chain.', tags: ['JavaScript', 'Prototypes']
  },
  {
    id: 'H1-FE-002', paperId: 'hard-1', category: 'Frontend', difficulty: 'Hard', type: 'single-choice',
    question: 'Event Bubbling vs Capturing: In which phase does the event propagate from the root to the target element?',
    options: ['Bubbling phase', 'Target phase', 'Capturing phase', 'Propagation phase'], correctAnswer: 2,
    explanation: 'Capturing goes from root to target. Bubbling goes from target back up to root.', tags: ['DOM', 'Events']
  },
  {
    id: 'H1-FE-003', paperId: 'hard-1', category: 'Frontend', difficulty: 'Medium', type: 'single-choice',
    question: 'What is the CSS specificity of the selector: #header .nav-item a:hover ?',
    options: ['0,1,1,2', '0,1,2,1', '0,1,2,0', '0,2,1,0'], correctAnswer: 1,
    explanation: 'ID (#header)=1, Classes (.nav-item, :hover)=2, Elements (a)=1. Result: 0,1,2,1', tags: ['CSS', 'Specificity']
  },
  {
    id: 'H1-FE-004', paperId: 'hard-1', category: 'Frontend', difficulty: 'Hard', type: 'code-output',
    question: 'Promise chaining output:',
    code: 'Promise.resolve(1).then(x => x + 1).then(x => { throw x; }).catch(err => { console.log(err); return err * 2; }).then(x => console.log(x));',
    options: ['2 then 4', '1 then 2', 'Uncaught Error', '2 then undefined'], correctAnswer: 0,
    explanation: 'x becomes 2, thrown. catch catches 2, logs 2, returns 4. The next then logs 4.', tags: ['JavaScript', 'Promises']
  },

  // OS (3)
  {
    id: 'H1-OS-001', paperId: 'hard-1', category: 'OS', difficulty: 'Medium', type: 'single-choice',
    question: 'What is a race condition?',
    options: ['When a system is thrashing', 'When multiple threads/processes access shared data concurrently and the final outcome depends on the execution order', 'When a process is starved of CPU time', 'A deadlock between two transactions'], correctAnswer: 1,
    explanation: 'Race conditions occur when timing affects the correctness of operations on shared state.', tags: ['OS', 'Concurrency']
  },
  {
    id: 'H1-OS-002', paperId: 'hard-1', category: 'OS', difficulty: 'Hard', type: 'single-choice',
    question: 'Mutex vs Semaphore: Which of the following is true?',
    options: ['A Mutex can be acquired by one thread and released by another', 'A Semaphore is always binary (0 or 1)', 'A Mutex is an ownership concept; only the thread that locks it can unlock it', 'Semaphores are faster than Mutexes'], correctAnswer: 2,
    explanation: 'A Mutex requires the locking thread to also unlock it. Semaphores are signaling mechanisms and can be signaled by any thread.', tags: ['OS', 'Synchronization']
  },
  {
    id: 'H1-OS-003', paperId: 'hard-1', category: 'OS', difficulty: 'Easy', type: 'single-choice',
    question: 'Which CPU scheduling algorithm provides the lowest average waiting time for a given set of processes?',
    options: ['First-Come, First-Served (FCFS)', 'Round Robin (RR)', 'Shortest Job First (SJF)', 'Priority Scheduling'], correctAnswer: 2,
    explanation: 'SJF is mathematically proven to give the minimum average waiting time.', tags: ['OS', 'Scheduling']
  },

  // Agile (3)
  {
    id: 'H1-AG-001', paperId: 'hard-1', category: 'Agile', difficulty: 'Medium', type: 'multiple-choice',
    question: 'Key differences between Scrum and Kanban: (Select multiple)',
    options: ['Scrum has fixed-length sprints; Kanban has continuous flow', 'Kanban enforces WIP limits; Scrum does not strictly limit WIP per column', 'Scrum requires a Scrum Master; Kanban does not mandate specific roles', 'Kanban resets the board every 2 weeks'], correctAnswer: [0, 1, 2],
    explanation: 'Kanban focuses on flow and WIP limits without fixed iterations or strict roles. Scrum uses sprints and defines roles like Scrum Master.', tags: ['Agile', 'Scrum', 'Kanban']
  },
  {
    id: 'H1-AG-002', paperId: 'hard-1', category: 'Agile', difficulty: 'Easy', type: 'single-choice',
    question: 'What is Release Planning in Agile?',
    options: ['Planning the daily tasks for developers', 'Deploying code to production every Friday', 'Determining which features will be delivered in upcoming iterations over a longer horizon', 'Writing the sprint retrospective document'], correctAnswer: 2,
    explanation: 'Release planning looks ahead across multiple sprints to map out when major features will be delivered.', tags: ['Agile', 'Planning']
  },
  {
    id: 'H1-AG-003', paperId: 'hard-1', category: 'Agile', difficulty: 'Medium', type: 'single-choice',
    question: 'What is Technical Debt?',
    options: ['The financial budget of the IT department', 'The cost of additional rework caused by choosing an easy (limited) solution now instead of a better approach', 'Money owed to software vendors', 'Bugs reported by end-users'], correctAnswer: 1,
    explanation: 'Technical debt implies taking shortcuts in code quality for speed, which incurs "interest" via future refactoring/maintenance costs.', tags: ['Agile', 'Technical Debt']
  },
  // Ensure we have EXACTLY 40 questions total.
  // CSharp (8) + DotNet (7) + SQL (8) + DSA (7) + Frontend (4) + OS (3) + Agile (3) = 40.
];
