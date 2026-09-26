import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 9: OOP FUNDAMENTALS - 8 MODULAR LESSONS
// Formatted strictly in GeeksforGeeks & W3Schools standard tutorial style:
// - Formal, authoritative, clear technical definitions
// - Standard academic Java examples (Student, Employee, Rectangle, MathUtils)
// - Concise memory breakdowns (Stack vs Heap, Metaspace, GC Roots)
// - Zero narrative stories or fairy tales
// ============================================================

export const oop9Lessons: Record<string, DetailedLesson> = {
  "why-oop-fundamentals": {
    "id": "why-oop-fundamentals",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.1",
    "title": "Why OOP? (Procedural vs Object-Oriented Programming)",
    "subtitle": "Understanding the limitations of procedural programming and the four fundamental pillars of the Object-Oriented paradigm",
    "estimatedMinutes": 6,
    "beginnerAnalogy": "In **Procedural Programming (POP)** (such as C), a program is divided into functions that execute sequentially. Data is treated as passive, separated from functions, and moves freely across the system. As applications scale, unrestricted data access makes code fragile, difficult to debug, and prone to corruption.\n\n**Object-Oriented Programming (OOP)** (such as Java) shifts the focus from functions to **Objects**. An object binds data (attributes) and behavior (methods) together into a single self-contained unit. OOP provides structured data protection through four core pillars:\n\n1. **Encapsulation**: Wrapping data and methods into a single unit and restricting unauthorized direct access.\n2. **Inheritance**: Creating new classes based on existing classes to promote code reuse.\n3. **Polymorphism**: Enabling one interface or method to perform different operations depending on the object type.\n4. **Abstraction**: Hiding internal implementation complexity and exposing only necessary functionality to the user.",
    "coreExplanation": [
      "**Limitations of Procedural Programming**: In procedural languages, related records are often tracked using parallel arrays (e.g. `String[] names`, `int[] rollNumbers`, `double[] marks`). If one array is sorted or updated independently, data synchronization is broken and student records are corrupted.",
      "**The OOP Class Solution**: OOP allows developers to create custom composite data types: `class Student { String name; int rollNo; double marks; }`. Data fields belonging to a single entity are bound together permanently.",
      "**Data Hiding & Security**: In procedural programming, global variables can be modified by any function in the program. OOP provides access specifiers (`private`, `public`, `protected`) so internal state cannot be tampered with directly.",
      "**Modularity & Ease of Maintenance**: OOP programs are organized into modular, independent classes. Modifying internal logic in one class does not cause unintended ripple effects across unrelated modules.",
      "**Code Reusability**: Through inheritance (`extends`) and object composition (`HAS-A`), existing, tested classes can be reused and extended without modifying original source code."
    ],
    "codeSnippet": {
      "title": "Procedural Parallel Arrays vs. Clean OOP Class Structure",
      "code": "// PROCEDURAL APPROACH (Fragile parallel arrays - prone to index desync):\n// String[] names = {\"Alice\", \"Bob\"};\n// int[] rolls = {101, 102};\n// double[] marks = {92.5, 84.0};\n\n// OBJECT-ORIENTED APPROACH (Cohesive, bundled entity):\nclass Student {\n    String name;\n    int rollNo;\n    double marks;\n\n    void displayDetails() {\n        System.out.println(\"Roll: \" + rollNo + \" | Name: \" + name + \" | Marks: \" + marks);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.name = \"Alice\";\n        s1.rollNo = 101;\n        s1.marks = 92.5;\n\n        s1.displayDetails();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 7-14",
          "explanation": "The Student class defines a cohesive data structure combining state (name, rollNo, marks) with behavior (displayDetails)."
        },
        {
          "line": "Line 18",
          "explanation": "'new Student()' instantiates a concrete student record on the JVM Heap memory."
        },
        {
          "line": "Lines 19-21",
          "explanation": "Instance fields are assigned values directly through the reference variable 's1'."
        },
        {
          "line": "Line 23",
          "explanation": "Invoking displayDetails() executes the method on s1's encapsulated data."
        }
      ],
      "output": "Roll: 101 | Name: Alice | Marks: 92.5"
    },
    "codeExamples": [
      {
        "title": "Example 1: Encapsulating State and Operations in BankAccount",
        "description": "Demonstrating how state (balance) and business logic (deposit, withdraw) are bundled together.",
        "code": "class BankAccount {\n    String accountHolder;\n    double balance;\n\n    void deposit(double amount) {\n        if (amount > 0) {\n            balance += amount;\n            System.out.println(\"Deposited: $\" + amount + \" | Current Balance: $\" + balance);\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount();\n        acc.accountHolder = \"Sarah\";\n        acc.balance = 500.0;\n        acc.deposit(150.0);\n    }\n}",
        "output": "Deposited: $150.0 | Current Balance: $650.0"
      },
      {
        "title": "Example 2: Modeling an Employee Entity",
        "description": "A standard class representing an employee record with salary calculation.",
        "code": "class Employee {\n    int empId;\n    String name;\n    double monthlySalary;\n\n    double getAnnualSalary() {\n        return monthlySalary * 12;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee emp = new Employee();\n        emp.empId = 201;\n        emp.name = \"David\";\n        emp.monthlySalary = 4500.0;\n        System.out.println(emp.name + \" Annual CTC: $\" + emp.getAnnualSalary());\n    }\n}",
        "output": "David Annual CTC: $54000.0"
      }
    ],
    "interviewTakeaways": [
      "OOP vs POP: POP emphasizes algorithms and procedures; OOP emphasizes data and objects.",
      "4 Pillars of OOP: Encapsulation (data protection), Inheritance (reusability), Polymorphism (flexibility), and Abstraction (hiding complexity).",
      "Data Binding: A class binds instance variables and methods into a single unified type.",
      "Security: OOP restricts direct data access using access modifiers, unlike global procedural variables."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Using parallel primitive arrays to represent composite data entities",
        "whyItHappens": "Coming from procedural C programming where structs or classes were not utilized.",
        "howToFix": "Define a dedicated Java class with appropriate fields to represent the entity."
      },
      {
        "mistake": "Believing a class declaration occupies Heap memory for data",
        "whyItHappens": "Confusing a class definition with an instantiated object.",
        "howToFix": "Recognize that class definitions reside in Metaspace; Heap memory is allocated only when 'new' is executed."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Tracing Encapsulated State",
        "problemStatement": "What will be printed when running this program?",
        "code": "class Counter {\n    int count = 0;\n    void increment() { count++; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        c1.increment();\n        c1.increment();\n        System.out.println(c1.count);\n    }\n}",
        "options": [
          "0",
          "1",
          "2",
          "Compilation Error"
        ],
        "correctOptionIndex": 2,
        "hint": "The increment() method executes on the object's instance variable 'count' twice.",
        "solution": "2",
        "explanation": "c1.increment() runs twice on the 'count' variable of c1, incrementing it from 0 to 1, then to 2."
      },
      {
        "title": "Puzzle 2: Identifying the 4 Pillars of OOP",
        "problemStatement": "Which OOP principle is demonstrated by wrapping variables and methods together inside a class and restricting direct access?",
        "options": [
          "Polymorphism",
          "Encapsulation",
          "Inheritance",
          "Compilation"
        ],
        "correctOptionIndex": 1,
        "hint": "Focus on the wrapping and shielding of data.",
        "solution": "Encapsulation",
        "explanation": "Encapsulation is the fundamental OOP mechanism of wrapping data (variables) and code (methods) together into a single protective unit."
      },
      {
        "title": "Puzzle 3: Procedural vs Object-Oriented Modification",
        "problemStatement": "Why does OOP reduce software bugs compared to procedural programming with global variables?",
        "options": [
          "Because Java code is automatically translated into C++",
          "Because OOP encapsulates data within objects, preventing unauthorized external modification",
          "Because OOP eliminates the need for compiling code",
          "Because OOP removes memory limits"
        ],
        "correctOptionIndex": 1,
        "hint": "Think about variable scope and access control.",
        "solution": "Because OOP encapsulates data within objects, preventing unauthorized external modification",
        "explanation": "Encapsulation prevents arbitrary external functions from altering an object's internal state, ensuring data integrity."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the primary difference between Procedural Programming and Object-Oriented Programming?",
        "answer": "In Procedural Programming (POP), programs are organized around functions and procedures that operate on external, passive data. In Object-Oriented Programming (OOP), programs are structured around objects that bind data attributes and methods together into a single entity, providing data hiding and modularity.",
        "followUp": "Name the four fundamental principles of OOP.",
        "followUpAnswer": "The four pillars are Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (multiple implementations of a common interface), and Abstraction (hiding implementation complexity).",
        "keyPhrases": [
          "Functions vs Objects",
          "Data binding",
          "Encapsulation",
          "Inheritance",
          "Polymorphism",
          "Abstraction"
        ]
      },
      {
        "question": "What are the advantages of OOP over Procedural Programming?",
        "answer": "OOP provides better maintainability through modularity, enhanced security via data hiding, code reusability through inheritance, and flexibility via polymorphism. In contrast, procedural programs with global data become difficult to maintain as code size expands.",
        "followUp": "Can Java be considered a pure object-oriented language?",
        "followUpAnswer": "No, Java is not 100% pure OOP because it supports 8 primitive data types (int, float, boolean, etc.) that are not objects.",
        "keyPhrases": [
          "Modularity",
          "Data hiding",
          "Code reusability",
          "Primitive types"
        ]
      },
      {
        "question": "What is Encapsulation and how is it implemented in Java?",
        "answer": "Encapsulation is the technique of packaging variables and methods together into a single class while restricting direct access to the variables from outside the class. In Java, it is implemented by declaring fields as 'private' and providing public getter and setter methods.",
        "followUp": "What is the difference between Encapsulation and Data Hiding?",
        "followUpAnswer": "Data Hiding is a subset/goal of Encapsulation focused on making fields private. Encapsulation is the broader mechanism of wrapping data and related methods into a cohesive unit.",
        "keyPhrases": [
          "Private fields",
          "Getters and setters",
          "Wrapping data and methods"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which programming paradigm organizes software around objects and data rather than actions and logic?",
        "options": [
          "Procedural Programming",
          "Object-Oriented Programming",
          "Functional Programming only",
          "Assembly Programming"
        ],
        "correctIndex": 1,
        "explanation": "Object-Oriented Programming centers program design around objects combining state and behavior."
      },
      {
        "question": "Which of the following is NOT one of the 4 core pillars of OOP?",
        "options": [
          "Encapsulation",
          "Inheritance",
          "Compilation",
          "Polymorphism"
        ],
        "correctIndex": 2,
        "explanation": "The four pillars of OOP are Encapsulation, Abstraction, Inheritance, and Polymorphism. Compilation is a build step."
      },
      {
        "question": "What is a major problem with using parallel arrays to store related entity attributes?",
        "options": [
          "They cannot store numbers",
          "Sorting or modifying one array independently desynchronizes the dataset",
          "They take 100x more memory",
          "Java does not support arrays"
        ],
        "correctIndex": 1,
        "explanation": "Parallel arrays maintain no physical association in memory; updating one without the other leads to data corruption."
      },
      {
        "question": "How does Encapsulation protect object data in Java?",
        "options": [
          "By encrypting the bytecode on disk",
          "By restricting direct variable access using access specifiers like private",
          "By preventing the class from being compiled",
          "By making all variables static"
        ],
        "correctIndex": 1,
        "explanation": "Declaring fields private prevents arbitrary external code from modifying state directly."
      },
      {
        "question": "Which feature of OOP allows code to be reused and extended across classes?",
        "options": [
          "Inheritance",
          "Garbage Collection",
          "Serialization",
          "Type Casting"
        ],
        "correctIndex": 0,
        "explanation": "Inheritance allows a subclass to acquire fields and methods from a superclass, promoting code reusability."
      }
    ]
  },
  "what-is-a-class": {
    "id": "what-is-a-class",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.2",
    "title": "What is a Class? (Class Structure & Definition)",
    "subtitle": "Class declaration syntax, components of a class, state and behavior, and Metaspace memory layout",
    "estimatedMinutes": 6,
    "beginnerAnalogy": "A **Class** in Java is a user-defined blueprint, prototype, or template from which objects are created. It defines the set of properties (fields) and methods that are common to all objects of that type.\n\nA class is a **logical entity**, not a physical entity. When you declare a class in Java, no memory is allocated on the Heap for object data. The class simply declares what data every future object will hold and what actions it will be able to perform.\n\nA standard Java class declaration consists of:\n1. **Modifiers**: Keywords such as `public` or package-private (default).\n2. **Class Keyword & Name**: The `class` keyword followed by the class name in `PascalCase`.\n3. **Fields (Instance Variables)**: Attributes representing the state of an object.\n4. **Methods**: Functions representing the behavior of an object.\n5. **Constructors**: Special blocks for initializing new instances.",
    "coreExplanation": [
      "**Class Declaration Syntax**: Declared using the keyword `class`: `class ClassName { /* body */ }`.",
      "**Fields (State / Attributes)**: Variables defined inside the class body, outside of any method. They store the state of the object.",
      "**Methods (Behavior / Operations)**: Functions declared within the class that execute operations, perform calculations, or mutate instance variables.",
      "**Naming Conventions**: Class names follow `PascalCase` (e.g. `BankAccount`, `StudentRecord`). Field and method names follow `camelCase` (e.g. `accountNumber`, `calculateTax()`).",
      "**Source File Rules**: A `.java` source file can contain at most one `public` top-level class. If a class is declared `public`, the file name must match the class name exactly (`Student.java`).",
      "**Metaspace Memory**: When a class is loaded by the JVM ClassLoader, its structure, method bytecode, and static metadata are stored in the **Metaspace** (Method Area), requiring 0 bytes on the Heap."
    ],
    "codeSnippet": {
      "title": "Standard Java Class Declaration and Member Structure",
      "code": "// Class Declaration (The Blueprint)\nclass Student {\n    // 1. Fields (State / Attributes)\n    int id;\n    String name;\n    double gpa;\n\n    // 2. Method (Behavior / Action)\n    void displaySummary() {\n        System.out.println(\"ID: \" + id + \", Name: \" + name + \", GPA: \" + gpa);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // The class 'Student' is defined above\n        // Objects will be instantiated from this blueprint\n        System.out.println(\"Class Student compiled successfully.\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Line 2",
          "explanation": "The 'class' keyword defines a user-defined reference type named Student."
        },
        {
          "line": "Lines 4-6",
          "explanation": "Instance variables (id, name, gpa) represent the attributes that every Student object will possess."
        },
        {
          "line": "Lines 9-11",
          "explanation": "The displaySummary() method defines the behavior available to instances of this class."
        },
        {
          "line": "Line 13",
          "explanation": "The entry point class 'Main' containing the main method."
        }
      ],
      "output": "Class Student compiled successfully."
    },
    "codeExamples": [
      {
        "title": "Example 1: Rectangle Blueprint with Methods",
        "description": "A geometric class defining state (length, breadth) and behavioral methods (area, perimeter).",
        "code": "class Rectangle {\n    double length;\n    double breadth;\n\n    double calculateArea() {\n        return length * breadth;\n    }\n\n    double calculatePerimeter() {\n        return 2 * (length + breadth);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle rect = new Rectangle();\n        rect.length = 10.0;\n        rect.breadth = 5.0;\n        System.out.println(\"Area: \" + rect.calculateArea());\n        System.out.println(\"Perimeter: \" + rect.calculatePerimeter());\n    }\n}",
        "output": "Area: 50.0\nPerimeter: 30.0"
      },
      {
        "title": "Example 2: LightBulb State Toggling",
        "description": "A class defining boolean state and state transition methods.",
        "code": "class LightBulb {\n    boolean isOn = false;\n\n    void turnOn() {\n        isOn = true;\n    }\n\n    void turnOff() {\n        isOn = false;\n    }\n\n    void printStatus() {\n        System.out.println(\"Bulb status: \" + (isOn ? \"LIT\" : \"OFF\"));\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        LightBulb bulb = new LightBulb();\n        bulb.printStatus();\n        bulb.turnOn();\n        bulb.printStatus();\n    }\n}",
        "output": "Bulb status: OFF\nBulb status: LIT"
      }
    ],
    "interviewTakeaways": [
      "Class Definition: A logical blueprint or prototype defining attributes and methods common to instances.",
      "Memory Footprint: Declaring a class allocates 0 bytes on the Heap for data; metadata is loaded into Metaspace.",
      "Components: Fields (state), Methods (behavior), Constructors (initialization).",
      "Naming Conventions: PascalCase for class names; camelCase for methods and variables."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Trying to access instance fields directly using the class name (e.g. Student.name)",
        "whyItHappens": "Forgetting that a class blueprint does not hold individual object data.",
        "howToFix": "Instantiate an object using 'new Student()' and access fields via the instance reference."
      },
      {
        "mistake": "Having multiple public top-level classes in a single .java source file",
        "whyItHappens": "Not knowing the Java compiler requirement for public top-level classes.",
        "howToFix": "A .java file can contain at most ONE public class, and the filename must match it."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Class Definition vs Object Instance",
        "problemStatement": "What is the memory allocation on the Heap when the JVM loads a class definition with 10 fields before any 'new' is executed?",
        "options": [
          "40 bytes",
          "1024 bytes",
          "0 bytes of Heap memory",
          "Dependent on OS RAM"
        ],
        "correctOptionIndex": 2,
        "hint": "Does declaring a blueprint allocate memory for instances?",
        "solution": "0 bytes of Heap memory",
        "explanation": "Class definitions reside in Metaspace. No Heap memory is allocated until an object is created with the 'new' operator."
      },
      {
        "title": "Puzzle 2: Correct Java Class Naming Convention",
        "problemStatement": "Which of the following follows standard Java naming conventions for a class?",
        "options": [
          "bank_account",
          "bankAccount",
          "BankAccount",
          "BANKACCOUNT"
        ],
        "correctOptionIndex": 2,
        "hint": "Classes use PascalCase (capitalized words).",
        "solution": "BankAccount",
        "explanation": "Standard Java naming conventions dictate PascalCase (each word capitalized, no underscores) for class names."
      },
      {
        "title": "Puzzle 3: Source File Naming Rule",
        "problemStatement": "If a source file defines 'public class OrderManagement { ... }', what must the file be named?",
        "options": [
          "OrderManagement.java",
          "ordermanagement.java",
          "Order.java",
          "Main.java"
        ],
        "correctOptionIndex": 0,
        "hint": "The filename must match the public class name exactly, including letter casing.",
        "solution": "OrderManagement.java",
        "explanation": "In Java, the source file containing a public class must match the class name exactly, followed by the .java extension."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is a Class in Java?",
        "answer": "A Class in Java is a user-defined blueprint or prototype from which objects are created. It defines the state (instance variables) and behavior (methods) that all instances instantiated from it will possess. A class is a logical construct that occupies memory in Metaspace, not the Heap.",
        "followUp": "What is the difference between a class and an object?",
        "followUpAnswer": "A class is a compile-time blueprint with 0 heap footprint for data. An object is a concrete, runtime instance stamped onto the Heap using the 'new' operator.",
        "keyPhrases": [
          "User-defined blueprint",
          "Logical construct",
          "State and behavior",
          "Metaspace vs Heap"
        ]
      },
      {
        "question": "What are the components of a Java Class?",
        "answer": "A Java class can contain: 1) Fields (instance and static variables), 2) Methods (instance and static methods), 3) Constructors (for initialization), 4) Initialization blocks (static and instance blocks), and 5) Nested classes and interfaces.",
        "followUp": "Can a class exist without any methods or fields?",
        "followUpAnswer": "Yes. A class can be empty (e.g. 'class Empty {}'). It still inherits methods from java.lang.Object and receives a default constructor.",
        "keyPhrases": [
          "Fields",
          "Methods",
          "Constructors",
          "Blocks",
          "Empty class"
        ]
      },
      {
        "question": "Can a single Java file have multiple classes?",
        "answer": "Yes, a single Java source file can contain multiple classes, but at most ONE of them can be declared 'public'. The name of the source file must match the name of the public class. If there is no public class, the file can take any valid name.",
        "followUp": "Why does Java enforce that a public class name match the file name?",
        "followUpAnswer": "This allows the Java compiler and JVM ClassLoader to quickly find and load class bytecode on the filesystem without having to parse through every file.",
        "keyPhrases": [
          "At most one public class",
          "Filename matching",
          "ClassLoader lookup efficiency"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What does a Class in Java define?",
        "options": [
          "The blueprint for state (attributes) and behavior (methods) of future instances",
          "The physical RAM address on the computer motherboard",
          "The compile time in seconds",
          "The network IP address"
        ],
        "correctIndex": 0,
        "explanation": "A class defines the attributes and operations that all instances created from it will possess."
      },
      {
        "question": "Where does the JVM store class bytecode and metadata?",
        "options": [
          "Metaspace (Method Area)",
          "Heap memory",
          "Call Stack",
          "Hard drive partition"
        ],
        "correctIndex": 0,
        "explanation": "Class metadata and bytecode reside in Metaspace."
      },
      {
        "question": "Which keyword is used to declare a class in Java?",
        "options": [
          "class",
          "struct",
          "object",
          "define"
        ],
        "correctIndex": 0,
        "explanation": "The 'class' keyword is used to declare classes in Java."
      },
      {
        "question": "How many public top-level classes can exist in a single .java source file?",
        "options": [
          "At most 1",
          "Unlimited",
          "At least 2",
          "0"
        ],
        "correctIndex": 0,
        "explanation": "Java enforces a limit of at most one public class per source file."
      },
      {
        "question": "What is an instance variable?",
        "options": [
          "A variable declared inside a class body but outside any method",
          "A variable declared inside a for loop",
          "A parameter passed to the main method",
          "A constant defined in an interface"
        ],
        "correctIndex": 0,
        "explanation": "Instance variables are declared inside the class body outside methods and belong to each instance."
      }
    ]
  },
  "creating-objects-with-new": {
    "id": "creating-objects-with-new",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.3",
    "title": "Creating Objects with the 'new' Keyword",
    "subtitle": "Object instantiation on the Heap, the dot operator (member access), and independent instance state",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "An **Object** in Java is a basic runtime unit of an Object-Oriented system. It is a concrete instance of a class materialized in memory.\n\nWhen a class is defined, no memory is allocated. Memory is allocated only when an object is instantiated using the **`new`** keyword.\n\nAn object possesses three primary characteristics:\n1. **State**: Represented by the attributes or instance variables of the object.\n2. **Behavior**: Represented by the methods that the object executes.\n3. **Identity**: A unique memory address assigned to the object by the JVM to distinguish it from other instances.\n\nFrom one class definition, multiple independent objects can be created on the Heap. Modifying fields in one object does not alter fields in another object.",
    "coreExplanation": [
      "**The 3 Steps of Object Creation**:\n   1. **Declaration**: `Student s;` declares a reference variable of type `Student` on the Stack.\n   2. **Instantiation**: The `new` keyword calculates the memory size required, allocates space on the Heap, and returns the address.\n   3. **Initialization**: The constructor `Student()` is invoked to initialize the newly created object's fields.",
      "**The Dot Operator (`.`)**: Used as the member access or dereferencing operator. Syntax: `objectReference.variableName` or `objectReference.methodName()`.",
      "**State Independence**: Every object created with `new` is allocated at a distinct memory address on the Heap. Each instance maintains its own dedicated copy of all instance variables.",
      "**Declaration vs Instantiation**: Writing `Student s;` merely creates a reference variable holding `null`. The object does not exist in memory until `= new Student()` is executed.",
      "**Anonymous Objects**: An object instantiated without assigning its address to a named reference variable (e.g., `new Student().display();`). Useful for one-time operations."
    ],
    "codeSnippet": {
      "title": "Instantiating Independent Objects with 'new'",
      "code": "class Dog {\n    String breed;\n    int age;\n\n    void bark() {\n        System.out.println(breed + \" barks: Woof! Woof!\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 1. Create first Dog instance\n        Dog dog1 = new Dog();\n        dog1.breed = \"Labrador\";\n        dog1.age = 3;\n\n        // 2. Create second independent Dog instance\n        Dog dog2 = new Dog();\n        dog2.breed = \"Bulldog\";\n        dog2.age = 5;\n\n        // 3. Verify state independence\n        dog1.bark();\n        dog2.bark();\n        System.out.println(dog1.breed + \" age: \" + dog1.age);\n        System.out.println(dog2.breed + \" age: \" + dog2.age);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Line 12",
          "explanation": "'new Dog()' allocates a new Dog object on the Heap. The reference variable 'dog1' stores its memory address."
        },
        {
          "line": "Lines 13-14",
          "explanation": "Using the dot operator, we assign values to dog1's instance variables."
        },
        {
          "line": "Line 17",
          "explanation": "'new Dog()' allocates a separate, distinct Dog object on the Heap for dog2."
        },
        {
          "line": "Lines 22-25",
          "explanation": "Calling bark() and reading age verifies that dog1 and dog2 maintain completely independent state."
        }
      ],
      "output": "Labrador barks: Woof! Woof!\nBulldog barks: Woof! Woof!\nLabrador age: 3\nBulldog age: 5"
    },
    "codeExamples": [
      {
        "title": "Example 1: State Isolation Between Accounts",
        "description": "Mutating fields in account A has zero effect on account B.",
        "code": "class Account {\n    int accNo;\n    double balance;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Account a1 = new Account();\n        Account a2 = new Account();\n        a1.accNo = 1001;\n        a1.balance = 500.0;\n        a2.accNo = 1002;\n        a2.balance = 1200.0;\n\n        a1.balance += 200.0; // Mutates only a1\n\n        System.out.println(\"Account 1 Balance: \" + a1.balance);\n        System.out.println(\"Account 2 Balance: \" + a2.balance);\n    }\n}",
        "output": "Account 1 Balance: 700.0\nAccount 2 Balance: 1200.0"
      },
      {
        "title": "Example 2: Anonymous Object Invocation",
        "description": "Invoking a method directly on an object instantiated without storing its reference.",
        "code": "class Calculation {\n    int square(int n) {\n        return n * n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Anonymous object creation and immediate method invocation\n        int result = new Calculation().square(6);\n        System.out.println(\"Square of 6: \" + result);\n    }\n}",
        "output": "Square of 6: 36"
      }
    ],
    "interviewTakeaways": [
      "What is an Object: An instance of a class with state, behavior, and unique identity.",
      "Role of 'new': Dynamically allocates memory on the Heap, zero-initializes fields, invokes the constructor, and returns the reference address.",
      "Dot Operator (.): Used to dereference the object reference and access its fields and methods.",
      "Anonymous Object: An object instantiated without assigning its address to a named variable."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Declaring a reference variable without instantiating it with 'new' (e.g. Car c; c.drive();)",
        "whyItHappens": "Assuming declaration automatically allocates an object in memory.",
        "howToFix": "Instantiate using 'new': Car c = new Car();"
      },
      {
        "mistake": "Thinking modifying fields in one object modifies other objects of the same class",
        "whyItHappens": "Forgetting that each object is allocated independently on the Heap.",
        "howToFix": "Recognize that each object has its own separate instance variables."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Tracing Object Allocation",
        "problemStatement": "Where does the 'new' keyword allocate memory for an object in Java?",
        "options": [
          "On the Call Stack",
          "In the JVM Heap",
          "Inside CPU registers only",
          "In Metaspace"
        ],
        "correctOptionIndex": 1,
        "hint": "Heap memory is the global area for objects.",
        "solution": "In the JVM Heap",
        "explanation": "All objects in Java created via 'new' are allocated dynamically in Heap memory."
      },
      {
        "title": "Puzzle 2: The Dot Operator Function",
        "problemStatement": "Which operator is used to access fields and methods of an object in Java?",
        "options": [
          "Arrow operator (->)",
          "Dot operator (.)",
          "Scope resolution operator (::)",
          "Colon (:)"
        ],
        "correctOptionIndex": 1,
        "hint": "Syntax: object.member.",
        "solution": "Dot operator (.)",
        "explanation": "The dot operator (.) is used to access member variables and invoke member methods."
      },
      {
        "title": "Puzzle 3: Anonymous Object Characteristics",
        "problemStatement": "What is an anonymous object in Java?",
        "options": [
          "An object created without assigning its reference to a variable",
          "An object with no fields",
          "An object created in private mode",
          "An object that cannot be garbage collected"
        ],
        "correctOptionIndex": 0,
        "hint": "Syntax: new ClassName().method();",
        "solution": "An object created without assigning its reference to a variable",
        "explanation": "An anonymous object is instantiated simply as 'new ClassName()' without storing its memory address in a reference variable."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What happens in memory when you execute 'Student s = new Student();'?",
        "answer": "Three primary operations occur: 1) The reference variable 's' is allocated on the Call Stack. 2) The 'new' keyword allocates memory for the Student object on the Heap and zero-initializes all instance fields. 3) The constructor Student() is invoked, and the memory address of the heap object is assigned to 's'.",
        "followUp": "Can an object exist on the Stack in Java?",
        "followUpAnswer": "Standard Java allocates all objects on the Heap. However, modern JVMs with escape analysis (JIT compiler) can optimize local, non-escaping objects by scalar-replacing them onto the Stack.",
        "keyPhrases": [
          "Stack reference variable",
          "Heap allocation",
          "Constructor execution",
          "Escape analysis"
        ]
      },
      {
        "question": "What is the difference between an Object and a Reference Variable?",
        "answer": "An Object is a concrete instance of a class allocated on the Heap that contains the actual state and data. A Reference Variable is a pointer allocated on the Stack that holds the memory address of that heap object.",
        "followUp": "How many bytes does a reference variable occupy?",
        "followUpAnswer": "In a 32-bit JVM it occupies 4 bytes. In a 64-bit JVM, it occupies 8 bytes (or 4 bytes when Compressed OOPs is enabled).",
        "keyPhrases": [
          "Heap object vs Stack pointer",
          "Memory address",
          "Compressed OOPs"
        ]
      },
      {
        "question": "What are anonymous objects, and when are they used?",
        "answer": "An anonymous object is an object created without assigning its reference address to a named variable (e.g. 'new Calculation().fact(5);'). They are used when an object is needed for a single method call and does not need to be referenced again.",
        "followUp": "When do anonymous objects become eligible for Garbage Collection?",
        "followUpAnswer": "Immediately after the single statement finishes execution, because there are zero live reference variables pointing to it.",
        "keyPhrases": [
          "No named reference variable",
          "One-time invocation",
          "Immediate GC eligibility"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Which keyword is used to allocate memory dynamically for an object in Java?",
        "options": [
          "alloc",
          "new",
          "malloc",
          "create"
        ],
        "correctIndex": 1,
        "explanation": "The 'new' keyword allocates heap memory for objects in Java."
      },
      {
        "question": "Where does the reference variable live in memory?",
        "options": [
          "On the Call Stack",
          "In the Heap",
          "In Metaspace",
          "In the database"
        ],
        "correctIndex": 0,
        "explanation": "Local reference variables are stored on the method's Call Stack frame."
      },
      {
        "question": "What are the three steps in object creation in Java?",
        "options": [
          "Declaration, Instantiation, Initialization",
          "Definition, Execution, Termination",
          "Allocation, Deallocation, Garbage Collection",
          "Import, Compile, Run"
        ],
        "correctIndex": 0,
        "explanation": "Object creation involves Declaration (type & name), Instantiation (new keyword), and Initialization (constructor)."
      },
      {
        "question": "If 'car1' and 'car2' are two objects created via 'new Car()', what happens when 'car1.speed = 80;' is run?",
        "options": [
          "Only car1's speed is updated; car2's speed remains unchanged",
          "Both car1 and car2 speeds are updated to 80",
          "The program crashes",
          "The class definition is updated"
        ],
        "correctIndex": 0,
        "explanation": "Every object maintains independent instance variable storage on the Heap."
      },
      {
        "question": "What is the result of 'new Scanner(System.in).nextLine();'?",
        "options": [
          "Creates an anonymous Scanner object, reads a line, and makes the Scanner eligible for GC",
          "Throws a compile error because no variable name is provided",
          "Creates a static object",
          "Runs in infinite loop"
        ],
        "correctIndex": 0,
        "explanation": "This uses an anonymous object to perform a one-time method call."
      }
    ]
  },
  "references-and-memory": {
    "id": "references-and-memory",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.4",
    "title": "Object References & Memory (Stack vs Heap, Aliasing & Null)",
    "subtitle": "JVM Stack memory vs Heap memory, reference pointer mechanics, aliasing, and default initialization",
    "estimatedMinutes": 8,
    "beginnerAnalogy": "The JVM divides runtime data memory into distinct logical regions, primarily the **Call Stack** and the **Heap**.\n\n1. **Stack Memory**: Used for thread execution. It stores primitive local variables and **reference variables** (pointers). Stack memory is allocated and deallocated automatically in Last-In, First-Out (LIFO) order as methods enter and return.\n\n2. **Heap Memory**: The shared global memory region where all Java objects and JRE classes are materialized at runtime via `new`. Heap memory is managed by the Garbage Collector.\n\nWhen you declare `Student s = new Student();`, the variable `s` lives on the Stack and stores the **memory address** of the `Student` object residing on the Heap. A reference variable does not contain the object data itself; it holds a pointer to that object.",
    "coreExplanation": [
      "**Stack vs Heap Separation**: Reference variables live in the calling method's Stack frame. The actual instance variables and object payload live in the Heap.",
      "**Reference Assignment (Aliasing)**: Writing `Student s2 = s1;` does NOT duplicate the object. It copies the memory address. Both `s1` and `s2` now point to the identical heap address. Mutating state through `s2` modifies what `s1` observes.",
      "**Automatic Default Initialization**: When an object is allocated on the Heap, the JVM zero-initializes all instance fields to predictable type defaults:\n   - Primitives: `byte`, `short`, `int`, `long` default to `0`; `float`, `double` default to `0.0`; `boolean` defaults to `false`; `char` defaults to `\\u0000`.\n   - Reference Types: All class and array references default to `null`.",
      "**Local Variables vs Instance Variables**: Unlike instance variables, local variables declared inside a method receive NO default values. Attempting to read an unassigned local variable causes a compile-time error.",
      "**The 'null' Literal**: A reference variable assigned to `null` points to memory address `0x0` (no heap instance).",
      "**NullPointerException (NPE)**: Attempting to invoke a method or access a field on a reference holding `null` throws `java.lang.NullPointerException` at runtime."
    ],
    "codeSnippet": {
      "title": "Stack vs Heap, Reference Aliasing, and Default Initialization",
      "code": "class Student {\n    int id;          // Defaults to 0\n    String name;     // Defaults to null\n    boolean isActive;// Defaults to false\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // 1. Instantiation: s1 holds the heap memory address\n        Student s1 = new Student();\n        System.out.println(\"Default id: \" + s1.id);\n        System.out.println(\"Default name: \" + s1.name);\n        System.out.println(\"Default isActive: \" + s1.isActive);\n\n        // 2. Set field values\n        s1.id = 101;\n        s1.name = \"Alice\";\n\n        // 3. Reference Aliasing: s2 copies the memory address of s1\n        Student s2 = s1;\n        s2.name = \"Bob\"; // Mutating via s2\n\n        // 4. Both references point to the same object\n        System.out.println(\"s1 name: \" + s1.name);\n        System.out.println(\"s2 name: \" + s2.name);\n        System.out.println(\"Are references equal? \" + (s1 == s2));\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 2-4",
          "explanation": "Instance fields are automatically initialized to 0, null, and false upon heap allocation."
        },
        {
          "line": "Line 10",
          "explanation": "'s1' is stored on the Stack; the Student object is allocated on the Heap."
        },
        {
          "line": "Line 20",
          "explanation": "'s2 = s1' copies the heap address from s1 into s2. No new object is created."
        },
        {
          "line": "Line 21",
          "explanation": "Modifying s2.name updates the shared heap object."
        },
        {
          "line": "Line 26",
          "explanation": "'s1 == s2' evaluates to true because both reference variables store identical memory addresses."
        }
      ],
      "output": "Default id: 0\nDefault name: null\nDefault isActive: false\ns1 name: Bob\ns2 name: Bob\nAre references equal? true"
    },
    "codeExamples": [
      {
        "title": "Example 1: Safe Null Checking to Prevent NullPointerException",
        "description": "Demonstrating defensive null checks before accessing object members.",
        "code": "class Account {\n    int accNo = 501;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Account acc = null;\n\n        if (acc != null) {\n            System.out.println(\"Account: \" + acc.accNo);\n        } else {\n            System.out.println(\"Reference is null. No object found.\");\n        }\n    }\n}",
        "output": "Reference is null. No object found."
      },
      {
        "title": "Example 2: Method Reference Passing (Pass-by-Value)",
        "description": "Passing an object reference to a method copies the address; mutations inside the method affect the caller's object.",
        "code": "class Marks {\n    int score = 40;\n}\n\npublic class Main {\n    static void addGraceMarks(Marks m) {\n        m.score += 10; // Modifies the object at the received address\n    }\n\n    public static void main(String[] args) {\n        Marks studentMarks = new Marks();\n        addGraceMarks(studentMarks);\n        System.out.println(\"Updated Score: \" + studentMarks.score);\n    }\n}",
        "output": "Updated Score: 50"
      }
    ],
    "interviewTakeaways": [
      "Stack vs Heap: References live on the Stack; object payloads live in the Heap.",
      "Aliasing: 's2 = s1' copies the pointer address, not the object data.",
      "Default Initialization: Heap instance fields are automatically zero-initialized (0, 0.0, false, null); local variables have no defaults.",
      "Null Reference: Holding 'null' means referencing address 0x0. Member dereferencing causes NullPointerException.",
      "Equality with '==': Checks referential identity (memory address), not field values."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Assuming 's2 = s1' creates a duplicate or clone of the object",
        "whyItHappens": "Confusing primitive value copying with object reference assignment.",
        "howToFix": "Use a copy constructor or clone method if an independent copy is needed."
      },
      {
        "mistake": "Dereferencing a reference variable without verifying it is non-null",
        "whyItHappens": "Invoking methods on variables that were never initialized or were set to null.",
        "howToFix": "Validate with 'if (ref != null)' before accessing members."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Reference Aliasing Mutation",
        "problemStatement": "What is the output of the following program?",
        "code": "class Item {\n    int price = 100;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Item i1 = new Item();\n        Item i2 = i1;\n        i2.price = 250;\n        System.out.println(i1.price);\n    }\n}",
        "options": [
          "100",
          "250",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "i1 and i2 refer to the identical object in Heap memory.",
        "solution": "250",
        "explanation": "Because 'i2 = i1' copies the reference address, both i1 and i2 refer to the same Item object. Mutating i2.price modifies the object seen by i1."
      },
      {
        "title": "Puzzle 2: Default Field Values in Java",
        "problemStatement": "What are the default values of an unassigned boolean field and an unassigned String field in a class?",
        "options": [
          "false and null",
          "true and \"\"",
          "0 and null",
          "false and undefined"
        ],
        "correctOptionIndex": 0,
        "hint": "Booleans default to false; reference types default to null.",
        "solution": "false and null",
        "explanation": "In Java, boolean instance variables default to false, and reference types (like String) default to null."
      },
      {
        "title": "Puzzle 3: The Null Dereference Consequence",
        "problemStatement": "What happens when executing 'String str = null; str.length();'?",
        "options": [
          "Returns 0",
          "Returns -1",
          "Throws java.lang.NullPointerException at runtime",
          "Compile-time error"
        ],
        "correctOptionIndex": 2,
        "hint": "Dereferencing null produces a runtime exception.",
        "solution": "Throws java.lang.NullPointerException at runtime",
        "explanation": "Attempting to invoke any instance method on a null reference throws a runtime NullPointerException."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between Stack Memory and Heap Memory in Java?",
        "answer": "Stack Memory is used for execution of threads and holds primitive local variables and references to heap objects. Stack memory allocation is fast and managed in LIFO order per stack frame. Heap Memory is the shared memory area where all objects and JRE classes are allocated dynamically using 'new' and managed by the Garbage Collector.",
        "followUp": "What error occurs when Stack memory or Heap memory is exhausted?",
        "followUpAnswer": "Stack exhaustion results in java.lang.StackOverflowError (common with infinite recursion). Heap exhaustion results in java.lang.OutOfMemoryError: Java heap space.",
        "keyPhrases": [
          "LIFO thread stack",
          "Dynamic heap allocation",
          "StackOverflowError vs OutOfMemoryError"
        ]
      },
      {
        "question": "What is reference aliasing, and what are its implications?",
        "answer": "Reference aliasing occurs when two or more reference variables hold the memory address of the exact same object in the Heap. Any mutation performed through one alias directly alters the state observed by all other aliases.",
        "followUp": "How do you create an independent copy instead of an alias?",
        "followUpAnswer": "By explicitly instantiating a new object with 'new' and copying field values across, using a copy constructor, or implementing the Prototype/Cloneable pattern.",
        "keyPhrases": [
          "Multiple references to one heap object",
          "Shared mutation",
          "Copy constructor"
        ]
      },
      {
        "question": "Why do instance variables receive default values while local variables do not?",
        "answer": "When the JVM allocates heap memory for an object via 'new', it initializes the memory block to zeroes for data integrity and safety. Local variables reside in reused stack frame memory; the compiler enforces explicit initialization before read to prevent reading stale memory artifacts.",
        "followUp": "What is the default value of an uninitialized local variable if printed?",
        "followUpAnswer": "It does not compile. The Java compiler emits: 'variable might not have been initialized'.",
        "keyPhrases": [
          "Zero-initialization on Heap",
          "Stack frame memory reuse",
          "Compile-time error for uninitialized local"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What does 'Student s2 = s1;' do in Java?",
        "options": [
          "Copies the memory address so both references point to the same object",
          "Clones the student object into a second heap instance",
          "Deletes s1",
          "Throws a compile error"
        ],
        "correctIndex": 0,
        "explanation": "Object assignment copies the memory pointer, not the heap object itself."
      },
      {
        "question": "What is the default value of an uninitialized double instance variable?",
        "options": [
          "0.0",
          "0",
          "null",
          "NaN"
        ],
        "correctIndex": 0,
        "explanation": "Double instance variables automatically default to 0.0."
      },
      {
        "question": "What does '==' compare when applied to two object reference variables?",
        "options": [
          "Whether both references point to the exact same memory address in the Heap",
          "Whether the fields inside the objects have equal values",
          "Whether both objects have the same class name",
          "Whether both objects are active in the same thread"
        ],
        "correctIndex": 0,
        "explanation": "The '==' operator checks referential identity (memory addresses)."
      },
      {
        "question": "What happens when an unassigned local variable is accessed in a method?",
        "options": [
          "Compile-time error: variable might not have been initialized",
          "It defaults to 0 or null",
          "Runtime NullPointerException",
          "It prints random memory bytes"
        ],
        "correctIndex": 0,
        "explanation": "The Java compiler requires all local variables to be explicitly initialized before reading."
      },
      {
        "question": "What is the value of a reference variable pointing to address 0x0?",
        "options": [
          "null",
          "0",
          "undefined",
          "false"
        ],
        "correctIndex": 0,
        "explanation": "In Java, address 0x0 is represented by the keyword 'null'."
      }
    ]
  },
  "constructors-initialization": {
    "id": "constructors-initialization",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.5",
    "title": "Constructors in Java (Default vs Parameterized & Overloading)",
    "subtitle": "Constructor definition, syntax rules, default vs parameterized constructors, and constructor overloading",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "A **Constructor** in Java is a special member block similar to a method that is invoked automatically when an instance of a class is created using the `new` keyword.\n\nThe primary purpose of a constructor is to **initialize the state (instance variables)** of a newly created object.\n\n**Strict Syntax Rules for Constructors**:\n1. The constructor name **must match the class name** exactly (case-sensitive).\n2. A constructor **must have NO explicit return type**\u2014not even `void`!\n3. A constructor cannot be `abstract`, `static`, `final`, or `synchronized`.",
    "coreExplanation": [
      "**Why Use Constructors**: Without constructors, instance variables must be initialized line-by-line after allocation (`s.id = 1; s.name = \"Alice\";`). This approach is repetitive, error-prone, and leaves objects in an incompletely initialized state if an assignment is omitted.",
      "**The 'void' Trap**: If an explicit return type such as `void` is declared on a constructor (e.g. `public void Student()`), the Java compiler treats it as a regular instance method. It will NOT be executed during object creation with `new`.",
      "**Default Constructor (No-Arg Constructor)**: If a class declares NO constructors, the Java compiler automatically generates a public, 0-argument default constructor. It initializes instance variables to their type defaults and invokes `super()`.",
      "**Parameterized Constructor**: A constructor that accepts arguments used to initialize instance variables with custom values at the time of creation.",
      "**The Disappearing Default Constructor**: When at least one custom constructor (parameterized or no-arg) is defined, the Java compiler ceases to generate the automatic default constructor. If a 0-argument constructor is still required, it must be explicitly defined.",
      "**Constructor Overloading**: Defining multiple constructors with different parameter signatures (differing by count, type, or order of parameters) within the same class."
    ],
    "codeSnippet": {
      "title": "Default, Parameterized, and Overloaded Constructors in Java",
      "code": "class Student {\n    int id;\n    String name;\n    int age;\n\n    // 1. Parameterized Constructor\n    Student(int i, String n, int a) {\n        id = i;\n        name = n;\n        age = a;\n    }\n\n    // 2. Overloaded Constructor (2 arguments - default age 18)\n    Student(int i, String n) {\n        id = i;\n        name = n;\n        age = 18;\n    }\n\n    // 3. Explicit No-Argument Constructor\n    Student() {\n        id = 0;\n        name = \"Unassigned\";\n        age = 18;\n    }\n\n    void display() {\n        System.out.println(\"ID: \" + id + \", Name: \" + name + \", Age: \" + age);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\", 20); // Invokes 3-arg constructor\n        Student s2 = new Student(102, \"Bob\");        // Invokes 2-arg constructor\n        Student s3 = new Student();                  // Invokes 0-arg constructor\n\n        s1.display();\n        s2.display();\n        s3.display();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 7-11",
          "explanation": "Parameterized constructor initializes all three fields (id, name, age) at birth."
        },
        {
          "line": "Lines 14-18",
          "explanation": "Overloaded 2-parameter constructor sets id and name, defaulting age to 18."
        },
        {
          "line": "Lines 21-25",
          "explanation": "Explicit 0-argument constructor provides default values when no parameters are passed."
        },
        {
          "line": "Lines 34-36",
          "explanation": "Each 'new Student(...)' invocation matches the constructor with the corresponding parameter signature."
        }
      ],
      "output": "ID: 101, Name: Alice, Age: 20\nID: 102, Name: Bob, Age: 18\nID: 0, Name: Unassigned, Age: 18"
    },
    "codeExamples": [
      {
        "title": "Example 1: The Disappearing Default Constructor Compiler Error",
        "description": "Demonstrating the compile-time error when calling new ClassName() after defining a custom constructor.",
        "code": "class Product {\n    int productId;\n\n    // Custom constructor defined\n    Product(int id) {\n        productId = id;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Product p1 = new Product(501); // OK\n        // Product p2 = new Product(); // COMPILE ERROR: constructor Product in class Product cannot be applied to given types\n        System.out.println(\"Product ID: \" + p1.productId);\n    }\n}",
        "output": "Product ID: 501"
      },
      {
        "title": "Example 2: Overloaded Box Constructors for Cube and Cuboid",
        "description": "Constructors accepting either one dimension (cube) or three dimensions (cuboid).",
        "code": "class Box {\n    double width, height, depth;\n\n    // Cuboid constructor\n    Box(double w, double h, double d) {\n        width = w;\n        height = h;\n        depth = d;\n    }\n\n    // Cube constructor\n    Box(double len) {\n        width = height = depth = len;\n    }\n\n    double volume() {\n        return width * height * depth;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box cuboid = new Box(10, 20, 15);\n        Box cube = new Box(10);\n        System.out.println(\"Cuboid volume: \" + cuboid.volume());\n        System.out.println(\"Cube volume: \" + cube.volume());\n    }\n}",
        "output": "Cuboid volume: 3000.0\nCube volume: 1000.0"
      }
    ],
    "interviewTakeaways": [
      "Constructor Purpose: Special initialization block invoked automatically during 'new'.",
      "Rules: Name matches class exactly; zero return type (not even void).",
      "Default Constructor: Generated by the compiler if and only if zero constructors are written in the class.",
      "Revocation: Declaring any custom constructor eliminates the automatic default constructor.",
      "Overloading: Permitted as long as parameter lists differ in type, count, or sequence."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Adding 'void' to a constructor declaration (e.g. public void Student())",
        "whyItHappens": "Habit of specifying return types on all methods.",
        "howToFix": "Remove 'void'. Constructors must never declare a return type."
      },
      {
        "mistake": "Attempting to invoke new ClassName() after creating a parameterized constructor without an explicit 0-arg constructor",
        "whyItHappens": "Assuming Java's default constructor is still available.",
        "howToFix": "Explicitly add a no-argument constructor to the class."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: The 'void' Constructor Trap",
        "problemStatement": "What is the output of the following program?",
        "code": "class Test {\n    int val = 10;\n    void Test() {\n        val = 50;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Test t = new Test();\n        System.out.println(t.val);\n    }\n}",
        "options": [
          "50",
          "10",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Notice 'void Test()'. Is it a constructor or a method?",
        "solution": "10",
        "explanation": "Because 'void Test()' specifies a return type (void), Java treats it as a standard instance method named 'Test'. It was not called; the compiler-provided default constructor ran, leaving val at 10."
      },
      {
        "title": "Puzzle 2: Missing Default Constructor",
        "problemStatement": "What happens when compiling 'class A { A(int x){} } class B { public static void main(String[] args){ A a = new A(); } }'?",
        "options": [
          "Compiles and runs cleanly",
          "Compile error: constructor A in class A cannot be applied to given types",
          "Runtime exception",
          "Outputs null"
        ],
        "correctOptionIndex": 1,
        "hint": "Defining A(int x) removes the default constructor.",
        "solution": "Compile error: constructor A in class A cannot be applied to given types",
        "explanation": "Defining a 1-parameter constructor removes the default no-arg constructor. Invoking 'new A()' causes a compile error."
      },
      {
        "title": "Puzzle 3: Constructor Overloading Resolution",
        "problemStatement": "Which constructor is invoked by 'new Demo(10.5f)' if Demo has Demo(int) and Demo(double)?",
        "options": [
          "Demo(int)",
          "Demo(double)",
          "Both",
          "Compile error"
        ],
        "correctOptionIndex": 1,
        "hint": "Float widens to double automatically.",
        "solution": "Demo(double)",
        "explanation": "A float argument widens implicitly to double, matching Demo(double)."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is a Constructor in Java, and how does it differ from a Method?",
        "answer": "A constructor is an initialization block used to set up the state of a new object upon creation. It has the same name as the class, has no return type, and is invoked implicitly by 'new'. A method defines object behavior, must declare a return type (or void), and is invoked explicitly via the dot operator.",
        "followUp": "Can a constructor be inherited in Java?",
        "followUpAnswer": "No. Constructors are not inherited by subclasses. A subclass constructor invokes a superclass constructor via super().",
        "keyPhrases": [
          "Initialization vs Behavior",
          "No return type",
          "Constructors are not inherited"
        ]
      },
      {
        "question": "What is the Default Constructor in Java?",
        "answer": "The default constructor is a 0-argument constructor inserted by the Java compiler if no constructors are declared in the class. It initializes fields to default values and calls the superclass constructor super().",
        "followUp": "What happens when a developer defines any constructor?",
        "followUpAnswer": "The compiler immediately revokes the free default constructor. If a no-arg constructor is still needed, the developer must declare it explicitly.",
        "keyPhrases": [
          "Compiler-generated 0-arg constructor",
          "Revoked upon custom constructor"
        ]
      },
      {
        "question": "Can a constructor be declared private, and what is the use case?",
        "answer": "Yes, a constructor can be declared private. A private constructor prevents external classes from directly instantiating the class. Common use cases include Singleton pattern design and pure static utility classes (e.g. java.lang.Math).",
        "followUp": "Can a constructor be declared static or final?",
        "followUpAnswer": "No. A constructor cannot be static, final, or abstract. Marking a constructor with these keywords causes a compile-time error.",
        "keyPhrases": [
          "Private constructor",
          "Singleton pattern",
          "Cannot be static or final"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the return type of a Java constructor?",
        "options": [
          "No return type (not even void)",
          "void",
          "The class type",
          "int"
        ],
        "correctIndex": 0,
        "explanation": "Constructors must never declare any return type."
      },
      {
        "question": "When does Java automatically generate the default constructor?",
        "options": [
          "Only when zero constructors are defined in the class",
          "Always, even if custom constructors are present",
          "Only if the class is public",
          "Only in abstract classes"
        ],
        "correctIndex": 0,
        "explanation": "The default constructor is only provided if no constructors exist in the class."
      },
      {
        "question": "What happens if a class defines 'int Employee() { return 10; }'?",
        "options": [
          "Java treats it as an ordinary instance method named Employee, not a constructor",
          "It causes a compile error",
          "It becomes a constructor that returns an integer",
          "The class cannot be compiled"
        ],
        "correctIndex": 0,
        "explanation": "Specifying a return type turns it into a regular method."
      },
      {
        "question": "Can constructors be overloaded in Java?",
        "options": [
          "Yes, by providing differing parameter signatures",
          "No, a class can have only one constructor",
          "Only if each constructor has a different name",
          "Only in child classes"
        ],
        "correctIndex": 0,
        "explanation": "A class can declare multiple overloaded constructors with different parameter lists."
      },
      {
        "question": "Which modifier is NOT permitted on a constructor?",
        "options": [
          "static",
          "public",
          "private",
          "protected"
        ],
        "correctIndex": 0,
        "explanation": "Constructors cannot be static, final, or abstract."
      }
    ]
  },
  "this-keyword-and-chaining": {
    "id": "this-keyword-and-chaining",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.6",
    "title": "The 'this' Keyword & Constructor Chaining (this())",
    "subtitle": "Resolving variable shadowing, referencing the current object, and constructor chaining with this()",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "In Java, **`this`** is a reference variable that refers to the **current object**\u2014the object whose method or constructor is currently executing.\n\nCommon usages of the `this` keyword:\n1. To refer to the current class instance variable and resolve **variable shadowing**.\n2. To invoke the current class constructor from another constructor using **`this(...)`** (**Constructor Chaining**).\n3. To pass the current object as an argument in a method call (`print(this)`).\n4. To return the current class instance from a method (enabling method chaining).\n\n**Constructor Chaining (`this()`)** is the technique of calling one constructor from another constructor within the same class, allowing common initialization logic to be centralized.",
    "coreExplanation": [
      "**Variable Shadowing**: When a constructor or method parameter shares the same identifier as an instance field (e.g. parameter `name` and field `name`), the parameter shadows (hides) the field. Writing `name = name;` assigns the parameter to itself, leaving the instance field null.",
      "**Disambiguating with 'this'**: Writing `this.name = name;` explicitly assigns the value of the parameter into the current object's instance field.",
      "**Constructor Chaining Syntax**: In an overloaded constructor, invoking `this(arguments)` delegates initialization to another constructor in the same class.",
      "**The First-Statement Rule**: A call to `this(...)` must be the absolute **first statement** in the constructor body. Writing any code or print statements before `this()` causes a compile-time error.",
      "**Prevention of Recursive Chaining**: A constructor cannot call itself directly or indirectly in a cycle (e.g., Constructor A calls Constructor B, and B calls A). The compiler detects circular invocations and emits: 'recursive constructor invocation'.",
      "**Restriction in Static Context**: The `this` keyword CANNOT be referenced from any static method or static initialization block because static members belong to the class and execute without an object instance."
    ],
    "codeSnippet": {
      "title": "Variable Shadowing and Constructor Chaining via this()",
      "code": "class Employee {\n    int id;\n    String name;\n    String department;\n    double salary;\n\n    // 1. Master Constructor (Initializes all 4 fields)\n    Employee(int id, String name, String department, double salary) {\n        // 'this.field' resolves variable shadowing\n        this.id = id;\n        this.name = name;\n        this.department = department;\n        this.salary = salary;\n    }\n\n    // 2. Chained Constructor: id and name (defaults department='General', salary=3000.0)\n    Employee(int id, String name) {\n        this(id, name, \"General\", 3000.0); // MUST be first statement!\n    }\n\n    void display() {\n        System.out.println(this.id + \": \" + this.name + \" [\" + this.department + \"] - $\" + this.salary);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee e1 = new Employee(101, \"Alice\", \"Engineering\", 7500.0);\n        Employee e2 = new Employee(102, \"Bob\"); // Chains to master constructor\n\n        e1.display();\n        e2.display();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 9-12",
          "explanation": "'this.field = param' disambiguates the instance variables from the shadowing parameters."
        },
        {
          "line": "Line 17",
          "explanation": "'this(id, name, \"General\", 3000.0)' invokes the 4-arg master constructor as the first statement."
        },
        {
          "line": "Lines 27-28",
          "explanation": "Both e1 and e2 are initialized cleanly with zero duplicated field assignment logic."
        }
      ],
      "output": "101: Alice [Engineering] - $7500.0\n102: Bob [General] - $3000.0"
    },
    "codeExamples": [
      {
        "title": "Example 1: The Shadowing Bug (name = name)",
        "description": "Demonstrating the uninitialized field bug when 'this' is omitted during shadowing.",
        "code": "class Person {\n    String name;\n\n    Person(String name) {\n        name = name; // Bug: Parameter assigns to itself; field remains null\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Person p = new Person(\"John\");\n        System.out.println(\"Person name: \" + p.name);\n    }\n}",
        "output": "Person name: null"
      },
      {
        "title": "Example 2: Method Chaining with 'return this;'",
        "description": "Returning 'this' allows chained method invocations (fluent builder pattern).",
        "code": "class QueryBuilder {\n    String query = \"SELECT *\";\n\n    QueryBuilder from(String table) {\n        this.query += \" FROM \" + table;\n        return this; // Returns current instance\n    }\n\n    QueryBuilder where(String condition) {\n        this.query += \" WHERE \" + condition;\n        return this;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        QueryBuilder qb = new QueryBuilder().from(\"users\").where(\"id = 10\");\n        System.out.println(\"Generated SQL: \" + qb.query);\n    }\n}",
        "output": "Generated SQL: SELECT * FROM users WHERE id = 10"
      }
    ],
    "interviewTakeaways": [
      "What is 'this': Reference variable pointing to the current executing object instance.",
      "Variable Shadowing: Resolved using 'this.fieldName = parameterName'.",
      "Constructor Chaining: 'this(args)' calls another constructor in the same class.",
      "Rule of this(): Must be the first statement in a constructor body.",
      "Static Restriction: 'this' cannot be used in static methods or static blocks."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Writing 'name = name;' in a constructor when parameter and field have identical names",
        "whyItHappens": "Forgetting that the parameter shadows the field, mutating only the local parameter.",
        "howToFix": "Use 'this.name = name;' to target the instance variable."
      },
      {
        "mistake": "Placing code statements before 'this()' in a constructor",
        "whyItHappens": "Attempting to log or perform checks before constructor chaining.",
        "howToFix": "Ensure 'this(...)' is the absolute first statement in the constructor."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Tracing Shadowing Assignment",
        "problemStatement": "What is the output of the following program?",
        "code": "class Box {\n    int width = 10;\n    Box(int width) {\n        width = width;\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box(40);\n        System.out.println(b.width);\n    }\n}",
        "options": [
          "40",
          "10",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "The parameter 'width' shadows the field 'width'.",
        "solution": "10",
        "explanation": "'width = width' assigns the parameter to itself. The instance field 'width' remains at its initial value 10."
      },
      {
        "title": "Puzzle 2: The First Statement Rule Violation",
        "problemStatement": "What happens when compiling 'class A { A(){ System.out.println(\"Hi\"); this(5); } A(int x){} }'?",
        "options": [
          "Compiles and prints 'Hi'",
          "Compile error: call to this must be first statement in constructor",
          "Runtime exception",
          "Infinite loop"
        ],
        "correctOptionIndex": 1,
        "hint": "'this()' must be the first statement in a constructor.",
        "solution": "Compile error: call to this must be first statement in constructor",
        "explanation": "Java strictly requires constructor chaining calls 'this(...)' to be the first statement in the constructor."
      },
      {
        "title": "Puzzle 3: Tracing Constructor Chaining Output",
        "problemStatement": "What is printed by 'new B()' if class B is defined as: 'B() { this(10); System.out.print(\"1\"); } B(int x) { System.out.print(x); }'?",
        "options": [
          "110",
          "101",
          "10",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "B() calls B(10) first, then prints '1'.",
        "solution": "101",
        "explanation": "B() chains to B(10), which prints '10'. Control returns to B(), which prints '1'. Total output: 101."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the purpose of the 'this' keyword in Java?",
        "answer": "In Java, 'this' is a reference variable that refers to the current object. It is used to: 1) resolve variable shadowing between instance fields and parameters, 2) chain constructors via this(), 3) pass the current object to methods, and 4) return the current instance for method chaining.",
        "followUp": "Can 'this' be referenced from a static method?",
        "followUpAnswer": "No. Static methods execute at the class level and have no current object instance, so using 'this' in a static method causes a compile error.",
        "keyPhrases": [
          "Current object reference",
          "Variable shadowing resolution",
          "Constructor chaining",
          "Not allowed in static context"
        ]
      },
      {
        "question": "Why must 'this()' be the first statement in a constructor?",
        "answer": "Java enforces this rule to guarantee that the object's base configuration is completely initialized by the chained constructor before any subsequent custom initialization logic or member access executes.",
        "followUp": "Can a constructor contain both this() and super() calls?",
        "followUpAnswer": "No. Both this() and super() must be the first statement, making them mutually exclusive within any single constructor.",
        "keyPhrases": [
          "Initialization order guarantee",
          "Prevent uninitialized access",
          "Mutually exclusive with super()"
        ]
      },
      {
        "question": "What is recursive constructor invocation in Java?",
        "answer": "Recursive constructor invocation occurs when constructors call each other in a cyclic chain (e.g. Constructor A calls this() to B, and B calls this() to A). The Java compiler detects this cycle at compile time and emits a 'recursive constructor invocation' error.",
        "followUp": "How do you structure constructor chaining to avoid recursion?",
        "followUpAnswer": "Designate a single master constructor that initializes all fields, and have all other overloaded constructors chain toward that master constructor.",
        "keyPhrases": [
          "Circular constructor calls",
          "Compile-time detection",
          "Master constructor pattern"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "What does 'this' refer to in Java?",
        "options": [
          "The current object instance whose method or constructor is executing",
          "The parent class",
          "The JVM operating system",
          "The static class context"
        ],
        "correctIndex": 0,
        "explanation": "'this' is a reference variable pointing to the current object."
      },
      {
        "question": "What is variable shadowing in a Java constructor?",
        "options": [
          "When a parameter has the same name as an instance field, hiding the field",
          "When an integer variable is cast to double",
          "When a variable is made private",
          "When a variable is declared static"
        ],
        "correctIndex": 0,
        "explanation": "Variable shadowing occurs when a local parameter identifier matches and hides an instance field."
      },
      {
        "question": "Where must 'this()' appear within a constructor body?",
        "options": [
          "As the very first statement",
          "As the last statement",
          "Anywhere inside the constructor",
          "Outside the constructor"
        ],
        "correctIndex": 0,
        "explanation": "Java mandates that this() must be the very first statement."
      },
      {
        "question": "Can you use the 'this' keyword inside a static method?",
        "options": [
          "No, non-static variable this cannot be referenced from a static context",
          "Yes, it points to the class",
          "Yes, if the method is public",
          "Only in main()"
        ],
        "correctIndex": 0,
        "explanation": "Static methods have no associated object instance, so 'this' cannot be used."
      },
      {
        "question": "What is the primary benefit of constructor chaining via this()?",
        "options": [
          "Eliminates duplicate initialization code across overloaded constructors",
          "Increases JVM execution speed by 10x",
          "Enables garbage collection",
          "Allows multiple inheritance"
        ],
        "correctIndex": 0,
        "explanation": "Constructor chaining avoids duplicating field assignments across multiple constructors."
      }
    ]
  },
  "static-vs-instance": {
    "id": "static-vs-instance",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.7",
    "title": "Static Variables & Methods vs Instance Members",
    "subtitle": "Class-level shared memory in Metaspace, static counters, static utility methods, and restrictions on static context",
    "estimatedMinutes": 8,
    "beginnerAnalogy": "The **`static`** keyword in Java is used primarily for **memory management**. It indicates that a member (variable, method, block, or nested class) belongs to the **Class itself** rather than to any specific object instance.\n\n1. **Instance Members**: Belong to an individual object. Each object allocated on the Heap has its own separate copy of instance variables.\n2. **Static Members**: Belong to the Class. Only a **single copy** of a static member is created and shared across all instances of the class. It is stored in the **Metaspace / Class Area**.\n\nStatic members can be accessed directly using the class name (`ClassName.member`), without needing to instantiate an object.",
    "coreExplanation": [
      "**Static Variables (Class Variables)**: Declared using the `static` keyword. Memory is allocated once when the class is loaded into memory by the JVM ClassLoader. Used to represent properties common to all objects (e.g. `static String college = \"IIT\";`).",
      "**Memory Efficiency**: If a class has 10,000 instances, each instance has its own `name` field, but all 10,000 share the single static `college` field, saving substantial heap RAM.",
      "**Static Methods (Class Methods)**: Methods marked `static` can be called directly without creating an instance of the class (`ClassName.methodName()`), such as `Math.sqrt(25)`.",
      "**Restrictions on Static Methods**:\n   1. A static method CANNOT access non-static (instance) variables or methods directly without an explicit object reference.\n   2. A static method CANNOT use the `this` or `super` keywords because no object instance is associated with the static context.",
      "**Instance Methods Can Access Static**: Instance methods can freely access both instance variables and static variables.",
      "**Static Initialization Block (`static { ... }`)**: A block of code that runs only once when the class is first loaded into memory by the JVM ClassLoader, prior to constructor execution or the main method. Used for complex static initialization.",
      "**Why the main Method is Static**: The JVM invokes `public static void main` as the entry point of the program without creating an instance of the class first."
    ],
    "codeSnippet": {
      "title": "Static Variables, Methods, and Instance Counter Pattern",
      "code": "class Student {\n    int rollNo;                    // Instance variable (unique per student)\n    String name;                   // Instance variable (unique per student)\n    static String college = \"IIT\"; // Static variable (shared across all students)\n    static int count = 0;          // Static counter tracking total instances\n\n    Student(int rollNo, String name) {\n        this.rollNo = rollNo;\n        this.name = name;\n        count++; // Increments shared static counter upon each instantiation\n    }\n\n    // Static method\n    static void displayTotalStudents() {\n        System.out.println(\"Total students enrolled in \" + college + \": \" + count);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(101, \"Alice\");\n        Student s2 = new Student(102, \"Bob\");\n        Student s3 = new Student(103, \"Charlie\");\n\n        // Access static method via Class Name (Best Practice)\n        Student.displayTotalStudents();\n\n        // Instance fields remain unique\n        System.out.println(s1.name + \" at \" + Student.college);\n        System.out.println(s2.name + \" at \" + Student.college);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 4-5",
          "explanation": "'static String college' and 'static int count' are stored once in Metaspace, shared across all instances."
        },
        {
          "line": "Line 10",
          "explanation": "The constructor increments the shared static counter upon every object creation."
        },
        {
          "line": "Lines 14-16",
          "explanation": "The static method accesses static fields directly without needing an object instance."
        },
        {
          "line": "Line 26",
          "explanation": "'Student.displayTotalStudents()' prints 3 because three instances were created."
        }
      ],
      "output": "Total students enrolled in IIT: 3\nAlice at IIT\nBob at IIT"
    },
    "codeExamples": [
      {
        "title": "Example 1: Pure Static Utility Class",
        "description": "Utility classes containing pure static helper methods and mathematical constants.",
        "code": "class MathUtils {\n    public static final double PI = 3.14159;\n\n    public static int square(int n) {\n        return n * n;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        // Invocation without instantiation\n        System.out.println(\"Square of 8: \" + MathUtils.square(8));\n        System.out.println(\"Value of PI: \" + MathUtils.PI);\n    }\n}",
        "output": "Square of 8: 64\nValue of PI: 3.14159"
      },
      {
        "title": "Example 2: Static Block Execution Order",
        "description": "Demonstrating that static blocks execute at class loading time prior to the main method.",
        "code": "class Demo {\n    static int initialValue;\n\n    static {\n        initialValue = 500;\n        System.out.println(\"Static block executed.\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Main method started.\");\n        System.out.println(\"Value: \" + Demo.initialValue);\n    }\n}",
        "output": "Main method started.\nStatic block executed.\nValue: 500"
      }
    ],
    "interviewTakeaways": [
      "Memory Location: Instance fields reside on the Heap; static fields reside in Metaspace.",
      "Copies: 1 copy per instance for instance variables; exactly 1 shared copy per class for static variables.",
      "Static Restrictions: Static methods cannot directly access instance fields or invoke non-static methods without an object reference.",
      "No 'this' in Static: The 'this' keyword cannot be referenced from static context.",
      "Static Block: Runs once when the class is loaded into memory by the ClassLoader."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Attempting to access instance variables directly inside a static method",
        "whyItHappens": "Forgetting that static methods execute at class level when zero objects may exist.",
        "howToFix": "Pass an object reference to the static method or make the method non-static."
      },
      {
        "mistake": "Accessing static members through an object instance (e.g. s1.college)",
        "whyItHappens": "Java allows it without compile error, but it is misleading and bad practice.",
        "howToFix": "Always access static members via the ClassName (e.g. Student.college)."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Tracing Static Counter",
        "problemStatement": "What is the output of the following program?",
        "code": "class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n        System.out.println(Counter.count);\n    }\n}",
        "options": [
          "1",
          "3",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "'count' is static and shared across all three instantiations.",
        "solution": "3",
        "explanation": "Because 'count' is static, each of the three constructor calls increments the single shared variable. Final output is 3."
      },
      {
        "title": "Puzzle 2: Calling Non-Static from Static Context",
        "problemStatement": "What is the result of compiling 'class A { int x = 10; static void show(){ System.out.println(x); } }'?",
        "options": [
          "Compiles and prints 10",
          "Compile error: non-static variable x cannot be referenced from a static context",
          "Runtime exception",
          "Prints 0"
        ],
        "correctOptionIndex": 1,
        "hint": "Can a static method access an instance field directly?",
        "solution": "Compile error: non-static variable x cannot be referenced from a static context",
        "explanation": "Static methods execute without an object instance. Attempting to directly access instance field 'x' produces a compile error."
      },
      {
        "title": "Puzzle 3: Static Mutation via Multiple References",
        "problemStatement": "What is the output of the following code?",
        "code": "class Config {\n    static int port = 8080;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Config c1 = new Config();\n        Config c2 = new Config();\n        c1.port = 9000;\n        System.out.println(c2.port);\n    }\n}",
        "options": [
          "8080",
          "9000",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "'port' is static. Modifying it via c1 modifies the single shared copy.",
        "solution": "9000",
        "explanation": "Because 'port' is static, only one copy exists in memory. Modifying c1.port alters the shared static variable, so c2.port reads 9000."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between a static variable and an instance variable in Java?",
        "answer": "An instance variable belongs to an object instance and is stored in Heap memory; every object created with 'new' gets its own copy. A static variable belongs to the class itself, is stored in Metaspace, and exists as a single shared copy across all instances of the class.",
        "followUp": "When should you declare a variable as static?",
        "followUpAnswer": "Declare a variable as static when its value is common and shared across all instances, such as constants (Math.PI) or counters tracking total objects.",
        "keyPhrases": [
          "Metaspace vs Heap",
          "Single shared copy vs independent copies",
          "Class level vs object level"
        ]
      },
      {
        "question": "Why can't static methods access instance variables directly or use the 'this' keyword?",
        "answer": "Static methods belong to the class and can be invoked directly (e.g. ClassName.method()) without creating any object instances. Because no object instance is guaranteed to exist when a static method executes, there is no 'this' pointer and no instance fields to target.",
        "followUp": "Can an instance method invoke a static method?",
        "followUpAnswer": "Yes. An instance method always has access to class-level static members.",
        "keyPhrases": [
          "No instance guaranteed",
          "Absence of this pointer",
          "Asymmetric access rules"
        ]
      },
      {
        "question": "Why is the main method declared static in Java?",
        "answer": "The JVM must be able to execute the main method as the starting entry point of an application before any objects have been instantiated. If main were non-static, the JVM would have to instantiate the class first, leading to ambiguity if constructors require arguments.",
        "followUp": "What is a static block and when does it execute?",
        "followUpAnswer": "A static block is a code block declared with 'static { ... }' that executes only once when the class is loaded into memory by the JVM, prior to constructor execution or the main method.",
        "keyPhrases": [
          "Application entry point",
          "Invocation prior to instantiation",
          "Class loading time"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "Where are static variables stored in JVM memory?",
        "options": [
          "Metaspace (Method Area)",
          "Call Stack",
          "Heap memory only",
          "Hard drive"
        ],
        "correctIndex": 0,
        "explanation": "Static variables are stored at the class level in Metaspace."
      },
      {
        "question": "How many copies of a static variable exist if 500 objects of the class are instantiated?",
        "options": [
          "Exactly 1",
          "500",
          "0",
          "Dependent on GC"
        ],
        "correctIndex": 0,
        "explanation": "Static variables exist as a single shared copy per class."
      },
      {
        "question": "What is the recommended convention for accessing a static method?",
        "options": [
          "ClassName.methodName()",
          "objectReference.methodName()",
          "this.methodName()",
          "super.methodName()"
        ],
        "correctIndex": 0,
        "explanation": "Accessing static members via the Class name clarifies that the member belongs to the class."
      },
      {
        "question": "Can a static method access an instance variable directly without an object reference?",
        "options": [
          "No, doing so produces a compile-time error",
          "Yes, it reads the first created object",
          "Yes, if the variable is public",
          "Only inside the main class"
        ],
        "correctIndex": 0,
        "explanation": "Non-static fields cannot be referenced directly from a static context."
      },
      {
        "question": "When does a static initialization block execute?",
        "options": [
          "When the class is loaded into memory by the JVM ClassLoader",
          "Every time 'new' is called",
          "When the object is garbage collected",
          "Only when invoked explicitly"
        ],
        "correctIndex": 0,
        "explanation": "Static blocks execute once when the class is first loaded into JVM memory."
      }
    ]
  },
  "object-lifecycle-and-gc": {
    "id": "object-lifecycle-and-gc",
    "moduleId": "java-oop-basics",
    "moduleTitle": "11. OOP Fundamentals",
    "lessonNumber": "Lesson 9.8",
    "title": "Object Lifecycle & Garbage Collection in Java",
    "subtitle": "The 4 stages of object lifecycle, reachability from GC roots, Island of Isolation, and automatic memory deallocation",
    "estimatedMinutes": 7,
    "beginnerAnalogy": "In Java, memory management is performed automatically by the JVM through a background daemon thread known as the **Garbage Collector (GC)**.\n\nUnlike languages like C and C++ where developers must explicitly allocate memory with `malloc()`/`new` and deallocate with `free()`/`delete`, Java automatically tracks, discovers, and reclaims memory occupied by unreachable objects.\n\nAutomatic Garbage Collection prevents common memory corruption bugs:\n1. **Dangling Pointers**: Pointers referencing memory that has already been deallocated.\n2. **Double-Free Bugs**: Attempting to deallocate the same memory block multiple times, crashing the runtime.\n3. **Memory Leaks**: Unreferenced objects remaining indefinitely in memory.",
    "coreExplanation": [
      "**The 4 Stages of an Object's Lifecycle**:\n   1. **Creation**: Memory allocated on the Heap via `new`; constructor initializes state.\n   2. **In-Use (Referenced)**: The object is reachable by at least one live reference variable on an active stack frame.\n   3. **Eligible for Garbage Collection**: All references to the object have been nullified, reassigned, or gone out of scope.\n   4. **Destruction & Reclamation**: The JVM Garbage Collector identifies the unreachable object, frees its bytes, and returns memory to the Heap pool.",
      "**Reachability Analysis & GC Roots**: Java does not use naive reference counting. It uses **Reachability Analysis**. An object is considered alive as long as an unbroken path of references connects it to an active **GC Root** (active thread local variables, static class variables, JNI pointers).",
      "**4 Ways Objects Become Eligible for GC**:\n   1. **Nullifying the reference variable**: `s = null;` breaks the link to the heap object.\n   2. **Reassigning the reference variable**: `s = new Student();` abandons the previously referenced object.\n   3. **Object Created Inside a Method**: Local reference variables are discarded when the method completes and its stack frame pops.\n   4. **Island of Isolation**: Two or more objects reference each other, but have zero connection to any live GC root.",
      "**Requesting Garbage Collection (`System.gc()`)**: Calling `System.gc()` or `Runtime.getRuntime().gc()` sends a request to the JVM to run the Garbage Collector. It is merely a hint or suggestion; the JVM is NOT guaranteed to execute GC immediately.",
      "**The finalize() Method (Deprecated)**: Defined in `java.lang.Object`, `finalize()` was historically invoked by the GC before object destruction. It is deprecated since Java 9 due to non-deterministic execution, performance bottlenecks, and deadlocks. Developers must use `AutoCloseable` with `try-with-resources` instead."
    ],
    "codeSnippet": {
      "title": "Demonstrating Object Lifecycle and GC Eligibility",
      "code": "class Employee {\n    int id;\n    Employee(int id) { this.id = id; }\n}\n\npublic class Main {\n    static void createTemporaryEmployee() {\n        // Object 1: Created on Heap; 'temp' reference lives in method stack frame\n        Employee temp = new Employee(101);\n        System.out.println(\"Temporary employee created: \" + temp.id);\n        // When createTemporaryEmployee() exits, 'temp' is destroyed!\n        // Object 1 becomes immediately ELIGIBLE FOR GARBAGE COLLECTION!\n    }\n\n    public static void main(String[] args) {\n        // Object 2: Created\n        Employee e2 = new Employee(202);\n\n        // 1. Nullifying reference\n        e2 = null; // Object 2 becomes ELIGIBLE FOR GC!\n\n        // 2. Invoking method with local object allocation\n        createTemporaryEmployee();\n\n        // 3. Requesting JVM to execute Garbage Collection\n        System.gc();\n        System.out.println(\"GC requested. Program execution complete.\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Lines 8-10",
          "explanation": "Object 1 (101) is allocated; reference 'temp' exists only in the method's stack frame."
        },
        {
          "line": "Line 12",
          "explanation": "When createTemporaryEmployee() returns, 'temp' pops off the stack. Object 1 has 0 references and is eligible for GC."
        },
        {
          "line": "Line 19",
          "explanation": "Setting 'e2 = null' breaks the only reference to Object 2 (202), making it eligible for GC."
        },
        {
          "line": "Line 25",
          "explanation": "'System.gc()' suggests to the JVM to run garbage collection."
        }
      ],
      "output": "Temporary employee created: 101\nGC requested. Program execution complete."
    },
    "codeExamples": [
      {
        "title": "Example 1: The Island of Isolation",
        "description": "Demonstrating that circular references between objects with no connection to stack GC roots are collected.",
        "code": "class Node {\n    Node neighbor;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Node n1 = new Node(); // Object A\n        Node n2 = new Node(); // Object B\n\n        n1.neighbor = n2; // A points to B\n        n2.neighbor = n1; // B points to A\n\n        // Disconnect stack references\n        n1 = null;\n        n2 = null;\n\n        // Both Object A and B form an Island of Isolation!\n        // Because neither is reachable from a GC root, BOTH are eligible for GC.\n        System.out.println(\"Island of isolation created.\");\n    }\n}",
        "output": "Island of isolation created."
      },
      {
        "title": "Example 2: Reassigning a Reference Variable",
        "description": "Reassigning a reference variable abandons the previous object, making it GC-eligible.",
        "code": "class Student {\n    String name;\n    Student(String name) { this.name = name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Alice\"); // Object 1\n        s = new Student(\"Bob\");          // Object 2 (Object 1 'Alice' is now eligible for GC)\n        System.out.println(\"Current student: \" + s.name);\n    }\n}",
        "output": "Current student: Bob"
      }
    ],
    "interviewTakeaways": [
      "Garbage Collection: Automatic memory reclamation performed by a background JVM daemon thread.",
      "Reachability Analysis: Traces reference paths from GC Roots (active stack variables, static fields).",
      "Island of Isolation: Circular references with no active GC root link are detected and collected.",
      "System.gc(): A request/suggestion to the JVM; does not guarantee immediate execution.",
      "Deprecated finalize(): Do not use finalize(); use try-with-resources and AutoCloseable."
    ],
    "beginnerMistakes": [
      {
        "mistake": "Believing that calling System.gc() immediately forces garbage collection",
        "whyItHappens": "Assuming System.gc() is an imperative command rather than a hint to the JVM.",
        "howToFix": "Do not rely on System.gc() for program correctness; let the JVM manage memory."
      },
      {
        "mistake": "Thinking memory leaks are impossible in Java because of GC",
        "whyItHappens": "Assuming GC automatically frees all unused memory.",
        "howToFix": "Avoid keeping unnecessary object references in static collections or long-lived caches."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Counting GC Eligible Objects",
        "problemStatement": "How many objects are eligible for Garbage Collection at the marked line?",
        "code": "class User {\n    String name;\n    User(String n) { name = n; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u1 = new User(\"Alice\");\n        User u2 = new User(\"Bob\");\n        User u3 = new User(\"Charlie\");\n        u1 = u2;\n        u3 = null;\n        // LINE OF INTEREST: How many User objects are eligible for GC here?\n        System.out.println(u1.name);\n    }\n}",
        "options": [
          "0",
          "1",
          "2",
          "3"
        ],
        "correctOptionIndex": 2,
        "hint": "Check references: 'Alice' has 0 references after u1=u2; 'Charlie' has 0 references after u3=null.",
        "solution": "2",
        "explanation": "Object 'Alice' was abandoned when u1 was reassigned to u2. Object 'Charlie' was abandoned when u3 was set to null. Exactly 2 objects are eligible for GC."
      },
      {
        "title": "Puzzle 2: Method Scope GC Eligibility",
        "problemStatement": "When does the object created inside createOrder() become eligible for Garbage Collection?",
        "code": "class Order {}\npublic class Main {\n    static void createOrder() {\n        Order o = new Order();\n    }\n    public static void main(String[] args) {\n        createOrder();\n        System.out.println(\"Completed\");\n    }\n}",
        "options": [
          "Immediately when createOrder() completes and its stack frame is popped",
          "When the main method finishes",
          "Never",
          "Only if System.gc() is called"
        ],
        "correctOptionIndex": 0,
        "hint": "The reference 'o' is local to createOrder().",
        "solution": "Immediately when createOrder() completes and its stack frame is popped",
        "explanation": "Because 'o' is local to createOrder(), its reference is discarded when the method finishes. The Order object has 0 remaining references and becomes eligible for GC."
      },
      {
        "title": "Puzzle 3: The Island of Isolation Rule",
        "problemStatement": "What is true about objects in an 'Island of Isolation' in Java?",
        "options": [
          "They are eligible for Garbage Collection because they have no live GC Root connection",
          "They cannot be collected because they point to each other",
          "They cause a StackOverflowError",
          "They are promoted to Tenured generation immediately"
        ],
        "correctOptionIndex": 0,
        "hint": "Java uses Reachability from GC Roots, not reference counting.",
        "solution": "They are eligible for Garbage Collection because they have no live GC Root connection",
        "explanation": "Because Java uses Reachability Analysis, objects with circular references that cannot be reached from any active GC Root are identified and collected."
      }
    ],
    "interviewQuestions": [
      {
        "question": "How does the Java Garbage Collector determine if an object is eligible for collection?",
        "answer": "The JVM Garbage Collector uses Reachability Analysis starting from GC Roots (active stack local variables, static variables, active threads). If an object cannot be reached through an unbroken chain of references from any GC Root, it is determined to be unreachable and eligible for garbage collection.",
        "followUp": "Why does Java use Reachability Analysis instead of Reference Counting?",
        "followUpAnswer": "Reference counting fails when objects reference each other cyclically (Islands of Isolation). Reachability analysis easily handles cycles because neither object can be reached from a root.",
        "keyPhrases": [
          "Reachability analysis",
          "GC Roots",
          "Island of isolation",
          "Mark-and-sweep"
        ]
      },
      {
        "question": "Does invoking System.gc() guarantee that garbage collection will run immediately?",
        "answer": "No. Calling System.gc() or Runtime.getRuntime().gc() sends a polite request or hint to the JVM. The JVM decides whether, when, and how to execute garbage collection based on heap usage thresholds and workload.",
        "followUp": "Why is calling System.gc() discouraged in production code?",
        "followUpAnswer": "Explicitly requesting GC can trigger expensive Stop-The-World (STW) pauses, degrading application throughput and latency. The JVM's adaptive GC heuristics manage memory much more efficiently.",
        "keyPhrases": [
          "Suggestion / hint to JVM",
          "No guarantee of immediate execution",
          "Stop-the-world pause risk"
        ]
      },
      {
        "question": "Can a memory leak happen in Java despite having automatic Garbage Collection?",
        "answer": "Yes. A memory leak in Java occurs when an application unintentionally retains references to objects that are no longer needed, preventing the Garbage Collector from reclaiming them. Common causes include uncleaned static collections (e.g. static HashMaps as unbounded caches), unclosed database connections, and lingering event listeners.",
        "followUp": "How do you detect memory leaks in Java?",
        "followUpAnswer": "Capture a heap dump (.hprof) and analyze it using memory profiling tools like Eclipse Memory Analyzer (MAT), VisualVM, or JProfiler to trace GC root reference paths of retained objects.",
        "keyPhrases": [
          "Unintentional reference retention",
          "Static collection caching",
          "Heap dump / MAT profiling"
        ]
      }
    ],
    "miniQuiz": [
      {
        "question": "When is an object eligible for Garbage Collection in Java?",
        "options": [
          "When it is no longer reachable from any live GC root",
          "Immediately after the constructor finishes",
          "Only when System.gc() is called",
          "When it reaches 5 minutes of age"
        ],
        "correctIndex": 0,
        "explanation": "An object becomes eligible for GC as soon as all reference paths from active GC roots are severed."
      },
      {
        "question": "What is an 'Island of Isolation' in Java GC?",
        "options": [
          "A set of objects referencing each other with no reference from any live GC root",
          "An object stored in CPU registers",
          "A corrupted memory block",
          "A private inner class"
        ],
        "correctIndex": 0,
        "explanation": "An Island of Isolation consists of circular referenced objects with zero connection to live stack roots."
      },
      {
        "question": "What does calling 'System.gc()' do in Java?",
        "options": [
          "Suggests to the JVM to run garbage collection, but provides no guarantee",
          "Instantly freezes all threads and empties the Heap",
          "Deletes all static variables",
          "Shuts down the JVM"
        ],
        "correctIndex": 0,
        "explanation": "System.gc() is merely a request/hint to the JVM."
      },
      {
        "question": "Why was finalize() deprecated in Java 9?",
        "options": [
          "It was unpredictable, caused performance overhead, deadlocks, and resurrection issues",
          "Because C++ has destructors",
          "Because computers have more RAM now",
          "Because Java 8 introduced lambda expressions"
        ],
        "correctIndex": 0,
        "explanation": "finalize() had severe flaws including lack of promptness, thread starvation, and deadlocks."
      },
      {
        "question": "Which of the following serves as a primary 'GC Root' in Java?",
        "options": [
          "A local variable inside an active thread's method stack frame",
          "A field inside an unreachable object",
          "A deleted variable",
          "A comment in source code"
        ],
        "correctIndex": 0,
        "explanation": "Local variables on active thread stack frames serve as primary GC Roots."
      }
    ]
  }
};
