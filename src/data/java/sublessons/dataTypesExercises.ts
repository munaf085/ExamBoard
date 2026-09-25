import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR DATA TYPES & VARIABLES
// Every problem has Input Format, Output Format, Examples,
// Hints, Complete Runnable Java Solution, and Expected Output.
// ============================================================

export const dataTypesExercises: Record<string, ProgrammingExercise[]> = {
  // ── 2.1 Variables & Scope ──
  'variables-and-scope': [
    {
      id: 'dt-var-1',
      title: '1. Local Variable Declaration, Initialization & Reassignment',
      problemStatement: `Write a standalone Java program that demonstrates working with local variables inside the main() method:
1. Declare and initialize a student's name (\`String studentName = "Alex"\`), grade level (\`int gradeLevel = 10\`), and three subject test scores (\`int mathScore = 88\`, \`int scienceScore = 92\`, \`int englishScore = 84\`).
2. Calculate the total score (\`totalScore\`) and average score (\`averageScore\`) using local variables.
3. Promote the student by reassigning \`gradeLevel = 11\` (demonstrating variable value mutation without re-declaring the type).
4. Print the student summary report before and after the grade promotion.

Input Format: None.
Output Format:
Student: Alex | Grade: 10
Math: 88 | Science: 92 | English: 84
Total: 264 | Average: 88.0
Promoted to Grade: 11

Example:
Output:
Student: Alex | Grade: 10
Math: 88 | Science: 92 | English: 84
Total: 264 | Average: 88.0
Promoted to Grade: 11`,
      hint: 'Declare variables inside main() using their type (e.g., int gradeLevel = 10;). When updating a variable, do NOT repeat the type; simply write gradeLevel = 11;',
      solutionCode: `public class StudentGradeReport {
    public static void main(String[] args) {
        // Step 1: Declare and initialize local variables
        String studentName = "Alex";
        int gradeLevel = 10;
        int mathScore = 88;
        int scienceScore = 92;
        int englishScore = 84;

        // Step 2: Compute derived values into new local variables
        int totalScore = mathScore + scienceScore + englishScore;
        double averageScore = totalScore / 3.0;

        // Step 3: Print initial report
        System.out.println("Student: " + studentName + " | Grade: " + gradeLevel);
        System.out.println("Math: " + mathScore + " | Science: " + scienceScore + " | English: " + englishScore);
        System.out.println("Total: " + totalScore + " | Average: " + averageScore);

        // Step 4: Reassign gradeLevel (update existing variable without re-declaring type)
        gradeLevel = 11;
        System.out.println("Promoted to Grade: " + gradeLevel);
    }
}`,
      output: `Student: Alex | Grade: 10
Math: 88 | Science: 92 | English: 84
Total: 264 | Average: 88.0
Promoted to Grade: 11`,
      explanation: 'Local variables are declared inside a method (such as main) and live on the JVM thread stack. When declaring a variable, specify its type and name. Once declared, you can mutate (reassign) its value using the variable name alone without repeating the data type.'
    },
    {
      id: 'dt-var-2',
      title: '2. Block Scope & Variable Lifetime with Curly Braces { }',
      problemStatement: `Write a Java program that demonstrates how block scope works using curly braces { }:
1. In the main() method, declare an outer local variable \`double cartTotal = 150.0;\`.
2. Open an inner block with \`{\` and declare a block-scoped variable \`double promoDiscount = 25.0;\`.
3. Inside the inner block, apply the discount to \`cartTotal\` (\`cartTotal = cartTotal - promoDiscount;\`) and print the discount applied.
4. Exit the inner block with \`}\`.
5. In the outer method scope, print the final cart total. Notice that \`cartTotal\` successfully holds the updated price, while \`promoDiscount\` is out of scope and no longer accessible.

Input Format: None.
Output Format:
Initial Cart Total: $150.0
[Inside Promo Block] Applied Discount: $25.0
Final Checkout Total: $125.0

Example:
Output:
Initial Cart Total: $150.0
[Inside Promo Block] Applied Discount: $25.0
Final Checkout Total: $125.0`,
      hint: 'Variables declared inside { } are local to that block. Code inside the block can read and modify outer variables, but outer code cannot see variables declared inside the inner block.',
      solutionCode: `public class ShoppingCartScope {
    public static void main(String[] args) {
        // Outer local variable: accessible throughout main()
        double cartTotal = 150.0;
        System.out.println("Initial Cart Total: $" + cartTotal);

        // Inner block: creates an isolated scope
        {
            // Block-scoped local variable: only exists between { and }
            double promoDiscount = 25.0;
            System.out.println("[Inside Promo Block] Applied Discount: $" + promoDiscount);

            // Inner block can freely read and update outer variables
            cartTotal = cartTotal - promoDiscount;
        }
        // At this point, promoDiscount is destroyed from the stack

        // cartTotal retains its updated value in the outer scope
        System.out.println("Final Checkout Total: $" + cartTotal);
    }
}`,
      output: `Initial Cart Total: $150.0
[Inside Promo Block] Applied Discount: $25.0
Final Checkout Total: $125.0`,
      explanation: 'A variable declared inside curly braces { } is scoped only to that block. It is created when execution enters the block and destroyed as soon as execution leaves the block. Inner blocks have access to outer variables, allowing modifications that persist after the inner block exits.'
    }
  ],

  // ── 2.2 Primitive Types Deep Dive ──
  'primitive-types-deep-dive': [
    {
      id: 'dt-prim-1',
      title: '1. Primitive Memory Boundaries & Min/Max Values',
      problemStatement: `Write a program that inspects and displays the byte size, bit width, and minimum and maximum values of the 4 integral types in Java: \`byte\`, \`short\`, \`int\`, and \`long\`.

Input Format: None.
Output Format:
byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]

Example:
Output:
byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]`,
      hint: 'Use the wrapper class constants Byte.SIZE, Byte.MIN_VALUE, Byte.MAX_VALUE, etc.',
      solutionCode: `public class PrimitiveLimits {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.SIZE + " bits, [" + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE + "]");
        System.out.println("short: " + Short.SIZE + " bits, [" + Short.MIN_VALUE + " to " + Short.MAX_VALUE + "]");
        System.out.println("int: " + Integer.SIZE + " bits, [" + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE + "]");
        System.out.println("long: " + Long.SIZE + " bits, [" + Long.MIN_VALUE + " to " + Long.MAX_VALUE + "]");
    }
}`,
      output: `byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]`,
      explanation: 'Java primitives have fixed bit widths regardless of underlying hardware architecture, preserving the WORA guarantee across 32-bit and 64-bit systems.'
    },
    {
      id: 'dt-prim-2',
      title: '2. Char as Numeric Code Point & Offset Calculation',
      problemStatement: `In Java, \`char\` is an unsigned 16-bit Unicode value.
Write a program that takes a character \`char ch = 'A'\`, prints its numeric ASCII/Unicode code point value, and generates the next 5 alphabet characters using char arithmetic.

Input Format: \`char ch = 'A'\`
Output Format:
Initial Char: A, ASCII Code: 65
Next 5 Characters: B C D E F

Example:
Input: ch = 'M'
Output:
Initial Char: M, ASCII Code: 77
Next 5 Characters: N O P Q R`,
      hint: 'Cast char to int `(int) ch` to get code point. Use `(char)(ch + i)` in a loop to generate sequential characters.',
      solutionCode: `public class CharArithmetic {
    public static void main(String[] args) {
        char ch = 'A';
        int asciiValue = (int) ch;

        System.out.println("Initial Char: " + ch + ", ASCII Code: " + asciiValue);
        System.out.print("Next 5 Characters: ");

        for (int i = 1; i <= 5; i++) {
            char nextChar = (char) (ch + i);
            System.out.print(nextChar + (i < 5 ? " " : "\\n"));
        }
    }
}`,
      output: `Initial Char: A, ASCII Code: 65
Next 5 Characters: B C D E F`,
      explanation: 'Java chars can be manipulated mathematically because they represent UTF-16 code points from 0 to 65,535 (\'\\u0000\' to \'\\uffff\').'
    }
  ],

  // ── 2.3 Type Casting & Overflow ──
  'type-casting-and-overflow': [
    {
      id: 'dt-cast-1',
      title: '1. Widening vs Narrowing Casting with Data Loss',
      problemStatement: `Write a program that demonstrates both Widening (automatic) casting and Narrowing (explicit) casting.
1. Widen an \`int\` (100) to a \`double\` (no loss).
2. Narrow a \`double\` (99.99) to an \`int\` (truncation of decimal part).
3. Narrow an \`int\` (300) to a \`byte\` (overflow truncation).

Input Format: None.
Output Format:
Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44

Example:
Output:
Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44`,
      hint: 'Widening happens automatically: `double d = i;`. Narrowing requires explicit cast syntax: `int i2 = (int) d;` and `byte b = (byte) 300;`.',
      solutionCode: `public class CastingDemo {
    public static void main(String[] args) {
        int originalInt = 100;
        double widened = originalInt; // automatic widening

        double originalDouble = 99.99;
        int narrowed = (int) originalDouble; // explicit truncation

        int largeInt = 300;
        byte overflowByte = (byte) largeInt; // 300 - 256 = 44

        System.out.println("Widening (int to double): " + originalInt + " -> " + widened);
        System.out.println("Narrowing (double to int): " + originalDouble + " -> " + narrowed);
        System.out.println("Narrowing with Overflow (int " + largeInt + " to byte): " + overflowByte);
    }
}`,
      output: `Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44`,
      explanation: 'When casting a larger type to a smaller type (like int to byte), Java silently discards the high-order bits. 300 in binary is 00000001 00101100. Discarding the upper bits leaves 00101100, which is 44.'
    },
    {
      id: 'dt-cast-2',
      title: '2. Integer Overflow Detection',
      problemStatement: `When adding two large integers, standard Java addition can quietly wrap around into negative numbers.
Write a program that demonstrates normal overflow with \`Integer.MAX_VALUE + 1\`, and then uses Java 8\'s \`Math.addExact()\` to safely detect and handle the \`ArithmeticException\`.

Input Format: None.
Output Format:
Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!

Example:
Output:
Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!`,
      hint: 'Perform `int overflow = Integer.MAX_VALUE + 1;` then inside a try-catch execute `Math.addExact(Integer.MAX_VALUE, 1);`.',
      solutionCode: `public class OverflowDetector {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        int wrapped = max + 1;
        System.out.println("Standard Addition (Overflown): " + wrapped);

        try {
            int safeSum = Math.addExact(max, 1);
            System.out.println("Safe Sum: " + safeSum);
        } catch (ArithmeticException e) {
            System.out.println("Math.addExact: Caught ArithmeticException - integer overflow!");
        }
    }
}`,
      output: `Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!`,
      explanation: 'By default, Java integer arithmetic uses two\'s complement wrap-around on overflow. To protect mission-critical business logic (like banking balances), Math.addExact() throws an ArithmeticException upon exceeding boundaries.'
    }
  ],

  // ── 2.4 Wrapper Classes ──
  'wrapper-classes': [
    {
      id: 'dt-wrap-1',
      title: '1. Parsing String Inputs to Wrapper Types & Radix Conversion',
      problemStatement: `Write a program that uses Wrapper classes to parse various numerical strings into their typed equivalents:
1. Parse decimal string "450" into an \`Integer\`
2. Parse binary string "101101" into an \`Integer\` with base 2
3. Parse hex string "1A3F" into an \`Integer\` with base 16
4. Parse float string "98.6" into a \`Double\`

Input Format: None.
Output Format:
Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6

Example:
Output:
Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6`,
      hint: 'Use `Integer.parseInt(str)` and `Integer.parseInt(str, radix)`.',
      solutionCode: `public class WrapperParsing {
    public static void main(String[] args) {
        int dec = Integer.parseInt("450");
        int fromBinary = Integer.parseInt("101101", 2);
        int fromHex = Integer.parseInt("1A3F", 16);
        double valDouble = Double.parseDouble("98.6");

        System.out.println("Decimal: " + dec);
        System.out.println("Binary 101101 to Dec: " + fromBinary);
        System.out.println("Hex 1A3F to Dec: " + fromHex);
        System.out.println("Parsed Double: " + valDouble);
    }
}`,
      output: `Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6`,
      explanation: 'Wrapper classes provide utility parsing methods like `Integer.parseInt(str, radix)` that convert textual representations in any base into standard primitive integers.'
    }
  ],

  // ── 2.5 Autoboxing & Unboxing ──
  'autoboxing-and-unboxing': [
    {
      id: 'dt-auto-1',
      title: '1. Autoboxing in Collections & NullPointerException Trap',
      problemStatement: `Write a Java program that demonstrates:
1. Autoboxing: Automatically converting primitive \`int\` values when adding to an \`ArrayList<Integer>\`.
2. Unboxing: Automatically extracting primitive values from the collection in an enhanced for-loop.
3. Unboxing trap: Show how unboxing a \`null\` \`Integer\` wrapper triggers a \`NullPointerException\` and catch it safely.

Input Format: None.
Output Format:
Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null

Example:
Output:
Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null`,
      hint: 'Create `ArrayList<Integer> list = new ArrayList<>();`. When calling `int val = nullRef;`, the compiler injects `nullRef.intValue()`, causing NPE.',
      solutionCode: `import java.util.ArrayList;

public class AutoboxingDemo {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        // Autoboxing: int primitive -> Integer object
        list.add(10);
        list.add(20);
        list.add(30);

        System.out.println("Autoboxed Collection: " + list);

        // Unboxing: Integer object -> int primitive
        int sum = 0;
        for (int num : list) {
            sum += num;
        }
        System.out.println("Unboxed Sum: " + sum);

        // The classic Autoboxing / Unboxing Trap
        Integer nullWrapper = null;
        try {
            int primitive = nullWrapper; // Compiler calls nullWrapper.intValue()!
            System.out.println("Primitive: " + primitive);
        } catch (NullPointerException npe) {
            System.out.println("Caught Expected Exception: " + npe.getClass().getName() + " during unboxing of null");
        }
    }
}`,
      output: `Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null`,
      explanation: 'Autoboxing is syntactic sugar inserted by javac (`Integer.valueOf(x)` and `obj.intValue()`). When an unboxing operation runs on a reference holding null, calling `.intValue()` results in a NullPointerException.'
    }
  ],

  // ── 2.6 The Integer Cache Trap ──
  'integer-cache-trap': [
    {
      id: 'dt-cache-1',
      title: '1. Integer Cache Verification (-128 to 127 vs 128+)',
      problemStatement: `Java maintains an internal flyweight cache for \`Integer\` objects with values from -128 to 127.
Write a Java program that creates two pairs of autoboxed Integers:
Pair 1: a = 100, b = 100
Pair 2: c = 200, d = 200
Compare them using reference equality (\`==\`) and content equality (\`.equals()\`) to prove the cache behavior.

Input Format: None.
Output Format:
a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true

Example:
Output:
a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true`,
      hint: 'Autoboxing invokes `Integer.valueOf()`. For values within [-128, 127], it returns a pre-cached object reference, so `==` is true. For 200, it allocates new heap objects, so `==` is false.',
      solutionCode: `public class IntegerCacheTest {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;

        Integer c = 200;
        Integer d = 200;

        System.out.println("a == b (100 == 100): " + (a == b));
        System.out.println("a.equals(b): " + a.equals(b));

        System.out.println("c == d (200 == 200): " + (c == d));
        System.out.println("c.equals(d): " + c.equals(d));
    }
}`,
      output: `a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true`,
      explanation: 'JLS §5.1.7 mandates that Integer.valueOf() caches objects from -128 to 127. Outside this range, new heap instances are allocated. Therefore, reference equality (==) produces true only within the cached window; .equals() must always be used for object content equality.'
    }
  ],

  // ── 2.7 Floating Point Imprecision & BigDecimal ──
  'floating-point-bigdecimal': [
    {
      id: 'dt-bigdec-1',
      title: '1. Binary Floating-Point Drift vs Exact BigDecimal Financials',
      problemStatement: `Demonstrate why primitive \`double\` must NEVER be used for currency calculations.
1. Subtract 0.90 from 1.00 using standard primitive \`double\`, and display the binary rounding drift.
2. Perform the exact same subtraction using \`BigDecimal\` initialized with string literals to achieve exact financial accuracy.

Input Format: None.
Output Format:
Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10

Example:
Output:
Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10`,
      hint: 'Use `new BigDecimal("1.00").subtract(new BigDecimal("0.90"))`. Always pass String constructors, not double constructors, to BigDecimal!',
      solutionCode: `import java.math.BigDecimal;

public class FinancialPrecision {
    public static void main(String[] args) {
        // Floating point inaccuracy
        double d1 = 1.00;
        double d2 = 0.90;
        double doubleResult = d1 - d2;
        System.out.println("Primitive double: 1.00 - 0.90 = " + doubleResult);

        // Exact decimal arithmetic with BigDecimal
        BigDecimal b1 = new BigDecimal("1.00");
        BigDecimal b2 = new BigDecimal("0.90");
        BigDecimal bdResult = b1.subtract(b2);
        System.out.println("BigDecimal exact: 1.00 - 0.90 = " + bdResult);
    }
}`,
      output: `Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10`,
      explanation: 'IEEE 754 floating-point representations cannot represent decimal fractions like 0.1 or 0.9 exactly in base-2 binary, resulting in precision leakage. BigDecimal performs arbitrary-precision base-10 arithmetic, making it mandatory for financial calculations.'
    }
  ]
};
