import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 13: ABSTRACTION & INTERFACES (LESSONS 13.1 - 13.4)
// High-Quality, In-Depth Curriculum for Java Core Concepts
// Constraints: Zero forward topics (NO collections, NO lambdas/streams)
// ============================================================

export const oop13Lessons: Record<string, DetailedLesson> = {
  'abstract-classes-and-methods': {
    id: 'abstract-classes-and-methods',
    moduleId: 'java-abstraction',
    moduleTitle: '13. Abstraction & Interfaces',
    lessonNumber: 'Lesson 13.1',
    title: 'Abstract Classes & Abstract Methods',
    subtitle: 'Incomplete blueprints, mandatory sub-class overrides, partial implementation, and constructor execution in abstract hierarchies',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Think of an abstract class like a master architectural blueprint for a motor vehicle. The blueprint specifies that every motor vehicle must have a Vehicle Identification Number (VIN), a fuel tank with a current fuel level, and an ignition mechanism. However, the blueprint leaves the exact method of propulsion—`accelerate()`—completely blank because a gasoline sedan, an electric semi-truck, and a diesel train accelerate through fundamentally different mechanical processes. You cannot walk into a dealership and buy a generic "motor vehicle" because it is an incomplete idea (you cannot instantiate an abstract class). Instead, you buy a concrete Tesla Model 3 or a Ford F-150 that fills in every blank blueprint requirement while inheriting the shared chassis, fuel gauge, and safety registration logic.',
    coreExplanation: [
      'An abstract class is declared with the `abstract` keyword. It serves as an incomplete superclass blueprint that cannot be directly instantiated using the `new` operator.',
      'An abstract method possesses a signature, return type, and parameter list followed by a semicolon, but has no implementation body `{}`. It establishes a mandatory contract that any concrete subclass must override.',
      'A class that contains even a single abstract method must itself be declared abstract. However, an abstract class is not required to have any abstract methods; it can consist entirely of concrete methods and state.',
      'Unlike pure interfaces, abstract classes can declare instance state (instance variables with any access modifier: private, protected, package-private, public) and concrete helper methods.',
      'Abstract classes possess constructors. Even though you cannot instantiate an abstract class directly, its constructor is invoked via constructor chaining (`super()`) when a concrete subclass instance is created.',
      'A subclass extending an abstract class must either provide concrete implementation bodies for all inherited abstract methods or be explicitly declared `abstract` itself.',
      'Abstract methods cannot be declared `private` (subclasses must be able to see and override them) or `final` (final explicitly prohibits overriding, creating a direct logical contradiction).',
      'Abstract classes provide partial abstraction: common code and shared mutable state live in the abstract superclass, while polymorphic, specialized behaviors are deferred to concrete subclasses.'
    ],
    diagram: `===================== ABSTRACT CLASS BLUEPRINT HIERARCHY =====================

           +---------------------------------------------+
           |           abstract class Vehicle            |
           +---------------------------------------------+
           | - vin: String                               |  <-- Instance State
           | - speed: double                             |
           +---------------------------------------------+
           | + Vehicle(vin: String)       [Constructor]  |  <-- super() chaining
           | + getSpeed(): double         [Concrete]     |  <-- Shared behavior
           | + abstract void accelerate() [Abstract]     |  <-- NO BODY! Mandates override
           | + abstract void brake()      [Abstract]     |
           +---------------------------------------------+
                                 ▲
                                / \\  extends (IS-A)
                               /   \\
              +---------------+     +-----------------------+
              |                                             |
+-----------------------------+              +-----------------------------+
|        class Car            |              |       class ElectricTruck   |
+-----------------------------+              +-----------------------------+
| - trunkCapacity: int        |              | - batteryLevel: int         |
+-----------------------------+              +-----------------------------+
| + Car(vin: String, cap: int)|              | + ElectricTruck(vin, batt)  |
| + accelerate()  {...}       |  <-- Body!   | + accelerate()  {...}       |
| + brake()       {...}       |  <-- Body!   | + brake()       {...}       |
+-----------------------------+              +-----------------------------+

    Cannot do: Vehicle v = new Vehicle("VIN123"); // COMPILE ERROR!
    Can do:    Vehicle v = new Car("VIN123", 450); // Upcasting / Polymorphism`,
    codeSnippet: {
      title: 'Abstract Shape Blueprint with Concrete Subclasses',
      code: `abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    // Abstract methods: Subclasses MUST implement these formulas
    public abstract double calculateArea();
    public abstract double calculatePerimeter();

    public void displayInfo() {
        System.out.printf("Shape [%s] -> Area: %.2f, Perimeter: %.2f%n",
            color, calculateArea(), calculatePerimeter());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * (width + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[] {
            new Circle("Crimson", 5.0),
            new Rectangle("Azure", 4.0, 6.0)
        };

        for (int i = 0; i < shapes.length; i++) {
            shapes[i].displayInfo();
        }
    }
}`,
      lineByLineExplanation: [
        {
          line: 'abstract class Shape',
          explanation: 'Declares an incomplete class that defines shared fields and common methods, but cannot be instantiated directly.'
        },
        {
          line: 'public abstract double calculateArea();',
          explanation: 'Declares an abstract method with no curly braces and a trailing semicolon, requiring every concrete subclass to supply the calculation.'
        },
        {
          line: 'public Shape(String color) { this.color = color; }',
          explanation: 'Constructor inside an abstract class; executed via super(color) in subclass constructors to properly initialize private superclass state.'
        },
        {
          line: 'class Circle extends Shape',
          explanation: 'Concrete subclass that extends Shape and must implement calculateArea() and calculatePerimeter() or else fail compilation.'
        },
        {
          line: 'shapes[i].displayInfo();',
          explanation: 'Polymorphic dispatch: displayInfo() calls calculateArea(), which dynamically invokes Circle\'s or Rectangle\'s overridden method.'
        }
      ],
      output: `Shape [Crimson] -> Area: 78.54, Perimeter: 31.42
Shape [Azure] -> Area: 24.00, Perimeter: 20.00`
    },
    codeExamples: [
      {
        title: 'Template Method Pattern via Abstract Class',
        description: 'Demonstrates how an abstract class defines an invariant workflow skeleton while leaving specific steps abstract.',
        code: `abstract class DataMiner {
    // Template method: defines invariant step-by-step algorithm
    public final void mineData(String path) {
        openFile(path);
        extractRawData();
        parseData();
        closeFile();
        System.out.println("Mining complete.\\n");
    }

    private void openFile(String path) {
        System.out.println("Opening data stream for: " + path);
    }

    private void closeFile() {
        System.out.println("Closing data stream.");
    }

    // Specialized steps for subclasses
    protected abstract void extractRawData();
    protected abstract void parseData();
}

class PdfMiner extends DataMiner {
    @Override
    protected void extractRawData() {
        System.out.println("Reading PDF binary chunks and streams...");
    }

    @Override
    protected void parseData() {
        System.out.println("Parsing PDF text elements and font tables.");
    }
}

class CsvMiner extends DataMiner {
    @Override
    protected void extractRawData() {
        System.out.println("Buffering CSV text lines...");
    }

    @Override
    protected void parseData() {
        System.out.println("Splitting comma delimiters into record cells.");
    }
}

public class MiningApp {
    public static void main(String[] args) {
        DataMiner miner1 = new PdfMiner();
        miner1.mineData("invoice.pdf");

        DataMiner miner2 = new CsvMiner();
        miner2.mineData("telemetry.csv");
    }
}`,
        output: `Opening data stream for: invoice.pdf
Reading PDF binary chunks and streams...
Parsing PDF text elements and font tables.
Closing data stream.
Mining complete.

Opening data stream for: telemetry.csv
Buffering CSV text lines...
Splitting comma delimiters into record cells.
Closing data stream.
Mining complete.`
      },
      {
        title: 'Tiered Employee Payroll Hierarchy with State & Constructors',
        description: 'Shows constructor chaining in multi-level abstract inheritance and polymorphic wage calculation.',
        code: `abstract class Employee {
    private String id;
    private String name;

    public Employee(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public abstract double calculateMonthlyPay();
}

class SalariedEmployee extends Employee {
    private double annualSalary;

    public SalariedEmployee(String id, String name, double annualSalary) {
        super(id, name);
        this.annualSalary = annualSalary;
    }

    @Override
    public double calculateMonthlyPay() {
        return annualSalary / 12.0;
    }
}

class CommissionEmployee extends Employee {
    private double baseMonthlySalary;
    private double grossSales;
    private double commissionRate;

    public CommissionEmployee(String id, String name, double baseMonthlySalary,
                              double grossSales, double commissionRate) {
        super(id, name);
        this.baseMonthlySalary = baseMonthlySalary;
        this.grossSales = grossSales;
        this.commissionRate = commissionRate;
    }

    @Override
    public double calculateMonthlyPay() {
        return baseMonthlySalary + (grossSales * commissionRate);
    }
}

public class PayrollApp {
    public static void main(String[] args) {
        Employee[] staff = new Employee[] {
            new SalariedEmployee("E101", "Amara", 84000.0),
            new CommissionEmployee("E102", "Devon", 2500.0, 50000.0, 0.08)
        };

        for (int i = 0; i < staff.length; i++) {
            System.out.printf("%s (%s) Monthly Pay: $%.2f%n",
                staff[i].getName(), staff[i].getId(), staff[i].calculateMonthlyPay());
        }
    }
}`,
        output: `Amara (E101) Monthly Pay: $7000.00
Devon (E102) Monthly Pay: $6500.00`
      }
    ],
    cheatSheet: {
      summary: 'Abstract classes represent incomplete conceptual types that capture shared state, constructors, and partial behavior while forcing subclasses to implement abstract methods.',
      syntaxTemplate: `public abstract class BaseClass {
    // 1. Instance variables (state)
    private String identifier;

    // 2. Constructor for subclass chaining
    public BaseClass(String identifier) {
        this.identifier = identifier;
    }

    // 3. Concrete common method
    public String getIdentifier() { return identifier; }

    // 4. Abstract method (no body, must be overridden)
    public abstract void performAction();
}`,
      rules: [
        {
          rule: 'No Direct Instantiation',
          explanation: 'Executing new AbstractClass() triggers a compile-time error: "AbstractClass is abstract; cannot be instantiated".'
        },
        {
          rule: 'Mandatory Subclass Override',
          explanation: 'A concrete subclass must override every inherited abstract method, or the subclass itself must be marked abstract.'
        },
        {
          rule: 'Constructor Chaining Exists',
          explanation: 'Abstract classes can and should define constructors. They are called via super() from concrete subclass constructors.'
        },
        {
          rule: 'Forbidden Modifiers on Abstract Methods',
          explanation: 'Abstract methods cannot be private (invisible to child), static (belongs to class, no dispatch), or final (cannot be overridden).'
        },
        {
          rule: 'Single Inheritance Limitation',
          explanation: 'A Java class can only extend exactly one abstract (or concrete) class due to single class inheritance.'
        },
        {
          rule: 'Abstract Classes Without Abstract Methods',
          explanation: 'A class can be marked abstract even if it has zero abstract methods, purely to prevent direct instantiation.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Instantiation',
          optionA: 'Abstract Class: Cannot be instantiated with new',
          optionB: 'Concrete Class: Can be instantiated with new'
        },
        {
          aspect: 'Method Declarations',
          optionA: 'Abstract Class: Can have both abstract and concrete methods',
          optionB: 'Concrete Class: Can only have concrete methods'
        },
        {
          aspect: 'Subclass Obligation',
          optionA: 'Subclass of Abstract: Must override all abstract methods or be abstract',
          optionB: 'Subclass of Concrete: Inherits implementations, overriding is optional'
        },
        {
          aspect: 'Instance Variables',
          optionA: 'Abstract Class: Can have private/protected/public instance state',
          optionB: 'Concrete Class: Can have private/protected/public instance state'
        },
        {
          aspect: 'Purpose',
          optionA: 'Abstract Class: Core base identity & partial implementation blueprint',
          optionB: 'Concrete Class: Full implementation ready for object instantiation'
        },
        {
          aspect: 'Bytecode & Dispatch',
          optionA: 'Abstract Class: invokevirtual uses vtable index (concrete subclass fills slot)',
          optionB: 'Constructor invokespecial <init> chains superclass state initialization'
        },
        {
          aspect: 'Time & Space Complexity',
          optionA: 'Time: O(1) vtable dispatch; Space: O(fields) contiguous memory allocated on heap for subclass instance',
          optionB: 'Zero heap allocation for abstract class itself (cannot be instantiated)'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to instantiate an abstract class directly using the "new" operator.',
        whyItHappens: 'Beginners see a constructor in an abstract class and assume they can call `new AbstractClass()`.',
        howToFix: 'Remember that abstract classes are incomplete concepts. Instantiate a concrete subclass and assign it to an abstract reference: `AbstractClass obj = new ConcreteChild();`.'
      },
      {
        mistake: 'Declaring an abstract method as private or final.',
        whyItHappens: 'Trying to protect an abstract method or prevent further tampering.',
        howToFix: 'An abstract method exists exclusively to be overridden by a subclass. Making it private hides it from the subclass, and making it final forbids overriding. Use public or protected instead.'
      },
      {
        mistake: 'Forgetting to implement all inherited abstract methods in a concrete subclass.',
        whyItHappens: 'Overlooking one of multiple abstract methods declared in a superclass or ancestor hierarchy.',
        howToFix: 'Either implement all missing abstract methods with concrete bodies, or mark the subclass itself with the `abstract` keyword.'
      },
      {
        mistake: 'Placing a method body with braces {} on an abstract method declaration.',
        whyItHappens: 'Habit from writing standard methods.',
        howToFix: 'Abstract methods end with a semicolon `;` immediately following the parameter list. Remove `{}` entirely.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Abstract Class Constructor Execution Order',
        problemStatement: 'What is printed to the console when the following code runs?',
        code: `abstract class Parent {
    public Parent() {
        System.out.print("P1-");
    }
    public Parent(int x) {
        System.out.print("P" + x + "-");
    }
    abstract void show();
}

class Child extends Parent {
    public Child() {
        super(7);
        System.out.print("C1-");
    }
    @Override
    void show() {
        System.out.print("SHOW");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show();
    }
}`,
        options: [
          'P1-C1-SHOW',
          'P7-C1-SHOW',
          'C1-P7-SHOW',
          'Compilation Error: Parent is abstract and has no instances'
        ],
        correctOptionIndex: 1,
        hint: 'Trace the super(7) constructor call from Child to Parent(int x) before Child\'s constructor body executes.',
        solution: 'P7-C1-SHOW',
        explanation: 'When `new Child()` runs, its constructor explicitly calls `super(7)`. The `Parent(int x)` constructor executes first, printing "P7-". Then `Child` constructor finishes, printing "C1-". Finally, `p.show()` invokes `Child.show()`, printing "SHOW". Total output is "P7-C1-SHOW".'
      },
      {
        title: 'Puzzle 2: Concrete Subclass Omitting Abstract Implementation',
        problemStatement: 'What happens when compiling and running this code?',
        code: `abstract class BaseWorker {
    abstract void doWork();
    abstract void report();
}

abstract class IntermediateWorker extends BaseWorker {
    @Override
    void doWork() {
        System.out.print("Working-");
    }
}

class ConcreteWorker extends IntermediateWorker {
    @Override
    void report() {
        System.out.print("Reported");
    }
}

public class Main {
    public static void main(String[] args) {
        BaseWorker b = new ConcreteWorker();
        b.doWork();
        b.report();
    }
}`,
        options: [
          'Working-Reported',
          'Compilation Error: IntermediateWorker must implement report()',
          'Compilation Error: ConcreteWorker does not implement doWork()',
          'Runtime AbstractMethodError'
        ],
        correctOptionIndex: 0,
        hint: 'Can an abstract class implement some abstract methods and defer the remaining ones to downstream concrete subclasses?',
        solution: 'Working-Reported',
        explanation: '`IntermediateWorker` is abstract, so it is permitted to implement only `doWork()` and leave `report()` abstract. `ConcreteWorker` then implements the remaining method `report()`. When `ConcreteWorker` is instantiated, it has concrete bodies for all methods. Output: "Working-Reported".'
      },
      {
        title: 'Puzzle 3: Calling Overridden Method from Abstract Constructor',
        problemStatement: 'What is the exact output of this program?',
        code: `abstract class Vehicle {
    protected int speed = 10;
    public Vehicle() {
        display();
    }
    abstract void display();
}

class RaceCar extends Vehicle {
    private int topSpeed = 200;
    @Override
    void display() {
        System.out.print("Speed:" + speed + ",Top:" + topSpeed + " ");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new RaceCar();
    }
}`,
        options: [
          'Speed:10,Top:200 ',
          'Speed:10,Top:0 ',
          'Speed:0,Top:0 ',
          'Compilation Error: cannot call abstract method in constructor'
        ],
        correctOptionIndex: 1,
        hint: 'When super() executes in the abstract constructor, has RaceCar\'s field topSpeed been initialized yet?',
        solution: 'Speed:10,Top:0 ',
        explanation: 'When `new RaceCar()` is called, `Vehicle` constructor runs first. It invokes `display()`, which dynamically dispatches to `RaceCar.display()`. However, `RaceCar`\'s field initializers have not run yet! At that point, `topSpeed` holds its default integer value 0, while `speed` in Vehicle is already initialized to 10. Output: "Speed:10,Top:0 ".'
      },
      {
        title: 'Puzzle 4: Abstract Class Without Abstract Methods',
        problemStatement: 'Will this code compile, and if so, what does it output?',
        code: `abstract class Tool {
    public void operate() {
        System.out.print("OperatingTool ");
    }
}

class Hammer extends Tool {
    @Override
    public void operate() {
        super.operate();
        System.out.print("Hammering");
    }
}

public class Main {
    public static void main(String[] args) {
        Tool t = new Hammer();
        t.operate();
    }
}`,
        options: [
          'OperatingTool Hammering',
          'Compilation Error: Tool has no abstract methods so it cannot be abstract',
          'Hammering',
          'Compilation Error: super.operate() cannot be called on an abstract class'
        ],
        correctOptionIndex: 0,
        hint: 'Is an abstract class required to have abstract methods?',
        solution: 'OperatingTool Hammering',
        explanation: 'In Java, an abstract class is completely valid even with zero abstract methods. It simply prevents direct instantiation of Tool. Hammer overrides operate(), calls super.operate(), and prints "OperatingTool Hammering".'
      },
      {
        title: 'Puzzle 5: Illegal Modifier Combination on Abstract Method',
        problemStatement: 'Examine the following code. Which line causes a compilation failure?',
        code: `abstract class Account {
    // Line 1:
    protected String id;
    // Line 2:
    public abstract void deposit(double amount);
    // Line 3:
    public final abstract void withdraw(double amount);
    // Line 4:
    public void audit() { System.out.println("Audited"); }
}`,
        options: [
          'Line 1',
          'Line 2',
          'Line 3',
          'Line 4'
        ],
        correctOptionIndex: 2,
        hint: 'Can a method be both final (cannot be overridden) and abstract (must be overridden)?',
        solution: 'Line 3',
        explanation: 'Line 3 causes a compilation error: "illegal combination of modifiers: abstract and final". Abstract methods require subclasses to override them, whereas final prohibits overriding. They are directly contradictory.'
      },
      {
        title: 'Puzzle 6: Polymorphic Array of Abstract Types',
        problemStatement: 'What does this program print?',
        code: `abstract class Message {
    abstract String getPayload();
    public void send() {
        System.out.print("[" + getPayload() + "]");
    }
}

class TextMessage extends Message {
    @Override
    String getPayload() { return "TXT"; }
}

class AlertMessage extends Message {
    @Override
    String getPayload() { return "ALERT"; }
}

public class Main {
    public static void main(String[] args) {
        Message[] inbox = new Message[] { new TextMessage(), new AlertMessage() };
        for (int i = 0; i < inbox.length; i++) {
            inbox[i].send();
        }
    }
}`,
        options: [
          '[TXT][ALERT]',
          '[ALERT][TXT]',
          'Compilation Error: cannot create array of abstract class',
          '[null][null]'
        ],
        correctOptionIndex: 0,
        hint: 'Can you create an array of an abstract class type holding references to concrete subclass instances?',
        solution: '[TXT][ALERT]',
        explanation: 'Creating an array of an abstract type like `new Message[2]` does NOT instantiate `Message`—it creates an array of reference pointers that can hold concrete instances. Each call to `send()` dynamically invokes the respective subclass `getPayload()`, printing "[TXT][ALERT]".'
      },
      {
        title: 'Puzzle 7: Protected Access in Abstract Hierarchy',
        problemStatement: 'What is the output of the following code?',
        code: `abstract class Processor {
    private int factor = 3;
    protected abstract int process(int val);
    public int execute(int val) {
        return process(val) + factor;
    }
}

class Multiplier extends Processor {
    @Override
    protected int process(int val) {
        return val * 10;
    }
}

public class Main {
    public static void main(String[] args) {
        Processor p = new Multiplier();
        System.out.println(p.execute(4));
    }
}`,
        options: [
          '43',
          '40',
          '12',
          'Compilation Error: Multiplier cannot access private factor'
        ],
        correctOptionIndex: 0,
        hint: 'p.execute(4) calls execute in Processor, which calls process(4) in Multiplier and adds factor.',
        solution: '43',
        explanation: '`p.execute(4)` runs `Processor.execute(4)`. This calls `process(4)` which resolves dynamically to `Multiplier.process(4)` returning 40. Then `Processor` adds its private `factor` (3), returning 43.'
      },
      {
        title: 'Puzzle 8: Static Method in Abstract Class',
        problemStatement: 'Does this code compile, and what is printed?',
        code: `abstract class MathOp {
    public static int square(int n) {
        return n * n;
    }
    public abstract int compute(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        System.out.print(MathOp.square(5));
    }
}`,
        options: [
          '25',
          'Compilation Error: static methods are illegal in abstract classes',
          'Compilation Error: MathOp cannot be used because it is abstract',
          '0'
        ],
        correctOptionIndex: 0,
        hint: 'Can an abstract class define static utility methods and have them called directly without any subclass instantiation?',
        solution: '25',
        explanation: 'Static methods belong to the class itself, not to instances. An abstract class can have static methods, and they can be called directly via the class name `MathOp.square(5)` without creating any objects. It prints 25.'
      },
      {
        title: 'Puzzle 9: Partial Implementation in Multi-Level Abstract Chain',
        problemStatement: 'What is the console output of this 3-tier abstract hierarchy?',
        code: `abstract class StepA {
    abstract void process1();
    abstract void process2();
}
abstract class StepB extends StepA {
    @Override
    void process1() { System.out.print("B1 "); }
}
class ConcreteC extends StepB {
    @Override
    void process2() { System.out.print("C2 "); }
}
public class Main {
    public static void main(String[] args) {
        StepA obj = new ConcreteC();
        obj.process1();
        obj.process2();
    }
}`,
        options: [
          'B1 C2 ',
          'C2 B1 ',
          'Compilation Error: StepB must implement process2',
          'Compilation Error: StepA cannot be reference type'
        ],
        correctOptionIndex: 0,
        hint: 'An abstract class can implement some abstract methods from its parent, leaving the remaining ones for concrete descendants.',
        solution: 'B1 C2 ',
        explanation: 'Abstract class StepB partially implements StepA by overriding process1(). Concrete class ConcreteC overrides the remaining abstract method process2(). All methods are implemented, so ConcreteC can be instantiated cleanly, printing "B1 C2 ".'
      },
      {
        title: 'Puzzle 10: Abstract Super Constructor Calling Overridden Method',
        problemStatement: 'What does this program print during constructor execution?',
        code: `abstract class BaseComponent {
    BaseComponent() {
        init();
    }
    abstract void init();
}
class UIWidget extends BaseComponent {
    int size = 100;
    @Override
    void init() {
        System.out.print("Widget:" + size + " ");
    }
}
public class Main {
    public static void main(String[] args) {
        new UIWidget();
    }
}`,
        options: [
          'Widget:0 ',
          'Widget:100 ',
          'Compilation Error: cannot invoke abstract method in constructor',
          'NullPointerException'
        ],
        correctOptionIndex: 0,
        hint: 'When BaseComponent constructor runs, has UIWidget initialized its instance fields yet?',
        solution: 'Widget:0 ',
        explanation: 'During new UIWidget(), BaseComponent constructor runs first. It invokes init(), which dynamically dispatches to UIWidget.init(). But UIWidget field "size" has not yet been initialized to 100; it still holds default 0. Thus it prints "Widget:0 ".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is an abstract class in Java, and why can it not be instantiated?',
        answer: 'An abstract class is a class declared with the `abstract` keyword that serves as an incomplete conceptual blueprint in an inheritance hierarchy. It is designed to represent a generalized entity (such as `Vehicle` or `Shape`) where certain core methods cannot have a sensible, universal implementation. Java strictly prohibits direct instantiation with `new` because an abstract class may contain abstract methods with no bytecode body; invoking an un-implemented method on an instantiated object would violate type safety and cause runtime failures.',
        followUp: 'Can an abstract class have zero abstract methods? If so, why would you declare it abstract?',
        followUpAnswer: 'Yes, a class can be declared `abstract` even if all of its methods are completely concrete. Developers do this when they want to prevent callers from directly creating instances of a base class that only makes conceptual sense as an ancestor—such as an abstract `HttpAdapter` or `BaseEntity`—forcing users to instantiate a meaningful subclass.',
        keyPhrases: [
          'Incomplete conceptual blueprint',
          'Cannot be instantiated with new',
          'Type safety preservation',
          'Forced subclass specialization'
        ],
        commonMistakeAnswer: 'Claiming that abstract classes cannot be instantiated because they have no constructors.'
      },
      {
        question: 'Why do abstract classes have constructors if they cannot be instantiated directly?',
        answer: 'Abstract classes have constructors to properly initialize their own private and protected instance fields. When a concrete subclass is instantiated, constructor chaining mandates that the superclass constructor runs first (via an explicit or implicit `super()` call). This guarantees that the base class state is fully and securely constructed before the child class constructor initializes its own fields.',
        followUp: 'What happens if you do not define any constructor in an abstract class?',
        followUpAnswer: 'The Java compiler automatically inserts a default no-argument constructor with package-private or public visibility. It calls `super()` to Object\'s constructor, ensuring normal constructor chaining still occurs.',
        keyPhrases: [
          'State initialization',
          'Constructor chaining (super())',
          'Default no-arg constructor injection',
          'Base class field integrity'
        ],
        commonMistakeAnswer: 'Assuming abstract classes have no constructors and cannot initialize fields.'
      },
      {
        question: 'Can an abstract method be declared static, private, or final? Why or why not?',
        answer: 'None of those modifiers can be combined with `abstract`. 1) An abstract method cannot be `private` because private methods are not inherited or visible to subclasses, making overriding impossible. 2) It cannot be `final` because final explicitly forbids overriding, creating a direct logical contradiction with abstract. 3) It cannot be `static` because static methods belong to the class and are resolved at compile time via method hiding, whereas abstract methods rely on dynamic runtime polymorphism (virtual method dispatch) on an instance.',
        followUp: 'What compiler error occurs if you try to mark a method public abstract final?',
        followUpAnswer: 'The compiler fails with "illegal combination of modifiers: abstract and final".',
        keyPhrases: [
          'Logical contradiction',
          'Dynamic method dispatch',
          'Subclass visibility',
          'Compile-time resolution of static'
        ],
        commonMistakeAnswer: 'Saying abstract methods can be static if called with ClassName.methodName().'
      },
      {
        question: 'What is the Template Method design pattern, and how do abstract classes enable it?',
        answer: 'The Template Method pattern defines the skeleton or invariant sequence of an algorithm in a concrete (often `final`) method in the abstract superclass, while deferring one or more specific steps to abstract or hook methods. Concrete subclasses override these specific steps to provide customized behavior without altering the overarching algorithm\'s structure or execution sequence.',
        followUp: 'Why is the template method itself typically declared final?',
        followUpAnswer: 'Declaring the template method `final` protects the algorithmic workflow from being overridden, broken, or reordered by malicious or accidental subclass implementations.',
        keyPhrases: [
          'Algorithm skeleton',
          'Invariant workflow',
          'Deferred steps',
          'Final template method'
        ],
        commonMistakeAnswer: 'Confusing the template method with standard method overloading.'
      },
      {
        question: 'If a concrete subclass extends an abstract class, what are its obligations regarding inherited abstract methods?',
        answer: 'A concrete subclass must provide full method bodies (implementations) for every single abstract method inherited from its parent class and any un-implemented ancestor abstract classes. If the subclass fails to implement even one abstract method, the subclass itself is considered incomplete and must be explicitly declared `abstract`, failing compilation otherwise.',
        followUp: 'Can an abstract subclass override an abstract method with another abstract method?',
        followUpAnswer: 'Yes. An abstract subclass can re-declare an inherited abstract method to tighten its return type (covariant return) or adjust its Javadoc/specifications.',
        keyPhrases: [
          'Mandatory override',
          'Complete method body',
          'Incomplete class declaration',
          'Covariant return refinement'
        ],
        commonMistakeAnswer: 'Thinking that an intermediate abstract class must implement all superclass methods immediately.'
      },
      {
        question: 'What danger exists when calling an abstract method inside an abstract class constructor?',
        answer: 'Invoking an overridable or abstract method inside a constructor is a dangerous anti-pattern. Because constructor chaining executes the superclass constructor before the subclass constructor, the overridden subclass method will run before the subclass instance variables have been initialized. Any subclass fields referenced in that method will hold default zero or null values, frequently leading to `NullPointerException` or logical corruption.',
        followUp: 'How can you prevent subclasses from experiencing uninitialized state bugs in constructors?',
        followUpAnswer: 'Only call private, static, or final methods from inside constructors, ensuring that no uninitialized subclass code can be invoked prematurely.',
        keyPhrases: [
          'Uninitialized subclass state',
          'Default field values (0 / null)',
          'Constructor execution ordering',
          'Fragile base class problem'
        ],
        commonMistakeAnswer: 'Believing that child fields are initialized before parent constructors run.'
      },
      {
        question: 'How do abstract classes differ from pure concrete inheritance in terms of design intent?',
        answer: 'Concrete inheritance is designed primarily for code reuse between fully formed entities, but carries the risk of the "fragile base class" problem when base methods are overridden arbitrarily. Abstract classes, in contrast, explicitly demarcate what is shared (concrete methods) versus what is conceptually required but implementation-dependent (abstract methods). It acts as an enforced architectural contract rather than mere code sharing.',
        followUp: 'Is it good practice to declare a base class concrete if it will never be used alone?',
        followUpAnswer: 'No. If an entity represents an incomplete abstraction (like `Account` or `Animal`), leaving it concrete invites bugs by allowing developers to instantiate an incomplete object directly.',
        keyPhrases: [
          'Architectural contract',
          'Enforced specialization',
          'Incomplete entity protection',
          'Fragile base class mitigation'
        ],
        commonMistakeAnswer: 'Thinking abstract classes exist only because Java doesn\'t allow multiple class inheritance.'
      },
      {
        question: 'Can you create an array of an abstract class type?',
        answer: 'Yes, absolutely. You can declare and instantiate an array of an abstract class type, such as `Shape[] shapes = new Shape[5];`. This does NOT instantiate the abstract class `Shape`; it only creates an array object on the heap capable of holding 5 reference pointers of type `Shape`. The elements themselves start as `null` and must subsequently be populated with instances of concrete subclasses like `Circle` or `Rectangle`.',
        followUp: 'Can you assign an element of a concrete subclass array to an abstract class array?',
        followUpAnswer: 'Yes, because of array covariance in Java (e.g., `Circle[]` can be referenced by `Shape[]`), though writing an incompatible type into it at runtime will throw an `ArrayStoreException`.',
        keyPhrases: [
          'Array of references',
          'Heap pointer allocation',
          'No abstract instantiation',
          'Polymorphic array storage'
        ],
        commonMistakeAnswer: 'Thinking that new Shape[5] fails to compile because Shape is abstract.'
      },
      {
        question: 'Can an abstract class implement an interface without implementing all its methods?',
        answer: 'Yes. An abstract class that implements an interface is NOT required to provide implementations for any of the interface\'s methods. It can implement none, some, or all of them. Any interface methods left un-implemented are implicitly treated as abstract methods of the abstract class and must eventually be implemented by the first concrete subclass in the inheritance hierarchy.',
        followUp: 'What design pattern commonly uses an abstract class to partially implement an interface?',
        followUpAnswer: 'The "Skeletal Implementation" (or Abstract Adapter) pattern, where an abstract class provides default implementations for common methods of an interface, drastically reducing the boilerplate for concrete implementors.',
        keyPhrases: [
          'Skeletal implementation pattern',
          'Deferred interface fulfillment',
          'Implicit abstract methods',
          'Boilerplate reduction'
        ],
        commonMistakeAnswer: 'Assuming any class that implements an interface must implement all methods immediately.'
      },
      {
        question: 'What access modifiers can be applied to abstract methods in an abstract class?',
        answer: 'Abstract methods can be declared `public`, `protected`, or package-private (default, no modifier). They CANNOT be declared `private` because private methods cannot be overridden by subclasses. In almost all production software, abstract methods are declared `public` (for public API contracts) or `protected` (when the method is an internal template step intended exclusively for subclasses).',
        followUp: 'Can a subclass override a protected abstract method and make it public?',
        followUpAnswer: 'Yes. Java allows widening access permissions during method overriding (e.g., protected to public), but never narrowing (e.g., public to protected).',
        keyPhrases: [
          'Public, protected, package-private',
          'Forbidden private modifier',
          'Access privilege widening',
          'Internal template step'
        ],
        commonMistakeAnswer: 'Claiming that abstract methods can only be public.'
      },
      {
        question: 'Can an abstract class be declared final? Why or why not?',
        answer: 'No. Declaring an abstract class `final` is an immediate compilation error ("illegal combination of modifiers: abstract and final"). An abstract class exists solely to be extended and completed by subclasses, whereas the `final` keyword explicitly forbids any class from extending it. Combining them represents an impossible, self-contradictory requirement in Java.',
        followUp: 'Can a concrete subclass of an abstract class be final?',
        followUpAnswer: 'Yes! A concrete subclass can be declared `final` to indicate that it is the terminal leaf node of the inheritance hierarchy and cannot be subclassed further.',
        keyPhrases: [
          'Direct contradiction',
          'Terminal leaf node',
          'Forbidding extension',
          'Compile-time validation'
        ],
        commonMistakeAnswer: 'Confusing final classes with final methods inside an abstract class.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following statements about abstract classes in Java is TRUE?',
        options: [
          'An abstract class must contain at least one abstract method.',
          'An abstract class cannot declare a constructor.',
          'An abstract class cannot be instantiated using the "new" keyword directly.',
          'All methods in an abstract class must be abstract.'
        ],
        correctIndex: 2,
        explanation: 'Abstract classes cannot be directly instantiated using the "new" keyword. They can have constructors, concrete methods, and even zero abstract methods.'
      },
      {
        question: 'What happens if a concrete subclass fails to implement an abstract method inherited from its parent?',
        options: [
          'The code compiles, but throws an AbstractMethodError at runtime when called.',
          'The code fails to compile unless the subclass is also marked abstract.',
          'The JVM automatically provides a dummy empty implementation.',
          'The method is automatically removed from the subclass signature.'
        ],
        correctIndex: 1,
        explanation: 'If a concrete subclass does not implement all inherited abstract methods, the compiler raises an error unless the subclass itself is declared abstract.'
      },
      {
        question: 'Which combination of modifiers on a method is ILLEGAL and causes a compiler error?',
        options: [
          'protected abstract void run();',
          'public abstract void run();',
          'abstract void run();',
          'private abstract void run();'
        ],
        correctIndex: 3,
        explanation: 'An abstract method cannot be private because private methods cannot be seen or overridden by subclasses.'
      },
      {
        question: 'What is the primary role of a constructor inside an abstract class?',
        options: [
          'To allow developers to instantiate the abstract class directly.',
          'To initialize superclass fields via constructor chaining (super()) from subclass constructors.',
          'To enforce that all subclasses have identical constructor parameters.',
          'To register the class with the JVM garbage collector.'
        ],
        correctIndex: 1,
        explanation: 'Abstract class constructors initialize the abstract superclass\'s private and protected fields during subclass instantiation via super().'
      },
      {
        question: 'Can an abstract class define static methods?',
        options: [
          'No, static methods are strictly prohibited in abstract classes.',
          'Yes, and they can be called directly using the abstract class name without instantiation.',
          'Yes, but only if they are declared abstract.',
          'Yes, but they can only be called from inside a concrete subclass.'
        ],
        correctIndex: 1,
        explanation: 'Static methods belong to the class itself, not instances, so an abstract class can have static concrete methods callable via AbstractClassName.methodName().'
      },
      {
        question: 'What is printed by: abstract class A { int x = 5; } class B extends A {} System.out.println(new B().x);',
        options: [
          '5',
          '0',
          'Compilation Error: A cannot have fields',
          'NullPointerException'
        ],
        correctIndex: 0,
        explanation: 'Subclass B inherits the field x from abstract class A, and new B().x prints 5.'
      },
      {
        question: 'Which design pattern uses an abstract class to define the unchanging skeleton of an algorithm while leaving individual steps to subclasses?',
        options: [
          'Singleton Pattern',
          'Observer Pattern',
          'Template Method Pattern',
          'Builder Pattern'
        ],
        correctIndex: 2,
        explanation: 'The Template Method pattern defines the algorithm skeleton in a base class and defers specific step implementations to subclasses.'
      },
      {
        question: 'Can a class be declared both abstract and final in Java?',
        options: [
          'Yes, to create utility classes that cannot be instantiated.',
          'Yes, if it has no methods.',
          'No, the compiler rejects this combination because they have opposite meanings.',
          'Yes, but only starting in Java 17.'
        ],
        correctIndex: 2,
        explanation: 'Abstract requires the class to be extended, whereas final forbids extension. The compiler flags this as an illegal modifier combination.'
      },
      {
        question: 'What happens when executing: `Shape[] arr = new Shape[3];` where Shape is an abstract class?',
        options: [
          'Compile-time error: Shape is abstract and cannot be instantiated.',
          'Runtime InstantationException is thrown.',
          'An array of 3 null references is successfully created on the heap.',
          'Three default Shape instances are created.'
        ],
        correctIndex: 2,
        explanation: 'Creating an array of an abstract class type allocates an array of reference slots (all initialized to null); it does NOT instantiate the abstract class itself.'
      },
      {
        question: 'If class C extends abstract class B, and B extends abstract class A with method abstract void m(), where can m() be implemented?',
        options: [
          'Only in B.',
          'Only in C.',
          'In B or in C (if not implemented in B, C must implement it).',
          'm() cannot be implemented anywhere once declared.'
        ],
        correctIndex: 2,
        explanation: 'Intermediate abstract class B may choose to implement m(). If B does not, the first concrete subclass C is obligated to implement it.'
      }
    ]
  },

  'interfaces-and-contracts': {
    id: 'interfaces-and-contracts',
    moduleId: 'java-abstraction',
    moduleTitle: '13. Abstraction & Interfaces',
    lessonNumber: 'Lesson 13.2',
    title: 'Interfaces: Contracts & Multiple Inheritance of Type',
    subtitle: 'Pure behavioral capability contracts, constant fields (public static final), implementing multiple interfaces, and polymorphic abstraction',
    estimatedMinutes: 22,
    beginnerAnalogy: 'Think of an interface like a standard universal USB-C specification. The USB-C consortium does not manufacture hard drives, smartphones, cameras, or external monitors. Instead, they publish an exacting interface contract: "If your hardware has a port that implements USB-C, it MUST support 24 pins, provide a minimum transfer protocol, and handle 5-volt power delivery." An external Samsung SSD, an Apple MacBook, and a Sony camera all implement the USB-C interface. Despite being completely unrelated devices built by different companies with completely different internal architectures, any device can plug into another because they all honor the exact same behavioral contract.',
    coreExplanation: [
      'An interface is a reference type in Java that specifies a pure behavioral contract. It defines WHAT a class can do, without dictating HOW it does it.',
      'All methods in an interface prior to Java 8 are implicitly `public` and `abstract`. Explicitly typing these modifiers is optional and redundant.',
      'All variables declared inside an interface are implicitly `public`, `static`, and `final`. They are compile-time constants and cannot be modified; interfaces cannot possess mutable instance fields.',
      'A class implements an interface using the `implements` keyword. A class can implement MULTIPLE interfaces simultaneously (e.g., `class Invoice implements Printable, Auditable, Serializable`), achieving multiple inheritance of type without multiple inheritance of state.',
      'An interface cannot be instantiated with `new`. However, an interface reference can point to any object whose class implements that interface, enabling loose coupling and polymorphic programming.',
      'When a class implements an interface, all interface methods implemented in the class must be declared with `public` visibility. Weakening the access modifier (e.g. to package-private or protected) causes a compile-time error.',
      'An interface can extend another interface (or multiple interfaces) using the `extends` keyword (e.g., `interface SuperUser extends User, Admin`). Classes `implement` interfaces, but interfaces `extend` interfaces.',
      'Marker interfaces (such as `Serializable` or `Cloneable`) contain zero methods and zero fields; they serve as type tags to communicate metadata or capabilities directly to the JVM or reflection libraries.'
    ],
    diagram: `================ MULTIPLE INHERITANCE OF TYPE (INTERFACES) ================

        <<interface>>                   <<interface>>
          Printable                       Auditable
   +--------------------+          +--------------------+
   | + print(): void    |          | + audit(): void    |
   +--------------------+          +--------------------+
             ▲                               ▲
             │                               │
             +---------------+---------------+
                             │
                             │ implements Printable, Auditable
                             │
            +---------------------------------+
            |          class Invoice          |
            +---------------------------------+
            | - invoiceId: String             |  <-- Concrete State
            | - totalAmount: double           |
            +---------------------------------+
            | + Invoice(id, amount)           |
            | + print(): void { ... }         |  <-- Fulfills Printable
            | + audit(): void { ... }         |  <-- Fulfills Auditable
            +---------------------------------+

  Polymorphic Usage:
  Printable p = new Invoice("INV-01", 450.0);
  p.print(); // Legal! Only sees print()
  Auditable a = (Auditable) p; // Cast across interfaces!
  a.audit(); // Legal! Dispatches to Invoice's audit()`,
    codeSnippet: {
      title: 'Smart Device Implementing Multiple Capability Interfaces',
      code: `interface Connectable {
    // Implicitly: public static final int DEFAULT_PORT = 8080;
    int DEFAULT_PORT = 8080;

    // Implicitly: public abstract void connect(String ip);
    void connect(String ip);
    void disconnect();
}

interface Chargeable {
    int getBatteryLevel();
    void charge(int percentage);
}

class SmartWatch implements Connectable, Chargeable {
    private String model;
    private int battery;
    private boolean connected;

    public SmartWatch(String model, int initialBattery) {
        this.model = model;
        this.battery = initialBattery;
        this.connected = false;
    }

    @Override
    public void connect(String ip) {
        this.connected = true;
        System.out.println(model + " connected to " + ip + ":" + DEFAULT_PORT);
    }

    @Override
    public void disconnect() {
        this.connected = false;
        System.out.println(model + " disconnected.");
    }

    @Override
    public int getBatteryLevel() {
        return battery;
    }

    @Override
    public void charge(int percentage) {
        battery = Math.min(100, battery + percentage);
        System.out.println(model + " charged to " + battery + "%");
    }
}

public class Main {
    public static void main(String[] args) {
        SmartWatch watch = new SmartWatch("GalaxyWatch", 45);

        // Polymorphic reference to Connectable contract
        Connectable conn = watch;
        conn.connect("192.168.1.50");

        // Polymorphic reference to Chargeable contract
        Chargeable pwr = watch;
        pwr.charge(30);

        conn.disconnect();
    }
}`,
      lineByLineExplanation: [
        {
          line: 'int DEFAULT_PORT = 8080;',
          explanation: 'Implicitly public static final constant available to any implementor or caller via Connectable.DEFAULT_PORT.'
        },
        {
          line: 'void connect(String ip);',
          explanation: 'Implicitly public abstract method; specifies required behavioral capability without any implementation details.'
        },
        {
          line: 'class SmartWatch implements Connectable, Chargeable',
          explanation: 'Demonstrates multiple inheritance of type: SmartWatch contracts to fulfill both Connectable and Chargeable behaviors.'
        },
        {
          line: 'public void connect(String ip)',
          explanation: 'Must be explicitly marked public because methods in interfaces are public; narrowing access causes a compiler error.'
        },
        {
          line: 'Connectable conn = watch;',
          explanation: 'Upcasting to an interface type; conn can only invoke methods defined within Connectable, guaranteeing decoupling.'
        }
      ],
      output: `GalaxyWatch connected to 192.168.1.50:8080
GalaxyWatch charged to 75%
GalaxyWatch disconnected.`
    },
    codeExamples: [
      {
        title: 'Multi-Format Data Exporter Architecture',
        description: 'Decoupling data generation from export formats using an interface contract.',
        code: `interface DataExporter {
    String exportHeader();
    String exportRecord(String[] fields);
}

class CsvExporter implements DataExporter {
    @Override
    public String exportHeader() {
        return "ID,NAME,ROLE";
    }

    @Override
    public String exportRecord(String[] fields) {
        return fields[0] + "," + fields[1] + "," + fields[2];
    }
}

class JsonExporter implements DataExporter {
    @Override
    public String exportHeader() {
        return "{\\n  \"records\": [";
    }

    @Override
    public String exportRecord(String[] fields) {
        return "    {\"id\": \"" + fields[0] + "\", \"name\": \"" + fields[1] + "\", \"role\": \"" + fields[2] + "\"}";
    }
}

public class ExporterApp {
    public static void runReport(DataExporter exporter, String[][] rows) {
        System.out.println(exporter.exportHeader());
        for (int i = 0; i < rows.length; i++) {
            System.out.println(exporter.exportRecord(rows[i]));
        }
    }

    public static void main(String[] args) {
        String[][] dataset = new String[][] {
            {"101", "Amara", "Lead Architect"},
            {"102", "Darius", "Security Engineer"}
        };

        System.out.println("--- CSV EXPORT ---");
        runReport(new CsvExporter(), dataset);

        System.out.println("\\n--- JSON EXPORT ---");
        runReport(new JsonExporter(), dataset);
    }
}`,
        output: `--- CSV EXPORT ---
ID,NAME,ROLE
101,Amara,Lead Architect
102,Darius,Security Engineer

--- JSON EXPORT ---
{
  "records": [
    {"id": "101", "name": "Amara", "role": "Lead Architect"}
    {"id": "102", "name": "Darius", "role": "Security Engineer"}`
      },
      {
        title: 'Interface Inheritance Hierarchy (Interfaces Extending Interfaces)',
        description: 'Shows that interfaces can inherit and combine contracts from multiple parent interfaces.',
        code: `interface ReadableSource {
    int readByte();
}

interface WritableSink {
    void writeByte(int b);
}

// Interface extending multiple interfaces
interface BidirectionalChannel extends ReadableSource, WritableSink {
    void flush();
}

class BytePipe implements BidirectionalChannel {
    private int buffer = -1;

    @Override
    public void writeByte(int b) {
        this.buffer = b;
        System.out.println("Pipe: buffered byte " + b);
    }

    @Override
    public int readByte() {
        int temp = this.buffer;
        this.buffer = -1;
        return temp;
    }

    @Override
    public void flush() {
        System.out.println("Pipe: flushed. Current buffer: " + buffer);
    }
}

public class ChannelApp {
    public static void main(String[] args) {
        BidirectionalChannel channel = new BytePipe();
        channel.writeByte(42);
        channel.flush();
        int received = channel.readByte();
        System.out.println("Read received byte: " + received);
    }
}`,
        output: `Pipe: buffered byte 42
Pipe: flushed. Current buffer: 42
Read received byte: 42`
      }
    ],
    cheatSheet: {
      summary: 'Interfaces represent pure contracts of capability and type. A class can implement multiple interfaces, enabling flexible, decoupled designs without the baggage of multiple state inheritance.',
      syntaxTemplate: `public interface ContractName {
    // 1. Constants (implicitly public static final)
    int MAX_RETRIES = 3;

    // 2. Abstract methods (implicitly public abstract)
    void execute();
    boolean validate(String input);
}

// Class implementing multiple interfaces
public class Implementor implements ContractName, AnotherContract {
    @Override
    public void execute() { /* ... */ }
    @Override
    public boolean validate(String input) { return true; }
}`,
      rules: [
        {
          rule: 'Implicit Public & Abstract Methods',
          explanation: 'Methods in an interface (without default or static) are automatically public and abstract. Modifiers are optional.'
        },
        {
          rule: 'Implicit Public Static Final Fields',
          explanation: 'Every field declared in an interface is a compile-time constant. They cannot be reassigned or serve as instance state.'
        },
        {
          rule: 'Public Overriding Obligation',
          explanation: 'When implementing an interface method, you MUST use the public access modifier; omitting it causes a compiler error.'
        },
        {
          rule: 'Multiple Interface Implementation',
          explanation: 'A class can implement as many interfaces as required, separated by commas after the implements keyword.'
        },
        {
          rule: 'Interface Extends Multiple Interfaces',
          explanation: 'An interface can extend one or more interfaces using the extends keyword, creating composed contracts.'
        },
        {
          rule: 'No Constructors in Interfaces',
          explanation: 'Interfaces cannot have constructors because they cannot maintain instance state and cannot be directly instantiated.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Inheritance Limit',
          optionA: 'Class Inheritance: Single (extends only one class)',
          optionB: 'Interface Implementation: Multiple (implements many interfaces)'
        },
        {
          aspect: 'Fields / State',
          optionA: 'Interface: Only public static final constants',
          optionB: 'Abstract Class: Can have private, protected, and mutable instance fields'
        },
        {
          aspect: 'Constructors',
          optionA: 'Interface: Strictly no constructors allowed',
          optionB: 'Abstract Class: Can define constructors for subclass chaining'
        },
        {
          aspect: 'Relationship',
          optionA: 'Interface: CAN-DO capability (e.g. Flyable, Printable)',
          optionB: 'Abstract Class: IS-A core identity (e.g. Bird, Vehicle)'
        },
        {
          aspect: 'Method Access',
          optionA: 'Interface Methods: Implicitly public',
          optionB: 'Abstract Class Methods: Can be public, protected, or package-private'
        },
        {
          aspect: 'Bytecode Instruction',
          optionA: 'Interface Call: invokeinterface opcode (itable resolution across independent hierarchies)',
          optionB: 'Class Call: invokevirtual opcode (fixed vtable index resolution)'
        },
        {
          aspect: 'Dispatch Complexity',
          optionA: 'Interface: O(1) with Inline Cache; fallback to itable scan',
          optionB: 'Class: O(1) single direct vtable index dereference'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Omitting the "public" keyword when implementing an interface method in a class.',
        whyItHappens: 'In the interface, the method is declared without "public" (e.g. `void run();`), so the developer writes `void run() { ... }` in the class.',
        howToFix: 'In an interface, `void run();` is implicitly `public`. In a class, omitting the modifier defaults to package-private, which illegally reduces visibility. Always add `public` to implemented methods.'
      },
      {
        mistake: 'Attempting to declare instance variables in an interface.',
        whyItHappens: 'Thinking that writing `int count = 0;` inside an interface creates an instance field for implementing classes.',
        howToFix: 'All interface variables are implicitly `public static final`. To store mutable state, use an abstract class or declare the fields directly inside the implementing class.'
      },
      {
        mistake: 'Trying to add a constructor to an interface.',
        whyItHappens: 'Attempting to initialize interface constants or force implementing classes to have a specific constructor.',
        howToFix: 'Interfaces cannot possess constructors because they have no instance state to initialize. Enforce initialization contracts via abstract method signatures like `void init(...)`.'
      },
      {
        mistake: 'Writing "class A extends B, C" to achieve multiple inheritance.',
        whyItHappens: 'Coming from languages like C++ or Python that support multiple class inheritance.',
        howToFix: 'Java only supports single class inheritance. Use interfaces for multiple inheritance of type: `class A extends B implements C, D`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Implicit Field Modifiers in Interfaces',
        problemStatement: 'What happens when compiling and running this code?',
        code: `interface Constants {
    int SPEED_LIMIT = 65;
}

class Car implements Constants {
    public void turbo() {
        // SPEED_LIMIT = 85; // Line A
        System.out.print(SPEED_LIMIT);
    }
}

public class Main {
    public static void main(String[] args) {
        new Car().turbo();
    }
}`,
        options: [
          'Prints 65',
          'Prints 85',
          'Compilation error at Line A if uncommented: cannot assign a value to final variable SPEED_LIMIT',
          'Both A and C are correct descriptions'
        ],
        correctOptionIndex: 3,
        hint: 'Interface variables are implicitly public, static, and final.',
        solution: 'Both A and C are correct descriptions',
        explanation: 'Because `SPEED_LIMIT` is in an interface, it is implicitly `public static final`. As written (with Line A commented out), it compiles and prints 65. If Line A were uncommented, compilation would fail because final variables cannot be reassigned.'
      },
      {
        title: 'Puzzle 2: Method Visibility Reduction Error',
        problemStatement: 'What is the compilation result of the following snippet?',
        code: `interface Greeter {
    void greet();
}

class PoliteGreeter implements Greeter {
    void greet() {
        System.out.println("Hello!");
    }
}

public class Main {
    public static void main(String[] args) {
        new PoliteGreeter().greet();
    }
}`,
        options: [
          'Prints: Hello!',
          'Compile-time error: attempting to assign weaker access privileges; was public',
          'Compile-time error: Greeter has no public methods',
          'Runtime SecurityException'
        ],
        correctOptionIndex: 1,
        hint: 'What is the implicit visibility of void greet() in an interface? What is the default visibility of void greet() in a class?',
        solution: 'Compile-time error: attempting to assign weaker access privileges; was public',
        explanation: 'Interface methods are implicitly `public`. In `PoliteGreeter`, `void greet()` has package-private access (default). In Java, overriding methods cannot reduce visibility. The method must be declared `public void greet()`.'
      },
      {
        title: 'Puzzle 3: Interface Reference and Polymorphic Method Availability',
        problemStatement: 'What will happen when the following code is compiled and executed?',
        code: `interface Flyer {
    void fly();
}

class Jet implements Flyer {
    @Override
    public void fly() {
        System.out.print("Supersonic ");
    }
    public void refuel() {
        System.out.print("Refueled ");
    }
}

public class Main {
    public static void main(String[] args) {
        Flyer f = new Jet();
        f.fly();
        // f.refuel(); // Line 16
    }
}`,
        options: [
          'Prints "Supersonic "',
          'Line 16 would cause a compile-time error because Flyer does not declare refuel()',
          'Both A and B are true',
          'Runtime NoSuchMethodError'
        ],
        correctOptionIndex: 2,
        hint: 'An interface reference only has access to methods declared in that interface.',
        solution: 'Both A and B are true',
        explanation: 'With Line 16 commented out, `f.fly()` compiles and prints "Supersonic ". If Line 16 were uncommented, compilation would fail because the reference type `Flyer` does not define `refuel()`, even though the runtime object is a `Jet`.'
      },
      {
        title: 'Puzzle 4: Identical Method Signatures in Multiple Interfaces',
        problemStatement: 'What happens when a class implements two interfaces that declare the exact same method signature?',
        code: `interface Alpha {
    void ping();
}

interface Beta {
    void ping();
}

class Node implements Alpha, Beta {
    @Override
    public void ping() {
        System.out.print("Pong ");
    }
}

public class Main {
    public static void main(String[] args) {
        Node n = new Node();
        Alpha a = n;
        Beta b = n;
        a.ping();
        b.ping();
    }
}`,
        options: [
          'Pong Pong ',
          'Compilation error: duplicate method ping() in Node',
          'Compilation error: Node cannot implement both Alpha and Beta',
          'Runtime AmbiguousMethodException'
        ],
        correctOptionIndex: 0,
        hint: 'Does a single method implementation in Node satisfy both Alpha.ping() and Beta.ping()?',
        solution: 'Pong Pong ',
        explanation: 'Because both `Alpha` and `Beta` declare the exact same signature `void ping()`, a single `public void ping()` implementation in `Node` satisfies the contract for both interfaces. It prints "Pong Pong ".'
      },
      {
        title: 'Puzzle 5: Conflicting Return Types in Multiple Interfaces',
        problemStatement: 'What is the outcome of compiling this code?',
        code: `interface SourceA {
    int getValue();
}

interface SourceB {
    String getValue();
}

class IncompatibleSource implements SourceA, SourceB {
    // How can getValue() be implemented?
}`,
        options: [
          'Compile-time error: methods have the same name and parameter types, but incompatible return types',
          'Compiles if the class defines Object getValue()',
          'Compiles if the class overloads getValue() with both return types',
          'Compiles cleanly without any method definitions'
        ],
        correctOptionIndex: 0,
        hint: 'Can a single class have two methods with the same name and parameters but different return types?',
        solution: 'Compile-time error: methods have the same name and parameter types, but incompatible return types',
        explanation: 'In Java, two methods cannot differ solely in their return types. Because `int` and `String` are incompatible types, no single method can fulfill both `SourceA` and `SourceB`. The class cannot compile.'
      },
      {
        title: 'Puzzle 6: Multiple Interface Extension Syntax',
        problemStatement: 'Which of the following interface declarations is syntactically valid in Java?',
        code: `// Option 1:
interface Device extends Serializable, Cloneable { }

// Option 2:
interface Device implements Serializable, Cloneable { }

// Option 3:
interface Device extends class Hardware { }

// Option 4:
abstract interface class Device { }`,
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
          'Option 4'
        ],
        correctOptionIndex: 0,
        hint: 'What keyword does an interface use to inherit from another interface?',
        solution: 'Option 1',
        explanation: 'Interfaces use the `extends` keyword (not `implements`) to inherit from other interfaces. An interface can extend multiple interfaces separated by commas: `interface Device extends Serializable, Cloneable { }`.'
      },
      {
        title: 'Puzzle 7: Cross-Casting Between Interfaces',
        problemStatement: 'What does this program print?',
        code: `interface Scalable {
    void scale(double factor);
}

interface Movable {
    void move(int x, int y);
}

class Sprite implements Scalable, Movable {
    @Override
    public void scale(double factor) { System.out.print("Scale:" + factor + " "); }
    @Override
    public void move(int x, int y) { System.out.print("Move:" + x + "," + y + " "); }
}

public class Main {
    public static void main(String[] args) {
        Scalable s = new Sprite();
        s.scale(1.5);
        Movable m = (Movable) s;
        m.move(10, 20);
    }
}`,
        options: [
          'Scale:1.5 Move:10,20 ',
          'Compilation error on cast: Scalable cannot be cast to Movable',
          'ClassCastException at runtime',
          'Scale:1.5 '
        ],
        correctOptionIndex: 0,
        hint: 'Can an interface reference pointing to an object be cast to another interface that the underlying object implements?',
        solution: 'Scale:1.5 Move:10,20 ',
        explanation: 'Because the underlying object is a `Sprite` (which implements both `Scalable` and `Movable`), cross-casting `(Movable) s` succeeds at runtime without exception. It prints "Scale:1.5 Move:10,20 ".'
      },
      {
        title: 'Puzzle 8: Marker Interface Inspection',
        problemStatement: 'What is the output of this code utilizing instanceof?',
        code: `interface Tagged {}

class Asset {}
class SecureAsset extends Asset implements Tagged {}

public class Main {
    public static void main(String[] args) {
        Asset a1 = new Asset();
        Asset a2 = new SecureAsset();

        System.out.print((a1 instanceof Tagged) + " " + (a2 instanceof Tagged));
    }
}`,
        options: [
          'false true',
          'true true',
          'false false',
          'Compilation error: Tagged has no methods'
        ],
        correctOptionIndex: 0,
        hint: 'Tagged is a marker interface. Which object\'s class hierarchy implements it?',
        solution: 'false true',
        explanation: '`SecureAsset` implements `Tagged`, so `a2 instanceof Tagged` evaluates to `true`. `Asset` does not implement `Tagged`, so `a1 instanceof Tagged` evaluates to `false`. Output: "false true".'
      },
      {
        title: 'Puzzle 9: Disambiguating Duplicate Constants in Multiple Interfaces',
        problemStatement: 'What does this program print?',
        code: `interface Alpha {
    int VAL = 10;
}
interface Beta {
    int VAL = 20;
}
class Composite implements Alpha, Beta {
    void print() {
        System.out.print(Alpha.VAL + " " + Beta.VAL);
    }
}
public class Main {
    public static void main(String[] args) {
        new Composite().print();
    }
}`,
        options: [
          '10 20',
          '20 10',
          'Compilation Error: duplicate field VAL',
          '30'
        ],
        correctOptionIndex: 0,
        hint: 'Referencing VAL unqualified causes an ambiguity error, but how does qualifying with the interface name behave?',
        solution: '10 20',
        explanation: 'Unqualified "VAL" would be ambiguous, but qualifying with Alpha.VAL and Beta.VAL explicitly resolves the constants at compile time, printing "10 20".'
      },
      {
        title: 'Puzzle 10: Interface Subtyping and Covariant Return Types',
        problemStatement: 'What is printed by this covariant interface hierarchy?',
        code: `interface Producer {
    Number produce();
}
interface DoubleProducer extends Producer {
    @Override
    Double produce();
}
class Generator implements DoubleProducer {
    @Override
    public Double produce() {
        return 3.14;
    }
}
public class Main {
    public static void main(String[] args) {
        Producer p = new Generator();
        System.out.println(p.produce().getClass().getSimpleName());
    }
}`,
        options: [
          'Double',
          'Number',
          'Compilation Error: cannot narrow return type in sub-interface',
          'ClassCastException'
        ],
        correctOptionIndex: 0,
        hint: 'Covariant return types are permitted in interfaces when narrowing from a supertype to a subtype.',
        solution: 'Double',
        explanation: 'DoubleProducer narrows produce() return type from Number to Double, which is legal via covariance. Generator returns 3.14 (a Double object). Dynamic dispatch invokes Generator.produce(), printing "Double".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does Java disallow multiple inheritance of classes, but allow multiple inheritance of interfaces?',
        answer: 'Java disallows multiple class inheritance to avoid the infamous "Diamond Problem" of multiple state inheritance. If class D extended both class B and class C (which both extended class A and declared instance field `x`), class D would inherit duplicate, conflicting copies of state, creating ambiguity in memory layout and constructor chaining. In contrast, interfaces (traditionally) contain only constants and abstract methods without instance fields. Implementing multiple interfaces inherits only behavioral contracts (types), eliminating any state conflicts or memory ambiguity.',
        followUp: 'How does Java 8 handle the diamond problem when multiple interfaces define conflicting default methods?',
        followUpAnswer: 'Java 8 introduces strict resolution rules. If two interfaces provide conflicting default implementations, the implementing class MUST explicitly override the method and resolve the conflict, optionally choosing one via `InterfaceName.super.method()`.',
        keyPhrases: [
          'Diamond problem',
          'Multiple state inheritance ambiguity',
          'Multiple inheritance of type',
          'No instance state conflict'
        ],
        commonMistakeAnswer: 'Saying Java disallows multiple inheritance simply to keep the compiler fast.'
      },
      {
        question: 'What are the implicit modifiers for fields and methods in a standard Java interface?',
        answer: 'All fields declared in an interface are implicitly `public static final`. They are compile-time constants that belong to the interface itself. All non-default, non-static methods in an interface are implicitly `public abstract`. They possess no body and define a public contract. In Java 9+, private helper methods are also permitted inside interfaces for internal code reuse within default methods.',
        followUp: 'What happens if you declare a field as protected in an interface?',
        followUpAnswer: 'The compiler produces an error: "modifier protected not allowed here". Only public is permitted for interface fields.',
        keyPhrases: [
          'Implicitly public static final',
          'Implicitly public abstract',
          'Compile-time constants',
          'Forbidden protected modifier'
        ],
        commonMistakeAnswer: 'Assuming interface fields are package-private by default like class fields.'
      },
      {
        question: 'What is a Marker Interface? Give two real examples from the standard Java library.',
        answer: 'A marker interface (also known as a tagging interface) is an interface that declares no methods and no constants (e.g., `public interface Serializable {}`). Its sole purpose is to "tag" or mark an implementing class as possessing a specific capability or semantic trait. Two prominent examples from the JDK are `java.io.Serializable` (indicating the object is safe to serialize to byte streams) and `java.lang.Cloneable` (authorizing `Object.clone()` to perform field-for-field memory copy).',
        followUp: 'What modern Java feature has largely superseded marker interfaces for metadata?',
        followUpAnswer: 'Java Annotations (introduced in Java 5) have largely replaced marker interfaces for metadata tagging because annotations are more flexible, can carry attributes, and do not pollute the class\'s type hierarchy.',
        keyPhrases: [
          'Tagging interface',
          'Zero methods / zero fields',
          'Serializable and Cloneable',
          'Superseded by annotations'
        ],
        commonMistakeAnswer: 'Believing marker interfaces are deprecated and illegal to write.'
      },
      {
        question: 'Why must an implemented interface method be declared public in the implementing class?',
        answer: 'In an interface, all abstract methods are implicitly `public`. According to the Java Language Specification rules for method overriding, an overriding method cannot assign weaker (more restrictive) access privileges than the overridden method. Since the interface method is `public`, the implementing class cannot use default (package-private), `protected`, or `private` access; it must explicitly declare the method `public`.',
        followUp: 'Can an implementing class declare the method with a broader modifier than public?',
        followUpAnswer: 'No, because `public` is already the widest possible access modifier in Java.',
        keyPhrases: [
          'Liskov substitution principle',
          'Access privilege restriction rules',
          'Implicit public interface contract',
          'Compile-time visibility validation'
        ],
        commonMistakeAnswer: 'Thinking omitting public makes it public because the interface is public.'
      },
      {
        question: 'Can an interface extend multiple interfaces? What keyword is used?',
        answer: 'Yes, an interface can extend multiple interfaces using the `extends` keyword. For example: `public interface MultiSource extends Readable, Closable, Loggable { }`. Classes use `implements` to realize interfaces, but interfaces use `extends` to inherit and combine contracts from other interfaces.',
        followUp: 'Can an interface implement another interface or a class?',
        followUpAnswer: 'No. An interface cannot `implement` anything, nor can it extend a class. Attempting `interface A implements B` or `interface A extends ClassB` results in a compilation error.',
        keyPhrases: [
          'Interface inheritance (extends)',
          'Multiple interface extension',
          'Cannot implement anything',
          'Contract composition'
        ],
        commonMistakeAnswer: 'Writing interface A implements B and thinking it compiles.'
      },
      {
        question: 'What is loose coupling, and how do interfaces enable it in large applications?',
        answer: 'Loose coupling is a software design principle where components depend on abstract contracts rather than concrete implementations. By programming to an interface (e.g. `PaymentService service = new StripePaymentService()`), the client code only interacts with the methods defined in `PaymentService`. If the team later switches to `PayPalPaymentService`, not a single line of client code needs to change, drastically reducing ripple effects, easing unit testing with mocks, and enhancing maintainability.',
        followUp: 'What design principle summarizes this practice in SOLID?',
        followUpAnswer: 'The Dependency Inversion Principle (the "D" in SOLID): "High-level modules should not depend on low-level modules; both should depend on abstractions."',
        keyPhrases: [
          'Programming to an interface',
          'Decoupling client from implementation',
          'Dependency Inversion Principle',
          'Testability and mockability'
        ],
        commonMistakeAnswer: 'Saying loose coupling means making all variables static or global.'
      },
      {
        question: 'What occurs if two implemented interfaces declare the exact same method signature and return type?',
        answer: 'There is zero conflict. A single `public` implementation of the method in the class satisfies both interface contracts simultaneously. When callers invoke the method through either interface reference or the concrete class reference, dynamic dispatch routes execution to that single concrete implementation.',
        followUp: 'What happens if two interfaces declare the same method name and parameters, but different return types like int and String?',
        followUpAnswer: 'The code cannot compile. In Java, methods cannot differ solely in return type, so no single method could ever satisfy both contracts.',
        keyPhrases: [
          'Single method satisfies both',
          'Identical signature convergence',
          'Incompatible return types compilation error',
          'Dynamic method dispatch'
        ],
        commonMistakeAnswer: 'Thinking the class must write two different methods with the same signature.'
      },
      {
        question: 'What is cross-casting between interfaces, and when is it safe?',
        answer: 'Cross-casting occurs when you cast a reference variable of one interface type to an unrelated interface type (e.g., `Movable m = (Movable) printableRef;`). In Java, the compiler allows this cast because the underlying concrete object instantiated on the heap might implement both interfaces. It is safe if the runtime object actually implements both interfaces; if it does not, the JVM throws a `ClassCastException`.',
        followUp: 'How can you protect your code from ClassCastException during cross-casting?',
        followUpAnswer: 'Use the `instanceof` operator before performing the cast: `if (printableRef instanceof Movable) { Movable m = (Movable) printableRef; }`.',
        keyPhrases: [
          'Cross-casting',
          'Compile-time permissiveness for interfaces',
          'Runtime ClassCastException check',
          'instanceof guard check'
        ],
        commonMistakeAnswer: 'Believing the compiler prevents casting between interfaces that don\'t inherit from each other.'
      },
      {
        question: 'Can an interface have private methods? When were they introduced and why?',
        answer: 'Yes, Java 9 introduced private (and private static) methods in interfaces. They cannot be called from outside the interface or overridden by implementing classes. Their purpose is purely to enable code reuse and eliminate duplicate code between multiple default methods inside the same interface.',
        followUp: 'Can a private method in an interface be abstract?',
        followUpAnswer: 'No. A private method must have a body `{}`. Marking a private method abstract causes a compilation error because no subclass could ever see or implement it.',
        keyPhrases: [
          'Java 9 feature',
          'Code reuse in default methods',
          'Encapsulated interface helper',
          'Must have a body'
        ],
        commonMistakeAnswer: 'Claiming interfaces can only have public methods in all Java versions.'
      },
      {
        question: 'How does an interface support the Open-Closed Principle?',
        answer: 'The Open-Closed Principle states that software entities should be open for extension, but closed for modification. Interfaces achieve this by defining an immutable contract. New functionality can be added to a system by writing new classes that implement the interface (extension) without altering any existing classes that consume the interface (closed to modification).',
        followUp: 'Give an example of Open-Closed Principle using interfaces in a payment gateway.',
        followUpAnswer: 'A `PaymentGateway` interface with `processPayment()` allows adding `CryptoPayment` or `ApplePay` by implementing the interface, without modifying the existing `CheckoutController` code.',
        keyPhrases: [
          'Open-Closed Principle',
          'Extensible via new implementors',
          'Closed to caller modification',
          'Polymorphic pluggability'
        ],
        commonMistakeAnswer: 'Thinking Open-Closed means making all interface methods public final.'
      },
      {
        question: 'Can you use the "final" keyword on an interface declaration or on an interface method?',
        answer: 'No. An interface cannot be declared `final` because an interface is inherently abstract and intended to be implemented; `final interface` triggers a compiler error. Similarly, an abstract interface method cannot be `final` because it must be overridden by an implementing class. In Java 8+, only `static` methods in interfaces can have bodies, and they cannot be marked final either (they are not inherited).',
        followUp: 'Can an implementing class mark its override of an interface method as final?',
        followUpAnswer: 'Yes! The implementing class can mark its concrete override as `final` to prevent further subclasses from overriding it.',
        keyPhrases: [
          'Forbidden final on interface',
          'Inherent abstract nature',
          'Terminal override in class',
          'Compiler rejection'
        ],
        commonMistakeAnswer: 'Thinking that final interface methods make the contract unchangeable.'
      }
    ],
    miniQuiz: [
      {
        question: 'What are the implicit modifiers for variables declared inside a Java interface?',
        options: [
          'public abstract',
          'public static final',
          'private final',
          'protected static'
        ],
        correctIndex: 1,
        explanation: 'All variables declared in an interface are automatically and implicitly public, static, and final constants.'
      },
      {
        question: 'What happens when a class implements an interface method without adding the "public" access modifier?',
        options: [
          'It compiles normally with package-private access.',
          'It compiles, but cannot be called polymorphically.',
          'It fails to compile because it attempts to assign weaker access privileges than the interface\'s public method.',
          'The compiler automatically injects the public keyword.'
        ],
        correctIndex: 2,
        explanation: 'Interface methods are implicitly public. Omitting the modifier in the implementing class gives it package-private access, which is an illegal reduction of visibility.'
      },
      {
        question: 'How many classes can a Java class extend, and how many interfaces can it implement?',
        options: [
          'Extends one class, implements one interface.',
          'Extends multiple classes, implements multiple interfaces.',
          'Extends one class, implements multiple interfaces.',
          'Extends multiple classes, implements one interface.'
        ],
        correctIndex: 2,
        explanation: 'Java supports single class inheritance (extends at most one class) but multiple interface implementation (implements multiple interfaces).'
      },
      {
        question: 'Which keyword is used when an interface inherits from another interface?',
        options: [
          'implements',
          'extends',
          'inherits',
          'super'
        ],
        correctIndex: 1,
        explanation: 'Interfaces extend other interfaces using the `extends` keyword. Classes implement interfaces using the `implements` keyword.'
      },
      {
        question: 'What is a marker interface in Java?',
        options: [
          'An interface with only static methods.',
          'An interface that contains no methods or fields, used to tag classes for specific capabilities.',
          'An interface that marks methods as deprecated.',
          'An interface that can only be implemented by abstract classes.'
        ],
        correctIndex: 1,
        explanation: 'A marker interface is an empty interface (like Serializable or Cloneable) used as a type tag.'
      },
      {
        question: 'Given: `interface A { int X = 10; }` what is the result of `A.X = 20;`?',
        options: [
          'X becomes 20.',
          'Compile-time error: cannot assign a value to static final variable X.',
          'Runtime SecurityException.',
          'X becomes 20 only for classes that implement A.'
        ],
        correctIndex: 1,
        explanation: 'Interface fields are final constants and cannot be reassigned.'
      },
      {
        question: 'Can an interface declare a constructor?',
        options: [
          'Yes, a default constructor is always generated.',
          'Yes, but only a private constructor.',
          'No, interfaces cannot declare constructors.',
          'Yes, if all fields are initialized.'
        ],
        correctIndex: 2,
        explanation: 'Interfaces cannot have constructors because they cannot maintain instance state and cannot be directly instantiated.'
      },
      {
        question: 'If interface I1 and interface I2 both declare `void compute()`, how does a class implement both?',
        options: [
          'It cannot implement both due to a conflict.',
          'It provides a single `public void compute()` method that satisfies both.',
          'It must write `public void I1.compute()` and `public void I2.compute()`.',
          'It must declare itself abstract.'
        ],
        correctIndex: 1,
        explanation: 'A single implementation of `public void compute()` satisfies both identical interface signatures.'
      },
      {
        question: 'Can an interface be declared with the `final` modifier?',
        options: [
          'Yes, to prevent classes from implementing it.',
          'No, the compiler will reject it because interfaces must be implemented.',
          'Yes, if all methods are static.',
          'Yes, in Java 17+ records.'
        ],
        correctIndex: 1,
        explanation: 'Interfaces are meant to be implemented. Making an interface final prevents implementation, so Java treats `final interface` as a compile-time error.'
      },
      {
        question: 'What happens at runtime when cross-casting `(B) aRef` if the object does not implement interface B?',
        options: [
          'The cast returns null.',
          'A compile-time error occurs immediately.',
          'A ClassCastException is thrown.',
          'The JVM creates a proxy object.'
        ],
        correctIndex: 2,
        explanation: 'If the object referenced by aRef does not implement B, a runtime ClassCastException is thrown.'
      }
    ]
  },

  'abstract-class-vs-interface': {
    id: 'abstract-class-vs-interface',
    moduleId: 'java-abstraction',
    moduleTitle: '13. Abstraction & Interfaces',
    lessonNumber: 'Lesson 13.3',
    title: 'Abstract Class vs Interface: When to Use Which?',
    subtitle: 'Architectural decision framework: IS-A core identity vs CAN-DO capability, state sharing, evolutionary compatibility, and mixin composition',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Think of the difference between your fundamental biological identity (IS-A) versus your learned skills and certifications (CAN-DO). A human is fundamentally a `Mammal`—you inherit warm-blooded circulation, DNA structure, skeletal anatomy, and a biological heart that beats automatically (an Abstract Class representing core identity, internal state, and inherited mechanisms). You cannot be both a Mammal and a Reptile because you have a single biological lineage. However, as a Mammal, you can acquire multiple independent certifications: you can be `DriverCertified`, `ScubaDiverCertified`, and `PianoPlayable` (Interfaces representing behavioral capabilities). A dolphin also implements `ScubaDiverCertified` (swims underwater) without being human. Use an abstract class for who you are; use interfaces for what you can do.',
    coreExplanation: [
      'The foundational decision between an abstract class and an interface rests on identity vs capability: Use an abstract class for an IS-A relationship sharing identity and state; use an interface for a CAN-DO relationship sharing behavioral contracts across unrelated hierarchies.',
      'State Management: Abstract classes can declare private, protected, and public instance variables, allowing stateful encapsulation. Interfaces cannot maintain instance state; all interface variables are strictly `public static final` constants.',
      'Constructors & Object Lifecycle: Abstract classes define constructors that initialize superclass fields via constructor chaining (`super()`). Interfaces have no constructors and play no direct role in object instantiation.',
      'Inheritance Constraints: Java enforces single class inheritance (a class can only `extends` one abstract class), but supports multiple interface implementation (a class can `implements` dozens of interfaces). Choosing an abstract class consumes the single inheritance slot of any subclass.',
      'Speed and Dispatch: In HotSpot JVM optimization, invokevirtual (used for class and abstract class method calls) is traditionally slightly simpler to optimize via vtables than invokeinterface (which uses itables), though modern JVM inline caching makes the practical performance difference negligible.',
      'Skeletal Implementation Pattern (Effective Java Item 20): Combine the best of both worlds by defining an interface for the public API and providing an accompanying abstract class (e.g., `List` interface + `AbstractList` skeletal class) to eliminate boilerplate for implementors.',
      'Evolutionary Impact: Adding a new abstract method to an abstract class breaks all concrete subclasses. Since Java 8, adding a `default` method to an interface provides backwards compatibility without breaking existing implementors.',
      'Access Modifier Flexibility: Abstract classes can define `protected` and package-private abstract methods for internal subsystem collaboration. Interfaces require all abstract methods to be public API contracts.'
    ],
    diagram: `===================== ARCHITECTURAL DECISION FRAMEWORK =====================

                     Do you need to define a contract?
                                    │
       ┌────────────────────────────┴────────────────────────────┐
       ▼                                                         ▼
Need shared instance state,                               Need to define pure
constructors, or non-public                               capabilities across
methods? (IS-A Identity)                                  unrelated classes? (CAN-DO)
       │                                                         │
       ▼                                                         ▼
[ USE ABSTRACT CLASS ]                                    [ USE INTERFACE ]
Examples:                                                 Examples:
 - Animal -> Dog, Cat                                      - Comparable
 - AbstractDocument -> PDF, DOCX                           - AutoCloseable
 - BaseRepository -> SqlRepo                               - Exportable, Auditable

             ┌──────────────────────────────────────────────┐
             │       BEST PRACTICE: HYBRID COMPOSITION      │
             │        (Skeletal Implementation)             │
             └──────────────────────────────────────────────┘
                         <<interface>>
                           Collection
                               ▲
                               │ implements
                    abstract class AbstractCollection
                               ▲
                               │ extends
                         class MyList`,
    codeSnippet: {
      title: 'Hybrid Architecture: Vehicle Base Class with Capability Interfaces',
      code: `// Capability Interfaces (CAN-DO)
interface Refuelable {
    void refuel(double liters);
}

interface Autonomous {
    void engageAutopilot();
}

// Core Identity Base Class (IS-A)
abstract class Vehicle {
    private String vin;
    private double currentSpeed;

    public Vehicle(String vin) {
        this.vin = vin;
        this.currentSpeed = 0.0;
    }

    public String getVin() { return vin; }
    public double getCurrentSpeed() { return currentSpeed; }

    protected void setSpeed(double speed) {
        this.currentSpeed = speed;
    }

    // Abstract core lifecycle
    public abstract void startEngine();
}

// Concrete class combining IS-A and multiple CAN-DO capabilities
class SmartElectricCar extends Vehicle implements Refuelable, Autonomous {
    private double batteryKwh;

    public SmartElectricCar(String vin, double batteryKwh) {
        super(vin);
        this.batteryKwh = batteryKwh;
    }

    @Override
    public void startEngine() {
        System.out.println("Electric powertrain initialized silently for VIN: " + getVin());
    }

    @Override
    public void refuel(double kwh) {
        batteryKwh += kwh;
        System.out.println("Charged battery by " + kwh + " kWh. Total: " + batteryKwh + " kWh");
    }

    @Override
    public void engageAutopilot() {
        setSpeed(65.0);
        System.out.println("Autopilot active. Speed set to: " + getCurrentSpeed() + " mph");
    }
}

public class Main {
    public static void main(String[] args) {
        SmartElectricCar tesla = new SmartElectricCar("5YJSA1E2", 85.0);
        tesla.startEngine();
        tesla.refuel(15.0);
        tesla.engageAutopilot();
    }
}`,
      lineByLineExplanation: [
        {
          line: 'abstract class Vehicle',
          explanation: 'Encapsulates shared mutable state (vin, currentSpeed) and constructor chaining that all vehicles share.'
        },
        {
          line: 'interface Refuelable / Autonomous',
          explanation: 'Defines independent capabilities that can apply to cars, drones, boats, or lawnmowers.'
        },
        {
          line: 'class SmartElectricCar extends Vehicle implements Refuelable, Autonomous',
          explanation: 'Demonstrates idiomatic Java design: inherits identity and state from one class, implements multiple capability interfaces.'
        },
        {
          line: 'super(vin);',
          explanation: 'Delegates initialization of the private vin field to the abstract superclass constructor.'
        },
        {
          line: 'setSpeed(65.0);',
          explanation: 'Leverages protected helper method in abstract superclass to update internal state.'
        }
      ],
      output: `Electric powertrain initialized silently for VIN: 5YJSA1E2
Charged battery by 15.0 kWh. Total: 100.0 kWh
Autopilot active. Speed set to: 65.0 mph`
    },
    codeExamples: [
      {
        title: 'Skeletal Implementation Pattern (Interface + Abstract Skeleton)',
        description: 'Demonstrates the standard Java library pattern where an interface defines the API and an abstract class provides common boilerplate.',
        code: `interface StringStack {
    void push(String item);
    String pop();
    String peek();
    int size();
    boolean isEmpty();
}

// Skeletal implementation providing common logic
abstract class AbstractStringStack implements StringStack {
    @Override
    public boolean isEmpty() {
        return size() == 0;
    }

    @Override
    public String pop() {
        if (isEmpty()) {
            System.out.println("Stack underflow!");
            return null;
        }
        String top = peek();
        removeTop();
        return top;
    }

    // Subclasses provide concrete removal
    protected abstract void removeTop();
}

class ArrayStringStack extends AbstractStringStack {
    private String[] elements = new String[10];
    private int count = 0;

    @Override
    public void push(String item) {
        elements[count++] = item;
    }

    @Override
    public String peek() {
        return count == 0 ? null : elements[count - 1];
    }

    @Override
    public int size() {
        return count;
    }

    @Override
    protected void removeTop() {
        elements[--count] = null;
    }
}

public class StackApp {
    public static void main(String[] args) {
        StringStack stack = new ArrayStringStack();
        stack.push("Alpha");
        stack.push("Beta");

        System.out.println("Size: " + stack.size());
        System.out.println("Popped: " + stack.pop());
        System.out.println("Empty? " + stack.isEmpty());
    }
}`,
        output: `Size: 2
Popped: Beta
Empty? false`
      },
      {
        title: 'Game Character Identity vs Equipment Capabilities',
        description: 'Shows why stateful character attributes require an abstract class while equipping abilities uses interfaces.',
        code: `interface MagicCaster {
    void castSpell(String spellName);
}

interface ShieldBearer {
    void blockDamage(int amount);
}

abstract class GameCharacter {
    private String characterName;
    private int healthPoints;

    public GameCharacter(String name, int hp) {
        this.characterName = name;
        this.healthPoints = hp;
    }

    public String getName() { return characterName; }
    public int getHp() { return healthPoints; }

    public void takeDamage(int dmg) {
        healthPoints = Math.max(0, healthPoints - dmg);
        System.out.println(characterName + " took " + dmg + " damage! HP remaining: " + healthPoints);
    }

    public abstract void performSpecialMove();
}

class Paladin extends GameCharacter implements MagicCaster, ShieldBearer {
    public Paladin(String name, int hp) {
        super(name, hp);
    }

    @Override
    public void performSpecialMove() {
        System.out.println(getName() + " channels Holy Wrath!");
    }

    @Override
    public void castSpell(String spellName) {
        System.out.println(getName() + " casts: " + spellName);
    }

    @Override
    public void blockDamage(int amount) {
        System.out.println(getName() + " raises divine shield and blocks " + amount + " damage!");
    }
}

public class GameApp {
    public static void main(String[] args) {
        Paladin paladin = new Paladin("Uther", 150);
        paladin.castSpell("Lesser Heal");
        paladin.blockDamage(25);
        paladin.takeDamage(10);
        paladin.performSpecialMove();
    }
}`,
        output: `Uther casts: Lesser Heal
Uther raises divine shield and blocks 25 damage!
Uther took 10 damage! HP remaining: 140
Uther channels Holy Wrath!`
      }
    ],
    cheatSheet: {
      summary: 'Choose an abstract class when sharing core identity, internal mutable state, constructors, or protected helpers. Choose an interface when defining polymorphic capabilities across diverse, unrelated classes.',
      syntaxTemplate: `// Decision 1: Shared identity & state -> Abstract Class
public abstract class AbstractCoreEntity {
    private String id;
    public AbstractCoreEntity(String id) { this.id = id; }
    public abstract void coreAction();
}

// Decision 2: Cross-cutting capability -> Interface
public interface Loggable {
    void log(String message);
}

// Decision 3: Composition
public class ConcreteProduct extends AbstractCoreEntity implements Loggable {
    public ConcreteProduct(String id) { super(id); }
    @Override public void coreAction() { /* ... */ }
    @Override public void log(String msg) { /* ... */ }
}`,
      rules: [
        {
          rule: 'Core Identity Rule (IS-A)',
          explanation: 'If the relationship is a genuine, fundamental taxonomy (e.g., Dog IS-A Animal), prefer an abstract class.'
        },
        {
          rule: 'Capability Rule (CAN-DO)',
          explanation: 'If the behavior describes a capability that unrelated classes can possess (e.g., Printable, AutoCloseable), use an interface.'
        },
        {
          rule: 'State & Field Requirement',
          explanation: 'If you need instance variables (other than public static final constants), you MUST use an abstract class.'
        },
        {
          rule: 'Constructor Chaining Requirement',
          explanation: 'If centralized constructor initialization logic is required, an abstract class is required.'
        },
        {
          rule: 'Inheritance Economy',
          explanation: 'Subclassing an abstract class burns the child class\'s single inheritance slot. Only use it when truly justified.'
        },
        {
          rule: 'Skeletal Implementation Synergy',
          explanation: 'Define public APIs as interfaces, and optionally provide an abstract skeletal class for implementors to extend.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Primary Role',
          optionA: 'Abstract Class: Core taxonomy identity & shared state (IS-A)',
          optionB: 'Interface: Peripheral behavioral contract & capability (CAN-DO)'
        },
        {
          aspect: 'State / Fields',
          optionA: 'Abstract Class: Mutable instance fields with any access modifier',
          optionB: 'Interface: Only public static final compile-time constants'
        },
        {
          aspect: 'Constructors',
          optionA: 'Abstract Class: Supports constructors and constructor chaining',
          optionB: 'Interface: No constructors allowed'
        },
        {
          aspect: 'Multiple Inheritance',
          optionA: 'Abstract Class: Single inheritance only (one superclass)',
          optionB: 'Interface: Multiple implementation (unlimited interfaces)'
        },
        {
          aspect: 'Access Modifiers',
          optionA: 'Abstract Class: Methods can be public, protected, package-private',
          optionB: 'Interface: Abstract methods are strictly public'
        },
        {
          aspect: 'Bytecode Dispatch & itable',
          optionA: 'Abstract Class: invokevirtual via vtable index (single pointer dereference)',
          optionB: 'Interface: invokeinterface with itable check / inline cache resolution'
        },
        {
          aspect: 'Complexity & Allocation',
          optionA: 'O(1) method invocation; instance fields contribute directly to object footprint',
          optionB: 'O(1) invocation; zero object memory overhead (no instance fields allowed)'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Using an abstract class purely to share a single utility method across unrelated classes.',
        whyItHappens: 'Wanting to reuse code without understanding that extending a class burns the single inheritance slot.',
        howToFix: 'If classes are not genuinely in an IS-A relationship, use an interface with a default method, a static utility class, or composition instead of subclassing.'
      },
      {
        mistake: 'Choosing an interface when internal mutable state and constructors are required.',
        whyItHappens: 'Hearing "prefer interfaces over abstract classes" without realizing interfaces cannot hold instance variables.',
        howToFix: 'If instances need their own private fields like `balance`, `id`, or `createdTimestamp`, use an abstract class.'
      },
      {
        mistake: 'Creating a bloated "God Interface" that forces implementors to write dummy methods.',
        whyItHappens: 'Grouping too many unrelated methods into a single interface.',
        howToFix: 'Follow the Interface Segregation Principle (ISP): break broad interfaces into small, focused, role-specific interfaces.'
      },
      {
        mistake: 'Assuming abstract classes are obsolete because Java 8 added default methods to interfaces.',
        whyItHappens: 'Assuming default methods turn interfaces into full abstract classes.',
        howToFix: 'Default methods cannot access or define instance fields or invoke constructors. Abstract classes remain indispensable for stateful OOP.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: State vs Constant in Hierarchy',
        problemStatement: 'What does this program print?',
        code: `interface CapacityLimit {
    int MAX = 100;
}

abstract class Container implements CapacityLimit {
    protected int current;
    public Container(int initial) {
        this.current = Math.min(initial, MAX);
    }
    public int getCurrent() { return current; }
}

class Glass extends Container {
    public Glass(int initial) {
        super(initial);
    }
}

public class Main {
    public static void main(String[] args) {
        Glass g = new Glass(150);
        System.out.println(g.getCurrent() + " " + CapacityLimit.MAX);
    }
}`,
        options: [
          '100 100',
          '150 100',
          '100 150',
          'Compilation Error: Container cannot access CapacityLimit.MAX'
        ],
        correctOptionIndex: 0,
        hint: 'Math.min(150, 100) sets current to 100.',
        solution: '100 100',
        explanation: '`CapacityLimit.MAX` is an interface constant equal to 100. In `Container` constructor, `Math.min(150, 100)` assigns 100 to `current`. Calling `g.getCurrent()` returns 100, and `CapacityLimit.MAX` prints 100. Total output: "100 100".'
      },
      {
        title: 'Puzzle 2: Method Hiding vs Interface Method',
        problemStatement: 'What is printed to the console?',
        code: `interface Worker {
    void work();
}

abstract class Person {
    public void work() {
        System.out.print("PersonWorking ");
    }
}

class Employee extends Person implements Worker {
    // Does not override work()
}

public class Main {
    public static void main(String[] args) {
        Worker w = new Employee();
        w.work();
    }
}`,
        options: [
          'PersonWorking ',
          'Compilation Error: Employee must implement Worker.work()',
          'Runtime AbstractMethodError',
          'Prints nothing'
        ],
        correctOptionIndex: 0,
        hint: 'Does a concrete method inherited from a superclass satisfy an interface contract?',
        solution: 'PersonWorking ',
        explanation: 'In Java, an inherited public concrete method from a superclass (`Person.work()`) directly satisfies the interface contract for `Worker.work()`. `Employee` is not required to re-implement it. It prints "PersonWorking ".'
      },
      {
        title: 'Puzzle 3: The Single Inheritance Constraint Trap',
        problemStatement: 'Which of the following class declarations causes a compilation error?',
        code: `abstract class Engine {}
abstract class Chassis {}
interface Radio {}
interface GPS {}

// Class 1:
class Car1 extends Engine implements Radio, GPS {}

// Class 2:
class Car2 extends Engine, Chassis {}

// Class 3:
abstract class Car3 implements Radio, GPS {}`,
        options: [
          'Class 1 only',
          'Class 2 only',
          'Class 2 and Class 3',
          'All three compile successfully'
        ],
        correctOptionIndex: 1,
        hint: 'Can a class extend multiple classes?',
        solution: 'Class 2 only',
        explanation: 'Java strictly prohibits extending multiple classes. `class Car2 extends Engine, Chassis` causes a compilation error. A class can extend only one class, but can implement multiple interfaces.'
      },
      {
        title: 'Puzzle 4: Protected Method Access in Abstract Class vs Interface',
        problemStatement: 'What happens when compiling this code?',
        code: `interface API {
    // Line 1
    // protected void call(); 
}

abstract class BaseService {
    // Line 2
    protected abstract void execute(); 
}

class ServiceImpl extends BaseService {
    @Override
    protected void execute() {
        System.out.print("Executed");
    }
}

public class Main {
    public static void main(String[] args) {
        new ServiceImpl().execute();
    }
}`,
        options: [
          'Prints: Executed',
          'Line 1 would compile if uncommented',
          'Line 2 causes a compile error because abstract methods cannot be protected',
          'Both A and B are true'
        ],
        correctOptionIndex: 0,
        hint: 'Can abstract classes have protected abstract methods? Can interfaces have protected methods?',
        solution: 'Prints: Executed',
        explanation: 'Abstract classes can have protected abstract methods, allowing subclasses to override them. Interfaces CANNOT have protected methods (Line 1 would fail compilation). The code as written compiles and prints "Executed".'
      },
      {
        title: 'Puzzle 5: Skeletal Implementation Polymorphic Dispatch',
        problemStatement: 'What is the output of this program?',
        code: `interface Validator {
    boolean isValid(String s);
    void validateAndLog(String s);
}

abstract class AbstractValidator implements Validator {
    @Override
    public void validateAndLog(String s) {
        if (isValid(s)) {
            System.out.print("VALID ");
        } else {
            System.out.print("INVALID ");
        }
    }
}

class LengthValidator extends AbstractValidator {
    @Override
    public boolean isValid(String s) {
        return s != null && s.length() >= 4;
    }
}

public class Main {
    public static void main(String[] args) {
        Validator v = new LengthValidator();
        v.validateAndLog("Hi");
        v.validateAndLog("Java");
    }
}`,
        options: [
          'INVALID VALID ',
          'VALID INVALID ',
          'INVALID INVALID ',
          'Compilation Error: AbstractValidator must implement isValid'
        ],
        correctOptionIndex: 0,
        hint: '"Hi".length() is 2 (< 4), "Java".length() is 4 (>= 4).',
        solution: 'INVALID VALID ',
        explanation: '`validateAndLog()` in `AbstractValidator` invokes `isValid(s)`. For "Hi", length is 2 (< 4), printing "INVALID ". For "Java", length is 4 (>= 4), printing "VALID ". Total output: "INVALID VALID ".'
      },
      {
        title: 'Puzzle 6: Instance Variable Absence in Interface',
        problemStatement: 'What does this program print?',
        code: `interface CounterHolder {
    int COUNT = 5;
}

class WorkerNode implements CounterHolder {
    int COUNT = 10;
    public void printCounts() {
        System.out.print(COUNT + "-" + CounterHolder.COUNT);
    }
}

public class Main {
    public static void main(String[] args) {
        new WorkerNode().printCounts();
    }
}`,
        options: [
          '10-5',
          '5-5',
          '10-10',
          'Compilation Error: duplicate field COUNT'
        ],
        correctOptionIndex: 0,
        hint: 'The instance variable in WorkerNode shadows the interface constant.',
        solution: '10-5',
        explanation: '`WorkerNode` defines its own instance field `COUNT = 10`, shadowing the inherited interface constant `CounterHolder.COUNT` (5). Inside the class, `COUNT` refers to the instance field (10), while `CounterHolder.COUNT` explicitly accesses the interface constant (5). Output: "10-5".'
      },
      {
        title: 'Puzzle 7: Can-Do vs Is-A Downcasting',
        problemStatement: 'What happens when this program runs?',
        code: `interface Flyable {}
abstract class Bird {}
class Eagle extends Bird implements Flyable {}
class Ostrich extends Bird {}

public class Main {
    public static void main(String[] args) {
        Bird b1 = new Eagle();
        Bird b2 = new Ostrich();

        System.out.print((b1 instanceof Flyable) + " ");
        System.out.print((b2 instanceof Flyable));
    }
}`,
        options: [
          'true false',
          'true true',
          'false false',
          'Compilation error on instanceof check'
        ],
        correctOptionIndex: 0,
        hint: 'Does Ostrich implement Flyable?',
        solution: 'true false',
        explanation: 'Both `Eagle` and `Ostrich` are `Bird`s (IS-A). However, only `Eagle` implements `Flyable` (CAN-DO). Therefore, `b1 instanceof Flyable` is true and `b2 instanceof Flyable` is false. Output: "true false".'
      },
      {
        title: 'Puzzle 8: Interface Marker vs Abstract Root Check',
        problemStatement: 'What does the console display?',
        code: `abstract class Item {
    String name;
    public Item(String name) { this.name = name; }
}

interface Discountable {
    double getDiscount();
}

class Book extends Item implements Discountable {
    public Book(String name) { super(name); }
    public double getDiscount() { return 0.20; }
}

public class Main {
    public static void main(String[] args) {
        Item item = new Book("Java Guide");
        if (item instanceof Discountable) {
            Discountable d = (Discountable) item;
            System.out.print(item.name + " disc=" + d.getDiscount());
        }
    }
}`,
        options: [
          'Java Guide disc=0.2',
          'Java Guide disc=0.20',
          'Compilation Error: Item cannot be cast to Discountable',
          'ClassCastException at runtime'
        ],
        correctOptionIndex: 0,
        hint: 'In Java, double 0.20 prints as 0.2 by default.',
        solution: 'Java Guide disc=0.2',
        explanation: '`item` references a `Book`, which implements `Discountable`. The `instanceof` check succeeds. Casting `item` to `Discountable` succeeds, and `d.getDiscount()` returns 0.2. Output: "Java Guide disc=0.2".'
      },
      {
        title: 'Puzzle 9: Abstract Class Implementing Interface without Defining Method',
        problemStatement: 'Does this code compile, and what is printed?',
        code: `interface Worker {
    void work();
}
abstract class AbstractDev implements Worker {
    // does not implement work()
}
class SeniorDev extends AbstractDev {
    @Override
    public void work() {
        System.out.print("Coding ");
    }
}
public class Main {
    public static void main(String[] args) {
        Worker w = new SeniorDev();
        w.work();
    }
}`,
        options: [
          'Coding ',
          'Compilation Error: AbstractDev must implement work()',
          'Compilation Error: Worker cannot be instantiated',
          'Runtime Error'
        ],
        correctOptionIndex: 0,
        hint: 'An abstract class that implements an interface is NOT required to provide implementation bodies for interface methods.',
        solution: 'Coding ',
        explanation: 'Abstract classes can defer implementing interface methods to concrete subclasses. SeniorDev implements work(), allowing clean execution and printing "Coding ".'
      },
      {
        title: 'Puzzle 10: Private Method in Interface Supporting Default Method',
        problemStatement: 'What is printed by this Java 9+ interface construct?',
        code: `interface Validator {
    default void validate() {
        log("Start");
        check();
        log("End");
    }
    private void log(String msg) {
        System.out.print("[" + msg + "] ");
    }
    void check();
}
class UserValidator implements Validator {
    @Override
    public void check() {
        System.out.print("Valid ");
    }
}
public class Main {
    public static void main(String[] args) {
        new UserValidator().validate();
    }
}`,
        options: [
          '[Start] Valid [End] ',
          'Valid ',
          'Compilation Error: private methods are illegal in interfaces',
          '[Start] [End] '
        ],
        correctOptionIndex: 0,
        hint: 'Java 9 introduced private methods in interfaces to share logic between default methods without exposing them publicly.',
        solution: '[Start] Valid [End] ',
        explanation: 'Java 9+ permits private helper methods inside interfaces. They cannot be inherited or overridden, but default methods within the interface can call them freely. Output is "[Start] Valid [End] ".'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do you decide between an abstract class and an interface when designing a Java system?',
        answer: 'I use a four-question decision framework: 1) Relationship type: Is it an IS-A core identity (abstract class) or a CAN-DO behavioral capability (interface)? 2) State requirements: Does the abstraction need to manage mutable instance variables or constructors? If yes, an abstract class is required. 3) Inheritance economy: Will subclasses need to inherit from other classes? If yes, an interface must be used because Java only allows single class inheritance. 4) Scope: Are we defining a public API contract across unrelated modules (interface) or an internal subsystem hierarchy sharing protected logic (abstract class)?',
        followUp: 'What is the "Skeletal Implementation" pattern recommended by Joshua Bloch in Effective Java?',
        followUpAnswer: 'It combines both: you define the public API as an interface to give callers maximum flexibility, and you provide an abstract skeletal class (like AbstractList) that implements the interface and provides default boilerplate, giving implementors the choice of easy extension or pure implementation.',
        keyPhrases: [
          'IS-A vs CAN-DO',
          'Mutable instance state',
          'Inheritance economy (single inheritance)',
          'Skeletal implementation pattern'
        ],
        commonMistakeAnswer: 'Saying interfaces should always be used because abstract classes are old and deprecated.'
      },
      {
        question: 'Can you achieve multiple inheritance of state in Java using interfaces?',
        answer: 'No. Java strictly forbids multiple inheritance of state. All variables in an interface are implicitly `public static final` constants—they belong to the interface class itself, not to instances. An interface cannot declare instance variables or fields that store individual object state. Multiple inheritance in Java is strictly limited to multiple inheritance of type (contracts) and behavior (via default methods).',
        followUp: 'How can you simulate multiple state inheritance if a class needs state from two different sources?',
        followUpAnswer: 'By using composition instead of inheritance: the class extends one base class and maintains private instance references (delegates) to instances of the other required classes.',
        keyPhrases: [
          'No multiple inheritance of state',
          'Only public static final constants',
          'Multiple inheritance of type',
          'Composition over inheritance'
        ],
        commonMistakeAnswer: 'Claiming that default methods in Java 8 allow multiple state inheritance.'
      },
      {
        question: 'Why did Java 8 introduce default methods if abstract classes already supported concrete methods?',
        answer: 'Default methods were introduced primarily for "Interface Evolution" (backwards compatibility). In Java 8, the Java team needed to add functional methods (such as `forEach` or `stream`) to core interfaces like `java.util.Collection`. If those methods were added as abstract methods, every single custom collection class in the world would have immediately broken upon upgrading to Java 8. Default methods allowed the JDK authors to attach concrete implementations directly to interfaces without breaking existing implementors.',
        followUp: 'Does the existence of default methods make abstract classes obsolete?',
        followUpAnswer: 'Absolutely not. Interfaces still cannot declare instance state (fields), cannot have constructors, cannot have protected/package-private methods, and cannot override Object methods like equals or hashCode as default methods.',
        keyPhrases: [
          'Interface evolution',
          'Backwards compatibility',
          'Collection interface enhancement',
          'Abstract classes not obsolete'
        ],
        commonMistakeAnswer: 'Saying default methods were added solely to copy C++ multiple inheritance.'
      },
      {
        question: 'What is the difference in access modifiers permitted in abstract classes versus interfaces?',
        answer: 'In an abstract class, methods and fields can use all four access modifiers: `private`, `protected`, package-private, and `public`. This allows rich internal encapsulation, such as protected template methods. In contrast, all abstract methods in an interface are strictly `public`. Java 9 added `private` methods to interfaces, but they can only be used as internal helper methods for default methods; interfaces can never have `protected` or package-private methods.',
        followUp: 'Why does Java disallow protected methods in interfaces?',
        followUpAnswer: 'An interface is intended to define an external, public-facing behavioral contract between independent systems, not an internal family inheritance hierarchy.',
        keyPhrases: [
          'All four access modifiers in abstract classes',
          'Protected template methods',
          'Public API contracts in interfaces',
          'Java 9 private interface helpers'
        ],
        commonMistakeAnswer: 'Thinking abstract methods in abstract classes must always be public.'
      },
      {
        question: 'Explain the concept of "Composition over Inheritance" and how it relates to abstract classes.',
        answer: '"Composition over Inheritance" is the principle that classes should achieve polymorphic reuse by assembling references to other objects (HAS-A) rather than inheriting from a base class (IS-A). Subclassing an abstract class tightly couples the child to the parent\'s internal implementation details and consumes the child\'s single inheritance slot. Composition combined with interfaces allows swappable behavior at runtime, avoids fragile base class issues, and allows implementing multiple capabilities.',
        followUp: 'When is inheritance genuinely superior to composition?',
        followUpAnswer: 'Inheritance is superior when there is a true, permanent subtype relationship (Liskov Substitution holds), where polymorphic dispatch across the entire hierarchy is required, and where substantial invariant code is shared.',
        keyPhrases: [
          'HAS-A vs IS-A',
          'Fragile base class problem',
          'Tightly coupled hierarchies',
          'Liskov Substitution Principle'
        ],
        commonMistakeAnswer: 'Claiming inheritance should never be used anywhere in Java.'
      },
      {
        question: 'What happens if you try to override equals() or hashCode() as a default method in an interface?',
        answer: 'The Java compiler will reject it with an error: "default method equals in interface overrides a member of java.lang.Object". The Java Language Specification explicitly forbids interfaces from declaring default implementations of any method from `java.lang.Object` (such as `equals`, `hashCode`, or `toString`). This is because the JVM\'s "classes always win" rule means `Object`\'s concrete implementation would always take precedence anyway, rendering an interface default implementation completely useless.',
        followUp: 'Can an interface declare equals(Object) as an abstract method?',
        followUpAnswer: 'Yes, an interface can declare `boolean equals(Object obj);` as an abstract method. This is often done to attach custom Javadoc or enforce a specific equality contract.',
        keyPhrases: [
          'Classes always win rule',
          'Object methods cannot be default',
          'Compiler error',
          'Abstract re-declaration allowed'
        ],
        commonMistakeAnswer: 'Thinking you can provide a universal default equals() implementation in an interface.'
      },
      {
        question: 'How do abstract classes and interfaces differ in their impact on binary compatibility when adding new methods?',
        answer: 'Adding a new abstract method to an abstract class is a binary and source incompatible breaking change: all existing compiled and source concrete subclasses will fail to compile. Adding a new method to an interface was also breaking prior to Java 8. However, with Java 8+ `default` methods, you can add new methods to an interface with full binary and source compatibility, as existing implementors inherit the default implementation automatically.',
        followUp: 'What if you add a concrete method to an abstract class? Is that breaking?',
        followUpAnswer: 'Adding a concrete method to an abstract class is generally non-breaking, provided the new method name does not conflict with existing subclass methods.',
        keyPhrases: [
          'Binary compatibility',
          'Source breaking change',
          'Default method backwards compatibility',
          'Abstract method breakage'
        ],
        commonMistakeAnswer: 'Believing that adding any method to an interface always breaks existing code.'
      },
      {
        question: 'Can an abstract class implement an interface and change its public methods to protected?',
        answer: 'No. The Java overriding rule states that an overriding method cannot reduce the visibility of the method it overrides. Since all abstract methods in an interface are implicitly `public`, any class (including an abstract class) that implements or overrides that method must declare it `public`.',
        followUp: 'Can an abstract class re-declare an interface method as abstract?',
        followUpAnswer: 'Yes. An abstract class can re-declare an interface method as `public abstract void method();` to force concrete subclasses to provide an explicit override.',
        keyPhrases: [
          'Visibility reduction prohibition',
          'Implicit public interface methods',
          'Abstract re-declaration',
          'Liskov Substitution Principle'
        ],
        commonMistakeAnswer: 'Thinking abstract classes can hide interface methods by making them protected.'
      },
      {
        question: 'Why is it considered bad practice to use an interface purely to declare constants (the Constant Interface Antipattern)?',
        answer: 'The Constant Interface Antipattern (Effective Java Item 22) occurs when an interface contains only `public static final` constants and no methods, implemented by classes to avoid typing `ClassName.CONSTANT`. This is a serious anti-pattern because constants are internal implementation details; implementing the interface leaks those internal constants into the class\'s exported public API and permanently pollutes the namespace of all subclasses.',
        followUp: 'What should be used instead of a constant interface in modern Java?',
        followUpAnswer: 'Use an uninstantiable utility class with private constructor and `public static final` constants, imported where needed using `import static`, or use an `enum` for type-safe sets of values.',
        keyPhrases: [
          'Constant Interface Antipattern',
          'Implementation detail leak',
          'Public API pollution',
          'Static import or Enum alternative'
        ],
        commonMistakeAnswer: 'Thinking constant interfaces are the recommended standard way to share constants.'
      },
      {
        question: 'How do HotSpot JVM call sites differ when invoking methods via abstract classes versus interfaces?',
        answer: 'At the bytecode level, methods invoked on an abstract class reference typically use the `invokevirtual` instruction, which indexes into a fixed virtual method table (vtable) associated with the class. Methods invoked on an interface reference use the `invokeinterface` instruction, which must search an interface table (itable) because different classes may implement the interface at different table offsets. While `invokeinterface` used to be slower, modern JVMs use sophisticated monomorphic and bimorphic inline caching to make both virtually identical in execution speed.',
        followUp: 'What bytecode instruction is used to invoke a static method defined in an interface?',
        followUpAnswer: '`invokestatic`, targeting the interface type directly (e.g., `invokestatic InterfaceName.method()`).',
        keyPhrases: [
          'invokevirtual vs invokeinterface',
          'vtable vs itable lookup',
          'HotSpot inline caching',
          'Negligible modern performance delta'
        ],
        commonMistakeAnswer: 'Claiming that interfaces are 10x slower than abstract classes in modern Java.'
      },
      {
        question: 'What is the "Mixin" pattern and how do interfaces enable it?',
        answer: 'A mixin is a type that a class can implement to declare that it provides an optional, supplementary behavior in addition to its primary identity. Interfaces are ideal for mixins because classes can implement multiple interfaces. For instance, `Comparable` is a mixin: a `Car` or `Employee` implements `Comparable` to declare that its instances can be ordered, without altering its fundamental IS-A class taxonomy.',
        followUp: 'Why can abstract classes not be used as mixins in Java?',
        followUpAnswer: 'Because Java only supports single class inheritance. If a mixin were an abstract class, a class could only mix in one capability and would forfeit its ability to extend any other base class.',
        keyPhrases: [
          'Mixin capability',
          'Supplementary behavior',
          'Comparable interface example',
          'Blocked by single inheritance'
        ],
        commonMistakeAnswer: 'Confusing mixins with standard class inheritance.'
      }
    ],
    miniQuiz: [
      {
        question: 'When should you choose an abstract class over an interface in Java?',
        options: [
          'When you want to implement multiple inheritance of type.',
          'When you need to define non-static mutable instance fields and constructors.',
          'When you are defining a public API for third-party consumers.',
          'When you only have methods with no implementation.'
        ],
        correctIndex: 1,
        explanation: 'Abstract classes are required when your design demands instance state (non-static mutable fields) and constructor chaining.'
      },
      {
        question: 'What is the primary drawback of using an abstract class to define a type instead of an interface?',
        options: [
          'Abstract classes run much slower in the JVM.',
          'Abstract classes consume the single inheritance slot of any subclass.',
          'Abstract classes cannot have concrete methods.',
          'Abstract classes cannot be declared public.'
        ],
        correctIndex: 1,
        explanation: 'Because Java only allows single class inheritance, extending an abstract class burns the child\'s only superclass slot.'
      },
      {
        question: 'Which of the following is considered an anti-pattern in Java design?',
        options: [
          'The Skeletal Implementation pattern.',
          'The Constant Interface pattern (an interface containing only constants).',
          'Using interfaces as mixins.',
          'Declaring protected methods in an abstract class.'
        ],
        correctIndex: 1,
        explanation: 'The Constant Interface pattern leaks internal constants into the exported API and namespace of all implementors.'
      },
      {
        question: 'Can an interface declare protected methods?',
        options: [
          'Yes, in Java 9+.',
          'Yes, if the method is static.',
          'No, interface methods cannot be protected.',
          'Yes, if the implementing class is in the same package.'
        ],
        correctIndex: 2,
        explanation: 'Interfaces cannot have protected methods. Abstract methods in interfaces are strictly public.'
      },
      {
        question: 'What happens if you define a default method in an interface that overrides `toString()` from Object?',
        options: [
          'It compiles and replaces the default Object.toString().',
          'The compiler rejects it because default methods cannot override Object methods.',
          'It compiles, but is ignored at runtime.',
          'It throws an UnsupportedOperationException.'
        ],
        correctIndex: 1,
        explanation: 'The Java compiler explicitly forbids default methods from overriding methods of java.lang.Object.'
      },
      {
        question: 'What is a "mixin" interface in Java?',
        options: [
          'An interface that mixes Java and Kotlin code.',
          'An interface implemented by a class to declare optional supplementary behavior (e.g., Comparable).',
          'An interface that contains both abstract and default methods.',
          'An interface with multiple extends clauses.'
        ],
        correctIndex: 1,
        explanation: 'A mixin is an optional capability (like Comparable or AutoCloseable) that can be mixed into any class regardless of primary taxonomy.'
      },
      {
        question: 'If class C implements interface I, and C\'s superclass P already provides a public method matching I\'s signature, what must C do?',
        options: [
          'C must explicitly override the method.',
          'C does not need to do anything; P\'s method satisfies I.',
          'C must declare itself abstract.',
          'C causes a compile-time collision error.'
        ],
        correctIndex: 1,
        explanation: 'An existing public concrete method inherited from a superclass directly satisfies an interface contract.'
      },
      {
        question: 'What is the "Skeletal Implementation" pattern?',
        options: [
          'An interface with only private methods.',
          'An interface defining the API paired with an abstract class providing common logic.',
          'A class with no fields.',
          'An abstract class with no subclasses.'
        ],
        correctIndex: 1,
        explanation: 'The Skeletal Implementation pattern pairs a public interface with an abstract base class (like Collection + AbstractCollection).'
      },
      {
        question: 'Can an abstract class define `final` methods?',
        options: [
          'No, all methods in an abstract class must be overridable.',
          'Yes, to prevent subclasses from altering specific critical logic.',
          'Yes, but only if they are private.',
          'No, final and abstract keywords cannot exist in the same file.'
        ],
        correctIndex: 1,
        explanation: 'An abstract class can declare concrete methods as `final` to lock down algorithms (like in the Template Method pattern).'
      },
      {
        question: 'Which bytecode instruction is used by the JVM for method invocations through an interface reference?',
        options: [
          'invokevirtual',
          'invokestatic',
          'invokeinterface',
          'invokespecial'
        ],
        correctIndex: 2,
        explanation: 'The JVM uses `invokeinterface` for method calls made through an interface reference type.'
      }
    ]
  },

  'default-and-static-interface-methods': {
    id: 'default-and-static-interface-methods',
    moduleId: 'java-abstraction',
    moduleTitle: '13. Abstraction & Interfaces',
    lessonNumber: 'Lesson 13.4',
    title: 'Java 8+ Default & Static Methods in Interfaces',
    subtitle: 'Interface evolution without breaking implementations, the default keyword, resolution rules for multiple inheritance conflicts, and utility static methods',
    estimatedMinutes: 22,
    beginnerAnalogy: 'Imagine a municipality issuing a mandatory building code contract to hundreds of independent homeowners: "Every house must have an electrical breaker box and a water meter." For twenty years, homeowners complied. Then, the city decides every home should also have an emergency solar-powered surge protector. If the city simply made it a mandatory empty requirement, hundreds of homeowners would be in immediate violation of the law overnight. Instead, the city supplies a pre-assembled, standardized default surge protector to everyone (a `default` method). Any homeowner who wants a custom high-end surge protector can replace the default with their own (overriding), but those who do nothing remain fully compliant without breaking their existing homes.',
    coreExplanation: [
      'Java 8 introduced `default` methods in interfaces to enable "Interface Evolution"—allowing developers and library authors to add new methods to existing interfaces without breaking any existing implementing classes.',
      'A default method is declared with the `default` keyword and must provide a concrete implementation body `{}` inside the interface.',
      'Implementing classes inherit default methods automatically. A class may choose to keep the inherited default implementation, override it with custom logic, or re-declare it as `abstract` (if the class is abstract).',
      'Java 8 also introduced `static` methods in interfaces. Static interface methods belong strictly to the interface itself; they are NOT inherited by implementing classes and can only be invoked via `InterfaceName.methodName()`.',
      'The Conflict Resolution Rules (The Diamond Problem for Default Methods): 1) "Classes Win": A method declaration in a superclass or ancestor class always takes precedence over any interface default method.',
      '2) "Sub-interfaces Win": If an interface inherits or overrides a default method from a super-interface, the more specific sub-interface implementation takes precedence.',
      '3) "Explicit Resolution Required": If a class implements two completely independent interfaces that provide conflicting default methods with the same signature, the compiler throws an error. The implementing class MUST override the method and explicitly resolve the conflict, optionally delegating using `InterfaceName.super.methodName()`.',
      'Interfaces cannot provide default implementations for `java.lang.Object` methods (`equals`, `hashCode`, `toString`). The compiler rejects this because the "classes win" rule means `Object`\'s concrete implementation would always override the interface default anyway.'
    ],
    diagram: `===================== DEFAULT METHOD RESOLUTION RULES =====================

 RULE 1: CLASSES WIN                  RULE 2: SUB-INTERFACES WIN
  +-------------------+                +-------------------+
  | class SuperClass  |                |    interface A    |
  | + ping() { "A" }  |                | + ping() { "A" }  |
  +-------------------+                +-------------------+
           ▲                                     ▲
           │ extends                             │ extends
  +-------------------+   implements   +-------------------+
  |    class Child    | -------------> |    interface B    |
  | (wins over iface) |                | + ping() { "B" }  | (more specific wins)
  +-------------------+                +-------------------+
  Result: Child calls SuperClass.ping() Result: ping() returns "B"

 ──────────────────────────────────────────────────────────────────────────
 RULE 3: SIBLING CONFLICT REQUIRES EXPLICIT RESOLUTION
         interface Alpha                      interface Beta
      +--------------------+               +--------------------+
      | default void run() |               | default void run() |
      +--------------------+               +--------------------+
                ▲                                     ▲
                │ implements Alpha, Beta              │
                +------------------+------------------+
                                   │
                   +-------------------------------+
                   |          class Child          |
                   | MUST override run()!          |
                   | Alpha.super.run(); // or Beta |
                   +-------------------------------+`,
    codeSnippet: {
      title: 'Default Method Conflict Resolution and Static Interface Utilities',
      code: `interface EncryptionService {
    // Static utility method belonging to interface
    static String getStandardAlgorithm() {
        return "AES-256-GCM";
    }

    // Default method providing fallback implementation
    default void logSecurityEvent(String event) {
        System.out.println("[AUDIT LOG - " + getStandardAlgorithm() + "] " + event);
    }

    void encrypt(String payload);
}

interface AlertNotifier {
    default void logSecurityEvent(String event) {
        System.out.println("[SMS ALERT] " + event);
    }
}

// Implements two interfaces with conflicting default logSecurityEvent()
class CloudSecurityManager implements EncryptionService, AlertNotifier {
    @Override
    public void encrypt(String payload) {
        System.out.println("Encrypting payload using " + EncryptionService.getStandardAlgorithm());
    }

    // MANDATORY OVERRIDE to resolve conflict
    @Override
    public void logSecurityEvent(String event) {
        // Explicitly choose and delegate to EncryptionService's default
        EncryptionService.super.logSecurityEvent(event);
        // And optionally add supplemental notification
        System.out.println("-> Broadcasted to internal monitoring queue.");
    }
}

public class Main {
    public static void main(String[] args) {
        CloudSecurityManager manager = new CloudSecurityManager();
        manager.encrypt("UserCredentials");
        manager.logSecurityEvent("Unauthorized access attempt blocked.");

        // Calling static interface method directly
        System.out.println("Active standard: " + EncryptionService.getStandardAlgorithm());
    }
}`,
      lineByLineExplanation: [
        {
          line: 'static String getStandardAlgorithm()',
          explanation: 'Static utility method inside an interface; can only be invoked via EncryptionService.getStandardAlgorithm().'
        },
        {
          line: 'default void logSecurityEvent(String event)',
          explanation: 'Default method providing a concrete implementation body directly inside the interface.'
        },
        {
          line: 'class CloudSecurityManager implements EncryptionService, AlertNotifier',
          explanation: 'Class implements two interfaces that both supply a default logSecurityEvent() method with identical signatures.'
        },
        {
          line: 'public void logSecurityEvent(String event)',
          explanation: 'Mandatory override: because two unrelated interfaces provided default methods, the class must resolve the ambiguity.'
        },
        {
          line: 'EncryptionService.super.logSecurityEvent(event);',
          explanation: 'Special super-dispatch syntax used to explicitly invoke a specific parent interface\'s default implementation.'
        }
      ],
      output: `Encrypting payload using AES-256-GCM
[AUDIT LOG - AES-256-GCM] Unauthorized access attempt blocked.
-> Broadcasted to internal monitoring queue.
Active standard: AES-256-GCM`
    },
    codeExamples: [
      {
        title: 'Rule 1 Demonstration: Classes Always Win Over Interface Defaults',
        description: 'Shows that a concrete method inherited from a superclass always takes precedence over an interface default method.',
        code: `interface Messenger {
    default void sendMessage(String msg) {
        System.out.println("Interface default sending: " + msg);
    }
}

class BaseMessenger {
    public void sendMessage(String msg) {
        System.out.println("BaseClass implementation sending: " + msg);
    }
}

// Extends class and implements interface with identical method
class SecureMessenger extends BaseMessenger implements Messenger {
    // Does not override sendMessage()
}

public class Rule1App {
    public static void main(String[] args) {
        SecureMessenger sm = new SecureMessenger();
        sm.sendMessage("Mission update");

        // Even via interface reference, class implementation wins!
        Messenger m = sm;
        m.sendMessage("Direct contract call");
    }
}`,
        output: `BaseClass implementation sending: Mission update
BaseClass implementation sending: Direct contract call`
      },
      {
        title: 'Rule 2 Demonstration: More Specific Sub-Interface Beats Super-Interface',
        description: 'Shows how sub-interfaces can override default methods from parent interfaces.',
        code: `interface Printer {
    default void printDocument() {
        System.out.println("Standard monochrome low-res printing.");
    }
}

interface PhotoPrinter extends Printer {
    @Override
    default void printDocument() {
        System.out.println("High-definition photo color printing with gloss finish.");
    }
}

class StudioDevice implements PhotoPrinter {
    // Inherits printDocument()
}

public class Rule2App {
    public static void main(String[] args) {
        StudioDevice device = new StudioDevice();
        device.printDocument();

        Printer p = device;
        p.printDocument(); // Still outputs PhotoPrinter version!
    }
}`,
        output: `High-definition photo color printing with gloss finish.
High-definition photo color printing with gloss finish.`
      }
    ],
    cheatSheet: {
      summary: 'Java 8 default methods allow interfaces to evolve without breaking existing code. When default methods conflict, remember: 1) Classes win, 2) Sub-interfaces win, 3) Sibling collisions require explicit override.',
      syntaxTemplate: `public interface EvolvableInterface {
    // 1. Static interface utility
    static void utilityHelper() { /* ... */ }

    // 2. Default method with fallback body
    default void optionalAction() {
        System.out.println("Default fallback action");
    }

    // 3. Abstract core method
    void mandatoryAction();
}

// Conflict Resolution Syntax
public class Implementor implements InterfaceA, InterfaceB {
    @Override
    public void conflictingMethod() {
        InterfaceA.super.conflictingMethod(); // Explicit delegation
    }
}`,
      rules: [
        {
          rule: 'Default Keyword Requirement',
          explanation: 'Methods with bodies in interfaces must be explicitly marked with either default or static (or private in Java 9+).'
        },
        {
          rule: 'Rule 1: Classes Always Win',
          explanation: 'Any concrete method implementation in a superclass takes precedence over any interface default method.'
        },
        {
          rule: 'Rule 2: Sub-Interfaces Win',
          explanation: 'A default method in an extending sub-interface overrides the default method from an ancestor interface.'
        },
        {
          rule: 'Rule 3: Ambiguity Requires Override',
          explanation: 'If two unrelated interfaces define conflicting default methods, the implementing class must explicitly override it.'
        },
        {
          rule: 'Static Methods Are Not Inherited',
          explanation: 'Static interface methods belong exclusively to the declaring interface and cannot be called through implementor references.'
        },
        {
          rule: 'Object Methods Cannot Be Default',
          explanation: 'Interfaces cannot define default methods for equals(), hashCode(), or toString().'
        }
      ],
      quickComparison: [
        {
          aspect: 'Invocation',
          optionA: 'Default Method: Invoked on an instance of an implementing class',
          optionB: 'Static Method: Invoked exclusively via InterfaceName.methodName()'
        },
        {
          aspect: 'Inheritance by Class',
          optionA: 'Default Method: Inherited by implementing classes automatically',
          optionB: 'Static Method: NOT inherited by implementing classes'
        },
        {
          aspect: 'Overriding in Class',
          optionA: 'Default Method: Can be freely overridden by implementing class',
          optionB: 'Static Method: Cannot be overridden; class method with same name hides it'
        },
        {
          aspect: 'State Access',
          optionA: 'Default Method: Can invoke other interface abstract/default methods',
          optionB: 'Static Method: Cannot access non-static methods or instance context'
        },
        {
          aspect: 'Primary Purpose',
          optionA: 'Default Method: Interface evolution and optional behavior fallback',
          optionB: 'Static Method: Utility helper functions tightly bound to the contract'
        },
        {
          aspect: 'Bytecode Instruction',
          optionA: 'Default Method: invokespecial for Interface.super.method(); invokeinterface/invokevirtual on instance',
          optionB: 'Static Method: invokestatic InterfaceName.methodName'
        },
        {
          aspect: 'Time & Space Complexity',
          optionA: 'Default Method: O(1) invocation; zero state allocation in interface',
          optionB: 'Static Method: O(1) direct call; inlined by JIT compiler'
        }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to invoke an interface static method using an implementing class or object reference.',
        whyItHappens: 'In standard class inheritance, static methods can be called via `ChildClass.staticMethod()`. Beginners assume interface static methods work the same.',
        howToFix: 'Interface static methods are NOT inherited. You must invoke them directly on the declaring interface: `InterfaceName.staticMethod()`.'
      },
      {
        mistake: 'Calling super.method() instead of InterfaceName.super.method() when resolving conflicts.',
        whyItHappens: 'Accustomed to writing `super.method()` in classes.',
        howToFix: 'When resolving default method conflicts across interfaces, you must specify WHICH interface you are delegating to: `InterfaceA.super.method()`.'
      },
      {
        mistake: 'Failing to override a method when two interfaces provide conflicting default implementations.',
        whyItHappens: 'Hoping the compiler will arbitrarily pick one of the default methods.',
        howToFix: 'The compiler refuses to guess. You MUST provide an `@Override` in the implementing class to eliminate the ambiguity.'
      },
      {
        mistake: 'Attempting to declare a default method for equals() or hashCode() in an interface.',
        whyItHappens: 'Trying to provide a common equality implementation for all implementors.',
        howToFix: 'Java explicitly forbids this. Use an abstract skeletal class if you need to provide a shared equals/hashCode implementation.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Classes Win Rule in Action',
        problemStatement: 'What does this program print?',
        code: `interface Speaker {
    default void speak() {
        System.out.print("SpeakerDefault ");
    }
}

class Animal {
    public void speak() {
        System.out.print("AnimalRoar ");
    }
}

class Dog extends Animal implements Speaker {
    // No speak() method in Dog
}

public class Main {
    public static void main(String[] args) {
        Speaker s = new Dog();
        s.speak();
    }
}`,
        options: [
          'AnimalRoar ',
          'SpeakerDefault ',
          'Compilation Error: conflict between Animal and Speaker',
          'AnimalRoar SpeakerDefault '
        ],
        correctOptionIndex: 0,
        hint: 'Remember Rule 1: Classes always win over interface default methods.',
        solution: 'AnimalRoar ',
        explanation: 'According to the "classes win" rule (JLS §9.4.1), any concrete method in a superclass (`Animal.speak()`) takes precedence over any interface default method (`Speaker.speak()`). Even though `s` is a `Speaker` reference, it prints "AnimalRoar ".'
      },
      {
        title: 'Puzzle 2: Calling Interface Static Method on Subclass',
        problemStatement: 'What happens when compiling and executing the following snippet?',
        code: `interface MathUtil {
    static int doubleVal(int x) {
        return x * 2;
    }
}

class Calculator implements MathUtil {
    // Empty class
}

public class Main {
    public static void main(String[] args) {
        // Line A:
        System.out.print(MathUtil.doubleVal(5) + " ");
        // Line B:
        // System.out.print(Calculator.doubleVal(5));
    }
}`,
        options: [
          'Prints: 10 ',
          'Line B would cause a compilation error if uncommented: cannot find symbol doubleVal in Calculator',
          'Both A and B are true statements',
          'Prints: 10 10'
        ],
        correctOptionIndex: 2,
        hint: 'Are static methods in interfaces inherited by implementing classes?',
        solution: 'Both A and B are true statements',
        explanation: 'Static methods in interfaces are NOT inherited by implementing classes. `MathUtil.doubleVal(5)` compiles and prints 10. If Line B were uncommented, compilation would fail because `Calculator` does not inherit `doubleVal`. Both statements are true.'
      },
      {
        title: 'Puzzle 3: Sub-Interface Default Method Override',
        problemStatement: 'What is the output of the following program?',
        code: `interface Device {
    default void status() {
        System.out.print("DeviceReady ");
    }
}

interface SmartDevice extends Device {
    @Override
    default void status() {
        System.out.print("SmartReady ");
    }
}

class Phone implements SmartDevice {
    // Inherits status()
}

public class Main {
    public static void main(String[] args) {
        Device d = new Phone();
        d.status();
    }
}`,
        options: [
          'SmartReady ',
          'DeviceReady ',
          'Compilation Error: ambiguous status() implementation',
          'DeviceReady SmartReady '
        ],
        correctOptionIndex: 0,
        hint: 'Remember Rule 2: The more specific sub-interface overrides the super-interface.',
        solution: 'SmartReady ',
        explanation: 'Under Rule 2 ("sub-interfaces win"), `SmartDevice` is more specific than `Device` and overrides `status()`. `Phone` inherits `SmartDevice`\'s implementation. Output: "SmartReady ".'
      },
      {
        title: 'Puzzle 4: Sibling Default Conflict Without Override',
        problemStatement: 'What is the compilation result of the following code?',
        code: `interface Left {
    default void ping() { System.out.print("L"); }
}

interface Right {
    default void ping() { System.out.print("R"); }
}

class Center implements Left, Right {
    // Does not override ping()
}

public class Main {
    public static void main(String[] args) {
        new Center().ping();
    }
}`,
        options: [
          'Prints: L',
          'Prints: R',
          'Compile-time error: Center inherits unrelated defaults for ping() from types Left and Right',
          'Runtime IncompatibleClassChangeError'
        ],
        correctOptionIndex: 2,
        hint: 'When two unrelated interfaces define conflicting default methods, who must resolve it?',
        solution: 'Compile-time error: Center inherits unrelated defaults for ping() from types Left and Right',
        explanation: 'When two sibling interfaces provide default methods with the exact same signature, the compiler refuses to guess which one to use. `Center` fails compilation with: "class Center inherits unrelated defaults for ping() from types Left and Right".'
      },
      {
        title: 'Puzzle 5: Explicit Interface Super Dispatch Syntax',
        problemStatement: 'What does this program print?',
        code: `interface Alpha {
    default void run() { System.out.print("A"); }
}

interface Beta {
    default void run() { System.out.print("B"); }
}

class Runner implements Alpha, Beta {
    @Override
    public void run() {
        Beta.super.run();
        System.out.print("!");
    }
}

public class Main {
    public static void main(String[] args) {
        new Runner().run();
    }
}`,
        options: [
          'B!',
          'A!',
          'AB!',
          'Compilation Error: illegal super syntax'
        ],
        correctOptionIndex: 0,
        hint: 'Beta.super.run() delegates explicitly to Beta\'s default method.',
        solution: 'B!',
        explanation: '`Runner` resolves the sibling conflict by overriding `run()` and explicitly delegating to `Beta.super.run()`, which prints "B". Then `Runner` prints "!", resulting in "B!".'
      },
      {
        title: 'Puzzle 6: Re-abstracting a Default Method',
        problemStatement: 'Can an intermediate interface make a default method abstract again? What happens here?',
        code: `interface A {
    default void show() { System.out.print("A"); }
}

interface B extends A {
    @Override
    void show(); // Re-abstracted!
}

class C implements B {
    @Override
    public void show() {
        System.out.print("C");
    }
}

public class Main {
    public static void main(String[] args) {
        A obj = new C();
        obj.show();
    }
}`,
        options: [
          'C',
          'A',
          'Compilation Error: interface B cannot re-declare show() as abstract',
          'Runtime AbstractMethodError'
        ],
        correctOptionIndex: 0,
        hint: 'An extending interface can explicitly re-declare an inherited default method as abstract.',
        solution: 'C',
        explanation: 'In Java, an interface can override a super-interface\'s default method and declare it `abstract` with no body, forcing all downstream implementors of `B` to provide an explicit implementation. Class `C` implements `show()` and prints "C".'
      },
      {
        title: 'Puzzle 7: Default Method Calling Abstract Method Polymorphically',
        problemStatement: 'What is the output of this code?',
        code: `interface Calculator {
    int getBase();
    default int calculate() {
        return getBase() * 10;
    }
}

class SimpleCalc implements Calculator {
    private int val;
    public SimpleCalc(int val) { this.val = val; }
    @Override
    public int getBase() { return val + 2; }
}

public class Main {
    public static void main(String[] args) {
        Calculator c = new SimpleCalc(3);
        System.out.println(c.calculate());
    }
}`,
        options: [
          '50',
          '30',
          '20',
          'Compilation Error: default method cannot call abstract method'
        ],
        correctOptionIndex: 0,
        hint: 'Default calculate() calls getBase(). SimpleCalc.getBase() returns 3 + 2 = 5.',
        solution: '50',
        explanation: 'Default methods can invoke abstract methods defined in the same interface. At runtime, `c.calculate()` invokes `SimpleCalc.getBase()`, which returns 3 + 2 = 5. Then 5 * 10 = 50 is returned and printed.'
      },
      {
        title: 'Puzzle 8: Static Method Hiding in Implementing Class',
        problemStatement: 'What does this program print?',
        code: `interface Formatter {
    static void printInfo() {
        System.out.print("InterfaceInfo ");
    }
}

class CustomFormatter implements Formatter {
    public static void printInfo() {
        System.out.print("ClassInfo ");
    }
}

public class Main {
    public static void main(String[] args) {
        CustomFormatter.printInfo();
        Formatter.printInfo();
    }
}`,
        options: [
          'ClassInfo InterfaceInfo ',
          'InterfaceInfo InterfaceInfo ',
          'ClassInfo ClassInfo ',
          'Compilation Error: cannot hide interface static method'
        ],
        correctOptionIndex: 0,
        hint: 'Static methods belong to their respective classes/interfaces and do not participate in dynamic dispatch.',
        solution: 'ClassInfo InterfaceInfo ',
        explanation: 'Static methods in interfaces do not participate in polymorphism. `CustomFormatter.printInfo()` calls its own static method ("ClassInfo "), while `Formatter.printInfo()` calls the interface static method ("InterfaceInfo "). Output: "ClassInfo InterfaceInfo ".'
      },
      {
        title: 'Puzzle 9: Sibling Default Methods Explicit Super Delegation',
        problemStatement: 'What does this program print?',
        code: `interface Alpha {
    default void ping() { System.out.print("Alpha "); }
}
interface Beta {
    default void ping() { System.out.print("Beta "); }
}
class Service implements Alpha, Beta {
    @Override
    public void ping() {
        Beta.super.ping();
        System.out.print("Custom ");
    }
}
public class Main {
    public static void main(String[] args) {
        Alpha a = new Service();
        a.ping();
    }
}`,
        options: [
          'Beta Custom ',
          'Alpha Custom ',
          'Beta ',
          'Compilation Error: duplicate default method'
        ],
        correctOptionIndex: 0,
        hint: 'Service explicitly resolves the conflict by delegating to Beta.super.ping() and then printing "Custom ".',
        solution: 'Beta Custom ',
        explanation: 'Because both Alpha and Beta supply ping(), Service must resolve the conflict. Service invokes Beta.super.ping() (printing "Beta ") and then prints "Custom ". Output: "Beta Custom ".'
      },
      {
        title: 'Puzzle 10: Re-Abstracting a Default Method in Sub-Interface',
        problemStatement: 'What is printed by this re-abstracted interface hierarchy?',
        code: `interface Printable {
    default void print() {
        System.out.print("DefaultPrint ");
    }
}
interface MandatoryPrintable extends Printable {
    @Override
    void print(); // re-abstracted
}
class Document implements MandatoryPrintable {
    @Override
    public void print() {
        System.out.print("DocPrint ");
    }
}
public class Main {
    public static void main(String[] args) {
        Printable p = new Document();
        p.print();
    }
}`,
        options: [
          'DocPrint ',
          'DefaultPrint ',
          'Compilation Error: cannot override default method with abstract',
          'Runtime Error'
        ],
        correctOptionIndex: 0,
        hint: 'A sub-interface is allowed to re-abstract an inherited default method, forcing implementing classes to provide a new body.',
        solution: 'DocPrint ',
        explanation: 'MandatoryPrintable re-abstracts print() by declaring it without a body and without default. Document is therefore forced to provide a concrete implementation, printing "DocPrint ".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why were default methods introduced in Java 8, and what problem do they solve?',
        answer: 'Default methods were introduced primarily to solve the problem of "Interface Evolution." Prior to Java 8, adding a new method to an existing interface was a fatal breaking change for all existing implementations across the entire Java ecosystem. In Java 8, the Java architects needed to add functional stream operations (like `stream()`, `forEach()`, `removeIf()`) to core interfaces like `java.util.Collection`. By allowing interfaces to declare default method bodies, new methods could be added to legacy interfaces while maintaining 100% backwards compatibility with billions of lines of existing code.',
        followUp: 'How do default methods differ from concrete methods in an abstract class?',
        followUpAnswer: 'Default methods in interfaces cannot maintain instance state (fields) or invoke constructors. They operate solely on parameters, constants, and other methods exposed by the interface.',
        keyPhrases: [
          'Interface evolution',
          'Backwards compatibility',
          'Non-breaking interface updates',
          'No instance state access'
        ],
        commonMistakeAnswer: 'Saying default methods were introduced to turn interfaces into abstract classes.'
      },
      {
        question: 'Explain the three rules of conflict resolution for default methods in Java.',
        answer: 'When resolving default method conflicts, Java follows three strict rules: 1) "Classes Always Win": A method declaration in a superclass or ancestor class always takes priority over any interface default method. 2) "Sub-interfaces Win": If interface B extends interface A and overrides its default method, interface B\'s implementation takes priority for any class implementing B. 3) "Explicit Resolution Required": If a class implements two unrelated sibling interfaces providing default methods with identical signatures, the compiler throws an error. The programmer must explicitly override the method and resolve the conflict (e.g. using `InterfaceName.super.methodName()`).',
        followUp: 'What happens if one interface provides a default method and a sibling interface declares the same method as abstract?',
        followUpAnswer: 'The class still fails to compile! The collision between a default method and an abstract method with the same signature in sibling interfaces still requires the implementing class to provide an explicit override.',
        keyPhrases: [
          'Classes always win',
          'Sub-interfaces win (most specific)',
          'Explicit conflict override',
          'InterfaceName.super delegation'
        ],
        commonMistakeAnswer: 'Believing the compiler will pick the first interface listed in the implements clause.'
      },
      {
        question: 'Are static methods in interfaces inherited by implementing classes? Why was this design chosen?',
        answer: 'No. Unlike static methods in classes (which are inherited by subclasses), static methods in interfaces are strictly NOT inherited by implementing classes. They can only be invoked directly via `InterfaceName.staticMethodName()`. This design was chosen to prevent namespace pollution and avoid subtle multiple inheritance bugs—for example, if a class implemented two interfaces that each defined a static `of()` or `builder()` method, inheriting both into the class namespace would create rampant ambiguity.',
        followUp: 'Can you call an interface static method using an instance of the implementing class?',
        followUpAnswer: 'No! Writing `instance.staticMethod()` for an interface static method triggers a compile-time error: "illegal static interface method call".',
        keyPhrases: [
          'Not inherited by implementors',
          'Direct InterfaceName invocation',
          'Namespace pollution prevention',
          'Multiple inheritance ambiguity avoidance'
        ],
        commonMistakeAnswer: 'Assuming interface static methods can be called via ClassName.methodName().'
      },
      {
        question: 'Can an interface provide a default implementation for Object methods like equals(), hashCode(), or toString()?',
        answer: 'No. The Java compiler explicitly prohibits interfaces from declaring default methods that override any public method of `java.lang.Object`. If you attempt to write `default boolean equals(Object o)` in an interface, compilation fails. The reason is rooted in Rule 1 ("Classes Win"): because every Java class ultimately inherits from `java.lang.Object`, the concrete implementations in `Object` would always override the interface default method, rendering it completely unreachable and dead.',
        followUp: 'Can an interface declare equals(Object o) as an abstract method?',
        followUpAnswer: 'Yes, an interface can declare `boolean equals(Object o);` as an abstract method. This is legal and is used in interfaces like `java.util.Comparator` to document custom equality requirements.',
        keyPhrases: [
          'Classes win rule consequence',
          'Object methods always take precedence',
          'Compiler error',
          'Abstract re-declaration allowed'
        ],
        commonMistakeAnswer: 'Thinking you can write a default toString() method in an interface to format all implementors.'
      },
      {
        question: 'What is the exact syntax for invoking an interface default method from an overriding class method?',
        answer: 'The syntax is `InterfaceName.super.methodName(arguments);`. For example, if class `App` implements `Loggable` and overrides `log()`, it can invoke the interface\'s original default implementation by calling `Loggable.super.log(msg);`. Writing just `super.log(msg)` would attempt to look up `log()` in the class\'s superclass, not the interface.',
        followUp: 'Can a class invoke the default method of an indirect grandparent interface?',
        followUpAnswer: 'No. You can only use `InterfaceName.super` for interfaces that are directly declared in the class\'s own `implements` clause (or immediate super-interface in an interface hierarchy).',
        keyPhrases: [
          'InterfaceName.super.method()',
          'Disambiguated super call',
          'Direct interface requirement',
          'Superclass vs interface distinction'
        ],
        commonMistakeAnswer: 'Writing super.InterfaceName.method() or just super.method().'
      },
      {
        question: 'Can a default method in an interface be marked final, synchronized, or native?',
        answer: 'No, none of those modifiers are permitted on default methods. 1) `final` is forbidden because default methods are fundamentally designed to allow implementing classes to override them if desired. 2) `synchronized` is forbidden because interfaces cannot own or manage the monitor lock of arbitrary implementing instances. 3) `native` is forbidden because default methods must have Java bodies defined within the interface.',
        followUp: 'Can an implementing class mark its override of a default method as synchronized or final?',
        followUpAnswer: 'Yes! Once an implementing class overrides the method, it can apply `synchronized`, `final`, or other valid class method modifiers.',
        keyPhrases: [
          'Forbidden final modifier',
          'Forbidden synchronized modifier',
          'Monitor lock ownership',
          'Overriding class modifier freedom'
        ],
        commonMistakeAnswer: 'Thinking default methods can be synchronized to make them thread-safe.'
      },
      {
        question: 'What purpose do private methods serve in interfaces starting from Java 9?',
        answer: 'Java 9 introduced private (and private static) methods in interfaces purely for internal code reuse and encapsulation within the interface. When an interface defines multiple default or static methods that share complex validation, formatting, or calculation logic, that common logic can be extracted into a `private` interface method. This prevents code duplication without exposing the helper method as part of the public API.',
        followUp: 'Can private interface methods be invoked by implementing classes?',
        followUpAnswer: 'No. Private interface methods are completely invisible outside the declaring interface and cannot be inherited or called by implementors.',
        keyPhrases: [
          'Java 9 feature',
          'Internal code reuse',
          'Encapsulation of default helpers',
          'Invisible to implementors'
        ],
        commonMistakeAnswer: 'Thinking private interface methods are accessible to subclasses in the same package.'
      },
      {
        question: 'Can an interface default method be re-declared as abstract by a sub-interface?',
        answer: 'Yes. An extending sub-interface can override an inherited default method and explicitly declare it `abstract` with no body (e.g., `void method();`). This technique is used when a specialized sub-interface determines that the general default implementation provided by the parent interface is no longer safe or appropriate, deliberately forcing all downstream implementors of the sub-interface to supply their own concrete logic.',
        followUp: 'Give an example of this in the Java standard library.',
        followUpAnswer: 'In `java.util.Map`, `getOrDefault()` is a default method, but certain specialized concurrent map interfaces re-abstract methods to mandate lock-aware implementations.',
        keyPhrases: [
          'Re-abstracting default methods',
          'Forcing downstream implementation',
          'Sub-interface contract tightening',
          'Removing invalid defaults'
        ],
        commonMistakeAnswer: 'Assuming that once a method has a default body, it can never become abstract again.'
      },
      {
        question: 'How do default methods affect functional interfaces used in lambda expressions?',
        answer: 'A functional interface is strictly defined as an interface that has EXACTLY ONE abstract method (SAM - Single Abstract Method). Default methods, static methods, and public methods matching `java.lang.Object` do NOT count toward this single abstract method limit. Therefore, an interface can have dozens of default and static methods while remaining a completely valid functional interface annotated with `@FunctionalInterface`.',
        followUp: 'Can an interface have zero abstract methods and only default methods and be a functional interface?',
        followUpAnswer: 'No. A functional interface must have exactly one abstract method. If it has zero abstract methods, the compiler rejects the @FunctionalInterface annotation.',
        keyPhrases: [
          'Single Abstract Method (SAM)',
          'Default methods excluded from SAM count',
          '@FunctionalInterface annotation',
          'Exactly one abstract method requirement'
        ],
        commonMistakeAnswer: 'Believing that adding a default method disqualifies an interface from being functional.'
      },
      {
        question: 'What is the "Diamond Problem" in the context of Java default methods, and how does the compiler prevent ambiguity?',
        answer: 'The diamond problem occurs when class D implements interfaces B and C, both of which inherit from interface A. If both B and C override A\'s default method with different implementations, class D faces an ambiguity: which implementation should it inherit? The Java compiler prevents ambiguity by refusing to guess: it produces a compile-time error and forces class D to explicitly override the method and resolve the conflict directly.',
        followUp: 'What if interface B overrides A\'s default method, but interface C does NOT override it? Does class D still have a collision?',
        followUpAnswer: 'No! In that case, Rule 2 ("sub-interfaces win") applies: interface B\'s override is more specific than A\'s default, so class D automatically inherits B\'s version with zero compilation errors.',
        keyPhrases: [
          'Diamond problem',
          'Conflicting sibling overrides',
          'Compile-time ambiguity rejection',
          'Specificity rule resolution'
        ],
        commonMistakeAnswer: 'Thinking the compiler defaults to the first interface named in the implements clause.'
      },
      {
        question: 'Can a default method access instance variables of an implementing class?',
        answer: 'No, never directly. An interface has no awareness of what classes will implement it in the future, nor does it have access to any class\'s instance variables. A default method can only interact with state by calling abstract or default getter/setter methods declared on the interface itself, which the implementing class will satisfy dynamically at runtime.',
        followUp: 'How does this preserve encapsulation?',
        followUpAnswer: 'It preserves encapsulation because the interface interacts solely with public method contracts, remaining completely agnostic of the implementing class\'s internal memory layout.',
        keyPhrases: [
          'No direct instance variable access',
          'Virtual getter/setter method dispatch',
          'Decoupled memory layout',
          'Encapsulation preservation'
        ],
        commonMistakeAnswer: 'Believing default methods can access private fields of implementing classes.'
      }
    ],
    miniQuiz: [
      {
        question: 'What keyword was introduced in Java 8 to allow concrete method bodies in interfaces?',
        options: [
          'concrete',
          'default',
          'virtual',
          'override'
        ],
        correctIndex: 1,
        explanation: 'The `default` keyword is used to declare an interface method that includes a concrete implementation body.'
      },
      {
        question: 'According to Java\'s conflict resolution rules, what happens when a class inherits a concrete method from a superclass and a conflicting default method from an interface?',
        options: [
          'The interface default method wins.',
          'The superclass method wins (Classes Win rule).',
          'The compiler throws an ambiguity error.',
          'The method executed depends on the reference type used at the call site.'
        ],
        correctIndex: 1,
        explanation: 'Rule 1: Classes always win over interface default methods.'
      },
      {
        question: 'How do you call a static method `doWork()` defined in `interface Helper`?',
        options: [
          'new HelperImpl().doWork();',
          'HelperImpl.doWork();',
          'Helper.doWork();',
          'super.doWork();'
        ],
        correctIndex: 2,
        explanation: 'Static methods in interfaces are not inherited and must be called directly on the interface: Helper.doWork().'
      },
      {
        question: 'What happens if a class implements two interfaces that provide conflicting default methods with identical signatures?',
        options: [
          'The class compiles and picks the first interface listed.',
          'The class fails to compile unless it explicitly overrides the method.',
          'The JVM picks one randomly at runtime.',
          'Both methods are executed sequentially.'
        ],
        correctIndex: 1,
        explanation: 'If sibling interfaces provide conflicting default methods, the implementing class must explicitly override the method to resolve the ambiguity.'
      },
      {
        question: 'What is the correct syntax to invoke InterfaceA\'s default method `test()` from an overriding method?',
        options: [
          'super.InterfaceA.test();',
          'InterfaceA.super.test();',
          'super.test();',
          'InterfaceA.test();'
        ],
        correctIndex: 1,
        explanation: 'The syntax to explicitly delegate to a specific interface\'s default method is `InterfaceA.super.test()`.'
      },
      {
        question: 'Can an interface define a default method for `public String toString()`?',
        options: [
          'Yes, to give all implementors a common string format.',
          'No, the compiler forbids default implementations of Object methods.',
          'Yes, but only if marked final.',
          'Yes, starting in Java 17.'
        ],
        correctIndex: 1,
        explanation: 'Interfaces are prohibited from defining default implementations for java.lang.Object methods like toString(), equals(), or hashCode().'
      },
      {
        question: 'Can a default method in an interface be declared `final`?',
        options: [
          'Yes, to prevent implementing classes from overriding it.',
          'No, the final modifier is not allowed on interface default methods.',
          'Yes, if the interface is private.',
          'Yes, if it has no parameters.'
        ],
        correctIndex: 1,
        explanation: 'Default methods cannot be declared final; they are designed to be overridable by implementors.'
      },
      {
        question: 'What version of Java introduced private helper methods inside interfaces?',
        options: [
          'Java 7',
          'Java 8',
          'Java 9',
          'Java 11'
        ],
        correctIndex: 2,
        explanation: 'Java 9 introduced private and private static methods in interfaces to enable code reuse among default methods.'
      },
      {
        question: 'If interface B extends interface A and overrides A\'s default method, which implementation does a class implementing B receive?',
        options: [
          'A\'s implementation.',
          'B\'s implementation (Sub-interfaces Win rule).',
          'A compile-time ambiguity error.',
          'Neither; it must override the method.'
        ],
        correctIndex: 1,
        explanation: 'Rule 2: Sub-interfaces win. The more specific sub-interface\'s default implementation takes precedence.'
      },
      {
        question: 'Can a default method be declared `synchronized` in an interface?',
        options: [
          'Yes, to ensure thread-safe execution of the default logic.',
          'No, synchronized is an illegal modifier for interface default methods.',
          'Yes, if the interface implements Runnable.',
          'Yes, but only in static interface methods.'
        ],
        correctIndex: 1,
        explanation: 'The synchronized keyword is illegal on interface methods because interfaces do not manage the lock monitors of implementing objects.'
      }
    ]
  }
};
