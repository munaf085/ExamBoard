# build_oop10_exercises.py
import json

target_path = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop10_exercises.ts"

exercises = {}

# -------------------------------------------------------------
# LESSON 10.1: The Principle of Encapsulation & Data Hiding (10 exercises)
# -------------------------------------------------------------
exercises["encapsulation-principles"] = [
    {
        "id": "ex-oop10-1-1",
        "title": "Encapsulated Bank Account with Balance Protection",
        "problemStatement": "Create a `BankAccount` class with private `balance` (double). Provide a constructor and public methods `deposit(double amount)` and `withdraw(double amount)` that enforce the invariants that deposit amounts must be positive, and withdrawals cannot exceed the balance. In `main()`, deposit $200, withdraw $50, attempt an overdraft of $300, and print the balance.",
        "hint": "Check if amount > 0 for deposit, and amount <= balance for withdraw. Print appropriate error messages on rejection.",
        "solutionCode": """public class Solution {
    static class BankAccount {
        private double balance;

        public BankAccount(double initialBalance) {
            if (initialBalance >= 0) this.balance = initialBalance;
        }

        public void deposit(double amount) {
            if (amount > 0) balance += amount;
        }

        public void withdraw(double amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
            } else {
                System.out.println("Transaction rejected: Insufficient funds or invalid amount.");
            }
        }

        public double getBalance() {
            return balance;
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount(100.0);
        acc.deposit(200.0);
        acc.withdraw(50.0);
        acc.withdraw(300.0);
        System.out.println("Final Balance: $" + acc.getBalance());
    }
}""",
        "output": "Transaction rejected: Insufficient funds or invalid amount.\nFinal Balance: $250.0",
        "explanation": "Direct field access is blocked by private balance. Invariant checks in deposit and withdraw guarantee the account cannot have a negative balance."
    },
    {
        "id": "ex-oop10-1-2",
        "title": "Thermostat with Boundary Clamping",
        "problemStatement": "Design a `Thermostat` class with a private double `temperature` (in Celsius). Provide a constructor setting the temperature between 16.0 and 30.0 degrees Celsius. Add `setTemperature(double temp)` which clamps or rejects values outside [16.0, 30.0]. In `main()`, test valid and invalid temperature inputs and display the current temperature.",
        "hint": "Use guard clauses (if (temp < 16.0 || temp > 30.0)) to reject out-of-range changes.",
        "solutionCode": """public class Solution {
    static class Thermostat {
        private double temperature;

        public Thermostat(double temp) {
            setTemperature(temp);
        }

        public void setTemperature(double temp) {
            if (temp >= 16.0 && temp <= 30.0) {
                this.temperature = temp;
            } else {
                System.out.println("Invalid temperature: " + temp + "C. Maintained at: " + this.temperature + "C");
            }
        }

        public double getTemperature() {
            return temperature;
        }
    }

    public static void main(String[] args) {
        Thermostat t = new Thermostat(22.5);
        t.setTemperature(26.0);
        t.setTemperature(35.0);
        System.out.println("Active Temp: " + t.getTemperature() + "C");
    }
}""",
        "output": "Invalid temperature: 35.0C. Maintained at: 26.0C\nActive Temp: 26.0C",
        "explanation": "Encapsulation prevents setting extreme unsafe temperatures by intercepting assignments in setTemperature."
    },
    {
        "id": "ex-oop10-1-3",
        "title": "Fitness Step Counter with Monotonic Invariant",
        "problemStatement": "Build a `StepCounter` class where steps can ONLY increase (monotonic). Declare private int `steps`. Provide `addSteps(int count)` which rejects negative or zero inputs. No direct setter should exist. In `main()`, log daily steps and print the final count.",
        "hint": "Omit a setSteps() method entirely. Provide only addSteps() and getSteps().",
        "solutionCode": """public class Solution {
    static class StepCounter {
        private int steps;

        public void addSteps(int count) {
            if (count > 0) {
                this.steps += count;
            }
        }

        public int getSteps() {
            return steps;
        }
    }

    public static void main(String[] args) {
        StepCounter tracker = new StepCounter();
        tracker.addSteps(3500);
        tracker.addSteps(-500); // Invalid, ignored
        tracker.addSteps(4200);
        System.out.println("Total Steps: " + tracker.getSteps());
    }
}""",
        "output": "Total Steps: 7700",
        "explanation": "A monotonic invariant is enforced by omitting any setter and only allowing strictly positive additions via addSteps."
    },
    {
        "id": "ex-oop10-1-4",
        "title": "Inventory Stock Manager with Reorder Threshold",
        "problemStatement": "Create an `InventoryItem` class with private `String sku`, `int stockLevel`, and `int reorderThreshold`. Include methods `receiveStock(int qty)` and `dispatchStock(int qty)`. Dispatching cannot bring stockLevel below zero. If stockLevel falls at or below threshold, print a reorder warning. In `main()`, simulate stock movements.",
        "hint": "Check `stockLevel - qty >= 0` before deducting, and compare against `reorderThreshold` after deduction.",
        "solutionCode": """public class Solution {
    static class InventoryItem {
        private String sku;
        private int stockLevel;
        private int reorderThreshold;

        public InventoryItem(String sku, int stock, int threshold) {
            this.sku = sku;
            this.stockLevel = stock;
            this.reorderThreshold = threshold;
        }

        public void receiveStock(int qty) {
            if (qty > 0) stockLevel += qty;
        }

        public void dispatchStock(int qty) {
            if (qty <= 0 || qty > stockLevel) {
                System.out.println("Dispatch failed: Insufficient inventory.");
                return;
            }
            stockLevel -= qty;
            if (stockLevel <= reorderThreshold) {
                System.out.println("ALERT: Stock for " + sku + " is at " + stockLevel + " (threshold: " + reorderThreshold + ")");
            }
        }

        public int getStockLevel() { return stockLevel; }
    }

    public static void main(String[] args) {
        InventoryItem item = new InventoryItem("SKU-99", 20, 5);
        item.dispatchStock(16);
        System.out.println("Remaining Stock: " + item.getStockLevel());
    }
}""",
        "output": "ALERT: Stock for SKU-99 is at 4 (threshold: 5)\nRemaining Stock: 4",
        "explanation": "Business logic and side-effect notifications (reorder alerts) are encapsulated within dispatchStock."
    },
    {
        "id": "ex-oop10-1-5",
        "title": "Secure Password Storage with Validation",
        "problemStatement": "Build a `UserCredentials` class with private `username` and `hashedPassword`. The constructor accepts a raw password, validates that it is at least 8 characters long, and stores it prefixed with 'HASH_' to simulate hashing. No getter for the password should exist; provide only `boolean authenticate(String inputPassword)`.",
        "hint": "Data hiding: Provide an authenticate() method instead of exposing the password via a getter.",
        "solutionCode": """public class Solution {
    static class UserCredentials {
        private String username;
        private String hashedPassword;

        public UserCredentials(String username, String rawPassword) {
            this.username = username;
            if (rawPassword != null && rawPassword.length() >= 8) {
                this.hashedPassword = "HASH_" + rawPassword;
            } else {
                this.hashedPassword = "HASH_DEFAULT123";
            }
        }

        public boolean authenticate(String inputPassword) {
            return ("HASH_" + inputPassword).equals(this.hashedPassword);
        }

        public String getUsername() { return username; }
    }

    public static void main(String[] args) {
        UserCredentials user = new UserCredentials("john_dev", "SecretPassword!");
        System.out.println("User: " + user.getUsername());
        System.out.println("Login correct: " + user.authenticate("SecretPassword!"));
        System.out.println("Login wrong: " + user.authenticate("wrongPass"));
    }
}""",
        "output": "User: john_dev\nLogin correct: true\nLogin wrong: false",
        "explanation": "Extreme data hiding: Never provide a getPassword() method; expose only verification operations like authenticate()."
    },
    {
        "id": "ex-oop10-1-6",
        "title": "Fuel Tank with Capacity and Sensor Precision",
        "problemStatement": "Implement a `FuelTank` class with private `capacityLiters` and `currentLiters`. Provide `refuel(double liters)` and `consume(double liters)`. Refueling cannot exceed capacity (excess is discarded or clamped). In `main()`, initialize a 50L tank, refuel by 30L, consume 10L, and attempt overfilling with 40L.",
        "hint": "When refueling, currentLiters = Math.min(capacityLiters, currentLiters + liters).",
        "solutionCode": """public class Solution {
    static class FuelTank {
        private final double capacityLiters;
        private double currentLiters;

        public FuelTank(double capacity, double initial) {
            this.capacityLiters = capacity;
            this.currentLiters = Math.min(capacity, Math.max(0, initial));
        }

        public void refuel(double liters) {
            if (liters <= 0) return;
            double needed = capacityLiters - currentLiters;
            if (liters > needed) {
                currentLiters = capacityLiters;
                System.out.println("Tank full! Spilled " + (liters - needed) + "L");
            } else {
                currentLiters += liters;
            }
        }

        public void consume(double liters) {
            if (liters > 0 && liters <= currentLiters) {
                currentLiters -= liters;
            }
        }

        public double getCurrentLiters() { return currentLiters; }
    }

    public static void main(String[] args) {
        FuelTank tank = new FuelTank(50.0, 10.0);
        tank.refuel(20.0);
        tank.consume(5.0);
        tank.refuel(35.0);
        System.out.println("Tank Fuel: " + tank.getCurrentLiters() + "L");
    }
}""",
        "output": "Tank full! Spilled 10.0L\nTank Fuel: 50.0L",
        "explanation": "Capacity boundaries are strictly enforced internally without requiring the caller to do mathematical checks."
    },
    {
        "id": "ex-oop10-1-7",
        "title": "Student Grade Record with Read-Only Average",
        "problemStatement": "Create a `StudentRecord` with private `String name` and private `int[] testScores`. Provide `addTestScore(int score)` (0-100) and `double getAverageScore()`. The average is computed on-the-fly and has no setter. In `main()`, add scores 85, 90, 95 and print the student's average.",
        "hint": "Store scores in a fixed array with a count variable, and compute sum / count in getAverageScore().",
        "solutionCode": """public class Solution {
    static class StudentRecord {
        private String name;
        private int[] scores = new int[10];
        private int scoreCount = 0;

        public StudentRecord(String name) { this.name = name; }

        public void addScore(int score) {
            if (score >= 0 && score <= 100 && scoreCount < scores.length) {
                scores[scoreCount++] = score;
            }
        }

        public double getAverageScore() {
            if (scoreCount == 0) return 0.0;
            int sum = 0;
            for (int i = 0; i < scoreCount; i++) sum += scores[i];
            return (double) sum / scoreCount;
        }
    }

    public static void main(String[] args) {
        StudentRecord s = new StudentRecord("Maya");
        s.addScore(85);
        s.addScore(90);
        s.addScore(95);
        System.out.printf("Average Score: %.2f%n", s.getAverageScore());
    }
}""",
        "output": "Average Score: 90.00",
        "explanation": "Calculated properties (like average score) should be exposed via read-only methods rather than stored in a mutable field."
    },
    {
        "id": "ex-oop10-1-8",
        "title": "Encapsulated Elevator Controller with Floor Boundaries",
        "problemStatement": "Create an `Elevator` class with private `currentFloor`, `minFloor`, and `maxFloor`. Provide `moveTo(int targetFloor)` which moves floor-by-floor printing the path, rejecting targets outside the valid range. In `main()`, move between floors.",
        "hint": "Check `targetFloor >= minFloor && targetFloor <= maxFloor`. Use a loop to print floor transitions.",
        "solutionCode": """public class Solution {
    static class Elevator {
        private int currentFloor = 1;
        private final int minFloor;
        private final int maxFloor;

        public Elevator(int min, int max) {
            this.minFloor = min;
            this.maxFloor = max;
        }

        public void moveTo(int targetFloor) {
            if (targetFloor < minFloor || targetFloor > maxFloor) {
                System.out.println("Invalid floor: " + targetFloor);
                return;
            }
            while (currentFloor < targetFloor) { currentFloor++; }
            while (currentFloor > targetFloor) { currentFloor--; }
            System.out.println("Elevator arrived at floor " + currentFloor);
        }

        public int getCurrentFloor() { return currentFloor; }
    }

    public static void main(String[] args) {
        Elevator lift = new Elevator(1, 10);
        lift.moveTo(5);
        lift.moveTo(15);
        System.out.println("Current Position: Floor " + lift.getCurrentFloor());
    }
}""",
        "output": "Elevator arrived at floor 5\nInvalid floor: 15\nCurrent Position: Floor 5",
        "explanation": "Elevator position invariant (minFloor <= currentFloor <= maxFloor) is impossible to break from external code."
    },
    {
        "id": "ex-oop10-1-9",
        "title": "Tell-Don't-Ask Wallet Transaction",
        "problemStatement": "Refactor a wallet model to follow 'Tell, Don't Ask'. Create `DigitalWallet` with private `double balance`. Rather than exposing `setBalance()`, provide `boolean pay(double amount, String recipient)` that verifies funds, deducts money, and prints confirmation. In `main()`, perform payments.",
        "hint": "The object itself handles the verification and deduction in one atomic method.",
        "solutionCode": """public class Solution {
    static class DigitalWallet {
        private double balance;

        public DigitalWallet(double initial) {
            if (initial > 0) this.balance = initial;
        }

        public boolean pay(double amount, String recipient) {
            if (amount <= 0 || amount > balance) {
                System.out.println("Payment of $" + amount + " to " + recipient + " failed: Insufficient balance.");
                return false;
            }
            balance -= amount;
            System.out.println("Paid $" + amount + " to " + recipient + ". New Balance: $" + balance);
            return true;
        }
    }

    public static void main(String[] args) {
        DigitalWallet wallet = new DigitalWallet(100.0);
        wallet.pay(40.0, "Coffee Shop");
        wallet.pay(80.0, "Electronics Store");
    }
}""",
        "output": "Paid $40.0 to Coffee Shop. New Balance: $60.0\nPayment of $80.0 to Electronics Store failed: Insufficient balance.",
        "explanation": "Tell, Don't Ask instructs the wallet to perform the payment rather than asking for balance and setting it externally."
    },
    {
        "id": "ex-oop10-1-10",
        "title": "Encapsulated Speedometer with Speed Limit Alarm",
        "problemStatement": "Create a `Speedometer` class with private `int currentSpeed` and private `int speedLimit`. Add `accelerate(int delta)` and `brake(int delta)`. If acceleration causes speed to exceed `speedLimit`, print a speeding alarm. Brake cannot drop speed below 0. In `main()`, accelerate past the limit and brake to a stop.",
        "hint": "currentSpeed = Math.max(0, currentSpeed - delta) for braking.",
        "solutionCode": """public class Solution {
    static class Speedometer {
        private int currentSpeed = 0;
        private final int speedLimit;

        public Speedometer(int limit) { this.speedLimit = limit; }

        public void accelerate(int delta) {
            if (delta <= 0) return;
            currentSpeed += delta;
            if (currentSpeed > speedLimit) {
                System.out.println("SPEEDING ALARM: " + currentSpeed + " km/h exceeds limit of " + speedLimit + " km/h!");
            }
        }

        public void brake(int delta) {
            if (delta > 0) currentSpeed = Math.max(0, currentSpeed - delta);
        }

        public int getCurrentSpeed() { return currentSpeed; }
    }

    public static void main(String[] args) {
        Speedometer speedo = new Speedometer(100);
        speedo.accelerate(80);
        speedo.accelerate(30);
        speedo.brake(150);
        System.out.println("Stopped Speed: " + speedo.getCurrentSpeed() + " km/h");
    }
}""",
        "output": "SPEEDING ALARM: 110 km/h exceeds limit of 100 km/h!\nStopped Speed: 0 km/h",
        "explanation": "All transitions and threshold logic are encapsulated safely within the domain model."
    }
]

