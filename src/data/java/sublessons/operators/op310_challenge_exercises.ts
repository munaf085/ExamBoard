import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 3: OPERATORS & EXPRESSIONS CAPSTONE EXERCISES (LESSON 3.10)
// Exactly 10 dedicated coding assignments
// ============================================================
export const op310_challenge_exercises: Record<string, ProgrammingExercise[]> = {
  "operators-challenge": [
    {
      "id": "opc-1",
      "title": "Exercise 1: Pre vs Post Increment Complex Pipeline Evaluation",
      "difficulty": "Easy",
      "problemStatement": "Write a Java program that initializes `int a = 10`. Compute `int res = ++a + a++ + --a + a--;`. Print the computed `res` and the final value of `a` separated by a space.",
      "hint": "Trace each term left-to-right: ++a sets a=11 and yields 11; a++ yields 11 (a becomes 12); --a sets a=11 and yields 11; a-- yields 11 (a becomes 10).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int a = 10;\n        int res = ++a + a++ + --a + a--;\n        System.out.println(res + \" \" + a);\n    }\n}",
      "output": "44 10",
      "explanation": "Term 1 (++a): a=11, yields 11. Term 2 (a++): yields 11, a=12. Term 3 (--a): a=11, yields 11. Term 4 (a--): yields 11, a=10. Total sum = 11 + 11 + 11 + 11 = 44. Final a is 10."
    },
    {
      "id": "opc-2",
      "title": "Exercise 2: Compound Assignment Silent Narrowing Audit",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate the implicit cast of compound assignment. Initialize `short s = 32767`. Execute `s += 5;`. Print the resulting short value and verify the sign inversion.",
      "hint": "Short.MAX_VALUE is 32767. Adding 5 with compound assignment causes two's complement overflow into negative range.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        short s = 32767;\n        s += 5;\n        System.out.println(\"Result: \" + s);\n    }\n}",
      "output": "Result: -32764",
      "explanation": "s += 5 is compiled as s = (short)(s + 5). 32767 + 5 = 32772. In 16-bit signed two's complement, 32772 wraps to 32772 - 65536 = -32764."
    },
    {
      "id": "opc-3",
      "title": "Exercise 3: Safe Ternary Evaluation Preventing Unboxing NPE",
      "difficulty": "Medium",
      "problemStatement": "Implement a method `public static int resolveTimeout(Integer configTimeout, int defaultTimeout)` that safely returns `configTimeout` without throwing NullPointerException when `configTimeout` is null. Demonstrate calling it with `null` and `5000`.",
      "hint": "Check `configTimeout != null` in the ternary condition before allowing unboxing to occur.",
      "solutionCode": "public class Solution {\n    public static int resolveTimeout(Integer configTimeout, int defaultTimeout) {\n        return (configTimeout != null) ? configTimeout : defaultTimeout;\n    }\n    public static void main(String[] args) {\n        System.out.println(resolveTimeout(null, 3000));\n        System.out.println(resolveTimeout(5000, 3000));\n    }\n}",
      "output": "3000\n5000",
      "explanation": "Guarding the ternary branch prevents the JVM from invoking .intValue() on a null reference when configTimeout is absent."
    },
    {
      "id": "opc-4",
      "title": "Exercise 4: Short-Circuit Logic Defending Null Dereference",
      "difficulty": "Easy",
      "problemStatement": "Create a method `public static boolean isLongString(String text)` that returns `true` if `text` is non-null AND its length is greater than 5, without ever throwing NullPointerException. Test with `null` and `\"Enterprise\"`.",
      "hint": "Use short-circuit operator && so that the right operand (text.length()) never executes if text is null.",
      "solutionCode": "public class Solution {\n    public static boolean isLongString(String text) {\n        return text != null && text.length() > 5;\n    }\n    public static void main(String[] args) {\n        System.out.println(isLongString(null));\n        System.out.println(isLongString(\"Enterprise\"));\n    }\n}",
      "output": "false\ntrue",
      "explanation": "When text is null, text != null evaluates to false. Short-circuit && bypasses text.length() > 5, preventing NullPointerException."
    },
    {
      "id": "opc-5",
      "title": "Exercise 5: Bitwise Flag Permission Masking System",
      "difficulty": "Medium",
      "problemStatement": "Implement a Unix-style permission checker using bit flags. Define `READ = 4` (100), `WRITE = 2` (010), `EXECUTE = 1` (001). Given `int userPerms = READ | EXECUTE;`, print whether the user has `READ`, `WRITE`, and `EXECUTE` permissions using bitwise AND (`&`).",
      "hint": "Check permission with (userPerms & PERM) != 0.",
      "solutionCode": "public class Solution {\n    public static final int READ = 4;\n    public static final int WRITE = 2;\n    public static final int EXECUTE = 1;\n    public static void main(String[] args) {\n        int userPerms = READ | EXECUTE;\n        System.out.println(\"Read: \" + ((userPerms & READ) != 0));\n        System.out.println(\"Write: \" + ((userPerms & WRITE) != 0));\n        System.out.println(\"Execute: \" + ((userPerms & EXECUTE) != 0));\n    }\n}",
      "output": "Read: true\nWrite: false\nExecute: true",
      "explanation": "Bitwise OR combines permissions: 4 | 1 = 5 (binary 101). Bitwise AND isolates individual bits: (5 & 4) != 0 is true; (5 & 2) != 0 is false."
    },
    {
      "id": "opc-6",
      "title": "Exercise 6: Unsigned Midpoint Computation via Logical Shift",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate why binary search implementations use `(low + high) >>> 1` instead of `(low + high) / 2`. Set `int low = 1_000_000_000` and `int high = 2_000_000_000`. Compute and print the midpoint using both formulas.",
      "hint": "low + high overflows to a negative integer. Arithmetic / 2 yields a negative number, while >>> 1 yields the correct positive midpoint.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int low = 1_000_000_000;\n        int high = 2_000_000_000;\n        int buggyMid = (low + high) / 2;\n        int safeMid = (low + high) >>> 1;\n        System.out.println(\"Buggy: \" + buggyMid);\n        System.out.println(\"Safe: \" + safeMid);\n    }\n}",
      "output": "Buggy: -647483648\nSafe: 1500000000",
      "explanation": "1_000_000_000 + 2_000_000_000 = 3_000_000_000, which overflows 32-bit signed int to -1_294_967_296. Dividing by 2 yields -647_483_648. Using >>> 1 treats the sign bit as numeric value 2^31, producing 1_500_000_000."
    },
    {
      "id": "opc-7",
      "title": "Exercise 7: Operator Precedence Parenthesization Enforcer",
      "difficulty": "Easy",
      "problemStatement": "Write a program demonstrating the precedence difference between arithmetic and shift operators. Print the result of `1 << 2 + 3` and the parenthesized `(1 << 2) + 3`.",
      "hint": "+ has higher precedence than <<, so 1 << 2 + 3 parses as 1 << (2 + 3).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int unparenthesized = 1 << 2 + 3;\n        int parenthesized = (1 << 2) + 3;\n        System.out.println(\"Unparenthesized: \" + unparenthesized);\n        System.out.println(\"Parenthesized: \" + parenthesized);\n    }\n}",
      "output": "Unparenthesized: 32\nParenthesized: 7",
      "explanation": "+ binds tighter than <<. In 1 << 2 + 3, the addition 2 + 3 = 5 occurs first, yielding 1 << 5 = 32. In (1 << 2) + 3, shift 1 << 2 = 4 occurs first, yielding 4 + 3 = 7."
    },
    {
      "id": "opc-8",
      "title": "Exercise 8: Pattern Matching Instanceof Safe Type Dispatcher",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static String inspect(Object obj)` using pattern matching for `instanceof`. If `obj` is a `String`, return \"String: \" + length. If `obj` is an `Integer`, return \"Integer: \" + squared value. Otherwise return \"Unknown\". Test with \"Code\", 7, and 3.14.",
      "hint": "Use `if (obj instanceof String s)` and `else if (obj instanceof Integer i)`.",
      "solutionCode": "public class Solution {\n    public static String inspect(Object obj) {\n        if (obj instanceof String s) {\n            return \"String: \" + s.length();\n        } else if (obj instanceof Integer i) {\n            return \"Integer: \" + (i * i);\n        }\n        return \"Unknown\";\n    }\n    public static void main(String[] args) {\n        System.out.println(inspect(\"Code\"));\n        System.out.println(inspect(7));\n        System.out.println(inspect(3.14));\n    }\n}",
      "output": "String: 4\nInteger: 49\nUnknown",
      "explanation": "Pattern matching for instanceof binds the scoped variables s and i with automatic casting upon successful type matching."
    },
    {
      "id": "opc-9",
      "title": "Exercise 9: In-Place XOR Swapping Algorithm",
      "difficulty": "Easy",
      "problemStatement": "Swap two integer variables `int x = 42; int y = 99;` without using any auxiliary or temporary variable using bitwise XOR (`^`). Print the swapped values.",
      "hint": "Apply x = x ^ y; y = x ^ y; x = x ^ y; sequentially.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int x = 42;\n        int y = 99;\n        x = x ^ y;\n        y = x ^ y;\n        x = x ^ y;\n        System.out.println(\"x: \" + x + \", y: \" + y);\n    }\n}",
      "output": "x: 99, y: 42",
      "explanation": "XOR truth table property: (A ^ B) ^ B = A, and (A ^ B) ^ A = B. This achieves in-place swapping with zero heap or stack memory allocation."
    },
    {
      "id": "opc-10",
      "title": "Exercise 10: Binary Numeric Promotion in Mixed Type Expression",
      "difficulty": "Medium",
      "problemStatement": "Declare `byte b = 10; char c = 'A'; short s = 20; int i = 50; float f = 2.5f; double d = 0.5;`. Calculate `double result = (f * b) + (i / c) - (d * s);`. Print the computed result and explain the type promotions.",
      "hint": "Subexpression f * b promotes to float. i / c promotes to int. d * s promotes to double. The overall expression evaluates to double.",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        byte b = 10;\n        char c = 'A'; // Unicode 65\n        short s = 20;\n        int i = 50;\n        float f = 2.5f;\n        double d = 0.5;\n        double result = (f * b) + (i / c) - (d * s);\n        System.out.println(\"Result: \" + result);\n    }\n}",
      "output": "Result: 15.0",
      "explanation": "f * b = 2.5f * 10 = 25.0f. i / c = 50 / 65 = 0 (integer division). d * s = 0.5 * 20 = 10.0. 25.0f + 0 - 10.0 = 15.0 (promoted to double)."
    }
  ]
};
