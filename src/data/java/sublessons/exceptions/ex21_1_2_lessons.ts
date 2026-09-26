import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 21: EXCEPTION HANDLING (LESSONS 21.1 & 21.2)
// Authoritative FAANG-Standard Java Exception Handling Curriculum
// ============================================================

export const ex21_1_2_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 21.1: Throwable Hierarchy, Error vs Exception & Checked vs Unchecked
  // ─────────────────────────────────────────────────────────────
  'throwable-hierarchy-checked-unchecked': {
    id: 'throwable-hierarchy-checked-unchecked',
    moduleId: 'java-exceptions',
    moduleTitle: '21. Exception Handling',
    lessonNumber: 'Lesson 21.1',
    title: 'Throwable Hierarchy, Error vs Exception & Checked vs Unchecked',
    subtitle: 'java.lang.Throwable root, Error vs Exception, RuntimeException unchecked hierarchy, compile-time verified checked exceptions, throws signature, and overriding rules',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Think of Java exception handling as a high-volume Hospital Emergency Room triage system. Fatal Cardiac Arrest represents JVM Errors (like OutOfMemoryError or StackOverflowError): the core infrastructure has collapsed, the emergency room ceiling caved in, and floor doctors cannot fix this on the fly—the hospital must shut down. Unavoidable External Emergencies represent Checked Exceptions (like a compound bone fracture or deep bacterial infection): the doctor did not cause the patient to fall, but hospital policy strictly mandates an explicit, documented protocol (X-ray, sterile antibiotic scrub) before the patient can be discharged; the compiler will physically bar the doctor from leaving until the protocol is signed off (catch or declare throws). Finally, Reckless Stupidity and Negligence represent Unchecked RuntimeExceptions (like sprinting blindfolded into traffic, NullPointerException, or ArrayIndexOutOfBoundsException): these are pure human blunders that should never have happened in the first place. You do not treat reckless running with full-body plaster casts at every step; you fix the underlying behavior by opening your eyes and writing proper defensive code checks!',
    interviewTakeaways: [
      'Root of Exception Hierarchy: `java.lang.Throwable` is the root superclass of all errors and exceptions in Java. Only instances of `Throwable` (or its subclasses) can be thrown via the `throw` keyword or declared in a method signature `throws` clause.',
      'Error vs Exception: `java.lang.Error` represents severe JVM-level or hardware conditions (`OutOfMemoryError`, `StackOverflowError`, `InternalError`) that application code should never attempt to catch or recover from. `java.lang.Exception` represents conditions that a reasonable application should anticipate and potentially recover from.',
      'Checked vs Unchecked Boundary: Any subclass of `java.lang.RuntimeException` or `java.lang.Error` is an Unchecked Exception (exempt from compile-time checking). All other direct or indirect subclasses of `java.lang.Throwable` and `java.lang.Exception` are Checked Exceptions, strictly verified by `javac` under the "Catch or Declare" contract.',
      'Covariant Method Overriding Rules: An overriding method in a subclass cannot declare any new or broader checked exceptions than those declared by the superclass method. It can declare fewer checked exceptions, more specific subclasses of declared checked exceptions, or none at all. However, it is completely free to declare any unchecked exceptions (`RuntimeException`) regardless of the superclass signature.',
      '`throw` vs `throws`: `throw` is an imperative control-flow statement used inside method bodies to trigger an exception instance (`throw new IllegalArgumentException();`). `throws` is a declarative keyword in the method signature warning callers that the method may propagate specified checked exceptions.',
      'Performance Cost of Exception Creation: Instantiating a `Throwable` is computationally expensive because the native JVM method `fillInStackTrace()` traverses every frame of the current thread call stack. Exceptions must never be used for standard control flow in high-throughput systems.',
      'Industry Consensus (Checked vs Unchecked): Modern enterprise frameworks (Spring, Hibernate) and modern JVM languages (Kotlin, Scala) have largely abandoned checked exceptions because they lead to fragile signatures, catch-and-ignore anti-patterns, and poor composition in functional/reactive pipelines.'
    ],
    cheatSheet: {
      summary: 'Throwable is the root. Error and RuntimeException (plus their subclasses) are unchecked. All other Exception subclasses are checked and enforced at compile time. Overriding methods cannot declare broader checked exceptions.',
      syntaxTemplate: `// Checked Exception Declaration & Propagation
public void readFile(String path) throws IOException {
    if (path == null) {
        throw new IllegalArgumentException("Path cannot be null"); // Unchecked
    }
    File file = new File(path);
    if (!file.exists()) {
        throw new FileNotFoundException("Missing file: " + path); // Checked
    }
}

// Subclass Method Overriding Exception Rules
class Parent {
    void process() throws IOException {}
}

class Child extends Parent {
    @Override
    // Valid: FileNotFoundException is a subclass of IOException
    // Valid: Adding NullPointerException (Unchecked)
    // INVALID: throws Exception (Broader checked exception!)
    void process() throws FileNotFoundException, NullPointerException {}
}`,
      rules: [
        { rule: 'Throwable as Sole Legal Target', explanation: 'Only objects inheriting from java.lang.Throwable can be passed to throw or declared after throws; throwing Object or String causes a compilation error.' },
        { rule: 'Catch-or-Declare Contract', explanation: 'Code invoking a method with checked exceptions must either handle them within a try-catch block or declare them in its own throws signature.' },
        { rule: 'Unchecked Classification Rule', explanation: 'Only subclasses of RuntimeException and Error are unchecked; all other classes extending Throwable or Exception are checked by the compiler.' },
        { rule: 'Overriding Covariance Constraint', explanation: 'An overriding method cannot declare checked exceptions that are broader (superclasses) or completely new compared to the overridden method.' },
        { rule: 'Unchecked Exemption in Overrides', explanation: 'An overriding method can freely declare any RuntimeException subclasses, regardless of what the superclass method declares.' },
        { rule: 'Unreachable Catch Detection', explanation: 'Catching a checked exception in a try block that cannot possibly throw that checked exception causes a compile-time error.' }
      ],
      quickComparison: [
        { aspect: 'Direct Superclass', optionA: 'Checked: java.lang.Exception (excluding RuntimeException)', optionB: 'Unchecked: java.lang.RuntimeException or java.lang.Error' },
        { aspect: 'Compiler Verification', optionA: 'Checked: Enforced at compile time (must catch or declare)', optionB: 'Unchecked: Ignored by compiler at compile time' },
        { aspect: 'Primary Cause', optionA: 'Checked: External environment failures (I/O, SQL, Network)', optionB: 'Unchecked: Programming bugs (NPE, index bounds, illegal args)' },
        { aspect: 'Overriding Restriction', optionA: 'Checked: Cannot add broader or new checked exceptions', optionB: 'Unchecked: Can add, narrow, or remove freely without limits' },
        { aspect: 'Best Practice Action', optionA: 'Checked: Recover or wrap into custom domain RuntimeException', optionB: 'Unchecked: Fix the root logic defect in source code' }
      ]
    },
    coreExplanation: [
      'The Java Throwable Type Hierarchy: At the zenith of Java error handling stands `java.lang.Throwable`, an object that encapsulates thread execution state and a snapshot of the execution call stack at instantiation time. `Throwable` splits into two foundational branches: `java.lang.Error` and `java.lang.Exception`.',
      'The Nature of java.lang.Error: Errors represent irrecoverable infrastructural failures. Examples include `OutOfMemoryError` (heap exhaustion), `StackOverflowError` (deep recursion exhausting thread stack space), and `NoClassDefFoundError` (class present during compilation but missing at runtime). Application code must almost never catch `Error` because the internal integrity of the JVM can no longer be guaranteed.',
      'The Dual Worlds of java.lang.Exception: Exceptions denote conditions that an application can reasonably intercept. Java bisects `Exception` into Checked Exceptions and Unchecked Exceptions. The demarcation is strictly mechanical: if an exception class extends `java.lang.RuntimeException`, it is unchecked. If it extends `java.lang.Exception` (without extending `RuntimeException`), it is checked.',
      'Compile-Time "Catch or Declare" Mandate: For checked exceptions (e.g., `IOException`, `SQLException`, `ClassNotFoundException`), the Java compiler enforces that any method containing code that might throw them must either wrap the call in a `try-catch` block or declare the exception in its signature via the `throws` keyword. Failure to do so results in a compilation failure (`unreported exception; must be caught or declared to be thrown`).',
      'Unchecked Exceptions (RuntimeException): Unchecked exceptions (e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`, `ArithmeticException`) represent defects in application logic. Because a null pointer or index violation can theoretically happen anywhere, forcing developers to declare them on every method signature would render the language unusable. Thus, the compiler ignores them during signature validation.',
      'Covariant Method Overriding Contract: In object-oriented programming, Liskov Substitution Principle (LSP) mandates that a subtype must be usable anywhere its supertype is expected. If a superclass method declares `throws IOException`, client code calling that method expects to catch at most `IOException`. If a subclass override could throw `Exception`, the caller catch block would fail to handle the broader exception, causing a runtime leak. Hence, Java enforces that overriding methods cannot declare broader or new checked exceptions. They can, however, throw narrower checked exceptions, fewer checked exceptions, or none.',
      'The Mechanical Overhead of Exceptions: Every time an exception object is constructed via `new`, the constructor delegates to native code in `Throwable.fillInStackTrace()`. This native routine walks the OS thread stack, copying frame metadata into an internal array. In microsecond-critical low-latency systems (such as high-frequency trading or distributed caches), using exceptions for control flow causes massive CPU spikes, garbage collection pressure, and cache evictions.',
      'Architectural Shift in Modern Java: Checked exceptions were one of Java greatest language experiments, but they largely failed in distributed microservice architectures. When business logic is buried under tiers of checked exceptions, developers routinely resort to empty catch blocks or catch `Exception` re-throwing raw `RuntimeException`. Leading architectures define a cohesive hierarchy of unchecked domain exceptions (e.g., `OrderNotFoundException extends RuntimeException`).'
    ],
    diagram: `JAVA THROWABLE TYPE HIERARCHY & OVERRIDING RULES
========================================================================

                       java.lang.Object
                              ▲
                              │
                    java.lang.Throwable
                       (Root of All)
                              │
             ┌────────────────┴────────────────┐
             ▼                                 ▼
      java.lang.Error                java.lang.Exception
   (Fatal JVM Catastrophes)         (Application Conditions)
     [UNCHECKED]                               │
   ├─ OutOfMemoryError                         │
   ├─ StackOverflowError       ┌───────────────┴───────────────┐
   ├─ VirtualMachineError      ▼                               ▼
   └─ NoClassDefFoundError  CHECKED EXCEPTIONS        java.lang.RuntimeException
                            (Compile-Time Checked)         [UNCHECKED]
                            ├─ IOException            ├─ NullPointerException
                            ├─ SQLException           ├─ ArrayIndexOutOfBoundsException
                            ├─ ClassNotFoundException ├─ IllegalArgumentException
                            └─ FileNotFoundException  ├─ ArithmeticException
                                                      └─ IllegalStateException

------------------------------------------------------------------------
METHOD OVERRIDING COVARIANCE RULES FOR EXCEPTIONS:
------------------------------------------------------------------------
Superclass Method:   void read() throws IOException

Subclass Override:   void read() throws FileNotFoundException  ──> LEGAL (Narrower)
Subclass Override:   void read()                               ──> LEGAL (Fewer/None)
Subclass Override:   void read() throws NullPointerException   ──> LEGAL (Unchecked)
Subclass Override:   void read() throws Exception              ──> ILLEGAL (Broader!)
Subclass Override:   void read() throws SQLException           ──> ILLEGAL (New Checked!)`,
    codeSnippet: {
      title: 'Checked vs Unchecked Exceptions and Overriding Covariance',
      code: `import java.io.FileNotFoundException;
import java.io.IOException;

// Superclass with checked exception in contract
class DataService {
    public void loadData(String source) throws IOException {
        if (source == null) {
            // Unchecked exception: runtime programming error
            throw new IllegalArgumentException("Source cannot be null");
        }
        if (!source.endsWith(".dat")) {
            // Checked exception: environment/format condition
            throw new IOException("Unsupported file format: " + source);
        }
        System.out.println("Base service loaded: " + source);
    }
}

// Subclass demonstrating legal overriding covariance
class SecureDataService extends DataService {
    @Override
    // Legal: FileNotFoundException is a subclass of IOException
    // Legal: Can freely throw unchecked SecurityException
    public void loadData(String source) throws FileNotFoundException, SecurityException {
        if ("classified.dat".equals(source)) {
            throw new SecurityException("Access Denied to classified records");
        }
        if ("missing.dat".equals(source)) {
            throw new FileNotFoundException("File not found on secure disk: " + source);
        }
        System.out.println("Secure service loaded: " + source);
    }
}

public class HierarchyDemo {
    public static void main(String[] args) {
        DataService service = new SecureDataService();
        try {
            service.loadData("classified.dat");
        } catch (IOException e) {
            System.out.println("Caught Checked Exception: " + e.getMessage());
        } catch (SecurityException e) {
            System.out.println("Caught Unchecked Exception: " + e.getMessage());
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'class DataService { ... }', explanation: 'Defines the base class with a method loadData declaring throws IOException.' },
        { line: 'throw new IllegalArgumentException("Source cannot be null");', explanation: 'Throws an unchecked exception; does not need to be declared in the throws clause.' },
        { line: 'throw new IOException("Unsupported file format: " + source);', explanation: 'Throws a checked exception; forces loadData to declare throws IOException in its signature.' },
        { line: 'class SecureDataService extends DataService { ... }', explanation: 'Inherits from DataService and overrides loadData with covariant exception rules.' },
        { line: 'public void loadData(...) throws FileNotFoundException, SecurityException', explanation: 'Valid override: FileNotFoundException is narrower than IOException; SecurityException is unchecked and unrestricted.' },
        { line: 'DataService service = new SecureDataService();', explanation: 'Polymorphic reference: caller is bound by the contract declared in DataService.' },
        { line: 'catch (SecurityException e)', explanation: 'Catches the unchecked exception thrown at runtime by the overridden implementation.' }
      ],
      output: `Caught Unchecked Exception: Access Denied to classified records`
    },
    codeExamples: [
      {
        title: 'Checked Exception Handling with Custom Checked Exception',
        description: 'Demonstrates creating a custom checked exception extending Exception and enforcing the catch-or-declare contract.',
        code: `// Custom Checked Exception
class InsufficientFundsException extends Exception {
    private final double deficit;
    public InsufficientFundsException(String message, double deficit) {
        super(message);
        this.deficit = deficit;
    }
    public double getDeficit() { return deficit; }
}

class BankAccount {
    private double balance = 500.0;

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            double deficit = amount - balance;
            throw new InsufficientFundsException("Insufficient account balance", deficit);
        }
        balance -= amount;
        System.out.println("Withdrawal successful! Remaining: $" + balance);
    }
}

