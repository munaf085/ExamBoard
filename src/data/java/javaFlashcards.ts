export interface JavaFlashcard {
  id: string;
  moduleId: string;
  front: string;
  back: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
}

export const javaFlashcards: JavaFlashcard[] = [
  // Required 20
  {
    id: "jf_1",
    moduleId: "java_basics",
    front: "JDK vs JRE vs JVM",
    back: "JDK = JRE + compiler+tools. JRE = JVM + libraries. JVM = runtime that executes bytecode.",
    difficulty: "Easy",
    tags: ["Basics", "Architecture"]
  },
  {
    id: "jf_2",
    moduleId: "java_basics",
    front: "== vs equals()",
    back: "== compares references (memory addresses). equals() compares content. Always use equals() for String comparison.",
    difficulty: "Easy",
    tags: ["Basics", "Equality"]
  },
  {
    id: "jf_3",
    moduleId: "java_strings",
    front: "String pool",
    back: "A special area in heap where String literals are cached. s1=\"Java\" and s2=\"Java\" point to the same object in pool.",
    difficulty: "Medium",
    tags: ["Strings", "Memory"]
  },
  {
    id: "jf_4",
    moduleId: "java_strings",
    front: "String immutability",
    back: "Once created, a String object cannot be changed. Any modification creates a new String. This enables safe sharing, caching, and thread safety.",
    difficulty: "Medium",
    tags: ["Strings", "Immutability"]
  },
  {
    id: "jf_5",
    moduleId: "java_strings",
    front: "StringBuilder vs StringBuffer",
    back: "StringBuilder is NOT thread-safe but faster. StringBuffer IS thread-safe (synchronized) but slower. Use StringBuilder in single-threaded code.",
    difficulty: "Medium",
    tags: ["Strings", "Concurrency"]
  },
  {
    id: "jf_6",
    moduleId: "java_basics",
    front: "Autoboxing",
    back: "Automatic conversion of primitive to wrapper class. int → Integer. Example: Integer i = 5; (compiler converts to Integer.valueOf(5))",
    difficulty: "Easy",
    tags: ["Basics", "Types"]
  },
  {
    id: "jf_7",
    moduleId: "java_basics",
    front: "Integer caching (-128 to 127)",
    back: "Java caches Integer objects for values -128 to 127. So Integer a=127; Integer b=127; a==b is TRUE. But Integer a=128; Integer b=128; a==b is FALSE.",
    difficulty: "Hard",
    tags: ["Basics", "Memory"]
  },
  {
    id: "jf_8",
    moduleId: "java_oop",
    front: "Method Overloading vs Overriding",
    back: "Overloading = same name, different parameters, compile-time. Overriding = same name, same parameters, subclass, runtime.",
    difficulty: "Easy",
    tags: ["OOP", "Polymorphism"]
  },
  {
    id: "jf_9",
    moduleId: "java_oop",
    front: "Abstract class vs Interface",
    back: "Abstract class: can have fields, constructors, concrete methods, single inheritance. Interface: all abstract (pre-Java 8), no fields, multiple implementation, default methods allowed in Java 8+.",
    difficulty: "Medium",
    tags: ["OOP", "Abstraction"]
  },
  {
    id: "jf_10",
    moduleId: "java_exceptions",
    front: "Checked vs Unchecked exceptions",
    back: "Checked: must be handled or declared (IOException, SQLException). Unchecked: extends RuntimeException, not required to handle (NullPointerException, ArrayIndexOutOfBoundsException).",
    difficulty: "Medium",
    tags: ["Exceptions"]
  },
  {
    id: "jf_11",
    moduleId: "java_basics",
    front: "final vs finally vs finalize",
    back: "final = keyword (immutable variable, no-override method, no-extend class). finally = try-catch block that always runs. finalize() = deprecated GC method called before object destroyed.",
    difficulty: "Medium",
    tags: ["Basics", "Keywords"]
  },
  {
    id: "jf_12",
    moduleId: "java_collections",
    front: "Comparable vs Comparator",
    back: "Comparable: natural ordering, implement in class itself, compareTo(). Comparator: external ordering, separate class/lambda, compare(). Use Comparator for multiple sort orders.",
    difficulty: "Medium",
    tags: ["Collections", "Sorting"]
  },
  {
    id: "jf_13",
    moduleId: "java_collections",
    front: "HashMap internal working",
    back: "HashMap uses array of linked lists (buckets). Stores key-value pairs. hashCode() determines bucket. equals() resolves collisions. Java 8+: buckets become red-black tree when > 8 elements.",
    difficulty: "Hard",
    tags: ["Collections", "Internals"]
  },
  {
    id: "jf_14",
    moduleId: "java_collections",
    front: "ArrayList vs LinkedList",
    back: "ArrayList: dynamic array, O(1) get, O(n) insert/delete middle. LinkedList: doubly linked, O(n) get, O(1) insert/delete at known position. Use ArrayList for most cases.",
    difficulty: "Medium",
    tags: ["Collections", "Data Structures"]
  },
  {
    id: "jf_15",
    moduleId: "spring_framework",
    front: "Spring IoC",
    back: "Inversion of Control: instead of you creating objects, Spring creates and manages them. You declare dependencies, Spring injects them. Achieved via Dependency Injection.",
    difficulty: "Medium",
    tags: ["Spring", "Architecture"]
  },
  {
    id: "jf_16",
    moduleId: "spring_framework",
    front: "@RestController",
    back: "Combines @Controller + @ResponseBody. Every method returns JSON/XML response body directly. Used for REST APIs.",
    difficulty: "Easy",
    tags: ["Spring", "Annotations"]
  },
  {
    id: "jf_17",
    moduleId: "spring_framework",
    front: "N+1 problem in JPA",
    back: "When fetching a list of entities, JPA fires 1 query for the list + N queries for each related entity. Solved by JOIN FETCH or @EntityGraph.",
    difficulty: "Hard",
    tags: ["Spring", "JPA", "Performance"]
  },
  {
    id: "jf_18",
    moduleId: "sql_basics",
    front: "INNER JOIN vs LEFT JOIN",
    back: "INNER JOIN: only matching rows from both tables. LEFT JOIN: all rows from left table + matching from right (NULL if no match).",
    difficulty: "Easy",
    tags: ["SQL", "Databases"]
  },
  {
    id: "jf_19",
    moduleId: "sql_basics",
    front: "ACID properties",
    back: "Atomicity (all or nothing), Consistency (data stays valid), Isolation (transactions don't interfere), Durability (committed changes survive failures).",
    difficulty: "Medium",
    tags: ["SQL", "Databases"]
  },
  {
    id: "jf_20",
    moduleId: "java_basics",
    front: "pass-by-value in Java",
    back: "Java always passes by value. For primitives, the value is copied. For objects, the REFERENCE is copied (both point to same object, but you can't change what the original variable points to).",
    difficulty: "Medium",
    tags: ["Basics", "Memory"]
  },

  // Additional 40
  {
    id: "jf_21",
    moduleId: "java_concurrency",
    front: "Thread vs Runnable",
    back: "Thread is a class, Runnable is an interface. Implementing Runnable is preferred as Java doesn't support multiple inheritance.",
    difficulty: "Medium",
    tags: ["Concurrency", "Basics"]
  },
  {
    id: "jf_22",
    moduleId: "java_concurrency",
    front: "volatile keyword",
    back: "Ensures visibility of variable changes across threads. Reads/writes go directly to main memory, bypassing CPU cache.",
    difficulty: "Hard",
    tags: ["Concurrency", "Keywords"]
  },
  {
    id: "jf_23",
    moduleId: "java_concurrency",
    front: "synchronized keyword",
    back: "Used for mutually exclusive access to a block or method. Prevents race conditions by locking an object monitor.",
    difficulty: "Medium",
    tags: ["Concurrency", "Synchronization"]
  },
  {
    id: "jf_24",
    moduleId: "java_concurrency",
    front: "Deadlock",
    back: "Occurs when two or more threads wait indefinitely for locks held by each other, bringing the application to a halt.",
    difficulty: "Hard",
    tags: ["Concurrency", "Issues"]
  },
  {
    id: "jf_25",
    moduleId: "java_collections",
    front: "HashSet vs TreeSet",
    back: "HashSet is backed by HashMap, unordered, O(1) operations. TreeSet is backed by TreeMap (Red-Black tree), ordered, O(log N) operations.",
    difficulty: "Medium",
    tags: ["Collections", "Sets"]
  },
  {
    id: "jf_26",
    moduleId: "java_collections",
    front: "ConcurrentHashMap",
    back: "Thread-safe map that allows concurrent reads without locking and locks only segments (buckets) during writes.",
    difficulty: "Hard",
    tags: ["Collections", "Concurrency"]
  },
  {
    id: "jf_27",
    moduleId: "java_8",
    front: "Lambda Expressions",
    back: "Anonymous functions added in Java 8. Provide clear and concise way to represent one method interface using an expression.",
    difficulty: "Easy",
    tags: ["Java 8", "Functional"]
  },
  {
    id: "jf_28",
    moduleId: "java_8",
    front: "Functional Interface",
    back: "An interface with exactly one abstract method. Annotated with @FunctionalInterface. Can be implemented by lambdas.",
    difficulty: "Easy",
    tags: ["Java 8", "Interfaces"]
  },
  {
    id: "jf_29",
    moduleId: "java_8",
    front: "Streams API",
    back: "Used to process collections of objects in a declarative way. Supports sequential and parallel execution.",
    difficulty: "Medium",
    tags: ["Java 8", "Streams"]
  },
  {
    id: "jf_30",
    moduleId: "java_8",
    front: "Intermediate vs Terminal Operations",
    back: "Intermediate ops (filter, map) return a Stream and are lazy. Terminal ops (collect, forEach) produce a result and trigger execution.",
    difficulty: "Medium",
    tags: ["Java 8", "Streams"]
  },
  {
    id: "jf_31",
    moduleId: "java_8",
    front: "Optional class",
    back: "A container object which may or may not contain a non-null value. Helps avoid NullPointerExceptions.",
    difficulty: "Medium",
    tags: ["Java 8", "Utilities"]
  },
  {
    id: "jf_32",
    moduleId: "java_oop",
    front: "Encapsulation",
    back: "Hiding internal state and requiring all interaction to be performed through an object's methods (getters/setters).",
    difficulty: "Easy",
    tags: ["OOP", "Principles"]
  },
  {
    id: "jf_33",
    moduleId: "java_oop",
    front: "Polymorphism",
    back: "Ability of an object to take on many forms. Achieved through method overriding (runtime) and overloading (compile-time).",
    difficulty: "Medium",
    tags: ["OOP", "Principles"]
  },
  {
    id: "jf_34",
    moduleId: "java_oop",
    front: "Inheritance",
    back: "Mechanism where one class acquires properties (fields and methods) of another. Promotes code reusability.",
    difficulty: "Easy",
    tags: ["OOP", "Principles"]
  },
  {
    id: "jf_35",
    moduleId: "java_oop",
    front: "Composition vs Inheritance",
    back: "Composition (has-a) offers more flexibility than Inheritance (is-a). Favor composition over inheritance to avoid deep hierarchies.",
    difficulty: "Hard",
    tags: ["OOP", "Design"]
  },
  {
    id: "jf_36",
    moduleId: "java_basics",
    front: "static keyword",
    back: "Belongs to the class rather than instances. Can be applied to variables, methods, blocks, and nested classes.",
    difficulty: "Easy",
    tags: ["Basics", "Keywords"]
  },
  {
    id: "jf_37",
    moduleId: "java_basics",
    front: "super keyword",
    back: "Reference variable used to refer to immediate parent class object. Used to invoke parent methods/constructors.",
    difficulty: "Easy",
    tags: ["Basics", "Keywords"]
  },
  {
    id: "jf_38",
    moduleId: "java_basics",
    front: "this keyword",
    back: "Reference to the current object. Used to resolve ambiguity between instance variables and parameters.",
    difficulty: "Easy",
    tags: ["Basics", "Keywords"]
  },
  {
    id: "jf_39",
    moduleId: "java_exceptions",
    front: "try-with-resources",
    back: "Java 7 feature that automatically closes resources (like files or DB connections) that implement AutoCloseable.",
    difficulty: "Medium",
    tags: ["Exceptions", "Resources"]
  },
  {
    id: "jf_40",
    moduleId: "java_exceptions",
    front: "Error vs Exception",
    back: "Errors (OutOfMemoryError) represent serious problems that apps shouldn't try to catch. Exceptions indicate conditions reasonable apps might want to catch.",
    difficulty: "Medium",
    tags: ["Exceptions", "Hierarchy"]
  },
  {
    id: "jf_41",
    moduleId: "java_memory",
    front: "Garbage Collection",
    back: "Automatic memory management process that frees memory by deleting objects that are no longer reachable.",
    difficulty: "Medium",
    tags: ["Memory", "GC"]
  },
  {
    id: "jf_42",
    moduleId: "java_memory",
    front: "Heap vs Stack Memory",
    back: "Heap: stores objects, shared among threads. Stack: stores local primitives and references, private to each thread.",
    difficulty: "Medium",
    tags: ["Memory", "Architecture"]
  },
  {
    id: "jf_43",
    moduleId: "java_memory",
    front: "Memory Leak in Java",
    back: "Occurs when objects are no longer needed but are still referenced (e.g., in static collections), preventing GC from reclaiming them.",
    difficulty: "Hard",
    tags: ["Memory", "Issues"]
  },
  {
    id: "jf_44",
    moduleId: "spring_framework",
    front: "@Autowired",
    back: "Annotation used for automatic dependency injection. Can be applied to constructors, fields, or setter methods.",
    difficulty: "Easy",
    tags: ["Spring", "DI"]
  },
  {
    id: "jf_45",
    moduleId: "spring_framework",
    front: "Spring Bean Scopes",
    back: "Singleton (default, one per container), Prototype (new instance every time), Request, Session, GlobalSession.",
    difficulty: "Medium",
    tags: ["Spring", "Beans"]
  },
  {
    id: "jf_46",
    moduleId: "spring_framework",
    front: "@Component vs @Service vs @Repository",
    back: "All define beans. @Component is generic. @Service indicates business logic. @Repository provides exception translation for DAOs.",
    difficulty: "Medium",
    tags: ["Spring", "Annotations"]
  },
  {
    id: "jf_47",
    moduleId: "spring_framework",
    front: "@Transactional",
    back: "Declarative transaction management. Wraps method execution in a database transaction, committing on success or rolling back on unchecked exception.",
    difficulty: "Medium",
    tags: ["Spring", "Transactions"]
  },
  {
    id: "jf_48",
    moduleId: "java_web",
    front: "Servlet",
    back: "Java program that runs on a web server, extending server capabilities by responding to HTTP requests.",
    difficulty: "Medium",
    tags: ["Web", "Basics"]
  },
  {
    id: "jf_49",
    moduleId: "java_web",
    front: "Filter vs Interceptor",
    back: "Filters wrap requests/responses at the Servlet level. Interceptors (Spring) wrap requests at the Controller level and have access to the handler.",
    difficulty: "Hard",
    tags: ["Web", "Spring"]
  },
  {
    id: "jf_50",
    moduleId: "java_basics",
    front: "Serialization",
    back: "Converting an object's state to a byte stream for storage or transmission. Implement java.io.Serializable interface.",
    difficulty: "Medium",
    tags: ["Basics", "IO"]
  },
  {
    id: "jf_51",
    moduleId: "java_basics",
    front: "transient keyword",
    back: "Prevents a field from being serialized. It will be initialized to default value during deserialization.",
    difficulty: "Medium",
    tags: ["Basics", "Keywords"]
  },
  {
    id: "jf_52",
    moduleId: "java_design_patterns",
    front: "Singleton Pattern",
    back: "Ensures only one instance of a class exists. Implemented with private constructor, static instance, and public getInstance() method.",
    difficulty: "Easy",
    tags: ["Design Patterns", "Creational"]
  },
  {
    id: "jf_53",
    moduleId: "java_design_patterns",
    front: "Factory Pattern",
    back: "Defines an interface for creating objects, but lets subclasses decide which class to instantiate.",
    difficulty: "Medium",
    tags: ["Design Patterns", "Creational"]
  },
  {
    id: "jf_54",
    moduleId: "java_design_patterns",
    front: "Builder Pattern",
    back: "Separates object construction from its representation. Used when an object requires many parameters, some optional.",
    difficulty: "Medium",
    tags: ["Design Patterns", "Creational"]
  },
  {
    id: "jf_55",
    moduleId: "java_basics",
    front: "varargs (...)",
    back: "Allows passing a variable number of arguments of the same type to a method. Treated as an array internally.",
    difficulty: "Easy",
    tags: ["Basics", "Syntax"]
  },
  {
    id: "jf_56",
    moduleId: "java_basics",
    front: "Type Erasure",
    back: "Process where compiler removes all generic type information at compile time, replacing it with Object or bounds, ensuring backward compatibility.",
    difficulty: "Hard",
    tags: ["Generics", "Internals"]
  },
  {
    id: "jf_57",
    moduleId: "java_basics",
    front: "Generics",
    back: "Enables types (classes and interfaces) to be parameters when defining classes, interfaces and methods, providing compile-time safety.",
    difficulty: "Medium",
    tags: ["Generics"]
  },
  {
    id: "jf_58",
    moduleId: "java_basics",
    front: "Enum in Java",
    back: "Special data type that enables a variable to be a set of predefined constants. Inherits from java.lang.Enum.",
    difficulty: "Easy",
    tags: ["Basics", "Types"]
  },
  {
    id: "jf_59",
    moduleId: "java_testing",
    front: "JUnit vs Mockito",
    back: "JUnit is a testing framework for writing tests. Mockito is a mocking framework to mock dependencies in unit tests.",
    difficulty: "Easy",
    tags: ["Testing", "Tools"]
  },
  {
    id: "jf_60",
    moduleId: "sql_basics",
    front: "Primary Key vs Foreign Key",
    back: "Primary Key uniquely identifies a record. Foreign Key establishes a relationship between two tables, pointing to a PK.",
    difficulty: "Easy",
    tags: ["SQL", "Databases"]
  }
];
