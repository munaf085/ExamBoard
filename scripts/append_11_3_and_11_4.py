import json
import os
import sys

# Import lesson_11_1 and lesson_11_2
from build_full_oop11_lessons import lesson_11_1, lesson_11_2

# =========================================================================
# LESSON 11.3: Method Overriding & @Override Annotation
# =========================================================================
lesson_11_3 = {
    "id": "method-overriding-rules",
    "moduleId": "java-inheritance",
    "moduleTitle": "11. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 11.3",
    "title": "Method Overriding & @Override Annotation",
    "subtitle": "Redefining superclass behavior, signature matching, covariant return types, access visibility rules, and exception constraints",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Universal hardware device driver: The operating system has a standard driver method called `printDocument()`. When you plug in an advanced color laser printer, the system still calls `printDocument()`, but the laser printer driver overrides the generic implementation to perform laser electrostatic imaging and toner fusing instead of generic dot matrix printing. The caller (the OS) sends the exact same command, but the specialized device executes its own customized procedure. The `@Override` annotation acts like a certification inspector checking that the printer connector pins match the OS socket millimeter-for-millimeter.",
    "interviewTakeaways": [
        "Exact Signature Match: Overriding requires the exact same method name, exact same parameter types, and exact same parameter sequence as declared in the superclass.",
        "The Access Visibility Ladder: An overriding method can maintain the same access level or make it MORE accessible (e.g., protected -> public), but can NEVER narrow or restrict visibility (e.g., public -> protected/private).",
        "Covariant Return Types (Java 5+): An overriding method may declare a return type that is a subtype of the return type declared in the superclass method, avoiding caller-side casting.",
        "Method Hiding vs Overriding: Static methods cannot be overridden. If a subclass declares a static method with an identical signature, it 'hides' the superclass method; the call resolves based on reference type at compile time.",
        "The @Override Annotation: Always use @Override. It commands javac to verify that the method actually overrides a superclass method, instantly catching typos and parameter mismatches at compile time."
    ],
    "cheatSheet": {
        "summary": "Method overriding allows a subclass to provide a specific implementation of an inherited non-static, non-private, non-final method, enabling runtime polymorphic behavior.",
        "syntaxTemplate": "@Override\n[same-or-broader-access] [covariant-or-same-return] methodName([same-params]) {\n    // Optional: super.methodName([args]);\n    // Customized subclass behavior\n}",
        "rules": [
            {
                "rule": "Exact Signature",
                "explanation": "Method name and parameter types list must match the superclass method exactly."
            },
            {
                "rule": "Visibility Preservation",
                "explanation": "Subclass method visibility cannot be more restrictive than superclass (public -> public; protected -> protected or public)."
            },
            {
                "rule": "Covariant Return",
                "explanation": "Return type must be identical or a subtype of the superclass method's return type."
            },
            {
                "rule": "Exception Constraints",
                "explanation": "Overriding method cannot declare new or broader checked exceptions than the superclass method."
            },
            {
                "rule": "Non-Overridable Methods",
                "explanation": "Methods declared private, static, or final CANNOT be overridden."
            },
            {
                "rule": "Mandatory @Override",
                "explanation": "Using @Override is a compile-time safeguard preventing unintentional method overloading."
            }
        ],
        "quickComparison": [
            {
                "aspect": "Concept",
                "optionA": "Method Overriding: Redefining superclass behavior in child",
                "optionB": "Method Overloading: Defining multiple methods with same name & different params"
            },
            {
                "aspect": "Binding Phase",
                "optionA": "Runtime (dynamic / late binding via vtable)",
                "optionB": "Compile-time (static / early binding)"
            },
            {
                "aspect": "Signature",
                "optionA": "Must be identical in name and parameter types",
                "optionB": "Must differ in parameter types or count"
            },
            {
                "aspect": "Return Type",
                "optionA": "Must be same or covariant subtype",
                "optionB": "Can be completely independent"
            },
            {
                "aspect": "Class Boundary",
                "optionA": "Requires inheritance across parent and child",
                "optionB": "Can occur within the exact same class"
            }
        ]
    },
    "coreExplanation": [
        "Method overriding occurs when a subclass defines an instance method that has the exact same name, return type (or covariant subtype), and formal parameter list as an accessible method in its superclass.",
        "Dynamic Method Dispatch: When an overridden method is invoked on an object reference, the JVM determines which implementation to execute at RUNTIME based on the actual object on the heap, regardless of the reference type.",
        "The @Override Annotation: Although optional at runtime, @Override is a crucial compile-time check. If a developer accidentally spells the name wrong (e.g., 'toSting()') or changes a parameter type ('int' instead of 'double'), the compiler immediately flags an error rather than silently treating it as a new overloaded method.",
        "The Access Visibility Ladder: Java forbids narrowing visibility. If a superclass method is 'public', the subclass override MUST be 'public'. If the superclass is 'protected', the override can be 'protected' or 'public'. Weakening access is forbidden because it would break polymorphic substitutability (a client with a Superclass reference must never encounter an inaccessible method at runtime).",
        "Covariant Return Types: Since Java 5, an overriding method can return a subtype of the declared return type in the superclass. For example, if 'Employee getBoss()' in the base class returns Employee, 'Manager getBoss()' in the subclass can legally return Manager.",
        "Static Method Hiding: Static methods belong to the class, not instance vtables. If a subclass defines a static method with the same signature, it does NOT override it. It 'hides' it, and calls are resolved at compile time based strictly on the declared reference type.",
        "Private and Final Methods: A private method is not visible outside its class, so declaring a method with the same signature in a subclass simply creates a new independent method, not an override. A 'final' method explicitly prohibits overriding and triggers a compile-time error if attempted."
    ],
    "diagram": """======================= METHOD OVERRIDING & VTABLE DISPATCH =======================

       [ BankAccount ]                     Method Table (vtable):
       + withdraw(double) ----------------> Slot 0: BankAccount.withdraw()
       + checkBalance()   ----------------> Slot 1: BankAccount.checkBalance()
              ^
              | extends
       [ PremiumAccount ]                  Method Table (vtable):
       + withdraw(double) [OVERRIDE] -----> Slot 0: PremiumAccount.withdraw()  <-- SWAPPED!
                                           Slot 1: BankAccount.checkBalance()   <-- INHERITED!

  ---------------------------------------------------------------------------------
  ACCESS MODIFIER LADDER (Can only stay same or expand downwards):
  +--------------------+
  | private            |  <-- Cannot be overridden at all
  +--------------------+
  | package-private    |  <-- Can override as package-private, protected, or public
  +--------------------+
  | protected          |  <-- Can override as protected or public
  +--------------------+
  | public             |  <-- MUST override as public (cannot narrow!)
  +--------------------+""",
    "codeSnippet": {
        "title": "Method Overriding with Super Delegation in BankAccount",
        "code": """class BankAccount {
    protected double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Standard withdraw: $" + amount + " | Remaining: $" + balance);
        }
    }
}

class PremiumAccount extends BankAccount {
    public PremiumAccount(double balance) {
        super(balance);
    }

    @Override
    public void withdraw(double amount) {
        // Premium accounts get $5 cashback bonus credited back
        super.withdraw(amount);
        balance += 5.0;
        System.out.println("Premium Cashback +$5.0 credited! New balance: $" + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new PremiumAccount(500.0);
        acc.withdraw(100.0);
    }
}""",
        "lineByLineExplanation": [
            {"line": "class PremiumAccount extends BankAccount", "explanation": "Establishes the inheritance relationship allowing method overriding."},
            {"line": "@Override", "explanation": "Informs the compiler to verify that withdraw(double) matches an inherited method signature."},
            {"line": "public void withdraw(double amount)", "explanation": "Matches the exact name, parameter type, and public access modifier of the base method."},
            {"line": "super.withdraw(amount);", "explanation": "Reuses and executes the base withdrawal logic before applying specialized cashback."},
            {"line": "BankAccount acc = new PremiumAccount(500.0);", "explanation": "Polymorphic reference invoking PremiumAccount's overridden method dynamically at runtime."}
        ],
        "output": "Standard withdraw: $100.0 | Remaining: $400.0\nPremium Cashback +$5.0 credited! New balance: $405.0"
    },
    "codeExamples": [
        {
            "title": "Covariant Return Types in Object Cloning Hierarchy",
            "description": "Demonstrating how an overriding method can return a more specific subclass type without requiring caller-side casting.",
            "code": """class Shape {
    protected String color = "Red";

    public Shape copy() {
        Shape s = new Shape();
        s.color = this.color;
        return s;
    }
}

class Circle extends Shape {
    protected double radius = 5.0;

    // Covariant return type: returns Circle instead of Shape
    @Override
    public Circle copy() {
        Circle c = new Circle();
        c.color = this.color;
        c.radius = this.radius;
        return c;
    }
}

public class CovariantDemo {
    public static void main(String[] args) {
        Circle c1 = new Circle();
        // No explicit cast required because copy() returns Circle directly!
        Circle c2 = c1.copy();
        System.out.println("Cloned circle color: " + c2.color + ", radius: " + c2.radius);
    }
}""",
            "output": "Cloned circle color: Red, radius: 5.0"
        },
        {
            "title": "Method Hiding with Static Methods vs Overriding",
            "description": "Contrasting static method hiding (resolved by reference type) with virtual method overriding (resolved by runtime object).",
            "code": """class Parent {
    public static void staticGreeting() {
        System.out.println("Parent static greeting (Hidden)");
    }

    public void instanceGreeting() {
        System.out.println("Parent instance greeting (Overridden)");
    }
}

class Child extends Parent {
    public static void staticGreeting() {
        System.out.println("Child static greeting (Hides Parent)");
    }

    @Override
    public void instanceGreeting() {
        System.out.println("Child instance greeting (Dispatched dynamically)");
    }
}

public class HidingVsOverridingDemo {
    public static void main(String[] args) {
        Parent ref = new Child();

        // Static method: bound at compile-time to reference type Parent
        ref.staticGreeting();

        // Instance method: dispatched at runtime to actual object Child
        ref.instanceGreeting();
    }
}""",
            "output": "Parent static greeting (Hidden)\nChild instance greeting (Dispatched dynamically)"
        },
        {
            "title": "Broadening Visibility from Protected to Public",
            "description": "Showing how a subclass can expand the accessibility of an inherited protected method to public.",
            "code": """class SecretModule {
    protected void performAudit() {
        System.out.println("Protected audit log executed.");
    }
}

class PublicAuditModule extends SecretModule {
    // Valid: Broadening access from protected to public
    @Override
    public void performAudit() {
        System.out.print("[PUBLIC REPORT] ");
        super.performAudit();
    }
}

public class VisibilityDemo {
    public static void main(String[] args) {
        PublicAuditModule pam = new PublicAuditModule();
        pam.performAudit();
    }
}""",
            "output": "[PUBLIC REPORT] Protected audit log executed."
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Accidentally overloading instead of overriding due to parameter type mismatch",
            "whyItHappens": "Writing `void calculate(double x)` in the subclass when the parent declared `void calculate(int x)`.",
            "howToFix": "Always use the `@Override` annotation. The compiler will immediately reject the code if the signatures do not match exactly."
        },
        {
            "mistake": "Attempting to reduce visibility in the overriding method (e.g. public to protected)",
            "whyItHappens": "Developers attempt to hide a parent method from public users of the subclass.",
            "howToFix": "Recognize that an overriding method cannot have more restrictive access. Keep it public or rethink the hierarchy."
        },
        {
            "mistake": "Believing static methods can be overridden polymorphically",
            "whyItHappens": "Writing the same static method signature in child and expecting dynamic dispatch via a parent reference.",
            "howToFix": "Understand that static methods are hidden, not overridden. Invoke static methods using class names (ClassName.method())."
        },
        {
            "mistake": "Attempting to change return type to an unrelated type or primitive",
            "whyItHappens": "Trying to change return type from `int` to `long` or `double`.",
            "howToFix": "Primitive types cannot be covariant. Return types must match identically, unless returning an object reference that is a subtype."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: Overriding vs Overloading Parameter Matching",
            "problemStatement": "What is printed when main() executes?",
            "code": """class Base {
    void show(int n) {
        System.out.print("Base:" + n + " ");
    }
}
class Derived extends Base {
    void show(double d) {
        System.out.print("Derived:" + d + " ");
    }
}
public class TraceO1 {
    public static void main(String[] args) {
        Base b = new Derived();
        b.show(5);
    }
}""",
            "options": ["Base:5 ", "Derived:5.0 ", "Compilation Error", "Runtime Exception"],
            "correctOptionIndex": 0,
            "hint": "Derived.show(double) does NOT override Base.show(int)—it overloads it! What method exists on reference type Base?",
            "solution": "Base:5 ",
            "explanation": "Because Derived declared show(double), the signatures do not match. Derived overloaded show(), not overrode it. Through reference Base b, only show(int) is visible, so Base.show(int) executes and prints 'Base:5 '."
        },
        {
            "title": "Puzzle 2: Chained Overriding Across Three Tiers",
            "problemStatement": "What is the console output?",
            "code": """class A {
    String getMsg() { return "A"; }
}
class B extends A {
    @Override
    String getMsg() { return super.getMsg() + "B"; }
}
class C extends B {
    @Override
    String getMsg() { return super.getMsg() + "C"; }
}
public class TraceO2 {
    public static void main(String[] args) {
        A obj = new C();
        System.out.println(obj.getMsg());
    }
}""",
            "options": ["ABC", "CBA", "C", "Compilation Error"],
            "correctOptionIndex": 0,
            "hint": "obj is an instance of C. C's getMsg() calls B's getMsg(), which calls A's getMsg().",
            "solution": "ABC",
            "explanation": "Calling getMsg() on instance C dispatches to C.getMsg(). C calls super.getMsg() (in B), which calls super.getMsg() (in A) returning 'A'. B appends 'B' -> 'AB'. C appends 'C' -> 'ABC'."
        },
        {
            "title": "Puzzle 3: Static Method Hiding Resolution",
            "problemStatement": "What is the exact output of this code?",
            "code": """class Top {
    static void ping() { System.out.print("TopPing "); }
}
class Bottom extends Top {
    static void ping() { System.out.print("BottomPing "); }
}
public class TraceO3 {
    public static void main(String[] args) {
        Top t = new Bottom();
        Bottom b = new Bottom();
        t.ping();
        b.ping();
    }
}""",
            "options": [
                "TopPing BottomPing ",
                "BottomPing BottomPing ",
                "TopPing TopPing ",
                "Compilation Error: cannot hide static method"
            ],
            "correctOptionIndex": 0,
            "hint": "Static methods are resolved at compile time based strictly on the declared reference type.",
            "solution": "TopPing BottomPing ",
            "explanation": "t has declared type Top, so t.ping() resolves at compile time to Top.ping() ('TopPing '). b has declared type Bottom, so b.ping() resolves to Bottom.ping() ('BottomPing '). Result: 'TopPing BottomPing '."
        },
        {
            "title": "Puzzle 4: Covariant Return Type Invocation",
            "problemStatement": "Does this code compile, and what does it output?",
            "code": """class SuperNum {
    Number getVal() { return Integer.valueOf(10); }
}
class SubNum extends SuperNum {
    @Override
    Integer getVal() { return Integer.valueOf(20); }
}
public class TraceO4 {
    public static void main(String[] args) {
        SuperNum sn = new SubNum();
        System.out.println(sn.getVal());
    }
}""",
            "options": [
                "20",
                "10",
                "Compilation Error: return type is incompatible with SuperNum",
                "Runtime Exception"
            ],
            "correctOptionIndex": 0,
            "hint": "Integer IS-A Number, which is a legal covariant return type in Java.",
            "solution": "20",
            "explanation": "Integer is a subtype of Number, so returning Integer in the override is valid covariant overriding. At runtime, SubNum's getVal() executes, returning 20."
        },
        {
            "title": "Puzzle 5: Private Method Same Signature Trap",
            "problemStatement": "What does this program display?",
            "code": """class AlphaClass {
    private void secret() {
        System.out.print("AlphaSecret ");
    }
    public void reveal() {
        secret();
    }
}
class BetaClass extends AlphaClass {
    public void secret() {
        System.out.print("BetaSecret ");
    }
}
public class TraceO5 {
    public static void main(String[] args) {
        AlphaClass ac = new BetaClass();
        ac.reveal();
    }
}""",
            "options": [
                "AlphaSecret ",
                "BetaSecret ",
                "Compilation Error: cannot override private method",
                "Runtime Exception"
            ],
            "correctOptionIndex": 0,
            "hint": "Private methods cannot be overridden! When reveal() in AlphaClass calls secret(), it statically binds to AlphaClass's private secret().",
            "solution": "AlphaSecret ",
            "explanation": "secret() in AlphaClass is private and invisible to BetaClass. BetaClass.secret() is an independent method, not an override. When reveal() calls secret(), it calls AlphaClass's own private method, printing 'AlphaSecret '."
        },
        {
            "title": "Puzzle 6: Modifying State in Overridden Method",
            "problemStatement": "What is the result printed by main()?",
            "code": """class Worker {
    int units = 0;
    void work() {
        units += 10;
    }
}
class FastWorker extends Worker {
    @Override
    void work() {
        super.work();
        units += 20;
    }
}
public class TraceO6 {
    public static void main(String[] args) {
        Worker w = new FastWorker();
        w.work();
        System.out.println("Units: " + w.units);
    }
}""",
            "options": ["Units: 30", "Units: 10", "Units: 20", "Units: 0"],
            "correctOptionIndex": 0,
            "hint": "FastWorker.work() executes, which calls super.work() (units + 10) and then adds 20 more.",
            "solution": "Units: 30",
            "explanation": "w.work() invokes FastWorker's overridden work(). super.work() adds 10 to units (10). Then FastWorker adds 20 more to units (30). Total units: 30."
        },
        {
            "title": "Puzzle 7: Overriding with Widened Access Modifier",
            "problemStatement": "What happens when compiling this class?",
            "code": """class Level1 {
    protected void action() {
        System.out.println("Action 1");
    }
}
class Level2 extends Level1 {
    @Override
    public void action() {
        System.out.println("Action 2");
    }
}
public class TraceO7 {
    public static void main(String[] args) {
        new Level2().action();
    }
}""",
            "options": [
                "Action 2",
                "Action 1",
                "Compilation Error: cannot change access modifier from protected to public",
                "Runtime Exception"
            ],
            "correctOptionIndex": 0,
            "hint": "In Java, an overriding method CAN expand visibility from protected to public.",
            "solution": "Action 2",
            "explanation": "Expanding visibility from protected to public is completely valid in Java. The code compiles cleanly and outputs 'Action 2'."
        },
        {
            "title": "Puzzle 8: Polymorphic Call from Base Constructor",
            "problemStatement": "What is the output of this program?",
            "code": """class ShapeBase {
    ShapeBase() {
        draw();
    }
    void draw() {
        System.out.print("BaseDraw ");
    }
}
class CircleSub extends ShapeBase {
    @Override
    void draw() {
        System.out.print("CircleDraw ");
    }
}
public class TraceO8 {
    public static void main(String[] args) {
        new CircleSub();
    }
}""",
            "options": ["CircleDraw ", "BaseDraw ", "BaseDraw CircleDraw ", "Compilation Error"],
            "correctOptionIndex": 0,
            "hint": "All non-private, non-final, non-static methods in Java are virtual. When ShapeBase calls draw(), dynamic dispatch executes CircleSub's override.",
            "solution": "CircleDraw ",
            "explanation": "Dynamic method dispatch applies even during constructor execution. Because the actual object being created is CircleSub, draw() resolves dynamically to CircleSub's overridden draw(), printing 'CircleDraw '."
        }
    ],
    "interviewQuestions": [
        {
            "question": "What are the precise rules governing method overriding in Java?",
            "answer": "Method overriding requires: 1) Identical method name and identical parameter type list in identical order; 2) The return type must be identical or a covariant subtype; 3) Access modifier cannot be more restrictive (it can stay the same or widen); 4) The overriding method cannot declare new or broader checked exceptions (it can declare fewer, narrower, or no checked exceptions); 5) The method in the superclass must be accessible and not marked private, static, or final.",
            "followUp": "Can an overriding method add new unchecked exceptions (like NullPointerException)?",
            "followUpAnswer": "Yes. Unchecked exceptions (subclasses of RuntimeException and Error) are not constrained by the method overriding rules.",
            "keyPhrases": ["Exact signature match", "Covariant return types", "Access visibility ladder", "Checked exception constraints", "Non-final non-private non-static"],
            "commonMistakeAnswer": "Thinking you can change parameter types or narrow public access to protected."
        },
        {
            "question": "What is a covariant return type and why was it introduced in Java 5?",
            "answer": "A covariant return type allows an overriding method in a subclass to declare a return type that is a subtype of the return type declared by the superclass method. Prior to Java 5, overriding methods had to match the return type identically. This forced developers to return a broad type (like Object or SuperClass) and compelled callers to write unsafe, verbose type casts. Covariant returns eliminate this casting while strictly preserving type safety.",
            "followUp": "Does covariance apply to primitive return types (e.g., returning 'short' when parent returns 'int')?",
            "followUpAnswer": "No. Covariance applies strictly to reference types (classes and interfaces). Primitive types cannot be covariant.",
            "keyPhrases": ["Subtype return declaration", "Java 5 enhancement", "Eliminates caller casting", "Reference types only", "No primitive covariance"],
            "commonMistakeAnswer": "Believing you can return a primitive subtype like byte or int."
        },
        {
            "question": "Why can an overriding method NOT have more restrictive access than the superclass method?",
            "answer": "This rule enforces the Liskov Substitution Principle (LSP). In Java, a subclass instance must be completely usable wherever a superclass reference is expected. If a superclass declares a method as 'public', any caller holding a superclass reference has the contractual guarantee that they can call that method. If a subclass were allowed to restrict that method to 'private', invoking the method through a superclass reference would cause a catastrophic runtime access violation.",
            "followUp": "Can a package-private method be overridden as protected or public in another package?",
            "followUpAnswer": "If a method is package-private, a subclass in a DIFFERENT package does not inherit it and therefore cannot override it at all. But a subclass in the SAME package can override it and widen it to protected or public.",
            "keyPhrases": ["Liskov Substitution Principle", "Contractual guarantee", "Prevent runtime access violation", "Substitutability"],
            "commonMistakeAnswer": "Assuming it is just a syntax restriction rather than an architectural necessity for polymorphism."
        },
        {
            "question": "Can a static method be overridden in Java? Explain the concept of method hiding.",
            "answer": "No, static methods cannot be overridden. Static methods belong to the class rather than object instances and do not have an entry in the virtual method table (vtable). When a subclass declares a static method with the exact same signature as a superclass static method, it 'hides' the superclass method. The method that gets invoked is determined at compile time based strictly on the declared reference type of the variable, not the runtime object on the heap.",
            "followUp": "What happens if a subclass attempts to declare an instance method with the same signature as a static superclass method?",
            "followUpAnswer": "It results in a compile-time error: 'instance method cannot override static method in ParentClass'.",
            "keyPhrases": ["Method hiding", "No vtable entry", "Compile-time binding", "Reference type resolution", "Cannot mix static and instance"],
            "commonMistakeAnswer": "Claiming static methods are overridden just like instance methods."
        },
        {
            "question": "Why is the @Override annotation considered an essential software engineering practice?",
            "answer": "The @Override annotation is a compiler directive that instructs javac to verify that a method is genuinely overriding a method from an ancestor class. If the superclass method signature ever changes, or if the developer accidentally misspells the method name or misdeclares a parameter type (e.g., equals(String) instead of equals(Object)), the compiler immediately flags an error. Without @Override, the compiler would silently compile the faulty method as an unintended overload, leading to insidious runtime bugs.",
            "followUp": "Does @Override have any runtime performance impact?",
            "followUpAnswer": "None whatsoever. @Override has a retention policy of SOURCE, meaning it is completely stripped during compilation and does not exist in the .class bytecode.",
            "keyPhrases": ["Compiler directive", "Compile-time validation", "Catches signature drift", "Prevents accidental overload", "SOURCE retention"],
            "commonMistakeAnswer": "Thinking @Override is required for overriding to work at runtime."
        },
        {
            "question": "Can you override a constructor in Java?",
            "answer": "No. Constructors cannot be overridden because constructors are NOT members of a class and are not inherited by subclasses. Every constructor has the exact same name as its declaring class. When a subclass creates its constructor, it has its own name and merely chains to a superclass constructor via super(). Overriding applies strictly to inherited instance methods.",
            "followUp": "Can a constructor be overloaded?",
            "followUpAnswer": "Yes, constructors can be overloaded with different parameter lists within the same class.",
            "keyPhrases": ["Constructors are not members", "Constructors are not inherited", "Cannot be overridden", "Chained via super()"],
            "commonMistakeAnswer": "Confusing constructor chaining with constructor overriding."
        },
        {
            "question": "Can you override a private method in Java?",
            "answer": "No. Private methods are completely hidden within the declaring class and are not visible to or inherited by any subclass. If a subclass declares a method with the exact same name and signature as a private method in the superclass, it is simply a brand new, completely unrelated method. Adding the @Override annotation to it will trigger a compile-time error.",
            "followUp": "What bytecode instruction is used by the JVM to invoke private methods?",
            "followUpAnswer": "The JVM invokes private methods using 'invokespecial', which performs direct static binding without vtable lookup.",
            "keyPhrases": ["Inaccessible outside class", "Not inherited", "Brand new independent method", "invokespecial"],
            "commonMistakeAnswer": "Believing a subclass can override a private method if it uses the same signature."
        },
        {
            "question": "How can a subclass method invoke the superclass implementation of an overridden method?",
            "answer": "By using the 'super' keyword followed by the dot operator: 'super.methodName(arguments)'. This bypasses dynamic method dispatch and explicitly calls the superclass version. This is commonly used in behavioral augmentation, where the subclass executes the parent logic and then adds specialized behavior.",
            "followUp": "Can a subclass call 'super.super.methodName()' if both its parent and grandparent override the method?",
            "followUpAnswer": "No. Java strictly forbids 'super.super' syntax to protect encapsulation and prevent breaking intermediate class invariants.",
            "keyPhrases": ["super.methodName()", "Bypassing dynamic dispatch", "Behavioral augmentation", "No super.super allowed"],
            "commonMistakeAnswer": "Thinking super.super exists in Java."
        },
        {
            "question": "How does method overriding interact with variable shadowing?",
            "answer": "Method overriding is dynamic and polymorphic; variable shadowing is static and non-polymorphic. If a subclass defines a field with the same name as a superclass field, the field is shadowed, not overridden. When calling an overridden method on an upcast reference (Parent p = new Child()), the Child's method executes. But accessing a field (p.field) retrieves the Parent's field based strictly on the reference type.",
            "followUp": "If an overridden method accesses a shadowed field using 'this.fieldName', which field does it access?",
            "followUpAnswer": "It accesses the subclass's field, because 'this' inside the subclass method refers to the subclass context.",
            "keyPhrases": ["Methods are polymorphic", "Variables are not polymorphic", "Reference type binds fields", "Runtime object binds methods"],
            "commonMistakeAnswer": "Assuming instance variables are overridden and dispatched dynamically."
        },
        {
            "question": "What is the performance overhead of virtual method invocation compared to direct static method invocation?",
            "answer": "In raw bytecode, virtual invocation requires a pointer dereference through the object header to the class vtable (an indexed array lookup), whereas static invocation jumps directly to a fixed method address. However, modern HotSpot JVMs employ Just-In-Time (JIT) compiler optimizations such as Monomorphic Call Inlining. If the JIT detects that a virtual method call site is always invoked with the same concrete class, it completely inlines the target method body, eliminating the vtable lookup entirely and achieving zero-overhead execution.",
            "followUp": "What happens if a call site becomes megamorphic (invoked with many different subclasses)?",
            "followUpAnswer": "If more than two concrete classes are dispatched at the same call site, the JIT falls back to a standard vtable index lookup (O(1) complexity).",
            "keyPhrases": ["vtable array lookup", "O(1) dispatch complexity", "Monomorphic inlining", "JIT deoptimization", "Megamorphic call sites"],
            "commonMistakeAnswer": "Believing virtual method invocation has severe performance costs in modern Java."
        }
    ],
    "miniQuiz": [
        {
            "question": "Which of the following is REQUIRED for a method in a subclass to legally override a superclass method?",
            "options": [
                "Different parameter types",
                "Identical method name and parameter types in the same order",
                "A more restrictive access modifier",
                "The static modifier on both methods"
            ],
            "correctIndex": 1,
            "explanation": "Overriding requires the exact same method signature: identical name and identical parameter types in order."
        },
        {
            "question": "If a superclass method has 'protected' visibility, which visibility can the overriding subclass method have?",
            "options": [
                "private or protected",
                "protected or public",
                "default (package-private) only",
                "public only"
            ],
            "correctIndex": 1,
            "explanation": "Overriding methods can maintain the same access (protected) or broaden it (public), but cannot narrow it."
        },
        {
            "question": "What is a covariant return type?",
            "options": [
                "A return type that is a subtype of the superclass method's return type",
                "A return type that is a supertype of the superclass method's return type",
                "A method that returns multiple values simultaneously",
                "Changing a return type from void to int"
            ],
            "correctIndex": 0,
            "explanation": "A covariant return type allows the overriding method to return a more specific subtype of the superclass method's return type."
        },
        {
            "question": "What happens if you mark an overriding method with @Override, but misspell the method name?",
            "options": [
                "The compiler renames the superclass method automatically",
                "The code compiles but throws a runtime exception",
                "The compiler issues a compile-time error",
                "The method is ignored by the JVM"
            ],
            "correctIndex": 2,
            "explanation": "@Override triggers a compile-time check. If no matching superclass method exists, compilation fails."
        },
        {
            "question": "Can static methods be overridden in Java?",
            "options": [
                "Yes, via dynamic dispatch",
                "No, static methods are hidden rather than overridden",
                "Yes, if marked with @Override",
                "Only if the class is abstract"
            ],
            "correctIndex": 1,
            "explanation": "Static methods belong to classes and are bound at compile time; they are hidden, not overridden."
        },
        {
            "question": "Which methods cannot be overridden in Java?",
            "options": [
                "public and protected methods",
                "private, static, and final methods",
                "Methods with return types",
                "Methods without parameters"
            ],
            "correctIndex": 1,
            "explanation": "private methods (not visible), static methods (class-bound), and final methods (sealed) cannot be overridden."
        },
        {
            "question": "How does a subclass call the superclass's version of an overridden method?",
            "options": [
                "super()",
                "super.methodName()",
                "parent.methodName()",
                "this.super.methodName()"
            ],
            "correctIndex": 1,
            "explanation": "super.methodName() invokes the superclass implementation, bypassing dynamic dispatch."
        },
        {
            "question": "If a superclass method throws IOException (checked), what can the overriding subclass method declare?",
            "options": [
                "Exception (broader checked exception)",
                "FileNotFoundException (narrower checked exception) or no exception at all",
                "Any new checked exception like SQLException",
                "Checked exceptions cannot be modified"
            ],
            "correctIndex": 1,
            "explanation": "An overriding method cannot declare new or broader checked exceptions; it can declare narrower exceptions or omit them."
        },
        {
            "question": "What retention policy does the @Override annotation have?",
            "options": [
                "RUNTIME",
                "CLASS",
                "SOURCE",
                "BYTECODE"
            ],
            "correctIndex": 2,
            "explanation": "@Override has SOURCE retention; it is purely for compiler validation and discarded from the .class file."
        },
        {
            "question": "Given 'Parent p = new Child();', which implementation of an overridden method 'action()' executes?",
            "options": [
                "Parent's action()",
                "Child's action()",
                "Both execute simultaneously",
                "Neither executes without a downcast"
            ],
            "correctIndex": 1,
            "explanation": "Because action() is overridden, dynamic method dispatch resolves the call to Child's action() at runtime."
        }
    ]
}

