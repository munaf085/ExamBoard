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
      title: '1. Demonstrate Local vs Instance vs Static Variable Scope',
      problemStatement: `Write a Java class that illustrates the three levels of variable scope:
1. Static variable: Shared across all instances (\`static int counter\`).
2. Instance variable: Unique to each instance (\`String accountHolder\`).
3. Local variable: Scoped strictly within a method (\`double depositAmount\`).

The program must create two account objects, update the static counter, and print each field to prove how they differ.

Input Format: None.
Output Format:
Account 1: Alice, Balance: 500.0
Account 2: Bob, Balance: 750.0
Total Accounts Created: 2

Example:
Output:
Account 1: Alice, Balance: 500.0
Account 2: Bob, Balance: 750.0
Total Accounts Created: 2`,
      hint: 'Declare `static int counter = 0;` at class level, `String name; double balance;` as instance fields, and local variables inside `main` or helper methods.',
      solutionCode: `public class ScopeDemonstrator {
    // Static variable (class-level, shared)
    static int totalAccounts = 0;

    // Instance variables (unique to each object)
    String accountHolder;
    double balance;

    public ScopeDemonstrator(String name, double initialDeposit) {
        this.accountHolder = name;
        this.balance = initialDeposit;
        totalAccounts++;
    }

    public static void main(String[] args) {
        // Local variables inside main
        ScopeDemonstrator acc1 = new ScopeDemonstrator("Alice", 500.0);
        ScopeDemonstrator acc2 = new ScopeDemonstrator("Bob", 750.0);

        System.out.println("Account 1: " + acc1.accountHolder + ", Balance: " + acc1.balance);
        System.out.println("Account 2: " + acc2.accountHolder + ", Balance: " + acc2.balance);
        System.out.println("Total Accounts Created: " + totalAccounts);
    }
}`,
      output: `Account 1: Alice, Balance: 500.0
Account 2: Bob, Balance: 750.0
Total Accounts Created: 2`,
      explanation: 'Static variables live in the JVM Method Area (Metaspace) and are shared. Instance variables live in heap memory inside their respective objects. Local variables live in the thread stack frame and are destroyed when the method terminates.'
    },
    {
      id: 'dt-var-2',
      title: '2. Variable Shadowing and `this` Keyword',
      problemStatement: `Create a Java class \`Student\` that has an instance variable \`int score\`. In its setter method \`setScore(int score)\`, the parameter has the exact same name as the instance field (shadowing it). Use the \`this\` keyword to resolve the shadowing and ensure the instance field receives the value.

Input Format: \`int inputScore = 95\`
Output Format:
Before: 0
After Setting: 95

Example:
Input: inputScore = 88
Output:
Before: 0
After Setting: 88`,
      hint: 'In `setScore(int score)`, write `this.score = score;` so Java knows the left side belongs to the current object instance.',
      solutionCode: `public class Student {
    int score = 0; // instance variable

    public void setScore(int score) {
        // 'this.score' refers to the instance variable, 'score' refers to parameter
        this.score = score;
    }

    public static void main(String[] args) {
        Student s = new Student();
        System.out.println("Before: " + s.score);
        s.setScore(95);
        System.out.println("After Setting: " + s.score);
    }
}`,
      output: `Before: 0
After Setting: 95`,
      explanation: 'When a local parameter has the same identifier as an instance variable, the local variable shadows the outer one. The `this` keyword explicitly qualifies the reference to the current object instance.'
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
