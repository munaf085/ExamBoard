import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 11: INHERITANCE & HIERARCHY - PROGRAMMING EXERCISES
// Total: 52 exercises across 7 lessons (Beginner to Capstone)
// ============================================================

export const oop11Exercises: Record<string, ProgrammingExercise[]> = {
  "what-is-inheritance": [
    {
      "id": "inh-ex01",
      "title": "Vehicle Base Class & Car Extension",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Vehicle` with variables `brand` (String) and `speed` (int), and a method `drive()` that prints `\"Vehicle is driving at \" + speed + \" km/h\"`. Then create a child class `Car` that extends `Vehicle` and adds `int doors = 4;` and a method `displayDoors()` printing `\"Number of doors: \" + doors`. In `main()`, instantiate a `Car`, set `brand = \"Toyota\"` and `speed = 100`, then call both `drive()` and `displayDoors()`.",
      "hint": "Use `class Car extends Vehicle`. Notice how `Car` can access `brand` and `speed` directly because it inherits them.",
      "solutionCode": "class Vehicle {\n    String brand;\n    int speed;\n\n    void drive() {\n        System.out.println(\"Vehicle is driving at \" + speed + \" km/h\");\n    }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n\n    void displayDoors() {\n        System.out.println(\"Number of doors: \" + doors);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Toyota\";\n        car.speed = 100;\n        car.drive();\n        car.displayDoors();\n    }\n}",
      "output": "Vehicle is driving at 100 km/h\nNumber of doors: 4",
      "explanation": "Car extends Vehicle. A Car object contains both the inherited Vehicle fields (brand, speed) and its own doors field."
    },
    {
      "id": "inh-ex02",
      "title": "Employee & Manager Salary Specialization",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Employee` with fields `name` (String) and `baseSalary` (double), and a method `displayBase()` that prints `name + \" Base Salary: $\" + baseSalary`. Create a child class `Manager` that extends `Employee` with an additional field `bonus` (double) and a method `displayTotal()` that prints `name + \" Total: $\" + (baseSalary + bonus)`. In `main()`, create a `Manager` named `\"Alice\"` with base salary `60000.0` and bonus `12000.0`, then call both methods.",
      "hint": "Manager inherits `name` and `baseSalary` from Employee and adds its own `bonus` field.",
      "solutionCode": "class Employee {\n    String name;\n    double baseSalary;\n\n    void displayBase() {\n        System.out.println(name + \" Base Salary: $\" + baseSalary);\n    }\n}\n\nclass Manager extends Employee {\n    double bonus;\n\n    void displayTotal() {\n        System.out.println(name + \" Total: $\" + (baseSalary + bonus));\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Manager mgr = new Manager();\n        mgr.name = \"Alice\";\n        mgr.baseSalary = 60000.0;\n        mgr.bonus = 12000.0;\n        mgr.displayBase();\n        mgr.displayTotal();\n    }\n}",
      "output": "Alice Base Salary: $60000.0\nAlice Total: $72000.0",
      "explanation": "Manager specializes Employee by adding a bonus field. It computes total salary using both inherited and child fields."
    },
    {
      "id": "inh-ex03",
      "title": "Geometric Shape & Rectangle Derivation",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Shape` with a field `color` (String) and a method `printColor()` printing `\"Color: \" + color`. Create a child class `Rectangle` extending `Shape` with fields `double width` and `double height`. Add methods `double getArea()` returning `width * height` and `double getPerimeter()` returning `2 * (width + height)`. In `main()`, create a blue rectangle of dimensions 6.0 x 4.0 and print its color, area, and perimeter.",
      "hint": "Rectangle inherits `color` and adds `width` and `height`.",
      "solutionCode": "class Shape {\n    String color;\n\n    void printColor() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Rectangle extends Shape {\n    double width;\n    double height;\n\n    double getArea() {\n        return width * height;\n    }\n\n    double getPerimeter() {\n        return 2 * (width + height);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Rectangle rect = new Rectangle();\n        rect.color = \"Blue\";\n        rect.width = 6.0;\n        rect.height = 4.0;\n        rect.printColor();\n        System.out.println(\"Area: \" + rect.getArea());\n        System.out.println(\"Perimeter: \" + rect.getPerimeter());\n    }\n}",
      "output": "Color: Blue\nArea: 24.0\nPerimeter: 20.0",
      "explanation": "Rectangle establishes an IS-A relationship with Shape, inheriting printColor() and adding area and perimeter calculations."
    },
    {
      "id": "inh-ex04",
      "title": "Animal & Dog Method Inheritance",
      "difficulty": "Easy",
      "problemStatement": "Create an `Animal` parent class with methods `eat()` printing `\"Eating food\"` and `sleep()` printing `\"Sleeping soundly\"`. Create child class `Dog` extending `Animal` with method `bark()` printing `\"Barking loudly\"`. In `main()`, create a `Dog` and call `eat()`, `sleep()`, and `bark()` in order.",
      "hint": "Dog inherits both eat() and sleep() from Animal without needing to rewrite them.",
      "solutionCode": "class Animal {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping soundly\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Barking loudly\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        dog.eat();\n        dog.sleep();\n        dog.bark();\n    }\n}",
      "output": "Eating food\nSleeping soundly\nBarking loudly",
      "explanation": "Dog inherits eat() and sleep() from Animal and defines its own bark() method."
    },
    {
      "id": "inh-ex05",
      "title": "Book Catalog & Academic Textbook",
      "difficulty": "Easy",
      "problemStatement": "Create class `Book` with `title` (String) and `author` (String). Create child class `Textbook` extending `Book` with `subject` (String). In `Textbook`, write method `displayInfo()` that prints `\"[Textbook] Title: \" + title + \", Author: \" + author + \", Subject: \" + subject`. In `main()`, instantiate a `Textbook` with title `\"Physics Fundamentals\"`, author `\"Dr. Hall\"`, subject `\"Science\"`, and call `displayInfo()`.",
      "hint": "Textbook can directly access title and author declared in Book.",
      "solutionCode": "class Book {\n    String title;\n    String author;\n}\n\nclass Textbook extends Book {\n    String subject;\n\n    void displayInfo() {\n        System.out.println(\"[Textbook] Title: \" + title + \", Author: \" + author + \", Subject: \" + subject);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Textbook tb = new Textbook();\n        tb.title = \"Physics Fundamentals\";\n        tb.author = \"Dr. Hall\";\n        tb.subject = \"Science\";\n        tb.displayInfo();\n    }\n}",
      "output": "[Textbook] Title: Physics Fundamentals, Author: Dr. Hall, Subject: Science",
      "explanation": "Textbook inherits book metadata (title, author) and adds subject classification."
    },
    {
      "id": "inh-ex06",
      "title": "Electronic Device & Smartphone Features",
      "difficulty": "Easy",
      "problemStatement": "Create class `Device` with `brand` (String) and `powerOn()` printing `brand + \" powered on\"`. Create child class `Phone` extending `Device` with method `makeCall(String number)` printing `\"Calling \" + number + \" from \" + brand`. In `main()`, create a `Phone` with brand `\"Samsung\"`, call `powerOn()`, and call `makeCall(\"9876543210\")`.",
      "hint": "Phone inherits brand and powerOn() from Device.",
      "solutionCode": "class Device {\n    String brand;\n\n    void powerOn() {\n        System.out.println(brand + \" powered on\");\n    }\n}\n\nclass Phone extends Device {\n    void makeCall(String number) {\n        System.out.println(\"Calling \" + number + \" from \" + brand);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Phone p = new Phone();\n        p.brand = \"Samsung\";\n        p.powerOn();\n        p.makeCall(\"9876543210\");\n    }\n}",
      "output": "Samsung powered on\nCalling 9876543210 from Samsung",
      "explanation": "Phone is a specialization of Device that can perform communication actions."
    },
    {
      "id": "inh-ex07",
      "title": "Basic BankAccount & Savings Interest",
      "difficulty": "Easy",
      "problemStatement": "Create class `BankAccount` with `accountNumber` (String) and `balance` (double). Add method `deposit(double amt)` that adds `amt` to `balance`. Create child class `SavingsAccount` extending `BankAccount` with `double interestRate = 0.04;` and method `addInterest()` that computes `balance * interestRate` and adds it to `balance`. In `main()`, create a `SavingsAccount`, deposit `1000.0`, call `addInterest()`, and print `\"Final Balance: $\" + account.balance`.",
      "hint": "addInterest() multiplies current balance by interestRate and adds the result to balance.",
      "solutionCode": "class BankAccount {\n    String accountNumber;\n    double balance;\n\n    void deposit(double amt) {\n        balance += amt;\n    }\n}\n\nclass SavingsAccount extends BankAccount {\n    double interestRate = 0.04;\n\n    void addInterest() {\n        double interest = balance * interestRate;\n        balance += interest;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount();\n        sa.accountNumber = \"ACC-101\";\n        sa.deposit(1000.0);\n        sa.addInterest();\n        System.out.println(\"Final Balance: $\" + sa.balance);\n    }\n}",
      "output": "Final Balance: $1040.0",
      "explanation": "SavingsAccount directly modifies inherited balance through addInterest()."
    }
  ],
  "types-of-inheritance": [
    {
      "id": "inh-ex08",
      "title": "Three-Tier Biological Multilevel Hierarchy",
      "difficulty": "Easy",
      "problemStatement": "Implement a 3-level multilevel inheritance hierarchy: `Animal` (method `eat()` printing `\"Animal eats\"`), `Mammal extends Animal` (method `breathe()` printing `\"Mammal breathes air\"`), and `Dog extends Mammal` (method `bark()` printing `\"Dog barks\"`). In `main()`, create a `Dog` and call `eat()`, `breathe()`, and `bark()`.",
      "hint": "Multilevel inheritance chains: Animal -> Mammal -> Dog. The child Dog has access to methods from all levels.",
      "solutionCode": "class Animal {\n    void eat() {\n        System.out.println(\"Animal eats\");\n    }\n}\n\nclass Mammal extends Animal {\n    void breathe() {\n        System.out.println(\"Mammal breathes air\");\n    }\n}\n\nclass Dog extends Mammal {\n    void bark() {\n        System.out.println(\"Dog barks\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat();\n        d.breathe();\n        d.bark();\n    }\n}",
      "output": "Animal eats\nMammal breathes air\nDog barks",
      "explanation": "Dog inherits breathe() from Mammal and eat() from Animal transitively."
    },
    {
      "id": "inh-ex09",
      "title": "Multilevel Computing Device Hierarchy",
      "difficulty": "Easy",
      "problemStatement": "Build a multilevel hierarchy: `Device` (field `brand`), `Computer extends Device` (field `int ramGB`), and `Laptop extends Computer` (field `double weightKg`). In `Laptop`, add method `printSpecs()` that prints `brand + \" Laptop | RAM: \" + ramGB + \"GB | Weight: \" + weightKg + \"kg\"`. In `main()`, instantiate a `Laptop` (`\"Dell\"`, `16`, `1.5`) and invoke `printSpecs()`.",
      "hint": "Laptop extends Computer, which in turn extends Device. Laptop has access to brand, ramGB, and weightKg.",
      "solutionCode": "class Device {\n    String brand;\n}\n\nclass Computer extends Device {\n    int ramGB;\n}\n\nclass Laptop extends Computer {\n    double weightKg;\n\n    void printSpecs() {\n        System.out.println(brand + \" Laptop | RAM: \" + ramGB + \"GB | Weight: \" + weightKg + \"kg\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Laptop lap = new Laptop();\n        lap.brand = \"Dell\";\n        lap.ramGB = 16;\n        lap.weightKg = 1.5;\n        lap.printSpecs();\n    }\n}",
      "output": "Dell Laptop | RAM: 16GB | Weight: 1.5kg",
      "explanation": "Laptop combines fields from all three levels of the inheritance chain."
    },
    {
      "id": "inh-ex10",
      "title": "Hierarchical Inheritance with Geometric Shapes",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate Hierarchical Inheritance: Create a common parent `Shape` with field `color` and method `displayColor()`. Create two sibling child classes: `Circle extends Shape` (field `radius`, method `printArea()`) and `Square extends Shape` (field `side`, method `printArea()`). In `main()`, instantiate a red Circle of radius 5 (use 3.14159 * r * r) and a green Square of side 4, and display their colors and areas.",
      "hint": "Hierarchical inheritance means one parent (Shape) has multiple children (Circle, Square).",
      "solutionCode": "class Shape {\n    String color;\n    void displayColor() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Circle extends Shape {\n    double radius;\n    void printArea() {\n        System.out.println(\"Circle Area: \" + (3.14159 * radius * radius));\n    }\n}\n\nclass Square extends Shape {\n    double side;\n    void printArea() {\n        System.out.println(\"Square Area: \" + (side * side));\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Circle c = new Circle();\n        c.color = \"Red\";\n        c.radius = 5.0;\n        c.displayColor();\n        c.printArea();\n\n        Square s = new Square();\n        s.color = \"Green\";\n        s.side = 4.0;\n        s.displayColor();\n        s.printArea();\n    }\n}",
      "output": "Color: Red\nCircle Area: 78.53975\nColor: Green\nSquare Area: 16.0",
      "explanation": "Both Circle and Square share Shape as their common parent."
    },
    {
      "id": "inh-ex11",
      "title": "Hierarchical Vehicle Categorization",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Vehicle` with `brand` (String) and method `start()` printing `brand + \" engine started\"`. Create two children: `Bike extends Vehicle` (method `kickStart()`) and `Truck extends Vehicle` (method `loadCargo(int tons)`). In `main()`, test both classes with appropriate calls.",
      "hint": "Vehicle is the single parent; Bike and Truck are sibling child classes.",
      "solutionCode": "class Vehicle {\n    String brand;\n    void start() {\n        System.out.println(brand + \" engine started\");\n    }\n}\n\nclass Bike extends Vehicle {\n    void kickStart() {\n        System.out.println(brand + \" kick started\");\n    }\n}\n\nclass Truck extends Vehicle {\n    void loadCargo(int tons) {\n        System.out.println(brand + \" loaded with \" + tons + \" tons of cargo\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Bike b = new Bike();\n        b.brand = \"Yamaha\";\n        b.start();\n        b.kickStart();\n\n        Truck t = new Truck();\n        t.brand = \"Volvo\";\n        t.start();\n        t.loadCargo(10);\n    }\n}",
      "output": "Yamaha engine started\nYamaha kick started\nVolvo engine started\nVolvo loaded with 10 tons of cargo",
      "explanation": "Hierarchical inheritance allows Bike and Truck to share Vehicle's start() while having custom methods."
    },
    {
      "id": "inh-ex12",
      "title": "Multilevel Corporate Org Hierarchy",
      "difficulty": "Medium",
      "problemStatement": "Create multilevel hierarchy: `Person` (field `name`), `Employee extends Person` (field `int empId`), and `TechLead extends Employee` (field `int teamSize`). In `TechLead`, write method `printSummary()` that prints `\"Lead: \" + name + \" | ID: \" + empId + \" | Team: \" + teamSize`. In `main()`, create a TechLead for `\"Pooja\"`, ID `204`, teamSize `8`.",
      "hint": "Person -> Employee -> TechLead. All three levels contribute state.",
      "solutionCode": "class Person {\n    String name;\n}\n\nclass Employee extends Person {\n    int empId;\n}\n\nclass TechLead extends Employee {\n    int teamSize;\n\n    void printSummary() {\n        System.out.println(\"Lead: \" + name + \" | ID: \" + empId + \" | Team: \" + teamSize);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        TechLead lead = new TechLead();\n        lead.name = \"Pooja\";\n        lead.empId = 204;\n        lead.teamSize = 8;\n        lead.printSummary();\n    }\n}",
      "output": "Lead: Pooja | ID: 204 | Team: 8",
      "explanation": "TechLead inherits name from Person and empId from Employee."
    },
    {
      "id": "inh-ex13",
      "title": "Multilevel Video Game Entity Progression",
      "difficulty": "Medium",
      "problemStatement": "Create a multilevel game hierarchy: `Entity` (field `int health`), `Character extends Entity` (field `String characterName`), and `Hero extends Character` (field `String weapon`). In `Hero`, write method `attack()` printing `characterName + \" attacks with \" + weapon + \"! (Health: \" + health + \")\"`. In `main()`, create a Hero with health 100, name `\"Arthur\"`, weapon `\"Excalibur\"`, and trigger `attack()`.",
      "hint": "Health is at Entity level, name is at Character level, weapon is at Hero level.",
      "solutionCode": "class Entity {\n    int health;\n}\n\nclass Character extends Entity {\n    String characterName;\n}\n\nclass Hero extends Character {\n    String weapon;\n\n    void attack() {\n        System.out.println(characterName + \" attacks with \" + weapon + \"! (Health: \" + health + \")\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Hero hero = new Hero();\n        hero.health = 100;\n        hero.characterName = \"Arthur\";\n        hero.weapon = \"Excalibur\";\n        hero.attack();\n    }\n}",
      "output": "Arthur attacks with Excalibur! (Health: 100)",
      "explanation": "Hero synthesizes state across the three tiers of the multilevel hierarchy."
    },
    {
      "id": "inh-ex14",
      "title": "Hierarchical Banking with Overdraft & Savings Accounts",
      "difficulty": "Medium",
      "problemStatement": "Create parent `Account` with field `double balance = 500.0`. Create two child classes: `CheckingAccount extends Account` (field `double overdraftLimit = 200.0`, method `canWithdraw(double amt)` returning `(balance + overdraftLimit) >= amt`) and `FixedDeposit extends Account` (field `int lockYears = 3`, method `printLock()` printing `\"Locked for \" + lockYears + \" years\"`). In `main()`, test checking withdrawal for 650.0 and print lock on fixed deposit.",
      "hint": "Both classes inherit the initial balance of 500.0 from Account.",
      "solutionCode": "class Account {\n    double balance = 500.0;\n}\n\nclass CheckingAccount extends Account {\n    double overdraftLimit = 200.0;\n\n    boolean canWithdraw(double amt) {\n        return (balance + overdraftLimit) >= amt;\n    }\n}\n\nclass FixedDeposit extends Account {\n    int lockYears = 3;\n\n    void printLock() {\n        System.out.println(\"Locked for \" + lockYears + \" years\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        CheckingAccount ca = new CheckingAccount();\n        System.out.println(\"Can withdraw 650? \" + ca.canWithdraw(650.0));\n\n        FixedDeposit fd = new FixedDeposit();\n        fd.printLock();\n    }\n}",
      "output": "Can withdraw 650? true\nLocked for 3 years",
      "explanation": "Demonstrates hierarchical inheritance where two different account models share common balance state."
    }
  ],
  "super-constructor-chaining": [
    {
      "id": "inh-ex15",
      "title": "Verifying Constructor Execution Sequence",
      "difficulty": "Easy",
      "problemStatement": "Write a parent class `ParentClass` whose constructor prints `\"1. Parent Constructor\"` and a child class `ChildClass extends ParentClass` whose constructor prints `\"2. Child Constructor\"`. In `main()`, instantiate `new ChildClass();` to demonstrate the order in which Java runs constructors.",
      "hint": "Java guarantees that the parent constructor executes before the child constructor body.",
      "solutionCode": "class ParentClass {\n    ParentClass() {\n        System.out.println(\"1. Parent Constructor\");\n    }\n}\n\nclass ChildClass extends ParentClass {\n    ChildClass() {\n        System.out.println(\"2. Child Constructor\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new ChildClass();\n    }\n}",
      "output": "1. Parent Constructor\n2. Child Constructor",
      "explanation": "The child constructor automatically calls super() on line 1, executing ParentClass() first."
    },
    {
      "id": "inh-ex16",
      "title": "Passing Arguments to Parent with super(name, age)",
      "difficulty": "Easy",
      "problemStatement": "Create class `Person` with constructor `Person(String name, int age)`. Create child class `Student extends Person` with constructor `Student(String name, int age, int rollNo)`. Use `super(name, age)` in `Student` to initialize parent fields, and set `this.rollNo = rollNo`. Add method `show()` to print `name + \" \" + age + \" \" + rollNo`. In `main()`, create a student `\"Kiran\"`, age `19`, roll `42`.",
      "hint": "`super(name, age);` must be the first line of Student's constructor.",
      "solutionCode": "class Person {\n    String name;\n    int age;\n\n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\nclass Student extends Person {\n    int rollNo;\n\n    Student(String name, int age, int rollNo) {\n        super(name, age);\n        this.rollNo = rollNo;\n    }\n\n    void show() {\n        System.out.println(name + \" \" + age + \" \" + rollNo);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Student s = new Student(\"Kiran\", 19, 42);\n        s.show();\n    }\n}",
      "output": "Kiran 19 42",
      "explanation": "Student constructor passes name and age up to Person constructor using super(name, age)."
    },
    {
      "id": "inh-ex17",
      "title": "Vehicle & Car Parameterized Constructors",
      "difficulty": "Easy",
      "problemStatement": "Create class `Vehicle` with `Vehicle(String brand)`. Create child `Car extends Vehicle` with `Car(String brand, String model)`. Forward `brand` to `Vehicle` using `super(brand)`. In `Car`, write method `details()` printing `brand + \" \" + model`. Test in `main()` with brand `\"Honda\"` and model `\"Civic\"`.",
      "hint": "super(brand) initializes the inherited brand field.",
      "solutionCode": "class Vehicle {\n    String brand;\n    Vehicle(String brand) {\n        this.brand = brand;\n    }\n}\n\nclass Car extends Vehicle {\n    String model;\n    Car(String brand, String model) {\n        super(brand);\n        this.model = model;\n    }\n    void details() {\n        System.out.println(brand + \" \" + model);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car c = new Car(\"Honda\", \"Civic\");\n        c.details();\n    }\n}",
      "output": "Honda Civic",
      "explanation": "Car forwards brand to Vehicle constructor via super(brand)."
    },
    {
      "id": "inh-ex18",
      "title": "Product Pricing & Discount Constructor Chain",
      "difficulty": "Medium",
      "problemStatement": "Create class `Product` with fields `name` and `price`, initialized via `Product(String name, double price)`. Create child class `DiscountedProduct` with an additional `discountPercent` (double) initialized via `DiscountedProduct(String name, double price, double discountPercent)`. Add method `getFinalPrice()` returning `price - (price * discountPercent / 100)`. In `main()`, create a product `\"Headphones\"` costing `$100.0` with `20%` discount and print `getFinalPrice()`.",
      "hint": "Pass name and price to super(name, price).",
      "solutionCode": "class Product {\n    String name;\n    double price;\n\n    Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n}\n\nclass DiscountedProduct extends Product {\n    double discountPercent;\n\n    DiscountedProduct(String name, double price, double discountPercent) {\n        super(name, price);\n        this.discountPercent = discountPercent;\n    }\n\n    double getFinalPrice() {\n        return price - (price * discountPercent / 100.0);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DiscountedProduct dp = new DiscountedProduct(\"Headphones\", 100.0, 20.0);\n        System.out.println(\"Final Price: $\" + dp.getFinalPrice());\n    }\n}",
      "output": "Final Price: $80.0",
      "explanation": "DiscountedProduct initializes parent state via super(name, price) and calculates discounted cost."
    },
    {
      "id": "inh-ex19",
      "title": "Three-Level Multilevel Constructor Chaining",
      "difficulty": "Medium",
      "problemStatement": "Create 3 classes: `Grandparent(int a)` printing `\"Grandparent: \" + a`, `Parent(int a, int b) extends Grandparent` that calls `super(a)` and prints `\"Parent: \" + b`, and `Child(int a, int b, int c) extends Parent` that calls `super(a, b)` and prints `\"Child: \" + c`. In `main()`, instantiate `new Child(10, 20, 30);`.",
      "hint": "Grandparent constructor finishes first, then Parent, then Child.",
      "solutionCode": "class Grandparent {\n    Grandparent(int a) {\n        System.out.println(\"Grandparent: \" + a);\n    }\n}\n\nclass Parent extends Grandparent {\n    Parent(int a, int b) {\n        super(a);\n        System.out.println(\"Parent: \" + b);\n    }\n}\n\nclass Child extends Parent {\n    Child(int a, int b, int c) {\n        super(a, b);\n        System.out.println(\"Child: \" + c);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new Child(10, 20, 30);\n    }\n}",
      "output": "Grandparent: 10\nParent: 20\nChild: 30",
      "explanation": "Constructors execute in top-down order from the root superclass down to the leaf subclass."
    },
    {
      "id": "inh-ex20",
      "title": "Explicit super() to Avoid No-Default-Constructor Trap",
      "difficulty": "Medium",
      "problemStatement": "Create class `BaseConfig` with constructor `BaseConfig(String env)`. Notice it has NO default constructor! Create child class `AppConfig extends BaseConfig`. Provide a no-argument constructor `AppConfig()` that explicitly calls `super(\"PRODUCTION\")` to satisfy the parent requirement. In `AppConfig`, print the active environment in `printEnv()`. Test in `main()`.",
      "hint": "Because BaseConfig defines BaseConfig(String), Java does not provide a default no-arg constructor. AppConfig must call super(\"PRODUCTION\").",
      "solutionCode": "class BaseConfig {\n    String env;\n    BaseConfig(String env) {\n        this.env = env;\n    }\n}\n\nclass AppConfig extends BaseConfig {\n    AppConfig() {\n        super(\"PRODUCTION\");\n    }\n    void printEnv() {\n        System.out.println(\"Active Environment: \" + env);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        AppConfig config = new AppConfig();\n        config.printEnv();\n    }\n}",
      "output": "Active Environment: PRODUCTION",
      "explanation": "When parent has only parameterized constructors, the child constructor must explicitly call super(args)."
    },
    {
      "id": "inh-ex21",
      "title": "Point2D to Point3D Coordinate Extension",
      "difficulty": "Medium",
      "problemStatement": "Create class `Point2D` with `int x, y;` and constructor `Point2D(int x, int y)`. Create child class `Point3D extends Point2D` with `int z;` and constructor `Point3D(int x, int y, int z)` calling `super(x, y)`. Add method `printCoordinates()` printing `\"(\" + x + \", \" + y + \", \" + z + \")\"`. In `main()`, create `Point3D(3, 7, 9)` and print.",
      "hint": "Pass x and y to Point2D using super(x, y).",
      "solutionCode": "class Point2D {\n    int x, y;\n    Point2D(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n}\n\nclass Point3D extends Point2D {\n    int z;\n    Point3D(int x, int y, int z) {\n        super(x, y);\n        this.z = z;\n    }\n    void printCoordinates() {\n        System.out.println(\"(\" + x + \", \" + y + \", \" + z + \")\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Point3D p = new Point3D(3, 7, 9);\n        p.printCoordinates();\n    }\n}",
      "output": "(3, 7, 9)",
      "explanation": "Point3D reuses Point2D's 2D coordinate initialization and adds the z dimension."
    }
  ],
  "method-overriding-rules": [
    {
      "id": "inh-ex22",
      "title": "Animal Sound Overriding in Dog and Cat",
      "difficulty": "Easy",
      "problemStatement": "Create parent class `Animal` with method `void makeSound()` printing `\"Generic sound\"`. Create child `Dog` that overrides `makeSound()` to print `\"Woof Woof\"`. Create child `Cat` that overrides `makeSound()` to print `\"Meow Meow\"`. Mark both with `@Override`. In `main()`, create a Dog and a Cat and call `makeSound()` on each.",
      "hint": "Use `@Override` directly above `void makeSound()` in each child class.",
      "solutionCode": "class Animal {\n    void makeSound() {\n        System.out.println(\"Generic sound\");\n    }\n}\n\nclass Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Woof Woof\");\n    }\n}\n\nclass Cat extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Meow Meow\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.makeSound();\n        Cat c = new Cat();\n        c.makeSound();\n    }\n}",
      "output": "Woof Woof\nMeow Meow",
      "explanation": "Each child class replaces the generic parent sound with its own specific implementation."
    },
    {
      "id": "inh-ex23",
      "title": "Shape Draw Method Overriding",
      "difficulty": "Easy",
      "problemStatement": "Create parent `Shape` with `public void draw()` printing `\"Drawing generic shape\"`. Create child `Circle` that overrides `draw()` to print `\"Drawing a round circle\"`. Create child `Square` that overrides `draw()` to print `\"Drawing a four-sided square\"`. Annotate both with `@Override`. In `main()`, test both classes.",
      "hint": "Because Shape.draw() is public, the overriding methods in Circle and Square must also be public.",
      "solutionCode": "class Shape {\n    public void draw() {\n        System.out.println(\"Drawing generic shape\");\n    }\n}\n\nclass Circle extends Shape {\n    @Override\n    public void draw() {\n        System.out.println(\"Drawing a round circle\");\n    }\n}\n\nclass Square extends Shape {\n    @Override\n    public void draw() {\n        System.out.println(\"Drawing a four-sided square\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Circle c = new Circle();\n        c.draw();\n        Square s = new Square();\n        s.draw();\n    }\n}",
      "output": "Drawing a round circle\nDrawing a four-sided square",
      "explanation": "Demonstrates runtime polymorphism where subclasses specialize drawing logic."
    },
    {
      "id": "inh-ex24",
      "title": "Bank Account Fee Calculation Overriding",
      "difficulty": "Easy",
      "problemStatement": "Create class `StandardAccount` with method `double getMonthlyFee()` returning `10.0`. Create child `PremiumAccount` that overrides `getMonthlyFee()` to return `0.0` (zero fee for VIPs). In `main()`, instantiate both and print their fees.",
      "hint": "Return types must match (double).",
      "solutionCode": "class StandardAccount {\n    double getMonthlyFee() {\n        return 10.0;\n    }\n}\n\nclass PremiumAccount extends StandardAccount {\n    @Override\n    double getMonthlyFee() {\n        return 0.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        StandardAccount sa = new StandardAccount();\n        PremiumAccount pa = new PremiumAccount();\n        System.out.println(\"Standard fee: $\" + sa.getMonthlyFee());\n        System.out.println(\"Premium fee: $\" + pa.getMonthlyFee());\n    }\n}",
      "output": "Standard fee: $10.0\nPremium fee: $0.0",
      "explanation": "PremiumAccount overrides the standard fee calculation to waive monthly charges."
    },
    {
      "id": "inh-ex25",
      "title": "Role Description Specialization",
      "difficulty": "Easy",
      "problemStatement": "Create parent `Employee` with method `String getRole()` returning `\"General Employee\"`. Create child `Developer` returning `\"Java Developer\"` and `Designer` returning `\"UI/UX Designer\"`. In `main()`, print the roles of both.",
      "hint": "Match method name and empty parameter list exactly.",
      "solutionCode": "class Employee {\n    String getRole() {\n        return \"General Employee\";\n    }\n}\n\nclass Developer extends Employee {\n    @Override\n    String getRole() {\n        return \"Java Developer\";\n    }\n}\n\nclass Designer extends Employee {\n    @Override\n    String getRole() {\n        return \"UI/UX Designer\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println(new Developer().getRole());\n        System.out.println(new Designer().getRole());\n    }\n}",
      "output": "Java Developer\nUI/UX Designer",
      "explanation": "Subclasses override the general role description with specialized titles."
    },
    {
      "id": "inh-ex26",
      "title": "Printer Capability Overriding",
      "difficulty": "Medium",
      "problemStatement": "Create parent `Printer` with `void printDocument(String text)` printing `\"[Monochrome Print] \" + text`. Create child `ColorPrinter` that overrides `printDocument(String text)` to print `\"[Color Print] \" + text`. In `main()`, test both.",
      "hint": "The parameter String text must remain identical in the child class.",
      "solutionCode": "class Printer {\n    void printDocument(String text) {\n        System.out.println(\"[Monochrome Print] \" + text);\n    }\n}\n\nclass ColorPrinter extends Printer {\n    @Override\n    void printDocument(String text) {\n        System.out.println(\"[Color Print] \" + text);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Printer p1 = new Printer();\n        p1.printDocument(\"Invoice\");\n        ColorPrinter p2 = new ColorPrinter();\n        p2.printDocument(\"Photo\");\n    }\n}",
      "output": "[Monochrome Print] Invoice\n[Color Print] Photo",
      "explanation": "ColorPrinter replaces monochrome printing with color output."
    },
    {
      "id": "inh-ex27",
      "title": "Electric Vehicle Engine Ignition Overriding",
      "difficulty": "Medium",
      "problemStatement": "Create class `Vehicle` with `void startEngine()` printing `\"Piston engine roaring to life\"`. Create child `ElectricCar` that overrides `startEngine()` to print `\"Silent electric motor powered on\"`. In `main()`, instantiate an `ElectricCar` and call `startEngine()`.",
      "hint": "ElectricCar customizes startEngine behavior for electric powertrains.",
      "solutionCode": "class Vehicle {\n    void startEngine() {\n        System.out.println(\"Piston engine roaring to life\");\n    }\n}\n\nclass ElectricCar extends Vehicle {\n    @Override\n    void startEngine() {\n        System.out.println(\"Silent electric motor powered on\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        ElectricCar ev = new ElectricCar();\n        ev.startEngine();\n    }\n}",
      "output": "Silent electric motor powered on",
      "explanation": "ElectricCar overrides the noisy engine behavior with silent electric startup."
    },
    {
      "id": "inh-ex28",
      "title": "Delivery Service Transit Time Overriding",
      "difficulty": "Medium",
      "problemStatement": "Create parent `DeliveryService` with method `int getEstimatedDays(String distance)`: if distance is `\"local\"`, return 3, otherwise return 7. Create child `ExpressDelivery` that overrides `getEstimatedDays(String distance)`: if distance is `\"local\"`, return 1, otherwise return 2. In `main()`, print estimated days for both services on `\"local\"`.",
      "hint": "Check distance.equals(\"local\") inside both methods.",
      "solutionCode": "class DeliveryService {\n    int getEstimatedDays(String distance) {\n        return distance.equals(\"local\") ? 3 : 7;\n    }\n}\n\nclass ExpressDelivery extends DeliveryService {\n    @Override\n    int getEstimatedDays(String distance) {\n        return distance.equals(\"local\") ? 1 : 2;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        DeliveryService standard = new DeliveryService();\n        ExpressDelivery express = new ExpressDelivery();\n        System.out.println(\"Standard local days: \" + standard.getEstimatedDays(\"local\"));\n        System.out.println(\"Express local days: \" + express.getEstimatedDays(\"local\"));\n    }\n}",
      "output": "Standard local days: 3\nExpress local days: 1",
      "explanation": "ExpressDelivery provides faster delivery transit estimates by overriding getEstimatedDays."
    }
  ],
  "super-method-and-variable": [
    {
      "id": "inh-ex29",
      "title": "Extending Parent Method with super.displayDetails()",
      "difficulty": "Easy",
      "problemStatement": "Create parent `Employee` with `name` and `salary`, and method `display()` printing `\"Name: \" + name + \", Salary: $\" + salary`. Create child `Manager` with `String department = \"IT\";`. In `Manager`, override `display()` to first call `super.display()` and then print `\"Department: \" + department`. In `main()`, create a Manager `\"Sita\"`, salary `75000.0`, and call `display()`.",
      "hint": "Call `super.display();` inside Manager's `display()` method.",
      "solutionCode": "class Employee {\n    String name;\n    double salary;\n    Employee(String name, double salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n    void display() {\n        System.out.println(\"Name: \" + name + \", Salary: $\" + salary);\n    }\n}\n\nclass Manager extends Employee {\n    String department = \"IT\";\n    Manager(String name, double salary) {\n        super(name, salary);\n    }\n    @Override\n    void display() {\n        super.display();\n        System.out.println(\"Department: \" + department);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Manager m = new Manager(\"Sita\", 75000.0);\n        m.display();\n    }\n}",
      "output": "Name: Sita, Salary: $75000.0\nDepartment: IT",
      "explanation": "Manager reuses Employee.display() and adds its own department output."
    },
    {
      "id": "inh-ex30",
      "title": "Adding Fee with super.withdraw()",
      "difficulty": "Easy",
      "problemStatement": "Create `BankAccount` with `double balance = 500.0;` and method `void withdraw(double amt)` that deducts `amt` and prints `\"Withdrawn: $\" + amt + \" | Balance: $\" + balance`. Create child `FeeAccount extends BankAccount` that overrides `withdraw(double amt)`: it prints `\"$2 transaction fee applied\"` and then calls `super.withdraw(amt + 2.0)`. In `main()`, withdraw 100.0 from FeeAccount.",
      "hint": "Pass amt + 2.0 into super.withdraw().",
      "solutionCode": "class BankAccount {\n    double balance = 500.0;\n    void withdraw(double amt) {\n        balance -= amt;\n        System.out.println(\"Withdrawn: $\" + amt + \" | Balance: $\" + balance);\n    }\n}\n\nclass FeeAccount extends BankAccount {\n    @Override\n    void withdraw(double amt) {\n        System.out.println(\"$2 transaction fee applied\");\n        super.withdraw(amt + 2.0);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        FeeAccount fa = new FeeAccount();\n        fa.withdraw(100.0);\n    }\n}",
      "output": "$2 transaction fee applied\nWithdrawn: $102.0 | Balance: $398.0",
      "explanation": "FeeAccount uses super.withdraw() to perform the balance deduction while factoring in fees."
    },
    {
      "id": "inh-ex31",
      "title": "Disambiguating Shadowed Variable with super.speed",
      "difficulty": "Easy",
      "problemStatement": "Create parent `Vehicle` with `int maxSpeed = 120;`. Create child `SportsCar` with `int maxSpeed = 260;`. In `SportsCar`, write method `compareSpeeds()` that prints `\"Standard max: \" + super.maxSpeed + \" | Sports max: \" + this.maxSpeed`. In `main()`, call `compareSpeeds()`.",
      "hint": "Use super.maxSpeed for parent value and this.maxSpeed for child value.",
      "solutionCode": "class Vehicle {\n    int maxSpeed = 120;\n}\n\nclass SportsCar extends Vehicle {\n    int maxSpeed = 260;\n\n    void compareSpeeds() {\n        System.out.println(\"Standard max: \" + super.maxSpeed + \" | Sports max: \" + this.maxSpeed);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new SportsCar().compareSpeeds();\n    }\n}",
      "output": "Standard max: 120 | Sports max: 260",
      "explanation": "super.maxSpeed reaches the shadowed variable in Vehicle."
    },
    {
      "id": "inh-ex32",
      "title": "Document Watermarking using super.print()",
      "difficulty": "Medium",
      "problemStatement": "Create parent `Document` with `void print(String content)` printing `\"Content: \" + content`. Create child `WatermarkedDocument` that overrides `print(String content)`: it first prints `\"[CONFIDENTIAL WATERMARK]\"` and then calls `super.print(content)`. In `main()`, print `\"Annual Report 2026\"`.",
      "hint": "Call super.print(content) after printing the watermark header.",
      "solutionCode": "class Document {\n    void print(String content) {\n        System.out.println(\"Content: \" + content);\n    }\n}\n\nclass WatermarkedDocument extends Document {\n    @Override\n    void print(String content) {\n        System.out.println(\"[CONFIDENTIAL WATERMARK]\");\n        super.print(content);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        WatermarkedDocument doc = new WatermarkedDocument();\n        doc.print(\"Annual Report 2026\");\n    }\n}",
      "output": "[CONFIDENTIAL WATERMARK]\nContent: Annual Report 2026",
      "explanation": "WatermarkedDocument augments parent printing with a security banner."
    },
    {
      "id": "inh-ex33",
      "title": "Game Score Bonus Augmentation",
      "difficulty": "Medium",
      "problemStatement": "Create parent `Score` with `int points = 0;` and `void addPoints(int p)` that adds `p` to `points`. Create child `MultiplierScore` with `int multiplier = 2;`. Override `addPoints(int p)` to call `super.addPoints(p * multiplier)`. In `main()`, add 50 points to MultiplierScore and print `points`.",
      "hint": "Multiply p by multiplier before passing into super.addPoints().",
      "solutionCode": "class Score {\n    int points = 0;\n    void addPoints(int p) {\n        points += p;\n    }\n}\n\nclass MultiplierScore extends Score {\n    int multiplier = 2;\n    @Override\n    void addPoints(int p) {\n        super.addPoints(p * multiplier);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        MultiplierScore ms = new MultiplierScore();\n        ms.addPoints(50);\n        System.out.println(\"Final Points: \" + ms.points);\n    }\n}",
      "output": "Final Points: 100",
      "explanation": "MultiplierScore doubles points before delegating to Score.addPoints()."
    },
    {
      "id": "inh-ex34",
      "title": "Shadowed Dimension in 3D Shapes",
      "difficulty": "Medium",
      "problemStatement": "Create class `Shape2D` with `double dimension = 5.0;`. Create child `Shape3D` with `double dimension = 10.0;`. In `Shape3D`, write method `printDimensions()` that prints `\"2D: \" + super.dimension + \" | 3D: \" + this.dimension`. In `main()`, invoke `printDimensions()`.",
      "hint": "super.dimension accesses Shape2D's dimension.",
      "solutionCode": "class Shape2D {\n    double dimension = 5.0;\n}\n\nclass Shape3D extends Shape2D {\n    double dimension = 10.0;\n\n    void printDimensions() {\n        System.out.println(\"2D: \" + super.dimension + \" | 3D: \" + this.dimension);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new Shape3D().printDimensions();\n    }\n}",
      "output": "2D: 5.0 | 3D: 10.0",
      "explanation": "Resolves shadowed dimension variable between parent and child."
    },
    {
      "id": "inh-ex35",
      "title": "Order Processing with Audit Logging",
      "difficulty": "Medium",
      "problemStatement": "Create parent `OrderService` with method `void process(int orderId)` printing `\"Processing order #\" + orderId`. Create child `AuditedOrderService` that overrides `process(int orderId)`: it prints `\"[AUDIT START] Order \" + orderId`, calls `super.process(orderId)`, and prints `\"[AUDIT END] Order \" + orderId + \" completed\"`. Test in `main()` with order `99`.",
      "hint": "Wrap super.process() with audit statements.",
      "solutionCode": "class OrderService {\n    void process(int orderId) {\n        System.out.println(\"Processing order #\" + orderId);\n    }\n}\n\nclass AuditedOrderService extends OrderService {\n    @Override\n    void process(int orderId) {\n        System.out.println(\"[AUDIT START] Order \" + orderId);\n        super.process(orderId);\n        System.out.println(\"[AUDIT END] Order \" + orderId + \" completed\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new AuditedOrderService().process(99);\n    }\n}",
      "output": "[AUDIT START] Order 99\nProcessing order #99\n[AUDIT END] Order 99 completed",
      "explanation": "Demonstrates the decorator-like pattern using super.method() for logging."
    }
  ],
  "final-keyword-in-oop": [
    {
      "id": "inh-ex36",
      "title": "Securing Critical Method with final",
      "difficulty": "Easy",
      "problemStatement": "Create class `BankAccount` with method `final void generateLegalStatement()` that prints `\"Legal Statement: FDIC Insured\"` and a normal method `void sendNotice()` printing `\"Notice sent by mail\"`. Create child `CheckingAccount extends BankAccount` that overrides `sendNotice()` to print `\"Notice sent by SMS\"`. In `main()`, call both methods on a CheckingAccount.",
      "hint": "generateLegalStatement() cannot be overridden because it is final. sendNotice() can be overridden.",
      "solutionCode": "class BankAccount {\n    final void generateLegalStatement() {\n        System.out.println(\"Legal Statement: FDIC Insured\");\n    }\n    void sendNotice() {\n        System.out.println(\"Notice sent by mail\");\n    }\n}\n\nclass CheckingAccount extends BankAccount {\n    @Override\n    void sendNotice() {\n        System.out.println(\"Notice sent by SMS\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        CheckingAccount ca = new CheckingAccount();\n        ca.generateLegalStatement();\n        ca.sendNotice();\n    }\n}",
      "output": "Legal Statement: FDIC Insured\nNotice sent by SMS",
      "explanation": "CheckingAccount inherits the final method unchanged and overrides the non-final method."
    },
    {
      "id": "inh-ex37",
      "title": "Standalone Utility final Class",
      "difficulty": "Easy",
      "problemStatement": "Create a `final class TaxCalculator` with static method `double calculateTax(double amount)` that returns `amount * 0.18`. In `main()`, compute tax on `500.0` and print `\"Tax: $\" + TaxCalculator.calculateTax(500.0)`. Explain why making TaxCalculator final is good design.",
      "hint": "Declare `final class TaxCalculator { ... }`.",
      "solutionCode": "final class TaxCalculator {\n    public static double calculateTax(double amount) {\n        return amount * 0.18;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Tax: $\" + TaxCalculator.calculateTax(500.0));\n    }\n}",
      "output": "Tax: $90.0",
      "explanation": "Making utility classes final prevents subclasses from extending them and altering tax calculations."
    },
    {
      "id": "inh-ex38",
      "title": "Final Physical Constants",
      "difficulty": "Easy",
      "problemStatement": "Create class `PhysicsConstants` with `public static final double GRAVITY = 9.8;` and `public static final double SPEED_OF_LIGHT = 299792458.0;`. In `main()`, print both constants formatted clearly.",
      "hint": "Use public static final for constants in Java.",
      "solutionCode": "class PhysicsConstants {\n    public static final double GRAVITY = 9.8;\n    public static final double SPEED_OF_LIGHT = 299792458.0;\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Gravity: \" + PhysicsConstants.GRAVITY + \" m/s^2\");\n        System.out.println(\"Speed of Light: \" + PhysicsConstants.SPEED_OF_LIGHT + \" m/s\");\n    }\n}",
      "output": "Gravity: 9.8 m/s^2\nSpeed of Light: 2.99792458E8 m/s",
      "explanation": "Constants marked final cannot be reassigned once initialized."
    },
    {
      "id": "inh-ex39",
      "title": "Security Gate with final Authentication Verification",
      "difficulty": "Medium",
      "problemStatement": "Create parent `SecurityGate` with `final boolean verifyKey(String key)` returning `key.equals(\"ACCESS_2026\")`. Add non-final method `void openGate()` printing `\"Standard gate swinging open\"`. Create child `SpeedGate extends SecurityGate` that overrides `openGate()` to print `\"High-speed glass barrier retracting\"`. In `main()`, verify key `\"ACCESS_2026\"` on SpeedGate and open the gate if true.",
      "hint": "verifyKey() is final and cannot be bypassed by SpeedGate.",
      "solutionCode": "class SecurityGate {\n    final boolean verifyKey(String key) {\n        return key.equals(\"ACCESS_2026\");\n    }\n    void openGate() {\n        System.out.println(\"Standard gate swinging open\");\n    }\n}\n\nclass SpeedGate extends SecurityGate {\n    @Override\n    void openGate() {\n        System.out.println(\"High-speed glass barrier retracting\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        SpeedGate gate = new SpeedGate();\n        if (gate.verifyKey(\"ACCESS_2026\")) {\n            gate.openGate();\n        }\n    }\n}",
      "output": "High-speed glass barrier retracting",
      "explanation": "verifyKey() enforces critical security invariants that child classes cannot tamper with."
    },
    {
      "id": "inh-ex40",
      "title": "Software License Validator with Locked Algorithm",
      "difficulty": "Medium",
      "problemStatement": "Create class `LicenseValidator` with a `final boolean isValid(String licenseKey)` method that checks if key starts with `\"LIC-\"` and length is 10. Add extensible method `String getTier()` returning `\"Standard Tier\"`. Create child `EnterpriseValidator` overriding `getTier()` to return `\"Enterprise Tier\"`. In `main()`, test key `\"LIC-123456\"`.",
      "hint": "Use licenseKey.startsWith(\"LIC-\") && licenseKey.length() == 10.",
      "solutionCode": "class LicenseValidator {\n    final boolean isValid(String licenseKey) {\n        return licenseKey.startsWith(\"LIC-\") && licenseKey.length() == 10;\n    }\n    String getTier() {\n        return \"Standard Tier\";\n    }\n}\n\nclass EnterpriseValidator extends LicenseValidator {\n    @Override\n    String getTier() {\n        return \"Enterprise Tier\";\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        EnterpriseValidator ev = new EnterpriseValidator();\n        System.out.println(\"Key valid: \" + ev.isValid(\"LIC-123456\"));\n        System.out.println(\"Tier: \" + ev.getTier());\n    }\n}",
      "output": "Key valid: true\nTier: Enterprise Tier",
      "explanation": "isValid() ensures validation logic is locked, while getTier() can be specialized."
    },
    {
      "id": "inh-ex41",
      "title": "Payment Gateway with final Encryption Checksum",
      "difficulty": "Medium",
      "problemStatement": "Create `PaymentGateway` with `final String createChecksum(int orderId)` returning `\"HASH_\" + (orderId * 31)`. Add non-final method `void execute(int orderId)` printing `\"Executing payment with checksum: \" + createChecksum(orderId)`. Create child `CryptoPaymentGateway` that overrides `execute(int orderId)` to print `\"[Crypto Network] Checksum: \" + createChecksum(orderId)`. Test in `main()` with order `100`.",
      "hint": "Child can call createChecksum(orderId), but cannot override it.",
      "solutionCode": "class PaymentGateway {\n    final String createChecksum(int orderId) {\n        return \"HASH_\" + (orderId * 31);\n    }\n    void execute(int orderId) {\n        System.out.println(\"Executing payment with checksum: \" + createChecksum(orderId));\n    }\n}\n\nclass CryptoPaymentGateway extends PaymentGateway {\n    @Override\n    void execute(int orderId) {\n        System.out.println(\"[Crypto Network] Checksum: \" + createChecksum(orderId));\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        CryptoPaymentGateway cpg = new CryptoPaymentGateway();\n        cpg.execute(100);\n    }\n}",
      "output": "[Crypto Network] Checksum: HASH_3100",
      "explanation": "createChecksum is locked via final to prevent tampering across gateways."
    },
    {
      "id": "inh-ex42",
      "title": "Final Reference Variable vs Object Mutation",
      "difficulty": "Medium",
      "problemStatement": "Create class `Counter` with `int count = 0;`. In `main()`, declare `final Counter c = new Counter();`. Increment `c.count` twice. Then explain why `c.count = 2;` is allowed, but `c = new Counter();` would cause a compilation error.",
      "hint": "final on an object reference locks the pointer address, not the internal fields.",
      "solutionCode": "class Counter {\n    int count = 0;\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        final Counter c = new Counter();\n        c.count++;\n        c.count++;\n        System.out.println(\"Count: \" + c.count);\n        // c = new Counter(); // COMPILE ERROR: cannot assign value to final variable c\n    }\n}",
      "output": "Count: 2",
      "explanation": "final on reference variable c prevents reassigning c to another object. The internal state count remains mutable."
    }
  ],
  "inheritance-challenge": [
    {
      "id": "inh-ch01",
      "title": "Level 1: Library Media Catalog Hierarchy",
      "difficulty": "Easy",
      "problemStatement": "Create a base class `LibraryItem` with `id` (int), `title` (String), and method `displayItem()`. Extend it with `BookItem` adding `author` (String) and `pageCount` (int), calling `super(id, title)`. In `main()`, instantiate a BookItem (`101`, `\"Java Basics\"`, `\"James Gosling\"`, `350`) and print all details.",
      "hint": "Pass id and title to super(id, title) in BookItem's constructor.",
      "solutionCode": "class LibraryItem {\n    int id;\n    String title;\n    LibraryItem(int id, String title) {\n        this.id = id;\n        this.title = title;\n    }\n    void displayItem() {\n        System.out.println(\"ID: \" + id + \" | Title: \" + title);\n    }\n}\n\nclass BookItem extends LibraryItem {\n    String author;\n    int pageCount;\n    BookItem(int id, String title, String author, int pageCount) {\n        super(id, title);\n        this.author = author;\n        this.pageCount = pageCount;\n    }\n    void displayBook() {\n        displayItem();\n        System.out.println(\"Author: \" + author + \" | Pages: \" + pageCount);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        BookItem book = new BookItem(101, \"Java Basics\", \"James Gosling\", 350);\n        book.displayBook();\n    }\n}",
      "output": "ID: 101 | Title: Java Basics\nAuthor: James Gosling | Pages: 350",
      "explanation": "Establishes clean single inheritance with proper constructor delegation."
    },
    {
      "id": "inh-ch02",
      "title": "Level 2: Multilevel Architectural Property Hierarchy",
      "difficulty": "Easy",
      "problemStatement": "Model a 3-level property hierarchy: `Property` (field `address`), `ResidentialProperty extends Property` (field `int bedrooms`), and `LuxuryPenthouse extends ResidentialProperty` (field `boolean hasPool`). In `LuxuryPenthouse`, write `printFeatures()` displaying address, bedrooms, and pool status. In `main()`, instantiate a penthouse at `\"100 Marine Drive\"` with 4 bedrooms and pool=true.",
      "hint": "Multilevel constructor chaining: Property -> ResidentialProperty -> LuxuryPenthouse.",
      "solutionCode": "class Property {\n    String address;\n    Property(String address) {\n        this.address = address;\n    }\n}\n\nclass ResidentialProperty extends Property {\n    int bedrooms;\n    ResidentialProperty(String address, int bedrooms) {\n        super(address);\n        this.bedrooms = bedrooms;\n    }\n}\n\nclass LuxuryPenthouse extends ResidentialProperty {\n    boolean hasPool;\n    LuxuryPenthouse(String address, int bedrooms, boolean hasPool) {\n        super(address, bedrooms);\n        this.hasPool = hasPool;\n    }\n    void printFeatures() {\n        System.out.println(\"Address: \" + address + \" | Bedrooms: \" + bedrooms + \" | Pool: \" + hasPool);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        LuxuryPenthouse lp = new LuxuryPenthouse(\"100 Marine Drive\", 4, true);\n        lp.printFeatures();\n    }\n}",
      "output": "Address: 100 Marine Drive | Bedrooms: 4 | Pool: true",
      "explanation": "Constructors cascade state up to Property and allow LuxuryPenthouse to display complete information."
    },
    {
      "id": "inh-ch03",
      "title": "Level 3: Hospital Medical Staff System with super()",
      "difficulty": "Easy",
      "problemStatement": "Create `Person` with `name` and `age`. Create `Doctor extends Person` with `String specialization` and `double consultationFee`. Initialize all fields through constructors using `super(name, age)`. Add method `printDoctorInfo()` printing `\"Dr. \" + name + \" (\" + age + \" yrs) - \" + specialization + \" | Fee: $\" + consultationFee`. In `main()`, create Dr. `\"Sarah\"`, age 40, specialization `\"Cardiology\"`, fee `$150.0`.",
      "hint": "super(name, age) handles Person initialization.",
      "solutionCode": "class Person {\n    String name;\n    int age;\n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}\n\nclass Doctor extends Person {\n    String specialization;\n    double consultationFee;\n    Doctor(String name, int age, String specialization, double consultationFee) {\n        super(name, age);\n        this.specialization = specialization;\n        this.consultationFee = consultationFee;\n    }\n    void printDoctorInfo() {\n        System.out.println(\"Dr. \" + name + \" (\" + age + \" yrs) - \" + specialization + \" | Fee: $\" + consultationFee);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Doctor doc = new Doctor(\"Sarah\", 40, \"Cardiology\", 150.0);\n        doc.printDoctorInfo();\n    }\n}",
      "output": "Dr. Sarah (40 yrs) - Cardiology | Fee: $150.0",
      "explanation": "Demonstrates parameterized super() constructor invocation."
    },
    {
      "id": "inh-ch04",
      "title": "Level 4: Transport Fleet Fuel Efficiency with @Override",
      "difficulty": "Medium",
      "problemStatement": "Create base `Vehicle` with `double computeRange(double fuelLiters)` returning `fuelLiters * 15.0`. Create child `Truck` overriding `computeRange` to return `fuelLiters * 8.0`. Create child `HybridCar` overriding `computeRange` to return `fuelLiters * 28.0`. In `main()`, print range for 50 liters on both Truck and HybridCar.",
      "hint": "Truck and HybridCar override the fuel consumption calculation formula.",
      "solutionCode": "class Vehicle {\n    double computeRange(double fuelLiters) {\n        return fuelLiters * 15.0;\n    }\n}\n\nclass Truck extends Vehicle {\n    @Override\n    double computeRange(double fuelLiters) {\n        return fuelLiters * 8.0;\n    }\n}\n\nclass HybridCar extends Vehicle {\n    @Override\n    double computeRange(double fuelLiters) {\n        return fuelLiters * 28.0;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Truck truck = new Truck();\n        HybridCar hybrid = new HybridCar();\n        System.out.println(\"Truck range on 50L: \" + truck.computeRange(50.0) + \" km\");\n        System.out.println(\"Hybrid range on 50L: \" + hybrid.computeRange(50.0) + \" km\");\n    }\n}",
      "output": "Truck range on 50L: 400.0 km\nHybrid range on 50L: 1400.0 km",
      "explanation": "Each vehicle category models its unique fuel consumption via method overriding."
    },
    {
      "id": "inh-ch05",
      "title": "Level 5: Bank Transaction Pipeline with super.process()",
      "difficulty": "Medium",
      "problemStatement": "Create `Transaction` with `void process(double amount)` printing `\"Base Transaction: Deducting $\" + amount`. Create child `InternationalTransaction` that overrides `process(double amount)`: it adds a $15 foreign exchange fee, prints `\"FX Fee applied: $15.0\"`, and calls `super.process(amount + 15.0)`. In `main()`, execute international transaction for `$200.0`.",
      "hint": "Call super.process(amount + 15.0).",
      "solutionCode": "class Transaction {\n    void process(double amount) {\n        System.out.println(\"Base Transaction: Deducting $\" + amount);\n    }\n}\n\nclass InternationalTransaction extends Transaction {\n    @Override\n    void process(double amount) {\n        System.out.println(\"FX Fee applied: $15.0\");\n        super.process(amount + 15.0);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        InternationalTransaction it = new InternationalTransaction();\n        it.process(200.0);\n    }\n}",
      "output": "FX Fee applied: $15.0\nBase Transaction: Deducting $215.0",
      "explanation": "InternationalTransaction augments parent transaction processing with exchange fees."
    },
    {
      "id": "inh-ch06",
      "title": "Level 6: Vector Disambiguation with super.var",
      "difficulty": "Medium",
      "problemStatement": "Create parent `Vector2D` with `double magnitude = 10.0;`. Create child `Vector3D` with `double magnitude = 17.3;`. In `Vector3D`, write method `printMagnitudes()` printing `\"2D Magnitude: \" + super.magnitude + \" | 3D Magnitude: \" + this.magnitude`. In `main()`, test this method.",
      "hint": "super.magnitude reaches Vector2D's field.",
      "solutionCode": "class Vector2D {\n    double magnitude = 10.0;\n}\n\nclass Vector3D extends Vector2D {\n    double magnitude = 17.3;\n\n    void printMagnitudes() {\n        System.out.println(\"2D Magnitude: \" + super.magnitude + \" | 3D Magnitude: \" + this.magnitude);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        new Vector3D().printMagnitudes();\n    }\n}",
      "output": "2D Magnitude: 10.0 | 3D Magnitude: 17.3",
      "explanation": "Demonstrates how super disambiguates shadowed member fields."
    },
    {
      "id": "inh-ch07",
      "title": "Level 7: Security Vault Access with final Invariants",
      "difficulty": "Medium",
      "problemStatement": "Create class `Vault` with `final boolean checkPin(int pin)` returning `pin == 9876` and a non-final method `void openDoor()` printing `\"Standard mechanical vault opened\"`. Create child `BioMetricVault` that overrides `openDoor()` to print `\"Retina scan passed, titanium vault opened\"`. In `main()`, authenticate with pin 9876 on BioMetricVault and open the door.",
      "hint": "checkPin is final to prevent child classes from relaxing PIN security checks.",
      "solutionCode": "class Vault {\n    final boolean checkPin(int pin) {\n        return pin == 9876;\n    }\n    void openDoor() {\n        System.out.println(\"Standard mechanical vault opened\");\n    }\n}\n\nclass BioMetricVault extends Vault {\n    @Override\n    void openDoor() {\n        System.out.println(\"Retina scan passed, titanium vault opened\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        BioMetricVault vault = new BioMetricVault();\n        if (vault.checkPin(9876)) {\n            vault.openDoor();\n        }\n    }\n}",
      "output": "Retina scan passed, titanium vault opened",
      "explanation": "The final method protects PIN validation from being overridden."
    },
    {
      "id": "inh-ch08",
      "title": "Level 8: Private Fields & Encapsulated Inheritance",
      "difficulty": "Hard",
      "problemStatement": "Create class `Vehicle` with private fields `String vin` and `double basePrice`. Provide constructor `Vehicle(String vin, double basePrice)` and public getters. Create child `ElectricVehicle` extending `Vehicle` with private field `double batterySubsidy`. Add method `double calculateCustomerPrice()` that computes `getBasePrice() - batterySubsidy`. In `main()`, instantiate an ElectricVehicle with vin `\"EV-88\"`, basePrice `45000.0`, subsidy `7500.0`, and print customer price.",
      "hint": "Child cannot read `basePrice` directly; it must call the inherited `getBasePrice()` getter method.",
      "solutionCode": "class Vehicle {\n    private String vin;\n    private double basePrice;\n\n    Vehicle(String vin, double basePrice) {\n        this.vin = vin;\n        this.basePrice = basePrice;\n    }\n    public String getVin() { return vin; }\n    public double getBasePrice() { return basePrice; }\n}\n\nclass ElectricVehicle extends Vehicle {\n    private double batterySubsidy;\n\n    ElectricVehicle(String vin, double basePrice, double batterySubsidy) {\n        super(vin, basePrice);\n        this.batterySubsidy = batterySubsidy;\n    }\n    double calculateCustomerPrice() {\n        return getBasePrice() - batterySubsidy;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        ElectricVehicle ev = new ElectricVehicle(\"EV-88\", 45000.0, 7500.0);\n        System.out.println(\"VIN: \" + ev.getVin() + \" | Final Price: $\" + ev.calculateCustomerPrice());\n    }\n}",
      "output": "VIN: EV-88 | Final Price: $37500.0",
      "explanation": "Demonstrates proper encapsulation where child classes access private parent fields via public accessors."
    },
    {
      "id": "inh-ch09",
      "title": "Level 9: Bug Fixer Challenge: Repairing Inheritance Compilation Errors",
      "difficulty": "Hard",
      "problemStatement": "Fix the compilation errors in this code:\n1. Base has constructor `Base(int x)` with no default constructor.\n2. Child constructor attempts to put `System.out.println` before `super(x)`.\n3. Base has `public void run()`, but Child has `void run()` (visibility reduction).\nWrite the corrected program and verify it prints `\"Ready\"` followed by `\"Child running\"`.",
      "hint": "Move super(x) to line 1 of Child constructor, and add `public` to Child's `run()` method.",
      "solutionCode": "class Base {\n    int x;\n    Base(int x) {\n        this.x = x;\n    }\n    public void run() {\n        System.out.println(\"Base running\");\n    }\n}\n\nclass Child extends Base {\n    Child(int x) {\n        super(x); // MUST be first statement\n        System.out.println(\"Ready\");\n    }\n    @Override\n    public void run() { // MUST remain public\n        System.out.println(\"Child running\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Child c = new Child(10);\n        c.run();\n    }\n}",
      "output": "Ready\nChild running",
      "explanation": "Corrects the two most common inheritance errors: constructor call order and visibility reduction."
    },
    {
      "id": "inh-ch10",
      "title": "Level 10: Capstone Enterprise E-Commerce Hierarchy",
      "difficulty": "Hard",
      "problemStatement": "Design a complete e-commerce hierarchy:\n1. Base class `Order`: private `String orderId`, protected `double totalAmount`. Constructor `Order(orderId, totalAmount)`, `final void printInvoiceHeader()` printing `\"=== INVOICE: \" + orderId + \" ===\"`, and method `double calculateFinalPayable()` returning `totalAmount`.\n2. Subclass `OnlineOrder extends Order`: adds `double deliveryFee`. Overrides `calculateFinalPayable()` to return `super.calculateFinalPayable() + deliveryFee`.\n3. Subclass `ExpressOnlineOrder extends OnlineOrder`: adds `double expressHandlingFee`. Overrides `calculateFinalPayable()` to return `super.calculateFinalPayable() + expressHandlingFee`.\nIn `main()`, create an ExpressOnlineOrder for orderId `\"ORD-999\"`, totalAmount `250.0`, deliveryFee `15.0`, expressFee `20.0`. Print invoice header and final payable.",
      "hint": "Chained super.calculateFinalPayable() calls build up the total dynamically ($250 + $15 + $20 = $285).",
      "solutionCode": "class Order {\n    private String orderId;\n    protected double totalAmount;\n\n    Order(String orderId, double totalAmount) {\n        this.orderId = orderId;\n        this.totalAmount = totalAmount;\n    }\n    final void printInvoiceHeader() {\n        System.out.println(\"=== INVOICE: \" + orderId + \" ===\");\n    }\n    double calculateFinalPayable() {\n        return totalAmount;\n    }\n}\n\nclass OnlineOrder extends Order {\n    protected double deliveryFee;\n\n    OnlineOrder(String orderId, double totalAmount, double deliveryFee) {\n        super(orderId, totalAmount);\n        this.deliveryFee = deliveryFee;\n    }\n    @Override\n    double calculateFinalPayable() {\n        return super.calculateFinalPayable() + deliveryFee;\n    }\n}\n\nclass ExpressOnlineOrder extends OnlineOrder {\n    private double expressHandlingFee;\n\n    ExpressOnlineOrder(String orderId, double totalAmount, double deliveryFee, double expressHandlingFee) {\n        super(orderId, totalAmount, deliveryFee);\n        this.expressHandlingFee = expressHandlingFee;\n    }\n    @Override\n    double calculateFinalPayable() {\n        return super.calculateFinalPayable() + expressHandlingFee;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        ExpressOnlineOrder order = new ExpressOnlineOrder(\"ORD-999\", 250.0, 15.0, 20.0);\n        order.printInvoiceHeader();\n        System.out.println(\"Final Payable: $\" + order.calculateFinalPayable());\n    }\n}",
      "output": "=== INVOICE: ORD-999 ===\nFinal Payable: $285.0",
      "explanation": "Combines multilevel inheritance, constructor chaining, super.method() augmentation, and final security locks into an enterprise architecture."
    }
  ],
  "extends-and-is-a": [
    {
      "id": "inh-ex01",
      "title": "Vehicle Base Class & Car Extension",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Vehicle` with variables `brand` (String) and `speed` (int), and a method `drive()` that prints `\"Vehicle is driving at \" + speed + \" km/h\"`. Then create a child class `Car` that extends `Vehicle` and adds `int doors = 4;` and a method `displayDoors()` printing `\"Number of doors: \" + doors`. In `main()`, instantiate a `Car`, set `brand = \"Toyota\"` and `speed = 100`, then call both `drive()` and `displayDoors()`.",
      "hint": "Use `class Car extends Vehicle`. Notice how `Car` can access `brand` and `speed` directly because it inherits them.",
      "solutionCode": "class Vehicle {\n    String brand;\n    int speed;\n\n    void drive() {\n        System.out.println(\"Vehicle is driving at \" + speed + \" km/h\");\n    }\n}\n\nclass Car extends Vehicle {\n    int doors = 4;\n\n    void displayDoors() {\n        System.out.println(\"Number of doors: \" + doors);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.brand = \"Toyota\";\n        car.speed = 100;\n        car.drive();\n        car.displayDoors();\n    }\n}",
      "output": "Vehicle is driving at 100 km/h\nNumber of doors: 4",
      "explanation": "Car extends Vehicle. A Car object contains both the inherited Vehicle fields (brand, speed) and its own doors field."
    },
    {
      "id": "inh-ex02",
      "title": "Employee & Manager Salary Specialization",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Employee` with fields `name` (String) and `baseSalary` (double), and a method `displayBase()` that prints `name + \" Base Salary: $\" + baseSalary`. Create a child class `Manager` that extends `Employee` with an additional field `bonus` (double) and a method `displayTotal()` that prints `name + \" Total: $\" + (baseSalary + bonus)`. In `main()`, create a `Manager` named `\"Alice\"` with base salary `60000.0` and bonus `12000.0`, then call both methods.",
      "hint": "Manager inherits `name` and `baseSalary` from Employee and adds its own `bonus` field.",
      "solutionCode": "class Employee {\n    String name;\n    double baseSalary;\n\n    void displayBase() {\n        System.out.println(name + \" Base Salary: $\" + baseSalary);\n    }\n}\n\nclass Manager extends Employee {\n    double bonus;\n\n    void displayTotal() {\n        System.out.println(name + \" Total: $\" + (baseSalary + bonus));\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Manager mgr = new Manager();\n        mgr.name = \"Alice\";\n        mgr.baseSalary = 60000.0;\n        mgr.bonus = 12000.0;\n        mgr.displayBase();\n        mgr.displayTotal();\n    }\n}",
      "output": "Alice Base Salary: $60000.0\nAlice Total: $72000.0",
      "explanation": "Manager specializes Employee by adding a bonus field. It computes total salary using both inherited and child fields."
    },
    {
      "id": "inh-ex03",
      "title": "Geometric Shape & Rectangle Derivation",
      "difficulty": "Easy",
      "problemStatement": "Create a parent class `Shape` with a field `color` (String) and a method `printColor()` printing `\"Color: \" + color`. Create a child class `Rectangle` extending `Shape` with fields `double width` and `double height`. Add methods `double getArea()` returning `width * height` and `double getPerimeter()` returning `2 * (width + height)`. In `main()`, create a blue rectangle of dimensions 6.0 x 4.0 and print its color, area, and perimeter.",
      "hint": "Rectangle inherits `color` and adds `width` and `height`.",
      "solutionCode": "class Shape {\n    String color;\n\n    void printColor() {\n        System.out.println(\"Color: \" + color);\n    }\n}\n\nclass Rectangle extends Shape {\n    double width;\n    double height;\n\n    double getArea() {\n        return width * height;\n    }\n\n    double getPerimeter() {\n        return 2 * (width + height);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Rectangle rect = new Rectangle();\n        rect.color = \"Blue\";\n        rect.width = 6.0;\n        rect.height = 4.0;\n        rect.printColor();\n        System.out.println(\"Area: \" + rect.getArea());\n        System.out.println(\"Perimeter: \" + rect.getPerimeter());\n    }\n}",
      "output": "Color: Blue\nArea: 24.0\nPerimeter: 20.0",
      "explanation": "Rectangle establishes an IS-A relationship with Shape, inheriting printColor() and adding area and perimeter calculations."
    },
    {
      "id": "inh-ex04",
      "title": "Animal & Dog Method Inheritance",
      "difficulty": "Easy",
      "problemStatement": "Create an `Animal` parent class with methods `eat()` printing `\"Eating food\"` and `sleep()` printing `\"Sleeping soundly\"`. Create child class `Dog` extending `Animal` with method `bark()` printing `\"Barking loudly\"`. In `main()`, create a `Dog` and call `eat()`, `sleep()`, and `bark()` in order.",
      "hint": "Dog inherits both eat() and sleep() from Animal without needing to rewrite them.",
      "solutionCode": "class Animal {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping soundly\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Barking loudly\");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog dog = new Dog();\n        dog.eat();\n        dog.sleep();\n        dog.bark();\n    }\n}",
      "output": "Eating food\nSleeping soundly\nBarking loudly",
      "explanation": "Dog inherits eat() and sleep() from Animal and defines its own bark() method."
    },
    {
      "id": "inh-ex05",
      "title": "Book Catalog & Academic Textbook",
      "difficulty": "Easy",
      "problemStatement": "Create class `Book` with `title` (String) and `author` (String). Create child class `Textbook` extending `Book` with `subject` (String). In `Textbook`, write method `displayInfo()` that prints `\"[Textbook] Title: \" + title + \", Author: \" + author + \", Subject: \" + subject`. In `main()`, instantiate a `Textbook` with title `\"Physics Fundamentals\"`, author `\"Dr. Hall\"`, subject `\"Science\"`, and call `displayInfo()`.",
      "hint": "Textbook can directly access title and author declared in Book.",
      "solutionCode": "class Book {\n    String title;\n    String author;\n}\n\nclass Textbook extends Book {\n    String subject;\n\n    void displayInfo() {\n        System.out.println(\"[Textbook] Title: \" + title + \", Author: \" + author + \", Subject: \" + subject);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Textbook tb = new Textbook();\n        tb.title = \"Physics Fundamentals\";\n        tb.author = \"Dr. Hall\";\n        tb.subject = \"Science\";\n        tb.displayInfo();\n    }\n}",
      "output": "[Textbook] Title: Physics Fundamentals, Author: Dr. Hall, Subject: Science",
      "explanation": "Textbook inherits book metadata (title, author) and adds subject classification."
    },
    {
      "id": "inh-ex06",
      "title": "Electronic Device & Smartphone Features",
      "difficulty": "Easy",
      "problemStatement": "Create class `Device` with `brand` (String) and `powerOn()` printing `brand + \" powered on\"`. Create child class `Phone` extending `Device` with method `makeCall(String number)` printing `\"Calling \" + number + \" from \" + brand`. In `main()`, create a `Phone` with brand `\"Samsung\"`, call `powerOn()`, and call `makeCall(\"9876543210\")`.",
      "hint": "Phone inherits brand and powerOn() from Device.",
      "solutionCode": "class Device {\n    String brand;\n\n    void powerOn() {\n        System.out.println(brand + \" powered on\");\n    }\n}\n\nclass Phone extends Device {\n    void makeCall(String number) {\n        System.out.println(\"Calling \" + number + \" from \" + brand);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Phone p = new Phone();\n        p.brand = \"Samsung\";\n        p.powerOn();\n        p.makeCall(\"9876543210\");\n    }\n}",
      "output": "Samsung powered on\nCalling 9876543210 from Samsung",
      "explanation": "Phone is a specialization of Device that can perform communication actions."
    },
    {
      "id": "inh-ex07",
      "title": "Basic BankAccount & Savings Interest",
      "difficulty": "Easy",
      "problemStatement": "Create class `BankAccount` with `accountNumber` (String) and `balance` (double). Add method `deposit(double amt)` that adds `amt` to `balance`. Create child class `SavingsAccount` extending `BankAccount` with `double interestRate = 0.04;` and method `addInterest()` that computes `balance * interestRate` and adds it to `balance`. In `main()`, create a `SavingsAccount`, deposit `1000.0`, call `addInterest()`, and print `\"Final Balance: $\" + account.balance`.",
      "hint": "addInterest() multiplies current balance by interestRate and adds the result to balance.",
      "solutionCode": "class BankAccount {\n    String accountNumber;\n    double balance;\n\n    void deposit(double amt) {\n        balance += amt;\n    }\n}\n\nclass SavingsAccount extends BankAccount {\n    double interestRate = 0.04;\n\n    void addInterest() {\n        double interest = balance * interestRate;\n        balance += interest;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount();\n        sa.accountNumber = \"ACC-101\";\n        sa.deposit(1000.0);\n        sa.addInterest();\n        System.out.println(\"Final Balance: $\" + sa.balance);\n    }\n}",
      "output": "Final Balance: $1040.0",
      "explanation": "SavingsAccount directly modifies inherited balance through addInterest()."
    }
  ]
};
