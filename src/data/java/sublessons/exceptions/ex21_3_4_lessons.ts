import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 21: EXCEPTION HANDLING (LESSONS 21.3 & 21.4)
// Authoritative FAANG-Standard Exception Handling Curriculum
// ============================================================

export const ex21_3_4_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 21.3: try-with-resources, AutoCloseable & Suppressed Exceptions
  // ─────────────────────────────────────────────────────────────
  'try-with-resources-autocloseable': {
    id: 'try-with-resources-autocloseable',
    moduleId: 'java-exceptions',
    moduleTitle: '21. Exception Handling',
    lessonNumber: 'Lesson 21.3',
    title: 'try-with-resources, AutoCloseable & Suppressed Exceptions',
    subtitle: 'Resource leak hazards in pre-Java 7 finally blocks, java.lang.AutoCloseable vs java.io.Closeable, reverse closure ordering, effectively final resources in Java 9+, and Throwable.getSuppressed() mechanics',
    estimatedMinutes: 28,
    beginnerAnalogy: 'A specialized cleanroom airlock lab or surgery suite. In the old days (pre-Java 7), surgeons put on gloves, masks, and opened sterile scalpel boxes manually, and when an emergency happened, they had to remember in finally blocks to dispose of each in nested try-catches. If disposing of the mask threw an error, the scalpel box remained wide open on the floor forever (resource leak)! With try-with-resources, you step into an automated smart airlock: any tool checked out at the door (implementing AutoCloseable) is automatically sterilized and locked away upon exit in exact reverse order of checkout. And if an alarm sounds during the operation, any secondary error while locking the door is recorded as a "suppressed note" pinned to the primary incident report rather than obliterating the primary error!',
    interviewTakeaways: [
      'Automatic Deterministic Resource Management: try-with-resources (introduced in Java 7) guarantees that every resource implementing java.lang.AutoCloseable is closed when the try block exits, whether normally or abruptly via an unhandled exception.',
      'Reverse Closure Order (LIFO): Multiple resources declared in the try-with-resources header are closed in exact reverse order of their declaration, ensuring dependent wrappers (e.g., BufferedReader) are closed before underlying streams (e.g., FileReader).',
      'Lifecycle Execution Timing: Resources are closed BEFORE any explicit catch or finally blocks attached to the try-with-resources statement execute. If a catch block inspects system state, the resources are already closed.',
      'Exception Suppression: If an exception is thrown inside the try block AND one or more exceptions are thrown while closing resources, the try block exception becomes the primary exception. All closing exceptions are attached to it as suppressed exceptions, accessible via Throwable.getSuppressed().',
      'AutoCloseable vs Closeable: java.lang.AutoCloseable (Java 7) declares void close() throws Exception. java.io.Closeable (Java 5) extends AutoCloseable and declares void close() throws IOException. Closeable specifies idempotency (calling close() multiple times has no effect), whereas AutoCloseable strongly recommends but does not strictly require idempotency.',
      'Java 9 Effectively Final Resources: Since Java 9, resources do not need to be declared inside the try parentheses; existing final or effectively final variables can be referenced directly in the try-with-resources specification.',
      'Null Safety in Resource Cleanup: If a resource variable evaluates to null at runtime, the try-with-resources mechanism skips calling close() on it, preventing NullPointerException during cleanup.'
    ],
    cheatSheet: {
      summary: 'try-with-resources provides compile-time enforced deterministic cleanup for AutoCloseable resources. Closes in reverse order (LIFO), attaches secondary cleanup failures via getSuppressed(), and executes close() before catch/finally.',
      syntaxTemplate: `// Java 7/8 syntax (declared in header)
try (BufferedReader br = new BufferedReader(new FileReader("data.txt"));
     Connection conn = dataSource.getConnection()) {
    br.readLine();
} catch (IOException | SQLException e) {
    for (Throwable t : e.getSuppressed()) {
        System.err.println("Suppressed: " + t.getMessage());
    }
} finally {
    // Resources are ALREADY closed before this executes!
}

// Java 9+ syntax (referencing effectively final variables)
final Scanner scanner = new Scanner(System.in);
try (scanner) {
    // scanner automatically closed on exit
}`,
      rules: [
        { rule: 'AutoCloseable Contract', explanation: 'Any class managed by try-with-resources must implement java.lang.AutoCloseable (or java.io.Closeable).' },
        { rule: 'LIFO Closure Order', explanation: 'Resources declared in try (R1 r1 = ...; R2 r2 = ...) are closed in reverse order: r2.close() runs before r1.close().' },
        { rule: 'Close Runs Before Catch', explanation: 'Resources are closed before the matching catch or finally block is entered.' },
        { rule: 'Primary vs Suppressed', explanation: 'The exception from the try block is primary. Exceptions from close() calls are added to it via e.addSuppressed().' },
        { rule: 'Null Resource Safety', explanation: 'If a resource expression evaluates to null, close() is not invoked and no NullPointerException is thrown.' },
        { rule: 'Effectively Final (Java 9+)', explanation: 'Variables declared outside try-with-resources must be final or effectively final to be referenced in the try header.' }
      ],
      quickComparison: [
        { aspect: 'Base Interface', optionA: 'java.lang.AutoCloseable (Java 7+)', optionB: 'java.io.Closeable (Java 5+)' },
        { aspect: 'Method Signature', optionA: 'void close() throws Exception', optionB: 'void close() throws IOException' },
        { aspect: 'Idempotency Requirement', optionA: 'Recommended, but not strictly mandated', optionB: 'Mandated by specification' },
        { aspect: 'Inheritance', optionA: 'Root interface in java.lang', optionB: 'Sub-interface: Closeable extends AutoCloseable' },
        { aspect: 'Exception Masking', optionA: 'Pre-Java 7: finally close() masked try exception', optionB: 'Java 7+: Preserved via getSuppressed()' }
      ]
    },
    coreExplanation: [
      'Pre-Java 7 Resource Leak Hazard: Prior to Java 7, robust resource cleanup required deeply nested try-finally blocks. If code opened a Connection, Statement, and ResultSet, closing all three in a single finally block was perilous: if rs.close() threw a SQLException, stmt.close() and conn.close() were skipped, leaking database connections. Furthermore, if the try block threw an exception and the finally block threw another exception during close(), the finally exception completely obliterated and masked the original application failure.',
      'The java.lang.AutoCloseable Interface: Java 7 introduced java.lang.AutoCloseable as the foundational contract for try-with-resources. It contains a single method: `void close() throws Exception`. The existing `java.io.Closeable` was retrofitted to extend AutoCloseable, narrowing its throws clause to `IOException` and mandating idempotency (multiple close calls must be harmless no-ops). AutoCloseable allows throwing `Exception` so non-I/O resources (database connections, thread pools, locks, graphics contexts) can participate without wrapping their exceptions in IOException.',
      'Reverse Closure Order (LIFO): When multiple resources are specified in a try-with-resources header separated by semicolons, Java acquires them left-to-right but closes them in reverse order (right-to-left). This mirror-symmetry is critical: outer decorators or wrappers (like BufferedWriter or ObjectOutputStream) frequently flush buffered state into underlying raw streams (like FileOutputStream) during close(). Closing in reverse ensures the underlying sink remains open and ready when the wrapper flushes.',
      'Execution Order with Catch and Finally: A frequent interview trap is assuming catch or finally executes before resource closure. In try-with-resources, the compiler synthesizes hidden finally blocks around the body. Consequently, resources are closed IMMEDIATELY when the try block finishes. If an exception occurs, resources close first, and THEN matching catch blocks are evaluated, followed by the explicit finally block. Any state inspected in catch or finally reflects already-closed resources.',
      'Suppressed Exceptions Mechanism: When an exception E1 occurs in the try block, the runtime still executes close() on all active resources. If a resource`s close() method also throws an exception E2, discarding E2 would lose debugging context, but throwing E2 would mask the root cause E1. Java solves this via exception suppression: E1 is thrown, and the runtime invokes `E1.addSuppressed(E2)`. Catch blocks receive E1, and calling `e.getSuppressed()` returns an array containing `[E2]`. If the try block completes normally and multiple resources throw on close, the first close exception is primary and subsequent close exceptions are suppressed.',
      'Java 9 Enhancement for Existing Variables: In Java 7 and 8, every resource managed by try-with-resources had to be newly declared inside the parentheses: `try (BufferedReader br = reader)`. Java 9 relaxed this requirement: any existing variable that is effectively final (or declared `final`) can be listed directly by identifier: `try (reader; writer)`.',
      'Null References in Resource Specification: If an expression in the resource specification evaluates to null (e.g., `try (InputStream in = openStream())` where `openStream()` returns null), Java internally inserts a null check before calling `close()`. No `NullPointerException` is thrown during cleanup.'
    ],
    diagram: `TRY-WITH-RESOURCES: EXECUTION TIMELINE & EXCEPTION SUPPRESSION
================================================================================

1. RESOURCE INITIALIZATION (Left to Right / FIFO)
   ┌────────────────────────────────────────────────────────┐
   │ try ( ResourceA resA = new ResourceA();                │ ──> Step 1: Acquire resA
   │       ResourceB resB = new ResourceB() )               │ ──> Step 2: Acquire resB
   └────────────────────────────────────────────────────────┘

2. TRY BLOCK EXECUTION
   ┌────────────────────────────────────────────────────────┐
   │   resB.doWork(); // <── Throws PrimaryException (E1)   │
   └────────────────────────────────────────────────────────┘
                               │
                               ▼
3. AUTOMATIC REVERSE CLOSURE (Right to Left / LIFO)
   ┌────────────────────────────────────────────────────────┐
   │   resB.close() invoked first                           │
   │   └─> Throws CleanupExceptionB (E2)                    │
   │       └─> E1.addSuppressed(E2);  [ATTACHED TO PRIMARY] │
   │                                                        │
   │   resA.close() invoked second                          │
   │   └─> Throws CleanupExceptionA (E3)                    │
   │       └─> E1.addSuppressed(E3);  [ATTACHED TO PRIMARY] │
   └────────────────────────────────────────────────────────┘
                               │
                               ▼
4. EXPLICIT CATCH & FINALLY EXECUTION (Runs AFTER all closes!)
   ┌────────────────────────────────────────────────────────┐
   │ catch (PrimaryException e) {                           │
   │     // e is E1!                                        │
   │     // e.getSuppressed() returns [ E2, E3 ]            │
   │ } finally {                                            │
   │     // All resources (resA, resB) are ALREADY closed!  │
   │ }                                                      │
   └────────────────────────────────────────────────────────┘`,
    codeSnippet: {
      title: 'try-with-resources Lifecycle, Reverse Closure, and Suppressed Exceptions',
      code: `class CustomDoor implements AutoCloseable {
    private final String name;
    private final boolean throwOnClose;

    public CustomDoor(String name, boolean throwOnClose) {
        this.name = name;
        this.throwOnClose = throwOnClose;
        System.out.println("Opened: " + name);
    }

    public void passThrough() {
        System.out.println("Passing through: " + name);
        throw new IllegalStateException("Intruder alert in " + name);
    }

    @Override
    public void close() throws Exception {
        System.out.println("Closing: " + name);
        if (throwOnClose) {
            throw new RuntimeException("Jam error while closing " + name);
        }
    }
}

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        try (CustomDoor outerDoor = new CustomDoor("OuterAirLock", true);
             CustomDoor innerDoor = new CustomDoor("InnerSanctum", true)) {

            innerDoor.passThrough();

        } catch (Exception e) {
            System.out.println("Caught Primary Exception: " + e.getMessage());
            Throwable[] suppressed = e.getSuppressed();
            System.out.println("Suppressed count: " + suppressed.length);
            for (int i = 0; i < suppressed.length; i++) {
                System.out.println("  Suppressed #" + (i + 1) + ": " + suppressed[i].getMessage());
            }
        } finally {
            System.out.println("Finally block executed.");
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'CustomDoor outerDoor = new CustomDoor("OuterAirLock", true);', explanation: 'Outer airlock is opened first (FIFO acquisition order).' },
        { line: 'CustomDoor innerDoor = new CustomDoor("InnerSanctum", true);', explanation: 'Inner sanctum is opened second.' },
        { line: 'innerDoor.passThrough();', explanation: 'Throws IllegalStateException("Intruder alert in InnerSanctum"). This becomes the primary exception E1.' },
        { line: 'innerDoor.close(); [automatic]', explanation: 'LIFO reverse order: innerDoor is closed first. It throws RuntimeException("Jam error while closing InnerSanctum") (E2).' },
        { line: 'E1.addSuppressed(E2); [automatic]', explanation: 'Java attaches E2 to primary exception E1 as a suppressed exception.' },
        { line: 'outerDoor.close(); [automatic]', explanation: 'LIFO reverse order: outerDoor is closed second. It throws RuntimeException("Jam error while closing OuterAirLock") (E3).' },
        { line: 'E1.addSuppressed(E3); [automatic]', explanation: 'Java attaches E3 to primary exception E1 as another suppressed exception.' },
        { line: 'catch (Exception e)', explanation: 'Catches primary exception E1 AFTER both doors have closed. e.getSuppressed() contains both jam errors.' },
        { line: 'finally { ... }', explanation: 'Runs last, confirming that all resources were already closed prior to catch and finally blocks.' }
      ],
      output: `Opened: OuterAirLock
Opened: InnerSanctum
Passing through: InnerSanctum
Closing: InnerSanctum
Closing: OuterAirLock
Caught Primary Exception: Intruder alert in InnerSanctum
Suppressed count: 2
  Suppressed #1: Jam error while closing InnerSanctum
  Suppressed #2: Jam error while closing OuterAirLock
Finally block executed.`
    },
    codeExamples: [
      {
        title: 'Java 9 Effectively Final Resources in try-with-resources',
        description: 'Demonstrating how existing final or effectively final variables can be directly managed in try-with-resources.',
        code: `import java.io.StringReader;
import java.io.BufferedReader;
import java.io.IOException;

public class Java9TryWithResources {
    public static void process(BufferedReader reader) throws IOException {
        // In Java 9+, an effectively final parameter or local variable
        // can be passed directly inside try (...) without re-declaration:
        try (reader) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Line: " + line);
            }
        }
        // At this point, reader is closed! Calling readLine() will fail.
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new StringReader("FAANG\\nDistributed\\nSystems"));
        process(br);
        System.out.println("Processing complete and stream closed.");
    }
}`,
        output: `Line: FAANG
