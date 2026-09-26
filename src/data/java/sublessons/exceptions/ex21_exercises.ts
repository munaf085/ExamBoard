import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 21: EXCEPTION HANDLING (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 21.1 - 21.4
// Authoritative FAANG-Standard Java Exception Handling Curriculum
// ============================================================

export const ex21Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 21.1: Throwable Hierarchy, Checked vs. Unchecked Exceptions ───────────────────
  'throwable-hierarchy-checked-unchecked': [
    {
      id: 'ex-21-1-ex1',
      title: 'Checked Exception Propagation with throws',
      problemStatement: 'Implement a file configuration parser utility `readFileConfig(String path)` that declares checked exceptions `throws FileNotFoundException, IOException`. If the path is empty, throw `FileNotFoundException`; if the file extension is unsupported, throw `IOException`. Handle both checked exceptions in `main` with dedicated catch blocks.',
      hint: 'Use the `throws` keyword in the method signature to propagate checked exceptions up to the calling method.',
      solutionCode: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
    static void readFileConfig(String path) throws FileNotFoundException, IOException {
        if (path == null || path.isEmpty()) {
            throw new FileNotFoundException("Path cannot be empty: " + path);
        }
        if (!path.endsWith(".json") && !path.endsWith(".xml")) {
            throw new IOException("Unsupported file format: " + path);
        }
        System.out.println("Config loaded successfully from: " + path);
    }

    public static void main(String[] args) {
        String[] testPaths = {"app.json", "", "database.txt"};
        for (String path : testPaths) {
            try {
                readFileConfig(path);
            } catch (FileNotFoundException e) {
                System.out.println("Caught FileNotFoundException: " + e.getMessage());
            } catch (IOException e) {
                System.out.println("Caught IOException: " + e.getMessage());
            }
        }
    }
}`,
      output: `Config loaded successfully from: app.json
Caught FileNotFoundException: Path cannot be empty: 
Caught IOException: Unsupported file format: database.txt`,
      explanation: 'Checked exceptions in Java extend Exception (excluding RuntimeException) and must either be caught locally or declared in the method signature using the throws keyword. This compile-time check enforces robust error handling at API boundaries.'
    },
    {
      id: 'ex-21-1-ex2',
      title: 'Defensive Validation with IllegalArgumentException',
      problemStatement: 'Create a `UserProfile` domain class that validates constructor arguments defensively. Throw an unchecked `IllegalArgumentException` with descriptive error messages when `username` is blank, `age` is negative or above 150, or `salary` is negative. Test both successful creation and validation failures.',
      hint: 'Throw `new IllegalArgumentException(...)` when method arguments fail precondition validation checks.',
      solutionCode: `public class Main {
    static class UserProfile {
        private final String username;
        private final int age;
        private final double salary;

        public UserProfile(String username, int age, double salary) {
            if (username == null || username.trim().isEmpty()) {
                throw new IllegalArgumentException("Username cannot be null or empty");
            }
            if (age < 0 || age > 150) {
                throw new IllegalArgumentException("Invalid age: " + age + ". Age must be between 0 and 150");
            }
            if (salary < 0.0) {
                throw new IllegalArgumentException("Salary cannot be negative: " + salary);
            }
            this.username = username;
            this.age = age;
            this.salary = salary;
        }

        @Override
        public String toString() {
            return "UserProfile[name=" + username + ", age=" + age + ", salary=" + salary + "]";
        }
    }

    public static void main(String[] args) {
        try {
            UserProfile user1 = new UserProfile("Alice", 28, 95000.0);
            System.out.println("Created: " + user1);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            UserProfile user2 = new UserProfile("Bob", -5, 50000.0);
            System.out.println("Created: " + user2);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            UserProfile user3 = new UserProfile("Charlie", 35, -1200.0);
            System.out.println("Created: " + user3);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
      output: `Created: UserProfile[name=Alice, age=28, salary=95000.0]
Error: Invalid age: -5. Age must be between 0 and 150
Error: Salary cannot be negative: -1200.0`,
      explanation: 'IllegalArgumentException is an unchecked exception extending RuntimeException. It is idiomatic in Java for enforcing method and constructor preconditions (fail-fast principle), eliminating the need for boilerplate throws declarations.'
    },
    {
      id: 'ex-21-1-ex3',
      title: 'NullPointerException Prevention and Explicit Handling',
      problemStatement: 'Build a name formatter demonstrating two null-handling approaches: (1) fail-fast defensive parameter checking using `java.util.Objects.requireNonNull(str, message)` which throws an explicit `NullPointerException`, and (2) safe fallback handling using null checks to prevent crashes.',
      hint: '`Objects.requireNonNull()` enforces non-null invariants immediately at method boundaries.',
      solutionCode: `import java.util.Objects;

public class Main {
    static String formatNameFailFast(String firstName, String lastName) {
        Objects.requireNonNull(firstName, "First name cannot be null");
        Objects.requireNonNull(lastName, "Last name cannot be null");
        return firstName.toUpperCase() + " " + lastName.toUpperCase();
    }

    static String formatNameSafeDefault(String firstName, String lastName) {
        String first = (firstName != null) ? firstName.trim() : "ANONYMOUS";
        String last = (lastName != null) ? lastName.trim() : "USER";
        return first + " " + last;
    }

    public static void main(String[] args) {
        System.out.println("Safe 1: " + formatNameSafeDefault("Grace", "Hopper"));
        System.out.println("Safe 2: " + formatNameSafeDefault(null, "Lovelace"));

        try {
            formatNameFailFast("Alan", null);
        } catch (NullPointerException e) {
            System.out.println("Caught Fail-Fast NPE: " + e.getMessage());
        }
    }
}`,
      output: `Safe 1: Grace Hopper
Safe 2: ANONYMOUS Lovelace
Caught Fail-Fast NPE: Last name cannot be null`,
      explanation: 'Objects.requireNonNull provides a clean, standardized fail-fast mechanism that isolates null pointer bugs at their point of origin rather than letting them propagate deep into business logic.'
    },
    {
      id: 'ex-21-1-ex4',
      title: 'ArithmeticException Handling in Math Utility',
      problemStatement: 'Design a `SafeMath` utility containing `divide(int a, int b)` which triggers an unchecked `ArithmeticException` on division by zero, and `safeDivide(int a, int b, int fallback)` which catches `ArithmeticException` and returns a fallback value.',
      hint: 'In integer arithmetic, dividing any integer by zero triggers `java.lang.ArithmeticException: / by zero`.',
      solutionCode: `public class Main {
    static class SafeMath {
        public static int divide(int numerator, int denominator) {
            return numerator / denominator;
        }

        public static int safeDivide(int numerator, int denominator, int fallback) {
            try {
                return numerator / denominator;
            } catch (ArithmeticException e) {
                return fallback;
            }
        }
    }

    public static void main(String[] args) {
        try {
            int result = SafeMath.divide(100, 0);
            System.out.println("Direct division: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Caught ArithmeticException: " + e.getMessage());
        }

        int valid = SafeMath.safeDivide(42, 7, -1);
        int fallback = SafeMath.safeDivide(42, 0, -1);

        System.out.println("SafeDivide valid: " + valid);
        System.out.println("SafeDivide by zero fallback: " + fallback);
    }
}`,
      output: `Caught ArithmeticException: / by zero
SafeDivide valid: 6
SafeDivide by zero fallback: -1`,
      explanation: 'Integer division by zero causes the JVM to throw ArithmeticException. Encapsulating the operation within a safe utility method allows systems to gracefully fall back to default sentinel values.'
    },
    {
      id: 'ex-21-1-ex5',
      title: 'NumberFormatException Safe Parser',
      problemStatement: 'Build resilient parsing utilities `parseIntOrDefault(String input, int defaultValue)` and `parseDoubleOrDefault(String input, double defaultValue)`. Safely handle null, whitespace, and malformed strings by catching `NumberFormatException` and returning the default value without crashing.',
      hint: 'Catch `NumberFormatException` thrown by `Integer.parseInt()` or `Double.parseDouble()` to protect ingestion pipelines.',
      solutionCode: `public class Main {
    static int parseIntOrDefault(String input, int defaultValue) {
        if (input == null) return defaultValue;
        try {
            return Integer.parseInt(input.trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    static double parseDoubleOrDefault(String input, double defaultValue) {
        if (input == null) return defaultValue;
        try {
            return Double.parseDouble(input.trim());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    public static void main(String[] args) {
        String[] intInputs = {"123", "   456  ", "abc", "", null, "789xyz"};
        for (String input : intInputs) {
            int val = parseIntOrDefault(input, -1);
            System.out.println("Input: [" + input + "] -> Parsed: " + val);
        }

        System.out.println("Double valid: " + parseDoubleOrDefault("3.14159", 0.0));
        System.out.println("Double malformed: " + parseDoubleOrDefault("not_a_float", 0.0));
    }
}`,
      output: `Input: [123] -> Parsed: 123
Input: [   456  ] -> Parsed: 456
Input: [abc] -> Parsed: -1
Input: [] -> Parsed: -1
Input: [null] -> Parsed: -1
Input: [789xyz] -> Parsed: -1
Double valid: 3.14159
Double malformed: 0.0`,
      explanation: 'NumberFormatException occurs when string-to-number conversion fails. Providing fallback defaults in parsing utilities ensures resilient data ingestion across untrusted user input and third-party APIs.'
    },
    {
      id: 'ex-21-1-ex6',
      title: 'ArrayIndexOutOfBoundsException Bounds Checker',
      problemStatement: 'Implement a `SafeArrayAccess` utility method `getElementAt(int[] array, int index)` that accesses an array element inside a `try-catch` block, catching `ArrayIndexOutOfBoundsException` and returning a clear error description indicating the invalid index and array length.',
      hint: '`ArrayIndexOutOfBoundsException` is thrown when an index is negative or greater than or equal to `array.length`.',
      solutionCode: `public class Main {
    static class SafeArrayAccess {
        public static String getElementAt(int[] array, int index) {
            try {
                int value = array[index];
                return "Value at index " + index + ": " + value;
            } catch (ArrayIndexOutOfBoundsException e) {
                int len = (array != null) ? array.length : 0;
                return "Error: Index " + index + " out of bounds for length " + len;
            }
        }
    }

    public static void main(String[] args) {
        int[] scores = {90, 85, 92, 78};
        System.out.println(SafeArrayAccess.getElementAt(scores, 0));
        System.out.println(SafeArrayAccess.getElementAt(scores, 3));
        System.out.println(SafeArrayAccess.getElementAt(scores, 4));
        System.out.println(SafeArrayAccess.getElementAt(scores, -1));
    }
}`,
      output: `Value at index 0: 90
Value at index 3: 78
Error: Index 4 out of bounds for length 4
Error: Index -1 out of bounds for length 4`,
      explanation: 'Java performs automatic array boundary checks at runtime. When an invalid index is accessed, ArrayIndexOutOfBoundsException is thrown. Catching it allows informative diagnostic reporting.'
    },
    {
      id: 'ex-21-1-ex7',
      title: 'ClassCastException Prevention with Pattern Matching and instanceof',
      problemStatement: 'Create a heterogeneous object processor that handles diverse payloads (`String`, `Integer`, `Double`). Demonstrate how an unsafe direct cast throws `ClassCastException`, and demonstrate how type checking with `instanceof` safely prevents cast failures.',
      hint: 'Always verify an object type with `instanceof` before attempting a downcast, or use pattern matching for `instanceof`.',
      solutionCode: `public class Main {
    static void processPayloadUnsafe(Object payload) {
        try {
            String str = (String) payload;
            System.out.println("Direct Cast String length: " + str.length());
        } catch (ClassCastException e) {
            System.out.println("Unsafe Cast Failed: " + e.getMessage());
        }
    }

    static void processPayloadSafe(Object payload) {
        if (payload instanceof String) {
            String s = (String) payload;
            System.out.println("Safe String: " + s.toUpperCase());
        } else if (payload instanceof Integer) {
            Integer n = (Integer) payload;
            System.out.println("Safe Integer squared: " + (n * n));
        } else if (payload instanceof Double) {
            Double d = (Double) payload;
            System.out.println("Safe Double half: " + (d / 2.0));
        } else if (payload == null) {
            System.out.println("Safe Null Payload");
        } else {
            System.out.println("Safe Unknown Type: " + payload.getClass().getSimpleName());
        }
    }

    public static void main(String[] args) {
        processPayloadUnsafe(Integer.valueOf(100));
        processPayloadSafe("faang");
        processPayloadSafe(Integer.valueOf(12));
        processPayloadSafe(Double.valueOf(50.0));
        processPayloadSafe(Boolean.TRUE);
    }
}`,
      output: `Unsafe Cast Failed: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
Safe String: FAANG
Safe Integer squared: 144
Safe Double half: 25.0
Safe Unknown Type: Boolean`,
      explanation: 'Direct downcasting without type verification leads to ClassCastException. Checking types with instanceof protects against invalid memory casting and ensures type safety across polymorphic data.'
    },
    {
      id: 'ex-21-1-ex8',
      title: 'Method Overriding with Checked Exception Covariance',
      problemStatement: 'Demonstrate Java exception covariance in method overriding: superclass `BaseDataService.loadData(String path)` declares `throws IOException`, while subclass `LocalFileDataService` overrides it and declares the narrower subtype `throws FileNotFoundException`. Invoke the method polymorphically.',
      hint: 'An overriding method can declare narrower (subclass) checked exceptions or fewer checked exceptions than the superclass method, but never broader ones.',
      solutionCode: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
    static class BaseDataService {
        public void loadData(String path) throws IOException {
            System.out.println("BaseDataService: loading " + path);
            throw new IOException("Generic I/O issue");
        }
    }

    static class LocalFileDataService extends BaseDataService {
        // Covariance: declares narrower FileNotFoundException instead of IOException
        @Override
        public void loadData(String path) throws FileNotFoundException {
            System.out.println("LocalFileDataService: loading file " + path);
            throw new FileNotFoundException("Local file not found: " + path);
        }
    }

    public static void main(String[] args) {
        BaseDataService service = new LocalFileDataService();
        try {
            service.loadData("config.yaml");
        } catch (FileNotFoundException e) {
            System.out.println("Caught Narrow: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Caught General: " + e.getMessage());
        }
    }
}`,
      output: `LocalFileDataService: loading file config.yaml
Caught Narrow: Local file not found: config.yaml`,
      explanation: 'Java allows exception covariance in method overrides: an overriding method can declare narrower (subclass) checked exceptions or fewer checked exceptions, honoring the Liskov Substitution Principle (LSP).'
    },
    {
      id: 'ex-21-1-ex9',
      title: 'Subclass Checked Exception Restrictions and Unchecked Freedom',
      problemStatement: 'Demonstrate that while an overriding method cannot declare broader or new checked exceptions than its parent method, it is completely free to throw any `RuntimeException` (unchecked exception) such as `SecurityException` or `IllegalArgumentException` without declaring it in `throws`.',
      hint: 'Unchecked exceptions (`RuntimeException` and its subclasses) are exempt from compile-time `throws` declarations in method overrides.',
      solutionCode: `public class Main {
    static class ReportGenerator {
        // Base method declares NO checked exceptions
        public void generateReport(String title) {
            System.out.println("Generating base report: " + title);
        }
    }

    static class SecureReportGenerator extends ReportGenerator {
        // Allowed: throwing unchecked RuntimeExceptions without declaring throws
        @Override
        public void generateReport(String title) {
            if ("classified".equalsIgnoreCase(title)) {
                throw new SecurityException("Access denied to classified report");
            }
            if (title == null || title.isEmpty()) {
                throw new IllegalArgumentException("Report title required");
            }
            System.out.println("Generating secure report: " + title);
        }
    }

    public static void main(String[] args) {
        ReportGenerator generator = new SecureReportGenerator();

        try {
            generator.generateReport("Public Summary");
            generator.generateReport("classified");
        } catch (SecurityException e) {
            System.out.println("Unchecked Exception Caught: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Validation Caught: " + e.getMessage());
        }
    }
}`,
      output: `Generating secure report: Public Summary
Unchecked Exception Caught: Access denied to classified report`,
      explanation: 'Overriding methods cannot declare new checked exceptions not present in the superclass signature, but they have complete freedom to throw unchecked RuntimeException instances without declaring them.'
    },
    {
      id: 'ex-21-1-ex10',
      title: 'Throwable Hierarchy Inspector and Categorization',
      problemStatement: 'Implement a diagnostic utility `ThrowableClassifier.classify(Throwable t)` that inspects any `Throwable` instance and categorizes it into: (1) `Fatal Error` (subclass of `Error`), (2) `Checked Exception` (subclass of `Exception` but not `RuntimeException`), or (3) `Unchecked Exception` (subclass of `RuntimeException`).',
      hint: 'Use `instanceof Error` first, then `instanceof RuntimeException`, and finally `instanceof Exception` to correctly partition the `Throwable` hierarchy.',
      solutionCode: `import java.io.IOException;

public class Main {
    static class ThrowableClassifier {
        public static String classify(Throwable t) {
            if (t == null) return "Null";
            if (t instanceof Error) {
                return "Fatal Error (JVM/System): " + t.getClass().getSimpleName();
            } else if (t instanceof RuntimeException) {
                return "Unchecked Exception (Programming Bug): " + t.getClass().getSimpleName();
            } else if (t instanceof Exception) {
                return "Checked Exception (Recoverable): " + t.getClass().getSimpleName();
            } else {
                return "Direct Throwable Instance: " + t.getClass().getSimpleName();
            }
        }
    }

    public static void main(String[] args) {
        Throwable[] throwables = {
            new OutOfMemoryError("Java heap space"),
            new StackOverflowError(),
            new IOException("Connection reset"),
            new NullPointerException("Pointer is null"),
            new IllegalArgumentException("Negative input")
        };

        for (Throwable t : throwables) {
            System.out.println(ThrowableClassifier.classify(t));
        }
    }
}`,
      output: `Fatal Error (JVM/System): OutOfMemoryError
Fatal Error (JVM/System): StackOverflowError
Checked Exception (Recoverable): IOException
Unchecked Exception (Programming Bug): NullPointerException
Unchecked Exception (Programming Bug): IllegalArgumentException`,
      explanation: 'The Java Throwable hierarchy branches into Error (serious VM problems like OOM) and Exception. Exception is subdivided into unchecked exceptions (RuntimeException subclasses) and checked exceptions.'
    }
  ],
  // ── LESSON 21.2: try-catch-finally Execution Order & Flow Control ───────────────────
  'try-catch-finally-execution-order': [
    {
      id: 'ex-21-2-ex1',
      title: 'Basic try-catch-finally Flow Trace',
      problemStatement: 'Build an execution tracer `executeOperation(boolean triggerError)` that appends lifecycle milestones (`try-start`, `try-throw`, `catch-handled`, `finally-executed`, `post-try-catch`) to a List. Compare traces between normal execution and exception handling.',
      hint: 'The `finally` block executes regardless of whether an exception was thrown or caught.',
      solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static List<String> executeOperation(boolean triggerError) {
        List<String> log = new ArrayList<>();
        try {
            log.add("try-start");
            if (triggerError) {
                log.add("try-throw");
                throw new IllegalStateException("Simulated failure");
            }
            log.add("try-end");
        } catch (IllegalStateException e) {
            log.add("catch-handled");
        } finally {
            log.add("finally-executed");
        }
        log.add("post-try-catch");
        return log;
    }

    public static void main(String[] args) {
        System.out.println("Success Flow: " + executeOperation(false));
        System.out.println("Failure Flow: " + executeOperation(true));
    }
}`,
      output: `Success Flow: [try-start, try-end, finally-executed, post-try-catch]
Failure Flow: [try-start, try-throw, catch-handled, finally-executed, post-try-catch]`,
      explanation: 'In normal flow, try runs to completion followed immediately by finally. When an exception occurs, the remaining try body is skipped, matching catch executes, followed by finally, before normal code resumes.'
    },
    {
      id: 'ex-21-2-ex2',
      title: 'Multiple Catch Block Hierarchy and Ordering',
      problemStatement: 'Demonstrate the mandatory ordering of multiple catch blocks: specific exceptions (`ArithmeticException`, `NumberFormatException`) must precede general exceptions (`Exception`). Show how different errors trigger the correct specific or general handler.',
      hint: 'Subclasses must be caught before superclasses; placing `catch (Exception e)` before `catch (ArithmeticException e)` causes a compilation error.',
      solutionCode: `public class Main {
    static void testCatchOrder(int scenario) {
        try {
            if (scenario == 1) {
                int div = 10 / 0; // ArithmeticException
            } else if (scenario == 2) {
                Integer.parseInt("invalid"); // NumberFormatException
            } else {
                String str = null;
                str.length(); // NullPointerException
            }
        } catch (ArithmeticException e) {
            System.out.println("Caught by specific ArithmeticException: " + e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("Caught by specific NumberFormatException: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Caught by general Exception: " + e.getClass().getSimpleName());
        }
    }

    public static void main(String[] args) {
        testCatchOrder(1);
        testCatchOrder(2);
        testCatchOrder(3);
    }
}`,
      output: `Caught by specific ArithmeticException: / by zero
Caught by specific NumberFormatException: For input string: "invalid"
Caught by general Exception: NullPointerException`,
      explanation: 'Java evaluates catch blocks sequentially from top to bottom. More specific exception subclasses must appear before general parent exception classes to avoid unreachable code compilation errors.'
    },
    {
      id: 'ex-21-2-ex3',
      title: 'Multi-Catch Syntax for Unified Exception Handling',
      problemStatement: 'Use Java 7 multi-catch syntax (`catch (NumberFormatException | ArrayIndexOutOfBoundsException e)`) to parse a string array index and access the element in a single catch block. Note that the catch parameter `e` is implicitly `final`.',
      hint: 'Separate exception types with a single pipe `|`. The types must be disjoint (one cannot be a subclass of the other).',
      solutionCode: `public class Main {
    static void parseAndAccess(String[] array, String indexStr) {
        try {
            int index = Integer.parseInt(indexStr);
            String item = array[index];
            System.out.println("Accessed item: " + item);
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
            // e is implicitly final here
            System.out.println("Handled input fault (" + e.getClass().getSimpleName() + "): " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String[] data = {"alpha", "beta", "gamma"};
        parseAndAccess(data, "1");
        parseAndAccess(data, "99");
        parseAndAccess(data, "xyz");
    }
}`,
      output: `Accessed item: beta
Handled input fault (ArrayIndexOutOfBoundsException): Index 99 out of bounds for length 3
Handled input fault (NumberFormatException): For input string: "xyz"`,
      explanation: 'Java multi-catch (TypeA | TypeB e) groups unrelated exceptions into a single handler without duplicate catch blocks. The exception variable in multi-catch is implicitly final and cannot be reassigned.'
    },
    {
      id: 'ex-21-2-ex4',
      title: 'finally Guaranteed Execution with Early Return',
      problemStatement: 'Implement a method with a `return` statement inside the `try` block. Trace execution order to verify that the `finally` block executes immediately before the returned value is delivered to the caller.',
      hint: 'When a `return` executes in `try`, the return value is evaluated, then control transfers to `finally`, and only after `finally` finishes does the method return.',
      solutionCode: `public class Main {
    static int computeWithReturn(boolean earlyReturn) {
        System.out.println("Entering computeWithReturn(earlyReturn=" + earlyReturn + ")");
        try {
            if (earlyReturn) {
                System.out.println("Executing return 10 from try block");
                return 10;
            }
            System.out.println("Executing return 20 from try block");
            return 20;
        } finally {
            System.out.println("finally block ALWAYS executes before returning to caller");
        }
    }

    public static void main(String[] args) {
        int res1 = computeWithReturn(true);
        System.out.println("Caller received: " + res1);
        System.out.println("---");
        int res2 = computeWithReturn(false);
        System.out.println("Caller received: " + res2);
    }
}`,
      output: `Entering computeWithReturn(earlyReturn=true)
Executing return 10 from try block
finally block ALWAYS executes before returning to caller
Caller received: 10
---
Entering computeWithReturn(earlyReturn=false)
Executing return 20 from try block
finally block ALWAYS executes before returning to caller
Caller received: 20`,
      explanation: 'When a method encounters a return statement in a try or catch block, the return expression is evaluated, but the method execution pauses while the finally block executes, before returning to the caller.'
    },
    {
      id: 'ex-21-2-ex5',
      title: 'Return in finally Trap and Value Overwrite',
      problemStatement: 'Demonstrate the dangerous anti-pattern where a `return` statement inside a `finally` block discards and overwrites any value returned in `try`, and completely swallows unhandled exceptions thrown in `try`.',
      hint: 'Never place a `return` statement inside a `finally` block; it silences exceptions and overrides previous returns.',
      solutionCode: `public class Main {
    @SuppressWarnings("finally")
    static int demonstratedFinallyReturnTrap() {
        try {
            System.out.println("1. Try block returns 100");
            return 100;
        } finally {
            System.out.println("2. Finally block overrides return with 999");
            return 999; // Anti-pattern: overrides try's return value!
        }
    }

    @SuppressWarnings("finally")
    static String exceptionSwallowedByFinallyReturn() {
        try {
            System.out.println("1. Try block throwing RuntimeException");
            throw new RuntimeException("Fatal error in try");
        } finally {
            System.out.println("2. Finally returning a value - exception discarded!");
            return "Suppressed by finally return";
        }
    }

    public static void main(String[] args) {
        int value = demonstratedFinallyReturnTrap();
        System.out.println("Returned value: " + value);
        System.out.println("---");
        String message = exceptionSwallowedByFinallyReturn();
        System.out.println("Returned message: " + message);
    }
}`,
      output: `1. Try block returns 100
2. Finally block overrides return with 999
Returned value: 999
---
1. Try block throwing RuntimeException
2. Finally returning a value - exception discarded!
Returned message: Suppressed by finally return`,
      explanation: 'Placing a return inside a finally block is an enterprise anti-pattern. It abruptly completes the method, silently dropping any pending exception or return value from the try/catch blocks.'
    },
    {
      id: 'ex-21-2-ex6',
      title: 'Exception Propagation Across Nested Call Stack',
      problemStatement: 'Simulate a 3-tier architecture (`controller` -> `service` -> `repository`). An exception thrown in `repository` unwinds through `service` (which executes its `finally` cleanup without catching) and is caught and handled at `controller`. Trace the call stack unwinding.',
      hint: 'Exceptions propagate down the call stack until a matching catch block is found. Intermediate finally blocks execute as the stack unwinds.',
      solutionCode: `public class Main {
    static void repository() {
        System.out.println("  [Repository] Querying DB...");
        throw new RuntimeException("Database timeout on port 5432");
    }

    static void service() {
        System.out.println(" [Service] Processing business logic...");
        try {
            repository();
        } finally {
            System.out.println(" [Service] Finally: cleaning up service resources");
        }
    }

    static void controller() {
        System.out.println("[Controller] Handling HTTP request...");
        try {
            service();
        } catch (RuntimeException e) {
            System.out.println("[Controller] Catch: Caught propagated error: " + e.getMessage());
        } finally {
            System.out.println("[Controller] Finally: Request completed");
        }
    }

    public static void main(String[] args) {
        controller();
    }
}`,
      output: `[Controller] Handling HTTP request...
 [Service] Processing business logic...
  [Repository] Querying DB...
 [Service] Finally: cleaning up service resources
[Controller] Catch: Caught propagated error: Database timeout on port 5432
[Controller] Finally: Request completed`,
      explanation: 'When an exception is thrown, the JVM unwinds the stack frame by frame. If a frame has a finally block, it executes before that frame is popped, ensuring cleanup even across multi-layered architectures.'
    },
    {
      id: 'ex-21-2-ex7',
      title: 'Nested try-catch-finally Execution Order',
      problemStatement: 'Construct nested `try-catch-finally` blocks: an outer `try-finally` enclosing an inner `try-catch-finally`. Trigger an exception in the inner `try`, handle it in inner `catch`, execute inner `finally`, resume outer `try`, and finally execute outer `finally`.',
      hint: 'Inner try-catch-finally blocks fully resolve before control returns to the enclosing outer try block.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Start");
        try {
            System.out.println("Outer try: start");
            try {
                System.out.println("Inner try: dividing by zero");
                int val = 10 / 0;
            } catch (ArithmeticException e) {
                System.out.println("Inner catch: handled " + e.getMessage());
            } finally {
                System.out.println("Inner finally: cleanup inner");
            }
            System.out.println("Outer try: post-inner execution");
        } catch (Exception e) {
            System.out.println("Outer catch: should not trigger");
        } finally {
            System.out.println("Outer finally: cleanup outer");
        }
        System.out.println("End");
    }
}`,
      output: `Start
Outer try: start
Inner try: dividing by zero
Inner catch: handled / by zero
Inner finally: cleanup inner
Outer try: post-inner execution
Outer finally: cleanup outer
End`,
      explanation: 'Nested try-catch blocks allow fine-grained error isolation. Handling an exception in an inner catch block suppresses propagation, allowing the outer try block to continue execution normally.'
    },
    {
      id: 'ex-21-2-ex8',
      title: 'Exception Re-throwing with Context Logging',
      problemStatement: 'Implement a transactional payment processor `processPayment(String txId, double amount)`. Catch an `IllegalArgumentException` on invalid amount, log diagnostic audit information, and re-throw the caught exception with `throw e;` to let upstream callers handle the transaction abort.',
      hint: 'Use `throw e;` inside a catch block to propagate the exact same exception up the stack after performing local logging or state cleanup.',
      solutionCode: `public class Main {
    static void processPayment(String transactionId, double amount) throws Exception {
        try {
            if (amount <= 0) {
                throw new IllegalArgumentException("Invalid amount: " + amount);
            }
            System.out.println("Payment processed for: " + transactionId);
        } catch (IllegalArgumentException e) {
            System.out.println("Audit Log: Payment failed for tx=" + transactionId + ", error=" + e.getMessage());
            // State rollback or metrics increment here
            throw e; // Re-throwing exception to the caller
        }
    }

    public static void main(String[] args) {
        try {
            processPayment("TX-1001", 250.0);
            processPayment("TX-1002", -50.0);
        } catch (Exception e) {
            System.out.println("Caller handled re-thrown exception: " + e.getMessage());
        }
    }
}`,
      output: `Payment processed for: TX-1001
Audit Log: Payment failed for tx=TX-1002, error=Invalid amount: -50.0
Caller handled re-thrown exception: Invalid amount: -50.0`,
      explanation: 'Re-throwing an exception (throw e;) allows a method to intercept an error for auditing, metric increments, or transaction rollback, while still signaling failure to upstream callers.'
    },
    {
      id: 'ex-21-2-ex9',
      title: 'finally with Primitive vs Object Reference Mutation',
      problemStatement: 'Demonstrate how primitive return values behave versus mutable object references when modified inside `finally`. Show that a primitive return value is preserved by value, whereas mutations to a returned object reference persist on the heap.',
      hint: 'Primitive values in a return statement are copied into a temporary stack location before finally runs, while object references refer to mutable heap state.',
      solutionCode: `public class Main {
    static class Counter {
        int count = 0;
        @Override
        public String toString() { return "Counter[count=" + count + "]"; }
    }

    static int primitiveReturn() {
        int num = 10;
        try {
            return num; // Value (10) is copied into return slot
        } finally {
            num = 99; // Modifies local variable, does not affect return slot
            System.out.println("Inside finally primitive: num modified to " + num);
        }
    }

    static Counter objectReturn() {
        Counter c = new Counter();
        c.count = 10;
        try {
            return c; // Reference to heap object is copied into return slot
        } finally {
            c.count = 99; // Mutates heap object through the reference!
            System.out.println("Inside finally object: count modified to " + c.count);
        }
    }

    public static void main(String[] args) {
        int prim = primitiveReturn();
        System.out.println("Caller received primitive: " + prim);
        System.out.println("---");
        Counter obj = objectReturn();
        System.out.println("Caller received object: " + obj);
    }
}`,
      output: `Inside finally primitive: num modified to 99
Caller received primitive: 10
---
Inside finally object: count modified to 99
Caller received object: Counter[count=99]`,
      explanation: 'Return statements store the value to return onto the operand stack before entering finally. For primitives, subsequent changes to the variable do not change the returned primitive value; for objects, modifying properties mutates the referenced heap object.'
    },
    {
      id: 'ex-21-2-ex10',
      title: 'Catch Block Throwing a Secondary Exception',
      problemStatement: 'Demonstrate execution flow when a `catch` block attempts recovery but encounters a secondary exception. Verify that the `finally` block STILL executes before the secondary exception propagates out to the caller.',
      hint: 'Even when an exception occurs inside a catch block, the finally block is guaranteed to execute before the new exception leaves the method.',
      solutionCode: `public class Main {
    static void riskyRecovery() {
        try {
            System.out.println("1. Try block: throwing initial exception");
            throw new ArithmeticException("Primary calculation error");
        } catch (ArithmeticException e) {
            System.out.println("2. Catch block: failed recovery, throwing new exception");
            throw new IllegalStateException("Secondary recovery failure", e);
        } finally {
            System.out.println("3. Finally block: guaranteed execution before propagation");
        }
    }

    public static void main(String[] args) {
        try {
            riskyRecovery();
        } catch (IllegalStateException e) {
            System.out.println("4. Caller caught: " + e.getMessage());
            System.out.println("5. Root cause: " + e.getCause().getMessage());
        }
    }
}`,
      output: `1. Try block: throwing initial exception
2. Catch block: failed recovery, throwing new exception
3. Finally block: guaranteed execution before propagation
4. Caller caught: Secondary recovery failure
5. Root cause: Primary calculation error`,
      explanation: 'The JVM enforces that finally runs unconditionally. Even if a catch block throws a brand new exception or error, finally will execute completely before that new exception propagates to the caller.'
    }
  ],
  // ── LESSON 21.3: try-with-resources & AutoCloseable Deep Dive ───────────────────
  'try-with-resources-autocloseable': [
    {
      id: 'ex-21-3-ex1',
      title: 'Custom AutoCloseable Resource Management',
      problemStatement: 'Create a `CustomResource` class implementing `java.lang.AutoCloseable`. Instantiate it inside a `try-with-resources` header, perform an operation, and observe that its `close()` method is automatically called when exiting the try block.',
      hint: 'Any class implementing `AutoCloseable` can be managed by `try (ResourceType res = ...)` without an explicit finally block.',
      solutionCode: `public class Main {
    static class CustomResource implements AutoCloseable {
        private final String name;

        public CustomResource(String name) {
            this.name = name;
            System.out.println("Resource [" + name + "] opened");
        }

        public void doWork() {
            System.out.println("Resource [" + name + "] working...");
        }

        @Override
        public void close() {
            System.out.println("Resource [" + name + "] closed automatically");
        }
    }

    public static void main(String[] args) {
        try (CustomResource res = new CustomResource("AuditLog")) {
            res.doWork();
        }
        System.out.println("Exited try-with-resources block");
    }
}`,
      output: `Resource [AuditLog] opened
Resource [AuditLog] working...
Resource [AuditLog] closed automatically
Exited try-with-resources block`,
      explanation: 'Classes implementing AutoCloseable declare a single void close() method. When instantiated in a try-with-resources header, Java guarantees automatic invocation of close() upon block exit.'
    },
    {
      id: 'ex-21-3-ex2',
      title: 'Reverse Order of Multi-Resource Closure',
      problemStatement: 'Declare three custom resources (`ResourceA`, `ResourceB`, `ResourceC`) in a single `try-with-resources` statement. Trace their open and close sequences to prove that resources are closed in reverse order of their declaration (LIFO).',
      hint: 'Java closes resources in reverse order (last opened is closed first) to properly handle dependent resource chains.',
      solutionCode: `public class Main {
    static class Resource implements AutoCloseable {
        private final String name;
        public Resource(String name) {
            this.name = name;
            System.out.println("Opening " + name);
        }
        @Override
        public void close() {
            System.out.println("Closing " + name);
        }
    }

    public static void main(String[] args) {
        try (Resource resA = new Resource("ResourceA");
             Resource resB = new Resource("ResourceB");
             Resource resC = new Resource("ResourceC")) {
            System.out.println("Executing block with all resources");
        }
        System.out.println("All resources closed");
    }
}`,
      output: `Opening ResourceA
Opening ResourceB
Opening ResourceC
Executing block with all resources
Closing ResourceC
Closing ResourceB
Closing ResourceA
All resources closed`,
      explanation: 'Resources declared in try (...) are closed in reverse order of their declaration (LIFO). This guarantees that child or dependent resources (like result sets or streams) close before parent resources (connections).'
    },
    {
      id: 'ex-21-3-ex3',
      title: 'Handling Exceptions Thrown During Resource close()',
      problemStatement: 'Implement a `FaultyResource` whose `close()` method throws an `IOException`. Manage it in a `try-with-resources` block accompanied by a `catch (IOException e)` block, and verify that the close exception is cleanly captured.',
      hint: 'Exceptions thrown by `close()` during try-with-resources teardown are caught by the attached catch block.',
      solutionCode: `import java.io.IOException;

public class Main {
    static class FaultyResource implements AutoCloseable {
        @Override
        public void close() throws IOException {
            System.out.println("Closing FaultyResource: throwing IOException");
            throw new IOException("Failed to flush buffers on close");
        }
    }

    public static void main(String[] args) {
        try (FaultyResource res = new FaultyResource()) {
            System.out.println("FaultyResource doing operation");
        } catch (IOException e) {
            System.out.println("Caught close exception: " + e.getMessage());
        }
        System.out.println("Execution continued normally");
    }
}`,
      output: `FaultyResource doing operation
Closing FaultyResource: throwing IOException
Caught close exception: Failed to flush buffers on close
Execution continued normally`,
      explanation: 'If a resource throws an exception during close(), the exception is intercepted by the catch block associated with the try-with-resources construct, preventing unhandled resource cleanup crashes.'
    },
    {
      id: 'ex-21-3-ex4',
      title: 'Suppressed Exceptions Inspection in try-with-resources',
      problemStatement: 'Simulate a scenario where both the `try` block AND the resource `close()` method throw exceptions. Use `e.getSuppressed()` in the catch block to inspect the suppressed exception attached to the primary exception.',
      hint: 'In try-with-resources, the exception thrown in the try block becomes the primary exception, while exceptions from `close()` are added as suppressed exceptions.',
      solutionCode: `public class Main {
    static class FlakyResource implements AutoCloseable {
        @Override
        public void close() throws Exception {
            throw new IllegalStateException("Close failed in FlakyResource");
        }
    }

    public static void main(String[] args) {
        try (FlakyResource res = new FlakyResource()) {
            throw new RuntimeException("Primary error in try block");
        } catch (Exception e) {
            System.out.println("Primary Exception: " + e.getMessage());
            Throwable[] suppressed = e.getSuppressed();
            System.out.println("Suppressed Count: " + suppressed.length);
            for (Throwable s : suppressed) {
                System.out.println("  Suppressed: " + s.getMessage());
            }
        }
    }
}`,
      output: `Primary Exception: Primary error in try block
Suppressed Count: 1
  Suppressed: Close failed in FlakyResource`,
      explanation: 'In classic try-finally, an exception in finally masked any exception in try. Java try-with-resources solves this by making the try block error the primary exception and attaching close errors via Throwable.addSuppressed().'
    },
    {
      id: 'ex-21-3-ex5',
      title: 'Execution Order of try-with-resources with Explicit catch and finally',
      problemStatement: 'Combine `try-with-resources` with explicit `catch` and `finally` blocks. Log execution steps to demonstrate that `close()` is invoked BEFORE the catch block runs, and BEFORE the finally block runs.',
      hint: 'In try-with-resources, automatic resource closure happens immediately upon exiting the try body, before any explicit catch or finally blocks execute.',
      solutionCode: `public class Main {
    static class TraceResource implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("1. TraceResource.close() invoked");
        }
    }

    public static void main(String[] args) {
        try (TraceResource res = new TraceResource()) {
            System.out.println("0. Inside try block: throwing exception");
            throw new IllegalArgumentException("Calculation error");
        } catch (IllegalArgumentException e) {
            System.out.println("2. Explicit catch block caught: " + e.getMessage());
        } finally {
            System.out.println("3. Explicit finally block executed");
        }
    }
}`,
      output: `0. Inside try block: throwing exception