public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        try {
            account.withdraw(750.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction Failed: " + e.getMessage());
            System.out.println("Shortfall Amount: $" + e.getDeficit());
        }
    }
}`,
        output: `Transaction Failed: Insufficient account balance
Shortfall Amount: $250.0`
      },
      {
        title: 'Overriding Exception Covariance Rules (Legal vs Illegal)',
        description: 'Examines what happens when child classes attempt to declare broader, narrower, or new exceptions.',
        code: `import java.io.*;
import java.sql.SQLException;

class ParentResource {
    void open() throws IOException {
        System.out.println("Parent opened");
    }
}

class ChildA extends ParentResource {
    // LEGAL: FileNotFoundException is a subtype of IOException (narrower)
    @Override
    void open() throws FileNotFoundException {
        System.out.println("ChildA opened");
    }
}

class ChildB extends ParentResource {
    // LEGAL: Child can omit the throws clause completely
    @Override
    void open() {
        System.out.println("ChildB opened without checked exceptions");
    }
}

class ChildC extends ParentResource {
    // LEGAL: Can add any unchecked RuntimeException
    @Override
    void open() throws ArithmeticException, NullPointerException {
        System.out.println("ChildC opened with unchecked exceptions");
    }
}

// ILLEGAL EXAMPLES (Won't compile):
// class ChildIllegal1 extends ParentResource {
//     @Override
//     void open() throws Exception {} // COMPILE ERROR: Exception is broader than IOException!
// }
// class ChildIllegal2 extends ParentResource {
//     @Override
//     void open() throws SQLException {} // COMPILE ERROR: SQLException is a new checked exception!
// }

public class CovarianceTest {
    public static void main(String[] args) throws IOException {
        ParentResource p1 = new ChildA();
        ParentResource p2 = new ChildB();
        ParentResource p3 = new ChildC();
        p1.open();
        p2.open();
        p3.open();
    }
}`,
        output: `ChildA opened
ChildB opened without checked exceptions
ChildC opened with unchecked exceptions`
      },
      {
        title: 'Performance Benchmark: Exceptions as Control Flow Anti-Pattern',
        description: 'Quantifies the massive latency penalty of instantiating and throwing exceptions versus boolean conditional branching.',
        code: `public class ExceptionBenchmark {
    private static final int ITERATIONS = 1_000_000;

    public static void main(String[] args) {
        // Test 1: Standard control flow (branching)
        long startBranch = System.nanoTime();
        int count1 = 0;
        for (int i = 0; i < ITERATIONS; i++) {
            if (i < 0) {
                count1--;
            } else {
                count1++;
            }
        }
        long elapsedBranch = System.nanoTime() - startBranch;

        // Test 2: Exception used for control flow
        long startException = System.nanoTime();
        int count2 = 0;
        for (int i = 0; i < 10_000; i++) { // Only 10,000 iterations!
            try {
                if (i >= 0) {
                    throw new RuntimeException("Flow Control");
                }
            } catch (RuntimeException e) {
                count2++;
            }
        }
        long elapsedException = System.nanoTime() - startException;

        System.out.println("1,000,000 branch checks took: " + (elapsedBranch / 1_000_000.0) + " ms");
        System.out.println("10,000 exceptions took:       " + (elapsedException / 1_000_000.0) + " ms");
        System.out.println("Result: Exceptions are ~1,000x to 10,000x slower due to fillInStackTrace()!");
    }
}`,
        output: `1,000,000 branch checks took: 2.14 ms
10,000 exceptions took:       31.85 ms
Result: Exceptions are ~1,000x to 10,000x slower due to fillInStackTrace()!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Catching java.lang.Throwable or java.lang.Error in application code',
        whyItHappens: 'Beginners want to catch "everything" to make their application crash-proof, writing catch (Throwable t).',
        howToFix: 'Never catch Throwable or Error. Catching OutOfMemoryError or StackOverflowError leaves the JVM in an undefined, corrupted state. Catch specific checked exceptions or catch (Exception e) at thread boundaries.'
      },
      {
        mistake: 'Swallowing exceptions with empty catch blocks: catch (Exception e) {}',
        whyItHappens: 'Developers face a compiler error demanding a catch block, so they insert an empty block to silence javac.',
        howToFix: 'Never leave catch blocks empty. At minimum, log the exception with full stack trace (`logger.error("Failed", e)`), or rethrow it wrapped as a runtime exception (`throw new RuntimeException(e)`).'
      },
      {
        mistake: 'Using exceptions for standard business logic control flow',
        whyItHappens: 'Parsing user input or checking map existence using try { map.get(k).trim(); } catch (NullPointerException e).',
        howToFix: 'Use explicit defensive guards (`if (key != null && map.containsKey(key))`). Exceptions are designed for exceptional, anomalous conditions, not normal branching.'
      },
      {
        mistake: 'Attempting to declare a broader checked exception in an overriding method',
        whyItHappens: 'Subclass method does more operations (e.g. database and file), so the developer writes `public void save() throws Exception` over `void save() throws IOException`.',
        howToFix: 'Overriding methods cannot declare broader checked exceptions. Wrap the internal exceptions into the declared superclass checked exception or into a domain unchecked exception.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Subclass Overriding with Broader Checked Exception',
        problemStatement: 'What is the outcome of compiling and running the following code?',
        code: `import java.io.IOException;

class Device {
    void boot() throws IOException {
        System.out.print("DeviceBoot ");
    }
}

class Phone extends Device {
    @Override
    void boot() throws Exception {
        System.out.print("PhoneBoot ");
    }
}

public class Puzzle1 {
    public static void main(String[] args) {
        Device d = new Phone();
        try {
            d.boot();
        } catch (IOException e) {
            System.out.print("Error");
        }
    }
}`,
        options: [
            'A) Prints: PhoneBoot',
            'B) Prints: DeviceBoot PhoneBoot',
            'C) Compilation Error: boot() in Phone cannot override boot() in Device because overridden method does not throw Exception',
            'D) Runtime Exception: ClassCastException'
        ],
        correctOptionIndex: 2,
        hint: 'Can an overriding method declare a checked exception that is a superclass of the original exception?',
        solution: 'Option C is correct: Compilation Error.',
        explanation: 'In Java, an overriding method cannot declare checked exceptions that are broader than those declared by the superclass method. `Exception` is the superclass of `IOException`. Because `Exception` is broader than `IOException`, the compiler rejects the override with: "overridden method does not throw java.lang.Exception".'
      },
      {
        title: 'Puzzle 2: Overriding Method Declaring New Unchecked Exception',
        problemStatement: 'What does the following code print when compiled and run?',
        code: `class Worker {
    void work() {
        System.out.print("Working ");
    }
}

class Specialist extends Worker {
    @Override
    void work() throws ArithmeticException, NullPointerException {
        System.out.print("Specialized ");
        throw new ArithmeticException("Done");
    }
}

public class Puzzle2 {
    public static void main(String[] args) {
        Worker w = new Specialist();
        try {
            w.work();
        } catch (ArithmeticException e) {
            System.out.print("CaughtArithmetic");
        }
    }
}`,
        options: [
            'A) Compilation Error: Specialist.work() cannot throw exceptions because Worker.work() declares none',
            'B) Prints: Specialized CaughtArithmetic',
            'C) Prints: Working Specialized CaughtArithmetic',
            'D) Runtime Uncaught Exception: ArithmeticException'
        ],
        correctOptionIndex: 1,
        hint: 'Are unchecked exceptions restricted by method overriding rules?',
        solution: 'Option B is correct: Prints "Specialized CaughtArithmetic".',
        explanation: 'Overriding rules only restrict checked exceptions. A subclass method can declare ANY unchecked exception (`RuntimeException` or its subclasses, such as `ArithmeticException` or `NullPointerException`), even if the superclass method declares no exceptions at all. The exception is thrown and caught by main.'
      },
      {
        title: 'Puzzle 3: Catching Unreachable Checked Exception',
        problemStatement: 'What happens when compiling and running this code?',
        code: `import java.io.IOException;

public class Puzzle3 {
    public static void main(String[] args) {
        try {
            System.out.print("Hello ");
            int x = 10 / 2;
            System.out.print(x + " ");
        } catch (IOException e) {
            System.out.print("CaughtIO");
        }
    }
}`,
        options: [
            'A) Prints: Hello 5',
            'B) Compilation Error: exception java.io.IOException is never thrown in body of corresponding try statement',
            'C) Prints: Hello 5 CaughtIO',
            'D) Runtime Warning emitted by the JVM'
        ],
        correctOptionIndex: 1,
        hint: 'Does the try block invoke anything that declares IOException?',
        solution: 'Option B is correct: Compilation Error.',
        explanation: 'Java enforces that if a `catch` block specifies a checked exception (like `IOException`), the corresponding `try` block MUST have at least one statement or method call that is capable of throwing that checked exception or a subclass thereof. Since printing and integer division can never throw `IOException`, `javac` rejects this as unreachable code.'
      },
      {
        title: 'Puzzle 4: Catching Unchecked Exception Never Thrown',
        problemStatement: 'What happens when compiling and running this code?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        try {
            System.out.print("Active ");
        } catch (NullPointerException e) {
            System.out.print("CaughtNPE ");
        } catch (ArithmeticException e) {
            System.out.print("CaughtAE ");
        }
        System.out.print("End");
    }
}`,
        options: [
            'A) Compilation Error: NullPointerException is never thrown in try block',
            'B) Compilation Error: ArithmeticException is never thrown in try block',
            'C) Compiles cleanly and prints: Active End',
            'D) Runtime Exception'
        ],
        correctOptionIndex: 2,
        hint: 'Does the "must be thrown in try" rule apply to unchecked exceptions?',
        solution: 'Option C is correct: Prints "Active End".',
        explanation: 'Unlike checked exceptions, the compiler does NOT require `try` blocks to potentially throw unchecked exceptions (`RuntimeException` and its subclasses). You can catch `NullPointerException`, `ArithmeticException`, or any other unchecked exception around any code block without compilation error.'
      },
      {
        title: 'Puzzle 5: Polymorphism and throws Signature Verification',
        problemStatement: 'What happens when compiling the following code?',
        code: `import java.io.IOException;

class Base {
    void execute() throws IOException {
        System.out.println("Base");
    }
}

class Derived extends Base {
    @Override
    void execute() {
        System.out.println("Derived");
    }
}

