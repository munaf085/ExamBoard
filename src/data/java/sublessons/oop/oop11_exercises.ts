import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 11: INHERITANCE & HIERARCHY - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const oop11Exercises: Record<string, ProgrammingExercise[]> = {
  "extends-and-is-a": [
    {
      "id": "oop11-ex01",
      "title": "Vehicle Base Class and Car Extension",
      "problemStatement": "Create a base class `Vehicle` with fields `brand` (String) and `speed` (int), along with a method `displaySpecs()`. Then create a subclass `Car` that extends `Vehicle`, adding an integer field `doors` and a method `displayCarDetails()`. In `main()`, instantiate a `Car`, configure all fields, and call both methods to verify inheritance.",
      "hint": "Use the `extends` keyword in the class header: `class Car extends Vehicle`. The subclass automatically inherits all accessible non-private fields and methods from its superclass.",
      "solutionCode": "class Vehicle {\n    String brand;\n    int speed;\n\n    void displaySpecs() {\n        System.out.println(\"Vehicle: \" + brand + \" running at \" + speed + \" km/h\");\n    }\n}\n\nclass Car extends Vehicle {\n    int doors;\n\n    void displayCarDetails() {\n        System.out.println(\"Car with \" + doors + \" doors, brand: \" + brand);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car myCar = new Car();\n        myCar.brand = \"Toyota\";\n        myCar.speed = 120;\n        myCar.doors = 4;\n\n        myCar.displaySpecs();\n        myCar.displayCarDetails();\n    }\n}",
      "output": "Vehicle: Toyota running at 120 km/h\nCar with 4 doors, brand: Toyota",
      "explanation": "Car extends Vehicle, inheriting the brand and speed fields as well as the displaySpecs() method. The Car instance holds its own doors field alongside the inherited state on the heap."
    },
    {
      "id": "oop11-ex02",
      "title": "Employee Compensation and Manager State Specialization",
      "problemStatement": "Define an `Employee` class with fields `name` (String) and `baseSalary` (double), and a method `displayCompensation()`. Create a subclass `Manager` extending `Employee` with an additional field `bonus` (double) and a method `getTotalCompensation()` returning baseSalary + bonus. In `main()`, instantiate a Manager, populate the fields, and print the total compensation.",
      "hint": "The subclass inherits `baseSalary` from `Employee`. Because `baseSalary` has package-private access, `Manager` can read it directly.",
      "solutionCode": "class Employee {\n    String name;\n    double baseSalary;\n\n    void displayCompensation() {\n        System.out.println(name + \" Base Salary: $\" + baseSalary);\n    }\n}\n\nclass Manager extends Employee {\n    double bonus;\n\n    double getTotalCompensation() {\n        return baseSalary + bonus;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Manager mgr = new Manager();\n        mgr.name = \"Alice Chen\";\n        mgr.baseSalary = 85000.0;\n        mgr.bonus = 15000.0;\n\n        mgr.displayCompensation();\n        System.out.println(\"Total Compensation: $\" + mgr.getTotalCompensation());\n    }\n}",
      "output": "Alice Chen Base Salary: $85000.0\nTotal Compensation: $100000.0",
      "explanation": "Manager specializes Employee by adding bonus. The subclass method getTotalCompensation() computes the combined salary using both inherited state and its own field."
    },
    {
      "id": "oop11-ex03",
      "title": "Geometric Rectangle Perimeter and Area Derivation",
      "problemStatement": "Implement a base class `Shape` with a field `name` (String) and method `identify()`. Create a derived class `Rectangle` that extends `Shape`, declaring `width` (double) and `height` (double). Include methods `getArea()` and `getPerimeter()`. In `main()`, set up a rectangle with dimensions 8.0 by 5.0 and display its name, area, and perimeter.",
      "hint": "Initialize shape name using `rect.name = \"Rectangle\";`. Area is width * height, and perimeter is 2 * (width + height).",
      "solutionCode": "class Shape {\n    String name;\n\n    void identify() {\n        System.out.println(\"Shape type: \" + name);\n    }\n}\n\nclass Rectangle extends Shape {\n    double width;\n    double height;\n\n    double getArea() {\n        return width * height;\n    }\n\n    double getPerimeter() {\n        return 2 * (width + height);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Rectangle rect = new Rectangle();\n        rect.name = \"Rectangle\";\n        rect.width = 8.0;\n        rect.height = 5.0;\n\n        rect.identify();\n        System.out.println(\"Area: \" + rect.getArea());\n        System.out.println(\"Perimeter: \" + rect.getPerimeter());\n    }\n}",
      "output": "Shape type: Rectangle\nArea: 40.0\nPerimeter: 26.0",
      "explanation": "Rectangle establishes an IS-A relationship with Shape. The derived class inherits identify() and adds specialized geometric calculations."
    },
    {
      "id": "oop11-ex04",
      "title": "Bank Account Interest Accumulation",
      "problemStatement": "Write a `BankAccount` class with `accountNumber` (String) and `balance` (double), plus a method `deposit(double amount)`. Create a subclass `SavingsAccount` that adds an `interestRate` (double) and an `applyInterest()` method that calculates interest (`balance * interestRate`) and adds it to `balance`. In `main()`, create an account with $2000.0, deposit $500.0, apply 5% interest (0.05), and display the final balance.",
      "hint": "In `applyInterest()`, compute the earned amount and modify the inherited `balance` field directly.",
      "solutionCode": "class BankAccount {\n    String accountNumber;\n    double balance;\n\n    void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n        }\n    }\n}\n\nclass SavingsAccount extends BankAccount {\n    double interestRate;\n\n    void applyInterest() {\n        double interest = balance * interestRate;\n        balance += interest;\n        System.out.println(\"Interest applied: $\" + interest);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount();\n        sa.accountNumber = \"SA-9012\";\n        sa.balance = 2000.0;\n        sa.interestRate = 0.05;\n\n        sa.deposit(500.0);\n        sa.applyInterest();\n        System.out.println(\"Final Balance: $\" + sa.balance);\n    }\n}",
      "output": "Interest applied: $125.0\nFinal Balance: $2625.0",
      "explanation": "SavingsAccount inherits the balance state and deposit() capability. It manipulates the inherited balance within applyInterest() seamlessly."
    },
    {
      "id": "oop11-ex05",
      "title": "Three-Tier Biological Taxonomy Hierarchy",
      "problemStatement": "Construct a three-level inheritance hierarchy: `Animal` (field `species`, method `eat()`), `Mammal` extending `Animal` (field `furColor`, method `walk()`), and `Dog` extending `Mammal` (field `breed`, method `bark()`). In `main()`, instantiate a `Dog`, assign values to all three fields, and invoke all three methods.",
      "hint": "Java supports multilevel inheritance (A -> B -> C). A Dog object contains the state and behavior of Animal, Mammal, and Dog.",
      "solutionCode": "class Animal {\n    String species;\n\n    void eat() {\n        System.out.println(species + \" is consuming food.\");\n    }\n}\n\nclass Mammal extends Animal {\n    String furColor;\n\n    void walk() {\n        System.out.println(\"Walking with \" + furColor + \" fur.\");\n    }\n}\n\nclass Dog extends Mammal {\n    String breed;\n\n    void bark() {\n        System.out.println(breed + \" says: Woof!\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.species = \"Canis lupus\";\n        d.furColor = \"Golden\";\n        d.breed = \"Retriever\";\n\n        d.eat();\n        d.walk();\n        d.bark();\n    }\n}",
      "output": "Canis lupus is consuming food.\nWalking with Golden fur.\nRetriever says: Woof!",
      "explanation": "Through transitive inheritance in Java, Dog inherits everything from Mammal and Animal. A single instance on the heap holds all three string fields."
    },
    {
      "id": "oop11-ex06",
      "title": "Protected State Access Across Inheritance Boundary",
      "problemStatement": "Build a `UserProfile` class with `protected String username` and `protected String role`. Subclass it with `AdminUser` having `private int accessLevel`. Add a method `displayAdminBadge()` in `AdminUser` that prints the inherited protected fields alongside `accessLevel`. In `main()`, test this relationship.",
      "hint": "The `protected` modifier allows subclasses to access the member directly, providing encapsulation against unrelated non-child classes while permitting inheritance.",
      "solutionCode": "class UserProfile {\n    protected String username;\n    protected String role;\n}\n\nclass AdminUser extends UserProfile {\n    private int accessLevel;\n\n    public void setAccessLevel(int level) {\n        this.accessLevel = level;\n    }\n\n    public void displayAdminBadge() {\n        System.out.println(\"ADMIN BADGE: \" + username + \" | Role: \" + role + \" | Level: \" + accessLevel);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        AdminUser admin = new AdminUser();\n        admin.username = \"sys_admin\";\n        admin.role = \"SuperUser\";\n        admin.setAccessLevel(5);\n\n        admin.displayAdminBadge();\n    }\n}",
      "output": "ADMIN BADGE: sys_admin | Role: SuperUser | Level: 5",
      "explanation": "The protected fields username and role are accessible to AdminUser because of inheritance. Encapsulation is preserved while child classes get access."
    },
    {
      "id": "oop11-ex07",
      "title": "Book Catalog and Academic Textbook Distinction",
      "problemStatement": "Create a `Book` class with fields `title` (String), `author` (String), and `pages` (int). Create a subclass `TextBook` with `subject` (String) and `gradeLevel` (int). Write a static method `summarizeBook(Book b)` that prints the title and author. In `main()`, pass both a standard `Book` and a `TextBook` to `summarizeBook` to demonstrate that a TextBook IS-A Book.",
      "hint": "Because `TextBook extends Book`, a method expecting a `Book` parameter happily accepts a `TextBook` without casting.",
      "solutionCode": "class Book {\n    String title;\n    String author;\n    int pages;\n}\n\nclass TextBook extends Book {\n    String subject;\n    int gradeLevel;\n}\n\npublic class Solution {\n    static void summarizeBook(Book b) {\n        System.out.println(\"Title: \" + b.title + \" | Author: \" + b.author);\n    }\n\n    public static void main(String[] args) {\n        Book novel = new Book();\n        novel.title = \"To Kill a Mockingbird\";\n        novel.author = \"Harper Lee\";\n        novel.pages = 281;\n\n        TextBook math = new TextBook();\n        math.title = \"Advanced Calculus\";\n        math.author = \"Dr. Smith\";\n        math.pages = 650;\n        math.subject = \"Mathematics\";\n        math.gradeLevel = 12;\n\n        summarizeBook(novel);\n        summarizeBook(math);\n    }\n}",
      "output": "Title: To Kill a Mockingbird | Author: Harper Lee\nTitle: Advanced Calculus | Author: Dr. Smith",
      "explanation": "The IS-A relationship guarantees that wherever a Book reference is required, a TextBook object can be passed directly."
    },
    {
      "id": "oop11-ex08",
      "title": "Hardware Device Hierarchy with Battery Specification",
      "problemStatement": "Build an `ElectronicDevice` class with fields `model` (String) and `voltage` (double). Subclass `Laptop` extends it, adding `batteryWh` (double) and `powerDrawWatts` (double). Include a method `estimateBatteryLife()` in `Laptop` that returns `batteryWh / powerDrawWatts` (in hours). In `main()`, set up a laptop with 60.0 Wh and 15.0 W draw, and print its specs.",
      "hint": "Inherited fields are accessed just like local fields within the child class methods.",
      "solutionCode": "class ElectronicDevice {\n    String model;\n    double voltage;\n}\n\nclass Laptop extends ElectronicDevice {\n    double batteryWh;\n    double powerDrawWatts;\n\n    double estimateBatteryLife() {\n        if (powerDrawWatts <= 0) return 0;\n        return batteryWh / powerDrawWatts;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Laptop lap = new Laptop();\n        lap.model = \"XPS Pro 15\";\n        lap.voltage = 19.5;\n        lap.batteryWh = 60.0;\n        lap.powerDrawWatts = 15.0;\n\n        System.out.println(\"Model: \" + lap.model + \" (\" + lap.voltage + \"V)\");\n        System.out.println(\"Battery Life: \" + lap.estimateBatteryLife() + \" hours\");\n    }\n}",
      "output": "Model: XPS Pro 15 (19.5V)\nBattery Life: 4.0 hours",
      "explanation": "Laptop derives from ElectronicDevice. It inherits model and voltage while providing domain-specific computation for battery life."
    },
    {
      "id": "oop11-ex09",
      "title": "Warehouse Inventory and Perishable Food Lifespan",
      "problemStatement": "Construct an `InventoryItem` class with `sku` (String), `name` (String), and `unitPrice` (double). Subclass `PerishableItem` with `shelfLifeDays` (int) and `daysInStorage` (int). Add a method `isExpired()` returning true if `daysInStorage > shelfLifeDays`, and `getRemainingDays()`. In `main()`, test two perishable goods and print their status.",
      "hint": "Remaining days can be calculated as `Math.max(0, shelfLifeDays - daysInStorage)`.",
      "solutionCode": "class InventoryItem {\n    String sku;\n    String name;\n    double unitPrice;\n}\n\nclass PerishableItem extends InventoryItem {\n    int shelfLifeDays;\n    int daysInStorage;\n\n    boolean isExpired() {\n        return daysInStorage > shelfLifeDays;\n    }\n\n    int getRemainingDays() {\n        return Math.max(0, shelfLifeDays - daysInStorage);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        PerishableItem milk = new PerishableItem();\n        milk.sku = \"DAIRY-101\";\n        milk.name = \"Whole Milk\";\n        milk.unitPrice = 3.49;\n        milk.shelfLifeDays = 14;\n        milk.daysInStorage = 10;\n\n        PerishableItem yogurt = new PerishableItem();\n        yogurt.sku = \"DAIRY-202\";\n        yogurt.name = \"Greek Yogurt\";\n        yogurt.unitPrice = 1.99;\n        yogurt.shelfLifeDays = 20;\n        yogurt.daysInStorage = 25;\n\n        System.out.println(milk.name + \" - Expired: \" + milk.isExpired() + \", Days left: \" + milk.getRemainingDays());\n        System.out.println(yogurt.name + \" - Expired: \" + yogurt.isExpired() + \", Days left: \" + yogurt.getRemainingDays());\n    }\n}",
      "output": "Whole Milk - Expired: false, Days left: 4\nGreek Yogurt - Expired: true, Days left: 0",
      "explanation": "PerishableItem extends InventoryItem with perishable-specific attributes and methods, showing how inheritance models specialized domain rules."
    },
    {
      "id": "oop11-ex10",
      "title": "University Course Enrollment with Laboratory Component",
      "problemStatement": "Create a `Course` class with fields `courseCode` (String), `title` (String), and `credits` (int). Derive `LabCourse` adding `labFee` (double) and `maxLabCapacity` (int). Add a method `calculateTotalCost(double costPerCredit)` in `LabCourse` that returns `(credits * costPerCredit) + labFee`. In `main()`, compute costs for a 4-credit lab course with $120.0 fee at $300.0/credit.",
      "hint": "The inherited `credits` field participates in the financial calculation alongside `labFee`.",
      "solutionCode": "class Course {\n    String courseCode;\n    String title;\n    int credits;\n}\n\nclass LabCourse extends Course {\n    double labFee;\n    int maxLabCapacity;\n\n    double calculateTotalCost(double costPerCredit) {\n        return (credits * costPerCredit) + labFee;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        LabCourse chem = new LabCourse();\n        chem.courseCode = \"CHEM-201\";\n        chem.title = \"Organic Chemistry with Lab\";\n        chem.credits = 4;\n        chem.labFee = 120.0;\n        chem.maxLabCapacity = 24;\n\n        double cost = chem.calculateTotalCost(300.0);\n        System.out.println(\"Course: \" + chem.courseCode + \" - \" + chem.title);\n        System.out.println(\"Max Lab Capacity: \" + chem.maxLabCapacity);\n        System.out.println(\"Total Tuition & Fee: $\" + cost);\n    }\n}",
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
      "solutionCode": "class Component {\n    Component() {\n        System.out.println(\"Component initialized\");\n    }\n}\n\nclass Button extends Component {\n    Button() {\n        // compiler inserts implicit super();\n        System.out.println(\"Button initialized\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Button btn = new Button();\n    }\n}",
      "output": "Component initialized\nButton initialized",
      "explanation": "Constructor chaining guarantees the superclass initializes its state before the subclass constructor body begins executing."
    },
    {
      "id": "oop11-ex12",
      "title": "Forwarding Parameters to Superclass Constructor",
      "problemStatement": "Create a `Vehicle` class with a constructor accepting `String make, int year`. Create a subclass `Truck` with fields `double payloadTons`. Truck's constructor must accept `(String make, int year, double payloadTons)` and forward make and year to `super(make, year)`. Print vehicle details from a method in Truck.",
      "hint": "`super(make, year)` must be the very first statement inside the Truck constructor.",
      "solutionCode": "class Vehicle {\n    String make;\n    int year;\n\n    Vehicle(String make, int year) {\n        this.make = make;\n        this.year = year;\n    }\n}\n\nclass Truck extends Vehicle {\n    double payloadTons;\n\n    Truck(String make, int year, double payloadTons) {\n        super(make, year);\n        this.payloadTons = payloadTons;\n    }\n\n    void displayTruck() {\n        System.out.println(year + \" \" + make + \" (Payload: \" + payloadTons + \" tons)\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Truck t = new Truck(\"Volvo\", 2022, 18.5);\n        t.displayTruck();\n    }\n}",
      "output": "2022 Volvo (Payload: 18.5 tons)",
      "explanation": "Because Vehicle has no default constructor, Truck must explicitly call super(make, year) as its first statement."
    },
    {
      "id": "oop11-ex13",
      "title": "Three-Tier Constructor Call Stack Tracing",
      "problemStatement": "Implement three classes: `Device`, `Computer`, and `Laptop` forming a three-level hierarchy. Each constructor must print a log message indicating its execution: 'Device: <brand>', 'Computer: <ram>GB RAM', 'Laptop: <weight>kg'. Pass arguments through constructors using `super()`. In `main()`, instantiate a `Laptop` with ('Dell', 16, 1.8).",
      "hint": "Constructor calls cascade upward: Laptop -> Computer -> Device, and then execute downward: Device body -> Computer body -> Laptop body.",
      "solutionCode": "class Device {\n    Device(String brand) {\n        System.out.println(\"Device: \" + brand);\n    }\n}\n\nclass Computer extends Device {\n    Computer(String brand, int ram) {\n        super(brand);\n        System.out.println(\"Computer: \" + ram + \"GB RAM\");\n    }\n}\n\nclass Laptop extends Computer {\n    Laptop(String brand, int ram, double weight) {\n        super(brand, ram);\n        System.out.println(\"Laptop: \" + weight + \"kg\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Laptop myLap = new Laptop(\"Dell\", 16, 1.8);\n    }\n}",
      "output": "Device: Dell\nComputer: 16GB RAM\nLaptop: 1.8kg",
      "explanation": "Execution strictly flows from the highest superclass down to the most specific subclass, ensuring base state is ready first."
    },
    {
      "id": "oop11-ex14",
      "title": "Overloaded Constructor Delegation via this() and super()",
      "problemStatement": "Create a `Person` class with `Person(String name, int age)`. Create an `Employee` subclass with `(String name, int age, String department)`. Add an overloaded constructor `Employee(String name)` that delegates to the 3-arg constructor using `this(name, 25, \"General\")`. In `main()`, instantiate an employee using the 1-arg constructor.",
      "hint": "A constructor can invoke `this(...)` as its first statement. The target constructor then invokes `super(...)`.",
      "solutionCode": "class Person {\n    String name;\n    int age;\n\n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\nclass Employee extends Person {\n    String department;\n\n    Employee(String name, int age, String department) {\n        super(name, age);\n        this.department = department;\n    }\n\n    Employee(String name) {\n        this(name, 25, \"General\");\n    }\n\n    void printBadge() {\n        System.out.println(name + \" (\" + age + \") - \" + department);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Employee emp = new Employee(\"Marcus\");\n        emp.printBadge();\n    }\n}",
      "output": "Marcus (25) - General",
      "explanation": "Employee(name) calls this(name, 25, 'General'), which in turn calls super(name, age) to initialize Person, demonstrating constructor delegation."
    },
    {
      "id": "oop11-ex15",
      "title": "Defensive State Validation in Superclass Constructor",
      "problemStatement": "Design a `BankAccount` class where the constructor validates the initial balance: if `initialBalance < 0`, it sets `balance = 0.0` and prints 'Warning: Initial balance cannot be negative; defaulted to 0.0'. Subclass `PremiumAccount` calls `super(initialBalance)` and adds `cashbackRate = 0.02`. In `main()`, instantiate with `-500.0` and print balance.",
      "hint": "The superclass constructor encapsulates validation logic so derived classes automatically benefit from defensive guarantees.",
      "solutionCode": "class BankAccount {\n    double balance;\n\n    BankAccount(double initialBalance) {\n        if (initialBalance < 0.0) {\n            System.out.println(\"Warning: Initial balance cannot be negative; defaulted to 0.0\");\n            this.balance = 0.0;\n        } else {\n            this.balance = initialBalance;\n        }\n    }\n}\n\nclass PremiumAccount extends BankAccount {\n    double cashbackRate;\n\n    PremiumAccount(double initialBalance, double cashbackRate) {\n        super(initialBalance);\n        this.cashbackRate = cashbackRate;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        PremiumAccount pa = new PremiumAccount(-500.0, 0.02);\n        System.out.println(\"Account Balance: $\" + pa.balance);\n    }\n}",
      "output": "Warning: Initial balance cannot be negative; defaulted to 0.0\nAccount Balance: $0.0",
      "explanation": "By putting validation in BankAccount's constructor, all subclasses are protected from having invalid initial balances."
    },
    {
      "id": "oop11-ex16",
      "title": "Employee and Contractor Hourly Rate Initialization",
      "problemStatement": "Create a `Worker` class with fields `String name, String id` and constructor `Worker(String name, String id)`. Create subclass `Contractor` with `double hourlyRate` and `int contractMonths`. In Contractor's constructor, invoke `super(name, id)`. Add a method `estimateEarnings(int hoursPerMonth)` and print results in `main()`.",
      "hint": "Hourly earnings calculation: `hourlyRate * hoursPerMonth * contractMonths`.",
      "solutionCode": "class Worker {\n    String name;\n    String id;\n\n    Worker(String name, String id) {\n        this.name = name;\n        this.id = id;\n    }\n}\n\nclass Contractor extends Worker {\n    double hourlyRate;\n    int contractMonths;\n\n    Contractor(String name, String id, double hourlyRate, int contractMonths) {\n        super(name, id);\n        this.hourlyRate = hourlyRate;\n        this.contractMonths = contractMonths;\n    }\n\n    double estimateTotalContractValue(int hoursPerMonth) {\n        return hourlyRate * hoursPerMonth * contractMonths;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Contractor c = new Contractor(\"Elena Rostova\", \"CTR-88\", 65.0, 6);\n        System.out.println(\"Contractor: \" + c.name + \" (\" + c.id + \")\");\n        System.out.println(\"Contract Value (160 hrs/mo): $\" + c.estimateTotalContractValue(160));\n    }\n}",
      "output": "Contractor: Elena Rostova (CTR-88)\nContract Value (160 hrs/mo): $62400.0",
      "explanation": "Contractor relies on Worker's constructor to set identity fields, then sets financial terms in its own constructor."
    },
    {
      "id": "oop11-ex17",
      "title": "Vehicle Chassis Unique Identifier Propagation",
      "problemStatement": "Create a `Chassis` base class with a static counter `nextVin = 1001` and instance field `int vin`. The constructor sets `this.vin = nextVin++`. Create a subclass `Motorcycle` with constructor `Motorcycle(String model)` that calls `super()` implicitly or explicitly. In `main()`, instantiate two motorcycles and display their VINs.",
      "hint": "Each time `super()` executes, the static counter increments, assigning a distinct VIN to every instance.",
      "solutionCode": "class Chassis {\n    private static int nextVin = 1001;\n    int vin;\n\n    Chassis() {\n        this.vin = nextVin++;\n    }\n}\n\nclass Motorcycle extends Chassis {\n    String model;\n\n    Motorcycle(String model) {\n        super();\n        this.model = model;\n    }\n\n    void displayInfo() {\n        System.out.println(\"Motorcycle VIN #\" + vin + \" - Model: \" + model);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Motorcycle m1 = new Motorcycle(\"Harley Sportster\");\n        Motorcycle m2 = new Motorcycle(\"Ducati Panigale\");\n\n        m1.displayInfo();\n        m2.displayInfo();\n    }\n}",
      "output": "Motorcycle VIN #1001 - Model: Harley Sportster\nMotorcycle VIN #1002 - Model: Ducati Panigale",
      "explanation": "Superclass constructor runs during each subclass creation, managing shared static state across all derived instances."
    },
    {
      "id": "oop11-ex18",
      "title": "Geometric Point and Circle Super Constructor Chaining",
      "problemStatement": "Implement class `Point` with `(int x, int y)`. Derive class `Circle` with `Point` coordinates and a `double radius`. Circle's constructor must take `(int x, int y, double radius)`, passing `(x, y)` to `super(x, y)`. Add `getArea()` using `Math.PI * radius * radius`. In `main()`, instantiate a circle at (3, 4) with radius 5.0 and print its coordinates and area formatted to 2 decimals.",
      "hint": "Access inherited x and y directly or through methods. Use `System.out.printf(\"Area: %.2f%n\", c.getArea())`.",
      "solutionCode": "class Point {\n    int x;\n    int y;\n\n    Point(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}\n\nclass Circle extends Point {\n    double radius;\n\n    Circle(int x, int y, double radius) {\n        super(x, y);\n        this.radius = radius;\n    }\n\n    double getArea() {\n        return Math.PI * radius * radius;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Circle c = new Circle(3, 4, 5.0);\n        System.out.println(\"Center: (\" + c.x + \", \" + c.y + \")\");\n        System.out.printf(\"Area: %.2f%n\", c.getArea());\n    }\n}",
      "output": "Center: (3, 4)\nArea: 78.54",
      "explanation": "Circle reuses the point coordinate initialization from Point, ensuring center coordinates are properly bound."
    },
    {
      "id": "oop11-ex19",
      "title": "Building and Skyscraper Floor Allocation",
      "problemStatement": "Create a `Building` class with `(String address, int floors)`. Create subclass `Skyscraper` with `(String address, int floors, double spireHeightMeters)`. If floors is less than 40, Skyscraper constructor prints 'Notice: Classified as standard high-rise'. In `main()`, instantiate a skyscraper with address '101 Tower Way', 55 floors, and 45.0m spire.",
      "hint": "Call `super(address, floors)` first, then check the condition on floors in the constructor body.",
      "solutionCode": "class Building {\n    String address;\n    int floors;\n\n    Building(String address, int floors) {\n        this.address = address;\n        this.floors = floors;\n    }\n}\n\nclass Skyscraper extends Building {\n    double spireHeightMeters;\n\n    Skyscraper(String address, int floors, double spireHeightMeters) {\n        super(address, floors);\n        this.spireHeightMeters = spireHeightMeters;\n        if (floors < 40) {\n            System.out.println(\"Notice: Classified as standard high-rise\");\n        }\n    }\n\n    void displayProfile() {\n        System.out.println(\"Skyscraper at \" + address + \" has \" + floors + \" floors and \" + spireHeightMeters + \"m spire.\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Skyscraper sky = new Skyscraper(\"101 Tower Way\", 55, 45.0);\n        sky.displayProfile();\n    }\n}",
      "output": "Skyscraper at 101 Tower Way has 55 floors and 45.0m spire.",
      "explanation": "Skyscraper initializes base building attributes via super() and performs custom validation in its constructor body."
    },
    {
      "id": "oop11-ex20",
      "title": "RPG Character Stat Initialization and Mana Pool",
      "problemStatement": "Create a `GameCharacter` class with `(String name, int health)`. Create a subclass `Mage` with constructor `(String name, int health, int mana)`. Mage constructor must call `super(name, health)` and set mana. Add a method `castSpell(int manaCost)` in Mage that deducts mana if sufficient, or prints 'Not enough mana'. In `main()`, cast two spells with costs 40 and 70 starting from 100 mana.",
      "hint": "Ensure `super(name, health)` is on line 1 of Mage's constructor.",
      "solutionCode": "class GameCharacter {\n    String name;\n    int health;\n\n    GameCharacter(String name, int health) {\n        this.name = name;\n        this.health = health;\n    }\n}\n\nclass Mage extends GameCharacter {\n    int mana;\n\n    Mage(String name, int health, int mana) {\n        super(name, health);\n        this.mana = mana;\n    }\n\n    void castSpell(int manaCost) {\n        if (mana >= manaCost) {\n            mana -= manaCost;\n            System.out.println(name + \" cast spell! Remaining mana: \" + mana);\n        } else {\n            System.out.println(name + \" failed: Not enough mana!\");\n        }\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Mage wizard = new Mage(\"Gandalf\", 120, 100);\n        wizard.castSpell(40);\n        wizard.castSpell(70);\n    }\n}",
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
      "solutionCode": "class Animal {\n    void makeSound() {\n        System.out.println(\"Generic animal sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Bark! Bark!\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.makeSound();\n    }\n}",
      "output": "Bark! Bark!",
      "explanation": "Dog overrides makeSound(), replacing Animal's generic implementation with its own specialized behavior."
    },
    {
      "id": "oop11-ex22",
      "title": "Augmenting Base Behavior with super Method Call",
      "problemStatement": "Create a class `Order` with `void printReceipt(double amount)` that prints 'Standard Order: $' + amount. Subclass `InternationalOrder` overrides `printReceipt(double amount)`, first calling `super.printReceipt(amount)` and then printing 'Import Duty (10%): $' + (amount * 0.10). In `main()`, print a receipt for $300.0.",
      "hint": "Use `super.printReceipt(amount)` inside the overriding method to extend rather than replace parent logic.",
      "solutionCode": "class Order {\n    void printReceipt(double amount) {\n        System.out.println(\"Standard Order: $\" + amount);\n    }\n}\n\nclass InternationalOrder extends Order {\n    @Override\n    void printReceipt(double amount) {\n        super.printReceipt(amount);\n        double duty = amount * 0.10;\n        System.out.println(\"Import Duty (10%): $\" + duty);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        InternationalOrder order = new InternationalOrder();\n        order.printReceipt(300.0);\n    }\n}",
      "output": "Standard Order: $300.0\nImport Duty (10%): $30.0",
      "explanation": "super.printReceipt(amount) delegates to the superclass implementation, allowing InternationalOrder to augment behavior cleanly."
    },
    {
      "id": "oop11-ex23",
      "title": "Retail Order vs Wholesale Tiered Discount Calculation",
      "problemStatement": "Create a `RetailOrder` class with method `double calculateDiscount(double subtotal)` returning 5% discount (subtotal * 0.05). Create subclass `WholesaleOrder` overriding `calculateDiscount(double subtotal)`: if subtotal >= 1000, discount is 20%; otherwise 10%. In `main()`, test a wholesale order of $1500.0 and $600.0.",
      "hint": "Both methods must have the signature `double calculateDiscount(double)`.",
      "solutionCode": "class RetailOrder {\n    double calculateDiscount(double subtotal) {\n        return subtotal * 0.05;\n    }\n}\n\nclass WholesaleOrder extends RetailOrder {\n    @Override\n    double calculateDiscount(double subtotal) {\n        if (subtotal >= 1000.0) {\n            return subtotal * 0.20;\n        }\n        return subtotal * 0.10;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        WholesaleOrder wo = new WholesaleOrder();\n        System.out.println(\"Wholesale $1500 discount: $\" + wo.calculateDiscount(1500.0));\n        System.out.println(\"Wholesale $600 discount: $\" + wo.calculateDiscount(600.0));\n    }\n}",
      "output": "Wholesale $1500 discount: $300.0\nWholesale $600 discount: $60.0",
      "explanation": "WholesaleOrder overrides the pricing policy of RetailOrder, tailoring the calculation to wholesale purchase volumes."
    },
    {
      "id": "oop11-ex24",
      "title": "Vehicle Fuel Economy Overriding",
      "problemStatement": "Build a `Vehicle` class with method `double calculateRange(double fuelLiters)` where fuel economy is 12.0 km/liter (returns `fuelLiters * 12.0`). Create a subclass `HybridVehicle` that overrides `calculateRange(double fuelLiters)` with an economy of 22.0 km/liter plus a fixed 50.0 km electric battery reserve. In `main()`, compute range for 10 liters.",
      "hint": "Formula for HybridVehicle: `(fuelLiters * 22.0) + 50.0`.",
      "solutionCode": "class Vehicle {\n    double calculateRange(double fuelLiters) {\n        return fuelLiters * 12.0;\n    }\n}\n\nclass HybridVehicle extends Vehicle {\n    @Override\n    double calculateRange(double fuelLiters) {\n        return (fuelLiters * 22.0) + 50.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Vehicle v = new Vehicle();\n        HybridVehicle hv = new HybridVehicle();\n\n        System.out.println(\"Standard Vehicle Range (10L): \" + v.calculateRange(10.0) + \" km\");\n        System.out.println(\"Hybrid Vehicle Range (10L): \" + hv.calculateRange(10.0) + \" km\");\n    }\n}",
      "output": "Standard Vehicle Range (10L): 120.0 km\nHybrid Vehicle Range (10L): 270.0 km",
      "explanation": "The hybrid subclass provides a more specific range calculation, demonstrating method specialization."
    },
    {
      "id": "oop11-ex25",
      "title": "Employee Performance Bonus Override",
      "problemStatement": "Define `Employee` with `double getBonus(double rating)` returning `rating * 1000.0`. Define `Manager` extending `Employee` and overriding `getBonus(double rating)` to return `super.getBonus(rating) * 1.5 + 2000.0`. In `main()`, compute bonuses for an employee and a manager with a rating of 4.5.",
      "hint": "The manager bonus utilizes `super.getBonus(rating)` as the base calculation before scaling.",
      "solutionCode": "class Employee {\n    double getBonus(double rating) {\n        return rating * 1000.0;\n    }\n}\n\nclass Manager extends Employee {\n    @Override\n    double getBonus(double rating) {\n        return (super.getBonus(rating) * 1.5) + 2000.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        Manager mgr = new Manager();\n\n        System.out.println(\"Employee Bonus (4.5): $\" + emp.getBonus(4.5));\n        System.out.println(\"Manager Bonus (4.5): $\" + mgr.getBonus(4.5));\n    }\n}",
      "output": "Employee Bonus (4.5): $4500.0\nManager Bonus (4.5): $8750.0",
      "explanation": "Manager calls super.getBonus(rating) which evaluates to 4500.0, multiplies by 1.5 (6750.0), and adds 2000.0 to get 8750.0."
    },
    {
      "id": "oop11-ex26",
      "title": "Covariant Return Type in Hierarchy Cloner",
      "problemStatement": "Demonstrate covariant return types: create a class `Document` with a method `Document cloneDocument()`. Create a subclass `Spreadsheet` with an integer field `cells`. Override `cloneDocument()` with return type `Spreadsheet` (not Document). In `main()`, call the method on a Spreadsheet reference and access `cells` directly without casting.",
      "hint": "Java allows an overriding method to return a more specific subtype of the superclass method's return type.",
      "solutionCode": "class Document {\n    String title = \"Generic Doc\";\n\n    Document cloneDocument() {\n        Document d = new Document();\n        d.title = this.title;\n        return d;\n    }\n}\n\nclass Spreadsheet extends Document {\n    int cells = 100;\n\n    @Override\n    Spreadsheet cloneDocument() {\n        Spreadsheet s = new Spreadsheet();\n        s.title = this.title;\n        s.cells = this.cells;\n        return s;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Spreadsheet original = new Spreadsheet();\n        original.cells = 500;\n\n        Spreadsheet copy = original.cloneDocument();\n        System.out.println(\"Cloned Spreadsheet cells: \" + copy.cells);\n    }\n}",
      "output": "Cloned Spreadsheet cells: 500",
      "explanation": "Covariant return types eliminate the need for casting when calling cloneDocument() through a Spreadsheet reference."
    },
    {
      "id": "oop11-ex27",
      "title": "Custom Object Description Overriding",
      "problemStatement": "Create a `Product` class with `name` and `price`, and a method `String getDetails()`. Create a subclass `DigitalProduct` with `downloadSizeMb` (int). Override `getDetails()` to include both the product details and the download size. In `main()`, print details for an e-book ($14.99, 25MB).",
      "hint": "Invoke `super.getDetails()` and concatenate `\" [Size: \" + downloadSizeMb + \" MB]\"`.",
      "solutionCode": "class Product {\n    String name;\n    double price;\n\n    Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n\n    String getDetails() {\n        return name + \" ($\" + price + \")\";\n    }\n}\n\nclass DigitalProduct extends Product {\n    int downloadSizeMb;\n\n    DigitalProduct(String name, double price, int downloadSizeMb) {\n        super(name, price);\n        this.downloadSizeMb = downloadSizeMb;\n    }\n\n    @Override\n    String getDetails() {\n        return super.getDetails() + \" [Size: \" + downloadSizeMb + \" MB]\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DigitalProduct dp = new DigitalProduct(\"Java Masterclass E-Book\", 14.99, 25);\n        System.out.println(dp.getDetails());\n    }\n}",
      "output": "Java Masterclass E-Book ($14.99) [Size: 25 MB]",
      "explanation": "DigitalProduct enhances getDetails() while preserving Product's formatting logic through super.getDetails()."
    },
    {
      "id": "oop11-ex28",
      "title": "Combat Entity Attack Damage Multiplier Override",
      "problemStatement": "Create a `Fighter` class with method `int attack(int basePower)` returning `basePower`. Create a subclass `Berserker` with field `boolean isEnraged`. Override `attack(int basePower)`: if `isEnraged` is true, return `basePower * 2`; otherwise return `basePower`. In `main()`, test a berserker attacking normally and enraged with base power 40.",
      "hint": "Check the boolean condition inside the overridden attack method.",
      "solutionCode": "class Fighter {\n    int attack(int basePower) {\n        return basePower;\n    }\n}\n\nclass Berserker extends Fighter {\n    boolean isEnraged;\n\n    @Override\n    int attack(int basePower) {\n        if (isEnraged) {\n            return basePower * 2;\n        }\n        return super.attack(basePower);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Berserker b = new Berserker();\n        b.isEnraged = false;\n        System.out.println(\"Normal Attack: \" + b.attack(40));\n\n        b.isEnraged = true;\n        System.out.println(\"Enraged Attack: \" + b.attack(40));\n    }\n}",
      "output": "Normal Attack: 40\nEnraged Attack: 80",
      "explanation": "Berserker conditionally delegates to super.attack() or applies a 2x rage multiplier, customizing base behavior."
    },
    {
      "id": "oop11-ex29",
      "title": "Progressive Tax Calculator Override",
      "problemStatement": "Implement a `TaxCalculator` class with `double computeTax(double income)` calculating a flat 15% (income * 0.15). Create `LuxuryTaxCalculator` that overrides `computeTax(double income)`: flat 15% on income up to $100,000, plus 25% on the portion above $100,000. In `main()`, compute tax on $150,000 income using both calculators.",
      "hint": "For income > 100000: `(100000 * 0.15) + ((income - 100000) * 0.25)`.",
      "solutionCode": "class TaxCalculator {\n    double computeTax(double income) {\n        return income * 0.15;\n    }\n}\n\nclass LuxuryTaxCalculator extends TaxCalculator {\n    @Override\n    double computeTax(double income) {\n        if (income <= 100000.0) {\n            return super.computeTax(income);\n        }\n        double baseTax = 100000.0 * 0.15;\n        double excessTax = (income - 100000.0) * 0.25;\n        return baseTax + excessTax;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        TaxCalculator standard = new TaxCalculator();\n        LuxuryTaxCalculator luxury = new LuxuryTaxCalculator();\n\n        double income = 150000.0;\n        System.out.println(\"Standard Tax on $150k: $\" + standard.computeTax(income));\n        System.out.println(\"Luxury Tax on $150k: $\" + luxury.computeTax(income));\n    }\n}",
      "output": "Standard Tax on $150k: $22500.0\nLuxury Tax on $150k: $27500.0",
      "explanation": "The luxury tax calculator overrides the flat rate logic with progressive tax brackets."
    },
    {
      "id": "oop11-ex30",
      "title": "Three-Level Method Override and Super Chain",
      "problemStatement": "Create a 3-level hierarchy: `UIElement` with `render()` printing '[UIElement]', `Window` overriding `render()` to call `super.render()` and print '[Window]', and `DialogBox` overriding `render()` to call `super.render()` and print '[DialogBox]'. In `main()`, invoke `render()` on a `DialogBox`.",
      "hint": "Each tier calls its immediate superclass's `render()` method, creating an execution chain.",
      "solutionCode": "class UIElement {\n    void render() {\n        System.out.print(\"[UIElement]\");\n    }\n}\n\nclass Window extends UIElement {\n    @Override\n    void render() {\n        super.render();\n        System.out.print(\" -> [Window]\");\n    }\n}\n\nclass DialogBox extends Window {\n    @Override\n    void render() {\n        super.render();\n        System.out.print(\" -> [DialogBox]\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DialogBox dialog = new DialogBox();\n        dialog.render();\n        System.out.println();\n    }\n}",
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
      "solutionCode": "class Point2D {\n    private final int x;\n    private final int y;\n\n    public Point2D(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public int getX() { return x; }\n    public int getY() { return y; }\n\n    public Point2D translate(int dx, int dy) {\n        return new Point2D(this.x + dx, this.y + dy);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Point2D p1 = new Point2D(10, 20);\n        Point2D p2 = p1.translate(5, -3);\n\n        System.out.println(\"Original: (\" + p1.getX() + \", \" + p1.getY() + \")\");\n        System.out.println(\"Translated: (\" + p2.getX() + \", \" + p2.getY() + \")\");\n    }\n}",
      "output": "Original: (10, 20)\nTranslated: (15, 17)",
      "explanation": "The final fields guarantee that p1 never mutates. translate() produces a new Point2D instance, embodying the immutable value object pattern."
    },
    {
      "id": "oop11-ex32",
      "title": "Sealing a Class with the final Keyword",
      "problemStatement": "Create a `final class SecurityToken` with `final String token` and `final long expirationEpoch`. Add a method `isExpired(long currentEpoch)` returning `currentEpoch > expirationEpoch`. In `main()`, instantiate the token, verify expiration, and document why no other class can extend SecurityToken.",
      "hint": "Adding `final` to a class header (`final class ...`) prevents any subclassing, protecting security invariants.",
      "solutionCode": "final class SecurityToken {\n    private final String token;\n    private final long expirationEpoch;\n\n    public SecurityToken(String token, long expirationEpoch) {\n        this.token = token;\n        this.expirationEpoch = expirationEpoch;\n    }\n\n    public boolean isExpired(long currentEpoch) {\n        return currentEpoch > expirationEpoch;\n    }\n\n    public String getToken() {\n        return token;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        SecurityToken st = new SecurityToken(\"AUTH_XYZ_987\", 1700000000L);\n        System.out.println(\"Token: \" + st.getToken());\n        System.out.println(\"Expired at 1700005000: \" + st.isExpired(1700005000L));\n    }\n}",
      "output": "Token: AUTH_XYZ_987\nExpired at 1700005000: true",
      "explanation": "Declaring SecurityToken final ensures no rogue subclass can override methods or compromise cryptographic token validity."
    },
    {
      "id": "oop11-ex33",
      "title": "Enforcing Template Method Invariance with final Method",
      "problemStatement": "Implement the Template Method pattern: class `DataExporter` has a `public final void exportPipeline()` method that invokes three steps in order: `openStream()`, `formatContent()`, and `closeStream()`. `openStream()` and `closeStream()` are private/final, while `formatContent()` is protected and can be overridden. Subclass `CsvExporter` overrides `formatContent()`. In `main()`, run the pipeline.",
      "hint": "Marking `exportPipeline()` final guarantees subclasses cannot alter the sequence of execution.",
      "solutionCode": "class DataExporter {\n    public final void exportPipeline() {\n        openStream();\n        formatContent();\n        closeStream();\n    }\n\n    private void openStream() {\n        System.out.println(\"1. Stream opened.\");\n    }\n\n    protected void formatContent() {\n        System.out.println(\"2. Default raw content formatted.\");\n    }\n\n    private void closeStream() {\n        System.out.println(\"3. Stream flushed and closed.\");\n    }\n}\n\nclass CsvExporter extends DataExporter {\n    @Override\n    protected void formatContent() {\n        System.out.println(\"2. CSV rows formatted with comma separators.\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DataExporter exporter = new CsvExporter();\n        exporter.exportPipeline();\n    }\n}",
      "output": "1. Stream opened.\n2. CSV rows formatted with comma separators.\n3. Stream flushed and closed.",
      "explanation": "The final keyword on exportPipeline() locks down the execution skeleton, allowing CsvExporter to customize step 2 without altering the pipeline order."
    },
    {
      "id": "oop11-ex34",
      "title": "Blank Final Field Initialization Across Multiple Constructors",
      "problemStatement": "Create a `ServerConfig` class with `final String hostname` and `final int port`. Implement two constructors: a 2-arg constructor `(String hostname, int port)` and a 0-arg default constructor that initializes them to 'localhost' and 8080. In `main()`, create an instance with each constructor and print their configurations.",
      "hint": "A blank final variable MUST be assigned exactly once in every constructor path.",
      "solutionCode": "class ServerConfig {\n    final String hostname;\n    final int port;\n\n    ServerConfig() {\n        this.hostname = \"localhost\";\n        this.port = 8080;\n    }\n\n    ServerConfig(String hostname, int port) {\n        this.hostname = hostname;\n        this.port = port;\n    }\n\n    void display() {\n        System.out.println(\"Server listening on \" + hostname + \":\" + port);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        ServerConfig defaultConfig = new ServerConfig();\n        ServerConfig customConfig = new ServerConfig(\"api.production.com\", 443);\n\n        defaultConfig.display();\n        customConfig.display();\n    }\n}",
      "output": "Server listening on localhost:8080\nServer listening on api.production.com:443",
      "explanation": "Every constructor assigns hostname and port exactly once, satisfying the compiler's strict definite assignment rule for blank finals."
    },
    {
      "id": "oop11-ex35",
      "title": "Final Array Reference vs Array Element Mutation",
      "problemStatement": "Demonstrate that making an array reference `final` prevents reassigning the reference itself, but DOES NOT prevent modifying array elements. In `main()`, declare `final int[] numbers = {10, 20, 30}`. Modify element at index 1 to 99 and print the array. Explain why `numbers = new int[3];` would fail to compile.",
      "hint": "The `final` modifier freezes the reference pointer, not the contents of the heap object it refers to.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        final int[] numbers = {10, 20, 30};\n\n        // Modifying elements is completely valid\n        numbers[1] = 99;\n\n        System.out.println(\"Index 0: \" + numbers[0]);\n        System.out.println(\"Index 1: \" + numbers[1]);\n        System.out.println(\"Index 2: \" + numbers[2]);\n\n        // Attempting numbers = new int[]{1, 2, 3}; would trigger:\n        // \"cannot assign a value to final variable numbers\"\n    }\n}",
      "output": "Index 0: 10\nIndex 1: 99\nIndex 2: 30",
      "explanation": "A final reference cannot point to another array, but the heap array object itself remains mutable."
    },
    {
      "id": "oop11-ex36",
      "title": "Mathematical Physics Constants Utility",
      "problemStatement": "Create a `PhysicsConstants` utility class containing `public static final double SPEED_OF_LIGHT = 299792458.0;` and `public static final double GRAVITATIONAL_ACCELERATION = 9.80665;`. Make its constructor private so it cannot be instantiated. In `main()`, calculate distance traveled by light in 0.001 seconds.",
      "hint": "Use the class name directly: `PhysicsConstants.SPEED_OF_LIGHT`.",
      "solutionCode": "class PhysicsConstants {\n    public static final double SPEED_OF_LIGHT = 299792458.0; // m/s\n    public static final double GRAVITATIONAL_ACCELERATION = 9.80665; // m/s^2\n\n    private PhysicsConstants() {\n        // Suppress default constructor to prevent instantiation\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        double timeSeconds = 0.001;\n        double distanceMeters = PhysicsConstants.SPEED_OF_LIGHT * timeSeconds;\n\n        System.out.println(\"Speed of Light: \" + PhysicsConstants.SPEED_OF_LIGHT + \" m/s\");\n        System.out.println(\"Distance in 1ms: \" + distanceMeters + \" meters\");\n    }\n}",
      "output": "Speed of Light: 2.99792458E8 m/s\nDistance in 1ms: 299792.458 meters",
      "explanation": "public static final defines compile-time constants accessible class-wide without object instantiation."
    },
    {
      "id": "oop11-ex37",
      "title": "Final Method Parameters for Integrity Protection",
      "problemStatement": "Write a class `AccountService` with a static method `double computeTransferFee(final double amount, final double feePercent)`. Verify that declaring parameters `final` prevents accidental reassignments inside the method body. In `main()`, compute fee on $5000.0 with 1.5% fee.",
      "hint": "Final parameters cannot be reassigned; any `amount = ...` statement will fail compilation.",
      "solutionCode": "class AccountService {\n    public static double computeTransferFee(final double amount, final double feePercent) {\n        // amount = amount * 2; // COMPILE ERROR: cannot assign a value to final variable\n        return (amount * feePercent) / 100.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        double fee = AccountService.computeTransferFee(5000.0, 1.5);\n        System.out.println(\"Transfer Fee: $\" + fee);\n    }\n}",
      "output": "Transfer Fee: $75.0",
      "explanation": "Marking method arguments final protects against inadvertent parameter mutation inside long or complex methods."
    },
    {
      "id": "oop11-ex38",
      "title": "Secure Database Credentials with Blank Final Fields",
      "problemStatement": "Design a `DbCredentials` class with `final String username`, `final String connectionUrl`, and `final int maxPoolSize`. Create a constructor initializing all three. Provide a method `maskSummary()` that prints the username and maxPoolSize with a masked URL. In `main()`, verify that the fields cannot be changed once set.",
      "hint": "All fields are blank final and set inside the constructor.",
      "solutionCode": "class DbCredentials {\n    private final String username;\n    private final String connectionUrl;\n    private final int maxPoolSize;\n\n    public DbCredentials(String username, String connectionUrl, int maxPoolSize) {\n        this.username = username;\n        this.connectionUrl = connectionUrl;\n        this.maxPoolSize = maxPoolSize;\n    }\n\n    public void maskSummary() {\n        System.out.println(\"DB User: \" + username + \" | Pool Size: \" + maxPoolSize + \" | URL: jdbc:***masked***\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DbCredentials creds = new DbCredentials(\"admin_read\", \"jdbc:postgresql://db.corp:5432/finance\", 20);\n        creds.maskSummary();\n    }\n}",
      "output": "DB User: admin_read | Pool Size: 20 | URL: jdbc:***masked***",
      "explanation": "Blank final fields ensure credentials are bound during creation and remain immutable throughout application lifecycle."
    },
    {
      "id": "oop11-ex39",
      "title": "Final Algorithm Implementation in Cryptographic Hasher",
      "problemStatement": "Create a `CryptoProvider` base class with a `public final int generateChecksum(int data)` that implements an immutable checksum algorithm: `((data ^ 0x5A5A) * 31) & 0xFFFF`. Add an overridable method `String getProviderName()` returning 'GenericCrypto'. Subclass `CustomCrypto` overrides `getProviderName()` returning 'CustomHashedCrypto'. In `main()`, run the checksum for data `1234`.",
      "hint": "Subclass can change its name but CANNOT override `generateChecksum` because it is marked `final`.",
      "solutionCode": "class CryptoProvider {\n    public final int generateChecksum(int data) {\n        return ((data ^ 0x5A5A) * 31) & 0xFFFF;\n    }\n\n    public String getProviderName() {\n        return \"GenericCrypto\";\n    }\n}\n\nclass CustomCrypto extends CryptoProvider {\n    @Override\n    public String getProviderName() {\n        return \"CustomHashedCrypto\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        CustomCrypto crypto = new CustomCrypto();\n        int checksum = crypto.generateChecksum(1234);\n\n        System.out.println(\"Provider: \" + crypto.getProviderName());\n        System.out.println(\"Calculated Checksum: \" + checksum);\n    }\n}",
      "output": "Provider: CustomHashedCrypto\nCalculated Checksum: 64147",
      "explanation": "The final method generateChecksum() protects cryptographic consistency while allowing provider naming to be overridden."
    },
    {
      "id": "oop11-ex40",
      "title": "Defensive Copying with Final Array Fields in Immutable Object",
      "problemStatement": "Build an immutable `StudentScores` class with `final String studentName` and `final int[] scores`. The constructor must perform a defensive copy of the incoming array. The getter `getScores()` must also return a defensive clone to ensure the internal final array cannot be mutated from outside. In `main()`, demonstrate that modifying the external array does not affect `StudentScores`.",
      "hint": "Use `this.scores = scores.clone();` in the constructor and `return scores.clone();` in the getter.",
      "solutionCode": "class StudentScores {\n    private final String studentName;\n    private final int[] scores;\n\n    public StudentScores(String studentName, int[] scores) {\n        this.studentName = studentName;\n        // Defensive copy on construction\n        this.scores = (scores != null) ? scores.clone() : new int[0];\n    }\n\n    public String getStudentName() {\n        return studentName;\n    }\n\n    public int[] getScores() {\n        // Defensive copy on retrieval\n        return scores.clone();\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        int[] externalScores = {88, 92, 95};\n        StudentScores record = new StudentScores(\"Siddharth\", externalScores);\n\n        // Mutate external array\n        externalScores[0] = 0;\n\n        int[] retrieved = record.getScores();\n        System.out.println(\"Student: \" + record.getStudentName());\n        System.out.println(\"Record score 0: \" + retrieved[0]);\n        System.out.println(\"External score 0: \" + externalScores[0]);\n    }\n}",
      "output": "Student: Siddharth\nRecord score 0: 88\nExternal score 0: 0",
      "explanation": "A final reference only prevents reassignment; defensive cloning is essential to achieve true immutability for mutable objects like arrays."
    }
  ]
};
