# build_oop12_p1.py
import json

lessons_p1 = {}

# -------------------------------------------------------------
# LESSON 12.1: Compile-Time vs Runtime Polymorphism
# -------------------------------------------------------------
lessons_p1["compile-vs-runtime-polymorphism"] = {
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
            {"rule": "Overloading = Same Name, Different Signatures", "explanation": "Overloaded methods must differ in parameter count, parameter types, or parameter order. Return type alone does not differentiate."},
            {"rule": "Overriding = Same Name, Exact Same Signature", "explanation": "Subclass redefines inherited method with identical name and parameter types."},
            {"rule": "Binding Decision Point", "explanation": "Overloading is decided by the compiler (early binding); overriding is decided by the JVM at runtime (late binding)."},
            {"rule": "Variables Are Never Polymorphic", "explanation": "If Child defines 'int x = 20' and Parent defines 'int x = 10', 'Parent p = new Child(); p.x' evaluates to 10."},
            {"rule": "Static Methods Do Not Override", "explanation": "Static methods are hidden, not overridden. Calling Parent.method() executes Parent's static method."}
        ],
        "quickComparison": [
            {"aspect": "Mechanism", "optionA": "Compile-Time: Method Overloading", "optionB": "Runtime: Method Overriding"},
            {"aspect": "When Resolved", "optionA": "Compile time by javac", "optionB": "Runtime by JVM dynamic dispatch"},
            {"aspect": "Class Requirement", "optionA": "Can be within a single class", "optionB": "Requires inheritance (parent and child classes)"},
            {"aspect": "Signature Rules", "optionA": "Must have different parameter lists", "optionB": "Must have exact same parameter signature"}
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
            {"line": "PaymentGateway gateway = new CryptoPaymentGateway();", "explanation": "Upcasting: reference variable is of superclass type PaymentGateway; concrete heap object is CryptoPaymentGateway."},
            {"line": "gateway.process(150.0);", "explanation": "Compile-time binding matches the single double parameter process(double) signature."},
            {"line": "gateway.process(150.0, \"EUR\");", "explanation": "Compile-time binding matches the two-parameter process(double, String) signature."},
            {"line": "gateway.authorize();", "explanation": "Runtime polymorphism: JVM inspects the heap object, finds it is CryptoPaymentGateway, and executes its overridden authorize() method."}
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
            "options": ["10 10", "20 20", "10 20", "20 10"],
            "correctOptionIndex": 2,
            "hint": "Variables resolve by reference type (Base). Methods resolve by heap object type (Derived).",
            "solution": "10 20",
            "explanation": "b.x accesses the field directly, resolving to Base.x (10). b.getX() invokes the virtual method, which dynamically dispatches to Derived.getX(), returning 20. Output is '10 20'."
        },
        {
            "title": "Puzzle 2: Overloading with Upcast References",
            "problemStatement": "Which overloaded method executes in this scenario?",
            "code": "class Printer {\n    void print(Object o) { System.out.println(\"Object\"); }\n    void print(String s) { System.out.println(\"String\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Printer p = new Printer();\n        Object obj = \"Hello\";\n        p.print(obj);\n    }\n}",
            "options": ["String", "Object", "Compilation Error", "Runtime Error"],
            "correctOptionIndex": 1,
            "hint": "Method overloading is resolved at compile time based on the declared type of the argument variable.",
            "solution": "Object",
            "explanation": "The declared type of 'obj' is Object. Because overloading resolution occurs at compile time, the compiler binds the call to print(Object). Output is 'Object'."
        },
        {
            "title": "Puzzle 3: Static Method Hiding",
            "problemStatement": "What is printed when calling static methods on an upcast reference?",
            "code": "class A {\n    static void test() { System.out.print(\"A\"); }\n}\nclass B extends A {\n    static void test() { System.out.print(\"B\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        A ref = new B();\n        ref.test();\n    }\n}",
            "options": ["B", "A", "AB", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Static methods cannot be overridden dynamically. The reference type dictates which static method is called.",
            "solution": "A",
            "explanation": "Static methods are bound at compile time. Since 'ref' is declared as type A, ref.test() compiles to A.test(), outputting 'A'."
        },
        {
            "title": "Puzzle 4: Overloading Parameter Widening",
            "problemStatement": "What is printed when an int argument matches both long and double overloads?",
            "code": "class OverloadCalc {\n    void compute(double d) { System.out.println(\"double\"); }\n    void compute(long l) { System.out.println(\"long\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        OverloadCalc c = new OverloadCalc();\n        int val = 5;\n        c.compute(val);\n    }\n}",
            "options": ["double", "long", "Compilation Error: ambiguous", "int"],
            "correctOptionIndex": 1,
            "hint": "Java prefers primitive widening to the closest compatible integer type before floating-point conversion.",
            "solution": "long",
            "explanation": "int widens to long before widening to double. The compiler selects compute(long), printing 'long'."
        },
        {
            "title": "Puzzle 5: Overridden Method Invoking Super",
            "problemStatement": "What is printed by this recursive polymorphic call?",
            "code": "class Greeter {\n    void greet() { System.out.print(\"Hello \"); }\n}\nclass CustomGreeter extends Greeter {\n    void greet() {\n        super.greet();\n        System.out.print(\"World\");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Greeter g = new CustomGreeter();\n        g.greet();\n    }\n}",
            "options": ["World", "Hello ", "Hello World", "World Hello "],
            "correctOptionIndex": 2,
            "hint": "Follow super.greet() in the child method before printing 'World'.",
            "solution": "Hello World",
            "explanation": "g.greet() dispatches to CustomGreeter.greet(). Line 1 invokes super.greet() printing 'Hello ', then 'World' is printed, outputting 'Hello World'."
        },
        {
            "title": "Puzzle 6: Private Method Inheritance Trap",
            "problemStatement": "Does a private method in Parent get overridden by a public method in Child?",
            "code": "class Parent {\n    private void secret() { System.out.println(\"Parent\"); }\n    public void run() { secret(); }\n}\nclass Child extends Parent {\n    public void secret() { System.out.println(\"Child\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.run();\n    }\n}",
            "options": ["Child", "Parent", "Compilation Error", "Runtime Error"],
            "correctOptionIndex": 1,
            "hint": "Can a private method participate in virtual dispatch?",
            "solution": "Parent",
            "explanation": "Private methods are not inherited and cannot be overridden. In Parent.run(), the call to secret() is statically bound to Parent.secret(), printing 'Parent'."
        },
        {
            "title": "Puzzle 7: Multi-Level Polymorphic Chain",
            "problemStatement": "What is output by this 3-tier hierarchy?",
            "code": "class X { void show() { System.out.print(\"X\"); } }\nclass Y extends X { void show() { System.out.print(\"Y\"); } }\nclass Z extends Y {}\npublic class Main {\n    public static void main(String[] args) {\n        X obj = new Z();\n        obj.show();\n    }\n}",
            "options": ["X", "Y", "Z", "XYZ"],
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
            "keyPhrases": ["Method overloading vs overriding", "Static binding vs dynamic dispatch", "Reference type vs heap object", "Non-polymorphic fields"]
        },
        {
            "question": "Why does Java not support polymorphic instance variables (field overriding)?",
            "answer": "Fields represent state (memory storage layout), whereas methods represent behavior. When an object is instantiated on the heap, it allocates physical memory slots for every field declared across its entire superclass hierarchy. Allowing fields to be dynamically overridden would make memory layout unpredictable and cause severe performance degradation for field accesses. Instead, Java supports field shadowing: the child class creates a separate field that coexists with the parent field on the heap, and access is decided strictly at compile time by the reference type.",
            "followUp": "How can you achieve polymorphic access to field values cleanly?",
            "followUpAnswer": "By encapsulating fields behind getter methods! Because getter methods are instance methods that participate in dynamic dispatch, calling 'getAmount()' will execute the child's overridden getter and return the child's field value polymorphically.",
            "keyPhrases": ["Field shadowing", "Memory layout", "Static resolution", "Encapsulation via getters"]
        }
    ],
    "miniQuiz": [
        {"question": "Which of the following demonstrates compile-time polymorphism?", "options": ["Method overriding", "Method overloading", "Dynamic method dispatch", "Interface implementation"], "correctIndex": 1, "explanation": "Method overloading is resolved at compile time by javac."},
        {"question": "Which of the following demonstrates runtime polymorphism?", "options": ["Method overloading", "Method overriding", "Operator precedence", "Type casting"], "correctIndex": 1, "explanation": "Method overriding relies on dynamic dispatch by the JVM at runtime."},
        {"question": "If Parent p = new Child(); and both have an int 'val' field, what does p.val access?", "options": ["Child's val", "Parent's val", "Throws NoSuchFieldError", "The sum of both"], "correctIndex": 1, "explanation": "Fields are not polymorphic; they resolve based on the reference type (Parent)."},
        {"question": "Can static methods participate in runtime polymorphism in Java?", "options": ["Yes, always", "No, static methods are hidden, not overridden", "Only if marked public", "Only if marked final"], "correctIndex": 1, "explanation": "Static methods are bound at compile time to the class; they cannot be overridden."},
        {"question": "Which modifier prevents a method from participating in runtime polymorphism?", "options": ["public", "final", "protected", "synchronized"], "correctIndex": 1, "explanation": "A 'final' method cannot be overridden by any subclass."},
        {"question": "When does the JVM resolve the method to call for an overridden virtual method?", "options": ["At compile time", "During bytecode compilation by javac", "At runtime via dynamic method dispatch", "During class loading"], "correctIndex": 2, "explanation": "The JVM inspects the heap object at runtime to dispatch to the overridden method."},
        {"question": "What is the term for a subclass declaring a field with the exact same name as a superclass field?", "options": ["Field Overriding", "Field Shadowing (Hiding)", "Field Polymorphism", "Field Aliasing"], "correctIndex": 1, "explanation": "In Java, fields cannot be overridden; they shadow (hide) the superclass field."},
        {"question": "How are overloaded method calls resolved when passing arguments?", "options": ["By the runtime heap object type", "By the compile-time declared type of arguments", "Randomly", "By the method return type"], "correctIndex": 1, "explanation": "The compiler matches argument types at compile time."},
        {"question": "Can private methods be overridden in Java?", "options": ["Yes, if the subclass declares them public", "No, private methods are invisible to subclasses and bound statically", "Yes, using the @Override annotation", "Only within the same package"], "correctIndex": 1, "explanation": "Private methods are not inherited and cannot participate in dynamic dispatch."},
        {"question": "How can a developer safely expose polymorphic state without field overriding?", "options": ["Make all fields public", "Encapsulate fields behind polymorphic getter methods", "Use static variables", "Declare fields transient"], "correctIndex": 1, "explanation": "Getter methods are virtual and participate in runtime polymorphism."}
    ]
}

