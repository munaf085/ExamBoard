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

export const javaInterviewTraps: JavaInterviewQuestion[] = [
  {
    id: "jt-1",
    moduleId: "java-traps",
    question: "String Pool Trap: == vs .equals()",
    expectedAnswer: "If you write `String s1 = \"A\"; String s2 = \"A\";`, `s1 == s2` is true because both refer to the same object in the String Pool. However, `String s3 = new String(\"A\");`, `s1 == s3` is false because new String() forces creation of a new object in heap memory. Always use .equals() to avoid this trap.",
    followUps: [
      "What happens if you use intern() on s3?",
      "Why does Java have a String Pool?",
    ],
    keyPoints: [
      "Literals go to String Pool",
      "new String() goes to Heap",
      "== compares references",
      "Always use .equals() for Strings",
    ],
    difficulty: "Medium",
    type: "debugging",
    tags: [
      "strings",
      "traps",
    ]
  },
  {
    id: "jt-2",
    moduleId: "java-traps",
    question: "Integer Caching Trap",
    expectedAnswer: "Java caches Integer objects from -128 to 127. So, `Integer a = 127; Integer b = 127; a == b` is true. But `Integer c = 128; Integer d = 128; c == d` is false. They fall outside the cache range, so distinct objects are created. Always use .equals() for comparing wrapper classes.",
    followUps: [
      "Can you change the Integer cache size?",
      "Does this happen with Double or Float?",
    ],
    keyPoints: [
      "Integer cache range: -128 to 127",
      "Outside range creates new objects",
      "== fails for large numbers",
      "Use .equals() for wrapper objects",
    ],
    difficulty: "Medium",
    type: "debugging",
    tags: [
      "primitives",
      "traps",
    ]
  },
  {
    id: "jt-3",
    moduleId: "java-traps",
    question: "Final does not mean Immutable",
    expectedAnswer: "Declaring a reference variable as `final` means the reference cannot point to a different object. However, it does NOT make the object itself immutable. For example, a `final List<String> list = new ArrayList<>();` means you cannot reassign `list`, but you can still call `list.add(\"item\")`.",
    followUps: [
      "How do you make a list truly immutable?",
      "What is the difference between final and immutable?",
    ],
    keyPoints: [
      "final locks the reference",
      "Object internal state can still change",
      "Use List.of() for immutability",
      "Common misconception",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "keywords",
      "traps",
    ]
  },
  {
    id: "jt-4",
    moduleId: "java-traps",
    question: "Static Method Hiding vs Overriding",
    expectedAnswer: "Static methods cannot be overridden, they are hidden. If a subclass has a static method with the same signature as the parent, calling it via a parent reference will execute the parent's method. Polymorphism (dynamic binding) does not apply to static methods, which are resolved at compile-time.",
    followUps: [
      "What happens if you add @Override to a static method?",
      "Why are static methods resolved at compile time?",
    ],
    keyPoints: [
      "Static methods are bound at compile-time",
      "Polymorphism does not apply",
      "Method hiding, not overriding",
      "Calling depends on reference type, not object type",
    ],
    difficulty: "Hard",
    type: "difference",
    tags: [
      "oop",
      "traps",
    ]
  },
  {
    id: "jt-5",
    moduleId: "java-traps",
    question: "Can a constructor be final, static, or abstract?",
    expectedAnswer: "No, a constructor cannot be final, static, or abstract. Constructors are not inherited, so final makes no sense. They are tied to object instantiation, so static makes no sense. They must have an implementation to create the object, so abstract makes no sense.",
    followUps: [
      "Can a constructor be private?",
      "How do you create objects if constructor is private?",
    ],
    keyPoints: [
      "Constructors are not inherited",
      "Cannot be final",
      "Cannot be static",
      "Cannot be abstract",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "constructors",
      "traps",
    ]
  },
  {
    id: "jt-6",
    moduleId: "java-traps",
    question: "Can an interface have a constructor?",
    expectedAnswer: "No, an interface cannot have a constructor. Interfaces cannot be instantiated directly, and they do not hold instance state (non-static, non-final fields), so there is nothing for a constructor to initialize. Abstract classes, however, can have constructors.",
    followUps: [
      "Why can abstract classes have constructors but interfaces cannot?",
      "How are default methods initialized?",
    ],
    keyPoints: [
      "Interfaces cannot be instantiated",
      "No instance variables to initialize",
      "Abstract classes CAN have constructors",
      "Interfaces only have abstract/default methods",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "oop",
      "traps",
    ]
  },
  {
    id: "jt-7",
    moduleId: "java-traps",
    question: "Multiple Inheritance Ambiguity (Diamond Problem)",
    expectedAnswer: "Java prevents multiple inheritance of state (classes) to avoid the Diamond Problem. However, with Java 8 default methods, a class can implement two interfaces with the same default method. This causes a compile-time error. The class must override the method to resolve the ambiguity.",
    followUps: [
      "How do you call a specific interface's default method?",
      "Why does Java allow multiple inheritance of interfaces?",
    ],
    keyPoints: [
      "No multiple inheritance for classes",
      "Interfaces can cause method collisions",
      "Compiler forces you to override",
      "Use InterfaceName.super.method() to resolve",
    ],
    difficulty: "Medium",
    type: "scenario",
    tags: [
      "oop",
      "traps",
    ]
  },
  {
    id: "jt-8",
    moduleId: "java-traps",
    question: "Finally block with a return statement",
    expectedAnswer: "If a `try` or `catch` block has a return statement, the `finally` block will still execute before the method actually returns. However, if the `finally` block ALSO has a return statement, it will swallow the original return value (or exception) and return its own value instead. This is a bad practice.",
    followUps: [
      "What happens if finally throws an exception?",
      "Does finally run if System.exit() is called?",
    ],
    keyPoints: [
      "finally always executes",
      "finally return overrides try/catch return",
      "Swallows exceptions",
      "Never put return in finally",
    ],
    difficulty: "Hard",
    type: "debugging",
    tags: [
      "exceptions",
      "traps",
    ]
  },
  {
    id: "jt-9",
    moduleId: "java-traps",
    question: "Overriding and Exception rules",
    expectedAnswer: "When overriding a method, the subclass method cannot throw broader or new checked exceptions than the parent method. It can throw narrower (subclasses of the original) checked exceptions, or any unchecked (RuntimeException) exceptions. Throwing new checked exceptions breaks the parent's contract.",
    followUps: [
      "Can the overriding method throw NO exceptions?",
      "What about constructors?",
    ],
    keyPoints: [
      "Cannot throw new checked exceptions",
      "Can throw subclasses of parent exception",
      "Can throw any unchecked exception",
      "Preserves Liskov Substitution Principle",
    ],
    difficulty: "Hard",
    type: "difference",
    tags: [
      "exceptions",
      "traps",
    ]
  },
  {
    id: "jt-10",
    moduleId: "java-traps",
    question: "Autoboxing with == operator",
    expectedAnswer: "When comparing a primitive to a wrapper class object using `==`, Java automatically unboxes the wrapper class to a primitive and compares their values. E.g., `int a = 10; Integer b = new Integer(10); a == b` is true. But `Integer c = new Integer(10); b == c` is false (reference comparison).",
    followUps: [
      "Can unboxing cause a NullPointerException here?",
      "Why is this dangerous?",
    ],
    keyPoints: [
      "Primitive == Wrapper forces unboxing",
      "Wrapper == Wrapper is reference check",
      "Can throw NullPointerException if Wrapper is null",
      "Always understand what == is comparing",
    ],
    difficulty: "Medium",
    type: "debugging",
    tags: [
      "primitives",
      "traps",
    ]
  },
  {
    id: "jt-11",
    moduleId: "java-traps",
    question: "Collections.sort vs Arrays.sort",
    expectedAnswer: "Collections.sort() is used to sort Lists (like ArrayList), while Arrays.sort() is used to sort arrays (like int[] or String[]). Under the hood, Collections.sort() simply dumps the list into an array, calls Arrays.sort(), and then resets the list elements.",
    followUps: [
      "What algorithm does Arrays.sort use?",
      "Can you sort a Set?",
    ],
    keyPoints: [
      "Collections.sort is for Lists",
      "Arrays.sort is for arrays",
      "Internally uses Dual-Pivot Quicksort or Timsort",
      "Sets must be converted to Lists first",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "collections",
      "traps",
    ]
  },
  {
    id: "jt-12",
    moduleId: "java-traps",
    question: "Pass-by-value with Objects",
    expectedAnswer: "Java passes object references by value. If you pass an object to a method and modify its properties, the original object changes. But if you assign a completely new object to that reference variable inside the method (`obj = new Object()`), the original object outside the method remains unchanged.",
    followUps: [
      "Why do people confuse this with pass-by-reference?",
      "How do you swap two objects in a method?",
    ],
    keyPoints: [
      "Object reference is copied",
      "Modifying state affects original",
      "Reassigning reference does NOT affect original",
      "Strictly pass-by-value",
    ],
    difficulty: "Hard",
    type: "scenario",
    tags: [
      "methods",
      "traps",
    ]
  },
  {
    id: "jt-13",
    moduleId: "java-traps",
    question: "Math.round(-0.5) trap",
    expectedAnswer: "Math.round() rounds to the closest long or int. For ties (exactly .5), it rounds towards positive infinity. Therefore, `Math.round(0.5)` is 1, but `Math.round(-0.5)` is 0, not -1. This often trips up developers expecting symmetric rounding away from zero.",
    followUps: [
      "What does Math.floor(-0.5) return?",
      "What does Math.ceil(-0.5) return?",
    ],
    keyPoints: [
      "Rounds towards positive infinity on ties",
      "Math.round(0.5) == 1",
      "Math.round(-0.5) == 0",
      "Asymmetric behavior for negative numbers",
    ],
    difficulty: "Hard",
    type: "debugging",
    tags: [
      "core",
      "traps",
    ]
  },
  {
    id: "jt-14",
    moduleId: "java-traps",
    question: "String concatenation evaluation order",
    expectedAnswer: "String concatenation evaluates left to right. `1 + 2 + \"3\"` evaluates as `(1 + 2) + \"3\"`, resulting in `\"33\"`. However, `\"3\" + 1 + 2` evaluates as `(\"3\" + 1) + 2`, converting the numbers to strings immediately, resulting in `\"312\"`.",
    followUps: [
      "How do you fix the second case to result in \"33\"?",
      "Does this affect performance?",
    ],
    keyPoints: [
      "Evaluates left to right",
      "Math first: 1 + 2 + \"3\" = \"33\"",
      "String first: \"3\" + 1 + 2 = \"312\"",
      "Use parentheses to control order",
    ],
    difficulty: "Medium",
    type: "debugging",
    tags: [
      "strings",
      "traps",
    ]
  },
  {
    id: "jt-15",
    moduleId: "java-traps",
    question: "Null method overloading resolution",
    expectedAnswer: "If you have two overloaded methods, `print(Object o)` and `print(String s)`, and you call `print(null)`, Java will choose the most specific method, which is `print(String)`. If there is an ambiguity (e.g., `print(String)` and `print(Integer)`), it will result in a compile-time error.",
    followUps: [
      "How do you force it to call print(Object)?",
      "What does \"most specific method\" mean?",
    ],
    keyPoints: [
      "Chooses most specific subtype",
      "null matches any object reference type",
      "print(String) chosen over print(Object)",
      "Ambiguous signatures cause compile error",
    ],
    difficulty: "Hard",
    type: "scenario",
    tags: [
      "oop",
      "traps",
    ]
  },
  {
    id: "jt-16",
    moduleId: "java-traps",
    question: "Double Brace Initialization memory leak",
    expectedAnswer: "Double brace initialization `new ArrayList<String>() {{ add(\"A\"); }}` creates an anonymous inner class with a hidden reference to the enclosing instance. If this list is returned or cached, the entire enclosing class cannot be garbage collected, causing a memory leak. Use List.of() instead.",
    followUps: [
      "Why does it create a hidden reference?",
      "Is this still a problem in newer Java versions?",
    ],
    keyPoints: [
      "Creates an anonymous inner class",
      "Holds reference to parent object",
      "Causes memory leaks",
      "Avoid it; use List.of() or Arrays.asList()",
    ],
    difficulty: "Hard",
    type: "why",
    tags: [
      "collections",
      "traps",
    ]
  },
  {
    id: "jt-17",
    moduleId: "java-traps",
    question: "Default interface methods and Object methods",
    expectedAnswer: "An interface cannot provide a default implementation for any of the methods defined in `java.lang.Object` (like equals, hashCode, or toString). This is because class implementations always win over interface default methods, making it meaningless and confusing. The compiler will reject it.",
    followUps: [
      "Why does class implementation always win?",
      "How do you enforce equals() contract in an interface?",
    ],
    keyPoints: [
      "Cannot provide default for Object methods",
      "Class methods take precedence",
      "Results in compile-time error",
      "Interfaces define behavior, not identity",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "oop",
      "traps",
    ]
  },
  {
    id: "jt-18",
    moduleId: "java-traps",
    question: "Volatile vs Atomic",
    expectedAnswer: "`volatile` ensures visibility of a variable across threads (reads from main memory, not CPU cache) but does NOT guarantee atomicity. Operations like `count++` are not safe with just `volatile` because they involve read-modify-write. For thread-safe counters, use `AtomicInteger` instead.",
    followUps: [
      "What is a race condition?",
      "When is volatile sufficient?",
    ],
    keyPoints: [
      "volatile guarantees visibility",
      "volatile does NOT guarantee atomicity",
      "count++ is not atomic",
      "Use AtomicInteger for safe counters",
    ],
    difficulty: "Hard",
    type: "difference",
    tags: [
      "concurrency",
      "traps",
    ]
  },
  {
    id: "jt-19",
    moduleId: "java-traps",
    question: "Iterator.remove() vs Collection.remove()",
    expectedAnswer: "When iterating through a collection, if you use `list.remove(item)`, it will throw a ConcurrentModificationException because the structural modification counter is updated without the iterator knowing. You MUST use `iterator.remove()` to safely remove items during iteration.",
    followUps: [
      "Does a for-each loop use an iterator?",
      "Can you add elements using Iterator?",
    ],
    keyPoints: [
      "Modifying collection directly throws exception",
      "Iterator keeps internal sync state",
      "Always use iterator.remove()",
      "Affects fail-fast collections",
    ],
    difficulty: "Medium",
    type: "debugging",
    tags: [
      "collections",
      "traps",
    ]
  },
  {
    id: "jt-20",
    moduleId: "java-traps",
    question: "Thread.run() vs Thread.start()",
    expectedAnswer: "Calling `thread.start()` creates a new underlying OS thread and then executes the `run()` method inside that new thread. Calling `thread.run()` directly does NOT create a new thread; it simply executes the `run` method sequentially within the current calling thread, defeating the purpose of multithreading.",
    followUps: [
      "What happens if you call start() twice on the same thread?",
      "Why implement Runnable instead of extending Thread?",
    ],
    keyPoints: [
      "start() creates a new thread",
      "run() executes in current thread",
      "Calling run() directly is a common mistake",
      "start() can only be called once",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "concurrency",
      "traps",
    ]
  },
  {
    id: "jt-21",
    moduleId: "java-traps",
    question: "Array vs ArrayList typing",
    expectedAnswer: "Arrays in Java are covariant, meaning `Integer[]` is a subtype of `Number[]`. This can lead to ArrayStoreException at runtime if you try to put a Double into it. Generics are invariant, meaning `List<Integer>` is NOT a subtype of `List<Number>`, which catches type errors at compile-time.",
    followUps: [
      "What is Type Erasure?",
      "Why are generics invariant?",
    ],
    keyPoints: [
      "Arrays are covariant",
      "Generics are invariant",
      "Arrays check types at runtime (ArrayStoreException)",
      "Generics check types at compile-time",
    ],
    difficulty: "Hard",
    type: "difference",
    tags: [
      "core",
      "traps",
    ]
  },
  {
    id: "jt-22",
    moduleId: "java-traps",
    question: "Hash collision performance",
    expectedAnswer: "A common trap is implementing a poor `hashCode()` that returns a constant or has many collisions. This turns a HashMap from an O(1) time complexity data structure into a LinkedList with O(n) lookup time. Since Java 8, severe collisions convert the list to a Red-Black tree (O(log n)).",
    followUps: [
      "What is a Red-Black tree?",
      "How do you write a good hashCode?",
    ],
    keyPoints: [
      "Poor hashCode ruins performance",
      "Degrades O(1) to O(n) or O(log n)",
      "Java 8 mitigates with Trees",
      "Always distribute hashes evenly",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "collections",
      "traps",
    ]
  },
  {
    id: "jt-23",
    moduleId: "java-traps",
    question: "Floating point arithmetic precision",
    expectedAnswer: "Using `double` or `float` for exact monetary calculations is a trap. `0.1 + 0.2` in Java does not exactly equal `0.3` due to binary representation of fractions. Always use `BigDecimal` for currency or calculations requiring exact precision.",
    followUps: [
      "Why does binary rounding error occur?",
      "Is BigDecimal slower than primitive double?",
    ],
    keyPoints: [
      "double/float have precision loss",
      "0.1 + 0.2 != 0.3",
      "Use BigDecimal for money",
      "Binary cannot represent all decimal fractions",
    ],
    difficulty: "Easy",
    type: "scenario",
    tags: [
      "core",
      "traps",
    ]
  },
  {
    id: "jt-24",
    moduleId: "java-traps",
    question: "Static block exceptions",
    expectedAnswer: "If an exception is thrown inside a `static { }` initialization block and not caught, it results in an `ExceptionInInitializerError`. Subsequent attempts to use the class will throw a `NoClassDefFoundError`. It completely breaks the class loading process for the remainder of the JVM lifespan.",
    followUps: [
      "How do you handle exceptions in static blocks?",
      "What is the difference between ClassNotFoundException and NoClassDefFoundError?",
    ],
    keyPoints: [
      "Static blocks run at class loading",
      "Uncaught exceptions break class loading",
      "Causes ExceptionInInitializerError",
      "Followed by NoClassDefFoundError",
    ],
    difficulty: "Hard",
    type: "debugging",
    tags: [
      "core",
      "traps",
    ]
  },
  {
    id: "jt-25",
    moduleId: "java-traps",
    question: "Optional anti-patterns",
    expectedAnswer: "Using `Optional` as a field type in a class or as a method parameter is considered an anti-pattern. `Optional` is not Serializable, and it was designed specifically to be used as a method return type to clearly indicate that a value might be missing, forcing the caller to handle it.",
    followUps: [
      "Why shouldn't Optional be used as a parameter?",
      "What is the alternative to using it as a field?",
    ],
    keyPoints: [
      "Designed for return types only",
      "Not Serializable",
      "Do not use as class fields",
      "Do not use as method parameters",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "core",
      "traps",
    ]
  }
];
