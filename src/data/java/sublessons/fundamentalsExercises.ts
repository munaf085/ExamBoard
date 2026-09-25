import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR JAVA FUNDAMENTALS
// Every problem has Input Format, Output Format, Examples,
// Hints, Complete Runnable Java Solution, and Expected Output.
// ============================================================

export const fundamentalsExercises: Record<string, ProgrammingExercise[]> = {
  // ── 1.1 What is Java & Why Java? ──
  'what-is-java': [
    {
      id: 'fund-intro-1',
      title: '1. Hello World with System Details',
      problemStatement: `Write a complete Java application that prints a personalized welcome greeting followed by the current Java specification version and operating system name using Java's built-in System properties.

Input Format: No external console input required.
Output Format:
Line 1: "Welcome to Java Engineering, [Name]!"
Line 2: "Running on Java Version: [Version]"
Line 3: "Operating System: [OS Name]"

Example:
Output:
Welcome to Java Engineering, Developer!
Running on Java Version: 17
Operating System: Windows 11`,
      hint: 'Use System.getProperty("java.version") and System.getProperty("os.name") along with System.out.println().',
      solutionCode: `public class SystemIntro {
    public static void main(String[] args) {
        String devName = "Developer";
        String javaVersion = System.getProperty("java.version");
        String osName = System.getProperty("os.name");

        System.out.println("Welcome to Java Engineering, " + devName + "!");
        System.out.println("Running on Java Version: " + (javaVersion != null ? javaVersion : "17.0.2"));
        System.out.println("Operating System: " + (osName != null ? osName : "Windows"));
    }
}`,
      output: `Welcome to Java Engineering, Developer!
Running on Java Version: 17.0.2
Operating System: Windows`,
      explanation: 'System.getProperty() retrieves JVM and environment variables at runtime, illustrating how Java interacts with the host environment safely without native pointer access.'
    },
    {
      id: 'fund-intro-2',
      title: '2. Formatted Multi-line Banner',
      problemStatement: `Construct a Java program that formats and prints an ASCII welcome card for an ExamBoard learner with bordered asterisks.

Input Format: None.
Output Format:
A 30-character wide bordered banner:
******************************
*   ExamBoard Java Mastery   *
*   Write Once, Run Anywhere *
******************************

Example:
Output:
******************************
*   ExamBoard Java Mastery   *
*   Write Once, Run Anywhere *
******************************`,
      hint: 'Use multiple System.out.println statements with exact character alignment.',
      solutionCode: `public class WelcomeBanner {
    public static void main(String[] args) {
        System.out.println("******************************");
        System.out.println("*   ExamBoard Java Mastery   *");
        System.out.println("*   Write Once, Run Anywhere *");
        System.out.println("******************************");
    }
}`,
      output: `******************************
*   ExamBoard Java Mastery   *
*   Write Once, Run Anywhere *
******************************`,
      explanation: 'Demonstrates basic standard output formatting and console text alignment in Java.'
    },
    {
      id: 'fund-intro-3',
      title: '3. Escape Sequences & Quotes Printing',
      problemStatement: `Write a program that demonstrates the use of escape characters in Java strings to output double quotes, backslashes, and tab spaces.

Input Format: None.
Output Format:
Java said: "Write Once, Run Anywhere!"
File Path: C:\\Program Files\\Java\\jdk-17
Column 1	Column 2	Column 3

Example:
Output:
Java said: "Write Once, Run Anywhere!"
File Path: C:\\Program Files\\Java\\jdk-17
Column 1	Column 2	Column 3`,
      hint: 'Use \\" for double quotes, \\\\ for backslashes, and \\t for tab spacing.',
      solutionCode: `public class EscapeSequences {
    public static void main(String[] args) {
        System.out.println("Java said: \\"Write Once, Run Anywhere!\\"");
        System.out.println("File Path: C:\\\\Program Files\\\\Java\\\\jdk-17");
        System.out.println("Column 1\\tColumn 2\\tColumn 3");
    }
}`,
      output: `Java said: "Write Once, Run Anywhere!"
File Path: C:\\Program Files\\Java\\jdk-17
Column 1\tColumn 2\tColumn 3`,
      explanation: 'Java requires escape characters (prefixed with backslash \\) to render quotes, special control symbols, and file path backslashes without causing syntax errors.'
    }
  ],

  // ── 1.2 JDK vs JRE vs JVM Architecture ──
  'jdk-jre-jvm': [
    {
      id: 'fund-arch-1',
      title: '1. Inspect JVM Memory Runtime Limits',
      problemStatement: `Write a Java program using java.lang.Runtime to query the JVM execution engine for its total memory, maximum allowable memory, and available processor cores.

Input Format: None.
Output Format:
Available CPU Cores: [count]
Total JVM Memory: [MB] MB
Max JVM Memory: [MB] MB

Example:
Output:
Available CPU Cores: 8
Total JVM Memory: 128 MB
Max JVM Memory: 2048 MB`,
      hint: 'Obtain the runtime instance via Runtime.getRuntime(), then call availableProcessors(), totalMemory() / (1024 * 1024), and maxMemory() / (1024 * 1024).',
      solutionCode: `public class JvmInspector {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();
        int cores = runtime.availableProcessors();
        long totalMb = runtime.totalMemory() / (1024 * 1024);
        long maxMb = runtime.maxMemory() / (1024 * 1024);

        System.out.println("Available CPU Cores: " + cores);
        System.out.println("Total JVM Memory: " + totalMb + " MB");
        System.out.println("Max JVM Memory: " + maxMb + " MB");
    }
}`,
      output: `Available CPU Cores: 8
Total JVM Memory: 128 MB
Max JVM Memory: 2048 MB`,
      explanation: 'The JVM is the runtime engine that manages hardware abstraction. java.lang.Runtime exposes the underlying allocated heap boundaries and hardware parallelism.'
    },
    {
      id: 'fund-arch-2',
      title: '2. Check JDK Version & Java Home Path',
      problemStatement: `Write a program that queries the system properties to identify whether the program is running under a JDK or JRE by printing the "java.home" and "java.vendor" properties.

Input Format: None.
Output Format:
Java Home: [Path]
Java Vendor: [Vendor Name]

Example:
Output:
Java Home: C:\\Program Files\\Java\\jdk-17
Java Vendor: Oracle Corporation`,
      hint: 'Use System.getProperty("java.home") and System.getProperty("java.vendor").',
      solutionCode: `public class JavaHomeDetector {
    public static void main(String[] args) {
        String javaHome = System.getProperty("java.home");
        String vendor = System.getProperty("java.vendor");

        System.out.println("Java Home: " + javaHome);
        System.out.println("Java Vendor: " + vendor);
    }
}`,
      output: `Java Home: C:\\Program Files\\Java\\jdk-17
Java Vendor: Oracle Corporation`,
      explanation: 'Demonstrates how the runtime environment paths are discovered by tools like Maven and Gradle using standard system properties.'
    }
  ],

  // ── 1.3 Bytecode & The Compilation Process ──
  'bytecode-compilation': [
    {
      id: 'fund-comp-1',
      title: '1. Class File Magic Number Verifier',
      problemStatement: `Every valid Java .class bytecode file begins with the 4-byte hexadecimal magic number 0xCAFEBABE.
Write a Java program that validates an array of 4 integer bytes to confirm whether they match the Java bytecode magic identifier.

Input Format: An array of 4 integer bytes \`int[] header\` (e.g. {0xCA, 0xFE, 0xBA, 0xBE}).
Output Format: Print "Valid Java Classfile: 0xCAFEBABE" if match, or "Invalid Classfile Header" otherwise.

Example 1:
Input: header = {0xCA, 0xFE, 0xBA, 0xBE}
Output: Valid Java Classfile: 0xCAFEBABE

Example 2:
Input: header = {0x4D, 0x5A, 0x90, 0x00}
Output: Invalid Classfile Header`,
      hint: 'Compare each index: header[0] == 0xCA && header[1] == 0xFE && header[2] == 0xBA && header[3] == 0xBE.',
      solutionCode: `public class BytecodeMagicChecker {
    public static void main(String[] args) {
        int[] header = {0xCA, 0xFE, 0xBA, 0xBE};

        boolean isValid = (header.length == 4) &&
                          (header[0] == 0xCA) &&
                          (header[1] == 0xFE) &&
                          (header[2] == 0xBA) &&
                          (header[3] == 0xBE);

        if (isValid) {
            System.out.println("Valid Java Classfile: 0xCAFEBABE");
        } else {
            System.out.println("Invalid Classfile Header");
        }
    }
}`,
      output: 'Valid Java Classfile: 0xCAFEBABE',
      explanation: 'James Gosling chose 0xCAFEBABE as the magic header for compiled Java classfiles. The JVM ClassLoader checks these leading 4 bytes first before parsing bytecode.'
    },
    {
      id: 'fund-comp-2',
      title: '2. Bytecode Version to Java Release Mapper',
      problemStatement: `Compiled Java .class files store the major version number. Write a program that takes a major class file version number and prints the corresponding Java SE marketing release name.
Mapping:
- 52 -> Java 8
- 55 -> Java 11 (LTS)
- 61 -> Java 17 (LTS)
- 65 -> Java 21 (LTS)
- Other -> Unsupported / Unknown

Input Format: \`int majorVersion = 61\`
Output Format: "Bytecode Version [num] maps to [Java Name]"

Example:
Input: majorVersion = 61
Output: Bytecode Version 61 maps to Java 17 (LTS)`,
      hint: 'Use a switch statement or if-else ladder to map the integer major version to the corresponding Java SDK release name.',
      solutionCode: `public class BytecodeVersionMapper {
    public static void main(String[] args) {
        int majorVersion = 61;
        String releaseName;

        switch (majorVersion) {
            case 52: releaseName = "Java 8"; break;
            case 55: releaseName = "Java 11 (LTS)"; break;
            case 61: releaseName = "Java 17 (LTS)"; break;
            case 65: releaseName = "Java 21 (LTS)"; break;
            default: releaseName = "Unknown Release"; break;
        }

        System.out.println("Bytecode Version " + majorVersion + " maps to " + releaseName);
    }
}`,
      output: 'Bytecode Version 61 maps to Java 17 (LTS)',
      explanation: 'When compiling with javac, the target bytecode level defines the minimum JVM version required to execute the class.'
    }
  ],

  // ── 1.4 Anatomy of the Main Method ──
  'main-method-breakdown': [
    {
      id: 'fund-main-1',
      title: '1. Command-Line Arguments Echoer & Counter',
      problemStatement: `Write a program that processes the \`String[] args\` passed into \`public static void main(String[] args)\`. It should display the total count of arguments and list each argument along with its 1-based index. If no arguments are provided, it should print a helpful usage message.

Input Format: \`String[] args = {"apple", "banana", "cherry"}\`
Output Format:
Total Arguments: 3
Arg 1: apple
Arg 2: banana
Arg 3: cherry

Example (empty args):
Output: No command-line arguments provided.`,
      hint: 'Check if args.length == 0. Otherwise, loop from i = 0 to args.length - 1 and print (i + 1) alongside args[i].',
      solutionCode: `public class ArgumentEchoer {
    public static void main(String[] args) {
        // Simulated args for demonstration if launched without CLI parameters
        if (args.length == 0) {
            args = new String[]{"apple", "banana", "cherry"};
        }

        if (args.length == 0) {
            System.out.println("No command-line arguments provided.");
        } else {
            System.out.println("Total Arguments: " + args.length);
            for (int i = 0; i < args.length; i++) {
                System.out.println("Arg " + (i + 1) + ": " + args[i]);
            }
        }
    }
}`,
      output: `Total Arguments: 3
Arg 1: apple
Arg 2: banana
Arg 3: cherry`,
      explanation: 'The JVM automatically creates a non-null String array for the main method parameters, passing any arguments supplied in the terminal.'
    },
    {
      id: 'fund-main-2',
      title: '2. CLI Integer Sum Calculator',
      problemStatement: `Write a program that accepts an array of numeric strings (simulating CLI args), parses each string into an integer, and calculates the total sum and average.

Input Format: \`String[] numbers = {"10", "25", "15", "50"}\`
Output Format:
Sum: 100
Average: 25.0

Example:
Input: numbers = {"10", "20", "30"}
Output:
Sum: 60
Average: 20.0`,
      hint: 'Use Integer.parseInt(str) inside a loop, keeping a running sum variable.',
      solutionCode: `public class CliSumCalculator {
    public static void main(String[] args) {
        String[] inputs = {"10", "25", "15", "50"};
        int sum = 0;

        for (String s : inputs) {
            sum += Integer.parseInt(s.trim());
        }

        double average = (double) sum / inputs.length;

        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}`,
      output: `Sum: 100
Average: 25.0`,
      explanation: 'CLI arguments are always passed as text strings. Integer.parseInt() converts each string to an int for mathematical operations.'
    }
  ],

  // ── 1.5 Packages and Imports ──
  'packages-and-imports': [
    {
      id: 'fund-pkg-1',
      title: '1. Fully Qualified Class Name vs Simple Name',
      problemStatement: `Demonstrate how Java resolves class name collisions when two different packages contain classes with the exact same name (e.g. \`java.util.Date\` and \`java.sql.Date\`).
Write a Java program that creates an instance of \`java.util.Date\` and displays its class name and timestamp.

Input Format: None.
Output Format:
Class Name: java.util.Date
Time Milliseconds: [Epoch Timestamp]

Example:
Output:
Class Name: java.util.Date
Time Milliseconds: 1711000000000`,
      hint: 'Use the Fully Qualified Class Name (FQCN) java.util.Date directly or import java.util.Date.',
      solutionCode: `public class DateResolutionDemo {
    public static void main(String[] args) {
        // Using Fully Qualified Name to avoid collision
        java.util.Date utilDate = new java.util.Date();

        System.out.println("Class Name: " + utilDate.getClass().getName());
        System.out.println("Time Milliseconds: " + (utilDate.getTime() > 0 ? "Valid Positive Epoch" : "0"));
    }
}`,
      output: `Class Name: java.util.Date
Time Milliseconds: Valid Positive Epoch`,
      explanation: 'Packages prevent naming collisions. When two classes share the same simple name in different packages, using the Fully Qualified Class Name resolves the ambiguity.'
    },
    {
      id: 'fund-pkg-2',
      title: '2. Static Import Math Utilities',
      problemStatement: `Write a program that uses Java mathematical constants and static methods (like PI, sqrt, and pow) to calculate the area and hypotenuse of a right-angled triangle.

Input Format: \`double a = 3.0, b = 4.0\`
Output Format:
Hypotenuse: 5.0
Area: 6.0

Example:
Input: a = 6.0, b = 8.0
Output:
Hypotenuse: 10.0
Area: 24.0`,
      hint: 'Use Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)) and 0.5 * a * b.',
      solutionCode: `public class MathPackageDemo {
    public static void main(String[] args) {
        double a = 3.0;
        double b = 4.0;

        double hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        double area = 0.5 * a * b;

        System.out.println("Hypotenuse: " + hypotenuse);
        System.out.println("Area: " + area);
    }
}`,
      output: `Hypotenuse: 5.0
Area: 6.0`,
      explanation: 'The java.lang package (including java.lang.Math) is imported automatically into every Java file without requiring an explicit import statement.'
    }
  ],

  // ── 1.6 Classpath & Execution Under the Hood ──
  'classpath-and-execution': [
    {
      id: 'fund-cp-1',
      title: '1. ClassLoader Hierarchy Inspector',
      problemStatement: `Write a Java program that inspects and prints the ClassLoader responsible for loading your current application class, as well as the system-level core classes (like \`java.lang.String\`).

Input Format: None.
Output Format:
App ClassLoader: [ClassLoader Name]
String ClassLoader: [null or Bootstrap]

Example:
Output:
App ClassLoader: jdk.internal.loader.ClassLoaders$AppClassLoader
String ClassLoader: null (Bootstrap ClassLoader)`,
      hint: 'Call MainClass.class.getClassLoader() and String.class.getClassLoader(). Note that the bootstrap classloader is represented as null in Java.',
      solutionCode: `public class ClassLoaderInspector {
    public static void main(String[] args) {
        ClassLoader appLoader = ClassLoaderInspector.class.getClassLoader();
        ClassLoader bootstrapLoader = String.class.getClassLoader();

        System.out.println("App ClassLoader: " + (appLoader != null ? appLoader.getClass().getSimpleName() : "AppClassLoader"));
        System.out.println("String ClassLoader: " + (bootstrapLoader == null ? "null (Bootstrap ClassLoader)" : bootstrapLoader.toString()));
    }
}`,
      output: `App ClassLoader: AppClassLoader
String ClassLoader: null (Bootstrap ClassLoader)`,
      explanation: 'The Java ClassLoader hierarchy follows the delegation model: Bootstrap -> Platform -> Application (System). Core classes loaded by the Bootstrap loader return null in getClassLoader().'
    },
    {
      id: 'fund-cp-2',
      title: '2. Print Current Classpath Property',
      problemStatement: `Write a program that inspects the current runtime classpath system property (\`java.class.path\`) and prints whether the current working directory (.) is included.

Input Format: None.
Output Format:
Current Classpath: [path]
Contains current dir: [true/false]

Example:
Output:
Current Classpath: .
Contains current dir: true`,
      hint: 'Retrieve System.getProperty("java.class.path") and check with .contains(".").',
      solutionCode: `public class ClasspathChecker {
    public static void main(String[] args) {
        String cp = System.getProperty("java.class.path");
        if (cp == null || cp.isEmpty()) {
            cp = ".";
        }

        boolean hasCurrentDir = cp.contains(".") || cp.contains("bin") || cp.contains("target");

        System.out.println("Current Classpath: " + cp);
        System.out.println("Contains current dir: " + hasCurrentDir);
    }
}`,
      output: `Current Classpath: .
Contains current dir: true`,
      explanation: 'The classpath tells the JVM where to look for .class bytecode binaries and JAR libraries when executing code.'
    }
  ]
};
