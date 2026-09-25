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

export interface PracticeProblem {
  title: string;
  problemStatement: string;
  code?: string;
  options?: string[];
  correctOptionIndex?: number;
  hint: string;
  solution: string;
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
    keyPhrases?: string[];
    commonMistakeAnswer?: string;
  }[];
  miniQuiz: MiniQuizQuestion[];
  practiceProblem?: PracticeProblem;
  practiceProblems?: PracticeProblem[];
  codeExamples?: {
    title: string;
    description: string;
    code: string;
    output?: string;
  }[];
  interviewTakeaways?: string[];
  cheatSheet?: {
    summary: string;
    syntaxTemplate?: string;
    rules: { rule: string; explanation: string }[];
    quickComparison?: { aspect: string; optionA: string; optionB: string }[];
  };
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
    interviewTakeaways: [
      '8 Primitives: byte, short, int, long, float, double, char, boolean. Allocated directly on stack for speed.',
      'Required Literal Suffixes: Long integers require "L" suffix (e.g., 5000000000L). Float decimals require "f" suffix (e.g., 3.14f).',
      'Char is Numeric: char is an unsigned 16-bit Unicode integer (0 to 65535). "A" + 1 evaluates to 66 (int), not "B"!'
    ],
    cheatSheet: {
      summary: 'Java has 8 primitive types: 4 integer (byte, short, int, long), 2 floating point (float, double), 1 character (char), 1 boolean.',
      syntaxTemplate: `byte b = 127;          // 8-bit (-128 to 127)
short s = 32000;       // 16-bit (-32k to 32k)
int i = 2_000_000;     // 32-bit (Default int)
long l = 9000000000L;  // 64-bit (Must have L suffix)
float f = 3.14f;       // 32-bit (Must have f suffix)
double d = 3.14;       // 64-bit (Default decimal)
char c = 'A';          // 16-bit Unicode (0 to 65535)
boolean ok = true;     // true / false (Cannot convert to int!)`,
      rules: [
        { rule: 'Default Integer Type', explanation: 'Any whole number literal (e.g. 100) is automatically treated as int by the compiler.' },
        { rule: 'Default Floating Type', explanation: 'Any fractional decimal literal (e.g. 10.5) is automatically treated as double.' },
        { rule: 'Underscore Readability', explanation: 'Java 7+ permits underscores anywhere between digits: 1_000_000 is identical to 1000000.' },
        { rule: 'Boolean Isolation', explanation: 'In Java, boolean is NOT a number. You cannot write if(1) or assign 0/1 to boolean.' }
      ],
      quickComparison: [
        { aspect: 'int vs long', optionA: 'int: 32 bits, max 2.14 billion, no suffix', optionB: 'long: 64 bits, max 9 quintillion, requires L suffix' },
        { aspect: 'float vs double', optionA: 'float: 32 bits, 7 decimal digits precision, f suffix', optionB: 'double: 64 bits, 15 decimal digits precision, default' },
        { aspect: 'char vs String', optionA: 'char: Primitive 16-bit Unicode, single quotes', optionB: 'String: Immutable reference object, double quotes' }
      ]
    },
    codeExamples: [
      {
        title: 'Example 1: Char Arithmetic & Unicode Values',
        description: 'Demonstrating how chars behave as numbers under arithmetic operations.',
        code: `public class CharArithmetic {
    public static void main(String[] args) {
        char ch = 'A'; // ASCII/Unicode 65
        System.out.println("ch: " + ch);
        System.out.println("ch + 1: " + (ch + 1)); // Prints 66 (int promotion)
        System.out.println("(char)(ch + 1): " + (char)(ch + 1)); // Prints 'B'
        System.out.println("'A' + 'B': " + ('A' + 'B')); // 65 + 66 = 131!
    }
}`,
        output: `ch: A
ch + 1: 66
(char)(ch + 1): B
'A' + 'B': 131`
      },
      {
        title: 'Example 2: Number Bases in Java (Binary, Hex, Octal)',
        description: 'How to write binary (0b), hex (0x), and octal (0) literals in Java.',
        code: `public class NumberBases {
    public static void main(String[] args) {
        int dec = 26;
        int hex = 0x1A;   // '0x' prefix for Hexadecimal (16 + 10 = 26)
        int bin = 0b11010;// '0b' prefix for Binary (16 + 8 + 2 = 26)
        int oct = 032;    // '0' prefix for Octal (3*8 + 2 = 26)

        System.out.println("Dec: " + dec + ", Hex: " + hex + ", Bin: " + bin + ", Oct: " + oct);
    }
}`,
        output: "Dec: 26, Hex: 26, Bin: 26, Oct: 26"
      }
    ],
    practiceProblems: [
      {
        title: 'Tracing Challenge 1: Character Addition Trap',
        problemStatement: 'What does this print to the console? System.out.println(\'1\' + \'2\');',
        options: ['12', '3', '99', 'Compilation Error'],
        correctOptionIndex: 2,
        hint: 'ASCII code for \'1\' is 49 and \'2\' is 50. Arithmetic on chars promotes to int!',
        solution: '99',
        explanation: "Because both are single-quoted chars, the '+' operator performs integer addition on their ASCII codes: 49 + 50 = 99."
      },
      {
        title: 'Tracing Challenge 2: Long Literal Overflow Trap',
        problemStatement: 'What is the output of: long micros = 24 * 60 * 60 * 1000 * 1000;',
        options: ['86400000000', 'Negative number (Numeric Overflow)', 'Compilation Error', '0'],
        correctOptionIndex: 1,
        hint: 'All numbers on the right side are plain ints without L suffix. Multiplication overflows 32-bit int before assignment to long!',
        solution: 'Negative number (Numeric Overflow)',
        explanation: 'Because none of the operands have the "L" suffix, the calculation is performed using 32-bit int arithmetic which overflows into a negative value (-1857093632) before being assigned to long!'
      }
    ],
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
    estimatedMinutes: 8,
    beginnerAnalogy: 'Traditional switch was like a staircase with no doors between floors: if you step onto floor 2 and forget to put up a "break" barricade, you automatically tumble down into floor 3 and floor 4! Modern switch with arrow (->) is like a smart elevator: you press 2, it opens only on floor 2 and never falls through.',
    interviewTakeaways: [
      'No Accidental Fall-Through: Arrow syntax "case X ->" executes ONLY that case. No "break;" statement is needed or permitted!',
      'Returns a Value: Modern switch is an expression, allowing direct assignment: String result = switch(day) { case 1 -> "Mon"; default -> "Other"; };',
      'The "yield" Keyword: If an arrow case requires a block { ... } with multiple statements, use "yield <value>;" to return the value from that block.',
      'Exhaustiveness: When used as an expression returning a value, the compiler requires all possible input values to be covered (or a "default" branch must be present).'
    ],
    cheatSheet: {
      summary: 'Introduced in Java 14, Switch Expressions eliminate fall-through, allow multiple comma-separated labels, and return values.',
      syntaxTemplate: `// As an expression assigning a variable:
String typeOfDay = switch (day) {
    case "SATURDAY", "SUNDAY" -> "Weekend"; // Comma-separated labels!
    case "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY" -> {
        System.out.println("Processing weekday...");
        yield "Weekday"; // yield returns value from block!
    }
    default -> "Invalid day"; // Exhaustiveness required!
};`,
      rules: [
        { rule: 'No Break Needed', explanation: 'Arrow (->) cases automatically break after executing their target expression.' },
        { rule: 'yield vs return', explanation: 'yield returns a value from the switch block; return would exit the entire enclosing method!' },
        { rule: 'Multiple Labels', explanation: 'Multiple case values can be combined with commas: case 1, 2, 3 -> ...' },
        { rule: 'Exhaustiveness', explanation: 'If used as an expression, all enum values or a default branch MUST be provided.' }
      ],
      quickComparison: [
        { aspect: 'Syntax', optionA: 'Traditional: case 1: ... break;', optionB: 'Modern: case 1 -> "Result";' },
        { aspect: 'Return Value', optionA: 'Traditional: Statements only (void)', optionB: 'Modern: Can return a typed value directly' },
        { aspect: 'Fall-Through', optionA: 'Traditional: Yes, if break is omitted', optionB: 'Modern: Never falls through with arrow ->' }
      ]
    },
    coreExplanation: [
      'Traditional switch statements (Java 1.0) required an explicit "break" at the end of each case block. Forgetting break caused accidental fall-through to subsequent cases.',
      'Java 14 introduced Switch Expressions using the arrow (->) syntax.',
      'Key advantages of Modern Switch:',
      '1. No break statements needed — execution never falls through to the next case.',
      '2. Can return a value directly (it is an expression, not just a statement).',
      '3. Multiple comma-separated labels per case: "case 1, 2, 3 -> ..."',
      '4. Uses the "yield" keyword if a case block requires multiple lines of computation.',
      'Supported switch types: byte, short, int, char, String, enum, and pattern types (Java 21+).'
    ],
    diagram: `Traditional Switch (Colons):
case 1: doSomething(); break; // Easy to forget break!

Modern Switch Expression (Arrows):
case 1 -> "Direct Result";   // Clean, safe, returns value!`,
    codeSnippet: {
      title: 'Modern Switch Expression with Arrow and Yield',
      code: `public class ModernSwitchDemo {
    public static void main(String[] args) {
        int quarter = 2;

        // Directly assigned from switch expression:
        String season = switch (quarter) {
            case 1 -> "Winter";
            case 2 -> "Spring";
            case 3 -> "Summer";
            case 4 -> {
                System.out.println("End of year quarter");
                yield "Autumn"; // yield used inside multi-line blocks
            }
            default -> "Unknown Quarter";
        };

        System.out.println("Quarter " + quarter + " is " + season);
    }
}`,
      lineByLineExplanation: [
        { line: 'String season = switch (quarter)', explanation: 'The switch itself returns a String assigned directly to variable season.' },
        { line: 'case 2 -> "Spring";', explanation: 'Evaluates quarter 2, returns "Spring", and exits switch immediately without fall-through.' },
        { line: 'yield "Autumn";', explanation: 'Produces the resulting value from a multi-line curly brace block.' }
      ],
      output: 'Quarter 2 is Spring'
    },
    codeExamples: [
      {
        title: 'Example 1: Enum Exhaustiveness without Default',
        description: 'When switching over an enum, covering all constants makes default unnecessary.',
        code: `enum Level { LOW, MEDIUM, HIGH }

public class EnumSwitch {
    public static void main(String[] args) {
        Level lvl = Level.HIGH;

        int score = switch (lvl) {
            case LOW -> 10;
            case MEDIUM -> 50;
            case HIGH -> 100; // All enum values covered, no default required!
        };

        System.out.println("Score: " + score);
    }
}`,
        output: 'Score: 100'
      }
    ],
    practiceProblems: [
      {
        title: 'Interview Tracing Challenge 1: Arrow Syntax Tracing',
        problemStatement: 'What does this modern switch expression print when code = 2?',
        code: `int code = 2;
String label = switch (code) {
    case 1, 2 -> "Alpha";
    case 3 -> "Beta";
    default -> "Gamma";
};
System.out.println(label);`,
        options: ['Alpha', 'AlphaBeta', 'Beta', 'Compilation Error'],
        correctOptionIndex: 0,
        hint: 'Modern arrow cases do NOT fall through. Multi-label case 1, 2 matches 2 directly.',
        solution: 'Alpha',
        explanation: 'Because code is 2, it matches "case 1, 2" and produces "Alpha". With arrow syntax, there is zero fall-through to case 3, so it prints "Alpha".'
      },
      {
        title: 'Interview Tracing Challenge 2: yield vs return Trap',
        problemStatement: 'What happens if a developer writes "return \"Value\";" inside a switch block instead of "yield \"Value\";"? (e.g. case 1 -> { return "A"; })',
        options: [
          'It returns "A" from the switch expression',
          'Compilation Error: unexpected return statement in switch block',
          'It exits the entire enclosing method immediately, returning from the method',
          'Runtime Exception'
        ],
        correctOptionIndex: 2,
        hint: 'return is bound to the enclosing method; yield is bound to the enclosing switch expression.',
        solution: 'It exits the entire enclosing method immediately, returning from the method',
        explanation: 'In Java, "return" exits the containing method altogether. To yield a value specifically from a switch expression block without exiting the method, you MUST use the "yield" keyword!'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Mixing arrow (->) syntax with colon (:) in the same switch.',
        whyItHappens: 'Trying to use "break;" inside an arrow case or mixing both styles in one switch statement.',
        howToFix: 'A switch must use either all colons (case 1:) or all arrows (case 1 ->). Never mix them.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the purpose of the "yield" keyword in Java?',
        answer: 'The yield keyword (introduced in Java 13/14) is used to return a value from a code block inside a switch expression. It distinguishes returning a value from the switch expression versus returning from the entire enclosing method.',
        followUp: 'Can you use yield outside of a switch expression?',
        keyPhrases: ['Switch expression return', 'Block level value yield', 'Context-sensitive keyword', 'Not usable outside switch']
      },
      {
        question: 'Why does a switch expression require exhaustiveness while a traditional switch statement does not?',
        answer: 'Because a switch expression is used to produce a value (often assigned to a variable). If an unmatched input occurred without a default case, the variable would remain uninitialized, violating Java type safety. A switch statement only executes actions, so omitting unmatched inputs is safe.',
        followUp: 'When can a switch expression omit the default branch?',
        keyPhrases: ['Expression produces a typed value', 'Must handle all possible inputs', 'Enum with all constants covered can omit default']
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
    subtitle: 'Post-condition checking, loop execution guarantees & interview tracing traps',
    estimatedMinutes: 6,
    beginnerAnalogy: 'Think of an amusement park ride where ticket checking happens at the EXIT. A "while" loop checks your ticket before entering (if expired, 0 rides). A "do-while" loop lets you ride first, then checks ticket at the exit. You are 100% guaranteed to ride at least once!',
    interviewTakeaways: [
      'Guaranteed Execution: Runs at least once (>= 1) because the body executes FIRST before the condition is evaluated (Post-Condition check).',
      'The Semicolon Trap: "do { ... } while (condition);" MANDATES a semicolon at the very end. Forgetting ";" causes a compile-time syntax error.',
      'Primary Production Use Case: User menu prompts (display menu options >= 1 time, repeat if invalid input), retry logic on failed network calls.'
    ],
    cheatSheet: {
      summary: 'do-while is an exit-controlled / post-tested loop guaranteed to execute its body at least once.',
      syntaxTemplate: `do {
    // Statements executed at least once
    // Counter update (e.g., i++;)
} while (booleanCondition); // <-- Mandatory semicolon!`,
      rules: [
        { rule: 'Execution Guarantee', explanation: 'Condition is evaluated AFTER the loop body finishes. Minimum iterations = 1.' },
        { rule: 'Syntax Semicolon', explanation: 'Must terminate with a semicolon after while(condition); or code will not compile.' },
        { rule: 'Scope of Variables', explanation: 'Variables declared inside the do { } block CANNOT be used inside the while(condition) parentheses.' },
        { rule: 'Pre/Post Increment Trap', explanation: 'Condition like while(x++ < 5) evaluates current x, then increments immediately after check.' }
      ],
      quickComparison: [
        { aspect: 'Condition Evaluation', optionA: 'while: Evaluated BEFORE entering body (Pre-test)', optionB: 'do-while: Evaluated AFTER executing body (Post-test)' },
        { aspect: 'Minimum Executions', optionA: 'while: 0 times (if initial condition is false)', optionB: 'do-while: 1 time (guaranteed)' },
        { aspect: 'Semicolon Requirement', optionA: 'while: NO semicolon after while(cond)', optionB: 'do-while: MANDATORY semicolon after while(cond);' },
        { aspect: 'Best Suited For', optionA: 'while: When loop count depends entirely on external state', optionB: 'do-while: Menus, PIN prompts, reading network stream chunks' }
      ]
    },
    coreExplanation: [
      'Pre-test (while): Evaluates condition first. If false initially, executes 0 times.',
      'Post-test (do-while): Executes body first, then evaluates condition at the bottom.',
      'If the condition evaluates to true, control jumps back to the top of "do {". If false, the loop terminates.'
    ],
    diagram: `while (Pre-test):       [ Condition Check ] -> false -> [ Exit (0 runs) ]
                               | true
                           [ Body ]

do-while (Post-test):        [ Run Body ]  <--- (ALWAYS RUNS AT LEAST ONCE)
                               |
                       [ Condition Check ] -> false -> [ Exit (>= 1 run) ]
                               | true
                       (Repeats to Body)`,
    codeSnippet: {
      title: 'do-while in Action: Guaranteed 1 Execution Even When False',
      code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int count = 999;

        // Even though (count < 5) is completely FALSE initially:
        do {
            System.out.println("Executes once! count = " + count);
            count++;
        } while (count < 5); // Notice the required semicolon!

        System.out.println("Finished! Final count = " + count);
    }
}`,
      lineByLineExplanation: [
        { line: 'do { ... }', explanation: 'Body runs immediately without evaluating any condition.' },
        { line: 'while (count < 5);', explanation: 'Evaluates (1000 < 5) which is false. Loop terminates cleanly.' },
      ],
      output: `Executes once! count = 999
Finished! Final count = 1000`
    },
    codeExamples: [
      {
        title: 'Example 1: Interactive Menu / Validation Pattern',
        description: 'Simulating an ATM or Console menu that prompts the user at least once and repeats if invalid.',
        code: `public class AtmMenuExample {
    public static void main(String[] args) {
        int pinAttempt = 1;
        int maxAttempts = 3;
        boolean authenticated = false;

        do {
            System.out.println("Displaying PIN Prompt (Attempt " + pinAttempt + "/" + maxAttempts + ")");
            // In a real app, read from Scanner. Here we simulate attempt 3 succeeds:
            if (pinAttempt == 3) {
                authenticated = true;
                System.out.println(">> PIN Correct! Access Granted.");
            } else {
                System.out.println(">> Invalid PIN. Please try again.");
            }
            pinAttempt++;
        } while (!authenticated && pinAttempt <= maxAttempts);
    }
}`,
        output: `Displaying PIN Prompt (Attempt 1/3)
>> Invalid PIN. Please try again.
Displaying PIN Prompt (Attempt 2/3)
>> Invalid PIN. Please try again.
Displaying PIN Prompt (Attempt 3/3)
>> PIN Correct! Access Granted.`
      },
      {
        title: 'Example 2: Digit Reversal with do-while',
        description: 'Reversing numbers including 0 (where standard while would need a special check).',
        code: `public class ReverseNumberDoWhile {
    public static void main(String[] args) {
        int number = 407;
        int reversed = 0;

        do {
            int lastDigit = number % 10;
            reversed = (reversed * 10) + lastDigit;
            number /= 10;
        } while (number > 0);

        System.out.println("Reversed Result: " + reversed); // 704
    }
}`,
        output: `Reversed Result: 704`
      },
      {
        title: 'Example 3: Rolling a Random Dice until Target is Hit',
        description: 'A game where a player rolls a dice at least once until rolling a 6.',
        code: `import java.util.Random;

public class DiceRollSimulation {
    public static void main(String[] args) {
        Random random = new Random(42); // fixed seed for reproducible trace
        int roll;
        int attempts = 0;

        do {
            roll = random.nextInt(6) + 1; // 1 to 6
            attempts++;
            System.out.println("Roll #" + attempts + ": Rolled a " + roll);
        } while (roll != 6);

        System.out.println("Target 6 reached in " + attempts + " rolls!");
    }
}`,
        output: `Roll #1: Rolled a 2
Roll #2: Rolled a 5
Roll #3: Rolled a 6
Target 6 reached in 3 rolls!`
      }
    ],
    practiceProblem: {
      title: 'Interview Tracing Challenge 1: Post-Increment in Condition',
      problemStatement: 'Interviewers love placing increment operators inside loop conditions. Trace the exact printed output of the following Java snippet without running it:',
      code: `int x = 2;
do {
    System.out.print(x + " ");
    x += 3;
} while (x++ < 8);
System.out.println("End: " + x);`,
      options: [
        '2 5 End: 6',
        '2 5 End: 9',
        '2 5 8 End: 9',
        '2 5 End: 10'
      ],
      correctOptionIndex: 3,
      hint: 'Remember that "x++ < 8" tests the current value of x against 8, and THEN increments x immediately afterward, regardless of whether the condition was true or false!',
      solution: '2 5 End: 10',
      explanation: `Step-by-step trace:
Iteration 1:
- Print "2 "
- x becomes 2 + 3 = 5
- Check condition: (x++ < 8) -> evaluates (5 < 8) which is TRUE, then x increments to 6!
Iteration 2:
- Print "5 "
- x becomes 6 + 3 = 9
- Check condition: (x++ < 8) -> evaluates (9 < 8) which is FALSE, then x increments to 10!
Loop terminates!
- Final print: "End: 10".`
    },
    practiceProblems: [
      {
        title: 'Interview Tracing Challenge 1: Post-Increment in Condition',
        problemStatement: 'Interviewers love placing increment operators inside loop conditions. Trace the exact printed output of the following Java snippet without running it:',
        code: `int x = 2;
do {
    System.out.print(x + " ");
    x += 3;
} while (x++ < 8);
System.out.println("End: " + x);`,
        options: [
          '2 5 End: 6',
          '2 5 End: 9',
          '2 5 8 End: 9',
          '2 5 End: 10'
        ],
        correctOptionIndex: 3,
        hint: 'Remember that "x++ < 8" tests the current value of x against 8, and THEN increments x immediately afterward!',
        solution: '2 5 End: 10',
        explanation: 'Iteration 1: prints 2, x becomes 5, (5<8) is true, x increments to 6. Iteration 2: prints 5, x becomes 9, (9<8) is false, x increments to 10. Output: "2 5 End: 10".'
      },
      {
        title: 'Interview Tracing Challenge 2: Pre-Increment vs Post-Increment in Body',
        problemStatement: 'What does this code snippet print to the console?',
        code: `int num = 1;
do {
    System.out.print(++num + " ");
} while (num++ < 4);`,
        options: [
          '2 4 6',
          '2 4',
          '1 2 3 4',
          '2 3 4'
        ],
        correctOptionIndex: 1,
        hint: 'Notice ++num in the body happens BEFORE print, and num++ in the condition happens AFTER test!',
        solution: '2 4',
        explanation: `Step-by-step trace:
Iteration 1:
- ++num increments num from 1 to 2. Prints "2 ".
- Condition check: (num++ < 4) tests (2 < 4) which is TRUE, then num increments to 3.
Iteration 2:
- ++num increments num from 3 to 4. Prints "4 ".
- Condition check: (num++ < 4) tests (4 < 4) which is FALSE, then num increments to 5.
Loop ends! Final output: "2 4 ".`
      },
      {
        title: 'Interview Tracing Challenge 3: Scope Compilation Trap',
        problemStatement: 'Will the following code compile or throw an error?',
        code: `do {
    int val = 10;
    System.out.println(val);
    val--;
} while (val > 0);`,
        options: [
          'Prints 10 down to 1',
          'Compilation Error: cannot find symbol variable val',
          'Prints 10 and stops',
          'Infinite Loop'
        ],
        correctOptionIndex: 1,
        hint: 'Look closely at where "val" is declared. Can the while condition outside the braces see variables declared inside?',
        solution: 'Compilation Error: cannot find symbol variable val',
        explanation: 'Because "val" is declared inside the curly braces of the do block, its scope is limited to that block. The while condition is outside the block and cannot resolve the symbol "val".'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Omitting the semicolon at the end of while: do { ... } while (cond) // Missing ;',
        whyItHappens: 'Regular while loops don\'t have a semicolon after parentheses.',
        howToFix: 'Remember: do-while ALWAYS ends with a semicolon after while (...);'
      },
      {
        mistake: 'Accidentally creating an infinite loop by re-declaring variables inside the do block.',
        whyItHappens: 'Variables declared inside "do { ... }" cannot be seen by "while(cond);" because of block scope.',
        howToFix: 'Declare loop counter variables OUTSIDE the do-while block.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Under what specific condition will a while loop and a do-while loop behave differently?',
        answer: 'When the loop condition is false on the very first evaluation. A while loop will execute 0 times, whereas a do-while loop will execute exactly 1 time.',
        followUp: 'Can a do-while loop ever execute 0 times?',
        keyPhrases: ['Initial condition false', 'while executes 0 times', 'do-while executes at least once', 'Cannot execute 0 times'],
        commonMistakeAnswer: 'Saying they always behave identically except for syntax. The core difference is the guaranteed 1st run on false conditions.'
      },
      {
        question: 'Why does Java require a semicolon at the end of a do-while statement?',
        answer: 'Because without the semicolon, the compiler cannot distinguish where the do-while statement ends and where a subsequent, independent while statement begins.',
        followUp: 'What happens if you accidentally put a semicolon after a regular while loop header?',
        keyPhrases: ['Grammar ambiguity', 'Separates from next statement', 'Syntax requirement'],
        commonMistakeAnswer: 'Thinking it is just an arbitrary rule. It resolves grammar ambiguity with standard while loops.'
      },
      {
        question: 'Give a real-world scenario where you would choose do-while over while in production.',
        answer: 'Any scenario where user input or an action must precede verification. Classic examples include: 1) ATM pin prompts (prompt PIN at least once, repeat if invalid); 2) Interactive console menus; 3) Network retry with initial attempt before backoff.',
        followUp: 'How would you write an ATM menu with do-while?',
        keyPhrases: ['User input prompt', 'Validation happens after input', 'ATM PIN entry', 'Retry network request']
      },
      {
        question: 'Can a do-while loop result in an infinite loop? Give an example.',
        answer: 'Yes, if the condition inside while(...) never evaluates to false (e.g. while(true); or forgetting to update the loop counter variable), it will loop forever.',
        followUp: 'How do you break out of an infinite do-while loop from inside?',
        keyPhrases: ['while(true)', 'Loop counter not updated', 'Use break keyword']
      },
      {
        question: 'What is the exact output of: int i = 0; do { System.out.print(i + " "); } while (i != 0);',
        answer: 'It prints "0 ". The body executes once, printing 0. Then (0 != 0) evaluates to false, terminating the loop after exactly one execution.',
        followUp: 'What would a while loop with the same condition print?',
        keyPhrases: ['Prints 0', '0 != 0 is false', 'Executes exactly once']
      }
    ],
    miniQuiz: [
      {
        question: 'How many times will "int i = 5; do { i++; } while (i < 5);" execute?',
        options: ['0 times', '1 time', '5 times', 'Infinite loop'],
        correctIndex: 1,
        explanation: 'do-while executes the body first (i becomes 6). Then (6 < 5) evaluates to false. So it runs exactly 1 time.'
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
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of the clock on your wall. The minute hand (outer loop) ticks once every 60 seconds. But for every single tick of the minute hand, the second hand (inner loop) must complete a full cycle of 60 seconds from 1 to 60. The inner loop moves fast; the outer loop moves slowly.',
    interviewTakeaways: [
      'Multiplicative Iterations: For every 1 run of the outer loop, the inner loop executes completely. Total iterations = Outer iterations * Inner iterations.',
      'Time Complexity: Two nested loops of size N yield O(N^2) quadratic time complexity.',
      'Row vs Column Convention: Outer loop traditionally controls the Row (vertical), inner loop controls the Column (horizontal).'
    ],
    cheatSheet: {
      summary: 'A loop inside another loop is a nested loop. Essential for matrices, 2D grids, and pattern printing algorithms.',
      syntaxTemplate: `for (int row = 1; row <= rows; row++) {      // Outer controls rows
    for (int col = 1; col <= cols; col++) {  // Inner controls columns
        System.out.print("* ");
    }
    System.out.println(); // Newline after row completes
}`,
      rules: [
        { rule: 'Independent Variable Names', explanation: 'Inner loop must use a DIFFERENT counter variable (e.g. i and j), or variable shadowing error occurs.' },
        { rule: 'Inner Loop Reset', explanation: 'The inner loop variable resets to its initial value on EVERY outer iteration.' },
        { rule: 'Print vs Println', explanation: 'Use System.out.print() for same-line items; use println() only after inner loop finishes a row.' }
      ],
      quickComparison: [
        { aspect: 'Outer Loop', optionA: 'Slow mover', optionB: 'Controls rows, y-axis, major passes' },
        { aspect: 'Inner Loop', optionA: 'Fast mover', optionB: 'Controls columns, x-axis, comparisons per pass' }
      ]
    },
    coreExplanation: [
      'A loop inside another loop is called a Nested Loop.',
      'For EVERY single iteration of the outer loop, the inner loop executes completely from start to finish.',
      'Total iterations = Outer loop iterations * Inner loop iterations.',
      'If outer runs N times and inner runs M times, overall time complexity is O(N * M).',
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
    codeExamples: [
      {
        title: 'Example 1: Multiplication Table Grid',
        description: 'Generating a 3x3 mathematical product grid using nested loops.',
        code: `public class MultiTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                System.out.printf("%4d", (i * j));
            }
            System.out.println();
        }
    }
}`,
        output: `   1   2   3
   2   4   6
   3   6   9`
      },
      {
        title: 'Example 2: Inverted Number Triangle',
        description: 'Decreasing inner loop upper bound based on outer counter.',
        code: `public class InvertedTriangle {
    public static void main(String[] args) {
        int n = 4;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `1 2 3 4 
1 2 3 
1 2 
1 `
      }
    ],
    practiceProblems: [
      {
        title: 'Interview Tracing Challenge 1: Counting Inner Iterations',
        problemStatement: 'How many total times does count++ execute in this snippet?',
        code: `int count = 0;
for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        count++;
    }
}
System.out.println(count);`,
        options: ['16', '10', '8', '12'],
        correctOptionIndex: 1,
        hint: 'When i=1: 1 time. When i=2: 2 times. When i=3: 3 times. When i=4: 4 times. Sum: 1 + 2 + 3 + 4!',
        solution: '10',
        explanation: 'In each outer pass, the inner loop runs i times. Total iterations = 1 + 2 + 3 + 4 = 10.'
      },
      {
        title: 'Interview Tracing Challenge 2: Break Inside Nested Loop',
        problemStatement: 'What is the output of this code?',
        code: `for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) break;
        System.out.print(i + "" + j + " ");
    }
}`,
        options: ['11 21 ', '11 12 21 22 ', '11 ', '11 13 21 23 '],
        correctOptionIndex: 0,
        hint: 'break without a label exits only the inner loop for j, NOT the outer loop for i!',
        solution: '11 21 ',
        explanation: 'When i=1: j=1 prints 11; j=2 triggers break (exits j loop). Next outer iteration i=2: j=1 prints 21; j=2 triggers break (exits j loop). Final output: "11 21 ".'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using "System.out.println("* ")" inside the inner loop instead of "print()".',
        whyItHappens: 'println adds a newline after every single star, printing a single vertical line of stars instead of a triangle.',
        howToFix: 'Use System.out.print() for elements on the same row; use System.out.println() only at the end of the outer loop.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the time complexity of two nested loops where outer runs N times and inner runs N times?',
        answer: 'O(N^2) quadratic time complexity. For each of the N iterations of the outer loop, the inner loop performs N iterations, resulting in N * N = N^2 total operations.',
        followUp: 'What if the inner loop runs i times (from 1 to N)?',
        keyPhrases: ['O(N^2) quadratic time', 'N * (N + 1) / 2 iterations', 'Still O(N^2) complexity']
      },
      {
        question: 'How do you break out of an outer loop from inside a deeply nested inner loop in Java?',
        answer: 'By using a Labeled Break. You place a label (e.g. outerLoop:) before the outer loop header, and call "break outerLoop;" from inside the inner loop.',
        followUp: 'What is the disadvantage of excessive nested loops in production code?',
        keyPhrases: ['Labeled break', 'Labels identify target loop', 'Performance degradation', 'Code readability drops']
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
