import json
import os

exercises_data = {
    "compile-vs-runtime-polymorphism": [
        {
            "id": "oop12-ex01",
            "title": "Overloaded Price Calculation vs Overridden Delivery Fee",
            "problemStatement": "Create a `DeliveryService` class with compile-time polymorphism: two overloaded `calculateBasePrice` methods (one taking `double weight`, one taking `double weight, double distance`). Provide a method `calculateDeliveryFee(double distance)` returning `distance * 0.5`. Subclass `ExpressDelivery` overrides `calculateDeliveryFee(double distance)` returning `distance * 1.2 + 5.0`. In `main()`, test both overloaded methods and the overridden method.",
            "hint": "Method overloading is resolved at compile time based on parameter signatures. Method overriding is resolved at runtime based on the actual object on the heap.",
            "solutionCode": """class DeliveryService {
    double calculateBasePrice(double weight) {
        return weight * 2.0;
    }

    double calculateBasePrice(double weight, double distance) {
        return (weight * 2.0) + (distance * 0.1);
    }

    double calculateDeliveryFee(double distance) {
        return distance * 0.5;
    }
}

class ExpressDelivery extends DeliveryService {
    @Override
    double calculateDeliveryFee(double distance) {
        return (distance * 1.2) + 5.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        DeliveryService service = new ExpressDelivery();

        // Compile-time overloading
        System.out.println("Base price (weight only): $" + service.calculateBasePrice(10.0));
        System.out.println("Base price (weight + dist): $" + service.calculateBasePrice(10.0, 50.0));

        // Runtime dynamic dispatch
        System.out.println("Delivery fee: $" + service.calculateDeliveryFee(50.0));
    }
}""",
            "output": "Base price (weight only): $20.0\nBase price (weight + dist): $25.0\nDelivery fee: $65.0",
            "explanation": "Overloaded calculateBasePrice calls are resolved at compile time based on argument count. The calculateDeliveryFee call is resolved dynamically at runtime by invoking ExpressDelivery's overridden method."
        },
        {
            "id": "oop12-ex02",
            "title": "Field Shadowing Resolution vs Method Overriding",
            "problemStatement": "Demonstrate the critical distinction between field binding and method dispatch: class `Parent` has `int value = 100` and `getValue()` returning 100. Subclass `Child` declares `int value = 200` and overrides `getValue()` returning 200. In `main()`, assign a `Child` instance to a `Parent` reference variable: `Parent ref = new Child();`. Print `ref.value` and `ref.getValue()`.",
            "hint": "In Java, instance fields are NOT polymorphic. They are bound at compile time based on the reference type, while instance methods are dispatched dynamically at runtime.",
            "solutionCode": """class Parent {
    int value = 100;

    int getValue() {
        return value;
    }
}

class Child extends Parent {
    int value = 200;

    @Override
    int getValue() {
        return value;
    }
}

public class Solution {
    public static void main(String[] args) {
        Parent ref = new Child();

        System.out.println("Field access (ref.value): " + ref.value);
        System.out.println("Method call (ref.getValue()): " + ref.getValue());
    }
}""",
            "output": "Field access (ref.value): 100\nMethod call (ref.getValue()): 200",
            "explanation": "ref.value accesses Parent.value (100) because field access is resolved at compile time using the reference type. ref.getValue() invokes Child's overridden method (200) via dynamic method dispatch."
        },
        {
            "id": "oop12-ex03",
            "title": "Static Method Hiding vs Dynamic Instance Method Dispatch",
            "problemStatement": "Create a `Report` class with a static method `printHeader()` and an instance method `generateBody()`. Create a subclass `FinancialReport` that defines a static method `printHeader()` (method hiding) and overrides `generateBody()`. In `main()`, declare `Report rep = new FinancialReport();` and invoke both methods.",
            "hint": "Static methods cannot be overridden; they are hidden and bound at compile time using the reference type.",
            "solutionCode": """class Report {
    static void printHeader() {
        System.out.println("--- STANDARD REPORT HEADER ---");
    }

    void generateBody() {
        System.out.println("Standard summary data.");
    }
}

class FinancialReport extends Report {
    static void printHeader() {
        System.out.println("$$$ FINANCIAL AUDIT REPORT $$$");
    }

    @Override
    void generateBody() {
        System.out.println("Q4 Financial ledger and balance sheet.");
    }
}

public class Solution {
    public static void main(String[] args) {
        Report rep = new FinancialReport();

        // Static method call via reference type
        rep.printHeader();

        // Virtual method call via runtime object type
        rep.generateBody();
    }
}""",
            "output": "--- STANDARD REPORT HEADER ---\nQ4 Financial ledger and balance sheet.",
            "explanation": "rep.printHeader() resolves at compile time to Report.printHeader() because static methods do not participate in runtime polymorphism. rep.generateBody() dynamically dispatches to FinancialReport at runtime."
        },
        {
            "id": "oop12-ex04",
            "title": "Printer Output Overloading vs LaserPrinter Device Status Override",
            "problemStatement": "Build a `Printer` class with overloaded methods: `print(String doc)` and `print(String doc, int copies)`. Add an instance method `getStatus()` returning 'Standard printer online'. Subclass `LaserPrinter` overrides `getStatus()` returning 'Laser printer online [Toner: 94%]'. In `main()`, test overloaded printing and overridden status using a `Printer` reference pointing to `LaserPrinter`.",
            "hint": "Compile-time polymorphism selects the overloaded method; runtime polymorphism dispatches the status check.",
            "solutionCode": """class Printer {
    void print(String doc) {
        System.out.println("Printing 1 copy of: " + doc);
    }

    void print(String doc, int copies) {
        System.out.println("Printing " + copies + " copies of: " + doc);
    }

    String getStatus() {
        return "Standard printer online";
    }
}

class LaserPrinter extends Printer {
    @Override
    String getStatus() {
        return "Laser printer online [Toner: 94%]";
    }
}

public class Solution {
    public static void main(String[] args) {
        Printer p = new LaserPrinter();

        p.print("AnnualReport.pdf");
        p.print("Flyer.png", 5);
        System.out.println("Status: " + p.getStatus());
    }
}""",
            "output": "Printing 1 copy of: AnnualReport.pdf\nPrinting 5 copies of: Flyer.png\nStatus: Laser printer online [Toner: 94%]",
            "explanation": "Overloaded methods provide convenient compile-time interfaces, while getStatus() uses runtime polymorphism to report laser-specific status."
        },
        {
            "id": "oop12-ex05",
            "title": "Shape Drawing with Overloaded Scaling and Overridden Render",
            "problemStatement": "Implement `Shape` with overloaded methods `scale(int percent)` and `scale(double factor)`, returning formatted string descriptions. Include a method `render()` returning 'Generic Shape'. Subclass `Circle` overrides `render()` returning 'Drawing Circle O'. In `main()`, invoke both scale variants and render using a `Shape` reference.",
            "hint": "Overloaded method calls are matched to parameter types by the compiler.",
            "solutionCode": """class Shape {
    String scale(int percent) {
        return "Scaled by integer: " + percent + "%";
    }

    String scale(double factor) {
        return "Scaled by double factor: " + factor + "x";
    }

    String render() {
        return "Generic Shape";
    }
}

class Circle extends Shape {
    @Override
    String render() {
        return "Drawing Circle O";
    }
}

public class Solution {
    public static void main(String[] args) {
        Shape s = new Circle();

        System.out.println(s.scale(150));
        System.out.println(s.scale(2.5));
        System.out.println(s.render());
    }
}""",
            "output": "Scaled by integer: 150%\nScaled by double factor: 2.5x\nDrawing Circle O",
            "explanation": "The compiler binds the calls to scale(int) and scale(double) based on argument types. The render() call is dispatched to Circle at runtime."
        },
        {
            "id": "oop12-ex06",
            "title": "Upcast Reference Invoking Overloaded Method with Widening Conversion",
            "problemStatement": "Create a class `Calculator` with overloaded methods: `process(double num)` and `process(Object obj)`. Subclass `SciCalculator` overrides `process(double num)` to print 'Scientific double: ' + num. In `main()`, call `process(10)` (passing an int literal) and `process(\"Hello\")` on a `Calculator c = new SciCalculator();` reference.",
            "hint": "Passing an `int` to `process` matches `process(double)` via primitive widening at compile time. At runtime, the overridden version in `SciCalculator` executes.",
            "solutionCode": """class Calculator {
    void process(double num) {
        System.out.println("Standard double: " + num);
    }

    void process(Object obj) {
        System.out.println("Object processor: " + obj);
    }
}

class SciCalculator extends Calculator {
    @Override
    void process(double num) {
        System.out.println("Scientific double: " + num);
    }
}

public class Solution {
    public static void main(String[] args) {
        Calculator c = new SciCalculator();

        // int 10 widens to double 10.0 at compile-time -> dynamic dispatch to SciCalculator
        c.process(10);
        // String matches Object -> Calculator.process(Object)
        c.process("Hello");
    }
}""",
            "output": "Scientific double: 10.0\nObject processor: Hello",
            "explanation": "Compile-time resolution selects process(double) for the integer argument via widening conversion. Runtime dispatch then executes SciCalculator's implementation."
        },
        {
            "id": "oop12-ex07",
            "title": "Payment Gateway with Overloaded Validation and Overridden Processing",
            "problemStatement": "Define `PaymentGateway` with overloaded validation methods: `validate(String account)` and `validate(String account, double amount)`. Define `process(double amount)` returning 'Standard settlement: $' + amount. Subclass `CryptoGateway` overrides `process(double amount)` returning 'Blockchain ledger confirmation: $' + amount. Test in `main()`.",
            "hint": "Demonstrate compile-time validation checks followed by polymorphic payment processing.",
            "solutionCode": """class PaymentGateway {
    boolean validate(String account) {
        return account != null && account.length() >= 5;
    }

    boolean validate(String account, double amount) {
        return validate(account) && amount > 0;
    }

    String process(double amount) {
        return "Standard settlement: $" + amount;
    }
}

class CryptoGateway extends PaymentGateway {
    @Override
    String process(double amount) {
        return "Blockchain ledger confirmation: $" + amount;
    }
}

public class Solution {
    public static void main(String[] args) {
        PaymentGateway gateway = new CryptoGateway();

        System.out.println("Valid account: " + gateway.validate("ACC-1234"));
        System.out.println("Valid amount: " + gateway.validate("ACC-1234", 250.0));
        System.out.println("Process result: " + gateway.process(250.0));
    }
}""",
            "output": "Valid account: true\nValid amount: true\nProcess result: Blockchain ledger confirmation: $250.0",
            "explanation": "Gateway validation executes compile-time resolved overloaded methods, while transaction processing dispatches to CryptoGateway at runtime."
        },
        {
            "id": "oop12-ex08",
            "title": "Notification System with Overloaded Formatting and Overridden Send",
            "problemStatement": "Build a `Notifier` class with overloaded `formatMessage(String msg)` and `formatMessage(String msg, String priority)`. Include `send(String msg)` printing 'Sending notification: ' + msg. Subclass `SmsNotifier` overrides `send(String msg)` to print 'Sending SMS [160-char max]: ' + msg. Test via `Notifier n = new SmsNotifier();`.",
            "hint": "Combine compile-time message formatting with runtime channel dispatch.",
            "solutionCode": """class Notifier {
    String formatMessage(String msg) {
        return "[INFO] " + msg;
    }

    String formatMessage(String msg, String priority) {
        return "[" + priority.toUpperCase() + "] " + msg;
    }

    void send(String msg) {
        System.out.println("Sending notification: " + msg);
    }
}

class SmsNotifier extends Notifier {
    @Override
    void send(String msg) {
        System.out.println("Sending SMS [160-char max]: " + msg);
    }
}

public class Solution {
    public static void main(String[] args) {
        Notifier n = new SmsNotifier();

        String m1 = n.formatMessage("System update scheduled.");
        String m2 = n.formatMessage("Server temperature critical!", "Urgent");

        n.send(m1);
        n.send(m2);
    }
}""",
            "output": "Sending SMS [160-char max]: [INFO] System update scheduled.\nSending SMS [160-char max]: [URGENT] Server temperature critical!",
            "explanation": "The overloaded formatting helpers run from Notifier; dynamic dispatch ensures SmsNotifier delivers both formatted strings."
        },
        {
            "id": "oop12-ex09",
            "title": "Employee Shadowed Salary Field vs Overridden Net Pay",
            "problemStatement": "Define `Staff` with field `double salary = 3000.0` and method `getNetPay()` returning `salary`. Subclass `Executive` declares `double salary = 8000.0` and overrides `getNetPay()` returning `this.salary + 2000.0`. In `main()`, print field access and method call via both `Staff s = new Executive();` and `Executive e = new Executive();`.",
            "hint": "Examine how the reference type dictates field access, while the runtime object dictates method invocation.",
            "solutionCode": """class Staff {
    double salary = 3000.0;

    double getNetPay() {
        return salary;
    }
}

class Executive extends Staff {
    double salary = 8000.0;

    @Override
    double getNetPay() {
        return this.salary + 2000.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Staff s = new Executive();
        Executive e = new Executive();

        System.out.println("s.salary (Staff ref): $" + s.salary);
        System.out.println("s.getNetPay() (Staff ref): $" + s.getNetPay());
        System.out.println("e.salary (Executive ref): $" + e.salary);
        System.out.println("e.getNetPay() (Executive ref): $" + e.getNetPay());
    }
}""",
            "output": "s.salary (Staff ref): $3000.0\ns.getNetPay() (Staff ref): $10000.0\ne.salary (Executive ref): $8000.0\ne.getNetPay() (Executive ref): $10000.0",
            "explanation": "Field access is non-polymorphic: s.salary looks at Staff's field ($3000.0). Method getNetPay() is polymorphic: both calls dispatch to Executive's getNetPay() ($10000.0)."
        },
        {
            "id": "oop12-ex10",
            "title": "Audio Player Hierarchy with Overloaded Playlist and Overridden Equalizer",
            "problemStatement": "Create an `AudioPlayer` with overloaded `load(String track)` and `load(String track, int trackNumber)`. Define `play()` which prints 'Standard audio playing'. Subclass `HiFiPlayer` overrides `play()` to print 'Hi-Fi 24-bit lossless streaming'. Test in `main()` using an `AudioPlayer` reference.",
            "hint": "Demonstrate the harmony of early binding for track loading and late binding for audio playback.",
            "solutionCode": """class AudioPlayer {
    void load(String track) {
        System.out.println("Loaded track: " + track);
    }

    void load(String track, int trackNumber) {
        System.out.println("Loaded track #" + trackNumber + ": " + track);
    }

    void play() {
        System.out.println("Standard audio playing");
    }
}

class HiFiPlayer extends AudioPlayer {
    @Override
    void play() {
        System.out.println("Hi-Fi 24-bit lossless streaming");
    }
}

public class Solution {
    public static void main(String[] args) {
        AudioPlayer player = new HiFiPlayer();

        player.load("Symphony No. 5");
        player.load("Moonlight Sonata", 2);
        player.play();
    }
}""",
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
            "solutionCode": """class Vehicle {
    String startEngine() {
        return "Generic engine starts";
    }
}

class Car extends Vehicle {
    @Override
    String startEngine() {
        return "Vroom Vroom!";
    }
}

class Motorcycle extends Vehicle {
    @Override
    String startEngine() {
        return "Braap Braap!";
    }
}

class Truck extends Vehicle {
    @Override
    String startEngine() {
        return "Chug Chug Chug!";
    }
}

public class Solution {
    public static void main(String[] args) {
        Vehicle[] fleet = { new Car(), new Motorcycle(), new Truck() };

        for (Vehicle v : fleet) {
            System.out.println(v.startEngine());
        }
    }
}""",
            "output": "Vroom Vroom!\nBraap Braap!\nChug Chug Chug!",
            "explanation": "Dynamic method dispatch invokes the proper startEngine() implementation for each object at runtime, even though all are accessed through Vehicle references."
        },
        {
            "id": "oop12-ex12",
            "title": "Base Class Template Calling Dynamically Dispatched Method",
            "problemStatement": "Design a `GameCharacter` class with a `takeTurn()` method that prints 'Turn begins...' and then calls `this.performAction()`. Subclass `Warrior` overrides `performAction()` to print 'Swings broadsword!'. Subclass `Healer` overrides `performAction()` to print 'Casts healing light!'. In `main()`, call `takeTurn()` on both characters.",
            "hint": "Even when called from within a base class method (`takeTurn()`), `this.performAction()` dynamically dispatches to the subclass override.",
            "solutionCode": """class GameCharacter {
    void takeTurn() {
        System.out.print("Turn begins: ");
        performAction();
    }

    void performAction() {
        System.out.println("Idle action.");
    }
}

class Warrior extends GameCharacter {
    @Override
    void performAction() {
        System.out.println("Swings broadsword!");
    }
}

class Healer extends GameCharacter {
    @Override
    void performAction() {
        System.out.println("Casts healing light!");
    }
}

public class Solution {
    public static void main(String[] args) {
        GameCharacter warrior = new Warrior();
        GameCharacter healer = new Healer();

        warrior.takeTurn();
        healer.takeTurn();
    }
}""",
            "output": "Turn begins: Swings broadsword!\nTurn begins: Casts healing light!",
            "explanation": "When takeTurn() calls performAction(), the JVM looks up the vtable of the runtime object (Warrior or Healer) rather than GameCharacter."
        },
        {
            "id": "oop12-ex13",
            "title": "Multi-Tier Employee Hierarchy Bonus Dispatch",
            "problemStatement": "Create an `Employee` class with method `double getBonus(double baseSalary)`. Subclasses `Developer` (bonus is 10% of base), `TeamLead` (bonus is 18% of base), and `Director` (bonus is 30% of base + $5000.0) each override `getBonus()`. In `main()`, create an `Employee[]` with all three roles, compute their bonuses for a $100,000 base salary, and print total bonus payout.",
            "hint": "Iterate through the array and accumulate `emp.getBonus(100000.0)`.",
            "solutionCode": """class Employee {
    double getBonus(double baseSalary) {
        return 0.0;
    }
}

class Developer extends Employee {
    @Override
    double getBonus(double baseSalary) {
        return baseSalary * 0.10;
    }
}

class TeamLead extends Employee {
    @Override
    double getBonus(double baseSalary) {
        return baseSalary * 0.18;
    }
}

class Director extends Employee {
    @Override
    double getBonus(double baseSalary) {
        return (baseSalary * 0.30) + 5000.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Employee[] staff = { new Developer(), new TeamLead(), new Director() };
        double totalBonus = 0.0;

        for (Employee e : staff) {
            double bonus = e.getBonus(100000.0);
            totalBonus += bonus;
            System.out.println("Bonus: $" + bonus);
        }

        System.out.println("Total Payout: $" + totalBonus);
    }
}""",
            "output": "Bonus: $10000.0\nBonus: $18000.0\nBonus: $35000.0\nTotal Payout: $63000.0",
            "explanation": "Dynamic method dispatch enables clean polymorphism: each employee calculates their specific bonus tier without requiring instanceof or switch statements."
        },
        {
            "id": "oop12-ex14",
            "title": "Game Entity Damage Mitigation Pipeline",
            "problemStatement": "Implement `Entity` with method `int takeDamage(int rawDamage)` returning `rawDamage`. Subclass `ArmoredKnight` overrides it to subtract 15 armor points (minimum 0 damage). Subclass `ShieldBearer` overrides it to block 50% of damage. In `main()`, subject an array of both entities to 40 points of raw damage and display damage taken.",
            "hint": "Use `Math.max(0, rawDamage - 15)` for the knight and `rawDamage / 2` for the shield bearer.",
            "solutionCode": """class Entity {
    int takeDamage(int rawDamage) {
        return rawDamage;
    }
}

class ArmoredKnight extends Entity {
    @Override
    int takeDamage(int rawDamage) {
        return Math.max(0, rawDamage - 15);
    }
}

class ShieldBearer extends Entity {
    @Override
    int takeDamage(int rawDamage) {
        return rawDamage / 2;
    }
}

public class Solution {
    public static void main(String[] args) {
        Entity[] party = { new ArmoredKnight(), new ShieldBearer() };
        int incoming = 40;

        for (Entity e : party) {
            System.out.println(e.getClass().getSimpleName() + " takes " + e.takeDamage(incoming) + " damage");
        }
    }
}""",
            "output": "ArmoredKnight takes 25 damage\nShieldBearer takes 20 damage",
            "explanation": "Virtual method invocation directs the incoming attack through each entity's specialized damage mitigation logic."
        },
        {
            "id": "oop12-ex15",
            "title": "Document Rendering Pipeline Across Formats",
            "problemStatement": "Create a `Document` base class with `render(String content)`. Subclasses `PdfDocument`, `HtmlDocument`, and `MarkdownDocument` override `render` to format content with respective tags: `[PDF: content]`, `<html>content</html>`, and `**content**`. In `main()`, iterate over an array of documents and render 'Hello Polymorphism'.",
            "hint": "Define a common `render` method in `Document` so caller code is decoupled from concrete document types.",
            "solutionCode": """class Document {
    void render(String content) {
        System.out.println(content);
    }
}

class PdfDocument extends Document {
    @Override
    void render(String content) {
        System.out.println("[PDF: " + content + "]");
    }
}

class HtmlDocument extends Document {
    @Override
    void render(String content) {
        System.out.println("<html>" + content + "</html>");
    }
}

class MarkdownDocument extends Document {
    @Override
    void render(String content) {
        System.out.println("**" + content + "**");
    }
}

public class Solution {
    public static void main(String[] args) {
        Document[] docs = { new PdfDocument(), new HtmlDocument(), new MarkdownDocument() };

        for (Document doc : docs) {
            doc.render("Hello Polymorphism");
        }
    }
}""",
            "output": "[PDF: Hello Polymorphism]\n<html>Hello Polymorphism</html>\n**Hello Polymorphism**",
            "explanation": "The client iterates over Document references; the runtime environment dispatches each render() call to the appropriate format exporter."
        },
        {
            "id": "oop12-ex16",
            "title": "Musical Instrument Sound Synthesis Dispatch",
            "problemStatement": "Create an `Instrument` class with method `play(String note)`. Subclass `Piano` prints 'Piano plays chord: ' + note. Subclass `Violin` prints 'Violin bows note: ' + note. Subclass `Flute` prints 'Flute blows tone: ' + note. In `main()`, play note 'C# Minor' across an orchestra array.",
            "hint": "Construct an array `Instrument[] orchestra = { ... }` and invoke `play(\"C# Minor\")`.",
            "solutionCode": """class Instrument {
    void play(String note) {
        System.out.println("Sound of " + note);
    }
}

class Piano extends Instrument {
    @Override
    void play(String note) {
        System.out.println("Piano plays chord: " + note);
    }
}

class Violin extends Instrument {
    @Override
    void play(String note) {
        System.out.println("Violin bows note: " + note);
    }
}

class Flute extends Instrument {
    @Override
    void play(String note) {
        System.out.println("Flute blows tone: " + note);
    }
}

public class Solution {
    public static void main(String[] args) {
        Instrument[] orchestra = { new Piano(), new Violin(), new Flute() };

        for (Instrument inst : orchestra) {
            inst.play("C# Minor");
        }
    }
}""",
            "output": "Piano plays chord: C# Minor\nViolin bows note: C# Minor\nFlute blows tone: C# Minor",
            "explanation": "Dynamic method dispatch executes the overridden play() method for each musical instrument based on its concrete type."
        },
        {
            "id": "oop12-ex17",
            "title": "Bank Transaction Fee Evaluation Across Account Tiers",
            "problemStatement": "Build an `Account` class with method `double calculateFee(double amount)`. Subclasses `StandardAccount` (charges 2.5% fee), `GoldAccount` (charges 1.0% fee), and `PlatinumAccount` (charges $0.0 fee). In `main()`, process a transfer of $1000.0 across all three account types stored in an array.",
            "hint": "Return `amount * 0.025` for standard, `amount * 0.01` for gold, and `0.0` for platinum.",
            "solutionCode": """class Account {
    double calculateFee(double amount) {
        return amount * 0.05;
    }
}

class StandardAccount extends Account {
    @Override
    double calculateFee(double amount) {
        return amount * 0.025;
    }
}

class GoldAccount extends Account {
    @Override
    double calculateFee(double amount) {
        return amount * 0.01;
    }
}

class PlatinumAccount extends Account {
    @Override
    double calculateFee(double amount) {
        return 0.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Account[] accounts = { new StandardAccount(), new GoldAccount(), new PlatinumAccount() };
        double transfer = 1000.0;

        for (Account acc : accounts) {
            System.out.println(acc.getClass().getSimpleName() + " fee: $" + acc.calculateFee(transfer));
        }
    }
}""",
            "output": "StandardAccount fee: $25.0\nGoldAccount fee: $10.0\nPlatinumAccount fee: $0.0",
            "explanation": "Each account tier calculates fees polymorphically, ensuring financial rules are encapsulated within each respective class."
        },
        {
            "id": "oop12-ex18",
            "title": "IoT Sensor Monitoring System Polling Dispatch",
            "problemStatement": "Create a `Sensor` base class with method `String readTelemetry()`. Subclasses `TemperatureSensor` (returns '22.5 C'), `PressureSensor` (returns '1013.2 hPa'), and `HumiditySensor` (returns '45% RH'). In `main()`, poll an array of sensors and print the telemetry stream.",
            "hint": "The monitoring system loops through `Sensor[]` without needing to know specific sensor hardware models.",
            "solutionCode": """class Sensor {
    String readTelemetry() {
        return "No data";
    }
}

class TemperatureSensor extends Sensor {
    @Override
    String readTelemetry() {
        return "22.5 C";
    }
}

class PressureSensor extends Sensor {
    @Override
    String readTelemetry() {
        return "1013.2 hPa";
    }
}

class HumiditySensor extends Sensor {
    @Override
    String readTelemetry() {
        return "45% RH";
    }
}

public class Solution {
    public static void main(String[] args) {
        Sensor[] sensors = { new TemperatureSensor(), new PressureSensor(), new HumiditySensor() };

        for (Sensor s : sensors) {
            System.out.println("Telemetry: " + s.readTelemetry());
        }
    }
}""",
            "output": "Telemetry: 22.5 C\nTelemetry: 1013.2 hPa\nTelemetry: 45% RH",
            "explanation": "Dynamic method dispatch enables uniform sensor polling across heterogeneous hardware devices."
        },
        {
            "id": "oop12-ex19",
            "title": "Three-Tier Vehicle Hierarchy with Intermediate Non-Overriding Class",
            "problemStatement": "Demonstrate vtable resolution when an intermediate class skips overriding: class `Machine` defines `void runDiagnostics()` printing 'Basic machine self-test'. Subclass `Vehicle` extends `Machine` but DOES NOT override `runDiagnostics()`. Subclass `RaceCar` extends `Vehicle` and overrides `runDiagnostics()` printing 'RaceCar telemetry check: Tires, Aero, Turbo ready'. In `main()`, call `runDiagnostics()` via `Machine m = new RaceCar();`.",
            "hint": "The JVM checks RaceCar's vtable slot first; finding the override, it executes it directly.",
            "solutionCode": """class Machine {
    void runDiagnostics() {
        System.out.println("Basic machine self-test");
    }
}

class Vehicle extends Machine {
    // Does not override runDiagnostics()
}

class RaceCar extends Vehicle {
    @Override
    void runDiagnostics() {
        System.out.println("RaceCar telemetry check: Tires, Aero, Turbo ready");
    }
}

public class Solution {
    public static void main(String[] args) {
        Machine m = new RaceCar();
        m.runDiagnostics();
    }
}""",
            "output": "RaceCar telemetry check: Tires, Aero, Turbo ready",
            "explanation": "Even though Vehicle skips overriding, RaceCar's override populates the vtable slot, resolving the call dynamically to RaceCar."
        },
        {
            "id": "oop12-ex20",
            "title": "Dynamic Order Discount Engine",
            "problemStatement": "Build an `Order` base class with `double getDiscountRate()`. Subclasses `StandardOrder` (returns 0.0), `SeasonalOrder` (returns 0.10), and `VipOrder` (returns 0.25). Write a static method `double computeFinalTotal(Order order, double subtotal)` that calculates `subtotal * (1.0 - order.getDiscountRate())`. In `main()`, compute totals for $200.0 across all three order types.",
            "hint": "`computeFinalTotal` accepts a base `Order` reference and relies on dynamic dispatch to fetch the right discount rate.",
            "solutionCode": """class Order {
    double getDiscountRate() {
        return 0.0;
    }
}

class StandardOrder extends Order {
    @Override
    double getDiscountRate() {
        return 0.0;
    }
}

class SeasonalOrder extends Order {
    @Override
    double getDiscountRate() {
        return 0.10;
    }
}

class VipOrder extends Order {
    @Override
    double getDiscountRate() {
        return 0.25;
    }
}

public class Solution {
    static double computeFinalTotal(Order order, double subtotal) {
        return subtotal * (1.0 - order.getDiscountRate());
    }

    public static void main(String[] args) {
        double subtotal = 200.0;

        System.out.println("Standard Total: $" + computeFinalTotal(new StandardOrder(), subtotal));
        System.out.println("Seasonal Total: $" + computeFinalTotal(new SeasonalOrder(), subtotal));
        System.out.println("VIP Total: $" + computeFinalTotal(new VipOrder(), subtotal));
    }
}""",
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
            "solutionCode": """class Staff {
    String name = "Staff Member";
}

class Developer extends Staff {
    void writeCode() {
        System.out.println("Writing robust Java code!");
    }
}

public class Solution {
    public static void main(String[] args) {
        // Implicit upcast
        Staff staff = new Developer();

        // staff.writeCode(); // COMPILE ERROR: Staff has no method writeCode()

        // Explicit downcast
        Developer dev = (Developer) staff;
        dev.writeCode();
    }
}""",
            "output": "Writing robust Java code!",
            "explanation": "Upcasting restricts visibility to Staff members. Explicit downcasting restores access to Developer-specific methods after verifying the underlying object."
        },
        {
            "id": "oop12-ex22",
            "title": "Catching ClassCastException in Unguarded Narrowing Cast",
            "problemStatement": "Demonstrate what happens when an invalid downcast is performed: class `Animal`, `Dog extends Animal`, and `Cat extends Animal`. In `main()`, upcast a `Cat` to `Animal animal = new Cat();`. Inside a `try-catch` block, attempt to downcast `Dog d = (Dog) animal;`. Catch `ClassCastException` and print an error message.",
            "hint": "The JVM verifies the object's actual runtime class during downcasting. Since Cat is not a Dog, it throws `ClassCastException`.",
            "solutionCode": """class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}

public class Solution {
    public static void main(String[] args) {
        Animal animal = new Cat();

        try {
            Dog d = (Dog) animal;
            System.out.println("Cast succeeded!");
        } catch (ClassCastException e) {
            System.out.println("Caught ClassCastException: Cat cannot be cast to Dog");
        }
    }
}""",
            "output": "Caught ClassCastException: Cat cannot be cast to Dog",
            "explanation": "Because animal points to a Cat on the heap, forcing a cast to sibling type Dog fails runtime type verification."
        },
        {
            "id": "oop12-ex23",
            "title": "Heterogeneous Object Array Inspection with Casting",
            "problemStatement": "Declare an `Object[] items = { \"Hello Polymorphism\", Integer.valueOf(42), Double.valueOf(3.14) };`. Iterate through the array. If the item is a String, downcast to String and print its length. If Integer, downcast to Integer and print double its value. If Double, downcast and print it formatted to 1 decimal place. Use `item.getClass().getName()` or checks.",
            "hint": "Downcasting allows extracting concrete wrapper types from generic Object references.",
            "solutionCode": """public class Solution {
    public static void main(String[] args) {
        Object[] items = { "Hello Polymorphism", Integer.valueOf(42), Double.valueOf(3.14) };

        for (Object item : items) {
            if (item instanceof String) {
                String s = (String) item;
                System.out.println("String length: " + s.length());
            } else if (item instanceof Integer) {
                Integer i = (Integer) item;
                System.out.println("Integer doubled: " + (i * 2));
            } else if (item instanceof Double) {
                Double d = (Double) item;
                System.out.printf("Double formatted: %.1f%n", d);
            }
        }
    }
}""",
            "output": "String length: 18\nInteger doubled: 84\nDouble formatted: 3.1",
            "explanation": "Guarding downcasts prevents runtime ClassCastExceptions while operating on heterogeneous collections."
        },
        {
            "id": "oop12-ex24",
            "title": "Three-Level Downcasting to Access Specialized Electric Vehicle State",
            "problemStatement": "Build a 3-tier hierarchy: `Vehicle`, `Car extends Vehicle`, and `ElectricCar extends Car` with field `int batteryCapacityKwh = 85`. Upcast an ElectricCar to `Vehicle v = new ElectricCar();`. Downcast `v` directly to `ElectricCar ec` and display its battery capacity.",
            "hint": "You can downcast across multiple levels in a single cast expression as long as the underlying heap object matches.",
            "solutionCode": """class Vehicle {}
class Car extends Vehicle {}
class ElectricCar extends Car {
    int batteryCapacityKwh = 85;
}

public class Solution {
    public static void main(String[] args) {
        Vehicle v = new ElectricCar();

        // Direct multi-level downcast
        ElectricCar ec = (ElectricCar) v;
        System.out.println("Battery Capacity: " + ec.batteryCapacityKwh + " kWh");
    }
}""",
            "output": "Battery Capacity: 85 kWh",
            "explanation": "The underlying object on the heap is an ElectricCar, so downcasting directly from Vehicle to ElectricCar succeeds in one step."
        },
        {
            "id": "oop12-ex25",
            "title": "Casting Null References Without Exception",
            "problemStatement": "Demonstrate that casting a `null` reference to any reference type is completely valid in Java and never throws `ClassCastException`. Cast a null `Object` reference to `String` and `Integer`, printing their values.",
            "hint": "`null` is assignment-compatible with all reference types; the cast simply yields a null reference of the target type.",
            "solutionCode": """public class Solution {
    public static void main(String[] args) {
        Object obj = null;

        String s = (String) obj;
        Integer i = (Integer) obj;

        System.out.println("Casted String: " + s);
        System.out.println("Casted Integer: " + i);
        System.out.println("Is null equal? " + (s == i));
    }
}""",
            "output": "Casted String: null\nCasted Integer: null\nIs null equal? true",
            "explanation": "A null reference represents no object on the heap, so runtime type checking treats it as universally compatible without throwing ClassCastException."
        },
        {
            "id": "oop12-ex26",
            "title": "Preventing Sibling Casts with Class Hierarchy Integrity",
            "problemStatement": "Create a base class `Shape` and two sibling subclasses: `Circle` and `Square`. In `main()`, create a `Circle` held in a `Shape` reference: `Shape s = new Circle();`. Write a method `void tryCastToSquare(Shape shape)` that uses a try-catch block to attempt downcasting to `Square`. Print success or error message.",
            "hint": "Sibling classes share a common parent but have no inheritance relationship between themselves.",
            "solutionCode": """class Shape {}
class Circle extends Shape {}
class Square extends Shape {}

public class Solution {
    static void tryCastToSquare(Shape shape) {
        try {
            Square sq = (Square) shape;
            System.out.println("Successfully cast to Square");
        } catch (ClassCastException e) {
            System.out.println("Failed: Cannot cast sibling Circle to Square");
        }
    }

    public static void main(String[] args) {
        Shape s = new Circle();
        tryCastToSquare(s);
    }
}""",
            "output": "Failed: Cannot cast sibling Circle to Square",
            "explanation": "Even though Circle and Square both inherit from Shape, they cannot be cast to each other because neither IS-A the other."
        },
        {
            "id": "oop12-ex27",
            "title": "Media Playlist Downcasting to AudioBook for Duration Calculation",
            "problemStatement": "Create `MediaItem` with field `String title`. Subclass `AudioBook` extends `MediaItem` and adds `int durationMinutes`. In `main()`, create an array `MediaItem[] library` containing standard media items and audiobooks. Loop through the array, downcast any `AudioBook`, and compute total audiobook minutes.",
            "hint": "Check with `instanceof` before casting: `if (item instanceof AudioBook) { AudioBook ab = (AudioBook) item; ... }`.",
            "solutionCode": """class MediaItem {
    String title;
    MediaItem(String title) { this.title = title; }
}

class AudioBook extends MediaItem {
    int durationMinutes;

    AudioBook(String title, int durationMinutes) {
        super(title);
        this.durationMinutes = durationMinutes;
    }
}

public class Solution {
    public static void main(String[] args) {
        MediaItem[] library = {
            new AudioBook("Atomic Habits", 320),
            new MediaItem("Wallpaper Graphic"),
            new AudioBook("Clean Code", 480)
        };

        int totalAudioMinutes = 0;
        for (MediaItem item : library) {
            if (item instanceof AudioBook) {
                AudioBook book = (AudioBook) item;
                totalAudioMinutes += book.durationMinutes;
            }
        }

        System.out.println("Total AudioBook Duration: " + totalAudioMinutes + " minutes");
    }
}""",
            "output": "Total AudioBook Duration: 800 minutes",
            "explanation": "Guarded downcasting allows selective access to AudioBook's durationMinutes while safely ignoring generic MediaItems."
        },
        {
            "id": "oop12-ex28",
            "title": "Smart Device Array Downcast to Smartphone for Call Dialing",
            "problemStatement": "Build class `Appliance` with field `String model`. Subclass `SmartPhone` extends `Appliance` and adds `void makeEmergencyCall()`. Create an array `Appliance[] devices` with an Appliance and a SmartPhone. Find any SmartPhone, downcast it, and call `makeEmergencyCall()`.",
            "hint": "Use explicit cast `(SmartPhone) dev` after checking the type.",
            "solutionCode": """class Appliance {
    String model;
    Appliance(String model) { this.model = model; }
}

class SmartPhone extends Appliance {
    SmartPhone(String model) { super(model); }

    void makeEmergencyCall() {
        System.out.println(model + ": Dialing emergency services 911...");
    }
}

public class Solution {
    public static void main(String[] args) {
        Appliance[] devices = {
            new Appliance("Toaster-X"),
            new SmartPhone("Pixel 8")
        };

        for (Appliance dev : devices) {
            if (dev instanceof SmartPhone) {
                SmartPhone phone = (SmartPhone) dev;
                phone.makeEmergencyCall();
            }
        }
    }
}""",
            "output": "Pixel 8: Dialing emergency services 911...",
            "explanation": "Downcasting bridges the gap between generic device collections and telephony-specific capabilities."
        },
        {
            "id": "oop12-ex29",
            "title": "Shape Downcasting to Access Rectangle Dimensions",
            "problemStatement": "Create `Shape` base class with no dimension fields. Create subclass `Rectangle` with `double width` and `double height`. Upcast a Rectangle to `Shape s = new Rectangle(6.0, 8.0);`. Downcast `s` to `Rectangle` and calculate the diagonal using `Math.sqrt(w*w + h*h)`.",
            "hint": "Downcast to retrieve width and height: `((Rectangle) s).width`.",
            "solutionCode": """class Shape {}

class Rectangle extends Shape {
    double width;
    double height;

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
}

public class Solution {
    public static void main(String[] args) {
        Shape s = new Rectangle(6.0, 8.0);

        Rectangle r = (Rectangle) s;
        double diagonal = Math.sqrt((r.width * r.width) + (r.height * r.height));

        System.out.println("Rectangle Dimensions: " + r.width + " x " + r.height);
        System.out.println("Diagonal: " + diagonal);
    }
}""",
            "output": "Rectangle Dimensions: 6.0 x 8.0\nDiagonal: 10.0",
            "explanation": "Downcasting allows accessing subclass-specific fields that are not defined in the superclass interface."
        },
        {
            "id": "oop12-ex30",
            "title": "Safe Downcasting Wrapper Method Returning Boolean Success",
            "problemStatement": "Implement a helper method `static boolean tryProcessWorker(Object obj)` that takes an arbitrary `Object`. If `obj` is an instance of `Worker` (having method `doWork()`), downcast it, execute `doWork()`, and return true. Otherwise return false without throwing an exception. In `main()`, test with a `Worker` and a `String`.",
            "hint": "Use `instanceof` to guard the downcast and return false on non-matches.",
            "solutionCode": """class Worker {
    void doWork() {
        System.out.println("Worker task executed successfully.");
    }
}

public class Solution {
    static boolean tryProcessWorker(Object obj) {
        if (obj instanceof Worker) {
            Worker w = (Worker) obj;
            w.doWork();
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
        Object w = new Worker();
        Object s = "Not a worker";

        System.out.println("Worker processed? " + tryProcessWorker(w));
        System.out.println("String processed? " + tryProcessWorker(s));
    }
}""",
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
            "solutionCode": """class Vehicle {}
class Bicycle extends Vehicle {
    void ringBell() {
        System.out.println("Bicycle bell: Ring! Ring!");
    }
}

public class Solution {
    public static void main(String[] args) {
        Vehicle v = new Bicycle();

        // Traditional 2-step idiom
        if (v instanceof Bicycle) {
            Bicycle b = (Bicycle) v;
            b.ringBell();
        }
    }
}""",
            "output": "Bicycle bell: Ring! Ring!",
            "explanation": "Traditional instanceof safely tests the runtime type before downcasting, eliminating ClassCastException risk."
        },
        {
            "id": "oop12-ex32",
            "title": "Modern Pattern Matching for instanceof with Circle Radius",
            "problemStatement": "Rewrite the type test using modern Java 16+ pattern matching: class `Shape` and `Circle extends Shape` with `double radius = 7.0`. Given `Shape s = new Circle();`, use `if (s instanceof Circle c)` to access `c.radius` and print the circle's area without any explicit downcast.",
            "hint": "Syntax: `if (variable instanceof TargetType patternVariable)` binds the variable directly if true.",
            "solutionCode": """class Shape {}
class Circle extends Shape {
    double radius = 7.0;
}

public class Solution {
    public static void main(String[] args) {
        Shape s = new Circle();

        // Modern Pattern Matching for instanceof (Java 16+)
        if (s instanceof Circle c) {
            double area = Math.PI * c.radius * c.radius;
            System.out.printf("Circle radius: %.1f, Area: %.2f%n", c.radius, area);
        }
    }
}""",
            "output": "Circle radius: 7.0, Area: 153.94",
            "explanation": "Pattern matching for instanceof combines type verification and variable binding into a single concise, type-safe expression."
        },
        {
            "id": "oop12-ex33",
            "title": "Null Safety Evaluation with the instanceof Operator",
            "problemStatement": "Demonstrate that evaluating `null` with `instanceof` is guaranteed safe in Java: test a `null` reference against `String`, `Object`, and custom class `Vehicle`. Verify that all three evaluate to `false` and that no `NullPointerException` is thrown.",
            "hint": "The JLS specifies that `null instanceof AnyType` always returns false without throwing an exception.",
            "solutionCode": """class Vehicle {}

public class Solution {
    public static void main(String[] args) {
        Vehicle nullVehicle = null;

        boolean checkVehicle = nullVehicle instanceof Vehicle;
        boolean checkObject = nullVehicle instanceof Object;

        String nullStr = null;
        boolean checkString = nullStr instanceof String;

        System.out.println("null instanceof Vehicle: " + checkVehicle);
        System.out.println("null instanceof Object: " + checkObject);
        System.out.println("null instanceof String: " + checkString);
    }
}""",
            "output": "null instanceof Vehicle: false\nnull instanceof Object: false\nnull instanceof String: false",
            "explanation": "instanceof is intrinsically null-safe. You never need to write 'obj != null && obj instanceof Type'."
        },
        {
            "id": "oop12-ex34",
            "title": "Heterogeneous Shape Array Area Dispatch via Pattern Matching",
            "problemStatement": "Create an array `Shape[] shapes` containing a `Circle(radius = 4.0)` and a `Rectangle(width = 5.0, height = 3.0)`. Iterate through the array using modern pattern matching for `instanceof` to calculate and print the area for each shape.",
            "hint": "Use `if (shape instanceof Circle c) { ... } else if (shape instanceof Rectangle r) { ... }`.",
            "solutionCode": """class Shape {}

class Circle extends Shape {
    double radius;
    Circle(double radius) { this.radius = radius; }
}

class Rectangle extends Shape {
    double width, height;
    Rectangle(double width, double height) { this.width = width; this.height = height; }
}

public class Solution {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(4.0), new Rectangle(5.0, 3.0) };

        for (Shape shape : shapes) {
            if (shape instanceof Circle c) {
                System.out.printf("Circle Area: %.2f%n", Math.PI * c.radius * c.radius);
            } else if (shape instanceof Rectangle r) {
                System.out.println("Rectangle Area: " + (r.width * r.height));
            }
        }
    }
}""",
            "output": "Circle Area: 50.27\nRectangle Area: 15.0",
            "explanation": "Pattern matching streamlines heterogeneous array processing by binding typed variables directly within condition blocks."
        },
        {
            "id": "oop12-ex35",
            "title": "Pattern Matching with Logical AND Condition Combining Predicate",
            "problemStatement": "Combine pattern matching with additional boolean expressions: class `Employee` with `int performanceRating`. Subclass `Developer` extends `Employee` with `String favoriteLanguage`. Given `Employee emp = new Developer();`, write a single `if` statement using pattern matching AND an additional check: `if (emp instanceof Developer d && \"Java\".equals(d.favoriteLanguage))` to print approval.",
            "hint": "The pattern variable is immediately in scope on the right-hand side of the `&&` operator.",
            "solutionCode": """class Employee {
    int performanceRating = 5;
}

class Developer extends Employee {
    String favoriteLanguage = "Java";
}

public class Solution {
    public static void main(String[] args) {
        Employee emp = new Developer();

        // Pattern variable 'd' is in scope on the right side of &&
        if (emp instanceof Developer d && "Java".equals(d.favoriteLanguage)) {
            System.out.println("Selected Senior Java Developer: Rating " + d.performanceRating);
        }
    }
}""",
            "output": "Selected Senior Java Developer: Rating 5",
            "explanation": "Because && short-circuits, the right-hand expression only evaluates when the instanceof test succeeds, making pattern variable 'd' safely accessible."
        },
        {
            "id": "oop12-ex36",
            "title": "Guard Clause Early Return with Inverted Pattern Matching",
            "problemStatement": "Demonstrate flow-sensitive scoping with guard clauses: write a method `static void inspectTruck(Object obj)` that checks `if (!(obj instanceof Truck t)) return;`. In subsequent lines outside the if block, access fields of `t` directly to print truck specs. In `main()`, test with a Truck object and a String.",
            "hint": "When the inverted condition `!(obj instanceof Truck t)` is false, execution continues and the compiler knows `t` was definitely assigned!",
            "solutionCode": """class Truck {
    String model = "Mack Titan";
    int horsepower = 605;
}

public class Solution {
    static void inspectTruck(Object obj) {
        // Guard clause: if NOT a truck, exit immediately
        if (!(obj instanceof Truck t)) {
            System.out.println("Invalid payload: Not a truck.");
            return;
        }

        // 't' is definitely assigned and in scope here!
        System.out.println("Inspecting " + t.model + " with " + t.horsepower + " HP");
    }

    public static void main(String[] args) {
        inspectTruck(new Truck());
        inspectTruck("Sedan");
    }
}""",
            "output": "Inspecting Mack Titan with 605 HP\nInvalid payload: Not a truck.",
            "explanation": "Flow-sensitive scoping allows the pattern variable to remain in scope after an early return guard clause."
        },
        {
            "id": "oop12-ex37",
            "title": "Document Print Processor Dispatching via Pattern Matching",
            "problemStatement": "Create `Document` base class, `PdfDocument` with `int pageCount = 12`, and `WordDocument` with `int wordCount = 3500`. Create a method `void auditDocument(Document doc)` that uses pattern matching to print specific audit metrics for each format.",
            "hint": "Check `doc instanceof PdfDocument pdf` and `doc instanceof WordDocument word`.",
            "solutionCode": """class Document {}
class PdfDocument extends Document {
    int pageCount = 12;
}
class WordDocument extends Document {
    int wordCount = 3500;
}

public class Solution {
    static void auditDocument(Document doc) {
        if (doc instanceof PdfDocument pdf) {
            System.out.println("Auditing PDF: " + pdf.pageCount + " pages rendered.");
        } else if (doc instanceof WordDocument word) {
            System.out.println("Auditing Word Doc: " + word.wordCount + " words spellchecked.");
        }
    }

    public static void main(String[] args) {
        auditDocument(new PdfDocument());
        auditDocument(new WordDocument());
    }
}""",
            "output": "Auditing PDF: 12 pages rendered.\nAuditing Word Doc: 3500 words spellchecked.",
            "explanation": "Pattern matching eliminates cast boilerplate and clarifies format-specific audit logic."
        },
        {
            "id": "oop12-ex38",
            "title": "Financial Account Audit with Pattern Variables",
            "problemStatement": "Define `Account` base class with `double balance = 5000.0`. Subclass `SavingsAccount` adds `double interestRate = 0.04`. Subclass `CheckingAccount` adds `double overdraftFee = 35.0`. Write an audit method printing projected annual interest for savings, or overdraft terms for checking, using pattern matching.",
            "hint": "Extract interest using `sa.balance * sa.interestRate`.",
            "solutionCode": """class Account {
    double balance = 5000.0;
}

class SavingsAccount extends Account {
    double interestRate = 0.04;
}

class CheckingAccount extends Account {
    double overdraftFee = 35.0;
}

public class Solution {
    static void auditAccount(Account acc) {
        if (acc instanceof SavingsAccount sa) {
            double projectedInterest = sa.balance * sa.interestRate;
            System.out.println("Savings Account: Projected Interest $" + projectedInterest);
        } else if (acc instanceof CheckingAccount ca) {
            System.out.println("Checking Account: Balance $" + ca.balance + ", Overdraft fee $" + ca.overdraftFee);
        }
    }

    public static void main(String[] args) {
        auditAccount(new SavingsAccount());
        auditAccount(new CheckingAccount());
    }
}""",
            "output": "Savings Account: Projected Interest $200.0\nChecking Account: Balance $5000.0, Overdraft fee $35.0",
            "explanation": "Pattern variables grant immediate access to account-specific state without intermediate casting steps."
        },
        {
            "id": "oop12-ex39",
            "title": "Vehicle Inspection Station Horsepower Check",
            "problemStatement": "Build class `Vehicle` with `String plate = \"ABC-123\"`. Subclass `SportsCar` extends `Vehicle` with `int horsepower = 450`. In method `void evaluateForRacetrack(Vehicle v)`, use pattern matching with a compound condition: `if (v instanceof SportsCar sc && sc.horsepower >= 400)` to certify it for track racing.",
            "hint": "Combine pattern variable access with numerical comparison in one guard expression.",
            "solutionCode": """class Vehicle {
    String plate;
    Vehicle(String plate) { this.plate = plate; }
}

class SportsCar extends Vehicle {
    int horsepower;
    SportsCar(String plate, int horsepower) {
        super(plate);
        this.horsepower = horsepower;
    }
}

public class Solution {
    static void evaluateForRacetrack(Vehicle v) {
        if (v instanceof SportsCar sc && sc.horsepower >= 400) {
            System.out.println("Approved for Racetrack: " + sc.plate + " (" + sc.horsepower + " HP)");
        } else {
            System.out.println("Denied: Vehicle does not qualify for racetrack entry.");
        }
    }

    public static void main(String[] args) {
        evaluateForRacetrack(new SportsCar("RACE-99", 450));
        evaluateForRacetrack(new SportsCar("SLOW-1", 180));
    }
}""",
            "output": "Approved for Racetrack: RACE-99 (450 HP)\nDenied: Vehicle does not qualify for racetrack entry.",
            "explanation": "Compound pattern conditions allow filtering objects by both class type and field values simultaneously."
        },
        {
            "id": "oop12-ex40",
            "title": "Three-Tier Pattern Matching Dispatch Engine",
            "problemStatement": "Implement a 3-tier hierarchy: `Entity`, `Hero extends Entity`, and `Paladin extends Hero` with field `int holyPower = 100`. Write a method `describeEntity(Entity e)` using pattern matching in an if-else ladder: test for `Paladin`, then `Hero`, then fallback to generic `Entity`. In `main()`, pass a `Paladin` and a `Hero`.",
            "hint": "Check the most specific subclass (Paladin) first; testing Hero first would match Paladin as well.",
            "solutionCode": """class Entity {
    String name;
    Entity(String name) { this.name = name; }
}

class Hero extends Entity {
    Hero(String name) { super(name); }
}

class Paladin extends Hero {
    int holyPower = 100;
    Paladin(String name) { super(name); }
}

public class Solution {
    static void describeEntity(Entity e) {
        if (e instanceof Paladin p) {
            System.out.println("Paladin: " + p.name + " wielding " + p.holyPower + " holy power.");
        } else if (e instanceof Hero h) {
            System.out.println("Hero: " + h.name + " ready for battle.");
        } else {
            System.out.println("Generic Entity: " + e.name);
        }
    }

    public static void main(String[] args) {
        describeEntity(new Paladin("Uther"));
        describeEntity(new Hero("Arthur"));
    }
}""",
            "output": "Paladin: Uther wielding 100 holy power.\nHero: Arthur ready for battle.",
            "explanation": "Testing subclasses from most specific (Paladin) to more general (Hero) ensures proper pattern matching dispatch."
        }
    ]
}

target_file = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop12_exercises.ts"

with open(target_file, "w", encoding="utf-8") as f:
    f.write("import { ProgrammingExercise } from '../../detailedLessons';\n\n")
    f.write("// ============================================================\n")
    f.write("// MODULE 12: POLYMORPHISM & DISPATCH - PROGRAMMING EXERCISES\n")
    f.write("// Total: 40 exercises (10 per sub-lesson)\n")
    f.write("// Progressive difficulty: Beginner to Medium-Hard\n")
    f.write("// ============================================================\n\n")
    f.write("export const oop12Exercises: Record<string, ProgrammingExercise[]> = ")
    json.dump(exercises_data, f, indent=2)
    f.write(";\n")

print("Successfully wrote", target_file)
