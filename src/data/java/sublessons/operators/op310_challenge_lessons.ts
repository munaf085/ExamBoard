import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 3: OPERATORS & EXPRESSIONS CAPSTONE (LESSON 3.10)
// ============================================================
export const op310_challenge_lessons: Record<string, DetailedLesson> = {
  "operators-challenge": {
    "id": "operators-challenge",
    "moduleId": "java-operators",
    "moduleTitle": "3. Operators & Expressions",
    "lessonNumber": "Lesson 3.10",
    "title": "Module 3 Challenge & Interview Assessment",
    "subtitle": "Comprehensive technical assessment: increment/decrement side-effects, short-circuit evaluation, compound cast traps, ternary unboxing NPEs, bitmasks, pattern matching instanceof, and operator precedence",
    "estimatedMinutes": 25,
    "beginnerAnalogy": "In the Java Language Specification (JLS §§15.14 - 15.26), operators are fundamental syntactic tokens that direct the Java Virtual Machine to compute transformations, evaluations, and assignments upon one, two, or three operands. Operators establish strict semantic contracts regarding evaluation order, operand promotion, and side-effect sequencing. Unlike languages such as C or C++, Java guarantees strictly left-to-right evaluation of expressions and subexpressions regardless of operator precedence, prohibiting undefined behavior and compiler-dependent reordering.\n\nAt the JVM execution layer, operators map directly to concrete instruction sequences inside stack frames. Pre-increment (++i) on a local variable executes iinc directly within the Local Variable Array before pushing the modified value onto the operand stack via iload. Conversely, post-increment (i++) executes iload first—pushing the original value onto the operand stack—before executing iinc to modify the local variable, causing subsequent stack consumption to utilize the stale pre-incremented value. Compound assignments (b += 5) emit implicit narrowing conversion opcodes (i2b) synthesized by javac, bypassing compile-time type safety. Logical short-circuit operators (&&, ||) emit conditional jump instructions (ifeq, ifne) that branch around subsequent bytecodes, fundamentally preventing downstream stack evaluation.\n\nIn enterprise and mission-critical engineering, operator mastery is essential for high-throughput concurrency, protocol serialization, and defensive defect prevention. Subtle misunderstandings—such as relying on silent compound truncation, evaluating expressions with unboxed ternary operands leading to fatal runtime NullPointerExceptions, or misapplying signed shift (>>) instead of logical zero-fill shift (>>>) in cryptographic bitmasks—lead to silent data corruption and catastrophic service degradation. Engineering robust systems demands uncompromising precision regarding JLS type promotion, stack evaluation mechanics, and boolean branching guarantees.",
    "coreExplanation": [
      "JLS Evaluation Order vs Precedence: Operator precedence dictates how operand tokens group syntactically into subexpressions, but operand expressions themselves are evaluated strictly left-to-right. In `a() + b() * c()`, method `a()` executes first, then `b()`, then `c()`, after which the multiplication and addition execute per mathematical precedence.",
      "Bytecode Anatomy of Increment Operators: The `iinc <slot> <const>` instruction operates directly upon local variable array registers without operand stack roundtrips. In post-increment `int y = x++`, bytecode sequence is `iload_1` (push original x) -> `iinc 1, 1` (increment x in register) -> `istore_2` (store original value into y). In pre-increment `int y = ++x`, sequence is `iinc 1, 1` (increment x) -> `iload_1` (push updated x) -> `istore_2` (store updated into y).",
      "Compound Assignment Implicit Narrowing: Per JLS §15.26.2, compound assignment `E1 op= E2` is equivalent to `E1 = (T)((E1) op (E2))`, where `T` is the type of `E1`. When `byte b = 120; b += 10;` executes, javac emits `(byte)(b + 10)`, wrapping to -126 without compile-time error. In contrast, `b = b + 10;` generates a compiler type mismatch because `b + 10` produces a 32-bit `int`.",
      "Ternary Operator Binary Numeric Promotion & Unboxing: The conditional operator `? :` determines its result type at compile time per JLS §15.25. If one operand is primitive `int` and the other is wrapper `Double`, both operands are widened to `double`. If one branch is a null `Integer` and the other is primitive `int`, the runtime unboxes the null reference to evaluate the expression, throwing an unexpected `NullPointerException`.",
      "Short-Circuit Evaluation Execution Guarantees: Logical `&&` and `||` short-circuit: if the left operand determines the outcome (`false` for `&&`, `true` for `||`), the right operand is completely bypassed at runtime. This provides null-safety guards: `if (user != null && user.isActive())`. In contrast, bitwise `&` and `|` evaluate both operands unconditionally, triggering `NullPointerException` if used for null-guarding.",
      "Bitwise vs Logical Bit Shift Mechanics: `>>` performs arithmetic right shift, preserving the sign bit by sign-extending the most significant bit. `>>>` performs logical right shift, shifting in zeros regardless of sign. In 32-bit signed integers, `-8 >> 2` results in `-2`, whereas `-8 >>> 2` results in `1073741822`.",
      "Relational Equality (`==`) vs Reference Identity: For primitive operands, `==` compares raw binary bit representations. For reference types, `==` checks reference address identity (heap pointer equality), not deep content equality. Content comparison requires overriding and invoking `.equals()`.",
      "Modern Pattern Matching for instanceof (Java 16+ JLS §14.30): Eliminates tedious and unsafe boilerplate casts. `if (obj instanceof String s)` evaluates whether `obj` is non-null and assignable to `String`; if true, it automatically casts and binds `s` in the conditional scope. The variable `s` is subject to flow scoping and is accessible within the `if` block and in guarded expressions like `if (obj instanceof String s && s.length() > 5)`."
    ],
    "codeSnippet": {
      "title": "Comprehensive Operator Traps & Bytecode Realities",
      "code": "public class OperatorMastery {\n    public static void main(String[] args) {\n        // 1. Post vs Pre-Increment Pipeline\n        int a = 5;\n        int result = a++ + ++a * a--;\n        // Evaluation: 5 + (7 * 7) = 5 + 49 = 54; final a = 6\n        System.out.println(\"result: \" + result + \", a: \" + a);\n\n        // 2. Compound Assignment Silent Cast\n        byte b = 127;\n        b += 3; // (byte)(127 + 3) = -126\n        System.out.println(\"byte overflow: \" + b);\n\n        // 3. Ternary Unboxing NPE Safeguard\n        Integer score = null;\n        int defaultVal = 0;\n        int safeScore = (score != null) ? score : defaultVal;\n        System.out.println(\"safeScore: \" + safeScore);\n\n        // 4. Pattern Matching with instanceof\n        Object message = \"Enterprise Java\";\n        if (message instanceof String s && s.startsWith(\"Enterprise\")) {\n            System.out.println(\"Matched String of length: \" + s.length());\n        }\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "int result = a++ + ++a * a--;",
          "explanation": "Left-to-right evaluation: a++ pushes 5 (a becomes 6); ++a increments a to 7 and pushes 7; a-- pushes 7 (a becomes 6). Multiplication 7 * 7 = 49 has precedence, then 5 + 49 = 54."
        },
        {
          "line": "b += 3;",
          "explanation": "javac expands this to b = (byte)(b + 3). 130 wraps around 8-bit two's complement to -126."
        },
        {
          "line": "int safeScore = (score != null) ? score : defaultVal;",
          "explanation": "Explicit null check prevents the JVM from invoking .intValue() on a null reference during unboxing."
        },
        {
          "line": "if (message instanceof String s && s.startsWith(\"Enterprise\"))",
          "explanation": "Java 16+ pattern matching checks type and binds variable s, safely evaluated with short-circuit && guard."
        }
      ],
      "output": "result: 54, a: 6\nbyte overflow: -126\nsafeScore: 0\nMatched String of length: 15"
    },
    "beginnerMistakes": [
      {
        "mistake": "Assuming operator precedence dictates evaluation order of operands.",
        "whyItHappens": "Developers confuse syntactic grouping precedence with runtime execution sequence.",
        "howToFix": "Recognize that Java evaluates expression operands strictly left-to-right before applying operator precedence to combine the evaluated results.",
        "codeSnippet": "// In a() + b() * c(), a() runs FIRST, b() runs SECOND, c() runs THIRD.\n// Then b() * c() is computed, and added to a()."
      },
      {
        "mistake": "Using bitwise '&' instead of short-circuit '&&' for null check guards.",
        "whyItHappens": "Assuming '&' and '&&' behave identically for boolean conditions.",
        "howToFix": "Always use '&&' and '||' for conditional control flow to ensure short-circuit evaluation prevents NullPointerException.",
        "codeSnippet": "// WRONG: if (obj != null & obj.isValid()) -> throws NPE if obj is null!\n// CORRECT: if (obj != null && obj.isValid()) -> safely short-circuits."
      },
      {
        "mistake": "Unintentional unboxing NullPointerException inside ternary operator.",
        "whyItHappens": "Mixing wrapper types and primitive literals causes the compiler to auto-unbox the wrapper operand.",
        "howToFix": "Ensure both branches of the ternary operator evaluate to consistent reference types or verify nullity before unboxing.",
        "codeSnippet": "Integer val = null;\n// Throws NullPointerException at runtime due to unboxing to primitive int:\nint num = (condition) ? val : 0;"
      },
      {
        "mistake": "Misunderstanding bitwise shift precedence relative to arithmetic operators.",
        "whyItHappens": "Assuming bit shifts have higher precedence than addition or subtraction.",
        "howToFix": "Arithmetic operators (+, -) have higher precedence than shift operators (<<, >>, >>>). Always use explicit parentheses.",
        "codeSnippet": "// WRONG: int x = 1 << 2 + 1; // Evaluates as 1 << (2 + 1) = 8, not (1 << 2) + 1 = 5!\n// CORRECT: int x = (1 << 2) + 1;"
      }
    ],
    "cheatSheet": {
      "summary": "Module 3 Operators & Expressions Technical Reference",
      "rules": [
        {
          "rule": "Left-to-Right Evaluation Order",
          "explanation": "JLS §15.7 mandates strictly left-to-right evaluation of expression operands regardless of operator precedence."
        },
        {
          "rule": "Post-Increment Bytecode Execution",
          "explanation": "Post-increment pushes the old value to the operand stack before modifying the local variable array slot via iinc."
        },
        {
          "rule": "Compound Assignment Implicit Narrowing",
          "explanation": "E1 op= E2 synthesizes an explicit cast (T)(E1 op E2), hiding potential arithmetic overflow and truncation."
        },
        {
          "rule": "Ternary Type Promotion & Unboxing",
          "explanation": "Mixed primitive and wrapper operands in ? : cause mandatory unboxing and numeric promotion, risking NullPointerException."
        },
        {
          "rule": "Logical Short-Circuit Branching",
          "explanation": "&& and || emit conditional branches in bytecode, skipping the evaluation of the right operand if the left operand determines the outcome."
        },
        {
          "rule": "Arithmetic vs Logical Right Shift",
          "explanation": ">> sign-extends with the high-order bit; >>> fills vacated high-order positions with zeros."
        },
        {
          "rule": "Relational Equality vs Identity",
          "explanation": "== tests bitwise equality for primitives and pointer memory addresses for references."
        },
        {
          "rule": "Pattern Matching instanceof Flow Scoping",
          "explanation": "Binding variables introduced by instanceof pattern matching are in scope wherever the compiler proves the pattern has matched."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Short-Circuiting",
          "optionA": "&& and || skip right operand if left determines result",
          "optionB": "& and | unconditionally evaluate both operands"
        },
        {
          "aspect": "Right Shift Semantics",
          "optionA": ">> preserves sign bit (arithmetic shift)",
          "optionB": ">>> inserts zeros in high bits (logical unsigned shift)"
        },
        {
          "aspect": "Increment Timing",
          "optionA": "++i increments register before pushing to operand stack",
          "optionB": "i++ pushes register to operand stack before incrementing"
        },
        {
          "aspect": "Type Safety",
          "optionA": "b = b + 1 enforces compile-time type checking",
          "optionB": "b += 1 silently injects narrowing cast (byte)(b + 1)"
        },
        {
          "aspect": "Equality Evaluation",
          "optionA": "== checks memory reference identity for objects",
          "optionB": ".equals() evaluates semantic state equality"
        }
      ]
    },
    "practiceProblems": [
      {
        "title": "Puzzle 1: Pre vs Post Increment Complex Pipeline",
        "problemStatement": "Analyze the execution order and determine the exact output printed by this program:",
        "code": "public class Problem1 {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = a++ + ++a * a--;\n        System.out.println(b + \" \" + a);\n    }\n}",
        "options": [
          "54 6",
          "54 5",
          "49 6",
          "56 6"
        ],
        "correctOptionIndex": 0,
        "hint": "Evaluate left to right: first a++ evaluates to 5 (a becomes 6), then ++a increments a to 7 and evaluates to 7, then a-- evaluates to 7 (a becomes 6). Compute 5 + (7 * 7).",
        "solution": "Output: 54 6",
        "explanation": "Left to right: a++ yields 5, a=6. ++a sets a=7 and yields 7. a-- yields 7, a=6. Multiplication 7 * 7 = 49 has precedence. 5 + 49 = 54. Final value of a is 6."
      },
      {
        "title": "Puzzle 2: Short-Circuit Operand Skipping",
        "problemStatement": "What is the console output of this code snippet involving short-circuit evaluation?",
        "code": "public class Problem2 {\n    public static void main(String[] args) {\n        int x = 10, y = 20;\n        boolean res = (x++ > 15) && (++y > 20);\n        System.out.println(res + \" \" + x + \" \" + y);\n    }\n}",
        "options": [
          "false 11 20",
          "false 11 21",
          "false 10 20",
          "true 11 21"
        ],
        "correctOptionIndex": 0,
        "hint": "In (x++ > 15), x is 10 during comparison, which evaluates to false. Does the right operand of && execute?",
        "solution": "Output: false 11 20",
        "explanation": "x++ evaluates to 10 > 15 (false), and increments x to 11. Because the left side of && is false, short-circuiting skips (++y > 20) entirely. y remains 20."
      },
      {
        "title": "Puzzle 3: Compound Assignment Narrowing Wrap",
        "problemStatement": "Determine the output produced by the compound assignment on a signed byte variable:",
        "code": "public class Problem3 {\n    public static void main(String[] args) {\n        byte b = 127;\n        b += 2;\n        System.out.println(b);\n    }\n}",
        "options": [
          "-127",
          "129",
          "Compile Error",
          "-128"
        ],
        "correctOptionIndex": 0,
        "hint": "b += 2 compiles to (byte)(b + 2). 127 + 2 = 129. How does 129 project into an 8-bit signed two's complement byte?",
        "solution": "Output: -127",
        "explanation": "b += 2 is translated by javac to (byte)(b + 2). 129 in binary is 10000001, which represents -127 in 8-bit signed two's complement."
      },
      {
        "title": "Puzzle 4: Ternary Unboxing NullPointerException",
        "problemStatement": "What happens when executing the following ternary expression?",
        "code": "public class Problem4 {\n    public static void main(String[] args) {\n        Integer val = null;\n        boolean flag = true;\n        int res = flag ? val : 0;\n        System.out.println(res);\n    }\n}",
        "options": [
          "Throws NullPointerException at runtime",
          "Prints 0",
          "Prints null",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Because the third operand (0) is a primitive int, the conditional operator promotes the return type to primitive int, forcing automatic unboxing of val.",
        "solution": "Output: Exception in thread \"main\" java.lang.NullPointerException",
        "explanation": "Per JLS §15.25, when one operand is Integer and the other is primitive int, the result type is primitive int. The JVM unboxes val via val.intValue(), which throws NullPointerException because val is null."
      },
      {
        "title": "Puzzle 5: Ternary Numeric Type Widening",
        "problemStatement": "What is the console output of this code snippet?",
        "code": "public class Problem5 {\n    public static void main(String[] args) {\n        boolean condition = true;\n        System.out.println(condition ? 1 : 2.0);\n    }\n}",
        "options": [
          "1.0",
          "1",
          "2.0",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "When an int literal and a double literal are operands of the ternary operator, numeric promotion rules apply.",
        "solution": "Output: 1.0",
        "explanation": "Per JLS §15.25, the conditional operator applies binary numeric promotion to its second and third operands. Since double is broader than int, the entire expression evaluates to type double, printing 1.0."
      },
      {
        "title": "Puzzle 6: Logical Right Shift on Negative Integer",
        "problemStatement": "What does the following bitwise logical right shift expression evaluate to?",
        "code": "public class Problem6 {\n    public static void main(String[] args) {\n        int val = -1;\n        System.out.println(val >>> 31);\n    }\n}",
        "options": [
          "1",
          "-1",
          "0",
          "2147483647"
        ],
        "correctOptionIndex": 0,
        "hint": "-1 in 32-bit two's complement is 0xFFFFFFFF (all 32 bits set to 1). What happens when shifted right logically by 31 bits?",
        "solution": "Output: 1",
        "explanation": "-1 in 32-bit binary is 11111111 11111111 11111111 11111111. Logical right shift (>>>) fills vacated high bits with 0. Shifting right by 31 positions leaves a single 1 in the least significant bit: 00000000 ... 00000001 = 1."
      },
      {
        "title": "Puzzle 7: String Concatenation vs Arithmetic Precedence",
        "problemStatement": "Determine the exact output produced by this chained concatenation statement:",
        "code": "public class Problem7 {\n    public static void main(String[] args) {\n        System.out.println(10 + 20 + \"Java\" + 30 + 40);\n    }\n}",
        "options": [
          "30Java3040",
          "30Java70",
          "1020Java3040",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "+ operator is left-associative. Evaluate subexpressions from left to right: integer addition first, then string concatenation.",
        "solution": "Output: 30Java3040",
        "explanation": "Left-to-right evaluation: 10 + 20 evaluates to integer 30. 30 + \"Java\" evaluates to String \"30Java\". \"30Java\" + 30 evaluates to \"30Java30\". \"30Java30\" + 40 evaluates to \"30Java3040\"."
      },
      {
        "title": "Puzzle 8: Bitwise AND vs Relational Equality Precedence",
        "problemStatement": "What is the result of attempting to compile and execute the following line?",
        "code": "public class Problem8 {\n    public static void main(String[] args) {\n        int mask = 5;\n        // Attention to operator precedence\n        boolean isOdd = mask & 1 == 1;\n        System.out.println(isOdd);\n    }\n}",
        "options": [
          "Compile Error: operator & cannot be applied to int and boolean",
          "Prints true",
          "Prints false",
          "Prints 1"
        ],
        "correctOptionIndex": 0,
        "hint": "Equality operator (==) has higher precedence than bitwise AND (&). How does the compiler parse the expression?",
        "solution": "Output: Compile Error",
        "explanation": "Because == has higher precedence than &, the expression is parsed as mask & (1 == 1), which attempts to evaluate mask & true. In Java, bitwise & cannot combine int and boolean, resulting in a compile-time error."
      },
      {
        "title": "Puzzle 9: Bitwise XOR In-Place Variable Swap",
        "problemStatement": "What are the values of x and y after the following three XOR operations?",
        "code": "public class Problem9 {\n    public static void main(String[] args) {\n        int x = 15, y = 25;\n        x = x ^ y;\n        y = x ^ y;\n        x = x ^ y;\n        System.out.println(x + \" \" + y);\n    }\n}",
        "options": [
          "25 15",
          "15 25",
          "0 0",
          "40 10"
        ],
        "correctOptionIndex": 0,
        "hint": "XORing a value with another value twice restores the original value. Trace each step.",
        "solution": "Output: 25 15",
        "explanation": "Step 1: x = x ^ y. Step 2: y = (x ^ y) ^ y = x (y now holds 15). Step 3: x = (x ^ y) ^ x = y (x now holds 25). The values are swapped without auxiliary memory."
      },
      {
        "title": "Puzzle 10: Pattern Matching Scope Invariance",
        "problemStatement": "What is printed by the following code utilizing pattern matching for instanceof?",
        "code": "public class Problem10 {\n    public static void main(String[] args) {\n        Object obj = \"Mastery\";\n        if (obj instanceof String s && s.length() == 7) {\n            System.out.println(\"Match: \" + s.toUpperCase());\n        } else {\n            System.out.println(\"No Match\");\n        }\n    }\n}",
        "options": [
          "Match: MASTERY",
          "No Match",
          "Compile Error: s cannot be referenced",
          "NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "In Java 16+, pattern matching binds variable s if the pattern succeeds. Under &&, s is in scope for the second operand.",
        "solution": "Output: Match: MASTERY",
        "explanation": "obj is indeed a String of length 7. Pattern matching binds s, which is in scope for the right-hand operand of && and inside the true branch of the if statement."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-310-1",
        "question": "Which bytecode instruction performs in-place increment on a local variable without utilizing the operand stack?",
        "options": [
          "iinc",
          "iadd",
          "iload",
          "istore"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`iinc` directly modifies the integer value residing in the specified local variable array slot without pushing operands onto the operand stack."
      },
      {
        "id": "mq-310-2",
        "question": "What is the evaluated result of `byte b = 120; b += 10;` in Java?",
        "options": [
          "-126",
          "130",
          "Compile Error: incompatible types",
          "ArithmeticException: overflow"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Compound assignment injects an implicit narrowing cast: `(byte)(120 + 10)`. In 8-bit two's complement, 130 wraps around to -126."
      },
      {
        "id": "mq-310-3",
        "question": "Why does `Integer x = null; int y = true ? x : 0;` throw a `NullPointerException` at runtime?",
        "options": [
          "Because one branch is a primitive int, forcing automatic unboxing of the null Integer reference",
          "Because ternary operator conditions cannot evaluate wrapper objects",
          "Because true cannot be assigned to an Integer",
          "Because the JVM cannot allocate memory for y"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §15.25, mixed primitive and wrapper operands promote the expression type to primitive int, requiring the JVM to invoke `.intValue()` on `x`."
      },
      {
        "id": "mq-310-4",
        "question": "In the expression `methodA() + methodB() * methodC()`, which method is executed first by the JVM?",
        "options": [
          "methodA()",
          "methodB()",
          "methodC()",
          "The order is undefined and JVM implementation dependent"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §15.7, Java strictly guarantees left-to-right evaluation of expression operands before applying operator precedence to combine the results."
      },
      {
        "id": "mq-310-5",
        "question": "What is the difference between the operators `>>` and `>>>`?",
        "options": [
          "`>>` is arithmetic right shift (preserves sign bit); `>>>` is logical right shift (zero-fills high bits)",
          "`>>>` is arithmetic right shift; `>>` is logical right shift",
          "`>>` works on floats; `>>>` works on integers",
          "There is no difference; they are interchangeable aliases"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`>>` replicates the most significant bit (sign extension), whereas `>>>` always shifts in zeros from the left regardless of the sign."
      },
      {
        "id": "mq-310-6",
        "question": "Which of the following statements regarding the logical operators `&&` and `&` is accurate?",
        "options": [
          "`&&` short-circuits and skips the right operand if the left operand is false; `&` always evaluates both operands",
          "`&` short-circuits while `&&` does not",
          "`&&` can be applied to integer bitmasks",
          "`&` throws a compile error when applied to boolean values"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`&&` performs short-circuit evaluation, skipping the right operand if the left is false. `&` evaluates both operands unconditionally."
      },
      {
        "id": "mq-310-7",
        "question": "What occurs when compiling `short a = 5; short b = 10; short c = a + b;`?",
        "options": [
          "Compile error: binary `+` promotes short operands to int, returning an int that cannot be implicitly assigned to short",
          "Compiles cleanly and assigns 15 to c",
          "Throws an ArithmeticException at runtime",
          "Compiles cleanly only if a and b are marked final"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS binary numeric promotion rules, arithmetic operators on byte and short promote both operands to int. The resulting int requires an explicit cast."
      },
      {
        "id": "mq-310-8",
        "question": "What is the evaluated output of `System.out.println(1.0 / 0.0)` in Java?",
        "options": [
          "Infinity",
          "ArithmeticException: / by zero",
          "NaN",
          "0.0"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Under IEEE 754 floating-point standards implemented by Java, dividing a positive floating-point number by zero yields `Infinity` without throwing an exception."
      },
      {
        "id": "mq-310-9",
        "question": "What is the output of `System.out.println(Double.NaN == Double.NaN)`?",
        "options": [
          "false",
          "true",
          "Compile Error",
          "NullPointerException"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per IEEE 754 and JLS §15.21.1, the value NaN is not equal to any value, including itself. `Double.isNaN()` must be used instead."
      },
      {
        "id": "mq-310-10",
        "question": "Which operator possesses higher precedence: relational equality (`==`) or bitwise AND (`&`)?",
        "options": [
          "Relational equality (`==`) has higher precedence than bitwise AND (`&`)",
          "Bitwise AND (`&`) has higher precedence than relational equality (`==`)",
          "They possess identical precedence and evaluate left to right",
          "Bitwise AND has precedence only in conditional statements"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Equality operators (`==`, `!=`) have higher precedence than bitwise operators (`&`, `^`, `|`). Thus `a & 1 == 0` evaluates as `a & (1 == 0)`."
      },
      {
        "id": "mq-310-11",
        "question": "Can the bitwise complement operator `~` be applied to a boolean operand?",
        "options": [
          "No, `~` is strictly applicable to integer types; `!` is used for booleans",
          "Yes, it inverts true to false and false to true",
          "Yes, it converts boolean to integer 0 or -1",
          "Yes, but only when wrapped in parentheses"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "The unary bitwise complement operator `~` is restricted to integral primitive types (byte, short, char, int, long). Boolean logical negation is performed via `!`."
      },
      {
        "id": "mq-310-12",
        "question": "In Java 16+ pattern matching for `instanceof`, what is the scope of the pattern variable `s` in `if (obj instanceof String s)`?",
        "options": [
          "Flow-scoped: available in the true branch and wherever the compiler proves the condition holds",
          "Globally scoped to the entire enclosing method",
          "Scoped strictly to the condition expression parentheses",
          "Scoped to both true and false branches"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Pattern variables are flow-scoped per JLS §14.30. They are introduced into scope wherever the pattern is proven true by definite assignment analysis."
      },
      {
        "id": "mq-310-13",
        "question": "Given `int a = 1; int b = a++ + a;`, what is the final value assigned to `b`?",
        "options": [
          "3",
          "2",
          "4",
          "1"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Left-to-right evaluation: `a++` yields 1 and increments `a` to 2. Then the second operand `a` evaluates to 2. 1 + 2 = 3."
      },
      {
        "id": "mq-310-14",
        "question": "What is the result of evaluating `false || true && false`?",
        "options": [
          "false",
          "true",
          "Compile Error",
          "Undefined behavior"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Logical AND (`&&`) has higher precedence than logical OR (`||`). The expression groups as `false || (true && false)` -> `false || false` -> `false`."
      },
      {
        "id": "mq-310-15",
        "question": "What is the result of `1 << 32` for a 32-bit integer in Java?",
        "options": [
          "1",
          "0",
          "4294967296",
          "ArithmeticException"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §15.19, for a 32-bit int, only the lowest 5 bits of the shift distance are used (`shift % 32`). `32 % 32 = 0`, so `1 << 0 = 1`."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the exact execution and bytecode difference between post-increment (`i++`) and pre-increment (`++i`).",
        "expectedAnswer": "Both operators modify a local variable directly using the `iinc` bytecode instruction. The difference lies in when the value is pushed to the operand stack. In pre-increment (`++i`), `iinc` executes first, and then `iload` pushes the newly updated value onto the operand stack. In post-increment (`i++`), `iload` pushes the original, pre-incremented value onto the operand stack first, and subsequently `iinc` modifies the variable in the local variable array. Any immediate expression consumption uses the operand stack value.",
        "followUp": "What happens when you execute `i = i++;` in Java?",
        "followUpAnswer": "`i` remains unchanged. The original value of `i` is pushed onto the operand stack. Then `iinc` increments the local variable `i` by 1. Finally, `istore` pops the original value from the operand stack and writes it back into `i`, overwriting the incremented value.",
        "commonMistake": "Believing `++i` is substantially more efficient than `i++` for primitives in Java.",
        "commonMistakeAnswer": "In C++, post-increment on heavy objects creates temporary copy instances, but in Java, primitive increments translate to identical `iinc` instructions with identical memory footprint.",
        "keyPhrases": [
          "iinc instruction",
          "operand stack push timing",
          "local variable array register",
          "iload and istore sequencing"
        ]
      },
      {
        "question": "Why does `byte b = 1; b += 1;` compile successfully, but `byte b = 1; b = b + 1;` fails with a compilation error?",
        "expectedAnswer": "Per JLS §5.6.2, binary arithmetic operators (`+`, `-`, `*`, `/`) apply binary numeric promotion, automatically widening `byte`, `short`, and `char` operands to 32-bit `int`. Therefore, `b + 1` evaluates to type `int`. In `b = b + 1;`, assigning a 32-bit `int` to an 8-bit `byte` requires an explicit narrowing cast, causing a compile error. Conversely, compound assignment operators (`E1 op= E2`) implicitly inject a cast per JLS §15.26.2, expanding to `b = (byte)(b + 1)`.",
        "followUp": "What architectural hazard does this implicit cast in compound assignments introduce?",
        "followUpAnswer": "It hides potential arithmetic overflow and data truncation bugs. If `b` is 127, `b += 1` silently wraps around to -128 without any compile-time warning or runtime exception.",
        "commonMistake": "Believing compound assignment executes faster arithmetic at the hardware level.",
        "commonMistakeAnswer": "The bytecode is virtually identical; javac simply synthesizes an `i2b` narrowing instruction behind the scenes.",
        "keyPhrases": [
          "binary numeric promotion",
          "implicit narrowing cast (i2b)",
          "JLS §15.26.2 compound assignment rule",
          "silent arithmetic overflow"
        ]
      },
      {
        "question": "How does the ternary operator handle unboxing and type promotion, and what critical runtime exception does it frequently cause?",
        "expectedAnswer": "Per JLS §15.25, the conditional operator (`? :`) determines its static return type at compile time by analyzing both branches. When one branch is a primitive type (such as `int`) and the other branch is its wrapper type (`Integer`), the entire expression is typed as primitive `int`. At runtime, the JVM automatically invokes `.intValue()` to unbox the wrapper operand. If that wrapper operand happens to be `null`, the unboxing invocation throws a `NullPointerException` regardless of whether the branch was expected to return null safely.",
        "followUp": "How can you safely prevent this ternary unboxing NullPointerException?",
        "followUpAnswer": "Ensure both branches produce reference types (e.g. `Integer.valueOf(0)` instead of `0`), or perform an explicit null check before the expression is evaluated.",
        "commonMistake": "Assuming that `condition ? wrapperObj : null` safely returns null when wrapperObj is null.",
        "commonMistakeAnswer": "If the other branch is primitive (e.g. `condition ? wrapperObj : 0`), unboxing occurs before assignment, triggering an NPE on null.",
        "keyPhrases": [
          "compile-time type determination",
          "binary numeric promotion in ternary",
          "implicit .intValue() invocation",
          "unboxing NullPointerException"
        ]
      },
      {
        "question": "Explain short-circuit evaluation (`&&`, `||`) versus logical bitwise evaluation (`&`, `|`) with practical production implications.",
        "expectedAnswer": "`&&` and `||` are short-circuit logical operators. In bytecode, javac emits conditional branch instructions (`ifeq` / `ifne`). If the left operand of `&&` evaluates to `false`, the right operand is completely bypassed at runtime. Similarly, if the left operand of `||` evaluates to `true`, the right operand is bypassed. In contrast, `&` and `|` are bitwise and boolean operators that evaluate both operands unconditionally. In production, short-circuit operators are vital for defensive programming: guarding null pointer dereferences (`obj != null && obj.isValid()`) and avoiding expensive RPC or database calls.",
        "followUp": "When would you intentionally use `&` or `|` on boolean values instead of `&&` or `||`?",
        "followUpAnswer": "Only when the second operand has a necessary side-effect that must execute regardless of the first operand's result (though in clean architecture, side-effects in conditions are considered an anti-pattern).",
        "commonMistake": "Using `&` in if-statements thinking it is faster than `&&`.",
        "commonMistakeAnswer": "`&` forces execution of both sides, which causes severe performance degradation and NullPointerExceptions when evaluating guarded conditions.",
        "keyPhrases": [
          "short-circuit evaluation",
          "conditional branch bytecode (ifeq)",
          "unconditional operand evaluation",
          "null-pointer guard pattern"
        ]
      },
      {
        "question": "What is the difference between the arithmetic right shift (`>>`) and the logical right shift (`>>>`)? Provide a concrete use case.",
        "expectedAnswer": "`>>` is the signed or arithmetic right shift operator. It shifts the binary representation to the right, filling the vacated most significant bits with the sign bit (1 if negative, 0 if positive), thereby preserving the sign of two's complement numbers. `>>>` is the unsigned or logical right shift operator. It shifts binary bits right and unconditionally fills vacated high bits with zeros regardless of the number's sign. A primary production use case for `>>>` is in computing array midpoints in binary search: `int mid = (low + high) >>> 1;` which prevents integer overflow bugs when `low + high` exceeds `Integer.MAX_VALUE`.",
        "followUp": "Why does `(low + high) >>> 1` prevent the binary search overflow bug?",
        "followUpAnswer": "When `low + high` overflows, the sum becomes negative in two's complement. Applying `>>> 1` treats the 32-bit register as an unsigned value, shifting in a zero and producing the exact correct non-overflowed midpoint.",
        "commonMistake": "Assuming `>> 1` is identical to division by 2 for all negative numbers.",
        "commonMistakeAnswer": "`-1 >> 1` evaluates to `-1` (sign-extended), whereas `-1 / 2` truncates toward zero and evaluates to `0`.",
        "keyPhrases": [
          "arithmetic shift sign preservation",
          "logical shift zero-fill",
          "binary search midpoint (low + high) >>> 1",
          "two's complement bit manipulation"
        ]
      },
      {
        "question": "How does operator precedence between bitwise operators (`&`, `|`, `^`) and relational operators (`==`, `!=`) cause subtle bugs?",
        "expectedAnswer": "In Java's operator precedence table, relational and equality operators (`==`, `!=`, `<`, `>`) have higher precedence than bitwise operators (`&`, `^`, `|`). If a developer writes `if (flags & MASK == 0)`, Java groups the expression as `flags & (MASK == 0)`. Because `MASK == 0` produces a `boolean`, Java attempts to execute `int & boolean`, resulting in a compile-time error. If both operands were integers or enums with custom equality, it could lead to silent behavioral defects. Developers must use explicit parentheses: `if ((flags & MASK) == 0)`.",
        "followUp": "What is the full precedence ranking between arithmetic, shift, relational, and bitwise operators?",
        "followUpAnswer": "Arithmetic (`+`, `-`) > Shift (`<<`, `>>`, `>>>`) > Relational (`<`, `<=`, `>`, `>=`) > Equality (`==`, `!=`) > Bitwise AND (`&`) > Bitwise XOR (`^`) > Bitwise OR (`|`) > Logical AND (`&&`) > Logical OR (`||`).",
        "commonMistake": "Assuming bitwise operators bind tighter than equality checks.",
        "commonMistakeAnswer": "Historical C design gave equality higher precedence than bitwise operators, which Java inherited.",
        "keyPhrases": [
          "operator precedence hierarchy",
          "equality higher than bitwise",
          "flags & MASK == 0 parsing trap",
          "explicit parenthesization"
        ]
      },
      {
        "question": "What is pattern matching for `instanceof` (Java 16+ JLS §14.30), and what problems does it eliminate compared to legacy casting?",
        "expectedAnswer": "Pattern matching for `instanceof` combines type testing and extraction into a single atomic syntactic construct. In legacy Java, developers had to test type with `instanceof` and then write a redundant, manual explicit cast: `if (obj instanceof String) { String s = (String) obj; ... }`. Pattern matching allows `if (obj instanceof String s)`. It eliminates boilerplate code, prevents `ClassCastException` risks caused by refactoring discrepancies between test and cast, and leverages flow scoping to ensure the bound variable `s` is only in scope where the pattern is proven true.",
        "followUp": "Can pattern variables be used in conditional expressions with logical OR (`||`)?",
        "followUpAnswer": "No. In `if (obj instanceof String s || s.length() > 0)`, the expression fails to compile because if `obj` is not a String, the right side evaluates but `s` has not been assigned a valid value.",
        "commonMistake": "Thinking pattern matching instanceof executes reflection at runtime.",
        "commonMistakeAnswer": "It compiles to standard `instanceof` and `checkcast` bytecode, optimized by the JIT compiler.",
        "keyPhrases": [
          "type test and extraction unification",
          "flow scoping rules",
          "ClassCastException elimination",
          "JLS §14.30 pattern matching"
        ]
      },
      {
        "question": "Explain Java's binary numeric promotion rules for arithmetic operators.",
        "expectedAnswer": "Per JLS §5.6.2, binary numeric promotion occurs whenever arithmetic operators (`+`, `-`, `*`, `/`, `%`) or relational comparison operators are applied to numeric operands. The promotion rules evaluate sequentially: 1) If either operand is of type `double`, the other is promoted to `double`. 2) Otherwise, if either operand is of type `float`, the other is promoted to `float`. 3) Otherwise, if either operand is of type `long`, the other is promoted to `long`. 4) Otherwise, both operands are promoted to `int` regardless of their original types (even if both are `byte`, `short`, or `char`).",
        "followUp": "Why did Java language designers mandate promotion of byte and short to 32-bit int?",
        "followUpAnswer": "Modern processor architectures (x86, ARM) operate natively on 32-bit and 64-bit registers; 8-bit arithmetic at the hardware level often requires extra masking instructions, so the JVM optimizes for 32-bit stack frames.",
        "commonMistake": "Expecting `byte + byte` to evaluate to `byte`.",
        "commonMistakeAnswer": "Both byte operands are widened to int, resulting in an int sum.",
        "keyPhrases": [
          "JLS §5.6.2 binary numeric promotion",
          "widening conversion hierarchy",
          "mandatory int promotion for sub-int types",
          "hardware 32-bit ALU alignment"
        ]
      },
      {
        "question": "Can you overload operators in Java? What is the language design rationale behind this decision?",
        "expectedAnswer": "No, Java does not support user-defined operator overloading. The only operator overloaded by the language specification itself is the `+` operator, which acts as arithmetic addition for numeric types and string concatenation when either operand is a `String`. James Gosling and the Java design team intentionally omitted operator overloading to prioritize code readability, simplicity, and maintainability. In languages with operator overloading like C++, operators can execute arbitrary hidden side-effects, making code auditing and static analysis difficult. In Java, method calls make side-effects and resource costs explicit.",
        "followUp": "How does Java achieve arithmetic on arbitrary-precision types without operator overloading?",
        "followUpAnswer": "Through explicit immutable object method invocations, such as `bigDecimal1.add(bigDecimal2).multiply(taxRate)`.",
        "commonMistake": "Confusing method overloading with operator overloading.",
        "commonMistakeAnswer": "Java fully supports method overloading (multiple methods with the same name but different parameter lists), but does not support redefining operator symbols.",
        "keyPhrases": [
          "no user-defined operator overloading",
          "built-in String + concatenation",
          "readability and simplicity design philosophy",
          "explicit method invocation semantics"
        ]
      },
      {
        "question": "How does String concatenation operator `+` work internally in modern Java (JDK 9+ vs older JVMs)?",
        "expectedAnswer": "In older Java versions (JDK 5 through 8), the compiler translated string concatenation using `+` into bytecode that explicitly instantiated `new StringBuilder()` and chained `.append()` calls. While effective, this generated sub-optimal bytecode for complex expressions. In modern Java (JDK 9+), JEP 280 replaced static `StringBuilder` generation with the `invokedynamic` bytecode instruction utilizing `StringConcatFactory.makeConcatWithConstants()`. This delegates string concatenation strategy to runtime recipe bootstrap methods, allowing the JVM to optimize buffer sizing and copy strategies dynamically using SIMD hardware acceleration without recompilation.",
        "followUp": "Should developers still avoid using `+` inside large loops?",
        "followUpAnswer": "Yes. Even with `invokedynamic`, using `+` inside an iterating loop creates repeated concatenation allocations on each iteration. `StringBuilder` should always be explicitly instantiated outside the loop.",
        "commonMistake": "Believing `+` creates millions of immutable intermediate String objects in modern Java statements.",
        "commonMistakeAnswer": "A single concatenation statement evaluates in a single optimized pass via invokedynamic or StringBuilder; intermediate strings only proliferate across loop iterations.",
        "keyPhrases": [
          "invokedynamic bytecode instruction",
          "JEP 280 StringConcatFactory",
          "makeConcatWithConstants bootstrap",
          "explicit StringBuilder for loops"
        ]
      }
    ]
  }
};
