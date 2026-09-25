export interface JavaInterviewQuestion {
  id: string;
  moduleId: string;
  question: string;
  expectedAnswer: string;
  followUps: string[];
  keyPoints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  type: "definition" | "why" | "how" | "difference" | "scenario" | "coding" | "debugging";
  tags: string[];
}

export const javaRound2Questions: JavaInterviewQuestion[] = [
  {
    id: "j2-1",
    moduleId: "java-core",
    question: "Why is Java platform independent?",
    expectedAnswer: "Java is platform independent because it uses a two-step process: compilation and interpretation. Java source code is compiled into bytecode by the Java compiler. This bytecode is platform-independent and can be executed on any operating system that has a Java Virtual Machine (JVM). The JVM translates bytecode into native machine code.",
    followUps: [
      "What is bytecode?",
      "Can bytecode run without JVM?",
    ],
    keyPoints: [
      "Compile once, run anywhere",
      "Bytecode is intermediate",
      "JVM is platform dependent",
      "Compiler translates to bytecode",
    ],
    difficulty: "Easy",
    type: "why",
    tags: [
      "core",
      "basics",
    ]
  },
  {
    id: "j2-2",
    moduleId: "java-core",
    question: "What is the difference between JDK, JRE, and JVM?",
    expectedAnswer: "JDK (Java Development Kit) is a full package for developing and running Java apps, containing JRE and development tools like compiler. JRE (Java Runtime Environment) provides libraries and the JVM to run Java programs. JVM (Java Virtual Machine) is the engine that actually executes the Java bytecode on a specific machine.",
    followUps: [
      "Which one is needed just to run a program?",
      "Is JVM platform independent?",
    ],
    keyPoints: [
      "JDK = JRE + dev tools",
      "JRE = JVM + libraries",
      "JVM executes bytecode",
      "JVM is platform dependent",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "core",
      "basics",
    ]
  },
  {
    id: "j2-3",
    moduleId: "java-core",
    question: "What is the difference between == and .equals() in Java?",
    expectedAnswer: "The == operator checks for reference equality, meaning it checks if both variables point to the same object in memory. The .equals() method checks for value equality, meaning it evaluates the contents of the objects. For primitives, == compares the values, but for objects, .equals() should be used to compare their actual state.",
    followUps: [
      "How do you compare strings?",
      "Can you override ==?",
    ],
    keyPoints: [
      "== compares memory references",
      ".equals() compares values",
      "Override .equals() for custom equality",
      "Use .equals() for Strings",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "objects",
    ]
  },
  {
    id: "j2-4",
    moduleId: "java-core",
    question: "Why is String immutable in Java?",
    expectedAnswer: "Strings are immutable because they are heavily used for caching, security, and thread-safety. Immutability allows Strings to be safely shared among multiple threads without synchronization. It also enables the String Pool, where multiple identical string literals share the same memory location, saving space.",
    followUps: [
      "How do you modify a string efficiently?",
      "What happens when you reassign a string?",
    ],
    keyPoints: [
      "Thread safe",
      "Enables String Pool",
      "Security for class loading",
      "Performance optimization",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "core",
      "strings",
    ]
  },
  {
    id: "j2-5",
    moduleId: "java-core",
    question: "What is the String pool?",
    expectedAnswer: "The String Pool is a special storage area in the Java heap memory where string literals are stored. When a new string literal is created, the JVM checks the pool first. If the string exists, it returns the reference; otherwise, it creates a new string in the pool. This optimizes memory by avoiding duplicate string objects.",
    followUps: [
      "How does new String() interact with the pool?",
      "What does intern() do?",
    ],
    keyPoints: [
      "Located in Heap memory",
      "Stores string literals",
      "Saves memory",
      "Reuses existing strings",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "strings",
    ]
  },
  {
    id: "j2-6",
    moduleId: "java-core",
    question: "Difference between String, StringBuilder, and StringBuffer?",
    expectedAnswer: "String is immutable, meaning any modification creates a new object. StringBuilder is mutable and not thread-safe, making it faster for single-threaded string manipulation. StringBuffer is also mutable but is synchronized and thread-safe, making it suitable for multi-threaded environments but slower than StringBuilder.",
    followUps: [
      "Which one should you use for loop concatenations?",
      "Is StringBuffer obsolete?",
    ],
    keyPoints: [
      "String is immutable",
      "StringBuilder is mutable, fast, unsynchronized",
      "StringBuffer is mutable, thread-safe",
      "Use StringBuilder mostly",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "strings",
    ]
  },
  {
    id: "j2-7",
    moduleId: "java-core",
    question: "What is autoboxing and unboxing?",
    expectedAnswer: "Autoboxing is the automatic conversion made by the Java compiler between primitive types and their corresponding wrapper classes, like int to Integer. Unboxing is the reverse process, converting wrapper classes back to primitive types. This feature simplifies code by allowing developers to mix primitives and objects seamlessly.",
    followUps: [
      "Can unboxing cause a NullPointerException?",
      "Why not use wrapper classes everywhere?",
    ],
    keyPoints: [
      "Automatic conversion",
      "Primitive to Wrapper is autoboxing",
      "Wrapper to Primitive is unboxing",
      "Can cause NullPointerException",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "core",
      "primitives",
    ]
  },
  {
    id: "j2-8",
    moduleId: "java-core",
    question: "Explain method overloading vs method overriding.",
    expectedAnswer: "Method overloading occurs when multiple methods in the same class share the same name but have different parameters (compile-time polymorphism). Method overriding happens when a subclass provides a specific implementation for a method already defined in its parent class (run-time polymorphism). Overriding requires the same signature and return type.",
    followUps: [
      "Can you overload a method by changing the return type?",
      "What is the @Override annotation?",
    ],
    keyPoints: [
      "Overloading: same name, different parameters",
      "Compile-time vs Run-time polymorphism",
      "Overriding: same signature in subclass",
      "Overriding needs inheritance",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "oop",
      "polymorphism",
    ]
  },
  {
    id: "j2-9",
    moduleId: "java-core",
    question: "What is the difference between abstract class and interface?",
    expectedAnswer: "An abstract class can have both abstract (unimplemented) and concrete (implemented) methods, and can hold state with instance variables. An interface traditionally only had abstract methods and constants, though Java 8 added default and static methods. A class can implement multiple interfaces but can only extend one abstract class.",
    followUps: [
      "When would you choose an abstract class over an interface?",
      "Can an interface have fields?",
    ],
    keyPoints: [
      "Multiple inheritance for interfaces",
      "Abstract classes can have state",
      "Interfaces define a contract",
      "Java 8 added default methods to interfaces",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "oop",
      "inheritance",
    ]
  },
  {
    id: "j2-10",
    moduleId: "java-core",
    question: "What is constructor chaining? How does this() and super() work?",
    expectedAnswer: "Constructor chaining is the process of calling one constructor from another constructor with respect to current object. this() is used to call another constructor in the same class, while super() is used to call a constructor of the parent class. They must be the first statement in a constructor and cannot be used together.",
    followUps: [
      "Can you use this() and super() in the same constructor?",
      "What happens if you don't call super()?",
    ],
    keyPoints: [
      "this() calls same class constructor",
      "super() calls parent constructor",
      "Must be the first statement",
      "Helps avoid duplicate code",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "oop",
      "constructors",
    ]
  },
  {
    id: "j2-11",
    moduleId: "java-core",
    question: "What are access modifiers in Java?",
    expectedAnswer: "Access modifiers determine the visibility and accessibility of classes, methods, and variables. Java has four types: private (accessible only within the class), default/package-private (accessible within the same package), protected (accessible in the same package and subclasses), and public (accessible from anywhere).",
    followUps: [
      "What is the default access modifier if none is specified?",
      "Can a top-level class be private?",
    ],
    keyPoints: [
      "Private: class only",
      "Default: package only",
      "Protected: package + subclasses",
      "Public: everywhere",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "core",
      "access",
    ]
  },
  {
    id: "j2-12",
    moduleId: "java-core",
    question: "What is the difference between static and instance members?",
    expectedAnswer: "Static members belong to the class itself and are shared among all instances of that class. They are initialized when the class is loaded. Instance members belong to individual objects (instances) and each object has its own copy. Static methods cannot access instance variables directly.",
    followUps: [
      "Can a static method call an instance method?",
      "When should you make a variable static?",
    ],
    keyPoints: [
      "Static belongs to class",
      "Instance belongs to object",
      "Static shared across all instances",
      "Static methods cannot use this keyword",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "modifiers",
    ]
  },
  {
    id: "j2-13",
    moduleId: "java-core",
    question: "Explain polymorphism with an example.",
    expectedAnswer: "Polymorphism means \"many forms\" and allows objects of different classes to be treated as objects of a common superclass. For example, if you have a shape class with a draw() method, subclasses like Circle and Square can override draw() to behave differently. When you call draw() on a Shape reference, the actual object type determines which method runs.",
    followUps: [
      "What are the two types of polymorphism?",
      "How is it related to dynamic method dispatch?",
    ],
    keyPoints: [
      "Compile-time (overloading)",
      "Run-time (overriding)",
      "Treating subclass as superclass",
      "Dynamic method dispatch",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "oop",
      "polymorphism",
    ]
  },
  {
    id: "j2-14",
    moduleId: "java-core",
    question: "What is encapsulation? Why is it important?",
    expectedAnswer: "Encapsulation is the bundling of data (variables) and methods that operate on that data into a single unit, usually a class. It restricts direct access to some of an object's components, often achieved using private fields and public getter/setter methods. This protects the integrity of the data and hides the internal implementation details.",
    followUps: [
      "How does encapsulation differ from abstraction?",
      "Can you have a class without setters?",
    ],
    keyPoints: [
      "Data hiding",
      "Bundles data and behavior",
      "Uses getters and setters",
      "Increases security and modularity",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "oop",
      "encapsulation",
    ]
  },
  {
    id: "j2-15",
    moduleId: "java-core",
    question: "What is the difference between checked and unchecked exceptions?",
    expectedAnswer: "Checked exceptions are checked by the compiler at compile-time; the code must handle them using try-catch or declare them using throws (e.g., IOException). Unchecked exceptions (RuntimeExceptions) occur at runtime and are not checked by the compiler (e.g., NullPointerException). Unchecked exceptions usually indicate programming errors.",
    followUps: [
      "Give an example of a checked exception.",
      "Should you catch NullPointerException?",
    ],
    keyPoints: [
      "Checked are verified at compile-time",
      "Unchecked extend RuntimeException",
      "Checked force error handling",
      "Unchecked indicate bugs",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "exceptions",
    ]
  },
  {
    id: "j2-16",
    moduleId: "java-core",
    question: "How does try-with-resources work?",
    expectedAnswer: "Try-with-resources is a feature introduced in Java 7 that automatically closes resources (like files, streams, or connections) when the try block finishes. To use it, the resource must implement the AutoCloseable interface. It eliminates the need for a finally block to manually close resources, preventing resource leaks and reducing boilerplate code.",
    followUps: [
      "Can you have multiple resources in one try-with-resources statement?",
      "Does it replace the finally block entirely?",
    ],
    keyPoints: [
      "Automatically closes resources",
      "Requires AutoCloseable interface",
      "Introduced in Java 7",
      "Prevents memory/resource leaks",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "core",
      "exceptions",
    ]
  },
  {
    id: "j2-17",
    moduleId: "java-core",
    question: "What is the difference between final, finally, and finalize?",
    expectedAnswer: "final is a keyword to restrict modification (constant variables, non-overridable methods, non-inheritable classes). finally is a block used in exception handling to execute important code regardless of whether an exception occurred. finalize() is a method called by the Garbage Collector before an object is destroyed, though it is now deprecated.",
    followUps: [
      "Can a finally block not execute?",
      "Why is finalize deprecated?",
    ],
    keyPoints: [
      "final restricts changes",
      "finally always executes after try/catch",
      "finalize is for garbage collection cleanup",
      "finalize is deprecated",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "keywords",
    ]
  },
  {
    id: "j2-18",
    moduleId: "java-core",
    question: "Write a Java program to reverse a string.",
    expectedAnswer: "To reverse a string in Java, you can use the built-in reverse() method of StringBuilder. For example: `String reversed = new StringBuilder(original).reverse().toString();`. Alternatively, you can iterate through the string backwards using a for loop and concatenate the characters, but StringBuilder is the most efficient approach.",
    followUps: [
      "How would you reverse it without StringBuilder?",
      "What is the time complexity?",
    ],
    keyPoints: [
      "Use StringBuilder.reverse()",
      "Can be done with a loop",
      "StringBuilder is O(n)",
      "Strings are immutable",
    ],
    difficulty: "Medium",
    type: "coding",
    tags: [
      "core",
      "strings",
      "coding",
    ]
  },
  {
    id: "j2-19",
    moduleId: "java-core",
    question: "Write a Java program to check if a string is a palindrome.",
    expectedAnswer: "A palindrome reads the same forwards and backwards. You can check it by comparing the original string to its reversed version using StringBuilder. Alternatively, use two pointers: one at the start and one at the end, comparing characters while moving towards the center. `while (left < right) { if (str.charAt(left++) != str.charAt(right--)) return false; } return true;`",
    followUps: [
      "How to handle spaces and case sensitivity?",
      "What is the two-pointer approach?",
    ],
    keyPoints: [
      "Compare string to its reverse",
      "Two-pointer approach is more space efficient",
      "O(n) time complexity",
      "O(1) space with two pointers",
    ],
    difficulty: "Medium",
    type: "coding",
    tags: [
      "core",
      "strings",
      "coding",
    ]
  },
  {
    id: "j2-20",
    moduleId: "java-core",
    question: "Write a Java program to find duplicate elements in an array.",
    expectedAnswer: "To find duplicates, you can use a HashSet. Iterate through the array and try to add each element to the set. Since sets do not allow duplicates, the `add()` method will return false if the element is already present, indicating a duplicate. `for(int n : arr) { if(!set.add(n)) print(n); }`",
    followUps: [
      "How to do it without extra space if array is sorted?",
      "What is the time complexity using a HashSet?",
    ],
    keyPoints: [
      "Use HashSet for O(n) time",
      "HashSet.add() returns false on duplicate",
      "Brute force takes O(n^2)",
      "Sorting first takes O(n log n)",
    ],
    difficulty: "Medium",
    type: "coding",
    tags: [
      "core",
      "arrays",
      "coding",
    ]
  },
  {
    id: "j2-21",
    moduleId: "java-core",
    question: "What is recursion? Write a recursive factorial.",
    expectedAnswer: "Recursion is a programming technique where a method calls itself to solve smaller instances of the same problem. It requires a base case to terminate and prevent infinite loops. A recursive factorial function: `int factorial(int n) { if (n == 0 || n == 1) return 1; return n * factorial(n - 1); }`.",
    followUps: [
      "What happens if you forget the base case?",
      "What is a StackOverflowError?",
    ],
    keyPoints: [
      "Method calls itself",
      "Must have a base case",
      "Reduces problem size",
      "Can cause StackOverflowError",
    ],
    difficulty: "Medium",
    type: "coding",
    tags: [
      "core",
      "dsa",
      "coding",
    ]
  },
  {
    id: "j2-22",
    moduleId: "java-core",
    question: "What is the time complexity of binary search?",
    expectedAnswer: "The time complexity of binary search is O(log n). This is because with each comparison, the search algorithm eliminates half of the remaining elements in the sorted array. The space complexity is O(1) for the iterative approach and O(log n) for the recursive approach due to the call stack.",
    followUps: [
      "Does binary search require a sorted array?",
      "What is the difference between O(n) and O(log n)?",
    ],
    keyPoints: [
      "O(log n) time complexity",
      "Requires a sorted array",
      "Halves the search space each step",
      "Iterative is O(1) space",
    ],
    difficulty: "Easy",
    type: "why",
    tags: [
      "core",
      "dsa",
    ]
  },
  {
    id: "j2-23",
    moduleId: "java-core",
    question: "Explain ArrayList vs LinkedList.",
    expectedAnswer: "ArrayList is backed by a dynamic array, making it fast for random access (O(1)) but slow for insertions/deletions in the middle (O(n)) because elements must be shifted. LinkedList uses a doubly-linked list, meaning random access is slow (O(n)) but insertions/deletions are fast (O(1)) if you have the node reference.",
    followUps: [
      "When would you prefer LinkedList over ArrayList?",
      "How does ArrayList grow in size?",
    ],
    keyPoints: [
      "ArrayList uses contiguous memory",
      "LinkedList uses node pointers",
      "ArrayList fast for access",
      "LinkedList fast for insertion/deletion",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-24",
    moduleId: "java-core",
    question: "When would you use a HashSet over a List?",
    expectedAnswer: "You should use a HashSet when you need a collection that contains only unique elements, as Sets do not allow duplicates. HashSet also provides much faster performance for search, insert, and delete operations (average O(1) time complexity) compared to a List (O(n)), because it is backed by a hash table.",
    followUps: [
      "Does HashSet maintain insertion order?",
      "How does HashSet handle null values?",
    ],
    keyPoints: [
      "HashSet guarantees uniqueness",
      "HashSet provides O(1) lookups",
      "List maintains order and allows duplicates",
      "HashSet does not maintain order",
    ],
    difficulty: "Medium",
    type: "scenario",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-25",
    moduleId: "java-core",
    question: "What is the contract between equals() and hashCode()?",
    expectedAnswer: "The contract states that if two objects are equal according to the equals() method, they must have the same hashCode(). However, if two objects have the same hashCode(), they are not necessarily equal (this is called a hash collision). If you override equals(), you must always override hashCode() to maintain this contract, especially for Hash-based collections.",
    followUps: [
      "What happens if you override equals but not hashCode?",
      "What is a hash collision?",
    ],
    keyPoints: [
      "Equal objects MUST have equal hash codes",
      "Unequal objects CAN have equal hash codes",
      "Critical for HashMap/HashSet",
      "Always override both together",
    ],
    difficulty: "Hard",
    type: "definition",
    tags: [
      "core",
      "objects",
    ]
  },
  {
    id: "j2-26",
    moduleId: "java-core",
    question: "What is the difference between Comparable and Comparator?",
    expectedAnswer: "Comparable is an interface implemented by a class to define its natural ordering using the compareTo() method (e.g., String, Integer). Comparator is a separate interface used to define external, custom sorting logic using the compare() method. Comparable modifies the class itself, while Comparator allows sorting without altering the original class.",
    followUps: [
      "Can you have multiple Comparators for a class?",
      "How do you sort a list in reverse order?",
    ],
    keyPoints: [
      "Comparable: compareTo(), natural order",
      "Comparator: compare(), custom order",
      "Comparable modifies the class",
      "Comparator is external to the class",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-27",
    moduleId: "java-core",
    question: "How does HashMap work internally?",
    expectedAnswer: "HashMap stores elements as key-value pairs using a hash table. When put() is called, it calculates the hashCode of the key to determine the bucket index. If multiple keys hash to the same bucket (collision), they are stored in a linked list. In Java 8, if a bucket's list exceeds a threshold, it converts to a balanced tree (O(log n) lookup).",
    followUps: [
      "What is the default capacity and load factor?",
      "What happens during rehashing?",
    ],
    keyPoints: [
      "Uses array of nodes (buckets)",
      "Handles collisions with LinkedList/Tree",
      "Key hashCode determines bucket",
      "Java 8 improves worst-case lookup",
    ],
    difficulty: "Hard",
    type: "how",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-28",
    moduleId: "java-core",
    question: "What is a NullPointerException and how do you prevent it?",
    expectedAnswer: "A NullPointerException (NPE) occurs at runtime when an application attempts to use an object reference that has the null value (e.g., calling a method or accessing a field on it). You prevent it by adding null checks, using Optional (Java 8), utilizing annotations like @NonNull, or ensuring proper initialization before use.",
    followUps: [
      "What is java.util.Optional?",
      "Can you catch a NullPointerException?",
    ],
    keyPoints: [
      "Thrown when referencing null",
      "Runtime exception",
      "Prevent with null checks",
      "Use Optional class",
    ],
    difficulty: "Easy",
    type: "debugging",
    tags: [
      "core",
      "exceptions",
    ]
  },
  {
    id: "j2-29",
    moduleId: "java-core",
    question: "What is pass-by-value in Java?",
    expectedAnswer: "Java is strictly pass-by-value. When a method is called, a copy of the argument is passed. For primitive types, the actual value is copied. For objects, a copy of the reference (memory address) is passed. Modifying the object's state affects the original object, but reassigning the reference inside the method does not affect the original reference.",
    followUps: [
      "Why do changes to an object inside a method persist outside?",
      "Is Java pass-by-reference?",
    ],
    keyPoints: [
      "Java is strictly pass-by-value",
      "Primitives pass a copy of the value",
      "Objects pass a copy of the reference",
      "Reassigning references doesn't affect caller",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "methods",
    ]
  },
  {
    id: "j2-30",
    moduleId: "java-core",
    question: "Can you override a static method in Java?",
    expectedAnswer: "No, you cannot override static methods. Because static methods belong to the class and not the object, they are resolved at compile-time (static binding), not runtime. If a subclass defines a static method with the same signature as the superclass, it simply \"hides\" the parent's method, which is called method hiding, not overriding.",
    followUps: [
      "What is method hiding?",
      "What happens if you try to override a static method with an instance method?",
    ],
    keyPoints: [
      "Static methods cannot be overridden",
      "Resolved at compile-time",
      "Method hiding instead of overriding",
      "Polymorphism doesn't apply",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "core",
      "oop",
    ]
  },
  {
    id: "j2-31",
    moduleId: "java-core",
    question: "What is a default method in an interface?",
    expectedAnswer: "Introduced in Java 8, a default method is a method in an interface that has a body. It allows developers to add new methods to existing interfaces without breaking the classes that implement them (backward compatibility). Implementing classes can use the default implementation or override it.",
    followUps: [
      "How is this different from an abstract class?",
      "What happens in multiple inheritance of default methods?",
    ],
    keyPoints: [
      "Has method body in interface",
      "Provides backward compatibility",
      "Can be overridden by implementing class",
      "Introduced in Java 8",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "java8",
    ]
  },
  {
    id: "j2-32",
    moduleId: "java-core",
    question: "What is the difference between List.of() and new ArrayList()?",
    expectedAnswer: "List.of() (introduced in Java 9) creates an immutable list, meaning you cannot add, remove, or modify elements after creation, and it doesn't allow null values. new ArrayList() creates a mutable, resizable array that allows modifications and accepts null elements.",
    followUps: [
      "What happens if you call add() on List.of()?",
      "Which one is more memory efficient?",
    ],
    keyPoints: [
      "List.of() is immutable",
      "ArrayList is mutable",
      "List.of() rejects nulls",
      "List.of() is more memory efficient",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-33",
    moduleId: "java-core",
    question: "What is a functional interface?",
    expectedAnswer: "A functional interface is an interface that contains exactly one abstract method. They can have multiple default or static methods. They are used as the basis for lambda expressions and method references in Java 8. The @FunctionalInterface annotation is used to enforce this rule at compile time.",
    followUps: [
      "Name a built-in functional interface.",
      "Can a functional interface have default methods?",
    ],
    keyPoints: [
      "Exactly one abstract method",
      "Target type for lambda expressions",
      "Can use @FunctionalInterface",
      "Examples: Runnable, Callable",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "java8",
    ]
  },
  {
    id: "j2-34",
    moduleId: "java-core",
    question: "What is a lambda expression? Give an example.",
    expectedAnswer: "A lambda expression is a short block of code which takes parameters and returns a value, essentially an anonymous method. It provides a clear and concise way to represent a functional interface. Example: `(a, b) -> a + b;` which implements a functional interface method taking two arguments and returning their sum.",
    followUps: [
      "How do lambdas reduce boilerplate code?",
      "What is the arrow token -> used for?",
    ],
    keyPoints: [
      "Anonymous method",
      "Implements functional interfaces",
      "Concise syntax",
      "Introduced in Java 8",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "java8",
    ]
  },
  {
    id: "j2-35",
    moduleId: "java-core",
    question: "Explain the difference between Iterator and for-each loop.",
    expectedAnswer: "A for-each loop is a cleaner syntax for iterating through a collection, but it does not allow modifying the collection during iteration. An Iterator provides explicit methods (hasNext, next) and includes a `remove()` method, making it the safe and proper way to remove elements from a collection while iterating over it.",
    followUps: [
      "What is an Iterable?",
      "Can you add elements using an Iterator?",
    ],
    keyPoints: [
      "for-each is cleaner syntax",
      "Iterator allows safe removal during iteration",
      "for-each uses Iterator internally",
      "Iterator has hasNext() and next()",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "collections",
    ]
  },
  {
    id: "j2-36",
    moduleId: "java-core",
    question: "What is ConcurrentModificationException? How to avoid it?",
    expectedAnswer: "ConcurrentModificationException is thrown when a collection is modified structurally (adding or removing elements) while iterating over it using a fail-fast iterator (like in a for-each loop). To avoid it, use the Iterator's `remove()` method, use a concurrent collection (like ConcurrentHashMap), or collect items to remove and process them after the loop.",
    followUps: [
      "What is a fail-fast vs fail-safe iterator?",
      "Does ConcurrentHashMap throw this?",
    ],
    keyPoints: [
      "Thrown on invalid concurrent modifications",
      "Occurs often in for-each loops",
      "Use Iterator.remove() to avoid",
      "Use concurrent collections",
    ],
    difficulty: "Hard",
    type: "debugging",
    tags: [
      "core",
      "collections",
      "exceptions",
    ]
  },
  {
    id: "j2-37",
    moduleId: "java-core",
    question: "What is the difference between throw and throws?",
    expectedAnswer: "The `throw` keyword is used to explicitly throw a single exception from within a method block (e.g., `throw new Exception()`). The `throws` keyword is used in a method signature to declare that the method might throw one or more exceptions, shifting the responsibility of handling them to the caller.",
    followUps: [
      "Can you use throw without throws?",
      "Can you throw multiple exceptions at once?",
    ],
    keyPoints: [
      "throw executes an exception",
      "throws declares an exception",
      "throw is inside method",
      "throws is in method signature",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "core",
      "exceptions",
    ]
  },
  {
    id: "j2-38",
    moduleId: "java-core",
    question: "What is the difference between an Error and Exception?",
    expectedAnswer: "Both extend the Throwable class. Errors indicate serious problems that a reasonable application should not try to catch (e.g., OutOfMemoryError, StackOverflowError) mostly generated by the JVM. Exceptions indicate conditions that a reasonable application might want to catch and recover from (e.g., IOException, NullPointerException).",
    followUps: [
      "Should you catch an Error?",
      "Is OutOfMemoryError an Exception?",
    ],
    keyPoints: [
      "Errors are usually unrecoverable",
      "Exceptions are often recoverable",
      "Errors come from JVM",
      "Exceptions come from code",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "core",
      "exceptions",
    ]
  },
  {
    id: "j2-39",
    moduleId: "java-core",
    question: "What is a wrapper class?",
    expectedAnswer: "A wrapper class encapsulates a primitive data type into an object. For example, Integer wraps int, and Boolean wraps boolean. They are necessary because Java collections (like ArrayList) and Generics can only store objects, not primitives. They also provide utility methods like Integer.parseInt().",
    followUps: [
      "What is the performance cost of wrapper classes?",
      "What is autoboxing?",
    ],
    keyPoints: [
      "Turns primitives into objects",
      "Required for Generics and Collections",
      "Provides utility methods",
      "Examples: Integer, Double, Boolean",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "core",
      "primitives",
    ]
  },
  {
    id: "j2-40",
    moduleId: "java-core",
    question: "Explain the purpose of the Object class.",
    expectedAnswer: "The Object class (java.lang.Object) is the root of the class hierarchy in Java. Every class has Object as a superclass directly or indirectly. It provides default implementations for essential methods like equals(), hashCode(), toString(), and clone(), ensuring that all Java objects share a common set of behaviors.",
    followUps: [
      "Name 3 methods of the Object class.",
      "Do you need to explicitly extend Object?",
    ],
    keyPoints: [
      "Root of class hierarchy",
      "Provides equals() and hashCode()",
      "Provides toString()",
      "All classes inherit it implicitly",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "core",
      "oop",
    ]
  }
];