# -------------------------------------------------------------
# LESSON 10.2: Java's 4 Access Modifiers (10 exercises)
# -------------------------------------------------------------
exercises["access-modifiers-deep-dive"] = [
    {
        "id": "ex-oop10-2-1",
        "title": "Private Helper Method in Mathematical Calculator",
        "problemStatement": "Create a `MathHelper` class with a public method `double calculateCompoundInterest(double principal, double rate, int years)` and a private helper method `double power(double base, int exp)`. In `main()`, compute compound interest and verify that private helper encapsulation works cleanly.",
        "hint": "The public method delegates exponentiation to the private power() helper.",
        "solutionCode": """public class Solution {
    static class MathHelper {
        private double power(double base, int exp) {
            double res = 1.0;
            for (int i = 0; i < exp; i++) res *= base;
            return res;
        }

        public double calculateCompoundInterest(double p, double r, int t) {
            return p * power(1.0 + r, t);
        }
    }

    public static void main(String[] args) {
        MathHelper calc = new MathHelper();
        double total = calc.calculateCompoundInterest(1000.0, 0.05, 3);
        System.out.printf("Compound Total: $%.2f%n", total);
    }
}""",
        "output": "Compound Total: $1157.63",
        "explanation": "Private methods encapsulate internal computation details that external callers have no need to know or invoke directly."
    },
    {
        "id": "ex-oop10-2-2",
        "title": "Package-Private Collaboration in Package Scope",
        "problemStatement": "Demonstrate package-private (default) access. Create a class `Order` with package-private field `status` and an `OrderProcessor` class in the same scope that directly updates `order.status = \"PROCESSED\"`. In `main()`, process an order and print its status.",
        "hint": "Do not specify any access modifier (no public, private, or protected) for package-private fields and methods.",
        "solutionCode": """public class Solution {
    static class Order {
        String status = "PENDING"; // package-private
        String orderId;

        Order(String id) { this.orderId = id; }
    }

    static class OrderProcessor {
        void process(Order order) {
            order.status = "COMPLETED"; // accessible in same package
        }
    }

    public static void main(String[] args) {
        Order o = new Order("ORD-101");
        OrderProcessor p = new OrderProcessor();
        p.process(o);
        System.out.println("Order " + o.orderId + " status: " + o.status);
    }
}""",
        "output": "Order ORD-101 status: COMPLETED",
        "explanation": "Default (package-private) modifier permits classes in the same package to collaborate closely without exposing state to the entire outside world."
    },
    {
        "id": "ex-oop10-2-3",
        "title": "Private Constructor for Static Utility Class",
        "problemStatement": "Create a utility class `StringUtils` with static methods `boolean isBlank(String s)` and `String capitalize(String s)`. Prevent instantiation by declaring a private constructor that prints an error or throws an exception. In `main()`, test the utility methods without instantiating.",
        "hint": "Declare `private StringUtils() { throw new UnsupportedOperationException(); }`.",
        "solutionCode": """public class Solution {
    static final class StringUtils {
        private StringUtils() {
            // Suppress default constructor for noninstantiability
        }

        public static boolean isBlank(String s) {
            return s == null || s.trim().isEmpty();
        }

        public static String capitalize(String s) {
            if (isBlank(s)) return s;
            return Character.toUpperCase(s.charAt(0)) + s.substring(1).toLowerCase();
        }
    }

    public static void main(String[] args) {
        System.out.println("Is blank: " + StringUtils.isBlank("   "));
        System.out.println("Capitalized: " + StringUtils.capitalize("jAvA"));
    }
}""",
        "output": "Is blank: true\nCapitalized: Java",
        "explanation": "A private constructor enforces noninstantiability for pure static utility classes, as recommended by Joshua Bloch."
    },
    {
        "id": "ex-oop10-2-4",
        "title": "Access Modifier Boundary Matrix Verification",
        "problemStatement": "Declare a class `AccessDemo` containing one public, one protected, one package-private, and one private integer field. Inside a method in the same class, sum all four. In `main()`, verify which fields are directly accessible from the outer scope.",
        "hint": "Inside the class, all 4 are accessible. In static main, private is accessible if inside the same outer class file.",
        "solutionCode": """public class Solution {
    static class AccessDemo {
        public int pub = 1;
        protected int prot = 2;
        int def = 3;
        private int priv = 4;

        public int sumAll() {
            return pub + prot + def + priv;
        }
    }

    public static void main(String[] args) {
        AccessDemo d = new AccessDemo();
        System.out.println("Internal Sum: " + d.sumAll());
        System.out.println("Accessible pub: " + d.pub + ", prot: " + d.prot + ", def: " + d.def);
    }
}""",
        "output": "Internal Sum: 10\nAccessible pub: 1, prot: 2, def: 3",
        "explanation": "All modifiers allow access inside the declaring class; visibility narrows progressively as caller boundaries expand."
    },
    {
        "id": "ex-oop10-2-5",
        "title": "Internal State Sanitization via Private Method",
        "problemStatement": "Create a `UserProfile` class with private `email` and `phone`. Expose a public setter `updateContact(String rawEmail, String rawPhone)`. Use private helper methods `cleanEmail` (trim and lowercase) and `cleanPhone` (remove non-digits). In `main()`, update contact and display.",
        "hint": "Encapsulate data cleaning in private helpers.",
        "solutionCode": """public class Solution {
    static class UserProfile {
        private String email;
        private String phone;

        private String cleanEmail(String e) {
            return (e == null) ? "" : e.trim().toLowerCase();
        }

        private String cleanPhone(String p) {
            return (p == null) ? "" : p.replaceAll("[^0-9]", "");
        }

        public void updateContact(String e, String p) {
            this.email = cleanEmail(e);
            this.phone = cleanPhone(p);
        }

        public void display() {
            System.out.println("Email: " + email + ", Phone: " + phone);
        }
    }

    public static void main(String[] args) {
        UserProfile profile = new UserProfile();
        profile.updateContact("  Munaf@EXAMPLE.com  ", "(555) 123-4567");
        profile.display();
    }
}""",
        "output": "Email: munaf@example.com, Phone: 5551234567",
        "explanation": "Private helper methods clean and sanitize raw user inputs before committing values to state."
    },
    {
        "id": "ex-oop10-2-6",
        "title": "Audited Access to Sensitive Configuration",
        "problemStatement": "Create a `SystemConfig` class with private `apiKey`. Accessing `getApiKey()` logs an audit message to the console every time it is read. In `main()`, read the key twice and verify audit logging.",
        "hint": "Put System.out.println(\"AUDIT: ...\") inside getApiKey().",
        "solutionCode": """public class Solution {
    static class SystemConfig {
        private String apiKey;

        public SystemConfig(String key) { this.apiKey = key; }

        public String getApiKey() {
            System.out.println("AUDIT LOG: API Key accessed by caller.");
            return apiKey;
        }
    }

    public static void main(String[] args) {
        SystemConfig cfg = new SystemConfig("SEC-XYZ-999");
        String k1 = cfg.getApiKey();
        String k2 = cfg.getApiKey();
        System.out.println("Key Length: " + k1.length());
    }
}""",
        "output": "AUDIT LOG: API Key accessed by caller.\nAUDIT LOG: API Key accessed by caller.\nKey Length: 11",
        "explanation": "Encapsulating field access behind methods enables non-intrusive logging, auditing, and access telemetry."
    },
    {
        "id": "ex-oop10-2-7",
        "title": "Strict Read-Only Constants via Public Static Final",
        "problemStatement": "Declare a class `AppConstants` with `public static final double SALES_TAX = 0.0825` and `public static final int MAX_USERS = 500`. In `main()`, compute tax on a $200 purchase and display user limits.",
        "hint": "Constants that are immutable primitives can safely be public static final.",
        "solutionCode": """public class Solution {
    static class AppConstants {
        public static final double SALES_TAX = 0.0825;
        public static final int MAX_USERS = 500;
        private AppConstants() {}
    }

    public static void main(String[] args) {
        double itemPrice = 200.0;
        double tax = itemPrice * AppConstants.SALES_TAX;
        System.out.println("Tax on $200: $" + tax);
        System.out.println("Max Platform Users: " + AppConstants.MAX_USERS);
    }
}""",
        "output": "Tax on $200: $16.5\nMax Platform Users: 500",
        "explanation": "Constants are the only acceptable public fields in Java OOP because final prevents reassignment and primitives cannot be mutated."
    },
    {
        "id": "ex-oop10-2-8",
        "title": "Controlled Package State via Package-Private Constructor",
        "problemStatement": "Create a class `Token` whose constructor is package-private, and a public factory class `TokenFactory` that instantiates it. External callers outside the package cannot call `new Token()` directly; they must use the factory.",
        "hint": "Declare `Token(String id)` without public or private.",
        "solutionCode": """public class Solution {
    static class Token {
        private String id;
        Token(String id) { this.id = id; } // package-private constructor
        public String getId() { return id; }
    }

    static class TokenFactory {
        public static Token createSessionToken(String userId) {
            return new Token("TOK_" + userId + "_SESSION");
        }
    }

    public static void main(String[] args) {
        Token t = TokenFactory.createSessionToken("user42");
        System.out.println("Generated Token: " + t.getId());
    }
}""",
        "output": "Generated Token: TOK_user42_SESSION",
        "explanation": "Package-private constructors restrict instantiation authority to authorized factory classes within the same package."
    },
    {
        "id": "ex-oop10-2-9",
        "title": "Principle of Least Privilege in Document Security",
        "problemStatement": "Create a `ConfidentialDocument` class with private `text`, protected `classificationLevel`, package-private `author`, and public `title`. In `main()`, show how public methods expose only the title and length of text without revealing contents.",
        "hint": "Public method returns `text.length()` rather than the raw text String.",
        "solutionCode": """public class Solution {
    static class ConfidentialDocument {
        public String title;
        String author;
        protected int classificationLevel = 3;
        private String text;

        public ConfidentialDocument(String title, String author, String secret) {
            this.title = title;
            this.author = author;
            this.text = secret;
        }

        public int getContentLength() {
            return (text != null) ? text.length() : 0;
        }
    }

    public static void main(String[] args) {
        ConfidentialDocument doc = new ConfidentialDocument("Top Secret Plan", "Agent 007", "Coordinates: 45.12, 12.34");
        System.out.println("Title: " + doc.title);
        System.out.println("Content Character Count: " + doc.getContentLength());
    }
}""",
        "output": "Title: Top Secret Plan\nContent Character Count: 25",
        "explanation": "Principle of Least Privilege: Expose only the minimum data required (length) while keeping raw secret text private."
    },
    {
        "id": "ex-oop10-2-10",
        "title": "Access Modifier Refactoring: Exposing Behavior Over Data",
        "problemStatement": "Refactor a class `LightBulb` from having a public boolean `isOn` to private `isOn` with public methods `turnOn()`, `turnOff()`, and `boolean isIlluminated()`. In `main()`, toggle the light and display its status.",
        "hint": "Encapsulate the boolean flag behind action methods.",
        "solutionCode": """public class Solution {
    static class LightBulb {
        private boolean isOn = false;

        public void turnOn() { this.isOn = true; }
        public void turnOff() { this.isOn = false; }
        public boolean isIlluminated() { return isOn; }
    }

    public static void main(String[] args) {
        LightBulb bulb = new LightBulb();
        System.out.println("Initial State: " + bulb.isIlluminated());
        bulb.turnOn();
        System.out.println("After turnOn: " + bulb.isIlluminated());
        bulb.turnOff();
        System.out.println("After turnOff: " + bulb.isIlluminated());
    }
}""",
        "output": "Initial State: false\nAfter turnOn: true\nAfter turnOff: false",
        "explanation": "Exposing domain behavior (turnOn, turnOff) rather than raw variables (isOn = true) yields maintainable and testable OOP code."
    }
]

