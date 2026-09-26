import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 14: OBJECT CLASS & CONTRACT (LESSONS 14.1 - 14.4)
// High-Quality, In-Depth Curriculum for Java Core Concepts
// Constraints: Zero forward topics (NO collections, NO lambdas/streams)
// ============================================================

export const oop14Lessons: Record<string, DetailedLesson> = {
  'object-root-class': {
    id: 'object-root-class',
    moduleId: 'java-object-class',
    moduleTitle: '14. Object Class & Contract',
    lessonNumber: 'Lesson 14.1',
    title: 'The Root java.lang.Object Class',
    subtitle: 'The universal ancestor, JVM type hierarchy, default inherited methods, and universal reference polymorphism',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Think of `java.lang.Object` like the fundamental carbon atom in organic chemistry. Every living cell—whether a blade of grass, a blue whale, an eagle, or a bacterium—is fundamentally built upon carbon atoms and inherits core atomic rules of physics. In Java, every single class you or anyone else will ever write—whether a `String`, a `JFrame`, a `Thread`, or a custom `UserAccount`—implicitly inherits from `java.lang.Object`. If you do not write `extends` on your class, the Java compiler automatically injects `extends java.lang.Object` behind the scenes. It provides the universal baseline DNA that makes any entity an authentic object in the JVM memory space.',
    coreExplanation: [
      '`java.lang.Object` sits at the absolute root of the Java class hierarchy. Every class in Java is a direct or indirect descendant of `Object`. It is the only class in the entire Java language that has no superclass.',
      'If a class declaration does not explicitly include an `extends` clause, the Java compiler automatically inserts `extends java.lang.Object`. If a class does extend another class, it still inherits `Object` indirectly through its ancestor chain.',
      'Universal Reference Polymorphism: A reference variable of type `Object` can hold a pointer to an instance of ANY class, including all standard Java library classes, custom user classes, and even array instances (e.g., `Object obj = new int[10];`).',
      'The `Object` class defines exactly 11 public and protected methods that establish baseline object behavior: `toString()`, `equals(Object)`, `hashCode()`, `getClass()`, `clone()`, `finalize()` (deprecated), and thread coordination methods (`wait()`, `notify()`, `notifyAll()`).',
      'The `getClass()` method is declared `public final Class<?> getClass()`. Because it is `final`, no class can override it. It returns the exact runtime `Class` object representing the true instantiated type of the object in memory.',
      'Java arrays are first-class objects in the JVM. Every array type (`int[]`, `String[]`, `Object[]`) directly subclasses `java.lang.Object` and inherits its methods, implementing `Cloneable` and `java.io.Serializable`.',
      'Primitive types (`int`, `double`, `boolean`, etc.) do NOT extend `Object`. However, through Java\'s autoboxing mechanism, primitives can be automatically converted into their corresponding wrapper classes (`Integer`, `Double`, `Boolean`), which do extend `Object`.',
      'Interfaces do NOT inherit from `java.lang.Object`. However, every interface implicitly declares abstract method signatures matching all public methods of `java.lang.Object` so that any interface reference can invoke `toString()`, `equals()`, and `hashCode()`.'
    ],
    diagram: `===================== UNIVERSAL JAVA TYPE HIERARCHY =====================

                                +-----------------------+
                                |   java.lang.Object    |  <-- Absolute Root
                                +-----------------------+
                                | + toString(): String  |
                                | + equals(o): boolean  |
                                | + hashCode(): int     |
                                | + getClass(): Class   |
                                | + clone(): Object     |
                                +-----------------------+
                                            ▲
                  ┌─────────────────────────┼─────────────────────────┐
                  │                         │                         │
        +-------------------+     +-------------------+     +-------------------+
        |      String       |     |      Number       |     |     int[] / int   |
        +-------------------+     +-------------------+     | (Arrays extend    |
                                            ▲               |  Object directly; |
                                   ┌────────┴────────┐      |  Primitives box)  |
                                   │                 │      +-------------------+
                            +-------------+   +-------------+
                            |   Integer   |   |   Double    |
                            +-------------+   +-------------+
                                   ▲
                          (Implicit Inheritance)
                        class User { ... }  ==>  class User extends Object { ... }`,
    codeSnippet: {
      title: 'Universal Object Reference and Runtime Type Inspection',
      code: `class Device {
    private String model;
    public Device(String model) { this.model = model; }
}

public class Main {
    public static void inspectObject(Object obj) {
        if (obj == null) {
            System.out.println("Object is null");
            return;
        }

        // 1. Inspect exact runtime type using getClass()
        Class<?> clazz = obj.getClass();
        System.out.println("Class Name: " + clazz.getName());
        System.out.println("Is Array? " + clazz.isArray());

        // 2. Default Object methods
        System.out.println("Default toString(): " + obj.toString());
        System.out.println("Default hashCode(): " + obj.hashCode());
        System.out.println("-------------------------------------");
    }

    public static void main(String[] args) {
        // Universal reference can hold anything
        inspectObject(new Device("Sensor-T100"));
        inspectObject(new int[]{1, 2, 3});
        inspectObject("Core Java");
    }
}`,
      lineByLineExplanation: [
        {
          line: 'public static void inspectObject(Object obj)',
          explanation: 'Accepts an Object reference; thanks to universal polymorphism, any Java object can be passed as an argument.'
        },
        {
          line: 'Class<?> clazz = obj.getClass();',
          explanation: 'Calls the final getClass() method inherited from java.lang.Object to retrieve runtime reflection metadata.'
        },
        {
          line: 'System.out.println("Is Array? " + clazz.isArray());',
          explanation: 'Demonstrates that array types in Java are genuine objects with full Class descriptors.'
        },
        {
          line: 'obj.toString() and obj.hashCode()',
          explanation: 'Invokes baseline methods defined in java.lang.Object that every Java entity is guaranteed to possess.'
        },
        {
          line: 'inspectObject(new int[]{1, 2, 3});',
          explanation: 'Passes a primitive array directly to an Object parameter, proving that arrays inherit directly from Object.'
        }
      ],
      output: `Class Name: Device
Is Array? false
Default toString(): Device@...
Default hashCode(): ...
-------------------------------------
Class Name: [I
Is Array? true
Default toString(): [I@...
Default hashCode(): ...
-------------------------------------
Class Name: java.lang.String
Is Array? false
Default toString(): Core Java
Default hashCode(): ...
-------------------------------------`
    },
    codeExamples: [
      {
        title: 'Universal Object Array Container',
        description: 'Demonstrates storing heterogeneous object types inside an Object[] array without collections.',
        code: `class Point {
    int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    @Override public String toString() { return "(" + x + "," + y + ")"; }
}

public class HeterogeneousContainer {
    public static void main(String[] args) {
        // Object[] can hold references to completely disparate types
        Object[] registry = new Object[4];
        registry[0] = "System Server";
        registry[1] = 8080;                  // Autoboxed to Integer
        registry[2] = new Point(12, 45);
        registry[3] = new boolean[]{true, false};

        for (int i = 0; i < registry.length; i++) {
            Object item = registry[i];
            System.out.printf("Slot [%d]: Type=%s, Value=%s%n",
                i, item.getClass().getSimpleName(), item.toString());
        }
    }
}`,
        output: `Slot [0]: Type=String, Value=System Server
Slot [1]: Type=Integer, Value=8080
Slot [2]: Type=Point, Value=(12,45)
Slot [3]: Type=boolean[], Value=[Z@...`
      },
      {
        title: 'getClass() vs instanceof Type Discrimination',
        description: 'Shows the critical difference between strict exact-type checking via getClass() and polymorphic subtype checking via instanceof.',
        code: `class Parent {}
class Child extends Parent {}

public class TypeCheckDemo {
    public static void main(String[] args) {
        Parent p = new Parent();
        Parent c = new Child();

        System.out.println("--- instanceof check (Subtype Aware) ---");
        System.out.println("p instanceof Parent: " + (p instanceof Parent));
        System.out.println("c instanceof Parent: " + (c instanceof Parent));
        System.out.println("c instanceof Child:  " + (c instanceof Child));

        System.out.println("\\n--- getClass() check (Exact Type Only) ---");
        System.out.println("p.getClass() == Parent.class: " + (p.getClass() == Parent.class));
        System.out.println("c.getClass() == Parent.class: " + (c.getClass() == Parent.class));
        System.out.println("c.getClass() == Child.class:  " + (c.getClass() == Child.class));
    }
}`,
        output: `--- instanceof check (Subtype Aware) ---
p instanceof Parent: true
c instanceof Parent: true
c instanceof Child:  true

--- getClass() check (Exact Type Only) ---
p.getClass() == Parent.class: true
c.getClass() == Parent.class: false
c.getClass() == Child.class:  true`
      }
    ],
    cheatSheet: {
      summary: 'java.lang.Object is the universal root class of Java. It provides foundational methods like equals, hashCode, toString, and getClass that every class inherits.',
      syntaxTemplate: `// Explicit inheritance is optional; Object is always the superclass
public class CustomClass /* extends Object */ {
    @Override
    public String toString() {
        return "CustomClass instance";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return true;
    }

    @Override
    public int hashCode() {
        return 31;
    }
}`,
      rules: [
        {
          rule: 'Universal Root Guarantee',
          explanation: 'Every class in Java directly or indirectly extends java.lang.Object. It is the only class with no superclass.'
        },
        {
          rule: 'Universal Reference Assignment',
          explanation: 'An Object variable can hold a reference to any object, including custom classes and array types.'
        },
        {
          rule: 'getClass() is Final',
          explanation: 'The getClass() method in Object cannot be overridden by any subclass, guaranteeing reliable runtime type identity.'
        },
        {
          rule: 'Downcasting Requirement',
          explanation: 'Invoking subclass-specific methods through an Object reference requires an explicit downcast: ((MyClass) obj).specificMethod().'
        },
        {
          rule: 'Array Hierarchy',
          explanation: 'All array types (even primitive arrays like int[]) are direct subclasses of Object and implement Cloneable and Serializable.'
        },
        {
          rule: 'Primitives Do Not Extend Object',
          explanation: 'Primitives (int, char, boolean) are not objects. They only interact with Object through wrapper autoboxing.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Type Scope',
          optionA: 'Object: Can reference any object instance, array, or boxed primitive',
          optionB: 'Specific Class: Can only reference instances of that class or its subclasses'
        },
        {
          aspect: 'Type Checking: instanceof',
          optionA: 'Subtype Compatible: Returns true for the class and ANY subclass',
          optionB: 'Exact Match: getClass() == Target.class returns true ONLY for exact runtime type'
        },
        {
          aspect: 'Array Inheritance',
          optionA: 'Arrays: Inherit directly from Object',
          optionB: 'Primitives: Value types on stack/heap; do not inherit from Object'
        },
        {
          aspect: 'Overriding getClass()',
          optionA: 'getClass(): Marked final; cannot be overridden',
          optionB: 'toString(): Non-final; can and should be overridden'
        },
        {
          aspect: 'Default equals()',
          optionA: 'Object.equals(): Performs pure reference comparison (this == obj)',
          optionB: 'Overridden equals(): Compares logical internal field values'
        },
        {
          aspect: 'Memory Layout & Header',
          optionA: 'Object Header: Mark Word (8B) + Klass Pointer (4B with CompressedOOPs)',
          optionB: 'java.lang.Object: Baseline 0 instance fields; subclasses append fields sequentially'
        },
        {
          aspect: 'Dispatch & Complexity',
          optionA: 'Object Methods: invokevirtual via vtable index (O(1) dispatch)',
          optionB: 'getClass(): O(1) direct header Klass pointer dereference'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Assuming primitives (like int, double) directly inherit from Object.',
        whyItHappens: 'Seeing `Object o = 5;` compile cleanly and assuming `int` is a class.',
        howToFix: '`int` is a primitive value type. `Object o = 5;` only works because the compiler injects autoboxing: `Integer.valueOf(5)`. Primitives themselves have no methods and do not extend Object.'
      },
      {
        mistake: 'Trying to call subclass-specific methods directly on an Object reference.',
        whyItHappens: 'Writing `Object obj = new String("Hello"); obj.toUpperCase();` and expecting it to compile.',
        howToFix: 'The compiler resolves methods based on the reference type (`Object`), not the runtime object. Downcast first: `((String) obj).toUpperCase();`.'
      },
      {
        mistake: 'Confusing getClass() == Other.class with instanceof in inheritance.',
        whyItHappens: 'Assuming both checks perform the same type verification.',
        howToFix: '`instanceof` returns true for instances of subclasses (polymorphic). `getClass() == Other.class` checks for exact identity, ignoring subclasses.'
      },
      {
        mistake: 'Believing interfaces extend java.lang.Object.',
        whyItHappens: 'Calling `.toString()` or `.equals()` on an interface reference works without error.',
        howToFix: 'Interfaces do not extend Object. However, the Java Language Specification mandates that all interfaces implicitly declare signatures matching Object\'s public methods.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Array Inheritance Verification',
        problemStatement: 'What does this program print?',
        code: `public class Main {
    public static void main(String[] args) {
        int[] numbers = new int[]{1, 2, 3};
        Object obj = numbers;

        System.out.print((obj instanceof Object) + " ");
        System.out.print((numbers.getClass().getSuperclass() == Object.class) + " ");
        System.out.print(numbers.getClass().getName());
    }
}`,
        options: [
          'true true [I',
          'true false [I',
          'false false int[]',
          'Compilation Error: int[] cannot be assigned to Object'
        ],
        correctOptionIndex: 0,
        hint: 'Are primitive arrays full objects in Java? What is their direct superclass?',
        solution: 'true true [I',
        explanation: 'In Java, arrays are genuine objects. Primitive array `int[]` extends `java.lang.Object` directly, so `obj instanceof Object` is true, its superclass is `Object.class`, and its internal JVM class name is `[I`. Output: "true true [I".'
      },
      {
        title: 'Puzzle 2: Method Availability on Object Reference',
        problemStatement: 'What happens when compiling and running the following code?',
        code: `class Box {
    public void open() {
        System.out.print("Opened");
    }
}

public class Main {
    public static void main(String[] args) {
        Object item = new Box();
        // Line 10:
        // item.open();
        ((Box) item).open();
    }
}`,
        options: [
          'Prints: Opened',
          'Line 10 causes a compile-time error if uncommented because Object has no open() method',
          'Both A and B are true',
          'Runtime ClassCastException'
        ],
        correctOptionIndex: 2,
        hint: 'The compiler inspects the reference type to determine available methods.',
        solution: 'Both A and B are true',
        explanation: 'With Line 10 commented out, casting `((Box) item).open()` compiles and prints "Opened". If Line 10 were uncommented, compilation would fail because the static type `Object` does not declare `open()`. Both statements are true.'
      },
      {
        title: 'Puzzle 3: Default Object.equals() Behavior',
        problemStatement: 'What does this program print?',
        code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(5, 10);
        Point p2 = new Point(5, 10);
        Point p3 = p1;

        System.out.print(p1.equals(p2) + " ");
        System.out.print(p1.equals(p3));
    }
}`,
        options: [
          'true true',
          'false true',
          'false false',
          'true false'
        ],
        correctOptionIndex: 1,
        hint: 'Point does not override equals(). What is the default implementation in java.lang.Object?',
        solution: 'false true',
        explanation: 'Because `Point` does not override `equals()`, it inherits `Object.equals()`, which evaluates `this == obj` (reference identity). `p1` and `p2` are distinct heap objects, so `p1.equals(p2)` is `false`. `p1` and `p3` point to the same object, so `p1.equals(p3)` is `true`. Output: "false true".'
      },
      {
        title: 'Puzzle 4: Overriding getClass() Compilation Attempt',
        problemStatement: 'What is the outcome of compiling this class?',
        code: `class SecretAgent {
    // Attempting to disguise runtime type
    public Class<?> getClass() {
        return Object.class;
    }
}`,
        options: [
          'Compiles cleanly; disguise succeeds',
          'Compile-time error: getClass() in SecretAgent cannot override getClass() in Object; overridden method is final',
          'Runtime SecurityException when loaded',
          'Compiles only with @SuppressWarnings'
        ],
        correctOptionIndex: 1,
        hint: 'Is the getClass() method in java.lang.Object declared final?',
        solution: 'Compile-time error: getClass() in SecretAgent cannot override getClass() in Object; overridden method is final',
        explanation: 'In `java.lang.Object`, `public final Class<?> getClass()` is declared `final`. Final methods can never be overridden by any subclass. Compilation fails.'
      },
      {
        title: 'Puzzle 5: Autoboxing and Object Polymorphic Identity',
        problemStatement: 'What is the console output?',
        code: `public class Main {
    public static void main(String[] args) {
        Object val = 127;
        System.out.print(val.getClass().getSimpleName() + " ");
        System.out.print((val instanceof Number) + " ");
        System.out.print((val instanceof Comparable));
    }
}`,
        options: [
          'Integer true true',
          'int true false',
          'Object true true',
          'Integer false true'
        ],
        correctOptionIndex: 0,
        hint: 'Autoboxing converts int 127 to Integer. What does Integer extend and implement?',
        solution: 'Integer true true',
        explanation: 'The literal `127` is autoboxed into an `Integer` object. `val.getClass().getSimpleName()` returns "Integer". `Integer` extends `Number` and implements `Comparable<Integer>`, so both `instanceof` checks return `true`. Output: "Integer true true".'
      },
      {
        title: 'Puzzle 6: Interface Reference Invoking Object Methods',
        problemStatement: 'Does this code compile, and what does it print?',
        code: `interface Actionable {
    void execute();
}

public class Main {
    public static void main(String[] args) {
        Actionable a = new Actionable() {
            @Override
            public void execute() { System.out.print("Exec-"); }
            @Override
            public String toString() { return "CustomAction"; }
        };

        System.out.print(a.toString() + "-");
        a.execute();
    }
}`,
        options: [
          'CustomAction-Exec-',
          'Compilation Error: Actionable does not declare toString()',
          'Actionable@...-Exec-',
          'Runtime NoSuchMethodError'
        ],
        correctOptionIndex: 0,
        hint: 'Can interface references invoke methods defined in java.lang.Object?',
        solution: 'CustomAction-Exec-',
        explanation: 'Every interface implicitly declares public method signatures matching `java.lang.Object`. Therefore, `a.toString()` is completely valid at compile time and dynamically dispatches to the overridden `toString()`. Output: "CustomAction-Exec-".'
      },
      {
        title: 'Puzzle 7: Comparing getClass() on Subclasses',
        problemStatement: 'What does this program print?',
        code: `class Vehicle {}
class Truck extends Vehicle {}

public class Main {
    public static void main(String[] args) {
        Vehicle v1 = new Vehicle();
        Vehicle v2 = new Truck();

        System.out.print((v1.getClass() == v2.getClass()) + " ");
        System.out.print((v2 instanceof Vehicle));
    }
}`,
        options: [
          'false true',
          'true true',
          'false false',
          'true false'
        ],
        correctOptionIndex: 0,
        hint: 'v2 was instantiated with new Truck(). What does v2.getClass() return?',
        solution: 'false true',
        explanation: '`v1.getClass()` is `Vehicle.class`, while `v2.getClass()` is `Truck.class`. Since they are different classes, the `==` check yields `false`. However, `Truck` is a subclass of `Vehicle`, so `v2 instanceof Vehicle` evaluates to `true`. Output: "false true".'
      },
      {
        title: 'Puzzle 8: Default Object.toString() Format',
        problemStatement: 'What components make up the default String returned by Object.toString()?',
        code: `class Token {}

public class Main {
    public static void main(String[] args) {
        Token t = new Token();
        String str = t.toString();
        System.out.println(str.contains("@"));
    }
}`,
        options: [
          'true',
          'false',
          'Compilation Error: Token has no toString() method',
          'NullPointerException'
        ],
        correctOptionIndex: 0,
        hint: 'Default toString() format is getClass().getName() + \'@\' + Integer.toHexString(hashCode()).',
        solution: 'true',
        explanation: 'The default implementation in `java.lang.Object` returns `getClass().getName() + \'@\' + Integer.toHexString(hashCode())`. Because it contains the "@" delimiter between class name and hash code, `str.contains("@")` prints `true`.'
      },
      {
        title: 'Puzzle 9: Array Object Identity and Superclass Hierarchy',
        problemStatement: 'What boolean values are printed by this program?',
        code: `public class Main {
    public static void main(String[] args) {
        int[] nums = new int[3];
        System.out.print((nums instanceof Object) + " ");
        System.out.print((nums.getClass().getSuperclass() == Object.class) + " ");
        System.out.print(nums.getClass().isArray());
    }
}`,
        options: [
          'true true true',
          'true false true',
          'false false true',
          'true true false'
        ],
        correctOptionIndex: 0,
        hint: 'In Java, arrays are full-fledged objects whose immediate superclass is java.lang.Object.',
        solution: 'true true true',
        explanation: 'Arrays in Java are genuine objects. Their direct superclass is java.lang.Object, so "nums instanceof Object" is true, getSuperclass() == Object.class is true, and isArray() is true. Output: "true true true".'
      },
      {
        title: 'Puzzle 10: Final getClass() Prevention of Overriding',
        problemStatement: 'What does this program print?',
        code: `class CustomEntity {
    // Cannot override getClass() because it is final in Object
}
public class Main {
    public static void main(String[] args) {
        Object entity = new CustomEntity();
        System.out.println(entity.getClass().getSimpleName());
    }
}`,
        options: [
          'CustomEntity',
          'Object',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctOptionIndex: 0,
        hint: 'getClass() is declared final in java.lang.Object; it returns the exact runtime Class of the instance.',
        solution: 'CustomEntity',
        explanation: 'The getClass() method in Object is final and cannot be overridden by any subclass. When invoked on an Object reference pointing to CustomEntity, it returns the runtime Class object for CustomEntity, printing "CustomEntity".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why is java.lang.Object the root of all classes in Java, and what architectural problem does this solve?',
        answer: 'Having a single universal root class (`java.lang.Object`) provides the JVM with a unified type system. Architecturally, it enables universal polymorphism: any object instance—regardless of domain or library origin—can be stored, passed, and manipulated through an `Object` reference. It also guarantees that every entity in the runtime environment possesses a minimal set of baseline behaviors (identity comparison, string formatting, runtime reflection, hash coding, and thread synchronization monitors) without requiring manual boilerplate.',
        followUp: 'What would happen if Java did not have a single root class like C++?',
        followUpAnswer: 'Without a single root class, Java could not have had universal container data structures, generic framework libraries (like serializers or ORMs), or universal garbage collection algorithms prior to generics. C++ struggles with multiple disparate hierarchy roots, requiring complex multi-type templates and void pointers.',
        keyPhrases: [
          'Unified type system',
          'Universal polymorphism',
          'Baseline behavioral contract',
          'Unified memory model'
        ],
        commonMistakeAnswer: 'Saying Object exists only so developers can write System.out.println.'
      },
      {
        question: 'Name at least six methods declared in java.lang.Object and describe their roles.',
        answer: 'The primary methods in `Object` are: 1) `toString()`: Returns a text representation of the object. 2) `equals(Object obj)`: Determines logical equality between two objects (defaults to reference identity `==`). 3) `hashCode()`: Returns an integer hash value for bucket indexing. 4) `getClass()`: Returns the runtime `Class` reflection token (final). 5) `clone()`: Creates a shallow field-by-field copy (protected). 6) `wait()`, `notify()`, `notifyAll()`: Low-level concurrency methods coordinating threads around the object\'s intrinsic monitor lock.',
        followUp: 'Which of these methods are declared final and why?',
        followUpAnswer: '`getClass()`, `wait()`, `notify()`, and `notifyAll()` are declared `final`. `getClass()` is final to prevent objects from disguising their true type. The concurrency methods are final because altering monitor acquisition semantics would break the JVM threading model.',
        keyPhrases: [
          'toString, equals, hashCode',
          'getClass is final',
          'clone is protected',
          'wait/notify monitor coordination'
        ],
        commonMistakeAnswer: 'Listing methods like compareTo() or length() as part of java.lang.Object.'
      },
      {
        question: 'Do Java array types inherit from java.lang.Object? What is their inheritance hierarchy?',
        answer: 'Yes, every Java array type is a full-fledged object that directly extends `java.lang.Object`. For example, `int[]` or `String[]` has `java.lang.Object` as its direct superclass. Furthermore, every array type automatically implements two marker interfaces: `java.lang.Cloneable` and `java.io.Serializable`. Calling `numbers.getClass().getSuperclass()` returns `java.lang.Object.class`.',
        followUp: 'Why does int[].clone() compile without casting, while standard Object.clone() requires casting?',
        followUpAnswer: 'The Java compiler synthesizes a public `clone()` method for all array types whose return type is covariant with the array type itself (e.g., `int[].clone()` returns `int[]`), bypassing the protected access modifier in `Object`.',
        keyPhrases: [
          'Direct subclass of Object',
          'Implements Cloneable and Serializable',
          'Covariant synthesized clone()',
          'First-class JVM objects'
        ],
        commonMistakeAnswer: 'Believing that primitive arrays are not objects because primitives are not objects.'
      },
      {
        question: 'What is the difference between checking types with instanceof versus obj.getClass() == TargetClass.class?',
        answer: '`instanceof` checks if the object is an instance of the target class OR any of its subclasses (it is polymorphic and honors the IS-A hierarchy). In contrast, `obj.getClass() == TargetClass.class` performs an exact, strict identity check: it returns true ONLY if the object was instantiated exactly as `TargetClass`, evaluating to false for any subclass. This distinction is especially vital when implementing the `equals()` method contract.',
        followUp: 'When implementing equals(), which check is preferred?',
        followUpAnswer: 'If subclasses can introduce new state and must maintain symmetry, `getClass() == obj.getClass()` is required. If subclasses only add behavior without state, `instanceof` can be used.',
        keyPhrases: [
          'Polymorphic subtype check (instanceof)',
          'Strict exact type identity (getClass() ==)',
          'Liskov substitution implications',
          'equals symmetry protection'
        ],
        commonMistakeAnswer: 'Assuming instanceof and getClass() == always produce identical results.'
      },
      {
        question: 'Why do interfaces not extend java.lang.Object, and how can interface references invoke Object methods?',
        answer: 'Interfaces cannot extend `java.lang.Object` because in Java, `extends` on an interface can only reference other interfaces, whereas `Object` is a class (allowing an interface to extend a class would blur the fundamental distinction). However, because every concrete object that ever implements an interface is guaranteed to be an instance of a class that extends `Object`, the Java Language Specification (§9.2) mandates that every interface implicitly declares abstract member signatures corresponding to all public methods of `java.lang.Object`.',
        followUp: 'Can an interface declare an abstract method that conflicts with an Object method?',
        followUpAnswer: 'No, an interface cannot declare a method with the same name and parameters but an incompatible return type with an Object method.',
        keyPhrases: [
          'Interfaces only extend interfaces',
          'Implicit member declaration (JLS 9.2)',
          'Guaranteed concrete class backing',
          'No return type conflict permitted'
        ],
        commonMistakeAnswer: 'Thinking interfaces do extend Object because "everything extends Object".'
      },
      {
        question: 'What is the purpose of the finalize() method in Object, and why has it been deprecated and removed?',
        answer: '`finalize()` was originally intended as a destructor hook called by the Garbage Collector before an object\'s memory is reclaimed. However, it was fundamentally flawed: 1) It has no guaranteed execution timing (it may run hours later or never), 2) Finalizers can "resurrect" dead objects, breaking GC invariants, 3) Unhandled exceptions in finalizers are silently ignored, 4) It imposes devastating GC performance overhead. Java 9 deprecated it, Java 18 marked it for removal, and modern Java uses `AutoCloseable` with try-with-resources or `java.lang.ref.Cleaner` instead.',
        followUp: 'What design pattern replaces finalize() for deterministic resource cleanup?',
        followUpAnswer: 'The `AutoCloseable` interface paired with try-with-resources statement guarantees deterministic, immediate resource release.',
        keyPhrases: [
          'Non-deterministic GC timing',
          'Object resurrection hazard',
          'Performance degradation',
          'AutoCloseable replacement'
        ],
        commonMistakeAnswer: 'Recommending finalize() as standard cleanup for files and sockets.'
      },
      {
        question: 'How does Java achieve universal polymorphism for primitive types like int, double, and boolean?',
        answer: 'Java achieves this through wrapper classes (`java.lang.Integer`, `Double`, `Boolean`, etc.) and the automatic compiler feature called "Autoboxing" (introduced in Java 5). When a primitive value is passed where an `Object` is expected, the compiler automatically rewrites the code to wrap the primitive in its corresponding wrapper class (e.g. `Integer.valueOf(val)`). Because all wrapper classes extend `java.lang.Object`, the primitive value participates in universal object polymorphism.',
        followUp: 'What performance pitfall comes with autoboxing in tight loops?',
        followUpAnswer: 'Autoboxing allocates a new wrapper object on the heap for every iteration (unless cached), creating massive memory churn and triggering frequent garbage collection cycles.',
        keyPhrases: [
          'Wrapper classes',
          'Autoboxing (valueOf())',
          'Heap allocation churn',
          'Garbage collector pressure'
        ],
        commonMistakeAnswer: 'Believing primitive ints are converted directly to pointers on the stack.'
      },
      {
        question: 'What is the default implementation of hashCode() in java.lang.Object?',
        answer: 'The default implementation in `Object.hashCode()` is a native method that typically derives an integer from the object\'s internal memory address or an internal pseudo-random number generator maintained in the object\'s JVM header (the mark word). It is often referred to as the "identity hash code" (`System.identityHashCode(obj)`). It guarantees that two distinct objects in memory will generally have different hash codes, though uniqueness across the entire heap is not mathematically guaranteed.',
        followUp: 'Can System.identityHashCode(obj) change over the lifetime of an object as the GC moves it?',
        followUpAnswer: 'No! Once computed, the identity hash code is written into the object\'s header mark word so it remains invariant even if a compacting GC relocates the object in memory.',
        keyPhrases: [
          'Identity hash code',
          'Object header mark word',
          'Invariant once computed',
          'System.identityHashCode()'
        ],
        commonMistakeAnswer: 'Claiming hashCode() is always the direct physical 64-bit RAM pointer address.'
      },
      {
        question: 'Why are wait(), notify(), and notifyAll() defined in java.lang.Object rather than in java.lang.Thread?',
        answer: 'Because in Java, every single object has an intrinsic lock (monitor) associated with its memory structure, not just threads. A thread does not wait on another thread; a thread waits ON A SHARED RESOURCE (an object). For example, a consumer thread waits on a `Buffer` object until a producer thread adds data and notifies that `Buffer` object. Defining these methods on `Object` allows any object to serve as a synchronization lock and condition queue.',
        followUp: 'What exception is thrown if you call wait() without owning the object\'s monitor lock?',
        followUpAnswer: '`IllegalMonitorStateException` is thrown at runtime if the calling thread does not hold the lock inside a `synchronized` block.',
        keyPhrases: [
          'Intrinsic lock / Monitor',
          'Condition queue on shared resource',
          'Synchronized block requirement',
          'IllegalMonitorStateException'
        ],
        commonMistakeAnswer: 'Saying wait() is in Object because threads are objects.'
      },
      {
        question: 'What is the difference between Object reference upcasting and downcasting in Java?',
        answer: 'Upcasting is converting a specific subclass reference to an `Object` reference (e.g., `Object o = new String("hi");`). Upcasting is always safe and handled automatically by the compiler without explicit syntax. Downcasting is converting an `Object` reference back to a specific subclass reference (e.g., `String s = (String) o;`). Downcasting requires an explicit cast operator, and the JVM performs a runtime type check: if the actual heap object is not assignable to the target type, it immediately throws a `ClassCastException`.',
        followUp: 'How can you make downcasting completely safe against runtime crashes?',
        followUpAnswer: 'By always preceding the downcast with an `instanceof` check (or pattern matching instanceof in modern Java).',
        keyPhrases: [
          'Implicit safe upcasting',
          'Explicit runtime-checked downcasting',
          'ClassCastException',
          'instanceof safeguard'
        ],
        commonMistakeAnswer: 'Thinking downcasting transforms the object in memory into a new type.'
      },
      {
        question: 'Can you instantiate the java.lang.Object class directly with "new Object()"? When would you do so?',
        answer: 'Yes, `new Object()` is completely valid and legal syntax because `java.lang.Object` is a concrete class. In production code, developers frequently instantiate bare `new Object()` instances to serve as dedicated private lock objects in multithreaded programming (e.g., `private final Object lock = new Object();`). This provides a pure, lightweight object whose monitor lock cannot be interfered with by external callers.',
        followUp: 'Why is a private final Object lock preferred over synchronizing on "this"?',
        followUpAnswer: 'Synchronizing on `this` exposes the class\'s internal locking mechanism to external callers, allowing malicious or poorly written client code to acquire the lock and cause deadlocks.',
        keyPhrases: [
          'Direct instantiation valid',
          'Dedicated private lock monitor',
          'Deadlock prevention',
          'Lightweight memory footprint'
        ],
        commonMistakeAnswer: 'Assuming Object is abstract and cannot be instantiated with new.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which class in Java has no superclass?',
        options: [
          'java.lang.Class',
          'java.lang.Object',
          'java.lang.String',
          'java.lang.System'
        ],
        correctIndex: 1,
        explanation: 'java.lang.Object is the absolute root of the Java class hierarchy and is the only class with no superclass.'
      },
      {
        question: 'What does the default implementation of equals(Object obj) in java.lang.Object do?',
        options: [
          'Compares the string representation of both objects.',
          'Compares the values of all fields.',
          'Compares memory addresses (reference identity: this == obj).',
          'Compares their hash codes.'
        ],
        correctIndex: 2,
        explanation: 'The default implementation of equals in Object simply evaluates `this == obj`, testing reference identity.'
      },
      {
        question: 'Which of the following methods in java.lang.Object is declared FINAL and cannot be overridden?',
        options: [
          'toString()',
          'equals(Object)',
          'hashCode()',
          'getClass()'
        ],
        correctIndex: 3,
        explanation: '`getClass()` is declared `public final Class<?> getClass()` to ensure that an object\'s runtime class identity cannot be faked.'
      },
      {
        question: 'What is the direct superclass of the array type `int[]` in Java?',
        options: [
          'java.lang.Number',
          'java.lang.Array',
          'java.lang.Object',
          'int[] has no superclass'
        ],
        correctIndex: 2,
        explanation: 'All array types in Java directly inherit from java.lang.Object.'
      },
      {
        question: 'What happens when you execute: `Object x = 42;`?',
        options: [
          'Compile-time error: primitive cannot be assigned to Object.',
          'The compiler autoboxes 42 into an Integer object, which extends Object.',
          'The JVM creates a raw int pointer.',
          'Runtime ClassCastException.'
        ],
        correctIndex: 1,
        explanation: 'The compiler uses autoboxing (`Integer.valueOf(42)`), creating an Integer instance that can be held by an Object reference.'
      },
      {
        question: 'Do interfaces in Java inherit from java.lang.Object?',
        options: [
          'Yes, all interfaces extend Object.',
          'No, interfaces only extend other interfaces, but implicitly declare Object\'s public methods.',
          'Yes, but only marker interfaces.',
          'No, interface references cannot call toString() or equals().'
        ],
        correctIndex: 1,
        explanation: 'Interfaces do not extend Object, but the Java Language Specification mandates that they implicitly declare signatures matching Object\'s public methods.'
      },
      {
        question: 'Why are wait(), notify(), and notifyAll() defined in java.lang.Object rather than java.lang.Thread?',
        options: [
          'Because all threads are objects.',
          'Because every object in Java has an intrinsic monitor lock that threads wait on.',
          'Because of a historical bug in Java 1.0.',
          'Because Thread does not extend Object.'
        ],
        correctIndex: 1,
        explanation: 'Every Java object possesses an intrinsic monitor lock. Threads synchronize and wait on shared objects (locks), not on threads.'
      },
      {
        question: 'What does `System.identityHashCode(obj)` return?',
        options: [
          'The overridden hashCode() of the object.',
          'The default hashCode based on identity, regardless of whether the class overrides hashCode().',
          'The object\'s memory address as a hexadecimal string.',
          'The thread ID of the object.'
        ],
        correctIndex: 1,
        explanation: 'System.identityHashCode(obj) returns the default identity hash code computed by Object, bypassing any subclass overrides.'
      },
      {
        question: 'What is the format of the default string returned by `Object.toString()`?',
        options: [
          'ClassName:fieldName=value',
          'ClassName@hexadecimalHashCode',
          'hexadecimalHashCode::ClassName',
          '{ClassName}'
        ],
        correctIndex: 1,
        explanation: 'The default implementation returns `getClass().getName() + \'@\' + Integer.toHexString(hashCode())`.'
      },
      {
        question: 'What happens at runtime if you downcast an Object reference to an incompatible type like `(String) new Device()`?',
        options: [
          'The reference becomes null.',
          'A ClassCastException is thrown.',
          'The compiler prevents execution.',
          'The JVM silently truncates the object.'
        ],
        correctIndex: 1,
        explanation: 'An invalid downcast fails the JVM runtime type check and throws a java.lang.ClassCastException.'
      }
    ]
  },

  'tostring-method-override': {
    id: 'tostring-method-override',
    moduleId: 'java-object-class',
    moduleTitle: '14. Object Class & Contract',
    lessonNumber: 'Lesson 14.2',
    title: 'The toString() Method & String Representation',
    subtitle: 'Deconstructing the default ClassName@hexHashCode format, string concatenation mechanics, logging readability, and builder patterns',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Imagine traveling through an international airport with an unlabelled black suitcase. The airline luggage handler attaches a default barcoded adhesive tag: `LuggageBag@3f99bd1a`. While the automated scanner understands the hex tracking code, you and the airport staff cannot tell what is inside or who owns it by reading that tag. Overriding `toString()` is like replacing that cryptic luggage barcode with a clear, readable leather nameplate: `[LuggageBag: Brand="Samsonite", Owner="Amara Vance", Destination="HND Tokyo", Weight=18.5kg]`. Whenever someone inspects the bag (printing it to console or logs), they immediately understand its state.',
    coreExplanation: [
      'The `toString()` method is declared in `java.lang.Object` as `public String toString()`. Its design contract is to return a concise, informative, human-readable textual representation of the object.',
      'The default implementation in `Object` produces: `getClass().getName() + \'@\' + Integer.toHexString(hashCode())`. For a class `User`, this outputs something like `User@45ee12a7`, which provides zero insight into the object\'s actual field values.',
      'Automatic Invocation: When an object is passed to `System.out.println(obj)`, `System.out.print(obj)`, or used with the string concatenation operator (`"User: " + obj`), the Java compiler and runtime automatically invoke `String.valueOf(obj)`, which in turn calls `obj.toString()`.',
      'Null Safety: `String.valueOf(obj)` safely handles `null`. If `obj == null`, it returns the literal string `"null"` rather than throwing a `NullPointerException`. However, directly calling `obj.toString()` on a null reference throws `NullPointerException`.',
      'Array toString() Trap: Calling `.toString()` on any Java array (`arr.toString()`) does NOT print the elements! Because arrays inherit `Object.toString()` directly and do not override it, it prints cryptic type codes like `[I@5e2de80c` for `int[]` or `[Ljava.lang.String;@...`. You must use `java.util.Arrays.toString(arr)` to inspect array elements.',
      'Defensive Logging & Security: An overridden `toString()` should never expose sensitive credentials, such as plain-text passwords, encryption private keys, or credit card numbers. Redact sensitive fields (e.g. `password="[PROTECTED]"`).',
      'Circular Dependency Danger: In bidirectional object graphs (e.g., `Author` references `Book`, and `Book` references `Author`), naively having each class\'s `toString()` call the other causes an infinite mutual recursion loop, crashing the JVM with a `StackOverflowError`.',
      'Effective Java Item 12: Always override `toString()` in all value-based classes to make debugging, diagnostic logging, and unit test failure messages immediately readable.'
    ],
    diagram: `===================== TOSTRING() DISPATCH & STRING CONCATENATION =====================

  Call Site:
  System.out.println(user);   OR   String s = "Result: " + user;
               │
               ▼
      String.valueOf(user)
               │
       ┌───────┴───────┐
       │ Is user null? │
       └───────┬───────┘
          YES  │  NO
      ┌────────┘  └────────┐
      ▼                    ▼
  "null"              user.toString()
                           │
             ┌─────────────┴─────────────┐
             │ Overridden in User class? │
             └─────────────┬─────────────┘
                NO         │        YES
        ┌──────────────────┘        └──────────────────┐
        ▼                                              ▼
  Object.toString()                             User.toString()
  "User@5e2de80c"                               "User[id=101, name='Amara']"
  (Cryptic default)                             (Clear diagnostic information)`,
    codeSnippet: {
      title: 'Overriding toString() for Readable Diagnostic Output',
      code: `class Account {
    private String accountNumber;
    private double balance;
    private String pinHash;

    public Account(String accountNumber, double balance, String pinHash) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.pinHash = pinHash;
    }

    @Override
    public String toString() {
        // Clear, readable formatting; sensitive fields are masked
        return "Account{" +
                "accountNumber='" + accountNumber + '\\'' +
                ", balance=$" + String.format("%.2f", balance) +
                ", pinHash='[PROTECTED]'" +
                '}';
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account("ACT-9901", 1250.75, "e3b0c44298fc1c14");

        // 1. Automatic invocation via println
        System.out.println(acc);

        // 2. Automatic invocation via string concatenation
        String summary = "Active Customer -> " + acc;
        System.out.println(summary);

        // 3. Null handling via String.valueOf()
        Account nullAcc = null;
        System.out.println("Null account prints: " + nullAcc);
    }
}`,
      lineByLineExplanation: [
        {
          line: '@Override public String toString()',
          explanation: 'Overrides the standard public String toString() signature from java.lang.Object.'
        },
        {
          line: 'return "Account{" + ... + "pinHash=\'[PROTECTED]\'"}";',
          explanation: 'Constructs an informative string representation while deliberately masking sensitive fields like pinHash.'
        },
        {
          line: 'System.out.println(acc);',
          explanation: 'println() automatically routes through String.valueOf(acc), which invokes our overridden toString().'
        },
        {
          line: 'String summary = "Active Customer -> " + acc;',
          explanation: 'The string concatenation operator (+) automatically triggers toString() evaluation on acc.'
        },
        {
          line: 'System.out.println("Null account prints: " + nullAcc);',
          explanation: 'String concatenation safely converts a null reference to the four-character string "null" without throwing NullPointerException.'
        }
      ],
      output: `Account{accountNumber='ACT-9901', balance=$1250.75, pinHash='[PROTECTED]'}
Active Customer -> Account{accountNumber='ACT-9901', balance=$1250.75, pinHash='[PROTECTED]'}
Null account prints: null`
    },
    codeExamples: [
      {
        title: 'Composite Object toString() Formatting',
        description: 'Demonstrates hierarchical toString() composition where an enclosing object delegates to child object toString() representations.',
        code: `class Address {
    private String city;
    private String country;

    public Address(String city, String country) {
        this.city = city;
        this.country = country;
    }

    @Override
    public String toString() {
        return city + ", " + country;
    }
}

class Customer {
    private int id;
    private String name;
    private Address address; // Child object

    public Customer(int id, String name, Address address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    @Override
    public String toString() {
        return "Customer[id=" + id + ", name='" + name + "', address=(" + address + ")]";
    }
}

public class CompositeToStringDemo {
    public static void main(String[] args) {
        Address addr = new Address("Berlin", "Germany");
        Customer cust = new Customer(101, "Klara Weber", addr);

        System.out.println(cust);
    }
}`,
        output: `Customer[id=101, name='Klara Weber', address=(Berlin, Germany)]`
      },
      {
        title: 'The Array toString() Trap and Manual Array String Formatting',
        description: 'Contrasts the useless default array toString() with custom array formatting without using java.util collections.',
        code: `public class ArrayTrapDemo {
    public static String formatIntArray(int[] arr) {
        if (arr == null) return "null";
        if (arr.length == 0) return "[]";
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }

    public static void main(String[] args) {
        int[] scores = new int[]{95, 88, 72, 100};

        // TRAP: Default array toString() prints cryptic type header
        System.out.println("Default array toString(): " + scores.toString());

        // FIX: Explicitly formatted array representation
        System.out.println("Properly formatted array: " + formatIntArray(scores));
    }
}`,
        output: `Default array toString(): [I@...
Properly formatted array: [95, 88, 72, 100]`
      }
    ],
    cheatSheet: {
      summary: 'Override toString() in every class to provide clear, diagnostic representations. String concatenation and println automatically invoke it via String.valueOf().',
      syntaxTemplate: `public class DomainEntity {
    private int id;
    private String name;

    @Override
    public String toString() {
        return getClass().getSimpleName() + "{" +
               "id=" + id +
               ", name='" + name + '\\'' +
               '}';
    }
}`,
      rules: [
        {
          rule: 'Signature Contract',
          explanation: 'The signature must be strictly "public String toString()". Omitting public or adding parameters overloads rather than overrides.'
        },
        {
          rule: 'Never Return Null',
          explanation: 'toString() should never return null; return an empty string or informative representation instead.'
        },
        {
          rule: 'Mask Sensitive Data',
          explanation: 'Never include unencrypted passwords, API tokens, or credit card numbers in toString() output.'
        },
        {
          rule: 'Avoid Mutual Recursion',
          explanation: 'In bidirectional relationships (Parent <-> Child), break the cycle by printing only child IDs, not full child toString().'
        },
        {
          rule: 'Arrays Do Not Override toString()',
          explanation: 'Calling arr.toString() produces [I@hex. Format manually or use java.util.Arrays.toString().'
        },
        {
          rule: 'String Concatenation Hook',
          explanation: 'The + operator calls String.valueOf(obj), safely returning "null" for null references and calling toString() otherwise.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Default Object.toString()',
          optionA: 'Output: Cryptic ClassName@hexHashCode',
          optionB: 'Utility: Low diagnostic value; reveals memory hash only'
        },
        {
          aspect: 'Overridden toString()',
          optionA: 'Output: Structured, readable field contents',
          optionB: 'Utility: High diagnostic value for logs, debuggers, and test asserts'
        },
        {
          aspect: 'Invocation on null: obj.toString()',
          optionA: 'Result: Throws NullPointerException immediately',
          optionB: 'Safe alternative: String.valueOf(obj) returns "null"'
        },
        {
          aspect: 'Array Handling: arr.toString()',
          optionA: 'Native arr.toString(): Prints cryptic type identifier (e.g. [I@15db9742)',
          optionB: 'Formatted printing: Iterates and prints individual element values'
        },
        {
          aspect: 'Performance Impact',
          optionA: 'String Concatenation (+): Fast for single lines',
          optionB: 'StringBuilder: Recommended when building complex multiline representations'
        },
        {
          aspect: 'Bytecode Dispatch',
          optionA: 'invokevirtual: toString() resolves dynamically through the receiver\'s vtable',
          optionB: 'String concatenation: transformed into invokedynamic (Java 9+) or StringBuilder'
        },
        {
          aspect: 'Time & Space Complexity',
          optionA: 'Time: O(n) where n is total characters in formatted string representation',
          optionB: 'Space: O(n) heap allocation for the newly instantiated immutable String'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Printing an array directly expecting to see its elements: `System.out.println(myArray);`.',
        whyItHappens: 'Assuming arrays override `toString()` like other objects.',
        howToFix: 'Arrays do not override `toString()`. They print `[I@...`. Loop through the elements manually or use `java.util.Arrays.toString(myArray)`.'
      },
      {
        mistake: 'Causing a StackOverflowError by printing mutually referencing objects.',
        whyItHappens: 'Department prints Employees, and each Employee prints Department in its `toString()`.',
        howToFix: 'Break the bidirectional loop. In `Employee`, print `department.getName()` or `department.getId()` instead of the entire `department` object.'
      },
      {
        mistake: 'Declaring toString() without the public modifier or with parameters.',
        whyItHappens: 'Writing `String toString() { ... }` or `public String toString(boolean verbose)`.',
        howToFix: 'An override must match `public String toString()` with zero arguments. Always annotate with `@Override` so the compiler catches mistakes.'
      },
      {
        mistake: 'Calling `obj.toString()` when `obj` might be null.',
        whyItHappens: 'Expecting `toString()` to handle null references gracefully.',
        howToFix: 'Invoking any method on a null reference throws `NullPointerException`. Use `String.valueOf(obj)` or string concatenation `"" + obj` for safe null handling.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: String Concatenation and Null Coercion',
        problemStatement: 'What does this program print?',
        code: `class Item {
    @Override
    public String toString() {
        return "ItemObject";
    }
}

public class Main {
    public static void main(String[] args) {
        Item item = null;
        System.out.print("Val: " + item + " ");
        // System.out.print(item.toString()); // Line 12
    }
}`,
        options: [
          'Val: null ',
          'NullPointerException',
          'Val: ItemObject ',
          'Line 12 would throw NullPointerException if uncommented; as written prints "Val: null "'
        ],
        correctOptionIndex: 3,
        hint: 'How does string concatenation handle null compared to direct method invocation?',
        solution: 'Line 12 would throw NullPointerException if uncommented; as written prints "Val: null "',
        explanation: 'String concatenation `"Val: " + item` calls `String.valueOf(item)`, which safely produces the string "null". If Line 12 were uncommented, calling `.toString()` on a null reference would throw `NullPointerException`. Option D is the accurate description.'
      },
      {
        title: 'Puzzle 2: Circular Dependency StackOverflow Trap',
        problemStatement: 'What happens when running this code?',
        code: `class NodeA {
    NodeB b;
    @Override
    public String toString() {
        return "A[" + b + "]";
    }
}

class NodeB {
    NodeA a;
    @Override
    public String toString() {
        return "B[" + a + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        NodeA a = new NodeA();
        NodeB b = new NodeB();
        a.b = b;
        b.a = a;
        System.out.println(a);
    }
}`,
        options: [
          'A[B[null]]',
          'A[B[A[B[...]]]]',
          'Runtime StackOverflowError',
          'Prints: NodeA@...'
        ],
        correctOptionIndex: 2,
        hint: 'a.toString() calls b.toString(), which calls a.toString(), ad infinitum.',
        solution: 'Runtime StackOverflowError',
        explanation: '`a.toString()` invokes `b.toString()`, which in turn calls `a.toString()`. This mutual recursion pushes frames onto the JVM call stack until the stack memory is exhausted, throwing a runtime `StackOverflowError`.'
      },
      {
        title: 'Puzzle 3: Method Overloading vs Overriding Trap',
        problemStatement: 'What does this program print?',
        code: `class Report {
    // Note the parameter!
    public String toString(String prefix) {
        return prefix + ": ReportData";
    }
}

public class Main {
    public static void main(String[] args) {
        Report r = new Report();
        System.out.print(r.toString().contains("@"));
    }
}`,
        options: [
          'true',
          'false',
          'Compilation Error: toString(String) cannot be called with zero args',
          'NullPointerException'
        ],
        correctOptionIndex: 0,
        hint: 'Did Report override Object.toString() or overload it?',
        solution: 'true',
        explanation: '`Report` defined `toString(String prefix)`, which is an OVERLOAD, not an override. `Report` still inherits the default `Object.toString()` with zero parameters. Calling `r.toString()` executes `Object.toString()`, which returns `Report@hex` containing "@". Output: "true".'
      },
      {
        title: 'Puzzle 4: Primitive Array toString() Output Format',
        problemStatement: 'What is printed by the following code?',
        code: `public class Main {
    public static void main(String[] args) {
        char[] letters = new char[]{'J', 'a', 'v', 'a'};
        System.out.print(letters.toString().startsWith("[C"));
    }
}`,
        options: [
          'true',
          'false',
          'Prints: Java',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'What is the internal JVM type descriptor for a char array?',
        solution: 'true',
        explanation: '`letters.toString()` executes `Object.toString()`. The JVM type name for `char[]` is `[C`. Therefore, `letters.toString()` starts with `[C@...`, making `letters.toString().startsWith("[C")` return `true`.'
      },
      {
        title: 'Puzzle 5: Subclass Calling super.toString()',
        problemStatement: 'What does this program print?',
        code: `class Base {
    @Override
    public String toString() {
        return "BASE";
    }
}

class Derived extends Base {
    @Override
    public String toString() {
        return super.toString() + "->DERIVED";
    }
}

public class Main {
    public static void main(String[] args) {
        Base b = new Derived();
        System.out.println(b);
    }
}`,
        options: [
          'BASE->DERIVED',
          'DERIVED',
          'BASE',
          'Derived@...'
        ],
        correctOptionIndex: 0,
        hint: 'b is a polymorphic reference to a Derived object.',
        solution: 'BASE->DERIVED',
        explanation: '`Derived.toString()` calls `super.toString()`, which returns "BASE", and concatenates "->DERIVED". Even through a `Base` reference, dynamic dispatch invokes `Derived.toString()`. Output: "BASE->DERIVED".'
      },
      {
        title: 'Puzzle 6: Visibility Narrowing Error on toString()',
        problemStatement: 'What happens when compiling this code?',
        code: `class Secret {
    @Override
    protected String toString() {
        return "TopSecret";
    }
}`,
        options: [
          'Compiles successfully',
          'Compile-time error: attempting to assign weaker access privileges; was public',
          'Runtime SecurityException',
          'Compiles if Secret is package-private'
        ],
        correctOptionIndex: 1,
        hint: 'What is the access modifier of toString() in java.lang.Object?',
        solution: 'Compile-time error: attempting to assign weaker access privileges; was public',
        explanation: 'In `java.lang.Object`, `public String toString()` is declared `public`. An overriding method cannot reduce visibility (protected is weaker than public). The compiler rejects it.'
      },
      {
        title: 'Puzzle 7: StringBuilder vs String Concatenation in Loop',
        problemStatement: 'What is printed by this program?',
        code: `class NumberList {
    private int[] data = {1, 2, 3};

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("<");
        for (int i = 0; i < data.length; i++) {
            sb.append(data[i]);
            if (i < data.length - 1) sb.append("-");
        }
        sb.append(">");
        return sb.toString();
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new NumberList());
    }
}`,
        options: [
          '<1-2-3>',
          '<1-2-3->',
          '1-2-3',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'The loop appends hyphens only when i < data.length - 1.',
        solution: '<1-2-3>',
        explanation: 'The loop appends 1, then "-", then 2, then "-", then 3. Because `i < data.length - 1` is false for index 2, no trailing hyphen is added. Wrapping with "<" and ">" yields "<1-2-3>".'
      },
      {
        title: 'Puzzle 8: Returning null from toString()',
        problemStatement: 'What does this program print?',
        code: `class WeirdObject {
    @Override
    public String toString() {
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        WeirdObject obj = new WeirdObject();
        System.out.print("Result: " + obj);
    }
}`,
        options: [
          'Result: null',
          'NullPointerException',
          'Result: ',
          'Compilation Error: toString() cannot return null'
        ],
        correctOptionIndex: 0,
        hint: 'How does String.valueOf(obj) handle when obj.toString() itself returns null?',
        solution: 'Result: null',
        explanation: '`String.valueOf(obj)` calls `obj.toString()`. If `obj.toString()` returns null, the string concatenation routine replaces the null with the string "null". Output: "Result: null".'
      },
      {
        title: 'Puzzle 9: Mutual Recursion in Circular toString()',
        problemStatement: 'What exception is thrown when two objects reference each other in toString()?',
        code: `class Node {
    int id;
    Node partner;
    Node(int id) { this.id = id; }
    @Override
    public String toString() {
        return "Node(" + id + ", " + partner + ")";
    }
}
public class Main {
    public static void main(String[] args) {
        Node a = new Node(1);
        Node b = new Node(2);
        a.partner = b;
        b.partner = a;
        try {
            System.out.println(a);
        } catch (StackOverflowError e) {
            System.out.println("StackOverflow");
        }
    }
}`,
        options: [
          'StackOverflow',
          'Node(1, Node(2, null))',
          'NullPointerException',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'Mutual circular calls in toString() repeatedly push frames onto the JVM call stack until memory is exhausted.',
        solution: 'StackOverflow',
        explanation: 'a.toString() calls b.toString(), which calls a.toString(), leading to infinite mutual recursion that exhausts JVM thread stack space and throws java.lang.StackOverflowError.'
      },
      {
        title: 'Puzzle 10: Array toString() Element Representation Trap',
        problemStatement: 'What boolean values are printed by this array string evaluation?',
        code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20};
        String s = "" + nums;
        boolean has10 = s.contains("10");
        boolean hasPrefix = s.startsWith("[I@");
        System.out.println(has10 + " " + hasPrefix);
    }
}`,
        options: [
          'false true',
          'true false',
          'true true',
          'false false'
        ],
        correctOptionIndex: 0,
        hint: 'Arrays do not override toString(); they print type descriptors and hash codes, not array elements.',
        solution: 'false true',
        explanation: 'Java arrays inherit Object.toString() unchanged, producing "[I@" followed by hex hash code. It does not print the array elements, so has10 is false and hasPrefix is true. Output: "false true".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why should you always override toString() in Java classes according to Effective Java?',
        answer: 'Joshua Bloch emphasizes in Effective Java (Item 12) that providing a clean, informative `toString()` implementation makes classes much more pleasant to use and drastically eases debugging, logging, and diagnostics. When an object is logged in production logs, printed to console, or inspected in a debugger, an overridden `toString()` instantly displays the internal state of interest rather than a cryptic memory hash code like `Order@45ee12a7`.',
        followUp: 'What format should a good toString() follow?',
        followUpAnswer: 'A good `toString()` should return all of the interesting information contained in the object in an unambiguous, self-describing format (e.g. `ClassName{field1=val1, field2=val2}`).',
        keyPhrases: [
          'Effective Java Item 12',
          'Ease of debugging and logging',
          'Diagnostic transparency',
          'Self-describing format'
        ],
        commonMistakeAnswer: 'Saying toString() is only used when converting objects to JSON for REST APIs.'
      },
      {
        question: 'How does the String concatenation operator (+) interact with toString() in Java?',
        answer: 'When the binary `+` operator is used where at least one operand is a `String`, the Java compiler automatically converts the expression using `String.valueOf(operand)`. Internally, `String.valueOf(obj)` checks if the reference is `null`. If `null`, it returns the string `"null"`. If non-null, it calls `obj.toString()`. In modern Java (Java 9+), this bytecode is compiled using invokedynamic (`makeConcatWithConstants`) rather than manually chained `StringBuilder` calls.',
        followUp: 'What happens if you directly write obj.toString() when obj is null?',
        followUpAnswer: 'Directly calling `obj.toString()` throws a `NullPointerException` because you are dereferencing a null pointer.',
        keyPhrases: [
          'String.valueOf() delegation',
          'Null-safe concatenation ("null")',
          'invokedynamic makeConcatWithConstants',
          'NullPointerException on direct call'
        ],
        commonMistakeAnswer: 'Believing that obj.toString() is called directly without a null check during concatenation.'
      },
      {
        question: 'Why does calling .toString() on an array produce output like "[I@5e2de80c" instead of printing the array contents?',
        answer: 'In Java, arrays are full objects that inherit directly from `java.lang.Object`. However, the designers of Java chose NOT to override `toString()` in array types. Therefore, calling `arr.toString()` invokes the default implementation from `java.lang.Object`, which prints `getClass().getName() + \'@\' + Integer.toHexString(hashCode())`. For `int[]`, the internal JVM class descriptor is `[I`, resulting in `[I@...`. To print array contents, one must iterate through the elements or use `java.util.Arrays.toString(arr)`.',
        followUp: 'What does [[Ljava.lang.String; mean when printed by an array\'s default toString()?',
        followUpAnswer: 'It represents a two-dimensional array of Strings (`String[][]`): `[[` indicates a 2D array, and `Ljava.lang.String;` is the JVM descriptor for the String class.',
        keyPhrases: [
          'Array inherits Object.toString() directly',
          'JVM internal class descriptor ([I)',
          'Arrays.toString() utility requirement',
          'Two-dimensional array descriptor ([[)'
        ],
        commonMistakeAnswer: 'Thinking arrays are primitives and do not have methods.'
      },
      {
        question: 'What security considerations must you keep in mind when implementing toString() in production systems?',
        answer: '`toString()` is frequently invoked automatically by logging frameworks (like SLF4J, Log4j) and APM monitoring tools during exception handling and debugging. If a class stores sensitive Personally Identifiable Information (PII) or credentials—such as plain-text passwords, encryption keys, credit card numbers, or social security numbers—printing those fields in `toString()` causes them to be written in plain text to log files, centralized logging aggregators (Elasticsearch/Splunk), and crash dumps. Sensitive fields must always be masked or excluded (e.g. `password="[PROTECTED]"`).',
        followUp: 'How can you enforce that developers do not accidentally log sensitive fields?',
        followUpAnswer: 'By using static analysis tools, custom annotations (like @ToString.Exclude), or dedicated masking utilities during toString formatting.',
        keyPhrases: [
          'PII and credential exposure',
          'Log aggregator leakage',
          'Plain-text security risk',
          'Defensive masking ([PROTECTED])'
        ],
        commonMistakeAnswer: 'Assuming logs are always private and secure so masking is unnecessary.'
      },
      {
        question: 'What is the circular dependency trap in toString(), and how do you prevent it?',
        answer: 'The circular dependency trap occurs in bidirectional object relationships—such as an `Order` containing a reference to a `Customer`, and that `Customer` containing a list of `Orders`. If `Order.toString()` prints `customer`, and `Customer.toString()` prints `orders`, calling `toString()` on either object initiates an infinite mutual recursive loop. Because each method call pushes a new stack frame, the call stack rapidly exhausts thread memory and crashes with a `java.lang.StackOverflowError`. To prevent this, break the loop: have the child entity print only the parent\'s identifier (e.g. `customerId`), not the entire parent object.',
        followUp: 'Does this also apply to equals() and hashCode()?',
        followUpAnswer: 'Yes! Circular references in equals() or hashCode() will cause the exact same StackOverflowError.',
        keyPhrases: [
          'Bidirectional object graph',
          'Infinite mutual recursion',
          'StackOverflowError',
          'Identifier-only printing'
        ],
        commonMistakeAnswer: 'Thinking the JVM detects circular references in toString() and stops printing.'
      },
      {
        question: 'Can you specify a contract in an interface that forces implementing classes to override toString()?',
        answer: 'Technically, declaring `String toString();` in an interface compiles, but it DOES NOT force implementing classes to provide an override. Because every class in Java already inherits a concrete `public String toString()` implementation from `java.lang.Object`, the compiler considers the contract already satisfied by `Object`! To genuinely force subclasses to implement a custom string representation, you must define an abstract method with a DIFFERENT name in an abstract class or interface (e.g., `String toDisplayString();`).',
        followUp: 'Can an interface define a default method for toString()?',
        followUpAnswer: 'No! The Java compiler explicitly forbids default methods for any method of java.lang.Object.',
        keyPhrases: [
          'Satisfied by java.lang.Object',
          'Cannot force override via interface',
          'Alternative method naming pattern',
          'Forbidden default Object methods'
        ],
        commonMistakeAnswer: 'Believing that writing String toString(); in an interface forces classes to implement it.'
      },
      {
        question: 'Should the output of toString() be parsed programmatically to extract field values?',
        answer: 'No! Programmatically parsing `toString()` is a severe anti-pattern. `toString()` is intended strictly for human consumption (debugging, diagnostic logs, monitoring). The exact format of `toString()` is subject to change across software versions without warning. If client code needs access to individual fields, the class should provide dedicated public accessor methods (getters) or a structured serialization mechanism (like JSON/XML/Protobuf), not force callers to parse a debug string.',
        followUp: 'What exception exists to this rule in the standard Java library?',
        followUpAnswer: 'Value classes like `BigInteger`, `BigDecimal`, and primitive wrappers have standardized, specification-guaranteed string formats (e.g. `Integer.toString()`).',
        keyPhrases: [
          'Human consumption vs machine parsing',
          'Anti-pattern: string scraping',
          'Subject to format changes',
          'Provide dedicated getters'
        ],
        commonMistakeAnswer: 'Recommending regex parsing of toString() to extract object data.'
      },
      {
        question: 'What access modifier must be used when overriding toString()?',
        answer: 'It must be declared `public`. In `java.lang.Object`, `public String toString()` has public visibility. Java\'s method overriding rules strictly prohibit assigning weaker access privileges to an overriding method. Attempting to declare `toString()` as `protected`, package-private, or `private` causes an immediate compile-time error: "attempting to assign weaker access privileges; was public".',
        followUp: 'Can toString() be declared static or final in a class?',
        followUpAnswer: 'It cannot be `static` (static methods cannot override instance methods). It CAN be declared `final` if you want to prevent further subclasses from changing the string representation.',
        keyPhrases: [
          'Must be public',
          'No weaker access privileges',
          'Cannot be static',
          'Can be final to lock representation'
        ],
        commonMistakeAnswer: 'Thinking you can make toString() package-private for internal logging only.'
      },
      {
        question: 'What is the performance implication of complex string concatenation inside toString() called in high-throughput loops?',
        answer: 'If `toString()` creates many intermediate strings, formats complex dates, or runs in high-throughput loops (like inside logging statements that are evaluated even when log levels are disabled), it can cause substantial heap memory allocation and garbage collection pressure. To mitigate this, use `StringBuilder` for multi-field construction, avoid invoking `toString()` unnecessarily when logging is disabled (using parameterized logging like `logger.debug("Data: {}", obj)`), and keep `toString()` lightweight.',
        followUp: 'How does parameterized logging in SLF4J avoid calling toString() when disabled?',
        followUpAnswer: 'Parameterized logging checks if the logging level is enabled BEFORE invoking `String.valueOf(obj)`, completely skipping `toString()` execution if the level is disabled.',
        keyPhrases: [
          'Heap churn / GC pressure',
          'StringBuilder optimization',
          'Parameterized logging (SLF4J)',
          'Avoid premature toString() evaluation'
        ],
        commonMistakeAnswer: 'Believing toString() is always free because strings are optimized by the JVM.'
      },
      {
        question: 'Can toString() throw exceptions? Is it good practice?',
        answer: 'Technically, `toString()` can throw unchecked runtime exceptions (like `NullPointerException` or `IllegalStateException`), but it is considered an extreme anti-pattern. `toString()` is called during debugger evaluation, logging, and exception handling routines. If `toString()` throws an exception while an error is already being handled or logged, it masks the original failure and can crash the logging subsystem. `toString()` must be written defensively to guarantee it never throws an exception.',
        followUp: 'How can you protect toString() if a field might be uninitialized or null?',
        followUpAnswer: 'Check for null fields explicitly or use string concatenation (`"" + field`) which safely handles null values.',
        keyPhrases: [
          'Extreme anti-pattern',
          'Debugger crash risk',
          'Masking original exceptions',
          'Defensive programming guarantee'
        ],
        commonMistakeAnswer: 'Thinking it is good practice to throw exceptions from toString() if fields are missing.'
      },
      {
        question: 'What role does StringBuilder play inside an overridden toString() method?',
        answer: 'When constructing a complex string representation involving multiple fields, loops, or conditional formatting, `StringBuilder` provides a mutable character buffer. Instead of creating numerous throwaway intermediate `String` objects on the heap with repeated `+` operators, `StringBuilder.append()` appends characters directly to its internal array, minimizing heap allocations and improving performance before returning the final `String` via `toString()`.',
        followUp: 'When is using the simple + operator preferred over StringBuilder in toString()?',
        followUpAnswer: 'For a simple, single-statement `return "User[id=" + id + ", name=" + name + "]";`, the compiler automatically optimizes the expression, making `+` cleaner and just as efficient as manual `StringBuilder`.',
        keyPhrases: [
          'Mutable character buffer',
          'Minimizing intermediate heap objects',
          'Compiler optimization for single statements',
          'StringBuilder.append()'
        ],
        commonMistakeAnswer: 'Claiming StringBuilder is always required even for simple 2-variable concatenations.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the default return value of Object.toString() for an un-overridden class named `Invoice`?',
        options: [
          'Invoice{}',
          'Invoice@hexadecimalHashCode',
          'null',
          'A JSON representation of fields'
        ],
        correctIndex: 1,
        explanation: 'Default toString() produces `getClass().getName() + \'@\' + Integer.toHexString(hashCode())`.'
      },
      {
        question: 'What happens when you print an object that is null: `System.out.println(nullRef);`?',
        options: [
          'NullPointerException is thrown.',
          'The console prints: null',
          'Compilation error.',
          'The console prints: [null]'
        ],
        correctIndex: 1,
        explanation: 'println calls String.valueOf(nullRef), which safely returns the string "null".'
      },
      {
        question: 'Why does `int[] arr = {1, 2, 3}; System.out.println(arr);` print something like `[I@15db9742`?',
        options: [
          'Because arrays are primitives and have no toString() method.',
          'Because arrays inherit Object.toString() directly and do not override it.',
          'Because the array is corrupted.',
          'Because System.out.println cannot print arrays.'
        ],
        correctIndex: 1,
        explanation: 'Arrays in Java inherit Object.toString() directly without overriding it, printing the internal type code [I@...'
      },
      {
        question: 'What access modifier MUST be used when overriding toString() in a class?',
        options: [
          'private',
          'protected',
          'public',
          'package-private (default)'
        ],
        correctIndex: 2,
        explanation: 'Because toString() is declared public in java.lang.Object, any override must be declared public to avoid reducing visibility.'
      },
      {
        question: 'What runtime error occurs if two objects reference each other and their toString() methods print each other?',
        options: [
          'ClassCastException',
          'StackOverflowError',
          'OutOfMemoryError',
          'CircularReferenceException'
        ],
        correctIndex: 1,
        explanation: 'Infinite mutual recursion exhausts the thread call stack, throwing java.lang.StackOverflowError.'
      },
      {
        question: 'What does `String.valueOf((Object) null)` return?',
        options: [
          'null (reference)',
          '"null" (String of 4 characters)',
          'Throws NullPointerException',
          '"" (Empty String)'
        ],
        correctIndex: 1,
        explanation: 'String.valueOf(Object) explicitly checks for null and returns the four-character String "null".'
      },
      {
        question: 'Which of the following fields should typically be EXCLUDED or masked in a toString() implementation?',
        options: [
          'Entity ID',
          'User display name',
          'Plain-text password or security token',
          'Account creation date'
        ],
        correctIndex: 2,
        explanation: 'Sensitive credentials and PII like plain-text passwords should always be masked or excluded to prevent log leaks.'
      },
      {
        question: 'Can you override toString() and declare it to return a `StringBuilder` instead of `String`?',
        options: [
          'Yes, using covariant return types.',
          'No, toString() must return String; StringBuilder is not a subtype of String.',
          'Yes, if marked final.',
          'Yes, in Java 17+.'
        ],
        correctIndex: 1,
        explanation: 'StringBuilder does not extend String; they are sibling implementations of CharSequence. Covariant returns only work for subtypes.'
      },
      {
        question: 'Does declaring `String toString();` inside an interface force implementing classes to write an override?',
        options: [
          'Yes, all interface methods must be implemented.',
          'No, because the implementing class already inherits a concrete implementation from java.lang.Object.',
          'Yes, but only if the class is not abstract.',
          'Yes, in Java 8+.'
        ],
        correctIndex: 1,
        explanation: 'Every class inherits a concrete toString() from Object, which automatically satisfies the interface method signature.'
      },
      {
        question: 'What tool or method is recommended to print the contents of a 1D array in standard Java?',
        options: [
          'arr.toString()',
          'java.util.Arrays.toString(arr)',
          'arr.print()',
          'System.out.printArray(arr)'
        ],
        correctIndex: 1,
        explanation: 'java.util.Arrays.toString(arr) is the standard utility for generating a readable comma-separated string of array elements.'
      }
    ]
  },

  'equals-and-hashcode-contract': {
    id: 'equals-and-hashcode-contract',
    moduleId: 'java-object-class',
    moduleTitle: '14. Object Class & Contract',
    lessonNumber: 'Lesson 14.3',
    title: 'The equals() and hashCode() Contract',
    subtitle: 'Identity vs value equality, the 5 mathematical properties of equals, hash collision mechanics, bucket distribution, and the unbreakable contract',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Think of looking up a book in a massive university library with 1,000,000 volumes. Reference equality (`==`) asks: "Are these two book references pointing to the exact same physical copy sitting on shelf #42?" Logical equality (`equals()`) asks: "Do these two books have the exact same ISBN and content, even if one is in my hand and one is on the shelf?" To avoid searching 1,000,000 shelves sequentially, the library uses a Dewey Decimal number—a `hashCode()`. The hash code assigns the book to a specific room or aisle (a hash bucket). The Golden Contract states: If two books have the same ISBN (`equals() == true`), they MUST be assigned the exact same Dewey Decimal aisle (`hashCode() == same`). If they were placed in different aisles, the librarian would look in aisle A and conclude the book does not exist, even though an identical copy is sitting in aisle B!',
    coreExplanation: [
      'Reference Identity (`==`) vs Value Equality (`equals()`): `==` checks if two reference variables hold the exact same memory address on the heap. `equals()` evaluates whether two distinct objects represent the same logical value.',
      'Default Behavior: The default implementation in `java.lang.Object` simply performs `this == obj`. Unless you override `equals()`, two distinct instances with identical field values are considered NOT equal.',
      'The 5 Mathematical Axioms of `equals()` (JLS & Effective Java Item 10): 1) Reflexive: `x.equals(x)` must return `true`. 2) Symmetric: `x.equals(y)` returns `true` if and only if `y.equals(x)` returns `true`. 3) Transitive: If `x.equals(y)` is true and `y.equals(z)` is true, then `x.equals(z)` must be true. 4) Consistent: Repeated invocations must return the same result unless fields are modified. 5) Non-nullity: For any non-null reference `x`, `x.equals(null)` must return `false`.',
      'The Unbreakable Contract Between equals() and hashCode() (Effective Java Item 11): 1) If two objects are equal according to `equals()`, their `hashCode()` methods MUST produce the exact same integer value. 2) If two objects produce different hashCodes, they are guaranteed to be unequal. 3) If two objects produce the same hashCode, they are NOT necessarily equal (this is called a "Hash Collision").',
      'Hash Table Bucket Mapping: Hashing algorithms map an object\'s integer hash code to an internal array bucket index: `bucketIndex = Math.abs(hashCode % bucketCount)`. If `hashCode()` is not overridden, equal objects land in completely different buckets, making retrieval impossible in any hash-based algorithm.',
      'Standard 4-Step `equals()` Recipe: 1) Check reference identity: `if (this == obj) return true;`. 2) Check null and type compatibility: `if (obj == null || getClass() != obj.getClass()) return false;`. 3) Cast the argument: `MyClass other = (MyClass) obj;`. 4) Compare all significant fields using `==` for primitives and `Objects.equals()` (or null-safe checks) for references.',
      'Standard `hashCode()` Recipe: Compute a running hash using prime numbers (conventionally 31): `int result = 17; result = 31 * result + fieldHash;`. The multiplier 31 is chosen because it is an odd prime and the JVM optimizes `31 * i` as `(i << 5) - i` (a bit shift and subtraction).',
      'The Mutable Key Danger: If fields used in `equals()` and `hashCode()` are mutated after an object is placed into a hash-indexed structure, its hash code changes. The object becomes "lost" inside the wrong bucket, causing memory leaks and failed lookups.'
    ],
    diagram: `===================== HASH BUCKET MAPPING & COLLISION RESOLUTION =====================

  Step 1: Calculate HashCode          Step 2: Map to Bucket Index      Step 3: Resolve in Bucket
  Key Object: Book("978-01") ---------> hashCode() = 801934
                                             │
                                             ▼
                                     abs(801934 % 4) = Index 2
                                             │
                                             ▼
                          Bucket Array (Size 4)
                         +-----------------------+
                         | [0] null              |
                         +-----------------------+
                         | [1] Book("978-03")    |
                         +-----------------------+
                         | [2] HEAD              | ----> Node: Book("978-01") (MATCH!)
                         |                       |         │ (Linked chain if collision)
                         |                       |         ▼
                         |                       |       Node: Book("978-99")
                         +-----------------------+
                         | [3] null              |
                         +-----------------------+

  THE CRITICAL CONTRACT RULE:
  If a.equals(b) is TRUE  ===>  a.hashCode() MUST EQUAL b.hashCode()
  (They MUST navigate to the exact same bucket slot!)`,
    codeSnippet: {
      title: 'Bulletproof equals() and hashCode() Implementation',
      code: `class EmployeeId {
    private int departmentCode;
    private String badgeNumber;

    public EmployeeId(int departmentCode, String badgeNumber) {
        this.departmentCode = departmentCode;
        this.badgeNumber = badgeNumber;
    }

    // Step 1 - 4: Standard robust equals recipe
    @Override
    public boolean equals(Object obj) {
        // 1. Identity check
        if (this == obj) return true;
        // 2. Null and exact type check
        if (obj == null || getClass() != obj.getClass()) return false;
        // 3. Cast
        EmployeeId other = (EmployeeId) obj;
        // 4. Compare significant fields
        if (departmentCode != other.departmentCode) return false;
        return badgeNumber != null ? badgeNumber.equals(other.badgeNumber) : other.badgeNumber == null;
    }

    // Standard prime multiplier hashCode recipe
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + departmentCode;
        result = 31 * result + (badgeNumber != null ? badgeNumber.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ID[" + departmentCode + ":" + badgeNumber + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        EmployeeId id1 = new EmployeeId(10, "EMP-404");
        EmployeeId id2 = new EmployeeId(10, "EMP-404");
        EmployeeId id3 = new EmployeeId(20, "EMP-500");

        System.out.println("id1 == id2: " + (id1 == id2)); // Different heap instances
        System.out.println("id1.equals(id2): " + id1.equals(id2)); // Logically equal
        System.out.println("id1.equals(id3): " + id1.equals(id3)); // Unequal

        System.out.println("id1.hashCode() == id2.hashCode(): " +
            (id1.hashCode() == id2.hashCode())); // MUST BE TRUE!
    }
}`,
      lineByLineExplanation: [
        {
          line: 'if (this == obj) return true;',
          explanation: 'Fast-path identity check: if both references point to the exact same object on the heap, they are guaranteed equal.'
        },
        {
          line: 'if (obj == null || getClass() != obj.getClass()) return false;',
          explanation: 'Rejects null arguments and guarantees exact type identity, preventing symmetry bugs with subclasses.'
        },
        {
          line: 'EmployeeId other = (EmployeeId) obj;',
          explanation: 'Safe downcast after type verification has succeeded.'
        },
        {
          line: 'if (departmentCode != other.departmentCode) return false;',
          explanation: 'Compares primitive fields directly with == and reference fields with null-safe .equals().'
        },
        {
          line: 'result = 31 * result + ...',
          explanation: 'Computes a distributed hash code using prime number 31 across all fields evaluated in equals().'
        }
      ],
      output: `id1 == id2: false
id1.equals(id2): true
id1.equals(id3): false
id1.hashCode() == id2.hashCode(): true`
    },
    codeExamples: [
      {
        title: 'Custom Array-Based Hash Bucket Lookup Simulator',
        description: 'Simulates how a hash table uses hashCode() to find bucket indices and equals() to find the target object, without using java.util collections.',
        code: `class Key {
    private String code;
    public Key(String code) { this.code = code; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Key other = (Key) obj;
        return code != null ? code.equals(other.code) : other.code == null;
    }

    @Override
    public int hashCode() {
        return code != null ? code.hashCode() : 0;
    }

    public String getCode() { return code; }
}

public class HashLookupSimulator {
    // Array of buckets holding Key objects
    private Key[] buckets = new Key[4];

    public void put(Key key) {
        int index = Math.abs(key.hashCode() % buckets.length);
        buckets[index] = key;
        System.out.println("Stored key [" + key.getCode() + "] into Bucket #" + index);
    }

    public boolean contains(Key target) {
        int index = Math.abs(target.hashCode() % buckets.length);
        Key candidate = buckets[index];
        if (candidate != null && candidate.equals(target)) {
            System.out.println("Found [" + target.getCode() + "] in Bucket #" + index);
            return true;
        }
        System.out.println("Missed [" + target.getCode() + "] in Bucket #" + index);
        return false;
    }

    public static void main(String[] args) {
        HashLookupSimulator table = new HashLookupSimulator();
        Key original = new Key("AUTH-ALPHA");
        table.put(original);

        // Lookup with a completely distinct instance having the same logical value
        Key lookupKey = new Key("AUTH-ALPHA");
        boolean found = table.contains(lookupKey);
        System.out.println("Lookup success: " + found);
    }
}`,
        output: `Stored key [AUTH-ALPHA] into Bucket #...
Found [AUTH-ALPHA] in Bucket #...
Lookup success: true`
      },
      {
        title: 'The Overloading Trap: equals(MyClass) vs equals(Object)',
        description: 'Demonstrates the catastrophic bug where a developer overloads equals() instead of overriding it, causing polymorphic lookup failures.',
        code: `class BrokenKey {
    private int id;
    public BrokenKey(int id) { this.id = id; }

    // FATAL MISTAKE: Overloading with BrokenKey instead of Object!
    public boolean equals(BrokenKey other) {
        System.out.println("[BrokenKey.equals called]");
        return other != null && this.id == other.id;
    }

    @Override
    public int hashCode() { return id; }
}

public class OverloadTrapDemo {
    public static void main(String[] args) {
        BrokenKey k1 = new BrokenKey(42);
        BrokenKey k2 = new BrokenKey(42);

        // Direct call matches the overloaded signature
        System.out.println("Direct call: " + k1.equals(k2));

        // Polymorphic call through Object reference invokes Object.equals()!
        Object obj1 = k1;
        Object obj2 = k2;
        System.out.println("Polymorphic call: " + obj1.equals(obj2));
    }
}`,
        output: `[BrokenKey.equals called]
Direct call: true
Polymorphic call: false`
      }
    ],
    cheatSheet: {
      summary: 'Always override hashCode() whenever you override equals(). Equal objects must have equal hash codes. Use the 4-step recipe with getClass() to guarantee the 5 mathematical properties.',
      syntaxTemplate: `public class Entity {
    private int primitiveField;
    private String referenceField;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Entity other = (Entity) obj;
        if (primitiveField != other.primitiveField) return false;
        return referenceField != null ? referenceField.equals(other.referenceField) : other.referenceField == null;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + primitiveField;
        result = 31 * result + (referenceField != null ? referenceField.hashCode() : 0);
        return result;
    }
}`,
      rules: [
        {
          rule: 'The Golden Contract',
          explanation: 'If a.equals(b) is true, then a.hashCode() MUST equal b.hashCode(). Breaking this breaks all hash structures.'
        },
        {
          rule: 'Always Override Together',
          explanation: 'Whenever you override equals(), you MUST override hashCode(). Never override one without the other.'
        },
        {
          rule: 'Signature Must Accept Object',
          explanation: 'The signature must be equals(Object obj). Writing equals(MyClass obj) overloads instead of overriding.'
        },
        {
          rule: 'Field Consistency',
          explanation: 'Every significant field used in equals() MUST participate in hashCode() calculation.'
        },
        {
          rule: 'Immutability for Keys',
          explanation: 'Fields used in equals/hashCode should be immutable. Mutating fields after hashing loses the object in its bucket.'
        },
        {
          rule: 'Prime Multiplier 31',
          explanation: 'Using 31 distributes hash bits effectively and allows the JVM to optimize multiplication via (i << 5) - i.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Comparison Scope',
          optionA: '== Operator: Checks reference memory address identity',
          optionB: 'equals(): Checks logical field value equivalence'
        },
        {
          aspect: 'Equal Objects Contract',
          optionA: 'a.equals(b) == true: a.hashCode() MUST equal b.hashCode()',
          optionB: 'a.hashCode() == b.hashCode(): a.equals(b) may be true or false (collision)'
        },
        {
          aspect: 'Type Validation in equals',
          optionA: 'getClass() != obj.getClass(): Strict exact type; protects symmetry with subclasses',
          optionB: '!(obj instanceof MyClass): Subtype compatible; violates symmetry if child adds state'
        },
        {
          aspect: 'Null Handling in equals',
          optionA: 'x.equals(null): Must unconditionally return false without throwing exception',
          optionB: 'null.equals(x): Throws NullPointerException immediately'
        },
        {
          aspect: 'Default Object Implementation',
          optionA: 'Object.equals(): Evaluates this == obj',
          optionB: 'Object.hashCode(): Derives native identity hash from memory address/header'
        },
        {
          aspect: 'Bytecode Dispatch',
          optionA: 'equals(Object): invokevirtual dynamic dispatch via vtable index',
          optionB: 'hashCode(): invokevirtual; default delegates to JVM native identity hash'
        },
        {
          aspect: 'Complexity & Bucket Mapping',
          optionA: 'equals(): O(k) where k is number of compared fields; O(1) best case with this == obj',
          optionB: 'hashCode(): O(k) arithmetic operations; enables O(1) average lookup in hash structures'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Overloading `equals(MyClass other)` instead of overriding `equals(Object other)`.',
        whyItHappens: 'Wanting type safety in the parameter list.',
        howToFix: 'The signature in `Object` is `public boolean equals(Object obj)`. If you use `MyClass`, any polymorphic call (like in framework lookups) invokes `Object.equals(Object)` and fails. Always use `@Override` and `Object`.'
      },
      {
        mistake: 'Overriding `equals()` but forgetting to override `hashCode()`.',
        whyItHappens: 'Not understanding how hash tables and buckets work.',
        howToFix: 'If two objects are equal by `equals()`, their `hashCode()` must match. If you don\'t override `hashCode()`, they inherit `Object.hashCode()`, producing different hash values and breaking lookups.'
      },
      {
        mistake: 'Using mutable fields in `hashCode()` and mutating them after insertion.',
        whyItHappens: 'Allowing setters on fields like `id` or `code`.',
        howToFix: 'Make fields used in `equals()` and `hashCode()` `final` and immutable. Once an object is hashed, its hash code must never change.'
      },
      {
        mistake: 'Using `instanceof` in `equals()` when subclasses add new state fields.',
        whyItHappens: 'Following simple tutorials that use `if (obj instanceof MyClass)`.',
        howToFix: 'If class `ColorPoint` extends `Point` and adds `color`, using `instanceof` violates symmetry: `point.equals(colorPoint)` might be true while `colorPoint.equals(point)` is false. Use `getClass() != obj.getClass()`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: The Broken Overloaded equals() Method',
        problemStatement: 'What does this program print?',
        code: `class Item {
    int id;
    Item(int id) { this.id = id; }

    public boolean equals(Item other) {
        return other != null && this.id == other.id;
    }
}

public class Main {
    public static void main(String[] args) {
        Object a = new Item(1);
        Object b = new Item(1);
        System.out.print(a.equals(b));
    }
}`,
        options: [
          'true',
          'false',
          'Compilation Error: equals cannot be overloaded',
          'NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'Both references a and b are typed as Object. Which equals() method does the compiler bind to?',
        solution: 'false',
        explanation: 'Because references `a` and `b` have compile-time type `Object`, method resolution targets `equals(Object)`. `Item` only defined `equals(Item)`, so it did NOT override `Object.equals(Object)`. At runtime, `Object.equals()` executes (`this == obj`), which evaluates to `false` for distinct heap objects.'
      },
      {
        title: 'Puzzle 2: Symmetry Violation with Subclasses',
        problemStatement: 'What is the output of testing symmetry here?',
        code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
}

class ColorPoint extends Point {
    String color;
    ColorPoint(int x, int y, String color) {
        super(x, y);
        this.color = color;
    }
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof ColorPoint)) return false;
        ColorPoint cp = (ColorPoint) o;
        return super.equals(o) && color.equals(cp.color);
    }
}

public class Main {
    public static void main(String[] args) {
        Point p = new Point(1, 2);
        ColorPoint cp = new ColorPoint(1, 2, "Red");
        System.out.print(p.equals(cp) + " ");
        System.out.print(cp.equals(p));
    }
}`,
        options: [
          'true true',
          'true false',
          'false false',
          'false true'
        ],
        correctOptionIndex: 1,
        hint: 'p.equals(cp) checks if cp instanceof Point (true). cp.equals(p) checks if p instanceof ColorPoint (false!).',
        solution: 'true false',
        explanation: '`p.equals(cp)` runs `Point.equals()`. Since `cp instanceof Point` is true, it compares x and y (equal) -> `true`. But `cp.equals(p)` runs `ColorPoint.equals()`. Since `p instanceof ColorPoint` is false, it returns `false`. This directly violates the SYMMETRIC contract of `equals()`. Output: "true false".'
      },
      {
        title: 'Puzzle 3: The Missing hashCode() Disaster',
        problemStatement: 'What does this program print?',
        code: `class SerialKey {
    private String key;
    public SerialKey(String key) { this.key = key; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return key.equals(((SerialKey) obj).key);
    }
    // Note: hashCode() is NOT overridden!
}

public class Main {
    public static void main(String[] args) {
        SerialKey k1 = new SerialKey("WIN-10-PRO");
        SerialKey k2 = new SerialKey("WIN-10-PRO");

        System.out.print(k1.equals(k2) + " ");
        System.out.print(k1.hashCode() == k2.hashCode());
    }
}`,
        options: [
          'true true',
          'true false',
          'false false',
          'Compilation Error: hashCode must be overridden if equals is overridden'
        ],
        correctOptionIndex: 1,
        hint: 'Without an overridden hashCode(), where do k1 and k2 inherit their hash codes from?',
        solution: 'true false',
        explanation: '`k1.equals(k2)` returns `true` because `equals()` was overridden. However, `hashCode()` was NOT overridden, so both objects inherit `Object.hashCode()` (identity hash code based on memory addresses). Since they are distinct heap objects, their hash codes differ. Output: "true false", violating the contract!'
      },
      {
        title: 'Puzzle 4: Reflexive Property Verification',
        problemStatement: 'Which of the following implementations violates the REFLEXIVE property: `x.equals(x) must be true`?',
        code: `// Implementation A:
class CoordA {
    double x = Double.NaN;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        return false;
    }
}

// Implementation B:
class CoordB {
    double x = Double.NaN;
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof CoordB)) return false;
        return this.x == ((CoordB) o).x; // Note: Double.NaN == Double.NaN is false!
    }
}`,
        options: [
          'Implementation A only',
          'Implementation B only',
          'Both A and B violate reflexivity',
          'Neither violates reflexivity'
        ],
        correctOptionIndex: 1,
        hint: 'In Java, primitive floating-point comparison NaN == NaN evaluates to false!',
        solution: 'Implementation B only',
        explanation: 'Implementation B does NOT include `if (this == o) return true;`. For `CoordB c = new CoordB();`, `c.equals(c)` executes `this.x == c.x`. In IEEE 754 floating-point math, `Double.NaN == Double.NaN` is always `false`! Thus, `c.equals(c)` returns `false`, violating reflexivity.'
      },
      {
        title: 'Puzzle 5: Mutable Key Mutation in Hashing Context',
        problemStatement: 'What is the output of this program?',
        code: `class MutableKey {
    int id;
    public MutableKey(int id) { this.id = id; }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        return id == ((MutableKey) o).id;
    }
    @Override public int hashCode() { return id; }
}

