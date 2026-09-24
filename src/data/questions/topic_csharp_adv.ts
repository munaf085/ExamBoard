import { WrittenQuestion } from '../../types';

export const topicCsharpAdvQuestions: WrittenQuestion[] = [
  // Exception Handling (7)
  {
    id: 'TADV-001',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'In what order are the blocks of a try-catch-finally statement executed if an exception is thrown?',
    options: [
      'try -> finally -> catch',
      'try -> catch -> finally',
      'catch -> try -> finally',
      'finally -> catch -> try'
    ],
    correctAnswer: 1,
    explanation: 'The try block executes first. If an exception occurs, execution jumps to the catch block. After the catch block (or if no exception occurred), the finally block is guaranteed to execute.',
    tags: ['exception-handling', 'try-catch']
  },
  {
    id: 'TADV-002',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `try {
    throw new ArgumentNullException();
}
catch (ArgumentException) {
    Console.Write("Argument ");
}
catch (Exception) {
    Console.Write("Exception ");
}
finally {
    Console.Write("Finally");
}`,
    options: [
      'Argument Exception Finally',
      'Argument Finally',
      'Exception Finally',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'ArgumentNullException derives from ArgumentException, so the first catch block matches. Only one catch block executes. Then finally executes.',
    tags: ['exception-handling', 'catch-order']
  },
  {
    id: 'TADV-003',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'single-choice',
    question: 'What is the difference between `throw;` and `throw ex;` in a catch block?',
    options: [
      'There is no difference, both rethrow the exception.',
      '`throw ex;` preserves the original stack trace, while `throw;` resets it.',
      '`throw;` preserves the original stack trace, while `throw ex;` resets it to the current line.',
      '`throw;` can only be used in a finally block.'
    ],
    correctAnswer: 2,
    explanation: 'Using `throw;` preserves the original stack trace of the exception. Using `throw ex;` resets the stack trace, making it look like the exception originated from the catch block.',
    tags: ['exception-handling', 'throw']
  },
  {
    id: 'TADV-004',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'When creating a custom exception class, which base class should you inherit from by convention?',
    options: [
      'System.SystemException',
      'System.ApplicationException',
      'System.Exception',
      'System.CustomException'
    ],
    correctAnswer: 2,
    explanation: 'Microsoft recommends deriving custom exceptions from System.Exception. ApplicationException is no longer recommended as a base class.',
    tags: ['exception-handling', 'custom-exceptions']
  },
  {
    id: 'TADV-005',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'multiple-choice',
    question: 'Under which circumstances might a `finally` block NOT execute? (Select all that apply)',
    options: [
      'When an exception is not caught by any catch block.',
      'When Environment.FailFast() is called in the try block.',
      'When the try block contains a return statement.',
      'When a StackOverflowException occurs.'
    ],
    correctAnswer: [1, 3],
    explanation: 'The finally block will not execute if Environment.FailFast is called, or in cases of severe unhandled runtime errors like StackOverflowException. A return statement in try still executes the finally block.',
    tags: ['exception-handling', 'finally']
  },
  {
    id: 'TADV-006',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the purpose of the Exception.InnerException property?',
    options: [
      'It contains the message of the current exception.',
      'It holds the exception that caused the current exception, if any.',
      'It stores the stack trace of the inner method calls.',
      'It represents an exception thrown inside a catch block.'
    ],
    correctAnswer: 1,
    explanation: 'InnerException is used to wrap an original exception inside a new exception, providing a chain of exceptions that led to the current error.',
    tags: ['exception-handling', 'inner-exception']
  },
  {
    id: 'TADV-007',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `public static string Test()
{
    try {
        return "Try ";
    }
    finally {
        Console.Write("Finally ");
    }
}
// Calling Test();`,
    options: [
      'Try Finally',
      'Try',
      'Finally Try',
      'Finally (and returns "Try ")'
    ],
    correctAnswer: 3,
    explanation: 'The finally block executes before the method actually returns. The output will be "Finally " printed to the console, and then the method returns the string "Try ".',
    tags: ['exception-handling', 'finally']
  },

  // Generics (5)
  {
    id: 'TADV-008',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is a primary benefit of using Generics in C#?',
    options: [
      'Increased runtime polymorphism',
      'Type safety without boxing/unboxing overhead',
      'Reduced memory usage for static classes',
      'Automatic garbage collection of value types'
    ],
    correctAnswer: 1,
    explanation: 'Generics provide type safety at compile time and eliminate the need for boxing and unboxing when working with value types, improving performance.',
    tags: ['generics', 'benefits']
  },
  {
    id: 'TADV-009',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following generic method invocation?',
    code: `public static void PrintType<T>(T value) {
    Console.WriteLine(typeof(T).Name);
}
PrintType(42);`,
    options: [
      'int',
      'Int32',
      'T',
      'Object'
    ],
    correctAnswer: 1,
    explanation: 'The compiler infers T as int (Int32). typeof(Int32).Name returns "Int32".',
    tags: ['generics', 'methods']
  },
  {
    id: 'TADV-010',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'single-choice',
    question: 'What does the generic constraint `where T : new()` mean?',
    options: [
      'T must be a value type.',
      'T must be a reference type.',
      'T must have a public parameterless constructor.',
      'T must implement the IDisposable interface.'
    ],
    correctAnswer: 2,
    explanation: 'The `new()` constraint specifies that the type argument must have a public parameterless constructor, allowing instantiation using `new T()`.',
    tags: ['generics', 'constraints']
  },
  {
    id: 'TADV-011',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the difference between `IEnumerable` and `IEnumerable<T>`?',
    options: [
      'IEnumerable<T> is for arrays only, IEnumerable is for lists.',
      'IEnumerable<T> is strongly typed and avoids boxing for value types, whereas IEnumerable works with objects.',
      'IEnumerable provides more LINQ extension methods than IEnumerable<T>.',
      'There is no difference, one is just an alias for the other.'
    ],
    correctAnswer: 1,
    explanation: 'IEnumerable<T> is the generic, strongly-typed version. It implements IEnumerable, but avoids boxing/unboxing because it yields type T instead of object.',
    tags: ['generics', 'interfaces']
  },
  {
    id: 'TADV-012',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'Given the following generic class, which instantiation is valid?',
    code: `class Box<T> where T : class {}`,
    options: [
      'Box<int> box1 = new Box<int>();',
      'Box<string> box2 = new Box<string>();',
      'Box<struct> box3 = new Box<struct>();',
      'Box<DateTime> box4 = new Box<DateTime>();'
    ],
    correctAnswer: 1,
    explanation: 'The constraint `where T : class` requires T to be a reference type. string is a reference type, while int, struct, and DateTime are value types.',
    tags: ['generics', 'class', 'constraints']
  },

  // Delegates & Events (7)
  {
    id: 'TADV-013',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following delegate invocation?',
    code: `Func<int, string, bool> check = (x, s) => x.ToString() == s;
Console.WriteLine(check(5, "5"));`,
    options: [
      'True',
      'False',
      'Compilation Error',
      'Runtime Exception'
    ],
    correctAnswer: 0,
    explanation: 'The built-in Func<int, string, bool> expects an int and a string, and returns a bool. The lambda matches this signature, and 5.ToString() equals "5".',
    tags: ['delegates', 'func']
  },
  {
    id: 'TADV-014',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which built-in delegate type represents a method that takes parameters but does not return a value (void)?',
    options: [
      'Func',
      'Predicate',
      'Action',
      'EventHandler'
    ],
    correctAnswer: 2,
    explanation: 'Action delegates encapsulate a method that has no return value (void).',
    tags: ['delegates', 'action']
  },
  {
    id: 'TADV-015',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of this multicast delegate invocation?',
    code: `Action action = () => Console.Write("A");
action += () => Console.Write("B");
action -= () => Console.Write("A");
action();`,
    options: [
      'A',
      'B',
      'AB',
      'Compilation error'
    ],
    correctAnswer: 2,
    explanation: 'Lambda expressions create new instances of delegates. The `-=` operator tries to remove a specific delegate instance. Since the lambda provided to `-=` is a different instance than the first lambda, it does not remove the first one. So both "A" and "B" execute.',
    tags: ['delegates', 'multicast']
  },
  {
    id: 'TADV-016',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What does the `event` keyword do when applied to a delegate field?',
    options: [
      'It makes the delegate execute asynchronously.',
      'It restricts external classes from directly invoking the delegate or assigning it directly (=).',
      'It requires the delegate to return a boolean value.',
      'It automatically implements a thread-safe singleton pattern.'
    ],
    correctAnswer: 1,
    explanation: 'The event keyword encapsulates a delegate, allowing external classes to only subscribe (+=) or unsubscribe (-=), but preventing them from overwriting the invocation list (=) or invoking it directly.',
    tags: ['events', 'event-keyword']
  },
  {
    id: 'TADV-017',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the standard signature for an `EventHandler` delegate in .NET?',
    options: [
      'void EventHandler(object sender, EventArgs e)',
      'bool EventHandler(object sender, EventArgs e)',
      'void EventHandler(EventArgs e)',
      'void EventHandler()'
    ],
    correctAnswer: 0,
    explanation: 'The standard signature for .NET events is a void-returning method that takes the sender (object) and the event data (EventArgs).',
    tags: ['events', 'eventhandler']
  },
  {
    id: 'TADV-018',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output?',
    code: `Func<int, int> multiply = x => x * 2;
multiply += x => x * 3;
Console.WriteLine(multiply(2));`,
    options: [
      '4',
      '6',
      '10',
      'Compilation Error'
    ],
    correctAnswer: 1,
    explanation: 'For multicast delegates with a return type, only the result of the LAST invoked method in the invocation list is returned. The last added delegate is x => x * 3. So 2 * 3 = 6.',
    tags: ['delegates', 'multicast-return']
  },
  {
    id: 'TADV-019',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'Which lambda expression correctly implements this delegate?',
    code: `Func<int, bool> isEven;`,
    options: [
      'isEven = x => x % 2 == 0;',
      'isEven = x => { x % 2 == 0 };',
      'isEven = (int x) => x % 2 == 0 ? true : "false";',
      'isEven = () => true;'
    ],
    correctAnswer: 0,
    explanation: 'Lambda expression syntax `x => x % 2 == 0` correctly takes an int parameter and implicitly returns a boolean. Option 1 is valid syntax without braces.',
    tags: ['delegates', 'lambda']
  },

  // LINQ (6)
  {
    id: 'TADV-020',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What does deferred execution mean in LINQ?',
    options: [
      'Queries run on a background thread.',
      'The query is not executed until you iterate over the query variable.',
      'The query results are cached in memory.',
      'The query is evaluated at compile time.'
    ],
    correctAnswer: 1,
    explanation: 'Deferred execution means the evaluation of an expression is delayed until its realized value is actually required, typically by iterating over it with a foreach loop or calling ToList().',
    tags: ['linq', 'deferred-execution']
  },
  {
    id: 'TADV-021',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output?',
    code: `var numbers = new List<int> { 1, 2, 3 };
var query = numbers.Where(n => n > 1);
numbers.Add(4);
Console.WriteLine(query.Count());`,
    options: [
      '1',
      '2',
      '3',
      '0'
    ],
    correctAnswer: 2,
    explanation: 'Because of deferred execution, the query is executed when Count() is called. At that point, the list contains 1, 2, 3, 4. The numbers > 1 are 2, 3, and 4. Thus the count is 3.',
    tags: ['linq', 'deferred-execution']
  },
  {
    id: 'TADV-022',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which of the following LINQ methods forces immediate execution?',
    options: [
      'Select()',
      'Where()',
      'OrderBy()',
      'ToList()'
    ],
    correctAnswer: 3,
    explanation: 'Conversion methods like ToList(), ToArray(), ToDictionary() force immediate execution of the query.',
    tags: ['linq', 'immediate-execution']
  },
  {
    id: 'TADV-023',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the difference between `Any()` and `All()` in LINQ?',
    options: [
      'Any checks if a single element matches, All checks if all elements match.',
      'Any checks if the collection is empty, All counts the collection.',
      'Any works on IQueryable, All works on IEnumerable.',
      'There is no difference.'
    ],
    correctAnswer: 0,
    explanation: 'Any() returns true if at least one element satisfies a condition (or if the collection is just not empty). All() returns true only if every element satisfies the condition.',
    tags: ['linq', 'any-all']
  },
  {
    id: 'TADV-024',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output?',
    code: `int[] arr = { 1, 2, 3, 4, 5 };
var result = arr.Where(x => x > 2).Select(x => x * 2).FirstOrDefault();
Console.WriteLine(result);`,
    options: [
      '3',
      '4',
      '6',
      '8'
    ],
    correctAnswer: 2,
    explanation: 'Where filters to {3, 4, 5}. Select maps to {6, 8, 10}. FirstOrDefault takes the first element, which is 6.',
    tags: ['linq', 'chaining']
  },
  {
    id: 'TADV-025',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'Which method syntax is equivalent to this query?',
    code: `var res = from x in list where x > 5 select x;`,
    options: [
      'list.Select(x => x > 5);',
      'list.Where(x => x > 5);',
      'list.Where(x => x < 5);',
      'list.Any(x => x > 5);'
    ],
    correctAnswer: 1,
    explanation: 'The query syntax translates directly to method syntax calls. The where clause maps to Where(). Since no transformation is applied to x, the implicit select does not strictly require a Select method call in its most optimized form, and `list.Where(x => x > 5)` produces the identical result type and values.',
    tags: ['linq', 'query-syntax']
  },

  // Async/Await & Tasks (6)
  {
    id: 'TADV-026',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What are the valid return types for an `async` method in C#?',
    options: [
      'void, Task, and Task<T>',
      'only Task and Task<T>',
      'void and Task',
      'any type can be returned directly'
    ],
    correctAnswer: 0,
    explanation: 'An async method can return Task, Task<T>, or void (though async void should generally only be used for event handlers). Since C# 7, it can also return ValueTask and other async types, but the provided options make void/Task/Task<T> the standard classical answer.',
    tags: ['async', 'return-types']
  },
  {
    id: 'TADV-027',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'single-choice',
    question: 'Why should you avoid using `async void` except for event handlers?',
    options: [
      'It runs synchronously and blocks the UI thread.',
      'Exceptions thrown in an async void method cannot be caught by a calling method and will crash the process.',
      'It uses more memory than async Task.',
      'It cannot use the await keyword inside the body.'
    ],
    correctAnswer: 1,
    explanation: 'Unhandled exceptions in an async void method are raised directly on the SynchronizationContext that started them, bypassing the caller\'s try/catch blocks and often crashing the application.',
    tags: ['async', 'async-void']
  },
  {
    id: 'TADV-028',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What does the `await` keyword do?',
    options: [
      'It blocks the current thread until the awaited task completes.',
      'It starts a new background thread to execute the task.',
      'It suspends execution of the async method until the task completes, yielding control back to the caller.',
      'It forces the task to complete synchronously.'
    ],
    correctAnswer: 2,
    explanation: 'await non-blockingly suspends the execution of the async method, allowing the calling thread to do other work until the awaited task is complete.',
    tags: ['async', 'await']
  },
  {
    id: 'TADV-029',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What can happen if you call `.Result` or `.Wait()` on a Task inside a UI thread or ASP.NET classic context?',
    options: [
      'The task will run twice as fast.',
      'A deadlock can occur if the task tries to resume on the same context.',
      'A StackOverflowException is thrown.',
      'The UI thread becomes faster.'
    ],
    correctAnswer: 1,
    explanation: 'Blocking on async code with .Result or .Wait() can cause deadlocks if the async method captures a SynchronizationContext (like in UI apps or old ASP.NET) and needs it to resume, but the thread is currently blocked waiting for the task.',
    tags: ['async', 'deadlock']
  },
  {
    id: 'TADV-030',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'When should you use `Task.Run()`?',
    options: [
      'For I/O-bound operations like database queries or HTTP calls.',
      'For CPU-bound operations to offload work to a thread pool thread.',
      'Whenever you use the async keyword.',
      'To wait for a task to complete synchronously.'
    ],
    correctAnswer: 1,
    explanation: 'Task.Run() queues work to run on the ThreadPool. It is ideal for offloading expensive CPU-bound work off the main/UI thread. I/O-bound work should not use Task.Run(), but rather async I/O APIs.',
    tags: ['async', 'task-run']
  },
  {
    id: 'TADV-031',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'single-choice',
    question: 'What is the primary purpose of calling `ConfigureAwait(false)` on a Task?',
    options: [
      'To prevent the task from ever finishing.',
      'To tell the runtime not to marshal the continuation back to the original SynchronizationContext, avoiding deadlocks and improving performance.',
      'To force the task to run on the main UI thread.',
      'To disable all exceptions inside the task.'
    ],
    correctAnswer: 1,
    explanation: 'ConfigureAwait(false) configures the task so that continuations do not have to run on the captured context (e.g., the UI thread). This is a best practice in library code to prevent deadlocks and save overhead.',
    tags: ['async', 'configureawait']
  },

  // Memory & Garbage Collection (5)
  {
    id: 'TADV-032',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Where are reference type objects allocated in memory in C#?',
    options: [
      'The Stack',
      'The Managed Heap',
      'The CPU Registers',
      'The Unmanaged Heap'
    ],
    correctAnswer: 1,
    explanation: 'In C#, instances of reference types (classes, arrays) are allocated on the Managed Heap, while their references might be on the stack.',
    tags: ['memory', 'heap']
  },
  {
    id: 'TADV-033',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Why is it generally recommended NOT to call `GC.Collect()` manually?',
    options: [
      'It deletes all variables in scope.',
      'It interferes with the Garbage Collector\'s self-tuning algorithms and can degrade application performance.',
      'It immediately closes the application.',
      'It causes a memory leak.'
    ],
    correctAnswer: 1,
    explanation: 'The .NET Garbage Collector is self-tuning. Forcing a collection can promote objects to older generations prematurely and ruin the heuristic tuning of the GC, degrading performance.',
    tags: ['memory', 'gc']
  },
  {
    id: 'TADV-034',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the main difference between `Finalize()` (destructor) and `Dispose()`?',
    options: [
      'Finalize is called deterministically by the developer, Dispose is called by the GC.',
      'Dispose is for memory cleanup, Finalize is for UI updates.',
      'Dispose is called deterministically to release unmanaged resources immediately, while Finalize is called non-deterministically by the GC.',
      'There is no difference.'
    ],
    correctAnswer: 2,
    explanation: 'Dispose() allows developers to deterministically release resources exactly when they are done with them. Finalize() is a safety net called by the GC at an unpredictable time.',
    tags: ['memory', 'dispose-finalize']
  },
  {
    id: 'TADV-035',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What syntactic sugar does C# provide for automatically calling `Dispose()` on an `IDisposable` object?',
    code: `// Which statement ensures Dispose is called?
___ (var stream = new FileStream("test.txt", FileMode.Open)) {
    // ...
}`,
    options: [
      'try',
      'dispose',
      'using',
      'lock'
    ],
    correctAnswer: 2,
    explanation: 'The `using` statement translates into a try/finally block that automatically calls Dispose() on the object when the block is exited.',
    tags: ['memory', 'using']
  },
  {
    id: 'TADV-036',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'single-choice',
    question: 'What is a `WeakReference` in .NET?',
    options: [
      'A reference that cannot be passed to methods.',
      'A reference that allows the GC to collect the object if no strong references exist, while still allowing access to it if it hasn\'t been collected.',
      'A reference to a value type.',
      'A reference that never allows the object to be collected.'
    ],
    correctAnswer: 1,
    explanation: 'WeakReference references an object while still allowing the Garbage Collector to reclaim the object. It is useful for caching objects that are expensive to create but can be safely garbage collected if memory is low.',
    tags: ['memory', 'weakreference']
  },

  // Miscellaneous Modern C# (4)
  {
    id: 'TADV-037',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What feature introduced in C# 8.0 helps prevent NullReferenceExceptions by expressing intent regarding nullability?',
    options: [
      'Dynamic types',
      'Nullable value types (int?)',
      'Nullable reference types',
      'The null-coalescing operator'
    ],
    correctAnswer: 2,
    explanation: 'Nullable reference types (C# 8.0) allow you to specify whether a reference type variable is allowed to be null (`string?`) or not (`string`), with the compiler providing warnings if null safety is violated.',
    tags: ['modern-csharp', 'nullable']
  },
  {
    id: 'TADV-038',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of this C# 8+ switch expression?',
    code: `int val = 2;
string result = val switch
{
    1 => "One",
    2 => "Two",
    _ => "Other"
};
Console.WriteLine(result);`,
    options: [
      'One',
      'Two',
      'Other',
      'Compilation Error'
    ],
    correctAnswer: 1,
    explanation: 'The switch expression pattern matches `val`. Since `val` is 2, it matches `2 => "Two"`. The `_` is the discard/default pattern.',
    tags: ['modern-csharp', 'switch-expression']
  },
  {
    id: 'TADV-039',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which C# 9 feature provides concise syntax for declaring immutable reference types with value-based equality?',
    options: [
      'struct',
      'record',
      'readonly class',
      'init-only properties'
    ],
    correctAnswer: 1,
    explanation: 'Records, introduced in C# 9, are reference types by default that provide built-in value-based equality, non-destructive mutation (with `with` expressions), and are ideal for immutable data models.',
    tags: ['modern-csharp', 'records']
  },
  {
    id: 'TADV-040',
    paperId: 'topic-csharp-adv',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'code-output',
    question: 'What does this C# tuple syntax do?',
    code: `var (name, age) = GetPerson(); // returns ("Alice", 30)
Console.WriteLine(name);`,
    options: [
      'Creates a new class Person.',
      'Deconstructs the tuple returned by GetPerson into two local variables.',
      'Throws an exception.',
      'Assigns a tuple object to the name variable.'
    ],
    correctAnswer: 1,
    explanation: 'This syntax is known as tuple deconstruction. It extracts the elements of the returned tuple into separate local variables `name` and `age`.',
    tags: ['modern-csharp', 'tuples']
  }
];