public class Puzzle5 {
    public static void main(String[] args) {
        Base b = new Derived();
        // Line X:
        b.execute();
    }
}`,
        options: [
            'A) Compiles cleanly and prints: Derived',
            'B) Compilation Error on Line X: unreported exception IOException; must be caught or declared to be thrown',
            'C) Runtime error because Derived does not throw IOException',
            'D) Compiles cleanly and prints: Base'
        ],
        correctOptionIndex: 1,
        hint: 'Does the compiler check method calls against the reference type or the runtime object type?',
        solution: 'Option B is correct: Compilation Error on Line X.',
        explanation: 'The Java compiler performs type checking based on the reference type, NOT the runtime instance. The reference `b` is of type `Base`. In `Base`, `execute()` declares `throws IOException`. Therefore, the caller must either catch `IOException` or declare `throws IOException` in `main`, even though the runtime object (`Derived`) threw no checked exceptions.'
      },
      {
        title: 'Puzzle 6: Multiple Interface Inheritance with Conflicting throws',
        problemStatement: 'What is the correct declaration for the implementing class method?',
        code: `import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;

interface Alpha {
    void run() throws IOException;
}

interface Beta {
    void run() throws FileNotFoundException;
}

class Service implements Alpha, Beta {
    // What is a valid throws clause for run()?
}`,
        options: [
            'A) public void run() throws IOException',
            'B) public void run() throws FileNotFoundException',
            'C) public void run() throws IOException, SQLException',
            'D) public void run() throws Exception'
        ],
        correctOptionIndex: 1,
        hint: 'The implementing method must satisfy the contract of BOTH interfaces simultaneously (intersection of exceptions).',
        solution: 'Option B is correct: public void run() throws FileNotFoundException (or declaring no checked exceptions at all).',
        explanation: 'When a class implements multiple interfaces declaring the same method with different `throws` clauses, the overriding method can only throw the INTERSECTION of the declared checked exceptions (or subtypes thereof). Since `FileNotFoundException` is a subtype of `IOException`, `throws FileNotFoundException` satisfies both `Alpha` (which permits `IOException`) and `Beta` (which permits `FileNotFoundException`). Declaring `throws IOException` would violate `Beta`.'
      },
      {
        title: 'Puzzle 7: Constructor Exception Rules vs Method Overriding',
        problemStatement: 'What happens when compiling and running this code?',
        code: `import java.io.IOException;

class Engine {
    Engine() throws IOException {
        System.out.print("EngineInit ");
    }
}

class TurboEngine extends Engine {
    TurboEngine() throws Exception {
        super();
        System.out.print("TurboInit ");
    }
}