public class Main {
    public static void main(String[] args) {
        MutableKey k = new MutableKey(10);
        int hash1 = k.hashCode();
        k.id = 99; // Mutating key!
        int hash2 = k.hashCode();

        System.out.print((hash1 == hash2) + " hash1=" + hash1 + " hash2=" + hash2);
    }
}`,
        options: [
          'false hash1=10 hash2=99',
          'true hash1=10 hash2=10',
          'true hash1=99 hash2=99',
          'Compilation Error: fields in hashCode must be final'
        ],
        correctOptionIndex: 0,
        hint: 'The hash code was derived directly from the mutable field id.',
        solution: 'false hash1=10 hash2=99',
        explanation: 'Initially, `k.hashCode()` was 10. After modifying `k.id = 99`, calling `k.hashCode()` returns 99. The hash code changed, proving why mutating keys in hash-based data structures corrupts lookup.'
      },
      {
        title: 'Puzzle 6: Hash Collision Equality Check',
        problemStatement: 'Can two objects have identical hashCodes but be unequal according to equals()?',
        code: `class ConstantHash {
    int val;
    ConstantHash(int val) { this.val = val; }
    @Override public boolean equals(Object o) {
        return o instanceof ConstantHash && this.val == ((ConstantHash) o).val;
    }
    @Override public int hashCode() {
        return 42; // Constant hash for ALL instances!
    }
}

