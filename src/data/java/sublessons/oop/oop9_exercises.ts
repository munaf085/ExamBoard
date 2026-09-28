import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 11: OOP FUNDAMENTALS - PROGRAMMING EXERCISES
// 3 Focused, beginner-friendly exercises per sub-lesson
// Designed to reinforce the specific concepts of each lesson
// ============================================================

export const oop9Exercises: Record<string, ProgrammingExercise[]> = {
  "why-oop-fundamentals": [
    {
      "id": "ex-oop-why-1",
      "title": "Refactoring Parallel Arrays to an OOP Class",
      "difficulty": "Easy",
      "problemStatement": "In procedural programming, related data is stored across separate, parallel arrays (e.g. `String[] names`, `int[] rolls`, `double[] marks`). If one array is sorted or updated, records get out of sync! Refactor this into an OOP `Student` class with fields `name`, `rollNo`, and `marks`, and a method `displayDetails()`. In `main()`, instantiate two students and call `displayDetails()` on each.",
      "hint": "Declare class Student with the 3 fields and a void displayDetails() method. In main(), create instances, set fields, and call displayDetails().",
      "solutionCode": "public class Solution {\n    static class Student {\n        String name;\n        int rollNo;\n        double marks;\n\n        void displayDetails() {\n            System.out.println(\"Roll: \" + rollNo + \" | Name: \" + name + \" | Marks: \" + marks);\n        }\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.name = \"Alice\";\n        s1.rollNo = 101;\n        s1.marks = 92.5;\n\n        Student s2 = new Student();\n        s2.name = \"Bob\";\n        s2.rollNo = 102;\n        s2.marks = 88.0;\n\n        s1.displayDetails();\n        s2.displayDetails();\n    }\n}",
      "output": "Roll: 101 | Name: Alice | Marks: 92.5\nRoll: 102 | Name: Bob | Marks: 88.0",
      "explanation": "Wrapping related variables into a single Student class guarantees that all attributes of an entity remain tightly bundled together."
    },
    {
      "id": "ex-oop-why-2",
      "title": "Bundling Data with Behavior (Rectangle)",
      "difficulty": "Easy",
      "problemStatement": "In procedural programming, you declare loose variables `double length`, `double width` and pass them to a separate standalone function `calcArea(l, w)`. In OOP, data and behavior live together. Create a `Rectangle` class with fields `length` and `width`, and a method `getArea()` that calculates area using its own fields. In `main()`, create a rectangle with length 6.0 and width 3.5, and print its area.",
      "hint": "Inside getArea(), return length * width directly without passing them as parameters.",
      "solutionCode": "public class Solution {\n    static class Rectangle {\n        double length;\n        double width;\n\n        double getArea() {\n            return length * width;\n        }\n    }\n\n    public static void main(String[] args) {\n        Rectangle rect = new Rectangle();\n        rect.length = 6.0;\n        rect.width = 3.5;\n\n        System.out.println(\"Rectangle Area: \" + rect.getArea());\n    }\n}",
      "output": "Rectangle Area: 21.0",
      "explanation": "OOP binds data (length, width) directly with its relevant behavior (getArea), removing the need to pass variables around to external functions."
    },
    {
      "id": "ex-oop-why-3",
      "title": "Preventing Global Variable Collisions (Counter)",
      "difficulty": "Easy",
      "problemStatement": "In procedural programming, a single global counter variable can be overwritten accidentally by any function. In OOP, each object maintains its own independent state. Create a `Counter` class with an `int count` field and an `increment()` method. In `main()`, create two separate counters `c1` and `c2`. Increment `c1` twice and `c2` once. Print both counts to verify they stay completely independent.",
      "hint": "Inside increment(), do count++;. Each object instance has its own separate count variable in memory.",
      "solutionCode": "public class Solution {\n    static class Counter {\n        int count = 0;\n\n        void increment() {\n            count++;\n        }\n    }\n\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n\n        c1.increment();\n        c1.increment();\n        c2.increment();\n\n        System.out.println(\"Counter 1: \" + c1.count);\n        System.out.println(\"Counter 2: \" + c2.count);\n    }\n}",
      "output": "Counter 1: 2\nCounter 2: 1",
      "explanation": "Unlike a global procedural variable that can cause naming and state collisions, OOP instances hold completely isolated copies of instance fields."
    }
  ],
  "what-is-a-class": [
    {
      "id": "ex-oop-cls-1",
      "title": "Declaring a Book Class & Inspecting Default Values",
      "difficulty": "Easy",
      "problemStatement": "Declare a class `Book` with three instance fields: `String title`, `String author`, and `double price`. In `main()`, instantiate an object `b1`. Print its fields before assigning any values to observe Java's automatic default field values (`null`, `null`, `0.0`). Then assign 'Clean Code', 'Robert Martin', and 35.50 to its fields and print the updated values.",
      "hint": "Fields of an object automatically receive default values when instantiated on the heap (null for references, 0.0 for double).",
      "solutionCode": "public class Solution {\n    static class Book {\n        String title;\n        String author;\n        double price;\n    }\n\n    public static void main(String[] args) {\n        Book b1 = new Book();\n        System.out.println(\"Defaults: \" + b1.title + \", \" + b1.author + \", \" + b1.price);\n\n        b1.title = \"Clean Code\";\n        b1.author = \"Robert Martin\";\n        b1.price = 35.50;\n        System.out.println(\"Updated: \" + b1.title + \" by \" + b1.author + \" ($ \" + b1.price + \")\");\n    }\n}",
      "output": "Defaults: null, null, 0.0\nUpdated: Clean Code by Robert Martin ($ 35.5)",
      "explanation": "Instance variables inside a heap object are initialized to default values automatically by the JVM, unlike local variables inside methods."
    },
    {
      "id": "ex-oop-cls-2",
      "title": "Smartphone Blueprint with a Display Method",
      "difficulty": "Easy",
      "problemStatement": "Declare a `Smartphone` class with fields: `String brand`, `String model`, and `int storageGb`. Add a method `showSpecs()` that prints the specs in the format: '[Brand] [Model] - [Storage]GB'. In `main()`, instantiate two devices: an Apple iPhone 15 (256GB) and a Samsung Galaxy S24 (512GB), and call `showSpecs()` on each.",
      "hint": "Define the class with 3 fields, then declare void showSpecs() { System.out.println(...); }.",
      "solutionCode": "public class Solution {\n    static class Smartphone {\n        String brand;\n        String model;\n        int storageGb;\n\n        void showSpecs() {\n            System.out.println(brand + \" \" + model + \" - \" + storageGb + \"GB\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Smartphone phone1 = new Smartphone();\n        phone1.brand = \"Apple\";\n        phone1.model = \"iPhone 15\";\n        phone1.storageGb = 256;\n\n        Smartphone phone2 = new Smartphone();\n        phone2.brand = \"Samsung\";\n        phone2.model = \"Galaxy S24\";\n        phone2.storageGb = 512;\n\n        phone1.showSpecs();\n        phone2.showSpecs();\n    }\n}",
      "output": "Apple iPhone 15 - 256GB\nSamsung Galaxy S24 - 512GB",
      "explanation": "A class serves as a reusable template. Each object created from it possesses the same structure but distinct field data."
    },
    {
      "id": "ex-oop-cls-3",
      "title": "Point2D Coordinate State & Distance from Origin",
      "difficulty": "Medium",
      "problemStatement": "Create a `Point2D` class with `double x` and `double y`. Add a method `distanceFromOrigin()` that calculates and returns `Math.sqrt(x*x + y*y)`. In `main()`, create a point at x = 3.0, y = 4.0, and print its coordinates and distance from origin.",
      "hint": "Use Math.sqrt(x * x + y * y) to calculate Euclidean distance from (0, 0).",
      "solutionCode": "public class Solution {\n    static class Point2D {\n        double x;\n        double y;\n\n        double distanceFromOrigin() {\n            return Math.sqrt(x * x + y * y);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point2D p = new Point2D();\n        p.x = 3.0;\n        p.y = 4.0;\n\n        System.out.println(\"Point: (\" + p.x + \", \" + p.y + \")\");\n        System.out.println(\"Distance from origin: \" + p.distanceFromOrigin());\n    }\n}",
      "output": "Point: (3.0, 4.0)\nDistance from origin: 5.0",
      "explanation": "The distanceFromOrigin() method uses the instance variables x and y directly to compute a result for that specific point."
    }
  ],
  "creating-objects-with-new": [
    {
      "id": "ex-oop-new-1",
      "title": "Allocating Multiple Instances on the Heap",
      "difficulty": "Easy",
      "problemStatement": "Create a `Circle` class with a `double radius` field. In `main()`, use the `new` keyword to create two instances: `c1` and `c2`. Set `c1.radius = 5.0` and `c2.radius = 12.0`. Print both radii to prove that changing `c1.radius` does not alter `c2.radius`.",
      "hint": "Use new Circle() twice to allocate two distinct memory blocks on the heap.",
      "solutionCode": "public class Solution {\n    static class Circle {\n        double radius;\n    }\n\n    public static void main(String[] args) {\n        Circle c1 = new Circle();\n        Circle c2 = new Circle();\n\n        c1.radius = 5.0;\n        c2.radius = 12.0;\n\n        System.out.println(\"c1 radius: \" + c1.radius);\n        System.out.println(\"c2 radius: \" + c2.radius);\n    }\n}",
      "output": "c1 radius: 5.0\nc2 radius: 12.0",
      "explanation": "Each 'new' operator invocation allocates a brand-new chunk of memory on the JVM Heap. The two objects have completely separate radius fields."
    },
    {
      "id": "ex-oop-new-2",
      "title": "Reference Declaration vs Heap Object Creation",
      "difficulty": "Easy",
      "problemStatement": "Declare a `Car` class with `String brand` and `int year`. In `main()`, demonstrate the distinction between declaring a reference variable (`Car myCar;`) and allocating the object with `new` (`myCar = new Car();`). Set brand to 'Toyota' and year to 2023, and print them.",
      "hint": "Declaring 'Car myCar;' only creates a reference variable on the Stack. 'new Car()' actually creates the Car object on the Heap.",
      "solutionCode": "public class Solution {\n    static class Car {\n        String brand;\n        int year;\n    }\n\n    public static void main(String[] args) {\n        // 1. Reference declared on the Stack (contains no heap object yet)\n        Car myCar;\n\n        // 2. Object created on the Heap and reference assigned\n        myCar = new Car();\n        myCar.brand = \"Toyota\";\n        myCar.year = 2023;\n\n        System.out.println(\"Car: \" + myCar.brand + \" (\" + myCar.year + \")\");\n    }\n}",
      "output": "Car: Toyota (2023)",
      "explanation": "In Java, a reference variable lives on the Stack, while the actual object payload is allocated in Heap memory via 'new'."
    },
    {
      "id": "ex-oop-new-3",
      "title": "Array of Object References",
      "difficulty": "Medium",
      "problemStatement": "Create an `Item` class with fields `String name` and `double price`. In `main()`, create an array of 2 Item references: `Item[] inventory = new Item[2];`. Explain why `inventory[0]` is initially `null`, then instantiate both elements using `new Item()`, assign values, and print each item.",
      "hint": "An array of objects initially contains null references. You must instantiate each element individually using 'new Item()'.",
      "solutionCode": "public class Solution {\n    static class Item {\n        String name;\n        double price;\n    }\n\n    public static void main(String[] args) {\n        Item[] inventory = new Item[2];\n        System.out.println(\"Initial inventory[0]: \" + inventory[0]);\n\n        inventory[0] = new Item();\n        inventory[0].name = \"Notebook\";\n        inventory[0].price = 3.99;\n\n        inventory[1] = new Item();\n        inventory[1].name = \"Pen\";\n        inventory[1].price = 1.49;\n\n        for (Item item : inventory) {\n            System.out.println(item.name + \": $\" + item.price);\n        }\n    }\n}",
      "output": "Initial inventory[0]: null\nNotebook: $3.99\nPen: $1.49",
      "explanation": "Creating an array of objects creates an array of reference pointers, all initialized to null. Each object must still be explicitly instantiated with 'new'."
    }
  ],
  "references-and-memory": [
    {
      "id": "ex-oop-mem-1",
      "title": "The Reference Copying (Aliasing) Trap",
      "difficulty": "Easy",
      "problemStatement": "Create a `Box` class with an integer field `weight`. In `main()`, instantiate `b1 = new Box()`, set `b1.weight = 10`. Next, copy the reference to `b2` via `Box b2 = b1;`. Now modify `b2.weight = 25`. Print `b1.weight` to observe how changing `b2` directly altered `b1`.",
      "hint": "Writing 'b2 = b1' does NOT clone the object; it copies the memory address from b1 to b2.",
      "solutionCode": "public class Solution {\n    static class Box {\n        int weight;\n    }\n\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        b1.weight = 10;\n\n        // Reference copy: b2 points to the SAME heap object as b1\n        Box b2 = b1;\n        b2.weight = 25;\n\n        System.out.println(\"b1.weight: \" + b1.weight);\n        System.out.println(\"b2.weight: \" + b2.weight);\n    }\n}",
      "output": "b1.weight: 25\nb2.weight: 25",
      "explanation": "Because Java reference variables store memory addresses, 'b2 = b1' creates an alias. Both variables point to the identical object on the Heap."
    },
    {
      "id": "ex-oop-mem-2",
      "title": "Defending Against NullPointerException",
      "difficulty": "Easy",
      "problemStatement": "Declare an `Account` class with `double balance`. In `main()`, declare `Account acc = null;`. Write a defensive `if (acc != null)` check before attempting to access `acc.balance` to prevent a crash. Then instantiate `acc = new Account(); acc.balance = 500.0;` and print the balance safely.",
      "hint": "Attempting to dereference a null pointer (like acc.balance when acc is null) triggers a NullPointerException.",
      "solutionCode": "public class Solution {\n    static class Account {\n        double balance;\n    }\n\n    public static void main(String[] args) {\n        Account acc = null;\n\n        if (acc == null) {\n            System.out.println(\"Account is null! Safe from NullPointerException.\");\n        }\n\n        acc = new Account();\n        acc.balance = 500.0;\n\n        if (acc != null) {\n            System.out.println(\"Account balance: $\" + acc.balance);\n        }\n    }\n}",
      "output": "Account is null! Safe from NullPointerException.\nAccount balance: $500.0",
      "explanation": "A reference variable holding null points to no memory address. Checking 'acc != null' avoids the dreaded NullPointerException."
    },
    {
      "id": "ex-oop-mem-3",
      "title": "Reassigning References & Heap Object Abandonment",
      "difficulty": "Medium",
      "problemStatement": "Create a `Player` class with `String name`. In `main()`, instantiate `Player p = new Player(); p.name = \"Warrior\";`. Print `p.name`. Then reassign `p = new Player(); p.name = \"Mage\";`. Print `p.name`. What happened to the first 'Warrior' object in Heap memory?",
      "hint": "When p is reassigned to a new object, the original object has 0 references pointing to it and becomes eligible for Garbage Collection.",
      "solutionCode": "public class Solution {\n    static class Player {\n        String name;\n    }\n\n    public static void main(String[] args) {\n        Player p = new Player();\n        p.name = \"Warrior\";\n        System.out.println(\"Initial player: \" + p.name);\n\n        // Reassign p to a new Player instance\n        p = new Player();\n        p.name = \"Mage\";\n        System.out.println(\"Current player: \" + p.name);\n    }\n}",
      "output": "Initial player: Warrior\nCurrent player: Mage",
      "explanation": "Reassigning 'p' overwrites the reference address on the Stack. The original 'Warrior' object on the Heap is now unreferenced and eligible for GC."
    }
  ],
  "constructors-initialization": [
    {
      "id": "ex-oop-ctor-1",
      "title": "Creating Objects with a Parameterized Constructor",
      "difficulty": "Easy",
      "problemStatement": "Create a `Student` class with fields `String name`, `int rollNo`, and `char grade`. Provide a parameterized constructor `Student(String n, int r, char g)` to initialize all three fields in a single line during instantiation. In `main()`, create two students using the constructor and print their details.",
      "hint": "A constructor has the exact same name as the class and has NO return type (not even void).",
      "solutionCode": "public class Solution {\n    static class Student {\n        String name;\n        int rollNo;\n        char grade;\n\n        Student(String n, int r, char g) {\n            name = n;\n            rollNo = r;\n            grade = g;\n        }\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Alice\", 101, 'A');\n        Student s2 = new Student(\"Bob\", 102, 'B');\n\n        System.out.println(s1.name + \" | Roll: \" + s1.rollNo + \" | Grade: \" + s1.grade);\n        System.out.println(s2.name + \" | Roll: \" + s2.rollNo + \" | Grade: \" + s2.grade);\n    }\n}",
      "output": "Alice | Roll: 101 | Grade: A\nBob | Roll: 102 | Grade: B",
      "explanation": "Parameterized constructors initialize instance fields at object creation time, guaranteeing an object never starts in an invalid, uninitialized state."
    },
    {
      "id": "ex-oop-ctor-2",
      "title": "Constructor Overloading (No-Arg vs Parameterized)",
      "difficulty": "Easy",
      "problemStatement": "Create a `Product` class with `String name` and `double price`. Provide two overloaded constructors: a no-arg constructor that sets name to 'Unknown' and price to 0.0, and a 2-parameter constructor that sets custom values. In `main()`, instantiate one product using each constructor and display both.",
      "hint": "Constructor overloading occurs when a class has multiple constructors with different parameter lists.",
      "solutionCode": "public class Solution {\n    static class Product {\n        String name;\n        double price;\n\n        Product() {\n            name = \"Unknown\";\n            price = 0.0;\n        }\n\n        Product(String n, double p) {\n            name = n;\n            price = p;\n        }\n    }\n\n    public static void main(String[] args) {\n        Product p1 = new Product();\n        Product p2 = new Product(\"Keyboard\", 45.99);\n\n        System.out.println(\"p1: \" + p1.name + \" - $\" + p1.price);\n        System.out.println(\"p2: \" + p2.name + \" - $\" + p2.price);\n    }\n}",
      "output": "p1: Unknown - $0.0\np2: Keyboard - $45.99",
      "explanation": "Constructor overloading allows flexible object creation depending on how much initial data the caller provides."
    },
    {
      "id": "ex-oop-ctor-3",
      "title": "Overloaded Rectangle Constructors (Square vs Rectangle)",
      "difficulty": "Medium",
      "problemStatement": "Create a `Rectangle` class with `double length` and `double width`. Add two constructors: `Rectangle(double side)` to create a square (setting both length and width to side), and `Rectangle(double l, double w)` to create a general rectangle. Add a method `area()`. In `main()`, create a square of side 5.0 and a rectangle of 4.0 x 8.0, and print their areas.",
      "hint": "Inside Rectangle(double side), set length = side and width = side.",
      "solutionCode": "public class Solution {\n    static class Rectangle {\n        double length;\n        double width;\n\n        Rectangle(double side) {\n            length = side;\n            width = side;\n        }\n\n        Rectangle(double l, double w) {\n            length = l;\n            width = w;\n        }\n\n        double area() {\n            return length * width;\n        }\n    }\n\n    public static void main(String[] args) {\n        Rectangle sq = new Rectangle(5.0);\n        Rectangle rect = new Rectangle(4.0, 8.0);\n\n        System.out.println(\"Square Area: \" + sq.area());\n        System.out.println(\"Rectangle Area: \" + rect.area());\n    }\n}",
      "output": "Square Area: 25.0\nRectangle Area: 32.0",
      "explanation": "Different constructor parameter signatures allow modeling related geometric variations cleanly."
    }
  ],
  "this-keyword-and-chaining": [
    {
      "id": "ex-oop-this-1",
      "title": "Resolving Variable Shadowing with 'this'",
      "difficulty": "Easy",
      "problemStatement": "Declare a `Person` class with fields `String name` and `int age`. In the constructor `Person(String name, int age)`, use `this.name = name;` and `this.age = age;` to resolve the shadowing between constructor parameters and instance fields. In `main()`, instantiate a person and print their details.",
      "hint": "Without 'this.', writing 'name = name' assigns the parameter to itself, leaving the instance variable unchanged!",
      "solutionCode": "public class Solution {\n    static class Person {\n        String name;\n        int age;\n\n        Person(String name, int age) {\n            this.name = name;\n            this.age = age;\n        }\n    }\n\n    public static void main(String[] args) {\n        Person p = new Person(\"Sophia\", 22);\n        System.out.println(\"Name: \" + p.name + \" | Age: \" + p.age);\n    }\n}",
      "output": "Name: Sophia | Age: 22",
      "explanation": "The 'this' keyword refers to the current object whose constructor or method is executing, disambiguating fields from parameters."
    },
    {
      "id": "ex-oop-this-2",
      "title": "Constructor Chaining with this()",
      "difficulty": "Medium",
      "problemStatement": "Create a `Book` class with `String title`, `String author`, and `double price`. Write a complete 3-parameter constructor. Then write a 2-parameter constructor `Book(String title, String author)` that calls `this(title, author, 0.0)` using constructor chaining. In `main()`, instantiate books with both constructors and print them.",
      "hint": "this(...) must be the very first statement inside a constructor body.",
      "solutionCode": "public class Solution {\n    static class Book {\n        String title;\n        String author;\n        double price;\n\n        Book(String title, String author, double price) {\n            this.title = title;\n            this.author = author;\n            this.price = price;\n        }\n\n        Book(String title, String author) {\n            this(title, author, 0.0); // Constructor chaining\n        }\n    }\n\n    public static void main(String[] args) {\n        Book b1 = new Book(\"Java Complete Reference\", \"Herbert Schildt\", 40.0);\n        Book b2 = new Book(\"Free E-Book\", \"Community Author\");\n\n        System.out.println(b1.title + \" - $\" + b1.price);\n        System.out.println(b2.title + \" - $\" + b2.price);\n    }\n}",
      "output": "Java Complete Reference - $40.0\nFree E-Book - $0.0",
      "explanation": "Using 'this()' avoids repeating field assignment logic across multiple constructors by delegating to a primary constructor."
    },
    {
      "id": "ex-oop-this-3",
      "title": "Fluent Method Chaining via returning 'this'",
      "difficulty": "Medium",
      "problemStatement": "Create a `Calculator` class with `int result = 0`. Add methods `add(int n)` and `multiply(int n)` that update `result` and `return this;`. In `main()`, chain invocations fluently: `calc.add(5).multiply(3);` and print the final result.",
      "hint": "Return 'this' at the end of each method so the caller receives the same object back for the next method call.",
      "solutionCode": "public class Solution {\n    static class Calculator {\n        int result = 0;\n\n        Calculator add(int n) {\n            this.result += n;\n            return this;\n        }\n\n        Calculator multiply(int n) {\n            this.result *= n;\n            return this;\n        }\n    }\n\n    public static void main(String[] args) {\n        Calculator calc = new Calculator();\n        calc.add(5).multiply(3);\n\n        System.out.println(\"Calculated Result: \" + calc.result);\n    }\n}",
      "output": "Calculated Result: 15",
      "explanation": "Returning 'this' enables the builder pattern and fluent API chaining in Java."
    }
  ],
  "static-vs-instance": [
    {
      "id": "ex-oop-stat-1",
      "title": "Tracking Total Instances with a Static Counter",
      "difficulty": "Easy",
      "problemStatement": "Create a `User` class with an instance variable `String username` and a static variable `static int userCount = 0`. In the constructor, increment `userCount++`. In `main()`, instantiate 3 users and print `User.userCount` using the class name.",
      "hint": "Static variables belong to the class as a whole and are shared across all instances.",
      "solutionCode": "public class Solution {\n    static class User {\n        String username;\n        static int userCount = 0;\n\n        User(String username) {\n            this.username = username;\n            userCount++;\n        }\n    }\n\n    public static void main(String[] args) {\n        new User(\"alice\");\n        new User(\"bob\");\n        new User(\"charlie\");\n\n        System.out.println(\"Total Users Created: \" + User.userCount);\n    }\n}",
      "output": "Total Users Created: 3",
      "explanation": "Static fields exist in Metaspace/Class memory once per class. Every instance shares the exact same userCount variable."
    },
    {
      "id": "ex-oop-stat-2",
      "title": "Static Utility Methods (MathHelper)",
      "difficulty": "Easy",
      "problemStatement": "Create a `MathHelper` utility class with two static methods: `static int min(int a, int b)` and `static int clamp(int val, int min, int max)`. In `main()`, invoke these methods directly via the class name without creating any object instance of `MathHelper`.",
      "hint": "Static methods can be called using ClassName.methodName() without using the 'new' keyword.",
      "solutionCode": "public class Solution {\n    static class MathHelper {\n        static int min(int a, int b) {\n            return a < b ? a : b;\n        }\n\n        static int clamp(int val, int min, int max) {\n            if (val < min) return min;\n            if (val > max) return max;\n            return val;\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Min: \" + MathHelper.min(10, 20));\n        System.out.println(\"Clamped (5 in [10, 50]): \" + MathHelper.clamp(5, 10, 50));\n        System.out.println(\"Clamped (75 in [10, 50]): \" + MathHelper.clamp(75, 10, 50));\n    }\n}",
      "output": "Min: 10\nClamped (5 in [10, 50]): 10\nClamped (75 in [10, 50]): 50",
      "explanation": "Utility methods that operate purely on their arguments without needing instance state are best declared as static."
    },
    {
      "id": "ex-oop-stat-3",
      "title": "Static vs Instance Variable Mutation Comparison",
      "difficulty": "Medium",
      "problemStatement": "Create an `Employee` class with instance variable `String empName` and static variable `static String companyName = \"TechCorp\"`. In `main()`, create two employees: 'David' and 'Sarah'. Change `Employee.companyName = \"MegaTech\"`. Print both employees' company names to show how static changes reflect across all instances.",
      "hint": "Mutating a static variable changes it for all current and future instances of that class.",
      "solutionCode": "public class Solution {\n    static class Employee {\n        String empName;\n        static String companyName = \"TechCorp\";\n\n        Employee(String name) {\n            this.empName = name;\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee e1 = new Employee(\"David\");\n        Employee e2 = new Employee(\"Sarah\");\n\n        System.out.println(e1.empName + \" @ \" + Employee.companyName);\n        System.out.println(e2.empName + \" @ \" + Employee.companyName);\n\n        // Change company at class level\n        Employee.companyName = \"MegaTech\";\n\n        System.out.println(\"--- After Company Rebrand ---\");\n        System.out.println(e1.empName + \" @ \" + Employee.companyName);\n        System.out.println(e2.empName + \" @ \" + Employee.companyName);\n    }\n}",
      "output": "David @ TechCorp\nSarah @ TechCorp\n--- After Company Rebrand ---\nDavid @ MegaTech\nSarah @ MegaTech",
      "explanation": "Instance variables are unique per object, while static variables are shared by all instances of the class."
    }
  ],
  "object-lifecycle-and-gc": [
    {
      "id": "ex-oop-gc-1",
      "title": "GC Eligibility by Nullifying a Reference",
      "difficulty": "Easy",
      "problemStatement": "Create a `TempFile` class with a `String filename` field and a constructor. In `main()`, instantiate an object with `TempFile file = new TempFile(\"session_cache.tmp\");`. Print its filename. Then set `file = null;`. Explain why the heap object is now eligible for Garbage Collection.",
      "hint": "When all references pointing to an object are set to null, the object is no longer reachable from any GC root.",
      "solutionCode": "public class Solution {\n    static class TempFile {\n        String filename;\n\n        TempFile(String name) {\n            this.filename = name;\n        }\n    }\n\n    public static void main(String[] args) {\n        TempFile file = new TempFile(\"session_cache.tmp\");\n        System.out.println(\"Active file: \" + file.filename);\n\n        // Nullifying reference\n        file = null;\n        System.out.println(\"Reference nullified: Heap object is now eligible for GC.\");\n    }\n}",
      "output": "Active file: session_cache.tmp\nReference nullified: Heap object is now eligible for GC.",
      "explanation": "An object on the heap becomes eligible for Garbage Collection the moment it has zero live references pointing to it from the Stack."
    },
    {
      "id": "ex-oop-gc-2",
      "title": "GC Eligibility via Reference Reassignment",
      "difficulty": "Easy",
      "problemStatement": "Create a `Session` class with `int sessionId`. In `main()`, allocate `Session current = new Session(101);`. Then reassign `current = new Session(202);`. Explain what happened to Session 101 and why it can now be reclaimed by the garbage collector.",
      "hint": "Reassigning 'current' leaves Session 101 orphaned with no references.",
      "solutionCode": "public class Solution {\n    static class Session {\n        int sessionId;\n\n        Session(int id) {\n            this.sessionId = id;\n        }\n    }\n\n    public static void main(String[] args) {\n        Session current = new Session(101);\n        System.out.println(\"Session: \" + current.sessionId);\n\n        // Reference reassignment orphans the first object\n        current = new Session(202);\n        System.out.println(\"New Session: \" + current.sessionId);\n        System.out.println(\"Session 101 is now unreachable and eligible for GC.\");\n    }\n}",
      "output": "Session: 101\nNew Session: 202\nSession 101 is now unreachable and eligible for GC.",
      "explanation": "When a reference is reassigned to a new object, the previous object loses its sole reference pointer and becomes garbage-collectible."
    },
    {
      "id": "ex-oop-gc-3",
      "title": "Understanding the Island of Isolation",
      "difficulty": "Medium",
      "problemStatement": "Create a `Node` class with `String id` and a reference `Node neighbor`. In `main()`, create two nodes `n1 = new Node(\"A\")` and `n2 = new Node(\"B\")`. Make them reference each other: `n1.neighbor = n2; n2.neighbor = n1;`. Now set both `n1 = null; n2 = null;`. Explain why both objects are eligible for GC despite referencing each other.",
      "hint": "Java GC uses reachability from roots (Stack variables), not reference counting. If an island cannot be reached from any stack reference, it is collected.",
      "solutionCode": "public class Solution {\n    static class Node {\n        String id;\n        Node neighbor;\n\n        Node(String id) {\n            this.id = id;\n        }\n    }\n\n    public static void main(String[] args) {\n        Node n1 = new Node(\"A\");\n        Node n2 = new Node(\"B\");\n\n        // Mutual references\n        n1.neighbor = n2;\n        n2.neighbor = n1;\n\n        // Sever all roots from Stack\n        n1 = null;\n        n2 = null;\n\n        System.out.println(\"Island of isolation created: Both Node A and Node B are GC-eligible.\");\n    }\n}",
      "output": "Island of isolation created: Both Node A and Node B are GC-eligible.",
      "explanation": "Because Java's garbage collector uses Root Reachability (tracing from Stack frames), an island of mutually referencing objects is collected once disconnected from live roots."
    }
  ]
};
