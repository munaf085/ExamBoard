import json
import os

from build_oop11_lessons import lesson_11_1

# =========================================================================
# LESSON 11.2: super() Constructor Chaining & Execution Order
# =========================================================================
lesson_11_2 = {
    "id": "super-constructor-chaining",
    "moduleId": "java-inheritance",
    "moduleTitle": "11. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 11.2",
    "title": "super() Constructor Chaining & Execution Order",
    "subtitle": "Top-down constructor invocation, the super() call, parameter passing to parents, and JVM instance initialization",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Constructing a multi-story skyscraper. You cannot install the floor-to-ceiling glass windows or furnish the penthouse suite on the 40th floor until the concrete foundation and structural steel beams on floors 1 through 39 are securely anchored. When a child class is born into memory, its constructor pauses at line 1, dials upward to the parent constructor, which dials upward to the grandparent, all the way to java.lang.Object. The foundation is poured first, then floor 1, then floor 2, and finally your penthouse constructor runs. If the foundation fails or is missing instructions, the skyscraper cannot be built.",
    "interviewTakeaways": [
        "Top-Down Initialization Order: In Java, class initialization always proceeds top-down from java.lang.Object down through the inheritance hierarchy to the most specific subclass.",
        "The Line 1 Rule for super() and this(): If explicit super() or this() is used in a constructor, it MUST be the very first statement. Calling it anywhere else triggers a compile-time error.",
        "Implicit No-Arg Invocations: If a constructor does not explicitly invoke super(...) or this(...), javac silently inserts an implicit 'super();' call targeting the superclass's no-argument constructor.",
        "The Missing Default Constructor Hazard: If a superclass defines parameterized constructors and omits a no-arg constructor, any subclass constructor that does not explicitly call 'super(args)' will fail compilation.",
        "Singular Heap Allocation: Constructor chaining does NOT create multiple objects on the heap. Exactly one unified object is allocated, and the chained constructors initialize its contiguous fields in order."
    ],
    "cheatSheet": {
        "summary": "Constructor chaining is the sequential execution of constructors up to java.lang.Object before derived constructor bodies execute, ensuring that superclass state and invariants are fully established first.",
        "syntaxTemplate": "public SubClass(int a, int b) {\n    super(a); // Must be the FIRST statement\n    this.b = b; // Initialize child fields\n}",
        "rules": [
            {
                "rule": "Mandatory First Statement",
                "explanation": "Calls to super() or this() must be the very first executable statement in any constructor body."
            },
            {
                "rule": "Mutual Exclusivity",
                "explanation": "A constructor cannot call BOTH this() and super(); you can only have at most one constructor call on line 1."
            },
            {
                "rule": "Implicit Default Call",
                "explanation": "If no super() or this() call is written, the compiler automatically injects an invisible 'super();'."
            },
            {
                "rule": "Parent No-Arg Requirement",
                "explanation": "If a parent class has no zero-argument constructor, child classes MUST explicitly call super(arguments) with matching parameters."
            },
            {
                "rule": "Execution Hierarchy",
                "explanation": "Static initializers run once per class load; instance initializers and constructors run on every object instantiation from parent to child."
            },
            {
                "rule": "super Keyword Distinction",
                "explanation": "super() invokes the parent constructor; super.method() or super.field accesses shadowed or overridden parent members."
            }
        ],
        "quickComparison": [
            {
                "aspect": "Target Invocation",
                "optionA": "super(): Calls constructor of immediate superclass",
                "optionB": "this(): Calls overloaded constructor in current class"
            },
            {
                "aspect": "Implicit Injection",
                "optionA": "Compiler automatically injects 'super();' if omitted",
                "optionB": "Compiler NEVER automatically injects 'this();'"
            },
            {
                "aspect": "Position in Body",
                "optionA": "Line 1 only",
                "optionB": "Line 1 only"
            },
            {
                "aspect": "Usage Context",
                "optionA": "Passing state upwards to parent",
                "optionB": "Providing default parameters within same class"
            },
            {
                "aspect": "Allowed in Methods",
                "optionA": "super() is forbidden in regular methods",
                "optionB": "this() is forbidden in regular methods"
            }
        ]
    },
    "coreExplanation": [
        "When an instance of a subclass is instantiated via the 'new' operator, its constructor does not immediately execute its own body. Instead, it must first execute a constructor of its immediate superclass, which cascades up to java.lang.Object.",
        "The Java Language Specification mandates that either 'super(...)' or 'this(...)' must appear as the very first statement of a constructor body. If the developer does not write an explicit call, javac silently inserts 'super();' targeting the parameterless constructor of the superclass.",
        "Because of this rule, a constructor cannot contain both 'this()' and 'super()'. A constructor that calls 'this(...)' delegates to another constructor in the same class, which will eventually call 'super(...)' directly or indirectly.",
        "A notorious compile-time pitfall occurs when a parent class defines a custom parameterized constructor (which suppresses the automatic default constructor) and does not explicitly declare a no-arg constructor. Any child class constructor without an explicit 'super(args)' will fail to compile with: 'constructor Parent in class Parent cannot be applied to given types'.",
        "The full execution sequence during instantiation is: 1) Static initializers of parent, then child (if not already loaded); 2) Subclass constructor is entered; 3) super() call executes; 4) Superclass instance variables are initialized and superclass constructor body completes; 5) Subclass instance variables are initialized; 6) Subclass constructor body completes.",
        "Calling an overridable method inside a constructor is a severe antipattern in Java. If a parent constructor invokes a method that the child overrides, the child's overridden version will execute BEFORE the child constructor has initialized its own fields, causing the method to observe uninitialized or default field values (like null or 0).",
        "It is crucial to recognize that constructor chaining does NOT allocate multiple objects on the JVM Heap. Only a single object is allocated, and the chained constructors collaborate to populate the contiguous memory block of that single instance."
    ],
    "diagram": """======================= CONSTRUCTOR CHAINING EXECUTION ORDER =======================

  new Child("Alice", 100);

  Call Stack (Growing Upward)               Execution Flow (Executing Downward)
  +-----------------------------------+     +-----------------------------------+
  | 3. Object()                       | --> | Step 1: Object fields & init done |
  +-----------------------------------+     +-----------------------------------+
  | 2. Parent(String name)            | --> | Step 2: Parent fields initialized |
  |    super();                       |     |         Parent constructor body   |
  +-----------------------------------+     +-----------------------------------+
  | 1. Child(String name, int score)  | --> | Step 3: Child fields initialized  |
  |    super(name);                   |     |         Child constructor body    |
  +-----------------------------------+     +-----------------------------------+
  [Push stack frames upward]                [Pop and execute bodies downward]

  TIMELINE SEQUENCE:
  1. Object constructor executes -> exits
  2. Parent instance fields initialized -> Parent constructor body executes -> exits
  3. Child instance fields initialized -> Child constructor body executes -> exits
  4. Final fully-initialized Child object reference returned to caller.""",
    "codeSnippet": {
        "title": "Account and SavingsAccount Constructor Chaining",
        "code": """class BankAccount {
    protected String accountNumber;
    protected double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = (balance >= 0) ? balance : 0.0;
        System.out.println("BankAccount initialized: " + accountNumber + " with $" + this.balance);
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String accountNumber, double balance, double rate) {
        super(accountNumber, balance); // Must be line 1!
        this.interestRate = rate;
        System.out.println("SavingsAccount initialized: rate=" + rate);
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount sa = new SavingsAccount("SA-4091", 2500.0, 0.045);
    }
}""",
        "lineByLineExplanation": [
            {"line": "super(accountNumber, balance);", "explanation": "Passes accountNumber and balance to BankAccount's parameterized constructor as the very first line."},
            {"line": "this.accountNumber = accountNumber;", "explanation": "Executes in BankAccount constructor, initializing protected superclass state."},
            {"line": "System.out.println(\"BankAccount initialized...\");", "explanation": "Outputs superclass initialization confirmation before subclass body executes."},
            {"line": "this.interestRate = rate;", "explanation": "Executes in SavingsAccount constructor after superclass constructor completes."},
            {"line": "System.out.println(\"SavingsAccount initialized...\");", "explanation": "Outputs subclass initialization confirmation."}
        ],
        "output": "BankAccount initialized: SA-4091 with $2500.0\nSavingsAccount initialized: rate=0.045"
    },
    "codeExamples": [
        {
            "title": "Three-Tier Constructor Call Stack Tracing",
            "description": "Tracing the exact sequence of constructor executions from Grandparent down to Child.",
            "code": """class Grandparent {
    public Grandparent() {
        System.out.println("1. Grandparent constructor executing");
    }
}

class Parent extends Grandparent {
    public Parent() {
        // Compiler inserts implicit super();
        System.out.println("2. Parent constructor executing");
    }
}

class Child extends Parent {
    public Child() {
        // Compiler inserts implicit super();
        System.out.println("3. Child constructor executing");
    }
}

public class ThreeTierDemo {
    public static void main(String[] args) {
        Child c = new Child();
    }
}""",
            "output": "1. Grandparent constructor executing\n2. Parent constructor executing\n3. Child constructor executing"
        },
        {
            "title": "Delegation with this() and super() in Overloaded Constructors",
            "description": "Demonstrating how this() constructor delegation works hand-in-hand with super() in class hierarchies.",
            "code": """class Vehicle {
    protected String make;
    protected int year;

    public Vehicle(String make, int year) {
        this.make = make;
        this.year = year;
        System.out.println("Vehicle initialized: " + year + " " + make);
    }
}

class Car extends Vehicle {
    private String model;

    public Car(String make, int year, String model) {
        super(make, year);
        this.model = model;
        System.out.println("Car full spec: " + model);
    }

    public Car(String make, String model) {
        this(make, 2026, model); // Delegates to 3-arg constructor
        System.out.println("Car convenience constructor finished");
    }
}

public class DelegationDemo {
    public static void main(String[] args) {
        Car c = new Car("Ford", "Mustang");
    }
}""",
            "output": "Vehicle initialized: 2026 Ford\nCar full spec: Mustang\nCar convenience constructor finished"
        },
        {
            "title": "The Overridable Method Constructor Trap",
            "description": "Demonstrating why invoking an overridable method inside a constructor exposes uninitialized subclass state.",
            "code": """class BaseSensor {
    public BaseSensor() {
        System.out.println("BaseSensor constructor started");
        initSensor(); // Antipattern: overridable method in constructor!
        System.out.println("BaseSensor constructor finished");
    }

    public void initSensor() {
        System.out.println("BaseSensor default calibration");
    }
}

class ThermalSensor extends BaseSensor {
    private String unit = "Celsius"; // Field initialization happens AFTER super()!

    @Override
    public void initSensor() {
        // When called from BaseSensor constructor, 'unit' is still null!
        System.out.println("ThermalSensor calibrating unit: " + unit);
    }
}

public class ConstructorTrapDemo {
    public static void main(String[] args) {
        ThermalSensor sensor = new ThermalSensor();
    }
}""",
            "output": "BaseSensor constructor started\nThermalSensor calibrating unit: null\nBaseSensor constructor finished"
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Placing super() after other statements in a constructor body",
            "whyItHappens": "Developers try to perform parameter validation or print statements before calling super().",
            "howToFix": "Ensure super() or this() is strictly the first statement. Validate arguments inline or in a static factory method."
        },
        {
            "mistake": "Omitting super(args) when parent has only parameterized constructors",
            "whyItHappens": "Assuming Java will somehow figure out default arguments for the parent constructor.",
            "howToFix": "Explicitly write `super(arg1, arg2)` in every subclass constructor to supply required parent state."
        },
        {
            "mistake": "Calling both this() and super() in the same constructor",
            "whyItHappens": "Developers attempt to chain to a sibling constructor while also invoking the parent constructor directly.",
            "howToFix": "Call this() to delegate to the sibling constructor, and let that sibling constructor invoke super()."
        },
        {
            "mistake": "Thinking super() allocates a separate parent object in heap memory",
            "whyItHappens": "The syntax looks like `new Super()`, leading beginners to assume two objects exist.",
            "howToFix": "Understand that `new Child()` allocates exactly ONE heap object. `super()` merely executes the parent's initialization logic on that same object."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: Constructor Print Order Across Hierarchy",
            "problemStatement": "What is the exact console output produced when main() runs?",
            "code": """class X {
    X() { System.out.print("X"); }
}
class Y extends X {
    Y() { System.out.print("Y"); }
}
class Z extends Y {
    Z() { System.out.print("Z"); }
}
public class TraceP1 {
    public static void main(String[] args) {
        new Z();
    }
}""",
            "options": ["XYZ", "ZYX", "XZY", "YZX"],
            "correctOptionIndex": 0,
            "hint": "Constructor calls execute top-down: Object -> X -> Y -> Z.",
            "solution": "XYZ",
            "explanation": "Z constructor calls implicit super() to Y, Y calls implicit super() to X, and X calls Object(). Execution proceeds downward: X body prints 'X', Y body prints 'Y', Z body prints 'Z'. Result is 'XYZ'."
        },
        {
            "title": "Puzzle 2: Mixed this() and super() Chaining",
            "problemStatement": "What does the following program print?",
            "code": """class Alpha {
    Alpha() { System.out.print("A"); }
    Alpha(int n) { System.out.print("A" + n); }
}
class Beta extends Alpha {
    Beta() {
        this(5);
        System.out.print("B");
    }
    Beta(int n) {
        super(n);
        System.out.print("B" + n);
    }
}
public class TraceP2 {
    public static void main(String[] args) {
        new Beta();
    }
}""",
            "options": ["A5B5B", "AB5B", "A5BB5", "B5A5B"],
            "correctOptionIndex": 0,
            "hint": "Follow Beta() -> Beta(5) -> Alpha(5).",
            "solution": "A5B5B",
            "explanation": "new Beta() calls this(5). Beta(5) calls super(5), which invokes Alpha(5), printing 'A5'. Beta(5) then prints 'B5'. Finally, Beta() finishes and prints 'B'. Total output: 'A5B5B'."
        },
        {
            "title": "Puzzle 3: Superclass Constructor State Validation",
            "problemStatement": "What is printed by this program?",
            "code": """class ParentBox {
    int capacity;
    ParentBox(int cap) {
        this.capacity = (cap > 0) ? cap : 10;
        System.out.print("P:" + this.capacity + " ");
    }
}
class ChildBox extends ParentBox {
    int extra;
    ChildBox(int cap, int extra) {
        super(cap - 5);
        this.extra = extra;
        System.out.print("C:" + this.extra);
    }
}
public class TraceP3 {
    public static void main(String[] args) {
        new ChildBox(3, 20);
    }
}""",
            "options": ["P:10 C:20", "P:-2 C:20", "P:3 C:20", "Compilation Error"],
            "correctOptionIndex": 0,
            "hint": "Evaluate the argument passed to super: 3 - 5 = -2. How does ParentBox handle non-positive values?",
            "solution": "P:10 C:20",
            "explanation": "super(3 - 5) passes -2. In ParentBox, -2 > 0 is false, so capacity is set to 10. ParentBox prints 'P:10 '. Then ChildBox sets extra = 20 and prints 'C:20'. Output is 'P:10 C:20'."
        },
        {
            "title": "Puzzle 4: Instance Initializer Execution Order with Super",
            "problemStatement": "What is the output of this code?",
            "code": """class SuperClass {
    int a = 1;
    SuperClass() {
        System.out.print("Super:" + a + " ");
    }
}
class SubClass extends SuperClass {
    int b = 2;
    SubClass() {
        System.out.print("Sub:" + b);
    }
}
public class TraceP4 {
    public static void main(String[] args) {
        new SubClass();
    }
}""",
            "options": ["Super:1 Sub:2", "Sub:2 Super:1", "Super:0 Sub:2", "Compilation Error"],
            "correctOptionIndex": 0,
            "hint": "Superclass fields and constructor complete before subclass fields and constructor run.",
            "solution": "Super:1 Sub:2",
            "explanation": "SubClass constructor calls implicit super(). SuperClass field 'a' is initialized to 1, and its constructor prints 'Super:1 '. Control returns to SubClass, where 'b' is initialized to 2, and its constructor prints 'Sub:2'."
        },
        {
            "title": "Puzzle 5: The Missing No-Arg Constructor Compilation Error",
            "problemStatement": "What happens when you compile and run this code?",
            "code": """class Base {
    Base(int x) {}
}
class Sub extends Base {
    Sub() {}
}
public class TraceP5 {
    public static void main(String[] args) {
        new Sub();
    }
}""",
            "options": [
                "Compiles and runs with no output",
                "Compilation Error: constructor Base in class Base cannot be applied to given types",
                "Runtime Exception: NoSuchMethodError",
                "Compiles and prints: Base"
            ],
            "correctOptionIndex": 1,
            "hint": "Since Base defines a parameterized constructor, it has no default no-arg constructor. Sub() tries to call invisible 'super();'.",
            "solution": "Compilation Error: constructor Base in class Base cannot be applied to given types",
            "explanation": "Because Base declares Base(int), the default Base() constructor is NOT provided. Sub's constructor implicitly attempts to call super(), which does not exist, triggering a compile-time error."
        },
        {
            "title": "Puzzle 6: Parameter Passing to Super Constructor",
            "problemStatement": "What does this code output?",
            "code": """class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
}
class Student extends Person {
    int id;
    Student(String name, int id) {
        super(name.toUpperCase());
        this.id = id;
    }
}
public class TraceP6 {
    public static void main(String[] args) {
        Student s = new Student("sara", 101);
        System.out.println(s.name + " #" + s.id);
    }
}""",
            "options": ["SARA #101", "sara #101", "null #101", "Compilation Error: cannot call method in super()"],
            "correctOptionIndex": 0,
            "hint": "Expressions passed into super(...) are evaluated before the parent constructor is entered.",
            "solution": "SARA #101",
            "explanation": "name.toUpperCase() evaluates to 'SARA' and is passed to Person's constructor, which sets this.name = 'SARA'. id is set to 101. Output is 'SARA #101'."
        },
        {
            "title": "Puzzle 7: Overridden Method Invoked from Super Constructor",
            "problemStatement": "What does this program display?",
            "code": """class ParentTest {
    ParentTest() {
        printValue();
    }
    void printValue() {
        System.out.print("P ");
    }
}
class ChildTest extends ParentTest {
    int num = 42;
    @Override
    void printValue() {
        System.out.print("C:" + num + " ");
    }
}
public class TraceP7 {
    public static void main(String[] args) {
        new ChildTest();
    }
}""",
            "options": ["C:42 ", "C:0 ", "P ", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Dynamic method dispatch executes ChildTest.printValue() while ParentTest constructor is running, BEFORE ChildTest's field num is initialized!",
            "solution": "C:0 ",
            "explanation": "When new ChildTest() runs, ParentTest() constructor calls printValue(). Because of dynamic dispatch, ChildTest's overridden printValue() executes. However, ChildTest's fields have not been initialized yet (num is still default 0). So it prints 'C:0 '."
        },
        {
            "title": "Puzzle 8: Static vs Instance Initialization Order Across Classes",
            "problemStatement": "What is the exact output sequence?",
            "code": """class First {
    static { System.out.print("S1 "); }
    First() { System.out.print("I1 "); }
}
class Second extends First {
    static { System.out.print("S2 "); }
    Second() { System.out.print("I2 "); }
}
public class TraceP8 {
    public static void main(String[] args) {
        new Second();
    }
}""",
            "options": ["S1 S2 I1 I2 ", "S2 S1 I1 I2 ", "S1 I1 S2 I2 ", "I1 I2 S1 S2 "],
            "correctOptionIndex": 0,
            "hint": "Static blocks execute in hierarchical order upon class loading (First then Second), followed by instance constructors (First then Second).",
            "solution": "S1 S2 I1 I2 ",
            "explanation": "Loading Second requires loading its superclass First first: First static block prints 'S1 ', Second static block prints 'S2 '. Then instantiation runs constructors top-down: First constructor prints 'I1 ', Second prints 'I2 '. Output: 'S1 S2 I1 I2 '."
        }
    ],
    "interviewQuestions": [
        {
            "question": "Why must super() or this() be the very first statement in a constructor body?",
            "answer": "Java enforces the first-statement rule to preserve class invariants and structural integrity. An object cannot exist in a valid state unless all of its ancestor classes have verified and initialized their internal state first. If code were allowed to execute before super(), a developer could manipulate subclass fields or invoke subclass methods that depend on parent fields that haven't been allocated or initialized yet, leading to corruption or null pointer failures.",
            "followUp": "Can an expression passed into super() call an instance method of the subclass?",
            "followUpAnswer": "No, because the instance does not legally exist yet before super() finishes. Arguments to super() can only reference static methods, parameters, or constants.",
            "keyPhrases": ["Class invariant preservation", "Guaranteed base initialization", "Line 1 constraint", "No instance access before super"],
            "commonMistakeAnswer": "Thinking it is just an arbitrary compiler syntax rule with no architectural reason."
        },
        {
            "question": "What happens if a parent class does not provide a default no-argument constructor?",
            "answer": "If a parent class declares ANY constructor with parameters, the compiler stops automatically generating the default no-argument constructor. If the parent does not explicitly declare a parameterless constructor, any subclass must explicitly declare a constructor and invoke 'super(arg1, arg2)' with appropriate arguments as its first line. If the subclass fails to do so, javac issues a compile-time error stating that the constructor in the superclass cannot be applied to the given types.",
            "followUp": "How do library authors prevent this problem for users of their base classes?",
            "followUpAnswer": "By either explicitly providing a protected or public no-argument constructor with safe default values, or by documenting that subclasses must supply specific arguments.",
            "keyPhrases": ["Suppressed default constructor", "Explicit super(args) requirement", "Compile-time failure", "No-arg constructor"],
            "commonMistakeAnswer": "Assuming Java will synthesize default null or zero values and call the parameterized constructor."
        },
        {
            "question": "Does calling super() create a second object on the JVM Heap?",
            "answer": "No, absolutely not. Exactly ONE heap object is created when 'new SubClass()' is executed. The constructor chaining mechanism simply passes the reference of that single allocated heap block ('this') to each constructor up the inheritance tree so each class can initialize its respective partition of fields inside that single block.",
            "followUp": "What is the memory address of 'this' in the parent constructor compared to 'this' in the child constructor?",
            "followUpAnswer": "They have the exact same memory address. Both 'this' references point to the identical heap object.",
            "keyPhrases": ["Single heap allocation", "Identical memory reference", "Sequential field partition initialization", "No separate parent object"],
            "commonMistakeAnswer": "Thinking the parent class creates an internal hidden object that the child holds a reference to."
        },
        {
            "question": "Why is it considered dangerous to invoke an overridable method inside a constructor?",
            "answer": "Invoking an overridable method inside a constructor creates a severe bug known as 'partially initialized object leakage'. Because Java uses dynamic method dispatch, the runtime will invoke the subclass's overridden version of the method. However, at the moment the parent constructor is running, the subclass constructor has NOT run yet, and subclass instance fields are still at their JVM default values (null, 0, or false). The overridden method may crash with NullPointerException or operate on corrupt state.",
            "followUp": "How can you make a method safe to call from within a constructor?",
            "followUpAnswer": "Make the method 'private', 'static', or 'final', preventing subclasses from overriding it and guaranteeing predictable execution.",
            "keyPhrases": ["Partially initialized object", "Dynamic dispatch during construction", "Default field values observed", "Mark private or final"],
            "commonMistakeAnswer": "Assuming the parent's version of the method will execute while the parent constructor is running."
        },
        {
            "question": "Can you use both this() and super() in the same constructor?",
            "answer": "No. Both this() and super() are subject to the strict rule that they must be the first statement in a constructor body. Since a constructor can only have one first statement, they are mutually exclusive within a single constructor body. To achieve both, you use constructor delegation: one constructor calls this() to delegate to a sibling constructor, and that sibling constructor calls super().",
            "followUp": "Can you use this() or super() inside a static method?",
            "followUpAnswer": "No, both this() and super() are strictly instance-level constructor mechanisms and cannot be called from any method, static or instance.",
            "keyPhrases": ["Mutual exclusivity on line 1", "Constructor delegation", "Compile-time error", "Only in constructors"],
            "commonMistakeAnswer": "Thinking you can put one on line 1 and the other on line 2."
        },
        {
            "question": "What is the execution order of static initialization blocks versus constructor execution across a hierarchy?",
            "answer": "Static blocks execute when a class is loaded into the JVM by the ClassLoader, strictly in parent-first order: 1) Superclass static initializers, 2) Subclass static initializers. This happens only ONCE per class lifecycle. Then, each time 'new Subclass()' is invoked, instance initialization occurs: 3) Superclass instance variables and instance initializers, 4) Superclass constructor body, 5) Subclass instance variables and instance initializers, 6) Subclass constructor body.",
            "followUp": "Do static blocks run again if a second instance of the subclass is instantiated?",
            "followUpAnswer": "No, static initializers run only once when the class is initially loaded into memory.",
            "keyPhrases": ["Static initializers once per class", "Parent-first static loading", "Instance initialization per object", "Top-down sequence"],
            "commonMistakeAnswer": "Thinking static blocks execute every time a constructor is invoked."
        },
        {
            "question": "What happens if an exception is thrown in a superclass constructor during chaining?",
            "answer": "If an unhandled exception occurs inside a superclass constructor, the initialization sequence aborts immediately. The subclass constructor body is never reached. The partially allocated object on the heap is marked for garbage collection since no valid reference is ever returned to the caller.",
            "followUp": "Can a subclass catch an exception thrown by super() using a try-catch block inside its constructor?",
            "followUpAnswer": "No, because super() must be the very first statement. You cannot wrap super() inside a try-catch block in Java.",
            "keyPhrases": ["Immediate abort", "Subclass constructor skipped", "Object eligible for GC", "Cannot wrap super in try-catch"],
            "commonMistakeAnswer": "Thinking you can put a try-catch around super() on lines 1 and 2."
        },
        {
            "question": "How does the 'super' keyword differ when used with parentheses (super()) versus with a dot (super.method())?",
            "answer": "'super()' is a constructor invocation that can only be used as the first statement of a constructor to invoke an immediate superclass constructor. 'super.member' (e.g., super.getDetails() or super.name) is a member access qualifier used inside instance methods or constructors to bypass method overriding or field shadowing and explicitly reference an inherited superclass member.",
            "followUp": "Can you use 'super.super.method()' to access a grandparent's method in Java?",
            "followUpAnswer": "No, Java explicitly forbids 'super.super'. Direct access is strictly limited to the immediate parent to maintain encapsulation.",
            "keyPhrases": ["super() for constructor", "super.member for qualification", "Bypassing override/shadow", "No super.super in Java"],
            "commonMistakeAnswer": "Believing super.super is valid syntax to reach a grandparent class."
        },
        {
            "question": "What is an instance initialization block and when does it run relative to super()?",
            "answer": "An instance initialization block is an unnamed block of code enclosed in braces directly within a class body. It executes every time an instance of the class is created. Critically, it executes AFTER the constructor has called super() and the superclass constructor has completed, and right before the body of the current constructor executes.",
            "followUp": "Why would someone use an instance initializer instead of putting code directly in a constructor?",
            "followUpAnswer": "Instance initializers are useful for sharing initialization code across multiple overloaded constructors, or in anonymous inner classes where explicit constructors cannot be declared.",
            "keyPhrases": ["Instance initializer block", "Runs after super() completes", "Runs before constructor body", "Code sharing across constructors"],
            "commonMistakeAnswer": "Assuming instance initializers run before super()."
        },
        {
            "question": "If a constructor does not return a value, what does 'super()' actually evaluate to?",
            "answer": "'super()' does not evaluate to any value or expression; it is a special JVM instruction (invokespecial targeting <init>) whose purpose is strictly to invoke the initialization bytecode of the superclass on the current object pointer ('this'). It cannot be assigned to a variable, passed as an argument, or used in an expression.",
            "followUp": "What is the bytecode method name for constructors in the compiled .class file?",
            "followUpAnswer": "In Java bytecode, instance constructors are named '<init>' and static initializers are named '<clinit>'.",
            "keyPhrases": ["invokespecial instruction", "<init> method", "No return expression", "Initializes 'this' in-place"],
            "commonMistakeAnswer": "Thinking super() returns a reference to the parent."
        }
    ],
    "miniQuiz": [
        {
            "question": "Where must an explicit call to super() or this() be placed in a constructor?",
            "options": [
                "Anywhere in the constructor body",
                "As the very first statement only",
                "As the very last statement only",
                "Inside a try-catch block"
            ],
            "correctIndex": 1,
            "explanation": "Java mandates that calls to super() or this() must be the very first statement in a constructor body."
        },
        {
            "question": "What does the compiler automatically insert if neither super() nor this() is written on line 1 of a constructor?",
            "options": [
                "this();",
                "super();",
                "new Object();",
                "Nothing is inserted"
            ],
            "correctIndex": 1,
            "explanation": "If omitted, javac automatically inserts an implicit 'super();' targeting the parent's no-arg constructor."
        },
        {
            "question": "What happens if a parent class defines 'Parent(int x)' and no other constructor, and child defines 'Child() {}'?",
            "options": [
                "Compiles successfully and passes 0 to Parent(int)",
                "Compilation error: cannot find symbol constructor Parent()",
                "Runs with a runtime NoSuchMethodError",
                "Child creates an object without calling Parent constructor"
            ],
            "correctIndex": 1,
            "explanation": "Defining Parent(int) suppresses the default constructor. Child() tries to call invisible 'super();', which does not exist, causing a compile-time error."
        },
        {
            "question": "Can a constructor contain both this() and super() statements?",
            "options": [
                "Yes, if this() is first and super() is second",
                "Yes, if super() is first and this() is second",
                "No, because only one statement can be the first statement",
                "Yes, in any order"
            ],
            "correctIndex": 2,
            "explanation": "Since both must be on line 1, they are mutually exclusive in a single constructor."
        },
        {
            "question": "In what order are constructors executed when instantiating a subclass?",
            "options": [
                "Child constructor first, then Parent, then Object",
                "Object constructor first, then Parent, then Child",
                "Simultaneously in parallel threads",
                "Child constructor only; parent constructors are skipped"
            ],
            "correctIndex": 1,
            "explanation": "Constructors execute top-down starting from java.lang.Object down through ancestors to the subclass."
        },
        {
            "question": "How many objects are allocated on the Heap when 'new Child()' executes through a 3-tier hierarchy?",
            "options": [
                "3 objects (one for each class)",
                "2 objects",
                "Exactly 1 object",
                "0 objects until initialized"
            ],
            "correctIndex": 2,
            "explanation": "Exactly ONE heap object is created. Constructor chaining simply initializes the contiguous fields of that single object."
        },
        {
            "question": "Why is calling an overridable method inside a constructor considered an antipattern?",
            "options": [
                "It causes a compile-time syntax error",
                "The overridden method may execute before subclass fields are initialized, exposing uninitialized state",
                "It causes an infinite loop in the JVM",
                "It disables garbage collection for the object"
            ],
            "correctIndex": 1,
            "explanation": "Dynamic dispatch will execute the child's overridden method before the child constructor has initialized its fields, observing null or 0."
        },
        {
            "question": "Can you use 'super.super.method()' to call a grandparent's overridden method in Java?",
            "options": [
                "Yes, it is standard Java syntax",
                "No, Java explicitly forbids 'super.super'",
                "Yes, but only if the method is public",
                "Yes, if using an explicit cast"
            ],
            "correctIndex": 1,
            "explanation": "Java strictly disallows 'super.super' to maintain encapsulation and prevent skipping class tiers."
        },
        {
            "question": "When does an instance initialization block execute relative to super()?",
            "options": [
                "Before super() is called",
                "After super() completes and before the current constructor body executes",
                "After the current constructor body completes",
                "Only during class loading"
            ],
            "correctIndex": 1,
            "explanation": "Instance initializers execute immediately after super() has finished and before the constructor body code runs."
        },
        {
            "question": "What bytecode instruction is typically used by the JVM to invoke constructors?",
            "options": [
                "invokevirtual",
                "invokestatic",
                "invokespecial",
                "invokeinterface"
            ],
            "correctIndex": 2,
            "explanation": "Constructors are invoked using 'invokespecial' targeting the '<init>' method, which statically binds the call without virtual dispatch."
        }
    ]
}

print("Lesson 11.2 prepared.")