public class Puzzle7 {
    public static void main(String[] args) throws Exception {
        new TurboEngine();
    }
}`,
        options: [
            'A) Compilation Error: TurboEngine constructor cannot throw Exception because super constructor only throws IOException',
            'B) Compiles cleanly and prints: EngineInit TurboInit ',
            'C) Runtime Exception: InstantiationException',
            'D) Compilation Error: super() must be enclosed in try-catch'
        ],
        correctOptionIndex: 1,
        hint: 'Do subclass constructors follow the same covariant exception rules as overridden methods?',
        solution: 'Option B is correct: Compiles cleanly and prints "EngineInit TurboInit ".',
        explanation: 'Constructors are NOT methods and are NOT overridden! When a subclass constructor calls `super()`, it is invoking the superclass constructor, which may throw `IOException`. Therefore, the subclass constructor MUST declare `IOException` or a broader exception (like `Exception`). Unlike method overriding (which forbids broader exceptions), subclass constructors CANNOT declare fewer or narrower exceptions than the superclass constructor because `super()` is always executed and cannot be surrounded by a `try-catch` before the first statement!'
      },
      {
        title: 'Puzzle 8: Throwing null Literal',
        problemStatement: 'What is the output of the following program?',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        try {
            Throwable t = null;
            throw t;
        } catch (NullPointerException e) {
            System.out.print("NPE ");
        } catch (Throwable e) {
            System.out.print("Throwable ");
        }
        System.out.print("Finished");
    }
}`,
        options: [
            'A) Prints: Throwable Finished',
            'B) Prints: NPE Finished',
            'C) Compilation Error: Cannot throw null',
            'D) Crashes the JVM with NullPointerException unhandled'
        ],
        correctOptionIndex: 1,
        hint: 'What does the Java Virtual Machine Specification state happens when the expression in a throw statement evaluates to null?',
        solution: 'Option B is correct: Prints "NPE Finished".',
        explanation: 'According to the Java Language Specification (JLS §14.18), if the expression in a `throw` statement evaluates to `null`, a `NullPointerException` is constructed and thrown instead. Thus, `throw t;` throws a new `NullPointerException`, which is caught by the first catch block.'
      },
      {
        title: 'Puzzle 9: Subclass Overriding Omitting Checked Exception',
        problemStatement: 'What is the output of the following program?',
        code: `import java.io.IOException;

interface NetworkClient {
    void connect() throws IOException;
}

class FastClient implements NetworkClient {
    @Override
    public void connect() {
        System.out.print("FastConnected ");
    }
}

public class Puzzle9 {
    public static void main(String[] args) {
        FastClient fc = new FastClient();
        fc.connect();
    }
}`,
        options: [
            'A) Compilation Error: FastClient must declare throws IOException because it implements NetworkClient',
            'B) Prints: FastConnected ',
            'C) Runtime error: AbstractMethodError',
            'D) Compilation Error in main: Unhandled IOException'
        ],
        correctOptionIndex: 1,
        hint: 'Can an implementation method choose not to throw the checked exceptions declared in an interface?',
        solution: 'Option B is correct: Prints "FastConnected ".',
        explanation: 'An overriding or implementing method is completely free to declare FEWER checked exceptions than its parent, including declaring NO exceptions at all. When calling `fc.connect()` via the `FastClient` reference, `main` does not need a `try-catch` or `throws` clause because `FastClient.connect()` declares no checked exceptions.'
      },
      {
        title: 'Puzzle 10: Custom Exception Directly Subclassing Throwable',
        problemStatement: 'What happens when compiling the following code?',
        code: `class CustomFault extends Throwable {
    public CustomFault(String msg) { super(msg); }
}

public class Puzzle10 {
    public static void check(int n) {
        // Line X:
        // if (n < 0) throw new CustomFault("Negative!");
    }

    public static void main(String[] args) {
        check(-5);
    }
}`,
        options: [
            'A) CustomFault is an unchecked exception because it does not extend Exception',
            'B) CustomFault is a checked exception; uncommenting Line X causes a compilation error because it is not caught or declared',
            'C) Compilation Error: Classes cannot directly extend java.lang.Throwable',
            'D) CustomFault is treated as a java.lang.Error'
        ],
        correctOptionIndex: 1,
        hint: 'What is the exact definition of a checked exception in Java?',
        solution: 'Option B is correct: CustomFault is a checked exception.',
        explanation: 'In Java, an exception is UNCHECKED if and only if it is a subclass of `RuntimeException` or `Error`. Any class that extends `Throwable` directly (or extends `Exception` without extending `RuntimeException`) is classified as a CHECKED exception. Therefore, uncommenting Line X causes a compile error: "unreported exception CustomFault; must be caught or declared to be thrown".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why did Java introduce Checked Exceptions, and why have modern languages and modern Java frameworks largely abandoned them?',
        answer: 'Java introduced checked exceptions to force developers at compile-time to think about and handle failure modes for external, unpredictable operations (like network drops, missing files, or SQL failures). The architectural intent was to make systems more robust by guaranteeing that alternate error paths were explicitly addressed. However, in practice, checked exceptions created severe unintended problems: 1) Leaky abstractions, where low-level exceptions like `SQLException` bubbled through business service interfaces; 2) Boilerplate and catch-and-ignore anti-patterns, where developers wrote empty catch blocks or printed stack traces just to satisfy the compiler; 3) Friction with functional programming, as standard Java functional interfaces (`Function`, `Consumer`, `Predicate`) do not declare checked exceptions, breaking Stream pipelines. Consequently, modern languages (C#, Kotlin, Go, Rust) and modern Java ecosystems (Spring Framework, Hibernate) abandoned checked exceptions in favor of unchecked exceptions combined with rich domain error types.',
        followUp: 'How does the Spring Framework handle standard JDBC checked exceptions like SQLException?',
        followUpAnswer: 'Spring translates checked `SQLException` into an extensive hierarchy of unchecked runtime exceptions rooted at `DataAccessException` (such as `BadSqlGrammarException`, `DuplicateKeyException`, `CannotAcquireLockException`). This decouples business logic from vendor-specific SQL codes and avoids forcing caller methods to declare `throws SQLException`.',
        keyPhrases: [
          'Compile-time safety intent',
          'Leaky abstraction problem',
          'Catch-and-ignore anti-pattern',
          'Incompatibility with Java Streams and Functional Interfaces',
          'Spring DataAccessException hierarchy translation'
        ],
        commonMistakeAnswer: 'Saying checked exceptions are checked at runtime by the JVM.'
      },
      {
        question: 'Explain the method overriding covariance rules for exceptions in Java. Why does the compiler enforce these rules?',
        answer: 'When a subclass overrides a superclass method, the overriding method cannot declare any checked exceptions that are broader than or in addition to those declared by the superclass. Specifically: 1) It may declare the exact same checked exceptions; 2) It may declare a subset of the checked exceptions (fewer); 3) It may declare subclasses (narrower/covariant) of the declared checked exceptions; 4) It may declare no checked exceptions at all; 5) It can declare ANY unchecked (`RuntimeException` or `Error`) exceptions without restriction. The compiler enforces this to uphold the Liskov Substitution Principle (LSP). If client code holds a superclass reference (`Parent p = new Child()`), the client writes a `catch (IOException)` block based on `Parent.method() throws IOException`. If `Child.method()` were allowed to throw `Exception` or `SQLException`, the client catch block would fail to intercept the error, crashing the program.',
        followUp: 'What are the rules when implementing two interfaces that declare the same method with different throws clauses?',
        followUpAnswer: 'The implementing method can only declare checked exceptions that are present in the intersection of both interfaces. If Interface A throws IOException and Interface B throws FileNotFoundException, the implementation can declare throws FileNotFoundException (or none), because FileNotFoundException is compatible with both.',
        keyPhrases: [
          'Liskov Substitution Principle (LSP)',
          'Cannot throw broader or new checked exceptions',
          'Can throw narrower or fewer checked exceptions',
          'Unchecked exceptions are completely exempt',
          'Intersection rule for multiple interfaces'
        ],
        commonMistakeAnswer: 'Believing an overriding method must declare the exact same exceptions as the superclass.'
      },
      {
        question: 'What is the precise difference between ClassNotFoundException and NoClassDefFoundError?',
        answer: '`ClassNotFoundException` is a checked `Exception` that occurs at runtime when an application attempts to dynamically load a class by its string name using reflection (e.g., `Class.forName("com.mysql.cj.jdbc.Driver")`, `ClassLoader.loadClass()`, or `findSystemClass()`), but no definition for the class with the specified name could be found in the classpath. In contrast, `NoClassDefFoundError` is an unchecked `Error` that occurs when the Java Virtual Machine or a ClassLoader instance tries to load in the definition of a class that was available at compile-time, but is completely missing at runtime (e.g., a missing JAR in production), or when static initialization of that class failed with an uncaught exception (`ExceptionInInitializerError`), leaving the class in an unusable state.',
        followUp: 'Can you recover from a NoClassDefFoundError at runtime?',
        followUpAnswer: 'Generally no. Because NoClassDefFoundError is an Error, the JVM class-loading subsystem has recorded that class as failed. Subsequent attempts to reference the class in the same classloader will immediately fail with the same NoClassDefFoundError without even re-attempting initialization.',
        keyPhrases: [
          'ClassNotFoundException is a checked Exception from dynamic lookup (Class.forName)',
          'NoClassDefFoundError is an unchecked Error from JVM link/load failure',
          'Present at compile-time but missing at runtime',
          'Static initializer failure (ExceptionInInitializerError)'
        ],
        commonMistakeAnswer: 'Treating them as synonyms or claiming ClassNotFoundException happens at compile-time.'
      },
      {
        question: 'What happens mechanically inside the JVM when an exception is instantiated? Why are exceptions considered expensive?',
        answer: 'When `new Throwable()` or any subclass is instantiated, the constructor invokes the native JVM method `fillInStackTrace()`. This native method causes the JVM to walk the thread OS execution stack from the current frame all the way down to the thread entry point (`run()` or `main()`). For each execution frame, it records metadata: declaring class, method name, source file name, and bytecode index / line number. This involves memory allocations, native-to-Java context switching, and cache evictions. In microsecond-latency applications, creating thousands of exceptions per second burns massive CPU cycles. If an exception is only used as a sentinel signal without needing stack info, overriding `fillInStackTrace()` to do nothing can make instantiation over 100x faster.',
        followUp: 'How can you create a lightweight exception in Java for performance-critical scenarios?',
        followUpAnswer: 'By overriding fillInStackTrace(): `public Throwable fillInStackTrace() { return this; }`, or by passing writableStackTrace = false to the protected Throwable constructor introduced in Java 7.',
        keyPhrases: [
          'fillInStackTrace() native execution',
          'Stack frame traversal',
          'Metadata recording (line numbers, class names)',
          'High CPU and memory overhead',
          'writableStackTrace = false optimization'
        ],
        commonMistakeAnswer: 'Believing the try-catch block itself slows down execution even when no exception is thrown.'
      },
      {
        question: 'Why does javac reject catching IOException in a try block that does not declare it, but permits catching NullPointerException anywhere?',
        answer: 'The Java compiler implements a strict reachability check for checked exceptions. Under JLS §11.2.3, it is a compile-time error if a `catch` clause can catch checked exception class `E` when the corresponding `try` block cannot throw any checked exception that is a subtype of `E`. Because checked exceptions are explicitly declared in method signatures, `javac` has full deterministic knowledge of whether any checked exception can emerge from the `try` block. In contrast, unchecked exceptions (`RuntimeException` and its subtypes) represent programming defects (like null dereferencing or dividing by zero) that can theoretically occur on virtually any JVM bytecode instruction (`invokevirtual`, `idiv`, `aaload`). Therefore, the compiler permits catching unchecked exceptions around any block of code.',
        followUp: 'What happens if you catch Exception in a try block that only does int x = 1;?',
        followUpAnswer: 'It compiles cleanly! Because Exception is the superclass of RuntimeException, catching Exception is permitted because the try block could theoretically throw an unchecked RuntimeException.',
        keyPhrases: [
          'JLS reachability verification',
          'Deterministic checked exception analysis',
          'Unchecked exceptions can occur on almost any bytecode',
          'Catching Exception is legal because it subsumes RuntimeException'
        ],
        commonMistakeAnswer: 'Assuming you cannot catch Exception unless a checked exception is thrown.'
      },
      {
        question: 'Can a subclass constructor declare fewer exceptions than its superclass constructor? What are the constructor exception propagation rules?',
        answer: 'No! A subclass constructor can NEVER declare fewer checked exceptions than the superclass constructor it invokes. When a subclass constructor is executed, the very first statement must be an explicit or implicit call to `super()`. Because `super()` is an imperative statement that executes outside of any `try-catch` block inside the subclass constructor, any checked exception thrown by `super()` must be declared in the subclass constructor `throws` clause. The subclass constructor can declare broader checked exceptions (e.g., superclass constructor throws `IOException`, subclass constructor throws `Exception`), but it can never swallow or narrow the superclass constructor checked exceptions.',
        followUp: 'Can you wrap super() inside a try-catch block inside a constructor?',
        followUpAnswer: 'No. Java syntax strictly mandates that super() or this() must be the very first statement in a constructor body. Enclosing super() in a try-catch block produces a compilation error.',
        keyPhrases: [
          'super() must be first statement',
          'Cannot wrap super() in try-catch',
          'Subclass constructor must declare at least what super constructor throws',
          'Constructors can declare broader exceptions (opposite of method overriding)'
        ],
        commonMistakeAnswer: 'Confusing constructor exception rules with method overriding covariance rules.'
      },
      {
        question: 'What is "Sneaky Throws", and how does it bypass Java compile-time checked exception checking?',
        answer: '"Sneaky Throws" is an advanced JVM technique (popularized by Project Lombok `@SneakyThrows`) that allows throwing checked exceptions without declaring them in a method signature `throws` clause and without wrapping them in a `RuntimeException`. It exploits Java generic type erasure. In Java, generics are erased at compile-time to their upper bounds (`Object`). By writing a helper method `<E extends Throwable> void sneakyThrow(Throwable t) throws E { throw (E) t; }`, the compiler erases `(E) t` to `(Throwable) t` in the bytecode. When called via `sneakyThrow(new IOException())`, the compiler infers `E` as `RuntimeException` at the call site, thus bypassing the catch-or-declare check, while the JVM faithfully throws the raw checked `IOException` at runtime.',
        followUp: 'What danger does Sneaky Throws introduce to calling code?',
        followUpAnswer: 'Calling code has no idea that a checked exception can be thrown. If client code wraps the call in catch (IOException), the compiler might reject it as unreachable, or if client code catches Exception, it might inadvertently bypass intended error handlers.',
        keyPhrases: [
          'Generic type erasure exploitation',
          'Lombok @SneakyThrows',
          'Bypasses javac catch-or-declare checking',
          'Throws checked exception as unchecked at bytecode level'
        ],
        commonMistakeAnswer: 'Claiming Sneaky Throws converts the exception into a RuntimeException at runtime.'
      },
      {
        question: 'How should an architect decide between designing a custom exception as Checked vs Unchecked?',
        answer: 'In modern FAANG architecture, the standard decision heuristic is: 1) Default to Unchecked (`RuntimeException`). Over 95% of custom exceptions should extend `RuntimeException`. This includes invalid state (`IllegalStateException`), malformed payload (`InvalidOrderException`), entity missing (`UserNotFoundException`), and authentication failures (`UnauthorizedException`). 2) Use Checked Exceptions ONLY if all three conditions are satisfied: (a) The condition is an anticipated failure resulting from external systems outside the application control; (b) The immediate caller can realistically take a concrete programmatic recovery action (e.g., retrying with an alternate endpoint or fallback cache); and (c) The exception is confined to a tight, local API boundary that does not pollute high-level domain interfaces.',
        followUp: 'What is exception chaining, and why is it critical when wrapping exceptions?',
        followUpAnswer: 'Exception chaining passes the original exception as the cause parameter to a new exception constructor (super(message, cause)). This preserves the complete historical stack trace across architectural layers, preventing root-cause loss during debugging.',
        keyPhrases: [
          'Default to RuntimeException',
          'Programmatic recovery criterion',
          'Avoid polluting domain signatures',
          'Exception chaining with cause parameter',
          'Root cause preservation'
        ],
        commonMistakeAnswer: 'Recommending checked exceptions for all business validation errors.'
      },
      {
        question: 'How does Thread.UncaughtExceptionHandler work when an unchecked exception escapes a thread?',
        answer: 'When a thread terminates abruptly due to an uncaught exception, the JVM invokes the thread `dispatchUncaughtException()` method. The resolution order is: 1) Check if the specific thread has an explicit handler via `thread.getUncaughtExceptionHandler()`; 2) If null, delegate to the thread `ThreadGroup` (which implements `Thread.UncaughtExceptionHandler`); 3) The `ThreadGroup` checks its parent group; if no handler is found, it queries the default global handler set via `Thread.setDefaultUncaughtExceptionHandler()`; 4) If no default handler is configured, the JVM prints the thread name, exception type, and stack trace to `System.err`. In production enterprise applications, configuring a global uncaught exception handler is mandatory for logging telemetry, alerting on-call engineers, and triggering circuit breakers.',
        followUp: 'What happens in an ExecutorService if a task submitted via submit() throws an unchecked exception?',
        followUpAnswer: 'If submitted via executor.submit(Callable/Runnable), the uncaught exception is captured and stored inside the returned Future. It will NOT trigger the UncaughtExceptionHandler! It is only rethrown when future.get() is called, wrapped in an ExecutionException.',
        keyPhrases: [
          'Thread.UncaughtExceptionHandler interface',
          'Thread -> ThreadGroup -> DefaultUncaughtExceptionHandler hierarchy',
          'Production telemetry and alerting',
          'ExecutorService Future.get() swallowing behavior'
        ],
        commonMistakeAnswer: 'Believing an uncaught exception in a background thread crashes the entire JVM process immediately.'
      },
      {
        question: 'What is the difference between throw and throws, and can you throw an instance of an anonymous Throwable subclass?',
        answer: '`throw` is an imperative control-flow statement executed at runtime to raise an exception: `throw new CustomException();`. It halts standard sequential execution and begins stack unrolling. In contrast, `throws` is a declarative keyword used in method signatures to advertise checked exceptions that the method might propagate to its callers: `public void load() throws IOException`. Yes, you can throw an anonymous subclass of `Throwable`: `throw new Throwable("Anonymous") { @Override public String getMessage() { return "Custom"; } };`. Because the anonymous class is a direct subclass of `Throwable`, it is treated by `javac` as a checked exception and must be caught or declared.',
        followUp: 'Can you re-throw a caught exception, and does the compiler perform precise rethrow analysis in Java 7+?',
        followUpAnswer: 'Yes. In Java 7+, the compiler performs precise rethrow analysis (Rethrowing Exceptions with Improved Type Checking). If you catch (Exception e) and do throw e, the compiler inspects the try block and only requires declaring the actual checked exceptions that could be thrown in that try block, not Exception.',
        keyPhrases: [
          'throw is an imperative statement',
          'throws is a method signature declaration',
          'Anonymous Throwable is a checked exception',
          'Java 7 precise rethrow type checking'
        ],
        commonMistakeAnswer: 'Assuming you can only throw predefined classes created with the class keyword.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following classes is the direct superclass of both Exception and Error in Java?',
        options: [
          'java.lang.Object',
          'java.lang.Throwable',
          'java.lang.RuntimeException',
          'java.lang.VirtualMachineError'
        ],
        correctIndex: 1,
        explanation: '`java.lang.Throwable` is the direct root superclass of both `Exception` and `Error`.'
      },
      {
        question: 'Which of the following is a CHECKED exception in Java?',
        options: [
          'java.lang.NullPointerException',
          'java.lang.ArrayIndexOutOfBoundsException',
          'java.io.IOException',
          'java.lang.IllegalArgumentException'
        ],
        correctIndex: 2,
        explanation: '`IOException` directly extends `java.lang.Exception` (not `RuntimeException`), making it a checked exception.'
      },
      {
        question: 'What happens if a subclass method attempts to declare a checked exception that is NOT declared by the superclass method?',
        options: [
          'It compiles and runs normally',
          'The compiler rejects it with a compilation error',
          'A runtime ClassCastException is thrown',
          'The JVM suppresses the exception at runtime'
        ],
        correctIndex: 1,
        explanation: 'An overriding method cannot declare new or broader checked exceptions than the overridden method.'
      },
      {
        question: 'Which exception class is UNCHECKED even though it does NOT extend RuntimeException?',
        options: [
          'java.lang.Error and its subclasses',
          'java.io.FileNotFoundException',
          'java.lang.ClassNotFoundException',
          'java.sql.SQLException'
        ],
        correctIndex: 0,
        explanation: '`java.lang.Error` and all its subclasses (like `OutOfMemoryError`) are unchecked exceptions that do not extend `RuntimeException`.'
      },
      {
        question: 'Why is instantiating an exception in Java computationally expensive?',
        options: [
          'It acquires a global JVM lock',
          'fillInStackTrace() traverses every execution frame on the thread call stack',
          'It forces immediate Garbage Collection',
          'It serializes the object to disk'
        ],
        correctIndex: 1,
        explanation: 'The native `fillInStackTrace()` method traverses the thread stack frames to record execution metadata, incurring significant CPU and memory overhead.'
      },
      {
        question: 'What will happen if you write: try { int a = 5; } catch (java.io.IOException e) {}?',
        options: [
          'Compiles and executes without error',
          'Compilation error: IOException is never thrown in the try block',
          'A NullPointerException is thrown at runtime',
          'The catch block executes unconditionally'
        ],
        correctIndex: 1,
        explanation: 'Catching a checked exception that cannot possibly be thrown in the associated `try` block produces a compile-time error.'
      },
      {
        question: 'If a superclass method declares `void process() throws IOException`, which override in a subclass is ILLEGAL?',
        options: [
          'void process() throws FileNotFoundException',
          'void process()',
          'void process() throws Exception',
          'void process() throws RuntimeException'
        ],
        correctIndex: 2,
        explanation: '`Exception` is a broader superclass of `IOException`. Overriding methods cannot declare broader checked exceptions.'
      },
      {
        question: 'Which statement about constructor exception handling is TRUE?',
        options: [
          'Subclass constructors can declare fewer checked exceptions than superclass constructors',
          'Subclass constructors can never throw checked exceptions',
          'Subclass constructors must declare all checked exceptions thrown by the invoked superclass constructor',
          'Constructors cannot declare throws clauses'
        ],
        correctIndex: 2,
        explanation: 'Because `super()` is executed at the very start of the subclass constructor outside of any `try-catch`, the subclass constructor must declare at least all checked exceptions thrown by the superclass constructor.'
      },
      {
        question: 'What happens if a throw statement evaluates to null (`throw null;`)?',
        options: [
          'Compiles cleanly and throws a NullPointerException at runtime',
          'Causes a compilation error',
          'Silently terminates the program',
          'Throws a NullLiteralException'
        ],
        correctIndex: 0,
        explanation: 'JLS §14.18 specifies that if the expression evaluated in a `throw` statement yields null, a `NullPointerException` is thrown instead.'
      },
      {
        question: 'Why does the Spring Framework convert JDBC SQLException into DataAccessException?',
        options: [
          'To make database queries execute faster',
          'To replace checked exceptions with a cohesive unchecked domain exception hierarchy',
          'Because Java 8 deprecated SQLException',
          'To force developers to write try-catch blocks everywhere'
        ],
        correctIndex: 1,
        explanation: 'Spring converts vendor-specific checked `SQLException` instances into an unchecked `DataAccessException` hierarchy to eliminate boilerplate and decouple application code from specific database drivers.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 21.2: try-catch-finally Semantics, Multi-Catch & Execution Order Traps
  // ─────────────────────────────────────────────────────────────
  'try-catch-finally-execution-order': {
    id: 'try-catch-finally-execution-order',
    moduleId: 'java-exceptions',
    moduleTitle: '21. Exception Handling',
    lessonNumber: 'Lesson 21.2',
    title: 'try-catch-finally Semantics, Multi-Catch & Execution Order Traps',
    subtitle: 'Exception propagation up the call stack, catch ordering inheritance rules, Java 7 multi-catch disjoint types, finally guarantees, System.exit scenarios, and the return-in-finally trap',
    estimatedMinutes: 26,
    beginnerAnalogy: 'Imagine a high-security courtroom legal hearing and bail bond procedure. The trial proceeding itself is the `try` block: normal business is conducted. If an objection or crime occurs inside the courtroom, an exception is raised, and defense attorneys (`catch` blocks) jump in to handle it. However, the defense attorneys sit in strict order of seniority: the specialized junior attorney (`FileNotFoundException`) must speak before the senior general partner (`IOException`), or the judge will hold you in contempt (compilation error: unreachable code). When the session ends, the courthouse security and cleaning crew (`finally` block) is legally guaranteed to sweep the room, turn off the lights, and padlock the gates regardless of whether the defendant is acquitted, convicted, or escapes out the window! The ONLY time the cleaning crew does not lock the doors is if an asteroid vaporizes the entire building (`System.exit()` or JVM crash). And here is the deadly trap: if the judge rules "Not Guilty" in the trial room (`return 10` in `try`), but the custodian scribbles "Guilty!" on the blackboard on the way out (`return 20` in `finally`), the custodian rogue scribbling overrides the judge ruling and permanently erases the court transcript!',
    interviewTakeaways: [
      'Stack Unrolling and Propagation: When an exception is thrown, the JVM halts standard linear execution and unrolls the call stack frame by frame, searching for an enclosing `try` block with a matching `catch` clause. If no frame catches the exception, the thread terminates.',
      'Catch Block Inheritance Ordering: Catch blocks are evaluated sequentially from top to bottom. A subclass catch block MUST always precede its superclass catch block. Placing `catch (Exception e)` before `catch (IOException e)` results in a compile-time error (`exception has already been caught`).',
      'Java 7 Multi-Catch Rules: Multi-catch (`catch (IOException | SQLException e)`) allows multiple exception types to be caught in a single block. The parameter `e` is implicitly `final` (cannot be reassigned), and the types must be completely disjoint (neither can be a subtype of another; e.g. `FileNotFoundException | IOException` causes a compilation error).',
      'The Absolute `finally` Guarantee: A `finally` block executes unconditionally whenever control leaves a `try` or `catch` block—whether by normal completion, explicit `return`, `break`, `continue`, or an unhandled exception.',
      'When `finally` Does NOT Execute: The `finally` block is bypassed in only catastrophic scenarios: 1) Calling `System.exit(status)` or `Runtime.getRuntime().halt(status)`; 2) JVM crash or fatal OS signal (SIGKILL, power failure); 3) An infinite loop or permanent thread deadlock inside the `try` or `catch` block.',
      'The "Return in Finally" Anti-Pattern: If a `finally` block executes a `return` statement, it silently discards and suppresses ANY exception thrown in `try` or `catch`, and overwrites any prior return value. It is considered a critical bug in production systems.',
      'Return Evaluation Buffering (Primitives vs References): When a `return` executes in `try`, the return value is immediately evaluated and stored in a temporary stack slot before `finally` runs. If `finally` modifies a primitive variable without returning, the caller receives the original buffered primitive value. If it modifies the internal state of a mutable object reference, the mutated object is visible to the caller.'
    ],
    cheatSheet: {
      summary: 'Catch blocks must be ordered from specific subclass to general superclass. Multi-catch types must be disjoint and final. Finally always executes except on System.exit() or JVM crash. Return in finally overrides prior returns and swallows exceptions.',
      syntaxTemplate: `// Standard try-catch-finally with Multi-Catch
try {
    performDatabaseOperation();
    readConfigFile();
} catch (SQLException | IOException e) {
    // Multi-catch: e is implicitly final!
    logger.error("I/O or DB Failure", e);
    throw new ServiceException("Storage error", e);
} catch (Exception e) {
    // General catch must come LAST
    logger.error("Unexpected failure", e);
} finally {
    // Clean-up code: executes unconditionally
    cleanupResources();
}

// Return Value Evaluation Buffer
int compute() {
    int x = 10;
    try {
        return x; // Evaluates 10 into return buffer
    } finally {
        x = 50;   // Modifies local variable x, NOT the return buffer!
        // Returning from compute() yields 10!
    }
}`,
      rules: [
        { rule: 'Catch Specificity Ordering', explanation: 'Subclass catch blocks must appear before superclass catch blocks; inverted ordering causes a compile-time unreachable code error.' },
        { rule: 'Multi-Catch Disjointness', explanation: 'Alternatives in a multi-catch (TypeA | TypeB) must be disjoint; inheritance relationships (e.g. Sub | Super) trigger a compilation error.' },
        { rule: 'Multi-Catch Parameter Finality', explanation: 'The exception variable declared in a multi-catch statement is implicitly final; reassigning it produces a compilation error.' },
        { rule: 'Finally Execution Invariance', explanation: 'The finally block executes whether try completes normally, returns, or throws an unhandled exception.' },
        { rule: 'Return-in-Finally Exception Masking', explanation: 'A return or throw in a finally block completely suppresses and discards any prior exception or return value from try or catch.' },
        { rule: 'System.exit Bypasses Finally', explanation: 'System.exit() terminates the JVM process immediately, preventing finally blocks from executing.' }
      ],
      quickComparison: [
        { aspect: 'Execution Guarantee', optionA: 'catch: Executes only if matching exception is thrown', optionB: 'finally: Executes on normal completion, return, or exception' },
        { aspect: 'Inheritance Ordering', optionA: 'Single Catch: Subclass must precede Superclass', optionB: 'Multi-Catch: Subclass and Superclass union is illegal (Compile Error)' },
        { aspect: 'Variable Mutability', optionA: 'Single Catch: Exception variable e is mutable by default', optionB: 'Multi-Catch: Exception variable e is implicitly final' },
        { aspect: 'Exception Masking', optionA: 'catch: Can rethrow or wrap exceptions', optionB: 'finally return: Silently swallows and permanently destroys exceptions' },
        { aspect: 'Termination Edge Cases', optionA: 'catch: Bypassed on unhandled or no exception', optionB: 'finally: Skipped on System.exit(), JVM crash, or infinite loops' }
      ]
    },
    coreExplanation: [
      'Call Stack Propagation and Stack Frame Unrolling: When an instruction triggers an exception, normal execution stops abruptly. The JVM searches the current method frame exception table for a range covering the current bytecode index and a matching exception type. If found, instruction pointer jumps to the handler. If not found, the current stack frame is discarded, and the exception propagates to the calling method frame. This process repeats up the call stack until a matching handler is found or the thread terminates.',
      'Catch Block Resolution and Ordering Rules: Catch clauses are evaluated linearly from top to bottom. The first catch block whose declared type matches or is a superclass of the thrown exception is chosen. Because of this linear evaluation, placing a more general exception handler (`catch (Exception e)`) above a more specialized handler (`catch (FileNotFoundException e)`) would render the specialized handler unreachable. The Java compiler detects this and generates an `exception has already been caught` compilation error.',
      'Java 7 Multi-Catch and Disjoint Types: Prior to Java 7, handling multiple distinct exceptions with identical logic required either duplicating catch blocks or catching their common ancestor `Exception`. Java 7 introduced multi-catch: `catch (IOException | SQLException e)`. To prevent redundant declarations, the Java compiler strictly mandates that the types in a multi-catch union must be alternative and disjoint—neither type can be a subtype of another. Furthermore, the multi-catch variable `e` is implicitly `final`, meaning any attempt to reassign `e = new ...` is a compile-time error.',
      'The Mechanics of the `finally` Guarantee: The `finally` block represents cleanup logic that must execute under all circumstances. Whether a method returns normally, executes a `return` statement inside `try`, or throws an uncaught exception, the JVM ensures that the bytecode corresponding to the `finally` block is executed before control transfers to the caller or downstream instruction.',
      'JVM Bytecode Implementation of `finally`: In early versions of Java, `finally` was implemented using the `jsr` (jump subroutine) and `ret` bytecode instructions. In modern Java (Java 6+), `jsr`/`ret` was deprecated and removed for bytecode verification safety. Modern `javac` compilers implement `finally` by inlining the `finally` instructions into every possible exit path: before every `return`, before every `break`/`continue`, and inside a compiler-generated synthetic `catch (all)` block in the method exception table.',
      'Evaluation Buffers: Return Semantics in Try-Finally: When a `return expr;` statement executes inside a `try` block, the expression `expr` is evaluated immediately. If `expr` evaluates to a primitive value (e.g., integer `10`), that value is pushed to the JVM operand stack and saved in a local variable slot designated for the return value. If `finally` subsequently modifies the original local variable without an explicit `return`, the caller still receives the saved primitive value (`10`). However, if `expr` evaluates to an object reference, mutating the internal fields of the object inside `finally` DOES affect the object received by the caller, because both references point to the same heap object.',
      'The "Return in Finally" Hazard and Exception Swallowing: If a `finally` block contains an explicit `return` statement, it overrides any pending return value or pending unhandled exception from the `try` or `catch` block. If `try` threw a critical `NullPointerException` or `DatabaseCrashException`, and `finally` executes `return 42;`, the exception is completely eradicated and discarded as if it never occurred! SonarQube, SpotBugs, and modern static analysis tools flag return statements in finally blocks as critical code smells.',
      'Scenarios Where `finally` Does NOT Run: While `finally` is guaranteed to run during normal language control-flow transitions, it will not run if the host environment terminates: 1) `System.exit(int status)` or `Runtime.getRuntime().halt(int status)` terminates the JVM process immediately; 2) The JVM crashes due to an OS-level SIGKILL (`kill -9`), power loss, or native segmentation fault; 3) The thread running the `try` block enters an infinite loop (`while(true)`) or deadlocks permanently on a synchronized monitor.'
    ],
    diagram: `TRY-CATCH-FINALLY CONTROL FLOW & RETURN BUFFER MECHANICS
========================================================================

           ┌────────────────────────────────────────┐
           │              TRY BLOCK                 │
           │                                        │
           │  int x = 10;                           │
           │  return x;  ──> [1. EVALUATE & BUFFER] │
           └───────────────────┬────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            │ NO EXCEPTION                        │ EXCEPTION THROWN
            ▼                                     ▼
   ┌──────────────────┐                  ┌──────────────────┐
   │  FINALLY BLOCK   │                  │   CATCH BLOCK    │
   │                  │                  │                  │
   │  x = 50;         │                  │ (Matching Catch) │
   │ (Alters local x, │                  └────────┬─────────┘
   │  NOT buffer!)    │                           │
   └────────┬─────────┘                           ▼
            │                            ┌──────────────────┐
            │                            │  FINALLY BLOCK   │
            │                            └────────┬─────────┘
            ▼                                     │
   [2. DELIVER BUFFER]                            ▼
   Caller receives 10!                   [Rethrow or Return]

------------------------------------------------------------------------
THE RETURN-IN-FINALLY DISASTER (EXCEPTION ERASURE):
------------------------------------------------------------------------
try {
    throw new RuntimeException("CRITICAL ERROR"); ──┐ (Exception in flight)
} finally {                                         │
    return 42;  <── [SWALLOWS EXCEPTION!] ──────────┘
}
Outcome: Caller receives 42! Exception is PERMANENTLY DESTROYED!`,
    codeSnippet: {
      title: 'Execution Order and Return Value Evaluation Mechanics',
      code: `public class TryCatchFinallyMechanics {

    // Demonstrates primitive return value buffering
    public static int testPrimitiveBuffer() {
        int x = 10;
        try {
            System.out.println("1. Try block: evaluating return x");
            return x; // Evaluates to 10 and buffers on operand stack
        } finally {
            x = 99; // Modifies local variable x, NOT the return buffer
            System.out.println("2. Finally block: x reassigned to " + x);
        }
    }

    // Demonstrates mutable object reference modification
    public static StringBuilder testReferenceBuffer() {
        StringBuilder sb = new StringBuilder("Initial");
        try {
            System.out.println("3. Try block: returning StringBuilder reference");
            return sb; // Buffers reference to the StringBuilder object
        } finally {
            sb.append("-ModifiedInFinally"); // Mutates heap object!
            System.out.println("4. Finally block: mutated StringBuilder");
        }
    }

    public static void main(String[] args) {
        int num = testPrimitiveBuffer();
        System.out.println("Result of testPrimitiveBuffer: " + num);
        System.out.println("---------------------------------------------");
        StringBuilder text = testReferenceBuffer();
        System.out.println("Result of testReferenceBuffer: " + text.toString());
    }
}`,
      lineByLineExplanation: [
        { line: 'public static int testPrimitiveBuffer()', explanation: 'Method returning an int primitive to test evaluation buffering.' },
        { line: 'return x;', explanation: 'The value of x (10) is evaluated, placed into the return buffer on the operand stack.' },
        { line: 'finally { x = 99; }', explanation: 'The finally block executes; assigning 99 to local variable x changes the local variable table, not the return buffer.' },
        { line: 'return sb;', explanation: 'The reference pointing to the StringBuilder object is placed into the return buffer.' },
        { line: 'sb.append("-ModifiedInFinally");', explanation: 'Mutates the object in heap memory via the reference; because the buffer holds this same reference, the mutation is visible to caller.' },
        { line: 'System.out.println("Result of testPrimitiveBuffer: " + num);', explanation: 'Prints 10, proving primitive value was preserved by the evaluation buffer.' },
        { line: 'System.out.println("Result of testReferenceBuffer: " + text.toString());', explanation: 'Prints "Initial-ModifiedInFinally", proving object mutation in finally affects callers.' }
      ],
      output: `1. Try block: evaluating return x
2. Finally block: x reassigned to 99
Result of testPrimitiveBuffer: 10
---------------------------------------------
3. Try block: returning StringBuilder reference
4. Finally block: mutated StringBuilder
Result of testReferenceBuffer: Initial-ModifiedInFinally`
    },
    codeExamples: [
      {
        title: 'Java 7 Multi-Catch and Disjoint Types Demonstration',
        description: 'Demonstrates handling multiple unrelated exceptions in a single catch block and compiler enforcement of disjoint types.',
        code: `import java.io.IOException;
import java.sql.SQLException;

public class MultiCatchDemo {

    public static void process(int mode) throws IOException, SQLException {
        if (mode == 1) throw new IOException("Disk failure");
        if (mode == 2) throw new SQLException("Connection timed out");
        System.out.println("Execution successful");
    }

    public static void main(String[] args) {
        for (int mode = 1; mode <= 2; mode++) {
            try {
                process(mode);
            } catch (IOException | SQLException e) {
                // e is implicitly final!
                // e = new IOException(); // COMPILE ERROR: cannot assign a value to final variable e
                System.out.println("Caught in multi-catch: " + e.getClass().getSimpleName() + " -> " + e.getMessage());
            }
        }

        // ILLEGAL MULTI-CATCH EXAMPLE (Won't compile):
        // try {
        //     throw new java.io.FileNotFoundException("missing");
        // } catch (java.io.FileNotFoundException | java.io.IOException e) {
        //     // COMPILE ERROR: The exception FileNotFoundException is already caught by the alternative IOException
        // }
    }
}`,
        output: `Caught in multi-catch: IOException -> Disk failure
Caught in multi-catch: SQLException -> Connection timed out`
      },
      {
        title: 'The Catastrophic "Return in Finally" Exception Masking Trap',
        description: 'Demonstrates how a return statement inside a finally block completely suppresses and swallows an unhandled exception.',
        code: `public class ReturnInFinallyTrap {

    public static String computeVerdict() {
        try {
            System.out.println("1. Entering try block");
            int calculation = 10 / 0; // Throws ArithmeticException!
            return "TrySuccess";
        } catch (NullPointerException e) {
            System.out.println("2. Caught NPE");
            return "CatchNPE";
        } finally {
            System.out.println("3. Finally block executing return!");
            // CRITICAL ANTI-PATTERN:
            // This return statement discards the unhandled ArithmeticException!
            return "FinallyOverrodeVerdict";
        }
    }

    public static void main(String[] args) {
        try {
            String result = computeVerdict();
            System.out.println("Result received by main: " + result);
            System.out.println("NOTICE: ArithmeticException was completely swallowed and erased!");
        } catch (Exception e) {
            System.out.println("Caught exception in main: " + e.getMessage());
        }
    }
}`,
        output: `1. Entering try block
3. Finally block executing return!
Result received by main: FinallyOverrodeVerdict
NOTICE: ArithmeticException was completely swallowed and erased!`
      },
      {
        title: 'Nested Try-Catch-Finally Execution Order Tracing',
        description: 'Traces execution order through inner and outer try-catch-finally blocks with an unhandled exception re-thrown outward.',
        code: `public class NestedTryCatchTracing {

    public static void main(String[] args) {
        StringBuilder log = new StringBuilder();
        try {
            log.append("OuterTry ");
            try {
                log.append("InnerTry ");
                throw new IllegalArgumentException("InnerError");
            } catch (NullPointerException e) {
                log.append("InnerCatchNPE ");
            } finally {
                log.append("InnerFinally ");
            }
            log.append("OuterPostInner ");
        } catch (IllegalArgumentException e) {
            log.append("OuterCatchIAE ");
        } finally {
            log.append("OuterFinally");
        }

        System.out.println("Execution Log: " + log.toString());
    }
}`,
        output: `Execution Log: OuterTry InnerTry InnerFinally OuterCatchIAE OuterFinally`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Placing a general superclass catch block before a specific subclass catch block',
        whyItHappens: 'Developers write catch (Exception e) at the top of the catch chain, followed by catch (IOException e).',
        howToFix: 'Order catch blocks from most specific subclass to most general superclass. Inverted ordering fails to compile with "unreachable code".'
      },
      {
        mistake: 'Combining subclass and superclass types in a Java 7 multi-catch: catch (FileNotFoundException | IOException e)',
        whyItHappens: 'Developers assume multi-catch is a catch-all list for any exceptions they might encounter.',
        howToFix: 'Multi-catch types must be completely disjoint. Remove the subclass (`FileNotFoundException`) because the superclass (`IOException`) already encompasses it.'
      },
      {
        mistake: 'Putting a return statement inside a finally block',
        whyItHappens: 'Developers think returning from finally ensures a fallback value if anything went wrong.',
        howToFix: 'Never place a return statement inside a finally block. It silently destroys any pending exceptions and overwrites prior return values, hiding critical system bugs.'
      },
      {
        mistake: 'Assuming finally will run even when System.exit() or kill -9 occurs',
        whyItHappens: 'Textbooks state "finally always runs", leading developers to rely on it for critical external transactions without persistent write-ahead logging.',
        howToFix: 'Do not rely on finally for recovery across process boundaries. Use transactional two-phase commit, write-ahead logs, or JVM shutdown hooks (`Runtime.getRuntime().addShutdownHook()`) for graceful termination.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Primitive Return Evaluation Buffer',
        problemStatement: 'What does the following method return when invoked?',
        code: `public class Puzzle1 {
    public static int getValue() {
        int a = 1;
        try {
            a = 10;
            return a;
        } finally {
            a = 20;
        }
    }

    public static void main(String[] args) {
        System.out.print(getValue());
    }
}`,
        options: [
            'A) 1',
            'B) 10',
            'C) 20',
            'D) Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'When return a executes in try, what is stored on the operand stack before entering finally?',
        solution: 'Option B is correct: 10.',
        explanation: 'When `return a;` executes in the `try` block, the current value of `a` (which is `10`) is evaluated and stored in an internal return slot on the JVM stack. Then the `finally` block runs, setting the local variable `a` to `20`. Because the `finally` block does not execute a `return` statement, the method completes by returning the buffered value `10`.'
      },
      {
        title: 'Puzzle 2: Reference Type Return Evaluation Buffer',
        problemStatement: 'What does the following code print?',
        code: `class Box {
    int val = 5;
}

public class Puzzle2 {
    public static Box getBox() {
        Box b = new Box();
        try {
            b.val = 15;
            return b;
        } finally {
            b.val = 35;
        }
    }

    public static void main(String[] args) {
        System.out.print(getBox().val);
    }
}`,
        options: [
            'A) 5',
            'B) 15',
            'C) 35',
            'D) NullPointerException'
        ],
        correctOptionIndex: 2,
        hint: 'What does the return buffer store for an object—the object itself or the reference pointing to it?',
        solution: 'Option C is correct: 35.',
        explanation: 'When `return b;` is evaluated in `try`, the return buffer stores the object reference pointing to the `Box` instance in heap memory. The `finally` block then accesses that same heap instance via `b.val = 35;` and modifies its internal field. When the caller receives the buffered reference, `b.val` is 35.'
      },
      {
        title: 'Puzzle 3: Return in Finally Overrides Return in Try and Catch',
        problemStatement: 'What is the output of running this code?',
        code: `public class Puzzle3 {
    public static int evaluate() {
        try {
            int x = 10 / 0;
            return 1;
        } catch (ArithmeticException e) {
            return 2;
        } finally {
            return 3;
        }
    }

    public static void main(String[] args) {
        System.out.print(evaluate());
    }
}`,
        options: [
            'A) 1',
            'B) 2',
            'C) 3',
            'D) Unhandled ArithmeticException'
        ],
        correctOptionIndex: 2,
        hint: 'A return in a finally block has absolute precedence over any prior return statements.',
        solution: 'Option C is correct: 3.',
        explanation: 'The `try` block throws `ArithmeticException`. The `catch` block catches it and prepares to return `2`. Before returning, control transfers to `finally`. The `finally` block executes `return 3;`. This immediate return overrides and replaces the pending return of `2` from the catch block.'
      },
      {
        title: 'Puzzle 4: Return in Finally Swallowing Unhandled Exception',
        problemStatement: 'What is the output of the following program?',
        code: `public class Puzzle4 {
    public static int process() {
        try {
            throw new NullPointerException("Fatal NPE");
        } finally {
            return 100;
        }
    }

    public static void main(String[] args) {
        try {
            System.out.print(process() + " ");
        } catch (Exception e) {
            System.out.print("CaughtException ");
        }
        System.out.print("Finished");
    }
}`,
        options: [
            'A) CaughtException Finished',
            'B) 100 Finished',
            'C) Fatal NPE',
            'D) Compilation Error: finally block cannot contain return'
        ],
        correctOptionIndex: 1,
        hint: 'Does the unhandled NullPointerException escape when finally executes return 100?',
        solution: 'Option B is correct: 100 Finished.',
        explanation: 'When an exception is thrown in `try` and there is no matching `catch`, the exception remains pending. However, the `finally` block executes unconditionally. When `finally` executes `return 100;`, it abruptly terminates the exception propagation, completely discarding and swallowing the `NullPointerException`. The caller receives `100` normally.'
      },
      {
        title: 'Puzzle 5: Subclass Hierarchy in Multi-Catch Clause',
        problemStatement: 'What happens when compiling the following code?',
        code: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Puzzle5 {
    public static void main(String[] args) {
        try {
            if (args.length == 0) throw new FileNotFoundException("Missing file");
        } catch (FileNotFoundException | IOException e) {
            System.out.print("Handled");
        }
    }
}`,
        options: [
            'A) Compiles cleanly and prints Handled',
            'B) Compilation Error: The exception FileNotFoundException is already caught by the alternative IOException',
            'C) Runtime ClassCastException',
            'D) Compiles cleanly with a compiler warning only'
        ],
        correctOptionIndex: 1,
        hint: 'What does the Java Language Specification say about inheritance relations between types in a multi-catch union?',
        solution: 'Option B is correct: Compilation Error.',
        explanation: 'In Java 7+ multi-catch syntax (`TypeA | TypeB e`), the alternatives cannot be related by subclassing. `FileNotFoundException` is a direct subclass of `IOException`. Declaring both in a multi-catch union is redundant and illegal; the compiler issues an error: "The exception FileNotFoundException is already caught by the alternative IOException".'
      },
      {
        title: 'Puzzle 6: Reassigning Multi-Catch Exception Parameter',
        problemStatement: 'What happens when compiling this program?',
        code: `import java.io.IOException;
import java.sql.SQLException;

public class Puzzle6 {
    public static void handle(int code) {
        try {
            if (code == 1) throw new IOException("I/O");
            else throw new SQLException("SQL");
        } catch (IOException | SQLException e) {
            // Line X:
            // e = new IOException("Wrapped");
            System.out.print(e.getMessage());
        }
    }

    public static void main(String[] args) {
        handle(1);
    }
}`,
        options: [
            'A) If Line X is uncommented, it compiles cleanly and prints Wrapped',
            'B) If Line X is uncommented, compilation fails: cannot assign a value to final variable e',
            'C) Compiles cleanly and throws UnsupportedOperationException at runtime',
            'D) In a single catch, e is also final by default'
        ],
        correctOptionIndex: 1,
        hint: 'Is the exception parameter in a multi-catch block mutable or implicitly final?',
        solution: 'Option B is correct: Compilation fails because e is implicitly final.',
        explanation: 'Under JLS §14.20, an exception parameter in a multi-catch clause is implicitly `final`. Any attempt to reassign `e` causes a compile-time error: "cannot assign a value to final variable e". In contrast, in a traditional single catch block (`catch (IOException e)`), `e` is not final unless explicitly declared `final`.'
      },
      {
        title: 'Puzzle 7: Nested Try-Catch-Finally Execution Order',
        problemStatement: 'What is the exact output printed by this program?',
        code: `public class Puzzle7 {
    public static void main(String[] args) {
        try {
            System.out.print("T1 ");
            try {
                System.out.print("T2 ");
                int z = 1 / 0;
            } catch (NullPointerException e) {
                System.out.print("C2 ");
            } finally {
                System.out.print("F2 ");
            }
            System.out.print("T1_End ");
        } catch (ArithmeticException e) {
            System.out.print("C1 ");
        } finally {
            System.out.print("F1");
        }
    }
}`,
        options: [
            'A) T1 T2 F2 C1 F1',
            'B) T1 T2 C2 F2 C1 F1',
            'C) T1 T2 F2 T1_End C1 F1',
            'D) T1 T2 C1 F2 F1'
        ],
        correctOptionIndex: 0,
        hint: 'Trace inner try, exception mismatch, inner finally, outer catch, outer finally.',
        solution: 'Option A is correct: T1 T2 F2 C1 F1.',
        explanation: '1. `T1 ` prints. 2. Inner try executes: `T2 ` prints. 3. `1 / 0` throws `ArithmeticException`. 4. Inner catch catches `NullPointerException` (mismatch, skipped). 5. Inner `finally` executes unconditionally: `F2 ` prints. 6. `T1_End ` is skipped because of the unhandled exception. 7. Outer catch matches `ArithmeticException`: `C1 ` prints. 8. Outer `finally` executes: `F1` prints. Final output: "T1 T2 F2 C1 F1".'
      },
      {
        title: 'Puzzle 8: Exception Thrown Inside Finally Block',
        problemStatement: 'What happens when an exception is thrown in try, and another exception is thrown in finally?',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        try {
            try {
                throw new IllegalArgumentException("FirstException");
            } finally {
                throw new IllegalStateException("SecondException");
            }
        } catch (Exception e) {
            System.out.print(e.getClass().getSimpleName() + ": " + e.getMessage());
        }
    }
}`,
        options: [
            'A) IllegalArgumentException: FirstException',
            'B) IllegalStateException: SecondException',
            'C) CompoundException: [FirstException, SecondException]',
            'D) Runtime error: ExceptionCollisionError'
        ],
        correctOptionIndex: 1,
        hint: 'Which exception takes precedence when a finally block throws an exception while another exception is propagating?',
        solution: 'Option B is correct: IllegalStateException: SecondException.',
        explanation: 'When an exception is thrown in a `try` block, and the corresponding `finally` block also throws an exception, the exception from the `finally` block completely supersedes, discards, and suppresses the original exception from the `try` block. The outer catch intercepts `IllegalStateException: SecondException`.'
      },
      {
        title: 'Puzzle 9: System.exit(0) Called in Try Block',
        problemStatement: 'What is the output of the following program?',
        code: `public class Puzzle9 {
    public static void main(String[] args) {
        try {
            System.out.print("Start ");
            System.exit(0);
            System.out.print("Unreachable ");
        } finally {
            System.out.print("FinallyRan ");
        }
        System.out.print("End");
    }
}`,
        options: [
            'A) Start FinallyRan End',
            'B) Start FinallyRan ',
            'C) Start ',
            'D) Start Unreachable FinallyRan '
        ],
        correctOptionIndex: 2,
        hint: 'Does a finally block execute when System.exit() halts the JVM?',
        solution: 'Option C is correct: Start .',
        explanation: '`System.exit(0)` immediately shuts down the Java Virtual Machine. When the JVM halts, it immediately terminates thread execution; the `finally` block is NOT executed.'
      },
      {
        title: 'Puzzle 10: Multi-Value Mutation and Return Tracing',
        problemStatement: 'What is the exact output of running this class?',
        code: `public class Puzzle10 {
    static int counter = 0;

    public static int trace() {
        try {
            counter += 10;
            return counter++;
        } finally {
            counter += 5;
            return ++counter;
        }
    }

    public static void main(String[] args) {
        int result = trace();
        System.out.print("Result=" + result + " Counter=" + counter);
    }
}`,
        options: [
            'A) Result=10 Counter=16',
            'B) Result=17 Counter=17',
            'C) Result=10 Counter=15',
            'D) Result=16 Counter=16'
        ],
        correctOptionIndex: 1,
        hint: 'Trace the value of counter and note that the return in finally overrides the return in try.',
        solution: 'Option B is correct: Result=17 Counter=17.',
        explanation: '1. `counter` starts at 0. 2. In try: `counter += 10` -> `counter` is 10. 3. `return counter++;` evaluates `10` to return, and post-increments `counter` to 11. 4. Control transfers to `finally`. 5. `counter += 5` -> `counter` becomes 16. 6. `return ++counter;` pre-increments `counter` to 17 and returns 17! 7. This return overrides the pending return of 10. `result` is 17 and `counter` is 17.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can a finally block ever fail to execute in Java? Detail all scenarios where finally does not run.',
        answer: 'Yes, despite the common textbook mantra that "finally always executes", there are several well-defined scenarios in Java where a `finally` block will NOT execute: 1) Explicit JVM Termination: Invoking `System.exit(int status)` or `Runtime.getRuntime().halt(int status)` halts the JVM immediately, bypassing all remaining finally blocks; 2) Fatal JVM / Hardware Crash: A segmentation fault in native JNI code, JVM core dump, sudden operating system SIGKILL (`kill -9`), or physical power failure terminates the process instantly; 3) Daemon Threads during JVM Exit: If a `finally` block is executing inside a daemon thread (`thread.setDaemon(true)`), and all user (non-daemon) threads terminate, the JVM shuts down immediately without waiting for daemon thread finally blocks to finish; 4) Infinite Loop or Thread Block: If the code inside `try` or `catch` enters an infinite loop (`while (true)`) or deadlocks permanently waiting on a lock or network socket, control never exits the try/catch, so `finally` never executes.',
        followUp: 'What is the difference between System.exit() and Runtime.getRuntime().halt()?',
        followUpAnswer: 'System.exit() initiates a graceful JVM shutdown sequence: it runs registered shutdown hooks (Runtime.addShutdownHook) and finalizers (if enabled) before termination. Runtime.halt() violently terminates the JVM immediately without running shutdown hooks or finalizers.',
        keyPhrases: [
          'System.exit() and Runtime.halt()',
          'Daemon thread abandonment upon JVM shutdown',
          'Fatal JVM crash or SIGKILL',
          'Infinite loops or deadlocks in try block',
          'Shutdown hooks execution vs halt'
        ],
        commonMistakeAnswer: 'Claiming that finally executes under 100% of all circumstances with zero exceptions.'
      },
      {
        question: 'What happens if both the try block and the finally block have a return statement? What happens at the bytecode level?',
        answer: 'If both the `try` block and the `finally` block contain a `return` statement, the `return` statement in the `finally` block unconditionally supersedes, overwrites, and discards the `return` statement in the `try` block. At the bytecode level, when the `try` block executes `return`, the JVM inlines the instructions of the `finally` block immediately before the exit. If the `finally` block contains its own `ireturn` or `areturn` bytecode instruction, the operand stack value prepared by the `try` block is discarded, and the new value from `finally` is pushed and returned to the caller. Furthermore, if an unhandled exception was in flight from `try` or `catch`, the `finally` block `return` statement silently swallows and extinguishes that exception completely.',
        followUp: 'Why is returning from a finally block considered a severe code defect in production static analysis?',
        followUpAnswer: 'Because it silently suppresses unhandled exceptions! If try throws a NullPointerException or OutOfMemoryError, a return in finally erases the exception without any stack trace or log, resulting in silent data corruption that is almost impossible to debug.',
        keyPhrases: [
          'Finally return overrides try return',
          'Bytecode inlining of finally',
          'Operand stack overwrite',
          'Silent exception suppression',
          'SonarQube critical blocker rule'
        ],
        commonMistakeAnswer: 'Thinking the compiler will throw an error if both try and finally have return statements.'
      },
      {
        question: 'If a try block throws exception E1, and its finally block throws exception E2, what happens to E1? Which exception does the caller receive?',
        answer: 'The caller receives ONLY exception `E2` (the exception thrown by the `finally` block). Exception `E1` (the original exception thrown in the `try` block) is completely lost, masked, and forgotten by standard try-finally mechanics. The JVM call stack records only `E2`, and `E1` does not appear anywhere in the stack trace. This was a notorious design flaw in Java prior to Java 7, especially when closing resources in `finally`: a secondary exception in `close()` would overwrite the primary business exception thrown in `try`. Java 7 resolved this for resource management by introducing `try-with-resources` and Suppressed Exceptions (`Throwable.addSuppressed()` and `Throwable.getSuppressed()`).',
        followUp: 'How can you manually capture both exceptions if you are writing raw try-finally blocks without try-with-resources?',
        followUpAnswer: 'You catch E1 into a local variable Throwable primaryException = null, and inside finally you catch E2 and invoke primaryException.addSuppressed(e2) before rethrowing primaryException.',
        keyPhrases: [
          'Finally exception masks and destroys try exception',
          'Caller receives only E2',
          'Primary business exception lost',
          'Try-with-resources and Throwable.addSuppressed() solution'
        ],
        commonMistakeAnswer: 'Believing the JVM combines both exceptions into a chained Cause exception automatically.'
      },
      {
        question: 'Explain the rules of Java 7 Multi-Catch. Why are subclasses in the same union forbidden, and why is the exception parameter final?',
        answer: 'Java 7 introduced multi-catch syntax (`catch (IOException | SQLException e)`) to eliminate duplicated catch blocks. The compiler enforces two strict rules: 1) Disjoint Types: The exception types listed in the alternative union cannot have a subclass-superclass relationship with each other. If you write `catch (FileNotFoundException | IOException e)`, the compiler rejects it with an error because `FileNotFoundException` is already a subtype of `IOException`, making its inclusion redundant and semantically ambiguous. 2) Implicitly Final Parameter: The exception parameter `e` is implicitly `final`. You cannot reassign `e` inside the catch block (`e = new IOException();` causes a compilation error). This finality is required because the static type of `e` is the least upper bound (the closest common ancestor) of the alternatives, and allowing reassignment could break type safety.',
        followUp: 'What is the compile-time type of the variable e in catch (IOException | SQLException e)?',
        followUpAnswer: 'Its compile-time type is the least upper bound (LUB) of the union, which is java.lang.Exception. You can only call methods on e that are defined on Exception or Throwable.',
        keyPhrases: [
          'Disjoint types requirement',
          'Subclass-superclass alternatives rejected by compiler',
          'Implicitly final parameter',
          'Least Upper Bound (LUB) static type',
          'Type safety preservation'
        ],
        commonMistakeAnswer: 'Believing multi-catch allows catching any two arbitrary exceptions regardless of inheritance.'
      },
      {
        question: 'What is the exact behavioral difference between returning a primitive vs a reference type from a try block when modified in finally?',
        answer: 'In Java, all arguments and return values are passed by value. When a `return` statement executes inside a `try` block: 1) For primitive types (e.g. `int`, `double`): The variable value is copied immediately to an execution return slot on the JVM stack. When `finally` executes, any reassignment to that local variable (`x = 99`) modifies only the local variable table, leaving the return slot untouched. The caller receives the original primitive value. 2) For reference types (e.g. `StringBuilder`, `List`, `CustomObject`): The return slot stores a copy of the reference pointing to the heap object. If `finally` reassigns the local variable (`list = new ArrayList()`), the caller still receives the original object. However, if `finally` mutates the internal state of the referenced object (`list.add("item")`), the caller observes the mutations because the caller and the finally block are operating on the exact same object in the JVM heap.',
        followUp: 'What if you return an immutable object like String or Integer in try and reassign it in finally?',
        followUpAnswer: 'Because String and Integer are immutable, any modification in finally produces a new object and reassigns the local reference; the caller receives the original object reference stored in the return buffer.',
        keyPhrases: [
          'Pass-by-value semantics',
          'Operand stack return slot buffering',
          'Local variable table vs return buffer',
          'Heap object mutation vs reference reassignment',
          'Immutable types behavior'
        ],
        commonMistakeAnswer: 'Stating that finally modifications never affect any return values under any circumstances.'
      },
      {
        question: 'How does modern Java implement finally at the bytecode level without using jsr and ret instructions?',
        answer: 'In JVM bytecode prior to Java 6, `finally` blocks were compiled as internal subroutines using the `jsr` (jump subroutine) and `ret` (return from subroutine) instructions. However, `jsr`/`ret` made bytecode verification complex, slow, and susceptible to security vulnerabilities. Java 6 introduced StackMapTable type checking, and `jsr`/`ret` was formally banned for class files with version 51.0+ (Java 7+). Modern `javac` compilers implement `finally` by code duplication (inlining): the compiler physically duplicates the entire sequence of `finally` bytecode instructions before every normal exit path (`return`, `break`, `continue`). Additionally, the compiler generates a synthetic `catch-all` handler in the method exception table covering the entire `try` and `catch` byte ranges, which executes the `finally` code and issues an `athrow` instruction if an unhandled exception occurs.',
        followUp: 'Does inlining finally increase class file bytecode size?',
        followUpAnswer: 'Yes. If a method has multiple return statements and a large finally block, the bytecode of the finally block is duplicated for each return statement, expanding the method bytecode size and potentially impacting JIT inlining thresholds.',
        keyPhrases: [
          'Deprecation of jsr and ret instructions',
          'Java 6 StackMapTable verification',
          'Bytecode inlining / code duplication',
          'Synthetic catch-all handler (any)',
          'JIT inlining threshold impact'
        ],
        commonMistakeAnswer: 'Thinking modern Java still uses the jsr instruction for finally blocks.'
      },
      {
        question: 'How do catch block ordering rules prevent dead code in Java exception handling?',
        answer: 'Java exception handling matches catch blocks sequentially from top to bottom. The first catch block whose declared type is assignment-compatible with the thrown exception object (`thrownException instanceof CatchType`) is selected to execute. If a superclass catch block (`catch (Exception e)`) were placed above a subclass catch block (`catch (IOException e)`), any `IOException` would immediately match the `Exception` block. Consequently, the `catch (IOException e)` block could never be reached under any execution scenario. The Java compiler enforces JLS §14.20, which explicitly forbids unreachable catch clauses, treating inverted catch blocks as a compile-time error: "exception has already been caught".',
        followUp: 'Can you have two catch blocks for the exact same exception type?',
        followUpAnswer: 'No, having two catch blocks for the exact same exception type produces an identical compilation error: exception has already been caught.',
        keyPhrases: [
          'Sequential top-to-bottom evaluation',
          'Assignment compatibility (instanceof)',
          'Unreachable catch detection by javac',
          'Subclass must precede superclass'
        ],
        commonMistakeAnswer: 'Believing the JVM finds the "most specific" catch block regardless of where it appears in the code.'
      },
      {
        question: 'What happens if a thread is executing a finally block and Thread.interrupt() or Thread.stop() is called?',
        answer: 'If `Thread.interrupt()` is called while a thread is executing non-blocking code in a `finally` block, the thread interrupt flag is set to `true`, but execution of the `finally` block continues uninterrupted. If the `finally` block invokes a blocking operation (such as `Thread.sleep()` or `lock.lockInterruptibly()`), an `InterruptedException` will be thrown inside the `finally` block. On the other hand, if the deprecated `Thread.stop()` method is invoked, the JVM throws an asynchronous `ThreadDeath` error into the thread. In Java, `finally` blocks WILL execute even when `ThreadDeath` is thrown, unless `ThreadDeath` is thrown again during the finally execution itself. This is why `Thread.stop()` was deprecated: it leaves shared data in an inconsistent state.',
        followUp: 'Should you perform blocking I/O inside a finally block?',
        followUpAnswer: 'No. Blocking I/O or waiting for locks in a finally block can lead to deadlocks or thread starvation, delaying cleanup indefinitely. Cleanup should be non-blocking and fail-safe.',
        keyPhrases: [
          'Thread.interrupt() sets flag without halting execution',
          'InterruptedException on blocking calls',
          'ThreadDeath asynchronous error',
          'Deprecation of Thread.stop()',
          'Non-blocking cleanup best practice'
        ],
        commonMistakeAnswer: 'Assuming Thread.interrupt() immediately terminates the thread inside the finally block.'
      },
      {
        question: 'How does exception handling affect JVM JIT compilation, method inlining, and execution performance?',
        answer: 'In the HotSpot JVM, the presence of a `try-catch` block does NOT incur runtime performance overhead during normal execution path (the "happy path"). The JVM uses metadata exception tables rather than runtime flag checks; if no exception is thrown, zero overhead is incurred. However, exceptions impact performance in three distinct ways: 1) JIT Method Inlining: Large methods with extensive try-catch-finally blocks exceed HotSpot inlining bytecode thresholds (default 325 bytes for `MaxInlineSize` / `FreqInlineSize`), preventing the JIT compiler from inlining the method; 2) Deoptimization: When an exception is thrown, the JIT compiler deoptimizes compiled code if the exception path was marked uncommon, dropping back to the interpreter; 3) Stack Unrolling & Allocation: Instantiating exceptions requires `fillInStackTrace()`, which halts execution to inspect OS stack frames.',
        followUp: 'What is the "Zero-Cost Exception" model in modern JVMs?',
        followUpAnswer: 'It means that in the absence of exceptions, entering and exiting a try block executes the exact same sequential bytecode instructions as code without a try block; all dispatch routing is stored offline in the class file Code attribute exception_table.',
        keyPhrases: [
          'Zero-cost exception model on happy path',
          'Exception tables in bytecode',
          'HotSpot inlining thresholds (MaxInlineSize)',
          'JIT deoptimization on uncommon branches',
          'fillInStackTrace() native latency'
        ],
        commonMistakeAnswer: 'Claiming that just writing a try block slows down execution by 50% even if no exception occurs.'
      },
      {
        question: 'Trace the propagation and resolution of an unhandled exception through nested try-catch-finally blocks.',
        answer: 'When an exception is thrown inside an inner `try` block: 1) The JVM checks the inner `catch` blocks in order. If a matching catch is found, it executes; 2) The inner `finally` block executes unconditionally. If the inner `catch` handled the exception without rethrowing, execution proceeds normally after the inner try-catch-finally; 3) If the inner `catch` did not match or if it re-threw an exception (or if the inner `finally` threw an exception), the exception becomes active again; 4) Execution in the outer `try` block is aborted immediately; 5) The JVM checks the outer `catch` blocks for a match. If found, the outer `catch` executes; 6) Finally, the outer `finally` block executes unconditionally; 7) If the outer `catch` also did not match, the exception continues propagating up the call stack to the calling method frame.',
        followUp: 'What happens if code after an inner try-finally throws an exception in the outer try block?',
        followUpAnswer: 'The inner finally has already executed. The outer catch block intercepts the exception, followed by the execution of the outer finally block.',
        keyPhrases: [
          'Inner catch matching attempt',
          'Inner finally executes unconditionally before outer catch',
          'Outer try aborted on unhandled exception',
          'Outer catch intercepts propagated exception',
          'Outer finally executes last'
        ],
        commonMistakeAnswer: 'Believing outer catch executes before inner finally.'
      }
    ],
    miniQuiz: [
      {
        question: 'In which of the following scenarios will a finally block NOT execute?',
        options: [
          'The try block executes a return statement',
          'An unhandled RuntimeException is thrown in the try block',
          'System.exit(0) is invoked inside the try block',
          'The catch block throws a new exception'
        ],
        correctIndex: 2,
        explanation: '`System.exit()` terminates the JVM process immediately, bypassing any remaining `finally` blocks.'
      },
      {
        question: 'Why does the compiler forbid placing `catch (Exception e)` before `catch (IOException e)`?',
        options: [
          'Because IOException is an unchecked exception',
          'Because the IOException block becomes unreachable code and can never execute',
          'Because Java requires alphabetical ordering of catch blocks',
          'Because Exception cannot be caught'
        ],
        correctIndex: 1,
        explanation: 'Catch blocks are evaluated sequentially. Because `IOException` is a subclass of `Exception`, any `IOException` would match the first block, making the second block unreachable dead code.'
      },
      {
        question: 'Which of the following is ILLEGAL syntax in Java 7+ multi-catch?',
        options: [
          'catch (IOException | SQLException e)',
          'catch (ArithmeticException | NullPointerException e)',
          'catch (FileNotFoundException | IOException e)',
          'catch (IllegalArgumentException | IllegalStateException e)'
        ],
        correctIndex: 2,
        explanation: 'Multi-catch types must be disjoint. Because `FileNotFoundException` is a subclass of `IOException`, combining them causes a compilation error.'
      },
      {
        question: 'What is TRUE regarding the exception parameter e in `catch (IOException | SQLException e)`?',
        options: [
          'It can be reassigned to a new IOException',
          'It is implicitly final and cannot be reassigned',
          'It must be explicitly declared final to compile',
          'It has the type java.lang.Object'
        ],
        correctIndex: 1,
        explanation: 'In Java multi-catch blocks, the exception parameter is implicitly `final`; attempting to reassign it causes a compilation error.'
      },
      {
        question: 'What is the result of returning a value from inside a finally block?',
        options: [
          'Compilation error',
          'It executes after the calling method finishes',
          'It overwrites any prior return value and silently suppresses any unhandled exception from try or catch',
          'It triggers a RuntimeException'
        ],
        correctIndex: 2,
        explanation: 'A `return` statement in a `finally` block discards any prior return value and completely swallows any pending exception from `try` or `catch`.'
      },
      {
        question: 'Consider: try { int x = 5; return x; } finally { x = 20; }. What is returned?',
        options: [
          '5',
          '20',
          '0',
          'Compilation error'
        ],
        correctIndex: 0,
        explanation: 'For primitive types, the return value `5` is evaluated and buffered on the stack before `finally` runs. Reassigning local variable `x` in `finally` does not alter the return buffer.'
      },
      {
        question: 'Consider: try { sb.append("A"); return sb; } finally { sb.append("B"); }. What does the caller receive?',
        options: [
          'A StringBuilder containing "A"',
          'A StringBuilder containing "AB"',
          'A StringBuilder containing "B"',
          'Null'
        ],
        correctIndex: 1,
        explanation: 'The return buffer holds the reference to the heap `StringBuilder`. Mutating the heap object in `finally` alters the object observed by the caller.'
      },
      {
        question: 'If exception E1 is thrown in try, and exception E2 is thrown in finally, which exception does the caller receive?',
        options: [
          'E1 only',
          'E2 only',
          'Both combined in a MultiException',
          'E1 with E2 as cause'
        ],
        correctIndex: 1,
        explanation: 'Without try-with-resources, an exception thrown in `finally` masks, suppresses, and discards the original exception from `try`; only `E2` propagates.'
      },
      {
        question: 'What happens when an exception is thrown in an inner try block and caught by an outer catch block?',
        options: [
          'The inner finally block executes before the outer catch block',
          'The outer catch block executes before the inner finally block',
          'The inner finally block is skipped',
          'Both finally blocks execute simultaneously'
        ],
        correctIndex: 0,
        explanation: 'Before control can escape the inner scope to reach the outer `catch`, the inner `finally` block is guaranteed to execute first.'
      },
      {
        question: 'Why did Java remove the jsr and ret instructions in Java 6/7 for finally implementation?',
        options: [
          'To simplify bytecode verification and StackMapTable type checking',
          'Because jumps were too fast for CPU branch predictors',
          'To support 64-bit operating systems',
          'Because finally blocks were deprecated'
        ],
        correctIndex: 0,
        explanation: 'The `jsr`/`ret` instructions complicated bytecode verification and were replaced by bytecode inlining to support the robust type checking mandated by Java 6 StackMapTable.'
      }
    ]
  }
};
