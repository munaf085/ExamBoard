import { DetailedLesson } from '../detailedLessons';

export const operatorsLessons: Record<string, DetailedLesson> = {
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
};
