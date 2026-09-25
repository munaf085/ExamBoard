import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR OPERATORS & EXPRESSIONS
// Every problem has Input Format, Output Format, Examples,
// Hints, Complete Runnable Java Solution, and Expected Output.
// ============================================================

export const operatorsExercises: Record<string, ProgrammingExercise[]> = {
  // ── 3.1 Arithmetic & Modulo Operations ──
  'arithmetic-and-modulo': [
    {
      id: 'op-arith-1',
      title: '1. Extract Last Digit & Digits Reversal with Modulo',
      problemStatement: `Write a program that takes an integer (e.g. 5824) and uses the modulo operator (%) and integer division (/) to extract its last digit and reverse all digits.

Input Format: \`int num = 5824\`
Output Format:
Original Number: 5824
Last Digit: 4
Reversed Number: 4285

Example:
Input: num = 9170
Output:
Original Number: 9170
Last Digit: 0
Reversed Number: 719`,
      hint: 'Extract the last digit via `num % 10`. Append to reversed via `rev = rev * 10 + digit`. Remove the last digit via `num /= 10`.',
      solutionCode: `public class ModuloDigitExtraction {
    public static void main(String[] args) {
        int original = 5824;
        int lastDigit = original % 10;

        int temp = original;
        int reversed = 0;
        while (temp > 0) {
            int digit = temp % 10;
            reversed = (reversed * 10) + digit;
            temp /= 10;
        }

        System.out.println("Original Number: " + original);
        System.out.println("Last Digit: " + lastDigit);
        System.out.println("Reversed Number: " + reversed);
    }
}`,
      output: `Original Number: 5824
Last Digit: 4
Reversed Number: 4285`,
      explanation: 'num % 10 returns the remainder when dividing by 10 (the rightmost decimal digit), while num / 10 drops the rightmost digit.'
    },
    {
      id: 'op-arith-2',
      title: '2. Negative Modulo Sign Rules in Java',
      problemStatement: `In Java, the sign of the result of the modulo operator (%) is ALWAYS determined by the dividend (the left-hand operand), NOT the divisor.
Write a program that computes and outputs:
1. 17 % 5
2. -17 % 5
3. 17 % -5
4. -17 % -5

Input Format: None.
Output Format:
17 % 5 = 2
-17 % 5 = -2
17 % -5 = 2
-17 % -5 = -2

Example:
Output:
17 % 5 = 2
-17 % 5 = -2
17 % -5 = 2
-17 % -5 = -2`,
      hint: 'Recall JLS: `(a / b) * b + (a % b) == a`. The sign of `a % b` always matches the sign of `a`.',
      solutionCode: `public class NegativeModuloRules {
    public static void main(String[] args) {
        System.out.println("17 % 5 = " + (17 % 5));
        System.out.println("-17 % 5 = " + (-17 % 5));
        System.out.println("17 % -5 = " + (17 % -5));
        System.out.println("-17 % -5 = " + (-17 % -5));
    }
}`,
      output: `17 % 5 = 2
-17 % 5 = -2
17 % -5 = 2
-17 % -5 = -2`,
      explanation: 'In Java, the sign of the modulo result is governed strictly by the left operand. If the left operand is negative, the remainder is negative, regardless of the sign of the right operand.'
    }
  ],

  // ── 3.2 Pre-Increment vs Post-Increment ──
  'pre-post-increment': [
    {
      id: 'op-inc-1',
      title: '1. Step-by-Step Pre vs Post Increment Tracing',
      problemStatement: `Write a program that traces the evaluation of pre-increment (++x) and post-increment (y++) in arithmetic expressions:
int a = 5;
int result1 = ++a + 10;
int b = 5;
int result2 = b++ + 10;
Print a, result1, b, and result2.

Input Format: None.
Output Format:
Pre-increment: a = 6, result1 = 16
Post-increment: b = 6, result2 = 15

Example:
Output:
Pre-increment: a = 6, result1 = 16
Post-increment: b = 6, result2 = 15`,
      hint: 'Pre-increment modifies the variable first and then returns the new value. Post-increment returns the old value for evaluation and increments afterwards.',
      solutionCode: `public class IncrementTracing {
    public static void main(String[] args) {
        int a = 5;
        int result1 = ++a + 10; // a becomes 6, 6 + 10 = 16

        int b = 5;
        int result2 = b++ + 10; // uses 5 in expr, 5 + 10 = 15, then b becomes 6

        System.out.println("Pre-increment: a = " + a + ", result1 = " + result1);
        System.out.println("Post-increment: b = " + b + ", result2 = " + result2);
    }
}`,
      output: `Pre-increment: a = 6, result1 = 16
Post-increment: b = 6, result2 = 15`,
      explanation: '`++a` updates `a` before it participates in the addition, yielding 6 + 10 = 16. `b++` yields its original value (5) for the expression first, and only updates `b` to 6 after the value is read.'
    },
    {
      id: 'op-inc-2',
      title: '2. The Infamous `x = x++` Trap',
      problemStatement: `What happens when you execute \`int x = 5; x = x++;\`?
Write a program demonstrating this classic Java interview question and explain why \`x\` remains 5.

Input Format: None.
Output Format:
Initial: x = 5
After x = x++: x = 5

Example:
Output:
Initial: x = 5
After x = x++: x = 5`,
      hint: 'Java evaluates the right side: `x++` evaluates to 5 and puts it on the operand stack. Then `x` is incremented to 6 in local memory. Finally, the assignment `=` pops 5 off the stack and overwrites `x` back to 5!',
      solutionCode: `public class PostIncrementAssignmentTrap {
    public static void main(String[] args) {
        int x = 5;
        System.out.println("Initial: x = " + x);

        x = x++; // Post-increment assignment trap!

        System.out.println("After x = x++: x = " + x);
    }
}`,
      output: `Initial: x = 5
After x = x++: x = 5`,
      explanation: 'The post-increment operator places the original value (5) on the JVM operand stack. `x` is temporarily incremented in the local variable array to 6, but the assignment operator immediately pops the 5 from the stack and overwrites `x`, resetting it to 5.'
    }
  ],

  // ── 3.3 Relational & Equality Operators ──
  'relational-equality': [
    {
      id: 'op-eq-1',
      title: '1. Primitive vs Object Reference Equality (== vs .equals())',
      problemStatement: `Write a program comparing:
1. Two primitive ints (100 == 100)
2. Two String literals ("hello" == "hello")
3. A String literal and a new String object ("hello" == new String("hello"))
4. The same two strings using .equals()

Input Format: None.
Output Format:
Primitives 100 == 100: true
Literals "hello" == "hello": true
Literal == new String(): false
Literal.equals(new String()): true

Example:
Output:
Primitives 100 == 100: true
Literals "hello" == "hello": true
Literal == new String(): false
Literal.equals(new String()): true`,
      hint: 'Primitive == checks value. Object == checks memory reference address. .equals() checks character content equality.',
      solutionCode: `public class EqualityDemonstrator {
    public static void main(String[] args) {
        int p1 = 100;
        int p2 = 100;
        System.out.println("Primitives 100 == 100: " + (p1 == p2));

        String s1 = "hello";
        String s2 = "hello";
        System.out.println("Literals \\"hello\\" == \\"hello\\": " + (s1 == s2));

        String s3 = new String("hello");
        System.out.println("Literal == new String(): " + (s1 == s3));
        System.out.println("Literal.equals(new String()): " + s1.equals(s3));
    }
}`,
      output: `Primitives 100 == 100: true
Literals "hello" == "hello": true
Literal == new String(): false
Literal.equals(new String()): true`,
      explanation: 'String literals are pooled and share the same address in memory, so `s1 == s2` is true. `new String()` allocates a distinct heap object, so `==` is false. `.equals()` inspects character-by-character content and returns true.'
    }
  ],

  // ── 3.4 Short-Circuit Evaluation ──
  'short-circuit-evaluation': [
    {
      id: 'op-sc-1',
      title: '1. Safe Null Guarding with Short-Circuit AND (&&)',
      problemStatement: `Write a program that uses short-circuit logical AND (\`&&\`) to safely inspect an object property without throwing a \`NullPointerException\`.
Contrast this with the non-short-circuit bitwise AND (\`&\`) which eagerly evaluates both sides and crashes when the reference is null.

Input Format: None.
Output Format:
With && (Safe Guard): String is null, length check safely skipped!
With &: Would throw NullPointerException because right-hand side is unconditionally evaluated.

Example:
Output:
With && (Safe Guard): String is null, length check safely skipped!
With &: Would throw NullPointerException because right-hand side is unconditionally evaluated.`,
      hint: '`if (str != null && str.length() > 5)` guarantees `str.length()` will never run if `str != null` evaluates to false.',
      solutionCode: `public class ShortCircuitGuard {
    public static void main(String[] args) {
        String str = null;

        // Safe short-circuit evaluation:
        if (str != null && str.length() > 5) {
            System.out.println("String length is greater than 5");
        } else {
            System.out.println("With && (Safe Guard): String is null, length check safely skipped!");
        }

        // Demonstration of what happens with eager &
        System.out.println("With &: Would throw NullPointerException because right-hand side is unconditionally evaluated.");
    }
}`,
      output: `With && (Safe Guard): String is null, length check safely skipped!
With &: Would throw NullPointerException because right-hand side is unconditionally evaluated.`,
      explanation: 'In Java, `&&` stops evaluating immediately if the left operand is false. This makes it ideal as a null-check guard before accessing instance methods or array lengths.'
    }
  ],

  // ── 3.5 Compound Assignment Operators ──
  'assignment-operators': [
    {
      id: 'op-assign-1',
      title: '1. Implicit Casting in Compound Assignment (+=)',
      problemStatement: `In Java, compound assignment operators automatically perform an implicit type cast:
\`x += y\` is equivalent to \`x = (type_of_x)(x + y)\`.
Demonstrate this by adding an int (5) to a short (10) using:
1. Compound assignment: \`s += 5\` (compiles seamlessly).
2. Explain why standard \`s = s + 5\` causes a compilation error without an explicit cast.

Input Format: None.
Output Format:
Initial short: 10
After s += 5: 15
Reason s = s + 5 fails: Java promotes operands to int during +, returning int which cannot be stored in short without cast.

Example:
Output:
Initial short: 10
After s += 5: 15
Reason s = s + 5 fails: Java promotes operands to int during +, returning int which cannot be stored in short without cast.`,
      hint: 'Compound operators like `+=`, `-=`, `*=`, `/=` contain a hidden type cast to the left variable\'s type.',
      solutionCode: `public class CompoundAssignmentCasting {
    public static void main(String[] args) {
        short s = 10;
        System.out.println("Initial short: " + s);

        // Compiles cleanly because s += 5 is internally s = (short)(s + 5)
        s += 5;
        System.out.println("After s += 5: " + s);

        System.out.println("Reason s = s + 5 fails: Java promotes operands to int during +, returning int which cannot be stored in short without cast.");
    }
}`,
      output: `Initial short: 10
After s += 5: 15
Reason s = s + 5 fails: Java promotes operands to int during +, returning int which cannot be stored in short without cast.`,
      explanation: 'JLS §15.26.2 states that `E1 op= E2` is equivalent to `E1 = (T)((E1) op (E2))`, where T is the type of E1. This automatic cast is why `s += 5` compiles without warning.'
    }
  ],

  // ── 3.6 The Ternary Operator ──
  'ternary-operator': [
    {
      id: 'op-tern-1',
      title: '1. Nested Ternary: Categorize Student Grade',
      problemStatement: `Write a program that uses a nested ternary expression (\`condition ? val1 : condition2 ? val2 : val3\`) to categorize a numerical score into a grade letter:
- score >= 90 -> "A"
- score >= 80 -> "B"
- score >= 70 -> "C"
- otherwise -> "F"

Input Format: \`int score = 85\`
Output Format: "Score [num] receives Grade: [letter]"

Example 1:
Input: score = 85
Output: Score 85 receives Grade: B

Example 2:
Input: score = 92
Output: Score 92 receives Grade: A`,
      hint: '`String grade = (score >= 90) ? "A" : (score >= 80) ? "B" : (score >= 70) ? "C" : "F";`',
      solutionCode: `public class TernaryGrader {
    public static void main(String[] args) {
        int score = 85;

        String grade = (score >= 90) ? "A"
                     : (score >= 80) ? "B"
                     : (score >= 70) ? "C"
                     : "F";

        System.out.println("Score " + score + " receives Grade: " + grade);
    }
}`,
      output: 'Score 85 receives Grade: B',
      explanation: 'The ternary operator (? :) returns an inline expression result. Chaining them creates concise decision trees for assigning values.'
    }
  ],

  // ── 3.7 Bitwise & Shift Operators ──
  'bitwise-shift-operators': [
    {
      id: 'op-bit-1',
      title: '1. Fast Power-of-2 Multiplication & Division via Bit Shifts',
      problemStatement: `In binary computers, shifting bits to the left (\`<<\`) multiplies by powers of 2, while arithmetic shifting to the right (\`>>\`) divides by powers of 2.
Write a Java program that:
1. Multiplies 12 by 8 using left shift \`<< 3\`
2. Divides 64 by 4 using right shift \`>> 2\`
3. Shows the bitwise representation using Integer.toBinaryString()

Input Format: None.
Output Format:
12 << 3 = 96 (12 * 8)
Binary 12: 1100 -> Binary 96: 1100000
64 >> 2 = 16 (64 / 4)
Binary 64: 1000000 -> Binary 16: 10000

Example:
Output:
12 << 3 = 96 (12 * 8)
Binary 12: 1100 -> Binary 96: 1100000
64 >> 2 = 16 (64 / 4)
Binary 64: 1000000 -> Binary 16: 10000`,
      hint: '`num << k` equals `num * (2^k)`. `num >> k` equals `num / (2^k)`.',
      solutionCode: `public class BitwiseShiftDemo {
    public static void main(String[] args) {
        int num = 12;
        int shiftedLeft = num << 3; // 12 * 2^3 = 12 * 8 = 96

        System.out.println("12 << 3 = " + shiftedLeft + " (12 * 8)");
        System.out.println("Binary 12: " + Integer.toBinaryString(num) + " -> Binary 96: " + Integer.toBinaryString(shiftedLeft));

        int divNum = 64;
        int shiftedRight = divNum >> 2; // 64 / 2^2 = 64 / 4 = 16
        System.out.println("64 >> 2 = " + shiftedRight + " (64 / 4)");
        System.out.println("Binary 64: " + Integer.toBinaryString(divNum) + " -> Binary 16: " + Integer.toBinaryString(shiftedRight));
    }
}`,
      output: `12 << 3 = 96 (12 * 8)
Binary 12: 1100 -> Binary 96: 1100000
64 >> 2 = 16 (64 / 4)
Binary 64: 1000000 -> Binary 16: 10000`,
      explanation: 'Bit shift operations execute in a single CPU clock cycle, making them the fastest method to multiply or divide integers by powers of 2.'
    }
  ],

  // ── 3.8 The `instanceof` Operator & Pattern Matching ──
  'instanceof-operator': [
    {
      id: 'op-inst-1',
      title: '1. Safe Type Inspection & Pattern Matching (Java 16+)',
      problemStatement: `Write a program that takes an \`Object obj = "Hello ExamBoard"\` and:
1. Verifies if it is an instance of \`String\` using the \`instanceof\` operator.
2. Uses modern Pattern Matching for instanceof (\`if (obj instanceof String s)\`) to print the uppercase string and length without needing a manual cast.
3. Tests \`null instanceof String\` and verifies that it safely returns false without throwing an exception.

Input Format: None.
Output Format:
Pattern Match Success: HELLO EXAMBOARD (Length: 15)
null instanceof String: false

Example:
Output:
Pattern Match Success: HELLO EXAMBOARD (Length: 15)
null instanceof String: false`,
      hint: 'In Java 16+, write `if (obj instanceof String s)` to automatically bind `s` as a typed String variable.',
      solutionCode: `public class InstanceofDemo {
    public static void main(String[] args) {
        Object obj = "Hello ExamBoard";

        // Modern Pattern Matching for instanceof
        if (obj instanceof String s) {
            System.out.println("Pattern Match Success: " + s.toUpperCase() + " (Length: " + s.length() + ")");
        }

        // Safe null handling
        Object nullRef = null;
        System.out.println("null instanceof String: " + (nullRef instanceof String));
    }
}`,
      output: `Pattern Match Success: HELLO EXAMBOARD (Length: 15)
null instanceof String: false`,
      explanation: '`instanceof` returns false whenever the target reference is null. Java 16 introduced pattern matching for instanceof, which eliminates redundant manual type casting.'
    }
  ],

  // ── 3.9 Operator Precedence & Associativity ──
  'operator-precedence': [
    {
      id: 'op-prec-1',
      title: '1. Complex Expression Precedence Tracing',
      problemStatement: `Trace and calculate the result of the following expression step by step:
\`int result = 10 + 20 * 2 > 40 && 50 / 10 == 5;\`
Print each intermediate calculation and the final boolean result.

Input Format: None.
Output Format:
Step 1 (Multiplication & Division): 20 * 2 = 40, 50 / 10 = 5
Step 2 (Addition): 10 + 40 = 50
Step 3 (Relational): 50 > 40 is true, 5 == 5 is true
Step 4 (Logical AND): true && true is true
Final Result: true

Example:
Output:
Step 1 (Multiplication & Division): 20 * 2 = 40, 50 / 10 = 5
Step 2 (Addition): 10 + 40 = 50
Step 3 (Relational): 50 > 40 is true, 5 == 5 is true
Step 4 (Logical AND): true && true is true
Final Result: true`,
      hint: 'Multiplication (*) and Division (/) take precedence over Addition (+), which takes precedence over Relational (>), then Equality (==), and finally Logical AND (&&).',
      solutionCode: `public class PrecedenceTracing {
    public static void main(String[] args) {
        int mult = 20 * 2;
        int div = 50 / 10;
        System.out.println("Step 1 (Multiplication & Division): 20 * 2 = " + mult + ", 50 / 10 = " + div);

        int sum = 10 + mult;
        System.out.println("Step 2 (Addition): 10 + " + mult + " = " + sum);

        boolean rel1 = sum > 40;
        boolean rel2 = div == 5;
        System.out.println("Step 3 (Relational): " + sum + " > 40 is " + rel1 + ", " + div + " == 5 is " + rel2);

        boolean finalResult = rel1 && rel2;
        System.out.println("Step 4 (Logical AND): " + rel1 + " && " + rel2 + " is " + finalResult);
        System.out.println("Final Result: " + finalResult);
    }
}`,
      output: `Step 1 (Multiplication & Division): 20 * 2 = 40, 50 / 10 = 5
Step 2 (Addition): 10 + 40 = 50
Step 3 (Relational): 50 > 40 is true, 5 == 5 is true
Step 4 (Logical AND): true && true is true
Final Result: true`,
      explanation: 'Java evaluates expressions according to operator precedence: Multiplicative (*, /, %) -> Additive (+, -) -> Relational (<, >, <=, >=) -> Equality (==, !=) -> Logical AND (&&).'
    }
  ]
};
