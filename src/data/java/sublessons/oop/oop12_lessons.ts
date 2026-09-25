import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 12: POLYMORPHISM & DISPATCH (LESSONS 12.1 - 12.4)
// High-Quality, In-Depth Curriculum for Java Core Concepts
// Constraints: Zero forward topics (NO interfaces, NO collections, NO lambdas/streams)
// ============================================================

export const oop12Lessons: Record<string, DetailedLesson> = {
  "compile-vs-runtime-polymorphism": {
    "id": "compile-vs-runtime-polymorphism",
    "moduleId": "java-polymorphism",
    "moduleTitle": "12. Polymorphism & Dispatch",
    "lessonNumber": "Lesson 12.1",
    "title": "Compile-Time vs Runtime Polymorphism",
    "subtitle": "Static binding vs dynamic dispatch, method overloading vs method overriding, and bytecode invocation opcodes",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of universal remote control buttons. When you press the 'Volume' rocker button, you can tap it quickly for 1 step or press-and-hold for continuous volume (compile-time overloading: different button combinations decided in advance by your thumb). But when you press the universal 'Power' button (runtime polymorphism), the remote sends a standard signal. If pointed at a Sony OLED TV, the TV displays a splash screen and boots up; if pointed at a Yamaha audio receiver, the receiver clicks its physical power relays; if pointed at an air conditioner, it beeps and opens its louver vents. The caller sends the exact same 'power()' command, but the actual target hardware on the floor determines the specific behavior.",
    "interviewTakeaways": [
      "The Two Faces of Polymorphism: Compile-Time (Static) Polymorphism is achieved via Method Overloading and resolved by javac at compile time. Runtime (Dynamic) Polymorphism is achieved via Method Overriding and resolved by the JVM at runtime.",
      "Static vs Dynamic Binding: Overloading uses static binding based on the declared reference type and argument compile-time types. Overriding uses dynamic binding based on the actual concrete object allocated on the heap.",
      "Bytecode Differences: Overloaded methods compile to 'invokestatic' or 'invokevirtual' with fixed parameter descriptors determined at compile time. Overridden virtual methods compile to 'invokevirtual' and use runtime vtable index resolution.",
      "Fields Are Never Polymorphic: Only non-private, non-static instance methods participate in runtime polymorphism. Instance variables and static methods are bound at compile time based solely on reference type.",
      "Private and Final Methods: Methods marked 'private', 'static', or 'final' cannot be overridden, so they are bound statically at compile time, bypassing dynamic method dispatch."
    ],
    "cheatSheet": {
      "summary": "Compile-time polymorphism (overloading) resolves method calls based on reference types at compilation. Runtime polymorphism (overriding) resolves method calls based on heap object types during execution.",
      "syntaxTemplate": "// Compile-time: Overloading\nclass MathCalc {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}\n\n// Runtime: Overriding\nclass Animal { void speak() { System.out.println(\"...\"); } }\nclass Cat extends Animal { void speak() { System.out.println(\"Meow\"); } }",
      "rules": [
        {
          "rule": "Overloading = Same Name, Different Signatures",
          "explanation": "Overloaded methods must differ in parameter count, parameter types, or parameter order. Return type alone does not differentiate."
        },
        {
          "rule": "Overriding = Same Name, Exact Same Signature",
          "explanation": "Subclass redefines inherited method with identical name and parameter types."
        },
        {
          "rule": "Binding Decision Point",
          "explanation": "Overloading is decided by the compiler (early binding); overriding is decided by the JVM at runtime (late binding)."
        },
        {
          "rule": "Variables Are Never Polymorphic",
          "explanation": "If Child defines 'int x = 20' and Parent defines 'int x = 10', 'Parent p = new Child(); p.x' evaluates to 10."
        },
        {
          "rule": "Static Methods Do Not Override",
          "explanation": "Static methods are hidden, not overridden. Calling Parent.method() executes Parent's static method."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Mechanism",
          "optionA": "Compile-Time: Method Overloading",
          "optionB": "Runtime: Method Overriding"
        },
        {
          "aspect": "When Resolved",
          "optionA": "Compile time by javac",
          "optionB": "Runtime by JVM dynamic dispatch"
        },
        {
          "aspect": "Class Requirement",
          "optionA": "Can be within a single class",
          "optionB": "Requires inheritance (parent and child classes)"
        },
        {
          "aspect": "Signature Rules",
          "optionA": "Must have different parameter lists",
          "optionB": "Must have exact same parameter signature"
        }
      ]
    },
    "coreExplanation": [
      "Polymorphism, originating from the Greek words meaning 'many forms', allows a single interface or reference type to represent different underlying forms or behaviors.",
      "Compile-Time Polymorphism (Static Polymorphism) occurs when multiple methods share the same name with different parameter signatures (Method Overloading). The compiler inspects the argument types at the call site and hardcodes the target method descriptor into bytecode.",
      "Runtime Polymorphism (Dynamic Polymorphism) occurs when a subclass overrides an instance method inherited from its superclass. The compiler allows the call as long as the method exists on the reference type, but the actual method executed is determined by the JVM checking the heap object at runtime.",
      "Variable Shadowing vs Method Overriding: Variables in Java are resolved strictly at compile time based on the declared type of the reference variable. There is NO polymorphic variable lookup in Java.",
      "Static Method Hiding: Static methods belong to the class, not to instances on the heap. If a child class defines a static method with the same signature as a parent static method, it hides the parent method; it does NOT participate in dynamic dispatch.",
      "Private and Final Invocations: Private methods cannot be inherited and are invoked via 'invokespecial'. Final methods cannot be overridden, allowing the JIT compiler to inline them directly."
    ],
    "diagram": "COMPILE-TIME BINDING (Overloading):            RUNTIME BINDING (Overriding):\nSource: calc.add(10, 20);                     Source: Animal a = new Dog(); a.makeSound();\nCompiler checks argument types (int, int)       Compiler checks: Does Animal have makeSound()? Yes.\nBinds directly to add(int, int) in bytecode.  Emits: invokevirtual Animal.makeSound()\n+------------------------------------+        At Runtime JVM inspects heap object:\n| MathCalc.class                     |        +-----------------------------------+\n| 0: invokevirtual #2 // add:(II)I   |        | Heap: Dog Object                  |\n+------------------------------------+        | vtable[makeSound] -> Dog.bark()   |\n                                              +-----------------------------------+\n                                              Executes Dog's version dynamically!",
    "codeSnippet": {
      "title": "Contrasting Method Overloading vs Dynamic Method Overriding",
      "code": "class PaymentGateway {\n    // Compile-time polymorphism: Overloading\n    public void process(double amount) {\n        System.out.println(\"Standard payment: $\" + amount);\n    }\n    public void process(double amount, String currency) {\n        System.out.println(\"Foreign currency payment: \" + amount + \" \" + currency);\n    }\n\n    // Runtime polymorphism candidate\n    public void authorize() {\n        System.out.println(\"Base authorization protocol\");\n    }\n}\n\nclass CryptoPaymentGateway extends PaymentGateway {\n    @Override\n    public void authorize() {\n        System.out.println(\"Blockchain wallet signature verification\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        PaymentGateway gateway = new CryptoPaymentGateway();\n\n        // Overloaded methods resolved at compile time\n        gateway.process(150.0);\n        gateway.process(150.0, \"EUR\");\n\n        // Overridden method resolved at runtime (Dynamic Dispatch)\n        gateway.authorize();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "PaymentGateway gateway = new CryptoPaymentGateway();",
          "explanation": "Upcasting: reference variable is of superclass type PaymentGateway; concrete heap object is CryptoPaymentGateway."
        },
        {
          "line": "gateway.process(150.0);",
          "explanation": "Compile-time binding matches the single double parameter process(double) signature."
        },
        {
          "line": "gateway.process(150.0, \"EUR\");",
          "explanation": "Compile-time binding matches the two-parameter process(double, String) signature."
        },
        {
          "line": "gateway.authorize();",
          "explanation": "Runtime polymorphism: JVM inspects the heap object, finds it is CryptoPaymentGateway, and executes its overridden authorize() method."
        }
      ],
      "output": "Standard payment: $150.0\nForeign currency payment: 150.0 EUR\nBlockchain wallet signature verification"
    },
    "codeExamples": [
      {
        "title": "Field Shadowing vs Method Overriding Trap",
        "description": "Proving that instance fields are bound at compile time by reference type, while instance methods are dispatched dynamically by runtime object type.",
        "code": "class Parent {\n    int value = 100;\n    void display() { System.out.println(\"Parent display: \" + value); }\n}\n\nclass Child extends Parent {\n    int value = 200; // Shadows Parent.value\n    @Override\n    void display() { System.out.println(\"Child display: \" + value); }\n}\n\npublic class FieldTrap {\n    public static void main(String[] args) {\n        Parent ref = new Child();\n        System.out.println(\"ref.value: \" + ref.value); // Field: compile-time bound to Parent\n        ref.display(); // Method: runtime dispatched to Child\n    }\n}",
        "output": "ref.value: 100\nChild display: 200"
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Expecting instance variables to behave polymorphically",
        "whyItHappens": "Developers assume if Child overrides fields, accessing ref.fieldName will evaluate to Child's value.",
        "howToFix": "Remember: In Java, fields and static methods are NEVER polymorphic. Only non-private, non-static instance methods are polymorphic."
      },
      {
        "mistake": "Trying to override static methods and expecting dynamic dispatch",
        "whyItHappens": "Defining a static method with identical signature in Child compiles without error.",
        "howToFix": "Recognize that static methods are hidden, not overridden. Calls resolve based on the declared reference type."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Polymorphic Method vs Non-Polymorphic Field",
        "problemStatement": "What is the console output produced by the following program?",
        "code": "class Base {\n    int x = 10;\n    int getX() { return x; }\n}\nclass Derived extends Base {\n    int x = 20;\n    int getX() { return x; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Base b = new Derived();\n        System.out.println(b.x + \" \" + b.getX());\n    }\n}",
        "options": [
          "10 10",
          "20 20",
          "10 20",
          "20 10"
        ],
        "correctOptionIndex": 2,
        "hint": "Variables resolve by reference type (Base). Methods resolve by heap object type (Derived).",
        "solution": "10 20",
        "explanation": "b.x accesses the field directly, resolving to Base.x (10). b.getX() invokes the virtual method, which dynamically dispatches to Derived.getX(), returning 20. Output is '10 20'."
      },
      {
        "title": "Puzzle 2: Overloading with Upcast References",
        "problemStatement": "Which overloaded method executes in this scenario?",
        "code": "class Printer {\n    void print(Object o) { System.out.println(\"Object\"); }\n    void print(String s) { System.out.println(\"String\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Printer p = new Printer();\n        Object obj = \"Hello\";\n        p.print(obj);\n    }\n}",
        "options": [
          "String",
          "Object",
          "Compilation Error",
          "Runtime Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Method overloading is resolved at compile time based on the declared type of the argument variable.",
        "solution": "Object",
        "explanation": "The declared type of 'obj' is Object. Because overloading resolution occurs at compile time, the compiler binds the call to print(Object). Output is 'Object'."
      },
      {
        "title": "Puzzle 3: Static Method Hiding",
        "problemStatement": "What is printed when calling static methods on an upcast reference?",
        "code": "class A {\n    static void test() { System.out.print(\"A\"); }\n}\nclass B extends A {\n    static void test() { System.out.print(\"B\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        A ref = new B();\n        ref.test();\n    }\n}",
        "options": [
          "B",
          "A",
          "AB",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Static methods cannot be overridden dynamically. The reference type dictates which static method is called.",
        "solution": "A",
        "explanation": "Static methods are bound at compile time. Since 'ref' is declared as type A, ref.test() compiles to A.test(), outputting 'A'."
      },
      {
        "title": "Puzzle 4: Overloading Parameter Widening",
        "problemStatement": "What is printed when an int argument matches both long and double overloads?",
        "code": "class OverloadCalc {\n    void compute(double d) { System.out.println(\"double\"); }\n    void compute(long l) { System.out.println(\"long\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        OverloadCalc c = new OverloadCalc();\n        int val = 5;\n        c.compute(val);\n    }\n}",
        "options": [
          "double",
          "long",
          "Compilation Error: ambiguous",
          "int"
        ],
        "correctOptionIndex": 1,
        "hint": "Java prefers primitive widening to the closest compatible integer type before floating-point conversion.",
        "solution": "long",
        "explanation": "int widens to long before widening to double. The compiler selects compute(long), printing 'long'."
      },
      {
        "title": "Puzzle 5: Overridden Method Invoking Super",
        "problemStatement": "What is printed by this recursive polymorphic call?",
        "code": "class Greeter {\n    void greet() { System.out.print(\"Hello \"); }\n}\nclass CustomGreeter extends Greeter {\n    void greet() {\n        super.greet();\n        System.out.print(\"World\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Greeter g = new CustomGreeter();\n        g.greet();\n    }\n}",
        "options": [
          "World",
          "Hello ",
          "Hello World",
          "World Hello "
        ],
        "correctOptionIndex": 2,
        "hint": "Follow super.greet() in the child method before printing 'World'.",
        "solution": "Hello World",
        "explanation": "g.greet() dispatches to CustomGreeter.greet(). Line 1 invokes super.greet() printing 'Hello ', then 'World' is printed, outputting 'Hello World'."
      },
      {
        "title": "Puzzle 6: Private Method Inheritance Trap",
        "problemStatement": "Does a private method in Parent get overridden by a public method in Child?",
        "code": "class Parent {\n    private void secret() { System.out.println(\"Parent\"); }\n    public void run() { secret(); }\n}\nclass Child extends Parent {\n    public void secret() { System.out.println(\"Child\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.run();\n    }\n}",
        "options": [
          "Child",
          "Parent",
          "Compilation Error",
          "Runtime Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Can a private method participate in virtual dispatch?",
        "solution": "Parent",
        "explanation": "Private methods are not inherited and cannot be overridden. In Parent.run(), the call to secret() is statically bound to Parent.secret(), printing 'Parent'."
      },
      {
        "title": "Puzzle 7: Multi-Level Polymorphic Chain",
        "problemStatement": "What is output by this 3-tier hierarchy?",
        "code": "class X { void show() { System.out.print(\"X\"); } }\nclass Y extends X { void show() { System.out.print(\"Y\"); } }\nclass Z extends Y {}\npublic class Main {\n    public static void main(String[] args) {\n        X obj = new Z();\n        obj.show();\n    }\n}",
        "options": [
          "X",
          "Y",
          "Z",
          "XYZ"
        ],
        "correctOptionIndex": 1,
        "hint": "Z does not override show(). What is the nearest implementation in the inheritance hierarchy?",
        "solution": "Y",
        "explanation": "Runtime dispatch checks Z for show(); not finding an override, it traverses upward to parent Y, which overrides show() printing 'Y'."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the key difference between compile-time polymorphism and runtime polymorphism in Java?",
        "answer": "Compile-time polymorphism (static polymorphism) is achieved through method overloading, where multiple methods in the same class share a name but have different parameter lists. The compiler determines exactly which method to invoke during compilation based on the declared types of the arguments. Runtime polymorphism (dynamic polymorphism) is achieved through method overriding, where a subclass redefines an instance method of its superclass. The compiler only verifies that the method signature exists on the reference type; the JVM dynamically determines and executes the method version belonging to the actual object on the heap at runtime.",
        "followUp": "Can instance variables or static methods be polymorphic in Java?",
        "followUpAnswer": "No. In Java, polymorphism applies exclusively to non-private, non-static instance methods. Instance variables and static methods are resolved statically at compile time based strictly on the declared reference type, never by the heap object.",
        "keyPhrases": [
          "Method overloading vs overriding",
          "Static binding vs dynamic dispatch",
          "Reference type vs heap object",
          "Non-polymorphic fields"
        ]
      },
      {
        "question": "Why does Java not support polymorphic instance variables (field overriding)?",
        "answer": "Fields represent state (memory storage layout), whereas methods represent behavior. When an object is instantiated on the heap, it allocates physical memory slots for every field declared across its entire superclass hierarchy. Allowing fields to be dynamically overridden would make memory layout unpredictable and cause severe performance degradation for field accesses. Instead, Java supports field shadowing: the child class creates a separate field that coexists with the parent field on the heap, and access is decided strictly at compile time by the reference type.",
        "followUp": "How can you achieve polymorphic access to field values cleanly?",
        "followUpAnswer": "By encapsulating fields behind getter methods! Because getter methods are instance methods that participate in dynamic dispatch, calling 'getAmount()' will execute the child's overridden getter and return the child's field value polymorphically.",
        "keyPhrases": [
          "Field shadowing",
          "Memory layout",
          "Static resolution",
          "Encapsulation via getters"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which of the following demonstrates compile-time polymorphism?",
        "options": [
          "Method overriding",
          "Method overloading",
          "Dynamic method dispatch",
          "Interface implementation"
        ],
        "correctIndex": 1,
        "explanation": "Method overloading is resolved at compile time by javac."
      },
      {
        "question": "Which of the following demonstrates runtime polymorphism?",
        "options": [
          "Method overloading",
          "Method overriding",
          "Operator precedence",
          "Type casting"
        ],
        "correctIndex": 1,
        "explanation": "Method overriding relies on dynamic dispatch by the JVM at runtime."
      },
      {
        "question": "If Parent p = new Child(); and both have an int 'val' field, what does p.val access?",
        "options": [
          "Child's val",
          "Parent's val",
          "Throws NoSuchFieldError",
          "The sum of both"
        ],
        "correctIndex": 1,
        "explanation": "Fields are not polymorphic; they resolve based on the reference type (Parent)."
      },
      {
        "question": "Can static methods participate in runtime polymorphism in Java?",
        "options": [
          "Yes, always",
          "No, static methods are hidden, not overridden",
          "Only if marked public",
          "Only if marked final"
        ],
        "correctIndex": 1,
        "explanation": "Static methods are bound at compile time to the class; they cannot be overridden."
      },
      {
        "question": "Which modifier prevents a method from participating in runtime polymorphism?",
        "options": [
          "public",
          "final",
          "protected",
          "synchronized"
        ],
        "correctIndex": 1,
        "explanation": "A 'final' method cannot be overridden by any subclass."
      },
      {
        "question": "When does the JVM resolve the method to call for an overridden virtual method?",
        "options": [
          "At compile time",
          "During bytecode compilation by javac",
          "At runtime via dynamic method dispatch",
          "During class loading"
        ],
        "correctIndex": 2,
        "explanation": "The JVM inspects the heap object at runtime to dispatch to the overridden method."
      },
      {
        "question": "What is the term for a subclass declaring a field with the exact same name as a superclass field?",
        "options": [
          "Field Overriding",
          "Field Shadowing (Hiding)",
          "Field Polymorphism",
          "Field Aliasing"
        ],
        "correctIndex": 1,
        "explanation": "In Java, fields cannot be overridden; they shadow (hide) the superclass field."
      },
      {
        "question": "How are overloaded method calls resolved when passing arguments?",
        "options": [
          "By the runtime heap object type",
          "By the compile-time declared type of arguments",
          "Randomly",
          "By the method return type"
        ],
        "correctIndex": 1,
        "explanation": "The compiler matches argument types at compile time."
      },
      {
        "question": "Can private methods be overridden in Java?",
        "options": [
          "Yes, if the subclass declares them public",
          "No, private methods are invisible to subclasses and bound statically",
          "Yes, using the @Override annotation",
          "Only within the same package"
        ],
        "correctIndex": 1,
        "explanation": "Private methods are not inherited and cannot participate in dynamic dispatch."
      },
      {
        "question": "How can a developer safely expose polymorphic state without field overriding?",
        "options": [
          "Make all fields public",
          "Encapsulate fields behind polymorphic getter methods",
          "Use static variables",
          "Declare fields transient"
        ],
        "correctIndex": 1,
        "explanation": "Getter methods are virtual and participate in runtime polymorphism."
      }
    ]
  },
  "dynamic-method-dispatch": {
    "id": "dynamic-method-dispatch",
    "moduleId": "java-polymorphism",
    "moduleTitle": "12. Polymorphism & Dispatch",
    "lessonNumber": "Lesson 12.2",
    "title": "Dynamic Method Dispatch & Virtual Method Invocation",
    "subtitle": "How the JVM invokes methods at runtime: the vtable (virtual method table), invokevirtual bytecode, and object headers",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of a hospital reception desk managing doctors. When an emergency alarm rings with 'Treat Patient', the head nurse does not look up Dr. Smith's medical degree in advance. Instead, the nurse grabs the clipboard of whichever doctor is currently standing in the triage room (the concrete object on the heap). If the doctor on duty is a Pediatrician, they administer children's medicine; if the doctor is an Orthopedic Surgeon, they set a bone cast. The nurse uses the generic dispatch protocol 'doctor.treatPatient()', and the doctor's actual badge (the object header and vtable) instantly points to their specialized clinical training.",
    "interviewTakeaways": [
      "What is Dynamic Method Dispatch? It is the mechanism by which a call to an overridden method is resolved at runtime rather than compile time.",
      "The vtable (Virtual Method Table): The JVM creates a virtual method table for each class loaded in memory. The vtable contains function pointers to the concrete bytecode implementations for each inheritable method.",
      "The invokevirtual Bytecode: Ordinary instance method calls compile to the 'invokevirtual' opcode. At runtime, the JVM reads the object header's klass pointer, indexes into the vtable, and jumps directly to the method address.",
      "Polymorphism with Object Arrays: A single loop iterating over a superclass array (e.g. Shape[] shapes) dynamically dispatches each call to circle.draw(), square.draw(), or triangle.draw() seamlessly.",
      "JIT Inlining & Monomorphic Dispatch: When the JIT compiler detects that a call site consistently calls only one concrete class (monomorphic callsite), it optimizes away vtable lookup and inlines the method body directly for near-zero overhead!"
    ],
    "cheatSheet": {
      "summary": "Dynamic method dispatch is the core engine of OOP in Java. The JVM reads the object's vtable at runtime to invoke the most specific subclass implementation.",
      "syntaxTemplate": "Shape[] shapes = {\n    new Circle(5.0),\n    new Rectangle(4.0, 6.0)\n};\n\nfor (Shape s : shapes) {\n    System.out.println(s.calculateArea()); // Dynamically dispatched!\n}",
      "rules": [
        {
          "rule": "Instance Methods Are Virtual By Default",
          "explanation": "In Java, all non-static, non-private, non-final methods are virtual methods (unlike C++, no 'virtual' keyword needed)."
        },
        {
          "rule": "vtable Index Consistency",
          "explanation": "Subclass vtables maintain identical method indices as superclasses so indexing is O(1) in memory."
        },
        {
          "rule": "Reference Defines Interface",
          "explanation": "You can only invoke methods that are declared in the reference type's class or its ancestors."
        },
        {
          "rule": "Object Defines Execution",
          "explanation": "The concrete object on the heap dictates which overridden version of the method runs."
        },
        {
          "rule": "Zero Overhead for Monomorphic Calls",
          "explanation": "HotSpot JIT compiler devirtualizes and inlines call sites where only one target class is ever observed."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Resolution Speed",
          "optionA": "Direct Inlined: Fast (O(1) direct instruction)",
          "optionB": "vtable Lookup: Fast (O(1) pointer dereference)"
        },
        {
          "aspect": "Method Type",
          "optionA": "Virtual: Default in Java (overridable)",
          "optionB": "Non-Virtual: private, static, final (direct call)"
        },
        {
          "aspect": "C++ vs Java",
          "optionA": "C++: Non-virtual by default (requires 'virtual')",
          "optionB": "Java: Virtual by default (requires 'final' to disable)"
        },
        {
          "aspect": "Polymorphic Collection",
          "optionA": "Shape[]: Can hold any subclass instance",
          "optionB": "Loop dispatches without instanceof branching"
        }
      ]
    },
    "coreExplanation": [
      "In Java, every non-private, non-static, non-final method is inherently a 'virtual method'. There is no need for a 'virtual' keyword like in C# or C++.",
      "When an instance method is called, the Java compiler emits the `invokevirtual` bytecode instruction. This instruction specifies a constant pool index representing the method signature.",
      "At runtime, the JVM looks at the target object instance on the Heap. Every object has an Object Header containing a Mark Word and a Klass Word (pointer to class metadata).",
      "The class metadata in Metaspace contains a Virtual Method Table (vtable). The vtable is an array of memory pointers pointing directly to the compiled bytecode for each method.",
      "Because subclass vtables retain the exact same indexing offsets for inherited methods as their parent classes, looking up an overridden method is an ultra-fast O(1) array index dereference.",
      "Dynamic dispatch eliminates fragile if-else / switch cascades: instead of checking 'if (shape instanceof Circle) ... else if (shape instanceof Square)...', developers simply call `shape.draw()` and let the JVM dispatch automatically."
    ],
    "diagram": "DYNAMIC DISPATCH MEMORY LOOKUP:\n1. Caller executes: shape.calculateArea(); (shape ref points to Circle in Heap)\n\nSTACK (Frame)                   HEAP (Circle Instance)          METASPACE (Circle Class)\n+-------------------+           +-----------------------+       +------------------------+\n| shape: [0x500]    |---------->| Object Header:        |------>| Circle Klass Metadata  |\n+-------------------+           |  - Mark Word          |       | vtable:                |\n                                |  - Klass Pointer [0xC]|       |  [0] toString()        |\n                                | Fields:               |       |  [1] equals()          |\n                                |  - radius: 5.0        |       |  [2] calculateArea() -> Circle.calculateArea()\n                                +-----------------------+       +------------------------+\n                                                                            |\n                                                                            v Executes Circle bytecode!",
    "codeSnippet": {
      "title": "Polymorphic Processing via Superclass Array and Dynamic Dispatch",
      "code": "abstract class Vehicle {\n    private String brand;\n    public Vehicle(String brand) { this.brand = brand; }\n    public String getBrand() { return brand; }\n    public abstract void drive();\n}\n\nclass SportsCar extends Vehicle {\n    public SportsCar(String brand) { super(brand); }\n    @Override\n    public void drive() {\n        System.out.println(getBrand() + \" SportsCar: Accelerating with twin-turbo roar!\");\n    }\n}\n\nclass ElectricCar extends Vehicle {\n    public ElectricCar(String brand) { super(brand); }\n    @Override\n    public void drive() {\n        System.out.println(getBrand() + \" EV: Gliding silently with instant electric torque.\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Polymorphic array: holds distinct subclass instances\n        Vehicle[] fleet = {\n            new SportsCar(\"Ferrari\"),\n            new ElectricCar(\"Tesla\"),\n            new SportsCar(\"Porsche\")\n        };\n\n        // Dynamic dispatch: one loop, multiple distinct behaviors\n        for (Vehicle v : fleet) {\n            v.drive(); // JVM dispatches dynamically based on concrete heap object!\n        }\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Vehicle[] fleet = { ... }",
          "explanation": "Creates a Vehicle array holding references to SportsCar and ElectricCar instances on the heap."
        },
        {
          "line": "for (Vehicle v : fleet)",
          "explanation": "Iterates using the superclass reference type Vehicle."
        },
        {
          "line": "v.drive();",
          "explanation": "The JVM executes invokevirtual; dynamically looks up each object's vtable and invokes the correct drive() method with zero manual branching."
        }
      ],
      "output": "Ferrari SportsCar: Accelerating with twin-turbo roar!\nTesla EV: Gliding silently with instant electric torque.\nPorsche SportsCar: Accelerating with twin-turbo roar!"
    },
    "codeExamples": [
      {
        "title": "Audio Notification Dispatcher",
        "description": "Demonstrating dynamic dispatch in an event notification pipeline.",
        "code": "class Notifier {\n    void notifyUser(String msg) { System.out.println(\"Standard notification: \" + msg); }\n}\nclass SmsNotifier extends Notifier {\n    @Override\n    void notifyUser(String msg) { System.out.println(\"SMS Sent: [\" + msg + \"]\"); }\n}\nclass PushNotifier extends Notifier {\n    @Override\n    void notifyUser(String msg) { System.out.println(\"Push Alert: >> \" + msg + \" <<\"); }\n}\n\npublic class NotificationDemo {\n    public static void send(Notifier n, String msg) {\n        n.notifyUser(msg); // Dynamic dispatch point\n    }\n    public static void main(String[] args) {\n        send(new SmsNotifier(), \"Your code is 1234\");\n        send(new PushNotifier(), \"Meeting starts in 5m\");\n    }\n}",
        "output": "SMS Sent: [Your code is 1234]\nPush Alert: >> Meeting starts in 5m <<"
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Using huge if-else instanceof ladders instead of dynamic dispatch",
        "whyItHappens": "Beginners accustomed to procedural programming write 'if (type == 1) doA(); else if (type == 2) doB();'.",
        "howToFix": "Define a polymorphic method on the base class and override it in each subclass. Let the JVM handle branching."
      },
      {
        "mistake": "Trying to call a subclass-specific method through a superclass reference",
        "whyItHappens": "Assuming because the heap object is a SportsCar, 'Vehicle v = new SportsCar(); v.turboBoost();' will work.",
        "howToFix": "The compiler checks the reference type! If turboBoost() is not declared in Vehicle, you must downcast first."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Polymorphic Array Execution",
        "problemStatement": "What is printed by iterating over this polymorphic array?",
        "code": "class Instrument { void play() { System.out.print(\"Sound \"); } }\nclass Guitar extends Instrument { void play() { System.out.print(\"Strum \"); } }\nclass Drum extends Instrument { void play() { System.out.print(\"Beat \"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Instrument[] band = { new Guitar(), new Drum(), new Instrument() };\n        for (Instrument i : band) i.play();\n    }\n}",
        "options": [
          "Sound Sound Sound ",
          "Strum Beat Sound ",
          "Strum Beat ",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Each array element dispatches to its respective runtime object's play() implementation.",
        "solution": "Strum Beat Sound ",
        "explanation": "Element 0 (Guitar) prints 'Strum ', element 1 (Drum) prints 'Beat ', element 2 (Instrument) prints 'Sound '. Output is 'Strum Beat Sound '."
      },
      {
        "title": "Puzzle 2: Dynamic Dispatch with Internal Helper",
        "problemStatement": "What is the output of this program?",
        "code": "class SuperClass {\n    void start() { step(); }\n    void step() { System.out.print(\"SuperStep \"); }\n}\nclass SubClass extends SuperClass {\n    @Override\n    void step() { System.out.print(\"SubStep \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        SuperClass obj = new SubClass();\n        obj.start();\n    }\n}",
        "options": [
          "SuperStep ",
          "SubStep ",
          "SuperStep SubStep ",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "When start() calls step(), 'this' is the concrete SubClass object on the heap!",
        "solution": "SubStep ",
        "explanation": "obj.start() runs SuperClass.start(). Inside start(), the call to step() is implicitly this.step(). Since 'this' points to SubClass on the heap, dynamic dispatch invokes SubClass.step(), printing 'SubStep '."
      },
      {
        "title": "Puzzle 3: Method Calling During Object Construction",
        "problemStatement": "What does this code print during constructor execution?",
        "code": "class ParentClass {\n    ParentClass() { printMsg(); }\n    void printMsg() { System.out.print(\"P1 \"); }\n}\nclass ChildClass extends ParentClass {\n    int num = 42;\n    @Override\n    void printMsg() { System.out.print(\"C\" + num + \" \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new ChildClass();\n    }\n}",
        "options": [
          "P1 ",
          "C42 ",
          "C0 ",
          "NullPointerException"
        ],
        "correctOptionIndex": 2,
        "hint": "When ParentClass constructor runs, ChildClass fields (num) have not been initialized yet!",
        "solution": "C0 ",
        "explanation": "ParentClass() runs and calls printMsg(). Dynamic dispatch resolves printMsg() to ChildClass.printMsg(). But ChildClass fields are still at default zero values because ChildClass's constructor hasn't run yet! So it prints 'C0 '."
      },
      {
        "title": "Puzzle 4: Compile-Time Reference Boundary",
        "problemStatement": "What happens when calling a subclass method not present in the superclass?",
        "code": "class Device { void turnOn() {} }\nclass Phone extends Device {\n    void makeCall() { System.out.println(\"Calling\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Device d = new Phone();\n        d.makeCall();\n    }\n}",
        "options": [
          "Calling",
          "Compilation Error: cannot find symbol makeCall()",
          "NullPointerException",
          "Runtime ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "Does the declared reference type 'Device' have a method named makeCall()?",
        "solution": "Compilation Error: cannot find symbol makeCall()",
        "explanation": "The compiler checks the declared reference type. Since Device has no makeCall() method, compilation fails."
      },
      {
        "title": "Puzzle 5: Overridden toString() in String Concatenation",
        "problemStatement": "What does System.out.println(p) print when toString() is overridden?",
        "code": "class Person {\n    String name;\n    Person(String n) { this.name = n; }\n    @Override\n    public String toString() { return \"Person: \" + name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Object p = new Person(\"Alice\");\n        System.out.println(p);\n    }\n}",
        "options": [
          "Person@hexHash",
          "Person: Alice",
          "Alice",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "println(Object) invokes String.valueOf(p), which calls p.toString() polymorphically.",
        "solution": "Person: Alice",
        "explanation": "System.out.println internally calls toString() on the passed object. Dynamic dispatch resolves to Person.toString(), printing 'Person: Alice'."
      },
      {
        "title": "Puzzle 6: Covariant Return Dynamic Dispatch",
        "problemStatement": "What is the return type observed by callers of covariant returns?",
        "code": "class Alpha { Alpha create() { return new Alpha(); } }\nclass Beta extends Alpha {\n    @Override\n    Beta create() { return new Beta(); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Alpha a = new Beta();\n        System.out.println(a.create().getClass().getSimpleName());\n    }\n}",
        "options": [
          "Alpha",
          "Beta",
          "Object",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Which create() method executes at runtime on the Beta object?",
        "solution": "Beta",
        "explanation": "Dynamic dispatch invokes Beta's create(), which instantiates and returns a new Beta object. getClass().getSimpleName() prints 'Beta'."
      },
      {
        "title": "Puzzle 7: vtable Lookup Order",
        "problemStatement": "If a class inherits a method and does NOT override it, which vtable entry is called?",
        "code": "class Level1 { void op() { System.out.print(\"L1\"); } }\nclass Level2 extends Level1 {}\nclass Level3 extends Level2 {}\npublic class Main {\n    public static void main(String[] args) {\n        Level1 l = new Level3();\n        l.op();\n    }\n}",
        "options": [
          "L3",
          "L2",
          "L1",
          "Compilation Error"
        ],
        "correctOptionIndex": 2,
        "hint": "Level2 and Level3 inherit Level1's vtable entry unchanged.",
        "solution": "L1",
        "explanation": "Since neither Level2 nor Level3 overrides op(), Level3's vtable points directly to Level1's op() bytecode, printing 'L1'."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain how Dynamic Method Dispatch works internally in the JVM.",
        "answer": "When the Java compiler encounters an instance method invocation on a reference variable, it emits the 'invokevirtual' opcode. At runtime, the JVM does not know what concrete class is on the other end of the reference until it executes. Every object header on the heap contains a pointer (the Klass pointer) to its class metadata in Metaspace. This metadata contains a Virtual Method Table (vtable)\u2014an array of direct function pointers to compiled bytecode for all virtual methods. Because the JVM guarantees that a subclass vtable retains the identical method indexing offsets as its parent classes, looking up an overridden method is an instantaneous O(1) array dereference. The JVM fetches the function pointer at that index and jumps to the subclass implementation.",
        "followUp": "How does the HotSpot JIT compiler optimize dynamic dispatch for high performance?",
        "followUpAnswer": "HotSpot monitors execution frequency. If a call site is 'monomorphic' (consistently receiving only one concrete class type), the JIT compiler devirtualizes the call, eliminates the vtable lookup entirely, and inlines the target method body directly into the caller code, achieving near-zero overhead.",
        "keyPhrases": [
          "invokevirtual",
          "Virtual Method Table (vtable)",
          "O(1) pointer dereference",
          "Object header klass pointer",
          "JIT inlining",
          "Monomorphic devirtualization"
        ]
      },
      {
        "question": "Why is invoking overridable methods inside a constructor considered a dangerous anti-pattern?",
        "answer": "When a superclass constructor executes, the subclass constructor has not yet run, meaning any instance fields declared in the subclass have not yet been initialized to their constructor-assigned values (they hold only default zero/null values). Because method calls in Java are dynamically dispatched based on the runtime object type, calling an overridable method from a superclass constructor will jump straight into the subclass method before its fields are initialized! If the subclass method relies on its own fields, it may encounter 0, false, null, or throw NullPointerExceptions, causing subtle and catastrophic initialization bugs.",
        "followUp": "How do you prevent this bug in class design?",
        "followUpAnswer": "Make constructors only invoke methods that are marked 'private' or 'final', ensuring they cannot be overridden by any subclass.",
        "keyPhrases": [
          "Uninitialized subclass fields",
          "Premature dynamic dispatch",
          "Anti-pattern",
          "Private or final constructor helpers"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the JVM bytecode instruction used for normal virtual method invocation?",
        "options": [
          "invokestatic",
          "invokevirtual",
          "invokespecial",
          "invokedynamic"
        ],
        "correctIndex": 1,
        "explanation": "invokevirtual is the standard opcode for dynamic instance method dispatch."
      },
      {
        "question": "What data structure does the JVM use to achieve O(1) dynamic method dispatch?",
        "options": [
          "HashMap",
          "Virtual Method Table (vtable)",
          "Binary Search Tree",
          "LinkedList"
        ],
        "correctIndex": 1,
        "explanation": "The JVM vtable is an array of function pointers indexed by method offset."
      },
      {
        "question": "What does every Java object header on the heap contain to enable dynamic dispatch?",
        "options": [
          "A copy of all class methods",
          "A pointer to its class metadata (Klass pointer)",
          "A unique String name",
          "A garbage collector lock only"
        ],
        "correctIndex": 1,
        "explanation": "The Klass pointer in the object header references the class metadata in Metaspace."
      },
      {
        "question": "Are methods in Java virtual by default?",
        "options": [
          "No, you must specify 'virtual'",
          "Yes, all non-private, non-static, non-final methods are virtual",
          "Only abstract methods are virtual",
          "Only methods in interfaces are virtual"
        ],
        "correctIndex": 1,
        "explanation": "In Java, instance methods are virtual by default unless explicitly disabled with final/private."
      },
      {
        "question": "What happens if a superclass constructor calls an overridden method?",
        "options": [
          "The superclass method executes",
          "The subclass method executes before subclass fields are initialized",
          "A CompilationError occurs",
          "The JVM crashes immediately"
        ],
        "correctIndex": 1,
        "explanation": "Dynamic dispatch invokes the subclass method before its constructor has initialized fields."
      },
      {
        "question": "What is a monomorphic call site?",
        "options": [
          "A call site that calls many different classes",
          "A call site where the JVM observes only one single concrete class at runtime",
          "A method with zero parameters",
          "A call site that fails to compile"
        ],
        "correctIndex": 1,
        "explanation": "A monomorphic call site always targets the same class, enabling JIT inlining."
      },
      {
        "question": "Which of the following is NOT resolved via dynamic method dispatch?",
        "options": [
          "public void calculate()",
          "protected void display()",
          "public static void process()",
          "void draw()"
        ],
        "correctIndex": 2,
        "explanation": "Static methods are resolved at compile time using static binding."
      },
      {
        "question": "Can you call a subclass-specific method using an uncast superclass reference?",
        "options": [
          "Yes, the JVM detects it dynamically",
          "No, the compiler checks that the method exists on the reference type",
          "Only if the method is public",
          "Only inside a loop"
        ],
        "correctIndex": 1,
        "explanation": "The compiler validates all method invocations against the declared reference type."
      },
      {
        "question": "What is the time complexity of a vtable method lookup at runtime?",
        "options": [
          "O(n) where n is hierarchy depth",
          "O(log n)",
          "O(1) constant time array indexing",
          "O(n^2)"
        ],
        "correctIndex": 2,
        "explanation": "vtable lookup is an O(1) memory offset dereference."
      },
      {
        "question": "Why is dynamic dispatch superior to switch statements based on type codes?",
        "options": [
          "It is easier to add new subclasses without modifying existing caller code (Open-Closed Principle)",
          "It uses more memory",
          "It requires fewer classes",
          "It disables the garbage collector"
        ],
        "correctIndex": 0,
        "explanation": "Dynamic dispatch adheres to the Open-Closed Principle: new subclasses add behavior without editing caller code."
      }
    ]
  },
  "casting-and-classcastexception": {
    "id": "casting-and-classcastexception",
    "moduleId": "java-polymorphism",
    "moduleTitle": "12. Polymorphism & Dispatch",
    "lessonNumber": "Lesson 12.3",
    "title": "Upcasting, Downcasting & ClassCastException",
    "subtitle": "Widening reference conversion vs narrowing reference conversion, heap object safety, and handling ClassCastException",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of optical lens filters on a camera. When you put a wide-angle lens adapter on your camera (Upcasting: Dog to Animal), you are intentionally zooming out. You see the entire animal kingdom view: you can tell the animal to eat or sleep, but you lose fine-grained sight of its dog-specific collar or tail-wagging reflex. Widening is 100% safe\u2014every Dog is guaranteed to be an Animal. Downcasting (Animal to Dog) is like zooming back in through a high-magnification telephoto lens. If the creature in the grass actually IS a Dog, zooming in reveals the collar perfectly. But if the creature was secretly a Cat or a Lion, and you blindly force the telephoto zoom expecting a Dog, your camera lens cracks into pieces\u2014that is the runtime crash known as ClassCastException!",
    "interviewTakeaways": [
      "Upcasting (Widening Reference Conversion): Implicitly casting a subclass reference to a superclass reference (e.g. Animal a = new Dog()). It is ALWAYS safe and requires no explicit cast syntax.",
      "Downcasting (Narrowing Reference Conversion): Casting a superclass reference down to a subclass reference (e.g. Dog d = (Dog) a). It requires an explicit cast operator `(Dog)` and checks runtime compatibility.",
      "What Causes ClassCastException? Attempting to downcast an object to a type that is NOT in the object's actual class hierarchy on the heap.",
      "The Compiler vs Runtime Split: The compiler permits downcasting if there is ANY possibility the reference could point to that subtype within the hierarchy. The JVM verifies the actual object type at runtime and throws ClassCastException if incompatible.",
      "Downcasting Null References: Casting `null` to any reference type (e.g. `(Dog) null`) does NOT throw ClassCastException; the resulting reference simply remains `null`."
    ],
    "cheatSheet": {
      "summary": "Upcasting widens a reference to a superclass safely without an explicit cast. Downcasting narrows a reference to a subclass, requiring explicit syntax and risking ClassCastException if the heap object is incompatible.",
      "syntaxTemplate": "Animal a = new Dog(); // Upcasting (implicit, safe)\nDog d = (Dog) a;      // Downcasting (explicit, safe here)\n\nAnimal a2 = new Cat();\nDog d2 = (Dog) a2;    // CRASH! Throws ClassCastException at runtime",
      "rules": [
        {
          "rule": "Upcasting is Always Safe & Implicit",
          "explanation": "Every Dog IS-A Animal. No explicit cast syntax required."
        },
        {
          "rule": "Downcasting Requires Explicit Cast",
          "explanation": "Must use (Subclass) syntax to acknowledge the narrowing risk."
        },
        {
          "rule": "Compile-Time Feasibility Check",
          "explanation": "The compiler rejects casts between unrelated sibling classes (e.g. (Dog) new Cat() will not compile)."
        },
        {
          "rule": "Runtime Compatibility Verification",
          "explanation": "JVM checks object header klass pointer; throws ClassCastException on mismatch."
        },
        {
          "rule": "Null Casts are Harmless",
          "explanation": "Casting null to any type results in null without throwing ClassCastException."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Direction",
          "optionA": "Upcasting: Subclass -> Superclass (up the tree)",
          "optionB": "Downcasting: Superclass -> Subclass (down the tree)"
        },
        {
          "aspect": "Safety",
          "optionA": "100% safe (guaranteed by IS-A)",
          "optionB": "Dangerous: can throw ClassCastException at runtime"
        },
        {
          "aspect": "Syntax",
          "optionA": "Implicit: Animal a = new Dog();",
          "optionB": "Explicit: Dog d = (Dog) a;"
        },
        {
          "aspect": "Purpose",
          "optionA": "Generalize behavior (polymorphic arrays)",
          "optionB": "Reclaim access to subclass-specific methods"
        }
      ]
    },
    "coreExplanation": [
      "In Java, reference type casting does NOT modify the underlying object on the Heap in any way! Casting only changes the 'lens' (the static type) through which the compiler allows you to view and interact with the object.",
      "Upcasting is an implicit widening conversion: you assign a subclass reference to a superclass variable. Because a subclass inherits all visible members of its superclass, this conversion is guaranteed to be safe.",
      "Downcasting is an explicit narrowing conversion: you assign a superclass reference to a subclass variable. Because a superclass reference might point to a completely different subclass (or to the superclass itself), the compiler demands explicit `(Subclass)` syntax.",
      "Compile-Time vs Runtime Cast Checks: The compiler allows a downcast as long as the source and target types share an inheritance relationship. The JVM checks the actual heap object at runtime using the object header.",
      "ClassCastException is an unchecked (runtime) exception thrown by the JVM when a downcast fails at runtime.",
      "Downcasting without verification is an anti-pattern. Developers traditionally protect downcasts using the `instanceof` operator before performing the cast."
    ],
    "diagram": "CASTING IN THE CLASS HIERARCHY:\n\n         [ Animal ]  <------- Base Superclass\n          ^      ^\n          |      |  (Upcasting: Safe & Automatic)\n     (Dog)       (Cat) (Downcasting: Explicit & Risky!)\n          |      |\n       [ Dog ]  [ Cat ] <--- Sibling Subclasses\n\nSCENARIO 1 (SAFE DOWNCAST):\nAnimal a = new Dog(); // Heap object is DOG\nDog d = (Dog) a;      // JVM checks: Is heap object a Dog? YES! Cast succeeds.\n\nSCENARIO 2 (FATAL CRASH):\nAnimal a = new Cat(); // Heap object is CAT\nDog d = (Dog) a;      // JVM checks: Is heap object a Dog? NO! Cat is not Dog!\n                      // ---> THINKS: DISASTER! java.lang.ClassCastException!",
    "codeSnippet": {
      "title": "Safe Downcasting with ClassCastException Demonstration",
      "code": "class Employee {\n    String name;\n    public Employee(String name) { this.name = name; }\n    public void work() { System.out.println(name + \" is working.\"); }\n}\n\nclass SoftwareEngineer extends Employee {\n    public SoftwareEngineer(String name) { super(name); }\n    public void writeCode() { System.out.println(name + \" is writing Java code.\"); }\n}\n\nclass Manager extends Employee {\n    public Manager(String name) { super(name); }\n    public void planBudget() { System.out.println(name + \" is planning the budget.\"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // 1. Upcasting: implicit and safe\n        Employee emp = new SoftwareEngineer(\"Munaf\");\n        emp.work(); // Accessible via Employee reference\n\n        // 2. Safe Downcasting: reclaiming writeCode()\n        if (emp instanceof SoftwareEngineer) {\n            SoftwareEngineer dev = (SoftwareEngineer) emp;\n            dev.writeCode();\n        }\n\n        // 3. Unsafe Downcasting demonstration caught with try-catch\n        try {\n            Manager mgr = (Manager) emp; // Fails! emp is a SoftwareEngineer, not a Manager\n            mgr.planBudget();\n        } catch (ClassCastException e) {\n            System.out.println(\"Caught expected cast exception: \" + e.getMessage());\n        }\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Employee emp = new SoftwareEngineer(\"Munaf\");",
          "explanation": "Upcasting widens the reference to Employee; emp can access work() polymorphically."
        },
        {
          "line": "SoftwareEngineer dev = (SoftwareEngineer) emp;",
          "explanation": "Downcasting narrows the reference; compiles and succeeds at runtime because the heap object is indeed a SoftwareEngineer."
        },
        {
          "line": "dev.writeCode();",
          "explanation": "Successfully accesses subclass-specific writeCode() method."
        },
        {
          "line": "Manager mgr = (Manager) emp;",
          "explanation": "The JVM detects that the SoftwareEngineer object on the heap cannot be cast to Manager and throws ClassCastException."
        }
      ],
      "output": "Munaf is working.\nMunaf is writing Java code.\nCaught expected cast exception: class SoftwareEngineer cannot be cast to class Manager"
    },
    "codeExamples": [
      {
        "title": "Casting Null References Safely",
        "description": "Proving that casting null to any reference type does not trigger ClassCastException.",
        "code": "class Test {\n    public static void main(String[] args) {\n        String str = null;\n        Object obj = str; // Upcast null to Object\n        Integer num = (Integer) obj; // Downcast null Object to Integer\n\n        System.out.println(\"num reference is: \" + num);\n        System.out.println(\"Cast of null succeeded with zero exceptions!\");\n    }\n}",
        "output": "num reference is: null\nCast of null succeeded with zero exceptions!"
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Believing that casting modifies the object in memory",
        "whyItHappens": "Confusing primitive numeric conversion (like (int) 3.14 truncating double bits) with reference casting.",
        "howToFix": "Reference casting only changes the reference variable type; the underlying heap object is 100% unchanged."
      },
      {
        "mistake": "Downcasting without verifying type via instanceof first",
        "whyItHappens": "Assuming an array of superclass elements will only ever contain one specific subclass.",
        "howToFix": "Always guard explicit downcasts with 'if (ref instanceof TargetType)' to prevent ClassCastException crashes."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Unrelated Type Cast Compilation Check",
        "problemStatement": "Will the compiler allow casting between unrelated sibling classes?",
        "code": "class Dog {}\nclass Cat {}\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        Cat c = (Cat) d;\n    }\n}",
        "options": [
          "Compiles and runs with no output",
          "Throws ClassCastException at runtime",
          "Compilation Error: inconvertible types",
          "NullPointerException"
        ],
        "correctOptionIndex": 2,
        "hint": "Is there any inheritance relationship between Dog and Cat?",
        "solution": "Compilation Error: inconvertible types",
        "explanation": "Because Dog and Cat are unrelated classes with no shared inheritance (other than Object), the compiler knows at compile time that the cast is impossible and refuses to compile it."
      },
      {
        "title": "Puzzle 2: Intermediate Object Reference Cast",
        "problemStatement": "What happens if we cast through an Object reference intermediate?",
        "code": "class Dog {}\nclass Cat {}\npublic class Main {\n    public static void main(String[] args) {\n        Object obj = new Dog();\n        Cat c = (Cat) obj;\n    }\n}",
        "options": [
          "Compilation Error",
          "Throws ClassCastException at runtime",
          "Compiles and prints null",
          "Success"
        ],
        "correctOptionIndex": 1,
        "hint": "The compiler sees (Cat) applied to an Object, which is legal. What does the JVM find at runtime?",
        "solution": "Throws ClassCastException at runtime",
        "explanation": "Because Object could theoretically hold a Cat, javac allows the downcast. At runtime, the JVM finds a Dog on the heap and throws java.lang.ClassCastException."
      },
      {
        "title": "Puzzle 3: Safe Downcast in Multi-Level Hierarchy",
        "problemStatement": "What is printed by this multi-level cast chain?",
        "code": "class Grandparent { String id = \"GP\"; }\nclass Parent extends Grandparent { String id = \"P\"; }\nclass Child extends Parent { String id = \"C\"; }\npublic class Main {\n    public static void main(String[] args) {\n        Grandparent ref = new Child();\n        System.out.println(((Parent) ref).id + \" \" + ((Child) ref).id);\n    }\n}",
        "options": [
          "GP GP",
          "P C",
          "C C",
          "GP C"
        ],
        "correctOptionIndex": 1,
        "hint": "Fields resolve by the cast reference type! ((Parent) ref).id accesses Parent.id.",
        "solution": "P C",
        "explanation": "Fields are resolved at compile time by the reference type. Casting to Parent accesses Parent.id ('P'), casting to Child accesses Child.id ('C'). Output is 'P C'."
      },
      {
        "title": "Puzzle 4: Downcasting Superclass Instance",
        "problemStatement": "Can a genuine superclass instance on the heap be downcast to a subclass?",
        "code": "class Vehicle {}\nclass Car extends Vehicle {}\npublic class Main {\n    public static void main(String[] args) {\n        Vehicle v = new Vehicle();\n        Car c = (Car) v;\n    }\n}",
        "options": [
          "Compiles and runs with no error",
          "Throws ClassCastException at runtime",
          "Compilation Error",
          "c becomes null"
        ],
        "correctOptionIndex": 1,
        "hint": "Is a generic Vehicle object on the heap a Car?",
        "solution": "Throws ClassCastException at runtime",
        "explanation": "A pure Vehicle instance on the heap does NOT possess Car state. Casting it to Car fails at runtime with ClassCastException."
      },
      {
        "title": "Puzzle 5: Null Downcast Safe Handling",
        "problemStatement": "What is the result of casting a null reference to a subclass?",
        "code": "class Node {}\nclass TreeNode extends Node {}\npublic class Main {\n    public static void main(String[] args) {\n        Node n = null;\n        TreeNode tn = (TreeNode) n;\n        System.out.println(\"Result: \" + tn);\n    }\n}",
        "options": [
          "Result: null",
          "Throws ClassCastException",
          "Throws NullPointerException",
          "Compilation Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Does the JVM throw ClassCastException when casting null?",
        "solution": "Result: null",
        "explanation": "Casting null to any reference type is guaranteed by the JLS to succeed without throwing any exception, yielding null."
      },
      {
        "title": "Puzzle 6: Downcast Method Resolution",
        "problemStatement": "What method runs when an upcast object is cast back to its own type?",
        "code": "class Super { void m() { System.out.print(\"Super \"); } }\nclass Sub extends Super { void m() { System.out.print(\"Sub \"); } }\npublic class Main {\n    public static void main(String[] args) {\n        Super s = new Sub();\n        ((Super) s).m();\n        ((Sub) s).m();\n    }\n}",
        "options": [
          "Super Sub ",
          "Sub Sub ",
          "Super Super ",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Casting changes only the reference type; dynamic dispatch ALWAYS executes the heap object method!",
        "solution": "Sub Sub ",
        "explanation": "Regardless of whether the reference is viewed as Super or Sub, the concrete object on the heap is Sub. Dynamic dispatch invokes Sub.m() both times, printing 'Sub Sub '."
      },
      {
        "title": "Puzzle 7: Downcast to Array Type",
        "problemStatement": "Can an Object reference holding an int array be cast back to int[]?",
        "code": "public class Main {\n    public static void main(String[] args) {\n        Object obj = new int[]{10, 20};\n        int[] arr = (int[]) obj;\n        System.out.println(arr[0]);\n    }\n}",
        "options": [
          "10",
          "Compilation Error",
          "ClassCastException",
          "20"
        ],
        "correctOptionIndex": 0,
        "hint": "Arrays in Java are authentic objects inheriting from Object.",
        "solution": "10",
        "explanation": "int[] is a subtype of java.lang.Object. Downcasting the Object reference back to int[] succeeds and allows indexing, printing 10."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between Upcasting and Downcasting in Java?",
        "answer": "Upcasting is casting a reference from a subclass type to a superclass type (e.g. Animal a = new Dog()). Upcasting is always safe because every subclass IS-A superclass, and Java performs it implicitly without explicit cast syntax. Downcasting is casting a reference from a superclass type down to a subclass type (e.g. Dog d = (Dog) a). Downcasting requires explicit cast syntax because it is inherently risky: if the actual object on the heap is not an instance of the target subclass, the JVM will throw a java.lang.ClassCastException at runtime.",
        "followUp": "When does the Java compiler reject a cast at compile time versus deferring the check to runtime?",
        "followUpAnswer": "The compiler checks if the source and target classes are in the same inheritance hierarchy. If two classes are completely unrelated (e.g. Dog and Cat), the compiler knows with 100% mathematical certainty that no object can ever be both, and throws a compile-time 'inconvertible types' error. If they share an inheritance relationship (or involve interfaces/Object), the compiler permits the cast and delegates verification to runtime.",
        "keyPhrases": [
          "Upcasting vs Downcasting",
          "Implicit vs explicit",
          "ClassCastException",
          "Compile-time inconvertible check",
          "Runtime verification"
        ]
      },
      {
        "question": "What occurs in JVM memory when you cast a reference variable?",
        "answer": "Absolutely nothing changes inside the object on the Heap! Reference casting does not convert or manipulate bits on the heap (unlike primitive casting which converts 64-bit doubles into 32-bit ints). A reference in Java is merely a 64-bit memory pointer to a heap address. Casting simply changes the static type that the Java compiler associates with that pointer on the thread stack, expanding or restricting the set of methods and fields you are permitted to access at compile time.",
        "followUp": "What is the performance overhead of reference downcasting?",
        "followUpAnswer": "Downcasting involves a lightweight runtime check (the 'checkcast' bytecode instruction) where the JVM compares the object's klass pointer against the target class metadata. It is an extremely fast pointer comparison, but modern JIT optimizations often eliminate it entirely when type flow analysis proves safety.",
        "keyPhrases": [
          "Zero heap alteration",
          "Compile-time lens",
          "checkcast opcode",
          "Heap address pointer"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which type conversion requires explicit cast syntax (e.g. '(Subclass) ref')?",
        "options": [
          "Upcasting",
          "Downcasting",
          "Widening primitive conversion",
          "Autoboxing"
        ],
        "correctIndex": 1,
        "explanation": "Downcasting is narrowing and risky, requiring explicit cast syntax."
      },
      {
        "question": "What runtime exception is thrown when an illegal downcast occurs?",
        "options": [
          "NullPointerException",
          "IllegalCastException",
          "ClassCastException",
          "IllegalArgumentException"
        ],
        "correctIndex": 2,
        "explanation": "The JVM throws java.lang.ClassCastException when an object cannot be cast to the target type."
      },
      {
        "question": "What happens if you compile: 'Dog d = new Dog(); Cat c = (Cat) d;' (where Dog and Cat are unrelated)?",
        "options": [
          "Compiles and runs cleanly",
          "Fails to compile with 'inconvertible types' error",
          "Throws ClassCastException at runtime",
          "Cat becomes null"
        ],
        "correctIndex": 1,
        "explanation": "The compiler rejects casts between completely unrelated classes at compile time."
      },
      {
        "question": "Does reference casting modify the object on the heap?",
        "options": [
          "Yes, it removes subclass fields",
          "No, it only changes the reference type perspective on the stack",
          "Yes, it creates a new object copy",
          "Only if casting to Object"
        ],
        "correctIndex": 1,
        "explanation": "Reference casting never alters the underlying heap object."
      },
      {
        "question": "What is the result of '(String) null'?",
        "options": [
          "Throws NullPointerException",
          "Throws ClassCastException",
          "Evaluates safely to null without error",
          "Compilation error"
        ],
        "correctIndex": 2,
        "explanation": "Casting null to any reference type produces null safely."
      },
      {
        "question": "Why is upcasting always safe?",
        "options": [
          "Because superclasses have more fields than subclasses",
          "Because a subclass is guaranteed to fulfill the complete contract of its superclass (IS-A)",
          "Because the JVM allocates new memory",
          "Because it uses reflection"
        ],
        "correctIndex": 1,
        "explanation": "Liskov Substitution Principle: Every subclass inherits all capabilities of its superclass."
      },
      {
        "question": "Which bytecode opcode is generated for explicit downcasting in Java?",
        "options": [
          "checkcast",
          "instanceof",
          "invokevirtual",
          "castto"
        ],
        "correctIndex": 0,
        "explanation": "The JVM emits 'checkcast' to verify runtime compatibility for explicit downcasts."
      },
      {
        "question": "If 'Object obj = new Vehicle();', can you do 'Car c = (Car) obj;'?",
        "options": [
          "Fails compilation",
          "Compiles, but throws ClassCastException at runtime if obj is not a Car",
          "Always succeeds",
          "Throws OutOfMemoryError"
        ],
        "correctIndex": 1,
        "explanation": "It compiles because Car extends Object, but fails at runtime if the heap object is just a Vehicle."
      },
      {
        "question": "How should developers safely guard against ClassCastException?",
        "options": [
          "Wrap everything in synchronized blocks",
          "Check type compatibility using 'instanceof' before casting",
          "Set references to null first",
          "Avoid using inheritance"
        ],
        "correctIndex": 1,
        "explanation": "Checking with instanceof ensures downcasting only occurs on compatible objects."
      },
      {
        "question": "If you upcast 'Dog d' to 'Animal a', can you call dog-specific method 'd.fetch()' using 'a.fetch()'?",
        "options": [
          "Yes, dynamic dispatch resolves it",
          "No, fetch() is not declared on Animal, so the compiler rejects it",
          "Only if fetch() is public",
          "Only if marked static"
        ],
        "correctIndex": 1,
        "explanation": "The compiler restricts method calls to those declared on the reference type (Animal)."
      }
    ]
  },
  "instanceof-and-pattern-matching": {
    "id": "instanceof-and-pattern-matching",
    "moduleId": "java-polymorphism",
    "moduleTitle": "12. Polymorphism & Dispatch",
    "lessonNumber": "Lesson 12.4",
    "title": "The instanceof Operator & Modern Pattern Matching",
    "subtitle": "Runtime type testing, null safety, modern Java pattern matching syntax, and scoping rules",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of an airport TSA security checkpoint. Before letting someone into the cockpit (calling a Pilot-specific method), the security guard inspects the crew member's badge. In traditional Java, the guard would check: 'Is this badge an airline pilot badge?' (instanceof check). If yes, the guard would then walk over to a clipboard and re-write their name down on a pilot roster sheet (the repetitive, boilerplate downcast `Pilot p = (Pilot) person`). With modern Java Pattern Matching (introduced in Java 14/16), the guard simply says: 'If you have a Pilot badge, step right through as Pilot captain' (`if (person instanceof Pilot captain)`). The check and the scoped variable binding happen simultaneously in one elegant, zero-boilerplate step!",
    "interviewTakeaways": [
      "The instanceof Operator: A binary operator used to test whether an object reference is an instance of a specified class, subclass, or interface at runtime.",
      "Null Safety: `null instanceof AnyType` ALWAYS evaluates to `false` without throwing a NullPointerException. This makes instanceof a safe null guard.",
      "Traditional instanceof Boilerplate: In Java 1.0 - Java 13, you had to write two statements: `if (obj instanceof Dog) { Dog d = (Dog) obj; d.bark(); }`.",
      "Modern Pattern Matching for instanceof (Java 16+ Standard): Combines the type test and conditional extraction into one statement: `if (obj instanceof Dog d) { d.bark(); }`. The variable `d` is automatically cast and in-scope only when true.",
      "Flow Scoping Rules: Pattern variables use flow scoping. The variable is in-scope only where the compiler can definitely prove the pattern matched (e.g. inside the `if` block, or after `&&` conditions, or after an early exit guard)."
    ],
    "cheatSheet": {
      "summary": "The instanceof operator tests runtime type compatibility with built-in null safety. Modern pattern matching combines type-testing and downcasting into a single, clean statement.",
      "syntaxTemplate": "// Traditional (pre-Java 16)\nif (shape instanceof Circle) {\n    Circle c = (Circle) shape;\n    c.getRadius();\n}\n\n// Modern Pattern Matching (Java 16+)\nif (shape instanceof Circle c) {\n    c.getRadius(); // 'c' is automatically cast and scoped!\n}",
      "rules": [
        {
          "rule": "Null Always Yields False",
          "explanation": "null instanceof Anything evaluates to false without throwing NullPointerException."
        },
        {
          "rule": "IS-A Compatibility Check",
          "explanation": "Evaluates to true if the heap object is the exact type OR any subclass of the target type."
        },
        {
          "rule": "Flow Scoping for Pattern Variables",
          "explanation": "Pattern variable is in scope only where condition is guaranteed true."
        },
        {
          "rule": "Logical AND Combination",
          "explanation": "Allowed: if (obj instanceof String s && s.length() > 5) (s is in scope after &&)."
        },
        {
          "rule": "Logical OR Disallowed with Pattern Var",
          "explanation": "Illegal: if (obj instanceof String s || s.length() > 5) (s is not definitely assigned if first condition is false)."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Syntax",
          "optionA": "Traditional: if (obj instanceof T) { T t = (T) obj; }",
          "optionB": "Pattern Matching: if (obj instanceof T t) { ... }"
        },
        {
          "aspect": "Boilerplate",
          "optionA": "High (redundant type name and cast)",
          "optionB": "Zero (compiler introduces scoped variable)"
        },
        {
          "aspect": "Null Handling",
          "optionA": "Safely evaluates to false",
          "optionB": "Safely evaluates to false (pattern variable not bound)"
        },
        {
          "aspect": "Scope",
          "optionA": "t is scoped to the block",
          "optionB": "t has flow-dependent scope"
        }
      ]
    },
    "coreExplanation": [
      "The `instanceof` comparison is a fundamental runtime type introspection operator in Java. It evaluates whether the heap object pointed to by a reference is assignment-compatible with the target type.",
      "The null guarantee: In Java, `null` has no type. Therefore, evaluating `null instanceof String` or `null instanceof Object` always yields `false`. You never need to write `if (obj != null && obj instanceof String)`.",
      "Pattern Matching for `instanceof` (finalized in Java 16, JEP 394) eliminates the clumsy ceremony of test-then-cast by introducing a pattern variable directly in the condition: `if (obj instanceof String s)`.",
      "Flow Scoping: Unlike traditional local variables whose scope is bounded by enclosing curly braces `{ }`, a pattern variable's scope is determined by flow analysis. The variable is introduced only in branches where the pattern test has succeeded.",
      "Compound Conditions with `&&`: Because `&&` evaluates left-to-right with short-circuiting, if `obj instanceof String s` is true, `s` is immediately available in the right-hand operand: `if (obj instanceof String s && !s.isEmpty())`.",
      "Early Exit Inversion: If an early return guard negates the check: `if (!(obj instanceof Point p)) return;`, the pattern variable `p` remains in scope for the remainder of the method body because execution only reaches that point if the check was true!"
    ],
    "diagram": "TRADITIONAL INSTANCEOF:                        MODERN PATTERN MATCHING:\n1. Test: if (obj instanceof Dog)             1. Single Combined Step:\n2. Cast: Dog d = (Dog) obj;                     if (obj instanceof Dog d) {\n3. Use:  d.bark();                                  d.bark(); // d is already a Dog!\n                                                }\nFLOW SCOPING IN ACTION:\nif (obj instanceof String s && s.length() > 3) {\n   [ s is in scope HERE! ]\n}\n// s is OUT OF SCOPE here!",
    "codeSnippet": {
      "title": "Modern Pattern Matching for instanceof with Flow Scoping",
      "code": "abstract class Shape {\n    public abstract double area();\n}\n\nclass Circle extends Shape {\n    double radius;\n    public Circle(double r) { this.radius = r; }\n    @Override public double area() { return Math.PI * radius * radius; }\n    public double getDiameter() { return 2 * radius; }\n}\n\nclass Rectangle extends Shape {\n    double width, height;\n    public Rectangle(double w, double h) { this.width = w; this.height = h; }\n    @Override public double area() { return width * height; }\n}\n\npublic class Solution {\n    public static void inspectShape(Shape shape) {\n        // Modern Pattern Matching for instanceof\n        if (shape instanceof Circle c) {\n            System.out.printf(\"Circle with diameter: %.2f%n\", c.getDiameter());\n        } else if (shape instanceof Rectangle r && r.width == r.height) {\n            System.out.println(\"Square with side: \" + r.width);\n        } else if (shape instanceof Rectangle r) {\n            System.out.println(\"Rectangle with dimensions: \" + r.width + \"x\" + r.height);\n        } else {\n            System.out.println(\"Generic shape or null\");\n        }\n    }\n\n    public static void main(String[] args) {\n        inspectShape(new Circle(3.5));\n        inspectShape(new Rectangle(4.0, 4.0));\n        inspectShape(new Rectangle(2.0, 5.0));\n        inspectShape(null); // Demonstrates null safety\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "if (shape instanceof Circle c)",
          "explanation": "Tests if shape is a Circle. If true, binds and downcasts to 'c' automatically with zero boilerplate."
        },
        {
          "line": "else if (shape instanceof Rectangle r && r.width == r.height)",
          "explanation": "Demonstrates flow scoping: 'r' is available on the right side of the && operator."
        },
        {
          "line": "inspectShape(null);",
          "explanation": "Demonstrates built-in null safety: null instanceof Circle evaluates to false cleanly without throwing NullPointerException."
        }
      ],
      "output": "Circle with diameter: 7.00\nSquare with side: 4.0\nRectangle with dimensions: 2.0x5.0\nGeneric shape or null"
    },
    "codeExamples": [
      {
        "title": "Early Return Guard with Pattern Matching",
        "description": "Demonstrating how inverting the pattern match with an early exit keeps the pattern variable in scope for the rest of the method.",
        "code": "class Account {\n    String id;\n    Account(String id) { this.id = id; }\n}\n\npublic class GuardDemo {\n    public static void process(Object obj) {\n        if (!(obj instanceof Account acc)) {\n            System.out.println(\"Not an account, exiting.\");\n            return;\n        }\n        // 'acc' is in scope here because the method would have returned if it wasn't an Account!\n        System.out.println(\"Processing Account ID: \" + acc.id);\n    }\n\n    public static void main(String[] args) {\n        process(new Account(\"ACC-404\"));\n        process(\"A random string\");\n    }\n}",
        "output": "Processing Account ID: ACC-404\nNot an account, exiting."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Writing redundant null checks before instanceof (e.g. 'if (x != null && x instanceof Dog)')",
        "whyItHappens": "Developers are conditioned to fear NullPointerExceptions and add defensive null checks everywhere.",
        "howToFix": "Recognize that 'instanceof' is specified by the Java Language Specification to return false for null automatically."
      },
      {
        "mistake": "Attempting to use a pattern variable with logical OR ('||')",
        "whyItHappens": "Trying to write 'if (obj instanceof String s || s.isEmpty())'.",
        "howToFix": "If the left side is false, 's' is not defined. The compiler rejects pattern variables in || expressions for safety."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Null Reference with instanceof",
        "problemStatement": "What is printed when evaluating instanceof on a null reference?",
        "code": "public class Main {\n    public static void main(String[] args) {\n        String s = null;\n        System.out.println(s instanceof String);\n        System.out.println(s instanceof Object);\n    }\n}",
        "options": [
          "false false",
          "true true",
          "Throws NullPointerException",
          "false true"
        ],
        "correctOptionIndex": 0,
        "hint": "Does null hold an object on the heap?",
        "solution": "false false",
        "explanation": "null is not an instance of any class. 'null instanceof AnyType' always evaluates to false without throwing an exception."
      },
      {
        "title": "Puzzle 2: Pattern Matching with && Short-Circuit",
        "problemStatement": "What is the output of this program?",
        "code": "public class Main {\n    public static void main(String[] args) {\n        Object data = \"Java\";\n        if (data instanceof String s && s.length() == 4) {\n            System.out.println(\"Matched: \" + s.toUpperCase());\n        } else {\n            System.out.println(\"No match\");\n        }\n    }\n}",
        "options": [
          "Matched: JAVA",
          "No match",
          "Compilation Error",
          "ClassCastException"
        ],
        "correctOptionIndex": 0,
        "hint": "Does data match String, and is length() == 4?",
        "solution": "Matched: JAVA",
        "explanation": "data is a String of length 4. The pattern match succeeds, 's' is bound to 'Java', and s.toUpperCase() prints 'Matched: JAVA'."
      },
      {
        "title": "Puzzle 3: Inheritance Hierarchy instanceof Check",
        "problemStatement": "What is printed by this inheritance test?",
        "code": "class Animal {}\nclass Dog extends Animal {}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        System.out.println((a instanceof Dog) + \" \" + (a instanceof Animal) + \" \" + (a instanceof Object));\n    }\n}",
        "options": [
          "true true true",
          "true false false",
          "false true true",
          "Compilation Error"
        ],
        "correctOptionIndex": 0,
        "hint": "A Dog IS-A Dog, IS-A Animal, and IS-A Object!",
        "solution": "true true true",
        "explanation": "instanceof checks the entire ancestor chain of the heap object. Since a Dog inherits from Animal and Object, all three tests return true."
      },
      {
        "title": "Puzzle 4: Pattern Variable Scope in Else Block",
        "problemStatement": "What happens if code attempts to access a pattern variable inside the else block?",
        "code": "public class Main {\n    public static void main(String[] args) {\n        Object obj = 42;\n        if (obj instanceof String s) {\n            System.out.println(s);\n        } else {\n            System.out.println(s);\n        }\n    }\n}",
        "options": [
          "Prints null",
          "Prints 42",
          "Compilation Error: cannot find symbol 's'",
          "Runtime Error"
        ],
        "correctOptionIndex": 2,
        "hint": "Is 's' guaranteed to exist in the else block?",
        "solution": "Compilation Error: cannot find symbol 's'",
        "explanation": "Pattern variables use flow scoping. Inside the else block, the test was false, meaning 's' was not bound and does not exist in scope."
      },
      {
        "title": "Puzzle 5: Array Instanceof Verification",
        "problemStatement": "Is an integer array an instance of Object and Object[]?",
        "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println((arr instanceof Object) + \" \" + (Object) arr instanceof Object[]);\n    }\n}",
        "options": [
          "true true",
          "true false",
          "false false",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Primitive arrays (int[]) inherit from Object, but NOT from Object[] (reference arrays).",
        "solution": "true false",
        "explanation": "int[] is an Object, but it is not an Object[] because primitives cannot be widened to Object references without boxing. Output is 'true false'."
      },
      {
        "title": "Puzzle 6: Early Exit Inversion Scoping",
        "problemStatement": "What is printed by this early exit method?",
        "code": "public class Main {\n    static void check(Object val) {\n        if (!(val instanceof Integer num)) return;\n        System.out.println(\"Num: \" + (num * 2));\n    }\n    public static void main(String[] args) {\n        check(21);\n    }\n}",
        "options": [
          "Num: 42",
          "Compilation Error: num is out of scope",
          "NullPointerException",
          "No output"
        ],
        "correctOptionIndex": 0,
        "hint": "Because the method returns when NOT an Integer, execution only proceeds if it WAS an Integer!",
        "solution": "Num: 42",
        "explanation": "Due to flow scoping, the compiler knows execution only reaches past the 'if (!...)' guard if val was indeed an Integer. 'num' remains in scope and prints 'Num: 42'."
      },
      {
        "title": "Puzzle 7: Shadowing with Pattern Variable",
        "problemStatement": "Can a pattern variable shadow a field in the enclosing class?",
        "code": "public class Main {\n    static String val = \"FIELD\";\n    public static void main(String[] args) {\n        Object obj = \"LOCAL\";\n        if (obj instanceof String val) {\n            System.out.println(val);\n        }\n    }\n}",
        "options": [
          "FIELD",
          "LOCAL",
          "Compilation Error: duplicate variable",
          "NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Pattern variables can shadow class-level fields just like local variables.",
        "solution": "LOCAL",
        "explanation": "The pattern variable 'val' shadows the static field 'val' within the 'if' block, successfully printing 'LOCAL'."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is Pattern Matching for instanceof and what problem does it solve in Java?",
        "answer": "Pattern Matching for instanceof (introduced in Java 14 and standardized in Java 16 under JEP 394) combines the type test and downcasting operation into a single atomic statement. In older Java versions, testing and casting required tedious, error-prone boilerplate: first testing with instanceof, then declaring a new variable and explicitly downcasting. Pattern matching allows you to declare a pattern variable directly in the condition (e.g. `if (obj instanceof String s)`). If the test passes, the variable is automatically extracted and cast, eliminating boilerplate and preventing ClassCastExceptions.",
        "followUp": "Explain the concept of 'Flow Scoping' for pattern variables.",
        "followUpAnswer": "Flow Scoping means the scope of a pattern variable is determined by the flow of control, rather than simple syntactic block curly braces. The pattern variable is in scope only where the compiler can mathematically prove that the pattern matched. For example, in 'if (obj instanceof String s && s.length() > 5)', 's' is in scope on the right side of '&&' because the right side only executes if the left was true. Conversely, 's' is NOT in scope in '||' expressions because the right side only executes if the left was false.",
        "keyPhrases": [
          "JEP 394",
          "Eliminate boilerplate casting",
          "Flow scoping",
          "Safe pattern variable binding"
        ]
      },
      {
        "question": "Why does 'null instanceof AnyClass' evaluate to false instead of throwing a NullPointerException?",
        "answer": "According to the Java Language Specification (JLS \u00a715.20.2), the instanceof operator specifically returns false if the relational expression evaluates to null. This design decision was made deliberately so that developers would not need to write redundant null checks (such as 'if (obj != null && obj instanceof String)') before every type inspection. In Java, 'null' has a special null type that is a subtype of every reference type, but null represents the absence of any concrete object instance on the heap, so it cannot be an instance of any class.",
        "followUp": "Can instanceof be used to test primitive types like int or double?",
        "followUpAnswer": "No. The instanceof operator works exclusively with reference types and objects on the heap. Testing a primitive type (e.g. '5 instanceof int') causes a compile-time error.",
        "keyPhrases": [
          "JLS \u00a715.20.2",
          "Built-in null safety",
          "Absence of heap instance",
          "Reference types only"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the result of 'null instanceof String'?",
        "options": [
          "Throws NullPointerException",
          "true",
          "false",
          "Compilation Error"
        ],
        "correctIndex": 2,
        "explanation": "The JLS guarantees that null instanceof AnyType always returns false."
      },
      {
        "question": "In which Java version was Pattern Matching for instanceof finalized as a standard feature?",
        "options": [
          "Java 8",
          "Java 11",
          "Java 16",
          "Java 21"
        ],
        "correctIndex": 2,
        "explanation": "Pattern matching for instanceof was standardized in Java 16 (JEP 394)."
      },
      {
        "question": "What is the scope of a pattern variable declared in 'if (obj instanceof Dog d)'?",
        "options": [
          "The entire enclosing class",
          "Only within the 'if' block where the test succeeded",
          "Both the 'if' and 'else' blocks",
          "Global scope"
        ],
        "correctIndex": 1,
        "explanation": "Flow scoping restricts 'd' to branches where the pattern is guaranteed to have matched."
      },
      {
        "question": "Is the following legal: 'if (obj instanceof String s || s.isEmpty())'?",
        "options": [
          "Yes, standard syntax",
          "No, compilation error because 's' is not in scope after '||'",
          "Yes, but throws NullPointerException",
          "Only in Java 21+"
        ],
        "correctIndex": 1,
        "explanation": "In an || expression, the right side only runs if the left was false, meaning 's' was not bound."
      },
      {
        "question": "Is the following legal: 'if (obj instanceof String s && s.length() > 0)'?",
        "options": [
          "Yes, 's' is in scope on the right side of '&&'",
          "No, 's' can only be used inside the block",
          "Compilation error: unexpected variable",
          "Runtime error"
        ],
        "correctIndex": 0,
        "explanation": "Because '&&' short-circuits, the right side only executes if 's' was successfully matched."
      },
      {
        "question": "Can 'instanceof' be used with primitive types like 'int'?",
        "options": [
          "Yes, checks primitive size",
          "No, causes a compile-time error",
          "Only if autoboxed to Integer",
          "Yes, in Java 17+"
        ],
        "correctIndex": 1,
        "explanation": "instanceof requires reference types; primitive types cause compile-time errors."
      },
      {
        "question": "If Dog extends Animal, what does 'new Dog() instanceof Animal' return?",
        "options": [
          "false",
          "true",
          "Compilation error",
          "null"
        ],
        "correctIndex": 1,
        "explanation": "instanceof checks the entire inheritance hierarchy, so a Dog is an instance of Animal."
      },
      {
        "question": "What happens if a pattern variable has the same name as a field in the class?",
        "options": [
          "Compilation error: duplicate variable",
          "The pattern variable shadows the field within its scope",
          "The field value is overwritten",
          "Runtime error"
        ],
        "correctIndex": 1,
        "explanation": "Pattern variables shadow class fields just like local variables."
      },
      {
        "question": "What happens when you write 'if (!(obj instanceof Point p)) return; p.distance();'?",
        "options": [
          "p is out of scope and fails compilation",
          "Compiles and executes because p is in scope after the early return",
          "Throws ClassCastException",
          "Causes memory leak"
        ],
        "correctIndex": 1,
        "explanation": "Flow analysis proves execution only continues if obj was a Point, so 'p' remains in scope."
      },
      {
        "question": "Why is pattern matching preferred over traditional instanceof + cast?",
        "options": [
          "It makes code execute 100x faster",
          "It eliminates boilerplate code and completely prevents accidental ClassCastExceptions",
          "It avoids allocating memory on the stack",
          "It allows casting to unrelated types"
        ],
        "correctIndex": 1,
        "explanation": "Pattern matching merges type-testing and extraction into a safe, concise idiom."
      }
    ]
  }
};