1. TraceResource.close() invoked
2. Explicit catch block caught: Calculation error
3. Explicit finally block executed`,
      explanation: 'In try-with-resources, resource close() is invoked immediately after the try block finishes, BEFORE any explicit catch blocks or explicit finally blocks execute.'
    },
    {
      id: 'ex-21-3-ex6',
      title: 'Effectively Final Variables in try-with-resources',
      problemStatement: 'Demonstrate Java 9+ try-with-resources syntax where pre-existing `final` or effectively final variables can be directly referenced in the try header without re-declaring them.',
      hint: 'Since Java 9, you can write `try (res1; res2)` if `res1` and `res2` are effectively final variables of an AutoCloseable type.',
      solutionCode: `public class Main {
    static class DatabaseConnection implements AutoCloseable {
        private final String dbUrl;
        public DatabaseConnection(String dbUrl) {
            this.dbUrl = dbUrl;
            System.out.println("Connected to: " + dbUrl);
        }
        public void query(String sql) {
            System.out.println("Executing: " + sql + " on " + dbUrl);
        }
        @Override
        public void close() {
            System.out.println("Connection to " + dbUrl + " closed");
        }
    }

    public static void main(String[] args) {
        // Java 9+: Pre-instantiated effectively final variables in try header
        DatabaseConnection conn1 = new DatabaseConnection("jdbc:postgres://primary:5432/orders");
        DatabaseConnection conn2 = new DatabaseConnection("jdbc:postgres://replica:5432/orders");

        try (conn1; conn2) {
            conn1.query("SELECT * FROM orders WHERE id = 100");
            conn2.query("SELECT * FROM read_metrics");
        }
        System.out.println("Both database connections safely terminated");
    }
}`,
      output: `Connected to: jdbc:postgres://primary:5432/orders
