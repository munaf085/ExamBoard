import { DetailedLesson } from '../detailedLessons';

export const dataTypesLessons: Record<string, DetailedLesson> = {
  'variables-and-scope': {
    id: 'variables-and-scope',
    moduleId: 'java-data-types',
    moduleTitle: '2. Data Types & Variables',
    lessonNumber: 'Lesson 2.1',
    title: 'Variables, Declaration & Scope',
    subtitle: 'What is a variable, declaration vs initialization, local variables in main(), and block scope',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a variable as a labeled storage box in computer memory. You first choose what kind of items the box can hold (its data type, like int for whole numbers). Next, you write a label on the box so you can find it later (its name, like "score"). Finally, you place a value inside the box (assignment, like "score = 100"). When you need the value, you simply refer to the box by its label!',
    interviewTakeaways: [
      'Two Essential Parts: Every Java variable requires a Data Type (what it holds) and an Identifier Name (how you refer to it): "int score = 100;".',
      'Local Variables Have NO Default Values: Variables declared inside main() or any method MUST be initialized before reading. Attempting to use an uninitialized local variable causes a compile error.',
      'Reassignment vs Re-declaration: To change a variable\'s value, use "score = 150;". Never re-type the data type ("int score = 150;"), or Java will throw a duplicate variable error.',
      'Block Scope ({ }): A variable lives only within the curly braces where it was declared. Once execution exits that block, the variable is permanently destroyed.'
    ],
    cheatSheet: {
      summary: 'A variable is a named memory location that stores data. In Java, variables must have a declared type and must be initialized before reading.',
      syntaxTemplate: `// 1. Declaration only:
dataType variableName;          // e.g. int score;

// 2. Initialization / Assignment:
variableName = value;           // e.g. score = 100;

// 3. Combined Declaration + Initialization (Best Practice):
dataType variableName = value;  // e.g. int age = 21;
double price = 19.99;
String name = "Alex";
boolean isEnrolled = true;

// 4. Reassigning a new value (do NOT repeat dataType):
age = 22;`,
      rules: [
        { rule: 'Strong Typing', explanation: 'Java is strongly typed: a variable declared as int can ONLY store integer values, not text or decimals.' },
        { rule: 'No Defaults for Local Variables', explanation: 'Local variables in main() have no default values and must be assigned before use.' },
        { rule: 'Block Scope ({ })', explanation: 'Variables declared inside an inner block { } cannot be accessed outside those curly braces.' },
        { rule: 'Naming Convention', explanation: 'Use camelCase for variable names: studentAge, totalScore, accountBalance.' }
      ],
      quickComparison: [
        { aspect: 'Declaration', optionA: 'Tells Java the type and name: int score;', optionB: 'Allocates memory reference without assigning value' },
        { aspect: 'Initialization', optionA: 'Assigns the first value: score = 100;', optionB: 'Can be done on same line or later before reading' },
        { aspect: 'Reassignment', optionA: 'Updates value: score = 200; (no type keyword)', optionB: 'Writing "int score = 200;" again causes compiler error' },
        { aspect: 'Local Scope', optionA: 'Inside method/block: exists on stack frame', optionB: 'Destroyed immediately when closing brace } is reached' }
      ]
    },
    coreExplanation: [
      'What is a Variable? A variable is a named container in computer memory that holds a value while your program is running. You can think of it as a labeled box where you store data that your code needs to remember, update, and use.',
      'Declaration vs Initialization: Declaration announces to Java what kind of data the variable holds and what its name is (e.g. "int age;"). Initialization is the act of giving that variable its initial value using the assignment operator "=" (e.g. "age = 25;"). In everyday Java, you typically combine both into one line: "int age = 25;".',
      'Local Variables in the main() Method: Any variable declared inside the main() method or inside any code block { } is called a Local Variable. Local variables live in temporary memory (the stack) and exist only while that block of code is executing.',
      'THE #1 JAVA RULE: Local Variables Have NO Default Values! Unlike some other languages, Java will NEVER automatically fill an uninitialized local variable with 0 or null. If you write "int score; System.out.println(score);", the Java compiler halts immediately with an error: "variable score might not have been initialized". You must always assign a value before using it!',
      'Updating and Reassigning Variables: Variables are called "variable" because their values can change over time. Once a variable is declared, you update its value simply by using the variable name with "=": "score = score + 10;". NEVER re-declare the type (e.g. "int score = 50;"), or Java will throw a "variable score is already defined" error.',
      'Block Scope with Curly Braces { }: In Java, scope is determined strictly by curly braces { }. A variable declared inside an inner block (such as an if-statement or a standalone { } block) is created when entering the block and destroyed the moment Java reaches the closing brace }. It cannot be seen or used outside that block.',
      'Java Naming Rules (Identifiers): (1) Must start with a letter (a-z, A-Z), an underscore (_), or dollar sign ($)—NEVER a number; (2) Can contain digits after the first character (e.g. "player1" is valid, but "1player" is illegal); (3) Cannot use Java keywords like "class", "public", "int", "static"; (4) Case-sensitive ("age" and "Age" are two distinct variables); (5) Java convention uses camelCase (e.g. "studentExamScore").'
    ],
    diagram: `+-------------------------------------------------------------+
|  public static void main(String[] args) {                   |
|                                                             |
|      int age = 21;          [ Memory: age = 21 ]            |
|      String name = "Alex";  [ Memory: name = "Alex" ]       |
|                                                             |
|      +-- Inner Block { } ---------------------------------+  |
|      |  int bonus = 50;     [ Memory: bonus = 50 ]        |  |
|      |                                                    |  |
|      |  // "age", "name", AND "bonus" are accessible here |  |
|      +----------------------------------------------------+  |
|                                                             |
|      // "bonus" is DESTROYED when reaching } above!         |
|      // Attempting to print "bonus" here causes an error:   |
|      // "cannot find symbol: variable bonus"                |
|                                                             |
|      // "age" and "name" remain accessible until main() ends|
+-------------------------------------------------------------+`,
    codeSnippet: {
      title: 'Declaring, Initializing, and Updating Local Variables',
      code: `public class VariableBasics {
    public static void main(String[] args) {
        // 1. Declaring and initializing local variables of various types
        int studentAge = 20;
        double gpa = 3.85;
        String studentName = "Alex";
        boolean isEnrolled = true;

        System.out.println("Student Name: " + studentName);
        System.out.println("Age: " + studentAge);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + isEnrolled);

        // 2. Reassigning / Updating variable values over time
        studentAge = 21;             // Reassignment (notice: no "int" keyword!)
        gpa = 3.90;                  // Updated GPA
        System.out.println("Updated Age on Birthday: " + studentAge);
        System.out.println("Updated GPA after semester: " + gpa);

        // 3. Block Scope: Variables created inside { } live only inside { }
        {
            int semesterCredits = 15; // Local strictly to this inner block
            System.out.println("Credits inside block: " + semesterCredits);
            System.out.println("Student inside block: " + studentName); // Accessible!
        }
        // System.out.println(semesterCredits); // ERROR! semesterCredits was destroyed above!
    }
}`,
      lineByLineExplanation: [
        { line: 'int studentAge = 20;', explanation: 'Declares an integer variable named studentAge and initializes it to 20.' },
        { line: 'studentAge = 21;', explanation: 'Updates the value of studentAge to 21. We do NOT write "int" again because it is already declared.' },
        { line: '{ int semesterCredits = 15; }', explanation: 'Defines an inner block. semesterCredits is born at the opening brace { and destroyed at the closing brace }.' },
        { line: 'System.out.println(studentName);', explanation: 'The outer variable studentName is fully accessible inside inner blocks.' }
      ],
      output: `Student Name: Alex
Age: 20
GPA: 3.85
Enrolled: true
Updated Age on Birthday: 21
Updated GPA after semester: 3.9
Credits inside block: 15
Student inside block: Alex`
    },
    codeExamples: [
      {
        title: 'Example 1: The Uninitialized Local Variable Compiler Error',
        description: 'Demonstrating why local variables MUST be initialized before reading them in Java.',
        code: `public class UninitializedDemo {
    public static void main(String[] args) {
        int score; // Declared, but NOT initialized!

        // The following line would FAIL to compile:
        // System.out.println(score); // error: variable score might not have been initialized

        // Fix: Give it a value before using it!
        score = 100;
        System.out.println("Now score is safely initialized: " + score);
    }
}`,
        output: 'Now score is safely initialized: 100'
      },
      {
        title: 'Example 2: Accumulating & Updating a Running Counter',
        description: 'Showing how a variable varies by adding to its previous value.',
        code: `public class CounterDemo {
    public static void main(String[] args) {
        int totalCoins = 0;
        System.out.println("Starting coins: " + totalCoins);

        totalCoins = totalCoins + 5;  // Earn 5 coins
        System.out.println("After quest: " + totalCoins);

        totalCoins = totalCoins + 10; // Earn 10 more coins
        System.out.println("After treasure chest: " + totalCoins);

        totalCoins = totalCoins - 3;  // Spent 3 coins
        System.out.println("Final coin balance: " + totalCoins);
    }
}`,
        output: `Starting coins: 0
After quest: 5
After treasure chest: 15
Final coin balance: 12`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Trying to use a local variable without initializing it (e.g. "int total; System.out.println(total);").',
        whyItHappens: 'Assuming Java automatically fills local variables with default values like 0.',
        howToFix: 'Always assign an initial value before reading a local variable: "int total = 0;".'
      },
      {
        mistake: 'Re-declaring the variable type when reassigning a value: "int score = 10; ... int score = 20;".',
        whyItHappens: 'Forgetting that data type is only written ONCE during declaration.',
        howToFix: 'When changing an existing variable, omit the type keyword: "score = 20;".'
      },
      {
        mistake: 'Trying to access a variable outside the curly braces { } where it was created.',
        whyItHappens: 'Not realizing that variables are destroyed when execution exits their enclosing block.',
        howToFix: 'Declare the variable in the outer scope before the block if you need to use its value afterward.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between variable declaration and variable initialization in Java?',
        answer: 'Declaration informs the Java compiler about the variable\'s type and identifier name so memory can be reserved (e.g. "int score;"). Initialization is the act of assigning a concrete value to that variable for the first time (e.g. "score = 100;"). In Java, declaration and initialization can be combined in one line: "int score = 100;".',
        followUp: 'Can you re-declare a variable with the same name in the same scope?',
        keyPhrases: ['type and name registration', 'first assignment', 'combined declaration + initialization', 'duplicate variable error'],
        commonMistakeAnswer: 'Confusing assignment with declaration.'
      },
      {
        question: 'Do local variables get default values in Java?',
        answer: 'No! Local variables in Java (variables declared inside methods, constructors, or blocks) do NOT receive default values. If you attempt to read or print a local variable before explicitly assigning a value to it, the Java compiler reports a compile-time error: "variable might not have been initialized".',
        followUp: 'Why does Java enforce this rule for local variables?',
        keyPhrases: ['no default values', 'compile-time error', 'uninitialized variable prevention', 'safety on stack'],
        commonMistakeAnswer: 'Assuming local integers default to 0.'
      },
      {
        question: 'How does block scope work with curly braces { } in Java?',
        answer: 'A variable\'s scope is limited to the block { } in which it is declared. It is allocated on the stack frame when execution enters the block and is destroyed the moment execution leaves the closing brace }. Code outside that block cannot see or access the variable.',
        followUp: 'Can an inner block access variables declared in an enclosing outer block?',
        keyPhrases: ['bounded by curly braces', 'stack allocation and destruction', 'inner block sees outer variables', 'outer block cannot see inner variables'],
        commonMistakeAnswer: 'Thinking variables exist throughout the entire method regardless of inner blocks.'
      }
    ],
    miniQuiz: [
      {
        question: 'What happens when you compile this code: int total; System.out.println(total); inside main()?',
        options: ['Prints 0', 'Prints null', 'Compilation Error: variable total might not have been initialized', 'Throws NullPointerException at runtime'],
        correctIndex: 2,
        explanation: 'Local variables in Java have no default values. Attempting to read an uninitialized local variable causes a compile-time error.'
      },
      {
        question: 'Which of the following is an ILLEGAL variable name in Java?',
        options: ['totalScore', '_userAge', '2ndPlayer', '$balance'],
        correctIndex: 2,
        explanation: 'In Java, variable names cannot start with a digit. "2ndPlayer" is illegal, while "player2" would be legal.'
      },
      {
        question: 'When a variable is declared inside an inner block { int temp = 10; }, where can it be accessed?',
        options: ['Anywhere inside that inner block only', 'Anywhere in the entire main() method', 'Across all methods in the class', 'Inside any file in the same package'],
        correctIndex: 0,
        explanation: 'Variables declared inside an inner block { } are scoped strictly to that block and are destroyed when execution reaches the closing brace }.'
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
};
