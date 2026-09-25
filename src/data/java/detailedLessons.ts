// ============================================================
// DEDICATED INNER LESSONS FOR BEGINNERS
// Deep, individual sub-topic lessons for Fundamentals,
// Data Types, Operators, and Control Flow.
// ============================================================

export interface MiniQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DetailedLesson {
  id: string;
  moduleId: string;
  moduleTitle: string;
  lessonNumber: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  beginnerAnalogy: string;
  coreExplanation: string[];
  diagram?: string;
  codeSnippet: {
    title: string;
    code: string;
    lineByLineExplanation: { line: string; explanation: string }[];
    output: string;
  };
  beginnerMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
    followUp?: string;
  }[];
  miniQuiz: MiniQuizQuestion[];
}

export const DETAILED_LESSONS: Record<string, DetailedLesson> = {
  // ════════════════════════════════════════════════════════════
  // 1. JAVA FUNDAMENTALS — 6 INDIVIDUAL LESSONS
  // ════════════════════════════════════════════════════════════

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
└── com/
    └── company/
        ├── model/          -> package com.company.model;
        │   ├── User.java
        │   └── Product.java
        └── service/        -> package com.company.service;
            └── OrderService.java (needs: import com.company.model.User;)`,
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

  // ════════════════════════════════════════════════════════════
  // 2. DATA TYPES & VARIABLES — 7 INDIVIDUAL LESSONS
  // ════════════════════════════════════════════════════════════

  'variables-and-scope': {
    id: 'variables-and-scope',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.1',
    title: 'Variables, Declaration & Scope',
    subtitle: 'Local vs Instance vs Static variables and memory lifetimes',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of variables as labeled boxes. A Local variable is like a sticky note on your desk: you write on it during a phone call, and when the call ends, you throw it away. An Instance variable is like a nametag worn by an employee: it stays as long as the employee is in the office. A Static variable is like the company billboard outside: there is only one billboard, and all employees share it.',
    coreExplanation: [
      'A variable is a named memory location that holds a value.',
      'Java requires two things: (1) Type (what kind of data), (2) Identifier Name: "int score = 100;"',
      'Java has 3 types of variables based on scope:',
      '1. Local Variables: Declared inside a method, constructor, or block {}. Stored on the Stack. Destroyed when method exits. MUST be manually initialized before use (they have NO default values!).',
      '2. Instance Variables (Fields): Declared inside a class but outside methods. Stored on the Heap inside the object. Created when object is created with new; destroyed when object is garbage collected. Automatically initialized to default values (0, null, false).',
      '3. Static Variables (Class Variables): Declared with "static" keyword. Stored in Metaspace. Only ONE copy exists per class, shared across all objects of that class.',
    ],
    diagram: `class Account {
    static String bankName = "Federal Bank"; // Static: 1 shared copy
    double balance;                          // Instance: 1 per object

    void deposit(double amount) {            // Local: exists only during
        double tax = amount * 0.01;          // deposit() method call!
        balance += (amount - tax);
    }
}`,
    codeSnippet: {
      title: 'Comparing the 3 Variable Scopes in Code',
      code: `public class ScopeDemo {
    static int staticCounter = 0; // Static
    int instanceId;               // Instance

    public ScopeDemo(int id) {
        this.instanceId = id;
        staticCounter++;
    }

    public void calculate() {
        int localVar = 50; // Local: must be initialized!
        System.out.println("Instance ID: " + instanceId);
        System.out.println("Local Var: " + localVar);
        System.out.println("Total instances created: " + staticCounter);
    }

    public static void main(String[] args) {
        ScopeDemo obj1 = new ScopeDemo(101);
        ScopeDemo obj2 = new ScopeDemo(102);

        obj1.calculate();
    }
}`,
      lineByLineExplanation: [
        { line: 'static int staticCounter', explanation: 'Shared by all ScopeDemo objects. Increments on every constructor call.' },
        { line: 'int instanceId', explanation: 'Each object has its own unique instanceId copy.' },
        { line: 'int localVar = 50', explanation: 'Lives on stack frame of calculate(). Disappears once calculate() returns.' },
      ],
      output: `Instance ID: 101
Local Var: 50
Total instances created: 2`
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to use a local variable without initializing it (e.g. "int total; System.out.println(total);").',
        whyItHappens: 'Assuming local variables have default values like instance fields do.',
        howToFix: 'Compile error occurs! Always initialize local variables: "int total = 0;".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Do local variables get default values in Java?',
        answer: 'No! Local variables in Java do not get default values. If you attempt to read a local variable before explicitly assigning a value to it, the Java compiler will report a compile-time error: "variable might not have been initialized". Instance and static variables, however, get default values (0, 0.0, false, null).'
      }
    ],
    miniQuiz: [
      {
        question: 'Where are local variables stored in memory?',
        options: ['Heap memory', 'Stack memory', 'Metaspace', 'Hard drive'],
        correctIndex: 1,
        explanation: 'Local variables and method call frames are allocated on the Stack and discarded when the method finishes.'
      },
      {
        question: 'What is the default value of an uninitialized boolean instance variable?',
        options: ['true', 'null', 'false', '0'],
        correctIndex: 2,
        explanation: 'Boolean instance variables default to false.'
      }
    ]
  },

  'primitive-types-deep-dive': {
    id: 'primitive-types-deep-dive',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.2',
    title: 'The 8 Primitive Data Types',
    subtitle: 'Bit sizes, min/max ranges, memory footprints, and literals',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of storage containers of different sizes. A thimble (byte) holds only a drop. A coffee mug (short) holds a bit more. A water bottle (int) holds enough for the day. A 20-liter water jug (long) holds huge amounts. If you only need to store a single digit like age (25), putting it in a 20-liter jug wastes space, but using a thimble for a bank balance will overflow immediately.',
    coreExplanation: [
      'Java provides exactly 8 primitive data types for high speed and direct memory efficiency.',
      '1. byte: 8 bits (1 byte). Range: -128 to 127. Great for raw stream bytes.',
      '2. short: 16 bits (2 bytes). Range: -32,768 to 32,767.',
      '3. int: 32 bits (4 bytes). Range: ~ -2 billion to +2 billion (-2^31 to 2^31 - 1). The DEFAULT integer type in Java.',
      '4. long: 64 bits (8 bytes). Range: massive (-2^63 to 2^63 - 1). Literal requires "L" suffix: 9999999999L.',
      '5. float: 32 bits (4 bytes). Single precision floating point. Literal requires "f" suffix: 3.14f.',
      '6. double: 64 bits (8 bytes). Double precision floating point. The DEFAULT decimal type in Java: 3.14.',
      '7. char: 16 bits (2 bytes). Stores a single 16-bit Unicode character. Range: 0 to 65,535 (\'\\u0000\' to \'\\uffff\'). Enclosed in single quotes: \'A\'.',
      '8. boolean: 1 bit logical representation (true or false). Cannot be converted to 0 or 1 in Java!',
    ],
    diagram: `Type     Bits   Bytes   Range                                  Default
----------------------------------------------------------------------
byte       8      1     -128 to 127                            0
short     16      2     -32,768 to 32,767                      0
int       32      4     -2,147,483,648 to 2,147,483,647        0
long      64      8     -9 quintillion to +9 quintillion       0L
float     32      4     ~ 7 decimal digits precision           0.0f
double    64      8     ~ 15-17 decimal digits precision       0.0d
char      16      2     0 to 65,535 (Unicode)                  '\\u0000'
boolean    1      -     true or false                          false`,
    codeSnippet: {
      title: 'Testing Primitive Ranges and Suffixes',
      code: `public class PrimitivesDemo {
    public static void main(String[] args) {
        byte smallNum = 127;           // max byte
        int standardNum = 1_000_000;   // underscores for readability
        long worldPopulation = 8_000_000_000L; // 'L' suffix required!
        float rating = 4.8f;           // 'f' suffix required!
        double salary = 85000.50;      // double by default
        char grade = 'A';              // single quotes for char
        boolean isPassed = true;

        System.out.println("World population: " + worldPopulation);
        System.out.println("Rating: " + rating);
        System.out.println("Min byte: " + Byte.MIN_VALUE + " Max: " + Byte.MAX_VALUE);
    }
}`,
      lineByLineExplanation: [
        { line: '8_000_000_000L', explanation: 'Numbers over 2.1 billion exceed int, so you MUST append L to make it a long literal.' },
        { line: '4.8f', explanation: 'Decimal literals default to double. To assign to float, you MUST append f.' },
        { line: '1_000_000', explanation: 'Underscores in numbers (Java 7+) improve readability; ignored by compiler.' },
      ],
      output: `World population: 8000000000
Rating: 4.8
Min byte: -128 Max: 127`
    },
    beginnerMistakes: [
      {
        mistake: 'Writing "float f = 3.14;" without the f suffix.',
        whyItHappens: '3.14 defaults to double (64 bits). Putting 64 bits into a 32-bit float variable causes compile error: "possible lossy conversion from double to float".',
        howToFix: 'Add the f suffix: float f = 3.14f;'
      },
      {
        mistake: 'Using double quotes for char: char c = "A";',
        whyItHappens: 'Double quotes create a String object, not a char.',
        howToFix: 'Always use single quotes for char: char c = \'A\';'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why is char in Java 2 bytes (16 bits) while in C it is 1 byte (8 bits)?',
        answer: 'C uses ASCII character encoding which only supports 128 characters (mostly English). Java was built from day one to support internationalization and uses 16-bit Unicode (UTF-16) to represent symbols, hieroglyphs, and characters from virtually all spoken languages (Chinese, Hindi, Arabic, Japanese, etc.).'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the size of char in Java?',
        options: ['1 byte (8 bits)', '2 bytes (16 bits)', '4 bytes (32 bits)', 'Depends on OS'],
        correctIndex: 1,
        explanation: 'In Java, char is always 16 bits (2 bytes) to accommodate Unicode.'
      },
      {
        question: 'What happens if you assign 130 to a byte: byte b = 130;?',
        options: ['It compiles and wraps to -126', 'Compile-time error: possible lossy conversion', 'Runtime error', 'It becomes 127'],
        correctIndex: 1,
        explanation: '130 exceeds the byte max of 127. The compiler catches this and throws a compile-time error unless you explicitly cast: (byte) 130.'
      }
    ]
  },

  'type-casting-and-overflow': {
    id: 'type-casting-and-overflow',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.3',
    title: 'Type Casting & Numeric Overflow',
    subtitle: 'Widening (safe) vs Narrowing (lossy) and binary wrap-around',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Pouring water between cups: Pouring water from a small espresso cup into a big bucket (Widening) is completely safe; no water will ever spill. But pouring water from a 2-liter bottle into a tiny espresso cup (Narrowing) WILL spill over unless you force it and accept the lost water (truncation).',
    coreExplanation: [
      'Type casting is converting a value from one data type to another.',
      '1. Widening Casting (Implicit / Automatic): Smaller type -> Larger type. byte -> short -> int -> long -> float -> double. Safe, no precision lost. Done automatically by compiler.',
      '2. Narrowing Casting (Explicit / Manual): Larger type -> Smaller type. double -> float -> long -> int -> short -> byte. Must write target type in parentheses: (int) 9.99. Decimal places are truncated (dropped, not rounded!).',
      'Numeric Overflow: If a value exceeds the maximum limit of an integer type, Java does NOT throw an error. It silently wraps around to negative values using two\'s complement binary arithmetic.',
      'Example: byte b = (byte) 128; becomes -128. byte b = (byte) 129; becomes -127.',
    ],
    diagram: `WIDENING (Automatic & Safe):
byte -> short -> int -> long -> float -> double

NARROWING (Manual Cast & Lossy):
double -> float -> long -> int -> short -> byte
Example: double d = 9.87; int i = (int) d; // i becomes 9 (dropped 0.87)`,
    codeSnippet: {
      title: 'Widening, Truncation, and Overflow Wrap-Around',
      code: `public class CastingDemo {
    public static void main(String[] args) {
        // Widening (Automatic)
        int num = 100;
        double d = num; // int automatically widened to double
        System.out.println("Widened double: " + d); // 100.0

        // Narrowing (Truncation: drops decimal!)
        double price = 99.85;
        int roundedPrice = (int) price; // Truncates! Does NOT round to 100
        System.out.println("Truncated price: " + roundedPrice); // 99

        // Overflow Wrap-Around
        byte b = 127; // max byte value
        b++;          // overflows!
        System.out.println("127 + 1 as byte is: " + b); // -128
    }
}`,
      lineByLineExplanation: [
        { line: '(int) price', explanation: 'Explicit cast drops .85, leaving integer 99.' },
        { line: 'b++', explanation: '127 is 01111111 in binary. Adding 1 gives 10000000, which is -128 in two\'s complement.' },
      ],
      output: `Widened double: 100.0
Truncated price: 99
127 + 1 as byte is: -128`
    },
    beginnerMistakes: [
      {
        mistake: 'Assuming (int) 9.99 will round up to 10.',
        whyItHappens: 'Thinking cast performs mathematical rounding.',
        howToFix: 'Casting truncates (chops off) the decimal part completely. Use Math.round(9.99) if you want 10.'
      },
      {
        mistake: 'Integer division truncation: int avg = 5 / 2; expecting 2.5.',
        whyItHappens: 'Both 5 and 2 are ints, so 5/2 produces int 2. The 0.5 is lost before assignment.',
        howToFix: 'Make at least one operand a floating point: double avg = 5.0 / 2; // 2.5'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the output of byte b = (byte) 130; and why?',
        answer: 'Output is -126. A byte is 8 bits with range -128 to 127. 130 in 32-bit binary is ...000010000010. Narrowing to 8 bits keeps only the lowest 8 bits: 10000010. The leading 1 represents a negative number in two\'s complement, which evaluates to -126.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the value of int x = (int) 8.95;?',
        options: ['9', '8', '8.95', 'Compilation error'],
        correctIndex: 1,
        explanation: 'Narrowing cast from double to int simply truncates the decimal portion, resulting in 8.'
      },
      {
        question: 'What is the result of 7 / 2 in Java?',
        options: ['3.5', '3', '4', 'Compilation error'],
        correctIndex: 1,
        explanation: 'Because both 7 and 2 are integers, integer division is performed, truncating to 3.'
      }
    ]
  },

  'wrapper-classes': {
    id: 'wrapper-classes',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.4',
    title: 'Wrapper Classes',
    subtitle: 'Why Java wraps primitives into objects and parsing utilities',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a chocolate bar (primitive). It is delicious, but you cannot put raw chocolate into a shipping parcel without wrapping it in a protective cardboard box (Wrapper Class). The Java Collections Framework (ArrayList, HashMap) only accepts objects, so primitives must be "wrapped" inside object boxes.',
    coreExplanation: [
      'Every primitive has a corresponding Wrapper Class in java.lang:',
      'byte -> Byte, short -> Short, int -> Integer, long -> Long',
      'float -> Float, double -> Double, char -> Character, boolean -> Boolean',
      'Why do we need them?',
      '1. Generics & Collections: You cannot do "List<int> list", Java syntax forbids primitives in generics. You MUST use "List<Integer> list".',
      '2. Null Values: Primitives cannot be null (int is always 0). Wrapper objects can be null (useful in databases for optional fields).',
      '3. Useful Utility Methods: Integer.parseInt("123"), Character.isDigit(\'5\'), Double.isNaN(val), Integer.toBinaryString(42).',
    ],
    diagram: `Primitive  ->  Wrapper Class (Object in Heap)
int        ->  java.lang.Integer
double     ->  java.lang.Double
char       ->  java.lang.Character
boolean    ->  java.lang.Boolean`,
    codeSnippet: {
      title: 'Using Wrapper Parsing and Utility Methods',
      code: `public class WrapperDemo {
    public static void main(String[] args) {
        // String to primitive
        String ageStr = "25";
        int age = Integer.parseInt(ageStr); // converts text to int

        // String to double
        double price = Double.parseDouble("49.99");

        // Character utilities
        char ch = '9';
        System.out.println("Is digit? " + Character.isDigit(ch)); // true
        System.out.println("Is letter? " + Character.isLetter(ch)); // false

        // Binary representation
        System.out.println("10 in binary: " + Integer.toBinaryString(10)); // 1010
    }
}`,
      lineByLineExplanation: [
        { line: 'Integer.parseInt("25")', explanation: 'Parses String digits into primitive int 25. Throws NumberFormatException if invalid.' },
        { line: 'Character.isDigit(ch)', explanation: 'Built-in method to test if a char is 0-9 without checking ASCII codes.' },
      ],
      output: `Is digit? true
Is letter? false
10 in binary: 1010`
    },
    beginnerMistakes: [
      {
        mistake: 'Passing invalid text to Integer.parseInt (e.g. Integer.parseInt("abc")).',
        whyItHappens: 'Expected digits only; crashes program with NumberFormatException at runtime.',
        howToFix: 'Surround with try-catch or validate text before parsing.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between Integer.parseInt("10") and Integer.valueOf("10")?',
        answer: 'Integer.parseInt("10") returns a primitive int (10). Integer.valueOf("10") returns an Integer wrapper object, taking advantage of the Integer cache for values between -128 and 127.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following is an invalid generic declaration?',
        options: ['List<Integer> list', 'List<int> list', 'List<Double> list', 'List<String> list'],
        correctIndex: 1,
        explanation: 'Generics in Java do not support primitive types like int. You must use wrapper classes like Integer.'
      }
    ]
  },

  'autoboxing-and-unboxing': {
    id: 'autoboxing-and-unboxing',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.5',
    title: 'Autoboxing & Unboxing',
    subtitle: 'Automatic conversions between primitives and wrappers, and NullPointerException dangers',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Autoboxing is an automated packaging machine in an Amazon warehouse. When a book (primitive int) arrives, the machine automatically places it in a branded shipping box (Integer object). Unboxing is the recipient opening the box and taking the book out.',
    coreExplanation: [
      'Autoboxing: Automatic conversion by the compiler of a primitive type to its corresponding wrapper class.',
      'Example: Integer x = 10; Behind the scenes, the compiler replaces this with: Integer x = Integer.valueOf(10);',
      'Unboxing: Automatic conversion of a wrapper class object back to its primitive value.',
      'Example: int y = x; Behind the scenes, the compiler replaces this with: int y = x.intValue();',
      'The NullPointerException Trap: If a wrapper object is null and Java tries to unbox it into a primitive, it will throw a NullPointerException at runtime!',
      'Performance Warning: Autoboxing inside loops creates millions of unnecessary objects on the heap, dragging down performance.',
    ],
    diagram: `Primitive int  ---- Autoboxing (Integer.valueOf) ---->  Integer Object
Primitive int  <--- Unboxing (.intValue()) -----------  Integer Object`,
    codeSnippet: {
      title: 'Autoboxing, Unboxing, and the NPE Trap',
      code: `import java.util.ArrayList;
import java.util.List;

public class AutoboxingDemo {
    public static void main(String[] args) {
        // Autoboxing: int primitive 42 is boxed into Integer object
        List<Integer> numbers = new ArrayList<>();
        numbers.add(42); // Autoboxing: 42 -> Integer.valueOf(42)

        // Unboxing: Integer object is unboxed back to primitive int
        int first = numbers.get(0); // numbers.get(0).intValue()
        System.out.println("First element: " + first);

        // The NullPointerException trap
        Integer nullObject = null;
        try {
            int crash = nullObject; // Unboxing calls nullObject.intValue() -> NPE!
        } catch (NullPointerException e) {
            System.out.println("Caught NPE: cannot unbox null into primitive!");
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'numbers.add(42)', explanation: 'Compiler automatically inserts Integer.valueOf(42).' },
        { line: 'int crash = nullObject', explanation: 'Trying to call .intValue() on a null pointer immediately triggers NullPointerException.' },
      ],
      output: `First element: 42
Caught NPE: cannot unbox null into primitive!`
    },
    beginnerMistakes: [
      {
        mistake: 'Assigning a null Integer wrapper to a primitive int.',
        whyItHappens: 'Primitives cannot hold null. Unboxing forces a method call on a null reference.',
        howToFix: 'Always check if the wrapper object is null before assigning it to a primitive.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why can autoboxing in loops cause memory and performance issues?',
        answer: 'If you accumulate numbers using a wrapper class inside a loop (e.g. Long sum = 0L; for(int i=0; i<1000000; i++) sum += i;), autoboxing creates one million temporary Long objects on the heap, thrashing the CPU and triggering frequent Garbage Collection cycles. Always use primitive types (long sum = 0L;) for accumulator loops.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does the compiler insert during autoboxing of "Integer x = 5;"?',
        options: ['new Integer(5)', 'Integer.valueOf(5)', 'Integer.parseInt(5)', '(Integer) 5'],
        correctIndex: 1,
        explanation: 'Autoboxing invokes Integer.valueOf(5), which utilizes the Integer cache.'
      }
    ]
  },

  'integer-cache-trap': {
    id: 'integer-cache-trap',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.6',
    title: 'The Integer Cache Trap (-128 to 127)',
    subtitle: 'The #1 tricky fresher interview question on object comparison',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine a coat check. For common numbers 1 to 100, the coat check has permanent pre-numbered hangers ready. When you ask for hanger 10, they give everyone the exact same hanger. But if you ask for coat hanger 500, they have to run to the storage room and build a brand new custom hanger from scratch every time.',
    coreExplanation: [
      'Java optimizes memory for Integer objects by caching values between -128 and 127 (inclusive).',
      'When you autobox a number between -128 and 127, Integer.valueOf() returns the PRE-CREATED cached instance from memory.',
      'Therefore, two separate variables holding 127 point to the EXACT SAME object in heap memory: a == b evaluates to true!',
      'However, for numbers $\\ge$ 128 (or $\\le$ -129), Java creates a NEW object on the heap for every autoboxing operation.',
      'Therefore, holding 128 creates two distinct heap objects: c == d evaluates to FALSE, even though their mathematical values are identical!',
      'Golden Rule: NEVER compare objects (including wrapper classes) using ==. ALWAYS use .equals() to compare object contents!',
    ],
    diagram: `Integer Cache Pool [-128 to 127]:
[ -128 ... 127 ]
     ^       ^
     |       |
     +-------+--- a and b point to same cached "127" -> (a == b is TRUE)

Outside Cache (e.g. 128):
[ Heap Object 1: 128 ] <- c points here
[ Heap Object 2: 128 ] <- d points here
Two different memory addresses! -> (c == d is FALSE)
Content comparison: c.equals(d) is TRUE!`,
    codeSnippet: {
      title: 'Demonstrating the Integer Cache in Action',
      code: `public class IntegerCacheTrap {
    public static void main(String[] args) {
        // Within Cache Range (-128 to 127)
        Integer a = 127;
        Integer b = 127;
        System.out.println("127 == 127: " + (a == b));           // true (Same cached object)
        System.out.println("127 equals 127: " + a.equals(b));   // true

        // Outside Cache Range (>= 128)
        Integer c = 128;
        Integer d = 128;
        System.out.println("128 == 128: " + (c == d));           // false! (Two distinct objects)
        System.out.println("128 equals 128: " + c.equals(d));   // true! Always use equals()
    }
}`,
      lineByLineExplanation: [
        { line: 'Integer a = 127; Integer b = 127;', explanation: 'Both refer to cached object IntegerCache.cache[127 + 128].' },
        { line: 'Integer c = 128; Integer d = 128;', explanation: 'Outside cache. Creates two separate objects in heap memory.' },
      ],
      output: `127 == 127: true
127 equals 127: true
128 == 128: false
128 equals 128: true`
    },
    beginnerMistakes: [
      {
        mistake: 'Using == to compare Integer, Long, or String objects in business logic.',
        whyItHappens: 'In code tests it worked for 10 or 50, but suddenly failed in production when values hit 200.',
        howToFix: 'Always use .equals() when comparing objects in Java: a.equals(b).'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the Integer Cache in Java and can its size be configured?',
        answer: 'Java caches Integer objects for values from -128 to 127 to save memory. While the lower bound (-128) is fixed, the upper bound (127) can be tuned using the JVM flag -XX:AutoBoxCacheMax=<size>.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of Integer x = 200; Integer y = 200; System.out.println(x == y);?',
        options: ['true', 'false', 'Compilation error', 'Runtime error'],
        correctIndex: 1,
        explanation: '200 is outside the default cache range (-128 to 127). Two distinct objects are allocated on the heap, so reference equality == returns false.'
      }
    ]
  },

  'floating-point-bigdecimal': {
    id: 'floating-point-bigdecimal',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.7',
    title: 'Floating-Point Precision & BigDecimal',
    subtitle: 'Why 0.1 + 0.2 != 0.3 in double, and how to handle financial money calculations',
    estimatedMinutes: 12,
    beginnerAnalogy: 'In base 10, the fraction 1/3 cannot be written accurately in decimals: it becomes 0.3333333... recurring forever. Similarly, binary computers (base 2) cannot represent decimal fractions like 0.1 or 0.2 accurately in binary. Tiny rounding errors accumulate.',
    coreExplanation: [
      'float and double use IEEE 754 binary floating-point representation.',
      'Computers represent numbers using powers of 2. Just as base-10 cannot accurately represent 1/3, base-2 cannot accurately represent 0.1 (it becomes an infinite repeating binary fraction).',
      'Result: In Java, System.out.println(0.1 + 0.2); prints 0.30000000000000004, NOT 0.3!',
      'In banking, e-commerce, and financial applications, losing fractions of cents is unacceptable.',
      'Solution: Use java.math.BigDecimal for financial and currency calculations.',
      'BigDecimal Crucial Rule: Always initialize BigDecimal with a STRING: new BigDecimal("0.1"), NOT new BigDecimal(0.1) (which passes the already-inaccurate double into the constructor!).',
    ],
    diagram: `Double Math:
0.1 + 0.2 = 0.30000000000000004  (Spills cents! Dangerous for money)

BigDecimal Math:
new BigDecimal("0.1").add(new BigDecimal("0.2")) = 0.3  (Exact, perfect precision)`,
    codeSnippet: {
      title: 'Comparing double vs BigDecimal for Money',
      code: `import java.math.BigDecimal;

public class BigDecimalDemo {
    public static void main(String[] args) {
        // Floating point inaccuracy
        double d1 = 0.1;
        double d2 = 0.2;
        System.out.println("double 0.1 + 0.2 = " + (d1 + d2)); // 0.30000000000000004

        // Correct Financial Precision with BigDecimal
        BigDecimal b1 = new BigDecimal("0.1"); // Pass as String!
        BigDecimal b2 = new BigDecimal("0.2");
        BigDecimal sum = b1.add(b2);
        System.out.println("BigDecimal sum: " + sum); // 0.3
    }
}`,
      lineByLineExplanation: [
        { line: 'new BigDecimal("0.1")', explanation: 'Always use String constructor to guarantee exact decimal representation.' },
        { line: 'b1.add(b2)', explanation: 'BigDecimal is immutable; arithmetic methods return a brand new BigDecimal instance.' },
      ],
      output: `double 0.1 + 0.2 = 0.30000000000000004
BigDecimal sum: 0.3`
    },
    beginnerMistakes: [
      {
        mistake: 'Using "new BigDecimal(0.1)" with a double parameter.',
        whyItHappens: 'Passing the double passes the floating-point inaccuracy directly into BigDecimal.',
        howToFix: 'Always pass the value as a String: new BigDecimal("0.1") or use BigDecimal.valueOf(0.1).'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why should you never use float or double for monetary transactions in Java?',
        answer: 'Float and double use IEEE 754 binary floating-point representation which cannot represent decimal fractions like 0.1 exactly in binary, leading to rounding errors (e.g. 0.1 + 0.2 = 0.30000000000000004). Financial applications must use java.math.BigDecimal for exact arbitrary-precision arithmetic.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the correct way to instantiate a BigDecimal representing 19.99?',
        options: ['new BigDecimal(19.99)', 'new BigDecimal("19.99")', 'BigDecimal.toInt(19.99)', '(BigDecimal) 19.99'],
        correctIndex: 1,
        explanation: 'Always use the String constructor new BigDecimal("19.99") to ensure exact precision.'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════
  // 3. OPERATORS & EXPRESSIONS — 9 INDIVIDUAL LESSONS
  // ════════════════════════════════════════════════════════════

  'arithmetic-and-modulo': {
    id: 'arithmetic-and-modulo',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.1',
    title: 'Arithmetic Operators & Modulo (%)',
    subtitle: '+, -, *, /, and the power of remainder calculations',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of 7 cookies shared between 2 friends. Each friend gets 3 full cookies (7 / 2 = 3 integer division). The 1 leftover cookie in the box that cannot be evenly split is the remainder (7 % 2 = 1 modulo).',
    coreExplanation: [
      'Basic 5 operators: Addition (+), Subtraction (-), Multiplication (*), Division (/), Modulo (%).',
      'Integer Division: When dividing two integers, Java truncates the decimal part (7 / 2 = 3).',
      'Floating Division: If either operand is float/double, decimal division occurs (7.0 / 2 = 3.5).',
      'The Modulo Operator (%): Returns the remainder of division.',
      'Superpowers of Modulo:',
      '1. Even or Odd check: number % 2 == 0 is Even; number % 2 != 0 is Odd.',
      '2. Last digit extraction: 1234 % 10 = 4.',
      '3. Circular indexing: (index + 1) % size keeps pointers within array bounds.',
    ],
    codeSnippet: {
      title: 'Testing Division Truncation and Modulo Operations',
      code: `public class ArithmeticDemo {
    public static void main(String[] args) {
        System.out.println("7 / 2 = " + (7 / 2));     // 3 (integer division)
        System.out.println("7.0 / 2 = " + (7.0 / 2)); // 3.5 (decimal)
        System.out.println("7 % 2 = " + (7 % 2));     // 1 (remainder)

        // Check even or odd
        int num = 48;
        if (num % 2 == 0) {
            System.out.println(num + " is EVEN");
        }

        // Extract last digit
        int val = 9876;
        System.out.println("Last digit: " + (val % 10)); // 6
    }
}`,
      lineByLineExplanation: [
        { line: '7 / 2', explanation: 'Both are ints, so the fractional 0.5 is truncated.' },
        { line: 'num % 2 == 0', explanation: 'Even numbers divided by 2 have zero remainder.' },
      ],
      output: `7 / 2 = 3
7.0 / 2 = 3.5
7 % 2 = 1
48 is EVEN
Last digit: 6`
    },
    beginnerMistakes: [
      {
        mistake: 'Dividing by zero in integers (10 / 0).',
        whyItHappens: 'Mathematical impossibility; causes ArithmeticException: / by zero at runtime.',
        howToFix: 'Always check if denominator != 0 before dividing.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the result of 10.0 / 0 in Java vs 10 / 0?',
        answer: '10 / 0 with integers throws an ArithmeticException: / by zero. However, floating-point division 10.0 / 0 does NOT throw an exception; it returns special IEEE-754 value "Infinity" (Double.POSITIVE_INFINITY).'
      }
    ],
    miniQuiz: [
      {
        question: 'What is 19 % 5 in Java?',
        options: ['3', '4', '3.8', '0'],
        correctIndex: 1,
        explanation: '19 divided by 5 is 3 with remainder 4. (5 * 3 = 15; 19 - 15 = 4).'
      }
    ]
  },

  'pre-post-increment': {
    id: 'pre-post-increment',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.2',
    title: 'Pre vs Post Increment (++i vs i++)',
    subtitle: 'Step-by-step tracing of increment and decrement operator traps',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a toll booth. Pre-increment (++i) is "Pay BEFORE driving through": the counter increases FIRST, and then the vehicle passes. Post-increment (i++) is "Drive through and receive the bill LATER in mail": you use the current value now, and the counter increments afterwards.',
    coreExplanation: [
      'Both ++i and i++ increase variable i by 1 (i = i + 1).',
      'The difference is the VALUE RETURNED in an expression:',
      '1. Post-increment (i++): Uses the CURRENT value in the expression first, and THEN increments i.',
      '2. Pre-increment (++i): Increments i FIRST, and then uses the NEW incremented value in the expression.',
      'Interview Trap: int a = 5; int b = a++ + ++a;',
      'Step 1: a++ evaluates to 5 (a becomes 6 in memory).',
      'Step 2: ++a increments a to 7 and evaluates to 7.',
      'Step 3: b = 5 + 7 = 12. Final a = 7.',
    ],
    diagram: `Expression: int b = a++ + ++a;  (when a starts at 5)
                |     |
              Uses 5  Increments a from 6 to 7
             (a->6)   Uses 7
                |     |
                5  +  7  = 12
Final values: b = 12, a = 7`,
    codeSnippet: {
      title: 'Tracing Pre vs Post Increment in Code',
      code: `public class IncrementTracing {
    public static void main(String[] args) {
        int x = 5;
        System.out.println("x++: " + (x++)); // prints 5, x is now 6
        System.out.println("x now: " + x);   // prints 6

        int y = 5;
        System.out.println("++y: " + (++y)); // increments to 6 first, prints 6
        System.out.println("y now: " + y);   // prints 6

        // Famous interview problem
        int a = 5;
        int result = a++ + ++a;
        System.out.println("result: " + result + ", a: " + a);
    }
}`,
      lineByLineExplanation: [
        { line: 'x++', explanation: 'Returns current value 5 for printing, then bumps x to 6.' },
        { line: '++y', explanation: 'Increments y to 6 immediately, then returns 6 for printing.' },
        { line: 'a++ + ++a', explanation: '5 (a becomes 6) + 7 (a becomes 7) = 12.' },
      ],
      output: `x++: 5
x now: 6
++y: 6
y now: 6
result: 12, a: 7`
    },
    beginnerMistakes: [
      {
        mistake: 'Writing "i = i++;" expecting i to increase.',
        whyItHappens: 'Post-increment evaluates to original value of i, then increments i, but the assignment (=) immediately overwrites i with the original value!',
        howToFix: 'Just write i++ or i += 1. Never assign a post-increment back to itself.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the output of: int i = 1; i = i++; System.out.println(i);?',
        answer: 'Output is 1. The right-hand side i++ returns original value 1 (and sets i to 2), but the assignment operator (=) then assigns that saved original 1 back into i, leaving i as 1.'
      }
    ],
    miniQuiz: [
      {
        question: 'If int a = 10; int b = ++a; what are the values of a and b?',
        options: ['a = 10, b = 10', 'a = 11, b = 10', 'a = 11, b = 11', 'a = 10, b = 11'],
        correctIndex: 2,
        explanation: 'Pre-increment ++a increments a from 10 to 11 first, and then assigns 11 to b. Both are 11.'
      }
    ]
  },

  'short-circuit-evaluation': {
    id: 'short-circuit-evaluation',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.4',
    title: 'Logical Operators & Short-Circuiting',
    subtitle: 'Why && and || prevent NullPointerExceptions and how they differ from & and |',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine a club door security rule: "You must have a ticket AND you must be wearing shoes" (ticket && shoes). If the security guard checks your hand and sees NO ticket (false), he rejects you immediately and doesn\'t even bother looking down at your feet! That is short-circuit evaluation.',
    coreExplanation: [
      'Logical AND (&&) and Logical OR (||) are short-circuiting operators.',
      'Short-circuit AND (&&): If the left-hand operand is false, the entire expression CANNOT be true. Java skips evaluating the right-hand operand entirely.',
      'Short-circuit OR (||): If the left-hand operand is true, the entire expression IS ALREADY true. Java skips evaluating the right-hand operand entirely.',
      'Non-short-circuit bitwise operators (& and |): Always evaluate BOTH sides, regardless of the left side result.',
      'Crucial Defense against NullPointerExceptions: "if (str != null && str.length() > 0)". If str is null, the left side is false, so str.length() is never called, saving your app from crashing!',
    ],
    diagram: `Short-Circuit AND (&&):
[ Left Expression ] == false  ---> [ STOP! Skip Right Expression completely ]
[ Left Expression ] == true   ---> [ Continue & evaluate Right Expression ]

Guard Pattern:
if (user != null && user.isActive())
      |                 |
If null, stops here!  Never executed if null -> NO CRASH!`,
    codeSnippet: {
      title: 'Safeguarding Against NullPointerException with Short-Circuiting',
      code: `public class ShortCircuitDemo {
    public static void main(String[] args) {
        String name = null;

        // Safe with short-circuit &&
        if (name != null && name.length() > 0) {
            System.out.println("Valid name");
        } else {
            System.out.println("Safe! Null check prevented a crash.");
        }

        // Dangerous with single & (Uncommenting crashes!)
        // if (name != null & name.length() > 0) { ... } -> Throws NullPointerException!
    }
}`,
      lineByLineExplanation: [
        { line: 'name != null && name.length() > 0', explanation: 'Since name is null, left is false. JVM short-circuits and skips name.length().' },
      ],
      output: 'Safe! Null check prevented a crash.'
    },
    beginnerMistakes: [
      {
        mistake: 'Using single & instead of double && in conditional if statements.',
        whyItHappens: 'Typo or assuming both are the same. Single & always runs the right side, crashing on null references.',
        howToFix: 'Always use double && and double || for boolean conditionals.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between & and && in Java?',
        answer: '&& is the logical short-circuit AND operator: if the left operand evaluates to false, it skips evaluating the right operand. & is either bitwise AND (when used on integers) or logical non-short-circuit AND (when used on booleans), always evaluating both operands regardless of left operand outcome.'
      }
    ],
    miniQuiz: [
      {
        question: 'In expression (false && methodCall()), will methodCall() execute?',
        options: ['Yes, always', 'No, never due to short-circuiting', 'Only on weekends', 'Causes compile error'],
        correctIndex: 1,
        explanation: 'Because the left side is false, logical AND short-circuits and skips the right side.'
      }
    ]
  },

  // ════════════════════════════════════════════════════════════
  // 4. CONTROL FLOW & LOOPS — 9 INDIVIDUAL LESSONS
  // ════════════════════════════════════════════════════════════

  'switch-expressions': {
    id: 'switch-expressions',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.3',
    title: 'Modern Switch Expressions (->)',
    subtitle: 'Java 14+ switch expressions vs traditional switch fall-through traps',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Traditional switch was like a staircase with no doors between floors: if you step onto floor 2 and forget to put up a "break" barricade, you automatically tumble down into floor 3 and floor 4! Modern switch with arrow (->) is like a smart elevator: you press 2, it opens only on floor 2 and never falls through.',
    coreExplanation: [
      'Traditional switch statements (Java 1.0) required an explicit "break" at the end of each case block. Forgetting break caused accidental fall-through to subsequent cases.',
      'Java 14 introduced Switch Expressions using the arrow (->) syntax.',
      'Key advantages of Modern Switch:',
      '1. No break statements needed — execution never falls through to the next case.',
      '2. Can return a value directly (it is an expression, not just a statement).',
      '3. Multiple comma-separated labels per case: "case 1, 2, 3 -> ..."',
      '4. Uses the "yield" keyword if a case block requires multiple lines of computation.',
      'Supported switch types: byte, short, int, char, String, enum, and pattern types (Java 21+).',
    ],
    diagram: `TRADITIONAL (Accidental Fall-through if break forgotten):
switch(x) {
   case 1: doA(); // missing break!
   case 2: doB(); // runs both A and B!
}

MODERN ARROW SYNTAX (Clean & No fall-through):
String result = switch(x) {
   case 1 -> "One";
   case 2 -> "Two";
   default -> "Other";
};`,
    codeSnippet: {
      title: 'Comparing Traditional vs Modern Switch Expression',
      code: `public class ModernSwitchDemo {
    public static void main(String[] args) {
        int dayOfWeek = 6; // Saturday

        // Modern Switch Expression returning a value
        String dayType = switch (dayOfWeek) {
            case 1, 2, 3, 4, 5 -> "Weekday (Work!)";
            case 6, 7 -> "Weekend (Rest!)";
            default -> "Invalid Day";
        };

        System.out.println("Day 6 is: " + dayType);

        // Multi-line case using yield
        int score = 85;
        String grade = switch (score / 10) {
            case 10, 9 -> "A";
            case 8 -> {
                System.out.println("Great effort!");
                yield "B"; // returns "B" from multi-line block
            }
            default -> "Pass";
        };
        System.out.println("Grade: " + grade);
    }
}`,
      lineByLineExplanation: [
        { line: 'case 1, 2, 3, 4, 5 ->', explanation: 'Matches any of these values without needing multiple case statements.' },
        { line: 'yield "B"', explanation: 'When using curly braces in switch expressions, yield produces the return value.' },
      ],
      output: `Day 6 is: Weekend (Rest!)
Great effort!
Grade: B`
    },
    beginnerMistakes: [
      {
        mistake: 'Mixing old colon : and modern arrow -> syntax in the same switch.',
        whyItHappens: 'Inconsistency. Compiler will throw: "different case kinds used in the switch".',
        howToFix: 'Pick one style. Prefer modern arrow (->) syntax everywhere.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you switch on a String or float in Java?',
        answer: 'You can switch on String (supported since Java 7), along with byte, short, int, char, and enum. You CANNOT switch on float or double because floating-point precision comparisons are inexact.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which keyword is used to return a value from a multi-line code block inside a switch expression?',
        options: ['return', 'yield', 'break', 'output'],
        correctIndex: 1,
        explanation: 'In Java 14+ switch expressions, yield is used to return a value from a block.'
      }
    ]
  },

  'do-while-loop': {
    id: 'do-while-loop',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.7',
    title: 'The do-while Loop (Runs >= 1 Time)',
    subtitle: 'Post-condition checking, ATM menus, and loop execution guarantees',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of an amusement park ride where you must pay after the ride. A "while" loop checks your ticket before you get on (if ticket invalid, you ride 0 times). A "do-while" loop puts you on the ride first, and checks your ticket at the exit: you are guaranteed to experience the ride at least once, even if your ticket expires!',
    coreExplanation: [
      'In a standard "while" loop, condition is evaluated BEFORE the loop body executes. If false initially, loop runs 0 times.',
      'In a "do-while" loop, the loop body executes FIRST, and the condition is evaluated at the end (Post-Condition).',
      'Execution Guarantee: A do-while loop ALWAYS executes at least once, no matter what condition is passed.',
      'Classic Use Case: User Input Menus (show the menu options at least once, then prompt user to repeat if invalid).',
      'Syntax note: Notice the semicolon at the very end of while condition: "do { ... } while (condition);"',
    ],
    diagram: `while loop (Pre-condition):
[ Check Condition ] -> false? -> [ EXIT (0 runs) ]
         | true
   [ Run Body ]

do-while loop (Post-condition):
   [ Run Body ] (Guaranteed at least 1 run!)
         |
[ Check Condition ] -> false? -> [ EXIT ]
         | true
     [ Repeat ]`,
    codeSnippet: {
      title: 'Interactive Menu Pattern with do-while',
      code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int count = 100;

        // Even though count < 5 is FALSE, body runs once!
        do {
            System.out.println("This prints even when count is 100! (count = " + count + ")");
            count++;
        } while (count < 5);

        System.out.println("Loop terminated. Final count: " + count);
    }
}`,
      lineByLineExplanation: [
        { line: 'do { ... } while (count < 5);', explanation: 'Body executes once before checking (101 < 5) which is false, exiting loop.' },
      ],
      output: `This prints even when count is 100! (count = 100)
Loop terminated. Final count: 101`
    },
    beginnerMistakes: [
      {
        mistake: 'Forgetting the semicolon after while: do { ... } while (condition) // missing ;',
        whyItHappens: 'Regular while loops don\'t have a semicolon after the parentheses.',
        howToFix: 'Remember: do-while ALWAYS ends with a semicolon after while (...);'
      }
    ],
    interviewQuestions: [
      {
        question: 'Under what condition will a while loop and do-while loop behave differently?',
        answer: 'When the loop continuation condition is false on the very first evaluation. A while loop will execute 0 times, whereas a do-while loop will execute exactly 1 time.'
      }
    ],
    miniQuiz: [
      {
        question: 'How many times does "int i = 5; do { i++; } while (i < 5);" execute?',
        options: ['0 times', '1 time', '5 times', 'Infinite loop'],
        correctIndex: 1,
        explanation: 'do-while executes the body once before checking the condition (6 < 5 is false), so it runs exactly 1 time.'
      }
    ]
  },

  'nested-loops-and-tracing': {
    id: 'nested-loops-and-tracing',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.9',
    title: 'Nested Loops & Loop Tracing',
    subtitle: 'Inner vs Outer loops, matrix grid traversal, and star pattern printing',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of the clock on your wall. The minute hand (outer loop) ticks once every 60 seconds. But for every single tick of the minute hand, the second hand (inner loop) must complete a full cycle of 60 seconds from 1 to 60. The inner loop moves fast; the outer loop moves slowly.',
    coreExplanation: [
      'A loop inside another loop is called a Nested Loop.',
      'For EVERY single iteration of the outer loop, the inner loop executes completely from start to finish.',
      'Total iterations = Outer loop iterations $\\times$ Inner loop iterations.',
      'If outer runs N times and inner runs M times, overall time complexity is O(N $\\times$ M).',
      'Common uses: 2D Arrays / Matrices, Grid coordinate systems, Star patterns (triangles, pyramids).',
      'Break in nested loops: A standard "break;" only breaks out of the IMMEDIATE inner loop containing it, NOT the outer loop!',
      'Labeled break: You can label the outer loop to break out of multiple loops at once: "outer: for(...) { break outer; }"',
    ],
    diagram: `Outer Loop (i = 1 to 3):
  i = 1 -> Inner Loop (j = 1 to 3) runs: (1,1) (1,2) (1,3)
  i = 2 -> Inner Loop (j = 1 to 3) runs: (2,1) (2,2) (2,3)
  i = 3 -> Inner Loop (j = 1 to 3) runs: (3,1) (3,2) (3,3)`,
    codeSnippet: {
      title: 'Printing a Right-Angled Triangle Pattern',
      code: `public class PatternTracing {
    public static void main(String[] args) {
        int rows = 4;

        // Outer loop controls rows
        for (int i = 1; i <= rows; i++) {
            // Inner loop controls stars per row
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println(); // newline after each row
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 1; i <= rows; i++)', explanation: 'Runs 4 times for rows 1, 2, 3, 4.' },
        { line: 'for (int j = 1; j <= i; j++)', explanation: 'When i=1: prints 1 star. When i=2: prints 2 stars. When i=3: prints 3 stars.' },
        { line: 'System.out.println();', explanation: 'Moves print head to next line after inner loop finishes current row.' },
      ],
      output: `* 
* * 
* * * 
* * * * `
    },
    beginnerMistakes: [
      {
        mistake: 'Using "System.out.println("* ")" inside the inner loop instead of "print()".',
        whyItHappens: 'println adds a newline after every single star, printing a single vertical line of stars instead of a triangle.',
        howToFix: 'Use System.out.print() for elements on the same row; use System.out.println() only at the end of the outer loop.'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do you break out of an outer loop from inside a deeply nested inner loop in Java?',
        answer: 'By using a Labeled Break. You place a label (e.g. outerLoop:) before the outer loop header, and call "break outerLoop;" from inside the inner loop.'
      }
    ],
    miniQuiz: [
      {
        question: 'In nested loops: for(int i=0; i<3; i++) for(int j=0; j<4; j++) count++; What is the final value of count?',
        options: ['7', '12', '10', '16'],
        correctIndex: 1,
        explanation: 'Outer runs 3 times; for each outer iteration, inner runs 4 times. 3 * 4 = 12 total executions.'
      }
    ]
  },

  // ── 3.3 Relational & Equality Operators ──
  'relational-equality': {
    id: 'relational-equality',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.3',
    title: 'Relational & Equality Operators (== vs .equals())',
    subtitle: 'Comparing values, boolean results, and the famous reference comparison trap',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine comparing two identical car keys. If you check if both keys unlock the same door, that is ".equals()" (content check). If you check if they are literally the exact same physical piece of metal in your hand, that is "==" (reference check). Two keys made at the same factory look identical, but are two distinct physical objects!',
    coreExplanation: [
      'Relational operators compare two values and ALWAYS return a boolean: true or false.',
      'Comparison operators: > (greater than), < (less than), >= (greater or equal), <= (less or equal).',
      'Equality operators: == (equal to), != (not equal to).',
      'For PRIMITIVES (int, double, char): "==" compares the actual binary values inside the memory cells (5 == 5 is true).',
      'For OBJECTS (String, Scanner, Person): "==" compares the MEMORY ADDRESS (references). Even if two strings hold the same text, "==" returns false if they live in different memory locations!',
      'To compare the actual contents/text of two objects, you MUST call .equals() method: str1.equals(str2).'
    ],
    diagram: `PRIMITIVE COMPARISON (Values compared directly):
int a = 10;  [ 10 ]
int b = 10;  [ 10 ]   ->  a == b is TRUE!

OBJECT COMPARISON (Memory addresses compared by ==):
String s1 = new String("Java");  [ Address: 0x100 ] -> Heap ("Java")
String s2 = new String("Java");  [ Address: 0x200 ] -> Heap ("Java")

s1 == s2        -> FALSE (0x100 != 0x200, different memory addresses!)
s1.equals(s2)   -> TRUE  (Reads internal characters: 'J','a','v','a')`,
    codeSnippet: {
      title: 'Equality Comparison in Action',
      code: `public class EqualityDemo {
    public static void main(String[] args) {
        int x = 5, y = 10;
        System.out.println("x < y: " + (x < y));       // true
        System.out.println("x == y: " + (x == y));     // false

        String name1 = new String("Munaf");
        String name2 = new String("Munaf");

        // The Big Beginner Trap:
        System.out.println("name1 == name2: " + (name1 == name2));         // false!
        System.out.println("name1.equals(name2): " + name1.equals(name2)); // true!
    }
}`,
      lineByLineExplanation: [
        { line: 'x < y: true', explanation: '5 is strictly less than 10, resulting in boolean true.' },
        { line: 'name1 == name2: false', explanation: 'Each "new" keyword creates a brand new object at a distinct memory address.' },
        { line: 'name1.equals(name2): true', explanation: '.equals() compares the character sequence inside the strings.' }
      ],
      output: `x < y: true
x == y: false
name1 == name2: false
name1.equals(name2): true`
    },
    beginnerMistakes: [
      {
        mistake: 'Using a single "=" for comparison: if (score = 100)',
        whyItHappens: 'Single = is ASSIGNMENT. Double == is COMPARISON.',
        howToFix: 'In Java, "if (x = 10)" causes a compilation error because int cannot be converted to boolean.'
      },
      {
        mistake: 'Comparing Strings with "==": if (input == "yes")',
        whyItHappens: 'In Python or JavaScript, == works on string content. In Java, == checks memory reference!',
        howToFix: 'Always use "yes".equals(input) or input.equals("yes").'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the exact difference between == and .equals() in Java?',
        answer: 'The == operator checks reference equality (whether both variables point to the same memory location), whereas .equals() checks logical content equality (defined by the class implementation).'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of: String a = new String("test"); String b = new String("test"); System.out.println(a == b);',
        options: ['true', 'false', 'Compilation Error', 'NullPointerException'],
        correctIndex: 1,
        explanation: 'Because both strings were created using "new", they reside at different memory addresses, so == returns false.'
      }
    ]
  },

  // ── 3.5 Assignment & Compound Operators ──
  'assignment-operators': {
    id: 'assignment-operators',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.5',
    title: 'Assignment Operators & The Compound Cast Trap',
    subtitle: 'Simple assignment, compound operators, and hidden implicit casting behavior',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of assignment "=" like pouring water into a labeled pitcher. Compound assignment "+=" is pouring additional water into the same pitcher. But Java secretly adds a funnel (implicit cast) when you use "+=" to prevent overflow errors from stopping compilation.',
    coreExplanation: [
      'The simple assignment operator "=" copies the value from the right-hand expression into the left-hand variable.',
      'Compound operators combine an arithmetic operation with assignment: +=, -=, *=, /=, %%=.',
      'For example, x += 5 is shorthand for x = x + 5.',
      'THE FAMOUS JAVA INTERVIEW TRAP: Compound operators include an IMPLICIT CAST!',
      'If s is a short, "s = s + 1" fails compilation because (short + int) promotes to int. But "s += 1" compiles cleanly because it is internally rewritten as "s = (short)(s + 1)".'
    ],
    diagram: `Compound Assignment Magic:
short s = 10;

s = s + 5;    // COMPILER ERROR! (s + 5) promotes to int, cannot assign int to short!

s += 5;       // COMPILES! Java translates this to:
              // s = (short)(s + 5);`,
    codeSnippet: {
      title: 'Compound Assignment & Implicit Narrowing',
      code: `public class AssignmentDemo {
    public static void main(String[] args) {
        int a = 20;
        a += 10; // a = a + 10 = 30
        a *= 2;  // a = a * 2 = 60
        System.out.println("a = " + a);

        short s = 100;
        // s = s + 5; // Error: Type mismatch: cannot convert from int to short
        s += 5; // Valid! Java secretly does: s = (short)(s + 5)
        System.out.println("s = " + s);
    }
}`,
      lineByLineExplanation: [
        { line: 'a += 10;', explanation: 'Adds 10 to a (original 20), resulting in 30.' },
        { line: 'a *= 2;', explanation: 'Multiplies current 30 by 2, resulting in 60.' },
        { line: 's += 5;', explanation: 'Implicitly casts the int result back to short.' }
      ],
      output: `a = 60
s = 105`
    },
    beginnerMistakes: [
      {
        mistake: 'Confusing "+=" with "=+"',
        whyItHappens: 'Typing "=+" assigns a positive number instead of adding! "x =+ 5" assigns +5 to x.',
        howToFix: 'Always write the operator first, then equals: +=, -=, *=.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does "short s = 1; s += 1;" compile, but "short s = 1; s = s + 1;" does not?',
        answer: 'Because Java automatically promotes byte and short operands to int during arithmetic operations. In "s = s + 1", the right side is an int and cannot be assigned to short without an explicit cast. The compound operator "s += 1" automatically includes an implicit cast: s = (short)(s + 1).'
      }
    ],
    miniQuiz: [
      {
        question: 'Given "byte b = 10; b += 2;", what happens?',
        options: ['b becomes 12 without compilation errors', 'Compilation error: cannot convert int to byte', 'Runtime exception', 'b becomes 20'],
        correctIndex: 0,
        explanation: 'Compound assignment operators perform an implicit cast: b = (byte)(b + 2), so it compiles cleanly.'
      }
    ]
  },

  // ── 3.6 Ternary Operator ──
  'ternary-operator': {
    id: 'ternary-operator',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.6',
    title: 'The Ternary Operator (? :)',
    subtitle: 'The inline conditional shorthand for clean, expressive variable assignment',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of a bouncer at a club door: "Is age >= 18? If YES give Green Stamp, if NO give Red Stamp". The ternary operator is a one-sentence bouncer: result = (age >= 18) ? "Green" : "Red";',
    coreExplanation: [
      'The ternary operator is the only operator in Java that takes THREE operands.',
      'Syntax: condition ? expressionIfTrue : expressionIfFalse;',
      'First operand is a boolean condition.',
      'If true, the second operand is evaluated and returned.',
      'If false, the third operand is evaluated and returned.',
      'Both expressions must be compatible types so the compiler can determine the resulting variable type.'
    ],
    diagram: `       [ boolean condition ]
               /      \
         true /        \ false
             v          v
     [ expr1 ]          [ expr2 ]`,
    codeSnippet: {
      title: 'Ternary Operator vs If-Else',
      code: `public class TernaryDemo {
    public static void main(String[] args) {
        int marks = 75;

        // Using traditional if-else:
        String status1;
        if (marks >= 50) {
            status1 = "PASSED";
        } else {
            status1 = "FAILED";
        }

        // Using concise ternary operator:
        String status2 = (marks >= 50) ? "PASSED" : "FAILED";

        System.out.println("Status 1: " + status1);
        System.out.println("Status 2: " + status2);

        // Finding maximum of two numbers:
        int a = 42, b = 99;
        int max = (a > b) ? a : b;
        System.out.println("Maximum is: " + max);
    }
}`,
      lineByLineExplanation: [
        { line: 'String status2 = (marks >= 50) ? "PASSED" : "FAILED";', explanation: 'If marks >= 50 is true, returns "PASSED"; otherwise returns "FAILED".' },
        { line: 'int max = (a > b) ? a : b;', explanation: 'Directly initializes max with the greater value in a single readable line.' }
      ],
      output: `Status 1: PASSED
Status 2: PASSED
Maximum is: 99`
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to use statements instead of expressions: (x > 0) ? System.out.println("Yes") : ...',
        whyItHappens: 'Ternary operator MUST return a value. System.out.println() returns void!',
        howToFix: 'Use ternary to compute a value: System.out.println((x > 0) ? "Yes" : "No");'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you nest ternary operators in Java?',
        answer: 'Yes, e.g. "x > 0 ? 1 : x < 0 ? -1 : 0". However, deeply nested ternaries hurt readability and are generally discouraged in enterprise codebases in favor of if-else ladders.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the result of: int x = 10; String res = (x > 20) ? "A" : (x > 5) ? "B" : "C";',
        options: ['A', 'B', 'C', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'x > 20 is false, so it falls to the false expression: (10 > 5) ? "B" : "C", which evaluates to "B".'
      }
    ]
  },

  // ── 3.7 Bitwise & Shift Operators ──
  'bitwise-shift-operators': {
    id: 'bitwise-shift-operators',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.7',
    title: 'Bitwise & Shift Operators',
    subtitle: 'Manipulating individual binary bits (&, |, ^, ~, <<, >>, >>>)',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an 8-switch panel on a wall. Instead of dealing with the whole building at once, bitwise operators let you flick individual light switches ON (1) or OFF (0) directly at the circuit level.',
    coreExplanation: [
      'Bitwise operators work directly on the binary representations (0s and 1s) of integer types.',
      '& (Bitwise AND): 1 only if BOTH bits are 1.',
      '| (Bitwise OR): 1 if AT LEAST ONE bit is 1.',
      '^ (Bitwise XOR): 1 if bits are DIFFERENT; 0 if bits are identical (a ^ a = 0).',
      '~ (Bitwise NOT / Inversion): Inverts all bits (0 becomes 1, 1 becomes 0). ~x = -(x + 1).',
      '<< (Left Shift): Shifts bits left, filling right with 0s. Multiplying by 2^n: x << 1 = x * 2.',
      '>> (Signed Right Shift): Shifts bits right, preserving the sign bit (copies leftmost bit).',
      '>>> (Unsigned Right Shift): Shifts bits right, always filling leftmost bits with 0s.'
    ],
    diagram: `Bitwise AND (&) on 5 and 3:
5 in binary:  0 1 0 1
3 in binary:  0 0 1 1
--------------------
5 & 3:        0 0 0 1  ->  Decimal 1

Bitwise XOR (^) on 5 and 3:
5 in binary:  0 1 0 1
3 in binary:  0 0 1 1
--------------------
5 ^ 3:        0 1 1 0  ->  Decimal 6`,
    codeSnippet: {
      title: 'Bitwise and Bit Shift Examples',
      code: `public class BitwiseDemo {
    public static void main(String[] args) {
        int a = 5; // 0101 in binary
        int b = 3; // 0011 in binary

        System.out.println("a & b: " + (a & b)); // 0001 -> 1
        System.out.println("a | b: " + (a | b)); // 0111 -> 7
        System.out.println("a ^ b: " + (a ^ b)); // 0110 -> 6

        // Fast multiplication and division by 2:
        int num = 8;
        System.out.println("8 << 1 (8 * 2): " + (num << 1)); // 16
        System.out.println("8 >> 1 (8 / 2): " + (num >> 1)); // 4
    }
}`,
      lineByLineExplanation: [
        { line: 'a & b', explanation: 'Bitwise AND: only bit index 0 is 1 in both numbers, yielding binary 0001 = 1.' },
        { line: 'num << 1', explanation: 'Shifting left by 1 bit effectively doubles the value (8 * 2 = 16).' },
        { line: 'num >> 1', explanation: 'Shifting right by 1 bit divides the value by 2 (8 / 2 = 4).' }
      ],
      output: `a & b: 1
a | b: 7
a ^ b: 6
8 << 1 (8 * 2): 16
8 >> 1 (8 / 2): 4`
    },
    beginnerMistakes: [
      {
        mistake: 'Using & or | when intending boolean && or ||',
        whyItHappens: 'Single & evaluates both sides without short-circuiting, potentially causing NullPointerException.',
        howToFix: 'Use && and || for logical conditions. Reserve & and | for bit manipulation.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the trick to swap two numbers without using a temporary variable using bitwise XOR?',
        answer: 'a = a ^ b; b = a ^ b; a = a ^ b; Because x ^ x = 0 and x ^ 0 = x, XOR cancels out duplicate values and swaps them in-place with zero extra memory.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the value of (4 ^ 4)?',
        options: ['4', '0', '8', '1'],
        correctIndex: 1,
        explanation: 'XOR of any number with itself is always 0 because every bit is identical (1^1=0, 0^0=0).'
      }
    ]
  },

  // ── 3.8 instanceof Operator ──
  'instanceof-operator': {
    id: 'instanceof-operator',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.8',
    title: 'The instanceof Operator & Pattern Matching',
    subtitle: 'Checking object runtime types safely and Java 14+ pattern matching',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Imagine luggage at an airport. Before you try to unpack delicate glassware, you check the label: "Is this package marked Fragile?". instanceof lets your code inspect an object at runtime before attempting to unpack it, preventing costly crashes.',
    coreExplanation: [
      'The "instanceof" operator tests whether an object reference is an instance of a specified class or interface.',
      'It returns a boolean: true if the object IS-A subtype of the class/interface; false otherwise.',
      'Crucial safety rule: "null instanceof AnyClass" ALWAYS returns false without throwing NullPointerException!',
      'Before Java 14, developers had to check with instanceof AND then explicitly cast.',
      'Java 14+ introduced Pattern Matching for instanceof: "if (obj instanceof String s)" checks the type and binds the variable "s" in one clean step!'
    ],
    diagram: `Object obj = "Hello World";

Traditional (Before Java 14):
if (obj instanceof String) {
    String s = (String) obj; // Manual boilerplate cast required!
    System.out.println(s.length());
}

Modern Pattern Matching (Java 14+):
if (obj instanceof String s) { // Safe check + binding in 1 step!
    System.out.println(s.length());
}`,
    codeSnippet: {
      title: 'Modern Pattern Matching with instanceof',
      code: `public class InstanceOfDemo {
    public static void main(String[] args) {
        Object item = "Java Developer";

        // Modern Java 14+ Pattern Matching:
        if (item instanceof String text) {
            // 'text' is already typed as String! No manual casting needed!
            System.out.println("Text length: " + text.length());
            System.out.println("Upper case: " + text.toUpperCase());
        }

        Object nullObj = null;
        System.out.println("null instanceof String: " + (nullObj instanceof String)); // false
    }
}`,
      lineByLineExplanation: [
        { line: 'if (item instanceof String text)', explanation: 'Verifies item is a String and automatically creates variable "text" of type String.' },
        { line: 'nullObj instanceof String: false', explanation: 'instanceof safely handles null and returns false without exceptions.' }
      ],
      output: `Text length: 14
Upper case: JAVA DEVELOPER
null instanceof String: false`
    },
    beginnerMistakes: [
      {
        mistake: 'Casting an object without checking instanceof first.',
        whyItHappens: 'If the object happens to be a different type at runtime, JVM throws ClassCastException.',
        howToFix: 'Always guard downcasting with "if (obj instanceof TargetType target)".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is returned if you evaluate "null instanceof Object"?',
        answer: 'It returns false. In Java, null is not an instance of any class or interface.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of "Object o = null; System.out.println(o instanceof String);"?',
        options: ['false', 'true', 'NullPointerException', 'Compilation Error'],
        correctIndex: 0,
        explanation: 'instanceof on a null reference always evaluates to false safely.'
      }
    ]
  },

  // ── 3.9 Operator Precedence ──
  'operator-precedence': {
    id: 'operator-precedence',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.9',
    title: 'Operator Precedence & Associativity',
    subtitle: 'Which operator runs first? Parentheses as the golden rule for clarity',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of PEMDAS (BODMAS) from primary school: multiplication always happens before addition: 2 + 3 * 4 = 14, not 20! Programming operators follow a strict ranking ladder.',
    coreExplanation: [
      'Operator Precedence determines the grouping and evaluation order of terms in an expression.',
      'Highest precedence: Postfix (expr++, expr--), then Prefix (++expr, --expr, +expr, -expr, !).',
      'Multiplicative (*, /, %) takes precedence over Additive (+, -).',
      'Relational (<, >, <=, >=) takes precedence over Equality (==, !=).',
      'Equality takes precedence over Logical AND (&&), which takes precedence over Logical OR (||).',
      'Lowest precedence: Assignment (=, +=, -= etc.).',
      'GOLDEN INDUSTRY RULE: When in doubt, ALWAYS use parentheses "()". Parentheses override all precedence and make code readable to humans.'
    ],
    diagram: `PRECEDENCE HIERARCHY (Top to Bottom):
1.  () [] .              (Parentheses & Member access)
2.  ++ -- + - ! ~        (Unary prefix)
3.  * / %                (Multiplicative)
4.  + -                  (Additive)
5.  << >> >>>            (Bitwise Shifts)
6.  < > <= >= instanceof (Relational)
7.  == !=                (Equality)
8.  &                    (Bitwise AND)
9.  ^                    (Bitwise XOR)
10. |                    (Bitwise OR)
11. &&                   (Logical AND)
12. ||                   (Logical OR)
13. ?:                   (Ternary)
14. = += -= *= /= %=     (Assignment - lowest!)`,
    codeSnippet: {
      title: 'Tracing Precedence Pitfalls',
      code: `public class PrecedenceDemo {
    public static void main(String[] args) {
        int result1 = 10 + 20 * 2;
        System.out.println("10 + 20 * 2 = " + result1); // 50, not 60!

        int result2 = (10 + 20) * 2;
        System.out.println("(10 + 20) * 2 = " + result2); // 60

        boolean check = 5 > 3 && 10 < 20 || false;
        // Step 1: 5 > 3 is true, 10 < 20 is true
        // Step 2: true && true is true
        // Step 3: true || false is true
        System.out.println("Boolean check: " + check);
    }
}`,
      lineByLineExplanation: [
        { line: '10 + 20 * 2', explanation: 'Multiplication * has higher precedence than +, so 20 * 2 = 40 is evaluated first, then 10 + 40 = 50.' },
        { line: '(10 + 20) * 2', explanation: 'Parentheses force addition first: 30 * 2 = 60.' }
      ],
      output: `10 + 20 * 2 = 50
(10 + 20) * 2 = 60
Boolean check: true`
    },
    beginnerMistakes: [
      {
        mistake: 'Relying on memory for complex operator order instead of using parentheses.',
        whyItHappens: 'Even senior engineers make mistakes on chained bitwise and logical operations without parentheses.',
        howToFix: 'Always write explicit parentheses: (a && b) || (c && d).'
      }
    ],
    interviewQuestions: [
      {
        question: 'Between && and ||, which operator has higher precedence in Java?',
        answer: 'Logical AND (&&) has higher precedence than Logical OR (||). In expression "a || b && c", Java evaluates (b && c) first before evaluating the OR.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the value of: int x = 2 + 3 * 4 / 2; ?',
        options: ['10', '8', '14', '7'],
        correctIndex: 1,
        explanation: '* and / have equal precedence and are evaluated left-to-right: 3 * 4 = 12; 12 / 2 = 6; then 2 + 6 = 8.'
      }
    ]
  },

  // ── 4.1 If-Else Ladder & Nested Conditions ──
  'if-else-ladder': {
    id: 'if-else-ladder',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.1',
    title: 'If-Else Ladders & Decision Making',
    subtitle: 'Branching execution paths, strict boolean conditions, and the dangling else trap',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a train track switch. When the train approaches a junction, the track can either send the train down Route A or Route B. It can never go down both routes simultaneously. An if-else statement routes the computer down exactly one chosen track.',
    coreExplanation: [
      'The "if" statement executes a block of code ONLY if the condition evaluates to true.',
      'The "else if" ladder allows checking multiple conditions sequentially from top to bottom.',
      'The moment ONE condition evaluates to true, its block executes and ALL subsequent else-if branches are skipped!',
      'The final "else" block acts as a fallback default when none of the preceding conditions were true.',
      'STRICT JAVA RULE: In C/C++, you can write "if (x)" where x is an integer. In Java, conditions MUST be of type boolean! "if (1)" will NOT compile!'
    ],
    diagram: `[ Evaluate Condition 1 ] -> true -> [ Execute Block 1 ] -> (Skip Rest)
          | false
[ Evaluate Condition 2 ] -> true -> [ Execute Block 2 ] -> (Skip Rest)
          | false
[ Execute Fallback 'else' Block ]`,
    codeSnippet: {
      title: 'Grading System with If-Else Ladder',
      code: `public class IfElseDemo {
    public static void main(String[] args) {
        int score = 85;
        char grade;

        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B'; // 85 lands here!
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }

        System.out.println("Score: " + score + " -> Grade: " + grade);
    }
}`,
      lineByLineExplanation: [
        { line: 'if (score >= 90)', explanation: '85 >= 90 is false, so proceeds to next branch.' },
        { line: 'else if (score >= 80)', explanation: '85 >= 80 is true! grade becomes \'B\'.' },
        { line: 'else if (score >= 70)...', explanation: 'All subsequent branches are skipped completely.' }
      ],
      output: 'Score: 85 -> Grade: B'
    },
    beginnerMistakes: [
      {
        mistake: 'Putting a semicolon immediately after if: if (x > 10); { ... }',
        whyItHappens: 'Accidental habit. The semicolon creates an empty statement, so the block { ... } always runs!',
        howToFix: 'Never put a semicolon after the if condition parentheses.'
      },
      {
        mistake: 'Writing "if (count = 5)" instead of "=="',
        whyItHappens: 'Single = is assignment. In Java, this fails compilation with "Type mismatch: cannot convert from int to boolean".',
        howToFix: 'Always use double equals "==" when checking equality in conditions: if (count == 5).'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the "Dangling Else" problem in programming?',
        answer: 'When nested if statements lack curly braces {}, an else clause attaches to the closest preceding unmatched if statement, which can lead to subtle logic bugs. Always using curly braces {} eliminates this ambiguity.'
      }
    ],
    miniQuiz: [
      {
        question: 'Will "int x = 1; if (x) { System.out.println(\"OK\"); }" compile in Java?',
        options: ['No, compilation error: cannot convert int to boolean', 'Yes, prints OK', 'Runtime Exception', 'Prints nothing'],
        correctIndex: 0,
        explanation: 'Java requires an explicit boolean expression in if statements. Non-zero integers are not automatically converted to booleans.'
      }
    ]
  },

  // ── 4.2 Traditional Switch Statement ──
  'switch-statement': {
    id: 'switch-statement',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.2',
    title: 'The Traditional Switch Statement & Fall-Through',
    subtitle: 'Multi-way branching, supported data types, and why "break" is essential',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an elevator button panel. You press button 3. The elevator jumps directly to Floor 3 instead of stopping and asking at Floor 1 and Floor 2. But if the doors don\'t have an emergency stop ("break"), the elevator will keep falling down to Floor 4, Floor 5, and the Basement!',
    coreExplanation: [
      'A switch statement tests a single variable for equality against a list of constant values called cases.',
      'Supported types: byte, short, char, int, enums, String (Java 7+), and their wrapper classes.',
      'NOT supported: float, double, boolean, long, or arbitrary objects.',
      'The "break" statement is critical: it terminates the switch. If you omit break, execution "falls through" into subsequent cases regardless of their condition!',
      'The "default" case executes if none of the cases match.'
    ],
    diagram: `switch (choice)
   |
   +-> case 1: [ Action ] -> break -> [ EXIT ]
   |
   +-> case 2: [ Action ] (no break!)
   |             | (Fall-through!)
   |             v
   +-> case 3: [ Action ] -> break -> [ EXIT ]
   |
   +-> default: [ Fallback Action ]`,
    codeSnippet: {
      title: 'Switch Fall-Through Tracing Trap',
      code: `public class SwitchDemo {
    public static void main(String[] args) {
        int day = 2;

        System.out.println("--- Switch with break ---");
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break; // Matches & exits!
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }

        System.out.println("--- Fall-through trap (no break) ---");
        int count = 1;
        switch (count) {
            case 1: System.out.print("One "); // No break!
            case 2: System.out.print("Two "); // Falls through!
            case 3: System.out.print("Three "); break;
            default: System.out.print("Default ");
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'case 2: Tuesday break;', explanation: 'Matches day 2, prints Tuesday, and break stops further execution.' },
        { line: 'case 1: System.out.print("One ");', explanation: 'Since there is no break, JVM continues running case 2 and case 3!' }
      ],
      output: `--- Switch with break ---
Tuesday
--- Fall-through trap (no break) ---
One Two Three `
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to switch on a double or float: switch (3.14)',
        whyItHappens: 'Floating point numbers have precision rounding issues and cannot be compared cleanly for exact discrete cases.',
        howToFix: 'Use if-else ladders when comparing floating point numbers.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you use a String in a switch statement? Since which Java version?',
        answer: 'Yes, Strings have been supported in switch statements since Java 7. Under the hood, the compiler compares the String hashCode() and verifies with .equals().'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following data types CANNOT be used in a Java switch statement?',
        options: ['int', 'String', 'double', 'char'],
        correctIndex: 2,
        explanation: 'Floating point types (float and double) and boolean cannot be used in a switch statement.'
      }
    ]
  },

  // ── 4.4 For Loop Deep Dive ──
  'for-loop-deep-dive': {
    id: 'for-loop-deep-dive',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.4',
    title: 'The For Loop Deep Dive',
    subtitle: 'The 3-part loop header, iteration control, and variable scope',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of doing 10 pushups for a gym coach: 1) Coach says start at 1 (initialization); 2) Check if you reached 10 yet (condition); 3) Do pushup (body); 4) Count up by 1 (increment). A for loop packages all 4 steps into one tidy line of code.',
    coreExplanation: [
      'The standard for loop is ideal when you know IN ADVANCE how many times a block should repeat.',
      'Header syntax: for (initialization; terminationCondition; updateExpression) { body }',
      'Step 1 (Initialization): Runs ONCE at the very start. Typically declares loop counter (int i = 0).',
      'Step 2 (Condition): Evaluated BEFORE each iteration. If true, body runs; if false, loop stops immediately.',
      'Step 3 (Body): The statements inside the braces execute.',
      'Step 4 (Update): Runs AFTER each iteration body completes (e.g. i++). Then execution jumps back to Step 2.',
      'Scope rule: A variable declared in the for header (int i = 0) ONLY exists inside the loop body!'
    ],
    diagram: `for ( [Init] ; [Condition] ; [Update] ) { [Body] }
         |            ^               ^
         v            |               |
     (Runs once)      |               |
                      v true          |
                   [ Body ] ----------+`,
    codeSnippet: {
      title: 'For Loop Forward and Backward Tracing',
      code: `public class ForLoopDemo {
    public static void main(String[] args) {
        System.out.println("Counting up:");
        for (int i = 1; i <= 4; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.println("Counting down by 2s:");
        for (int count = 10; count >= 2; count -= 2) {
            System.out.print(count + " ");
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 1; i <= 4; i++)', explanation: 'Starts at 1, checks <= 4, prints 1 2 3 4, stops when i becomes 5.' },
        { line: 'count -= 2', explanation: 'Decrements count by 2 after each step: 10, 8, 6, 4, 2.' }
      ],
      output: `Counting up:
1 2 3 4 
Counting down by 2s:
10 8 6 4 2 `
    },
    beginnerMistakes: [
      {
        mistake: 'Off-by-One Error: Writing "i < array.length" vs "i <= array.length"',
        whyItHappens: 'Arrays in Java are 0-indexed. An array of length 5 has valid indices 0 to 4.',
        howToFix: 'Always use "< array.length" to avoid ArrayIndexOutOfBoundsException.'
      },
      {
        mistake: 'Accidentally putting a semicolon after for header: for(int i=0; i<5; i++); { ... }',
        whyItHappens: 'The semicolon creates an empty body that loops 5 times doing nothing, then the block { ... } runs once.',
        howToFix: 'Never place a semicolon immediately after the parentheses of a for loop header.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the effect of: for (;;) { } ?',
        answer: 'It creates an infinite loop. When the condition in a for loop is omitted, Java defaults it to true.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is printed by: for (int i = 0; i < 3; i++) { } System.out.println(i);',
        options: ['3', '2', 'Compilation Error', '0'],
        correctIndex: 2,
        explanation: 'Compilation Error: The variable "i" was declared inside the for loop header and is out of scope outside the loop.'
      }
    ]
  },

  // ── 4.5 Enhanced For-Each Loop ──
  'enhanced-for-each': {
    id: 'enhanced-for-each',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.5',
    title: 'The Enhanced For-Each Loop',
    subtitle: 'Iterating through arrays and collections without counter variables or index bugs',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of an automated candy dispenser. Instead of saying "Give me item at index 0, now give me item at index 1", you just put your hand out and say "Give me each candy one by one until the box is empty".',
    coreExplanation: [
      'Introduced in Java 5, the enhanced for loop (for-each) provides a clean syntax to traverse arrays and Iterable collections.',
      'Syntax: for (DataType item : collectionOrArray) { body }',
      'Eliminates index-related errors (no ArrayIndexOutOfBoundsException possible!).',
      'Read-Only Limitation: You cannot use for-each to modify array elements in-place because "item" is a temporary copy of each value.',
      'No Index Access: If you need to know the current index position (e.g. index 0, 1, 2), you must use a standard indexed for loop.'
    ],
    diagram: `Array: [ "Apple", "Banana", "Cherry" ]
                |
                v
for (String fruit : fruits)
  Iteration 1 -> fruit = "Apple"
  Iteration 2 -> fruit = "Banana"
  Iteration 3 -> fruit = "Cherry"`,
    codeSnippet: {
      title: 'Iterating Arrays with For-Each',
      code: `public class ForEachDemo {
    public static void main(String[] args) {
        String[] languages = {"Java", "Python", "TypeScript", "Kotlin"};

        System.out.println("Programming Languages:");
        for (String lang : languages) {
            System.out.println("-> " + lang);
        }

        int[] numbers = {10, 20, 30, 40};
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        System.out.println("Total Sum: " + sum);
    }
}`,
      lineByLineExplanation: [
        { line: 'for (String lang : languages)', explanation: 'In each iteration, assigns the next string element to variable "lang".' },
        { line: 'sum += n;', explanation: 'Accumulates each integer into the sum variable.' }
      ],
      output: `Programming Languages:
-> Java
-> Python
-> TypeScript
-> Kotlin
Total Sum: 100`
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to modify array elements inside for-each: for (int x : arr) { x = 0; }',
        whyItHappens: 'Variable "x" is only a local copy of the element. Modifying "x" does NOT alter the array!',
        howToFix: 'Use a standard indexed loop if you need to modify elements: for (int i = 0; i < arr.length; i++) arr[i] = 0;'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you remove elements from an ArrayList inside a for-each loop?',
        answer: 'No! Calling list.remove() inside a for-each loop throws ConcurrentModificationException because for-each uses an Iterator internally. To remove elements while iterating, you must use Iterator.remove() or list.removeIf().'
      }
    ],
    miniQuiz: [
      {
        question: 'What interface must an object implement to be usable in an enhanced for-each loop?',
        options: ['java.lang.Iterable', 'java.util.Collection', 'java.io.Serializable', 'java.lang.Cloneable'],
        correctIndex: 0,
        explanation: 'Any class that implements java.lang.Iterable (or any Java array) can be used as the target of a for-each loop.'
      }
    ]
  },

  // ── 4.6 While Loop ──
  'while-loop': {
    id: 'while-loop',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.6',
    title: 'The While Loop (Pre-Condition Loop)',
    subtitle: 'Repeating actions when the exact number of iterations is unknown in advance',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of stirring sugar into hot coffee: "While sugar is still visible at the bottom of the cup, keep stirring". You do not know beforehand whether it will take 5 stirs or 20 stirs; you stop when the condition becomes false.',
    coreExplanation: [
      'A while loop evaluates a boolean condition BEFORE executing the loop body (Pre-test loop).',
      'If the condition is false on the very first check, the body executes ZERO times.',
      'The body must contain code that eventually changes the condition to false; otherwise, an INFINITE LOOP occurs.',
      'Best used when you don\'t know how many times the loop will run (e.g. reading lines from a file until EOF, waiting for user input, game loops).'
    ],
    diagram: `[ Check Condition ]
       |
       +--- true ---> [ Execute Body ] ---> (Loops back to Check)
       |
       +--- false --> [ Exit Loop ]`,
    codeSnippet: {
      title: 'While Loop with Digit Summation',
      code: `public class WhileDemo {
    public static void main(String[] args) {
        // Calculate sum of digits of a number: 1234 -> 1+2+3+4 = 10
        int number = 1234;
        int sum = 0;

        while (number > 0) {
            int lastDigit = number % 10; // Extract last digit
            sum += lastDigit;            // Add to sum
            number /= 10;                // Remove last digit
        }

        System.out.println("Sum of digits: " + sum);
    }
}`,
      lineByLineExplanation: [
        { line: 'while (number > 0)', explanation: 'Loops as long as number has remaining positive digits.' },
        { line: 'number % 10', explanation: 'Modulo 10 gives remainder (1234 % 10 = 4, then 3, 2, 1).' },
        { line: 'number /= 10', explanation: 'Integer division chops off the last digit (1234 -> 123 -> 12 -> 1 -> 0).' }
      ],
      output: 'Sum of digits: 10'
    },
    beginnerMistakes: [
      {
        mistake: 'Forgetting to update the loop condition variable inside the body.',
        whyItHappens: 'Forgetting "i++" or "number /= 10" causes the condition to remain true forever, locking the CPU in an infinite loop.',
        howToFix: 'Always write the increment or state update statement before writing the body logic.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the minimum number of times a while loop can execute?',
        answer: 'Zero times. Because the condition is evaluated before entering the body, if the condition is false initially, the body will never execute.'
      }
    ],
    miniQuiz: [
      {
        question: 'How many times will "int x = 5; while (x < 5) { x++; }" run?',
        options: ['0 times', '1 time', '5 times', 'Infinite loop'],
        correctIndex: 0,
        explanation: '5 < 5 is false on the first check, so the loop body is skipped entirely.'
      }
    ]
  },

  // ── 4.8 Break, Continue & Labeled Statements ──
  'break-continue-labeled': {
    id: 'break-continue-labeled',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.8',
    title: 'Break, Continue & Labeled Statements',
    subtitle: 'Early loop termination, skipping iterations, and breaking out of nested loops',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of watching YouTube video chapters: "Continue" is skipping the rest of the current boring chapter and jumping straight to the start of the next chapter. "Break" is turning off your screen and closing YouTube entirely.',
    coreExplanation: [
      '"break" terminates the loop immediately and jumps to the code following the loop.',
      '"continue" stops the CURRENT iteration immediately and jumps straight to the next iteration (evaluating loop update and condition).',
      'In nested loops, break and continue apply ONLY to the immediate inner loop enclosing them.',
      'LABELED BREAK & CONTINUE: Java allows labeling an outer loop (e.g. outerLoop:) so an inner loop can break or continue the outer loop directly!'
    ],
    diagram: `Loop Iteration:
[ Start Iteration ]
       |
       +--> if (break)    -----> [ EXIT LOOP COMPLETELY ]
       |
       +--> if (continue) -----> [ JUMP TO NEXT ITERATION ]
       |
[ Normal Body Finish ]`,
    codeSnippet: {
      title: 'Break vs Continue vs Labeled Break',
      code: `public class JumpDemo {
    public static void main(String[] args) {
        System.out.println("Using continue to skip even numbers:");
        for (int i = 1; i <= 6; i++) {
            if (i % 2 == 0) continue; // skip even
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.println("Labeled Break exiting outer loop:");
        outer:
        for (int r = 1; r <= 3; r++) {
            for (int c = 1; c <= 3; c++) {
                if (r == 2 && c == 2) {
                    System.out.println("Breaking outer loop at (" + r + "," + c + ")");
                    break outer; // Breaks BOTH loops!
                }
                System.out.print("(" + r + "," + c + ") ");
            }
            System.out.println();
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'if (i % 2 == 0) continue;', explanation: 'Skips printing when i is 2, 4, 6, jumping directly to i++.' },
        { line: 'break outer;', explanation: 'Directly exits the loop labeled "outer:", stopping both inner and outer loops.' }
      ],
      output: `Using continue to skip even numbers:
1 3 5 
Labeled Break exiting outer loop:
(1,1) (1,2) (1,3) 
(2,1) Breaking outer loop at (2,2)`
    },
    beginnerMistakes: [
      {
        mistake: 'Putting code immediately after break or continue inside the same block.',
        whyItHappens: 'Any code after a break or continue in the same block is unreachable.',
        howToFix: 'The Java compiler will flag this as "Unreachable code". Ensure jump statements are inside conditionals.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Does Java have a "goto" statement?',
        answer: 'No. While "goto" is a reserved keyword in Java, it is not implemented and cannot be used. Labeled break and labeled continue provide a safe, structured alternative to goto.'
      }
    ],
    miniQuiz: [
      {
        question: 'In a nested loop, what does a standard "break;" without a label do?',
        options: [
          'Exits the outermost loop',
          'Exits only the innermost loop enclosing it',
          'Exits all running threads',
          'Causes a compiler error'
        ],
        correctIndex: 1,
        explanation: 'An unlabeled break only exits the innermost switch, for, while, or do-while statement that contains it.'
      }
    ]
  },
};
// ============================================================
// HELPER FUNCTIONS FOR SUB-LESSON NAVIGATION
// ============================================================

export function getDetailedLesson(id: string): DetailedLesson | undefined {
  return DETAILED_LESSONS[id];
}

export function getAllDetailedLessons(): DetailedLesson[] {
  return Object.values(DETAILED_LESSONS);
}

export function getLessonsForModule(moduleId: string): DetailedLesson[] {
  return Object.values(DETAILED_LESSONS).filter(l => l.moduleId === moduleId);
}

export function getAdjacentLessons(currentId: string): { prev?: DetailedLesson; next?: DetailedLesson } {
  const all = Object.values(DETAILED_LESSONS);
  const idx = all.findIndex(l => l.id === currentId);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined
  };
}