# -------------------------------------------------------------
# LESSON 10.3: Getters, Setters & Defensive Copying (10 exercises)
# -------------------------------------------------------------
exercises["getters-setters-defensive-copying"] = [
    {
        "id": "ex-oop10-3-1",
        "title": "Array Getter Leak Demonstration and Fix",
        "problemStatement": "Create a `SafeScores` class with private `int[] scores`. Provide a getter `int[] getScores()` that returns `scores.clone()`. In `main()`, instantiate with `{90, 80, 70}`, modify `safeScores.getScores()[0] = 0`, and verify that the internal score remains 90.",
        "hint": "Return scores.clone() in getScores() to prevent the caller from modifying the internal array.",
        "solutionCode": """public class Solution {
    static class SafeScores {
        private int[] scores;

        public SafeScores(int[] s) {
            this.scores = (s != null) ? s.clone() : new int[0];
        }

        public int[] getScores() {
            return scores.clone();
        }
    }

    public static void main(String[] args) {
        int[] original = {90, 80, 70};
        SafeScores obj = new SafeScores(original);

        // Tampering attempt
        obj.getScores()[0] = 0;

        System.out.println("Internal score index 0: " + obj.getScores()[0]);
    }
}""",
        "output": "Internal score index 0: 90",
        "explanation": "Returning scores.clone() allocates a fresh array copy on the heap, ensuring tampering attempts modify only the clone."
    },
    {
        "id": "ex-oop10-3-2",
        "title": "Inbound Constructor Defensive Copying",
        "problemStatement": "Create a `SecurityKeyring` class with private `int[] keys`. In the constructor, defensively copy the incoming array. In `main()`, create an array `int[] rawKeys = {111, 222}`, pass it to the constructor, then alter `rawKeys[0] = 999`. Verify that `keyring.getKeys()[0]` remains 111.",
        "hint": "Perform `this.keys = incomingKeys.clone()` inside the constructor.",
        "solutionCode": """public class Solution {
    static class SecurityKeyring {
        private int[] keys;

        public SecurityKeyring(int[] inputKeys) {
            this.keys = (inputKeys != null) ? inputKeys.clone() : new int[0];
        }

        public int[] getKeys() { return keys.clone(); }
    }

    public static void main(String[] args) {
        int[] rawKeys = {111, 222};
        SecurityKeyring ring = new SecurityKeyring(rawKeys);

        // Modify original caller array
        rawKeys[0] = 999;

        System.out.println("Keyring Key 0: " + ring.getKeys()[0]);
    }
}""",
        "output": "Keyring Key 0: 111",
        "explanation": "Inbound defensive copying isolates the object from external mutations to arrays passed as constructor arguments."
    },
    {
        "id": "ex-oop10-3-3",
        "title": "JavaBeans Boolean Naming Compliance",
        "problemStatement": "Build a `Subscription` class following JavaBeans conventions: private boolean `active` and private boolean `autoRenew`. Provide appropriate getters starting with `is` and setters starting with `set`. In `main()`, configure and display properties.",
        "hint": "Getters: isActive(), isAutoRenew(). Setters: setActive(boolean), setAutoRenew(boolean).",
        "solutionCode": """public class Solution {
    static class Subscription {
        private boolean active;
        private boolean autoRenew;

        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }

        public boolean isAutoRenew() { return autoRenew; }
        public void setAutoRenew(boolean autoRenew) { this.autoRenew = autoRenew; }
    }

    public static void main(String[] args) {
        Subscription sub = new Subscription();
        sub.setActive(true);
        sub.setAutoRenew(false);
        System.out.println("Active: " + sub.isActive() + ", AutoRenew: " + sub.isAutoRenew());
    }
}""",
        "output": "Active: true, AutoRenew: false",
        "explanation": "JavaBeans specification mandates the 'is' prefix for boolean property getters."
    },
    {
        "id": "ex-oop10-3-4",
        "title": "Read-Only Property with Computed State",
        "problemStatement": "Create a `Rectangle` class with private `width` and `height`. Provide getters and setters for width and height that reject non-positive values. Add a read-only getter `double getArea()` that has no setter. In `main()`, set dimensions and display area.",
        "hint": "getArea() calculates width * height on demand without a backing field.",
        "solutionCode": """public class Solution {
    static class Rectangle {
        private double width = 1.0;
        private double height = 1.0;

        public void setWidth(double w) { if (w > 0) this.width = w; }
        public double getWidth() { return width; }

        public void setHeight(double h) { if (h > 0) this.height = h; }
        public double getHeight() { return height; }

        public double getArea() { return width * height; }
    }

    public static void main(String[] args) {
        Rectangle r = new Rectangle();
        r.setWidth(4.0);
        r.setHeight(5.0);
        System.out.println("Dimensions: " + r.getWidth() + "x" + r.getHeight() + ", Area: " + r.getArea());
    }
}""",
        "output": "Dimensions: 4.0x5.0, Area: 20.0",
        "explanation": "Exposing computed attributes via read-only getters ensures derived state never gets out of sync."
    },
    {
        "id": "ex-oop10-3-5",
        "title": "Defensive Copying of String Matrix Rows",
        "problemStatement": "Create a `ScheduleTable` class holding private `String[] weekdays`. In `getWeekdays()`, return a cloned array. In `main()`, verify that reassigning an element of the returned array does not affect the internal schedule.",
        "hint": "Use weekdays.clone() for the defensive copy.",
        "solutionCode": """public class Solution {
    static class ScheduleTable {
        private String[] weekdays = {"Mon", "Tue", "Wed", "Thu", "Fri"};

        public String[] getWeekdays() {
            return weekdays.clone();
        }
    }

    public static void main(String[] args) {
        ScheduleTable st = new ScheduleTable();
        String[] days = st.getWeekdays();
        days[0] = "HACKED";
        System.out.println("First day in table: " + st.getWeekdays()[0]);
    }
}""",
        "output": "First day in table: Mon",
        "explanation": "Defensive copying on reference arrays shields the internal array from modification by external references."
    },
    {
        "id": "ex-oop10-3-6",
        "title": "Setter Invariant with Custom Error Logging",
        "problemStatement": "Create a `Person` class with private `int age`. The setter `setAge(int age)` must validate `age >= 0 && age <= 120`. If invalid, print an error and preserve the existing age. In `main()`, test boundaries.",
        "hint": "Guard clause in setAge() checks bounds before assignment.",
        "solutionCode": """public class Solution {
    static class Person {
        private int age = 18;

        public void setAge(int age) {
            if (age < 0 || age > 120) {
                System.out.println("Invalid age " + age + " ignored. Retaining " + this.age);
                return;
            }
            this.age = age;
        }

        public int getAge() { return age; }
    }

    public static void main(String[] args) {
        Person p = new Person();
        p.setAge(25);
        p.setAge(-5);
        System.out.println("Final Age: " + p.getAge());
    }
}""",
        "output": "Invalid age -5 ignored. Retaining 25\nFinal Age: 25",
        "explanation": "Setters ensure the object always remains in a valid domain state (class invariant)."
    },
    {
        "id": "ex-oop10-3-7",
        "title": "Write-Only Property Pattern (Audit Password Setter)",
        "problemStatement": "Build a `PasswordManager` class with private `encryptedPassword`. Provide `setPassword(String raw)` which hashes the password with 'SHA_' prefix. Provide NO getter for the password, only a verification method `boolean verify(String raw)`. In `main()`, set and verify password.",
        "hint": "A write-only property has a setter but zero getter.",
        "solutionCode": """public class Solution {
    static class PasswordManager {
        private String encryptedPassword;

        public void setPassword(String raw) {
            this.encryptedPassword = "SHA_" + raw;
        }

        public boolean verify(String candidate) {
            return ("SHA_" + candidate).equals(this.encryptedPassword);
        }
    }

    public static void main(String[] args) {
        PasswordManager pm = new PasswordManager();
        pm.setPassword("mySecret");
        System.out.println("Verification correct: " + pm.verify("mySecret"));
        System.out.println("Verification wrong: " + pm.verify("wrong"));
    }
}""",
        "output": "Verification correct: true\nVerification wrong: false",
        "explanation": "Write-only properties accept sensitive configuration without ever exposing the raw value back out."
    },
    {
        "id": "ex-oop10-3-8",
        "title": "Safe Array Appender via Encapsulation",
        "problemStatement": "Build a `LogBuffer` class with private `String[] entries` (capacity 5) and `int size = 0`. Provide `void addEntry(String msg)` and `String[] getEntries()`. `getEntries()` must return an array sized exactly to `size` (not the full capacity buffer). In `main()`, add 3 entries and print length.",
        "hint": "Create a new String[size] and copy only active elements up to size.",
        "solutionCode": """public class Solution {
    static class LogBuffer {
        private String[] buffer = new String[5];
        private int size = 0;

        public void addEntry(String msg) {
            if (size < buffer.length) {
                buffer[size++] = msg;
            }
        }

        public String[] getEntries() {
            String[] result = new String[size];
            for (int i = 0; i < size; i++) result[i] = buffer[i];
            return result;
        }
    }

    public static void main(String[] args) {
        LogBuffer lb = new LogBuffer();
        lb.addEntry("Booting system");
        lb.addEntry("Network connected");
        String[] logs = lb.getEntries();
        System.out.println("Exported Log Count: " + logs.length + ", Entry 0: " + logs[0]);
    }
}""",
        "output": "Exported Log Count: 2, Entry 0: Booting system",
        "explanation": "Returning a trimmed copy exposes only the active payload without leaking internal buffer capacity."
    },
    {
        "id": "ex-oop10-3-9",
        "title": "Null-Safe Setter and Getter Guarding",
        "problemStatement": "Create a `UserProfile` class with private `String displayName`. In `setDisplayName(String name)`, if input is null or whitespace, set it to 'Anonymous'. In `main()`, test null, blank, and valid names.",
        "hint": "Check `name == null || name.trim().isEmpty()` in setter.",
        "solutionCode": """public class Solution {
    static class UserProfile {
        private String displayName = "Anonymous";

        public void setDisplayName(String name) {
            if (name == null || name.trim().isEmpty()) {
                this.displayName = "Anonymous";
            } else {
                this.displayName = name.trim();
            }
        }

        public String getDisplayName() { return displayName; }
    }

    public static void main(String[] args) {
        UserProfile up = new UserProfile();
        up.setDisplayName("  Munaf  ");
        System.out.println("Profile 1: " + up.getDisplayName());
        up.setDisplayName("   ");
        System.out.println("Profile 2: " + up.getDisplayName());
    }
}""",
        "output": "Profile 1: Munaf\nProfile 2: Anonymous",
        "explanation": "Setters shield the application from null pointers by sanitizing incoming arguments."
    },
    {
        "id": "ex-oop10-3-10",
        "title": "Dual-Copy Defensive Architecture",
        "problemStatement": "Build a `SecretCodeVault` class that receives `int[] codes` in its constructor and exposes `int[] getCodes()`. Implement defensive copying on BOTH constructor entry AND getter exit. In `main()`, demonstrate that neither the original array nor the returned getter array can mutate the vault.",
        "hint": "Use clone() in constructor AND in getter.",
        "solutionCode": """public class Solution {
    static class SecretCodeVault {
        private int[] codes;

        public SecretCodeVault(int[] c) {
            this.codes = (c != null) ? c.clone() : new int[0];
        }

        public int[] getCodes() {
            return codes.clone();
        }
    }

    public static void main(String[] args) {
        int[] external = {1, 2, 3};
        SecretCodeVault vault = new SecretCodeVault(external);

        external[0] = 999; // Attempt 1: modify input
        int[] leaked = vault.getCodes();
        leaked[1] = 888; // Attempt 2: modify output

        System.out.println("Vault codes: " + vault.getCodes()[0] + ", " + vault.getCodes()[1]);
    }
}""",
        "output": "Vault codes: 1, 2",
        "explanation": "Dual defensive copying guarantees end-to-end immunity from external mutable reference tampering."
    }
]

