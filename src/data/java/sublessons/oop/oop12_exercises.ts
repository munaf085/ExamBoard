import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 12: POLYMORPHISM & DISPATCH - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const oop12Exercises: Record<string, ProgrammingExercise[]> = {
  "compile-vs-runtime-polymorphism": [
    {
      "id": "oop12-ex01",
      "title": "Overloaded Price Calculation vs Overridden Delivery Fee",
      "problemStatement": "Create a `DeliveryService` class with compile-time polymorphism: two overloaded `calculateBasePrice` methods (one taking `double weight`, one taking `double weight, double distance`). Provide a method `calculateDeliveryFee(double distance)` returning `distance * 0.5`. Subclass `ExpressDelivery` overrides `calculateDeliveryFee(double distance)` returning `distance * 1.2 + 5.0`. In `main()`, test both overloaded methods and the overridden method.",
      "hint": "Method overloading is resolved at compile time based on parameter signatures. Method overriding is resolved at runtime based on the actual object on the heap.",
      "solutionCode": "class DeliveryService {\n    double calculateBasePrice(double weight) {\n        return weight * 2.0;\n    }\n\n    double calculateBasePrice(double weight, double distance) {\n        return (weight * 2.0) + (distance * 0.1);\n    }\n\n    double calculateDeliveryFee(double distance) {\n        return distance * 0.5;\n    }\n}\n\nclass ExpressDelivery extends DeliveryService {\n    @Override\n    double calculateDeliveryFee(double distance) {\n        return (distance * 1.2) + 5.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DeliveryService service = new ExpressDelivery();\n\n        // Compile-time overloading\n        System.out.println(\"Base price (weight only): $\" + service.calculateBasePrice(10.0));\n        System.out.println(\"Base price (weight + dist): $\" + service.calculateBasePrice(10.0, 50.0));\n\n        // Runtime dynamic dispatch\n        System.out.println(\"Delivery fee: $\" + service.calculateDeliveryFee(50.0));\n    }\n}",
      "output": "Base price (weight only): $20.0\nBase price (weight + dist): $25.0\nDelivery fee: $65.0",
      "explanation": "Overloaded calculateBasePrice calls are resolved at compile time based on argument count. The calculateDeliveryFee call is resolved dynamically at runtime by invoking ExpressDelivery's overridden method."
    },
    {
      "id": "oop12-ex02",
      "title": "Field Shadowing Resolution vs Method Overriding",
      "problemStatement": "Demonstrate the critical distinction between field binding and method dispatch: class `Parent` has `int value = 100` and `getValue()` returning 100. Subclass `Child` declares `int value = 200` and overrides `getValue()` returning 200. In `main()`, assign a `Child` instance to a `Parent` reference variable: `Parent ref = new Child();`. Print `ref.value` and `ref.getValue()`.",
      "hint": "In Java, instance fields are NOT polymorphic. They are bound at compile time based on the reference type, while instance methods are dispatched dynamically at runtime.",
      "solutionCode": "class Parent {\n    int value = 100;\n\n    int getValue() {\n        return value;\n    }\n}\n\nclass Child extends Parent {\n    int value = 200;\n\n    @Override\n    int getValue() {\n        return value;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Parent ref = new Child();\n\n        System.out.println(\"Field access (ref.value): \" + ref.value);\n        System.out.println(\"Method call (ref.getValue()): \" + ref.getValue());\n    }\n}",
      "output": "Field access (ref.value): 100\nMethod call (ref.getValue()): 200",
      "explanation": "ref.value accesses Parent.value (100) because field access is resolved at compile time using the reference type. ref.getValue() invokes Child's overridden method (200) via dynamic method dispatch."
    },
    {
      "id": "oop12-ex03",
      "title": "Static Method Hiding vs Dynamic Instance Method Dispatch",
      "problemStatement": "Create a `Report` class with a static method `printHeader()` and an instance method `generateBody()`. Create a subclass `FinancialReport` that defines a static method `printHeader()` (method hiding) and overrides `generateBody()`. In `main()`, declare `Report rep = new FinancialReport();` and invoke both methods.",
      "hint": "Static methods cannot be overridden; they are hidden and bound at compile time using the reference type.",
      "solutionCode": "class Report {\n    static void printHeader() {\n        System.out.println(\"--- STANDARD REPORT HEADER ---\");\n    }\n\n    void generateBody() {\n        System.out.println(\"Standard summary data.\");\n    }\n}\n\nclass FinancialReport extends Report {\n    static void printHeader() {\n        System.out.println(\"$$$ FINANCIAL AUDIT REPORT $$$\");\n    }\n\n    @Override\n    void generateBody() {\n        System.out.println(\"Q4 Financial ledger and balance sheet.\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Report rep = new FinancialReport();\n\n        // Static method call via reference type\n        rep.printHeader();\n\n        // Virtual method call via runtime object type\n        rep.generateBody();\n    }\n}",
      "output": "--- STANDARD REPORT HEADER ---\nQ4 Financial ledger and balance sheet.",
      "explanation": "rep.printHeader() resolves at compile time to Report.printHeader() because static methods do not participate in runtime polymorphism. rep.generateBody() dynamically dispatches to FinancialReport at runtime."
    },
    {
      "id": "oop12-ex04",
      "title": "Printer Output Overloading vs LaserPrinter Device Status Override",
      "problemStatement": "Build a `Printer` class with overloaded methods: `print(String doc)` and `print(String doc, int copies)`. Add an instance method `getStatus()` returning 'Standard printer online'. Subclass `LaserPrinter` overrides `getStatus()` returning 'Laser printer online [Toner: 94%]'. In `main()`, test overloaded printing and overridden status using a `Printer` reference pointing to `LaserPrinter`.",
      "hint": "Compile-time polymorphism selects the overloaded method; runtime polymorphism dispatches the status check.",
      "solutionCode": "class Printer {\n    void print(String doc) {\n        System.out.println(\"Printing 1 copy of: \" + doc);\n    }\n\n    void print(String doc, int copies) {\n        System.out.println(\"Printing \" + copies + \" copies of: \" + doc);\n    }\n\n    String getStatus() {\n        return \"Standard printer online\";\n    }\n}\n\nclass LaserPrinter extends Printer {\n    @Override\n    String getStatus() {\n        return \"Laser printer online [Toner: 94%]\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Printer p = new LaserPrinter();\n\n        p.print(\"AnnualReport.pdf\");\n        p.print(\"Flyer.png\", 5);\n        System.out.println(\"Status: \" + p.getStatus());\n    }\n}",
      "output": "Printing 1 copy of: AnnualReport.pdf\nPrinting 5 copies of: Flyer.png\nStatus: Laser printer online [Toner: 94%]",
      "explanation": "Overloaded methods provide convenient compile-time interfaces, while getStatus() uses runtime polymorphism to report laser-specific status."
    },
    {
      "id": "oop12-ex05",
      "title": "Shape Drawing with Overloaded Scaling and Overridden Render",
      "problemStatement": "Implement `Shape` with overloaded methods `scale(int percent)` and `scale(double factor)`, returning formatted string descriptions. Include a method `render()` returning 'Generic Shape'. Subclass `Circle` overrides `render()` returning 'Drawing Circle O'. In `main()`, invoke both scale variants and render using a `Shape` reference.",
      "hint": "Overloaded method calls are matched to parameter types by the compiler.",
      "solutionCode": "class Shape {\n    String scale(int percent) {\n        return \"Scaled by integer: \" + percent + \"%\";\n    }\n\n    String scale(double factor) {\n        return \"Scaled by double factor: \" + factor + \"x\";\n    }\n\n    String render() {\n        return \"Generic Shape\";\n    }\n}\n\nclass Circle extends Shape {\n    @Override\n    String render() {\n        return \"Drawing Circle O\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n\n        System.out.println(s.scale(150));\n        System.out.println(s.scale(2.5));\n        System.out.println(s.render());\n    }\n}",
      "output": "Scaled by integer: 150%\nScaled by double factor: 2.5x\nDrawing Circle O",
      "explanation": "The compiler binds the calls to scale(int) and scale(double) based on argument types. The render() call is dispatched to Circle at runtime."
    },
    {
      "id": "oop12-ex06",
      "title": "Upcast Reference Invoking Overloaded Method with Widening Conversion",
      "problemStatement": "Create a class `Calculator` with overloaded methods: `process(double num)` and `process(Object obj)`. Subclass `SciCalculator` overrides `process(double num)` to print 'Scientific double: ' + num. In `main()`, call `process(10)` (passing an int literal) and `process(\"Hello\")` on a `Calculator c = new SciCalculator();` reference.",
      "hint": "Passing an `int` to `process` matches `process(double)` via primitive widening at compile time. At runtime, the overridden version in `SciCalculator` executes.",
      "solutionCode": "class Calculator {\n    void process(double num) {\n        System.out.println(\"Standard double: \" + num);\n    }\n\n    void process(Object obj) {\n        System.out.println(\"Object processor: \" + obj);\n    }\n}\n\nclass SciCalculator extends Calculator {\n    @Override\n    void process(double num) {\n        System.out.println(\"Scientific double: \" + num);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Calculator c = new SciCalculator();\n\n        // int 10 widens to double 10.0 at compile-time -> dynamic dispatch to SciCalculator\n        c.process(10);\n        // String matches Object -> Calculator.process(Object)\n        c.process(\"Hello\");\n    }\n}",
      "output": "Scientific double: 10.0\nObject processor: Hello",
      "explanation": "Compile-time resolution selects process(double) for the integer argument via widening conversion. Runtime dispatch then executes SciCalculator's implementation."
    },
    {
      "id": "oop12-ex07",
      "title": "Payment Gateway with Overloaded Validation and Overridden Processing",
      "problemStatement": "Define `PaymentGateway` with overloaded validation methods: `validate(String account)` and `validate(String account, double amount)`. Define `process(double amount)` returning 'Standard settlement: $' + amount. Subclass `CryptoGateway` overrides `process(double amount)` returning 'Blockchain ledger confirmation: $' + amount. Test in `main()`.",
      "hint": "Demonstrate compile-time validation checks followed by polymorphic payment processing.",
      "solutionCode": "class PaymentGateway {\n    boolean validate(String account) {\n        return account != null && account.length() >= 5;\n    }\n\n    boolean validate(String account, double amount) {\n        return validate(account) && amount > 0;\n    }\n\n    String process(double amount) {\n        return \"Standard settlement: $\" + amount;\n    }\n}\n\nclass CryptoGateway extends PaymentGateway {\n    @Override\n    String process(double amount) {\n        return \"Blockchain ledger confirmation: $\" + amount;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        PaymentGateway gateway = new CryptoGateway();\n\n        System.out.println(\"Valid account: \" + gateway.validate(\"ACC-1234\"));\n        System.out.println(\"Valid amount: \" + gateway.validate(\"ACC-1234\", 250.0));\n        System.out.println(\"Process result: \" + gateway.process(250.0));\n    }\n}",
      "output": "Valid account: true\nValid amount: true\nProcess result: Blockchain ledger confirmation: $250.0",
      "explanation": "Gateway validation executes compile-time resolved overloaded methods, while transaction processing dispatches to CryptoGateway at runtime."
    },
    {
      "id": "oop12-ex08",
      "title": "Notification System with Overloaded Formatting and Overridden Send",
      "problemStatement": "Build a `Notifier` class with overloaded `formatMessage(String msg)` and `formatMessage(String msg, String priority)`. Include `send(String msg)` printing 'Sending notification: ' + msg. Subclass `SmsNotifier` overrides `send(String msg)` to print 'Sending SMS [160-char max]: ' + msg. Test via `Notifier n = new SmsNotifier();`.",
      "hint": "Combine compile-time message formatting with runtime channel dispatch.",
      "solutionCode": "class Notifier {\n    String formatMessage(String msg) {\n        return \"[INFO] \" + msg;\n    }\n\n    String formatMessage(String msg, String priority) {\n        return \"[\" + priority.toUpperCase() + \"] \" + msg;\n    }\n\n    void send(String msg) {\n        System.out.println(\"Sending notification: \" + msg);\n    }\n}\n\nclass SmsNotifier extends Notifier {\n    @Override\n    void send(String msg) {\n        System.out.println(\"Sending SMS [160-char max]: \" + msg);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Notifier n = new SmsNotifier();\n\n        String m1 = n.formatMessage(\"System update scheduled.\");\n        String m2 = n.formatMessage(\"Server temperature critical!\", \"Urgent\");\n\n        n.send(m1);\n        n.send(m2);\n    }\n}",
      "output": "Sending SMS [160-char max]: [INFO] System update scheduled.\nSending SMS [160-char max]: [URGENT] Server temperature critical!",
      "explanation": "The overloaded formatting helpers run from Notifier; dynamic dispatch ensures SmsNotifier delivers both formatted strings."
    },
    {
      "id": "oop12-ex09",
      "title": "Employee Shadowed Salary Field vs Overridden Net Pay",
      "problemStatement": "Define `Staff` with field `double salary = 3000.0` and method `getNetPay()` returning `salary`. Subclass `Executive` declares `double salary = 8000.0` and overrides `getNetPay()` returning `this.salary + 2000.0`. In `main()`, print field access and method call via both `Staff s = new Executive();` and `Executive e = new Executive();`.",
      "hint": "Examine how the reference type dictates field access, while the runtime object dictates method invocation.",
      "solutionCode": "class Staff {\n    double salary = 3000.0;\n\n    double getNetPay() {\n        return salary;\n    }\n}\n\nclass Executive extends Staff {\n    double salary = 8000.0;\n\n    @Override\n    double getNetPay() {\n        return this.salary + 2000.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Staff s = new Executive();\n        Executive e = new Executive();\n\n        System.out.println(\"s.salary (Staff ref): $\" + s.salary);\n        System.out.println(\"s.getNetPay() (Staff ref): $\" + s.getNetPay());\n        System.out.println(\"e.salary (Executive ref): $\" + e.salary);\n        System.out.println(\"e.getNetPay() (Executive ref): $\" + e.getNetPay());\n    }\n}",
      "output": "s.salary (Staff ref): $3000.0\ns.getNetPay() (Staff ref): $10000.0\ne.salary (Executive ref): $8000.0\ne.getNetPay() (Executive ref): $10000.0",
      "explanation": "Field access is non-polymorphic: s.salary looks at Staff's field ($3000.0). Method getNetPay() is polymorphic: both calls dispatch to Executive's getNetPay() ($10000.0)."
    },
    {
      "id": "oop12-ex10",
      "title": "Audio Player Hierarchy with Overloaded Playlist and Overridden Equalizer",
      "problemStatement": "Create an `AudioPlayer` with overloaded `load(String track)` and `load(String track, int trackNumber)`. Define `play()` which prints 'Standard audio playing'. Subclass `HiFiPlayer` overrides `play()` to print 'Hi-Fi 24-bit lossless streaming'. Test in `main()` using an `AudioPlayer` reference.",
      "hint": "Demonstrate the harmony of early binding for track loading and late binding for audio playback.",
      "solutionCode": "class AudioPlayer {\n    void load(String track) {\n        System.out.println(\"Loaded track: \" + track);\n    }\n\n    void load(String track, int trackNumber) {\n        System.out.println(\"Loaded track #\" + trackNumber + \": \" + track);\n    }\n\n    void play() {\n        System.out.println(\"Standard audio playing\");\n    }\n}\n\nclass HiFiPlayer extends AudioPlayer {\n    @Override\n    void play() {\n        System.out.println(\"Hi-Fi 24-bit lossless streaming\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        AudioPlayer player = new HiFiPlayer();\n\n        player.load(\"Symphony No. 5\");\n        player.load(\"Moonlight Sonata\", 2);\n        player.play();\n    }\n}",
      "output": "Loaded track: Symphony No. 5\nLoaded track #2: Moonlight Sonata\nHi-Fi 24-bit lossless streaming",
      "explanation": "The overloaded load methods are statically bound at compile time. The play() call is dynamically resolved to HiFiPlayer at runtime."
    }
  ],
  "dynamic-method-dispatch": [
    {
      "id": "oop12-ex11",
      "title": "Heterogeneous Vehicle Array Engine Ignition Dispatch",
      "problemStatement": "Create a base class `Vehicle` with method `startEngine()` returning 'Generic engine starts'. Subclasses `Car`, `Motorcycle`, and `Truck` override `startEngine()` returning specific ignition sounds ('Vroom Vroom!', 'Braap Braap!', 'Chug Chug Chug!'). In `main()`, create a `Vehicle[] fleet` containing one of each, loop through the array, and print the result of `startEngine()`.",
      "hint": "Store different subclasses in a base class array `Vehicle[]`. The JVM resolves each method call dynamically via the vtable.",
      "solutionCode": "class Vehicle {\n    String startEngine() {\n        return \"Generic engine starts\";\n    }\n}\n\nclass Car extends Vehicle {\n    @Override\n    String startEngine() {\n        return \"Vroom Vroom!\";\n    }\n}\n\nclass Motorcycle extends Vehicle {\n    @Override\n    String startEngine() {\n        return \"Braap Braap!\";\n    }\n}\n\nclass Truck extends Vehicle {\n    @Override\n    String startEngine() {\n        return \"Chug Chug Chug!\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Vehicle[] fleet = { new Car(), new Motorcycle(), new Truck() };\n\n        for (Vehicle v : fleet) {\n            System.out.println(v.startEngine());\n        }\n    }\n}",
      "output": "Vroom Vroom!\nBraap Braap!\nChug Chug Chug!",
      "explanation": "Dynamic method dispatch invokes the proper startEngine() implementation for each object at runtime, even though all are accessed through Vehicle references."
    },
    {
      "id": "oop12-ex12",
      "title": "Base Class Template Calling Dynamically Dispatched Method",
      "problemStatement": "Design a `GameCharacter` class with a `takeTurn()` method that prints 'Turn begins...' and then calls `this.performAction()`. Subclass `Warrior` overrides `performAction()` to print 'Swings broadsword!'. Subclass `Healer` overrides `performAction()` to print 'Casts healing light!'. In `main()`, call `takeTurn()` on both characters.",
      "hint": "Even when called from within a base class method (`takeTurn()`), `this.performAction()` dynamically dispatches to the subclass override.",
      "solutionCode": "class GameCharacter {\n    void takeTurn() {\n        System.out.print(\"Turn begins: \");\n        performAction();\n    }\n\n    void performAction() {\n        System.out.println(\"Idle action.\");\n    }\n}\n\nclass Warrior extends GameCharacter {\n    @Override\n    void performAction() {\n        System.out.println(\"Swings broadsword!\");\n    }\n}\n\nclass Healer extends GameCharacter {\n    @Override\n    void performAction() {\n        System.out.println(\"Casts healing light!\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        GameCharacter warrior = new Warrior();\n        GameCharacter healer = new Healer();\n\n        warrior.takeTurn();\n        healer.takeTurn();\n    }\n}",
      "output": "Turn begins: Swings broadsword!\nTurn begins: Casts healing light!",
      "explanation": "When takeTurn() calls performAction(), the JVM looks up the vtable of the runtime object (Warrior or Healer) rather than GameCharacter."
    },
    {
      "id": "oop12-ex13",
      "title": "Multi-Tier Employee Hierarchy Bonus Dispatch",
      "problemStatement": "Create an `Employee` class with method `double getBonus(double baseSalary)`. Subclasses `Developer` (bonus is 10% of base), `TeamLead` (bonus is 18% of base), and `Director` (bonus is 30% of base + $5000.0) each override `getBonus()`. In `main()`, create an `Employee[]` with all three roles, compute their bonuses for a $100,000 base salary, and print total bonus payout.",
      "hint": "Iterate through the array and accumulate `emp.getBonus(100000.0)`.",
      "solutionCode": "class Employee {\n    double getBonus(double baseSalary) {\n        return 0.0;\n    }\n}\n\nclass Developer extends Employee {\n    @Override\n    double getBonus(double baseSalary) {\n        return baseSalary * 0.10;\n    }\n}\n\nclass TeamLead extends Employee {\n    @Override\n    double getBonus(double baseSalary) {\n        return baseSalary * 0.18;\n    }\n}\n\nclass Director extends Employee {\n    @Override\n    double getBonus(double baseSalary) {\n        return (baseSalary * 0.30) + 5000.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Employee[] staff = { new Developer(), new TeamLead(), new Director() };\n        double totalBonus = 0.0;\n\n        for (Employee e : staff) {\n            double bonus = e.getBonus(100000.0);\n            totalBonus += bonus;\n            System.out.println(\"Bonus: $\" + bonus);\n        }\n\n        System.out.println(\"Total Payout: $\" + totalBonus);\n    }\n}",
      "output": "Bonus: $10000.0\nBonus: $18000.0\nBonus: $35000.0\nTotal Payout: $63000.0",
      "explanation": "Dynamic method dispatch enables clean polymorphism: each employee calculates their specific bonus tier without requiring instanceof or switch statements."
    },
    {
      "id": "oop12-ex14",
      "title": "Game Entity Damage Mitigation Pipeline",
      "problemStatement": "Implement `Entity` with method `int takeDamage(int rawDamage)` returning `rawDamage`. Subclass `ArmoredKnight` overrides it to subtract 15 armor points (minimum 0 damage). Subclass `ShieldBearer` overrides it to block 50% of damage. In `main()`, subject an array of both entities to 40 points of raw damage and display damage taken.",
      "hint": "Use `Math.max(0, rawDamage - 15)` for the knight and `rawDamage / 2` for the shield bearer.",
      "solutionCode": "class Entity {\n    int takeDamage(int rawDamage) {\n        return rawDamage;\n    }\n}\n\nclass ArmoredKnight extends Entity {\n    @Override\n    int takeDamage(int rawDamage) {\n        return Math.max(0, rawDamage - 15);\n    }\n}\n\nclass ShieldBearer extends Entity {\n    @Override\n    int takeDamage(int rawDamage) {\n        return rawDamage / 2;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Entity[] party = { new ArmoredKnight(), new ShieldBearer() };\n        int incoming = 40;\n\n        for (Entity e : party) {\n            System.out.println(e.getClass().getSimpleName() + \" takes \" + e.takeDamage(incoming) + \" damage\");\n        }\n    }\n}",
      "output": "ArmoredKnight takes 25 damage\nShieldBearer takes 20 damage",
      "explanation": "Virtual method invocation directs the incoming attack through each entity's specialized damage mitigation logic."
    },
    {
      "id": "oop12-ex15",
      "title": "Document Rendering Pipeline Across Formats",
      "problemStatement": "Create a `Document` base class with `render(String content)`. Subclasses `PdfDocument`, `HtmlDocument`, and `MarkdownDocument` override `render` to format content with respective tags: `[PDF: content]`, `<html>content</html>`, and `**content**`. In `main()`, iterate over an array of documents and render 'Hello Polymorphism'.",
      "hint": "Define a common `render` method in `Document` so caller code is decoupled from concrete document types.",
      "solutionCode": "class Document {\n    void render(String content) {\n        System.out.println(content);\n    }\n}\n\nclass PdfDocument extends Document {\n    @Override\n    void render(String content) {\n        System.out.println(\"[PDF: \" + content + \"]\");\n    }\n}\n\nclass HtmlDocument extends Document {\n    @Override\n    void render(String content) {\n        System.out.println(\"<html>\" + content + \"</html>\");\n    }\n}\n\nclass MarkdownDocument extends Document {\n    @Override\n    void render(String content) {\n        System.out.println(\"**\" + content + \"**\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Document[] docs = { new PdfDocument(), new HtmlDocument(), new MarkdownDocument() };\n\n        for (Document doc : docs) {\n            doc.render(\"Hello Polymorphism\");\n        }\n    }\n}",
      "output": "[PDF: Hello Polymorphism]\n<html>Hello Polymorphism</html>\n**Hello Polymorphism**",
      "explanation": "The client iterates over Document references; the runtime environment dispatches each render() call to the appropriate format exporter."
    },
    {
      "id": "oop12-ex16",
      "title": "Musical Instrument Sound Synthesis Dispatch",
      "problemStatement": "Create an `Instrument` class with method `play(String note)`. Subclass `Piano` prints 'Piano plays chord: ' + note. Subclass `Violin` prints 'Violin bows note: ' + note. Subclass `Flute` prints 'Flute blows tone: ' + note. In `main()`, play note 'C# Minor' across an orchestra array.",
      "hint": "Construct an array `Instrument[] orchestra = { ... }` and invoke `play(\"C# Minor\")`.",
      "solutionCode": "class Instrument {\n    void play(String note) {\n        System.out.println(\"Sound of \" + note);\n    }\n}\n\nclass Piano extends Instrument {\n    @Override\n    void play(String note) {\n        System.out.println(\"Piano plays chord: \" + note);\n    }\n}\n\nclass Violin extends Instrument {\n    @Override\n    void play(String note) {\n        System.out.println(\"Violin bows note: \" + note);\n    }\n}\n\nclass Flute extends Instrument {\n    @Override\n    void play(String note) {\n        System.out.println(\"Flute blows tone: \" + note);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Instrument[] orchestra = { new Piano(), new Violin(), new Flute() };\n\n        for (Instrument inst : orchestra) {\n            inst.play(\"C# Minor\");\n        }\n    }\n}",
      "output": "Piano plays chord: C# Minor\nViolin bows note: C# Minor\nFlute blows tone: C# Minor",
      "explanation": "Dynamic method dispatch executes the overridden play() method for each musical instrument based on its concrete type."
    },
    {
      "id": "oop12-ex17",
      "title": "Bank Transaction Fee Evaluation Across Account Tiers",
      "problemStatement": "Build an `Account` class with method `double calculateFee(double amount)`. Subclasses `StandardAccount` (charges 2.5% fee), `GoldAccount` (charges 1.0% fee), and `PlatinumAccount` (charges $0.0 fee). In `main()`, process a transfer of $1000.0 across all three account types stored in an array.",
      "hint": "Return `amount * 0.025` for standard, `amount * 0.01` for gold, and `0.0` for platinum.",
      "solutionCode": "class Account {\n    double calculateFee(double amount) {\n        return amount * 0.05;\n    }\n}\n\nclass StandardAccount extends Account {\n    @Override\n    double calculateFee(double amount) {\n        return amount * 0.025;\n    }\n}\n\nclass GoldAccount extends Account {\n    @Override\n    double calculateFee(double amount) {\n        return amount * 0.01;\n    }\n}\n\nclass PlatinumAccount extends Account {\n    @Override\n    double calculateFee(double amount) {\n        return 0.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Account[] accounts = { new StandardAccount(), new GoldAccount(), new PlatinumAccount() };\n        double transfer = 1000.0;\n\n        for (Account acc : accounts) {\n            System.out.println(acc.getClass().getSimpleName() + \" fee: $\" + acc.calculateFee(transfer));\n        }\n    }\n}",
      "output": "StandardAccount fee: $25.0\nGoldAccount fee: $10.0\nPlatinumAccount fee: $0.0",
      "explanation": "Each account tier calculates fees polymorphically, ensuring financial rules are encapsulated within each respective class."
    },
    {
      "id": "oop12-ex18",
      "title": "IoT Sensor Monitoring System Polling Dispatch",
      "problemStatement": "Create a `Sensor` base class with method `String readTelemetry()`. Subclasses `TemperatureSensor` (returns '22.5 C'), `PressureSensor` (returns '1013.2 hPa'), and `HumiditySensor` (returns '45% RH'). In `main()`, poll an array of sensors and print the telemetry stream.",
      "hint": "The monitoring system loops through `Sensor[]` without needing to know specific sensor hardware models.",
      "solutionCode": "class Sensor {\n    String readTelemetry() {\n        return \"No data\";\n    }\n}\n\nclass TemperatureSensor extends Sensor {\n    @Override\n    String readTelemetry() {\n        return \"22.5 C\";\n    }\n}\n\nclass PressureSensor extends Sensor {\n    @Override\n    String readTelemetry() {\n        return \"1013.2 hPa\";\n    }\n}\n\nclass HumiditySensor extends Sensor {\n    @Override\n    String readTelemetry() {\n        return \"45% RH\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Sensor[] sensors = { new TemperatureSensor(), new PressureSensor(), new HumiditySensor() };\n\n        for (Sensor s : sensors) {\n            System.out.println(\"Telemetry: \" + s.readTelemetry());\n        }\n    }\n}",
      "output": "Telemetry: 22.5 C\nTelemetry: 1013.2 hPa\nTelemetry: 45% RH",
      "explanation": "Dynamic method dispatch enables uniform sensor polling across heterogeneous hardware devices."
    },
    {
      "id": "oop12-ex19",
      "title": "Three-Tier Vehicle Hierarchy with Intermediate Non-Overriding Class",
      "problemStatement": "Demonstrate vtable resolution when an intermediate class skips overriding: class `Machine` defines `void runDiagnostics()` printing 'Basic machine self-test'. Subclass `Vehicle` extends `Machine` but DOES NOT override `runDiagnostics()`. Subclass `RaceCar` extends `Vehicle` and overrides `runDiagnostics()` printing 'RaceCar telemetry check: Tires, Aero, Turbo ready'. In `main()`, call `runDiagnostics()` via `Machine m = new RaceCar();`.",
      "hint": "The JVM checks RaceCar's vtable slot first; finding the override, it executes it directly.",
      "solutionCode": "class Machine {\n    void runDiagnostics() {\n        System.out.println(\"Basic machine self-test\");\n    }\n}\n\nclass Vehicle extends Machine {\n    // Does not override runDiagnostics()\n}\n\nclass RaceCar extends Vehicle {\n    @Override\n    void runDiagnostics() {\n        System.out.println(\"RaceCar telemetry check: Tires, Aero, Turbo ready\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Machine m = new RaceCar();\n        m.runDiagnostics();\n    }\n}",
      "output": "RaceCar telemetry check: Tires, Aero, Turbo ready",
      "explanation": "Even though Vehicle skips overriding, RaceCar's override populates the vtable slot, resolving the call dynamically to RaceCar."
    },
    {
      "id": "oop12-ex20",
      "title": "Dynamic Order Discount Engine",
      "problemStatement": "Build an `Order` base class with `double getDiscountRate()`. Subclasses `StandardOrder` (returns 0.0), `SeasonalOrder` (returns 0.10), and `VipOrder` (returns 0.25). Write a static method `double computeFinalTotal(Order order, double subtotal)` that calculates `subtotal * (1.0 - order.getDiscountRate())`. In `main()`, compute totals for $200.0 across all three order types.",
      "hint": "`computeFinalTotal` accepts a base `Order` reference and relies on dynamic dispatch to fetch the right discount rate.",
      "solutionCode": "class Order {\n    double getDiscountRate() {\n        return 0.0;\n    }\n}\n\nclass StandardOrder extends Order {\n    @Override\n    double getDiscountRate() {\n        return 0.0;\n    }\n}\n\nclass SeasonalOrder extends Order {\n    @Override\n    double getDiscountRate() {\n        return 0.10;\n    }\n}\n\nclass VipOrder extends Order {\n    @Override\n    double getDiscountRate() {\n        return 0.25;\n    }\n}\n\npublic class Solution {\n    static double computeFinalTotal(Order order, double subtotal) {\n        return subtotal * (1.0 - order.getDiscountRate());\n    }\n\n    public static void main(String[] args) {\n        double subtotal = 200.0;\n\n        System.out.println(\"Standard Total: $\" + computeFinalTotal(new StandardOrder(), subtotal));\n        System.out.println(\"Seasonal Total: $\" + computeFinalTotal(new SeasonalOrder(), subtotal));\n        System.out.println(\"VIP Total: $\" + computeFinalTotal(new VipOrder(), subtotal));\n    }\n}",
      "output": "Standard Total: $200.0\nSeasonal Total: $180.0\nVIP Total: $150.0",
      "explanation": "Dynamic dispatch decouples the discount calculation algorithm from specific order types, upholding the Open/Closed Principle."
    }
  ],
  "casting-and-classcastexception": [
    {
      "id": "oop12-ex21",
      "title": "Safe Upcasting and Downcasting in Staff Hierarchy",
      "problemStatement": "Create class `Staff` and subclass `Developer` with a method `void writeCode()`. In `main()`, instantiate a Developer and upcast it to `Staff`. Demonstrate that `staff.writeCode()` is a compile-time error. Then safely downcast back to `Developer dev = (Developer) staff;` and invoke `writeCode()`.",
      "hint": "Upcasting is implicit and safe. Downcasting requires an explicit `(TargetClass)` cast operator.",
      "solutionCode": "class Staff {\n    String name = \"Staff Member\";\n}\n\nclass Developer extends Staff {\n    void writeCode() {\n        System.out.println(\"Writing robust Java code!\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Implicit upcast\n        Staff staff = new Developer();\n\n        // staff.writeCode(); // COMPILE ERROR: Staff has no method writeCode()\n\n        // Explicit downcast\n        Developer dev = (Developer) staff;\n        dev.writeCode();\n    }\n}",
      "output": "Writing robust Java code!",
      "explanation": "Upcasting restricts visibility to Staff members. Explicit downcasting restores access to Developer-specific methods after verifying the underlying object."
    },
    {
      "id": "oop12-ex22",
      "title": "Catching ClassCastException in Unguarded Narrowing Cast",
      "problemStatement": "Demonstrate what happens when an invalid downcast is performed: class `Animal`, `Dog extends Animal`, and `Cat extends Animal`. In `main()`, upcast a `Cat` to `Animal animal = new Cat();`. Inside a `try-catch` block, attempt to downcast `Dog d = (Dog) animal;`. Catch `ClassCastException` and print an error message.",
      "hint": "The JVM verifies the object's actual runtime class during downcasting. Since Cat is not a Dog, it throws `ClassCastException`.",
      "solutionCode": "class Animal {}\nclass Dog extends Animal {}\nclass Cat extends Animal {}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Animal animal = new Cat();\n\n        try {\n            Dog d = (Dog) animal;\n            System.out.println(\"Cast succeeded!\");\n        } catch (ClassCastException e) {\n            System.out.println(\"Caught ClassCastException: Cat cannot be cast to Dog\");\n        }\n    }\n}",
      "output": "Caught ClassCastException: Cat cannot be cast to Dog",
      "explanation": "Because animal points to a Cat on the heap, forcing a cast to sibling type Dog fails runtime type verification."
    },
    {
      "id": "oop12-ex23",
      "title": "Heterogeneous Object Array Inspection with Casting",
      "problemStatement": "Declare an `Object[] items = { \"Hello Polymorphism\", Integer.valueOf(42), Double.valueOf(3.14) };`. Iterate through the array. If the item is a String, downcast to String and print its length. If Integer, downcast to Integer and print double its value. If Double, downcast and print it formatted to 1 decimal place. Use `item.getClass().getName()` or checks.",
      "hint": "Downcasting allows extracting concrete wrapper types from generic Object references.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Object[] items = { \"Hello Polymorphism\", Integer.valueOf(42), Double.valueOf(3.14) };\n\n        for (Object item : items) {\n            if (item instanceof String) {\n                String s = (String) item;\n                System.out.println(\"String length: \" + s.length());\n            } else if (item instanceof Integer) {\n                Integer i = (Integer) item;\n                System.out.println(\"Integer doubled: \" + (i * 2));\n            } else if (item instanceof Double) {\n                Double d = (Double) item;\n                System.out.printf(\"Double formatted: %.1f%n\", d);\n            }\n        }\n    }\n}",
      "output": "String length: 18\nInteger doubled: 84\nDouble formatted: 3.1",
      "explanation": "Guarding downcasts prevents runtime ClassCastExceptions while operating on heterogeneous collections."
    },
    {
      "id": "oop12-ex24",
      "title": "Three-Level Downcasting to Access Specialized Electric Vehicle State",
      "problemStatement": "Build a 3-tier hierarchy: `Vehicle`, `Car extends Vehicle`, and `ElectricCar extends Car` with field `int batteryCapacityKwh = 85`. Upcast an ElectricCar to `Vehicle v = new ElectricCar();`. Downcast `v` directly to `ElectricCar ec` and display its battery capacity.",
      "hint": "You can downcast across multiple levels in a single cast expression as long as the underlying heap object matches.",
      "solutionCode": "class Vehicle {}\nclass Car extends Vehicle {}\nclass ElectricCar extends Car {\n    int batteryCapacityKwh = 85;\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Vehicle v = new ElectricCar();\n\n        // Direct multi-level downcast\n        ElectricCar ec = (ElectricCar) v;\n        System.out.println(\"Battery Capacity: \" + ec.batteryCapacityKwh + \" kWh\");\n    }\n}",
      "output": "Battery Capacity: 85 kWh",
      "explanation": "The underlying object on the heap is an ElectricCar, so downcasting directly from Vehicle to ElectricCar succeeds in one step."
    },
    {
      "id": "oop12-ex25",
      "title": "Casting Null References Without Exception",
      "problemStatement": "Demonstrate that casting a `null` reference to any reference type is completely valid in Java and never throws `ClassCastException`. Cast a null `Object` reference to `String` and `Integer`, printing their values.",
      "hint": "`null` is assignment-compatible with all reference types; the cast simply yields a null reference of the target type.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Object obj = null;\n\n        String s = (String) obj;\n        Integer i = (Integer) obj;\n\n        System.out.println(\"Casted String: \" + s);\n        System.out.println(\"Casted Integer: \" + i);\n        System.out.println(\"Is null equal? \" + (s == i));\n    }\n}",
      "output": "Casted String: null\nCasted Integer: null\nIs null equal? true",
      "explanation": "A null reference represents no object on the heap, so runtime type checking treats it as universally compatible without throwing ClassCastException."
    },
    {
      "id": "oop12-ex26",
      "title": "Preventing Sibling Casts with Class Hierarchy Integrity",
      "problemStatement": "Create a base class `Shape` and two sibling subclasses: `Circle` and `Square`. In `main()`, create a `Circle` held in a `Shape` reference: `Shape s = new Circle();`. Write a method `void tryCastToSquare(Shape shape)` that uses a try-catch block to attempt downcasting to `Square`. Print success or error message.",
      "hint": "Sibling classes share a common parent but have no inheritance relationship between themselves.",
      "solutionCode": "class Shape {}\nclass Circle extends Shape {}\nclass Square extends Shape {}\n\npublic class Solution {\n    static void tryCastToSquare(Shape shape) {\n        try {\n            Square sq = (Square) shape;\n            System.out.println(\"Successfully cast to Square\");\n        } catch (ClassCastException e) {\n            System.out.println(\"Failed: Cannot cast sibling Circle to Square\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        tryCastToSquare(s);\n    }\n}",
      "output": "Failed: Cannot cast sibling Circle to Square",
      "explanation": "Even though Circle and Square both inherit from Shape, they cannot be cast to each other because neither IS-A the other."
    },
    {
      "id": "oop12-ex27",
      "title": "Media Playlist Downcasting to AudioBook for Duration Calculation",
      "problemStatement": "Create `MediaItem` with field `String title`. Subclass `AudioBook` extends `MediaItem` and adds `int durationMinutes`. In `main()`, create an array `MediaItem[] library` containing standard media items and audiobooks. Loop through the array, downcast any `AudioBook`, and compute total audiobook minutes.",
      "hint": "Check with `instanceof` before casting: `if (item instanceof AudioBook) { AudioBook ab = (AudioBook) item; ... }`.",
      "solutionCode": "class MediaItem {\n    String title;\n    MediaItem(String title) { this.title = title; }\n}\n\nclass AudioBook extends MediaItem {\n    int durationMinutes;\n\n    AudioBook(String title, int durationMinutes) {\n        super(title);\n        this.durationMinutes = durationMinutes;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        MediaItem[] library = {\n            new AudioBook(\"Atomic Habits\", 320),\n            new MediaItem(\"Wallpaper Graphic\"),\n            new AudioBook(\"Clean Code\", 480)\n        };\n\n        int totalAudioMinutes = 0;\n        for (MediaItem item : library) {\n            if (item instanceof AudioBook) {\n                AudioBook book = (AudioBook) item;\n                totalAudioMinutes += book.durationMinutes;\n            }\n        }\n\n        System.out.println(\"Total AudioBook Duration: \" + totalAudioMinutes + \" minutes\");\n    }\n}",
      "output": "Total AudioBook Duration: 800 minutes",
      "explanation": "Guarded downcasting allows selective access to AudioBook's durationMinutes while safely ignoring generic MediaItems."
    },
    {
      "id": "oop12-ex28",
      "title": "Smart Device Array Downcast to Smartphone for Call Dialing",
      "problemStatement": "Build class `Appliance` with field `String model`. Subclass `SmartPhone` extends `Appliance` and adds `void makeEmergencyCall()`. Create an array `Appliance[] devices` with an Appliance and a SmartPhone. Find any SmartPhone, downcast it, and call `makeEmergencyCall()`.",
      "hint": "Use explicit cast `(SmartPhone) dev` after checking the type.",
      "solutionCode": "class Appliance {\n    String model;\n    Appliance(String model) { this.model = model; }\n}\n\nclass SmartPhone extends Appliance {\n    SmartPhone(String model) { super(model); }\n\n    void makeEmergencyCall() {\n        System.out.println(model + \": Dialing emergency services 911...\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Appliance[] devices = {\n            new Appliance(\"Toaster-X\"),\n            new SmartPhone(\"Pixel 8\")\n        };\n\n        for (Appliance dev : devices) {\n            if (dev instanceof SmartPhone) {\n                SmartPhone phone = (SmartPhone) dev;\n                phone.makeEmergencyCall();\n            }\n        }\n    }\n}",
      "output": "Pixel 8: Dialing emergency services 911...",
      "explanation": "Downcasting bridges the gap between generic device collections and telephony-specific capabilities."
    },
    {
      "id": "oop12-ex29",
      "title": "Shape Downcasting to Access Rectangle Dimensions",
      "problemStatement": "Create `Shape` base class with no dimension fields. Create subclass `Rectangle` with `double width` and `double height`. Upcast a Rectangle to `Shape s = new Rectangle(6.0, 8.0);`. Downcast `s` to `Rectangle` and calculate the diagonal using `Math.sqrt(w*w + h*h)`.",
      "hint": "Downcast to retrieve width and height: `((Rectangle) s).width`.",
      "solutionCode": "class Shape {}\n\nclass Rectangle extends Shape {\n    double width;\n    double height;\n\n    Rectangle(double width, double height) {\n        this.width = width;\n        this.height = height;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape s = new Rectangle(6.0, 8.0);\n\n        Rectangle r = (Rectangle) s;\n        double diagonal = Math.sqrt((r.width * r.width) + (r.height * r.height));\n\n        System.out.println(\"Rectangle Dimensions: \" + r.width + \" x \" + r.height);\n        System.out.println(\"Diagonal: \" + diagonal);\n    }\n}",
      "output": "Rectangle Dimensions: 6.0 x 8.0\nDiagonal: 10.0",
      "explanation": "Downcasting allows accessing subclass-specific fields that are not defined in the superclass interface."
    },
    {
      "id": "oop12-ex30",
      "title": "Safe Downcasting Wrapper Method Returning Boolean Success",
      "problemStatement": "Implement a helper method `static boolean tryProcessWorker(Object obj)` that takes an arbitrary `Object`. If `obj` is an instance of `Worker` (having method `doWork()`), downcast it, execute `doWork()`, and return true. Otherwise return false without throwing an exception. In `main()`, test with a `Worker` and a `String`.",
      "hint": "Use `instanceof` to guard the downcast and return false on non-matches.",
      "solutionCode": "class Worker {\n    void doWork() {\n        System.out.println(\"Worker task executed successfully.\");\n    }\n}\n\npublic class Solution {\n    static boolean tryProcessWorker(Object obj) {\n        if (obj instanceof Worker) {\n            Worker w = (Worker) obj;\n            w.doWork();\n            return true;\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Object w = new Worker();\n        Object s = \"Not a worker\";\n\n        System.out.println(\"Worker processed? \" + tryProcessWorker(w));\n        System.out.println(\"String processed? \" + tryProcessWorker(s));\n    }\n}",
      "output": "Worker task executed successfully.\nWorker processed? true\nString processed? false",
      "explanation": "The wrapper method implements safe, defensive downcasting, shielding the application from ClassCastException."
    }
  ],
  "instanceof-and-pattern-matching": [
    {
      "id": "oop12-ex31",
      "title": "Pre-Java 16 Traditional instanceof Guard Before Downcast",
      "problemStatement": "Demonstrate the pre-Java 16 idiom for type inspection: class `Vehicle` and subclass `Bicycle` with method `ringBell()`. Given a `Vehicle v = new Bicycle();`, check `if (v instanceof Bicycle)`, explicitly cast to `Bicycle b = (Bicycle) v;`, and ring the bell.",
      "hint": "Traditional Java requires two steps: 1) verify with `instanceof`, 2) cast explicitly on a new line.",
      "solutionCode": "class Vehicle {}\nclass Bicycle extends Vehicle {\n    void ringBell() {\n        System.out.println(\"Bicycle bell: Ring! Ring!\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Vehicle v = new Bicycle();\n\n        // Traditional 2-step idiom\n        if (v instanceof Bicycle) {\n            Bicycle b = (Bicycle) v;\n            b.ringBell();\n        }\n    }\n}",
      "output": "Bicycle bell: Ring! Ring!",
      "explanation": "Traditional instanceof safely tests the runtime type before downcasting, eliminating ClassCastException risk."
    },
    {
      "id": "oop12-ex32",
      "title": "Modern Pattern Matching for instanceof with Circle Radius",
      "problemStatement": "Rewrite the type test using modern Java 16+ pattern matching: class `Shape` and `Circle extends Shape` with `double radius = 7.0`. Given `Shape s = new Circle();`, use `if (s instanceof Circle c)` to access `c.radius` and print the circle's area without any explicit downcast.",
      "hint": "Syntax: `if (variable instanceof TargetType patternVariable)` binds the variable directly if true.",
      "solutionCode": "class Shape {}\nclass Circle extends Shape {\n    double radius = 7.0;\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n\n        // Modern Pattern Matching for instanceof (Java 16+)\n        if (s instanceof Circle c) {\n            double area = Math.PI * c.radius * c.radius;\n            System.out.printf(\"Circle radius: %.1f, Area: %.2f%n\", c.radius, area);\n        }\n    }\n}",
      "output": "Circle radius: 7.0, Area: 153.94",
      "explanation": "Pattern matching for instanceof combines type verification and variable binding into a single concise, type-safe expression."
    },
    {
      "id": "oop12-ex33",
      "title": "Null Safety Evaluation with the instanceof Operator",
      "problemStatement": "Demonstrate that evaluating `null` with `instanceof` is guaranteed safe in Java: test a `null` reference against `String`, `Object`, and custom class `Vehicle`. Verify that all three evaluate to `false` and that no `NullPointerException` is thrown.",
      "hint": "The JLS specifies that `null instanceof AnyType` always returns false without throwing an exception.",
      "solutionCode": "class Vehicle {}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Vehicle nullVehicle = null;\n\n        boolean checkVehicle = nullVehicle instanceof Vehicle;\n        boolean checkObject = nullVehicle instanceof Object;\n\n        String nullStr = null;\n        boolean checkString = nullStr instanceof String;\n\n        System.out.println(\"null instanceof Vehicle: \" + checkVehicle);\n        System.out.println(\"null instanceof Object: \" + checkObject);\n        System.out.println(\"null instanceof String: \" + checkString);\n    }\n}",
      "output": "null instanceof Vehicle: false\nnull instanceof Object: false\nnull instanceof String: false",
      "explanation": "instanceof is intrinsically null-safe. You never need to write 'obj != null && obj instanceof Type'."
    },
    {
      "id": "oop12-ex34",
      "title": "Heterogeneous Shape Array Area Dispatch via Pattern Matching",
      "problemStatement": "Create an array `Shape[] shapes` containing a `Circle(radius = 4.0)` and a `Rectangle(width = 5.0, height = 3.0)`. Iterate through the array using modern pattern matching for `instanceof` to calculate and print the area for each shape.",
      "hint": "Use `if (shape instanceof Circle c) { ... } else if (shape instanceof Rectangle r) { ... }`.",
      "solutionCode": "class Shape {}\n\nclass Circle extends Shape {\n    double radius;\n    Circle(double radius) { this.radius = radius; }\n}\n\nclass Rectangle extends Shape {\n    double width, height;\n    Rectangle(double width, double height) { this.width = width; this.height = height; }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(4.0), new Rectangle(5.0, 3.0) };\n\n        for (Shape shape : shapes) {\n            if (shape instanceof Circle c) {\n                System.out.printf(\"Circle Area: %.2f%n\", Math.PI * c.radius * c.radius);\n            } else if (shape instanceof Rectangle r) {\n                System.out.println(\"Rectangle Area: \" + (r.width * r.height));\n            }\n        }\n    }\n}",
      "output": "Circle Area: 50.27\nRectangle Area: 15.0",
      "explanation": "Pattern matching streamlines heterogeneous array processing by binding typed variables directly within condition blocks."
    },
    {
      "id": "oop12-ex35",
      "title": "Pattern Matching with Logical AND Condition Combining Predicate",
      "problemStatement": "Combine pattern matching with additional boolean expressions: class `Employee` with `int performanceRating`. Subclass `Developer` extends `Employee` with `String favoriteLanguage`. Given `Employee emp = new Developer();`, write a single `if` statement using pattern matching AND an additional check: `if (emp instanceof Developer d && \"Java\".equals(d.favoriteLanguage))` to print approval.",
      "hint": "The pattern variable is immediately in scope on the right-hand side of the `&&` operator.",
      "solutionCode": "class Employee {\n    int performanceRating = 5;\n}\n\nclass Developer extends Employee {\n    String favoriteLanguage = \"Java\";\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Employee emp = new Developer();\n\n        // Pattern variable 'd' is in scope on the right side of &&\n        if (emp instanceof Developer d && \"Java\".equals(d.favoriteLanguage)) {\n            System.out.println(\"Selected Senior Java Developer: Rating \" + d.performanceRating);\n        }\n    }\n}",
      "output": "Selected Senior Java Developer: Rating 5",
      "explanation": "Because && short-circuits, the right-hand expression only evaluates when the instanceof test succeeds, making pattern variable 'd' safely accessible."
    },
    {
      "id": "oop12-ex36",
      "title": "Guard Clause Early Return with Inverted Pattern Matching",
      "problemStatement": "Demonstrate flow-sensitive scoping with guard clauses: write a method `static void inspectTruck(Object obj)` that checks `if (!(obj instanceof Truck t)) return;`. In subsequent lines outside the if block, access fields of `t` directly to print truck specs. In `main()`, test with a Truck object and a String.",
      "hint": "When the inverted condition `!(obj instanceof Truck t)` is false, execution continues and the compiler knows `t` was definitely assigned!",
      "solutionCode": "class Truck {\n    String model = \"Mack Titan\";\n    int horsepower = 605;\n}\n\npublic class Solution {\n    static void inspectTruck(Object obj) {\n        // Guard clause: if NOT a truck, exit immediately\n        if (!(obj instanceof Truck t)) {\n            System.out.println(\"Invalid payload: Not a truck.\");\n            return;\n        }\n\n        // 't' is definitely assigned and in scope here!\n        System.out.println(\"Inspecting \" + t.model + \" with \" + t.horsepower + \" HP\");\n    }\n\n    public static void main(String[] args) {\n        inspectTruck(new Truck());\n        inspectTruck(\"Sedan\");\n    }\n}",
      "output": "Inspecting Mack Titan with 605 HP\nInvalid payload: Not a truck.",
      "explanation": "Flow-sensitive scoping allows the pattern variable to remain in scope after an early return guard clause."
    },
    {
      "id": "oop12-ex37",
      "title": "Document Print Processor Dispatching via Pattern Matching",
      "problemStatement": "Create `Document` base class, `PdfDocument` with `int pageCount = 12`, and `WordDocument` with `int wordCount = 3500`. Create a method `void auditDocument(Document doc)` that uses pattern matching to print specific audit metrics for each format.",
      "hint": "Check `doc instanceof PdfDocument pdf` and `doc instanceof WordDocument word`.",
      "solutionCode": "class Document {}\nclass PdfDocument extends Document {\n    int pageCount = 12;\n}\nclass WordDocument extends Document {\n    int wordCount = 3500;\n}\n\npublic class Solution {\n    static void auditDocument(Document doc) {\n        if (doc instanceof PdfDocument pdf) {\n            System.out.println(\"Auditing PDF: \" + pdf.pageCount + \" pages rendered.\");\n        } else if (doc instanceof WordDocument word) {\n            System.out.println(\"Auditing Word Doc: \" + word.wordCount + \" words spellchecked.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        auditDocument(new PdfDocument());\n        auditDocument(new WordDocument());\n    }\n}",
      "output": "Auditing PDF: 12 pages rendered.\nAuditing Word Doc: 3500 words spellchecked.",
      "explanation": "Pattern matching eliminates cast boilerplate and clarifies format-specific audit logic."
    },
    {
      "id": "oop12-ex38",
      "title": "Financial Account Audit with Pattern Variables",
      "problemStatement": "Define `Account` base class with `double balance = 5000.0`. Subclass `SavingsAccount` adds `double interestRate = 0.04`. Subclass `CheckingAccount` adds `double overdraftFee = 35.0`. Write an audit method printing projected annual interest for savings, or overdraft terms for checking, using pattern matching.",
      "hint": "Extract interest using `sa.balance * sa.interestRate`.",
      "solutionCode": "class Account {\n    double balance = 5000.0;\n}\n\nclass SavingsAccount extends Account {\n    double interestRate = 0.04;\n}\n\nclass CheckingAccount extends Account {\n    double overdraftFee = 35.0;\n}\n\npublic class Solution {\n    static void auditAccount(Account acc) {\n        if (acc instanceof SavingsAccount sa) {\n            double projectedInterest = sa.balance * sa.interestRate;\n            System.out.println(\"Savings Account: Projected Interest $\" + projectedInterest);\n        } else if (acc instanceof CheckingAccount ca) {\n            System.out.println(\"Checking Account: Balance $\" + ca.balance + \", Overdraft fee $\" + ca.overdraftFee);\n        }\n    }\n\n    public static void main(String[] args) {\n        auditAccount(new SavingsAccount());\n        auditAccount(new CheckingAccount());\n    }\n}",
      "output": "Savings Account: Projected Interest $200.0\nChecking Account: Balance $5000.0, Overdraft fee $35.0",
      "explanation": "Pattern variables grant immediate access to account-specific state without intermediate casting steps."
    },
    {
      "id": "oop12-ex39",
      "title": "Vehicle Inspection Station Horsepower Check",
      "problemStatement": "Build class `Vehicle` with `String plate = \"ABC-123\"`. Subclass `SportsCar` extends `Vehicle` with `int horsepower = 450`. In method `void evaluateForRacetrack(Vehicle v)`, use pattern matching with a compound condition: `if (v instanceof SportsCar sc && sc.horsepower >= 400)` to certify it for track racing.",
      "hint": "Combine pattern variable access with numerical comparison in one guard expression.",
      "solutionCode": "class Vehicle {\n    String plate;\n    Vehicle(String plate) { this.plate = plate; }\n}\n\nclass SportsCar extends Vehicle {\n    int horsepower;\n    SportsCar(String plate, int horsepower) {\n        super(plate);\n        this.horsepower = horsepower;\n    }\n}\n\npublic class Solution {\n    static void evaluateForRacetrack(Vehicle v) {\n        if (v instanceof SportsCar sc && sc.horsepower >= 400) {\n            System.out.println(\"Approved for Racetrack: \" + sc.plate + \" (\" + sc.horsepower + \" HP)\");\n        } else {\n            System.out.println(\"Denied: Vehicle does not qualify for racetrack entry.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        evaluateForRacetrack(new SportsCar(\"RACE-99\", 450));\n        evaluateForRacetrack(new SportsCar(\"SLOW-1\", 180));\n    }\n}",
      "output": "Approved for Racetrack: RACE-99 (450 HP)\nDenied: Vehicle does not qualify for racetrack entry.",
      "explanation": "Compound pattern conditions allow filtering objects by both class type and field values simultaneously."
    },
    {
      "id": "oop12-ex40",
      "title": "Three-Tier Pattern Matching Dispatch Engine",
      "problemStatement": "Implement a 3-tier hierarchy: `Entity`, `Hero extends Entity`, and `Paladin extends Hero` with field `int holyPower = 100`. Write a method `describeEntity(Entity e)` using pattern matching in an if-else ladder: test for `Paladin`, then `Hero`, then fallback to generic `Entity`. In `main()`, pass a `Paladin` and a `Hero`.",
      "hint": "Check the most specific subclass (Paladin) first; testing Hero first would match Paladin as well.",
      "solutionCode": "class Entity {\n    String name;\n    Entity(String name) { this.name = name; }\n}\n\nclass Hero extends Entity {\n    Hero(String name) { super(name); }\n}\n\nclass Paladin extends Hero {\n    int holyPower = 100;\n    Paladin(String name) { super(name); }\n}\n\npublic class Solution {\n    static void describeEntity(Entity e) {\n        if (e instanceof Paladin p) {\n            System.out.println(\"Paladin: \" + p.name + \" wielding \" + p.holyPower + \" holy power.\");\n        } else if (e instanceof Hero h) {\n            System.out.println(\"Hero: \" + h.name + \" ready for battle.\");\n        } else {\n            System.out.println(\"Generic Entity: \" + e.name);\n        }\n    }\n\n    public static void main(String[] args) {\n        describeEntity(new Paladin(\"Uther\"));\n        describeEntity(new Hero(\"Arthur\"));\n    }\n}",
      "output": "Paladin: Uther wielding 100 holy power.\nHero: Arthur ready for battle.",
      "explanation": "Testing subclasses from most specific (Paladin) to more general (Hero) ensures proper pattern matching dispatch."
    }
  ]
};
