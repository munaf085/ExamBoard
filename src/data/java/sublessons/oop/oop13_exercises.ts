import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 13: ABSTRACTION & INTERFACES - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// Constraints: Zero forward topics (NO collections, NO lambdas/streams)
// ============================================================

export const oop13Exercises: Record<string, ProgrammingExercise[]> = {
  'abstract-classes-and-methods': [
    {
      id: 'ex-abs-class-1',
      title: 'Geometric Perimeter and Area Solver',
      problemStatement: 'Create an abstract class `Shape` with a private `color` field, a constructor, a concrete getter `getColor()`, and two abstract methods: `double calculateArea()` and `double calculatePerimeter()`. Implement two concrete subclasses: `Circle` (with `radius`) and `Rectangle` (with `width` and `height`). In `main()`, create an array of `Shape` objects containing a Circle of radius 3.0 (color "Red") and a Rectangle of 4.0 x 5.0 (color "Blue"). Iterate through the array and print each shape\'s color, area, and perimeter rounded to 2 decimal places.',
      hint: 'Use `Math.PI` for the circle calculations. When calling methods on shapes in the array, polymorphic dispatch will automatically invoke the subclass formulas.',
      solutionCode: `abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }

    public String getColor() {
        return color;
    }

    public abstract double calculateArea();
    public abstract double calculatePerimeter();
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }

    @Override
    public double calculatePerimeter() {
        return 2 * (width + height);
    }
}

public class Solution {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[] {
            new Circle("Red", 3.0),
            new Rectangle("Blue", 4.0, 5.0)
        };

        for (int i = 0; i < shapes.length; i++) {
            System.out.printf("%s Shape -> Area: %.2f, Perimeter: %.2f%n",
                shapes[i].getColor(),
                shapes[i].calculateArea(),
                shapes[i].calculatePerimeter());
        }
    }
}`,
      output: `Red Shape -> Area: 28.27, Perimeter: 18.85
Blue Shape -> Area: 20.00, Perimeter: 18.00`,
      explanation: 'The abstract Shape class cannot be instantiated, but an array of Shape references can hold concrete Circle and Rectangle instances. Each subclass implements calculateArea() and calculatePerimeter() to satisfy the abstract contract.'
    },
    {
      id: 'ex-abs-class-2',
      title: 'Vehicle Fuel Efficiency and Range Model',
      problemStatement: 'Define an abstract class `Vehicle` with fields `model` (String) and `fuelCapacity` (double in liters). Include a constructor and an abstract method `double calculateMaxRange()`. Create two subclasses: `Sedan` (fuel efficiency of 15.0 km/liter) and `Truck` (fuel efficiency of 6.5 km/liter with a cargo penalty factor: efficiency decreases by 0.5 km/l for every 1000 kg of cargo loaded, passed in constructor). In `main()`, instantiate a Sedan with 50 liters and a Truck with 120 liters carrying 3000 kg cargo. Print the maximum range for each.',
      hint: 'For the truck, effective efficiency is `6.5 - (cargoWeight / 1000.0) * 0.5`. Range is fuel capacity multiplied by effective efficiency.',
      solutionCode: `abstract class Vehicle {
    private String model;
    private double fuelCapacity;

    public Vehicle(String model, double fuelCapacity) {
        this.model = model;
        this.fuelCapacity = fuelCapacity;
    }

    public String getModel() {
        return model;
    }

    public double getFuelCapacity() {
        return fuelCapacity;
    }

    public abstract double calculateMaxRange();
}

class Sedan extends Vehicle {
    private static final double KM_PER_LITER = 15.0;

    public Sedan(String model, double fuelCapacity) {
        super(model, fuelCapacity);
    }

    @Override
    public double calculateMaxRange() {
        return getFuelCapacity() * KM_PER_LITER;
    }
}

class Truck extends Vehicle {
    private double cargoWeight;

    public Truck(String model, double fuelCapacity, double cargoWeight) {
        super(model, fuelCapacity);
        this.cargoWeight = cargoWeight;
    }

    @Override
    public double calculateMaxRange() {
        double efficiency = 6.5 - (cargoWeight / 1000.0) * 0.5;
        if (efficiency < 1.0) efficiency = 1.0;
        return getFuelCapacity() * efficiency;
    }
}

public class Solution {
    public static void main(String[] args) {
        Vehicle sedan = new Sedan("Camry", 50.0);
        Vehicle truck = new Truck("Mack Titan", 120.0, 3000.0);

        System.out.printf("%s Max Range: %.1f km%n", sedan.getModel(), sedan.calculateMaxRange());
        System.out.printf("%s Max Range: %.1f km%n", truck.getModel(), truck.calculateMaxRange());
    }
}`,
      output: `Camry Max Range: 750.0 km
Mack Titan Max Range: 600.0 km`,
      explanation: 'Sedan and Truck extend Vehicle and override calculateMaxRange(). The abstract class enforces that every vehicle provides its range calculation based on its specific mechanical and payload profile.'
    },
    {
      id: 'ex-abs-class-3',
      title: 'Employee Bonus Distribution Engine',
      problemStatement: 'Design an abstract class `Employee` with fields `id` (int), `name` (String), and `baseSalary` (double). Include an abstract method `double calculateAnnualBonus()`. Implement subclasses `Manager` (bonus is 20% of base salary plus $500 per team member managed) and `Engineer` (bonus is 10% of base salary plus $1500 if certificationsCompleted > 2, else $500). In `main()`, create an array with 1 Manager and 2 Engineers and display each employee\'s total compensation (baseSalary + bonus).',
      hint: 'Constructor chaining via `super(id, name, baseSalary)` ensures shared state is initialized by Employee.',
      solutionCode: `abstract class Employee {
    private int id;
    private String name;
    private double baseSalary;

    public Employee(int id, String name, double baseSalary) {
        this.id = id;
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public String getName() { return name; }
    public double getBaseSalary() { return baseSalary; }

    public abstract double calculateAnnualBonus();

    public double getTotalCompensation() {
        return baseSalary + calculateAnnualBonus();
    }
}

class Manager extends Employee {
    private int teamSize;

    public Manager(int id, String name, double baseSalary, int teamSize) {
        super(id, name, baseSalary);
        this.teamSize = teamSize;
    }

    @Override
    public double calculateAnnualBonus() {
        return (getBaseSalary() * 0.20) + (teamSize * 500.0);
    }
}

class Engineer extends Employee {
    private int certifications;

    public Engineer(int id, String name, double baseSalary, int certifications) {
        super(id, name, baseSalary);
        this.certifications = certifications;
    }

    @Override
    public double calculateAnnualBonus() {
        double certBonus = certifications > 2 ? 1500.0 : 500.0;
        return (getBaseSalary() * 0.10) + certBonus;
    }
}

public class Solution {
    public static void main(String[] args) {
        Employee[] staff = new Employee[] {
            new Manager(101, "Alice", 90000.0, 5),
            new Engineer(102, "Bob", 80000.0, 3),
            new Engineer(103, "Charlie", 70000.0, 1)
        };

        for (int i = 0; i < staff.length; i++) {
            System.out.printf("%s Total Comp: $%.2f%n",
                staff[i].getName(), staff[i].getTotalCompensation());
        }
    }
}`,
      output: `Alice Total Comp: $110500.00
Bob Total Comp: $89500.00
Charlie Total Comp: $77500.00`,
      explanation: 'The abstract Employee class defines a concrete helper getTotalCompensation() that internally calls the abstract method calculateAnnualBonus(), demonstrating polymorphic delegation.'
    },
    {
      id: 'ex-abs-class-4',
      title: 'Banking Account Fee Deductor',
      problemStatement: 'Write an abstract class `BankAccount` with `accountNumber` (String) and `balance` (double). Include methods `deposit(double amount)`, `withdraw(double amount)`, and abstract method `void applyMonthlyMaintenance()`. Subclass `SavingsAccount` (requires minimum balance of 500; if balance < 500, deduct a $15 fee, otherwise add 0.5% interest to balance). Subclass `CheckingAccount` (has a monthly fee of $5, plus $0.50 for each transaction executed during the month). In `main()`, simulate one month of activity on both accounts and print final balances.',
      hint: 'In CheckingAccount, increment a `transactionCount` whenever deposit() or withdraw() succeeds, then reset it to 0 inside applyMonthlyMaintenance().',
      solutionCode: `abstract class BankAccount {
    private String accountNumber;
    protected double balance;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public String getAccountNumber() { return accountNumber; }
    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public abstract void applyMonthlyMaintenance();
}

class SavingsAccount extends BankAccount {
    public SavingsAccount(String accNo, double initialBalance) {
        super(accNo, initialBalance);
    }

    @Override
    public void applyMonthlyMaintenance() {
        if (balance < 500.0) {
            balance -= 15.0;
        } else {
            balance += balance * 0.005; // 0.5% interest
        }
    }
}

class CheckingAccount extends BankAccount {
    private int transactionCount = 0;

    public CheckingAccount(String accNo, double initialBalance) {
        super(accNo, initialBalance);
    }

    @Override
    public void deposit(double amount) {
        super.deposit(amount);
        transactionCount++;
    }

    @Override
    public boolean withdraw(double amount) {
        boolean ok = super.withdraw(amount);
        if (ok) transactionCount++;
        return ok;
    }

    @Override
    public void applyMonthlyMaintenance() {
        double fee = 5.0 + (transactionCount * 0.50);
        balance -= fee;
        transactionCount = 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        SavingsAccount sav = new SavingsAccount("SA-100", 1000.0);
        CheckingAccount chk = new CheckingAccount("CA-200", 500.0);

        chk.deposit(100.0);
        chk.withdraw(50.0);

        sav.applyMonthlyMaintenance();
        chk.applyMonthlyMaintenance();

        System.out.printf("Savings Balance: $%.2f%n", sav.getBalance());
        System.out.printf("Checking Balance: $%.2f%n", chk.getBalance());
    }
}`,
      output: `Savings Balance: $1005.00
Checking Balance: $544.00`,
      explanation: 'Both accounts share balance state and deposit/withdraw mechanics, but each supplies its own distinct monthly fee/interest maintenance logic via the abstract method.'
    },
    {
      id: 'ex-abs-class-5',
      title: 'Game Unit Attack and Defense Pipeline',
      problemStatement: 'Build an abstract class `GameUnit` with `name` (String), `hp` (int), and an abstract method `void takeDamage(int incomingDamage)`. Create two subclasses: `ArmoredKnight` (reduces all incoming damage by its `armorRating` before applying it to hp) and `MagicWizard` (has a `magicShield` pool; incoming damage damages magicShield first, and only remaining damage reduces hp). In `main()`, instantiate a Knight (hp=100, armor=10) and a Wizard (hp=80, shield=25). Attack both with 30 damage and print remaining health.',
      hint: 'Ensure hp does not drop below 0: use `Math.max(0, hp)`.',
      solutionCode: `abstract class GameUnit {
    private String name;
    protected int hp;

    public GameUnit(String name, int hp) {
        this.name = name;
        this.hp = hp;
    }

    public String getName() { return name; }
    public int getHp() { return hp; }

    public abstract void takeDamage(int incomingDamage);
}

class ArmoredKnight extends GameUnit {
    private int armorRating;

    public ArmoredKnight(String name, int hp, int armorRating) {
        super(name, hp);
        this.armorRating = armorRating;
    }

    @Override
    public void takeDamage(int incomingDamage) {
        int actualDamage = Math.max(1, incomingDamage - armorRating);
        hp = Math.max(0, hp - actualDamage);
    }
}

class MagicWizard extends GameUnit {
    private int magicShield;

    public MagicWizard(String name, int hp, int magicShield) {
        super(name, hp);
        this.magicShield = magicShield;
    }

    @Override
    public void takeDamage(int incomingDamage) {
        if (magicShield >= incomingDamage) {
            magicShield -= incomingDamage;
        } else {
            int leftover = incomingDamage - magicShield;
            magicShield = 0;
            hp = Math.max(0, hp - leftover);
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        GameUnit knight = new ArmoredKnight("Sir Galahad", 100, 10);
        GameUnit wizard = new MagicWizard("Gandalf", 80, 25);

        knight.takeDamage(30);
        wizard.takeDamage(30);

        System.out.println(knight.getName() + " HP: " + knight.getHp());
        System.out.println(wizard.getName() + " HP: " + wizard.getHp());
    }
}`,
      output: `Sir Galahad HP: 80
Gandalf HP: 75`,
      explanation: 'ArmoredKnight absorbs 10 damage via armor, taking 20 damage (100 - 20 = 80). Wizard absorbs 25 damage via shield, taking 5 damage to hp (80 - 5 = 75).'
    },
    {
      id: 'ex-abs-class-6',
      title: 'Invariant Report Generation Pipeline',
      problemStatement: 'Implement the Template Method pattern using an abstract class `ReportGenerator`. The class has a `final void generate(String title)` method that calls in order: `printHeader(title)`, `printBody()`, and `printFooter()`. `printHeader` and `printFooter` are concrete, while `printBody()` is abstract. Subclass `SalesAuditReport` (prints sales figures: Revenue $45,000) and `InventoryReport` (prints warehouse items: 120 SKUs active). Execute both in `main()`.',
      hint: 'Mark generate() as final to prevent subclasses from altering the step sequence.',
      solutionCode: `abstract class ReportGenerator {
    public final void generate(String title) {
        printHeader(title);
        printBody();
        printFooter();
        System.out.println();
    }

    private void printHeader(String title) {
        System.out.println("=== REPORT: " + title.toUpperCase() + " ===");
    }

    protected abstract void printBody();

    private void printFooter() {
        System.out.println("=== END OF REPORT ===");
    }
}

class SalesAuditReport extends ReportGenerator {
    @Override
    protected void printBody() {
        System.out.println("Total Sales: $45,000");
        System.out.println("Profit Margin: 24.5%");
    }
}

class InventoryReport extends ReportGenerator {
    @Override
    protected void printBody() {
        System.out.println("Active SKUs in Warehouse: 120");
        System.out.println("Low Stock Alerts: 3");
    }
}

public class Solution {
    public static void main(String[] args) {
        ReportGenerator r1 = new SalesAuditReport();
        r1.generate("Quarterly Sales");

        ReportGenerator r2 = new InventoryReport();
        r2.generate("Depot Stock");
    }
}`,
      output: `=== REPORT: QUARTERLY SALES ===
Total Sales: $45,000
Profit Margin: 24.5%
=== END OF REPORT ===

=== REPORT: DEPOT STOCK ===
Active SKUs in Warehouse: 120
Low Stock Alerts: 3
=== END OF REPORT ===
`,
      explanation: 'The Template Method pattern establishes the structural sequence (header -> body -> footer) in the base class, delegating only the body formatting to subclasses.'
    },
    {
      id: 'ex-abs-class-7',
      title: 'Multi-tier Appliance Power Monitor',
      problemStatement: 'Demonstrate multi-tier abstract inheritance: Create an abstract class `Appliance` with `brand` (String) and abstract `int getBaseWattage()`. Create an intermediate abstract class `HeatingAppliance` that extends `Appliance`, adds a `heatLevel` field (1 to 5), and overrides `getBaseWattage()` to return `heatLevel * 250`. Create a concrete subclass `SpaceHeater` that extends `HeatingAppliance` and adds an `int fanWattage` (50W) to calculate total wattage `getBaseWattage() + fanWattage`. In `main()`, instantiate SpaceHeater("Dyson", level 3) and display brand and total wattage.',
      hint: 'An intermediate abstract class does not need to implement all methods, and can provide partial overrides.',
      solutionCode: `abstract class Appliance {
    private String brand;

    public Appliance(String brand) {
        this.brand = brand;
    }

    public String getBrand() { return brand; }

    public abstract int getBaseWattage();
}

abstract class HeatingAppliance extends Appliance {
    protected int heatLevel;

    public HeatingAppliance(String brand, int heatLevel) {
        super(brand);
        this.heatLevel = heatLevel;
    }

    @Override
    public int getBaseWattage() {
        return heatLevel * 250;
    }
}

class SpaceHeater extends HeatingAppliance {
    private int fanWattage = 50;

    public SpaceHeater(String brand, int heatLevel) {
        super(brand, heatLevel);
    }

    public int calculateTotalPower() {
        return getBaseWattage() + fanWattage;
    }
}

public class Solution {
    public static void main(String[] args) {
        SpaceHeater heater = new SpaceHeater("Dyson", 3);
        System.out.println("Brand: " + heater.getBrand());
        System.out.println("Base Heating: " + heater.getBaseWattage() + "W");
        System.out.println("Total Power: " + heater.calculateTotalPower() + "W");
    }
}`,
      output: `Brand: Dyson
Base Heating: 750W
Total Power: 800W`,
      explanation: 'HeatingAppliance provides a concrete override of getBaseWattage() based on heatLevel (3 * 250 = 750). SpaceHeater inherits it and adds fanWattage (50W), resulting in 800W.'
    },
    {
      id: 'ex-abs-class-8',
      title: 'Protected Constructor and State Integrity',
      problemStatement: 'Create an abstract class `HardwareComponent` with a protected constructor that takes a `serialNumber` (String). The constructor must call an abstract method `boolean validateSerial(String s)`. If invalid, throw an `IllegalArgumentException("Invalid serial")`. Implement `MemoryModule` where a serial is valid only if it starts with "RAM-" and is at least 8 characters long. In `main()`, instantiate valid "RAM-1024-X" and print its serial; catch and report an invalid one "CPU-999".',
      hint: 'Be mindful of calling abstract methods in constructors in general, but here it validates the constructor argument before assignment.',
      solutionCode: `abstract class HardwareComponent {
    private String serialNumber;

    protected HardwareComponent(String serialNumber) {
        if (!validateSerial(serialNumber)) {
            throw new IllegalArgumentException("Invalid serial: " + serialNumber);
        }
        this.serialNumber = serialNumber;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    protected abstract boolean validateSerial(String s);
}

class MemoryModule extends HardwareComponent {
    public MemoryModule(String serial) {
        super(serial);
    }

    @Override
    protected boolean validateSerial(String s) {
        return s != null && s.startsWith("RAM-") && s.length() >= 8;
    }
}

public class Solution {
    public static void main(String[] args) {
        try {
            MemoryModule m1 = new MemoryModule("RAM-1024-X");
            System.out.println("Created: " + m1.getSerialNumber());
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        try {
            MemoryModule m2 = new MemoryModule("CPU-999");
            System.out.println("Created: " + m2.getSerialNumber());
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      output: `Created: RAM-1024-X
Invalid serial: CPU-999`,
      explanation: 'The abstract superclass constructor enforces invariant validation through the abstract validateSerial() method implemented by MemoryModule.'
    },
    {
      id: 'ex-abs-class-9',
      title: 'Beverage Recipe Preparation Workflow',
      problemStatement: 'Create an abstract class `Beverage` with `final void prepareRecipe()` that calls `boilWater()`, `brew()`, `pourInCup()`, and `addCondiments()`. `boilWater()` and `pourInCup()` are concrete methods printing standard steps. `brew()` and `addCondiments()` are abstract. Implement `Coffee` (brew: "Dripping coffee through filter", condiments: "Adding sugar and milk") and `Tea` (brew: "Steeping tea leaves", condiments: "Adding lemon slice"). In `main()`, prepare both drinks.',
      hint: 'Follow the classic Template Method design. Subclasses customize only the specific ingredients.',
      solutionCode: `abstract class Beverage {
    public final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
        System.out.println("--- Beverage ready ---\\n");
    }

    private void boilWater() {
        System.out.println("Boiling spring water to 100C");
    }

    private void pourInCup() {
        System.out.println("Pouring liquid into serving mug");
    }

    protected abstract void brew();
    protected abstract void addCondiments();
}

class Coffee extends Beverage {
    @Override
    protected void brew() {
        System.out.println("Dripping dark roast coffee through paper filter");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding organic raw sugar and steamed whole milk");
    }
}

class Tea extends Beverage {
    @Override
    protected void brew() {
        System.out.println("Steeping Earl Grey black tea leaves for 3 minutes");
    }

    @Override
    protected void addCondiments() {
        System.out.println("Adding fresh organic lemon wedge");
    }
}

public class Solution {
    public static void main(String[] args) {
        Beverage coffee = new Coffee();
        coffee.prepareRecipe();

        Beverage tea = new Tea();
        tea.prepareRecipe();
    }
}`,
      output: `Boiling spring water to 100C
Dripping dark roast coffee through paper filter
Pouring liquid into serving mug
Adding organic raw sugar and steamed whole milk
--- Beverage ready ---

Boiling spring water to 100C
Steeping Earl Grey black tea leaves for 3 minutes
Pouring liquid into serving mug
Adding fresh organic lemon wedge
--- Beverage ready ---
`,
      explanation: 'The abstract Beverage class guarantees the execution sequence while allowing Coffee and Tea to customize brewing and condiment addition.'
    },
    {
      id: 'ex-abs-class-10',
      title: 'Abstract Sensor Calibration Matrix',
      problemStatement: 'Define an abstract class `Sensor` with `id` (int), an array of raw integer readings `int[] rawData`, and an abstract method `double getCalibratedAverage()`. Implement `TemperatureSensor` (calibrated value = raw / 10.0) and `PressureSensor` (calibrated value = (raw - 100) * 1.5). In `main()`, create an array of Sensors containing a TemperatureSensor with readings {220, 225, 230} and a PressureSensor with readings {110, 120, 130}. Calculate and print the calibrated averages.',
      hint: 'Iterate over rawData, apply the calibration to each element, and compute the mathematical average.',
      solutionCode: `abstract class Sensor {
    private int id;
    protected int[] rawData;

    public Sensor(int id, int[] rawData) {
        this.id = id;
        this.rawData = rawData;
    }

    public int getId() { return id; }

    public abstract double getCalibratedAverage();
}

class TemperatureSensor extends Sensor {
    public TemperatureSensor(int id, int[] rawData) {
        super(id, rawData);
    }

    @Override
    public double getCalibratedAverage() {
        if (rawData == null || rawData.length == 0) return 0.0;
        double sum = 0.0;
        for (int i = 0; i < rawData.length; i++) {
            sum += rawData[i] / 10.0;
        }
        return sum / rawData.length;
    }
}

class PressureSensor extends Sensor {
    public PressureSensor(int id, int[] rawData) {
        super(id, rawData);
    }

    @Override
    public double getCalibratedAverage() {
        if (rawData == null || rawData.length == 0) return 0.0;
        double sum = 0.0;
        for (int i = 0; i < rawData.length; i++) {
            sum += (rawData[i] - 100) * 1.5;
        }
        return sum / rawData.length;
    }
}

public class Solution {
    public static void main(String[] args) {
        Sensor[] fleet = new Sensor[] {
            new TemperatureSensor(1, new int[]{220, 225, 230}),
            new PressureSensor(2, new int[]{110, 120, 130})
        };

        for (int i = 0; i < fleet.length; i++) {
            System.out.printf("Sensor #%d Avg: %.2f%n",
                fleet[i].getId(), fleet[i].getCalibratedAverage());
        }
    }
}`,
      output: `Sensor #1 Avg: 22.50
Sensor #2 Avg: 30.00`,
      explanation: 'TemperatureSensor divides raw readings by 10.0 (avg: 22.50). PressureSensor applies (raw - 100) * 1.5 (values: 15, 30, 45; avg: 30.00).'
    }
  ],

  'interfaces-and-contracts': [
    {
      id: 'ex-iface-contract-1',
      title: 'Audio and Video Media Player Interface',
      problemStatement: 'Define an interface `Playable` with methods `void play()` and `void stop()`. Create two classes: `AudioTrack` (with field `title`) and `VideoClip` (with fields `title` and `resolution`). Both implement `Playable`. In `main()`, instantiate an AudioTrack ("Stairway to Heaven") and a VideoClip ("Tutorial.mp4", "1080p") as `Playable` references. Invoke `play()` and `stop()` on each.',
      hint: 'Remember that methods in interfaces are implicitly public, so implemented methods in classes must be marked `public`.',
      solutionCode: `interface Playable {
    void play();
    void stop();
}

class AudioTrack implements Playable {
    private String title;

    public AudioTrack(String title) {
        this.title = title;
    }

    @Override
    public void play() {
        System.out.println("Playing audio track: " + title);
    }

    @Override
    public void stop() {
        System.out.println("Stopped audio track: " + title);
    }
}

class VideoClip implements Playable {
    private String title;
    private String resolution;

    public VideoClip(String title, String resolution) {
        this.title = title;
        this.resolution = resolution;
    }

    @Override
    public void play() {
        System.out.println("Streaming video: " + title + " at " + resolution);
    }

    @Override
    public void stop() {
        System.out.println("Stopped video playback: " + title);
    }
}

public class Solution {
    public static void main(String[] args) {
        Playable audio = new AudioTrack("Stairway to Heaven");
        Playable video = new VideoClip("Tutorial.mp4", "1080p");

        audio.play();
        audio.stop();

        video.play();
        video.stop();
    }
}`,
      output: `Playing audio track: Stairway to Heaven
Stopped audio track: Stairway to Heaven
Streaming video: Tutorial.mp4 at 1080p
Stopped video playback: Tutorial.mp4`,
      explanation: 'AudioTrack and VideoClip both implement Playable. Treating them via the Playable reference type allows client code to control playback uniformly.'
    },
    {
      id: 'ex-iface-contract-2',
      title: 'Printable and Archivable Legal Document',
      problemStatement: 'Create two interfaces: `Printable` (with `void printPreview()`) and `Archivable` (with `void archive(String storagePath)`). Create a class `LegalContract` with fields `contractId` and `clientName` that implements both interfaces. In `main()`, instantiate a contract, upcast to both interface types, and invoke their respective methods.',
      hint: 'A single class can implement multiple interfaces separated by commas: `implements Printable, Archivable`.',
      solutionCode: `interface Printable {
    void printPreview();
}

interface Archivable {
    void archive(String storagePath);
}

class LegalContract implements Printable, Archivable {
    private String contractId;
    private String clientName;

    public LegalContract(String contractId, String clientName) {
        this.contractId = contractId;
        this.clientName = clientName;
    }

    @Override
    public void printPreview() {
        System.out.println("CONTRACT PREVIEW [" + contractId + "] Client: " + clientName);
    }

    @Override
    public void archive(String storagePath) {
        System.out.println("Archived contract " + contractId + " to cold storage: " + storagePath);
    }
}

public class Solution {
    public static void main(String[] args) {
        LegalContract contract = new LegalContract("LC-2026-88", "Acme Corp");

        Printable printable = contract;
        printable.printPreview();

        Archivable archivable = contract;
        archivable.archive("/mnt/vault/2026/");
    }
}`,
      output: `CONTRACT PREVIEW [LC-2026-88] Client: Acme Corp
Archived contract LC-2026-88 to cold storage: /mnt/vault/2026/`,
      explanation: 'LegalContract demonstrates multiple inheritance of type. It can be passed to any subsystem expecting Printable or Archivable.'
    },
    {
      id: 'ex-iface-contract-3',
      title: 'Universal Storage Device Mountable Contract',
      problemStatement: 'Define an interface `Mountable` with constant `String MOUNT_ROOT = "/media/";` and methods `boolean mount(String deviceName)` and `void unmount()`. Implement `FlashDrive` (with `capacityGb`) and `NetworkShare` (with `serverIp`). In `main()`, create an array of `Mountable` objects, mount each, and then unmount each.',
      hint: 'The constant MOUNT_ROOT is implicitly public static final and can be used inside implementing methods or referenced directly.',
      solutionCode: `interface Mountable {
    String MOUNT_ROOT = "/media/";

    boolean mount(String deviceName);
    void unmount();
}

class FlashDrive implements Mountable {
    private int capacityGb;
    private String mountPoint = null;

    public FlashDrive(int capacityGb) {
        this.capacityGb = capacityGb;
    }

    @Override
    public boolean mount(String deviceName) {
        mountPoint = MOUNT_ROOT + deviceName;
        System.out.println("FlashDrive (" + capacityGb + "GB) mounted at: " + mountPoint);
        return true;
    }

    @Override
    public void unmount() {
        System.out.println("FlashDrive unmounted from: " + mountPoint);
        mountPoint = null;
    }
}

class NetworkShare implements Mountable {
    private String serverIp;
    private String mountPoint = null;

    public NetworkShare(String serverIp) {
        this.serverIp = serverIp;
    }

    @Override
    public boolean mount(String deviceName) {
        mountPoint = MOUNT_ROOT + "net_" + deviceName;
        System.out.println("NetworkShare (" + serverIp + ") mounted at: " + mountPoint);
        return true;
    }

    @Override
    public void unmount() {
        System.out.println("NetworkShare unmounted from: " + mountPoint);
        mountPoint = null;
    }
}

public class Solution {
    public static void main(String[] args) {
        Mountable[] devices = new Mountable[] {
            new FlashDrive(64),
            new NetworkShare("10.0.0.15")
        };

        for (int i = 0; i < devices.length; i++) {
            devices[i].mount("disk" + (i + 1));
            devices[i].unmount();
        }
    }
}`,
      output: `FlashDrive (64GB) mounted at: /media/disk1
FlashDrive unmounted from: /media/disk1
NetworkShare (10.0.0.15) mounted at: /media/net_disk2
NetworkShare unmounted from: /media/net_disk2`,
      explanation: 'The interface constant MOUNT_ROOT provides a standardized path prefix. FlashDrive and NetworkShare fulfill the mounting lifecycle polymorphically.'
    },
    {
      id: 'ex-iface-contract-4',
      title: 'Currency Converter Interface Hierarchy',
      problemStatement: 'Create an interface `CurrencyConverter` with method `double toUSD(double localAmount)`. Implement two classes: `EuroConverter` (1 EUR = 1.08 USD) and `YenConverter` (1 JPY = 0.0067 USD). Write a static helper in the main class: `void displayConversion(CurrencyConverter converter, String name, double amount)` that prints the converted amount formatted to 2 decimal places. Test both in `main()`.',
      hint: 'Passing an interface to a method decouples the display logic from the specific currency conversion algorithm.',
      solutionCode: `interface CurrencyConverter {
    double toUSD(double localAmount);
}

class EuroConverter implements CurrencyConverter {
    private static final double RATE = 1.08;

    @Override
    public double toUSD(double localAmount) {
        return localAmount * RATE;
    }
}

class YenConverter implements CurrencyConverter {
    private static final double RATE = 0.0067;

    @Override
    public double toUSD(double localAmount) {
        return localAmount * RATE;
    }
}

public class Solution {
    public static void displayConversion(CurrencyConverter converter, String name, double amount) {
        double usd = converter.toUSD(amount);
        System.out.printf("%.2f %s = $%.2f USD%n", amount, name, usd);
    }

    public static void main(String[] args) {
        displayConversion(new EuroConverter(), "EUR", 250.0);
        displayConversion(new YenConverter(), "JPY", 50000.0);
    }
}`,
      output: `250.00 EUR = $270.00 USD
50000.00 JPY = $335.00 USD`,
      explanation: 'displayConversion() accepts the CurrencyConverter interface, demonstrating polymorphic parameter passing.'
    },
    {
      id: 'ex-iface-contract-5',
      title: 'Dual-Interface Network Gateway Router',
      problemStatement: 'Create two interfaces: `PacketReceiver` (with `void receivePacket(String packet)`) and `PacketSender` (with `void sendPacket(String destination, String packet)`). Implement `NetworkGateway` which implements both interfaces and buffers up to 3 packets in a fixed-size String array. When sending, it empties its buffer. Test receiving 2 packets and dispatching them in `main()`.',
      hint: 'Manage the buffer index with a counter variable `int count = 0;`.',
      solutionCode: `interface PacketReceiver {
    void receivePacket(String packet);
}

interface PacketSender {
    void sendPacket(String destination, String packet);
}

class NetworkGateway implements PacketReceiver, PacketSender {
    private String[] buffer = new String[5];
    private int count = 0;

    @Override
    public void receivePacket(String packet) {
        if (count < buffer.length) {
            buffer[count++] = packet;
            System.out.println("Gateway buffered: " + packet);
        }
    }

    @Override
    public void sendPacket(String destination, String packet) {
        System.out.println("Dispatching packet '" + packet + "' to " + destination);
    }

    public void flushAll(String destination) {
        for (int i = 0; i < count; i++) {
            sendPacket(destination, buffer[i]);
            buffer[i] = null;
        }
        count = 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        NetworkGateway gateway = new NetworkGateway();
        gateway.receivePacket("AUTH_REQ_1");
        gateway.receivePacket("PAYLOAD_CHUNK_2");
        gateway.flushAll("192.168.1.100");
    }
}`,
      output: `Gateway buffered: AUTH_REQ_1
Gateway buffered: PAYLOAD_CHUNK_2
Dispatching packet 'AUTH_REQ_1' to 192.168.1.100
Dispatching packet 'PAYLOAD_CHUNK_2' to 192.168.1.100`,
      explanation: 'NetworkGateway implements both PacketReceiver and PacketSender, managing an internal buffer and routing packets cleanly.'
    },
    {
      id: 'ex-iface-contract-6',
      title: 'Marker Interface and Secure Payload Filter',
      problemStatement: 'Create a marker interface `SensitiveRecord` with no methods or fields. Define a class `AuditLog` (with `id` and `message`) and `SalaryRecord` (with `id` and `amount`) that implements `SensitiveRecord`. In `main()`, create an array of `Object` holding 2 AuditLogs and 2 SalaryRecords. Loop through the array and use `instanceof SensitiveRecord` to redact sensitive records (print "[REDACTED]") while printing standard records normally.',
      hint: 'A marker interface is empty. Check `if (obj instanceof SensitiveRecord)` to filter types.',
      solutionCode: `interface SensitiveRecord {}

class AuditLog {
    private int id;
    private String message;

    public AuditLog(int id, String message) {
        this.id = id;
        this.message = message;
    }

    public String getInfo() { return "Log #" + id + ": " + message; }
}

class SalaryRecord implements SensitiveRecord {
    private int id;
    private double amount;

    public SalaryRecord(int id, double amount) {
        this.id = id;
        this.amount = amount;
    }

    public String getInfo() { return "Salary #" + id + ": $" + amount; }
}

public class Solution {
    public static void main(String[] args) {
        Object[] records = new Object[] {
            new AuditLog(1, "Server reboot"),
            new SalaryRecord(101, 95000.0),
            new AuditLog(2, "Cache cleared"),
            new SalaryRecord(102, 110000.0)
        };

        for (int i = 0; i < records.length; i++) {
            if (records[i] instanceof SensitiveRecord) {
                System.out.println("Record " + i + ": [REDACTED SENSITIVE DATA]");
            } else if (records[i] instanceof AuditLog) {
                System.out.println("Record " + i + ": " + ((AuditLog) records[i]).getInfo());
            }
        }
    }
}`,
      output: `Record 0: Log #1: Server reboot
Record 1: [REDACTED SENSITIVE DATA]
Record 2: Log #2: Cache cleared
Record 3: [REDACTED SENSITIVE DATA]`,
      explanation: 'The marker interface SensitiveRecord acts as a runtime type tag, allowing the system to identify sensitive records without requiring any extra methods.'
    },
    {
      id: 'ex-iface-contract-7',
      title: 'Extended Sub-Interface Hardware Controller',
      problemStatement: 'Create an interface `BasicController` with `void powerOn()` and `void powerOff()`. Create an interface `AdvancedController` that extends `BasicController` and adds `void turboBoost()`. Implement `IndustrialRobot` using `AdvancedController`. In `main()`, instantiate an IndustrialRobot, assign it to a `BasicController` reference, call `powerOn()`, then downcast back to `AdvancedController` and call `turboBoost()`.',
      hint: 'Interfaces inherit from other interfaces using `extends`. Downcasting requires `(AdvancedController) basicRef`.',
      solutionCode: `interface BasicController {
    void powerOn();
    void powerOff();
}

interface AdvancedController extends BasicController {
    void turboBoost();
}

class IndustrialRobot implements AdvancedController {
    private boolean active = false;

    @Override
    public void powerOn() {
        active = true;
        System.out.println("Robot hydraulics powered ON.");
    }

    @Override
    public void powerOff() {
        active = false;
        System.out.println("Robot shut down safely.");
    }

    @Override
    public void turboBoost() {
        if (active) {
            System.out.println("Activating 200% hydraulic overdrive!");
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        BasicController basic = new IndustrialRobot();
        basic.powerOn();

        // Downcast to access sub-interface method
        if (basic instanceof AdvancedController) {
            AdvancedController adv = (AdvancedController) basic;
            adv.turboBoost();
        }

        basic.powerOff();
    }
}`,
      output: `Robot hydraulics powered ON.
Activating 200% hydraulic overdrive!
Robot shut down safely.`,
      explanation: 'AdvancedController extends BasicController, inheriting its methods and adding turboBoost(). Upcasting and downcasting work seamlessly with interface hierarchies.'
    },
    {
      id: 'ex-iface-contract-8',
      title: 'String Transformation Pipeline Contract',
      problemStatement: 'Define an interface `StringTransformer` with `String transform(String input)`. Implement `UpperCaseTransformer` (returns uppercase), `ReverseTransformer` (reverses character array), and `CensorTransformer` (replaces all vowels with "*"). In `main()`, create an array of `StringTransformer` and apply each sequentially to the input string "Java OOP".',
      hint: 'In CensorTransformer, replace [AEIOUaeiou] with asterisks.',
      solutionCode: `interface StringTransformer {
    String transform(String input);
}

class UpperCaseTransformer implements StringTransformer {
    @Override
    public String transform(String input) {
        return input == null ? "" : input.toUpperCase();
    }
}

class ReverseTransformer implements StringTransformer {
    @Override
    public String transform(String input) {
        if (input == null) return "";
        char[] chars = input.toCharArray();
        char[] rev = new char[chars.length];
        for (int i = 0; i < chars.length; i++) {
            rev[i] = chars[chars.length - 1 - i];
        }
        return new String(rev);
    }
}

class CensorTransformer implements StringTransformer {
    @Override
    public String transform(String input) {
        if (input == null) return "";
        char[] chars = input.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            char c = Character.toLowerCase(chars[i]);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                chars[i] = '*';
            }
        }
        return new String(chars);
    }
}

public class Solution {
    public static void main(String[] args) {
        StringTransformer[] pipeline = new StringTransformer[] {
            new UpperCaseTransformer(),
            new ReverseTransformer(),
            new CensorTransformer()
        };

        String text = "Java OOP";
        for (int i = 0; i < pipeline.length; i++) {
            text = pipeline[i].transform(text);
        }
        System.out.println("Transformed Result: " + text);
    }
}`,
      output: `Transformed Result: P** *V*J`,
      explanation: 'Pipeline transformation: "Java OOP" -> "JAVA OOP" -> "POO AVAJ" -> "P** *V*J". Each stage obeys the same StringTransformer contract.'
    },
    {
      id: 'ex-iface-contract-9',
      title: 'Decoupled Logger Contract with File and Console Providers',
      problemStatement: 'Define an interface `AppLogger` with `void log(String level, String msg)`. Implement `ConsoleLogger` (prints to System.out) and `BufferedMemoryLogger` (stores up to 3 log messages in a String array and prints all when full). In `main()`, test logging 3 messages with the memory logger.',
      hint: 'When count reaches the array length in BufferedMemoryLogger, print "--- Buffer Full: Flushing ---" and iterate over all logs.',
      solutionCode: `interface AppLogger {
    void log(String level, String msg);
}

class ConsoleLogger implements AppLogger {
    @Override
    public void log(String level, String msg) {
        System.out.println("[" + level + "] " + msg);
    }
}

class BufferedMemoryLogger implements AppLogger {
    private String[] buffer = new String[3];
    private int count = 0;

    @Override
    public void log(String level, String msg) {
        buffer[count++] = "[" + level + "] " + msg;
        if (count == buffer.length) {
            flush();
        }
    }

    private void flush() {
        System.out.println("--- Memory Flush ---");
        for (int i = 0; i < count; i++) {
            System.out.println(buffer[i]);
            buffer[i] = null;
        }
        count = 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        AppLogger logger = new BufferedMemoryLogger();
        logger.log("INFO", "Application starting");
        logger.log("DEBUG", "Connecting to database");
        logger.log("WARN", "Memory utilization high");
    }
}`,
      output: `--- Memory Flush ---
[INFO] Application starting
[DEBUG] Connecting to database
[WARN] Memory utilization high`,
      explanation: 'BufferedMemoryLogger buffers logs until the threshold is met, fulfilling the AppLogger contract while implementing custom internal flushing logic.'
    },
    {
      id: 'ex-iface-contract-10',
      title: 'Polymorphic Sort Comparator Contract',
      problemStatement: 'Write an interface `IntComparator` with method `int compare(int a, int b)` (returns negative if a < b, 0 if a == b, positive if a > b). Implement `AscendingComparator` and `DescendingComparator`. Write a static bubble sort method `void sort(int[] arr, IntComparator comp)` that sorts the array according to the comparator. In `main()`, sort `{42, 12, 88, 3, 27}` ascending, then descending, and print the results.',
      hint: 'In bubble sort, swap `arr[j]` and `arr[j+1]` if `comp.compare(arr[j], arr[j+1]) > 0`.',
      solutionCode: `interface IntComparator {
    int compare(int a, int b);
}

class AscendingComparator implements IntComparator {
    @Override
    public int compare(int a, int b) {
        return a - b;
    }
}

class DescendingComparator implements IntComparator {
    @Override
    public int compare(int a, int b) {
        return b - a;
    }
}

public class Solution {
    public static void sort(int[] arr, IntComparator comp) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (comp.compare(arr[j], arr[j + 1]) > 0) {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : "\\n"));
        }
    }

    public static void main(String[] args) {
        int[] data1 = new int[]{42, 12, 88, 3, 27};
        sort(data1, new AscendingComparator());
        System.out.print("Ascending: ");
        printArray(data1);

        int[] data2 = new int[]{42, 12, 88, 3, 27};
        sort(data2, new DescendingComparator());
        System.out.print("Descending: ");
        printArray(data2);
    }
}`,
      output: `Ascending: 3, 12, 27, 42, 88
Descending: 88, 42, 27, 12, 3`,
      explanation: 'The sort algorithm is completely decoupled from sort direction by accepting an IntComparator interface strategy.'
    }
  ],

  'abstract-class-vs-interface': [
    {
      id: 'ex-abs-vs-iface-1',
      title: 'Flying Animal vs Aircraft Capability Architecture',
      problemStatement: 'Model a system demonstrating IS-A vs CAN-DO. Create an abstract class `Animal` (with `species` and concrete `eat()`). Create an interface `Flyable` (with `void fly()`). Implement `Bat` (extends `Animal` and implements `Flyable`). Implement `Drone` (a machine that implements `Flyable`, but does NOT extend `Animal`). In `main()`, test `Bat` eating and flying, and `Drone` flying.',
      hint: 'A Bat IS-A Animal and CAN fly. A Drone is NOT an Animal, but CAN fly. Use Flyable for the shared capability.',
      solutionCode: `abstract class Animal {
    private String species;

    public Animal(String species) {
        this.species = species;
    }

    public String getSpecies() { return species; }

    public void eat() {
        System.out.println(species + " is eating sustenance.");
    }
}

interface Flyable {
    void fly();
}

class Bat extends Animal implements Flyable {
    public Bat(String species) {
        super(species);
    }

    @Override
    public void fly() {
        System.out.println(getSpecies() + " flutters through the night cave using echolocation.");
    }
}

class Drone implements Flyable {
    private String model;

    public Drone(String model) {
        this.model = model;
    }

    @Override
    public void fly() {
        System.out.println("Drone " + model + " spins 4 quadcopters to achieve lift.");
    }
}

public class Solution {
    public static void main(String[] args) {
        Bat bat = new Bat("Fruit Bat");
        bat.eat();
        bat.fly();

        Flyable drone = new Drone("DJI Phantom");
        drone.fly();
    }
}`,
      output: `Fruit Bat is eating sustenance.
Fruit Bat flutters through the night cave using echolocation.
Drone DJI Phantom spins 4 quadcopters to achieve lift.`,
      explanation: 'Bat has Animal identity and Flyable capability. Drone has no biological taxonomy, but shares the Flyable capability. Interfaces cross class boundaries cleanly.'
    },
    {
      id: 'ex-abs-vs-iface-2',
      title: 'Skeletal Integer List Implementation',
      problemStatement: 'Demonstrate the Skeletal Implementation pattern. Define an interface `CustomIntList` (with `add(int val)`, `get(int index)`, `size()`, `isEmpty()`). Create an abstract class `AbstractCustomIntList` implementing `CustomIntList` that provides a concrete `isEmpty()` (`size() == 0`). Create a concrete class `ArrayIntList` extending `AbstractCustomIntList` with a fixed 5-element int array. Test adding 3 items and querying `size()` and `isEmpty()` in `main()`.',
      hint: 'AbstractCustomIntList provides common logic (isEmpty) so ArrayIntList only has to implement add, get, and size.',
      solutionCode: `interface CustomIntList {
    void add(int val);
    int get(int index);
    int size();
    boolean isEmpty();
}

abstract class AbstractCustomIntList implements CustomIntList {
    @Override
    public boolean isEmpty() {
        return size() == 0;
    }
}

class ArrayIntList extends AbstractCustomIntList {
    private int[] elements = new int[5];
    private int count = 0;

    @Override
    public void add(int val) {
        if (count < elements.length) {
            elements[count++] = val;
        }
    }

    @Override
    public int get(int index) {
        if (index < 0 || index >= count) throw new IndexOutOfBoundsException();
        return elements[index];
    }

    @Override
    public int size() {
        return count;
    }
}

public class Solution {
    public static void main(String[] args) {
        CustomIntList list = new ArrayIntList();
        System.out.println("Initially empty? " + list.isEmpty());

        list.add(10);
        list.add(20);
        list.add(30);

        System.out.println("Empty after adds? " + list.isEmpty());
        System.out.println("Size: " + list.size());
        System.out.println("Element at 1: " + list.get(1));
    }
}`,
      output: `Initially empty? true
Empty after adds? false
Size: 3
Element at 1: 20`,
      explanation: 'The Skeletal Implementation pattern combines an interface (public API) with an abstract class (reusable helper implementations like isEmpty()).'
    },
    {
      id: 'ex-abs-vs-iface-3',
      title: 'E-Commerce Product vs Discountable and Taxable Capabilities',
      problemStatement: 'Create an abstract class `Product` with `sku` (String), `title` (String), and `basePrice` (double). Create interfaces `Discountable` (`double getDiscountAmount()`) and `Taxable` (`double getTaxAmount()`). Create a class `ElectronicsItem` that extends `Product` and implements both `Discountable` (10% discount) and `Taxable` (8% tax). In `main()`, instantiate an item ($500.00), compute final price `(basePrice - discount + tax)`, and print all breakdown figures.',
      hint: 'The base class holds identity and state; interfaces supply pricing rules.',
      solutionCode: `abstract class Product {
    private String sku;
    private String title;
    protected double basePrice;

    public Product(String sku, String title, double basePrice) {
        this.sku = sku;
        this.title = title;
        this.basePrice = basePrice;
    }

    public String getTitle() { return title; }
    public double getBasePrice() { return basePrice; }
}

interface Discountable {
    double getDiscountAmount();
}

interface Taxable {
    double getTaxAmount();
}

class ElectronicsItem extends Product implements Discountable, Taxable {
    public ElectronicsItem(String sku, String title, double basePrice) {
        super(sku, title, basePrice);
    }

    @Override
    public double getDiscountAmount() {
        return basePrice * 0.10; // 10% discount
    }

    @Override
    public double getTaxAmount() {
        return (basePrice - getDiscountAmount()) * 0.08; // 8% sales tax
    }

    public double getFinalPrice() {
        return basePrice - getDiscountAmount() + getTaxAmount();
    }
}

public class Solution {
    public static void main(String[] args) {
        ElectronicsItem laptop = new ElectronicsItem("LAP-99", "Pro Laptop", 500.0);
        System.out.printf("Item: %s%n", laptop.getTitle());
        System.out.printf("Base Price: $%.2f%n", laptop.getBasePrice());
        System.out.printf("Discount: -$%.2f%n", laptop.getDiscountAmount());
        System.out.printf("Tax: +$%.2f%n", laptop.getTaxAmount());
        System.out.printf("Final Price: $%.2f%n", laptop.getFinalPrice());
    }
}`,
      output: `Item: Pro Laptop
Base Price: $500.00
Discount: -$50.00
Tax: +$36.00
Final Price: $486.00`,
      explanation: 'ElectronicsItem inherits state (sku, title, basePrice) from abstract class Product and implements calculation rules from Discountable and Taxable.'
    },
    {
      id: 'ex-abs-vs-iface-4',
      title: 'Database Connection Resource Lifecycle',
      problemStatement: 'Define an interface `ClosableResource` with `void close()`. Create an abstract class `DatabaseConnection` with `url` (String) and `isConnected` (boolean), a constructor, and abstract method `void executeQuery(String sql)`. Implement `PostgresConnection` that extends `DatabaseConnection` and implements `ClosableResource`. In `main()`, simulate opening, executing a query, and closing the connection.',
      hint: 'In PostgresConnection.close(), set `isConnected = false;` and print a closing message.',
      solutionCode: `interface ClosableResource {
    void close();
}

abstract class DatabaseConnection {
    private String url;
    protected boolean isConnected;

    public DatabaseConnection(String url) {
        this.url = url;
        this.isConnected = true;
    }

    public String getUrl() { return url; }

    public abstract void executeQuery(String sql);
}

class PostgresConnection extends DatabaseConnection implements ClosableResource {
    public PostgresConnection(String url) {
        super(url);
    }

    @Override
    public void executeQuery(String sql) {
        if (!isConnected) {
            System.out.println("Error: connection is closed.");
            return;
        }
        System.out.println("Executing on Postgres (" + getUrl() + "): " + sql);
    }

    @Override
    public void close() {
        isConnected = false;
        System.out.println("Postgres connection cleanly closed.");
    }
}

public class Solution {
    public static void main(String[] args) {
        PostgresConnection conn = new PostgresConnection("jdbc:postgresql://localhost:5432/orders");
        conn.executeQuery("SELECT * FROM transactions LIMIT 5;");
        conn.close();
        conn.executeQuery("SELECT * FROM users;");
    }
}`,
      output: `Executing on Postgres (jdbc:postgresql://localhost:5432/orders): SELECT * FROM transactions LIMIT 5;
Postgres connection cleanly closed.
Error: connection is closed.`,
      explanation: 'The abstract class manages state and connection details, while ClosableResource adds standardized resource lifecycle management.'
    },
    {
      id: 'ex-abs-vs-iface-5',
      title: 'UI Widget Framework with Clickable and Draggable Capabilities',
      problemStatement: 'Design a UI widget architecture. Abstract class `Widget` has `x`, `y`, `width`, `height`. Interfaces: `Clickable` (`void onClick(int clickX, int clickY)`), `Draggable` (`void onDrag(int deltaX, int deltaY)`). Class `ButtonWidget` extends `Widget` and implements `Clickable`. Class `FloatingIconWidget` extends `Widget` and implements both `Clickable` and `Draggable`. In `main()`, instantiate both and simulate clicking and dragging.',
      hint: 'In onDrag, update `x += deltaX` and `y += deltaY`.',
      solutionCode: `abstract class Widget {
    protected int x, y, width, height;

    public Widget(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public String getBounds() {
        return "(" + x + "," + y + " " + width + "x" + height + ")";
    }
}

interface Clickable {
    void onClick(int clickX, int clickY);
}

interface Draggable {
    void onDrag(int deltaX, int deltaY);
}

class ButtonWidget extends Widget implements Clickable {
    private String label;

    public ButtonWidget(String label, int x, int y, int w, int h) {
        super(x, y, w, h);
        this.label = label;
    }

    @Override
    public void onClick(int clickX, int clickY) {
        System.out.println("Button [" + label + "] clicked at (" + clickX + "," + clickY + ")");
    }
}

class FloatingIconWidget extends Widget implements Clickable, Draggable {
    public FloatingIconWidget(int x, int y, int w, int h) {
        super(x, y, w, h);
    }

    @Override
    public void onClick(int clickX, int clickY) {
        System.out.println("Icon tapped.");
    }

    @Override
    public void onDrag(int deltaX, int deltaY) {
        x += deltaX;
        y += deltaY;
        System.out.println("Icon dragged to new bounds: " + getBounds());
    }
}

public class Solution {
    public static void main(String[] args) {
        ButtonWidget btn = new ButtonWidget("Submit", 10, 20, 100, 30);
        btn.onClick(15, 25);

        FloatingIconWidget icon = new FloatingIconWidget(50, 50, 24, 24);
        icon.onClick(55, 55);
        icon.onDrag(10, -5);
    }
}`,
      output: `Button [Submit] clicked at (15,25)
Icon tapped.
Icon dragged to new bounds: (60,45 24x24)`,
      explanation: 'All widgets share geometry from the abstract base class Widget. Behavioral interactions (Clickable, Draggable) are selectively implemented via interfaces.'
    },
    {
      id: 'ex-abs-vs-iface-6',
      title: 'Notification System Identity vs Priority Dispatch',
      problemStatement: 'Create an abstract class `Notification` with `recipient` (String) and `timestamp` (long). Include an abstract method `void send()`. Create an interface `HighPriority` with `void triggerEmergencyBypass()`. Implement `EmailNotification` (extends `Notification`) and `SmsAlert` (extends `Notification` and implements `HighPriority`). In `main()`, create an array of `Notification` objects, invoke `send()`, and if an element implements `HighPriority`, trigger the emergency bypass.',
      hint: 'Use `instanceof HighPriority` inside the dispatch loop to check for the capability.',
      solutionCode: `abstract class Notification {
    private String recipient;
    private long timestamp;

    public Notification(String recipient, long timestamp) {
        this.recipient = recipient;
        this.timestamp = timestamp;
    }

    public String getRecipient() { return recipient; }

    public abstract void send();
}

interface HighPriority {
    void triggerEmergencyBypass();
}

class EmailNotification extends Notification {
    public EmailNotification(String recipient, long timestamp) {
        super(recipient, timestamp);
    }

    @Override
    public void send() {
        System.out.println("Sending standard email to: " + getRecipient());
    }
}

class SmsAlert extends Notification implements HighPriority {
    public SmsAlert(String recipient, long timestamp) {
        super(recipient, timestamp);
    }

    @Override
    public void send() {
        System.out.println("Sending SMS text to: " + getRecipient());
    }

    @Override
    public void triggerEmergencyBypass() {
        System.out.println("-> EMERGENCY BYPASS: Sounding audible alert on recipient phone!");
    }
}

public class Solution {
    public static void main(String[] args) {
        Notification[] notifications = new Notification[] {
            new EmailNotification("user@example.com", 1700000000L),
            new SmsAlert("+1-555-0199", 1700000001L)
        };

        for (int i = 0; i < notifications.length; i++) {
            notifications[i].send();
            if (notifications[i] instanceof HighPriority) {
                ((HighPriority) notifications[i]).triggerEmergencyBypass();
            }
        }
    }
}`,
      output: `Sending standard email to: user@example.com
Sending SMS text to: +1-555-0199
-> EMERGENCY BYPASS: Sounding audible alert on recipient phone!`,
      explanation: 'Notification represents core message identity; HighPriority is a mixin interface that grants supplemental capabilities to selected notification types.'
    },
    {
      id: 'ex-abs-vs-iface-7',
      title: 'Game Inventory Item with Stackable and Usable Capabilities',
      problemStatement: 'Create abstract class `GameItem` with `name` (String) and `weight` (double). Create interfaces: `Stackable` (`int getMaxStackSize()`) and `Consumable` (`void consume()`). Implement `HealthPotion` (weight 0.5, implements Stackable max 10, Consumable heals 50 HP) and `IronSword` (weight 5.0, neither Stackable nor Consumable). In `main()`, print details for both items.',
      hint: 'Check capabilities using instanceof or invoke interface methods on concrete instances.',
      solutionCode: `abstract class GameItem {
    private String name;
    private double weight;

    public GameItem(String name, double weight) {
        this.name = name;
        this.weight = weight;
    }

    public String getName() { return name; }
    public double getWeight() { return weight; }
}

interface Stackable {
    int getMaxStackSize();
}

interface Consumable {
    void consume();
}

class HealthPotion extends GameItem implements Stackable, Consumable {
    public HealthPotion() {
        super("Health Potion", 0.5);
    }

    @Override
    public int getMaxStackSize() {
        return 10;
    }

    @Override
    public void consume() {
        System.out.println("Glug! Restored 50 hit points.");
    }
}

class IronSword extends GameItem {
    public IronSword() {
        super("Iron Broadsword", 5.0);
    }
}

public class Solution {
    public static void main(String[] args) {
        GameItem potion = new HealthPotion();
        GameItem sword = new IronSword();

        System.out.println(potion.getName() + " (Weight: " + potion.getWeight() + "kg)");
        if (potion instanceof Stackable) {
            System.out.println("-> Max stack: " + ((Stackable) potion).getMaxStackSize());
        }
        if (potion instanceof Consumable) {
            ((Consumable) potion).consume();
        }

        System.out.println(sword.getName() + " (Weight: " + sword.getWeight() + "kg)");
        System.out.println("-> Stackable? " + (sword instanceof Stackable));
    }
}`,
      output: `Health Potion (Weight: 0.5kg)
-> Max stack: 10
Glug! Restored 50 hit points.
Iron Broadsword (Weight: 5.0kg)
-> Stackable? false`,
      explanation: 'HealthPotion inherits physical state from GameItem and selectively adopts Stackable and Consumable capabilities.'
    },
    {
      id: 'ex-abs-vs-iface-8',
      title: 'File System Node with Compressible Capability',
      problemStatement: 'Model a filesystem. Abstract class `FSNode` has `name` (String) and abstract `long getSize()`. Interface `Compressible` has `long getCompressedSize()`. Create class `Directory` (extends `FSNode`, holds an array of up to 3 `FSNode` children, size is sum of children sizes). Create class `LogFile` (extends `FSNode` and implements `Compressible`, raw size = lineCount * 80 bytes, compressed size = raw size / 4). Test in `main()`.',
      hint: 'Directory.getSize() iterates over its child array and sums child.getSize().',
      solutionCode: `abstract class FSNode {
    private String name;

    public FSNode(String name) {
        this.name = name;
    }

    public String getName() { return name; }

    public abstract long getSize();
}

interface Compressible {
    long getCompressedSize();
}

class LogFile extends FSNode implements Compressible {
    private int lineCount;

    public LogFile(String name, int lineCount) {
        super(name);
        this.lineCount = lineCount;
    }

    @Override
    public long getSize() {
        return lineCount * 80L;
    }

    @Override
    public long getCompressedSize() {
        return getSize() / 4;
    }
}

class Directory extends FSNode {
    private FSNode[] children = new FSNode[5];
    private int count = 0;

    public Directory(String name) {
        super(name);
    }

    public void add(FSNode node) {
        if (count < children.length) {
            children[count++] = node;
        }
    }

    @Override
    public long getSize() {
        long total = 0;
        for (int i = 0; i < count; i++) {
            total += children[i].getSize();
        }
        return total;
    }
}

public class Solution {
    public static void main(String[] args) {
        LogFile serverLog = new LogFile("server.log", 100);
        System.out.println("Log raw size: " + serverLog.getSize() + " bytes");
        System.out.println("Log compressed size: " + serverLog.getCompressedSize() + " bytes");

        Directory dir = new Directory("/var/log");
        dir.add(serverLog);
        dir.add(new LogFile("access.log", 50));
        System.out.println("Directory total size: " + dir.getSize() + " bytes");
    }
}`,
      output: `Log raw size: 8000 bytes
Log compressed size: 2000 bytes
Directory total size: 12000 bytes`,
      explanation: 'FSNode establishes recursive composition (Composite pattern), while Compressible provides a capability interface for individual compressible nodes.'
    },
    {
      id: 'ex-abs-vs-iface-9',
      title: 'Sensor Fleet with Wireless Transmittable Capability',
      problemStatement: 'Abstract class `SensorBase` has `deviceId` (int) and `batteryPercent` (int). Concrete method `drain(int amt)` reduces battery. Abstract method `double readMetric()`. Interface `Transmittable` has `void transmit(String gatewayIp)`. Class `ThermalProbe` extends `SensorBase` and implements `Transmittable`. In `main()`, instantiate probe (id=42, battery=100), read metric, transmit reading, drain 5% battery, and print final battery.',
      hint: 'In transmit, print the gateway IP and the metric value.',
      solutionCode: `abstract class SensorBase {
    private int deviceId;
    protected int batteryPercent;

    public SensorBase(int deviceId, int batteryPercent) {
        this.deviceId = deviceId;
        this.batteryPercent = batteryPercent;
    }

    public int getDeviceId() { return deviceId; }
    public int getBatteryPercent() { return batteryPercent; }

    public void drain(int amt) {
        batteryPercent = Math.max(0, batteryPercent - amt);
    }

    public abstract double readMetric();
}

interface Transmittable {
    void transmit(String gatewayIp);
}

class ThermalProbe extends SensorBase implements Transmittable {
    public ThermalProbe(int deviceId, int batteryPercent) {
        super(deviceId, batteryPercent);
    }

    @Override
    public double readMetric() {
        return 36.6;
    }

    @Override
    public void transmit(String gatewayIp) {
        System.out.printf("Sensor #%d transmitted metric %.1fC to %s%n",
            getDeviceId(), readMetric(), gatewayIp);
    }
}

public class Solution {
    public static void main(String[] args) {
        ThermalProbe probe = new ThermalProbe(42, 100);
        probe.transmit("192.168.1.1");
        probe.drain(5);
        System.out.println("Battery remaining: " + probe.getBatteryPercent() + "%");
    }
}`,
      output: `Sensor #42 transmitted metric 36.6C to 192.168.1.1
Battery remaining: 95%`,
      explanation: 'SensorBase manages battery lifecycle state, while Transmittable allows network broadcast across heterogeneous devices.'
    },
    {
      id: 'ex-abs-vs-iface-10',
      title: 'Secure Vault Transaction Logging',
      problemStatement: 'Demonstrate combining an abstract class with multiple capability interfaces. Abstract class `VaultOperation` has `txId` (String) and abstract `void execute()`. Interfaces: `Auditable` (`String getAuditRecord()`) and `Reversible` (`void rollback()`). Class `TransferFunds` extends `VaultOperation` and implements both interfaces. In `main()`, execute the transfer, print its audit record, and trigger a rollback.',
      hint: 'Combine state initialization in the base constructor with contract fulfillment in the class.',
      solutionCode: `abstract class VaultOperation {
    private String txId;

    public VaultOperation(String txId) {
        this.txId = txId;
    }

    public String getTxId() { return txId; }

    public abstract void execute();
}

interface Auditable {
    String getAuditRecord();
}

interface Reversible {
    void rollback();
}

class TransferFunds extends VaultOperation implements Auditable, Reversible {
    private double amount;
    private boolean executed = false;

    public TransferFunds(String txId, double amount) {
        super(txId);
        this.amount = amount;
    }

    @Override
    public void execute() {
        executed = true;
        System.out.println("Vault TX [" + getTxId() + "] transferred: $" + amount);
    }

    @Override
    public String getAuditRecord() {
        return "AUDIT: TX=" + getTxId() + " Amount=$" + amount + " Executed=" + executed;
    }

    @Override
    public void rollback() {
        if (executed) {
            executed = false;
            System.out.println("Vault TX [" + getTxId() + "] reversed: refunded $" + amount);
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        TransferFunds tf = new TransferFunds("TX-9988", 2500.0);
        tf.execute();
        System.out.println(tf.getAuditRecord());
        tf.rollback();
        System.out.println(tf.getAuditRecord());
    }
}`,
      output: `Vault TX [TX-9988] transferred: $2500.0
AUDIT: TX=TX-9988 Amount=$2500.0 Executed=true
Vault TX [TX-9988] reversed: refunded $2500.0
AUDIT: TX=TX-9988 Amount=$2500.0 Executed=false`,
      explanation: 'TransferFunds has core VaultOperation identity, but also honors the Auditable and Reversible contracts.'
    }
  ],

  'default-and-static-interface-methods': [
    {
      id: 'ex-def-stat-1',
      title: 'Greeter Interface with Default Greeting and Static Validator',
      problemStatement: 'Create an interface `Greeter` with: 1) a static method `boolean isValidName(String name)` (returns true if name != null and length > 1), 2) a default method `void greet(String name)` that prints "Hello, " + name + "!", and 3) an abstract method `String getLocale()`. Implement `FrenchGreeter` where `getLocale()` returns "fr-FR" and it overrides `greet(String name)` to print "Bonjour, " + name + "!". In `main()`, validate names and test greetings.',
      hint: 'Call the static method via `Greeter.isValidName("Alice")`.',
      solutionCode: `interface Greeter {
    static boolean isValidName(String name) {
        return name != null && name.trim().length() > 1;
    }

    default void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    String getLocale();
}

class EnglishGreeter implements Greeter {
    @Override
    public String getLocale() {
        return "en-US";
    }
}

class FrenchGreeter implements Greeter {
    @Override
    public String getLocale() {
        return "fr-FR";
    }

    @Override
    public void greet(String name) {
        System.out.println("Bonjour, " + name + "!");
    }
}

public class Solution {
    public static void main(String[] args) {
        String testUser = "Amara";
        if (Greeter.isValidName(testUser)) {
            Greeter en = new EnglishGreeter();
            en.greet(testUser);

            Greeter fr = new FrenchGreeter();
            fr.greet(testUser);
        }
    }
}`,
      output: `Hello, Amara!
Bonjour, Amara!`,
      explanation: 'EnglishGreeter uses the default greet() implementation, while FrenchGreeter overrides it with French phrasing. The static helper Greeter.isValidName() is called directly on the interface.'
    },
    {
      id: 'ex-def-stat-2',
      title: 'Mathematical Operation Helper and Default Range Check',
      problemStatement: 'Create an interface `MathEngine` with: 1) static method `long factorial(int n)`, 2) default method `boolean isWithinBounds(int val, int min, int max)` returning `val >= min && val <= max`, and 3) abstract method `int compute(int a, int b)`. Implement `AdderEngine` (adds a and b). In `main()`, compute factorial of 5 using the interface static method, add 15 and 25 using AdderEngine, and check if the sum is within bounds [0, 50].',
      hint: 'Compute factorial iteratively in the interface static method.',
      solutionCode: `interface MathEngine {
    static long factorial(int n) {
        if (n <= 1) return 1;
        long res = 1;
        for (int i = 2; i <= n; i++) {
            res *= i;
        }
        return res;
    }

    default boolean isWithinBounds(int val, int min, int max) {
        return val >= min && val <= max;
    }

    int compute(int a, int b);
}

class AdderEngine implements MathEngine {
    @Override
    public int compute(int a, int b) {
        return a + b;
    }
}

public class Solution {
    public static void main(String[] args) {
        System.out.println("5! = " + MathEngine.factorial(5));

        AdderEngine adder = new AdderEngine();
        int sum = adder.compute(15, 25);
        System.out.println("15 + 25 = " + sum);
        System.out.println("Within [0, 50]? " + adder.isWithinBounds(sum, 0, 50));
    }
}`,
      output: `5! = 120
15 + 25 = 40
Within [0, 50]? true`,
      explanation: 'Static factorial belongs to MathEngine. Default isWithinBounds is inherited by AdderEngine and called directly on the adder instance.'
    },
    {
      id: 'ex-def-stat-3',
      title: 'Default Method Conflict Resolution in Multi-Engine System',
      problemStatement: 'Create two interfaces: `FuelEngine` (default method `void startEngine()` printing "Combustion ignition roaring.") and `ElectricMotor` (default method `void startEngine()` printing "Electric stator hum active."). Implement `HybridCar` implementing both interfaces. Override `startEngine()` to resolve the conflict by calling `ElectricMotor.super.startEngine()` followed by `FuelEngine.super.startEngine()`. Test in `main()`.',
      hint: 'Use the `InterfaceName.super.method()` syntax to resolve multiple inheritance ambiguity.',
      solutionCode: `interface FuelEngine {
    default void startEngine() {
        System.out.println("Combustion ignition roaring.");
    }
}

interface ElectricMotor {
    default void startEngine() {
        System.out.println("Electric stator hum active.");
    }
}

class HybridCar implements FuelEngine, ElectricMotor {
    @Override
    public void startEngine() {
        System.out.println("--- Starting Hybrid Powertrain ---");
        ElectricMotor.super.startEngine();
        FuelEngine.super.startEngine();
    }
}

public class Solution {
    public static void main(String[] args) {
        HybridCar prius = new HybridCar();
        prius.startEngine();
    }
}`,
      output: `--- Starting Hybrid Powertrain ---
Electric stator hum active.
Combustion ignition roaring.`,
      explanation: 'When two interfaces define conflicting default methods, the implementing class must explicitly override the method. It can delegate to both interface implementations using InterfaceName.super.method().'
    },
    {
      id: 'ex-def-stat-4',
      title: 'Sub-Interface Overriding Default Implementation',
      problemStatement: 'Demonstrate Rule 2 ("Sub-interfaces win"). Create an interface `DataSerializer` with default method `String serialize(String data)` returning "[PLAIN] " + data. Create an interface `EncryptedSerializer` that extends `DataSerializer` and overrides `serialize(String data)` to return "[ENCRYPTED-AES] " + data. Implement `SecureClient` implementing `EncryptedSerializer`. In `main()`, invoke `serialize("secret_key")` through a `DataSerializer` reference.',
      hint: 'Even through a super-interface reference, dynamic dispatch routes to the sub-interface override.',
      solutionCode: `interface DataSerializer {
    default String serialize(String data) {
        return "[PLAIN] " + data;
    }
}

interface EncryptedSerializer extends DataSerializer {
    @Override
    default String serialize(String data) {
        return "[ENCRYPTED-AES] " + data;
    }
}

class SecureClient implements EncryptedSerializer {}

public class Solution {
    public static void main(String[] args) {
        DataSerializer serializer = new SecureClient();
        System.out.println(serializer.serialize("secret_token_99"));
    }
}`,
      output: `[ENCRYPTED-AES] secret_token_99`,
      explanation: 'Rule 2 dictates that more specific sub-interface defaults override super-interface defaults. Invoking through the DataSerializer reference resolves to EncryptedSerializer\'s override.'
    },
    {
      id: 'ex-def-stat-5',
      title: 'Classes Win Rule Verification',
      problemStatement: 'Demonstrate Rule 1 ("Classes win"). Create an interface `Auditor` with default method `void log(String msg)` printing "Interface Auditor: " + msg. Create a class `BaseService` with concrete method `public void log(String msg)` printing "BaseService Class: " + msg. Create a class `CustomerService` extending `BaseService` and implementing `Auditor` (do not override `log()`). In `main()`, invoke `log("Account created")` on `CustomerService`.',
      hint: 'Superclass concrete methods always defeat interface default methods.',
      solutionCode: `interface Auditor {
    default void log(String msg) {
        System.out.println("Interface Auditor: " + msg);
    }
}

class BaseService {
    public void log(String msg) {
        System.out.println("BaseService Class: " + msg);
    }
}

class CustomerService extends BaseService implements Auditor {
    // Inherits log() from BaseService and Auditor
}

public class Solution {
    public static void main(String[] args) {
        CustomerService service = new CustomerService();
        service.log("Account created");

        Auditor auditor = service;
        auditor.log("Polymorphic call");
    }
}`,
      output: `BaseService Class: Account created
BaseService Class: Polymorphic call`,
      explanation: 'Under Rule 1 ("Classes Win"), any concrete method from an ancestor class automatically takes precedence over interface default methods.'
    },
    {
      id: 'ex-def-stat-6',
      title: 'Interface Static Factory Method Simulator',
      problemStatement: 'Create an interface `MessagePacket` with methods `int getId()` and `String getPayload()`. Add a static factory method `MessagePacket of(int id, String payload)` that instantiates and returns an instance of an internal package-private concrete class `DefaultPacket`. In `main()`, create two packets using `MessagePacket.of(1, "Ping")` and `MessagePacket.of(2, "Ack")` and print their contents.',
      hint: 'Static methods on interfaces provide clean factory entry points.',
      solutionCode: `interface MessagePacket {
    int getId();
    String getPayload();

    static MessagePacket of(int id, String payload) {
        return new DefaultPacket(id, payload);
    }
}

class DefaultPacket implements MessagePacket {
    private int id;
    private String payload;

    public DefaultPacket(int id, String payload) {
        this.id = id;
        this.payload = payload;
    }

    @Override
    public int getId() { return id; }

    @Override
    public String getPayload() { return payload; }
}

public class Solution {
    public static void main(String[] args) {
        MessagePacket p1 = MessagePacket.of(101, "SYNC_START");
        MessagePacket p2 = MessagePacket.of(102, "DATA_CHUNK");

        System.out.println("Packet " + p1.getId() + ": " + p1.getPayload());
        System.out.println("Packet " + p2.getId() + ": " + p2.getPayload());
    }
}`,
      output: `Packet 101: SYNC_START
Packet 102: DATA_CHUNK`,
      explanation: 'Interface static factory methods (like MessagePacket.of()) provide callers a concise instantiation API without exposing implementation details.'
    },
    {
      id: 'ex-def-stat-7',
      title: 'Triple Interface Collision Resolution',
      problemStatement: 'Create three interfaces: `Alpha`, `Beta`, and `Gamma`, each declaring a default method `void ping()` printing "A", "B", and "C" respectively. Create a class `OmniNode` implementing all three. In `OmniNode`, override `ping()` to execute `Alpha.super.ping()`, then `Gamma.super.ping()`, and finally print "Done". In `main()`, invoke `ping()`.',
      hint: 'Explicitly delegate to whichever interfaces you choose using InterfaceName.super.ping().',
      solutionCode: `interface Alpha {
    default void ping() { System.out.print("A-"); }
}

interface Beta {
    default void ping() { System.out.print("B-"); }
}

interface Gamma {
    default void ping() { System.out.print("C-"); }
}

class OmniNode implements Alpha, Beta, Gamma {
    @Override
    public void ping() {
        Alpha.super.ping();
        Gamma.super.ping();
        System.out.println("Done");
    }
}

public class Solution {
    public static void main(String[] args) {
        new OmniNode().ping();
    }
}`,
      output: `A-C-Done`,
      explanation: 'When multiple interfaces collide, the implementing class resolves the conflict and can selectively delegate to any or all parent interface implementations.'
    },
    {
      id: 'ex-def-stat-8',
      title: 'Default Method Chaining to Abstract Method',
      problemStatement: 'Create an interface `DiscountCalculator` with an abstract method `double getOriginalPrice()` and a default method `double getDiscountedPrice(double percentage)` that computes `getOriginalPrice() * (1.0 - percentage / 100.0)`. Implement `Book` (original price 30.0) and `Laptop` (original price 1000.0). In `main()`, apply a 20% discount to both and print the results.',
      hint: 'Default methods can invoke abstract methods on the same interface. At runtime, dynamic dispatch calls the subclass getter.',
      solutionCode: `interface DiscountCalculator {
    double getOriginalPrice();

    default double getDiscountedPrice(double percentage) {
        return getOriginalPrice() * (1.0 - (percentage / 100.0));
    }
}

class Book implements DiscountCalculator {
    private double price;

    public Book(double price) {
        this.price = price;
    }

    @Override
    public double getOriginalPrice() {
        return price;
    }
}

class Laptop implements DiscountCalculator {
    private double price;

    public Laptop(double price) {
        this.price = price;
    }

    @Override
    public double getOriginalPrice() {
        return price;
    }
}

public class Solution {
    public static void main(String[] args) {
        DiscountCalculator book = new Book(30.0);
        DiscountCalculator laptop = new Laptop(1000.0);

        System.out.printf("Book discounted: $%.2f%n", book.getDiscountedPrice(20.0));
        System.out.printf("Laptop discounted: $%.2f%n", laptop.getDiscountedPrice(20.0));
    }
}`,
      output: `Book discounted: $24.00
Laptop discounted: $800.00`,
      explanation: 'Default methods operate polymorphically by calling abstract methods that implementing classes fulfill.'
    },
    {
      id: 'ex-def-stat-9',
      title: 'Re-Abstracting a Default Method in Audit Hierarchy',
      problemStatement: 'Demonstrate re-abstracting a default method. Create an interface `SimpleLogger` with default method `void log(String s)` printing "[DEFAULT] " + s. Create an interface `StrictLogger` extending `SimpleLogger` that re-abstracts `void log(String s);` (with no body). Create class `ComplianceService` implementing `StrictLogger` and overriding `log(String s)` to print "[STRICT AUDIT COMPLIANT] " + s. Test in `main()`.',
      hint: 'In StrictLogger, declare `void log(String s);` to strip away the default implementation.',
      solutionCode: `interface SimpleLogger {
    default void log(String s) {
        System.out.println("[DEFAULT] " + s);
    }
}

interface StrictLogger extends SimpleLogger {
    @Override
    void log(String s); // Re-abstracted! Subclasses MUST implement this
}

class ComplianceService implements StrictLogger {
    @Override
    public void log(String s) {
        System.out.println("[STRICT AUDIT COMPLIANT] " + s);
    }
}

public class Solution {
    public static void main(String[] args) {
        StrictLogger logger = new ComplianceService();
        logger.log("Financial transaction logged");
    }
}`,
      output: `[STRICT AUDIT COMPLIANT] Financial transaction logged`,
      explanation: 'An extending interface can explicitly re-declare an inherited default method as abstract, forcing downstream implementors to provide custom logic.'
    },
    {
      id: 'ex-def-stat-10',
      title: 'Composite String Validator with Static and Default Combiners',
      problemStatement: 'Create an interface `Validator` with: 1) abstract method `boolean validate(String s)`, 2) default method `Validator and(Validator other)` that returns a new `Validator` whose `validate(String s)` returns `this.validate(s) && other.validate(s)`. Add a static method `Validator notEmpty()` that validates `s != null && s.length() > 0`. Implement a class `MinLengthValidator` (validates length >= min). In `main()`, combine `notEmpty()` and `MinLengthValidator(5)` using `.and()`, and test strings "Hi" and "HelloWorld".',
      hint: 'An anonymous class or local class inside the default method can implement Validator.',
      solutionCode: `interface Validator {
    boolean validate(String s);

    default Validator and(Validator other) {
        Validator self = this;
        return new Validator() {
            @Override
            public boolean validate(String s) {
                return self.validate(s) && other.validate(s);
            }
        };
    }

    static Validator notEmpty() {
        return new Validator() {
            @Override
            public boolean validate(String s) {
                return s != null && s.length() > 0;
            }
        };
    }
}

class MinLengthValidator implements Validator {
    private int min;

    public MinLengthValidator(int min) {
        this.min = min;
    }

    @Override
    public boolean validate(String s) {
        return s != null && s.length() >= min;
    }
}

public class Solution {
    public static void main(String[] args) {
        Validator combined = Validator.notEmpty().and(new MinLengthValidator(5));

        System.out.println("Validate 'Hi': " + combined.validate("Hi"));
        System.out.println("Validate 'HelloWorld': " + combined.validate("HelloWorld"));
        System.out.println("Validate '': " + combined.validate(""));
    }
}`,
      output: `Validate 'Hi': false
Validate 'HelloWorld': true
Validate '': false`,
      explanation: 'Validator uses static factory methods and default method combiners (.and()) without using any lambdas, showcasing higher-order composition via interface contracts.'
    }
  ]
};
