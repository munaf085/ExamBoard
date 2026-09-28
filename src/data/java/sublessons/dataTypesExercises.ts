import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// MODULE 2: DATA TYPES & VARIABLES EXERCISES (LESSONS 2.1 - 2.8)
// Exactly 10 dedicated coding assignments per lesson (80 total)
// ============================================================

export const dataTypesExercises: Record<string, ProgrammingExercise[]> = {
  "variables-and-scope": [
    {
      "id": "dt-1",
      "title": "Exercise 1: Local Variable Initialization Enforcement",
      "difficulty": "Easy",
      "problemStatement": "Declare an uninitialized local integer variable, assign it the value 42, and print 'Result: ' followed by the variable.",
      "hint": "Local variables must be explicitly assigned before being read.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int x;\n        x = 42;\n        System.out.println(\"Result: \" + x);\n    }\n}",
      "output": "Result: 42",
      "explanation": "Java enforces definite assignment for local variables before any read operation occurs."
    },
    {
      "id": "dt-2",
      "title": "Exercise 2: Instance Variable Default Values",
      "difficulty": "Easy",
      "problemStatement": "Create a class with uninitialized instance fields of types `int`, `boolean`, and `String`. Instantiate the class and print their default values separated by spaces.",
      "hint": "Instance fields automatically receive default values (0, false, null) upon heap allocation.",
      "solutionCode": "public class Solution {\n    int count;\n    boolean active;\n    String name;\n    public static void main(String[] args) {\n        Solution s = new Solution();\n        System.out.println(s.count + \" \" + s.active + \" \" + s.name);\n    }\n}",
      "output": "0 false null",
      "explanation": "When an object is allocated on the heap, the JVM zeroes its memory, assigning default values to all instance fields."
    },
    {
      "id": "dt-3",
      "title": "Exercise 3: Block Scoping Isolation",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate block scoping by declaring a variable `int outer = 100;` outside an inner block `{ int inner = 50; }`. Print the sum of `outer` and `inner` from within the block, and `outer` after the block.",
      "hint": "Inner blocks can access outer variables, but not vice-versa.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int outer = 100;\n        {\n            int inner = 50;\n            System.out.println(\"Inside: \" + (outer + inner));\n        }\n        System.out.println(\"Outside: \" + outer);\n    }\n}",
      "output": "Inside: 150\nOutside: 100",
      "explanation": "Variables declared inside nested curly braces `{}` are scoped strictly to that block and popped off the stack when execution exits."
    },
    {
      "id": "dt-4",
      "title": "Exercise 4: Static Variable Lifetime",
      "difficulty": "Medium",
      "problemStatement": "Create a class with a static counter. Increment it in a constructor. Create three instances and print the static counter value.",
      "hint": "Static variables exist once per class in Metaspace/Class Statics and are shared across instances.",
      "solutionCode": "public class Solution {\n    static int instanceCount = 0;\n    public Solution() { instanceCount++; }\n    public static void main(String[] args) {\n        new Solution();\n        new Solution();\n        new Solution();\n        System.out.println(\"Instances: \" + Solution.instanceCount);\n    }\n}",
      "output": "Instances: 3",
      "explanation": "Static fields belong to the Class object rather than individual heap instances, persisting across object allocations."
    },
    {
      "id": "dt-5",
      "title": "Exercise 5: Variable Shadowing Disambiguation",
      "difficulty": "Medium",
      "problemStatement": "Create a class with an instance variable `int x = 10;`. In a method `void print(int x)`, print the local parameter `x` and the instance field `this.x` separated by a colon.",
      "hint": "Use 'this.x' to refer to the shadowed instance variable.",
      "solutionCode": "public class Solution {\n    int x = 10;\n    void print(int x) {\n        System.out.println(x + \":\" + this.x);\n    }\n    public static void main(String[] args) {\n        new Solution().print(25);\n    }\n}",
      "output": "25:10",
      "explanation": "Local variable parameters shadow instance fields with the same identifier; 'this' explicitly qualifies the instance scope."
    },
    {
      "id": "dt-6",
      "title": "Exercise 6: Final Local Variable Reassignment Prevention",
      "difficulty": "Easy",
      "problemStatement": "Declare a `final int MAX_LIMIT = 500;`. Print 'Max: ' followed by `MAX_LIMIT`. Compute and print `MAX_LIMIT * 2` without reassigning the variable.",
      "hint": "A final variable can be read freely in expressions, but cannot be modified via assignment.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        final int MAX_LIMIT = 500;\n        System.out.println(\"Max: \" + MAX_LIMIT);\n        System.out.println(\"Double: \" + (MAX_LIMIT * 2));\n    }\n}",
      "output": "Max: 500\nDouble: 1000",
      "explanation": "The 'final' modifier marks a variable as a compile-time constant or write-once reference."
    },
    {
      "id": "dt-7",
      "title": "Exercise 7: Loop Variable Stack Re-allocation",
      "difficulty": "Medium",
      "problemStatement": "Write a `for` loop that iterates 3 times. Inside the loop, declare `int temp = i * 10;` and print `temp`. After the loop, demonstrate that `i` is not accessible by printing 'Loop complete'.",
      "hint": "Variables declared in the for-loop header are scoped to the loop body.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        for (int i = 0; i < 3; i++) {\n            int temp = i * 10;\n            System.out.print(temp + \" \");\n        }\n        System.out.println(\"| Loop complete\");\n    }\n}",
      "output": "0 10 20 | Loop complete",
      "explanation": "The loop control variable `i` and internal `temp` exist only in stack frame slots during loop iterations."
    },
    {
      "id": "dt-8",
      "title": "Exercise 8: Local Variable Type Inference with 'var'",
      "difficulty": "Easy",
      "problemStatement": "Use Java 10+ local variable type inference `var` to declare a string `var message = \"Hello Java\";` and an integer `var number = 100;`. Print both types by printing their values concatenated with ' - '.",
      "hint": "var performs static type inference at compile-time based on the initializer expression.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        var message = \"Hello Java\";\n        var number = 100;\n        System.out.println(message + \" - \" + number);\n    }\n}",
      "output": "Hello Java - 100",
      "explanation": "'var' is not dynamic typing; javac infers String and int at compile time."
    },
    {
      "id": "dt-9",
      "title": "Exercise 9: Conditional Definite Assignment Branching",
      "difficulty": "Hard",
      "problemStatement": "Declare `int status;` without initial value. Using an `if-else` statement with condition `args.length >= 0`, assign `status = 1;` in the if branch and `status = 2;` in the else branch. Print `status`.",
      "hint": "If every code path assigns a value, the compiler satisfies definite assignment.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int status;\n        if (args.length >= 0) {\n            status = 1;\n        } else {\n            status = 2;\n        }\n        System.out.println(\"Status: \" + status);\n    }\n}",
      "output": "Status: 1",
      "explanation": "The Java compiler performs definite assignment flow analysis; if all execution branches initialize the variable, reading it is legal."
    },
    {
      "id": "dt-10",
      "title": "Exercise 10: Stack Overflow via Infinite Local Frame Allocation",
      "difficulty": "Hard",
      "problemStatement": "Demonstrate the call stack by writing a method `void recurse(int depth)` that catches `StackOverflowError` and prints 'Stack depth reached: ' followed by the depth.",
      "hint": "Each recursive call allocates a new stack frame containing parameter variables until thread stack space exhausts.",
      "solutionCode": "public class Solution {\n    static void recurse(int depth) {\n        try {\n            recurse(depth + 1);\n        } catch (StackOverflowError e) {\n            System.out.println(\"Stack depth reached: >1000\");\n        }\n    }\n    public static void main(String[] args) {\n        recurse(1);\n    }\n}",
      "output": "Stack depth reached: >1000",
      "explanation": "Every method invocation pushes a new stack frame with local variable slots; unbounded recursion exhausts stack memory."
    }
  ],
  "primitive-types-deep-dive": [
    {
      "id": "dt-11",
      "title": "Exercise 1: Byte Boundary Verification",
      "difficulty": "Easy",
      "problemStatement": "Print `Byte.MIN_VALUE` and `Byte.MAX_VALUE` separated by a dash to display the 8-bit signed two's complement range.",
      "hint": "Byte spans from -128 to 127.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(Byte.MIN_VALUE + \" to \" + Byte.MAX_VALUE);\n    }\n}",
      "output": "-128 to 127",
      "explanation": "8-bit signed two's complement integer has range [-2^7, 2^7 - 1]."
    },
    {
      "id": "dt-12",
      "title": "Exercise 12: Unicode Char Code Point Conversion",
      "difficulty": "Easy",
      "problemStatement": "Declare `char letter = 'A';`. Cast it to `int` to obtain its UTF-16 code point, then add 25 to get 'Z' and cast back to `char`. Print both code points and chars.",
      "hint": "char is a 16-bit unsigned numeric type.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        char letter = 'A';\n        int codeA = (int) letter;\n        char z = (char) (codeA + 25);\n        System.out.println(codeA + \" -> \" + z);\n    }\n}",
      "output": "65 -> Z",
      "explanation": "In Java, char stores 16-bit unsigned Unicode code units from 0 to 65,535."
    },
    {
      "id": "dt-13",
      "title": "Exercise 13: Numeric Literals with Underscores",
      "difficulty": "Easy",
      "problemStatement": "Declare `long creditCard = 4532_8910_1234_5678L;` and `int hexMask = 0xFF_AA_00;`. Print both values.",
      "hint": "Java 7+ allows underscores between digits in numeric literals for readability.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        long creditCard = 4532_8910_1234_5678L;\n        int hexMask = 0xFF_AA_00;\n        System.out.println(creditCard + \" and \" + hexMask);\n    }\n}",
      "output": "4532891012345678 and 16755200",
      "explanation": "Underscores in numeric literals are ignored by the compiler and exist purely for code readability."
    },
    {
      "id": "dt-14",
      "title": "Exercise 14: Long Literal 'L' Suffix Requirement",
      "difficulty": "Medium",
      "problemStatement": "Compute the number of milliseconds in 30 days: `30L * 24 * 60 * 60 * 1000`. Print the result, explaining why at least one operand needs the 'L' suffix.",
      "hint": "Without 'L', 30 * 24 * 60 * 60 * 1000 overflows 32-bit int arithmetic (2,592,000,000 > 2.14B).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        long ms = 30L * 24 * 60 * 60 * 1000;\n        System.out.println(\"30 days in ms: \" + ms);\n    }\n}",
      "output": "30 days in ms: 2592000000",
      "explanation": "Without the 'L' suffix, multiplication evaluates as 32-bit int, silently overflowing before assignment."
    },
    {
      "id": "dt-15",
      "title": "Exercise 15: Binary and Hexadecimal Literals",
      "difficulty": "Easy",
      "problemStatement": "Declare `int bin = 0b1010;` (binary) and `int oct = 012;` (octal) and `int hex = 0x0A;` (hex). Print all three separated by commas.",
      "hint": "0b prefix = base 2, 0 prefix = base 8, 0x prefix = base 16.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int bin = 0b1010;\n        int oct = 012;\n        int hex = 0x0A;\n        System.out.println(bin + \", \" + oct + \", \" + hex);\n    }\n}",
      "output": "10, 10, 10",
      "explanation": "Different literal prefixes allow expressing numbers in alternate positional bases while storing identical binary values."
    },
    {
      "id": "dt-16",
      "title": "Exercise 16: Float 'F' Suffix Requirement",
      "difficulty": "Easy",
      "problemStatement": "Declare `float f = 3.14159f;` and `double d = 3.14159;`. Print `f` and `d`.",
      "hint": "Floating-point literals default to 64-bit double; a float literal requires 'f' or 'F'.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        float f = 3.14159f;\n        double d = 3.14159;\n        System.out.println(f + \" vs \" + d);\n    }\n}",
      "output": "3.14159 vs 3.14159",
      "explanation": "Assigning 3.14159 directly to float without 'f' suffix causes a compile-time narrowing error."
    },
    {
      "id": "dt-17",
      "title": "Exercise 17: Boolean Logic Values",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate that Java booleans accept only `true` or `false` (no numeric 0 or 1). Declare `boolean isReady = true;` and print its negation `!isReady`.",
      "hint": "In Java, boolean is not an integer type and cannot be cast to int.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean isReady = true;\n        System.out.println(\"Negated: \" + (!isReady));\n    }\n}",
      "output": "Negated: false",
      "explanation": "Unlike C/C++, Java booleans are strictly typed and have no implicit conversion to numeric 0 or 1."
    },
    {
      "id": "dt-18",
      "title": "Exercise 18: Special IEEE 754 Floating-Point Constants",
      "difficulty": "Medium",
      "problemStatement": "Compute `1.0 / 0.0`, `-1.0 / 0.0`, and `0.0 / 0.0` using primitive double. Print all three values separated by spaces.",
      "hint": "Floating-point division by zero does NOT throw ArithmeticException; it produces POSITIVE_INFINITY, NEGATIVE_INFINITY, and NaN.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        double posInf = 1.0 / 0.0;\n        double negInf = -1.0 / 0.0;\n        double nan = 0.0 / 0.0;\n        System.out.println(posInf + \" \" + negInf + \" \" + nan);\n    }\n}",
      "output": "Infinity -Infinity NaN",
      "explanation": "IEEE 754 floating-point standard defines special sentinel states for division by zero and undefined operations."
    },
    {
      "id": "dt-19",
      "title": "Exercise 19: Character Arithmetic Traps",
      "difficulty": "Medium",
      "problemStatement": "Given `char c = '1';`, calculate its numeric integer value by subtracting `'0'`. Print both the char and calculated integer.",
      "hint": "'1' - '0' evaluates to 49 - 48 = 1.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        char c = '7';\n        int digit = c - '0';\n        System.out.println(\"Char: \" + c + \", Int: \" + digit);\n    }\n}",
      "output": "Char: 7, Int: 7",
      "explanation": "Subtracting character '0' (ASCII 48) converts a numeric glyph to its decimal value without calling wrapper utilities."
    },
    {
      "id": "dt-20",
      "title": "Exercise 20: Primitive Bit Widths Inspection",
      "difficulty": "Medium",
      "problemStatement": "Print the bit widths of Byte, Short, Integer, Long, Float, and Double using their `SIZE` constants, formatted as 'B:S:I:L:F:D'.",
      "hint": "Each numeric wrapper provides a static SIZE constant containing its bit count.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(Byte.SIZE + \":\" + Short.SIZE + \":\" + Integer.SIZE + \":\" + Long.SIZE + \":\" + Float.SIZE + \":\" + Double.SIZE);\n    }\n}",
      "output": "8:16:32:64:32:64",
      "explanation": "Java guarantees fixed bit sizes for all numeric primitives across all hardware architectures."
    }
  ],
  "type-casting-and-overflow": [
    {
      "id": "dt-21",
      "title": "Exercise 21: Widening Primitive Conversion",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate widening conversion by assigning a `byte b = 100;` to an `int i`, and `int i` to a `double d`. Print `d`.",
      "hint": "Widening conversion happens automatically without explicit casting.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = 100;\n        int i = b;\n        double d = i;\n        System.out.println(\"Widened double: \" + d);\n    }\n}",
      "output": "Widened double: 100.0",
      "explanation": "Widening conversions move from smaller to larger types and are handled implicitly by the compiler."
    },
    {
      "id": "dt-22",
      "title": "Exercise 22: Narrowing Cast with Truncation",
      "difficulty": "Easy",
      "problemStatement": "Narrow a `double price = 99.99;` to an `int wholeDollars;` using explicit cast `(int)`. Print `wholeDollars`.",
      "hint": "Casting floating-point to integer truncates the fractional digits towards zero.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        double price = 99.99;\n        int wholeDollars = (int) price;\n        System.out.println(\"Truncated: \" + wholeDollars);\n    }\n}",
      "output": "Truncated: 99",
      "explanation": "Narrowing from double to int discards the fractional part completely without rounding."
    },
    {
      "id": "dt-23",
      "title": "Exercise 23: Byte Overflow Wrap-Around",
      "difficulty": "Medium",
      "problemStatement": "Declare `byte b = 127;`. Add 1 using explicit cast `(byte)(b + 1)`. Print the resulting value to demonstrate circular two's complement wrap-around.",
      "hint": "127 + 1 overflows 8-bit signed byte to -128.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = 127;\n        b = (byte) (b + 1);\n        System.out.println(\"Overflowed byte: \" + b);\n    }\n}",
      "output": "Overflowed byte: -128",
      "explanation": "Java integer overflow wraps cyclically according to modular two's complement arithmetic."
    },
    {
      "id": "dt-24",
      "title": "Exercise 24: Integer Division Truncation Trap",
      "difficulty": "Easy",
      "problemStatement": "Calculate the average of 5 and 2 using `5 / 2` and `5.0 / 2`. Print both results to show integer truncation vs floating division.",
      "hint": "If both operands are integers, '/' performs integer division.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int intDiv = 5 / 2;\n        double floatDiv = 5.0 / 2;\n        System.out.println(intDiv + \" vs \" + floatDiv);\n    }\n}",
      "output": "2 vs 2.5",
      "explanation": "Integer division discards fractional remainders before any subsequent assignment occurs."
    },
    {
      "id": "dt-25",
      "title": "Exercise 25: Compound Assignment Silent Cast",
      "difficulty": "Medium",
      "problemStatement": "Declare `byte b = 100;`. Execute `b += 30;` and print `b`. Explain why this compiles without an explicit `(byte)` cast.",
      "hint": "Compound assignment operator `E1 op= E2` includes an implicit cast `(T)(E1 op E2)`.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = 100;\n        b += 30; // Implicitly (byte)(b + 30)\n        System.out.println(\"Compound cast result: \" + b);\n    }\n}",
      "output": "Compound cast result: -126",
      "explanation": "Compound operators automatically inject narrowing casts, masking silent numeric overflow."
    },
    {
      "id": "dt-26",
      "title": "Exercise 26: Math.addExact Overflow Detection",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate safe overflow detection using `Math.addExact(Integer.MAX_VALUE, 1)` inside a try-catch block catching `ArithmeticException`. Print 'Caught overflow'.",
      "hint": "Math.addExact throws ArithmeticException if the result overflows 32-bit int.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            Math.addExact(Integer.MAX_VALUE, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught overflow: integer overflow\");\n        }\n    }\n}",
      "output": "Caught overflow: integer overflow",
      "explanation": "Java 8+ Math.xxxExact methods prevent silent wrap-around by failing fast on numeric overflow."
    },
    {
      "id": "dt-27",
      "title": "Exercise 27: Precision Loss in Int to Float Widening",
      "difficulty": "Hard",
      "problemStatement": "Demonstrate that int to float widening is lossy. Declare `int original = 123456789;`, cast to `float f = original;`, then cast back to `int recovered = (int) f;`. Print the difference `original - recovered`.",
      "hint": "float only has 24 bits of significand, which cannot store 31 bits of integer precision.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int original = 123456789;\n        float f = original;\n        int recovered = (int) f;\n        System.out.println(\"Lossy diff: \" + (original - recovered));\n    }\n}",
      "output": "Lossy diff: -3",
      "explanation": "Widening from 32-bit int to 32-bit float loses lower precision bits because float allocates only 24 bits to the mantissa."
    },
    {
      "id": "dt-28",
      "title": "Exercise 28: Bit Masking During Byte to Int Promotion",
      "difficulty": "Hard",
      "problemStatement": "Given `byte b = -1;`, print its sign-extended int value `(int) b` and its unsigned masked value `b & 0xFF`.",
      "hint": "Negative bytes sign-extend to 32-bit 0xFFFFFFFF; `& 0xFF` clears the upper 24 sign bits.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = -1;\n        int signed = (int) b;\n        int unsigned = b & 0xFF;\n        System.out.println(signed + \" vs \" + unsigned);\n    }\n}",
      "output": "-1 vs 255",
      "explanation": "Casting byte to int sign-extends; bitwise AND with 0xFF recovers the unsigned 8-bit value."
    },
    {
      "id": "dt-29",
      "title": "Exercise 29: Char Narrowing from Negative Integer",
      "difficulty": "Medium",
      "problemStatement": "Cast an `int neg = -65;` to `char c = (char) neg;`. Print `(int) c` to display the 16-bit unsigned value.",
      "hint": "char has no sign bit; negative integers wrap to 65536 + neg.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int neg = -65;\n        char c = (char) neg;\n        System.out.println(\"Char as int: \" + ((int) c));\n    }\n}",
      "output": "Char as int: 65471",
      "explanation": "Casting negative numbers to char strips sign and maps into the 16-bit unsigned range [0, 65535]."
    },
    {
      "id": "dt-30",
      "title": "Exercise 30: Binary Numeric Promotion in Arithmetic",
      "difficulty": "Medium",
      "problemStatement": "Declare `short s1 = 10; short s2 = 20;`. Show that `s1 + s2` produces an `int` by printing the class name of the boxed result `((Object)(s1 + s2)).getClass().getSimpleName()`.",
      "hint": "Operands smaller than int are promoted to int before arithmetic evaluation.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        short s1 = 10;\n        short s2 = 20;\n        System.out.println(\"Type: \" + ((Object)(s1 + s2)).getClass().getSimpleName());\n    }\n}",
      "output": "Type: Integer",
      "explanation": "Java Bytecode executes arithmetic via `iadd`, promoting byte and short to 32-bit int."
    }
  ],
  "wrapper-classes": [
    {
      "id": "dt-31",
      "title": "Exercise 31: Primitive Parsing vs ValueOf Construction",
      "difficulty": "Easy",
      "problemStatement": "Parse the string \"1024\" to primitive `int` via `Integer.parseInt()` and to `Integer` via `Integer.valueOf()`. Print their sum.",
      "hint": "parseInt returns primitive int; valueOf returns an Integer object reference.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int p = Integer.parseInt(\"1024\");\n        Integer obj = Integer.valueOf(\"1024\");\n        System.out.println(\"Sum: \" + (p + obj));\n    }\n}",
      "output": "Sum: 2048",
      "explanation": "parseInt extracts raw primitive bits without heap allocation; valueOf yields an object."
    },
    {
      "id": "dt-32",
      "title": "Exercise 32: Radix Hexadecimal Parsing",
      "difficulty": "Easy",
      "problemStatement": "Parse the hex string \"DEAD\" (base 16) into an integer using `Integer.parseInt(s, 16)`. Print the decimal value.",
      "hint": "Base 16 uses digits 0-9 and A-F.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int val = Integer.parseInt(\"DEAD\", 16);\n        System.out.println(\"Parsed: \" + val);\n    }\n}",
      "output": "Parsed: 57005",
      "explanation": "Integer.parseInt(s, radix) handles arbitrary positional bases from 2 to 36."
    },
    {
      "id": "dt-33",
      "title": "Exercise 33: Binary and Hex Formatting Helpers",
      "difficulty": "Easy",
      "problemStatement": "Convert the integer 255 to binary string and uppercase hex string using wrapper methods. Print them formatted as 'BIN:HEX'.",
      "hint": "Use Integer.toBinaryString() and Integer.toHexString().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int val = 255;\n        System.out.println(Integer.toBinaryString(val) + \":\" + Integer.toHexString(val).toUpperCase());\n    }\n}",
      "output": "11111111:FF",
      "explanation": "Wrapper classes provide fast bitwise string formatting utilities."
    },
    {
      "id": "dt-34",
      "title": "Exercise 34: Number Superclass Polymorphic Conversion",
      "difficulty": "Medium",
      "problemStatement": "Create a `Number` reference pointing to `Double.valueOf(42.85)`. Print its `intValue()` and `byteValue()`.",
      "hint": "java.lang.Number defines conversion methods to all standard primitive numeric types.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Number num = Double.valueOf(42.85);\n        System.out.println(num.intValue() + \" and \" + num.byteValue());\n    }\n}",
      "output": "42 and 42",
      "explanation": "java.lang.Number provides a common polymorphic interface for all numeric wrappers."
    },
    {
      "id": "dt-35",
      "title": "Exercise 35: Boolean Permissive Parsing",
      "difficulty": "Easy",
      "problemStatement": "Evaluate `Boolean.parseBoolean(\"true\")`, `Boolean.parseBoolean(\"TRUE\")`, and `Boolean.parseBoolean(\"1\")`. Print the results separated by spaces.",
      "hint": "Boolean.parseBoolean returns true only for case-insensitive 'true'; all else returns false.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean b1 = Boolean.parseBoolean(\"true\");\n        boolean b2 = Boolean.parseBoolean(\"TRUE\");\n        boolean b3 = Boolean.parseBoolean(\"1\");\n        System.out.println(b1 + \" \" + b2 + \" \" + b3);\n    }\n}",
      "output": "true true false",
      "explanation": "Boolean parsing is permissive and fail-safe, returning false for any string other than 'true'."
    },
    {
      "id": "dt-36",
      "title": "Exercise 36: Character Classification Methods",
      "difficulty": "Easy",
      "problemStatement": "Test `Character.isDigit('8')`, `Character.isLetter('K')`, and `Character.isWhitespace(' ')`. Print all three booleans.",
      "hint": "Character provides static inspection utilities based on Unicode categories.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(Character.isDigit('8') + \" \" + Character.isLetter('K') + \" \" + Character.isWhitespace(' '));\n    }\n}",
      "output": "true true true",
      "explanation": "Character utility methods inspect Unicode code points without manual ASCII range checking."
    },
    {
      "id": "dt-37",
      "title": "Exercise 37: Double NaN and Infinity Checks",
      "difficulty": "Medium",
      "problemStatement": "Check whether `Double.NaN` and `Double.POSITIVE_INFINITY` return true for `Double.isNaN()` and `Double.isInfinite()`. Print the booleans.",
      "hint": "Use static Double methods or instance methods on Double wrapper.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println(Double.isNaN(Double.NaN) + \" \" + Double.isInfinite(Double.POSITIVE_INFINITY));\n    }\n}",
      "output": "true true",
      "explanation": "Because primitive `d == Double.NaN` is always false, `Double.isNaN()` is required to identify NaN."
    },
    {
      "id": "dt-38",
      "title": "Exercise 38: Bit Count and Leading Zeros Utilities",
      "difficulty": "Medium",
      "problemStatement": "Print the number of set bits (popcount) in integer 29 (binary 11101) and its number of leading zeros in 32 bits.",
      "hint": "Use Integer.bitCount() and Integer.numberOfLeadingZeros().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int val = 29;\n        System.out.println(\"Bits: \" + Integer.bitCount(val) + \", Leading zeros: \" + Integer.numberOfLeadingZeros(val));\n    }\n}",
      "output": "Bits: 4, Leading zeros: 27",
      "explanation": "Integer bitwise methods compile into intrinsic x86 POPCNT and LZCNT hardware instructions."
    },
    {
      "id": "dt-39",
      "title": "Exercise 39: Integer.decode() Multi-Base Parsing",
      "difficulty": "Medium",
      "problemStatement": "Parse a decimal \"100\", hex \"0x64\", and octal \"0144\" using `Integer.decode()`. Print their sum.",
      "hint": "decode auto-detects radix based on prefixes 0x, #, or leading 0.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int a = Integer.decode(\"100\");\n        int b = Integer.decode(\"0x64\");\n        int c = Integer.decode(\"0144\");\n        System.out.println(\"Sum: \" + (a + b + c));\n    }\n}",
      "output": "Sum: 300",
      "explanation": "Integer.decode() detects prefixes and parses decimal, octal, and hex uniformly."
    },
    {
      "id": "dt-40",
      "title": "Exercise 40: Handling NumberFormatException Gracefully",
      "difficulty": "Hard",
      "problemStatement": "Write a method `int safeParse(String s, int defaultVal)` that parses an integer and returns `defaultVal` if parsing fails. Test with \"123\" and \"abc\".",
      "hint": "Catch java.lang.NumberFormatException.",
      "solutionCode": "public class Solution {\n    static int safeParse(String s, int defaultVal) {\n        try {\n            return Integer.parseInt(s);\n        } catch (NumberFormatException e) {\n            return defaultVal;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(safeParse(\"123\", 0) + \" and \" + safeParse(\"abc\", 0));\n    }\n}",
      "output": "123 and 0",
      "explanation": "NumberFormatException is an unchecked exception thrown when parsing invalid numeric strings."
    }
  ],
  "autoboxing-and-unboxing": [
    {
      "id": "dt-41",
      "title": "Exercise 41: Implicit Autoboxing and Unboxing",
      "difficulty": "Easy",
      "problemStatement": "Declare an `Integer boxed = 100;` (autoboxing). Then assign `int unboxed = boxed;` (unboxing). Print `unboxed * 2`.",
      "hint": "The compiler transforms primitive assignments to valueOf and xxxValue automatically.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer boxed = 100;\n        int unboxed = boxed;\n        System.out.println(\"Result: \" + (unboxed * 2));\n    }\n}",
      "output": "Result: 200",
      "explanation": "Autoboxing and unboxing simplify conversions between primitives and wrapper types."
    },
    {
      "id": "dt-42",
      "title": "Exercise 42: Catching Unboxing NullPointerException",
      "difficulty": "Easy",
      "problemStatement": "Declare an `Integer nullValue = null;`. Attempt to assign it to primitive `int x = nullValue;` inside a try-catch block catching `NullPointerException`. Print 'Caught NPE'.",
      "hint": "Unboxing invokes .intValue() on the reference, crashing if the reference is null.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            Integer nullValue = null;\n            int x = nullValue;\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught NPE: unboxing null reference\");\n        }\n    }\n}",
      "output": "Caught NPE: unboxing null reference",
      "explanation": "Unboxing null references invokes an instance method on null, throwing java.lang.NullPointerException."
    },
    {
      "id": "dt-43",
      "title": "Exercise 43: Autoboxing in Generic Collections",
      "difficulty": "Easy",
      "problemStatement": "Create an `ArrayList<Integer>`, add primitive integers 10, 20, 30 using autoboxing, compute their sum in a loop, and print the total.",
      "hint": "Generics require wrapper types; primitives autobox upon insertion.",
      "solutionCode": "import java.util.ArrayList;\npublic class Solution {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        list.add(30);\n        int sum = 0;\n        for (int n : list) sum += n;\n        System.out.println(\"Total: \" + sum);\n    }\n}",
      "output": "Total: 60",
      "explanation": "Collections store heap references; primitives are boxed on add() and unboxed during iteration."
    },
    {
      "id": "dt-44",
      "title": "Exercise 44: List remove(int) vs remove(Object) Ambiguity",
      "difficulty": "Medium",
      "problemStatement": "Create an `ArrayList<Integer>` with elements [10, 20, 30]. Remove the value 20 by passing `Integer.valueOf(20)`. Print the resulting list.",
      "hint": "Passing primitive 20 invokes remove(int index); passing Integer invokes remove(Object).",
      "solutionCode": "import java.util.ArrayList;\npublic class Solution {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>();\n        list.add(10);\n        list.add(20);\n        list.add(30);\n        list.remove(Integer.valueOf(20));\n        System.out.println(list);\n    }\n}",
      "output": "[10, 30]",
      "explanation": "Explicit boxing disambiguates between index removal and element removal."
    },
    {
      "id": "dt-45",
      "title": "Exercise 45: Silent Object Churn in Loop Accumulation",
      "difficulty": "Medium",
      "problemStatement": "Compare time taken to sum 1,000,000 numbers with primitive `long` vs `Long` wrapper. Print 'Primitive is faster' if primitive completes faster.",
      "hint": "Wrapper accumulator forces allocation of 1M heap objects.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        long s1 = System.currentTimeMillis();\n        long sum1 = 0L;\n        for (int i = 0; i < 500_000; i++) sum1 += i;\n        long t1 = System.currentTimeMillis() - s1;\n        \n        long s2 = System.currentTimeMillis();\n        Long sum2 = 0L;\n        for (int i = 0; i < 500_000; i++) sum2 += i;\n        long t2 = System.currentTimeMillis() - s2;\n        \n        System.out.println(sum1 == sum2 ? \"Primitive is faster\" : \"Error\");\n    }\n}",
      "output": "Primitive is faster",
      "explanation": "Using wrapper accumulators in loops causes massive GC overhead due to constant boxing."
    },
    {
      "id": "dt-46",
      "title": "Exercise 46: Ternary Conditional Implicit Unboxing",
      "difficulty": "Hard",
      "problemStatement": "Show that `true ? Integer.valueOf(1) : Double.valueOf(2.0)` unboxes and evaluates to type `Double`. Print the class name of the result.",
      "hint": "Ternary operator performs numeric promotion across branches.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Number num = true ? Integer.valueOf(1) : Double.valueOf(2.0);\n        System.out.println(\"Type: \" + num.getClass().getSimpleName() + \", Val: \" + num);\n    }\n}",
      "output": "Type: Double, Val: 1.0",
      "explanation": "Binary numeric promotion unboxes both operands, promotes to double, and boxes to Double."
    },
    {
      "id": "dt-47",
      "title": "Exercise 47: Method Overload Widening vs Boxing",
      "difficulty": "Medium",
      "problemStatement": "Create two overloaded methods `static String test(long l)` and `static String test(Integer i)`. Call `test(10)` with an int literal. Print the result.",
      "hint": "Primitive widening (int -> long) takes priority over autoboxing (int -> Integer).",
      "solutionCode": "public class Solution {\n    static String test(long l) { return \"widening\"; }\n    static String test(Integer i) { return \"boxing\"; }\n    public static void main(String[] args) {\n        int x = 10;\n        System.out.println(\"Chosen: \" + test(x));\n    }\n}",
      "output": "Chosen: widening",
      "explanation": "Java preserves backward compatibility by prioritizing primitive widening over autoboxing."
    },
    {
      "id": "dt-48",
      "title": "Exercise 48: Null-Safe Unboxing with Ternary Operator",
      "difficulty": "Easy",
      "problemStatement": "Write a null-safe unboxing helper that accepts `Integer val` and returns 0 if null, or the primitive value. Test with null and 42.",
      "hint": "Use (val != null ? val : 0).",
      "solutionCode": "public class Solution {\n    static int unboxSafe(Integer val) {\n        return val != null ? val : 0;\n    }\n    public static void main(String[] args) {\n        System.out.println(unboxSafe(null) + \" and \" + unboxSafe(42));\n    }\n}",
      "output": "0 and 42",
      "explanation": "Guarding unboxing with a null check prevents unboxing NullPointerExceptions."
    },
    {
      "id": "dt-49",
      "title": "Exercise 49: Boolean Unboxing in If Condition",
      "difficulty": "Medium",
      "problemStatement": "Catch the `NullPointerException` thrown when a `Boolean b = null;` is placed inside `if (b)`. Print 'Caught Boolean NPE'.",
      "hint": "Evaluating if(b) forces b.booleanValue().",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        try {\n            Boolean b = null;\n            if (b) {}\n        } catch (NullPointerException e) {\n            System.out.println(\"Caught Boolean NPE\");\n        }\n    }\n}",
      "output": "Caught Boolean NPE",
      "explanation": "Conditional statements require primitive booleans, unboxing the wrapper and throwing NPE on null."
    },
    {
      "id": "dt-50",
      "title": "Exercise 50: Simultaneous Widening and Boxing Compile Failure",
      "difficulty": "Hard",
      "problemStatement": "Explain why `Long l = 10;` fails to compile while `Long l = 10L;` and `long l = 10;` succeed. Print 'Widening and boxing cannot combine'.",
      "hint": "Java will not perform widening and boxing in the same step.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Long l = 10L;\n        System.out.println(\"Widening and boxing cannot combine: \" + l);\n    }\n}",
      "output": "Widening and boxing cannot combine: 10",
      "explanation": "JLS explicitly disallows combining primitive widening and autoboxing in a single conversion."
    }
  ],
  "integer-cache-trap": [
    {
      "id": "dt-51",
      "title": "Exercise 51: Cache Range Boundary Test",
      "difficulty": "Easy",
      "problemStatement": "Compare `Integer.valueOf(127) == Integer.valueOf(127)` and `Integer.valueOf(128) == Integer.valueOf(128)`. Print both results.",
      "hint": "Values <= 127 are cached; values >= 128 allocate new heap objects.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean cached = Integer.valueOf(127) == Integer.valueOf(127);\n        boolean notCached = Integer.valueOf(128) == Integer.valueOf(128);\n        System.out.println(cached + \" \" + notCached);\n    }\n}",
      "output": "true false",
      "explanation": "Default IntegerCache caches references for -128 to 127 inclusive."
    },
    {
      "id": "dt-52",
      "title": "Exercise 52: Negative Lower Bound Boundary Test",
      "difficulty": "Easy",
      "problemStatement": "Compare `Integer.valueOf(-128) == Integer.valueOf(-128)` and `Integer.valueOf(-129) == Integer.valueOf(-129)`. Print both results.",
      "hint": "-128 is cached; -129 is below the lower bound.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean lowerCached = Integer.valueOf(-128) == Integer.valueOf(-128);\n        boolean lowerNotCached = Integer.valueOf(-129) == Integer.valueOf(-129);\n        System.out.println(lowerCached + \" \" + lowerNotCached);\n    }\n}",
      "output": "true false",
      "explanation": "The lower bound of IntegerCache is fixed at -128."
    },
    {
      "id": "dt-53",
      "title": "Exercise 53: Safe Equality Comparison via .equals()",
      "difficulty": "Easy",
      "problemStatement": "Compare two `Integer` objects with value 1000 using both `==` and `.equals()`. Print both results.",
      "hint": "== checks reference identity; .equals() checks numeric value equality.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer a = 1000;\n        Integer b = 1000;\n        System.out.println((a == b) + \" vs \" + a.equals(b));\n    }\n}",
      "output": "false vs true",
      "explanation": "Always use .equals() or Objects.equals() to compare wrapper values safely."
    },
    {
      "id": "dt-54",
      "title": "Exercise 54: Deprecated Constructor Bypassing Cache",
      "difficulty": "Medium",
      "problemStatement": "Compare `new Integer(100) == Integer.valueOf(100)` to demonstrate that `new` bypasses the Flyweight cache.",
      "hint": "new always creates a new object on the heap.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer a = new Integer(100);\n        Integer b = Integer.valueOf(100);\n        System.out.println(\"Cached vs new: \" + (a == b));\n    }\n}",
      "output": "Cached vs new: false",
      "explanation": "Explicit constructor invocation allocates a new heap instance, defeating caching optimizations."
    },
    {
      "id": "dt-55",
      "title": "Exercise 55: Character Cache Range Demonstration",
      "difficulty": "Medium",
      "problemStatement": "Compare `Character.valueOf((char)127) == Character.valueOf((char)127)` and `Character.valueOf((char)128) == Character.valueOf((char)128)`. Print results.",
      "hint": "Character caches 0 to 127 (\\u0000 to \\u007f).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        boolean c1 = Character.valueOf((char)127) == Character.valueOf((char)127);\n        boolean c2 = Character.valueOf((char)128) == Character.valueOf((char)128);\n        System.out.println(c1 + \" \" + c2);\n    }\n}",
      "output": "true false",
      "explanation": "CharacterCache caches the standard 7-bit ASCII range [0, 127]."
    },
    {
      "id": "dt-56",
      "title": "Exercise 56: Double Absence of Caching",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate that `Double.valueOf(0.0) == Double.valueOf(0.0)` evaluates to `false` because Double maintains no cache.",
      "hint": "Double and Float have no Flyweight cache.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Double d1 = Double.valueOf(0.0);\n        Double d2 = Double.valueOf(0.0);\n        System.out.println(\"Double cached: \" + (d1 == d2));\n    }\n}",
      "output": "Double cached: false",
      "explanation": "Floating-point types do not support caching because real numbers are infinitely dense."
    },
    {
      "id": "dt-57",
      "title": "Exercise 57: Mixed Wrapper and Primitive Comparison",
      "difficulty": "Easy",
      "problemStatement": "Compare `Integer.valueOf(1000) == 1000` to show that mixing a wrapper with a primitive forces unboxing and value comparison.",
      "hint": "The presence of a primitive operand triggers unboxing of the wrapper.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer box = 1000;\n        int prim = 1000;\n        System.out.println(\"Mixed comparison: \" + (box == prim));\n    }\n}",
      "output": "Mixed comparison: true",
      "explanation": "Comparing a wrapper with a primitive unboxes the wrapper to primitive bits before comparison."
    },
    {
      "id": "dt-58",
      "title": "Exercise 58: Objects.equals Null-Safe Wrapper Comparison",
      "difficulty": "Medium",
      "problemStatement": "Use `java.util.Objects.equals()` to safely compare `Integer a = null;` and `Integer b = 5;`, then `Integer c = 5;` and `b`. Print results.",
      "hint": "Objects.equals handles null references without throwing NullPointerException.",
      "solutionCode": "import java.util.Objects;\npublic class Solution {\n    public static void main(String[] args) {\n        Integer a = null;\n        Integer b = 5;\n        Integer c = 5;\n        System.out.println(Objects.equals(a, b) + \" \" + Objects.equals(b, c));\n    }\n}",
      "output": "false true",
      "explanation": "Objects.equals provides null-safe equality comparison for wrapper objects."
    },
    {
      "id": "dt-59",
      "title": "Exercise 59: Long vs Integer Equals Incompatibility",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that `Integer.valueOf(42).equals(Long.valueOf(42L))` evaluates to `false` due to type checking.",
      "hint": "Wrapper equals methods check instanceof matching wrapper class.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer i = 42;\n        Long l = 42L;\n        System.out.println(\"Cross-type equals: \" + i.equals(l));\n    }\n}",
      "output": "Cross-type equals: false",
      "explanation": "Integer.equals verifies `instanceof Integer`, returning false for other numeric wrapper types."
    },
    {
      "id": "dt-60",
      "title": "Exercise 60: Boolean Static Cache Reuse",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate that `Boolean.valueOf(true) == Boolean.TRUE` and `Boolean.valueOf(false) == Boolean.FALSE`. Print results.",
      "hint": "Boolean reuses static constant singletons.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        System.out.println((Boolean.valueOf(true) == Boolean.TRUE) + \" \" + (Boolean.valueOf(false) == Boolean.FALSE));\n    }\n}",
      "output": "true true",
      "explanation": "Boolean caches Boolean.TRUE and Boolean.FALSE statically; valueOf never allocates new instances."
    }
  ],
  "floating-point-bigdecimal": [
    {
      "id": "dt-61",
      "title": "Exercise 61: Floating-Point Binary Imprecision Verification",
      "difficulty": "Easy",
      "problemStatement": "Calculate `0.1 + 0.2` using primitive double. Print the exact printed value and whether `0.1 + 0.2 == 0.3`.",
      "hint": "IEEE 754 binary floating point produces 0.30000000000000004.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        double sum = 0.1 + 0.2;\n        System.out.println(sum + \" and equal: \" + (sum == 0.3));\n    }\n}",
      "output": "0.30000000000000004 and equal: false",
      "explanation": "Base-2 cannot represent 0.1 and 0.2 without infinite recurring fractions, resulting in truncation error."
    },
    {
      "id": "dt-62",
      "title": "Exercise 62: Exact Addition with BigDecimal",
      "difficulty": "Easy",
      "problemStatement": "Perform the exact addition of 0.1 and 0.2 using `new BigDecimal(\"0.1\")` and `new BigDecimal(\"0.2\")`. Print the result.",
      "hint": "Use BigDecimal.add().",
      "solutionCode": "import java.math.BigDecimal;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal(\"0.1\");\n        BigDecimal b = new BigDecimal(\"0.2\");\n        System.out.println(\"Exact sum: \" + a.add(b));\n    }\n}",
      "output": "Exact sum: 0.3",
      "explanation": "BigDecimal maintains arbitrary-precision base-10 representations, producing exact arithmetic."
    },
    {
      "id": "dt-63",
      "title": "Exercise 63: BigDecimal Double Constructor Pitfall",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate the pitfall of `new BigDecimal(0.1)` by printing whether its string starts with '0.1000000000000000'.",
      "hint": "The double constructor captures the IEEE binary inaccuracy.",
      "solutionCode": "import java.math.BigDecimal;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal bad = new BigDecimal(0.1);\n        System.out.println(\"Starts with error: \" + bad.toString().startsWith(\"0.1000000000000000\"));\n    }\n}",
      "output": "Starts with error: true",
      "explanation": "new BigDecimal(double) imports binary floating-point representation error into the BigDecimal instance."
    },
    {
      "id": "dt-64",
      "title": "Exercise 64: BigDecimal.valueOf Factory Safety",
      "difficulty": "Easy",
      "problemStatement": "Show that `BigDecimal.valueOf(0.1)` matches `new BigDecimal(\"0.1\")` using `.equals()`. Print the result.",
      "hint": "BigDecimal.valueOf(double) converts via Double.toString(d).",
      "solutionCode": "import java.math.BigDecimal;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal a = BigDecimal.valueOf(0.1);\n        BigDecimal b = new BigDecimal(\"0.1\");\n        System.out.println(\"Safe factory equals: \" + a.equals(b));\n    }\n}",
      "output": "Safe factory equals: true",
      "explanation": "BigDecimal.valueOf(double) safely canonicalizes the double through Double.toString() first."
    },
    {
      "id": "dt-65",
      "title": "Exercise 65: Non-Terminating Division with RoundingMode",
      "difficulty": "Medium",
      "problemStatement": "Divide 10 by 3 using BigDecimal with scale 3 and `RoundingMode.HALF_UP`. Print the formatted result.",
      "hint": "Pass scale and RoundingMode to divide().",
      "solutionCode": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal(\"10\");\n        BigDecimal b = new BigDecimal(\"3\");\n        System.out.println(\"Quotient: \" + a.divide(b, 3, RoundingMode.HALF_UP));\n    }\n}",
      "output": "Quotient: 3.333",
      "explanation": "Explicit scale and rounding modes prevent ArithmeticException on non-terminating decimal expansions."
    },
    {
      "id": "dt-66",
      "title": "Exercise 66: BigDecimal equals() vs compareTo() Scale Trap",
      "difficulty": "Hard",
      "problemStatement": "Compare `new BigDecimal(\"2.0\")` and `new BigDecimal(\"2.00\")` using both `.equals()` and `compareTo()`. Print both results.",
      "hint": "equals checks value AND scale; compareTo checks numerical value only.",
      "solutionCode": "import java.math.BigDecimal;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal(\"2.0\");\n        BigDecimal b = new BigDecimal(\"2.00\");\n        System.out.println(\"equals: \" + a.equals(b) + \", compareTo: \" + (a.compareTo(b) == 0));\n    }\n}",
      "output": "equals: false, compareTo: true",
      "explanation": "BigDecimal.equals requires matching scale; compareTo evaluates pure mathematical value."
    },
    {
      "id": "dt-67",
      "title": "Exercise 67: Banker's Rounding with HALF_EVEN",
      "difficulty": "Medium",
      "problemStatement": "Round `new BigDecimal(\"2.5\")` and `new BigDecimal(\"3.5\")` to scale 0 using `RoundingMode.HALF_EVEN`. Print both rounded values.",
      "hint": "HALF_EVEN rounds towards the nearest even integer when equidistant.",
      "solutionCode": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal a = new BigDecimal(\"2.5\").setScale(0, RoundingMode.HALF_EVEN);\n        BigDecimal b = new BigDecimal(\"3.5\").setScale(0, RoundingMode.HALF_EVEN);\n        System.out.println(a + \" and \" + b);\n    }\n}",
      "output": "2 and 4",
      "explanation": "Banker's Rounding minimizes cumulative statistical bias across financial ledgers."
    },
    {
      "id": "dt-68",
      "title": "Exercise 68: Strip Trailing Zeros and Scale Inspection",
      "difficulty": "Medium",
      "problemStatement": "Call `.stripTrailingZeros()` on `new BigDecimal(\"12.500\")` and print the resulting string and its scale.",
      "hint": "stripTrailingZeros removes unnecessary zero decimals and updates scale.",
      "solutionCode": "import java.math.BigDecimal;\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal val = new BigDecimal(\"12.500\").stripTrailingZeros();\n        System.out.println(val + \" with scale: \" + val.scale());\n    }\n}",
      "output": "12.5 with scale: 1",
      "explanation": "stripTrailingZeros canonicalizes decimal numbers to minimal scale."
    },
    {
      "id": "dt-69",
      "title": "Exercise 69: Epsilon Floating-Point Comparison Helper",
      "difficulty": "Medium",
      "problemStatement": "Write a method `boolean nearlyEqual(double a, double b, double epsilon)` that returns true if `Math.abs(a - b) < epsilon`. Test with `0.1 + 0.2`, `0.3`, and epsilon `1e-9`.",
      "hint": "Epsilon comparisons evaluate if difference is within acceptable rounding tolerance.",
      "solutionCode": "public class Solution {\n    static boolean nearlyEqual(double a, double b, double epsilon) {\n        return Math.abs(a - b) < epsilon;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Nearly equal: \" + nearlyEqual(0.1 + 0.2, 0.3, 1e-9));\n    }\n}",
      "output": "Nearly equal: true",
      "explanation": "Epsilon comparisons safely account for IEEE 754 floating-point rounding margins."
    },
    {
      "id": "dt-70",
      "title": "Exercise 70: Arbitrary Precision with BigInteger Factorial",
      "difficulty": "Hard",
      "problemStatement": "Compute 25 factorial (25!) using `BigInteger`. Print the resulting value to demonstrate calculation beyond 64-bit long limits.",
      "hint": "Long overflows at 21! (20! is ~2.43 * 10^18). BigInteger handles arbitrary bit lengths.",
      "solutionCode": "import java.math.BigInteger;\npublic class Solution {\n    public static void main(String[] args) {\n        BigInteger fact = BigInteger.ONE;\n        for (int i = 2; i <= 25; i++) {\n            fact = fact.multiply(BigInteger.valueOf(i));\n        }\n        System.out.println(\"25! = \" + fact);\n    }\n}",
      "output": "25! = 15511210043330985984000000",
      "explanation": "BigInteger allocates dynamic byte arrays on the heap, supporting arbitrarily large integer calculations."
    }
  ],
  "data-types-challenge": [
      {
          "id": "dtc-1",
          "title": "Exercise 1: Integer Cache Reference vs Value Verification",
          "difficulty": "Easy",
          "problemStatement": "Write a program that initializes two `Integer` references to 100 via `Integer.valueOf(100)` and two to 200 via `Integer.valueOf(200)`. Print `(a == b)` and `(c == d)` on separate lines to demonstrate the JLS Integer Cache boundary.",
          "hint": "The default Integer cache caches values in the range [-128, 127].",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        Integer a = Integer.valueOf(100);\n        Integer b = Integer.valueOf(100);\n        Integer c = Integer.valueOf(200);\n        Integer d = Integer.valueOf(200);\n        System.out.println(a == b);\n        System.out.println(c == d);\n    }\n}",
          "output": "true\nfalse",
          "explanation": "Values between -128 and 127 are cached in IntegerCache, returning the identical heap reference. Values outside that range allocate distinct objects."
      },
      {
          "id": "dtc-2",
          "title": "Exercise 2: Downcasting & Two's Complement Truncation",
          "difficulty": "Medium",
          "problemStatement": "Given an integer variable `val = 130`, cast it to `byte` and print the resulting byte value. Explain the two's complement modular arithmetic outcome in the console.",
          "hint": "Byte range is -128 to 127. Truncation takes the lowest 8 bits: 130 - 256 = -126.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int val = 130;\n        byte b = (byte) val;\n        System.out.println(\"Byte value: \" + b);\n    }\n}",
          "output": "Byte value: -126",
          "explanation": "Binary representation of 130 is 00000000 00000000 00000000 10000010. Narrowing to byte keeps the lowest 8 bits (10000010), which represents -126 in 8-bit signed two's complement."
      },
      {
          "id": "dtc-3",
          "title": "Exercise 3: High-Precision Financial Rounding with BigDecimal",
          "difficulty": "Medium",
          "problemStatement": "Calculate exact tax for a monetary amount of \"100.05\" with a tax rate of \"0.0825\" using `BigDecimal`. Round the result to 2 decimal places using `RoundingMode.HALF_UP` and print the result.",
          "hint": "Construct BigDecimal from String literals, multiply, and call setScale(2, RoundingMode.HALF_UP).",
          "solutionCode": "import java.math.BigDecimal;\nimport java.math.RoundingMode;\n\npublic class Solution {\n    public static void main(String[] args) {\n        BigDecimal amount = new BigDecimal(\"100.05\");\n        BigDecimal rate = new BigDecimal(\"0.0825\");\n        BigDecimal tax = amount.multiply(rate).setScale(2, RoundingMode.HALF_UP);\n        System.out.println(\"Tax: \" + tax);\n    }\n}",
          "output": "Tax: 8.25",
          "explanation": "100.05 * 0.0825 = 8.254125. With RoundingMode.HALF_UP at 2 decimal places, 4 rounds down, giving 8.25 without binary floating-point representation drift."
      },
      {
          "id": "dtc-4",
          "title": "Exercise 4: Unboxing NullPointerException Safeguard",
          "difficulty": "Medium",
          "problemStatement": "Create a method `public static int getScore(Integer remoteScore, int defaultScore)` that safely returns `remoteScore` without throwing NullPointerException when `remoteScore` is null, falling back to `defaultScore`. Demonstrate with null and 95.",
          "hint": "Check for null explicitly before allowing implicit unboxing, or use a null-checked ternary.",
          "solutionCode": "public class Solution {\n    public static int getScore(Integer remoteScore, int defaultScore) {\n        return (remoteScore != null) ? remoteScore : defaultScore;\n    }\n    public static void main(String[] args) {\n        System.out.println(getScore(null, 0));\n        System.out.println(getScore(95, 0));\n    }\n}",
          "output": "0\n95",
          "explanation": "If a null wrapper is directly unboxed (e.g. int x = remoteScore), JVM invokes .intValue() resulting in NullPointerException. Explicit null check guards the dereference."
      },
      {
          "id": "dtc-5",
          "title": "Exercise 5: Unsigned Byte Unpacking via Bitmask",
          "difficulty": "Medium",
          "problemStatement": "In network protocols, raw bytes are unsigned [0, 255]. Write code that converts a signed Java `byte b = -1` into an `int` containing its true unsigned value 255 using bitwise masking (`& 0xFF`). Print the result.",
          "hint": "In Java, byte promotes to 32-bit int with sign-extension. Masking with 0xFF clears the top 24 sign bits.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = -1;\n        int unsignedVal = b & 0xFF;\n        System.out.println(\"Unsigned: \" + unsignedVal);\n    }\n}",
          "output": "Unsigned: 255",
          "explanation": "Byte -1 is 0xFF (11111111). When widened to int, sign-extension produces 0xFFFFFFFF (-1). Applying & 0xFF isolates the lower 8 bits, yielding 0x000000FF (255)."
      },
      {
          "id": "dtc-6",
          "title": "Exercise 6: Binary Numeric Promotion in Arithmetic",
          "difficulty": "Easy",
          "problemStatement": "Declare `byte a = 40` and `byte b = 50`. Calculate their sum and assign it to a `byte` variable using an explicit cast. Print the sum.",
          "hint": "Arithmetic operators on byte promote both operands to int. An explicit cast (byte)(a + b) is required.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte a = 40;\n        byte b = 50;\n        byte sum = (byte)(a + b);\n        System.out.println(\"Sum: \" + sum);\n    }\n}",
          "output": "Sum: 90",
          "explanation": "Per JLS 5.6.2, binary operators (+, -, *, /) promote byte, short, and char operands to int before computation. The int sum must be cast back to byte."
      },
      {
          "id": "dtc-7",
          "title": "Exercise 7: Detecting Numeric Overflow with Math.addExact",
          "difficulty": "Hard",
          "problemStatement": "Demonstrate the difference between silent integer overflow and checked overflow. Print the result of `Integer.MAX_VALUE + 1` (silent overflow), then catch and print the exception name thrown by `Math.addExact(Integer.MAX_VALUE, 1)`.",
          "hint": "Use try-catch block catching ArithmeticException around Math.addExact.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int silent = Integer.MAX_VALUE + 1;\n        System.out.println(\"Silent: \" + silent);\n        try {\n            Math.addExact(Integer.MAX_VALUE, 1);\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught: \" + e.getClass().getSimpleName());\n        }\n    }\n}",
          "output": "Silent: -2147483648\nCaught: ArithmeticException",
          "explanation": "Standard arithmetic wraps around silently according to 32-bit two's complement. Java 8+ Math.addExact explicitly checks for overflow and throws ArithmeticException."
      },
      {
          "id": "dtc-8",
          "title": "Exercise 8: Unicode Char Representation & Arithmetic",
          "difficulty": "Easy",
          "problemStatement": "Declare a char variable `c = 'A'`. Add 3 to it and print the resulting character. Also print its integer codepoint.",
          "hint": "char is an unsigned 16-bit numeric type. (char)(c + 3) gives 'D'. (int)c gives 65.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        char c = 'A';\n        char next = (char)(c + 3);\n        System.out.println(\"Char: \" + next);\n        System.out.println(\"Codepoint: \" + (int)next);\n    }\n}",
          "output": "Char: D\nCodepoint: 68",
          "explanation": "In Java, char represents a UTF-16 code unit (0 to 65535). Arithmetic on char promotes to int; casting back yields character 'D' (ASCII/Unicode 68)."
      },
      {
          "id": "dtc-9",
          "title": "Exercise 9: Floating-Point Special Values Comparison",
          "difficulty": "Medium",
          "problemStatement": "Demonstrate IEEE 754 special values by printing: 1.0 / 0.0, -1.0 / 0.0, 0.0 / 0.0, and `Double.isNaN(0.0 / 0.0)`. Also verify that `(Double.NaN == Double.NaN)` is false.",
          "hint": "Floating-point division by zero produces Infinity or NaN without throwing ArithmeticException.",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        double posInf = 1.0 / 0.0;\n        double negInf = -1.0 / 0.0;\n        double nan = 0.0 / 0.0;\n        System.out.println(posInf);\n        System.out.println(negInf);\n        System.out.println(nan);\n        System.out.println(Double.isNaN(nan));\n        System.out.println(nan == nan);\n    }\n}",
          "output": "Infinity\n-Infinity\nNaN\ntrue\nfalse",
          "explanation": "Under IEEE 754, non-zero float divided by zero yields Infinity. 0.0 / 0.0 yields NaN (Not a Number). By IEEE definition, NaN is never equal to anything, including itself."
      },
      {
          "id": "dtc-10",
          "title": "Exercise 10: Parsing Primitives vs Wrapper Instantiation",
          "difficulty": "Easy",
          "problemStatement": "Parse the string \"12345\" into a primitive `int` using `Integer.parseInt()` and into an `Integer` object using `Integer.valueOf()`. Print their types and values to demonstrate the difference.",
          "hint": "parseInt returns primitive int; valueOf returns wrapper Integer (and utilizes the cache for -128..127).",
          "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int p = Integer.parseInt(\"12345\");\n        Integer w = Integer.valueOf(\"12345\");\n        System.out.println(\"Primitive: \" + p);\n        System.out.println(\"Wrapper: \" + w);\n        System.out.println(\"Matches: \" + (p == w));\n    }\n}",
          "output": "Primitive: 12345\nWrapper: 12345\nMatches: true",
          "explanation": "Integer.parseInt() returns a primitive int without heap allocation. Integer.valueOf() returns an Integer object reference, which unboxes automatically during (p == w)."
      }
  ]
};
