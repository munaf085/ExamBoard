import { DetailedLesson } from '../../detailedLessons';

export const op31_33_lessons: Record<string, DetailedLesson> = {
  // ============================================================
  // LESSON 3.1: Arithmetic Operators & Modulo (%)
  // ============================================================
  'arithmetic-and-modulo': {
    id: 'arithmetic-and-modulo',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.1',
    title: 'Arithmetic Operators & Modulo (%)',
    subtitle: 'Integer division, floating-point math, operator precedence, and the power of the remainder operator',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of 14 eggs packed into standard cartons holding 6 eggs each. If you divide 14 by 6 (14 / 6), you get 2 complete cartons—that is integer division, which ignores anything that does not fill a full carton. The 2 loose eggs sitting on the counter that could not make a full carton are the remainder (14 % 6 = 2)—that is the modulo operator!',
    coreExplanation: [
      'The Five Core Arithmetic Operators: Java provides five fundamental binary arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), and modulo (%). Each operates on two numeric operands and evaluates to a single numeric result.',
      'The Integer Division Truncation Trap: When both operands of the division operator (/) are integers (byte, short, int, long), Java performs integer division. The fractional part is completely discarded (truncated toward zero)—never rounded up! For example, 7 / 2 evaluates to 3, and 1 / 2 evaluates to 0.',
      'Floating-Point Division: If either operand (or both) is a floating-point type (float or double), Java promotes the other operand and executes floating-point division. For example, 7.0 / 2 or (double) 7 / 2 evaluates to 3.5.',
      'The Modulo Operator (%) Defined: The modulo operator calculates the remainder left over after integer division. Formally, for integers a and b, the remainder r satisfies the mathematical equation: a = (a / b) * b + (a % b). For instance, 17 % 5 = 2 because 17 = (3 * 5) + 2.',
      'Superpower 1 - Even or Odd Detection: Because any even number divided by 2 has no remainder, number % 2 == 0 evaluates to true for even numbers, while number % 2 != 0 evaluates to true for odd numbers.',
      'Superpower 2 - Digit Extraction and Truncation: Using modulo 10 (num % 10) extracts the rightmost (units) digit of an integer (e.g., 489 % 10 = 9). Conversely, integer division by 10 (num / 10) strips off the rightmost digit (e.g., 489 / 10 = 48). Together, they allow step-by-step digit processing.',
      'Sign Rules for Modulo in Java: In Java, the sign of the modulo result is strictly governed by the sign of the left operand (the dividend). The sign of the right operand (the divisor) is completely ignored! Thus, -7 % 3 = -1, whereas 7 % -3 = 1, and -7 % -3 = -1.',
      'Division by Zero Rules: Dividing an integer by zero (e.g., 10 / 0 or 10 % 0) causes the Java runtime to crash immediately with an ArithmeticException: / by zero. In contrast, dividing a floating-point number by zero (e.g., 10.0 / 0.0) does NOT throw an exception; it yields Double.POSITIVE_INFINITY, while 0.0 / 0.0 yields Double.NaN (Not a Number).'
    ],
    diagram: `+---------------------------------------------------------------------------------+
|                       JAVA ARITHMETIC & DIVISION ARCHITECTURE                   |
+---------------------------------------------------------------------------------+
| 1. INTEGER DIVISION (Truncation toward zero):                                   |
|    int a = 7;                                                                   |
|    int b = 2;                                                                   |
|    int result = a / b;  -->  7 / 2 = 3   (The decimal .5 is chopped off!)        |
|                                                                                 |
| 2. FLOATING-POINT DIVISION (Preserves decimals):                                |
|    double result = 7.0 / 2;  -->  3.5    (Because 7.0 is double, 2 promotes)   |
|                                                                                 |
| 3. MODULO / REMAINDER OPERATOR (%):                                             |
|          Dividend (7) % Divisor (2) = Remainder (1)                             |
|                                                                                 |
|              3   <-- Quotient (from 7 / 2)                                      |
|            +---                                                                 |
|         2  | 7                                                                  |
|            - 6                                                                  |
|            ---                                                                  |
|              1   <-- Remainder (from 7 % 2)                                     |
|                                                                                 |
| 4. DIGIT MANIPULATION COMBO:                                                    |
|    int num = 487;                                                               |
|    int lastDigit    = num % 10;  --> 7   (Extracts rightmost digit)             |
|    int dropLastDigit = num / 10; --> 48  (Removes rightmost digit)              |
+---------------------------------------------------------------------------------+`,
    codeSnippet: {
      title: 'Arithmetic Operators, Integer Truncation, and Modulo in Action',
      code: `public class ArithmeticDemo {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        // 1. Basic Operations
        int sum = a + b;           // 22
        int diff = a - b;          // 12
        int prod = a * b;          // 85
        int intDiv = a / b;        // 3 (integer truncation: 17 / 5 = 3)
        int rem = a % b;           // 2 (remainder: 17 - (3 * 5) = 2)

        System.out.println("Integer Division (17 / 5): " + intDiv);
        System.out.println("Modulo Remainder (17 % 5): " + rem);

        // 2. Floating-point division requires at least one double operand
        double exactDiv = (double) a / b;
        System.out.println("Exact Division ((double)17 / 5): " + exactDiv);

        // 3. Digit extraction
        int number = 839;
        int unitsDigit = number % 10;
        int remainingPart = number / 10;
        System.out.println("Units digit of 839: " + unitsDigit);
        System.out.println("Remaining after / 10: " + remainingPart);
    }
}`,
      lineByLineExplanation: [
        { line: 'int intDiv = a / b;', explanation: 'Both 17 and 5 are ints, so Java truncates the 0.4 fractional portion, storing 3.' },
        { line: 'int rem = a % b;', explanation: 'Calculates the integer remainder left over when 17 is divided by 5, resulting in 2.' },
        { line: 'double exactDiv = (double) a / b;', explanation: 'Explicitly casts "a" to double (17.0) before division, promoting 5 to 5.0 and producing 3.4.' },
        { line: 'int unitsDigit = number % 10;', explanation: 'Dividing 839 by 10 leaves remainder 9, successfully extracting the units place.' },
        { line: 'int remainingPart = number / 10;', explanation: 'Integer division by 10 strips off the units digit, leaving 83.' }
      ],
      output: `Integer Division (17 / 5): 3
Modulo Remainder (17 % 5): 2
Exact Division ((double)17 / 5): 3.4
Units digit of 839: 9
Remaining after / 10: 83`
    },
    codeExamples: [
      {
        title: 'Example 1: The Integer Division Pitfall vs Explicit Type Casting',
        description: 'Demonstrates what happens when dividing integers vs casting to double before the division occurs.',
        code: `public class DivisionCastingDemo {
    public static void main(String[] args) {
        int score1 = 85;
        int score2 = 90;
        int count = 2;

        // PITFALL: Integer division happens FIRST, then assigned to double!
        double wrongAverage = (score1 + score2) / count; // (175) / 2 = 87 -> 87.0

        // CORRECT: Cast the sum or denominator to double before division
        double rightAverage = (double) (score1 + score2) / count; // 175.0 / 2 = 87.5

        System.out.println("Wrong Average: " + wrongAverage);
        System.out.println("Right Average: " + rightAverage);
    }
}`,
        output: `Wrong Average: 87.0
Right Average: 87.5`
      },
      {
        title: 'Example 2: Modulo Powers - Even/Odd Checking & Time Conversion',
        description: 'Converting total seconds into minutes and remaining seconds using division and modulo.',
        code: `public class ModuloUseCases {
    public static void main(String[] args) {
        // Even/Odd check
        int testNumber = 27;
        boolean isEven = (testNumber % 2 == 0);
        System.out.println(testNumber + " is even? " + isEven);

        // Time conversion: 145 seconds to minutes and seconds
        int totalSeconds = 145;
        int minutes = totalSeconds / 60;        // 145 / 60 = 2 minutes
        int remainingSeconds = totalSeconds % 60; // 145 % 60 = 25 seconds

        System.out.println(totalSeconds + " seconds = " + minutes + " min and " + remainingSeconds + " sec");
    }
}`,
        output: `27 is even? false
145 seconds = 2 min and 25 sec`
      },
      {
        title: 'Example 3: Modulo with Negative Numbers & Division by Zero',
        description: 'Examining sign retention in Java modulo and behavior of integer vs floating-point division by zero.',
        code: `public class ModuloSignsAndZero {
    public static void main(String[] args) {
        // Sign is taken strictly from the left operand (dividend)
        System.out.println(" 7 %  3 = " + (7 % 3));    //  1
        System.out.println("-7 %  3 = " + (-7 % 3));   // -1
        System.out.println(" 7 % -3 = " + (7 % -3));   //  1 (minus on right ignored!)
        System.out.println("-7 % -3 = " + (-7 % -3));  // -1

        // Floating-point division by zero produces Infinity, not a crash
        double fpZero = 10.0 / 0.0;
        double fpNaN = 0.0 / 0.0;
        System.out.println("10.0 / 0.0 = " + fpZero);
        System.out.println(" 0.0 / 0.0 = " + fpNaN);
    }
}`,
        output: ` 7 %  3 = 1
-7 %  3 = -1
 7 % -3 = 1
-7 % -3 = -1
10.0 / 0.0 = Infinity
 0.0 / 0.0 = NaN`
      }
    ],
    cheatSheet: {
      summary: 'Arithmetic operators compute sums, differences, products, quotients, and remainders. Integer division truncates decimals toward zero; cast operands to double to retain precision. Modulo (%) computes remainder and retains the sign of the dividend.',
      syntaxTemplate: `// Basic arithmetic
int sum = a + b;
int diff = a - b;
int prod = a * b;
int quotient = a / b;      // Truncates toward zero if both are integers!
int remainder = a % b;     // Remainder: a - (a / b) * b

// Floating-point division (preserves decimals)
double exact = (double) a / b;

// Even / Odd check
boolean isEven = (num % 2 == 0);
boolean isOdd = (num % 2 != 0); // Always use != 0 to handle negative odds!

// Digit extraction
int lastDigit = num % 10;
int removeLastDigit = num / 10;`,
      rules: [
        { rule: 'Integer Truncation', explanation: 'If both operands are integers, / drops all decimal digits without rounding (e.g., 5 / 2 is 2, not 2.5).' },
        { rule: 'Double Promotion', explanation: 'If at least one operand in an arithmetic expression is double, Java promotes the entire operation to double.' },
        { rule: 'Dividend Determines Modulo Sign', explanation: 'The sign of a % b matches the sign of a. The sign of b has no effect on the result.' },
        { rule: 'Integer Division by Zero Crashes', explanation: 'Dividing an int by 0 or 0L throws ArithmeticException: / by zero at runtime.' },
        { rule: 'Floating Division by Zero Yields Infinity', explanation: 'Dividing a float or double by 0.0 yields Infinity or NaN without throwing an exception.' },
        { rule: 'Left-to-Right Associativity', explanation: '*, /, and % share equal precedence and are evaluated from left to right.' }
      ],
      quickComparison: [
        { aspect: 'Integer Division (7 / 2)', optionA: 'Produces integer 3', optionB: 'Truncates fractional .5 completely' },
        { aspect: 'Floating Division (7.0 / 2)', optionA: 'Produces double 3.5', optionB: 'Preserves fractional decimal portion' },
        { aspect: 'Modulo Operation (7 % 2)', optionA: 'Produces remainder 1', optionB: 'Finds left-over amount after full divisions' },
        { aspect: 'Negative Dividend (-7 % 2)', optionA: 'Produces -1', optionB: 'Sign matches left operand (-7)' },
        { aspect: 'Division by Zero (5 / 0 vs 5.0 / 0)', optionA: '5 / 0 crashes (ArithmeticException)', optionB: '5.0 / 0 yields Infinity' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Calculating averages with integer division: double avg = (a + b) / 2;',
        whyItHappens: 'Both (a + b) and 2 are integers, so integer division truncates the decimal before assigning to the double variable.',
        howToFix: 'Divide by a floating-point literal or cast: double avg = (a + b) / 2.0; or (double) (a + b) / 2;'
      },
      {
        mistake: 'Checking for odd numbers using "num % 2 == 1"',
        whyItHappens: 'In Java, negative odd numbers produce -1 with % 2 (e.g., -5 % 2 is -1, not 1). Thus, -5 % 2 == 1 evaluates to false!',
        howToFix: 'Always check for odd using "num % 2 != 0", which correctly returns true for both positive and negative odd numbers.'
      },
      {
        mistake: 'Dividing by zero with integer variables (x / y when y is 0)',
        whyItHappens: 'Math does not allow division by zero, causing Java to throw ArithmeticException: / by zero at runtime.',
        howToFix: 'Always validate that the denominator is not zero using an if condition before dividing.'
      },
      {
        mistake: 'Assuming addition has precedence over string concatenation: System.out.println("Total: " + 10 + 20);',
        whyItHappens: 'Left-to-right evaluation converts 10 to a string ("Total: 10"), and then concatenates 20, printing "Total: 1020".',
        howToFix: 'Wrap numeric additions in parentheses: System.out.println("Total: " + (10 + 20));'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Integer Division Truncation',
        problemStatement: 'What does the following Java code print to the console?',
        code: `int x = 9;
int y = 2;
double result = x / y;
System.out.println(result);`,
        options: ['4.5', '4.0', '5.0', 'Compilation Error'],
        correctOptionIndex: 1,
        hint: 'Consider the types of x and y. Does the division happen as integer division or double division before the assignment?',
        solution: '4.0',
        explanation: 'Both x and y are integers, so "x / y" performs integer division: 9 / 2 = 4 (truncated). The integer value 4 is then assigned to the double variable result, widening it to 4.0. To get 4.5, at least one operand must be cast to double: (double) x / y.'
      },
      {
        title: 'Puzzle 2: Modulo with Negative Dividend',
        problemStatement: 'What is the output of the following print statement?',
        code: `int a = -19;
int b = 4;
System.out.println(a % b);`,
        options: ['-3', '3', '-1', '1'],
        correctOptionIndex: 0,
        hint: 'In Java, which operand determines the sign of the modulo result?',
        solution: '-3',
        explanation: 'In Java, a % b follows the formula: a - (a / b) * b. Here, -19 / 4 = -4 (truncated towards zero). Then -19 - (-4 * 4) = -19 - (-16) = -3. The sign is strictly taken from the left operand (the dividend, -19).'
      },
      {
        title: 'Puzzle 3: Modulo with Negative Divisor',
        problemStatement: 'What does this code snippet print?',
        code: `int a = 19;
int b = -4;
System.out.println(a % b);`,
        options: ['-3', '3', '4', '-4'],
        correctOptionIndex: 1,
        hint: 'Does the sign of the right operand (the divisor) affect the modulo result in Java?',
        solution: '3',
        explanation: 'In Java, the sign of the divisor (-4) is completely ignored in modulo operations. The sign of the dividend (19) is positive, so 19 % -4 is +3.'
      },
      {
        title: 'Puzzle 4: Mixed Operator Precedence',
        problemStatement: 'Trace the output of this expression:',
        code: `int a = 10 + 5 * 2 % 4 - 3;
System.out.println(a);`,
        options: ['9', '11', '7', '15'],
        correctOptionIndex: 0,
        hint: 'Multiplication (*), division (/), and modulo (%) have equal precedence and evaluate left to right before addition (+) and subtraction (-).',
        solution: '9',
        explanation: 'Step-by-step evaluation:\n1. 5 * 2 = 10\n2. 10 % 4 = 2\n3. Expression is now: 10 + 2 - 3\n4. Left-to-right: 10 + 2 = 12\n5. 12 - 3 = 9.'
      },
      {
        title: 'Puzzle 5: String Concatenation vs Addition',
        problemStatement: 'What is the exact console output of this code?',
        code: `int a = 5;
int b = 10;
System.out.println("Output: " + a + b * 2);`,
        options: ['Output: 520', 'Output: 25', 'Output: 30', 'Output: 5102'],
        correctOptionIndex: 0,
        hint: 'Multiplication has higher precedence than addition or string concatenation.',
        solution: 'Output: 520',
        explanation: 'Step-by-step:\n1. Multiplication (b * 2) evaluates first: 10 * 2 = 20.\n2. Now: "Output: " + a + 20.\n3. Left-to-right evaluation: "Output: " + 5 creates "Output: 5".\n4. "Output: 5" + 20 creates "Output: 520".'
      },
      {
        title: 'Puzzle 6: Extracting Multiple Digits',
        problemStatement: 'What does this sequence of operations print?',
        code: `int num = 753;
int d1 = num % 10;
num = num / 10;
int d2 = num % 10;
System.out.println(d1 + "" + d2);`,
        options: ['35', '53', '8', '75'],
        correctOptionIndex: 0,
        hint: 'd1 gets the units digit of 753. Then num is updated by dividing by 10 before d2 is extracted.',
        solution: '35',
        explanation: 'Step 1: d1 = 753 % 10 = 3.\nStep 2: num = 753 / 10 = 75.\nStep 3: d2 = 75 % 10 = 5.\nStep 4: d1 + "" + d2 concatenates "3" + "5" = "35".'
      },
      {
        title: 'Puzzle 7: Floating-Point Division by Zero',
        problemStatement: 'What is the result of running this code in Java?',
        code: `double a = 15.0;
double b = 0.0;
System.out.println(a / b);`,
        options: ['ArithmeticException: / by zero', 'Infinity', 'NaN', '0.0'],
        correctOptionIndex: 1,
        hint: 'Does IEEE 754 floating-point math throw an ArithmeticException like integers do?',
        solution: 'Infinity',
        explanation: 'In Java, integer division by zero throws ArithmeticException, but floating-point division by zero conforms to IEEE 754 standard and returns Infinity (Double.POSITIVE_INFINITY).'
      },
      {
        title: 'Puzzle 8: Zero Divided by Zero',
        problemStatement: 'What does the following snippet print?',
        code: `double res = 0.0 / 0.0;
System.out.println(res);`,
        options: ['0.0', 'Infinity', 'NaN', 'ArithmeticException'],
        correctOptionIndex: 2,
        hint: 'What does zero divided by zero represent in floating-point math?',
        solution: 'NaN',
        explanation: 'In floating-point math, 0.0 / 0.0 is mathematically undefined and produces Double.NaN (Not a Number).'
      }
    ],
    interviewQuestions: [
      {
        question: 'How does Java handle integer division, and why does 5 / 2 evaluate to 2 instead of 2.5?',
        answer: 'In Java, when an arithmetic operator receives two operands of an integer type (such as byte, short, int, or long), it performs integer arithmetic. For division, the fractional portion is strictly truncated toward zero. Java does not round up or down to the nearest integer; it simply discards all digits after the decimal point. Therefore, 5 / 2 yields 2.',
        followUp: 'How can you ensure that division between two integer variables preserves decimal precision in the result?',
        followUpAnswer: 'You must explicitly cast at least one of the integer operands to double or float before the division occurs, such as "(double) a / b" or "a / (double) b". This causes Java to promote the other operand to double and perform floating-point division, returning 2.5.',
        keyPhrases: ['integer truncation', 'truncated toward zero', 'widening primitive conversion', 'explicit cast to double'],
        commonMistakeAnswer: 'Candidates often write "double result = (double)(a / b);", which incorrectly casts AFTER integer division has already truncated the result to 2.0.'
      },
      {
        question: 'What is the modulo operator (%) in Java, and what mathematical formula does it follow?',
        answer: 'The modulo operator (%) computes the remainder of an integer division. In the Java Language Specification, it strictly follows the algebraic identity: a = (a / b) * b + (a % b), which can be rewritten as (a % b) = a - (a / b) * b. For example, 14 % 4 = 14 - (14 / 4) * 4 = 14 - (3 * 4) = 2.',
        followUp: 'Can the modulo operator be used with floating-point numbers like float and double in Java?',
        followUpAnswer: 'Yes! Unlike C or C++, Java fully supports modulo on floating-point numbers. For instance, 5.5 % 2.0 evaluates to 1.5, because 2.0 goes into 5.5 twice (4.0) with a remainder of 1.5.',
        keyPhrases: ['algebraic identity', 'a - (a / b) * b', 'remainder calculation', 'floating-point modulo supported'],
        commonMistakeAnswer: 'Many programmers mistakenly state that modulo is only defined for integer types in Java.'
      },
      {
        question: 'How are signs handled by the modulo operator when negative numbers are involved?',
        answer: 'In Java, the sign of the modulo operation is strictly determined by the sign of the left operand (the dividend). The sign of the right operand (the divisor) has zero effect on the result. For example, -7 % 3 = -1, and -7 % -3 = -1, but 7 % -3 = 1.',
        followUp: 'Why does this make "num % 2 == 1" dangerous for checking odd numbers?',
        followUpAnswer: 'If "num" is negative (e.g. -5), "-5 % 2" evaluates to -1. Testing "-5 % 2 == 1" produces false, incorrectly classifying -5 as not odd! The correct idiom for checking odd numbers is "num % 2 != 0".',
        keyPhrases: ['sign of dividend', 'divisor sign ignored', 'negative odd remainder is -1', 'num % 2 != 0'],
        commonMistakeAnswer: 'Assuming modulo always returns a positive remainder, or assuming the sign depends on standard multiplication sign rules.'
      },
      {
        question: 'What is the difference in behavior when dividing by zero in integer arithmetic versus floating-point arithmetic?',
        answer: 'Integer division by zero (such as 10 / 0 or 10 % 0) cannot be represented as an integer and immediately throws an unchecked ArithmeticException: / by zero at runtime. Floating-point division by zero (such as 10.0 / 0.0) complies with the IEEE 754 standard and does not throw an exception; it evaluates to Infinity (Double.POSITIVE_INFINITY or Double.NEGATIVE_INFINITY), while 0.0 / 0.0 evaluates to NaN (Not a Number).',
        followUp: 'How do you check in Java if a floating-point result ended up as NaN or Infinity?',
        followUpAnswer: 'You can use the static methods Double.isNaN(result) and Double.isInfinite(result). Note that you cannot use "result == Double.NaN" because NaN is never equal to anything, including itself!',
        keyPhrases: ['ArithmeticException: / by zero', 'IEEE 754 standard', 'Double.POSITIVE_INFINITY', 'Double.NaN', 'Double.isNaN()'],
        commonMistakeAnswer: 'Thinking all division by zero causes a crash or exception in Java.'
      },
      {
        question: 'What is operator precedence among Java arithmetic operators, and how does associativity work?',
        answer: 'Multiplication (*), division (/), and modulo (%) have the same level of precedence, which is higher than addition (+) and subtraction (-). Because their precedence is identical, expressions containing *, /, and % are evaluated with left-to-right associativity. Parentheses () have the highest precedence and force immediate evaluation.',
        followUp: 'In the expression "100 / 10 * 2", does division happen first or multiplication?',
        followUpAnswer: 'Division happens first due to left-to-right associativity: 100 / 10 = 10, and then 10 * 2 = 20. If multiplication had higher precedence, the answer would be 100 / 20 = 5, which is incorrect in Java.',
        keyPhrases: ['equal precedence', 'left-to-right associativity', 'parentheses override', 'leftmost operator first'],
        commonMistakeAnswer: 'Assuming multiplication always executes before division or modulo.'
      },
      {
        question: 'How do you extract individual digits of an integer using arithmetic operators without using Strings or loops?',
        answer: 'You pair the modulo operator (%) with integer division (/): modulo 10 gives the units digit (num % 10), and integer division by 10 (num / 10) removes that units digit. For a known 3-digit number like 487: hundreds = 487 / 100 = 4; tens = (487 / 10) % 10 = 8; units = 487 % 10 = 7.',
        followUp: 'Why is this arithmetic technique preferred over converting the number to a String in performance-critical code?',
        followUpAnswer: 'Arithmetic operations execute in single CPU clock cycles directly on hardware registers with zero memory allocations. Converting to a String creates multiple heap objects and performs character array copies, which creates garbage and hurts performance.',
        keyPhrases: ['num % 10 extracts', 'num / 10 removes', 'zero heap allocation', 'single CPU cycle'],
        commonMistakeAnswer: 'Relying immediately on String.valueOf(num).charAt() for basic numerical processing.'
      },
      {
        question: 'What happens when integer arithmetic exceeds the maximum value an int can hold (Integer.MAX_VALUE)?',
        answer: 'Java integer arithmetic does not throw an exception when an overflow occurs; instead, it silently wraps around using two\'s complement binary representation. For example, Integer.MAX_VALUE + 1 overflows to Integer.MIN_VALUE (-2147483648).',
        followUp: 'How can you perform integer arithmetic in Java and detect or prevent overflow?',
        followUpAnswer: 'You can use the Math class methods introduced in Java 8, such as Math.addExact(a, b) and Math.multiplyExact(a, b), which explicitly throw an ArithmeticException if an overflow occurs, or you can use 64-bit long variables.',
        keyPhrases: ['silent wraparound', 'two\'s complement', 'Integer.MAX_VALUE', 'Math.addExact()'],
        commonMistakeAnswer: 'Believing Java automatically throws an overflow error or automatically upgrades ints to longs.'
      },
      {
        question: 'Why does adding a string and numbers like "Score: " + 10 + 20 produce "Score: 1020" instead of "Score: 30"?',
        answer: 'The addition operator (+) is left-associative. Java evaluates the expression from left to right: first, "Score: " + 10 is evaluated. Because one operand is a String, the + operator behaves as string concatenation, producing "Score: 10". Next, "Score: 10" + 20 is evaluated, which concatenates 20, producing "Score: 1020".',
        followUp: 'How would you fix the expression so the numbers are added together first?',
        followUpAnswer: 'Add parentheses around the numeric operands: "Score: " + (10 + 20). Parentheses give 10 + 20 top precedence, evaluating to integer 30 before string concatenation occurs, resulting in "Score: 30".',
        keyPhrases: ['left-associative', 'string concatenation conversion', 'parentheses enforce numeric addition'],
        commonMistakeAnswer: 'Believing the compiler evaluates all numeric operators before considering any string concatenation.'
      },
      {
        question: 'Explain what happens during compound assignment with mixed types, such as "int x = 5; x += 4.5;".',
        answer: 'Compound assignment operators (+=, -=, *=, /=, %=) automatically perform an implicit type cast to the type of the left-hand variable. The expression "x += 4.5;" is equivalent to "x = (int)(x + 4.5);". Thus, 5 + 4.5 = 9.5, which is cast to int, storing 9 in x without any compiler error.',
        followUp: 'Would "x = x + 4.5;" compile in that same scenario?',
        followUpAnswer: 'No, "x = x + 4.5;" fails to compile with "Type mismatch: cannot convert from double to int", because x + 4.5 promotes to double and Java does not allow implicit narrowing conversion.',
        keyPhrases: ['implicit narrowing cast', 'E1 op= E2 is E1 = (T)(E1 op E2)', 'loss of precision'],
        commonMistakeAnswer: 'Claiming that "x += 4.5;" causes a compiler error just like "x = x + 4.5;".'
      },
      {
        question: 'What is circular indexing or buffer wrapping, and how does the modulo operator achieve it?',
        answer: 'Circular indexing is a technique where an index or counter wraps back around to 0 as soon as it reaches a maximum limit N. The modulo operation "index = (index + 1) % N" guarantees that the value of index will always remain in the valid range [0, N - 1]. When index reaches N - 1, the next step yields N % N = 0.',
        followUp: 'Can you give a practical real-world example of this concept?',
        followUpAnswer: 'A classic example is a 12-hour clock: 11 o\'clock plus 2 hours is 13, but 13 % 12 gives 1 o\'clock. Another example is cycling days of the week: (currentDay + daysToAdd) % 7.',
        keyPhrases: ['wrap-around to zero', 'range [0, N - 1]', 'circular buffer', 'clock arithmetic'],
        commonMistakeAnswer: 'Using complex if-else blocks instead of a clean, single modulo expression.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the result of the integer division expression: 13 / 4 in Java?',
        options: ['3', '3.25', '3.0', '4'],
        correctIndex: 0,
        explanation: 'Both 13 and 4 are integers, so Java truncates the decimal part .25, yielding integer 3.'
      },
      {
        question: 'What is the result of 13 % 4 in Java?',
        options: ['3.25', '1', '4', '0'],
        correctIndex: 1,
        explanation: '4 goes into 13 three times (12), leaving a remainder of 1 (13 - 12 = 1).'
      },
      {
        question: 'What does the expression (double)(7 / 2) evaluate to?',
        options: ['3.5', '3.0', '4.0', '3'],
        correctIndex: 1,
        explanation: 'The parentheses force (7 / 2) to evaluate first as integer division, producing 3. The cast (double) then widens 3 to 3.0.'
      },
      {
        question: 'What is the correct way to check if an integer "n" is an odd number that safely works for negative numbers?',
        options: ['n % 2 == 1', 'n % 2 != 0', 'n / 2 != 0', 'n % 2 > 0'],
        correctIndex: 1,
        explanation: 'In Java, negative odd numbers produce -1 with % 2 (e.g. -7 % 2 is -1). Therefore, checking "n % 2 != 0" correctly catches both positive and negative odd numbers.'
      },
      {
        question: 'What does -15 % 4 evaluate to in Java?',
        options: ['-3', '3', '-1', '1'],
        correctIndex: 0,
        explanation: 'In Java, the sign of the modulo result matches the sign of the dividend (the left operand, -15). 15 % 4 is 3, so -15 % 4 is -3.'
      },
      {
        question: 'What does 15 % -4 evaluate to in Java?',
        options: ['-3', '3', '-1', '1'],
        correctIndex: 1,
        explanation: 'The sign of the divisor (-4) is ignored. Because the dividend 15 is positive, the result is +3.'
      },
      {
        question: 'What is the runtime result of: int x = 10 / 0;?',
        options: ['0', 'Infinity', 'Throws ArithmeticException', 'NaN'],
        correctIndex: 2,
        explanation: 'Integer division by zero is illegal in Java and causes an ArithmeticException: / by zero at runtime.'
      },
      {
        question: 'What is the result of: double x = 10.0 / 0.0;?',
        options: ['Throws ArithmeticException', 'Double.POSITIVE_INFINITY', 'Double.NaN', '0.0'],
        correctIndex: 1,
        explanation: 'Floating-point division by zero follows IEEE 754 and evaluates to positive Infinity without throwing an exception.'
      },
      {
        question: 'What is the result of: System.out.println("Result: " + (5 + 5 * 2));?',
        options: ['Result: 15', 'Result: 20', 'Result: 510', 'Result: 25'],
        correctIndex: 0,
        explanation: 'Multiplication inside the parentheses occurs first: 5 * 2 = 10, then 5 + 10 = 15, resulting in "Result: 15".'
      },
      {
        question: 'Which operation extracts the hundreds digit of a 3-digit number "num = 842"?',
        options: ['num % 100', 'num / 100', '(num % 10) / 100', 'num / 10'],
        correctIndex: 1,
        explanation: '842 / 100 performs integer division, discarding 42 and leaving 8, the hundreds digit.'
      }
    ]
  },

  // ============================================================
  // LESSON 3.2: Pre vs Post Increment (++i vs i++)
  // ============================================================
  'pre-post-increment': {
    id: 'pre-post-increment',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.2',
    title: 'Pre vs Post Increment (++i vs i++)',
    subtitle: 'Prefix vs postfix evaluation order, expression values, and memory mutation mechanics',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of purchasing a prepaid mobile plan vs a postpaid plan. With prepaid (pre-increment ++i), you pay the bill BEFORE using the phone—the balance increases first, and then you use it. With postpaid (post-increment i++), you use the mobile service NOW, and the bill arrives AFTERWARDS—the current value is used in your expression immediately, and the variable increments only after that value has been consumed!',
    coreExplanation: [
      'The Unary Increment (++) and Decrement (--) Operators: Java provides increment (++) and decrement (--) unary operators that increase or decrease an integer or floating-point variable by 1 (equivalent to var = var + 1 or var = var - 1).',
      'The Prefix Form (++var, --var): In prefix notation, the operator is placed BEFORE the variable. The variable is updated in memory FIRST, and then the newly updated value is returned as the result of the expression.',
      'The Postfix Form (var++, var--): In postfix notation, the operator is placed AFTER the variable. The current (original) value of the variable is returned as the value of the expression FIRST, and then the variable in memory is incremented.',
      'Standalone Statements: When used as an isolated, standalone statement (e.g., "x++;" or "++x;"), both pre and post increment have the exact same end effect: variable x increases by 1. The difference ONLY matters when the operator is part of a larger expression, assignment, or print statement.',
      'Left-to-Right Evaluation Rule: Java strictly evaluates expressions from left to right. When an expression contains multiple increment operators (e.g. "a++ + ++a"), Java evaluates the left operand first (mutating memory), and that modified memory is seen by subsequent operands.',
      'The Infamous Self-Assignment Trap (i = i++;): When you write "i = i++;", the right-hand side post-increment evaluates to the original value of i (say, 5), and internally queues an increment. However, the assignment operator (=) then writes that saved original value (5) back into i, completely overwriting and wiping out the increment! The variable remains 5.',
      'Variables Only (L-values): The increment and decrement operators require a modifiable variable reference. Applying them to literal values (e.g. "5++") or arithmetic expressions (e.g. "(a + b)++") results in a compilation error: "unexpected type, required: variable, found: value".',
      'Implicit Type Casting: When using ++ on smaller primitive types (such as byte, short, or char), Java performs an implicit cast. For example, "byte b = 127; b++;" works and overflows to -128 without requiring "(byte)(b + 1)".'
    ],
    diagram: `+---------------------------------------------------------------------------------+
|                       PRE-INCREMENT VS POST-INCREMENT MECHANICS                 |
+---------------------------------------------------------------------------------+
| 1. PRE-INCREMENT (++x): "Update FIRST, then use"                                |
|    int x = 5;                                                                   |
|    int y = ++x;                                                                 |
|                                                                                 |
|    Step 1: x increases from 5 to 6 in memory  [ x = 6 ]                         |
|    Step 2: the new value 6 is assigned to y   [ y = 6 ]                         |
|    Final:  x = 6, y = 6                                                         |
|                                                                                 |
| 2. POST-INCREMENT (x++): "Use FIRST, then update"                               |
|    int x = 5;                                                                   |
|    int y = x++;                                                                 |
|                                                                                 |
|    Step 1: original value 5 is assigned to y  [ y = 5 ]                         |
|    Step 2: x increases from 5 to 6 in memory  [ x = 6 ]                         |
|    Final:  x = 6, y = 5                                                         |
|                                                                                 |
| 3. TRACING COMPOUND EXPRESSION: int result = a++ + ++a; (where a = 5)           |
|                                                                                 |
|       Term 1: a++                  Term 2: ++a                                  |
|       - Uses original 5            - a is currently 6                           |
|       - a becomes 6 in memory      - Increments a to 7 in memory                |
|                                    - Uses new value 7                           |
|                    \\                         /                                   |
|                     5           +           7   =   12                          |
|                                                                                 |
|    Final Values: result = 12, a = 7                                             |
+---------------------------------------------------------------------------------+`,
    codeSnippet: {
      title: 'Tracing Prefix vs Postfix Increment in Java',
      code: `public class IncrementDemo {
    public static void main(String[] args) {
        // 1. Post-increment: prints old value, then updates
        int x = 10;
        System.out.println("x++ returns: " + (x++)); // Prints 10
        System.out.println("x after: " + x);         // Prints 11

        // 2. Pre-increment: updates first, then prints new value
        int y = 10;
        System.out.println("++y returns: " + (++y)); // Prints 11
        System.out.println("y after: " + y);         // Prints 11

        // 3. Classical Interview Expression Trace
        int a = 5;
        int result = a++ + ++a;
        System.out.println("result of (a++ + ++a): " + result);
        System.out.println("Final value of a: " + a);
    }
}`,
      lineByLineExplanation: [
        { line: 'System.out.println("x++ returns: " + (x++));', explanation: 'Evaluates to current value 10 for printing, then increments x to 11 in memory.' },
        { line: 'System.out.println("x after: " + x);', explanation: 'Reads x from memory, confirming x is now 11.' },
        { line: 'System.out.println("++y returns: " + (++y));', explanation: 'Increments y from 10 to 11 first, then returns 11 for printing.' },
        { line: 'int result = a++ + ++a;', explanation: 'Left term a++ returns 5 (a becomes 6). Right term ++a increments a to 7 and returns 7. Sum = 5 + 7 = 12.' },
        { line: 'System.out.println("Final value of a: " + a);', explanation: 'Displays the final mutated state of a, which is 7.' }
      ],
      output: `x++ returns: 10
x after: 11
++y returns: 11
y after: 11
result of (a++ + ++a): 12
Final value of a: 7`
    },
    codeExamples: [
      {
        title: 'Example 1: The Infamous "i = i++;" Self-Assignment Trap',
        description: 'Shows why assigning a post-increment back to the same variable results in no change.',
        code: `public class SelfAssignmentTrap {
    public static void main(String[] args) {
        int i = 5;
        i = i++; // Self-assignment of post-increment
        System.out.println("Value of i after 'i = i++;': " + i); // Still 5!

        int j = 5;
        j = ++j; // Self-assignment of pre-increment
        System.out.println("Value of j after 'j = ++j;': " + j); // 6
    }
}`,
        output: `Value of i after 'i = i++;': 5
Value of j after 'j = ++j;': 6`
      },
      {
        title: 'Example 2: Complex Expression Tracing with Multiple Variables',
        description: 'Tracking variable changes step-by-step across an arithmetic expression.',
        code: `public class MultiVariableTrace {
    public static void main(String[] args) {
        int a = 3;
        int b = 4;

        // Trace:
        // a++ : returns 3, a becomes 4
        // ++b : b becomes 5, returns 5
        // a-- : returns 4, a becomes 3
        // --b : b becomes 4, returns 4
        int total = a++ + ++b - a-- + --b;
        // total =  3  +  5  -  4  +  4  = 8

        System.out.println("total = " + total);
        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }
}`,
        output: `total = 8
a = 3
b = 4`
      },
      {
        title: 'Example 3: Byte Overflow with Unary Increment',
        description: 'Demonstrating implicit casting and overflow behavior with ++ on byte types.',
        code: `public class ByteIncrementDemo {
    public static void main(String[] args) {
        byte b = 127; // Maximum value for signed 8-bit byte

        // b = b + 1; // COMPILE ERROR: cannot convert from int to byte
        b++; // COMPILES! Equivalent to b = (byte)(b + 1);

        System.out.println("b after incrementing 127: " + b); // Wraps around to -128
    }
}`,
        output: 'b after incrementing 127: -128'
      }
    ],
    cheatSheet: {
      summary: 'Prefix (++x, --x) modifies the variable first and returns the new value. Postfix (x++, x--) returns the current value first and then modifies the variable. In complex expressions, terms evaluate strictly left to right.',
      syntaxTemplate: `// Standalone (identical effect on variable):
x++;   // x = x + 1
++x;   // x = x + 1
x--;   // x = x - 1
--x;   // x = x - 1

// In expressions (different returned value):
int a = 5;
int b = ++a; // a becomes 6, b is 6 (pre-increment)

int c = 5;
int d = c++; // d is 5, c becomes 6 (post-increment)

// The trap:
int i = 0;
i = i++;     // i remains 0! (assignment overwrites the increment)`,
      rules: [
        { rule: 'Pre-Increment Evaluates to New Value', explanation: '++x increments x immediately and yields the incremented value to the expression.' },
        { rule: 'Post-Increment Evaluates to Old Value', explanation: 'x++ returns the original value before the increment occurred, then increments x.' },
        { rule: 'Left-to-Right Evaluation', explanation: 'In expressions with multiple increments, Java strictly evaluates operands from left to right.' },
        { rule: 'L-Value Requirement', explanation: 'Increment and decrement operators can only be applied to variables, never to literals or parenthesized expressions.' },
        { rule: 'Implicit Narrowing Cast', explanation: 'b++ automatically casts the result back to the type of b (e.g., byte or short) without compiler error.' },
        { rule: 'Self-Assignment Hazard', explanation: 'Writing "x = x++;" is a bug: the assignment writes the un-incremented value back into x.' }
      ],
      quickComparison: [
        { aspect: 'Pre-Increment (++i)', optionA: 'Increments variable before expression evaluation', optionB: 'Expression result is the NEW value' },
        { aspect: 'Post-Increment (i++)', optionA: 'Increments variable after expression evaluation', optionB: 'Expression result is the OLD value' },
        { aspect: 'Standalone Statement (i++; vs ++i;)', optionA: 'Both produce identical final memory state', optionB: 'No difference in performance in Java' },
        { aspect: 'Self-Assignment (i = i++;)', optionA: 'Value of i does NOT change (remains original)', optionB: 'Anti-pattern and logical bug' },
        { aspect: 'Target Requirement', optionA: 'Must be a variable (e.g., count++)', optionB: 'Cannot be literal or expression (5++ is illegal)' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Writing "i = i++;" to increment a counter',
        whyItHappens: 'Post-increment produces the old value of i, which the assignment operator immediately writes back into i, erasing the increment.',
        howToFix: 'Simply write "i++;" or "++i;" as a standalone statement without assignment.'
      },
      {
        mistake: 'Applying increment to literals: 5++ or (x + 1)++',
        whyItHappens: 'Misunderstanding that ++ requires a modifiable memory container (variable) to store the updated value.',
        howToFix: 'Only apply ++ to variable identifiers: x++; or count++;'
      },
      {
        mistake: 'Assuming post-increment delays until the end of the entire line',
        whyItHappens: 'In Java, post-increment updates the variable in memory immediately after that specific term is evaluated, before the next term evaluates.',
        howToFix: 'Remember left-to-right evaluation: in "a++ + a", the second "a" sees the incremented value.'
      },
      {
        mistake: 'Packing multiple increments of the same variable into a single line',
        whyItHappens: 'Writing code like "int z = ++x + x++ * --x;" creates unmaintainable, cryptic code prone to human tracing errors.',
        howToFix: 'Separate complex side-effects into individual, clean statements before combining.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Basic Post vs Pre Distinction',
        problemStatement: 'What does this code print?',
        code: `int a = 5;
int b = a++;
int c = ++a;
System.out.println(a + "," + b + "," + c);`,
        options: ['7,5,7', '7,6,7', '6,5,6', '7,5,6'],
        correctOptionIndex: 0,
        hint: 'Trace a after each line: what does a++ assign to b? What does a become? What does ++a do next?',
        solution: '7,5,7',
        explanation: 'Step 1: a starts at 5.\nStep 2: "b = a++" assigns original 5 to b, then increments a to 6.\nStep 3: "c = ++a" increments a from 6 to 7 first, then assigns 7 to c.\nFinal values: a = 7, b = 5, c = 7. Output: "7,5,7".'
      },
      {
        title: 'Puzzle 2: The Self-Assignment Trap',
        problemStatement: 'What is printed by this code?',
        code: `int count = 10;
count = count++;
System.out.println(count);`,
        options: ['11', '10', '12', 'Compilation Error'],
        correctOptionIndex: 1,
        hint: 'Remember that count++ evaluates to the OLD value (10) before assignment.',
        solution: '10',
        explanation: 'The right side "count++" evaluates to the original value 10, while marking count to be incremented to 11. But the assignment operator "=" assigns the evaluated value 10 back into count, overwriting 11 with 10. The output is 10.'
      },
      {
        title: 'Puzzle 3: Consecutive Increments of Same Variable',
        problemStatement: 'What does the following snippet output?',
        code: `int x = 4;
int y = x++ + x;
System.out.println("y=" + y + ", x=" + x);`,
        options: ['y=8, x=5', 'y=9, x=5', 'y=9, x=4', 'y=10, x=5'],
        correctOptionIndex: 1,
        hint: 'In "x++ + x", what does the first term return? What does x become before the second term reads it?',
        solution: 'y=9, x=5',
        explanation: 'Java evaluates left to right:\n1. Term 1: x++ returns 4, and increments x from 4 to 5 in memory.\n2. Term 2: x reads the current value from memory, which is 5.\n3. y = 4 + 5 = 9. Final x is 5.'
      },
      {
        title: 'Puzzle 4: The Classical a++ + ++a Challenge',
        problemStatement: 'What is printed after executing this code?',
        code: `int a = 3;
int b = a++ + ++a;
System.out.println(b);`,
        options: ['7', '8', '9', '6'],
        correctOptionIndex: 1,
        hint: 'Evaluate left term first: value returned? new value of a? Then evaluate right term: increment first, then value?',
        solution: '8',
        explanation: 'Step 1: a starts at 3.\nStep 2: First term "a++" evaluates to 3. In memory, a becomes 4.\nStep 3: Second term "++a" increments a from 4 to 5, and evaluates to 5.\nStep 4: b = 3 + 5 = 8.'
      },
      {
        title: 'Puzzle 5: Pre and Post Decrement Combination',
        problemStatement: 'What does this program print?',
        code: `int p = 8;
int q = --p + p--;
System.out.println("q=" + q + ", p=" + p);`,
        options: ['q=14, p=6', 'q=15, p=6', 'q=14, p=7', 'q=16, p=6'],
        correctOptionIndex: 0,
        hint: 'Trace p step-by-step: what does --p do? Then what does p-- do?',
        solution: 'q=14, p=6',
        explanation: 'Step 1: p starts at 8.\nStep 2: "--p" decrements p from 8 to 7, and evaluates to 7.\nStep 3: "p--" evaluates to current value 7, and decrements p to 6.\nStep 4: q = 7 + 7 = 14. Final p = 6.'
      },
      {
        title: 'Puzzle 6: Multiplication with Post-Increment',
        problemStatement: 'What does this code snippet print?',
        code: `int m = 2;
int res = m++ * 5 + ++m;
System.out.println(res);`,
        options: ['13', '14', '15', '12'],
        correctOptionIndex: 1,
        hint: 'Evaluate terms left to right: m++ returns 2 (m becomes 3). Then 2 * 5 is computed. Then what is ++m?',
        solution: '14',
        explanation: '1. Term 1: m++ evaluates to 2 (m becomes 3 in memory).\n2. Multiplication has precedence: 2 * 5 = 10.\n3. Term 2: ++m increments m from 3 to 4, and evaluates to 4.\n4. Addition: 10 + 4 = 14.'
      },
      {
        title: 'Puzzle 7: Multiple Variables Cross-Increment',
        problemStatement: 'Trace the output of this code:',
        code: `int x = 1, y = 2;
int z = ++x + y++ * ++x;
System.out.println("x=" + x + ", y=" + y + ", z=" + z);`,
        options: ['x=3, y=3, z=8', 'x=3, y=3, z=7', 'x=2, y=3, z=6', 'x=3, y=2, z=8'],
        correctOptionIndex: 0,
        hint: 'Multiplication (y++ * ++x) has higher precedence than addition (++x + ...), but left-to-right evaluation dictates operand calculation order!',
        solution: 'x=3, y=3, z=8',
        explanation: 'In Java, operand subexpressions evaluate left to right:\n1. First operand "++x": increments x from 1 to 2, evaluates to 2.\n2. In multiplication "y++ * ++x":\n   - "y++" evaluates to 2 (y becomes 3 in memory).\n   - "++x" increments x from 2 to 3, evaluates to 3.\n   - Product is 2 * 3 = 6.\n3. Addition: 2 + 6 = 8.\nFinal values: x = 3, y = 3, z = 8.'
      },
      {
        title: 'Puzzle 8: Pre-Increment in Boolean Expression',
        problemStatement: 'What will be printed by this code?',
        code: `int a = 5;
boolean check = (++a == 6);
System.out.println(check + " " + a);`,
        options: ['true 6', 'false 6', 'true 5', 'false 5'],
        correctOptionIndex: 0,
        hint: 'Does ++a increment a before comparing with 6?',
        solution: 'true 6',
        explanation: 'Pre-increment ++a increments a from 5 to 6 first, and returns 6. Then 6 == 6 evaluates to true. Final value of a is 6. Output: "true 6".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the exact technical difference between ++i (pre-increment) and i++ (post-increment)?',
        answer: 'Both operators mutate the variable by adding 1. The difference lies in the value produced by the expression: pre-increment (++i) increments the variable first and returns the updated, incremented value. Post-increment (i++) creates a temporary copy of the current value, increments the variable in memory, and returns that original unmodified copy as the expression result.',
        followUp: 'Is there any difference in performance between ++i and i++ in modern Java?',
        followUpAnswer: 'No. When used as a standalone statement (e.g. in a loop counter), the JIT compiler produces identical bytecode (iinc instruction) for both. There is zero performance difference for primitive variables in Java.',
        keyPhrases: ['pre-increment returns new value', 'post-increment returns old value', 'iinc bytecode', 'zero performance difference'],
        commonMistakeAnswer: 'Believing that post-increment is slower in Java because of temporary object creation, confusing Java primitives with C++ operator overloading.'
      },
      {
        question: 'Why does "int i = 5; i = i++;" leave i with the value 5 instead of 6?',
        answer: 'In Java, the assignment expression evaluates its right-hand side first. The expression "i++" returns the current value 5 (stashing it on the operand stack) and then increments the variable i to 6 in local memory. Finally, the assignment operator "=" executes, popping the stashed value 5 off the stack and storing it into i, overwriting 6 with 5.',
        followUp: 'What would happen if you wrote "i = ++i;" instead?',
        followUpAnswer: 'In "i = ++i;", the pre-increment increments i from 5 to 6 first, and then pushes 6 onto the stack. The assignment operator writes 6 back into i, leaving i as 6.',
        keyPhrases: ['operand stack', 'stashes old value', 'assignment overwrites increment', 'self-assignment bug'],
        commonMistakeAnswer: 'Thinking that post-increment fails to execute or that the compiler optimizes the entire statement away.'
      },
      {
        question: 'Why does "System.out.println(x++);" print the original value of x rather than the incremented value?',
        answer: 'The method argument expression "x++" is evaluated before the method is called. Because it is postfix, the expression evaluates to the current value of x before incrementing. That returned value is passed to the println method, while x itself is incremented in memory immediately after.',
        followUp: 'How would you write it so println outputs the incremented value?',
        followUpAnswer: 'You use pre-increment: "System.out.println(++x);", which increments x first and passes the new value to println.',
        keyPhrases: ['postfix evaluates to current value', 'argument passed before println executes', 'pre-increment passes updated value'],
        commonMistakeAnswer: 'Assuming the increment does not happen until after the println method completely returns.'
      },
      {
        question: 'Explain how Java evaluates "int result = a++ + ++a;" when a is initially 5.',
        answer: 'Java evaluates operands strictly from left to right. First, "a++" evaluates: it yields 5 for the addition, and updates variable a to 6 in memory. Next, the addition operator moves to the second operand, "++a". This pre-increment increments a from 6 to 7, and yields 7. Finally, 5 + 7 is computed, storing 12 in result, with a ending at 7.',
        followUp: 'Does the C or C++ language guarantee this same result?',
        followUpAnswer: 'No! In C and C++ prior to C++17, modifying a variable more than once between sequence points resulted in undefined behavior. Java, however, strictly defines left-to-right evaluation order, guaranteeing identical results on all compliant JVMs.',
        keyPhrases: ['strict left-to-right evaluation', 'undefined behavior in C/C++', 'deterministic JVM specification'],
        commonMistakeAnswer: 'Assuming operators with higher precedence evaluate first regardless of position in the expression.'
      },
      {
        question: 'Can you use the increment operator on floating-point numbers (float and double) and char in Java?',
        answer: 'Yes! Java allows ++ and -- on all numeric primitive types, including float, double, and char. For double, "double d = 2.5; d++;" increases d to 3.5. For char, "char c = \'A\'; c++;" increments its Unicode code point from 65 (\'A\') to 66, making c equal to \'B\'.',
        followUp: 'Can you use ++ on boolean variables?',
        followUpAnswer: 'No. Boolean variables in Java are not numeric types and cannot be incremented or decremented. Attempting "bool++;" results in a compiler error.',
        keyPhrases: ['valid on float, double, char', 'char Unicode code point increment', 'invalid on boolean'],
        commonMistakeAnswer: 'Assuming ++ only works on int and long.'
      },
      {
        question: 'Why does "byte b = 10; b++;" compile successfully, while "b = b + 1;" fails to compile?',
        answer: 'In Java, the binary expression "b + 1" automatically promotes b to an int, producing an int result. Assigning an int back to a byte variable requires an explicit cast: "b = (byte)(b + 1);". In contrast, the unary increment operator (b++) includes an implicit narrowing cast, defined in the JLS as equivalent to "b = (byte)(b + 1);".',
        followUp: 'What happens if byte b is 127 and you do "b++;"?',
        followUpAnswer: 'It overflows to -128. Because 127 + 1 is 128 (binary 0000...000010000000), casting to 8-bit signed byte keeps the lowest 8 bits (10000000), which represents -128 in two\'s complement.',
        keyPhrases: ['implicit narrowing cast', 'binary promotion to int', 'byte overflow to -128', 'two\'s complement wraparound'],
        commonMistakeAnswer: 'Claiming that b++ keeps the calculation in byte space without promotion.'
      },
      {
        question: 'What is the result of applying ++ to a literal, such as "5++", and why does Java disallow it?',
        answer: 'Applying ++ to a literal like "5++" results in a compile-time error: "unexpected type, required: variable, found: value". The increment operator requires an L-value (a modifiable storage location in memory) so that it can write the incremented result back. Literals are immutable values that cannot be reassigned.',
        followUp: 'Can you apply ++ to an expression like "(a + b)++"?',
        followUpAnswer: 'No, for the exact same reason: "(a + b)" evaluates to a temporary value, not a variable with a designated memory address. It results in a compile error.',
        keyPhrases: ['requires L-value', 'variable storage required', 'literals are immutable', 'temporary value'],
        commonMistakeAnswer: 'Thinking 5++ returns 6 without saving.'
      },
      {
        question: 'In the statement "int x = 5; int y = x++ * x;", what are the values of x and y?',
        answer: 'y will be 30, and x will be 6. Operand evaluation is left to right: the first operand "x++" evaluates to 5, and immediately updates x in memory to 6. The second operand "x" reads the current value of x from memory, which is now 6. Then 5 * 6 = 30 is computed and assigned to y.',
        followUp: 'What would y be if it were written as "int y = ++x * x;"?',
        followUpAnswer: 'y would be 36. "++x" increments x to 6 and evaluates to 6. The second operand "x" reads 6. Then 6 * 6 = 36.',
        keyPhrases: ['left operand updates before right operand reads', '5 * 6 = 30', 'in-memory mutation'],
        commonMistakeAnswer: 'Guessing 25 by assuming x++ only increments after the entire multiplication is complete.'
      },
      {
        question: 'Why is it widely considered a bad programming practice to combine multiple increments in one expression?',
        answer: 'Combining multiple increments of the same variable in a single expression produces brittle, unreadable code that obscures intent and easily introduces off-by-one errors. Code should be written for clarity and maintainability. Clean code keeps side effects on separate lines.',
        followUp: 'How would you refactor "int total = ++a + b-- + a++;" for clean code?',
        followUpAnswer: 'Break the increments into explicit, readable steps before and after the calculation so that the formula has no hidden side effects: "a++; int total = a + b + a; b--; a++;".',
        keyPhrases: ['code readability', 'obscured intent', 'side-effect separation', 'maintainability'],
        commonMistakeAnswer: 'Defending compound increment expressions as "clever" or "faster".'
      },
      {
        question: 'How do decrement operators (--i and i--) compare to increment operators?',
        answer: 'The decrement operators work identically to increment operators, except they subtract 1 instead of adding 1. Pre-decrement (--i) decrements the variable first and returns the new, decremented value. Post-decrement (i--) returns the current value first, and then decrements the variable in memory.',
        followUp: 'What does "int x = 0; System.out.println(x--); System.out.println(x);" print?',
        followUpAnswer: 'It prints 0 followed by -1. x-- returns 0 to the first println, and then decrements x to -1.',
        keyPhrases: ['subtracts 1', 'pre-decrement returns new value', 'post-decrement returns old value'],
        commonMistakeAnswer: 'Assuming decrement operators have different precedence or associativity than increment operators.'
      }
    ],
    miniQuiz: [
      {
        question: 'If "int a = 7; int b = ++a;", what are the values of a and b?',
        options: ['a = 7, b = 7', 'a = 8, b = 7', 'a = 8, b = 8', 'a = 7, b = 8'],
        correctIndex: 2,
        explanation: 'Pre-increment ++a increments a from 7 to 8 first, and then assigns 8 to b. Both a and b are 8.'
      },
      {
        question: 'If "int a = 7; int b = a++;", what are the values of a and b?',
        options: ['a = 8, b = 7', 'a = 7, b = 7', 'a = 8, b = 8', 'a = 7, b = 8'],
        correctIndex: 0,
        explanation: 'Post-increment a++ assigns the current value 7 to b first, and then increments a to 8.'
      },
      {
        question: 'What is printed by: int i = 1; i = i++; System.out.println(i);?',
        options: ['2', '1', '0', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'i++ evaluates to 1. The assignment operator writes that 1 back into i, overwriting the increment.'
      },
      {
        question: 'What is the output of: int x = 3; System.out.println(x++ + ++x);?',
        options: ['8', '7', '9', '6'],
        correctIndex: 0,
        explanation: 'x++ returns 3 (x becomes 4). Then ++x increments x from 4 to 5 and returns 5. 3 + 5 = 8.'
      },
      {
        question: 'Which of the following causes a compilation error?',
        options: ['int x = 5; x++;', 'int x = 5; ++x;', 'int x = (5)++;', 'char c = \'a\'; c++;'],
        correctIndex: 2,
        explanation: '(5)++ attempts to apply an increment operator to a literal constant, which is invalid syntax in Java.'
      },
      {
        question: 'What is the value of result: int a = 5; int result = a-- - --a;?',
        options: ['0', '1', '2', '-1'],
        correctIndex: 2,
        explanation: 'a-- returns 5 (a becomes 4). --a decrements a from 4 to 3 and returns 3. 5 - 3 = 2.'
      },
      {
        question: 'What is printed by: int x = 2; System.out.println(x++ * 3);?',
        options: ['6', '9', '3', '8'],
        correctIndex: 0,
        explanation: 'x++ returns 2 for the multiplication: 2 * 3 = 6. (x becomes 3 afterwards).'
      },
      {
        question: 'What does "byte b = 127; b++; System.out.println(b);" print?',
        options: ['128', '-128', 'Compilation Error', '0'],
        correctIndex: 1,
        explanation: 'b++ includes an implicit cast (byte)(b + 1), which overflows signed 8-bit byte from 127 to -128.'
      },
      {
        question: 'What is the output of: int a = 10; System.out.println(++a == 11);?',
        options: ['true', 'false', '11', 'Compilation Error'],
        correctIndex: 0,
        explanation: '++a increments a from 10 to 11 first and returns 11. 11 == 11 evaluates to true.'
      },
      {
        question: 'When used as standalone statements with no assignment, how do "x++;" and "++x;" differ?',
        options: ['++x is faster than x++', 'x++ is faster than ++x', 'They have the exact same effect on x', '++x allows method chaining'],
        correctIndex: 2,
        explanation: 'As isolated standalone statements, both increment the variable by 1 with identical compiled bytecode and performance.'
      }
    ]
  },

  // ============================================================
  // LESSON 3.3: Relational & Equality Operators (== vs .equals())
  // ============================================================
  'relational-equality': {
    id: 'relational-equality',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.3',
    title: 'Relational & Equality Operators (== vs .equals())',
    subtitle: 'Comparing primitives, boolean evaluation, and the essential difference between == and .equals()',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Imagine comparing two identification cards. If you ask "Are these two cards the exact same physical piece of plastic?", you are using "==" (reference/identity check). If you ask "Do both cards have the exact same name written on them?", you are using ".equals()" (content check). Two cards can have identical names printed on them, but they are still two distinct physical pieces of plastic!',
    coreExplanation: [
      'The Six Relational Operators: Java provides six relational operators to compare values: greater than (>), less than (<), greater than or equal to (>=), less than or equal to (<=), equal to (==), and not equal to (!=). Every relational expression always evaluates strictly to a boolean value: either true or false.',
      'Comparing Primitive Values with ==: For primitive types (int, double, char, boolean), the == operator compares the raw binary values stored directly inside the variables memory cell. For example, 5 == 5 evaluates to true, and 10 > 20 evaluates to false.',
      'Cross-Type Primitive Comparisons: Java automatically promotes smaller numeric types to wider types before performing relational comparisons. For instance, 5 == 5.0 evaluates to true because the integer 5 is promoted to double 5.0. Similarly, \'A\' == 65 evaluates to true because char \'A\' promotes to its ASCII numeric value 65.',
      'The Assignment (=) vs Equality (==) Trap: A single equals sign (=) is the assignment operator used to store a value into a variable, whereas a double equals sign (==) is the equality operator used to compare two values. Writing "if (count = 5)" results in a compiler error because 5 is an integer, not a boolean.',
      'The Boolean Assignment Pitfall: If a boolean variable is used with single =, such as "boolean active = false; if (active = true)", Java assigns true to active and evaluates the expression as true! The if-block runs, which is almost always a serious bug. To test equality, always use "if (active == true)" or simply "if (active)".',
      'The Object Equality Problem with ==: When comparing reference types (such as String), the == operator does NOT compare the characters or content inside the object. Instead, == compares memory addresses (reference identity)—checking if both variables point to the exact same object instance.',
      'Comparing String Content with .equals(): To compare the actual textual content of two String variables character by character, you must call the .equals() method: "str1.equals(str2)". It returns true if both strings contain the exact same characters in the exact same order.',
      'Case-Insensitive String Comparison: The method "str1.equalsIgnoreCase(str2)" compares the textual contents of two strings while ignoring uppercase versus lowercase differences (e.g. "Java".equalsIgnoreCase("java") evaluates to true).'
    ],
    diagram: `+---------------------------------------------------------------------------------+
|                        PRIMITIVE VS STRING EQUALITY COMPARISON                  |
+---------------------------------------------------------------------------------+
| 1. PRIMITIVE COMPARISON (== compares raw values directly in memory):            |
|                                                                                 |
|    int a = 10;   [ Memory Cell: 10 ]                                            |
|    int b = 10;   [ Memory Cell: 10 ]                                            |
|    a == b  -->  TRUE (10 is equal to 10!)                                       |
|                                                                                 |
| 2. OBJECT / STRING COMPARISON:                                                  |
|                                                                                 |
|    String s1 = "apple";                  String s2 = new String("apple");       |
|    [ s1: Memory Address 0x100 ]          [ s2: Memory Address 0x200 ]           |
|                |                                      |                         |
|                v                                      v                         |
|         "apple" (Object 1)                     "apple" (Object 2)               |
|                                                                                 |
|    CHECK 1: s1 == s2                                                            |
|             Compares memory addresses: 0x100 == 0x200                           |
|             --> FALSE! (They are two different objects!)                        |
|                                                                                 |
|    CHECK 2: s1.equals(s2)                                                       |
|             Compares actual characters: 'a','p','p','l','e'                     |
|             --> TRUE! (The textual contents are identical!)                     |
+---------------------------------------------------------------------------------+`,
    codeSnippet: {
      title: 'Comparing Primitives vs Comparing Strings',
      code: `public class EqualityDemo {
    public static void main(String[] args) {
        // 1. Primitive comparisons with ==
        int num1 = 25;
        int num2 = 25;
        System.out.println("num1 == num2: " + (num1 == num2)); // true

        // Cross-type primitive comparison
        double d = 25.0;
        System.out.println("num1 == d: " + (num1 == d));       // true (promoted to double)

        // Char comparison with int
        char letter = 'A';
        System.out.println("letter == 65: " + (letter == 65)); // true ('A' has ASCII 65)

        // 2. String comparison: == vs .equals()
        String s1 = "hello";
        String s2 = new String("hello");

        System.out.println("s1 == s2: " + (s1 == s2));             // FALSE! (different objects)
        System.out.println("s1.equals(s2): " + s1.equals(s2));     // TRUE!  (same text)
        System.out.println("equalsIgnoreCase: " + s1.equalsIgnoreCase("HELLO")); // TRUE!
    }
}`,
      lineByLineExplanation: [
        { line: 'System.out.println("num1 == num2: " + (num1 == num2));', explanation: 'Directly compares primitive integers 25 and 25, evaluating to true.' },
        { line: 'System.out.println("num1 == d: " + (num1 == d));', explanation: 'Promotes num1 to double 25.0 before comparing with 25.0, resulting in true.' },
        { line: 'System.out.println("letter == 65: " + (letter == 65));', explanation: 'Promotes char \'A\' to its ASCII integer code 65, evaluating to true.' },
        { line: 'System.out.println("s1 == s2: " + (s1 == s2));', explanation: 'Compares memory references; s1 and s2 point to different instances, so this is false!' },
        { line: 'System.out.println("s1.equals(s2): " + s1.equals(s2));', explanation: 'Compares characters inside the strings ("hello" vs "hello"), evaluating to true.' }
      ],
      output: `num1 == num2: true
num1 == d: true
letter == 65: true
s1 == s2: false
s1.equals(s2): true
equalsIgnoreCase: true`
    },
    codeExamples: [
      {
        title: 'Example 1: Relational Operators and Boolean Results',
        description: 'Demonstrating the full range of relational operators with numbers.',
        code: `public class RelationalOperatorsDemo {
    public static void main(String[] args) {
        int age = 18;

        boolean isAdult = age >= 18;
        boolean isMinor = age < 18;
        boolean isExactlyEighteen = age == 18;
        boolean isNotEighteen = age != 18;

        System.out.println("isAdult: " + isAdult);
        System.out.println("isMinor: " + isMinor);
        System.out.println("isExactlyEighteen: " + isExactlyEighteen);
        System.out.println("isNotEighteen: " + isNotEighteen);
    }
}`,
        output: `isAdult: true
isMinor: false
isExactlyEighteen: true
isNotEighteen: false`
      },
      {
        title: 'Example 2: The Semicolon Trap and Boolean Assignment',
        description: 'Common pitfalls that cause unexpected control flow or logic bugs.',
        code: `public class ComparisonTrapsDemo {
    public static void main(String[] args) {
        // Trap 1: Accidental boolean assignment in if
        boolean isLoggedIn = false;
        if (isLoggedIn = true) { // Assigns true! Does NOT compare!
            System.out.println("Trap 1: User considered logged in!");
        }

        // Trap 2: Chaining comparisons (5 < x < 20 is ILLEGAL in Java)
        int score = 15;
        // boolean invalid = (10 < score < 20); // COMPILE ERROR!
        boolean valid = (score > 10 && score < 20); // Correct Java idiom
        System.out.println("Score between 10 and 20: " + valid);
    }
}`,
        output: `Trap 1: User considered logged in!
Score between 10 and 20: true`
      },
      {
        title: 'Example 3: String Equality Testing with User Commands',
        description: 'Comparing text safely using .equals() and .equalsIgnoreCase().',
        code: `public class StringEqualityUseCases {
    public static void main(String[] args) {
        String role = "ADMIN";
        String inputCommand = "admin";

        // Exact match (fails due to case difference)
        boolean exactMatch = role.equals(inputCommand);

        // Case-insensitive match (succeeds)
        boolean caseInsensitiveMatch = role.equalsIgnoreCase(inputCommand);

        System.out.println("Exact Match: " + exactMatch);
        System.out.println("Case-Insensitive Match: " + caseInsensitiveMatch);
    }
}`,
        output: `Exact Match: false
Case-Insensitive Match: true`
      }
    ],
    cheatSheet: {
      summary: 'Relational operators (>, <, >=, <=, ==, !=) compare values and always yield a boolean. For primitives, == compares values. For Strings and objects, == compares memory references, while .equals() compares actual content. Never chain comparisons like 10 < x < 20 in Java.',
      syntaxTemplate: `// Primitive comparisons:
boolean b1 = (x > y);
boolean b2 = (x <= y);
boolean b3 = (x == y);
boolean b4 = (x != y);

// String content comparison (ALWAYS use .equals):
boolean isSame = str1.equals(str2);
boolean isSameIgnoreCase = str1.equalsIgnoreCase(str2);

// Correct range checking (no chained comparisons):
boolean inRange = (score >= 0 && score <= 100);

// Safe boolean check (avoid if (flag == true)):
if (flag) { ... }
if (!flag) { ... }`,
      rules: [
        { rule: 'Primitives Use == For Value Check', explanation: '== compares the actual data inside primitive variables (ints, doubles, chars, booleans).' },
        { rule: 'Objects Require .equals() For Content', explanation: '== on objects checks whether both references point to the same memory location, not whether their text matches.' },
        { rule: 'No Chained Relational Comparisons', explanation: 'Writing "10 < x < 20" is a compile error in Java. You must write "x > 10 && x < 20".' },
        { rule: 'Numeric Type Promotion', explanation: 'Comparing an int with a double promotes the int to double before comparing (5 == 5.0 is true).' },
        { rule: 'Assignment vs Equality', explanation: 'Single = assigns a value; double == checks for equality. Never confuse the two in conditions.' },
        { rule: 'Case Sensitivity in Strings', explanation: '.equals() is case-sensitive ("Java" != "java"). Use .equalsIgnoreCase() for case-insensitive checks.' }
      ],
      quickComparison: [
        { aspect: 'Primitive == (5 == 5)', optionA: 'Compares raw binary numbers', optionB: 'Evaluates to true' },
        { aspect: 'String == (s1 == s2)', optionA: 'Compares memory addresses/references', optionB: 'May be false even if text is identical' },
        { aspect: 'String .equals()', optionA: 'Compares actual textual characters', optionB: 'Returns true when characters match' },
        { aspect: 'String .equalsIgnoreCase()', optionA: 'Compares characters ignoring case', optionB: '"abc" matches "ABC"' },
        { aspect: 'Assignment (=)', optionA: 'Stores a value into a variable', optionB: 'Returns the assigned value' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Using == to compare Strings instead of .equals()',
        whyItHappens: 'In languages like Python, == compares string contents. In Java, == compares object memory locations.',
        howToFix: 'Always use str1.equals(str2) or str1.equalsIgnoreCase(str2) to compare text in Java.'
      },
      {
        mistake: 'Accidental assignment inside an if condition: if (isReady = true)',
        whyItHappens: 'Typing a single = instead of ==. With booleans, this compiles and permanently assigns true to the variable.',
        howToFix: 'Use "if (isReady)" or "if (isReady == true)". Many developers prefer "if (isReady)".'
      },
      {
        mistake: 'Attempting chained comparisons like "if (10 < x < 20)"',
        whyItHappens: 'Math notation allows this, but in Java, (10 < x) evaluates to a boolean (true/false), and Java cannot compare a boolean < 20.',
        howToFix: 'Break into two conditions joined by logical AND: "if (x > 10 && x < 20)".'
      },
      {
        mistake: 'Placing a semicolon right after an if condition: if (score >= 50);',
        whyItHappens: 'Typo or muscle memory. The semicolon acts as an empty statement, causing the subsequent block to run unconditionally.',
        howToFix: 'Never place a semicolon after the parentheses of an if statement.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Primitive Equality with Promotion',
        problemStatement: 'What does the following snippet print to the console?',
        code: `int a = 10;
double b = 10.0;
System.out.println(a == b);`,
        options: ['true', 'false', 'Compilation Error', 'Runtime Exception'],
        correctOptionIndex: 0,
        hint: 'What happens when Java compares an int with a double using ==?',
        solution: 'true',
        explanation: 'Before comparing, Java performs numeric promotion: integer "a" (10) is promoted to double 10.0. Then 10.0 == 10.0 evaluates to true.'
      },
      {
        title: 'Puzzle 2: String == vs .equals()',
        problemStatement: 'What is the output of this code?',
        code: `String s1 = "java";
String s2 = new String("java");
System.out.println((s1 == s2) + " " + s1.equals(s2));`,
        options: ['false true', 'true true', 'false false', 'true false'],
        correctOptionIndex: 0,
        hint: 'Does "new String()" create a separate instance in memory? Does .equals() inspect the characters?',
        solution: 'false true',
        explanation: '"new String(\\"java\\")" creates a distinct object on the heap, so s1 and s2 have different memory addresses (s1 == s2 is false). However, their textual content is identical, so s1.equals(s2) is true. Output: "false true".'
      },
      {
        title: 'Puzzle 3: Char Equality with Integer ASCII',
        problemStatement: 'What does this code print?',
        code: `char ch = 'B';
System.out.println(ch == 66);`,
        options: ['true', 'false', 'Compilation Error: incompatible types', 'Runtime Exception'],
        correctOptionIndex: 0,
        hint: 'Can characters be compared with integers in Java?',
        solution: 'true',
        explanation: 'In Java, char is an unsigned 16-bit integer type representing Unicode code points. The character \'B\' has ASCII/Unicode value 66. When compared with int 66, \'B\' is promoted to 66, resulting in true.'
      },
      {
        title: 'Puzzle 4: Boolean Assignment in Condition',
        problemStatement: 'What is the output of this code snippet?',
        code: `boolean verified = false;
if (verified = true) {
    System.out.print("VERIFIED ");
} else {
    System.out.print("UNVERIFIED ");
}
System.out.println(verified);`,
        options: ['VERIFIED true', 'UNVERIFIED false', 'VERIFIED false', 'Compilation Error'],
        correctOptionIndex: 0,
        hint: 'Notice single "=" in "verified = true". What does the assignment expression evaluate to?',
        solution: 'VERIFIED true',
        explanation: 'The expression "verified = true" is an assignment, not an equality check! It sets verified to true AND evaluates to true. Because the condition is true, the if-block executes, printing "VERIFIED ". The variable verified now permanently holds true, printing "true".'
      },
      {
        title: 'Puzzle 5: Chained Comparison Compile Error',
        problemStatement: 'What happens when attempting to compile and run this code?',
        code: `int x = 15;
if (10 < x < 20) {
    System.out.println("Within range");
}`,
        options: ['Prints "Within range"', 'Compilation Error: bad operand types for binary operator \'<\'', 'Runtime Exception', 'Prints nothing'],
        correctOptionIndex: 1,
        hint: 'Java evaluates (10 < x) first. What type does (10 < x) produce? Can that type be compared with 20 using \'<\'?',
        solution: 'Compilation Error: bad operand types for binary operator \'<\'',
        explanation: 'In Java, relational operators are evaluated left to right. "10 < x" evaluates to boolean true. The expression becomes "true < 20", which is illegal in Java because relational operators cannot compare boolean with int.'
      },
      {
        title: 'Puzzle 6: Case Sensitivity in Strings',
        problemStatement: 'What does the following snippet print?',
        code: `String pass1 = "Secret";
String pass2 = "secret";
System.out.println(pass1.equals(pass2) + " " + pass1.equalsIgnoreCase(pass2));`,
        options: ['false true', 'true true', 'false false', 'true false'],
        correctOptionIndex: 0,
        hint: 'Does .equals() care about uppercase versus lowercase letters?',
        solution: 'false true',
        explanation: '.equals() is strictly case-sensitive: \'S\' does not match \'s\', so pass1.equals(pass2) is false. .equalsIgnoreCase() ignores case differences, returning true.'
      },
      {
        title: 'Puzzle 7: Relational Expression in System.out.println',
        problemStatement: 'What is the output of this expression?',
        code: `int a = 5;
int b = 10;
System.out.println("Result: " + (a > b));`,
        options: ['Result: false', 'Result: true', 'Result: 5 > 10', 'Compilation Error'],
        correctOptionIndex: 0,
        hint: 'What does (5 > 10) evaluate to before string concatenation?',
        solution: 'Result: false',
        explanation: 'The relational expression (a > b) evaluates to boolean false. That boolean is concatenated with "Result: ", producing "Result: false".'
      },
      {
        title: 'Puzzle 8: Not-Equal Operator with Characters',
        problemStatement: 'What does this code snippet print?',
        code: `char c1 = 'a';
char c2 = 'A';
System.out.println(c1 != c2);`,
        options: ['true', 'false', 'Compilation Error', '0'],
        correctOptionIndex: 0,
        hint: '\'a\' has ASCII value 97, while \'A\' has ASCII value 65.',
        solution: 'true',
        explanation: '\'a\' (ASCII 97) is not equal to \'A\' (ASCII 65). The != operator evaluates to true.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between the "==" operator and the ".equals()" method in Java?',
        answer: 'The "==" operator performs reference comparison when used with objects, checking whether both variables point to the exact same memory address. For primitive types, "==" compares the raw values directly. In contrast, the ".equals()" method is designed to perform content comparison, checking whether two distinct object instances have identical internal data or characters.',
        followUp: 'Why does "s1 == s2" sometimes return true for two different String variables containing the same text?',
        followUpAnswer: 'When strings are created as literal constants (e.g., String s1 = "hello"; String s2 = "hello";), Java stores them in the String Pool and reuses the exact same instance in memory. Because both references point to that pooled object, "s1 == s2" evaluates to true. However, relying on this is dangerous; dynamic strings or strings created with "new" will fail "==".',
        keyPhrases: ['reference identity vs value equality', 'memory address comparison', 'content comparison', 'String Pool'],
        commonMistakeAnswer: 'Saying that == and .equals() are identical for Strings, or that == compares length.'
      },
      {
        question: 'Why does "if (x = 5)" cause a compile-time error in Java, whereas in languages like C it compiles?',
        answer: 'In C, any non-zero integer is treated as true in boolean contexts, so "if (x = 5)" sets x to 5 and treats 5 as true. Java is strongly typed and strictly requires the expression inside an if statement to evaluate to the boolean type. Because "x = 5" produces the integer 5, the Java compiler rejects it with "Type mismatch: cannot convert from int to boolean".',
        followUp: 'Is there any scenario where an assignment expression inside an if condition DOES compile in Java?',
        followUpAnswer: 'Yes! When the variable is a boolean, such as "boolean flag = false; if (flag = true)". The assignment sets flag to true and evaluates to the boolean value true, satisfying the compiler\'s requirement for a boolean condition.',
        keyPhrases: ['strongly typed', 'type mismatch: cannot convert from int to boolean', 'strict boolean requirement', 'boolean assignment loophole'],
        commonMistakeAnswer: 'Believing that no assignment expression can ever compile inside an if statement in Java.'
      },
      {
        question: 'What happens when you compare an int and a double using relational operators like == or < ?',
        answer: 'Java performs numeric type promotion (binary numeric promotion). The operand with the smaller data type (int) is automatically converted to the wider type (double) before the comparison takes place. For example, in "5 == 5.0", the int 5 is promoted to double 5.0, and 5.0 == 5.0 evaluates to true.',
        followUp: 'What happens when comparing a char with an int using ==?',
        followUpAnswer: 'The char is promoted to an int based on its Unicode/ASCII code point. For example, \'a\' == 97 evaluates to true because \'a\' has ASCII value 97.',
        keyPhrases: ['binary numeric promotion', 'widening conversion', 'char to int promotion', 'ASCII/Unicode code point'],
        commonMistakeAnswer: 'Assuming Java throws a type mismatch error when comparing an int with a double.'
      },
      {
        question: 'Why does Java disallow chained comparisons like "if (10 < x < 20)"?',
        answer: 'Relational operators in Java are left-associative binary operators that evaluate two operands at a time and produce a boolean. In "10 < x < 20", Java first evaluates "10 < x", producing a boolean (true or false). The expression then becomes "true < 20" or "false < 20", which fails compilation because relational operators cannot compare a boolean with an integer.',
        followUp: 'What is the correct syntax in Java to check if a variable lies within a range?',
        followUpAnswer: 'You must split the comparison into two separate expressions joined by the logical AND operator (&&): "x > 10 && x < 20".',
        keyPhrases: ['left-associative', 'relational operator produces boolean', 'cannot compare boolean to integer', 'logical AND (&&)'],
        commonMistakeAnswer: 'Thinking chained comparison is valid in Java just like in Python or mathematical notation.'
      },
      {
        question: 'What is the purpose of the ".equalsIgnoreCase()" method, and when should you use it?',
        answer: 'The ".equalsIgnoreCase()" method compares two strings character by character while ignoring differences in case (uppercase vs lowercase). It should be used whenever user input or business logic requires case-insensitive matching, such as verifying commands ("exit" vs "EXIT"), email domain comparisons, or promo codes.',
        followUp: 'Does ".equalsIgnoreCase()" modify the original strings?',
        followUpAnswer: 'No. Strings in Java are immutable. The method simply compares the character values after converting each character to uppercase and lowercase during comparison, leaving the original strings untouched.',
        keyPhrases: ['case-insensitive comparison', 'user input matching', 'strings are immutable', 'ASCII case folding'],
        commonMistakeAnswer: 'Assuming you must manually call toLowerCase() on both strings before calling .equals().'
      },
      {
        question: 'What is the danger of placing a semicolon immediately after an if condition: "if (x > 10); { ... }"?',
        answer: 'The semicolon immediately following the if condition acts as a null (empty) statement that completes the if statement. As a result, the code block in curly braces { ... } that follows becomes an independent, unconditional block that executes every single time, regardless of whether (x > 10) was true or false.',
        followUp: 'Does the compiler warn you or reject this code?',
        followUpAnswer: 'Standard Java compilers do not produce an error because an empty statement is syntactically valid. However, modern IDEs and static analysis tools (like SonarQube or SpotBugs) will flag it with an "Empty statement in if" warning.',
        keyPhrases: ['empty statement', 'null statement', 'unconditional execution', 'syntactically legal bug'],
        commonMistakeAnswer: 'Thinking the code will not compile or will throw a syntax error.'
      },
      {
        question: 'What does the "!=" operator do, and how is it related to "=="?',
        answer: 'The "!=" (not equal to) operator is the logical negation of the "==" (equal to) operator. It returns true if the operands are not equal, and false if they are equal. For primitives, it checks if their values differ. For objects, it checks if they point to different memory locations.',
        followUp: 'How do you check if two String objects have different content?',
        followUpAnswer: 'You negate the .equals() call using the logical NOT operator (!): "!str1.equals(str2)". Never use "str1 != str2" to check for different text content.',
        keyPhrases: ['not equal to operator', 'logical negation of ==', '!str1.equals(str2)'],
        commonMistakeAnswer: 'Using "str1 != str2" to check if two strings hold different textual data.'
      },
      {
        question: 'Why should developers write "if (isValid)" rather than "if (isValid == true)"?',
        answer: 'Writing "if (isValid)" is cleaner, more idiomatic, and less error-prone. Writing "if (isValid == true)" is redundant because isValid is already a boolean expression. More importantly, writing "== true" creates the risk of accidentally typing single "=", creating a silent bug: "if (isValid = true)" permanently mutates isValid.',
        followUp: 'What is the idiomatic way to test if a boolean is false?',
        followUpAnswer: 'Use the logical NOT operator: "if (!isValid)", rather than "if (isValid == false)".',
        keyPhrases: ['idiomatic Java', 'redundant comparison', 'accidental assignment bug risk', 'logical NOT operator'],
        commonMistakeAnswer: 'Believing that "== true" is required for clarity or that it performs additional validation.'
      },
      {
        question: 'Can you compare floating-point numbers like float and double using "==" in production code?',
        answer: 'Using "==" on floating-point numbers is strongly discouraged because floating-point arithmetic introduces tiny binary rounding inaccuracies. For example, 0.1 + 0.2 evaluates to 0.30000000000000004, so "(0.1 + 0.2) == 0.3" evaluates to false! In production, floats and doubles are compared using an epsilon threshold: "Math.abs(a - b) < 0.00001".',
        followUp: 'Are whole floating-point numbers safe to compare with ==?',
        followUpAnswer: 'Numbers that can be represented exactly in binary powers of 2 (like 0.5, 1.0, 2.0, 4.0) will compare cleanly, but standard practice still avoids == for any computed floating-point values.',
        keyPhrases: ['floating-point rounding error', 'binary representation inaccuracy', 'epsilon threshold', 'Math.abs(a - b) < EPSILON'],
        commonMistakeAnswer: 'Assuming 0.1 + 0.2 is exactly 0.3 in computer memory.'
      },
      {
        question: 'What is the return type of all relational and equality expressions in Java?',
        answer: 'All relational (> , <, >=, <=) and equality (==, !=) expressions strictly return a primitive boolean value: either true or false. They cannot return integers (like 1 or 0), and cannot be converted implicitly to any numeric type.',
        followUp: 'Can you cast a boolean to an int in Java, e.g. "(int) true"?',
        followUpAnswer: 'No! Java prohibits casting between boolean and any other data type (primitive or reference). "int x = (int) true;" causes a compilation error: "inconvertible types: cannot cast boolean to int".',
        keyPhrases: ['strictly returns boolean', 'true or false only', 'no implicit conversion to int', 'boolean cannot be cast to numeric'],
        commonMistakeAnswer: 'Thinking that boolean true can be cast to integer 1 like in C++.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does the expression (5 == 5.0) evaluate to in Java?',
        options: ['true', 'false', 'Compilation Error: incompatible types', 'Runtime Exception'],
        correctIndex: 0,
        explanation: 'Java promotes integer 5 to double 5.0 before comparing. 5.0 == 5.0 evaluates to true.'
      },
      {
        question: 'What is the correct way to compare the textual contents of two String variables, s1 and s2?',
        options: ['s1 == s2', 's1.equals(s2)', 's1 = s2', 's1.compare(s2) == 0'],
        correctIndex: 1,
        explanation: 'The .equals() method compares the actual characters of two strings. The == operator only compares memory addresses.'
      },
      {
        question: 'What is the result of evaluating: \'A\' == 65 in Java?',
        options: ['true', 'false', 'Compilation Error', 'Runtime Exception'],
        correctIndex: 0,
        explanation: 'Character \'A\' has an ASCII/Unicode code point value of 65. It is promoted to int 65, making 65 == 65 true.'
      },
      {
        question: 'What happens with: boolean b = false; if (b = true) { System.out.println("YES"); }?',
        options: ['Prints YES', 'Prints nothing', 'Compilation Error', 'Runtime Exception'],
        correctIndex: 0,
        explanation: 'Single = is assignment. (b = true) sets b to true and evaluates to true, so the if block executes and prints "YES".'
      },
      {
        question: 'Why does "10 < x < 20" cause a compiler error in Java?',
        options: ['Java does not support less-than operator', '10 < x returns a boolean, which cannot be compared to 20', 'x must be declared as a float', 'Parentheses are mandatory'],
        correctIndex: 1,
        explanation: '(10 < x) evaluates to a boolean (true or false). You cannot compare a boolean to an integer with <.'
      },
      {
        question: 'What does "String s1 = new String(\\"test\\"); String s2 = new String(\\"test\\"); System.out.println(s1 == s2);" print?',
        options: ['true', 'false', 'Compilation Error', 'test'],
        correctIndex: 1,
        explanation: 'Using "new String()" creates two distinct object instances in different memory locations. == compares addresses, so it prints false.'
      },
      {
        question: 'Which method compares two strings for matching text while ignoring uppercase vs lowercase differences?',
        options: ['equals()', 'equalsIgnoreCase()', 'compareCase()', 'isEqual()'],
        correctIndex: 1,
        explanation: 'equalsIgnoreCase() checks whether characters match regardless of upper or lower case.'
      },
      {
        question: 'What is the output of: int a = 15; System.out.println(a != 15);?',
        options: ['true', 'false', '15', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'a is 15. The condition 15 != 15 is false because 15 IS equal to 15.'
      },
      {
        question: 'What happens when compiling: boolean flag = true; int num = (int) flag;?',
        options: ['num becomes 1', 'num becomes 0', 'Compilation Error: inconvertible types', 'Runtime Exception'],
        correctIndex: 2,
        explanation: 'Java strictly forbids casting between boolean and any numeric type; it causes a compilation error.'
      },
      {
        question: 'What is the outcome of: int x = 5; if (x > 10); { x = 20; } System.out.println(x);?',
        options: ['5', '20', '10', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'The semicolon after "if (x > 10);" terminates the if statement as an empty statement. The block "{ x = 20; }" runs unconditionally, setting x to 20.'
      }
    ]
  }
};
