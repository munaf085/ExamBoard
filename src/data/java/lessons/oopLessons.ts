// ============================================================
// JAVA OOP LESSONS (Modules 8 - 13)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const OOP_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 8: OOP Fundamentals ─────────────────────────────
  'java-oop-basics': {
    intro: 'Object-Oriented Programming (OOP) is a software design paradigm where programs are structured around objects combining state (fields) and behavior (methods). A class is a template or blueprint; an object is a distinct instance allocated in the Heap.',
    keyConcepts: [
      { term: 'Class vs Object', definition: 'A class is a blueprint defining state and behavior. An object is a concrete runtime instance instantiated using the "new" operator on the heap.', example: 'Car myCar = new Car("BMW");' },
      { term: 'Constructors', definition: 'Special method having the same name as the class and no return type. Executes automatically upon object instantiation to initialize state.', example: 'public Car(String model) { this.model = model; }' },
      { term: 'Default Constructor', definition: 'If no constructor is explicitly declared, Java provides a no-argument default constructor. If ANY custom constructor is declared, the default constructor is removed unless explicitly written.', example: 'public Car() {}' },
      { term: 'this Keyword', definition: 'Refers to the current object instance. Disambiguates instance fields from local parameters, or invokes overloaded constructors via this().', example: 'this.name = name; this();' },
      { term: 'Static vs Instance', definition: 'static belongs to the class and is shared among all objects. Instance members belong to each distinct object.', example: 'static int totalCarsCount;' },
    ],
    codeExamples: [
      {
        title: 'Class, Constructors, and Constructor Chaining',
        code: `public class Student {
    private String name;
    private int age;
    private static int studentCount = 0; // Shared across all instances

    // Default constructor chaining to parameterized
    public Student() {
        this("Unknown", 18); // must be first line
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        studentCount++;
    }

    public void display() {
        System.out.println(name + " (Age: " + age + ")");
    }

    public static int getStudentCount() {
        return studentCount;
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("Munaf", 24);

        s1.display();
        s2.display();
        System.out.println("Total students: " + Student.getStudentCount());
    }
}`,
        output: `Unknown (Age: 18)
Munaf (Age: 24)
Total students: 2`
      }
    ],
    commonMistakes: [
      'Putting a return type (like void) on a constructor, turning it into a regular method.',
      'Placing this() anywhere other than the first line of a constructor.',
      'Accessing non-static fields from static methods without an object instance.',
    ],
    interviewTips: [
      '"Can constructors be private?" -> Yes! Used in Singleton design pattern or utility classes to prevent instantiation.',
      '"Does Java pass objects by reference?" -> No, it passes the object reference by value.',
    ],
    interviewQuestions: [
      { q: 'What happens if you define a parameterized constructor without a default constructor?', a: 'Java removes the compiler-generated default constructor. Any attempt to instantiate the class with new ClassName() without arguments will fail to compile unless you explicitly define a no-arg constructor.' },
    ],
    revisionPoints: [
      'Class is a blueprint; object is a heap instance',
      'Constructors have no return type and match class name',
      'this() chains constructors and must be first statement',
      'static belongs to class; instance belongs to object',
    ]
  },

  // ── MODULE 9: Encapsulation & Data Hiding ───────────────────
  'java-encapsulation': {
    intro: 'Encapsulation is the bundling of data (fields) and methods that operate on that data into a single class while restricting direct external access using access modifiers. It protects internal state integrity and decouples implementation from API.',
    keyConcepts: [
      { term: 'Data Hiding', definition: 'Declaring fields as private so outside classes cannot alter them arbitrarily.', example: 'private double balance;' },
      { term: 'Getters & Setters', definition: 'Public accessor and mutator methods providing controlled read and write access with validation logic.', example: 'public void setAge(int age) { if (age > 0) this.age = age; }' },
      { term: '4 Access Modifiers', definition: 'private (class only) < default/package-private (same package) < protected (package + subclasses) < public (everywhere).' },
      { term: 'Immutable Class Pattern', definition: 'A class whose state cannot be changed after creation. Requirements: final class, private final fields, no setters, defensive copies for mutable fields.', example: 'String, Integer, LocalDate' },
    ],
    codeExamples: [
      {
        title: 'Proper Encapsulation with Defensive Validation',
        code: `public class BankAccount {
    private String accountNumber;
    private double balance; // Protected from negative values

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        setBalance(initialBalance);
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("Error: Negative balance rejected.");
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-999", 500.0);
        acc.setBalance(-100.0); // Safely rejected!
        System.out.println("Balance remains: $" + acc.getBalance());
    }
}`,
        output: `Error: Negative balance rejected.
Balance remains: $500.0`
      }
    ],
    commonMistakes: [
      'Making fields public or package-private without reason, breaking encapsulation.',
      'Returning references to mutable internal objects in getters without defensive copying.',
    ],
    interviewTips: [
      '"How to create an immutable class in Java?" -> (1) Declare class final, (2) all fields private final, (3) no setters, (4) perform defensive copying of mutable objects in constructors and getters.',
    ],
    interviewQuestions: [
      { q: 'Why is encapsulation important in software engineering?', a: 'It promotes data integrity by enforcing business validation, provides flexibility to change internal implementation without breaking public contracts, and improves security and maintainability.' },
    ],
    revisionPoints: [
      'Encapsulation = private fields + public methods',
      'Access levels: private < default < protected < public',
      'Immutable classes have no setters and defensive copying',
    ]
  },

  // ── MODULE 10: Inheritance ─────────────────────────────────
  'java-inheritance': {
    intro: 'Inheritance is a fundamental OOP mechanism where a subclass inherits fields and methods from a superclass using the "extends" keyword. It creates an IS-A relationship and promotes code reuse. Java supports single class inheritance.',
    keyConcepts: [
      { term: 'extends Keyword', definition: 'Establishes an inheritance hierarchy. A class can extend only ONE superclass in Java.', example: 'class Dog extends Animal' },
      { term: 'super Keyword', definition: 'Refers to immediate superclass. super() invokes parent constructor; super.method() invokes overridden parent method.', example: 'super(name); super.speak();' },
      { term: 'Constructor Execution Order', definition: 'The parent constructor always completes execution before the child constructor body runs.', example: 'Parent constructor -> Child constructor' },
      { term: 'Single vs Multiple Inheritance', definition: 'Java does NOT support multiple class inheritance to avoid the Diamond Problem (ambiguity). Multiple inheritance of type is supported via interfaces.', example: 'class C extends A, B is ILLEGAL' },
      { term: 'IS-A vs HAS-A', definition: 'Inheritance represents IS-A (Dog is an Animal). Composition represents HAS-A (Car has an Engine). Prefer composition over inheritance.', example: 'Composition: class Car { private Engine engine; }' },
    ],
    codeExamples: [
      {
        title: 'Constructor Chaining in Inheritance Hierarchy',
        code: `class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
        System.out.println("1. Vehicle constructor: " + brand);
    }
}

class Car extends Vehicle {
    private int doors;

    public Car(String brand, int doors) {
        super(brand); // Must be the first statement
        this.doors = doors;
        System.out.println("2. Car constructor: " + doors + " doors");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        new Car("Toyota", 4);
    }
}`,
        output: `1. Vehicle constructor: Toyota
2. Car constructor: 4 doors`
      }
    ],
    commonMistakes: [
      'Attempting multiple class inheritance (extends A, B).',
      'Omitting super() when parent has no default constructor.',
      'Constructors are NOT inherited; only accessible via super().',
    ],
    interviewTips: [
      '"Why does Java not support multiple inheritance of classes?" -> The Diamond Problem: if Class B and Class C both extend A and override method m(), and Class D extends both B and C, which m() should D inherit? Interfaces resolve this by not having state.',
    ],
    interviewQuestions: [
      { q: 'Are constructors inherited in Java?', a: 'No, constructors are not inherited by subclasses. However, a subclass constructor must invoke a superclass constructor (explicitly via super(...) or implicitly via super()).' },
    ],
    revisionPoints: [
      'Java supports single class inheritance only',
      'super() calls parent constructor and must be first line',
      'Parent constructor always runs before child constructor',
      'Prefer composition (HAS-A) over inheritance (IS-A)',
    ]
  },

  // ── MODULE 11: Polymorphism ────────────────────────────────
  'java-polymorphism': {
    intro: 'Polymorphism ("many forms") allows objects of different classes to respond to the same method invocation in their own unique way. Java supports Compile-Time Polymorphism (method overloading) and Runtime Polymorphism (method overriding with dynamic method dispatch).',
    keyConcepts: [
      { term: 'Compile-Time Polymorphism (Overloading)', definition: 'Same method name with different parameter lists in the same class. Resolved by compiler at compile-time.', example: 'int add(int a, int b); double add(double a, double b);' },
      { term: 'Runtime Polymorphism (Overriding)', definition: 'Subclass provides a specific implementation of a superclass method. Resolved dynamically by JVM at runtime.', example: '@Override void sound() { System.out.println("Bark"); }' },
      { term: 'Dynamic Method Dispatch', definition: 'Mechanism by which a call to an overridden method is resolved at runtime based on the actual object on heap, not reference type.', example: 'Animal a = new Dog(); a.sound(); // calls Dog.sound()' },
      { term: 'Method Hiding', definition: 'Static methods CANNOT be overridden. If a subclass declares a static method with same signature, it hides the parent method (resolved at compile-time).', example: 'static void print() is hidden, not overridden' },
      { term: 'Covariant Return Types', definition: 'An overriding method can return a subtype of the return type declared in the superclass method.', example: 'Parent returns Object; Child returns String' },
    ],
    codeExamples: [
      {
        title: 'Dynamic Method Dispatch Demonstration',
        code: `class Notification {
    void send(String message) {
        System.out.println("Generic notification: " + message);
    }
}

class EmailNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("Sending Email: " + message);
    }
}

class SMSNotification extends Notification {
    @Override
    void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Notification[] channels = { new EmailNotification(), new SMSNotification() };

        for (Notification channel : channels) {
            channel.send("Your interview is scheduled!"); // Dynamic dispatch
        }
    }
}`,
        output: `Sending Email: Your interview is scheduled!
Sending SMS: Your interview is scheduled!`
      }
    ],
    commonMistakes: [
      'Thinking static methods can be overridden (they are hidden).',
      'Trying to override private or final methods (compile error).',
      'Reducing method visibility in subclass (e.g. public in parent, protected in child is illegal).',
    ],
    interviewTips: [
      '"Can we override the main method?" -> No, because main is static. You can overload it, but the JVM launcher only executes the standard String[] args signature.',
    ],
    interviewQuestions: [
      { q: 'What is Dynamic Method Dispatch in Java?', a: 'Dynamic Method Dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than compile-time based on the actual object referenced on the heap, enabling runtime polymorphism.' },
    ],
    revisionPoints: [
      'Overloading = compile time; Overriding = runtime',
      'Dynamic dispatch invokes method based on runtime object',
      'static, private, and final methods cannot be overridden',
      'Subclass overriding cannot reduce method visibility',
    ]
  },

  // ── MODULE 12: Abstraction & Interfaces ─────────────────────
  'java-abstraction': {
    intro: 'Abstraction is the concept of exposing only essential features of an object while hiding complex internal details. In Java, abstraction is achieved using Abstract Classes (0% to 100% abstraction) and Interfaces (up to 100% abstraction, defining contracts).',
    keyConcepts: [
      { term: 'Abstract Class', definition: 'Class declared with "abstract". Cannot be instantiated directly with new. Can have constructors, instance fields, abstract methods, and concrete methods.', example: 'abstract class Payment' },
      { term: 'Interface', definition: 'A pure contract. All methods are public abstract by default (pre-Java 8). All fields are public static final constants. Implemented via "implements".', example: 'interface Printable' },
      { term: 'default Methods (Java 8+)', definition: 'Interfaces can have default implementations using the "default" keyword, allowing interfaces to evolve without breaking existing clients.', example: 'default void log() { System.out.println("Default log"); }' },
      { term: 'static & private Methods', definition: 'Interfaces can have static helper methods (Java 8+) and private helper methods (Java 9+) for code reuse inside the interface.', example: 'static boolean isValid(); private void helper();' },
      { term: 'Functional Interface', definition: 'Interface with exactly ONE abstract method. Used with lambdas and method references. Annotated with @FunctionalInterface.', example: 'Runnable, Comparator, Predicate' },
    ],
    codeExamples: [
      {
        title: 'Interface with Default and Static Methods',
        code: `interface DatabaseService {
    void connect(); // abstract method

    // Java 8 default method
    default void healthCheck() {
        System.out.println("Checking DB status: OK");
    }

    // Java 8 static utility
    static String getDriverVersion() {
        return "v2.5.0";
    }
}

class MySQLService implements DatabaseService {
    @Override
    public void connect() {
        System.out.println("Connected to MySQL Database");
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        DatabaseService db = new MySQLService();
        db.connect();
        db.healthCheck();
        System.out.println("Driver: " + DatabaseService.getDriverVersion());
    }
}`,
        output: `Connected to MySQL Database
Checking DB status: OK
Driver: v2.5.0`
      }
    ],
    commonMistakes: [
      'Instantiating an abstract class with new.',
      'Forgetting that interface methods are implicitly public (reducing visibility in implementing class causes compile error).',
      'Thinking default methods in interfaces replace abstract classes (interfaces still cannot maintain mutable instance state).',
    ],
    interviewTips: [
      '"When to use abstract class vs interface?" -> Use an interface to define a role or contract across unrelated classes or for multiple inheritance. Use an abstract class when classes share common state (instance variables) or constructor logic.',
    ],
    interviewQuestions: [
      { q: 'What is a Marker Interface in Java?', a: 'A marker interface is an empty interface with no methods or fields (e.g. Serializable, Cloneable). It signals metadata to the JVM or frameworks that the implementing class has a special capability.' },
    ],
    revisionPoints: [
      'Abstract classes can have state and constructors; interfaces cannot',
      'A class can implement multiple interfaces',
      'Java 8+ allows default and static methods in interfaces',
      'Functional interface has exactly 1 abstract method',
    ]
  },

  // ── MODULE 13: Object Class & Methods ──────────────────────
  'java-object-class': {
    intro: 'java.lang.Object is the root superclass of every class in Java. If a class does not explicitly extend another class, it implicitly extends Object. Understanding Object methods like toString(), equals(), and hashCode() is critical for interview success.',
    keyConcepts: [
      { term: 'Root Class', definition: 'Every class in Java inherits Object methods either directly or indirectly.', example: 'class Animal -> extends Object' },
      { term: 'toString()', definition: 'Returns string representation of object. Default implementation: getClass().getName() + "@" + Integer.toHexString(hashCode()). Override to display human-readable state.', example: '@Override public String toString()' },
      { term: 'equals()', definition: 'Default implementation compares memory references (==). Override to compare state/content equality.', example: 'public boolean equals(Object obj)' },
      { term: 'hashCode()', definition: 'Returns an integer hash for storing objects in hash-based collections (HashMap, HashSet).', example: 'public int hashCode()' },
      { term: 'equals & hashCode Contract', definition: 'If two objects are equal according to equals(), they MUST return the same hashCode(). If two objects have same hashCode, they are NOT necessarily equal (hash collision).', example: 'a.equals(b) -> a.hashCode() == b.hashCode()' },
      { term: 'clone() & getClass()', definition: 'clone() creates shallow copy if Cloneable is implemented. getClass() returns runtime Class object.', example: 'Class<?> clazz = obj.getClass();' },
    ],
    codeExamples: [
      {
        title: 'Properly Overriding equals() and hashCode()',
        code: `import java.util.Objects;
import java.util.HashSet;

class Employee {
    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id == employee.id && Objects.equals(name, employee.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Employee{" + "id=" + id + ", name='" + name + "'}";
    }

    public static void main(String[] args) {
        Employee e1 = new Employee(101, "Alice");
        Employee e2 = new Employee(101, "Alice");

        System.out.println("e1.equals(e2): " + e1.equals(e2)); // true
        HashSet<Employee> set = new HashSet<>();
        set.add(e1);
        set.add(e2);
        System.out.println("Set size (duplicates prevented): " + set.size());
    }
}`,
        output: `e1.equals(e2): true
Set size (duplicates prevented): 1`
      }
    ],
    commonMistakes: [
      'Overriding equals() without overriding hashCode(), breaking HashMap and HashSet storage.',
      'Overloading equals(Employee o) instead of overriding equals(Object o).',
    ],
    interviewTips: [
      '"What happens if you put an object in a HashMap and then mutate its fields used in hashCode?" -> The hashcode changes, making the object unretrievable from the HashMap (a common memory leak source)!',
    ],
    interviewQuestions: [
      { q: 'Explain the contract between equals() and hashCode() in Java.', a: 'If a.equals(b) is true, then a.hashCode() must equal b.hashCode(). If hashCode() is not overridden to match equals(), hash-based collections like HashMap and HashSet will store duplicates or fail to find existing keys.' },
    ],
    revisionPoints: [
      'Object is root class of all Java classes',
      'Always override hashCode() whenever overriding equals()',
      'Default equals() checks reference equality (==)',
      'Immutable keys should always be preferred in HashMaps',
    ]
  },
};
