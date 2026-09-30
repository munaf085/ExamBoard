import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 11: INHERITANCE & HIERARCHY (LESSONS 3.1 - 3.7)
// Beginner-Friendly, Complete Rebuild for Absolute Beginners
// ============================================================

export const oop11Lessons: Record<string, DetailedLesson> = {
  "what-is-inheritance": {
    "id": "what-is-inheritance",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.1",
    "title": "What is Inheritance? (The extends Keyword & IS-A)",
    "subtitle": "Stop repeating code: How child classes get methods and variables from parent classes",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 What problem inheritance solves in real programming.\n\u2022 What a Parent class (Superclass) and a Child class (Subclass) are.\n\u2022 How to use the `extends` keyword to connect two classes.\n\u2022 What the child gets for free, what it can add, and what it cannot directly touch.\n\n\ud83e\udd14 2. Why do we need this?\nImagine you are building a game with many animals. Look at this code:\n```java\nclass Dog {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n    void bark() {\n        System.out.println(\"Dog is barking\");\n    }\n}\n\nclass Cat {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n    void meow() {\n        System.out.println(\"Cat says meow\");\n    }\n}\n```\nNotice something? Both `Dog` and `Cat` have the exact same `eat()` and `sleep()` methods!\nIf you have 10 animals (Cow, Horse, Lion, Tiger...), will you write `eat()` and `sleep()` 10 times?\nAnd if you want to change \"Eating food\" to \"Eating nutritious food\", you will have to open 10 different files to make the change! That wastes time and causes bugs.\nWriting the same code again and again is not a good idea.\nThat is the exact problem Inheritance solves!\n\n\ud83e\udde0 3. Simple Explanation\nInheritance lets us write common code ONE time in a general class called the **Parent class** (also called **Superclass**).\nThen, specific classes called **Child classes** (also called **Subclasses**) can use that code for free!\nTo connect them in Java, we use the `extends` keyword:\n```java\nclass Dog extends Animal\n```\nIn plain English, this tells Java:\n\"Dog is an Animal. Give Dog everything Animal already knows, and let Dog add its own new features!\"\n\nThis is called an **IS-A relationship**:\n\u2022 A Dog **IS-A** Animal.\n\u2022 A Car **IS-A** Vehicle.\n\u2022 A Student **IS-A** Person.\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a parent and a child in a family:\n\u2022 The parent has a house, a car, and a family surname.\n\u2022 The child inherits the surname and can use the house and car.\n\u2022 The child can also learn new skills that the parent did not have (like coding in Java!).\n\u2022 But the child cannot open the parent's secret personal diary (private data).\n\n\ud83d\udca1 8. Try It Yourself\nAdd a new method `void run()` to the `Animal` class.\nNotice how BOTH `Dog` and `Cat` can immediately call `run()` without writing a single line of new code inside `Dog` or `Cat`!",
    "coreExplanation": [
      "1. Parent Class (Superclass): The general class that contains shared variables and methods (e.g., Animal, Vehicle, Person).",
      "2. Child Class (Subclass): The specific class that inherits from the parent and adds its own unique behavior (e.g., Dog, Car, Student).",
      "3. The 'extends' Keyword: The keyword used in Java to connect a child class to a parent class. Syntax: class Child extends Parent { }.",
      "4. The IS-A Rule: Only use inheritance when a genuine IS-A relationship exists. A Dog IS-A Animal (Correct). A Car HAS-A Engine (Not inheritance; that is composition!).",
      "5. What the Child Gets: The child automatically gets all public and protected methods and variables from the parent.",
      "6. What the Child Can Add: The child can declare its own brand-new methods (like bark() in Dog) and variables that the parent does not have.",
      "7. What the Child Cannot Directly Access: A child class cannot directly access a parent's private variables by name. However, the child can still use them indirectly through the parent's public getter and setter methods!"
    ],
    "codeSnippet": {
      "title": "Simple Animal and Dog Inheritance Example",
      "code": "class Animal {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Dog is barking\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog myDog = new Dog();\n\n        // Inherited methods from Animal parent class:\n        myDog.eat();\n        myDog.sleep();\n\n        // Dog's own method:\n        myDog.bark();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Animal {",
          "explanation": "We define the parent class Animal with common methods that all animals share."
        },
        {
          "line": "void eat() { ... }",
          "explanation": "Animal has an eat() method. Every child of Animal will be able to eat."
        },
        {
          "line": "class Dog extends Animal {",
          "explanation": "The 'extends' keyword connects Dog to Animal. Dog becomes the child of Animal."
        },
        {
          "line": "void bark() { ... }",
          "explanation": "Dog adds its own unique method. Cats and Cows cannot bark, only Dogs can."
        },
        {
          "line": "Dog myDog = new Dog();",
          "explanation": "We create a new Dog object on the heap. It contains both Animal methods and Dog methods."
        },
        {
          "line": "myDog.eat();",
          "explanation": "Java checks: Does Dog have eat()? No, but its parent Animal has eat(), so Java runs Animal's eat()!"
        },
        {
          "line": "myDog.bark();",
          "explanation": "Dog has its own bark() method, so Java runs it directly."
        }
      ],
      "output": "Eating food\nSleeping peacefully\nDog is barking"
    },
    "beginnerMistakes": [
      {
        "mistake": "Using 'implements' instead of 'extends' for classes.",
        "whyItHappens": "Confusing interface implementation with class inheritance.",
        "howToFix": "Remember: For classes inheriting from another class, always write 'extends'. We only use 'implements' with interfaces.",
        "codeSnippet": "// WRONG: class Dog implements Animal { }\n// CORRECT: class Dog extends Animal { }"
      },
      {
        "mistake": "Trying to directly access a parent's private variable in the child class.",
        "whyItHappens": "Assuming inheritance gives the child direct access to everything, even private fields.",
        "howToFix": "Private fields are hidden inside the parent. Provide a public getVariable() method in the parent class and call that in the child.",
        "codeSnippet": "class Parent { private int age = 40; public int getAge() { return age; } }\nclass Child extends Parent {\n    void printAge() {\n        // System.out.println(age); // COMPILE ERROR!\n        System.out.println(getAge()); // CORRECT!\n    }\n}"
      },
      {
        "mistake": "Trying to call a child method using a parent object.",
        "whyItHappens": "Assuming inheritance works both ways.",
        "howToFix": "Inheritance is one-way: child gets parent methods, but parent does NOT get child methods. An Animal is not necessarily a Dog!",
        "codeSnippet": "Animal a = new Animal();\n// a.bark(); // COMPILE ERROR! Animal does not know what bark() is."
      }
    ],
    "practiceProblems": [
      {
        "title": "Predict the Output: Inherited Method Call",
        "problemStatement": "What will happen when you compile and run this program?",
        "code": "class Vehicle {\n    void start() {\n        System.out.print(\"Engine started \");\n    }\n}\n\nclass Car extends Vehicle {\n    void honk() {\n        System.out.print(\"Beep beep!\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.start();\n        c.honk();\n    }\n}",
        "options": [
          "Engine started Beep beep!",
          "Compile error because Car does not have start()",
          "Beep beep! Engine started",
          "Runtime error"
        ],
        "correctOptionIndex": 0,
        "hint": "Car extends Vehicle. Can Car call methods from Vehicle?",
        "solution": "Engine started Beep beep!",
        "explanation": "Car inherits the start() method from Vehicle. When c.start() runs, it prints 'Engine started '. Then c.honk() prints 'Beep beep!'."
      },
      {
        "title": "Spot the Compile Error: Parent Accessing Child Method",
        "problemStatement": "Why will the following code fail to compile?",
        "code": "class Bird {\n    void fly() {\n        System.out.println(\"Flying\");\n    }\n}\n\nclass Penguin extends Bird {\n    void swim() {\n        System.out.println(\"Swimming\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Bird b = new Bird();\n        b.swim();\n    }\n}",
        "options": [
          "Bird b = new Bird() is not allowed",
          "b.swim() fails because parent class Bird does not have a swim() method",
          "Penguin must be an abstract class",
          "fly() method is missing a return type"
        ],
        "correctOptionIndex": 1,
        "hint": "Does inheritance work from child to parent, or parent to child?",
        "solution": "b.swim() fails because parent class Bird does not have a swim() method",
        "explanation": "Inheritance is one-way: children inherit from parents. The Bird class knows nothing about methods declared down inside Penguin."
      },
      {
        "title": "Direct Private Access Trap",
        "problemStatement": "What happens if a child class tries to write `System.out.println(balance);` when `balance` is private in the parent?",
        "code": "class Account {\n    private double balance = 500.0;\n}\n\nclass SavingsAccount extends Account {\n    void showBalance() {\n        System.out.println(balance);\n    }\n}",
        "options": [
          "It prints 500.0 normally",
          "Compile error: balance has private access in Account",
          "It prints 0.0",
          "Runtime NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Remember the keyword private. Can other classes directly use private variables by name?",
        "solution": "Compile error: balance has private access in Account",
        "explanation": "Private variables can only be directly accessed inside the class that declared them. A child class must use a public getter method like getBalance() to read private parent data."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is inheritance in Java and why do we use it?",
        "expectedAnswer": "Inheritance is an Object-Oriented feature where one class (child class) acquires the methods and variables of another class (parent class) using the 'extends' keyword. We use it to avoid duplicate code (code reusability) and to build logical parent-child relationships.",
        "followUp": "What is the IS-A relationship?",
        "followUpAnswer": "IS-A represents inheritance. It means the child is a specific type of the parent. For example, Dog IS-A Animal, and Car IS-A Vehicle. If two classes do not have an IS-A relationship, we should use composition (HAS-A) instead.",
        "keyPhrases": [
          "code reusability",
          "parent and child class",
          "extends keyword",
          "IS-A relationship"
        ],
        "commonMistake": "Saying inheritance copies code into the child class.",
        "commonMistakeAnswer": "Java does not copy code into the child class file. The child simply holds a reference to its parent class definition."
      },
      {
        "question": "Can a child class access private members of its parent class?",
        "expectedAnswer": "A child class cannot directly access a parent's private variables or methods by name. However, the child class CAN access them indirectly through the parent's public or protected getter and setter methods.",
        "followUp": "Why doesn't Java allow direct access to private fields in child classes?",
        "followUpAnswer": "To protect Encapsulation and Data Hiding. If child classes could freely change private variables, any programmer could create a subclass and corrupt critical parent state without validation.",
        "keyPhrases": [
          "no direct access by name",
          "can access via public getters/setters",
          "protects encapsulation"
        ],
        "commonMistake": "Answering 'Private fields are not inherited at all'.",
        "commonMistakeAnswer": "Private fields ARE part of the child object's memory state on the heap, but the child class code cannot refer to them directly by name."
      },
      {
        "question": "What is the difference between a Superclass and a Subclass?",
        "expectedAnswer": "Superclass is the parent class from which features are inherited. Subclass is the child class that extends the superclass and can add its own new features.",
        "followUp": "Can a class be both a superclass and a subclass at the same time?",
        "followUpAnswer": "Yes, in multilevel inheritance! For example, Mammal is a subclass of Animal, but Mammal is also the superclass of Dog.",
        "keyPhrases": [
          "Superclass = Parent",
          "Subclass = Child",
          "Multilevel inheritance"
        ],
        "commonMistake": "Confusing superclass and subclass terminology.",
        "commonMistakeAnswer": "Remember: 'Super' means above (Parent), and 'Sub' means below (Child)."
      }
    ],
    "miniQuiz": [
      {
        "id": "inh-mq1-1",
        "question": "Which Java keyword is used to inherit from a class?",
        "options": [
          "inherits",
          "extends",
          "implements",
          "super"
        ],
        "correctIndex": 1,
        "explanation": "In Java, we write 'class Child extends Parent' to create an inheritance relationship."
      },
      {
        "id": "inh-mq1-2",
        "question": "If class Dog extends Animal, which of the following statements is TRUE?",
        "options": [
          "Animal inherits from Dog",
          "Dog is the parent class and Animal is the child class",
          "Dog is the child class and Animal is the parent class",
          "Dog and Animal have no relationship"
        ],
        "correctIndex": 2,
        "explanation": "In 'class Dog extends Animal', Dog is the child (subclass) and Animal is the parent (superclass)."
      },
      {
        "id": "inh-mq1-3",
        "question": "Which of the following is a genuine IS-A relationship suitable for inheritance?",
        "options": [
          "Car and Engine (A Car IS-A Engine)",
          "Student and Person (A Student IS-A Person)",
          "Book and Page (A Book IS-A Page)",
          "House and Door (A House IS-A Door)"
        ],
        "correctIndex": 1,
        "explanation": "A Student IS-A Person. A Car has an engine (HAS-A), a Book has pages (HAS-A), and a House has doors (HAS-A)."
      },
      {
        "id": "inh-mq1-4",
        "question": "Can a child class directly access a private variable of its parent class by name?",
        "options": [
          "Yes, inheritance gives access to everything",
          "Yes, but only if the child is in the same folder",
          "No, private variables can only be directly accessed inside the declaring parent class",
          "No, unless we use the 'new' keyword"
        ],
        "correctIndex": 2,
        "explanation": "Private variables are strictly hidden. The child cannot directly write the variable name, but can call public getters/setters."
      },
      {
        "id": "inh-mq1-5",
        "question": "What is the primary benefit of using inheritance in Java?",
        "options": [
          "It makes Java code run twice as fast",
          "Code reusability: write common code once in a parent class and share it across child classes",
          "It allows classes to have multiple main() methods",
          "It automatically saves objects to a database"
        ],
        "correctIndex": 1,
        "explanation": "Code reusability is the number one benefit. You write shared logic once in the parent, reducing duplicate code and bugs."
      }
    ],
    "cheatSheet": {
      "summary": "Inheritance allows a child class (subclass) to get methods and variables from a parent class (superclass) using the 'extends' keyword, eliminating duplicate code.",
      "syntaxTemplate": "class Parent {\n    // Common variables and methods\n    void commonMethod() { }\n}\n\nclass Child extends Parent {\n    // Child gets commonMethod() for free\n    // Child can also add its own new methods\n    void uniqueMethod() { }\n}",
      "rules": [
        {
          "rule": "The extends Keyword",
          "explanation": "Always write 'class Child extends Parent'. Java does not use words like 'inherits'."
        },
        {
          "rule": "One-Way Flow",
          "explanation": "Children inherit from parents. Parents do NOT inherit from children."
        },
        {
          "rule": "The IS-A Test",
          "explanation": "Only use inheritance if you can honestly say 'Child IS-A Parent' in plain English."
        },
        {
          "rule": "Private Data Hiding",
          "explanation": "Child classes cannot directly touch private fields of parents by name; use public getters/setters instead."
        },
        {
          "rule": "Code Reusability",
          "explanation": "Write shared methods once in the parent class to avoid repeating the same code in multiple child classes."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Role",
          "optionA": "Parent (Superclass): The general class with shared code",
          "optionB": "Child (Subclass): The specialized class with extra code"
        },
        {
          "aspect": "Access",
          "optionA": "Public/Protected: Inherited by child",
          "optionB": "Private: Hidden inside parent only"
        }
      ],
      "quickDefinitions": [
        {
          "term": "Inheritance",
          "oneLiner": "One class getting variables and methods from another class using 'extends'.",
          "interviewExplanation": "A core OOP mechanism that promotes code reuse by allowing a child class to inherit non-private members of a parent class.",
          "realWorldExample": "A child inheriting their parents' eye color and surname, while learning their own unique hobbies.",
          "codeExample": "class Dog extends Animal { }"
        },
        {
          "term": "Superclass",
          "oneLiner": "The parent class that shares its code.",
          "interviewExplanation": "The class above in the hierarchy whose methods and fields are inherited by subclasses.",
          "realWorldExample": "Vehicle is the superclass of Car and Bike.",
          "codeExample": "class Vehicle { void start() { } }"
        },
        {
          "term": "Subclass",
          "oneLiner": "The child class that inherits from the superclass.",
          "interviewExplanation": "The class below that extends the parent, getting shared features and adding its own specialized behavior.",
          "realWorldExample": "Car is a subclass of Vehicle.",
          "codeExample": "class Car extends Vehicle { void openTrunk() { } }"
        }
      ],
      "differences": [
        {
          "title": "Parent Class vs Child Class",
          "conceptA": "Parent Class (Superclass)",
          "conceptB": "Child Class (Subclass)",
          "keyDifference": "Parent has general shared code; Child has specialized extra code.",
          "comparisonPoints": [
            {
              "feature": "Keyword",
              "a": "Declared as normal class",
              "b": "Uses 'extends ParentName'"
            },
            {
              "feature": "Knowledge",
              "a": "Does NOT know who its children are",
              "b": "Knows its parent and can call parent methods"
            },
            {
              "feature": "Purpose",
              "a": "Code sharing and general template",
              "b": "Specialization and extra features"
            }
          ]
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "What is inheritance in simple words?",
          "answer": "Inheritance allows one class (child) to reuse the code of another class (parent) using the 'extends' keyword. It prevents us from writing the same code again and again.",
          "trapsToAvoid": "Saying 'child inherits everything including private fields directly'. Remember private fields are hidden."
        },
        {
          "question": "What is the IS-A relationship in Java?",
          "answer": "The IS-A relationship represents inheritance. It means the child class is a specialized type of the parent class (e.g., Dog IS-A Animal, Car IS-A Vehicle). If two classes do not have an IS-A relationship, composition (HAS-A) should be used instead.",
          "trapsToAvoid": "Using inheritance when a HAS-A relationship exists (like Car HAS-A Engine)."
        },
        {
          "question": "Can a child class access private variables of the parent class?",
          "answer": "A child class cannot directly access private parent variables by name. However, the child class can access and modify them indirectly through the parent's public or protected getter and setter methods.",
          "trapsToAvoid": "Saying an absolute 'No' without mentioning public getters and setters."
        }
      ]
    }
  },
  "types-of-inheritance": {
    "id": "types-of-inheritance",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.2",
    "title": "Types of Inheritance in Java (And Why Multiple Inheritance is Not Allowed)",
    "subtitle": "Single, Multilevel, and Hierarchical inheritance, plus the Diamond Problem explained simply",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 The 3 types of inheritance Java supports: Single, Multilevel, and Hierarchical.\n\u2022 What Multiple Inheritance is, and why Java does NOT allow it with classes.\n\u2022 The famous \"Diamond Problem\" explained in 2 minutes without confusing math or jargon.\n\u2022 How Java achieves safe multiple inheritance using Interfaces (which we will study in a later module).\n\n\ud83e\udd14 2. Why do we need this?\nClasses can relate to each other in different shapes and tree structures.\nFor example:\n\u2022 A Dog inherits from Animal (1 parent, 1 child).\n\u2022 A Labrador inherits from Dog, which inherits from Animal (Grandparent \u2192 Parent \u2192 Child).\n\u2022 Both Dog and Cat inherit from Animal (1 parent, 2 children).\nUnderstanding these patterns helps you structure your Java projects cleanly.\n\n\ud83e\udde0 3. Simple Explanation\nLet us look at the 3 types of inheritance Java allows:\n\n1\ufe0f\u20e3 Single Inheritance:\nOne child class extends ONE parent class.\n   Animal\n     \u2193\n    Dog\n\n2\ufe0f\u20e3 Multilevel Inheritance:\nA chain of inheritance. A child extends a parent, and another child extends that child!\n   Animal   (Grandparent)\n     \u2193\n   Mammal   (Parent)\n     \u2193\n    Dog     (Child)\nHere, Dog gets methods from BOTH Mammal AND Animal!\n\n3\ufe0f\u20e3 Hierarchical Inheritance:\nOne parent class has MULTIPLE child classes.\n        Animal\n       /      \\\n     Dog      Cat\nBoth Dog and Cat get common code from Animal, but Dog and Cat are separate from each other.\n\n\ud83d\udeab What Java Does NOT Allow: Multiple Inheritance with Classes!\n```java\n// JAVA SAYS NO! THIS WILL NOT COMPILE:\nclass C extends A, B { }\n```\nWhy? Let us understand the famous **Diamond Problem**!\nImagine Class A has a method `void show() { System.out.println(\"A\"); }`.\nClass B extends A and changes `show()` to print \"B\".\nClass C extends A and changes `show()` to print \"C\".\n\nNow imagine if Class D could extend BOTH B and C:\n```\n       A\n      / \\\n     B   C\n      \\ /\n       D\n```\nIf you write `D obj = new D(); obj.show();`\nWhich `show()` should Java run? The version from B? Or the version from C?\nJava would be confused! To keep Java simple and avoid this confusion, Java designers completely banned `extends A, B` for classes.\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a child in real life:\n\u2022 If Mother says \"Clean your room right now!\"\n\u2022 And Father says \"Come play cricket right now!\"\n\u2022 If both give opposite instructions at the exact same second, the child is confused about which instruction to obey!\nJava avoids this family conflict by saying: \"Every class can have only ONE direct parent class.\"\n\n\ud83d\udca1 8. Try It Yourself\nCreate three simple classes: `Device`, `Phone extends Device`, and `SmartPhone extends Phone`.\nCreate a `SmartPhone` object and notice how it can call methods from all three levels!",
    "coreExplanation": [
      "1. Single Inheritance: Exactly one child class extends one parent class (e.g. Dog extends Animal). Simple and direct.",
      "2. Multilevel Inheritance: An inheritance ladder where class C extends class B, and class B extends class A. Class C gets features from both B and A.",
      "3. Hierarchical Inheritance: One parent class has several child classes (e.g. Dog extends Animal, and Cat extends Animal).",
      "4. Why Multiple Inheritance of Classes is Forbidden: Java does not allow 'class C extends A, B'. If both A and B have a method with the same name, Java cannot decide which one to run. This is known as the Diamond Problem.",
      "5. The Single-Parent Rule: In Java, every class has at most ONE direct superclass. If you do not write 'extends', Java automatically makes your class extend the root 'java.lang.Object' class!",
      "6. Preview of Interfaces: Later in Module 5, you will learn that Java allows multiple inheritance of BEHAVIOR using Interfaces. But for regular classes, multiple extends is completely forbidden."
    ],
    "codeSnippet": {
      "title": "Multilevel and Hierarchical Inheritance in Action",
      "code": "// 1. Grandparent class\nclass Animal {\n    void eat() {\n        System.out.println(\"Animal is eating\");\n    }\n}\n\n// 2. Parent class (inherits from Animal)\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Dog is barking\");\n    }\n}\n\n// 3. Child class (inherits from Dog, which inherits from Animal)\nclass Puppy extends Dog {\n    void weep() {\n        System.out.println(\"Puppy is weeping softly\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Puppy myPuppy = new Puppy();\n\n        // Puppy gets methods from all 3 levels:\n        myPuppy.eat();   // From Animal (Grandparent)\n        myPuppy.bark();  // From Dog (Parent)\n        myPuppy.weep();  // From Puppy (Self)\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Animal {",
          "explanation": "The top-level grandparent class containing the eat() method."
        },
        {
          "line": "class Dog extends Animal {",
          "explanation": "Dog inherits eat() from Animal and adds bark()."
        },
        {
          "line": "class Puppy extends Dog {",
          "explanation": "Puppy inherits from Dog. By doing so, Puppy gets BOTH bark() from Dog and eat() from Animal!"
        },
        {
          "line": "Puppy myPuppy = new Puppy();",
          "explanation": "We create a Puppy object. It has access to methods across the entire multilevel chain."
        },
        {
          "line": "myPuppy.eat();",
          "explanation": "Puppy successfully runs the method defined way up in Animal."
        }
      ],
      "output": "Animal is eating\nDog is barking\nPuppy is weeping softly"
    },
    "beginnerMistakes": [
      {
        "mistake": "Trying to write multiple class names after extends: 'class C extends A, B'.",
        "whyItHappens": "Wanting a class to get features from two different classes at the same time.",
        "howToFix": "Java does not allow this. Use multilevel inheritance (C extends B, and B extends A) or use Interfaces.",
        "codeSnippet": "// WRONG: class Smartphone extends Phone, Camera { }\n// CORRECT: Use Single or Multilevel inheritance, or Interfaces."
      },
      {
        "mistake": "Creating circular inheritance: 'class A extends B' and 'class B extends A'.",
        "whyItHappens": "Trying to share methods both ways between two classes.",
        "howToFix": "Circular inheritance is an immediate compile-time error ('Cyclic inheritance involving A'). Inheritance must always flow in one direction.",
        "codeSnippet": "// WRONG:\n// class A extends B { }\n// class B extends A { } // COMPILE ERROR!"
      }
    ],
    "practiceProblems": [
      {
        "title": "Predict the Output: Multilevel Method Chain",
        "problemStatement": "What will this code print?",
        "code": "class Grandparent {\n    void printA() { System.out.print(\"A\"); }\n}\nclass Parent extends Grandparent {\n    void printB() { System.out.print(\"B\"); }\n}\nclass Child extends Parent {\n    void printC() { System.out.print(\"C\"); }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Child c = new Child();\n        c.printA();\n        c.printB();\n        c.printC();\n    }\n}",
        "options": [
          "ABC",
          "CBA",
          "Compile error: Child cannot call printA()",
          "Prints only C"
        ],
        "correctOptionIndex": 0,
        "hint": "In multilevel inheritance, does the child get methods from its grandparent?",
        "solution": "ABC",
        "explanation": "Yes! Child inherits printB() from Parent, and also inherits printA() from Grandparent. Calling them in order prints 'ABC'."
      },
      {
        "title": "Identify the Type of Inheritance",
        "problemStatement": "Look at these classes:\nclass Shape { }\nclass Circle extends Shape { }\nclass Square extends Shape { }\nWhat type of inheritance is this?",
        "code": "",
        "options": [
          "Single Inheritance",
          "Multilevel Inheritance",
          "Hierarchical Inheritance",
          "Multiple Inheritance"
        ],
        "correctOptionIndex": 2,
        "hint": "One parent class (Shape) has two child classes (Circle and Square).",
        "solution": "Hierarchical Inheritance",
        "explanation": "When multiple child classes extend the exact same parent class, it is called Hierarchical Inheritance."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why doesn't Java allow multiple inheritance with classes?",
        "expectedAnswer": "To prevent the Diamond Problem. If two parent classes have a method with the same name and a child extends both, Java cannot decide which one to run. Java avoids this ambiguity by disallowing multiple class inheritance.",
        "answer": "To prevent the Diamond Problem. If two parent classes have a method with the same name and a child extends both, Java cannot decide which one to run. Java avoids this ambiguity by disallowing multiple class inheritance.",
        "commonMistake": "Forgetting to mention that interfaces solve this later."
      },
      {
        "question": "What is the difference between Multilevel and Hierarchical inheritance?",
        "expectedAnswer": "In Multilevel inheritance, classes form a linear chain (Grandparent -> Parent -> Child), where Child gets methods from all ancestors above it. In Hierarchical inheritance, multiple child classes extend the SAME common parent (like Dog and Cat both extending Animal).",
        "answer": "In Multilevel inheritance, classes form a linear chain (Grandparent -> Parent -> Child), where Child gets methods from all ancestors above it. In Hierarchical inheritance, multiple child classes extend the SAME common parent (like Dog and Cat both extending Animal).",
        "commonMistake": "Confusing Hierarchical with Multiple inheritance."
      },
      {
        "question": "Which class is the root superclass of every class in Java?",
        "expectedAnswer": "java.lang.Object is the universal root class in Java. If a class does not explicitly write 'extends', the Java compiler automatically adds 'extends java.lang.Object' behind the scenes.",
        "answer": "java.lang.Object is the universal root class in Java. If a class does not explicitly write 'extends', the Java compiler automatically adds 'extends java.lang.Object' behind the scenes.",
        "commonMistake": "Thinking primitive types or interfaces directly extend Object."
      }
    ],
    "miniQuiz": [
      {
        "id": "inh-mq2-1",
        "question": "Which type of inheritance is represented by: Animal -> Mammal -> Dog?",
        "options": [
          "Single Inheritance",
          "Multilevel Inheritance",
          "Multiple Inheritance",
          "Hybrid Inheritance"
        ],
        "correctIndex": 1,
        "explanation": "A chain of inheritance from Grandparent to Parent to Child is called Multilevel Inheritance."
      },
      {
        "id": "inh-mq2-2",
        "question": "Why does Java forbid: 'class C extends A, B'?",
        "options": [
          "Because computers do not have enough memory for two classes",
          "Because of the Diamond Problem: if both A and B have the same method, Java does not know which one to run",
          "Because class names cannot be separated by commas",
          "Because Java 8 removed it"
        ],
        "correctIndex": 1,
        "explanation": "The Diamond Problem creates confusion when two parent classes define the same method. Java forbids it to keep code clean and predictable."
      },
      {
        "id": "inh-mq2-3",
        "question": "If you create a class without writing 'extends', which class does it automatically extend in Java?",
        "options": [
          "java.lang.System",
          "java.lang.Object",
          "java.lang.Class",
          "It extends nothing"
        ],
        "correctIndex": 1,
        "explanation": "In Java, java.lang.Object is the ultimate parent of every single class. If you don't write extends, Java adds 'extends Object' automatically."
      },
      {
        "id": "inh-mq2-4",
        "question": "Can a class extend itself (e.g. 'class A extends A')?",
        "options": [
          "Yes, it creates a recursive class",
          "No, circular inheritance is a compile-time error",
          "Yes, but only in Java 21",
          "Yes, if it has a constructor"
        ],
        "correctIndex": 1,
        "explanation": "A class cannot extend itself. Circular or cyclic inheritance will fail to compile."
      }
    ],
    "cheatSheet": {
      "summary": "Java supports Single, Multilevel, and Hierarchical inheritance for classes, but completely forbids Multiple class inheritance to avoid the Diamond Problem.",
      "syntaxTemplate": "// 1. Single: class B extends A { }\n// 2. Multilevel: class C extends B { } where B extends A\n// 3. Hierarchical: class B extends A { } and class C extends A { }\n// FORBIDDEN: class C extends A, B { } // Compile error!",
      "rules": [
        {
          "rule": "Single Direct Parent",
          "explanation": "Every class can have at most one direct parent after the 'extends' keyword."
        },
        {
          "rule": "The Diamond Problem Banned",
          "explanation": "Java avoids method collision confusion by disallowing multiple class inheritance."
        },
        {
          "rule": "Root Object Class",
          "explanation": "Every class in Java ultimately traces its family tree back to java.lang.Object."
        },
        {
          "rule": "Multilevel Accumulation",
          "explanation": "In multilevel inheritance, the bottom-most child inherits methods from all ancestors above it."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Single",
          "optionA": "1 Parent \u2192 1 Child",
          "optionB": "Simple, direct link"
        },
        {
          "aspect": "Multilevel",
          "optionA": "Grandparent \u2192 Parent \u2192 Child",
          "optionB": "Chain of inheritance"
        },
        {
          "aspect": "Hierarchical",
          "optionA": "1 Parent \u2192 Multiple Children",
          "optionB": "Shared parent for sibling classes"
        },
        {
          "aspect": "Multiple",
          "optionA": "Forbidden for classes ('extends A, B')",
          "optionB": "Allowed only with Interfaces"
        }
      ],
      "quickDefinitions": [
        {
          "term": "Single Inheritance",
          "oneLiner": "One child class extending one parent class.",
          "interviewExplanation": "The simplest form of inheritance where a subclass has exactly one direct superclass.",
          "realWorldExample": "Car extends Vehicle.",
          "codeExample": "class Car extends Vehicle { }"
        },
        {
          "term": "Multilevel Inheritance",
          "oneLiner": "A chain of inheritance where a child extends a parent who extends a grandparent.",
          "interviewExplanation": "Subclass inherits from another subclass, forming a vertical lineage. All ancestor methods flow down.",
          "realWorldExample": "Puppy extends Dog, and Dog extends Animal.",
          "codeExample": "class Puppy extends Dog { }"
        },
        {
          "term": "The Diamond Problem",
          "oneLiner": "Confusion when two parents provide the same method to a common child.",
          "interviewExplanation": "The reason Java disallows multiple class inheritance: prevents conflicting method resolution.",
          "realWorldExample": "Two bosses giving contradictory orders at the same moment.",
          "codeExample": "// class D extends B, C // FORBIDDEN in Java!"
        }
      ],
      "differences": [
        {
          "title": "Single vs Multilevel vs Multiple Inheritance",
          "conceptA": "Single / Multilevel (Allowed)",
          "conceptB": "Multiple with classes (Forbidden)",
          "keyDifference": "Java allows vertical chains with single parents, but forbids multiple direct parents.",
          "comparisonPoints": [
            {
              "feature": "Number of Parents",
              "a": "Exactly 1 direct parent per class",
              "b": "2 or more direct parents"
            },
            {
              "feature": "Java Support",
              "a": "Fully supported with 'extends'",
              "b": "Compiler error"
            }
          ]
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "Why doesn't Java allow multiple inheritance with classes?",
          "answer": "To prevent the Diamond Problem. If two parent classes have a method with the same name and a child extends both, Java cannot decide which one to run. Java avoids this ambiguity by disallowing multiple class inheritance.",
          "trapsToAvoid": "Forgetting to mention that interfaces solve this later."
        },
        {
          "question": "What is the difference between Multilevel and Hierarchical inheritance?",
          "answer": "In Multilevel inheritance, classes form a linear chain (Grandparent -> Parent -> Child), where Child gets methods from all ancestors above it. In Hierarchical inheritance, multiple child classes extend the SAME common parent (like Dog and Cat both extending Animal).",
          "trapsToAvoid": "Confusing Hierarchical with Multiple inheritance."
        },
        {
          "question": "Which class is the root superclass of every class in Java?",
          "answer": "java.lang.Object is the universal root class in Java. If a class does not explicitly write 'extends', the Java compiler automatically adds 'extends java.lang.Object' behind the scenes.",
          "trapsToAvoid": "Thinking primitive types or interfaces directly extend Object."
        }
      ]
    }
  },
  "super-constructor-chaining": {
    "id": "super-constructor-chaining",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.3",
    "title": "Constructors & super() in Inheritance",
    "subtitle": "How parent constructors run first, and how child classes pass data to parents",
    "estimatedMinutes": 22,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 Why a parent class constructor ALWAYS runs before a child constructor.\n\u2022 What the `super()` keyword is and how Java uses it behind the scenes.\n\u2022 How to pass values from a child constructor to a parent constructor using `super(name, age)`.\n\u2022 The golden rule: `super()` must always be the very first line inside a constructor!\n\u2022 What happens when a parent class does not have a default (no-argument) constructor.\n\n\ud83e\udd14 2. Why do we need this?\nWhen you buy a furnished apartment, the builders first construct the concrete structure and walls, and only after the building exists can you decorate your room.\nIn Java, a child class builds on top of a parent class.\nIf the parent class has variables like `name` or `brand`, who initializes them? The parent's constructor!\nBefore a `Dog` can wag its tail, the general `Animal` body must be created first.\nTherefore, Java ensures that the parent constructor ALWAYS finishes running before the child constructor begins.\n\n\ud83e\udde0 3. Simple Explanation\nThink of it like human life:\n\u2022 The father must be born before the son!\n\u2022 A son cannot be born before his father.\nIn Java:\n\u2022 When you create a Child object: `Child c = new Child();`\n\u2022 Java calls the Child constructor.\n\u2022 But inside the Child constructor, the very first thing Java does is call the Parent constructor using `super()`.\n\u2022 If you do NOT type `super();`, Java's compiler is kind enough to automatically insert `super();` for you on line 1!\n\nLet us see what `super()` does:\n1. `super();` -> Calls the parent's default constructor (with no arguments).\n2. `super(value1, value2);` -> Calls the parent's constructor that takes arguments.\n\nThe Golden Rule of `super()`:\nIt MUST be the very first statement inside the child constructor. If you put any line of code before `super()`, Java will refuse to compile with an error!\n\n\ud83c\udf0d 4. Real-Life Example\nThink of a Person and a Student:\n\u2022 Every Person has a `name` and an `age`.\n\u2022 A Student is a Person, but also has a `rollNumber` and a `schoolName`.\nWhen a new Student joins school:\n1. First, their general Person identity is registered (`name`, `age`).\n2. Then, their Student-specific identity is added (`rollNumber`).\nIn Java code, the `Student` constructor takes `(name, age, rollNumber)`. It sends `name` and `age` to the `Person` parent constructor using `super(name, age)`, and sets `rollNumber` itself!\n\n\ud83d\udca1 8. Try It Yourself\nTry writing a class `Vehicle` with constructor `Vehicle() { System.out.println(\"Vehicle ready\"); }` and class `Car extends Vehicle` with `Car() { System.out.println(\"Car ready\"); }`.\nCreate `new Car();` and observe which message prints first!",
    "coreExplanation": [
      "1. Constructor Execution Order: Parent constructor always runs BEFORE the child constructor. In a multilevel chain, Grandparent runs first, then Parent, then Child.",
      "2. The super() Call: The 'super()' keyword calls the constructor of the direct parent class.",
      "3. Automatic Insertion of super(): If you do not write super() or this() as the first line of a constructor, the Java compiler automatically inserts 'super();' (no-arguments) for you.",
      "4. The First-Line Rule: Any explicit call to 'super()' or 'this()' MUST be the absolute first statement inside the constructor body.",
      "5. Passing Arguments with super(args): If the parent class has a parameterized constructor (e.g. Animal(String name)), the child class must explicitly call 'super(name);' to pass the value up.",
      "6. The 'No Default Constructor' Trap: If a parent class defines a parameterized constructor and NO default constructor, the child class CANNOT rely on automatic super(). The child must explicitly call super(...) with appropriate arguments."
    ],
    "codeSnippet": {
      "title": "Passing Data to Parent Constructor Using super()",
      "code": "// 1. Parent class\nclass Person {\n    String name;\n    int age;\n\n    // Parent constructor\n    Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n        System.out.println(\"1. Person constructor ran for: \" + name);\n    }\n}\n\n// 2. Child class\nclass Student extends Person {\n    int rollNumber;\n\n    // Child constructor\n    Student(String name, int age, int rollNumber) {\n        // Step 1: Send name and age up to the Person parent constructor\n        super(name, age); \n\n        // Step 2: Initialize Student's own variable\n        this.rollNumber = rollNumber;\n        System.out.println(\"2. Student constructor ran for roll: \" + rollNumber);\n    }\n\n    void display() {\n        System.out.println(\"Student: \" + name + \", Age: \" + age + \", Roll: \" + rollNumber);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Creating student object...\");\n        Student s = new Student(\"Rahul\", 16, 101);\n        s.display();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Person(String name, int age) {",
          "explanation": "Parent class constructor takes name and age and sets them."
        },
        {
          "line": "class Student extends Person {",
          "explanation": "Student inherits from Person."
        },
        {
          "line": "super(name, age);",
          "explanation": "Calls the Person(String, int) constructor. It MUST be the first statement in Student's constructor."
        },
        {
          "line": "this.rollNumber = rollNumber;",
          "explanation": "After the parent is ready, the child sets its own unique rollNumber variable."
        },
        {
          "line": "Student s = new Student(\"Rahul\", 16, 101);",
          "explanation": "Triggers the chain: Student constructor calls Person constructor first, then finishes itself."
        },
        {
          "line": "s.display();",
          "explanation": "Displays the complete details. Notice Student can directly print 'name' and 'age' inherited from Person!"
        }
      ],
      "output": "Creating student object...\n1. Person constructor ran for: Rahul\n2. Student constructor ran for roll: 101\nStudent: Rahul, Age: 16, Roll: 101"
    },
    "beginnerMistakes": [
      {
        "mistake": "Writing code before super() inside a constructor.",
        "whyItHappens": "Wanting to print a message or validate an argument before calling super().",
        "howToFix": "Java requires super() to be the first line. Move all your calculations or prints after super(), or pass expressions directly inside super(arg).",
        "codeSnippet": "// WRONG:\n// Student(String name) {\n//     System.out.println(\"Starting\");\n//     super(name); // COMPILE ERROR!\n// }\n// CORRECT:\n// Student(String name) {\n//     super(name);\n//     System.out.println(\"Starting\");\n// }"
      },
      {
        "mistake": "Trying to use both this() and super() in the same constructor.",
        "whyItHappens": "Wanting to call another constructor in the same class AND call the parent constructor.",
        "howToFix": "Both this() and super() demand to be the first line, so you cannot have both! If you use this(), the other constructor will eventually call super().",
        "codeSnippet": "// WRONG:\n// Student() {\n//     this(\"Default\");\n//     super(); // COMPILE ERROR!\n// }"
      },
      {
        "mistake": "Parent has only a parameterized constructor, but child tries to use default super().",
        "whyItHappens": "Forgetting that once you define any constructor in a parent class, Java removes the invisible default constructor.",
        "howToFix": "Either add a no-argument constructor to the parent, or make the child constructor explicitly call super(arguments).",
        "codeSnippet": "// Parent:\n// class Parent { Parent(int x) { } }\n// Child:\n// class Child extends Parent { \n//     Child() { } // COMPILE ERROR: Implicit super() cannot find Parent()\n//     Child() { super(10); } // CORRECT!\n// }"
      }
    ],
    "practiceProblems": [
      {
        "title": "Multilevel Constructor Output Tracing",
        "problemStatement": "What will this code print when main executes?",
        "code": "class A {\n    A() { System.out.print(\"A \"); }\n}\nclass B extends A {\n    B() { System.out.print(\"B \"); }\n}\nclass C extends B {\n    C() { System.out.print(\"C \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        C obj = new C();\n    }\n}",
        "options": [
          "C B A",
          "A B C",
          "B C A",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "Start from the topmost grandparent class in the hierarchy.",
        "solution": "A B C",
        "explanation": "When new C() is created, C calls super() to B, and B calls super() to A. Class A finishes first printing 'A ', then B finishes printing 'B ', and finally C finishes printing 'C '."
      },
      {
        "title": "Spot the Error in Constructor Call Order",
        "problemStatement": "Why does this constructor fail to compile?",
        "code": "class Car extends Vehicle {\n    int speed;\n    Car(String brand, int speed) {\n        this.speed = speed;\n        super(brand);\n    }\n}",
        "options": [
          "Vehicle does not have a speed variable",
          "super(brand) must be the first statement in the constructor",
          "Car cannot extend Vehicle",
          "this.speed cannot be assigned"
        ],
        "correctOptionIndex": 1,
        "hint": "Check the line position of super(brand).",
        "solution": "super(brand) must be the first statement in the constructor",
        "explanation": "Java strictly requires any explicit constructor call (super() or this()) to be the very first line in the constructor body. Placing 'this.speed = speed;' before super() causes a compilation error."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Can we call both this() and super() in the same constructor?",
        "expectedAnswer": "No. Both this() and super() must be the very first statement in a constructor body. Since you can only have one first statement, calling both in the same constructor causes a compile error.",
        "followUp": "How can you still execute logic from both?",
        "followUpAnswer": "You can call this() to delegate to a peer constructor, and that peer constructor will call super()."
      },
      {
        "question": "Why does a parent constructor run before the child constructor?",
        "expectedAnswer": "Because a child class builds upon and may depend on variables and state provided by the parent. If child code ran first, it might access parent variables before they are initialized, causing errors or inconsistent state.",
        "followUp": "What is constructor chaining?",
        "followUpAnswer": "Constructor chaining is the sequential invocation of constructors through the inheritance hierarchy via super(), from the current class all the way up to java.lang.Object."
      },
      {
        "question": "What happens if the parent class has no default (no-arg) constructor?",
        "expectedAnswer": "If a parent class only defines parameterized constructors and no default constructor, the child class constructor will fail to compile unless it explicitly calls super(...) with matching arguments.",
        "followUp": "Does Java generate a default constructor if we define a parameterized one?",
        "followUpAnswer": "No. Java only generates an automatic no-arg constructor if NO constructors are defined at all in the class."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-33-01",
        "question": "Where must the super() constructor call be placed in a child constructor?",
        "options": [
          "Anywhere in the constructor",
          "As the very first statement",
          "As the last statement before return",
          "Inside a static block"
        ],
        "correctIndex": 1,
        "explanation": "Java requires explicit constructor calls (super() or this()) to be the first line of the constructor."
      },
      {
        "id": "mq-33-02",
        "question": "What does Java do if you do not write super() in a child constructor?",
        "options": [
          "It skips the parent constructor entirely",
          "It automatically inserts an invisible super(); on line 1",
          "It causes a compilation error",
          "It calls this() instead"
        ],
        "correctIndex": 1,
        "explanation": "If no constructor call is written on line 1, the Java compiler automatically inserts a call to super() with no arguments."
      },
      {
        "id": "mq-33-03",
        "question": "In a 3-tier hierarchy (Animal -> Mammal -> Dog), which constructor completes execution first when 'new Dog()' is called?",
        "options": [
          "Dog constructor",
          "Mammal constructor",
          "Animal constructor",
          "Object constructor"
        ],
        "correctIndex": 3,
        "explanation": "The constructor chain reaches all the way to java.lang.Object first. Object completes first, followed by Animal, Mammal, and finally Dog."
      }
    ],
    "cheatSheet": {
      "summary": "In Java inheritance, the parent constructor always executes before the child constructor. Use super() to call the parent's no-argument constructor or super(args) to pass parameters up.",
      "syntaxTemplate": "class Parent {\n    Parent(String name) { ... }\n}\n\nclass Child extends Parent {\n    Child(String name, int age) {\n        super(name); // MUST be first statement\n        // initialize child variables\n    }\n}",
      "rules": [
        {
          "rule": "Parent Before Child",
          "explanation": "Java always completes parent class initialization before executing child constructor body."
        },
        {
          "rule": "Automatic super()",
          "explanation": "If no constructor call is written on line 1, Java automatically inserts invisible 'super();'."
        },
        {
          "rule": "First Statement Only",
          "explanation": "super() and this() must be the first statement in a constructor. Placing any statement before them results in a compile error."
        },
        {
          "rule": "Parameterized Parent Trap",
          "explanation": "If parent class only has a parameterized constructor, the child constructor MUST call super(args) explicitly."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Target",
          "optionA": "super(): Calls the PARENT class constructor",
          "optionB": "this(): Calls another constructor in the SAME class"
        },
        {
          "aspect": "Position",
          "optionA": "Must be line 1 of child constructor",
          "optionB": "Must be line 1 of current constructor"
        },
        {
          "aspect": "Coexistence",
          "optionA": "Cannot use both super() and this() in the same constructor block",
          "optionB": "Cannot use both this() and super() in the same constructor block"
        },
        {
          "aspect": "Purpose",
          "optionA": "Initializes inherited parent fields",
          "optionB": "Eliminates duplicate initialization code across constructors in one class"
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "Can we call both this() and super() in the same constructor?",
          "answer": "No. Both this() and super() must be the very first statement in a constructor. Since you can only have one first statement, calling both in the same constructor causes a compile error.",
          "trapsToAvoid": "Saying yes if you put one on line 1 and one on line 2."
        },
        {
          "question": "Why does a parent constructor run before the child constructor?",
          "answer": "Because a child class builds upon and may depend on variables and state provided by the parent. If child code ran first, it might access parent variables before they are initialized, causing errors or inconsistent state.",
          "trapsToAvoid": "Forgetting to mention safety and proper object initialization."
        },
        {
          "question": "What happens if the parent class has no default (no-arg) constructor?",
          "answer": "If a parent class only defines parameterized constructors and no default constructor, the child class constructor will fail to compile unless it explicitly calls super(...) with matching arguments.",
          "trapsToAvoid": "Saying Java will create a default constructor for the parent anyway."
        }
      ]
    }
  },
  "method-overriding-rules": {
    "id": "method-overriding-rules",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.4",
    "title": "Method Overriding & The @Override Annotation",
    "subtitle": "Giving child classes their own special behavior when parent behavior is too general",
    "estimatedMinutes": 22,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 What method overriding is and why child classes need it.\n\u2022 How method overriding is different from method overloading.\n\u2022 What the `@Override` annotation is and why it saves you from embarrassing bugs.\n\u2022 The 4 simple rules of method overriding every beginner must know.\n\u2022 Which methods CANNOT be overridden in Java.\n\n\ud83e\udd14 2. Why do we need this?\nImagine a parent class `Animal` with a method `makeSound()`:\n```java\nclass Animal {\n    void makeSound() {\n        System.out.println(\"Animal makes a sound\");\n    }\n}\n```\nNow a `Dog` extends `Animal`.\nIf a Dog calls `makeSound()`, it should NOT say \"Animal makes a sound\"!\nA Dog should say \"Woof Woof!\".\nAnd a `Cat` should say \"Meow!\".\nThe parent's general method is too generic for the specific child.\nThe child needs to **replace** the parent's generic method with its own specific version.\nThis is called **Method Overriding**!\n\n\ud83e\udde0 3. Simple Explanation\nMethod Overriding means:\n\"A child class writes a method that has the **EXACT SAME name, exact same parameters, and same return type** as a method in its parent class.\"\nWhen you call that method on a child object, Java runs the **child's version**, NOT the parent's version!\n\nWhat is the `@Override` annotation?\nLook at this symbol: `@Override`.\nIt is a special sticky note you write right above your method in the child class:\n```java\n@Override\nvoid makeSound() {\n    System.out.println(\"Woof Woof\");\n}\n```\nWhy write `@Override`?\nImagine you accidentally mistyped the method name as `makesound()` (with lowercase 's').\nWithout `@Override`, Java thinks you just created a brand-new method! The parent's method is NOT overridden, and you spend 3 hours debugging why your dog won't bark.\nWith `@Override`, Java immediately checks the parent class. If it doesn't find a matching method, the compiler gives you an error right away:\n*\"Method does not override method from its superclass!\"*\nIt is your safety net! Always use it!\n\nThe 4 Simple Rules of Overriding:\n1. **Name & Parameters must match exactly**: If parameters are different, that is Overloading, NOT Overriding!\n2. **Return type must match** (or be a subtype / covariant).\n3. **Visibility cannot be reduced**: If parent method is `public`, child method MUST be `public`. (Analogy: If parent opened the door for everyone, the child cannot lock it!).\n4. **These CANNOT be overridden**:\n   \u2022 `private` methods (child cannot even see them).\n   \u2022 `static` methods (they belong to class, not object - this is method hiding).\n   \u2022 `final` methods (final means \"locked, do not change!\").\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a Bank Account and Interest:\n\u2022 A general `BankAccount` calculates interest at 2%.\n\u2022 A `SavingsAccount` overrides `calculateInterest()` to give 4%.\n\u2022 A `SeniorCitizenAccount` overrides `calculateInterest()` to give 7%.\nAll three accounts share the same method name `calculateInterest()`, but each account type calculates it according to its own rules!\n\n\ud83d\udca1 8. Try It Yourself\nCreate an `Animal` parent class with `void eat()`.\nCreate a `Lion` child class that overrides `eat()` to print \"Lion eats meat!\".\nCreate a `Cow` child class that overrides `eat()` to print \"Cow eats grass!\".\nCall `eat()` on both objects and watch each child run its own version!",
    "coreExplanation": [
      "1. Method Overriding: When a child class provides its own specific implementation of a method that is already defined in its parent class.",
      "2. Exact Signature Requirement: The method in the child class must have the exact same method name, same parameter types and count, and compatible return type as the parent method.",
      "3. The @Override Annotation: A compiler check that verifies you are actually overriding a parent method. It catches typos in method names and parameter types at compile time.",
      "4. Overriding vs Overloading: Overriding is in DIFFERENT classes (Parent & Child) with the SAME parameters. Overloading is in the SAME class with DIFFERENT parameters.",
      "5. Access Modifier Rule: The overriding method in the child class can be equally or MORE accessible, but NEVER less accessible (public -> public, protected -> protected or public).",
      "6. Methods that Cannot be Overridden: private methods (invisible to child), static methods (method hiding, resolved at compile-time), and final methods (explicitly forbidden to override)."
    ],
    "codeSnippet": {
      "title": "Method Overriding with @Override in Animal Hierarchy",
      "code": "class Animal {\n    void makeSound() {\n        System.out.println(\"Animal makes a general sound\");\n    }\n}\n\nclass Dog extends Animal {\n    // We override the parent method with our own sound:\n    @Override\n    void makeSound() {\n        System.out.println(\"Dog barks: Woof! Woof!\");\n    }\n}\n\nclass Cat extends Animal {\n    // Cat also overrides the parent method:\n    @Override\n    void makeSound() {\n        System.out.println(\"Cat meows: Meow! Meow!\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal generalAnimal = new Animal();\n        generalAnimal.makeSound(); // Runs Animal's method\n\n        Dog myDog = new Dog();\n        myDog.makeSound();         // Runs Dog's overridden method\n\n        Cat myCat = new Cat();\n        myCat.makeSound();         // Runs Cat's overridden method\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Animal { void makeSound() { ... } }",
          "explanation": "Parent class defines the generic fallback behavior."
        },
        {
          "line": "class Dog extends Animal {",
          "explanation": "Dog inherits from Animal."
        },
        {
          "line": "@Override",
          "explanation": "The safety tag telling Java: 'Verify that makeSound() exists in Animal and has identical signature'."
        },
        {
          "line": "void makeSound() { ... }",
          "explanation": "Dog provides its own custom bark implementation."
        },
        {
          "line": "myDog.makeSound();",
          "explanation": "Java calls the Dog class version because myDog is a Dog object. It prints 'Woof! Woof!'."
        },
        {
          "line": "myCat.makeSound();",
          "explanation": "Java calls the Cat class version because myCat is a Cat object. It prints 'Meow! Meow!'."
        }
      ],
      "output": "Animal makes a general sound\nDog barks: Woof! Woof!\nCat meows: Meow! Meow!"
    },
    "beginnerMistakes": [
      {
        "mistake": "Accidentally changing parameter types and thinking you overrode the method.",
        "whyItHappens": "Writing 'void eat(String food)' in child while parent had 'void eat()'.",
        "howToFix": "This is Overloading, NOT Overriding! Use @Override. The compiler will catch this instantly and warn you.",
        "codeSnippet": "// Parent: void eat() { }\n// Child:\n// @Override\n// void eat(String food) { } // COMPILE ERROR: Method does not override!"
      },
      {
        "mistake": "Reducing the access modifier (e.g. parent is public, child makes it protected or default).",
        "whyItHappens": "Forgetting the visibility rule.",
        "howToFix": "Child method visibility must be equal or broader than parent. If parent is public, child MUST be public.",
        "codeSnippet": "// Parent: public void show() { }\n// Child:\n// void show() { } // COMPILE ERROR: Cannot reduce visibility from public!"
      },
      {
        "mistake": "Trying to override a static method.",
        "whyItHappens": "Assuming static methods behave like instance methods in inheritance.",
        "howToFix": "Static methods belong to the class, not the object. Declaring the same static method in a child is called 'Method Hiding', not overriding. Do not put @Override on static methods.",
        "codeSnippet": "// WRONG:\n// @Override\n// static void display() { } // COMPILE ERROR!"
      }
    ],
    "practiceProblems": [
      {
        "title": "Visibility Reduction Trap",
        "problemStatement": "Why will the following code result in a compilation error?",
        "code": "class Shape {\n    public void draw() {\n        System.out.println(\"Drawing shape\");\n    }\n}\nclass Circle extends Shape {\n    @Override\n    void draw() {\n        System.out.println(\"Drawing circle\");\n    }\n}",
        "options": [
          "Circle cannot extend Shape",
          "draw() cannot be overridden in Circle",
          "Cannot reduce visibility: Shape.draw() is public, but Circle.draw() has package-private access",
          "@Override is not allowed for void methods"
        ],
        "correctOptionIndex": 2,
        "hint": "Check the access modifiers of draw() in both Shape and Circle.",
        "solution": "Cannot reduce visibility: Shape.draw() is public, but Circle.draw() has package-private access",
        "explanation": "In Java, an overriding method cannot be more restrictive than the parent method. Since Shape.draw() is public, Circle.draw() must also be declared public."
      },
      {
        "title": "Overriding vs Overloading Identification",
        "problemStatement": "Does the child class override or overload the parent method?",
        "code": "class Calculator {\n    int add(int a, int b) {\n        return a + b;\n    }\n}\nclass AdvancedCalc extends Calculator {\n    double add(double a, double b) {\n        return a + b;\n    }\n}",
        "options": [
          "It overrides add()",
          "It overloads add()",
          "It causes a compilation error",
          "It shadows add()"
        ],
        "correctOptionIndex": 1,
        "hint": "Look closely at the parameter types: int vs double.",
        "solution": "It overloads add()",
        "explanation": "Because the parameter types are different (double instead of int), this is method overloading across inheritance, NOT method overriding."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between Method Overloading and Method Overriding?",
        "expectedAnswer": "Overloading happens in the SAME class with the SAME method name but DIFFERENT parameter lists; it is resolved at compile time. Overriding happens between PARENT and CHILD classes with the EXACT SAME method name and parameters; it is resolved at runtime based on the actual object created.",
        "followUp": "Can you change the return type in overloading and overriding?",
        "followUpAnswer": "In overloading, return type can be anything as long as parameters differ. In overriding, return type must match the parent method or be a covariant subtype."
      },
      {
        "question": "Can we override private or static methods in Java?",
        "expectedAnswer": "No. Private methods are invisible outside their class, so a child cannot override them. Static methods belong to the class rather than instances; redefining a static method in a child class is called Method Hiding, not Method Overriding.",
        "followUp": "What happens if you place @Override on a static method?",
        "followUpAnswer": "The Java compiler generates a compile-time error: 'static methods cannot be annotated with @Override'."
      },
      {
        "question": "Why is the @Override annotation recommended even though it is optional?",
        "expectedAnswer": "The @Override annotation asks the compiler to verify that the method actually matches a parent method signature. If you make a spelling typo or change parameter types, the compiler generates an error instead of silently treating it as an overloaded or new method.",
        "followUp": "Does @Override have any performance impact at runtime?",
        "followUpAnswer": "No. @Override has SOURCE retention, meaning it is purely used by the compiler and discarded during bytecode generation."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-34-01",
        "question": "Which of the following is REQUIRED for valid method overriding in Java?",
        "options": [
          "Different parameter list in the child class",
          "Exact same method name and parameter types in parent and child",
          "Method must be declared static",
          "Parent method must be private"
        ],
        "correctIndex": 1,
        "explanation": "Method overriding requires the exact same method signature (name and parameter types)."
      },
      {
        "id": "mq-34-02",
        "question": "If a parent method is declared as 'protected void display()', which access modifier is NOT allowed on the overriding child method?",
        "options": [
          "protected",
          "public",
          "private",
          "Both protected and public are allowed, but private is NOT"
        ],
        "correctIndex": 3,
        "explanation": "A child class cannot reduce visibility. It can remain protected or expand to public, but cannot become private or default package-private."
      },
      {
        "id": "mq-34-03",
        "question": "What is the primary benefit of the @Override annotation?",
        "options": [
          "Speeds up method execution at runtime",
          "Catches spelling mistakes and parameter mismatches at compile time",
          "Allows overriding private methods",
          "Converts the method into a constructor"
        ],
        "correctIndex": 1,
        "explanation": "@Override acts as a compiler safeguard that flags an error if no matching parent method is found."
      }
    ],
    "cheatSheet": {
      "summary": "Method Overriding allows a child class to replace a parent class method with its own specialized behavior. Always use the @Override annotation to catch mistakes at compile time.",
      "syntaxTemplate": "class Parent {\n    public void doWork() {\n        // parent logic\n    }\n}\n\nclass Child extends Parent {\n    @Override\n    public void doWork() {\n        // child specialized logic\n    }\n}",
      "rules": [
        {
          "rule": "Exact Method Signature",
          "explanation": "Method name, number of parameters, and parameter types must be exactly the same."
        },
        {
          "rule": "Equal or Broader Visibility",
          "explanation": "Child method cannot have more restrictive access than parent (public cannot become protected/private)."
        },
        {
          "rule": "Compatible Return Type",
          "explanation": "Return type must be the same or a subtype (covariant return type)."
        },
        {
          "rule": "Non-Overridable Methods",
          "explanation": "Private methods, static methods, and final methods cannot be overridden."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Aspect",
          "optionA": "Method Overloading",
          "optionB": "Method Overriding"
        },
        {
          "aspect": "Where",
          "optionA": "Same class",
          "optionB": "Across Parent and Child classes"
        },
        {
          "aspect": "Parameters",
          "optionA": "MUST be DIFFERENT (count or type)",
          "optionB": "MUST be EXACTLY THE SAME"
        },
        {
          "aspect": "Return Type",
          "optionA": "Can be anything",
          "optionB": "Must match parent (or covariant subtype)"
        },
        {
          "aspect": "Resolution",
          "optionA": "Compile-time (Static polymorphism)",
          "optionB": "Runtime (Dynamic method dispatch)"
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "What is the difference between Method Overloading and Method Overriding?",
          "answer": "Overloading happens in the SAME class with the SAME method name but DIFFERENT parameter lists; it is resolved at compile time. Overriding happens between PARENT and CHILD classes with the EXACT SAME method name and parameters; it is resolved at runtime based on the actual object created.",
          "trapsToAvoid": "Forgetting to mention where they occur (same class vs parent-child)."
        },
        {
          "question": "Can we override private or static methods in Java?",
          "answer": "No. Private methods are invisible outside their class, so a child cannot override them. Static methods belong to the class rather than instances; redefining a static method in a child class is called Method Hiding, not Method Overriding.",
          "trapsToAvoid": "Thinking static methods can be overridden because you can define a method with the same name without an error."
        },
        {
          "question": "Why is the @Override annotation recommended even though it is optional?",
          "answer": "The @Override annotation asks the compiler to verify that the method actually matches a parent method signature. If you make a spelling typo or change parameter types, the compiler generates an error instead of silently treating it as an overloaded or new method.",
          "trapsToAvoid": "Saying @Override is mandatory for overriding to work."
        }
      ]
    }
  },
  "super-method-and-variable": {
    "id": "super-method-and-variable",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.5",
    "title": "Calling Parent Methods & Variables: super.method() and super.var",
    "subtitle": "How to reuse parent code without throwing it away, and the complete this vs super breakdown",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 How to reuse parent methods instead of completely replacing them with `super.method()`.\n\u2022 What Variable Shadowing is and how to reach the parent's variable using `super.variable`.\n\u2022 The complete 4-way comparison: `this.var`, `super.var`, `this()`, and `super()`.\n\u2022 When to build ON TOP of parent behavior rather than rewriting from scratch.\n\n\ud83e\udd14 2. Why do we need this?\nIn Lesson 3.4, we learned how to override a method.\nWhen you override a method, the child's version replaces the parent's version.\nBut what if the parent's method already does 80% of the hard work?\nFor example, an `Employee` class has a `display()` method that prints name, id, and salary.\nA `Manager` class also needs to print name, id, and salary, PLUS its department name!\nWould you copy-paste the printing of name, id, and salary into `Manager`? NO!\nCopy-pasting leads to bugs.\nInstead, we tell Java:\n\"Run the parent's `display()` method first, and then I will print the department name!\"\nWe do this using `super.display()`!\n\n\ud83e\udde0 3. Simple Explanation\nThe word `super` refers to the **Parent class**.\nJust like `this` refers to the **Current class**.\n\nYou can use `super` in two common ways in regular methods:\n1. `super.methodName()`:\n   Calls the parent class's version of a method from inside the child class.\n2. `super.variableName`:\n   Accesses the parent class's variable if the child class declared a variable with the exact same name (Variable Shadowing).\n\nThe Complete Master Table: `this` vs `super`\n\u2022 `this.name` -> Refers to variable in the CURRENT class.\n\u2022 `super.name` -> Refers to variable in the PARENT class.\n\u2022 `this(arg)` -> Calls another constructor in the SAME class.\n\u2022 `super(arg)` -> Calls constructor in the PARENT class.\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a Smart TV and a regular TV:\n\u2022 A regular TV turns on, connects to power, and displays the home screen.\n\u2022 A Smart TV does all of that, PLUS connects to Wi-Fi and launches Netflix.\nWhen the Smart TV boots up:\n1. It runs the parent TV startup routine: `super.turnOn();`\n2. Then it adds its smart features: `connectWifi(); launchApps();`\nIt doesn't invent electricity from scratch; it builds upon the foundation!\n\n\ud83d\udca1 8. Try It Yourself\nCreate class `Box` with `int length = 10;`.\nCreate class `BigBox extends Box` with `int length = 20;`.\nInside `BigBox`, write a method that prints both `this.length` and `super.length`!",
    "coreExplanation": [
      "1. Purpose of super.method(): Allows an overriding child method to invoke the original parent method implementation, preventing code duplication.",
      "2. Extending vs Replacing: Without super.method(), the child completely replaces parent behavior. With super.method(), the child augments and extends parent behavior.",
      "3. Variable Shadowing: When a child class declares an instance variable with the exact same name as a variable in the parent class, the child variable hides (shadows) the parent variable.",
      "4. Accessing Shadowed Variables: Use 'super.var' to refer specifically to the parent's variable, and 'this.var' to refer to the child's variable.",
      "5. Distinction from super(): 'super()' with parentheses calls a parent constructor (only allowed on line 1 of a constructor). 'super.something' with a dot calls a parent method or variable (allowed anywhere inside non-static methods).",
      "6. Static Context Limitation: Neither 'super' nor 'this' can be used inside static methods (like public static void main), because static methods belong to the class, not an object."
    ],
    "codeSnippet": {
      "title": "Using super.display() to Extend Parent Behavior",
      "code": "// Parent class\nclass Employee {\n    String name;\n    double salary;\n\n    Employee(String name, double salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n\n    void displayDetails() {\n        System.out.println(\"Employee: \" + name + \" | Base Salary: $\" + salary);\n    }\n}\n\n// Child class\nclass Manager extends Employee {\n    String department;\n\n    Manager(String name, double salary, String department) {\n        super(name, salary); // Calls Employee constructor\n        this.department = department;\n    }\n\n    @Override\n    void displayDetails() {\n        // Step 1: Let parent print the basic details\n        super.displayDetails();\n\n        // Step 2: Child adds its own extra information\n        System.out.println(\"  -> Role: Manager | Dept: \" + department);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Manager mgr = new Manager(\"Sneha\", 85000, \"Engineering\");\n        mgr.displayDetails();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Manager extends Employee {",
          "explanation": "Manager extends Employee to inherit name and salary."
        },
        {
          "line": "super(name, salary);",
          "explanation": "Calls Employee constructor to set name and salary."
        },
        {
          "line": "@Override void displayDetails() {",
          "explanation": "Manager overrides the displayDetails() method to add department information."
        },
        {
          "line": "super.displayDetails();",
          "explanation": "Calls Employee's displayDetails(). Prints 'Employee: Sneha | Base Salary: $85000'."
        },
        {
          "line": "System.out.println(\"  -> Role: Manager...\");",
          "explanation": "Manager prints its own extra department information right below the parent output."
        }
      ],
      "output": "Employee: Sneha | Base Salary: $85000.0\n  -> Role: Manager | Dept: Engineering"
    },
    "beginnerMistakes": [
      {
        "mistake": "Confusing super() with super.method().",
        "whyItHappens": "Both use the keyword 'super'.",
        "howToFix": "Remember: super() with round brackets calls the PARENT CONSTRUCTOR (only in constructors). super.method() with a dot calls a PARENT METHOD (inside any instance method).",
        "codeSnippet": "// In constructor: super(name); // Constructor call\n// In regular method: super.work(); // Method call"
      },
      {
        "mistake": "Writing super inside a static method like main().",
        "whyItHappens": "Trying to access parent members from inside public static void main.",
        "howToFix": "Static methods do not run inside an instance. Create an object and call methods on that object instead.",
        "codeSnippet": "// WRONG:\n// public static void main(String[] args) {\n//     super.display(); // COMPILE ERROR!\n// }"
      },
      {
        "mistake": "Calling super.method() in an infinite loop.",
        "whyItHappens": "Calling the child's own method instead of super.method() inside the child.",
        "howToFix": "If you write 'displayDetails();' inside 'displayDetails()', it calls itself infinitely (StackOverflowError). Write 'super.displayDetails();' to call the parent version.",
        "codeSnippet": "// WRONG:\n// void display() { display(); } // StackOverflowError!\n// CORRECT:\n// void display() { super.display(); }"
      }
    ],
    "practiceProblems": [
      {
        "title": "Variable Shadowing Disambiguation",
        "problemStatement": "What is the output of printSpeeds() in the following program?",
        "code": "class Parent {\n    int speed = 50;\n}\nclass Child extends Parent {\n    int speed = 100;\n    void printSpeeds() {\n        System.out.print(super.speed + \" \" + this.speed);\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Child().printSpeeds();\n    }\n}",
        "options": [
          "50 50",
          "100 100",
          "50 100",
          "100 50"
        ],
        "correctOptionIndex": 2,
        "hint": "super.speed targets the parent class variable, while this.speed targets the child class variable.",
        "solution": "50 100",
        "explanation": "super.speed refers to Parent's speed variable (50). this.speed refers to Child's speed variable (100). The output is '50 100'."
      },
      {
        "title": "Extending Method Execution Flow",
        "problemStatement": "What is printed when new Child().work() is executed?",
        "code": "class Parent {\n    void work() { System.out.print(\"ParentWork \"); }\n}\nclass Child extends Parent {\n    @Override\n    void work() {\n        super.work();\n        System.out.print(\"ChildWork \");\n    }\n}",
        "options": [
          "ChildWork ",
          "ParentWork ",
          "ParentWork ChildWork ",
          "ChildWork ParentWork "
        ],
        "correctOptionIndex": 2,
        "hint": "super.work() runs before the print statement in Child's work() method.",
        "solution": "ParentWork ChildWork ",
        "explanation": "Child's work() method invokes super.work() first, which prints 'ParentWork '. Then it continues to print 'ChildWork '."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why would you call super.method() inside an overridden method?",
        "expectedAnswer": "To extend rather than replace parent functionality. Instead of copying all parent code into the child, calling super.method() lets the parent execute its foundational logic, and the child adds only its specialized enhancements.",
        "followUp": "Is calling super.method() mandatory when overriding?",
        "followUpAnswer": "No. If you want to completely replace the parent's logic, you do not call super.method(). It is only needed when you want to augment parent behavior."
      },
      {
        "question": "Can you do super.super.method() in Java to access a grandparent method?",
        "expectedAnswer": "No. Java syntax does not support 'super.super'. You can only access your direct parent class members. This design enforces encapsulation and prevents violating class hierarchy boundaries.",
        "followUp": "How could a child access grandparent behavior if needed?",
        "followUpAnswer": "The direct parent class would have to provide an explicit method that invokes or exposes the grandparent behavior."
      },
      {
        "question": "What is variable shadowing in inheritance?",
        "expectedAnswer": "Variable shadowing occurs when a child class declares a field with the same name as a field in its parent class. Within the child class, the name refers to the child's field. To access the hidden parent field, you must write 'super.variableName'.",
        "followUp": "Are variables polymorphic in Java?",
        "followUpAnswer": "No. Variables in Java are resolved at compile time based on the reference type, never at runtime based on the actual object type."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-35-01",
        "question": "What does super.methodName() do when called inside an overridden child method?",
        "options": [
          "Calls the method on the Grandparent class directly",
          "Invokes the immediate parent class's version of that method",
          "Calls the child's own method recursively",
          "Deletes the parent method from memory"
        ],
        "correctIndex": 1,
        "explanation": "super.methodName() bypasses the child's overridden version and invokes the direct parent's implementation."
      },
      {
        "id": "mq-35-02",
        "question": "Can you use the 'super' keyword inside a static method like 'public static void main'?",
        "options": [
          "Yes, always",
          "Yes, if the parent class is also static",
          "No, 'super' cannot be referenced from a static context",
          "Yes, but only with round brackets: super()"
        ],
        "correctIndex": 2,
        "explanation": "Static methods belong to the class, not an object instance. Because 'super' refers to the parent instance, it is illegal in static contexts."
      },
      {
        "id": "mq-35-03",
        "question": "Which statement correctly distinguishes this() from super()?",
        "options": [
          "this() calls a constructor in the same class; super() calls a parent class constructor",
          "this() is for variables; super() is for methods",
          "super() can be used on any line; this() must be on line 1",
          "There is no difference between them"
        ],
        "correctIndex": 0,
        "explanation": "this() delegates to an overloaded constructor in the same class, while super() delegates to the parent class constructor."
      }
    ],
    "cheatSheet": {
      "summary": "Use super.method() to run the parent version of an overridden method, and super.variable to access a shadowed parent variable. Use super() with parentheses to call a parent constructor.",
      "syntaxTemplate": "class Child extends Parent {\n    @Override\n    void work() {\n        super.work(); // Reuses parent work\n        // adds extra child work\n    }\n}",
      "rules": [
        {
          "rule": "super.method() Invocation",
          "explanation": "Calls the parent class's method directly, bypassing the child's overridden version."
        },
        {
          "rule": "Shadowed Variable Disambiguation",
          "explanation": "When child and parent declare fields with identical names, super.field accesses the parent field."
        },
        {
          "rule": "No Static Access",
          "explanation": "super cannot be used in static methods, static blocks, or static field initializers."
        },
        {
          "rule": "Only Direct Superclass",
          "explanation": "Java does not allow super.super.method(). You can only call your direct parent's members."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Feature",
          "optionA": "this",
          "optionB": "super"
        },
        {
          "aspect": "Target",
          "optionA": "Refers to the CURRENT class instance",
          "optionB": "Refers to the DIRECT PARENT class instance"
        },
        {
          "aspect": "Constructor call",
          "optionA": "this(...) calls peer constructor in same class",
          "optionB": "super(...) calls parent class constructor"
        },
        {
          "aspect": "Member call",
          "optionA": "this.method() calls current instance method",
          "optionB": "super.method() calls parent class implementation"
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "Why would you call super.method() inside an overridden method?",
          "answer": "To extend rather than replace parent functionality. Instead of copying all parent code into the child, calling super.method() lets the parent execute its foundational logic, and the child adds only its specialized enhancements.",
          "trapsToAvoid": "Thinking super.method() is required in every overridden method."
        },
        {
          "question": "Can you do super.super.method() in Java to access a grandparent method?",
          "answer": "No. Java syntax does not support 'super.super'. You can only access your direct parent class members. This design enforces encapsulation and prevents violating class hierarchy boundaries.",
          "trapsToAvoid": "Thinking you can chain super keywords."
        },
        {
          "question": "What is variable shadowing in inheritance?",
          "answer": "Variable shadowing occurs when a child class declares a field with the same name as a field in its parent class. Within the child class, the name refers to the child's field. To access the hidden parent field, you must write 'super.variableName'.",
          "trapsToAvoid": "Calling variable shadowing 'variable overriding' (variables cannot be overridden in Java)."
        }
      ]
    }
  },
  "final-keyword-in-oop": {
    "id": "final-keyword-in-oop",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.6",
    "title": "The final Keyword in Inheritance: Locking Classes & Methods",
    "subtitle": "Protecting your classes from being extended and methods from being changed",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 The 3 distinct uses of the `final` keyword in Java: Variable, Method, and Class.\n\u2022 Why you would make a class `final` (and why `String` is final).\n\u2022 Why you would make a method `final` (to lock critical security or business logic).\n\u2022 The difference between `final`, `finally`, and `finalize` (a favorite interview question!).\n\n\ud83e\udd14 2. Why do we need this?\nInheritance is powerful, but sometimes freedom can cause danger.\nImagine you write a banking app with a method `calculateInterest()`:\n```java\nclass BankSecurity {\n    void verifyUser(String password) {\n        // Critical bank security code\n    }\n}\n```\nWhat if an inexperienced developer extends `BankSecurity` and overrides `verifyUser()` to always return `true`?\nAnyone could log in without a password!\nTo prevent other developers from altering or tampering with critical logic, Java gives us a lock: the `final` keyword!\nWhen something is marked `final`, it is final: NO CHANGES ALLOWED!\n\n\ud83e\udde0 3. Simple Explanation\nThink of `final` as a permanent lock \ud83d\udd12:\n\n1\ufe0f\u20e3 final Variable:\nValue CANNOT be changed once assigned. It is a constant.\n```java\nfinal double PI = 3.14159;\nPI = 3.0; // COMPILE ERROR! Cannot assign value to final variable.\n```\n\n2\ufe0f\u20e3 final Method:\nThe method CANNOT be overridden by any child class.\n```java\nclass Parent {\n    final void secureRules() { ... }\n}\nclass Child extends Parent {\n    void secureRules() { ... } // COMPILE ERROR! Cannot override final method.\n}\n```\n\n3\ufe0f\u20e3 final Class:\nThe class CANNOT be extended at all! No one can create a child of a final class.\n```java\nfinal class SecurityCheck { ... }\nclass Hacker extends SecurityCheck { ... } // COMPILE ERROR! Cannot inherit from final class.\n```\n\nDid you know?\nIn Java, the famous `java.lang.String` class is declared as:\n`public final class String`\nWhy? Because strings are used for passwords, database URLs, and file paths. If anyone could create a child class of `String`, they could bypass security checks!\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a legal Last Will and Testament:\n\u2022 When the lawyer stamps \"FINAL\" on the document, nobody can edit the text, add pages, or change the names.\n\u2022 It is set in stone.\nIn Java, marking a class or method `final` stamps it as complete and immutable.\n\n\ud83d\udca1 8. Try It Yourself\nTry creating a class `final class MathHelper {}` and then write `class ExtendedHelper extends MathHelper {}`.\nObserve the clear error message Java gives you!",
    "coreExplanation": [
      "1. The Three Roles of final: final can be applied to variables (cannot reassign), methods (cannot override), and classes (cannot inherit).",
      "2. final Class: Prevents inheritance entirely. Syntax: 'final class MyClass { }'. Any attempt to write 'class Child extends MyClass' results in a compile-time error.",
      "3. Standard Library final Classes: String, Integer, Double, Math, and System are all final classes in Java for security, efficiency, and immutability.",
      "4. final Method: Allows a class to be extended, but prevents child classes from overriding that specific method. Used to guarantee critical business or security invariants.",
      "5. Performance Optimization: Because final methods cannot be overridden, the Java Virtual Machine can optimize them aggressively via inlining at runtime.",
      "6. Final vs Finally vs Finalize: 'final' is an access modifier for immutability; 'finally' is a block in exception handling that always runs; 'finalize()' was an old method called before garbage collection (deprecated)."
    ],
    "codeSnippet": {
      "title": "final Methods and final Classes in Java",
      "code": "// 1. A class with a final method\nclass BankAccount {\n    private double balance;\n\n    BankAccount(double balance) {\n        this.balance = balance;\n    }\n\n    // Child classes CANNOT override this sensitive method:\n    final void printAccountStatement() {\n        System.out.println(\"Official Bank Statement: Verified Account\");\n    }\n\n    // Regular method: Child classes CAN override this:\n    void depositNotice() {\n        System.out.println(\"Standard deposit notification sent\");\n    }\n}\n\nclass SavingsAccount extends BankAccount {\n    SavingsAccount(double balance) {\n        super(balance);\n    }\n\n    // Allowed: depositNotice is not final\n    @Override\n    void depositNotice() {\n        System.out.println(\"SMS deposit alert sent to customer phone\");\n    }\n\n    // If we try this, Java refuses to compile:\n    // void printAccountStatement() { } // COMPILE ERROR!\n}\n\n// 2. A final class: CANNOT be extended at all\nfinal class SecurityToken {\n    String tokenValue = \"SECRET_123\";\n}\n\n// class FakeToken extends SecurityToken { } // COMPILE ERROR: Cannot inherit from final class\n\npublic class Main {\n    public static void main(String[] args) {\n        SavingsAccount sa = new SavingsAccount(1500.0);\n        sa.printAccountStatement(); // Runs BankAccount's final method\n        sa.depositNotice();          // Runs SavingsAccount's overridden method\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "final void printAccountStatement() {",
          "explanation": "Marked final. No child class in the entire system can override this method."
        },
        {
          "line": "void depositNotice() {",
          "explanation": "Normal method. Child classes are free to override this method."
        },
        {
          "line": "final class SecurityToken {",
          "explanation": "Marked final. Absolutely no class can write 'extends SecurityToken'."
        },
        {
          "line": "sa.printAccountStatement();",
          "explanation": "SavingsAccount runs the guaranteed, tamper-proof parent method."
        }
      ],
      "output": "Official Bank Statement: Verified Account\nSMS deposit alert sent to customer phone"
    },
    "beginnerMistakes": [
      {
        "mistake": "Trying to extend java.lang.String.",
        "whyItHappens": "Wanting to add custom helper methods to String.",
        "howToFix": "String is a final class in Java! You cannot extend it. Use utility methods or a wrapper class instead.",
        "codeSnippet": "// WRONG: class MyString extends String { } // COMPILE ERROR: cannot inherit from final String"
      },
      {
        "mistake": "Trying to make an abstract class or method final.",
        "whyItHappens": "Misunderstanding the purpose of abstract vs final.",
        "howToFix": "'abstract' DEMANDS to be extended/overridden; 'final' FORBIDS being extended/overridden. They are exact opposites and cannot be combined!",
        "codeSnippet": "// WRONG: final abstract class A { } // COMPILE ERROR: illegal combination of modifiers"
      },
      {
        "mistake": "Thinking final on an object reference makes the object's contents immutable.",
        "whyItHappens": "Assuming 'final Student s = new Student()' prevents changing s.name.",
        "howToFix": "final on a reference variable only means the variable cannot point to a DIFFERENT object. The internal fields of that object can still be modified unless those fields are also final.",
        "codeSnippet": "final Student s = new Student(\"Amit\");\ns.name = \"Rohit\"; // ALLOWED! State can change.\n// s = new Student(\"Neha\"); // COMPILE ERROR: Cannot reassign reference s"
      }
    ],
    "practiceProblems": [
      {
        "title": "Final Method Overriding Prohibition",
        "problemStatement": "Why will the following code fail to compile?",
        "code": "class Alpha {\n    final void greet() { System.out.println(\"Hi\"); }\n}\nclass Beta extends Alpha {\n    void greet() { System.out.println(\"Hello\"); }\n}",
        "options": [
          "Alpha must have a constructor",
          "Beta cannot override the final method greet() in Alpha",
          "greet() must return a String",
          "Beta must be declared final"
        ],
        "correctOptionIndex": 1,
        "hint": "Check the modifier of greet() in class Alpha.",
        "solution": "Beta cannot override the final method greet() in Alpha",
        "explanation": "A method declared as final cannot be overridden by any child class. Attempting to override greet() triggers a compilation error."
      },
      {
        "title": "Abstract and Final Modifier Incompatibility",
        "problemStatement": "Why does 'abstract final class Test { }' trigger an immediate compile error?",
        "code": "abstract final class Test {\n    // code\n}",
        "options": [
          "abstract cannot be applied to classes",
          "abstract requires the class to be extended, but final forbids the class from being extended",
          "final classes cannot have curly braces",
          "A class must have public visibility"
        ],
        "correctOptionIndex": 1,
        "hint": "What does abstract require? What does final forbid?",
        "solution": "abstract requires the class to be extended, but final forbids the class from being extended",
        "explanation": "abstract requires child classes to implement behavior, while final forbids inheritance entirely. They are polar opposites and mutually exclusive."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why is the String class made final in Java?",
        "expectedAnswer": "String is final for security, immutability, and thread safety. Strings are used to store sensitive data like passwords, network sockets, and database connections. If String could be extended, a rogue subclass could compromise security or corrupt String pool caching.",
        "followUp": "Which other standard library classes are final?",
        "followUpAnswer": "Primitive wrappers like Integer, Double, Boolean, and utility classes like Math and System."
      },
      {
        "question": "What is the difference between final, finally, and finalize?",
        "expectedAnswer": "1. 'final' is a keyword/modifier applied to variables (constants), methods (cannot override), and classes (cannot inherit).\n2. 'finally' is a block following try-catch that always executes regardless of exceptions.\n3. 'finalize()' was a method in java.lang.Object called by the garbage collector before an object is reclaimed (now deprecated).",
        "followUp": "Can a final variable be initialized in a constructor?",
        "followUpAnswer": "Yes. A blank final instance variable must be initialized in every constructor (or instance initializer block)."
      },
      {
        "question": "Does marking an object reference final make the object immutable?",
        "expectedAnswer": "No. Marking a reference variable final means you cannot reassign it to point to a new object (the memory address is fixed). However, the internal fields and state of that object can still be modified unless the class itself is immutable.",
        "followUp": "How do you make an object truly immutable?",
        "followUpAnswer": "Make the class final, make all fields private and final, provide no setters, and use defensive copying for mutable objects."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-36-01",
        "question": "What happens if you try to extend a class marked as 'final'?",
        "options": [
          "It compiles with a compiler warning",
          "A compile-time error occurs: cannot inherit from final class",
          "The program crashes with ClassNotFoundException",
          "Only public methods are inherited"
        ],
        "correctIndex": 1,
        "explanation": "A class marked final cannot be extended under any circumstance in Java."
      },
      {
        "id": "mq-36-02",
        "question": "Can a final method in a parent class be overloaded in a child class?",
        "options": [
          "No, final methods cannot be touched at all",
          "Yes, overloading (different parameter list) is allowed; only overriding is forbidden",
          "Yes, but only if the child class is also final",
          "Only if the method return type is boolean"
        ],
        "correctIndex": 1,
        "explanation": "final only prevents overriding (same signature). Overloading creates a brand new method with different parameters, which is completely valid."
      },
      {
        "id": "mq-36-03",
        "question": "Which keyword prevents a variable from being reassigned?",
        "options": [
          "static",
          "const",
          "final",
          "immutable"
        ],
        "correctIndex": 2,
        "explanation": "The 'final' keyword creates a constant whose value cannot be changed once assigned."
      }
    ],
    "cheatSheet": {
      "summary": "The final keyword provides immutability and safety in Java. Final classes cannot be extended; final methods cannot be overridden; final variables cannot be reassigned.",
      "syntaxTemplate": "final class LockedClass { ... } // Cannot extend\nclass Base {\n    final void lockedMethod() { ... } // Cannot override\n}",
      "rules": [
        {
          "rule": "final Class",
          "explanation": "No class can extend a final class (e.g. String, Math, Integer)."
        },
        {
          "rule": "final Method",
          "explanation": "Subclasses inherit the method but cannot override it."
        },
        {
          "rule": "final Variable",
          "explanation": "Value must be assigned once and can never be reassigned."
        },
        {
          "rule": "Incompatible with Abstract",
          "explanation": "final and abstract can never be used together on a class or method."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Keyword",
          "optionA": "final",
          "optionB": "finally / finalize"
        },
        {
          "aspect": "Type",
          "optionA": "Access modifier (keyword)",
          "optionB": "finally: block in try-catch; finalize: method in Object"
        },
        {
          "aspect": "Class effect",
          "optionA": "Prevents inheritance",
          "optionB": "N/A"
        },
        {
          "aspect": "Method effect",
          "optionA": "Prevents overriding",
          "optionB": "finally: cleanup code; finalize: GC cleanup"
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "Why is the String class made final in Java?",
          "answer": "String is final for security, immutability, and thread safety. Strings are used to store sensitive data like passwords, network sockets, and database connections. If String could be extended, a rogue subclass could compromise security or corrupt String pool caching.",
          "trapsToAvoid": "Only mentioning memory without mentioning security and the String Pool."
        },
        {
          "question": "What is the difference between final, finally, and finalize?",
          "answer": "1. 'final' is a keyword/modifier applied to variables (constants), methods (cannot override), and classes (cannot inherit).\n2. 'finally' is a block following try-catch that always executes regardless of exceptions.\n3. 'finalize()' was a method in java.lang.Object called by the garbage collector before an object is reclaimed.",
          "trapsToAvoid": "Forgetting that finalize() is a method whereas the other two are keywords."
        },
        {
          "question": "Does marking an object reference final make the object immutable?",
          "answer": "No. Marking a reference variable final means you cannot reassign it to point to a new object (the memory address is fixed). However, the internal fields and state of that object can still be modified unless the class itself is immutable.",
          "trapsToAvoid": "Saying yes. Always distinguish between reference immutability and object immutability."
        }
      ]
    }
  },
  "inheritance-challenge": {
    "id": "inheritance-challenge",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.7",
    "title": "Inheritance Mastery: 10 Challenges & Interview Cheatsheet",
    "subtitle": "Test your skills from beginner to interview-ready with 10 progressive coding challenges, 15 MCQs, 10 tricky puzzles, and revision cheatsheet",
    "estimatedMinutes": 35,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 How to combine all inheritance concepts into real-world software architecture.\n\u2022 The 10 progressive levels: from basic single inheritance to advanced e-commerce hierarchies.\n\u2022 How to trace tricky inheritance output questions without getting tricked in technical interviews.\n\u2022 The quick-revision cheatsheet covering every golden rule, difference table, and trap.\n\n\ud83e\udd14 2. Why do we need this?\nYou now know all the individual puzzle pieces of inheritance:\n\u2022 `extends` and IS-A (Lesson 3.1)\n\u2022 Single, Multilevel, Hierarchical & Diamond Problem (Lesson 3.2)\n\u2022 Constructors, `super()`, and birth order (Lesson 3.3)\n\u2022 Method overriding and `@Override` (Lesson 3.4)\n\u2022 Extending methods with `super.method()` and `super.var` (Lesson 3.5)\n\u2022 Locking classes and methods with `final` (Lesson 3.6)\n\nIn a real job or technical interview, you won't be asked about just one keyword in isolation.\nYou will be asked to design systems where parents, children, constructors, overridden methods, and `super` all work together smoothly.\nThis capstone challenge brings everything together!\n\n\ud83e\udde0 3. Simple Explanation\nThink of this capstone module as your flight simulator before your first real solo flight:\n1. Level 1\u20133: Warm-up! Basic classes, extending, and passing arguments with `super()`.\n2. Level 4\u20136: Method overriding, using `@Override`, and building on parent methods with `super.method()`.\n3. Level 7\u20138: Designing secure systems using `final` and private fields with public getters/setters.\n4. Level 9\u201310: Capstone real-world scenarios and finding subtle compilation errors before the compiler does!\n\nIf you can solve these 10 challenges and understand the 15 quiz questions, you are 100% ready for any college exam or junior developer interview on Java inheritance!\n\n\ud83c\udf0d 4. Real-Life Example\nThink about an E-Commerce Platform (Amazon or Flipkart):\n\u2022 Base class `Product`: has `id`, `name`, `basePrice`.\n\u2022 Derived class `ElectronicProduct`: adds `warrantyMonths` and overrides `calculateFinalPrice()` with a tech recycling fee.\n\u2022 Derived class `SmartPhone`: adds `operatingSystem` and `storageGB`, calls `super.calculateFinalPrice()`, and adds 5G testing fee.\n\u2022 `final` method `generateInvoiceNumber()`: cannot be altered by any product category for fraud protection.\nThis is exactly how enterprise software is architected using inheritance!\n\n\ud83d\udca1 8. Try It Yourself\nBefore looking at the solutions to the 10 code puzzles below, test your instincts by predicting the output on paper first!",
    "coreExplanation": [
      "1. Unified Inheritance Hierarchy: In a well-designed OOP system, common attributes and behaviors reside at the top of the hierarchy, while specialized attributes and logic reside in child subclasses.",
      "2. Constructor Chaining Lifecycle: Instantiation always cascades up to java.lang.Object before running subclass constructor bodies. The parent is guaranteed to be fully initialized first.",
      "3. Polymorphic Method Resolution: When a method is called on an object, Java executes the most specific overridden version corresponding to the runtime object type.",
      "4. Controlled Extension via super: Subclasses should prefer augmenting parent methods with super.method() rather than rewriting shared algorithms from scratch.",
      "5. Architectural Invariants via final: Apply 'final' to methods that enforce critical security or computation policies, and to classes intended to be immutable (like String).",
      "6. IS-A vs HAS-A Distinction: Favor inheritance (IS-A) when specializing a type. Favor composition (HAS-A) when an object simply needs to use capabilities of another class."
    ],
    "codeSnippet": {
      "title": "Comprehensive E-Commerce Hierarchy Capstone",
      "code": "// 1. Base Class\nclass Product {\n    private String id;\n    private String name;\n    protected double basePrice;\n\n    Product(String id, String name, double basePrice) {\n        this.id = id;\n        this.name = name;\n        this.basePrice = basePrice;\n    }\n\n    // Subclasses can override pricing\n    public double calculatePrice() {\n        return basePrice;\n    }\n\n    // Critical security method: NO SUBCLASS CAN ALTER INVOICE FORMAT\n    public final void printReceipt() {\n        System.out.println(\"=== OFFICIAL TAX INVOICE ===\");\n        System.out.println(\"Product ID: \" + id + \" | Name: \" + name);\n        System.out.println(\"Final Payable: $\" + calculatePrice());\n        System.out.println(\"============================\");\n    }\n}\n\n// 2. Multilevel Intermediate Class\nclass Electronics extends Product {\n    private int warrantyMonths;\n\n    Electronics(String id, String name, double basePrice, int warrantyMonths) {\n        super(id, name, basePrice);\n        this.warrantyMonths = warrantyMonths;\n    }\n\n    @Override\n    public double calculatePrice() {\n        // Electronics add $15 electronic waste recycling fee\n        return super.calculatePrice() + 15.0;\n    }\n}\n\n// 3. Leaf Specialization Class\nclass SmartPhone extends Electronics {\n    private String os;\n\n    SmartPhone(String id, String name, double basePrice, int warrantyMonths, String os) {\n        super(id, name, basePrice, warrantyMonths);\n        this.os = os;\n    }\n\n    @Override\n    public double calculatePrice() {\n        // Phone adds $25 carrier certification fee on top of electronics fee\n        return super.calculatePrice() + 25.0;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SmartPhone phone = new SmartPhone(\"P-900\", \"Galaxy Ultra\", 999.0, 24, \"Android\");\n        phone.printReceipt();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Electronics extends Product {",
          "explanation": "Electronics inherits from Product, establishing a multilevel hierarchy."
        },
        {
          "line": "public final void printReceipt() {",
          "explanation": "A final method in Product. Ensures standard legal receipts cannot be modified by subclasses."
        },
        {
          "line": "super.calculatePrice() + 15.0;",
          "explanation": "Electronics augments the parent price by adding a $15 recycling fee."
        },
        {
          "line": "class SmartPhone extends Electronics {",
          "explanation": "SmartPhone specializes Electronics even further (Multilevel chain: Product -> Electronics -> SmartPhone)."
        },
        {
          "line": "super.calculatePrice() + 25.0;",
          "explanation": "SmartPhone calls Electronics.calculatePrice() (which calls Product.calculatePrice()) and adds $25."
        },
        {
          "line": "phone.printReceipt();",
          "explanation": "Calls the final receipt method from Product, which dynamically evaluates the smart phone's final price ($999 + $15 + $25 = $1039)."
        }
      ],
      "output": "=== OFFICIAL TAX INVOICE ===\nProduct ID: P-900 | Name: Galaxy Ultra\nFinal Payable: $1039.0\n============================"
    },
    "beginnerMistakes": [
      {
        "mistake": "Using inheritance just to save 2 lines of typing when there is no genuine IS-A relationship.",
        "whyItHappens": "Making 'Car extends Engine' or 'Student extends Database' just to access methods.",
        "howToFix": "Only use extends if Child IS-A Parent. A Car HAS-A Engine, so declare 'Engine engine;' as a field inside Car (Composition).",
        "codeSnippet": "// WRONG: class Car extends Engine { }\n// CORRECT: class Car { private Engine engine; }"
      },
      {
        "mistake": "Accidentally forgetting super(args) when parent has no default constructor.",
        "whyItHappens": "Assuming Java will find a way to create the parent object automatically.",
        "howToFix": "If parent constructor takes parameters, the first line of the child constructor MUST explicitly pass those parameters via super(args).",
        "codeSnippet": "// Parent: class Base { Base(int x) {} }\n// WRONG: class Child extends Base { Child() {} }\n// CORRECT: class Child extends Base { Child() { super(10); } }"
      },
      {
        "mistake": "Trying to override a method with a different return type without covariance.",
        "whyItHappens": "Changing 'int getValue()' to 'String getValue()' in child class.",
        "howToFix": "Return type must match or be a subtype. Primitive types like int and double cannot be swapped in overriding.",
        "codeSnippet": "// WRONG: Parent has 'int compute()', Child writes 'double compute()'."
      },
      {
        "mistake": "Thinking private fields are inherited directly.",
        "whyItHappens": "Assuming 'child.privateField' works because child extends parent.",
        "howToFix": "Private fields are never directly accessible by name in subclasses. Provide protected or public getter and setter methods in the parent.",
        "codeSnippet": "// Parent: private int secret = 42;\n// Child: void show() { System.out.println(secret); } // COMPILE ERROR!\n// Use: getSecret() instead."
      }
    ],
    "interviewTakeaways": [
      "1. Code Reuse with Safety: Inheritance models IS-A taxonomy, enabling shared state and behavior across subclasses without duplication.",
      "2. Constructor Order Guarantee: Parent constructors run before child constructors. Implicit or explicit super() must always execute first.",
      "3. Method Overriding Mechanics: Overridden methods must retain the same signature, cannot reduce visibility, and cannot throw new broader checked exceptions.",
      "4. Extension vs Replacement: super.method() lets subclasses augment parent logic instead of discarding it.",
      "5. The final Lock: final variables cannot change; final methods cannot be overridden; final classes cannot be extended.",
      "6. No Multiple Class Inheritance: Java avoids the Diamond Problem by restricting classes to a single direct superclass."
    ],
    "cheatSheet": {
      "summary": "Master cheatsheet for Java Inheritance: Core definitions, 4-way comparison tables, overriding rules, and the most frequently asked technical interview questions.",
      "syntaxTemplate": "public class Child extends Parent {\n    public Child(String name) {\n        super(name); // 1. Constructor chaining\n    }\n\n    @Override\n    public void action() {\n        super.action(); // 2. Parent method reuse\n        // 3. Child specialization\n    }\n}",
      "rules": [
        {
          "rule": "Single Class Inheritance",
          "explanation": "A Java class can extend at most ONE direct superclass ('extends Parent'). Multiple class inheritance is disallowed."
        },
        {
          "rule": "Universal Root Object",
          "explanation": "Every class in Java implicitly extends java.lang.Object if no explicit extends is written."
        },
        {
          "rule": "Constructor Chain First",
          "explanation": "super() or this() must be the very first statement in any constructor body."
        },
        {
          "rule": "Visibility Invariant",
          "explanation": "An overriding method can increase visibility (e.g. protected -> public) but NEVER decrease it (public -> protected)."
        },
        {
          "rule": "Private & Static Non-Overridable",
          "explanation": "Private methods are hidden. Static methods belong to the class and are hidden, not overridden."
        },
        {
          "rule": "Final Locks Hierarchy",
          "explanation": "final classes cannot have subclasses; final methods cannot be overridden."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Aspect",
          "optionA": "this",
          "optionB": "super"
        },
        {
          "aspect": "Reference",
          "optionA": "Refers to current class object",
          "optionB": "Refers to parent class object"
        },
        {
          "aspect": "Constructor Call",
          "optionA": "this() calls constructor in same class",
          "optionB": "super() calls constructor in parent class"
        },
        {
          "aspect": "Member Access",
          "optionA": "this.field / this.method()",
          "optionB": "super.field / super.method()"
        },
        {
          "aspect": "Aspect",
          "optionA": "Method Overloading",
          "optionB": "Method Overriding"
        },
        {
          "aspect": "Class Boundary",
          "optionA": "Within the SAME class",
          "optionB": "Across PARENT and CHILD classes"
        },
        {
          "aspect": "Method Signature",
          "optionA": "Same name, DIFFERENT parameters",
          "optionB": "Same name, EXACT SAME parameters"
        },
        {
          "aspect": "Return Type",
          "optionA": "Can be anything",
          "optionB": "Must be same or covariant (subtype)"
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "1. What is inheritance in Java and what are its advantages?",
          "answer": "Inheritance is an OOP mechanism where a child class acquires the properties and methods of a parent class using the 'extends' keyword. Its main advantages are code reusability (write once, use across children), clean hierarchy modeling (IS-A relationship), and method overriding (polymorphic specialization).",
          "trapsToAvoid": "Forgetting to mention the IS-A relationship or confusing it with composition."
        },
        {
          "question": "2. Why does Java not support multiple inheritance with classes?",
          "answer": "To eliminate ambiguity, commonly known as the Diamond Problem. If class D extends both B and C, and both B and C inherit and override a method from A, Java would not know which version of the method class D should inherit. To keep the language robust and simple, Java disallows multiple class inheritance, while supporting multiple inheritance of type via interfaces.",
          "trapsToAvoid": "Saying multiple inheritance is impossible in Java (it is supported through interfaces)."
        },
        {
          "question": "3. What is the role of super() in constructor chaining?",
          "answer": "'super()' invokes the constructor of the direct parent class. It must be the first statement in a child constructor. If omitted, the compiler automatically inserts 'super();' (no-arg). This guarantees that parent fields are initialized before child constructor code executes.",
          "trapsToAvoid": "Saying super() can be placed anywhere in the constructor."
        },
        {
          "question": "4. What is the difference between this() and super()?",
          "answer": "'this()' calls an overloaded constructor within the SAME class, while 'super()' calls a constructor in the DIRECT PARENT class. Both must be the first statement in their constructor, meaning they can never appear in the same constructor body together.",
          "trapsToAvoid": "Confusing this() / super() constructor calls with this.member / super.member reference calls."
        },
        {
          "question": "5. Can you override a private or static method in Java?",
          "answer": "No. Private methods are not visible outside their declaring class, so a child class cannot override them. Static methods belong to the class rather than an object instance; redefining a static method in a child class is called Method Hiding, which is resolved at compile time.",
          "trapsToAvoid": "Thinking static methods are overridden if they compile with the same signature."
        },
        {
          "question": "6. What are the rules for method overriding in Java?",
          "answer": "1. Method name and parameter list must be identical.\n2. Return type must be identical or a covariant subtype.\n3. Access modifier cannot be more restrictive than the parent method.\n4. Overriding method cannot throw new or broader checked exceptions.\n5. final, static, and private methods cannot be overridden.",
          "trapsToAvoid": "Forgetting the exception and access modifier restrictions."
        },
        {
          "question": "7. What is the difference between Method Overloading and Method Overriding?",
          "answer": "Overloading occurs in the same class where methods have the same name but different parameters (compile-time polymorphism). Overriding occurs between parent and child classes where the method signature is identical (runtime polymorphism).",
          "trapsToAvoid": "Stating that changing return type alone is sufficient for overloading."
        },
        {
          "question": "8. What does the final keyword mean on a class, method, and variable?",
          "answer": "\u2022 final variable: value cannot be changed once initialized (constant).\n\u2022 final method: cannot be overridden by any subclass.\n\u2022 final class: cannot be extended or inherited by any class (e.g. String, Math).",
          "trapsToAvoid": "Assuming final reference makes the referenced object's internal fields immutable."
        },
        {
          "question": "9. Can a child class access a parent's private variables?",
          "answer": "A child class cannot access a parent's private variables DIRECTLY by name. However, private variables are still present in the child object's heap memory and can be accessed or modified INDIRECTLY through inherited public or protected getter and setter methods.",
          "trapsToAvoid": "Answering an absolute 'No' without clarifying that getters/setters allow indirect access."
        },
        {
          "question": "10. What is variable shadowing (field hiding) in Java?",
          "answer": "When a child class declares an instance variable with the exact same name as a variable in the parent class, the child's variable shadows the parent's variable. To access the parent's variable from within the child class, you must explicitly use 'super.variableName'. Variables are resolved based on reference type, not runtime object type.",
          "trapsToAvoid": "Calling it 'variable overriding' (Java does not support variable overriding)."
        }
      ]
    },
    "miniQuiz": [
      {
        "id": "inh-ch-q01",
        "question": "Which Java keyword is used to inherit from a class?",
        "options": [
          "implements",
          "inherits",
          "extends",
          "super"
        ],
        "correctIndex": 2,
        "explanation": "The 'extends' keyword is used by a class to inherit from a parent class. 'implements' is used for interfaces."
      },
      {
        "id": "inh-ch-q02",
        "question": "Which class is the ultimate root superclass of every class in Java?",
        "options": [
          "java.lang.System",
          "java.lang.Class",
          "java.lang.Object",
          "java.lang.Root"
        ],
        "correctIndex": 2,
        "explanation": "java.lang.Object is the universal root superclass for all reference types in Java."
      },
      {
        "id": "inh-ch-q03",
        "question": "Why does Java disallow multiple class inheritance (class C extends A, B)?",
        "options": [
          "Java Virtual Machine cannot run more than 1 class at a time",
          "To prevent ambiguity from the Diamond Problem when two parents define the same method",
          "Multiple inheritance requires too much RAM on modern computers",
          "To force all classes to be final"
        ],
        "correctIndex": 1,
        "explanation": "If two parent classes provide implementations of the same method, a child extending both creates an ambiguity (the Diamond Problem). Java prevents this by supporting only single class inheritance."
      },
      {
        "id": "inh-ch-q04",
        "question": "When an instance of a child class is created, in what order do constructors run?",
        "options": [
          "Child constructor runs first, then Parent constructor",
          "Parent constructor runs first, then Child constructor",
          "They run simultaneously on separate CPU threads",
          "Only the Child constructor runs; Parent constructor is skipped"
        ],
        "correctIndex": 1,
        "explanation": "The parent constructor always executes and completes before the body of the child constructor executes."
      },
      {
        "id": "inh-ch-q05",
        "question": "What is the restriction on the placement of super() inside a constructor?",
        "options": [
          "It can be placed anywhere inside the constructor",
          "It must be the last statement before return",
          "It must be the very first statement in the constructor",
          "It can only be placed inside an if statement"
        ],
        "correctIndex": 2,
        "explanation": "super() and this() must be the very first statement inside a constructor body."
      },
      {
        "id": "inh-ch-q06",
        "question": "What happens if a parent class only defines a parameterized constructor 'Parent(int x)' and no no-arg constructor?",
        "options": [
          "Java automatically creates a default constructor for Parent anyway",
          "Child constructor will fail to compile unless it explicitly calls super(x)",
          "Child class can never be compiled under any circumstances",
          "The program crashes at runtime with NullPointerException"
        ],
        "correctIndex": 1,
        "explanation": "Because a custom constructor was declared, Java removes the automatic default constructor. A child class must explicitly call super(int) to compile."
      },
      {
        "id": "inh-ch-q07",
        "question": "What is the purpose of the @Override annotation?",
        "options": [
          "It is required by the JVM to run overridden methods",
          "It instructs the compiler to verify that the method actually overrides a parent method",
          "It makes a method private to the child class",
          "It converts method overloading into method overriding"
        ],
        "correctIndex": 1,
        "explanation": "@Override is a compile-time check that catches signature mismatches and spelling typos."
      },
      {
        "id": "inh-ch-q08",
        "question": "If a parent method has 'public void show()', what visibility can the overriding child method have?",
        "options": [
          "Only private",
          "Only protected or default",
          "Only public",
          "Any visibility modifier"
        ],
        "correctIndex": 2,
        "explanation": "An overriding method cannot reduce visibility. Since the parent is public (the broadest visibility), the child method MUST also be public."
      },
      {
        "id": "inh-ch-q09",
        "question": "Can static methods be overridden in Java?",
        "options": [
          "Yes, just like normal instance methods",
          "No, redefining a static method in a child class is method hiding, not overriding",
          "Yes, but only if annotated with @Override",
          "Yes, but only in final classes"
        ],
        "correctIndex": 1,
        "explanation": "Static methods are bound to class definitions at compile time. Redefining a static method in a subclass is method hiding, not overriding."
      },
      {
        "id": "inh-ch-q10",
        "question": "How can a child class call the parent's version of an overridden method?",
        "options": [
          "this.methodName()",
          "Parent.methodName()",
          "super.methodName()",
          "base.methodName()"
        ],
        "correctIndex": 2,
        "explanation": "'super.methodName()' invokes the parent class's version of the method from within the child class."
      },
      {
        "id": "inh-ch-q11",
        "question": "What occurs when a child class declares a field with the exact same name as a parent class field?",
        "options": [
          "Field Overriding occurs",
          "Compile error: Duplicate field identifier",
          "Field Shadowing (Hiding) occurs",
          "The parent field is deleted from memory"
        ],
        "correctIndex": 2,
        "explanation": "Variables cannot be overridden; they are shadowed. Within the child class, the name refers to the child's field, while 'super.fieldName' refers to the parent's."
      },
      {
        "id": "inh-ch-q12",
        "question": "What happens if you attempt to inherit from a class declared as 'final class Safe'?",
        "options": [
          "The child class inherits only public members",
          "The program compiles with a runtime warning",
          "A compile-time error occurs: cannot inherit from final class",
          "The child class becomes final automatically"
        ],
        "correctIndex": 2,
        "explanation": "Marking a class final strictly prevents any other class from extending it."
      },
      {
        "id": "inh-ch-q13",
        "question": "Which of the following standard Java library classes is declared as final?",
        "options": [
          "java.lang.Object",
          "java.lang.String",
          "java.lang.Exception",
          "java.util.ArrayList"
        ],
        "correctIndex": 1,
        "explanation": "java.lang.String is final for security, immutability, and String Pool optimization."
      },
      {
        "id": "inh-ch-q14",
        "question": "Can you call both this() and super() inside the same constructor?",
        "options": [
          "Yes, if super() is line 1 and this() is line 2",
          "Yes, in any order",
          "No, because both demand to be the first statement in the constructor",
          "Yes, but only in abstract classes"
        ],
        "correctIndex": 2,
        "explanation": "Both this() and super() must be the first statement in a constructor, so they can never be placed in the same constructor body."
      },
      {
        "id": "inh-ch-q15",
        "question": "Why is 'abstract final class Test { }' illegal in Java?",
        "options": [
          "It uses more than 2 keywords",
          "abstract requires subclasses to provide implementation, while final forbids subclasses",
          "abstract classes can only be created inside interfaces",
          "final classes cannot contain variables"
        ],
        "correctIndex": 1,
        "explanation": "abstract requires child classes to implement behavior, while final forbids inheritance entirely. They are polar opposites."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Multilevel Constructor Execution Order",
        "problemStatement": "What is the output of the following Java program?",
        "code": "class Grandparent {\n    Grandparent() {\n        System.out.print(\"1 \");\n    }\n}\nclass Parent extends Grandparent {\n    Parent() {\n        System.out.print(\"2 \");\n    }\n}\nclass Child extends Parent {\n    Child() {\n        System.out.print(\"3 \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new Child();\n    }\n}",
        "options": [
          "3 2 1",
          "1 2 3",
          "2 1 3",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Constructor calls chain up to Grandparent first before executing any constructor body.",
        "solution": "1 2 3",
        "explanation": "Child() calls Parent() which calls Grandparent(). Grandparent finishes first printing '1 ', then Parent prints '2 ', then Child prints '3 '."
      },
      {
        "title": "Puzzle 2: Explicit super() with Arguments",
        "problemStatement": "Determine the output of this code snippet:",
        "code": "class Animal {\n    Animal(String name) {\n        System.out.print(\"Animal:\" + name + \" \");\n    }\n}\nclass Dog extends Animal {\n    Dog() {\n        super(\"Bruno\");\n        System.out.print(\"Dog \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new Dog();\n    }\n}",
        "options": [
          "Dog Animal:Bruno",
          "Animal:Bruno Dog",
          "Dog",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "Dog explicitly calls super(\"Bruno\"). The parent constructor executes first.",
        "solution": "Animal:Bruno Dog ",
        "explanation": "super(\"Bruno\") runs Animal's constructor first, printing 'Animal:Bruno '. Dog constructor resumes, printing 'Dog '."
      },
      {
        "title": "Puzzle 3: Method Overriding vs Fallback",
        "problemStatement": "What will be printed when main executes?",
        "code": "class Base {\n    void show() {\n        System.out.print(\"Base \");\n    }\n}\nclass Sub extends Base {\n    @Override\n    void show() {\n        System.out.print(\"Sub \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        Base b = new Sub();\n        b.show();\n    }\n}",
        "options": [
          "Base ",
          "Sub ",
          "Base Sub ",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "The actual object created on the heap is Sub. Java resolves overridden methods based on the runtime object.",
        "solution": "Sub ",
        "explanation": "Even though reference type is Base, the object is Sub. Sub's overridden show() method runs, printing 'Sub '."
      },
      {
        "title": "Puzzle 4: Extending Behavior with super.method()",
        "problemStatement": "Analyze this program and determine what is printed:",
        "code": "class Greeter {\n    void greet() {\n        System.out.print(\"Hello \");\n    }\n}\nclass FormalGreeter extends Greeter {\n    @Override\n    void greet() {\n        super.greet();\n        System.out.print(\"Sir \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new FormalGreeter().greet();\n    }\n}",
        "options": [
          "Sir Hello ",
          "Hello Sir ",
          "Hello ",
          "Sir "
        ],
        "correctOptionIndex": 1,
        "hint": "super.greet() is invoked before the child's print statement.",
        "solution": "Hello Sir ",
        "explanation": "FormalGreeter.greet() calls super.greet() first, printing 'Hello '. Then it prints 'Sir '."
      },
      {
        "title": "Puzzle 5: Variable Shadowing vs Reference Type",
        "problemStatement": "What does this code print?",
        "code": "class Parent {\n    int val = 10;\n}\nclass Child extends Parent {\n    int val = 20;\n}\npublic class Test {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.println(p.val);\n    }\n}",
        "options": [
          "10",
          "20",
          "0",
          "Compilation Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Variables in Java are NOT polymorphic. They are resolved based on the REFERENCE type, not the object type.",
        "solution": "10",
        "explanation": "Variables are resolved at compile time using reference type. Reference 'p' has type Parent, so 'p.val' accesses Parent's val (10)."
      },
      {
        "title": "Puzzle 6: super.var Disambiguation",
        "problemStatement": "What is the output of printVal()?",
        "code": "class A {\n    int x = 5;\n}\nclass B extends A {\n    int x = 15;\n    void printVal() {\n        System.out.print(super.x + \" \" + this.x);\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new B().printVal();\n    }\n}",
        "options": [
          "5 5",
          "15 15",
          "5 15",
          "15 5"
        ],
        "correctOptionIndex": 2,
        "hint": "super.x refers to parent A, this.x refers to class B.",
        "solution": "5 15",
        "explanation": "super.x accesses A.x which is 5. this.x accesses B.x which is 15. The output is '5 15'."
      },
      {
        "title": "Puzzle 7: final Method Invariance",
        "problemStatement": "What is the result of attempting to compile this code?",
        "code": "class Lock {\n    final void open() {\n        System.out.println(\"Key turned\");\n    }\n}\nclass MasterLock extends Lock {\n    void open() {\n        System.out.println(\"Master key turned\");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new MasterLock().open();\n    }\n}",
        "options": [
          "Prints: Key turned",
          "Prints: Master key turned",
          "Compilation Error: open() in MasterLock cannot override final method in Lock",
          "Runtime Exception"
        ],
        "correctOptionIndex": 2,
        "hint": "Check the keyword modifier on Lock.open().",
        "solution": "Compilation Error: open() in MasterLock cannot override final method in Lock",
        "explanation": "A method declared as final cannot be overridden by any subclass. Attempting to do so triggers a compilation error."
      },
      {
        "title": "Puzzle 8: Implicit vs Explicit super() Chain",
        "problemStatement": "Determine the output of this constructor sequence:",
        "code": "class X {\n    X() { System.out.print(\"X \"); }\n}\nclass Y extends X {\n    Y() {\n        this(5);\n        System.out.print(\"Y0 \");\n    }\n    Y(int val) {\n        System.out.print(\"Y\" + val + \" \");\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new Y();\n    }\n}",
        "options": [
          "X Y0 Y5 ",
          "X Y5 Y0 ",
          "Y5 Y0 X ",
          "Compilation Error"
        ],
        "correctOptionIndex": 1,
        "hint": "new Y() calls this(5). Y(5) has an implicit super() to X. X executes first!",
        "solution": "X Y5 Y0 ",
        "explanation": "new Y() delegates via this(5) to Y(int). Y(int) has implicit super() to X(). X() prints 'X '. Y(int) completes printing 'Y5 '. Finally Y() finishes printing 'Y0 '."
      },
      {
        "title": "Puzzle 9: Accessing Private State via Public Getter",
        "problemStatement": "What will be printed?",
        "code": "class Secret {\n    private int code = 99;\n    public int getCode() {\n        return code;\n    }\n}\nclass Spy extends Secret {\n    void reveal() {\n        System.out.print(\"Code:\" + getCode());\n    }\n}\npublic class Test {\n    public static void main(String[] args) {\n        new Spy().reveal();\n    }\n}",
        "options": [
          "Code:0",
          "Code:99",
          "Compilation Error: code has private access in Secret",
          "Runtime NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Spy does not access 'code' directly; it calls public getCode().",
        "solution": "Code:99",
        "explanation": "Although private variable 'code' cannot be read directly by name, the inherited public getter method getCode() safely returns 99."
      },
      {
        "title": "Puzzle 10: Visibility Reduction Trap",
        "problemStatement": "Will this code compile?",
        "code": "class BaseClass {\n    public void process() {\n        System.out.println(\"Processing\");\n    }\n}\nclass ChildClass extends BaseClass {\n    @Override\n    protected void process() {\n        System.out.println(\"Child processing\");\n    }\n}",
        "options": [
          "Yes, protected is allowed in overriding",
          "No, cannot reduce the visibility of the inherited method from public to protected",
          "Yes, but only if both classes are in the same package",
          "Yes, @Override removes access restrictions"
        ],
        "correctOptionIndex": 1,
        "hint": "Overriding methods can maintain or broaden visibility, but can NEVER reduce it.",
        "solution": "No, cannot reduce the visibility of the inherited method from public to protected",
        "explanation": "BaseClass.process() is public. ChildClass.process() is declared protected, which reduces visibility. The compiler rejects this."
      }
    ],
    "interviewQuestions": [
      {
        "question": "1. What is inheritance in Java and what are its advantages?",
        "expectedAnswer": "Inheritance is an OOP mechanism where a child class acquires the properties and methods of a parent class using the 'extends' keyword. Its main advantages are code reusability (write once, use across children), clean hierarchy modeling (IS-A relationship), and method overriding (polymorphic specialization).",
        "answer": "Inheritance is an OOP mechanism where a child class acquires the properties and methods of a parent class using the 'extends' keyword. Its main advantages are code reusability (write once, use across children), clean hierarchy modeling (IS-A relationship), and method overriding (polymorphic specialization).",
        "commonMistake": "Forgetting to mention the IS-A relationship or confusing it with composition."
      },
      {
        "question": "2. Why does Java not support multiple inheritance with classes?",
        "expectedAnswer": "To eliminate ambiguity, commonly known as the Diamond Problem. If class D extends both B and C, and both B and C inherit and override a method from A, Java would not know which version of the method class D should inherit. To keep the language robust and simple, Java disallows multiple class inheritance, while supporting multiple inheritance of type via interfaces.",
        "answer": "To eliminate ambiguity, commonly known as the Diamond Problem. If class D extends both B and C, and both B and C inherit and override a method from A, Java would not know which version of the method class D should inherit. To keep the language robust and simple, Java disallows multiple class inheritance, while supporting multiple inheritance of type via interfaces.",
        "commonMistake": "Saying multiple inheritance is impossible in Java (it is supported through interfaces)."
      },
      {
        "question": "3. What is the role of super() in constructor chaining?",
        "expectedAnswer": "'super()' invokes the constructor of the direct parent class. It must be the first statement in a child constructor. If omitted, the compiler automatically inserts 'super();' (no-arg). This guarantees that parent fields are initialized before child constructor code executes.",
        "answer": "'super()' invokes the constructor of the direct parent class. It must be the first statement in a child constructor. If omitted, the compiler automatically inserts 'super();' (no-arg). This guarantees that parent fields are initialized before child constructor code executes.",
        "commonMistake": "Saying super() can be placed anywhere in the constructor."
      },
      {
        "question": "4. What is the difference between this() and super()?",
        "expectedAnswer": "'this()' calls an overloaded constructor within the SAME class, while 'super()' calls a constructor in the DIRECT PARENT class. Both must be the first statement in their constructor, meaning they can never appear in the same constructor body together.",
        "answer": "'this()' calls an overloaded constructor within the SAME class, while 'super()' calls a constructor in the DIRECT PARENT class. Both must be the first statement in their constructor, meaning they can never appear in the same constructor body together.",
        "commonMistake": "Confusing this() / super() constructor calls with this.member / super.member reference calls."
      },
      {
        "question": "5. Can you override a private or static method in Java?",
        "expectedAnswer": "No. Private methods are not visible outside their declaring class, so a child class cannot override them. Static methods belong to the class rather than an object instance; redefining a static method in a child class is called Method Hiding, which is resolved at compile time.",
        "answer": "No. Private methods are not visible outside their declaring class, so a child class cannot override them. Static methods belong to the class rather than an object instance; redefining a static method in a child class is called Method Hiding, which is resolved at compile time.",
        "commonMistake": "Thinking static methods are overridden if they compile with the same signature."
      },
      {
        "question": "6. What are the rules for method overriding in Java?",
        "expectedAnswer": "1. Method name and parameter list must be identical.\n2. Return type must be identical or a covariant subtype.\n3. Access modifier cannot be more restrictive than the parent method.\n4. Overriding method cannot throw new or broader checked exceptions.\n5. final, static, and private methods cannot be overridden.",
        "answer": "1. Method name and parameter list must be identical.\n2. Return type must be identical or a covariant subtype.\n3. Access modifier cannot be more restrictive than the parent method.\n4. Overriding method cannot throw new or broader checked exceptions.\n5. final, static, and private methods cannot be overridden.",
        "commonMistake": "Forgetting the exception and access modifier restrictions."
      },
      {
        "question": "7. What is the difference between Method Overloading and Method Overriding?",
        "expectedAnswer": "Overloading occurs in the same class where methods have the same name but different parameters (compile-time polymorphism). Overriding occurs between parent and child classes where the method signature is identical (runtime polymorphism).",
        "answer": "Overloading occurs in the same class where methods have the same name but different parameters (compile-time polymorphism). Overriding occurs between parent and child classes where the method signature is identical (runtime polymorphism).",
        "commonMistake": "Stating that changing return type alone is sufficient for overloading."
      },
      {
        "question": "8. What does the final keyword mean on a class, method, and variable?",
        "expectedAnswer": "\u2022 final variable: value cannot be changed once initialized (constant).\n\u2022 final method: cannot be overridden by any subclass.\n\u2022 final class: cannot be extended or inherited by any class (e.g. String, Math).",
        "answer": "\u2022 final variable: value cannot be changed once initialized (constant).\n\u2022 final method: cannot be overridden by any subclass.\n\u2022 final class: cannot be extended or inherited by any class (e.g. String, Math).",
        "commonMistake": "Assuming final reference makes the referenced object's internal fields immutable."
      },
      {
        "question": "9. Can a child class access a parent's private variables?",
        "expectedAnswer": "A child class cannot access a parent's private variables DIRECTLY by name. However, private variables are still present in the child object's heap memory and can be accessed or modified INDIRECTLY through inherited public or protected getter and setter methods.",
        "answer": "A child class cannot access a parent's private variables DIRECTLY by name. However, private variables are still present in the child object's heap memory and can be accessed or modified INDIRECTLY through inherited public or protected getter and setter methods.",
        "commonMistake": "Answering an absolute 'No' without clarifying that getters/setters allow indirect access."
      },
      {
        "question": "10. What is variable shadowing (field hiding) in Java?",
        "expectedAnswer": "When a child class declares an instance variable with the exact same name as a variable in the parent class, the child's variable shadows the parent's variable. To access the parent's variable from within the child class, you must explicitly use 'super.variableName'. Variables are resolved based on reference type, not runtime object type.",
        "answer": "When a child class declares an instance variable with the exact same name as a variable in the parent class, the child's variable shadows the parent's variable. To access the parent's variable from within the child class, you must explicitly use 'super.variableName'. Variables are resolved based on reference type, not runtime object type.",
        "commonMistake": "Calling it 'variable overriding' (Java does not support variable overriding)."
      }
    ]
  },
  "extends-and-is-a": {
    "id": "what-is-inheritance",
    "moduleId": "java-inheritance",
    "moduleTitle": "3. Inheritance & Hierarchy",
    "lessonNumber": "Lesson 3.1",
    "title": "What is Inheritance? (The extends Keyword & IS-A)",
    "subtitle": "Stop repeating code: How child classes get methods and variables from parent classes",
    "estimatedMinutes": 20,
    "beginnerAnalogy": "\ud83d\udccc 1. What will you learn?\n\u2022 What problem inheritance solves in real programming.\n\u2022 What a Parent class (Superclass) and a Child class (Subclass) are.\n\u2022 How to use the `extends` keyword to connect two classes.\n\u2022 What the child gets for free, what it can add, and what it cannot directly touch.\n\n\ud83e\udd14 2. Why do we need this?\nImagine you are building a game with many animals. Look at this code:\n```java\nclass Dog {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n    void bark() {\n        System.out.println(\"Dog is barking\");\n    }\n}\n\nclass Cat {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n    void meow() {\n        System.out.println(\"Cat says meow\");\n    }\n}\n```\nNotice something? Both `Dog` and `Cat` have the exact same `eat()` and `sleep()` methods!\nIf you have 10 animals (Cow, Horse, Lion, Tiger...), will you write `eat()` and `sleep()` 10 times?\nAnd if you want to change \"Eating food\" to \"Eating nutritious food\", you will have to open 10 different files to make the change! That wastes time and causes bugs.\nWriting the same code again and again is not a good idea.\nThat is the exact problem Inheritance solves!\n\n\ud83e\udde0 3. Simple Explanation\nInheritance lets us write common code ONE time in a general class called the **Parent class** (also called **Superclass**).\nThen, specific classes called **Child classes** (also called **Subclasses**) can use that code for free!\nTo connect them in Java, we use the `extends` keyword:\n```java\nclass Dog extends Animal\n```\nIn plain English, this tells Java:\n\"Dog is an Animal. Give Dog everything Animal already knows, and let Dog add its own new features!\"\n\nThis is called an **IS-A relationship**:\n\u2022 A Dog **IS-A** Animal.\n\u2022 A Car **IS-A** Vehicle.\n\u2022 A Student **IS-A** Person.\n\n\ud83c\udf0d 4. Real-Life Example\nThink about a parent and a child in a family:\n\u2022 The parent has a house, a car, and a family surname.\n\u2022 The child inherits the surname and can use the house and car.\n\u2022 The child can also learn new skills that the parent did not have (like coding in Java!).\n\u2022 But the child cannot open the parent's secret personal diary (private data).\n\n\ud83d\udca1 8. Try It Yourself\nAdd a new method `void run()` to the `Animal` class.\nNotice how BOTH `Dog` and `Cat` can immediately call `run()` without writing a single line of new code inside `Dog` or `Cat`!",
    "coreExplanation": [
      "1. Parent Class (Superclass): The general class that contains shared variables and methods (e.g., Animal, Vehicle, Person).",
      "2. Child Class (Subclass): The specific class that inherits from the parent and adds its own unique behavior (e.g., Dog, Car, Student).",
      "3. The 'extends' Keyword: The keyword used in Java to connect a child class to a parent class. Syntax: class Child extends Parent { }.",
      "4. The IS-A Rule: Only use inheritance when a genuine IS-A relationship exists. A Dog IS-A Animal (Correct). A Car HAS-A Engine (Not inheritance; that is composition!).",
      "5. What the Child Gets: The child automatically gets all public and protected methods and variables from the parent.",
      "6. What the Child Can Add: The child can declare its own brand-new methods (like bark() in Dog) and variables that the parent does not have.",
      "7. What the Child Cannot Directly Access: A child class cannot directly access a parent's private variables by name. However, the child can still use them indirectly through the parent's public getter and setter methods!"
    ],
    "codeSnippet": {
      "title": "Simple Animal and Dog Inheritance Example",
      "code": "class Animal {\n    void eat() {\n        System.out.println(\"Eating food\");\n    }\n\n    void sleep() {\n        System.out.println(\"Sleeping peacefully\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Dog is barking\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog myDog = new Dog();\n\n        // Inherited methods from Animal parent class:\n        myDog.eat();\n        myDog.sleep();\n\n        // Dog's own method:\n        myDog.bark();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "class Animal {",
          "explanation": "We define the parent class Animal with common methods that all animals share."
        },
        {
          "line": "void eat() { ... }",
          "explanation": "Animal has an eat() method. Every child of Animal will be able to eat."
        },
        {
          "line": "class Dog extends Animal {",
          "explanation": "The 'extends' keyword connects Dog to Animal. Dog becomes the child of Animal."
        },
        {
          "line": "void bark() { ... }",
          "explanation": "Dog adds its own unique method. Cats and Cows cannot bark, only Dogs can."
        },
        {
          "line": "Dog myDog = new Dog();",
          "explanation": "We create a new Dog object on the heap. It contains both Animal methods and Dog methods."
        },
        {
          "line": "myDog.eat();",
          "explanation": "Java checks: Does Dog have eat()? No, but its parent Animal has eat(), so Java runs Animal's eat()!"
        },
        {
          "line": "myDog.bark();",
          "explanation": "Dog has its own bark() method, so Java runs it directly."
        }
      ],
      "output": "Eating food\nSleeping peacefully\nDog is barking"
    },
    "beginnerMistakes": [
      {
        "mistake": "Using 'implements' instead of 'extends' for classes.",
        "whyItHappens": "Confusing interface implementation with class inheritance.",
        "howToFix": "Remember: For classes inheriting from another class, always write 'extends'. We only use 'implements' with interfaces.",
        "codeSnippet": "// WRONG: class Dog implements Animal { }\n// CORRECT: class Dog extends Animal { }"
      },
      {
        "mistake": "Trying to directly access a parent's private variable in the child class.",
        "whyItHappens": "Assuming inheritance gives the child direct access to everything, even private fields.",
        "howToFix": "Private fields are hidden inside the parent. Provide a public getVariable() method in the parent class and call that in the child.",
        "codeSnippet": "class Parent { private int age = 40; public int getAge() { return age; } }\nclass Child extends Parent {\n    void printAge() {\n        // System.out.println(age); // COMPILE ERROR!\n        System.out.println(getAge()); // CORRECT!\n    }\n}"
      },
      {
        "mistake": "Trying to call a child method using a parent object.",
        "whyItHappens": "Assuming inheritance works both ways.",
        "howToFix": "Inheritance is one-way: child gets parent methods, but parent does NOT get child methods. An Animal is not necessarily a Dog!",
        "codeSnippet": "Animal a = new Animal();\n// a.bark(); // COMPILE ERROR! Animal does not know what bark() is."
      }
    ],
    "practiceProblems": [
      {
        "title": "Predict the Output: Inherited Method Call",
        "problemStatement": "What will happen when you compile and run this program?",
        "code": "class Vehicle {\n    void start() {\n        System.out.print(\"Engine started \");\n    }\n}\n\nclass Car extends Vehicle {\n    void honk() {\n        System.out.print(\"Beep beep!\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.start();\n        c.honk();\n    }\n}",
        "options": [
          "Engine started Beep beep!",
          "Compile error because Car does not have start()",
          "Beep beep! Engine started",
          "Runtime error"
        ],
        "correctOptionIndex": 0,
        "hint": "Car extends Vehicle. Can Car call methods from Vehicle?",
        "solution": "Engine started Beep beep!",
        "explanation": "Car inherits the start() method from Vehicle. When c.start() runs, it prints 'Engine started '. Then c.honk() prints 'Beep beep!'."
      },
      {
        "title": "Spot the Compile Error: Parent Accessing Child Method",
        "problemStatement": "Why will the following code fail to compile?",
        "code": "class Bird {\n    void fly() {\n        System.out.println(\"Flying\");\n    }\n}\n\nclass Penguin extends Bird {\n    void swim() {\n        System.out.println(\"Swimming\");\n    }\n}\n\npublic class Test {\n    public static void main(String[] args) {\n        Bird b = new Bird();\n        b.swim();\n    }\n}",
        "options": [
          "Bird b = new Bird() is not allowed",
          "b.swim() fails because parent class Bird does not have a swim() method",
          "Penguin must be an abstract class",
          "fly() method is missing a return type"
        ],
        "correctOptionIndex": 1,
        "hint": "Does inheritance work from child to parent, or parent to child?",
        "solution": "b.swim() fails because parent class Bird does not have a swim() method",
        "explanation": "Inheritance is one-way: children inherit from parents. The Bird class knows nothing about methods declared down inside Penguin."
      },
      {
        "title": "Direct Private Access Trap",
        "problemStatement": "What happens if a child class tries to write `System.out.println(balance);` when `balance` is private in the parent?",
        "code": "class Account {\n    private double balance = 500.0;\n}\n\nclass SavingsAccount extends Account {\n    void showBalance() {\n        System.out.println(balance);\n    }\n}",
        "options": [
          "It prints 500.0 normally",
          "Compile error: balance has private access in Account",
          "It prints 0.0",
          "Runtime NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Remember the keyword private. Can other classes directly use private variables by name?",
        "solution": "Compile error: balance has private access in Account",
        "explanation": "Private variables can only be directly accessed inside the class that declared them. A child class must use a public getter method like getBalance() to read private parent data."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is inheritance in Java and why do we use it?",
        "expectedAnswer": "Inheritance is an Object-Oriented feature where one class (child class) acquires the methods and variables of another class (parent class) using the 'extends' keyword. We use it to avoid duplicate code (code reusability) and to build logical parent-child relationships.",
        "followUp": "What is the IS-A relationship?",
        "followUpAnswer": "IS-A represents inheritance. It means the child is a specific type of the parent. For example, Dog IS-A Animal, and Car IS-A Vehicle. If two classes do not have an IS-A relationship, we should use composition (HAS-A) instead.",
        "keyPhrases": [
          "code reusability",
          "parent and child class",
          "extends keyword",
          "IS-A relationship"
        ],
        "commonMistake": "Saying inheritance copies code into the child class.",
        "commonMistakeAnswer": "Java does not copy code into the child class file. The child simply holds a reference to its parent class definition."
      },
      {
        "question": "Can a child class access private members of its parent class?",
        "expectedAnswer": "A child class cannot directly access a parent's private variables or methods by name. However, the child class CAN access them indirectly through the parent's public or protected getter and setter methods.",
        "followUp": "Why doesn't Java allow direct access to private fields in child classes?",
        "followUpAnswer": "To protect Encapsulation and Data Hiding. If child classes could freely change private variables, any programmer could create a subclass and corrupt critical parent state without validation.",
        "keyPhrases": [
          "no direct access by name",
          "can access via public getters/setters",
          "protects encapsulation"
        ],
        "commonMistake": "Answering 'Private fields are not inherited at all'.",
        "commonMistakeAnswer": "Private fields ARE part of the child object's memory state on the heap, but the child class code cannot refer to them directly by name."
      },
      {
        "question": "What is the difference between a Superclass and a Subclass?",
        "expectedAnswer": "Superclass is the parent class from which features are inherited. Subclass is the child class that extends the superclass and can add its own new features.",
        "followUp": "Can a class be both a superclass and a subclass at the same time?",
        "followUpAnswer": "Yes, in multilevel inheritance! For example, Mammal is a subclass of Animal, but Mammal is also the superclass of Dog.",
        "keyPhrases": [
          "Superclass = Parent",
          "Subclass = Child",
          "Multilevel inheritance"
        ],
        "commonMistake": "Confusing superclass and subclass terminology.",
        "commonMistakeAnswer": "Remember: 'Super' means above (Parent), and 'Sub' means below (Child)."
      }
    ],
    "miniQuiz": [
      {
        "id": "inh-mq1-1",
        "question": "Which Java keyword is used to inherit from a class?",
        "options": [
          "inherits",
          "extends",
          "implements",
          "super"
        ],
        "correctIndex": 1,
        "explanation": "In Java, we write 'class Child extends Parent' to create an inheritance relationship."
      },
      {
        "id": "inh-mq1-2",
        "question": "If class Dog extends Animal, which of the following statements is TRUE?",
        "options": [
          "Animal inherits from Dog",
          "Dog is the parent class and Animal is the child class",
          "Dog is the child class and Animal is the parent class",
          "Dog and Animal have no relationship"
        ],
        "correctIndex": 2,
        "explanation": "In 'class Dog extends Animal', Dog is the child (subclass) and Animal is the parent (superclass)."
      },
      {
        "id": "inh-mq1-3",
        "question": "Which of the following is a genuine IS-A relationship suitable for inheritance?",
        "options": [
          "Car and Engine (A Car IS-A Engine)",
          "Student and Person (A Student IS-A Person)",
          "Book and Page (A Book IS-A Page)",
          "House and Door (A House IS-A Door)"
        ],
        "correctIndex": 1,
        "explanation": "A Student IS-A Person. A Car has an engine (HAS-A), a Book has pages (HAS-A), and a House has doors (HAS-A)."
      },
      {
        "id": "inh-mq1-4",
        "question": "Can a child class directly access a private variable of its parent class by name?",
        "options": [
          "Yes, inheritance gives access to everything",
          "Yes, but only if the child is in the same folder",
          "No, private variables can only be directly accessed inside the declaring parent class",
          "No, unless we use the 'new' keyword"
        ],
        "correctIndex": 2,
        "explanation": "Private variables are strictly hidden. The child cannot directly write the variable name, but can call public getters/setters."
      },
      {
        "id": "inh-mq1-5",
        "question": "What is the primary benefit of using inheritance in Java?",
        "options": [
          "It makes Java code run twice as fast",
          "Code reusability: write common code once in a parent class and share it across child classes",
          "It allows classes to have multiple main() methods",
          "It automatically saves objects to a database"
        ],
        "correctIndex": 1,
        "explanation": "Code reusability is the number one benefit. You write shared logic once in the parent, reducing duplicate code and bugs."
      }
    ],
    "cheatSheet": {
      "summary": "Inheritance allows a child class (subclass) to get methods and variables from a parent class (superclass) using the 'extends' keyword, eliminating duplicate code.",
      "syntaxTemplate": "class Parent {\n    // Common variables and methods\n    void commonMethod() { }\n}\n\nclass Child extends Parent {\n    // Child gets commonMethod() for free\n    // Child can also add its own new methods\n    void uniqueMethod() { }\n}",
      "rules": [
        {
          "rule": "The extends Keyword",
          "explanation": "Always write 'class Child extends Parent'. Java does not use words like 'inherits'."
        },
        {
          "rule": "One-Way Flow",
          "explanation": "Children inherit from parents. Parents do NOT inherit from children."
        },
        {
          "rule": "The IS-A Test",
          "explanation": "Only use inheritance if you can honestly say 'Child IS-A Parent' in plain English."
        },
        {
          "rule": "Private Data Hiding",
          "explanation": "Child classes cannot directly touch private fields of parents by name; use public getters/setters instead."
        },
        {
          "rule": "Code Reusability",
          "explanation": "Write shared methods once in the parent class to avoid repeating the same code in multiple child classes."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Role",
          "optionA": "Parent (Superclass): The general class with shared code",
          "optionB": "Child (Subclass): The specialized class with extra code"
        },
        {
          "aspect": "Access",
          "optionA": "Public/Protected: Inherited by child",
          "optionB": "Private: Hidden inside parent only"
        }
      ],
      "quickDefinitions": [
        {
          "term": "Inheritance",
          "oneLiner": "One class getting variables and methods from another class using 'extends'.",
          "interviewExplanation": "A core OOP mechanism that promotes code reuse by allowing a child class to inherit non-private members of a parent class.",
          "realWorldExample": "A child inheriting their parents' eye color and surname, while learning their own unique hobbies.",
          "codeExample": "class Dog extends Animal { }"
        },
        {
          "term": "Superclass",
          "oneLiner": "The parent class that shares its code.",
          "interviewExplanation": "The class above in the hierarchy whose methods and fields are inherited by subclasses.",
          "realWorldExample": "Vehicle is the superclass of Car and Bike.",
          "codeExample": "class Vehicle { void start() { } }"
        },
        {
          "term": "Subclass",
          "oneLiner": "The child class that inherits from the superclass.",
          "interviewExplanation": "The class below that extends the parent, getting shared features and adding its own specialized behavior.",
          "realWorldExample": "Car is a subclass of Vehicle.",
          "codeExample": "class Car extends Vehicle { void openTrunk() { } }"
        }
      ],
      "differences": [
        {
          "title": "Parent Class vs Child Class",
          "conceptA": "Parent Class (Superclass)",
          "conceptB": "Child Class (Subclass)",
          "keyDifference": "Parent has general shared code; Child has specialized extra code.",
          "comparisonPoints": [
            {
              "feature": "Keyword",
              "a": "Declared as normal class",
              "b": "Uses 'extends ParentName'"
            },
            {
              "feature": "Knowledge",
              "a": "Does NOT know who its children are",
              "b": "Knows its parent and can call parent methods"
            },
            {
              "feature": "Purpose",
              "a": "Code sharing and general template",
              "b": "Specialization and extra features"
            }
          ]
        }
      ],
      "mostAskedQuestions": [
        {
          "question": "What is inheritance in simple words?",
          "answer": "Inheritance allows one class (child) to reuse the code of another class (parent) using the 'extends' keyword. It prevents us from writing the same code again and again.",
          "trapsToAvoid": "Saying 'child inherits everything including private fields directly'. Remember private fields are hidden."
        },
        {
          "question": "What is the IS-A relationship in Java?",
          "answer": "The IS-A relationship represents inheritance. It means the child class is a specialized type of the parent class (e.g., Dog IS-A Animal, Car IS-A Vehicle). If two classes do not have an IS-A relationship, composition (HAS-A) should be used instead.",
          "trapsToAvoid": "Using inheritance when a HAS-A relationship exists (like Car HAS-A Engine)."
        },
        {
          "question": "Can a child class access private variables of the parent class?",
          "answer": "A child class cannot directly access private parent variables by name. However, the child class can access and modify them indirectly through the parent's public or protected getter and setter methods.",
          "trapsToAvoid": "Saying an absolute 'No' without mentioning public getters and setters."
        }
      ]
    }
  }
};