# =========================================================================
# LESSON 11.4: The final Keyword with Classes, Methods & Fields
# =========================================================================
lesson_11_4 = {
    "id": "final-keyword-in-oop",
    "moduleId": "java-inheritance",
    "moduleTitle": "11. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 11.4",
    "title": "The final Keyword with Classes, Methods & Fields",
    "subtitle": "Immutability guarantees, preventing inheritance, sealing methods against modification, and blank final variables",
    "estimatedMinutes": 16,
    "beginnerAnalogy": "Legal notary seals and constitutional clauses: A `final` field is a notarized contract with a stamped date and signature—once recorded, no one can erase or rewrite the inked value. A `final` method is an entrenched constitutional amendment—branches of government can build regulations around it, but they are legally barred from overriding or altering its text. A `final` class is a closed archive—you can read its contents and reference its precedent, but no one is permitted to extend its docket with new claims. It provides an unshakeable boundary against unintended tampering.",
    "interviewTakeaways": [
        "Three Contexts of Final: Applied to variables/fields (single assignment/constant), methods (prevents overriding), and classes (prevents inheritance).",
        "Reference Immutability vs Object Immutability: Marking an object reference variable 'final' means the reference can never point to a different heap object; however, the object itself can still mutate its internal state freely.",
        "Blank Final Definite Assignment: An uninitialized final field (blank final) must be definitively initialized exactly once in every constructor execution path before the constructor finishes.",
        "Security & Integrity in Core Java: Critical JDK classes like String, Integer, and Math are declared 'final' to prevent malicious or flawed subclasses from compromising security invariants and JVM assumptions.",
        "JIT Compiler Optimization: The HotSpot JIT compiler heavily optimizes final methods and classes through monomorphic call inlining without needing runtime deoptimization traps."
    ],
    "cheatSheet": {
        "summary": "The 'final' keyword restricts modification: final classes cannot be extended, final methods cannot be overridden, and final variables/fields can only be assigned once.",
        "syntaxTemplate": "public final class ImmutableClass {\n    private final int constantValue; // Blank final\n\n    public ImmutableClass(int val) {\n        this.constantValue = val; // Initialized in constructor\n    }\n\n    public final void sealedMethod() {\n        // Cannot be overridden\n    }\n}",
        "rules": [
            {
                "rule": "Final Classes",
                "explanation": "Cannot be extended by any class ('public final class A'). All methods in a final class are implicitly final."
            },
            {
                "rule": "Final Methods",
                "explanation": "Can be inherited by subclasses, but CANNOT be overridden or hidden by them."
            },
            {
                "rule": "Final Variables",
                "explanation": "Can be assigned exactly once. Once initialized, attempting to reassign triggers a compile-time error."
            },
            {
                "rule": "Blank Final Fields",
                "explanation": "Instance blank finals must be initialized in all constructors or instance initializers."
            },
            {
                "rule": "Reference Immutability",
                "explanation": "A final reference cannot change its target object, but the target object's internal fields can still be modified."
            },
            {
                "rule": "Constants Idiom",
                "explanation": "'public static final' defines class-level compile-time constants named in UPPER_SNAKE_CASE."
            }
        ],
        "quickComparison": [
            {
                "aspect": "Target",
                "optionA": "final Class: Prohibits inheritance completely",
                "optionB": "final Method: Allows inheritance, prohibits overriding"
            },
            {
                "aspect": "Field Effect",
                "optionA": "final Primitive: Value is permanently frozen",
                "optionB": "final Reference: Pointer is frozen; heap object state can mutate"
            },
            {
                "aspect": "Timing",
                "optionA": "Compile-time Constant: Known at compile time (inlined into bytecode)",
                "optionB": "Blank Final: Initialized at runtime during object creation"
            },
            {
                "aspect": "Design Goal",
                "optionA": "Immutability & security (prevents tampering)",
                "optionB": "Extensibility (open for subclassing)"
            },
            {
                "aspect": "Abstract Conflict",
                "optionA": "final and abstract are mutually exclusive (compile error)",
                "optionB": "abstract requires subclassing; final prohibits it"
            }
        ]
    },
    "coreExplanation": [
        "The 'final' modifier in Java is a non-access modifier that enforces immutability and prevents alteration across three architectural dimensions: classes, methods, and variables.",
        "Final Classes: Declaring a class 'final' seals it against extension. No class can write 'extends FinalClass'. Standard Java libraries seal critical classes—including java.lang.String, System, and all primitive wrapper classes (Integer, Double, etc.)—to guarantee immutability, thread safety, and system security.",
        "Final Methods: Marking a method 'final' permits subclasses to inherit and execute it, but strictly prevents them from overriding it. This is widely used in the Template Method design pattern, where a base class defines the skeleton of an algorithm that must not be altered, while delegating specific steps to overridable protected hook methods.",
        "Final Variables and Blank Finals: A final variable can only be assigned once. If an instance field is declared 'final' without an initial value, it is called a 'blank final'. The compiler enforces that every constructor must initialize every blank final field along all execution paths.",
        "Reference vs Object Immutability: A critical beginner misconception is confusing a final reference with an immutable object. For example, 'final int[] numbers = {1, 2, 3};' prevents 'numbers = new int[5];', but 'numbers[0] = 99;' is completely legal. To achieve full object immutability, the referenced object itself must be designed with private final fields and no setters.",
        "Compile-time Constants: A 'public static final' primitive or String initialized with a constant expression is treated as a compile-time constant. The Java compiler inlines its literal value directly into the bytecode of any calling classes.",
        "Performance Advantages: When a method or class is final, the JVM JIT compiler can aggressively perform direct method inlining without having to generate dependency tracking or guard checks for unexpected subclass loading."
    ],
    "diagram": """======================= THE FINAL KEYWORD IN THREE CONTEXTS =======================

  1. FINAL CLASS:
     final class SecurityManager { ... }
            ^
            |  extends  <-- [COMPILE ERROR: Cannot inherit from final class]
     class RogueManager { ... }

  2. FINAL METHOD:
     class PaymentProcessor {
         public final void processTransaction() { ... }
     }
     class CustomProcessor extends PaymentProcessor {
         public void processTransaction() { ... } <-- [COMPILE ERROR: cannot override]
     }

  3. FINAL REFERENCE VARIABLE:
     final int[] data = new int[]{ 10, 20 };
     +--------------+
     | data pointer | ======> [ Heap Array: { 10, 20 } ]
     +--------------+              |
           |                       |--> data[0] = 99;   [VALID: mutates heap data]
           |
           +--> data = new int[5]; [COMPILE ERROR: cannot reassign final pointer]""",
    "codeSnippet": {
        "title": "Immutable User Profile with Blank Final Fields",
        "code": """public final class UserProfile {
    private final String userId;
    private final String email;
    private final int creationYear;

    public UserProfile(String userId, String email, int creationYear) {
        this.userId = userId;
        this.email = email;
        this.creationYear = creationYear;
    }

    public String getUserId() { return userId; }
    public String getEmail() { return email; }
    public int getCreationYear() { return creationYear; }

    public final void printBadge() {
        System.out.println("ID: " + userId + " | Email: " + email + " | Since: " + creationYear);
    }
}

public class Main {
    public static void main(String[] args) {
        UserProfile user = new UserProfile("USR-770", "alex@corp.com", 2024);
        user.printBadge();
    }
}""",
        "lineByLineExplanation": [
            {"line": "public final class UserProfile", "explanation": "The class is sealed and cannot be extended by any other class."},
            {"line": "private final String userId;", "explanation": "Blank final instance field; must be assigned in constructor."},
            {"line": "this.userId = userId;", "explanation": "Initializes the blank final field. Once set, it can never be mutated."},
            {"line": "public final void printBadge()", "explanation": "Explicitly sealed method guaranteeing invariant badge printing behavior."},
            {"line": "UserProfile user = new UserProfile(...);", "explanation": "Instantiates the immutable profile object."}
        ],
        "output": "ID: USR-770 | Email: alex@corp.com | Since: 2024"
    },
    "codeExamples": [
        {
            "title": "Template Method Pattern with Final Invariant Method",
            "description": "Using a final method to define an unchangeable execution pipeline while letting subclasses customize individual steps.",
            "code": """class ReportGenerator {
    // Final template method: pipeline order CANNOT be altered
    public final void generateReport() {
        printHeader();
        printBody();
        printFooter();
    }

    private void printHeader() {
        System.out.println("=== CORPORATE REPORT HEADER ===");
    }

    // Hook method: meant to be overridden by subclasses
    protected void printBody() {
        System.out.println("Generic raw metrics.");
    }

    private void printFooter() {
        System.out.println("=== CONFIDENTIAL - END OF REPORT ===");
    }
}

class SalesReport extends ReportGenerator {
    @Override
    protected void printBody() {
        System.out.println("Q3 Sales: $1.4M (18% YoY Growth)");
    }
}

public class TemplatePatternDemo {
    public static void main(String[] args) {
        ReportGenerator report = new SalesReport();
        report.generateReport();
    }
}""",
            "output": "=== CORPORATE REPORT HEADER ===\nQ3 Sales: $1.4M (18% YoY Growth)\n=== CONFIDENTIAL - END OF REPORT ==="
        },
        {
            "title": "Final Reference Pointer vs Mutable Heap Object",
            "description": "Demonstrating that final protects the reference variable from reassignment, but does not freeze object contents.",
            "code": """class Point {
    int x;
    int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

public class FinalReferenceDemo {
    public static void main(String[] args) {
        final Point p = new Point(10, 20);

        // Modifying fields of the referenced object is completely legal
        p.x = 99;
        p.y = 88;
        System.out.println("Mutated Point: (" + p.x + ", " + p.y + ")");

        // Reassigning p to a new Point is illegal:
        // p = new Point(0, 0); // COMPILE ERROR: cannot assign a value to final variable p
    }
}""",
            "output": "Mutated Point: (99, 88)"
        },
        {
            "title": "Blank Final Field Initialization Across Multiple Constructors",
            "description": "Showing how every constructor path must definitely assign blank final fields.",
            "code": """class DatabaseConfig {
    private final String url;
    private final int port;

    // Primary constructor
    public DatabaseConfig(String url, int port) {
        this.url = url;
        this.port = port;
    }

    // Overloaded constructor delegating via this()
    public DatabaseConfig(String url) {
        this(url, 5432); // port defaults to 5432
    }

    public void showConfig() {
        System.out.println("Connected to " + url + " on port " + port);
    }
}

public class BlankFinalDemo {
    public static void main(String[] args) {
        DatabaseConfig dev = new DatabaseConfig("localhost", 3306);
        DatabaseConfig prod = new DatabaseConfig("db.prod.internal");

        dev.showConfig();
        prod.showConfig();
    }
}""",
            "output": "Connected to localhost on port 3306\nConnected to db.prod.internal on port 5432"
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Thinking 'final' on an object reference makes the object immutable",
            "whyItHappens": "Developers assume `final Point p = new Point()` prevents modifying `p.x`.",
            "howToFix": "Understand that 'final' freezes the pointer variable only. To make an object immutable, make its fields private final and omit setters."
        },
        {
            "mistake": "Failing to initialize a blank final variable in one of several constructors",
            "whyItHappens": "Providing an alternative constructor that forgets to assign the blank final field.",
            "howToFix": "Ensure every constructor assigns every blank final field, or delegate constructors using `this(...)` to a single primary constructor."
        },
        {
            "mistake": "Attempting to declare a class both 'abstract' and 'final'",
            "whyItHappens": "Developers wanting a class that has template methods but cannot be extended.",
            "howToFix": "'abstract' demands that a class be subclassed, while 'final' strictly forbids subclassing. They are contradictory and rejected at compile time."
        },
        {
            "mistake": "Trying to reassign a method parameter declared as 'final'",
            "whyItHappens": "Developers treating incoming parameters as local scratchpad variables.",
            "howToFix": "Declare a new local variable inside the method to hold mutated values instead of reassigning the final parameter."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: Final Reference Array Element Mutation",
            "problemStatement": "What is printed by this program?",
            "code": """public class TraceF1 {
    public static void main(String[] args) {
        final int[] arr = { 1, 2, 3 };
        arr[0] = 10;
        arr[2] = 30;
        System.out.println(arr[0] + arr[1] + arr[2]);
    }
}""",
            "options": ["42", "6", "Compilation Error: cannot mutate final array", "Runtime Exception"],
            "correctOptionIndex": 0,
            "hint": "The reference 'arr' is final and cannot point to another array. Are its elements final?",
            "solution": "42",
            "explanation": "arr is a final reference pointing to the array on the heap. Mutating array elements is completely legal. 10 + 2 + 30 = 42."
        },
        {
            "title": "Puzzle 2: Definite Assignment of Blank Final",
            "problemStatement": "Does this code compile, and if so, what does it output?",
            "code": """class Config {
    final int timeout;
    Config(boolean isFast) {
        if (isFast) {
            timeout = 100;
        } else {
            timeout = 5000;
        }
    }
}
public class TraceF2 {
    public static void main(String[] args) {
        Config c = new Config(true);
        System.out.println("Timeout: " + c.timeout);
    }
}""",
            "options": [
                "Timeout: 100",
                "Compilation Error: variable timeout might not have been initialized",
                "Compilation Error: cannot assign value to final variable timeout",
                "Timeout: 0"
            ],
            "correctOptionIndex": 0,
            "hint": "Both branches of the if-else assign timeout exactly once.",
            "solution": "Timeout: 100",
            "explanation": "The Java compiler verifies definite assignment. Since both the 'if' and 'else' branches assign timeout exactly once, it compiles cleanly. For isFast=true, timeout is 100."
        },
        {
            "title": "Puzzle 3: Final Method Inheritance Without Override",
            "problemStatement": "What does this code output?",
            "code": """class SecurityBase {
    final void authenticate() {
        System.out.print("BaseAuth ");
    }
}
class CustomSecurity extends SecurityBase {
    void login() {
        authenticate();
        System.out.print("CustomLogin ");
    }
}
public class TraceF3 {
    public static void main(String[] args) {
        CustomSecurity cs = new CustomSecurity();
        cs.login();
    }
}""",
            "options": [
                "BaseAuth CustomLogin ",
                "Compilation Error: cannot inherit final method",
                "CustomLogin ",
                "Compilation Error: authenticate has final access"
            ],
            "correctOptionIndex": 0,
            "hint": "Final methods ARE inherited by subclasses; they simply cannot be overridden.",
            "solution": "BaseAuth CustomLogin ",
            "explanation": "CustomSecurity inherits authenticate() and can invoke it freely. Because it does not attempt to override authenticate(), it compiles cleanly and prints 'BaseAuth CustomLogin '."
        },
        {
            "title": "Puzzle 4: Subclass Attempting to Override Final Method",
            "problemStatement": "What happens when this snippet is compiled?",
            "code": """class ParentProtocol {
    final void handshake() {}
}
class ChildProtocol extends ParentProtocol {
    @Override
    void handshake() {}
}
public class TraceF4 {
    public static void main(String[] args) {}
}""",
            "options": [
                "Compilation Error: handshake() in ChildProtocol cannot override handshake() in ParentProtocol; overridden method is final",
                "Compiles cleanly with a compiler warning",
                "Runtime Exception: IllegalAccessError",
                "Compiles and runs normally"
            ],
            "correctOptionIndex": 0,
            "hint": "A method marked final cannot be overridden by any subclass.",
            "solution": "Compilation Error: handshake() in ChildProtocol cannot override handshake() in ParentProtocol; overridden method is final",
            "explanation": "The final keyword on a method seals it against being overridden. Any attempt by a subclass to declare a method with the same signature fails compilation."
        },
        {
            "title": "Puzzle 5: Final Static Variable in Arithmetic Expression",
            "problemStatement": "What does main() print?",
            "code": """class Constants {
    public static final int BASE = 50;
}
public class TraceF5 {
    public static void main(String[] args) {
        final int multiplier = 3;
        int result = Constants.BASE * multiplier + 10;
        System.out.println("Result: " + result);
    }
}""",
            "options": ["Result: 160", "Result: 150", "Compilation Error", "Result: 60"],
            "correctOptionIndex": 0,
            "hint": "Constants.BASE is 50, multiplier is 3. 50 * 3 + 10 = 160.",
            "solution": "Result: 160",
            "explanation": "Constants.BASE (50) and multiplier (3) are final constants. 50 * 3 = 150; 150 + 10 = 160."
        },
        {
            "title": "Puzzle 6: Reassigning Final Method Parameter",
            "problemStatement": "What is the result of compiling this code?",
            "code": """public class TraceF6 {
    static int process(final int x) {
        x = x + 1;
        return x * 2;
    }
    public static void main(String[] args) {
        System.out.println(process(5));
    }
}""",
            "options": [
                "Compilation Error: cannot assign a value to final variable x",
                "12",
                "10",
                "Compilation Error: final parameters are not allowed in Java"
            ],
            "correctOptionIndex": 0,
            "hint": "Method parameters marked 'final' cannot be reassigned within the method body.",
            "solution": "Compilation Error: cannot assign a value to final variable x",
            "explanation": "Because x is declared final, assigning x = x + 1 is an illegal reassignment and causes a compile-time error."
        },
        {
            "title": "Puzzle 7: Final Class Extension Failure",
            "problemStatement": "What happens when compiling this snippet?",
            "code": """final class LockBox {}
class OpenBox extends LockBox {}

public class TraceF7 {
    public static void main(String[] args) {}
}""",
            "options": [
                "Compilation Error: cannot inherit from final LockBox",
                "Compiles cleanly",
                "Runtime Exception: IncompatibleClassChangeError",
                "Compilation Error: final class cannot have default constructor"
            ],
            "correctOptionIndex": 0,
            "hint": "A class declared as final cannot be subclassed.",
            "solution": "Compilation Error: cannot inherit from final LockBox",
            "explanation": "The final keyword on class LockBox prevents any subclassing. 'class OpenBox extends LockBox' is an immediate compile-time error."
        },
        {
            "title": "Puzzle 8: Final Local Variable in Loop",
            "problemStatement": "What is printed by this code?",
            "code": """public class TraceF8 {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            final int token = i * 10;
            System.out.print(token + " ");
        }
    }
}""",
            "options": [
                "0 10 20 ",
                "Compilation Error: cannot reassign final variable token",
                "0 0 0 ",
                "Compilation Error: final variables cannot be declared inside loops"
            ],
            "correctOptionIndex": 0,
            "hint": "Each iteration of the loop creates a brand new local variable 'token' in its own block scope.",
            "solution": "0 10 20 ",
            "explanation": "In each iteration of the for loop, a new stack variable 'token' is allocated, initialized once, and goes out of scope at the end of the iteration. It is never reassigned, so it compiles cleanly and prints '0 10 20 '."
        }
    ],
    "interviewQuestions": [
        {
            "question": "What are the three distinct usages of the 'final' keyword in Java?",
            "answer": "The 'final' keyword applies to: 1) Variables and fields: It creates a constant that can only be assigned once. For primitives, the value cannot change; for references, the reference cannot point to another object. 2) Methods: It prevents subclasses from overriding or hiding the method, preserving invariant behavior. 3) Classes: It prevents the class from being extended by any other class, sealing the entire type hierarchy.",
            "followUp": "Can an abstract class or interface be marked final?",
            "followUpAnswer": "No. 'abstract' requires extension and implementation, while 'final' forbids it. Combining them triggers a compile-time error: 'illegal combination of modifiers: abstract and final'.",
            "keyPhrases": ["Variables/fields constant", "Methods non-overridable", "Classes non-extensible", "Incompatible with abstract"],
            "commonMistakeAnswer": "Forgetting one of the three contexts or assuming final always means full object immutability."
        },
        {
            "question": "Why is java.lang.String declared as a final class in the JDK?",
            "answer": "String is final for three critical reasons: 1) Security: Strings are used for file paths, network URLs, database connection strings, and security credentials. If String could be extended, a rogue subclass could override methods to disguise malicious strings or tamper with validation. 2) String Pool Integrity: The JVM relies on string immutability to safely share identical literals in the String Intern Pool across all threads. 3) Thread Safety: Immutable Strings can be shared across concurrent threads without synchronization.",
            "followUp": "What other commonly used JDK classes are declared final for similar reasons?",
            "followUpAnswer": "Primitive wrappers (Integer, Double, Boolean), System, Math, and java.net.URL.",
            "keyPhrases": ["Security validation preservation", "String intern pool integrity", "Thread safety without locking", "Wrapper class immutability"],
            "commonMistakeAnswer": "Thinking String is final solely for performance reasons."
        },
        {
            "question": "Does declaring an object reference 'final' make the underlying object immutable?",
            "answer": "No. Declaring a reference 'final' (e.g., 'final List items = ...' or 'final Person p = ...') only guarantees that the reference variable cannot be rebound to point to another object on the heap. It does NOT prevent modifying the internal state of that object. If the object exposes setters or mutable fields (like p.setAge(30)), those fields can still be freely modified. True immutability requires the class itself to be designed with private final fields, defensive copies, and no mutator methods.",
            "followUp": "How do you make an object truly immutable in Java?",
            "followUpAnswer": "Make the class final, make all fields private and final, do not provide any setter methods, and defensively copy any mutable objects in constructors and getters.",
            "keyPhrases": ["Reference immutability vs object immutability", "Frozen pointer", "Internal state mutability", "Defensive copying"],
            "commonMistakeAnswer": "Believing that final makes arrays or objects deeply immutable."
        },
        {
            "question": "What is a 'blank final' field and what rules govern its initialization?",
            "answer": "A 'blank final' is a final instance field that is declared without an explicit initializer expression (e.g., 'private final int id;'). Java enforces the Definite Assignment rule: every blank final field must be assigned a value exactly once in every constructor path before constructor completion. If a constructor path terminates without assigning the blank final, or if any code attempts to assign it a second time, the compiler issues an error.",
            "followUp": "Can a blank final field be initialized inside a regular instance method?",
            "followUpAnswer": "No. Instance blank finals can only be initialized directly at declaration, in an instance initializer block, or within constructors.",
            "keyPhrases": ["Blank final field", "Definite assignment rule", "Assigned exactly once", "Constructor or initializer only"],
            "commonMistakeAnswer": "Thinking you can initialize a blank final in a setter method called right after constructor."
        },
        {
            "question": "What is the difference between 'final', 'finally', and 'finalize()'?",
            "answer": "'final' is a keyword and non-access modifier used to restrict modification of variables, methods, and classes. 'finally' is a keyword that defines a block of code associated with a try-catch construct that is guaranteed to execute regardless of whether an exception was thrown or handled. 'finalize()' was a protected method in java.lang.Object called by the garbage collector before an object was reclaimed (deprecated since Java 9 and removed in modern Java).",
            "followUp": "Can code inside a finally block execute if System.exit(0) is called in the try block?",
            "followUpAnswer": "No. System.exit(0) halts the JVM immediately, so the finally block will not execute.",
            "keyPhrases": ["final modifier", "finally block for cleanup", "finalize() GC method (deprecated)", "Core Java distinction"],
            "commonMistakeAnswer": "Confusing finally and finalize or stating finalize() is still recommended in modern Java."
        },
        {
            "question": "Can a constructor be declared 'final'?",
            "answer": "No. Constructors cannot be marked 'final'. The purpose of the 'final' keyword on a method is to prevent subclasses from overriding it. Since constructors are never inherited and cannot be overridden by subclasses in the first place, marking a constructor 'final' is meaningless and is rejected as a compile-time syntax error.",
            "followUp": "What modifiers ARE allowed on constructor declarations?",
            "followUpAnswer": "Only access modifiers: public, protected, private, or package-private (no modifier). Modifiers like static, final, abstract, and synchronized are all illegal.",
            "keyPhrases": ["Constructors cannot be overridden", "Illegal modifier on constructor", "Only access modifiers allowed"],
            "commonMistakeAnswer": "Thinking constructors can be final to prevent child classes from calling super()."
        },
        {
            "question": "What performance optimizations does the JVM JIT compiler achieve with final methods and classes?",
            "answer": "When a method or class is declared final, the JVM knows with 100% certainty that no subclass will ever override that method. This allows the HotSpot Just-In-Time (JIT) compiler to perform aggressive 'Method Inlining'—replacing the method call bytecode with the actual instructions of the method body. Inlining eliminates call stack overhead, parameter passing, and vtable lookups, and unlocks secondary compiler optimizations like dead code elimination and loop unrolling.",
            "followUp": "Can the JIT compiler inline non-final methods too?",
            "followUpAnswer": "Yes, through speculative monomorphic inlining based on runtime profiling, but it requires generating deoptimization traps in case a new subclass is loaded later.",
            "keyPhrases": ["Method inlining", "No vtable lookup", "Eliminates call overhead", "Monomorphic devirtualization", "JIT optimization"],
            "commonMistakeAnswer": "Assuming final is purely a code design tool with zero runtime performance implications."
        },
        {
            "question": "Can a final static field be modified using Java Reflection?",
            "answer": "Historically, reflection could modify final static fields by altering the modifiers field in java.lang.reflect.Field. However, in modern Java (Java 12+ and especially with the strong encapsulation of the module system in Java 17+), reflective modification of static final fields is strictly blocked, throwing an IllegalAccessException. Furthermore, if the compiler inlined the constant at compile time, reflective changes would have no effect on compiled call sites anyway.",
            "followUp": "What is compile-time constant inlining?",
            "followUpAnswer": "When a primitive or String is declared 'public static final' and initialized with a literal expression, javac substitutes the raw literal value directly into referencing bytecodes at compile time.",
            "keyPhrases": ["Reflection blocking", "IllegalAccessException", "Compile-time inlining", "Strong encapsulation"],
            "commonMistakeAnswer": "Claiming reflection can always modify final static fields in all Java versions."
        },
        {
            "question": "Why should utility classes with only static methods have a private constructor and be declared final?",
            "answer": "Utility classes (like java.lang.Math) are collections of static functions and constants; they are never intended to be instantiated or extended. Declaring a private constructor prevents accidental instantiation (even via 'new Utility()'). Declaring the class 'final' communicates clearly that the class is sealed and prevents creating misleading subclasses that inherit static methods.",
            "followUp": "What exception is commonly thrown inside a private constructor of a utility class?",
            "followUpAnswer": "Throwing 'new UnsupportedOperationException(\"Utility class cannot be instantiated\");' inside the private constructor prevents internal or reflective instantiation.",
            "keyPhrases": ["Private constructor suppresses default", "Final seals class", "No instance state", "UnsupportedOperationException defensive throw"],
            "commonMistakeAnswer": "Assuming declaring only static methods automatically prevents instantiation."
        },
        {
            "question": "How does the final keyword help in designing thread-safe immutable classes?",
            "answer": "Under the Java Memory Model (JMM, JLS §17.5), final fields provide special 'freeze' semantics. When an object is constructed, all writes to its final fields are guaranteed to be frozen and visible to all other threads once the constructor completes, without requiring synchronization or volatile locks. This guarantees that other threads will never observe stale default values (null or 0) for final fields of a properly constructed object.",
            "followUp": "What is the condition for safe publication of immutable objects with final fields?",
            "followUpAnswer": "The 'this' reference must not escape the constructor before the constructor finishes executing.",
            "keyPhrases": ["Java Memory Model (JMM)", "Freeze action", "Guaranteed visibility without locks", "Safe publication", "No 'this' escape"],
            "commonMistakeAnswer": "Thinking thread safety always requires synchronized blocks or volatile keywords."
        }
    ],
    "miniQuiz": [
        {
            "question": "What happens if you attempt to inherit from a class declared as 'final'?",
            "options": [
                "The code compiles but throws an IllegalAccessError at runtime",
                "The compiler issues a compile-time error: cannot inherit from final class",
                "The subclass inherits only the public methods",
                "The subclass overrides all methods automatically"
            ],
            "correctIndex": 1,
            "explanation": "Extending a final class is strictly forbidden and rejected at compile time."
        },
        {
            "question": "Can a final method in a superclass be called by a subclass?",
            "options": [
                "No, final methods are completely hidden from subclasses",
                "Yes, final methods are inherited and can be called, but cannot be overridden",
                "Yes, but only through reflection",
                "Only if the method is static"
            ],
            "correctIndex": 1,
            "explanation": "Final methods are inherited by subclasses and can be invoked normally; they just cannot be overridden."
        },
        {
            "question": "What is a 'blank final' variable?",
            "options": [
                "A final variable that is assigned null permanently",
                "A final variable declared without an initial value, which must be assigned in the constructor",
                "A final variable that can be reassigned once per method",
                "A variable that has no data type"
            ],
            "correctIndex": 1,
            "explanation": "A blank final is declared without an immediate value and must be definitively initialized in the constructor."
        },
        {
            "question": "Given 'final int[] numbers = {10, 20, 30};', which of the following statements is LEGAL?",
            "options": [
                "numbers = new int[]{40, 50};",
                "numbers[0] = 99;",
                "numbers = null;",
                "All of the above"
            ],
            "correctIndex": 1,
            "explanation": "The reference 'numbers' cannot be reassigned, but the array elements inside the heap object can be modified."
        },
        {
            "question": "Why are primitive wrapper classes like Integer and Double declared as 'final' in Java?",
            "options": [
                "To save memory on the hard drive",
                "To guarantee value immutability and thread safety",
                "Because they do not have constructors",
                "To allow multiple inheritance"
            ],
            "correctIndex": 1,
            "explanation": "Wrapper classes are sealed to guarantee that their encapsulated values cannot be mutated or corrupted by subclasses."
        },
        {
            "question": "Can a constructor be declared with the 'final' modifier?",
            "options": [
                "Yes, to prevent subclasses from modifying the constructor",
                "No, constructors cannot be final (triggers a compile-time error)",
                "Yes, but only in abstract classes",
                "Yes, if it has no parameters"
            ],
            "correctIndex": 1,
            "explanation": "Constructors are never inherited or overridden, so marking a constructor final is illegal in Java."
        },
        {
            "question": "What happens if you combine the 'abstract' and 'final' modifiers on a class declaration?",
            "options": [
                "The class becomes a singleton",
                "The code compiles and creates an interface",
                "The compiler issues an error: illegal combination of modifiers: abstract and final",
                "The class can only have static methods"
            ],
            "correctIndex": 2,
            "explanation": "abstract requires subclassing, while final prohibits it; combining them is an illegal contradiction."
        },
        {
            "question": "Which combination of modifiers is conventionally used to define a global constant in Java?",
            "options": [
                "public final",
                "public static final",
                "private static",
                "protected final static"
            ],
            "correctIndex": 1,
            "explanation": "'public static final' defines a class-level, globally accessible, immutable constant."
        },
        {
            "question": "How does the Java Memory Model treat final fields initialized in a constructor?",
            "options": [
                "They require explicit synchronization locks to be visible to other threads",
                "They are guaranteed to be frozen and visible to other threads upon constructor completion without locking",
                "They are stored on the thread stack rather than the heap",
                "They are garbage collected immediately"
            ],
            "correctIndex": 1,
            "explanation": "The JMM guarantees freeze semantics: final fields are visible to all threads once the constructor finishes safely."
        },
        {
            "question": "What is the primary optimization advantage of final methods for the HotSpot JIT compiler?",
            "options": [
                "Direct method inlining without deoptimization dependency guards",
                "Converting methods into static variables",
                "Skipping bytecode verification",
                "Allocating objects on the CPU registers"
            ],
            "correctIndex": 0,
            "explanation": "Final methods cannot be overridden, allowing the JIT compiler to inline the method body with certainty."
        }
    ]
}

# Assemble all 4 lessons
oop11_data = {
    "extends-and-is-a": lesson_11_1,
    "super-constructor-chaining": lesson_11_2,
    "method-overriding-rules": lesson_11_3,
    "final-keyword-in-oop": lesson_11_4
}

target_file = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop11_lessons.ts"

with open(target_file, "w", encoding="utf-8") as f:
    f.write("import { DetailedLesson } from '../../detailedLessons';\n\n")
    f.write("// ============================================================\n")
    f.write("// MODULE 11: INHERITANCE & HIERARCHY (LESSONS 11.1 - 11.4)\n")
    f.write("// High-Quality, In-Depth Curriculum for Java Core Concepts\n")
    f.write("// ============================================================\n\n")
    f.write("export const oop11Lessons: Record<string, DetailedLesson> = ")
    json.dump(oop11_data, f, indent=2)
    f.write(";\n")

print("Successfully generated:", target_file)
