import json
import os

exercises_data = {
    "extends-and-is-a": [
        {
            "id": "oop11-ex01",
            "title": "Vehicle Base Class and Car Extension",
            "problemStatement": "Create a base class `Vehicle` with fields `brand` (String) and `speed` (int), along with a method `displaySpecs()`. Then create a subclass `Car` that extends `Vehicle`, adding an integer field `doors` and a method `displayCarDetails()`. In `main()`, instantiate a `Car`, configure all fields, and call both methods to verify inheritance.",
            "hint": "Use the `extends` keyword in the class header: `class Car extends Vehicle`. The subclass automatically inherits all accessible non-private fields and methods from its superclass.",
            "solutionCode": """class Vehicle {
    String brand;
    int speed;

    void displaySpecs() {
        System.out.println("Vehicle: " + brand + " running at " + speed + " km/h");
    }
}

class Car extends Vehicle {
    int doors;

    void displayCarDetails() {
        System.out.println("Car with " + doors + " doors, brand: " + brand);
    }
}

public class Solution {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Toyota";
        myCar.speed = 120;
        myCar.doors = 4;

        myCar.displaySpecs();
        myCar.displayCarDetails();
    }
}""",
            "output": "Vehicle: Toyota running at 120 km/h\nCar with 4 doors, brand: Toyota",
            "explanation": "Car extends Vehicle, inheriting the brand and speed fields as well as the displaySpecs() method. The Car instance holds its own doors field alongside the inherited state on the heap."
        },
        {
            "id": "oop11-ex02",
            "title": "Employee Compensation and Manager State Specialization",
            "problemStatement": "Define an `Employee` class with fields `name` (String) and `baseSalary` (double), and a method `displayCompensation()`. Create a subclass `Manager` extending `Employee` with an additional field `bonus` (double) and a method `getTotalCompensation()` returning baseSalary + bonus. In `main()`, instantiate a Manager, populate the fields, and print the total compensation.",
            "hint": "The subclass inherits `baseSalary` from `Employee`. Because `baseSalary` has package-private access, `Manager` can read it directly.",
            "solutionCode": """class Employee {
    String name;
    double baseSalary;

    void displayCompensation() {
        System.out.println(name + " Base Salary: $" + baseSalary);
    }
}

class Manager extends Employee {
    double bonus;

    double getTotalCompensation() {
        return baseSalary + bonus;
    }
}

public class Solution {
    public static void main(String[] args) {
        Manager mgr = new Manager();
        mgr.name = "Alice Chen";
        mgr.baseSalary = 85000.0;
        mgr.bonus = 15000.0;

        mgr.displayCompensation();
        System.out.println("Total Compensation: $" + mgr.getTotalCompensation());
    }
}""",
            "output": "Alice Chen Base Salary: $85000.0\nTotal Compensation: $100000.0",
            "explanation": "Manager specializes Employee by adding bonus. The subclass method getTotalCompensation() computes the combined salary using both inherited state and its own field."
        },
        {
            "id": "oop11-ex03",
            "title": "Geometric Rectangle Perimeter and Area Derivation",
            "problemStatement": "Implement a base class `Shape` with a field `name` (String) and method `identify()`. Create a derived class `Rectangle` that extends `Shape`, declaring `width` (double) and `height` (double). Include methods `getArea()` and `getPerimeter()`. In `main()`, set up a rectangle with dimensions 8.0 by 5.0 and display its name, area, and perimeter.",
            "hint": "Initialize shape name using `rect.name = \"Rectangle\";`. Area is width * height, and perimeter is 2 * (width + height).",
            "solutionCode": """class Shape {
    String name;

    void identify() {
        System.out.println("Shape type: " + name);
    }
}

class Rectangle extends Shape {
    double width;
    double height;

    double getArea() {
        return width * height;
    }

    double getPerimeter() {
        return 2 * (width + height);
    }
}

public class Solution {
    public static void main(String[] args) {
        Rectangle rect = new Rectangle();
        rect.name = "Rectangle";
        rect.width = 8.0;
        rect.height = 5.0;

        rect.identify();
        System.out.println("Area: " + rect.getArea());
        System.out.println("Perimeter: " + rect.getPerimeter());
    }
}""",
            "output": "Shape type: Rectangle\nArea: 40.0\nPerimeter: 26.0",
            "explanation": "Rectangle establishes an IS-A relationship with Shape. The derived class inherits identify() and adds specialized geometric calculations."
        },
        {
            "id": "oop11-ex04",
            "title": "Bank Account Interest Accumulation",
            "problemStatement": "Write a `BankAccount` class with `accountNumber` (String) and `balance` (double), plus a method `deposit(double amount)`. Create a subclass `SavingsAccount` that adds an `interestRate` (double) and an `applyInterest()` method that calculates interest (`balance * interestRate`) and adds it to `balance`. In `main()`, create an account with $2000.0, deposit $500.0, apply 5% interest (0.05), and display the final balance.",
            "hint": "In `applyInterest()`, compute the earned amount and modify the inherited `balance` field directly.",
            "solutionCode": """class BankAccount {
    String accountNumber;
    double balance;

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}

class SavingsAccount extends BankAccount {
    double interestRate;

    void applyInterest() {
        double interest = balance * interestRate;
        balance += interest;
        System.out.println("Interest applied: $" + interest);
    }
}

public class Solution {
    public static void main(String[] args) {
        SavingsAccount sa = new SavingsAccount();
        sa.accountNumber = "SA-9012";
        sa.balance = 2000.0;
        sa.interestRate = 0.05;

        sa.deposit(500.0);
        sa.applyInterest();
        System.out.println("Final Balance: $" + sa.balance);
    }
}""",
            "output": "Interest applied: $125.0\nFinal Balance: $2625.0",
            "explanation": "SavingsAccount inherits the balance state and deposit() capability. It manipulates the inherited balance within applyInterest() seamlessly."
        },
        {
            "id": "oop11-ex05",
            "title": "Three-Tier Biological Taxonomy Hierarchy",
            "problemStatement": "Construct a three-level inheritance hierarchy: `Animal` (field `species`, method `eat()`), `Mammal` extending `Animal` (field `furColor`, method `walk()`), and `Dog` extending `Mammal` (field `breed`, method `bark()`). In `main()`, instantiate a `Dog`, assign values to all three fields, and invoke all three methods.",
            "hint": "Java supports multilevel inheritance (A -> B -> C). A Dog object contains the state and behavior of Animal, Mammal, and Dog.",
            "solutionCode": """class Animal {
    String species;

    void eat() {
        System.out.println(species + " is consuming food.");
    }
}

class Mammal extends Animal {
    String furColor;

    void walk() {
        System.out.println("Walking with " + furColor + " fur.");
    }
}

class Dog extends Mammal {
    String breed;

    void bark() {
        System.out.println(breed + " says: Woof!");
    }
}

public class Solution {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.species = "Canis lupus";
        d.furColor = "Golden";
        d.breed = "Retriever";

        d.eat();
        d.walk();
        d.bark();
    }
}""",
            "output": "Canis lupus is consuming food.\nWalking with Golden fur.\nRetriever says: Woof!",
            "explanation": "Through transitive inheritance in Java, Dog inherits everything from Mammal and Animal. A single instance on the heap holds all three string fields."
        },
        {
            "id": "oop11-ex06",
            "title": "Protected State Access Across Inheritance Boundary",
            "problemStatement": "Build a `UserProfile` class with `protected String username` and `protected String role`. Subclass it with `AdminUser` having `private int accessLevel`. Add a method `displayAdminBadge()` in `AdminUser` that prints the inherited protected fields alongside `accessLevel`. In `main()`, test this relationship.",
            "hint": "The `protected` modifier allows subclasses to access the member directly, providing encapsulation against unrelated non-child classes while permitting inheritance.",
            "solutionCode": """class UserProfile {
    protected String username;
    protected String role;
}

class AdminUser extends UserProfile {
    private int accessLevel;

    public void setAccessLevel(int level) {
        this.accessLevel = level;
    }

    public void displayAdminBadge() {
        System.out.println("ADMIN BADGE: " + username + " | Role: " + role + " | Level: " + accessLevel);
    }
}

public class Solution {
    public static void main(String[] args) {
        AdminUser admin = new AdminUser();
        admin.username = "sys_admin";
        admin.role = "SuperUser";
        admin.setAccessLevel(5);

        admin.displayAdminBadge();
    }
}""",
            "output": "ADMIN BADGE: sys_admin | Role: SuperUser | Level: 5",
            "explanation": "The protected fields username and role are accessible to AdminUser because of inheritance. Encapsulation is preserved while child classes get access."
        },
        {
            "id": "oop11-ex07",
            "title": "Book Catalog and Academic Textbook Distinction",
            "problemStatement": "Create a `Book` class with fields `title` (String), `author` (String), and `pages` (int). Create a subclass `TextBook` with `subject` (String) and `gradeLevel` (int). Write a static method `summarizeBook(Book b)` that prints the title and author. In `main()`, pass both a standard `Book` and a `TextBook` to `summarizeBook` to demonstrate that a TextBook IS-A Book.",
            "hint": "Because `TextBook extends Book`, a method expecting a `Book` parameter happily accepts a `TextBook` without casting.",
            "solutionCode": """class Book {
    String title;
    String author;
    int pages;
}

class TextBook extends Book {
    String subject;
    int gradeLevel;
}

public class Solution {
    static void summarizeBook(Book b) {
        System.out.println("Title: " + b.title + " | Author: " + b.author);
    }

    public static void main(String[] args) {
        Book novel = new Book();
        novel.title = "To Kill a Mockingbird";
        novel.author = "Harper Lee";
        novel.pages = 281;

        TextBook math = new TextBook();
        math.title = "Advanced Calculus";
        math.author = "Dr. Smith";
        math.pages = 650;
        math.subject = "Mathematics";
        math.gradeLevel = 12;

        summarizeBook(novel);
        summarizeBook(math);
    }
}""",
            "output": "Title: To Kill a Mockingbird | Author: Harper Lee\nTitle: Advanced Calculus | Author: Dr. Smith",
            "explanation": "The IS-A relationship guarantees that wherever a Book reference is required, a TextBook object can be passed directly."
        },
        {
            "id": "oop11-ex08",
            "title": "Hardware Device Hierarchy with Battery Specification",
            "problemStatement": "Build an `ElectronicDevice` class with fields `model` (String) and `voltage` (double). Subclass `Laptop` extends it, adding `batteryWh` (double) and `powerDrawWatts` (double). Include a method `estimateBatteryLife()` in `Laptop` that returns `batteryWh / powerDrawWatts` (in hours). In `main()`, set up a laptop with 60.0 Wh and 15.0 W draw, and print its specs.",
            "hint": "Inherited fields are accessed just like local fields within the child class methods.",
            "solutionCode": """class ElectronicDevice {
    String model;
    double voltage;
}

class Laptop extends ElectronicDevice {
    double batteryWh;
    double powerDrawWatts;

    double estimateBatteryLife() {
        if (powerDrawWatts <= 0) return 0;
        return batteryWh / powerDrawWatts;
    }
}

public class Solution {
    public static void main(String[] args) {
        Laptop lap = new Laptop();
        lap.model = "XPS Pro 15";
        lap.voltage = 19.5;
        lap.batteryWh = 60.0;
        lap.powerDrawWatts = 15.0;

        System.out.println("Model: " + lap.model + " (" + lap.voltage + "V)");
        System.out.println("Battery Life: " + lap.estimateBatteryLife() + " hours");
    }
}""",
            "output": "Model: XPS Pro 15 (19.5V)\nBattery Life: 4.0 hours",
            "explanation": "Laptop derives from ElectronicDevice. It inherits model and voltage while providing domain-specific computation for battery life."
        },
        {
            "id": "oop11-ex09",
            "title": "Warehouse Inventory and Perishable Food Lifespan",
            "problemStatement": "Construct an `InventoryItem` class with `sku` (String), `name` (String), and `unitPrice` (double). Subclass `PerishableItem` with `shelfLifeDays` (int) and `daysInStorage` (int). Add a method `isExpired()` returning true if `daysInStorage > shelfLifeDays`, and `getRemainingDays()`. In `main()`, test two perishable goods and print their status.",
            "hint": "Remaining days can be calculated as `Math.max(0, shelfLifeDays - daysInStorage)`.",
            "solutionCode": """class InventoryItem {
    String sku;
    String name;
    double unitPrice;
}

class PerishableItem extends InventoryItem {
    int shelfLifeDays;
    int daysInStorage;

    boolean isExpired() {
        return daysInStorage > shelfLifeDays;
    }

    int getRemainingDays() {
        return Math.max(0, shelfLifeDays - daysInStorage);
    }
}

public class Solution {
    public static void main(String[] args) {
        PerishableItem milk = new PerishableItem();
        milk.sku = "DAIRY-101";
        milk.name = "Whole Milk";
        milk.unitPrice = 3.49;
        milk.shelfLifeDays = 14;
        milk.daysInStorage = 10;

        PerishableItem yogurt = new PerishableItem();
        yogurt.sku = "DAIRY-202";
        yogurt.name = "Greek Yogurt";
        yogurt.unitPrice = 1.99;
        yogurt.shelfLifeDays = 20;
        yogurt.daysInStorage = 25;

        System.out.println(milk.name + " - Expired: " + milk.isExpired() + ", Days left: " + milk.getRemainingDays());
        System.out.println(yogurt.name + " - Expired: " + yogurt.isExpired() + ", Days left: " + yogurt.getRemainingDays());
    }
}""",
            "output": "Whole Milk - Expired: false, Days left: 4\nGreek Yogurt - Expired: true, Days left: 0",
            "explanation": "PerishableItem extends InventoryItem with perishable-specific attributes and methods, showing how inheritance models specialized domain rules."
        },
        {
            "id": "oop11-ex10",
            "title": "University Course Enrollment with Laboratory Component",
            "problemStatement": "Create a `Course` class with fields `courseCode` (String), `title` (String), and `credits` (int). Derive `LabCourse` adding `labFee` (double) and `maxLabCapacity` (int). Add a method `calculateTotalCost(double costPerCredit)` in `LabCourse` that returns `(credits * costPerCredit) + labFee`. In `main()`, compute costs for a 4-credit lab course with $120.0 fee at $300.0/credit.",
            "hint": "The inherited `credits` field participates in the financial calculation alongside `labFee`.",
            "solutionCode": """class Course {
    String courseCode;
    String title;
    int credits;
}

class LabCourse extends Course {
    double labFee;
    int maxLabCapacity;

    double calculateTotalCost(double costPerCredit) {
        return (credits * costPerCredit) + labFee;
    }
}

public class Solution {
    public static void main(String[] args) {
        LabCourse chem = new LabCourse();
        chem.courseCode = "CHEM-201";
        chem.title = "Organic Chemistry with Lab";
        chem.credits = 4;
        chem.labFee = 120.0;
        chem.maxLabCapacity = 24;

        double cost = chem.calculateTotalCost(300.0);
        System.out.println("Course: " + chem.courseCode + " - " + chem.title);
        System.out.println("Max Lab Capacity: " + chem.maxLabCapacity);
        System.out.println("Total Tuition & Fee: $" + cost);
    }
}""",
            "output": "Course: CHEM-201 - Organic Chemistry with Lab\nMax Lab Capacity: 24\nTotal Tuition & Fee: $1320.0",
            "explanation": "LabCourse combines inherited credit hours from Course with specialized laboratory fees, demonstrating real-world domain specialization."
        }
    ],
    "super-constructor-chaining": [
        {
            "id": "oop11-ex11",
            "title": "Basic Two-Tier Constructor Execution Order",
            "problemStatement": "Create a base class `Component` whose default constructor prints 'Component initialized'. Create a subclass `Button` whose default constructor prints 'Button initialized'. In `main()`, instantiate a `Button` to observe top-down constructor execution order.",
            "hint": "When `new Button()` is called, Java automatically inserts `super()` as the first line of Button's constructor if omitted.",
            "solutionCode": """class Component {
    Component() {
        System.out.println("Component initialized");
    }
}

class Button extends Component {
    Button() {
        // compiler inserts implicit super();
        System.out.println("Button initialized");
    }
}

public class Solution {
    public static void main(String[] args) {
        Button btn = new Button();
    }
}""",
            "output": "Component initialized\nButton initialized",
            "explanation": "Constructor chaining guarantees the superclass initializes its state before the subclass constructor body begins executing."
        },
        {
            "id": "oop11-ex12",
            "title": "Forwarding Parameters to Superclass Constructor",
            "problemStatement": "Create a `Vehicle` class with a constructor accepting `String make, int year`. Create a subclass `Truck` with fields `double payloadTons`. Truck's constructor must accept `(String make, int year, double payloadTons)` and forward make and year to `super(make, year)`. Print vehicle details from a method in Truck.",
            "hint": "`super(make, year)` must be the very first statement inside the Truck constructor.",
            "solutionCode": """class Vehicle {
    String make;
    int year;

    Vehicle(String make, int year) {
        this.make = make;
        this.year = year;
    }
}

class Truck extends Vehicle {
    double payloadTons;

    Truck(String make, int year, double payloadTons) {
        super(make, year);
        this.payloadTons = payloadTons;
    }

    void displayTruck() {
        System.out.println(year + " " + make + " (Payload: " + payloadTons + " tons)");
    }
}

public class Solution {
    public static void main(String[] args) {
        Truck t = new Truck("Volvo", 2022, 18.5);
        t.displayTruck();
    }
}""",
            "output": "2022 Volvo (Payload: 18.5 tons)",
            "explanation": "Because Vehicle has no default constructor, Truck must explicitly call super(make, year) as its first statement."
        },
        {
            "id": "oop11-ex13",
            "title": "Three-Tier Constructor Call Stack Tracing",
            "problemStatement": "Implement three classes: `Device`, `Computer`, and `Laptop` forming a three-level hierarchy. Each constructor must print a log message indicating its execution: 'Device: <brand>', 'Computer: <ram>GB RAM', 'Laptop: <weight>kg'. Pass arguments through constructors using `super()`. In `main()`, instantiate a `Laptop` with ('Dell', 16, 1.8).",
            "hint": "Constructor calls cascade upward: Laptop -> Computer -> Device, and then execute downward: Device body -> Computer body -> Laptop body.",
            "solutionCode": """class Device {
    Device(String brand) {
        System.out.println("Device: " + brand);
    }
}

class Computer extends Device {
    Computer(String brand, int ram) {
        super(brand);
        System.out.println("Computer: " + ram + "GB RAM");
    }
}

class Laptop extends Computer {
    Laptop(String brand, int ram, double weight) {
        super(brand, ram);
        System.out.println("Laptop: " + weight + "kg");
    }
}

public class Solution {
    public static void main(String[] args) {
        Laptop myLap = new Laptop("Dell", 16, 1.8);
    }
}""",
            "output": "Device: Dell\nComputer: 16GB RAM\nLaptop: 1.8kg",
            "explanation": "Execution strictly flows from the highest superclass down to the most specific subclass, ensuring base state is ready first."
        },
        {
            "id": "oop11-ex14",
            "title": "Overloaded Constructor Delegation via this() and super()",
            "problemStatement": "Create a `Person` class with `Person(String name, int age)`. Create an `Employee` subclass with `(String name, int age, String department)`. Add an overloaded constructor `Employee(String name)` that delegates to the 3-arg constructor using `this(name, 25, \"General\")`. In `main()`, instantiate an employee using the 1-arg constructor.",
            "hint": "A constructor can invoke `this(...)` as its first statement. The target constructor then invokes `super(...)`.",
            "solutionCode": """class Person {
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class Employee extends Person {
    String department;

    Employee(String name, int age, String department) {
        super(name, age);
        this.department = department;
    }

    Employee(String name) {
        this(name, 25, "General");
    }

    void printBadge() {
        System.out.println(name + " (" + age + ") - " + department);
    }
}

public class Solution {
    public static void main(String[] args) {
        Employee emp = new Employee("Marcus");
        emp.printBadge();
    }
}""",
            "output": "Marcus (25) - General",
            "explanation": "Employee(name) calls this(name, 25, 'General'), which in turn calls super(name, age) to initialize Person, demonstrating constructor delegation."
        },
        {
            "id": "oop11-ex15",
            "title": "Defensive State Validation in Superclass Constructor",
            "problemStatement": "Design a `BankAccount` class where the constructor validates the initial balance: if `initialBalance < 0`, it sets `balance = 0.0` and prints 'Warning: Initial balance cannot be negative; defaulted to 0.0'. Subclass `PremiumAccount` calls `super(initialBalance)` and adds `cashbackRate = 0.02`. In `main()`, instantiate with `-500.0` and print balance.",
            "hint": "The superclass constructor encapsulates validation logic so derived classes automatically benefit from defensive guarantees.",
            "solutionCode": """class BankAccount {
    double balance;

    BankAccount(double initialBalance) {
        if (initialBalance < 0.0) {
            System.out.println("Warning: Initial balance cannot be negative; defaulted to 0.0");
            this.balance = 0.0;
        } else {
            this.balance = initialBalance;
        }
    }
}

class PremiumAccount extends BankAccount {
    double cashbackRate;

    PremiumAccount(double initialBalance, double cashbackRate) {
        super(initialBalance);
        this.cashbackRate = cashbackRate;
    }
}

public class Solution {
    public static void main(String[] args) {
        PremiumAccount pa = new PremiumAccount(-500.0, 0.02);
        System.out.println("Account Balance: $" + pa.balance);
    }
}""",
            "output": "Warning: Initial balance cannot be negative; defaulted to 0.0\nAccount Balance: $0.0",
            "explanation": "By putting validation in BankAccount's constructor, all subclasses are protected from having invalid initial balances."
        },
        {
            "id": "oop11-ex16",
            "title": "Employee and Contractor Hourly Rate Initialization",
            "problemStatement": "Create a `Worker` class with fields `String name, String id` and constructor `Worker(String name, String id)`. Create subclass `Contractor` with `double hourlyRate` and `int contractMonths`. In Contractor's constructor, invoke `super(name, id)`. Add a method `estimateEarnings(int hoursPerMonth)` and print results in `main()`.",
            "hint": "Hourly earnings calculation: `hourlyRate * hoursPerMonth * contractMonths`.",
            "solutionCode": """class Worker {
    String name;
    String id;

    Worker(String name, String id) {
        this.name = name;
        this.id = id;
    }
}

class Contractor extends Worker {
    double hourlyRate;
    int contractMonths;

    Contractor(String name, String id, double hourlyRate, int contractMonths) {
        super(name, id);
        this.hourlyRate = hourlyRate;
        this.contractMonths = contractMonths;
    }

    double estimateTotalContractValue(int hoursPerMonth) {
        return hourlyRate * hoursPerMonth * contractMonths;
    }
}

public class Solution {
    public static void main(String[] args) {
        Contractor c = new Contractor("Elena Rostova", "CTR-88", 65.0, 6);
        System.out.println("Contractor: " + c.name + " (" + c.id + ")");
        System.out.println("Contract Value (160 hrs/mo): $" + c.estimateTotalContractValue(160));
    }
}""",
            "output": "Contractor: Elena Rostova (CTR-88)\nContract Value (160 hrs/mo): $62400.0",
            "explanation": "Contractor relies on Worker's constructor to set identity fields, then sets financial terms in its own constructor."
        },
        {
            "id": "oop11-ex17",
            "title": "Vehicle Chassis Unique Identifier Propagation",
            "problemStatement": "Create a `Chassis` base class with a static counter `nextVin = 1001` and instance field `int vin`. The constructor sets `this.vin = nextVin++`. Create a subclass `Motorcycle` with constructor `Motorcycle(String model)` that calls `super()` implicitly or explicitly. In `main()`, instantiate two motorcycles and display their VINs.",
            "hint": "Each time `super()` executes, the static counter increments, assigning a distinct VIN to every instance.",
            "solutionCode": """class Chassis {
    private static int nextVin = 1001;
    int vin;

    Chassis() {
        this.vin = nextVin++;
    }
}

class Motorcycle extends Chassis {
    String model;

    Motorcycle(String model) {
        super();
        this.model = model;
    }

    void displayInfo() {
        System.out.println("Motorcycle VIN #" + vin + " - Model: " + model);
    }
}

public class Solution {
    public static void main(String[] args) {
        Motorcycle m1 = new Motorcycle("Harley Sportster");
        Motorcycle m2 = new Motorcycle("Ducati Panigale");

        m1.displayInfo();
        m2.displayInfo();
    }
}""",
            "output": "Motorcycle VIN #1001 - Model: Harley Sportster\nMotorcycle VIN #1002 - Model: Ducati Panigale",
            "explanation": "Superclass constructor runs during each subclass creation, managing shared static state across all derived instances."
        },
        {
            "id": "oop11-ex18",
            "title": "Geometric Point and Circle Super Constructor Chaining",
            "problemStatement": "Implement class `Point` with `(int x, int y)`. Derive class `Circle` with `Point` coordinates and a `double radius`. Circle's constructor must take `(int x, int y, double radius)`, passing `(x, y)` to `super(x, y)`. Add `getArea()` using `Math.PI * radius * radius`. In `main()`, instantiate a circle at (3, 4) with radius 5.0 and print its coordinates and area formatted to 2 decimals.",
            "hint": "Access inherited x and y directly or through methods. Use `System.out.printf(\"Area: %.2f%n\", c.getArea())`.",
            "solutionCode": """class Point {
    int x;
    int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

class Circle extends Point {
    double radius;

    Circle(int x, int y, double radius) {
        super(x, y);
        this.radius = radius;
    }

    double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Solution {
    public static void main(String[] args) {
        Circle c = new Circle(3, 4, 5.0);
        System.out.println("Center: (" + c.x + ", " + c.y + ")");
        System.out.printf("Area: %.2f%n", c.getArea());
    }
}""",
            "output": "Center: (3, 4)\nArea: 78.54",
            "explanation": "Circle reuses the point coordinate initialization from Point, ensuring center coordinates are properly bound."
        },
        {
            "id": "oop11-ex19",
            "title": "Building and Skyscraper Floor Allocation",
            "problemStatement": "Create a `Building` class with `(String address, int floors)`. Create subclass `Skyscraper` with `(String address, int floors, double spireHeightMeters)`. If floors is less than 40, Skyscraper constructor prints 'Notice: Classified as standard high-rise'. In `main()`, instantiate a skyscraper with address '101 Tower Way', 55 floors, and 45.0m spire.",
            "hint": "Call `super(address, floors)` first, then check the condition on floors in the constructor body.",
            "solutionCode": """class Building {
    String address;
    int floors;

    Building(String address, int floors) {
        this.address = address;
        this.floors = floors;
    }
}

class Skyscraper extends Building {
    double spireHeightMeters;

    Skyscraper(String address, int floors, double spireHeightMeters) {
        super(address, floors);
        this.spireHeightMeters = spireHeightMeters;
        if (floors < 40) {
            System.out.println("Notice: Classified as standard high-rise");
        }
    }

    void displayProfile() {
        System.out.println("Skyscraper at " + address + " has " + floors + " floors and " + spireHeightMeters + "m spire.");
    }
}

public class Solution {
    public static void main(String[] args) {
        Skyscraper sky = new Skyscraper("101 Tower Way", 55, 45.0);
        sky.displayProfile();
    }
}""",
            "output": "Skyscraper at 101 Tower Way has 55 floors and 45.0m spire.",
            "explanation": "Skyscraper initializes base building attributes via super() and performs custom validation in its constructor body."
        },
        {
            "id": "oop11-ex20",
            "title": "RPG Character Stat Initialization and Mana Pool",
            "problemStatement": "Create a `GameCharacter` class with `(String name, int health)`. Create a subclass `Mage` with constructor `(String name, int health, int mana)`. Mage constructor must call `super(name, health)` and set mana. Add a method `castSpell(int manaCost)` in Mage that deducts mana if sufficient, or prints 'Not enough mana'. In `main()`, cast two spells with costs 40 and 70 starting from 100 mana.",
            "hint": "Ensure `super(name, health)` is on line 1 of Mage's constructor.",
            "solutionCode": """class GameCharacter {
    String name;
    int health;

    GameCharacter(String name, int health) {
        this.name = name;
        this.health = health;
    }
}

class Mage extends GameCharacter {
    int mana;

    Mage(String name, int health, int mana) {
        super(name, health);
        this.mana = mana;
    }

    void castSpell(int manaCost) {
        if (mana >= manaCost) {
            mana -= manaCost;
            System.out.println(name + " cast spell! Remaining mana: " + mana);
        } else {
            System.out.println(name + " failed: Not enough mana!");
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        Mage wizard = new Mage("Gandalf", 120, 100);
        wizard.castSpell(40);
        wizard.castSpell(70);
    }
}""",
            "output": "Gandalf cast spell! Remaining mana: 60\nGandalf failed: Not enough mana!",
            "explanation": "The Mage constructor properly chains to the GameCharacter base constructor to initialize name and health before handling mana."
        }
    ],
    "method-overriding-rules": [
        {
            "id": "oop11-ex21",
            "title": "Animal Sound Specialization",
            "problemStatement": "Create an `Animal` base class with a method `makeSound()` printing 'Generic animal sound'. Create a subclass `Dog` that overrides `makeSound()` using the `@Override` annotation to print 'Bark! Bark!'. In `main()`, instantiate a Dog and call `makeSound()`.",
            "hint": "Method overriding requires the exact same method signature (name and parameter list). Always use `@Override`.",
            "solutionCode": """class Animal {
    void makeSound() {
        System.out.println("Generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark! Bark!");
    }
}

public class Solution {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.makeSound();
    }
}""",
            "output": "Bark! Bark!",
            "explanation": "Dog overrides makeSound(), replacing Animal's generic implementation with its own specialized behavior."
        },
        {
            "id": "oop11-ex22",
            "title": "Augmenting Base Behavior with super Method Call",
            "problemStatement": "Create a class `Order` with `void printReceipt(double amount)` that prints 'Standard Order: $' + amount. Subclass `InternationalOrder` overrides `printReceipt(double amount)`, first calling `super.printReceipt(amount)` and then printing 'Import Duty (10%): $' + (amount * 0.10). In `main()`, print a receipt for $300.0.",
            "hint": "Use `super.printReceipt(amount)` inside the overriding method to extend rather than replace parent logic.",
            "solutionCode": """class Order {
    void printReceipt(double amount) {
        System.out.println("Standard Order: $" + amount);
    }
}

class InternationalOrder extends Order {
    @Override
    void printReceipt(double amount) {
        super.printReceipt(amount);
        double duty = amount * 0.10;
        System.out.println("Import Duty (10%): $" + duty);
    }
}

public class Solution {
    public static void main(String[] args) {
        InternationalOrder order = new InternationalOrder();
        order.printReceipt(300.0);
    }
}""",
            "output": "Standard Order: $300.0\nImport Duty (10%): $30.0",
            "explanation": "super.printReceipt(amount) delegates to the superclass implementation, allowing InternationalOrder to augment behavior cleanly."
        },
        {
            "id": "oop11-ex23",
            "title": "Retail Order vs Wholesale Tiered Discount Calculation",
            "problemStatement": "Create a `RetailOrder` class with method `double calculateDiscount(double subtotal)` returning 5% discount (subtotal * 0.05). Create subclass `WholesaleOrder` overriding `calculateDiscount(double subtotal)`: if subtotal >= 1000, discount is 20%; otherwise 10%. In `main()`, test a wholesale order of $1500.0 and $600.0.",
            "hint": "Both methods must have the signature `double calculateDiscount(double)`.",
            "solutionCode": """class RetailOrder {
    double calculateDiscount(double subtotal) {
        return subtotal * 0.05;
    }
}

class WholesaleOrder extends RetailOrder {
    @Override
    double calculateDiscount(double subtotal) {
        if (subtotal >= 1000.0) {
            return subtotal * 0.20;
        }
        return subtotal * 0.10;
    }
}

public class Solution {
    public static void main(String[] args) {
        WholesaleOrder wo = new WholesaleOrder();
        System.out.println("Wholesale $1500 discount: $" + wo.calculateDiscount(1500.0));
        System.out.println("Wholesale $600 discount: $" + wo.calculateDiscount(600.0));
    }
}""",
            "output": "Wholesale $1500 discount: $300.0\nWholesale $600 discount: $60.0",
            "explanation": "WholesaleOrder overrides the pricing policy of RetailOrder, tailoring the calculation to wholesale purchase volumes."
        },
        {
            "id": "oop11-ex24",
            "title": "Vehicle Fuel Economy Overriding",
            "problemStatement": "Build a `Vehicle` class with method `double calculateRange(double fuelLiters)` where fuel economy is 12.0 km/liter (returns `fuelLiters * 12.0`). Create a subclass `HybridVehicle` that overrides `calculateRange(double fuelLiters)` with an economy of 22.0 km/liter plus a fixed 50.0 km electric battery reserve. In `main()`, compute range for 10 liters.",
            "hint": "Formula for HybridVehicle: `(fuelLiters * 22.0) + 50.0`.",
            "solutionCode": """class Vehicle {
    double calculateRange(double fuelLiters) {
        return fuelLiters * 12.0;
    }
}

class HybridVehicle extends Vehicle {
    @Override
    double calculateRange(double fuelLiters) {
        return (fuelLiters * 22.0) + 50.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Vehicle v = new Vehicle();
        HybridVehicle hv = new HybridVehicle();

        System.out.println("Standard Vehicle Range (10L): " + v.calculateRange(10.0) + " km");
        System.out.println("Hybrid Vehicle Range (10L): " + hv.calculateRange(10.0) + " km");
    }
}""",
            "output": "Standard Vehicle Range (10L): 120.0 km\nHybrid Vehicle Range (10L): 270.0 km",
            "explanation": "The hybrid subclass provides a more specific range calculation, demonstrating method specialization."
        },
        {
            "id": "oop11-ex25",
            "title": "Employee Performance Bonus Override",
            "problemStatement": "Define `Employee` with `double getBonus(double rating)` returning `rating * 1000.0`. Define `Manager` extending `Employee` and overriding `getBonus(double rating)` to return `super.getBonus(rating) * 1.5 + 2000.0`. In `main()`, compute bonuses for an employee and a manager with a rating of 4.5.",
            "hint": "The manager bonus utilizes `super.getBonus(rating)` as the base calculation before scaling.",
            "solutionCode": """class Employee {
    double getBonus(double rating) {
        return rating * 1000.0;
    }
}

class Manager extends Employee {
    @Override
    double getBonus(double rating) {
        return (super.getBonus(rating) * 1.5) + 2000.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        Employee emp = new Employee();
        Manager mgr = new Manager();

        System.out.println("Employee Bonus (4.5): $" + emp.getBonus(4.5));
        System.out.println("Manager Bonus (4.5): $" + mgr.getBonus(4.5));
    }
}""",
            "output": "Employee Bonus (4.5): $4500.0\nManager Bonus (4.5): $8750.0",
            "explanation": "Manager calls super.getBonus(rating) which evaluates to 4500.0, multiplies by 1.5 (6750.0), and adds 2000.0 to get 8750.0."
        },
        {
            "id": "oop11-ex26",
            "title": "Covariant Return Type in Hierarchy Cloner",
            "problemStatement": "Demonstrate covariant return types: create a class `Document` with a method `Document cloneDocument()`. Create a subclass `Spreadsheet` with an integer field `cells`. Override `cloneDocument()` with return type `Spreadsheet` (not Document). In `main()`, call the method on a Spreadsheet reference and access `cells` directly without casting.",
            "hint": "Java allows an overriding method to return a more specific subtype of the superclass method's return type.",
            "solutionCode": """class Document {
    String title = "Generic Doc";

    Document cloneDocument() {
        Document d = new Document();
        d.title = this.title;
        return d;
    }
}

class Spreadsheet extends Document {
    int cells = 100;

    @Override
    Spreadsheet cloneDocument() {
        Spreadsheet s = new Spreadsheet();
        s.title = this.title;
        s.cells = this.cells;
        return s;
    }
}

public class Solution {
    public static void main(String[] args) {
        Spreadsheet original = new Spreadsheet();
        original.cells = 500;

        Spreadsheet copy = original.cloneDocument();
        System.out.println("Cloned Spreadsheet cells: " + copy.cells);
    }
}""",
            "output": "Cloned Spreadsheet cells: 500",
            "explanation": "Covariant return types eliminate the need for casting when calling cloneDocument() through a Spreadsheet reference."
        },
        {
            "id": "oop11-ex27",
            "title": "Custom Object Description Overriding",
            "problemStatement": "Create a `Product` class with `name` and `price`, and a method `String getDetails()`. Create a subclass `DigitalProduct` with `downloadSizeMb` (int). Override `getDetails()` to include both the product details and the download size. In `main()`, print details for an e-book ($14.99, 25MB).",
            "hint": "Invoke `super.getDetails()` and concatenate `\" [Size: \" + downloadSizeMb + \" MB]\"`.",
            "solutionCode": """class Product {
    String name;
    double price;

    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    String getDetails() {
        return name + " ($" + price + ")";
    }
}

class DigitalProduct extends Product {
    int downloadSizeMb;

    DigitalProduct(String name, double price, int downloadSizeMb) {
        super(name, price);
        this.downloadSizeMb = downloadSizeMb;
    }

    @Override
    String getDetails() {
        return super.getDetails() + " [Size: " + downloadSizeMb + " MB]";
    }
}

public class Solution {
    public static void main(String[] args) {
        DigitalProduct dp = new DigitalProduct("Java Masterclass E-Book", 14.99, 25);
        System.out.println(dp.getDetails());
    }
}""",
            "output": "Java Masterclass E-Book ($14.99) [Size: 25 MB]",
            "explanation": "DigitalProduct enhances getDetails() while preserving Product's formatting logic through super.getDetails()."
        },
        {
            "id": "oop11-ex28",
            "title": "Combat Entity Attack Damage Multiplier Override",
            "problemStatement": "Create a `Fighter` class with method `int attack(int basePower)` returning `basePower`. Create a subclass `Berserker` with field `boolean isEnraged`. Override `attack(int basePower)`: if `isEnraged` is true, return `basePower * 2`; otherwise return `basePower`. In `main()`, test a berserker attacking normally and enraged with base power 40.",
            "hint": "Check the boolean condition inside the overridden attack method.",
            "solutionCode": """class Fighter {
    int attack(int basePower) {
        return basePower;
    }
}

class Berserker extends Fighter {
    boolean isEnraged;

    @Override
    int attack(int basePower) {
        if (isEnraged) {
            return basePower * 2;
        }
        return super.attack(basePower);
    }
}

public class Solution {
    public static void main(String[] args) {
        Berserker b = new Berserker();
        b.isEnraged = false;
        System.out.println("Normal Attack: " + b.attack(40));

        b.isEnraged = true;
        System.out.println("Enraged Attack: " + b.attack(40));
    }
}""",
            "output": "Normal Attack: 40\nEnraged Attack: 80",
            "explanation": "Berserker conditionally delegates to super.attack() or applies a 2x rage multiplier, customizing base behavior."
        },
        {
            "id": "oop11-ex29",
            "title": "Progressive Tax Calculator Override",
            "problemStatement": "Implement a `TaxCalculator` class with `double computeTax(double income)` calculating a flat 15% (income * 0.15). Create `LuxuryTaxCalculator` that overrides `computeTax(double income)`: flat 15% on income up to $100,000, plus 25% on the portion above $100,000. In `main()`, compute tax on $150,000 income using both calculators.",
            "hint": "For income > 100000: `(100000 * 0.15) + ((income - 100000) * 0.25)`.",
            "solutionCode": """class TaxCalculator {
    double computeTax(double income) {
        return income * 0.15;
    }
}

class LuxuryTaxCalculator extends TaxCalculator {
    @Override
    double computeTax(double income) {
        if (income <= 100000.0) {
            return super.computeTax(income);
        }
        double baseTax = 100000.0 * 0.15;
        double excessTax = (income - 100000.0) * 0.25;
        return baseTax + excessTax;
    }
}

public class Solution {
    public static void main(String[] args) {
        TaxCalculator standard = new TaxCalculator();
        LuxuryTaxCalculator luxury = new LuxuryTaxCalculator();

        double income = 150000.0;
        System.out.println("Standard Tax on $150k: $" + standard.computeTax(income));
        System.out.println("Luxury Tax on $150k: $" + luxury.computeTax(income));
    }
}""",
            "output": "Standard Tax on $150k: $22500.0\nLuxury Tax on $150k: $27500.0",
            "explanation": "The luxury tax calculator overrides the flat rate logic with progressive tax brackets."
        },
        {
            "id": "oop11-ex30",
            "title": "Three-Level Method Override and Super Chain",
            "problemStatement": "Create a 3-level hierarchy: `UIElement` with `render()` printing '[UIElement]', `Window` overriding `render()` to call `super.render()` and print '[Window]', and `DialogBox` overriding `render()` to call `super.render()` and print '[DialogBox]'. In `main()`, invoke `render()` on a `DialogBox`.",
            "hint": "Each tier calls its immediate superclass's `render()` method, creating an execution chain.",
            "solutionCode": """class UIElement {
    void render() {
        System.out.print("[UIElement]");
    }
}

class Window extends UIElement {
    @Override
    void render() {
        super.render();
        System.out.print(" -> [Window]");
    }
}

class DialogBox extends Window {
    @Override
    void render() {
        super.render();
        System.out.print(" -> [DialogBox]");
    }
}

public class Solution {
    public static void main(String[] args) {
        DialogBox dialog = new DialogBox();
        dialog.render();
        System.out.println();
    }
}""",
            "output": "[UIElement] -> [Window] -> [DialogBox]",
            "explanation": "The super calls propagate up to UIElement and then print on the way down, establishing a layered rendering pipeline."
        }
    ],
    "final-keyword-in-oop": [
        {
            "id": "oop11-ex31",
            "title": "Immutable 2D Coordinate Point",
            "problemStatement": "Create an immutable `Point2D` class with `final int x` and `final int y`. Provide a constructor initializing both fields and public getters. Provide a method `Point2D translate(int dx, int dy)` that returns a new `Point2D` instance without altering `this`. In `main()`, test translation.",
            "hint": "Because x and y are `final`, they cannot be changed after constructor initialization. Any transformation must return a brand new instance.",
            "solutionCode": """class Point2D {
    private final int x;
    private final int y;

    public Point2D(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    public Point2D translate(int dx, int dy) {
        return new Point2D(this.x + dx, this.y + dy);
    }
}

public class Solution {
    public static void main(String[] args) {
        Point2D p1 = new Point2D(10, 20);
        Point2D p2 = p1.translate(5, -3);

        System.out.println("Original: (" + p1.getX() + ", " + p1.getY() + ")");
        System.out.println("Translated: (" + p2.getX() + ", " + p2.getY() + ")");
    }
}""",
            "output": "Original: (10, 20)\nTranslated: (15, 17)",
            "explanation": "The final fields guarantee that p1 never mutates. translate() produces a new Point2D instance, embodying the immutable value object pattern."
        },
        {
            "id": "oop11-ex32",
            "title": "Sealing a Class with the final Keyword",
            "problemStatement": "Create a `final class SecurityToken` with `final String token` and `final long expirationEpoch`. Add a method `isExpired(long currentEpoch)` returning `currentEpoch > expirationEpoch`. In `main()`, instantiate the token, verify expiration, and document why no other class can extend SecurityToken.",
            "hint": "Adding `final` to a class header (`final class ...`) prevents any subclassing, protecting security invariants.",
            "solutionCode": """final class SecurityToken {
    private final String token;
    private final long expirationEpoch;

    public SecurityToken(String token, long expirationEpoch) {
        this.token = token;
        this.expirationEpoch = expirationEpoch;
    }

    public boolean isExpired(long currentEpoch) {
        return currentEpoch > expirationEpoch;
    }

    public String getToken() {
        return token;
    }
}

public class Solution {
    public static void main(String[] args) {
        SecurityToken st = new SecurityToken("AUTH_XYZ_987", 1700000000L);
        System.out.println("Token: " + st.getToken());
        System.out.println("Expired at 1700005000: " + st.isExpired(1700005000L));
    }
}""",
            "output": "Token: AUTH_XYZ_987\nExpired at 1700005000: true",
            "explanation": "Declaring SecurityToken final ensures no rogue subclass can override methods or compromise cryptographic token validity."
        },
        {
            "id": "oop11-ex33",
            "title": "Enforcing Template Method Invariance with final Method",
            "problemStatement": "Implement the Template Method pattern: class `DataExporter` has a `public final void exportPipeline()` method that invokes three steps in order: `openStream()`, `formatContent()`, and `closeStream()`. `openStream()` and `closeStream()` are private/final, while `formatContent()` is protected and can be overridden. Subclass `CsvExporter` overrides `formatContent()`. In `main()`, run the pipeline.",
            "hint": "Marking `exportPipeline()` final guarantees subclasses cannot alter the sequence of execution.",
            "solutionCode": """class DataExporter {
    public final void exportPipeline() {
        openStream();
        formatContent();
        closeStream();
    }

    private void openStream() {
        System.out.println("1. Stream opened.");
    }

    protected void formatContent() {
        System.out.println("2. Default raw content formatted.");
    }

    private void closeStream() {
        System.out.println("3. Stream flushed and closed.");
    }
}

class CsvExporter extends DataExporter {
    @Override
    protected void formatContent() {
        System.out.println("2. CSV rows formatted with comma separators.");
    }
}

public class Solution {
    public static void main(String[] args) {
        DataExporter exporter = new CsvExporter();
        exporter.exportPipeline();
    }
}""",
            "output": "1. Stream opened.\n2. CSV rows formatted with comma separators.\n3. Stream flushed and closed.",
            "explanation": "The final keyword on exportPipeline() locks down the execution skeleton, allowing CsvExporter to customize step 2 without altering the pipeline order."
        },
        {
            "id": "oop11-ex34",
            "title": "Blank Final Field Initialization Across Multiple Constructors",
            "problemStatement": "Create a `ServerConfig` class with `final String hostname` and `final int port`. Implement two constructors: a 2-arg constructor `(String hostname, int port)` and a 0-arg default constructor that initializes them to 'localhost' and 8080. In `main()`, create an instance with each constructor and print their configurations.",
            "hint": "A blank final variable MUST be assigned exactly once in every constructor path.",
            "solutionCode": """class ServerConfig {
    final String hostname;
    final int port;

    ServerConfig() {
        this.hostname = "localhost";
        this.port = 8080;
    }

    ServerConfig(String hostname, int port) {
        this.hostname = hostname;
        this.port = port;
    }

    void display() {
        System.out.println("Server listening on " + hostname + ":" + port);
    }
}

public class Solution {
    public static void main(String[] args) {
        ServerConfig defaultConfig = new ServerConfig();
        ServerConfig customConfig = new ServerConfig("api.production.com", 443);

        defaultConfig.display();
        customConfig.display();
    }
}""",
            "output": "Server listening on localhost:8080\nServer listening on api.production.com:443",
            "explanation": "Every constructor assigns hostname and port exactly once, satisfying the compiler's strict definite assignment rule for blank finals."
        },
        {
            "id": "oop11-ex35",
            "title": "Final Array Reference vs Array Element Mutation",
            "problemStatement": "Demonstrate that making an array reference `final` prevents reassigning the reference itself, but DOES NOT prevent modifying array elements. In `main()`, declare `final int[] numbers = {10, 20, 30}`. Modify element at index 1 to 99 and print the array. Explain why `numbers = new int[3];` would fail to compile.",
            "hint": "The `final` modifier freezes the reference pointer, not the contents of the heap object it refers to.",
            "solutionCode": """public class Solution {
    public static void main(String[] args) {
        final int[] numbers = {10, 20, 30};

        // Modifying elements is completely valid
        numbers[1] = 99;

        System.out.println("Index 0: " + numbers[0]);
        System.out.println("Index 1: " + numbers[1]);
        System.out.println("Index 2: " + numbers[2]);

        // Attempting numbers = new int[]{1, 2, 3}; would trigger:
        // "cannot assign a value to final variable numbers"
    }
}""",
            "output": "Index 0: 10\nIndex 1: 99\nIndex 2: 30",
            "explanation": "A final reference cannot point to another array, but the heap array object itself remains mutable."
        },
        {
            "id": "oop11-ex36",
            "title": "Mathematical Physics Constants Utility",
            "problemStatement": "Create a `PhysicsConstants` utility class containing `public static final double SPEED_OF_LIGHT = 299792458.0;` and `public static final double GRAVITATIONAL_ACCELERATION = 9.80665;`. Make its constructor private so it cannot be instantiated. In `main()`, calculate distance traveled by light in 0.001 seconds.",
            "hint": "Use the class name directly: `PhysicsConstants.SPEED_OF_LIGHT`.",
            "solutionCode": """class PhysicsConstants {
    public static final double SPEED_OF_LIGHT = 299792458.0; // m/s
    public static final double GRAVITATIONAL_ACCELERATION = 9.80665; // m/s^2

    private PhysicsConstants() {
        // Suppress default constructor to prevent instantiation
    }
}

public class Solution {
    public static void main(String[] args) {
        double timeSeconds = 0.001;
        double distanceMeters = PhysicsConstants.SPEED_OF_LIGHT * timeSeconds;

        System.out.println("Speed of Light: " + PhysicsConstants.SPEED_OF_LIGHT + " m/s");
        System.out.println("Distance in 1ms: " + distanceMeters + " meters");
    }
}""",
            "output": "Speed of Light: 2.99792458E8 m/s\nDistance in 1ms: 299792.458 meters",
            "explanation": "public static final defines compile-time constants accessible class-wide without object instantiation."
        },
        {
            "id": "oop11-ex37",
            "title": "Final Method Parameters for Integrity Protection",
            "problemStatement": "Write a class `AccountService` with a static method `double computeTransferFee(final double amount, final double feePercent)`. Verify that declaring parameters `final` prevents accidental reassignments inside the method body. In `main()`, compute fee on $5000.0 with 1.5% fee.",
            "hint": "Final parameters cannot be reassigned; any `amount = ...` statement will fail compilation.",
            "solutionCode": """class AccountService {
    public static double computeTransferFee(final double amount, final double feePercent) {
        // amount = amount * 2; // COMPILE ERROR: cannot assign a value to final variable
        return (amount * feePercent) / 100.0;
    }
}

public class Solution {
    public static void main(String[] args) {
        double fee = AccountService.computeTransferFee(5000.0, 1.5);
        System.out.println("Transfer Fee: $" + fee);
    }
}""",
            "output": "Transfer Fee: $75.0",
            "explanation": "Marking method arguments final protects against inadvertent parameter mutation inside long or complex methods."
        },
        {
            "id": "oop11-ex38",
            "title": "Secure Database Credentials with Blank Final Fields",
            "problemStatement": "Design a `DbCredentials` class with `final String username`, `final String connectionUrl`, and `final int maxPoolSize`. Create a constructor initializing all three. Provide a method `maskSummary()` that prints the username and maxPoolSize with a masked URL. In `main()`, verify that the fields cannot be changed once set.",
            "hint": "All fields are blank final and set inside the constructor.",
            "solutionCode": """class DbCredentials {
    private final String username;
    private final String connectionUrl;
    private final int maxPoolSize;

    public DbCredentials(String username, String connectionUrl, int maxPoolSize) {
        this.username = username;
        this.connectionUrl = connectionUrl;
        this.maxPoolSize = maxPoolSize;
    }

    public void maskSummary() {
        System.out.println("DB User: " + username + " | Pool Size: " + maxPoolSize + " | URL: jdbc:***masked***");
    }
}

public class Solution {
    public static void main(String[] args) {
        DbCredentials creds = new DbCredentials("admin_read", "jdbc:postgresql://db.corp:5432/finance", 20);
        creds.maskSummary();
    }
}""",
            "output": "DB User: admin_read | Pool Size: 20 | URL: jdbc:***masked***",
            "explanation": "Blank final fields ensure credentials are bound during creation and remain immutable throughout application lifecycle."
        },
        {
            "id": "oop11-ex39",
            "title": "Final Algorithm Implementation in Cryptographic Hasher",
            "problemStatement": "Create a `CryptoProvider` base class with a `public final int generateChecksum(int data)` that implements an immutable checksum algorithm: `((data ^ 0x5A5A) * 31) & 0xFFFF`. Add an overridable method `String getProviderName()` returning 'GenericCrypto'. Subclass `CustomCrypto` overrides `getProviderName()` returning 'CustomHashedCrypto'. In `main()`, run the checksum for data `1234`.",
            "hint": "Subclass can change its name but CANNOT override `generateChecksum` because it is marked `final`.",
            "solutionCode": """class CryptoProvider {
    public final int generateChecksum(int data) {
        return ((data ^ 0x5A5A) * 31) & 0xFFFF;
    }

    public String getProviderName() {
        return "GenericCrypto";
    }
}

class CustomCrypto extends CryptoProvider {
    @Override
    public String getProviderName() {
        return "CustomHashedCrypto";
    }
}

public class Solution {
    public static void main(String[] args) {
        CustomCrypto crypto = new CustomCrypto();
        int checksum = crypto.generateChecksum(1234);

        System.out.println("Provider: " + crypto.getProviderName());
        System.out.println("Calculated Checksum: " + checksum);
    }
}""",
            "output": "Provider: CustomHashedCrypto\nCalculated Checksum: 64147",
            "explanation": "The final method generateChecksum() protects cryptographic consistency while allowing provider naming to be overridden."
        },
        {
            "id": "oop11-ex40",
            "title": "Defensive Copying with Final Array Fields in Immutable Object",
            "problemStatement": "Build an immutable `StudentScores` class with `final String studentName` and `final int[] scores`. The constructor must perform a defensive copy of the incoming array. The getter `getScores()` must also return a defensive clone to ensure the internal final array cannot be mutated from outside. In `main()`, demonstrate that modifying the external array does not affect `StudentScores`.",
            "hint": "Use `this.scores = scores.clone();` in the constructor and `return scores.clone();` in the getter.",
            "solutionCode": """class StudentScores {
    private final String studentName;
    private final int[] scores;

    public StudentScores(String studentName, int[] scores) {
        this.studentName = studentName;
        // Defensive copy on construction
        this.scores = (scores != null) ? scores.clone() : new int[0];
    }

    public String getStudentName() {
        return studentName;
    }

    public int[] getScores() {
        // Defensive copy on retrieval
        return scores.clone();
    }
}

public class Solution {
    public static void main(String[] args) {
        int[] externalScores = {88, 92, 95};
        StudentScores record = new StudentScores("Siddharth", externalScores);

        // Mutate external array
        externalScores[0] = 0;

        int[] retrieved = record.getScores();
        System.out.println("Student: " + record.getStudentName());
        System.out.println("Record score 0: " + retrieved[0]);
        System.out.println("External score 0: " + externalScores[0]);
    }
}""",
            "output": "Student: Siddharth\nRecord score 0: 88\nExternal score 0: 0",
            "explanation": "A final reference only prevents reassignment; defensive cloning is essential to achieve true immutability for mutable objects like arrays."
        }
    ]
}

target_file = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop11_exercises.ts"

with open(target_file, "w", encoding="utf-8") as f:
    f.write("import { ProgrammingExercise } from '../../detailedLessons';\n\n")
    f.write("// ============================================================\n")
    f.write("// MODULE 11: INHERITANCE & HIERARCHY - PROGRAMMING EXERCISES\n")
    f.write("// Total: 40 exercises (10 per sub-lesson)\n")
    f.write("// Progressive difficulty: Beginner to Medium-Hard\n")
    f.write("// ============================================================\n\n")
    f.write("export const oop11Exercises: Record<string, ProgrammingExercise[]> = ")
    json.dump(exercises_data, f, indent=2)
    f.write(";\n")

print("Successfully wrote", target_file)