# -------------------------------------------------------------
# LESSON 10.4: Immutable Class Design Pattern (10 exercises)
# -------------------------------------------------------------
exercises["immutable-class-pattern"] = [
    {
        "id": "ex-oop10-4-1",
        "title": "Immutable 2D Coordinate Point",
        "problemStatement": "Build an immutable `Point2D` class with private final `int x` and `int y`. Declare the class `final`. Provide getters and with-er methods `Point2D withX(int newX)` and `Point2D withY(int newY)`. In `main()`, instantiate (5, 10), derive (20, 10), and verify the original is unchanged.",
        "hint": "Mark the class final, fields private final, and return new Point2D in with-ers.",
        "solutionCode": """public class Solution {
    static final class Point2D {
        private final int x;
        private final int y;

        public Point2D(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public int getX() { return x; }
        public int getY() { return y; }

        public Point2D withX(int newX) { return new Point2D(newX, this.y); }
        public Point2D withY(int newY) { return new Point2D(this.x, newY); }
    }

    public static void main(String[] args) {
        Point2D p1 = new Point2D(5, 10);
        Point2D p2 = p1.withX(20);

        System.out.println("P1: (" + p1.getX() + ", " + p1.getY() + ")");
        System.out.println("P2: (" + p2.getX() + ", " + p2.getY() + ")");
    }
}""",
        "output": "P1: (5, 10)\nP2: (20, 10)",
        "explanation": "Because Point2D is immutable, calling withX produces a brand new Point2D without altering p1."
    },
    {
        "id": "ex-oop10-4-2",
        "title": "Immutable Currency Representation with Functional Addition",
        "problemStatement": "Create an immutable `Money` class with private final `double amount` and private final `String currency`. Provide `Money plus(double addend)` and `Money minus(double subtrahend)`. In `main()`, add and subtract money, printing values at each stage.",
        "hint": "Return new Money(this.amount + addend, this.currency) in plus().",
        "solutionCode": """public class Solution {
    static final class Money {
        private final double amount;
        private final String currency;

        public Money(double amount, String currency) {
            this.amount = amount;
            this.currency = (currency != null) ? currency : "USD";
        }

        public Money plus(double val) {
            return new Money(this.amount + val, this.currency);
        }

        public Money minus(double val) {
            return new Money(this.amount - val, this.currency);
        }

        public double getAmount() { return amount; }
        public String getCurrency() { return currency; }
    }

    public static void main(String[] args) {
        Money m1 = new Money(50.0, "EUR");
        Money m2 = m1.plus(30.0);
        Money m3 = m2.minus(10.0);

        System.out.println("m1: " + m1.getAmount() + " " + m1.getCurrency());
        System.out.println("m2: " + m2.getAmount() + " " + m2.getCurrency());
        System.out.println("m3: " + m3.getAmount() + " " + m3.getCurrency());
    }
}""",
        "output": "m1: 50.0 EUR\nm2: 80.0 EUR\nm3: 70.0 EUR",
        "explanation": "Functional operations on immutable objects preserve original state and produce clean, side-effect-free results."
    },
    {
        "id": "ex-oop10-4-3",
        "title": "Immutable Array Container with Defensive Clones",
        "problemStatement": "Build an immutable `ImmutableDataPacket` class containing a private final `int[] payload`. In the constructor, clone the input array. In `getPayload()`, return a clone. In `main()`, verify that neither caller array changes nor returned array changes affect the packet.",
        "hint": "Defensive copy both in constructor and getter.",
        "solutionCode": """public class Solution {
    static final class ImmutableDataPacket {
        private final int[] payload;

        public ImmutableDataPacket(int[] data) {
            this.payload = (data != null) ? data.clone() : new int[0];
        }

        public int[] getPayload() {
            return payload.clone();
        }
    }

    public static void main(String[] args) {
        int[] original = {10, 20, 30};
        ImmutableDataPacket packet = new ImmutableDataPacket(original);

        original[0] = 999;
        packet.getPayload()[1] = 888;

        System.out.println("Packet payload 0: " + packet.getPayload()[0]);
        System.out.println("Packet payload 1: " + packet.getPayload()[1]);
    }
}""",
        "output": "Packet payload 0: 10\nPacket payload 1: 20",
        "explanation": "True immutability of object graphs with mutable components (like arrays) requires defensive copying."
    },
    {
        "id": "ex-oop10-4-4",
        "title": "Immutable Date Range Validator",
        "problemStatement": "Create an immutable `DateRange` class with private final `int startDay` and `int endDay`. In the constructor, enforce that `startDay <= endDay`; if violated, swap them or throw an exception. Provide with-er `withEndDay(int newEnd)`. In `main()`, test immutability.",
        "hint": "Validate invariant in constructor. In withEndDay(), validate invariant before returning new instance.",
        "solutionCode": """public class Solution {
    static final class DateRange {
        private final int startDay;
        private final int endDay;

        public DateRange(int start, int end) {
            if (start <= end) {
                this.startDay = start;
                this.endDay = end;
            } else {
                this.startDay = end;
                this.endDay = start;
            }
        }

        public DateRange withEndDay(int newEnd) {
            return new DateRange(this.startDay, newEnd);
        }

        public int getDuration() { return endDay - startDay + 1; }
    }

    public static void main(String[] args) {
        DateRange r1 = new DateRange(1, 10);
        DateRange r2 = r1.withEndDay(15);
        System.out.println("Range 1 duration: " + r1.getDuration() + " days");
        System.out.println("Range 2 duration: " + r2.getDuration() + " days");
    }
}""",
        "output": "Range 1 duration: 10 days\nRange 2 duration: 15 days",
        "explanation": "Invariants are checked at construction time; with-ers delegate back to the constructor to guarantee invariant preservation."
    },
    {
        "id": "ex-oop10-4-5",
        "title": "Final Reference vs Final Object Trap",
        "problemStatement": "Write a demonstration showing that declaring `final int[] arr = {1, 2}` does NOT make the array immutable. Alter `arr[0] = 99`. Then show how an immutable wrapper `ReadOnlyIntArray` prevents this. Print both results.",
        "hint": "A final reference variable only prevents reassignment of the variable, not mutation of elements.",
        "solutionCode": """public class Solution {
    static final class ReadOnlyIntArray {
        private final int[] data;

        public ReadOnlyIntArray(int[] input) {
            this.data = (input != null) ? input.clone() : new int[0];
        }

        public int get(int index) { return data[index]; }
        public int size() { return data.length; }
    }

    public static void main(String[] args) {
        final int[] raw = {1, 2};
        raw[0] = 99; // Legal! Mutates heap
        System.out.println("Final array element modified: " + raw[0]);

        ReadOnlyIntArray safe = new ReadOnlyIntArray(new int[]{1, 2});
        System.out.println("ReadOnlyIntArray element 0: " + safe.get(0));
    }
}""",
        "output": "Final array element modified: 99\nReadOnlyIntArray element 0: 1",
        "explanation": "Final reference != immutable object. Immutability requires encapsulating state without mutators."
    },
    {
        "id": "ex-oop10-4-6",
        "title": "Immutable User Credentials with Masked Display",
        "problemStatement": "Build an immutable `UserToken` class with private final `String userId` and private final `String tokenHash`. Provide getters and a method `String getMaskedToken()` that shows only the first 4 characters followed by '***'. In `main()`, print masked and original token info.",
        "hint": "String is already immutable, so private final String fields are naturally secure.",
        "solutionCode": """public class Solution {
    static final class UserToken {
        private final String userId;
        private final String tokenHash;

        public UserToken(String id, String token) {
            this.userId = id;
            this.tokenHash = token;
        }

        public String getUserId() { return userId; }

        public String getMaskedToken() {
            if (tokenHash == null || tokenHash.length() < 4) return "****";
            return tokenHash.substring(0, 4) + "****";
        }
    }

    public static void main(String[] args) {
        UserToken token = new UserToken("usr_88", "A98F72B4D1C3");
        System.out.println("User: " + token.getUserId());
        System.out.println("Masked: " + token.getMaskedToken());
    }
}""",
        "output": "User: usr_88\nMasked: A98F****",
        "explanation": "Immutable objects with String components are trivial to write because String itself is 100% immutable."
    },
    {
        "id": "ex-oop10-4-7",
        "title": "Immutable RGBA Color Representation",
        "problemStatement": "Create an immutable `RgbaColor` class with private final `int red`, `green`, `blue`, `alpha` clamped between [0, 255]. Provide `RgbaColor withAlpha(int a)`. In `main()`, create solid red (255, 0, 0, 255), derive transparent red (alpha 128), and verify the original color is untouched.",
        "hint": "Clamp values in constructor: Math.max(0, Math.min(255, val)).",
        "solutionCode": """public class Solution {
    static final class RgbaColor {
        private final int r, g, b, a;

        public RgbaColor(int r, int g, int b, int a) {
            this.r = clamp(r);
            this.g = clamp(g);
            this.b = clamp(b);
            this.a = clamp(a);
        }

        private static int clamp(int val) { return Math.max(0, Math.min(255, val)); }

        public RgbaColor withAlpha(int newAlpha) {
            return new RgbaColor(this.r, this.g, this.b, newAlpha);
        }

        public String toCss() {
            return "rgba(" + r + "," + g + "," + b + "," + (a / 255.0) + ")";
        }
    }

    public static void main(String[] args) {
        RgbaColor red = new RgbaColor(255, 0, 0, 255);
        RgbaColor semiRed = red.withAlpha(128);

        System.out.println("Original: " + red.toCss());
        System.out.println("Derived:  " + semiRed.toCss());
    }
}""",
        "output": "Original: rgba(255,0,0,1.0)\nDerived:  rgba(255,0,0,0.5019607843137255)",
        "explanation": "Value objects like colors are classic use cases for immutability; transformations return fresh color instances."
    },
    {
        "id": "ex-oop10-4-8",
        "title": "Immutable Shopping Cart Item with Total Calculation",
        "problemStatement": "Create an immutable `CartItem` with private final `String itemName`, `double unitPrice`, and `int quantity`. Provide `CartItem withQuantity(int newQty)`. In `main()`, create an item with qty 2, derive with qty 5, and compare total prices.",
        "hint": "getTotalPrice() returns unitPrice * quantity.",
        "solutionCode": """public class Solution {
    static final class CartItem {
        private final String itemName;
        private final double unitPrice;
        private final int quantity;

        public CartItem(String name, double price, int qty) {
            this.itemName = name;
            this.unitPrice = price;
            this.quantity = Math.max(1, qty);
        }

        public CartItem withQuantity(int newQty) {
            return new CartItem(this.itemName, this.unitPrice, newQty);
        }

        public double getTotalPrice() { return unitPrice * quantity; }
        public String getItemName() { return itemName; }
    }

    public static void main(String[] args) {
        CartItem item1 = new CartItem("Keyboard", 45.0, 2);
        CartItem item2 = item1.withQuantity(5);

        System.out.printf("Item 1 Total: $%.2f%n", item1.getTotalPrice());
        System.out.printf("Item 2 Total: $%.2f%n", item2.getTotalPrice());
    }
}""",
        "output": "Item 1 Total: $90.00\nItem 2 Total: $225.00",
        "explanation": "Immutability prevents order total tampering in e-commerce pipelines."
    },
    {
        "id": "ex-oop10-4-9",
        "title": "Chained Evolution of Immutable Configuration",
        "problemStatement": "Build an immutable `ServerConfig` with `host`, `port`, `ssl`. Provide `withHost`, `withPort`, and `withSsl` methods. In `main()`, chain updates: `config.withPort(8443).withSsl(true)` and verify base config was unchanged.",
        "hint": "Return new ServerConfig in each with-er method, enabling fluent chaining.",
        "solutionCode": """public class Solution {
    static final class ServerConfig {
        private final String host;
        private final int port;
        private final boolean ssl;

        public ServerConfig(String host, int port, boolean ssl) {
            this.host = host;
            this.port = port;
            this.ssl = ssl;
        }

        public ServerConfig withPort(int port) { return new ServerConfig(this.host, port, this.ssl); }
        public ServerConfig withSsl(boolean ssl) { return new ServerConfig(this.host, this.port, ssl); }

        public void print() {
            System.out.println("Server: " + host + ":" + port + " [SSL: " + ssl + "]");
        }
    }

    public static void main(String[] args) {
        ServerConfig base = new ServerConfig("localhost", 8080, false);
        ServerConfig prod = base.withPort(8443).withSsl(true);

        base.print();
        prod.print();
    }
}""",
        "output": "Server: localhost:8080 [SSL: false]\nServer: localhost:8443 [SSL: true]",
        "explanation": "Chained with-er calls create a clean, fluent API for creating configured variants of immutable objects."
    },
    {
        "id": "ex-oop10-4-10",
        "title": "Immutable Fraction Arithmetic with Canonical Simplification",
        "problemStatement": "Design an immutable `Fraction` class with private final `int numerator` and `denominator`. The constructor simplifies the fraction using greatest common divisor (GCD). Provide `Fraction multiply(Fraction other)`. In `main()`, multiply 2/4 by 3/6 and display the simplified product 1/4.",
        "hint": "Calculate gcd(a, b) in a private helper, simplify in constructor, and multiply: num1*num2 / den1*den2.",
        "solutionCode": """public class Solution {
    static final class Fraction {
        private final int num;
        private final int den;

        public Fraction(int n, int d) {
            if (d == 0) throw new IllegalArgumentException("Denominator cannot be zero");
            int g = gcd(Math.abs(n), Math.abs(d));
            this.num = (d < 0 ? -n : n) / g;
            this.den = Math.abs(d) / g;
        }

        private static int gcd(int a, int b) {
            return b == 0 ? a : gcd(b, a % b);
        }

        public Fraction multiply(Fraction other) {
            return new Fraction(this.num * other.num, this.den * other.den);
        }

        public String toString() { return num + "/" + den; }
    }

    public static void main(String[] args) {
        Fraction f1 = new Fraction(2, 4); // simplifies to 1/2
        Fraction f2 = new Fraction(3, 6); // simplifies to 1/2
        Fraction result = f1.multiply(f2); // 1/4

        System.out.println("f1: " + f1);
        System.out.println("f2: " + f2);
        System.out.println("Result: " + result);
    }
}""",
        "output": "f1: 1/2\nf2: 1/2\nResult: 1/4",
        "explanation": "Mathematical value objects like Fraction are prime examples of the immutable class design pattern."
    }
]

content = (
    "import { ProgrammingExercise } from '../../detailedLessons';\n\n"
    "// ============================================================\n"
    "// MODULE 10: ENCAPSULATION & DATA HIDING - PROGRAMMING EXERCISES\n"
    "// Total: 40 exercises (10 per sub-lesson)\n"
    "// Progressive difficulty: Beginner to Medium-Hard\n"
    "// ============================================================\n\n"
    "export const oop10Exercises: Record<string, ProgrammingExercise[]> = "
    + json.dumps(exercises, indent=2)
    + ";\n"
)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully generated {sum(len(v) for v in exercises.values())} exercises in {target_path}")