Connected to: jdbc:postgres://replica:5432/orders
Executing: SELECT * FROM orders WHERE id = 100 on jdbc:postgres://primary:5432/orders
Executing: SELECT * FROM read_metrics on jdbc:postgres://replica:5432/orders
Connection to jdbc:postgres://replica:5432/orders closed
Connection to jdbc:postgres://primary:5432/orders closed
Both database connections safely terminated`,
      explanation: 'Starting in Java 9, resources instantiated outside the try statement can be managed directly in the try-with-resources header without redundant local re-declarations, provided they are effectively final.'
    },
    {
      id: 'ex-21-3-ex7',
      title: 'BufferedReader and StringReader Safe Stream Processing',
      problemStatement: 'Process a multiline string using `BufferedReader` wrapping a `StringReader` inside `try-with-resources`. Count lines and words safely, ensuring stream handles are closed without resource leaks.',
      hint: 'Try-with-resources automatically closes stream readers upon completion or if an I/O exception is thrown.',
      solutionCode: `import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;

public class Main {
    static void processTextStream(String text) {
        int lineCount = 0;
        int wordCount = 0;

        try (BufferedReader reader = new BufferedReader(new StringReader(text))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lineCount++;
                String[] words = line.trim().split("\\\\s+");
                if (!line.trim().isEmpty()) {
                    wordCount += words.length;
                }
            }
            System.out.println("Lines: " + lineCount + ", Words: " + wordCount);
        } catch (IOException e) {
            System.out.println("I/O Error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        String mockFile = "Java exception handling\\ntry with resources ensures safety\\nclean code";
        processTextStream(mockFile);
    }
}`,
      output: `Lines: 3, Words: 10`,
      explanation: 'Using BufferedReader in try-with-resources guarantees file and stream descriptor closure, preventing file locking issues and native memory leaks in server environments.'
    },
    {
      id: 'ex-21-3-ex8',
      title: 'Resilient Teardown When First Resource Close Fails',
      problemStatement: 'Instantiate two resources in `try-with-resources` where the first resource to close throws an exception. Verify that the second resource is STILL closed despite the first failure, ensuring complete leak prevention.',
      hint: 'Try-with-resources guarantees that all resources in the header are closed, even if earlier close() invocations throw exceptions.',
      solutionCode: `public class Main {
    static class ResourceOne implements AutoCloseable {
        @Override
        public void close() throws Exception {
            System.out.println("ResourceOne: closing, throws exception");
            throw new RuntimeException("ResourceOne close failure");
        }
    }

    static class ResourceTwo implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("ResourceTwo: closed successfully");
        }
    }

    public static void main(String[] args) {
        // ResourceTwo closes first (LIFO). ResourceOne closes second and throws.
        // Both closes MUST be attempted!
        try (ResourceTwo r2 = new ResourceTwo();
             ResourceOne r1 = new ResourceOne()) {
            System.out.println("Work inside try-with-resources");
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}`,
      output: `Work inside try-with-resources
ResourceOne: closing, throws exception
ResourceTwo: closed successfully
Caught exception: ResourceOne close failure`,
      explanation: 'Java try-with-resources guarantees exhaustive closure: if one resource throws an exception during close(), the JVM catches it, proceeds to close all remaining opened resources, and chains exceptions as suppressed.'
    },
    {
      id: 'ex-21-3-ex9',
      title: 'Idempotent AutoCloseable Resource Pattern',
      problemStatement: 'Implement a thread-safe idempotent resource `SafeSession` using `AtomicBoolean closed`. Ensure that subsequent calls to `close()` after the first one are safely ignored without throwing exceptions or executing duplicate cleanup.',
      hint: 'The `AutoCloseable` contract recommends that `close()` implementations be idempotent (safe to call multiple times).',
      solutionCode: `import java.util.concurrent.atomic.AtomicBoolean;

public class Main {
    static class SafeSession implements AutoCloseable {
        private final String sessionId;
        private final AtomicBoolean closed = new AtomicBoolean(false);

        public SafeSession(String sessionId) {
            this.sessionId = sessionId;
        }

        public boolean isClosed() {
            return closed.get();
        }

        @Override
        public void close() {
            if (closed.compareAndSet(false, true)) {
                System.out.println("Closing session: " + sessionId + " (releasing tokens)");
            } else {
                System.out.println("Close ignored: " + sessionId + " is already closed (Idempotent)");
            }
        }
    }

    public static void main(String[] args) {
        SafeSession session = new SafeSession("sess-faang-99");
        try (session) {
            System.out.println("Using session. Active? " + !session.isClosed());
        }
        // Manual subsequent close calls to test idempotency
        session.close();
        session.close();
        System.out.println("Final session active status: " + !session.isClosed());
    }
}`,
      output: `Using session. Active? true
Closing session: sess-faang-99 (releasing tokens)
Close ignored: sess-faang-99 is already closed (Idempotent)
Close ignored: sess-faang-99 is already closed (Idempotent)
Final session active status: false`,
      explanation: 'AutoCloseable.close() should be idempotent: calling close more than once should have no side-effects. Using atomic flags guarantees thread-safe single-execution cleanup.'
    },
    {
      id: 'ex-21-3-ex10',
      title: 'Database Connection and Statement Simulation',
      problemStatement: 'Simulate JDBC database resource management by declaring `MockConnection`, `MockStatement`, and `MockResultSet` in `try-with-resources`. Verify that the database cursor, statement, and connection are closed in cascading reverse order.',
      hint: 'Managing Connection, Statement, and ResultSet in try-with-resources prevents database connection pool exhaustion and cursor leaks.',
      solutionCode: `public class Main {
    static class MockConnection implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("MockConnection: Connection returned to pool");
        }
    }

    static class MockStatement implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("MockStatement: Statement closed, cursor freed");
        }
    }

    static class MockResultSet implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("MockResultSet: ResultSet closed");
        }
    }

    public static void main(String[] args) {
        try (MockConnection conn = new MockConnection();
             MockStatement stmt = new MockStatement();
             MockResultSet rs = new MockResultSet()) {
            System.out.println("Query executed: fetched 42 records");
        }
        System.out.println("All JDBC resources freed cleanly in reverse order");
    }
}`,
      output: `Query executed: fetched 42 records