# -------------------------------------------------------------
# LESSON 12.2: Dynamic Method Dispatch & Virtual Method Invocation
# -------------------------------------------------------------
lessons_p1["dynamic-method-dispatch"] = {
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
            {"rule": "Instance Methods Are Virtual By Default", "explanation": "In Java, all non-static, non-private, non-final methods are virtual methods (unlike C++, no 'virtual' keyword needed)."},
            {"rule": "vtable Index Consistency", "explanation": "Subclass vtables maintain identical method indices as superclasses so indexing is O(1) in memory."},
            {"rule": "Reference Defines Interface", "explanation": "You can only invoke methods that are declared in the reference type's class or its ancestors."},
            {"rule": "Object Defines Execution", "explanation": "The concrete object on the heap dictates which overridden version of the method runs."},
            {"rule": "Zero Overhead for Monomorphic Calls", "explanation": "HotSpot JIT compiler devirtualizes and inlines call sites where only one target class is ever observed."}
        ],
        "quickComparison": [
            {"aspect": "Resolution Speed", "optionA": "Direct Inlined: Fast (O(1) direct instruction)", "optionB": "vtable Lookup: Fast (O(1) pointer dereference)"},
            {"aspect": "Method Type", "optionA": "Virtual: Default in Java (overridable)", "optionB": "Non-Virtual: private, static, final (direct call)"},
            {"aspect": "C++ vs Java", "optionA": "C++: Non-virtual by default (requires 'virtual')", "optionB": "Java: Virtual by default (requires 'final' to disable)"},
            {"aspect": "Polymorphic Collection", "optionA": "Shape[]: Can hold any subclass instance", "optionB": "Loop dispatches without instanceof branching"}
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
            {"line": "Vehicle[] fleet = { ... }", "explanation": "Creates a Vehicle array holding references to SportsCar and ElectricCar instances on the heap."},
            {"line": "for (Vehicle v : fleet)", "explanation": "Iterates using the superclass reference type Vehicle."},
            {"line": "v.drive();", "explanation": "The JVM executes invokevirtual; dynamically looks up each object's vtable and invokes the correct drive() method with zero manual branching."}
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
            "options": ["Sound Sound Sound ", "Strum Beat Sound ", "Strum Beat ", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Each array element dispatches to its respective runtime object's play() implementation.",
            "solution": "Strum Beat Sound ",
            "explanation": "Element 0 (Guitar) prints 'Strum ', element 1 (Drum) prints 'Beat ', element 2 (Instrument) prints 'Sound '. Output is 'Strum Beat Sound '."
        },
        {
            "title": "Puzzle 2: Dynamic Dispatch with Internal Helper",
            "problemStatement": "What is the output of this program?",
            "code": "class SuperClass {\n    void start() { step(); }\n    void step() { System.out.print(\"SuperStep \"); }\n}\nclass SubClass extends SuperClass {\n    @Override\n    void step() { System.out.print(\"SubStep \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        SuperClass obj = new SubClass();\n        obj.start();\n    }\n}",
            "options": ["SuperStep ", "SubStep ", "SuperStep SubStep ", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "When start() calls step(), 'this' is the concrete SubClass object on the heap!",
            "solution": "SubStep ",
            "explanation": "obj.start() runs SuperClass.start(). Inside start(), the call to step() is implicitly this.step(). Since 'this' points to SubClass on the heap, dynamic dispatch invokes SubClass.step(), printing 'SubStep '."
        },
        {
            "title": "Puzzle 3: Method Calling During Object Construction",
            "problemStatement": "What does this code print during constructor execution?",
            "code": "class ParentClass {\n    ParentClass() { printMsg(); }\n    void printMsg() { System.out.print(\"P1 \"); }\n}\nclass ChildClass extends ParentClass {\n    int num = 42;\n    @Override\n    void printMsg() { System.out.print(\"C\" + num + \" \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new ChildClass();\n    }\n}",
            "options": ["P1 ", "C42 ", "C0 ", "NullPointerException"],
            "correctOptionIndex": 2,
            "hint": "When ParentClass constructor runs, ChildClass fields (num) have not been initialized yet!",
            "solution": "C0 ",
            "explanation": "ParentClass() runs and calls printMsg(). Dynamic dispatch resolves printMsg() to ChildClass.printMsg(). But ChildClass fields are still at default zero values because ChildClass's constructor hasn't run yet! So it prints 'C0 '."
        },
        {
            "title": "Puzzle 4: Compile-Time Reference Boundary",
            "problemStatement": "What happens when calling a subclass method not present in the superclass?",
            "code": "class Device { void turnOn() {} }\nclass Phone extends Device {\n    void makeCall() { System.out.println(\"Calling\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Device d = new Phone();\n        d.makeCall();\n    }\n}",
            "options": ["Calling", "Compilation Error: cannot find symbol makeCall()", "NullPointerException", "Runtime ClassCastException"],
            "correctOptionIndex": 1,
            "hint": "Does the declared reference type 'Device' have a method named makeCall()?",
            "solution": "Compilation Error: cannot find symbol makeCall()",
            "explanation": "The compiler checks the declared reference type. Since Device has no makeCall() method, compilation fails."
        },
        {
            "title": "Puzzle 5: Overridden toString() in String Concatenation",
            "problemStatement": "What does System.out.println(p) print when toString() is overridden?",
            "code": "class Person {\n    String name;\n    Person(String n) { this.name = n; }\n    @Override\n    public String toString() { return \"Person: \" + name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Object p = new Person(\"Alice\");\n        System.out.println(p);\n    }\n}",
            "options": ["Person@hexHash", "Person: Alice", "Alice", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "println(Object) invokes String.valueOf(p), which calls p.toString() polymorphically.",
            "solution": "Person: Alice",
            "explanation": "System.out.println internally calls toString() on the passed object. Dynamic dispatch resolves to Person.toString(), printing 'Person: Alice'."
        },
        {
            "title": "Puzzle 6: Covariant Return Dynamic Dispatch",
            "problemStatement": "What is the return type observed by callers of covariant returns?",
            "code": "class Alpha { Alpha create() { return new Alpha(); } }\nclass Beta extends Alpha {\n    @Override\n    Beta create() { return new Beta(); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Alpha a = new Beta();\n        System.out.println(a.create().getClass().getSimpleName());\n    }\n}",
            "options": ["Alpha", "Beta", "Object", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Which create() method executes at runtime on the Beta object?",
            "solution": "Beta",
            "explanation": "Dynamic dispatch invokes Beta's create(), which instantiates and returns a new Beta object. getClass().getSimpleName() prints 'Beta'."
        },
        {
            "title": "Puzzle 7: vtable Lookup Order",
            "problemStatement": "If a class inherits a method and does NOT override it, which vtable entry is called?",
            "code": "class Level1 { void op() { System.out.print(\"L1\"); } }\nclass Level2 extends Level1 {}\nclass Level3 extends Level2 {}\npublic class Main {\n    public static void main(String[] args) {\n        Level1 l = new Level3();\n        l.op();\n    }\n}",
            "options": ["L3", "L2", "L1", "Compilation Error"],
            "correctOptionIndex": 2,
            "hint": "Level2 and Level3 inherit Level1's vtable entry unchanged.",
            "solution": "L1",
            "explanation": "Since neither Level2 nor Level3 overrides op(), Level3's vtable points directly to Level1's op() bytecode, printing 'L1'."
        }
    ],
    "interviewQuestions": [
        {
            "question": "Explain how Dynamic Method Dispatch works internally in the JVM.",
            "answer": "When the Java compiler encounters an instance method invocation on a reference variable, it emits the 'invokevirtual' opcode. At runtime, the JVM does not know what concrete class is on the other end of the reference until it executes. Every object header on the heap contains a pointer (the Klass pointer) to its class metadata in Metaspace. This metadata contains a Virtual Method Table (vtable)—an array of direct function pointers to compiled bytecode for all virtual methods. Because the JVM guarantees that a subclass vtable retains the identical method indexing offsets as its parent classes, looking up an overridden method is an instantaneous O(1) array dereference. The JVM fetches the function pointer at that index and jumps to the subclass implementation.",
            "followUp": "How does the HotSpot JIT compiler optimize dynamic dispatch for high performance?",
            "followUpAnswer": "HotSpot monitors execution frequency. If a call site is 'monomorphic' (consistently receiving only one concrete class type), the JIT compiler devirtualizes the call, eliminates the vtable lookup entirely, and inlines the target method body directly into the caller code, achieving near-zero overhead.",
            "keyPhrases": ["invokevirtual", "Virtual Method Table (vtable)", "O(1) pointer dereference", "Object header klass pointer", "JIT inlining", "Monomorphic devirtualization"]
        },
        {
            "question": "Why is invoking overridable methods inside a constructor considered a dangerous anti-pattern?",
            "answer": "When a superclass constructor executes, the subclass constructor has not yet run, meaning any instance fields declared in the subclass have not yet been initialized to their constructor-assigned values (they hold only default zero/null values). Because method calls in Java are dynamically dispatched based on the runtime object type, calling an overridable method from a superclass constructor will jump straight into the subclass method before its fields are initialized! If the subclass method relies on its own fields, it may encounter 0, false, null, or throw NullPointerExceptions, causing subtle and catastrophic initialization bugs.",
            "followUp": "How do you prevent this bug in class design?",
            "followUpAnswer": "Make constructors only invoke methods that are marked 'private' or 'final', ensuring they cannot be overridden by any subclass.",
            "keyPhrases": ["Uninitialized subclass fields", "Premature dynamic dispatch", "Anti-pattern", "Private or final constructor helpers"]
        }
    ],
    "miniQuiz": [
        {"question": "What is the JVM bytecode instruction used for normal virtual method invocation?", "options": ["invokestatic", "invokevirtual", "invokespecial", "invokedynamic"], "correctIndex": 1, "explanation": "invokevirtual is the standard opcode for dynamic instance method dispatch."},
        {"question": "What data structure does the JVM use to achieve O(1) dynamic method dispatch?", "options": ["HashMap", "Virtual Method Table (vtable)", "Binary Search Tree", "LinkedList"], "correctIndex": 1, "explanation": "The JVM vtable is an array of function pointers indexed by method offset."},
        {"question": "What does every Java object header on the heap contain to enable dynamic dispatch?", "options": ["A copy of all class methods", "A pointer to its class metadata (Klass pointer)", "A unique String name", "A garbage collector lock only"], "correctIndex": 1, "explanation": "The Klass pointer in the object header references the class metadata in Metaspace."},
        {"question": "Are methods in Java virtual by default?", "options": ["No, you must specify 'virtual'", "Yes, all non-private, non-static, non-final methods are virtual", "Only abstract methods are virtual", "Only methods in interfaces are virtual"], "correctIndex": 1, "explanation": "In Java, instance methods are virtual by default unless explicitly disabled with final/private."},
        {"question": "What happens if a superclass constructor calls an overridden method?", "options": ["The superclass method executes", "The subclass method executes before subclass fields are initialized", "A CompilationError occurs", "The JVM crashes immediately"], "correctIndex": 1, "explanation": "Dynamic dispatch invokes the subclass method before its constructor has initialized fields."},
        {"question": "What is a monomorphic call site?", "options": ["A call site that calls many different classes", "A call site where the JVM observes only one single concrete class at runtime", "A method with zero parameters", "A call site that fails to compile"], "correctIndex": 1, "explanation": "A monomorphic call site always targets the same class, enabling JIT inlining."},
        {"question": "Which of the following is NOT resolved via dynamic method dispatch?", "options": ["public void calculate()", "protected void display()", "public static void process()", "void draw()"], "correctIndex": 2, "explanation": "Static methods are resolved at compile time using static binding."},
        {"question": "Can you call a subclass-specific method using an uncast superclass reference?", "options": ["Yes, the JVM detects it dynamically", "No, the compiler checks that the method exists on the reference type", "Only if the method is public", "Only inside a loop"], "correctIndex": 1, "explanation": "The compiler validates all method invocations against the declared reference type."},
        {"question": "What is the time complexity of a vtable method lookup at runtime?", "options": ["O(n) where n is hierarchy depth", "O(log n)", "O(1) constant time array indexing", "O(n^2)"], "correctIndex": 2, "explanation": "vtable lookup is an O(1) memory offset dereference."},
        {"question": "Why is dynamic dispatch superior to switch statements based on type codes?", "options": ["It is easier to add new subclasses without modifying existing caller code (Open-Closed Principle)", "It uses more memory", "It requires fewer classes", "It disables the garbage collector"], "correctIndex": 0, "explanation": "Dynamic dispatch adheres to the Open-Closed Principle: new subclasses add behavior without editing caller code."}
    ]
}
