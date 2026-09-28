import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 7: MODERN OOP & MISCELLANEOUS CONCEPTS
// High-Quality Curriculum Covering Java 16/17/21+ Modern Features
// Lessons 7.1 to 7.5
// ============================================================

export const oop15Lessons: Record<string, DetailedLesson> = {
  "java-records": {
    "id": "java-records",
    "moduleId": "java-oop-misc",
    "moduleTitle": "7. Modern OOP & Miscellaneous Concepts",
    "lessonNumber": "Lesson 7.1",
    "title": "Java Records (record): Modern Immutability & Rep-Leaks",
    "subtitle": "Immutable data carriers, compact & canonical constructors, accessor semantics, and defensive copying",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "A **Record** in Java (standardized in Java 16 LTS via JEP 395) is a specialized class form designed specifically to act as a transparent carrier for immutable data. Instead of writing verbose boilerplate—private final fields, a multi-argument constructor, getter methods, `equals()`, `hashCode()`, and `toString()`—a single record declaration produces all these components automatically.\n\nUnder the JVM execution model, declaring `record Point(int x, int y)` instructs the compiler to generate a `final` class that directly extends `java.lang.Record`. The compiler creates a private final field for each component in the record header, a public canonical constructor, and public accessor methods (`x()` and `y()`, omitting the legacy JavaBeans `get` prefix). The bytecode guarantees that records cannot be extended and cannot extend other classes, preserving their data-carrier invariants.\n\nJava Records are governed by three fundamental architectural rules:\n1. **Fixed Class Hierarchy**: Every record implicitly extends `java.lang.Record` and is implicitly `final`. Because Java enforces single class inheritance, a record cannot extend any other class, nor can any class extend a record. However, records can implement an arbitrary number of interfaces.\n2. **Compact Constructors**: Records introduce compact constructors (`public Point { ... }`) where the parameter list is omitted. Compact constructors enable developers to perform parameter validation and defensive normalization before the implicit assignment of fields occurs.\n3. **Shallow Immutability Boundary**: A record guarantees that its component references are `final` and cannot be reassigned. However, if a record component references a mutable object (such as an array `int[]` or a `java.util.List`), external callers can mutate the internal state of that object unless explicit defensive copying is implemented.",
    "coreExplanation": [],
    "diagram": "",
    "codeSnippet": {
      "title": "Java Records (record): Modern Immutability & Rep-Leaks",
      "code": "// Example code",
      "lineByLineExplanation": [
        {
          "line": "Declaration & Setup",
          "explanation": "Establishes modern OOP type structures and compiler constraints."
        },
        {
          "line": "Execution & Validation",
          "explanation": "Enforces state immutability, pattern matching, or behavioral contracts."
        },
        {
          "line": "Output & Inspection",
          "explanation": "Demonstrates runtime behavior and type safety guarantees."
        }
      ],
      "output": "// Output demonstrating proper execution and invariant preservation"
    },
    "codeExamples": [],
    "cheatSheet": {
      "summary": "A **Record** in Java (standardized in Java 16 LTS via JEP 395) is a specialized class form designed specifically to act as a transparent carrier for immutable data. Instead of writing verbose boilerplate—private final fields, a multi-argument constructor, getter methods, `equals()`, `hashCode()`, and `toString()`—a single record declaration produces all these components automatically.",
      "rules": []
    },
    "beginnerMistakes": [],
    "practiceProblems": [
      {
        "title": "Problem 1: Basic Record Declaration & Accessor Test",
        "problemStatement": "Declare a record `BookRecord(String title, double price)`. Instantiate with ('Clean Code', 35.0), and print title using accessor, price, and the default toString().",
        "hint": "Use book.title() and book.price(), not getTitle().",
        "solution": "record BookRecord(String title, double price) {}\npublic class Main {\n    public static void main(String[] args) {\n        BookRecord b = new BookRecord(\"Clean Code\", 35.0);\n        System.out.println(b.title() + \" \" + b.price());\n        System.out.println(b);\n    }\n}",
        "explanation": "Shows automatic field, constructor, accessor, and toString() generation."
      },
      {
        "title": "Problem 2: Compact Constructor Validation",
        "problemStatement": "Create a record `Score(int value)` with a compact constructor that throws `IllegalArgumentException` if value is not between 0 and 100.",
        "hint": "Inside compact constructor, simply write 'if (value < 0 || value > 100) throw ...'",
        "solution": "record Score(int value) {\n    public Score {\n        if (value < 0 || value > 100) throw new IllegalArgumentException(\"Invalid score: \" + value);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Score s = new Score(95);\n        System.out.println(s.value());\n    }\n}",
        "explanation": "Compact constructors provide clean pre-assignment validation."
      },
      {
        "title": "Problem 3: Defensive Copying of Collections in Records",
        "problemStatement": "Create a record `ImmutableTags(List<String> tags)`. In the compact constructor, use `List.copyOf(tags)` to prevent external mutations from modifying the record.",
        "hint": "tags = (tags != null) ? List.copyOf(tags) : List.of();",
        "solution": "import java.util.*;\nrecord ImmutableTags(List<String> tags) {\n    public ImmutableTags {\n        tags = (tags != null) ? List.copyOf(tags) : List.of();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(List.of(\"A\", \"B\"));\n        ImmutableTags it = new ImmutableTags(list);\n        list.add(\"C\");\n        System.out.println(it.tags().size());\n    }\n}",
        "explanation": "Defensive copy in compact constructor shields the record from external collection mutations."
      },
      {
        "title": "Problem 4: Overloaded Constructor Delegating to Canonical",
        "problemStatement": "Create a record `Vector2D(double x, double y)`. Provide an overloaded constructor `Vector2D()` that initializes both x and y to 0.0 using `this(0.0, 0.0)`.",
        "hint": "Non-canonical constructor must call this(0.0, 0.0).",
        "solution": "record Vector2D(double x, double y) {\n    public Vector2D() { this(0.0, 0.0); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vector2D v = new Vector2D();\n        System.out.println(v.x() + \" \" + v.y());\n    }\n}",
        "explanation": "Overloaded constructors must delegate to canonical constructor."
      },
      {
        "title": "Problem 5: Record Implementing an Interface",
        "problemStatement": "Create an interface `Printable { void printDetails(); }`. Create a record `User(String name)` implementing `Printable` and printing 'User: ' + name.",
        "hint": "Records can implement interfaces with standard '@Override public void printDetails()'.",
        "solution": "interface Printable { void printDetails(); }\nrecord User(String name) implements Printable {\n    @Override public void printDetails() { System.out.println(\"User: \" + name); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new User(\"Sara\").printDetails();\n    }\n}",
        "explanation": "Demonstrates multiple interface implementation capability on records."
      },
      {
        "title": "Problem 6: Value Equality Verification",
        "problemStatement": "Prove that two distinct heap instances of `record Color(int r, int g, int b)` evaluate to true for `.equals()` and have identical `.hashCode()`.",
        "hint": "Instantiate two Color records with identical values and verify equals and hashCode equality.",
        "solution": "record Color(int r, int g, int b) {}\npublic class Main {\n    public static void main(String[] args) {\n        Color c1 = new Color(255, 0, 0);\n        Color c2 = new Color(255, 0, 0);\n        System.out.println(c1.equals(c2) + \" \" + (c1.hashCode() == c2.hashCode()));\n    }\n}",
        "explanation": "The compiler-synthesized equals() and hashCode() operate on component values."
      },
      {
        "title": "Problem 7: Local Record Inside Method",
        "problemStatement": "Inside `main()`, declare a local record `Summary(String text, int count)`. Create an instance and print text and count.",
        "hint": "Records can be declared locally inside any method.",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        record Summary(String text, int count) {}\n        Summary s = new Summary(\"Total\", 42);\n        System.out.println(s.text() + \" = \" + s.count());\n    }\n}",
        "explanation": "Local records are ideal for temporary intermediate data transformations."
      },
      {
        "title": "Problem 8: Static Members and Factory Methods in Record",
        "problemStatement": "Add a static factory method `origin()` to `record Point(int x, int y)` returning `new Point(0, 0)`. Test in main().",
        "hint": "Declare 'public static Point origin() { return new Point(0, 0); }'.",
        "solution": "record Point(int x, int y) {\n    public static Point origin() { return new Point(0, 0); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Point p = Point.origin();\n        System.out.println(p);\n    }\n}",
        "explanation": "Records can declare static methods and static constants."
      },
      {
        "title": "Problem 9: Custom Method on Record",
        "problemStatement": "Add a custom method `double area()` to `record RectangleRecord(double width, double height)` returning width * height.",
        "hint": "Custom methods can access component fields directly (width * height).",
        "solution": "record RectangleRecord(double width, double height) {\n    public double area() { return width * height; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new RectangleRecord(4, 5).area());\n    }\n}",
        "explanation": "Records support custom domain helper methods."
      },
      {
        "title": "Problem 10: Generic Record Pair",
        "problemStatement": "Create a generic record `Pair<A, B>(A first, B second)`. Instantiate with String and Integer, print both.",
        "hint": "Declare 'record Pair<A, B>(A first, B second) {}'.",
        "solution": "record Pair<A, B>(A first, B second) {}\npublic class Main {\n    public static void main(String[] args) {\n        Pair<String, Integer> p = new Pair<>(\"Age\", 30);\n        System.out.println(p.first() + \": \" + p.second());\n    }\n}",
        "explanation": "Shows full generic type support on records."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is a Java Record, and how does it physically differ from a traditional class?",
        "answer": "A Java Record (standardized in Java 16 LTS) is a specialized class form intended to act as an immutable transparent carrier for data. Unlike a normal class, a record automatically generates private final fields, a canonical constructor, accessors matching component names, equals(), hashCode(), and toString(). In bytecode, it extends java.lang.Record and is strictly final. It cannot declare instance variables outside its header components.",
        "followUp": "Can a record extend another class or be extended?",
        "followUpAnswer": "No. Because every record implicitly extends java.lang.Record and Java supports single class inheritance, a record cannot extend any other class. Furthermore, all records are implicitly final, so no class can extend a record.",
        "keyPhrases": [
          "java.lang.Record",
          "Implicitly final",
          "Transparent data carrier",
          "Component-name accessors"
        ]
      },
      {
        "question": "What is a Compact Constructor in a record, and how does it work?",
        "answer": "A compact constructor is a constructor in a record where the parameter list is completely omitted (e.g. 'public Point { ... }'). It is designed for argument validation and normalization. Inside a compact constructor, you reference parameters directly by name, and at the end of the constructor block, the Java compiler automatically emits the assignments to the record's private final fields.",
        "followUp": "Can you explicitly assign fields with 'this.x = x' inside a compact constructor?",
        "followUpAnswer": "No, explicit assignment to instance fields inside a compact constructor is a compile-time error. The compiler handles the assignment automatically after your validation code finishes.",
        "keyPhrases": [
          "Omitted parameter list",
          "Validation and normalization",
          "Automatic field assignment",
          "Compile-time error on explicit this.x = x"
        ]
      },
      {
        "question": "Are Java Records deeply immutable? Explain the shallow immutability trap.",
        "answer": "No, Java Records are strictly shallowly immutable. The compiler guarantees that all component reference variables are marked 'final', meaning the reference itself cannot be reassigned to point to another object on the heap. However, if a component references an internally mutable object (such as an array 'int[]' or a 'java.util.Date'), the contents of that object can still be mutated by external callers. To achieve deep immutability, developers must use compact constructors to create defensive copies.",
        "followUp": "How would you secure a record with an array component?",
        "followUpAnswer": "In the compact constructor, clone the array: 'arr = (arr != null) ? arr.clone() : new int[0];', and override the accessor 'arr()' to return a clone.",
        "keyPhrases": [
          "Shallow immutability",
          "Final references vs mutable contents",
          "Defensive copying in compact constructor",
          "Accessor override for defensive copy"
        ]
      },
      {
        "question": "How do records differ from Lombok's @Value or @Data annotations?",
        "answer": "Lombok operates via annotation processing at compile-time to generate standard boilerplate bytecode on a regular class. In contrast, Records are a first-class Java language feature backed by JVM bytecode specifications: they extend java.lang.Record, have distinct classfile attributes ('Record' attribute in bytecode), provide built-in serialization safety, and integrate natively with Java pattern matching (record deconstruction in switch).",
        "followUp": "Why is record serialization considered safer than standard Java serialization?",
        "followUpAnswer": "Standard Java serialization bypasses constructors, which has historically caused severe security vulnerabilities. Record deserialization mandates calling the canonical constructor, guaranteeing that all validation and defensive copying rules execute during deserialization.",
        "keyPhrases": [
          "First-class language feature",
          "Classfile Record attribute",
          "Constructor-based deserialization",
          "Native pattern matching"
        ]
      },
      {
        "question": "Can a record implement interfaces? Can it have static members?",
        "answer": "Yes to both. While records cannot extend classes, they can implement any number of interfaces (such as Comparable, Serializable, or custom business interfaces). Records can also declare static fields, static initializers, static methods, and custom instance methods.",
        "followUp": "Can a record declare generic type parameters?",
        "followUpAnswer": "Yes, records can be generic, such as 'public record Pair<T, U>(T first, U second) {}'.",
        "keyPhrases": [
          "Can implement interfaces",
          "Supports static fields and methods",
          "Supports generic type parameters",
          "No instance fields outside header"
        ]
      },
      {
        "question": "Why don't record accessor methods have the 'get' prefix (e.g. x() instead of getX())?",
        "answer": "Java language designers deliberately chose to break away from legacy JavaBeans conventions. A record is a transparent mathematical tuple of data, not a mutable JavaBean with properties. The accessor methods match the component names directly to emphasize mathematical transparency and uniform syntax across pattern matching.",
        "followUp": "Can you manually add a getX() method to a record?",
        "followUpAnswer": "Yes, you can manually declare 'public int getX() { return x(); }', but it is considered an anti-pattern unless required by legacy framework compatibility.",
        "keyPhrases": [
          "Transparent mathematical tuple",
          "Departure from JavaBeans",
          "Uniform component naming",
          "Pattern matching alignment"
        ]
      },
      {
        "question": "Can a record declare an overloaded constructor with different parameters?",
        "answer": "Yes. A record can define custom overloaded constructors, but Java mandates that any non-canonical constructor MUST delegate to the canonical constructor (or another constructor) using 'this(...)' as its first statement. This ensures that all components are initialized predictably.",
        "followUp": "What happens if a non-canonical constructor does not invoke this()?",
        "followUpAnswer": "The compiler produces an error: 'constructor is not canonical, so its first statement must invoke another constructor'.",
        "keyPhrases": [
          "Overloaded constructors allowed",
          "Mandatory delegation to this()",
          "Canonical constructor requirement"
        ]
      },
      {
        "question": "Can a record be declared local inside a method? Can it be an inner class?",
        "answer": "Yes! Records can be declared as local records inside a method body (since Java 16), which is ideal for intermediate data transformation and grouping without polluting the package namespace. When declared inside a class, a record is implicitly static, meaning it never holds a hidden reference to an outer class instance.",
        "followUp": "Does a local record have access to local variables of the enclosing method?",
        "followUpAnswer": "Yes, a local record can capture effectively final local variables from the enclosing method scope.",
        "keyPhrases": [
          "Local records supported",
          "Implicitly static when nested",
          "No hidden outer reference",
          "Intermediate data modeling"
        ]
      },
      {
        "question": "What is Record Pattern Matching (Deconstruction) introduced in Java 21?",
        "answer": "Record Pattern Matching (JEP 440) allows records to be deconstructed into their constituent components directly within 'instanceof' checks and 'switch' expressions: e.g. 'if (obj instanceof Point(int x, int y)) { System.out.println(x + y); }'. This eliminates manual casting and accessor calls, enabling concise structural data matching.",
        "followUp": "Can record patterns be nested?",
        "followUpAnswer": "Yes! E.g. 'if (obj instanceof Order(String id, Point(int x, int y)))' cleanly deconstructs nested record hierarchies in a single expression.",
        "keyPhrases": [
          "JEP 440",
          "Record deconstruction",
          "Pattern matching for switch",
          "Nested record patterns"
        ]
      },
      {
        "question": "Can you customize the equals() and hashCode() methods in a record?",
        "answer": "Yes, you can explicitly override equals(), hashCode(), or toString() inside a record body if you need custom equality semantics or formatting. However, doing so is discouraged unless strictly necessary, because the compiler-generated implementations are already optimized, null-safe, and reflect all components accurately.",
        "followUp": "What is the danger of overriding equals() in a record?",
        "followUpAnswer": "If you override equals() to ignore certain components, the record ceases to be a transparent data carrier, which can violate caller expectations and pattern matching invariants.",
        "keyPhrases": [
          "Custom override permitted",
          "Compiler implementations are optimal",
          "Transparent carrier preservation"
        ]
      },
      {
        "question": "Can a record component be annotated with Bean Validation or JPA annotations?",
        "answer": "Yes. Annotations placed on a record component in the header are propagated by the compiler to the field, accessor method, and constructor parameter, depending on the annotation's @Target meta-annotation. This makes records fully compatible with modern frameworks like Spring Boot, Jackson, and Hibernate.",
        "followUp": "Can a record be a JPA @Entity?",
        "followUpAnswer": "No, JPA entities require a no-arg constructor, non-final classes, and mutable proxying, which violates record immutability. Records are used extensively as DTOs and projection targets, but not as entities.",
        "keyPhrases": [
          "Annotation propagation",
          "Spring Boot & Jackson DTOs",
          "Incompatible with JPA @Entity",
          "No-arg constructor requirement"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which class does every Java Record implicitly extend?",
        "options": [
          "java.lang.Object directly",
          "java.lang.Record",
          "java.lang.Enum",
          "java.lang.DataCarrier"
        ],
        "correctIndex": 1,
        "explanation": "All records implicitly extend java.lang.Record, which in turn extends java.lang.Object."
      },
      {
        "question": "What is the naming convention for accessor methods generated for a record with component 'int age'?",
        "options": [
          "getAge()",
          "isAge()",
          "age()",
          "getAgeValue()"
        ],
        "correctIndex": 2,
        "explanation": "Record accessor methods match the component name exactly (age()), omitting the legacy 'get' prefix."
      },
      {
        "question": "Can a Java record explicitly extend another class like 'record Point(int x) extends Coordinates'?",
        "options": [
          "Yes, if Coordinates is abstract.",
          "No, records implicitly extend java.lang.Record and cannot extend any other class.",
          "Yes, if Coordinates has a no-arg constructor.",
          "Only in Java 21+."
        ],
        "correctIndex": 1,
        "explanation": "Because Java enforces single class inheritance and all records extend java.lang.Record, a record cannot extend any other class."
      },
      {
        "question": "What is true about declaring instance variables inside a record body?",
        "options": [
          "Allowed if marked private.",
          "Allowed if marked final.",
          "Strictly forbidden; only components in the record header can be instance fields.",
          "Allowed if initialized at declaration."
        ],
        "correctIndex": 2,
        "explanation": "Records prohibit declaring instance fields in the body; all instance state must reside in the record header. Only static fields are allowed in the body."
      },
      {
        "question": "What is the primary purpose of a Compact Constructor in a record?",
        "options": [
          "To allow subclasses to override constructor logic.",
          "To validate or normalize arguments before field assignment without repeating boilerplate parameters and assignments.",
          "To instantiate records without allocating heap memory.",
          "To create a no-argument constructor."
        ],
        "correctIndex": 1,
        "explanation": "Compact constructors omit parameter lists to provide a clean space for argument validation and normalization before automatic assignment."
      },
      {
        "question": "What happens if a record has a component of type 'int[]' and external code modifies an array element?",
        "options": [
          "The JVM throws UnsupportedOperationException.",
          "The record's internal array contents are modified because records provide only shallow immutability.",
          "The array is automatically cloned by the JVM.",
          "Compile-time error: arrays are forbidden in records."
        ],
        "correctIndex": 1,
        "explanation": "Records provide shallow immutability: the array reference is final, but the array elements can still be mutated unless defensively copied."
      },
      {
        "question": "Can a record implement an interface?",
        "options": [
          "No, records cannot implement interfaces.",
          "Yes, a record can implement one or more interfaces.",
          "Only marker interfaces like Serializable.",
          "Only functional interfaces."
        ],
        "correctIndex": 1,
        "explanation": "Records can implement any number of interfaces (e.g. Comparable, Serializable, Runnable)."
      },
      {
        "question": "Are records implicitly final in Java?",
        "options": [
          "Yes, all records are final and cannot be subclassed.",
          "No, a record can be extended if declared non-final.",
          "Only if all components are primitives.",
          "Only if explicitly marked with the final keyword."
        ],
        "correctIndex": 0,
        "explanation": "Every record is implicitly final; attempting to extend a record results in a compilation error."
      },
      {
        "question": "What statement must appear first in any overloaded (non-canonical) constructor in a record?",
        "options": [
          "super();",
          "this(...);",
          "validate();",
          "Objects.requireNonNull();"
        ],
        "correctIndex": 1,
        "explanation": "Any non-canonical constructor must delegate to another constructor using this(...) as its first statement."
      },
      {
        "question": "When a record is nested inside an enclosing class, what is its implicit modifier?",
        "options": [
          "implicitly non-static (inner class)",
          "implicitly static",
          "implicitly transient",
          "implicitly abstract"
        ],
        "correctIndex": 1,
        "explanation": "Nested records are implicitly static, meaning they do not hold an implicit reference to an enclosing class instance."
      },
      {
        "question": "How does deserialization of records enhance security compared to normal classes?",
        "options": [
          "Records cannot be serialized.",
          "Record deserialization mandates invocation of the canonical constructor, preventing bypass of validation rules.",
          "Records encrypt data on disk automatically.",
          "Records bypass JVM classloaders."
        ],
        "correctIndex": 1,
        "explanation": "Record deserialization uses the canonical constructor, guaranteeing that constructor validation invariants cannot be bypassed."
      },
      {
        "question": "Which of the following methods is NOT automatically generated by the Java compiler for a record?",
        "options": [
          "equals()",
          "hashCode()",
          "toString()",
          "compareTo()"
        ],
        "correctIndex": 3,
        "explanation": "compareTo() is not generated automatically; to support comparison, the record must implement Comparable and define compareTo()."
      },
      {
        "question": "What is printed by: record Box(int w) {} Box b1 = new Box(5); Box b2 = new Box(5); System.out.println(b1.equals(b2));",
        "options": [
          "false",
          "true",
          "Compilation Error",
          "ClassCastException"
        ],
        "correctIndex": 1,
        "explanation": "The compiler-generated equals() compares all components by value, so b1.equals(b2) evaluates to true."
      },
      {
        "question": "Can a record component be declared with generic types, like 'record Container<T>(T value) {}'?",
        "options": [
          "No, records do not support generics.",
          "Yes, records fully support generic type parameters.",
          "Only bounded wildcards.",
          "Only primitive types."
        ],
        "correctIndex": 1,
        "explanation": "Java records can be generic, allowing type-safe data containers like Container<T>(T value)."
      },
      {
        "question": "What feature introduced in Java 21 allows writing 'if (obj instanceof Point(int x, int y))'?",
        "options": [
          "Virtual Threads",
          "Record Patterns (Deconstruction)",
          "Foreign Function Interface",
          "Sealed Classes"
        ],
        "correctIndex": 1,
        "explanation": "Record Patterns (JEP 440) enable deconstructing records directly inside instanceof and switch expressions."
      }
    ]
  },
  "sealed-classes-interfaces": {
    "id": "sealed-classes-interfaces",
    "moduleId": "java-oop-misc",
    "moduleTitle": "7. Modern OOP & Miscellaneous Concepts",
    "lessonNumber": "Lesson 7.2",
    "title": "Sealed Classes & Interfaces: Constrained Hierarchies & Pattern Matching",
    "subtitle": "Bounded type hierarchies, permits clause, exhaustive pattern matching, and sum types",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "A **Sealed Class or Interface** in Java (standardized in Java 17 LTS via JEP 409) is an object-oriented mechanism that empowers API designers to restrict precisely which other classes or interfaces are permitted to extend or implement them. Prior to Java 17, inheritance was binary: either a class was open to extension by any arbitrary class in any package (default or `public`), or it was locked down completely (`final` or `private` constructor). Sealed classes introduce a powerful middle ground: controlled, exhaustive inheritance hierarchies.\n\nUnder the JVM execution model, declaring `public sealed class Shape permits Circle, Square` directs the compiler to populate a dedicated `PermittedSubclasses` classfile attribute in the compiled bytecode. At runtime, the JVM's classloader strictly validates that any class declaring `extends Shape` is explicitly listed in this attribute. If an unauthorized class attempts to extend `Shape`, class verification fails immediately with a `java.lang.IncompatibleClassChangeError`.\n\nSealed hierarchies are governed by three mandatory architectural rules:\n1. **Authorized Permitted Subclasses**: Every permitted subclass must be accessible to the sealed class and must reside in the same package (or in the same named JPMS module if packages differ).\n2. **The Triad Modifier Obligation**: Every permitted subclass MUST explicitly declare exactly one of three modifiers:\n   - `final`: Prevents any further subclassing of this branch.\n   - `sealed`: Extends the sealed superclass, but specifies its own restricted `permits` clause.\n   - `non-sealed`: Explicitly opens this specific branch to unrestricted extension by any outside class.\n3. **Exhaustive Pattern Matching**: In modern Java `switch` expressions (Java 21 LTS), switching over an instance of a sealed hierarchy allows the compiler to mathematically prove that all possible subtypes are covered, completely eliminating the need for a defensive `default:` branch.",
    "coreExplanation": [],
    "diagram": "",
    "codeSnippet": {
      "title": "Sealed Classes & Interfaces: Constrained Hierarchies & Pattern Matching",
      "code": "// Example code",
      "lineByLineExplanation": [
        {
          "line": "Declaration & Setup",
          "explanation": "Establishes modern OOP type structures and compiler constraints."
        },
        {
          "line": "Execution & Validation",
          "explanation": "Enforces state immutability, pattern matching, or behavioral contracts."
        },
        {
          "line": "Output & Inspection",
          "explanation": "Demonstrates runtime behavior and type safety guarantees."
        }
      ],
      "output": "// Output demonstrating proper execution and invariant preservation"
    },
    "codeExamples": [],
    "cheatSheet": {
      "summary": "A **Sealed Class or Interface** in Java (standardized in Java 17 LTS via JEP 409) is an object-oriented mechanism that empowers API designers to restrict precisely which other classes or interfaces are permitted to extend or implement them. Prior to Java 17, inheritance was binary: either a class was open to extension by any arbitrary class in any package (default or `public`), or it was locked down completely (`final` or `private` constructor). Sealed classes introduce a powerful middle ground: controlled, exhaustive inheritance hierarchies.",
      "rules": []
    },
    "beginnerMistakes": [],
    "practiceProblems": [
      {
        "title": "Problem 1: Basic Sealed Class with Final Subclasses",
        "problemStatement": "Declare a sealed class `Vehicle permits Car, Truck`. Declare `Car` and `Truck` as final subclasses extending `Vehicle`. Test instantiations in main().",
        "hint": "Declare 'public sealed class Vehicle permits Car, Truck {}' and 'final class Car extends Vehicle {}'.",
        "solution": "sealed class Vehicle permits Car, Truck {}\nfinal class Car extends Vehicle {}\nfinal class Truck extends Vehicle {}\npublic class Main {\n    public static void main(String[] args) {\n        Vehicle v1 = new Car();\n        Vehicle v2 = new Truck();\n        System.out.println(v1.getClass().getSimpleName() + \" \" + v2.getClass().getSimpleName());\n    }\n}",
        "explanation": "Demonstrates the simplest sealed hierarchy with terminal final subclasses."
      },
      {
        "title": "Problem 2: Non-Sealed Subclass Branch",
        "problemStatement": "Create a sealed interface `Audio permits MP3, CustomAudio`. Declare `MP3` as a record. Declare `CustomAudio` as non-sealed interface. Create class `WAV implements CustomAudio`.",
        "hint": "non-sealed allows arbitrary subsequent implementations like WAV.",
        "solution": "sealed interface Audio permits Audio.MP3, CustomAudio {\n    record MP3() implements Audio {}\n}\nnon-sealed interface CustomAudio extends Audio {}\nclass WAV implements CustomAudio {}\npublic class Main {\n    public static void main(String[] args) {\n        Audio a = new WAV();\n        System.out.println(a instanceof CustomAudio);\n    }\n}",
        "explanation": "Shows non-sealed branch opening up inheritance."
      },
      {
        "title": "Problem 3: Omitting Permits in Single Source File",
        "problemStatement": "Declare a sealed class `Token` in a single file without a permits clause, with child classes `IdToken` and `AccessToken`. Verify compilation.",
        "hint": "When child classes reside in the same file, 'permits' can be omitted.",
        "solution": "sealed class Token {}\nfinal class IdToken extends Token {}\nfinal class AccessToken extends Token {}\npublic class Main {\n    public static void main(String[] args) {\n        Token t = new IdToken();\n        System.out.println(t != null);\n    }\n}",
        "explanation": "Permits inference in a single source file."
      },
      {
        "title": "Problem 4: Exhaustive Pattern Matching Switch",
        "problemStatement": "Create sealed interface `Light permits Red, Green`. Write a method `String action(Light l)` using switch pattern matching with no default branch returning 'Stop' or 'Go'.",
        "hint": "return switch(l) { case Red r -> 'Stop'; case Green g -> 'Go'; };",
        "solution": "sealed interface Light permits Red, Green {}\nfinal class Red implements Light {}\nfinal class Green implements Light {}\npublic class Main {\n    static String action(Light l) {\n        return switch(l) {\n            case Red r -> \"Stop\";\n            case Green g -> \"Go\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(action(new Red()) + \" \" + action(new Green()));\n    }\n}",
        "explanation": "Exhaustive pattern matching on sealed interface without default."
      },
      {
        "title": "Problem 5: Abstract Sealed Class with Template Method",
        "problemStatement": "Create `abstract sealed class Task permits SimpleTask`. Define concrete method `void run()` that invokes abstract method `void execute()`. Implement `final class SimpleTask`.",
        "hint": "Abstract sealed classes combine template method logic with closed hierarchies.",
        "solution": "abstract sealed class Task permits SimpleTask {\n    public void run() { System.out.print(\"Starting: \"); execute(); }\n    abstract void execute();\n}\nfinal class SimpleTask extends Task {\n    @Override void execute() { System.out.println(\"Executed\"); }\n}\npublic class Main {\n    public static void main(String[] args) { new SimpleTask().run(); }\n}",
        "explanation": "Abstract sealed class with template pattern."
      },
      {
        "title": "Problem 6: Multi-Level Sealed Hierarchy",
        "problemStatement": "Create `sealed class A permits B`. Create `sealed class B extends A permits C`. Create `final class C extends B`. Instantiate C.",
        "hint": "B is both a permitted child and a sealed parent.",
        "solution": "sealed class A permits B {}\nsealed class B extends A permits C {}\nfinal class C extends B {}\npublic class Main {\n    public static void main(String[] args) {\n        A obj = new C();\n        System.out.println(obj instanceof B);\n    }\n}",
        "explanation": "Multi-tier sealing where an intermediate child is also sealed."
      },
      {
        "title": "Problem 7: Sealed Interface with Record Implementations",
        "problemStatement": "Create `sealed interface Result<T> permits Success, Failure`. Records `Success<T>(T data)` and `Failure<T>(String msg)` implement `Result<T>`. Print outcome in main.",
        "hint": "Records are implicitly final and perfectly model ADT variants.",
        "solution": "sealed interface Result<T> permits Success, Failure {}\nrecord Success<T>(T data) implements Result<T> {}\nrecord Failure<T>(String msg) implements Result<T> {}\npublic class Main {\n    public static void main(String[] args) {\n        Result<Integer> r = new Success<>(42);\n        System.out.println(r instanceof Success);\n    }\n}",
        "explanation": "Algebraic data types using sealed interfaces and records."
      },
      {
        "title": "Problem 8: Checking isSealed() via Reflection",
        "problemStatement": "Write a program that uses reflection to check if `SealedBase.class.isSealed()` is true and prints the length of `getPermittedSubclasses()`.",
        "hint": "Use clazz.isSealed() and clazz.getPermittedSubclasses().length.",
        "solution": "sealed class SealedBase permits ChildA, ChildB {}\nfinal class ChildA extends SealedBase {}\nfinal class ChildB extends SealedBase {}\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(SealedBase.class.isSealed());\n        System.out.println(SealedBase.class.getPermittedSubclasses().length);\n    }\n}",
        "explanation": "Reflection inspection of sealed class metadata."
      },
      {
        "title": "Problem 9: Sealed Interface with Enum Implementation",
        "problemStatement": "Create `sealed interface Status permits StatusEnum`. Create `enum StatusEnum implements Status { OK, FAIL }`. Test in main().",
        "hint": "Enums can implement sealed interfaces.",
        "solution": "sealed interface Status permits StatusEnum {}\nenum StatusEnum implements Status { OK, FAIL }\npublic class Main {\n    public static void main(String[] args) {\n        Status s = StatusEnum.OK;\n        System.out.println(s);\n    }\n}",
        "explanation": "Shows enum participating in a sealed interface hierarchy."
      },
      {
        "title": "Problem 10: Pattern Matching Guard Clause with Sealed Types",
        "problemStatement": "In a switch expression over sealed interface `Expr permits Val, Add`, use a 'when' guard clause on `Val v when v.n() > 0`.",
        "hint": "case Val v when v.n() > 0 -> 'Positive';",
        "solution": "sealed interface Expr permits Val {}\nrecord Val(int n) implements Expr {}\npublic class Main {\n    static String check(Expr e) {\n        return switch(e) {\n            case Val v when v.n() > 0 -> \"Positive: \" + v.n();\n            case Val v -> \"Non-positive: \" + v.n();\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(check(new Val(10)));\n    }\n}",
        "explanation": "Guard clauses with pattern matching on sealed variants."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What are Sealed Classes and Interfaces, and why were they introduced in Java 17?",
        "answer": "Sealed classes (JEP 409, Java 17 LTS) allow developers to restrict which classes or interfaces may extend or implement them using the 'permits' keyword. Historically, Java only supported open inheritance or complete lockdown (final). Sealed classes provide a structured middle ground, enabling domain-driven modeling where an author can expose a public API while preventing arbitrary, rogue third-party implementations.",
        "followUp": "What is the primary architectural advantage when combining sealed classes with pattern matching switch?",
        "followUpAnswer": "Compile-time exhaustiveness: the compiler verifies that every permitted subtype is handled in the switch expression, completely removing the requirement for a 'default:' branch and raising a compilation error if an author adds a new subtype without updating all switches.",
        "keyPhrases": [
          "Restricted inheritance",
          "permits clause",
          "Domain-driven modeling",
          "Exhaustive pattern matching"
        ]
      },
      {
        "question": "What are the three modifiers that every permitted subclass of a sealed class MUST declare?",
        "answer": "Every permitted direct subclass must declare exactly one of three modifiers: 1) 'final' (the subclass cannot be extended further), 2) 'sealed' (the subclass is itself sealed and defines its own permits clause for another layer of descendants), or 3) 'non-sealed' (the subclass explicitly opts out of sealing, opening itself up to unrestricted inheritance by any class).",
        "followUp": "Can a record implement a sealed interface? Does it need the 'final' keyword?",
        "followUpAnswer": "Yes, a record can implement a sealed interface. Because all records are implicitly final, they do not need the explicit 'final' keyword.",
        "keyPhrases": [
          "final (closed)",
          "sealed (sub-constrained)",
          "non-sealed (opened)",
          "Records implicitly final"
        ]
      },
      {
        "question": "Where must permitted subclasses of a sealed class be located in the codebase?",
        "answer": "Permitted subclasses must be accessible to the sealed class and must reside in the same package as the sealed class. If the application is built using the Java Module System (JPMS), permitted subclasses can reside in different packages as long as they belong to the exact same named module.",
        "followUp": "What happens if a class in an external module or different package tries to extend a sealed class?",
        "followUpAnswer": "The Java compiler refuses to compile the class, reporting that the class is not permitted in the sealed hierarchy.",
        "keyPhrases": [
          "Same package requirement",
          "Same named JPMS module",
          "Compile-time rejection of external extensions"
        ]
      },
      {
        "question": "When can the 'permits' clause be completely omitted from a sealed class declaration?",
        "answer": "The 'permits' clause can be omitted if all permitted subclasses are declared within the exact same source code file (.java) as the sealed class. In this case, the Java compiler automatically infers all permitted subclasses by scanning the source file.",
        "followUp": "Can permitted subclasses be nested classes or records inside the sealed class?",
        "followUpAnswer": "Yes! Defining permitted subclasses as static nested classes or nested records inside the sealed interface is a widely adopted idiom for creating Algebraic Data Types.",
        "keyPhrases": [
          "Same source file inference",
          "Omitted permits clause",
          "Static nested implementations"
        ]
      },
      {
        "question": "What is the purpose of the 'non-sealed' modifier?",
        "answer": "'non-sealed' (the only hyphenated keyword in Java) explicitly breaks the sealing constraint for a specific branch of a hierarchy. While the parent is sealed, declaring a child 'non-sealed' allows unknown third-party classes to extend that child freely. It provides architectural flexibility when part of an API must remain open-ended.",
        "followUp": "Why was the hyphenated keyword 'non-sealed' chosen?",
        "followUpAnswer": "To avoid breaking backward compatibility with existing code that may have used 'nonsealed' as an identifier or variable name.",
        "keyPhrases": [
          "Hyphenated keyword",
          "Breaking sealing boundary",
          "Targeted open extension",
          "Backward compatibility"
        ]
      },
      {
        "question": "How does the JVM enforce sealed class rules at runtime during class loading?",
        "answer": "The compiled bytecode of a sealed class includes a 'PermittedSubclasses' attribute in its classfile. When the JVM's classloader loads a subclass, it verifies that the subclass is explicitly named in the superclass's PermittedSubclasses attribute. If an unauthorized class was compiled against a pre-sealed version and attempts to link at runtime, the JVM throws an IncompatibleClassChangeError.",
        "followUp": "Can reflection inspect permitted subclasses?",
        "followUpAnswer": "Yes. Class.isSealed() returns true, and Class.getPermittedSubclasses() returns an array of Class objects representing the permitted subtypes.",
        "keyPhrases": [
          "PermittedSubclasses bytecode attribute",
          "Class verification link phase",
          "IncompatibleClassChangeError",
          "Class.getPermittedSubclasses()"
        ]
      },
      {
        "question": "Can an interface be declared sealed? What can implement or extend it?",
        "answer": "Yes. A sealed interface can permit other interfaces to extend it (which must be declared either 'sealed' or 'non-sealed') and can permit classes or records to implement it (which must be declared 'final', 'sealed', or 'non-sealed').",
        "followUp": "Can an interface be declared final?",
        "followUpAnswer": "No! Interfaces cannot be final because an interface with no implementors has no runtime utility. Interfaces can only be sealed or non-sealed.",
        "keyPhrases": [
          "Sealed interfaces",
          "Classes implement, interfaces extend",
          "Interfaces cannot be final"
        ]
      },
      {
        "question": "Explain Algebraic Data Types (ADTs) in Java using Sealed Types and Records.",
        "answer": "An Algebraic Data Type (ADT) is a composite type formed by combining Sum Types and Product Types. In modern Java: 1) Sealed Interfaces represent Sum Types (an entity can be ONLY one of a fixed set of choices: Circle OR Square OR Triangle), and 2) Records represent Product Types (each choice is a transparent tuple of typed fields: Point has an x AND a y). Together, they allow formal, mathematically verifiable domain modeling.",
        "followUp": "Give a classic real-world example of an ADT in enterprise systems.",
        "followUpAnswer": "An Option/Either type, or an HTTP response hierarchy: 'sealed interface HttpResponse permits SuccessResponse, ErrorResponse, RedirectResponse'.",
        "keyPhrases": [
          "Sum Types (Sealed)",
          "Product Types (Records)",
          "Algebraic Data Types",
          "Mathematically verifiable domain"
        ]
      },
      {
        "question": "What is the difference between an enum and a sealed class hierarchy?",
        "answer": "An enum represents a fixed set of singleton instances (only one instance of Color.RED exists in memory). A sealed class represents a fixed set of types, where each permitted type can have an infinite number of distinct instances with varying state (e.g. Circle can have infinite instances with different radii). Enums model constant values; sealed classes model polymorphic data families.",
        "followUp": "Can an enum implement a sealed interface?",
        "followUpAnswer": "Yes! An enum can be a permitted subtype of a sealed interface.",
        "keyPhrases": [
          "Fixed instances (enum) vs Fixed types (sealed)",
          "Singleton values vs Polymorphic state",
          "Enum implementing sealed interface"
        ]
      },
      {
        "question": "Why does adding a 'default:' branch to an exhaustive switch on a sealed class defeat one of its greatest benefits?",
        "answer": "One of the greatest benefits of sealed hierarchies is compiler-assisted maintenance. If a developer adds a new permitted subtype (e.g. adding 'Refund' to PaymentResult), an exhaustive switch WITHOUT default will fail compilation everywhere that switch is used, alerting developers to handle the new case. If a 'default:' branch exists, the compiler remains silent, and the new subtype might fall through to unexpected fallback behavior, causing silent runtime bugs.",
        "followUp": "When is a default branch justified in a switch over a sealed hierarchy?",
        "followUpAnswer": "Only when you deliberately want a catch-all fallback for several existing subtypes that share identical handling.",
        "keyPhrases": [
          "Compiler-assisted refactoring",
          "Silent bug prevention",
          "Exhaustiveness alert",
          "Fall-through masking"
        ]
      },
      {
        "question": "Can a sealed class have abstract methods?",
        "answer": "Yes. A sealed class can be abstract ('public abstract sealed class Expression permits Constant, Add, Multiply {}'). It functions like a standard abstract class, defining abstract method contracts that its permitted subclasses are obligated to implement, while preserving the closed hierarchy constraints.",
        "followUp": "Can a concrete sealed class be directly instantiated with 'new'?",
        "followUpAnswer": "Yes, if the sealed class is not declared abstract, it can be instantiated directly, though it is usually preferred to make sealed base classes abstract or interfaces.",
        "keyPhrases": [
          "public abstract sealed class",
          "Mandatory subclass implementation",
          "Concrete sealed classes instantiable"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which Java version standardized Sealed Classes as a final language feature?",
        "options": [
          "Java 8",
          "Java 11",
          "Java 17 LTS",
          "Java 21 LTS"
        ],
        "correctIndex": 2,
        "explanation": "Sealed classes were finalized in Java 17 LTS via JEP 409."
      },
      {
        "question": "Which keyword is used in a sealed class header to declare authorized child classes?",
        "options": [
          "allows",
          "permits",
          "authorizes",
          "subtypes"
        ],
        "correctIndex": 1,
        "explanation": "The 'permits' keyword specifies which classes or interfaces are authorized to extend the sealed class."
      },
      {
        "question": "Which of the following is NOT a legal modifier on a direct subclass of a sealed class?",
        "options": [
          "final",
          "sealed",
          "non-sealed",
          "unlocked"
        ],
        "correctIndex": 3,
        "explanation": "Permitted direct subclasses must be marked either final, sealed, or non-sealed. 'unlocked' is not a Java keyword."
      },
      {
        "question": "What is the sole hyphenated keyword in the Java programming language?",
        "options": [
          "semi-final",
          "non-sealed",
          "sub-class",
          "re-abstract"
        ],
        "correctIndex": 1,
        "explanation": "'non-sealed' is the only keyword in Java containing a hyphen."
      },
      {
        "question": "What happens if a permitted subclass is marked 'non-sealed'?",
        "options": [
          "It cannot be instantiated.",
          "It opens that branch of the hierarchy to unrestricted subclassing by any outside class.",
          "It forces all methods to be final.",
          "It compiles with a fatal warning."
        ],
        "correctIndex": 1,
        "explanation": "Declaring a subclass non-sealed explicitly re-opens that branch of the hierarchy to arbitrary extension."
      },
      {
        "question": "Under what condition can the 'permits' clause be omitted from a sealed class declaration?",
        "options": [
          "If the class has no subclasses.",
          "If all permitted subclasses are declared within the same source file (.java).",
          "If all subclasses are records.",
          "If the class is package-private."
        ],
        "correctIndex": 1,
        "explanation": "If all permitted subclasses reside in the same .java source file, the compiler infers the permits list automatically."
      },
      {
        "question": "Can an interface be declared with the 'final' keyword in Java?",
        "options": [
          "Yes, to prevent any class from implementing it.",
          "No, interfaces can never be declared final.",
          "Only marker interfaces.",
          "Yes, starting in Java 17."
        ],
        "correctIndex": 1,
        "explanation": "Interfaces can never be final because an interface cannot be instantiated and relies entirely on implementation."
      },
      {
        "question": "Why is a 'default:' branch NOT required when switching over an exhaustive sealed hierarchy in Java 21?",
        "options": [
          "Because the JVM automatically inserts a throw statement.",
          "Because the compiler can mathematically prove all permitted subtypes are accounted for.",
          "Because switch expressions never require default branches.",
          "Because sealed classes cannot be used in switch expressions."
        ],
        "correctIndex": 1,
        "explanation": "The compiler checks the sealed permits list and verifies all cases are handled, guaranteeing exhaustiveness."
      },
      {
        "question": "What bytecode attribute in the classfile stores permitted subtype metadata for a sealed class?",
        "options": [
          "AuthorizedClasses",
          "PermittedSubclasses",
          "SealedHierarchyTable",
          "SubtypeConstraint"
        ],
        "correctIndex": 1,
        "explanation": "The classfile stores permitted child classes in the 'PermittedSubclasses' attribute."
      },
      {
        "question": "Where must permitted subclasses reside if the application does not use named JPMS modules?",
        "options": [
          "Anywhere in the same JAR file.",
          "In the exact same package as the sealed superclass.",
          "In the root default package only.",
          "In a child sub-package only."
        ],
        "correctIndex": 1,
        "explanation": "In non-modular code, all permitted subclasses must be defined in the same package as the sealed parent."
      },
      {
        "question": "Can a record implement a sealed interface?",
        "options": [
          "No, records can only implement non-sealed interfaces.",
          "Yes, and because records are implicitly final, they satisfy the subtype modifier requirement.",
          "Only if the record explicitly declares 'final'.",
          "Only if the record has zero components."
        ],
        "correctIndex": 1,
        "explanation": "Records can implement sealed interfaces. Since all records are implicitly final, they satisfy the requirement."
      },
      {
        "question": "What error occurs at runtime if an unauthorized class attempts to load as a subclass of a sealed class?",
        "options": [
          "ClassCastException",
          "IncompatibleClassChangeError",
          "SecurityException",
          "NoSuchFieldError"
        ],
        "correctIndex": 1,
        "explanation": "The JVM classloader throws java.lang.IncompatibleClassChangeError during verification."
      },
      {
        "question": "What reflection method tests if a Class object represents a sealed class or interface?",
        "options": [
          "clazz.isClosed()",
          "clazz.isSealed()",
          "clazz.isRestricted()",
          "clazz.hasPermits()"
        ],
        "correctIndex": 1,
        "explanation": "Class.isSealed() returns true if the class or interface is declared sealed."
      },
      {
        "question": "What is the key semantic difference between an enum and a sealed class hierarchy?",
        "options": [
          "Enums cannot implement interfaces.",
          "Enums define a fixed set of instances (values), whereas sealed classes define a fixed set of types with independent state.",
          "Sealed classes cannot have constructors.",
          "Enums run faster in bytecode."
        ],
        "correctIndex": 1,
        "explanation": "Enums represent a closed set of fixed instances; sealed classes represent a closed set of distinct types with arbitrary instances."
      },
      {
        "question": "Can a sealed class be declared abstract?",
        "options": [
          "No, abstract and sealed are mutually exclusive.",
          "Yes, 'public abstract sealed class' is standard for base hierarchies with abstract methods.",
          "Only if all permitted subclasses are abstract.",
          "Only in sealed interfaces, not classes."
        ],
        "correctIndex": 1,
        "explanation": "Declaring 'public abstract sealed class' is standard when defining base templates with abstract methods."
      }
    ]
  },
  "nested-inner-classes": {
    "id": "nested-inner-classes",
    "moduleId": "java-oop-misc",
    "moduleTitle": "7. Modern OOP & Miscellaneous Concepts",
    "lessonNumber": "Lesson 7.3",
    "title": "Nested & Inner Classes: Static vs Non-Static & The Memory Leak Trap",
    "subtitle": "Static nested vs non-static inner classes, Outer.this reference, memory leaks, and local class capture",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "A **Nested Class** in Java is a class defined within the enclosing body of another class. Java partitions nested classes into two distinct architectural categories: **Static Nested Classes** (declared with the `static` modifier) and **Inner Classes** (non-static member classes, local classes defined inside methods, and anonymous inner classes).\n\nUnder the JVM runtime model, these two categories have fundamentally different heap memory footprints. When a non-static Inner Class is instantiated, the Java compiler synthesizes a hidden, non-null reference field (typically named `this$0`) that stores a pointer to the enclosing outer class instance (`OuterClass.this`). In contrast, a Static Nested Class has NO enclosing instance reference; it behaves as a top-level package-private class logically bundled within a namespace for cohesion, and it can be instantiated without an existing outer instance (`new Outer.StaticNested()`).\n\nNested and inner classes are governed by three critical architectural rules:\n1. **Enclosing Scope Access & Linkage**: Non-static inner classes enjoy complete, unfettered access to all members (even `private` instance fields and methods) of the outer class. However, an inner class instance cannot exist without an attached outer instance (`outerInstance.new InnerClass()`).\n2. **The Memory Leak Trap**: Because non-static inner classes and anonymous inner classes maintain an invisible strong reference (`this$0`) to the outer class instance, registering an inner class instance with a long-lived cache, event listener registry, or background thread will prevent the entire outer object—along with all of its heap fields and collections—from being garbage collected, causing catastrophic OutOfMemoryErrors.\n3. **Effective Finality in Method Scopes**: Local classes and anonymous inner classes defined inside a method can access local variables from that method ONLY if those variables are marked `final` or are **effectively final** (never reassigned after initialization).",
    "coreExplanation": [],
    "diagram": "",
    "codeSnippet": {
      "title": "Nested & Inner Classes: Static vs Non-Static & The Memory Leak Trap",
      "code": "// Example code",
      "lineByLineExplanation": [
        {
          "line": "Declaration & Setup",
          "explanation": "Establishes modern OOP type structures and compiler constraints."
        },
        {
          "line": "Execution & Validation",
          "explanation": "Enforces state immutability, pattern matching, or behavioral contracts."
        },
        {
          "line": "Output & Inspection",
          "explanation": "Demonstrates runtime behavior and type safety guarantees."
        }
      ],
      "output": "// Output demonstrating proper execution and invariant preservation"
    },
    "codeExamples": [],
    "cheatSheet": {
      "summary": "A **Nested Class** in Java is a class defined within the enclosing body of another class. Java partitions nested classes into two distinct architectural categories: **Static Nested Classes** (declared with the `static` modifier) and **Inner Classes** (non-static member classes, local classes defined inside methods, and anonymous inner classes).",
      "rules": []
    },
    "beginnerMistakes": [],
    "practiceProblems": [
      {
        "title": "Problem 1: Static Nested Class Instantiation",
        "problemStatement": "Create an outer class `Computer` with static nested class `Processor(String model)`. In main, instantiate Processor without creating Computer.",
        "hint": "Use 'Computer.Processor p = new Computer.Processor(\"M3\");'.",
        "solution": "class Computer {\n    static class Processor {\n        String model;\n        Processor(String m) { this.model = m; }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Computer.Processor p = new Computer.Processor(\"M3\");\n        System.out.println(p.model);\n    }\n}",
        "explanation": "Static nested classes are instantiated without an enclosing outer instance."
      },
      {
        "title": "Problem 2: Non-Static Inner Class Instantiation",
        "problemStatement": "Create class `Car` with field `make = \"Tesla\"` and non-static inner class `Wheel`. In Wheel, define `printCar()` that prints outer `make`. Test in main.",
        "hint": "Use 'new Car().new Wheel().printCar()'.",
        "solution": "class Car {\n    String make = \"Tesla\";\n    class Wheel {\n        void printCar() { System.out.println(make); }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        Car.Wheel w = c.new Wheel();\n        w.printCar();\n    }\n}",
        "explanation": "Shows non-static inner class accessing outer instance field."
      },
      {
        "title": "Problem 3: Resolving Shadowed Fields with Qualified this",
        "problemStatement": "Outer class `Scope` has field `int x = 10`. Inner class `Child` has field `int x = 20`. In Child, print both child x and outer x using qualified this.",
        "hint": "Use Scope.this.x to access outer x.",
        "solution": "class Scope {\n    int x = 10;\n    class Child {\n        int x = 20;\n        void show() {\n            System.out.println(x + \" \" + Scope.this.x);\n        }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Scope().new Child().show();\n    }\n}",
        "explanation": "Scope.this.x resolves the outer instance field."
      },
      {
        "title": "Problem 4: Anonymous Inner Class Implementing Interface",
        "problemStatement": "Create interface `Greeter { void greet(); }`. Instantiate Greeter as an anonymous inner class in main and invoke greet().",
        "hint": "Greeter g = new Greeter() { public void greet() { ... } };",
        "solution": "interface Greeter { void greet(); }\npublic class Main {\n    public static void main(String[] args) {\n        Greeter g = new Greeter() {\n            @Override public void greet() { System.out.println(\"Hello from AIC\"); }\n        };\n        g.greet();\n    }\n}",
        "explanation": "Demonstrates standard anonymous inner class instantiation."
      },
      {
        "title": "Problem 5: Capturing Effectively Final Variable",
        "problemStatement": "In main(), define a local String `prefix = \"LOG: \"`. Create a `Runnable` anonymous class that prints prefix + \"Message\". Run it.",
        "hint": "prefix is effectively final as long as it is not reassigned.",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        String prefix = \"LOG: \";\n        Runnable r = new Runnable() {\n            @Override public void run() { System.out.println(prefix + \"Message\"); }\n        };\n        r.run();\n    }\n}",
        "explanation": "Local variable capture in anonymous classes."
      },
      {
        "title": "Problem 6: Local Class Inside Method",
        "problemStatement": "Inside a method `void process()`, define a local class `Validator` that checks if an int is positive. Instantiate and test with 5 and -2.",
        "hint": "Declare 'class Validator { ... }' directly inside process().",
        "solution": "public class Main {\n    static void process() {\n        class Validator {\n            boolean isValid(int n) { return n > 0; }\n        }\n        Validator v = new Validator();\n        System.out.println(v.isValid(5) + \" \" + v.isValid(-2));\n    }\n    public static void main(String[] args) { process(); }\n}",
        "explanation": "Local inner class scoped entirely to method."
      },
      {
        "title": "Problem 7: Static Nested Builder Pattern",
        "problemStatement": "Implement `User` with private constructor and `static class Builder` with `setName(String)` and `build()`. Create user in main.",
        "hint": "Builder is a static nested class returning User.",
        "solution": "class User {\n    private String name;\n    private User(Builder b) { this.name = b.name; }\n    static class Builder {\n        private String name;\n        Builder setName(String n) { this.name = n; return this; }\n        User build() { return new User(this); }\n    }\n    String getName() { return name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User.Builder().setName(\"Alice\").build();\n        System.out.println(u.getName());\n    }\n}",
        "explanation": "Classic builder pattern utilizing static nested class."
      },
      {
        "title": "Problem 8: Anonymous Inner Class 'this' Verification",
        "problemStatement": "Inside `Main`, create an anonymous `Runnable`. Inside its run(), verify that `this.getClass().getName().contains(\"$\")` is true.",
        "hint": "In an AIC, 'this' refers to the anonymous class itself.",
        "solution": "public class Main {\n    public static void main(String[] args) {\n        Runnable r = new Runnable() {\n            @Override public void run() {\n                System.out.println(this.getClass().getName().contains(\"$\"));\n            }\n        };\n        r.run();\n    }\n}",
        "explanation": "Proves that this in an AIC refers to the synthesized Outer$1 class."
      },
      {
        "title": "Problem 9: Nested Interface inside Class",
        "problemStatement": "Define class `UI` with nested interface `ClickListener { void onClick(); }`. Implement ClickListener in a class `BtnHandler`.",
        "hint": "Nested interfaces are implicitly static.",
        "solution": "class UI {\n    interface ClickListener { void onClick(); }\n}\nclass BtnHandler implements UI.ClickListener {\n    @Override public void onClick() { System.out.println(\"Clicked!\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new BtnHandler().onClick();\n    }\n}",
        "explanation": "Nested interfaces for namespace grouping."
      },
      {
        "title": "Problem 10: Private Nested Member Access via Nestmates",
        "problemStatement": "Create outer class `Vault` with private field `secret = 9999`. Create private static class `KeyHole` with method `readSecret(Vault v)` that reads `v.secret`.",
        "hint": "Classes in the same nest can access private members of each other.",
        "solution": "class Vault {\n    private int secret = 9999;\n    static class KeyHole {\n        static int readSecret(Vault v) { return v.secret; }\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Vault v = new Vault();\n        System.out.println(Vault.KeyHole.readSecret(v));\n    }\n}",
        "explanation": "Demonstrates nestmate private field access."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between a Static Nested Class and a Non-Static Inner Class in Java?",
        "answer": "A static nested class is declared with the 'static' modifier and does NOT hold a reference to an enclosing class instance; it behaves like a top-level class nested purely for packaging and namespace cohesion. A non-static inner class is tied directly to an instance of the outer class and contains a compiler-generated hidden reference pointer ('this$0') to that outer instance, allowing direct access to all outer instance fields and methods.",
        "followUp": "How do instantiation syntaxes differ between the two?",
        "followUpAnswer": "Static nested: 'new Outer.StaticNested()'. Non-static inner: 'outerRef.new Inner()'.",
        "keyPhrases": [
          "No outer instance reference (static)",
          "Hidden this$0 pointer (inner)",
          "Namespace cohesion",
          "outerRef.new Inner()"
        ]
      },
      {
        "question": "How can a non-static inner class or anonymous inner class cause a serious Memory Leak?",
        "answer": "Every instance of a non-static inner class or anonymous inner class maintains an implicit strong reference to its enclosing outer class instance. If the inner object is passed to a long-lived subsystem (such as a static collection, a thread pool, or an Android activity listener registry) while the outer object is discarded by the caller, the inner object's hidden pointer keeps the entire outer object reachable from GC Roots, permanently preventing garbage collection of the outer object.",
        "followUp": "What is an infamous real-world Java idiom that causes this exact memory leak?",
        "followUpAnswer": "Double Brace Initialization ('new ArrayList<String>() {{ add(\"A\"); }}'), which creates an anonymous inner subclass holding a hidden reference to the enclosing class.",
        "keyPhrases": [
          "Implicit strong reference",
          "Reachable from GC Roots",
          "Double Brace Initialization anti-pattern",
          "Prevented garbage collection"
        ]
      },
      {
        "question": "Why does Effective Java recommend 'Favor static member classes over non-static'?",
        "answer": "Joshua Bloch's Item 24 recommends static member classes because each instance of a non-static member class requires extra memory to store the enclosing instance reference, takes extra time to construct, and risks memory leaks if the enclosing instance is no longer needed. If a nested class does not require access to an enclosing instance's state, making it static eliminates the memory and performance overhead.",
        "followUp": "Give a classic example where a static member class is ideal.",
        "followUpAnswer": "The Builder design pattern, or entry nodes in collection maps (e.g. Map.Entry in HashMap is a static nested class).",
        "keyPhrases": [
          "Item 24",
          "Extra reference memory overhead",
          "Construction speed",
          "Builder pattern & Map.Entry"
        ]
      },
      {
        "question": "What does 'effectively final' mean, and why must local variables captured by inner classes be effectively final?",
        "answer": "A variable is 'effectively final' if its value is never modified after it is initialized, even if it lacks the explicit 'final' keyword. Local variables captured by local or anonymous inner classes must be effectively final because the JVM copies the variable's value into the inner class instance. If the variable could be modified, the stack frame and the heap object would have divergent, unsynchronized values.",
        "followUp": "How can you bypass this restriction if you need to mutate a counter inside an inner class?",
        "followUpAnswer": "By using a 1-element array (e.g. 'int[] counter = {0};') or an AtomicInteger, so the reference remains final while the contents can mutate.",
        "keyPhrases": [
          "Unmodified after initialization",
          "Stack vs Heap value divergence",
          "Captured by value copy",
          "1-element array workaround"
        ]
      },
      {
        "question": "Can an inner class access private members of its enclosing class? How does the JVM allow this?",
        "answer": "Yes. An inner class can access all private fields and methods of its enclosing outer class, and vice versa. Historically, the compiler generated synthetic package-private bridge methods ('access$000'). Since Java 11, JEP 181 introduced 'Nestmates', a bytecode-level concept where classes in the same nest share access to private members directly without synthetic bridge methods.",
        "followUp": "What reflection methods test nestmate relationships in Java 11+?",
        "followUpAnswer": "Class.getNestHost() and Class.isNestmateOf().",
        "keyPhrases": [
          "Private member access",
          "Historical synthetic access$000 methods",
          "JEP 181 Nestmates (Java 11)",
          "getNestHost()"
        ]
      },
      {
        "question": "What is an Anonymous Inner Class, and what are its physical limitations?",
        "answer": "An anonymous inner class is an inner class declared and instantiated in a single expression without a name. Limitations: 1) It cannot have an explicit constructor (it only uses instance initializers), 2) It can only extend one class OR implement one interface, never both, 3) It cannot be declared abstract, and 4) It cannot declare static members (except compile-time constants).",
        "followUp": "How does 'this' behave inside an anonymous inner class versus a lambda expression?",
        "followUpAnswer": "Inside an anonymous inner class, 'this' refers to the anonymous class instance itself; in a lambda, 'this' is lexically scoped and refers to the enclosing outer class instance.",
        "keyPhrases": [
          "No explicit constructor",
          "Single superclass/interface",
          "No static members",
          "'this' refers to inner instance"
        ]
      },
      {
        "question": "What is a Local Class, and where can it be defined?",
        "answer": "A Local Class is a class defined inside a block of code—typically inside a method body, but also inside a constructor, for-loop, or static initializer block. It is visible only within that block and is never an interface or enum.",
        "followUp": "Can a local class be declared public, private, or protected?",
        "followUpAnswer": "No. Local classes cannot have access modifiers because their scope is strictly confined to the block where they are declared.",
        "keyPhrases": [
          "Block-scoped class",
          "Defined inside methods",
          "No access modifiers",
          "Confined visibility"
        ]
      },
      {
        "question": "Can an interface be declared inside a class? Is it static or non-static?",
        "answer": "Yes, an interface can be declared inside a class (a nested interface). A nested interface is IMPLICITLY static, regardless of whether the 'static' keyword is explicitly written. Non-static inner interfaces do not exist in Java.",
        "followUp": "Can a class be declared inside an interface?",
        "followUpAnswer": "Yes, and it is also implicitly public and static (e.g. Map.Entry).",
        "keyPhrases": [
          "Implicitly static interface",
          "Non-static interfaces do not exist",
          "Implicitly public and static in interface"
        ]
      },
      {
        "question": "How do you access the enclosing class instance from inside an inner class if method names collide?",
        "answer": "You use the qualified 'this' syntax: 'OuterClassName.this.methodName()' or 'OuterClassName.this.fieldName'. This explicitly tells the compiler to resolve through the synthetic 'this$0' enclosing pointer rather than the inner object's own scope.",
        "followUp": "How do you invoke the outer class's superclass method?",
        "followUpAnswer": "Using 'OuterClassName.super.methodName()'.",
        "keyPhrases": [
          "Qualified this syntax",
          "OuterClassName.this",
          "Synthetic this$0 dereference",
          "Scope shadowing resolution"
        ]
      },
      {
        "question": "Can a static nested class declare non-static instance fields and methods?",
        "answer": "Yes! A static nested class can declare instance fields, instance methods, and constructors. 'static' on the class simply means the class definition is not tied to an enclosing outer instance. When instantiated ('new Outer.Nested()'), each nested object has its own independent instance state on the Heap.",
        "followUp": "Can a static nested class access non-static instance fields of the outer class?",
        "followUpAnswer": "No, not directly, because there is no outer instance to read from. It can only access them if it is explicitly passed an outer object reference.",
        "keyPhrases": [
          "Can have instance fields and methods",
          "Independent heap allocation",
          "No direct access to outer instance state"
        ]
      },
      {
        "question": "What is the bytecode naming convention for compiled nested and anonymous inner classes?",
        "answer": "For member inner classes and static nested classes, the compiler generates classfiles named 'Outer$Inner.class'. For local classes, it prefixes a number: 'Outer$1LocalClass.class'. For anonymous inner classes, it numbers them sequentially: 'Outer$1.class', 'Outer$2.class', etc.",
        "followUp": "Why was this problematic before Java 8 lambdas?",
        "followUpAnswer": "Applications with thousands of anonymous inner classes polluted classloaders and disk space with thousands of small 'Outer$N.class' files, increasing Metaspace overhead.",
        "keyPhrases": [
          "Outer$Inner.class",
          "Outer$1.class",
          "Sequential anonymous numbering",
          "Metaspace classloader pressure"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What synthetic field does the Java compiler generate inside a non-static inner class to reference the outer object?",
        "options": [
          "super$0",
          "this$0",
          "parentRef",
          "outer$ptr"
        ],
        "correctIndex": 1,
        "explanation": "The compiler injects a synthetic reference field named 'this$0' that stores a pointer to the outer instance."
      },
      {
        "question": "Which syntax is used to instantiate a non-static inner class 'Inner' belonging to class 'Outer'?",
        "options": [
          "new Outer.Inner()",
          "outerInstance.new Inner()",
          "Outer.new Inner()",
          "new Inner(outerInstance)"
        ],
        "correctIndex": 1,
        "explanation": "Non-static inner classes require an active outer instance: 'outerInstance.new Inner()'."
      },
      {
        "question": "Why is Double Brace Initialization ('new ArrayList<String>() {{ add(\"A\"); }}') considered an anti-pattern?",
        "options": [
          "It causes a compilation error in Java 17.",
          "It creates an anonymous inner class holding a hidden reference to the enclosing instance, causing memory leaks.",
          "It runs 100x slower.",
          "It makes the list immutable."
        ],
        "correctIndex": 1,
        "explanation": "Double brace initialization creates an anonymous subclass retaining a hidden 'this$0' pointer to the enclosing class."
      },
      {
        "question": "Can a static nested class access private instance variables of its enclosing outer class directly?",
        "options": [
          "Yes, via the implicit outer instance.",
          "No, because static nested classes have no enclosing instance pointer.",
          "Only if the field is volatile.",
          "Yes, if declared in the same package."
        ],
        "correctIndex": 1,
        "explanation": "Static nested classes do not have an enclosing instance pointer, so they cannot directly access outer instance variables."
      },
      {
        "question": "What is the implicit modifier of an interface declared inside a class?",
        "options": [
          "implicitly non-static",
          "implicitly static",
          "implicitly private",
          "implicitly final"
        ],
        "correctIndex": 1,
        "explanation": "Nested interfaces are always implicitly static."
      },
      {
        "question": "What rule applies to method local variables captured by an anonymous inner class?",
        "options": [
          "They must be primitives.",
          "They must be final or effectively final.",
          "They must be declared volatile.",
          "They can be modified freely."
        ],
        "correctIndex": 1,
        "explanation": "Local variables captured by local or anonymous classes must be final or effectively final (never reassigned)."
      },
      {
        "question": "What syntax is used inside an inner class to access a shadowed field 'name' from the outer class?",
        "options": [
          "super.name",
          "OuterClass.this.name",
          "OuterClass.name",
          "this.outer.name"
        ],
        "correctIndex": 1,
        "explanation": "Qualified 'this' syntax ('OuterClass.this.fieldName') resolves shadowed outer members."
      },
      {
        "question": "Can an anonymous inner class declare an explicit constructor?",
        "options": [
          "Yes, any constructor with no arguments.",
          "No, anonymous classes have no name, so they cannot declare constructors.",
          "Yes, if marked public.",
          "Only in Java 21+."
        ],
        "correctIndex": 1,
        "explanation": "Constructors must match the class name; because anonymous classes have no name, they cannot declare constructors."
      },
      {
        "question": "What is a 'Nestmate' introduced in Java 11 (JEP 181)?",
        "options": [
          "A tool for multi-threading nested classes.",
          "A bytecode mechanism allowing classes in the same nest to access private members without synthetic bridge methods.",
          "A deprecation of inner classes.",
          "A syntax for importing inner classes."
        ],
        "correctIndex": 1,
        "explanation": "JEP 181 Nestmates allows nested classes to access each other's private members directly at the bytecode level."
      },
      {
        "question": "Which of the following can be declared inside a method body?",
        "options": [
          "Static nested class",
          "Local inner class",
          "Package-private class",
          "Protected class"
        ],
        "correctIndex": 1,
        "explanation": "Classes declared inside method bodies are called Local Inner Classes."
      },
      {
        "question": "Can a local class declared inside a method be marked with the 'public' access modifier?",
        "options": [
          "Yes, if the enclosing method is public.",
          "No, local classes cannot have access modifiers because their scope is restricted to the block.",
          "Yes, to export it to callers.",
          "Only if marked abstract."
        ],
        "correctIndex": 1,
        "explanation": "Access modifiers (public, protected, private) are illegal on local classes; their scope is confined to the declaring block."
      },
      {
        "question": "What recommendation does Effective Java Item 24 give regarding member classes?",
        "options": [
          "Favor non-static member classes over static.",
          "Favor static member classes over non-static.",
          "Never use nested classes.",
          "Always use anonymous classes."
        ],
        "correctIndex": 1,
        "explanation": "Effective Java Item 24 explicitly states: 'Favor static member classes over non-static' to avoid memory leaks and overhead."
      },
      {
        "question": "What is the compiled classfile name for an inner class 'Helper' inside 'Engine'?",
        "options": [
          "Engine.Helper.class",
          "Engine$Helper.class",
          "Engine_Helper.class",
          "Helper.class"
        ],
        "correctIndex": 1,
        "explanation": "The Java compiler separates outer and inner class names with a dollar sign: Engine$Helper.class."
      },
      {
        "question": "How does 'this' evaluate inside an anonymous inner class?",
        "options": [
          "It evaluates to the enclosing outer class instance.",
          "It evaluates to the instance of the anonymous inner class itself.",
          "It evaluates to null.",
          "It evaluates to java.lang.Object."
        ],
        "correctIndex": 1,
        "explanation": "Inside an anonymous inner class, 'this' refers to the anonymous class instance itself."
      },
      {
        "question": "Which design pattern extensively uses static nested classes?",
        "options": [
          "Visitor Pattern",
          "Builder Pattern",
          "Interpreter Pattern",
          "Flyweight Pattern"
        ],
        "correctIndex": 1,
        "explanation": "The Builder pattern is traditionally implemented as a public static nested class inside the product class."
      }
    ]
  },
  "liskov-substitution-principle": {
    "id": "liskov-substitution-principle",
    "moduleId": "java-oop-misc",
    "moduleTitle": "7. Modern OOP & Miscellaneous Concepts",
    "lessonNumber": "Lesson 7.4",
    "title": "Liskov Substitution Principle (LSP) & Hierarchy Pitfalls",
    "subtitle": "Behavioral subtyping, precondition & postcondition rules, exception covariance, and Square-Rectangle anti-pattern",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "The Liskov Substitution Principle (LSP), introduced by Barbara Liskov in 1987, is the 'L' in the SOLID principles of software design. Formally, LSP states that if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program, such as correctness, performance, or behavior.\n\nIn Java OOP, inheritance is frequently misused by confusing real-world taxonomy with behavioral compatibility. While geometry dictates that a square is mathematically a rectangle, modeling Square as an 'extends Rectangle' in software breaks the behavioral contract if client code expects width and height to vary independently. True subtyping requires behavioral substitutability, not merely conceptual classification.\n\nAdhering to LSP requires respecting method contracts: derived classes cannot strengthen preconditions (demand stricter input requirements than the parent), cannot weaken postconditions (guarantee less output or state fidelity than the parent), and must preserve all class invariants. Violating LSP produces subtle runtime bugs, forces callers to write fragile 'instanceof' checks, and degrades polymorphic design into unmaintainable procedural branches.",
    "coreExplanation": [
      "Behavioral Subtyping vs Syntactic Inheritance: Java's compiler enforces type hierarchy through the 'extends' and 'implements' keywords, ensuring method signatures match. However, the compiler cannot enforce semantic contracts. LSP mandates behavioral subtyping: any property assumed true for a superclass reference must continue to hold unconditionally when an instance of a subclass is substituted in its place.",
      "The Square-Rectangle Anti-Pattern: The quintessential LSP anti-pattern occurs when a Square extends a mutable Rectangle. In Rectangle, setWidth(w) changes only the width without side effects on height. When Square overrides setWidth(w) to set both dimensions to preserve equal sides, it violates the postcondition of Rectangle.setWidth, causing client algorithms expecting independent dimensions to fail.",
      "Contract Rules: Preconditions, Postconditions & Invariants: 1. Preconditions cannot be strengthened: Subclasses cannot reject inputs that the superclass accepts (e.g., throwing IllegalArgumentException for values valid in the parent).\n2. Postconditions cannot be weakened: Subclasses cannot return weaker guarantees or null where superclasses guarantee non-null.\n3. Invariants must be preserved: Any state condition that holds true before and after superclass operations must hold in the subclass.",
      "Exception Covariance and the Refusal Rule: Java's type system enforces checked exception covariance: an overriding method can declare narrower (subclasses) or fewer checked exceptions, but cannot declare new or broader checked exceptions. Throwing UnsupportedOperationException at runtime is a severe violation of LSP known as the 'Refusal' anti-pattern, signaling that the subclass is not genuinely a subtype of the interface it claims to implement.",
      "Covariant Return Types in Java: Since Java 5, an overriding method in a subclass is allowed to return a subtype of the return type declared in the superclass. This directly supports LSP and type safety, eliminating unnecessary casts at the call site.",
      "Remediation: Composition and Interface Segregation: When inheritance threatens LSP, the proper remedy is to abandon inheritance in favor of composition or an abstract common ancestor. Instead of Square extending Rectangle, both can implement a read-only 'Shape' interface, or Square can compose a Rectangle internally."
    ],
    "diagram": "```\n         [LSP Architectural Violation]\n                 +----------------+\n                 |   Rectangle    |\n                 |----------------|\n                 | +setWidth(w)   |\n                 | +setHeight(h)  |\n                 +----------------+\n                         ^\n                         | extends (BROKEN SUBSTITUTION)\n                 +----------------+\n                 |     Square     |\n                 |----------------|\n                 | +setWidth(w)   | -> alters height simultaneously!\n                 | +setHeight(h)  | -> breaks client invariant: getWidth()==w && getHeight()==h\n                 +----------------+\n\n         [LSP Compliant Architecture: Interface Segregation]\n                   <<interface>>\n                     Shape2D\n                 +----------------+\n                 | +getArea(): int|\n                 +----------------+\n                         ^\n             +-----------+----------+\n             |                      |\n     +---------------+      +----------------+\n     |   Rectangle   |      |     Square     |\n     | (Immutable)   |      | (Immutable)    |\n     +---------------+      +----------------+\n```",
    "codeSnippet": {
      "title": "Square-Rectangle LSP Violation and Fix",
      "code": "public class LspDemo {\n    // Superclass\n    static class Rectangle {\n        protected int width;\n        protected int height;\n        public void setWidth(int w) { this.width = w; }\n        public void setHeight(int h) { this.height = h; }\n        public int getWidth() { return width; }\n        public int getHeight() { return height; }\n        public int getArea() { return width * height; }\n    }\n\n    // Subclass violating LSP\n    static class Square extends Rectangle {\n        @Override\n        public void setWidth(int w) {\n            this.width = w;\n            this.height = w;\n        }\n        @Override\n        public void setHeight(int h) {\n            this.width = h;\n            this.height = h;\n        }\n    }\n\n    // Client code that relies on Rectangle's contract\n    static void verifyRectangleContract(Rectangle r) {\n        r.setWidth(5);\n        r.setHeight(10);\n        // Contract says: width is 5, height is 10, area must be 50\n        if (r.getArea() != 50) {\n            System.out.println(\"LSP VIOLATION: Expected area 50, but got \" + r.getArea());\n        } else {\n            System.out.println(\"Contract honored: area is \" + r.getArea());\n        }\n    }\n\n    public static void main(String[] args) {\n        verifyRectangleContract(new Rectangle()); // Works: area 50\n        verifyRectangleContract(new Square());    // Fails: area 100! (LSP violation)\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Declaration & Setup",
          "explanation": "Establishes modern OOP type structures and compiler constraints."
        },
        {
          "line": "Execution & Validation",
          "explanation": "Enforces state immutability, pattern matching, or behavioral contracts."
        },
        {
          "line": "Output & Inspection",
          "explanation": "Demonstrates runtime behavior and type safety guarantees."
        }
      ],
      "output": "// Output demonstrating proper execution and invariant preservation"
    },
    "codeExamples": [
      {
        "title": "Square-Rectangle LSP Violation and Fix",
        "description": "Demonstrating how subclass mutation violates caller assertions and how segregation fixes it.",
        "code": "public class LspDemo {\n    // Superclass\n    static class Rectangle {\n        protected int width;\n        protected int height;\n        public void setWidth(int w) { this.width = w; }\n        public void setHeight(int h) { this.height = h; }\n        public int getWidth() { return width; }\n        public int getHeight() { return height; }\n        public int getArea() { return width * height; }\n    }\n\n    // Subclass violating LSP\n    static class Square extends Rectangle {\n        @Override\n        public void setWidth(int w) {\n            this.width = w;\n            this.height = w;\n        }\n        @Override\n        public void setHeight(int h) {\n            this.width = h;\n            this.height = h;\n        }\n    }\n\n    // Client code that relies on Rectangle's contract\n    static void verifyRectangleContract(Rectangle r) {\n        r.setWidth(5);\n        r.setHeight(10);\n        // Contract says: width is 5, height is 10, area must be 50\n        if (r.getArea() != 50) {\n            System.out.println(\"LSP VIOLATION: Expected area 50, but got \" + r.getArea());\n        } else {\n            System.out.println(\"Contract honored: area is \" + r.getArea());\n        }\n    }\n\n    public static void main(String[] args) {\n        verifyRectangleContract(new Rectangle()); // Works: area 50\n        verifyRectangleContract(new Square());    // Fails: area 100! (LSP violation)\n    }\n}"
      },
      {
        "title": "Exception Covariance & Invariant Preservation",
        "description": "Demonstrating legal checked exception narrowing and illegal contract strengthening.",
        "code": "import java.io.FileNotFoundException;\nimport java.io.IOException;\n\nclass DataReader {\n    // Superclass declares IOException\n    public String read(String path) throws IOException {\n        if (path == null) throw new IllegalArgumentException(\"Path cannot be null\");\n        return \"data from \" + path;\n    }\n}\n\nclass LocalFileReader extends DataReader {\n    // COMPLIANT: Narrower checked exception (FileNotFoundException IS-A IOException)\n    @Override\n    public String read(String path) throws FileNotFoundException {\n        if (path == null) throw new IllegalArgumentException(\"Path cannot be null\");\n        if (path.isEmpty()) throw new FileNotFoundException(\"Empty path\");\n        return \"file content: \" + path;\n    }\n}\n\nclass StrictFileReader extends DataReader {\n    // NON-COMPLIANT BEHAVIORALLY: Strengthens preconditions\n    @Override\n    public String read(String path) throws IOException {\n        // Superclass accepted any non-null path; this subclass rejects paths shorter than 10 chars\n        if (path != null && path.length() < 10) {\n            throw new IllegalArgumentException(\"Path too short!\"); // Breaks client assumptions\n        }\n        return super.read(path);\n    }\n}"
      }
    ],
    "cheatSheet": {
      "summary": "The Liskov Substitution Principle (LSP), introduced by Barbara Liskov in 1987, is the 'L' in the SOLID principles of software design. Formally, LSP states that if S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program, such as correctness, performance, or behavior.",
      "rules": [
        {
          "rule": "Behavioral Subtyping vs Syntactic Inheritance",
          "explanation": "Java's compiler enforces type hierarchy through the 'extends' and 'implements' keywords, ensuring method signatures match. However, the compiler cannot enforce semantic contracts. ..."
        },
        {
          "rule": "The Square-Rectangle Anti-Pattern",
          "explanation": "The quintessential LSP anti-pattern occurs when a Square extends a mutable Rectangle. In Rectangle, setWidth(w) changes only the width without side effects on height. When Square o..."
        },
        {
          "rule": "Contract Rules: Preconditions, Postconditions & Invariants",
          "explanation": "1. Preconditions cannot be strengthened: Subclasses cannot reject inputs that the superclass accepts (e.g., throwing IllegalArgumentException for values valid in the parent).\n2. Po..."
        },
        {
          "rule": "Exception Covariance and the Refusal Rule",
          "explanation": "Java's type system enforces checked exception covariance: an overriding method can declare narrower (subclasses) or fewer checked exceptions, but cannot declare new or broader chec..."
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Overriding a method with an empty body or throwing UnsupportedOperationException",
        "whyItHappens": "Overriding a method with an empty body or throwing UnsupportedOperationException",
        "howToFix": "If a subclass cannot implement a method inherited from an interface or base class, it does not belong in that hierarchy. Segregate the interface into smaller, more focused contracts (Interface Segregation Principle)."
      },
      {
        "mistake": "Strengthening input validation in an overriding method",
        "whyItHappens": "Strengthening input validation in an overriding method",
        "howToFix": "Subclasses must accept all parameter values that the superclass accepts. If you must restrict inputs, model the restriction at the supertype level or use composition instead of inheritance."
      },
      {
        "mistake": "Weakening return guarantees (e.g. returning null when parent guarantees empty list)",
        "whyItHappens": "Weakening return guarantees (e.g. returning null when parent guarantees empty list)",
        "howToFix": "Always honor the postconditions of the parent class. If the parent promises never to return null, the subclass must never return null."
      },
      {
        "mistake": "Confusing parameter overloading with covariant overriding",
        "whyItHappens": "Confusing parameter overloading with covariant overriding",
        "howToFix": "Remember that Java only supports return type covariance. If you change a parameter to a broader type or subtype in a subclass without @Override, you have defined an overloaded method, not an overridden one."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Identify Precondition Strengthening",
        "problemStatement": "Analyze an overridden calculateDiscount method where the subclass throws an IllegalArgumentException for customer ratings accepted by the superclass. Refactor to preserve LSP.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Calculated discount without throwing exception",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Analyze an overridden calculateDiscount method where the subclass throws an IllegalArgumentException for customer ratings accepted by the superclass. Refactor to preserve LSP."
      },
      {
        "title": "Puzzle 2: Refactor Square-Rectangle to Immutable Records",
        "problemStatement": "Convert mutable Rectangle and Square classes into immutable records implementing a shared Shape2D interface, eliminating the dimension mutation LSP violation.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Areas: 20 and 16",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Convert mutable Rectangle and Square classes into immutable records implementing a shared Shape2D interface, eliminating the dimension mutation LSP violation."
      },
      {
        "title": "Puzzle 3: Exception Covariance Validator",
        "problemStatement": "Implement a class hierarchy where a BaseParser declares throws ParseException, and FileParser narrows the exception to JsonSyntaxException without breaking callers expecting ParseException.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "JsonSyntaxException caught via ParseException reference",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Implement a class hierarchy where a BaseParser declares throws ParseException, and FileParser narrows the exception to JsonSyntaxException without breaking callers expecting ParseException."
      },
      {
        "title": "Puzzle 4: Fixing the Refusal Anti-Pattern in Bird Hierarchy",
        "problemStatement": "Given a Bird class with fly(), an Ostrich subclass throws UnsupportedOperationException. Refactor using FlyingBird and FlightlessBird interfaces to satisfy LSP.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Sparrow flies; Ostrich runs; no runtime exceptions",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Given a Bird class with fly(), an Ostrich subclass throws UnsupportedOperationException. Refactor using FlyingBird and FlightlessBird interfaces to satisfy LSP."
      },
      {
        "title": "Puzzle 5: Postcondition Weakening Detection",
        "problemStatement": "A base UserRepository guarantees returning an Optional<User>. A subclass returns null instead of Optional.empty(). Fix the subclass to honor the supertype postcondition.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Optional.empty()",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. A base UserRepository guarantees returning an Optional<User>. A subclass returns null instead of Optional.empty(). Fix the subclass to honor the supertype postcondition."
      },
      {
        "title": "Puzzle 6: Covariant Return Type Factory",
        "problemStatement": "Create an abstract DocumentBuilder with a build() returning Document. Implement PdfDocumentBuilder with a covariant return type returning PdfDocument directly.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Returns PdfDocument reference without casting",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Create an abstract DocumentBuilder with a build() returning Document. Implement PdfDocumentBuilder with a covariant return type returning PdfDocument directly."
      },
      {
        "title": "Puzzle 7: Preserving Invariants Across Inheritance",
        "problemStatement": "A NonNegativeCounter superclass maintains the invariant 'count >= 0'. Ensure that a BoundedCounter subclass cannot be placed into a state where count < 0 via any sequence of operations.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Invariant preserved: count remains >= 0",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. A NonNegativeCounter superclass maintains the invariant 'count >= 0'. Ensure that a BoundedCounter subclass cannot be placed into a state where count < 0 via any sequence of operations."
      },
      {
        "title": "Puzzle 8: History Constraint Enforcement",
        "problemStatement": "Given an ImmutablePoint base class, demonstrate how introducing a subclass with mutable coordinates violates the LSP history constraint. Refactor using final modifier.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Guaranteed immutable across all references",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Given an ImmutablePoint base class, demonstrate how introducing a subclass with mutable coordinates violates the LSP history constraint. Refactor using final modifier."
      },
      {
        "title": "Puzzle 9: Eliminating Instanceof Downcasting Smells",
        "problemStatement": "Refactor a payment processing method containing 'if (p instanceof CreditCardPayment)' into polymorphic dispatch where each payment subclass executes process() cleanly.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "All payments processed without instanceof checks",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Refactor a payment processing method containing 'if (p instanceof CreditCardPayment)' into polymorphic dispatch where each payment subclass executes process() cleanly."
      },
      {
        "title": "Puzzle 10: Composite Collection LSP Compliance",
        "problemStatement": "Implement a CustomReadOnlyList<T> delegating to an underlying ArrayList without implementing java.util.List, preventing unsupported mutator method invocations at compile time.",
        "hint": "Analyze the method preconditions, postconditions, and invariant contracts.",
        "solution": "Does not compile: method does not exist",
        "explanation": "LSP requires that subtypes be substitutable without breaking behavioral guarantees. Implement a CustomReadOnlyList<T> delegating to an underlying ArrayList without implementing java.util.List, preventing unsupported mutator method invocations at compile time."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the Liskov Substitution Principle (LSP) and why is it critical in OOP?",
        "answer": "The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without breaking application correctness. It is critical because polymorphism relies on the assumption that any subclass can seamlessly substitute for its parent. If a subclass changes expected behavior, callers must write defensive 'instanceof' checks, defeating polymorphism and creating fragile architectures."
      },
      {
        "question": "Why does the Square extending Rectangle hierarchy violate LSP?",
        "answer": "In a mutable Rectangle, width and height can vary independently; setting width does not affect height. In a Square, width and height are coupled; setting width forces height to change. Client code written against Rectangle assuming independent dimensions will fail when given a Square, violating the postcondition of setWidth."
      },
      {
        "question": "What are the rules regarding preconditions and postconditions under LSP?",
        "answer": "1. Preconditions cannot be strengthened in a subtype: A subclass cannot place tighter restrictions or demand more prerequisites on method arguments than the superclass.\n2. Postconditions cannot be weakened in a subtype: A subclass must guarantee at least as much as the superclass promised (e.g. cannot return null if parent promised non-null)."
      },
      {
        "question": "Does Java's compiler prevent LSP violations?",
        "answer": "No. The Java compiler only checks syntactic type compatibility (matching method signatures, return type covariance, and exception hierarchy rules). It cannot verify semantic behavior, state invariants, or contract promises. LSP is a design and behavioral principle enforced by the programmer through tests and architecture."
      },
      {
        "question": "What is exception covariance in Java method overriding, and how does it relate to LSP?",
        "answer": "An overriding method in Java can declare narrower (subclasses) or fewer checked exceptions than the superclass method, but cannot declare new or broader checked exceptions. This aligns with LSP because callers catching the superclass exception will still safely catch any subclass exception. Subclasses can also omit checked exceptions entirely."
      },
      {
        "question": "Why is throwing UnsupportedOperationException considered an LSP violation?",
        "answer": "Throwing UnsupportedOperationException indicates that the subclass refuses to fulfill the contract of the method it inherited. Callers programming to the superclass or interface expect the operation to succeed. Refusing the contract forces the caller to know the runtime concrete type, breaking abstraction."
      },
      {
        "question": "What is the Liskov History Constraint?",
        "answer": "The history constraint states that a subtype cannot introduce state changes that were disallowed by the supertype. For example, if a supertype is designed to be immutable, a subtype cannot add mutable state or setter methods that alter its observable state after construction."
      },
      {
        "question": "What is covariant return typing in Java?",
        "answer": "Covariant return typing allows an overriding method in a subclass to return a more specific subtype of the return type declared in the superclass method. Introduced in Java 5, it satisfies LSP by guaranteeing that the returned object still satisfies the superclass return type while avoiding explicit downcasts at the call site."
      },
      {
        "question": "How can you detect LSP violations in an existing codebase?",
        "answer": "Common symptoms include:\n1. Intensive use of 'instanceof' or downcasting before invoking methods on a base type.\n2. Overridden methods throwing UnsupportedOperationException or having empty bodies.\n3. Overridden methods having special preconditions, such as unexpected null checks or restricted range checks.\n4. Unit tests passing for the base class but failing when run against the subclass."
      },
      {
        "question": "How does the Interface Segregation Principle (ISP) help satisfy LSP?",
        "answer": "LSP violations often occur when an interface is too 'fat', forcing implementers to implement methods they cannot meaningfully support (leading to UnsupportedOperationException). By splitting fat interfaces into smaller, cohesive interfaces (ISP), classes only implement methods they truly support, naturally satisfying LSP."
      },
      {
        "question": "How should Square and Rectangle be designed to satisfy LSP?",
        "answer": "They should either both implement an immutable Shape interface declaring 'int getArea()', or Square can compose a Rectangle internally. If mutability is required, they should be independent sibling classes rather than one extending the other, because a square's behavior is fundamentally incompatible with independent width/height mutation."
      }
    ],
    "miniQuiz": [
      {
        "question": "Who formulated the Liskov Substitution Principle and in what year?",
        "options": [
          "Robert C. Martin in 2000",
          "Barbara Liskov in 1987",
          "James Gosling in 1995",
          "Erich Gamma in 1994"
        ],
        "correctIndex": 1,
        "explanation": "Barbara Liskov first introduced the principle during a keynote address in 1987, and later formalized it with Jeannette Wing in 1994."
      },
      {
        "question": "What is the core requirement of the Liskov Substitution Principle?",
        "options": [
          "Subclasses must implement every interface in the package",
          "Objects of a superclass should be replaceable with objects of a subclass without breaking application correctness",
          "All methods in a superclass must be declared abstract or default",
          "Subclasses must have fewer fields than their superclass"
        ],
        "correctIndex": 1,
        "explanation": "LSP requires that if S is a subtype of T, objects of type T may be substituted with objects of type S without altering the correctness or desired properties of the program."
      },
      {
        "question": "Why does a mutable 'class Square extends Rectangle' violate LSP?",
        "options": [
          "Because Java does not allow extending geometric classes",
          "Because Square has fewer fields than Rectangle",
          "Because mutating width on a Square alters height, violating Rectangle's independent dimension contract",
          "Because Rectangle is a final class in the standard library"
        ],
        "correctIndex": 2,
        "explanation": "Rectangle guarantees that setWidth alters only the width and leaves height unchanged. Square overrides setWidth to alter height as well, breaking the invariant and postcondition expected by callers of Rectangle."
      },
      {
        "question": "Under LSP, what is the rule regarding preconditions in a subclass method?",
        "options": [
          "Preconditions cannot be strengthened (cannot demand more than the superclass)",
          "Preconditions must be strictly stronger than the superclass",
          "Preconditions must always throw IllegalArgumentException",
          "Preconditions can only be checked in private methods"
        ],
        "correctIndex": 0,
        "explanation": "A subclass cannot strengthen preconditions. It must accept at least all inputs that the superclass considers valid. Demanding stricter inputs would break callers that rely on the superclass contract."
      },
      {
        "question": "Under LSP, what is the rule regarding postconditions in a subclass method?",
        "options": [
          "Postconditions cannot be weakened (must guarantee at least as much as the superclass)",
          "Postconditions must be weaker than the superclass",
          "Postconditions are ignored during method overriding",
          "Postconditions must always return null on error"
        ],
        "correctIndex": 0,
        "explanation": "Postconditions cannot be weakened. The subclass must deliver at least what the superclass promised; it cannot return a less specific result or fail to establish guarantees made by the superclass."
      },
      {
        "question": "Which of the following method overrides violates Java's compiler rules for checked exceptions?",
        "options": [
          "Superclass declares 'throws IOException', subclass declares 'throws FileNotFoundException'",
          "Superclass declares 'throws IOException', subclass declares no throws clause",
          "Superclass declares 'throws IOException', subclass declares 'throws Exception'",
          "Superclass declares 'throws Exception', subclass declares 'throws IOException'"
        ],
        "correctIndex": 2,
        "explanation": "An overriding method cannot declare broader checked exceptions than the method it overrides. 'Exception' is broader than 'IOException', so the compiler will reject it."
      },
      {
        "question": "When does throwing UnsupportedOperationException in an overridden method violate LSP?",
        "options": [
          "Only if the method is static",
          "Always, because the subclass refuses to honor the behavior promised by the supertype contract",
          "Never, it is standard practice encouraged by SOLID",
          "Only if the method returns an integer"
        ],
        "correctIndex": 1,
        "explanation": "Throwing UnsupportedOperationException indicates that the subclass cannot fulfill the contract defined by its supertype, violating behavioral substitutability."
      },
      {
        "question": "What is covariant return typing in Java?",
        "options": [
          "A subclass method can return a subtype of the return type declared in the superclass method",
          "A method can return multiple values simultaneously using tuples",
          "A method can return void when the superclass returned an Object",
          "A subclass method can return an unrelated type if casted explicitly"
        ],
        "correctIndex": 0,
        "explanation": "Covariant return types (supported since Java 5) allow an overriding method to specify a return type that is a subclass of the superclass method's return type."
      },
      {
        "question": "What is the Liskov History Constraint?",
        "options": [
          "Git history must be preserved when refactoring classes",
          "A subtype cannot introduce state mutations that were impossible in the supertype",
          "Classes must document author and creation date in javadoc",
          "Superclasses cannot be modified after release"
        ],
        "correctIndex": 1,
        "explanation": "The history constraint states that a subtype cannot permit state mutations that were not permitted by the supertype (e.g. mutating an immutable object)."
      },
      {
        "question": "If client code contains multiple 'if (obj instanceof SpecificSubclass)' checks to perform different logic, what does this indicate?",
        "options": [
          "High code quality and strict type safety",
          "An LSP violation or leaky abstraction where polymorphism is failing",
          "That the code is using Java records properly",
          "Optimal runtime execution performance"
        ],
        "correctIndex": 1,
        "explanation": "Checking specific subclasses with instanceof to invoke special handling indicates that the supertype interface is insufficient or that subclasses do not behave uniformly, signaling an LSP violation."
      },
      {
        "question": "What happens if a subclass method specifies a broader parameter type instead of the exact parameter type in the superclass?",
        "options": [
          "The method overrides the superclass method covariantly",
          "The method overloads the superclass method instead of overriding it",
          "A compilation error occurs immediately",
          "The superclass method becomes private automatically"
        ],
        "correctIndex": 1,
        "explanation": "Java only supports return type covariance, not parameter contravariance. Changing the parameter type creates an overloaded method with a different signature, not an override."
      },
      {
        "question": "How does java.util.Collections.unmodifiableList(list) relate to LSP?",
        "options": [
          "It is a perfect textbook example of strictly conforming to LSP",
          "It violates LSP at runtime because calling add() or remove() throws UnsupportedOperationException",
          "It compiles only when using Java 21 preview features",
          "It implements List without implementing Collection"
        ],
        "correctIndex": 1,
        "explanation": "While convenient in standard Java, unmodifiableList violates LSP behaviorally because it claims to be a List<E> but throws UnsupportedOperationException when mutating methods are called."
      },
      {
        "question": "Which design principle is often combined with LSP to eliminate fat interfaces and empty method overrides?",
        "options": [
          "Single Responsibility Principle (SRP) only",
          "Interface Segregation Principle (ISP)",
          "Open-Closed Principle (OCP) exclusively",
          "Dependency Inversion Principle (DIP) exclusively"
        ],
        "correctIndex": 1,
        "explanation": "The Interface Segregation Principle (ISP) advocates splitting large, monolithic interfaces into smaller, cohesive ones so classes only implement methods they can genuinely support, satisfying LSP."
      },
      {
        "question": "If a superclass method specifies an @NonNull return guarantee, which subclass implementation violates LSP?",
        "options": [
          "Returning an empty collection instead of null",
          "Returning a populated non-null object",
          "Returning null under certain edge cases",
          "Throwing a documented unchecked exception on invalid state"
        ],
        "correctIndex": 2,
        "explanation": "Returning null weakens the postcondition promised by the superclass (@NonNull), which will cause NullPointerExceptions at call sites expecting non-null results."
      },
      {
        "question": "What is the recommended refactoring when a class hierarchy violates LSP?",
        "options": [
          "Add more subclasses to handle edge cases",
          "Favor Composition over Inheritance or introduce a shared common abstract ancestor",
          "Suppress all compiler warnings using @SuppressWarnings(\"all\")",
          "Make all methods in the superclass private"
        ],
        "correctIndex": 1,
        "explanation": "Favoring composition over inheritance, or introducing an abstract common interface (like Shape2D with getArea() instead of Square extending Rectangle), resolves LSP violations cleanly."
      }
    ]
  },
  "oop-misc-challenge": {
    "id": "oop-misc-challenge",
    "moduleId": "java-oop-misc",
    "moduleTitle": "7. Modern OOP & Miscellaneous Concepts",
    "lessonNumber": "Lesson 7.5",
    "title": "Module 7 Challenge & Modern OOP Assessment",
    "subtitle": "Comprehensive assessment, code puzzles, and interview evaluation covering Java Records, Sealed Hierarchies, Inner Classes, and Liskov Substitution",
    "estimatedMinutes": 25,
    "beginnerAnalogy": "The **Module 7 Capstone Challenge & Interview Assessment** evaluates your comprehensive command of advanced and modern Object-Oriented Programming features introduced across modern Java LTS releases (Java 16, 17, and 21) alongside foundational architectural principles.\n\nModern Java enterprise engineering requires mastering concise immutable data carriers (Records and compact constructors), strictly bounded algebraic domain modeling (Sealed classes and interfaces), precise nested encapsulation (Static nested vs non-static inner classes and their memory lifecycles), and disciplined contract adherence (the Liskov Substitution Principle and SOLID behavioral subtyping).\n\nThis capstone assessment is structured across four rigorous evaluation pillars:\n1. **11 Coding Challenges**: Hands-on algorithmic and structural challenges (6 Easy, 3 Medium, 2 Hard) testing real-world record serialization, sealed algebraic expressions, memory leak prevention in inner classes, and LSP-compliant hierarchies.\n2. **15 Quiz MCQs**: Challenging technical questions dissecting compilation rules, bytecode semantics, and behavioral subtyping.\n3. **12 Conversational Interview Q&As**: Thorough technical responses tailored for senior engineering rounds.\n4. **10 Code Output Puzzles**: Tricky runtime evaluation scenarios testing compact constructors, shadowing in inner classes, and pattern matching dispatch.",
    "coreExplanation": [
      "Java Records & Immutable State Carriers: Java Records (introduced in Java 16) provide transparent carrier semantics for immutable data. The compiler automatically synthesizes private final fields, canonical constructor, accessors, equals(), hashCode(), and toString(). Records forbid extending any class and cannot be extended, guaranteeing a predictable data model.",
      "Sealed Classes & Exhaustive Pattern Matching: Sealed types (Java 17) restrict which classes or interfaces may extend or implement them using the 'permits' clause. Direct subtypes must explicitly declare 'final', 'sealed', or 'non-sealed'. This enables compile-time exhaustive pattern matching in switch expressions without requiring a default branch.",
      "Nested & Inner Class Encapsulation: Static nested classes are top-level classes packaged inside an outer class namespace without an enclosing instance reference. Non-static inner classes maintain an implicit 'Outer.this' reference to the enclosing object, enabling access to private instance members but posing serious memory leak risks if their lifecycle outlives the outer instance.",
      "Liskov Substitution Principle (LSP): LSP mandates that subtypes must be behavioral substitutes for their supertypes. Subclasses cannot strengthen preconditions, cannot weaken postconditions, and must preserve all superclass invariants. Refusing inherited contracts via UnsupportedOperationException or breaking dimension independence (Square extends Rectangle) violates LSP."
    ],
    "diagram": "```\n                 <<sealed interface>>\n                      AsyncJob\n                (permits Queued, Running, Completed, Failed)\n                         ^\n       +-----------------+-----------------+-----------------+\n       |                 |                 |                 |\n  final record      final record      final record      final record\n    Queued            Running          Completed           Failed\n  (UUID id,         (UUID id,         (UUID id,         (UUID id,\n   Instant ts)       int progress)     String result)    Throwable err)\n\n   // Exhaustive Modern Switch (No 'default' required, compiler verified):\n   String status = switch(job) {\n       case Queued q      -> \"Waiting in queue at \" + q.ts();\n       case Running r     -> \"In progress: \" + r.progress() + \"%\";\n       case Completed c   -> \"Done: \" + c.result();\n       case Failed f      -> \"Failed: \" + f.err().getMessage();\n   };\n```",
    "codeSnippet": {
      "title": "Comprehensive Modern Domain Architecture",
      "code": "public class ModernOopDemo {\n    public sealed interface PaymentMethod permits CreditCard, BankTransfer, Crypto {}\n\n    public record CreditCard(String pan, String cvv, int expYear) implements PaymentMethod {\n        public CreditCard {\n            if (pan == null || pan.length() < 16) throw new IllegalArgumentException(\"Invalid PAN\");\n            if (cvv == null || cvv.length() != 3) throw new IllegalArgumentException(\"Invalid CVV\");\n        }\n    }\n\n    public record BankTransfer(String iban, String swift) implements PaymentMethod {}\n    public record Crypto(String walletAddress, String network) implements PaymentMethod {}\n\n    public static String processPayment(PaymentMethod method, double amount) {\n        return switch (method) {\n            case CreditCard(var pan, var cvv, var exp) -> \"Charging $\" + amount + \" to Card ****\" + pan.substring(12);\n            case BankTransfer(var iban, var swift)     -> \"Transferring $\" + amount + \" to IBAN \" + iban;\n            case Crypto(var wallet, var net)           -> \"Broadcasting transaction of $\" + amount + \" on \" + net;\n        };\n    }\n\n    public static void main(String[] args) {\n        PaymentMethod pm = new CreditCard(\"1234567812345678\", \"999\", 2028);\n        System.out.println(processPayment(pm, 250.0));\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Declaration & Setup",
          "explanation": "Establishes modern OOP type structures and compiler constraints."
        },
        {
          "line": "Execution & Validation",
          "explanation": "Enforces state immutability, pattern matching, or behavioral contracts."
        },
        {
          "line": "Output & Inspection",
          "explanation": "Demonstrates runtime behavior and type safety guarantees."
        }
      ],
      "output": "// Output demonstrating proper execution and invariant preservation"
    },
    "codeExamples": [
      {
        "title": "Comprehensive Modern Domain Architecture",
        "description": "Sealed hierarchy, record data carriers, compact constructor validations, and pattern matching.",
        "code": "public class ModernOopDemo {\n    public sealed interface PaymentMethod permits CreditCard, BankTransfer, Crypto {}\n\n    public record CreditCard(String pan, String cvv, int expYear) implements PaymentMethod {\n        public CreditCard {\n            if (pan == null || pan.length() < 16) throw new IllegalArgumentException(\"Invalid PAN\");\n            if (cvv == null || cvv.length() != 3) throw new IllegalArgumentException(\"Invalid CVV\");\n        }\n    }\n\n    public record BankTransfer(String iban, String swift) implements PaymentMethod {}\n    public record Crypto(String walletAddress, String network) implements PaymentMethod {}\n\n    public static String processPayment(PaymentMethod method, double amount) {\n        return switch (method) {\n            case CreditCard(var pan, var cvv, var exp) -> \"Charging $\" + amount + \" to Card ****\" + pan.substring(12);\n            case BankTransfer(var iban, var swift)     -> \"Transferring $\" + amount + \" to IBAN \" + iban;\n            case Crypto(var wallet, var net)           -> \"Broadcasting transaction of $\" + amount + \" on \" + net;\n        };\n    }\n\n    public static void main(String[] args) {\n        PaymentMethod pm = new CreditCard(\"1234567812345678\", \"999\", 2028);\n        System.out.println(processPayment(pm, 250.0));\n    }\n}"
      },
      {
        "title": "Inner Class Leak Remediation",
        "description": "Replacing non-static inner handler with static nested handler with weak reference to outer context.",
        "code": "import java.lang.ref.WeakReference;\n\npublic class EventBus {\n    private final String busName = \"MainBus\";\n\n    // Static nested class avoids strong reference leak to EventBus\n    public static class SafeHandler {\n        private final WeakReference<EventBus> busRef;\n\n        public SafeHandler(EventBus bus) {\n            this.busRef = new WeakReference<>(bus);\n        }\n\n        public void onEvent(String message) {\n            EventBus bus = busRef.get();\n            if (bus != null) {\n                System.out.println(bus.busName + \" received: \" + message);\n            } else {\n                System.out.println(\"Enclosing bus was garbage collected\");\n            }\n        }\n    }\n}"
      }
    ],
    "cheatSheet": {
      "summary": "The **Module 7 Capstone Challenge & Interview Assessment** evaluates your comprehensive command of advanced and modern Object-Oriented Programming features introduced across modern Java LTS releases (Java 16, 17, and 21) alongside foundational architectural principles.",
      "rules": [
        {
          "rule": "Java Records & Immutable State Carriers",
          "explanation": "Java Records (introduced in Java 16) provide transparent carrier semantics for immutable data. The compiler automatically synthesizes private final fields, canonical constructor, a..."
        },
        {
          "rule": "Sealed Classes & Exhaustive Pattern Matching",
          "explanation": "Sealed types (Java 17) restrict which classes or interfaces may extend or implement them using the 'permits' clause. Direct subtypes must explicitly declare 'final', 'sealed', or '..."
        },
        {
          "rule": "Nested & Inner Class Encapsulation",
          "explanation": "Static nested classes are top-level classes packaged inside an outer class namespace without an enclosing instance reference. Non-static inner classes maintain an implicit 'Outer.t..."
        },
        {
          "rule": "Liskov Substitution Principle (LSP)",
          "explanation": "LSP mandates that subtypes must be behavioral substitutes for their supertypes. Subclasses cannot strengthen preconditions, cannot weaken postconditions, and must preserve all supe..."
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Mutating mutable objects passed into Java Record components",
        "whyItHappens": "Mutating mutable objects passed into Java Record components",
        "howToFix": "Use defensive copies inside a compact constructor and return unmodifiable snapshots in explicit accessor overrides."
      },
      {
        "mistake": "Permitted subclass failing to declare an inheritance modifier",
        "whyItHappens": "Permitted subclass failing to declare an inheritance modifier",
        "howToFix": "Every direct subclass of a sealed class must explicitly declare exactly one modifier: 'final', 'sealed', or 'non-sealed'."
      },
      {
        "mistake": "Holding long-lived references to non-static inner class instances",
        "whyItHappens": "Holding long-lived references to non-static inner class instances",
        "howToFix": "Use static nested classes or top-level classes if the inner object's lifecycle outlives the outer object."
      },
      {
        "mistake": "Subclass overriding a method to throw UnsupportedOperationException",
        "whyItHappens": "Subclass overriding a method to throw UnsupportedOperationException",
        "howToFix": "Segregate interfaces or favor composition instead of inheriting methods that cannot be supported."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Record Compact Constructor Field Reassignment",
        "problemStatement": "What is the result of executing this program?",
        "code": "record Box(int width, int height) {\n    public Box {\n        width = width * 2;\n        height = height * 3;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box(5, 10);\n        System.out.println(b.width() + \",\" + b.height());\n    }\n}",
        "options": [
          "5,10",
          "10,30",
          "Compilation Error: Cannot reassign parameter in compact constructor",
          "0,0"
        ],
        "correctOptionIndex": 1,
        "hint": "In a compact constructor, parameters are modified before the compiler inserts the automatic this.field = param assignments.",
        "solution": "10,30",
        "explanation": "In a record's compact constructor, modifying parameter variables modifies the value assigned to the implicit fields at the end of the constructor body. Hence width becomes 10 and height becomes 30."
      },
      {
        "title": "Puzzle 2: Explicit Field Assignment in Compact Constructor",
        "problemStatement": "What happens when compiling this code?",
        "code": "record Point(int x, int y) {\n    public Point {\n        this.x = x;\n        this.y = y;\n    }\n}",
        "options": [
          "Compiles and runs normally",
          "Compilation Error: Cannot use 'this.field' assignment in a compact constructor",
          "Throws NullPointerException at runtime",
          "Outputs Point[x=0, y=0]"
        ],
        "correctOptionIndex": 1,
        "hint": "Compact constructors forbid explicit initialization of fields via 'this.x = x'.",
        "solution": "Compilation Error: Cannot use 'this.field' assignment in a compact constructor",
        "explanation": "A compact constructor does not have a parameter list and implicitly assigns all fields at the end. Explicit assignment using 'this.x = x' is a compile-time error."
      },
      {
        "title": "Puzzle 3: Sealed Class Modifier Requirement",
        "problemStatement": "What happens when compiling this sealed hierarchy?",
        "code": "sealed class Vehicle permits Car {}\nclass Car extends Vehicle {}",
        "options": [
          "Compiles successfully",
          "Compilation Error: Subclass 'Car' must be declared final, sealed, or non-sealed",
          "Runtime exception when instantiating Car",
          "Compilation Error: Vehicle must be an interface"
        ],
        "correctOptionIndex": 1,
        "hint": "Java requires permitted direct subclasses to explicitly state their subclassing stance.",
        "solution": "Compilation Error: Subclass 'Car' must be declared final, sealed, or non-sealed",
        "explanation": "Every class that directly extends a sealed class must explicitly specify whether it is 'final', 'sealed', or 'non-sealed'."
      },
      {
        "title": "Puzzle 4: Inner Class Shadowing & Outer.this",
        "problemStatement": "What is printed by this program?",
        "code": "class ScopeTest {\n    int val = 100;\n    class Inner {\n        int val = 200;\n        void print() {\n            int val = 300;\n            System.out.println(val + \",\" + this.val + \",\" + ScopeTest.this.val);\n        }\n    }\n    public static void main(String[] args) {\n        new ScopeTest().new Inner().print();\n    }\n}",
        "options": [
          "300,200,100",
          "300,300,300",
          "200,200,100",
          "Compilation Error: Outer.this is invalid syntax"
        ],
        "correctOptionIndex": 0,
        "hint": "Local variable shadows instance field; 'this.val' accesses Inner's field; 'Outer.this.val' accesses the enclosing instance.",
        "solution": "300,200,100",
        "explanation": "val refers to the local variable (300). this.val refers to Inner's field (200). ScopeTest.this.val refers to the enclosing instance's field (100)."
      },
      {
        "title": "Puzzle 5: Local Variable Capture in Anonymous Class",
        "problemStatement": "What happens when attempting to compile this method?",
        "code": "public class ClosureTest {\n    public static Runnable create(int x) {\n        return new Runnable() {\n            @Override\n            public void run() {\n                System.out.println(x);\n            }\n        };\n        x++;\n    }\n}",
        "options": [
          "Compiles and prints the incremented value",
          "Compilation Error: Local variable x must be final or effectively final",
          "Compiles and prints original x",
          "Throws IllegalStateException at runtime"
        ],
        "correctOptionIndex": 1,
        "hint": "Mutating 'x' after referencing it in an inner class violates the effectively final rule.",
        "solution": "Compilation Error: Local variable x must be final or effectively final",
        "explanation": "Variables captured by local or anonymous classes must be final or effectively final. The subsequent mutation 'x++' causes a compile-time error."
      },
      {
        "title": "Puzzle 6: Static Nested Class Enclosing Access",
        "problemStatement": "What happens when compiling this snippet?",
        "code": "class Container {\n    private int count = 50;\n    public static class Nested {\n        public void display() {\n            System.out.println(count);\n        }\n    }\n}",
        "options": [
          "Prints 50",
          "Compilation Error: Non-static field 'count' cannot be referenced from a static context",
          "Throws NullPointerException at runtime",
          "Prints 0"
        ],
        "correctOptionIndex": 1,
        "hint": "Static nested classes do not have an enclosing instance pointer.",
        "solution": "Compilation Error: Non-static field 'count' cannot be referenced from a static context",
        "explanation": "Static nested classes behave as top-level classes and have no implicit reference to an instance of Container, so they cannot directly access instance fields."
      },
      {
        "title": "Puzzle 7: Record Inheritance and Extending Classes",
        "problemStatement": "What is the compiler result for this record definition?",
        "code": "class Base {}\nrecord Data(int id) extends Base {}",
        "options": [
          "Compiles successfully",
          "Compilation Error: Records cannot extend classes (they already extend java.lang.Record)",
          "Compiles only if Base has a no-arg constructor",
          "Compiles if Base is abstract"
        ],
        "correctOptionIndex": 1,
        "hint": "Java does not support multiple inheritance of classes, and all records implicitly extend java.lang.Record.",
        "solution": "Compilation Error: Records cannot extend classes (they already extend java.lang.Record)",
        "explanation": "All records implicitly inherit java.lang.Record. Because Java allows single class inheritance only, records cannot declare an 'extends' clause."
      },
      {
        "title": "Puzzle 8: Checked Exception Narrowing Under LSP",
        "problemStatement": "What is the compiler behavior for this override?",
        "code": "import java.io.*;\nclass BaseService {\n    public void run() throws IOException {}\n}\nclass SubService extends BaseService {\n    @Override\n    public void run() throws FileNotFoundException {}\n}",
        "options": [
          "Compilation Error: Cannot change exception in overridden method",
          "Compiles successfully because FileNotFoundException is a subclass of IOException",
          "Compilation Error: Subclass must declare throws Exception",
          "Compiles only if both methods are marked final"
        ],
        "correctOptionIndex": 1,
        "hint": "Java method overriding allows covariant (narrower) checked exceptions.",
        "solution": "Compiles successfully because FileNotFoundException is a subclass of IOException",
        "explanation": "An overriding method may declare narrower checked exceptions or omit them entirely without violating Java's type rules or LSP."
      },
      {
        "title": "Puzzle 9: Exhaustive Switch on Sealed Type Without Default",
        "problemStatement": "Given sealed interface Node permits Leaf, Branch. What is the result?",
        "code": "sealed interface Node permits Leaf, Branch {}\nfinal record Leaf(int val) implements Node {}\nfinal record Branch(Node left, Node right) implements Node {}\n\npublic class TreeEval {\n    public static int count(Node n) {\n        return switch (n) {\n            case Leaf l -> 1;\n            case Branch b -> count(b.left()) + count(b.right());\n        };\n    }\n}",
        "options": [
          "Compilation Error: Switch must include a 'default' branch",
          "Compiles successfully because all permitted subtypes are covered exhaustively",
          "Throws MatchException at runtime if n is a Leaf",
          "Throws NullPointerException at compile time"
        ],
        "correctOptionIndex": 1,
        "hint": "Sealed types allow the compiler to prove exhaustiveness in switch expressions.",
        "solution": "Compiles successfully because all permitted subtypes are covered exhaustively",
        "explanation": "Because Node is sealed and permits only Leaf and Branch, the compiler proves that all possible cases are handled, making a 'default' branch unnecessary."
      },
      {
        "title": "Puzzle 10: Record Accessor Method Shadowing",
        "problemStatement": "What is printed when running this program?",
        "code": "record Person(String name) {\n    @Override\n    public String name() {\n        return name == null ? \"Anonymous\" : name.toUpperCase();\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Person p = new Person(\"alice\");\n        System.out.println(p.name());\n    }\n}",
        "options": [
          "alice",
          "ALICE",
          "Compilation Error: Cannot override record component accessors",
          "Anonymous"
        ],
        "correctOptionIndex": 1,
        "hint": "Records allow overriding component accessor methods as long as the return type and signature match.",
        "solution": "ALICE",
        "explanation": "Records permit explicit implementations of component accessors. Here, p.name() invokes the custom accessor returning 'ALICE'."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is a Java Record and what bytecode does javac synthesize for it?",
        "answer": "A Java Record (Java 16) is a specialized class designed to serve as an immutable data carrier. The compiler automatically generates: private final fields for each component, a public canonical constructor, public accessor methods matching component names (e.g. name() not getName()), and standard implementations of equals(), hashCode(), and toString() based on all components. Records implicitly extend java.lang.Record and are implicitly final."
      },
      {
        "question": "What is a compact constructor in a record and how does it differ from a canonical constructor?",
        "answer": "A compact constructor has no parameter list (e.g. public Range { ... }). It is used for argument validation and normalization. Inside a compact constructor, parameters can be modified or checked before assignment, and the compiler automatically inserts the assignments (this.x = x;) at the end of the constructor body. You cannot explicitly write 'this.x = x' in a compact constructor."
      },
      {
        "question": "Can a Java Record maintain mutable state? What is a representation leak?",
        "answer": "A Record's component references are final, but if a component refers to a mutable object (like Date or ArrayList), the internal state of that referenced object can be modified from outside. This is a representation leak. To ensure true immutability, defensive copies must be made in the compact constructor and in explicit accessor overrides."
      },
      {
        "question": "What are Sealed Classes and Interfaces, and what problem do they solve?",
        "answer": "Introduced in Java 17, sealed classes and interfaces restrict which other classes or interfaces may extend or implement them using the 'permits' keyword. They solve the problem of unbounded class hierarchies, allowing developers to model algebraic data types and closed domain models where all possible subtypes are known at compile-time."
      },
      {
        "question": "What are the 3 modifiers required for direct subtypes of a sealed class?",
        "answer": "Every direct subtype of a sealed class must explicitly declare one of three modifiers:\n1. 'final': Prevents further subclassing entirely.\n2. 'sealed': Continues to restrict subclassing to its own permitted list.\n3. 'non-sealed': Opens the hierarchy to unrestricted subclassing by any class."
      },
      {
        "question": "How do Sealed types enable exhaustive switch expressions in Java?",
        "answer": "Because the compiler knows the complete, closed set of all permitted subtypes of a sealed hierarchy, it can verify whether a switch expression covers all cases. If every permitted subtype is matched, no 'default' branch is required. If a case is missing or a new permitted subtype is added later, the compiler immediately flags an error."
      },
      {
        "question": "What is the difference between a static nested class and an inner class?",
        "answer": "A static nested class is defined with the 'static' keyword; it behaves like a top-level class packaged inside another class and has no reference to an instance of the outer class. A non-static inner class is bound to an instance of the enclosing class and maintains an implicit reference ('Outer.this'), allowing direct access to the outer instance's fields and methods."
      },
      {
        "question": "How can a non-static inner class cause a memory leak?",
        "answer": "Because every non-static inner class instance maintains a hidden strong reference to its enclosing outer instance, if the inner instance has a longer lifecycle than the outer instance (e.g., registered as a long-lived event listener or background thread), the outer instance cannot be garbage collected, leaking all memory associated with the outer object."
      },
      {
        "question": "Why must local variables accessed inside local or anonymous inner classes be final or effectively final?",
        "answer": "Java implements local variable capture by copying the variable's value into a synthetic field inside the inner class instance. If the variable were allowed to mutate, the copy and the original would diverge, creating inconsistent state. Enforcing finality ensures the value remains synchronized between the method stack and the heap-allocated object."
      },
      {
        "question": "What is the Liskov Substitution Principle (LSP) and how does it relate to polymorphism?",
        "answer": "LSP states that any subclass instance should be substitutable for its superclass without breaking program correctness or client expectations. Polymorphism allows treating different classes through a common base type; LSP ensures that doing so is safe and semantically reliable, meaning subclasses honor the base contract rather than altering behavior unexpectedly."
      },
      {
        "question": "Explain the classic Square-Rectangle LSP violation and its resolution.",
        "answer": "In a mutable Rectangle, setWidth(w) changes only width. In a Square, width and height must remain equal, so overriding setWidth(w) mutates height as well. Client code relying on Rectangle's contract of independent dimensions fails when passed a Square. The resolution is to avoid inheritance between mutable Square and Rectangle; both should implement an immutable Shape interface or be independent classes."
      },
      {
        "question": "What are the rules of precondition and postcondition inheritance under LSP?",
        "answer": "Under LSP, a subclass cannot strengthen preconditions (cannot demand stricter inputs or prerequisites than the superclass accepted) and cannot weaken postconditions (cannot guarantee less or return null where the superclass guaranteed a valid object). This ensures that client code written against the superclass contract works seamlessly with any subclass."
      }
    ],
    "miniQuiz": [
      {
        "question": "What is implicitly true for every Java Record?",
        "options": [
          "It is implicitly abstract",
          "It implicitly extends java.lang.Record and is implicitly final",
          "It cannot implement any interfaces",
          "It must define explicit getters starting with 'get'"
        ],
        "correctIndex": 1,
        "explanation": "All Java records extend java.lang.Record and are implicitly final, meaning they cannot be subclassed."
      },
      {
        "question": "In a Record compact constructor, which statement is true?",
        "options": [
          "Parameters must be declared in parentheses",
          "Explicit assignment to 'this.field' is required",
          "Parameters can be normalized before automatic assignment to fields",
          "It cannot throw checked exceptions"
        ],
        "correctIndex": 2,
        "explanation": "A compact constructor omits the parameter list; parameters can be validated and normalized, and the compiler automatically injects field assignments at the end."
      },
      {
        "question": "How do you prevent representation leaks when a Record contains a java.util.List component?",
        "options": [
          "Declare the List static",
          "Use List.copyOf(list) in the compact constructor and return unmodifiable view in accessor",
          "Mark the record non-sealed",
          "Records automatically deep-copy all collection components"
        ],
        "correctIndex": 1,
        "explanation": "Java records do not automatically perform deep copies. Defensive copying using List.copyOf() prevents callers from mutating the internal list."
      },
      {
        "question": "Which keyword is used in Java 17 to specify which classes are permitted to extend a sealed class?",
        "options": [
          "allows",
          "permits",
          "subclasses",
          "restricts"
        ],
        "correctIndex": 1,
        "explanation": "The 'permits' keyword follows the class name (or extends/implements clause) to list allowed direct subclasses."
      },
      {
        "question": "Which of the following is NOT a legal modifier for a direct subtype of a sealed class?",
        "options": [
          "final",
          "sealed",
          "non-sealed",
          "open"
        ],
        "correctIndex": 3,
        "explanation": "Direct subtypes must be declared 'final', 'sealed', or 'non-sealed'. 'open' is not a class modifier in Java."
      },
      {
        "question": "Under what condition can the 'permits' clause be omitted from a sealed class declaration?",
        "options": [
          "If the class has no subclasses",
          "If all permitted subclasses are declared in the same source file",
          "If the class is public",
          "If the subclasses are records"
        ],
        "correctIndex": 1,
        "explanation": "If all permitted subclasses are declared in the same source compilation unit (.java file), the compiler can infer them, allowing 'permits' to be omitted."
      },
      {
        "question": "How does a non-static inner class reference its enclosing outer class instance?",
        "options": [
          "super",
          "this.outer",
          "OuterClassName.this",
          "OuterClassName.super"
        ],
        "correctIndex": 2,
        "explanation": "The syntax 'OuterClassName.this' accesses the enclosing instance of the outer class."
      },
      {
        "question": "Can a static nested class directly access private non-static instance fields of the outer class without an instance?",
        "options": [
          "Yes, always",
          "No, it requires an instance of the outer class because it has no enclosing reference",
          "Only if the field is protected",
          "Only if the nested class is private"
        ],
        "correctIndex": 1,
        "explanation": "Static nested classes do not have an enclosing instance pointer, so they cannot access instance fields without an explicit object reference."
      },
      {
        "question": "What is the primary memory risk associated with non-static inner classes?",
        "options": [
          "StackOverflowError on instantiation",
          "Memory leaks caused by the inner class holding an implicit strong reference to the outer instance",
          "Immediate Heap fragmentation",
          "Garbage collection of the class loader"
        ],
        "correctIndex": 1,
        "explanation": "The implicit 'Outer.this' pointer prevents the outer instance from being garbage collected as long as the inner instance is referenced, causing memory leaks."
      },
      {
        "question": "What does the Liskov Substitution Principle require regarding method preconditions?",
        "options": [
          "Subclasses may strengthen preconditions",
          "Subclasses cannot strengthen preconditions (must accept at least what superclass accepts)",
          "Preconditions must be declared as checked exceptions",
          "Preconditions cannot be checked at runtime"
        ],
        "correctIndex": 1,
        "explanation": "A subclass cannot strengthen preconditions because client code passing arguments valid for the superclass would fail when passed a subclass instance."
      },
      {
        "question": "What does the Liskov Substitution Principle require regarding method postconditions?",
        "options": [
          "Subclasses cannot weaken postconditions (must guarantee at least what superclass guarantees)",
          "Subclasses can return null at any time",
          "Subclasses must weaken postconditions to increase flexibility",
          "Postconditions are irrelevant in OOP"
        ],
        "correctIndex": 0,
        "explanation": "A subclass cannot weaken postconditions. It must guarantee at least as much as promised by the superclass contract."
      },
      {
        "question": "Which of the following method overrides violates Java checked exception covariance?",
        "options": [
          "Superclass throws IOException; subclass throws FileNotFoundException",
          "Superclass throws IOException; subclass throws no exceptions",
          "Superclass throws IOException; subclass throws Exception",
          "Superclass throws Exception; subclass throws IOException"
        ],
        "correctIndex": 2,
        "explanation": "Throwing 'Exception' when the superclass throws 'IOException' widens the checked exception, which the compiler rejects as an illegal override."
      },
      {
        "question": "Why is throwing UnsupportedOperationException in an overridden method considered an LSP violation?",
        "options": [
          "Because UnsupportedOperationException is a checked exception",
          "Because the subclass refuses to fulfill the behavior guaranteed by the supertype contract",
          "Because it causes an OutOfMemoryError",
          "Because only abstract methods can throw it"
        ],
        "correctIndex": 1,
        "explanation": "Refusing to fulfill a contract via UnsupportedOperationException breaks behavioral substitutability, forcing clients to know the concrete runtime type."
      },
      {
        "question": "What makes switch expressions over sealed hierarchies type-safe without a 'default' branch?",
        "options": [
          "The JVM creates dummy branches automatically",
          "The compiler verifies exhaustiveness by checking that all permitted subtypes are covered",
          "The reflection API inspects classes at runtime",
          "Sealed classes only allow two subclasses"
        ],
        "correctIndex": 1,
        "explanation": "The compiler checks the 'permits' list of the sealed type; if every permitted subtype is covered, the switch is proven to be exhaustive without a 'default'."
      },
      {
        "question": "Are nested records inside a class implicitly static or non-static?",
        "options": [
          "Implicitly non-static",
          "Implicitly static",
          "Static only if declared private",
          "Records cannot be nested inside classes"
        ],
        "correctIndex": 1,
        "explanation": "All nested records and nested interfaces in Java are implicitly static, preventing enclosing instance reference retention."
      }
    ]
  }
};