Line: Distributed
Line: Systems
Processing complete and stream closed.`
      },
      {
        title: 'Safe Resource Closing Without Try Body Exception',
        description: 'Tracing primary exception selection when the try block succeeds but close() throws.',
        code: `class Worker implements AutoCloseable {
    private final String id;

    public Worker(String id) { this.id = id; }

    @Override
    public void close() throws Exception {
        System.out.println("Closing " + id);
        throw new Exception("Error closing " + id);
    }
}

public class CloseThrowsDemo {
    public static void main(String[] args) {
        try (Worker w1 = new Worker("Worker-1");
             Worker w2 = new Worker("Worker-2")) {
            System.out.println("Try block executed successfully.");
        } catch (Exception e) {
            System.out.println("Primary: " + e.getMessage());
            for (Throwable s : e.getSuppressed()) {
                System.out.println("Suppressed: " + s.getMessage());
            }
        }
    }
}`,
        output: `Try block executed successfully.
Closing Worker-2
Closing Worker-1
Primary: Error closing Worker-2
Suppressed: Error closing Worker-1`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming catch or finally executes before try-with-resources closes the resources',
        whyItHappens: 'Developers assume catch and finally wrap around the entire statement, expecting open resources inside catch.',
        howToFix: 'Remember: resources are closed immediately when leaving the try block, BEFORE any catch or finally block executes. If you need resource operations in catch, handle them before the block exits.'
      },
      {
        mistake: 'Manually calling resource.close() inside the try block',
        whyItHappens: 'Habit from pre-Java 7 programming leads developers to redundantly invoke close() at the end of the try block.',
        howToFix: 'Never call close() manually inside try-with-resources. The runtime automatically calls close(). If close() is not idempotent, manual invocation causes bugs.'
      },
      {
        mistake: 'Reassigning a variable declared outside try-with-resources that is used inside try(var)',
        whyItHappens: 'In Java 9+, passing an outside variable into try(var) requires that variable to be effectively final. Reassigning it breaks the effectively final contract.',
        howToFix: 'Keep the referenced resource variable effectively final (or declare it explicitly as final).'
      },
      {
        mistake: 'Assuming AutoCloseable.close() must be idempotent',
        whyItHappens: 'Because java.io.Closeable requires idempotency, developers assume AutoCloseable does as well.',
        howToFix: 'The AutoCloseable contract only recommends idempotency. Defensive code should ensure custom AutoCloseable implementations are idempotent using atomic flags or null checks.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Reverse Closure Order Tracing',
        problemStatement: 'What does this program print?',
        code: `class Res implements AutoCloseable {
    private final String name;
    public Res(String name) { this.name = name; }
    public void close() { System.out.print(name + " "); }
}

public class Puzzle1 {
    public static void main(String[] args) {
        try (Res r1 = new Res("A");
             Res r2 = new Res("B");
             Res r3 = new Res("C")) {
            System.out.print("RUN ");
        }
    }
}`,
        options: [
            'A) RUN A B C',
            'B) RUN C B A',
            'C) C B A RUN',
            'D) A B C RUN'
        ],
        correctOptionIndex: 1,
        hint: 'try-with-resources closes resources in LIFO (Last-In, First-Out) reverse order of declaration.',
        solution: 'Option B is correct: RUN C B A',
        explanation: 'The try block body executes first, printing "RUN ". When the try block completes, resources are closed in reverse order of declaration: r3 ("C "), then r2 ("B "), then r1 ("A "). The output is "RUN C B A ".'
      },
      {
        title: 'Puzzle 2: Catch Executes After Resource Closure',
        problemStatement: 'What is the exact console output of this code?',
        code: `class Device implements AutoCloseable {
    public void close() {
        System.out.print("CLOSED ");
    }
}

public class Puzzle2 {
    public static void main(String[] args) {
        try (Device d = new Device()) {
            System.out.print("TRY ");
            throw new RuntimeException();
        } catch (RuntimeException e) {
            System.out.print("CATCH ");
        } finally {
            System.out.print("FINALLY");
        }
    }
}`,
        options: [
            'A) TRY CATCH CLOSED FINALLY',
            'B) TRY CLOSED CATCH FINALLY',
            'C) TRY CATCH FINALLY CLOSED',
            'D) CLOSED TRY CATCH FINALLY'
        ],
        correctOptionIndex: 1,
        hint: 'Does automatic resource closure happen before or after entering the catch block?',
        solution: 'Option B is correct: TRY CLOSED CATCH FINALLY',
        explanation: 'In try-with-resources, resources are closed immediately upon exiting the try block. Because an exception is thrown in the try block, the device is closed first ("CLOSED "), then the catch block executes ("CATCH "), and lastly the finally block executes ("FINALLY").'
      },
      {
        title: 'Puzzle 3: Suppressed Exception Retrieval',
        problemStatement: 'What does this program print?',
        code: `class Door implements AutoCloseable {
    public void close() throws Exception {
        throw new Exception("DoorCloseErr");
    }
}

public class Puzzle3 {
    public static void main(String[] args) {
        try (Door d = new Door()) {
            throw new ArithmeticException("DivideByZero");
        } catch (Exception e) {
            System.out.print(e.getClass().getSimpleName() + ":");
            Throwable[] supp = e.getSuppressed();
            System.out.print(supp[0].getMessage());
        }
    }
}`,
        options: [
            'A) Exception:DoorCloseErr',
            'B) ArithmeticException:DoorCloseErr',
            'C) DoorCloseErr:DivideByZero',
            'D) ArithmeticException:null'
        ],
        correctOptionIndex: 1,
        hint: 'The primary exception comes from the try block; the exception thrown during close() is attached as suppressed.',
        solution: 'Option B is correct: ArithmeticException:DoorCloseErr',
        explanation: 'The primary exception thrown inside the try block is ArithmeticException. When closing the Door, an Exception with message "DoorCloseErr" is thrown and attached to the primary exception via addSuppressed(). In the catch block, e is ArithmeticException and supp[0].getMessage() is "DoorCloseErr".'
      },
      {
        title: 'Puzzle 4: Close Throws With Normal Try Block Completion',
        problemStatement: 'What is the output when the try block executes normally but close() throws?',
        code: `class Pipe implements AutoCloseable {
    public void close() throws Exception {
        throw new IllegalStateException("Leak");
    }
}

public class Puzzle4 {
    public static void main(String[] args) {
        try (Pipe p = new Pipe()) {
            System.out.print("OK ");
        } catch (Exception e) {
            System.out.print("CAUGHT:" + e.getMessage() + " SUPP:" + e.getSuppressed().length);
        }
    }
}`,
        options: [
            'A) OK CAUGHT:Leak SUPP:0',
            'B) CAUGHT:Leak SUPP:0',
            'C) OK CAUGHT:Leak SUPP:1',
            'D) OK'
        ],
        correctOptionIndex: 0,
        hint: 'When the try block does NOT throw an exception, is the close() exception primary or suppressed?',
        solution: 'Option A is correct: OK CAUGHT:Leak SUPP:0',
        explanation: 'Because the try block completed normally, there was no primary try exception. Therefore, the exception thrown by Pipe.close() becomes the primary exception caught by the catch block. Since there were no further exceptions during closing, its suppressed array is empty (length 0).'
      },
      {
        title: 'Puzzle 5: Multiple Close Exceptions on Normal Exit',
        problemStatement: 'Both resources throw during close(). What does this code print?',
        code: `class Res implements AutoCloseable {
    private final String id;
    public Res(String id) { this.id = id; }
    public void close() throws Exception {
        throw new Exception("Err-" + id);
    }
}

