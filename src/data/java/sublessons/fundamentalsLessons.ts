import { DetailedLesson } from '../detailedLessons';

export const fundamentalsLessons: Record<string, DetailedLesson> = {
  'what-is-java': {
    id: 'what-is-java',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.1',
    title: 'What is Java & Why Java?',
    subtitle: 'History, key design goals, and the Write Once, Run Anywhere (WORA) philosophy',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of Java like universal sheet music. A song written in musical notes can be played by any musician in the world, whether they have a piano in India, a guitar in the USA, or a violin in Japan, as long as they know how to read sheet music. In Java, "sheet music" is bytecode, and the "musician" is the JVM.',
    coreExplanation: [
      'Java was created in 1995 by James Gosling and team at Sun Microsystems (later acquired by Oracle).',
      'Original goal: Oak project designed for interactive televisions and home appliances, which needed software that could run on many different chips.',
      'Core philosophy: "Write Once, Run Anywhere" (WORA). You write code once on a Windows PC, and that exact same compiled code can run on Linux, Mac, Android, or cloud servers.',
      'Java is strictly object-oriented, strongly typed, statically typed, and comes with automatic memory management (Garbage Collection).',
      'Java avoids hazardous C/C++ pitfalls like direct pointer manipulation, manual memory free() calls, and multiple class inheritance.',
    ],
    diagram: `[ Developer writes Java Code ]  ->  Main.java
                |
          (javac compiler)
                |
[ Platform-Neutral Bytecode ]   ->  Main.class
                |
     +----------+----------+
     |                     |
[ Windows JVM ]       [ Linux JVM ]       [ Mac JVM ]
     |                     |                   |
[ Windows Chip ]      [ Linux Server ]    [ Mac Apple Silicon ]`,
    codeSnippet: {
      title: 'Your Very First Java Program',
      code: `public class Welcome {
    public static void main(String[] args) {
        System.out.println("Welcome to Java Programming!");
    }
}`,
      lineByLineExplanation: [
        { line: 'public class Welcome', explanation: 'Defines a public blueprint named "Welcome". The filename MUST be Welcome.java.' },
        { line: 'public static void main(String[] args)', explanation: 'The entry door. When you hit run, the computer starts executing code right here.' },
        { line: 'System.out.println(...);', explanation: 'System = system tools, out = console screen output, println = print line and then move cursor to next line.' },
      ],
      output: 'Welcome to Java Programming!'
    },
    beginnerMistakes: [
      {
        mistake: 'Saving the file as "welcome.java" (lowercase w) when class is "Welcome".',
        whyItHappens: 'Windows file systems are sometimes case-insensitive, but Java is strictly case-sensitive.',
        howToFix: 'Always match the file name EXACTLY to the public class name, letter for letter: Welcome.java.'
      },
      {
        mistake: 'Forgetting the semicolon (;) at the end of a line.',
        whyItHappens: 'In everyday writing we use periods; in Java, every single command statement MUST end with a semicolon.',
        howToFix: 'Check the end of every line. If it is an action statement, make sure it ends with ";".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why is Java called platform-independent?',
        answer: 'Because Java source code (.java) is compiled into platform-neutral bytecode (.class) rather than machine-specific binary. Any operating system with a JVM installed can execute this bytecode without modifying or re-compiling the code.'
      },
      {
        question: 'Is Java a 100% pure object-oriented language?',
        answer: 'No, because Java retains 8 primitive data types (int, char, boolean, float, etc.) that are not objects. This was done deliberately for maximum runtime speed and reduced memory overhead.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the slogan that defines Java platform independence?',
        options: ['Code Fast, Break Things', 'Write Once, Run Anywhere', 'Run Once, Write Anywhere', 'Compile Everywhere, Debug Nowhere'],
        correctIndex: 1,
        explanation: '"Write Once, Run Anywhere" (WORA) means you compile your code once to bytecode, and it executes on any machine with a JVM.'
      },
      {
        question: 'If a public class is named UserProfile, what must the source code file be named?',
        options: ['userprofile.java', 'UserProfile.java', 'user_profile.java', 'Main.java'],
        correctIndex: 1,
        explanation: 'In Java, the file name must strictly match the public class name with the .java extension, preserving exact capitalization.'
      }
    ]
  },

  'jdk-jre-jvm': {
    id: 'jdk-jre-jvm',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.2',
    title: 'JDK vs JRE vs JVM Architecture',
    subtitle: 'The 3 pillars of Java execution: Tools, Runtime Libraries, and Virtual Machine',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Imagine a bakery: JDK is the entire bakery kitchen equipped with raw ingredients, ovens, recipe books, baking pans, and measuring cups (everything a Baker needs to make cakes). JRE is a pastry delivery box containing the ready-to-eat cake along with forks and napkins (everything a Customer needs to eat the cake). JVM is the customer\'s stomach that actually digests and turns the cake into energy.',
    coreExplanation: [
      'JDK (Java Development Kit): The full toolkit for DEVELOPERS. It contains the Java compiler (javac), debugger (jdb), documentation generator (javadoc), archiving tool (jar), AND the complete JRE.',
      'JRE (Java Runtime Environment): The bundle for END-USERS. It contains the JVM plus standard Java class libraries (String, Math, Collections, Scanner) needed to RUN compiled Java programs. It does NOT have a compiler.',
      'JVM (Java Virtual Machine): The abstract software execution engine. It never touches your .java files; it only reads and executes .class bytecode files.',
      'Relationship equation: JDK = JRE + Development Tools (javac, debugger). JRE = JVM + Core Class Libraries.',
      'Platform Dependency: Java code is platform-independent, but the JVM itself is platform-dependent! There is a specific JVM for Windows x64, a different JVM for macOS ARM, and another for Linux Ubuntu.',
    ],
    diagram: `+-------------------------------------------------------+
|  JDK (Java Development Kit)                           |
|  - Compiler (javac)                                   |
|  - Debugger (jdb), Archiver (jar), Documentation     |
|                                                       |
|  +-------------------------------------------------+  |
|  |  JRE (Java Runtime Environment)                 |  |
|  |  - Standard Class Libraries (java.lang, etc.)   |  |
|  |                                                 |  |
|  |  +-------------------------------------------+  |  |
|  |  |  JVM (Java Virtual Machine)               |  |  |
|  |  |  - ClassLoader (loads .class files)       |  |  |
|  |  |  - Bytecode Verifier (security check)     |  |  |
|  |  |  - Execution Engine (Interpreter + JIT)   |  |  |
|  |  |  - Garbage Collector                      |  |  |
|  |  +-------------------------------------------+  |  |
|  +-------------------------------------------------+  |
+-------------------------------------------------------+`,
    codeSnippet: {
      title: 'Inspecting Your Java Runtime from Code',
      code: `public class EnvironmentCheck {
    public static void main(String[] args) {
        // Query the running JVM properties
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Vendor: " + System.getProperty("java.vm.vendor"));
        System.out.println("Operating System: " + System.getProperty("os.name"));
    }
}`,
      lineByLineExplanation: [
        { line: 'System.getProperty("java.version")', explanation: 'Asks the currently running JVM what Java version is installed.' },
        { line: 'System.getProperty("os.name")', explanation: 'Shows the underlying operating system where this JVM is operating.' },
      ],
      output: `Java Version: 21.0.2
JVM Vendor: Oracle Corporation
Operating System: Windows 11`
    },
    beginnerMistakes: [
      {
        mistake: 'Installing only the JRE and trying to run "javac" in terminal.',
        whyItHappens: 'Beginners download the runtime thinking it includes the compiler. "javac" command not found error occurs.',
        howToFix: 'Always install the complete JDK (Java Development Kit), which includes javac automatically.'
      },
      {
        mistake: 'Believing the JVM is platform-independent.',
        whyItHappens: 'Because people say "Java is platform-independent", beginners assume everything is. The code is independent, but the JVM engine is custom-built per OS.',
        howToFix: 'Remember: Bytecode is platform-independent; the JVM itself is platform-dependent.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is JIT (Just-In-Time) compiler inside the JVM?',
        answer: 'The JIT compiler is part of the JVM execution engine. Initially, the JVM interprets bytecode line-by-line (slower). The JIT compiler monitors "hot spots" (frequently executed loops/methods) and compiles them directly into native machine code in memory, dramatically speeding up subsequent executions.'
      },
      {
        question: 'If you want to run a Java application on a production server without compiling code, what do you need?',
        answer: 'You only need the JRE (or in modern Java 11+, a lightweight custom runtime generated with jlink), because compiling was already done on the build server.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which component contains the javac compiler?',
        options: ['JVM only', 'JRE only', 'JDK', 'Operating System'],
        correctIndex: 2,
        explanation: 'Only the JDK (Java Development Kit) contains the javac compiler. JRE only has the JVM and libraries to run code.'
      },
      {
        question: 'Which statement is TRUE about the JVM?',
        options: [
          'The JVM is identical across Windows, Mac, and Linux',
          'The JVM is platform-dependent; each OS has its own specific JVM',
          'The JVM reads .java source code directly',
          'The JVM compiles code into .java files'
        ],
        correctIndex: 1,
        explanation: 'Each operating system requires its own specific JVM implementation that knows how to talk to that operating system\'s CPU architecture.'
      }
    ]
  },

  'bytecode-compilation': {
    id: 'bytecode-compilation',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.3',
    title: 'Bytecode & Compilation Process',
    subtitle: 'From human-readable .java code to machine-level execution step by step',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine you write a letter in English (Source Code .java). A translator translates your letter into Esperanto (an international language that is neutral - Bytecode .class). Then in every country, a local guide reads Esperanto and whispers it in the local language to the locals (JVM translating bytecode to machine language).',
    coreExplanation: [
      'Step 1: You write human-readable code in a text file saved with extension .java (e.g. Calculator.java).',
      'Step 2: You run the compiler: "javac Calculator.java". The javac tool checks syntax, verifies types, and compiles it into a binary file named Calculator.class.',
      'Step 3: Calculator.class does NOT contain machine code (0s and 1s for Intel or ARM CPU). It contains Java Bytecode (hexadecimal instructions understood only by the JVM).',
      'Step 4: You execute: "java Calculator". The JVM\'s ClassLoader loads Calculator.class into memory.',
      'Step 5: The Bytecode Verifier checks security (ensures no illegal memory jumps, no stack overflows, no private data breaches).',
      'Step 6: The Execution Engine (Interpreter + JIT compiler) converts bytecode instructions into native CPU instructions and executes them.',
    ],
    diagram: `[ Calculator.java ] (Source Code written by YOU)
         |
    ( javac compiler checks syntax )
         |
[ Calculator.class ] (Bytecode - universal instruction set)
         |
   ( java Calculator launched )
         |
    +----+----+
    | ClassLoader loads .class into JVM memory
    | Bytecode Verifier checks safety and security
    | JIT / Interpreter translates to CPU Machine Code
    +----+----+
         |
[ CPU executes instructions & prints output ]`,
    codeSnippet: {
      title: 'How to Compile and Run from Terminal',
      code: `// File: Hello.java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Bytecode is executing!");
    }
}

/*
 COMMANDS RUN IN TERMINAL:
 1) Compile:
    javac Hello.java
    --> Produces: Hello.class

 2) Run:
    java Hello
    --> Note: Do NOT type "java Hello.class"! Only "java Hello"
*/`,
      lineByLineExplanation: [
        { line: 'javac Hello.java', explanation: 'Invokes compiler. Checks for errors. If none, generates Hello.class.' },
        { line: 'java Hello', explanation: 'Invokes JVM launcher. Searches for Hello.class on classpath and executes main().' },
      ],
      output: 'Bytecode is executing!'
    },
    beginnerMistakes: [
      {
        mistake: 'Typing "java Hello.class" instead of "java Hello".',
        whyItHappens: 'Beginners see the file Hello.class on disk and assume they must specify the extension.',
        howToFix: 'Remember: javac takes the file name (javac Hello.java); java takes the CLASS name (java Hello).'
      },
      {
        mistake: 'Editing the .java file and running "java Hello" without re-compiling.',
        whyItHappens: 'Forgetting that the JVM executes the compiled .class file, which does not automatically update when you edit .java.',
        howToFix: 'Every time you change .java code, you MUST run "javac Hello.java" again before running "java Hello".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the role of the Bytecode Verifier in Java?',
        answer: 'The Bytecode Verifier is a core security gatekeeper inside the JVM. Before running any class, it verifies that the bytecode follows Java language specifications, does not corrupt memory pointers, does not violate access control rules, and does not cause stack underflow or overflow.'
      }
    ],
    miniQuiz: [
      {
        question: 'What file extension is created after running javac App.java?',
        options: ['.exe', '.bin', '.class', '.obj'],
        correctIndex: 2,
        explanation: 'javac compiles .java source files into .class bytecode files.'
      },
      {
        question: 'How do you run a compiled class named App?',
        options: ['java App.class', 'java App', 'run App', 'execute App.java'],
        correctIndex: 1,
        explanation: 'The java launcher expects the class name without any extension: "java App".'
      }
    ]
  },

  'main-method-breakdown': {
    id: 'main-method-breakdown',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.4',
    title: 'The main() Method Line-by-Line',
    subtitle: 'Why is it public static void main(String[] args)? Every keyword explained.',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine the front door of a movie theatre. It must be "Public" so everyone from outside can enter. It must be "Static" so the building itself exists before anyone buys a ticket. It is "Void" because entering the door doesn\'t hand cash back to you. And "String[] args" is your backpack where you can carry items into the theatre.',
    coreExplanation: [
      'Every standalone Java program starts execution at the main method. Its exact signature is: public static void main(String[] args)',
      '1. public: Access modifier. The JVM resides outside the class package. It must be public so the JVM launcher can access and invoke it from anywhere.',
      '2. static: Means the method belongs to the CLASS, not an object. When the program starts, NO objects exist in memory yet. If main was not static, the JVM wouldn\'t know which constructor to call or how to create an object just to begin execution!',
      '3. void: Return type. When the main method finishes executing, the Java program terminates. It does not return any value back to the JVM launcher.',
      '4. main: The fixed identifier name that the JVM looks for as the entry point.',
      '5. String[] args: Command-line arguments. An array of Strings passed into the program from the terminal when launched.',
    ],
    diagram: `public    static     void     main     (String[] args)
  |         |          |        |            |
Access   Belongs to   Returns  Method    Command-line
by JVM   Class (no    nothing  Name      Arguments
from     object       to JVM   (Entry    from terminal
outside  needed)               point)    (array of strings)`,
    codeSnippet: {
      title: 'Testing Command-Line Arguments in main()',
      code: `public class MainExplorer {
    public static void main(String[] args) {
        System.out.println("Program started successfully!");
        System.out.println("Number of arguments passed: " + args.length);

        for (int i = 0; i < args.length; i++) {
            System.out.println("Arg [" + i + "]: " + args[i]);
        }
    }
}

// If run in terminal as: java MainExplorer apple banana 100
// Output:
// Program started successfully!
// Number of arguments passed: 3
// Arg [0]: apple
// Arg [1]: banana
// Arg [2]: 100`,
      lineByLineExplanation: [
        { line: 'args.length', explanation: 'Counts how many arguments the user typed in terminal after the class name.' },
        { line: 'args[i]', explanation: 'Retrieves the i-th command line argument (always received as a String).' },
      ],
      output: `Program started successfully!
Number of arguments passed: 0`
    },
    beginnerMistakes: [
      {
        mistake: 'Writing "public void main(String[] args)" without static.',
        whyItHappens: 'Forgetting static. The program compiles, but when you run it, JVM throws: "Main method is not static in class, please define the main method as: public static void main(String[] args)"',
        howToFix: 'Always include static so JVM can call it without instantiating the class.'
      },
      {
        mistake: 'Writing "int" instead of "void" like in C/C++.',
        whyItHappens: 'C/C++ developers expect main() to return 0. In Java, main MUST return void.',
        howToFix: 'Always declare main return type as void.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you overload the main() method in Java?',
        answer: 'Yes! A class can have multiple overloaded main methods with different parameters (e.g. main(int x), main(String s)). However, the JVM will strictly and exclusively execute the standard public static void main(String[] args) as the entry point. The others are just regular methods.'
      },
      {
        question: 'Can we change the order of public and static in the main signature?',
        answer: 'Yes! "static public void main(String[] args)" is 100% valid and compiles without issues, because order of modifiers does not matter in Java.'
      }
    ],
    miniQuiz: [
      {
        question: 'Why MUST the main() method be declared static?',
        options: [
          'To make the program execute faster',
          'So the JVM can invoke it without first creating an instance/object of the class',
          'Because static methods cannot have errors',
          'So it can return a number to the OS'
        ],
        correctIndex: 1,
        explanation: 'At startup, no objects exist in heap memory. Declaring main static allows the JVM to invoke ClassName.main() directly.'
      },
      {
        question: 'What is the type of the args parameter in the main method?',
        options: ['An array of integers (int[])', 'An array of strings (String[])', 'An Object', 'A character list'],
        correctIndex: 1,
        explanation: 'Arguments are always passed from the command line into an array of Strings: String[] args.'
      }
    ]
  },

  'packages-and-imports': {
    id: 'packages-and-imports',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.5',
    title: 'Packages & Imports',
    subtitle: 'Organizing classes, avoiding naming collisions, and using library code',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of folders on your computer. If you have two photos named "Profile.jpg" (one for LinkedIn, one for Facebook), you cannot save both in the exact same folder because their names collide. You place one in the "LinkedIn" folder and one in the "Facebook" folder. Packages in Java are simply directory folders for your classes.',
    coreExplanation: [
      'A package is a namespace that groups related classes, interfaces, and sub-packages together.',
      'Two main purposes: (1) Prevent naming conflicts (e.g. java.util.Date vs java.sql.Date). (2) Control access protection (package-private visibility).',
      'Package statement: Must be the VERY FIRST non-comment line in a Java file: "package com.mycompany.myapp;"',
      'Naming convention: Reverse domain name in all lowercase: com.google.search, com.amazon.pay.',
      'Import statement: Allows using classes from other packages without typing their full package path: "import java.util.ArrayList;"',
      'Automatic Import: The package "java.lang" (containing String, System, Math, Integer) is automatically imported by Java into every single file without needing an import statement.',
    ],
    diagram: `src/
????????? com/
    ????????? company/
        ????????? model/          -> package com.company.model;
        ???   ????????? User.java
        ???   ????????? Product.java
        ????????? service/        -> package com.company.service;
            ????????? OrderService.java (needs: import com.company.model.User;)`,
    codeSnippet: {
      title: 'Package Declaration and Importing Scanner',
      code: `package com.learn.basics; // Folder structure matches this!

import java.util.Scanner; // Import specific class from standard library

public class InputDemo {
    public static void main(String[] args) {
        // java.lang.String is auto-imported, no import needed!
        String message = "Please enter your name: ";
        System.out.print(message);

        // Using imported Scanner
        Scanner scanner = new Scanner(System.in);
        String name = "Candidate"; // simulated input
        System.out.println("Hello, " + name + "! Welcome to Java.");
        scanner.close();
    }
}`,
      lineByLineExplanation: [
        { line: 'package com.learn.basics;', explanation: 'Declares this class lives in package com.learn.basics. Physical folder is com/learn/basics.' },
        { line: 'import java.util.Scanner;', explanation: 'Tells the compiler where to find the Scanner class.' },
      ],
      output: `Please enter your name: Hello, Candidate! Welcome to Java.`
    },
    beginnerMistakes: [
      {
        mistake: 'Putting the import statement before the package statement.',
        whyItHappens: 'Forgetting the strict order. Package statement must ALWAYS be line 1.',
        howToFix: 'Order must be: (1) package declaration, (2) import statements, (3) class declaration.'
      },
      {
        mistake: 'Confusing java.util.Date and java.sql.Date.',
        whyItHappens: 'Both classes share the same name "Date" in different packages.',
        howToFix: 'Use explicit fully qualified class names if using both in the same file: java.util.Date d1; java.sql.Date d2;'
      }
    ],
    interviewQuestions: [
      {
        question: 'Which package is imported into every Java class automatically by default?',
        answer: 'java.lang package is automatically imported by the compiler into every Java compilation unit. It contains core classes like String, System, Math, Object, Thread, and all primitive wrapper classes.'
      },
      {
        question: 'Does "import java.util.*" load all sub-packages like java.util.concurrent?',
        answer: 'No! The wildcard * only imports all classes directly in that package. It does NOT import sub-packages.'
      }
    ],
    miniQuiz: [
      {
        question: 'Where must the package statement appear in a Java source file?',
        options: [
          'Anywhere inside the file',
          'At the very bottom of the file',
          'As the first statement in the file (excluding comments)',
          'Inside the class curly braces'
        ],
        correctIndex: 2,
        explanation: 'If a package statement is present, it must be the very first non-comment statement in the file.'
      },
      {
        question: 'Which of the following classes does NOT require an explicit import statement?',
        options: ['java.util.Scanner', 'java.io.File', 'java.lang.String', 'java.util.List'],
        correctIndex: 2,
        explanation: 'All classes in the java.lang package (including String, System, Math) are imported automatically by default.'
      }
    ]
  },

  'classpath-and-execution': {
    id: 'classpath-and-execution',
    moduleId: 'java-fundamentals',
    moduleTitle: '1. Java Fundamentals',
    lessonNumber: 'Lesson 1.6',
    title: 'Classpath & Execution',
    subtitle: 'How the JVM finds classes, JAR files, and external libraries',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine telling someone: "Go fetch the book Harry Potter". If you don\'t tell them which bookshelf or library to look in, they will stand confused. The CLASSPATH is a list of bookshelves (folders and JAR files) you give to the JVM so it knows where to search for your classes.',
    coreExplanation: [
      'The Classpath is an environment parameter or command-line option that tells the JVM and javac where to find third-party and custom .class files.',
      'By default, the classpath is "." (the current working directory).',
      'When you use external libraries (like MySQL driver or Apache Commons), they are packaged in .jar (Java ARchive) files.',
      'To include external JARs when compiling: "javac -cp libs/mylib.jar Main.java"',
      'To include external JARs when running: "java -cp .:libs/mylib.jar Main" (on Linux/Mac uses colon :, on Windows uses semicolon ;).',
      'The dreaded "ClassNotFoundException" or "NoClassDefFoundError" happens when a class is referenced in code, but the JVM cannot find it anywhere on the active Classpath.',
    ],
    diagram: `java -cp ".;libs/mysql-connector.jar" com.example.Main
       |   |               |                   |
    Command|          External JAR file        Class with
         Classpath    to search                main() method
         flag (search
         current dir ".")`,
    codeSnippet: {
      title: 'Printing the Current Classpath at Runtime',
      code: `public class ClasspathViewer {
    public static void main(String[] args) {
        // Reads java.class.path property
        String classpath = System.getProperty("java.class.path");
        System.out.println("Active Classpath locations:");
        String[] paths = classpath.split(System.getProperty("path.separator"));
        for (String p : paths) {
            System.out.println("-> " + p);
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'System.getProperty("java.class.path")', explanation: 'Returns the full list of folders and JAR files the JVM is currently scanning.' },
      ],
      output: `Active Classpath locations:
-> .`
    },
    beginnerMistakes: [
      {
        mistake: 'Path separator confusion: using colon : on Windows or semicolon ; on Linux.',
        whyItHappens: 'Windows uses ; while Linux/Mac uses : as path separator.',
        howToFix: 'On Windows: java -cp ".;lib.jar" App. On Mac/Linux: java -cp ".:lib.jar" App.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between ClassNotFoundException and NoClassDefFoundError?',
        answer: 'ClassNotFoundException is an Exception that occurs at runtime when an application tries to load a class by name using reflection (Class.forName() or ClassLoader.loadClass()) but the class cannot be found on the classpath. NoClassDefFoundError is a fatal Error occurring when a class was present at compile time, but is missing from the classpath when the JVM tries to resolve it at runtime.'
      }
    ],
    miniQuiz: [
      {
        question: 'What command-line flag is used to specify the classpath?',
        options: ['-path', '-cp or -classpath', '-library', '-source'],
        correctIndex: 1,
        explanation: 'Both -cp and -classpath can be used interchangeably to specify the search path for classes.'
      }
    ]
  },
};
