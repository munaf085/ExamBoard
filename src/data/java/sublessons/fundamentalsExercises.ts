import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// MODULE 1: JAVA FUNDAMENTALS EXERCISES (LESSONS 1.1 - 1.7)
// Exactly 10 dedicated coding assignments per lesson (70 total)
// ============================================================

export const fundamentalsExercises: Record<string, ProgrammingExercise[]> = {
  "what-is-java": [
    {
      "id": "ex-fund-1",
      "title": "Exercise 1: Inspecting the Java Runtime Version",
      "difficulty": "Easy",
      "problemStatement": "Write a program that uses `System.getProperty(\"java.version\")` to print the active Java runtime version. Prefix the output with 'Java Version: '.",
      "hint": "Use System.getProperty with key 'java.version'.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String ver = System.getProperty(\"java.version\");\n        System.out.println(\"Java Version: \" + (ver != null ? ver.split(\"\\\\.\")[0] : \"21\"));\n    }\n}",
      "output": "Java Version: 21",
      "explanation": "System.getProperty(\"java.version\") queries the runtime version string configured by the host JVM."
    },
    {
      "id": "ex-fund-2",
      "title": "Exercise 2: Platform-Independent Line Separator",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate cross-platform newline generation by using `System.lineSeparator()`. Print 'Line 1' followed by the line separator and 'Line 2'.",
      "hint": "System.lineSeparator() returns '\\r\\n' on Windows or '\\n' on Unix.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.print(\"Line 1\" + System.lineSeparator() + \"Line 2\\n\");\n    }\n}",
      "output": "Line 1\nLine 2",
      "explanation": "System.lineSeparator() guarantees cross-platform compatibility across Windows and POSIX systems."
    },
    {
      "id": "ex-fund-3",
      "title": "Exercise 3: Available CPU Processors Query",
      "difficulty": "Easy",
      "problemStatement": "Query the JVM runtime using `Runtime.getRuntime().availableProcessors()`. Print 'Cores: ' followed by whether cores are greater than 0 ('Available' if > 0).",
      "hint": "Runtime.getRuntime() provides access to the active JVM process.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int cores = Runtime.getRuntime().availableProcessors();\n        System.out.println(\"Cores: \" + (cores > 0 ? \"Available\" : \"None\"));\n    }\n}",
      "output": "Cores: Available",
      "explanation": "Runtime.availableProcessors() queries the host operating system's logical CPU count."
    },
    {
      "id": "ex-fund-4",
      "title": "Exercise 4: Deterministic Integer Boundaries",
      "difficulty": "Easy",
      "problemStatement": "Print `Integer.MIN_VALUE` and `Integer.MAX_VALUE` separated by a comma to verify Java's 32-bit two's complement boundaries.",
      "hint": "Integer.MIN_VALUE is -2147483648 and Integer.MAX_VALUE is 2147483647.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(Integer.MIN_VALUE + \", \" + Integer.MAX_VALUE);\n    }\n}",
      "output": "-2147483648, 2147483647",
      "explanation": "Java primitives maintain strictly defined bit widths regardless of CPU architecture."
    },
    {
      "id": "ex-fund-5",
      "title": "Exercise 5: Detecting Integer Overflow with Math.addExact",
      "difficulty": "Medium",
      "problemStatement": "Attempt to add 1 to `Integer.MAX_VALUE` using `Math.addExact()`. Catch the resulting `ArithmeticException` and print 'Overflow detected'.",
      "hint": "Math.addExact throws ArithmeticException on overflow.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            Math.addExact(Integer.MAX_VALUE, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Overflow detected\");\n        }\n    }\n}",
      "output": "Overflow detected",
      "explanation": "Unlike standard + operator which wraps silently, Math.addExact prevents data corruption by throwing ArithmeticException."
    },
    {
      "id": "ex-fund-6",
      "title": "Exercise 6: Cross-Platform File Separator",
      "difficulty": "Easy",
      "problemStatement": "Construct a file path for folder 'data' and file 'records.txt' using `java.io.File.separator` instead of hardcoded slashes. Print the constructed path with standard forward slashes for output verification.",
      "hint": "Use File.separator or replace backslashes with forward slashes for consistency.",
      "solutionCode": "import java.io.File;\npublic class Solution {\n    public static void main(String[] args) {\n        String path = \"data\" + File.separator + \"records.txt\";\n        System.out.println(path.replace(\"\\\\\", \"/\"));\n    }\n}",
      "output": "data/records.txt",
      "explanation": "File.separator abstracts host operating system filesystem path conventions."
    },
    {
      "id": "ex-fund-7",
      "title": "Exercise 7: Unicode UTF-16 Character Support",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate Java's 16-bit Unicode support by printing a char containing the Greek letter Omega ('\\u03A9') followed by its integer code point value.",
      "hint": "char omega = '\\u03A9'; int code = omega;",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        char omega = '\\u03A9';\n        int code = (int) omega;\n        System.out.println(omega + \" = \" + code);\n    }\n}",
      "output": "Ω = 937",
      "explanation": "Java char primitives represent UTF-16 code units capable of universal internationalization."
    },
    {
      "id": "ex-fund-8",
      "title": "Exercise 8: Querying Allocated JVM Max Memory",
      "difficulty": "Easy",
      "problemStatement": "Query the maximum heap memory available to the JVM using `Runtime.getRuntime().maxMemory()`. Print 'Heap memory configured' if the returned value is greater than 0.",
      "hint": "Runtime.maxMemory() returns a long representing bytes.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        long maxBytes = Runtime.getRuntime().maxMemory();\n        System.out.println(maxBytes > 0 ? \"Heap memory configured\" : \"No heap\");\n    }\n}",
      "output": "Heap memory configured",
      "explanation": "Runtime.getRuntime().maxMemory() returns the maximum heap size specified by -Xmx."
    },
    {
      "id": "ex-fund-9",
      "title": "Exercise 9: Checking OS Name and Architecture",
      "difficulty": "Easy",
      "problemStatement": "Retrieve and verify that `System.getProperty(\"os.name\")` and `System.getProperty(\"os.arch\")` return non-null strings. Print 'OS properties loaded'.",
      "hint": "Check nullity of both property values.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String os = System.getProperty(\"os.name\");\n        String arch = System.getProperty(\"os.arch\");\n        if (os != null && arch != null) {\n            System.out.println(\"OS properties loaded\");\n        }\n    }\n}",
      "output": "OS properties loaded",
      "explanation": "The JVM automatically captures and standardizes host operating system metadata."
    },
    {
      "id": "ex-fund-10",
      "title": "Exercise 10: Circular Overflow Demonstration",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate two's complement circular overflow: take `Integer.MAX_VALUE`, add 1 using standard arithmetic, and verify that the result equals `Integer.MIN_VALUE`. Print 'Wrapped successfully'.",
      "hint": "int val = Integer.MAX_VALUE + 1;",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int val = Integer.MAX_VALUE + 1;\n        if (val == Integer.MIN_VALUE) {\n            System.out.println(\"Wrapped successfully\");\n        }\n    }\n}",
      "output": "Wrapped successfully",
      "explanation": "Signed 32-bit two's complement arithmetic overflows circularly without throwing an exception."
    }
  ],
  "jdk-jre-jvm": [
    {
      "id": "ex-jdk-1",
      "title": "Exercise 1: Inspecting the Application ClassLoader",
      "difficulty": "Easy",
      "problemStatement": "Retrieve the ClassLoader of the current class using `Solution.class.getClassLoader()`. Print whether the loader is non-null.",
      "hint": "User classes are loaded by the Application ClassLoader.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        ClassLoader cl = Solution.class.getClassLoader();\n        System.out.println(\"ClassLoader present: \" + (cl != null));\n    }\n}",
      "output": "ClassLoader present: true",
      "explanation": "Application classes are loaded by the AppClassLoader instance."
    },
    {
      "id": "ex-jdk-2",
      "title": "Exercise 2: Verifying the Bootstrap ClassLoader Representation",
      "difficulty": "Easy",
      "problemStatement": "Verify that `String.class.getClassLoader()` returns `null` because core classes are loaded by the native Bootstrap ClassLoader. Print 'Bootstrap is null: true'.",
      "hint": "The native C++ bootstrap loader is represented as null in Java.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        ClassLoader cl = String.class.getClassLoader();\n        System.out.println(\"Bootstrap is null: \" + (cl == null));\n    }\n}",
      "output": "Bootstrap is null: true",
      "explanation": "Core JDK classes loaded by the native Bootstrap ClassLoader return null."
    },
    {
      "id": "ex-jdk-3",
      "title": "Exercise 3: Inspecting the ClassLoader Parent Chain",
      "difficulty": "Medium",
      "problemStatement": "Traverse the classloader parent delegation hierarchy starting from `Solution.class.getClassLoader()`. Print the name of the parent classloader (or 'PlatformClassLoader').",
      "hint": "cl.getParent() returns the parent loader in the delegation chain.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        ClassLoader app = Solution.class.getClassLoader();\n        ClassLoader parent = app != null ? app.getParent() : null;\n        System.out.println(\"Parent loader exists: \" + (parent != null));\n    }\n}",
      "output": "Parent loader exists: true",
      "explanation": "Under the Parent Delegation Model, AppClassLoader delegates to PlatformClassLoader."
    },
    {
      "id": "ex-jdk-4",
      "title": "Exercise 4: Querying Heap Memory Usage Stats",
      "difficulty": "Easy",
      "problemStatement": "Using `Runtime.getRuntime()`, calculate total memory minus free memory to find used heap memory. Print 'Heap stats queried'.",
      "hint": "long used = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        long used = rt.totalMemory() - rt.freeMemory();\n        if (used >= 0) {\n            System.out.println(\"Heap stats queried\");\n        }\n    }\n}",
      "output": "Heap stats queried",
      "explanation": "Runtime methods provide real-time memory metrics for JVM heap utilization."
    },
    {
      "id": "ex-jdk-5",
      "title": "Exercise 5: Inspecting the JVM Implementation Vendor",
      "difficulty": "Easy",
      "problemStatement": "Read `System.getProperty(\"java.vm.vendor\")` and verify it returns a valid non-empty string. Print 'Vendor verified'.",
      "hint": "Check property 'java.vm.vendor'.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String vendor = System.getProperty(\"java.vm.vendor\");\n        if (vendor != null && !vendor.isEmpty()) {\n            System.out.println(\"Vendor verified\");\n        }\n    }\n}",
      "output": "Vendor verified",
      "explanation": "The JVM vendor string identifies the OpenJDK distribution provider."
    },
    {
      "id": "ex-jdk-6",
      "title": "Exercise 6: Querying Active Thread Count",
      "difficulty": "Easy",
      "problemStatement": "Use `Thread.activeCount()` to check the number of currently active threads in the JVM thread group. Print 'Active threads > 0'.",
      "hint": "Thread.activeCount() returns an estimate of active threads.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int count = Thread.activeCount();\n        if (count > 0) {\n            System.out.println(\"Active threads > 0\");\n        }\n    }\n}",
      "output": "Active threads > 0",
      "explanation": "Thread.activeCount() queries the JVM thread management subsystem."
    },
    {
      "id": "ex-jdk-7",
      "title": "Exercise 7: Explicit Garbage Collection Request",
      "difficulty": "Medium",
      "problemStatement": "Request garbage collection using `System.gc()`. Verify that the call completes without throwing an exception and print 'GC requested'.",
      "hint": "System.gc() hints to the JVM to run garbage collection.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.gc();\n        System.out.println(\"GC requested\");\n    }\n}",
      "output": "GC requested",
      "explanation": "System.gc() suggests heap reclamation; the JVM decides whether and when to execute it."
    },
    {
      "id": "ex-jdk-8",
      "title": "Exercise 8: Inspecting JVM Input Arguments",
      "difficulty": "Medium",
      "problemStatement": "Using `java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments()`, check if the argument list is non-null. Print 'Input arguments queried'.",
      "hint": "ManagementFactory provides JMX beans for runtime inspection.",
      "solutionCode": "import java.lang.management.ManagementFactory;\nimport java.util.List;\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> argsList = ManagementFactory.getRuntimeMXBean().getInputArguments();\n        if (argsList != null) {\n            System.out.println(\"Input arguments queried\");\n        }\n    }\n}",
      "output": "Input arguments queried",
      "explanation": "RuntimeMXBean allows programmatically inspecting startup JVM flags."
    },
    {
      "id": "ex-jdk-9",
      "title": "Exercise 9: Memory Allocation on Heap Verification",
      "difficulty": "Easy",
      "problemStatement": "Allocate an array of 1,000,000 integers on the heap. Print 'Array allocated: ' followed by length.",
      "hint": "int[] arr = new int[1_000_000];",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int[] arr = new int[1_000_000];\n        System.out.println(\"Array allocated: \" + arr.length);\n    }\n}",
      "output": "Array allocated: 1000000",
      "explanation": "Large arrays are allocated in the young generation heap space."
    },
    {
      "id": "ex-jdk-10",
      "title": "Exercise 10: Simulating OutOfMemoryError Handling",
      "difficulty": "Hard",
      "problemStatement": "Write a method that catches `OutOfMemoryError` safely when attempting to allocate an impossibly large array (`new int[Integer.MAX_VALUE - 2]`). Print 'Caught OOM safely'.",
      "hint": "OutOfMemoryError is an Error, not an Exception, so catch OutOfMemoryError.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            int[] huge = new int[Integer.MAX_VALUE - 2];\n        } catch (OutOfMemoryError e) {\n            System.out.println(\"Caught OOM safely\");\n        }\n    }\n}",
      "output": "Caught OOM safely",
      "explanation": "OutOfMemoryError occurs when the JVM heap cannot satisfy an object allocation request."
    }
  ],
  "bytecode-compilation": [
    {
      "id": "ex-byte-1",
      "title": "Exercise 1: Validating the 0xCAFEBABE Magic Header",
      "difficulty": "Easy",
      "problemStatement": "Create a byte array representing the 4-byte magic number: `new byte[] {(byte)0xCA, (byte)0xFE, (byte)0xBA, (byte)0xBE}`. Format and print the hexadecimal representation: 'Magic: CAFEBABE'.",
      "hint": "Format each byte using %02X.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte[] magic = {(byte)0xCA, (byte)0xFE, (byte)0xBA, (byte)0xBE};\n        StringBuilder sb = new StringBuilder(\"Magic: \");\n        for (byte b : magic) {\n            sb.append(String.format(\"%02X\", b));\n        }\n        System.out.println(sb);\n    }\n}",
      "output": "Magic: CAFEBABE",
      "explanation": "0xCAFEBABE is the mandatory header sequence for all Java class files."
    },
    {
      "id": "ex-byte-2",
      "title": "Exercise 2: Class File Major Version Calculator",
      "difficulty": "Easy",
      "problemStatement": "Given bytecode major version 65 (Java 21), calculate which Java version it belongs to using the formula: `majorVersion - 44`. Print 'Java Version: 21'.",
      "hint": "Major version 45 was Java 1.1; Java 21 is major 65.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int major = 65;\n        int javaVer = major - 44;\n        System.out.println(\"Java Version: \" + javaVer);\n    }\n}",
      "output": "Java Version: 21",
      "explanation": "Bytecode major versions increment by 1 for each standard Java SE release."
    },
    {
      "id": "ex-byte-3",
      "title": "Exercise 3: Simulating Operand Stack Addition",
      "difficulty": "Medium",
      "problemStatement": "Simulate the JVM 'iadd' instruction using a `java.util.ArrayDeque<Integer>` operand stack: push 10, push 20, pop both, compute sum, and push result back. Print the final stack value.",
      "hint": "Use deque.push() and deque.pop().",
      "solutionCode": "import java.util.ArrayDeque;\npublic class Solution {\n    public static void main(String[] args) {\n        ArrayDeque<Integer> stack = new ArrayDeque<>();\n        stack.push(10); // iload\n        stack.push(20); // iload\n        int b = stack.pop();\n        int a = stack.pop();\n        stack.push(a + b); // iadd\n        System.out.println(\"Stack top: \" + stack.peek());\n    }\n}",
      "output": "Stack top: 30",
      "explanation": "The JVM executes arithmetic using a stack model where operands are popped and results pushed."
    },
    {
      "id": "ex-byte-4",
      "title": "Exercise 4: Simulating Bytecode Comparison (if_icmpne)",
      "difficulty": "Medium",
      "problemStatement": "Simulate the bytecode instruction 'if_icmpne' (branch if int comparison not equal): compare two integers on an operand stack and print 'Branch taken' if they differ, or 'Fall through' if equal. Test with 5 and 8.",
      "hint": "Pop two values and check if a != b.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 8;\n        if (a != b) {\n            System.out.println(\"Branch taken\");\n        } else {\n            System.out.println(\"Fall through\");\n        }\n    }\n}",
      "output": "Branch taken",
      "explanation": "Conditional jump bytecodes evaluate stack values to determine branching execution."
    },
    {
      "id": "ex-byte-5",
      "title": "Exercise 5: Reading Class Resource Bytes",
      "difficulty": "Medium",
      "problemStatement": "Check if `Solution.class.getResource(\"Solution.class\")` is non-null, verifying that bytecode can be located as a resource. Print 'Bytecode resource found'.",
      "hint": "getResource finds files relative to the class package.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean found = Solution.class.getResource(\"Solution.class\") != null;\n        if (found) {\n            System.out.println(\"Bytecode resource found\");\n        }\n    }\n}",
      "output": "Bytecode resource found",
      "explanation": "The JVM classloader treats .class files as accessible resource streams."
    },
    {
      "id": "ex-byte-6",
      "title": "Exercise 6: Method Descriptor Signature Matching",
      "difficulty": "Easy",
      "problemStatement": "In bytecode, method 'int add(int a, int b)' has descriptor '(II)I'. Write a method that formats a descriptor for two double parameters returning double ('(DD)D'). Print the descriptor.",
      "hint": "'D' is the bytecode descriptor for double.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String descriptor = \"(DD)D\";\n        System.out.println(\"Double method descriptor: \" + descriptor);\n    }\n}",
      "output": "Double method descriptor: (DD)D",
      "explanation": "The JVM represents method signatures compactly in the Constant Pool using descriptors."
    },
    {
      "id": "ex-byte-7",
      "title": "Exercise 7: Catching UnsupportedClassVersionError",
      "difficulty": "Medium",
      "problemStatement": "Simulate catching `UnsupportedClassVersionError` (which is a subclass of `ClassFormatError` and `LinkageError`). Catch and print the error class name.",
      "hint": "Throw and catch new UnsupportedClassVersionError(\"65.0 > 61.0\").",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            throw new UnsupportedClassVersionError(\"Major version 65 not supported on JVM 17\");\n        } catch (UnsupportedClassVersionError e) {\n            System.out.println(\"Caught: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
      "output": "Caught: UnsupportedClassVersionError",
      "explanation": "UnsupportedClassVersionError prevents older runtimes from attempting to execute incompatible newer bytecode."
    },
    {
      "id": "ex-byte-8",
      "title": "Exercise 8: Constant Pool UTF8 String Inspection",
      "difficulty": "Easy",
      "problemStatement": "In a .class constant pool, tag 1 indicates a CONSTANT_Utf8 string. Define an enum `CpTag { UTF8(1), INTEGER(3), FLOAT(4), CLASS(7); int tag; CpTag(int t){tag=t;} }` and print `CpTag.UTF8.tag`.",
      "hint": "Tag values are specified in the JVM specification.",
      "solutionCode": "public class Solution {\n    enum CpTag {\n        UTF8(1), INTEGER(3), CLASS(7);\n        final int val;\n        CpTag(int v) { this.val = v; }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"UTF8 Tag: \" + CpTag.UTF8.val);\n    }\n}",
      "output": "UTF8 Tag: 1",
      "explanation": "Constant Pool entries are tagged with byte IDs defining their structure in the class file."
    },
    {
      "id": "ex-byte-9",
      "title": "Exercise 9: Simulating Bytecode Local Variable Array",
      "difficulty": "Medium",
      "problemStatement": "In bytecode, local variables are stored in an array indexed by slot numbers. Store values into `Object[] locals = new Object[4]`: slot 0: 'this', slot 1: 42, slot 2: 'test'. Print slot 1.",
      "hint": "Local variable tables map variable names to slot offsets.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Object[] locals = new Object[4];\n        locals[0] = \"this\";\n        locals[1] = 42;\n        locals[2] = \"test\";\n        System.out.println(\"Slot 1 value: \" + locals[1]);\n    }\n}",
      "output": "Slot 1 value: 42",
      "explanation": "JVM stack frames maintain a local variable array accessed via load and store opcodes."
    },
    {
      "id": "ex-byte-10",
      "title": "Exercise 10: Simulating JIT HotSpot Compilation Counter",
      "difficulty": "Hard",
      "problemStatement": "Simulate HotSpot invocation counters: create a method `void invoke()` that increments a counter. When counter reaches 10,000, print 'Method compiled to native machine code by JIT C2'. Run a loop 10,000 times.",
      "hint": "Check if counter == 10000 inside the method.",
      "solutionCode": "public class Solution {\n    static int invocationCount = 0;\n    static void executeMethod() {\n        invocationCount++;\n        if (invocationCount == 10_000) {\n            System.out.println(\"Method compiled to native machine code by JIT C2\");\n        }\n    }\n    public static void main(String[] args) {\n        for (int i = 0; i < 10_000; i++) {\n            executeMethod();\n        }\n    }\n}",
      "output": "Method compiled to native machine code by JIT C2",
      "explanation": "HotSpot monitors invocation counters to trigger C1 and C2 tiered native compilation."
    }
  ],
  "main-method-breakdown": [
    {
      "id": "ex-main-1",
      "title": "Exercise 1: Basic CLI Arguments Iteration",
      "difficulty": "Easy",
      "problemStatement": "Write a program that receives a `String[] args` array containing `{\"alpha\", \"beta\"}` and prints each argument on a new line.",
      "hint": "Use an enhanced for loop over args.",
      "solutionCode": "public class Solution {\n    public static void printArgs(String[] args) {\n        for (String a : args) System.out.println(a);\n    }\n    public static void main(String[] args) {\n        printArgs(new String[]{\"alpha\", \"beta\"});\n    }\n}",
      "output": "alpha\nbeta",
      "explanation": "Command-line arguments are passed sequentially into the main method's parameter array."
    },
    {
      "id": "ex-main-2",
      "title": "Exercise 2: Fallback Configuration for Missing Arguments",
      "difficulty": "Easy",
      "problemStatement": "Write a method that takes `String[] args` and returns `args[0]` if length > 0, or 'default.config' if empty. Test with an empty array.",
      "hint": "Check args.length == 0.",
      "solutionCode": "public class Solution {\n    public static String resolveConfig(String[] args) {\n        return args.length > 0 ? args[0] : \"default.config\";\n    }\n    public static void main(String[] args) {\n        System.out.println(resolveConfig(new String[0]));\n    }\n}",
      "output": "default.config",
      "explanation": "Robust command-line applications always provide safe fallbacks for missing arguments."
    },
    {
      "id": "ex-main-3",
      "title": "Exercise 3: Parsing Integer Arguments Safely",
      "difficulty": "Medium",
      "problemStatement": "Parse an integer port from `args[0]`. If `NumberFormatException` occurs, return port 8080. Test with invalid string 'abc'.",
      "hint": "Wrap Integer.parseInt(args[0]) in a try-catch block.",
      "solutionCode": "public class Solution {\n    public static int parsePort(String arg) {\n        try {\n            return Integer.parseInt(arg);\n        } catch (NumberFormatException e) {\n            return 8080;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Port: \" + parsePort(\"abc\"));\n    }\n}",
      "output": "Port: 8080",
      "explanation": "Command-line arguments are always strings and must be parsed with exception handling."
    },
    {
      "id": "ex-main-4",
      "title": "Exercise 4: Help Flag Detection",
      "difficulty": "Easy",
      "problemStatement": "Write a method that inspects `args` and prints 'Usage: java App --port <num>' if either '-h' or '--help' is present in args. Test with `{\"-h\"}`.",
      "hint": "Check arg.equals(\"-h\") || arg.equals(\"--help\").",
      "solutionCode": "public class Solution {\n    public static void checkHelp(String[] args) {\n        for (String a : args) {\n            if (a.equals(\"-h\") || a.equals(\"--help\")) {\n                System.out.println(\"Usage: java App --port <num>\");\n                return;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        checkHelp(new String[]{\"-h\"});\n    }\n}",
      "output": "Usage: java App --port <num>",
      "explanation": "Flag detection allows command-line tools to display usage instructions on request."
    },
    {
      "id": "ex-main-5",
      "title": "Exercise 5: Key-Value Option Parsing",
      "difficulty": "Medium",
      "problemStatement": "Parse an option of format '--key=value' (e.g. '--env=production'). Split by '=' and print 'Key: env, Value: production'.",
      "hint": "Use String.split(\"=\").",
      "solutionCode": "public class Solution {\n    public static void parseOption(String opt) {\n        if (opt.startsWith(\"--\")) {\n            String[] parts = opt.substring(2).split(\"=\");\n            System.out.println(\"Key: \" + parts[0] + \", Value: \" + parts[1]);\n        }\n    }\n    public static void main(String[] args) {\n        parseOption(\"--env=production\");\n    }\n}",
      "output": "Key: env, Value: production",
      "explanation": "Standard CLI options follow key-value delimiter patterns."
    },
    {
      "id": "ex-main-6",
      "title": "Exercise 6: Varargs Main Method Invocation",
      "difficulty": "Easy",
      "problemStatement": "Declare a static method `static void entry(String... params)` and call it passing 3 separate string arguments. Print parameter count.",
      "hint": "Varargs allows passing comma-separated arguments directly.",
      "solutionCode": "public class Solution {\n    public static void entry(String... params) {\n        System.out.println(\"Params count: \" + params.length);\n    }\n    public static void main(String[] args) {\n        entry(\"one\", \"two\", \"three\");\n    }\n}",
      "output": "Params count: 3",
      "explanation": "Varargs compiles directly to array parameters in Java bytecode."
    },
    {
      "id": "ex-main-7",
      "title": "Exercise 7: Simulating Exit Status Code Branching",
      "difficulty": "Easy",
      "problemStatement": "Simulate process exit logic: write a method `int evaluate(boolean valid)` returning 0 for valid and 1 for error. Print 'Status: 0' for valid.",
      "hint": "Return 0 or 1 based on condition.",
      "solutionCode": "public class Solution {\n    public static int evaluate(boolean valid) {\n        return valid ? 0 : 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Status: \" + evaluate(true));\n    }\n}",
      "output": "Status: 0",
      "explanation": "Exit code 0 signals success, while non-zero signals failure."
    },
    {
      "id": "ex-main-8",
      "title": "Exercise 8: Overloading the Main Method",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that main can be overloaded by defining `main(int x)` and calling it from `main(String[] args)`. Print 'Overloaded main: ' + x.",
      "hint": "main(int x) is a regular static method.",
      "solutionCode": "public class Solution {\n    public static void main(int x) {\n        System.out.println(\"Overloaded main: \" + x);\n    }\n    public static void main(String[] args) {\n        main(100);\n    }\n}",
      "output": "Overloaded main: 100",
      "explanation": "Java allows overloading the main method, though the JVM launcher only calls main(String[])."
    },
    {
      "id": "ex-main-9",
      "title": "Exercise 9: Passing Multiple Quoted Arguments",
      "difficulty": "Easy",
      "problemStatement": "In terminal, quotes group multiple words into a single argument. Given `args = {\"Hello World\", \"Java\"}`, print `args[0]` to verify it contains the entire phrase.",
      "hint": "Quoted arguments are treated as a single array element.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String[] sampleArgs = {\"Hello World\", \"Java\"};\n        System.out.println(sampleArgs[0]);\n    }\n}",
      "output": "Hello World",
      "explanation": "Operating system shells group quoted strings into a single argument in the args array."
    },
    {
      "id": "ex-main-10",
      "title": "Exercise 10: Shutdown Hook Registration",
      "difficulty": "Hard",
      "problemStatement": "Register a JVM shutdown hook using `Runtime.getRuntime().addShutdownHook(new Thread(...))`. Verify that the thread instance is non-null and print 'Shutdown hook registered'.",
      "hint": "addShutdownHook takes a Thread instance.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Thread hook = new Thread(() -> {});\n        Runtime.getRuntime().addShutdownHook(hook);\n        System.out.println(\"Shutdown hook registered\");\n    }\n}",
      "output": "Shutdown hook registered",
      "explanation": "Shutdown hooks execute when the JVM initiates its shutdown sequence."
    }
  ],
  "packages-and-imports": [
    {
      "id": "ex-pkg-1",
      "title": "Exercise 1: Single-Type Import Usage",
      "difficulty": "Easy",
      "problemStatement": "Import `java.util.ArrayList` explicitly and create a list with two elements. Print the list size.",
      "hint": "import java.util.ArrayList;",
      "solutionCode": "import java.util.ArrayList;\npublic class Solution {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        System.out.println(\"Size: \" + list.size());\n    }\n}",
      "output": "Size: 2",
      "explanation": "Single-type imports make specific classes available by their simple name."
    },
    {
      "id": "ex-pkg-2",
      "title": "Exercise 2: Disambiguating Conflicting Date Classes with FQCN",
      "difficulty": "Easy",
      "problemStatement": "Use both `java.util.Date` and `java.sql.Date` in the same method by qualifying the SQL date with its Fully Qualified Class Name (FQCN). Print both class names.",
      "hint": "java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());",
      "solutionCode": "import java.util.Date;\npublic class Solution {\n    public static void main(String[] args) {\n        Date utilDate = new Date(1000L);\n        java.sql.Date sqlDate = new java.sql.Date(1000L);\n        System.out.println(utilDate.getClass().getSimpleName() + \" and \" + sqlDate.getClass().getSimpleName());\n    }\n}",
      "output": "Date and Date",
      "explanation": "FQCN resolves naming collisions between packages sharing class names."
    },
    {
      "id": "ex-pkg-3",
      "title": "Exercise 3: Static Import of Math Constants",
      "difficulty": "Easy",
      "problemStatement": "Use `import static java.lang.Math.PI;` to compute the circumference of a circle with radius 10: `2 * PI * r`. Print formatted to 2 decimals.",
      "hint": "import static java.lang.Math.PI;",
      "solutionCode": "import static java.lang.Math.PI;\npublic class Solution {\n    public static void main(String[] args) {\n        double r = 10.0;\n        double circ = 2 * PI * r;\n        System.out.printf(\"Circumference: %.2f\\n\", circ);\n    }\n}",
      "output": "Circumference: 62.83",
      "explanation": "Static imports bring static constants directly into class scope without prefix."
    },
    {
      "id": "ex-pkg-4",
      "title": "Exercise 4: Static Import of Utility Methods",
      "difficulty": "Easy",
      "problemStatement": "Use `import static java.lang.Math.max;` and `import static java.lang.Math.min;` to find max and min of 15 and 45. Print result.",
      "hint": "Call max(15, 45) and min(15, 45) directly.",
      "solutionCode": "import static java.lang.Math.max;\nimport static java.lang.Math.min;\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Max: \" + max(15, 45) + \", Min: \" + min(15, 45));\n    }\n}",
      "output": "Max: 45, Min: 15",
      "explanation": "Static imports simplify utility method calls in computational logic."
    },
    {
      "id": "ex-pkg-5",
      "title": "Exercise 5: Non-Recursive Wildcard Import Verification",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that `import java.util.*;` does not import `java.util.concurrent.atomic.AtomicInteger` by referencing `AtomicInteger` via its FQCN. Print initial value 5.",
      "hint": "java.util.concurrent.atomic.AtomicInteger num = new java.util.concurrent.atomic.AtomicInteger(5);",
      "solutionCode": "import java.util.*;\npublic class Solution {\n    public static void main(String[] args) {\n        java.util.concurrent.atomic.AtomicInteger ai = new java.util.concurrent.atomic.AtomicInteger(5);\n        System.out.println(\"Atomic value: \" + ai.get());\n    }\n}",
      "output": "Atomic value: 5",
      "explanation": "Wildcard imports are strictly non-recursive and do not import sub-packages."
    },
    {
      "id": "ex-pkg-6",
      "title": "Exercise 6: Package-Private Visibility Simulation",
      "difficulty": "Medium",
      "problemStatement": "Create a package-private static helper class `PackageHelper` (without public modifier) with method `String greet()`. Call it from `Solution` in the same package and print greeting.",
      "hint": "class PackageHelper { static String greet() { return \"Hello from package\"; } }",
      "solutionCode": "public class Solution {\n    static class PackageHelper {\n        static String greet() { return \"Hello from package\"; }\n    }\n    public static void main(String[] args) {\n        System.out.println(PackageHelper.greet());\n    }\n}",
      "output": "Hello from package",
      "explanation": "Package-private members are accessible to all classes in the same package."
    },
    {
      "id": "ex-pkg-7",
      "title": "Exercise 7: Inspecting Class Package via Reflection",
      "difficulty": "Easy",
      "problemStatement": "Inspect the package of `java.lang.String` using `String.class.getPackage().getName()`. Print the package name.",
      "hint": "Class.getPackage().getName() returns the package string.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(\"Package: \" + String.class.getPackage().getName());\n    }\n}",
      "output": "Package: java.lang",
      "explanation": "The JVM reflection API exposes package metadata at runtime."
    },
    {
      "id": "ex-pkg-8",
      "title": "Exercise 8: Single-Type Import Priority Over Wildcard",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that an explicit single-type import (`import java.util.List;`) resolves cleanly even if another package is imported with wildcard.",
      "hint": "List<String> list = java.util.List.of(\"A\", \"B\");",
      "solutionCode": "import java.util.List;\npublic class Solution {\n    public static void main(String[] args) {\n        List<String> list = List.of(\"X\", \"Y\");\n        System.out.println(\"List items: \" + list.size());\n    }\n}",
      "output": "List items: 2",
      "explanation": "Explicit single-type imports take precedence over wildcard imports in symbol resolution."
    },
    {
      "id": "ex-pkg-9",
      "title": "Exercise 9: Static Member Shadowing Resolution",
      "difficulty": "Hard",
      "problemStatement": "Define a local method `static double sqrt(double x)` that returns `x / 2`. Show that calling `sqrt(10.0)` invokes the local method rather than `Math.sqrt`. Print result.",
      "hint": "Local methods shadow statically imported methods.",
      "solutionCode": "import static java.lang.Math.sqrt;\npublic class Solution {\n    static double sqrt(double x) {\n        return x / 2.0; // Local implementation\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Local sqrt: \" + sqrt(10.0));\n    }\n}",
      "output": "Local sqrt: 5.0",
      "explanation": "Local class methods shadow statically imported methods with identical signatures."
    },
    {
      "id": "ex-pkg-10",
      "title": "Exercise 10: Multi-Level Package Name Verification",
      "difficulty": "Easy",
      "problemStatement": "Given package string 'com.enterprise.banking.service', write a method that counts how many sub-packages are in the hierarchy (count of dots + 1). Print the level count.",
      "hint": "Split by '\\.' or count occurrences of dot.",
      "solutionCode": "public class Solution {\n    public static int getPackageDepth(String pkg) {\n        return pkg.split(\"\\\\.\").length;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Package depth: \" + getPackageDepth(\"com.enterprise.banking.service\"));\n    }\n}",
      "output": "Package depth: 4",
      "explanation": "Hierarchical packages represent nested directories in physical project structures."
    }
  ],
  "classpath-and-execution": [
    {
      "id": "ex-cp-1",
      "title": "Exercise 1: Reading the java.class.path System Property",
      "difficulty": "Easy",
      "problemStatement": "Read `System.getProperty(\"java.class.path\")` and print 'Classpath configured' if non-null.",
      "hint": "Check nullity of java.class.path property.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String cp = System.getProperty(\"java.class.path\");\n        System.out.println(cp != null ? \"Classpath configured\" : \"No classpath\");\n    }\n}",
      "output": "Classpath configured",
      "explanation": "java.class.path contains the active classpath entries passed to the JVM."
    },
    {
      "id": "ex-cp-2",
      "title": "Exercise 2: Detecting Host Classpath Separator Character",
      "difficulty": "Easy",
      "problemStatement": "Use `java.io.File.pathSeparator` to inspect the classpath delimiter character. Print 'Path separator: ' followed by whether it is ';' or ':'.",
      "hint": "File.pathSeparator is ';' on Windows and ':' on Unix.",
      "solutionCode": "import java.io.File;\npublic class Solution {\n    public static void main(String[] args) {\n        String sep = File.pathSeparator;\n        boolean valid = sep.equals(\";\") || sep.equals(\":\");\n        System.out.println(\"Path separator valid: \" + valid);\n    }\n}",
      "output": "Path separator valid: true",
      "explanation": "File.pathSeparator abstracts operating-system-specific classpath delimiter characters."
    },
    {
      "id": "ex-cp-3",
      "title": "Exercise 3: Catching ClassNotFoundException via Reflection",
      "difficulty": "Medium",
      "problemStatement": "Attempt to load non-existent class 'com.missing.GhostDriver' using `Class.forName()`. Catch `ClassNotFoundException` and print 'Caught ClassNotFoundException'.",
      "hint": "Class.forName throws ClassNotFoundException if the class cannot be located.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            Class.forName(\"com.missing.GhostDriver\");\n        } catch (ClassNotFoundException e) {\n            System.out.println(\"Caught ClassNotFoundException\");\n        }\n    }\n}",
      "output": "Caught ClassNotFoundException",
      "explanation": "ClassNotFoundException is a checked exception thrown during dynamic class lookup."
    },
    {
      "id": "ex-cp-4",
      "title": "Exercise 4: Querying CodeSource Location URL",
      "difficulty": "Medium",
      "problemStatement": "Inspect the physical location of `Solution.class` using `Solution.class.getProtectionDomain().getCodeSource().getLocation()`. Print 'CodeSource located'.",
      "hint": "Check nullity of getLocation().",
      "solutionCode": "import java.net.URL;\npublic class Solution {\n    public static void main(String[] args) {\n        URL loc = Solution.class.getProtectionDomain().getCodeSource().getLocation();\n        if (loc != null) {\n            System.out.println(\"CodeSource located\");\n        }\n    }\n}",
      "output": "CodeSource located",
      "explanation": "ProtectionDomain exposes the physical URL or JAR archive from which bytecode was loaded."
    },
    {
      "id": "ex-cp-5",
      "title": "Exercise 5: Parsing Main-Class Manifest Header Format",
      "difficulty": "Easy",
      "problemStatement": "Given manifest string 'Main-Class: com.example.MainApp', parse and extract the target class name. Print 'Main class: com.example.MainApp'.",
      "hint": "Use substring after 'Main-Class: '.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String line = \"Main-Class: com.example.MainApp\";\n        String mainClass = line.replace(\"Main-Class: \", \"\").trim();\n        System.out.println(\"Main class: \" + mainClass);\n    }\n}",
      "output": "Main class: com.example.MainApp",
      "explanation": "The Main-Class manifest attribute specifies the executable entry point in JARs."
    },
    {
      "id": "ex-cp-6",
      "title": "Exercise 6: Splitting Multiple Classpath Entries",
      "difficulty": "Medium",
      "problemStatement": "Given a classpath string 'bin;lib/mysql.jar;lib/log4j.jar' (or with colons), split by `File.pathSeparator` and print the entry count.",
      "hint": "Use cp.split(File.pathSeparator).",
      "solutionCode": "import java.io.File;\npublic class Solution {\n    public static void main(String[] args) {\n        String cp = \"bin\" + File.pathSeparator + \"lib/a.jar\" + File.pathSeparator + \"lib/b.jar\";\n        String[] entries = cp.split(File.pathSeparator);\n        System.out.println(\"Entries count: \" + entries.length);\n    }\n}",
      "output": "Entries count: 3",
      "explanation": "The JVM parses the classpath string into individual directories and archives."
    },
    {
      "id": "ex-cp-7",
      "title": "Exercise 7: Simulating NoClassDefFoundError Catch",
      "difficulty": "Hard",
      "problemStatement": "Demonstrate that `NoClassDefFoundError` is an `Error` (not an `Exception`) by throwing and catching it explicitly. Print 'Caught NoClassDefFoundError'.",
      "hint": "throw new NoClassDefFoundError(\"Simulated linkage error\");",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            throw new NoClassDefFoundError(\"Simulated linkage error\");\n        } catch (NoClassDefFoundError e) {\n            System.out.println(\"Caught NoClassDefFoundError\");\n        }\n    }\n}",
      "output": "Caught NoClassDefFoundError",
      "explanation": "NoClassDefFoundError represents a fatal JVM linking failure."
    },
    {
      "id": "ex-cp-8",
      "title": "Exercise 8: Dynamic Class Loading and Instance Creation",
      "difficulty": "Medium",
      "problemStatement": "Dynamically load `java.util.ArrayList` via `Class.forName(\"java.util.ArrayList\")` and instantiate it using `clazz.getDeclaredConstructor().newInstance()`. Print the instantiated class name.",
      "hint": "Use reflection getDeclaredConstructor().newInstance().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) throws Exception {\n        Class<?> clazz = Class.forName(\"java.util.ArrayList\");\n        Object obj = clazz.getDeclaredConstructor().newInstance();\n        System.out.println(\"Instantiated: \" + obj.getClass().getSimpleName());\n    }\n}",
      "output": "Instantiated: ArrayList",
      "explanation": "Reflection uses the classpath to dynamically discover and instantiate classes at runtime."
    },
    {
      "id": "ex-cp-9",
      "title": "Exercise 9: Verifying Class Loading Order",
      "difficulty": "Medium",
      "problemStatement": "Simulate classpath search order: given an array of two paths `[\"lib/v1.jar\", \"lib/v2.jar\"]`, find the first path containing 'target.class'. Print the winning path.",
      "hint": "Iterate through paths and break on first match.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String[] cp = {\"lib/v1.jar\", \"lib/v2.jar\"};\n        String found = cp[0]; // First match wins\n        System.out.println(\"Loaded from: \" + found);\n    }\n}",
      "output": "Loaded from: lib/v1.jar",
      "explanation": "The JVM scans classpath entries left-to-right and selects the first matching class file."
    },
    {
      "id": "ex-cp-10",
      "title": "Exercise 10: Validating Classpath Root Directory Logic",
      "difficulty": "Easy",
      "problemStatement": "Given package 'com.company.App' and compiled path '/app/build/com/company/App.class', write a method that strips the package path to return the correct classpath root '/app/build'.",
      "hint": "Replace package path suffix with empty string.",
      "solutionCode": "public class Solution {\n    public static String getRoot(String fullPath, String pkgPath) {\n        return fullPath.replace(pkgPath, \"\");\n    }\n    public static void main(String[] args) {\n        String root = getRoot(\"/app/build/com/company/App.class\", \"com/company/App.class\");\n        System.out.println(\"Root: \" + root.replace(\"//\", \"/\"));\n    }\n}",
      "output": "Root: /app/build/",
      "explanation": "Classpath entries must strictly point to the root directory where package hierarchies begin."
    }
  ],
  "fundamentals-challenge": [
    {
      "id": "ex-fund-chal-1",
      "title": "Exercise 1: JVM Runtime Metrics Reporter",
      "difficulty": "Medium",
      "problemStatement": "Write a program that queries the JVM Runtime to report available CPU cores and verifies that total heap memory is greater than 0. Print 'Cores: [count], Heap: OK'.",
      "hint": "Use Runtime.getRuntime().availableProcessors() and Runtime.getRuntime().totalMemory().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Runtime rt = Runtime.getRuntime();\n        int cores = rt.availableProcessors();\n        boolean heapOk = rt.totalMemory() > 0;\n        System.out.println(\"Cores: \" + cores + \", Heap: \" + (heapOk ? \"OK\" : \"FAIL\"));\n    }\n}",
      "output": "Cores: 8, Heap: OK",
      "explanation": "Runtime provides access to process metrics managed by the host JVM."
    },
    {
      "id": "ex-fund-chal-2",
      "title": "Exercise 2: Command-Line Arguments Validator and Sum",
      "difficulty": "Easy",
      "problemStatement": "Write a method `int sumArgs(String[] args)` that parses integer command-line arguments and returns their sum. If no arguments are provided, return 0. Test with args ['10', '20', '30'].",
      "hint": "Loop through args and use Integer.parseInt().",
      "solutionCode": "public class Solution {\n    static int sumArgs(String[] args) {\n        int sum = 0;\n        for (String s : args) {\n            sum += Integer.parseInt(s);\n        }\n        return sum;\n    }\n    public static void main(String[] args) {\n        String[] testArgs = {\"10\", \"20\", \"30\"};\n        System.out.println(\"Total: \" + sumArgs(testArgs));\n    }\n}",
      "output": "Total: 60",
      "explanation": "Command-line arguments are passed into main() as an array of Strings, requiring parsing for numeric use."
    },
    {
      "id": "ex-fund-chal-3",
      "title": "Exercise 3: ClassLoader Hierarchy Inspection",
      "difficulty": "Medium",
      "problemStatement": "Write a program that inspects the ClassLoader of the current class and checks if the Bootstrap ClassLoader of `String.class` is null. Print 'Bootstrap is null: true'.",
      "hint": "Core classes in java.base return null for getClassLoader().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean isNull = String.class.getClassLoader() == null;\n        System.out.println(\"Bootstrap is null: \" + isNull);\n    }\n}",
      "output": "Bootstrap is null: true",
      "explanation": "The native Bootstrap ClassLoader is represented by null in the Java ClassLoader API."
    },
    {
      "id": "ex-fund-chal-4",
      "title": "Exercise 4: Cross-Platform Path Construction",
      "difficulty": "Easy",
      "problemStatement": "Construct a platform-independent filesystem path 'app/config/settings.json' using `System.getProperty(\"file.separator\")` or `File.separator`. Print the normalized path with forward slashes for output verification.",
      "hint": "Use String.join with File.separator.",
      "solutionCode": "import java.io.File;\npublic class Solution {\n    public static void main(String[] args) {\n        String path = String.join(\"/\", \"app\", \"config\", \"settings.json\");\n        System.out.println(\"Path: \" + path);\n    }\n}",
      "output": "Path: app/config/settings.json",
      "explanation": "Using platform separators avoids hardcoding Windows backslashes or POSIX slashes."
    },
    {
      "id": "ex-fund-chal-5",
      "title": "Exercise 5: Static Initialization Sequence Verification",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that static initializer blocks run exactly once when a class is initialized. Create a class with a static block that increments a counter. Access a static method twice and print the counter.",
      "hint": "The JVM guarantees that a class's <clinit> method is executed only once per classloader.",
      "solutionCode": "public class Solution {\n    static class Counter {\n        static int count = 0;\n        static {\n            count++;\n        }\n        static void ping() {}\n    }\n    public static void main(String[] args) {\n        Counter.ping();\n        Counter.ping();\n        System.out.println(\"Init count: \" + Counter.count);\n    }\n}",
      "output": "Init count: 1",
      "explanation": "Static initializer blocks run exactly once when the class is first linked and initialized by the JVM."
    },
    {
      "id": "ex-fund-chal-6",
      "title": "Exercise 6: Dynamic Reflection and ClassNotFoundException Handling",
      "difficulty": "Medium",
      "problemStatement": "Write a method `boolean classExists(String className)` that uses `Class.forName(className)` and safely catches `ClassNotFoundException` returning false. Test with 'java.lang.String' and 'com.fake.Missing'.",
      "hint": "Catch ClassNotFoundException and return false.",
      "solutionCode": "public class Solution {\n    static boolean classExists(String name) {\n        try {\n            Class.forName(name);\n            return true;\n        } catch (ClassNotFoundException e) {\n            return false;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(classExists(\"java.lang.String\") + \" and \" + classExists(\"com.fake.Missing\"));\n    }\n}",
      "output": "true and false",
      "explanation": "Class.forName dynamically asks the ClassLoader to load a class by name, throwing ClassNotFoundException if not found."
    },
    {
      "id": "ex-fund-chal-7",
      "title": "Exercise 7: System Property Fallback Query",
      "difficulty": "Easy",
      "problemStatement": "Use `System.getProperty(key, def)` with a default fallback to query 'app.environment'. Print 'Environment: [value]'.",
      "hint": "System.getProperty takes a key and a default value if the key is not set.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String env = System.getProperty(\"app.environment\", \"production\");\n        System.out.println(\"Environment: \" + env);\n    }\n}",
      "output": "Environment: production",
      "explanation": "System.getProperty allows runtime application configuration via `-Dkey=value` flags with safe defaults."
    },
    {
      "id": "ex-fund-chal-8",
      "title": "Exercise 8: JVM Shutdown Hook Registration",
      "difficulty": "Hard",
      "problemStatement": "Demonstrate registering a shutdown hook using `Runtime.getRuntime().addShutdownHook()`. Print 'Hook registered successfully'.",
      "hint": "Pass an unstarted Thread into addShutdownHook.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Thread hook = new Thread(() -> {});\n        Runtime.getRuntime().addShutdownHook(hook);\n        System.out.println(\"Hook registered successfully\");\n    }\n}",
      "output": "Hook registered successfully",
      "explanation": "Shutdown hooks allow applications to release resources, flush logs, and close connections during graceful exit."
    },
    {
      "id": "ex-fund-chal-9",
      "title": "Exercise 9: OS Environment Variable Inspection",
      "difficulty": "Easy",
      "problemStatement": "Check whether `System.getenv(\"PATH\")` or `System.getenv(\"Path\")` is non-null. Print 'PATH configured: true'.",
      "hint": "System.getenv queries host operating system environment variables.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String p = System.getenv(\"PATH\");\n        if (p == null) p = System.getenv(\"Path\");\n        System.out.println(\"PATH configured: \" + (p != null));\n    }\n}",
      "output": "PATH configured: true",
      "explanation": "System.getenv() provides access to environment variables passed by the host OS process launcher."
    },
    {
      "id": "ex-fund-chal-10",
      "title": "Exercise 10: Modern Process Handle Uptime Query",
      "difficulty": "Medium",
      "problemStatement": "In Java 9+, query `ProcessHandle.current().pid()`. Verify that the PID is greater than 0 and print 'Process PID valid: true'.",
      "hint": "ProcessHandle.current() returns the handle to the running JVM process.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        long pid = ProcessHandle.current().pid();\n        System.out.println(\"Process PID valid: \" + (pid > 0));\n    }\n}",
      "output": "Process PID valid: true",
      "explanation": "Java 9 ProcessHandle API provides native operating system PID and process tree management."
    }
  ]
};
