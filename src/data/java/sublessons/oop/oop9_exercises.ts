import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 9: OOP FUNDAMENTALS - PROGRAMMING EXERCISES
// Total: 80 exercises (10 per sub-lesson across all 8 sub-lessons)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const oop9Exercises: Record<string, ProgrammingExercise[]> = {
  "why-oop-fundamentals": [
    {
      "id": "ex-oop9-why-1",
      "title": "Refactoring Parallel Arrays to an OOP Class",
      "problemStatement": "In procedural programming, related data is stored in parallel arrays (e.g. `String[] names`, `int[] rolls`, `double[] marks`). Refactor this into an OOP `Student` class with fields `name`, `rollNo`, and `marks`, and a method `display()`. In `main()`, instantiate two students and display them.",
      "hint": "Declare class Student with the 3 fields and a void display() method. In main(), create instances and assign fields.",
      "solutionCode": "public class Solution {\n    static class Student {\n        String name;\n        int rollNo;\n        double marks;\n\n        void display() {\n            System.out.println(\"Roll: \" + rollNo + \" | Name: \" + name + \" | Marks: \" + marks);\n        }\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.name = \"Alice\"; s1.rollNo = 101; s1.marks = 92.5;\n        Student s2 = new Student();\n        s2.name = \"Bob\"; s2.rollNo = 102; s2.marks = 88.0;\n\n        s1.display();\n        s2.display();\n    }\n}",
      "output": "Roll: 101 | Name: Alice | Marks: 92.5\nRoll: 102 | Name: Bob | Marks: 88.0",
      "explanation": "Wrapping state into a Student class guarantees that name, roll number, and marks for a single student remain coupled together."
    },
    {
      "id": "ex-oop9-why-2",
      "title": "Encapsulated Inventory Item with Stock Validation",
      "problemStatement": "Create an `Item` class with fields `String itemName`, `int stock`, and `double price`. Add a method `sell(int quantity)` that only reduces stock if sufficient units exist. In `main()`, initialize an item with 10 units of 'Keyboard', sell 4, then attempt to sell 8.",
      "hint": "Inside sell(int qty), check 'if (qty <= stock)' before decrementing stock.",
      "solutionCode": "public class Solution {\n    static class Item {\n        String itemName;\n        int stock;\n        double price;\n\n        void sell(int qty) {\n            if (qty <= stock) {\n                stock -= qty;\n                System.out.println(\"Sold \" + qty + \" units. Remaining: \" + stock);\n            } else {\n                System.out.println(\"Error: Insufficient stock for \" + itemName);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Item item = new Item();\n        item.itemName = \"Keyboard\";\n        item.stock = 10;\n        item.price = 45.0;\n\n        item.sell(4);\n        item.sell(8);\n    }\n}",
      "output": "Sold 4 units. Remaining: 6\nError: Insufficient stock for Keyboard",
      "explanation": "Binding validation logic with data prevents external code from putting the object into an invalid negative-stock state."
    },
    {
      "id": "ex-oop9-why-3",
      "title": "Employee Bonus and Annual Salary Calculator",
      "problemStatement": "Declare an `Employee` class with `String name`, `double monthlySalary`, and a method `getAnnualPackage(double bonusPercentage)`. In `main()`, calculate and print the annual package for an employee earning $5000/month with a 10% annual bonus.",
      "hint": "Annual package = (monthlySalary * 12) + (monthlySalary * 12 * (bonusPercentage / 100.0)).",
      "solutionCode": "public class Solution {\n    static class Employee {\n        String name;\n        double monthlySalary;\n\n        double getAnnualPackage(double bonusPercent) {\n            double baseAnnual = monthlySalary * 12;\n            double bonus = baseAnnual * (bonusPercent / 100.0);\n            return baseAnnual + bonus;\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        emp.name = \"David\";\n        emp.monthlySalary = 5000.0;\n\n        System.out.println(emp.name + \" Annual Package: $\" + emp.getAnnualPackage(10.0));\n    }\n}",
      "output": "David Annual Package: $66000.0",
      "explanation": "Calculations on employee state are localized inside the class rather than scattered across free functions."
    },
    {
      "id": "ex-oop9-why-4",
      "title": "Car Speed Governor with Encapsulated Acceleration",
      "problemStatement": "Create a `Car` class with fields `String model`, `int currentSpeed`, and `int maxSpeed`. Add methods `accelerate(int amount)` (cannot exceed maxSpeed) and `brake(int amount)` (cannot drop below 0). In `main()`, accelerate a car with maxSpeed 120 from 0 to 100, then by 50, then brake by 160.",
      "hint": "Use Math.min(currentSpeed + amount, maxSpeed) and Math.max(currentSpeed - amount, 0).",
      "solutionCode": "public class Solution {\n    static class Car {\n        String model;\n        int currentSpeed;\n        int maxSpeed;\n\n        void accelerate(int amt) {\n            currentSpeed = Math.min(currentSpeed + amt, maxSpeed);\n            System.out.println(\"Speed: \" + currentSpeed + \" mph\");\n        }\n\n        void brake(int amt) {\n            currentSpeed = Math.max(currentSpeed - amt, 0);\n            System.out.println(\"Speed: \" + currentSpeed + \" mph\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Car car = new Car();\n        car.model = \"Sedan\";\n        car.maxSpeed = 120;\n        car.currentSpeed = 0;\n\n        car.accelerate(100);\n        car.accelerate(50);\n        car.brake(160);\n    }\n}",
      "output": "Speed: 100 mph\nSpeed: 120 mph\nSpeed: 0 mph",
      "explanation": "Encapsulating bounds logic protects physical invariants, ensuring currentSpeed never violates physical constraints."
    },
    {
      "id": "ex-oop9-why-5",
      "title": "Rectangle Geometry Encapsulation",
      "problemStatement": "Declare a `Rectangle` class with fields `double length` and `double width`, and methods `area()` and `perimeter()`. In `main()`, instantiate a rectangle with dimensions 8.5 and 4.0, and print its area and perimeter.",
      "hint": "area = length * width, perimeter = 2 * (length + width).",
      "solutionCode": "public class Solution {\n    static class Rectangle {\n        double length;\n        double width;\n\n        double area() { return length * width; }\n        double perimeter() { return 2 * (length + width); }\n    }\n\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle();\n        r.length = 8.5;\n        r.width = 4.0;\n\n        System.out.println(\"Area: \" + r.area());\n        System.out.println(\"Perimeter: \" + r.perimeter());\n    }\n}",
      "output": "Area: 34.0\nPerimeter: 25.0",
      "explanation": "State and geometric formulas are cleanly unified into an intuitive Rectangle concept."
    },
    {
      "id": "ex-oop9-why-6",
      "title": "Bank Account Transaction Validation",
      "problemStatement": "Create a `BankAccount` class with `String accNo`, `double balance`, `deposit(double)`, and `withdraw(double)`. Withdraw must ensure amount is positive and does not exceed balance. In `main()`, deposit $200 into a $100 balance, then withdraw $250, then withdraw $100.",
      "hint": "Check amount > 0 and amount <= balance before subtracting from balance.",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        String accNo;\n        double balance;\n\n        void deposit(double amt) {\n            if (amt > 0) balance += amt;\n        }\n        void withdraw(double amt) {\n            if (amt > 0 && amt <= balance) {\n                balance -= amt;\n                System.out.println(\"Withdrew: $\" + amt);\n            } else {\n                System.out.println(\"Declined: $\" + amt);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount b = new BankAccount();\n        b.accNo = \"ACC-101\";\n        b.balance = 100.0;\n\n        b.deposit(200.0);\n        b.withdraw(250.0);\n        b.withdraw(100.0);\n        System.out.println(\"Final Balance: $\" + b.balance);\n    }\n}",
      "output": "Withdrew: $250.0\nDeclined: $100.0\nFinal Balance: $50.0",
      "explanation": "Object state cannot be corrupted by unauthorized negative withdrawals."
    },
    {
      "id": "ex-oop9-why-7",
      "title": "Product Tax and Final Price Bundler",
      "problemStatement": "Declare a class `Product` with `String name`, `double basePrice`, and `double taxRate` (percentage). Add a method `getFinalPrice()` returning basePrice + tax. In `main()`, instantiate 'Headphones' with base price $120.0 and tax rate 8.5%, and print the final price.",
      "hint": "tax = basePrice * (taxRate / 100.0). Final price = basePrice + tax.",
      "solutionCode": "public class Solution {\n    static class Product {\n        String name;\n        double basePrice;\n        double taxRate;\n\n        double getFinalPrice() {\n            return basePrice + (basePrice * (taxRate / 100.0));\n        }\n    }\n\n    public static void main(String[] args) {\n        Product p = new Product();\n        p.name = \"Headphones\";\n        p.basePrice = 120.0;\n        p.taxRate = 8.5;\n\n        System.out.printf(\"%s Final Price: $%.2f%n\", p.name, p.getFinalPrice());\n    }\n}",
      "output": "Headphones Final Price: $130.20",
      "explanation": "Encapsulating pricing rules ensures every product calculates its own sales total consistently."
    },
    {
      "id": "ex-oop9-why-8",
      "title": "Patient Vital Signs Monitor",
      "problemStatement": "Create a `Patient` class with `String name`, `int heartRate`, and `double temperature`. Add a method `isFeverish()` that returns true if temperature exceeds 37.5 Celsius. In `main()`, check two patients and print their fever status.",
      "hint": "return temperature > 37.5 inside isFeverish().",
      "solutionCode": "public class Solution {\n    static class Patient {\n        String name;\n        int heartRate;\n        double temperature;\n\n        boolean isFeverish() {\n            return temperature > 37.5;\n        }\n    }\n\n    public static void main(String[] args) {\n        Patient p1 = new Patient();\n        p1.name = \"Emma\"; p1.temperature = 36.8;\n        Patient p2 = new Patient();\n        p2.name = \"Lucas\"; p2.temperature = 38.6;\n\n        System.out.println(p1.name + \" fever? \" + p1.isFeverish());\n        System.out.println(p2.name + \" fever? \" + p2.isFeverish());\n    }\n}",
      "output": "Emma fever? false\nLucas fever? true",
      "explanation": "Diagnostic logic is modeled as a method of the Patient record."
    },
    {
      "id": "ex-oop9-why-9",
      "title": "Book Library Checkout State Tracker",
      "problemStatement": "Create a `Book` class with fields `String title`, `boolean isCheckedOut`, and methods `borrowBook()` and `returnBook()`. In `main()`, borrow a book twice to verify it cannot be borrowed when already checked out, then return it.",
      "hint": "Set isCheckedOut to true in borrowBook() if it was false; print error if already true.",
      "solutionCode": "public class Solution {\n    static class Book {\n        String title;\n        boolean isCheckedOut = false;\n\n        void borrowBook() {\n            if (!isCheckedOut) {\n                isCheckedOut = true;\n                System.out.println(title + \" checked out.\");\n            } else {\n                System.out.println(title + \" is already borrowed!\");\n            }\n        }\n\n        void returnBook() {\n            isCheckedOut = false;\n            System.out.println(title + \" returned.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Book b = new Book();\n        b.title = \"Effective Java\";\n\n        b.borrowBook();\n        b.borrowBook();\n        b.returnBook();\n    }\n}",
      "output": "Effective Java checked out.\nEffective Java is already borrowed!\nEffective Java returned.",
      "explanation": "State transitions are managed securely through methods."
    },
    {
      "id": "ex-oop9-why-10",
      "title": "Temperature Conversion Record",
      "problemStatement": "Create a `Temperature` class with field `double celsius`, and methods `toFahrenheit()` and `toKelvin()`. In `main()`, instantiate an object with celsius = 25.0 and print both conversions.",
      "hint": "F = (C * 9/5) + 32; K = C + 273.15.",
      "solutionCode": "public class Solution {\n    static class Temperature {\n        double celsius;\n\n        double toFahrenheit() { return (celsius * 9.0 / 5.0) + 32.0; }\n        double toKelvin() { return celsius + 273.15; }\n    }\n\n    public static void main(String[] args) {\n        Temperature t = new Temperature();\n        t.celsius = 25.0;\n\n        System.out.println(\"Celsius: \" + t.celsius + \" C\");\n        System.out.println(\"Fahrenheit: \" + t.toFahrenheit() + \" F\");\n        System.out.println(\"Kelvin: \" + t.toKelvin() + \" K\");\n    }\n}",
      "output": "Celsius: 25.0 C\nFahrenheit: 77.0 F\nKelvin: 298.15 K",
      "explanation": "All conversion behaviors associated with temperature data are unified in one class."
    }
  ],
  "what-is-a-class": [
    {
      "id": "ex-oop9-cls-1",
      "title": "Smartphone Specs Printer",
      "problemStatement": "Declare a class `Smartphone` with instance fields: `String brand`, `String model`, `int storageGb`, and `double batteryHealth`. In `main()`, instantiate two `Smartphone` objects on the heap, assign distinct values to their fields, and display each device's specifications in a clean format.",
      "hint": "Instantiate each object using 'new Smartphone()', then assign values to fields using the dot operator.",
      "solutionCode": "public class Solution {\n    static class Smartphone {\n        String brand;\n        String model;\n        int storageGb;\n        double batteryHealth;\n    }\n\n    public static void main(String[] args) {\n        Smartphone phone1 = new Smartphone();\n        phone1.brand = \"Apple\";\n        phone1.model = \"iPhone 15\";\n        phone1.storageGb = 256;\n        phone1.batteryHealth = 98.5;\n\n        Smartphone phone2 = new Smartphone();\n        phone2.brand = \"Samsung\";\n        phone2.model = \"Galaxy S24\";\n        phone2.storageGb = 512;\n        phone2.batteryHealth = 100.0;\n\n        System.out.println(\"Device 1: \" + phone1.brand + \" \" + phone1.model + \" [\" + phone1.storageGb + \"GB, \" + phone1.batteryHealth + \"% Health]\");\n        System.out.println(\"Device 2: \" + phone2.brand + \" \" + phone2.model + \" [\" + phone2.storageGb + \"GB, \" + phone2.batteryHealth + \"% Health]\");\n    }\n}",
      "output": "Device 1: Apple iPhone 15 [256GB, 98.5% Health]\nDevice 2: Samsung Galaxy S24 [512GB, 100.0% Health]",
      "explanation": "Two independent Smartphone instances are allocated on the Heap. Each instance maintains its own dedicated copy of the four instance variables."
    },
    {
      "id": "ex-oop9-cls-2",
      "title": "Bank Account Balance Initializer",
      "problemStatement": "Create a `BankAccount` class with fields `String accountNumber`, `String ownerName`, and `double balance`. Add instance methods `deposit(double amount)` and `displaySummary()`. In `main()`, instantiate an account with 'ACC-789', owner 'Taylor Reed', initial balance 250.0, deposit 175.50, and display the final summary.",
      "hint": "Inside deposit(double amount), increase balance by amount. In displaySummary(), print the formatted account details.",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        String accountNumber;\n        String ownerName;\n        double balance;\n\n        void deposit(double amount) {\n            if (amount > 0) {\n                balance += amount;\n            }\n        }\n\n        void displaySummary() {\n            System.out.printf(\"Account %s (%s): $%.2f%n\", accountNumber, ownerName, balance);\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.accountNumber = \"ACC-789\";\n        acc.ownerName = \"Taylor Reed\";\n        acc.balance = 250.0;\n\n        acc.deposit(175.50);\n        acc.displaySummary();\n    }\n}",
      "output": "Account ACC-789 (Taylor Reed): $425.50",
      "explanation": "Invoking the deposit() instance method directly mutates the balance field stored in the heap object referenced by acc."
    },
    {
      "id": "ex-oop9-cls-3",
      "title": "Point2D Distance Calculator",
      "problemStatement": "Declare a class `Point2D` with double fields `x` and `y`. Create an instance method `distanceTo(Point2D other)` that calculates and returns the Euclidean distance between the current point and another point: sqrt((x2 - x1)^2 + (y2 - y1)^2). In `main()`, instantiate (0, 0) and (3, 4), and print the calculated distance.",
      "hint": "Use Math.sqrt and calculate dx = this.x - other.x, dy = this.y - other.y.",
      "solutionCode": "public class Solution {\n    static class Point2D {\n        double x;\n        double y;\n\n        double distanceTo(Point2D other) {\n            double dx = this.x - other.x;\n            double dy = this.y - other.y;\n            return Math.sqrt(dx * dx + dy * dy);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point2D p1 = new Point2D();\n        p1.x = 0.0;\n        p1.y = 0.0;\n\n        Point2D p2 = new Point2D();\n        p2.x = 3.0;\n        p2.y = 4.0;\n\n        double dist = p1.distanceTo(p2);\n        System.out.printf(\"Distance from (%.1f, %.1f) to (%.1f, %.1f) = %.2f%n\", p1.x, p1.y, p2.x, p2.y, dist);\n    }\n}",
      "output": "Distance from (0.0, 0.0) to (3.0, 4.0) = 5.00",
      "explanation": "The distanceTo method dereferences two distinct objects: 'this' (the receiver) and 'other' (the argument)."
    },
    {
      "id": "ex-oop9-cls-4",
      "title": "Geometric Circle Area and Circumference",
      "problemStatement": "Create a `Circle` class with field `double radius`, and methods `getArea()` and `getCircumference()`. In `main()`, instantiate a circle with radius 7.0, and print its area and circumference formatted to two decimal places.",
      "hint": "area = Math.PI * radius * radius; circumference = 2 * Math.PI * radius.",
      "solutionCode": "public class Solution {\n    static class Circle {\n        double radius;\n\n        double getArea() { return Math.PI * radius * radius; }\n        double getCircumference() { return 2 * Math.PI * radius; }\n    }\n\n    public static void main(String[] args) {\n        Circle c = new Circle();\n        c.radius = 7.0;\n\n        System.out.printf(\"Radius: %.1f | Area: %.2f | Circumference: %.2f%n\", c.radius, c.getArea(), c.getCircumference());\n    }\n}",
      "output": "Radius: 7.0 | Area: 153.94 | Circumference: 43.98",
      "explanation": "State and math computations are encapsulated together in the Circle class."
    },
    {
      "id": "ex-oop9-cls-5",
      "title": "Digital Clock Time Formatter",
      "problemStatement": "Declare a `Time` class with fields `int hours`, `int minutes`, and `int seconds`. Add a method `toUniversalString()` returning formatted 'HH:MM:SS' with leading zeros. In `main()`, set time to 9:5:8 and display it.",
      "hint": "Use String.format(\"%02d:%02d:%02d\", hours, minutes, seconds).",
      "solutionCode": "public class Solution {\n    static class Time {\n        int hours, minutes, seconds;\n\n        String toUniversalString() {\n            return String.format(\"%02d:%02d:%02d\", hours, minutes, seconds);\n        }\n    }\n\n    public static void main(String[] args) {\n        Time t = new Time();\n        t.hours = 9;\n        t.minutes = 5;\n        t.seconds = 8;\n\n        System.out.println(\"Time: \" + t.toUniversalString());\n    }\n}",
      "output": "Time: 09:05:08",
      "explanation": "Formatting logic is self-contained within the Time class method."
    },
    {
      "id": "ex-oop9-cls-6",
      "title": "Student Grade Averager",
      "problemStatement": "Create a `GradeRecord` class with fields `String studentName`, `int[] grades`, and a method `getAverage()`. In `main()`, instantiate a student with grades [85, 90, 78, 92] and print the average score.",
      "hint": "Loop through the grades array, sum elements, and divide by grades.length.",
      "solutionCode": "public class Solution {\n    static class GradeRecord {\n        String studentName;\n        int[] grades;\n\n        double getAverage() {\n            int sum = 0;\n            for (int g : grades) sum += g;\n            return (double) sum / grades.length;\n        }\n    }\n\n    public static void main(String[] args) {\n        GradeRecord rec = new GradeRecord();\n        rec.studentName = \"Chloe\";\n        rec.grades = new int[]{85, 90, 78, 92};\n\n        System.out.printf(\"%s Average: %.2f%n\", rec.studentName, rec.getAverage());\n    }\n}",
      "output": "Chloe Average: 86.25",
      "explanation": "Array state and its aggregate calculation method are combined cleanly."
    },
    {
      "id": "ex-oop9-cls-7",
      "title": "Shopping Cart Item with Subtotal",
      "problemStatement": "Declare a class `CartItem` with `String product`, `double unitPrice`, `int quantity`, and method `getSubtotal()`. In `main()`, create two items, print their subtotals, and compute the total cart cost.",
      "hint": "subtotal = unitPrice * quantity. Total is the sum of both subtotals.",
      "solutionCode": "public class Solution {\n    static class CartItem {\n        String product;\n        double unitPrice;\n        int quantity;\n\n        double getSubtotal() { return unitPrice * quantity; }\n    }\n\n    public static void main(String[] args) {\n        CartItem i1 = new CartItem();\n        i1.product = \"Notebook\"; i1.unitPrice = 3.50; i1.quantity = 4;\n\n        CartItem i2 = new CartItem();\n        i2.product = \"Pen Pack\"; i2.unitPrice = 5.00; i2.quantity = 2;\n\n        double total = i1.getSubtotal() + i2.getSubtotal();\n        System.out.println(i1.product + \": $\" + i1.getSubtotal());\n        System.out.println(i2.product + \": $\" + i2.getSubtotal());\n        System.out.println(\"Total: $\" + total);\n    }\n}",
      "output": "Notebook: $14.0\nPen Pack: $10.0\nTotal: $24.0",
      "explanation": "Each cart item computes its own subtotal; main aggregates the results."
    },
    {
      "id": "ex-oop9-cls-8",
      "title": "LightBulb State Machine",
      "problemStatement": "Create a `LightBulb` class with boolean field `isOn` and methods `turnOn()`, `turnOff()`, and `toggle()`. In `main()`, toggle the bulb 3 times and print its state after each step.",
      "hint": "toggle() sets isOn = !isOn.",
      "solutionCode": "public class Solution {\n    static class LightBulb {\n        boolean isOn = false;\n\n        void turnOn() { isOn = true; }\n        void turnOff() { isOn = false; }\n        void toggle() { isOn = !isOn; }\n    }\n\n    public static void main(String[] args) {\n        LightBulb bulb = new LightBulb();\n        bulb.toggle();\n        System.out.println(\"Bulb on? \" + bulb.isOn);\n        bulb.toggle();\n        System.out.println(\"Bulb on? \" + bulb.isOn);\n        bulb.toggle();\n        System.out.println(\"Bulb on? \" + bulb.isOn);\n    }\n}",
      "output": "Bulb on? true\nBulb on? false\nBulb on? true",
      "explanation": "The toggle() method encapsulates state transitions cleanly."
    },
    {
      "id": "ex-oop9-cls-9",
      "title": "Movie Rating and Review Summary",
      "problemStatement": "Declare a `Movie` class with `String title`, `double rating` (out of 10.0), and method `isHit()`. A movie is a hit if rating >= 8.0. In `main()`, evaluate two movies and display their hit status.",
      "hint": "return rating >= 8.0 inside isHit().",
      "solutionCode": "public class Solution {\n    static class Movie {\n        String title;\n        double rating;\n\n        boolean isHit() { return rating >= 8.0; }\n    }\n\n    public static void main(String[] args) {\n        Movie m1 = new Movie();\n        m1.title = \"Inception\"; m1.rating = 8.8;\n        Movie m2 = new Movie();\n        m2.title = \"Mystery Movie\"; m2.rating = 6.4;\n\n        System.out.println(m1.title + \" is hit? \" + m1.isHit());\n        System.out.println(m2.title + \" is hit? \" + m2.isHit());\n    }\n}",
      "output": "Inception is hit? true\nMystery Movie is hit? false",
      "explanation": "Business rules are tied to the domain object."
    },
    {
      "id": "ex-oop9-cls-10",
      "title": "Fraction Multiplier Method",
      "problemStatement": "Create a `Fraction` class with integer fields `numerator` and `denominator`. Add a method `multiply(Fraction other)` returning a new Fraction. In `main()`, multiply 2/3 by 3/4 and print the resulting numerator and denominator.",
      "hint": "newNumerator = this.numerator * other.numerator; newDenominator = this.denominator * other.denominator.",
      "solutionCode": "public class Solution {\n    static class Fraction {\n        int numerator;\n        int denominator;\n\n        Fraction multiply(Fraction other) {\n            Fraction res = new Fraction();\n            res.numerator = this.numerator * other.numerator;\n            res.denominator = this.denominator * other.denominator;\n            return res;\n        }\n    }\n\n    public static void main(String[] args) {\n        Fraction f1 = new Fraction(); f1.numerator = 2; f1.denominator = 3;\n        Fraction f2 = new Fraction(); f2.numerator = 3; f2.denominator = 4;\n        Fraction res = f1.multiply(f2);\n        System.out.println(\"Result: \" + res.numerator + \"/\" + res.denominator);\n    }\n}",
      "output": "Result: 6/12",
      "explanation": "Methods on classes can return newly constructed instances of the same class."
    }
  ],
  "creating-objects-with-new": [
    {
      "id": "ex-oop9-new-1",
      "title": "Two Independent Heap Instances",
      "problemStatement": "Declare a class `Dog` with fields `String breed` and `int age`. In `main()`, instantiate two independent `Dog` objects using `new`. Assign 'Labrador' (age 3) to the first, and 'Bulldog' (age 5) to the second. Print both dogs' details to verify they occupy independent memory.",
      "hint": "Instantiate using 'new Dog()'. Mutating dog1 has no effect on dog2.",
      "solutionCode": "public class Solution {\n    static class Dog {\n        String breed;\n        int age;\n    }\n    public static void main(String[] args) {\n        Dog dog1 = new Dog();\n        dog1.breed = \"Labrador\";\n        dog1.age = 3;\n\n        Dog dog2 = new Dog();\n        dog2.breed = \"Bulldog\";\n        dog2.age = 5;\n\n        System.out.println(dog1.breed + \": \" + dog1.age + \" yrs\");\n        System.out.println(dog2.breed + \": \" + dog2.age + \" yrs\");\n    }\n}",
      "output": "Labrador: 3 yrs\nBulldog: 5 yrs",
      "explanation": "Every execution of 'new' creates a distinct object on the JVM Heap with its own instance fields."
    },
    {
      "id": "ex-oop9-new-2",
      "title": "Anonymous Object for One-Time Operation",
      "problemStatement": "Create a `MathHelper` class with a method `int cube(int n)`. In `main()`, use an anonymous object (instantiated without assigning to a reference variable) to calculate and print the cube of 5.",
      "hint": "Call 'new MathHelper().cube(5);' directly in System.out.println.",
      "solutionCode": "public class Solution {\n    static class MathHelper {\n        int cube(int n) { return n * n * n; }\n    }\n    public static void main(String[] args) {\n        int res = new MathHelper().cube(5);\n        System.out.println(\"Cube of 5: \" + res);\n    }\n}",
      "output": "Cube of 5: 125",
      "explanation": "An anonymous object is instantiated on the Heap, invoked once, and becomes eligible for GC immediately."
    },
    {
      "id": "ex-oop9-new-3",
      "title": "Object Array Matrix Allocation",
      "problemStatement": "Declare a class `Pixel` with integer fields `red`, `green`, `blue`. In `main()`, allocate an array of 3 `Pixel` references. Instantiate each pixel individually with RGB values (255, 0, 0), (0, 255, 0), and (0, 0, 255). Print the RGB values for each pixel in a loop.",
      "hint": "Pixel[] pixels = new Pixel[3]; then assign pixels[0] = new Pixel(); etc.",
      "solutionCode": "public class Solution {\n    static class Pixel {\n        int red, green, blue;\n    }\n    public static void main(String[] args) {\n        Pixel[] arr = new Pixel[3];\n        arr[0] = new Pixel(); arr[0].red = 255;\n        arr[1] = new Pixel(); arr[1].green = 255;\n        arr[2] = new Pixel(); arr[2].blue = 255;\n\n        for (int i = 0; i < arr.length; i++) {\n            System.out.println(\"P\" + i + \": RGB(\" + arr[i].red + \",\" + arr[i].green + \",\" + arr[i].blue + \")\");\n        }\n    }\n}",
      "output": "P0: RGB(255,0,0)\nP1: RGB(0,255,0)\nP2: RGB(0,0,255)",
      "explanation": "'new Pixel[3]' creates an array of 3 null references. Each Pixel must be instantiated with 'new Pixel()' individually."
    },
    {
      "id": "ex-oop9-new-4",
      "title": "Factory Method Returning an Object",
      "problemStatement": "Create a `Point` class with fields `int x`, `int y`. Write a static factory method `createOrigin()` that instantiates and returns a Point at (0, 0). In `main()`, obtain the origin point and print its coordinates.",
      "hint": "Inside createOrigin(), execute 'Point p = new Point(); return p;'.",
      "solutionCode": "public class Solution {\n    static class Point {\n        int x, y;\n        static Point createOrigin() {\n            Point p = new Point();\n            p.x = 0; p.y = 0;\n            return p;\n        }\n    }\n    public static void main(String[] args) {\n        Point p = Point.createOrigin();\n        System.out.println(\"Origin: (\" + p.x + \", \" + p.y + \")\");\n    }\n}",
      "output": "Origin: (0, 0)",
      "explanation": "Factory methods encapsulate object creation and return heap references to callers."
    },
    {
      "id": "ex-oop9-new-5",
      "title": "Comparing Two Distinct Instances with ==",
      "problemStatement": "Declare a class `Token` with field `int id = 500`. In `main()`, instantiate two separate `Token` objects `t1` and `t2`. Print the result of `t1 == t2` (reference equality) and `t1.id == t2.id` (value equality).",
      "hint": "'t1 == t2' checks memory addresses; 't1.id == t2.id' checks primitive values.",
      "solutionCode": "public class Solution {\n    static class Token {\n        int id = 500;\n    }\n    public static void main(String[] args) {\n        Token t1 = new Token();\n        Token t2 = new Token();\n        System.out.println(\"t1 == t2: \" + (t1 == t2));\n        System.out.println(\"t1.id == t2.id: \" + (t1.id == t2.id));\n    }\n}",
      "output": "t1 == t2: false\nt1.id == t2.id: true",
      "explanation": "Two independent instances created with 'new' always reside at distinct Heap memory addresses."
    },
    {
      "id": "ex-oop9-new-6",
      "title": "Reassigning a Reference Variable to a New Instance",
      "problemStatement": "Declare a class `Box` with `int val = 10`. In `main()`, instantiate a Box in variable `b`, change `val` to 50, and print it. Then reassign `b = new Box();` and print `b.val` again to show the original instance was abandoned.",
      "hint": "'b = new Box();' points b to a brand-new object with default val = 10.",
      "solutionCode": "public class Solution {\n    static class Box {\n        int val = 10;\n    }\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.val = 50;\n        System.out.println(\"First Box: \" + b.val);\n        b = new Box(); // Reassigned to a fresh instance\n        System.out.println(\"Second Box: \" + b.val);\n    }\n}",
      "output": "First Box: 50\nSecond Box: 10",
      "explanation": "Reassigning a reference variable points it to a fresh instance on the Heap; the first instance is orphaned."
    },
    {
      "id": "ex-oop9-new-7",
      "title": "Method Mutating an Object Argument",
      "problemStatement": "Create a class `Account` with field `double balance = 100.0`. Write a method `static void addBonus(Account acc, double bonus)` that increases acc.balance. In `main()`, pass an account into addBonus and print its balance before and after.",
      "hint": "The method receives a copy of the reference address, mutating the shared Heap object.",
      "solutionCode": "public class Solution {\n    static class Account {\n        double balance = 100.0;\n    }\n    static void addBonus(Account acc, double bonus) {\n        acc.balance += bonus;\n    }\n    public static void main(String[] args) {\n        Account myAcc = new Account();\n        System.out.println(\"Before: $\" + myAcc.balance);\n        addBonus(myAcc, 50.0);\n        System.out.println(\"After: $\" + myAcc.balance);\n    }\n}",
      "output": "Before: $100.0\nAfter: $150.0",
      "explanation": "Object references are passed by value (copy of memory address), allowing methods to mutate the underlying object."
    },
    {
      "id": "ex-oop9-new-8",
      "title": "Dynamic Population of Student Records",
      "problemStatement": "Create a `Student` class with fields `String name` and `int score`. In `main()`, create an array of 3 students. Use a loop to populate them with names 'Student 1', 'Student 2', 'Student 3' and scores 70, 80, 90. Display all 3 records.",
      "hint": "Inside a for loop: arr[i] = new Student(); arr[i].name = ...; arr[i].score = ...;",
      "solutionCode": "public class Solution {\n    static class Student {\n        String name;\n        int score;\n    }\n    public static void main(String[] args) {\n        Student[] list = new Student[3];\n        for (int i = 0; i < list.length; i++) {\n            list[i] = new Student();\n            list[i].name = \"Student \" + (i + 1);\n            list[i].score = 70 + (i * 10);\n        }\n        for (Student s : list) {\n            System.out.println(s.name + \" -> \" + s.score);\n        }\n    }\n}",
      "output": "Student 1 -> 70\nStudent 2 -> 80\nStudent 3 -> 90",
      "explanation": "Iterative object creation initializes each array slot with a distinct heap object."
    },
    {
      "id": "ex-oop9-new-9",
      "title": "Swapping Fields Between Two Objects",
      "problemStatement": "Declare a class `Container` with field `int capacity`. In `main()`, create `c1` with capacity 20 and `c2` with capacity 50. Write a swap method `static void swapCapacities(Container a, Container b)` that swaps their capacities. Print values before and after.",
      "hint": "int temp = a.capacity; a.capacity = b.capacity; b.capacity = temp;",
      "solutionCode": "public class Solution {\n    static class Container {\n        int capacity;\n    }\n    static void swapCapacities(Container a, Container b) {\n        int temp = a.capacity;\n        a.capacity = b.capacity;\n        b.capacity = temp;\n    }\n    public static void main(String[] args) {\n        Container c1 = new Container(); c1.capacity = 20;\n        Container c2 = new Container(); c2.capacity = 50;\n        System.out.println(\"Before: c1=\" + c1.capacity + \", c2=\" + c2.capacity);\n        swapCapacities(c1, c2);\n        System.out.println(\"After:  c1=\" + c1.capacity + \", c2=\" + c2.capacity);\n    }\n}",
      "output": "Before: c1=20, c2=50\nAfter:  c1=50, c2=20",
      "explanation": "Fields of two independent objects can be exchanged through reference access."
    },
    {
      "id": "ex-oop9-new-10",
      "title": "Returning a New Transformed Object",
      "problemStatement": "Declare a class `Vector2D` with fields `double x`, `double y`. Add an instance method `scale(double factor)` that returns a NEW `Vector2D` with scaled coordinates without modifying the original. In `main()`, scale (3.0, 4.0) by 2.0 and verify the original is unchanged.",
      "hint": "Vector2D v = new Vector2D(); v.x = this.x * factor; v.y = this.y * factor; return v;",
      "solutionCode": "public class Solution {\n    static class Vector2D {\n        double x, y;\n        Vector2D scale(double factor) {\n            Vector2D res = new Vector2D();\n            res.x = this.x * factor;\n            res.y = this.y * factor;\n            return res;\n        }\n    }\n    public static void main(String[] args) {\n        Vector2D v1 = new Vector2D();\n        v1.x = 3.0; v1.y = 4.0;\n        Vector2D v2 = v1.scale(2.0);\n\n        System.out.println(\"Original v1: (\" + v1.x + \", \" + v1.y + \")\");\n        System.out.println(\"Scaled v2:   (\" + v2.x + \", \" + v2.y + \")\");\n    }\n}",
      "output": "Original v1: (3.0, 4.0)\nScaled v2:   (6.0, 8.0)",
      "explanation": "Constructing and returning a new object preserves immutability for the original instance."
    }
  ],
  "references-and-memory": [
    {
      "id": "ex-oop9-ref-1",
      "title": "Reference Aliasing and Mirror Mutation",
      "problemStatement": "Demonstrate reference aliasing by creating a class `UserProfile` with fields `String handle` and `int reputationScore`. In `main()`, allocate one profile with 'coder42' and 100. Create a second reference variable `alias` pointing to the first. Modify `reputationScore` to 180 through `alias`, and print the score using the original variable.",
      "hint": "UserProfile alias = original; then mutate alias.reputationScore.",
      "solutionCode": "public class Solution {\n    static class UserProfile {\n        String handle;\n        int reputationScore;\n    }\n    public static void main(String[] args) {\n        UserProfile original = new UserProfile();\n        original.handle = \"coder42\";\n        original.reputationScore = 100;\n\n        UserProfile alias = original;\n        alias.reputationScore = 180;\n\n        System.out.println(\"Score via original: \" + original.reputationScore);\n        System.out.println(\"Score via alias:    \" + alias.reputationScore);\n        System.out.println(\"Are references equal? \" + (original == alias));\n    }\n}",
      "output": "Score via original: 180\nScore via alias:    180\nAre references equal? true",
      "explanation": "Assigning 'alias = original' copies the memory address. Both variables point to the identical heap instance."
    },
    {
      "id": "ex-oop9-ref-2",
      "title": "Default Field Values Inspector",
      "problemStatement": "Define a class `SystemDefaults` with fields: `int i`, `double d`, `boolean bool`, and `String str`. In `main()`, instantiate the class and print the default value of each field without assigning anything.",
      "hint": "SystemDefaults obj = new SystemDefaults(); print obj.i, obj.d, obj.bool, obj.str.",
      "solutionCode": "public class Solution {\n    static class SystemDefaults {\n        int i;\n        double d;\n        boolean bool;\n        String str;\n    }\n    public static void main(String[] args) {\n        SystemDefaults obj = new SystemDefaults();\n        System.out.println(\"int default:     \" + obj.i);\n        System.out.println(\"double default:  \" + obj.d);\n        System.out.println(\"boolean default: \" + obj.bool);\n        System.out.println(\"String default:  \" + obj.str);\n    }\n}",
      "output": "int default:     0\ndouble default:  0.0\nboolean default: false\nString default:  null",
      "explanation": "The JVM automatically zero-initializes all instance fields on the Heap upon allocation."
    },
    {
      "id": "ex-oop9-ref-3",
      "title": "Null Pointer Exception Defense",
      "problemStatement": "Create a `Customer` class with field `String email`. In `main()`, declare a `Customer` reference assigned to `null`. Write a defensive null check: if the reference is not null, print the uppercase email; if null, print a warning message safely without crashing.",
      "hint": "Check 'if (cust != null)' before accessing cust.email.",
      "solutionCode": "public class Solution {\n    static class Customer {\n        String email = \"test@example.com\";\n    }\n    public static void main(String[] args) {\n        Customer cust = null;\n        if (cust != null) {\n            System.out.println(cust.email.toUpperCase());\n        } else {\n            System.out.println(\"Customer reference is null; operation skipped safely.\");\n        }\n    }\n}",
      "output": "Customer reference is null; operation skipped safely.",
      "explanation": "Defensive null checks prevent runtime NullPointerExceptions when operating on uninitialized references."
    },
    {
      "id": "ex-oop9-ref-4",
      "title": "Primitive Copy vs Reference Copy Comparison",
      "problemStatement": "Demonstrate the fundamental difference between primitive copying and reference copying. Show that changing `int b = a; b = 99;` does not affect `a`, but mutating `ref2.val = 99;` after `ref2 = ref1;` alters `ref1.val`.",
      "hint": "Show primitive int vs a class Box containing int val.",
      "solutionCode": "public class Solution {\n    static class Box { int val = 10; }\n    public static void main(String[] args) {\n        // Primitives\n        int a = 10;\n        int b = a;\n        b = 99;\n        System.out.println(\"Primitive a=\" + a + \", b=\" + b);\n\n        // References\n        Box b1 = new Box();\n        Box b2 = b1;\n        b2.val = 99;\n        System.out.println(\"Box b1.val=\" + b1.val + \", b2.val=\" + b2.val);\n    }\n}",
      "output": "Primitive a=10, b=99\nBox b1.val=99, b2.val=99",
      "explanation": "Primitives store raw values on the Stack; reference variables store memory addresses pointing to shared Heap objects."
    },
    {
      "id": "ex-oop9-ref-5",
      "title": "System Identity Hash Code Inspection",
      "problemStatement": "Use `System.identityHashCode()` to inspect the internal memory identity of two reference variables pointing to the same object vs two distinct objects.",
      "hint": "System.identityHashCode(obj) returns the default hash code based on object identity.",
      "solutionCode": "public class Solution {\n    static class Data {}\n    public static void main(String[] args) {\n        Data d1 = new Data();\n        Data d2 = d1; // Alias\n        Data d3 = new Data(); // Distinct instance\n\n        boolean aliasMatch = (System.identityHashCode(d1) == System.identityHashCode(d2));\n        boolean distinctMatch = (System.identityHashCode(d1) == System.identityHashCode(d3));\n\n        System.out.println(\"d1 and d2 have same identity? \" + aliasMatch);\n        System.out.println(\"d1 and d3 have same identity? \" + distinctMatch);\n    }\n}",
      "output": "d1 and d2 have same identity? true\nd1 and d3 have same identity? false",
      "explanation": "Identity hash codes confirm that aliased variables point to the exact same physical heap allocation."
    },
    {
      "id": "ex-oop9-ref-6",
      "title": "Reassigning One of Two Aliased References",
      "problemStatement": "Declare a class `Value` with `int num = 10`. In `main()`, create `v1 = new Value()`, alias `v2 = v1`, then reassign `v2 = new Value()`. Mutate `v2.num = 50`. Print `v1.num` and `v2.num` to show v1 was unaffected by the reassignment.",
      "hint": "Reassigning v2 gives it a new memory address, severing the alias.",
      "solutionCode": "public class Solution {\n    static class Value { int num = 10; }\n    public static void main(String[] args) {\n        Value v1 = new Value();\n        Value v2 = v1;\n        v2 = new Value(); // Disconnected from v1\n        v2.num = 50;\n\n        System.out.println(\"v1.num: \" + v1.num);\n        System.out.println(\"v2.num: \" + v2.num);\n    }\n}",
      "output": "v1.num: 10\nv2.num: 50",
      "explanation": "Reassigning v2 writes a new heap address into v2's stack slot; v1 still retains the original address."
    },
    {
      "id": "ex-oop9-ref-7",
      "title": "Chain of Three Aliased References",
      "problemStatement": "Declare a class `Tag` with field `String text = \"Initial\"`. In `main()`, create `t1`, set `t2 = t1`, and `t3 = t2`. Mutate `t3.text = \"Modified\"`. Print the text from all three reference variables.",
      "hint": "All three reference variables point to the same single object.",
      "solutionCode": "public class Solution {\n    static class Tag { String text = \"Initial\"; }\n    public static void main(String[] args) {\n        Tag t1 = new Tag();\n        Tag t2 = t1;\n        Tag t3 = t2;\n        t3.text = \"Modified\";\n\n        System.out.println(\"t1: \" + t1.text);\n        System.out.println(\"t2: \" + t2.text);\n        System.out.println(\"t3: \" + t3.text);\n    }\n}",
      "output": "t1: Modified\nt2: Modified\nt3: Modified",
      "explanation": "A modification through any alias in the reference chain updates the single shared object on the Heap."
    },
    {
      "id": "ex-oop9-ref-8",
      "title": "Reference Parameter Reassignment Inside Method",
      "problemStatement": "Demonstrate that reassigning a reference parameter inside a method does NOT affect the caller's variable in Java. Declare a class `Record` with `int id = 1`. In `main()`, pass an instance into a method `reassign(Record r)` that assigns `r = new Record(); r.id = 99;`. Print `id` in `main()`.",
      "hint": "Parameters are passed by value. Reassigning 'r' changes only the method's local copy of the address.",
      "solutionCode": "public class Solution {\n    static class Record { int id = 1; }\n    static void reassign(Record r) {\n        r = new Record();\n        r.id = 99;\n    }\n    public static void main(String[] args) {\n        Record original = new Record();\n        reassign(original);\n        System.out.println(\"Caller id: \" + original.id);\n    }\n}",
      "output": "Caller id: 1",
      "explanation": "Because Java is strictly pass-by-value, reassigning the parameter 'r' has zero impact on the caller's variable 'original'."
    },
    {
      "id": "ex-oop9-ref-9",
      "title": "Short-Circuit Null Check Guard",
      "problemStatement": "Create a class `User` with field `String role = \"Admin\"`. In `main()`, demonstrate how the short-circuit logical AND operator `&&` safely checks `u != null && u.role.equals(\"Admin\")` when `u = null` without throwing NullPointerException.",
      "hint": "Because 'u != null' evaluates to false, Java short-circuits and skips 'u.role.equals'.",
      "solutionCode": "public class Solution {\n    static class User { String role = \"Admin\"; }\n    public static void main(String[] args) {\n        User u = null;\n        if (u != null && u.role.equals(\"Admin\")) {\n            System.out.println(\"Access Granted\");\n        } else {\n            System.out.println(\"Access Denied (Null or Non-Admin)\");\n        }\n    }\n}",
      "output": "Access Denied (Null or Non-Admin)",
      "explanation": "Short-circuit evaluation is the standard Java idiom for safely guarding against NullPointerExceptions."
    },
    {
      "id": "ex-oop9-ref-10",
      "title": "Explicit Nulling of Object References",
      "problemStatement": "Declare a class `Resource` with field `int id = 42`. In `main()`, instantiate the resource, print its id, then null the reference variable (`res = null;`). Verify it is null with an if check.",
      "hint": "Setting res = null breaks the connection to the heap memory address.",
      "solutionCode": "public class Solution {\n    static class Resource { int id = 42; }\n    public static void main(String[] args) {\n        Resource res = new Resource();\n        System.out.println(\"Active ID: \" + res.id);\n        res = null;\n        if (res == null) {\n            System.out.println(\"Resource successfully disconnected from stack reference.\");\n        }\n    }\n}",
      "output": "Active ID: 42\nResource successfully disconnected from stack reference.",
      "explanation": "Explicitly nulling a reference disconnects it from the object, making the object eligible for GC if unreferenced."
    }
  ],
  "constructors-initialization": [
    {
      "id": "ex-oop9-con-1",
      "title": "No-Arg Default Initializer Constructor",
      "problemStatement": "Create a `ServerConfig` class with fields `String host`, `int port`, and `boolean useSsl`. Provide a parameterless constructor that initializes default configuration values: host='localhost', port=8080, useSsl=false. In `main()`, instantiate the object using `new ServerConfig()` and print the settings.",
      "hint": "Define 'public ServerConfig() { this.host = \"localhost\"; ... }'.",
      "solutionCode": "public class Solution {\n    static class ServerConfig {\n        String host;\n        int port;\n        boolean useSsl;\n\n        public ServerConfig() {\n            this.host = \"localhost\";\n            this.port = 8080;\n            this.useSsl = false;\n        }\n    }\n    public static void main(String[] args) {\n        ServerConfig cfg = new ServerConfig();\n        System.out.println(\"Server: \" + cfg.host + \":\" + cfg.port + \" (SSL=\" + cfg.useSsl + \")\");\n    }\n}",
      "output": "Server: localhost:8080 (SSL=false)",
      "explanation": "The explicit parameterless constructor ensures the object starts in a known default state instead of relying on zero-initialization."
    },
    {
      "id": "ex-oop9-con-2",
      "title": "Parameterized Constructor for Product Catalog",
      "problemStatement": "Declare a class `Product` with `String sku`, `String name`, and `double price`. Provide a parameterized constructor `Product(String sku, String name, double price)`. In `main()`, instantiate a product with 'SKU-100', 'Mechanical Keyboard', and 89.99, and display its information.",
      "hint": "Inside the constructor, assign the parameters to the instance fields.",
      "solutionCode": "public class Solution {\n    static class Product {\n        String sku, name;\n        double price;\n        Product(String sku, String name, double price) {\n            this.sku = sku;\n            this.name = name;\n            this.price = price;\n        }\n    }\n    public static void main(String[] args) {\n        Product p = new Product(\"SKU-100\", \"Mechanical Keyboard\", 89.99);\n        System.out.printf(\"%s: %s ($%.2f)%n\", p.sku, p.name, p.price);\n    }\n}",
      "output": "SKU-100: Mechanical Keyboard ($89.99)",
      "explanation": "Parameterized constructors initialize fields with custom values directly at the moment of object allocation."
    },
    {
      "id": "ex-oop9-con-3",
      "title": "Constructor Overloading with 0, 1, and 2 Arguments",
      "problemStatement": "Create a `Rectangle` class with `int length` and `int width`. Provide three overloaded constructors: 1) no-arg constructor setting 1x1, 2) single-arg constructor for a square (side x side), and 3) two-arg constructor for length x width. In `main()`, instantiate all three and print their areas.",
      "hint": "Provide Rectangle(), Rectangle(int side), and Rectangle(int l, int w).",
      "solutionCode": "public class Solution {\n    static class Rectangle {\n        int length, width;\n        Rectangle() { length = 1; width = 1; }\n        Rectangle(int side) { length = side; width = side; }\n        Rectangle(int l, int w) { length = l; width = w; }\n        int getArea() { return length * width; }\n    }\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        Rectangle r2 = new Rectangle(5);\n        Rectangle r3 = new Rectangle(4, 6);\n        System.out.println(r1.getArea() + \" \" + r2.getArea() + \" \" + r3.getArea());\n    }\n}",
      "output": "1 25 24",
      "explanation": "Constructor overloading provides callers with multiple flexible pathways to instantiate objects depending on available data."
    },
    {
      "id": "ex-oop9-con-4",
      "title": "Copy Constructor Implementation",
      "problemStatement": "Write a `ComplexNumber` class with `double real` and `double imag`. Implement a parameterized constructor and a copy constructor `ComplexNumber(ComplexNumber other)` that duplicates the fields. In `main()`, create c1 (3.0, 4.0), create c2 using the copy constructor, and print both numbers and `c1 == c2`.",
      "hint": "Copy constructor: this.real = other.real; this.imag = other.imag;",
      "solutionCode": "public class Solution {\n    static class ComplexNumber {\n        double real, imag;\n        ComplexNumber(double r, double i) { real = r; imag = i; }\n        ComplexNumber(ComplexNumber other) { this.real = other.real; this.imag = other.imag; }\n    }\n    public static void main(String[] args) {\n        ComplexNumber c1 = new ComplexNumber(3.0, 4.0);\n        ComplexNumber c2 = new ComplexNumber(c1);\n        System.out.println(\"c1 == c2: \" + (c1 == c2));\n        System.out.println(\"c2: \" + c2.real + \" + \" + c2.imag + \"i\");\n    }\n}",
      "output": "c1 == c2: false\nc2: 3.0 + 4.0i",
      "explanation": "A copy constructor creates a distinct, independent clone of an existing object with identical state."
    },
    {
      "id": "ex-oop9-con-5",
      "title": "Business Invariant Validation in Constructor",
      "problemStatement": "Create a `BankAccount` class with fields `String id` and `double balance`. Inside the constructor, enforce that the initial deposit must be at least $100.0; if less, set balance to 0 and print an error message. In `main()`, test with deposits of $50 and $500.",
      "hint": "Check 'if (initialDeposit < 100.0)' inside the constructor.",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        String id;\n        double balance;\n        BankAccount(String id, double deposit) {\n            this.id = id;\n            if (deposit < 100.0) {\n                System.out.println(\"Error: Minimum initial deposit is $100.0\");\n                this.balance = 0.0;\n            } else {\n                this.balance = deposit;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        BankAccount b1 = new BankAccount(\"ACC-1\", 50.0);\n        BankAccount b2 = new BankAccount(\"ACC-2\", 500.0);\n        System.out.println(\"b1 balance: $\" + b1.balance);\n        System.out.println(\"b2 balance: $\" + b2.balance);\n    }\n}",
      "output": "Error: Minimum initial deposit is $100.0\nb1 balance: $0.0\nb2 balance: $500.0",
      "explanation": "Constructors guard against invalid object state before creation finishes."
    },
    {
      "id": "ex-oop9-con-6",
      "title": "Execution Order of Field Initializers vs Constructor Body",
      "problemStatement": "Demonstrate the execution order between inline field initializers and the constructor body. Declare a class `StepOrder` with field `int step = 10`. In the constructor body, assign `step = 20`. In `main()`, instantiate the class and print the final value.",
      "hint": "Inline field initializers execute before the constructor body.",
      "solutionCode": "public class Solution {\n    static class StepOrder {\n        int step = 10; // Runs first\n        StepOrder() {\n            step = 20; // Runs second (overwrites 10)\n        }\n    }\n    public static void main(String[] args) {\n        StepOrder obj = new StepOrder();\n        System.out.println(\"Final step: \" + obj.step);\n    }\n}",
      "output": "Final step: 20",
      "explanation": "Field initializers execute before the constructor body, so 10 is immediately overwritten by 20."
    },
    {
      "id": "ex-oop9-con-7",
      "title": "Multiple Constructors with Type Disambiguation",
      "problemStatement": "Declare a class `Metric` with field `String type`. Overload constructors with `Metric(int x)` setting type='integer' and `Metric(double x)` setting type='double'. In `main()`, instantiate both and print their types.",
      "hint": "Pass 10 and 10.0 to trigger the respective overloaded constructors.",
      "solutionCode": "public class Solution {\n    static class Metric {\n        String type;\n        Metric(int x) { type = \"integer\"; }\n        Metric(double x) { type = \"double\"; }\n    }\n    public static void main(String[] args) {\n        Metric m1 = new Metric(10);\n        Metric m2 = new Metric(10.0);\n        System.out.println(m1.type + \" \" + m2.type);\n    }\n}",
      "output": "integer double",
      "explanation": "Java matches constructor calls using argument data types during compile-time resolution."
    },
    {
      "id": "ex-oop9-con-8",
      "title": "Constructor Initializing an Internal Array",
      "problemStatement": "Create a `ScoreBoard` class with field `int[] scores`. Provide a constructor `ScoreBoard(int count)` that dynamically allocates an array of size `count`. In `main()`, instantiate a ScoreBoard of size 3, populate scores [95, 88, 76], and display them.",
      "hint": "Inside constructor, write 'scores = new int[count];'.",
      "solutionCode": "public class Solution {\n    static class ScoreBoard {\n        int[] scores;\n        ScoreBoard(int count) {\n            scores = new int[count];\n        }\n    }\n    public static void main(String[] args) {\n        ScoreBoard sb = new ScoreBoard(3);\n        sb.scores[0] = 95;\n        sb.scores[1] = 88;\n        sb.scores[2] = 76;\n        for (int s : sb.scores) System.out.print(s + \" \");\n        System.out.println();\n    }\n}",
      "output": "95 88 76 ",
      "explanation": "Constructors frequently allocate and configure internal collections or arrays."
    },
    {
      "id": "ex-oop9-con-9",
      "title": "Immutable Point Coordinates via Constructor",
      "problemStatement": "Declare a class `ImmutablePoint` with `final int x` and `final int y`. Provide a constructor to initialize both final fields. In `main()`, instantiate the point at (15, 30) and print its coordinates.",
      "hint": "Final instance fields must be initialized either inline or in the constructor.",
      "solutionCode": "public class Solution {\n    static class ImmutablePoint {\n        final int x, y;\n        ImmutablePoint(int x, int y) {\n            this.x = x;\n            this.y = y;\n        }\n    }\n    public static void main(String[] args) {\n        ImmutablePoint p = new ImmutablePoint(15, 30);\n        System.out.println(\"ImmutablePoint: (\" + p.x + \", \" + p.y + \")\");\n    }\n}",
      "output": "ImmutablePoint: (15, 30)",
      "explanation": "Constructors are the primary mechanism for initializing final, immutable instance variables."
    },
    {
      "id": "ex-oop9-con-10",
      "title": "Overloaded Constructor Fallback Defaults",
      "problemStatement": "Create a `Subscription` class with fields `String plan` and `int durationMonths`. Provide two constructors: 1) `Subscription()` setting 'Basic' plan for 1 month, and 2) `Subscription(String plan, int months)`. In `main()`, instantiate both and print their details.",
      "hint": "Provide a default no-arg constructor and a parameterized constructor.",
      "solutionCode": "public class Solution {\n    static class Subscription {\n        String plan;\n        int durationMonths;\n        Subscription() {\n            plan = \"Basic\";\n            durationMonths = 1;\n        }\n        Subscription(String plan, int months) {\n            this.plan = plan;\n            this.durationMonths = months;\n        }\n    }\n    public static void main(String[] args) {\n        Subscription s1 = new Subscription();\n        Subscription s2 = new Subscription(\"Premium\", 12);\n        System.out.println(s1.plan + \": \" + s1.durationMonths + \" month(s)\");\n        System.out.println(s2.plan + \": \" + s2.durationMonths + \" month(s)\");\n    }\n}",
      "output": "Basic: 1 month(s)\nPremium: 12 month(s)",
      "explanation": "Providing both default and custom constructors offers flexible object initialization options."
    }
  ],
  "this-keyword-and-chaining": [
    {
      "id": "ex-oop9-this-1",
      "title": "Parameterized Constructor with This Disambiguation",
      "problemStatement": "Declare a class `Student` with fields `int studentId`, `String name`, and `double gpa`. Create a constructor `Student(int studentId, String name, double gpa)` using the `this` keyword to disambiguate the instance fields from the identical parameter names. In `main()`, instantiate a student and print their information.",
      "hint": "Use 'this.studentId = studentId;' to assign the parameter to the instance field.",
      "solutionCode": "public class Solution {\n    static class Student {\n        int studentId;\n        String name;\n        double gpa;\n\n        public Student(int studentId, String name, double gpa) {\n            this.studentId = studentId;\n            this.name = name;\n            this.gpa = gpa;\n        }\n    }\n    public static void main(String[] args) {\n        Student s = new Student(2048, \"Aria Vance\", 3.85);\n        System.out.println(\"Student #\" + s.studentId + \": \" + s.name + \" (GPA: \" + s.gpa + \")\");\n    }\n}",
      "output": "Student #2048: Aria Vance (GPA: 3.85)",
      "explanation": "The 'this' keyword explicitly references the heap instance field, resolving variable shadowing caused by matching parameter names."
    },
    {
      "id": "ex-oop9-this-2",
      "title": "Telescoping Constructor Chaining for UserProfile",
      "problemStatement": "Implement telescoping constructor chaining in a class `UserProfile`: 1) `UserProfile(String username)` chains to 2) with default role 'Member'; 2) `UserProfile(String username, String role)` chains to 3) with default status 'Active'; 3) `UserProfile(String username, String role, String status)` is the master constructor. In `main()`, instantiate three profiles using each constructor and print their fields.",
      "hint": "Constructor 1 calls 'this(username, \"Member\");'. Constructor 2 calls 'this(username, role, \"Active\");'.",
      "solutionCode": "public class Solution {\n    static class UserProfile {\n        String username;\n        String role;\n        String status;\n\n        public UserProfile(String username) {\n            this(username, \"Member\");\n        }\n        public UserProfile(String username, String role) {\n            this(username, role, \"Active\");\n        }\n        public UserProfile(String username, String role, String status) {\n            this.username = username;\n            this.role = role;\n            this.status = status;\n        }\n    }\n    public static void main(String[] args) {\n        UserProfile u1 = new UserProfile(\"novice_dev\");\n        UserProfile u2 = new UserProfile(\"lead_architect\", \"Admin\");\n        UserProfile u3 = new UserProfile(\"temp_guest\", \"Guest\", \"Pending\");\n\n        System.out.println(u1.username + \" | \" + u1.role + \" | \" + u1.status);\n        System.out.println(u2.username + \" | \" + u2.role + \" | \" + u2.status);\n        System.out.println(u3.username + \" | \" + u3.role + \" | \" + u3.status);\n    }\n}",
      "output": "novice_dev | Member | Active\nlead_architect | Admin | Active\ntemp_guest | Guest | Pending",
      "explanation": "Telescoping constructor chaining eliminates duplicate initialization logic by delegating to a central master constructor."
    },
    {
      "id": "ex-oop9-this-3",
      "title": "Method Chaining (Fluent Interface Pattern)",
      "problemStatement": "Create a `QueryBuilder` class with fields `String table` and `String condition`. Implement methods `from(String table)` and `where(String condition)` that return `this` to allow method chaining. Add a `build()` method that returns 'SELECT * FROM table WHERE condition'. In `main()`, chain these calls.",
      "hint": "Return 'this' from mutator methods to enable chaining.",
      "solutionCode": "public class Solution {\n    static class QueryBuilder {\n        String table;\n        String condition = \"\";\n        QueryBuilder from(String t) { this.table = t; return this; }\n        QueryBuilder where(String c) { this.condition = \" WHERE \" + c; return this; }\n        String build() { return \"SELECT * FROM \" + table + condition; }\n    }\n    public static void main(String[] args) {\n        String sql = new QueryBuilder().from(\"users\").where(\"active = 1\").build();\n        System.out.println(sql);\n    }\n}",
      "output": "SELECT * FROM users WHERE active = 1",
      "explanation": "Returning 'this' allows fluent method chaining on the same object instance."
    },
    {
      "id": "ex-oop9-this-4",
      "title": "Passing 'this' as an Argument to External Method",
      "problemStatement": "Declare a class `Invoice` with fields `int invoiceId = 101` and `double total = 299.0`. Implement a method `process()` that passes `this` to an external helper method `PaymentProcessor.processPayment(Invoice inv)`. In `main()`, create an invoice and process it.",
      "hint": "Call 'PaymentProcessor.processPayment(this);' from within process().",
      "solutionCode": "public class Solution {\n    static class Invoice {\n        int invoiceId = 101;\n        double total = 299.0;\n        void process() {\n            PaymentProcessor.processPayment(this);\n        }\n    }\n    static class PaymentProcessor {\n        static void processPayment(Invoice inv) {\n            System.out.printf(\"Payment of $%.2f received for Invoice #%d%n\", inv.total, inv.invoiceId);\n        }\n    }\n    public static void main(String[] args) {\n        Invoice inv = new Invoice();\n        inv.process();\n    }\n}",
      "output": "Payment of $299.00 received for Invoice #101",
      "explanation": "An object can pass its own reference into other methods using the 'this' keyword."
    },
    {
      "id": "ex-oop9-this-5",
      "title": "Verifying 'this' Identity Matches Calling Reference",
      "problemStatement": "Write a class `IdentityDemo` with a method `boolean isSame(IdentityDemo other)`. Inside `isSame()`, return `this == other`. In `main()`, test this method by comparing an instance with itself and with a different instance.",
      "hint": "'this == other' checks reference equality between the receiver object and the passed argument.",
      "solutionCode": "public class Solution {\n    static class IdentityDemo {\n        boolean isSame(IdentityDemo other) {\n            return this == other;\n        }\n    }\n    public static void main(String[] args) {\n        IdentityDemo a = new IdentityDemo();\n        IdentityDemo b = a;\n        IdentityDemo c = new IdentityDemo();\n        System.out.println(\"a.isSame(b): \" + a.isSame(b));\n        System.out.println(\"a.isSame(c): \" + a.isSame(c));\n    }\n}",
      "output": "a.isSame(b): true\na.isSame(c): false",
      "explanation": "Inside any instance method, 'this' holds the exact memory address of the calling object."
    },
    {
      "id": "ex-oop9-this-6",
      "title": "3-Level Constructor Chaining in Employee Class",
      "problemStatement": "Implement 3 chained constructors in class `Employee`: 1) `Employee()` chains to 2) with default id 0; 2) `Employee(int id)` chains to 3) with default department 'General'; 3) `Employee(int id, String dept)` is the master constructor. In `main()`, instantiate an employee using the no-arg constructor and display their details.",
      "hint": "Employee() calls this(0); Employee(int id) calls this(id, \"General\");",
      "solutionCode": "public class Solution {\n    static class Employee {\n        int id;\n        String dept;\n        Employee() { this(0); }\n        Employee(int id) { this(id, \"General\"); }\n        Employee(int id, String dept) {\n            this.id = id;\n            this.dept = dept;\n        }\n    }\n    public static void main(String[] args) {\n        Employee e = new Employee();\n        System.out.println(\"Employee ID: \" + e.id + \" | Dept: \" + e.dept);\n    }\n}",
      "output": "Employee ID: 0 | Dept: General",
      "explanation": "Constructor chaining cascades parameters through multiple constructors until reaching the master initializer."
    },
    {
      "id": "ex-oop9-this-7",
      "title": "Builder Pattern with Fluent Method Chaining",
      "problemStatement": "Create a `PizzaOrder` class with fields `String size`, `boolean extraCheese`, and `boolean pepperoni`. Add setter methods `setSize()`, `addExtraCheese()`, and `addPepperoni()` that return `this`. In `main()`, build an order using method chaining and print the summary.",
      "hint": "Chain all setters: new PizzaOrder().setSize(\"Large\").addExtraCheese().addPepperoni();",
      "solutionCode": "public class Solution {\n    static class PizzaOrder {\n        String size = \"Medium\";\n        boolean extraCheese = false;\n        boolean pepperoni = false;\n        PizzaOrder setSize(String s) { this.size = s; return this; }\n        PizzaOrder addExtraCheese() { this.extraCheese = true; return this; }\n        PizzaOrder addPepperoni() { this.pepperoni = true; return this; }\n    }\n    public static void main(String[] args) {\n        PizzaOrder order = new PizzaOrder().setSize(\"Large\").addExtraCheese().addPepperoni();\n        System.out.println(order.size + \" Pizza (Cheese=\" + order.extraCheese + \", Pepperoni=\" + order.pepperoni + \")\");\n    }\n}",
      "output": "Large Pizza (Cheese=true, Pepperoni=true)",
      "explanation": "Fluent interfaces improve code readability by enabling chained configuration statements."
    },
    {
      "id": "ex-oop9-this-8",
      "title": "Constructor Chaining with Default Timestamp",
      "problemStatement": "Declare a class `LogEntry` with fields `String message` and `long timestamp`. Provide a constructor `LogEntry(String message)` that chains to `LogEntry(String message, long timestamp)` passing a default timestamp of 1000L. In `main()`, instantiate an entry and print its fields.",
      "hint": "this(message, 1000L); must be line 1 of the constructor.",
      "solutionCode": "public class Solution {\n    static class LogEntry {\n        String message;\n        long timestamp;\n        LogEntry(String msg) { this(msg, 1000L); }\n        LogEntry(String msg, long ts) {\n            this.message = msg;\n            this.timestamp = ts;\n        }\n    }\n    public static void main(String[] args) {\n        LogEntry entry = new LogEntry(\"System Startup\");\n        System.out.println(\"[\" + entry.timestamp + \"] \" + entry.message);\n    }\n}",
      "output": "[1000] System Startup",
      "explanation": "this() constructor chaining provides default argument values cleanly without code duplication."
    },
    {
      "id": "ex-oop9-this-9",
      "title": "Avoiding Shadowing Bug with Explicit this",
      "problemStatement": "Demonstrate the classic shadowing bug and its fix. Show that writing `void setValBug(int v) { v = v; }` fails to update field `v`, but `void setValFix(int v) { this.v = v; }` updates it properly. In `main()`, call both and print the results.",
      "hint": "'v = v' is a self-assignment of the parameter. 'this.v = v' updates the field.",
      "solutionCode": "public class Solution {\n    static class Data {\n        int v = 5;\n        void setValBug(int v) { v = v; }\n        void setValFix(int v) { this.v = v; }\n    }\n    public static void main(String[] args) {\n        Data d = new Data();\n        d.setValBug(99);\n        System.out.println(\"After bug: \" + d.v);\n        d.setValFix(99);\n        System.out.println(\"After fix: \" + d.v);\n    }\n}",
      "output": "After bug: 5\nAfter fix: 99",
      "explanation": "'this.' explicitly directs the compiler to the instance variable on the Heap."
    },
    {
      "id": "ex-oop9-this-10",
      "title": "Fluent Configuration Chain with State Summary",
      "problemStatement": "Create a `NetworkConfig` class with fields `int timeoutMs` and `int retries`. Implement fluent chained methods `timeout(int ms)` and `retries(int r)`. In `main()`, configure the network object in one statement and display the summary.",
      "hint": "Return 'this' from timeout and retries methods.",
      "solutionCode": "public class Solution {\n    static class NetworkConfig {\n        int timeoutMs = 1000;\n        int retries = 0;\n        NetworkConfig timeout(int ms) { this.timeoutMs = ms; return this; }\n        NetworkConfig retries(int r) { this.retries = r; return this; }\n    }\n    public static void main(String[] args) {\n        NetworkConfig cfg = new NetworkConfig().timeout(5000).retries(3);\n        System.out.println(\"Timeout: \" + cfg.timeoutMs + \"ms | Retries: \" + cfg.retries);\n    }\n}",
      "output": "Timeout: 5000ms | Retries: 3",
      "explanation": "Fluent configuration chaining produces concise, readable initialization code."
    }
  ],
  "static-vs-instance": [
    {
      "id": "ex-oop9-3-1",
      "title": "Global Instance Counter with Static Tracking",
      "problemStatement": "Declare a class `Widget` with a `static int totalCount = 0` and an instance field `int serialNumber`. In the constructor, increment `totalCount` and assign the updated count to `serialNumber`. Provide a static method `getTotalWidgets()` and an instance method `getSerialNumber()`. In `main()`, instantiate three widgets and print their serial numbers along with the total count.",
      "hint": "In constructor: totalCount++; this.serialNumber = totalCount;",
      "solutionCode": "public class Solution {\n    static class Widget {\n        static int totalCount = 0;\n        int serialNumber;\n\n        public Widget() {\n            totalCount++;\n            this.serialNumber = totalCount;\n        }\n\n        public static int getTotalWidgets() {\n            return totalCount;\n        }\n\n        public int getSerialNumber() {\n            return serialNumber;\n        }\n    }\n\n    public static void main(String[] args) {\n        Widget w1 = new Widget();\n        Widget w2 = new Widget();\n        Widget w3 = new Widget();\n\n        System.out.println(\"Widget 1 Serial: \" + w1.getSerialNumber());\n        System.out.println(\"Widget 2 Serial: \" + w2.getSerialNumber());\n        System.out.println(\"Widget 3 Serial: \" + w3.getSerialNumber());\n        System.out.println(\"Total Widgets created: \" + Widget.getTotalWidgets());\n    }\n}",
      "output": "Widget 1 Serial: 1\nWidget 2 Serial: 2\nWidget 3 Serial: 3\nTotal Widgets created: 3",
      "explanation": "The static field totalCount is shared across all instances, while serialNumber is unique to each heap instance."
    },
    {
      "id": "ex-oop9-3-2",
      "title": "Math Constants and Pure Static Utility Helpers",
      "problemStatement": "Build a static utility class `GeometryUtils` with: 1) `public static final double PI = 3.141592653589793`, 2) a private constructor to prevent instantiation, 3) static methods `circleArea(double radius)` and `cylinderVolume(double radius, double height)`. In `main()`, invoke these static methods directly without creating any object and print the results.",
      "hint": "Declare private GeometryUtils() {} so callers cannot instantiate it.",
      "solutionCode": "public class Solution {\n    static class GeometryUtils {\n        public static final double PI = 3.141592653589793;\n\n        private GeometryUtils() {}\n\n        public static double circleArea(double radius) {\n            return PI * radius * radius;\n        }\n\n        public static double cylinderVolume(double radius, double height) {\n            return circleArea(radius) * height;\n        }\n    }\n\n    public static void main(String[] args) {\n        double r = 5.0;\n        double h = 10.0;\n\n        System.out.printf(\"Circle Area (r=%.1f): %.2f%n\", r, GeometryUtils.circleArea(r));\n        System.out.printf(\"Cylinder Volume (r=%.1f, h=%.1f): %.2f%n\", r, h, GeometryUtils.cylinderVolume(r, h));\n    }\n}",
      "output": "Circle Area (r=5.0): 78.54\nCylinder Volume (r=5.0, h=10.0): 785.40",
      "explanation": "Pure static utility methods operate solely on input arguments without relying on instance state."
    },
    {
      "id": "ex-oop9-3-3",
      "title": "Company Employee Registry with Shared Employer Name",
      "problemStatement": "Create an `Employee` class with `static String companyName = \"Global Dynamics\"`, `String employeeName`, and `String department`. Add a static method `setCompanyName(String newName)` that updates the company name for everyone. In `main()`, instantiate two employees, print their details, change the company name to 'Aperture Science', and print them again to prove both reflect the change.",
      "hint": "Employee.setCompanyName(\"Aperture Science\"); updates the static field for all instances.",
      "solutionCode": "public class Solution {\n    static class Employee {\n        static String companyName = \"Global Dynamics\";\n        String employeeName;\n        String department;\n\n        public Employee(String name, String dept) {\n            this.employeeName = name;\n            this.department = dept;\n        }\n\n        public static void setCompanyName(String newName) {\n            companyName = newName;\n        }\n\n        public void display() {\n            System.out.println(employeeName + \" (\" + department + \") at \" + companyName);\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee e1 = new Employee(\"Marcus\", \"Engineering\");\n        Employee e2 = new Employee(\"Elena\", \"Marketing\");\n\n        System.out.println(\"--- Before Acquisition ---\");\n        e1.display();\n        e2.display();\n\n        Employee.setCompanyName(\"Aperture Science\");\n\n        System.out.println(\"--- After Acquisition ---\");\n        e1.display();\n        e2.display();\n    }\n}",
      "output": "--- Before Acquisition ---\nMarcus (Engineering) at Global Dynamics\nElena (Marketing) at Global Dynamics\n--- After Acquisition ---\nMarcus (Engineering) at Aperture Science\nElena (Marketing) at Aperture Science",
      "explanation": "Because companyName is static, modifying it once through the class immediately updates the employer viewed by all employees."
    },
    {
      "id": "ex-oop9-3-4",
      "title": "Static Configuration Banner and Mode Switcher",
      "problemStatement": "Create an `AppConfig` class with static fields `String environment = \"DEVELOPMENT\"` and `boolean debugMode = true`. Add static methods `setProductionMode()` (sets environment='PRODUCTION' and debugMode=false) and `printConfigBanner()`. In `main()`, print the initial config, switch to production mode, and print the updated banner.",
      "hint": "Methods inside AppConfig are static and directly mutate the static variables environment and debugMode.",
      "solutionCode": "public class Solution {\n    static class AppConfig {\n        static String environment = \"DEVELOPMENT\";\n        static boolean debugMode = true;\n\n        public static void setProductionMode() {\n            environment = \"PRODUCTION\";\n            debugMode = false;\n        }\n\n        public static void printConfigBanner() {\n            System.out.println(\"[CONFIG] Env: \" + environment + \" | Debug: \" + debugMode);\n        }\n    }\n\n    public static void main(String[] args) {\n        AppConfig.printConfigBanner();\n        AppConfig.setProductionMode();\n        AppConfig.printConfigBanner();\n    }\n}",
      "output": "[CONFIG] Env: DEVELOPMENT | Debug: true\n[CONFIG] Env: PRODUCTION | Debug: false",
      "explanation": "Static configuration parameters provide application-wide settings accessible without instantiating objects."
    },
    {
      "id": "ex-oop9-3-5",
      "title": "Auto-Incrementing Sequential ID Generator",
      "problemStatement": "Build an `Invoice` class with `static int idSequence = 5000` and instance fields `int invoiceId`, `String clientName`, and `double amount`. In the constructor, assign `invoiceId = idSequence++`. In `main()`, generate three invoices and print each formatted as 'INV-5000: Client - $Amount'.",
      "hint": "this.invoiceId = idSequence++; in the constructor.",
      "solutionCode": "public class Solution {\n    static class Invoice {\n        static int idSequence = 5000;\n        int invoiceId;\n        String clientName;\n        double amount;\n\n        public Invoice(String clientName, double amount) {\n            this.invoiceId = idSequence++;\n            this.clientName = clientName;\n            this.amount = amount;\n        }\n    }\n\n    public static void main(String[] args) {\n        Invoice inv1 = new Invoice(\"Acme Corp\", 1250.00);\n        Invoice inv2 = new Invoice(\"Stark Tech\", 4500.00);\n        Invoice inv3 = new Invoice(\"Wayne Ent\", 8900.50);\n\n        System.out.printf(\"INV-%d: %s - $%.2f%n\", inv1.invoiceId, inv1.clientName, inv1.amount);\n        System.out.printf(\"INV-%d: %s - $%.2f%n\", inv2.invoiceId, inv2.clientName, inv2.amount);\n        System.out.printf(\"INV-%d: %s - $%.2f%n\", inv3.invoiceId, inv3.clientName, inv3.amount);\n    }\n}",
      "output": "INV-5000: Acme Corp - $1250.00\nINV-5001: Stark Tech - $4500.00\nINV-5002: Wayne Ent - $8900.50",
      "explanation": "The static sequence counter generates unique, non-repeating identifier codes across all instantiated objects."
    },
    {
      "id": "ex-oop9-3-6",
      "title": "Static Initialization Block Cache Setup",
      "problemStatement": "Create a class `PrimeLookup` with a static array `static int[] firstPrimes = new int[5]`. Use a `static { ... }` initialization block to populate the array with the first 5 prime numbers (2, 3, 5, 7, 11). Add a static method `isPrimeBelow12(int n)` that checks if `n` is in `firstPrimes`. In `main()`, test whether 7 and 9 are in the prime cache.",
      "hint": "Fill firstPrimes inside 'static { firstPrimes[0] = 2; ... }'.",
      "solutionCode": "public class Solution {\n    static class PrimeLookup {\n        static int[] firstPrimes = new int[5];\n\n        static {\n            firstPrimes[0] = 2;\n            firstPrimes[1] = 3;\n            firstPrimes[2] = 5;\n            firstPrimes[3] = 7;\n            firstPrimes[4] = 11;\n        }\n\n        public static boolean isPrimeBelow12(int n) {\n            for (int p : firstPrimes) {\n                if (p == n) return true;\n            }\n            return false;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Is 7 prime? \" + PrimeLookup.isPrimeBelow12(7));\n        System.out.println(\"Is 9 prime? \" + PrimeLookup.isPrimeBelow12(9));\n    }\n}",
      "output": "Is 7 prime? true\nIs 9 prime? false",
      "explanation": "Static initializer blocks run once when the class is loaded, making them ideal for precomputing tables and caches."
    },
    {
      "id": "ex-oop9-3-7",
      "title": "Currency Converter with Shared Exchange Rate",
      "problemStatement": "Create a `CurrencyConverter` class with `static double usdToEurRate = 0.92`. Add a static method `updateRate(double newRate)` and static methods `toEur(double usd)` and `toUsd(double eur)`. In `main()`, convert $100 to EUR at the initial rate, update the rate to 0.95, and convert $100 to EUR again.",
      "hint": "toEur(double usd) returns usd * usdToEurRate.",
      "solutionCode": "public class Solution {\n    static class CurrencyConverter {\n        static double usdToEurRate = 0.92;\n\n        public static void updateRate(double newRate) {\n            usdToEurRate = newRate;\n        }\n\n        public static double toEur(double usd) {\n            return usd * usdToEurRate;\n        }\n\n        public static double toUsd(double eur) {\n            return eur / usdToEurRate;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"$100 at 0.92 = %.2f EUR%n\", CurrencyConverter.toEur(100.0));\n        CurrencyConverter.updateRate(0.95);\n        System.out.printf(\"$100 at 0.95 = %.2f EUR%n\", CurrencyConverter.toEur(100.0));\n    }\n}",
      "output": "$100 at 0.92 = 92.00 EUR\n$100 at 0.95 = 95.00 EUR",
      "explanation": "Shared static state allows modifying a global calculation multiplier across all future conversions."
    },
    {
      "id": "ex-oop9-3-8",
      "title": "Game Scoreboard with Global High Score",
      "problemStatement": "Declare a class `PlayerSession` with `static int globalHighScore = 0`, `String playerName`, and `int sessionScore`. Provide method `recordScore(int score)`: updates `sessionScore`, and if `score > globalHighScore`, updates `globalHighScore`. In `main()`, instantiate two players: Player 1 scores 450, Player 2 scores 620, Player 1 scores 580. Print each player's best session and the final global high score.",
      "hint": "Check if (score > globalHighScore) globalHighScore = score;",
      "solutionCode": "public class Solution {\n    static class PlayerSession {\n        static int globalHighScore = 0;\n        String playerName;\n        int sessionScore;\n\n        public PlayerSession(String name) {\n            this.playerName = name;\n            this.sessionScore = 0;\n        }\n\n        public void recordScore(int score) {\n            this.sessionScore = score;\n            if (score > globalHighScore) {\n                globalHighScore = score;\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        PlayerSession p1 = new PlayerSession(\"Sonic\");\n        PlayerSession p2 = new PlayerSession(\"Shadow\");\n\n        p1.recordScore(450);\n        p2.recordScore(620);\n        p1.recordScore(580);\n\n        System.out.println(p1.playerName + \" latest score: \" + p1.sessionScore);\n        System.out.println(p2.playerName + \" latest score: \" + p2.sessionScore);\n        System.out.println(\"Global High Score: \" + PlayerSession.globalHighScore);\n    }\n}",
      "output": "Sonic latest score: 580\nShadow latest score: 620\nGlobal High Score: 620",
      "explanation": "Instance methods can safely read and modify static class variables, enabling cooperative tracking across instances."
    },
    {
      "id": "ex-oop9-3-9",
      "title": "Static Validator Methods for User Credentials",
      "problemStatement": "Create a `CredentialValidator` utility class with private constructor and two static validation methods: 1) `isValidUsername(String username)`: true if non-null, length between 4 and 16, and contains no spaces; 2) `isValidPin(String pin)`: true if non-null, length exactly 4, and contains only numeric digits. In `main()`, test valid and invalid usernames and PINs.",
      "hint": "Iterate over pin.toCharArray() and check Character.isDigit(ch).",
      "solutionCode": "public class Solution {\n    static class CredentialValidator {\n        private CredentialValidator() {}\n\n        public static boolean isValidUsername(String u) {\n            if (u == null || u.length() < 4 || u.length() > 16) return false;\n            return !u.contains(\" \");\n        }\n\n        public static boolean isValidPin(String pin) {\n            if (pin == null || pin.length() != 4) return false;\n            for (char ch : pin.toCharArray()) {\n                if (!Character.isDigit(ch)) return false;\n            }\n            return true;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"admin_user valid? \" + CredentialValidator.isValidUsername(\"admin_user\"));\n        System.out.println(\"bad user valid? \" + CredentialValidator.isValidUsername(\"bad user\"));\n        System.out.println(\"PIN 1234 valid? \" + CredentialValidator.isValidPin(\"1234\"));\n        System.out.println(\"PIN 12A4 valid? \" + CredentialValidator.isValidPin(\"12A4\"));\n    }\n}",
      "output": "admin_user valid? true\nbad user valid? false\nPIN 1234 valid? true\nPIN 12A4 valid? false",
      "explanation": "Stateless validation algorithms are best designed as pure static utility methods."
    },
    {
      "id": "ex-oop9-3-10",
      "title": "Factory-Style Static Object Creator",
      "problemStatement": "Implement the Static Factory pattern in a `Point` class with private constructor `Point(double x, double y)`. Provide two static factory methods: 1) `Point.fromCartesian(double x, double y)`, and 2) `Point.fromPolar(double r, double thetaRadians)` which computes x = r * cos(theta) and y = r * sin(theta). In `main()`, instantiate points using both factory methods and display their coordinates.",
      "hint": "Inside fromPolar: return new Point(r * Math.cos(theta), r * Math.sin(theta));",
      "solutionCode": "public class Solution {\n    static class Point {\n        double x, y;\n\n        private Point(double x, double y) {\n            this.x = x;\n            this.y = y;\n        }\n\n        public static Point fromCartesian(double x, double y) {\n            return new Point(x, y);\n        }\n\n        public static Point fromPolar(double r, double theta) {\n            return new Point(r * Math.cos(theta), r * Math.sin(theta));\n        }\n\n        public void display() {\n            System.out.printf(\"Point(%.2f, %.2f)%n\", x, y);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point p1 = Point.fromCartesian(3.0, 4.0);\n        Point p2 = Point.fromPolar(5.0, Math.PI / 2); // 90 degrees\n\n        p1.display();\n        p2.display();\n    }\n}",
      "output": "Point(3.00, 4.00)\nPoint(0.00, 5.00)",
      "explanation": "Static factory methods have descriptive names and can perform coordinate transformations before invoking a private constructor."
    }
  ],
  "object-lifecycle-and-gc": [
    {
      "id": "ex-oop9-4-1",
      "title": "Reference Nullification and Memory Disconnection",
      "problemStatement": "Create a class `SessionToken` with fields `String token` and `long issuedTime`. In `main()`, instantiate a token. Print its token string. Then set the reference variable to `null`. Verify that the reference is now null before attempting any dereferencing, printing confirmation that the heap object is detached from its stack reference.",
      "hint": "Assign 'token = null;' and check 'if (token == null)'.",
      "solutionCode": "public class Solution {\n    static class SessionToken {\n        String token;\n        long issuedTime;\n\n        public SessionToken(String token, long issuedTime) {\n            this.token = token;\n            this.issuedTime = issuedTime;\n        }\n    }\n\n    public static void main(String[] args) {\n        SessionToken session = new SessionToken(\"AUTH-XYZ-999\", 1700000000L);\n        System.out.println(\"Active session: \" + session.token);\n\n        // Disconnect stack reference\n        session = null;\n\n        if (session == null) {\n            System.out.println(\"Session reference is null; heap object is orphaned and eligible for GC.\");\n        }\n    }\n}",
      "output": "Active session: AUTH-XYZ-999\nSession reference is null; heap object is orphaned and eligible for GC.",
      "explanation": "Setting a reference to null removes the stack reference path to the heap object, making it eligible for garbage collection."
    },
    {
      "id": "ex-oop9-4-2",
      "title": "Island of Isolation Circular Reference Demonstration",
      "problemStatement": "Demonstrate an Island of Isolation. Define a class `Peer` with fields `String name` and `Peer neighbor`. In `main()`, instantiate Peer A and Peer B. Connect A.neighbor to B, and B.neighbor to A. Print both neighbors. Then set both stack references A and B to null. Print a message explaining why both are now eligible for GC despite pointing to each other.",
      "hint": "Set a = null; b = null; Neither object has a path from any active GC Root.",
      "solutionCode": "public class Solution {\n    static class Peer {\n        String name;\n        Peer neighbor;\n\n        public Peer(String name) {\n            this.name = name;\n        }\n    }\n\n    public static void main(String[] args) {\n        Peer pA = new Peer(\"Node-A\");\n        Peer pB = new Peer(\"Node-B\");\n\n        pA.neighbor = pB;\n        pB.neighbor = pA;\n\n        System.out.println(pA.name + \" links to \" + pA.neighbor.name);\n        System.out.println(pB.name + \" links to \" + pB.neighbor.name);\n\n        // Sever both GC Root pointers\n        pA = null;\n        pB = null;\n\n        System.out.println(\"Island of Isolation formed: both objects reference each other but have no path from GC Roots.\");\n    }\n}",
      "output": "Node-A links to Node-B\nNode-B links to Node-A\nIsland of Isolation formed: both objects reference each other but have no path from GC Roots.",
      "explanation": "Because Java uses root-reachability tracing rather than reference counting, objects in an isolated cycle are cleanly reclaimed."
    },
    {
      "id": "ex-oop9-4-3",
      "title": "Scope-Based Object Eviction in Local Block",
      "problemStatement": "Write a program demonstrating scope-based eligibility for GC. Inside `main()`, open an explicit local block `{ ... }`. Inside this block, declare a reference `Buffer buf = new Buffer(1024)`. Outside and after the block, print a status message explaining that `buf` has fallen out of scope and the Buffer object is eligible for GC.",
      "hint": "Variables declared inside '{ ... }' cannot be accessed outside the block; their stack frame slot is reclaimed.",
      "solutionCode": "public class Solution {\n    static class Buffer {\n        int capacity;\n        public Buffer(int capacity) { this.capacity = capacity; }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Entering local scope block...\");\n        {\n            Buffer buf = new Buffer(1024);\n            System.out.println(\"Allocated temporary buffer of capacity: \" + buf.capacity);\n        } // buf falls out of scope here\n\n        System.out.println(\"Exited block: buf reference is out of scope; object is eligible for GC.\");\n    }\n}",
      "output": "Entering local scope block...\nAllocated temporary buffer of capacity: 1024\nExited block: buf reference is out of scope; object is eligible for GC.",
      "explanation": "When a reference variable's scope terminates, the stack slot is discarded, rendering the heap object unreachable if unshared."
    },
    {
      "id": "ex-oop9-4-4",
      "title": "Reassignment in a Loop and Transient Allocation",
      "problemStatement": "Create a `WorkItem` class with an integer `taskId`. In a loop running 4 iterations, reassign a single reference variable `task = new WorkItem(i)`. Inside the loop, print the active ID. Outside the loop, print the final task ID and state how many objects became eligible for GC during the loop.",
      "hint": "Each iteration orphans the object from the previous iteration. After 4 allocations, 3 objects are eligible for GC.",
      "solutionCode": "public class Solution {\n    static class WorkItem {\n        int taskId;\n        public WorkItem(int id) { this.taskId = id; }\n    }\n\n    public static void main(String[] args) {\n        WorkItem task = null;\n        for (int i = 1; i <= 4; i++) {\n            task = new WorkItem(i);\n            System.out.println(\"Processing task: \" + task.taskId);\n        }\n        System.out.println(\"Final active task: \" + task.taskId);\n        System.out.println(\"Transient items orphaned for GC: 3\");\n    }\n}",
      "output": "Processing task: 1\nProcessing task: 2\nProcessing task: 3\nProcessing task: 4\nFinal active task: 4\nTransient items orphaned for GC: 3",
      "explanation": "Overwriting a reference in a loop detaches the previously referenced objects, making them garbage."
    },
    {
      "id": "ex-oop9-4-5",
      "title": "Reference Swapping and Displaced Instance Tracking",
      "problemStatement": "Demonstrate reference pointer swapping. Declare a class `Container` with field `String label`. In `main()`, instantiate Container A ('Alpha') and Container B ('Beta'). Swap their references using a temporary pointer `temp`. Then assign `temp = null`. Verify that both containers are still fully reachable and print their swapped labels.",
      "hint": "Container temp = a; a = b; b = temp; temp = null;",
      "solutionCode": "public class Solution {\n    static class Container {\n        String label;\n        public Container(String label) { this.label = label; }\n    }\n\n    public static void main(String[] args) {\n        Container a = new Container(\"Alpha\");\n        Container b = new Container(\"Beta\");\n\n        // Swap pointers\n        Container temp = a;\n        a = b;\n        b = temp;\n        temp = null; // Clear temp\n\n        System.out.println(\"a now holds: \" + a.label);\n        System.out.println(\"b now holds: \" + b.label);\n        System.out.println(\"Are both objects still reachable? \" + (a != null && b != null));\n    }\n}",
      "output": "a now holds: Beta\nb now holds: Alpha\nAre both objects still reachable? true",
      "explanation": "Swapping reference addresses does not destroy any heap objects; both objects remain reachable via the swapped variables."
    },
    {
      "id": "ex-oop9-4-6",
      "title": "Array Reference Element Nulling",
      "problemStatement": "Create a class `CacheItem` with `String key`. Create an array `CacheItem[] items = new CacheItem[3]` and instantiate 3 items into it. Null out the element at index 1 (`items[1] = null`). Print the state of all 3 slots, confirming that slot 1's object was orphaned while slots 0 and 2 remain reachable.",
      "hint": "Set items[1] = null; slot 1 now holds null.",
      "solutionCode": "public class Solution {\n    static class CacheItem {\n        String key;\n        public CacheItem(String key) { this.key = key; }\n    }\n\n    public static void main(String[] args) {\n        CacheItem[] items = new CacheItem[3];\n        items[0] = new CacheItem(\"key-1\");\n        items[1] = new CacheItem(\"key-2\");\n        items[2] = new CacheItem(\"key-3\");\n\n        // Null out middle slot\n        items[1] = null;\n\n        for (int i = 0; i < items.length; i++) {\n            String desc = (items[i] != null) ? items[i].key : \"[EMPTY / ORPHANED]\";\n            System.out.println(\"Slot \" + i + \": \" + desc);\n        }\n    }\n}",
      "output": "Slot 0: key-1\nSlot 1: [EMPTY / ORPHANED]\nSlot 2: key-3",
      "explanation": "Clearing an array slot severs the reference path to that specific element, making it eligible for GC without affecting other elements."
    },
    {
      "id": "ex-oop9-4-7",
      "title": "Method Parameter Reassignment vs Caller Reference Retention",
      "problemStatement": "Demonstrate that assigning null to a method parameter inside a helper method does NOT nullify the caller's reference variable. Create an `Asset` class with field `int value = 500`. Create a method `attemptDiscard(Asset a)` that sets `a = null`. In `main()`, pass an Asset to `attemptDiscard` and prove that the caller's reference is still non-null and the object is still alive.",
      "hint": "Inside attemptDiscard: 'a = null;'. In main: check 'asset != null'.",
      "solutionCode": "public class Solution {\n    static class Asset {\n        int value = 500;\n    }\n\n    public static void attemptDiscard(Asset a) {\n        a = null; // Only modifies local stack frame copy\n    }\n\n    public static void main(String[] args) {\n        Asset myAsset = new Asset();\n        System.out.println(\"Value before: \" + myAsset.value);\n\n        attemptDiscard(myAsset);\n\n        System.out.println(\"Value after attemptDiscard: \" + myAsset.value);\n        System.out.println(\"Is myAsset still alive? \" + (myAsset != null));\n    }\n}",
      "output": "Value before: 500\nValue after attemptDiscard: 500\nIs myAsset still alive? true",
      "explanation": "Because Java is strictly pass-by-value, reassigning a parameter variable inside a method has zero effect on the caller's reference."
    },
    {
      "id": "ex-oop9-4-8",
      "title": "Simulating a Fixed-Size Cache with Object Eviction",
      "problemStatement": "Implement a simple 2-slot FIFO cache in a class `MiniCache` using an array of `StringData` objects (`StringData[] slots = new StringData[2]`). Provide a method `put(StringData item)` that inserts item at index 0, shifting slot 0 to slot 1, and evicting whatever was in slot 1. In `main()`, put 'Item-A', 'Item-B', and 'Item-C'. Print the cache contents to show 'Item-A' was evicted and orphaned.",
      "hint": "In put(): slots[1] = slots[0]; slots[0] = item;",
      "solutionCode": "public class Solution {\n    static class StringData {\n        String content;\n        public StringData(String c) { this.content = c; }\n    }\n\n    static class MiniCache {\n        StringData[] slots = new StringData[2];\n\n        public void put(StringData item) {\n            slots[1] = slots[0]; // Shift slot 0 to 1 (overwriting and evicting old slot 1)\n            slots[0] = item;     // Insert new item at slot 0\n        }\n\n        public void display() {\n            System.out.println(\"Slot 0: \" + (slots[0] != null ? slots[0].content : \"null\"));\n            System.out.println(\"Slot 1: \" + (slots[1] != null ? slots[1].content : \"null\"));\n        }\n    }\n\n    public static void main(String[] args) {\n        MiniCache cache = new MiniCache();\n        cache.put(new StringData(\"Item-A\"));\n        cache.put(new StringData(\"Item-B\"));\n        System.out.println(\"--- After A and B ---\");\n        cache.display();\n\n        cache.put(new StringData(\"Item-C\"));\n        System.out.println(\"--- After C (Item-A evicted) ---\");\n        cache.display();\n    }\n}",
      "output": "--- After A and B ---\nSlot 0: Item-B\nSlot 1: Item-A\n--- After C (Item-A evicted) ---\nSlot 0: Item-C\nSlot 1: Item-B",
      "explanation": "When Item-A was displaced from slot 1 by Item-B, all references to Item-A were eliminated, making Item-A eligible for GC."
    },
    {
      "id": "ex-oop9-4-9",
      "title": "Linked Node Head Disconnection",
      "problemStatement": "Build a simple singly-linked structure of three `ListNode` objects (Node 1 -> Node 2 -> Node 3). Each node has `int value` and `ListNode next`. In `main()`, connect 1 -> 2 -> 3. Advance the head pointer: `head = head.next;`. Print the new head's value, and explain why Node 1 is now eligible for GC while Node 2 and Node 3 remain alive.",
      "hint": "head = head.next drops Node 1 from the reachability path.",
      "solutionCode": "public class Solution {\n    static class ListNode {\n        int value;\n        ListNode next;\n        public ListNode(int val) { this.value = val; }\n    }\n\n    public static void main(String[] args) {\n        ListNode head = new ListNode(10);\n        head.next = new ListNode(20);\n        head.next.next = new ListNode(30);\n\n        System.out.println(\"Original Head: \" + head.value);\n\n        // Advance head (dequeuing Node 10)\n        head = head.next;\n\n        System.out.println(\"New Head: \" + head.value);\n        System.out.println(\"Next after Head: \" + head.next.value);\n        System.out.println(\"Node 10 has no incoming references from GC Roots; eligible for GC.\");\n    }\n}",
      "output": "Original Head: 10\nNew Head: 20\nNext after Head: 30\nNode 10 has no incoming references from GC Roots; eligible for GC.",
      "explanation": "Advancing the head pointer disconnects Node 10 from the GC Root path, leaving it eligible for reclamation while the rest of the list survives."
    },
    {
      "id": "ex-oop9-4-10",
      "title": "Simulating Object Lifecycle State Transitions",
      "problemStatement": "Write a class `LifecycleTracker` that tracks state transitions through an enum-like String field `lifecycleState`: 'ALLOCATED', 'INITIALIZED', 'ACTIVE', 'DISCARDED'. Implement methods `activate()` and `discard()`. In `main()`, step through each phase of an object's lifecycle, displaying its status after each transition.",
      "hint": "Update this.lifecycleState in constructor and methods.",
      "solutionCode": "public class Solution {\n    static class LifecycleTracker {\n        String objectId;\n        String lifecycleState;\n\n        public LifecycleTracker(String id) {\n            this.objectId = id;\n            this.lifecycleState = \"INITIALIZED\";\n        }\n\n        public void activate() {\n            this.lifecycleState = \"ACTIVE\";\n        }\n\n        public void discard() {\n            this.lifecycleState = \"DISCARDED\";\n        }\n    }\n\n    public static void main(String[] args) {\n        LifecycleTracker obj = new LifecycleTracker(\"RES-901\");\n        System.out.println(obj.objectId + \" State: \" + obj.lifecycleState);\n\n        obj.activate();\n        System.out.println(obj.objectId + \" State: \" + obj.lifecycleState);\n\n        obj.discard();\n        System.out.println(obj.objectId + \" State: \" + obj.lifecycleState);\n\n        obj = null;\n        System.out.println(\"Reference cleared: Object is now UNREACHABLE.\");\n    }\n}",
      "output": "RES-901 State: INITIALIZED\nRES-901 State: ACTIVE\nRES-901 State: DISCARDED\nReference cleared: Object is now UNREACHABLE.",
      "explanation": "Demonstrates the complete lifecycle of a Java object from initialization and active use through retirement and unreachability."
    }
  ]
};

// Backward compatibility aliases for legacy 4 module keys
oop9Exercises["classes-objects-instantiation"] = oop9Exercises["what-is-a-class"];
oop9Exercises["constructors-and-chaining"] = oop9Exercises["constructors-initialization"];
oop9Exercises["static-vs-instance-members"] = oop9Exercises["static-vs-instance"];
