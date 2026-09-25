import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 14: OBJECT CLASS & CONTRACT - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// Constraints: Zero forward topics (NO collections, NO lambdas/streams)
// ============================================================

export const oop14Exercises: Record<string, ProgrammingExercise[]> = {
  'object-root-class': [
    {
      id: 'ex-obj-root-1',
      title: 'Universal Type Introspection Utility',
      problemStatement: 'Write a static method `inspect(Object obj)` that prints diagnostic details of any object passed to it: 1) whether the object is null, 2) the class name via `obj.getClass().getName()`, 3) whether it is an array via `obj.getClass().isArray()`, and 4) its `toString()` value. In `main()`, test `inspect` with a String ("Hello"), an integer array `new int[]{10, 20}`, and a `null` reference.',
      hint: 'Check `if (obj == null)` first to prevent NullPointerException.',
      solutionCode: `public class Solution {
    public static void inspect(Object obj) {
        if (obj == null) {
            System.out.println("Object is NULL");
            return;
        }
        System.out.println("Type: " + obj.getClass().getName());
        System.out.println("Is Array: " + obj.getClass().isArray());
        System.out.println("Value: " + obj.toString());
        System.out.println("---");
    }

    public static void main(String[] args) {
        inspect("Hello");
        inspect(new int[]{10, 20});
        inspect(null);
    }
}`,
      output: `Type: java.lang.String
Is Array: false
Value: Hello
---
Type: [I
Is Array: true
Value: [I@...
---
Object is NULL`,
      explanation: 'Universal polymorphism allows the inspect method to accept any object, array, or null reference, inspecting runtime reflection metadata via getClass().'
    },
    {
      id: 'ex-obj-root-2',
      title: 'Heterogeneous Array Registry and Downcast Dispatch',
      problemStatement: 'Create a heterogeneous object registry array `Object[] registry` of size 3 containing: a `String` ("ServerNode-1"), an autoboxed `Integer` (404), and a custom class `Sensor` with field `temperature` (24.5). In `main()`, iterate through the array. For each element, identify its type using `instanceof`, downcast appropriately, and print a custom descriptive message.',
      hint: 'Use `if (registry[i] instanceof Sensor)` then `Sensor s = (Sensor) registry[i];`.',
      solutionCode: `class Sensor {
    double temperature;
    public Sensor(double temperature) { this.temperature = temperature; }
}

public class Solution {
    public static void main(String[] args) {
        Object[] registry = new Object[3];
        registry[0] = "ServerNode-1";
        registry[1] = 404; // Autoboxed to Integer
        registry[2] = new Sensor(24.5);

        for (int i = 0; i < registry.length; i++) {
            Object item = registry[i];
            if (item instanceof String) {
                System.out.println("Found String: " + ((String) item).toUpperCase());
            } else if (item instanceof Integer) {
                System.out.println("Found Integer Code: " + ((Integer) item) * 2);
            } else if (item instanceof Sensor) {
                System.out.printf("Found Sensor Temp: %.1fC%n", ((Sensor) item).temperature);
            }
        }
    }
}`,
      output: `Found String: SERVERNODE-1
Found Integer Code: 808
Found Sensor Temp: 24.5C`,
      explanation: 'An Object[] array acts as a universal heterogeneous container. Safely checking types with instanceof enables downcasting without runtime ClassCastExceptions.'
    },
    {
      id: 'ex-obj-root-3',
      title: 'Exact Type Verification vs Polymorphic Subtype Check',
      problemStatement: 'Create a class `Vehicle` and a subclass `ElectricCar`. In `main()`, instantiate `Vehicle v = new ElectricCar();`. Perform two checks: 1) `v instanceof Vehicle`, and 2) `v.getClass() == Vehicle.class`. Print the boolean results and explain why they differ.',
      hint: 'instanceof checks the IS-A hierarchy; getClass() == checks the exact runtime class instantiated with new.',
      solutionCode: `class Vehicle {}
class ElectricCar extends Vehicle {}

public class Solution {
    public static void main(String[] args) {
        Vehicle v = new ElectricCar();

        boolean isInstance = (v instanceof Vehicle);
        boolean isExactClass = (v.getClass() == Vehicle.class);

        System.out.println("v instanceof Vehicle: " + isInstance);
        System.out.println("v.getClass() == Vehicle.class: " + isExactClass);
        System.out.println("Actual runtime class: " + v.getClass().getSimpleName());
    }
}`,
      output: `v instanceof Vehicle: true
v.getClass() == Vehicle.class: false
Actual runtime class: ElectricCar`,
      explanation: 'instanceof evaluates to true because ElectricCar IS-A Vehicle. getClass() == returns false because the actual heap instance was created as ElectricCar, not Vehicle.'
    },
    {
      id: 'ex-obj-root-4',
      title: 'Array Superclass and Interface Verification',
      problemStatement: 'Inspect the JVM inheritance structure of array types. In `main()`, obtain the `Class<?>` of `String[]`. Print: 1) the array class name, 2) its direct superclass name, and 3) whether it implements `Cloneable` and `java.io.Serializable`.',
      hint: 'Use `clazz.getSuperclass().getName()` and `Cloneable.class.isAssignableFrom(clazz)`.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        Class<?> arrayClass = String[].class;

        System.out.println("Array Class Name: " + arrayClass.getName());
        System.out.println("Superclass: " + arrayClass.getSuperclass().getName());
        System.out.println("Implements Cloneable? " + Cloneable.class.isAssignableFrom(arrayClass));
        System.out.println("Implements Serializable? " + java.io.Serializable.class.isAssignableFrom(arrayClass));
    }
}`,
      output: `Array Class Name: [Ljava.lang.String;
Superclass: java.lang.Object
Implements Cloneable? true
Implements Serializable? true`,
      explanation: 'Every Java array directly extends java.lang.Object and automatically implements the Cloneable and java.io.Serializable interfaces.'
    },
    {
      id: 'ex-obj-root-5',
      title: 'Primitive Autoboxing and Universal Parameter Binding',
      problemStatement: 'Write a static method `describePrimitive(Object obj)` that accepts an Object reference. In `main()`, pass primitive literals `10`, `3.14`, and `true`. Inside the method, print the wrapped type\'s simple class name and its value string.',
      hint: 'The Java compiler wraps primitives in Integer, Double, and Boolean via autoboxing.',
      solutionCode: `public class Solution {
    public static void describePrimitive(Object obj) {
        System.out.println("Wrapped Class: " + obj.getClass().getSimpleName() + ", Value: " + obj);
    }

    public static void main(String[] args) {
        describePrimitive(10);     // int -> Integer
        describePrimitive(3.14);   // double -> Double
        describePrimitive(true);   // boolean -> Boolean
    }
}`,
      output: `Wrapped Class: Integer, Value: 10
Wrapped Class: Double, Value: 3.14
Wrapped Class: Boolean, Value: true`,
      explanation: 'Passing primitives to an Object parameter triggers compiler autoboxing, converting value types into full heap objects that extend java.lang.Object.'
    },
    {
      id: 'ex-obj-root-6',
      title: 'Dedicated Lock Monitor Object Pattern',
      problemStatement: 'Create a class `ThreadSafeCounter` that maintains an internal integer `count`. Use a `private final Object lock = new Object();` as a dedicated synchronization monitor. Implement `increment()` and `getCount()` that synchronize on `lock`. In `main()`, increment the counter 3 times and print the final count.',
      hint: 'Synchronizing on a private Object prevents outside code from tampering with the lock.',
      solutionCode: `class ThreadSafeCounter {
    private int count = 0;
    private final Object lock = new Object();

    public void increment() {
        synchronized (lock) {
            count++;
        }
    }

    public int getCount() {
        synchronized (lock) {
            return count;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        ThreadSafeCounter counter = new ThreadSafeCounter();
        counter.increment();
        counter.increment();
        counter.increment();

        System.out.println("Final Count: " + counter.getCount());
    }
}`,
      output: `Final Count: 3`,
      explanation: 'A private final Object instance serves as a clean, encapsulated monitor lock for thread synchronization without exposing the monitor to external callers.'
    },
    {
      id: 'ex-obj-root-7',
      title: 'Class Hierarchy Depth Calculator',
      problemStatement: 'Write a static method `int getInheritanceDepth(Class<?> clazz)` that calculates how many levels of inheritance exist between a given class and `java.lang.Object` (Object itself has depth 0). Create classes `A`, `B extends A`, and `C extends B`. In `main()`, print the depth for `Object.class`, `A.class`, and `C.class`.',
      hint: 'Walk `curr = curr.getSuperclass()` in a while loop while `curr != null` and increment a counter.',
      solutionCode: `class A {}
class B extends A {}
class C extends B {}

public class Solution {
    public static int getInheritanceDepth(Class<?> clazz) {
        int depth = 0;
        Class<?> curr = clazz;
        while (curr != null && curr != Object.class) {
            depth++;
            curr = curr.getSuperclass();
        }
        return depth;
    }

    public static void main(String[] args) {
        System.out.println("Object depth: " + getInheritanceDepth(Object.class));
        System.out.println("A depth: " + getInheritanceDepth(A.class));
        System.out.println("C depth: " + getInheritanceDepth(C.class));
    }
}`,
      output: `Object depth: 0
A depth: 1
C depth: 3`,
      explanation: 'Every class traces its inheritance chain back to java.lang.Object. Class A has depth 1 (extends Object), and C has depth 3 (C -> B -> A -> Object).'
    },
    {
      id: 'ex-obj-root-8',
      title: 'Identity Hash Code vs Overridden Hash Code Comparator',
      problemStatement: 'Create a class `FixedHashObject` where `hashCode()` is overridden to always return `999`. In `main()`, instantiate an object of this class. Print: 1) its overridden `hashCode()`, 2) its native JVM identity hash code via `System.identityHashCode(obj)`, and 3) check whether they are equal.',
      hint: 'System.identityHashCode(obj) invokes the default Object.hashCode() logic regardless of subclass overrides.',
      solutionCode: `class FixedHashObject {
    @Override
    public int hashCode() {
        return 999;
    }
}

public class Solution {
    public static void main(String[] args) {
        FixedHashObject obj = new FixedHashObject();
        int customHash = obj.hashCode();
        int identityHash = System.identityHashCode(obj);

        System.out.println("Custom hashCode: " + customHash);
        System.out.println("Identity hashCode is 999? " + (identityHash == 999));
        System.out.println("Custom == Identity? " + (customHash == identityHash));
    }
}`,
      output: `Custom hashCode: 999
Identity hashCode is 999? false
Custom == Identity? false`,
      explanation: 'Overriding hashCode() changes what obj.hashCode() returns, but System.identityHashCode(obj) accesses the original JVM memory-derived identity hash.'
    },
    {
      id: 'ex-obj-root-9',
      title: 'Generic Object Container with Type Guard',
      problemStatement: 'Create a class `GuardedBox` that stores a single `Object value`. It has a constructor `GuardedBox(Object value)` and a method `boolean isType(Class<?> expectedType)` that returns true if `value` is non-null and `expectedType.isInstance(value)`. Include a method `Object get()`. In `main()`, create a box holding a String, verify if it is String and Integer, and print.',
      hint: 'Use `expectedType.isInstance(value)` to check type dynamically.',
      solutionCode: `class GuardedBox {
    private Object value;

    public GuardedBox(Object value) {
        this.value = value;
    }

    public Object get() {
        return value;
    }

    public boolean isType(Class<?> expectedType) {
        return value != null && expectedType.isInstance(value);
    }
}

public class Solution {
    public static void main(String[] args) {
        GuardedBox box = new GuardedBox("Secure Payload");

        System.out.println("Is String? " + box.isType(String.class));
        System.out.println("Is Integer? " + box.isType(Integer.class));
        if (box.isType(String.class)) {
            String s = (String) box.get();
            System.out.println("Value: " + s);
        }
    }
}`,
      output: `Is String? true
Is Integer? false
Value: Secure Payload`,
      explanation: 'GuardedBox stores a universal Object reference while using runtime reflection tokens (Class<?>) to ensure type safety before downcasting.'
    },
    {
      id: 'ex-obj-root-10',
      title: 'Polymorphic Object Command Dispatcher',
      problemStatement: 'Create an interface `Command` with `void execute()`. Create two commands: `PrintTask` (prints "Printing document") and `EmailTask` (prints "Sending email"). In `main()`, create an `Object[] queue` storing both commands plus an arbitrary non-command `String` ("Ignored"). Iterate through the queue; if an element is an instance of `Command`, execute it, otherwise print "[Skipped non-command]".',
      hint: 'Check `if (item instanceof Command)` before casting.',
      solutionCode: `interface Command {
    void execute();
}

class PrintTask implements Command {
    @Override
    public void execute() {
        System.out.println("Printing document");
    }
}

class EmailTask implements Command {
    @Override
    public void execute() {
        System.out.println("Sending email");
    }
}

public class Solution {
    public static void main(String[] args) {
        Object[] queue = new Object[] {
            new PrintTask(),
            "Ignored string item",
            new EmailTask()
        };

        for (int i = 0; i < queue.length; i++) {
            if (queue[i] instanceof Command) {
                ((Command) queue[i]).execute();
            } else {
                System.out.println("[Skipped non-command: " + queue[i] + "]");
            }
        }
    }
}`,
      output: `Printing document
[Skipped non-command: Ignored string item]
Sending email`,
      explanation: 'The Object[] queue holds arbitrary entities. The dispatcher filters elements using instanceof Command and invokes polymorphic commands.'
    }
  ],

  'tostring-method-override': [
    {
      id: 'ex-tostring-1',
      title: 'User Profile String Representation',
      problemStatement: 'Create a class `UserProfile` with fields `int userId`, `String username`, and `String email`. Override `toString()` to return a formatted string: `"UserProfile[id=101, username=\'amara\', email=\'amara@example.com\']"`. In `main()`, create a user and print it using `System.out.println(user)`.',
      hint: 'Return a single concatenated string matching the format exactly.',
      solutionCode: `class UserProfile {
    private int userId;
    private String username;
    private String email;

    public UserProfile(int userId, String username, String email) {
        this.userId = userId;
        this.username = username;
        this.email = email;
    }

    @Override
    public String toString() {
        return "UserProfile[id=" + userId + ", username='" + username + "', email='" + email + "']";
    }
}

public class Solution {
    public static void main(String[] args) {
        UserProfile user = new UserProfile(101, "amara", "amara@example.com");
        System.out.println(user);
    }
}`,
      output: `UserProfile[id=101, username=\'amara\', email=\'amara@example.com\']`,
      explanation: 'Overriding toString() replaces the default ClassName@hex string with clear, diagnostic information that println displays automatically.'
    },
    {
      id: 'ex-tostring-2',
      title: 'Sensitive Field Redaction in Financial Account',
      problemStatement: 'Create a class `BankAccount` with fields `accountNumber` (String), `balance` (double), and `pin` (String). Override `toString()` to display the account number, balance formatted with a dollar sign, and mask the PIN with `"[REDACTED]"`. In `main()`, instantiate an account and verify the output.',
      hint: 'Do not include the raw pin field in the string concatenation.',
      solutionCode: `class BankAccount {
    private String accountNumber;
    private double balance;
    private String pin;

    public BankAccount(String accountNumber, double balance, String pin) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.pin = pin;
    }

    @Override
    public String toString() {
        return "BankAccount{account='" + accountNumber + "', balance=$" + String.format("%.2f", balance) + ", pin='[REDACTED]'}";
    }
}

public class Solution {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACT-7788", 4500.50, "1234");
        System.out.println(acc);
    }
}`,
      output: `BankAccount{account='ACT-7788', balance=$4500.50, pin='[REDACTED]'}`,
      explanation: 'Defensive toString() design ensures that sensitive security credentials (like PINs or passwords) are masked in application logs and console output.'
    },
    {
      id: 'ex-tostring-3',
      title: 'Composite Hierarchy toString Formatting',
      problemStatement: 'Create two classes: `GeoLocation` (with `latitude` and `longitude` doubles, formatted as `"(lat, lon)"` in `toString()`) and `FleetVehicle` (with `vehicleId` String and `location` GeoLocation). In `FleetVehicle.toString()`, compose the output so it incorporates the child `GeoLocation.toString()`. In `main()`, test printing a FleetVehicle.',
      hint: 'Simply concatenating `location` inside FleetVehicle triggers `location.toString()`.',
      solutionCode: `class GeoLocation {
    private double latitude;
    private double longitude;

    public GeoLocation(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return String.format("(%.4f, %.4f)", latitude, longitude);
    }
}

class FleetVehicle {
    private String vehicleId;
    private GeoLocation location;

    public FleetVehicle(String vehicleId, GeoLocation location) {
        this.vehicleId = vehicleId;
        this.location = location;
    }

    @Override
    public String toString() {
        return "FleetVehicle[" + vehicleId + " @ " + location + "]";
    }
}

public class Solution {
    public static void main(String[] args) {
        GeoLocation loc = new GeoLocation(37.7749, -122.4194);
        FleetVehicle van = new FleetVehicle("VAN-09", loc);
        System.out.println(van);
    }
}`,
      output: `FleetVehicle[VAN-09 @ (37.7749, -122.4194)]`,
      explanation: 'Composite objects delegate formatting to their nested components, allowing clean hierarchical string representation.'
    },
    {
      id: 'ex-tostring-4',
      title: 'Multidimensional Array Formatter Utility',
      problemStatement: 'Write a static method `String format2D(int[][] matrix)` that produces a formatted string representation of a 2D integer matrix, enclosing each row in brackets and rows separated by newlines. If matrix is null, return `"null"`. In `main()`, format and print a 2x3 matrix: `{{1, 2, 3}, {4, 5, 6}}`.',
      hint: 'Use a StringBuilder to append brackets and comma-separated numbers.',
      solutionCode: `public class Solution {
    public static String format2D(int[][] matrix) {
        if (matrix == null) return "null";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < matrix.length; i++) {
            sb.append("[");
            for (int j = 0; j < matrix[i].length; j++) {
                sb.append(matrix[i][j]);
                if (j < matrix[i].length - 1) sb.append(", ");
            }
            sb.append("]");
            if (i < matrix.length - 1) sb.append("\\n");
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        int[][] grid = new int[][] {
            {1, 2, 3},
            {4, 5, 6}
        };
        System.out.println(format2D(grid));
    }
}`,
      output: `[1, 2, 3]
[4, 5, 6]`,
      explanation: 'Because matrix.toString() prints useless JVM codes like [[I@..., custom formatting via StringBuilder is required to display multi-dimensional arrays.'
    },
    {
      id: 'ex-tostring-5',
      title: 'Superclass Chaining Pattern in Subclass toString',
      problemStatement: 'Create a class `Employee` with `id` and `name` (`toString()`: `"Employee[id=1, name=\'Bob\']"`). Create a subclass `Manager` with `int teamSize` that overrides `toString()` by calling `super.toString()` and appending `", teamSize=5]"`. In `main()`, print a Manager instance.',
      hint: 'Use `super.toString().replace("]", ", teamSize=" + teamSize + "]")` or concatenate `super.toString() + " (Manager team=" + teamSize + ")"`',
      solutionCode: `class Employee {
    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public String toString() {
        return "Employee[id=" + id + ", name='" + name + "'";
    }
}

class Manager extends Employee {
    private int teamSize;

    public Manager(int id, String name, int teamSize) {
        super(id, name);
        this.teamSize = teamSize;
    }

    @Override
    public String toString() {
        return super.toString() + ", teamSize=" + teamSize + "]";
    }
}

public class Solution {
    public static void main(String[] args) {
        Manager mgr = new Manager(101, "Alice", 8);
        System.out.println(mgr);
    }
}`,
      output: `Employee[id=101, name='Alice', teamSize=8]`,
      explanation: 'Subclasses can leverage super.toString() to reuse base class formatting without duplicating field-access logic.'
    },
    {
      id: 'ex-tostring-6',
      title: 'Preventing Circular Reference Stack Overflow',
      problemStatement: 'Design a bidirectional relationship between `Department` (has `String deptName` and an array of `Worker`s) and `Worker` (has `String workerName` and a reference to `Department`). Implement `toString()` on both safely: `Worker` should only print the department\'s NAME, avoiding mutual infinite recursion. In `main()`, link them and print both.',
      hint: 'In Worker.toString(), do NOT print the full department object; print `dept.getDeptName()`.',
      solutionCode: `class Department {
    private String deptName;
    private Worker[] workers = new Worker[2];
    private int count = 0;

    public Department(String deptName) {
        this.deptName = deptName;
    }

    public String getDeptName() { return deptName; }

    public void addWorker(Worker w) {
        if (count < workers.length) workers[count++] = w;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Dept[" + deptName + ", staff=");
        for (int i = 0; i < count; i++) {
            sb.append(workers[i].getName());
            if (i < count - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}

class Worker {
    private String workerName;
    private Department department;

    public Worker(String workerName, Department department) {
        this.workerName = workerName;
        this.department = department;
    }

    public String getName() { return workerName; }

    @Override
    public String toString() {
        // Safe: Print department name only, NOT full department object!
        String dName = department != null ? department.getDeptName() : "none";
        return "Worker[name='" + workerName + "', dept=" + dName + "]";
    }
}

public class Solution {
    public static void main(String[] args) {
        Department dept = new Department("Engineering");
        Worker w1 = new Worker("Amara", dept);
        dept.addWorker(w1);

        System.out.println(dept);
        System.out.println(w1);
    }
}`,
      output: `Dept[Engineering, staff=Amara]
Worker[name='Amara', dept=Engineering]`,
      explanation: 'Printing only the department name from Worker avoids mutual infinite recursion, preventing a StackOverflowError.'
    },
    {
      id: 'ex-tostring-7',
      title: 'StringBuilder Optimized Sensor Log Formatter',
      problemStatement: 'Create a class `TelemetryStream` that stores an array of integer readings (up to 5 readings). Override `toString()` using `StringBuilder` to format the readings as `"<reading1 | reading2 | ...>"`. In `main()`, instantiate with `{102, 105, 108}` and print.',
      hint: 'Append delimiters only between elements (`i < count - 1`).',
      solutionCode: `class TelemetryStream {
    private int[] readings;

    public TelemetryStream(int[] readings) {
        this.readings = readings;
    }

    @Override
    public String toString() {
        if (readings == null || readings.length == 0) return "<EMPTY>";
        StringBuilder sb = new StringBuilder("<");
        for (int i = 0; i < readings.length; i++) {
            sb.append(readings[i]);
            if (i < readings.length - 1) {
                sb.append(" | ");
            }
        }
        sb.append(">");
        return sb.toString();
    }
}

public class Solution {
    public static void main(String[] args) {
        TelemetryStream stream = new TelemetryStream(new int[]{102, 105, 108});
        System.out.println(stream);
    }
}`,
      output: `<102 | 105 | 108>`,
      explanation: 'StringBuilder appends tokens directly to a mutable character buffer, avoiding intermediate String heap allocations.'
    },
    {
      id: 'ex-tostring-8',
      title: 'TicTacToe Board Game State Visualizer',
      problemStatement: 'Create a class `TicTacToeBoard` with a 3x3 `char[][] grid` initialized with space characters `\' \'`. Add a method `void set(int r, int c, char symbol)`. Override `toString()` to return a visual 3x3 grid with `|` vertical separators and `---+---+---` horizontal row dividers. In `main()`, set a few moves and print the board.',
      hint: 'Build the grid line by line using StringBuilder.',
      solutionCode: `class TicTacToeBoard {
    private char[][] grid = new char[3][3];

    public TicTacToeBoard() {
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                grid[r][c] = ' ';
            }
        }
    }

    public void set(int r, int c, char symbol) {
        grid[r][c] = symbol;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int r = 0; r < 3; r++) {
            sb.append(" ").append(grid[r][0]).append(" | ")
              .append(grid[r][1]).append(" | ")
              .append(grid[r][2]).append(" \\n");
            if (r < 2) {
                sb.append("---+---+---\\n");
            }
        }
        return sb.toString();
    }
}

public class Solution {
    public static void main(String[] args) {
        TicTacToeBoard board = new TicTacToeBoard();
        board.set(0, 0, 'X');
        board.set(1, 1, 'O');
        board.set(0, 2, 'X');
        System.out.print(board);
    }
}`,
      output: ` X |   | X 
---+---+---
   | O |   
---+---+---
   |   |   
`,
      explanation: 'Overriding toString() to render a visual ASCII game board allows instant inspection of game state during debugging or CLI gameplay.'
    },
    {
      id: 'ex-tostring-9',
      title: 'Custom Exception with Informative toString Context',
      problemStatement: 'Create a custom checked exception class `ValidationException extends Exception` with fields `errorCode` (int) and `fieldName` (String). Override `toString()` to return `"ValidationException[CODE-400 on field \'email\']: Invalid email format"`. In `main()`, catch and print the exception.',
      hint: 'Include super.getMessage() in the formatted string.',
      solutionCode: `class ValidationException extends Exception {
    private int errorCode;
    private String fieldName;

    public ValidationException(int errorCode, String fieldName, String message) {
        super(message);
        this.errorCode = errorCode;
        this.fieldName = fieldName;
    }

    @Override
    public String toString() {
        return "ValidationException[CODE-" + errorCode + " on field '" + fieldName + "']: " + getMessage();
    }
}

public class Solution {
    public static void main(String[] args) {
        try {
            throw new ValidationException(400, "email", "Invalid email format");
        } catch (ValidationException e) {
            System.out.println(e);
        }
    }
}`,
      output: `ValidationException[CODE-400 on field \'email\']: Invalid email format`,
      explanation: 'Overriding toString() in custom exceptions enriches stack traces and error logs with structured contextual codes and field names.'
    },
    {
      id: 'ex-tostring-10',
      title: 'Polymorphic Inventory Item Formatter',
      problemStatement: 'Create an abstract class `CatalogItem` with `id` (int) and `title` (String), overriding `toString()`. Subclass `BookItem` (adds `author`) and `ElectronicItem` (adds `voltage`). In `main()`, create an array of `CatalogItem` holding one Book and one Electronic item. Print each item in a loop.',
      hint: 'Subclasses override toString() to provide specialized details while including base class information.',
      solutionCode: `abstract class CatalogItem {
    private int id;
    private String title;

    public CatalogItem(int id, String title) {
        this.id = id;
        this.title = title;
    }

    @Override
    public String toString() {
        return "#" + id + ": " + title;
    }
}

class BookItem extends CatalogItem {
    private String author;

    public BookItem(int id, String title, String author) {
        super(id, title);
        this.author = author;
    }

    @Override
    public String toString() {
        return "Book[" + super.toString() + " by " + author + "]";
    }
}

class ElectronicItem extends CatalogItem {
    private int voltage;

    public ElectronicItem(int id, String title, int voltage) {
        super(id, title);
        this.voltage = voltage;
    }

    @Override
    public String toString() {
        return "Electronic[" + super.toString() + " (" + voltage + "V)]";
    }
}

public class Solution {
    public static void main(String[] args) {
        CatalogItem[] catalog = new CatalogItem[] {
            new BookItem(1, "Clean Code", "Robert Martin"),
            new ElectronicItem(2, "Soldering Station", 110)
        };

        for (int i = 0; i < catalog.length; i++) {
            System.out.println(catalog[i]);
        }
    }
}`,
      output: `Book[#1: Clean Code by Robert Martin]
Electronic[#2: Soldering Station (110V)]`,
      explanation: 'Polymorphic dispatch ensures that calling println on CatalogItem references automatically invokes the specific subclass toString() implementations.'
    }
  ],

  'equals-and-hashcode-contract': [
    {
      id: 'ex-eq-hash-1',
      title: 'Coordinate Point Value Equality and Hash Distribution',
      problemStatement: 'Create a class `Point2D` with integer fields `x` and `y`. Implement the complete 4-step `equals(Object obj)` recipe and a `hashCode()` method using multiplier 31. In `main()`, create `p1 = new Point2D(3, 4)`, `p2 = new Point2D(3, 4)`, and `p3 = new Point2D(5, 6)`. Print `p1.equals(p2)`, `p1.equals(p3)`, and verify `p1.hashCode() == p2.hashCode()`.',
      hint: 'Remember the 4 steps: 1) this == obj, 2) null and getClass check, 3) cast, 4) field comparison.',
      solutionCode: `class Point2D {
    private int x;
    private int y;

    public Point2D(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Point2D other = (Point2D) obj;
        return this.x == other.x && this.y == other.y;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + x;
        result = 31 * result + y;
        return result;
    }
}

public class Solution {
    public static void main(String[] args) {
        Point2D p1 = new Point2D(3, 4);
        Point2D p2 = new Point2D(3, 4);
        Point2D p3 = new Point2D(5, 6);

        System.out.println("p1.equals(p2): " + p1.equals(p2));
        System.out.println("p1.equals(p3): " + p1.equals(p3));
        System.out.println("Hash match: " + (p1.hashCode() == p2.hashCode()));
    }
}`,
      output: `p1.equals(p2): true
p1.equals(p3): false
Hash match: true`,
      explanation: 'p1 and p2 are distinct heap objects with identical coordinates. Overriding equals() confirms logical equality, and overriding hashCode() satisfies the contract.'
    },
    {
      id: 'ex-eq-hash-2',
      title: 'Product Inventory SKU Matcher with Multiplier 31',
      problemStatement: 'Create a class `ProductKey` with `sku` (String) and `warehouseCode` (int). Implement `equals(Object obj)` and `hashCode()`. In `equals`, handle null SKU safely. In `hashCode`, use `sku.hashCode()` if non-null. In `main()`, test equality between identical keys, different warehouse keys, and null comparison.',
      hint: 'For null-safe comparison: `sku != null ? sku.equals(other.sku) : other.sku == null`.',
      solutionCode: `class ProductKey {
    private String sku;
    private int warehouseCode;

    public ProductKey(String sku, int warehouseCode) {
        this.sku = sku;
        this.warehouseCode = warehouseCode;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ProductKey other = (ProductKey) obj;
        if (this.warehouseCode != other.warehouseCode) return false;
        return sku != null ? sku.equals(other.sku) : other.sku == null;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + warehouseCode;
        result = 31 * result + (sku != null ? sku.hashCode() : 0);
        return result;
    }
}

public class Solution {
    public static void main(String[] args) {
        ProductKey k1 = new ProductKey("SKU-900", 12);
        ProductKey k2 = new ProductKey("SKU-900", 12);
        ProductKey k3 = new ProductKey("SKU-900", 99);

        System.out.println("k1 equals k2? " + k1.equals(k2));
        System.out.println("k1 equals k3? " + k1.equals(k3));
        System.out.println("k1 equals null? " + k1.equals(null));
        System.out.println("k1 and k2 hashes equal? " + (k1.hashCode() == k2.hashCode()));
    }
}`,
      output: `k1 equals k2? true
k1 equals k3? false
k1 equals null? false
k1 and k2 hashes equal? true`,
      explanation: 'ProductKey implements null-safe field comparison and multiplier-31 hashing, adhering strictly to the Java specification.'
    },
    {
      id: 'ex-eq-hash-3',
      title: 'Array-Based Hash Bucket Lookup Table',
      problemStatement: 'Implement a minimal custom hash table `SimpleHashTable` using an array of 4 buckets without any java.util collections. Implement `void put(ProductKey key, String value)` and `String get(ProductKey key)`. Compute the bucket index via `Math.abs(key.hashCode() % 4)`. Each bucket stores an entry node holding key, value, and next pointer (separate chaining). Test storing and retrieving a key in `main()`.',
      hint: 'Create a private static class `Entry { ProductKey key; String value; Entry next; }`. Traverse the linked list using `entry.key.equals(searchKey)`.',
      solutionCode: `class Entry {
    ProductKey key;
    String value;
    Entry next;

    public Entry(ProductKey key, String value, Entry next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class SimpleHashTable {
    private Entry[] buckets = new Entry[4];

    public void put(ProductKey key, String value) {
        int index = Math.abs(key.hashCode() % buckets.length);
        buckets[index] = new Entry(key, value, buckets[index]);
    }

    public String get(ProductKey key) {
        int index = Math.abs(key.hashCode() % buckets.length);
        Entry curr = buckets[index];
        while (curr != null) {
            if (curr.key.equals(key)) {
                return curr.value;
            }
            curr = curr.next;
        }
        return null;
    }
}

public class Solution {
    public static void main(String[] args) {
        SimpleHashTable table = new SimpleHashTable();
        ProductKey original = new ProductKey("GPU-4090", 1);
        table.put(original, "$1,599.00");

        // Lookup with a completely distinct instance
        ProductKey lookup = new ProductKey("GPU-4090", 1);
        String price = table.get(lookup);
        System.out.println("Retrieved Price: " + price);
    }
}`,
      output: `Retrieved Price: $1,599.00`,
      explanation: 'The custom hash table uses key.hashCode() to locate the bucket array index and key.equals() to find the matching entry node within the linked list chain.'
    },
    {
      id: 'ex-eq-hash-4',
      title: 'Strict Exact-Type equals Subclass Protection',
      problemStatement: 'Demonstrate why `getClass() != obj.getClass()` protects the symmetric property of `equals()`. Create class `Account` (with `id`) and subclass `PremiumAccount` (with `id` and `double cashbackRate`). Use `getClass() != obj.getClass()` in both. In `main()`, instantiate an Account(1) and PremiumAccount(1, 0.05). Verify that `acc.equals(prem)` is false and `prem.equals(acc)` is false (symmetric).',
      hint: 'If both return false, symmetry is preserved.',
      solutionCode: `class Account {
    protected int id;

    public Account(int id) { this.id = id; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Account other = (Account) obj;
        return this.id == other.id;
    }

    @Override
    public int hashCode() {
        return id;
    }
}

class PremiumAccount extends Account {
    private double cashbackRate;

    public PremiumAccount(int id, double cashbackRate) {
        super(id);
        this.cashbackRate = cashbackRate;
    }

    @Override
    public boolean equals(Object obj) {
        if (!super.equals(obj)) return false;
        PremiumAccount other = (PremiumAccount) obj;
        return Double.compare(this.cashbackRate, other.cashbackRate) == 0;
    }

    @Override
    public int hashCode() {
        return 31 * super.hashCode() + Double.hashCode(cashbackRate);
    }
}

public class Solution {
    public static void main(String[] args) {
        Account acc = new Account(100);
        PremiumAccount prem = new PremiumAccount(100, 0.05);

        System.out.println("acc.equals(prem): " + acc.equals(prem));
        System.out.println("prem.equals(acc): " + prem.equals(acc));
        System.out.println("Symmetry preserved? " + (acc.equals(prem) == prem.equals(acc)));
    }
}`,
      output: `acc.equals(prem): false
prem.equals(acc): false
Symmetry preserved? true`,
      explanation: 'Using getClass() ensures that an Account and a PremiumAccount are never considered equal, preserving symmetry (both evaluate to false).'
    },
    {
      id: 'ex-eq-hash-5',
      title: 'Case-Insensitive String Key Equality Contract',
      problemStatement: 'Create a class `CaseInsensitiveKey` wrapping a `String text`. Override `equals()` so that `"JAVA"` equals `"java"`. Override `hashCode()` so that `"JAVA"` and `"java"` produce the EXACT same hash code. In `main()`, verify equality and hash code consistency.',
      hint: 'In hashCode(), compute `text.toLowerCase().hashCode()`.',
      solutionCode: `class CaseInsensitiveKey {
    private String text;

    public CaseInsensitiveKey(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CaseInsensitiveKey other = (CaseInsensitiveKey) obj;
        return text != null ? text.equalsIgnoreCase(other.text) : other.text == null;
    }

    @Override
    public int hashCode() {
        return text != null ? text.toLowerCase().hashCode() : 0;
    }
}

public class Solution {
    public static void main(String[] args) {
        CaseInsensitiveKey k1 = new CaseInsensitiveKey("SessionToken");
        CaseInsensitiveKey k2 = new CaseInsensitiveKey("sessiontoken");

        System.out.println("k1 equals k2? " + k1.equals(k2));
        System.out.println("Hashcodes equal? " + (k1.hashCode() == k2.hashCode()));
    }
}`,
      output: `k1 equals k2? true
Hashcodes equal? true`,
      explanation: 'Whenever equals() normalizes fields (like case folding), hashCode() must apply the identical normalization to guarantee equal hash codes.'
    },
    {
      id: 'ex-eq-hash-6',
      title: 'Floating Point Equality with Double.compare',
      problemStatement: 'Create a class `GeoCoordinate` with fields `double lat` and `double lon`. In `equals()`, use `Double.compare(lat, other.lat) == 0`. In `hashCode()`, combine `Double.hashCode(lat)` and `Double.hashCode(lon)` with multiplier 31. In `main()`, test with coordinates containing `0.0` and `-0.0` to show why `Double.compare` is preferred over `==`.',
      hint: 'In IEEE 754, 0.0 == -0.0 is true, but Double.compare(0.0, -0.0) treats them consistently with hash codes.',
      solutionCode: `class GeoCoordinate {
    private double lat;
    private double lon;

    public GeoCoordinate(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        GeoCoordinate other = (GeoCoordinate) obj;
        return Double.compare(this.lat, other.lat) == 0 &&
               Double.compare(this.lon, other.lon) == 0;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + Double.hashCode(lat);
        result = 31 * result + Double.hashCode(lon);
        return result;
    }
}

public class Solution {
    public static void main(String[] args) {
        GeoCoordinate c1 = new GeoCoordinate(0.0, 10.0);
        GeoCoordinate c2 = new GeoCoordinate(0.0, 10.0);
        GeoCoordinate c3 = new GeoCoordinate(-0.0, 10.0);

        System.out.println("c1 equals c2: " + c1.equals(c2));
        System.out.println("c1 equals c3 (0.0 vs -0.0): " + c1.equals(c3));
    }
}`,
      output: `c1 equals c2: true
c1 equals c3 (0.0 vs -0.0): false`,
      explanation: 'Double.compare handles special floating point values (NaN, -0.0 vs +0.0) consistently with Double.hashCode().'
    },
    {
      id: 'ex-eq-hash-7',
      title: 'Hash Collision Resolution Simulator',
      problemStatement: 'Demonstrate that two unequal objects can share the same hash code (a hash collision) and be safely distinguished by `equals()`. Create a class `BucketKey` where `hashCode()` always returns `5`. In `main()`, store two different `BucketKey` objects in an array of size 10 at index `key.hashCode() % 10` using a linked chain. Search for key #2 and verify it is found.',
      hint: 'Traverse the linked chain and call equals() on each candidate node.',
      solutionCode: `class BucketKey {
    int id;

    public BucketKey(int id) { this.id = id; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        return this.id == ((BucketKey) obj).id;
    }

    @Override
    public int hashCode() {
        return 5; // Intentional collision for demonstration
    }
}

class Node {
    BucketKey key;
    Node next;
    Node(BucketKey key, Node next) { this.key = key; this.next = next; }
}

public class Solution {
    public static void main(String[] args) {
        BucketKey k1 = new BucketKey(101);
        BucketKey k2 = new BucketKey(202);

        // Both hash to 5 -> Collision in bucket 5!
        Node bucketHead = new Node(k1, null);
        bucketHead = new Node(k2, bucketHead); // Chain k2 -> k1

        // Search for k1
        BucketKey searchTarget = new BucketKey(101);
        boolean found = false;
        Node curr = bucketHead;
        while (curr != null) {
            if (curr.key.equals(searchTarget)) {
                found = true;
                break;
            }
            curr = curr.next;
        }

        System.out.println("Colliding hashes equal? " + (k1.hashCode() == k2.hashCode()));
        System.out.println("Objects equal? " + k1.equals(k2));
        System.out.println("Search target found in collision chain? " + found);
    }
}`,
      output: `Colliding hashes equal? true
Objects equal? false
Search target found in collision chain? true`,
      explanation: 'Hash collisions are expected in hash-based data structures. The table navigates to the bucket via hashCode(), then resolves the collision using equals().'
    },
    {
      id: 'ex-eq-hash-8',
      title: 'Immutable Value Object with Cached Hash Code',
      problemStatement: 'For immutable objects with expensive hash calculations, caching the hash code in a private field is a standard optimization. Create an immutable class `TransactionId` with `final String prefix` and `final long sequence`. Calculate and store `int cachedHash` in the constructor. In `hashCode()`, return the cached integer. In `main()`, verify that calling `hashCode()` multiple times returns the same cached value.',
      hint: 'Calculate `cachedHash` during constructor initialization.',
      solutionCode: `class TransactionId {
    private final String prefix;
    private final long sequence;
    private final int cachedHash;

    public TransactionId(String prefix, long sequence) {
        this.prefix = prefix;
        this.sequence = sequence;

        // Precompute and cache hash code
        int result = 17;
        result = 31 * result + (prefix != null ? prefix.hashCode() : 0);
        result = 31 * result + Long.hashCode(sequence);
        this.cachedHash = result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        TransactionId other = (TransactionId) obj;
        return sequence == other.sequence &&
               (prefix != null ? prefix.equals(other.prefix) : other.prefix == null);
    }

    @Override
    public int hashCode() {
        return cachedHash; // Fast O(1) field lookup
    }
}

public class Solution {
    public static void main(String[] args) {
        TransactionId tx1 = new TransactionId("TX-US", 1000293L);
        TransactionId tx2 = new TransactionId("TX-US", 1000293L);

        System.out.println("tx1 equals tx2? " + tx1.equals(tx2));
        System.out.println("Cached hash: " + tx1.hashCode());
        System.out.println("Hash match: " + (tx1.hashCode() == tx2.hashCode()));
    }
}`,
      output: `tx1 equals tx2? true
Cached hash: ...
Hash match: true`,
      explanation: 'Caching the hash code in immutable objects (like java.lang.String does) guarantees O(1) repeated hash calculations.'
    },
    {
      id: 'ex-eq-hash-9',
      title: 'Composite Object Equality with Array Field',
      problemStatement: 'Create a class `ExamRecord` with `studentId` (String) and `int[] scores`. In `equals()`, compare `studentId` and verify that both arrays have identical lengths and element values (manual loop). In `hashCode()`, include all array elements in the multiplier 31 formula. In `main()`, test two ExamRecords with identical scores and one with different scores.',
      hint: 'Never use `this.scores.equals(other.scores)` because arrays do not override equals.',
      solutionCode: `class ExamRecord {
    private String studentId;
    private int[] scores;

    public ExamRecord(String studentId, int[] scores) {
        this.studentId = studentId;
        this.scores = scores;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ExamRecord other = (ExamRecord) obj;

        if (studentId != null ? !studentId.equals(other.studentId) : other.studentId != null) return false;
        if (this.scores == other.scores) return true;
        if (this.scores == null || other.scores == null) return false;
        if (this.scores.length != other.scores.length) return false;

        for (int i = 0; i < scores.length; i++) {
            if (this.scores[i] != other.scores[i]) return false;
        }
        return true;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (studentId != null ? studentId.hashCode() : 0);
        if (scores != null) {
            for (int i = 0; i < scores.length; i++) {
                result = 31 * result + scores[i];
            }
        }
        return result;
    }
}

public class Solution {
    public static void main(String[] args) {
        ExamRecord r1 = new ExamRecord("S101", new int[]{85, 90, 95});
        ExamRecord r2 = new ExamRecord("S101", new int[]{85, 90, 95});
        ExamRecord r3 = new ExamRecord("S101", new int[]{85, 90, 80});

        System.out.println("r1 equals r2? " + r1.equals(r2));
        System.out.println("r1 equals r3? " + r1.equals(r3));
        System.out.println("r1/r2 hash match? " + (r1.hashCode() == r2.hashCode()));
    }
}`,
      output: `r1 equals r2? true
r1 equals r3? false
r1/r2 hash match? true`,
      explanation: 'Array fields must be compared element by element; relying on array.equals() compares memory addresses, violating logical value equality.'
    },
    {
      id: 'ex-eq-hash-10',
      title: 'Broken Equals Diagnosis and Contract Restoration',
      problemStatement: 'Demonstrate fixing two major bugs: 1) Overloaded equals (`equals(Badge)` instead of `equals(Object)`), and 2) Missing `hashCode()`. Implement a properly restored class `SecurityBadge` with `badgeId` (int) and `clearanceLevel` (String). In `main()`, test polymorphic comparison via `Object obj1 = badge1; Object obj2 = badge2;` to prove the fix works.',
      hint: 'Always use `@Override public boolean equals(Object obj)` to avoid overloading.',
      solutionCode: `class SecurityBadge {
    private int badgeId;
    private String clearanceLevel;

    public SecurityBadge(int badgeId, String clearanceLevel) {
        this.badgeId = badgeId;
        this.clearanceLevel = clearanceLevel;
    }

    // FIXED: Properly overrides Object.equals(Object)
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        SecurityBadge other = (SecurityBadge) obj;
        if (this.badgeId != other.badgeId) return false;
        return clearanceLevel != null ? clearanceLevel.equals(other.clearanceLevel) : other.clearanceLevel == null;
    }

    // FIXED: Overrides hashCode() to match equals()
    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + badgeId;
        result = 31 * result + (clearanceLevel != null ? clearanceLevel.hashCode() : 0);
        return result;
    }
}

public class Solution {
    public static void main(String[] args) {
        Object b1 = new SecurityBadge(550, "TOP_SECRET");
        Object b2 = new SecurityBadge(550, "TOP_SECRET");

        // Polymorphic call targets SecurityBadge.equals(Object)
        System.out.println("Polymorphic equals: " + b1.equals(b2));
        System.out.println("HashCode match: " + (b1.hashCode() == b2.hashCode()));
    }
}`,
      output: `Polymorphic equals: true
HashCode match: true`,
      explanation: 'Annotating with @Override ensures the method overrides Object.equals(Object), so polymorphic invocations succeed and hash codes match.'
    }
  ],

  'shallow-vs-deep-copy': [
    {
      id: 'ex-copy-1',
      title: 'Basic Shallow Cloning with Primitive Fields',
      problemStatement: 'Create a class `Rectangle` with primitive fields `double width` and `double height`. Implement `Cloneable` and override `public Rectangle clone()` (covariant return). In `main()`, clone `r1 = new Rectangle(10.0, 20.0)` into `r2`, modify `r2.width = 99.0`, and verify that `r1.width` remains `10.0`.',
      hint: 'For classes with only primitives, super.clone() provides complete isolation.',
      solutionCode: `class Rectangle implements Cloneable {
    double width;
    double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public Rectangle clone() {
        try {
            return (Rectangle) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(10.0, 20.0);
        Rectangle r2 = r1.clone();

        r2.width = 99.0;

        System.out.println("r1 width: " + r1.width);
        System.out.println("r2 width: " + r2.width);
        System.out.println("Different instances? " + (r1 != r2));
    }
}`,
      output: `r1 width: 10.0
r2 width: 99.0
Different instances? true`,
      explanation: 'For classes containing only primitive fields, a shallow copy via super.clone() is completely safe because primitive values are copied directly.'
    },
    {
      id: 'ex-copy-2',
      title: 'Shallow Copy Mutation Hazard Demonstration',
      problemStatement: 'Demonstrate the hazard of shallow copying when objects contain mutable reference fields. Create `Customer` (with `String name`) and `Order` (with `int orderId` and `Customer customer`). Implement `Order` as `Cloneable` using simple `(Order) super.clone()`. In `main()`, clone an order and mutate `clone.customer.name`. Show that the original order\'s customer was unintentionally modified.',
      hint: 'Both Order objects hold a reference to the exact same Customer on the heap.',
      solutionCode: `class Customer {
    String name;
    public Customer(String name) { this.name = name; }
}

class Order implements Cloneable {
    int orderId;
    Customer customer;

    public Order(int orderId, Customer customer) {
        this.orderId = orderId;
        this.customer = customer;
    }

    @Override
    public Order clone() {
        try {
            return (Order) super.clone(); // Shallow clone!
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        Customer cust = new Customer("Alice");
        Order o1 = new Order(101, cust);
        Order o2 = o1.clone(); // Shallow copy

        // Mutate customer through clone
        o2.customer.name = "Bob (HACKED)";

        System.out.println("o1 customer: " + o1.customer.name);
        System.out.println("o2 customer: " + o2.customer.name);
        System.out.println("Shared reference? " + (o1.customer == o2.customer));
    }
}`,
      output: `o1 customer: Bob (HACKED)
o2 customer: Bob (HACKED)
Shared reference? true`,
      explanation: 'Because super.clone() is shallow, o1 and o2 share the same Customer object. Mutating customer through o2 corrupts o1.'
    },
    {
      id: 'ex-copy-3',
      title: 'Deep Cloning of Nested Object Graph',
      problemStatement: 'Fix the hazard from the previous exercise by implementing deep cloning. Make `Customer` implement `Cloneable`. In `Order.clone()`, call `super.clone()`, then explicitly clone the customer: `copy.customer = this.customer.clone();`. In `main()`, verify that mutating `o2.customer.name` leaves `o1.customer.name` intact.',
      hint: 'Each class in the hierarchy must override clone() and duplicate its mutable state.',
      solutionCode: `class Customer implements Cloneable {
    String name;
    public Customer(String name) { this.name = name; }

    @Override
    public Customer clone() {
        try {
            return (Customer) super.clone();
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

class Order implements Cloneable {
    int orderId;
    Customer customer;

    public Order(int orderId, Customer customer) {
        this.orderId = orderId;
        this.customer = customer;
    }

    @Override
    public Order clone() {
        try {
            Order copy = (Order) super.clone();
            copy.customer = this.customer.clone(); // Deep clone step!
            return copy;
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        Customer cust = new Customer("Alice");
        Order o1 = new Order(101, cust);
        Order o2 = o1.clone(); // Deep copy

        o2.customer.name = "Bob";

        System.out.println("o1 customer: " + o1.customer.name);
        System.out.println("o2 customer: " + o2.customer.name);
        System.out.println("Shared reference? " + (o1.customer == o2.customer));
    }
}`,
      output: `o1 customer: Alice
o2 customer: Bob
Shared reference? false`,
      explanation: 'Deep cloning explicitly duplicates the nested Customer instance, giving o1 and o2 completely isolated states.'
    },
    {
      id: 'ex-copy-4',
      title: 'Copy Constructor Alternative to Cloneable',
      problemStatement: 'Implement the Copy Constructor pattern instead of Cloneable. Create `Syllabus` (with `String topic`) with a standard constructor and a copy constructor `Syllabus(Syllabus other)`. Create `Course` (with `String code` and `Syllabus syllabus`) with a copy constructor `Course(Course other)` that performs a deep copy of syllabus. In `main()`, test copy independence.',
      hint: '`this.syllabus = new Syllabus(other.syllabus);` inside Course copy constructor.',
      solutionCode: `class Syllabus {
    String topic;

    public Syllabus(String topic) { this.topic = topic; }

    // Copy Constructor
    public Syllabus(Syllabus other) {
        this.topic = other.topic;
    }
}

class Course {
    String code;
    Syllabus syllabus;

    public Course(String code, Syllabus syllabus) {
        this.code = code;
        this.syllabus = syllabus;
    }

    // Deep Copy Constructor
    public Course(Course other) {
        this.code = other.code;
        this.syllabus = new Syllabus(other.syllabus); // Deep copy child
    }
}

public class Solution {
    public static void main(String[] args) {
        Course c1 = new Course("CS101", new Syllabus("Data Structures"));
        Course c2 = new Course(c1); // Copy constructor

        c2.syllabus.topic = "Advanced OOP";

        System.out.println("c1 topic: " + c1.syllabus.topic);
        System.out.println("c2 topic: " + c2.syllabus.topic);
        System.out.println("Same syllabus object? " + (c1.syllabus == c2.syllabus));
    }
}`,
      output: `c1 topic: Data Structures
c2 topic: Advanced OOP
Same syllabus object? false`,
      explanation: 'Copy constructors avoid Cloneable completely, providing clear, constructor-based deep copying without casts or checked exceptions.'
    },
    {
      id: 'ex-copy-5',
      title: 'Deep Copying an Array of Mutable Objects',
      problemStatement: 'Write a static method `Player[] deepCopyPlayers(Player[] source)` that creates a new array of the same length and instantiates a new `Player` for each slot using a copy constructor. Class `Player` has `name` (String) and `score` (int). In `main()`, deep-copy an array of 2 players, modify player 0 in the copy, and verify the original is unaffected.',
      hint: 'Loop through `source` and execute `copy[i] = new Player(source[i]);`.',
      solutionCode: `class Player {
    String name;
    int score;

    public Player(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public Player(Player other) {
        this.name = other.name;
        this.score = other.score;
    }
}

public class Solution {
    public static Player[] deepCopyPlayers(Player[] source) {
        if (source == null) return null;
        Player[] copy = new Player[source.length];
        for (int i = 0; i < source.length; i++) {
            copy[i] = new Player(source[i]);
        }
        return copy;
    }

    public static void main(String[] args) {
        Player[] team1 = new Player[] {
            new Player("Amara", 100),
            new Player("Devon", 200)
        };

        Player[] team2 = deepCopyPlayers(team1);
        team2[0].score = 999;

        System.out.println("Team 1 Player 0 score: " + team1[0].score);
        System.out.println("Team 2 Player 0 score: " + team2[0].score);
    }
}`,
      output: `Team 1 Player 0 score: 100
Team 2 Player 0 score: 999`,
      explanation: 'Re-instantiating each array element via copy constructor guarantees a genuine deep copy where elements in the duplicate array are completely isolated.'
    },
    {
      id: 'ex-copy-6',
      title: 'Deep Cloning a Hierarchical Tree Node',
      problemStatement: 'Create a class `TreeNode` with `int val`, `TreeNode left`, and `TreeNode right`. Implement `Cloneable`. In `clone()`, recursively deep-clone the left and right child subtrees. In `main()`, construct a 3-node tree (root 10, left 5, right 15), clone it, modify the clone\'s left child value, and print both root and left values.',
      hint: '`if (this.left != null) copy.left = this.left.clone();`.',
      solutionCode: `class TreeNode implements Cloneable {
    int val;
    TreeNode left;
    TreeNode right;

    public TreeNode(int val) { this.val = val; }

    @Override
    public TreeNode clone() {
        try {
            TreeNode copy = (TreeNode) super.clone();
            if (this.left != null) copy.left = this.left.clone();
            if (this.right != null) copy.right = this.right.clone();
            return copy;
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
}

public class Solution {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(10);
        root.left = new TreeNode(5);
        root.right = new TreeNode(15);

        TreeNode rootCopy = root.clone();
        rootCopy.left.val = 999;

        System.out.println("Original left: " + root.left.val);
        System.out.println("Cloned left:   " + rootCopy.left.val);
    }
}`,
      output: `Original left: 5
Cloned left:   999`,
      explanation: 'Recursive cloning propagates through the entire tree hierarchy, duplicating every node and branch to ensure full object graph isolation.'
    },
    {
      id: 'ex-copy-7',
      title: 'Defensive Copying in Immutable Container',
      problemStatement: 'Create an immutable class `SecureRoster` that holds `final String[] members`. To prevent external mutation: 1) in the constructor, make a defensive copy of the incoming array using `.clone()`, 2) in the getter `getMembers()`, return a defensive copy using `.clone()`. In `main()`, demonstrate that modifying the input array before or after creation does not affect the container.',
      hint: 'Defensive copies in both constructor and getter ensure full immutability.',
      solutionCode: `class SecureRoster {
    private final String[] members;

    public SecureRoster(String[] input) {
        // Defensive copy on entry
        this.members = input != null ? input.clone() : new String[0];
    }

    public String[] getMembers() {
        // Defensive copy on exit
        return members.clone();
    }

    public int size() { return members.length; }
}

public class Solution {
    public static void main(String[] args) {
        String[] original = new String[]{"Alpha", "Beta"};
        SecureRoster roster = new SecureRoster(original);

        // Attempt attack 1: Mutate original array after passing
        original[0] = "Tampered";

        // Attempt attack 2: Mutate array returned by getter
        String[] leak = roster.getMembers();
        leak[1] = "Tampered";

        String[] verified = roster.getMembers();
        System.out.println("Member 0: " + verified[0]);
        System.out.println("Member 1: " + verified[1]);
    }
}`,
      output: `Member 0: Alpha
Member 1: Beta`,
      explanation: 'Defensive copying on both entry and exit shields the immutable class from external array mutation attacks.'
    },
    {
      id: 'ex-copy-8',
      title: 'Final Field Incompatibility and Copy Constructor Solution',
      problemStatement: 'Demonstrate why copy constructors succeed where `clone()` fails with `final` fields. Create class `Passport` with `final String number` and `final ExpiryDate expiry` (mutable class with `int year`). Write a copy constructor for `Passport` that re-initializes the `final ExpiryDate` field with a fresh instance. Test in `main()`.',
      hint: 'Constructors can assign final fields to newly allocated objects; clone() cannot.',
      solutionCode: `class ExpiryDate {
    int year;
    public ExpiryDate(int year) { this.year = year; }
}

class Passport {
    final String number;
    final ExpiryDate expiry; // Final mutable reference!

    public Passport(String number, ExpiryDate expiry) {
        this.number = number;
        this.expiry = expiry;
    }

    // Copy Constructor handles final field assignment cleanly!
    public Passport(Passport other) {
        this.number = other.number;
        this.expiry = new ExpiryDate(other.expiry.year); // Re-assigning final in constructor
    }
}

public class Solution {
    public static void main(String[] args) {
        Passport p1 = new Passport("US-8899", new ExpiryDate(2030));
        Passport p2 = new Passport(p1);

        p2.expiry.year = 2099;

        System.out.println("p1 expiry: " + p1.expiry.year);
        System.out.println("p2 expiry: " + p2.expiry.year);
    }
}`,
      output: `p1 expiry: 2030
p2 expiry: 2099`,
      explanation: 'Java allows assigning final fields inside constructors, making copy constructors the standard solution for deep-copying classes with final fields.'
    },
    {
      id: 'ex-copy-9',
      title: 'Static Copy Factory Pattern with Polymorphic Type Support',
      problemStatement: 'Implement the Static Copy Factory pattern. Create an abstract class `Graphic` with an abstract method `Graphic copy()`. Create subclasses `CircleGraphic` (with `radius`) and `SquareGraphic` (with `side`). Implement a static factory `Graphic copyOf(Graphic g)` that invokes `g.copy()`. In `main()`, duplicate a CircleGraphic through the factory and verify its properties.',
      hint: 'The static factory delegates to the polymorphic copy() method.',
      solutionCode: `abstract class Graphic {
    public abstract Graphic copy();
    public abstract void draw();
}

class CircleGraphic extends Graphic {
    int radius;

    public CircleGraphic(int radius) { this.radius = radius; }
    public CircleGraphic(CircleGraphic other) { this.radius = other.radius; }

    @Override
    public Graphic copy() {
        return new CircleGraphic(this);
    }

    @Override
    public void draw() {
        System.out.println("Circle with radius " + radius);
    }
}

public class Solution {
    public static Graphic copyOf(Graphic g) {
        return g.copy();
    }

    public static void main(String[] args) {
        Graphic original = new CircleGraphic(25);
        Graphic duplicated = copyOf(original);

        original.draw();
        duplicated.draw();
        System.out.println("Different instances? " + (original != duplicated));
    }
}`,
      output: `Circle with radius 25
Circle with radius 25
Different instances? true`,
      explanation: 'Static copy factories paired with virtual copy() methods achieve polymorphic deep duplication cleanly.'
    },
    {
      id: 'ex-copy-10',
      title: 'Deep Duplicating a 2D Game Board Matrix',
      problemStatement: 'Write a static method `char[][] deepCopyBoard(char[][] board)` that clones a 2D character matrix so that mutating any cell in the copy leaves the original unchanged. In `main()`, create a 2x2 board `{{\'A\', \'B\'}, {\'C\', \'D\'}}`, deep-copy it, change cell [0][0] in the copy to \'Z\', and print both original and copied boards.',
      hint: 'Loop through each row and clone: `copy[r] = board[r].clone();`.',
      solutionCode: `public class Solution {
    public static char[][] deepCopyBoard(char[][] board) {
        if (board == null) return null;
        char[][] copy = new char[board.length][];
        for (int r = 0; r < board.length; r++) {
            copy[r] = board[r].clone(); // Clones individual 1D primitive array row
        }
        return copy;
    }

    public static void main(String[] args) {
        char[][] original = new char[][] {
            {'A', 'B'},
            {'C', 'D'}
        };

        char[][] copy = deepCopyBoard(original);
        copy[0][0] = 'Z';

        System.out.println("Original [0][0]: " + original[0][0]);
        System.out.println("Copy [0][0]:     " + copy[0][0]);
    }
}`,
      output: `Original [0][0]: A
Copy [0][0]:     Z`,
      explanation: 'A 2D array is an array of array references. Deep copying requires cloning each 1D row array to decouple them completely.'
    }
  ]
};
