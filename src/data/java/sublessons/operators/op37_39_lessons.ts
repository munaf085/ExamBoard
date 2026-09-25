import { DetailedLesson } from '../../detailedLessons';

export const op37_39_lessons: Record<string, DetailedLesson> = {
  // ==========================================================================
  // LESSON 3.7: Bitwise & Shift Operators
  // ==========================================================================
  'bitwise-shift-operators': {
    id: 'bitwise-shift-operators',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.7',
    title: 'Bitwise & Shift Operators',
    subtitle: 'Manipulating individual binary bits (&, |, ^, ~, <<, >>, >>>)',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Imagine an 8-switch bank controlling security lights, air vents, alarms, and cameras in a high-tech facility. Rather than rewiring the entire building for every change, bitwise operators let you flick individual switches ON or OFF directly at the circuit board level. You can check if the alarm switch is ON (&), activate the ventilation switch (|), toggle the lights (^), invert every switch simultaneously (~), or slide the entire bank of settings along the control rack (<<, >>, >>>).',
    coreExplanation: [
      'Binary Representation & Bits: Every integer in Java (byte, short, int, long) is stored internally in binary as a series of 0s and 1s using two\'s complement representation. Bitwise operators inspect and manipulate these individual bit positions.',
      'Bitwise AND (&): Compares each bit position of two operands. The result bit is 1 ONLY if both corresponding bits are 1; otherwise, it is 0 (1 & 1 = 1; 1 & 0 = 0). Used for masking bits and testing specific flags.',
      'Bitwise OR (|): Compares each bit position. The result bit is 1 if AT LEAST ONE of the bits is 1; it is 0 only if both are 0 (0 | 0 = 0; 1 | 0 = 1). Used to combine flags and set specific bits to 1.',
      'Bitwise XOR (^): Exclusive OR yields 1 if the two bits are DIFFERENT, and 0 if they are identical (1 ^ 0 = 1; 1 ^ 1 = 0; 0 ^ 0 = 0). Fundamental properties include x ^ x = 0 and x ^ 0 = x, making XOR ideal for toggling flags and in-place swaps.',
      'Bitwise NOT / Inversion (~): A unary operator that flips every single bit (0 becomes 1, 1 becomes 0). In two\'s complement arithmetic, ~x is mathematically identical to -(x + 1). For example, ~5 yields -6, and ~0 yields -1.',
      'Signed Left Shift (<<): Shifts all bits to the left by n positions, discarding overflow on the left and padding new positions on the right with 0s. Mathematically, shifting left by n multiplies the number by 2^n (x << 1 equals x * 2).',
      'Signed Right Shift (>>): Shifts all bits right by n positions, discarding bits on the right. Crucially, it copies the leftmost sign bit into new high-order positions (sign extension: positive numbers stay positive, negative stay negative). Mathematically, x >> n performs floor division by 2^n.',
      'Unsigned Right Shift (>>>): Shifts all bits right by n positions, but ALWAYS fills the high-order bits with 0s regardless of sign. For negative numbers, this turns a signed negative integer into a huge positive number.'
    ],
    diagram: `+-----------------------------------------------------------------------+
|                      JAVA BITWISE TRUTH TABLE                         |
+-------+-------+-------------+------------+-------------+--------------+
| Bit A | Bit B | A & B (AND) | A | B (OR) | A ^ B (XOR) | ~A (NOT / Inv)|
+-------+-------+-------------+------------+-------------+--------------+
|   0   |   0   |      0      |     0      |      0      |      1       |
|   0   |   1   |      0      |     1      |      1      |      1       |
|   1   |   0   |      0      |     1      |      1      |      0       |
|   1   |   1   |      1      |     1      |      0      |      0       |
+-------+-------+-------------+------------+-------------+--------------+

EXAMPLE: 5 & 3, 5 | 3, 5 ^ 3 (in 4-bit nibbles):
  5 in binary:   0 1 0 1
  3 in binary:   0 0 1 1
  ----------------------
  5 & 3 (AND):   0 0 0 1  -->  Decimal 1
  5 | 3 (OR):    0 1 1 1  -->  Decimal 7
  5 ^ 3 (XOR):   0 1 1 0  -->  Decimal 6

SHIFT OPERATIONS:
  Left Shift  (5 << 1):  0 1 0 1  -->  1 0 1 0  (Decimal 10, i.e., 5 * 2)
  Right Shift (5 >> 1):  0 1 0 1  -->  0 0 1 0  (Decimal 2,  i.e., 5 / 2)`,
    codeSnippet: {
      title: 'Bitwise Logic and Shift Operators in Action',
      code: `public class BitwiseFundamentals {
    public static void main(String[] args) {
        int a = 5;  // Binary: 0000_0101
        int b = 3;  // Binary: 0000_0011

        System.out.println("a & b: " + (a & b));  // 0000_0001 = 1
        System.out.println("a | b: " + (a | b));  // 0000_0111 = 7
        System.out.println("a ^ b: " + (a ^ b));  // 0000_0110 = 6
        System.out.println("~a: " + (~a));        // -(5 + 1)   = -6

        int num = 8;
        System.out.println("8 << 2: " + (num << 2)); // 8 * 4 = 32
        System.out.println("8 >> 2: " + (num >> 2)); // 8 / 4 = 2
    }
}`,
      lineByLineExplanation: [
        { line: 'int a = 5; int b = 3;', explanation: 'Initializes two integers with binary values 0101 (5) and 0011 (3).' },
        { line: 'System.out.println("a & b: " + (a & b));', explanation: 'Bitwise AND produces 0001 (1) because only bit position 0 is 1 in both numbers.' },
        { line: 'System.out.println("a | b: " + (a | b));', explanation: 'Bitwise OR produces 0111 (7) because bits 0, 1, and 2 are 1 in either 5 or 3.' },
        { line: 'System.out.println("a ^ b: " + (a ^ b));', explanation: 'Bitwise XOR produces 0110 (6) because bits 1 and 2 differ between 5 and 3.' },
        { line: 'System.out.println("~a: " + (~a));', explanation: 'Bitwise NOT flips all 32 bits, producing -(5 + 1) = -6 via two\'s complement.' },
        { line: 'System.out.println("8 << 2: " + (num << 2));', explanation: 'Left-shifting by 2 shifts bits left 2 positions, multiplying 8 by 2^2 (8 * 4 = 32).' }
      ],
      output: `a & b: 1
a | b: 7
a ^ b: 6
~a: -6
8 << 2: 32
8 >> 2: 2`
    },
    codeExamples: [
      {
        title: 'Example 1: Permission Masking with Bitwise Flags',
        description: 'Demonstrating how operating systems and databases pack multiple booleans into a single integer using bitwise flags.',
        code: `public class PermissionFlagsDemo {
    public static void main(String[] args) {
        // Individual bit flags (powers of 2)
        int READ    = 1; // 0001
        int WRITE   = 2; // 0010
        int EXECUTE = 4; // 0100

        // Grant READ and WRITE to a user
        int userPermissions = READ | WRITE; // 0011 (decimal 3)
        System.out.println("Combined Permissions: " + userPermissions);

        // Check if user has WRITE permission using &
        boolean canWrite = (userPermissions & WRITE) != 0;
        System.out.println("Can write? " + canWrite);

        // Check if user has EXECUTE permission using &
        boolean canExecute = (userPermissions & EXECUTE) != 0;
        System.out.println("Can execute? " + canExecute);

        // Revoke WRITE permission using & with bitwise NOT (~)
        userPermissions = userPermissions & (~WRITE);
        System.out.println("After revoking WRITE: " + userPermissions);
        System.out.println("Can write now? " + ((userPermissions & WRITE) != 0));
    }
}`,
        output: `Combined Permissions: 3
Can write? true
Can execute? false
After revoking WRITE: 1
Can write now? false`
      },
      {
        title: 'Example 2: In-Place Swapping and Parity Check',
        description: 'Using XOR properties to swap two variables without extra memory and checking odd/even with & 1.',
        code: `public class XorSwapAndParity {
    public static void main(String[] args) {
        int x = 42;
        int y = 99;
        System.out.println("Before swap: x = " + x + ", y = " + y);

        // Three-step XOR swap:
        x = x ^ y;
        y = x ^ y;
        x = x ^ y;
        System.out.println("After swap:  x = " + x + ", y = " + y);

        // Fast odd/even test: the lowest bit of an odd number is always 1
        int testNum = 27;
        boolean isOdd = (testNum & 1) == 1;
        System.out.println(testNum + " is odd? " + isOdd);
    }
}`,
        output: `Before swap: x = 42, y = 99
After swap:  x = 99, y = 42
27 is odd? true`
      },
      {
        title: 'Example 3: Signed (>>) vs Unsigned (>>>) Right Shift',
        description: 'Contrasting sign extension in >> against zero-fill padding in >>> on negative numbers.',
        code: `public class ShiftComparisonDemo {
    public static void main(String[] args) {
        int positiveNum = 16;
        System.out.println("16 >> 2:  " + (positiveNum >> 2));  // 4
        System.out.println("16 >>> 2: " + (positiveNum >>> 2)); // 4

        int negativeNum = -16;
        // >> preserves the sign bit (fills left with 1s)
        System.out.println("-16 >> 2:  " + (negativeNum >> 2));  // -4
        // >>> fills left with 0s, resulting in a large positive integer
        System.out.println("-16 >>> 2: " + (negativeNum >>> 2)); // 1073741820
    }
}`,
        output: `16 >> 2:  4
16 >>> 2: 4
-16 >> 2:  -4
-16 >>> 2: 1073741820`
      }
    ],
    cheatSheet: {
      summary: 'Bitwise operators manipulate integer types at the raw bit level. Use & for masking/clearing, | for setting flags, ^ for toggling/swapping, ~ for complement, << for multiplying by powers of 2, >> for sign-preserving division, and >>> for unsigned logical shifts.',
      syntaxTemplate: `// Bitwise Logic:
int andRes = a & b;   // AND: 1 only if both are 1
int orRes  = a | b;   // OR:  1 if either is 1
int xorRes = a ^ b;   // XOR: 1 if bits differ
int notRes = ~a;      // NOT: inverts all bits, formula -(a + 1)

// Bitwise Shifts:
int leftShift  = a << n;  // Multiplies: a * 2^n
int rightShift = a >> n;  // Divides (signed): a / 2^n
int unsignedRS = a >>> n; // Unsigned shift: fills left with 0s`,
      rules: [
        { rule: 'Bitwise AND (&) for Masking', explanation: 'To inspect whether bit n is set: (val & (1 << n)) != 0.' },
        { rule: 'Bitwise OR (|) for Combining', explanation: 'To turn on bit n: val = val | (1 << n).' },
        { rule: 'Bitwise XOR (^) Self-Inverse', explanation: 'x ^ x = 0 and x ^ 0 = x. Toggling a bit twice restores original value.' },
        { rule: 'Bitwise Inversion Formula', explanation: 'Because of two\'s complement, ~x is always equal to -(x + 1).' },
        { rule: 'Shift Distance Masking', explanation: 'In Java, shift distance is masked: for 32-bit int, shift amount is n % 32; for 64-bit long, n % 64.' },
        { rule: 'Parentheses Mandatory', explanation: 'Bitwise operators have lower precedence than == and +. Always wrap bit expressions: (val & 1) == 0.' }
      ],
      quickComparison: [
        { aspect: 'Bitwise AND (&) vs OR (|)', optionA: '&: 1 only if BOTH bits are 1', optionB: '|: 1 if EITHER or BOTH bits are 1' },
        { aspect: 'XOR (^) vs NOT (~)', optionA: '^: binary operator, 1 if bits differ', optionB: '~: unary operator, inverts all 32 bits' },
        { aspect: 'Left Shift (<<) vs Right Shift (>>)', optionA: '<<: shifts left, multiplies by 2^n', optionB: '>>: shifts right, divides by 2^n' },
        { aspect: 'Signed (>>) vs Unsigned (>>>)', optionA: '>>: preserves sign bit (copies leftmost bit)', optionB: '>>>: always fills high bits with 0' },
        { aspect: 'Bitwise (&, |) vs Logical (&&, ||)', optionA: '&, |: evaluates both sides, works on bits & booleans', optionB: '&&, ||: short-circuits, works ONLY on booleans' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Using & or | in boolean conditions when && or || is intended.',
        whyItHappens: 'Both compile when working with booleans, but single & and | do NOT short-circuit. If the left side is false, the right side still executes, causing NullPointerExceptions if checking for null.',
        howToFix: 'Use && and || for logical control flow. Reserve & and | strictly for bit manipulation.'
      },
      {
        mistake: 'Writing "num & 1 == 0" without parentheses around the bitwise expression.',
        whyItHappens: 'Equality (==) has higher precedence than bitwise AND (&). Java interprets this as "num & (1 == 0)", which fails to compile because int and boolean cannot be combined with &.',
        howToFix: 'Always wrap bitwise expressions in parentheses: "(num & 1) == 0".'
      },
      {
        mistake: 'Expecting ~x to return the simple negative -x.',
        whyItHappens: 'Forgetting that Java integers use two\'s complement. Inversion flips all bits including sign bit, yielding -(x + 1). So ~5 is -6, not -5.',
        howToFix: 'Remember ~x = -(x + 1). If you want negation, use the arithmetic unary minus (-x).'
      },
      {
        mistake: 'Shifting by 32 bits expecting an int to become 0 (e.g., "5 << 32").',
        whyItHappens: 'Java masks the shift distance using the lowest 5 bits (distance & 0x1F), meaning shifting an int by 32 is treated as shifting by 0 (32 % 32 = 0)!',
        howToFix: 'To clear a variable completely, assign 0 directly rather than trying to shift all bits away.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Bitwise AND Masking for Parity',
        problemStatement: 'What does the following snippet print to the console?',
        code: `int num = 13;
int result = num & 1;
System.out.println(result);`,
        options: ['0', '1', '13', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: '13 in binary is 1101. 1 in binary is 0001. Bitwise AND checks if the lowest bit is 1.',
        solution: '1',
        explanation: '13 in binary is 1101_2 and 1 is 0001_2. Only the least significant bit is 1 in both: 1101 & 0001 = 0001 (decimal 1).'
      },
      {
        title: 'Puzzle 2: Combining Bits with Bitwise OR',
        problemStatement: 'What is the output of the bitwise OR expression below?',
        code: `int a = 8; // 1000 in binary
int b = 4; // 0100 in binary
System.out.println(a | b);`,
        options: ['12', '4', '8', '0'],
        correctOptionIndex: 0,
        hint: '8 is 1000 and 4 is 0100. Combining them sets bits 3 and 2.',
        solution: '12',
        explanation: 'Binary 1000 | 0100 = 1100. In decimal, 8 + 4 = 12.'
      },
      {
        title: 'Puzzle 3: Bitwise XOR Cancellation Property',
        problemStatement: 'Trace the output of this XOR expression chain:',
        code: `int a = 15;
int b = 27;
int c = a ^ b ^ a;
System.out.println(c);`,
        options: ['15', '27', '0', '42'],
        correctOptionIndex: 1,
        hint: 'XOR is commutative and associative. Any number XORed with itself cancels out to 0: a ^ a = 0.',
        solution: '27',
        explanation: 'a ^ b ^ a equals (a ^ a) ^ b. Since a ^ a = 0, 0 ^ b = b = 27.'
      },
      {
        title: 'Puzzle 4: Bitwise Inversion Formula',
        problemStatement: 'What does bitwise NOT (~) print for 0 and 7?',
        code: `int p = ~0;
int q = ~7;
System.out.println(p + " " + q);`,
        options: ['0 -7', '-1 -8', '1 -7', '-1 -7'],
        correctOptionIndex: 1,
        hint: 'The formula for two\'s complement bitwise NOT is ~x = -(x + 1).',
        solution: '-1 -8',
        explanation: '~0 = -(0 + 1) = -1. ~7 = -(7 + 1) = -8. Output is "-1 -8".'
      },
      {
        title: 'Puzzle 5: Left Shift Arithmetic',
        problemStatement: 'What is the value of x after shifting left by 3?',
        code: `int x = 6;
int y = x << 3;
System.out.println(y);`,
        options: ['18', '24', '48', '9'],
        correctOptionIndex: 2,
        hint: 'Shifting left by 3 multiplies the number by 2^3 = 8.',
        solution: '48',
        explanation: 'x << 3 is 6 * 2^3 = 6 * 8 = 48.'
      },
      {
        title: 'Puzzle 6: Signed Right Shift on Negative Integer',
        problemStatement: 'What does signed right shift (>>) yield for -8 shifted by 1?',
        code: `int val = -8;
System.out.println(val >> 1);`,
        options: ['-4', '4', '1073741820', '-8'],
        correctOptionIndex: 0,
        hint: 'Signed right shift preserves the negative sign bit and computes floor division by 2.',
        solution: '-4',
        explanation: 'Signed right shift preserves the sign: -8 >> 1 = -8 / 2 = -4.'
      },
      {
        title: 'Puzzle 7: Unsigned Right Shift on -1',
        problemStatement: 'What is the outcome of unsigned right shift on -1 by 31 positions?',
        code: `int val = -1;
int res = val >>> 31;
System.out.println(res);`,
        options: ['-1', '0', '1', '2147483647'],
        correctOptionIndex: 2,
        hint: '-1 in 32-bit binary is 11111111_11111111_11111111_11111111. Shifting right by 31 with zero padding leaves just a single 1 in the lowest bit.',
        solution: '1',
        explanation: '-1 has all 32 bits set to 1. >>> 31 shifts all bits right 31 slots, padding 31 zeros on the left, leaving binary 0000...0001 = 1.'
      },
      {
        title: 'Puzzle 8: Precedence Between Addition and Left Shift',
        problemStatement: 'What is printed by the following expression?',
        code: `int result = 1 + 2 << 2;
System.out.println(result);`,
        options: ['5', '8', '12', '9'],
        correctOptionIndex: 2,
        hint: 'Additive operator (+) has higher precedence than bitwise left shift (<<).',
        solution: '12',
        explanation: 'Addition (+) runs before shift (<<). 1 + 2 = 3. Then 3 << 2 = 3 * 4 = 12.'
      },
      {
        title: 'Puzzle 9: Toggling Bits with XOR',
        problemStatement: 'What is the value of mask after toggling twice?',
        code: `int mask = 5;
int toggle = 3;
mask = mask ^ toggle;
mask = mask ^ toggle;
System.out.println(mask);`,
        options: ['0', '3', '5', '6'],
        correctOptionIndex: 2,
        hint: 'XORing with the same value twice returns the original value.',
        solution: '5',
        explanation: 'Because (a ^ b) ^ b = a ^ (b ^ b) = a ^ 0 = a, the value returns to original 5.'
      },
      {
        title: 'Puzzle 10: Shift Distance Modulo 32',
        problemStatement: 'What does 7 << 32 print in Java?',
        code: `int val = 7;
System.out.println(val << 32);`,
        options: ['0', '7', '14', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: 'For 32-bit integers, Java masks shift count with 0x1F (31). 32 % 32 = 0.',
        solution: '7',
        explanation: 'Java shift distance for int is distance & 31. Since 32 & 31 = 0, 7 << 32 is identical to 7 << 0 = 7.'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do bitwise operators differ fundamentally from logical operators in Java?',
        answer: 'Bitwise operators (&, |, ^, ~) operate directly on individual bits of integer primitive types (and booleans), evaluating both operands in all cases. In contrast, logical operators (&&, ||, !) operate exclusively on boolean expressions and feature short-circuit evaluation: if the left operand dictates the overall truth value (e.g. false in && or true in ||), the right operand is never executed. Furthermore, bitwise operators produce integer bit masks when used on numbers.',
        followUp: 'Can you use single & and single | on boolean values, and what is the consequence?',
        followUpAnswer: 'Yes, Java permits & and | on boolean values. However, doing so disables short-circuit evaluation. Both expressions on the left and right will ALWAYS be evaluated. If the right operand contains a method call with side effects or a check guarding against null (such as obj != null & obj.length() > 0), using single & risks a NullPointerException.',
        keyPhrases: ['bit-level manipulation', 'short-circuit evaluation', 'no short-circuit with single &', 'NullPointerException trap'],
        commonMistakeAnswer: 'Believing & and && are completely interchangeable on booleans.'
      },
      {
        question: 'What is the two\'s complement system and how does it explain the behavior of the ~ operator?',
        answer: 'Java represents all signed integers using two\'s complement binary notation. In this system, the most significant bit (bit 31 for int) is the sign bit (0 for positive, 1 for negative). The bitwise NOT operator (~) inverts every single bit (0s to 1s and 1s to 0s). Mathematically, inverting all bits of a two\'s complement integer x yields -(x + 1). For example, ~0 produces -1 because all 32 bits become 1, which represents -1 in two\'s complement.',
        followUp: 'How can you convert a positive integer into its negative counterpart using only bitwise operators and addition?',
        followUpAnswer: 'By definition of two\'s complement negation: -x = (~x) + 1. First invert all bits of x using ~, then add 1. For example, if x = 5, ~5 is -6; adding 1 yields -5.',
        keyPhrases: ['two\'s complement representation', 'sign bit at position 31', 'formula -(x + 1)', 'negation is (~x) + 1'],
        commonMistakeAnswer: 'Thinking ~5 simply produces -5.'
      },
      {
        question: 'What is the difference between the signed right shift (>>) and unsigned right shift (>>>)?',
        answer: 'The signed right shift (>>) preserves the sign of the original number by copying the leftmost sign bit into all vacated positions on the left (arithmetic shift). If the number was positive (sign bit 0), 0s are filled; if negative (sign bit 1), 1s are filled, preserving negativity. The unsigned right shift (>>>) is a logical shift that ALWAYS fills vacated leftmost positions with zeros, regardless of whether the original number was positive or negative. For negative numbers, >>> transforms them into large positive integers.',
        followUp: 'When would you use >>> in real-world software engineering?',
        followUpAnswer: 'Unsigned right shift (>>>) is widely used in low-level systems programming, cryptography (like SHA-256 hashing), bitmap processing, and calculating binary search midpoints: int mid = (low + high) >>> 1. This prevents integer overflow when low + high exceeds Integer.MAX_VALUE.',
        keyPhrases: ['sign extension in >>', 'zero padding in >>>', 'arithmetic vs logical shift', 'binary search midpoint calculation'],
        commonMistakeAnswer: 'Assuming >>> works on floating-point numbers or that >> fills with 0 for all numbers.'
      },
      {
        question: 'How do you check whether a given integer is odd or even using a bitwise operator, and why is it faster than modulo?',
        answer: 'You evaluate "(num & 1) != 0" or "(num & 1) == 1". In binary representation, all powers of two (2, 4, 8, 16...) have 0 as their least significant bit (bit 0). Only the number 1 sets bit 0. Therefore, an integer is odd if and only if bit 0 is 1. Bitwise AND (& 1) directly tests that single bit. It is conceptually faster than num % 2 because bitwise operations execute in a single CPU clock cycle, whereas integer division/modulo requires division circuitry.',
        followUp: 'How do you check if an integer is an exact power of two using bitwise operators?',
        followUpAnswer: 'An integer n > 0 is a power of two if: (n > 0) && ((n & (n - 1)) == 0). A power of two has exactly one 1-bit (e.g. 8 is 1000). Subtracting 1 flips that bit and sets all lower bits (7 is 0111). Their bitwise AND is strictly 0.',
        keyPhrases: ['least significant bit', 'masking with 1', 'single CPU cycle', '(n & (n - 1)) == 0 power of two test'],
        commonMistakeAnswer: 'Forgetting parentheses and writing num & 1 == 0 which causes a compile error.'
      },
      {
        question: 'How does the XOR swap trick work, and what are its caveats?',
        answer: 'The XOR swap exchanges two variables without a third temporary variable: a = a ^ b; b = a ^ b; a = a ^ b;. In step 1, a stores the combined difference. In step 2, b = (a ^ b) ^ b = a. In step 3, a = (a ^ b) ^ a = b. While clever, its caveats are: (1) If a and b point to the exact same memory location or array index (e.g. arr[i] where i == j), arr[i] ^ arr[i] zeroes the element! (2) Modern JVMs and CPU pipelining optimize standard temp swaps (int t = a; a = b; b = t;) better than XOR swaps.',
        followUp: 'What fundamental mathematical properties of XOR make this swap possible?',
        followUpAnswer: 'XOR is commutative (a ^ b = b ^ a), associative ((a ^ b) ^ c = a ^ (b ^ c)), has 0 as an identity element (x ^ 0 = x), and every element is its own inverse (x ^ x = 0).',
        keyPhrases: ['in-place swap', 'x ^ x = 0 self-inverse', 'same memory reference zero trap', 'compiler pipelining preference'],
        commonMistakeAnswer: 'Thinking XOR swap is always recommended over a temp variable in modern production Java.'
      },
      {
        question: 'What happens when you shift an int by 32 or 64 positions in Java?',
        answer: 'In Java, the shift distance for a 32-bit int is masked using only the lowest 5 bits of the shift count (count & 0x1F or count % 32). Therefore, shifting an int by 32 is equivalent to shifting by 0 (no shift at all!). Shifting by 33 is equivalent to shifting by 1. For a 64-bit long, the lowest 6 bits are used (count & 0x3F or count % 64), so shifting a long by 64 shifts by 0.',
        followUp: 'Why did the designers of Java specify this masking behavior rather than shifting all bits to 0?',
        followUpAnswer: 'This matches the native instruction behavior of x86 and ARM CPU architectures (such as the SHL and SHR instructions), ensuring maximum hardware execution speed without requiring extra conditional branch instructions in generated machine code.',
        keyPhrases: ['distance masked by 31 (0x1F)', 'modulo 32 behavior', 'hardware CPU instruction alignment', 'long masked by 63 (0x3F)'],
        commonMistakeAnswer: 'Believing that x << 32 results in 0.'
      },
      {
        question: 'How are bitwise operators used to implement feature flags or security permissions?',
        answer: 'Each permission is assigned a unique power of 2 (a distinct single bit): READ = 1 (1<<0), WRITE = 2 (1<<1), EXECUTE = 4 (1<<2), DELETE = 8 (1<<3). You combine permissions using OR: userPerms = READ | WRITE (0011). You check if a user has a permission using AND: (userPerms & WRITE) != 0. You revoke a permission using AND with NOT: userPerms = userPerms & (~WRITE). You toggle a permission using XOR: userPerms = userPerms ^ WRITE.',
        followUp: 'What is the memory and storage benefit of using bit flags in high-performance applications?',
        followUpAnswer: 'A single 32-bit int can store 32 independent boolean flags, or a 64-bit long can store 64 flags. In contrast, 32 separate boolean variables or an array of booleans consume significantly more heap memory and CPU cache lines, making bit masks far more cache-friendly and compact for serialization.',
        keyPhrases: ['powers of 2 flags', 'bitwise OR to grant', 'bitwise AND to test', 'bitwise AND-NOT to revoke'],
        commonMistakeAnswer: 'Assigning arbitrary sequential numbers (1, 2, 3, 4) to flags instead of powers of 2 (1, 2, 4, 8).'
      },
      {
        question: 'Why does the expression "int result = 1 + 2 << 3" evaluate to 24 instead of 17?',
        answer: 'In Java\'s operator precedence table, additive operators (+, -) have higher precedence than bitwise shift operators (<<, >>, >>>). Therefore, Java first computes 1 + 2 = 3. Then it evaluates 3 << 3, which shifts 3 left by 3 bits (3 * 2^3 = 3 * 8 = 24). If the developer intended to add 1 to (2 << 3), they must write "1 + (2 << 3)", which would evaluate to 1 + 16 = 17.',
        followUp: 'What is the precedence of bitwise AND, OR, and XOR relative to relational operators (<, >)?',
        followUpAnswer: 'Relational operators (<, >, <=, >=) have higher precedence than bitwise shifts, which have higher precedence than bitwise AND (&), XOR (^), and OR (|). The order is: +, - > <<, >> > <, > > ==, != > & > ^ > |.',
        keyPhrases: ['additive precedes shift', '3 << 3 equals 24', 'parentheses for arithmetic clarity', 'precedence ladder'],
        commonMistakeAnswer: 'Assuming left-to-right evaluation overrides operator precedence.'
      },
      {
        question: 'How do you extract individual byte channels (Red, Green, Blue, Alpha) from an ARGB 32-bit pixel integer?',
        answer: 'An ARGB integer packs four 8-bit bytes into 32 bits: Alpha (bits 24-31), Red (bits 16-23), Green (bits 8-15), Blue (bits 0-7). To extract each channel, shift right to align the desired byte at the lowest position, then mask with 0xFF: alpha = (pixel >> 24) & 0xFF; red = (pixel >> 16) & 0xFF; green = (pixel >> 8) & 0xFF; blue = pixel & 0xFF.',
        followUp: 'How would you reassemble the individual R, G, B channels back into a single 24-bit RGB integer?',
        followUpAnswer: 'You shift each channel into position and combine them with bitwise OR: int rgb = (red << 16) | (green << 8) | blue;',
        keyPhrases: ['shift and mask with 0xFF', 'ARGB 8-bit components', 'color packing with bitwise OR', 'graphics programming'],
        commonMistakeAnswer: 'Forgetting to mask with 0xFF after shifting, which causes sign extension issues on negative values.'
      },
      {
        question: 'What is the effect of applying the bitwise complement operator (~) to -1 in Java?',
        answer: 'Evaluating ~(-1) produces 0. In 32-bit two\'s complement binary, -1 is represented with all 32 bits set to 1 (11111111_11111111_11111111_11111111). When the ~ operator inverts every bit, every 1 becomes a 0, resulting in 00000000_00000000_00000000_00000000, which is decimal 0. This also adheres to the formula: ~(-1) = -(-1 + 1) = -0 = 0.',
        followUp: 'What does ~0 produce in Java?',
        followUpAnswer: '~0 produces -1. All 32 zero bits are flipped to ones, forming the two\'s complement representation of -1.',
        keyPhrases: ['all 32 bits are 1 for -1', 'inverting yields all zeros', '~(-1) equals 0', '~0 equals -1'],
        commonMistakeAnswer: 'Assuming ~(-1) results in 1.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the result of the bitwise expression: 6 & 3?',
        options: ['2', '7', '3', '0'],
        correctIndex: 0,
        explanation: '6 is 0110 in binary; 3 is 0011. 0110 & 0011 = 0010, which is decimal 2.'
      },
      {
        question: 'What is the result of the bitwise expression: 6 | 3?',
        options: ['7', '5', '9', '3'],
        correctIndex: 0,
        explanation: '6 is 0110; 3 is 0011. 0110 | 0011 = 0111, which is decimal 7.'
      },
      {
        question: 'What is the result of the bitwise expression: 9 ^ 9?',
        options: ['9', '18', '0', '1'],
        correctIndex: 2,
        explanation: 'Any number XORed with itself is 0 because all matching bits yield 0 (1^1=0, 0^0=0).'
      },
      {
        question: 'What is the value of ~4 in Java?',
        options: ['-4', '-5', '5', '-3'],
        correctIndex: 1,
        explanation: 'In two\'s complement, ~x = -(x + 1). Therefore, ~4 = -(4 + 1) = -5.'
      },
      {
        question: 'What is the result of the expression: 5 << 2?',
        options: ['10', '20', '25', '7'],
        correctIndex: 1,
        explanation: 'Left shift by 2 multiplies by 2^2 (4). 5 * 4 = 20.'
      },
      {
        question: 'What is the result of the expression: -12 >> 2?',
        options: ['-3', '3', '-6', '1073741821'],
        correctIndex: 0,
        explanation: 'Signed right shift preserves sign and divides by 2^2 (4): -12 / 4 = -3.'
      },
      {
        question: 'Which operator performs an unsigned right shift that always pads zeros on the left?',
        options: ['>>', '>>>', '<<', '<<>'],
        correctIndex: 1,
        explanation: 'The >>> operator is the unsigned right shift operator; it always fills high-order bits with 0.'
      },
      {
        question: 'Why does "int x = 8 & 1 == 0;" cause a compilation error?',
        options: [
          '8 & 1 is not valid syntax',
          '== has higher precedence than &, so Java tries to evaluate 8 & (1 == 0)',
          '& cannot be used with integers',
          'Assignment cannot store boolean values'
        ],
        correctIndex: 1,
        explanation: 'Equality (==) binds tighter than bitwise AND (&). Java groups it as 8 & (1 == 0), trying to AND an int with a boolean.'
      },
      {
        question: 'What does 10 ^ 0 evaluate to in Java?',
        options: ['0', '1', '10', '-10'],
        correctIndex: 2,
        explanation: 'Any number XORed with 0 preserves its value: x ^ 0 = x. 10 ^ 0 = 10.'
      },
      {
        question: 'How many bits of the shift distance are used when shifting a 32-bit int in Java?',
        options: ['All 32 bits', 'Lowest 5 bits (distance % 32)', 'Lowest 6 bits (distance % 64)', 'Lowest 8 bits'],
        correctIndex: 1,
        explanation: 'For int, Java masks the shift distance to the lowest 5 bits (0x1F), effectively performing distance % 32.'
      }
    ]
  },

  // ==========================================================================
  // LESSON 3.8: The instanceof Operator & Pattern Matching
  // ==========================================================================
  'instanceof-operator': {
    id: 'instanceof-operator',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.8',
    title: 'The instanceof Operator & Pattern Matching',
    subtitle: 'Checking object runtime types safely and Java 14+ pattern matching',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Imagine an automated conveyor belt scanner at a sorting depot. Before routing a mystery package into the fragile glassware chute, a scanner inspects the label: "Is this package glassware?". If true, it automatically attaches a handle and safely unboxes it in one seamless motion (Pattern Matching). If the box is empty or missing (null), the scanner safely reports false rather than crashing the conveyor line.',
    coreExplanation: [
      'What is instanceof? A binary relational operator used to test whether a reference variable holds an object that is an instance of a specified class, subclass, or interface at runtime.',
      'Boolean Result: It evaluates to true if the object can be safely cast to the target type without throwing a ClassCastException; otherwise, it returns false.',
      'The Null Safety Rule: If the reference operand is null, instanceof ALWAYS returns false without throwing a NullPointerException! "null instanceof String" evaluates cleanly to false.',
      'Compile-Time Type Compatibility: The compiler checks if there is any possible inheritance or subtype relationship between the declared reference type and the target type. Checking unrelated classes (e.g., String variable against Integer) produces a compile error: "inconvertible types".',
      'Wrapper Classes & Object Hierarchy: In Java, Object is the cosmic superclass of all reference types. An Integer is an instance of Integer, Number, and Object. A String is an instance of String, CharSequence, and Object.',
      'The Legacy Two-Step Check-and-Cast: Prior to Java 14, developers had to check with instanceof and then explicitly cast in a separate statement: if (obj instanceof String) { String s = (String) obj; }.',
      'Modern Pattern Matching (Java 14 Preview / 16 Standard): Combines the type test and extraction into one atomic construct: "if (obj instanceof String s)". If true, the pattern variable s is introduced, already cast to String.',
      'Flow Scoping: A pattern variable is only in scope where the pattern match is guaranteed to be true. In "if (obj instanceof String s && s.length() > 3)", s is accessible on the right side of && because the check succeeded!'
    ],
    diagram: `TRADITIONAL CHECK-AND-CAST (Pre-Java 14):
Object obj = "Hello Java";

  +----------------------------+
  | if (obj instanceof String) |  -->  Step 1: Check runtime type
  +--------------+-------------+
                 | (if true)
                 v
  +----------------------------+
  | String s = (String) obj;   |  -->  Step 2: Manual, verbose, error-prone cast
  | System.out.println(s.len); |
  +----------------------------+

MODERN PATTERN MATCHING (Java 14+ / Java 16 Standard):
Object obj = "Hello Java";

  +-------------------------------+
  | if (obj instanceof String s)  |  -->  Step 1 & 2 in ONE ATOMIC STEP!
  +---------------+---------------+       - Safe type check
                  | (if true)             - Automatic binding to 's'
                  v                       - Zero boilerplate casting
  +-------------------------------+
  | System.out.println(s.length());|
  +-------------------------------+

NULL SAFETY GUARANTEE:
  Object empty = null;
  empty instanceof String  -->  Evaluates to FALSE safely (NO NullPointerException!)`,
    codeSnippet: {
      title: 'Type Checking and Modern Pattern Matching with instanceof',
      code: `public class InstanceOfBasics {
    public static void main(String[] args) {
        Object item1 = "Software Developer";
        Object item2 = 100;
        Object item3 = null;

        // Modern Pattern Matching (Java 14+):
        if (item1 instanceof String text) {
            System.out.println("Item 1 is a String of length: " + text.length());
            System.out.println("Uppercase: " + text.toUpperCase());
        }

        if (item2 instanceof Integer count) {
            System.out.println("Item 2 is an Integer: " + (count + 50));
        }

        // Null safety guarantee
        System.out.println("item3 instanceof Object: " + (item3 instanceof Object));
    }
}`,
      lineByLineExplanation: [
        { line: 'Object item1 = "Software Developer";', explanation: 'Declares an Object reference pointing to a String instance.' },
        { line: 'if (item1 instanceof String text)', explanation: 'Tests if item1 is a String; if true, automatically casts and binds it to variable "text".' },
        { line: 'System.out.println("Uppercase: " + text.toUpperCase());', explanation: 'Directly calls String methods on "text" without manual downcasting.' },
        { line: 'if (item2 instanceof Integer count)', explanation: 'Verifies item2 is an Integer and binds it to "count", allowing integer addition.' },
        { line: 'item3 instanceof Object', explanation: 'Demonstrates that null instanceof any type evaluates safely to false.' }
      ],
      output: `Item 1 is a String of length: 18
Uppercase: SOFTWARE DEVELOPER
Item 2 is an Integer: 150
item3 instanceof Object: false`
    },
    codeExamples: [
      {
        title: 'Example 1: Polymorphic Dispatch with Wrapper Types',
        description: 'Inspecting unknown Object instances across String, Integer, and Double wrapper types.',
        code: `public class WrapperTypeDispatch {
    public static void main(String[] args) {
        Object mystery = 42.5;

        if (mystery instanceof String s) {
            System.out.println("Received text: " + s);
        } else if (mystery instanceof Integer i) {
            System.out.println("Received whole integer: " + i);
        } else if (mystery instanceof Double d) {
            System.out.println("Received decimal double: " + d);
            System.out.println("Doubled value: " + (d * 2));
        } else {
            System.out.println("Unknown type!");
        }
    }
}`,
        output: `Received decimal double: 42.5
Doubled value: 85.0`
      },
      {
        title: 'Example 2: Flow Scoping with Logical AND (&&)',
        description: 'Using pattern variables immediately in the condition via short-circuit AND (&&).',
        code: `public class FlowScopingDemo {
    public static void main(String[] args) {
        Object message = "Production Code";

        // 'msg' is in scope on the right side of && because left side must be true!
        if (message instanceof String msg && msg.startsWith("Prod")) {
            System.out.println("Valid production message: " + msg);
            System.out.println("Length is: " + msg.length());
        } else {
            System.out.println("Not a production message.");
        }
    }
}`,
        output: `Valid production message: Production Code
Length is: 15`
      },
      {
        title: 'Example 3: Safe Null Handling Without NullPointerExceptions',
        description: 'Showing how instanceof protects against null references without needing explicit null checks.',
        code: `public class NullSafetyDemo {
    public static void main(String[] args) {
        Object unknown = null;

        // No need for "unknown != null && unknown instanceof String"
        // instanceof handles null automatically!
        if (unknown instanceof String str) {
            System.out.println("Found string: " + str);
        } else {
            System.out.println("Safe! Handled null or non-string without crashing.");
        }
    }
}`,
        output: `Safe! Handled null or non-string without crashing.`
      }
    ],
    cheatSheet: {
      summary: 'The instanceof operator checks if an object reference belongs to a target type at runtime. It is completely null-safe (evaluating to false for null). Modern Java pattern matching (instanceof Type var) eliminates boilerplate casting by binding a typed variable in the same statement.',
      syntaxTemplate: `// 1. Traditional check:
if (obj instanceof String) {
    String s = (String) obj; // Manual casting
}

// 2. Modern Pattern Matching (Java 14+):
if (obj instanceof String s) {
    // 's' is directly available as a String!
    System.out.println(s.length());
}

// 3. Pattern Matching with Combined Condition:
if (obj instanceof String s && s.length() > 5) {
    System.out.println("Long string: " + s);
}`,
      rules: [
        { rule: 'Null Safe', explanation: 'null instanceof AnyType always evaluates to false without throwing NullPointerException.' },
        { rule: 'Reference Types Only', explanation: 'instanceof works strictly on reference types. Primitive types (int, double) cannot be used.' },
        { rule: 'Compile-Time Compatibility', explanation: 'There must be an inheritance relationship between the declared type and the target type.' },
        { rule: 'Flow Scoping Rule', explanation: 'Pattern variables exist only in scopes where the condition is proven to have evaluated to true.' },
        { rule: 'Illegal with Logical OR (||)', explanation: 'Writing (obj instanceof String s || s.isEmpty()) is illegal because s is not bound when left side is false.' },
        { rule: 'Object Hierarchy', explanation: 'Any non-null object is an instance of Object because java.lang.Object is the root superclass.' }
      ],
      quickComparison: [
        { aspect: 'Legacy Cast vs Pattern Matching', optionA: 'Legacy: instanceof check + explicit (String) cast', optionB: 'Modern: "instanceof String s" checks and casts in 1 step' },
        { aspect: 'instanceof vs getClass() ==', optionA: 'instanceof: returns true for exact type AND all subclasses', optionB: 'getClass() ==: returns true ONLY for the exact runtime class' },
        { aspect: 'Valid Types', optionA: 'Reference types only (String, Object, Integer, Number)', optionB: 'Illegal on primitives (5 instanceof int causes compile error)' },
        { aspect: 'Behavior on null', optionA: 'null instanceof Type: always evaluates cleanly to false', optionB: 'Calling methods on null: throws NullPointerException' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to use instanceof with primitive types like "if (x instanceof int)".',
        whyItHappens: 'Forgetting that primitives in Java (int, double, char) are not objects and do not participate in class inheritance.',
        howToFix: 'Use wrapper classes (Integer, Double, Character) when testing object references, or check primitive types using value comparisons.'
      },
      {
        mistake: 'Checking "if (obj != null && obj instanceof String)".',
        whyItHappens: 'Assuming that passing null to instanceof will throw a NullPointerException.',
        howToFix: 'Omit the redundant "obj != null". The Java language specification guarantees that null instanceof AnyType is always false.'
      },
      {
        mistake: 'Attempting to use a pattern variable in the else block: "if (obj instanceof String s) { ... } else { System.out.println(s); }".',
        whyItHappens: 'Assuming the variable s is scoped to the entire if-else statement.',
        howToFix: 'Remember flow scoping: s only exists inside the branch where the match succeeded (the if-block).'
      },
      {
        mistake: 'Combining pattern matching with logical OR (||): "if (obj instanceof String s || s.length() > 0)".',
        whyItHappens: 'Thinking the variable s will be initialized on the right side of the OR.',
        howToFix: 'Use logical AND (&&) instead of ||. With ||, if the left side is false, the right side executes when s was NOT created!'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Basic instanceof on String as Object',
        problemStatement: 'What does the following snippet print?',
        code: `Object greeting = "Hello, World!";
boolean isString = greeting instanceof String;
boolean isObject = greeting instanceof Object;
System.out.println(isString + " " + isObject);`,
        options: ['true true', 'true false', 'false true', 'Compiler Error'],
        correctOptionIndex: 0,
        hint: 'String is a reference type and directly extends Object.',
        solution: 'true true',
        explanation: 'The underlying object is a String, so it is an instance of String. Since Object is the superclass of all Java classes, it is also an instance of Object.'
      },
      {
        title: 'Puzzle 2: Null Reference Check with instanceof',
        problemStatement: 'What is the output when checking a null reference with instanceof?',
        code: `Object value = null;
if (value instanceof String) {
    System.out.println("It is a String");
} else {
    System.out.println("Not a String");
}`,
        options: ['It is a String', 'Not a String', 'NullPointerException', 'Compilation Error'],
        correctOptionIndex: 1,
        hint: 'null instanceof AnyType evaluates safely to false.',
        solution: 'Not a String',
        explanation: 'According to the Java Language Specification, any expression evaluating to null yields false when tested with instanceof without throwing any exception.'
      },
      {
        title: 'Puzzle 3: Integer Wrapper Inheritance Hierarchy',
        problemStatement: 'What does the following snippet print for an Integer wrapper?',
        code: `Object num = 42; // Autoboxed to Integer
boolean checkNum = num instanceof Number;
boolean checkInt = num instanceof Integer;
System.out.println(checkNum + " " + checkInt);`,
        options: ['true true', 'true false', 'false true', 'false false'],
        correctOptionIndex: 0,
        hint: 'Integer extends Number, which extends Object.',
        solution: 'true true',
        explanation: 'Integer is a subclass of java.lang.Number. Therefore, an Integer instance is an instance of both Number and Integer.'
      },
      {
        title: 'Puzzle 4: Pattern Matching Variable Value Extraction',
        problemStatement: 'What is printed by this modern pattern matching check?',
        code: `Object data = "Java";
if (data instanceof String text) {
    System.out.println(text.length() + 10);
}`,
        options: ['14', 'Java10', '410', 'Compiler Error'],
        correctOptionIndex: 0,
        hint: '"Java" has length 4. 4 + 10 is integer addition.',
        solution: '14',
        explanation: 'Pattern matching introduces "text" as a String. text.length() returns 4. 4 + 10 = 14.'
      },
      {
        title: 'Puzzle 5: Compile-Time Inconvertible Types',
        problemStatement: 'What happens when compiling the code below?',
        code: `String str = "ExamBoard";
// boolean b = str instanceof Integer;
System.out.println("Tested");`,
        options: [
          'Compiles and prints "Tested"',
          'Throws ClassCastException at runtime',
          'Throws NullPointerException',
          'Fails to compile: inconvertible types (String cannot be converted to Integer)'
        ],
        correctOptionIndex: 3,
        hint: 'Can a String ever be an Integer in Java? The compiler checks class hierarchies.',
        solution: 'Fails to compile: inconvertible types (String cannot be converted to Integer)',
        explanation: 'Because String and Integer are in completely disjoint class hierarchies with neither extending the other, the Java compiler rejects the check at compile time.'
      },
      {
        title: 'Puzzle 6: Flow Scoping with Logical AND',
        problemStatement: 'What is the output of the following condition?',
        code: `Object obj = "Antigravity";
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.substring(0, 4));
} else {
    System.out.println("Short or not string");
}`,
        options: ['Anti', 'Short or not string', 'Antigravity', 'Compiler Error'],
        correctOptionIndex: 0,
        hint: '"Antigravity" length is 11 (> 5). substring(0, 4) extracts characters at index 0, 1, 2, 3.',
        solution: 'Anti',
        explanation: 'The pattern match succeeds, so s is bound to "Antigravity". s.length() is 11 > 5 (true). s.substring(0, 4) outputs "Anti".'
      },
      {
        title: 'Puzzle 7: Inverted instanceof Check and Scope',
        problemStatement: 'What is the output of this guarded structure?',
        code: `Object target = 50;
if (!(target instanceof String)) {
    System.out.println("Not a String");
} else {
    System.out.println("Is a String");
}`,
        options: ['Not a String', 'Is a String', '50', 'ClassCastException'],
        correctOptionIndex: 0,
        hint: '50 is an Integer, so target instanceof String is false. Negating false gives true.',
        solution: 'Not a String',
        explanation: 'target is an Integer (not a String). (target instanceof String) is false. !(false) evaluates to true, executing the if branch.'
      },
      {
        title: 'Puzzle 8: Double Wrapper Checked Against Number',
        problemStatement: 'What does this polymorphic comparison output?',
        code: `Object decimalVal = 19.99;
if (decimalVal instanceof Number) {
    System.out.println("It is a Number");
} else {
    System.out.println("Other");
}`,
        options: ['It is a Number', 'Other', 'Compiler Error', 'NullPointerException'],
        correctOptionIndex: 0,
        hint: 'Double extends Number.',
        solution: 'It is a Number',
        explanation: '19.99 is autoboxed to a Double, which extends java.lang.Number. The check returns true.'
      },
      {
        title: 'Puzzle 9: Multi-Branch Pattern Matching',
        problemStatement: 'Which branch executes for the given object?',
        code: `Object mystery = 77;
if (mystery instanceof String s) {
    System.out.println("Text: " + s);
} else if (mystery instanceof Integer i) {
    System.out.println("Int: " + (i * 2));
} else {
    System.out.println("Unknown");
}`,
        options: ['Text: 77', 'Int: 154', 'Unknown', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: '77 is an Integer, not a String. 77 * 2 = 154.',
        solution: 'Int: 154',
        explanation: 'mystery is an Integer. The first branch is skipped. The second branch matches, binding i = 77 and printing 77 * 2 = 154.'
      },
      {
        title: 'Puzzle 10: Unassigned vs Null Object Reference',
        problemStatement: 'What is printed by this ternary expression?',
        code: `Object a = null;
Object b = "Valid";
String result = (a instanceof String) ? "A" : (b instanceof String) ? "B" : "None";
System.out.println(result);`,
        options: ['A', 'B', 'None', 'NullPointerException'],
        correctOptionIndex: 1,
        hint: 'a instanceof String is false. b instanceof String is true.',
        solution: 'B',
        explanation: 'a is null, so a instanceof String is false. b is "Valid" (a String), so b instanceof String is true. The ternary expression selects "B".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the purpose of the instanceof operator in Java, and how does it prevent runtime crashes?',
        answer: 'The instanceof operator checks whether an object reference is compatible with a target type at runtime before performing a cast. If code attempts to downcast an object to an incompatible type (e.g. casting an Integer to a String), the JVM throws a runtime ClassCastException, which terminates the program. By guarding casts with instanceof, developers verify type safety in advance, preventing runtime crashes.',
        followUp: 'How does instanceof handle null references?',
        followUpAnswer: 'instanceof handles null references safely by design: if the left operand is null, it returns false immediately without throwing a NullPointerException. This eliminates the need for redundant null-checks like "if (obj != null && obj instanceof Type)".',
        keyPhrases: ['runtime type check', 'prevents ClassCastException', 'null-safe by design', 'downcasting guard'],
        commonMistakeAnswer: 'Believing instanceof throws NullPointerException when the reference is null.'
      },
      {
        question: 'What is Pattern Matching for instanceof introduced in Java 14/16, and why is it superior to traditional casting?',
        answer: 'Pattern matching for instanceof combines the boolean type test and the target variable extraction into a single atomic statement: "if (obj instanceof String s)". In traditional Java, code required a check followed by an explicit cast: "if (obj instanceof String) { String s = (String) obj; }". Pattern matching is superior because: (1) it eliminates verbose boilerplate casting; (2) it eliminates copy-paste bugs where the type in the check differs from the cast type; and (3) it introduces flow-scoped pattern variables automatically.',
        followUp: 'What is "flow scoping" for pattern variables?',
        followUpAnswer: 'Flow scoping means a pattern variable is in scope only where the compiler can deduce that the pattern match has succeeded. For example, in "if (obj instanceof String s && s.length() > 0)", s is in scope on the right side of &&. However, s is NOT in scope in an else-block, nor is it in scope with logical OR (||).',
        keyPhrases: ['combines test and cast', 'eliminates boilerplate', 'flow scoping', 'prevents copy-paste errors'],
        commonMistakeAnswer: 'Thinking pattern matching is just syntactic sugar that allows pattern variables to be accessed anywhere in the method.'
      },
      {
        question: 'Can instanceof be used to check primitive types like int or double in Java?',
        answer: 'No. The instanceof operator can only be applied to reference types (classes, interfaces, and arrays). Attempting to write "x instanceof int" or "5 instanceof int" causes a compile-time error. Java\'s primitive types are stored as raw values on the stack and do not inherit from java.lang.Object, so they do not participate in runtime type hierarchy checks.',
        followUp: 'How can you check the type of an autoboxed primitive stored in an Object variable?',
        followUpAnswer: 'You test against the corresponding wrapper class: "if (obj instanceof Integer i)" or "if (obj instanceof Double d)". Because autoboxing wraps primitives into Integer or Double objects, they can be inspected with instanceof.',
        keyPhrases: ['reference types only', 'primitives do not extend Object', 'wrapper classes for autoboxed primitives', 'compile-time error on primitives'],
        commonMistakeAnswer: 'Assuming you can write "val instanceof int" in modern Java.'
      },
      {
        question: 'When will the Java compiler refuse to compile an instanceof expression with an "inconvertible types" error?',
        answer: 'The Java compiler analyzes the static (declared) type of the reference variable and the target type. If the compiler can prove at compile time that the reference could never possibly point to an instance of the target type (i.e. they are distinct classes in separate inheritance hierarchies where neither extends the other), it rejects the code with an "inconvertible types" compilation error. For example, if variable s is declared as String, "s instanceof Integer" will not compile.',
        followUp: 'Why does "obj instanceof String" compile when obj is declared as Object?',
        followUpAnswer: 'Because Object is the superclass of all classes in Java. At runtime, the variable obj could indeed reference a String instance, so the compiler permits the test.',
        keyPhrases: ['disjoint class hierarchies', 'inconvertible types error', 'static type analysis', 'Object can reference any subtype'],
        commonMistakeAnswer: 'Thinking that all instanceof checks compile and are simply evaluated at runtime.'
      },
      {
        question: 'What is the key difference between using "obj instanceof MyClass" versus "obj.getClass() == MyClass.class"?',
        answer: '"obj instanceof MyClass" evaluates to true if obj is an instance of MyClass OR ANY OF ITS SUBCLASSES (or implements the interface). It respects polymorphic inheritance. In contrast, "obj.getClass() == MyClass.class" checks for EXACT type equality, returning true only if the runtime class of obj is precisely MyClass, ignoring any subclasses. Additionally, calling getClass() on a null reference throws a NullPointerException, whereas instanceof returns false safely.',
        followUp: 'Which of the two is preferred in implementing the equals() method?',
        followUpAnswer: 'This is a classic debate. Effective Java generally recommends getClass() if strict symmetry across subclasses is required (the Liskov Substitution Principle trap), but instanceof is preferred when subclasses do not add state and should be comparable to superclass instances.',
        keyPhrases: ['polymorphic subtype check', 'exact class equality', 'getClass() throws NPE on null', 'equals() method design'],
        commonMistakeAnswer: 'Believing instanceof and getClass() == do the exact same thing.'
      },
      {
        question: 'Why does the expression "if (obj instanceof String s || s.isEmpty())" fail to compile?',
        answer: 'Logical OR (||) short-circuits: if the left operand is true, the right operand does not execute. However, if the left operand is false (meaning obj is NOT a String), execution proceeds to the right operand "s.isEmpty()". At that point, the pattern variable s was never initialized or bound! Because the compiler cannot guarantee that s exists when evaluating the right side, it flags s as out of scope, causing a compile-time error.',
        followUp: 'Why does "if (obj instanceof String s && s.length() > 0)" compile successfully?',
        followUpAnswer: 'Logical AND (&&) only evaluates the right operand if the left operand is TRUE. If obj is a String, s is guaranteed to be bound and valid, so the compiler safely permits using s in the right operand.',
        keyPhrases: ['logical OR short-circuit', 's unbound when false', 'logical AND guarantees match', 'flow scoping rules'],
        commonMistakeAnswer: 'Assuming pattern variables are available across the entire if condition regardless of operator.'
      },
      {
        question: 'What happens if you check "null instanceof Object" in Java?',
        answer: 'It returns false. Although java.lang.Object is the root superclass of every class in Java, null is a special literal representing the absence of any object reference. It is not an instance of any class, interface, or type. The Java Language Specification explicitly mandates that null instanceof AnyType evaluates to false.',
        followUp: 'Does evaluating "null instanceof Object" ever throw an exception?',
        followUpAnswer: 'No, never. It evaluates smoothly to false without throwing NullPointerException or any other runtime exception.',
        keyPhrases: ['absence of an object', 'always false for null', 'no exception thrown', 'JLS mandate'],
        commonMistakeAnswer: 'Thinking it returns true because null can be assigned to an Object reference.'
      },
      {
        question: 'Can you use pattern matching with instanceof in an early return (guard clause) pattern?',
        answer: 'Yes! If you invert the condition and return early: "if (!(obj instanceof String s)) return; // from here down, s is in scope!". Because the method returns when obj is NOT a String, the code below the if-statement can only be reached when obj IS a String. Therefore, the pattern variable s remains safely in scope for the rest of the method!',
        followUp: 'How does this improve code structure?',
        followUpAnswer: 'It avoids deep indentation and nested if-blocks, allowing developers to write clean, linear code with early returns.',
        keyPhrases: ['guard clause', 'inverted check with early return', 'flow scoping extends past return', 'reduces nesting'],
        commonMistakeAnswer: 'Thinking pattern variables can never be used outside of the if block.'
      },
      {
        question: 'How does instanceof behave when testing against an interface rather than a class?',
        answer: 'When testing against an interface (e.g. "obj instanceof CharSequence"), instanceof checks whether the runtime class of obj implements that interface (either directly or via a superclass). Crucially, the Java compiler allows an Object or non-final class reference to be checked against almost any interface, because even if the declared class does not implement the interface, a runtime subclass might.',
        followUp: 'When would an interface instanceof check fail to compile?',
        followUpAnswer: 'If the reference is a final class that does NOT implement the interface (e.g. final class Person, and checking "person instanceof List"), the compiler knows no subclass can ever exist, and rejects it at compile time.',
        keyPhrases: ['interface implementation check', 'subclasses can implement interfaces', 'final classes reject disjoint interfaces', 'polymorphism'],
        commonMistakeAnswer: 'Assuming interface checks behave identically to final class checks at compile time.'
      },
      {
        question: 'What is the performance overhead of using instanceof in modern Java high-throughput applications?',
        answer: 'In the HotSpot JVM, instanceof is extremely fast. If the target type is a final class or has a shallow class hierarchy, the JIT compiler often optimizes it down to a single pointer comparison (checking the object\'s Klass pointer). For deeper hierarchies and interface checks, HotSpot uses an inline cache and secondary supertype table lookup. In 99.9% of application scenarios, the overhead is negligible (a few nanoseconds or CPU cycles).',
        followUp: 'Should developers replace large if-else instanceof chains with polymorphism where possible?',
        followUpAnswer: 'Yes. While individual instanceof checks are very fast, long chains of if-else instanceof violates the Open/Closed Principle (OCP) in OOP. Replacing type checks with polymorphic method calls or visitor patterns makes the codebase easier to extend without modifying existing code.',
        keyPhrases: ['HotSpot JIT optimization', 'Klass pointer check', 'negligible CPU overhead', 'Open/Closed Principle in OOP'],
        commonMistakeAnswer: 'Believing instanceof uses slow runtime reflection on every call.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of: Object o = "Exam"; System.out.println(o instanceof String);?',
        options: ['true', 'false', 'Compilation Error', 'NullPointerException'],
        correctIndex: 0,
        explanation: 'o holds a String object at runtime, so o instanceof String is true.'
      },
      {
        question: 'What is the output of: Object o = null; System.out.println(o instanceof Object);?',
        options: ['true', 'false', 'NullPointerException', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'instanceof on a null reference always evaluates to false without throwing any exception.'
      },
      {
        question: 'Which of the following will cause a COMPILE-TIME ERROR?',
        options: [
          'Object x = "hi"; boolean b = x instanceof String;',
          'String s = "hi"; boolean b = s instanceof Object;',
          'String s = "hi"; boolean b = s instanceof Integer;',
          'Object n = null; boolean b = n instanceof Double;'
        ],
        correctIndex: 2,
        explanation: 'String and Integer are in completely unrelated class hierarchies, so the compiler rejects s instanceof Integer as inconvertible types.'
      },
      {
        question: 'What feature was permanently standardized in Java 16 for instanceof?',
        options: [
          'Pattern Matching for instanceof',
          'Multiple inheritance',
          'Operator overloading for instanceof',
          'Automatic primitive unboxing in instanceof'
        ],
        correctIndex: 0,
        explanation: 'Pattern Matching for instanceof (e.g. if (obj instanceof String s)) was standardized in Java 16.'
      },
      {
        question: 'Can you use instanceof on a primitive variable (e.g. int x = 10; x instanceof int)?',
        options: [
          'Yes, in Java 14 and later',
          'Yes, if x is non-zero',
          'No, instanceof only works on reference types and causes a compile error on primitives',
          'No, it throws ClassCastException at runtime'
        ],
        correctIndex: 2,
        explanation: 'instanceof works exclusively on reference types. Using it on primitives causes a compile-time error.'
      },
      {
        question: 'What happens in: if (obj instanceof String s && s.length() > 3)?',
        options: [
          'Compile error because s is not in scope on the right side of &&',
          'Executes successfully because s is in scope on the right side of &&',
          'Throws NullPointerException if obj is null',
          'Always returns false'
        ],
        correctIndex: 1,
        explanation: 'Under flow scoping, s is safely in scope on the right side of && because that side only evaluates if the instanceof check is true.'
      },
      {
        question: 'Why does "if (obj instanceof String s || s.isEmpty())" fail to compile?',
        options: [
          'isEmpty() cannot be called on s',
          's is not guaranteed to be bound when the left side of || is false',
          '|| is not supported in Java if-statements',
          'String does not have an isEmpty method'
        ],
        correctIndex: 1,
        explanation: 'Because || executes the right operand when the left is FALSE (when s was NOT created), s is out of scope on the right side of ||.'
      },
      {
        question: 'If Integer extends Number, what does (Integer.valueOf(10) instanceof Number) return?',
        options: ['true', 'false', '10', 'Compilation Error'],
        correctIndex: 0,
        explanation: 'Since Integer is a subclass of Number, any Integer instance is an instance of Number, returning true.'
      },
      {
        question: 'What is printed by: Object o = 100; System.out.println(o instanceof String ? "Text" : "Non-Text");?',
        options: ['Text', 'Non-Text', '100', 'ClassCastException'],
        correctIndex: 1,
        explanation: '100 is an Integer, not a String. The check evaluates to false, selecting the ternary branch "Non-Text".'
      },
      {
        question: 'What is the main benefit of Pattern Matching for instanceof over legacy casting?',
        options: [
          'It makes the code faster by 100x',
          'It eliminates boilerplate manual casting and prevents ClassCastException mistakes',
          'It allows casting between unrelated classes',
          'It replaces the need for any if-statements'
        ],
        correctIndex: 1,
        explanation: 'Pattern matching combines the type check and variable assignment into one step, eliminating verbose manual casting and potential bugs.'
      }
    ]
  },

  // ==========================================================================
  // LESSON 3.9: Operator Precedence & Associativity
  // ==========================================================================
  'operator-precedence': {
    id: 'operator-precedence',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.9',
    title: 'Operator Precedence & Associativity',
    subtitle: 'Which operator runs first? Parentheses as the golden rule for clarity',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Think of a busy emergency traffic intersection with ambulances, public buses, and regular commuters. An ambulance with sirens blaring (Parentheses ()) has supreme priority and clears the intersection first regardless of other rules. Traffic signals (Multiplicative *, /, %) take precedence over standard yield signs (Additive +, -). Meanwhile, the loading dock workers unloading freight into a warehouse (Assignment =, +=) only begin their job after all traffic on the street has completely cleared.',
    coreExplanation: [
      'Precedence vs Associativity: Precedence dictates which operators bind to operands first when multiple distinct operators compete in an expression (e.g. * before +). Associativity dictates whether operators of equal precedence evaluate from Left-to-Right or Right-to-Left.',
      'The Precedence Hierarchy: (1) Parentheses () and postfix ++/--; (2) Unary prefix (++expr, --expr, +, -, !, ~); (3) Multiplicative (*, /, %); (4) Additive (+, -); (5) Shift (<<, >>, >>>); (6) Relational (<, >, <=, >=, instanceof); (7) Equality (==, !=); (8) Bitwise AND (&); (9) Bitwise XOR (^); (10) Bitwise OR (|); (11) Logical AND (&&); (12) Logical OR (||); (13) Ternary (?:); (14) Assignment (=, +=, -=...).',
      'Left-to-Right Operand Evaluation: In Java, operands are strictly evaluated from left to right, even before operator precedence is applied. Java computes the left-hand sub-expression before computing the right-hand sub-expression.',
      'Right-to-Left Associativity: Three categories associate from Right-to-Left: (1) Unary operators (++x, !x, ~x); (2) Ternary operator (a ? b : c ? d : e); (3) All assignment operators (a = b = c = 10).',
      'Logical AND (&&) Precedes Logical OR (||): In "a || b && c", Java always evaluates "b && c" before evaluating the OR. It is NOT evaluated strictly left to right.',
      'Relational and Equality Precede Bitwise: Relational (<, >) and Equality (==, !=) have higher precedence than bitwise operators (&, ^, |). This creates the infamous trap: "val & 1 == 0" parses as "val & (1 == 0)", which fails to compile!',
      'String Concatenation Overload: The + operator is left-associative. In "\"Result: \" + 10 + 20", the left addition creates "\"Result: 10\"", and then adds 20 to produce "\"Result: 1020\"" instead of "\"Result: 30\"".',
      'The Golden Industry Rule: Never force your teammates or code reviewers to consult a precedence table. When in doubt, ALWAYS use explicit parentheses () to convey intent, prevent bugs, and improve readability.'
    ],
    diagram: `+-------------------------------------------------------------------------+
|                  JAVA OPERATOR PRECEDENCE HIERARCHY                     |
+-------+-----------------------------+--------------------+--------------+
| LEVEL | OPERATORS                   | DESCRIPTION        | ASSOCIATIVITY|
+-------+-----------------------------+--------------------+--------------+
| 1     | () [] . expr++ expr--       | Grouping & Postfix | Left-to-Right|
| 2     | ++expr --expr +expr -expr ! ~| Unary Prefix       | Right-to-Left|
| 3     | * / %                       | Multiplicative     | Left-to-Right|
| 4     | + -                         | Additive           | Left-to-Right|
| 5     | << >> >>>                   | Bitwise Shifts     | Left-to-Right|
| 6     | < > <= >= instanceof        | Relational         | Left-to-Right|
| 7     | == !=                       | Equality           | Left-to-Right|
| 8     | &                           | Bitwise AND        | Left-to-Right|
| 9     | ^                           | Bitwise XOR        | Left-to-Right|
| 10    | |                           | Bitwise OR         | Left-to-Right|
| 11    | &&                          | Logical AND        | Left-to-Right|
| 12    | ||                          | Logical OR         | Left-to-Right|
| 13    | ?:                          | Ternary            | Right-to-Left|
| 14    | = += -= *= /= %= &= ^= |=   | Assignment (Lowest)| Right-to-Left|
+-------+-----------------------------+--------------------+--------------+

STEP-BY-STEP TRACE: 10 + 5 * 2
  Step 1: Multiplication has higher precedence than Addition (* > +)
          5 * 2 = 10
  Step 2: Addition runs with result
          10 + 10 = 20 (NOT (10 + 5) * 2 = 30!)

STEP-BY-STEP TRACE: a = b = c = 5 (Right-to-Left Associativity)
  Step 1: c = 5
  Step 2: b = c (b becomes 5)
  Step 3: a = b (a becomes 5)`,
    codeSnippet: {
      title: 'Tracing Evaluation Order and Precedence Pitfalls',
      code: `public class PrecedenceFundamentals {
    public static void main(String[] args) {
        // 1. Multiplicative vs Additive
        int result1 = 10 + 20 * 2;
        int result2 = (10 + 20) * 2;
        System.out.println("10 + 20 * 2: " + result1);   // 50
        System.out.println("(10 + 20) * 2: " + result2); // 60

        // 2. Logical AND (&&) vs Logical OR (||)
        boolean b1 = true || false && false;
        // Parsed as: true || (false && false) -> true || false -> true!
        System.out.println("true || false && false: " + b1);

        // 3. String concatenation precedence
        System.out.println("Total: " + 10 + 20);   // "Total: 1020"
        System.out.println("Total: " + (10 + 20)); // "Total: 30"
    }
}`,
      lineByLineExplanation: [
        { line: 'int result1 = 10 + 20 * 2;', explanation: 'Multiplication (*) runs before addition (+): 20 * 2 = 40, then 10 + 40 = 50.' },
        { line: 'int result2 = (10 + 20) * 2;', explanation: 'Parentheses override default precedence, forcing 10 + 20 = 30 first, then 30 * 2 = 60.' },
        { line: 'boolean b1 = true || false && false;', explanation: '&& has higher precedence than ||. Evaluates (false && false) = false, then true || false = true.' },
        { line: 'System.out.println("Total: " + 10 + 20);', explanation: '+ associates left-to-right: "Total: 10" is formed first, then concatenated with 20.' },
        { line: 'System.out.println("Total: " + (10 + 20));', explanation: 'Parentheses force numeric addition 10 + 20 = 30 before string concatenation.' }
      ],
      output: `10 + 20 * 2: 50
(10 + 20) * 2: 60
true || false && false: true
Total: 1020
Total: 30`
    },
    codeExamples: [
      {
        title: 'Example 1: Unary Prefix, Postfix, and Arithmetic Precedence',
        description: 'Observing how postfix and prefix increments interact with arithmetic operators.',
        code: `public class UnaryArithmeticPrecedence {
    public static void main(String[] args) {
        int x = 5;
        // Postfix x++ evaluates to original 5 for multiplication, then x increments to 6
        int res1 = 2 * x++;
        System.out.println("res1 (2 * x++): " + res1 + ", x is now: " + x);

        int y = 5;
        // Prefix ++y increments y to 6 first, then evaluates 2 * 6 = 12
        int res2 = 2 * ++y;
        System.out.println("res2 (2 * ++y): " + res2 + ", y is now: " + y);
    }
}`,
        output: `res1 (2 * x++): 10, x is now: 6
res2 (2 * ++y): 12, y is now: 6`
      },
      {
        title: 'Example 2: The Infamous Bitwise AND vs Equality Trap',
        description: 'Demonstrating why parentheses are essential when combining bitwise masks with equality checks.',
        code: `public class BitwiseEqualityTrap {
    public static void main(String[] args) {
        int flags = 4; // 0100 in binary

        // WRONG: flags & 4 == 4 causes compile error because == binds tighter than &!
        // It tries to evaluate: flags & (4 == 4) -> flags & true (illegal!)

        // CORRECT: Use parentheses to force bitwise operation first:
        boolean isFlagActive = (flags & 4) == 4;
        System.out.println("Is flag active? " + isFlagActive);

        int number = 18;
        boolean isEven = (number & 1) == 0;
        System.out.println("Is 18 even? " + isEven);
    }
}`,
        output: `Is flag active? true
Is 18 even? true`
      },
      {
        title: 'Example 3: Right-to-Left Associativity in Assignment and Ternary',
        description: 'Observing how assignment chains and nested ternary operators evaluate right-to-left.',
        code: `public class RightToLeftAssociativity {
    public static void main(String[] args) {
        int a, b, c;
        // Chained assignment associates Right-to-Left:
        // c = 100, then b = c (100), then a = b (100)
        a = b = c = 100;
        System.out.println("a: " + a + ", b: " + b + ", c: " + c);

        // Nested Ternary associates Right-to-Left:
        // condition1 ? val1 : (condition2 ? val2 : val3)
        int score = 85;
        String grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
        System.out.println("Score " + score + " Grade: " + grade);
    }
}`,
        output: `a: 100, b: 100, c: 100
Score 85 Grade: B`
      }
    ],
    cheatSheet: {
      summary: 'Operator precedence determines which operators bind to operands first. Postfix and unary prefix operators rank highest, followed by arithmetic (* / % then + -), shifts, relational, equality, bitwise, logical (&& then ||), ternary, and assignment. When in doubt, use parentheses () to ensure clarity.',
      syntaxTemplate: `// High to Low Precedence Checklist:
// 1. Parentheses:        (a + b)
// 2. Unary:              ++a, --a, !a, ~a
// 3. Multiplicative:     a * b, a / b, a % b
// 4. Additive:           a + b, a - b
// 5. Shift:              a << 1, a >> 1
// 6. Relational:         a < b, a >= b, a instanceof Type
// 7. Equality:           a == b, a != b
// 8. Bitwise:            a & b, a ^ b, a | b
// 9. Logical:            a && b, a || b
// 10. Ternary:           a ? b : c
// 11. Assignment:        a = b, a += b`,
      rules: [
        { rule: 'Parentheses Rule Supreme', explanation: 'Parentheses () have highest priority and explicitly override any default precedence.' },
        { rule: '&& Beats ||', explanation: 'Logical AND (&&) has strictly higher precedence than Logical OR (||).' },
        { rule: '== Beats Bitwise (&, |, ^)', explanation: 'Equality binds tighter than bitwise operators: always write (val & mask) == expected.' },
        { rule: 'Left-to-Right Evaluation', explanation: 'Java operands are strictly evaluated from left to right before operator application.' },
        { rule: 'Right-to-Left Assignments', explanation: 'Chained assignments (a = b = c = 0) evaluate from right to left.' },
        { rule: 'String Concatenation Trap', explanation: 'String + int + int evaluates as ("Text" + a) + b. Use parentheses: "Text" + (a + b).' }
      ],
      quickComparison: [
        { aspect: 'Precedence vs Associativity', optionA: 'Precedence: which operator executes first (* vs +)', optionB: 'Associativity: direction of evaluation when precedence is equal (left-to-right vs right-to-left)' },
        { aspect: '&& vs ||', optionA: '&&: higher precedence, evaluated before ||', optionB: '||: lower precedence, evaluated after &&' },
        { aspect: 'Prefix (++x) vs Postfix (x++)', optionA: 'Prefix: increments first, then yields new value', optionB: 'Postfix: yields original value first, then increments' },
        { aspect: 'Assignment (=) vs Equality (==)', optionA: '==: Relational test (high precedence)', optionB: '=: Value assignment (lowest precedence, right-to-left)' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Writing "System.out.println(\"Sum: \" + 5 + 10);" expecting "Sum: 15".',
        whyItHappens: '+ is left-associative. First "Sum: " + 5 produces "Sum: 5", then "Sum: 5" + 10 produces "Sum: 510".',
        howToFix: 'Wrap numeric calculations in parentheses: "\"Sum: \" + (5 + 10)".'
      },
      {
        mistake: 'Assuming "a || b && c" is evaluated left to right as "(a || b) && c".',
        whyItHappens: 'Forgetting that && has higher precedence than || in Java.',
        howToFix: 'Remember that "a || b && c" is grouped as "a || (b && c)". Always use explicit parentheses to avoid ambiguity.'
      },
      {
        mistake: 'Writing "(val & 1 == 0)" without wrapping "(val & 1)".',
        whyItHappens: 'Equality (==) has higher precedence than bitwise AND (&). The compiler attempts to evaluate "1 == 0" (boolean) and AND it with val (int), causing a compile error.',
        howToFix: 'Always enclose bitwise expressions in parentheses: "((val & 1) == 0)".'
      },
      {
        mistake: 'Writing clever, unreadable one-liners relying on obscure precedence rules.',
        whyItHappens: 'Trying to minimize lines of code rather than optimizing for human readability and maintainability.',
        howToFix: 'Follow industry best practice: break expressions into separate statements or use explicit parentheses.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Basic Arithmetic Precedence',
        problemStatement: 'What is the value of result after evaluating this expression?',
        code: `int result = 10 + 5 * 2;
System.out.println(result);`,
        options: ['30', '20', '25', '17'],
        correctOptionIndex: 1,
        hint: 'Multiplication (*) has higher precedence than addition (+).',
        solution: '20',
        explanation: '5 * 2 = 10 is evaluated first. Then 10 + 10 = 20.'
      },
      {
        title: 'Puzzle 2: Left-Associative Division and Multiplication',
        problemStatement: 'What does this integer division and multiplication print?',
        code: `int val = 20 / 4 * 2;
System.out.println(val);`,
        options: ['2', '10', '2.5', '0'],
        correctOptionIndex: 1,
        hint: '/ and * have equal precedence and are evaluated from left to right.',
        solution: '10',
        explanation: 'Both / and * share equal precedence and associate left-to-right: 20 / 4 = 5, then 5 * 2 = 10.'
      },
      {
        title: 'Puzzle 3: Unary Prefix Increment Combined with Multiplication',
        problemStatement: 'Trace the output of this expression involving prefix increment:',
        code: `int x = 3;
int res = 2 * ++x;
System.out.println(res);`,
        options: ['6', '8', '7', '9'],
        correctOptionIndex: 1,
        hint: 'Prefix ++x increments x from 3 to 4 before the multiplication occurs.',
        solution: '8',
        explanation: '++x increments x to 4 immediately. Then 2 * 4 = 8.'
      },
      {
        title: 'Puzzle 4: Postfix Increment in Arithmetic',
        problemStatement: 'What is printed when using postfix increment here?',
        code: `int a = 5;
int b = a++ + 10;
System.out.println(b + " " + a);`,
        options: ['15 6', '16 6', '15 5', '16 5'],
        correctOptionIndex: 0,
        hint: 'Postfix a++ delivers the original value (5) to the addition, then increments a to 6.',
        solution: '15 6',
        explanation: 'a++ evaluates to 5 for the addition: 5 + 10 = 15. Afterward, a is incremented to 6. Output is "15 6".'
      },
      {
        title: 'Puzzle 5: Relational and Equality Operator Precedence',
        problemStatement: 'What is the boolean result of this expression?',
        code: `boolean test = 10 + 2 > 8 == true;
System.out.println(test);`,
        options: ['true', 'false', 'Compiler Error', 'Runtime Exception'],
        correctOptionIndex: 0,
        hint: '+ has higher precedence than >, which has higher precedence than ==.',
        solution: 'true',
        explanation: 'First: 10 + 2 = 12. Next: 12 > 8 is true. Finally: true == true is true.'
      },
      {
        title: 'Puzzle 6: Logical AND vs Logical OR Precedence',
        problemStatement: 'What does this boolean expression evaluate to?',
        code: `boolean res = true || false && false;
System.out.println(res);`,
        options: ['false', 'true', 'Compiler Error', 'NullPointerException'],
        correctOptionIndex: 1,
        hint: 'Logical AND (&&) has higher precedence than Logical OR (||).',
        solution: 'true',
        explanation: '&& binds tighter: (false && false) = false. Then true || false evaluates to true.'
      },
      {
        title: 'Puzzle 7: Chained Right-to-Left Assignment',
        problemStatement: 'What values do variables p, q, and r hold?',
        code: `int p, q, r;
p = q = r = 7;
p += q += r;
System.out.println(p + " " + q + " " + r);`,
        options: ['21 14 7', '14 14 7', '21 7 7', '7 7 7'],
        correctOptionIndex: 0,
        hint: 'Assignment operators associate right-to-left: first q += r, then p += q.',
        solution: '21 14 7',
        explanation: 'Initially p=7, q=7, r=7. Right-to-left: q += r makes q = 7 + 7 = 14. Then p += q makes p = 7 + 14 = 21. r remains 7.'
      },
      {
        title: 'Puzzle 8: Bitwise AND Precedence with Addition',
        problemStatement: 'What is printed by this expression mixing + and &?',
        code: `int val = 1 + 2 & 3;
System.out.println(val);`,
        options: ['1', '3', '0', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: 'Addition (+) has higher precedence than bitwise AND (&).',
        solution: '3',
        explanation: 'Addition runs first: 1 + 2 = 3. Then 3 & 3 = 3.'
      },
      {
        title: 'Puzzle 9: String Concatenation Left-Associativity Trap',
        problemStatement: 'What does the following print to the console?',
        code: `int x = 4;
int y = 6;
System.out.println("Result: " + x + y);`,
        options: ['Result: 10', 'Result: 46', 'Result: 4 6', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: '+ is left-associative. String + int produces String, which then concatenates with the next int.',
        solution: 'Result: 46',
        explanation: '"Result: " + 4 produces "Result: 4". Then "Result: 4" + 6 produces "Result: 46".'
      },
      {
        title: 'Puzzle 10: Ternary Operator Right-to-Left Associativity',
        problemStatement: 'What is the output of this nested ternary expression?',
        code: `int score = 75;
String outcome = score >= 90 ? "Excellent" : score >= 70 ? "Pass" : "Fail";
System.out.println(outcome);`,
        options: ['Excellent', 'Pass', 'Fail', 'Compiler Error'],
        correctOptionIndex: 1,
        hint: 'Ternary associates right-to-left: score >= 90 ? "Excellent" : (score >= 70 ? "Pass" : "Fail").',
        solution: 'Pass',
        explanation: 'score >= 90 is false. The false branch (score >= 70 ? "Pass" : "Fail") executes. 75 >= 70 is true, returning "Pass".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between operator precedence and operator associativity in Java?',
        answer: 'Precedence determines which operator is bound to operands first when different operators with different priority levels appear in the same expression (e.g. * has higher precedence than +, so multiplication happens first). Associativity determines the direction (Left-to-Right or Right-to-Left) in which operators of the SAME precedence level are grouped and executed. For example, 10 - 5 - 2 associates Left-to-Right as (10 - 5) - 2 = 3, whereas assignment a = b = 5 associates Right-to-Left.',
        followUp: 'Which operators in Java associate from Right-to-Left?',
        followUpAnswer: 'Three groups associate Right-to-Left: (1) Unary prefix operators (++x, --x, +x, -x, !x, ~x); (2) The conditional ternary operator (?:); (3) All assignment operators (=, +=, -=, *=, /=, %=, &=, ^=, |=, <<=, >>=, >>>=).',
        keyPhrases: ['precedence dictates operator ranking', 'associativity dictates grouping direction', 'left-to-right vs right-to-left', 'assignment is right-to-left'],
        commonMistakeAnswer: 'Confusing precedence with order of operand evaluation.'
      },
      {
        question: 'Between logical AND (&&) and logical OR (||), which operator has higher precedence, and why does this matter?',
        answer: 'Logical AND (&&) has higher precedence than Logical OR (||). In an expression like "a || b && c", Java groups it as "a || (b && c)", NOT "(a || b) && c". This is critical because if a developer mistakenly assumes left-to-right evaluation, their boolean security or business condition might evaluate to true when they expected false, creating subtle logic bugs.',
        followUp: 'How does short-circuit evaluation interact with precedence in "a || b && c"?',
        followUpAnswer: 'If "a" is true, the entire expression short-circuits to true immediately! Even though && has higher precedence, the || operator\'s left operand is true, so the right-hand operand (b && c) is never evaluated.',
        keyPhrases: ['&& beats ||', 'grouped as a || (b && c)', 'short-circuit evaluation bypasses right side', 'security check logic trap'],
        commonMistakeAnswer: 'Thinking && and || have equal precedence and evaluate strictly from left to right.'
      },
      {
        question: 'What is the order of operand evaluation in Java, and how does it differ from operator precedence?',
        answer: 'Operator precedence determines how operators group with operands, but Java strictly guarantees that OPERANDS are evaluated from Left to Right. In expression "f() + g() * h()", Java evaluates f() first, then g(), then h(), and only then performs the multiplication of g() and h(), followed by adding f(). The left-to-right evaluation of expressions and method arguments is guaranteed by the JLS.',
        followUp: 'Can you show an example where left-to-right operand evaluation matters?',
        followUpAnswer: 'Consider: int x = 1; int result = x + (++x * 2);. Left operand x is evaluated first (yielding 1). Then (++x * 2) evaluates ++x (x becomes 2, yielding 2 * 2 = 4). Final result: 1 + 4 = 5.',
        keyPhrases: ['operands evaluate left-to-right', 'precedence determines grouping not execution sequence', 'side effects evaluate in order', 'JLS guarantee'],
        commonMistakeAnswer: 'Believing higher precedence operators cause their operands to be evaluated first.'
      },
      {
        question: 'Why does "System.out.println(\"Total: \" + 10 + 20);" print "Total: 1020" instead of "Total: 30"?',
        answer: 'The addition operator (+) is overloaded in Java: when either operand is a String, it performs string concatenation. Furthermore, + is left-associative. Evaluation proceeds from left to right: first, "Total: " + 10 evaluates to the String "Total: 10". Then, "Total: 10" + 20 concatenates 20, resulting in "Total: 1020". To get "Total: 30", parentheses must be added: "Total: " + (10 + 20).',
        followUp: 'What would "System.out.println(10 + 20 + \" Total\");" print and why?',
        followUpAnswer: 'It prints "30 Total"! Left-to-right evaluation starts with 10 + 20, which are both integers, performing arithmetic addition (30). Then 30 + " Total" performs string concatenation, yielding "30 Total".',
        keyPhrases: ['left-associative + operator', 'string concatenation vs numeric addition', 'parentheses override', 'left-to-right evaluation'],
        commonMistakeAnswer: 'Thinking Java automatically treats all numbers in println as arithmetic before converting to String.'
      },
      {
        question: 'Why does the expression "(val & 1 == 0)" fail to compile in Java?',
        answer: 'In Java\'s precedence hierarchy, equality operators (==, !=) have higher precedence than bitwise operators (&, ^, |). Therefore, the compiler attempts to evaluate "1 == 0" first, which yields a boolean (false). It then tries to evaluate "val & false". Because & between an int and a boolean is illegal in Java, the compiler halts with an error: "bad operand types for binary operator &".',
        followUp: 'How must this expression be written to compile and work properly?',
        followUpAnswer: 'You must wrap the bitwise expression in parentheses: "((val & 1) == 0)". This forces the bitwise operation (val & 1) to evaluate to an integer first, which is then compared against 0.',
        keyPhrases: ['equality binds tighter than bitwise', 'val & false type error', 'parentheses mandatory for bitwise checks', 'operator ranking'],
        commonMistakeAnswer: 'Assuming bitwise operators execute before equality operators.'
      },
      {
        question: 'How does postfix increment (x++) differ from prefix increment (++x) in operator precedence?',
        answer: 'Postfix increment (x++) belongs to Level 1 (highest precedence alongside parentheses () and array access []), whereas prefix increment (++x) belongs to Level 2 (unary prefix operators). In terms of semantics, postfix x++ evaluates to the variable\'s CURRENT value in the enclosing expression before incrementing, whereas prefix ++x increments the variable FIRST and evaluates to the NEW value.',
        followUp: 'What is the value of: int a = 5; a = a++; ?',
        followUpAnswer: 'a remains 5! In "a = a++;", the right-hand side evaluates the postfix expression: it remembers the current value 5, then increments a to 6 in memory, but then the assignment operator (=) writes the remembered value 5 back into a, overwriting 6!',
        keyPhrases: ['postfix Level 1 vs prefix Level 2', 'current value vs new value', 'a = a++ overwrite trap', 'evaluation semantics'],
        commonMistakeAnswer: 'Thinking a = a++ results in 6.'
      },
      {
        question: 'What is the precedence of the ternary operator (?:) relative to logical and assignment operators?',
        answer: 'The conditional ternary operator (?:) sits near the bottom of the precedence hierarchy: it is lower than logical OR (||) and logical AND (&&), but higher than assignment operators (=, +=). It associates from Right-to-Left, allowing nested ternary operators without extra parentheses: a ? b : c ? d : e is parsed as a ? b : (c ? d : e).',
        followUp: 'Why do most style guides discourage deeply nested ternary expressions?',
        followUpAnswer: 'Because nested ternaries become difficult for humans to read, trace, and debug, increasing the likelihood of off-by-one or logic errors. A clean if-else if ladder or switch expression is preferred for readability.',
        keyPhrases: ['lower than || and &&', 'higher than assignment', 'right-to-left associativity', 'readability over conciseness'],
        commonMistakeAnswer: 'Assuming ternary associates left-to-right.'
      },
      {
        question: 'Why does "a = b = c = 10" work in Java, and what does it return?',
        answer: 'Assignment operators in Java are expressions that return the assigned value, and they associate from Right-to-Left. In "a = b = c = 10;", the rightmost assignment "c = 10" executes first and evaluates to 10. Next, "b = 10" executes and evaluates to 10. Finally, "a = 10" executes. All three variables end up holding 10.',
        followUp: 'What happens in "int a = 5; int b = (a += 3) * 2;"?',
        followUpAnswer: 'Parentheses force (a += 3) first: a becomes 8 and the expression evaluates to 8. Then 8 * 2 = 16 is assigned to b. After this line, a is 8 and b is 16.',
        keyPhrases: ['assignment returns assigned value', 'right-to-left associativity', 'compound assignment in expressions', 'chain assignment'],
        commonMistakeAnswer: 'Thinking chained assignment is illegal in Java.'
      },
      {
        question: 'What is the Golden Rule of operator precedence in professional software engineering?',
        answer: 'The Golden Rule is: "Never rely on subtle operator precedence rules for code correctness; always use parentheses () to make intent explicitly clear." While memorizing precedence tables is helpful for exams and interviews, writing code that depends on obscure precedence rankings makes code brittle, confusing to teammates, and prone to maintenance regressions. Code readability and maintainability always trump cleverness.',
        followUp: 'Does adding extra parentheses impact runtime performance in Java?',
        followUpAnswer: 'No, zero overhead. Parentheses only instruct the compiler on how to construct the Abstract Syntax Tree (AST). The generated bytecode is identical, so parentheses carry zero runtime CPU or memory cost.',
        keyPhrases: ['explicit parentheses', 'readability and maintainability', 'zero runtime bytecode overhead', 'prevent maintenance bugs'],
        commonMistakeAnswer: 'Thinking that adding parentheses slows down the Java program.'
      },
      {
        question: 'How do relational operators (<, >, <=, >=) compare in precedence to equality operators (==, !=)?',
        answer: 'Relational operators (<, >, <=, >=) have higher precedence than equality operators (==, !=). For example, in expression "a > b == c > d", Java first evaluates "a > b" (producing a boolean) and "c > d" (producing a boolean), and then evaluates whether those two boolean results are equal with "==". This allows intuitive comparisons like "score >= 60 == isPassing".',
        followUp: 'Can you chain relational operators like "1 < x < 10" in Java?',
        followUpAnswer: 'No, that causes a compile error! In Java, "1 < x < 10" evaluates left-to-right as "(1 < x) < 10". Since (1 < x) yields a boolean, Java then attempts "boolean < 10", which is illegal. You must write "(1 < x) && (x < 10)".',
        keyPhrases: ['relational precedes equality', 'no chained relational comparisons', 'boolean cannot be compared with numbers', 'use && for ranges'],
        commonMistakeAnswer: 'Thinking Java supports mathematical interval chaining like 1 < x < 10.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of the expression: 12 + 6 / 2 * 3?',
        options: ['21', '27', '15', '9'],
        correctIndex: 0,
        explanation: '/ and * have equal precedence and evaluate left-to-right: 6 / 2 = 3; 3 * 3 = 9. Then 12 + 9 = 21.'
      },
      {
        question: 'Which of the following operators has the HIGHEST precedence in Java?',
        options: ['*', '==', '++', '&&'],
        correctIndex: 2,
        explanation: 'Increment/decrement operators (Level 1/2) have higher precedence than arithmetic, equality, and logical operators.'
      },
      {
        question: 'Which of the following operators associates from RIGHT-TO-LEFT?',
        options: ['+', '*', '=', '&&'],
        correctIndex: 2,
        explanation: 'Assignment operators (=, +=, etc.) associate from right to left.'
      },
      {
        question: 'What is the value of: boolean b = false || true && false; ?',
        options: ['true', 'false', 'Compilation Error', 'Runtime Exception'],
        correctIndex: 1,
        explanation: '&& has higher precedence than ||. true && false is false. Then false || false is false.'
      },
      {
        question: 'What does "System.out.println(1 + 2 + "3" + 4 + 5);" print?',
        options: ['15', '3345', '12345', '339'],
        correctIndex: 1,
        explanation: '1 + 2 is arithmetic (3). 3 + "3" is string ("33"). "33" + 4 is "334". "334" + 5 is "3345".'
      },
      {
        question: 'What happens when compiling: int x = 5 & 1 == 1; ?',
        options: [
          'Compiles and sets x = 1',
          'Compiles and sets x = 0',
          'Compile-time error: bad operand types for binary operator & (int and boolean)',
          'Throws ArithmeticException'
        ],
        correctIndex: 2,
        explanation: '== has higher precedence than &, so Java tries to evaluate 5 & (1 == 1), which is 5 & true (illegal!).'
      },
      {
        question: 'What is the value of x after: int x = 10; x += x -= 2; ?',
        options: ['16', '18', '20', '8'],
        correctIndex: 1,
        explanation: 'Associates right-to-left with left operand evaluation: x is evaluated for += (10), then x -= 2 makes x = 8. Finally 10 + 8 = 18.'
      },
      {
        question: 'What is the value of: int res = (5 > 3 ? 1 : 2) + 10; ?',
        options: ['11', '12', '1', 'Compiler Error'],
        correctIndex: 0,
        explanation: 'Parentheses force the ternary first: 5 > 3 is true, yielding 1. Then 1 + 10 = 11.'
      },
      {
        question: 'In Java, in what order are method call arguments and operands evaluated?',
        options: ['Right-to-Left', 'Left-to-Right', 'Highest precedence first', 'Random order by JVM'],
        correctIndex: 1,
        explanation: 'The Java Language Specification guarantees that operands and arguments are strictly evaluated Left-to-Right.'
      },
      {
        question: 'What is the industry best practice regarding operator precedence in production code?',
        options: [
          'Omit all parentheses to minimize character count',
          'Use parentheses explicitly whenever mixing different operator levels to ensure clarity',
          'Only use parentheses for mathematical division',
          'Rely strictly on default precedence tables'
        ],
        correctIndex: 1,
        explanation: 'Using explicit parentheses eliminates ambiguity, prevents maintenance bugs, and maximizes code readability.'
      }
    ]
  }
};