MockResultSet: ResultSet closed
MockStatement: Statement closed, cursor freed
MockConnection: Connection returned to pool
All JDBC resources freed cleanly in reverse order`,
      explanation: 'JDBC resources must be closed in reverse order of creation: ResultSet first, Statement second, Connection last. Try-with-resources enforces this stack-like cleanup automatically.'
    }
  ],
  // ── LESSON 21.4: Custom Exceptions & Production Best Practices ───────────────────
  'custom-exceptions-best-practices': [
    {
      id: 'ex-21-4-ex1',
      title: 'Custom Unchecked Exception for Domain Invariants',
      problemStatement: 'Create a custom unchecked exception `InsufficientFundsException` extending `RuntimeException` with fields `accountId`, `currentBalance`, and `requestedAmount`. Implement `BankAccount.withdraw()` to enforce balance invariants.',
      hint: 'Extend `RuntimeException` for business domain violations where programmatic recovery is not expected or is handled globally.',
      solutionCode: `public class Main {
    static class InsufficientFundsException extends RuntimeException {
        private final String accountId;
        private final double currentBalance;
        private final double requestedAmount;

        public InsufficientFundsException(String accountId, double currentBalance, double requestedAmount) {
            super("Account " + accountId + ": cannot withdraw " + requestedAmount + " with balance " + currentBalance);
            this.accountId = accountId;
            this.currentBalance = currentBalance;
            this.requestedAmount = requestedAmount;
        }

        public String getAccountId() { return accountId; }
        public double getCurrentBalance() { return currentBalance; }
        public double getRequestedAmount() { return requestedAmount; }
        public double getShortfall() { return requestedAmount - currentBalance; }
    }

    static class BankAccount {
        private final String id;
        private double balance;

        public BankAccount(String id, double balance) {
            this.id = id;
            this.balance = balance;
        }

        public void withdraw(double amount) {
            if (amount > balance) {
                throw new InsufficientFundsException(id, balance, amount);
            }
            balance -= amount;
            System.out.println("Withdrew " + amount + ", new balance: " + balance);
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-5001", 100.0);
        acc.withdraw(40.0);
        try {
            acc.withdraw(80.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Shortfall: " + e.getShortfall());
        }
    }
}`,
      output: `Withdrew 40.0, new balance: 60.0
Caught: Account ACC-5001: cannot withdraw 80.0 with balance 60.0
Shortfall: 20.0`,
      explanation: 'Custom unchecked exceptions encapsulate business context (like account ID, requested amount, and shortfall), facilitating structured diagnostics and clean REST API error responses.'
    },
    {
      id: 'ex-21-4-ex2',
      title: 'Custom Checked Exception for Recoverable Business Scenarios',
      problemStatement: 'Implement a custom checked exception `OrderProcessingException` extending `Exception` with fields `orderId` and `errorCode`. Create `OrderService.fulfillOrder()` declaring `throws OrderProcessingException` to enforce explicit caller handling.',
      hint: 'Extend `Exception` when the caller is expected to anticipate and recover from the failure condition.',
      solutionCode: `public class Main {
    static class OrderProcessingException extends Exception {
        private final String orderId;
        private final String errorCode;

        public OrderProcessingException(String orderId, String errorCode, String message) {
            super(message);
            this.orderId = orderId;
            this.errorCode = errorCode;
        }

        public String getOrderId() { return orderId; }
        public String getErrorCode() { return errorCode; }
    }

    static class OrderService {
        public static void fulfillOrder(String orderId, int inventoryCount, int requestedQuantity)
                throws OrderProcessingException {
            if (requestedQuantity > inventoryCount) {
                throw new OrderProcessingException(orderId, "ERR_INSUFFICIENT_STOCK",
                        "Order " + orderId + " requires " + requestedQuantity + " items, but only " + inventoryCount + " available");
            }
            System.out.println("Order " + orderId + " fulfilled successfully");
        }
    }

    public static void main(String[] args) {
        try {
            OrderService.fulfillOrder("ORD-101", 5, 2);
            OrderService.fulfillOrder("ORD-102", 3, 10);
        } catch (OrderProcessingException e) {
            System.out.println("Order Failed: [" + e.getErrorCode() + "] " + e.getMessage());
            System.out.println("Order ID: " + e.getOrderId());
        }
    }
}`,
      output: `Order ORD-101 fulfilled successfully
Order Failed: [ERR_INSUFFICIENT_STOCK] Order ORD-102 requires 10 items, but only 3 available
Order ID: ORD-102`,
      explanation: 'Checked exceptions force calling code to handle anticipated business errors (such as out-of-stock items) at compile time, making recovery workflows explicit.'
    },
    {
      id: 'ex-21-4-ex3',
      title: 'Exception Chaining and Root Cause Preservation',
      problemStatement: 'Implement exception chaining: catch a low-level driver `IOException` and wrap it into a higher-level `DataAccessException`, passing the cause into `super(message, cause)`. Inspect `e.getCause()` in the caller.',
      hint: 'Always pass the original exception as the `cause` parameter to preserve root-cause stack traces across architectural layers.',
      solutionCode: `import java.io.IOException;

public class Main {
    static class DataAccessException extends RuntimeException {
        public DataAccessException(String message) {
            super(message);
        }

        public DataAccessException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    static void executeQuery() throws IOException {
        throw new IOException("Socket timeout connecting to replica DB");
    }

    static void fetchUserData() {
        try {
            executeQuery();
        } catch (IOException e) {
            // Chaining cause directly in constructor
            throw new DataAccessException("Failed to fetch user repository record", e);
        }
    }

    public static void main(String[] args) {
        try {
            fetchUserData();
        } catch (DataAccessException e) {
            System.out.println("High-level message: " + e.getMessage());
            System.out.println("Underlying cause: " + e.getCause().getClass().getSimpleName()
                    + " - " + e.getCause().getMessage());
        }
    }
}`,
      output: `High-level message: Failed to fetch user repository record
Underlying cause: IOException - Socket timeout connecting to replica DB`,
      explanation: 'Exception chaining preserves the lower-level root cause while presenting an abstraction-appropriate higher-level domain exception to callers, ensuring debugging clarity.'
    },
    {
      id: 'ex-21-4-ex4',
      title: 'Standard Constructor Overloading in Custom Exceptions',
      problemStatement: 'Implement `PaymentGatewayException` implementing all 4 standard Java exception constructors: `()`, `(String)`, `(String, Throwable)`, and `(Throwable)`. Demonstrate the use of each constructor.',
      hint: 'Production custom exceptions should implement all four standard constructors to provide maximum flexibility for callers.',
      solutionCode: `public class Main {
    static class PaymentGatewayException extends RuntimeException {
        // 1. Default constructor
        public PaymentGatewayException() {
            super();
        }

        // 2. Message only constructor
        public PaymentGatewayException(String message) {
            super(message);
        }

        // 3. Message and cause constructor
        public PaymentGatewayException(String message, Throwable cause) {
            super(message, cause);
        }

        // 4. Cause only constructor
        public PaymentGatewayException(Throwable cause) {
            super(cause);
        }
    }

    public static void main(String[] args) {
        PaymentGatewayException ex1 = new PaymentGatewayException();
        PaymentGatewayException ex2 = new PaymentGatewayException("Card expired");
        PaymentGatewayException ex3 = new PaymentGatewayException("Network drop", new IllegalStateException("Timeout"));
        PaymentGatewayException ex4 = new PaymentGatewayException(new NullPointerException("Null response payload"));

        System.out.println("Ex1 message: " + ex1.getMessage());
        System.out.println("Ex2 message: " + ex2.getMessage());
        System.out.println("Ex3: " + ex3.getMessage() + " | Cause: " + ex3.getCause().getMessage());
        System.out.println("Ex4 cause: " + ex4.getCause().getClass().getSimpleName());
    }
}`,
      output: `Ex1 message: null
Ex2 message: Card expired
Ex3: Network drop | Cause: Timeout
Ex4 cause: NullPointerException`,
      explanation: 'Idiomatic Java exception classes provide the four standard JDK constructors so calling libraries can instantiate them with messages, causes, both, or neither as needed.'
    },
    {
      id: 'ex-21-4-ex5',
      title: 'Stack Trace Preservation vs Destructive Wrapping',
      problemStatement: 'Compare destructive wrapping (`new RuntimeException(e.getMessage())` which loses the original stack trace) with clean chained wrapping (`new RuntimeException("Context", e)`). Verify whether the root cause is preserved.',
      hint: 'Destructive wrapping discards the underlying exception instance, making it impossible to determine where the original failure occurred.',
      solutionCode: `public class Main {
    static void causeUnderlyingError() {
        throw new IllegalArgumentException("Original root cause validation failed");
    }

    static void destructiveWrap() {
        try {
            causeUnderlyingError();
        } catch (IllegalArgumentException e) {
            // Anti-pattern: Loses original exception cause and stack trace
            throw new RuntimeException("Destructive wrap: " + e.getMessage());
        }
    }

    static void cleanChainedWrap() {
        try {
            causeUnderlyingError();
        } catch (IllegalArgumentException e) {
            // Best practice: preserves root cause
            throw new RuntimeException("Clean wrap with cause", e);
        }
    }

    public static void main(String[] args) {
        try {
            destructiveWrap();
        } catch (RuntimeException e) {
            System.out.println("Destructive cause present? " + (e.getCause() != null));
        }

        try {
            cleanChainedWrap();
        } catch (RuntimeException e) {
            System.out.println("Clean wrap cause present? " + (e.getCause() != null));
            System.out.println("Preserved root cause class: " + e.getCause().getClass().getSimpleName());
        }
    }
}`,
      output: `Destructive cause present? false
Clean wrap cause present? true
Preserved root cause class: IllegalArgumentException`,
      explanation: 'Constructing a new exception using only e.getMessage() without passing e as the cause destroys the original stack trace. Always pass the caught exception to preserve root-cause diagnostic data.'
    },
    {
      id: 'ex-21-4-ex6',
      title: 'Hierarchical Domain Exception Modeling',
      problemStatement: 'Design a clean domain exception hierarchy: abstract `BaseAppException` with an `httpStatus` field, extended by `ValidationException` (HTTP 400) and `SecurityException` (HTTP 403). Demonstrate catching at the base class while extracting specific HTTP status codes.',
      hint: 'Hierarchical exception designs allow top-level handlers to catch common base types while inspecting specific specialized attributes.',
      solutionCode: `public class Main {
    static abstract class BaseAppException extends RuntimeException {
        private final int httpStatus;
        public BaseAppException(String message, int httpStatus) {
            super(message);
            this.httpStatus = httpStatus;
        }
        public int getHttpStatus() { return httpStatus; }
    }

    static class ValidationException extends BaseAppException {
        public ValidationException(String message) {
            super(message, 400);
        }
    }

    static class SecurityException extends BaseAppException {
        public SecurityException(String message) {
            super(message, 403);
        }
    }

    static void handleRequest(int type) {
        if (type == 1) throw new ValidationException("Email format is invalid");
        if (type == 2) throw new SecurityException("Insufficient role permissions");
        System.out.println("Request succeeded");
    }

    public static void main(String[] args) {
        int[] requests = {0, 1, 2};
        for (int r : requests) {
            try {
                handleRequest(r);
            } catch (BaseAppException e) {
                System.out.println("Handled HTTP " + e.getHttpStatus() + ": " + e.getMessage());
            }
        }
    }
}`,
      output: `Request succeeded
Handled HTTP 400: Email format is invalid
Handled HTTP 403: Insufficient role permissions`,
      explanation: 'Structuring application exceptions in a domain hierarchy with an abstract base class enables polymorphic catching while maintaining rich domain-specific metadata like HTTP status codes.'
    },
    {
      id: 'ex-21-4-ex7',
      title: 'Custom Exception with Rich Diagnostic Context',
      problemStatement: 'Build `UserNotFoundException` extending `RuntimeException` storing `userId`, `clientIp`, and `timestamp`. In the handler, format a rich diagnostic incident log from the structured exception fields.',
      hint: 'Custom exceptions can carry structured metadata fields that improve observability and debugging in distributed systems.',
      solutionCode: `public class Main {
    static class UserNotFoundException extends RuntimeException {
        private final String userId;
        private final String clientIp;
        private final String timestamp;

        public UserNotFoundException(String userId, String clientIp) {
            super("User not found: " + userId + " (requested from " + clientIp + ")");
            this.userId = userId;
            this.clientIp = clientIp;
            this.timestamp = "2026-09-26T12:00:00Z"; // Fixed timestamp for deterministic output
        }

        public String getUserId() { return userId; }
        public String getClientIp() { return clientIp; }
        public String getTimestamp() { return timestamp; }
    }

    public static void main(String[] args) {
        try {
            throw new UserNotFoundException("usr-4819", "192.168.1.50");
        } catch (UserNotFoundException e) {
            System.out.println("Log Alert: " + e.getMessage());
            System.out.println("Diagnostic Details: [User: " + e.getUserId()
                    + ", IP: " + e.getClientIp() + ", Time: " + e.getTimestamp() + "]");
        }
    }
}`,
      output: `Log Alert: User not found: usr-4819 (requested from 192.168.1.50)
Diagnostic Details: [User: usr-4819, IP: 192.168.1.50, Time: 2026-09-26T12:00:00Z]`,
      explanation: 'Embedding structured metadata directly within exception classes simplifies integration with modern distributed tracing systems and structured log forwarders.'
    },
    {
      id: 'ex-21-4-ex8',
      title: 'Refactoring Anti-Pattern: Swallowed Exception Fix',
      problemStatement: 'Refactor code that silently swallowed exceptions (`catch (Exception e) {}`). Implement production-grade fallback logic with warning logging to ensure configuration parse errors are visible and manageable.',
      hint: 'Never leave catch blocks empty without logging or fallback comments; silent swallowing causes hard-to-find bugs.',
      solutionCode: `public class Main {
    // Problematic anti-pattern:
    // try { doSomething(); } catch (Exception e) { /* swallowed */ }

    // Refactored production standard:
    static class ConfigLoader {
        public static int loadTimeoutSafe(String timeoutStr) {
            try {
                return Integer.parseInt(timeoutStr);
            } catch (NumberFormatException e) {
                // Explicit fallback + diagnostic log instead of silent swallow
                System.out.println("WARN: Invalid timeout format '" + timeoutStr + "', falling back to default 3000ms");
                return 3000;
            }
        }
    }

    public static void main(String[] args) {
        int timeout1 = ConfigLoader.loadTimeoutSafe("5000");
        int timeout2 = ConfigLoader.loadTimeoutSafe("invalid_val");
        System.out.println("Configured Timeout 1: " + timeout1 + "ms");
        System.out.println("Configured Timeout 2: " + timeout2 + "ms");
    }
}`,
      output: `WARN: Invalid timeout format 'invalid_val', falling back to default 3000ms
Configured Timeout 1: 5000ms
Configured Timeout 2: 3000ms`,
      explanation: 'Empty catch blocks (exception swallowing) hide bugs and cause erratic failures downstream. In production, exceptions must either be recovered with explicit logging or propagated upstream.'
    },
    {
      id: 'ex-21-4-ex9',
      title: 'Refactoring Anti-Pattern: Log-and-Throw Fix',
      problemStatement: 'Refactor the "Log and Throw" anti-pattern. Instead of logging an exception at every tier before re-throwing (causing duplicate log spam), wrap and re-throw with context, logging exactly once at the architecture boundary.',
      hint: 'Follow the single-responsibility principle for error handling: either handle and log the exception, or propagate it upstream.',
      solutionCode: `public class Main {
    // Anti-Pattern: "Log and Throw" logs an error at EVERY tier, spamming logs with duplicates:
    // catch (Exception e) { logger.error("error", e); throw e; }

    // Best Practice: Either handle AND log, OR wrap and re-throw without logging.
    // The top-level boundary handles the logging ONCE.

    static void lowerLevelDao(String query) {
        if (query == null) {
            throw new IllegalArgumentException("Query cannot be null");
        }
    }

    static void middleLevelService(String query) {
        try {
            lowerLevelDao(query);
        } catch (IllegalArgumentException e) {
            // Clean propagation with business context - DO NOT log here to prevent duplicate log spam
            throw new IllegalStateException("Service query dispatch failed", e);
        }
    }

    public static void main(String[] args) {
        try {
            middleLevelService(null);
        } catch (IllegalStateException e) {
            // Single logging point at the architecture boundary
            System.out.println("[SYSTEM-BOUNDARY-LOG] Failed with context: " + e.getMessage());
            System.out.println("[SYSTEM-BOUNDARY-LOG] Root cause: " + e.getCause().getMessage());
        }
    }
}`,
      output: `[SYSTEM-BOUNDARY-LOG] Failed with context: Service query dispatch failed
[SYSTEM-BOUNDARY-LOG] Root cause: Query cannot be null`,
      explanation: 'The log and throw anti-pattern floods server logs with duplicate entries for a single incident. The correct design is to propagate with contextual wrapping and log once at the boundary.'
    },
    {
      id: 'ex-21-4-ex10',
      title: 'Top-Level Exception Barrier Pattern',
      problemStatement: 'Implement the enterprise Exception Barrier pattern. Dispatch operations through a centralized barrier that maps known domain exceptions to HTTP responses and sanitizes unexpected runtime errors to HTTP 500 without leaking stack traces.',
      hint: 'An exception barrier prevents unhandled exceptions from crashing the thread and sanitizes internal error details before responding to clients.',
      solutionCode: `public class Main {
    static class DomainException extends RuntimeException {
        private final String errorCode;
        private final int httpStatus;
        public DomainException(String errorCode, String message, int httpStatus) {
            super(message);
            this.errorCode = errorCode;
            this.httpStatus = httpStatus;
        }
        public String getErrorCode() { return errorCode; }
        public int getHttpStatus() { return httpStatus; }
    }

    static class ApiResponse {
        int status;
        String errorCode;
        String message;

        public ApiResponse(int status, String errorCode, String message) {
            this.status = status;
            this.errorCode = errorCode;
            this.message = message;
        }

        @Override
        public String toString() {
            return "HTTP " + status + " [" + errorCode + "] " + message;
        }
    }

    // Enterprise Exception Barrier (like Spring @ExceptionHandler / @ControllerAdvice)
    static class ExceptionBarrier {
        public static ApiResponse dispatch(Runnable action) {
            try {
                action.run();
                return new ApiResponse(200, "OK", "Success");
            } catch (DomainException e) {
                // Expected domain exceptions are safely returned with their status and code
                return new ApiResponse(e.getHttpStatus(), e.getErrorCode(), e.getMessage());
            } catch (Throwable t) {
                // Unexpected bugs are sanitized so internal implementation details do not leak
                return new ApiResponse(500, "INTERNAL_SERVER_ERROR", "An unexpected error occurred");
            }
        }
    }

    public static void main(String[] args) {
        ApiResponse r1 = ExceptionBarrier.dispatch(() -> {
            System.out.println("Processing normal request");
        });
        ApiResponse r2 = ExceptionBarrier.dispatch(() -> {
            throw new DomainException("USER_SUSPENDED", "Account is temporarily locked", 403);
        });
        ApiResponse r3 = ExceptionBarrier.dispatch(() -> {
            String s = null;
            s.length(); // Unexpected NPE bug
        });

        System.out.println("Response 1: " + r1);
        System.out.println("Response 2: " + r2);
        System.out.println("Response 3: " + r3);
    }
}`,
      output: `Processing normal request
Response 1: HTTP 200 [OK] Success
Response 2: HTTP 403 [USER_SUSPENDED] Account is temporarily locked
Response 3: HTTP 500 [INTERNAL_SERVER_ERROR] An unexpected error occurred`,
      explanation: 'The Exception Barrier pattern catches all unhandled exceptions at architectural boundaries (such as web controllers or message listeners), transforming domain exceptions into user-friendly responses and concealing internal stack traces for security.'
    }
  ]
};
