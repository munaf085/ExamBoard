import { InterviewQuestion } from '../types';

export const round2Questions: InterviewQuestion[] = [
  {
    id: 'R2-TRICKY-01',
    round: 2,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'How does a `break` statement behave inside a nested loop? If you have 3 nested loops and call `break` in the innermost loop, what happens?',
    followUps: [
      'How would you break out of all 3 loops at once in C#?',
      'What is the difference between `break` and `continue` in this context?'
    ],
    expectedAnswer: 'A `break` statement only exits the closest enclosing loop. So if you call `break` in the innermost loop of 3 nested loops, only the 3rd (innermost) loop terminates, and execution continues to the next iteration of the 2nd loop. To break out of all 3 loops, you would need to use a `goto` statement with a label outside the loops, or use boolean flags in the outer loop conditions, or extract the loops into a separate method and use `return`.',
    keyPoints: [
      'break only exits the immediate inner loop',
      'Execution resumes at the next level up',
      'Mention goto, boolean flags, or return as ways to break out completely'
    ],
    tags: ['C#', 'loops', 'tricky']
  },
  {
    id: 'R2-TRICKY-02',
    round: 2,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'What is short-circuit evaluation in C#, and how can it be used as a trap in nested conditions?',
    followUps: [
      'What is the difference between `&&` and `&` in an if-condition?',
      'If you have `if (MethodA() && MethodB())`, will MethodB always run?'
    ],
    expectedAnswer: 'Short-circuit evaluation means the compiler stops evaluating a logical expression as soon as the result is determined. With `&&` (Logical AND), if the first operand is false, the second is NEVER evaluated. With `||` (Logical OR), if the first is true, the second is NEVER evaluated. A common trap is putting a method with side effects (like `i++` or a database call) on the right side of `&&` — if the left side is false, the side effect never happens! Using `&` (bitwise AND) instead forces both sides to evaluate.',
    keyPoints: [
      '&& stops if left side is false; || stops if left side is true',
      'Right side code might not execute (side-effect trap)',
      'Bitwise operators (&, |) force full evaluation'
    ],
    tags: ['C#', 'conditions', 'tricky']
  },
  {
    id: 'R2-CODE-01',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'WHITEBOARD TASK: Write a C# program to reverse a string without using the built-in Array.Reverse() or LINQ methods.',
    followUps: [
      'What is the time complexity of your solution?',
      'Can you do it using a `for` loop? What about a `while` loop?',
      'Why is using StringBuilder better than concatenating strings in a loop here?'
    ],
    expectedAnswer: 'The optimal way is to use a `for` loop starting from the end of the string to the beginning, appending each character to a `StringBuilder`. Alternatively, convert the string to a char array, use a two-pointer approach (left and right) to swap characters until they meet in the middle, and then create a new string from the array.',
    keyPoints: [
      'Did not use built-in reverse methods',
      'Mentioned StringBuilder for performance',
      'Time complexity is O(N)',
      'Handled null or empty string edge cases'
    ],
    tags: ['C#', 'Coding', 'Whiteboard', 'Strings']
  },
  {
    id: 'R2-CODE-02',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'WHITEBOARD TASK: Write a C# program to check if a given string is a Palindrome.',
    followUps: [
      'How do you handle spaces and capital letters? (e.g., "A man a plan a canal Panama")',
      'Can you solve it without creating a reversed copy of the string? (Two-pointer approach)'
    ],
    expectedAnswer: 'A palindrome reads the same forwards and backwards. The naive approach is reversing the string and comparing it to the original. The optimized approach uses two pointers (one at index 0, one at length-1) moving towards the center, comparing characters. You should also convert the string to lowercase and ignore non-alphanumeric characters.',
    keyPoints: [
      'Two-pointer approach is more memory efficient (O(1) space)',
      'Converted to .ToLower()',
      'Checked for edge cases (empty string, single character)'
    ],
    tags: ['C#', 'Coding', 'Whiteboard', 'Strings']
  },
  {
    id: 'R2-CODE-03',
    round: 2,
    category: 'DSA',
    difficulty: 'Easy',
    question: 'WHITEBOARD TASK: Write a C# program to print the Fibonacci series up to N terms.',
    followUps: [
      'Can you solve it using a `for` loop?',
      'Can you solve it using recursion? Which one is better for performance and why?'
    ],
    expectedAnswer: 'A `for` loop approach initializes a=0, b=1, and calculates c=a+b, then shifts the variables. Recursion `Fib(n) = Fib(n-1) + Fib(n-2)` is elegant but very slow (O(2^n) time complexity) unless memoization is used. The iterative approach is O(n) and preferred for large N.',
    keyPoints: [
      'Correctly initialized starting values (0, 1)',
      'Loop logic correct (c = a+b; a=b; b=c;)',
      'Understands why simple recursion is bad for Fibonacci'
    ],
    tags: ['C#', 'Coding', 'Whiteboard', 'Loops']
  },
  {
    id: 'R2-CODE-04',
    round: 2,
    category: 'DSA',
    difficulty: 'Easy',
    question: 'WHITEBOARD TASK: Write a C# program to find if an array contains duplicate elements.',
    followUps: [
      'What if you use two nested loops? What is the time complexity?',
      'Can you optimize it using a HashSet?'
    ],
    expectedAnswer: 'The naive way uses two nested loops to compare every element (O(N^2) time). A better way is sorting the array first and checking adjacent elements (O(N log N) time). The best way is creating a `HashSet`, iterating through the array, and checking `hashSet.Add(item)`. If it returns false, a duplicate exists (O(N) time and O(N) space).',
    keyPoints: [
      'Identified O(N^2) nested loop approach as inefficient',
      'Mentioned HashSet for O(N) time complexity optimization',
      'Mentioned Sorting for O(1) space optimization'
    ],
    tags: ['C#', 'Coding', 'Whiteboard', 'Arrays']
  },
  {
    id: 'R2-001',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'What is the difference between value types and reference types in C#?',
    followUps: [
      'Can you give examples of both?',
      'Where are they stored in memory?',
      'What happens when you pass a value type to a method vs a reference type?'
    ],
    expectedAnswer: 'Value types hold their data directly, while reference types hold a reference to their data (memory address). Value types are typically stored on the stack, whereas reference types are stored on the heap.',
    keyPoints: [
      'Value types: int, float, bool, struct, enum',
      'Reference types: class, interface, delegate, object, string',
      'Stack vs Heap storage',
      'Value types are copied by value; reference types by reference'
    ],
    tags: ['CSharp', 'Types', 'Memory']
  },
  {
    id: 'R2-002',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'Explain the difference between String and StringBuilder in C#.',
    followUps: [
      'When should you use StringBuilder instead of String?',
      'Is string a value type or reference type?',
      'What does it mean that strings are immutable?'
    ],
    expectedAnswer: 'String is immutable, meaning every time you modify it, a new string object is created in memory. StringBuilder is mutable, allowing you to modify the string without creating new objects, which is much more efficient for repeated string manipulations.',
    keyPoints: [
      'String is immutable',
      'StringBuilder is mutable',
      'StringBuilder is better for loops/heavy modifications',
      'String creates new memory allocation on change'
    ],
    tags: ['CSharp', 'Strings', 'Performance']
  },
  {
    id: 'R2-003',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'How do you use the Substring, Contains, Replace, and Split methods in C#?',
    followUps: [
      'Does Replace alter the original string?',
      'What does Split return?'
    ],
    expectedAnswer: 'These are common string manipulation methods. Substring extracts a part of a string. Contains checks if a substring exists. Replace swaps characters or substrings. Split divides a string into an array of substrings based on a delimiter.',
    keyPoints: [
      'Substring(startIndex, length)',
      'Contains returns a boolean',
      'Replace returns a new string',
      'Split returns a string array (string[])'
    ],
    tags: ['CSharp', 'Strings', 'Methods']
  },
  {
    id: 'R2-004',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'How do you declare and initialize an array in C#?',
    followUps: [
      'What is the default value of integer array elements?',
      'Can you resize an array after creation?'
    ],
    expectedAnswer: 'An array is declared using the type followed by brackets, e.g., int[]. It can be initialized using the new keyword and specifying the size, or by directly providing values in curly braces: int[] arr = new int[] { 1, 2, 3 };',
    keyPoints: [
      'Syntax: type[] name = new type[size]',
      'Arrays have a fixed size',
      'Default values are assigned (0 for int, null for reference types)',
      'Zero-indexed'
    ],
    tags: ['CSharp', 'Arrays']
  },
  {
    id: 'R2-005',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is the difference between Array and List<T> in C#?',
    followUps: [
      'When would you choose an Array over a List?',
      'Does List<T> use an array internally?'
    ],
    expectedAnswer: 'An Array has a fixed size determined at initialization, while a List<T> is dynamic and can grow or shrink as elements are added or removed. List<T> is part of the System.Collections.Generic namespace and is backed by an array internally.',
    keyPoints: [
      'Array is fixed-size',
      'List<T> is dynamic-size',
      'List<T> provides helpful methods (Add, Remove)',
      'Arrays can be slightly more performant for fixed collections'
    ],
    tags: ['CSharp', 'Collections', 'List']
  },
  {
    id: 'R2-006',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'Explain exception handling blocks in C#: try, catch, finally, and throw.',
    followUps: [
      'When does the finally block execute?',
      'What is the difference between "throw;" and "throw ex;"?'
    ],
    expectedAnswer: 'Try encloses code that might throw an exception. Catch handles the exception. Finally executes regardless of whether an exception occurred, typically for cleanup. Throw is used to raise an exception. "throw;" preserves the original stack trace, while "throw ex;" resets it.',
    keyPoints: [
      'Try block for risky code',
      'Catch block for handling errors',
      'Finally always executes (good for disposing resources)',
      '"throw;" preserves stack trace'
    ],
    tags: ['CSharp', 'Exceptions']
  },
  {
    id: 'R2-007',
    round: 2,
    category: 'OOP',
    difficulty: 'Easy',
    question: 'What is Encapsulation in OOP?',
    followUps: [
      'Give me a C# example of encapsulation.',
      'Why is encapsulation important?'
    ],
    expectedAnswer: 'Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class), while restricting direct access to some of the object\'s components. In C#, we use private fields and public properties to achieve this.',
    keyPoints: [
      'Data hiding using access modifiers',
      'Private fields',
      'Public properties with getters/setters',
      'Protects object state'
    ],
    tags: ['OOP', 'Encapsulation']
  },
  {
    id: 'R2-008',
    round: 2,
    category: 'OOP',
    difficulty: 'Easy',
    question: 'What is Abstraction in OOP? Can you give an example?',
    followUps: [
      'What is the difference between encapsulation and abstraction?',
      'How do we implement abstraction in C#?'
    ],
    expectedAnswer: 'Abstraction is the process of hiding complex implementation details and showing only the essential features of an object. In C#, it is typically achieved using abstract classes or interfaces. For example, a car interface might have a Drive() method, hiding engine mechanics.',
    keyPoints: [
      'Hiding complex implementation',
      'Exposing essential features',
      'Achieved via abstract classes and interfaces',
      'Focuses on "what" an object does, not "how"'
    ],
    tags: ['OOP', 'Abstraction']
  },
  {
    id: 'R2-009',
    round: 2,
    category: 'OOP',
    difficulty: 'Easy',
    question: 'What is Inheritance in OOP?',
    followUps: [
      'Does C# support multiple class inheritance?',
      'What is the base class for all classes in C#?'
    ],
    expectedAnswer: 'Inheritance is a mechanism where one class (derived class) acquires the properties and behaviors of another class (base class). It promotes code reusability. C# does not support multiple class inheritance, but a class can implement multiple interfaces.',
    keyPoints: [
      'Derived class inherits from Base class',
      'Promotes code reusability',
      'C# supports single class inheritance only',
      'System.Object is the ultimate base class'
    ],
    tags: ['OOP', 'Inheritance']
  },
  {
    id: 'R2-010',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'Explain Polymorphism in OOP. What are compile-time and runtime polymorphism?',
    followUps: [
      'Give an example of compile-time polymorphism.',
      'Give an example of runtime polymorphism.'
    ],
    expectedAnswer: 'Polymorphism allows objects to be treated as instances of their parent class and methods to do different things based on the object calling them. Compile-time polymorphism is achieved through method overloading. Runtime polymorphism is achieved through method overriding using virtual and override keywords.',
    keyPoints: [
      'Compile-time (Static): Method Overloading',
      'Runtime (Dynamic): Method Overriding',
      'Uses virtual and override keywords',
      'Allows generic processing of derived classes via base type'
    ],
    tags: ['OOP', 'Polymorphism']
  },
  {
    id: 'R2-011',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'What is the difference between Method Overloading and Method Overriding?',
    followUps: [
      'Can you overload a method by changing only the return type?',
      'Which keyword is required in the base class to allow overriding?'
    ],
    expectedAnswer: 'Method Overloading happens in the same class when methods share a name but have different parameters (compile-time). Method Overriding happens in derived classes to provide a specific implementation of a virtual or abstract method defined in the base class (runtime).',
    keyPoints: [
      'Overloading: Same class, different parameters',
      'Overriding: Base/Derived classes, same signature',
      'Overloading is compile-time polymorphism',
      'Overriding requires virtual/abstract and override keywords'
    ],
    tags: ['OOP', 'Methods']
  },
  {
    id: 'R2-012',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'What is the difference between an Abstract Class and an Interface in C#?',
    followUps: [
      'Can an abstract class have fields?',
      'Can an interface have method implementations in recent C# versions?'
    ],
    expectedAnswer: 'An abstract class can have access modifiers, fields, constructors, and implemented methods, while an interface traditionally only defines method signatures (though C# 8+ allows default implementations). A class can inherit only one abstract class but implement multiple interfaces.',
    keyPoints: [
      'Abstract class can have fields and constructors',
      'Interface represents a contract (can implement multiple)',
      'Single inheritance for classes, multiple for interfaces',
      'Abstract classes can have access modifiers on members'
    ],
    tags: ['OOP', 'Abstract Class', 'Interface']
  },
  {
    id: 'R2-013',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'Explain the access modifiers in C#: public, private, protected, and internal.',
    followUps: [
      'What is the default access modifier for a class?',
      'What does protected internal mean?'
    ],
    expectedAnswer: 'Public allows access from anywhere. Private restricts access to the same class. Protected allows access within the class and its derived classes. Internal restricts access to the current assembly (project).',
    keyPoints: [
      'Public: Anywhere',
      'Private: Only within the class',
      'Protected: Class and derived classes',
      'Internal: Within the same assembly'
    ],
    tags: ['CSharp', 'Access Modifiers']
  },
  {
    id: 'R2-014',
    round: 2,
    category: 'OOP',
    difficulty: 'Easy',
    question: 'What is a constructor? What are default, parameterized, and copy constructors?',
    followUps: [
      'Does a constructor have a return type?',
      'Can a class have multiple constructors?'
    ],
    expectedAnswer: 'A constructor is a special method called when an object is instantiated. A default constructor takes no parameters. A parameterized constructor takes arguments to initialize fields. A copy constructor creates a new object by copying variables from another object of the same type.',
    keyPoints: [
      'Same name as the class',
      'No return type',
      'Used for object initialization',
      'Supports overloading'
    ],
    tags: ['OOP', 'Constructors']
  },
  {
    id: 'R2-015',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is the difference between static and instance members in C#?',
    followUps: [
      'Can you call an instance method from a static method?',
      'When is a static constructor called?'
    ],
    expectedAnswer: 'Static members belong to the class itself, meaning there is only one copy shared across all instances. Instance members belong to specific objects, so each object has its own copy. Static methods cannot directly access instance members.',
    keyPoints: [
      'Static: Belongs to class, shared across instances',
      'Instance: Belongs to specific object instance',
      'Static members accessed via class name',
      'Instance members accessed via object reference'
    ],
    tags: ['CSharp', 'Static']
  },
  {
    id: 'R2-016',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'What are Properties in C# (get/set)?',
    followUps: [
      'What is an auto-implemented property?',
      'How do you make a property read-only?'
    ],
    expectedAnswer: 'Properties are members that provide a flexible mechanism to read, write, or compute the value of a private field. They use get and set accessors. You can make a property read-only by providing only a get accessor or a private set.',
    keyPoints: [
      'Encapsulates private fields',
      'Get accessor returns the value',
      'Set accessor assigns the value (using "value" keyword)',
      'Auto-properties simplify syntax (e.g., { get; set; })'
    ],
    tags: ['CSharp', 'Properties']
  },
  {
    id: 'R2-017',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'What are the virtual and override keywords used for in C#?',
    followUps: [
      'What happens if you use the "new" keyword instead of "override"?',
      'Can you override a non-virtual method?'
    ],
    expectedAnswer: 'The virtual keyword in a base class method indicates that the method can be overridden in derived classes. The override keyword in a derived class provides a new implementation for that inherited virtual or abstract method.',
    keyPoints: [
      'Virtual: Permits overriding in derived classes',
      'Override: Provides derived class implementation',
      'Enables runtime polymorphism',
      'Cannot override without virtual, abstract, or override in base'
    ],
    tags: ['OOP', 'Keywords']
  },
  {
    id: 'R2-018',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'What is a Sealed class in C#?',
    followUps: [
      'Why would you use a sealed class?',
      'Can a sealed class contain virtual methods?'
    ],
    expectedAnswer: 'A sealed class is a class that cannot be inherited by other classes. It is created using the "sealed" keyword. This is often used for security, performance, or to prevent modification of specific base implementations.',
    keyPoints: [
      'Cannot be inherited',
      'Uses "sealed" keyword',
      'Methods can also be sealed to prevent further overriding',
      'string is a common sealed class in C#'
    ],
    tags: ['CSharp', 'Sealed']
  },
  {
    id: 'R2-019',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'How do you implement multiple interfaces in C#?',
    followUps: [
      'What happens if two interfaces have a method with the exact same signature?',
      'What is explicit interface implementation?'
    ],
    expectedAnswer: 'A class can implement multiple interfaces by listing them separated by commas after a colon. If multiple interfaces have methods with the same name, the class can use explicit interface implementation (e.g., void IInterface1.MethodName()) to avoid naming conflicts.',
    keyPoints: [
      'Syntax: class MyClass : IFirst, ISecond',
      'Must implement all methods from all interfaces',
      'Explicit implementation resolves naming conflicts',
      'Explicitly implemented methods are private to the class'
    ],
    tags: ['OOP', 'Interfaces']
  },
  {
    id: 'R2-020',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What are Generics in C#? What is their main benefit?',
    followUps: [
      'Give an example of a generic collection.',
      'What does the "where" constraint do in generics?'
    ],
    expectedAnswer: 'Generics allow you to define classes, methods, and interfaces with placeholders (type parameters, like <T>) for the data types they store or use. The main benefits are type safety and performance (avoiding boxing/unboxing).',
    keyPoints: [
      'Uses <T> syntax',
      'Provides type safety at compile time',
      'Improves performance by avoiding boxing/unboxing',
      'List<T> is a common example'
    ],
    tags: ['CSharp', 'Generics']
  },
  {
    id: 'R2-021',
    round: 2,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'Explain the difference between IEnumerable, ICollection, and IList in C#.',
    followUps: [
      'Which one should you return from a method if you only need iteration?',
      'Does IEnumerable support adding items?'
    ],
    expectedAnswer: 'IEnumerable supports simple iteration (foreach). ICollection inherits IEnumerable and adds Count, Add, Remove, and Clear. IList inherits ICollection and adds indexing (access by index like list[0]) and Insert.',
    keyPoints: [
      'IEnumerable: Read-only iteration (forward only)',
      'ICollection: Adds Count and modification methods',
      'IList: Adds index-based access',
      'Use the least derived interface needed for better abstraction'
    ],
    tags: ['CSharp', 'Collections', 'Interfaces']
  },
  {
    id: 'R2-022',
    round: 2,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'What is recursion? Can you write a basic example for calculating a factorial?',
    followUps: [
      'What is a base case and why is it important?',
      'What happens if there is no base case?'
    ],
    expectedAnswer: 'Recursion is a programming technique where a method calls itself to solve smaller instances of the same problem. A base case is required to stop the recursion. For example: int Factorial(int n) { if(n <= 1) return 1; return n * Factorial(n - 1); }',
    keyPoints: [
      'Method calls itself',
      'Requires a base case to terminate',
      'Without a base case, causes StackOverflowException',
      'Useful for trees, graphs, math sequences'
    ],
    tags: ['Programming', 'Recursion']
  },
  {
    id: 'R2-023',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'How would you write an algorithm to reverse a string in C# without using built-in Array.Reverse?',
    followUps: [
      'What is the time complexity of your approach?',
      'How would you do it using a StringBuilder?'
    ],
    expectedAnswer: 'You can convert the string to a char array, use two pointers (start and end), and swap the characters while moving the pointers towards the center. Finally, construct a new string from the array. This operates in O(n) time.',
    keyPoints: [
      'Use char array or StringBuilder',
      'Two-pointer approach (start, end)',
      'Swap characters',
      'O(n) time complexity'
    ],
    tags: ['DSA', 'Strings', 'Algorithm']
  },
  {
    id: 'R2-024',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'Write an algorithm to check if a string is a palindrome.',
    followUps: [
      'How do you handle spaces and casing?',
      'Can you do it without creating a new string?'
    ],
    expectedAnswer: 'A palindrome reads the same forwards and backwards. The optimal approach is using two pointers (left at 0, right at length-1) and comparing characters while moving inwards. If any characters differ, return false; if pointers cross, return true.',
    keyPoints: [
      'Two-pointer approach',
      'Compare left and right characters',
      'O(n) time complexity, O(1) space',
      'Ignore case/spaces if required'
    ],
    tags: ['DSA', 'Strings', 'Algorithm']
  },
  {
    id: 'R2-025',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'How do you find duplicate elements in an integer array efficiently?',
    followUps: [
      'What is the time complexity if you use nested loops?',
      'How does a HashSet improve the solution?'
    ],
    expectedAnswer: 'The most efficient way is to use a HashSet. As you iterate through the array, attempt to add each element to the HashSet. If Add() returns false, the element is a duplicate. This achieves O(n) time complexity.',
    keyPoints: [
      'Brute force (nested loops) is O(n²)',
      'HashSet Add() is O(1)',
      'Overall HashSet solution is O(n) time and O(n) space',
      'Sorting then checking adjacent elements takes O(n log n)'
    ],
    tags: ['DSA', 'Arrays', 'Algorithm']
  },
  {
    id: 'R2-026',
    round: 2,
    category: 'Programming',
    difficulty: 'Medium',
    question: 'Write a recursive method to generate the nth number in the Fibonacci sequence.',
    followUps: [
      'Why is naive recursive Fibonacci inefficient?',
      'How can you optimize it (Memoization)?'
    ],
    expectedAnswer: 'The sequence is 0, 1, 1, 2, 3... The recursive method is: int Fib(int n) { if (n <= 1) return n; return Fib(n-1) + Fib(n-2); }. This is O(2^n) time complexity and can be heavily optimized using dynamic programming or memoization.',
    keyPoints: [
      'Base cases: n=0 returns 0, n=1 returns 1',
      'Recursive step: Fib(n-1) + Fib(n-2)',
      'Exponential time complexity O(2^n)',
      'Memoization caches intermediate results'
    ],
    tags: ['Programming', 'Recursion', 'Math']
  },
  {
    id: 'R2-027',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'Explain the difference between Time Complexity O(1), O(n), O(n²), and O(log n).',
    followUps: [
      'Give an example algorithm for O(n²).',
      'Why is O(log n) considered highly efficient?'
    ],
    expectedAnswer: 'O(1) is constant time (e.g., dictionary lookup). O(n) is linear time, scaling directly with input (e.g., simple loop). O(n²) is quadratic time (e.g., nested loops). O(log n) is logarithmic, halving the search space each step (e.g., binary search).',
    keyPoints: [
      'O(1): Execution time does not depend on input size',
      'O(n): Time grows linearly with input',
      'O(n²): Time grows quadratically (usually nested loops)',
      'O(log n): Very fast, usually divide-and-conquer'
    ],
    tags: ['DSA', 'Big-O', 'Complexity']
  },
  {
    id: 'R2-028',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'Compare Linear Search and Binary Search.',
    followUps: [
      'What is the prerequisite for using Binary Search?',
      'What are their respective time complexities?'
    ],
    expectedAnswer: 'Linear search iterates through every element one by one (O(n)). Binary search requires a sorted array and repeatedly halves the search interval (O(log n)). Binary search is much faster for large datasets but requires sorting first.',
    keyPoints: [
      'Linear search: O(n), no prerequisites',
      'Binary search: O(log n), requires sorted collection',
      'Binary search uses low, high, and mid pointers',
      'Linear is fine for small or unsorted data'
    ],
    tags: ['DSA', 'Searching']
  },
  {
    id: 'R2-029',
    round: 2,
    category: 'DSA',
    difficulty: 'Easy',
    question: 'Explain the Bubble Sort algorithm.',
    followUps: [
      'What is its time complexity?',
      'Is it used in production environments?'
    ],
    expectedAnswer: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements "bubble" to the top in each pass. Its worst-case time complexity is O(n²), making it inefficient for large datasets.',
    keyPoints: [
      'Compares and swaps adjacent elements',
      'Multiple passes until no swaps are needed',
      'Time complexity O(n²)',
      'Rarely used in practice due to poor performance'
    ],
    tags: ['DSA', 'Sorting']
  },
  {
    id: 'R2-030',
    round: 2,
    category: 'DSA',
    difficulty: 'Easy',
    question: 'What is the difference between a Stack and a Queue?',
    followUps: [
      'Give a real-world software example of a Stack.',
      'What are the primary methods used in both?'
    ],
    expectedAnswer: 'A Stack follows Last-In-First-Out (LIFO) logic, like a stack of plates (Push, Pop, Peek). A Queue follows First-In-First-Out (FIFO) logic, like a line at a store (Enqueue, Dequeue, Peek).',
    keyPoints: [
      'Stack: LIFO (Last In First Out)',
      'Queue: FIFO (First In First Out)',
      'Stack methods: Push(), Pop()',
      'Queue methods: Enqueue(), Dequeue()'
    ],
    tags: ['DSA', 'Data Structures']
  },
  {
    id: 'R2-031',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'Explain the structure of a Singly Linked List.',
    followUps: [
      'How does it differ from an Array?',
      'What is a Doubly Linked List?'
    ],
    expectedAnswer: 'A Singly Linked List consists of nodes where each node contains data and a reference (pointer) to the next node in the sequence. It allows efficient insertions and deletions but lacks direct index access (like arrays).',
    keyPoints: [
      'Consists of Nodes (Data + Next Pointer)',
      'Head points to the first node',
      'Dynamic size',
      'No random access (must traverse from Head)'
    ],
    tags: ['DSA', 'Data Structures', 'Linked List']
  },
  {
    id: 'R2-032',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is the "using" statement in C# used for?',
    followUps: [
      'What interface must an object implement to be used in a "using" block?',
      'What happens when the block exits?'
    ],
    expectedAnswer: 'The "using" statement ensures that IDisposable objects are properly disposed of once the block is exited, even if an exception occurs. It essentially compiles down to a try/finally block that calls Dispose().',
    keyPoints: [
      'Manages resources (files, database connections)',
      'Requires object to implement IDisposable',
      'Automatically calls Dispose()',
      'Syntactic sugar for try/finally'
    ],
    tags: ['CSharp', 'Memory Management']
  },
  {
    id: 'R2-033',
    round: 2,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'Explain the difference between ref and out parameters in C#.',
    followUps: [
      'Do both allow a method to modify the passed variable?',
      'Which one requires initialization before passing?'
    ],
    expectedAnswer: 'Both ref and out are used to pass arguments by reference. A "ref" parameter must be initialized before being passed to the method. An "out" parameter does not need prior initialization, but the called method must assign a value to it before returning.',
    keyPoints: [
      'Both pass by reference',
      'ref requires initialization before method call',
      'out must be initialized inside the called method',
      'out often used to return multiple values'
    ],
    tags: ['CSharp', 'Parameters']
  },
  {
    id: 'R2-034',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What are Extension Methods in C#?',
    followUps: [
      'What are the requirements to create an extension method?',
      'What keyword is used for the first parameter?'
    ],
    expectedAnswer: 'Extension methods allow you to add new methods to existing types without modifying the original type. They are defined as static methods inside a static class, and the first parameter specifies the type being extended, preceded by the "this" keyword.',
    keyPoints: [
      'Adds functionality to existing types',
      'Must be in a static class',
      'Method must be static',
      'First parameter uses "this" keyword'
    ],
    tags: ['CSharp', 'Methods']
  },
  {
    id: 'R2-035',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is a Delegate in C#?',
    followUps: [
      'How is it different from a normal method?',
      'What are Action and Func delegates?'
    ],
    expectedAnswer: 'A delegate is a type that safely encapsulates a method, similar to a function pointer in C++. It allows methods to be passed as parameters. Action (no return type) and Func (has return type) are built-in generic delegates.',
    keyPoints: [
      'Type-safe function pointer',
      'Used for events and callbacks',
      'Action: Delegate with void return type',
      'Func: Delegate with a return type'
    ],
    tags: ['CSharp', 'Delegates']
  },
  {
    id: 'R2-036',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'Explain the difference between "is" and "as" operators in C#.',
    followUps: [
      'What does "as" return if the conversion fails?',
      'Does "is" perform casting?'
    ],
    expectedAnswer: 'The "is" operator checks if an object is compatible with a given type and returns a boolean. The "as" operator attempts to cast an object to a specific type and returns null if the cast fails, rather than throwing an exception.',
    keyPoints: [
      '"is" evaluates to true/false',
      '"as" performs safe casting',
      '"as" returns null on failure (works only with reference/nullable types)',
      '"is" can now be used with pattern matching (is Type t)'
    ],
    tags: ['CSharp', 'Operators', 'Casting']
  },
  {
    id: 'R2-037',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'What is Boxing and Unboxing in C#?',
    followUps: [
      'Does boxing impact performance?',
      'How do Generics help avoid boxing?'
    ],
    expectedAnswer: 'Boxing is the process of converting a value type to an object type (or interface), allocating memory on the heap. Unboxing is extracting the value type from the object. Both operations carry a performance penalty.',
    keyPoints: [
      'Boxing: Value type to Reference type (heap allocation)',
      'Unboxing: Reference type back to Value type',
      'Impacts performance and memory',
      'Generics prevent unnecessary boxing/unboxing'
    ],
    tags: ['CSharp', 'Types', 'Performance']
  },
  {
    id: 'R2-038',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What are nullable types in C# and how are they used?',
    followUps: [
      'How do you declare a nullable int?',
      'What is the null-coalescing operator (??)?'
    ],
    expectedAnswer: 'Value types normally cannot be null. Nullable types allow value types to represent a normal range of values plus null. They are declared using a question mark (e.g., int?). The null-coalescing operator (??) provides a default value if the nullable type is null.',
    keyPoints: [
      'Allows null assignment to value types',
      'Syntax: Type? (e.g., int?)',
      'Under the hood: Nullable<T>',
      'HasValue and Value properties are used to check and retrieve data'
    ],
    tags: ['CSharp', 'Types']
  },
  {
    id: 'R2-039',
    round: 2,
    category: 'OOP',
    difficulty: 'Medium',
    question: 'What is object initialization syntax in C#?',
    followUps: [
      'Does it replace constructors?',
      'Can you use it without a default constructor?'
    ],
    expectedAnswer: 'Object initialization syntax allows you to create an object and set its public properties/fields in a single statement without explicitly calling a parameterized constructor. It uses curly braces {} immediately after the new keyword.',
    keyPoints: [
      'Concise way to set properties',
      'Calls the default constructor first, then sets properties',
      'Improves readability',
      'Syntax: new Class { Prop = Val }'
    ],
    tags: ['CSharp', 'OOP']
  },
  {
    id: 'R2-040',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What are partial classes in C#?',
    followUps: [
      'Why would you use a partial class?',
      'Can partial classes span across different assemblies?'
    ],
    expectedAnswer: 'Partial classes allow the definition of a single class to be split across multiple files. During compilation, the compiler combines them into a single class. They are heavily used in code generation (like Entity Framework or WinForms) so custom code isn\'t overwritten.',
    keyPoints: [
      'Splits class definition across files',
      'Uses "partial" keyword',
      'All parts must be in same assembly and namespace',
      'Great for separating auto-generated code from user code'
    ],
    tags: ['CSharp', 'Classes']
  },
  {
    id: 'R2-041',
    round: 2,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'Explain the concept of Garbage Collection in .NET.',
    followUps: [
      'What are GC Generations?',
      'Can you force Garbage Collection?'
    ],
    expectedAnswer: 'Garbage Collection (GC) is an automatic memory management feature in .NET that frees memory occupied by objects that are no longer referenced. It optimizes performance by dividing the heap into Generations (0, 1, 2) based on object lifespan.',
    keyPoints: [
      'Automatic memory management for the managed heap',
      'Cleans up unreferenced objects',
      'Generations 0, 1, and 2 improve efficiency',
      'GC.Collect() forces collection but is rarely recommended'
    ],
    tags: ['CSharp', 'Memory', 'GC']
  },
  {
    id: 'R2-042',
    round: 2,
    category: 'Programming',
    difficulty: 'Hard',
    question: 'What is a lambda expression in C#?',
    followUps: [
      'How does it relate to delegates?',
      'What does the => operator mean?'
    ],
    expectedAnswer: 'A lambda expression is an anonymous function used to create delegates or expression tree types. It uses the lambda declaration operator => (reads as "goes to"). They are heavily used in LINQ queries.',
    keyPoints: [
      'Anonymous inline function',
      'Uses => operator',
      'Often used with LINQ and Func/Action delegates',
      'Syntax: (input-parameters) => expression'
    ],
    tags: ['CSharp', 'LINQ', 'Delegates']
  },
  {
    id: 'R2-043',
    round: 2,
    category: 'CSharp',
    difficulty: 'Easy',
    question: 'What is the purpose of the Enum type in C#?',
    followUps: [
      'What is the underlying data type of an Enum by default?',
      'Can you assign specific integer values to Enum members?'
    ],
    expectedAnswer: 'An Enum (enumeration) is a value type defined by a set of named integer constants. It makes code more readable and less error-prone by replacing magic numbers with meaningful names.',
    keyPoints: [
      'Defines a set of named constants',
      'Improves code readability',
      'Underlying type is int by default',
      'Values can be explicitly assigned'
    ],
    tags: ['CSharp', 'Types']
  },
  {
    id: 'R2-044',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is the dynamic keyword in C#?',
    followUps: [
      'How is it different from the "var" keyword?',
      'When are type checks performed for dynamic variables?'
    ],
    expectedAnswer: 'The dynamic keyword tells the compiler to bypass compile-time type checking. Type checking and member resolution occur at runtime. Unlike "var" (which is strongly typed at compile time), a dynamic variable can change types at runtime.',
    keyPoints: [
      'Bypasses compile-time checking',
      'Resolved at runtime (RuntimeBinderException if fails)',
      'Different from var (var is statically typed)',
      'Useful for COM interop, Reflection, or JSON parsing'
    ],
    tags: ['CSharp', 'Types']
  },
  {
    id: 'R2-045',
    round: 2,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'Explain the difference between constant (const) and readonly in C#.',
    followUps: [
      'When is a const variable evaluated?',
      'Can readonly fields be assigned in a constructor?'
    ],
    expectedAnswer: 'A "const" must be initialized at declaration and is evaluated at compile-time. A "readonly" field can be initialized at declaration or inside the constructor, and is evaluated at runtime, making it more flexible.',
    keyPoints: [
      'const: Compile-time constant, cannot change',
      'readonly: Runtime constant',
      'readonly can be assigned in a constructor',
      'const is implicitly static'
    ],
    tags: ['CSharp', 'Modifiers']
  },
  {
    id: 'R2-046',
    round: 2,
    category: 'Programming',
    difficulty: 'Easy',
    question: 'What is the difference between a for loop and a foreach loop in C#?',
    followUps: [
      'Can you modify a collection while iterating with foreach?',
      'Which loop requires an indexer?'
    ],
    expectedAnswer: 'A "for" loop relies on an indexer to iterate, allowing modification of the loop variable. A "foreach" loop iterates over any collection implementing IEnumerable. You cannot modify the collection (add/remove) while iterating with foreach.',
    keyPoints: [
      'for: index-based, good for arrays/lists',
      'foreach: IEnumerable-based, reads elements sequentially',
      'Cannot modify collection during foreach',
      'foreach is generally more readable'
    ],
    tags: ['CSharp', 'Loops']
  },
  {
    id: 'R2-047',
    round: 2,
    category: 'OOP',
    difficulty: 'Hard',
    question: 'What is Dependency Inversion Principle (D in SOLID)?',
    followUps: [
      'How is it related to interfaces?',
      'What is Dependency Injection?'
    ],
    expectedAnswer: 'The Dependency Inversion Principle states that high-level modules should not depend on low-level modules; both should depend on abstractions (interfaces). It decouples systems, making them easier to test and maintain.',
    keyPoints: [
      'Depend on abstractions, not concretions',
      'Part of SOLID principles',
      'Enables loose coupling',
      'Dependency Injection is a technique to achieve this'
    ],
    tags: ['OOP', 'SOLID', 'Design']
  },
  {
    id: 'R2-048',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'What is a Hash Table (Dictionary in C#) and how does it work?',
    followUps: [
      'What is its average time complexity for lookups?',
      'What happens during a hash collision?'
    ],
    expectedAnswer: 'A Dictionary in C# is a collection of Key-Value pairs. It uses a hash function to compute an index into an array of buckets, from which the desired value can be found. It offers O(1) average time complexity for lookups.',
    keyPoints: [
      'Stores Key-Value pairs',
      'Uses Hash Function to calculate index',
      'O(1) average time complexity for search/insert',
      'Collisions are handled internally (e.g., chaining)'
    ],
    tags: ['DSA', 'Data Structures']
  },
  {
    id: 'R2-049',
    round: 2,
    category: 'DSA',
    difficulty: 'Hard',
    question: 'What is a Binary Search Tree (BST)?',
    followUps: [
      'What rule must node values follow?',
      'What is the time complexity of searching a balanced BST?'
    ],
    expectedAnswer: 'A BST is a node-based tree data structure where each node has at most two children. For any given node, all elements in its left subtree are less than the node, and all elements in the right subtree are greater. Search time is O(log n) if balanced.',
    keyPoints: [
      'Left child < Parent < Right child',
      'O(log n) time complexity for search/insert (if balanced)',
      'Degrades to O(n) if highly unbalanced',
      'In-order traversal yields sorted elements'
    ],
    tags: ['DSA', 'Trees']
  },
  {
    id: 'R2-050',
    round: 2,
    category: 'DSA',
    difficulty: 'Medium',
    question: 'Explain the Two-Pointer technique in array problems.',
    followUps: [
      'When would you use this technique?',
      'Give an example problem where it is useful.'
    ],
    expectedAnswer: 'The two-pointer technique involves using two variables to keep track of indices in an array, usually starting at the beginning and end, and moving towards each other. It is optimal for problems like reversing an array or finding pairs in a sorted array.',
    keyPoints: [
      'Reduces nested loops to a single pass',
      'Often requires a sorted array',
      'Common for palindrome checks or target sum problems',
      'Usually achieves O(n) time complexity'
    ],
    tags: ['DSA', 'Algorithms', 'Arrays']
  }
];
