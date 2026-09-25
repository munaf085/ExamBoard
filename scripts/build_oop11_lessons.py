import json
import os

target_file = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop11_lessons.ts"

# =========================================================================
# LESSON 11.1: The extends Keyword & IS-A Relationship
# =========================================================================
lesson_11_1 = {
    "id": "extends-and-is-a",
    "moduleId": "java-inheritance",
    "moduleTitle": "11. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 11.1",
    "title": "The extends Keyword & IS-A Relationship",
    "subtitle": "Class derivation, code reuse, single inheritance in Java, and Object as the root class",
    "estimatedMinutes": 16,
    "beginnerAnalogy": "Think of a generic vehicle blueprint from an automotive factory. The base blueprint outlines fundamental components that all motor vehicles share: a chassis, an engine, fuel capacity, and a speedometer. When engineers design a SportsCar, they do not start drawing from an empty sheet of paper; instead, they take the existing Vehicle blueprint and extend it with specialized elements like a turbocharger, paddle shifters, and aerodynamic spoilers. Every SportsCar IS-A Vehicle—it can drive, brake, and refuel just like any standard vehicle, but it possesses customized features that ordinary vehicles lack. In software, this blueprint derivation prevents writing the same baseline code over and over.",
    "interviewTakeaways": [
        "Single Class Inheritance: Java strictly supports single class inheritance using the 'extends' keyword. A class can directly inherit from exactly one superclass, avoiding the Diamond Problem of C++.",
        "Universal Object Root: If a class declaration does not contain an 'extends' clause, the Java compiler automatically synthesizes 'extends java.lang.Object'. Every reference type in Java descends from Object.",
        "IS-A vs HAS-A Distinction: Inheritance models an IS-A relationship (a Dog IS-A Mammal). Composition models a HAS-A relationship (a Car HAS-AN Engine). Prefer composition when behavior reuse does not require conceptual specialization.",
        "Subclass Heap Memory Layout: A subclass instance allocated on the Heap is a single contiguous block containing the Object header, all private and non-private fields of the superclass, plus all fields introduced by the subclass.",
        "Member Visibility across Hierarchy: Subclasses inherit public, protected, and package-private (within the same package) members. Private members are NOT inherited directly, though they exist in memory and can be accessed through inherited public/protected methods."
    ],
    "cheatSheet": {
        "summary": "Inheritance allows a subclass (derived class) to acquire fields and methods from a superclass (base class) using the 'extends' keyword, establishing an IS-A taxonomic hierarchy and promoting DRY (Don't Repeat Yourself) design.",
        "syntaxTemplate": "public class SubClass extends SuperClass {\n    // Subclass adds new specialized fields\n    // Subclass inherits accessible superclass fields and methods\n    // Subclass can define specialized methods\n}",
        "rules": [
            {
                "rule": "Single Inheritance of State",
                "explanation": "A Java class can extend at most one superclass. Multiple inheritance with classes ('class A extends B, C') is illegal at compile time."
            },
            {
                "rule": "Implicit Object Root",
                "explanation": "Any class without an explicit 'extends' clause implicitly extends java.lang.Object."
            },
            {
                "rule": "Private Member Storage",
                "explanation": "Private fields of a superclass are allocated within the subclass object memory, but can only be accessed via inherited accessors or mutators."
            },
            {
                "rule": "Protected Access Modifier",
                "explanation": "Protected members are accessible to subclasses in any package, as well as to all classes within the same package."
            },
            {
                "rule": "IS-A Substitutability",
                "explanation": "An instance of a subclass can always be assigned to a reference variable of its superclass type without explicit casting."
            },
            {
                "rule": "Final Classes Cannot Be Extended",
                "explanation": "Marking a class with 'final' explicitly prevents other classes from extending it (e.g., java.lang.String)."
            }
        ],
        "quickComparison": [
            {
                "aspect": "Relationship Type",
                "optionA": "Inheritance: IS-A (Car IS-A Vehicle)",
                "optionB": "Composition: HAS-A (Car HAS-AN Engine)"
            },
            {
                "aspect": "Keywords",
                "optionA": "extends (used once in class declaration header)",
                "optionB": "new / instance variable declaration"
            },
            {
                "aspect": "Coupling Level",
                "optionA": "Tight coupling (changes in parent propagate to all children)",
                "optionB": "Loose coupling (components interact via defined interfaces/methods)"
            },
            {
                "aspect": "Class Limit",
                "optionA": "Strictly single inheritance (one superclass)",
                "optionB": "Unlimited composition (a class can have many fields)"
            },
            {
                "aspect": "Code Reuse",
                "optionA": "Reuses state and implementation automatically",
                "optionB": "Reuses functionality via delegation"
            }
        ]
    },
    "coreExplanation": [
        "Inheritance is a fundamental pillar of Object-Oriented Programming where a derived class (subclass) inherits state (fields) and behavior (methods) from a base class (superclass). In Java, this is declared using the 'extends' keyword.",
        "Java enforces strict single inheritance for classes: a class can directly extend at most one parent class. This architectural decision intentionally avoids the ambiguities of multiple inheritance (such as the Diamond Problem, where a class inherits conflicting implementations of the same member from two parent paths).",
        "The universal root of all classes in Java is java.lang.Object. If a class definition omits the 'extends' clause, javac automatically appends 'extends Object'. Consequently, every Java class inherits foundational methods such as toString(), equals(), hashCode(), and getClass().",
        "The IS-A relationship defines semantic specialization: if class Dog extends Animal, a Dog IS-AN Animal. Wherever the program expects an Animal reference, a Dog instance can be supplied seamlessly.",
        "Subclasses inherit all public and protected fields and methods, as well as package-private members if both classes reside in the same package. Private fields of the superclass are NOT inherited in terms of direct access; however, they are still allocated in the subclass object on the heap and can be read or mutated via inherited getters and setters.",
        "In the JVM Heap memory layout, creating an instance of a subclass allocates a single object containing the standard object header (Mark Word + Klass Word), followed by all superclass fields, followed by all subclass fields. There are no separate heap objects created for the superclass.",
        "Inheritance should be chosen only when a genuine taxonomic IS-A relationship exists. When classes merely want to share utility functionality or encapsulate internal parts, Composition (HAS-A) is preferred to avoid fragile base class coupling."
    ],
    "diagram": """======================= INHERITANCE HIERARCHY & HEAP MEMORY =======================

       [ java.lang.Object ]               <-- Root of all Java classes
                ^
                | extends
          [ Vehicle ]                     <-- Superclass (base state & behavior)
          - brand: String
          - speed: int
          + displaySpecs(): void
                ^
                | extends
            [ Car ]                       <-- Subclass (specialized state & behavior)
          - doors: int
          + displayCarDetails(): void

  -----------------------------------------------------------------------------
  JVM HEAP MEMORY LAYOUT FOR: Car myCar = new Car();
  +---------------------------------------------------------------------------+
  | Object Header: Mark Word (hash, GC age, lock) + Klass Pointer (Car.class) |
  +---------------------------------------------------------------------------+
  | Superclass Fields (Vehicle):                                              |
  |   - brand = "Toyota"                                                      |
  |   - speed = 120                                                           |
  +---------------------------------------------------------------------------+
  | Subclass Fields (Car):                                                    |
  |   - doors = 4                                                             |
  +---------------------------------------------------------------------------+
  * Notice: One unified object on the Heap holds both parent and child fields!""",
    "codeSnippet": {
        "title": "Basic Inheritance Hierarchy with Vehicle and Car",
        "code": """class Vehicle {
    protected String brand = "Generic Vehicle";
    protected int speed = 0;

    public void accelerate(int increment) {
        this.speed += increment;
        System.out.println(brand + " accelerated to " + speed + " km/h");
    }
}

class Car extends Vehicle {
    private int doors = 4;

    public void openTrunk() {
        System.out.println("Opening trunk of " + brand + " with " + doors + " doors.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Honda Civic";
        myCar.accelerate(60);
        myCar.openTrunk();
    }
}""",
        "lineByLineExplanation": [
            {"line": "class Car extends Vehicle", "explanation": "Declares Car as a subclass inheriting all non-private members of Vehicle."},
            {"line": "protected String brand = \"Generic Vehicle\";", "explanation": "Protected field accessible directly by any subclass, regardless of package."},
            {"line": "myCar.brand = \"Honda Civic\";", "explanation": "The Car instance modifies its inherited brand field directly."},
            {"line": "myCar.accelerate(60);", "explanation": "Invokes the inherited accelerate method defined in Vehicle."},
            {"line": "myCar.openTrunk();", "explanation": "Invokes the specialized subclass method unique to Car."}
        ],
        "output": "Honda Civic accelerated to 60 km/h\nOpening trunk of Honda Civic with 4 doors."
    },
    "codeExamples": [
        {
            "title": "Multi-Level Hierarchy with Device, Computer, and Laptop",
            "description": "Demonstrates transitive inheritance where state and methods accumulate across multiple hierarchy tiers.",
            "code": """class Device {
    protected String manufacturer = "Unknown";

    public void powerOn() {
        System.out.println(manufacturer + " device powered ON.");
    }
}

class Computer extends Device {
    protected int ramGigabytes = 16;

    public void runDiagnostics() {
        System.out.println("RAM check: " + ramGigabytes + " GB operational.");
    }
}

class Laptop extends Computer {
    private double batteryPercent = 95.5;

    public void showStatus() {
        System.out.println("Manufacturer: " + manufacturer);
        System.out.println("Memory: " + ramGigabytes + " GB");
        System.out.println("Battery: " + batteryPercent + "%");
    }
}

public class MultiLevelDemo {
    public static void main(String[] args) {
        Laptop lap = new Laptop();
        lap.manufacturer = "Lenovo";
        lap.ramGigabytes = 32;

        lap.powerOn();
        lap.runDiagnostics();
        lap.showStatus();
    }
}""",
            "output": "Lenovo device powered ON.\nRAM check: 32 GB operational.\nManufacturer: Lenovo\nMemory: 32 GB\nBattery: 95.5%"
        },
        {
            "title": "IS-A vs HAS-A (Inheritance vs Composition)",
            "description": "Contrasting inheritance (Car IS-A Vehicle) with composition (Car HAS-AN Engine) in real-world domain modeling.",
            "code": """class Engine {
    private int horsepower;

    public Engine(int hp) {
        this.horsepower = hp;
    }

    public void start() {
        System.out.println("Engine cranking (" + horsepower + " HP)");
    }
}

class Machine {
    protected String serialNumber;

    public void setSerial(String sn) {
        this.serialNumber = sn;
    }
}

// Car IS-A Machine, and Car HAS-AN Engine
class Car extends Machine {
    private Engine engine; // Composition

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void drive() {
        System.out.println("Machine SN: " + serialNumber);
        engine.start();
        System.out.println("Car is moving smoothly.");
    }
}

public class IsaHasaDemo {
    public static void main(String[] args) {
        Engine v8 = new Engine(450);
        Car sportsCar = new Car(v8);
        sportsCar.setSerial("SN-998822");
        sportsCar.drive();
    }
}""",
            "output": "Machine SN: SN-998822\nEngine cranking (450 HP)\nCar is moving smoothly."
        },
        {
            "title": "Encapsulating Private Superclass Fields with Public Accessors",
            "description": "Showing how private state in a parent class is safely accessed and modified by child classes through getters and setters.",
            "code": """class Employee {
    private double salary; // Not directly accessible in subclasses

    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        }
    }

    public double getSalary() {
        return this.salary;
    }
}

class Manager extends Employee {
    private double bonus = 5000.0;

    public double getTotalPay() {
        // Must use getSalary() because salary is private to Employee
        return getSalary() + bonus;
    }
}

public class AccessorDemo {
    public static void main(String[] args) {
        Manager mgr = new Manager();
        mgr.setSalary(75000.0);
        System.out.println("Total Manager Pay: $" + mgr.getTotalPay());
    }
}""",
            "output": "Total Manager Pay: $80000.0"
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Attempting multiple class inheritance ('class Dog extends Animal, Pet')",
            "whyItHappens": "Developers coming from C++ or Python expect to inherit state and behavior from multiple classes simultaneously.",
            "howToFix": "Java strictly prohibits multiple class inheritance. Inherit from a single superclass and use composition (HAS-A) to combine other capabilities."
        },
        {
            "mistake": "Assuming private superclass fields do not exist in the subclass instance",
            "whyItHappens": "Since the subclass cannot write `this.privateField`, developers assume the field was not instantiated.",
            "howToFix": "Recognize that private fields ARE allocated in heap memory inside the subclass object. Provide protected or public getters/setters in the superclass to allow controlled access."
        },
        {
            "mistake": "Overusing inheritance when composition is more appropriate",
            "whyItHappens": "New developers often reach for 'extends' whenever two classes share any code, creating fragile hierarchies (e.g. Stack extending Vector).",
            "howToFix": "Apply the strict IS-A rule: only extend if every instance of the subclass can completely substitute for the superclass in all contexts."
        },
        {
            "mistake": "Attempting to inherit from a final class (e.g., 'class MyString extends String')",
            "whyItHappens": "Developers try to add helper methods to JDK core classes by extending them.",
            "howToFix": "Classes marked 'final' cannot be extended. Wrap the final object inside your class (composition) or create static utility methods instead."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: State Inheritance in Multi-Level Hierarchy",
            "problemStatement": "What is printed when main() executes?",
            "code": """class A {
    int x = 10;
}
class B extends A {
    int y = 20;
}
class C extends B {
    int z = 30;
    void printSum() {
        System.out.println(x + y + z);
    }
}
public class Test {
    public static void main(String[] args) {
        C obj = new C();
        obj.x = 5;
        obj.printSum();
    }
}""",
            "options": ["60", "55", "30", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "C inherits field x from A and y from B. obj.x modifies the inherited field on this instance.",
            "solution": "55",
            "explanation": "C inherits x (initially 10) from A and y (20) from B. obj.x = 5 mutates the inherited field x to 5. When printSum() runs, 5 + 20 + 30 = 55."
        },
        {
            "title": "Puzzle 2: Field Shadowing Across Hierarchy",
            "problemStatement": "What does the following program output?",
            "code": """class Parent {
    String tag = "ParentTag";
}
class Child extends Parent {
    String tag = "ChildTag";
    void display() {
        System.out.println(tag + " | " + super.tag);
    }
}
public class Test2 {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();
    }
}""",
            "options": [
                "ChildTag | ChildTag",
                "ChildTag | ParentTag",
                "ParentTag | ChildTag",
                "Compilation Error: duplicate field tag"
            ],
            "correctOptionIndex": 1,
            "hint": "Declaring a field with the same name in a subclass shadows (hides) the parent field. super.tag explicitly reaches the superclass field.",
            "solution": "ChildTag | ParentTag",
            "explanation": "Child declares its own field tag, shadowing Parent.tag. Within Child, 'tag' refers to Child's field ('ChildTag'), while 'super.tag' reaches Parent's field ('ParentTag')."
        },
        {
            "title": "Puzzle 3: Protected Member Access Through Inheritance",
            "problemStatement": "Does this code compile, and what does it display?",
            "code": """class Base {
    protected int count = 42;
}
class Derived extends Base {
    void increment() {
        count += 8;
        System.out.println("Count: " + count);
    }
}
public class Test3 {
    public static void main(String[] args) {
        Derived d = new Derived();
        d.increment();
    }
}""",
            "options": [
                "Count: 50",
                "Count: 42",
                "Compilation Error: count has protected access",
                "Count: 8"
            ],
            "correctOptionIndex": 0,
            "hint": "Protected members are inherited and directly accessible within derived subclasses.",
            "solution": "Count: 50",
            "explanation": "The count field has protected access in Base. Subclass Derived inherits it and can directly read and mutate it. 42 + 8 = 50."
        },
        {
            "title": "Puzzle 4: Implicit java.lang.Object Methods",
            "problemStatement": "What is the result of calling getClass().getSimpleName() on a newly instantiated custom class?",
            "code": """class Widget {}

public class Test4 {
    public static void main(String[] args) {
        Widget w = new Widget();
        System.out.println(w.getClass().getSimpleName());
    }
}""",
            "options": [
                "Widget",
                "java.lang.Object",
                "Object",
                "Compilation Error: getClass() is undefined for Widget"
            ],
            "correctOptionIndex": 0,
            "hint": "Because Widget does not have an explicit extends clause, it extends java.lang.Object and inherits getClass().",
            "solution": "Widget",
            "explanation": "Widget implicitly extends java.lang.Object. It inherits getClass(), which returns the runtime Class object representing Widget. getSimpleName() outputs 'Widget'."
        },
        {
            "title": "Puzzle 5: IS-A Reference Assignment",
            "problemStatement": "What is printed by this code?",
            "code": """class Fruit {
    void show() { System.out.print("Fruit "); }
}
class Apple extends Fruit {
    void show() { System.out.print("Apple "); }
}
public class Test5 {
    public static void main(String[] args) {
        Fruit f = new Apple();
        Apple a = new Apple();
        f.show();
        a.show();
    }
}""",
            "options": [
                "Fruit Apple ",
                "Apple Apple ",
                "Apple Fruit ",
                "Fruit Fruit "
            ],
            "correctOptionIndex": 1,
            "hint": "Both f and a reference instances of Apple in heap memory. In Java, instance method calls are resolved at runtime based on the actual object.",
            "solution": "Apple Apple ",
            "explanation": "Because Apple overrides show(), calling f.show() invokes Apple's method due to dynamic dispatch. Calling a.show() also invokes Apple's method. Output is 'Apple Apple '."
        },
        {
            "title": "Puzzle 6: Private Member Non-Inheritance",
            "problemStatement": "What occurs when attempting to compile this snippet?",
            "code": """class SecretKeeper {
    private String secret = "Classified";
}
class Leaker extends SecretKeeper {
    void leak() {
        System.out.println(secret);
    }
}
public class Test6 {
    public static void main(String[] args) {
        new Leaker().leak();
    }
}""",
            "options": [
                "Prints: Classified",
                "Prints: null",
                "Compilation Error: secret has private access in SecretKeeper",
                "Runtime Exception: IllegalAccessException"
            ],
            "correctOptionIndex": 2,
            "hint": "Private members are private to the declaring class and cannot be referenced directly by identifier in subclasses.",
            "solution": "Compilation Error: secret has private access in SecretKeeper",
            "explanation": "Even though SecretKeeper is the superclass, its private fields are inaccessible to subclasses directly by name. Compilation fails."
        },
        {
            "title": "Puzzle 7: Multiple Level Field Accumulation",
            "problemStatement": "What does this code output?",
            "code": """class Alpha {
    int val = 1;
}
class Beta extends Alpha {
    int val = 2;
}
class Gamma extends Beta {
    void show() {
        System.out.println(val + " " + super.val);
    }
}
public class Test7 {
    public static void main(String[] args) {
        new Gamma().show();
    }
}""",
            "options": [
                "2 1",
                "2 2",
                "1 2",
                "Compilation Error"
            ],
            "correctOptionIndex": 1,
            "hint": "Gamma does not declare 'val', so it inherits 'val' from Beta. What does super.val refer to from Gamma?",
            "solution": "2 2",
            "explanation": "Gamma does not declare val, so 'val' resolves to the inherited field from immediate parent Beta (2). 'super.val' also refers directly to Beta's val (2). To access Alpha's val from Gamma is not possible via super.super."
        },
        {
            "title": "Puzzle 8: Static Member Inheritance",
            "problemStatement": "What will be printed when main() runs?",
            "code": """class CounterParent {
    static int count = 10;
}
class CounterChild extends CounterParent {}

public class Test8 {
    public static void main(String[] args) {
        CounterChild.count += 5;
        System.out.println(CounterParent.count + " " + CounterChild.count);
    }
}""",
            "options": [
                "10 15",
                "15 15",
                "15 10",
                "Compilation Error: static fields cannot be inherited"
            ],
            "correctOptionIndex": 1,
            "hint": "Static fields are inherited, but there is only ONE static variable shared across the class hierarchy.",
            "solution": "15 15",
            "explanation": "Static members belong to the class where they are declared. CounterChild inherits access to CounterParent.count. Modifying CounterChild.count modifies the single static field in CounterParent. Both print 15."
        }
    ],
    "interviewQuestions": [
        {
            "question": "Why does Java not support multiple class inheritance ('class C extends A, B')?",
            "answer": "Java intentionally omitted multiple class inheritance to avoid the Diamond Problem (or Deadly Diamond of Death) and ensure architectural simplicity. If class C could extend both A and B, and both A and B declared the same method with different implementations or declared conflicting instance variables, the compiler and runtime would face ambiguity on which version C should inherit. Furthermore, multiple inheritance significantly complicates the JVM's object memory layout and vtable dispatch. Java solves the need for multiple behavioral contracts using interfaces, while keeping class inheritance strictly single-parent.",
            "followUp": "How does Java achieve polymorphism across different types without multiple class inheritance?",
            "followUpAnswer": "Java allows a class to implement multiple interfaces (starting in Module 13). Interfaces define behavioral contracts without inheriting mutable instance state, completely avoiding the state-based diamond conflict.",
            "keyPhrases": ["Diamond problem", "Deadly Diamond of Death", "Implementation ambiguity", "Single parent hierarchy", "Heap memory simplicity"],
            "commonMistakeAnswer": "Saying Java doesn't support multiple inheritance because of memory limits or performance reasons."
        },
        {
            "question": "What is the difference between an IS-A relationship and a HAS-A relationship?",
            "answer": "An IS-A relationship is established through class inheritance using 'extends'. It indicates that the derived class is a specialized subtype of the base class (e.g., a Dog IS-AN Animal). A HAS-A relationship is established through composition or aggregation, where a class contains an instance variable referring to another object (e.g., a Car HAS-AN Engine). Architectural best practices recommend favoring composition over inheritance unless true behavioral substitutability is needed, because inheritance tightly couples the child to the parent's implementation.",
            "followUp": "When would you choose inheritance over composition?",
            "followUpAnswer": "Choose inheritance only when the subclass satisfies the Liskov Substitution Principle—meaning any code expecting the superclass can accept the subclass without breaking—and when you genuinely need polymorphic method dispatch across the entire hierarchy.",
            "keyPhrases": ["IS-A vs HAS-A", "Specialization vs Containment", "Liskov Substitution Principle", "Composition over inheritance", "Coupling"],
            "commonMistakeAnswer": "Thinking that anytime two classes share code, you should create an inheritance relationship."
        },
        {
            "question": "What is the root class of all classes in Java, and why is this significant?",
            "answer": "java.lang.Object is the ultimate ancestor and root of the entire Java class hierarchy. Every class in Java, whether built-in or user-defined, directly or indirectly extends Object. This guarantees that all reference types in Java share a common set of foundational methods, including equals(), hashCode(), toString(), getClass(), clone(), finalize(), and concurrency synchronization primitives like wait(), notify(), and notifyAll(). It also allows 'Object' to serve as a universal reference type capable of pointing to any heap-allocated object.",
            "followUp": "Can an array be assigned to an Object reference in Java?",
            "followUpAnswer": "Yes, all arrays (both primitive arrays like int[] and object arrays like String[]) are first-class objects in Java and directly extend java.lang.Object.",
            "keyPhrases": ["java.lang.Object", "Universal ancestor", "Common contract", "toString / equals / hashCode", "Universal reference"],
            "commonMistakeAnswer": "Assuming primitive types extend Object or that interfaces extend Object."
        },
        {
            "question": "Does a subclass inherit private members of its superclass?",
            "answer": "Technically, private members are NOT inherited in terms of direct access or visibility—a subclass cannot access them by name using 'this.fieldName'. However, from a JVM memory perspective, private fields of the superclass ARE allocated inside the single contiguous memory block of the subclass instance on the Heap. The subclass possesses the private state, but can only inspect or modify it through inherited non-private (public or protected) methods such as getters and setters.",
            "followUp": "What happens if a subclass declares a field with the exact same name and type as a private field in the superclass?",
            "followUpAnswer": "This is completely legal. It does not override the field; it creates a distinct new field in the subclass. The subclass instance will simply hold both fields in memory independently.",
            "keyPhrases": ["Non-inherited visibility", "Heap allocation inclusion", "Encapsulation preservation", "Accessor methods", "Field independence"],
            "commonMistakeAnswer": "Believing that private fields are not allocated in the subclass object on the heap at all."
        },
        {
            "question": "How does the 'protected' access modifier behave in Java with respect to inheritance?",
            "answer": "The 'protected' modifier allows access from: 1) any class in the same package (package-private accessibility), and 2) any subclass of the declaring class, even if that subclass resides in a different package. Inside a subclass located in another package, protected members can only be accessed through inheritance or on references of that subclass type (or its descendants), not on an arbitrary superclass reference.",
            "followUp": "Is protected more or less restrictive than package-private (default) access?",
            "followUpAnswer": "Protected is strictly LESS restrictive than default access because it grants default package access PLUS cross-package access to all derived subclasses.",
            "keyPhrases": ["Package access plus subclasses", "Cross-package inheritance", "Subclass reference constraint", "Access ladder"],
            "commonMistakeAnswer": "Thinking protected only allows access to subclasses and hides the member from classes in the same package."
        },
        {
            "question": "What is the memory layout of a subclass object in the JVM Heap?",
            "answer": "In the HotSpot JVM, an object instance is a single, continuous block of memory. It starts with a 12-byte or 16-byte Object Header (consisting of the Mark Word for locking/GC metadata and the Klass Word referencing the class metadata). Immediately following the header are the instance fields declared in the superclass (padded for 8-byte alignment), followed directly by the instance fields declared in the subclass. There are no nested or separate heap allocations; parent and child state live contiguously in the same allocation.",
            "followUp": "What happens to memory when a subclass shadows a superclass field with the same name?",
            "followUpAnswer": "Both fields exist sequentially in the object's heap layout. Memory is allocated for the parent's field and also for the child's field.",
            "keyPhrases": ["Contiguous heap block", "Object Header", "Mark Word and Klass Word", "Superclass fields first", "Field alignment and padding"],
            "commonMistakeAnswer": "Thinking the JVM instantiates two distinct objects on the heap linked by a pointer."
        },
        {
            "question": "Can a class extend itself or participate in a cyclic inheritance chain?",
            "answer": "No. Cyclic inheritance (e.g., 'class A extends B' and 'class B extends A', or 'class A extends A') is strictly illegal in Java and causes a compile-time error: 'cyclic inheritance involving A'. The inheritance relationship forms a Directed Acyclic Graph (DAG) rooted at java.lang.Object.",
            "followUp": "Why is cyclic inheritance mathematically and mechanically impossible in OOP?",
            "followUpAnswer": "Because constructor chaining would produce an infinite initialization loop, and heap memory allocation would require infinite recursion to compute the total instance size.",
            "keyPhrases": ["Cyclic inheritance error", "Directed Acyclic Graph", "Infinite constructor loop", "Definite object size"],
            "commonMistakeAnswer": "Thinking cyclic inheritance throws a runtime StackOverflowError instead of failing at compile time."
        },
        {
            "question": "What is field shadowing and how does it differ from method overriding?",
            "answer": "Field shadowing occurs when a subclass declares an instance variable with the exact same name as a variable in its superclass. Unlike methods, fields in Java are NEVER polymorphic. Which field is accessed is determined at compile time based strictly on the declared reference type, not the runtime object type. In contrast, method overriding is resolved dynamically at runtime via virtual method dispatch based on the object in the heap.",
            "followUp": "How can a subclass access a shadowed field in its parent?",
            "followUpAnswer": "By using the 'super' keyword: 'super.fieldName', or by casting the reference to the superclass type: '((Parent) this).fieldName'.",
            "keyPhrases": ["Static binding for fields", "Reference type resolution", "No polymorphism for variables", "super.fieldName access"],
            "commonMistakeAnswer": "Confusing field shadowing with method overriding and expecting fields to be dispatched dynamically."
        },
        {
            "question": "Can static methods or static fields be inherited by a subclass?",
            "answer": "Yes. Accessible static fields and methods of a superclass are inherited by subclasses and can be invoked using the subclass name (e.g., SubClass.staticMethod()). However, static methods CANNOT be overridden. If a subclass declares a static method with the same signature, it 'hides' the superclass method rather than overriding it. Calls to hidden static methods are resolved at compile time based on the reference type.",
            "followUp": "Is it considered good practice to call static methods via subclass names or object references?",
            "followUpAnswer": "No. Best practice is always to invoke static methods directly using the class name where the static method was actually declared to prevent misleading readers about where the code lives.",
            "keyPhrases": ["Static inheritance", "Method hiding vs overriding", "Compile-time binding", "Class-level association"],
            "commonMistakeAnswer": "Claiming that static members are not inherited at all in Java."
        },
        {
            "question": "What is the 'fragile base class' problem in inheritance hierarchies?",
            "answer": "The fragile base class problem occurs when seemingly safe modifications to a superclass inadvertently break the behavior, state, or invariants of derived subclasses. Because subclasses depend heavily on the internal implementation details and call sequences of the base class, modifying a base method (such as making it call another internal method) can introduce infinite recursion, broken state, or unexpected side effects in subclasses that overrode those methods.",
            "followUp": "How do modern software designers mitigate the fragile base class problem?",
            "followUpAnswer": "By favoring composition over inheritance, designing classes specifically for extension or explicitly forbidding it with 'final', and keeping base class interfaces minimal.",
            "keyPhrases": ["Fragile base class", "Tight coupling", "Unintended subclass breakage", "Favor composition", "Design for extension or forbid it"],
            "commonMistakeAnswer": "Assuming inheritance provides complete safety and encapsulation across version changes."
        }
    ],
    "miniQuiz": [
        {
            "question": "Which keyword is used in Java by a class to inherit from another class?",
            "options": ["implements", "extends", "inherits", "subclasses"],
            "correctIndex": 1,
            "explanation": "The 'extends' keyword is used in class declarations to specify the superclass to derive from."
        },
        {
            "question": "How many direct superclasses can a single Java class extend?",
            "options": ["Exactly 1", "Up to 2", "As many as desired", "0 if it has no methods"],
            "correctIndex": 0,
            "explanation": "Java enforces single class inheritance: a class can extend at most one direct superclass."
        },
        {
            "question": "What is the ultimate superclass of all classes in Java?",
            "options": ["java.lang.Class", "java.lang.Object", "java.lang.System", "java.lang.Root"],
            "correctIndex": 1,
            "explanation": "java.lang.Object is the root of the Java class hierarchy."
        },
        {
            "question": "Which members of a superclass are inherited by a subclass located in a different package?",
            "options": [
                "public and protected members only",
                "public, protected, and default (package-private) members",
                "All members including private members",
                "public members only"
            ],
            "correctIndex": 0,
            "explanation": "Across packages, only public and protected members are inherited. Default (package-private) members are accessible only within the same package."
        },
        {
            "question": "What occurs if you declare a class as 'final'?",
            "options": [
                "It cannot contain any methods",
                "It cannot be instantiated",
                "It cannot be extended by any other class",
                "All its fields become static"
            ],
            "correctIndex": 2,
            "explanation": "A 'final' class cannot be subclassed; attempting to extend it triggers a compile-time error."
        },
        {
            "question": "How are private fields of a superclass stored in memory when a subclass is instantiated?",
            "options": [
                "They are allocated in a separate object on the heap",
                "They are not allocated at all",
                "They are allocated inside the single contiguous heap block of the subclass object",
                "They are stored in the stack frame of the constructor"
            ],
            "correctIndex": 2,
            "explanation": "The subclass object on the heap contains all fields from the superclass (including private ones) plus all subclass fields in one contiguous block."
        },
        {
            "question": "Which relationship best describes class inheritance?",
            "options": ["HAS-A", "IS-A", "USES-A", "IMPLEMENTS-A"],
            "correctIndex": 1,
            "explanation": "Inheritance models the IS-A relationship, indicating that the subclass is a specialized kind of the superclass."
        },
        {
            "question": "What happens if a subclass declares an instance variable with the same name as a superclass instance variable?",
            "options": [
                "The subclass variable overrides the superclass variable dynamically",
                "A compile-time error occurs for duplicate variable declaration",
                "The subclass variable shadows (hides) the superclass variable",
                "The superclass variable is deleted from memory"
            ],
            "correctIndex": 2,
            "explanation": "In Java, instance variables are shadowed (hidden), not overridden. Which variable is accessed depends on the reference type at compile time."
        },
        {
            "question": "Can a class extend itself directly (e.g. 'class Node extends Node')?",
            "options": [
                "Yes, this is how recursive data structures are built",
                "No, it results in a compile-time error (cyclic inheritance)",
                "Yes, but it can only have static methods",
                "No, it throws a runtime StackOverflowError"
            ],
            "correctIndex": 1,
            "explanation": "Cyclic inheritance is illegal and rejected at compile time by the Java compiler."
        },
        {
            "question": "If class B extends class A, which of the following assignments is valid without an explicit cast?",
            "options": [
                "B obj = new A();",
                "A obj = new B();",
                "B obj = (A) new B();",
                "None of the above"
            ],
            "correctIndex": 1,
            "explanation": "Assigning a subclass instance to a superclass reference ('A obj = new B();') is an upcast, which is completely implicit and type-safe."
        }
    ]
}

print("Lesson 11.1 prepared.")