public class Puzzle5 {
    public static void main(String[] args) {
        try (Res r1 = new Res("1");
             Res r2 = new Res("2")) {
            // normal exit
        } catch (Exception e) {
            System.out.print("Primary:" + e.getMessage() + " Supp:" + e.getSuppressed()[0].getMessage());
        }
    }
}`,
        options: [
            'A) Primary:Err-1 Supp:Err-2',
            'B) Primary:Err-2 Supp:Err-1',
            'C) Primary:Err-2 Supp:null',
            'D) Compilation error'
        ],
        correctOptionIndex: 1,
        hint: 'Remember reverse closure order: r2 closes before r1.',
        solution: 'Option B is correct: Primary:Err-2 Supp:Err-1',
        explanation: 'Resources close in reverse order: r2 is closed first. Since the try block did not throw, r2.close()`s exception ("Err-2") becomes the primary exception. Next, r1 is closed; its exception ("Err-1") is suppressed and attached to the primary exception. Thus, Primary is Err-2 and Suppressed is Err-1.'
      },
      {
        title: 'Puzzle 6: Null Resource in try-with-resources',
        problemStatement: 'What happens when a resource evaluates to null in try-with-resources?',
        code: `public class Puzzle6 {
    public static void main(String[] args) {
        AutoCloseable resource = null;
        try (resource) {
            System.out.print("INSIDE ");
        } catch (Exception e) {
            System.out.print("CAUGHT ");
        } finally {
            System.out.print("FINALLY");
        }
    }
}`,
        options: [
            'A) Throws NullPointerException when entering try',
            'B) INSIDE CAUGHT FINALLY (NullPointerException on close)',
            'C) INSIDE FINALLY',
            'D) Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Does the Java runtime call close() on a null reference?',
        solution: 'Option C is correct: INSIDE FINALLY',
        explanation: 'The try-with-resources specification explicitly requires a null check prior to invoking close(). If the resource is null, no close() call is attempted and no NullPointerException is thrown. The try block prints "INSIDE " and the finally block prints "FINALLY".'
      },
      {
        title: 'Puzzle 7: Java 9 Effectively Final Violation',
        problemStatement: 'What is the outcome of compiling and running this program?',
        code: `class Cleanable implements AutoCloseable {
    public void close() {}
}

public class Puzzle7 {
    public static void main(String[] args) {
        Cleanable c = new Cleanable();
        c = new Cleanable();
        try (c) {
            System.out.println("Success");
        }
    }
}`,
        options: [
            'A) Prints "Success"',
            'B) Compilation Error: c must be final or effectively final',
            'C) RuntimeException at runtime',
            'D) NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'In Java 9+, can a reassigned variable be used in try(var)?',
        solution: 'Option B is correct: Compilation Error',
        explanation: 'In Java 9+, variables referenced in try-with-resources must be final or effectively final. Because `c` was reassigned (`c = new Cleanable();`), it is no longer effectively final, resulting in a compilation error: "local variables referenced from a try-with-resources statement must be final or effectively final".'
      },
      {
        title: 'Puzzle 8: Exception During Resource Initialization',
        problemStatement: 'What does this program print when resource 2 fails during initialization?',
        code: `class Box implements AutoCloseable {
    private final String name;
    public Box(String name, boolean fail) {
        this.name = name;
        System.out.print("INIT-" + name + " ");
        if (fail) throw new RuntimeException("FAIL-" + name);
    }
    public void close() {
        System.out.print("CLOSE-" + name + " ");
    }
}

public class Puzzle8 {
    public static void main(String[] args) {
        try (Box b1 = new Box("1", false);
             Box b2 = new Box("2", true);
             Box b3 = new Box("3", false)) {
            System.out.print("TRY ");
        } catch (Exception e) {
            System.out.print("CAUGHT");
        }
    }
}`,
        options: [
            'A) INIT-1 INIT-2 CLOSE-1 CAUGHT',
            'B) INIT-1 INIT-2 CAUGHT',
            'C) INIT-1 INIT-2 INIT-3 CLOSE-3 CLOSE-2 CLOSE-1 CAUGHT',
            'D) INIT-1 INIT-2 CLOSE-2 CLOSE-1 CAUGHT'
        ],
        correctOptionIndex: 0,
        hint: 'If resource b2 fails during constructor execution, is b2 closed? Is b1 closed? Does b3 initialize?',
        solution: 'Option A is correct: INIT-1 INIT-2 CLOSE-1 CAUGHT',
        explanation: 'b1 is successfully initialized ("INIT-1 "). During initialization of b2, its constructor throws an exception ("INIT-2 "). Because b2 was never successfully instantiated, b2.close() is NOT invoked, and b3 is never initialized. However, any previously initialized resource (b1) IS safely closed ("CLOSE-1 "). Then the catch block catches the exception ("CAUGHT").'
      },
      {
        title: 'Puzzle 9: Finally Return With Suppressed Exception',
        problemStatement: 'What does this method return?',
        code: `class LeakBox implements AutoCloseable {
    public void close() throws Exception {
        throw new Exception("CloseErr");
    }
}

public class Puzzle9 {
    public static int test() {
        try (LeakBox box = new LeakBox()) {
            throw new RuntimeException("TryErr");
        } catch (Exception e) {
            return 10;
        } finally {
            return 20;
        }
    }

    public static void main(String[] args) {
        System.out.println(test());
    }
}`,
        options: [
            'A) Throws RuntimeException with suppressed CloseErr',
            'B) 10',
            'C) 20',
            'D) Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'What happens when a finally block executes a return statement?',
        solution: 'Option C is correct: 20',
        explanation: 'The try block throws RuntimeException; LeakBox.close() runs and attaches CloseErr as suppressed. The catch block catches the RuntimeException and attempts to return 10. However, the finally block always executes and its `return 20;` discards any pending return value from catch, returning 20.'
      },
      {
        title: 'Puzzle 10: AutoCloseable vs Closeable Polymorphism',
        problemStatement: 'Which line causes a compilation error in this program?',
        code: `import java.io.Closeable;
import java.io.IOException;

class StandardResource implements AutoCloseable {
    public void close() throws Exception {}
}

class IoResource implements Closeable {
    public void close() throws IOException {}
}

public class Puzzle10 {
    public static void main(String[] args) {
        // Line 1: try (IoResource r = new IoResource()) {} catch (IOException e) {}
        // Line 2: try (IoResource r = new IoResource()) {}
        // Line 3: try (StandardResource r = new StandardResource()) {} catch (IOException e) {}
        // Line 4: try (StandardResource r = new StandardResource()) {} catch (Exception e) {}
    }
}`,
        options: [
            'A) Line 1',
            'B) Line 2',
            'C) Line 3',
            'D) Line 4'
        ],
        correctOptionIndex: 2,
        hint: 'What checked exception does StandardResource.close() declare in its throws clause?',
        solution: 'Option C is correct: Line 3',
        explanation: 'StandardResource implements AutoCloseable whose close() declares `throws Exception`. Because the try block has an unhandled checked Exception (from close()), catching only IOException (Line 3) leaves unhandled checked `Exception`, causing a compilation error: "unreported exception Exception; must be caught or declared to be thrown". Line 2 also fails if unhandled, but Line 3 specifically attempts to catch IOException while unhandled Exception remains.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is try-with-resources in Java, and what fundamental architectural flaw in pre-Java 7 exception handling did it solve?',
        answer: 'try-with-resources (introduced in Java 7) is a language construct that guarantees deterministic, automatic resource cleanup for any object implementing java.lang.AutoCloseable. Prior to Java 7, resources were closed in finally blocks. This had two major flaws: 1) Resource Leaks: In a finally block closing multiple resources (e.g. conn, stmt, rs), if rs.close() threw an exception, subsequent closes were skipped, causing connection and handle leaks. 2) Exception Masking (Shadowing): If code in the try block threw an exception (e.g. SQLException), and code in the finally block threw an IOException during close(), the finally block exception completely swallowed and masked the primary try block exception! Developers lost the true root cause. try-with-resources solves both: all resources are guaranteed to close in reverse order, and any closing exceptions are preserved by attaching them as suppressed exceptions to the primary exception.',
        followUp: 'How did Java address exception masking in the JVM bytecode?',
        followUpAnswer: 'Java added Throwable.addSuppressed(Throwable) and Throwable.getSuppressed() in Java 7. When the try-with-resources bytecode exits abruptly due to a primary exception, any subsequent exception thrown by auto-generated close calls is added to the primary exception via addSuppressed().',
        keyPhrases: [
          'Deterministic resource cleanup for AutoCloseable',
          'Eliminated boilerplate finally blocks',
          'Prevents resource leaks when multiple streams are opened',
          'Prevents exception masking / shadowing via addSuppressed()',
          'Reverse declaration closure order (LIFO)'
        ],
        commonMistakeAnswer: 'Saying try-with-resources is just syntactic sugar that works identical to a single finally block without mentioning exception suppression.'
      },
      {
        question: 'Why does try-with-resources close resources in reverse order of their declaration (LIFO)? Give a concrete example.',
        answer: 'Resources are closed in LIFO order because resources declared later frequently wrap or depend on resources declared earlier. For example, consider: `try (FileOutputStream fos = new FileOutputStream("out.bin"); GZIPOutputStream gzos = new GZIPOutputStream(fos); ObjectOutputStream oos = new ObjectOutputStream(gzos))`. Here, `oos` buffers serialized objects and compresses them into `gzos`, which writes compressed bytes to `fos`. When `oos.close()` executes, its internal contract flushes any remaining buffered stream headers and trailers down into `gzos`. If `fos` had been closed first, `oos.close()` would fail with an `IOException: Stream Closed` while attempting to flush its final bytes! Closing in reverse order (oos -> gzos -> fos) guarantees that every underlying data sink remains open while outer decorator streams flush their final state.',
        followUp: 'What happens if closing the outer decorator throws an exception? Does the inner resource still get closed?',
        followUpAnswer: 'Yes! Java guarantees that every successfully initialized resource will have its close() invoked, even if preceding close calls throw exceptions. Any subsequent exceptions are attached as suppressed.',
        keyPhrases: [
          'LIFO (Last-In, First-Out) reverse closure',
          'Outer decorator streams depend on inner streams',
          'Ensures flush() succeeds on underlying sinks during close()',
          'Mirror-symmetry of acquisition and release',
          'Guaranteed closure of remaining resources even if one close() fails'
        ],
        commonMistakeAnswer: 'Asserting that resources are closed in the same order they were declared (FIFO).'
      },
      {
        question: 'What is the difference between java.lang.AutoCloseable and java.io.Closeable?',
        answer: 'There are three key differences: 1) Hierarchy & Introduction: `Closeable` was introduced in Java 5 in package `java.io`. When try-with-resources was added in Java 7, `AutoCloseable` was introduced in `java.lang` as the new parent interface (`Closeable extends AutoCloseable`). 2) Throws Signature: `AutoCloseable.close()` declares `throws Exception`, permitting arbitrary resource types (database connections, custom locks, graphics pipelines) to throw custom checked exceptions. `Closeable.close()` declares `throws IOException`, restricting it to I/O-related operations. 3) Idempotency: `Closeable` strictly mandates that calling `close()` more than once MUST have no effect (it is idempotent). `AutoCloseable` strongly recommends idempotency, but the specification explicitly states that calling close() more than once is NOT guaranteed to be idempotent and may throw an exception.',
        followUp: 'Why was AutoCloseable designed to throw Exception rather than IOException or RuntimeException?',
        followUpAnswer: 'If it threw IOException, non-I/O resources like java.sql.Connection (which throws SQLException) would have had to wrap their exceptions in IOException. If it threw nothing or RuntimeException, existing checked exceptions could not be thrown.',
        keyPhrases: [
          'Closeable extends AutoCloseable',
          'AutoCloseable.close() throws Exception; Closeable.close() throws IOException',
          'Closeable contract requires idempotency',
          'AutoCloseable recommends but does not mandate idempotency',
          'AutoCloseable is in java.lang; Closeable is in java.io'
        ],
        commonMistakeAnswer: 'Thinking AutoCloseable is a sub-interface of Closeable or that their close() methods have identical exception signatures.'
      },
      {
        question: 'When do catch and finally blocks execute relative to resource closure in a try-with-resources statement?',
        answer: 'In a try-with-resources statement, resources are closed BEFORE any explicit `catch` or `finally` blocks execute. The compiler generates synthetic code such that the resource closure is wrapped directly around the `try` block body. If an exception occurs inside the try block, the resources are closed immediately (and any close exceptions are attached as suppressed). Only AFTER all resources have been closed does execution transfer to the matching `catch` block. The explicit `finally` block runs last of all. Therefore, inside both `catch` and `finally`, all resources declared in the try-with-resources header are already closed.',
        followUp: 'If you need to query database status or roll back a transaction inside the catch block, what is the implication?',
        followUpAnswer: 'If the Connection was declared in the try header, it is already closed when the catch block executes! You cannot perform rollback on a closed connection; the transaction boundary must either precede the try-with-resources or be managed via an external transaction manager.',
        keyPhrases: [
          'Resources close BEFORE catch and finally blocks execute',
          'Synthetic cleanup wraps the try block body directly',
          'State in catch block reflects already-closed resources',
          'Finally block runs last after resource closure and catch'
        ],
        commonMistakeAnswer: 'Claiming that the catch block catches the error while the resources are still open, and resources close in the finally block.'
      },
      {
        question: 'Explain the mechanism of Suppressed Exceptions in Java. When are they created and how do you inspect them?',
        answer: 'Suppressed exceptions occur when an exception is thrown in the `try` block, and subsequent exceptions are thrown during the automatic invocation of `close()` on the active resources. Because two or more exceptions cannot be thrown simultaneously up the call stack, Java designates the exception from the `try` block as the primary exception. Each exception thrown by a `close()` method is added to the primary exception via `primary.addSuppressed(closeException)`. When the primary exception is caught in a `catch` block, developers can call `Throwable[] suppressed = e.getSuppressed()` to inspect all suppressed exceptions. When calling `e.printStackTrace()`, the JVM standard print format displays the primary exception and its stack trace, followed by indented `Suppressed: ...` blocks.',
        followUp: 'What happens if the try block completes normally without an exception, but two resources throw exceptions during close()?',
        followUpAnswer: 'The exception from the first closed resource (the rightmost declared resource) becomes the primary exception. The exception from the second closed resource is attached to it as a suppressed exception.',
        keyPhrases: [
          'Try block exception is designated the primary exception',
          'Closing exceptions attached via addSuppressed(Throwable)',
          'Retrieved via Throwable.getSuppressed()',
          'Standard printStackTrace prints Suppressed: blocks',
          'Preserves debugging diagnostics without masking primary failure'
        ],
        commonMistakeAnswer: 'Thinking the last exception thrown overwrites the earlier ones or that suppressed exceptions are discarded silently.'
      },
      {
        question: 'What happens if a resource declared in the try-with-resources header evaluates to null? Does it throw a NullPointerException?',
        answer: 'No NullPointerException is thrown. The Java Language Specification (JLS §14.20.3) explicitly specifies that the compiler-generated resource cleanup checks each resource reference against `null` before invoking `close()`. If the reference is `null`, the `close()` invocation is safely bypassed. For example, if a method `openFile()` returns `null` and you write `try (InputStream in = openFile())`, entering the try block succeeds with `in = null`. If the try block doesn`t dereference `in`, the block exits without any NullPointerException during cleanup.',
        followUp: 'What happens if the try block dereferences that null variable?',
        followUpAnswer: 'The try block throws NullPointerException as expected, but the cleanup step still safely skips in.close() because in is null.',
        keyPhrases: [
          'JLS §14.20.3 mandates null check before calling close()',
          'No NullPointerException during cleanup',
          'Automatic null bypass',
          'Safe handling of nullable resource factory methods'
        ],
        commonMistakeAnswer: 'Assuming close() is invoked directly without a null check, causing an automatic NullPointerException on cleanup.'
      },
      {
        question: 'What happens if the constructor or initialization expression of a resource throws an exception in try-with-resources?',
        answer: 'If multiple resources are declared and one throws an exception during initialization: 1) Any resources declared BEFORE the failing resource that were already successfully initialized ARE guaranteed to be closed immediately in reverse order. 2) The failing resource itself was never successfully instantiated, so its `close()` method is NOT invoked. 3) Any resources declared AFTER the failing resource are NEVER initialized. For example, in `try (R1 r1 = new R1(); R2 r2 = new R2(); R3 r3 = new R3())`, if `new R2()` throws an exception, `r1.close()` is invoked, `r2` and `r3` are never closed (nor is `r3` created), and the initialization exception propagates immediately to the catch block.',
        followUp: 'Why is this behavior crucial for preventing memory and handle leaks?',
        followUpAnswer: 'It prevents partially constructed object leaks. Without this guarantee, if r2 failed, r1 would remain open forever unless wrapped in tedious nested pre-Java 7 try-catches.',
        keyPhrases: [
          'Previously initialized resources are safely closed',
          'Failing resource close() is not called',
          'Subsequent resources are never instantiated',
          'Exception propagates immediately to catch/caller'
        ],
        commonMistakeAnswer: 'Assuming none of the resources are closed if an initialization fails, or assuming close() is called on the unconstructed object.'
      },
      {
        question: 'What enhancement did Java 9 introduce to try-with-resources, and what constraint does it place on variables?',
        answer: 'In Java 7 and 8, every resource managed by try-with-resources had to be a newly declared local variable inside the parentheses: `try (BufferedReader br = new BufferedReader(...))`. If you already had an existing variable (e.g. passed as a method parameter), you had to write a dummy assignment: `try (BufferedReader r = br)`. In Java 9, JEP 213 enhanced try-with-resources so that existing variables can be passed directly by identifier: `try (reader; writer)`. The strict constraint is that the variable MUST be `final` or `effectively final`. If the variable is reassigned anywhere in its scope, the compiler rejects the try-with-resources statement with a compilation error.',
        followUp: 'Why does Java require the variable to be effectively final?',
        followUpAnswer: 'Because try-with-resources creates a deterministic binding to close that exact instance on exit. If the variable could be reassigned inside or outside the try block, the runtime could end up closing the wrong object or a null reference.',
        keyPhrases: [
          'Java 9 / JEP 213 enhancement',
          'Direct use of existing variables without dummy re-declaration',
          'Variable must be final or effectively final',
          'Compile-time enforcement against reassignment'
        ],
        commonMistakeAnswer: 'Thinking you can reassign the variable inside the try block to point to a new resource.'
      },
      {
        question: 'Is AutoCloseable.close() guaranteed to be idempotent? How should senior engineers implement it defensively?',
        answer: 'No, `AutoCloseable.close()` is NOT guaranteed to be idempotent by specification. While the API documentation strongly recommends that `close()` should be idempotent (meaning subsequent invocations have no side effects), it explicitly allows implementations to throw an exception or perform unintended actions if called more than once. (In contrast, `java.io.Closeable.close()` strictly mandates idempotency). Senior engineers must implement AutoCloseable defensively by using an atomic boolean flag (`AtomicBoolean closed = new AtomicBoolean(false)`) or volatile boolean check: `if (closed.compareAndSet(false, true)) { doActualCleanup(); }`. This ensures that even if a caller accidentally invokes close() manually or passes the object to multiple managers, cleanup runs exactly once without throwing exceptions.',
        followUp: 'Can calling close() multiple times cause resource corruption if not idempotent?',
        followUpAnswer: 'Yes. In database connection pools or thread pools, a second close() on an already-released connection might return a connection that another thread has just checked out, corrupting active transactions.',
        keyPhrases: [
          'AutoCloseable does NOT mandate idempotency (Closeable does)',
          'Defensive implementation with AtomicBoolean or boolean guard',
          'Prevents duplicate release of sockets, file handles, or pooled connections',
          'Subsequent close() calls should be silent no-ops'
        ],
        commonMistakeAnswer: 'Assuming all close() methods in Java are automatically idempotent by runtime magic.'
      },
      {
        question: 'Can you use try-with-resources with resources that do not implement AutoCloseable, such as java.util.concurrent.locks.Lock?',
        answer: 'You cannot directly pass `java.util.concurrent.locks.Lock` into try-with-resources because `Lock` does not implement `AutoCloseable` (its release method is `unlock()`, not `close()`). However, senior engineers frequently use the Adapter / Wrapper pattern to make Locks compatible with try-with-resources. By defining an inline AutoCloseable wrapper: `public static AutoCloseable scopedLock(Lock lock) { lock.lock(); return lock::unlock; }`, you can write: `try (var ignored = scopedLock(myLock)) { // critical section }`. When the try block exits, the method reference `lock::unlock` is executed automatically via the AutoCloseable interface. This creates RAII-style (Resource Acquisition Is Initialization) lock management in Java.',
        followUp: 'What is the performance overhead of using this lambda/wrapper adapter for locks?',
        followUpAnswer: 'Modern JVM escape analysis and C2 JIT compilation typically inline the synthetic AutoCloseable instance and eliminate the allocation, resulting in near-zero runtime overhead in hot paths.',
        keyPhrases: [
          'Direct use requires implementing AutoCloseable',
          'Adapter / Functional wrapper pattern for Lock',
          'Method reference lock::unlock as AutoCloseable',
          'RAII pattern in Java',
          'Eliminates lock release omission bugs'
        ],
        commonMistakeAnswer: 'Asserting that Lock implements AutoCloseable or that try-with-resources can take any object with any cleanup method name.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which interface introduced in Java 7 is required for an object to be used in try-with-resources?',
        options: [
          'java.io.Closeable',
          'java.lang.AutoCloseable',
          'java.lang.Disposable',
          'java.io.Flushable'
        ],
        correctIndex: 1,
        explanation: 'java.lang.AutoCloseable was introduced in Java 7 specifically as the foundational interface for try-with-resources.'
      },
      {
        question: 'In what order are resources closed in: try (R1 a = ...; R2 b = ...) ?',
        options: [
          'FIFO: a is closed first, then b',
          'LIFO: b is closed first, then a',
          'Concurrent: both are closed simultaneously',
          'Random order determined by the garbage collector'
        ],
        correctIndex: 1,
        explanation: 'Resources are closed in reverse order of their declaration (LIFO), so b.close() executes before a.close().'
      },
      {
        question: 'When do matching catch and finally blocks execute relative to resource closure in try-with-resources?',
        options: [
          'Before resources are closed',
          'After resources are closed',
          'Concurrently while resources are closing',
          'Catch runs before close, but finally runs after close'
        ],
        correctIndex: 1,
        explanation: 'Resources are closed immediately when the try block finishes, before any matching catch or finally block executes.'
      },
      {
        question: 'If the try block throws Exception A, and the resource close() method throws Exception B, what happens?',
        options: [
          'Exception B is thrown; Exception A is lost',
          'Exception A is thrown; Exception B is attached as a suppressed exception to A',
          'Both exceptions merge into a MultiException',
          'Exception B is silently ignored and discarded'
        ],
        correctIndex: 1,
        explanation: 'Exception A from the try block is the primary exception. Exception B from close() is attached to A via addSuppressed().'
      },
      {
        question: 'Which method on Throwable is used to retrieve suppressed exceptions?',
        options: [
          'e.getCauses()',
          'e.getSuppressed()',
          'e.getSecondaryExceptions()',
          'e.getChainedExceptions()'
        ],
        correctIndex: 1,
        explanation: 'Throwable.getSuppressed() returns an array (Throwable[]) containing all exceptions suppressed by the primary exception.'
      },
      {
        question: 'What is the signature of close() in java.lang.AutoCloseable vs java.io.Closeable?',
        options: [
          'AutoCloseable throws Exception; Closeable throws IOException',
          'AutoCloseable throws IOException; Closeable throws Exception',
          'Both declare throws IOException',
          'Both declare throws Throwable'
        ],
        correctIndex: 0,
        explanation: 'AutoCloseable.close() declares `throws Exception`, while Closeable.close() declares `throws IOException`.'
      },
      {
        question: 'What happens if a resource variable in a try-with-resources header evaluates to null?',
        options: [
          'Throws NullPointerException upon entering the try block',
          'Throws NullPointerException upon exiting the try block during cleanup',
          'No exception is thrown; the runtime checks for null and skips close()',
          'The try block is skipped entirely'
        ],
        correctIndex: 2,
        explanation: 'The try-with-resources specification mandates a null check before calling close(). If the reference is null, close() is simply not called.'
      },
      {
        question: 'In try (R1 a = new R1(); R2 b = new R2()), if new R2() throws an exception during initialization, what occurs?',
        options: [
          'a.close() is called; b.close() is NOT called',
          'Neither a nor b is closed',
          'Both a.close() and b.close() are called',
          'b.close() is called, but a remains open'
        ],
        correctIndex: 0,
        explanation: 'Any resource successfully initialized prior to the failure (a) is closed. The failing resource (b) was never created, so its close() is never called.'
      },
      {
        question: 'What Java version introduced the ability to pass existing effectively final variables directly into try-with-resources?',
        options: [
          'Java 7',
          'Java 8',
          'Java 9',
          'Java 11'
        ],
        correctIndex: 2,
        explanation: 'Java 9 (via JEP 213) allowed referencing existing final or effectively final variables in try-with-resources without redeclaring them.'
      },
      {
        question: 'Which interface explicitly mandates that calling close() multiple times must have no effect (idempotency)?',
        options: [
          'java.lang.AutoCloseable',
          'java.io.Closeable',
          'java.lang.Runnable',
          'java.io.Serializable'
        ],
        correctIndex: 1,
        explanation: 'java.io.Closeable explicitly mandates idempotency in its specification, whereas java.lang.AutoCloseable only recommends it.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 21.4: Custom Exceptions, Chaining & Anti-Patterns
  // ─────────────────────────────────────────────────────────────
  'custom-exceptions-best-practices': {
    id: 'custom-exceptions-best-practices',
    moduleId: 'java-exceptions',
    moduleTitle: '21. Exception Handling',
    lessonNumber: 'Lesson 21.4',
    title: 'Custom Exceptions, Chaining & Anti-Patterns',
    subtitle: 'Domain-specific exceptions, extending RuntimeException vs Exception, constructor overloads, exception chaining with initCause/getCause, stack trace preservation, and the 7 deadly anti-patterns',
    estimatedMinutes: 26,
    beginnerAnalogy: 'An international diplomatic incident and courier envelope. If an embassy clerk loses a classified passport due to a broken drawer lock (low-level SQLException / IOException), the ambassador shouldn\'t throw the broken lock directly at the Prime Minister\'s face! Instead, the ambassador creates a diplomatic memorandum: "Security Clearance Verification Failed" (Domain Exception), but places the original broken lock inside an attached official evidence pouch (Exception Chaining with cause). If the ambassador throws away the evidence pouch and only gives a vague note "it broke" (destructive wrap: new RuntimeException(e.getMessage())), investigators have zero idea where the failure originated in the embassy!',
    interviewTakeaways: [
      'Prefer Standard Exceptions: Before creating a custom exception, always check if standard JDK exceptions fit (IllegalArgumentException, IllegalStateException, UnsupportedOperationException, NoSuchElementException). Standard exceptions are universally understood.',
      'Unchecked for Business Domain Exceptions: In modern enterprise Java (Spring, microservices, cloud), custom exceptions should almost always extend java.lang.RuntimeException. Checked exceptions clutter public APIs with throws clauses and impede functional stream pipelines.',
      'Provide the Four Standard Constructors: Every custom exception must provide: no-arg, String message, String message + Throwable cause, and Throwable cause constructors.',
      'Always Preserve the Cause Chain: Never wrap an exception using `new CustomException(e.getMessage())`. This destroys the underlying stack trace and root cause! Always pass `e` as the cause: `new CustomException("High-level message", e)`.',
      'The 7 Deadly Anti-Patterns: (1) Log and Throw, (2) Exception Swallowing, (3) Destructive Wrapping, (4) Catching Throwable/Exception indiscriminately, (5) Throwing from finally, (6) Using Exceptions for Control Flow, and (7) Leaking Sensitive Data in Exception Messages.',
      'Include Contextual Domain Attributes: Rich custom exceptions should store strongly-typed diagnostic fields (e.g. `userId`, `orderId`, `errorCode`, `retryAfterSeconds`) accessible via getter methods to facilitate automated error responses.',
      'Stack Trace Generation Cost: Creating an exception in Java is expensive primarily due to `Throwable.fillInStackTrace()`, which walks the native OS execution frames. Never use exceptions for routine flow control.'
    ],
    cheatSheet: {
      summary: 'Design domain-specific exceptions by extending RuntimeException, chaining the original root cause, providing standard constructors, adding contextual metadata, and strictly avoiding the 7 deadly exception anti-patterns.',
      syntaxTemplate: `// Standard Production-Grade Custom Exception
public class PaymentProcessingException extends RuntimeException {
    private final String transactionId;
    private final int errorCode;

    public PaymentProcessingException(String message, String transactionId, int errorCode) {
        super(message);
        this.transactionId = transactionId;
        this.errorCode = errorCode;
    }

    public PaymentProcessingException(String message, Throwable cause, String transactionId, int errorCode) {
        super(message, cause); // Critical: preserves cause chain!
        this.transactionId = transactionId;
        this.errorCode = errorCode;
    }

    public String getTransactionId() { return transactionId; }
    public int getErrorCode() { return errorCode; }
}`,
      rules: [
        { rule: 'Standard over Custom', explanation: 'Use IllegalArgumentException, IllegalStateException, or NullPointerException when standard semantics apply.' },
        { rule: 'Preserve Root Cause', explanation: 'Always pass the caught exception as the cause parameter to preserve the complete nested stack trace.' },
        { rule: 'Extend RuntimeException', explanation: 'Default to unchecked exceptions in modern architecture to prevent leaking implementation details across layer boundaries.' },
        { rule: 'Provide 4 Constructors', explanation: 'Implement (), (message), (message, cause), and (cause) constructors to support all standard instantiation idioms.' },
        { rule: 'Never Log and Throw', explanation: 'Either log the exception at the boundary OR rethrow it to caller. Doing both produces confusing duplicate log entries.' },
        { rule: 'No Flow Control', explanation: 'Never use exceptions to break loops or check normal operational conditions; stack frame walking destroys throughput.' }
      ],
      quickComparison: [
        { aspect: 'Custom Exception Base', optionA: 'RuntimeException (Unchecked - Recommended)', optionB: 'Exception (Checked - Discouraged)' },
        { aspect: 'API Impact', optionA: 'Clean method signatures; works in lambdas', optionB: 'Forces throws clauses or try-catch on all callers' },
        { aspect: 'Exception Chaining', optionA: 'super(message, cause) -> Preserves root cause', optionB: 'super(e.getMessage()) -> Destroys root cause!' },
        { aspect: 'Logging Rule', optionA: 'Handle & Log ONCE at application boundary', optionB: 'Anti-pattern: Log in every layer during rethrow' },
        { aspect: 'Performance', optionA: 'Exceptions for exceptional runtime errors', optionB: 'Anti-pattern: Exceptions as control flow' }
      ]
    },
    coreExplanation: [
      'When to Create Custom Exceptions: The JDK provides robust standard exceptions: `IllegalArgumentException` (invalid parameter), `IllegalStateException` (method invoked at an illegal lifecycle state), `UnsupportedOperationException` (unsupported optional method), and `NoSuchElementException` (element absent). Create custom exceptions only when: 1) You need domain-specific semantics (e.g. `InsufficientFundsException`, `InventoryAllocationException`), 2) Callers need to handle that specific error condition differently from generic errors, or 3) You need to attach strongly-typed diagnostic metadata (e.g., account ID, retry interval).',
      'The Checked vs Unchecked Modern Consensus: While early Java emphasized checked exceptions for recoverable conditions, modern enterprise frameworks (Spring, Hibernate, Quarkus, Micronaut) and architects almost universally prefer unchecked exceptions (`extends RuntimeException`). Checked exceptions introduce tight architectural coupling: declaring `throws DatabaseException` in a service interface leaks database implementation details into callers, and checked exceptions cannot be thrown cleanly inside Java 8+ Stream lambdas or functional interfaces.',
      'The Four Canonical Constructors: A well-behaved exception class should mirror `java.lang.Throwable` by supplying four standard constructors: `public CustomException()`, `public CustomException(String message)`, `public CustomException(String message, Throwable cause)`, and `public CustomException(Throwable cause)`. Frameworks, serialization libraries, and reflections rely on these signatures.',
      'Exception Chaining and Stack Trace Preservation: When catching a low-level exception (e.g. `SQLException`) and translating it into a higher-level domain exception (`OrderPlacementException`), you MUST pass the original exception to the constructor: `throw new OrderPlacementException("Order failed", e);`. The JVM links `e` via `Throwable.initCause()`. Calling `getCause()` on the domain exception returns the original `SQLException`. If you write `new OrderPlacementException(e.getMessage())`, the original stack trace is completely lost!',
      'The 7 Deadly Exception Anti-Patterns: In production codebases, bad exception handling causes severe outages and debugging nightmares. The 7 most prevalent anti-patterns are: 1) Log and Throw (logging in every catch block and then rethrowing, spamming logs 10x for a single error), 2) Swallowing / Silencing (empty catch blocks hiding critical bugs), 3) Destructive Wrapping (stripping root cause), 4) Catching Throwable/Exception blindly (intercepting OutOfMemoryError, ThreadDeath, or InterruptedException), 5) Throwing from finally (obliterating primary exceptions), 6) Using Exceptions for Control Flow (using try-catch instead of an if-statement, causing 100x CPU slowdown), and 7) Leaking Sensitive Data in Exception Messages (logging raw passwords, tokens, or PII).',
      'Root Cause Unwrapping: In deeply layered architectures, an exception may be wrapped multiple times (e.g. `ControllerException` -> `ServiceException` -> `RepositoryException` -> `SQLException`). Navigating to the bottom of the chain requires traversing causes: `Throwable root = e; while (root.getCause() != null) { root = root.getCause(); }`. Libraries like Apache Commons provide `ExceptionUtils.getRootCause(e)`.',
      'Optimizing High-Throughput Exceptions: The JVM cost of an exception is NOT the throw or catch; it is the constructor call to `fillInStackTrace()`, which performs a native thread stack walk. In performance-critical microservices where custom exceptions indicate frequent non-error state (e.g., rate limits), you can override `fillInStackTrace()` to do nothing, or use the protected 4-argument constructor: `super(message, cause, enableSuppression, false)` where `writableStackTrace = false`. This makes exception creation nearly as fast as standard object allocation.'
    ],
    diagram: `EXCEPTION TRANSLATION & ROOT CAUSE CHAIN ACROSS ARCHITECTURAL LAYERS
================================================================================

CONTROLLER LAYER
  │
  ├─> Calls Service
  │     │
  │     ▼
SERVICE LAYER
  │   catch (RepositoryException e) {
  │       // PROPER CHAINING: wraps RepositoryException as cause
  │       throw new OrderProcessingException("Order 101 failed", e);
  │   }
  │     │
  │     ▼
REPOSITORY LAYER
  │   catch (SQLException e) {
  │       // EXCEPTION TRANSLATION: wraps low-level driver exception
  │       throw new RepositoryException("Database query failed", e);
  │   }
  │     │
  │     ▼
DATABASE DRIVER (SQLException: Connection timeout on port 5432)

================================================================================
CHAIN INSPECTION: OrderProcessingException
  ├─ Message: "Order 101 failed"
  ├─ Cause: RepositoryException ("Database query failed")
  │    └─ Cause: SQLException ("Connection timeout on port 5432") <── ROOT CAUSE!
  │
  └─ FULL STACK TRACE PRESERVED:
     OrderProcessingException at OrderService.java:45
     Caused by: RepositoryException at OrderRepository.java:82
     Caused by: SQLException at PgDriver.java:120

================================================================================
ANTI-PATTERN COMPARISON:
  GOOD: throw new ServiceException("Failed", e);             [Cause Preserved]
  BAD:  throw new ServiceException(e.getMessage());          [ROOT CAUSE LOST!]
  BAD:  log.error("err", e); throw new ServiceException(e);  [LOG AND THROW!]`,
    codeSnippet: {
      title: 'Production-Grade Custom Exception Hierarchy with Diagnostic Metadata',
      code: `// Base domain exception for all e-commerce banking operations
abstract class BankingException extends RuntimeException {
    private final String accountId;
    private final long timestamp;

    public BankingException(String message, String accountId) {
        super(message);
        this.accountId = accountId;
        this.timestamp = System.currentTimeMillis();
    }

    public BankingException(String message, Throwable cause, String accountId) {
        super(message, cause); // Preserves chained cause
        this.accountId = accountId;
        this.timestamp = System.currentTimeMillis();
    }

    public String getAccountId() { return accountId; }
    public long getTimestamp() { return timestamp; }
}

// Concrete custom exception with strongly-typed domain properties
class InsufficientFundsException extends BankingException {
    private final double attemptedAmount;
    private final double currentBalance;

    public InsufficientFundsException(String accountId, double attemptedAmount, double currentBalance) {
        super(String.format("Account %s has balance $%.2f; attempted withdrawal of $%.2f",
                accountId, currentBalance, attemptedAmount), accountId);
        this.attemptedAmount = attemptedAmount;
        this.currentBalance = currentBalance;
    }

    public double getDeficit() {
        return attemptedAmount - currentBalance;
    }
}

public class CustomExceptionDemo {
    public static void withdraw(String accountId, double balance, double amount) {
        if (amount > balance) {
            throw new InsufficientFundsException(accountId, amount, balance);
        }
        System.out.println("Withdrawal successful. Remaining: $" + (balance - amount));
    }

    public static void main(String[] args) {
        try {
            withdraw("ACCT-8891", 150.00, 250.00);
        } catch (InsufficientFundsException e) {
            System.err.println("Caught Domain Error: " + e.getMessage());
            System.err.println("Account: " + e.getAccountId());
            System.err.println("Deficit: $" + e.getDeficit());
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'abstract class BankingException extends RuntimeException', explanation: 'Extends RuntimeException so service callers are not forced to write checked throws clauses.' },
        { line: 'private final String accountId;', explanation: 'Provides strongly-typed contextual metadata for logging and error reporting.' },
        { line: 'super(message, cause);', explanation: 'Chains the cause to preserve the stack trace across architectural layers.' },
        { line: 'class InsufficientFundsException extends BankingException', explanation: 'Creates a specialized domain exception representing a specific business rule violation.' },
        { line: 'public double getDeficit()', explanation: 'Exposes helper methods on domain properties, allowing API handlers to suggest deposit amounts.' },
        { line: 'throw new InsufficientFundsException(...)', explanation: 'Throws the rich domain exception when validation fails.' },
        { line: 'catch (InsufficientFundsException e)', explanation: 'Caller catches the specific domain exception and reads metadata without messy string parsing.' }
      ],
      output: `Caught Domain Error: Account ACCT-8891 has balance $150.00; attempted withdrawal of $250.00
Account: ACCT-8891
Deficit: $100.0`
    },
    codeExamples: [
      {
        title: 'Exception Translation and Chaining Across Architectural Layers',
        description: 'Demonstrating how a low-level driver exception is caught, translated, and chained up to the web controller.',
        code: `import java.sql.SQLException;

class DatabaseException extends RuntimeException {
    public DatabaseException(String message, Throwable cause) { super(message, cause); }
}

class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message, Throwable cause) { super(message, cause); }
}

class UserRepository {
    public void findUserById(String id) {
        // Simulating low-level database failure:
        SQLException sqlEx = new SQLException("Connection refused by PostgreSQL on port 5432");
        throw new DatabaseException("Failed to query user records", sqlEx);
    }
}

class UserService {
    private final UserRepository repo = new UserRepository();
    public void loadProfile(String id) {
        try {
            repo.findUserById(id);
        } catch (DatabaseException e) {
            // Exception translation with root cause preserved:
            throw new UserNotFoundException("Unable to load profile for user " + id, e);
        }
    }
}

public class ExceptionTranslationDemo {
    public static void main(String[] args) {
        UserService service = new UserService();
        try {
            service.loadProfile("usr_42");
        } catch (UserNotFoundException e) {
            System.out.println("Top-level exception: " + e.getMessage());
            System.out.println("Immediate cause: " + e.getCause().getMessage());
            System.out.println("Root cause: " + e.getCause().getCause().getMessage());
        }
    }
}`,
        output: `Top-level exception: Unable to load profile for user usr_42
Immediate cause: Failed to query user records
Root cause: Connection refused by PostgreSQL on port 5432`
      },
      {
        title: 'Safe Root-Cause Traversal Utility',
        description: 'Implementing an iterative root-cause finder that guards against cyclic exception causes.',
        code: `import java.util.*;

public class RootCauseFinder {
    public static Throwable getRootCause(Throwable throwable) {
        if (throwable == null) return null;
        Throwable root = throwable;
        Set<Throwable> visited = new HashSet<>();
        while (root.getCause() != null && !visited.contains(root.getCause())) {
            visited.add(root);
            root = root.getCause();
        }
        return root;
    }

    public static void main(String[] args) {
        Exception level3 = new IllegalArgumentException("Invalid port: -1");
        Exception level2 = new IllegalStateException("Config error", level3);
        Exception level1 = new RuntimeException("Server failed to boot", level2);

        Throwable root = getRootCause(level1);
        System.out.println("Root Cause Type: " + root.getClass().getSimpleName());
        System.out.println("Root Cause Message: " + root.getMessage());
    }
}`,
        output: `Root Cause Type: IllegalArgumentException
Root Cause Message: Invalid port: -1`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Destructive wrapping: throw new CustomException(e.getMessage())',
        whyItHappens: 'Beginners pass the string message of the caught exception into the new exception, forgetting to pass the exception object itself.',
        howToFix: 'Always pass the caught exception `e` as the cause: `throw new CustomException("High-level message", e);`.'
      },
      {
        mistake: 'Log and Throw: logging the exception inside every catch block and then rethrowing it',
        whyItHappens: 'Developers feel they must log errors immediately where caught "just in case", but then rethrow for the caller.',
        howToFix: 'Follow the single responsibility principle for errors: either handle and log the exception at the application boundary, OR rethrow it. Never do both in intermediate layers.'
      },
      {
        mistake: 'Using exceptions for routine control flow (e.g. breaking loops or checking validation)',
        whyItHappens: 'It seems convenient to let an exception trigger an exit rather than passing return values or booleans.',
        howToFix: 'Use standard if-else validation and return types (like Optional). Exceptions require JVM thread stack frame walking, making them orders of magnitude slower than conditional checks.'
      },
      {
        mistake: 'Swallowing exceptions with an empty catch block or just e.printStackTrace()',
        whyItHappens: 'Developers catch checked exceptions just to appease the compiler and leave the body blank or with a simple print.',
        howToFix: 'Never leave catch blocks empty. If you cannot recover, rethrow as an unchecked exception (`throw new RuntimeException(e)`) or log an actionable error.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Inspecting the Immediate Cause',
        problemStatement: 'What does this program print?',
        code: `import java.io.IOException;

class ServiceException extends RuntimeException {
    public ServiceException(String msg, Throwable cause) {
        super(msg, cause);
    }
}

public class Puzzle1 {
    public static void main(String[] args) {
        try {
            try {
                throw new IOException("Disk Full");
            } catch (IOException e) {
                throw new ServiceException("Storage Service Unavailable", e);
            }
        } catch (ServiceException e) {
            System.out.print(e.getClass().getSimpleName() + " caused by " + e.getCause().getClass().getSimpleName());
        }
    }
}`,
        options: [
            'A) ServiceException caused by ServiceException',
            'B) ServiceException caused by IOException',
            'C) IOException caused by ServiceException',
            'D) ServiceException caused by null'
        ],
        correctOptionIndex: 1,
        hint: 'The ServiceException was constructed with the IOException instance as its cause parameter.',
        solution: 'Option B is correct: ServiceException caused by IOException',
        explanation: 'When ServiceException is instantiated with `e` (an IOException), `e.getCause()` returns that IOException instance. `e.getClass().getSimpleName()` is "ServiceException", and `e.getCause().getClass().getSimpleName()` is "IOException".'
      },
      {
        title: 'Puzzle 2: Destructive Wrapping vs Chained Wrapping',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle2 {
    public static void main(String[] args) {
        Exception original = new IllegalArgumentException("Bad input");
        RuntimeException chained = new RuntimeException("Wrapper", original);
        RuntimeException unchained = new RuntimeException(original.getMessage());

        System.out.print((chained.getCause() != null) + ":" + (unchained.getCause() != null));
    }
}`,
        options: [
            'A) true:true',
            'B) true:false',
            'C) false:false',
            'D) false:true'
        ],
        correctOptionIndex: 1,
        hint: 'Does passing a String message initialize the cause field of Throwable?',
        solution: 'Option B is correct: true:false',
        explanation: '`chained` was constructed passing `original` as a Throwable cause, so `chained.getCause()` is non-null (`true`). `unchained` was constructed passing only `original.getMessage()` (a String), which calls `RuntimeException(String)`, leaving cause initialized to null (`false`). This illustrates destructive wrapping.'
      },
      {
        title: 'Puzzle 3: Finding the Root Cause in a Triple Wrap',
        problemStatement: 'What does this code print as the root cause message?',
        code: `public class Puzzle3 {
    public static void main(String[] args) {
        Exception e1 = new Exception("Root");
        Exception e2 = new Exception("Middle", e1);
        Exception e3 = new Exception("Top", e2);

        Throwable current = e3;
        while (current.getCause() != null) {
            current = current.getCause();
        }
        System.out.print(current.getMessage());
    }
}`,
        options: [
            'A) Top',
            'B) Middle',
            'C) Root',
            'D) null'
        ],
        correctOptionIndex: 2,
        hint: 'Follow the cause chain from e3 -> e2 -> e1.',
        solution: 'Option C is correct: Root',
        explanation: 'e3`s cause is e2; e2`s cause is e1; e1 has no cause (`getCause() == null`). The loop terminates when current is e1, printing "Root".'
      },
      {
        title: 'Puzzle 4: Calling initCause Twice',
        problemStatement: 'What exception is thrown when initCause() is invoked twice on the same Throwable?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        Exception e = new Exception("Base");
        e.initCause(new IllegalArgumentException());
        try {
            e.initCause(new IllegalStateException());
        } catch (Exception ex) {
            System.out.print(ex.getClass().getSimpleName());
        }
    }
}`,
        options: [
            'A) IllegalArgumentException',
            'B) IllegalStateException',
            'C) NullPointerException',
            'D) UnsupportedOperationException'
        ],
        correctOptionIndex: 1,
        hint: 'The Throwable.initCause() contract states that cause can only be set once.',
        solution: 'Option B is correct: IllegalStateException',
        explanation: 'According to the Javadoc for `Throwable.initCause()`, an `IllegalStateException` is thrown if the cause has already been set (either via constructor or a previous call to initCause).'
      },
      {
        title: 'Puzzle 5: Checked vs Unchecked Custom Exception Compilation',
        problemStatement: 'Which line fails to compile?',
        code: `class CustomChecked extends Exception {}
class CustomUnchecked extends RuntimeException {}

public class Puzzle5 {
    // Line 1: public static void methodA() throws CustomChecked { throw new CustomChecked(); }
    // Line 2: public static void methodB() { throw new CustomUnchecked(); }
    // Line 3: public static void methodC() { throw new CustomChecked(); }
    // Line 4: public static void methodD() throws CustomUnchecked { throw new CustomUnchecked(); }
}`,
        options: [
            'A) Line 1',
            'B) Line 2',
            'C) Line 3',
            'D) Line 4'
        ],
        correctOptionIndex: 2,
        hint: 'Checked exceptions must be declared in throws or caught.',
        solution: 'Option C is correct: Line 3',
        explanation: 'CustomChecked extends Exception (making it a checked exception). Throwing it in methodC() without a `throws CustomChecked` clause or an enclosing try-catch block causes a compilation error: "unreported exception CustomChecked; must be caught or declared to be thrown".'
      },
      {
        title: 'Puzzle 6: Finally Return Discards Custom Exception',
        problemStatement: 'What is the console output of this code?',
        code: `class OrderFailedException extends RuntimeException {
    public OrderFailedException(String msg) { super(msg); }
}

public class Puzzle6 {
    public static String processOrder() {
        try {
            throw new OrderFailedException("Out of stock");
        } finally {
            return "DEFAULT_ORDER";
        }
    }

    public static void main(String[] args) {
        System.out.print(processOrder());
    }
}`,
        options: [
            'A) Throws OrderFailedException: Out of stock',
            'B) DEFAULT_ORDER',
            'C) Compilation Error',
            'D) null'
        ],
        correctOptionIndex: 1,
        hint: 'Executing a return inside a finally block silently suppresses any unhandled exception thrown in try.',
        solution: 'Option B is correct: DEFAULT_ORDER',
        explanation: 'Returning from a finally block discards any pending unhandled exception (OrderFailedException). The method returns "DEFAULT_ORDER" normally. This is one of the classic deadly anti-patterns.'
      },
      {
        title: 'Puzzle 7: Reading Custom Exception Metadata',
        problemStatement: 'What does this program print?',
        code: `class ApiError extends RuntimeException {
    private final int statusCode;
    public ApiError(int statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }
    public int getStatusCode() { return statusCode; }
}

public class Puzzle7 {
    public static void main(String[] args) {
        try {
            throw new ApiError(404, "Resource Not Found");
        } catch (RuntimeException e) {
            if (e instanceof ApiError apiErr) {
                System.out.print(apiErr.getStatusCode() + ":" + apiErr.getMessage());
            }
        }
    }
}`,
        options: [
            'A) 404:Resource Not Found',
            'B) RuntimeException:404',
            'C) Resource Not Found:404',
            'D) Compilation error on pattern matching'
        ],
        correctOptionIndex: 0,
        hint: 'Pattern matching for instanceof binds apiErr and accesses its strongly-typed properties.',
        solution: 'Option A is correct: 404:Resource Not Found',
        explanation: 'e is an instance of ApiError. In modern Java, pattern matching binds `apiErr`. `apiErr.getStatusCode()` returns 404 and `apiErr.getMessage()` returns "Resource Not Found".'
      },
      {
        title: 'Puzzle 8: Multi-catch with Custom Subclass Hierarchy',
        problemStatement: 'What is the compilation outcome of this catch block ordering?',
        code: `class DomainException extends RuntimeException {}
class ValidationException extends DomainException {}

public class Puzzle8 {
    public static void main(String[] args) {
        try {
            throw new ValidationException();
        } catch (DomainException e) {
            System.out.print("Domain ");
        } catch (ValidationException e) {
            System.out.print("Validation ");
        }
    }
}`,
        options: [
            'A) Prints "Domain "',
            'B) Prints "Validation "',
            'C) Compilation Error: exception ValidationException has already been caught',
            'D) Prints "Domain Validation "'
        ],
        correctOptionIndex: 2,
        hint: 'Subclasses must always precede superclasses in sequential catch blocks.',
        solution: 'Option C is correct: Compilation Error',
        explanation: 'Because `ValidationException` is a subclass of `DomainException`, the first catch block (`DomainException e`) will catch all ValidationException instances. The second catch block is unreachable, causing a compile-time error: "exception ValidationException has already been caught".'
      },
      {
        title: 'Puzzle 9: Cause vs Suppressed Distinction',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle9 {
    public static void main(String[] args) {
        Exception causeEx = new Exception("TheCause");
        Exception suppEx = new Exception("TheSuppressed");
        Exception mainEx = new Exception("Main", causeEx);
        mainEx.addSuppressed(suppEx);

        System.out.print(mainEx.getCause().getMessage() + ":" + mainEx.getSuppressed()[0].getMessage());
    }
}`,
        options: [
            'A) TheCause:TheSuppressed',
            'B) TheSuppressed:TheCause',
            'C) Main:TheCause',
            'D) TheCause:Main'
        ],
        correctOptionIndex: 0,
        hint: 'getCause() returns the underlying trigger passed to constructor/initCause; getSuppressed() returns attached side-effect exceptions.',
        solution: 'Option A is correct: TheCause:TheSuppressed',
        explanation: '`mainEx.getCause()` returns `causeEx` whose message is "TheCause". `mainEx.getSuppressed()[0]` returns `suppEx` whose message is "TheSuppressed".'
      },
      {
        title: 'Puzzle 10: Stack Trace Cost with writableStackTrace Flag',
        problemStatement: 'What does setting writableStackTrace to false achieve?',
        code: `class FastException extends RuntimeException {
    public FastException(String msg) {
        super(msg, null, false, false);
    }
}`,
        options: [
            'A) Prevents the exception from being caught in catch blocks',
            'B) Bypasses thread stack frame capture, making instantiation dramatically faster',
            'C) Causes the exception message to be encrypted in memory',
            'D) Makes the exception impossible to serialize'
        ],
        correctOptionIndex: 1,
        hint: 'What does Throwable.fillInStackTrace() do by default?',
        solution: 'Option B is correct: Bypasses thread stack frame capture',
        explanation: 'The protected 4-argument constructor `Throwable(message, cause, enableSuppression, writableStackTrace)` allows setting `writableStackTrace = false`. This skips the expensive native `fillInStackTrace()` thread walk, allowing high-throughput systems to create lightweight exceptions with minimal CPU overhead.'
      }
    ],
    interviewQuestions: [
      {
        question: 'When should you create custom exceptions instead of using standard Java exceptions like IllegalArgumentException or IllegalStateException?',
        answer: 'You should prefer standard JDK exceptions whenever their semantics fit accurately (e.g. `IllegalArgumentException` for illegal arguments, `IllegalStateException` for method invocation in an invalid state, `UnsupportedOperationException` for unmodifiable collections). You should create a custom exception only when: 1) Domain Specificity: The exception represents a distinct business concept that callers need to handle selectively (e.g. `InsufficientFundsException`, `InventoryExpiredException`). 2) Rich Contextual Metadata: You need to attach strongly-typed diagnostic attributes (e.g. `userId`, `orderId`, `errorCode`, `retryAfter`) that calling services can query without fragile string parsing. 3) Routing & Error Mapping: Enterprise frameworks (like Spring `@ExceptionHandler`) need to map specific custom exception classes to distinct HTTP response codes (e.g. `ResourceNotFoundException` -> 404, `PaymentDeclinedException` -> 402).',
        followUp: 'What is the risk of creating too many custom exceptions?',
        followUpAnswer: 'Class explosion and API clutter. Having a custom exception for every minor failure mode forces developers to maintain hundreds of redundant classes that provide zero diagnostic value beyond standard exceptions.',
        keyPhrases: [
          'Prefer standard exceptions when semantics align',
          'Create custom exceptions for domain-specific business rules',
          'Attach strongly-typed diagnostic attributes and metadata',
          'Enables granular catch handling and HTTP status mapping',
          'Avoid class explosion for generic errors'
        ],
        commonMistakeAnswer: 'Creating a custom exception for every single method error regardless of whether standard exceptions exist.'
      },
      {
        question: 'Should custom domain exceptions extend Exception (checked) or RuntimeException (unchecked)? What is the modern industry consensus?',
        answer: 'The overwhelming modern industry consensus (embraced by Spring, Hibernate, Google Guava, and cloud microservices) is that custom domain exceptions should almost always extend `RuntimeException` (unchecked). Reasons: 1) Decoupling & Clean Architecture: Checked exceptions force `throws` declarations in interface signatures, leaking implementation details across layer boundaries. 2) Functional Programming Compatibility: Java 8+ functional interfaces (`Function`, `Consumer`, `Predicate`, `Supplier`) and Stream pipelines do not allow checked exceptions, forcing ugly try-catch wrapping inside lambdas. 3) Recoverability Reality: In modern distributed architectures, most runtime failures (database down, service timeout, optimistic lock failure) cannot be recovered by the immediate caller; they propagate to a centralized global error handler. Checked exceptions should only be used in rare standalone libraries where the caller is strictly required and genuinely capable of immediate in-process recovery.',
        followUp: 'How do you document unchecked exceptions if they are not in the method throws signature?',
        followUpAnswer: 'Use Javadoc @throws tags: `/** @throws InsufficientFundsException if balance < amount */`. This provides full IDE auto-complete documentation without forcing callers into boilerplate try-catch blocks.',
        keyPhrases: [
          'Modern consensus prefers RuntimeException (unchecked)',
          'Checked exceptions leak implementation details across layer boundaries',
          'Checked exceptions break Java Stream lambdas and functional interfaces',
          'Most production errors are unrecoverable by the immediate caller',
          'Document unchecked exceptions using Javadoc @throws tags'
        ],
        commonMistakeAnswer: 'Insisting that all business exceptions must be checked because "business errors are recoverable".'
      },
      {
        question: 'What are the four canonical constructors every custom exception class should provide, and why?',
        answer: 'A production-grade custom exception should provide four standard constructors mirroring `java.lang.Throwable`: 1) `public CustomException()` (no-arg constructor, useful for serialization/reflection), 2) `public CustomException(String message)` (descriptive explanation of the failure), 3) `public CustomException(String message, Throwable cause)` (message plus chained underlying exception), and 4) `public CustomException(Throwable cause)` (wrapping a root cause when a custom message is unnecessary). Providing all four ensures compatibility with reflection frameworks, standard exception handling idioms, and guaranteed chaining support so callers can always preserve the underlying root cause.',
        followUp: 'What additional constructor was added in Java 7 for advanced use cases?',
        followUpAnswer: 'The 4-argument protected constructor `protected CustomException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)`. It allows subclasses to disable stack trace generation for high-performance exceptions.',
        keyPhrases: [
          'Four canonical constructors mirroring Throwable',
          'No-arg, String message, String message + Throwable cause, Throwable cause',
          'Enables clean exception chaining and serialization',
          'Compatibility with enterprise frameworks and reflection'
        ],
        commonMistakeAnswer: 'Only creating a single constructor with String message and omitting the constructor that accepts a Throwable cause.'
      },
      {
        question: 'What is exception chaining, and why is "throw new ServiceException(e.getMessage())" considered a catastrophic anti-pattern?',
        answer: 'Exception chaining is the mechanism of linking a high-level exception to the low-level exception that caused it via `Throwable.initCause()` or the `Throwable(String, Throwable)` constructor. Writing `throw new ServiceException(e.getMessage())` is a catastrophic anti-pattern known as "Destructive Wrapping" or "Root Cause Obliteration". It creates a brand-new exception containing only the string message of `e`, but sets `cause` to `null`. As a result, the entire stack trace of `e`, the exact file and line number where the original failure occurred, and any underlying nested causes are permanently erased from memory! When debugging production outages, on-call engineers see a generic message like "Connection timeout" originating from the Service catch block, with zero visibility into which database, host, or query actually failed.',
        followUp: 'How do you fix destructive wrapping?',
        followUpAnswer: 'Always pass the caught exception e directly as the second argument: `throw new ServiceException("High-level context: " + id, e);`.',
        keyPhrases: [
          'Exception chaining preserves root cause and nested stack traces',
          'Destructive wrapping obliterates file and line numbers of the original bug',
          'e.getMessage() only copies text, discarding Throwable metadata',
          'Always pass e as the cause parameter: super(message, e)',
          'Essential for observability and production root cause analysis'
        ],
        commonMistakeAnswer: 'Believing that copying e.getMessage() into the new exception preserves the original exception.'
      },
      {
        question: 'Explain the "Log and Throw" anti-pattern. Why is it harmful in production distributed systems?',
        answer: 'The "Log and Throw" anti-pattern occurs when an intermediate method catches an exception, logs it with `logger.error(...)`, and then immediately rethrows that exception (or a wrapped version of it) to its caller. In a typical layered architecture (Database -> Repository -> Service -> Controller), if every layer logs and rethrows, a single database glitch generates 4 to 5 identical, massive multi-line stack traces in the centralized log aggregator (Elasticsearch, Splunk, CloudWatch). This causes: 1) Log spam that drowns out other critical events, 2) Distorted telemetry and alerting metrics (alerting systems see 5 errors instead of 1), 3) Massive cloud logging ingestion costs, and 4) Confusion for debugging engineers trying to determine if there were five separate incidents or just one. The golden rule is: EITHER log the exception, OR rethrow it to the caller. Never do both.',
        followUp: 'Where should exceptions ultimately be logged?',
        followUpAnswer: 'At the application boundary (e.g. Global Controller Advice, RPC interceptor, or top-level message queue consumer) once handling has terminated.',
        keyPhrases: [
          'Log and Throw anti-pattern',
          'Duplicate log spam across architectural layers',
          'Skewed error metrics and alert thresholds',
          'Excessive cloud logging ingestion costs',
          'Single responsibility: either handle and log, OR rethrow'
        ],
        commonMistakeAnswer: 'Defending logging in every catch block as "better safe than sorry".'
      },
      {
        question: 'What is the performance cost of throwing exceptions in Java? Why should exceptions never be used for control flow?',
        answer: 'Exceptions in Java are computationally expensive. The primary overhead is NOT the `throw` statement or the `try-catch` block (which has zero overhead when no exception is thrown due to JVM zero-cost exception tables). The massive bottleneck is the constructor invocation of `Throwable.fillInStackTrace()`. This native JVM call walks the operating system thread execution stack, capturing class names, method names, source files, and line numbers for every frame currently on the call stack. In deep call stacks (e.g. Spring, Hibernate, Tomcat with 50-80 frames), instantiating an exception can take 100 to 1,000 times longer than creating a normal Java object or evaluating an `if` condition. Using exceptions for routine control flow (e.g., catching `NoSuchElementException` to detect the end of an iterator, or `NumberFormatException` to validate user input) completely decimates application throughput.',
        followUp: 'How should you implement input validation instead of catching NumberFormatException?',
        followUpAnswer: 'Use regex or character-by-character checks before parsing, or use dedicated parsing utilities that return Optional without throwing.',
        keyPhrases: [
          'Primary cost is native Throwable.fillInStackTrace()',
          'Thread stack walking through 50+ frames is CPU intensive',
          'Zero-cost exception tables have 0 overhead when no exception is thrown',
          'Exceptions are 100x to 1000x slower than conditional checks',
          'Never use exceptions for normal control flow or loop termination'
        ],
        commonMistakeAnswer: 'Thinking try blocks slow down execution even when exceptions are not thrown.'
      },
      {
        question: 'What is the purpose of the 4-argument protected constructor Throwable(String, Throwable, boolean enableSuppression, boolean writableStackTrace)?',
        answer: 'Added in Java 7, this constructor allows fine-grained control over two internal mechanisms: 1) `enableSuppression`: When `false`, calls to `addSuppressed()` on this exception are ignored, conserving memory when suppression tracking is unwanted. 2) `writableStackTrace`: When `false`, the native JVM skips `fillInStackTrace()` during instantiation. The exception stack trace remains empty (`getStackTrace()` returns an empty array). In ultra-high-throughput systems (such as financial trade matching engines, Akka actors, or rate-limiting filters) where custom exceptions represent expected rejection signals rather than code bugs, creating exceptions with `writableStackTrace = false` reduces allocation latency down to the cost of a standard POJO allocation.',
        followUp: 'Are there any downsides to setting writableStackTrace = false?',
        followUpAnswer: 'Yes: you lose the file and line number trace in logs, making code defect debugging impossible if used for unexpected bugs.',
        keyPhrases: [
          'writableStackTrace = false bypasses fillInStackTrace()',
          'Eliminates native stack frame capture overhead',
          'Near-zero latency exception instantiation',
          'Used for expected control signals in high-throughput architectures',
          'enableSuppression controls suppressed exception recording'
        ],
        commonMistakeAnswer: 'Assuming this constructor is only for internal JDK classes and cannot be used by custom exceptions.'
      },
      {
        question: 'How do you traverse an exception chain to reliably find the root cause in production troubleshooting?',
        answer: 'To find the root cause, you iterate through the cause chain using `getCause()` until you reach the deepest non-null `Throwable`. However, a production-grade utility MUST protect against circular references (where an exception mistakenly points to itself or an ancestor as its cause, causing an infinite loop). A safe implementation maintains a `Set<Throwable> visited = new HashSet<>()`. On each iteration, it checks `if (cause != null && !visited.contains(cause))`. When the loop finishes, the last visited exception is the true root cause. In enterprise production code, developers typically leverage standard utilities like `org.apache.commons.lang3.exception.ExceptionUtils.getRootCause(e)`.',
        followUp: 'Can an exception have both a cause and suppressed exceptions simultaneously?',
        followUpAnswer: 'Yes! An exception can have a single root cause (getCause()) explaining why it was thrown, and multiple suppressed exceptions (getSuppressed()) from secondary cleanup failures during try-with-resources.',
        keyPhrases: [
          'Iterate getCause() until null',
          'Defensive cycle detection with Set<Throwable>',
          'Prevents infinite loops from corrupted cause chains',
          'ExceptionUtils.getRootCause() from Apache Commons',
          'Cause is the trigger; suppressed are side-effect cleanup errors'
        ],
        commonMistakeAnswer: 'Writing a naive while(e.getCause() != null) without cycle detection.'
      },
      {
        question: 'What is Exception Translation (Wrapping), and how does it uphold clean architecture and encapsulation between layers?',
        answer: 'Exception Translation is the architectural pattern where a higher layer catches a low-level, implementation-specific exception and rethrows a higher-level domain-specific exception that is appropriate for that layer`s abstraction level, chaining the original exception as the cause. For example, a `UserRepository` should not leak `java.sql.SQLException` to the `OrderService`. If it did, the service layer would become tightly coupled to relational database drivers! If the repository is later migrated to MongoDB, all service method signatures would break. By translating `SQLException` or `MongoException` into `DataAccessException`, the repository maintains clean encapsulation: callers only depend on the data access abstraction, not on volatile driver implementations.',
        followUp: 'Who formalized this rule?',
        followUpAnswer: 'Joshua Bloch in Effective Java Item 73: "Throw exceptions appropriate to the abstraction".',
        keyPhrases: [
          'Translates low-level implementation exceptions to high-level domain exceptions',
          'Preserves encapsulation across architectural layers',
          'Prevents leaking driver specifics (SQLException, MongoException) to business logic',
          'Effective Java Item 73: Throw exceptions appropriate to the abstraction',
          'Always chain original exception as cause'
        ],
        commonMistakeAnswer: 'Letting low-level database exceptions leak straight through to the web controller.'
      },
      {
        question: 'Why is catching Throwable or Error dangerous, and what exceptions must almost never be caught in application code?',
        answer: 'Catching `Throwable` catches both `java.lang.Exception` and `java.lang.Error`. `Error` represents serious, unrecoverable JVM conditions that ordinary applications should not attempt to handle (e.g. `OutOfMemoryError`, `StackOverflowError`, `InternalError`, `VirtualMachineError`, `UnknownError`). When an `OutOfMemoryError` occurs, the JVM heap is corrupted or exhausted; catching it and continuing to execute causes undefined behavior, thread death, corrupted data state, and deadlocks. Additionally, catching `Throwable` indiscriminately intercepts `InterruptedException`, which silently breaks thread pool cooperative shutdown signals. Application code should only catch specific domain or checked exceptions, or at most `Exception` at the outermost boundary. `Error` and `Throwable` must be allowed to propagate to crash the process or let the JVM supervisor trigger failover.',
        followUp: 'Is there any valid scenario to catch Throwable?',
        followUpAnswer: 'Only at the top-level loop of a thread pool worker or supervisory framework (e.g. Akka/Netty) to log the fatal error before safely restarting or terminating the worker thread.',
        keyPhrases: [
          'Error represents unrecoverable JVM state (OutOfMemoryError, StackOverflowError)',
          'Catching Error leads to data corruption and deadlocks',
          'Swallowing InterruptedException breaks cooperative cancellation',
          'Catch specific exceptions; never catch Throwable in application logic',
          'Allow fatal errors to propagate to supervisor or container failover'
        ],
        commonMistakeAnswer: 'Writing catch(Throwable t) in business services thinking it makes the application "crash-proof".'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the recommended base class for custom business exceptions in modern enterprise Java?',
        options: [
          'java.lang.Throwable',
          'java.lang.Exception',
          'java.lang.RuntimeException',
          'java.lang.Error'
        ],
        correctIndex: 2,
        explanation: 'RuntimeException (unchecked) is the modern standard for custom domain exceptions because it avoids leaking implementation details into method signatures and works seamlessly with lambdas.'
      },
      {
        question: 'What happens if you wrap an exception with: throw new CustomException(e.getMessage()); ?',
        options: [
          'The cause is automatically linked via e.getMessage()',
          'The original stack trace and root cause are permanently lost (Destructive Wrapping)',
          'A compilation error occurs',
          'The JVM converts it into a checked exception'
        ],
        correctIndex: 1,
        explanation: 'Passing only e.getMessage() passes a String, not the Throwable. The cause remains null and the original stack trace is completely lost.'
      },
      {
        question: 'What exception is thrown if initCause() is called on an exception whose cause was already established?',
        options: [
          'IllegalArgumentException',
          'IllegalStateException',
          'UnsupportedOperationException',
          'NullPointerException'
        ],
        correctIndex: 1,
        explanation: 'Throwable.initCause() throws IllegalStateException if the cause has already been set.'
      },
      {
        question: 'What is the primary harm of the "Log and Throw" anti-pattern?',
        options: [
          'The exception cannot be caught by callers',
          'It creates multiple duplicate stack traces in logs for a single error across layers',
          'It causes a memory leak in Logback',
          'It converts unchecked exceptions into checked exceptions'
        ],
        correctIndex: 1,
        explanation: 'Logging at every layer before rethrowing spams log aggregators with redundant duplicate stack traces for a single failure.'
      },
      {
        question: 'Why are exceptions extremely expensive to use for routine control flow in Java?',
        options: [
          'Try blocks disable the JIT compiler',
          'Throwable.fillInStackTrace() must walk the native thread call stack frames',
          'Exceptions consume 1MB of memory per instance',
          'Catch blocks lock the classloader'
        ],
        correctIndex: 1,
        explanation: 'The native call to fillInStackTrace() walks the execution stack frames, which is computationally expensive compared to simple conditional branches.'
      },
      {
        question: 'Which standard JDK exception should be thrown when a method argument is null and null is forbidden?',
        options: [
          'IllegalArgumentException or NullPointerException',
          'IllegalStateException',
          'NoSuchElementException',
          'UnsupportedOperationException'
        ],
        correctIndex: 0,
        explanation: 'NullPointerException (standard via Objects.requireNonNull) or IllegalArgumentException is standard for null arguments.'
      },
      {
        question: 'What does setting writableStackTrace = false do in a custom exception constructor?',
        options: [
          'Prevents anyone from logging the exception message',
          'Bypasses the expensive thread stack capture, creating lightweight exceptions',
          'Makes the exception checked',
          'Automatically suppresses all other exceptions'
        ],
        correctIndex: 1,
        explanation: 'Setting writableStackTrace to false skips fillInStackTrace(), making exception creation nearly as fast as ordinary object allocation.'
      },
      {
        question: 'What architectural practice involves catching a low-level SQLException and rethrowing a high-level DataAccessException?',
        options: [
          'Exception Masking',
          'Exception Translation (Wrapping)',
          'Exception Suppression',
          'Destructive Wrapping'
        ],
        correctIndex: 1,
        explanation: 'Exception Translation converts low-level implementation exceptions into domain-appropriate exceptions while preserving the cause.'
      },
      {
        question: 'Which of the following is considered an unrecoverable JVM error that application code should NOT catch?',
        options: [
          'IllegalArgumentException',
          'OutOfMemoryError',
          'IOException',
          'SQLException'
        ],
        correctIndex: 1,
        explanation: 'OutOfMemoryError is a subclass of Error representing fatal JVM memory exhaustion that ordinary applications cannot safely recover from.'
      },
      {
        question: 'What does e.getCause() return if an exception was constructed with no cause specified?',
        options: [
          'e itself',
          'new Throwable()',
          'null',
          'An empty array'
        ],
        correctIndex: 2,
        explanation: 'If no cause was supplied during construction or via initCause(), getCause() returns null.'
      }
    ]
  }
};