public class Main {
    public static void main(String[] args) {
        ConstantHash h1 = new ConstantHash(1);
        ConstantHash h2 = new ConstantHash(2);

        System.out.print((h1.hashCode() == h2.hashCode()) + " ");
        System.out.print(h1.equals(h2));
    }
}`,
        options: [
          'true false',
          'true true',
          'false false',
          'Runtime HashCollisionException'
        ],
        correctOptionIndex: 0,
        hint: 'Does the contract forbid two unequal objects from having the same hashCode?',
        solution: 'true false',
        explanation: 'The contract only requires that equal objects have equal hash codes. Unequal objects can share the same hash code (a hash collision). Here, both produce hashCode 42, but `h1.equals(h2)` is `false`. Output: "true false".'
      },
      {
        title: 'Puzzle 7: Transitivity Property Check',
        problemStatement: 'If A.equals(B) is true and B.equals(C) is true, what MUST A.equals(C) return to satisfy the Java contract?',
        code: `// Contract:
// If x.equals(y) == true AND y.equals(z) == true
// What must x.equals(z) evaluate to?`,
        options: [
          'It must evaluate to true (Transitive property)',
          'It can evaluate to false if types differ',
          'It depends on the hashCode() implementation',
          'Transitivity is optional in Java'
        ],
        correctOptionIndex: 0,
        hint: 'Think of basic mathematical equivalence relations.',
        solution: 'It must evaluate to true (Transitive property)',
        explanation: 'Transitivity is one of the five mandatory mathematical axioms of the equals() contract: if A equals B and B equals C, then A must equal C.'
      },
      {
        title: 'Puzzle 8: The Non-Nullity Requirement',
        problemStatement: 'What must `x.equals(null)` return for any non-null reference x?',
        code: `class User {
    String name;
    User(String name) { this.name = name; }
}

public class Main {
    public static void main(String[] args) {
        User u = new User("Alice");
        System.out.print(u.equals(null));
    }
}`,
        options: [
          'false',
          'true',
          'NullPointerException',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'The non-nullity contract states that x.equals(null) must return false, never throw NullPointerException.',
        solution: 'false',
        explanation: 'According to the non-nullity axiom of `equals()`, for any non-null reference `x`, `x.equals(null)` must return `false` without throwing an exception. Output: "false".'
      },
      {
        title: 'Puzzle 9: Symmetry Violation with Subclass equals()',
        problemStatement: 'What boolean values are printed by this Point and ColorPoint comparison?',
        code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
}
class ColorPoint extends Point {
    String color;
    ColorPoint(int x, int y, String c) { super(x, y); this.color = c; }
    @Override public boolean equals(Object o) {
        if (!(o instanceof ColorPoint)) return false;
        ColorPoint cp = (ColorPoint) o;
        return super.equals(o) && color.equals(cp.color);
    }
}
public class Main {
    public static void main(String[] args) {
        Point p = new Point(1, 2);
        ColorPoint cp = new ColorPoint(1, 2, "RED");
        System.out.println(p.equals(cp) + " " + cp.equals(p));
    }
}`,
        options: [
          'true false',
          'true true',
          'false false',
          'false true'
        ],
        correctOptionIndex: 0,
        hint: 'p.equals(cp) uses Point.equals (which checks instanceof Point), but cp.equals(p) uses ColorPoint.equals (checking instanceof ColorPoint).',
        solution: 'true false',
        explanation: 'p.equals(cp) executes Point.equals; cp is an instance of Point with matching coordinates, returning true. But cp.equals(p) executes ColorPoint.equals; p is not an instance of ColorPoint, returning false! This violates the Symmetry axiom of equals(). Output: "true false".'
      },
      {
        title: 'Puzzle 10: Deterministic Output of Objects.hash()',
        problemStatement: 'What does this program print?',
        code: `public class Main {
    public static void main(String[] args) {
        int h1 = java.util.Objects.hash(10, "data");
        int h2 = java.util.Objects.hash(10, "data");
        System.out.println(h1 == h2);
    }
}`,
        options: [
          'true',
          'false',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctOptionIndex: 0,
        hint: 'Objects.hash() computes consistent, reproducible hash codes based on argument sequence and values.',
        solution: 'true',
        explanation: 'Objects.hash(...) delegates to Arrays.hashCode(new Object[]{10, "data"}). Because both invocations receive identical values in the same order, they compute identical integer hash codes, printing "true".'
      }
    ],
    interviewQuestions: [
      {
        question: 'State the complete contract between equals() and hashCode() in Java.',
        answer: 'The contract consists of three fundamental rules: 1) Consistency: If the fields used in equality checks have not changed, `hashCode()` must consistently return the same integer throughout the application run. 2) Equal Objects Must Have Equal HashCodes: If two objects are equal according to `equals(Object)`, then calling `hashCode()` on each MUST produce the exact same integer result. 3) Unequal Objects May Have Equal HashCodes: If two objects are unequal according to `equals(Object)`, they are NOT required to have different hashCodes (though distinct hashCodes improve hash table performance by reducing collisions).',
        followUp: 'What disastrous bug occurs if you violate Rule #2 in a hash-based lookup?',
        followUpAnswer: 'If two equal objects have different hashCodes, looking up an object in a hash table or hash set will compute the wrong bucket index, causing `contains()` or `get()` to fail and return null/false even though an equal object is stored in the table!',
        keyPhrases: [
          'Equal objects must have equal hashCodes',
          'Hash collision allowance',
          'Consistency across multiple calls',
          'Bucket index miscalculation'
        ],
        commonMistakeAnswer: 'Claiming that unequal objects must always have different hash codes.'
      },
      {
        question: 'What are the five mathematical properties required of any equals() implementation by the Java Language Specification?',
        answer: 'The equals method implements an equivalence relation with five properties: 1) Reflexive: For any non-null reference x, `x.equals(x)` must return `true`. 2) Symmetric: For any non-null references x and y, `x.equals(y)` returns `true` if and only if `y.equals(x)` returns `true`. 3) Transitive: If `x.equals(y)` returns `true` and `y.equals(z)` returns `true`, then `x.equals(z)` must return `true`. 4) Consistent: Multiple invocations of `x.equals(y)` consistently return `true` or `false`, provided no information modified. 5) Non-nullity: For any non-null reference x, `x.equals(null)` must return `false` (never throw an exception).',
        followUp: 'How does checking if (this == obj) fulfill the reflexive property efficiently?',
        followUpAnswer: 'It provides an instantaneous $O(1)$ short-circuit: if both reference pointers are identical, it returns true immediately without inspecting any fields.',
        keyPhrases: [
          'Reflexive, Symmetric, Transitive',
          'Consistent, Non-nullity',
          'Equivalence relation',
          'Short-circuit reference check'
        ],
        commonMistakeAnswer: 'Omitting non-nullity or assuming symmetry is handled automatically by the compiler.'
      },
      {
        question: 'Why should you generally use getClass() != obj.getClass() instead of instanceof when implementing equals() in a class hierarchy?',
        answer: 'Using `instanceof` violates the Symmetric property of `equals()` whenever a subclass adds a new significant field (Effective Java Item 10). If `Point(x, y)` uses `instanceof Point`, it will evaluate `point.equals(colorPoint)` to `true` by checking only x and y. But `ColorPoint(x, y, color)` checks `obj instanceof ColorPoint` (which is false for `Point`), returning `false`. `a.equals(b)` is true while `b.equals(a)` is false—a blatant symmetry violation! Using `getClass() != obj.getClass()` strictly enforces that objects must have identical runtime classes to be equal, preserving symmetry and transitivity.',
        followUp: 'When is using instanceof in equals() actually appropriate?',
        followUpAnswer: '`instanceof` is appropriate when implementing an interface contract (like `java.util.List` or `Set`) where disparate implementations (e.g. `ArrayList` vs `LinkedList`) must be considered equal if their elements match.',
        keyPhrases: [
          'Symmetry violation in subclasses',
          'ColorPoint trap (Effective Java Item 10)',
          'Strict exact type identity',
          'Interface contract exception'
        ],
        commonMistakeAnswer: 'Claiming instanceof is always superior because of polymorphism.'
      },
      {
        question: 'Why is the number 31 traditionally used as a multiplier when writing hashCode()?',
        answer: 'The number 31 was chosen for two reasons: 1) It is an odd prime. Multiplying by an even number (like 2) would shift bits left, causing hash information to spill out and zeros to accumulate on the right, destroying distribution. Multiplying by a prime provides a well-distributed hash spread across buckets. 2) Performance optimization: 31 has a special mathematical property where multiplication `31 * i` can be replaced by the JVM with a bitwise shift and subtraction: `(i << 5) - i`. Modern CPU architectures execute bit shifts and subtractions in a single clock cycle, making it exceptionally fast.',
        followUp: 'What would happen if you used a constant return 1 for hashCode()?',
        followUpAnswer: 'The code remains legally compliant with the contract (all equal objects produce 1), but every single entry in a hash table collides into bucket #1, degrading hash table lookups from $O(1)$ to $O(n)$ linear time.',
        keyPhrases: [
          'Odd prime number',
          'Bit shift optimization: (i << 5) - i',
          'Even distribution of hash values',
          'Degradation to O(n) on bad hash'
        ],
        commonMistakeAnswer: 'Thinking 31 is mandatory by the compiler and no other number can be used.'
      },
      {
        question: 'What is the danger of using mutable fields in hashCode() calculation?',
        answer: 'If an object is inserted into a hash table or hash set, its bucket index is computed based on its current `hashCode()`. If a field participating in `hashCode()` is subsequently modified (e.g. `user.setId(200)`), the object\'s hash code changes. When you later attempt to search for or remove that object, the table recomputes the bucket index using the NEW hash code, looking in a completely different bucket. The object is permanently "lost" inside the old bucket, causing lookup failures and memory leaks.',
        followUp: 'How do you prevent this bug in system architecture?',
        followUpAnswer: 'Design key objects to be completely immutable (make fields `final` with no setters).',
        keyPhrases: [
          'Bucket index corruption',
          'Lost object in hash table',
          'Memory leak hazard',
          'Mandatory immutability for keys'
        ],
        commonMistakeAnswer: 'Assuming hash tables automatically recalculate bucket positions when objects mutate.'
      },
      {
        question: 'Explain the difference between reference equality (==) and logical equality (equals()).',
        answer: '`==` is a binary operator that compares memory references for object types: it evaluates whether two reference variables point to the exact same memory address on the JVM heap. `equals()` is a method designed to compare the internal state and logical values of two objects (e.g. comparing characters of two strings or fields of two bank accounts). Two distinct objects at different heap locations will always evaluate to `false` with `==`, but can evaluate to `true` with `equals()` if their significant fields match.',
        followUp: 'When does == behave like equals()?',
        followUpAnswer: 'For un-overridden classes (which inherit Object.equals()), and for interned Strings or cached Enums/Integers where identity and value are guaranteed to share the exact same instance.',
        keyPhrases: [
          'Memory address identity vs logical value',
          'Distinct heap instances',
          'Overridden field comparison',
          'Enum identity guarantee'
        ],
        commonMistakeAnswer: 'Thinking == compares strings and equals() compares numbers.'
      },
      {
        question: 'Why does equals(MyClass other) fail to override equals(Object obj)?',
        answer: 'In Java, method overriding requires the method signature to match the superclass method EXACTLY. The method in `java.lang.Object` is `public boolean equals(Object obj)`. When a developer writes `public boolean equals(MyClass other)`, they have created an OVERLOAD with a different parameter type (`MyClass` instead of `Object`). When standard frameworks, collections, or polymorphic references invoke `.equals(obj)`, compile-time static binding routes to `Object.equals(Object)`, completely ignoring the developer\'s custom method.',
        followUp: 'How can you protect your code from accidentally overloading equals()?',
        followUpAnswer: 'Always annotate the method with `@Override`. If the signature does not match `equals(Object)`, the compiler will immediately raise an error.',
        keyPhrases: [
          'Overloading vs overriding',
          'Compile-time static binding',
          'Polymorphic dispatch bypass',
          '@Override annotation protection'
        ],
        commonMistakeAnswer: 'Believing the compiler automatically treats equals(MyClass) as an override.'
      },
      {
        question: 'What is a Hash Collision, and how do hash-based data structures resolve it?',
        answer: 'A hash collision occurs when two distinct, unequal objects produce the exact same hash code, or when two different hash codes map to the same bucket index (`Math.abs(hash % bucketCount)`). Hash tables resolve collisions primarily through "Separate Chaining" (where each bucket maintains a linked list or tree of entries) or "Open Addressing" (probing for the next open slot). When a collision occurs, the hash table traverses the bucket\'s chain and calls `equals()` on each candidate to find the exact target object.',
        followUp: 'How does hashCode() speed up search if collisions are possible?',
        followUpAnswer: '`hashCode()` acts as an initial coarse filter: if hash codes differ, objects are guaranteed unequal without needing to inspect fields. `equals()` is only called when hash codes collide.',
        keyPhrases: [
          'Hash collision',
          'Separate chaining (linked nodes)',
          'Coarse filter vs fine equals()',
          'Bucket index convergence'
        ],
        commonMistakeAnswer: 'Thinking that hash collisions cause the JVM to crash or throw an exception.'
      },
      {
        question: 'How should you compare array fields inside an equals() and hashCode() method?',
        answer: 'Never use `arr1.equals(arr2)` or `arr1 == arr2`, because arrays do not override `equals()` and will only perform reference identity checks. In standard Java, use `java.util.Arrays.equals(arr1, arr2)` for one-dimensional arrays (or compare elements in a loop), and `java.util.Arrays.deepEquals()` for multi-dimensional arrays. Similarly, compute hash codes using `java.util.Arrays.hashCode(arr)` or `Arrays.deepHashCode()`.',
        followUp: 'What happens if you use arr.hashCode() in your class\'s hashCode()?',
        followUpAnswer: 'It invokes Object.hashCode(), returning an identity hash based on the array\'s memory address, violating the contract whenever two different arrays have identical elements.',
        keyPhrases: [
          'Arrays do not override equals',
          'java.util.Arrays.equals()',
          'Arrays.hashCode()',
          'deepEquals for nested arrays'
        ],
        commonMistakeAnswer: 'Calling arr.equals(arr2) and expecting element-by-element comparison.'
      },
      {
        question: 'Can equals() throw an exception when passed an object of an incompatible type?',
        answer: 'No, absolutely not. The `equals()` method must NEVER throw a `ClassCastException` or any other exception when passed an incompatible object or a `null` reference. The non-nullity contract explicitly dictates that `x.equals(null)` must return `false`. When passed an incompatible type, the method must gracefully evaluate `getClass() != obj.getClass()` or `!(obj instanceof TargetClass)` and return `false`. Throwing an exception violates the contract and crashes calling libraries.',
        followUp: 'What should equals() do if one of the object\'s internal fields is null?',
        followUpAnswer: 'It must handle null safely using `field == null ? other.field == null : field.equals(other.field)` or `Objects.equals(field, other.field)`.',
        keyPhrases: [
          'Never throw ClassCastException',
          'Graceful false return',
          'Null-safe field comparison',
          'Contractual stability'
        ],
        commonMistakeAnswer: 'Thinking it is good practice to throw IllegalArgumentException if types mismatch.'
      },
      {
        question: 'What is the role of java.util.Objects.equals() and Objects.hash() in modern Java?',
        answer: 'Introduced in Java 7, `java.util.Objects.equals(a, b)` provides a null-safe equality check: it returns `true` if both references are identical (including both `null`), and calls `a.equals(b)` if `a != null`. `Objects.hash(Object... values)` accepts a varargs sequence of fields and computes a combined hash code using the prime 31 multiplier recipe, eliminating boilerplate code while preventing `NullPointerException`s.',
        followUp: 'What minor performance tradeoff does Objects.hash(Object... values) introduce?',
        followUpAnswer: 'It creates a temporary varargs `Object[]` array on the heap and boxes any primitive arguments, which may introduce minor garbage collection overhead in ultra-high-throughput code.',
        keyPhrases: [
          'Null-safe comparison',
          'Boilerplate reduction',
          'Varargs array allocation',
          'Autoboxing overhead'
        ],
        commonMistakeAnswer: 'Believing Objects.equals() can compare objects that don\'t override equals().'
      }
    ],
    miniQuiz: [
      {
        question: 'If `a.equals(b)` evaluates to `true`, what MUST be true about their hash codes according to the Java contract?',
        options: [
          'a.hashCode() and b.hashCode() must be different.',
          'a.hashCode() and b.hashCode() MUST be equal.',
          'Their hash codes do not matter.',
          'Their hash codes must both be zero.'
        ],
        correctIndex: 1,
        explanation: 'The contract strictly mandates: If two objects are equal according to equals(), they MUST produce the exact same hashCode.'
      },
      {
        question: 'What is the outcome of comparing `new String("test") == new String("test")`?',
        options: [
          'true, because the contents are identical.',
          'false, because they are distinct objects at different heap memory addresses.',
          'Compilation error.',
          'true, because Strings are interned in the String Pool.'
        ],
        correctIndex: 1,
        explanation: 'Using `new String()` explicitly creates two distinct heap objects, so `==` (reference identity) returns `false`.'
      },
      {
        question: 'Which axiom of equals() states that for any non-null x and y, `x.equals(y)` is true if and only if `y.equals(x)` is true?',
        options: [
          'Reflexive',
          'Symmetric',
          'Transitive',
          'Consistent'
        ],
        correctIndex: 1,
        explanation: 'The Symmetric property requires equality to work identically in both directions.'
      },
      {
        question: 'Why is prime number 31 commonly used in hashCode calculations?',
        options: [
          'Because 31 is the maximum number of fields allowed in a class.',
          'Because it distributes hash bits well and multiplication by 31 can be optimized as (i << 5) - i.',
          'Because Java was invented in 1931.',
          'Because 31 guarantees zero hash collisions.'
        ],
        correctIndex: 1,
        explanation: '31 is an odd prime that avoids zero bit accumulation and enables the JVM compiler to optimize multiplication via bit shifting.'
      },
      {
        question: 'What happens if you mutate a field of an object that was used to compute its hashCode after inserting it into a hash table?',
        options: [
          'The hash table automatically moves the object to the correct new bucket.',
          'The object\'s hash code changes, losing it inside the old bucket and breaking future lookups.',
          'The JVM throws a ConcurrentModificationException.',
          'The object is immediately deleted from the table.'
        ],
        correctIndex: 1,
        explanation: 'The hash table does not monitor internal object mutations. The object remains stuck in its original bucket slot and cannot be found by its new hash.'
      },
      {
        question: 'What does `x.equals(null)` return according to the non-nullity contract?',
        options: [
          'true',
          'Throws NullPointerException',
          'false',
          'Throws IllegalArgumentException'
        ],
        correctIndex: 2,
        explanation: 'The non-nullity contract mandates that for any non-null reference x, x.equals(null) must return false.'
      },
      {
        question: 'What is the signature of the equals method defined in java.lang.Object?',
        options: [
          'public boolean equals(MyClass obj)',
          'public boolean equals(Object obj)',
          'protected boolean equals(Object obj)',
          'public int equals(Object obj)'
        ],
        correctIndex: 1,
        explanation: 'The exact signature in java.lang.Object is `public boolean equals(Object obj)`.'
      },
      {
        question: 'Can two unequal objects produce the same hashCode() in Java?',
        options: [
          'No, hashCodes must be completely unique for every object.',
          'Yes, this is known as a hash collision and is permitted by the contract.',
          'Yes, but only if both objects are null.',
          'No, the JVM throws an error if hashCodes collide.'
        ],
        correctIndex: 1,
        explanation: 'Unequal objects can share the same hash code (a hash collision). The contract only requires equal objects to have equal hash codes.'
      },
      {
        question: 'Why is `getClass() != obj.getClass()` preferred over `!(obj instanceof Point)` when subclasses add new state fields?',
        options: [
          'Because getClass() runs 10x faster.',
          'Because instanceof violates the Symmetric property of equals when subclasses add fields.',
          'Because instanceof does not work on classes.',
          'Because getClass() handles null automatically.'
        ],
        correctIndex: 1,
        explanation: 'If a subclass adds state, instanceof causes symmetry violations where super.equals(child) is true but child.equals(super) is false.'
      },
      {
        question: 'What is the default implementation of hashCode() in java.lang.Object?',
        options: [
          'It always returns 0.',
          'It sums the ASCII values of the class name.',
          'A native method returning an identity hash code derived from the object\'s memory/header.',
          'It returns the current timestamp in nanoseconds.'
        ],
        correctIndex: 2,
        explanation: 'Default hashCode() in Object is a native method that computes an identity hash code tied to the object\'s header mark word.'
      }
    ]
  },

  'shallow-vs-deep-copy': {
    id: 'shallow-vs-deep-copy',
    moduleId: 'java-object-class',
    moduleTitle: '14. Object Class & Contract',
    lessonNumber: 'Lesson 14.4',
    title: 'Shallow Copy vs Deep Copy & Cloning',
    subtitle: 'Object duplication mechanics, Cloneable marker interface, field-by-field bitwise copy, deep recursive cloning, and copy constructors',
    estimatedMinutes: 22,
    beginnerAnalogy: 'Think of cloning a home office. A "Shallow Copy" duplicates the physical office room and buys a new desk, but leaves the physical filing cabinet shared: both rooms have a doorway leading to the exact same shared filing cabinet in the hallway. If the occupant of Office B opens the cabinet and burns a contract, the occupant of Office A opens the cabinet and discovers their contract is destroyed! A "Deep Copy", on the other hand, builds a brand-new office room, buys a new desk, AND manufactures an identical second filing cabinet, photocopying every single document inside. Office A and Office B are completely autonomous: changes made in one office can never affect the other.',
    coreExplanation: [
      'Duplicating an object in Java can be achieved via Shallow Copy or Deep Copy. In a Shallow Copy, primitive fields are copied by value, but reference fields simply copy the memory address pointers, causing both objects to share the same underlying child objects.',
      'In a Deep Copy, all primitive fields are copied, and all referenced objects (and their nested children, recursively) are newly instantiated and duplicated, producing two completely independent object graphs.',
      'The `Object.clone()` Method: Declared in `java.lang.Object` as `protected native Object clone() throws CloneNotSupportedException`. It performs a bitwise, field-for-field shallow copy of the object on the JVM heap.',
      'The `Cloneable` Marker Interface: To enable `Object.clone()`, a class MUST implement the `java.lang.Cloneable` interface. If a class calls `super.clone()` without implementing `Cloneable`, the JVM throws a runtime `CloneNotSupportedException`.',
      'Flaws of `Cloneable` and `clone()` (Effective Java Item 13): The cloning mechanism in Java is deeply flawed: 1) It bypasses constructors (creating objects without constructor validation), 2) `clone()` returns `Object`, requiring downcasting, 3) It forces handling checked `CloneNotSupportedException`, 4) Default clone is shallow.',
      'Array Cloning Behavior: Calling `.clone()` on any Java array (`arr.clone()`) creates a new array object of the exact same length. However, for reference arrays (e.g. `User[]`), the array cloning is SHALLOW: the new array slots point to the exact same element objects in memory.',
      'Deep Cloning via `clone()`: To make `clone()` perform a deep copy, the overriding method must call `super.clone()`, cast the result, and explicitly clone each mutable reference field: `cloned.address = (Address) this.address.clone();`.',
      'The Superior Alternatives (Copy Constructors & Static Factories): Rather than wrestling with `Cloneable`, modern Java universally prefers Copy Constructors (`public User(User other)`) or Copy Static Factories (`public static User copyOf(User other)`). They respect constructors, avoid casts, support generics, and allow creating deep copies cleanly.'
    ],
    diagram: `===================== SHALLOW COPY VS DEEP COPY MEMORY LAYOUT =====================

  1. SHALLOW COPY (Shared Nested Objects - MUTATION HAZARD!)
     Original Order                     Cloned Order
  +--------------------+             +--------------------+
  | id: 101            |             | id: 101            |  (Primitives copied)
  | customer: 0x4A     |             | customer: 0x4A     |  (Pointer duplicated!)
  +--------------------+             +--------------------+
           │                                  │
           └─────────────────┬────────────────┘
                             ▼
                    +--------------------+
                    | Customer (0x4A)    |  <-- SHARED INSTANCE!
                    | name: "Amara"      |      Mutating this affects BOTH orders!
                    +--------------------+

  ───────────────────────────────────────────────────────────────────────────
  2. DEEP COPY (Independent Object Graphs - SAFE ISOLATION!)
     Original Order                     Cloned Order
  +--------------------+             +--------------------+
  | id: 101            |             | id: 101            |  (Primitives copied)
  | customer: 0x4A     |             | customer: 0x9B     |  (Points to NEW copy!)
  +--------------------+             +--------------------+
           │                                  │
           ▼                                  ▼
  +--------------------+             +--------------------+
  | Customer (0x4A)    |             | Customer (0x9B)    |  <-- INDEPENDENT!
  | name: "Amara"      |             | name: "Amara"      |      Mutations isolated.
  +--------------------+             +--------------------+`,
    codeSnippet: {
      title: 'Shallow Clone vs Deep Clone Implementation',
      code: `class Coordinates implements Cloneable {
    int x, y;

    public Coordinates(int x, int y) { this.x = x; this.y = y; }

    @Override
    public Coordinates clone() {
        try {
            return (Coordinates) super.clone(); // Shallow clone of primitives is fine
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

class Robot implements Cloneable {
    String model;
    Coordinates coords; // Nested reference field!

    public Robot(String model, Coordinates coords) {
        this.model = model;
        this.coords = coords;
    }

    // 1. Shallow clone: coordinates remain shared
    public Robot shallowClone() {
        try {
            return (Robot) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }

    // 2. Deep clone: recursively clones nested Coordinates
    @Override
    public Robot clone() {
        try {
            Robot copy = (Robot) super.clone();
            copy.coords = this.coords.clone(); // Deep copy nested object!
            return copy;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Robot original = new Robot("Rover-1", new Coordinates(10, 20));

        // Create shallow copy
        Robot shallow = original.shallowClone();
        shallow.coords.x = 999; // Mutates SHARED coordinates!
        System.out.println("After shallow mutation -> Original X: " + original.coords.x);

        // Reset and create deep copy
        original.coords.x = 10;
        Robot deep = original.clone();
        deep.coords.x = 555; // Mutates INDEPENDENT coordinates!
        System.out.println("After deep mutation    -> Original X: " + original.coords.x);
        System.out.println("Deep copy X: " + deep.coords.x);
    }
}`,
      lineByLineExplanation: [
        {
          line: 'class Robot implements Cloneable',
          explanation: 'Implements the Cloneable marker interface; without this, super.clone() throws CloneNotSupportedException.'
        },
        {
          line: 'Robot copy = (Robot) super.clone();',
          explanation: 'Invokes Object.clone() to perform a bitwise field copy of primitives and reference addresses.'
        },
        {
          line: 'copy.coords = this.coords.clone();',
          explanation: 'Deep copy step: explicitly clones the nested Coordinates object so the clone references an independent object.'
        },
        {
          line: 'shallow.coords.x = 999;',
          explanation: 'Demonstrates shallow copy danger: mutating coords in shallow modifies the original robot\'s coords.'
        },
        {
          line: 'deep.coords.x = 555;',
          explanation: 'Demonstrates deep copy safety: modifying deep\'s coords leaves original untouched.'
        }
      ],
      output: `After shallow mutation -> Original X: 999
After deep mutation    -> Original X: 10
Deep copy X: 555`
    },
    codeExamples: [
      {
        title: 'Copy Constructor Pattern (The Preferred Alternative)',
        description: 'Demonstrates using copy constructors to achieve clean deep copying without Cloneable, casts, or exceptions.',
        code: `class Dimensions {
    int width, height;

    public Dimensions(int width, int height) {
        this.width = width;
        this.height = height;
    }

    // Copy Constructor for Dimensions
    public Dimensions(Dimensions other) {
        this.width = other.width;
        this.height = other.height;
    }
}

class WindowFrame {
    String title;
    Dimensions dims;

    public WindowFrame(String title, Dimensions dims) {
        this.title = title;
        this.dims = dims;
    }

    // Copy Constructor for WindowFrame (Performs Deep Copy)
    public WindowFrame(WindowFrame other) {
        this.title = other.title;
        // Deep copy nested Dimensions using its copy constructor
        this.dims = new Dimensions(other.dims);
    }
}

public class CopyConstructorDemo {
    public static void main(String[] args) {
        WindowFrame original = new WindowFrame("MainWindow", new Dimensions(800, 600));
        WindowFrame replica = new WindowFrame(original);

        // Mutate replica dimensions
        replica.dims.width = 1920;

        System.out.println("Original width: " + original.dims.width);
        System.out.println("Replica width:  " + replica.dims.width);
    }
}`,
        output: `Original width: 800
Replica width:  1920`
      },
      {
        title: 'Deep Copying Arrays of Objects Manually',
        description: 'Shows why array.clone() is shallow on reference arrays and how to perform a genuine deep copy manually.',
        code: `class ScoreRecord {
    int score;
    public ScoreRecord(int score) { this.score = score; }
}

public class ArrayDeepCopyDemo {
    public static ScoreRecord[] deepCopyArray(ScoreRecord[] source) {
        if (source == null) return null;
        ScoreRecord[] copy = new ScoreRecord[source.length];
        for (int i = 0; i < source.length; i++) {
            copy[i] = new ScoreRecord(source[i].score); // Re-instantiate each element
        }
        return copy;
    }

    public static void main(String[] args) {
        ScoreRecord[] teamA = new ScoreRecord[]{ new ScoreRecord(10), new ScoreRecord(20) };

        // 1. Array.clone() is shallow for references!
        ScoreRecord[] shallowTeam = teamA.clone();
        shallowTeam[0].score = 999;
        System.out.println("After array.clone mutation -> TeamA[0]: " + teamA[0].score);

        // Reset
        teamA[0].score = 10;

        // 2. Manual deep array copy
        ScoreRecord[] deepTeam = deepCopyArray(teamA);
        deepTeam[0].score = 777;
        System.out.println("After deepCopyArray mutation -> TeamA[0]: " + teamA[0].score);
        System.out.println("DeepTeam[0]: " + deepTeam[0].score);
    }
}`,
        output: `After array.clone mutation -> TeamA[0]: 999
After deepCopyArray mutation -> TeamA[0]: 10
DeepTeam[0]: 777`
      }
    ],
    cheatSheet: {
      summary: 'Shallow copy copies primitives and duplicates reference addresses. Deep copy recursively creates new instances of all referenced objects. Prefer copy constructors over Cloneable.',
      syntaxTemplate: `// Recommended Pattern: Copy Constructor
public class Entity {
    private int id;
    private NestedObject child;

    // Standard constructor
    public Entity(int id, NestedObject child) {
        this.id = id;
        this.child = child;
    }

    // Deep Copy Constructor
    public Entity(Entity other) {
        this.id = other.id;
        this.child = new NestedObject(other.child); // Deep copy child
    }
}`,
      rules: [
        {
          rule: 'Cloneable Marker Obligation',
          explanation: 'Calling super.clone() without implementing Cloneable triggers runtime CloneNotSupportedException.'
        },
        {
          rule: 'Default clone() is Shallow',
          explanation: 'Object.clone() only copies primitive values and reference pointers; child objects remain shared.'
        },
        {
          rule: 'Bypasses Constructors',
          explanation: 'Object.clone() allocates memory and copies fields directly without calling any class constructors.'
        },
        {
          rule: 'Array.clone() Reference Limitation',
          explanation: 'arr.clone() duplicates the outer array container, but reference elements inside remain shared.'
        },
        {
          rule: 'Covariant Return in clone()',
          explanation: 'An overriding clone() method can specify the class itself as the return type instead of Object.'
        },
        {
          rule: 'Prefer Copy Constructors',
          explanation: 'Copy constructors avoid Cloneable baggage, casting, checked exceptions, and bypass hazards.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Nested Objects',
          optionA: 'Shallow Copy: Shared reference pointers to same heap objects',
          optionB: 'Deep Copy: Completely new, independent object instances'
        },
        {
          aspect: 'Mutation Impact',
          optionA: 'Shallow Copy: Modifying nested child affects both original and clone',
          optionB: 'Deep Copy: Modifying nested child has zero effect on original'
        },
        {
          aspect: 'Implementation: clone()',
          optionA: 'Shallow Copy: return (MyClass) super.clone()',
          optionB: 'Deep Copy: Call super.clone(), then clone/recreate all nested objects'
        },
        {
          aspect: 'Constructor Execution',
          optionA: 'Cloneable clone(): Bypasses constructors completely via native memory copy',
          optionB: 'Copy Constructor: Executes standard constructor code and validation rules'
        },
        {
          aspect: 'Performance / Speed',
          optionA: 'Shallow Copy: Extremely fast $O(1)$ memory block copy',
          optionB: 'Deep Copy: Slower $O(n)$ recursive traversal and heap allocations'
        },
        {
          aspect: 'Bytecode & Memory Allocation',
          optionA: 'Object.clone(): Native C++ routine performs direct JVM heap bitwise memory block copy',
          optionB: 'Copy Constructor: Emits new, invokespecial <init>, and executes standard validation logic'
        },
        {
          aspect: 'Final Fields Handling',
          optionA: 'clone(): Cannot reassign blank final reference fields to deep copies (compiler error)',
          optionB: 'Copy Constructor: Elegantly assigns final reference fields during object construction'
        },
        {
          aspect: 'Big-O Time & Space Complexity',
          optionA: 'Shallow: $O(1)$ Time bitwise copy, $O(1)$ Auxiliary Space (single instance on heap)',
          optionB: 'Deep: $O(N)$ Time to instantiate $N$ reachable nodes, $O(N)$ Auxiliary Space on heap'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Calling `super.clone()` without declaring `implements Cloneable`.',
        whyItHappens: 'Assuming that because `clone()` is declared in `Object`, any class can call it.',
        howToFix: 'Add `implements Cloneable` to the class declaration. If omitted, the JVM throws `CloneNotSupportedException` at runtime.'
      },
      {
        mistake: 'Believing that `super.clone()` automatically performs a deep copy of nested objects.',
        whyItHappens: 'Thinking cloning duplicates everything reachable in the object graph.',
        howToFix: '`super.clone()` is strictly shallow. You must explicitly deep-clone every mutable reference field inside your `clone()` override.'
      },
      {
        mistake: 'Assuming `arr.clone()` creates independent copies of objects inside the array.',
        whyItHappens: 'Seeing `arr.clone()` produce a new array reference.',
        howToFix: 'The array container is cloned, but the slots inside still point to the same element objects. You must instantiate new elements in a loop for a deep copy.'
      },
      {
        mistake: 'Not casting the result of `clone()`.',
        whyItHappens: 'Writing `MyClass copy = super.clone();`.',
        howToFix: '`super.clone()` returns `Object`. You must cast it: `(MyClass) super.clone()`. In your own class\'s public `clone()`, use covariant return type `public MyClass clone()`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Unimplemented Cloneable Runtime Failure',
        problemStatement: 'What happens when running this code?',
        code: `class Box {
    int val = 10;
    public Box copy() throws CloneNotSupportedException {
        return (Box) super.clone();
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            Box b = new Box();
            Box b2 = b.copy();
            System.out.println(b2.val);
        } catch (CloneNotSupportedException e) {
            System.out.println("CAUGHT CLONE ERROR");
        }
    }
}`,
        options: [
          '10',
          'CAUGHT CLONE ERROR',
          'Compilation Error: super.clone() is protected',
          'NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'Did Box implement the Cloneable marker interface?',
        solution: 'CAUGHT CLONE ERROR',
        explanation: '`Box` calls `super.clone()` but fails to declare `implements Cloneable`. When `Object.clone()` executes, the JVM checks if the object implements `Cloneable`. Since it does not, it throws `CloneNotSupportedException`, which is caught and prints "CAUGHT CLONE ERROR".'
      },
      {
        title: 'Puzzle 2: Shallow Copy Mutation Leak Tracing',
        problemStatement: 'What does this program print?',
        code: `class Engine {
    int hp = 200;
}

class Car implements Cloneable {
    Engine engine = new Engine();
    int year = 2020;

    @Override
    public Car clone() {
        try {
            return (Car) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Car c1 = new Car();
        Car c2 = c1.clone();

        c2.year = 2025;
        c2.engine.hp = 350;

        System.out.print(c1.year + "-" + c1.engine.hp);
    }
}`,
        options: [
          '2020-200',
          '2020-350',
          '2025-350',
          '2025-200'
        ],
        correctOptionIndex: 1,
        hint: 'c1.clone() is a shallow copy. Primitive field year is copied, but engine reference is shared.',
        solution: '2020-350',
        explanation: '`year` is a primitive int, so `c2.year = 2025` does not affect `c1.year` (remains 2020). However, `engine` is a reference field. Because `clone()` is shallow, `c1.engine` and `c2.engine` point to the exact same `Engine` object on the heap. Mutating `c2.engine.hp = 350` mutates `c1.engine.hp`. Output: "2020-350".'
      },
      {
        title: 'Puzzle 3: Array of References Cloning Trap',
        problemStatement: 'What is printed to the console?',
        code: `class Counter {
    int count = 5;
}

public class Main {
    public static void main(String[] args) {
        Counter[] arr1 = new Counter[]{ new Counter() };
        Counter[] arr2 = arr1.clone();

        arr2[0].count = 50;

        System.out.print((arr1 == arr2) + " ");
        System.out.print(arr1[0].count);
    }
}`,
        options: [
          'false 5',
          'false 50',
          'true 50',
          'Compilation Error: arrays cannot be cloned'
        ],
        correctOptionIndex: 1,
        hint: 'arr1.clone() allocates a new array object, but what about the Counter objects inside?',
        solution: 'false 50',
        explanation: '`arr1.clone()` creates a new array object on the heap, so `arr1 == arr2` is `false`. However, the array elements are references copied shallowly. `arr1[0]` and `arr2[0]` point to the same `Counter` instance. Modifying `arr2[0].count = 50` alters `arr1[0].count`. Output: "false 50".'
      },
      {
        title: 'Puzzle 4: Primitive Array Clone Independence',
        problemStatement: 'What does this program print?',
        code: `public class Main {
    public static void main(String[] args) {
        int[] original = {10, 20, 30};
        int[] copy = original.clone();
        copy[0] = 99;

        System.out.print(original[0] + " " + copy[0]);
    }
}`,
        options: [
          '10 99',
          '99 99',
          '10 10',
          'Compilation Error: int[] has no clone method'
        ],
        correctOptionIndex: 0,
        hint: 'For primitive arrays, is cloning the array elements equivalent to a deep copy?',
        solution: '10 99',
        explanation: 'For primitive arrays (`int[]`), the elements are primitive values, not references. When the array is cloned, each primitive int value is copied. Modifying `copy[0]` has no effect on `original[0]`. Output: "10 99".'
      },
      {
        title: 'Puzzle 5: Deep Clone Implementation Tracing',
        problemStatement: 'What is printed by this deep clone implementation?',
        code: `class Battery implements Cloneable {
    int mah;
    Battery(int mah) { this.mah = mah; }
    @Override public Battery clone() {
        try { return (Battery) super.clone(); }
        catch (CloneNotSupportedException e) { return null; }
    }
}

class Phone implements Cloneable {
    Battery b;
    Phone(Battery b) { this.b = b; }
    @Override public Phone clone() {
        try {
            Phone p = (Phone) super.clone();
            p.b = this.b.clone(); // Explicit deep clone
            return p;
        } catch (CloneNotSupportedException e) { return null; }
    }
}

public class Main {
    public static void main(String[] args) {
        Phone p1 = new Phone(new Battery(4000));
        Phone p2 = p1.clone();
        p2.b.mah = 5000;

        System.out.print(p1.b.mah + " " + p2.b.mah);
    }
}`,
        options: [
          '4000 5000',
          '5000 5000',
          '4000 4000',
          'NullPointerException'
        ],
        correctOptionIndex: 0,
        hint: 'Notice that Phone.clone() explicitly clones the Battery object.',
        solution: '4000 5000',
        explanation: 'Because `Phone.clone()` explicitly deep-clones the `Battery` field (`p.b = this.b.clone()`), `p1` and `p2` own completely independent `Battery` instances on the heap. Modifying `p2.b.mah` does not affect `p1`. Output: "4000 5000".'
      },
      {
        title: 'Puzzle 6: Constructor Bypassing via clone()',
        problemStatement: 'How many times does the constructor print "CONSTRUCTED"?',
        code: `class Item implements Cloneable {
    public Item() {
        System.out.print("CONSTRUCTED-");
    }
    @Override
    public Item clone() {
        try {
            return (Item) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Item a = new Item();
        Item b = a.clone();
    }
}`,
        options: [
          'CONSTRUCTED-CONSTRUCTED-',
          'CONSTRUCTED-',
          'Prints nothing',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Does Object.clone() invoke constructors when instantiating the cloned object?',
        solution: 'CONSTRUCTED-',
        explanation: '`Object.clone()` is a native JVM mechanism that allocates memory and copies fields directly without invoking any constructor! Therefore, the constructor only runs once (when `new Item()` executes), printing "CONSTRUCTED-".'
      },
      {
        title: 'Puzzle 7: Covariant Return Type in clone()',
        problemStatement: 'Does this code compile without an explicit cast at the call site?',
        code: `class Document implements Cloneable {
    String text = "Draft";

    @Override
    public Document clone() { // Covariant return!
        try {
            return (Document) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Document doc1 = new Document();
        Document doc2 = doc1.clone(); // No (Document) cast here!
        System.out.println(doc2.text);
    }
}`,
        options: [
          'Draft',
          'Compilation Error: clone() must return Object',
          'ClassCastException at runtime',
          'Prints: null'
        ],
        correctOptionIndex: 0,
        hint: 'In Java 5+, can an overriding method narrow the return type (covariant return)?',
        solution: 'Draft',
        explanation: 'Java supports covariant return types. `Document.clone()` declares `public Document clone()` instead of `Object`. The caller can assign `doc1.clone()` directly to `Document doc2` without casting. It compiles cleanly and prints "Draft".'
      },
      {
        title: 'Puzzle 8: Copy Constructor State Isolation',
        problemStatement: 'What does this program print?',
        code: `class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    Point(Point other) { this.x = other.x; this.y = other.y; }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(10, 20);
        Point p2 = new Point(p1);
        p2.x = 99;

        System.out.print((p1 == p2) + " p1.x=" + p1.x + " p2.x=" + p2.x);
    }
}`,
        options: [
          'false p1.x=10 p2.x=99',
          'false p1.x=99 p2.x=99',
          'true p1.x=99 p2.x=99',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'The copy constructor creates a brand new Point instance.',
        solution: 'false p1.x=10 p2.x=99',
        explanation: '`new Point(p1)` invokes the copy constructor, which allocates a brand new `Point` object on the heap (`p1 == p2` is false) and copies `x` and `y`. Modifying `p2.x` does not touch `p1.x`. Output: "false p1.x=10 p2.x=99".'
      },
      {
        title: 'Puzzle 9: Object Array Cloning and Element Mutation Trap',
        problemStatement: 'What does this program print?',
        code: `class Item {
    int price;
    Item(int p) { this.price = p; }
}

public class Main {
    public static void main(String[] args) {
        Item[] original = { new Item(100), new Item(200) };
        Item[] copy = original.clone();

        copy[0].price = 999;
        copy[1] = new Item(888);

        System.out.println(original[0].price + " " + original[1].price + " " + (original == copy));
    }
}`,
        options: [
          '999 200 false',
          '100 200 false',
          '999 888 false',
          '100 200 true'
        ],
        correctOptionIndex: 0,
        hint: 'original.clone() creates a new array reference, but does it copy the Item objects or just their pointers?',
        solution: '999 200 false',
        explanation: '`original.clone()` creates a new array object (`original == copy` is false), but it is a shallow copy! `original[0]` and `copy[0]` point to the exact same `Item` instance on the heap; mutating `copy[0].price = 999` directly modifies `original[0].price`. However, `copy[1] = new Item(888)` merely rebinds slot 1 of the new array to a brand new object, leaving `original[1]` pointing to the old item with price 200. Output: "999 200 false".'
      },
      {
        title: 'Puzzle 10: Final Field Deep Copying: Copy Constructor vs Cloneable',
        problemStatement: 'What is the compilation and execution outcome of this program?',
        code: `class Engine {
    int hp;
    Engine(int hp) { this.hp = hp; }
    Engine(Engine other) { this.hp = other.hp; }
}

class Car {
    final Engine engine;
    Car(Engine e) { this.engine = e; }
    Car(Car other) {
        this.engine = new Engine(other.engine); // Deep copy of final field!
    }
}

public class Main {
    public static void main(String[] args) {
        Car c1 = new Car(new Engine(300));
        Car c2 = new Car(c1);
        c2.engine.hp = 450;

        System.out.println(c1.engine.hp + " " + c2.engine.hp + " " + (c1.engine == c2.engine));
    }
}`,
        options: [
          '300 450 false',
          '450 450 false',
          '300 450 true',
          'Compilation Error: Cannot assign final field engine in Car(Car)'
        ],
        correctOptionIndex: 0,
        hint: 'Can final fields be initialized in a copy constructor? Does this create an independent Engine?',
        solution: '300 450 false',
        explanation: 'A copy constructor is a genuine constructor, so it is fully permitted to initialize blank final instance fields (`this.engine = new Engine(...)`). This successfully produces a deep copy of the final reference field. When `c2.engine.hp` is changed to 450, `c1.engine.hp` remains 300, and `c1.engine == c2.engine` is false. This demonstrates why Joshua Bloch recommends copy constructors over `clone()`: `clone()` cannot reassign final fields.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the precise difference between a shallow copy and a deep copy in Java?',
        answer: 'In a shallow copy, the fields of an object are duplicated by copying their raw bits: primitive fields (ints, doubles) receive independent value copies, but reference fields simply copy the pointer address. As a result, both the original object and the shallow clone share references to the exact same child objects on the heap; mutating a child object through either reference affects both. In a deep copy, all referenced child objects (and their descendants, recursively) are newly instantiated and populated, producing two completely autonomous, decoupled object graphs where mutations in one cannot impact the other.',
        followUp: 'When is a shallow copy completely safe and sufficient?',
        followUpAnswer: 'A shallow copy is 100% safe if all fields are primitive types or immutable reference types (such as String, Integer, or custom immutable classes), because immutable objects cannot be mutated anyway.',
        keyPhrases: [
          'Bitwise field copying',
          'Shared reference pointers vs independent instances',
          'Mutation side-effects in shallow copies',
          'Safe shallow copy with immutable fields'
        ],
        commonMistakeAnswer: 'Saying shallow copies are stored on the stack and deep copies are stored on the heap.'
      },
      {
        question: 'Why does Joshua Bloch advise against implementing Cloneable and Object.clone() in Effective Java?',
        answer: 'In Effective Java (Item 13), Bloch describes `Cloneable` as one of the most poorly designed parts of Java: 1) The interface `Cloneable` contains no methods; instead, it modifies the behavior of a `protected` method in `Object` (an atypical, confusing use of an interface). 2) `Object.clone()` creates objects without invoking constructors, bypassing invariant validation and security checks. 3) It forces callers to handle checked `CloneNotSupportedException`. 4) It returns `Object`, requiring casts prior to Java 5. 5) Default cloning is shallow, creating dangerous shared-state bugs. Bloch recommends Copy Constructors or Static Copy Factories instead.',
        followUp: 'What is the only scenario where Bloch endorses using .clone()?',
        followUpAnswer: 'Cloning arrays (`array.clone()`), because array cloning is fast, idiomatic, synthesizes a public covariant clone method, and requires no casting.',
        keyPhrases: [
          'Effective Java Item 13',
          'Bypassing constructors',
          'Extralinguistic object creation',
          'Copy constructor superiority'
        ],
        commonMistakeAnswer: 'Believing Cloneable is the only legal way to duplicate objects in Java.'
      },
      {
        question: 'What happens if a class invokes super.clone() without implementing Cloneable?',
        answer: 'If a class invokes `super.clone()` and the runtime instance does not implement `java.lang.Cloneable`, `Object.clone()` throws a checked `java.lang.CloneNotSupportedException`. Even though `clone()` is declared in `java.lang.Object`, the JVM natively inspects the calling object\'s type to verify it implements the `Cloneable` marker interface before allowing memory duplication.',
        followUp: 'Why is CloneNotSupportedException a checked exception rather than an unchecked runtime exception?',
        followUpAnswer: 'It was designed in Java 1.0 before modern exception best practices were established. Today, it is widely considered an architectural flaw because if a class implements Cloneable, the exception can never actually be thrown.',
        keyPhrases: [
          'CloneNotSupportedException',
          'JVM native type inspection',
          'Checked exception baggage',
          'Marker interface validation'
        ],
        commonMistakeAnswer: 'Thinking the compiler prevents you from calling clone() if Cloneable is missing.'
      },
      {
        question: 'What is a Copy Constructor, and why is it preferred over Object.clone()?',
        answer: 'A copy constructor is a constructor that accepts a single parameter of the same class type: `public User(User other) { this.name = other.name; this.profile = new Profile(other.profile); }`. It is overwhelmingly preferred because: 1) It does not rely on a flawed extralinguistic mechanism; it uses standard constructor execution, ensuring validation logic and `final` field assignments execute properly. 2) It does not throw checked exceptions. 3) It does not require casting. 4) It allows deep copying cleanly. 5) It can accept an interface type (e.g. `public HashSet(Collection c)` is a copy constructor that can copy from any collection).',
        followUp: 'What is a Copy Factory, and what additional advantage does it provide?',
        followUpAnswer: 'A static copy factory (e.g., `User.copyOf(other)`) provides all the benefits of a copy constructor, plus the ability to return cached instances or specialized subclass instances.',
        keyPhrases: [
          'Standard constructor execution',
          'Final field compatibility',
          'No checked exceptions or casting',
          'Interface-based copy polymorphism'
        ],
        commonMistakeAnswer: 'Assuming copy constructors require Cloneable implementation.'
      },
      {
        question: 'Why does Object.clone() cause problems with final reference fields during deep cloning?',
        answer: 'In a deep clone, you must reassign mutable reference fields to newly duplicated instances after `super.clone()` executes (e.g., `cloned.address = this.address.clone();`). However, if `address` was declared `final`, the Java compiler strictly prohibits reassigning a `final` field outside of a constructor! Because `clone()` is a regular method (not a constructor), you cannot reassign `final` fields, making genuine deep cloning impossible with `clone()` when using properly encapsulated immutable references.',
        followUp: 'How does a copy constructor solve this final field issue?',
        followUpAnswer: 'A copy constructor is a true constructor, so it can freely initialize and assign `final` fields to newly created deep-copied objects.',
        keyPhrases: [
          'Final field reassignment prohibition',
          'Incompatibility between clone() and final',
          'Constructor initialization privilege',
          'Encapsulation compromise'
        ],
        commonMistakeAnswer: 'Thinking reflection is the recommended fix to overwrite final fields in clone().'
      },
      {
        question: 'What is covariant return type, and how does it improve clone() in Java 5+?',
        answer: 'Prior to Java 5, an overriding method was required to match the exact return type of the superclass method, meaning `clone()` had to return `Object`, forcing every caller to write an explicit cast: `MyClass copy = (MyClass) orig.clone();`. Java 5 introduced covariant return types, allowing an overriding method to narrow the declared return type to any subtype of the overridden return type. A class can now declare `public MyClass clone()`, allowing callers to write `MyClass copy = orig.clone();` with full compile-time type safety and zero casts.',
        followUp: 'Can an overriding method broaden the return type?',
        followUpAnswer: 'No, return types can only be narrowed (covariant), never broadened (contravariant).',
        keyPhrases: [
          'Covariant return type (Java 5+)',
          'Eliminating caller downcasts',
          'Subtype return narrowing',
          'Compile-time type safety'
        ],
        commonMistakeAnswer: 'Believing that clone() in classes must always return Object.'
      },
      {
        question: 'How does array.clone() behave on an array of primitive types versus an array of reference types?',
        answer: 'For a primitive array (e.g. `int[]`), `.clone()` creates a new array object and copies the primitive values directly. Because primitive values have no pointers, the clone is functionally equivalent to a deep copy: modifying elements in the cloned array has zero impact on the original. For a reference array (e.g. `User[]`), `.clone()` creates a new array object, but copies only the reference addresses. Both arrays point to the exact same `User` objects on the heap. Mutating an element object through one array mutates it for both.',
        followUp: 'How do you perform a genuine deep copy of an array of objects?',
        followUpAnswer: 'Allocate a new array of the same length, iterate through each slot, and instantiate a new object (via copy constructor) for each element: `copy[i] = new User(orig[i]);`.',
        keyPhrases: [
          'Primitive array clone is independent',
          'Reference array clone is shallow',
          'Duplicated container vs shared elements',
          'Iterative re-instantiation requirement'
        ],
        commonMistakeAnswer: 'Thinking that array.clone() deep-copies reference objects inside.'
      },
      {
        question: 'Why is Object.clone() declared with protected visibility in java.lang.Object?',
        answer: '`Object.clone()` is declared `protected` to intentionally PREVENT external callers from blindly cloning arbitrary objects. An author of a class must deliberately decide whether their class is safe to clone, implement `Cloneable`, and override `clone()` with `public` visibility. If `Object.clone()` were public, any client could clone any object without the class author\'s permission or preparation, causing severe security leaks and shared-state corruption in classes not designed for cloning.',
        followUp: 'Can a subclass in a different package invoke protected clone() on an instance of a sibling class?',
        followUpAnswer: 'No! In Java, protected methods can only be invoked on instances of the calling class or its subclasses, not on arbitrary sibling instances.',
        keyPhrases: [
          'Protected access protection',
          'Class author opt-in requirement',
          'Security and encapsulation preservation',
          'Widening to public in subclasses'
        ],
        commonMistakeAnswer: 'Claiming clone() is protected because it is a native C++ method.'
      },
      {
        question: 'How does deep cloning handle cyclic or recursive object graphs (e.g., GraphNode A points to B, and B points to A)?',
        answer: 'Naively implementing recursive deep cloning on cyclic graphs causes an infinite recursion loop, resulting in a `StackOverflowError`. To deep-clone a cyclic graph safely, the cloning algorithm must maintain an identity tracking map (such as an array or map of `[originalReference -> clonedReference]`). Before duplicating a node, the algorithm checks if the node has already been cloned: if it has, it reuses the existing clone reference; if not, it instantiates the clone, registers it in the map, and then clones its neighbors.',
        followUp: 'What standard Java serialization mechanism automatically handles circular graphs?',
        followUpAnswer: 'Java Object Serialization (`ObjectOutputStream` and `ObjectInputStream`) maintains an internal object table, automatically handling circular graphs during deep serialization copies.',
        keyPhrases: [
          'Cyclic graph infinite recursion',
          'StackOverflowError hazard',
          'Identity tracking map (visited set)',
          'Java serialization object table'
        ],
        commonMistakeAnswer: 'Assuming deep copy cannot ever be performed on cyclic graphs.'
      },
      {
        question: 'What is defensive copying, and how does it relate to cloning in immutable class design?',
        answer: 'Defensive copying is the practice of creating new copies of mutable objects whenever they are received as arguments into a constructor/setter or returned by a getter. For example, if an immutable class accepts a `Date` or `int[]` array in its constructor, saving the reference directly allows the caller to mutate the internal state later. By performing a defensive copy in the constructor (`this.data = data.clone();`) and in the getter (`return this.data.clone();`), the internal state is shielded from outside tampering.',
        followUp: 'Why should you NOT use clone() for defensive copying of arguments in a constructor?',
        followUpAnswer: 'Because if the argument type is non-final (like Date), a malicious caller could pass an untrusted subclass whose overridden clone() method captures internal state or returns a trojan instance. Use constructors instead.',
        keyPhrases: [
          'Defensive copying',
          'Shielding internal mutable state',
          'Constructor argument protection',
          'Getter return protection'
        ],
        commonMistakeAnswer: 'Thinking defensive copying means making all variables private static.'
      },
      {
        question: 'Can you use Java serialization to create a deep copy of an object graph? What are the pros and cons?',
        answer: 'Yes. By serializing an object graph to a byte array using `ByteArrayOutputStream` and `ObjectOutputStream`, and immediately deserializing it using `ObjectInputStream`, the JVM constructs a completely independent deep copy of the entire graph, automatically handling cyclic references. The pro is simplicity: it requires no manual cloning logic. The major cons are performance (it is roughly 10x to 100x slower than direct copy constructors due to reflection and byte stream overhead) and the requirement that every class in the graph must implement `Serializable`.',
        followUp: 'What modern alternative exists in Java microservices instead of binary serialization?',
        followUpAnswer: 'Deep copying via JSON/Protobuf serializers or dedicated high-performance cloning libraries.',
        keyPhrases: [
          'Serialization deep copy',
          'Automatic cyclic graph resolution',
          'Severe performance overhead',
          'Serializable requirement'
        ],
        commonMistakeAnswer: 'Thinking serialization deep copy works even if classes are not Serializable.'
      }
    ],
    miniQuiz: [
      {
        question: 'What type of copy does the default `Object.clone()` method perform?',
        options: [
          'Deep copy of all fields and references.',
          'Shallow copy (primitives copied by value, references copied by address).',
          'Lazy copy evaluated on demand.',
          'Encrypted copy.'
        ],
        correctIndex: 1,
        explanation: 'Object.clone() performs a bitwise shallow copy of fields.'
      },
      {
        question: 'What happens if a class calls `super.clone()` without declaring `implements Cloneable`?',
        options: [
          'The code fails to compile.',
          'The JVM throws a CloneNotSupportedException at runtime.',
          'The clone operation succeeds normally.',
          'The returned object is null.'
        ],
        correctIndex: 1,
        explanation: 'If the object does not implement Cloneable, super.clone() throws a runtime CloneNotSupportedException.'
      },
      {
        question: 'What is the primary danger of a shallow copy when an object has mutable reference fields?',
        options: [
          'The clone operation takes too much CPU memory.',
          'Mutating a nested object through the clone alters the original object\'s state.',
          'The garbage collector immediately deletes the clone.',
          'The original object is locked from reading.'
        ],
        correctIndex: 1,
        explanation: 'Because reference fields share pointers to the same nested objects, mutating a child in one affects both instances.'
      },
      {
        question: 'Why does Joshua Bloch recommend Copy Constructors over `Object.clone()` in Effective Java?',
        options: [
          'Copy constructors run faster in the compiler.',
          'Copy constructors use normal constructor execution, respect final fields, avoid checked exceptions, and require no casts.',
          'Copy constructors are required by the JVM.',
          'Object.clone() has been removed in Java 17.'
        ],
        correctIndex: 1,
        explanation: 'Copy constructors avoid all the pitfalls of Cloneable: no casting, no checked exceptions, and standard constructor validation.'
      },
      {
        question: 'What happens when you clone an array of objects: `User[] copy = users.clone();`?',
        options: [
          'A new array is created and all User objects are deep-copied.',
          'A new array is created, but its slots point to the same User objects (shallow copy).',
          'Compile-time error: arrays do not have a clone method.',
          'The original array is cleared.'
        ],
        correctIndex: 1,
        explanation: 'Array cloning creates a new array container, but reference elements inside remain shared.'
      },
      {
        question: 'Why does `Object.clone()` cause issues with `final` reference fields during deep cloning?',
        options: [
          'Final fields cannot be read by clone().',
          'Final fields cannot be reassigned outside of a constructor, preventing deep-clone reassignment.',
          'Classes with final fields cannot implement Cloneable.',
          'Final fields cause OutOfMemoryErrors.'
        ],
        correctIndex: 1,
        explanation: 'A deep clone must reassign reference fields to cloned instances, which Java forbids on final fields outside constructors.'
      },
      {
        question: 'What access modifier is given to `clone()` in java.lang.Object?',
        options: [
          'public',
          'protected',
          'private',
          'package-private'
        ],
        correctIndex: 1,
        explanation: 'In Object, clone() is protected to require class authors to explicitly opt-in and override it as public.'
      },
      {
        question: 'What is a "covariant return type" when overriding clone() in class `Employee`?',
        options: [
          'Declaring `public Employee clone()` instead of `public Object clone()`.',
          'Returning an array of Employees.',
          'Returning void.',
          'Allowing clone() to accept parameters.'
        ],
        correctIndex: 0,
        explanation: 'Covariant return allows the overriding method in Employee to return Employee rather than Object, eliminating caller casts.'
      },
      {
        question: 'Does `Object.clone()` execute any constructors of the cloned class?',
        options: [
          'Yes, it always invokes the no-argument constructor.',
          'No, it bypasses constructors completely via native heap memory copy.',
          'Yes, it invokes all constructors in the hierarchy.',
          'Yes, but only superclass constructors.'
        ],
        correctIndex: 1,
        explanation: 'Object.clone() allocates memory and copies fields directly without running any constructor code.'
      },
      {
        question: 'When is a shallow copy completely safe and identical in behavior to a deep copy?',
        options: [
          'When all fields are private.',
          'When all fields are primitives or immutable reference types (like String).',
          'When the class has no methods.',
          'When the object is stored in a static variable.'
        ],
        correctIndex: 1,
        explanation: 'If all fields are primitive or immutable (e.g. String), the shared objects cannot be mutated, making shallow copying 100% safe.'
      }
    ]
  }
};
