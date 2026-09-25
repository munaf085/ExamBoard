import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 9: OOP FUNDAMENTALS - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const oop9Exercises: Record<string, ProgrammingExercise[]> = {
  "classes-objects-instantiation": [
    {
      "id": "ex-oop9-1-1",
      "title": "Smartphone Device Specs Printer",
      "problemStatement": "Declare a class `Smartphone` with instance fields: `String brand`, `String model`, `int storageGb`, and `double batteryHealth`. In `main()`, instantiate two `Smartphone` objects on the heap, assign distinct values to their fields, and display each device's specifications in a clean format.",
      "hint": "Instantiate each object using 'new Smartphone()', then assign values to fields using the dot operator (e.g. phone.brand = \"...\").",
      "solutionCode": "public class Solution {\n    static class Smartphone {\n        String brand;\n        String model;\n        int storageGb;\n        double batteryHealth;\n    }\n\n    public static void main(String[] args) {\n        Smartphone phone1 = new Smartphone();\n        phone1.brand = \"Apple\";\n        phone1.model = \"iPhone 15\";\n        phone1.storageGb = 256;\n        phone1.batteryHealth = 98.5;\n\n        Smartphone phone2 = new Smartphone();\n        phone2.brand = \"Samsung\";\n        phone2.model = \"Galaxy S24\";\n        phone2.storageGb = 512;\n        phone2.batteryHealth = 100.0;\n\n        System.out.println(\"Device 1: \" + phone1.brand + \" \" + phone1.model + \" [\" + phone1.storageGb + \"GB, \" + phone1.batteryHealth + \"% Health]\");\n        System.out.println(\"Device 2: \" + phone2.brand + \" \" + phone2.model + \" [\" + phone2.storageGb + \"GB, \" + phone2.batteryHealth + \"% Health]\");\n    }\n}",
      "output": "Device 1: Apple iPhone 15 [256GB, 98.5% Health]\nDevice 2: Samsung Galaxy S24 [512GB, 100.0% Health]",
      "explanation": "Two independent Smartphone instances are allocated on the Heap. Each instance maintains its own dedicated copy of the four instance variables."
    },
    {
      "id": "ex-oop9-1-2",
      "title": "Bank Account Balance Initializer",
      "problemStatement": "Create a `BankAccount` class with fields `String accountNumber`, `String ownerName`, and `double balance`. Add instance methods `deposit(double amount)` and `displaySummary()`. In `main()`, instantiate an account with account number 'ACC-789', owner 'Taylor Reed', initial balance 250.0, deposit 175.50, and display the final summary.",
      "hint": "Inside deposit(double amount), increase this.balance by amount. In displaySummary(), print the formatted account details.",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        String accountNumber;\n        String ownerName;\n        double balance;\n\n        void deposit(double amount) {\n            if (amount > 0) {\n                balance += amount;\n            }\n        }\n\n        void displaySummary() {\n            System.out.printf(\"Account %s (%s): $%.2f%n\", accountNumber, ownerName, balance);\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.accountNumber = \"ACC-789\";\n        acc.ownerName = \"Taylor Reed\";\n        acc.balance = 250.0;\n\n        acc.deposit(175.50);\n        acc.displaySummary();\n    }\n}",
      "output": "Account ACC-789 (Taylor Reed): $425.50",
      "explanation": "Invoking the deposit() instance method directly mutates the balance field stored in the heap object referenced by acc."
    },
    {
      "id": "ex-oop9-1-3",
      "title": "Point2D Distance Calculator",
      "problemStatement": "Declare a class `Point2D` with double fields `x` and `y`. Create an instance method `distanceTo(Point2D other)` that calculates and returns the Euclidean distance between the current point and another point: sqrt((x2 - x1)^2 + (y2 - y1)^2). In `main()`, instantiate (0, 0) and (3, 4), and print the calculated distance.",
      "hint": "Use Math.sqrt and Math.pow inside distanceTo(Point2D other), reading this.x and other.x.",
      "solutionCode": "public class Solution {\n    static class Point2D {\n        double x;\n        double y;\n\n        double distanceTo(Point2D other) {\n            double dx = this.x - other.x;\n            double dy = this.y - other.y;\n            return Math.sqrt(dx * dx + dy * dy);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point2D p1 = new Point2D();\n        p1.x = 0.0;\n        p1.y = 0.0;\n\n        Point2D p2 = new Point2D();\n        p2.x = 3.0;\n        p2.y = 4.0;\n\n        double dist = p1.distanceTo(p2);\n        System.out.printf(\"Distance from (%.1f, %.1f) to (%.1f, %.1f) = %.2f%n\", p1.x, p1.y, p2.x, p2.y, dist);\n    }\n}",
      "output": "Distance from (0.0, 0.0) to (3.0, 4.0) = 5.00",
      "explanation": "The distanceTo method dereferences two distinct objects: 'this' (the point the method is called on) and 'other' (passed as a reference argument)."
    },
    {
      "id": "ex-oop9-1-4",
      "title": "Reference Aliasing and Mirror Mutation",
      "problemStatement": "Demonstrate reference aliasing by creating a class `UserProfile` with fields `String handle` and `int reputationScore`. In `main()`, allocate one profile with handle 'coder42' and score 100. Create a second reference variable `alias` pointing to the first. Modify `reputationScore` to 180 through `alias`, and print the score using the original reference variable to prove both point to the same heap object.",
      "hint": "Assign 'UserProfile alias = original;'. Modifying alias.reputationScore will immediately reflect in original.reputationScore.",
      "solutionCode": "public class Solution {\n    static class UserProfile {\n        String handle;\n        int reputationScore;\n    }\n\n    public static void main(String[] args) {\n        UserProfile original = new UserProfile();\n        original.handle = \"coder42\";\n        original.reputationScore = 100;\n\n        UserProfile alias = original; // Reference aliasing\n        alias.reputationScore = 180;\n\n        System.out.println(\"Handle: \" + original.handle);\n        System.out.println(\"Score via original: \" + original.reputationScore);\n        System.out.println(\"Score via alias: \" + alias.reputationScore);\n        System.out.println(\"Are references identical? \" + (original == alias));\n    }\n}",
      "output": "Handle: coder42\nScore via original: 180\nScore via alias: 180\nAre references identical? true",
      "explanation": "Because 'alias = original' copies the heap memory address and not the object, mutating the object through either variable alters the identical heap instance."
    },
    {
      "id": "ex-oop9-1-5",
      "title": "Default Field Values Inspector",
      "problemStatement": "Write a program that inspects the automatic zero-initialization of instance fields. Define a class `SystemDefaults` with instance fields: `byte b`, `short s`, `int i`, `long l`, `float f`, `double d`, `char c`, `boolean bool`, and `String str`. In `main()`, instantiate the class and print the default value of each field without assigning anything.",
      "hint": "Instantiate with 'new SystemDefaults()' and directly print each field. For char, cast to (int) to show its numeric Unicode code point 0.",
      "solutionCode": "public class Solution {\n    static class SystemDefaults {\n        byte b;\n        short s;\n        int i;\n        long l;\n        float f;\n        double d;\n        char c;\n        boolean bool;\n        String str;\n    }\n\n    public static void main(String[] args) {\n        SystemDefaults obj = new SystemDefaults();\n        System.out.println(\"byte: \" + obj.b);\n        System.out.println(\"short: \" + obj.s);\n        System.out.println(\"int: \" + obj.i);\n        System.out.println(\"long: \" + obj.l);\n        System.out.println(\"float: \" + obj.f);\n        System.out.println(\"double: \" + obj.d);\n        System.out.println(\"char code: \" + (int) obj.c);\n        System.out.println(\"boolean: \" + obj.bool);\n        System.out.println(\"String: \" + obj.str);\n    }\n}",
      "output": "byte: 0\nshort: 0\nint: 0\nlong: 0\nfloat: 0.0\ndouble: 0.0\nchar code: 0\nboolean: false\nString: null",
      "explanation": "The JVM automatically zeroes out heap memory upon object allocation, ensuring all instance fields begin with predictable default values."
    },
    {
      "id": "ex-oop9-1-6",
      "title": "Car Odometer Driving Tracker",
      "problemStatement": "Create a `CarTrip` class with fields `String carModel`, `int odometerMiles`, and `double fuelGallons`. Provide methods: `drive(int miles, double mpg)` which increments `odometerMiles` and deducts `miles / mpg` from `fuelGallons`, and `displayStatus()`. In `main()`, instantiate a Sedan with 15000 miles and 12.0 gallons, drive 120 miles at 30.0 mpg, and print status.",
      "hint": "In drive(int miles, double mpg), calculate fuelUsed = miles / mpg, update odometerMiles += miles, and fuelGallons -= fuelUsed.",
      "solutionCode": "public class Solution {\n    static class CarTrip {\n        String carModel;\n        int odometerMiles;\n        double fuelGallons;\n\n        void drive(int miles, double mpg) {\n            double fuelNeeded = miles / mpg;\n            if (fuelGallons >= fuelNeeded) {\n                odometerMiles += miles;\n                fuelGallons -= fuelNeeded;\n            }\n        }\n\n        void displayStatus() {\n            System.out.printf(\"%s | Odometer: %d miles | Fuel: %.2f gal%n\", carModel, odometerMiles, fuelGallons);\n        }\n    }\n\n    public static void main(String[] args) {\n        CarTrip trip = new CarTrip();\n        trip.carModel = \"Civic Sedan\";\n        trip.odometerMiles = 15000;\n        trip.fuelGallons = 12.0;\n\n        trip.drive(120, 30.0);\n        trip.displayStatus();\n    }\n}",
      "output": "Civic Sedan | Odometer: 15120 miles | Fuel: 8.00 gal",
      "explanation": "Demonstrates object state transitions: the drive method executes business logic that modifies multiple related instance fields."
    },
    {
      "id": "ex-oop9-1-7",
      "title": "Rectangle Perimeter and Area Model",
      "problemStatement": "Define a `Rectangle` class with fields `double width` and `double height`. Add methods `getArea()`, `getPerimeter()`, and `isSquare()`. In `main()`, instantiate two rectangles: one with width 8.0 and height 5.0, and another with width 6.0 and height 6.0. Print the area, perimeter, and whether each is a square.",
      "hint": "isSquare() returns true if width == height. getArea() returns width * height.",
      "solutionCode": "public class Solution {\n    static class Rectangle {\n        double width;\n        double height;\n\n        double getArea() {\n            return width * height;\n        }\n\n        double getPerimeter() {\n            return 2 * (width + height);\n        }\n\n        boolean isSquare() {\n            return width == height;\n        }\n    }\n\n    public static void main(String[] args) {\n        Rectangle r1 = new Rectangle();\n        r1.width = 8.0;\n        r1.height = 5.0;\n\n        Rectangle r2 = new Rectangle();\n        r2.width = 6.0;\n        r2.height = 6.0;\n\n        System.out.printf(\"R1: Area=%.1f, Perim=%.1f, Square=%b%n\", r1.getArea(), r1.getPerimeter(), r1.isSquare());\n        System.out.printf(\"R2: Area=%.1f, Perim=%.1f, Square=%b%n\", r2.getArea(), r2.getPerimeter(), r2.isSquare());\n    }\n}",
      "output": "R1: Area=40.0, Perim=26.0, Square=false\nR2: Area=36.0, Perim=24.0, Square=true",
      "explanation": "Methods operate directly on instance fields of the object they are invoked on, demonstrating behavior encapsulation."
    },
    {
      "id": "ex-oop9-1-8",
      "title": "Employee Salary Raise Application",
      "problemStatement": "Create an `Employee` class with fields `String name`, `String role`, and `double monthlySalary`. Add an instance method `applyRaise(double percentage)` that increases `monthlySalary` by the percentage (e.g. 10.0 for 10%), and `getAnnualSalary()` returning `monthlySalary * 12`. In `main()`, instantiate an employee earning 4000.0/month, apply a 7.5% raise, and print their new annual salary.",
      "hint": "monthlySalary += monthlySalary * (percentage / 100.0);",
      "solutionCode": "public class Solution {\n    static class Employee {\n        String name;\n        String role;\n        double monthlySalary;\n\n        void applyRaise(double percentage) {\n            monthlySalary += monthlySalary * (percentage / 100.0);\n        }\n\n        double getAnnualSalary() {\n            return monthlySalary * 12.0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        emp.name = \"Jordan Lee\";\n        emp.role = \"Software Engineer\";\n        emp.monthlySalary = 4000.0;\n\n        emp.applyRaise(7.5);\n        System.out.printf(\"Employee: %s (%s)%n\", emp.name, emp.role);\n        System.out.printf(\"Updated Monthly: $%.2f%n\", emp.monthlySalary);\n        System.out.printf(\"Updated Annual: $%.2f%n\", emp.getAnnualSalary());\n    }\n}",
      "output": "Employee: Jordan Lee (Software Engineer)\nUpdated Monthly: $4300.00\nUpdated Annual: $51600.00",
      "explanation": "The object encapsulates both stored state (monthlySalary) and derived state (annual salary computed on the fly)."
    },
    {
      "id": "ex-oop9-1-9",
      "title": "Book Inventory Price Tag",
      "problemStatement": "Declare a class `Book` with fields `String isbn`, `String title`, `double price`, and `int stockCount`. Add a method `sellCopies(int count)` which decreases `stockCount` if enough stock is available, and returns total sale amount (`count * price`). If insufficient stock, sell nothing and return 0.0. In `main()`, test selling 3 copies of an item priced at 29.99 with stock 10.",
      "hint": "Check if count <= stockCount; deduct count and return count * price.",
      "solutionCode": "public class Solution {\n    static class Book {\n        String isbn;\n        String title;\n        double price;\n        int stockCount;\n\n        double sellCopies(int count) {\n            if (count > 0 && count <= stockCount) {\n                stockCount -= count;\n                return count * price;\n            }\n            return 0.0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Book b = new Book();\n        b.isbn = \"978-0134685991\";\n        b.title = \"Effective Java\";\n        b.price = 29.99;\n        b.stockCount = 10;\n\n        double sales = b.sellCopies(3);\n        System.out.printf(\"Sold: %s | Revenue: $%.2f | Remaining Stock: %d%n\", b.title, sales, b.stockCount);\n    }\n}",
      "output": "Sold: Effective Java | Revenue: $89.97 | Remaining Stock: 7",
      "explanation": "State mutations are guarded by conditions inside the method, ensuring instance variables remain consistent."
    },
    {
      "id": "ex-oop9-1-10",
      "title": "Null Reference Guard and Fallback Display",
      "problemStatement": "Write a program demonstrating safe null reference handling. Define a `Customer` class with `String name` and `String contactNumber`. Create a static method `printCustomer(Customer c)` that safely checks if `c` is null. If null, print '[No Customer Record]'. If non-null but `contactNumber` is null, display '[Unlisted Contact]'. In `main()`, test with: 1) a fully initialized Customer, 2) a Customer with null contact, and 3) a null reference.",
      "hint": "Use defensive null checks: 'if (c == null)' and 'if (c.contactNumber == null)' to avoid NullPointerException.",
      "solutionCode": "public class Solution {\n    static class Customer {\n        String name;\n        String contactNumber;\n    }\n\n    public static void printCustomer(Customer c) {\n        if (c == null) {\n            System.out.println(\"[No Customer Record]\");\n            return;\n        }\n        String phone = (c.contactNumber != null) ? c.contactNumber : \"[Unlisted Contact]\";\n        System.out.println(\"Customer: \" + c.name + \" | Phone: \" + phone);\n    }\n\n    public static void main(String[] args) {\n        Customer c1 = new Customer();\n        c1.name = \"Morgan\";\n        c1.contactNumber = \"555-0199\";\n\n        Customer c2 = new Customer();\n        c2.name = \"Sam\";\n        c2.contactNumber = null;\n\n        Customer c3 = null;\n\n        printCustomer(c1);\n        printCustomer(c2);\n        printCustomer(c3);\n    }\n}",
      "output": "Customer: Morgan | Phone: 555-0199\nCustomer: Sam | Phone: [Unlisted Contact]\n[No Customer Record]",
      "explanation": "Defensive null checks prevent NullPointerExceptions when handling reference variables that may not point to valid heap objects."
    }
  ],
  "constructors-and-chaining": [
    {
      "id": "ex-oop9-2-1",
      "title": "No-Arg Default Initializer Constructor",
      "problemStatement": "Create a `ServerConfig` class with fields `String host`, `int port`, and `boolean useSsl`. Provide a parameterless constructor that initializes default configuration values: host='localhost', port=8080, useSsl=false. In `main()`, instantiate the object using `new ServerConfig()` and print the settings.",
      "hint": "Define 'public ServerConfig() { this.host = \"localhost\"; ... }'.",
      "solutionCode": "public class Solution {\n    static class ServerConfig {\n        String host;\n        int port;\n        boolean useSsl;\n\n        public ServerConfig() {\n            this.host = \"localhost\";\n            this.port = 8080;\n            this.useSsl = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        ServerConfig cfg = new ServerConfig();\n        System.out.println(\"Server: \" + cfg.host + \":\" + cfg.port + \" (SSL=\" + cfg.useSsl + \")\");\n    }\n}",
      "output": "Server: localhost:8080 (SSL=false)",
      "explanation": "The explicit parameterless constructor ensures the object starts in a known default state instead of relying on JVM zero-initialization."
    },
    {
      "id": "ex-oop9-2-2",
      "title": "Parameterized Constructor with This Disambiguation",
      "problemStatement": "Declare a class `Student` with fields `int studentId`, `String name`, and `double gpa`. Create a constructor `Student(int studentId, String name, double gpa)` using the `this` keyword to disambiguate the instance fields from the identical parameter names. In `main()`, instantiate a student and print their information.",
      "hint": "Use 'this.studentId = studentId;' to assign the parameter to the instance field.",
      "solutionCode": "public class Solution {\n    static class Student {\n        int studentId;\n        String name;\n        double gpa;\n\n        public Student(int studentId, String name, double gpa) {\n            this.studentId = studentId;\n            this.name = name;\n            this.gpa = gpa;\n        }\n    }\n\n    public static void main(String[] args) {\n        Student s = new Student(2048, \"Aria Vance\", 3.85);\n        System.out.println(\"Student #\" + s.studentId + \": \" + s.name + \" (GPA: \" + s.gpa + \")\");\n    }\n}",
      "output": "Student #2048: Aria Vance (GPA: 3.85)",
      "explanation": "The 'this' keyword explicitly references the heap instance field, resolving variable shadowing caused by matching parameter names."
    },
    {
      "id": "ex-oop9-2-3",
      "title": "Telescoping Constructor Chaining for Student Profile",
      "problemStatement": "Implement telescoping constructor chaining in a class `UserProfile`: 1) `UserProfile(String username)` chains to 2) with default role 'Member'; 2) `UserProfile(String username, String role)` chains to 3) with default status 'Active'; 3) `UserProfile(String username, String role, String status)` is the master constructor. In `main()`, instantiate three profiles using each constructor and print their fields.",
      "hint": "Constructor 1 calls 'this(username, \"Member\");'. Constructor 2 calls 'this(username, role, \"Active\");'.",
      "solutionCode": "public class Solution {\n    static class UserProfile {\n        String username;\n        String role;\n        String status;\n\n        public UserProfile(String username) {\n            this(username, \"Member\");\n        }\n\n        public UserProfile(String username, String role) {\n            this(username, role, \"Active\");\n        }\n\n        public UserProfile(String username, String role, String status) {\n            this.username = username;\n            this.role = role;\n            this.status = status;\n        }\n    }\n\n    public static void main(String[] args) {\n        UserProfile u1 = new UserProfile(\"novice_dev\");\n        UserProfile u2 = new UserProfile(\"lead_architect\", \"Admin\");\n        UserProfile u3 = new UserProfile(\"temp_guest\", \"Guest\", \"Pending\");\n\n        System.out.println(u1.username + \" | \" + u1.role + \" | \" + u1.status);\n        System.out.println(u2.username + \" | \" + u2.role + \" | \" + u2.status);\n        System.out.println(u3.username + \" | \" + u3.role + \" | \" + u3.status);\n    }\n}",
      "output": "novice_dev | Member | Active\nlead_architect | Admin | Active\ntemp_guest | Guest | Pending",
      "explanation": "Telescoping constructor chaining eliminates duplicate initialization logic by delegating to a central master constructor."
    },
    {
      "id": "ex-oop9-2-4",
      "title": "Product Catalog with Default Pricing and Stock",
      "problemStatement": "Create a `Product` class with `String sku`, `String name`, `double unitPrice`, and `int stockQuantity`. Provide two constructors: 1) `Product(String sku, String name)` defaulting unitPrice to 0.0 and stockQuantity to 0 via constructor chaining; 2) `Product(String sku, String name, double unitPrice, int stockQuantity)`. In `main()`, instantiate both and print their specs.",
      "hint": "First constructor delegates using 'this(sku, name, 0.0, 0);'.",
      "solutionCode": "public class Solution {\n    static class Product {\n        String sku;\n        String name;\n        double unitPrice;\n        int stockQuantity;\n\n        public Product(String sku, String name) {\n            this(sku, name, 0.0, 0);\n        }\n\n        public Product(String sku, String name, double unitPrice, int stockQuantity) {\n            this.sku = sku;\n            this.name = name;\n            this.unitPrice = unitPrice;\n            this.stockQuantity = stockQuantity;\n        }\n    }\n\n    public static void main(String[] args) {\n        Product p1 = new Product(\"SKU-001\", \"Unpriced Sample\");\n        Product p2 = new Product(\"SKU-002\", \"Mechanical Keyboard\", 89.99, 50);\n\n        System.out.printf(\"P1: %s - %s ($%.2f, Qty: %d)%n\", p1.sku, p1.name, p1.unitPrice, p1.stockQuantity);\n        System.out.printf(\"P2: %s - %s ($%.2f, Qty: %d)%n\", p2.sku, p2.name, p2.unitPrice, p2.stockQuantity);\n    }\n}",
      "output": "P1: SKU-001 - Unpriced Sample ($0.00, Qty: 0)\nP2: SKU-002 - Mechanical Keyboard ($89.99, Qty: 50)",
      "explanation": "Constructor overloading allows creating products with minimal known info or complete inventory details."
    },
    {
      "id": "ex-oop9-2-5",
      "title": "Flight Booking Multi-Constructor Setup",
      "problemStatement": "Build a `FlightBooking` class with fields `String confirmationCode`, `String passengerName`, `String seatNumber`, and `boolean hasCheckedBag`. Provide three constructors: 1) Full constructor with all 4 fields; 2) Constructor taking code and passenger, defaulting seat to 'UNASSIGNED' and bag to false; 3) Constructor taking code, passenger, and seat, defaulting bag to false. In `main()`, instantiate and print three bookings.",
      "hint": "Chain all secondary constructors to the master 4-parameter constructor using this(...).",
      "solutionCode": "public class Solution {\n    static class FlightBooking {\n        String confirmationCode;\n        String passengerName;\n        String seatNumber;\n        boolean hasCheckedBag;\n\n        public FlightBooking(String confirmationCode, String passengerName) {\n            this(confirmationCode, passengerName, \"UNASSIGNED\", false);\n        }\n\n        public FlightBooking(String confirmationCode, String passengerName, String seatNumber) {\n            this(confirmationCode, passengerName, seatNumber, false);\n        }\n\n        public FlightBooking(String confirmationCode, String passengerName, String seatNumber, boolean hasCheckedBag) {\n            this.confirmationCode = confirmationCode;\n            this.passengerName = passengerName;\n            this.seatNumber = seatNumber;\n            this.hasCheckedBag = hasCheckedBag;\n        }\n    }\n\n    public static void main(String[] args) {\n        FlightBooking b1 = new FlightBooking(\"FL-801\", \"Chris\");\n        FlightBooking b2 = new FlightBooking(\"FL-802\", \"Pat\", \"14B\");\n        FlightBooking b3 = new FlightBooking(\"FL-803\", \"Riley\", \"2A\", true);\n\n        System.out.println(b1.confirmationCode + \": \" + b1.passengerName + \" | Seat: \" + b1.seatNumber + \" | Bag: \" + b1.hasCheckedBag);\n        System.out.println(b2.confirmationCode + \": \" + b2.passengerName + \" | Seat: \" + b2.seatNumber + \" | Bag: \" + b2.hasCheckedBag);\n        System.out.println(b3.confirmationCode + \": \" + b3.passengerName + \" | Seat: \" + b3.seatNumber + \" | Bag: \" + b3.hasCheckedBag);\n    }\n}",
      "output": "FL-801: Chris | Seat: UNASSIGNED | Bag: false\nFL-802: Pat | Seat: 14B | Bag: false\nFL-803: Riley | Seat: 2A | Bag: true",
      "explanation": "Chaining to the 4-arg master constructor centralizes assignment logic while offering convenient call options."
    },
    {
      "id": "ex-oop9-2-6",
      "title": "RGB Color Constructor with Hex Validation",
      "problemStatement": "Create a `ColorRGB` class with integer fields `red`, `green`, and `blue`. Write a constructor `ColorRGB(int red, int green, int blue)` that clamps each color component between 0 and 255. Write an overloaded constructor `ColorRGB(int grayscale)` that sets all three components to grayscale using chaining. Provide a `toHex()` method returning the formatted hex string (e.g., '#FF8000'). In `main()`, instantiate an clamped RGB color (-10, 128, 300) and a grayscale color (200), printing their hex values.",
      "hint": "Helper clamp method: (val < 0) ? 0 : Math.min(val, 255). Format hex using String.format(\"#%02X%02X%02X\", red, green, blue).",
      "solutionCode": "public class Solution {\n    static class ColorRGB {\n        int red, green, blue;\n\n        public ColorRGB(int grayscale) {\n            this(grayscale, grayscale, grayscale);\n        }\n\n        public ColorRGB(int r, int g, int b) {\n            this.red = clamp(r);\n            this.green = clamp(g);\n            this.blue = clamp(b);\n        }\n\n        private static int clamp(int val) {\n            if (val < 0) return 0;\n            if (val > 255) return 255;\n            return val;\n        }\n\n        public String toHex() {\n            return String.format(\"#%02X%02X%02X\", red, green, blue);\n        }\n    }\n\n    public static void main(String[] args) {\n        ColorRGB c1 = new ColorRGB(-10, 128, 300);\n        ColorRGB c2 = new ColorRGB(200);\n\n        System.out.println(\"c1 hex: \" + c1.toHex());\n        System.out.println(\"c2 hex: \" + c2.toHex());\n    }\n}",
      "output": "c1 hex: #0080FF\nc2 hex: #C8C8C8",
      "explanation": "The constructor enforces class invariants by clamping inputs, ensuring instance variables always stay within valid bounds."
    },
    {
      "id": "ex-oop9-2-7",
      "title": "Time Clock Hour and Minute Constructor Normalization",
      "problemStatement": "Declare a class `TimeClock` with integer fields `hours` and `minutes`. Create a constructor `TimeClock(int hours, int minutes)` that normalizes overflow minutes into hours (e.g. 70 minutes becomes 1 hour and 10 minutes) and clamps hours to modulo 24. Create an overloaded constructor `TimeClock(int totalMinutes)` that delegates to the two-parameter constructor. In `main()`, test `TimeClock(10, 75)` and `TimeClock(150)`, printing both in 'HH:mm' format.",
      "hint": "In TimeClock(int totalMinutes), delegate: 'this(0, totalMinutes);'. In main constructor: extraHours = minutes / 60, minutes = minutes % 60, hours = (hours + extraHours) % 24.",
      "solutionCode": "public class Solution {\n    static class TimeClock {\n        int hours;\n        int minutes;\n\n        public TimeClock(int totalMinutes) {\n            this(0, totalMinutes);\n        }\n\n        public TimeClock(int hours, int minutes) {\n            int extraHours = minutes / 60;\n            this.minutes = minutes % 60;\n            this.hours = (hours + extraHours) % 24;\n        }\n\n        public String format() {\n            return String.format(\"%02d:%02d\", hours, minutes);\n        }\n    }\n\n    public static void main(String[] args) {\n        TimeClock t1 = new TimeClock(10, 75);\n        TimeClock t2 = new TimeClock(150);\n\n        System.out.println(\"Time 1: \" + t1.format());\n        System.out.println(\"Time 2: \" + t2.format());\n    }\n}",
      "output": "Time 1: 11:15\nTime 2: 02:30",
      "explanation": "Constructors can normalize raw inputs so the object's internal representation is always in standard canonical form."
    },
    {
      "id": "ex-oop9-2-8",
      "title": "Temperature Converter Object with Scale Construction",
      "problemStatement": "Build a `Temperature` class with fields `double celsius`. Provide constructors: 1) `Temperature(double degrees, char scale)`: if scale is 'F' or 'f', convert degrees to Celsius via `(degrees - 32) * 5 / 9`; otherwise store degrees directly; 2) `Temperature(double celsius)` which chains to constructor 1 with scale 'C'. Provide methods `toCelsius()` and `toFahrenheit()`. In `main()`, instantiate one temperature with 212 'F' and another with 25 'C', printing both in F and C.",
      "hint": "Constructor 2 calls 'this(celsius, 'C');'. Formula for Fahrenheit: celsius * 9 / 5 + 32.",
      "solutionCode": "public class Solution {\n    static class Temperature {\n        double celsius;\n\n        public Temperature(double degrees, char scale) {\n            if (scale == 'F' || scale == 'f') {\n                this.celsius = (degrees - 32.0) * 5.0 / 9.0;\n            } else {\n                this.celsius = degrees;\n            }\n        }\n\n        public Temperature(double celsius) {\n            this(celsius, 'C');\n        }\n\n        public double toCelsius() {\n            return celsius;\n        }\n\n        public double toFahrenheit() {\n            return celsius * 9.0 / 5.0 + 32.0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Temperature boiling = new Temperature(212, 'F');\n        Temperature room = new Temperature(25.0);\n\n        System.out.printf(\"Boiling: %.1f C | %.1f F%n\", boiling.toCelsius(), boiling.toFahrenheit());\n        System.out.printf(\"Room: %.1f C | %.1f F%n\", room.toCelsius(), room.toFahrenheit());\n    }\n}",
      "output": "Boiling: 100.0 C | 212.0 F\nRoom: 25.0 C | 77.0 F",
      "explanation": "The constructor standardizes the internal representation to Celsius regardless of which unit the caller used."
    },
    {
      "id": "ex-oop9-2-9",
      "title": "Order Item Subtotal and Discount Constructor",
      "problemStatement": "Create an `OrderItem` class with fields `String itemName`, `double unitPrice`, `int quantity`, and `double discountPercent`. Provide: 1) `OrderItem(String itemName, double unitPrice, int quantity)` which chains to 2 with 0.0 discount; 2) `OrderItem(String itemName, double unitPrice, int quantity, double discountPercent)`. Add method `getTotalPrice()` calculating `quantity * unitPrice * (1.0 - discountPercent / 100.0)`. In `main()`, test items with and without discounts.",
      "hint": "Constructor 1 delegates: 'this(itemName, unitPrice, quantity, 0.0);'.",
      "solutionCode": "public class Solution {\n    static class OrderItem {\n        String itemName;\n        double unitPrice;\n        int quantity;\n        double discountPercent;\n\n        public OrderItem(String itemName, double unitPrice, int quantity) {\n            this(itemName, unitPrice, quantity, 0.0);\n        }\n\n        public OrderItem(String itemName, double unitPrice, int quantity, double discountPercent) {\n            this.itemName = itemName;\n            this.unitPrice = unitPrice;\n            this.quantity = quantity;\n            this.discountPercent = discountPercent;\n        }\n\n        public double getTotalPrice() {\n            double subtotal = quantity * unitPrice;\n            return subtotal * (1.0 - discountPercent / 100.0);\n        }\n    }\n\n    public static void main(String[] args) {\n        OrderItem item1 = new OrderItem(\"Wireless Mouse\", 25.00, 2);\n        OrderItem item2 = new OrderItem(\"Gaming Monitor\", 300.00, 1, 15.0); // 15% off\n\n        System.out.printf(\"%s: $%.2f%n\", item1.itemName, item1.getTotalPrice());\n        System.out.printf(\"%s: $%.2f%n\", item2.itemName, item2.getTotalPrice());\n    }\n}",
      "output": "Wireless Mouse: $50.00\nGaming Monitor: $255.00",
      "explanation": "Chaining constructors provides clean defaults for optional parameters like discounts."
    },
    {
      "id": "ex-oop9-2-10",
      "title": "Bank Account with Overdraft Limit Constructor",
      "problemStatement": "Design a `CheckingAccount` class with `String accountId`, `double balance`, and `double overdraftLimit`. Create: 1) `CheckingAccount(String accountId)` defaulting balance to 0.0 and overdraftLimit to 100.0; 2) `CheckingAccount(String accountId, double initialDeposit)` defaulting overdraftLimit to 100.0; 3) `CheckingAccount(String accountId, double initialDeposit, double overdraftLimit)` master constructor. Add `withdraw(double amount)` returning true if balance + overdraftLimit >= amount. In `main()`, test withdrawing 80 from an account with balance 20 and overdraft limit 100.",
      "hint": "Master constructor sets this.accountId, this.balance, and this.overdraftLimit.",
      "solutionCode": "public class Solution {\n    static class CheckingAccount {\n        String accountId;\n        double balance;\n        double overdraftLimit;\n\n        public CheckingAccount(String accountId) {\n            this(accountId, 0.0, 100.0);\n        }\n\n        public CheckingAccount(String accountId, double initialDeposit) {\n            this(accountId, initialDeposit, 100.0);\n        }\n\n        public CheckingAccount(String accountId, double initialDeposit, double overdraftLimit) {\n            this.accountId = accountId;\n            this.balance = initialDeposit;\n            this.overdraftLimit = overdraftLimit;\n        }\n\n        public boolean withdraw(double amount) {\n            if (amount > 0 && (balance + overdraftLimit) >= amount) {\n                balance -= amount;\n                return true;\n            }\n            return false;\n        }\n    }\n\n    public static void main(String[] args) {\n        CheckingAccount acc = new CheckingAccount(\"CHK-505\", 20.0);\n        boolean success = acc.withdraw(80.0);\n        System.out.println(\"Withdrawal successful: \" + success);\n        System.out.printf(\"Remaining balance: $%.2f%n\", acc.balance);\n    }\n}",
      "output": "Withdrawal successful: true\nRemaining balance: $-60.00",
      "explanation": "Constructors initialize both operational parameters and constraint thresholds like overdraft limits."
    }
  ],
  "static-vs-instance-members": [
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
