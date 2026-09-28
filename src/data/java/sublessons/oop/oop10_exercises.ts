import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 12: ENCAPSULATION & DATA HIDING - PROGRAMMING EXERCISES
// 3 Focused, high-impact, beginner-friendly exercises per sub-lesson
// Designed to reinforce the specific concepts of each lesson
// ============================================================

export const oop10Exercises: Record<string, ProgrammingExercise[]> = {
  "encapsulation-principles": [
    {
      "id": "ex-oop10-encap-1",
      "title": "Fixing an Insecure Public Field with Encapsulation",
      "difficulty": "Easy",
      "problemStatement": "In an unencapsulated class, public fields allow external code to corrupt data (e.g. setting balance to -5000). Create an encapsulated `BankAccount` class with `private double balance`. Provide a constructor setting initial balance (clamp negative initial balance to 0.0), a `deposit(double amount)` method returning boolean (only accepts amount > 0), a `withdraw(double amount)` method returning boolean (only if amount > 0 and amount <= balance), and `getBalance()`. In `main()`, test invalid deposit (-50), valid deposit (100), overdraft withdraw (200), and valid withdraw (40).",
      "hint": "Make balance private. Check 'amount > 0 && amount <= balance' before deducting in withdraw().",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        private double balance;\n\n        public BankAccount(double initialBalance) {\n            this.balance = (initialBalance >= 0.0) ? initialBalance : 0.0;\n        }\n\n        public boolean deposit(double amount) {\n            if (amount > 0.0) {\n                balance += amount;\n                return true;\n            }\n            return false;\n        }\n\n        public boolean withdraw(double amount) {\n            if (amount > 0.0 && amount <= balance) {\n                balance -= amount;\n                return true;\n            }\n            return false;\n        }\n\n        public double getBalance() {\n            return balance;\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(50.0);\n        System.out.println(\"Deposit -50: \" + acc.deposit(-50.0));\n        System.out.println(\"Deposit 100: \" + acc.deposit(100.0));\n        System.out.println(\"Withdraw 200: \" + acc.withdraw(200.0));\n        System.out.println(\"Withdraw 40: \" + acc.withdraw(40.0));\n        System.out.printf(\"Final Balance: $%.2f%n\", acc.getBalance());\n    }\n}",
      "output": "Deposit -50: false\nDeposit 100: true\nWithdraw 200: false\nWithdraw 40: true\nFinal Balance: $110.00",
      "explanation": "Because balance is private, external code cannot tamper with it directly. All mutations pass through validation guards that preserve the invariant balance >= 0."
    },
    {
      "id": "ex-oop10-encap-2",
      "title": "Thermostat Temperature Boundary Invariant Guard",
      "difficulty": "Easy",
      "problemStatement": "Build a `Thermostat` class with `private double temperature`. The constructor must clamp initial values to the safe range [16.0, 30.0] Celsius. Provide `setTemperature(double temp)`: if temp is within [16.0, 30.0], update the private field and return true; otherwise reject and return false without altering state. Provide `getTemperature()`. In `main()`, test initial 21.0, setting 25.5 (valid), and setting 45.0 (invalid).",
      "hint": "Check condition 'if (temp >= 16.0 && temp <= 30.0)' in setTemperature().",
      "solutionCode": "public class Solution {\n    static class Thermostat {\n        private double temperature;\n\n        public Thermostat(double initialTemp) {\n            if (initialTemp < 16.0) this.temperature = 16.0;\n            else if (initialTemp > 30.0) this.temperature = 30.0;\n            else this.temperature = initialTemp;\n        }\n\n        public boolean setTemperature(double temp) {\n            if (temp >= 16.0 && temp <= 30.0) {\n                this.temperature = temp;\n                return true;\n            }\n            return false;\n        }\n\n        public double getTemperature() {\n            return temperature;\n        }\n    }\n\n    public static void main(String[] args) {\n        Thermostat t = new Thermostat(21.0);\n        System.out.println(\"Initial Temp: \" + t.getTemperature() + \" C\");\n\n        boolean valid = t.setTemperature(25.5);\n        System.out.println(\"Set 25.5C success: \" + valid + \" -> \" + t.getTemperature() + \" C\");\n\n        boolean invalid = t.setTemperature(45.0);\n        System.out.println(\"Set 45.0C success: \" + invalid + \" -> \" + t.getTemperature() + \" C\");\n    }\n}",
      "output": "Initial Temp: 21.0 C\nSet 25.5C success: true -> 25.5 C\nSet 45.0C success: false -> 25.5 C",
      "explanation": "Data hiding protects the physical invariant of the thermostat, ensuring unsafe extreme temperature values are rejected."
    },
    {
      "id": "ex-oop10-encap-3",
      "title": "'Tell, Don't Ask' Domain Operation (Student Exam)",
      "difficulty": "Medium",
      "problemStatement": "In procedural programming, callers ask for fields and compute logic outside. In OOP, tell the object what to do. Create a `StudentExam` class with `private String studentName` and `private int score` (0 to 100). Provide a method `addBonus(int bonus)` that increases score but clamps maximum score to 100. Provide `hasPassed()` returning true if score >= 50. In `main()`, instantiate a student with score 45, check `hasPassed()` (false), add bonus 10 (score becomes 55), check `hasPassed()` (true), add bonus 60 (score clamped to 100).",
      "hint": "Inside addBonus(int bonus), calculate Math.min(100, score + bonus).",
      "solutionCode": "public class Solution {\n    static class StudentExam {\n        private String studentName;\n        private int score;\n\n        public StudentExam(String name, int initialScore) {\n            this.studentName = name;\n            this.score = Math.max(0, Math.min(100, initialScore));\n        }\n\n        public void addBonus(int bonus) {\n            if (bonus > 0) {\n                this.score = Math.min(100, this.score + bonus);\n            }\n        }\n\n        public boolean hasPassed() {\n            return score >= 50;\n        }\n\n        public void displayReport() {\n            System.out.println(studentName + \": Score \" + score + \"/100 | Passed: \" + hasPassed());\n        }\n    }\n\n    public static void main(String[] args) {\n        StudentExam exam = new StudentExam(\"Alex\", 45);\n        exam.displayReport();\n\n        exam.addBonus(10);\n        exam.displayReport();\n\n        exam.addBonus(60);\n        exam.displayReport();\n    }\n}",
      "output": "Alex: Score 45/100 | Passed: false\nAlex: Score 55/100 | Passed: true\nAlex: Score 100/100 | Passed: true",
      "explanation": "Rather than pulling raw scores out to check passing criteria externally, domain behaviors (addBonus, hasPassed) are cohesive methods inside the class."
    }
  ],
  "access-modifiers-deep-dive": [
    {
      "id": "ex-oop10-access-1",
      "title": "Private Field vs Public Verification Method",
      "difficulty": "Easy",
      "problemStatement": "Declare a `SafeBox` class with a `private int pinCode = 9988;`. Provide a public method `boolean unlock(int attempt)` that returns true if attempt matches pinCode, and false otherwise. In `main()`, instantiate `SafeBox` and test unlocking with 1234 and with 9988. Explain why attempting `box.pinCode` from `main()` causes a compile-time error.",
      "hint": "The 'private' modifier restricts visibility exclusively to the declaring class body.",
      "solutionCode": "public class Solution {\n    static class SafeBox {\n        private int pinCode = 9988;\n\n        public boolean unlock(int attempt) {\n            return attempt == this.pinCode;\n        }\n    }\n\n    public static void main(String[] args) {\n        SafeBox box = new SafeBox();\n\n        System.out.println(\"Unlock with 1234: \" + box.unlock(1234));\n        System.out.println(\"Unlock with 9988: \" + box.unlock(9988));\n        // System.out.println(box.pinCode); // ERROR: pinCode has private access in SafeBox\n    }\n}",
      "output": "Unlock with 1234: false\nUnlock with 9988: true",
      "explanation": "Private fields cannot be read or modified by any outside class, guaranteeing secret credentials cannot be extracted."
    },
    {
      "id": "ex-oop10-access-2",
      "title": "Package-Private (Default) Internal Helper vs Public API",
      "difficulty": "Easy",
      "problemStatement": "Create a `PaymentService` class with a package-private helper method `void auditLog(String message)` (no modifier keyword) and a public method `void makePayment(String user, double amount)`. In `makePayment()`, validate amount > 0, execute the payment, and invoke the internal `auditLog()` helper. In `main()`, invoke `makePayment()` with valid and invalid amounts.",
      "hint": "Default access (package-private) has NO access keyword and allows sharing code among package collaborators.",
      "solutionCode": "public class Solution {\n    static class PaymentService {\n        // Package-private internal helper (no keyword)\n        void auditLog(String message) {\n            System.out.println(\"[AUDIT] \" + message);\n        }\n\n        // Public API accessible everywhere\n        public void makePayment(String user, double amount) {\n            if (amount > 0) {\n                auditLog(\"Payment approved for \" + user + \": $\" + amount);\n            } else {\n                auditLog(\"Payment declined for \" + user + \": Invalid amount $\" + amount);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        PaymentService service = new PaymentService();\n        service.makePayment(\"Alice\", 75.0);\n        service.makePayment(\"Bob\", -20.0);\n    }\n}",
      "output": "[AUDIT] Payment approved for Alice: $75.0\n[AUDIT] Payment declined for Bob: Invalid amount $-20.0",
      "explanation": "Public methods form the outward-facing contract, while package-private methods keep internal helper routines invisible to external consumers."
    },
    {
      "id": "ex-oop10-access-3",
      "title": "Protected Scope for Inheritance Specialization",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate the 'protected' access modifier in an inheritance relationship. Create a base class `Vehicle` with `protected String model;` and `protected int year;`. Create a derived subclass `ElectricCar` that extends `Vehicle`, accepts model, year, and `batteryCapacity` in its constructor, and provides a method `displayVehicleCard()` that directly accesses inherited protected fields `model` and `year`. In `main()`, instantiate `ElectricCar` and display the card.",
      "hint": "Protected members are inherited directly by subclasses and accessible within the same package.",
      "solutionCode": "public class Solution {\n    static class Vehicle {\n        protected String model;\n        protected int year;\n\n        public Vehicle(String model, int year) {\n            this.model = model;\n            this.year = year;\n        }\n    }\n\n    static class ElectricCar extends Vehicle {\n        private int batteryKwh;\n\n        public ElectricCar(String model, int year, int batteryKwh) {\n            super(model, year);\n            this.batteryKwh = batteryKwh;\n        }\n\n        public void displayVehicleCard() {\n            // Directly accessing protected fields from superclass\n            System.out.println(year + \" \" + model + \" (\" + batteryKwh + \" kWh Battery)\");\n        }\n    }\n\n    public static void main(String[] args) {\n        ElectricCar car = new ElectricCar(\"Tesla Model 3\", 2024, 75);\n        car.displayVehicleCard();\n    }\n}",
      "output": "2024 Tesla Model 3 (75 kWh Battery)",
      "explanation": "Protected access opens an inheritance bridge, allowing subclasses to access parent state directly while shielding it from unrelated classes."
    }
  ],
  "getters-setters-defensive-copying": [
    {
      "id": "ex-oop10-gs-1",
      "title": "Standard JavaBean Accessors with Input Validation",
      "difficulty": "Easy",
      "problemStatement": "Create a `UserAccount` class following JavaBeans conventions: `private String username;` and `private boolean active;`. Implement `getUsername()`, `setUsername(String name)` (rejects null or blank strings), `isActive()`, and `setActive(boolean active)`. In `main()`, instantiate an account, test setting a valid username, setting an invalid blank username, and toggling active status.",
      "hint": "Boolean getters use the 'isProperty()' convention (e.g. isActive()). Check 'name != null && !name.trim().isEmpty()'.",
      "solutionCode": "public class Solution {\n    static class UserAccount {\n        private String username = \"Anonymous\";\n        private boolean active = true;\n\n        public String getUsername() {\n            return username;\n        }\n\n        public boolean setUsername(String name) {\n            if (name != null && !name.trim().isEmpty()) {\n                this.username = name.trim();\n                return true;\n            }\n            return false;\n        }\n\n        public boolean isActive() {\n            return active;\n        }\n\n        public void setActive(boolean active) {\n            this.active = active;\n        }\n    }\n\n    public static void main(String[] args) {\n        UserAccount acc = new UserAccount();\n        System.out.println(\"Default: \" + acc.getUsername() + \" | Active: \" + acc.isActive());\n\n        acc.setUsername(\"coder_99\");\n        System.out.println(\"Updated: \" + acc.getUsername());\n\n        boolean invalidSet = acc.setUsername(\"   \");\n        System.out.println(\"Blank set success: \" + invalidSet + \" | Name: \" + acc.getUsername());\n\n        acc.setActive(false);\n        System.out.println(\"Final Active Status: \" + acc.isActive());\n    }\n}",
      "output": "Default: Anonymous | Active: true\nUpdated: coder_99\nBlank set success: false | Name: coder_99\nFinal Active Status: false",
      "explanation": "JavaBeans conventions specify getX() for general types, isX() for booleans, and setX() with validation guards to prevent bad data."
    },
    {
      "id": "ex-oop10-gs-2",
      "title": "The Representation Exposure Trap (Mutable Array Leak)",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate why returning a mutable reference breaks encapsulation. Create an `InsecureGradeBook` class with `private int[] grades;`. Implement a constructor and an insecure getter `public int[] getGrades() { return grades; }`. In `main()`, instantiate the grade book with {90, 85, 95}. Have caller code retrieve the array and modify `leaked[0] = 0;`. Print the internal grades to reveal that the private field was silently corrupted from outside!",
      "hint": "Returning 'this.grades' returns the memory address of the private array, allowing the caller to modify internal state directly.",
      "solutionCode": "public class Solution {\n    static class InsecureGradeBook {\n        private int[] grades;\n\n        public InsecureGradeBook(int[] input) {\n            this.grades = input; // Insecure: shared reference\n        }\n\n        public int[] getGrades() {\n            return grades; // INSECURE LEAK: returns direct pointer\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] initial = {90, 85, 95};\n        InsecureGradeBook book = new InsecureGradeBook(initial);\n\n        // External attack: mutate the returned reference\n        int[] leaked = book.getGrades();\n        leaked[0] = 0; // Malicious external mutation!\n\n        System.out.println(\"Leaked GradeBook grade[0]: \" + book.getGrades()[0]);\n        System.out.println(\"Encapsulation was shattered: Private field mutated to 0 without calling any setter!\");\n    }\n}",
      "output": "Leaked GradeBook grade[0]: 0\nEncapsulation was shattered: Private field mutated to 0 without calling any setter!",
      "explanation": "When a getter returns a direct reference to a mutable object, external callers can modify internal state directly, completely bypassing data hiding."
    },
    {
      "id": "ex-oop10-gs-3",
      "title": "Defensive Copying in Constructor and Getter",
      "difficulty": "Medium",
      "problemStatement": "Fix the vulnerability from the previous exercise by applying Defensive Copying. Create a `SecureGradeBook` class with `private int[] grades;`. In the constructor, clone the inbound array: `this.grades = input.clone();`. In `getGrades()`, return a clone: `return grades.clone();`. In `main()`, repeat the attack by modifying the original array and the array returned from `getGrades()`. Verify that the internal grade book data remains completely protected ({90, 85, 95}).",
      "hint": "Use 'input.clone()' in constructor and 'grades.clone()' in getter.",
      "solutionCode": "public class Solution {\n    static class SecureGradeBook {\n        private int[] grades;\n\n        public SecureGradeBook(int[] input) {\n            // Inbound defensive copy\n            this.grades = (input != null) ? input.clone() : new int[0];\n        }\n\n        public int[] getGrades() {\n            // Outbound defensive copy\n            return grades.clone();\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] initial = {90, 85, 95};\n        SecureGradeBook book = new SecureGradeBook(initial);\n\n        // Attack 1: Modify input array after passing to constructor\n        initial[0] = 0;\n\n        // Attack 2: Modify array returned by getter\n        int[] external = book.getGrades();\n        external[1] = 0;\n\n        // Verify internal state remains pristine\n        int[] secure = book.getGrades();\n        System.out.println(\"Protected grades: \" + secure[0] + \", \" + secure[1] + \", \" + secure[2]);\n        System.out.println(\"Defensive copying successfully preserved internal encapsulation!\");\n    }\n}",
      "output": "Protected grades: 90, 85, 95\nDefensive copying successfully preserved internal encapsulation!",
      "explanation": "By cloning mutable objects during constructor intake and getter output, external modifications only affect external copies, never internal class state."
    }
  ],
  "immutable-class-pattern": [
    {
      "id": "ex-oop10-immut-1",
      "title": "Designing a Basic Immutable 2D Point Class",
      "difficulty": "Easy",
      "problemStatement": "Apply the rules of immutability to create a `final class ImmutablePoint`: declare `private final int x;` and `private final int y;`. Provide a constructor to initialize both coordinates, provide getters `getX()` and `getY()`, and provide NO setters. In `main()`, instantiate a point at (15, 30) and print its coordinates. Explain why it is impossible for any code to modify this point after construction.",
      "hint": "Mark both class and fields 'final'. Provide only getters, no setters.",
      "solutionCode": "public class Solution {\n    // 1. Class is final: prevents subclassing\n    public static final class ImmutablePoint {\n        // 2 & 3. Fields are private and final\n        private final int x;\n        private final int y;\n\n        public ImmutablePoint(int x, int y) {\n            this.x = x;\n            this.y = y;\n        }\n\n        // 4. Only accessors, no mutators\n        public int getX() { return x; }\n        public int getY() { return y; }\n\n        public void print() {\n            System.out.println(\"Point: (\" + x + \", \" + y + \")\");\n        }\n    }\n\n    public static void main(String[] args) {\n        ImmutablePoint pt = new ImmutablePoint(15, 30);\n        pt.print();\n        System.out.println(\"X: \" + pt.getX() + \" | Y: \" + pt.getY());\n        // pt.x = 20; // COMPILE ERROR: cannot assign a value to final variable x\n    }\n}",
      "output": "Point: (15, 30)\nX: 15 | Y: 30",
      "explanation": "Because the class is final, fields are private final, and no setters exist, an ImmutablePoint cannot be changed after instantiation."
    },
    {
      "id": "ex-oop10-immut-2",
      "title": "Immutable Class with a Mutable Field (Defensive Copying)",
      "difficulty": "Medium",
      "problemStatement": "Create an immutable class `StudentSnapshot` with `private final String studentId;` and `private final int[] testScores;`. Because arrays are mutable in Java, 'final int[]' only locks the reference, NOT the contents! Apply defensive copying in the constructor (`testScores.clone()`) and in `getTestScores()` (`testScores.clone()`). In `main()`, verify that mutating the external array or getter return array does not alter the average score.",
      "hint": "Use testScores.clone() in both constructor and getter to prevent mutable reference leaks.",
      "solutionCode": "public class Solution {\n    public static final class StudentSnapshot {\n        private final String studentId;\n        private final int[] testScores;\n\n        public StudentSnapshot(String id, int[] scores) {\n            this.studentId = id;\n            // Defensive copy on intake\n            this.testScores = (scores != null) ? scores.clone() : new int[0];\n        }\n\n        public String getStudentId() { return studentId; }\n\n        // Defensive copy on output\n        public int[] getTestScores() {\n            return testScores.clone();\n        }\n\n        public double getAverage() {\n            if (testScores.length == 0) return 0.0;\n            int sum = 0;\n            for (int s : testScores) sum += s;\n            return (double) sum / testScores.length;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] rawScores = {80, 90, 100};\n        StudentSnapshot snapshot = new StudentSnapshot(\"STU-42\", rawScores);\n\n        // Attempt tampering\n        rawScores[0] = 0;\n        snapshot.getTestScores()[1] = 0;\n\n        System.out.printf(\"Student %s Average: %.1f%n\", snapshot.getStudentId(), snapshot.getAverage());\n        System.out.println(\"Snapshot remains 100% immutable!\");\n    }\n}",
      "output": "Student STU-42 Average: 90.0\nSnapshot remains 100% immutable!",
      "explanation": "Defensive copying is mandatory when an immutable class contains mutable references like arrays, preserving immutability throughout the object lifecycle."
    },
    {
      "id": "ex-oop10-immut-3",
      "title": "The Functional 'with-er' Pattern (State Evolution)",
      "difficulty": "Medium",
      "problemStatement": "How do immutable objects update values? By returning a NEW instance! Implement an immutable `Money` class with `private final double amount;` and `private final String currency;`. Provide a method `public Money add(double addAmount)` that returns a NEW `Money` instance with the combined sum. Provide `public Money withCurrency(String newCurrency)` that returns a NEW `Money` instance with the new currency. In `main()`, start with '$100 USD', add 50, and change currency to 'EUR'. Verify original instance never changed.",
      "hint": "Return 'new Money(this.amount + addAmount, this.currency)' instead of modifying fields.",
      "solutionCode": "public class Solution {\n    public static final class Money {\n        private final double amount;\n        private final String currency;\n\n        public Money(double amount, String currency) {\n            this.amount = amount;\n            this.currency = currency;\n        }\n\n        public double getAmount() { return amount; }\n        public String getCurrency() { return currency; }\n\n        // Functional evolution: returns a BRAND-NEW instance\n        public Money add(double addAmount) {\n            return new Money(this.amount + addAmount, this.currency);\n        }\n\n        public Money withCurrency(String newCurrency) {\n            return new Money(this.amount, newCurrency);\n        }\n    }\n\n    public static void main(String[] args) {\n        Money m1 = new Money(100.0, \"USD\");\n        Money m2 = m1.add(50.0); // Creates new Money object\n        Money m3 = m2.withCurrency(\"EUR\"); // Creates another new Money object\n\n        System.out.printf(\"Original m1: $%.2f %s%n\", m1.getAmount(), m1.getCurrency());\n        System.out.printf(\"Added m2:    $%.2f %s%n\", m2.getAmount(), m2.getCurrency());\n        System.out.printf(\"Converted m3: $%.2f %s%n\", m3.getAmount(), m3.getCurrency());\n    }\n}",
      "output": "Original m1: $100.00 USD\nAdded m2:    $150.00 USD\nConverted m3: $150.00 EUR",
      "explanation": "Immutable objects evolve state using functional 'with-er' methods that return brand-new objects, guaranteeing the original instance is never mutated."
    }
  ],
  "encapsulation-challenge": [
    {
      "id": "ex-oop10-chal-1",
      "title": "Capstone Challenge 1: Refactoring an Insecure Bank Account with Full Invariants",
      "difficulty": "Medium",
      "problemStatement": "In an insecure legacy banking class, fields `accountNumber` and `balance` were declared public. External callers corrupted balances with negative values and bypasses. Refactor this into a secure class `SecureBankAccount`: make fields private, initialize in constructor (clamp initial balance >= 0.0), provide `deposit(double amount)` returning boolean (amount > 0), `withdraw(double amount)` returning boolean (amount > 0 && amount <= balance), and read-only getters. In `main()`, test invalid deposit (-50), overdraft withdraw (200 on 100 balance), and valid transactions.",
      "hint": "Enforce invariant 'balance >= 0' by checking conditions inside deposit and withdraw.",
      "solutionCode": "public class Solution {\n    static class SecureBankAccount {\n        private String accountNumber;\n        private double balance;\n\n        public SecureBankAccount(String accNo, double initialBalance) {\n            this.accountNumber = accNo;\n            this.balance = (initialBalance >= 0.0) ? initialBalance : 0.0;\n        }\n\n        public boolean deposit(double amount) {\n            if (amount > 0.0) {\n                balance += amount;\n                return true;\n            }\n            return false;\n        }\n\n        public boolean withdraw(double amount) {\n            if (amount > 0.0 && amount <= balance) {\n                balance -= amount;\n                return true;\n            }\n            return false;\n        }\n\n        public String getAccountNumber() { return accountNumber; }\n        public double getBalance() { return balance; }\n    }\n\n    public static void main(String[] args) {\n        SecureBankAccount acc = new SecureBankAccount(\"ACC-701\", 100.0);\n        System.out.println(\"Deposit -50: \" + acc.deposit(-50.0));\n        System.out.println(\"Withdraw 200: \" + acc.withdraw(200.0));\n        System.out.println(\"Deposit 50: \" + acc.deposit(50.0));\n        System.out.println(\"Withdraw 40: \" + acc.withdraw(40.0));\n        System.out.printf(\"Final Balance: $%.2f%n\", acc.getBalance());\n    }\n}",
      "output": "Deposit -50: false\nWithdraw 200: false\nDeposit 50: true\nWithdraw 40: true\nFinal Balance: $110.00",
      "explanation": "Encapsulating internal state and checking guard conditions in mutators protects class invariants from external corruption."
    },
    {
      "id": "ex-oop10-chal-2",
      "title": "Capstone Challenge 2: Building a Secure Grade Registry with Defensive Copying",
      "difficulty": "Medium",
      "problemStatement": "Build a `SecureGradeRegistry` class holding `private String studentId;` and `private int[] scores;`. To eliminate representation exposure, perform inbound defensive copying in the constructor (`scores.clone()`) and outbound defensive copying in `getScores()` (`scores.clone()`). In `main()`, instantiate with an array `{85, 92, 78}`, mutate the original array, and mutate the array returned by `getScores()`. Verify that the internal registry scores remain completely untouched.",
      "hint": "Use scores.clone() in both constructor and getter.",
      "solutionCode": "public class Solution {\n    static class SecureGradeRegistry {\n        private String studentId;\n        private int[] scores;\n\n        public SecureGradeRegistry(String id, int[] inputScores) {\n            this.studentId = id;\n            // Inbound defensive copy\n            this.scores = (inputScores != null) ? inputScores.clone() : new int[0];\n        }\n\n        // Outbound defensive copy\n        public int[] getScores() {\n            return scores.clone();\n        }\n\n        public double getAverage() {\n            if (scores.length == 0) return 0.0;\n            int sum = 0;\n            for (int s : scores) sum += s;\n            return (double) sum / scores.length;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] raw = {85, 92, 78};\n        SecureGradeRegistry registry = new SecureGradeRegistry(\"S-101\", raw);\n\n        // External tampering attempt\n        raw[0] = 0;\n        registry.getScores()[1] = 0;\n\n        int[] current = registry.getScores();\n        System.out.println(\"Registry Scores: \" + current[0] + \", \" + current[1] + \", \" + current[2]);\n        System.out.printf(\"Registry Average: %.1f%n\", registry.getAverage());\n    }\n}",
      "output": "Registry Scores: 85, 92, 78\nRegistry Average: 85.0",
      "explanation": "Defensive copying in both constructor and getter prevents external callers from corrupting internal mutable array state."
    },
    {
      "id": "ex-oop10-chal-3",
      "title": "Capstone Challenge 3: Production-Grade Immutable Transaction Record",
      "difficulty": "Hard",
      "problemStatement": "Apply all 5 rules of immutability to create a `public static final class ImmutableTransaction`: declare `private final String txId;`, `private final double amount;`, and `private final String[] auditTags;`. Defensively copy auditTags in constructor and in `getAuditTags()`. Provide NO setters. Implement a functional with-er method `public ImmutableTransaction withAdditionalTag(String tag)` that returns a NEW ImmutableTransaction with the tag appended. In `main()`, test creating a transaction and evolving it via `withAdditionalTag()`. Verify the original transaction remained 100% immutable.",
      "hint": "In withAdditionalTag(String tag), allocate a new String[] of length auditTags.length + 1, copy existing tags, append new tag, and return a new instance.",
      "solutionCode": "public class Solution {\n    public static final class ImmutableTransaction {\n        private final String txId;\n        private final double amount;\n        private final String[] auditTags;\n\n        public ImmutableTransaction(String txId, double amount, String[] tags) {\n            this.txId = txId;\n            this.amount = amount;\n            this.auditTags = (tags != null) ? tags.clone() : new String[0];\n        }\n\n        public String getTxId() { return txId; }\n        public double getAmount() { return amount; }\n        public String[] getAuditTags() { return auditTags.clone(); }\n\n        public ImmutableTransaction withAdditionalTag(String newTag) {\n            String[] updated = new String[auditTags.length + 1];\n            System.arraycopy(auditTags, 0, updated, 0, auditTags.length);\n            updated[auditTags.length] = newTag;\n            return new ImmutableTransaction(this.txId, this.amount, updated);\n        }\n    }\n\n    public static void main(String[] args) {\n        String[] initialTags = {\"INIT\", \"VERIFIED\"};\n        ImmutableTransaction t1 = new ImmutableTransaction(\"TX-99\", 250.0, initialTags);\n        ImmutableTransaction t2 = t1.withAdditionalTag(\"AUDITED\");\n\n        System.out.println(\"t1 Tags: \" + java.util.Arrays.toString(t1.getAuditTags()));\n        System.out.println(\"t2 Tags: \" + java.util.Arrays.toString(t2.getAuditTags()));\n        System.out.println(\"t1 is immutable: \" + (t1.getAuditTags().length == 2));\n    }\n}",
      "output": "t1 Tags: [INIT, VERIFIED]\nt2 Tags: [INIT, VERIFIED, AUDITED]\nt1 is immutable: true",
      "explanation": "The immutable class pattern guarantees thread-safe, side-effect-free value objects that evolve state cleanly through functional with-er methods."
    }
  ]
};
