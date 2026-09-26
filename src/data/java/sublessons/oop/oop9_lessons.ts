import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 9: OOP FUNDAMENTALS - 8 MODULAR BITE-SIZED LESSONS
// Thoughtfully decomposed for college freshers:
// - 1 single clear focus per lesson (5-8 min each)
// - Relatable kid-level real-world analogies
// - Distraction-free, continuous reading flow
// - Focused tracing puzzles, interview Q&As, and quizzes
// ============================================================

export const oop9Lessons: Record<string, DetailedLesson> = {
  "why-oop-fundamentals": {
    "id": "why-oop-fundamentals",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.1",
    "title": "Why OOP? (Procedural Chaos vs Clean Classes)",
    "subtitle": "Understanding the shift from loose variables and fragile parallel arrays to self-contained, protective Object-Oriented classes",
    "estimatedMinutes": 6,
    "beginnerAnalogy": "Imagine baking in a messy kitchen where all ingredients are poured loose on the counter.\n\nYour sugar is mixed with flour, milk is pooling by the edge, and vanilla extract is spilled everywhere. If you bump the counter, everything is ruined! That was **procedural programming**: loose variables (`studentName`, `studentAge`, `studentGpa`) floating disconnected in memory.\n\nNow imagine organized kitchen canisters with tight lids: one canister labeled 'Sugar Jar', another labeled 'Flour Jar'. Each canister holds its own ingredients safely inside. That is **Object-Oriented Programming (OOP)**: grouping related data and tools into self-contained, protective packages called Classes.",
    "coreExplanation": [
      "**The Procedural Problem**: In early programming, we stored data in loose variables: `String name1`, `int roll1`, `double gpa1`, `String name2`... If you had 50 students, you had to manage 150 separate variables!",
      "**The Parallel Array Trap**: To solve loose variables, programmers tried parallel arrays: `String[] names`, `int[] rolls`, `double[] gpas`. But if you sorted the GPA array to find top ranks and forgot to swap the names array in the exact same way, Alice ended up with Bob's grades! Data corruption was everywhere.",
      "**The OOP Solution**: Instead of separate arrays for names and grades, OOP lets you create a brand-new custom type: `class Student { String name; int roll; double gpa; }`. Now a student's name and grades are permanently bound together.",
      "**Real-World Modeling**: Real life does not consist of disconnected floats and strings; it consists of entities like `Car`, `BankAccount`, and `Customer`. OOP allows your software to mirror the real world naturally.",
      "**The 4 Pillars of OOP**: Bundling data is just the start. OOP gives us four powerful superpowers: **Encapsulation** (data protection), **Inheritance** (reusability), **Polymorphism** (flexibility), and **Abstraction** (simplicity)."
    ],
    "codeSnippet": {
      "title": "The Parallel Array Disaster vs. The Clean OOP Fix",
      "code": "// THE OLD WAY (Procedural with parallel arrays - Fragile!):\n// String[] names = {\"Alice\", \"Bob\"};\n// double[] gpa = {3.9, 2.5};\n// If someone sorts gpa without sorting names, Alice gets Bob's GPA!\n\n// THE OOP WAY (Data bundled safely together):\nclass Student {\n    String name;\n    int rollNo;\n    double gpa;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Clean, safe student record\n        Student s1 = new Student();\n        s1.name = \"Alice\";\n        s1.rollNo = 101;\n        s1.gpa = 3.9;\n\n        System.out.println(s1.name + \" (Roll: \" + s1.rollNo + \") has GPA: \" + s1.gpa);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 7-11",
          "explanation": "We define a single 'Student' class that bundles name, rollNo, and gpa into one unified record."
        },
        {
          "line": "Line 16",
          "explanation": "'new Student()' creates an actual student record in memory."
        },
        {
          "line": "Lines 17-19",
          "explanation": "We set Alice's specific details. Her name and GPA can never be accidentally separated!"
        },
        {
          "line": "Line 21",
          "explanation": "We access all related data through the single student reference 's1'."
        }
      ],
      "output": "Alice (Roll: 101) has GPA: 3.9"
    },
    "codeExamples": [
      {
        "title": "Example 1: Bundling Bank Account Data and Operations",
        "description": "Notice how a BankAccount class holds both balance data and the deposit operation in one place.",
        "code": "class BankAccount {\n    String owner;\n    double balance;\n\n    void deposit(double amount) {\n        balance += amount;\n        System.out.println(\"Deposited $\" + amount + \". New balance: $\" + balance);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount myAcc = new BankAccount();\n        myAcc.owner = \"Sarah\";\n        myAcc.balance = 100.0;\n        myAcc.deposit(50.0);\n    }\n}",
        "output": "Deposited $50.0. New balance: $150.0"
      },
      {
        "title": "Example 2: Managing Multiple Independent Entities",
        "description": "Each student is their own independent record, preventing accidental data mixing.",
        "code": "class Book {\n    String title;\n    double price;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b1 = new Book();\n        b1.title = \"Java Basics\";\n        b1.price = 29.99;\n\n        Book b2 = new Book();\n        b2.title = \"Data Structures\";\n        b2.price = 45.00;\n\n        System.out.println(b1.title + \": $\" + b1.price);\n        System.out.println(b2.title + \": $\" + b2.price);\n    }\n}",
        "output": "Java Basics: $29.99\nData Structures: $45.0"
      }
    ],
    "interviewTakeaways": [
      "Procedural vs OOP: Procedural programming focuses on functions and raw data passing; OOP focuses on self-contained objects holding state and behavior.",
      "Solves Data Desynchronization: Eliminates parallel arrays where swapping or sorting one array corrupts associations in other arrays.",
      "Real-World Parity: Classes model real-world business concepts (Customers, Orders, Invoices) naturally.",
      "Foundation for 4 Pillars: Serves as the bedrock for Encapsulation, Inheritance, Polymorphism, and Abstraction."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Why Parallel Arrays Fail",
        "problemStatement": "What potential bug arises when using parallel arrays `String[] names` and `int[] ages` in procedural code?",
        "options": [
          "Sorting or reordering one array without identically reordering the other desynchronizes the data",
          "Java throws an ArrayParallelException at runtime",
          "Arrays cannot hold more than 10 elements",
          "Strings cannot be placed in arrays alongside numbers"
        ],
        "correctOptionIndex": 0,
        "hint": "What happens if Alice is at index 0 and her age is at index 0, but names is sorted alphabetically?",
        "solution": "If one array is sorted or shifted without updating the other, index associations break and Alice ends up with someone else's age.",
        "explanation": "Parallel arrays rely on fragile index synchrony. OOP solves this by binding the name and age into a single Student object."
      },
      {
        "title": "Puzzle 2: The Core Essence of OOP",
        "problemStatement": "Which of the following best summarizes the primary goal of Object-Oriented Programming?",
        "options": [
          "To bundle related data (state) and methods (behavior) together into reusable units",
          "To make programs run 100 times faster than C code",
          "To eliminate all if-else conditions from software",
          "To store all variables in permanent hard disk storage"
        ],
        "correctOptionIndex": 0,
        "hint": "Think about what a Class bundles together.",
        "solution": "Bundling related state (fields) and behavior (methods) into an entity.",
        "explanation": "OOP creates cohesion and encapsulation by grouping related attributes and operations into a single cohesive unit (Class)."
      },
      {
        "title": "Puzzle 3: Identifying State vs. Behavior",
        "problemStatement": "In a `Car` class, which of the following represents 'Behavior' rather than 'State'?",
        "options": [
          "brake()",
          "color",
          "fuelLevel",
          "speed"
        ],
        "correctOptionIndex": 0,
        "hint": "State is what an object HAS (nouns/adjectives). Behavior is what an object DOES (verbs).",
        "solution": "brake() is an action (behavior), while color, fuelLevel, and speed are attributes (state).",
        "explanation": "Methods define behavior (what an object does). Variables define state (what an object holds)."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What problem does Object-Oriented Programming solve that procedural programming struggled with?",
        "answer": "In procedural programming, data and logic are separated. Data is stored in loose variables or parallel arrays, and functions operate globally on them. As applications grow, tracking which functions mutate which variables becomes impossible, and modifying data in one place can cause unexpected ripple-effect bugs across the entire system. OOP solves this by binding data (state) and the functions that manipulate it (behavior) into self-contained, protective units called Classes.",
        "followUp": "What is the difference between state and behavior in OOP?",
        "followUpAnswer": "State represents the data or properties an object currently holds (e.g., a car's color, speed, fuelLevel). Behavior represents the actions or operations the object can perform (e.g., accelerate(), brake(), honkHorn()).",
        "keyPhrases": [
          "Binds state and behavior together",
          "Eliminates fragile parallel arrays",
          "Prevents unintended side effects",
          "Encapsulation and modularity"
        ],
        "commonMistakeAnswer": "Saying OOP is only used to make code execute faster on multi-core processors."
      },
      {
        "question": "What are the 4 fundamental pillars of Object-Oriented Programming?",
        "answer": "1. **Encapsulation**: Bundling fields and methods into a class and restricting direct access to internal state using access modifiers.\n2. **Inheritance**: Allowing a child class to inherit fields and methods from a parent class for code reuse.\n3. **Polymorphism**: The ability of an object or method to take on multiple forms (overloading and dynamic overriding).\n4. **Abstraction**: Hiding internal complexity and exposing only a clean, simple interface to the outside world.",
        "followUp": "Which pillar does a basic class definition directly implement first?",
        "followUpAnswer": "Encapsulation! By combining state fields and methods into a single class boundary, you encapsulate related logic into one unit.",
        "keyPhrases": [
          "Encapsulation (data hiding)",
          "Inheritance (code reusability)",
          "Polymorphism (many forms)",
          "Abstraction (hiding complexity)"
        ],
        "commonMistakeAnswer": "Listing Java language features like Garbage Collection or JVM as OOP pillars."
      },
      {
        "question": "Is Java a 100% pure Object-Oriented programming language? Why or why not?",
        "answer": "No, Java is NOT a pure Object-Oriented language. A purely object-oriented language (like Smalltalk) treats EVERYTHING as an object. Java retains 8 primitive data types (`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`) for raw CPU performance, which are stored as raw bits rather than heap objects. Additionally, static members belong to classes rather than instances.",
        "followUp": "How did Java bridge the gap between primitives and objects in Java 5?",
        "followUpAnswer": "Java introduced Wrapper classes (like Integer, Double) along with Autoboxing and Unboxing to seamlessly convert between primitives and objects.",
        "keyPhrases": [
          "Not pure OOP due to 8 primitive types",
          "Primitives stored as raw values, not objects",
          "Performance optimization for CPU efficiency",
          "Wrapper classes bridge the gap"
        ],
        "commonMistakeAnswer": "Claiming Java is 100% pure OOP because 'everything is inside a class'."
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the primary flaw of using parallel arrays for related data in procedural code?",
        "options": [
          "They easily desynchronize if one array is modified or sorted without the others",
          "They consume 100x more RAM than classes",
          "They cannot store strings",
          "Java does not permit more than one array in a program"
        ],
        "correctIndex": 0,
        "explanation": "Parallel arrays rely on fragile index alignment. Sorting or altering one array without updating the others immediately corrupts the data."
      },
      {
        "question": "In Object-Oriented Programming, what does an object's 'State' represent?",
        "options": [
          "The variables and data values stored inside the object",
          "The methods and functions the object can run",
          "The physical country where the server is located",
          "Whether the program has compiled or not"
        ],
        "correctIndex": 0,
        "explanation": "State represents the attributes or field values stored in the object at any given moment."
      },
      {
        "question": "Which of the following is NOT one of the 4 core pillars of OOP?",
        "options": [
          "Compilation",
          "Encapsulation",
          "Inheritance",
          "Polymorphism"
        ],
        "correctIndex": 0,
        "explanation": "The 4 pillars are Encapsulation, Inheritance, Polymorphism, and Abstraction. Compilation is a build process."
      },
      {
        "question": "Why is Java not considered a 100% pure Object-Oriented language?",
        "options": [
          "It supports 8 primitive types (like int, boolean) that are not objects",
          "It lacks support for classes",
          "It does not support method overriding",
          "It requires a C compiler to run"
        ],
        "correctIndex": 0,
        "explanation": "Java supports primitive types for CPU performance, meaning not every value in Java is an Object."
      },
      {
        "question": "What is the main benefit of bundling state and behavior together into a class?",
        "options": [
          "High cohesion, modularity, and protection from unintended external corruption",
          "Eliminating the need to write tests",
          "Guaranteeing zero memory usage",
          "Allowing variables to be accessed from any file without restrictions"
        ],
        "correctIndex": 0,
        "explanation": "Grouping related data with the methods that operate on it makes code modular, understandable, and protective against bugs."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Using parallel arrays instead of an OOP class to store related fields",
        "whyItHappens": "Beginners coming from procedural programming think separate arrays for names, ages, and grades are simpler.",
        "howToFix": "Create a class (e.g. Student) that bundles all fields together into a single cohesive unit."
      },
      {
        "mistake": "Thinking that writing a class definition allocates RAM for data",
        "whyItHappens": "Confusing the blueprint with the actual object.",
        "howToFix": "Remember that a class definition lives in Metaspace and takes 0 bytes for object data until 'new' is called."
      }
    ]
  },
  "what-is-a-class": {
    "id": "what-is-a-class",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.2",
    "title": "What is a Class? (The Blueprint)",
    "subtitle": "Understanding class declarations, state fields, behavior methods, and why a class occupies 0 bytes of heap memory on its own",
    "estimatedMinutes": 6,
    "beginnerAnalogy": "Think of an architectural blueprint for a modern house drawn on paper by an architect.\n\nCan you sleep inside the blueprint? Can you turn on the water faucet on the paper? Of course not! The blueprint itself is NOT a house. It occupies virtually zero physical space on a plot of land. It simply defines: 'Every house built from this drawing will have 3 bedrooms, 2 bathrooms, and a front door.'\n\nIn Java, a **Class** is that architectural blueprint. It defines what variables every future object will hold and what actions it will perform, but the class itself holds no object data and takes zero heap space!",
    "coreExplanation": [
      "**A Class is a Blueprint**: A class is a programmer-defined data type that acts as a structural pattern. It defines what attributes (fields) and actions (methods) its objects will possess.",
      "**Classes Take Zero Heap Memory**: Declaring `class Car { String model; int speed; }` does NOT create a car in RAM! The JVM only stores the class definition bytecode in Metaspace. No heap bytes are used until you create an object.",
      "**Anatomy of a Class**: A class contains two primary members: **Fields / Instance Variables** (the data it stores) and **Methods** (the operations it can perform).",
      "**The Class Declaration Syntax**: In Java, classes are declared using the `class` keyword: `public class Student { ... }`. By universal Java convention, class names start with a capital letter (PascalCase like `BankAccount` or `CustomerOrder`).",
      "**The File Naming Rule**: If a class is declared `public`, it MUST be saved in a file with the exact same name plus `.java` (e.g. `public class Student` must be saved in `Student.java`)."
    ],
    "codeSnippet": {
      "title": "Declaring a Clean Java Class Blueprint",
      "code": "// Blueprint: Defines what every Car will have and do\nclass Car {\n    // 1. State (Instance Variables / Attributes)\n    String brand;\n    String color;\n    int speed;\n\n    // 2. Behavior (Methods / Actions)\n    void accelerate(int mph) {\n        speed += mph;\n        System.out.println(brand + \" accelerated to \" + speed + \" mph.\");\n    }\n\n    void brake() {\n        speed = 0;\n        System.out.println(brand + \" has stopped.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"The Car class blueprint is compiled and ready!\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Line 2",
          "explanation": "'class Car' declares the blueprint name using PascalCase."
        },
        {
          "line": "Lines 4-6",
          "explanation": "Three instance variables: brand, color, speed. Every car made from this blueprint will possess these 3 properties."
        },
        {
          "line": "Lines 9-12",
          "explanation": "'accelerate(int mph)' defines an action that updates the car's speed and displays a message."
        },
        {
          "line": "Lines 14-17",
          "explanation": "'brake()' defines an action that resets the speed to 0."
        }
      ],
      "output": "The Car class blueprint is compiled and ready!"
    },
    "codeExamples": [
      {
        "title": "Example 1: A Student Record Blueprint",
        "description": "Notice how the Student blueprint defines fields for identity and a method to print a report card.",
        "code": "class Student {\n    String name;\n    int rollNo;\n    double score;\n\n    void printReport() {\n        System.out.println(\"Student: \" + name + \" | Roll: \" + rollNo + \" | Score: \" + score);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Student blueprint loaded successfully.\");\n    }\n}",
        "output": "Student blueprint loaded successfully."
      },
      {
        "title": "Example 2: A Rectangle Blueprint with Calculations",
        "description": "Methods inside a class can perform calculations using the class's own fields.",
        "code": "class Rectangle {\n    double length;\n    double width;\n\n    double calculateArea() {\n        return length * width;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Rectangle blueprint defined.\");\n    }\n}",
        "output": "Rectangle blueprint defined."
      }
    ],
    "interviewTakeaways": [
      "Blueprint Definition: A class is a template or schema; it takes zero heap space for data until instantiated.",
      "State + Behavior: Composed of fields (attributes) and methods (operations).",
      "PascalCase Convention: Always name classes with leading capitals (`Student`, `BankAccount`).",
      "One Public Class per File: If declared public, the file name must match the class name exactly."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Does a Class Declaration Allocate Heap RAM?",
        "problemStatement": "Does writing `class Laptop { String brand; int ram; }` allocate heap memory for a laptop?",
        "options": [
          "No, a class declaration only defines the blueprint; no heap memory is allocated until 'new' is called",
          "Yes, it automatically allocates memory for 1 default laptop",
          "Yes, it reserves 1 GB of heap memory",
          "Only if the class is marked public"
        ],
        "correctOptionIndex": 0,
        "hint": "Does an architectural drawing on paper create concrete walls on a plot of land?",
        "solution": "No. A class is only a blueprint. Memory on the Heap is only allocated when 'new Laptop()' is executed.",
        "explanation": "The JVM loads class bytecode into Metaspace. Real object data is never allocated on the Heap until runtime instantiation via the 'new' keyword."
      },
      {
        "title": "Puzzle 2: Java Class Naming Convention",
        "problemStatement": "According to official Java conventions, which of the following is the proper name for a class representing a bank account?",
        "options": [
          "BankAccount",
          "bankAccount",
          "bank_account",
          "BANK_ACCOUNT"
        ],
        "correctOptionIndex": 0,
        "hint": "Classes use PascalCase (UpperCamelCase).",
        "solution": "BankAccount",
        "explanation": "In Java, classes and interfaces use PascalCase (e.g. `BankAccount`, `StringTokenizer`). camelCase is for methods/variables, ALL_CAPS is for constants."
      },
      {
        "title": "Puzzle 3: The Public Class Filename Rule",
        "problemStatement": "If a file contains `public class FlightTicket { ... }`, what MUST the source file be named?",
        "options": [
          "FlightTicket.java",
          "flightticket.java",
          "Ticket.java",
          "Any name is acceptable as long as it ends in .java"
        ],
        "correctOptionIndex": 0,
        "hint": "Java requires exact case-sensitive matching for public classes.",
        "solution": "FlightTicket.java",
        "explanation": "Java compilers mandate that a public top-level class must match its source filename exactly, including casing."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is a Class in Java, and how does it differ from an Object?",
        "answer": "A Class is a compile-time blueprint or structural template that defines the state (fields) and behavior (methods) that its instances will have. It occupies zero heap memory for data. In contrast, an Object is a concrete, runtime instance carved into Heap memory created using the 'new' keyword. You can think of a class as a cookie cutter, and objects as the actual cookies baked from it.",
        "followUp": "Where is the class itself stored in memory when loaded by the JVM?",
        "followUpAnswer": "The class definition bytecode and metadata are stored in Metaspace (native memory, replacing PermGen in Java 8+).",
        "keyPhrases": [
          "Class = compile-time blueprint",
          "Object = runtime heap instance",
          "Class stored in Metaspace",
          "Takes zero heap memory until 'new'"
        ],
        "commonMistakeAnswer": "Thinking declaring a class automatically creates one instance in Heap memory."
      },
      {
        "question": "Can a single Java source file contain multiple classes?",
        "answer": "Yes, a single `.java` file can contain multiple classes, but with one strict rule: there can be AT MOST ONE `public` class per file, and that public class's name must match the filename exactly. The other classes in the file must have package-private (default) access.",
        "followUp": "When the compiler compiles a file with 3 classes, how many .class files are produced?",
        "followUpAnswer": "The Java compiler (`javac`) produces a separate `.class` file for EVERY class defined (3 `.class` files)."
      },
      {
        "question": "What components make up the anatomy of a standard Java class?",
        "answer": "A standard Java class can contain: 1) Instance variables (fields) representing state, 2) Methods representing behavior, 3) Constructors for initializing new instances, 4) Static variables and static methods belonging to the class itself, and 5) Initializer blocks (static and instance).",
        "followUp": "Is it mandatory for a class to have methods?",
        "followUpAnswer": "No! A class can contain only fields (like a pure data container or DTO), or only methods (like a utility class), or even be empty."
      }
    ],
    "miniQuiz": [
      {
        "question": "What does a Class in Java define?",
        "options": [
          "The blueprint for attributes (state) and methods (behavior) of its future instances",
          "The physical RAM address on the computer motherboard",
          "The compile time in seconds",
          "The speed of the internet connection"
        ],
        "correctIndex": 0,
        "explanation": "A class defines the structure and operations that all instances created from it will possess."
      },
      {
        "question": "How much Heap memory does a class declaration take before any object is created?",
        "options": [
          "0 bytes of Heap memory",
          "4 bytes per field",
          "1024 bytes minimum",
          "1 MB"
        ],
        "correctIndex": 0,
        "explanation": "Class definitions reside in Metaspace. No Heap memory is allocated until an object is created with 'new'."
      },
      {
        "question": "Which naming convention is standard for Java class names?",
        "options": [
          "PascalCase (e.g., BankAccount)",
          "camelCase (e.g., bankAccount)",
          "snake_case (e.g., bank_account)",
          "kebab-case (e.g., bank-account)"
        ],
        "correctIndex": 0,
        "explanation": "Standard Java naming conventions dictate PascalCase (capitalized words) for class names."
      },
      {
        "question": "If a file contains 'public class Order { ... }', what must the file be named?",
        "options": [
          "Order.java",
          "order.java",
          "Orders.java",
          "Main.java"
        ],
        "correctIndex": 0,
        "explanation": "The file name must match the public class name exactly, including letter casing: Order.java."
      },
      {
        "question": "Can you define methods inside a Java class?",
        "options": [
          "Yes, methods define the behavior or actions that objects of the class can perform",
          "No, methods can only be written in interfaces",
          "Only if the method has no parameters",
          "Only if the class has no variables"
        ],
        "correctIndex": 0,
        "explanation": "Methods inside a class define the operations and actions that instances of that class can execute."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Trying to access non-static fields directly using the class name (e.g. Student.name)",
        "whyItHappens": "Forgetting that a blueprint doesn't possess specific student data.",
        "howToFix": "Instantiate an object with 'new Student()' first, then access the field on that object reference."
      },
      {
        "mistake": "Naming classes in camelCase or lowercase instead of PascalCase",
        "whyItHappens": "Not following standard Java conventions.",
        "howToFix": "Always use PascalCase for class names (e.g. BankAccount, OrderManager)."
      }
    ]
  },
  "creating-objects-with-new": {
    "id": "creating-objects-with-new",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.3",
    "title": "Creating Objects with 'new'",
    "subtitle": "Stamping concrete instances onto the JVM Heap, reading and writing fields with the dot operator, and independent object state",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "Think of baking sugar cookies.\n\nYour cookie cutter is the Class (the blueprint). But you can't eat a cookie cutter! To get something real, you press the cutter into dough and bake it. That freshly baked, warm cookie is the **Object**.\n\nFrom that one single cookie cutter, you can bake 100 cookies. If you put chocolate sprinkles on Cookie #1, does Cookie #2 magically get chocolate sprinkles? No! Each cookie is completely independent. In Java, writing `new Car()` bakes a brand-new, independent car on the Heap!",
    "coreExplanation": [
      "**What is an Object?**: An object is a dynamic, concrete instance of a class materialized at runtime in the JVM Heap memory.",
      "**The 'new' Keyword**: When you write `new Student()`, Java calculates how many bytes the object requires, carves out that space on the Heap, initializes all fields to default values, and returns the memory address.",
      "**The Dot Operator (`.`)**: Once an object is created, you use the dot operator to access its state and behavior: `myStudent.name = \"Alice\";` or `myStudent.study();`.",
      "**Every Object is an Independent Island**: When you create `Student s1 = new Student();` and `Student s2 = new Student();`, Java creates two completely distinct islands in Heap memory. Modifying `s1.name` will NEVER alter `s2.name`.",
      "**Instantiation vs Declaration**: Writing `Student s1;` only declares a reference variable (which holds nothing yet). Writing `s1 = new Student();` is what actually instantiates the object."
    ],
    "codeSnippet": {
      "title": "Creating Independent Objects with 'new'",
      "code": "class Dog {\n    String name;\n    int age;\n\n    void bark() {\n        System.out.println(name + \" says: Woof! Woof!\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 1. Create first Dog object\n        Dog dog1 = new Dog();\n        dog1.name = \"Buddy\";\n        dog1.age = 3;\n\n        // 2. Create second independent Dog object\n        Dog dog2 = new Dog();\n        dog2.name = \"Max\";\n        dog2.age = 5;\n\n        // 3. Test independence\n        dog1.bark();\n        dog2.bark();\n\n        System.out.println(dog1.name + \" is \" + dog1.age + \" years old.\");\n        System.out.println(dog2.name + \" is \" + dog2.age + \" years old.\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Line 12",
          "explanation": "'new Dog()' allocates a brand-new Dog object on the Heap. 'dog1' points to it."
        },
        {
          "line": "Lines 13-14",
          "explanation": "Using the dot operator (dog1.name), we set Buddy's private state."
        },
        {
          "line": "Line 17",
          "explanation": "'new Dog()' allocates a SECOND completely separate Dog object for Max."
        },
        {
          "line": "Lines 22-23",
          "explanation": "Calling bark() on dog1 uses dog1's name ('Buddy'), while dog2 uses dog2's name ('Max')."
        }
      ],
      "output": "Buddy says: Woof! Woof!\nMax says: Woof! Woof!\nBuddy is 3 years old.\nMax is 5 years old."
    },
    "codeExamples": [
      {
        "title": "Example 1: State Isolation Between Two Bank Customers",
        "description": "Demonstrating that deposits to customer A never affect customer B.",
        "code": "class Account {\n    String owner;\n    double balance;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Account a1 = new Account();\n        a1.owner = \"Alice\";\n        a1.balance = 500;\n\n        Account a2 = new Account();\n        a2.owner = \"Bob\";\n        a2.balance = 1000;\n\n        // Alice spends $200\n        a1.balance -= 200;\n\n        System.out.println(a1.owner + \" balance: $\" + a1.balance);\n        System.out.println(a2.owner + \" balance: $\" + a2.balance);\n    }\n}",
        "output": "Alice balance: $300.0\nBob balance: $1000.0"
      },
      {
        "title": "Example 2: An Array of Objects",
        "description": "Storing multiple object instances in an array.",
        "code": "class Product {\n    String name;\n    double price;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Product[] cart = new Product[2];\n        cart[0] = new Product();\n        cart[0].name = \"Keyboard\";\n        cart[0].price = 49.99;\n\n        cart[1] = new Product();\n        cart[1].name = \"Mouse\";\n        cart[1].price = 25.00;\n\n        for (Product p : cart) {\n            System.out.println(p.name + \": $\" + p.price);\n        }\n    }\n}",
        "output": "Keyboard: $49.99\nMouse: $25.0"
      }
    ],
    "interviewTakeaways": [
      "Object Instantiation: The 'new' keyword requests memory on the JVM Heap and creates the concrete instance.",
      "The Dot Operator: Used to dereference the object reference to read/write fields or call methods.",
      "Independent State: Each instance has its own private set of instance variables.",
      "Declaration vs Creation: 'Car c;' declares a reference; 'c = new Car();' creates the actual object."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: State Independence",
        "problemStatement": "What is the output of the following code?",
        "code": "class Box {\n    int size = 10;\n}\npublic class Test {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = new Box();\n        b1.size = 25;\n        System.out.println(b1.size + \" \" + b2.size);\n    }\n}",
        "options": [
          "25 10",
          "25 25",
          "10 10",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Does changing b1's size affect b2?",
        "solution": "25 10. b1 and b2 are two distinct objects. Changing b1.size has zero effect on b2.size.",
        "explanation": "Each object created with 'new' has its own copy of instance variables on the Heap."
      },
      {
        "title": "Puzzle 2: Declaration Without Instantiation",
        "problemStatement": "What happens if you run: `Student s; System.out.println(s);` inside a method?",
        "options": [
          "Compile Error: variable s might not have been initialized",
          "Prints null",
          "Prints 0",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "Are local variables on the stack automatically given default values?",
        "solution": "Compile Error! Local variables inside methods must be initialized before use.",
        "explanation": "Local variables on the Call Stack do not receive default values. The compiler stops you from reading uninitialized local variables."
      },
      {
        "title": "Puzzle 3: The Dot Operator Role",
        "problemStatement": "What is the purpose of the dot operator (`.`) in `car.speed = 50;`?",
        "options": [
          "It dereferences the reference variable 'car' to access the 'speed' field of the heap object",
          "It converts car into a string",
          "It stops the program",
          "It creates a new class"
        ],
        "correctOptionIndex": 0,
        "hint": "Think of the dot operator as following the reference pointer to the object in RAM.",
        "solution": "Dereferences the reference variable to access member fields or methods.",
        "explanation": "The dot operator follows the address stored in 'car' into the Heap and targets the 'speed' variable."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What happens in memory when the JVM executes 'new Student()'?",
        "answer": "When the JVM executes 'new Student()': 1) It calculates the total memory required for the object's instance fields, 2) It allocates a contiguous block of bytes on the Heap, 3) It zero-initializes all instance fields to their type defaults (0, false, null), 4) It invokes the constructor to initialize state, and 5) It returns the 64-bit or 32-bit memory address referencing that heap location.",
        "followUp": "Does the reference variable store the object itself or just its address?",
        "followUpAnswer": "It stores only the memory address (reference pointer). The object itself lives on the Heap.",
        "keyPhrases": [
          "Allocates contiguous block on Heap",
          "Zero-initializes instance fields",
          "Executes constructor",
          "Returns heap memory address"
        ],
        "commonMistakeAnswer": "Thinking 'new' puts the object directly onto the thread call stack."
      },
      {
        "question": "What is the difference between an Object and a Reference Variable?",
        "answer": "A Reference Variable is a variable allocated on the thread's Call Stack that holds the memory address of an object. An Object is the actual data entity residing in the JVM Garbage-Collected Heap. You can think of the Reference Variable as a TV remote control, and the Object as the television set itself.",
        "followUp": "Can one object have multiple reference variables pointing to it?",
        "followUpAnswer": "Yes! This is called reference aliasing. Multiple references can store the exact same heap address.",
        "keyPhrases": [
          "Reference = address on Stack",
          "Object = data block on Heap",
          "Remote control vs television set",
          "Multiple references can point to one object"
        ],
        "commonMistakeAnswer": "Believing the reference variable contains the actual object data."
      },
      {
        "question": "Can an object exist in Java without any reference variable pointing to it?",
        "answer": "Yes! An object can exist without a reference variable (e.g. `new Student().study();` or if all references to it are set to null). However, an unreferenced object on the Heap is unreachable and immediately becomes eligible for Garbage Collection.",
        "followUp": "What is an anonymous object in Java?",
        "followUpAnswer": "An object created without assigning it to a reference variable, like 'new Scanner(System.in).nextLine();'. It is used once and discarded.",
        "keyPhrases": [
          "Can exist without reference",
          "Anonymous objects (used once)",
          "Eligible for Garbage Collection when unreachable",
          "Heap object exists independently of references"
        ],
        "commonMistakeAnswer": "Thinking Java forbids creating an object without assigning it to a variable."
      }
    ],
    "miniQuiz": [
      {
        "question": "Where does the 'new' keyword allocate memory for an object?",
        "options": [
          "In the JVM Garbage-Collected Heap",
          "On the thread Call Stack",
          "Inside the CPU cache registers only",
          "In the computer's hard drive"
        ],
        "correctIndex": 0,
        "explanation": "All objects in Java created with 'new' are allocated in the Heap memory."
      },
      {
        "question": "What does a reference variable like 'Student s' actually store?",
        "options": [
          "The memory address pointing to the object on the Heap",
          "The entire bytecode of the class",
          "A copy of all student grades",
          "The user's password"
        ],
        "correctIndex": 0,
        "explanation": "Reference variables store memory addresses (pointers) referencing heap objects."
      },
      {
        "question": "What happens if you modify a field on one object (e.g. `car1.speed = 100`)?",
        "options": [
          "Only car1's speed changes; car2's speed remains completely unaffected",
          "All cars in the program have their speed changed to 100",
          "Java throws an exception",
          "The program restarts"
        ],
        "correctIndex": 0,
        "explanation": "Every object has its own independent instance variables in Heap RAM."
      },
      {
        "question": "Which operator is used to access an object's fields and methods in Java?",
        "options": [
          "The dot operator (.)",
          "The arrow operator (->)",
          "The colon operator (::)",
          "The pound sign (#)"
        ],
        "correctIndex": 0,
        "explanation": "The dot operator (`.`) is the member access / dereference operator in Java."
      },
      {
        "question": "What is an anonymous object in Java?",
        "options": [
          "An object instantiated without assigning its address to a named reference variable",
          "An object with no fields",
          "An object created in private mode",
          "An object that cannot be garbage collected"
        ],
        "correctIndex": 0,
        "explanation": "An anonymous object is created via 'new ClassName()' without storing its reference in a named variable."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Declaring a reference variable without instantiating with 'new' (e.g. Car c; c.drive();)",
        "whyItHappens": "Thinking variable declaration automatically allocates memory.",
        "howToFix": "Always instantiate using 'new': Car c = new Car();"
      },
      {
        "mistake": "Thinking that modifying one object alters other objects stamped from the same class",
        "whyItHappens": "Forgetting that every 'new' creates an independent island in Heap memory.",
        "howToFix": "Recognize that each object has its own dedicated state variables."
      }
    ]
  },
  "references-and-memory": {
    "id": "references-and-memory",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.4",
    "title": "Object References & Memory (Stack vs Heap, Aliasing & Null)",
    "subtitle": "The remote control mental model, stack pointers vs heap payloads, the aliasing trap, default field values, and avoiding NullPointerException",
    "estimatedMinutes": 8,
    "beginnerAnalogy": "Think of a television set and its handheld remote control.\n\nThe **Television** is the actual Object. It is heavy, complex, and sits on the living room table (Heap memory).\n\nThe **Remote Control** is the Reference Variable. It is small, lightweight, and rests in your hand (the Stack). The remote control does NOT contain a glass screen or speakers inside it! It simply holds the wireless signal (memory address) to communicate with the TV.\n\nNow, what happens if you buy a second remote control and program it to the same TV (`Remote r2 = r1;`)? You did NOT magically duplicate the television! You just have two remotes pointing to the exact same TV. If you press 'Volume Up' on remote #2, anyone watching the TV through remote #1 will hear it get louder! That is **Reference Aliasing**.",
    "coreExplanation": [
      "**Stack vs Heap**: Reference variables live on the Call Stack (temporary, holds the memory address). The actual object payload with all its fields lives in the Heap (the shared memory warehouse).",
      "**The Great Aliasing Trap (`s2 = s1`)**: In Java, assigning an object variable to another does NOT clone the object. It only copies the 64-bit memory address. Both variables now point to the identical heap instance.",
      "**Automatic Default Values**: Unlike local variables declared inside a method (which produce compile errors if read before assignment), fields inside a Heap object automatically start with clean defaults: `0` for numbers, `false` for booleans, and `null` for references.",
      "**What is 'null'?**: A reference variable containing `null` is a remote control paired with no TV (address 0x0). It points to nowhere.",
      "**NullPointerException (NPE)**: If you attempt to use the dot operator on a variable holding `null` (like `myCar.drive()`), Java crashes with `NullPointerException` because there is no object on the Heap to receive the command."
    ],
    "codeSnippet": {
      "title": "Stack References, Aliasing and Default Values",
      "code": "class TV {\n    int volume;       // Automatically defaults to 0\n    boolean isOn;     // Automatically defaults to false\n    String brand;     // Automatically defaults to null\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 1. remote1 points to a newly baked TV on the Heap\n        TV remote1 = new TV();\n        System.out.println(\"Default volume: \" + remote1.volume); // Prints 0\n        System.out.println(\"Default isOn: \" + remote1.isOn);     // Prints false\n        System.out.println(\"Default brand: \" + remote1.brand);   // Prints null\n\n        // 2. Set volume via remote1\n        remote1.volume = 20;\n\n        // 3. Aliasing: remote2 copies the memory address of remote1\n        TV remote2 = remote1;\n        remote2.volume = 35; // Changing through remote2!\n\n        // 4. Verify both remotes see volume 35\n        System.out.println(\"remote1 sees volume: \" + remote1.volume);\n        System.out.println(\"remote2 sees volume: \" + remote2.volume);\n        System.out.println(\"Are both remotes pointing to same TV? \" + (remote1 == remote2));\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 2-4",
          "explanation": "Fields inside the class automatically get default values (0, false, null) when instantiated on the Heap."
        },
        {
          "line": "Line 9",
          "explanation": "'new TV()' creates the physical TV on the Heap. 'remote1' holds its address on the Stack."
        },
        {
          "line": "Line 19",
          "explanation": "'remote2 = remote1' copies the address, NOT the TV. Both remotes now point to the exact same TV."
        },
        {
          "line": "Line 20",
          "explanation": "Mutating volume via remote2 modifies the shared object."
        },
        {
          "line": "Lines 23-25",
          "explanation": "Both variables reflect volume 35, and 'remote1 == remote2' evaluates to true."
        }
      ],
      "output": "Default volume: 0\nDefault isOn: false\nDefault brand: null\nremote1 sees volume: 35\nremote2 sees volume: 35\nAre both remotes pointing to same TV? true"
    },
    "codeExamples": [
      {
        "title": "Example 1: Safe Null Checking to Prevent NPE",
        "description": "Always check whether a reference is null before calling methods or fields on it.",
        "code": "class UserProfile {\n    String username;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        UserProfile profile = null;\n\n        // Safe check\n        if (profile != null) {\n            System.out.println(\"User: \" + profile.username);\n        } else {\n            System.out.println(\"Profile is null! No object found in memory.\");\n        }\n    }\n}",
        "output": "Profile is null! No object found in memory."
      },
      {
        "title": "Example 2: Method Parameter Reference Mutation",
        "description": "When an object reference is passed to a method, modifications inside the method affect the original object.",
        "code": "class Score {\n    int points = 10;\n}\n\npublic class Main {\n    static void addBonus(Score s) {\n        s.points += 50; // Mutates original heap object\n    }\n\n    public static void main(String[] args) {\n        Score myScore = new Score();\n        addBonus(myScore);\n        System.out.println(\"Final Points: \" + myScore.points);\n    }\n}",
        "output": "Final Points: 60"
      }
    ],
    "interviewTakeaways": [
      "Stack vs Heap: References live on the Stack; object payloads live in the Heap.",
      "Aliasing: 'b = a' duplicates the address pointer, not the underlying object.",
      "Default Values: Heap fields are zero-initialized (0, 0.0, false, null), while local variables have no defaults.",
      "Null Reference: 'null' denotes address 0x0. Attempting member access on null throws NullPointerException (NPE).",
      "Equality with '==': For object references, '==' checks memory address equality, not field content equality."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Tracing Reference Aliasing",
        "problemStatement": "What is the final output of this code?",
        "code": "class Box {\n    int weight = 5;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b1 = new Box();\n        Box b2 = b1;\n        b2.weight = 25;\n        b1.weight = 10;\n        System.out.println(b2.weight);\n    }\n}",
        "options": [
          "5",
          "25",
          "10",
          "Compilation Error"
        ],
        "correctOptionIndex": 2,
        "hint": "Both b1 and b2 point to the same Box on the Heap. The last write wins.",
        "solution": "10",
        "explanation": "b1 and b2 are aliases to the same heap object. Setting b1.weight = 10 updates the object that b2 is pointing to, so b2.weight prints 10."
      },
      {
        "title": "Puzzle 2: Independent Objects vs Aliases",
        "problemStatement": "What will be printed to the console?",
        "code": "class Counter {\n    int count = 1;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        c1.count = 5;\n        c2.count = 8;\n        System.out.println(c1.count + \" \" + c2.count);\n    }\n}",
        "options": [
          "5 5",
          "8 8",
          "5 8",
          "1 1"
        ],
        "correctOptionIndex": 2,
        "hint": "'new Counter()' was called twice. Are they the same object or two different objects?",
        "solution": "5 8",
        "explanation": "Because 'new Counter()' was invoked twice, two completely independent objects were created on the Heap. Modifying c2 does not alter c1."
      },
      {
        "title": "Puzzle 3: The Null Dereference Trap",
        "problemStatement": "What happens when running this program?",
        "code": "class Laptop {\n    int ramGb = 16;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Laptop lap = null;\n        System.out.println(lap.ramGb);\n    }\n}",
        "options": [
          "Prints 16",
          "Prints 0",
          "NullPointerException at runtime",
          "Prints null"
        ],
        "correctOptionIndex": 2,
        "hint": "What happens when you try to access a field through a reference variable holding null?",
        "solution": "NullPointerException at runtime",
        "explanation": "The reference 'lap' holds null (no object on Heap). Attempting to dereference it ('lap.ramGb') throws java.lang.NullPointerException at runtime."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between where a reference variable lives and where the object lives?",
        "answer": "A reference variable lives inside the active method's stack frame on the Call Stack. It only stores the 32-bit or 64-bit memory address pointing to the object. The actual object payload, containing all its instance fields, lives in the Garbage-Collected Heap.",
        "followUp": "What happens to the object when the method finishes?",
        "followUpAnswer": "When the method finishes, its stack frame is popped, destroying the reference variable. If no other live references point to that heap object, the object becomes eligible for Garbage Collection.",
        "keyPhrases": [
          "Stack frame",
          "Heap memory",
          "Memory address",
          "Garbage collection eligibility"
        ]
      },
      {
        "question": "What is reference aliasing, and why can it cause unexpected bugs?",
        "answer": "Reference aliasing occurs when two or more reference variables hold the memory address of the exact same object on the Heap. It can cause subtle bugs because modifying the object through one variable unexpectedly mutates what the other variable sees.",
        "followUp": "How do you avoid unintended aliasing if you want a separate copy?",
        "followUpAnswer": "You must create a new object using 'new' and copy the values over, such as through a copy constructor, a factory method, or a deep copy mechanism.",
        "keyPhrases": [
          "Same heap address",
          "Shared state",
          "Copy constructor"
        ]
      },
      {
        "question": "Why do instance variables receive default values while local variables do not?",
        "answer": "When the JVM allocates memory for an object on the Heap via 'new', it zero-initializes the entire memory block for safety and consistency, giving fields defaults (0, false, null). Local variables live on the Stack in reused stack frame memory; the Java compiler enforces explicit assignment before read to prevent reading garbage leftover data.",
        "followUp": "What are the default values for boolean, int, and String fields?",
        "followUpAnswer": "boolean defaults to false, int defaults to 0, and String (being a reference type) defaults to null.",
        "keyPhrases": [
          "Zero-initialization on Heap",
          "Stack frame reuse",
          "Compile error for local variables"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What does 'Student s2 = s1;' do in Java?",
        "options": [
          "Copies the memory address so both variables point to the same object",
          "Clones the student object so there are two separate students on the Heap",
          "Deletes s1 and renames it to s2",
          "Throws a compile error"
        ],
        "correctIndex": 0,
        "explanation": "Assignment between reference variables copies the memory pointer, not the underlying heap object."
      },
      {
        "question": "What is the default value of an uninitialized boolean instance variable in a class?",
        "options": [
          "false",
          "true",
          "null",
          "0"
        ],
        "correctIndex": 0,
        "explanation": "Boolean instance fields automatically default to false when an object is instantiated."
      },
      {
        "question": "What is the default value of an uninitialized String instance variable in a class?",
        "options": [
          "null",
          "\"\"",
          "\"null\"",
          "undefined"
        ],
        "correctIndex": 0,
        "explanation": "All reference types (including String) default to null when declared as instance fields."
      },
      {
        "question": "What happens when you write 'myObj.doWork()' when 'myObj' is null?",
        "options": [
          "The JVM throws a NullPointerException at runtime",
          "The program outputs 'null' and continues",
          "The method executes with default arguments",
          "The compiler gives a syntax error"
        ],
        "correctIndex": 0,
        "explanation": "Dereferencing null causes a runtime java.lang.NullPointerException."
      },
      {
        "question": "If 'a' and 'b' are two reference variables, what does 'a == b' test?",
        "options": [
          "Whether 'a' and 'b' point to the exact same memory address on the Heap",
          "Whether the fields inside 'a' and 'b' have equal values",
          "Whether both objects were created in the same file",
          "Whether 'a' is a subclass of 'b'"
        ],
        "correctIndex": 0,
        "explanation": "The '==' operator on references checks address equality (referential identity)."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Assuming 's2 = s1' creates a duplicate/clone of the object",
        "whyItHappens": "In primitive types like int, b = a copies the value. Beginners expect the same for objects.",
        "howToFix": "Remember that object assignment copies the memory pointer, not the heap object. Use a copy constructor if a clone is needed."
      },
      {
        "mistake": "Dereferencing a null reference (NullPointerException)",
        "whyItHappens": "Calling methods or accessing fields on a variable that has not been initialized or was set to null.",
        "howToFix": "Check 'if (ref != null)' before dereferencing or use Optional."
      }
    ]
  },
  "constructors-initialization": {
    "id": "constructors-initialization",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.5",
    "title": "Constructors: First-Time Setup (Default vs Parameterized)",
    "subtitle": "The out-of-the-box setup wizard, constructor syntax rules, the free default constructor, and constructor overloading",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "Think of unboxing a brand-new smartphone.\n\nWhen you peel off the plastic film and power it on, the phone doesn't start in an unconfigured, broken state. A friendly **Setup Wizard** immediately boots up! It asks for your language, sets the initial clock, connects to Wi-Fi, and prepares the phone so it is 100% ready for use.\n\nIn Java, a **Constructor** is that exact Setup Wizard! Without constructors, creating an object would mean manually writing 5 lines of code every single time (`car.model = ...; car.color = ...; car.speed = ...;`). If you forgot one line, your car would be broken! A constructor builds and initializes the object in one single, clean breath at the moment of birth: `new Car(\"Tesla\", \"Red\", 0)`.",
    "coreExplanation": [
      "**What is a Constructor?**: A special initialization block that runs automatically whenever `new` is called to configure a fresh object's initial state.",
      "**The Two Golden Syntax Rules**: (1) The constructor name MUST match the Class name exactly (case-sensitive). (2) A constructor MUST NEVER declare a return type\u2014not even `void`!",
      "**The 'void' Trap**: If you accidentally write `public void Car()`, Java does NOT throw an error! It silently treats it as an ordinary method named 'Car'. It will no longer run during `new Car()`, leaving your fields uninitialized.",
      "**The Free Default Constructor**: If you write ZERO constructors in your class, Java automatically provides an invisible, 0-argument default constructor for you.",
      "**The Disappearing Default Trap**: The moment you write even ONE custom constructor (like a 2-parameter constructor), Java takes away the free default constructor! If you still want a 0-arg constructor, you must write it explicitly.",
      "**Constructor Overloading**: Just like ordering a pizza (plain cheese vs 3 toppings), you can write multiple constructors with different parameter lists to provide callers with flexible ways to create objects."
    ],
    "codeSnippet": {
      "title": "Default vs Parameterized and Overloaded Constructors",
      "code": "class Smartphone {\n    String brand;\n    int storageGb;\n    double price;\n\n    // 1. Parameterized Constructor\n    public Smartphone(String b, int storage, double p) {\n        brand = b;\n        storageGb = storage;\n        price = p;\n    }\n\n    // 2. Overloaded Constructor (Default budget specs)\n    public Smartphone() {\n        brand = \"Generic\";\n        storageGb = 64;\n        price = 199.99;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Calls parameterized constructor\n        Smartphone flagship = new Smartphone(\"Samsung Galaxy\", 256, 899.99);\n\n        // Calls 0-arg overloaded constructor\n        Smartphone budget = new Smartphone();\n\n        System.out.println(flagship.brand + \" [\" + flagship.storageGb + \"GB] - $\" + flagship.price);\n        System.out.println(budget.brand + \" [\" + budget.storageGb + \"GB] - $\" + budget.price);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 7-11",
          "explanation": "The parameterized constructor accepts initial values and assigns them to the fields upon instantiation."
        },
        {
          "line": "Lines 14-18",
          "explanation": "The overloaded 0-argument constructor sets default budget specifications if no arguments are passed."
        },
        {
          "line": "Line 23",
          "explanation": "'new Smartphone(\"Samsung Galaxy\", 256, 899.99)' passes 3 arguments, matching constructor #1."
        },
        {
          "line": "Line 26",
          "explanation": "'new Smartphone()' passes 0 arguments, matching constructor #2."
        }
      ],
      "output": "Samsung Galaxy [256GB] - $899.99\nGeneric [64GB] - $199.99"
    },
    "codeExamples": [
      {
        "title": "Example 1: The Disappearing Default Constructor Trap",
        "description": "Demonstrating how defining a custom constructor disables the default no-arg constructor.",
        "code": "class Book {\n    String title;\n\n    // Custom constructor\n    Book(String t) {\n        title = t;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b1 = new Book(\"Java Essentials\"); // OK!\n        // Book b2 = new Book(); // COMPILE ERROR: constructor Book in class Book cannot be applied to given types!\n        System.out.println(\"Book created: \" + b1.title);\n    }\n}",
        "output": "Book created: Java Essentials"
      },
      {
        "title": "Example 2: Rectangle with Overloaded Square Constructor",
        "description": "A square is a rectangle with equal width and height.",
        "code": "class Rectangle {\n    int width;\n    int height;\n\n    // Standard 2-param rectangle\n    Rectangle(int w, int h) {\n        width = w;\n        height = h;\n    }\n\n    // Overloaded square constructor\n    Rectangle(int side) {\n        width = side;\n        height = side;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle(10, 20);\n        Rectangle s = new Rectangle(15);\n        System.out.println(\"Rectangle Area: \" + (r.width * r.height));\n        System.out.println(\"Square Area: \" + (s.width * s.height));\n    }\n}",
        "output": "Rectangle Area: 200\nSquare Area: 225"
      }
    ],
    "interviewTakeaways": [
      "Constructor Purpose: Initializes object state at the moment of allocation.",
      "Syntax Rules: Name matches class exactly; zero return type (not even void).",
      "Default Constructor: Automatically generated only when NO constructors are written in the class.",
      "Revocation: Adding any constructor revokes the free 0-arg default constructor.",
      "Overloading: Multiple constructors can coexist in one class as long as parameter lists differ in type, count, or order."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: The 'void' Constructor Mistake",
        "problemStatement": "What will this program output?",
        "code": "class Player {\n    int score = 10;\n    public void Player() {\n        score = 50;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Player p = new Player();\n        System.out.println(p.score);\n    }\n}",
        "options": [
          "50",
          "10",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Notice the 'void' keyword before 'Player()'. Is it really a constructor?",
        "solution": "10",
        "explanation": "Because 'public void Player()' has a return type (void), Java treats it as a normal method, not a constructor! The default constructor ran instead, leaving score at its initial value 10."
      },
      {
        "title": "Puzzle 2: Overloaded Constructor Resolution",
        "problemStatement": "Which constructor is invoked when running this code?",
        "code": "class Message {\n    Message(String s) { System.out.print(\"A\"); }\n    Message(int i) { System.out.print(\"B\"); }\n    Message() { System.out.print(\"C\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Message(\"Hello\");\n        new Message(42);\n    }\n}",
        "options": [
          "AB",
          "BA",
          "ABC",
          "Compilation Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Look at the argument types: first a String literal, then an integer.",
        "solution": "AB",
        "explanation": "new Message(\"Hello\") matches the String constructor (prints A), and new Message(42) matches the int constructor (prints B). Output is AB."
      },
      {
        "title": "Puzzle 3: The Missing Default Constructor",
        "problemStatement": "What is the result of compiling and running this code?",
        "code": "class Order {\n    int id;\n    Order(int orderId) {\n        id = orderId;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Order o = new Order();\n        System.out.println(o.id);\n    }\n}",
        "options": [
          "Prints 0",
          "Prints null",
          "Compile Error: constructor Order in class Order cannot be applied to given types",
          "Runtime Exception"
        ],
        "correctOptionIndex": 2,
        "hint": "Did the developer define a custom constructor? Does the free default constructor still exist?",
        "solution": "Compile Error: constructor Order in class Order cannot be applied to given types",
        "explanation": "Because a 1-arg constructor was explicitly defined, Java retracted the default 0-arg constructor. Calling new Order() results in a compile error."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Can a constructor in Java have a return type like int or void?",
        "answer": "No. Constructors in Java must NEVER have a return type. If you add a return type such as 'void', the compiler treats it as a regular instance method with the same name as the class, and it will not be executed when 'new' is called.",
        "followUp": "Can you use a return statement inside a constructor?",
        "followUpAnswer": "Yes, you can use a return statement without a value ('return;') for early exit (e.g., after validation), but you cannot return a value ('return x;').",
        "keyPhrases": [
          "No return type",
          "Treated as method if void",
          "Empty return allowed for early exit"
        ]
      },
      {
        "question": "What is the default constructor in Java and when is it provided?",
        "answer": "The default constructor is a 0-argument constructor generated automatically by the Java compiler if and only if the class declares no constructors of its own. It initializes instance fields to their type defaults and calls super().",
        "followUp": "What happens if a developer adds a parameterized constructor?",
        "followUpAnswer": "The compiler immediately withdraws the free default constructor. If callers still need a 0-arg constructor, the developer must explicitly define it in the class.",
        "keyPhrases": [
          "Generated if 0 constructors written",
          "Withdrawn upon custom constructor",
          "Explicit definition required"
        ]
      },
      {
        "question": "What is constructor overloading and why is it useful?",
        "answer": "Constructor overloading is the technique of defining multiple constructors within the same class, each having a different parameter list (differing by number, type, or order of parameters). It provides callers with convenient, flexible options to create objects with full, partial, or default initial state.",
        "followUp": "Can constructors be overloaded based solely on access modifiers?",
        "followUpAnswer": "No. Like method overloading, constructors must differ in their parameter signatures, not access modifiers.",
        "keyPhrases": [
          "Different parameter signatures",
          "Flexible instantiation",
          "Default vs custom state"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the primary role of a constructor in Java?",
        "options": [
          "To initialize the state of a brand-new object upon allocation",
          "To destroy an old object and free memory",
          "To compile the source code into bytecode",
          "To import packages from the JDK"
        ],
        "correctIndex": 0,
        "explanation": "A constructor's sole purpose is to initialize instance fields when an object is instantiated."
      },
      {
        "question": "What happens if you define 'void Car()' inside class 'Car'?",
        "options": [
          "Java treats it as a normal method named Car, not a constructor",
          "The compiler reports a syntax error",
          "It becomes a constructor that returns null",
          "The class cannot be instantiated"
        ],
        "correctIndex": 0,
        "explanation": "Adding a return type (even void) makes Java treat it as a regular instance method."
      },
      {
        "question": "When does Java automatically generate the default 0-argument constructor?",
        "options": [
          "Only when the developer writes ZERO constructors in the class",
          "Always, even if custom constructors are present",
          "Only if the class is public",
          "Only if the class extends Object"
        ],
        "correctIndex": 0,
        "explanation": "Java only generates the default constructor if no constructors are declared in the class."
      },
      {
        "question": "Which of the following is a valid constructor declaration for a class named 'Student'?",
        "options": [
          "public Student(String name) { ... }",
          "public void Student(String name) { ... }",
          "public Student createStudent() { ... }",
          "new Student() { ... }"
        ],
        "correctIndex": 0,
        "explanation": "Constructors share the exact class name and have no return type."
      },
      {
        "question": "Can a class have 3 different constructors?",
        "options": [
          "Yes, as long as their parameter lists are different (Constructor Overloading)",
          "No, Java only allows at most 2 constructors",
          "Only if each constructor has a different name",
          "Only in abstract classes"
        ],
        "correctIndex": 0,
        "explanation": "A class can declare any number of overloaded constructors as long as their parameter lists differ."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Writing 'void' on a constructor (e.g. public void Car())",
        "whyItHappens": "Habit of writing method return types on everything.",
        "howToFix": "Never put a return type on a constructor. Having 'void' turns it into a normal method."
      },
      {
        "mistake": "Calling 'new Car()' after creating a custom parameterized constructor without defining a 0-arg constructor",
        "whyItHappens": "Believing Java's default constructor is still present.",
        "howToFix": "Once a custom constructor is created, explicitly write a no-arg constructor if default creation is needed."
      }
    ]
  },
  "this-keyword-and-chaining": {
    "id": "this-keyword-and-chaining",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.6",
    "title": "The 'this' Keyword & Constructor Chaining (this())",
    "subtitle": "Resolving parameter shadowing, referencing the current object, and eliminating duplicate setup code via this()",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "When you speak to someone, you refer to yourself as 'I' or 'Me'.\n\nYou say: 'My name is Sarah, and my age is 20.' You don't use your government passport ID number to refer to yourself in casual conversation! Inside a Java class, **`this`** is the object saying 'ME'!\n\nNow, imagine you go to the hospital. There is a master 10-page medical admission form. Instead of forcing minor clinic patients to fill out all 10 pages from scratch, the clinic receptionist fills in standard defaults ('No allergies', 'Standard checkup') and forwards it directly to the master form. In Java, **Constructor Chaining (`this()`)** does this exact job: smaller constructors pass default values into one central master constructor, eliminating duplicate code!",
    "coreExplanation": [
      "**What is 'this'?**: Inside any instance method or constructor, `this` is a built-in reference that points to the current executing object in Heap memory.",
      "**Parameter Shadowing**: When a constructor parameter has the exact same name as an instance field (e.g. `String name`), the parameter hides (shadows) the field! Writing `name = name;` assigns the parameter to itself, leaving the field null! Writing `this.name = name;` tells Java: 'assign the parameter into MY field'.",
      "**What is Constructor Chaining?**: The practice of calling one constructor from another constructor within the same class using `this(arguments)`.",
      "**The First-Statement Rule**: Any call to `this(...)` MUST be the very first line of code inside the constructor body. You cannot write print statements or if-checks before it.",
      "**No Circular Chaining**: Constructor A cannot call Constructor B if Constructor B calls Constructor A. Circular chaining triggers a compile error: 'recursive constructor invocation'."
    ],
    "codeSnippet": {
      "title": "Solving Shadowing and Constructor Chaining with this()",
      "code": "class Hero {\n    String name;\n    int health;\n    int attackPower;\n\n    // 1. Master Constructor (Initializes all 3 fields)\n    public Hero(String name, int health, int attackPower) {\n        this.name = name;              // 'this.name' is field; 'name' is parameter\n        this.health = health;\n        this.attackPower = attackPower;\n    }\n\n    // 2. Chained Constructor: Only name provided (defaults health=100, attack=15)\n    public Hero(String name) {\n        this(name, 100, 15); // MUST be the first statement!\n    }\n\n    // 3. Chained Constructor: Zero args (defaults to Novice hero)\n    public Hero() {\n        this(\"Novice\", 80, 10);\n    }\n\n    void printStats() {\n        System.out.println(this.name + \" -> Health: \" + this.health + \", Attack: \" + this.attackPower);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Hero h1 = new Hero(\"Thor\", 500, 90); // Calls Master Constructor\n        Hero h2 = new Hero(\"Archer\");         // Chains to Master with defaults\n        Hero h3 = new Hero();                 // Chains to Master with Novice defaults\n\n        h1.printStats();\n        h2.printStats();\n        h3.printStats();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 8-10",
          "explanation": "'this.name = name' resolves shadowing by explicitly writing into the instance field."
        },
        {
          "line": "Line 15",
          "explanation": "'this(name, 100, 15)' chains to the 3-argument master constructor as its very first statement."
        },
        {
          "line": "Line 20",
          "explanation": "The 0-arg constructor chains with default name 'Novice'."
        },
        {
          "line": "Lines 31-33",
          "explanation": "All three hero instances are cleanly initialized with zero duplicate setup logic!"
        }
      ],
      "output": "Thor -> Health: 500, Attack: 90\nArcher -> Health: 100, Attack: 15\nNovice -> Health: 80, Attack: 10"
    },
    "codeExamples": [
      {
        "title": "Example 1: The Shadowing Bug (name = name)",
        "description": "What happens when you forget 'this' during variable shadowing.",
        "code": "class Student {\n    String name;\n\n    Student(String name) {\n        name = name; // BUG! Assigns parameter to itself! Field stays null!\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Alice\");\n        System.out.println(\"Student name: \" + s.name); // Prints null!\n    }\n}",
        "output": "Student name: null"
      },
      {
        "title": "Example 2: Method Chaining with 'return this;'",
        "description": "Returning 'this' from methods allows cascading method calls (Fluent API pattern).",
        "code": "class PizzaOrder {\n    String size = \"Medium\";\n    boolean extraCheese = false;\n\n    PizzaOrder withSize(String s) {\n        this.size = s;\n        return this; // Returns current object\n    }\n\n    PizzaOrder withExtraCheese() {\n        this.extraCheese = true;\n        return this; // Returns current object\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        PizzaOrder order = new PizzaOrder().withSize(\"Large\").withExtraCheese();\n        System.out.println(\"Pizza: \" + order.size + \", Extra cheese: \" + order.extraCheese);\n    }\n}",
        "output": "Pizza: Large, Extra cheese: true"
      }
    ],
    "interviewTakeaways": [
      "The 'this' Keyword: A reference pointing to the current executing object instance.",
      "Disambiguation: Most commonly used to resolve variable shadowing when parameter names match field names.",
      "Constructor Chaining: 'this(args)' invokes another constructor in the same class.",
      "First-Statement Rule: 'this()' MUST be the first statement inside a constructor body.",
      "Prohibition in Static Context: 'this' cannot be used inside static methods or static blocks because no instance exists."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: The Shadowing Assignment Trap",
        "problemStatement": "What is the printed result of this program?",
        "code": "class Box {\n    int size = 10;\n    Box(int size) {\n        size = size;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box(50);\n        System.out.println(b.size);\n    }\n}",
        "options": [
          "50",
          "10",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Because 'this.size = size' was not used, 'size = size' assigns the parameter to itself.",
        "solution": "10",
        "explanation": "The parameter 'size' shadows the instance field 'size'. Writing 'size = size' only modifies the local parameter. The instance field remains at its initial value 10."
      },
      {
        "title": "Puzzle 2: The First Statement Violation",
        "problemStatement": "What happens when compiling this constructor?",
        "code": "class Product {\n    String name;\n    int price;\n\n    Product(String name, int price) {\n        this.name = name;\n        this.price = price;\n    }\n\n    Product(String name) {\n        System.out.println(\"Setting up product\");\n        this(name, 100); // Calling other constructor\n    }\n}",
        "options": [
          "Compiles and prints 'Setting up product'",
          "Compile Error: call to this must be first statement in constructor",
          "Runtime Exception",
          "Infinite loop"
        ],
        "correctOptionIndex": 1,
        "hint": "Can you execute any statement (like a print call) before calling 'this(...)'?",
        "solution": "Compile Error: call to this must be first statement in constructor",
        "explanation": "Java strictly requires that 'this(...)' must be the very first statement in a constructor body. Having System.out.println() prior to it causes a compile-time error."
      },
      {
        "title": "Puzzle 3: Tracing Constructor Chaining Output",
        "problemStatement": "What will be printed to the console?",
        "code": "class Demo {\n    Demo() {\n        this(5);\n        System.out.print(\"A\");\n    }\n    Demo(int x) {\n        System.out.print(\"B\" + x);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Demo();\n    }\n}",
        "options": [
          "AB5",
          "B5A",
          "B5",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Tracing order: Demo() calls this(5) first, which executes Demo(int x), and then Demo() finishes its remaining code.",
        "solution": "B5A",
        "explanation": "Demo() immediately chains to Demo(5), which prints 'B5'. Once Demo(5) completes, control returns to Demo() which prints 'A'. Total output: B5A."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the purpose of the 'this' keyword in Java?",
        "answer": "In Java, 'this' is a reference variable that points to the current object whose method or constructor is being invoked. It is primarily used to resolve variable shadowing between parameters and instance fields, to pass the current object as an argument, and to chain constructors via this().",
        "followUp": "Can 'this' be used in a static method?",
        "followUpAnswer": "No. Static methods belong to the class and execute without any specific object instance, so there is no 'this' reference available in static context.",
        "keyPhrases": [
          "Current object instance",
          "Resolve variable shadowing",
          "Not allowed in static context"
        ]
      },
      {
        "question": "Why must 'this()' be the very first statement in a constructor?",
        "answer": "Java enforces this rule to guarantee that an object's base state is completely initialized before any subsequent custom initialization logic or member access occurs, preventing access to uninitialized fields.",
        "followUp": "Can a constructor call both this() and super()?",
        "followUpAnswer": "No. Both this() and super() must be the first statement, so you can only call one or the other explicitly in any single constructor.",
        "keyPhrases": [
          "Initialization order guarantee",
          "Prevent uninitialized access",
          "Mutually exclusive with super()"
        ]
      },
      {
        "question": "What happens if Constructor A calls this() to Constructor B, and Constructor B calls this() to Constructor A?",
        "answer": "This creates recursive constructor invocation (circular chaining). The Java compiler detects this cycle at compile time and refuses to compile with the error: 'recursive constructor invocation'.",
        "followUp": "How do you avoid circular chaining in complex classes?",
        "followUpAnswer": "Designate one constructor as the 'master constructor' that initializes all fields, and have all other overloaded constructors chain directly or hierarchically toward that single master constructor.",
        "keyPhrases": [
          "Recursive constructor invocation",
          "Compile-time error",
          "Master constructor pattern"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What does 'this.title = title;' achieve inside a constructor?",
        "options": [
          "Assigns the parameter 'title' into the object's instance field 'title'",
          "Creates a new variable named title",
          "Deletes the title field",
          "Compares if the parameter and field are equal"
        ],
        "correctIndex": 0,
        "explanation": "'this.title' refers to the instance field, disambiguating it from the parameter."
      },
      {
        "question": "Where must a constructor chaining call 'this(...)' appear in a constructor?",
        "options": [
          "As the very first statement in the constructor body",
          "As the last statement before returning",
          "Anywhere inside the constructor",
          "Outside the constructor"
        ],
        "correctIndex": 0,
        "explanation": "Java strictly mandates that this(...) must be the very first statement in the constructor."
      },
      {
        "question": "Can you use the 'this' keyword inside 'public static void main'?",
        "options": [
          "No, 'this' cannot be referenced from a static context",
          "Yes, it refers to the Main class",
          "Yes, if Main is public",
          "Only in Java 17+"
        ],
        "correctIndex": 0,
        "explanation": "Static methods have no current object instance, so 'this' cannot be used in a static context."
      },
      {
        "question": "What is the compile error if two constructors call each other via this()?",
        "options": [
          "Recursive constructor invocation",
          "StackOverflowError",
          "DeadlockException",
          "CircularReferenceException"
        ],
        "correctIndex": 0,
        "explanation": "The Java compiler detects cyclic constructor calls and emits 'recursive constructor invocation'."
      },
      {
        "question": "Why is constructor chaining useful?",
        "options": [
          "It avoids duplicating field assignment and validation logic across multiple overloaded constructors",
          "It makes the program run 10x faster",
          "It automatically garbage collects old objects",
          "It is required by the JVM specification for every class"
        ],
        "correctIndex": 0,
        "explanation": "Chaining delegates initialization to a single master constructor, eliminating duplicated code."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Writing 'name = name;' in a constructor when parameter and field share the same name",
        "whyItHappens": "Forgetting that the parameter shadows the field, so it assigns the parameter to itself.",
        "howToFix": "Use 'this.name = name;' to clearly assign into the object's instance field."
      },
      {
        "mistake": "Placing statements before 'this()' in constructor chaining",
        "whyItHappens": "Trying to print or validate before calling the master constructor.",
        "howToFix": "Ensure 'this(...)' is the absolute first statement in the constructor."
      }
    ]
  },
  "static-vs-instance": {
    "id": "static-vs-instance",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.7",
    "title": "Static Fields & Methods vs Instance Members",
    "subtitle": "Class-level shared state in Metaspace vs object-level heap state, static counters, utility methods, and why static cannot touch 'this'",
    "estimatedMinutes": 8,
    "beginnerAnalogy": "Imagine a classroom with 30 school students.\n\n1. **Instance Variables (Personal Notebooks)**: Every student has their own private notebook on their desk. Alice writes her name 'Alice' on hers; Bob writes 'Bob' on his. If Bob scribbles on his notebook, Alice's notebook stays completely clean. Each student owns their own independent copy.\n\n2. **Static Variables (The Wall Clock)**: High up on the classroom wall hangs a single clock. Does each student carry their own wall clock? Of course not! There is only ONE clock in the whole room, shared by all 30 students. If someone changes the wall clock from 2:00 PM to 3:00 PM, every single student looking up sees 3:00 PM.\n\nIn Java, **instance members** belong to each individual object, while **static members** belong to the class itself!",
    "coreExplanation": [
      "**Instance Variables**: Declared inside a class without `static`. Every object created with `new` gets its own private copy stored in Heap memory.",
      "**Static Variables (Class Variables)**: Declared with the `static` keyword. Only ONE shared copy exists in memory (stored in Metaspace / Class area), shared by all instances of the class.",
      "**Huge Memory Savings**: If you have 10,000 `Student` objects, you have 10,000 separate `name` fields. But `static String schoolName` takes memory only ONCE, saving massive RAM.",
      "**Access via Class Name**: Because static members belong to the class, access them using the Class name: `Student.schoolName` or `Math.sqrt(25)`, rather than through object references.",
      "**Static Methods (Utility Functions)**: A method marked `static` performs an action that does not depend on any specific object's state (e.g. `Math.max(a, b)`).",
      "**The Golden Rule \u2014 Static CANNOT use 'this'**: Static methods can run when ZERO objects exist in memory! Therefore, static methods cannot use `this` or access instance variables directly.",
      "**Why 'main' is Static**: The JVM must invoke `public static void main` before any objects have been instantiated!"
    ],
    "codeSnippet": {
      "title": "Static vs Instance Members and Object Counter Pattern",
      "code": "class Student {\n    String name;                  // Instance field (1 copy per student)\n    static String school = \"MIT\"; // Static field (1 shared copy for all)\n    static int studentCount = 0;  // Static counter\n\n    public Student(String name) {\n        this.name = name;\n        studentCount++; // Increments shared static counter on every birth!\n    }\n\n    // Static utility method\n    public static void displayTotalStudents() {\n        // Cannot access 'this.name' here! No object exists in static context!\n        System.out.println(\"Total enrolled at \" + school + \": \" + studentCount);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"Alice\");\n        Student s2 = new Student(\"Bob\");\n        Student s3 = new Student(\"Charlie\");\n\n        // Access static method via Class Name (Best Practice)\n        Student.displayTotalStudents();\n\n        // Each student has their own independent name\n        System.out.println(s1.name + \" attends \" + Student.school);\n        System.out.println(s2.name + \" attends \" + Student.school);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 3-4",
          "explanation": "'static String school' and 'static int studentCount' exist once in Metaspace, shared by all instances."
        },
        {
          "line": "Line 8",
          "explanation": "Every time 'new Student()' runs, the constructor increments the shared 'studentCount' counter."
        },
        {
          "line": "Lines 12-15",
          "explanation": "Static method 'displayTotalStudents()' accesses static members cleanly without needing an object instance."
        },
        {
          "line": "Line 24",
          "explanation": "Calling 'Student.displayTotalStudents()' outputs 3 because 3 objects were created."
        }
      ],
      "output": "Total enrolled at MIT: 3\nAlice attends MIT\nBob attends MIT"
    },
    "codeExamples": [
      {
        "title": "Example 1: Mutating a Shared Static Variable",
        "description": "Notice how changing a static variable through one reference or class name changes it for everyone.",
        "code": "class Company {\n    static String companyName = \"TechCorp\";\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Company c1 = new Company();\n        Company c2 = new Company();\n\n        // Rebranding the company name\n        Company.companyName = \"GlobalTech\";\n\n        System.out.println(\"c1 sees: \" + Company.companyName);\n        System.out.println(\"c2 sees: \" + Company.companyName);\n    }\n}",
        "output": "c1 sees: GlobalTech\nc2 sees: GlobalTech"
      },
      {
        "title": "Example 2: Pure Static Utility Class",
        "description": "Utility classes like Math containing only static methods and constants.",
        "code": "class MathUtils {\n    public static final double PI = 3.14159;\n\n    public static int square(int n) {\n        return n * n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // No need to instantiate 'new MathUtils()'!\n        int result = MathUtils.square(7);\n        System.out.println(\"Square of 7: \" + result);\n        System.out.println(\"PI: \" + MathUtils.PI);\n    }\n}",
        "output": "Square of 7: 49\nPI: 3.14159"
      }
    ],
    "interviewTakeaways": [
      "Memory Location: Instance fields live in the Heap; static fields live in Metaspace.",
      "Copies: 1 copy per instance for instance variables; exactly 1 shared copy per class for static variables.",
      "Static Rule: Static methods cannot access instance variables or use 'this' directly.",
      "Instance Rule: Instance methods CAN freely access static variables and methods.",
      "Access Convention: Always access static members via ClassName.member (e.g. Math.abs)."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: The Static Counter Trace",
        "problemStatement": "What will be printed when running this program?",
        "code": "class Item {\n    static int count = 0;\n    int id = 0;\n    Item() {\n        count++;\n        id = count;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item i1 = new Item();\n        Item i2 = new Item();\n        Item i3 = new Item();\n        System.out.println(i1.id + \" \" + i3.id + \" \" + Item.count);\n    }\n}",
        "options": [
          "1 3 3",
          "3 3 3",
          "1 1 3",
          "Compilation Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Notice that 'id' is an instance variable assigned at birth, while 'count' is shared static.",
        "solution": "1 3 3",
        "explanation": "When i1 is created, count becomes 1, so i1.id = 1. When i2 is created, count becomes 2. When i3 is created, count becomes 3, so i3.id = 3. Final count is 3. Output: 1 3 3."
      },
      {
        "title": "Puzzle 2: Calling Instance Member from Static Context",
        "problemStatement": "What is the compilation result of this code?",
        "code": "class Greeter {\n    String message = \"Welcome\";\n    public static void greet() {\n        System.out.println(message);\n    }\n}",
        "options": [
          "Compiles and prints 'Welcome'",
          "Compile Error: non-static variable message cannot be referenced from a static context",
          "Runtime Exception",
          "Prints null"
        ],
        "correctOptionIndex": 1,
        "hint": "Can a static method access an instance variable directly?",
        "solution": "Compile Error: non-static variable message cannot be referenced from a static context",
        "explanation": "Static methods execute at the class level without an object instance. Attempting to directly read the instance field 'message' causes a compile error."
      },
      {
        "title": "Puzzle 3: Static Mutation via Instance Reference",
        "problemStatement": "What will be printed to the console?",
        "code": "class Counter {\n    static int x = 10;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        c1.x = 50;\n        System.out.println(c2.x);\n    }\n}",
        "options": [
          "10",
          "50",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Even though c1.x looks like an instance access, x is static. Does c2 share the same x?",
        "solution": "50",
        "explanation": "Because x is static, there is only one copy in memory. Modifying c1.x modifies the shared variable, so c2.x also evaluates to 50."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between a static variable and an instance variable in Java?",
        "answer": "An instance variable belongs to a specific object instance; every object created with 'new' gets its own copy in Heap memory. A static variable belongs to the class itself; exactly one shared copy is allocated in Metaspace when the class is loaded and is shared by all instances.",
        "followUp": "When should you make a variable static?",
        "followUpAnswer": "Make a variable static when its value is common and shared across all instances (e.g., constants like Math.PI, bank interest rates, or counters tracking total instances).",
        "keyPhrases": [
          "Metaspace vs Heap",
          "Single shared copy vs independent copies",
          "Class level vs object level"
        ]
      },
      {
        "question": "Why can't you access instance variables or use 'this' from a static method?",
        "answer": "Static methods belong to the class and can be invoked directly (e.g. ClassName.method()) without creating any objects. Because no object instance is guaranteed to exist when a static method runs, there is no 'this' pointer and no instance fields to access.",
        "followUp": "Can an instance method call a static method?",
        "followUpAnswer": "Yes. An instance method always has access to class-level static members, just as students in a classroom can always see the shared wall clock.",
        "keyPhrases": [
          "No object instance guaranteed",
          "Absence of this pointer",
          "Asymmetric access rule"
        ]
      },
      {
        "question": "Why is the main method declared static in Java?",
        "answer": "The JVM must be able to execute the main method as the starting entry point of an application before any objects have been instantiated. If main were non-static, the JVM wouldn't know which constructor to call to create an instance of the class first.",
        "followUp": "Can you overload the main method?",
        "followUpAnswer": "Yes, you can overload main(String[] args) with other signatures (e.g. main(int x)), but the JVM will only call public static void main(String[] args) as the entry point.",
        "keyPhrases": [
          "Application entry point",
          "Invocation prior to instantiation",
          "JVM specification requirement"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Where are static variables stored in JVM memory?",
        "options": [
          "In Metaspace (Class Metadata area)",
          "On the thread Call Stack",
          "Inside the CPU L1 cache",
          "On the Hard Drive"
        ],
        "correctIndex": 0,
        "explanation": "Static variables are stored at the class level in Metaspace."
      },
      {
        "question": "How many copies of a static variable exist in memory if 1,000 objects are created?",
        "options": [
          "Exactly 1 shared copy",
          "1,000 copies",
          "0 copies",
          "Depends on the garbage collector"
        ],
        "correctIndex": 0,
        "explanation": "Static variables exist as a single shared copy per class regardless of how many instances are created."
      },
      {
        "question": "What is the recommended best practice for accessing a static method?",
        "options": [
          "Using the Class Name: ClassName.methodName()",
          "Using an object reference: obj.methodName()",
          "Using the 'this' keyword",
          "Using reflection only"
        ],
        "correctIndex": 0,
        "explanation": "Accessing static members via the Class name clarifies that the member belongs to the class."
      },
      {
        "question": "Can a static method access an instance variable directly?",
        "options": [
          "No, doing so produces a compile-time error",
          "Yes, it reads the first object created",
          "Yes, but only if the variable is public",
          "Only inside the main method"
        ],
        "correctIndex": 0,
        "explanation": "Non-static fields cannot be referenced directly from a static context."
      },
      {
        "question": "Can an instance method call a static method?",
        "options": [
          "Yes, instance methods have full access to static members",
          "No, instance methods cannot see static members",
          "Only if both are declared in different files",
          "Only with super()"
        ],
        "correctIndex": 0,
        "explanation": "Instance methods can freely access static variables and invoke static methods."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Trying to use 'this' or instance fields inside a static method",
        "whyItHappens": "Forgetting that static methods execute at class level when no object may exist.",
        "howToFix": "Pass required object instances as parameters to the static method or make the method non-static."
      },
      {
        "mistake": "Accessing static members through an object instance instead of the class name (e.g. s1.schoolName)",
        "whyItHappens": "Java allows it without syntax error, but it misleads readers into thinking the field is per-instance.",
        "howToFix": "Always access static members via the ClassName (e.g. Student.schoolName)."
      }
    ]
  },
  "object-lifecycle-and-gc": {
    "id": "object-lifecycle-and-gc",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.8",
    "title": "Object Lifecycle & Garbage Collection",
    "subtitle": "The 4 stages of an object's life, reachability graphs, the island of isolation, and automatic background cleanup",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "Think of the JVM Heap like a busy city bike-rental system.\n\n1. **Birth (Renting a Bike)**: When you write `new Bike()`, a brand-new bike is unlocked and placed on the street (Heap). You receive a digital key on your phone (the reference variable `myBike`) that connects you to that specific bike.\n\n2. **Life (Riding the Bike)**: As long as you have that digital key on your phone, you can ride the bike and ring the bell. The bike is 'reachable' and active.\n\n3. **Abandonment (Losing the Key)**: You finish your ride and delete your app (`myBike = null;`). The bike is still sitting on the pavement, but NOBODY in the city holds a key to unlock it! It is completely orphaned and unusable.\n\n4. **Garbage Collection (The City Street Sweeper)**: A cleanup truck (the Java Garbage Collector) quietly patrols the city in the background. When it finds a bike that has no key anywhere in the city, it recycles the bike to free up sidewalk space for new riders!\n\nIn languages like C++, you had to manually destroy every bike yourself (`delete bike;`). If you forgot, the city clogged up until it crashed (Memory Leak). Java cleans up for you automatically.",
    "coreExplanation": [
      "**The 4 Stages of an Object's Lifecycle**: (1) **Creation**: Allocated on Heap via `new`. (2) **In Use**: Pointed to by at least one live reference. (3) **Eligible for GC**: All references to the object are severed or out of scope. (4) **Destruction**: JVM Garbage Collector frees the heap bytes.",
      "**Automatic Memory Management**: Java runs an automatic background Garbage Collector (GC), preventing common C/C++ memory corruption bugs like dangling pointers and double-free crashes.",
      "**Reachability Analysis (GC Roots)**: An object is alive as long as an unbroken path of references connects it to a 'GC Root' (active thread stack variables, static fields, JNI pointers).",
      "**4 Ways Objects Become Eligible for GC**:\n   1. **Nullifying reference**: `bike = null;`\n   2. **Reassigning reference**: `bike = new Bike();` (previous bike is abandoned)\n   3. **Going out of scope**: Method stack frame pops upon return\n   4. **Island of Isolation**: Two objects reference each other, but have zero connection to any stack variable!",
      "**System.gc() is only a Request**: Calling `System.gc()` suggests to the JVM that you would like a cleanup, but the JVM is free to delay or ignore the request entirely.",
      "**Memory Leaks in Java**: Java prevents orphaned memory leaks, but keeping unused objects stored in static collections (like an ever-growing `static List`) will prevent GC and eventually trigger `OutOfMemoryError`."
    ],
    "codeSnippet": {
      "title": "Tracing Object Life and GC Eligibility",
      "code": "class Drone {\n    String model;\n    Drone(String m) { this.model = m; }\n}\n\npublic class Main {\n    static void testFlight() {\n        // Drone 1 created inside helper method\n        Drone d1 = new Drone(\"MiniDrone\");\n        System.out.println(\"Flying: \" + d1.model);\n        // When testFlight() ends, 'd1' stack variable is destroyed!\n        // 'MiniDrone' on Heap becomes immediately ELIGIBLE FOR GC!\n    }\n\n    public static void main(String[] args) {\n        // Drone 2 created\n        Drone d2 = new Drone(\"HeavyLift\");\n\n        // Nullifying reference\n        d2 = null; // 'HeavyLift' is now ELIGIBLE FOR GC!\n\n        // Call helper method\n        testFlight();\n\n        // Polite request to run GC\n        System.gc();\n        System.out.println(\"Program completed cleanly.\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 8-10",
          "explanation": "Drone 'MiniDrone' is allocated on the Heap; reference 'd1' lives in testFlight's stack frame."
        },
        {
          "line": "Line 12",
          "explanation": "When testFlight() returns, its stack frame is popped. 'MiniDrone' has 0 incoming references and is eligible for GC."
        },
        {
          "line": "Line 18",
          "explanation": "Setting 'd2 = null' breaks the only link to 'HeavyLift', making it eligible for GC."
        },
        {
          "line": "Line 24",
          "explanation": "'System.gc()' politely requests the JVM to sweep unreferenced objects."
        }
      ],
      "output": "Flying: MiniDrone\nProgram completed cleanly."
    },
    "codeExamples": [
      {
        "title": "Example 1: The Island of Isolation Trap",
        "description": "Two objects referencing each other with zero connection to the active stack are both collected.",
        "code": "class Node {\n    Node partner;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Node a = new Node();\n        Node b = new Node();\n\n        a.partner = b; // a points to b\n        b.partner = a; // b points to a\n\n        // Sever all stack connections!\n        a = null;\n        b = null;\n\n        // Both Node objects are an Island of Isolation!\n        // Because neither can be reached from a GC root, BOTH are eligible for GC!\n        System.out.println(\"Both nodes are now eligible for GC.\");\n    }\n}",
        "output": "Both nodes are now eligible for GC."
      },
      {
        "title": "Example 2: Reassigning a Reference Variable",
        "description": "Reassigning a reference variable abandons the previous object.",
        "code": "class Car {\n    String name;\n    Car(String n) { name = n; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car(\"Sedan\"); // Object 1\n        c = new Car(\"SUV\");       // Object 2 (Object 1 'Sedan' is now abandoned & eligible for GC)\n        System.out.println(\"Current car: \" + c.name);\n    }\n}",
        "output": "Current car: SUV"
      }
    ],
    "interviewTakeaways": [
      "Garbage Collector: An automatic background daemon thread that reclaims memory of unreachable heap objects.",
      "Reachability: Objects are collected based on reachability from GC Roots, not simple reference counting.",
      "Island of Isolation: Circular references with no root connection are detected and collected safely.",
      "System.gc(): A hint/request to the JVM, not a guarantee that GC will run immediately.",
      "Deprecated finalize(): Never rely on finalize(); use try-with-resources and AutoCloseable instead."
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Counting GC-Eligible Objects",
        "problemStatement": "How many objects are eligible for Garbage Collection at the marked line?",
        "code": "class User {\n    String name;\n    User(String n) { name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u1 = new User(\"Alice\");\n        User u2 = new User(\"Bob\");\n        User u3 = new User(\"Charlie\");\n        u1 = u2;\n        u3 = null;\n        // LINE OF INTEREST: How many User objects are eligible for GC here?\n        System.out.println(u1.name);\n    }\n}",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "correctOptionIndex": 2,
        "hint": "Check each object: 'Alice' (lost when u1=u2), 'Bob' (pointed to by both u1 and u2), 'Charlie' (lost when u3=null).",
        "solution": "2",
        "explanation": "Object 'Alice' has no references pointing to it after u1 = u2. Object 'Charlie' has no references after u3 = null. Object 'Bob' is held by both u1 and u2. Therefore, exactly 2 objects ('Alice' and 'Charlie') are eligible for GC."
      },
      {
        "title": "Puzzle 2: Method Scope and Stack Exit",
        "problemStatement": "When does the object created in makePhone() become eligible for Garbage Collection?",
        "code": "class Phone {}\npublic class Main {\n    static void makePhone() {\n        Phone p = new Phone();\n    }\n    public static void main(String[] args) {\n        makePhone();\n        System.out.println(\"Done\");\n    }\n}",
        "options": [
          "Immediately when makePhone() returns and its stack frame is popped",
          "When the main method finishes",
          "Never",
          "Only if System.gc() is explicitly called"
        ],
        "correctOptionIndex": 0,
        "hint": "The variable 'p' is local to makePhone(). What happens to local variables when a method returns?",
        "solution": "Immediately when makePhone() returns and its stack frame is popped",
        "explanation": "Because 'p' is a local stack variable, it goes out of scope when makePhone() finishes. The Phone object on the Heap has 0 references remaining and becomes eligible for GC."
      },
      {
        "title": "Puzzle 3: The Island of Isolation Reachability",
        "problemStatement": "What is true about objects in an 'Island of Isolation'?",
        "code": "class Node {\n    Node next;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Node n1 = new Node();\n        Node n2 = new Node();\n        n1.next = n2;\n        n2.next = n1;\n        n1 = null;\n        n2 = null;\n    }\n}",
        "options": [
          "Both n1 and n2 objects are eligible for Garbage Collection",
          "Neither object can be collected because they point to each other",
          "Only n1 is collected",
          "The JVM crashes with a circular reference error"
        ],
        "correctOptionIndex": 0,
        "hint": "Java GC uses Reachability from GC Roots, not reference counting.",
        "solution": "Both n1 and n2 objects are eligible for Garbage Collection",
        "explanation": "Even though they reference each other, neither object is reachable from any active GC Root on the Stack. Modern JVMs detect this and collect both objects."
      }
    ],
    "interviewQuestions": [
      {
        "question": "How does the Java Garbage Collector decide which objects to destroy?",
        "answer": "The JVM Garbage Collector uses Reachability Analysis starting from GC Roots (active stack frame local variables, loaded class static references, active threads). If an object cannot be reached through an unbroken chain of references from any GC Root, it is declared dead and eligible for collection.",
        "followUp": "Does Java use reference counting?",
        "followUpAnswer": "No. Naive reference counting fails on circular references (Islands of Isolation). Java uses tracing reachability algorithms (such as mark-and-sweep) to handle cycles easily.",
        "keyPhrases": [
          "Reachability analysis",
          "GC Roots",
          "Mark-and-sweep",
          "Island of isolation"
        ]
      },
      {
        "question": "Does calling System.gc() guarantee that garbage collection will run immediately?",
        "answer": "No. Calling System.gc() or Runtime.getRuntime().gc() merely sends a polite suggestion to the JVM. The JVM HotSpot engine decides whether, when, and how to execute garbage collection based on heap thresholds and system workload.",
        "followUp": "Is calling System.gc() good practice in production code?",
        "followUpAnswer": "No. Explicitly requesting GC can cause expensive Stop-The-World pauses and degrade application throughput. The JVM manages memory far more efficiently on its own.",
        "keyPhrases": [
          "Polite suggestion / hint",
          "No guarantee of immediate execution",
          "Stop-the-world pause risk"
        ]
      },
      {
        "question": "Can a memory leak happen in Java despite having automatic Garbage Collection?",
        "answer": "Yes. A memory leak in Java occurs when an application unintentionally retains references to objects that are no longer needed, preventing the Garbage Collector from reclaiming them. Common culprits include unbounded static collections (e.g., static Maps as caches without eviction), unclosed resources, or unregistered event listeners.",
        "followUp": "How do you diagnose and fix a memory leak in Java?",
        "followUpAnswer": "Take a heap dump (hprof), analyze it with a profiler such as Eclipse Memory Analyzer (MAT) or VisualVM to find the largest memory-retaining reference paths, and ensure references are nulled or collections pruned.",
        "keyPhrases": [
          "Unintentional reference retention",
          "Static collection caching",
          "Heap dump / MAT analysis"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "When does a Heap object become eligible for Garbage Collection?",
        "options": [
          "When it is no longer reachable from any live GC root",
          "The instant the constructor finishes",
          "Only when System.gc() is called",
          "When it reaches 10 minutes of age"
        ],
        "correctIndex": 0,
        "explanation": "An object becomes eligible for GC as soon as all reference paths from GC roots are broken."
      },
      {
        "question": "What is an 'Island of Isolation' in Java GC?",
        "options": [
          "A group of objects that reference each other but are unreachable from any GC root",
          "An object stored in CPU cache",
          "A memory block that cannot be collected due to hardware issues",
          "A private inner class"
        ],
        "correctIndex": 0,
        "explanation": "An Island of Isolation consists of circular referenced objects with no link to any live root; all are eligible for GC."
      },
      {
        "question": "What does calling 'System.gc()' do?",
        "options": [
          "Requests the JVM to run garbage collection, but does not guarantee it will run",
          "Instantly freezes the CPU and clears all heap RAM",
          "Deletes all static variables",
          "Restarts the JVM"
        ],
        "correctIndex": 0,
        "explanation": "System.gc() is merely a suggestion/request to the JVM."
      },
      {
        "question": "Why is the finalize() method deprecated in Java?",
        "options": [
          "It was unpredictable, caused performance degradation, deadlocks, and is fundamentally unsafe",
          "Because C++ has destructors",
          "Because computers have more RAM now",
          "Because Java 8 introduced lambdas"
        ],
        "correctIndex": 0,
        "explanation": "finalize() had severe flaws (promptness, deadlocks, object resurrection) and was deprecated in Java 9."
      },
      {
        "question": "Which of the following is considered a 'GC Root' in Java?",
        "options": [
          "A local variable inside an active thread's method stack frame",
          "A field inside an unreachable object",
          "A deleted variable",
          "A comment in source code"
        ],
        "correctIndex": 0,
        "explanation": "Local variables in active thread stack frames serve as primary GC Roots."
      }
    ],
    "beginnerMistakes": [
      {
        "mistake": "Assuming calling System.gc() immediately forces garbage collection",
        "whyItHappens": "Thinking System.gc() is a command rather than a polite hint to the JVM.",
        "howToFix": "Rely on the JVM's automatic garbage collection heuristics; do not rely on System.gc() in production."
      },
      {
        "mistake": "Thinking memory leaks are impossible in Java because of GC",
        "whyItHappens": "Assuming GC frees everything automatically.",
        "howToFix": "Avoid holding unnecessary references in static collections or long-lived caches."
      }
    ]
  }
};
