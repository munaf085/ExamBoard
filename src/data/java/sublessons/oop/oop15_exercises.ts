import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 7: MODERN OOP & MISCELLANEOUS CONCEPTS - EXERCISES
// Total: 51 exercises (10 per sub-lesson + 11 Capstone Challenges)
// Lessons 7.1 to 7.5
// ============================================================

export const oop15Exercises: Record<string, ProgrammingExercise[]> = {
  "java-records": [
    {
      "id": "ex-rec-1",
      "title": "Exercise 1: Basic Record Declaration & Component Accessors",
      "difficulty": "Easy",
      "problemStatement": "Declare a record `Point` with components `int x` and `int y`. In `main()`, instantiate `Point(3, 7)` and print its components using the generated accessor methods `x()` and `y()`, followed by printing the record itself.",
      "hint": "Record accessors use componentName() without 'get'.",
      "solutionCode": "public class Solution {\n    record Point(int x, int y) {}\n    public static void main(String[] args) {\n        Point p = new Point(3, 7);\n        System.out.println(\"x=\" + p.x() + \", y=\" + p.y());\n        System.out.println(p);\n    }\n}",
      "output": "x=3, y=7\nPoint[x=3, y=7]",
      "explanation": "Java Records automatically generate accessor methods matching the component names and an informative toString()."
    },
    {
      "id": "ex-rec-2",
      "title": "Exercise 2: Compact Constructor Validation",
      "difficulty": "Easy",
      "problemStatement": "Define a record `UserAccount` with `String username` and `int age`. Use a compact constructor to validate that `username` is non-null and not blank, and `age` is >= 18. Throw `IllegalArgumentException` with message 'Invalid age' if age is under 18. In `main()`, successfully create and print `UserAccount(\"alice\", 25)` and catch the exception when attempting to create `UserAccount(\"bob\", 15)`.",
      "hint": "A compact constructor omits parameter parentheses: public UserAccount { ... }",
      "solutionCode": "public class Solution {\n    record UserAccount(String username, int age) {\n        public UserAccount {\n            if (username == null || username.isBlank()) throw new IllegalArgumentException(\"Invalid username\");\n            if (age < 18) throw new IllegalArgumentException(\"Invalid age\");\n        }\n    }\n    public static void main(String[] args) {\n        UserAccount u1 = new UserAccount(\"alice\", 25);\n        System.out.println(\"Created: \" + u1.username());\n        try {\n            new UserAccount(\"bob\", 15);\n        } catch (IllegalArgumentException e) {\n            System.out.println(\"Caught: \" + e.getMessage());\n        }\n    }\n}",
      "output": "Created: alice\nCaught: Invalid age",
      "explanation": "Compact constructors allow validating parameters before they are implicitly assigned to the record's final fields."
    },
    {
      "id": "ex-rec-3",
      "title": "Exercise 3: Representation Leak Prevention in Records",
      "difficulty": "Medium",
      "problemStatement": "A record `TagsRecord` contains `String title` and `java.util.List<String> tags`. Prevent representation leaks by making defensive copies in the compact constructor and overriding the `tags()` accessor to return an unmodifiable list. In `main()`, verify that modifying the original list does not alter the record's tags.",
      "hint": "Use List.copyOf() inside the compact constructor and return List.copyOf(tags) in tags().",
      "solutionCode": "import java.util.*;\npublic class Solution {\n    record TagsRecord(String title, List<String> tags) {\n        public TagsRecord {\n            tags = List.copyOf(tags);\n        }\n        @Override\n        public List<String> tags() {\n            return tags;\n        }\n    }\n    public static void main(String[] args) {\n        List<String> mutable = new ArrayList<>(List.of(\"java\", \"oop\"));\n        TagsRecord tr = new TagsRecord(\"Post1\", mutable);\n        mutable.add(\"leaked\");\n        System.out.println(\"Record tags size: \" + tr.tags().size());\n    }\n}",
      "output": "Record tags size: 2",
      "explanation": "List.copyOf() creates an unmodifiable shallow copy, protecting the record's internal state from mutations made to the caller's list."
    },
    {
      "id": "ex-rec-4",
      "title": "Exercise 4: Normalizing Values in Compact Constructor",
      "difficulty": "Easy",
      "problemStatement": "Create a record `Email` with component `String address`. In the compact constructor, trim leading/trailing whitespace and convert the address to lowercase. In `main()`, instantiate with '  Alice@EXAMPLE.com  ' and print `address()`.",
      "hint": "In a compact constructor, reassigning parameter variables updates the value stored in the final field.",
      "solutionCode": "public class Solution {\n    record Email(String address) {\n        public Email {\n            if (address == null) throw new IllegalArgumentException(\"Null address\");\n            address = address.trim().toLowerCase();\n        }\n    }\n    public static void main(String[] args) {\n        Email e = new Email(\"  Alice@EXAMPLE.com  \");\n        System.out.println(e.address());\n    }\n}",
      "output": "alice@example.com",
      "explanation": "Parameter reassignment inside compact constructors transforms the value prior to field assignment."
    },
    {
      "id": "ex-rec-5",
      "title": "Exercise 5: Implementing Interfaces in Records",
      "difficulty": "Medium",
      "problemStatement": "Declare a record `Product(String name, double price)` that implements `Comparable<Product>`. Implement `compareTo` to sort products ascending by price. In `main()`, create two products (Laptop $1200, Mouse $25) and compare them.",
      "hint": "Records cannot extend classes, but can implement interfaces.",
      "solutionCode": "public class Solution {\n    record Product(String name, double price) implements Comparable<Product> {\n        @Override\n        public int compareTo(Product o) {\n            return Double.compare(this.price, o.price);\n        }\n    }\n    public static void main(String[] args) {\n        Product p1 = new Product(\"Mouse\", 25.0);\n        Product p2 = new Product(\"Laptop\", 1200.0);\n        System.out.println(p1.compareTo(p2) < 0 ? \"Mouse is cheaper\" : \"Laptop is cheaper\");\n    }\n}",
      "output": "Mouse is cheaper",
      "explanation": "Records fully support interface implementation, making them ideal for standard Java contracts like Comparable."
    },
    {
      "id": "ex-rec-6",
      "title": "Exercise 6: Static Factory Methods & Additional Instance Methods",
      "difficulty": "Easy",
      "problemStatement": "Create a record `Dimension(int width, int height)`. Add an instance method `int area()` returning width * height, and a static factory method `static Dimension square(int side)` returning a Dimension with equal width and height. In `main()`, create a square with side 6 and print its area.",
      "hint": "Records can declare static methods and instance methods using components directly.",
      "solutionCode": "public class Solution {\n    record Dimension(int width, int height) {\n        public int area() {\n            return width * height;\n        }\n        public static Dimension square(int side) {\n            return new Dimension(side, side);\n        }\n    }\n    public static void main(String[] args) {\n        Dimension d = Dimension.square(6);\n        System.out.println(\"Area: \" + d.area());\n    }\n}",
      "output": "Area: 36",
      "explanation": "Records can contain custom methods and static factory methods for convenient instantiation."
    },
    {
      "id": "ex-rec-7",
      "title": "Exercise 7: Nested Records for Binary Tree Structure",
      "difficulty": "Medium",
      "problemStatement": "Create a record `TreeNode(int value, TreeNode left, TreeNode right)`. In `main()`, build a 3-node tree (root 10, left 5, right 15) and print the sum of root and its children.",
      "hint": "Left or right components can be null for leaf nodes.",
      "solutionCode": "public class Solution {\n    record TreeNode(int value, TreeNode left, TreeNode right) {}\n    public static void main(String[] args) {\n        TreeNode left = new TreeNode(5, null, null);\n        TreeNode right = new TreeNode(15, null, null);\n        TreeNode root = new TreeNode(10, left, right);\n        int sum = root.value() + root.left().value() + root.right().value();\n        System.out.println(\"Tree sum: \" + sum);\n    }\n}",
      "output": "Tree sum: 30",
      "explanation": "Records naturally represent immutable tree data structures."
    },
    {
      "id": "ex-rec-8",
      "title": "Exercise 8: Record Pattern Matching in Switch",
      "difficulty": "Medium",
      "problemStatement": "Given records `Point2D(int x, int y)` and `Circle(Point2D center, int radius)`, write a method `String describe(Object obj)` that uses pattern matching switch to extract and print details. In `main()`, test with a Circle.",
      "hint": "Use switch (obj) with case Circle(var center, var r).",
      "solutionCode": "public class Solution {\n    record Point2D(int x, int y) {}\n    record Circle(Point2D center, int radius) {}\n    public static String describe(Object obj) {\n        return switch (obj) {\n            case Circle(Point2D(var x, var y), var r) -> \"Circle at (\" + x + \",\" + y + \") radius \" + r;\n            case Point2D(var x, var y) -> \"Point at (\" + x + \",\" + y + \")\";\n            default -> \"Unknown\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(describe(new Circle(new Point2D(2, 4), 10)));\n    }\n}",
      "output": "Circle at (2,4) radius 10",
      "explanation": "Record deconstruction patterns in Java allow decomposing nested record components directly inside switch cases."
    },
    {
      "id": "ex-rec-9",
      "title": "Exercise 9: Record Equality and Value Semantics",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate that two distinct Record instances with identical component values are equal according to `equals()` and produce identical hashCodes. Create `UserToken(String token, long expiry)`.",
      "hint": "Records synthesize value-based equals() and hashCode() automatically.",
      "solutionCode": "public class Solution {\n    record UserToken(String token, long expiry) {}\n    public static void main(String[] args) {\n        UserToken t1 = new UserToken(\"auth_123\", 9999L);\n        UserToken t2 = new UserToken(\"auth_123\", 9999L);\n        System.out.println(\"equals: \" + t1.equals(t2));\n        System.out.println(\"hashCode equals: \" + (t1.hashCode() == t2.hashCode()));\n    }\n}",
      "output": "equals: true\nhashCode equals: true",
      "explanation": "Records provide value-based equality out of the box, fulfilling the equals and hashCode contract."
    },
    {
      "id": "ex-rec-10",
      "title": "Exercise 10: Custom Canonical Constructor with Explicit Assignments",
      "difficulty": "Medium",
      "problemStatement": "Define record `Temperature(double celsius)`. Instead of a compact constructor, write a full canonical constructor with parameter `(double celsius)` that converts values below absolute zero (-273.15) to -273.15 before assigning to `this.celsius`. In `main()`, instantiate with -300.0 and print `celsius()`.",
      "hint": "In an explicit canonical constructor, you must explicitly assign all fields with this.field = param.",
      "solutionCode": "public class Solution {\n    record Temperature(double celsius) {\n        public Temperature(double celsius) {\n            if (celsius < -273.15) {\n                celsius = -273.15;\n            }\n            this.celsius = celsius;\n        }\n    }\n    public static void main(String[] args) {\n        Temperature t = new Temperature(-300.0);\n        System.out.println(\"Celsius: \" + t.celsius());\n    }\n}",
      "output": "Celsius: -273.15",
      "explanation": "When an explicit canonical constructor is written, all components must be assigned explicitly using this.componentName."
    }
  ],
  "sealed-classes-interfaces": [
    {
      "id": "ex-sealed-1",
      "title": "Exercise 1: Basic Sealed Class with Permitted Subclasses",
      "difficulty": "Easy",
      "problemStatement": "Declare a sealed abstract class `Vehicle` permitting `Car` and `Truck`. Declare `final class Car extends Vehicle` and `final class Truck extends Vehicle`. In `main()`, instantiate both and print their class names.",
      "hint": "Use 'sealed class ... permits ...' and declare direct subclasses 'final'.",
      "solutionCode": "public class Solution {\n    sealed abstract static class Vehicle permits Car, Truck {}\n    final static class Car extends Vehicle {}\n    final static class Truck extends Vehicle {}\n    public static void main(String[] args) {\n        Vehicle v1 = new Car();\n        Vehicle v2 = new Truck();\n        System.out.println(v1.getClass().getSimpleName() + \", \" + v2.getClass().getSimpleName());\n    }\n}",
      "output": "Car, Truck",
      "explanation": "Sealed classes explicitly restrict inheritance to only those classes enumerated in the permits clause."
    },
    {
      "id": "ex-sealed-2",
      "title": "Exercise 2: Sealed Interface with Permitted Records",
      "difficulty": "Easy",
      "problemStatement": "Declare a sealed interface `Command` permitting `StartCommand` and `StopCommand`. Implement both as final records. In `main()`, create instances of each and verify polymorphism.",
      "hint": "Records are implicitly final, satisfying the sealed subclass modifier requirement.",
      "solutionCode": "public class Solution {\n    sealed interface Command permits StartCommand, StopCommand {}\n    final record StartCommand(String app) implements Command {}\n    final record StopCommand(int processId) implements Command {}\n    public static void main(String[] args) {\n        Command c1 = new StartCommand(\"AuthServer\");\n        Command c2 = new StopCommand(1042);\n        System.out.println(\"c1: \" + c1 + \", c2: \" + c2);\n    }\n}",
      "output": "c1: StartCommand[app=AuthServer], c2: StopCommand[processId=1042]",
      "explanation": "Records implementing a sealed interface are naturally final, making them perfect data carriers in bounded hierarchies."
    },
    {
      "id": "ex-sealed-3",
      "title": "Exercise 3: Extending Sealed Classes with non-sealed Modifier",
      "difficulty": "Medium",
      "problemStatement": "Create a sealed interface `Account` permitting `SavingsAccount` and `OpenAccount`. Declare `SavingsAccount` as `final`, and `OpenAccount` as `non-sealed`. Then create a class `SpecialOpenAccount` extending `OpenAccount`. In `main()`, verify `SpecialOpenAccount` instantiates.",
      "hint": "The 'non-sealed' modifier re-opens the inheritance tree for that branch.",
      "solutionCode": "public class Solution {\n    sealed interface Account permits SavingsAccount, OpenAccount {}\n    final static class SavingsAccount implements Account {}\n    non-sealed static class OpenAccount implements Account {}\n    static class SpecialOpenAccount extends OpenAccount {}\n    public static void main(String[] args) {\n        Account acc = new SpecialOpenAccount();\n        System.out.println(\"Instantiated: \" + acc.getClass().getSimpleName());\n    }\n}",
      "output": "Instantiated: SpecialOpenAccount",
      "explanation": "Declaring a permitted subtype 'non-sealed' allows arbitrary downstream classes to extend it."
    },
    {
      "id": "ex-sealed-4",
      "title": "Exercise 4: Exhaustive Pattern Matching Switch Without Default",
      "difficulty": "Medium",
      "problemStatement": "Create a sealed interface `Status` permitting `Success` and `Failure`. Write a method `String message(Status s)` using a switch expression without a 'default' case. In `main()`, evaluate both states.",
      "hint": "Because all permitted subtypes are handled, no default branch is needed.",
      "solutionCode": "public class Solution {\n    sealed interface Status permits Success, Failure {}\n    final record Success(String data) implements Status {}\n    final record Failure(int code) implements Status {}\n    public static String message(Status s) {\n        return switch (s) {\n            case Success succ -> \"OK: \" + succ.data();\n            case Failure fail -> \"Error code: \" + fail.code();\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(message(new Success(\"Connected\")));\n        System.out.println(message(new Failure(404)));\n    }\n}",
      "output": "OK: Connected\nError code: 404",
      "explanation": "The Java compiler proves exhaustiveness for sealed types, eliminating boilerplate default cases."
    },
    {
      "id": "ex-sealed-5",
      "title": "Exercise 5: Modeling an Algebraic Expression Tree with Sealed Types",
      "difficulty": "Medium",
      "problemStatement": "Create a sealed interface `Expr` permitting `Num` and `Add`. Define `final record Num(int val) implements Expr` and `final record Add(Expr left, Expr right) implements Expr`. Write a recursive `int eval(Expr e)` method. In `main()`, evaluate (5 + 10).",
      "hint": "Use switch expression on e to evaluate Num and Add recursively.",
      "solutionCode": "public class Solution {\n    sealed interface Expr permits Num, Add {}\n    final record Num(int val) implements Expr {}\n    final record Add(Expr left, Expr right) implements Expr {}\n    public static int eval(Expr e) {\n        return switch (e) {\n            case Num n -> n.val();\n            case Add a -> eval(a.left()) + eval(a.right());\n        };\n    }\n    public static void main(String[] args) {\n        Expr expr = new Add(new Num(5), new Num(10));\n        System.out.println(\"Result: \" + eval(expr));\n    }\n}",
      "output": "Result: 15",
      "explanation": "Sealed hierarchies combined with records provide first-class support for algebraic data types (ADTs)."
    },
    {
      "id": "ex-sealed-6",
      "title": "Exercise 6: Omitting the 'permits' Clause in Same File",
      "difficulty": "Easy",
      "problemStatement": "Declare a `sealed interface Shape` in the same scope as `final record Circle(double r) implements Shape` and `final record Square(double s) implements Shape` without writing a `permits` clause. In `main()`, instantiate both.",
      "hint": "When all subclasses are in the same source file, javac infers permitted subtypes.",
      "solutionCode": "public class Solution {\n    sealed interface Shape {}\n    final record Circle(double r) implements Shape {}\n    final record Square(double s) implements Shape {}\n    public static void main(String[] args) {\n        Shape s1 = new Circle(3.0);\n        Shape s2 = new Square(4.0);\n        System.out.println(s1 + \" and \" + s2);\n    }\n}",
      "output": "Circle[r=3.0] and Square[s=4.0]",
      "explanation": "When permitted subclasses are defined within the same compilation unit, the permits clause is optional."
    },
    {
      "id": "ex-sealed-7",
      "title": "Exercise 7: Nested Sealed Class Hierarchies",
      "difficulty": "Hard",
      "problemStatement": "Create a sealed interface `Payment` permitting `Card` and `Crypto`. Permitted interface `Card` is itself `sealed` permitting `Visa` and `MasterCard`. Implement `Visa` and `MasterCard` as final records. In `main()`, test polymorphic dispatch.",
      "hint": "A permitted subtype can also be declared sealed, continuing the restricted hierarchy.",
      "solutionCode": "public class Solution {\n    sealed interface Payment permits Card, Crypto {}\n    sealed interface Card extends Payment permits Visa, MasterCard {}\n    final record Visa(String num) implements Card {}\n    final record MasterCard(String num) implements Card {}\n    final record Crypto(String wallet) implements Payment {}\n    public static void main(String[] args) {\n        Card c = new Visa(\"4111\");\n        System.out.println(\"Card payment: \" + c);\n    }\n}",
      "output": "Card payment: Visa[num=4111]",
      "explanation": "Sealed hierarchies can be nested hierarchically, permitting fine-grained domain constraints."
    },
    {
      "id": "ex-sealed-8",
      "title": "Exercise 8: Generic Sealed Result Type",
      "difficulty": "Medium",
      "problemStatement": "Create a generic sealed interface `Result<T>` permitting `Success<T>` and `Failure<T>`. In `main()`, return `Result<Integer>` from a division function and print the outcome.",
      "hint": "Declare sealed interface Result<T> permits Success, Failure.",
      "solutionCode": "public class Solution {\n    sealed interface Result<T> permits Success, Failure {}\n    final record Success<T>(T value) implements Result<T> {}\n    final record Failure<T>(String error) implements Result<T> {}\n    public static Result<Integer> divide(int a, int b) {\n        if (b == 0) return new Failure<>(\"Division by zero\");\n        return new Success<>(a / b);\n    }\n    public static void main(String[] args) {\n        Result<Integer> r1 = divide(10, 2);\n        Result<Integer> r2 = divide(10, 0);\n        System.out.println(r1 instanceof Success ? \"Success: \" + ((Success<Integer>)r1).value() : \"Fail\");\n        System.out.println(r2 instanceof Failure ? \"Error: \" + ((Failure<Integer>)r2).error() : \"OK\");\n    }\n}",
      "output": "Success: 5\nError: Division by zero",
      "explanation": "Generic sealed interfaces allow modeling modern functional error handling in pure Java."
    },
    {
      "id": "ex-sealed-9",
      "title": "Exercise 9: Abstract Method Inheritance in Sealed Hierarchies",
      "difficulty": "Easy",
      "problemStatement": "Create a sealed abstract class `Notification` with abstract method `void send()`. Declare permitted final subclasses `EmailNotif` and `SmsNotif`. In `main()`, store both in an array and invoke `send()`.",
      "hint": "Abstract methods declared in sealed classes must be implemented by permitted concrete subclasses.",
      "solutionCode": "public class Solution {\n    sealed abstract static class Notification permits EmailNotif, SmsNotif {\n        abstract void send();\n    }\n    final static class EmailNotif extends Notification {\n        void send() { System.out.println(\"Sending Email\"); }\n    }\n    final static class SmsNotif extends Notification {\n        void send() { System.out.println(\"Sending SMS\"); }\n    }\n    public static void main(String[] args) {\n        Notification[] notifs = { new EmailNotif(), new SmsNotif() };\n        for (Notification n : notifs) n.send();\n    }\n}",
      "output": "Sending Email\nSending SMS",
      "explanation": "Sealed abstract classes enforce contract fulfillment across all permitted variants."
    },
    {
      "id": "ex-sealed-10",
      "title": "Exercise 10: Pattern Matching with Guard Clauses on Sealed Records",
      "difficulty": "Medium",
      "problemStatement": "Using the sealed `Result<T>` from Exercise 8, write a method that inspects `Result<Integer>` using pattern matching switch with a `when` guard clause: `case Success<Integer>(var v) when v > 100 -> ...`. Test with 150 and 50.",
      "hint": "Use 'case Success(var v) when v > 100 -> ...'.",
      "solutionCode": "public class Solution {\n    sealed interface Result permits Success, Failure {}\n    final record Success(int val) implements Result {}\n    final record Failure(String err) implements Result {}\n    public static String classify(Result r) {\n        return switch (r) {\n            case Success(var v) when v > 100 -> \"High: \" + v;\n            case Success(var v) -> \"Normal: \" + v;\n            case Failure(var e) -> \"Failed: \" + e;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(classify(new Success(150)));\n        System.out.println(classify(new Success(50)));\n    }\n}",
      "output": "High: 150\nNormal: 50",
      "explanation": "Guard clauses (when) refine pattern matching cases while preserving exhaustive type safety."
    }
  ],
  "nested-inner-classes": [
    {
      "id": "ex-inner-1",
      "title": "Exercise 1: Instantiating Non-Static Inner Classes",
      "difficulty": "Easy",
      "problemStatement": "Create class `Car` with private field `String model = \"Tesla\"`. Inside it, define non-static inner class `Engine` with method `void rev()` that prints the car's model + ' engine revving'. In `main()`, instantiate `Car` and create its `Engine` using `car.new Engine()`.",
      "hint": "Non-static inner classes require an enclosing instance: outerRef.new InnerClass().",
      "solutionCode": "public class Solution {\n    static class Car {\n        private String model = \"Tesla\";\n        class Engine {\n            void rev() {\n                System.out.println(model + \" engine revving\");\n            }\n        }\n    }\n    public static void main(String[] args) {\n        Car car = new Car();\n        Car.Engine engine = car.new Engine();\n        engine.rev();\n    }\n}",
      "output": "Tesla engine revving",
      "explanation": "Non-static inner classes directly access private members of the enclosing outer instance."
    },
    {
      "id": "ex-inner-2",
      "title": "Exercise 2: Disambiguating Shadowed Fields with Outer.this",
      "difficulty": "Easy",
      "problemStatement": "Create class `Enclosing` with field `int x = 10`. Inside, define inner class `Nested` with field `int x = 20`. In a method `void show()`, print `x`, `this.x`, and `Enclosing.this.x`. In `main()`, execute `show()`.",
      "hint": "OuterClass.this.field accesses the outer class's shadowed field.",
      "solutionCode": "public class Solution {\n    static class Enclosing {\n        int x = 10;\n        class Nested {\n            int x = 20;\n            void show() {\n                System.out.println(\"Inner: \" + this.x + \", Outer: \" + Enclosing.this.x);\n            }\n        }\n    }\n    public static void main(String[] args) {\n        new Enclosing().new Nested().show();\n    }\n}",
      "output": "Inner: 20, Outer: 10",
      "explanation": "Outer.this explicitly resolves references to the enclosing class when variable names are shadowed."
    },
    {
      "id": "ex-inner-3",
      "title": "Exercise 3: Static Nested Class Instantiation",
      "difficulty": "Easy",
      "problemStatement": "Create class `OuterMath` with static nested class `Vector2D(double x, double y)`. In `main()`, instantiate `Vector2D` directly without creating an `OuterMath` instance and print its components.",
      "hint": "Static nested classes are instantiated with 'new Outer.StaticNested()'.",
      "solutionCode": "public class Solution {\n    static class OuterMath {\n        static class Vector2D {\n            double x, y;\n            public Vector2D(double x, double y) { this.x = x; this.y = y; }\n            public String toString() { return \"(\" + x + \", \" + y + \")\"; }\n        }\n    }\n    public static void main(String[] args) {\n        OuterMath.Vector2D vec = new OuterMath.Vector2D(3.5, 4.5);\n        System.out.println(\"Vector: \" + vec);\n    }\n}",
      "output": "Vector: (3.5, 4.5)",
      "explanation": "Static nested classes do not have an enclosing object reference and are instantiated independently."
    },
    {
      "id": "ex-inner-4",
      "title": "Exercise 4: Local Inner Class Accessing Method Variables",
      "difficulty": "Medium",
      "problemStatement": "Write a method `void process(int multiplier)` containing a local inner class `Calculator` with method `int calc(int val)`. The local class multiplies `val` by `multiplier`. In `main()`, call `process(5)` and compute for val = 4.",
      "hint": "Captured local variables must be final or effectively final.",
      "solutionCode": "public class Solution {\n    public static void process(int multiplier) {\n        class Calculator {\n            int calc(int val) {\n                return val * multiplier;\n            }\n        }\n        Calculator c = new Calculator();\n        System.out.println(\"Result: \" + c.calc(4));\n    }\n    public static void main(String[] args) {\n        process(5);\n    }\n}",
      "output": "Result: 20",
      "explanation": "Local classes inside a method body can capture effectively final method arguments."
    },
    {
      "id": "ex-inner-5",
      "title": "Exercise 5: Anonymous Inner Class Custom Sorting",
      "difficulty": "Easy",
      "problemStatement": "Given an array of Strings `{\"banana\", \"apple\", \"kiwi\"}`, use an anonymous inner class implementing `java.util.Comparator<String>` to sort the strings by length ascending. In `main()`, print the sorted array.",
      "hint": "Use Arrays.sort(arr, new Comparator<String>() { ... }).",
      "solutionCode": "import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        String[] fruits = {\"banana\", \"apple\", \"kiwi\"};\n        Arrays.sort(fruits, new Comparator<String>() {\n            @Override\n            public int compare(String a, String b) {\n                return Integer.compare(a.length(), b.length());\n            }\n        });\n        System.out.println(Arrays.toString(fruits));\n    }\n}",
      "output": "[kiwi, apple, banana]",
      "explanation": "Anonymous inner classes provide one-off concrete implementations of interfaces without formal class declarations."
    },
    {
      "id": "ex-inner-6",
      "title": "Exercise 6: Static Nested Builder Pattern",
      "difficulty": "Medium",
      "problemStatement": "Implement class `HttpClientConfig` with private constructor and fields `String url`, `int timeoutMs`. Implement a `public static class Builder` with fluent methods `url(String)`, `timeoutMs(int)`, and `build()`. In `main()`, construct a config and print it.",
      "hint": "The static nested Builder instantiates the private constructor of HttpClientConfig.",
      "solutionCode": "public class Solution {\n    static class HttpClientConfig {\n        private final String url;\n        private final int timeoutMs;\n        private HttpClientConfig(Builder b) {\n            this.url = b.url;\n            this.timeoutMs = b.timeoutMs;\n        }\n        public static class Builder {\n            private String url = \"localhost\";\n            private int timeoutMs = 1000;\n            public Builder url(String url) { this.url = url; return this; }\n            public Builder timeoutMs(int ms) { this.timeoutMs = ms; return this; }\n            public HttpClientConfig build() { return new HttpClientConfig(this); }\n        }\n        public String toString() { return url + \":\" + timeoutMs + \"ms\"; }\n    }\n    public static void main(String[] args) {\n        HttpClientConfig cfg = new HttpClientConfig.Builder().url(\"https://api.io\").timeoutMs(5000).build();\n        System.out.println(cfg);\n    }\n}",
      "output": "https://api.io:5000ms",
      "explanation": "Static nested classes have full access to private constructors of their enclosing class, enabling the Builder pattern."
    },
    {
      "id": "ex-inner-7",
      "title": "Exercise 7: Private Inner Class Iterator Implementation",
      "difficulty": "Medium",
      "problemStatement": "Create class `IntContainer` holding `int[] data = {1, 2, 3}`. Implement a method `java.util.Iterator<Integer> iterator()` returning an instance of a private non-static inner class `IntIterator`. In `main()`, iterate and print all values.",
      "hint": "The inner iterator accesses data.length and data[cursor] directly via enclosing instance.",
      "solutionCode": "import java.util.Iterator;\npublic class Solution {\n    static class IntContainer {\n        private int[] data = {1, 2, 3};\n        public Iterator<Integer> iterator() {\n            return new IntIterator();\n        }\n        private class IntIterator implements Iterator<Integer> {\n            private int index = 0;\n            public boolean hasNext() { return index < data.length; }\n            public Integer next() { return data[index++]; }\n        }\n    }\n    public static void main(String[] args) {\n        IntContainer c = new IntContainer();\n        Iterator<Integer> it = c.iterator();\n        while (it.hasNext()) System.out.print(it.next() + \" \");\n        System.out.println();\n    }\n}",
      "output": "1 2 3 \n",
      "explanation": "Private inner classes encapsulate implementation details (such as iteration state) while accessing outer private arrays."
    },
    {
      "id": "ex-inner-8",
      "title": "Exercise 8: Inner Class Multi-Level Outer Scope Resolution",
      "difficulty": "Hard",
      "problemStatement": "Create class `TopLevel` with `int a = 1`. Inside, create inner class `Middle` with `int b = 2`. Inside `Middle`, create inner class `Bottom` with method `int sum()` summing `TopLevel.this.a + Middle.this.b`. In `main()`, instantiate and print `sum()`.",
      "hint": "Instantiate using new TopLevel().new Middle().new Bottom().",
      "solutionCode": "public class Solution {\n    static class TopLevel {\n        int a = 1;\n        class Middle {\n            int b = 2;\n            class Bottom {\n                int sum() {\n                    return TopLevel.this.a + Middle.this.b;\n                }\n            }\n        }\n    }\n    public static void main(String[] args) {\n        TopLevel.Middle.Bottom bottom = new TopLevel().new Middle().new Bottom();\n        System.out.println(\"Sum: \" + bottom.sum());\n    }\n}",
      "output": "Sum: 3",
      "explanation": "Deeply nested inner classes maintain explicit reference paths to all ancestor enclosing instances."
    },
    {
      "id": "ex-inner-9",
      "title": "Exercise 9: Memory Leak Remediation Using Static Nested Class",
      "difficulty": "Hard",
      "problemStatement": "Demonstrate the memory leak fix: Replace a non-static inner class `Handler` holding an implicit reference to large outer class `Context` with a static nested class using `java.lang.ref.WeakReference<Context>`. Print 'Handled' when context is alive.",
      "hint": "WeakReference allows the garbage collector to reclaim the enclosing object.",
      "solutionCode": "import java.lang.ref.WeakReference;\npublic class Solution {\n    static class Context {\n        String name = \"AppCtx\";\n    }\n    static class SafeHandler {\n        private final WeakReference<Context> ref;\n        public SafeHandler(Context ctx) { this.ref = new WeakReference<>(ctx); }\n        public void execute() {\n            Context ctx = ref.get();\n            if (ctx != null) System.out.println(\"Handled for \" + ctx.name);\n        }\n    }\n    public static void main(String[] args) {\n        Context ctx = new Context();\n        SafeHandler handler = new SafeHandler(ctx);\n        handler.execute();\n    }\n}",
      "output": "Handled for AppCtx",
      "explanation": "Static nested classes with WeakReferences prevent unintended memory retention of large enclosing objects."
    },
    {
      "id": "ex-inner-10",
      "title": "Exercise 10: Static Nested Interface Implementation",
      "difficulty": "Medium",
      "problemStatement": "Declare class `Button` containing a static nested interface `OnClickListener` with `void onClick()`. Implement a method `void setListener(OnClickListener l)` and `void click()`. In `main()`, trigger the click with a lambda or anonymous class.",
      "hint": "All interfaces declared inside classes are implicitly static.",
      "solutionCode": "public class Solution {\n    static class Button {\n        public interface OnClickListener {\n            void onClick();\n        }\n        private OnClickListener listener;\n        public void setListener(OnClickListener l) { this.listener = l; }\n        public void click() {\n            if (listener != null) listener.onClick();\n        }\n    }\n    public static void main(String[] args) {\n        Button btn = new Button();\n        btn.setListener(() -> System.out.println(\"Button clicked!\"));\n        btn.click();\n    }\n}",
      "output": "Button clicked!",
      "explanation": "Static nested interfaces scope contracts closely to the class they serve without creating instance coupling."
    }
  ],
  "liskov-substitution-principle": [
    {
      "id": "ex-lsp-1",
      "title": "Exercise 1: Refactoring Square-Rectangle to Immutable Records",
      "difficulty": "Easy",
      "problemStatement": "Fix the mutable Square-Rectangle LSP violation by creating a shared interface `Shape2D` with method `int area()`. Implement `Rectangle(int w, int h)` and `Square(int side)` as records implementing `Shape2D`. In `main()`, compute and print the areas of both shapes through a `Shape2D[]` array.",
      "hint": "Abandon inheritance between Square and Rectangle; make them peer implementations of Shape2D.",
      "solutionCode": "public class Solution {\n    interface Shape2D { int area(); }\n    record Rectangle(int w, int h) implements Shape2D {\n        public int area() { return w * h; }\n    }\n    record Square(int side) implements Shape2D {\n        public int area() { return side * side; }\n    }\n    public static void main(String[] args) {\n        Shape2D[] shapes = { new Rectangle(4, 5), new Square(4) };\n        for (Shape2D s : shapes) {\n            System.out.println(s.getClass().getSimpleName() + \" area: \" + s.area());\n        }\n    }\n}",
      "output": "Rectangle area: 20\nSquare area: 16",
      "explanation": "Decoupling Rectangle and Square into sibling implementations of an interface eliminates dimension mutator contract violations."
    },
    {
      "id": "ex-lsp-2",
      "title": "Exercise 2: Checked Exception Covariance Under LSP",
      "difficulty": "Medium",
      "problemStatement": "Create class `BaseLoader` declaring `void load() throws java.io.IOException`. Create subclass `FileLoader` that narrows the exception to `java.io.FileNotFoundException`. In `main()`, invoke `load()` through a `BaseLoader` reference inside a try-catch block catching `IOException`.",
      "hint": "Overriding methods can declare narrower (subclass) checked exceptions.",
      "solutionCode": "import java.io.*;\npublic class Solution {\n    static class BaseLoader {\n        public void load() throws IOException {\n            System.out.println(\"Base loader\");\n        }\n    }\n    static class FileLoader extends BaseLoader {\n        @Override\n        public void load() throws FileNotFoundException {\n            System.out.println(\"File loader\");\n        }\n    }\n    public static void main(String[] args) {\n        BaseLoader loader = new FileLoader();\n        try {\n            loader.load();\n        } catch (IOException e) {\n            System.out.println(\"Caught\");\n        }\n    }\n}",
      "output": "File loader",
      "explanation": "Exception covariance ensures client code written to catch superclass exceptions safely handles subclass exceptions."
    },
    {
      "id": "ex-lsp-3",
      "title": "Exercise 3: Precondition Preservation in Subclasses",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate LSP precondition rule: `BaseDiscount` accepts any purchase amount > 0. A subclass `VipDiscount` must NOT strengthen preconditions by throwing an exception for purchases under $50. Ensure `VipDiscount` handles all purchases > 0 safely. In `main()`, test with $20.",
      "hint": "Subclasses cannot demand stricter inputs than the superclass.",
      "solutionCode": "public class Solution {\n    static class BaseDiscount {\n        public double apply(double amount) {\n            if (amount <= 0) throw new IllegalArgumentException(\"Amount must be positive\");\n            return amount * 0.05;\n        }\n    }\n    static class VipDiscount extends BaseDiscount {\n        @Override\n        public double apply(double amount) {\n            // LSP Compliant: Accepts all valid superclass amounts\n            if (amount <= 0) throw new IllegalArgumentException(\"Amount must be positive\");\n            return amount > 100 ? amount * 0.20 : amount * 0.10;\n        }\n    }\n    public static void main(String[] args) {\n        BaseDiscount d = new VipDiscount();\n        System.out.println(\"Discount for $20: \" + d.apply(20));\n    }\n}",
      "output": "Discount for $20: 2.0",
      "explanation": "Subtypes must accept all valid input ranges established by their supertype."
    },
    {
      "id": "ex-lsp-4",
      "title": "Exercise 4: Eliminating the Refusal Anti-Pattern",
      "difficulty": "Easy",
      "problemStatement": "Refactor a broken bird hierarchy where `Ostrich extends Bird` threw `UnsupportedOperationException` on `fly()`. Define `Bird` with `eat()`, and a sub-interface `FlyingBird` with `fly()`. Implement `Sparrow` (implements `FlyingBird`) and `Ostrich` (implements `Bird`). In `main()`, call their appropriate methods.",
      "hint": "Segregate interfaces so non-flying birds are not forced to refuse fly().",
      "solutionCode": "public class Solution {\n    interface Bird { void eat(); }\n    interface FlyingBird extends Bird { void fly(); }\n    static class Sparrow implements FlyingBird {\n        public void eat() { System.out.println(\"Sparrow eating\"); }\n        public void fly() { System.out.println(\"Sparrow flying\"); }\n    }\n    static class Ostrich implements Bird {\n        public void eat() { System.out.println(\"Ostrich eating\"); }\n    }\n    public static void main(String[] args) {\n        Bird b1 = new Sparrow();\n        Bird b2 = new Ostrich();\n        b1.eat();\n        b2.eat();\n        ((FlyingBird) b1).fly();\n    }\n}",
      "output": "Sparrow eating\nOstrich eating\nSparrow flying",
      "explanation": "Interface segregation ensures classes do not inherit operations they cannot fulfill."
    },
    {
      "id": "ex-lsp-5",
      "title": "Exercise 5: Honoring Supertype Postconditions (No Nulls)",
      "difficulty": "Medium",
      "problemStatement": "Superclass `SearchService` guarantees returning a non-null `java.util.List<String>` (returning empty list if not found). Create `CachedSearchService` that strictly preserves this postcondition by never returning `null`. In `main()`, verify non-empty and empty queries.",
      "hint": "Postconditions cannot be weakened; returning null when empty list was promised breaks callers.",
      "solutionCode": "import java.util.*;\npublic class Solution {\n    static class SearchService {\n        public List<String> search(String query) {\n            return List.of(\"Result1\");\n        }\n    }\n    static class CachedSearchService extends SearchService {\n        @Override\n        public List<String> search(String query) {\n            if (query.isEmpty()) return Collections.emptyList(); // NEVER return null\n            return super.search(query);\n        }\n    }\n    public static void main(String[] args) {\n        SearchService svc = new CachedSearchService();\n        System.out.println(\"Empty query result size: \" + svc.search(\"\").size());\n    }\n}",
      "output": "Empty query result size: 0",
      "explanation": "Preserving postcondition guarantees prevents unexpected NullPointerExceptions at call sites."
    },
    {
      "id": "ex-lsp-6",
      "title": "Exercise 6: Covariant Return Types in Object Builders",
      "difficulty": "Easy",
      "problemStatement": "Class `Document` has subclass `PdfDocument`. Class `DocBuilder` has method `Document build()`. Create `PdfBuilder extends DocBuilder` with covariant return type `PdfDocument build()`. In `main()`, invoke `build()` directly on `PdfBuilder` without casting.",
      "hint": "Subclass can return a more specific subtype in overridden methods.",
      "solutionCode": "public class Solution {\n    static class Document { public String getType() { return \"Generic\"; } }\n    static class PdfDocument extends Document { public String getType() { return \"PDF\"; } }\n    static class DocBuilder {\n        public Document build() { return new Document(); }\n    }\n    static class PdfBuilder extends DocBuilder {\n        @Override\n        public PdfDocument build() { return new PdfDocument(); }\n    }\n    public static void main(String[] args) {\n        PdfBuilder builder = new PdfBuilder();\n        PdfDocument pdf = builder.build(); // No explicit downcast needed!\n        System.out.println(\"Built: \" + pdf.getType());\n    }\n}",
      "output": "Built: PDF",
      "explanation": "Covariant return types maintain LSP while removing clumsy casting from callers."
    },
    {
      "id": "ex-lsp-7",
      "title": "Exercise 7: Invariant Preservation Across Subclasses",
      "difficulty": "Hard",
      "problemStatement": "Class `PositiveCounter` maintains the invariant `count > 0` initialized to 1. Method `decrement()` only decrements if `count > 1`. Ensure subclass `StepCounter` with `stepDown(int step)` cannot violate the invariant `count > 0`. In `main()`, test decrementing past zero.",
      "hint": "Subclasses must strictly protect all superclass state invariants.",
      "solutionCode": "public class Solution {\n    static class PositiveCounter {\n        protected int count = 1;\n        public void decrement() {\n            if (count > 1) count--;\n        }\n        public int getCount() { return count; }\n    }\n    static class StepCounter extends PositiveCounter {\n        public void stepDown(int step) {\n            if (step <= 0) return;\n            count = Math.max(1, count - step); // Invariant preserved: count never < 1\n        }\n    }\n    public static void main(String[] args) {\n        StepCounter sc = new StepCounter();\n        sc.stepDown(10);\n        System.out.println(\"Counter: \" + sc.getCount());\n    }\n}",
      "output": "Counter: 1",
      "explanation": "Subclass operations must never place the object into a state that violates supertype invariants."
    },
    {
      "id": "ex-lsp-8",
      "title": "Exercise 8: Replacing Instanceof Checks with Polymorphism",
      "difficulty": "Medium",
      "problemStatement": "Refactor a procedural method checking `instanceof CreditCard` and `instanceof PayPal` into a clean polymorphic `PaymentMethod.pay(double amount)` interface. In `main()`, process a payment polymorphically.",
      "hint": "Push behavior into the classes rather than inspecting types from the outside.",
      "solutionCode": "public class Solution {\n    interface PaymentMethod {\n        void pay(double amount);\n    }\n    static class CreditCard implements PaymentMethod {\n        public void pay(double amt) { System.out.println(\"Paid $\" + amt + \" with Card\"); }\n    }\n    static class PayPal implements PaymentMethod {\n        public void pay(double amt) { System.out.println(\"Paid $\" + amt + \" with PayPal\"); }\n    }\n    public static void executePayment(PaymentMethod method, double amt) {\n        method.pay(amt);\n    }\n    public static void main(String[] args) {\n        executePayment(new CreditCard(), 75.0);\n        executePayment(new PayPal(), 120.0);\n    }\n}",
      "output": "Paid $75.0 with Card\nPaid $120.0 with PayPal",
      "explanation": "Adhering to LSP eliminates fragile instanceof branching in favor of dynamic method dispatch."
    },
    {
      "id": "ex-lsp-9",
      "title": "Exercise 9: History Constraint Enforcement via Finality",
      "difficulty": "Hard",
      "problemStatement": "Superclass `ImmutableCoordinate` represents an immutable point with `final double x, y`. Protect the history constraint by declaring `ImmutableCoordinate` as `final` so no subclass can introduce mutators or mutable state. In `main()`, verify instance properties.",
      "hint": "Marking classes final prevents malicious or flawed subclasses from violating immutability.",
      "solutionCode": "public class Solution {\n    static final class ImmutableCoordinate {\n        private final double x, y;\n        public ImmutableCoordinate(double x, double y) { this.x = x; this.y = y; }\n        public double x() { return x; }\n        public double y() { return y; }\n    }\n    public static void main(String[] args) {\n        ImmutableCoordinate coord = new ImmutableCoordinate(12.5, 45.8);\n        System.out.println(\"Coord: (\" + coord.x() + \", \" + coord.y() + \")\");\n    }\n}",
      "output": "Coord: (12.5, 45.8)",
      "explanation": "The Liskov history constraint requires that immutable types cannot have mutable subtypes; 'final' guarantees this."
    },
    {
      "id": "ex-lsp-10",
      "title": "Exercise 10: Composition Over Inheritance for Bounded Collections",
      "difficulty": "Hard",
      "problemStatement": "To avoid violating `List` contract (which allows unlimited elements), implement `BoundedQueue<T>` with max capacity using composition around `java.util.ArrayDeque<T>` instead of extending it. In `main()`, enqueue 2 items with max capacity 2, and reject the 3rd.",
      "hint": "Wrap the collection internally rather than inheriting all mutators.",
      "solutionCode": "import java.util.ArrayDeque;\npublic class Solution {\n    static class BoundedQueue<T> {\n        private final ArrayDeque<T> deque = new ArrayDeque<>();\n        private final int capacity;\n        public BoundedQueue(int capacity) { this.capacity = capacity; }\n        public boolean offer(T item) {\n            if (deque.size() >= capacity) return false;\n            return deque.offer(item);\n        }\n        public int size() { return deque.size(); }\n    }\n    public static void main(String[] args) {\n        BoundedQueue<String> q = new BoundedQueue<>(2);\n        System.out.println(\"Added 1: \" + q.offer(\"A\"));\n        System.out.println(\"Added 2: \" + q.offer(\"B\"));\n        System.out.println(\"Added 3: \" + q.offer(\"C\"));\n        System.out.println(\"Size: \" + q.size());\n    }\n}",
      "output": "Added 1: true\nAdded 2: true\nAdded 3: false\nSize: 2",
      "explanation": "Composition allows designing custom contracts without inheriting inappropriate superclass behaviors."
    }
  ],
  "oop-misc-challenge": [
    {
      "id": "ex-oop15-chal-1",
      "title": "Challenge 1: User Registration DTO with Compact Validation",
      "difficulty": "Easy",
      "problemStatement": "Define a record `UserRegistrationDto(String email, String rawPassword, int age)` with a compact constructor that: 1) validates email contains '@', 2) rawPassword has length >= 8, and 3) age >= 13. Throw `IllegalArgumentException` on failure. In `main()`, instantiate a valid user and print the record.",
      "hint": "Use a compact constructor without parentheses.",
      "solutionCode": "public class Solution {\n    record UserRegistrationDto(String email, String rawPassword, int age) {\n        public UserRegistrationDto {\n            if (email == null || !email.contains(\"@\")) throw new IllegalArgumentException(\"Invalid email\");\n            if (rawPassword == null || rawPassword.length() < 8) throw new IllegalArgumentException(\"Password too short\");\n            if (age < 13) throw new IllegalArgumentException(\"Underage\");\n        }\n    }\n    public static void main(String[] args) {\n        UserRegistrationDto dto = new UserRegistrationDto(\"dev@company.org\", \"securePass123\", 24);\n        System.out.println(\"Registered: \" + dto.email() + \" (age \" + dto.age() + \")\");\n    }\n}",
      "output": "Registered: dev@company.org (age 24)",
      "explanation": "Compact constructors provide clean validation boundaries for data transfer objects."
    },
    {
      "id": "ex-oop15-chal-2",
      "title": "Challenge 2: Sealed Notification Dispatch Hierarchy",
      "difficulty": "Easy",
      "problemStatement": "Create a sealed interface `Notification` permitting `EmailNotif` and `SmsNotif`. Implement both as final records. Write a static method `send(Notification n)` using switch expression pattern matching to format the dispatch message. In `main()`, send one of each.",
      "hint": "Records implementing sealed interfaces are implicitly final.",
      "solutionCode": "public class Solution {\n    sealed interface Notification permits EmailNotif, SmsNotif {}\n    final record EmailNotif(String to, String subject) implements Notification {}\n    final record SmsNotif(String phone, String text) implements Notification {}\n    public static String dispatch(Notification n) {\n        return switch (n) {\n            case EmailNotif e -> \"Email sent to \" + e.to();\n            case SmsNotif s -> \"SMS sent to \" + s.phone();\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(dispatch(new EmailNotif(\"user@test.com\", \"Welcome\")));\n        System.out.println(dispatch(new SmsNotif(\"555-0199\", \"Code: 1234\")));\n    }\n}",
      "output": "Email sent to user@test.com\nSMS sent to 555-0199",
      "explanation": "Sealed records enable concise pattern matching dispatch without casting or default branches."
    },
    {
      "id": "ex-oop15-chal-3",
      "title": "Challenge 3: Database Connection Static Nested Builder",
      "difficulty": "Easy",
      "problemStatement": "Implement class `DbConfig` with private fields `host`, `port`, `dbName`. Provide a `public static class Builder` with fluent methods `host(String)`, `port(int)`, `dbName(String)` and `build()`. Set sensible defaults (`localhost`, `5432`, `app_db`). In `main()`, build a config and print it.",
      "hint": "The static nested class accesses the private constructor of DbConfig.",
      "solutionCode": "public class Solution {\n    static class DbConfig {\n        private final String host, dbName;\n        private final int port;\n        private DbConfig(Builder b) {\n            this.host = b.host; this.port = b.port; this.dbName = b.dbName;\n        }\n        public static class Builder {\n            private String host = \"localhost\";\n            private int port = 5432;\n            private String dbName = \"app_db\";\n            public Builder host(String h) { this.host = h; return this; }\n            public Builder port(int p) { this.port = p; return this; }\n            public Builder dbName(String d) { this.dbName = d; return this; }\n            public DbConfig build() { return new DbConfig(this); }\n        }\n        public String toString() { return host + \":\" + port + \"/\" + dbName; }\n    }\n    public static void main(String[] args) {\n        DbConfig cfg = new DbConfig.Builder().host(\"prod.db\").dbName(\"customers\").build();\n        System.out.println(\"Connected to: \" + cfg);\n    }\n}",
      "output": "Connected to: prod.db:5432/customers",
      "explanation": "Static nested builders avoid leaking enclosing instances and ensure immutable construction."
    },
    {
      "id": "ex-oop15-chal-4",
      "title": "Challenge 4: LSP-Compliant Shape Area Calculator",
      "difficulty": "Easy",
      "problemStatement": "Declare interface `Shape` with method `double area()`. Implement `Circle(double radius)` and `Rectangle(double width, double height)` as records. In `main()`, compute total area of an array of shapes.",
      "hint": "Model shapes as peers implementing an interface to satisfy LSP.",
      "solutionCode": "public class Solution {\n    interface Shape { double area(); }\n    record Circle(double radius) implements Shape {\n        public double area() { return Math.PI * radius * radius; }\n    }\n    record Rectangle(double width, double height) implements Shape {\n        public double area() { return width * height; }\n    }\n    public static void main(String[] args) {\n        Shape[] shapes = { new Circle(10.0), new Rectangle(5.0, 4.0) };\n        double total = 0;\n        for (Shape s : shapes) total += s.area();\n        System.out.printf(\"Total area: %.2f\\n\", total);\n    }\n}",
      "output": "Total area: 334.16",
      "explanation": "Polymorphic shapes honor LSP by guaranteeing accurate area computation for all subtypes."
    },
    {
      "id": "ex-oop15-chal-5",
      "title": "Challenge 5: Non-Static Inner Class String Tokenizer",
      "difficulty": "Easy",
      "problemStatement": "Class `Sentence` holds a `String text`. Define non-static inner class `WordIterator` with `boolean hasMoreWords()` and `String nextWord()`. In `main()`, instantiate `Sentence(\"Java OOP is powerful\")` and print each word on a new line.",
      "hint": "The inner iterator splits the enclosing instance's text and tracks its current index.",
      "solutionCode": "public class Solution {\n    static class Sentence {\n        private final String text;\n        public Sentence(String text) { this.text = text; }\n        public WordIterator iterator() { return new WordIterator(); }\n        class WordIterator {\n            private final String[] words = text.split(\" \");\n            private int idx = 0;\n            public boolean hasMoreWords() { return idx < words.length; }\n            public String nextWord() { return words[idx++]; }\n        }\n    }\n    public static void main(String[] args) {\n        Sentence s = new Sentence(\"Java OOP is powerful\");\n        Sentence.WordIterator it = s.iterator();\n        while (it.hasMoreWords()) {\n            System.out.println(it.nextWord());\n        }\n    }\n}",
      "output": "Java\nOOP\nis\npowerful",
      "explanation": "Non-static inner classes easily access the enclosing object's state to provide iterator functionality."
    },
    {
      "id": "ex-oop15-chal-6",
      "title": "Challenge 6: Record Pattern Matching Deconstruction",
      "difficulty": "Easy",
      "problemStatement": "Given record `Transaction(String id, double amount, String currency)`, write a method `String summarize(Transaction t)` using pattern matching: `case Transaction(var id, var amt, var cur) -> ...`. In `main()`, summarize a $99.99 USD transaction.",
      "hint": "Use record pattern syntax inside the switch.",
      "solutionCode": "public class Solution {\n    record Transaction(String id, double amount, String currency) {}\n    public static String summarize(Transaction t) {\n        return switch (t) {\n            case Transaction(var id, var amt, var cur) -> \"Txn \" + id + \": \" + amt + \" \" + cur;\n        };\n    }\n    public static void main(String[] args) {\n        Transaction txn = new Transaction(\"TX-1001\", 99.99, \"USD\");\n        System.out.println(summarize(txn));\n    }\n}",
      "output": "Txn TX-1001: 99.99 USD",
      "explanation": "Record pattern matching deconstructs components into local variables in a single step."
    },
    {
      "id": "ex-oop15-chal-7",
      "title": "Challenge 7: Generic Sealed Result Monad with Pattern Dispatch",
      "difficulty": "Medium",
      "problemStatement": "Build a functional error-handling monad: `sealed interface Try<T> permits Success, Failure`. `Success(T val)` and `Failure(Exception error)`. Add method `T getOrElse(T fallback)` to `Try<T>` using an exhaustive switch expression. In `main()`, test both cases.",
      "hint": "Implement getOrElse using switch (this).",
      "solutionCode": "public class Solution {\n    sealed interface Try<T> permits Success, Failure {\n        default T getOrElse(T fallback) {\n            return switch (this) {\n                case Success<T> s -> s.val();\n                case Failure<T> f -> fallback;\n            };\n        }\n    }\n    final record Success<T>(T val) implements Try<T> {}\n    final record Failure<T>(Exception error) implements Try<T> {}\n    public static void main(String[] args) {\n        Try<String> s = new Success<>(\"Server response\");\n        Try<String> f = new Failure<>(new RuntimeException(\"Timeout\"));\n        System.out.println(s.getOrElse(\"default\"));\n        System.out.println(f.getOrElse(\"default\"));\n    }\n}",
      "output": "Server response\ndefault",
      "explanation": "Default methods on sealed interfaces can leverage exhaustive pattern matching on 'this'."
    },
    {
      "id": "ex-oop15-chal-8",
      "title": "Challenge 8: Memory Leak Auditing & Static Nested Refactoring",
      "difficulty": "Medium",
      "problemStatement": "A system registers listeners for a `Window` class. Refactor `class WindowEventListener` from a non-static inner class to a static nested class holding `WeakReference<Window>` to ensure that unreferenced windows can be reclaimed by GC. In `main()`, demonstrate callback execution.",
      "hint": "Use WeakReference<Window> to break strong enclosing reference.",
      "solutionCode": "import java.lang.ref.WeakReference;\npublic class Solution {\n    static class Window {\n        String title = \"MainWindow\";\n    }\n    static class WindowEventListener {\n        private final WeakReference<Window> windowRef;\n        public WindowEventListener(Window w) {\n            this.windowRef = new WeakReference<>(w);\n        }\n        public void onEvent(String event) {\n            Window w = windowRef.get();\n            if (w != null) {\n                System.out.println(event + \" on \" + w.title);\n            } else {\n                System.out.println(\"Window was collected\");\n            }\n        }\n    }\n    public static void main(String[] args) {\n        Window win = new Window();\n        WindowEventListener listener = new WindowEventListener(win);\n        listener.onEvent(\"Resize\");\n    }\n}",
      "output": "Resize on MainWindow",
      "explanation": "Static nested listener classes avoid accidental lifetime retention of UI contexts."
    },
    {
      "id": "ex-oop15-chal-9",
      "title": "Challenge 9: LSP-Compliant Bank Account Invariants",
      "difficulty": "Medium",
      "problemStatement": "Design a bank account hierarchy satisfying LSP: `abstract class Account` with `deposit(double)` and `withdraw(double)`. `CheckingAccount` allows overdraft down to -$500, but guarantees that balance is never below -$500. `SavingsAccount` guarantees balance is never < 0. Verify invariant preservation in `main()`.",
      "hint": "Both classes must honor the superclass contract without breaking expectations of non-negative deposits or withdrawal limits.",
      "solutionCode": "public class Solution {\n    abstract static class Account {\n        protected double balance;\n        public Account(double balance) { this.balance = balance; }\n        public void deposit(double amt) {\n            if (amt <= 0) throw new IllegalArgumentException(\"Deposit must be positive\");\n            balance += amt;\n        }\n        public abstract boolean withdraw(double amt);\n        public double getBalance() { return balance; }\n    }\n    static class SavingsAccount extends Account {\n        public SavingsAccount(double bal) { super(bal); }\n        public boolean withdraw(double amt) {\n            if (amt <= 0 || balance < amt) return false;\n            balance -= amt;\n            return true;\n        }\n    }\n    static class CheckingAccount extends Account {\n        public CheckingAccount(double bal) { super(bal); }\n        public boolean withdraw(double amt) {\n            if (amt <= 0 || (balance - amt) < -500.0) return false;\n            balance -= amt;\n            return true;\n        }\n    }\n    public static void main(String[] args) {\n        Account s = new SavingsAccount(100.0);\n        Account c = new CheckingAccount(100.0);\n        System.out.println(\"Savings withdraw $150: \" + s.withdraw(150.0));\n        System.out.println(\"Checking withdraw $150: \" + c.withdraw(150.0));\n        System.out.println(\"Checking balance: $\" + c.getBalance());\n    }\n}",
      "output": "Savings withdraw $150: false\nChecking withdraw $150: true\nChecking balance: $-50.0",
      "explanation": "Both accounts maintain their specific state invariants while respecting the contract of the base Account."
    },
    {
      "id": "ex-oop15-chal-10",
      "title": "Challenge 10: Algebraic AST Calculator with Sealed Records",
      "difficulty": "Hard",
      "problemStatement": "Build a complete algebraic expression tree: `sealed interface Expr permits Constant, Add, Multiply, Divide`. Implement all 4 as final records. Write a recursive evaluator `double evaluate(Expr e)` handling division by zero with `ArithmeticException`. In `main()`, evaluate `(10 + 5) * (8 / 2)`.",
      "hint": "Use pattern matching switch with exhaustive cases.",
      "solutionCode": "public class Solution {\n    sealed interface Expr permits Constant, Add, Multiply, Divide {}\n    final record Constant(double val) implements Expr {}\n    final record Add(Expr left, Expr right) implements Expr {}\n    final record Multiply(Expr left, Expr right) implements Expr {}\n    final record Divide(Expr left, Expr right) implements Expr {}\n\n    public static double evaluate(Expr e) {\n        return switch (e) {\n            case Constant c -> c.val();\n            case Add a -> evaluate(a.left()) + evaluate(a.right());\n            case Multiply m -> evaluate(m.left()) * evaluate(m.right());\n            case Divide d -> {\n                double denom = evaluate(d.right());\n                if (denom == 0) throw new ArithmeticException(\"Divide by zero\");\n                yield evaluate(d.left()) / denom;\n            }\n        };\n    }\n    public static void main(String[] args) {\n        Expr expr = new Multiply(\n            new Add(new Constant(10), new Constant(5)),\n            new Divide(new Constant(8), new Constant(2))\n        );\n        System.out.println(\"Result: \" + evaluate(expr));\n    }\n}",
      "output": "Result: 60.0",
      "explanation": "Sealed records and switch expressions form an elegant interpreter pattern for abstract syntax trees."
    },
    {
      "id": "ex-oop15-chal-11",
      "title": "Challenge 11: Immutable Event Sourcing Store with Sealed Records",
      "difficulty": "Hard",
      "problemStatement": "Implement an event-sourced domain model: `sealed interface OrderEvent permits OrderCreated, ItemAdded, OrderPaid`. Implement all as records. Implement `OrderAggregate` that stores an immutable `List<OrderEvent>` and a method `OrderAggregate apply(OrderEvent event)` returning a new instance with updated total and items. In `main()`, apply three events sequentially and print final total.",
      "hint": "Return new OrderAggregate(events, newTotal) to maintain immutability.",
      "solutionCode": "import java.util.*;\npublic class Solution {\n    sealed interface OrderEvent permits OrderCreated, ItemAdded, OrderPaid {}\n    final record OrderCreated(String orderId) implements OrderEvent {}\n    final record ItemAdded(String item, double price) implements OrderEvent {}\n    final record OrderPaid(double amount) implements OrderEvent {}\n\n    static class OrderAggregate {\n        private final List<OrderEvent> history;\n        private final double totalAmount;\n        public OrderAggregate() {\n            this.history = List.of();\n            this.totalAmount = 0.0;\n        }\n        private OrderAggregate(List<OrderEvent> history, double totalAmount) {\n            this.history = history;\n            this.totalAmount = totalAmount;\n        }\n        public OrderAggregate apply(OrderEvent event) {\n            List<OrderEvent> next = new ArrayList<>(this.history);\n            next.add(event);\n            double nextTotal = switch (event) {\n                case ItemAdded i -> this.totalAmount + i.price();\n                default -> this.totalAmount;\n            };\n            return new OrderAggregate(List.copyOf(next), nextTotal);\n        }\n        public double getTotal() { return totalAmount; }\n    }\n\n    public static void main(String[] args) {\n        OrderAggregate order = new OrderAggregate()\n            .apply(new OrderCreated(\"ORD-1\"))\n            .apply(new ItemAdded(\"Book\", 25.0))\n            .apply(new ItemAdded(\"Pen\", 5.0))\n            .apply(new OrderPaid(30.0));\n        System.out.println(\"Order Total: $\" + order.getTotal());\n    }\n}",
      "output": "Order Total: $30.0",
      "explanation": "Sealed records provide zero-overhead, audit-safe immutable domain events in CQRS and Event Sourcing architectures."
    }
  ]
};
