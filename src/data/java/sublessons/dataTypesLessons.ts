import { DetailedLesson } from '../detailedLessons';

// ============================================================
// MODULE 2: DATA TYPES & VARIABLES (LESSONS 2.1 - 2.8)
// Comprehensive in-depth curriculum matching OOP standard
// ============================================================

export const dataTypesLessons: Record<string, DetailedLesson> = {
  "variables-and-scope": {
    "id": "variables-and-scope",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.1",
    "title": "Variables, Declaration & Scope",
    "subtitle": "Declaration vs initialization, stack frame lifecycle, local vs instance vs static scope, and uninitialized variable errors",
    "estimatedMinutes": 12,
    "beginnerAnalogy": "In Java, a variable is a named storage location in memory bound to a static type. The declaration specifies the variable's identifier and data type, instructing the compiler how many bytes to allocate and which operations are legal on that memory region.\n\nJava distinguishes three fundamental categories of variables based on their scope and lifetime: Local variables, Instance variables (fields), and Static variables (class variables). Local variables are declared inside methods, constructors, or blocks; they are allocated directly inside the executing thread's stack frame, are strictly inaccessible outside their enclosing block, and are deallocated instantaneously when the method frame pops off the call stack. Unlike instance and static fields which the JVM automatically initializes to default values (0, false, null), local variables receive no default values and must be explicitly initialized before reading, or javac flags a compile-time error.\n\nVariable scope in Java is strictly block-scoped (delimited by curly braces {}). Inner blocks inherit visibility of variables declared in enclosing outer blocks, but outer blocks have zero visibility into variables declared inside nested blocks.",
    "coreExplanation": [
      "Declaration vs Initialization: Declaration binds an identifier to a type (int count;). Initialization assigns an initial value to that storage (count = 10;). Declaration and initialization can be combined into a single statement (int count = 10;).",
      "Stack Frame Allocation: Local variables reside in the Local Variable Array of the current thread's stack frame. Primitive locals store direct binary bits; reference locals store 32-bit or 64-bit pointers to heap objects.",
      "The Definite Assignment Rule: Java enforces that every local variable must be 'definitely assigned' before any read operation occurs. Reading an uninitialized local variable causes a compile-time error ('variable x might not have been initialized').",
      "Instance Variables (Fields): Declared inside a class but outside methods. Allocated on the Heap inside the object memory layout. Initialized automatically to default values (0, 0.0, false, null) when the object is instantiated via 'new'.",
      "Static Variables (Class Variables): Declared with the 'static' keyword. Allocated once per class in Metaspace / Class Statics, shared across all instances of the class.",
      "Block Scoping: A variable declared inside a block '{ ... }' (such as an if statement, for loop, or anonymous block) is visible only within that block and ceases to exist after block execution."
    ],
    "diagram": "================ VARIABLE SCOPE & MEMORY RESIDENCE ================\n\n  +-----------------------------------------------------------------+\n  |  METASPACE (Class Metadata)                                     |\n  |  public static int globalCounter = 0;   <-- Static Variable     |\n  |  (Shared by all instances for the lifetime of the ClassLoader)  |\n  +-----------------------------------------------------------------+\n\n  +-----------------------------------------------------------------+\n  |  HEAP MEMORY (Object Instances)                                 |\n  |  User instance: [ id = 101, name = \"Alice\" ] <-- Instance Fields|\n  |  (Allocated on 'new', destroyed by Garbage Collector)           |\n  +-----------------------------------------------------------------+\n\n  +-----------------------------------------------------------------+\n  |  THREAD STACK (Call Stack Frame)                                |\n  |  void calculateTotal() {                                        |\n  |      int localTax = 15;        <-- Local Variable               |\n  |      {                                                          |\n  |          int blockDiscount = 5;<-- Block Scoped Local           |\n  |      } // blockDiscount popped immediately                      |\n  |  } // localTax popped when stack frame returns                  |\n  +-----------------------------------------------------------------+",
    "codeSnippet": {
      "title": "Local vs Instance Initialization and Block Scoping",
      "code": "public class VariableScopeDemo {\n    // 1. Static class variable: defaults to 0\n    static int staticCounter;\n\n    // 2. Instance field: defaults to 0.0\n    double instanceBalance;\n\n    public void execute() {\n        // 3. Local variable: MUST be initialized before reading\n        int localTotal = 100;\n\n        if (localTotal > 50) {\n            // 4. Block-scoped variable\n            int bonus = 25;\n            localTotal += bonus;\n            System.out.println(\"Inside block total: \" + localTotal);\n        }\n        // 'bonus' is out of scope here!\n\n        System.out.println(\"Final localTotal: \" + localTotal);\n        System.out.println(\"Default instanceBalance: \" + instanceBalance);\n        System.out.println(\"Default staticCounter: \" + staticCounter);\n    }\n\n    public static void main(String[] args) {\n        new VariableScopeDemo().execute();\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "static int staticCounter;",
          "explanation": "Class variable initialized automatically by JVM to 0."
        },
        {
          "line": "double instanceBalance;",
          "explanation": "Instance field initialized automatically by JVM to 0.0."
        },
        {
          "line": "int localTotal = 100;",
          "explanation": "Local variable allocated in stack frame; explicit initialization is mandatory."
        }
      ],
      "output": "Inside block total: 125\nFinal localTotal: 125\nDefault instanceBalance: 0.0\nDefault staticCounter: 0"
    },
    "codeExamples": [
      {
        "title": "Uninitialized Local Variable Compile Error",
        "description": "Demonstrating how conditional branches trigger the definite assignment compiler check.",
        "code": "public class DefiniteAssignment {\n    public static int checkGrade(boolean honors) {\n        int bonus;\n        if (honors) {\n            bonus = 10;\n        } else {\n            bonus = 0; // Removing this line causes compile error: variable bonus might not have been initialized\n        }\n        return bonus;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Bonus: \" + checkGrade(true));\n    }\n}",
        "output": "Bonus: 10"
      },
      {
        "title": "Shadowing Field with Local Variable",
        "description": "Demonstrating identifier shadowing and accessing the shadowed instance field using 'this'.",
        "code": "public class ShadowingDemo {\n    int count = 50; // Instance field\n\n    public void run() {\n        int count = 10; // Local variable shadows instance field\n        System.out.println(\"Local count   : \" + count);\n        System.out.println(\"Instance count: \" + this.count);\n    }\n    public static void main(String[] args) {\n        new ShadowingDemo().run();\n    }\n}",
        "output": "Local count   : 10\nInstance count: 50"
      }
    ],
    "cheatSheet": {
      "summary": "Local variables live on the thread stack and require explicit initialization. Instance fields live on the heap and receive default values. Static variables live in class memory. Scope is block-bounded by curly braces.",
      "rules": [
        {
          "rule": "Definite Assignment Rule",
          "explanation": "Every local variable must be assigned a value on every possible code execution path before reading."
        },
        {
          "rule": "No Variable Shadowing in Nested Blocks",
          "explanation": "You cannot declare 'int x' inside a block if 'int x' is already declared in an enclosing method scope."
        },
        {
          "rule": "Default Values on Fields",
          "explanation": "Numeric fields default to 0/0.0, boolean defaults to false, object references default to null."
        },
        {
          "rule": "Stack Frame Destruction",
          "explanation": "When a method returns, all its local variables are destroyed instantly with zero GC overhead."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Memory Location",
          "optionA": "Local: Thread Stack Frame",
          "optionB": "Instance: Heap Object Layout",
          "optionC": "Static: Metaspace / Class Statics"
        },
        {
          "aspect": "Default Value",
          "optionA": "Local: None (Compiler error if uninitialized)",
          "optionB": "Instance: 0, 0.0, false, null",
          "optionC": "Static: 0, 0.0, false, null"
        },
        {
          "aspect": "Lifetime",
          "optionA": "Local: Duration of method/block execution",
          "optionB": "Instance: Lifetime of the object on the heap",
          "optionC": "Static: Lifetime of the ClassLoader"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Attempting to declare two local variables with the same name in nested scopes",
        "whyItHappens": "Coming from C/C++ where inner blocks can shadow outer local variables.",
        "howToFix": "Java explicitly forbids local variable shadowing; rename the inner variable."
      },
      {
        "mistake": "Assuming local variables receive zero or null automatically",
        "whyItHappens": "Confusing local variables with instance fields.",
        "howToFix": "Always initialize local variables before reading them."
      },
      {
        "mistake": "Using a block-scoped variable outside its declaring curly braces",
        "whyItHappens": "Declaring a loop counter or accumulator inside the loop body instead of before the loop.",
        "howToFix": "Declare the variable in the outer enclosing block if its value is needed after the block completes."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Uninitialized Local Variable Compilation",
        "problemStatement": "What is the compiler result for: 'public void test() { int x; System.out.println(x); }'?",
        "options": [
          "Prints 0",
          "Compile-time error: variable x might not have been initialized",
          "Prints null",
          "Throws NullPointerException at runtime"
        ],
        "correctOptionIndex": 1,
        "hint": "Local variables receive no default values.",
        "solution": "Compile-time error: variable x might not have been initialized",
        "explanation": "Java strictly enforces definite assignment for local variables; reading an uninitialized local variable is a compile-time error."
      },
      {
        "title": "Puzzle 2: Instance Field Default Value",
        "problemStatement": "What is printed by: 'class Data { int val; } public class Main { public static void main(String[] args) { System.out.println(new Data().val); } }'?",
        "options": [
          "0",
          "null",
          "Compile-time error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "Instance fields are initialized to standard default values by the JVM.",
        "solution": "0",
        "explanation": "Instance fields of type int are automatically initialized to 0 during object construction on the heap."
      },
      {
        "title": "Puzzle 3: Nested Block Shadowing",
        "problemStatement": "What happens when compiling: 'int a = 5; { int a = 10; }' inside a method?",
        "options": [
          "Compiles and runs normally",
          "Compile-time error: variable a is already defined in method",
          "Prints 10",
          "Inner 'a' overwrites outer 'a'"
        ],
        "correctOptionIndex": 1,
        "hint": "Java does not permit local variables to shadow other local variables in the same method.",
        "solution": "Compile-time error: variable a is already defined in method",
        "explanation": "In Java, an inner block cannot declare a local variable with the same name as a variable in an enclosing local scope."
      },
      {
        "title": "Puzzle 4: Scope of Loop Variable",
        "problemStatement": "What is printed by: 'for (int i = 0; i < 3; i++); System.out.println(i);'?",
        "options": [
          "3",
          "2",
          "Compile-time error: cannot find symbol variable i",
          "0"
        ],
        "correctOptionIndex": 2,
        "hint": "Notice the semicolon immediately following the for loop header.",
        "solution": "Compile-time error: cannot find symbol variable i",
        "explanation": "The semicolon terminates the for loop body. 'i' is scoped strictly to the for loop and is undefined outside it."
      },
      {
        "title": "Puzzle 5: Definite Assignment in If-Else",
        "problemStatement": "Does this compile? 'int x; if (condition) { x = 1; } else { x = 2; } System.out.println(x);'",
        "options": [
          "Yes, because every code path assigns x before it is read",
          "No, because condition is dynamic",
          "Compile-time error: duplicate assignment",
          "Only if condition is final"
        ],
        "correctOptionIndex": 0,
        "hint": "The compiler verifies that all execution branches initialize x.",
        "solution": "Yes, because every code path assigns x before it is read",
        "explanation": "Because both the 'if' and 'else' branches initialize x, the compiler proves definite assignment before the print statement."
      },
      {
        "title": "Puzzle 6: Default Value of Boolean Field",
        "problemStatement": "What is the default value of an uninitialized instance field of type 'boolean'?",
        "options": [
          "true",
          "false",
          "null",
          "-1"
        ],
        "correctOptionIndex": 1,
        "hint": "The zero-value of a boolean is false.",
        "solution": "false",
        "explanation": "The JVM initializes boolean instance fields and array elements to 'false' by default."
      },
      {
        "title": "Puzzle 7: Reference Variable Default Value",
        "problemStatement": "What is the default value of an uninitialized instance field of type 'String'?",
        "options": [
          "\"\"",
          "null",
          "undefined",
          "Empty String"
        ],
        "correctOptionIndex": 1,
        "hint": "All reference types default to this pointer value.",
        "solution": "null",
        "explanation": "All object reference fields default to 'null', signifying that they point to no object on the heap."
      },
      {
        "title": "Puzzle 8: Lifetime of Method Local Variables",
        "problemStatement": "When are local variables declared inside a method deallocated from memory?",
        "options": [
          "When the Garbage Collector runs",
          "Immediately when the method stack frame pops off the call stack upon return",
          "At JVM shutdown",
          "After 10 seconds"
        ],
        "correctOptionIndex": 1,
        "hint": "Stack memory deallocation is deterministic and instantaneous.",
        "solution": "Immediately when the method stack frame pops off the call stack upon return",
        "explanation": "Local variables exist only within the method's stack frame. When the method returns, the frame is popped and the memory is reclaimed instantly."
      },
      {
        "title": "Puzzle 9: Shadowing Instance Fields with Parameters",
        "problemStatement": "In 'public void setX(int x) { x = x; }', what does 'x = x' do?",
        "options": [
          "Assigns parameter x to instance field x",
          "Assigns parameter x to itself, leaving instance field unchanged",
          "Compile-time error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Parameter x shadows instance field x; without 'this', the assignment targets the parameter.",
        "solution": "Assigns parameter x to itself, leaving instance field unchanged",
        "explanation": "The parameter 'x' shadows the instance field 'x'. To assign the instance field, code must write 'this.x = x;'."
      },
      {
        "title": "Puzzle 10: Final Local Variable Behavior",
        "problemStatement": "What happens if code attempts to reassign a variable declared as 'final int val = 10;'?",
        "options": [
          "val is reassigned normally",
          "Compile-time error: cannot assign a value to final variable val",
          "val becomes static",
          "A warning is logged"
        ],
        "correctOptionIndex": 1,
        "hint": "The 'final' modifier makes a variable immutable after initial assignment.",
        "solution": "Compile-time error: cannot assign a value to final variable val",
        "explanation": "The 'final' modifier ensures a variable can be assigned exactly once; subsequent reassignments are rejected by javac."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between local variables, instance variables, and class (static) variables in Java?",
        "answer": "1. Local variables: Declared inside methods, constructors, or blocks. Allocated in the thread's stack frame. Created on method entry and destroyed on method exit. Have no default values (must be explicitly initialized).\n2. Instance variables: Declared in a class outside methods. Allocated on the heap inside object instances. Created on 'new' and destroyed when the object is garbage collected. Initialized automatically to defaults (0, false, null).\n3. Static variables: Declared with 'static'. Allocated in Metaspace/class statics once per class. Created on class load and exist until class unload. Initialized automatically to defaults."
      },
      {
        "question": "What is the Definite Assignment Rule in Java?",
        "answer": "Definite Assignment is a compiler analysis rule requiring that every local variable must be assigned a value on every possible execution path before it is read. If the compiler cannot prove that an assignment occurs prior to a read (e.g. an assignment inside an 'if' block without an 'else' block), it throws a compile-time error: 'variable might not have been initialized'."
      },
      {
        "question": "Can a local variable in an inner block shadow a local variable in an outer block in Java?",
        "answer": "No. Unlike C/C++, Java strictly forbids local variable shadowing within the same method. Writing '{ int x = 1; { int x = 2; } }' produces a compile-time error: 'variable x is already defined'. However, a local variable CAN shadow an instance field of the same name (which is disambiguated using 'this.x')."
      },
      {
        "question": "Why do instance variables receive default values while local variables do not?",
        "answer": "Instance variables are allocated on the heap by clearing allocated memory to zero bits, which is fast and prevents uninitialized memory leaks across objects. Local variables live in stack frame slots which are reused continuously across different method calls; leaving old stack bits without forced assignment could expose stale data from previous method calls. Forcing explicit initialization ensures algorithmic correctness."
      },
      {
        "question": "What are the default values for all Java primitive types and reference types?",
        "answer": "- byte, short, int: 0\n- long: 0L\n- float: 0.0f\n- double: 0.0d\n- char: '\\u0000' (null character, integer 0)\n- boolean: false\n- All object references: null"
      },
      {
        "question": "What is the lifetime of a variable declared in a 'for' loop header (e.g. for (int i = 0; ...))?",
        "answer": "The variable 'i' is scoped exclusively to the for loop statement (initialization, condition, update, and loop body). Its lifetime begins when the loop starts and terminates immediately when the loop finishes. It cannot be accessed after the closing brace of the loop."
      },
      {
        "question": "What is an 'effectively final' variable in Java?",
        "answer": "Introduced in Java 8, an effectively final variable is a local variable whose value is never changed after its initial assignment, even though it was not explicitly declared with the 'final' keyword. Local classes, anonymous classes, and lambda expressions can only capture local variables that are final or effectively final."
      },
      {
        "question": "Can a method parameter be marked 'final' in Java? What is the benefit?",
        "answer": "Yes (e.g. public void process(final int id)). Marking a parameter 'final' prevents the method body from accidentally reassigning the parameter variable, enforcing that parameters remain pure inputs and improving code readability."
      },
      {
        "question": "What happens when an object reference variable falls out of scope?",
        "answer": "When a reference variable falls out of scope (e.g. method returns), the reference pointer on the stack frame is destroyed. If no other active references point to the heap object that the variable pointed to, that heap object becomes eligible for Garbage Collection."
      },
      {
        "question": "What is 'variable blank final' in Java?",
        "answer": "A blank final variable is a final variable that is declared without an immediate initializer (e.g. 'final int max;'). For local variables, it must be assigned once before reading. For instance fields, it must be assigned in every constructor of the class; failure to initialize it in a constructor causes a compile error."
      }
    ],
    "miniQuiz": [
      {
        "id": "fund_2_1_q1",
        "question": "Where are local variables stored in memory during program execution?",
        "options": [
          "On the JVM Heap",
          "Inside the current thread's Stack Frame",
          "In Metaspace",
          "In the Code Cache"
        ],
        "correctIndex": 1,
        "explanation": "Local variables are allocated in the local variable array of the current method's stack frame."
      },
      {
        "id": "fund_2_1_q2",
        "question": "What happens if you attempt to read an uninitialized local variable?",
        "options": [
          "The JVM returns 0",
          "The JVM returns null",
          "Compile-time error: variable might not have been initialized",
          "Runtime NullPointerException"
        ],
        "correctIndex": 2,
        "explanation": "Java enforces definite assignment for local variables; reading an uninitialized local variable fails compilation."
      },
      {
        "id": "fund_2_1_q3",
        "question": "What is the default value of an uninitialized instance field of type 'double'?",
        "options": [
          "0.0",
          "null",
          "NaN",
          "1.0"
        ],
        "correctIndex": 0,
        "explanation": "Floating point instance fields default to 0.0 (or 0.0d)."
      },
      {
        "id": "fund_2_1_q4",
        "question": "Can an inner block declare a local variable that shadows an outer local variable in the same method?",
        "options": [
          "Yes, always",
          "No, Java compiler throws a duplicate variable error",
          "Only if marked static",
          "Only if types are different"
        ],
        "correctIndex": 1,
        "explanation": "Java does not permit local variables in nested blocks to shadow enclosing local variables."
      },
      {
        "id": "fund_2_1_q5",
        "question": "What is the default value of a boolean instance field in Java?",
        "options": [
          "true",
          "false",
          "0",
          "null"
        ],
        "correctIndex": 1,
        "explanation": "Boolean instance fields default to false."
      },
      {
        "id": "fund_2_1_q6",
        "question": "What is the default value of all object reference fields?",
        "options": [
          "Empty object",
          "null",
          "0",
          "undefined"
        ],
        "correctIndex": 1,
        "explanation": "All reference type fields (String, Object, arrays) default to null."
      },
      {
        "id": "fund_2_1_q7",
        "question": "Where are instance fields allocated in JVM memory?",
        "options": [
          "On the Heap inside the object",
          "On the Thread Stack",
          "In Metaspace",
          "In CPU registers only"
        ],
        "correctIndex": 0,
        "explanation": "Instance fields are allocated as part of the object layout on the shared JVM heap."
      },
      {
        "id": "fund_2_1_q8",
        "question": "What keyword is used to access an instance field that is shadowed by a method parameter?",
        "options": [
          "super",
          "this",
          "outer",
          "self"
        ],
        "correctIndex": 1,
        "explanation": "The 'this' keyword explicitly references the current object's instance members."
      },
      {
        "id": "fund_2_1_q9",
        "question": "What does the 'final' keyword enforce when applied to a local variable?",
        "options": [
          "It can be assigned multiple times",
          "It can be assigned exactly once and cannot be modified thereafter",
          "It moves the variable to the heap",
          "It makes the variable global"
        ],
        "correctIndex": 1,
        "explanation": "Final variables are immutable after initial assignment."
      },
      {
        "id": "fund_2_1_q10",
        "question": "When does the lifetime of an instance variable end?",
        "options": [
          "When the method declaring it returns",
          "When the object containing it is garbage collected",
          "At JVM shutdown",
          "Immediately after the constructor finishes"
        ],
        "correctIndex": 1,
        "explanation": "Instance variables exist on the heap as long as their containing object remains reachable."
      },
      {
        "id": "fund_2_1_q11",
        "question": "What is an 'effectively final' variable?",
        "options": [
          "A variable declared final",
          "A variable whose value is never changed after initialization, allowing lambda capture",
          "A variable that cannot be accessed",
          "A deprecated variable"
        ],
        "correctIndex": 1,
        "explanation": "An effectively final variable is not marked final, but its value is never reassigned after initialization."
      },
      {
        "id": "fund_2_1_q12",
        "question": "What happens to local variables when a method returns?",
        "options": [
          "They are placed in the garbage collection queue",
          "They are destroyed immediately as the stack frame is popped",
          "They are moved to Metaspace",
          "They are retained for 1 minute"
        ],
        "correctIndex": 1,
        "explanation": "Popping the stack frame reclaims all local variable slots deterministically with zero GC overhead."
      },
      {
        "id": "fund_2_1_q13",
        "question": "Which variable type is shared across all instances of a class?",
        "options": [
          "Instance variable",
          "Local variable",
          "Static (class) variable",
          "Block variable"
        ],
        "correctIndex": 2,
        "explanation": "Static variables exist once per class in Metaspace and are shared across all instances."
      },
      {
        "id": "fund_2_1_q14",
        "question": "Can a static variable be accessed without creating an instance of the class?",
        "options": [
          "No, an instance is required",
          "Yes, using ClassName.variableName",
          "Only from the main method",
          "Only via reflection"
        ],
        "correctIndex": 1,
        "explanation": "Static members belong to the class and are accessed directly via ClassName.member."
      },
      {
        "id": "fund_2_1_q15",
        "question": "What is the default value of a char instance field?",
        "options": [
          "' ' (space)",
          "'0'",
          "'\\u0000' (null character, integer 0)",
          "null"
        ],
        "correctIndex": 2,
        "explanation": "A char field defaults to '\\u0000', the Unicode null character with numeric value 0."
      }
    ]
  },
  "primitive-types-deep-dive": {
    "id": "primitive-types-deep-dive",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.2",
    "title": "The 8 Primitive Data Types",
    "subtitle": "Memory footprints, value ranges, two's complement binary representation, and precision boundaries",
    "estimatedMinutes": 15,
    "beginnerAnalogy": "Java is not a pure object-oriented language because it retains eight built-in **Primitive Data Types**. Unlike objects, primitives are not instantiated on the heap with object headers; instead, they store raw binary values directly in memory (in stack frame slots or packed field layouts), providing maximum execution performance and zero memory overhead.\n\nThe eight primitive types are divided into four fundamental categories: Integers (byte, short, int, long), Floating-Point numbers (float, double), Characters (char), and Booleans (boolean). The Java Language Specification strictly mandates the exact bit width and value range of every primitive type across all platforms: 'byte' is 8 bits (-128 to 127), 'short' is 16 bits (-32,768 to 32,767), 'int' is 32 bits, 'long' is 64 bits, 'float' is 32-bit single-precision IEEE 754, 'double' is 64-bit double-precision IEEE 754, 'char' is 16-bit unsigned Unicode (0 to 65,535), and 'boolean' represents a logical true or false.\n\nBecause primitive sizes are identical on every architecture (unlike C where 'int' can vary between 16, 32, and 64 bits), Java programs avoid architecture-dependent integer overflow and truncation bugs.",
    "coreExplanation": [
      "byte: 8 bits (1 byte), signed two's complement. Range: -128 to 127 (-2^7 to 2^7 - 1). Used to save memory in large byte streams and binary network protocols.",
      "short: 16 bits (2 bytes), signed two's complement. Range: -32,768 to 32,767 (-2^15 to 2^15 - 1). Rarely used in modern Java except in low-memory arrays.",
      "int: 32 bits (4 bytes), signed two's complement. Range: -2,147,483,648 to 2,147,483,647. The default integer type in Java; all integer literals (e.g. 100) are typed as int.",
      "long: 64 bits (8 bytes), signed two's complement. Range: -2^63 to 2^63 - 1. Declared with an 'L' or 'l' suffix (e.g. 10000000000L); uppercase 'L' is standard to avoid confusing 'l' with '1'.",
      "float: 32 bits (4 bytes), IEEE 754 single-precision floating point (~6-7 decimal digits precision). Requires 'F' or 'f' suffix (e.g. 3.14f).",
      "double: 64 bits (8 bytes), IEEE 754 double-precision floating point (~15-17 decimal digits precision). Default type for floating-point literals (e.g. 3.14).",
      "char: 16 bits (2 bytes), UNSIGNED 16-bit Unicode UTF-16 code unit. Range: '\\u0000' (0) to '\\uffff' (65,535). Stores a single character in single quotes (e.g. 'A').",
      "boolean: Logical true or false. The JVM specification specifies that in compiled bytecode, boolean is represented as 1 byte in arrays and 32-bit integers in local variable frames."
    ],
    "diagram": "================ THE 8 PRIMITIVE DATA TYPES IN MEMORY ================\n\n  Type       Size      Signed?   Range / Precision\n  -------------------------------------------------------------------\n  byte      8 bits     Signed    -128 to 127\n  short    16 bits     Signed    -32,768 to 32,767\n  int      32 bits     Signed    -2,147,483,648 to 2,147,483,647\n  long     64 bits     Signed    -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807\n  float    32 bits     Signed    IEEE 754 Single Precision (~7 digits)\n  double   64 bits     Signed    IEEE 754 Double Precision (~15-17 digits)\n  char     16 bits     UNSIGNED  0 to 65,535 ('\\u0000' to '\\uffff')\n  boolean  1 bit (JLS)  N/A      true or false\n\n  Memory Architecture Comparison:\n  Primitive 'int x = 42;'   --> [ 00000000 00000000 00000000 00101010 ] (Raw 4 Bytes)\n  Object 'Integer x = 42;'  --> Reference (4/8 Bytes) -> Heap Object Header (12-16B) + Primitive Int (4B)",
    "codeSnippet": {
      "title": "Inspecting Primitive Min/Max Values and Byte Sizes",
      "code": "public class PrimitiveInfo {\n    public static void main(String[] args) {\n        System.out.println(\"byte   : \" + Byte.BYTES + \" bytes | [\" + Byte.MIN_VALUE + \" to \" + Byte.MAX_VALUE + \"]\");\n        System.out.println(\"short  : \" + Short.BYTES + \" bytes | [\" + Short.MIN_VALUE + \" to \" + Short.MAX_VALUE + \"]\");\n        System.out.println(\"int    : \" + Integer.BYTES + \" bytes | [\" + Integer.MIN_VALUE + \" to \" + Integer.MAX_VALUE + \"]\");\n        System.out.println(\"long   : \" + Long.BYTES + \" bytes | [\" + Long.MIN_VALUE + \" to \" + Long.MAX_VALUE + \"]\");\n        System.out.println(\"float  : \" + Float.BYTES + \" bytes | [\" + Float.MIN_VALUE + \" to \" + Float.MAX_VALUE + \"]\");\n        System.out.println(\"double : \" + Double.BYTES + \" bytes | [\" + Double.MIN_VALUE + \" to \" + Double.MAX_VALUE + \"]\");\n        System.out.println(\"char   : \" + Character.BYTES + \" bytes | [\" + (int)Character.MIN_VALUE + \" to \" + (int)Character.MAX_VALUE + \"]\");\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Byte.BYTES",
          "explanation": "Queries the standard constant defining the byte width of the primitive type."
        },
        {
          "line": "Integer.MIN_VALUE / MAX_VALUE",
          "explanation": "The maximum and minimum boundaries dictated by 32-bit two's complement."
        },
        {
          "line": "(int)Character.MIN_VALUE",
          "explanation": "Casting char to int reveals its unsigned numeric codepoint range (0 to 65535)."
        }
      ],
      "output": "byte   : 1 bytes | [-128 to 127]\nshort  : 2 bytes | [-32768 to 32767]\nint    : 4 bytes | [-2147483648 to 2147483647]\nlong   : 8 bytes | [-9223372036854775808 to 9223372036854775807]\nfloat  : 4 bytes | [1.4E-45 to 3.4028235E38]\ndouble : 8 bytes | [4.9E-324 to 1.7976931348623157E308]\nchar   : 2 bytes | [0 to 65535]"
    },
    "codeExamples": [
      {
        "title": "Numeric Literals with Underscores and Suffixes",
        "description": "Using readability underscores (Java 7+) and mandatory type suffixes.",
        "code": "public class LiteralsDemo {\n    public static void main(String[] args) {\n        // Underscores for visual readability (ignored by javac)\n        int creditCard = 1234_5678_9012_3456;\n        long worldPopulation = 8_000_000_000L; // Mandatory 'L' suffix\n        float pi = 3.14159f;                   // Mandatory 'f' suffix\n        double distance = 1.496e8;             // Scientific notation (double)\n\n        System.out.println(\"Population: \" + worldPopulation);\n        System.out.println(\"Float PI  : \" + pi);\n    }\n}",
        "output": "Population: 8000000000\nFloat PI  : 3.14159"
      },
      {
        "title": "Char Arithmetic and Unicode Codepoint Offsets",
        "description": "Demonstrating that chars in Java can participate directly in integer arithmetic.",
        "code": "public class CharArithmetic {\n    public static void main(String[] args) {\n        char letter = 'A'; // Unicode 65\n        letter += 3;       // letter becomes 'D' (65 + 3 = 68)\n        System.out.println(\"Transformed letter: \" + letter);\n\n        int diff = 'Z' - 'A';\n        System.out.println(\"Alphabet span: \" + diff); // 25\n    }\n}",
        "output": "Transformed letter: D\nAlphabet span: 25"
      }
    ],
    "cheatSheet": {
      "summary": "Java has 8 primitive types: byte(1B), short(2B), int(4B), long(8B), float(4B), double(8B), char(2B unsigned), boolean. Primitives store raw binary values with zero object overhead.",
      "rules": [
        {
          "rule": "Long Suffix Rule",
          "explanation": "Integer literals exceeding 32 bits require an 'L' suffix (e.g. 5000000000L) or javac errors out."
        },
        {
          "rule": "Float Suffix Rule",
          "explanation": "Floating point literals default to double; 'f' or 'F' is required to assign to a float."
        },
        {
          "rule": "Char is Unsigned",
          "explanation": "char is the ONLY unsigned numeric primitive type in Java, with range 0 to 65535."
        },
        {
          "rule": "Boolean Non-Convertibility",
          "explanation": "Booleans cannot be cast to ints (unlike C where 1=true, 0=false); 'if (1)' fails to compile."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Type",
          "optionA": "int",
          "optionB": "long",
          "optionC": "double"
        },
        {
          "aspect": "Bytes",
          "optionA": "4 Bytes (32 bits)",
          "optionB": "8 Bytes (64 bits)",
          "optionC": "8 Bytes (64 bits)"
        },
        {
          "aspect": "Literal Syntax",
          "optionA": "42",
          "optionB": "42L",
          "optionC": "42.0 (or 42.0d)"
        },
        {
          "aspect": "Range",
          "optionA": "~ -2 Billion to +2 Billion",
          "optionB": "~ -9 Quintillion to +9 Quintillion",
          "optionC": "~15-17 significant decimal digits"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Writing 'long num = 3000000000;' without the 'L' suffix",
        "whyItHappens": "Not knowing that integer literals default to 32-bit int before assignment.",
        "howToFix": "Append 'L' (e.g. 3000000000L) so javac treats the literal as a 64-bit long."
      },
      {
        "mistake": "Writing 'float f = 3.14;' without the 'f' suffix",
        "whyItHappens": "Assuming floating point literals default to float.",
        "howToFix": "Floating point literals default to double; append 'f' (e.g. 3.14f)."
      },
      {
        "mistake": "Writing 'if (x)' where x is an integer (like in C)",
        "whyItHappens": "Assuming non-zero integers evaluate to true.",
        "howToFix": "Java booleans are completely distinct from numbers; write 'if (x != 0)'."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Missing Long Suffix Error",
        "problemStatement": "What happens when compiling: 'long val = 5000000000;' (5 billion)?",
        "options": [
          "Compiles and assigns 5 billion to val",
          "Compile-time error: integer number too large",
          "Wraps around to a negative number",
          "Runtime ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "The literal itself is evaluated as an int before assignment.",
        "solution": "Compile-time error: integer number too large",
        "explanation": "Integer literals default to 32-bit int. Because 5 billion exceeds Integer.MAX_VALUE (2.14 billion), javac throws 'integer number too large' unless suffixed with 'L'."
      },
      {
        "title": "Puzzle 2: Missing Float Suffix Error",
        "problemStatement": "What happens when compiling: 'float f = 1.5;'?",
        "options": [
          "Compiles and assigns 1.5f",
          "Compile-time error: possible lossy conversion from double to float",
          "f is initialized to 1",
          "f becomes double automatically"
        ],
        "correctOptionIndex": 1,
        "hint": "Floating-point literals default to double (64 bits).",
        "solution": "Compile-time error: possible lossy conversion from double to float",
        "explanation": "1.5 is a 64-bit double literal. Assigning it to a 32-bit float is a narrowing conversion rejected by javac without an explicit cast or 'f' suffix."
      },
      {
        "title": "Puzzle 3: The Only Unsigned Primitive",
        "problemStatement": "Which primitive type in Java is the ONLY unsigned numeric type?",
        "options": [
          "byte",
          "short",
          "char",
          "int"
        ],
        "correctOptionIndex": 2,
        "hint": "It represents 16-bit Unicode codepoints from 0 to 65535.",
        "solution": "char",
        "explanation": "char is a 16-bit unsigned integer type with a range of 0 to 65,535. All other numeric primitives in Java are signed."
      },
      {
        "title": "Puzzle 4: Boolean Comparison in Conditional",
        "problemStatement": "What is the compiler result of: 'int x = 1; if (x) { System.out.println(\"Yes\"); }'?",
        "options": [
          "Prints 'Yes'",
          "Compile-time error: incompatible types: int cannot be converted to boolean",
          "Prints nothing",
          "Prints 1"
        ],
        "correctOptionIndex": 1,
        "hint": "Java strictly separates booleans from numeric integers.",
        "solution": "Compile-time error: incompatible types: int cannot be converted to boolean",
        "explanation": "Unlike C/C++, Java does not allow integer expressions inside conditional statements; an explicit boolean expression is required."
      },
      {
        "title": "Puzzle 5: Byte Value Range Bounds",
        "problemStatement": "What happens when compiling: 'byte b = 128;'?",
        "options": [
          "b is assigned 128",
          "b overflows to -128",
          "Compile-time error: possible lossy conversion from int to byte",
          "b is assigned 0"
        ],
        "correctOptionIndex": 2,
        "hint": "A byte's maximum value is 127.",
        "solution": "Compile-time error: possible lossy conversion from int to byte",
        "explanation": "Because 128 exceeds Byte.MAX_VALUE (127), javac detects the compile-time overflow and flags a lossy conversion error."
      },
      {
        "title": "Puzzle 6: Char Representation in Quotes",
        "problemStatement": "What is the data type of 'A' vs \"A\" in Java?",
        "options": [
          "Both are String",
          "Both are char",
          "'A' is char (primitive), \"A\" is String (object)",
          "'A' is byte, \"A\" is char"
        ],
        "correctOptionIndex": 2,
        "hint": "Single quotes are for primitive chars; double quotes are for String objects.",
        "solution": "'A' is char (primitive), \"A\" is String (object)",
        "explanation": "Single quotes denote a 16-bit char primitive; double quotes denote a java.lang.String object instance."
      },
      {
        "title": "Puzzle 7: Underscores in Numeric Literals",
        "problemStatement": "Which of the following numeric literals with underscores is ILLEGAL in Java?",
        "options": [
          "int a = 1_000_000;",
          "int b = _100;",
          "double c = 3.14_15;",
          "long d = 999_888L;"
        ],
        "correctOptionIndex": 1,
        "hint": "Underscores cannot be placed at the very beginning or end of a number.",
        "solution": "int b = _100;",
        "explanation": "Underscores can only be placed between digits. Leading underscores (_100) are parsed as identifiers, causing a compile error if variable _100 is undefined."
      },
      {
        "title": "Puzzle 8: Size of Double Primitive",
        "problemStatement": "How many bytes does a double primitive occupy in Java?",
        "options": [
          "4 bytes (32 bits)",
          "8 bytes (64 bits)",
          "16 bytes (128 bits)",
          "Depends on the CPU"
        ],
        "correctOptionIndex": 1,
        "hint": "Double is 64-bit IEEE 754 precision.",
        "solution": "8 bytes (64 bits)",
        "explanation": "A double is defined by the JLS as strictly 64 bits (8 bytes) on every compliant JVM."
      },
      {
        "title": "Puzzle 9: Char Cast from Negative Number",
        "problemStatement": "What is printed by: 'char c = (char) -1; System.out.println((int) c);'?",
        "options": [
          "-1",
          "65535",
          "0",
          "Compile error"
        ],
        "correctOptionIndex": 1,
        "hint": "Casting -1 (11111111_11111111) to an unsigned 16-bit char yields all 1-bits.",
        "solution": "65535",
        "explanation": "In two's complement, -1 has all bits set to 1. When truncated to a 16-bit unsigned char, 16 one-bits represent 65,535."
      },
      {
        "title": "Puzzle 10: Float Division by Zero",
        "problemStatement": "What is the result of executing: 'System.out.println(1.0f / 0.0f);'?",
        "options": [
          "Throws ArithmeticException: / by zero",
          "Infinity",
          "NaN",
          "0.0"
        ],
        "correctOptionIndex": 1,
        "hint": "IEEE 754 floating-point standard does not throw exceptions on division by zero.",
        "solution": "Infinity",
        "explanation": "Under IEEE 754 rules, non-zero floating point division by zero yields Float.POSITIVE_INFINITY ('Infinity') without throwing an exception."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why is Java not considered a 100% pure Object-Oriented language?",
        "answer": "Java is not 100% pure OOP because it supports 8 primitive types (byte, short, int, long, float, double, char, boolean) that are not objects. Primitives do not extend java.lang.Object, do not have methods or fields, and are stored directly as binary values rather than heap-allocated instances with object headers."
      },
      {
        "question": "Why did Java retain primitive types instead of making everything an object like Smalltalk or Ruby?",
        "answer": "Performance and memory footprint. An 'int' primitive occupies exactly 4 bytes of contiguous memory with zero allocation overhead. In contrast, an 'Integer' object requires 16 bytes of memory on a 64-bit JVM (12-byte object header + 4-byte int payload) plus a 4- or 8-byte reference pointer, causing 4x to 6x memory inflation and cache misses in mathematical computation."
      },
      {
        "question": "What is the difference between float and double in Java?",
        "answer": "Float is 32-bit single-precision IEEE 754 with 1 sign bit, 8 exponent bits, 23 mantissa bits (~6-7 decimal digits of precision), requiring an 'f' suffix. Double is 64-bit double-precision IEEE 754 with 1 sign bit, 11 exponent bits, 52 mantissa bits (~15-17 decimal digits of precision), and is the default for floating-point literals."
      },
      {
        "question": "Why is 'char' 16 bits in Java instead of 8 bits like in C?",
        "answer": "In C, 'char' was designed for 8-bit ASCII (256 characters), which is insufficient for global alphabets. Java was designed from the beginning for worldwide internationalization, adopting the 16-bit Unicode Standard (UTF-16) to represent over 65,000 international characters natively."
      },
      {
        "question": "What is two's complement and why is it used for signed integers in Java?",
        "answer": "Two's complement is a binary representation for signed numbers where the most significant bit (MSB) is the sign bit. A negative number is formed by inverting all bits and adding 1. Its advantages: 1) There is only one representation for zero (unlike ones' complement which has +0 and -0). 2) Addition and subtraction hardware circuits are identical, simplifying CPU design."
      },
      {
        "question": "What is the difference between Integer.MIN_VALUE in integer division vs floating point division by zero?",
        "answer": "Integer division by zero (e.g. 10 / 0) throws an unchecked ArithmeticException: / by zero. Floating-point division by zero (e.g. 10.0 / 0.0) conforms to IEEE 754 and does NOT throw an exception; it evaluates to Double.POSITIVE_INFINITY (or Double.NEGATIVE_INFINITY), and 0.0 / 0.0 evaluates to Double.NaN."
      },
      {
        "question": "Can you store the value 0.1 exactly in a double or float primitive in Java? Why or why not?",
        "answer": "No. In binary (base 2), 0.1 produces an infinite repeating fraction (0.0001100110011...), just as 1/3 produces 0.3333... in base 10. Because IEEE 754 has a finite 53-bit mantissa, the value must be rounded, leading to small approximation errors (0.100000000000000005551115123126...). Exact base-10 decimals require BigDecimal."
      },
      {
        "question": "What are the rules for placing underscores in numeric literals?",
        "answer": "Underscores can be placed between digits to improve readability (e.g. 1_000_000). They CANNOT be placed: 1) At the start or end of a number (_100 or 100_), 2) Adjacent to a decimal point (3._14 or 3_.14), 3) Prior to an 'L' or 'F' suffix (100_L), 4) In positions where an identifier is expected."
      },
      {
        "question": "How much memory does a 'boolean' variable take in Java?",
        "answer": "The Java Language Specification does not define a precise size for boolean. However, the JVM Specification states that: 1) In local variable arrays on the stack, a boolean is compiled and packed into a 32-bit int slot. 2) In heap-allocated boolean arrays (boolean[]), each boolean occupies 1 byte (8 bits) packed by the JVM."
      },
      {
        "question": "What is the difference between character literals '\\n', '\\r', and '\\t'?",
        "answer": "- '\\n': Line Feed (LF, ASCII 10), moves cursor down one line.\n- '\\r': Carriage Return (CR, ASCII 13), moves cursor to beginning of line.\n- '\\t': Horizontal Tab (HT, ASCII 9), advances cursor to next tab stop."
      }
    ],
    "miniQuiz": [
      {
        "id": "fund_2_2_q1",
        "question": "How many primitive data types exist in Java?",
        "options": [
          "6",
          "7",
          "8",
          "10"
        ],
        "correctIndex": 2,
        "explanation": "Java defines exactly 8 primitive data types: byte, short, int, long, float, double, char, boolean."
      },
      {
        "id": "fund_2_2_q2",
        "question": "What is the bit-width and range of a Java 'byte'?",
        "options": [
          "8 bits, 0 to 255",
          "8 bits, -128 to 127",
          "16 bits, -32768 to 32767",
          "8 bits, -127 to 128"
        ],
        "correctIndex": 1,
        "explanation": "A byte is an 8-bit signed two's complement integer ranging from -128 to 127."
      },
      {
        "id": "fund_2_2_q3",
        "question": "What is the default data type for integer literals like 500 in Java?",
        "options": [
          "short",
          "int",
          "long",
          "byte"
        ],
        "correctIndex": 1,
        "explanation": "All non-decimal integer literals without suffixes default to type int."
      },
      {
        "id": "fund_2_2_q4",
        "question": "What suffix must be added to a literal to designate it as a 64-bit long?",
        "options": [
          "'l' or 'L'",
          "'d' or 'D'",
          "'f' or 'F'",
          "'i' or 'I'"
        ],
        "correctIndex": 0,
        "explanation": "'L' (or 'l') designates a long literal; uppercase 'L' is standard convention."
      },
      {
        "id": "fund_2_2_q5",
        "question": "What is the default data type for floating point literals like 3.14 in Java?",
        "options": [
          "float",
          "double",
          "BigDecimal",
          "real"
        ],
        "correctIndex": 1,
        "explanation": "All floating-point literals default to 64-bit double."
      },
      {
        "id": "fund_2_2_q6",
        "question": "What is the size of a 'char' primitive in Java?",
        "options": [
          "8 bits (1 byte)",
          "16 bits (2 bytes)",
          "32 bits (4 bytes)",
          "64 bits (8 bytes)"
        ],
        "correctIndex": 1,
        "explanation": "char is a 16-bit unsigned Unicode character (0 to 65,535)."
      },
      {
        "id": "fund_2_2_q7",
        "question": "What happens when you evaluate: 'double d = 10.0 / 0.0;'?",
        "options": [
          "Throws ArithmeticException",
          "Evaluates to Double.POSITIVE_INFINITY",
          "Evaluates to Double.NaN",
          "Throws NullPointerException"
        ],
        "correctIndex": 1,
        "explanation": "Under IEEE 754, floating-point division by zero yields POSITIVE_INFINITY without throwing an exception."
      },
      {
        "id": "fund_2_2_q8",
        "question": "What is the value of: '0.0 / 0.0' in Java?",
        "options": [
          "0.0",
          "Double.NaN (Not a Number)",
          "Double.POSITIVE_INFINITY",
          "Throws ArithmeticException"
        ],
        "correctIndex": 1,
        "explanation": "Zero divided by zero in floating point arithmetic yields NaN (Not a Number)."
      },
      {
        "id": "fund_2_2_q9",
        "question": "Can a boolean primitive be converted to an integer in Java using casting (e.g. (int) true)?",
        "options": [
          "Yes, converts to 1",
          "No, boolean is incompatible with numeric types and cannot be cast",
          "Yes, in Java 17+",
          "Only via reflection"
        ],
        "correctIndex": 1,
        "explanation": "Java strictly separates boolean from numeric types; casting boolean to int is a compile-time error."
      },
      {
        "id": "fund_2_2_q10",
        "question": "Which of the following is a legal numeric literal with underscores?",
        "options": [
          "int x = _500;",
          "int x = 500_;",
          "int x = 5_00;",
          "double x = 3._14;"
        ],
        "correctIndex": 2,
        "explanation": "Underscores can only be placed between digits; '5_00' is legal."
      },
      {
        "id": "fund_2_2_q11",
        "question": "What is the range of a Java 'short' primitive?",
        "options": [
          "-128 to 127",
          "-32,768 to 32,767",
          "-2,147,483,648 to 2,147,483,647",
          "0 to 65,535"
        ],
        "correctIndex": 1,
        "explanation": "A short is a 16-bit signed two's complement integer from -32,768 to 32,767."
      },
      {
        "id": "fund_2_2_q12",
        "question": "Why does 'float f = 0.5;' fail to compile?",
        "options": [
          "0.5 is a double literal and cannot be assigned to float without an 'f' suffix or cast",
          "Floats only accept whole numbers",
          "f is a reserved keyword",
          "Floats require at least 2 decimal places"
        ],
        "correctIndex": 0,
        "explanation": "0.5 defaults to 64-bit double, requiring an explicit cast or '0.5f' suffix to convert to 32-bit float."
      },
      {
        "id": "fund_2_2_q13",
        "question": "What is the value of 'Character.MIN_VALUE' when cast to int?",
        "options": [
          "-32768",
          "0",
          "-128",
          "32"
        ],
        "correctIndex": 1,
        "explanation": "Character.MIN_VALUE is '\\u0000', which represents integer 0."
      },
      {
        "id": "fund_2_2_q14",
        "question": "How many significant decimal digits of precision does a double primitive provide?",
        "options": [
          "~3-4 digits",
          "~6-7 digits",
          "~15-17 digits",
          "Unlimited digits"
        ],
        "correctIndex": 2,
        "explanation": "IEEE 754 64-bit double precision provides approximately 15 to 17 significant decimal digits."
      },
      {
        "id": "fund_2_2_q15",
        "question": "What is the memory size of a 'long' primitive?",
        "options": [
          "32 bits (4 bytes)",
          "64 bits (8 bytes)",
          "128 bits (16 bytes)",
          "Depends on the OS register size"
        ],
        "correctIndex": 1,
        "explanation": "A long is strictly 64 bits (8 bytes) on every compliant Java platform."
      }
    ]
  },
  "type-casting-and-overflow": {
    "id": "type-casting-and-overflow",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.3",
    "title": "Type Casting & Numeric Overflow",
    "subtitle": "Widening vs narrowing conversions, bit truncation, circular overflow wrapping, and safe math with Math.exact methods",
    "estimatedMinutes": 14,
    "beginnerAnalogy": "Type Casting is the explicit or implicit conversion of a value from one data type to another. In Java, casting is governed by two fundamental categories: **Widening Primitive Conversion** (implicit) and **Narrowing Primitive Conversion** (explicit).\n\nWidening occurs when converting from a smaller bit-width type to a larger bit-width type (e.g., int to long, or float to double). Because the destination type has equal or greater storage capacity, widening is safe, causes zero loss of magnitude, and is performed automatically by the compiler without explicit syntax. Conversely, Narrowing occurs when converting from a larger type to a smaller type (e.g., long to int, or int to byte). Because the destination type lacks the bit-width to store the original value, narrowing requires an explicit cast operator '(targetType)' and forcibly truncates high-order bits.\n\nWhen high-order bits are discarded during narrowing, or when arithmetic exceeds the maximum capacity of a type, Java does not crash or throw an exception. Instead, it silently wraps around using modular two's complement arithmetic, causing positive values to suddenly become negative and corrupting business calculations if unmonitored.",
    "coreExplanation": [
      "Widening Conversion (Implicit): byte -> short -> int -> long -> float -> double. Also char -> int. No cast operator needed; zero loss of magnitude (though int to float may lose least-significant precision bits).",
      "Narrowing Conversion (Explicit): double -> float -> long -> int -> short -> byte. Also int -> char. Requires explicit cast syntax: '(byte) myInt'.",
      "Bit Truncation Mechanics: When casting int (32 bits) to byte (8 bits), the CPU simply discards the upper 24 bits and interprets the remaining 8 bits in signed two's complement.",
      "Circular Overflow Wrapping: In signed two's complement, Integer.MAX_VALUE + 1 wraps circularly to Integer.MIN_VALUE (-2147483648). Similarly, Byte.MAX_VALUE (127) + 1 becomes -128.",
      "Floating-to-Integer Truncation: Casting float/double to int/long truncates towards zero (discards the fractional decimal part entirely; 3.99 becomes 3, -3.99 becomes -3).",
      "Safe Math with Math.exact: Java 8 introduced Math.addExact(), Math.subtractExact(), Math.multiplyExact(), and Math.toIntExact(), which detect overflow and throw ArithmeticException."
    ],
    "diagram": "================ TYPE CASTING HIERARCHY & TRUNCATION ================\n\n  [Widening (Automatic / Safe)]:\n  byte (8b) ──> short (16b) ──> int (32b) ──> long (64b) ──> float (32b) ──> double (64b)\n                 char (16b) ──┘\n\n  [Narrowing (Explicit / Requires Cast / Discards Bits)]:\n  double ──> float ──> long ──> int ──> short ──> byte\n\n  Bit Truncation Example: (int 300 to byte):\n  int 300:  00000000 00000000 00000001 00101100  (32 bits)\n  Discard upper 24 bits:               [00101100] (8 bits)\n  Resulting byte: 44! (300 % 256 = 44)\n\n  Overflow Example: (byte 127 + 1):\n  127:      01111111\n  + 1:      10000000  --> High bit 1 indicates negative in two's complement!\n  Result:   -128",
    "codeSnippet": {
      "title": "Bit Truncation and Safe Arithmetic Demonstration",
      "code": "public class CastingOverflowDemo {\n    public static void main(String[] args) {\n        // 1. Explicit narrowing with bit truncation\n        int original = 300;\n        byte truncated = (byte) original;\n        System.out.println(\"300 cast to byte: \" + truncated); // 44\n\n        // 2. Floating-point decimal truncation\n        double price = 99.95;\n        int intPrice = (int) price;\n        System.out.println(\"99.95 cast to int: \" + intPrice); // 99 (truncated, not rounded)\n\n        // 3. Safe math preventing silent overflow\n        try {\n            int safeSum = Math.addExact(Integer.MAX_VALUE, 1);\n            System.out.println(\"Safe sum: \" + safeSum);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught overflow safely: \" + e.getMessage());\n        }\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "(byte) original",
          "explanation": "Explicit cast discarding upper 24 bits of integer 300, leaving 44."
        },
        {
          "line": "(int) price",
          "explanation": "Truncates fractional decimal part towards zero (99.95 becomes 99)."
        },
        {
          "line": "Math.addExact(...)",
          "explanation": "Checks for integer overflow and throws ArithmeticException if exceeded."
        }
      ],
      "output": "300 cast to byte: 44\n99.95 cast to int: 99\nCaught overflow safely: integer overflow"
    },
    "codeExamples": [
      {
        "title": "Integer Overflow in Financial Calculation Trap",
        "description": "Demonstrating how multiplying large numbers as ints overflows before storing in long.",
        "code": "public class FinancialOverflowTrap {\n    public static void main(String[] args) {\n        // BUG: Operands 1_000_000 and 3_000 are ints! Multiplication overflows 32 bits before widening!\n        long badTotal = 1_000_000 * 3_000;\n        System.out.println(\"Bad total (overflowed): \" + badTotal);\n\n        // FIX: Ensure at least one operand is long literal\n        long goodTotal = 1_000_000L * 3_000;\n        System.out.println(\"Good total (correct)   : \" + goodTotal);\n    }\n}",
        "output": "Bad total (overflowed): -1294967296\nGood total (correct)   : 3000000000"
      },
      {
        "title": "Safe Narrowing with Math.toIntExact",
        "description": "Preventing silent data corruption when converting long IDs to int.",
        "code": "public class SafeNarrowing {\n    public static void main(String[] args) {\n        long safeId = 5000L;\n        long hugeId = 5_000_000_000L;\n\n        System.out.println(\"Safe converted: \" + Math.toIntExact(safeId));\n        try {\n            int failed = Math.toIntExact(hugeId);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught overflow on hugeId conversion\");\n        }\n    }\n}",
        "output": "Safe converted: 5000\nCaught overflow on hugeId conversion"
      }
    ],
    "cheatSheet": {
      "summary": "Widening is automatic and safe. Narrowing requires explicit (type) and discards high-order bits. Overflows wrap circularly in two's complement; use Math.exact methods for mission-critical calculations.",
      "rules": [
        {
          "rule": "Widening Order",
          "explanation": "byte -> short -> int -> long -> float -> double (automatic, no cast)."
        },
        {
          "rule": "Truncation Rule",
          "explanation": "Casting float/double to int/long truncates towards zero (discards decimals)."
        },
        {
          "rule": "Integer Promotion",
          "explanation": "Binary operations on byte and short promote operands to int automatically (byte + byte = int)."
        },
        {
          "rule": "Math.exact Standard",
          "explanation": "Use Math.addExact, Math.multiplyExact, Math.toIntExact to guard financial calculations."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Feature",
          "optionA": "Widening (Implicit)",
          "optionB": "Narrowing (Explicit)"
        },
        {
          "aspect": "Direction",
          "optionA": "Smaller type to larger type (e.g. int -> long)",
          "optionB": "Larger type to smaller type (e.g. long -> int)"
        },
        {
          "aspect": "Syntax",
          "optionA": "long l = myInt; (Automatic)",
          "optionB": "int i = (int) myLong; (Explicit cast operator)"
        },
        {
          "aspect": "Data Loss Risk",
          "optionA": "Safe (No magnitude loss; possible precision loss int->float)",
          "optionB": "High risk (Bit truncation and magnitude change)"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Writing 'byte b1 = 5; byte b2 = 10; byte b3 = b1 + b2;'",
        "whyItHappens": "Not knowing that Java automatically promotes byte and short operands to int during arithmetic.",
        "howToFix": "Cast the result back: 'byte b3 = (byte)(b1 + b2);'."
      },
      {
        "mistake": "Expecting (int) 3.99 to round to 4",
        "whyItHappens": "Confusing casting with mathematical rounding.",
        "howToFix": "Casting truncates towards zero (yielding 3); use Math.round(3.99) for rounding."
      },
      {
        "mistake": "Multiplying two ints into a long without a long literal (long x = a * b)",
        "whyItHappens": "Assuming the assignment target dictates the multiplication precision.",
        "howToFix": "Cast an operand: 'long x = (long) a * b;'."
      }
    ],
    "practiceProblems": [
      {
        "title": "Puzzle 1: Truncation from int to byte",
        "problemStatement": "What is the output of: 'int a = 130; byte b = (byte) a; System.out.println(b);'?",
        "options": [
          "130",
          "-126",
          "127",
          "Throws ArithmeticException"
        ],
        "correctOptionIndex": 1,
        "hint": "130 in binary is 00000000_00000000_00000000_10000010. The lower 8 bits represent -126 in two's complement.",
        "solution": "-126",
        "explanation": "130 exceeds Byte.MAX_VALUE (127). The bit pattern 10000010 has sign bit 1, representing -128 + 2 = -126."
      },
      {
        "title": "Puzzle 2: Byte Arithmetic Promotion Error",
        "problemStatement": "What happens when compiling: 'byte x = 10; byte y = 20; byte z = x + y;'?",
        "options": [
          "Compiles and prints 30",
          "Compile-time error: possible lossy conversion from int to byte",
          "Throws ClassCastException",
          "z is promoted to int"
        ],
        "correctOptionIndex": 1,
        "hint": "Java promotes byte operands to int before executing the + operator.",
        "solution": "Compile-time error: possible lossy conversion from int to byte",
        "explanation": "Binary arithmetic on bytes promotes both operands to 32-bit int, yielding an int result that cannot be assigned to byte without an explicit cast."
      },
      {
        "title": "Puzzle 3: Floating to Integer Truncation",
        "problemStatement": "What is printed by: 'double d = -4.9; System.out.println((int) d);'?",
        "options": [
          "-5",
          "-4",
          "4",
          "5"
        ],
        "correctOptionIndex": 1,
        "hint": "Casting float/double to int truncates towards zero.",
        "solution": "-4",
        "explanation": "Casting to an integer discards the fractional part towards zero; -4.9 truncates to -4."
      },
      {
        "title": "Puzzle 4: Circular Integer Overflow",
        "problemStatement": "What is printed by: 'int max = Integer.MAX_VALUE; System.out.println(max + 1);'?",
        "options": [
          "2147483648",
          "-2147483648",
          "Throws OverflowException",
          "0"
        ],
        "correctOptionIndex": 1,
        "hint": "Adding 1 to the largest positive 32-bit int wraps to the smallest negative int.",
        "solution": "-2147483648",
        "explanation": "In 32-bit two's complement, 01111111_11111111_11111111_11111111 + 1 becomes 10000000_00000000_00000000_00000000, which is Integer.MIN_VALUE."
      },
      {
        "title": "Puzzle 5: Safe Overflow Detection with Math.multiplyExact",
        "problemStatement": "What happens when executing: 'Math.multiplyExact(2_000_000_000, 2);'?",
        "options": [
          "Returns 4,000,000,000 as long",
          "Throws java.lang.ArithmeticException: integer overflow",
          "Wraps around to a negative number",
          "Returns 0"
        ],
        "correctOptionIndex": 1,
        "hint": "Math.multiplyExact checks for overflow and throws an exception.",
        "solution": "Throws java.lang.ArithmeticException: integer overflow",
        "explanation": "Because 4 billion exceeds Integer.MAX_VALUE, Math.multiplyExact detects the overflow and throws ArithmeticException."
      },
      {
        "title": "Puzzle 6: Widening Conversion Safety",
        "problemStatement": "Which of the following type conversions requires an EXPLICIT cast operator in Java?",
        "options": [
          "int to long",
          "short to int",
          "long to float",
          "int to short"
        ],
        "correctOptionIndex": 3,
        "hint": "Converting from 32-bit int to 16-bit short is a narrowing conversion.",
        "solution": "int to short",
        "explanation": "int to short is narrowing (32 bits to 16 bits) and requires an explicit cast '(short)'."
      },
      {
        "title": "Puzzle 7: Char to Int Conversion",
        "problemStatement": "What does: 'int code = 'A';' do?",
        "options": [
          "Compile-time error",
          "Implicit widening conversion: assigns 65 to code",
          "Throws ClassCastException",
          "Requires (int) 'A'"
        ],
        "correctOptionIndex": 1,
        "hint": "char to int is an automatic widening conversion.",
        "solution": "Implicit widening conversion: assigns 65 to code",
        "explanation": "Converting 16-bit unsigned char to 32-bit signed int is a widening conversion performed automatically by javac."
      },
      {
        "title": "Puzzle 8: Compound Assignment Implicit Cast",
        "problemStatement": "What happens when executing: 'short s = 10; s += 5;'?",
        "options": [
          "Compile error: lossy conversion",
          "Compiles fine: compound assignment automatically injects an explicit cast to short",
          "s is promoted to int permanently",
          "Runtime ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "E1 op= E2 is syntactically equivalent to E1 = (T)(E1 op E2).",
        "solution": "Compiles fine: compound assignment automatically injects an explicit cast to short",
        "explanation": "Java Language Specification Section 15.26.2 specifies that compound assignments automatically inject a cast to the left-hand type: s = (short)(s + 5)."
      },
      {
        "title": "Puzzle 9: Long to Int Truncation",
        "problemStatement": "What is the output of: 'long l = 0x100000000L; int i = (int) l; System.out.println(i);'?",
        "options": [
          "0",
          "1",
          "4294967296",
          "-1"
        ],
        "correctOptionIndex": 0,
        "hint": "0x100000000L has bit 32 set to 1 and lower 32 bits all set to 0.",
        "solution": "0",
        "explanation": "Casting long to int discards the upper 32 bits. The lower 32 bits are all 0, so the result is 0."
      },
      {
        "title": "Puzzle 10: Math.toIntExact with Long",
        "problemStatement": "What does 'Math.toIntExact(100L)' return?",
        "options": [
          "100 as an int",
          "100 as a long",
          "Throws ArithmeticException",
          "0"
        ],
        "correctOptionIndex": 0,
        "hint": "100 fits comfortably in a 32-bit int.",
        "solution": "100 as an int",
        "explanation": "Math.toIntExact safely converts long to int if the value is within int boundaries, returning 100 as an int."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the difference between Widening Primitive Conversion and Narrowing Primitive Conversion?",
        "answer": "Widening conversion converts a smaller data type to a larger data type (e.g. int to long, or float to double). It is performed automatically by the compiler (implicit) because no magnitude is lost. Narrowing conversion converts a larger data type to a smaller data type (e.g. long to int, or double to int). It requires an explicit cast operator '(type)' because high-order bits or decimal precision are discarded, creating potential data loss."
      },
      {
        "question": "What happens at the bit level when an 'int' is cast to a 'byte'?",
        "answer": "An int is 32 bits and a byte is 8 bits. When casting '(byte) myInt', the JVM discards the upper 24 bits completely and preserves only the lowest 8 bits. The remaining 8 bits are interpreted in signed two's complement, meaning if the 8th bit is 1, the result is negative. For example, int 300 (binary 000100101100) truncates to 00101100, which is 44."
      },
      {
        "question": "Why does 'byte a = 1; byte b = 2; byte c = a + b;' fail to compile in Java?",
        "answer": "According to the Java Language Specification (JLS 5.6.2 Binary Numeric Promotion), all arithmetic operations (+, -, *, /) on byte, short, or char operands automatically promote both operands to 32-bit 'int' before the operation executes. The result of 'a + b' is an int. Assigning an int to a byte is a narrowing conversion that requires an explicit cast: 'byte c = (byte)(a + b);'."
      },
      {
        "question": "How does compound assignment (e.g. s += 5) handle type casting differently from simple assignment?",
        "answer": "Compound assignment operators (+=, -=, *=, etc.) automatically insert a hidden cast to the type of the left-hand operand. 's += 5' is compiled as 's = (short)(s + 5)'. This convenience can create subtle bugs: if 'short s = 32767; s += 1;', the value silently overflows to -32768 without any compile error or warning."
      },
      {
        "question": "How do Java 8's Math.exact methods prevent silent numeric overflow?",
        "answer": "Standard arithmetic operators (+, *, -) wrap around silently upon overflow in two's complement. Java 8 introduced Math.addExact(), Math.subtractExact(), Math.multiplyExact(), Math.incrementExact(), and Math.toIntExact(). These methods perform the calculation and verify whether the result exceeds the primitive's boundaries. If an overflow occurs, they throw an unchecked ArithmeticException: integer overflow."
      },
      {
        "question": "Can widening conversion from 'int' to 'float' or 'long' to 'double' cause data loss?",
        "answer": "Yes! While widening never loses magnitude, it CAN lose precision. A 32-bit int has 31 bits of magnitude, but a 32-bit float only has 24 bits of mantissa (precision). Similarly, a 64-bit long has 63 bits of magnitude, but a 64-bit double only has 53 bits of mantissa. Converting a large int (e.g. 123456789) to float rounds the least significant bits, producing slight precision loss."
      },
      {
        "question": "What is the result of casting a floating-point number (double/float) to an integer (int/long)?",
        "answer": "It truncates the fractional part towards zero (discarding everything after the decimal point). For example, (int) 9.99 becomes 9, and (int) -9.99 becomes -9. If the floating-point value is greater than Integer.MAX_VALUE, it clamps to Integer.MAX_VALUE; if smaller than Integer.MIN_VALUE, it clamps to Integer.MIN_VALUE; NaN becomes 0."
      },
      {
        "question": "What is the common 'overflow before widening' bug in Java?",
        "answer": "It occurs when calculating large values intended for a long variable using int operands: 'long micros = 24 * 60 * 60 * 1000 * 1000;'. Because all operands are int literals, the multiplication is performed as 32-bit int arithmetic, which overflows and yields a corrupted negative int before being widened to long. Fix: make the first literal long: '24L * ...'."
      },
      {
        "question": "What is the difference between type casting and parsing (e.g. (int) str vs Integer.parseInt(str))?",
        "answer": "Casting '(int) x' only works between compatible primitive numeric types or within an object inheritance hierarchy. You cannot cast a String to an int ('(int) \"123\"' is a compile-time error). To convert a String to an integer, you must parse it algorithmically using Integer.parseInt(str) or Integer.valueOf(str)."
      },
      {
        "question": "How can you check if an arithmetic multiplication would overflow before performing it?",
        "answer": "Either: 1) Use 'Math.multiplyExact(a, b)' and catch ArithmeticException. 2) Cast to long before multiplying: 'long result = (long) a * b;' and check if 'result > Integer.MAX_VALUE || result < Integer.MIN_VALUE'. 3) In Java 9+, use BigInteger if numbers can grow arbitrarily large."
      }
    ],
    "miniQuiz": [
      {
        "id": "fund_2_3_q1",
        "question": "What type of conversion occurs when converting an 'int' to a 'long'?",
        "options": [
          "Narrowing conversion (explicit)",
          "Widening conversion (implicit/automatic)",
          "Parsing conversion",
          "Boxing conversion"
        ],
        "correctIndex": 1,
        "explanation": "int to long is a widening conversion performed automatically by the compiler without an explicit cast."
      },
      {
        "id": "fund_2_3_q2",
        "question": "What happens when casting a 32-bit int to an 8-bit byte?",
        "options": [
          "The value is divided by 4",
          "The upper 24 bits are discarded, leaving the lowest 8 bits",
          "An ArithmeticException is thrown",
          "The JVM rounds to the nearest byte"
        ],
        "correctIndex": 1,
        "explanation": "Narrowing to byte discards the upper 24 bits and interprets the lowest 8 bits in signed two's complement."
      },
      {
        "id": "fund_2_3_q3",
        "question": "What is the result of: '(int) 7.89'?",
        "options": [
          "8",
          "7",
          "0",
          "Compile error"
        ],
        "correctIndex": 1,
        "explanation": "Casting floating point numbers to integers truncates the decimal part towards zero (yielding 7)."
      },
      {
        "id": "fund_2_3_q4",
        "question": "Why does 'byte c = a + b;' fail to compile when a and b are bytes?",
        "options": [
          "Bytes cannot be added",
          "Java promotes byte operands to int during arithmetic, producing an int result",
          "The + operator is reserved for strings",
          "Variables must be final"
        ],
        "correctIndex": 1,
        "explanation": "Binary numeric promotion elevates byte operands to 32-bit int before addition."
      },
      {
        "id": "fund_2_3_q5",
        "question": "What is printed by: 'byte b = (byte) 130;'?",
        "options": [
          "130",
          "-126",
          "127",
          "-128"
        ],
        "correctIndex": 1,
        "explanation": "130 has bit pattern 10000010 in 8-bit two's complement, which evaluates to -126."
      },
      {
        "id": "fund_2_3_q6",
        "question": "What does 'Math.addExact(Integer.MAX_VALUE, 1)' do?",
        "options": [
          "Wraps around to -2147483648",
          "Throws ArithmeticException: integer overflow",
          "Returns a long value",
          "Returns 0"
        ],
        "correctIndex": 1,
        "explanation": "Math.addExact detects integer overflow and throws ArithmeticException."
      },
      {
        "id": "fund_2_3_q7",
        "question": "What is the result of: 'short s = 5; s += 10;'?",
        "options": [
          "Compile error: lossy conversion",
          "Compiles successfully because compound assignment automatically injects (short)",
          "s becomes int",
          "Throws ClassCastException"
        ],
        "correctIndex": 1,
        "explanation": "Compound assignment operators (+=, -=) automatically cast the result back to the left-hand type."
      },
      {
        "id": "fund_2_3_q8",
        "question": "Can widening conversion from 'long' to 'double' cause loss of precision?",
        "options": [
          "No, double is always 100% exact",
          "Yes, because double has 53 bits of mantissa while long has 63 bits of magnitude",
          "Only for negative numbers",
          "Only in 32-bit JVMs"
        ],
        "correctIndex": 1,
        "explanation": "A long has 63 bits of magnitude, but double only has 53 bits of mantissa, causing rounding on very large longs."
      },
      {
        "id": "fund_2_3_q9",
        "question": "What is printed by: 'long val = 1000 * 1000 * 1000 * 3;'?",
        "options": [
          "3000000000",
          "A negative integer wrapped in long due to 32-bit int overflow before assignment",
          "Throws ArithmeticException",
          "0"
        ],
        "correctIndex": 1,
        "explanation": "The operands are all int literals; multiplication overflows 32 bits before the result is assigned to the long."
      },
      {
        "id": "fund_2_3_q10",
        "question": "What method safely converts a 'long' to an 'int', throwing an exception if it exceeds 32 bits?",
        "options": [
          "Integer.parseInt()",
          "Math.toIntExact()",
          "Long.intValue()",
          "Runtime.castInt()"
        ],
        "correctIndex": 1,
        "explanation": "Math.toIntExact(long) checks bounds and throws ArithmeticException on overflow."
      },
      {
        "id": "fund_2_3_q11",
        "question": "What is printed by: 'char ch = (char) 65;'?",
        "options": [
          "'A'",
          "65",
          "Compile error",
          "null"
        ],
        "correctIndex": 0,
        "explanation": "Unicode codepoint 65 represents the uppercase letter 'A'."
      },
      {
        "id": "fund_2_3_q12",
        "question": "What is the result of: '(int) -8.99'?",
        "options": [
          "-9",
          "-8",
          "8",
          "-0"
        ],
        "correctIndex": 1,
        "explanation": "Casting to int truncates towards zero; -8.99 becomes -8."
      },
      {
        "id": "fund_2_3_q13",
        "question": "Which of the following conversions is NOT automatic (requires explicit cast)?",
        "options": [
          "byte to int",
          "short to double",
          "int to float",
          "float to long"
        ],
        "correctIndex": 3,
        "explanation": "float to long is a narrowing conversion (discards decimals) and requires an explicit cast."
      },
      {
        "id": "fund_2_3_q14",
        "question": "What happens if a double value greater than Integer.MAX_VALUE is cast to int (e.g. (int) 1e12)?",
        "options": [
          "Wraps around to negative",
          "Clamps to Integer.MAX_VALUE (2147483647)",
          "Throws ArithmeticException",
          "Returns 0"
        ],
        "correctIndex": 1,
        "explanation": "Under JLS rules, casting out-of-range floats/doubles to int clamps to Integer.MAX_VALUE (or MIN_VALUE)."
      },
      {
        "id": "fund_2_3_q15",
        "question": "What does the expression '(byte) 256' evaluate to?",
        "options": [
          "256",
          "1",
          "0",
          "-128"
        ],
        "correctIndex": 2,
        "explanation": "256 in binary is 1_00000000. Truncating to the lowest 8 bits leaves 00000000, which evaluates to 0."
      }
    ]
  },
  "wrapper-classes": {
    "id": "wrapper-classes",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.4",
    "title": "Wrapper Classes",
    "subtitle": "Object encapsulation of primitives, type utility methods, parsing vs valueOf, immutability, and heap overhead",
    "estimatedMinutes": 12,
    "beginnerAnalogy": "In the Java type system, primitive types (such as int, double, boolean) are raw binary value types designed for raw CPU register performance and compact stack storage. However, core JVM enterprise frameworks, collections, reflection APIs, and generics operate strictly on java.lang.Object references.\n\nA Wrapper Class provides an immutable reference type container that encapsulates a single primitive value inside a full heap object. Subclasses of java.lang.Number (Byte, Short, Integer, Long, Float, Double) along with Character and Boolean wrap each respective primitive. In JVM heap memory layout, an instance of java.lang.Integer consumes 16 bytes (12-byte object header + 4-byte primitive payload) on 64-bit architectures with compressed OOPs, contrasted against a bare 4-byte primitive.\n\nArchitecturally, wrapper classes bridge primitive computational speed with Java's object-oriented type polymorphism. They provide essential type utilities: radix string parsing, bit manipulation, min/max sentinel constants, and null-state representation in database ORMs and JSON serialization.",
    "coreExplanation": [
      "The Eight Wrapper Classes: Byte, Short, Integer, Long, Float, Double, Character, Boolean. The numeric wrappers extend the abstract class java.lang.Number, which implements java.io.Serializable.",
      "Total Immutability: Every wrapper class is declared 'public final class' and stores its primitive value in a 'private final' field. Once instantiated, the encapsulated value can never be mutated.",
      "Generics and Collections Integration: Java Generics use type erasure and compile down to Object references. Consequently, primitives cannot be generic type arguments: List<int> is a compile-time syntax error, requiring List<Integer>.",
      "Parsing vs Factory Construction: parseInt(s) parses a String and directly returns a primitive 'int'. valueOf(s) parses a String and returns a cached or newly instantiated 'Integer' object reference.",
      "Nullability for Business Domains: Primitives always carry default values (0, false) and cannot represent an unselected, absent, or missing value. Wrapper classes can hold 'null', representing unset database columns or optional JSON fields.",
      "Heap Memory Overhead: While a primitive int array int[1_000_000] consumes ~4 MB of contiguous heap memory, an Integer[1_000_000] array consumes ~24 MB (~4 MB pointer array + 16-24 bytes per Integer object reference)."
    ],
    "diagram": "================ WRAPPER CLASS TYPE HIERARCHY & HEAP LAYOUT ================\n\n                       +----------------------+\n                       |   java.lang.Object   |\n                       +----------------------+\n                                  ^  \n            +---------------------+---------------------+\n            |                                           |\n  +--------------------+                     +--------------------+\n  |  java.lang.Number  |                     | Boolean, Character |\n  +--------------------+                     +--------------------+\n     ^       ^      ^\n     |       |      +--------+--------+\n     |       |               |        |\n  +------+ +-------+     +-------+ +--------+\n  | Byte | | Short | ... | Float | | Double |\n  +------+ +-------+     +-------+ +--------+\n\n  HEAP MEMORY LAYOUT OF java.lang.Integer (64-bit JVM, Compressed OOPs):\n  [ Mark Word (8B) ][ Klass Word (4B) ][ int value (4B) ] = 16 BYTES TOTAL\n  Contrast with bare primitive: [ int value (4B) ] = 4 BYTES ON STACK\n=============================================================================",
    "codeSnippet": {
      "title": "Wrapper Creation, Parsing, and Type Utilities",
      "code": "public class WrapperBasics {\n    public static void main(String[] args) {\n        // 1. Primitive to Wrapper via valueOf (preferred factory)\n        Integer box1 = Integer.valueOf(42);\n        \n        // 2. Parsing primitives vs returning wrapper objects\n        int primitiveInt = Integer.parseInt(\"1024\");\n        Integer objectInt = Integer.valueOf(\"1024\");\n        \n        // 3. Radix / Base Conversion\n        int hexVal = Integer.parseInt(\"FF\", 16);\n        String binaryStr = Integer.toBinaryString(42);\n        \n        // 4. Utility constants\n        System.out.println(\"Max Int: \" + Integer.MAX_VALUE);\n        System.out.println(\"Bit Count of 42: \" + Integer.bitCount(42));\n        System.out.println(\"Parsed Hex: \" + hexVal);\n        System.out.println(\"Binary: \" + binaryStr);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Integer box1 = Integer.valueOf(42);",
          "explanation": "Invokes the static factory method valueOf, which checks the internal IntegerCache before creating an object."
        },
        {
          "line": "int primitiveInt = Integer.parseInt(\"1024\");",
          "explanation": "Parses string representation and returns raw 32-bit primitive int without heap allocation."
        },
        {
          "line": "Integer objectInt = Integer.valueOf(\"1024\");",
          "explanation": "Parses string and produces a java.lang.Integer object reference on the heap."
        },
        {
          "line": "int hexVal = Integer.parseInt(\"FF\", 16);",
          "explanation": "Overloaded parseInt accepting radix 16 (hexadecimal), evaluating FF to 255."
        },
        {
          "line": "String binaryStr = Integer.toBinaryString(42);",
          "explanation": "Fast algorithmic conversion of integer bits to string '101010'."
        }
      ],
      "output": "Max Int: 2147483647\nBit Count of 42: 3\nParsed Hex: 255\nBinary: 101010"
    },
    "codeExamples": [
      {
        "title": "Null State Representation in Business Models",
        "description": "Demonstrating how wrapper classes cleanly represent optional database values where 0 is invalid.",
        "code": "public class StudentRecord {\n    private int id;              // Mandatory ID, cannot be null\n    private Integer scholarship; // Nullable: null means no scholarship awarded, 0 means $0 aid\n\n    public StudentRecord(int id, Integer scholarship) {\n        this.id = id;\n        this.scholarship = scholarship;\n    }\n\n    public boolean hasScholarship() {\n        return scholarship != null;\n    }\n}",
        "explanation": "If scholarship were primitive 'int', it would default to 0, obliterating the semantic difference between 'not evaluated' (null) and 'evaluated to 0 dollars'."
      },
      {
        "title": "Deprecated Constructors vs static valueOf",
        "description": "Why 'new Integer(x)' is deprecated since Java 9 and removed in modern JVM releases.",
        "code": "public class DeprecationDemo {\n    public static void main(String[] args) {\n        // DEPRECATED since Java 9: new Integer(100);\n        // Allocates guaranteed new object on Heap, bypassing cache.\n        \n        // RECOMMENDED: Integer.valueOf(100);\n        // Reuses flyweight instances from IntegerCache.\n        Integer a = Integer.valueOf(100);\n        Integer b = Integer.valueOf(100);\n        System.out.println(a == b); // true (points to identical cached object)\n    }\n}",
        "explanation": "Using new Integer() forces heap allocation and disables JVM memory caching optimizations, degrading garbage collector performance."
      }
    ],
    "cheatSheet": {
      "summary": "Wrapper classes turn primitives into immutable heap objects. They enable Generics, represent nulls, and provide parsing utilities at the cost of 4x-6x heap overhead.",
      "rules": [
        {
          "rule": "Never use deprecated 'new Integer()' constructor; always use 'Integer.valueOf()'.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "All wrapper instances are 100% immutable and thread-safe.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Use parseInt/parseDouble when you want a primitive; use valueOf when you need an object reference.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Generics (Collections, Streams) strictly require wrapper reference types (List<Integer>, not List<int>).",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Never compare wrapper references with '==' unless testing for identical reference identity; use '.equals()' for value equality.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Memory Consumption",
          "optionA": "Primitive int: exactly 4 bytes",
          "optionB": "Integer wrapper: 16 to 24 bytes on 64-bit JVM"
        },
        {
          "aspect": "Default Value",
          "optionA": "Primitive: 0 (or false)",
          "optionB": "Wrapper: null (unassigned reference)"
        },
        {
          "aspect": "Generics Compatible",
          "optionA": "List<int> is invalid compile syntax",
          "optionB": "List<Integer> is valid standard Java"
        },
        {
          "aspect": "Method Utilities",
          "optionA": "Primitives have zero methods",
          "optionB": "Wrappers possess static bit/radix/parsing helpers"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Using 'new Integer(val)' instead of 'Integer.valueOf(val)'.",
        "whyItHappens": "Developers habituated to standard object construction use 'new', bypassing JVM Flyweight caching.",
        "howToFix": "Use static factory Integer.valueOf(val) or autoboxing.",
        "codeSnippet": "// INCORRECT\nInteger x = new Integer(50);\n// CORRECT\nInteger x = Integer.valueOf(50);"
      },
      {
        "mistake": "Calling wrapper methods on uninitialized or null references.",
        "whyItHappens": "Assuming wrapper behaves like a safe zero-initialized primitive.",
        "howToFix": "Perform explicit null checks before invoking methods or arithmetic.",
        "codeSnippet": "Integer score = null;\n// Throws NullPointerException!\nint total = score + 5;\n// Fix:\nint total = (score != null ? score : 0) + 5;"
      }
    ],
    "practiceProblems": [
      {
        "title": "Wrapper Parsing vs ValueOf Return Types",
        "problemStatement": "Given the following code snippet:\n```java\nString text = \"42\";\nvar a = Integer.parseInt(text);\nvar b = Integer.valueOf(text);\nSystem.out.println(((Object)a).getClass().getSimpleName() + \"-\" + b.getClass().getSimpleName());\n```\nWhat is the output when compiled and run on Java 11+?",
        "options": [
          "int-Integer",
          "Integer-Integer",
          "Integer-int",
          "Compilation error: primitive 'a' cannot be cast to Object"
        ],
        "correctOptionIndex": 1,
        "hint": "When 'a' is cast to (Object), what does the compiler do to primitive int? And what type is 'b'?",
        "solution": "Integer-Integer",
        "explanation": "Integer.parseInt returns primitive int, but casting primitive int to (Object) triggers automatic autoboxing into java.lang.Integer, so a.getClass() reports 'Integer'. Integer.valueOf returns java.lang.Integer directly. Thus both print 'Integer'."
      },
      {
        "title": "NumberFormatException Radix Trap",
        "problemStatement": "What occurs when executing the following line?\n```java\nint num = Integer.parseInt(\"1012\", 2);\nSystem.out.println(num);\n```",
        "options": [
          "Prints 10",
          "Prints 1012",
          "Throws NumberFormatException at runtime",
          "Prints 5"
        ],
        "correctOptionIndex": 2,
        "hint": "What digits are legal in base 2 (binary)?",
        "solution": "Throws NumberFormatException at runtime",
        "explanation": "In radix 2 (binary), only digits '0' and '1' are permissible. The character '2' in '1012' violates base 2 syntax, throwing java.lang.NumberFormatException."
      },
      {
        "title": "Wrapper Number Inheritance",
        "problemStatement": "Consider the snippet:\n```java\nNumber n = Integer.valueOf(255);\nSystem.out.println(n.byteValue());\n```\nWhat is the exact output?",
        "options": [
          "255",
          "127",
          "-1",
          "Compilation error: byteValue() is not in Number"
        ],
        "correctOptionIndex": 2,
        "hint": "java.lang.Number defines byteValue(), shortValue(), intValue(), etc. What is 255 cast to 8-bit signed byte?",
        "solution": "-1",
        "explanation": "Number defines abstract/concrete narrowing methods. Integer 255 has 32-bit hex 0x000000FF. n.byteValue() extracts the lower 8 bits (0xFF), which in two's complement 8-bit signed byte represents -1."
      },
      {
        "title": "Boolean.valueOf Parsing Logic",
        "problemStatement": "What does the following code print?\n```java\nBoolean b1 = Boolean.valueOf(\"True\");\nBoolean b2 = Boolean.valueOf(\"yes\");\nBoolean b3 = Boolean.valueOf(\"1\");\nSystem.out.println(b1 + \",\" + b2 + \",\" + b3);\n```",
        "options": [
          "true,true,true",
          "true,false,false",
          "true,true,false",
          "Throws IllegalArgumentException for 'yes'"
        ],
        "correctOptionIndex": 1,
        "hint": "How does Boolean.parseBoolean evaluate string inputs?",
        "solution": "true,false,false",
        "explanation": "Boolean.valueOf (and parseBoolean) returns true only if the string is non-null and equalsIgnoreCase('true'). Any other string ('yes', '1', 'TRUE ', 'false') evaluates strictly to false without throwing exceptions."
      },
      {
        "title": "Character Digit Evaluation",
        "problemStatement": "What is the output of:\n```java\nchar c = '7';\nint val1 = (int) c;\nint val2 = Character.getNumericValue(c);\nSystem.out.println(val1 + \":\" + val2);\n```",
        "options": [
          "7:7",
          "55:7",
          "55:55",
          "7:55"
        ],
        "correctOptionIndex": 1,
        "hint": "What is the ASCII/Unicode numeric code point for '7', vs its numeric integer value?",
        "solution": "55:7",
        "explanation": "Casting char '7' directly to int yields its UTF-16 code point (ASCII 55). Character.getNumericValue('7') interprets the glyph as a decimal digit, returning integer 7."
      },
      {
        "title": "Double NaN Comparison via Wrapper vs Primitive",
        "problemStatement": "What is the output of the following code?\n```java\ndouble d1 = Double.NaN;\ndouble d2 = Double.NaN;\nSystem.out.print((d1 == d2) + \" \");\nSystem.out.println(Double.valueOf(d1).equals(Double.valueOf(d2)));\n```",
        "options": [
          "false false",
          "true true",
          "false true",
          "true false"
        ],
        "correctOptionIndex": 2,
        "hint": "IEEE 754 states NaN != NaN. But does Double.equals() obey IEEE 754 or hash code equivalence?",
        "solution": "false true",
        "explanation": "According to IEEE 754 floating-point specification, primitive NaN == NaN is always false. However, java.lang.Double.equals() explicitly defines that Double.valueOf(NaN).equals(Double.valueOf(NaN)) returns true to comply with Java Collections and HashMap key equivalence."
      },
      {
        "title": "Float vs Double Precision in Wrapper Parsing",
        "problemStatement": "What is printed by:\n```java\nFloat f = Float.valueOf(\"1.5f\");\nDouble d = Double.valueOf(\"1.5\");\nSystem.out.println(f.doubleValue() == d);\n```",
        "options": [
          "true",
          "false",
          "Compilation error",
          "Throws NumberFormatException"
        ],
        "correctOptionIndex": 0,
        "hint": "1.5 is exactly representable in binary floating-point (1 + 1/2). Does 1.5f convert to 1.5d without precision loss?",
        "solution": "true",
        "explanation": "1.5 is a power-of-two dyadic rational (1.1 in binary) representable with 0 error in both float and double. f.doubleValue() unboxes to 1.5d, and 'd' unboxes to 1.5d for the == primitive comparison, yielding true."
      },
      {
        "title": "Integer decode() Method Functionality",
        "problemStatement": "What does `Integer.decode(\"0x10\") + Integer.decode(\"010\")` produce?",
        "options": [
          "20",
          "26",
          "24",
          "Throws NumberFormatException"
        ],
        "correctOptionIndex": 2,
        "hint": "Integer.decode recognizes '0x' as hex and leading '0' as octal.",
        "solution": "24",
        "explanation": "Integer.decode() parses octal (prefix 0), hex (prefix 0x or #), and decimal. '0x10' in hex is 16. '010' in octal is 8. 16 + 8 = 24."
      },
      {
        "title": "Character Wrapper Case Mutation",
        "problemStatement": "Given:\n```java\nCharacter ch = Character.valueOf('a');\nCharacter.toUpperCase(ch);\nSystem.out.println(ch);\n```\nWhat is printed?",
        "options": [
          "A",
          "a",
          "65",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "Are wrapper classes mutable?",
        "solution": "a",
        "explanation": "Character is completely immutable. Character.toUpperCase(ch) returns a new primitive char 'A' and does not (and cannot) mutate the object referenced by 'ch'. The returned char is discarded, so 'ch' prints 'a'."
      },
      {
        "title": "Wrapper Array Initialization State",
        "problemStatement": "What is the output of:\n```java\nInteger[] numbers = new Integer[3];\nSystem.out.println(numbers[0]);\n```",
        "options": [
          "0",
          "null",
          "Throws NullPointerException",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "What is the default element value of an array of reference types?",
        "solution": "null",
        "explanation": "An array of object references (including Integer[]) initializes every element to null. An array of primitive ints (int[]) would initialize elements to 0."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why do wrapper classes exist in Java when primitives are much faster?",
        "expectedAnswer": "Java wrapper classes exist primarily to integrate primitive data types with the Java Object model and Generics. The Java Collection Framework (such as ArrayList, HashMap) and Generics compile down to java.lang.Object references via type erasure; they cannot store raw primitives. Furthermore, wrapper classes allow representing a missing or unassigned state using 'null' (critical for database columns and JSON APIs), and provide essential utility methods for parsing, base conversion, and min/max constants.",
        "followUp": "What is the memory performance penalty of using wrapper classes over primitives?",
        "followUpAnswer": "On a 64-bit JVM with compressed OOPs, an Integer wrapper occupies 16-24 bytes on the heap (12-byte object header + 4-byte payload + alignment padding), plus 4-8 bytes for the reference pointer. In contrast, a primitive int occupies exactly 4 bytes in contiguous stack or heap memory. This leads to a 4x-6x memory overhead and poor CPU cache locality.",
        "commonMistake": "Thinking wrappers are mutable data holders.",
        "commonMistakeAnswer": "All wrapper classes are final and completely immutable. Any arithmetic or modification instantiates a new wrapper object.",
        "answer": "Java wrapper classes exist primarily to integrate primitive data types with the Java Object model and Generics. The Java Collection Framework (such as ArrayList, HashMap) and Generics compile down to java.lang.Object references via type erasure; they cannot store raw primitives. Furthermore, wrapper classes allow representing a missing or unassigned state using 'null' (critical for database columns and JSON APIs), and provide essential utility methods for parsing, base conversion, and min/max constants."
      },
      {
        "question": "What is the difference between Integer.parseInt() and Integer.valueOf()?",
        "expectedAnswer": "Integer.parseInt(String s) parses the string argument as a signed decimal integer and returns a raw primitive 'int'. It performs no heap allocation. In contrast, Integer.valueOf(String s) parses the string and returns a java.lang.Integer object reference. It utilizes an internal Flyweight cache (IntegerCache) for values between -128 and 127 to reuse existing objects.",
        "followUp": "When would you choose parseInt over valueOf?",
        "followUpAnswer": "You should choose parseInt whenever you are performing numeric calculations or storing values into primitive fields/arrays to avoid unnecessary boxing and heap allocation. Choose valueOf when inserting directly into Collections or when nullable object references are required.",
        "commonMistake": "Believing valueOf always creates a new object on the heap.",
        "commonMistakeAnswer": "valueOf reuses cached instances for numbers in the range -128 to 127.",
        "answer": "Integer.parseInt(String s) parses the string argument as a signed decimal integer and returns a raw primitive 'int'. It performs no heap allocation. In contrast, Integer.valueOf(String s) parses the string and returns a java.lang.Integer object reference. It utilizes an internal Flyweight cache (IntegerCache) for values between -128 and 127 to reuse existing objects."
      },
      {
        "question": "Why was 'new Integer()' deprecated in Java 9?",
        "expectedAnswer": "'new Integer(int)' was deprecated because it unconditionally forces the JVM to allocate a new object on the heap, bypassing the Flyweight caching mechanism in Integer.valueOf(). This leads to severe memory bloat and garbage collector thrashing in high-throughput applications. Using Integer.valueOf() or autoboxing allows the JVM to return cached instances.",
        "followUp": "Can wrapper constructors still be called in modern Java versions?",
        "followUpAnswer": "They are deprecated for removal in recent JDKs and produce compiler warnings. In future LTS releases (e.g. Project Valhalla migration), calling constructors on primitive wrappers may be completely prohibited.",
        "commonMistake": "Assuming new Integer(5) == new Integer(5) is true.",
        "commonMistakeAnswer": "Calling 'new' creates two distinct heap objects with separate addresses; == evaluates to false.",
        "answer": "'new Integer(int)' was deprecated because it unconditionally forces the JVM to allocate a new object on the heap, bypassing the Flyweight caching mechanism in Integer.valueOf(). This leads to severe memory bloat and garbage collector thrashing in high-throughput applications. Using Integer.valueOf() or autoboxing allows the JVM to return cached instances."
      },
      {
        "question": "Explain the inheritance hierarchy of wrapper classes in Java.",
        "expectedAnswer": "All six numeric wrapper classes—Byte, Short, Integer, Long, Float, and Double—extend the abstract class java.lang.Number, which implements java.io.Serializable. java.lang.Number defines conversion methods like intValue(), doubleValue(), byteValue(), etc. In contrast, Boolean and Character extend java.lang.Object directly because they are non-numeric.",
        "followUp": "Can you cast an Integer reference to a Long reference?",
        "followUpAnswer": "No. In Java, Integer and Long are sibling classes under Number with no parent-child relationship. Casting (Long) (Object) Integer.valueOf(10) will throw ClassCastException at runtime.",
        "commonMistake": "Assuming wrappers widen polymorphically like primitives (e.g., expecting Integer to cast to Long).",
        "commonMistakeAnswer": "Reference polymorphism does not follow primitive widening conversions. There is no inheritance relationship between Integer and Long.",
        "answer": "All six numeric wrapper classes—Byte, Short, Integer, Long, Float, and Double—extend the abstract class java.lang.Number, which implements java.io.Serializable. java.lang.Number defines conversion methods like intValue(), doubleValue(), byteValue(), etc. In contrast, Boolean and Character extend java.lang.Object directly because they are non-numeric."
      },
      {
        "question": "How does Boolean.valueOf() handle non-'true' string inputs?",
        "expectedAnswer": "Boolean.valueOf(String s) returns Boolean.TRUE if and only if the input string is non-null and equals the string 'true' ignoring case ('true', 'True', 'TRUE'). For any other input—including 'false', '0', 'yes', 'null', or random text—it safely returns Boolean.FALSE without throwing any exception.",
        "followUp": "Why doesn't Boolean.valueOf throw a NumberFormatException like Integer.parseInt?",
        "followUpAnswer": "The Java language designers specified Boolean parsing to be permissive and fail-safe, defining anything that is not strictly truthy as false. This eliminates runtime crashes when parsing loose flags in configuration files.",
        "commonMistake": "Thinking 'yes' or '1' evaluates to true in Boolean.parseBoolean().",
        "commonMistakeAnswer": "Only variations of 'true' evaluate to true; all other strings evaluate to false.",
        "answer": "Boolean.valueOf(String s) returns Boolean.TRUE if and only if the input string is non-null and equals the string 'true' ignoring case ('true', 'True', 'TRUE'). For any other input—including 'false', '0', 'yes', 'null', or random text—it safely returns Boolean.FALSE without throwing any exception."
      },
      {
        "question": "What is the difference between Float.compare(f1, f2) and f1 == f2?",
        "expectedAnswer": "The primitive equality operator '==' conforms strictly to IEEE 754: -0.0f == +0.0f evaluates to true, and Float.NaN == Float.NaN evaluates to false. In contrast, Float.compare(f1, f2) (and Float.equals()) defines natural ordering for sorting and collections: Float.NaN is treated as equal to itself and greater than all other floats (including POSITIVE_INFINITY), while -0.0f is treated as strictly less than +0.0f.",
        "followUp": "Why is Float.compare designed this way?",
        "followUpAnswer": "It is necessary so that floating-point wrapper values obey the reflexive, symmetric, and transitive contract required by java.lang.Comparable and Hash-based collections (HashMap, HashSet).",
        "commonMistake": "Using == to compare Double or Float wrapper objects.",
        "commonMistakeAnswer": "Comparing wrapper objects with == checks reference addresses, not floating-point numeric values.",
        "answer": "The primitive equality operator '==' conforms strictly to IEEE 754: -0.0f == +0.0f evaluates to true, and Float.NaN == Float.NaN evaluates to false. In contrast, Float.compare(f1, f2) (and Float.equals()) defines natural ordering for sorting and collections: Float.NaN is treated as equal to itself and greater than all other floats (including POSITIVE_INFINITY), while -0.0f is treated as strictly less than +0.0f."
      },
      {
        "question": "What is the purpose of the java.lang.Number abstract class?",
        "expectedAnswer": "java.lang.Number serves as the common superclass for platform classes representing numeric values that are convertible to primitive formats. It defines standard abstract methods: intValue(), longValue(), floatValue(), doubleValue(), byteValue(), and shortValue(). It allows algorithms to consume any numeric type polymorphically.",
        "followUp": "What other classes in the standard library extend Number besides standard wrappers?",
        "followUpAnswer": "java.math.BigInteger, java.math.BigDecimal, and the atomic concurrency classes such as AtomicInteger, AtomicLong, DoubleAdder, and LongAdder all extend java.lang.Number.",
        "commonMistake": "Assuming Number provides arithmetic methods like add() or multiply().",
        "commonMistakeAnswer": "Number only defines conversion methods to primitive types; it provides no arithmetic operators or methods.",
        "answer": "java.lang.Number serves as the common superclass for platform classes representing numeric values that are convertible to primitive formats. It defines standard abstract methods: intValue(), longValue(), floatValue(), doubleValue(), byteValue(), and shortValue(). It allows algorithms to consume any numeric type polymorphically."
      },
      {
        "question": "Why are wrapper classes declared final?",
        "expectedAnswer": "Wrapper classes are declared final to preserve absolute immutability, thread safety, and value integrity across the JVM. If subclasses were permitted, malicious or poorly designed code could override methods like intValue() or equals() to return mutable or inconsistent values, corrupting security managers, hash tables, and concurrent data structures.",
        "followUp": "How does finality assist the JVM compiler (JIT)?",
        "followUpAnswer": "JIT compilers can aggressively inline method invocations (such as intValue() and hashCode()) and perform escape analysis optimizations without needing to check for polymorphic class overrides at runtime.",
        "commonMistake": "Thinking immutability alone makes a class final.",
        "commonMistakeAnswer": "A class can be immutable without being final, but making it final guarantees that no subclass can violate immutability.",
        "answer": "Wrapper classes are declared final to preserve absolute immutability, thread safety, and value integrity across the JVM. If subclasses were permitted, malicious or poorly designed code could override methods like intValue() or equals() to return mutable or inconsistent values, corrupting security managers, hash tables, and concurrent data structures."
      },
      {
        "question": "How do wrapper classes handle thread safety?",
        "expectedAnswer": "Because wrapper classes are completely immutable—all fields are private and final, and no mutator methods exist—their instances are inherently thread-safe. Multiple threads can read, pass, and share wrapper object references concurrently without any synchronization, locks, or risk of race conditions.",
        "followUp": "Can a reference variable holding a wrapper experience thread concurrency bugs?",
        "followUpAnswer": "Yes. While the wrapper object itself is immutable, the reference variable pointing to it (e.g., a shared instance field 'private Integer counter;') can experience data races if multiple threads reassign the reference without synchronization or volatile semantics.",
        "commonMistake": "Confusing an immutable object with a thread-safe variable reference.",
        "commonMistakeAnswer": "The object on the heap is immutable, but the variable holding the pointer can be overwritten concurrently.",
        "answer": "Because wrapper classes are completely immutable—all fields are private and final, and no mutator methods exist—their instances are inherently thread-safe. Multiple threads can read, pass, and share wrapper object references concurrently without any synchronization, locks, or risk of race conditions."
      },
      {
        "question": "What is Character.getNumericValue() and how does it differ from type casting?",
        "expectedAnswer": "Casting a char to an int `(int) '5'` converts the Unicode character to its 16-bit code point value (ASCII 53). Character.getNumericValue('5') parses the semantic numeric value represented by the character, returning 5. It also supports Unicode numerals from diverse scripts (e.g., Roman numerals, Arabic-Indic digits) and returns -1 if the char has no numeric value.",
        "followUp": "How would you get the numeric value of a char digit without calling getNumericValue?",
        "followUpAnswer": "By subtracting the character '0': `int digit = ch - '0';`. This is a standard idiomatic Java technique that works for ASCII decimal digits '0' through '9'.",
        "commonMistake": "Using (int) ch to get the integer digit.",
        "commonMistakeAnswer": "(int) '0' gives 48, (int) '1' gives 49, not 0 and 1.",
        "answer": "Casting a char to an int `(int) '5'` converts the Unicode character to its 16-bit code point value (ASCII 53). Character.getNumericValue('5') parses the semantic numeric value represented by the character, returning 5. It also supports Unicode numerals from diverse scripts (e.g., Roman numerals, Arabic-Indic digits) and returns -1 if the char has no numeric value."
      }
    ],
    "miniQuiz": [
      {
        "question": "Which of the following is NOT a direct subclass of java.lang.Number?",
        "options": [
          "Byte",
          "Character",
          "Float",
          "Short"
        ],
        "correctOptionIndex": 1,
        "explanation": "Character extends java.lang.Object directly. Byte, Float, Short, Integer, Long, and Double extend java.lang.Number.",
        "correctIndex": 1
      },
      {
        "question": "What is the memory size of a java.lang.Integer object on a 64-bit JVM with compressed OOPs enabled?",
        "options": [
          "4 bytes",
          "8 bytes",
          "16 bytes",
          "32 bytes"
        ],
        "correctOptionIndex": 2,
        "explanation": "On a 64-bit JVM with compressed OOPs, an Integer has an 8-byte mark word, a 4-byte klass word, and a 4-byte int value payload, totaling 16 bytes.",
        "correctIndex": 2
      },
      {
        "question": "What does Integer.parseInt(\"123\") return?",
        "options": [
          "An Integer object on the heap",
          "A primitive int of value 123",
          "A Number reference",
          "A cached Flyweight Integer"
        ],
        "correctOptionIndex": 1,
        "explanation": "parseInt returns a primitive int. Integer.valueOf returns a java.lang.Integer object.",
        "correctIndex": 1
      },
      {
        "question": "Which constructor for Integer was deprecated in Java 9 and discouraged in modern Java?",
        "options": [
          "Integer(String s)",
          "new Integer(int val)",
          "Both A and B",
          "Neither"
        ],
        "correctOptionIndex": 2,
        "explanation": "Both new Integer(int) and new Integer(String) constructors were deprecated in Java 9 in favor of the static factory method Integer.valueOf().",
        "correctIndex": 2
      },
      {
        "question": "What happens when executing `Boolean.parseBoolean(\"FALSE\")`?",
        "options": [
          "Returns true",
          "Returns false",
          "Throws IllegalArgumentException",
          "Returns null"
        ],
        "correctOptionIndex": 1,
        "explanation": "parseBoolean checks if the string equals 'true' ignoring case. Since 'FALSE' != 'true', it returns false.",
        "correctIndex": 1
      },
      {
        "question": "Why can't you declare a `List<int>` in Java?",
        "options": [
          "Java collections only support numeric arrays",
          "Java Generics use type erasure and require types assignable to java.lang.Object",
          "Primitives cannot be passed into methods",
          "int does not have a hashCode method"
        ],
        "correctOptionIndex": 1,
        "explanation": "Java Generics are implemented via type erasure to java.lang.Object. Since primitives do not inherit from Object, only wrapper types like Integer can be generic arguments.",
        "correctIndex": 1
      },
      {
        "question": "What is the output of `Integer.valueOf(\"101\", 2)`?",
        "options": [
          "101",
          "5",
          "6",
          "Throws NumberFormatException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Integer.valueOf(str, 2) parses base-2 binary. '101' in binary = 1*4 + 0*2 + 1*1 = 5.",
        "correctIndex": 1
      },
      {
        "question": "Which wrapper class does NOT extend java.lang.Number?",
        "options": [
          "Double",
          "Boolean",
          "Long",
          "Byte"
        ],
        "correctOptionIndex": 1,
        "explanation": "Boolean extends java.lang.Object directly, not java.lang.Number.",
        "correctIndex": 1
      },
      {
        "question": "What does `Integer.bitCount(7)` return?",
        "options": [
          "32",
          "3",
          "7",
          "1"
        ],
        "correctOptionIndex": 1,
        "explanation": "Integer.bitCount counts the number of one-bits in two's complement binary. 7 is binary 0111, containing exactly three 1-bits.",
        "correctIndex": 1
      },
      {
        "question": "What exception is thrown by `Integer.parseInt(\"12.34\")`?",
        "options": [
          "ArithmeticException",
          "ClassCastException",
          "NumberFormatException",
          "NullPointerException"
        ],
        "correctOptionIndex": 2,
        "explanation": "Integer.parseInt expects integer digits; encountering decimal point '.' results in java.lang.NumberFormatException.",
        "correctIndex": 2
      },
      {
        "question": "Which statement about wrapper classes is TRUE?",
        "options": [
          "Wrapper classes can be extended to create custom numeric wrappers",
          "All wrapper classes are declared final and are immutable",
          "Wrapper objects can be modified using setter methods",
          "Wrappers take less memory than primitives"
        ],
        "correctOptionIndex": 1,
        "explanation": "All wrapper classes (Integer, Double, Boolean, etc.) are declared public final class and their values are stored in private final fields.",
        "correctIndex": 1
      },
      {
        "question": "What is the result of `Double.valueOf(Double.NaN).equals(Double.valueOf(Double.NaN))`?",
        "options": [
          "false",
          "true",
          "Compilation error",
          "Throws ArithmeticException"
        ],
        "correctOptionIndex": 1,
        "explanation": "While primitive NaN == NaN is false according to IEEE 754, Double.equals explicitly returns true for two NaNs to satisfy hash map contracts.",
        "correctIndex": 1
      },
      {
        "question": "What is the result of `Integer.max(15, 25)`?",
        "options": [
          "15",
          "25",
          "40",
          "true"
        ],
        "correctOptionIndex": 1,
        "explanation": "Integer.max(a, b) is a static utility method that returns Math.max(a, b), which is 25.",
        "correctIndex": 1
      },
      {
        "question": "What does `Character.isDigit('9')` return?",
        "options": [
          "true",
          "false",
          "9",
          "57"
        ],
        "correctOptionIndex": 0,
        "explanation": "Character.isDigit returns boolean true for any Unicode character representing a decimal digit.",
        "correctIndex": 0
      },
      {
        "question": "What is the return type of `Byte.valueOf((byte) 10).intValue()`?",
        "options": [
          "byte",
          "Byte",
          "int",
          "Integer"
        ],
        "correctOptionIndex": 2,
        "explanation": "The intValue() method declared in java.lang.Number returns a primitive int.",
        "correctIndex": 2
      }
    ]
  },
  "autoboxing-and-unboxing": {
    "id": "autoboxing-and-unboxing",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.5",
    "title": "Autoboxing & Unboxing",
    "subtitle": "Syntactic sugar mechanics, compiler bytecodes (valueOf vs intValue), silent performance degradation, and unboxing NullPointerException",
    "estimatedMinutes": 12,
    "beginnerAnalogy": "In Java 1.4 and earlier, converting between primitives and their corresponding wrapper objects required explicit, manual ceremony: developers had to explicitly write 'new Integer(x)' to box a primitive, and 'obj.intValue()' to unbox it back into a primitive register. Starting in Java 5, the Java compiler (javac) introduced Autoboxing and Unboxing as compile-time syntactic sugar.\n\nAt the bytecode level, the JVM itself has no built-in instruction for autoboxing. When javac encounters a primitive where an object reference is expected, it automatically injects a call to the wrapper's static factory method: 'Integer.valueOf(x)'. Conversely, when a wrapper object is placed where a primitive is expected (such as in an arithmetic expression or boolean condition), javac injects a call to the accessor method: 'obj.intValue()'.\n\nArchitecturally, autoboxing eliminates boiler-plate syntax when integrating with generic collections and APIs. However, because it occurs invisibly, developers frequently introduce two severe production defects: massive GC allocation storms caused by autoboxing inside loops, and runtime NullPointerExceptions caused by attempting to unbox a null wrapper reference.",
    "coreExplanation": [
      "Compiler Syntactic Sugar: Autoboxing and unboxing are strictly compile-time transformations handled by javac. The JVM runtime bytecode executes standard method invocations: static valueOf() for boxing, and virtual xxxValue() for unboxing.",
      "Unboxing NullPointerException (NPE): Because unboxing calls an instance method (e.g. wrapper.intValue()), if the wrapper reference is null, the JVM throws a NullPointerException at runtime. This is the single most common source of hidden production NPEs.",
      "Arithmetic Promotion with Wrappers: Any arithmetic operator (+, -, *, /, %, ++, --) applied to wrapper objects forces immediate unboxing of all operands, calculation on primitive registers, and (if assigned back to a wrapper) re-boxing of the result.",
      "Loop Performance Degradation: Using a wrapper class (such as Long or Integer) as a loop accumulator forces the creation of millions of temporary heap objects, degrading CPU cache locality and triggering heavy Garbage Collector pauses.",
      "Equality Comparison Traps: Using '==' on autoboxed wrappers performs reference address comparison, not numeric equality, leading to erratic bugs outside the cached integer range (-128 to 127).",
      "Method Overloading Disambiguation: In overloaded methods (e.g. foo(int) vs foo(Integer)), the compiler adheres to strict priority rules: exact primitive match first, widening primitive second, autoboxing third, and varargs last."
    ],
    "diagram": "================ AUTOBOXING & UNBOXING BYTECODE COMPILATION ================\n\n  SOURCE CODE (Java 5+):                      BYTECODE GENERATED BY JAVAC:\n  ----------------------                      ----------------------------\n  Integer box = 100;           ========>      invokestatic Integer.valueOf(I)Ljava/lang/Integer;\n  int val = box;               ========>      invokevirtual Integer.intValue()I\n\n  ARITHMETIC ON WRAPPERS (Silent Object Churn):\n  Integer sum = 0;\n  sum += 5;                    ========>      1. sum.intValue()        (Unbox)\n                                              2. iadd 5                (Primitive addition)\n                                              3. Integer.valueOf(...)  (Re-box to NEW heap object!)\n\n  UNBOXING NULL CRASH:\n  Integer counter = null;\n  int count = counter;         ========>      counter.intValue() ===> NullPointerException!\n=============================================================================",
    "codeSnippet": {
      "title": "Autoboxing Mechanics and the Unboxing NPE Trap",
      "code": "public class AutoboxingDemo {\n    public static void main(String[] args) {\n        // 1. Implicit Autoboxing: compiles to Integer.valueOf(500)\n        Integer boxed = 500;\n        \n        // 2. Implicit Unboxing: compiles to boxed.intValue()\n        int primitive = boxed;\n        \n        // 3. Hidden Loop Allocation Disaster (10 million objects created!)\n        long start = System.currentTimeMillis();\n        Long sum = 0L; // WRAPPER ACCUMULATOR!\n        for (int i = 0; i < 1_000_000; i++) {\n            sum += i; // Unboxes to long, adds i, boxes new Long(sum)\n        }\n        System.out.println(\"Sum: \" + sum + \" in \" + (System.currentTimeMillis() - start) + \"ms\");\n        \n        // 4. The Unboxing NullPointerException Trap\n        try {\n            Integer nullBox = null;\n            int dangerous = nullBox; // Triggers nullBox.intValue()\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught expected NPE during unboxing!\");\n        }\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Integer boxed = 500;",
          "explanation": "Javac intercepts assignment of primitive literal 500 to Integer and rewrites to Integer.valueOf(500)."
        },
        {
          "line": "int primitive = boxed;",
          "explanation": "Javac rewrites assignment to boxed.intValue(), extracting raw 32-bit primitive value."
        },
        {
          "line": "Long sum = 0L;",
          "explanation": "Declares wrapper reference. Inside the loop, sum += i instantiates 1,000,000 distinct Long objects on the heap."
        },
        {
          "line": "int dangerous = nullBox;",
          "explanation": "At runtime, calls .intValue() on null reference, triggering immediate NullPointerException."
        }
      ],
      "output": "Sum: 499999500000 in [Elapsed]ms\nCaught expected NPE during unboxing!"
    },
    "codeExamples": [
      {
        "title": "Ternary Operator Silent Unboxing NPE",
        "description": "How conditional expressions trigger subtle unboxing crashes when mixing primitives and wrappers.",
        "code": "public class TernaryNpe {\n    public static void main(String[] args) {\n        boolean condition = false;\n        Integer value = null;\n        \n        // Mixing Integer and primitive double forces unboxing of value!\n        // Bytecode compiles to: condition ? (double)value.intValue() : 0.0d\n        try {\n            double result = condition ? value : 0.0;\n            System.out.println(\"Result: \" + result);\n        } catch (NullPointerException e) {\n            System.out.println(\"Ternary unboxing crashed with NPE!\");\n        }\n    }\n}",
        "explanation": "Java Language Specification (JLS) mandates numeric type promotion in ternary expressions. If one branch is primitive double and the other is Integer, the wrapper branch is unboxed and converted to double. Even if the condition evaluates to false in some compiler branches, the unboxing bytecode is generated."
      },
      {
        "title": "Overloading Resolution: Widening vs Boxing",
        "description": "How the compiler chooses between widening and autoboxing in method invocations.",
        "code": "public class OverloadDemo {\n    static void print(long val)    { System.out.println(\"Widened to long\"); }\n    static void print(Integer val) { System.out.println(\"Boxed to Integer\"); }\n\n    public static void main(String[] args) {\n        int x = 10;\n        print(x); // Which method is called?\n    }\n}",
        "explanation": "Prints 'Widened to long'. Java preserves backwards compatibility with pre-Java 5 code: primitive widening (int -> long) takes strict priority over autoboxing (int -> Integer)."
      }
    ],
    "cheatSheet": {
      "summary": "Autoboxing is compile-time syntactic sugar rewriting code to valueOf() and xxxValue(). Watch out for unboxing NPEs and heavy loop object allocation.",
      "rules": [
        {
          "rule": "Primitive to Wrapper compiles to Wrapper.valueOf(primitive).",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Wrapper to Primitive compiles to wrapper.primitiveValue().",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Unboxing a null wrapper reference unconditionally throws NullPointerException.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Never use wrapper objects as loop accumulators or index counters.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Widening beats Boxing, and Boxing beats Varargs in method overload resolution.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "The compiler will NOT perform Widening AND Boxing simultaneously (e.g. int cannot autobox to Long).",
          "explanation": "Core architectural specification and JVM runtime constraint."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Mechanism",
          "optionA": "Autoboxing: primitive -> Wrapper.valueOf()",
          "optionB": "Unboxing: wrapper -> wrapper.xxxValue()"
        },
        {
          "aspect": "Primary Runtime Risk",
          "optionA": "Autoboxing: Heap churn & high GC latency",
          "optionB": "Unboxing: NullPointerException if reference is null"
        },
        {
          "aspect": "JVM Instruction",
          "optionA": "Boxing: invokestatic valueOf()",
          "optionB": "Unboxing: invokevirtual intValue()"
        },
        {
          "aspect": "Overloading Precedence",
          "optionA": "Primitive widening: Priority #1",
          "optionB": "Autoboxing: Priority #2"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Using a wrapper class as an accumulator in high-iteration loops.",
        "whyItHappens": "Developer does not realize 'sum += i' instantiates a new heap object every single iteration.",
        "howToFix": "Use primitive 'long sum = 0;' or 'int sum = 0;'.",
        "codeSnippet": "// HORRIBLE PERFORMANCE (10M allocations)\nLong sum = 0L;\nfor (int i = 0; i < 10_000_000; i++) sum += i;\n\n// OPTIMIZED (0 heap allocations)\nlong sum = 0L;\nfor (int i = 0; i < 10_000_000; i++) sum += i;"
      },
      {
        "mistake": "Attempting simultaneous widening and boxing (e.g. Long l = 10;).",
        "whyItHappens": "Assuming 10 (int) can widen to long and then box to Long automatically.",
        "howToFix": "Provide the explicit typed literal: Long l = 10L; or explicit cast.",
        "codeSnippet": "// COMPILE ERROR: incompatible types\nLong l = 10;\n// CORRECT\nLong l = 10L;"
      }
    ],
    "practiceProblems": [
      {
        "title": "Unboxing in Boolean Conditional",
        "problemStatement": "What is the result of executing the following snippet?\n```java\nBoolean flag = null;\nif (flag) {\n    System.out.println(\"True branch\");\n} else {\n    System.out.println(\"False branch\");\n}\n```",
        "options": [
          "Prints 'False branch'",
          "Throws NullPointerException at runtime",
          "Prints 'True branch'",
          "Compilation error at if (flag)"
        ],
        "correctOptionIndex": 1,
        "hint": "The 'if' condition requires a primitive boolean. How does the compiler evaluate 'flag'?",
        "solution": "Throws NullPointerException at runtime",
        "explanation": "An 'if' statement requires a primitive boolean expression. To evaluate `if (flag)`, javac injects `flag.booleanValue()`. Because `flag` is null, invoking `booleanValue()` throws java.lang.NullPointerException."
      },
      {
        "title": "Simultaneous Widening and Boxing",
        "problemStatement": "Consider the statement:\n```java\nLong val = 100;\n```\nWhat happens when compiled?",
        "options": [
          "Compiles successfully and stores 100L",
          "Compile error: incompatible types (int cannot be converted to Long)",
          "Compiles with unchecked warning",
          "Throws ClassCastException at runtime"
        ],
        "correctOptionIndex": 1,
        "hint": "Can javac perform an implicit widening conversion from int to long AND box to Long in one step?",
        "solution": "Compile error: incompatible types (int cannot be converted to Long)",
        "explanation": "According to the Java Language Specification, the compiler will perform widening OR boxing, but NOT both in a single conversion. '100' is an int literal. It cannot autobox directly into a Long without the 'L' suffix (`100L`)."
      },
      {
        "title": "Overloading Precedence with Primitive, Box, and Varargs",
        "problemStatement": "Given:\n```java\nclass Tester {\n    static void test(int... a)    { System.out.print(\"varargs \"); }\n    static void test(Integer a)   { System.out.print(\"Integer \"); }\n    static void test(long a)      { System.out.print(\"long \"); }\n    public static void main(String[] args) {\n        int x = 5;\n        test(x);\n    }\n}\n```\nWhat is printed?",
        "options": [
          "varargs",
          "Integer",
          "long",
          "Compilation error: ambiguous method call"
        ],
        "correctOptionIndex": 2,
        "hint": "What is the priority order in JLS: Widening vs Boxing vs Varargs?",
        "solution": "long",
        "explanation": "Java's overload resolution order is: 1. Exact match / Primitive Widening, 2. Autoboxing / Unboxing, 3. Varargs. Primitive widening from int to long wins over autoboxing to Integer."
      },
      {
        "title": "Compound Assignment with Unboxed Null",
        "problemStatement": "What does the following code do?\n```java\nInteger count = null;\ncount = (count == null) ? 0 : count + 1;\nSystem.out.println(count);\n```",
        "options": [
          "Prints 0",
          "Prints 1",
          "Throws NullPointerException at runtime",
          "Compilation error"
        ],
        "correctOptionIndex": 0,
        "hint": "Does short-circuiting protect the true branch in ternary operators?",
        "solution": "Prints 0",
        "explanation": "In this ternary expression, (count == null) evaluates to true, so only the true branch (0) is evaluated and boxed to Integer. The false branch (count + 1) is never evaluated, avoiding NPE."
      },
      {
        "title": "Ternary Unboxing with Mixed Numeric Types",
        "problemStatement": "What happens when running:\n```java\nInteger a = 1;\nDouble b = 2.0;\nboolean cond = true;\nNumber res = cond ? a : b;\nSystem.out.println(res.getClass().getSimpleName());\n```",
        "options": [
          "Integer",
          "Double",
          "Number",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "When numeric types Integer and Double are mixed in a ternary expression, what does binary numeric promotion do?",
        "solution": "Double",
        "explanation": "In a ternary expression where one operand is Integer and the other is Double, binary numeric promotion unboxes 'a' and widens it to primitive double. The resulting primitive double is then autoboxed to java.lang.Double. Thus res is an instance of Double."
      },
      {
        "title": "Autoboxing in Collections Operations",
        "problemStatement": "Given:\n```java\nList<Integer> list = new ArrayList<>();\nlist.add(1);\nlist.add(2);\nlist.remove(1);\nSystem.out.println(list);\n```\nWhat is the output?",
        "options": [
          "[2]",
          "[1]",
          "[]",
          "Throws IndexOutOfBoundsException"
        ],
        "correctOptionIndex": 1,
        "hint": "List has two remove methods: remove(int index) and remove(Object o). Which one does primitive 1 match?",
        "solution": "[1]",
        "explanation": "List defines remove(int index) and remove(Object o). The literal 1 is a primitive int, which matches remove(int index) without autoboxing. It removes the element at index 1 (which is 2), leaving [1] in the list."
      },
      {
        "title": "Equality Comparison of Autoboxed Literals",
        "problemStatement": "What does the following snippet print?\n```java\nInteger x = 127;\nInteger y = 127;\nInteger p = 128;\nInteger q = 128;\nSystem.out.println((x == y) + \" \" + (p == q));\n```",
        "options": [
          "true true",
          "false false",
          "true false",
          "false true"
        ],
        "correctOptionIndex": 2,
        "hint": "What range of values does Integer.valueOf() cache by default?",
        "solution": "true false",
        "explanation": "Autoboxing calls Integer.valueOf(). Values between -128 and 127 are returned from IntegerCache, so x == y compares the same object (true). 128 exceeds the cache, so p and q are distinct heap objects, and p == q evaluates to false."
      },
      {
        "title": "Autoboxing in Switch Statement",
        "problemStatement": "Consider:\n```java\nInteger choice = null;\nswitch (choice) {\n    case 1: System.out.println(\"One\"); break;\n    default: System.out.println(\"Default\");\n}\n```\nWhat happens at runtime?",
        "options": [
          "Prints 'Default'",
          "Throws NullPointerException",
          "Does nothing",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "How does the JVM evaluate a switch on an Integer selector?",
        "solution": "Throws NullPointerException",
        "explanation": "The switch selector expression must evaluate to an int. The JVM automatically unboxes `choice` by calling `choice.intValue()`. Since `choice` is null, an NPE is thrown before entering the switch or hitting the default case."
      },
      {
        "title": "Unboxing Inside Math Methods",
        "problemStatement": "What is printed by:\n```java\nInteger val = 20;\nSystem.out.println(Math.abs(val));\n```",
        "options": [
          "20",
          "Compilation error: Math.abs expects primitive int",
          "Throws ClassCastException",
          "null"
        ],
        "correctOptionIndex": 0,
        "hint": "Math.abs(int a) accepts primitive int.",
        "solution": "20",
        "explanation": "Math.abs accepts primitive int. Javac automatically unboxes 'val' to primitive 20 via val.intValue(), computes absolute value, and prints 20."
      },
      {
        "title": "Autoboxing with Byte Literal",
        "problemStatement": "Which line will cause a compilation error?\n```java\nByte b1 = 10;          // Line 1\nbyte b2 = 10;          // Line 2\nByte b3 = b2;          // Line 3\nByte b4 = 130;         // Line 4\n```",
        "options": [
          "Line 1",
          "Line 3",
          "Line 4",
          "None of the above"
        ],
        "correctOptionIndex": 2,
        "hint": "What is the maximum value of a signed 8-bit byte?",
        "solution": "Line 4",
        "explanation": "130 exceeds the maximum value of a byte (127). Javac recognizes that 130 cannot fit in a byte, and therefore cannot narrow and autobox to Byte, resulting in a compile-time error."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is autoboxing and unboxing, and how does the compiler implement them?",
        "expectedAnswer": "Autoboxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes (e.g., int to Integer). Unboxing is the reverse conversion (Integer to int). At the bytecode level, the JVM has no knowledge of autoboxing; javac transforms boxing into a call to `Wrapper.valueOf(primitive)` and unboxing into `wrapper.xxxValue()` (e.g. `intValue()`).",
        "followUp": "Does autoboxing happen at compile-time or runtime?",
        "followUpAnswer": "The transformation of code happens at compile time by javac, but the method executions (valueOf and intValue) and object allocations happen dynamically at runtime.",
        "commonMistake": "Believing that the JVM has special bytecode instructions for boxing.",
        "commonMistakeAnswer": "Autoboxing is purely syntactic sugar converted to regular invokestatic and invokevirtual method calls.",
        "answer": "Autoboxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes (e.g., int to Integer). Unboxing is the reverse conversion (Integer to int). At the bytecode level, the JVM has no knowledge of autoboxing; javac transforms boxing into a call to `Wrapper.valueOf(primitive)` and unboxing into `wrapper.xxxValue()` (e.g. `intValue()`)."
      },
      {
        "question": "How can autoboxing lead to a NullPointerException at runtime?",
        "expectedAnswer": "Unboxing is implemented by invoking an instance method (e.g., `intValue()`, `booleanValue()`) on the wrapper object. If the wrapper reference is null when unboxing is attempted—such as in an arithmetic operation `nullVal + 1`, a boolean condition `if (nullBool)`, or assigning to a primitive `int x = nullVal;`—invoking that method results in a runtime NullPointerException.",
        "followUp": "Can an unboxing NPE occur in a ternary operator expression?",
        "followUpAnswer": "Yes. When mixing wrapper and primitive types in ternary branches, Java promotes the expression to the primitive type. If the wrapper branch is chosen and contains null, unboxing throws an NPE.",
        "commonMistake": "Assuming that unboxing a null wrapper defaults to 0 or false.",
        "commonMistakeAnswer": "Unboxing null never defaults to zero; it always throws an immediate NullPointerException.",
        "answer": "Unboxing is implemented by invoking an instance method (e.g., `intValue()`, `booleanValue()`) on the wrapper object. If the wrapper reference is null when unboxing is attempted—such as in an arithmetic operation `nullVal + 1`, a boolean condition `if (nullBool)`, or assigning to a primitive `int x = nullVal;`—invoking that method results in a runtime NullPointerException."
      },
      {
        "question": "Why is using wrapper classes as accumulators in loops considered a major anti-pattern?",
        "expectedAnswer": "Using a wrapper class like `Long` or `Integer` as a loop counter or accumulator causes silent, catastrophic object churn. Because wrappers are immutable, every `sum += i` unboxes `sum`, performs primitive addition, and executes `Long.valueOf(newSum)`, creating a new heap object. In a loop of 10 million iterations, 10 million temporary objects are allocated, thrashing the Eden space and triggering Garbage Collector latency.",
        "followUp": "How much slower can a loop with wrapper accumulation be compared to primitives?",
        "followUpAnswer": "A loop using `Long` instead of primitive `long` can run 5x to 10x slower and consume gigabytes of garbage memory per second.",
        "commonMistake": "Thinking modern JIT escape analysis always eliminates wrapper allocations in loops.",
        "commonMistakeAnswer": "Escape analysis cannot always eliminate allocations when accumulators cross method boundaries or loop states exceed compiler thresholds.",
        "answer": "Using a wrapper class like `Long` or `Integer` as a loop counter or accumulator causes silent, catastrophic object churn. Because wrappers are immutable, every `sum += i` unboxes `sum`, performs primitive addition, and executes `Long.valueOf(newSum)`, creating a new heap object. In a loop of 10 million iterations, 10 million temporary objects are allocated, thrashing the Eden space and triggering Garbage Collector latency."
      },
      {
        "question": "Explain method overloading rules when primitives, wrappers, and varargs collide.",
        "expectedAnswer": "Java overload resolution follows three distinct phases to ensure backward compatibility: 1. Exact match and Primitive Widening (e.g., int widens to long). 2. Autoboxing and Unboxing (e.g., int boxes to Integer). 3. Varargs (e.g., int...). Widening strictly takes precedence over boxing, and boxing strictly takes precedence over varargs.",
        "followUp": "Will Java widen and then autobox (e.g., int to Long)?",
        "followUpAnswer": "No. The compiler will never perform primitive widening and autoboxing in combination. An `int` can widen to `long`, or box to `Integer`, but it cannot convert to `Long`.",
        "commonMistake": "Expecting `void m(Long l)` to accept an `int` literal `m(10)`.",
        "commonMistakeAnswer": "10 is an int, which boxes to Integer, not Long. It causes a compilation error.",
        "answer": "Java overload resolution follows three distinct phases to ensure backward compatibility: 1. Exact match and Primitive Widening (e.g., int widens to long). 2. Autoboxing and Unboxing (e.g., int boxes to Integer). 3. Varargs (e.g., int...). Widening strictly takes precedence over boxing, and boxing strictly takes precedence over varargs."
      },
      {
        "question": "What happens when you compare two autoboxed values using `==`?",
        "expectedAnswer": "The `==` operator compares reference identity (memory addresses) when applied to object references, NOT numeric value equality. Because of the Integer Cache, values between -128 and 127 return the same cached object, so `==` returns true. However, for values >= 128 or <= -129, new objects are allocated, so `==` returns false. Developers must always use `.equals()` to compare wrapper values.",
        "followUp": "What happens if one operand is a primitive and the other is a wrapper?",
        "followUpAnswer": "If one operand is a primitive (e.g., `integerObj == 128`), Java unboxes the wrapper to a primitive int, and numeric value comparison is performed, returning true.",
        "commonMistake": "Assuming == works consistently on Integer wrappers because it passed unit tests with small numbers.",
        "commonMistakeAnswer": "Unit tests using numbers like 1, 2, 10 pass because of IntegerCache, but crash in production with IDs >= 128.",
        "answer": "The `==` operator compares reference identity (memory addresses) when applied to object references, NOT numeric value equality. Because of the Integer Cache, values between -128 and 127 return the same cached object, so `==` returns true. However, for values >= 128 or <= -129, new objects are allocated, so `==` returns false. Developers must always use `.equals()` to compare wrapper values."
      },
      {
        "question": "What is the difference between `list.remove(int)` and `list.remove(Object)` in `List<Integer>`?",
        "expectedAnswer": "`List<E>` defines two overloaded remove methods: `remove(int index)` which removes the element at the specified position, and `remove(Object o)` which removes the first occurrence of the specified object. If you pass a primitive `list.remove(2)`, it invokes `remove(int index)` and deletes the element at index 2. To remove the integer value 2, you must explicitly box it: `list.remove(Integer.valueOf(2))`.",
        "followUp": "Why doesn't `list.remove(2)` autobox to Integer?",
        "followUpAnswer": "Because `remove(int index)` is an exact primitive parameter match, which takes priority over boxing to Object.",
        "commonMistake": "Passing a primitive int expecting it to remove the matching numeric element.",
        "commonMistakeAnswer": "It removes by index, frequently causing `IndexOutOfBoundsException`.",
        "answer": "`List<E>` defines two overloaded remove methods: `remove(int index)` which removes the element at the specified position, and `remove(Object o)` which removes the first occurrence of the specified object. If you pass a primitive `list.remove(2)`, it invokes `remove(int index)` and deletes the element at index 2. To remove the integer value 2, you must explicitly box it: `list.remove(Integer.valueOf(2))`."
      },
      {
        "question": "How does autoboxing work with Generics and Collections?",
        "expectedAnswer": "Collections in Java store objects. When adding a primitive to a collection `list.add(10)`, the compiler automatically boxes the primitive into `Integer.valueOf(10)`. When retrieving an element into a primitive `int x = list.get(0);`, the compiler inserts a cast to `Integer` followed by an unboxing call `.intValue()`.",
        "followUp": "Can autoboxing occur during iteration in an enhanced for-loop?",
        "followUpAnswer": "Yes. In `for (int val : list)`, each element extracted from `list` (which is `Integer`) is unboxed to primitive `int`. If the list contains a null element, this throws an NPE.",
        "commonMistake": "Thinking collections can store primitives without boxing overhead.",
        "commonMistakeAnswer": "Every primitive added to standard java.util collections is boxed into a heap object.",
        "answer": "Collections in Java store objects. When adding a primitive to a collection `list.add(10)`, the compiler automatically boxes the primitive into `Integer.valueOf(10)`. When retrieving an element into a primitive `int x = list.get(0);`, the compiler inserts a cast to `Integer` followed by an unboxing call `.intValue()`."
      },
      {
        "question": "Can you unbox a null wrapper into a primitive using Optional?",
        "expectedAnswer": "Yes, using `Optional.ofNullable(wrapper).orElse(defaultValue)` is a clean, safe architectural pattern to prevent unboxing NullPointerExceptions. If the wrapper is null, it gracefully returns the primitive default (such as 0 or false) without attempting to invoke `.intValue()` on a null pointer.",
        "followUp": "What is the performance consideration of using Optional for unboxing?",
        "followUpAnswer": "Optional adds a small object allocation overhead. In performance-critical hot paths, a simple ternary `(wrapper != null ? wrapper : 0)` is zero-allocation and preferred.",
        "commonMistake": "Calling Optional.of(nullWrapper), which immediately throws NPE.",
        "commonMistakeAnswer": "Optional.of() rejects nulls; Optional.ofNullable() must be used.",
        "answer": "Yes, using `Optional.ofNullable(wrapper).orElse(defaultValue)` is a clean, safe architectural pattern to prevent unboxing NullPointerExceptions. If the wrapper is null, it gracefully returns the primitive default (such as 0 or false) without attempting to invoke `.intValue()` on a null pointer."
      },
      {
        "question": "How does the `switch` statement handle wrapper objects in modern Java?",
        "expectedAnswer": "In traditional Java switch statements, if the selector is an `Integer`, `Byte`, `Short`, or `Character`, the compiler automatically unboxes the reference by invoking `xxxValue()`. If the reference is null, an NPE is thrown immediately. In modern Java (Java 17+ / 21+) pattern matching switches, switches can explicitly match against `null` (e.g. `case null -> ...`), avoiding unexpected runtime crashes.",
        "followUp": "What happens if a traditional switch does not have a null check and receives null?",
        "followUpAnswer": "It throws NullPointerException before evaluating any cases or the default branch.",
        "commonMistake": "Assuming the `default:` branch catches null references in traditional switches.",
        "commonMistakeAnswer": "The default branch is only evaluated after successful selector evaluation; unboxing happens before any branch check.",
        "answer": "In traditional Java switch statements, if the selector is an `Integer`, `Byte`, `Short`, or `Character`, the compiler automatically unboxes the reference by invoking `xxxValue()`. If the reference is null, an NPE is thrown immediately. In modern Java (Java 17+ / 21+) pattern matching switches, switches can explicitly match against `null` (e.g. `case null -> ...`), avoiding unexpected runtime crashes."
      },
      {
        "question": "What is the impact of Autoboxing on Garbage Collection?",
        "expectedAnswer": "Autoboxing creates short-lived immutable objects on the JVM Heap. In high-throughput systems, excessive autoboxing rapidly fills the Young Generation (Eden space), causing frequent Minor Garbage Collections (Stop-The-World pauses). It also increases memory bus traffic and decreases CPU L1/L2/L3 cache efficiency due to pointer chasing.",
        "followUp": "What high-performance libraries exist to avoid autoboxing in Java?",
        "followUpAnswer": "Specialized primitive collections libraries like Eclipse Collections (Primitive Maps/Lists), Trove, fastutil, and Agrona provide zero-allocation primitive data structures.",
        "commonMistake": "Believing small objects in Java are virtually free because allocation is fast.",
        "commonMistakeAnswer": "Eden allocation is fast (pointer bump), but the cumulative cost of GC scanning, card marking, and cache misses is substantial.",
        "answer": "Autoboxing creates short-lived immutable objects on the JVM Heap. In high-throughput systems, excessive autoboxing rapidly fills the Young Generation (Eden space), causing frequent Minor Garbage Collections (Stop-The-World pauses). It also increases memory bus traffic and decreases CPU L1/L2/L3 cache efficiency due to pointer chasing."
      }
    ],
    "miniQuiz": [
      {
        "question": "What method call does `Integer x = 50;` compile into?",
        "options": [
          "new Integer(50)",
          "Integer.valueOf(50)",
          "Integer.parseInt(\"50\")",
          "Integer.box(50)"
        ],
        "correctOptionIndex": 1,
        "explanation": "Autoboxing of an int literal compiles into the static factory method Integer.valueOf(int).",
        "correctIndex": 1
      },
      {
        "question": "What method call does `int y = x;` (where x is an Integer) compile into?",
        "options": [
          "x.intValue()",
          "x.toPrimitive()",
          "Integer.unboxing(x)",
          "(int) x"
        ],
        "correctOptionIndex": 0,
        "explanation": "Unboxing an Integer to an int compiles into the virtual method call x.intValue().",
        "correctIndex": 0
      },
      {
        "question": "What happens when unboxing an Integer variable that is null?",
        "options": [
          "It evaluates to 0",
          "It throws a NullPointerException",
          "It evaluates to -1",
          "It results in a compile-time error"
        ],
        "correctOptionIndex": 1,
        "explanation": "Unboxing attempts to invoke .intValue() on the reference; calling an instance method on null throws java.lang.NullPointerException.",
        "correctIndex": 1
      },
      {
        "question": "Which conversion will cause a compile-time error?",
        "options": [
          "long l = 10;",
          "Long l = 10L;",
          "Long l = 10;",
          "Integer i = 10;"
        ],
        "correctOptionIndex": 2,
        "explanation": "Java will not perform primitive widening (int to long) and autoboxing (long to Long) in a single step. 10 is an int literal.",
        "correctIndex": 2
      },
      {
        "question": "In method overloading, which mechanism has highest priority?",
        "options": [
          "Varargs",
          "Autoboxing",
          "Primitive Widening",
          "Unboxing"
        ],
        "correctOptionIndex": 2,
        "explanation": "Primitive widening has the highest priority to preserve backwards compatibility with pre-Java 5 code.",
        "correctIndex": 2
      },
      {
        "question": "What does `Boolean b = null; if (b) {}` produce?",
        "options": [
          "Enters the if block",
          "Skips the if block",
          "Throws NullPointerException at runtime",
          "Compile error"
        ],
        "correctOptionIndex": 2,
        "explanation": "The if statement expects a primitive boolean, forcing b.booleanValue(), which throws NullPointerException because b is null.",
        "correctIndex": 2
      },
      {
        "question": "What is the result of `Integer.valueOf(100) == Integer.valueOf(100)`?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 0,
        "explanation": "100 is within the default IntegerCache range (-128 to 127), so valueOf returns the exact same cached instance.",
        "correctIndex": 0
      },
      {
        "question": "What is the result of `Integer.valueOf(200) == Integer.valueOf(200)`?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "explanation": "200 is outside the cached range (-128 to 127). valueOf allocates two distinct objects on the heap, so '==' evaluates to false.",
        "correctIndex": 1
      },
      {
        "question": "What is the output of `List<Integer> list = new ArrayList<>(); list.add(10); list.remove(0); System.out.println(list.isEmpty());`?",
        "options": [
          "false",
          "true",
          "Throws IndexOutOfBoundsException",
          "Compile error"
        ],
        "correctOptionIndex": 1,
        "explanation": "list.remove(0) invokes remove(int index), which removes the item at index 0 (which is 10). The list becomes empty, printing true.",
        "correctIndex": 1
      },
      {
        "question": "Which expression will NOT throw a NullPointerException when `Integer x = null`?",
        "options": [
          "int a = x;",
          "int b = x + 1;",
          "boolean c = (x == null);",
          "x.toString();"
        ],
        "correctOptionIndex": 2,
        "explanation": "Testing `x == null` checks reference identity and does not unbox or invoke methods on x, so it executes safely and returns true.",
        "correctIndex": 2
      },
      {
        "question": "When does autoboxing occur?",
        "options": [
          "Only at runtime by the JVM JIT",
          "At compile-time via javac bytecode insertion",
          "During garbage collection",
          "Only when using reflection"
        ],
        "correctOptionIndex": 1,
        "explanation": "Autoboxing is entirely a compile-time syntactic feature managed by javac.",
        "correctIndex": 1
      },
      {
        "question": "What happens when you execute `Double d = 10;`?",
        "options": [
          "Compiles and sets d to 10.0",
          "Compile error: incompatible types",
          "Throws ClassCastException",
          "Sets d to null"
        ],
        "correctOptionIndex": 1,
        "explanation": "10 is an int literal; Java cannot widen int to double and box to Double simultaneously. You must write Double d = 10.0; or 10.0d.",
        "correctIndex": 1
      },
      {
        "question": "In `for (int x : new Integer[]{1, null, 3}) {}`, what happens on the second iteration?",
        "options": [
          "x is set to 0",
          "Iteration skips null",
          "Throws NullPointerException",
          "Compile error"
        ],
        "correctOptionIndex": 2,
        "explanation": "The enhanced for-loop declares `int x`, which forces unboxing on each element. Unboxing the second element (null) throws NullPointerException.",
        "correctIndex": 2
      },
      {
        "question": "What is the return type of `(true ? Integer.valueOf(1) : Double.valueOf(2.0))`?",
        "options": [
          "Integer",
          "Double",
          "Number",
          "Object"
        ],
        "correctOptionIndex": 1,
        "explanation": "Binary numeric promotion unboxes both branches to primitives, unifies int and double to double, and autoboxes the result to java.lang.Double.",
        "correctIndex": 1
      },
      {
        "question": "Why does `Long sum = 0L; for(int i=0; i<1000; i++) sum += i;` degrade performance?",
        "options": [
          "It causes a stack overflow",
          "It instantiates 1000 immutable Long objects on the heap",
          "It causes deadlocks",
          "Long cannot be used in loops"
        ],
        "correctOptionIndex": 1,
        "explanation": "Because Long is immutable, each += operation unboxes, adds, and instantiates a new Long object on the heap, generating massive garbage.",
        "correctIndex": 1
      }
    ]
  },
  "integer-cache-trap": {
    "id": "integer-cache-trap",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.6",
    "title": "The Integer Cache Trap (-128 to 127)",
    "subtitle": "Flyweight caching pattern, JLS §5.1.7 specifications, -XX:AutoBoxCacheMax tuning, and reference vs value equality bugs",
    "estimatedMinutes": 12,
    "beginnerAnalogy": "In enterprise Java applications, small integers—such as loop indices, HTTP status codes, pagination offsets, and enum ordinals—constitute over 80% of all boxed numeric operations. If the JVM allocated an independent 16-to-24 byte heap object for every small integer, memory consumption and garbage collection frequency would be severe.\n\nTo optimize memory, the JVM standard library implements the Gang-of-Four Flyweight Design Pattern inside a private static nested class: java.lang.Integer.IntegerCache. When the Integer class is first initialized by the classloader, an internal array 'static final Integer cache[]' is pre-allocated on the heap, housing pre-instantiated Integer instances for all values from -128 up to +127 (inclusive). Any call to Integer.valueOf() or autoboxing within this range returns an existing pointer to this static array rather than executing a 'new' heap allocation.\n\nArchitecturally, this optimization creates a dangerous trap: comparing two Integer references using '==' produces 'true' during local testing when values remain under 128, but fails with 'false' in production when IDs, quantities, or counters cross 127. Reference equality (==) must never be used to evaluate numeric equality on wrapper types.",
    "coreExplanation": [
      "JLS §5.1.7 Caching Specification: The Java Language Specification requires that boxing conversions for values between -128 and 127 inclusive (for byte, short, int, long, and character \\u0000 to \\u007f) always return identical reference instances.",
      "Internal Array Architecture: IntegerCache initializes a static array holding 256 pre-instantiated Integer objects. When Integer.valueOf(i) is invoked, it checks `if (i >= -128 && i <= IntegerCache.high) return IntegerCache.cache[i + (-IntegerCache.low)];`.",
      "JVM Tuning Flag: The upper limit of the Integer cache can be expanded using the VM option `-XX:AutoBoxCacheMax=<size>` or system property `-Djava.lang.Integer.IntegerCache.high=<size>`. The lower bound is fixed at -128.",
      "Cache Ranges Across Wrappers: Byte (-128 to 127, fixed), Short (-128 to 127, fixed), Long (-128 to 127, fixed), Character (0 to 127, fixed), Boolean (TRUE, FALSE constants). Float and Double have NO cache due to infinite IEEE 754 representations.",
      "The Production Outage Bug: When entities or records with IDs < 128 are tested with `obj1.getId() == obj2.getId()`, the test passes because both references share the same cached object. In production, as soon as entity ID reaches 128, the test evaluates to false, causing silent data corruption or authorization bypass.",
      "Reflection Vulnerability: In Java versions prior to Java 9 modules, reflection could mutate the private final value inside IntegerCache array elements, corrupting basic arithmetic system-wide (e.g. making 1 + 1 equal 3)."
    ],
    "diagram": "================ THE INTEGER CACHE ARCHITECTURE (FLYWEIGHT PATTERN) ================\n\n  HEAP MEMORY (Static Classloader Space):\n  IntegerCache.cache[] array (Pre-allocated at startup: 256 instances)\n  Index:   [0]      ...   [128]    [129]   ...   [255]\n  Value:  [-128]    ...    [0]      [1]    ...   [127]\n            ^               ^        ^             ^\n            |               |        |             |\n  Integer a = 127; ---------+--------+             |\n  Integer b = 127; --------------------------------+ (Points to SAME object: a == b is TRUE)\n\n  BEYOND CACHE (> 127):\n  Integer x = 128; =====> [NEW Heap Object @ 0x7A10 (value=128)]\n  Integer y = 128; =====> [NEW Heap Object @ 0x9B24 (value=128)]\n                          (Distinct heap addresses: x == y is FALSE!)\n=====================================================================================",
    "codeSnippet": {
      "title": "Demonstrating the Integer Cache Boundary and Equality Pitfall",
      "code": "public class IntegerCacheDemo {\n    public static void main(String[] args) {\n        // 1. Within default cache bounds [-128, 127]\n        Integer a = 127;\n        Integer b = 127;\n        System.out.println(\"127 == 127: \" + (a == b));             // true\n        System.out.println(\"127 .equals 127: \" + a.equals(b));      // true\n        \n        // 2. Crossing the boundary (128)\n        Integer c = 128;\n        Integer d = 128;\n        System.out.println(\"128 == 128: \" + (c == d));             // FALSE! (Trap)\n        System.out.println(\"128 .equals 128: \" + c.equals(d));      // true (Safe)\n        \n        // 3. Forcing new allocation bypasses cache completely\n        Integer e = new Integer(127); // Deprecated\n        System.out.println(\"Cached vs new: \" + (a == e));          // false\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "Integer a = 127; Integer b = 127;",
          "explanation": "Both variables receive the cached reference from IntegerCache.cache[255]."
        },
        {
          "line": "(a == b)",
          "explanation": "Compares reference memory addresses. Since both point to the same cached instance, returns true."
        },
        {
          "line": "Integer c = 128; Integer d = 128;",
          "explanation": "128 exceeds upper bound 127; Integer.valueOf allocates two separate heap objects."
        },
        {
          "line": "(c == d)",
          "explanation": "Compares distinct heap memory addresses, returning false despite identical numeric values."
        },
        {
          "line": "c.equals(d)",
          "explanation": "Invokes Integer.equals, which compares primitive numeric int values, safely returning true."
        }
      ],
      "output": "127 == 127: true\n127 .equals 127: true\n128 == 128: false\n128 .equals 128: true\nCached vs new: false"
    },
    "codeExamples": [
      {
        "title": "Other Wrapper Caching Behaviors",
        "description": "Comparison of caching mechanisms across Byte, Short, Character, Long, and Double.",
        "code": "public class CacheAcrossTypes {\n    public static void main(String[] args) {\n        // Byte: -128 to 127 cached\n        Byte b1 = 50, b2 = 50;\n        System.out.println(\"Byte cached: \" + (b1 == b2)); // true\n        \n        // Character: 0 to 127 cached\n        Character c1 = 127, c2 = 127;\n        Character c3 = 128, c4 = 128;\n        System.out.println(\"Char 127: \" + (c1 == c2));    // true\n        System.out.println(\"Char 128: \" + (c3 == c4));    // false\n        \n        // Double: NEVER cached\n        Double d1 = 1.0, d2 = 1.0;\n        System.out.println(\"Double 1.0: \" + (d1 == d2));  // false!\n    }\n}",
        "explanation": "Double and Float do not implement caching because an infinite number of floating-point values exist even in a narrow range. Every autoboxed Double creates a new heap object."
      },
      {
        "title": "Production Bug: User Session ID Comparison",
        "description": "A classic authorization vulnerability caused by using '==' on boxed IDs.",
        "code": "public class SecurityCheck {\n    public static boolean hasAccess(Integer currentUserId, Integer targetUserId) {\n        // DANGEROUS DEFECT: Uses == on wrapper objects!\n        return currentUserId == targetUserId;\n    }\n\n    public static void main(String[] args) {\n        // Passes test for low user IDs\n        System.out.println(hasAccess(10, 10));     // true (Test passes!)\n        // Fails in production for higher user IDs\n        System.out.println(hasAccess(1000, 1000)); // false (Production outage!)\n    }\n}",
        "explanation": "The developer wrote unit tests with test user ID 10, which passed due to IntegerCache. In production, real user ID 1000 failed authentication because == compared distinct heap addresses."
      }
    ],
    "cheatSheet": {
      "summary": "IntegerCache pre-instantiates Integer objects from -128 to 127. Never use '==' to compare wrapper objects; always use .equals() or unbox to primitives.",
      "rules": [
        {
          "rule": "Default cached range for Integer, Byte, Short, and Long is -128 to +127.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Character caches Unicode values \\u0000 to \\u007f (0 to 127).",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Double and Float have NO caching mechanism at all.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Only Integer supports runtime cache tuning via -XX",
          "explanation": "AutoBoxCacheMax=<n>."
        },
        {
          "rule": "ALWAYS compare wrapper objects using .equals() or Objects.equals(a, b).",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Using 'new Integer()' explicitly bypasses the cache and creates a redundant object.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Range Cached",
          "optionA": "Integer/Byte/Short/Long: -128 to 127",
          "optionB": "Character: 0 to 127; Double/Float: None"
        },
        {
          "aspect": "Comparison via ==",
          "optionA": "Inside cache: Returns true (same object)",
          "optionB": "Outside cache: Returns false (distinct objects)"
        },
        {
          "aspect": "Safe Comparison",
          "optionA": "a.equals(b) or Objects.equals(a, b)",
          "optionB": "a.intValue() == b.intValue()"
        },
        {
          "aspect": "Configurability",
          "optionA": "-XX:AutoBoxCacheMax tunes high bound",
          "optionB": "Lower bound is permanently -128"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Using '==' to compare wrapper objects in unit tests and assuming it works in production.",
        "whyItHappens": "Unit tests use simple numbers (1, 2, 5) which fall into the IntegerCache, creating the illusion that == performs value equality.",
        "howToFix": "Always use Objects.equals(a, b) or a.equals(b).",
        "codeSnippet": "// WRONG: passes unit test with 1, fails in prod with 500\nif (orderId1 == orderId2) { ... }\n// RIGHT\nif (Objects.equals(orderId1, orderId2)) { ... }"
      },
      {
        "mistake": "Assuming Double or Float caches values like 0.0 or 1.0.",
        "whyItHappens": "Extrapolating Integer caching behavior to floating-point wrappers.",
        "howToFix": "Recognize that Double.valueOf(1.0) == Double.valueOf(1.0) is always false.",
        "codeSnippet": "Double d1 = 1.0;\nDouble d2 = 1.0;\nSystem.out.println(d1 == d2); // ALWAYS FALSE!"
      }
    ],
    "practiceProblems": [
      {
        "title": "Integer Cache Boundary Condition",
        "problemStatement": "What is the output of the following program?\n```java\nInteger a = -128;\nInteger b = -128;\nInteger c = -129;\nInteger d = -129;\nSystem.out.println((a == b) + \" \" + (c == d));\n```",
        "options": [
          "true true",
          "true false",
          "false false",
          "false true"
        ],
        "correctOptionIndex": 1,
        "hint": "What is the lower bound of the integer cache specified by JLS?",
        "solution": "true false",
        "explanation": "The integer cache covers -128 to 127 inclusive. -128 is cached, so a == b is true. -129 is strictly below the cache minimum, so c and d are separate heap objects, and c == d evaluates to false."
      },
      {
        "title": "Mixed Constructor and Autoboxing Equality",
        "problemStatement": "What is printed by:\n```java\nInteger x = 50;\nInteger y = Integer.valueOf(50);\nInteger z = new Integer(50);\nSystem.out.println((x == y) + \" \" + (x == z));\n```",
        "options": [
          "true true",
          "true false",
          "false false",
          "false true"
        ],
        "correctOptionIndex": 1,
        "hint": "Autoboxing calls Integer.valueOf(). Does 'new Integer()' check the cache?",
        "solution": "true false",
        "explanation": "Autoboxing `x = 50` calls Integer.valueOf(50), which returns the cached instance. `y` also retrieves that cached instance, so `x == y` is true. `new Integer(50)` explicitly forces a new heap allocation, bypassing the cache, so `x == z` is false."
      },
      {
        "title": "Character Cache Boundary",
        "problemStatement": "Given:\n```java\nCharacter c1 = 127;\nCharacter c2 = 127;\nCharacter c3 = 128;\nCharacter c4 = 128;\nSystem.out.println((c1 == c2) + \":\" + (c3 == c4));\n```\nWhat is the output?",
        "options": [
          "true:true",
          "true:false",
          "false:false",
          "false:true"
        ],
        "correctOptionIndex": 1,
        "hint": "What is the cached range for Character?",
        "solution": "true:false",
        "explanation": "CharacterCache caches characters with code points from 0 to 127 (\\u0000 to \\u007f). 127 is within the cache (true), while 128 is outside the cache (false)."
      },
      {
        "title": "Primitive vs Boxed Comparison with 128",
        "problemStatement": "What is printed by:\n```java\nInteger a = 128;\nint b = 128;\nSystem.out.println(a == b);\n```",
        "options": [
          "false",
          "true",
          "Compilation error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "When one side of '==' is a primitive int and the other is an Integer wrapper, what happens?",
        "solution": "true",
        "explanation": "When comparing a primitive with a wrapper using '==', the wrapper is automatically unboxed to a primitive int. The comparison becomes primitive `128 == 128`, which evaluates to true."
      },
      {
        "title": "Long Cache vs Integer Cache Comparison",
        "problemStatement": "What does the following snippet print?\n```java\nInteger i = 100;\nLong l = 100L;\nSystem.out.println(i.equals(l));\n```",
        "options": [
          "true",
          "false",
          "Compilation error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "Check the implementation of Integer.equals(Object obj). Does it check instanceof Integer?",
        "solution": "false",
        "explanation": "The implementation of Integer.equals(Object obj) begins with `if (obj instanceof Integer)`. Because `l` is an instance of `Long` and not `Integer`, equals() immediately returns false without comparing the numeric values."
      },
      {
        "title": "Float and Double Caching Existence",
        "problemStatement": "What is the output of:\n```java\nFloat f1 = 0.0f;\nFloat f2 = 0.0f;\nSystem.out.println(f1 == f2);\n```",
        "options": [
          "true",
          "false",
          "Compilation error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Do Float and Double maintain a cache for 0.0?",
        "solution": "false",
        "explanation": "Neither Float nor Double has a Flyweight cache. Float.valueOf(0.0f) allocates a new Float object on each call, so f1 == f2 compares distinct memory addresses, returning false."
      },
      {
        "title": "Arithmetic Expression Inside Comparison",
        "problemStatement": "What is printed by:\n```java\nInteger a = 1000;\nInteger b = 1000;\nSystem.out.println((a == b) + \" \" + (a == b + 0));\n```",
        "options": [
          "false false",
          "false true",
          "true true",
          "true false"
        ],
        "correctOptionIndex": 1,
        "hint": "The '+' operator in `b + 0` forces unboxing. What does that do to the '==' comparison?",
        "solution": "false true",
        "explanation": "`a == b` compares two Integer object references outside the cache, returning false. In `a == b + 0`, the arithmetic operator '+' forces unboxing of 'b', evaluating to primitive 1000. Comparing wrapper 'a' with primitive 1000 forces 'a' to unbox, comparing primitive `1000 == 1000`, which is true."
      },
      {
        "title": "Short Cache Behavior",
        "problemStatement": "What is the output of:\n```java\nShort s1 = 10;\nShort s2 = 10;\nSystem.out.println(s1 == s2);\n```",
        "options": [
          "false",
          "true",
          "Compilation error: cannot convert int to Short",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "Short caches -128 to 127, and 10 is an integer literal within byte/short range.",
        "solution": "true",
        "explanation": "JLS allows narrowing of constant expressions to Short, followed by autoboxing via Short.valueOf(). Short maintains a static cache for -128 to 127, so s1 and s2 point to the same cached instance, returning true."
      },
      {
        "title": "Integer.valueOf vs String Parsing Cache",
        "problemStatement": "Given:\n```java\nInteger i1 = Integer.valueOf(\"127\");\nInteger i2 = Integer.valueOf(127);\nSystem.out.println(i1 == i2);\n```\nWhat is the output?",
        "options": [
          "true",
          "false",
          "Throws NumberFormatException",
          "Compilation error"
        ],
        "correctOptionIndex": 0,
        "hint": "How is Integer.valueOf(String s) implemented internally?",
        "solution": "true",
        "explanation": "Integer.valueOf(String s) is implemented as `return Integer.valueOf(parseInt(s, 10))`. It delegates directly to Integer.valueOf(int), which uses the IntegerCache. Thus both i1 and i2 return the identical cached instance for 127."
      },
      {
        "title": "AutoBoxCacheMax Property Impact",
        "problemStatement": "If a JVM is launched with `-Djava.lang.Integer.IntegerCache.high=500`, what does `Integer.valueOf(300) == Integer.valueOf(300)` return?",
        "options": [
          "false",
          "true",
          "Throws IllegalArgumentException",
          "JVM fails to boot"
        ],
        "correctOptionIndex": 1,
        "hint": "Does tuning IntegerCache.high expand the cached range above 127?",
        "solution": "true",
        "explanation": "The `-Djava.lang.Integer.IntegerCache.high=500` (or `-XX:AutoBoxCacheMax=500`) property configures the upper bound of the Integer cache to 500. Since 300 is <= 500, valueOf(300) returns cached instances, making '==' evaluate to true."
      }
    ],
    "interviewQuestions": [
      {
        "question": "What is the Integer Cache in Java, and why was it introduced?",
        "expectedAnswer": "The Integer Cache is an implementation of the Flyweight Design Pattern in java.lang.Integer.IntegerCache. It pre-allocates an array of Integer objects for values in the range -128 to +127 during class loading. It was introduced in Java 5 to optimize memory and minimize garbage collection overhead caused by frequent autoboxing of common small integers (e.g. loop counters, array indices, status flags).",
        "followUp": "Can the range of the Integer Cache be modified?",
        "followUpAnswer": "Yes, the upper bound can be adjusted using the JVM argument `-XX:AutoBoxCacheMax=<size>` or system property `-Djava.lang.Integer.IntegerCache.high=<size>`. The lower bound is fixed at -128 according to the JLS and cannot be changed.",
        "commonMistake": "Thinking the cache covers 0 to 255 or 0 to 127.",
        "commonMistakeAnswer": "The cache range is -128 to +127 (one signed byte range).",
        "answer": "The Integer Cache is an implementation of the Flyweight Design Pattern in java.lang.Integer.IntegerCache. It pre-allocates an array of Integer objects for values in the range -128 to +127 during class loading. It was introduced in Java 5 to optimize memory and minimize garbage collection overhead caused by frequent autoboxing of common small integers (e.g. loop counters, array indices, status flags)."
      },
      {
        "question": "Why does `Integer a = 127; Integer b = 127; a == b` evaluate to true, while `Integer a = 128; Integer b = 128; a == b` evaluates to false?",
        "expectedAnswer": "Autoboxing invokes `Integer.valueOf()`. For 127, the value falls inside the default IntegerCache range [-128, 127], returning the exact same cached reference from `IntegerCache.cache`, so `a == b` compares identical heap addresses (true). For 128, the value exceeds the cache range, so `Integer.valueOf(128)` instantiates two distinct `new Integer(128)` objects on the heap. Because `==` on objects compares memory addresses, `a == b` evaluates to false.",
        "followUp": "How do you safely compare two Integer objects for value equality?",
        "followUpAnswer": "Always use `.equals()`: `a.equals(b)` or `java.util.Objects.equals(a, b)` which handles null references safely.",
        "commonMistake": "Assuming `==` compares numeric values for wrapper types.",
        "commonMistakeAnswer": "`==` always compares object references (memory pointers) unless one operand is a primitive.",
        "answer": "Autoboxing invokes `Integer.valueOf()`. For 127, the value falls inside the default IntegerCache range [-128, 127], returning the exact same cached reference from `IntegerCache.cache`, so `a == b` compares identical heap addresses (true). For 128, the value exceeds the cache range, so `Integer.valueOf(128)` instantiates two distinct `new Integer(128)` objects on the heap. Because `==` on objects compares memory addresses, `a == b` evaluates to false."
      },
      {
        "question": "Which Java wrapper classes have an internal cache and what are their ranges?",
        "expectedAnswer": "The cached wrapper types are: 1. Byte: -128 to 127 (entire range cached, fixed). 2. Short: -128 to 127 (fixed). 3. Integer: -128 to 127 (configurable upper bound via AutoBoxCacheMax). 4. Long: -128 to 127 (fixed). 5. Character: 0 to 127 (\\u0000 to \\u007f, fixed). 6. Boolean: Boolean.TRUE and Boolean.FALSE (fixed). Float and Double have NO cache.",
        "followUp": "Why don't Float and Double have caches?",
        "followUpAnswer": "Floating-point numbers represent continuous real numbers. Even between 0.0 and 1.0, there are billions of possible IEEE 754 float representations; caching them is impossible and computationally meaningless.",
        "commonMistake": "Assuming Long cache can also be configured like Integer cache.",
        "commonMistakeAnswer": "Only java.lang.Integer supports runtime cache size tuning; Long cache is strictly hardcoded to -128..127.",
        "answer": "The cached wrapper types are: 1. Byte: -128 to 127 (entire range cached, fixed). 2. Short: -128 to 127 (fixed). 3. Integer: -128 to 127 (configurable upper bound via AutoBoxCacheMax). 4. Long: -128 to 127 (fixed). 5. Character: 0 to 127 (\\u0000 to \\u007f, fixed). 6. Boolean: Boolean.TRUE and Boolean.FALSE (fixed). Float and Double have NO cache."
      },
      {
        "question": "What happens if you compare an Integer with a primitive int using `==`?",
        "expectedAnswer": "When comparing an `Integer` wrapper with a primitive `int` using `==`, the Java compiler automatically unboxes the wrapper by calling its `intValue()` method. The operation becomes a primitive comparison of numeric binary values, so `Integer.valueOf(500) == 500` evaluates to true.",
        "followUp": "What is the danger of this comparison if the Integer reference is null?",
        "followUpAnswer": "If the Integer reference is null, the unboxing attempt `nullRef.intValue()` throws a runtime NullPointerException.",
        "commonMistake": "Thinking the primitive int is boxed to compare references.",
        "commonMistakeAnswer": "The wrapper is always unboxed to primitive; primitives are never boxed for comparison operators.",
        "answer": "When comparing an `Integer` wrapper with a primitive `int` using `==`, the Java compiler automatically unboxes the wrapper by calling its `intValue()` method. The operation becomes a primitive comparison of numeric binary values, so `Integer.valueOf(500) == 500` evaluates to true."
      },
      {
        "question": "Explain how using `==` instead of `.equals()` on boxed IDs creates production bugs.",
        "expectedAnswer": "In enterprise databases, entity IDs often start at 1 and increment. In automated test environments with small datasets, IDs remain under 128. Comparisons like `user.getId() == currentUserId` evaluate to true in tests because of the Integer Cache. In production, as soon as entity IDs reach 128, `==` evaluates to false for identical IDs, causing authorization failures, data duplication, or silent processing errors.",
        "followUp": "How can static analysis tools help prevent this?",
        "followUpAnswer": "Static analysis tools like SonarQube, SpotBugs, and ErrorProne flag the usage of `==` on wrapper types as high-severity bugs (e.g. 'BoxedValueEquality' violation).",
        "commonMistake": "Assuming that high test coverage guarantees freedom from wrapper comparison bugs.",
        "commonMistakeAnswer": "Test coverage will pass 100% if test fixture IDs are within the cache range [-128, 127].",
        "answer": "In enterprise databases, entity IDs often start at 1 and increment. In automated test environments with small datasets, IDs remain under 128. Comparisons like `user.getId() == currentUserId` evaluate to true in tests because of the Integer Cache. In production, as soon as entity IDs reach 128, `==` evaluates to false for identical IDs, causing authorization failures, data duplication, or silent processing errors."
      },
      {
        "question": "What does `Integer.valueOf(\"100\") == Integer.valueOf(\"100\")` evaluate to?",
        "expectedAnswer": "It evaluates to true. `Integer.valueOf(String s)` internally calls `parseInt(s)` to extract the primitive int value, and then returns `Integer.valueOf(int)`. Since 100 is within the -128 to 127 range, both calls retrieve the identical cached instance from IntegerCache.",
        "followUp": "Does `new Integer(\"100\") == new Integer(\"100\")` evaluate to true?",
        "followUpAnswer": "No, it evaluates to false because using the `new` operator guarantees that the JVM allocates two separate objects on the heap, bypassing the cache.",
        "commonMistake": "Believing String parsing bypasses the IntegerCache.",
        "commonMistakeAnswer": "valueOf(String) explicitly delegates to valueOf(int), utilizing the cache.",
        "answer": "It evaluates to true. `Integer.valueOf(String s)` internally calls `parseInt(s)` to extract the primitive int value, and then returns `Integer.valueOf(int)`. Since 100 is within the -128 to 127 range, both calls retrieve the identical cached instance from IntegerCache."
      },
      {
        "question": "Can two different wrapper types be equal using `.equals()` (e.g. Integer 100 and Long 100)?",
        "expectedAnswer": "No. In Java, all wrapper `equals()` methods first verify type identity: `if (obj instanceof Integer)`. Because `Long` is not an `Integer`, `Integer.valueOf(100).equals(Long.valueOf(100L))` returns false immediately, even though their numeric values are identical.",
        "followUp": "How do you compare numeric equality across different wrapper types?",
        "followUpAnswer": "You can compare their unboxed primitive values, e.g. `intObj.longValue() == longObj.longValue()`, or cast them to primitives before comparison.",
        "commonMistake": "Expecting `Integer.valueOf(1).equals(Short.valueOf((short)1))` to be true.",
        "commonMistakeAnswer": "equals() between different wrapper classes is always false.",
        "answer": "No. In Java, all wrapper `equals()` methods first verify type identity: `if (obj instanceof Integer)`. Because `Long` is not an `Integer`, `Integer.valueOf(100).equals(Long.valueOf(100L))` returns false immediately, even though their numeric values are identical."
      },
      {
        "question": "Why is the lower bound of IntegerCache fixed at -128 and not configurable?",
        "expectedAnswer": "The lower bound of -128 is specified directly by the Java Language Specification (JLS §5.1.7) to match the minimum value of a signed 8-bit byte. Hardcoding the lower bound allows the JVM to simplify indexing calculations: index is simply `i + 128` (or `i - low`), avoiding dynamic variable bounds checks on the negative side during critical path classloader initialization.",
        "followUp": "What happens if -XX:AutoBoxCacheMax is set to a value smaller than 127?",
        "followUpAnswer": "The JVM ignores values below 127 and clamps the upper bound to 127 to guarantee JLS compliance.",
        "commonMistake": "Thinking you can configure the lower bound using a JVM argument.",
        "commonMistakeAnswer": "There is no JVM property to alter the lower bound; it is strictly locked at -128.",
        "answer": "The lower bound of -128 is specified directly by the Java Language Specification (JLS §5.1.7) to match the minimum value of a signed 8-bit byte. Hardcoding the lower bound allows the JVM to simplify indexing calculations: index is simply `i + 128` (or `i - low`), avoiding dynamic variable bounds checks on the negative side during critical path classloader initialization."
      },
      {
        "question": "How did Java 9 modules mitigate the historical reflection attack on IntegerCache?",
        "expectedAnswer": "Prior to Java 9, developers could use reflection to set accessible on `IntegerCache.cache`, obtain the underlying array, and mutate cached values (e.g. setting cache[128 + 1] = 42), causing any autoboxed 1 to evaluate to 42 system-wide. Java 9 introduced the JPMS (Java Platform Module System) and strong encapsulation. Internal JVM packages like `java.lang` are closed by default, preventing unauthorized reflective access (`InaccessibleObjectException`) without explicit `--add-opens` flags.",
        "followUp": "Is modifying IntegerCache ever legitimate in production?",
        "followUpAnswer": "Never. It breaks the fundamental assumption of wrapper immutability and corrupts hash structures, timers, and security managers across the entire JVM.",
        "commonMistake": "Believing `private final` prevents reflective field modification in older Java versions.",
        "commonMistakeAnswer": "In pre-Java 9, `Field.setAccessible(true)` could overwrite private final fields unless restricted by a SecurityManager.",
        "answer": "Prior to Java 9, developers could use reflection to set accessible on `IntegerCache.cache`, obtain the underlying array, and mutate cached values (e.g. setting cache[128 + 1] = 42), causing any autoboxed 1 to evaluate to 42 system-wide. Java 9 introduced the JPMS (Java Platform Module System) and strong encapsulation. Internal JVM packages like `java.lang` are closed by default, preventing unauthorized reflective access (`InaccessibleObjectException`) without explicit `--add-opens` flags."
      },
      {
        "question": "How does `Objects.equals(a, b)` handle wrapper equality safely?",
        "expectedAnswer": "`java.util.Objects.equals(Object a, Object b)` is implemented as `return (a == b) || (a != null && a.equals(b));`. It first performs a reference check (which immediately handles both being the same instance or both being null), and then calls `a.equals(b)` if `a` is not null. This eliminates both unboxing NullPointerExceptions and reference comparison bugs.",
        "followUp": "Does `Objects.equals` allow comparing an Integer and a Long?",
        "followUpAnswer": "It allows the call without syntax error, but it still delegates to `Integer.equals(Long)` which returns false.",
        "commonMistake": "Using `a.equals(b)` without checking if `a` is null.",
        "commonMistakeAnswer": "Calling `a.equals(b)` throws NullPointerException if `a` is null; `Objects.equals(a, b)` is null-safe.",
        "answer": "`java.util.Objects.equals(Object a, Object b)` is implemented as `return (a == b) || (a != null && a.equals(b));`. It first performs a reference check (which immediately handles both being the same instance or both being null), and then calls `a.equals(b)` if `a` is not null. This eliminates both unboxing NullPointerExceptions and reference comparison bugs."
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the default range of the Java Integer cache?",
        "options": [
          "0 to 255",
          "-128 to 127",
          "0 to 127",
          "-32768 to 32767"
        ],
        "correctOptionIndex": 1,
        "explanation": "The default Integer cache range specified by JLS §5.1.7 is -128 to +127.",
        "correctIndex": 1
      },
      {
        "question": "Which design pattern is utilized by the JVM IntegerCache?",
        "options": [
          "Singleton Pattern",
          "Flyweight Pattern",
          "Factory Method Pattern",
          "Prototype Pattern"
        ],
        "correctOptionIndex": 1,
        "explanation": "IntegerCache implements the Flyweight Pattern to minimize memory usage by sharing pre-allocated immutable objects.",
        "correctIndex": 1
      },
      {
        "question": "What does `Integer.valueOf(127) == Integer.valueOf(127)` return?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 0,
        "explanation": "127 is within the cache range [-128, 127], so both calls return the identical object reference, evaluating to true.",
        "correctIndex": 0
      },
      {
        "question": "What does `Integer.valueOf(128) == Integer.valueOf(128)` return by default?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 1,
        "explanation": "128 exceeds the default upper bound of 127, so two distinct objects are created on the heap, making == false.",
        "correctIndex": 1
      },
      {
        "question": "Which JVM argument allows expanding the upper bound of the Integer cache?",
        "options": [
          "-XX:MaxIntegerCache=<size>",
          "-XX:AutoBoxCacheMax=<size>",
          "-XmsIntegerCache",
          "-XX:IntegerPoolSize=<size>"
        ],
        "correctOptionIndex": 1,
        "explanation": "-XX:AutoBoxCacheMax=<size> configures the high limit of the java.lang.Integer.IntegerCache.",
        "correctIndex": 1
      },
      {
        "question": "Which wrapper class does NOT implement a value cache?",
        "options": [
          "Byte",
          "Short",
          "Character",
          "Double"
        ],
        "correctOptionIndex": 3,
        "explanation": "Double and Float have no caching mechanism because floating-point values represent infinite continuous intervals.",
        "correctIndex": 3
      },
      {
        "question": "What is the cached range for the `Character` wrapper?",
        "options": [
          "0 to 127",
          "-128 to 127",
          "0 to 255",
          "0 to 65535"
        ],
        "correctOptionIndex": 0,
        "explanation": "CharacterCache caches ASCII characters from \\u0000 to \\u007f (decimal 0 to 127).",
        "correctIndex": 0
      },
      {
        "question": "What is the result of `new Integer(10) == Integer.valueOf(10)`?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Using 'new' explicitly allocates a new object on the heap, bypassing the cache, so reference addresses differ (false).",
        "correctIndex": 1
      },
      {
        "question": "What happens when evaluating `Integer.valueOf(200).equals(Integer.valueOf(200))`?",
        "options": [
          "Evaluates to false",
          "Evaluates to true",
          "Throws NullPointerException",
          "Compile error"
        ],
        "correctOptionIndex": 1,
        "explanation": "The equals() method checks primitive numeric value equality, returning true regardless of whether values are cached.",
        "correctIndex": 1
      },
      {
        "question": "What is the result of `Integer.valueOf(10).equals(Long.valueOf(10L))`?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Integer.equals() checks if the argument is an instance of Integer. Since Long is not an Integer, it returns false.",
        "correctIndex": 1
      },
      {
        "question": "What is printed by `Integer a = 1000; int b = 1000; System.out.println(a == b);`?",
        "options": [
          "false",
          "true",
          "Compilation error",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 1,
        "explanation": "Comparing a wrapper with a primitive unboxes the wrapper to primitive int; 1000 == 1000 evaluates to true.",
        "correctIndex": 1
      },
      {
        "question": "Can the lower bound (-128) of the Integer cache be changed via JVM flags?",
        "options": [
          "Yes, via -XX:AutoBoxCacheMin",
          "Yes, via -Djava.lang.Integer.low",
          "No, it is strictly fixed at -128 by the JLS",
          "Yes, if using 64-bit JVM"
        ],
        "correctOptionIndex": 2,
        "explanation": "The lower bound is fixed at -128 by the Java Language Specification and cannot be configured.",
        "correctIndex": 2
      },
      {
        "question": "What does `Boolean.valueOf(true) == Boolean.valueOf(true)` evaluate to?",
        "options": [
          "true",
          "false",
          "Compile error",
          "Undefined"
        ],
        "correctOptionIndex": 0,
        "explanation": "Boolean caches Boolean.TRUE and Boolean.FALSE statically; valueOf(true) always returns Boolean.TRUE, evaluating to true.",
        "correctIndex": 0
      },
      {
        "question": "Why is testing `order.getId() == targetId` dangerous when IDs are Integer wrappers?",
        "options": [
          "It causes a stack overflow error",
          "It passes for IDs <= 127 in tests but fails for IDs >= 128 in production",
          "It converts IDs to hex numbers",
          "Wrappers cannot be compared in if statements"
        ],
        "correctOptionIndex": 1,
        "explanation": "Small IDs <= 127 pass equality tests due to IntegerCache, but IDs >= 128 fail because == compares memory addresses.",
        "correctIndex": 1
      },
      {
        "question": "What is the recommended null-safe way to compare two wrapper objects?",
        "options": [
          "a == b",
          "Objects.equals(a, b)",
          "a.compareTo(b) == 0",
          "a.intValue() == b.intValue()"
        ],
        "correctOptionIndex": 1,
        "explanation": "Objects.equals(a, b) safely checks for null on both parameters and invokes a.equals(b) without throwing NullPointerException.",
        "correctIndex": 1
      }
    ]
  },
  "floating-point-bigdecimal": {
    "id": "floating-point-bigdecimal",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.7",
    "title": "Floating-Point Precision & BigDecimal",
    "subtitle": "IEEE 754 representation, recurring binary fractions (0.1 + 0.2 != 0.3), arbitrary-precision math, constructor traps, and scale management",
    "estimatedMinutes": 12,
    "beginnerAnalogy": "In decimal mathematics (base-10), dividing 1 by 3 produces 0.333333... recurring infinitely. No finite sequence of decimal digits can represent 1/3 exactly. Modern computer hardware represents floating-point numbers (float and double) using IEEE 754 binary arithmetic (base-2).\n\nIn binary, a fraction can only be represented with finite precision if its denominator is a power of 2 (such as 1/2 = 0.1_2, 1/4 = 0.01_2, 1/8 = 0.001_2). Ordinary decimal fractions whose denominators contain factors other than 2—such as 0.1 (1/10) and 0.2 (2/10 = 1/5)—become infinite recurring fractions in base-2 binary: 0.0001100110011... When rounded to fit inside a 64-bit double register (52 mantissa bits), rounding errors accumulate, causing expressions like `0.1 + 0.2` to evaluate to `0.30000000000000004` rather than `0.3`.\n\nArchitecturally, using float or double for monetary transactions, taxation, currency exchange, or scientific metering results in legal compliance violations and severe financial reconciliation discrepancies. Java provides `java.math.BigDecimal` to deliver exact, arbitrary-precision decimal mathematics with deterministic rounding modes.",
    "coreExplanation": [
      "IEEE 754 Binary Representation: float (32 bits: 1 sign, 8 exponent, 23 mantissa) and double (64 bits: 1 sign, 11 exponent, 52 mantissa). Base-2 cannot represent numbers like 0.1 without truncation error.",
      "The Fundamental Equality Trap: In primitive double arithmetic, `0.1 + 0.2 == 0.3` evaluates strictly to `false`. Never use `==` to compare floating-point numbers.",
      "BigDecimal Internal Architecture: A BigDecimal consists of an arbitrary-precision integer unscaled value (`BigInteger`) and a 32-bit integer `scale` representing the number of digits to the right of the decimal point (Value = unscaledValue * 10^-scale).",
      "The Dangerous Constructor Trap: `new BigDecimal(0.1)` takes the already-imprecise IEEE 754 double value and preserves its exact binary error (0.1000000000000000055511151231257827021181583404541015625). Always use `new BigDecimal(\"0.1\")` or `BigDecimal.valueOf(0.1)`.",
      "The equals() vs compareTo() Trap: In BigDecimal, `equals()` compares both numeric value AND scale. Therefore, `new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))` is `false`! To compare numeric value independently of scale, always use `compareTo() == 0`.",
      "Non-Terminating Division: Dividing BigDecimals where the quotient is a non-terminating decimal (e.g. 1 / 3) throws `ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.` unless an explicit `RoundingMode` and scale are provided."
    ],
    "diagram": "================ IEEE 754 BINARY ERROR VS BIGDECIMAL PRECISION ================\n\n  BASE-10 (Decimal): 1/10 = 0.1 (Finite)\n  BASE-2  (Binary):  1/10 = 0.000110011001100110011001100110011... (INFINITE RECURRING!)\n\n  DOUBLE (64-bit IEEE 754 Register):\n  Truncated at 53 bits ===> 0.1000000000000000055511151231257827...\n  0.1 + 0.2           ===> 0.3000000000000000444089209850062616...\n  (0.1 + 0.2 == 0.3)  ===> FALSE!\n\n  JAVA BIGDECIMAL ARCHITECTURE (Arbitrary Exact Precision):\n  new BigDecimal(\"0.1\"):  [ unscaledValue = 1 ]  [ scale = 1 ]   (1 * 10^-1 = 0.1)\n  new BigDecimal(\"0.2\"):  [ unscaledValue = 2 ]  [ scale = 1 ]   (2 * 10^-1 = 0.2)\n  a.add(b):               [ unscaledValue = 3 ]  [ scale = 1 ]   (3 * 10^-1 = 0.3 EXACT)\n=================================================================================",
    "codeSnippet": {
      "title": "Floating-Point Imprecision vs BigDecimal Solution",
      "code": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\npublic class PrecisionDemo {\n    public static void main(String[] args) {\n        // 1. IEEE 754 Binary Double Imprecision\n        double d1 = 0.1;\n        double d2 = 0.2;\n        System.out.println(\"0.1 + 0.2 = \" + (d1 + d2)); // 0.30000000000000004\n        System.out.println(\"d1 + d2 == 0.3: \" + (d1 + d2 == 0.3)); // false\n        \n        // 2. The BigDecimal Constructor Trap\n        BigDecimal bad = new BigDecimal(0.1); // IMPORTS DOUBLE IMPRECISION!\n        BigDecimal good = new BigDecimal(\"0.1\"); // EXACT DECIMAL\n        BigDecimal viaFactory = BigDecimal.valueOf(0.1); // Also safe\n        System.out.println(\"bad: \" + bad);\n        System.out.println(\"good: \" + good);\n        \n        // 3. Exact Arithmetic with BigDecimal\n        BigDecimal b1 = new BigDecimal(\"0.1\");\n        BigDecimal b2 = new BigDecimal(\"0.2\");\n        BigDecimal sum = b1.add(b2);\n        System.out.println(\"BigDecimal Sum: \" + sum); // 0.3\n        \n        // 4. Safe Division with Scale and RoundingMode\n        BigDecimal one = BigDecimal.ONE;\n        BigDecimal three = new BigDecimal(\"3\");\n        BigDecimal div = one.divide(three, 4, RoundingMode.HALF_UP);\n        System.out.println(\"1 / 3 (scaled): \" + div); // 0.3333\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "System.out.println(\"0.1 + 0.2 = \" + (d1 + d2));",
          "explanation": "Outputs 0.30000000000000004 due to IEEE 754 binary conversion rounding."
        },
        {
          "line": "BigDecimal bad = new BigDecimal(0.1);",
          "explanation": "Passes binary float to constructor, capturing 0.1000000000000000055511151231257827021181583404541015625."
        },
        {
          "line": "BigDecimal good = new BigDecimal(\"0.1\");",
          "explanation": "Parses string representation character-by-character, creating exact unscaledValue 1 with scale 1."
        },
        {
          "line": "BigDecimal sum = b1.add(b2);",
          "explanation": "Performs exact decimal addition, returning new immutable BigDecimal representing 0.3."
        },
        {
          "line": "one.divide(three, 4, RoundingMode.HALF_UP);",
          "explanation": "Specifies scale of 4 decimal places and HALF_UP rounding to prevent ArithmeticException on recurring 1/3."
        }
      ],
      "output": "0.1 + 0.2 = 0.30000000000000004\nd1 + d2 == 0.3: false\nbad: 0.1000000000000000055511151231257827021181583404541015625\ngood: 0.1\nBigDecimal Sum: 0.3\n1 / 3 (scaled): 0.3333"
    },
    "codeExamples": [
      {
        "title": "The equals() vs compareTo() Trap in Collections",
        "description": "How scale difference causes unexpected behavior in HashSet vs TreeSet.",
        "code": "import java.math.BigDecimal;\nimport java.util.HashSet;\nimport java.util.TreeSet;\n\npublic class ScaleTrap {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal(\"2.0\");\n        BigDecimal b = new BigDecimal(\"2.00\");\n        \n        // equals() checks value AND scale (scale 1 vs scale 2)\n        System.out.println(\"equals: \" + a.equals(b));          // false!\n        // compareTo() checks only numeric value\n        System.out.println(\"compareTo: \" + (a.compareTo(b) == 0)); // true!\n        \n        // HashSet uses equals() and hashCode()\n        HashSet<BigDecimal> hashSet = new HashSet<>();\n        hashSet.add(a);\n        hashSet.add(b);\n        System.out.println(\"HashSet size: \" + hashSet.size()); // 2 (Duplicate!)\n        \n        // TreeSet uses compareTo()\n        TreeSet<BigDecimal> treeSet = new TreeSet<>();\n        treeSet.add(a);\n        treeSet.add(b);\n        System.out.println(\"TreeSet size: \" + treeSet.size()); // 1 (Deduplicated)\n    }\n}",
        "explanation": "In BigDecimal, equals() checks if value AND scale are identical (scale of '2.0' is 1, while '2.00' is 2). This causes HashSet to treat them as distinct elements. TreeSet relies on Comparable.compareTo(), correctly treating them as equivalent."
      },
      {
        "title": "Financial Calculation: Compound Interest and Rounding",
        "description": "Enterprise-grade financial compounding calculation avoiding penny discrepancies.",
        "code": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\npublic class BankingCalc {\n    public static BigDecimal calculateInterest(BigDecimal principal, BigDecimal rate, int years) {\n        BigDecimal multiplier = BigDecimal.ONE.add(rate);\n        BigDecimal futureValue = principal.multiply(multiplier.pow(years));\n        // Always round currency to 2 decimal places with Banker's Rounding (HALF_EVEN)\n        return futureValue.setScale(2, RoundingMode.HALF_EVEN);\n    }\n\n    public static void main(String[] args) {\n        BigDecimal principal = new BigDecimal(\"10000.00\");\n        BigDecimal annualRate = new BigDecimal(\"0.0525\"); // 5.25%\n        BigDecimal total = calculateInterest(principal, annualRate, 5);\n        System.out.println(\"Compounded Total: $\" + total);\n    }\n}",
        "explanation": "Banker's Rounding (RoundingMode.HALF_EVEN) rounds towards the nearest even neighbor, eliminating statistical skew across millions of aggregated financial records."
      }
    ],
    "cheatSheet": {
      "summary": "Never use float or double for money. Use BigDecimal with String constructor or BigDecimal.valueOf(), and use compareTo() for equality.",
      "rules": [
        {
          "rule": "Never use float/double for currency, billing, metrics, or financial calculations.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Always instantiate BigDecimal with String",
          "explanation": "new BigDecimal(\"0.1\"), NOT new BigDecimal(0.1)."
        },
        {
          "rule": "BigDecimal is 100% immutable; methods like add(), subtract(), multiply() return a new instance.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Always supply a RoundingMode and scale when performing divide() to prevent ArithmeticException.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Use compareTo(other) == 0 to compare values; avoid equals() unless scale matching is strictly required.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        },
        {
          "rule": "Use RoundingMode.HALF_EVEN (Banker's Rounding) for financial domain standards.",
          "explanation": "Core architectural specification and JVM runtime constraint."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Representation",
          "optionA": "double: IEEE 754 base-2 binary",
          "optionB": "BigDecimal: Arbitrary-precision base-10 decimal"
        },
        {
          "aspect": "Speed / Performance",
          "optionA": "double: Native CPU floating-point instructions",
          "optionB": "BigDecimal: Software-emulated heap object arithmetic"
        },
        {
          "aspect": "Precision",
          "optionA": "double: 53 bits (~15-17 significant digits)",
          "optionB": "BigDecimal: Unlimited arbitrary precision"
        },
        {
          "aspect": "Equality Check",
          "optionA": "Double.compare() or epsilon threshold",
          "optionB": "a.compareTo(b) == 0"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Instantiating BigDecimal with a double literal: `new BigDecimal(0.1)`.",
        "whyItHappens": "Developer assumes passing 0.1 to constructor produces 0.1 exact decimal.",
        "howToFix": "Use String constructor `new BigDecimal(\"0.1\")` or `BigDecimal.valueOf(0.1)`.",
        "codeSnippet": "// WRONG: captures IEEE error\nBigDecimal b = new BigDecimal(0.1);\n// RIGHT\nBigDecimal b = new BigDecimal(\"0.1\");"
      },
      {
        "mistake": "Calling `a.divide(b)` without specifying RoundingMode.",
        "whyItHappens": "Developer assumes division returns repeating decimals like 0.3333 automatically.",
        "howToFix": "Always supply scale and RoundingMode: `a.divide(b, 2, RoundingMode.HALF_UP)`.",
        "codeSnippet": "// Throws ArithmeticException on 1/3\nBigDecimal res = BigDecimal.ONE.divide(new BigDecimal(\"3\"));\n// Safe\nBigDecimal res = BigDecimal.ONE.divide(new BigDecimal(\"3\"), 4, RoundingMode.HALF_UP);"
      },
      {
        "mistake": "Ignoring the return value of BigDecimal arithmetic methods.",
        "whyItHappens": "Assuming BigDecimal is mutable like StringBuilder.",
        "howToFix": "Assign the returned result back to a reference variable: `a = a.add(b)`.",
        "codeSnippet": "BigDecimal total = new BigDecimal(\"10.00\");\ntotal.add(new BigDecimal(\"5.00\")); // Return value discarded!\n// Fix:\ntotal = total.add(new BigDecimal(\"5.00\"));"
      }
    ],
    "practiceProblems": [
      {
        "title": "Primitive Floating-Point Sum Equality",
        "problemStatement": "What is printed by:\n```java\ndouble a = 0.7;\ndouble b = 0.9;\ndouble c = a + 0.1;\nSystem.out.println((a + 0.2 == b) + \" \" + (c == 0.8));\n```",
        "options": [
          "true true",
          "false false",
          "false true",
          "true false"
        ],
        "correctOptionIndex": 1,
        "hint": "0.7, 0.9, 0.1, 0.2, 0.8 all suffer binary fractional truncation under IEEE 754.",
        "solution": "false false",
        "explanation": "Due to binary base-2 representation errors, 0.7 + 0.2 yields 0.8999999999999999 (not 0.9), and 0.7 + 0.1 yields 0.7999999999999999 (not 0.8). Both == comparisons evaluate to false."
      },
      {
        "title": "BigDecimal String Constructor vs Double ValueOf",
        "problemStatement": "What does the following print?\n```java\nBigDecimal b1 = new BigDecimal(\"0.1\");\nBigDecimal b2 = BigDecimal.valueOf(0.1);\nSystem.out.println(b1.equals(b2));\n```",
        "options": [
          "false",
          "true",
          "Throws ArithmeticException",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "How does `BigDecimal.valueOf(double val)` convert the double argument?",
        "solution": "true",
        "explanation": "BigDecimal.valueOf(double val) internally calls Double.toString(val) and then constructs the BigDecimal from the canonical String. Thus `BigDecimal.valueOf(0.1)` yields identical value and scale (1) to `new BigDecimal(\"0.1\")`, returning true."
      },
      {
        "title": "BigDecimal Non-Terminating Division Crash",
        "problemStatement": "What happens when executing:\n```java\nBigDecimal a = new BigDecimal(\"10\");\nBigDecimal b = new BigDecimal(\"3\");\nBigDecimal c = a.divide(b);\nSystem.out.println(c);\n```",
        "options": [
          "Prints 3.333333333333333",
          "Prints 3",
          "Throws ArithmeticException at runtime",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 2,
        "hint": "What does divide() without arguments do when the decimal expansion is infinite?",
        "solution": "Throws ArithmeticException at runtime",
        "explanation": "If the quotient has a non-terminating decimal expansion (like 10/3 = 3.333...), and no rounding mode or scale is specified, BigDecimal throws `java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.`"
      },
      {
        "title": "BigDecimal Scale Difference in HashSet",
        "problemStatement": "What is the output of:\n```java\nBigDecimal x = new BigDecimal(\"1.0\");\nBigDecimal y = new BigDecimal(\"1.00\");\nSet<BigDecimal> set = new HashSet<>();\nset.add(x);\nset.add(y);\nSystem.out.println(set.size());\n```",
        "options": [
          "1",
          "2",
          "Throws IllegalArgumentException",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "HashSet relies on equals() and hashCode(). How does BigDecimal implement equals()?",
        "solution": "2",
        "explanation": "BigDecimal.equals() compares both the unscaled value and the scale. '1.0' has scale 1, while '1.00' has scale 2. Because their scales differ, equals() returns false and their hash codes differ, so HashSet stores both as distinct elements (size = 2)."
      },
      {
        "title": "BigDecimal CompareTo with Different Scales",
        "problemStatement": "What does the following snippet print?\n```java\nBigDecimal p = new BigDecimal(\"5.0\");\nBigDecimal q = new BigDecimal(\"5.000\");\nSystem.out.println(p.compareTo(q));\n```",
        "options": [
          "-2",
          "0",
          "1",
          "-1"
        ],
        "correctOptionIndex": 1,
        "hint": "Does compareTo() compare scale or purely numerical value?",
        "solution": "0",
        "explanation": "Unlike equals(), BigDecimal.compareTo() compares only the mathematical numeric value, ignoring scale. Since 5.0 is numerically equal to 5.000, compareTo returns 0."
      },
      {
        "title": "BigDecimal Immutability Violation Pitfall",
        "problemStatement": "What is the output of:\n```java\nBigDecimal amount = new BigDecimal(\"100.00\");\namount.add(new BigDecimal(\"50.00\"));\nSystem.out.println(amount);\n```",
        "options": [
          "150.00",
          "100.00",
          "50.00",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "Is BigDecimal mutable or immutable?",
        "solution": "100.00",
        "explanation": "BigDecimal is completely immutable. Methods like add(), subtract(), etc., return a newly created BigDecimal and do NOT mutate the existing instance. Since the return value was not assigned, 'amount' remains 100.00."
      },
      {
        "title": "Epsilon Threshold for Primitive Floating-Point Equality",
        "problemStatement": "To safely compare two double values `d1` and `d2` for practical equality, which approach is correct?\n```java\nfinal double EPSILON = 1e-9;\n```",
        "options": [
          "d1 == d2",
          "Double.valueOf(d1).equals(Double.valueOf(d2))",
          "Math.abs(d1 - d2) < EPSILON",
          "(int) d1 == (int) d2"
        ],
        "correctOptionIndex": 2,
        "hint": "How do you test if two numbers are within an acceptable error tolerance?",
        "solution": "Math.abs(d1 - d2) < EPSILON",
        "explanation": "Comparing floating points with an epsilon threshold `Math.abs(d1 - d2) < EPSILON` checks whether the two values are identical within an allowable margin of floating-point rounding error."
      },
      {
        "title": "RoundingMode.HALF_EVEN Banker's Rounding",
        "problemStatement": "What is printed by:\n```java\nBigDecimal a = new BigDecimal(\"2.5\").setScale(0, RoundingMode.HALF_EVEN);\nBigDecimal b = new BigDecimal(\"3.5\").setScale(0, RoundingMode.HALF_EVEN);\nSystem.out.println(a + \" and \" + b);\n```",
        "options": [
          "3 and 4",
          "2 and 4",
          "2 and 3",
          "3 and 3"
        ],
        "correctOptionIndex": 1,
        "hint": "HALF_EVEN rounds towards the nearest even integer when equidistant.",
        "solution": "2 and 4",
        "explanation": "In RoundingMode.HALF_EVEN (Banker's Rounding), if the discarded fraction is .5, it rounds towards the nearest EVEN number. For 2.5, 2 is even (rounds to 2). For 3.5, 4 is even (rounds to 4)."
      },
      {
        "title": "BigDecimal StripTrailingZeros Scale Adjustment",
        "problemStatement": "What is printed by:\n```java\nBigDecimal val = new BigDecimal(\"600.00\").stripTrailingZeros();\nSystem.out.println(val.scale());\n```",
        "options": [
          "2",
          "0",
          "-2",
          "Compilation error"
        ],
        "correctOptionIndex": 2,
        "hint": "600 can be represented as 6 * 10^2. What is the scale when represented as 6 * 10^-(-2)?",
        "solution": "-2",
        "explanation": "stripTrailingZeros() removes trailing zeros from both the fractional and integer parts. 600.00 becomes 6 * 10^2. Because value = unscaledValue * 10^-scale, a power of 10^2 results in a negative scale: -2."
      },
      {
        "title": "BigInteger Factorial Calculation Bounds",
        "problemStatement": "Why can `BigInteger` compute 100! (100 factorial) without overflowing while `long` cannot?",
        "options": [
          "BigInteger uses 128-bit hardware registers",
          "BigInteger dynamically allocates an array of ints (int[] mag) on the heap to store arbitrarily large numbers",
          "BigInteger runs on a separate thread pool",
          "BigInteger automatically rounds numbers"
        ],
        "correctOptionIndex": 1,
        "hint": "How does BigInteger represent numbers larger than 64 bits?",
        "solution": "BigInteger dynamically allocates an array of ints (int[] mag) on the heap to store arbitrarily large numbers",
        "explanation": "BigInteger stores magnitude as an array of 32-bit integers (`int[] mag`) on the heap, dynamically resizing memory to accommodate arbitrarily large numbers up to the JVM heap memory limits."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why does `0.1 + 0.2 == 0.3` evaluate to false in Java?",
        "expectedAnswer": "Java's `float` and `double` primitive types implement the IEEE 754 standard, which represents numbers in base-2 binary floating point. Fractions like 0.1 (1/10) and 0.2 (1/5) cannot be represented with finite binary bits because 10 is not a power of 2; they become infinite recurring binary fractions (0.0001100110011...). When truncated into a 64-bit double register, small rounding errors occur. `0.1 + 0.2` produces `0.30000000000000004`, which is numerically unequal to `0.3`.",
        "followUp": "How do you test two floating-point numbers for equality?",
        "followUpAnswer": "By checking if the absolute difference is smaller than an acceptable tolerance threshold (epsilon): `Math.abs(a - b) < 1e-9`.",
        "commonMistake": "Thinking 0.1 is stored exactly as 0.1 in a double.",
        "commonMistakeAnswer": "In binary floating-point, 0.1 is an approximation; computers cannot store 0.1 exactly without base-10 arithmetic.",
        "answer": "Java's `float` and `double` primitive types implement the IEEE 754 standard, which represents numbers in base-2 binary floating point. Fractions like 0.1 (1/10) and 0.2 (1/5) cannot be represented with finite binary bits because 10 is not a power of 2; they become infinite recurring binary fractions (0.0001100110011...). When truncated into a 64-bit double register, small rounding errors occur. `0.1 + 0.2` produces `0.30000000000000004`, which is numerically unequal to `0.3`."
      },
      {
        "question": "Why should you never use `new BigDecimal(double)`?",
        "expectedAnswer": "Passing a double primitive into `new BigDecimal(double)` captures the already-imprecise IEEE 754 binary floating-point value. For example, `new BigDecimal(0.1)` produces `0.1000000000000000055511151231257827021181583404541015625`. Developers should always use `new BigDecimal(\"0.1\")` or the static factory `BigDecimal.valueOf(0.1)`, which safely converts the double to its canonical String first.",
        "followUp": "What is the difference between `new BigDecimal(\"0.1\")` and `BigDecimal.valueOf(0.1)`?",
        "followUpAnswer": "`new BigDecimal(\"0.1\")` parses the string literal directly. `BigDecimal.valueOf(0.1)` calls `Double.toString(0.1)` and reuses cached instances for common values like 0, 1, and 10 via an internal cache.",
        "commonMistake": "Believing `new BigDecimal(0.1)` automatically rounds to 0.1.",
        "commonMistakeAnswer": "The constructor preserves the exact binary double representation without rounding.",
        "answer": "Passing a double primitive into `new BigDecimal(double)` captures the already-imprecise IEEE 754 binary floating-point value. For example, `new BigDecimal(0.1)` produces `0.1000000000000000055511151231257827021181583404541015625`. Developers should always use `new BigDecimal(\"0.1\")` or the static factory `BigDecimal.valueOf(0.1)`, which safely converts the double to its canonical String first."
      },
      {
        "question": "Explain the difference between `equals()` and `compareTo()` in `BigDecimal`.",
        "expectedAnswer": "`BigDecimal.equals(Object obj)` compares both numeric value AND scale. Therefore, `new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))` returns `false` because scale 1 != scale 2. In contrast, `compareTo(BigDecimal other)` compares only the mathematical numeric value, ignoring scale differences. Therefore, `new BigDecimal(\"2.0\").compareTo(new BigDecimal(\"2.00\"))` returns 0 (equal).",
        "followUp": "How does this difference impact Java Collections (HashSet vs TreeSet)?",
        "followUpAnswer": "A `HashSet<BigDecimal>` uses `equals()` and `hashCode()`, so it will store both '2.0' and '2.00' as two distinct duplicate items. A `TreeSet<BigDecimal>` uses `compareTo()`, so it will correctly deduplicate them as equivalent.",
        "commonMistake": "Using `equals()` to check numeric equivalence in business logic.",
        "commonMistakeAnswer": "`equals()` is sensitive to trailing zeros/scale; always use `compareTo(other) == 0` for numeric equality.",
        "answer": "`BigDecimal.equals(Object obj)` compares both numeric value AND scale. Therefore, `new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))` returns `false` because scale 1 != scale 2. In contrast, `compareTo(BigDecimal other)` compares only the mathematical numeric value, ignoring scale differences. Therefore, `new BigDecimal(\"2.0\").compareTo(new BigDecimal(\"2.00\"))` returns 0 (equal)."
      },
      {
        "question": "Why does `a.divide(b)` throw an `ArithmeticException` in BigDecimal?",
        "expectedAnswer": "`BigDecimal.divide(BigDecimal divisor)` attempts to return an exact decimal quotient. If the result has an infinite non-terminating decimal expansion (such as dividing 1 by 3 = 0.3333... or 10 by 7), an exact result cannot be represented. Because BigDecimal refuses to silently discard digits, it throws `ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.`",
        "followUp": "How do you resolve this exception?",
        "followUpAnswer": "You must specify both a target scale (number of decimal places) and an explicit `RoundingMode`, for example: `a.divide(b, 2, RoundingMode.HALF_UP)`.",
        "commonMistake": "Assuming divide() has a default rounding scale like 2 decimal places.",
        "commonMistakeAnswer": "divide() without arguments requires exact division; non-terminating divisions will always crash.",
        "answer": "`BigDecimal.divide(BigDecimal divisor)` attempts to return an exact decimal quotient. If the result has an infinite non-terminating decimal expansion (such as dividing 1 by 3 = 0.3333... or 10 by 7), an exact result cannot be represented. Because BigDecimal refuses to silently discard digits, it throws `ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.`"
      },
      {
        "question": "What is RoundingMode.HALF_EVEN and why is it called Banker's Rounding?",
        "expectedAnswer": "`RoundingMode.HALF_EVEN` rounds towards the nearest neighbor unless both neighbors are equidistant, in which case it rounds towards the even neighbor (e.g. 2.5 rounds to 2, but 3.5 rounds to 4). It is called Banker's Rounding because in large financial transaction batches, standard `HALF_UP` rounding introduces an upward statistical bias (rounding up 5 out of 9 times). `HALF_EVEN` cancels out bias across millions of transactions, ensuring balanced ledgers.",
        "followUp": "What is RoundingMode.UNNECESSARY used for?",
        "followUpAnswer": "It asserts that the operation has an exact result. If rounding is required to fit into the specified scale, it throws an `ArithmeticException`, acting as a safety check in mission-critical accounting.",
        "commonMistake": "Using `HALF_UP` for all financial systems by default.",
        "commonMistakeAnswer": "Banking, accounting, and ISO financial standards mandate `HALF_EVEN` to prevent systematic inflationary bias.",
        "answer": "`RoundingMode.HALF_EVEN` rounds towards the nearest neighbor unless both neighbors are equidistant, in which case it rounds towards the even neighbor (e.g. 2.5 rounds to 2, but 3.5 rounds to 4). It is called Banker's Rounding because in large financial transaction batches, standard `HALF_UP` rounding introduces an upward statistical bias (rounding up 5 out of 9 times). `HALF_EVEN` cancels out bias across millions of transactions, ensuring balanced ledgers."
      },
      {
        "question": "Explain the internal structure of a `BigDecimal` object in memory.",
        "expectedAnswer": "A `BigDecimal` consists of three primary fields: 1. `intScale`: A 32-bit signed integer representing the number of digits to the right of the decimal point. 2. `intVal`: A `BigInteger` holding the arbitrary-precision unscaled value (compacted to a primitive `long intCompact` if it fits within 64 bits to optimize memory and CPU performance). 3. `precision`: The total count of significant decimal digits. Value is calculated as: unscaledValue * 10^-scale.",
        "followUp": "What is the memory and CPU cost of BigDecimal compared to primitive double?",
        "followUpAnswer": "A double is 8 bytes and processed via dedicated hardware ALU floating-point registers in 1 CPU cycle. A BigDecimal is a heap object consuming ~40+ bytes with multiple pointer dereferences and software-emulated decimal loops, running 20x to 100x slower.",
        "commonMistake": "Thinking BigDecimal operations are performed in hardware.",
        "commonMistakeAnswer": "Modern CPUs have no base-10 decimal hardware; all BigDecimal arithmetic is computed via software algorithms.",
        "answer": "A `BigDecimal` consists of three primary fields: 1. `intScale`: A 32-bit signed integer representing the number of digits to the right of the decimal point. 2. `intVal`: A `BigInteger` holding the arbitrary-precision unscaled value (compacted to a primitive `long intCompact` if it fits within 64 bits to optimize memory and CPU performance). 3. `precision`: The total count of significant decimal digits. Value is calculated as: unscaledValue * 10^-scale."
      },
      {
        "question": "Can `BigDecimal` be used as a key in a `HashMap`? What are the pitfalls?",
        "expectedAnswer": "Yes, but with a major caveat: because `HashMap` uses `equals()` and `hashCode()`, two BigDecimal instances with identical numeric values but different scales (e.g. `2.0` and `2.00`) produce different hash codes and are treated as separate, distinct keys. If you put a value with key `new BigDecimal(\"2.0\")`, querying it with `new BigDecimal(\"2.00\")` will return `null`.",
        "followUp": "How can you mitigate this HashMap key issue?",
        "followUpAnswer": "Normalize all BigDecimal keys using `.stripTrailingZeros()` before insertion and lookup, or use a `TreeMap` / `TreeSet` with a custom comparator using `compareTo()`.",
        "commonMistake": "Using raw BigDecimal keys in HashMaps without scale normalization.",
        "commonMistakeAnswer": "Inconsistent scales in keys lead to missing entries and memory leaks.",
        "answer": "Yes, but with a major caveat: because `HashMap` uses `equals()` and `hashCode()`, two BigDecimal instances with identical numeric values but different scales (e.g. `2.0` and `2.00`) produce different hash codes and are treated as separate, distinct keys. If you put a value with key `new BigDecimal(\"2.0\")`, querying it with `new BigDecimal(\"2.00\")` will return `null`."
      },
      {
        "question": "What does `.stripTrailingZeros()` do, and what unexpected scale can it return?",
        "expectedAnswer": "`.stripTrailingZeros()` returns a numerically equal BigDecimal with all trailing zeros removed from the representation. For example, `new BigDecimal(\"100.500\").stripTrailingZeros()` becomes `100.5` with scale 1. An unexpected behavior occurs with integer multiples of 10: `new BigDecimal(\"600\").stripTrailingZeros()` produces `6 * 10^2`, yielding a negative scale of `-2`.",
        "followUp": "What method should you call if you need a non-scientific plain string representation?",
        "followUpAnswer": "Call `.toPlainString()`. Standard `toString()` may output scientific exponential notation (e.g. `6E+2`), whereas `toPlainString()` always prints standard decimal format (`600`).",
        "commonMistake": "Calling `toString()` on BigDecimals intended for JSON API responses.",
        "commonMistakeAnswer": "`toString()` produces scientific notation like `1E-7`, which breaks API clients expecting plain decimals.",
        "answer": "`.stripTrailingZeros()` returns a numerically equal BigDecimal with all trailing zeros removed from the representation. For example, `new BigDecimal(\"100.500\").stripTrailingZeros()` becomes `100.5` with scale 1. An unexpected behavior occurs with integer multiples of 10: `new BigDecimal(\"600\").stripTrailingZeros()` produces `6 * 10^2`, yielding a negative scale of `-2`."
      },
      {
        "question": "Is `BigDecimal` thread-safe?",
        "expectedAnswer": "Yes, `BigDecimal` is completely immutable and inherently thread-safe. All internal state fields are final, and every mathematical operation creates and returns a new BigDecimal instance. Instances can be freely shared across multiple concurrent threads without synchronization or locks.",
        "followUp": "Can you synchronize on a BigDecimal instance?",
        "followUpAnswer": "While technically permissible in older Java, synchronizing on value-based classes is discouraged and produces compiler warnings in modern Java (JEP 390), as future Valhalla JVMs may turn them into identityless primitive value objects.",
        "commonMistake": "Attempting to lock on BigDecimal instances.",
        "commonMistakeAnswer": "Never synchronize on wrapper or value-based objects.",
        "answer": "Yes, `BigDecimal` is completely immutable and inherently thread-safe. All internal state fields are final, and every mathematical operation creates and returns a new BigDecimal instance. Instances can be freely shared across multiple concurrent threads without synchronization or locks."
      },
      {
        "question": "When should you choose `double` over `BigDecimal`?",
        "expectedAnswer": "You should choose primitive `double` (or `float`) for scientific simulations, 3D graphics rendering, physics engines, machine learning tensors, audio DSP, and high-frequency algorithms where sub-nanosecond hardware CPU throughput is required and minor binary rounding error (around 1 part in 10^15) is mathematically inconsequential. Choose `BigDecimal` whenever exact decimal precision is mandatory: currencies, taxation, accounting, invoicing, interest accrual, and legal reporting.",
        "followUp": "What is the performance difference in matrix multiplication using double vs BigDecimal?",
        "followUpAnswer": "Matrix operations with primitives can utilize SIMD (AVX/NEON) vectorization instructions, running thousands of times faster than BigDecimal.",
        "commonMistake": "Using BigDecimal for high-performance scientific simulations.",
        "commonMistakeAnswer": "BigDecimal creates overwhelming GC memory pressure and lacks CPU hardware SIMD vectorization.",
        "answer": "You should choose primitive `double` (or `float`) for scientific simulations, 3D graphics rendering, physics engines, machine learning tensors, audio DSP, and high-frequency algorithms where sub-nanosecond hardware CPU throughput is required and minor binary rounding error (around 1 part in 10^15) is mathematically inconsequential. Choose `BigDecimal` whenever exact decimal precision is mandatory: currencies, taxation, accounting, invoicing, interest accrual, and legal reporting."
      }
    ],
    "miniQuiz": [
      {
        "question": "Why does `0.1 + 0.2 == 0.3` evaluate to false in Java?",
        "options": [
          "The Java compiler has a bug",
          "IEEE 754 base-2 floating point cannot represent 0.1 and 0.2 exactly, causing rounding errors",
          "double only supports integer arithmetic",
          "0.3 is automatically promoted to float"
        ],
        "correctOptionIndex": 1,
        "explanation": "In binary floating-point arithmetic, 0.1 and 0.2 are infinite repeating fractions, leading to 0.30000000000000004 when added.",
        "correctIndex": 1
      },
      {
        "question": "Which constructor for BigDecimal should be AVOIDED for exact values?",
        "options": [
          "new BigDecimal(String)",
          "new BigDecimal(double)",
          "BigDecimal.valueOf(double)",
          "new BigDecimal(int)"
        ],
        "correctOptionIndex": 1,
        "explanation": "new BigDecimal(double) imports the IEEE 754 binary floating-point representation error into the BigDecimal instance.",
        "correctIndex": 1
      },
      {
        "question": "What is printed by `new BigDecimal(\"2.0\").equals(new BigDecimal(\"2.00\"))`?",
        "options": [
          "true",
          "false",
          "Compilation error",
          "Throws ArithmeticException"
        ],
        "correctOptionIndex": 1,
        "explanation": "BigDecimal.equals() compares both value and scale; scale 1 != scale 2, returning false.",
        "correctIndex": 1
      },
      {
        "question": "How do you compare two BigDecimals for numeric equality ignoring scale?",
        "options": [
          "a == b",
          "a.equals(b)",
          "a.compareTo(b) == 0",
          "a.doubleValue() == b.doubleValue()"
        ],
        "correctOptionIndex": 2,
        "explanation": "a.compareTo(b) == 0 checks pure mathematical numerical value and ignores differences in scale.",
        "correctIndex": 2
      },
      {
        "question": "What happens if you execute `BigDecimal.ONE.divide(new BigDecimal(\"3\"))`?",
        "options": [
          "Returns 0.33",
          "Throws ArithmeticException: Non-terminating decimal expansion",
          "Returns 0.3333333333333333",
          "Returns 0"
        ],
        "correctOptionIndex": 1,
        "explanation": "When division yields a recurring decimal with no exact representation, an explicit RoundingMode and scale must be provided, or ArithmeticException is thrown.",
        "correctIndex": 1
      },
      {
        "question": "Which rounding mode is commonly known as Banker's Rounding?",
        "options": [
          "RoundingMode.HALF_UP",
          "RoundingMode.HALF_DOWN",
          "RoundingMode.HALF_EVEN",
          "RoundingMode.CEILING"
        ],
        "correctOptionIndex": 2,
        "explanation": "RoundingMode.HALF_EVEN rounds towards the nearest even number to avoid statistical bias across large numbers of calculations.",
        "correctIndex": 2
      },
      {
        "question": "What does `BigDecimal` represent internally?",
        "options": [
          "A 64-bit IEEE 754 float",
          "An arbitrary-precision unscaled BigInteger and a 32-bit integer scale",
          "A string of ASCII digits",
          "An array of double values"
        ],
        "correctOptionIndex": 1,
        "explanation": "BigDecimal stores an arbitrary-precision integer unscaled value along with a 32-bit integer scale.",
        "correctIndex": 1
      },
      {
        "question": "What is the result of `BigDecimal b = new BigDecimal(\"10.0\"); b.add(new BigDecimal(\"5.0\")); System.out.println(b);`?",
        "options": [
          "15.0",
          "10.0",
          "5.0",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "explanation": "BigDecimal is immutable; add() returns a new instance. Since the return value is not assigned, 'b' remains 10.0.",
        "correctIndex": 1
      },
      {
        "question": "Which method formats a BigDecimal into a decimal string without scientific notation?",
        "options": [
          "toString()",
          "toPlainString()",
          "toScientificString()",
          "format()"
        ],
        "correctOptionIndex": 1,
        "explanation": "toPlainString() guarantees decimal notation without engineering or scientific exponential notation.",
        "correctIndex": 1
      },
      {
        "question": "What is the scale of `new BigDecimal(\"12.345\")`?",
        "options": [
          "2",
          "3",
          "5",
          "-3"
        ],
        "correctOptionIndex": 1,
        "explanation": "Scale is the count of digits to the right of the decimal point; '12.345' has 3 decimal places.",
        "correctIndex": 1
      },
      {
        "question": "In a `HashSet<BigDecimal>`, how many items will be stored after adding '3.0' and '3.00'?",
        "options": [
          "1",
          "2",
          "0",
          "Throws exception"
        ],
        "correctOptionIndex": 1,
        "explanation": "HashSet uses equals() and hashCode(). Since scale 1 != scale 2, both elements are retained, resulting in size 2.",
        "correctIndex": 1
      },
      {
        "question": "In a `TreeSet<BigDecimal>`, how many items will be stored after adding '3.0' and '3.00'?",
        "options": [
          "1",
          "2",
          "0",
          "Throws exception"
        ],
        "correctOptionIndex": 0,
        "explanation": "TreeSet relies on compareTo(), which finds that 3.0 and 3.00 have identical numerical values, deduplicating them to size 1.",
        "correctIndex": 0
      },
      {
        "question": "What does `RoundingMode.UNNECESSARY` do if rounding is actually required?",
        "options": [
          "Truncates digits silently",
          "Rounds up",
          "Throws ArithmeticException",
          "Returns zero"
        ],
        "correctOptionIndex": 2,
        "explanation": "RoundingMode.UNNECESSARY asserts that the operation has an exact result; if rounding is required, it throws ArithmeticException.",
        "correctIndex": 2
      },
      {
        "question": "For which use case is primitive `double` preferred over `BigDecimal`?",
        "options": [
          "E-commerce shopping cart totals",
          "Bank account interest compounding",
          "High-performance 3D graphics rendering and physics simulations",
          "Government tax calculations"
        ],
        "correctOptionIndex": 2,
        "explanation": "3D graphics and physics simulations require hardware floating-point performance (ALU/GPU) where micro-rounding error is acceptable.",
        "correctIndex": 2
      },
      {
        "question": "What does `BigDecimal.valueOf(100, 2)` produce?",
        "options": [
          "100.00",
          "1.00",
          "10000",
          "0.01"
        ],
        "correctOptionIndex": 1,
        "explanation": "BigDecimal.valueOf(unscaledVal, scale) calculates unscaledVal * 10^-scale. 100 * 10^-2 = 1.00.",
        "correctIndex": 1
      }
    ]
  },
  "data-types-challenge": {
    "id": "data-types-challenge",
    "moduleId": "java-data-types",
    "moduleTitle": "2. Data Types & Variables",
    "lessonNumber": "Lesson 2.8",
    "title": "Module 2 Challenge & Interview Assessment",
    "subtitle": "Comprehensive capstone assessment synthesizing primitives, IEEE 754, type casting wrap-around, wrapper immutability, IntegerCache traps, and BigDecimal",
    "estimatedMinutes": 25,
    "beginnerAnalogy": "The Java type system is bifurcated into primitive value types and reference types, reflecting a deliberate balance between hardware CPU throughput and object-oriented polymorphism. At the JVM memory level, the 8 primitives store direct binary bits on the executing thread's stack or within contiguous heap object layouts, operating via native ALU instructions. In contrast, wrapper classes encapsulate primitives inside 16-to-24 byte heap objects with 12-byte object headers, managed by Garbage Collection. Autoboxing bridges these models at compile-time via `valueOf()` and `xxxValue()`, introducing critical architectural side effects: Flyweight caching in `IntegerCache` (-128 to 127) which creates identity hazards under `==`, silent loop allocation storms, and runtime `NullPointerException` crashes during unboxing.\n\nArchitecturally, mastering numeric boundaries (two's complement modular overflow), IEEE 754 recurring binary fractions ($0.1 + 0.2 \\neq 0.3$), and exact arbitrary-precision decimal modeling via `java.math.BigDecimal` is vital. In financial accounting, telemetry data processing, and enterprise persistence layers, confusing wrapper reference equality with numeric equality is a primary cause of high-severity production outages.",
    "coreExplanation": [
      "Primitive vs Reference Duality: 8 primitives (byte, short, int, long, float, double, char, boolean) store raw binary data with zero heap pointer dereference overhead. Reference types store heap addresses pointing to object headers and field payloads.",
      "Two's Complement Modular Arithmetic: Java integer types (except char) are signed two's complement. Adding 1 to Integer.MAX_VALUE produces Integer.MIN_VALUE (-2147483648) with zero runtime warning unless Math.addExact() is used.",
      "Floating-Point IEEE 754 Representation: float (32-bit) and double (64-bit) represent real numbers using sign, exponent, and mantissa. Fractions whose denominators have factors other than 2 (like 0.1) cannot be represented finitely in binary base-2.",
      "Exact Financial Modeling with BigDecimal: A BigDecimal consists of an arbitrary-precision BigInteger unscaled value and a 32-bit integer scale. Always instantiate via `new BigDecimal(\"0.1\")` or `BigDecimal.valueOf(0.1)` to avoid importing binary IEEE inaccuracies.",
      "BigDecimal Comparison Discrepancy: `equals()` compares numerical value AND scale (`2.0` does NOT equal `2.00` in equals()), while `compareTo()` evaluates pure numerical value (`2.0` compareTo `2.00` is 0). This causes distinct behavior in HashSet vs TreeSet.",
      "The Flyweight IntegerCache Trap: Values from -128 to 127 are pre-allocated in `IntegerCache`. Comparing wrapper objects with `==` checks heap memory addresses: returns true within the cache, but false above 127. Always use `.equals()` or `Objects.equals()`.",
      "Silent GC Overhead in Loop Autoboxing: Using `Long` or `Integer` as a loop accumulator forces continuous unboxing, addition, and re-boxing (`valueOf`), instantiating millions of temporary heap objects and triggering severe Garbage Collection latency.",
      "Unboxing NullPointerException: Unboxing compiles to an instance method call (`.intValue()`, `.booleanValue()`). If a wrapper reference is null during unboxing—in arithmetic, boolean conditions, or mixed-type ternaries—the JVM throws an immediate NullPointerException."
    ],
    "diagram": "================ MODULE 2 CAPSTONE: DATA TYPES & MEMORY ARCHITECTURE ================\n\n  1. PRIMITIVE MEMORY RESIDENCE (Direct Bits on Stack Frame):\n     int x = 42;          ===> [ 00000000 00000000 00000000 00101010 ] (4 Bytes on Stack)\n\n  2. WRAPPER HEAP ALLOCATION (64-bit JVM, Compressed OOPs):\n     Integer box = 42;    ===> Stack: [ Ref 0x7A10 ] ===> Heap: [ Mark(8B) | Klass(4B) | Val(4B) ] = 16B\n\n  3. THE INTEGER CACHE BOUNDARY HAZARD (-128 to 127):\n     Integer a = 127, b = 127;  ===> Points to SAME static array element ===> a == b is TRUE\n     Integer c = 128, d = 128;  ===> Allocates TWO separate heap objects ===> c == d is FALSE!\n\n  4. FINANCIAL ARITHMETIC (Binary IEEE 754 vs Base-10 BigDecimal):\n     double d = 0.1 + 0.2;      ===> 0.30000000000000004 (Binary truncation error!)\n     BigDecimal bd = b1.add(b2);===> 0.3 (Exact Arbitrary Precision: unscaled 3, scale 1)\n=====================================================================================",
    "codeSnippet": {
      "title": "Comprehensive Data Type Traps: Overflow, Autoboxing NPE, Cache, and BigDecimal",
      "code": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\nimport java.util.Objects;\n\npublic class DataTypesCapstoneDemo {\n    public static void main(String[] args) {\n        // 1. Integer overflow wrap-around vs Math.addExact\n        int max = Integer.MAX_VALUE;\n        int overflowed = max + 1; // Silently wraps to -2147483648\n        System.out.println(\"Silent overflow: \" + overflowed);\n        \n        // 2. IntegerCache boundary test\n        Integer id1 = 127, id2 = 127;\n        Integer id3 = 128, id4 = 128;\n        System.out.println(\"Cache <= 127 (==): \" + (id1 == id2)); // true\n        System.out.println(\"Cache >= 128 (==): \" + (id3 == id4)); // FALSE!\n        System.out.println(\"Safe equality: \" + Objects.equals(id3, id4)); // true\n        \n        // 3. Unboxing NullPointerException hazard\n        try {\n            Integer nullScore = null;\n            int finalScore = nullScore + 10; // Unboxes nullScore.intValue()!\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught unboxing NPE as expected!\");\n        }\n        \n        // 4. Exact currency calculation via BigDecimal\n        BigDecimal price = new BigDecimal(\"19.99\");\n        BigDecimal taxRate = new BigDecimal(\"0.0825\");\n        BigDecimal total = price.multiply(BigDecimal.ONE.add(taxRate)).setScale(2, RoundingMode.HALF_EVEN);\n        System.out.println(\"Exact Total: $\" + total);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "int overflowed = max + 1;",
          "explanation": "32-bit two's complement arithmetic overflows cyclically into Integer.MIN_VALUE."
        },
        {
          "line": "(id1 == id2)",
          "explanation": "Returns true because 127 is pre-allocated in IntegerCache.cache[255]."
        },
        {
          "line": "(id3 == id4)",
          "explanation": "Returns false because 128 exceeds the cache bound, allocating distinct heap objects with unique memory addresses."
        },
        {
          "line": "int finalScore = nullScore + 10;",
          "explanation": "The '+' operator forces unboxing by injecting nullScore.intValue(), which throws NullPointerException on null."
        },
        {
          "line": "total.setScale(2, RoundingMode.HALF_EVEN);",
          "explanation": "Applies Banker's Rounding to 2 decimal places, avoiding statistical bias across ledger entries."
        }
      ],
      "output": "Silent overflow: -2147483648\nCache <= 127 (==): true\nCache >= 128 (==): false\nSafe equality: true\nCaught unboxing NPE as expected!\nExact Total: $21.64"
    },
    "codeExamples": [
      {
        "title": "Scale-Aware Collections with BigDecimal",
        "description": "Why equals() and compareTo() behave differently in Hash-based vs Tree-based collections.",
        "code": "import java.math.BigDecimal;\nimport java.util.HashSet;\nimport java.util.TreeSet;\n\npublic class ScaleCollectionDemo {\n    public static void main(String[] args) {\n        BigDecimal b1 = new BigDecimal(\"10.0\");\n        BigDecimal b2 = new BigDecimal(\"10.00\");\n        \n        // HashSet uses equals() (checks scale 1 vs scale 2)\n        HashSet<BigDecimal> hash = new HashSet<>();\n        hash.add(b1); hash.add(b2);\n        System.out.println(\"HashSet size: \" + hash.size()); // 2 elements!\n        \n        // TreeSet uses compareTo() (checks numerical value only)\n        TreeSet<BigDecimal> tree = new TreeSet<>();\n        tree.add(b1); tree.add(b2);\n        System.out.println(\"TreeSet size: \" + tree.size()); // 1 element (deduplicated)\n    }\n}",
        "explanation": "HashSet checks equals() and hashCode(), which depend on scale. TreeSet relies on Comparable.compareTo(), treating 10.0 and 10.00 as identical."
      },
      {
        "title": "Silent Compound Narrowing Wrap-Around",
        "description": "How compound operators mask narrowing type conversions without compile-time errors.",
        "code": "public class CompoundNarrowingDemo {\n    public static void main(String[] args) {\n        short balance = 32000;\n        // balance = balance + 1000; // COMPILE ERROR: cannot assign int to short\n        balance += 1000; // Compiles silently via (short)(balance + 1000)!\n        System.out.println(\"Wrapped balance: \" + balance); // -32536!\n    }\n}",
        "explanation": "Compound assignment operators inject an implicit narrowing cast, causing silent overflow and negative balances in business code."
      }
    ],
    "cheatSheet": {
      "summary": "Module 2 Capstone synthesizes primitive bit widths, two's complement overflow, wrapper class immutability, IntegerCache boundaries, and exact BigDecimal financial arithmetic.",
      "rules": [
        {
          "rule": "Never use == on wrappers",
          "explanation": "== checks reference memory addresses; always use .equals() or Objects.equals()."
        },
        {
          "rule": "Always use String for BigDecimal",
          "explanation": "new BigDecimal(\"0.1\") is exact; new BigDecimal(0.1) imports IEEE binary error."
        },
        {
          "rule": "Specify RoundingMode on divide()",
          "explanation": "Non-terminating division (e.g. 1/3) throws ArithmeticException without RoundingMode."
        },
        {
          "rule": "Guard against unboxing NPE",
          "explanation": "Unboxing null references unconditionally throws NullPointerException."
        },
        {
          "rule": "Avoid wrappers in high-iteration loops",
          "explanation": "Accumulating in Long or Integer generates millions of heap objects, thrashing GC."
        },
        {
          "rule": "Use Math.xxxExact() for critical math",
          "explanation": "Throws ArithmeticException instead of silent two's complement wrap-around."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Primitives vs Wrappers",
          "optionA": "Primitives: Raw binary on stack, zero GC overhead",
          "optionB": "Wrappers: 16-24B heap object, nullable, supports Generics"
        },
        {
          "aspect": "BigDecimal vs Double",
          "optionA": "Double: Fast hardware base-2 floating point (imprecise)",
          "optionB": "BigDecimal: Arbitrary-precision base-10 decimal (exact)"
        },
        {
          "aspect": "equals() vs compareTo()",
          "optionA": "equals(): Value AND scale must match exactly",
          "optionB": "compareTo(): Numerical value only; scale is ignored"
        }
      ]
    },
    "beginnerMistakes": [
      {
        "mistake": "Testing wrapper equality with `==` in unit tests with small numbers.",
        "whyItHappens": "Unit tests using test IDs <= 127 pass due to IntegerCache, but crash in production with real IDs >= 128.",
        "howToFix": "Always use Objects.equals(a, b) or a.equals(b) across all wrapper objects.",
        "codeSnippet": "// WRONG: passes test with id=10, fails in prod with id=500\nif (order1.getId() == order2.getId()) { ... }\n// RIGHT\nif (Objects.equals(order1.getId(), order2.getId())) { ... }"
      },
      {
        "mistake": "Using `double` for currency and calculating tax with binary floating point.",
        "whyItHappens": "Developer assumes double stores 0.1 accurately, causing missing-penny reconciliation errors.",
        "howToFix": "Use BigDecimal with String constructors and RoundingMode.HALF_EVEN (Banker's Rounding).",
        "codeSnippet": "// WRONG\ndouble total = 0.1 + 0.2; // 0.30000000000000004\n// RIGHT\nBigDecimal total = new BigDecimal(\"0.1\").add(new BigDecimal(\"0.2\")); // 0.3"
      }
    ],
    "practiceProblems": [
      {
        "title": "IntegerCache Range Crossing Puzzle",
        "problemStatement": "What is printed by:\n```java\nInteger a = 120;\nInteger b = 120;\nInteger c = 130;\nInteger d = 130;\nSystem.out.println((a == b) + \" \" + (c == d) + \" \" + c.equals(d));\n```",
        "options": [
          "true true true",
          "true false true",
          "false false true",
          "true false false"
        ],
        "correctOptionIndex": 1,
        "hint": "120 is within the -128..127 cache; 130 exceeds the cache. equals() checks numeric value.",
        "solution": "true false true",
        "explanation": "120 is inside IntegerCache, so a and b reference the same cached object (true). 130 is outside the cache, so c and d reference distinct heap objects (false). c.equals(d) compares primitive int values (true)."
      },
      {
        "title": "Ternary Unboxing with Mixed Types and Null",
        "problemStatement": "What is the result of running:\n```java\nInteger n = null;\nboolean cond = true;\ndouble res = cond ? 5.0 : n;\nSystem.out.println(res);\n```",
        "options": [
          "Prints 5.0",
          "Throws NullPointerException at runtime",
          "Compilation error",
          "Prints 0.0"
        ],
        "correctOptionIndex": 0,
        "hint": "Because cond is true, is the false branch (n) evaluated?",
        "solution": "Prints 5.0",
        "explanation": "In a ternary expression `cond ? expr1 : expr2`, short-circuit evaluation guarantees that only the selected branch is evaluated. Because cond is true, only 5.0 is evaluated. The false branch (n) is never evaluated, so no unboxing NPE occurs."
      },
      {
        "title": "Two's Complement Byte Overflow Wrap",
        "problemStatement": "What is the output of:\n```java\nbyte b = 125;\nb += 5;\nSystem.out.println(b);\n```",
        "options": [
          "130",
          "-126",
          "-128",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "125 + 5 = 130. 130 - 256 = -126 in 8-bit signed two's complement.",
        "solution": "-126",
        "explanation": "125 + 5 = 130. A byte can only hold up to +127. 130 wraps into negative space: 130 - 256 = -126."
      },
      {
        "title": "BigDecimal HashSet Duplicate Detection",
        "problemStatement": "What does the following snippet print?\n```java\nSet<BigDecimal> set = new HashSet<>();\nset.add(new BigDecimal(\"1.0\"));\nset.add(new BigDecimal(\"1.00\"));\nSystem.out.println(set.size());\n```",
        "options": [
          "1",
          "2",
          "Throws IllegalArgumentException",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "HashSet relies on equals() and hashCode(). In BigDecimal, does 1.0 equal 1.00?",
        "solution": "2",
        "explanation": "BigDecimal.equals() compares both value and scale. Scale 1 != scale 2, so equals() returns false and hash codes differ; HashSet retains both as distinct items (size 2)."
      },
      {
        "title": "Primitive Widening vs Boxing in Overload",
        "problemStatement": "Given:\n```java\nstatic String check(long l) { return \"primitive long\"; }\nstatic String check(Integer i) { return \"boxed Integer\"; }\npublic static void main(String[] args) {\n    int val = 10;\n    System.out.println(check(val));\n}\n```\nWhat is printed?",
        "options": [
          "boxed Integer",
          "primitive long",
          "Compilation error: ambiguous call",
          "Throws ClassCastException"
        ],
        "correctOptionIndex": 1,
        "hint": "Java overload resolution prioritizes primitive widening over autoboxing.",
        "solution": "primitive long",
        "explanation": "Primitive widening (int -> long) has higher priority than autoboxing (int -> Integer) in Java method overload resolution."
      },
      {
        "title": "Integer Division in Floating Assignment",
        "problemStatement": "What does `double d = 10 / 4; System.out.println(d);` print?",
        "options": [
          "2.5",
          "2.0",
          "2",
          "Compilation error"
        ],
        "correctOptionIndex": 1,
        "hint": "Both 10 and 4 are integer literals. Integer division truncates before widening to double.",
        "solution": "2.0",
        "explanation": "10 / 4 executes as integer division, truncating to 2. The int 2 is then widened to double, yielding 2.0 (not 2.5)."
      },
      {
        "title": "Character Code Point vs Digit Difference",
        "problemStatement": "What is the output of:\n```java\nchar ch = '5';\nint a = ch;\nint b = ch - '0';\nSystem.out.println(a + \":\" + b);\n```",
        "options": [
          "5:5",
          "53:5",
          "53:53",
          "5:53"
        ],
        "correctOptionIndex": 1,
        "hint": "ASCII code for '0' is 48, '5' is 53.",
        "solution": "53:5",
        "explanation": "Assigning char '5' to int widens its Unicode code point (ASCII 53). Subtracting '0' (53 - 48) computes the numeric value 5."
      },
      {
        "title": "Double.compare Natural Ordering",
        "problemStatement": "What is printed by:\n```java\nSystem.out.print((Double.NaN == Double.NaN) + \" \");\nSystem.out.println(Double.compare(Double.NaN, Double.NaN));\n```",
        "options": [
          "true 0",
          "false 0",
          "false 1",
          "true -1"
        ],
        "correctOptionIndex": 1,
        "hint": "Primitive NaN == NaN is always false, but Double.compare() treats NaN as equal to itself.",
        "solution": "false 0",
        "explanation": "According to IEEE 754, primitive NaN == NaN is always false. Double.compare() establishes a natural total order for sorting where Double.NaN equals Double.NaN (returning 0)."
      },
      {
        "title": "BigDecimal Non-Terminating Division Crash",
        "problemStatement": "What occurs when executing `BigDecimal.ONE.divide(new BigDecimal(\"3\"))`?",
        "options": [
          "Returns 0.333",
          "Returns 0.3333333333333333",
          "Throws ArithmeticException: Non-terminating decimal expansion",
          "Returns 0"
        ],
        "correctOptionIndex": 2,
        "hint": "1/3 has infinite decimal expansion; divide() without RoundingMode refuses to discard digits.",
        "solution": "Throws ArithmeticException: Non-terminating decimal expansion",
        "explanation": "BigDecimal.divide() requires an explicit RoundingMode when the quotient is non-terminating, or it throws ArithmeticException."
      },
      {
        "title": "Wrapper Array Default Initialization",
        "problemStatement": "Given:\n```java\nint[] prims = new int[2];\nInteger[] boxes = new Integer[2];\nSystem.out.println(prims[0] + \" vs \" + boxes[0]);\n```\nWhat is printed?",
        "options": [
          "0 vs 0",
          "0 vs null",
          "null vs null",
          "Throws NullPointerException"
        ],
        "correctOptionIndex": 1,
        "hint": "Primitives default to 0; reference arrays default to null.",
        "solution": "0 vs null",
        "explanation": "Primitive int arrays initialize slots to 0. Reference arrays (like Integer[]) initialize reference pointers to null."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Why does `Integer a = 127; Integer b = 127; a == b` return true, while `Integer a = 128; Integer b = 128; a == b` returns false?",
        "expectedAnswer": "Autoboxing invokes `Integer.valueOf()`. The JVM maintains an internal static cache (`IntegerCache`) that pre-instantiates Integer objects for values between -128 and +127 (inclusive). For 127, both variables receive the exact same cached reference pointer, so `==` compares identical memory addresses (true). For 128, the value exceeds the cache range, so `Integer.valueOf(128)` allocates two distinct heap objects. Because `==` on objects compares memory addresses, `a == b` evaluates to false.",
        "followUp": "How do you configure the upper bound of the Integer Cache?",
        "followUpAnswer": "Using the JVM option `-XX:AutoBoxCacheMax=<size>` or system property `-Djava.lang.Integer.IntegerCache.high=<size>`. The lower bound is fixed at -128 by the JLS.",
        "commonMistake": "Using `==` on wrapper objects in business logic.",
        "commonMistakeAnswer": "Never use == on wrapper objects; always use .equals() or Objects.equals()."
      },
      {
        "question": "Why should you never use `new BigDecimal(double)` for monetary calculations?",
        "expectedAnswer": "Passing a double primitive to `new BigDecimal(double)` imports the IEEE 754 binary floating-point representation error into the BigDecimal instance. For example, `new BigDecimal(0.1)` yields `0.1000000000000000055511151231257827021181583404541015625`. Always use `new BigDecimal(\"0.1\")` or `BigDecimal.valueOf(0.1)`, which safely converts the double to its canonical String representation first.",
        "followUp": "What is the difference between BigDecimal.equals() and BigDecimal.compareTo()?",
        "followUpAnswer": "equals() compares numerical value AND scale (`2.0` does NOT equal `2.00`). compareTo() compares only numerical value (`2.0` compareTo `2.00` is 0). In business logic, always use compareTo(other) == 0.",
        "commonMistake": "Using equals() to check if two monetary totals match.",
        "commonMistakeAnswer": "If one has scale 2 ($10.50) and another has scale 3 ($10.500), equals() returns false."
      },
      {
        "question": "How can autoboxing cause high Garbage Collection latency in high-throughput applications?",
        "expectedAnswer": "All wrapper classes are completely immutable. When an accumulator in a loop uses a wrapper type (e.g. `Long sum = 0L; sum += i;`), each iteration unboxes `sum`, performs addition on primitives, and calls `Long.valueOf(newSum)`, creating a new heap object. In a loop of 10 million iterations, 10 million temporary objects are allocated in Eden space, thrashing the CPU cache and triggering frequent Minor Garbage Collection Stop-The-World pauses.",
        "followUp": "How do you eliminate this overhead?",
        "followUpAnswer": "Use primitive `long sum = 0L;` or primitive collections libraries (like Eclipse Collections or fastutil) that store primitives directly without boxing.",
        "commonMistake": "Thinking modern JIT escape analysis always eliminates wrapper allocations.",
        "commonMistakeAnswer": "Escape analysis cannot eliminate heap allocations if accumulators escape method boundaries or exceed compiler inlining thresholds."
      },
      {
        "question": "Explain how unboxing can silently cause a NullPointerException.",
        "expectedAnswer": "Unboxing is implemented by invoking an instance method on the wrapper object (e.g. `wrapper.intValue()`, `wrapper.booleanValue()`). If the wrapper variable is null when unboxed—such as in arithmetic `box + 5`, an if condition `if (boolBox)`, or in a mixed-type ternary `flag ? 1.0 : intBox`—invoking the method on a null reference throws a runtime NullPointerException.",
        "followUp": "How do you protect against unboxing NPEs in ternary expressions?",
        "followUpAnswer": "Ensure all branches return consistent object types, or perform an explicit null check: `(val != null ? val : 0)`.",
        "commonMistake": "Assuming unboxing null defaults to 0.",
        "commonMistakeAnswer": "Unboxing null never defaults to zero; it always throws an immediate NullPointerException."
      },
      {
        "question": "What is the difference between Widening and Narrowing primitive conversions?",
        "expectedAnswer": "Widening converts a smaller type to a larger type (e.g. byte -> short -> int -> long -> float -> double). It occurs automatically (implicitly) without explicit casting and never causes runtime exceptions. Narrowing converts a larger type to a smaller type (e.g. double -> int). It requires an explicit cast `(int)` because it can lose magnitude bits (wrap-around) or precision (truncation).",
        "followUp": "Can widening conversion ever lose precision?",
        "followUpAnswer": "Yes. Widening from `int` (32 bits) or `long` (64 bits) to `float` (24-bit mantissa) or `long` to `double` (53-bit mantissa) can lose least-significant precision bits, even though magnitude is preserved.",
        "commonMistake": "Believing widening conversions are 100% mathematically lossless.",
        "commonMistakeAnswer": "Int-to-float and long-to-double widening can lose precision bits."
      },
      {
        "question": "What is RoundingMode.HALF_EVEN and why is it preferred for financial calculations?",
        "expectedAnswer": "RoundingMode.HALF_EVEN (Banker's Rounding) rounds towards the nearest neighbor unless both neighbors are equidistant, in which case it rounds towards the even neighbor (e.g. 2.5 -> 2, 3.5 -> 4). Standard HALF_UP introduces a systematic upward inflationary bias across millions of ledger entries. HALF_EVEN balances rounds up and down evenly, eliminating cumulative statistical drift.",
        "followUp": "What does RoundingMode.UNNECESSARY do?",
        "followUpAnswer": "It asserts that the division or scale adjustment has an exact result; if rounding is required, it throws ArithmeticException, acting as an automated integrity check.",
        "commonMistake": "Using HALF_UP for banking applications.",
        "commonMistakeAnswer": "Financial standards (like ISO and GAAP) mandate HALF_EVEN to prevent systematic rounding errors."
      },
      {
        "question": "What are the memory sizes of primitives vs their corresponding wrapper objects on a 64-bit JVM?",
        "expectedAnswer": "Primitives: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B), boolean (1B on stack/heap array). Wrappers (on 64-bit JVM with compressed OOPs): Integer/Float/Boolean/Byte/Short/Character consume 16 bytes (8B mark word + 4B klass word + primitive payload + padding). Long/Double consume 24 bytes (12B header + 8B payload + 4B padding). Plus 4-8 bytes for the reference pointer.",
        "followUp": "What is the memory footprint ratio of `int[]` vs `Integer[]` for 1 million numbers?",
        "followUpAnswer": "`int[1_000_000]` consumes ~4 MB of contiguous memory. `Integer[1_000_000]` consumes ~24 MB (~4 MB pointer array + ~20 MB of scattered 16-24B heap objects), a 6x memory explosion with poor CPU cache locality.",
        "commonMistake": "Assuming wrappers have negligible overhead compared to primitives.",
        "commonMistakeAnswer": "Wrappers create a 4x to 6x memory explosion and heavy pointer chasing."
      },
      {
        "question": "How does `Math.addExact(a, b)` differ from standard `a + b`?",
        "expectedAnswer": "Standard primitive addition `a + b` performs modular two's complement arithmetic; when the result exceeds 32-bit `Integer.MAX_VALUE`, it silently wraps around into negative numbers. `Math.addExact(a, b)` checks for arithmetic overflow and throws `java.lang.ArithmeticException: integer overflow`, providing fail-fast safety in mission-critical applications.",
        "followUp": "What other exact methods exist in java.lang.Math?",
        "followUpAnswer": "`subtractExact`, `multiplyExact`, `incrementExact`, `decrementExact`, `negateExact`, `toIntExact` (safe narrowing long to int), and `divideExact` (detecting MIN_VALUE / -1).",
        "commonMistake": "Assuming Java throws an exception when integers overflow.",
        "commonMistakeAnswer": "Java integer arithmetic wraps around silently by default; overflow exceptions require Math.xxxExact()."
      },
      {
        "question": "Why are wrapper classes declared `public final class` and completely immutable?",
        "expectedAnswer": "Wrapper classes are immutable and final to ensure thread safety, security, and hash-based collection integrity. Because they cannot be mutated, their hash codes never change, allowing them to serve safely as keys in `HashMap` and elements in `HashSet`. Immutability also allows safe sharing of pre-allocated Flyweight objects in `IntegerCache` without defensive copying.",
        "followUp": "Can you subclass `java.lang.Number` to create your own custom numeric type?",
        "followUpAnswer": "Yes, `Number` is an abstract class (extended by `BigDecimal`, `BigInteger`, `AtomicInteger`). However, you cannot subclass the wrapper classes themselves (`Integer`, `Double`, etc.) because they are final.",
        "commonMistake": "Believing `new Integer(10)` creates a mutable object.",
        "commonMistakeAnswer": "All wrapper objects are 100% immutable; any arithmetic produces a brand-new object."
      },
      {
        "question": "How does Java 10+ `var` interact with primitive types and literals?",
        "expectedAnswer": "`var` performs compile-time static type inference based on the initializer expression. For literals: `var a = 10;` is inferred as `int`. `var b = 10L;` is inferred as `long`. `var c = 10.0;` is inferred as `double`. `var d = 10.0f;` is inferred as `float`. `var e = \"hello\";` is inferred as `String`. `var` is not dynamic typing; once inferred at compile time, the variable is strictly and statically typed.",
        "followUp": "Can `var` be initialized to `null`?",
        "followUpAnswer": "No. `var x = null;` produces a compile-time error because `null` has no type from which javac can infer a concrete static type.",
        "commonMistake": "Thinking `var` behaves like JavaScript `var` or Python variables.",
        "commonMistakeAnswer": "`var` in Java is purely compile-time syntactic sugar; types are strictly static."
      }
    ],
    "miniQuiz": [
      {
        "question": "What is the result of `Integer.valueOf(127) == Integer.valueOf(127)` vs `Integer.valueOf(128) == Integer.valueOf(128)`?",
        "options": [
          "true true",
          "true false",
          "false false",
          "false true"
        ],
        "correctIndex": 1,
        "explanation": "127 is within the IntegerCache [-128, 127], returning the same object. 128 exceeds the cache, allocating two distinct heap objects."
      },
      {
        "question": "Why does `0.1 + 0.2 == 0.3` evaluate to false in primitive double arithmetic?",
        "options": [
          "0.1 and 0.2 are infinite repeating binary fractions in IEEE 754 base-2, producing 0.30000000000000004",
          "double can only store whole numbers",
          "Java compiler promotes 0.3 to float",
          "The addition overflows 64 bits"
        ],
        "correctIndex": 0,
        "explanation": "In IEEE 754 base-2 binary floating point, 0.1 cannot be represented finitely, causing truncation and rounding errors."
      },
      {
        "question": "Which constructor for `BigDecimal` should be AVOIDED for exact values?",
        "options": [
          "new BigDecimal(String)",
          "new BigDecimal(double)",
          "BigDecimal.valueOf(double)",
          "new BigDecimal(int)"
        ],
        "correctIndex": 1,
        "explanation": "new BigDecimal(double) captures the already-imprecise IEEE 754 binary floating-point representation."
      },
      {
        "question": "What is printed by `new BigDecimal(\"1.0\").equals(new BigDecimal(\"1.00\"))`?",
        "options": [
          "true",
          "false",
          "Compilation error",
          "Throws ArithmeticException"
        ],
        "correctIndex": 1,
        "explanation": "BigDecimal.equals() compares value AND scale; scale 1 != scale 2, returning false."
      },
      {
        "question": "How do you compare two `BigDecimal` values for numeric equivalence ignoring scale?",
        "options": [
          "a == b",
          "a.equals(b)",
          "a.compareTo(b) == 0",
          "Objects.equals(a, b)"
        ],
        "correctIndex": 2,
        "explanation": "compareTo() compares only the mathematical numerical value and ignores differences in scale."
      },
      {
        "question": "What happens when unboxing an `Integer` reference that is null?",
        "options": [
          "Evaluates to 0",
          "Throws NullPointerException",
          "Evaluates to -1",
          "Compile-time error"
        ],
        "correctIndex": 1,
        "explanation": "Unboxing invokes `.intValue()` on the reference; calling an instance method on null throws NullPointerException."
      },
      {
        "question": "What is the memory size of a primitive `int` vs a `java.lang.Integer` object on a 64-bit JVM with compressed OOPs?",
        "options": [
          "4 bytes vs 4 bytes",
          "4 bytes vs 8 bytes",
          "4 bytes vs 16 bytes",
          "4 bytes vs 32 bytes"
        ],
        "correctIndex": 2,
        "explanation": "Primitive int is 4 bytes. An Integer object on a 64-bit JVM with compressed OOPs has a 12-byte header + 4-byte payload = 16 bytes."
      },
      {
        "question": "What does `byte b = 127; b++;` evaluate to?",
        "options": [
          "128",
          "-128",
          "0",
          "Throws ArithmeticException"
        ],
        "correctIndex": 1,
        "explanation": "127 + 1 overflows the maximum signed 8-bit byte value (+127) and wraps cyclically around to -128."
      },
      {
        "question": "Which rounding mode is known as Banker's Rounding and is standard for financial applications?",
        "options": [
          "RoundingMode.HALF_UP",
          "RoundingMode.HALF_DOWN",
          "RoundingMode.HALF_EVEN",
          "RoundingMode.FLOOR"
        ],
        "correctIndex": 2,
        "explanation": "RoundingMode.HALF_EVEN rounds towards the nearest even neighbor when equidistant, eliminating statistical bias."
      },
      {
        "question": "What does `Integer.parseInt(\"100\")` return vs `Integer.valueOf(\"100\")`?",
        "options": [
          "parseInt returns primitive int; valueOf returns an Integer object reference",
          "parseInt returns Integer object; valueOf returns primitive int",
          "Both return primitive int",
          "Both return Integer objects"
        ],
        "correctIndex": 0,
        "explanation": "parseInt() parses directly to raw primitive int; valueOf() returns a java.lang.Integer object from IntegerCache."
      },
      {
        "question": "Which numeric wrapper classes do NOT have a Flyweight cache?",
        "options": [
          "Byte and Short",
          "Float and Double",
          "Character and Long",
          "Boolean and Integer"
        ],
        "correctIndex": 1,
        "explanation": "Float and Double have no cache because real numbers form an infinitely dense continuum."
      },
      {
        "question": "What exception is thrown by `Math.addExact(Integer.MAX_VALUE, 1)`?",
        "options": [
          "NullPointerException",
          "ArithmeticException",
          "IndexOutOfBoundsException",
          "ClassCastException"
        ],
        "correctIndex": 1,
        "explanation": "Math.addExact detects integer overflow and throws java.lang.ArithmeticException."
      },
      {
        "question": "What is the return type of `(true ? Integer.valueOf(1) : Double.valueOf(2.0))`?",
        "options": [
          "Integer",
          "Double",
          "Number",
          "Object"
        ],
        "correctIndex": 1,
        "explanation": "Binary numeric promotion unboxes both operands, promotes to double, and boxes the result to java.lang.Double."
      },
      {
        "question": "Why does `List<int>` fail to compile in Java?",
        "options": [
          "Generics use type erasure and compile down to Object; primitives do not inherit from Object",
          "int does not have methods",
          "Collections only accept Strings",
          "int is not serializable"
        ],
        "correctIndex": 0,
        "explanation": "Java Generics require reference types assignable to java.lang.Object; primitives require wrapper types like List<Integer>."
      },
      {
        "question": "What is the result of `var x = 10 / 4.0;`?",
        "options": [
          "x is inferred as int with value 2",
          "x is inferred as double with value 2.5",
          "x is inferred as float",
          "Compile error"
        ],
        "correctIndex": 1,
        "explanation": "Because 4.0 is a double literal, binary numeric promotion widens 10 to 10.0, evaluating to double 2.5."
      }
    ]
  }
};
