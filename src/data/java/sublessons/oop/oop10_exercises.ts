import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 10: ENCAPSULATION & DATA HIDING - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const oop10Exercises: Record<string, ProgrammingExercise[]> = {
  "encapsulation-principles": [
    {
      "id": "ex-oop10-1-1",
      "title": "Encapsulated Bank Account with Positive Deposit Rule",
      "problemStatement": "Declare a class `BankAccount` with `private double balance`. Provide a constructor setting initial balance (rejecting negative initial values to 0.0), a method `deposit(double amount)` returning boolean success (only accepting amount > 0), a method `withdraw(double amount)` returning boolean success (only if amount > 0 and amount <= balance), and `getBalance()`. In `main()`, test depositing -50, depositing 100, withdrawing 150, and withdrawing 40.",
      "hint": "Private field: 'private double balance;'. Validation guards in deposit() and withdraw().",
      "solutionCode": "public class Solution {\n    static class BankAccount {\n        private double balance;\n\n        public BankAccount(double initialBalance) {\n            this.balance = (initialBalance >= 0.0) ? initialBalance : 0.0;\n        }\n\n        public boolean deposit(double amount) {\n            if (amount > 0.0) {\n                balance += amount;\n                return true;\n            }\n            return false;\n        }\n\n        public boolean withdraw(double amount) {\n            if (amount > 0.0 && amount <= balance) {\n                balance -= amount;\n                return true;\n            }\n            return false;\n        }\n\n        public double getBalance() {\n            return balance;\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(50.0);\n        System.out.println(\"Deposit -50: \" + acc.deposit(-50.0));\n        System.out.println(\"Deposit 100: \" + acc.deposit(100.0));\n        System.out.println(\"Withdraw 150: \" + acc.withdraw(150.0));\n        System.out.println(\"Withdraw 40: \" + acc.withdraw(40.0));\n        System.out.printf(\"Final Balance: $%.2f%n\", acc.getBalance());\n    }\n}",
      "output": "Deposit -50: false\nDeposit 100: true\nWithdraw 150: false\nWithdraw 40: true\nFinal Balance: $110.00",
      "explanation": "The private field balance cannot be corrupted from the outside; deposit and withdraw methods act as strict validation gatekeepers."
    },
    {
      "id": "ex-oop10-1-2",
      "title": "Thermostat Temperature Clamping Guard",
      "problemStatement": "Build a `Thermostat` class with `private double targetTemp`. Provide a constructor taking initial temperature and clamping it between 60.0 and 85.0. Provide `setTargetTemp(double temp)` returning boolean: if temp is within [60.0, 85.0], update and return true; otherwise reject and return false. In `main()`, test initial 72.0, setting 80.0, and setting 95.0.",
      "hint": "Check condition 'if (temp >= 60.0 && temp <= 85.0)'.",
      "solutionCode": "public class Solution {\n    static class Thermostat {\n        private double targetTemp;\n\n        public Thermostat(double initialTemp) {\n            if (initialTemp < 60.0) this.targetTemp = 60.0;\n            else if (initialTemp > 85.0) this.targetTemp = 85.0;\n            else this.targetTemp = initialTemp;\n        }\n\n        public boolean setTargetTemp(double temp) {\n            if (temp >= 60.0 && temp <= 85.0) {\n                this.targetTemp = temp;\n                return true;\n            }\n            return false;\n        }\n\n        public double getTargetTemp() {\n            return targetTemp;\n        }\n    }\n\n    public static void main(String[] args) {\n        Thermostat t = new Thermostat(72.0);\n        System.out.println(\"Initial: \" + t.getTargetTemp());\n        System.out.println(\"Set 80.0: \" + t.setTargetTemp(80.0) + \" -> \" + t.getTargetTemp());\n        System.out.println(\"Set 95.0: \" + t.setTargetTemp(95.0) + \" -> \" + t.getTargetTemp());\n    }\n}",
      "output": "Initial: 72.0\nSet 80.0: true -> 80.0\nSet 95.0: false -> 80.0",
      "explanation": "Guarding the setter ensures the thermostat can never be forced into unsafe extreme temperatures."
    },
    {
      "id": "ex-oop10-1-3",
      "title": "User Age Verification and Invariant Protection",
      "problemStatement": "Design a `UserProfile` class with `private String username` and `private int age`. The constructor requires a non-null username and an age between 13 and 120 (defaults age to 13 if invalid). Provide `setAge(int age)` that updates only if 13 <= age <= 120. Provide getters. In `main()`, instantiate an account with age 10 (normalized to 13), try setting age to 25, then try setting age to 150.",
      "hint": "Normalize age in constructor: 'this.age = (age >= 13 && age <= 120) ? age : 13;'.",
      "solutionCode": "public class Solution {\n    static class UserProfile {\n        private String username;\n        private int age;\n\n        public UserProfile(String username, int age) {\n            this.username = (username != null) ? username : \"Anonymous\";\n            this.age = (age >= 13 && age <= 120) ? age : 13;\n        }\n\n        public boolean setAge(int age) {\n            if (age >= 13 && age <= 120) {\n                this.age = age;\n                return true;\n            }\n            return false;\n        }\n\n        public String getUsername() { return username; }\n        public int getAge() { return age; }\n    }\n\n    public static void main(String[] args) {\n        UserProfile p = new UserProfile(\"tech_fan\", 10);\n        System.out.println(p.getUsername() + \" initial age: \" + p.getAge());\n\n        System.out.println(\"Set age 25: \" + p.setAge(25) + \" -> \" + p.getAge());\n        System.out.println(\"Set age 150: \" + p.setAge(150) + \" -> \" + p.getAge());\n    }\n}",
      "output": "tech_fan initial age: 13\nSet age 25: true -> 25\nSet age 150: false -> 25",
      "explanation": "The class invariant 13 <= age <= 120 is strictly preserved both during construction and throughout all mutator operations."
    },
    {
      "id": "ex-oop10-1-4",
      "title": "Step Counter with Monotonic Increment Constraint",
      "problemStatement": "Create a `StepTracker` class with `private int totalSteps = 0`. Provide a method `addSteps(int steps)`: steps can only increase, so negative or zero steps are rejected. Provide `resetDaily()` that sets steps to 0, and `getSteps()`. In `main()`, add 2500 steps, attempt to add -300 steps, add 4000 steps, and display final step count.",
      "hint": "In addSteps(int steps), check 'if (steps > 0) totalSteps += steps;'.",
      "solutionCode": "public class Solution {\n    static class StepTracker {\n        private int totalSteps = 0;\n\n        public boolean addSteps(int steps) {\n            if (steps > 0) {\n                totalSteps += steps;\n                return true;\n            }\n            return false;\n        }\n\n        public void resetDaily() {\n            totalSteps = 0;\n        }\n\n        public int getSteps() {\n            return totalSteps;\n        }\n    }\n\n    public static void main(String[] args) {\n        StepTracker tracker = new StepTracker();\n        tracker.addSteps(2500);\n        boolean negSuccess = tracker.addSteps(-300);\n        tracker.addSteps(4000);\n\n        System.out.println(\"Negative add success: \" + negSuccess);\n        System.out.println(\"Total Steps Today: \" + tracker.getSteps());\n    }\n}",
      "output": "Negative add success: false\nTotal Steps Today: 6500",
      "explanation": "Encapsulating the step counter enforces monotonic growth and prevents backward step corruption."
    },
    {
      "id": "ex-oop10-1-5",
      "title": "Car Fuel Tank Capacity Enforcer",
      "problemStatement": "Build a `FuelTank` class with `private double currentGallons` and `private final double capacityGallons`. Provide a constructor `FuelTank(double capacity)` (defaults to 15.0 if capacity <= 0). Provide `addFuel(double amount)` which adds fuel up to capacity, returning the actual gallons added (clamped if tank fills). Provide `consumeFuel(double amount)` which deducts fuel if enough exists, returning boolean. In `main()`, create a 12.0 gal tank, add 15.0 gal, and print results.",
      "hint": "Calculate spaceAvailable = capacityGallons - currentGallons; added = Math.min(amount, spaceAvailable).",
      "solutionCode": "public class Solution {\n    static class FuelTank {\n        private double currentGallons;\n        private final double capacityGallons;\n\n        public FuelTank(double capacity) {\n            this.capacityGallons = (capacity > 0.0) ? capacity : 15.0;\n            this.currentGallons = 0.0;\n        }\n\n        public double addFuel(double amount) {\n            if (amount <= 0.0) return 0.0;\n            double space = capacityGallons - currentGallons;\n            double actualAdded = Math.min(amount, space);\n            currentGallons += actualAdded;\n            return actualAdded;\n        }\n\n        public boolean consumeFuel(double amount) {\n            if (amount > 0.0 && amount <= currentGallons) {\n                currentGallons -= amount;\n                return true;\n            }\n            return false;\n        }\n\n        public double getCurrentGallons() { return currentGallons; }\n        public double getCapacity() { return capacityGallons; }\n    }\n\n    public static void main(String[] args) {\n        FuelTank tank = new FuelTank(12.0);\n        double added = tank.addFuel(15.0);\n        System.out.printf(\"Requested 15.0 gal | Added: %.2f gal | Current: %.2f / %.2f gal%n\",\n            added, tank.getCurrentGallons(), tank.getCapacity());\n    }\n}",
      "output": "Requested 15.0 gal | Added: 12.00 gal | Current: 12.00 / 12.00 gal",
      "explanation": "Encapsulation prevents fuel tank overflow by clamping inbound fuel additions to available capacity."
    },
    {
      "id": "ex-oop10-1-6",
      "title": "Password Vault with Controlled Setter Verification",
      "problemStatement": "Create a `PasswordVault` class with `private String passwordHash`. In constructor, accept initial plain password and store simulated hash ('HASH_' + plainPassword). Provide `changePassword(String oldPlain, String newPlain)`: verifies that 'HASH_' + oldPlain matches the current hash, and that newPlain has length >= 8. If both checks pass, update hash and return true. Provide `verifyPassword(String plain)` returning boolean. Do NOT provide any getter for passwordHash. In `main()`, test failed and successful password changes.",
      "hint": "Write-only property: do not expose getPasswordHash(). Verify old password before updating.",
      "solutionCode": "public class Solution {\n    static class PasswordVault {\n        private String passwordHash;\n\n        public PasswordVault(String initialPassword) {\n            this.passwordHash = \"HASH_\" + initialPassword;\n        }\n\n        public boolean changePassword(String oldPlain, String newPlain) {\n            if (newPlain == null || newPlain.length() < 8) {\n                return false;\n            }\n            if ((\"HASH_\" + oldPlain).equals(this.passwordHash)) {\n                this.passwordHash = \"HASH_\" + newPlain;\n                return true;\n            }\n            return false;\n        }\n\n        public boolean verifyPassword(String plain) {\n            return (\"HASH_\" + plain).equals(this.passwordHash);\n        }\n    }\n\n    public static void main(String[] args) {\n        PasswordVault vault = new PasswordVault(\"Secret123\");\n        System.out.println(\"Verify original: \" + vault.verifyPassword(\"Secret123\"));\n\n        boolean badOld = vault.changePassword(\"WrongPass\", \"NewSecret456\");\n        System.out.println(\"Change with bad old: \" + badOld);\n\n        boolean goodChange = vault.changePassword(\"Secret123\", \"NewSecret456\");\n        System.out.println(\"Change with correct old: \" + goodChange);\n        System.out.println(\"Verify new: \" + vault.verifyPassword(\"NewSecret456\"));\n    }\n}",
      "output": "Verify original: true\nChange with bad old: false\nChange with correct old: true\nVerify new: true",
      "explanation": "Data hiding completely conceals the password hash while providing secure verification and change protocols."
    },
    {
      "id": "ex-oop10-1-7",
      "title": "Tell Don't Ask Shopping Cart Item Subtotal",
      "problemStatement": "Demonstrate 'Tell, Don't Ask' by creating a `CartItem` class with `private String name`, `private double unitPrice`, and `private int quantity`. Provide a method `applyBulkDiscount(double discountRate)`: if quantity >= 5, applies discountRate to unitPrice and returns true. Provide `calculateSubtotal()`. In `main()`, create an item with price 20.0 and quantity 6, apply a 0.10 discount, and print subtotal.",
      "hint": "The object computes its own subtotal and applies its own bulk discount internally.",
      "solutionCode": "public class Solution {\n    static class CartItem {\n        private String name;\n        private double unitPrice;\n        private int quantity;\n\n        public CartItem(String name, double unitPrice, int qty) {\n            this.name = name;\n            this.unitPrice = unitPrice;\n            this.quantity = qty;\n        }\n\n        public boolean applyBulkDiscount(double discountRate) {\n            if (quantity >= 5 && discountRate > 0.0 && discountRate < 1.0) {\n                unitPrice -= unitPrice * discountRate;\n                return true;\n            }\n            return false;\n        }\n\n        public double calculateSubtotal() {\n            return unitPrice * quantity;\n        }\n\n        public String getName() { return name; }\n    }\n\n    public static void main(String[] args) {\n        CartItem item = new CartItem(\"Notebook\", 20.0, 6);\n        boolean discounted = item.applyBulkDiscount(0.10); // 10% off\n        System.out.println(\"Bulk discount applied: \" + discounted);\n        System.out.printf(\"Item: %s | Subtotal: $%.2f%n\", item.getName(), item.calculateSubtotal());\n    }\n}",
      "output": "Bulk discount applied: true\nItem: Notebook | Subtotal: $108.00",
      "explanation": "Tell, Don't Ask delegates business math to the object itself rather than extracting price and quantity to calculate outside."
    },
    {
      "id": "ex-oop10-1-8",
      "title": "Student Grade Average Calculator with Private Invariants",
      "problemStatement": "Create a `StudentGradeSummary` class with `private double totalPoints = 0.0` and `private int examCount = 0`. Provide a method `addExamScore(double score)`: accepts only 0.0 <= score <= 100.0. Provide `getAverageScore()`: returns 0.0 if examCount == 0, otherwise totalPoints / examCount. In `main()`, add scores 88.0, 94.0, 78.0, attempt -10.0, and print the calculated average.",
      "hint": "Reject score < 0 or score > 100 inside addExamScore().",
      "solutionCode": "public class Solution {\n    static class StudentGradeSummary {\n        private double totalPoints = 0.0;\n        private int examCount = 0;\n\n        public boolean addExamScore(double score) {\n            if (score >= 0.0 && score <= 100.0) {\n                totalPoints += score;\n                examCount++;\n                return true;\n            }\n            return false;\n        }\n\n        public double getAverageScore() {\n            if (examCount == 0) return 0.0;\n            return totalPoints / examCount;\n        }\n\n        public int getExamCount() { return examCount; }\n    }\n\n    public static void main(String[] args) {\n        StudentGradeSummary summary = new StudentGradeSummary();\n        summary.addExamScore(88.0);\n        summary.addExamScore(94.0);\n        summary.addExamScore(78.0);\n        boolean bad = summary.addExamScore(-10.0);\n\n        System.out.println(\"Invalid score added? \" + bad);\n        System.out.printf(\"Total Exams: %d | Average: %.2f%n\", summary.getExamCount(), summary.getAverageScore());\n    }\n}",
      "output": "Invalid score added? false\nTotal Exams: 3 | Average: 86.67",
      "explanation": "Encapsulation safeguards internal totals and counts so external callers cannot inject invalid exam points."
    },
    {
      "id": "ex-oop10-1-9",
      "title": "Audio Volume Limiter with Mute State",
      "problemStatement": "Design an `AudioController` class with `private int volume` (clamped 0 to 100) and `private boolean muted = false`. Provide: `setVolume(int level)` (clamps between 0 and 100, un-mutes automatically if level > 0), `toggleMute()`, and `getEffectiveVolume()` which returns 0 if muted is true, otherwise volume. In `main()`, set volume to 75, mute it, print effective volume, unmute, and print effective volume.",
      "hint": "In getEffectiveVolume(): return muted ? 0 : volume;",
      "solutionCode": "public class Solution {\n    static class AudioController {\n        private int volume = 50;\n        private boolean muted = false;\n\n        public void setVolume(int level) {\n            this.volume = Math.max(0, Math.min(level, 100));\n            if (this.volume > 0) {\n                this.muted = false;\n            }\n        }\n\n        public void toggleMute() {\n            this.muted = !this.muted;\n        }\n\n        public int getEffectiveVolume() {\n            return muted ? 0 : volume;\n        }\n\n        public boolean isMuted() { return muted; }\n    }\n\n    public static void main(String[] args) {\n        AudioController audio = new AudioController();\n        audio.setVolume(75);\n        System.out.println(\"Volume set to 75 | Effective: \" + audio.getEffectiveVolume());\n\n        audio.toggleMute();\n        System.out.println(\"Muted! | Effective: \" + audio.getEffectiveVolume());\n\n        audio.toggleMute();\n        System.out.println(\"Unmuted! | Effective: \" + audio.getEffectiveVolume());\n    }\n}",
      "output": "Volume set to 75 | Effective: 75\nMuted! | Effective: 0\nUnmuted! | Effective: 75",
      "explanation": "Encapsulation links the state of multiple private fields (volume and muted) through cohesive domain methods."
    },
    {
      "id": "ex-oop10-1-10",
      "title": "Warehouse Inventory Stock Reservation System",
      "problemStatement": "Build a `WarehouseItem` class with `private int onHandStock` and `private int reservedStock`. Provide: `receiveShipment(int qty)` (adds to onHandStock), `reserveStock(int qty)` (moves qty from onHand to reserved if availableOnHand >= qty, where availableOnHand = onHand - reserved), and `getAvailableStock()`. In `main()`, receive 50 items, reserve 20, attempt to reserve 40, and print available stock.",
      "hint": "available = onHandStock - reservedStock. Reserve only if qty <= available.",
      "solutionCode": "public class Solution {\n    static class WarehouseItem {\n        private int onHandStock = 0;\n        private int reservedStock = 0;\n\n        public void receiveShipment(int qty) {\n            if (qty > 0) {\n                onHandStock += qty;\n            }\n        }\n\n        public boolean reserveStock(int qty) {\n            int available = onHandStock - reservedStock;\n            if (qty > 0 && qty <= available) {\n                reservedStock += qty;\n                return true;\n            }\n            return false;\n        }\n\n        public int getAvailableStock() {\n            return onHandStock - reservedStock;\n        }\n\n        public int getReservedStock() { return reservedStock; }\n    }\n\n    public static void main(String[] args) {\n        WarehouseItem item = new WarehouseItem();\n        item.receiveShipment(50);\n        System.out.println(\"Initial Available: \" + item.getAvailableStock());\n\n        boolean r1 = item.reserveStock(20);\n        System.out.println(\"Reserve 20: \" + r1 + \" | Available: \" + item.getAvailableStock());\n\n        boolean r2 = item.reserveStock(40); // Only 30 available\n        System.out.println(\"Reserve 40: \" + r2 + \" | Available: \" + item.getAvailableStock());\n    }\n}",
      "output": "Initial Available: 50\nReserve 20: true | Available: 30\nReserve 40: false | Available: 30",
      "explanation": "Guarantees that warehouse stock cannot be over-allocated through direct manipulation of stock counters."
    }
  ],
  "access-modifiers-deep-dive": [
    {
      "id": "ex-oop10-2-1",
      "title": "Public Interface with Private Calculation Helper",
      "problemStatement": "Declare a class `TaxCalculator` with public method `computeTotalWithTax(double subtotal, String stateCode)`. Implement a private helper method `getTaxRate(String stateCode)` returning 0.08 for 'CA', 0.06 for 'PA', and 0.05 for any other state. In `main()`, invoke `computeTotalWithTax` for subtotal 100.0 in 'CA' and 'PA', showing private helper delegation.",
      "hint": "Private helper getTaxRate(stateCode) cannot be called directly from main; it is called from inside computeTotalWithTax.",
      "solutionCode": "public class Solution {\n    static class TaxCalculator {\n        private double getTaxRate(String stateCode) {\n            if (\"CA\".equalsIgnoreCase(stateCode)) return 0.08;\n            if (\"PA\".equalsIgnoreCase(stateCode)) return 0.06;\n            return 0.05;\n        }\n\n        public double computeTotalWithTax(double subtotal, String stateCode) {\n            double rate = getTaxRate(stateCode);\n            return subtotal + (subtotal * rate);\n        }\n    }\n\n    public static void main(String[] args) {\n        TaxCalculator calc = new TaxCalculator();\n        System.out.printf(\"CA Total: $%.2f%n\", calc.computeTotalWithTax(100.0, \"CA\"));\n        System.out.printf(\"PA Total: $%.2f%n\", calc.computeTotalWithTax(100.0, \"PA\"));\n    }\n}",
      "output": "CA Total: $108.00\nPA Total: $106.00",
      "explanation": "The private helper method encapsulates rate lookup logic, exposing only the clean public calculation interface."
    },
    {
      "id": "ex-oop10-2-2",
      "title": "Package-Private Internal State Sharing within Domain",
      "problemStatement": "Create two classes: `OrderHeader` and `OrderProcessor`. In `OrderHeader`, declare package-private field `boolean isProcessed = false` (no modifier keyword) and public `getOrderId()`. In `OrderProcessor`, create a method `process(OrderHeader header)` that directly mutates `header.isProcessed = true`. In `main()`, create an order, verify it is processed, and print confirmation.",
      "hint": "Package-private members are directly accessible by other classes residing in the same package.",
      "solutionCode": "public class Solution {\n    static class OrderHeader {\n        private String orderId;\n        boolean isProcessed = false; // Package-private (accessible to sibling classes in same package)\n\n        public OrderHeader(String id) {\n            this.orderId = id;\n        }\n\n        public String getOrderId() { return orderId; }\n    }\n\n    static class OrderProcessor {\n        public static void process(OrderHeader header) {\n            header.isProcessed = true; // Directly accessible within package\n        }\n    }\n\n    public static void main(String[] args) {\n        OrderHeader order = new OrderHeader(\"ORD-990\");\n        System.out.println(\"Before processing: \" + order.isProcessed);\n        OrderProcessor.process(order);\n        System.out.println(\"After processing: \" + order.isProcessed);\n    }\n}",
      "output": "Before processing: false\nAfter processing: true",
      "explanation": "Package-private visibility permits trusted sibling classes within the same package to coordinate state changes directly."
    },
    {
      "id": "ex-oop10-2-3",
      "title": "Private Constructor for Utility Math Class",
      "problemStatement": "Design a static utility class `ArrayMath` with a private constructor that prevents instantiation. Provide static methods `min(int[] arr)` and `max(int[] arr)`. In `main()`, invoke both methods directly using the class name on `{14, 55, 3, 99, 42}` and print the results.",
      "hint": "Declare 'private ArrayMath() {}' to stop callers from calling new ArrayMath().",
      "solutionCode": "public class Solution {\n    static class ArrayMath {\n        private ArrayMath() {}\n\n        public static int min(int[] arr) {\n            int m = arr[0];\n            for (int v : arr) if (v < m) m = v;\n            return m;\n        }\n\n        public static int max(int[] arr) {\n            int m = arr[0];\n            for (int v : arr) if (v > m) m = v;\n            return m;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] values = {14, 55, 3, 99, 42};\n        System.out.println(\"Min: \" + ArrayMath.min(values));\n        System.out.println(\"Max: \" + ArrayMath.max(values));\n    }\n}",
      "output": "Min: 3\nMax: 99",
      "explanation": "A private constructor blocks instantiation of pure static utility classes, documenting that the class is stateless."
    },
    {
      "id": "ex-oop10-2-4",
      "title": "Access Matrix Validation with Member Visibility",
      "problemStatement": "Create a class `SecurityRecord` with: `private String ssn`, `String internalNotes` (package-private), `protected String department`, and `public String employeeName`. In `main()`, print which fields are accessible from the calling context, showing proper field access.",
      "hint": "Demonstrate the accessibility of each modifier from within the package.",
      "solutionCode": "public class Solution {\n    static class SecurityRecord {\n        private String ssn = \"123-45-6789\";\n        String internalNotes = \"Cleared for Level 2\";\n        protected String department = \"Research\";\n        public String employeeName = \"Dana Scully\";\n\n        public String getMaskedSsn() {\n            return \"***-**-\" + ssn.substring(ssn.length() - 4);\n        }\n    }\n\n    public static void main(String[] args) {\n        SecurityRecord rec = new SecurityRecord();\n        System.out.println(\"Public: \" + rec.employeeName);\n        System.out.println(\"Protected: \" + rec.department);\n        System.out.println(\"Package-private: \" + rec.internalNotes);\n        System.out.println(\"Private (via accessor): \" + rec.getMaskedSsn());\n    }\n}",
      "output": "Public: Dana Scully\nProtected: Research\nPackage-private: Cleared for Level 2\nPrivate (via accessor): ***-**-6789",
      "explanation": "All members except private are accessible directly from package code; private members require an explicit accessor method."
    },
    {
      "id": "ex-oop10-2-5",
      "title": "Package-Private Configuration Store",
      "problemStatement": "Build a package-private class `DatabaseConfig` with package-private fields `String connectionUrl` and `int poolSize`. Create a public class `DatabaseConnectionManager` that instantiates `DatabaseConfig` internally and provides public method `connect()`. In `main()`, use the manager to demonstrate encapsulation.",
      "hint": "class DatabaseConfig { ... } with no public keyword is package-private.",
      "solutionCode": "public class Solution {\n    static class DatabaseConfig {\n        String connectionUrl = \"jdbc:postgresql://localhost:5432/main\";\n        int poolSize = 10;\n    }\n\n    public static class DatabaseConnectionManager {\n        private DatabaseConfig config = new DatabaseConfig();\n\n        public void connect() {\n            System.out.println(\"Connecting to \" + config.connectionUrl + \" [Pool: \" + config.poolSize + \"]\");\n        }\n    }\n\n    public static void main(String[] args) {\n        DatabaseConnectionManager mgr = new DatabaseConnectionManager();\n        mgr.connect();\n    }\n}",
      "output": "Connecting to jdbc:postgresql://localhost:5432/main [Pool: 10]",
      "explanation": "DatabaseConfig is concealed as a package-private collaborator, shielding internal connection details from external callers."
    },
    {
      "id": "ex-oop10-2-6",
      "title": "Multi-Class Single File Package-Private Component",
      "problemStatement": "Demonstrate co-located classes in a single file: `ParserHelper` (package-private class with package-private `cleanInput(String s)`) and `PublicApi` (class using the helper). In `main()`, clean and format an input string '  dirty_STRING_data  ' using `PublicApi.process(String)`. Print the result.",
      "hint": "ParserHelper trims and lowercases string; PublicApi delegates to it.",
      "solutionCode": "public class Solution {\n    static class ParserHelper {\n        static String cleanInput(String s) {\n            return (s != null) ? s.trim().toLowerCase() : \"\";\n        }\n    }\n\n    public static class PublicApi {\n        public static String process(String input) {\n            String cleaned = ParserHelper.cleanInput(input);\n            return \"PROCESSED: \" + cleaned;\n        }\n    }\n\n    public static void main(String[] args) {\n        String res = PublicApi.process(\"  dirty_STRING_data  \");\n        System.out.println(res);\n    }\n}",
      "output": "PROCESSED: dirty_string_data",
      "explanation": "Package-private classes can live alongside public classes in the same compilation unit as internal helper components."
    },
    {
      "id": "ex-oop10-2-7",
      "title": "Encapsulated Counter with Private Seed Generator",
      "problemStatement": "Create a `SecureIdGenerator` class with `private static int seed = 500`. Create a private static method `computeNextSeed()` that advances seed by 13. Expose a public method `generateId(String prefix)` that returns prefix + '-' + computeNextSeed(). In `main()`, generate two IDs and print them.",
      "hint": "computeNextSeed() is private and can only be called from inside SecureIdGenerator.",
      "solutionCode": "public class Solution {\n    static class SecureIdGenerator {\n        private static int seed = 500;\n\n        private static int computeNextSeed() {\n            seed += 13;\n            return seed;\n        }\n\n        public static String generateId(String prefix) {\n            return prefix + \"-\" + computeNextSeed();\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(SecureIdGenerator.generateId(\"USER\"));\n        System.out.println(SecureIdGenerator.generateId(\"USER\"));\n    }\n}",
      "output": "USER-513\nUSER-526",
      "explanation": "The seed calculation algorithm is kept private, preventing external tampering with sequence generation."
    },
    {
      "id": "ex-oop10-2-8",
      "title": "Sensitive API Key Holder with Private Storage",
      "problemStatement": "Build an `ApiKeyCredential` class with `private String apiKey`. In constructor, validate that apiKey starts with 'sk_live_' (otherwise store 'INVALID'). Provide `public boolean isValid()` and `public String getMaskedKey()` showing only the first 8 characters followed by '***'. In `main()`, test a valid key.",
      "hint": "Mask string: apiKey.substring(0, 8) + \"***\".",
      "solutionCode": "public class Solution {\n    static class ApiKeyCredential {\n        private String apiKey;\n\n        public ApiKeyCredential(String key) {\n            if (key != null && key.startsWith(\"sk_live_\")) {\n                this.apiKey = key;\n            } else {\n                this.apiKey = \"INVALID\";\n            }\n        }\n\n        public boolean isValid() {\n            return !\"INVALID\".equals(apiKey);\n        }\n\n        public String getMaskedKey() {\n            if (!isValid()) return \"INVALID\";\n            return apiKey.substring(0, 8) + \"***\";\n        }\n    }\n\n    public static void main(String[] args) {\n        ApiKeyCredential cred = new ApiKeyCredential(\"sk_live_998877665544\");\n        System.out.println(\"Is valid key? \" + cred.isValid());\n        System.out.println(\"Masked credential: \" + cred.getMaskedKey());\n    }\n}",
      "output": "Is valid key? true\nMasked credential: sk_live_***",
      "explanation": "Sensitive secrets are kept strictly private, exposing only a masked string and validation predicate."
    },
    {
      "id": "ex-oop10-2-9",
      "title": "Top-Level Package-Private Engine for Public Car",
      "problemStatement": "Create a package-private `Engine` class with package-private field `int horsepower = 250` and method `start()`. Create a public `SportsCar` class with a private `Engine` instance. Provide public `ignite()` on SportsCar that starts the engine. In `main()`, ignite the car and print output.",
      "hint": "SportsCar encapsulates Engine completely.",
      "solutionCode": "public class Solution {\n    static class Engine {\n        int horsepower = 250;\n        void start() {\n            System.out.println(\"Engine roaring with \" + horsepower + \" HP!\");\n        }\n    }\n\n    public static class SportsCar {\n        private Engine engine = new Engine();\n\n        public void ignite() {\n            engine.start();\n        }\n    }\n\n    public static void main(String[] args) {\n        SportsCar car = new SportsCar();\n        car.ignite();\n    }\n}",
      "output": "Engine roaring with 250 HP!",
      "explanation": "The public SportsCar class acts as a facade, hiding the package-private Engine implementation detail."
    },
    {
      "id": "ex-oop10-2-10",
      "title": "Private Static Cache with Public Accessor",
      "problemStatement": "Build a `CityLookup` class with `private static String[] cities = {\"Tokyo\", \"London\", \"New York\", \"Sydney\"}`. Provide a public static method `getCityAt(int index)` returning the city name or 'UNKNOWN' if out of bounds. In `main()`, test index 1 and index 9.",
      "hint": "Check if index >= 0 && index < cities.length.",
      "solutionCode": "public class Solution {\n    static class CityLookup {\n        private static String[] cities = {\"Tokyo\", \"London\", \"New York\", \"Sydney\"};\n\n        public static String getCityAt(int index) {\n            if (index >= 0 && index < cities.length) {\n                return cities[index];\n            }\n            return \"UNKNOWN\";\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"City 1: \" + CityLookup.getCityAt(1));\n        System.out.println(\"City 9: \" + CityLookup.getCityAt(9));\n    }\n}",
      "output": "City 1: London\nCity 9: UNKNOWN",
      "explanation": "Guarding the private array through a public static accessor method protects against ArrayOutOfBoundsException."
    }
  ],
  "getters-setters-defensive-copying": [
    {
      "id": "ex-oop10-3-1",
      "title": "Standard JavaBeans Accessors for Employee Record",
      "problemStatement": "Create an `Employee` class following full JavaBeans conventions: `private String fullName`, `private double salary`, and `private boolean active`. Provide getters and setters for all three properties. In `setSalary`, reject salaries < 0. In `main()`, instantiate an employee, use setters to configure properties, and use getters to print the record.",
      "hint": "Follow conventions: getFullName/setFullName, getSalary/setSalary, isActive/setActive.",
      "solutionCode": "public class Solution {\n    static class Employee {\n        private String fullName;\n        private double salary;\n        private boolean active;\n\n        public String getFullName() { return fullName; }\n        public void setFullName(String name) { this.fullName = name; }\n\n        public double getSalary() { return salary; }\n        public void setSalary(double salary) {\n            if (salary >= 0.0) this.salary = salary;\n        }\n\n        public boolean isActive() { return active; }\n        public void setActive(boolean active) { this.active = active; }\n    }\n\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        emp.setFullName(\"Cassian Andor\");\n        emp.setSalary(75000.0);\n        emp.setActive(true);\n\n        System.out.println(\"Employee: \" + emp.getFullName());\n        System.out.printf(\"Salary: $%.2f%n\", emp.getSalary());\n        System.out.println(\"Active Status: \" + emp.isActive());\n    }\n}",
      "output": "Employee: Cassian Andor\nSalary: $75000.00\nActive Status: true",
      "explanation": "Adheres strictly to JavaBeans naming: standard getters with getX, boolean accessors with isX, and mutators with setX."
    },
    {
      "id": "ex-oop10-3-2",
      "title": "Boolean Property Accessor Naming Conventions",
      "problemStatement": "Demonstrate boolean accessor naming by building a `SystemHealth` class with fields `private boolean connected`, `private boolean memoryLow`, and `private boolean errorFlag`. Provide standard accessors (`isConnected()`, `isMemoryLow()`, `hasError()`, and corresponding setters). In `main()`, configure the status and print all three flags.",
      "hint": "Use isConnected, isMemoryLow, and hasError as getters.",
      "solutionCode": "public class Solution {\n    static class SystemHealth {\n        private boolean connected;\n        private boolean memoryLow;\n        private boolean errorFlag;\n\n        public boolean isConnected() { return connected; }\n        public void setConnected(boolean c) { this.connected = c; }\n\n        public boolean isMemoryLow() { return memoryLow; }\n        public void setMemoryLow(boolean m) { this.memoryLow = m; }\n\n        public boolean hasError() { return errorFlag; }\n        public void setError(boolean e) { this.errorFlag = e; }\n    }\n\n    public static void main(String[] args) {\n        SystemHealth health = new SystemHealth();\n        health.setConnected(true);\n        health.setMemoryLow(false);\n        health.setError(false);\n\n        System.out.println(\"Connected? \" + health.isConnected());\n        System.out.println(\"Memory Low? \" + health.isMemoryLow());\n        System.out.println(\"Has Error? \" + health.hasError());\n    }\n}",
      "output": "Connected? true\nMemory Low? false\nHas Error? false",
      "explanation": "Boolean properties conventionally use 'is' or 'has' prefixes to form natural English queries."
    },
    {
      "id": "ex-oop10-3-3",
      "title": "Defensive Copying in Integer Array Getter",
      "problemStatement": "Create a `DailyStats` class with `private int[] hourlySteps = {100, 250, 400}`. Write a getter `getHourlySteps()` that returns a defensive clone (`hourlySteps.clone()`). In `main()`, obtain the array from the getter, set element [0] = 9999, and invoke `getHourlySteps()` again to prove the internal array remains untouched at 100.",
      "hint": "In getHourlySteps(): return hourlySteps.clone();",
      "solutionCode": "public class Solution {\n    static class DailyStats {\n        private int[] hourlySteps = {100, 250, 400};\n\n        public int[] getHourlySteps() {\n            return hourlySteps.clone(); // Outbound defensive copy\n        }\n    }\n\n    public static void main(String[] args) {\n        DailyStats stats = new DailyStats();\n        int[] callerCopy = stats.getHourlySteps();\n        callerCopy[0] = 9999; // Tamper with returned clone\n\n        int[] verify = stats.getHourlySteps();\n        System.out.println(\"Caller modified copy[0]: \" + callerCopy[0]);\n        System.out.println(\"Internal private array[0]: \" + verify[0]);\n    }\n}",
      "output": "Caller modified copy[0]: 9999\nInternal private array[0]: 100",
      "explanation": "Outbound defensive copying ensures external callers cannot corrupt private arrays by modifying the returned reference."
    },
    {
      "id": "ex-oop10-3-4",
      "title": "Defensive Copying in Constructor Array Parameter",
      "problemStatement": "Build a `TelemetryLog` class with `private int[] timestamps`. In the constructor `TelemetryLog(int[] input)`, defensively clone the input array. In `main()`, create an array `int[] raw = {10, 20, 30}`, pass it to the constructor, and then modify `raw[0] = 999`. Use a method `getTimestampAt(int idx)` to prove internal telemetry preserved 10.",
      "hint": "In constructor: this.timestamps = (input != null) ? input.clone() : new int[0];",
      "solutionCode": "public class Solution {\n    static class TelemetryLog {\n        private int[] timestamps;\n\n        public TelemetryLog(int[] input) {\n            // Inbound defensive copy\n            this.timestamps = (input != null) ? input.clone() : new int[0];\n        }\n\n        public int getTimestampAt(int index) {\n            return timestamps[index];\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] raw = {10, 20, 30};\n        TelemetryLog log = new TelemetryLog(raw);\n\n        raw[0] = 999; // Attempt external tampering\n\n        System.out.println(\"Caller raw[0]: \" + raw[0]);\n        System.out.println(\"Internal log[0]: \" + log.getTimestampAt(0));\n    }\n}",
      "output": "Caller raw[0]: 999\nInternal log[0]: 10",
      "explanation": "Inbound defensive copying prevents callers from retaining a backdoor pointer to private internal arrays."
    },
    {
      "id": "ex-oop10-3-5",
      "title": "Bidirectional Defensive Copying for Quiz Scores",
      "problemStatement": "Implement full bidirectional defensive copying in a `QuizRoster` class: `private int[] scores`. Defensively copy in the constructor AND in `getScores()`. In `main()`, verify that neither modifying the constructor input array nor modifying the getter output array affects the internal scores.",
      "hint": "Use clone() in both constructor and getter.",
      "solutionCode": "public class Solution {\n    static class QuizRoster {\n        private int[] scores;\n\n        public QuizRoster(int[] initial) {\n            this.scores = (initial != null) ? initial.clone() : new int[0];\n        }\n\n        public int[] getScores() {\n            return scores.clone();\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] input = {85, 90, 95};\n        QuizRoster roster = new QuizRoster(input);\n        input[0] = 0; // Test inbound defense\n\n        int[] leakAttempt = roster.getScores();\n        leakAttempt[1] = 0; // Test outbound defense\n\n        int[] finalCheck = roster.getScores();\n        System.out.println(\"Scores: [\" + finalCheck[0] + \", \" + finalCheck[1] + \", \" + finalCheck[2] + \"]\");\n    }\n}",
      "output": "Scores: [85, 90, 95]",
      "explanation": "Bidirectional defensive copying seals both entrance and exit vectors for mutable reference leaks."
    },
    {
      "id": "ex-oop10-3-6",
      "title": "Read-Only Transaction Log with Array Snapshot",
      "problemStatement": "Design a `TransactionLog` class with `private double[] transactions = new double[10]` and `private int count = 0`. Provide `recordTransaction(double amt)` that stores amt if count < 10. Provide `getSnapshot()` that returns a trimmed array of exactly `count` elements containing current transactions. In `main()`, record $25.50 and $40.00, get snapshot, and display elements.",
      "hint": "Allocate new double[count], copy elements up to count, and return the new array.",
      "solutionCode": "public class Solution {\n    static class TransactionLog {\n        private double[] transactions = new double[10];\n        private int count = 0;\n\n        public void recordTransaction(double amount) {\n            if (count < transactions.length) {\n                transactions[count++] = amount;\n            }\n        }\n\n        public double[] getSnapshot() {\n            double[] snapshot = new double[count];\n            for (int i = 0; i < count; i++) {\n                snapshot[i] = transactions[i];\n            }\n            return snapshot;\n        }\n    }\n\n    public static void main(String[] args) {\n        TransactionLog log = new TransactionLog();\n        log.recordTransaction(25.50);\n        log.recordTransaction(40.00);\n\n        double[] snap = log.getSnapshot();\n        System.out.printf(\"Snapshot count: %d%n\", snap.length);\n        for (int i = 0; i < snap.length; i++) {\n            System.out.printf(\"Tx %d: $%.2f%n\", i + 1, snap[i]);\n        }\n    }\n}",
      "output": "Snapshot count: 2\nTx 1: $25.50\nTx 2: $40.00",
      "explanation": "Returning a trimmed snapshot copies only active entries without exposing the internal fixed-size array."
    },
    {
      "id": "ex-oop10-3-7",
      "title": "Validating Setter for Email and Phone Format",
      "problemStatement": "Build a `ContactCard` class with `private String email` and `private String phone`. In `setEmail(String e)`: accept only if non-null, contains '@', and does not start with '@'. In `setPhone(String p)`: accept only if non-null and length == 10. Provide getters. In `main()`, test setting valid and invalid values.",
      "hint": "Check conditions and return boolean success.",
      "solutionCode": "public class Solution {\n    static class ContactCard {\n        private String email = \"\";\n        private String phone = \"\";\n\n        public boolean setEmail(String e) {\n            if (e != null && e.contains(\"@\") && !e.startsWith(\"@\")) {\n                this.email = e.trim();\n                return true;\n            }\n            return false;\n        }\n\n        public boolean setPhone(String p) {\n            if (p != null && p.length() == 10) {\n                this.phone = p;\n                return true;\n            }\n            return false;\n        }\n\n        public String getEmail() { return email; }\n        public String getPhone() { return phone; }\n    }\n\n    public static void main(String[] args) {\n        ContactCard c = new ContactCard();\n        System.out.println(\"Set bad email: \" + c.setEmail(\"@nodomain.com\"));\n        System.out.println(\"Set good email: \" + c.setEmail(\"user@apex.com\"));\n        System.out.println(\"Set bad phone: \" + c.setPhone(\"123\"));\n        System.out.println(\"Set good phone: \" + c.setPhone(\"5551234567\"));\n        System.out.println(\"Email: \" + c.getEmail() + \" | Phone: \" + c.getPhone());\n    }\n}",
      "output": "Set bad email: false\nSet good email: true\nSet bad phone: false\nSet good phone: true\nEmail: user@apex.com | Phone: 5551234567",
      "explanation": "Validating setters ensure that state transitions comply with formatting rules before updating fields."
    },
    {
      "id": "ex-oop10-3-8",
      "title": "Fluent Setter Pattern for Query Parameters",
      "problemStatement": "Implement the Fluent Setter pattern in a `QueryOptions` class: `private String sortBy = \"id\"`, `private int limit = 10`, `private boolean ascending = true`. Each setter should update the field and return `this`. In `main()`, chain setters in a single statement: `new QueryOptions().setSortBy(\"createdAt\").setLimit(50).setAscending(false);` and print options.",
      "hint": "return this; inside each setter.",
      "solutionCode": "public class Solution {\n    static class QueryOptions {\n        private String sortBy = \"id\";\n        private int limit = 10;\n        private boolean ascending = true;\n\n        public QueryOptions setSortBy(String s) {\n            this.sortBy = s;\n            return this;\n        }\n\n        public QueryOptions setLimit(int l) {\n            if (l > 0) this.limit = l;\n            return this;\n        }\n\n        public QueryOptions setAscending(boolean a) {\n            this.ascending = a;\n            return this;\n        }\n\n        public String toQueryString() {\n            return \"Sort: \" + sortBy + \" | Limit: \" + limit + \" | Asc: \" + ascending;\n        }\n    }\n\n    public static void main(String[] args) {\n        QueryOptions opts = new QueryOptions()\n            .setSortBy(\"createdAt\")\n            .setLimit(50)\n            .setAscending(false);\n\n        System.out.println(opts.toQueryString());\n    }\n}",
      "output": "Sort: createdAt | Limit: 50 | Asc: false",
      "explanation": "Fluent setters returning 'this' enable elegant, readable method chaining during object configuration."
    },
    {
      "id": "ex-oop10-3-9",
      "title": "Defensive Copying with Character Array Secret Key",
      "problemStatement": "Demonstrate defensive copying with character arrays (char[]). Create a `KeyManager` class with `private char[] secretKey`. In constructor, defensively clone incoming char[]. In `getMaskedChars()`, return a new char[] filled with '*' of the same length. In `main()`, pass a key `{'P', 'A', 'S', 'S'}`, wipe the caller's array with zeroes, and prove the KeyManager retained the secret internally.",
      "hint": "char[] is mutable just like int[]. Defensive cloning in constructor isolates the key.",
      "solutionCode": "public class Solution {\n    static class KeyManager {\n        private char[] secretKey;\n\n        public KeyManager(char[] key) {\n            this.secretKey = (key != null) ? key.clone() : new char[0];\n        }\n\n        public char[] getMaskedChars() {\n            char[] masked = new char[secretKey.length];\n            for (int i = 0; i < masked.length; i++) masked[i] = '*';\n            return masked;\n        }\n\n        public boolean matches(char[] candidate) {\n            if (candidate == null || candidate.length != secretKey.length) return false;\n            for (int i = 0; i < secretKey.length; i++) {\n                if (candidate[i] != secretKey[i]) return false;\n            }\n            return true;\n        }\n    }\n\n    public static void main(String[] args) {\n        char[] rawKey = {'P', 'A', 'S', 'S'};\n        KeyManager km = new KeyManager(rawKey);\n\n        // Wipe caller's array for security\n        for (int i = 0; i < rawKey.length; i++) rawKey[i] = '0';\n\n        char[] testCandidate = {'P', 'A', 'S', 'S'};\n        System.out.println(\"Does internal key still match PASS? \" + km.matches(testCandidate));\n        System.out.println(\"Masked view: \" + new String(km.getMaskedChars()));\n    }\n}",
      "output": "Does internal key still match PASS? true\nMasked view: ****",
      "explanation": "Cloning char[] arrays in security credentials allows callers to safely zero out memory buffers without destroying the managed key."
    },
    {
      "id": "ex-oop10-3-10",
      "title": "Defensive Copying for Daily Temperature Readings",
      "problemStatement": "Create a `WeatherStationLog` class with `private double[] dailyTemps`. Constructor clones input. Method `getDailyTemps()` returns a clone. Add `getAverageTemp()` returning the average of dailyTemps. In `main()`, pass `{22.5, 25.0, 21.5}`, calculate average, and confirm defensive copies prevent external modifications from skewing averages.",
      "hint": "Both constructor and getter clone the double[] array.",
      "solutionCode": "public class Solution {\n    static class WeatherStationLog {\n        private double[] dailyTemps;\n\n        public WeatherStationLog(double[] temps) {\n            this.dailyTemps = (temps != null) ? temps.clone() : new double[0];\n        }\n\n        public double[] getDailyTemps() {\n            return dailyTemps.clone();\n        }\n\n        public double getAverageTemp() {\n            if (dailyTemps.length == 0) return 0.0;\n            double sum = 0.0;\n            for (double t : dailyTemps) sum += t;\n            return sum / dailyTemps.length;\n        }\n    }\n\n    public static void main(String[] args) {\n        double[] readings = {22.5, 25.0, 21.5};\n        WeatherStationLog log = new WeatherStationLog(readings);\n\n        double[] view = log.getDailyTemps();\n        view[0] = -100.0; // External mutation attempt\n\n        System.out.printf(\"Average Temp: %.2f C%n\", log.getAverageTemp());\n        System.out.println(\"Original reading preserved: \" + log.getDailyTemps()[0] + \" C\");\n    }\n}",
      "output": "Average Temp: 23.00 C\nOriginal reading preserved: 22.5 C",
      "explanation": "Defensive copying guarantees that derived calculations like averages cannot be skewed by external array mutations."
    }
  ],
  "immutable-class-pattern": [
    {
      "id": "ex-oop10-4-1",
      "title": "Immutable 2D Coordinate Point",
      "problemStatement": "Create an immutable class `Point` with `private final int x` and `private final int y`. Mark the class `final`. Provide constructor, getters, and with-er methods: `withX(int newX)` and `withY(int newY)` returning new instances. In `main()`, instantiate (3, 4), call `withX(10)`, and prove the original point remains (3, 4).",
      "hint": "public final class Point { ... } with withX returning 'new Point(newX, this.y)'.",
      "solutionCode": "public class Solution {\n    public static final class Point {\n        private final int x;\n        private final int y;\n\n        public Point(int x, int y) {\n            this.x = x;\n            this.y = y;\n        }\n\n        public int getX() { return x; }\n        public int getY() { return y; }\n\n        public Point withX(int newX) {\n            return new Point(newX, this.y);\n        }\n\n        public Point withY(int newY) {\n            return new Point(this.x, newY);\n        }\n    }\n\n    public static void main(String[] args) {\n        Point p1 = new Point(3, 4);\n        Point p2 = p1.withX(10);\n\n        System.out.println(\"p1: (\" + p1.getX() + \", \" + p1.getY() + \")\");\n        System.out.println(\"p2: (\" + p2.getX() + \", \" + p2.getY() + \")\");\n    }\n}",
      "output": "p1: (3, 4)\np2: (10, 4)",
      "explanation": "Because Point is immutable, calling withX() returns a brand-new instance while preserving p1's original coordinates."
    },
    {
      "id": "ex-oop10-4-2",
      "title": "Immutable RGB Color with Transformation Methods",
      "problemStatement": "Design an immutable `Color` class (final class, private final int fields `red`, `green`, `blue`). In constructor, clamp values 0-255. Provide `withRed(int r)`, `withGreen(int g)`, and `inverted()` which returns a new Color with components (255 - r, 255 - g, 255 - b). In `main()`, create color (100, 150, 200), invert it, and print both colors in RGB format.",
      "hint": "inverted() returns 'new Color(255 - red, 255 - green, 255 - blue)'.",
      "solutionCode": "public class Solution {\n    public static final class Color {\n        private final int red;\n        private final int green;\n        private final int blue;\n\n        public Color(int r, int g, int b) {\n            this.red = clamp(r);\n            this.green = clamp(g);\n            this.blue = clamp(b);\n        }\n\n        private static int clamp(int v) {\n            return Math.max(0, Math.min(v, 255));\n        }\n\n        public int getRed() { return red; }\n        public int getGreen() { return green; }\n        public int getBlue() { return blue; }\n\n        public Color inverted() {\n            return new Color(255 - red, 255 - green, 255 - blue);\n        }\n\n        public String toString() {\n            return \"RGB(\" + red + \", \" + green + \", \" + blue + \")\";\n        }\n    }\n\n    public static void main(String[] args) {\n        Color original = new Color(100, 150, 200);\n        Color inverted = original.inverted();\n\n        System.out.println(\"Original: \" + original);\n        System.out.println(\"Inverted: \" + inverted);\n    }\n}",
      "output": "Original: RGB(100, 150, 200)\nInverted: RGB(155, 105, 55)",
      "explanation": "Color transformations create new immutable instances, ensuring original colors cannot be altered."
    },
    {
      "id": "ex-oop10-4-3",
      "title": "Immutable Money Value Object with Add and Multiply",
      "problemStatement": "Build an immutable `Money` value object: `final class Money`, `private final double amount`, `private final String currency`. Provide: `add(Money other)` (returns new Money with sum, verifying currency matches; return null if mismatched) and `multiply(double factor)` (returns new Money with amount * factor). In `main()`, test adding $20 to $50 and multiplying by 1.5.",
      "hint": "Check if (this.currency.equals(other.currency)). Return new Money(...).",
      "solutionCode": "public class Solution {\n    public static final class Money {\n        private final double amount;\n        private final String currency;\n\n        public Money(double amount, String currency) {\n            this.amount = Math.max(0.0, amount);\n            this.currency = (currency != null) ? currency : \"USD\";\n        }\n\n        public double getAmount() { return amount; }\n        public String getCurrency() { return currency; }\n\n        public Money add(Money other) {\n            if (other != null && this.currency.equals(other.currency)) {\n                return new Money(this.amount + other.amount, this.currency);\n            }\n            return null;\n        }\n\n        public Money multiply(double factor) {\n            return new Money(this.amount * factor, this.currency);\n        }\n    }\n\n    public static void main(String[] args) {\n        Money m1 = new Money(50.0, \"USD\");\n        Money m2 = new Money(20.0, \"USD\");\n        Money sum = m1.add(m2);\n        Money scaled = sum.multiply(1.5);\n\n        System.out.printf(\"Sum: $%.2f %s%n\", sum.getAmount(), sum.getCurrency());\n        System.out.printf(\"Scaled (1.5x): $%.2f %s%n\", scaled.getAmount(), scaled.getCurrency());\n        System.out.printf(\"Original m1 unchanged: $%.2f%n\", m1.getAmount());\n    }\n}",
      "output": "Sum: $70.00 USD\nScaled (1.5x): $105.00 USD\nOriginal m1 unchanged: $50.00",
      "explanation": "Money is modeled as a classic domain Value Object where mathematical operations yield new immutable Money instances."
    },
    {
      "id": "ex-oop10-4-4",
      "title": "Immutable Date Representation with Day Advance",
      "problemStatement": "Create an immutable `SimpleDate` class with `private final int year`, `private final int month`, and `private final int day`. Provide method `plusDays(int days)` that returns a new `SimpleDate` (for simplicity, assume 30 days per month and 12 months per year). In `main()`, instantiate (2026, 11, 25), add 10 days, and print both dates in 'YYYY-MM-DD' format.",
      "hint": "Calculate totalDays = (year * 360) + (month * 30) + day + days; recompute y, m, d and return new SimpleDate.",
      "solutionCode": "public class Solution {\n    public static final class SimpleDate {\n        private final int year, month, day;\n\n        public SimpleDate(int y, int m, int d) {\n            this.year = y;\n            this.month = m;\n            this.day = d;\n        }\n\n        public SimpleDate plusDays(int daysToAdd) {\n            int totalD = day + daysToAdd;\n            int newMonth = month;\n            int newYear = year;\n\n            while (totalD > 30) {\n                totalD -= 30;\n                newMonth++;\n                if (newMonth > 12) {\n                    newMonth = 1;\n                    newYear++;\n                }\n            }\n            return new SimpleDate(newYear, newMonth, totalD);\n        }\n\n        public String format() {\n            return String.format(\"%04d-%02d-%02d\", year, month, day);\n        }\n    }\n\n    public static void main(String[] args) {\n        SimpleDate d1 = new SimpleDate(2026, 11, 25);\n        SimpleDate d2 = d1.plusDays(10);\n\n        System.out.println(\"Date 1: \" + d1.format());\n        System.out.println(\"Date 2: \" + d2.format());\n    }\n}",
      "output": "Date 1: 2026-11-25\nDate 2: 2026-12-05",
      "explanation": "Like Java's modern java.time.LocalDate, advancing days returns a new immutable date without mutating the original."
    },
    {
      "id": "ex-oop10-4-5",
      "title": "Immutable User Credentials with With-er Methods",
      "problemStatement": "Design an immutable `UserCredentials` class: `final class`, `private final String username`, `private final String role`. Provide getters and with-er methods: `withRole(String newRole)` and `withUsername(String newUsername)`. If the parameter equals the current value, return `this` to optimize memory. In `main()`, test changing role to 'Admin' and verify memory identity when re-assigning the same role.",
      "hint": "Inside withRole: if (this.role.equals(newRole)) return this; return new UserCredentials(this.username, newRole);",
      "solutionCode": "public class Solution {\n    public static final class UserCredentials {\n        private final String username;\n        private final String role;\n\n        public UserCredentials(String u, String r) {\n            this.username = (u != null) ? u : \"\";\n            this.role = (r != null) ? r : \"User\";\n        }\n\n        public String getUsername() { return username; }\n        public String getRole() { return role; }\n\n        public UserCredentials withRole(String newRole) {\n            if (this.role.equals(newRole)) return this; // Optimization\n            return new UserCredentials(this.username, newRole);\n        }\n    }\n\n    public static void main(String[] args) {\n        UserCredentials user = new UserCredentials(\"jdoe\", \"User\");\n        UserCredentials admin = user.withRole(\"Admin\");\n        UserCredentials sameAdmin = admin.withRole(\"Admin\");\n\n        System.out.println(\"User: \" + user.getUsername() + \" [\" + user.getRole() + \"]\");\n        System.out.println(\"Admin: \" + admin.getUsername() + \" [\" + admin.getRole() + \"]\");\n        System.out.println(\"Same instance returned on redundant withRole? \" + (admin == sameAdmin));\n    }\n}",
      "output": "User: jdoe [User]\nAdmin: jdoe [Admin]\nSame instance returned on redundant withRole? true",
      "explanation": "With-er methods can return 'this' when the target value matches the current state, avoiding unnecessary heap allocations."
    },
    {
      "id": "ex-oop10-4-6",
      "title": "Immutable Classroom Roster with Defensive Array Protection",
      "problemStatement": "Build an immutable `ClassRoster` class: `final class`, `private final String courseName`, `private final String[] students`. Constructor defensively copies the array. Getter `getStudents()` returns a clone. Provide `withAddedStudent(String studentName)` that returns a new `ClassRoster` with an expanded array containing the new student. In `main()`, create a roster of 2 students, add a third student, and print both rosters.",
      "hint": "In withAddedStudent: allocate new String[students.length + 1], copy existing, append new student, return new ClassRoster.",
      "solutionCode": "public class Solution {\n    public static final class ClassRoster {\n        private final String courseName;\n        private final String[] students;\n\n        public ClassRoster(String course, String[] list) {\n            this.courseName = course;\n            this.students = (list != null) ? list.clone() : new String[0];\n        }\n\n        public String getCourseName() { return courseName; }\n        public String[] getStudents() { return students.clone(); }\n\n        public ClassRoster withAddedStudent(String name) {\n            String[] expanded = new String[students.length + 1];\n            for (int i = 0; i < students.length; i++) expanded[i] = students[i];\n            expanded[students.length] = name;\n            return new ClassRoster(this.courseName, expanded);\n        }\n    }\n\n    public static void main(String[] args) {\n        String[] initial = {\"Alice\", \"Bob\"};\n        ClassRoster r1 = new ClassRoster(\"CS-101\", initial);\n        ClassRoster r2 = r1.withAddedStudent(\"Charlie\");\n\n        System.out.println(\"R1 count: \" + r1.getStudents().length);\n        System.out.println(\"R2 count: \" + r2.getStudents().length);\n    }\n}",
      "output": "R1 count: 2\nR2 count: 3",
      "explanation": "Expanding an immutable array holder creates a new instance with the enlarged array while leaving the original roster intact."
    },
    {
      "id": "ex-oop10-4-7",
      "title": "Final Reference vs Immutable Object Comparison",
      "problemStatement": "Write a demonstration program contrasting a `final` reference variable pointing to a mutable class versus an immutable class. Show that: 1) Calling methods on a final reference pointing to `MutableBuffer` changes its internal contents; 2) Calling methods on `ImmutableValue` does NOT change its contents unless the return value is captured in a new variable. Print outputs to verify.",
      "hint": "Show that final on a variable only restricts reference reassignment, not internal mutation.",
      "solutionCode": "public class Solution {\n    static class MutableBuffer {\n        int val = 0;\n    }\n\n    public static final class ImmutableValue {\n        private final int val;\n        public ImmutableValue(int v) { this.val = v; }\n        public int getVal() { return val; }\n        public ImmutableValue add(int n) { return new ImmutableValue(this.val + n); }\n    }\n\n    public static void main(String[] args) {\n        // Final reference to MUTABLE object\n        final MutableBuffer mb = new MutableBuffer();\n        mb.val = 42; // Mutates object in place\n        System.out.println(\"Mutable buffer value: \" + mb.val);\n\n        // Final reference to IMMUTABLE object\n        final ImmutableValue iv = new ImmutableValue(10);\n        iv.add(50); // Result discarded; iv remains 10!\n        System.out.println(\"Immutable value after ignored add: \" + iv.getVal());\n\n        ImmutableValue updated = iv.add(50);\n        System.out.println(\"Captured new immutable value: \" + updated.getVal());\n    }\n}",
      "output": "Mutable buffer value: 42\nImmutable value after ignored add: 10\nCaptured new immutable value: 60",
      "explanation": "A final reference restricts pointer reassignment; only an immutable class guarantees that internal state cannot change."
    },
    {
      "id": "ex-oop10-4-8",
      "title": "Immutable Bank Transaction Record",
      "problemStatement": "Build an immutable `TransactionRecord` class: `final class`, fields: `private final long txId`, `private final String sourceAccount`, `private final String destAccount`, `private final double amount`, `private final long timestamp`. Provide getters for all fields. Provide a method `printSummary()`. In `main()`, instantiate two transaction records and print summaries.",
      "hint": "All fields private final; no setters.",
      "solutionCode": "public class Solution {\n    public static final class TransactionRecord {\n        private final long txId;\n        private final String sourceAccount;\n        private final String destAccount;\n        private final double amount;\n        private final long timestamp;\n\n        public TransactionRecord(long id, String src, String dest, double amt, long time) {\n            this.txId = id;\n            this.sourceAccount = src;\n            this.destAccount = dest;\n            this.amount = amt;\n            this.timestamp = time;\n        }\n\n        public long getTxId() { return txId; }\n        public String getSourceAccount() { return sourceAccount; }\n        public String getDestAccount() { return destAccount; }\n        public double getAmount() { return amount; }\n        public long getTimestamp() { return timestamp; }\n\n        public void printSummary() {\n            System.out.printf(\"TX#%d: %s -> %s ($%.2f) @ %d%n\", txId, sourceAccount, destAccount, amount, timestamp);\n        }\n    }\n\n    public static void main(String[] args) {\n        TransactionRecord tx1 = new TransactionRecord(1001L, \"ACC-10\", \"ACC-20\", 150.00, 1700000000L);\n        TransactionRecord tx2 = new TransactionRecord(1002L, \"ACC-20\", \"ACC-30\", 75.50, 1700000050L);\n\n        tx1.printSummary();\n        tx2.printSummary();\n    }\n}",
      "output": "TX#1001: ACC-10 -> ACC-20 ($150.00) @ 1700000000\nTX#1002: ACC-20 -> ACC-30 ($75.50) @ 1700000050",
      "explanation": "Audit records and financial transactions are natural candidates for immutable classes, preventing tampering post-creation."
    },
    {
      "id": "ex-oop10-4-9",
      "title": "Immutable Fraction Arithmetic",
      "problemStatement": "Create an immutable `Fraction` class: `final class`, `private final int numerator`, `private final int denominator`. In constructor, simplify fraction using greatest common divisor (GCD) and ensure denominator is positive. Provide methods `multiply(Fraction other)` and `add(Fraction other)` returning new simplified Fractions. In `main()`, add 1/2 and 1/3, and multiply 2/3 by 3/4. Print results.",
      "hint": "Calculate gcd(a, b). For addition: (n1*d2 + n2*d1) / (d1*d2). Return new Fraction.",
      "solutionCode": "public class Solution {\n    public static final class Fraction {\n        private final int numerator;\n        private final int denominator;\n\n        public Fraction(int n, int d) {\n            if (d == 0) d = 1; // Prevent division by zero\n            if (d < 0) { n = -n; d = -d; }\n            int g = gcd(Math.abs(n), d);\n            this.numerator = n / g;\n            this.denominator = d / g;\n        }\n\n        private static int gcd(int a, int b) {\n            while (b != 0) {\n                int temp = b;\n                b = a % b;\n                a = temp;\n            }\n            return a;\n        }\n\n        public Fraction add(Fraction other) {\n            int num = (this.numerator * other.denominator) + (other.numerator * this.denominator);\n            int den = this.denominator * other.denominator;\n            return new Fraction(num, den);\n        }\n\n        public Fraction multiply(Fraction other) {\n            return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);\n        }\n\n        public String toString() {\n            return numerator + \"/\" + denominator;\n        }\n    }\n\n    public static void main(String[] args) {\n        Fraction f1 = new Fraction(1, 2);\n        Fraction f2 = new Fraction(1, 3);\n        Fraction sum = f1.add(f2);\n        System.out.println(\"1/2 + 1/3 = \" + sum);\n\n        Fraction f3 = new Fraction(2, 3);\n        Fraction f4 = new Fraction(3, 4);\n        Fraction prod = f3.multiply(f4);\n        System.out.println(\"2/3 * 3/4 = \" + prod);\n    }\n}",
      "output": "1/2 + 1/3 = 5/6\n2/3 * 3/4 = 1/2",
      "explanation": "Mathematical numbers (like fractions and complex numbers) should be strictly immutable, where operations return new values."
    },
    {
      "id": "ex-oop10-4-10",
      "title": "Immutable Configuration Options with Builder-Style With-ers",
      "problemStatement": "Build an immutable `ServerOptions` class: `final class`, fields: `private final String host`, `private final int port`, `private final int timeoutMs`, `private final boolean sslEnabled`. Provide with-ers for each field: `withHost`, `withPort`, `withTimeoutMs`, `withSslEnabled`. Provide `display()`. In `main()`, start with default options ('localhost', 80, 5000, false) and chain with-ers to produce a production config ('api.production.com', 443, 3000, true). Print both.",
      "hint": "Each with-er returns 'new ServerOptions(...)'.",
      "solutionCode": "public class Solution {\n    public static final class ServerOptions {\n        private final String host;\n        private final int port;\n        private final int timeoutMs;\n        private final boolean sslEnabled;\n\n        public ServerOptions(String host, int port, int timeout, boolean ssl) {\n            this.host = (host != null) ? host : \"localhost\";\n            this.port = port;\n            this.timeoutMs = timeout;\n            this.sslEnabled = ssl;\n        }\n\n        public ServerOptions withHost(String h) { return new ServerOptions(h, port, timeoutMs, sslEnabled); }\n        public ServerOptions withPort(int p) { return new ServerOptions(host, p, timeoutMs, sslEnabled); }\n        public ServerOptions withTimeoutMs(int t) { return new ServerOptions(host, port, t, sslEnabled); }\n        public ServerOptions withSslEnabled(boolean s) { return new ServerOptions(host, port, timeoutMs, s); }\n\n        public void display() {\n            System.out.printf(\"Host: %s:%d | Timeout: %dms | SSL: %b%n\", host, port, timeoutMs, sslEnabled);\n        }\n    }\n\n    public static void main(String[] args) {\n        ServerOptions devConfig = new ServerOptions(\"localhost\", 80, 5000, false);\n        ServerOptions prodConfig = devConfig\n            .withHost(\"api.production.com\")\n            .withPort(443)\n            .withTimeoutMs(3000)\n            .withSslEnabled(true);\n\n        System.out.print(\"Dev Config: \");\n        devConfig.display();\n\n        System.out.print(\"Prod Config: \");\n        prodConfig.display();\n    }\n}",
      "output": "Dev Config: Host: localhost:80 | Timeout: 5000ms | SSL: false\nProd Config: Host: api.production.com:443 | Timeout: 3000ms | SSL: true",
      "explanation": "Chaining with-er methods allows constructing complex immutable configurations with fluent readability."
    }
  ]
};
