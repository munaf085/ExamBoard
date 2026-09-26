import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 20: GENERICS & TYPE SAFETY (LESSONS 20.1 & 20.2)
// Authoritative FAANG-Standard Generics Core Curriculum
// ============================================================

export const col20_1_2_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 20.1: Generic Types, Classes & Methods
  // ─────────────────────────────────────────────────────────────
  'generic-types-and-methods': {
    id: 'generic-types-and-methods',
    moduleId: 'java-generics',
    moduleTitle: '20. Generics & Type Safety',
    lessonNumber: 'Lesson 20.1',
    title: 'Generic Types, Classes & Methods',
    subtitle: 'Parameterized types, type parameters <T>, multi-type classes Pair<K,V>, generic methods, and compile-time type safety vs raw types',
    estimatedMinutes: 26,
    beginnerAnalogy: 'Imagine shipping packages across the world before barcodes. You had a single wooden crate labeled "STUFF" (`java.lang.Object`). You could put a live puppy, a glass vase, or a brick inside. But when the customer opened the crate, they had to blindly grab inside and pray they did not crush the puppy or get bitten by the brick (`(Vase) crate.get()` throwing `ClassCastException`)! Generics are custom molded transparent shipping containers with a locked stencil slot (`Box<T>`). If you declare `Box<Puppy>`, the post office scanner (`javac` compiler) physically refuses to let anyone slide a brick inside. When it arrives, the customer knows with 100% mathematical certainty that a puppy is inside—no blind guessing, no runtime crashes!',
    interviewTakeaways: [
      'Core Motivation: Generics (introduced in Java 5) provide compile-time type safety and eliminate the need for explicit casting. The compiler catches type mismatch errors during compilation rather than crashing in production with `ClassCastException`.',
      'Generic Class vs Generic Method: A generic class parameterizes the entire class scope (`class Box<T> { ... }`). A generic method introduces its own type parameter independent of any class (`public <E> void process(E item)`), placed immediately before the method return type.',
      'Bounded Type Parameters: `<T extends Number>` restricts the type parameter to `Number` or any subclass. This allows the generic code to invoke methods declared on the bounding type (e.g. `num.doubleValue()`). Multiple bounds use the `&` operator (`<T extends Number & Comparable<T>>`), with the single class bound declared first.',
      'Naming Conventions: Java standards mandate single uppercase letters for type parameters: `T` (Type), `E` (Element in collections), `K` (Key in maps), `V` (Value in maps), `N` (Number), `S, U, V` (2nd, 3rd, 4th types).',
      'Diamond Operator (`<>`): Introduced in Java 7, the diamond operator enables compiler type inference: `Map<String, List<Integer>> map = new HashMap<>()`, eliminating redundant type argument repetition on the right-hand side.',
      'Danger of Raw Types: Using raw types like `List list = new ArrayList()` bypasses all compiler type checking. Raw types exist solely for backward compatibility with pre-Java 5 legacy code and should never be used in modern Java code.'
    ],
    cheatSheet: {
      summary: 'Generics provide compile-time type safety. Classes declare class Box<T>, methods declare <T> T method(T arg). Bounded types (<T extends Bound>) permit calling methods on the bound.',
      syntaxTemplate: `// Generic Class Declaration
public class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

// Generic Method Declaration
public static <T extends Comparable<T>> T findMax(T[] array) {
    T max = array[0];
    for (T elem : array) {
        if (elem.compareTo(max) > 0) max = elem;
    }
    return max;
}`,
      rules: [
        { rule: 'Type Parameter Placement', explanation: 'Generic method type parameters must be declared immediately before the return type: public <T> T identity(T val).' },
        { rule: 'Reference Types Only', explanation: 'Generic type parameters only accept reference types; primitive types (int, double) must be boxed to Integer, Double.' },
        { rule: 'Multiple Bounds Order', explanation: 'In multiple bounds (<T extends ClassA & InterfaceB>), the class bound must be listed first; at most one class bound is allowed.' },
        { rule: 'Static Method Independence', explanation: 'Static methods cannot access class-level type parameter T; they must declare their own independent type parameter <U>.' },
        { rule: 'Raw Types Deprecated in Spirit', explanation: 'Raw types disable generic type safety and generate compiler unchecked warnings; avoid in all new code.' }
      ],
      quickComparison: [
        { aspect: 'Compile-Time Safety', optionA: 'Generics: Catches type errors at compile time', optionB: 'Raw Types: Defers errors to runtime ClassCastException' },
        { aspect: 'Casting Requirement', optionA: 'Generics: Zero manual casts needed (compiler checks)', optionB: 'Raw Types: Explicit cast (String) list.get(0) mandatory' },
        { aspect: 'Scope of T', optionA: 'Generic Class: T is valid across all instance methods', optionB: 'Generic Method: T is valid only within that single method' },
        { aspect: 'Multiple Bounds', optionA: '<T extends Number & Comparable<T>>: Legal', optionB: '<T extends Comparable<T> & Number>: Illegal (class must be first)' }
      ]
    },
    coreExplanation: [
      'Prior to Java 5, collections were homogeneous in concept but heterogeneous in execution: `ArrayList` stored `Object`. Programmers had to explicitly downcast every retrieved reference (`(String) list.get(i)`). A single errant integer added to a string list would compile cleanly, only to detonate in production as a `ClassCastException`.',
      'Generics solved this by introducing parameterized types. When you declare `List<String>`, the Java compiler enforces that only `String` instances can be added to the list, and automatically manages the downcasting when elements are retrieved.',
      'Generic Classes: Defined with angle bracket syntax following the class name: `public class Node<T> { T data; }`. Multiple type parameters are separated by commas: `public class Entry<K, V> { K key; V value; }`. Within the class body, `T` can be used as a field type, parameter type, or return type.',
      'Generic Methods: A method can declare its own type parameters, completely independent of whether its enclosing class is generic. The type parameter is declared before the return type: `public static <T> void swap(T[] a, int i, int j)`. When calling a generic method, compiler type inference typically infers `T` from the arguments without needing `<String>swap(arr, 0, 1)`.',
      'Bounded Type Parameters: By default, a type parameter `<T>` is unbounded, meaning it can be replaced by any reference type (erasing to `Object`). If you need to perform operations on the type (e.g. arithmetic, comparisons), you must specify an upper bound: `<T extends Number>` or `<T extends Comparable<T>>`.',
      'Multiple Bounds: Java supports multiple bounds using the ampersand syntax: `<T extends ClassA & InterfaceB & InterfaceC>`. Because Java is single inheritance of implementation, at most one class bound is allowed, and it must appear first in the declaration list.',
      'Type Inference & The Diamond Operator: In Java 7+, the compiler analyzes variable declarations and method arguments to infer type parameters. The diamond operator `<>` tells the compiler to automatically infer the constructor type parameters from context.'
    ],
    diagram: `GENERIC TYPE SAFETY VS RAW TYPE RUNTIME FAILURE
========================================================================

1. PRE-JAVA 5 RAW TYPES (No Compile-Time Protection)
   List list = new ArrayList();
   list.add("Hello");
   list.add(100);  ──> Compiles with NO ERROR!
   
   String s1 = (String) list.get(0);  ──> OK
   String s2 = (String) list.get(1);  ──> CRASH! Runtime ClassCastException:
                                           Integer cannot be cast to String!

2. JAVA 5+ GENERICS (Compile-Time Type Verification)
   List<String> list = new ArrayList<>();
   list.add("Hello");
   list.add(100);  ──> COMPILE-TIME ERROR!
                       javac rejects: "Incompatible types: int cannot be 
                       converted to String"
   
   String s1 = list.get(0);  ──> Safe, clean, 100% verified, zero casting!`,
    codeSnippet: {
      title: 'Generic Class and Bounded Generic Method Demonstration',
      code: `import java.util.*;

// Generic Class with Type Parameter T
class Container<T> {
    private T item;
    public Container(T item) { this.item = item; }
    public T getItem() { return item; }
}

public class GenericsBasics {
    // Generic Method with Bounded Type Parameter
    public static <T extends Comparable<T>> T getMax(T a, T b) {
        return a.compareTo(b) > 0 ? a : b;
    }

    public static void main(String[] args) {
        Container<String> stringContainer = new Container<>("Production Ready");
        String message = stringContainer.getItem(); // No cast needed!
        System.out.println("Container holds: " + message);

        // Type inference in generic method
        Integer maxInt = getMax(42, 99);
        String maxStr = getMax("apple", "zebra");

        System.out.println("Max Integer: " + maxInt);
        System.out.println("Max String:  " + maxStr);
    }
}`,
      lineByLineExplanation: [
        { line: 'class Container<T> { ... }', explanation: 'Defines a generic class parameterized by type variable T.' },
        { line: 'public static <T extends Comparable<T>> T getMax(...)', explanation: 'Declares a generic static method with a recursively bounded type parameter enforcing comparability.' },
        { line: 'Container<String> stringContainer = new Container<>(...);', explanation: 'Instantiates the generic class with String, using the Java 7 diamond operator.' },
        { line: 'String message = stringContainer.getItem();', explanation: 'Retrieves element without explicit cast; compiler guarantees the return type is String.' },
        { line: 'Integer maxInt = getMax(42, 99);', explanation: 'Compiler automatically infers T as Integer from the method arguments.' }
      ],
      output: `Container holds: Production Ready
Max Integer: 99
Max String:  zebra`
    },
    codeExamples: [
      {
        title: 'Generic Pair Class with Two Type Parameters',
        description: 'Demonstrating how multi-type generic classes model key-value relationships.',
        code: `import java.util.*;

class KeyValuePair<K, V> {
    private final K key;
    private final V value;

    public KeyValuePair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() { return key + " = " + value; }
}

public class PairDemo {
    public static void main(String[] args) {
        KeyValuePair<String, Integer> studentScore = new KeyValuePair<>("Alice", 98);
        KeyValuePair<Integer, String> errorCode = new KeyValuePair<>(404, "Not Found");

        System.out.println("Score: " + studentScore);
        System.out.println("Error: " + errorCode);
    }
}`,
        output: `Score: Alice = 98
Error: 404 = Not Found`
      },
      {
        title: 'Multiple Bounded Type Parameters (<T extends Class & Interface>)',
        description: 'Demonstrating constraints requiring both inheritance from a class and interface implementation.',
        code: `import java.util.*;

public class MultipleBoundsDemo {
    // Requires T to be a Number AND implement Comparable<T>
    public static <T extends Number & Comparable<T>> int compareNumbers(T n1, T n2) {
        return n1.compareTo(n2);
    }

    public static void main(String[] args) {
        System.out.println("Compare Integers (10 vs 20): " + compareNumbers(10, 20));
        System.out.println("Compare Doubles (3.5 vs 1.2): " + compareNumbers(3.5, 1.2));
    }
}`,
        output: `Compare Integers (10 vs 20): -1
Compare Doubles (3.5 vs 1.2): 1`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using primitive types as type parameters: List<int>',
        whyItHappens: 'In C++ templates, primitive types like `vector<int>` are permitted. In Java, generics erase to `Object`, which primitives do not extend.',
        howToFix: 'Use the corresponding wrapper class: `List<Integer>`, `List<Double>`, or specialized primitive streams (`IntStream`).'
      },
      {
        mistake: 'Declaring multiple class bounds: <T extends Number & String>',
        whyItHappens: 'Java enforces single implementation inheritance. A class cannot inherit from multiple classes.',
        howToFix: 'Only one class bound is allowed, and it must appear first. Additional bounds must be interfaces.'
      },
      {
        mistake: 'Referencing class type parameter T from a static method or static field',
        whyItHappens: 'Static members belong to the class template, not an instance. There is only one static field per class, not one per parameterized type.',
        howToFix: 'Declare a separate type parameter on the static method itself: `public static <U> void log(U item)`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Primitive Type in Generics',
        problemStatement: 'What happens when compiling this code?',
        code: `import java.util.ArrayList;

public class Puzzle1 {
    public static void main(String[] args) {
        // ArrayList<int> list = new ArrayList<>();
    }
}`,
        options: [
          'A) Compiles cleanly and stores 32-bit primitives efficiently',
          'B) Compilation Error: Syntax error, insert "Dimensions" to complete ReferenceType',
          'C) Throws ClassCastException at runtime',
          'D) JVM converts int to Integer automatically at bytecode level'
        ],
        correctOptionIndex: 1,
        hint: 'Generics strictly require reference types.',
        solution: 'Option B is correct: Compilation Error',
        explanation: 'In Java, generic type parameters must be reference types extending `java.lang.Object`. Primitive types (`int`, `double`, `boolean`) are forbidden as generic type arguments.'
      },
      {
        title: 'Puzzle 2: Generic Method Syntax Placement',
        problemStatement: 'Which of the following is the correct syntax for declaring a generic static method that returns type T?',
        code: `// Option A: public static T <T> process(T val)
// Option B: public static <T> T process(T val)
// Option C: public <T> static T process(T val)
// Option D: public static T process<T>(T val)`,
        options: [
          'A) Option A',
          'B) Option B',
          'C) Option C',
          'D) Option D'
        ],
        correctOptionIndex: 1,
        hint: 'The type parameter declaration <T> must precede the return type.',
        solution: 'Option B is correct: public static <T> T process(T val)',
        explanation: 'In Java generic methods, the type parameter declaration `<T>` must appear immediately before the return type: `public static <T> T process(T val)`.'
      },
      {
        title: 'Puzzle 3: Multiple Bounds Order Rule',
        problemStatement: 'Which generic type parameter declaration violates Java syntax rules?',
        code: `// Line 1: <T extends Comparable<T> & Cloneable>
// Line 2: <T extends Number & Comparable<T>>
// Line 3: <T extends Comparable<T> & Number>
// Line 4: <T extends Object>`,
        options: [
          'A) Line 1',
          'B) Line 2',
          'C) Line 3',
          'D) Line 4'
        ],
        correctOptionIndex: 2,
        hint: 'If a class bound is present, it must be the first bound.',
        solution: 'Option C is correct: Line 3',
        explanation: 'In multiple bounds, if one of the bounds is a class (`Number`), it MUST appear as the very first bound. `<T extends Comparable<T> & Number>` causes a compilation error: "The type Number is not an interface; it cannot appear in an interface bound list".'
      },
      {
        title: 'Puzzle 4: Static Field with Generic Type Parameter',
        problemStatement: 'What is the outcome of compiling this class?',
        code: `class Box<T> {
    private static T defaultItem;
}`,
        options: [
          'A) Compiles cleanly; each Box<T> gets its own static variable',
          'B) Compilation Error: Cannot make a static reference to the non-static type T',
          'C) defaultItem initializes to null',
          'D) Runtime exception during class loading'
        ],
        correctOptionIndex: 1,
        hint: 'Static members belong to the raw class, not instances.',
        solution: 'Option B is correct: Compilation Error: Cannot make a static reference to the non-static type T',
        explanation: 'Because a generic class is loaded once and shared across all parameterized instances (`Box<String>` and `Box<Integer>` share the same class), a static field cannot depend on an instance type parameter `T`.'
      },
      {
        title: 'Puzzle 5: Type Inference with Heterogeneous Arguments',
        problemStatement: 'What type is inferred for T in this method call?',
        code: `public class Puzzle5 {
    public static <T> T pick(T a, T b) { return a; }

    public static void main(String[] args) {
        Serializable obj = pick("Text", 123);
    }
}`,
        options: [
          'A) Compilation Error: Incompatible argument types',
          'B) String',
          'C) Integer',
          'D) Object & Serializable & Comparable<?> (Common supertype)',
        ],
        correctOptionIndex: 3,
        hint: 'Compiler determines the most specific common supertype of String and Integer.',
        solution: 'Option D is correct: Common supertype (Object & Serializable & Comparable<?>)',
        explanation: 'The Java compiler`s type inference algorithm finds the lowest common supertype (intersection type) that both arguments satisfy: both `String` and `Integer` implement `Serializable` and `Comparable`, and inherit from `Object`.'
      },
      {
        title: 'Puzzle 6: Generic Method Shadowing Class Type Parameter',
        problemStatement: 'What does this program print?',
        code: `class Holder<T> {
    T value;
    Holder(T val) { this.value = val; }

    public <T> void print(T item) {
        System.out.println(item.getClass().getSimpleName() + ":" + value.getClass().getSimpleName());
    }
}

public class Puzzle6 {
    public static void main(String[] args) {
        Holder<String> h = new Holder<>("Hello");
        h.print(12345);
    }
}`,
        options: [
          'A) String:String',
          'B) Integer:String',
          'C) Compilation Error: Incompatible types',
          'D) Integer:Integer'
        ],
        correctOptionIndex: 1,
        hint: 'The generic method declares its own T, shadowing the class T.',
        solution: 'Option B is correct: Integer:String',
        explanation: 'The method `<T> void print(T item)` declares its own type parameter `T`, which shadows the class-level type parameter `T`. For `print(12345)`, the method`s `T` is inferred as `Integer`, while `value` remains the class-level `String`.'
      },
      {
        title: 'Puzzle 7: Comparing Raw Types vs Object Type Parameter',
        problemStatement: 'What is the fundamental difference between `List` (raw type) and `List<Object>`?',
        code: `// List raw = new ArrayList();
// List<Object> typed = new ArrayList<>();`,
        options: [
          'A) They are identical in every way',
          'B) List<Object> tells the compiler it can hold any object type-safely, while raw List opts out of generic type checking completely',
          'C) Raw List is faster at runtime',
          'D) List<Object> accepts primitive types'
        ],
        correctOptionIndex: 1,
        hint: 'You can pass List<String> to a method expecting raw List, but not to List<Object>.',
        solution: 'Option B is correct: List<Object> tells the compiler it can hold any object type-safely, while raw List opts out of generic type checking completely',
        explanation: '`List<Object>` participates in generic type safety (it explicitly states it holds objects, and generics invariance prevents passing `List<String>` to it). Raw `List` disables type checks and generates compiler warnings.'
      },
      {
        title: 'Puzzle 8: Generic Array Method Parameter Compilation',
        problemStatement: 'What happens when compiling this generic method?',
        code: `public class Puzzle8 {
    public static <T> int getLength(T[] array) {
        return array.length;
    }
    public static void main(String[] args) {
        int[] primitives = {1, 2, 3};
        // System.out.println(getLength(primitives));
    }
}`,
        options: [
          'A) Compiles cleanly and prints 3',
          'B) Compilation Error: Cannot infer type arguments; int[] is not an Object[]',
          'C) Autoboxes int[] to Integer[] automatically',
          'D) Throws ClassCastException'
        ],
        correctOptionIndex: 1,
        hint: 'int[] is an Object, but it is NOT an Object[].',
        solution: 'Option B is correct: Compilation Error',
        explanation: '`int[]` is a primitive array. In Java, an `int[]` is an `Object`, but it is NOT an array of references (`T[]` or `Object[]`). The compiler cannot bind `int[]` to `T[]`.'
      },
      {
        title: 'Puzzle 9: Bounded Type Parameter Method Invocation',
        problemStatement: 'Why is `val.compareTo(other)` legal inside `<T extends Comparable<T>>`?',
        code: `public static <T extends Comparable<T>> int compare(T a, T b) {
    return a.compareTo(b);
}`,
        options: [
          'A) Because the compiler uses reflection at runtime',
          'B) Because the upper bound Comparable<T> guarantees that any substituted type T provides the compareTo method at compile time',
          'C) Because all Java objects have a compareTo method',
          'D) Because T erases to Object'
        ],
        correctOptionIndex: 1,
        hint: 'Bounded types expose the public API of the bound.',
        solution: 'Option B is correct: Because the upper bound Comparable<T> guarantees that any substituted type T provides the compareTo method at compile time',
        explanation: 'Upper bounds restrict substitution: only types implementing `Comparable<T>` can be passed, allowing the compiler to safely resolve calls to `compareTo()`.'
      },
      {
        title: 'Puzzle 10: Recursive Type Bound (Comparable<T>)',
        problemStatement: 'What is the purpose of the recursive type bound `<T extends Comparable<T>>`?',
        code: `public static <T extends Comparable<T>> void sort(List<T> list)`,
        options: [
          'A) It enables recursive method calls',
          'B) It ensures that type T is comparable to instances of its own type T',
          'C) It forces T to be a singleton',
          'D) It creates a circular linked list'
        ],
        correctOptionIndex: 1,
        hint: 'A mutual comparison contract between objects of the same class.',
        solution: 'Option B is correct: It ensures that type T is comparable to instances of its own type T',
        explanation: '`<T extends Comparable<T>>` is a recursive type bound expressing that `T` can be compared with elements of its own type `T`, preventing comparisons between incompatible types like Strings and Integers.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What are Java Generics, and why were they introduced in Java 5? What problems do they solve?',
        answer: 'Generics were introduced in Java 5 to provide compile-time type safety and eliminate manual type casting. Prior to Java 5, collections stored raw `Object` references. Developers had to explicitly cast objects upon retrieval (`(String) list.get(0)`). If an object of an incorrect type was accidentally inserted, the code compiled without error and threw a `ClassCastException` at runtime in production. Generics enable parameterized types (e.g. `List<String>`), allowing the compiler to enforce strict type checking at compile time and automatically insert the necessary cast instructions in the bytecode, catching bugs early during compilation.',
        followUp: 'What is the difference between compile-time type safety and runtime type verification?',
        followUpAnswer: 'Compile-time type safety is enforced by javac during compilation to guarantee that only valid types are assigned. At runtime, due to type erasure, the JVM operates on raw types with bytecode checkcast instructions verifying types upon retrieval.',
        keyPhrases: [
          'Compile-time type safety',
          'Eliminates explicit casting',
          'Prevents runtime ClassCastException',
          'Introduced in Java 5',
          'Catches bugs during compilation'
        ],
        commonMistakeAnswer: 'Stating that Generics make Java collections faster by avoiding memory allocations.'
      },
      {
        question: 'Explain the difference between a Generic Class and a Generic Method in Java.',
        answer: 'A Generic Class defines a type parameter at the class level (`public class Box<T> { ... }`), and that type parameter `T` is accessible across all non-static fields, constructors, and instance methods within the class. A Generic Method introduces its own type parameter independent of whether the enclosing class is generic or not (`public <E> void print(E item)`). The type parameter is declared before the return type. Generic methods can be static or non-static. If a generic method declares a type parameter with the same name as a class-level parameter, the method`s type parameter shadows the class`s parameter within the method body.',
        followUp: 'Why cannot static methods in a generic class use the class-level type parameter T?',
        followUpAnswer: 'Because static methods belong to the class template, not an instance. A generic class is loaded only once by the JVM; there are no separate static contexts for Box<String> vs Box<Integer>. Therefore, static methods must declare their own independent type parameters.',
        keyPhrases: [
          'Class type parameter declared at class header',
          'Method type parameter declared before return type',
          'Generic methods can be static; class parameters cannot be static',
          'Type shadowing when parameter names match'
        ],
        commonMistakeAnswer: 'Believing generic methods can only be written inside generic classes.'
      },
      {
        question: 'What are Bounded Type Parameters in Java Generics? How do multiple bounds work?',
        answer: 'Bounded type parameters restrict the types that can be used as type arguments. An upper bound is declared using the `extends` keyword: `<T extends Number>` restricts `T` to `Number` or its subclasses (`Integer`, `Double`). Bounding allows the generic method or class to invoke methods defined on the bounding type (such as `val.doubleValue()`). Java also supports multiple bounds using the `&` operator: `<T extends Number & Comparable<T>>`. Under multiple bounds, `T` must be a subtype of all specified types. If one of the bounds is a class, it MUST be listed first, and at most one class bound is permitted because Java supports single class inheritance.',
        followUp: 'Can you specify a lower bound (<T super Integer>) on a generic class or method type parameter?',
        followUpAnswer: 'No! Lower bounds (`super`) are ONLY valid with wildcards (`<? super Integer>`). You cannot declare `<T super Integer>` on class or method type parameter definitions.',
        keyPhrases: [
          'extends keyword specifies upper bound',
          'Allows invoking methods on the bound',
          'Multiple bounds use & syntax',
          'Class bound must be declared first',
          'super is illegal on type parameter definitions'
        ],
        commonMistakeAnswer: 'Trying to write `<T super Number>` as a class definition.'
      },
      {
        question: 'What is a Raw Type in Java Generics, and why should it be avoided in modern code?',
        answer: 'A raw type is the name of a generic class or interface without any type arguments (e.g. `List` instead of `List<String>`). Raw types were introduced in Java 5 solely to ensure backward compatibility with pre-Java 5 legacy codebases. Using raw types completely disables compiler type checking: you can add any object into a raw `List`, causing unchecked compiler warnings. When elements are retrieved, manual casting is required, reintroducing the risk of runtime `ClassCastException`. In modern production Java, raw types should never be used.',
        followUp: 'What is the only valid modern use case for raw types?',
        followUpAnswer: 'Class literals: in Java, `List.class` is valid syntax, whereas `List<String>.class` is a syntax error because type parameters are erased at compile time.',
        keyPhrases: [
          'Generic class used without type arguments',
          'Exists solely for backward compatibility with pre-Java 5',
          'Bypasses compiler type checks and creates unchecked warnings',
          'Class literals: List.class is legal, List<String>.class is illegal'
        ],
        commonMistakeAnswer: 'Assuming raw types perform faster because they don`t have generic overhead.'
      },
      {
        question: 'Explain Type Inference and the Diamond Operator (<>) introduced in Java 7.',
        answer: 'Type inference is the compiler`s ability to automatically deduce the type arguments of a generic method call or constructor instantiation by analyzing the surrounding context, variable types, and arguments. In Java 5 and 6, instantiating generic types required repetitive boilerplate: `Map<String, List<Integer>> map = new HashMap<String, List<Integer>>();`. Java 7 introduced the diamond operator `<>`, which allows writing: `Map<String, List<Integer>> map = new HashMap<>();`. The compiler inspects the target type on the left-hand side and automatically infers that the constructor arguments are `String` and `List<Integer>`, reducing clutter while preserving 100% type safety.',
        followUp: 'How did Java 8 improve type inference further?',
        followUpAnswer: 'Java 8 introduced target typing across chained method calls and lambda expressions, allowing the compiler to infer generic types from enclosing method parameters and return statements.',
        keyPhrases: [
          'Compiler automatically deduces type arguments',
          'Eliminates duplicate boilerplate on instantiation',
          'Diamond operator <> introduced in Java 7',
          'Target typing in Java 8 lambda expressions'
        ],
        commonMistakeAnswer: 'Believing the diamond operator uses raw types under the hood.'
      },
      {
        question: 'Why are primitive types not supported as generic type arguments in Java (e.g., why no List<int>)?',
        answer: 'Because Java implemented Generics via Type Erasure. At compile time, generic type parameters are erased to `java.lang.Object` (or their upper bound). In Java`s type system, primitive types (`int`, `double`, `boolean`) are raw binary bits allocated directly on the stack or in array blocks, and do not inherit from `java.lang.Object`. Because a single compiled bytecode class (e.g. `ArrayList.class`) must handle all type arguments using object reference pointers, primitives cannot be substituted without creating specialized bytecode for every primitive type. Java uses autoboxing to bridge this gap (`List<Integer>`), though Project Valhalla aims to introduce primitive specialization in future Java versions.',
        followUp: 'What is the performance drawback of using boxed types in collections?',
        followUpAnswer: 'Boxed types incur high memory overhead (16-24 bytes for an Integer vs 4 bytes for an int) and cause CPU cache misses due to pointer dereferencing and garbage collection pressure.',
        keyPhrases: [
          'Type erasure erases T to Object',
          'Primitives do not inherit from java.lang.Object',
          'Single bytecode class serves all instantiations',
          'Autoboxing bridges the gap with memory overhead'
        ],
        commonMistakeAnswer: 'Thinking Java forgot to implement List<int> and will add it in a minor update.'
      },
      {
        question: 'Explain what a Recursive Type Bound is and how <T extends Comparable<T>> works.',
        answer: 'A recursive type bound is a type constraint where the type parameter appears within its own bounding expression: `<T extends Comparable<T>>`. It expresses a mutual contract: "type `T` must be comparable to elements of its own type `T`". For example, in `Collections.max(Collection<T>)`, this bound guarantees that any two elements in the collection can be compared with `a.compareTo(b)` without risking a ClassCastException at runtime. In advanced hierarchies, this is generalized using wildcards: `<T extends Comparable<? super T>>`, allowing subclasses to be compared using compareTo implemented by their superclasses.',
        followUp: 'Give an example of a class that satisfies <T extends Comparable<T>>.',
        followUpAnswer: '`java.lang.String` implements `Comparable<String>`, and `java.lang.Integer` implements `Comparable<Integer>`. Both satisfy the recursive type bound.',
        keyPhrases: [
          'Type parameter appears inside its own bound',
          'Enforces comparability between elements of same type',
          'Prevents comparing heterogeneous types',
          'Generalized with Comparable<? super T>'
        ],
        commonMistakeAnswer: 'Confusing recursive type bounds with recursive method calls.'
      },
      {
        question: 'What is the difference between List<?> and List<Object>?',
        answer: '`List<Object>` is a concrete parameterized type that can hold any `Object`. Because Java generics are invariant, `List<Object>` is NOT a supertype of `List<String>`. You cannot pass a `List<String>` to a method expecting `List<Object>`. In contrast, `List<?>` is an unbounded wildcard representing a "list of an unknown type". `List<?>` is the supertype of ALL list instantiations (`List<String>`, `List<Integer>`, `List<Object>`). You can pass any list to `List<?>`. However, because the type is unknown, `List<?>` is read-only: you cannot add any element to `List<?>` (except `null`), whereas you can freely add any object to `List<Object>`.',
        followUp: 'When would you choose List<?> over List<Object>?',
        followUpAnswer: 'Use `List<?>` when your method only needs to read elements using Object methods (e.g. `list.size()`, printing elements) and should accept any list regardless of element type.',
        keyPhrases: [
          'Generics are invariant: List<String> is not List<Object>',
          'List<?> is universal supertype of all lists',
          'List<?> is read-only (only null can be added)',
          'List<Object> allows adding any Object'
        ],
        commonMistakeAnswer: 'Asserting that List<?> and List<Object> are interchangeable.'
      },
      {
        question: 'Can you overload a method by changing only the generic type parameter in the argument list?',
        answer: 'No! Attempting to declare `public void process(List<String> list)` and `public void process(List<Integer> list)` in the same class results in a compile-time error: "Name clash: both methods have the same erasure". Because generic type parameters are erased at compile time, both method signatures erase to the identical bytecode descriptor: `public void process(List list)`. Since the JVM cannot distinguish between two methods with the identical name and parameter types in the same class, the Java compiler forbids this overload.',
        followUp: 'How can you work around this limitation?',
        followUpAnswer: 'Give the methods distinct names (e.g. `processStrings` and `processIntegers`), or wrap the lists in distinct domain classes.',
        keyPhrases: [
          'Compile error: name clash under type erasure',
          'Both methods erase to identical signature in bytecode',
          'JVM cannot distinguish between erased signatures',
          'Rename methods or wrap in domain classes'
        ],
        commonMistakeAnswer: 'Thinking javac generates name-mangled methods like process_String.'
      },
      {
        question: 'What is the Typesafe Heterogeneous Container pattern, and how does it leverage Generics?',
        answer: 'The Typesafe Heterogeneous Container pattern (described by Joshua Bloch in Effective Java) allows storing and retrieving values of multiple different types in a single container safely. In standard containers like `Map<K, V>`, all entries share the same key and value types. In a typesafe heterogeneous container, the key itself is parameterized: `Map<Class<?>, Object>`. Methods are generic: `<T> void put(Class<T> type, T instance)` and `<T> T get(Class<T> type)`. When inserting, it validates `type.cast(instance)`. When retrieving, it executes `type.cast(map.get(type))`. This guarantees 100% type safety for arbitrarily heterogeneous entries without unchecked cast warnings.',
        followUp: 'What is Class<T> called when used this way?',
        followUpAnswer: 'It is called a Type Token: passing a `Class` object at runtime communicates both compile-time and runtime type information.',
        keyPhrases: [
          'Parameterizes the key instead of the container',
          'Map<Class<?>, Object> backing storage',
          'Class<T> acts as a runtime Type Token',
          'type.cast() guarantees dynamic type safety'
        ],
        commonMistakeAnswer: 'Believing you can only store objects of the same type in a Java Map.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following is NOT a valid generic type parameter in Java?',
        options: [
          'List<String>',
          'List<int>',
          'List<Integer>',
          'List<double[]>'
        ],
        correctIndex: 1,
        explanation: 'Primitive types like `int` cannot be used as generic type arguments because generics require reference types extending `Object`.'
      },
      {
        question: 'Where must the type parameter `<T>` be declared in a generic static method?',
        options: [
          'After the method parameters',
          'Immediately before the return type',
          'Immediately after the method name',
          'Inside the class header only'
        ],
        correctIndex: 1,
        explanation: 'Generic method type parameters must be declared immediately before the return type: `public static <T> void method(T arg)`.'
      },
      {
        question: 'What is the purpose of the diamond operator `<>` introduced in Java 7?',
        options: [
          'It forces the JVM to use heap memory',
          'It enables compiler type inference for constructor instantiations, eliminating duplicate type parameters',
          'It creates an immutable list',
          'It enables multi-threading'
        ],
        correctIndex: 1,
        explanation: 'The diamond operator `<>` allows the compiler to infer constructor type arguments from the variable declaration type.'
      },
      {
        question: 'Which multiple bounded type parameter declaration is syntactically legal in Java?',
        options: [
          '<T extends Comparable<T> & Number>',
          '<T extends Number & Comparable<T>>',
          '<T extends Number & Integer>',
          '<T super Number & Comparable<T>>'
        ],
        correctIndex: 1,
        explanation: 'A class bound (`Number`) must be listed first, followed by interface bounds (`Comparable<T>`). Only one class bound is allowed.'
      },
      {
        question: 'Why cannot a static field in a generic class be declared with type parameter T (`private static T item;`)?',
        options: [
          'Static fields cannot hold objects',
          'The class is loaded once and shared across all parameterized types; T is instance-specific',
          'Static fields must be final',
          'Generics are disabled for static members'
        ],
        correctIndex: 1,
        explanation: 'There is only one static field per class. Because `Box<String>` and `Box<Integer>` share the same class, `T` cannot be resolved in a static context.'
      },
      {
        question: 'What is the consequence of using a raw type like `List list = new ArrayList();`?',
        options: [
          'It produces a compiler error',
          'It disables compile-time type safety, produces unchecked warnings, and risks runtime ClassCastExceptions',
          'It allocates memory on the stack',
          'It makes the list immutable'
        ],
        correctIndex: 1,
        explanation: 'Raw types bypass compiler generic checking, deferring type errors to runtime `ClassCastException`.'
      },
      {
        question: 'What does the recursive type bound `<T extends Comparable<T>>` enforce?',
        options: [
          'That T can be compared with objects of its own type T',
          'That the method runs recursively',
          'That T extends Object',
          'That T is a primitive wrapper'
        ],
        correctIndex: 0,
        explanation: '`<T extends Comparable<T>>` ensures that instances of `T` can be mutually compared with other instances of `T`.'
      },
      {
        question: 'Why does compiling `void test(List<String> l)` and `void test(List<Integer> l)` in the same class fail?',
        options: [
          'Because String and Integer are incompatible',
          'Because both methods have the same erasure `test(List)` in bytecode, causing a name clash',
          'Because overloading is forbidden in Java',
          'Because methods cannot take List arguments'
        ],
        correctIndex: 1,
        explanation: 'Type erasure converts both signatures to `test(List)`, resulting in duplicate method descriptors in bytecode.'
      },
      {
        question: 'What is the difference between `List<Object>` and `List<?>`?',
        options: [
          'List<Object> is read-only while List<?> is writable',
          'List<?> can accept any parameterized list (universal supertype), while List<Object> only accepts List<Object> due to invariance',
          'They are identical',
          'List<?> allows adding any object'
        ],
        correctIndex: 1,
        explanation: '`List<?>` is the supertype of all lists, while `List<Object>` only accepts `List<Object>` due to generic invariance.'
      },
      {
        question: 'In the Typesafe Heterogeneous Container pattern, what role does `Class<T>` play?',
        options: [
          'A factory generator',
          'A type token used to dynamically cast and verify types at compile time and runtime',
          'A serialization proxy',
          'A database entity'
        ],
        correctIndex: 1,
        explanation: '`Class<T>` serves as a runtime type token, enabling `type.cast()` to ensure dynamic type safety.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 20.2: Type Erasure & Synthetic Bridge Methods
  // ─────────────────────────────────────────────────────────────
  'type-erasure-and-bridge-methods': {
    id: 'type-erasure-and-bridge-methods',
    moduleId: 'java-generics',
    moduleTitle: '20. Generics & Type Safety',
    lessonNumber: 'Lesson 20.2',
    title: 'Type Erasure & Synthetic Bridge Methods',
    subtitle: 'Compile-time type erasure, erasure to Object or upper bound, synthetic bridge methods in bytecode, checkcast instructions, and reflection inspection',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine a high-tech architectural drafting firm that designs blueprinted models with precise color-coded lasers (`List<String>`). The engineers scrutinize the blueprints rigorously at the office (`javac` compiler). But when handing the final instructions to the old-school bricklayers at the construction site (`JVM runtime`), the firm prints everything in plain black-and-white ink (`java.lang.Object`) so the 1995 cement mixers can still build it without having to buy expensive new color-detecting machinery! To make sure the bricklayers do not accidentally put a bathroom faucet on the roof, the firm stations a safety inspector (`checkcast` bytecode instruction) at every doorway who checks every brick in real time. And if a specialized subcontractor overrides a task, the firm quietly creates a translation bridge (`synthetic bridge method`) so the old foreman`s commands seamlessly route to the new specialist!',
    interviewTakeaways: [
      'What is Type Erasure?: Type erasure is the compile-time process where the Java compiler strips all generic type metadata from classes, methods, and variables. In compiled bytecode, generic types are replaced by their raw types (`Object` for unbounded types, or the first bound for bounded types).',
      'Why Type Erasure Was Chosen: Java 5 prioritized binary backward compatibility with existing pre-Java 5 libraries and JVMs. Type erasure allowed generic Java 5 code to run on legacy JVMs and interoperate seamlessly with un-migrated legacy libraries without JVM bytecode changes.',
      'Bytecode checkcast Insertion: Because type parameters erase to `Object`, how does Java ensure type safety when elements are retrieved? The compiler automatically inserts synthetic bytecode `checkcast` instructions (e.g. `checkcast java/lang/String`) at every point where a generic element is read.',
      'Synthetic Bridge Methods: When a class implements a parameterized interface or extends a generic class (e.g. `class IntegerComparator implements Comparator<Integer>`), the child method has signature `compare(Integer, Integer)`. But the interface erases to `compare(Object, Object)`. To preserve polymorphic dynamic dispatch in the JVM, the compiler synthesizes a hidden "bridge method" `compare(Object, Object)` that casts arguments and delegates to the typed method.',
      'Erasure Rules: 1) Unbounded type parameter `T` erases to `Object`. 2) Bounded type parameter `<T extends Number>` erases to `Number`. 3) Multiple bounds `<T extends Number & Comparable>` erases to the first bound: `Number`.',
      'Runtime Generic Reification Loss: At runtime, `List<String>.class` does NOT exist. `new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass()` evaluates to `true` because both are simply `java.util.ArrayList`.'
    ],
    cheatSheet: {
      summary: 'Type erasure replaces generic types with Object or upper bounds at compile time, inserting checkcast bytecode on reads. Generates synthetic bridge methods to maintain polymorphic dispatch.',
      syntaxTemplate: `// Generic source code:
public class Box<T> {
    private T value;
    public T getValue() { return value; }
}

// What the JVM bytecode actually sees after type erasure:
public class Box {
    private Object value; // Erased to Object!
    public Object getValue() { return value; }
}

// Caller bytecode:
// Box<String> box = new Box<>();
// String s = box.getValue();
// Bytecode: invokespecial Box.getValue() -> checkcast java/lang/String`,
      rules: [
        { rule: 'Unbounded Erasure to Object', explanation: 'T erases to java.lang.Object in bytecode.' },
        { rule: 'Bounded Erasure to First Bound', explanation: '<T extends Number & Comparable> erases to java.lang.Number.' },
        { rule: 'Bridge Method Generation', explanation: 'Compiler generates synthetic bridge methods with Object parameters to preserve polymorphic method overriding.' },
        { rule: 'Method.isBridge() Flag', explanation: 'Reflection Method.isBridge() and Method.isSynthetic() report true for compiler-generated bridge methods.' },
        { rule: 'Class File Signature Attribute', explanation: 'Class files retain generic type signatures in a metadata attribute for reflection and compiler verification.' }
      ],
      quickComparison: [
        { aspect: 'Java Generics (Type Erasure)', optionA: 'Single compiled bytecode class (Box.class) shared by all types', optionB: 'Zero runtime code bloat; cannot instantiate new T() or new T[]' },
        { aspect: 'C++ Templates (Reification)', optionA: 'Generates a separate machine code class for every type (code bloat)', optionB: 'Supports primitive types, new T(), and specialized optimizations' },
        { aspect: 'Erasure of <T extends Number>', optionA: 'Erases to java.lang.Number in bytecode', optionB: 'Allows calling doubleValue() directly without checkcast' },
        { aspect: 'Runtime Class Identity', optionA: 'listString.getClass() == listInt.getClass() -> true', optionB: 'Both share the exact same java.util.ArrayList class object' }
      ]
    },
    coreExplanation: [
      'Type Erasure is the central architectural pillar of Java Generics. Understanding type erasure is essential for mastering senior Java interview questions, reflection, frameworks, and concurrency.',
      'When Java 5 was designed in 2004, billions of lines of pre-generic Java code were already running across the globe. Adding generics could be done in two ways: 1) Reification (like C# or C++), where the JVM runtime understands generic types natively. This would break backward compatibility with pre-Java 5 libraries. 2) Type Erasure, where generics exist purely at compile time as a compiler verification layer, generating standard 1.4-compatible bytecode. Java chose Type Erasure to ensure seamless, painless backward compatibility.',
      'The Erasure Process: During compilation, `javac` performs full type checking. Once verified: 1) All type parameters in generic types are replaced with their bounds or `Object`. 2) Type casts (`checkcast`) are inserted where necessary to preserve type safety. 3) Synthetic bridge methods are generated to preserve polymorphism in extended generic classes.',
      'Bytecode Evidence: If you run `javap -c Box.class`, you will see that all methods returning `T` actually return `java/lang/Object`. Where the caller invokes `String s = box.get()`, the bytecode reveals two instructions: `invokevirtual Box.get:()Ljava/lang/Object;` followed immediately by `checkcast java/lang/String`.',
      'Synthetic Bridge Methods: Consider `class Node<T> { void set(T val) {} }` and `class MyNode extends Node<Integer> { void set(Integer val) {} }`. In bytecode, `Node.set` erases to `void set(Object)`. But `MyNode` declares `void set(Integer)`. Because parameter types differ (`Object` vs `Integer`), in standard JVM method resolution, `MyNode` has OVERLOADED `set`, not overridden it! Dynamic method dispatch would fail if someone called `Node n = new MyNode(); n.set("wrong");`. To solve this, `javac` synthesizes a bridge method in `MyNode`: `public void set(Object o) { set((Integer) o); }`. It flags this method as `ACC_BRIDGE` and `ACC_SYNTHETIC`.',
      'Type Metadata Retention (Signature Attribute): Does type erasure destroy all generic information? No! While instance types are erased, class definitions, method signatures, and field declarations retain their generic information in a class file metadata table named `Signature`. Frameworks like Spring, Jackson, and Hibernate use reflection (`getGenericSuperclass()`, `getGenericParameterTypes()`) to inspect this metadata for dependency injection and JSON deserialization.'
    ],
    diagram: `HOW TYPE ERASURE AND BYTECODE CHECKCAST WORK
========================================================================

1. JAVA SOURCE CODE (Compile Time)
   Box<String> box = new Box<>();
   box.set("Hello");
   String s = box.get();

2. BYTECODE EMITTED BY JAVAC (Type Erasure in Action)
   0: new           #2   // class Box
   3: dup
   4: invokespecial #3   // Method Box."<init>":()V
   7: astore_1
   8: aload_1
   9: ldc           #4   // String "Hello"
  11: invokevirtual #5   // Method Box.set:(Ljava/lang/Object;)V  <-- Object param!
  14: aload_1
  15: invokevirtual #6   // Method Box.get:()Ljava/lang/Object;  <-- Returns Object!
  18: checkcast     #7   // class java/lang/String               <-- Synthetic Cast!
  21: astore_2

------------------------------------------------------------------------
SYNTHETIC BRIDGE METHOD GENERATION
------------------------------------------------------------------------
Base Generic Class:       class Node<T>           ──> Erases to: void setData(Object o)
                               ▲
                               │ extends Node<Integer>
Child Typed Class:        class MyNode            ──> Declares:  void setData(Integer i)

* Problem: Parameter types differ! Not an override in JVM bytecode!
* Solution: javac injects Synthetic Bridge Method in MyNode bytecode:

   public void setData(Object o) {                // Bridge Method (synthetic)
       setData((Integer) o);                      // Casts & delegates to typed method!
   }`,
    codeSnippet: {
      title: 'Proving Type Erasure and Bridge Method Generation via Reflection',
      code: `import java.lang.reflect.Method;
import java.util.*;

class GenericBase<T> {
    public void execute(T data) {
        System.out.println("GenericBase.execute");
    }
}

class StringSub extends GenericBase<String> {
    @Override
    public void execute(String data) {
        System.out.println("StringSub.execute: " + data);
    }
}

public class TypeErasureDemo {
    public static void main(String[] args) {
        // 1. Proving generic classes share the same runtime Class object
        List<String> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        System.out.println("Are runtime classes identical? " + (list1.getClass() == list2.getClass()));

        // 2. Inspecting synthetic bridge methods generated by javac
        System.out.println("\\nDeclared Methods in StringSub:");
        for (Method m : StringSub.class.getDeclaredMethods()) {
            System.out.printf("Name: %-10s | Param: %-18s | isBridge: %-5s | isSynthetic: %s%n",
                m.getName(), m.getParameterTypes()[0].getName(), m.isBridge(), m.isSynthetic());
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'class GenericBase<T> { ... }', explanation: 'Base generic class whose execute method erases to execute(Object).' },
        { line: 'class StringSub extends GenericBase<String>', explanation: 'Child class overriding execute with specific parameter String.' },
        { line: 'list1.getClass() == list2.getClass()', explanation: 'Evaluates to true because both generic instances share java.util.ArrayList.class at runtime.' },
        { line: 'm.isBridge()', explanation: 'Returns true for the synthetic bridge method execute(Object) generated by compiler.' },
        { line: 'm.isSynthetic()', explanation: 'Returns true for methods generated by the compiler rather than authored in source code.' }
      ],
      output: `Are runtime classes identical? true

Declared Methods in StringSub:
Name: execute    | Param: java.lang.String   | isBridge: false | isSynthetic: false
Name: execute    | Param: java.lang.Object   | isBridge: true  | isSynthetic: true`
    },
    codeExamples: [
      {
        title: 'Bypassing Compile-Time Type Checking via Raw Types',
        description: 'Demonstrating how type erasure allows inserting foreign types into a generic list via raw types, crashing at checkcast.',
        code: `import java.util.*;

public class RawTypeBypassDemo {
    public static void main(String[] args) {
        List<String> safeList = new ArrayList<>();
        safeList.add("Valid");

        // Raw type alias bypasses compiler generic checks
        List rawList = safeList;
        rawList.add(999); // Legal for raw type!

        System.out.println("Raw print: " + safeList);

        try {
            // Compiler inserts checkcast to String on get(1)
            String text = safeList.get(1);
            System.out.println("Text: " + text);
        } catch (ClassCastException e) {
            System.out.println("Caught runtime ClassCastException on checkcast: " + e.getMessage());
        }
    }
}`,
        output: `Raw print: [Valid, 999]
Caught runtime ClassCastException on checkcast: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')`
      },
      {
        title: 'Super Type Tokens (Preserving Generic Types at Runtime)',
        description: 'Demonstrating how anonymous subclasses preserve generic type parameters in bytecode attributes.',
        code: `import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

abstract class TypeToken<T> {
    public Type getType() {
        Type superclass = getClass().getGenericSuperclass();
        return ((ParameterizedType) superclass).getActualTypeArguments()[0];
    }
}

public class SuperTypeTokenDemo {
    public static void main(String[] args) {
        // Anonymous subclass ({}) embeds generic signature in class file
        TypeToken<java.util.Map<String, java.util.List<Integer>>> token = 
            new TypeToken<java.util.Map<String, java.util.List<Integer>>>() {};

        System.out.println("Reified Generic Type: " + token.getType().getTypeName());
    }
}`,
        output: `Reified Generic Type: java.util.Map<java.lang.String, java.util.List<java.lang.Integer>>`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Attempting to check generic types with instanceof: obj instanceof List<String>',
        whyItHappens: 'Because type parameters are erased at runtime, the JVM has no idea what element types a list contains during an instanceof check.',
        howToFix: 'Use unbounded wildcard: `if (obj instanceof List<?>)`. To verify elements, inspect elements manually or pass explicit `Class<T>` type tokens.'
      },
      {
        mistake: 'Trying to instantiate a generic type directly: new T()',
        whyItHappens: 'Since `T` erases to `Object` (or bound), the compiler cannot determine the constructor, concrete class, or memory allocation requirements.',
        howToFix: 'Pass a factory lambda (`Supplier<T>`) or class token (`Class<T> clazz`) and call `clazz.getDeclaredConstructor().newInstance()`.'
      },
      {
        mistake: 'Creating generic arrays: new T[10] or new List<String>[10]',
        whyItHappens: 'Java arrays are reified and check types at runtime. Generics are erased. Combining reified arrays with erased generics creates type holes (heap pollution).',
        howToFix: 'Use `List<T> list = new ArrayList<>()`, or use reflection `Array.newInstance(clazz, size)`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Runtime Class Identity under Type Erasure',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle1 {
    public static void main(String[] args) {
        List<String> l1 = new ArrayList<>();
        List<Integer> l2 = new ArrayList<>();
        System.out.println(l1.getClass() == l2.getClass());
    }
}`,
        options: [
          'A) false',
          'B) true',
          'C) Compilation Error',
          'D) Throws ClassCastException'
        ],
        correctOptionIndex: 1,
        hint: 'What is the runtime Class object of both generic list instances?',
        solution: 'Option B is correct: true',
        explanation: 'Due to type erasure, all generic type arguments are stripped at compile time. Both `l1` and `l2` share the exact same runtime `Class` object: `java.util.ArrayList.class`.'
      },
      {
        title: 'Puzzle 2: Erased Type of Bounded Type Parameter',
        problemStatement: 'In the compiled bytecode of `class Sorter<T extends Number & Comparable<T>>`, what type does T erase to?',
        code: `class Sorter<T extends Number & Comparable<T>> {
    public T sortItem(T item) { return item; }
}`,
        options: [
          'A) java.lang.Object',
          'B) java.lang.Comparable',
          'C) java.lang.Number',
          'D) IntersectionType'
        ],
        correctOptionIndex: 2,
        hint: 'In multiple bounds, T erases to the FIRST bound listed.',
        solution: 'Option C is correct: java.lang.Number',
        explanation: 'When a type parameter has multiple bounds, the compiler erases `T` to the FIRST bound listed in the bound declaration. Here, `Number` is first, so `T` erases to `Number`.'
      },
      {
        title: 'Puzzle 3: What Triggers a Synthetic Bridge Method?',
        problemStatement: 'Why does the compiler generate a synthetic bridge method in a class that implements `Comparable<Person>`?',
        code: `class Person implements Comparable<Person> {
    public int compareTo(Person o) { return 0; }
}`,
        options: [
          'A) To allow Person to be serialized over network sockets',
          'B) Because Comparable interface erases to compareTo(Object), so javac injects compareTo(Object) to bridge the call to compareTo(Person)',
          'C) To prevent memory leaks in HashMaps',
          'D) Because Person does not extend Object'
        ],
        correctOptionIndex: 1,
        hint: 'The raw interface signature requires compareTo(Object).',
        solution: 'Option B is correct: Because Comparable interface erases to compareTo(Object), so javac injects compareTo(Object) to bridge the call to compareTo(Person)',
        explanation: 'The `Comparable` interface erases to `int compareTo(Object)`. `Person` defines `int compareTo(Person)`. To satisfy JVM bytecode method dispatch, `javac` injects a bridge method `int compareTo(Object o) { return compareTo((Person) o); }`.'
      },
      {
        title: 'Puzzle 4: Where Does ClassCastException Occur?',
        problemStatement: 'In which line does the ClassCastException occur?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(); // Line 1
        List raw = list;                       // Line 2
        raw.add(42);                           // Line 3
        String str = list.get(0);              // Line 4
    }
}`,
        options: [
          'A) Line 2',
          'B) Line 3',
          'C) Line 4',
          'D) No exception occurs'
        ],
        correctOptionIndex: 2,
        hint: 'Line 3 adds Integer 42 into raw list (legal at runtime). Where is the checkcast instruction located?',
        solution: 'Option C is correct: Line 4',
        explanation: 'Because of type erasure, Line 3 simply invokes `list.add(Object)` which succeeds. In Line 4, `javac` inserts a synthetic `checkcast java/lang/String` on the result of `list.get(0)`. The checkcast fails at runtime, throwing `ClassCastException`.'
      },
      {
        title: 'Puzzle 5: Instanceof with Parameterized Types',
        problemStatement: 'What occurs when compiling: `if (obj instanceof ArrayList<String>)`?',
        code: `Object obj = new ArrayList<String>();
// if (obj instanceof ArrayList<String>) { ... }`,
        options: [
          'A) Compiles cleanly and returns true at runtime',
          'B) Compilation Error: Cannot perform instanceof check against parameterized type ArrayList<String>',
          'C) Throws ClassCastException',
          'D) Compiles with an unchecked warning'
        ],
        correctOptionIndex: 1,
        hint: 'Can the JVM inspect erased String parameters at runtime?',
        solution: 'Option B is correct: Compilation Error',
        explanation: 'Because generic type parameters are erased at compile time, the JVM has no runtime knowledge of whether the list contains Strings. `instanceof` with non-reifiable parameterized types is a compile-time error.'
      },
      {
        title: 'Puzzle 6: Creating Generic Array (new T[10])',
        problemStatement: 'Why is `T[] arr = new T[10];` forbidden in Java?',
        code: `public class GenericArray<T> {
    // T[] arr = new T[10]; // COMPILATION ERROR!
}`,
        options: [
          'A) Because arrays cannot hold objects',
          'B) Because T erases to Object, which would allocate an Object[] while pretending to be T[], leading to fatal type corruption',
          'C) Because JVM arrays only support primitives',
          'D) Because 10 is not a power of 2'
        ],
        correctOptionIndex: 1,
        hint: 'Arrays reify their component type; generics erase their component type.',
        solution: 'Option B is correct: Because T erases to Object, which would allocate an Object[] while pretending to be T[], leading to fatal type corruption',
        explanation: 'Arrays require runtime reification of their component type to enforce `ArrayStoreException`. Because `T` is erased to `Object`, `new T[10]` would create `new Object[10]`, breaking the fundamental runtime type safety of arrays.'
      },
      {
        title: 'Puzzle 7: Overloading Clash under Type Erasure',
        problemStatement: 'What happens when compiling this class?',
        code: `import java.util.List;

public class Puzzle7 {
    public void print(List<String> list) {}
    public void print(List<Integer> list) {}
}`,
        options: [
          'A) Compiles cleanly; javac uses name mangling',
          'B) Compilation Error: Name clash: both methods have the same erasure print(List)',
          'C) Overloading works if methods have different return types',
          'D) Runtime exception during class loading'
        ],
        correctOptionIndex: 1,
        hint: 'What do both method signatures erase to in bytecode?',
        solution: 'Option B is correct: Compilation Error: Name clash: both methods have the same erasure print(List)',
        explanation: 'Both methods erase to `public void print(List list)`. Because the JVM does not allow two methods with identical names and parameter descriptors in the same class, `javac` rejects this with a name clash error.'
      },
      {
        title: 'Puzzle 8: Preserving Type Metadata in Class Files',
        problemStatement: 'Where does the JVM class file store generic type information for reflection inspection (`getGenericSuperclass()`)?',
        code: `// class StringList extends ArrayList<String> {}`,
        options: [
          'A) In the JVM thread stack',
          'B) In the bytecode Signature attribute of the class file',
          'C) In an external XML configuration file',
          'D) In the garbage collector root table'
        ],
        correctOptionIndex: 1,
        hint: 'A special class file attribute preserved by javac.',
        solution: 'Option B is correct: In the bytecode Signature attribute of the class file',
        explanation: 'While instance type parameters are erased, class, method, and field generic signatures are preserved in the class file in a special bytecode metadata attribute named `Signature`, accessible via reflection.'
      },
      {
        title: 'Puzzle 9: Method.isBridge() Flag Inspection',
        problemStatement: 'How many total methods named "set" exist in the bytecode of `MyNode`?',
        code: `class Node<T> { public void set(T val) {} }
class MyNode extends Node<String> {
    public void set(String val) {}
}`,
        options: [
          'A) 1 method: set(String)',
          'B) 2 methods: set(String) and synthetic bridge method set(Object)',
          'C) 0 methods (inherited only)',
          'D) 3 methods'
        ],
        correctOptionIndex: 1,
        hint: 'One authored method plus one compiler-synthesized bridge method.',
        solution: 'Option B is correct: 2 methods: set(String) and synthetic bridge method set(Object)',
        explanation: '`MyNode` contains 2 methods in bytecode: `set(String)` (the authored method) and `set(Object)` (the synthetic bridge method generated by the compiler to maintain polymorphism).'
      },
      {
        title: 'Puzzle 10: ArrayStoreException with Covariant Arrays',
        problemStatement: 'What happens when running this code?',
        code: `public class Puzzle10 {
    public static void main(String[] args) {
        Object[] array = new String[3];
        array[0] = 42;
    }
}`,
        options: [
          'A) Compiles cleanly and converts 42 to "42"',
          'B) Compilation Error on array[0] = 42',
          'C) Throws ArrayStoreException at runtime',
          'D) Throws ClassCastException'
        ],
        correctOptionIndex: 2,
        hint: 'Java arrays are reified and know their actual runtime component type.',
        solution: 'Option C is correct: Throws ArrayStoreException at runtime',
        explanation: 'Because arrays are reified, the array object knows its runtime component type is `String`. When code attempts to store an `Integer` into a `String[]` via an `Object[]` reference, the JVM throws `ArrayStoreException`.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is Type Erasure in Java Generics? Walk through how the compiler and JVM handle generic types.',
        answer: 'Type Erasure is the compile-time mechanism used by the Java compiler (`javac`) where all generic type parameters and type arguments are erased (removed) during compilation. In the compiled bytecode: 1) Unbounded type parameters (like `T`) are replaced with `java.lang.Object`. 2) Bounded type parameters (like `<T extends Number>`) are replaced with their bounding class (`Number`). 3) The compiler automatically inserts synthetic bytecode `checkcast` instructions at every location where generic values are read into typed variables. 4) The compiler generates synthetic bridge methods in subclasses to preserve polymorphic method overriding. At runtime, the JVM knows nothing about generic type parameters and executes purely raw types with runtime cast verification.',
        followUp: 'Why did Java choose Type Erasure instead of Reification like C# or C++?',
        followUpAnswer: 'Java chose Type Erasure to preserve 100% binary backward compatibility with pre-Java 5 libraries and legacy JVMs. Reification would have required a new bytecode format and JVM execution engine, fragmenting the Java ecosystem.',
        keyPhrases: [
          'Type parameters erased at compile time',
          'Unbounded erases to Object; bounded erases to bound',
          'Compiler inserts bytecode checkcast instructions',
          'Synthetic bridge methods preserve polymorphism',
          'Guarantees backward compatibility with legacy Java'
        ],
        commonMistakeAnswer: 'Asserting that type erasure occurs at runtime when classes are loaded by the JVM.'
      },
      {
        question: 'What are Synthetic Bridge Methods? Why are they generated by javac and what problem do they solve?',
        answer: 'A synthetic bridge method is a compiler-generated method introduced to preserve polymorphic method overriding in classes that extend a generic class or implement a parameterized interface. For example, consider `class Node<T> { public void set(T v) {} }` and `class MyNode extends Node<Integer> { public void set(Integer v) {} }`. In bytecode, `Node.set` erases to `void set(Object)`. But `MyNode` declares `void set(Integer)`. In JVM bytecode, `set(Object)` and `set(Integer)` are two completely distinct method signatures (overloading, not overriding!). If a caller invokes `Node n = new MyNode(); n.set(Integer.valueOf(5));`, dynamic dispatch (`invokevirtual`) would fail to invoke `MyNode.set(Integer)`. To fix this, `javac` synthesizes a bridge method in `MyNode`: `public void set(Object v) { set((Integer) v); }`. It delegates to the typed method, preserving polymorphism.',
        followUp: 'How can you detect if a method is a bridge method using reflection?',
        followUpAnswer: 'By calling `method.isBridge()`, which inspects the `ACC_BRIDGE` access flag in the method`s bytecode flags.',
        keyPhrases: [
          'Compiler-generated synthetic method',
          'Preserves polymorphic dynamic method dispatch',
          'Bridges erased Object method to typed subclass method',
          'Flagged with ACC_BRIDGE and ACC_SYNTHETIC',
          'Inspected via Method.isBridge()'
        ],
        commonMistakeAnswer: 'Believing bridge methods connect Java code to C++ JNI native code.'
      },
      {
        question: 'What is the bytecode instruction `checkcast`, and where does the compiler insert it?',
        answer: '`checkcast` is a JVM bytecode instruction that checks at runtime whether the object reference currently on top of the operand stack can be cast to a specified class or interface. If the cast is illegal, it throws `ClassCastException`; if legal, execution continues without modifying the stack. Under Type Erasure, because generic methods like `List.get(int)` erase to returning `java/lang/Object`, the compiler automatically inserts a `checkcast` instruction at the call site whenever the returned object is assigned to a typed variable (e.g. `String s = list.get(0);` emits `invokevirtual List.get:()Object` followed by `checkcast java/lang/String`).',
        followUp: 'Can checkcast fail if generics were used properly without warnings?',
        followUpAnswer: 'No! If code compiles with zero unchecked warnings, the Java language type system mathematically guarantees that every checkcast will succeed at runtime without ClassCastException.',
        keyPhrases: [
          'JVM bytecode instruction for runtime cast verification',
          'Throws ClassCastException on illegal types',
          'Inserted automatically by javac at generic read call sites',
          'Guaranteed to succeed if compiled without unchecked warnings'
        ],
        commonMistakeAnswer: 'Thinking checkcast changes the internal memory layout of the object.'
      },
      {
        question: 'Is all generic information completely lost at runtime? What is the Signature attribute?',
        answer: 'No, generic type information is NOT completely lost! While instance type parameters are erased from heap objects (e.g., an `ArrayList` object does not know it holds Strings), class definitions, method parameters, and field declarations retain their generic type signatures in a bytecode metadata attribute called `Signature`. This attribute is stored in the `.class` file and is accessible via the Java Reflection API (`Class.getGenericSuperclass()`, `Method.getGenericParameterTypes()`, `Field.getGenericType()`). Frameworks like Spring, Jackson, and Hibernate rely on this metadata to discover generic types for dependency injection and JSON mapping.',
        followUp: 'How does the Super Type Token pattern capture generic types at runtime?',
        followUpAnswer: 'By creating an anonymous subclass (`new TypeToken<List<String>>() {}`), the generic type `List<String>` is burned into the subclass definition`s Signature attribute, allowing `getGenericSuperclass()` to retrieve the parameterized type at runtime.',
        keyPhrases: [
          'Class file bytecode Signature metadata attribute',
          'Retains generic signatures for classes, methods, and fields',
          'Accessible via getGenericSuperclass() and getGenericType()',
          'Super Type Token pattern captures types via anonymous classes'
        ],
        commonMistakeAnswer: 'Claiming that reflection can never discover any generic types under any circumstances.'
      },
      {
        question: 'Compare Java Generics (Type Erasure) with C++ Templates and C# Generics (Reification).',
        answer: '1) C++ Templates: Processed at compile time via template instantiation. The compiler generates a distinct machine code class for every substituted type (e.g. `vector<int>` and `vector<double>` are two separate classes). This allows primitive types and `new T()`, but causes binary code bloat. 2) C# Generics: Supported natively by the CLR (runtime reification). A single class template exists, but at runtime, specialized machine code is JITted for value types, and a shared class handles reference types. Primitives (`List<int>`) and `new T()` are fully supported. 3) Java Generics: Pure type erasure. All reference types share a single `ArrayList.class` at runtime. Primitives are not supported without boxing, and `new T()` is illegal, but binary backward compatibility is 100% preserved and zero code bloat occurs.',
        followUp: 'What is Project Valhalla in the Java ecosystem?',
        followUpAnswer: 'Project Valhalla is an ongoing OpenJDK initiative to introduce Value Objects and Primitive Specialization to Java Generics, enabling primitive generics like List<int> without boxing overhead.',
        keyPhrases: [
          'Java: Type erasure, single bytecode class, no code bloat, backward compatible',
          'C++: Compile-time code generation, supports primitives, code bloat',
          'C#: CLR runtime reification, JIT specialization for value types',
          'Project Valhalla introduces primitive specialization to Java'
        ],
        commonMistakeAnswer: 'Asserting that C# generics and Java generics work identically under the hood.'
      },
      {
        question: 'Why does the JVM forbid creating generic arrays, such as `new T[10]` or `new List<String>[10]`?',
        answer: 'Because Java arrays are reified and covariant, whereas Generics are erased and invariant. 1) Reified Arrays: A Java array enforces its component type at runtime. If you have a `String[]`, the JVM checks every insertion and throws `ArrayStoreException` if you attempt to store an `Integer`. 2) Covariant Arrays: In Java, `String[]` is an `Object[]`. 3) The Conflict: If `new List<String>[10]` were allowed, it would erase to `new List[10]`. Because arrays are covariant, you could assign it to `Object[] arr = new List<String>[10]`. Then someone could execute `arr[0] = new ArrayList<Integer>()` (legal on Object[]). Later, reading `List<String> l = (List<String>) arr[0]; String s = l.get(0);` would detonate with a ClassCastException! To prevent this subtle type safety hole (heap pollution), Java outright bans generic array creation.',
        followUp: 'How do you create a type-safe array of generic items if required?',
        followUpAnswer: 'Use reflection via `(T[]) Array.newInstance(clazz, size)`, or prefer using `List<List<String>>` which is 100% type-safe.',
        keyPhrases: [
          'Arrays are reified and covariant',
          'Generics are erased and invariant',
          'Mixing them creates undetectable heap pollution',
          'ArrayStoreException cannot verify erased generic types',
          'Use List<List<T>> or Array.newInstance(clazz, size)'
        ],
        commonMistakeAnswer: 'Believing generic arrays are banned because the JVM runs out of array memory.'
      },
      {
        question: 'What is Heap Pollution in Java? Give a code example of how it occurs.',
        answer: 'Heap Pollution occurs when a variable of a parameterized type refers to an object that is NOT of that parameterized type. It typically occurs when mixing raw types with parameterized types, or when using unchecked varargs. Code example: `List<String> strList = new ArrayList<>(); List raw = strList; raw.add(100);`. The heap now contains an `Integer` inside what is statically typed as `List<String>`. The program continues without error until someone attempts to read from `strList`: `String s = strList.get(0);`. At this point, the compiler-inserted `checkcast` fails and throws `ClassCastException`.',
        followUp: 'What compiler warning indicates potential heap pollution?',
        followUpAnswer: '`Type safety: Unchecked cast` or `Possible heap pollution from parameterized vararg type`.',
        keyPhrases: [
          'Parameterized variable points to object of wrong type',
          'Occurs when mixing raw types or unchecked varargs',
          'Pollutes the heap without immediate exception',
          'Crashes later at checkcast on read'
        ],
        commonMistakeAnswer: 'Confusing heap pollution with a memory leak or OutOfMemoryError.'
      },
      {
        question: 'Why is `new T()` a compilation error in a generic class? How do you work around it?',
        answer: '`new T()` is illegal because of Type Erasure. At compile time, the compiler has no knowledge of what concrete class `T` represents at runtime. `T` erases to `Object` (or bound). The compiler does not know what constructor `T` has, whether it is an interface or abstract class, or how many bytes of memory to allocate on the heap. Workaround 1: Pass a `Supplier<T> factory` and invoke `factory.get()` (e.g. `Container::new`). Workaround 2: Pass a runtime type token `Class<T> clazz` and instantiate via reflection: `clazz.getDeclaredConstructor().newInstance()`.',
        followUp: 'Why is Supplier<T> preferred over Class<T> reflection in modern Java?',
        followUpAnswer: '`Supplier<T>` is type-safe, supports constructors with arguments, does not throw checked reflective exceptions (NoSuchMethodException, IllegalAccessException), and is optimized by HotSpot JIT inlining.',
        keyPhrases: [
          'Type erasure removes concrete type information',
          'Compiler cannot verify constructors or allocation size',
          'Pass Supplier<T> factory lambda (preferred)',
          'Pass Class<T> token and use reflection'
        ],
        commonMistakeAnswer: 'Asserting that new T() is forbidden because T might be private.'
      },
      {
        question: 'What is the @SafeVarargs annotation, and what constraints are placed on its usage?',
        answer: '`@SafeVarargs` is an annotation introduced in Java 7 to suppress compiler warnings about potential heap pollution when using generic varargs parameters (`T... elements`). Because varargs compiles into an array (`T[]`), and generic arrays can cause heap pollution, javac issues a warning on every generic varargs method. Applying `@SafeVarargs` asserts that the method is well-behaved: 1) It does not store anything into the varargs array, and 2) It does not allow the reference to the varargs array to escape. Constraints: `@SafeVarargs` can ONLY be applied to methods that CANNOT be overridden: `static` methods, `final` instance methods, and (since Java 9) `private` instance methods.',
        followUp: 'Why cannot @SafeVarargs be placed on a non-final public instance method?',
        followUpAnswer: 'Because a subclass could override the method and perform unsafe array mutations, violating the safety guarantee made by the annotation.',
        keyPhrases: [
          'Suppresses generic varargs heap pollution warnings',
          'Asserts method does not store to array or escape reference',
          'Applicable only to static, final, or private methods',
          'Cannot be overridden by subclasses'
        ],
        commonMistakeAnswer: 'Placing @SafeVarargs on standard public overridable methods.'
      },
      {
        question: 'How does reflection method inspection differentiate between bridge methods and regular methods?',
        answer: 'The Java Reflection API provides `Method.isBridge()` and `Method.isSynthetic()`. `isSynthetic()` returns true for any compiler-generated member not present in the original source code. `isBridge()` specifically returns true if the method was generated by `javac` to resolve type erasure inheritance mismatches (marked with bytecode access flag `ACC_BRIDGE = 0x0040`). Frameworks processing annotations (such as Spring MVC `@RequestMapping` or Jackson serializers) filter out bridge methods using `!method.isBridge()` to avoid executing duplicate handler invocations.',
        followUp: 'What happens if you invoke a bridge method via reflection?',
        followUpAnswer: 'It invokes the bridge method, which casts the argument and immediately delegates to the authored typed method, functioning identically to standard invocation.',
        keyPhrases: [
          'Method.isBridge() inspects ACC_BRIDGE flag',
          'Method.isSynthetic() inspects ACC_SYNTHETIC flag',
          'Frameworks filter out bridge methods to avoid duplicate calls',
          'Bridge method casts and delegates to typed method'
        ],
        commonMistakeAnswer: 'Thinking bridge methods are invisible to the Reflection API.'
      }
    ],
    miniQuiz: [
      {
        question: 'What happens to the generic type parameter T in `class Box<T>` during compilation?',
        options: [
          'It is converted to a dynamic C++ template',
          'It is erased to java.lang.Object in bytecode',
          'It creates a new class file for every type',
          'It is stored in the JVM heap'
        ],
        correctIndex: 1,
        explanation: 'Under type erasure, unbounded type parameters like `T` are replaced by `java.lang.Object` in compiled bytecode.'
      },
      {
        question: 'Why did the creators of Java choose Type Erasure for Generics in Java 5?',
        options: [
          'To make Java faster than C++',
          'To preserve 100% binary backward compatibility with existing pre-Java 5 libraries and JVMs',
          'To eliminate the need for garbage collection',
          'Because the JVM could not support 32-bit pointers'
        ],
        correctIndex: 1,
        explanation: 'Type erasure allowed generic Java 5 programs to interoperate seamlessly with un-migrated legacy libraries and run on existing JVM architectures.'
      },
      {
        question: 'Which bytecode instruction is automatically inserted by javac when reading elements from a generic collection?',
        options: [
          'instanceof',
          'checkcast',
          'invokedynamic',
          'monitorenter'
        ],
        correctIndex: 1,
        explanation: '`checkcast` verifies at runtime that the object returned from the erased method matches the expected generic type.'
      },
      {
        question: 'What is a synthetic bridge method in Java?',
        options: [
          'A method connecting Java code to C++ native code via JNI',
          'A compiler-generated method injected into a subclass to preserve polymorphic method overriding across erased signatures',
          'A method that bridges two network sockets',
          'A thread synchronization lock'
        ],
        correctIndex: 1,
        explanation: 'Bridge methods bridge the gap between erased superclass method signatures (with Object) and typed subclass method signatures.'
      },
      {
        question: 'What does the type parameter erase to in `class Sorter<T extends Number & Comparable<T>>`?',
        options: [
          'java.lang.Object',
          'java.lang.Comparable',
          'java.lang.Number',
          'void'
        ],
        correctIndex: 2,
        explanation: 'Under multiple bounds, the type parameter erases to the FIRST bound listed (`java.lang.Number`).'
      },
      {
        question: 'Why is `new T()` a compilation error in Java generic code?',
        options: [
          'Because T might not have a public zero-arg constructor, and type erasure leaves the compiler with no concrete type to allocate',
          'Because memory is allocated on the stack',
          'Because T must be an interface',
          'Because the new keyword is deprecated'
        ],
        correctIndex: 0,
        explanation: 'Type erasure strips concrete type information, preventing `new T()` from knowing which constructor or class to instantiate.'
      },
      {
        question: 'What happens at runtime when evaluating `new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass()`?',
        options: [
          'Evaluates to false',
          'Evaluates to true because both share java.util.ArrayList.class',
          'Throws ClassCastException',
          'Compilation error'
        ],
        correctIndex: 1,
        explanation: 'Because generics are erased at compile time, both instances share the identical runtime `java.util.ArrayList` Class object.'
      },
      {
        question: 'What is Heap Pollution in Java Generics?',
        options: [
          'A severe memory leak caused by static variables',
          'A situation where a parameterized variable refers to an object of a different type, leading to later ClassCastExceptions on read',
          'Garbage collector heap fragmentation',
          'Corrupted heap memory from buffer overflow'
        ],
        correctIndex: 1,
        explanation: 'Heap pollution occurs when an object of the wrong type slips into a parameterized reference, causing runtime cast failures later.'
      },
      {
        question: 'On which methods can the `@SafeVarargs` annotation be legally applied?',
        options: [
          'Any public instance method',
          'Only methods that cannot be overridden: static methods, final instance methods, or private methods',
          'Abstract methods only',
          'Constructors only'
        ],
        correctIndex: 1,
        explanation: '`@SafeVarargs` requires that the method cannot be overridden by subclasses: it is restricted to static, final, or private methods.'
      },
      {
        question: 'How do frameworks like Jackson or Spring read generic type parameters of classes at runtime despite type erasure?',
        options: [
          'By decompiling the .class file on the fly',
          'By inspecting the bytecode Signature attribute preserved in class definitions via reflection',
          'By guessing based on variable names',
          'Generics are never accessible at runtime'
        ],
        correctIndex: 1,
        explanation: 'The compiler preserves generic type signatures of classes, methods, and fields in the bytecode `Signature` attribute, readable via reflection.'
      }
    ]
  }
};
