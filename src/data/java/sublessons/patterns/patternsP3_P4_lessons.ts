import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE P3 & P4: PATTERN PROGRAMS & LOGIC BUILDING (PART 2)
// Character & Alphabet Patterns, Matrix Traversals & Inward Spirals
// ============================================================

export const patternsP3_P4_lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON P3.1: Character & Alphabet Pattern Logic
  // ─────────────────────────────────────────────────────────────
  'character-alphabet-patterns': {
    id: 'character-alphabet-patterns',
    moduleId: 'java-patterns',
    moduleTitle: '6. Pattern Programs & Logic Building',
    lessonNumber: 'Lesson 6.3',
    title: 'Character & Alphabet Pattern Logic',
    subtitle: 'ASCII / Unicode char arithmetic (char c = (char)(\'A\' + j)), contiguous alphabetic triangles, palindromic character pyramids, hollow character diamonds, and cyclical character grids',
    estimatedMinutes: 35,
    beginnerAnalogy: 'Think of character pattern printing like typing with an old-school rotating wheel typewriter or a Caesar cipher ring. The characters \'A\' through \'Z\' are not mysterious visual drawings; to the CPU, they are simply integer numbers from 65 to 90 wearing typographical clothing! When you add 1 to \'A\', the machine computes 65 + 1 = 66, and when you view 66 through character goggles, it renders as \'B\'. Whether constructing contiguous alphabet steps, palindromic letter pyramids (A, ABA, ABCBA), or rotating cipher grids that wrap smoothly around from \'Z\' back to \'A\' using modulo 26 arithmetic, character patterns are simply numerical series in alphabetic attire.',
    interviewTakeaways: [
      'Binary Numeric Promotion in Char Arithmetic: In Java, adding an integer to a char (e.g., \'A\' + 1) promotes the char to a 32-bit int. An explicit downcast `(char)(\'A\' + j)` is mandatory to prevent compile errors.',
      'Compound Assignment Auto-Cast: Unlike `c = c + 1`, compound assignments like `c++` or `c += 1` automatically inject an implicit cast `(char)(c + 1)` in Java bytecode.',
      'Contiguous vs Repeating Alphabetic Traversal: Iterating over columns with `(char)(\'A\' + j)` yields a contiguous sequence (A, B, C), while mapping from the row index `(char)(\'A\' + i)` yields repeating character rows (A, BB, CCC).',
      'Palindromic Alphabet Decomposition: Palindromic letter pyramids require a three-stage line assembly: leading spaces (n - i), ascending letters (\'A\' up to \'A\' + i - 1), and descending letters (\'A\' + i - 2 down to \'A\').',
      'Cyclic Wrap-Around with Modulo 26: Infinite alphabetic grids and Caesar cipher matrices wrap from \'Z\' back to \'A\' using the formula `(char)(\'A\' + ((startOffset + col) % 26))`.',
      'Character Memory and UTF-16: Java primitive `char` is an unsigned 16-bit type (0 to 65535) representing UTF-16 code units. ASCII upper-case letters occupy code points 65 (\'A\') to 90 (\'Z\'), and lowercase 97 (\'a\') to 122 (\'z\').'
    ],
    cheatSheet: {
      summary: 'Characters are 16-bit integers in Java. Use char arithmetic for letter generation, modulo 26 for cyclic wrap-around, and split loops for palindromic alphabetic pyramids.',
      syntaxTemplate: `// 1. Contiguous Alphabet Triangle
for (int i = 0; i < n; i++) {
    for (int j = 0; j <= i; j++) {
        System.out.print((char)('A' + j) + " ");
    }
    System.out.println();
}

// 2. Cyclical Alphabet Grid
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        char ch = (char)('A' + (i + j) % 26);
        System.out.print(ch + " ");
    }
    System.out.println();
}`,
      rules: [
        { rule: 'Binary Numeric Promotion', explanation: 'Operations on char with int yield int. An explicit (char) cast is required: (char)(\'A\' + k).' },
        { rule: 'ASCII Offset Values', explanation: '\'A\' is 65, \'Z\' is 90, \'a\' is 97, \'z\' is 122. Case conversion difference is 32 (\'a\' - \'A\' == 32).' },
        { rule: 'Cyclic Wrap with Modulo 26', explanation: 'To wrap from Z to A, use (char)(\'A\' + (index % 26)).' },
        { rule: 'Palindromic Letter Peak', explanation: 'In palindromic pyramids of height i, the peak character is (char)(\'A\' + i - 1).' },
        { rule: 'Pre-increment vs Post-increment in Char', explanation: 'char ch = \'A\'; System.out.print(ch++) prints A and advances ch to B.' }
      ],
      quickComparison: [
        { aspect: 'Contiguous Row', optionA: 'Inner loop variable j', optionB: 'Produces: A, B, C, D...' },
        { aspect: 'Repeating Row', optionA: 'Outer loop variable i', optionB: 'Produces: A, BB, CCC, DDDD...' },
        { aspect: 'Palindromic Apex', optionA: 'Ascending: A to peak', optionB: 'Descending: (peak-1) down to A' },
        { aspect: 'Case Conversion', optionA: 'Upper to lower: (char)(c + 32)', optionB: 'Lower to upper: (char)(c - 32)' },
        { aspect: 'Hollow Alphabet Diamond', optionA: 'Leading spaces: n - i', optionB: 'Inner char at boundaries only' }
      ]
    },
    coreExplanation: [
      'The Mechanics of Char in Java: Under the Java Virtual Machine Specification (JVMS), primitive `char` is an unsigned 16-bit integer capable of storing Unicode values from `\\u0000` (0) to `\\uffff` (65,535). When evaluating an expression like `\'A\' + 1`, the Java compiler applies Binary Numeric Promotion (JLS §5.6.2): both operands are widened to 32-bit `int`, yielding the integer `66`. Trying to store this directly into a `char` without a cast produces a compilation error: `incompatible types: possible lossy conversion from int to char`. Therefore, `(char)(\'A\' + offset)` is the fundamental idiom.',
      'Contiguous vs Homogeneous Alphabetic Triangles: 1) Contiguous Triangles: The inner column loop index j controls the character offset: `System.out.print((char)(\'A\' + j))`. Each row begins with \'A\' and advances through the alphabet. 2) Homogeneous (Repeating) Triangles: The outer row loop index i controls the character: `System.out.print((char)(\'A\' + i))`. Every character across a given row is identical: Row 0 is \'A\', Row 1 is \'B B\', Row 2 is \'C C C\'.',
      'The Anatomy of the Palindromic Alphabet Pyramid: A palindromic character pyramid (e.g. Row 3: `  A B C B A  `) requires combining space centering with two symmetric character streams: 1) Emit `n - i - 1` leading spaces. 2) Ascending loop: iterate `j = 0 to i`, printing `(char)(\'A\' + j)`. 3) Descending loop: iterate `j = i - 1 down to 0`, printing `(char)(\'A\' + j)`. Notice the descending loop starts at `i - 1` to ensure the apex character `(char)(\'A\' + i)` appears once.',
      'Hollow Alphabet Diamond: In competitive interviews, candidates are often challenged to print a hollow alphabet diamond where each row is framed by the corresponding letter (Row 1: `A`, Row 2: `B   B`, Row 3: `C     C`, Row 2: `B   B`, Row 1: `A`). The upper half for row i (0 to n - 1): print `n - 1 - i` leading spaces, print `(char)(\'A\' + i)`. If `i > 0`, print `2 * i - 1` middle spaces followed by `(char)(\'A\' + i)`. The lower half mirrors this symmetrically.',
      'Cyclical Alphabet Grids & Caesar Cipher Matrices: In cryptography and matrix puzzles, characters wrap around cyclically. In an N x N matrix, cell (i, j) can be assigned `(char)(\'A\' + (i + j) % 26)`. When `i + j >= 26`, the modulo operator wraps cleanly back to 0, turning what would have been non-alphabetic ASCII symbols (like \'[\', \'\\\', \']\') back into \'A\', \'B\', \'C\'.',
      'Alternating Case and Parity Transformations: Patterns combining upper and lowercase letters test both loop bounds and bitwise character manipulation. In ASCII, the only difference between an uppercase letter (e.g. \'A\' = 0b01000001 = 65) and its lowercase counterpart (\'a\' = 0b01100001 = 97) is bit 5 (value 32). Flipping case can be done via `(char)(c ^ 32)`. Alternating case on every column can be achieved via `(j % 2 == 0) ? (char)(\'A\' + j) : (char)(\'a\' + j)`.'
    ],
    diagram: `ALPHABET PATTERNS & ASCII TRANSFORMATION
========================================================================

1. ASCII VALUE MAPPING (65 to 90):
'A'  'B'  'C'  'D'  'E'  ...  'X'  'Y'  'Z'
 65   66   67   68   69        88   89   90

Char Arithmetic: (char)('A' + 0) = 'A', (char)('A' + 4) = 'E'

------------------------------------------------------------------------
2. PALINDROMIC ALPHABET PYRAMID (n = 4):
Row i  Spaces (n-1-i)  Ascending (0..i)  Descending (i-1..0)   Output Visual
------------------------------------------------------------------------
i = 0      3 (   )     A                 (none)                     A
i = 1      2 (  )      A B               A                         ABA
i = 2      1 ( )       A B C             B A                      ABCBA
i = 3      0 ()        A B C D           C B A                   ABCDCBA

------------------------------------------------------------------------
3. HOLLOW ALPHABET DIAMOND (n = 4):
Row i  Spaces (n-1-i)  Border Char  Middle Gap (2*i - 1)  Output Visual
------------------------------------------------------------------------
i = 0      3               A              0 (Apex)              A
i = 1      2               B              1                    B B
i = 2      1               C              3                   C   C
i = 3      0               D              5                  D     D
i = 2      1               C              3                   C   C
i = 1      2               B              1                    B B
i = 0      3               A              0 (Base)              A`,
    codeSnippet: {
      title: 'Palindromic Alphabet Pyramid & Hollow Alphabet Diamond',
      code: `public class AlphabetPatternsDemo {
    public static void printPalindromicPyramid(int n) {
        for (int i = 0; i < n; i++) {
            // Leading spaces
            for (int s = 0; s < n - 1 - i; s++) System.out.print("  ");
            // Ascending letters
            for (int j = 0; j <= i; j++) System.out.print((char)('A' + j) + " ");
            // Descending letters
            for (int j = i - 1; j >= 0; j--) System.out.print((char)('A' + j) + " ");
            System.out.println();
        }
    }

    public static void printHollowAlphabetDiamond(int n) {
        // Upper Half (0 to n - 1)
        for (int i = 0; i < n; i++) {
            for (int s = 0; s < n - 1 - i; s++) System.out.print(" ");
            System.out.print((char)('A' + i));
            if (i > 0) {
                for (int s = 0; s < 2 * i - 1; s++) System.out.print(" ");
                System.out.print((char)('A' + i));
            }
            System.out.println();
        }
        // Lower Half (n - 2 down to 0)
        for (int i = n - 2; i >= 0; i--) {
            for (int s = 0; s < n - 1 - i; s++) System.out.print(" ");
            System.out.print((char)('A' + i));
            if (i > 0) {
                for (int s = 0; s < 2 * i - 1; s++) System.out.print(" ");
                System.out.print((char)('A' + i));
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Palindromic Alphabet Pyramid (n = 4) ---");
        printPalindromicPyramid(4);
        System.out.println("--- Hollow Alphabet Diamond (n = 4) ---");
        printHollowAlphabetDiamond(4);
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 0; i < n; i++)', explanation: 'Iterates row index i from 0 to n - 1.' },
        { line: '(char)(\'A\' + j)', explanation: 'Calculates the character at column offset j from \'A\'.' },
        { line: 'for (int j = i - 1; j >= 0; j--)', explanation: 'Generates the descending reflection starting one character below the apex.' },
        { line: 'if (i > 0)', explanation: 'Only rows below the apex contain middle spaces and a second boundary character.' },
        { line: 'for (int s = 0; s < 2 * i - 1; s++) System.out.print(" ");', explanation: 'Calculates the widening gap between left and right boundary letters.' }
      ],
      output: `--- Palindromic Alphabet Pyramid (n = 4) ---
      A 
    A B A 
  A B C B A 
A B C D C B A 
--- Hollow Alphabet Diamond (n = 4) ---
   A
  B B
 C   C
D     D
 C   C
  B B
   A`
    },
    codeExamples: [
      {
        title: 'Alphabet Floyd’s Triangle',
        description: 'Floyd’s triangle using consecutive letters of the alphabet.',
        code: `public class AlphabetFloyd {
    public static void main(String[] args) {
        int n = 4;
        char ch = 'A';
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(ch++ + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `A 
B C 
D E F 
G H I J `
      },
      {
        title: 'Cyclic Caesar Grid',
        description: 'N x N matrix where each row is shifted cyclically across the 26 English letters.',
        code: `public class CyclicCaesarGrid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                char c = (char)('A' + (i + j) % 26);
                System.out.print(c + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `A B C D E 
B C D E F 
C D E F G 
D E F G H 
E F G H I `
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Writing char c = \'A\' + j without explicit cast (char).',
        whyItHappens: 'Java performs binary numeric promotion on char arithmetic, resulting in an int that cannot implicitly convert to char.',
        howToFix: 'Always wrap char arithmetic expressions in an explicit cast: `(char)(\'A\' + j)`.'
      },
      {
        mistake: 'Hardcoding 26 separate if-else statements for alphabet mapping.',
        whyItHappens: 'Beginners not familiar with ASCII integer values believe each letter must be individually checked with switch-case or if statements.',
        howToFix: 'Rely on the contiguous nature of ASCII uppercase letters: `\'A\' + offset` directly computes any letter.'
      },
      {
        mistake: 'Alphabet overflow producing punctuation symbols ([, \\, ], ^, _, `).',
        whyItHappens: 'Incrementing past \'Z\' (ASCII 90) moves into non-alphabetic ASCII characters rather than wrapping back to \'A\'.',
        howToFix: 'Use the modulo 26 operator: `(char)(\'A\' + ((totalOffset) % 26))` to ensure circular wrap-around.'
      },
      {
        mistake: 'Confusing \'a\' with \'A\' causing 32-value case displacement.',
        whyItHappens: 'Using lowercase \'a\' (ASCII 97) instead of uppercase \'A\' (ASCII 65) creates unintentional case shifts.',
        howToFix: 'Verify character literals: uppercase starts at \'A\', lowercase starts at \'a\'.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Char Arithmetic Type Promotion',
        problemStatement: 'What happens when compiling and executing the following code?',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        char ch = 'A';
        ch = ch + 1;
        System.out.println(ch);
    }
}`,
        options: [
            'A) Prints: B',
            'B) Compilation Error: possible lossy conversion from int to char',
            'C) Prints: 66',
            'D) Runtime Exception'
        ],
        correctOptionIndex: 1,
        hint: 'What is the type of the expression `ch + 1`?',
        solution: 'Option B is correct: Compilation Error.',
        explanation: 'In Java, the binary addition operator `+` promotes both operands to `int`. Thus `ch + 1` is of type `int` (value 66). Assigning an `int` to a `char` requires an explicit cast `ch = (char)(ch + 1)`. Note that `ch++` would compile because compound assignment includes an implicit cast.'
      },
      {
        title: 'Puzzle 2: Palindromic Character Peak Value',
        problemStatement: 'What is the middle character on row 4 (i = 3, 0-indexed) of a palindromic alphabet pyramid?',
        code: `for (int i = 0; i < 4; i++) {
    for (int j = 0; j <= i; j++) System.out.print((char)('A' + j));
    for (int j = i - 1; j >= 0; j--) System.out.print((char)('A' + j));
    System.out.println();
}`,
        options: [
            'A) \'C\'',
            'B) \'D\'',
            'C) \'E\'',
            'D) \'B\''
        ],
        correctOptionIndex: 1,
        hint: 'At i = 3, the ascending loop reaches j = 3: (char)(\'A\' + 3).',
        solution: 'Option B is correct: \'D\'.',
        explanation: 'When i = 3 (the 4th row), the ascending loop runs from j = 0 to 3, printing A, B, C, D. The peak character is \'D\' (ASCII 65 + 3 = 68).'
      },
      {
        title: 'Puzzle 3: Decreasing Alphabet Triangle Starting Char',
        problemStatement: 'What is the first character printed on row 2 (i = 2, 1-indexed) in this pattern for n = 4?',
        code: `int n = 4;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n - i + 1; j++) {
        System.out.print((char)('D' - j + 1) + " ");
    }
    System.out.println();
}`,
        options: [
            'A) D',
            'B) C',
            'C) B',
            'D) A'
        ],
        correctOptionIndex: 0,
        hint: 'Examine j = 1: (char)(\'D\' - 1 + 1) = \'D\'.',
        solution: 'Option A is correct: D.',
        explanation: 'For any row i, when j = 1, the printed character is `(char)(\'D\' - 1 + 1) = \'D\'`. Every row starts with \'D\' and counts downward.'
      },
      {
        title: 'Puzzle 4: Repeating Character Row Output',
        problemStatement: 'What does this loop print on line 3 (i = 3)?',
        code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print((char)('A' + i - 1) + " ");
    }
    System.out.println();
}`,
        options: [
            'A) A B C',
            'B) C C C',
            'C) B B B',
            'D) D D D'
        ],
        correctOptionIndex: 1,
        hint: 'At i = 3: (char)(\'A\' + 3 - 1) = (char)(\'A\' + 2) = \'C\'. It is printed i times.',
        solution: 'Option B is correct: C C C.',
        explanation: 'The printed character depends on the outer loop index i: `(char)(\'A\' + 3 - 1) = \'C\'`. Since the inner loop executes 3 times, it outputs "C C C ".'
      },
      {
        title: 'Puzzle 5: Alphabet Caesar Grid Wrap-Around',
        problemStatement: 'What character is printed at cell (i=25, j=2) in a 26 x 26 grid using `(char)(\'A\' + (i + j) % 26)`?',
        code: `// i = 25, j = 2`,
        options: [
            'A) \'A\'',
            'B) \'B\'',
            'C) \'C\'',
            'D) \'Z\''
        ],
        correctOptionIndex: 1,
        hint: '(25 + 2) % 26 = 27 % 26 = 1. What is (char)(\'A\' + 1)?',
        solution: 'Option B is correct: \'B\'.',
        explanation: '`25 + 2 = 27`. `27 % 26 = 1`. `(char)(\'A\' + 1) = \'B\'`. The modulo arithmetic wraps cleanly past Z to B.'
      },
      {
        title: 'Puzzle 6: Bitwise ASCII Case Conversion Trace',
        problemStatement: 'What is the output of `System.out.print((char)(\'A\' ^ 32))`?',
        code: `char upper = 'A';
char result = (char)(upper ^ 32);
System.out.println(result);`,
        options: [
            'A) \'A\'',
            'B) \'a\'',
            'C) 97',
            'D) \'@\''
        ],
        correctOptionIndex: 1,
        hint: '\'A\' is 65 (01000001 in binary). XOR with 32 (00100000) flips bit 5.',
        solution: 'Option B is correct: \'a\'.',
        explanation: '65 ^ 32 = 97. In ASCII, 97 is the code point for lowercase \'a\'. XOR with 32 toggles the case of any English ASCII letter.'
      },
      {
        title: 'Puzzle 7: Hollow Alphabet Diamond Space Gap',
        problemStatement: 'In a hollow alphabet diamond of n = 5 (0-indexed i = 0 to 4), how many middle spaces are between the two letters on row i = 3 (\'D\')?',
        code: `// Middle spaces formula: 2 * i - 1 for i > 0`,
        options: [
            'A) 3',
            'B) 5',
            'C) 7',
            'D) 9'
        ],
        correctOptionIndex: 1,
        hint: 'At i = 3: 2 * 3 - 1 = 5.',
        solution: 'Option B is correct: 5 spaces.',
        explanation: 'The middle space count for row i > 0 is 2 * i - 1. For i = 3 (letter \'D\'), middle spaces = 2 * 3 - 1 = 5 spaces.'
      },
      {
        title: 'Puzzle 8: Contiguous Reverse Letter Triangle',
        problemStatement: 'What does this loop print on row 2 (i = 2)?',
        code: `for (int i = 1; i <= 3; i++) {
    for (int j = i; j >= 1; j--) {
        System.out.print((char)('A' + j - 1) + " ");
    }
    System.out.println();
}`,
        options: [
            'A) A B',
            'B) B A',
            'C) C B',
            'D) B B'
        ],
        correctOptionIndex: 1,
        hint: 'For i = 2: j runs 2 down to 1. j=2 -> B, j=1 -> A.',
        solution: 'Option B is correct: B A.',
        explanation: 'At i = 2: j = 2 prints \'B\', j = 1 prints \'A\'. Output is "B A ".'
      },
      {
        title: 'Puzzle 9: Alphabet Hourglass Apex Letter',
        problemStatement: 'In an alphabet hourglass with top inverted pyramid starting at row n = 4 (\'D\') down to 1 (\'A\'), what letter is at the waist (i = 1)?',
        code: `// n = 4, waist at i = 1`,
        options: [
            'A) \'A\'',
            'B) \'D\'',
            'C) \'C\'',
            'D) \'B\''
        ],
        correctOptionIndex: 0,
        hint: 'Row 1 corresponds to (char)(\'A\' + 1 - 1) = \'A\'.',
        solution: 'Option A is correct: \'A\'.',
        explanation: 'The hourglass narrows down from \'D\' to a single character \'A\' at the center waist.'
      },
      {
        title: 'Puzzle 10: Compound Assignment Auto-Cast Verification',
        problemStatement: 'Does `char ch = \'A\'; ch++;` compile and run cleanly?',
        code: `char ch = 'A';
ch++;
System.out.println(ch);`,
        options: [
            'A) Compile error: cannot increment char',
            'B) Prints: B',
            'C) Prints: 66',
            'D) Runtime error'
        ],
        correctOptionIndex: 1,
        hint: 'Compound assignment operators (++, +=) include an implicit cast in Java.',
        solution: 'Option B is correct: Prints B.',
        explanation: 'Under JLS §15.14.2, postfix increment `ch++` is equivalent to `ch = (char)(ch + 1)`. The compiler automatically supplies the cast, printing \'B\'.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does char c = \'A\'; c = c + 1; fail compilation in Java, whereas c++ and c += 1 succeed? Explain the JVM bytecode mechanics.',
        answer: 'This is governed by Java Language Specification (JLS §5.6.2 and §15.26.2). In Java, binary operations (such as `+`) trigger Binary Numeric Promotion: any integer operands smaller than `int` (byte, short, char) are promoted to 32-bit `int` prior to evaluation. Thus `c + 1` produces an `int` result (66). The simple assignment operator `=` does NOT perform implicit narrowing conversions, requiring an explicit cast `c = (char)(c + 1)`. In contrast, compound assignment operators (`+=`, `++`) contain an implicit cast defined directly in the language specification: `E1 op= E2` is equivalent to `E1 = (T)((E1) op (E2))`. At the bytecode level, `iinc` or `iadd` followed by `i2c` (int-to-char instruction) is automatically emitted.',
        followUp: 'What happens if a char exceeds 65535 when incremented with c++?',
        followUpAnswer: 'It silently overflows and wraps around to 0 (`\\u0000`) without throwing any exception, because char is an unsigned 16-bit type.',
        keyPhrases: [
          'Binary Numeric Promotion (JLS §5.6.2)',
          'Implicit narrowing cast in compound assignments (§15.26.2)',
          'Bytecode i2c conversion instruction',
          'Unsigned 16-bit wrap-around at 65535'
        ],
        commonMistakeAnswer: 'Thinking c++ behaves differently because it is a special hardware instruction that skips type checks.'
      },
      {
        question: 'How do you design a generalized cyclical alphabet grid that wraps from \'Z\' back to \'A\' without branching if-else statements?',
        answer: 'To wrap circularly across the 26 uppercase English letters, we map any continuous integer index K to the range [0, 25] using modulo arithmetic: `index = K % 26`. Adding this offset to the base ASCII character \'A\' yields: `char c = (char)(\'A\' + (K % 26));`. In a 2D matrix where row is i and column is j, K can be `i + j`, `i * j`, or any linear progression. This entirely eliminates branching conditionals, branch misprediction penalties, and boundary checks.',
        followUp: 'What if K is negative (e.g. stepping backward from \'A\')?',
        followUpAnswer: 'In Java, the `%` operator can return negative values for negative dividends. To safely wrap backward, use `((K % 26) + 26) % 26` or `Math.floorMod(K, 26)`.',
        keyPhrases: [
          'Circular mapping via K % 26',
          'Elimination of branching and branch mispredictions',
          'Base ASCII offset \'A\' (65)',
          'Negative modulo safety: ((K % 26) + 26) % 26'
        ],
        commonMistakeAnswer: 'Using an if-statement like if (c > \'Z\') c = \'A\' which fails when jumping by increments > 1.'
      },
      {
        question: 'Explain the three-stage loop decomposition for Palindromic Alphabet Pyramids and how to eliminate the second loop.',
        answer: 'A palindromic alphabet pyramid row of height i has (2*i - 1) letters. The three-stage decomposition consists of: 1) `n - i` leading spaces, 2) Ascending loop `j = 0 to i - 1` printing `(char)(\'A\' + j)`, 3) Descending loop `j = i - 2 down to 0` printing `(char)(\'A\' + j)`. To eliminate the second loop and render in a single inner loop: iterate `col = 1 to 2 * i - 1`. The offset from \'A\' is determined by radial distance from apex: `int offset = (col <= i) ? (col - 1) : (2 * i - 1 - col);`. The character is then `(char)(\'A\' + offset)`.',
        followUp: 'What is the time and space complexity of the single-loop vs two-loop approach?',
        followUpAnswer: 'Both are identical: O(N^2) time and O(1) auxiliary space. The single-loop approach reduces bytecode size and branch count.',
        keyPhrases: [
          'Radial offset formula: (col <= i) ? (col - 1) : (2*i - 1 - col)',
          'Symmetric reflection around apex i',
          'Elimination of descending loop duplication',
          'O(1) auxiliary space'
        ],
        commonMistakeAnswer: 'Believing descending loops cannot be algebraically mapped to a forward-running counter.'
      },
      {
        question: 'How do you render a Hollow Character Diamond where each row displays its corresponding alphabetic level?',
        answer: 'A hollow diamond of radius n (total 2*n - 1 rows) displays letter \'A\' at the peak, \'B\' at the second row, up to the n-th letter at the equator. For any row i (0 to 2*n - 2): 1) Calculate distance from equator: `d = Math.abs(n - 1 - i)`. 2) The character for this row is `char ch = (char)(\'A\' + (n - 1 - d));`. 3) Print `d` leading spaces. 4) Print `ch`. 5) If `d < n - 1` (not the apex or base), print `2 * (n - 1 - d) - 1` inner spaces, followed by `ch`. 6) Print newline. This unified formula renders both upper and lower halves within a single outer loop.',
        followUp: 'What is the maximum value of n before English alphabet letters run out?',
        followUpAnswer: 'n = 26 (letter \'Z\'). For n > 26, the algorithm must either wrap cyclically or reject the input.',
        keyPhrases: [
          'Equator distance d = Math.abs(n - 1 - i)',
          'Level character (char)(\'A\' + (n - 1 - d))',
          'Internal space formula 2*(n - 1 - d) - 1',
          'Unified single-loop diamond logic'
        ],
        commonMistakeAnswer: 'Writing 4 separate nested loops and duplicating code between upper and lower halves.'
      },
      {
        question: 'Discuss Unicode representation in Java: How does primitive char handle ASCII, multilingual scripts, and emojis in pattern programs?',
        answer: 'In Java, `char` is UTF-16 code units (16-bit). Standard English ASCII (\'A\'-\'Z\') fits comfortably in 7 bits (code points 65-90). Basic Multilingual Plane (BMP) characters (like Greek α, Cyrillic, or Devanagari) fit in a single 16-bit `char` and can be manipulated in patterns just like English characters (e.g. `(char)(\'\\u03B1\' + j)`). However, supplementary characters—such as emojis (e.g., 🚀) or historical scripts—have code points above 65535 and require TWO 16-bit chars (a surrogate pair: high surrogate and low surrogate). A single `char` cannot hold an emoji; pattern programs handling emojis must use `int` code points and `Character.toChars(int codePoint)`.',
        followUp: 'What happens if you print a single high surrogate char by itself in console?',
        followUpAnswer: 'It prints an unprintable replacement symbol (e.g. \'?\' or a question mark inside a diamond) because an unpaired surrogate is invalid UTF-16.',
        keyPhrases: [
          'UTF-16 code units (16-bit unsigned)',
          'Basic Multilingual Plane (BMP) vs Supplementary characters',
          'Surrogate pairs for code points > 65535',
          'Code point int manipulation via Character.toChars()'
        ],
        commonMistakeAnswer: 'Assuming char can store any Unicode symbol, including emojis, in a single variable.'
      },
      {
        question: 'How do you print an Alternating Case Alphabet Triangle (e.g., Row 1: A, Row 2: b c, Row 3: D E F)?',
        answer: 'This combines a continuous counter with a parity check on the row or total count. Maintain a running character index `int k = 0`. For row i (1 to n), the case is determined by `i % 2`: if i is odd, uppercase; if even, lowercase. For each column `j = 1 to i`: fetch the base letter `char base = (char)(\'A\' + (k % 26))`; if `i % 2 == 0`, convert to lowercase via `(char)(base + 32)` or `Character.toLowerCase(base)`; print the letter and increment `k++`.',
        followUp: 'How can you alternate case on every individual letter instead of every row?',
        followUpAnswer: 'Check `k % 2 == 0` for each element rather than `i % 2 == 0`.',
        keyPhrases: [
          'Running character accumulator k % 26',
          'Row-level case toggle i % 2',
          'ASCII case shift + 32',
          'Element-level case toggle k % 2'
        ],
        commonMistakeAnswer: 'Resetting the alphabet counter on each row rather than maintaining a running sequence.'
      },
      {
        question: 'How can you create an Alphabet Wave / Zigzag string pattern across multiple rows (similar to LeetCode 6: Zigzag Conversion)?',
        answer: 'In LeetCode 6 (Zigzag Conversion), a string is rendered across R rows in a zigzag (downward, then diagonally upward). To model this: 1) Allocate `StringBuilder[] rows = new StringBuilder[R]`. 2) Maintain `int currentRow = 0` and a direction flag `boolean goingDown = false`. 3) Iterate each character in the string: append to `rows[currentRow]`. If `currentRow == 0 || currentRow == R - 1`, flip `goingDown = !goingDown`. Update `currentRow += goingDown ? 1 : -1`. 4) Finally, concatenate all StringBuilders.',
        followUp: 'What is the period of the zigzag cycle for R rows?',
        followUpAnswer: 'The period (cycle length) is exactly `2 * R - 2` (for R > 1).',
        keyPhrases: [
          'Array of StringBuilders per row',
          'Direction toggle at boundary rows (0 and R - 1)',
          'Cycle length formula 2*R - 2',
          'O(N) time and space complexity'
        ],
        commonMistakeAnswer: 'Using a full 2D char matrix with lots of empty spaces, resulting in wasted O(R * N) memory.'
      },
      {
        question: 'How does ASCII bitwise manipulation enable branchless character case conversion?',
        answer: 'In ASCII, uppercase letters have bit 5 cleared (0), while lowercase letters have bit 5 set (1): \'A\' is `01000001` (65) and \'a\' is `01100001` (97). Because 32 is `00100000` (bit 5): 1) To lowercase: `c | 32` unconditionally sets bit 5. 2) To uppercase: `c & ~32` (or `c & 0xDF`) unconditionally clears bit 5. 3) To toggle case: `c ^ 32` flips bit 5. These bitwise operations execute in a single CPU clock cycle without branching or lookup tables.',
        followUp: 'Does this bitwise trick work for non-English letters like accented vowels (é, ü)?',
        followUpAnswer: 'No. This trick is strictly limited to 7-bit ASCII English letters (\'A\'-\'Z\', \'a\'-\'z\'). Accented and international characters require `Character.toLowerCase()` table lookups.',
        keyPhrases: [
          'Bit 5 masking (value 32 / 0x20)',
          'To uppercase: c & ~32 (or c & 0xDF)',
          'To lowercase: c | 32',
          'Case toggle: c ^ 32',
          'Branchless single-cycle ALU execution'
        ],
        commonMistakeAnswer: 'Attempting to use bit 5 operations on Unicode non-ASCII letters and causing text corruption.'
      },
      {
        question: 'Explain how to generate an Alphabet Hourglass pattern cleanly.',
        answer: 'An alphabet hourglass of size n starts with an inverted pyramid of characters from \'A\' up to (2*i - 1) width on row i (running n down to 1), followed by an upright pyramid (running 2 to n). For row i: print `n - i` leading spaces, then print `2 * i - 1` contiguous or palindromic characters. Starting the bottom half at `i = 2` avoids duplicating the single-character central waist row.',
        followUp: 'If the characters are contiguous (A, B, C...) across the hourglass, how is the counter maintained?',
        followUpAnswer: 'A persistent `char ch = \'A\'` accumulator is incremented inside the character loops across both upper and lower halves.',
        keyPhrases: [
          'Inverted pyramid (n down to 1) + upright pyramid (2 to n)',
          'Waist row duplication avoidance at i = 2',
          'Leading space formula n - i',
          'Persistent char accumulator'
        ],
        commonMistakeAnswer: 'Starting the upright pyramid at i = 1, printing the waist letter twice.'
      },
      {
        question: 'How do you benchmark and optimize character pattern generation in competitive programming?',
        answer: 'In competitive programming, tests may request patterns with N up to 10,000 (100 million characters). Standard `System.out.print` will cause Time Limit Exceeded (TLE). Optimization strategy: 1) Avoid String allocations inside loops (`String.format`, concatenation `+`). 2) Use a single reusable `char[]` buffer of width W for each line, write characters into the buffer, and call `System.out.write(buf, 0, len)`. 3) Wrap `System.out` in a custom Fast I/O class using a large byte buffer (e.g. 64KB `BufferedOutputStream`). This reduces execution time from 10+ seconds to under 150 milliseconds.',
        followUp: 'Why is System.out.write(byte[]) faster than System.out.print(char[])?',
        followUpAnswer: '`System.out.write(byte[])` bypasses character-set encoding on every call, dumping raw ASCII bytes directly into the OS output stream buffer.',
        keyPhrases: [
          'Fast I/O custom byte buffer (64KB)',
          'Reusable line char[] buffer',
          'Bypassing PrintStream synchronization locks',
          'Direct System.out.write byte streaming'
        ],
        commonMistakeAnswer: 'Using String concatenation inside loops and wondering why the JVM runs out of heap memory.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the ASCII integer value of the uppercase letter \'A\'?',
        options: [
            '48',
            '65',
            '97',
            '1'
        ],
        correctIndex: 1,
        explanation: 'In ASCII, uppercase \'A\' is 65, while lowercase \'a\' is 97, and digit \'0\' is 48.'
      },
      {
        question: 'What is the result of evaluating `(char)(\'A\' + 3)`?',
        options: [
            '\'B\'',
            '\'C\'',
            '\'D\'',
            '\'E\''
        ],
        correctIndex: 2,
        explanation: '65 + 3 = 68, which is the ASCII value for \'D\'.'
      },
      {
        question: 'Why does `char c = \'A\'; c = c + 1;` fail to compile?',
        options: [
            'Cannot add numbers to characters in Java',
            'Binary numeric promotion widens `c + 1` to `int`',
            '\'A\' is immutable',
            'c is out of scope'
        ],
        correctIndex: 1,
        explanation: 'Java promotes char to int during addition with an integer. Assigning int back to char requires an explicit cast.'
      },
      {
        question: 'What is the middle character of row 3 (1-indexed) in a palindromic alphabet pyramid (A, ABA, ABCBA)?',
        options: [
            '\'A\'',
            '\'B\'',
            '\'C\'',
            '\'D\''
        ],
        correctIndex: 2,
        explanation: 'Row 3 is `A B C B A`, whose central peak character is \'C\'.'
      },
      {
        question: 'How many characters are printed on row i (1-indexed) of a centered alphabet pyramid?',
        options: [
            'i',
            '2 * i - 1',
            '2 * i',
            'i^2'
        ],
        correctIndex: 1,
        explanation: 'Centered pyramids follow the odd sequence (2 * i - 1).'
      },
      {
        question: 'Which expression converts an uppercase ASCII character `ch` to lowercase branchlessly?',
        options: [
            '(char)(ch & ~32)',
            '(char)(ch | 32)',
            '(char)(ch ^ 16)',
            '(char)(ch + 26)'
        ],
        correctIndex: 1,
        explanation: 'Bitwise OR with 32 sets bit 5, turning uppercase into lowercase in ASCII.'
      },
      {
        question: 'What is the memory size of a primitive `char` in Java?',
        options: [
            '8 bits (1 byte)',
            '16 bits (2 bytes)',
            '32 bits (4 bytes)',
            '64 bits (8 bytes)'
        ],
        correctIndex: 1,
        explanation: 'In Java, `char` is an unsigned 16-bit type (UTF-16 code unit).'
      },
      {
        question: 'What character is produced by `(char)(\'A\' + 25)`?',
        options: [
            '\'Y\'',
            '\'Z\'',
            '\'[\'',
            '\'A\''
        ],
        correctIndex: 1,
        explanation: 'The English alphabet has 26 letters; offset 25 from \'A\' (index 0) is \'Z\'.'
      },
      {
        question: 'How do you safely wrap an alphabet index `k` so that it stays within 0 to 25?',
        options: [
            'k % 25',
            'k % 26',
            'k / 26',
            'k & 26'
        ],
        correctIndex: 1,
        explanation: 'Modulo 26 restricts values to the range 0 through 25.'
      },
      {
        question: 'In a hollow alphabet diamond of n = 4, how many characters are on the apex row (i = 0)?',
        options: [
            '0',
            '1',
            '2',
            '4'
        ],
        correctIndex: 1,
        explanation: 'The apex row has only 1 character (the letter \'A\'). Rows below it have 2 characters separated by spaces.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON P4.1: Advanced Matrix & Spiral Patterns
  // ─────────────────────────────────────────────────────────────
  'advanced-matrix-spiral-patterns': {
    id: 'advanced-matrix-spiral-patterns',
    moduleId: 'java-patterns',
    moduleTitle: '6. Pattern Programs & Logic Building',
    lessonNumber: 'Lesson 6.4',
    title: 'Advanced Matrix & Inward Spiral Patterns',
    subtitle: '4-boundary shrinking box algorithm (top, bottom, left, right), concentric number square grids, zigzag snake matrix traversal, diagonal printing, and matrix rotation',
    estimatedMinutes: 40,
    beginnerAnalogy: 'Imagine a robotic lawnmower or a street-cleaning truck cleaning a rectangular city plaza. It drives straight along the northern perimeter from west to east. When it hits the eastern wall, it moves the wall inward (top++), turns 90 degrees south, and sweeps down the eastern border. Hitting the southern wall, it pushes that wall inward (right--), turns west, and cleans the southern edge. Hitting the western wall, it moves that wall inward (bottom--), turns north, and sweeps upward until it reaches the new northern wall (left++). This "shrinking room" process repeats until all four walls meet in the center. That is the 4-Boundary Shrinking Box Algorithm—the undisputed gold standard for matrix spiral problems!',
    interviewTakeaways: [
      'The 4-Boundary Shrinking Box Model: Maintain 4 pointers: `top = 0`, `bottom = R - 1`, `left = 0`, `right = C - 1`. Traverse: Left-to-Right along `top`, increment `top`; Top-to-Bottom along `right`, decrement `right`; Right-to-Left along `bottom` (guarded by `top <= bottom`), decrement `bottom`; Bottom-to-Top along `left` (guarded by `left <= right`), increment `left`.',
      'The Guard Check Necessity: In rectangular matrices (R != C), omitting the inner `if (top <= bottom)` and `if (left <= right)` checks causes duplicate traversal and index corruption across the central row or column.',
      'Concentric Box Min-Distance Closed Form: In an N x N concentric square where outer values are n and center is 1, any cell (r, c) equals: `n - Math.min(Math.min(r, c), Math.min(N - 1 - r, N - 1 - c))`. This enables O(1) cell evaluation with zero 2D array allocation.',
      'In-Place 90-Degree Clockwise Rotation: To rotate an N x N matrix clockwise in O(1) auxiliary space: 1) Transpose the matrix (`swap(matrix[i][j], matrix[j][i])` for `i < j`), then 2) Reverse every row horizontally.',
      'Anti-Clockwise 90-Degree Rotation: 1) Transpose the matrix, then 2) Reverse every column vertically (or reverse rows first, then transpose).',
      'Diagonal Grouping via (i + j) and (i - j): Cells on the same anti-diagonal share the identical index sum: `i + j == sum`. Cells on the same main diagonal share the identical index difference: `i - j == diff`.',
      'CPU Cache Line Exploitation: Always iterate row-major (`matrix[i][j]`) rather than column-major (`matrix[j][i]`). Row-major accesses contiguous memory in Java, leveraging CPU L1/L2 hardware prefetchers for a 10x-20x speedup.'
    ],
    cheatSheet: {
      summary: 'Matrix pattern algorithms manipulate 2D coordinates. Master the 4-boundary shrinking box for spirals, min-distance for concentric squares, and transpose + reverse for in-place rotations.',
      syntaxTemplate: `// 1. Clockwise Spiral Matrix Fill (N x M)
int top = 0, bottom = R - 1, left = 0, right = C - 1;
int val = 1;
while (top <= bottom && left <= right) {
    for (int j = left; j <= right; j++) matrix[top][j] = val++;
    top++;
    for (int i = top; i <= bottom; i++) matrix[i][right] = val++;
    right--;
    if (top <= bottom) {
        for (int j = right; j >= left; j--) matrix[bottom][j] = val++;
        bottom--;
    }
    if (left <= right) {
        for (int i = bottom; i >= top; i--) matrix[i][left] = val++;
        left++;
    }
}`,
      rules: [
        { rule: 'Rectangular Guard Checks', explanation: 'Always guard the bottom and left traversals with if (top <= bottom) and if (left <= right) to prevent duplicate sweeps in odd/rectangular grids.' },
        { rule: 'Transpose Symmetry Range', explanation: 'When transposing in-place, only loop j from i + 1 to n - 1. Looping over all j swaps twice, reverting to original!' },
        { rule: 'Concentric Ring Count', explanation: 'In an N x N matrix, the total number of concentric layers/rings is (N + 1) / 2.' },
        { rule: 'Anti-Diagonal Invariant', explanation: 'All elements on a secondary diagonal from top-right to bottom-left satisfy row + col == constant.' },
        { rule: 'Row-Major Cache Locality', explanation: 'In Java, 2D arrays are arrays of references. matrix[i][j] is cache-friendly; matrix[j][i] incurs cache misses.' }
      ],
      quickComparison: [
        { aspect: 'Clockwise Rotation 90°', optionA: 'Step 1: Transpose matrix', optionB: 'Step 2: Reverse each row' },
        { aspect: 'Anti-Clockwise Rotation 90°', optionA: 'Step 1: Transpose matrix', optionB: 'Step 2: Reverse each column' },
        { aspect: '180° Rotation', optionA: 'Reverse all rows', optionB: 'Reverse all columns (or 2x 90°)' },
        { aspect: 'Spiral Fill vs Traversal', optionA: 'Fill: Writes val++ to matrix[r][c]', optionB: 'Traversal: Reads matrix[r][c] to output' },
        { aspect: 'Concentric Square', optionA: 'Math closed-form: O(1) space', optionB: 'Matrix simulation: O(N^2) space' }
      ]
    },
    coreExplanation: [
      'The 4-Boundary Shrinking Box Paradigm: Spiral matrix problems (such as LeetCode 54: Spiral Matrix and LeetCode 59: Spiral Matrix II) are best solved using the 4-Boundary algorithm. Rather than tracking direction vectors and collision detection, we define four rigid bounding walls: `top = 0`, `bottom = rows - 1`, `left = 0`, `right = cols - 1`. Each directional pass traverses one complete wall and then shrinks that wall inward: 1) Sweep `top` row left-to-right, then `top++`. 2) Sweep `right` col top-to-bottom, then `right--`. 3) Sweep `bottom` row right-to-left, then `bottom--`. 4) Sweep `left` col bottom-to-top, then `left++`. The loop terminates cleanly when `top > bottom || left > right`.',
      'The Crucial Rectangular Boundary Guard: Why are `if (top <= bottom)` and `if (left <= right)` essential? Consider a 1x3 matrix (1 row, 3 cols): `top = 0`, `bottom = 0`, `left = 0`, `right = 2`. The first sweep visits (0,0), (0,1), (0,2) and executes `top++` (top becomes 1). Because `top > bottom`, the matrix is fully traversed! If we unconditionally sweep right-to-left along `bottom` (row 0), row 0 would be traversed a second time in reverse. The guard checks prevent this fatal flaw.',
      'Concentric Target Square and Chebyshev/Border Distance: In concentric square patterns (e.g. outer border 4, next ring 3, center 1), the visual rings represent Chebyshev distance or distance to the nearest boundary. In an N x N grid (where size = 2*n - 1), the distance of cell (r, c) from the 4 walls is: top = r, left = c, bottom = size - 1 - r, right = size - 1 - c. The minimum of these four distances `minDist = min(min(r, c), min(size - 1 - r, size - 1 - c))` identifies which concentric ring the cell belongs to. The value is simply `n - minDist`. This evaluates any cell in O(1) time without allocating memory.',
      'In-Place Matrix Rotation Mechanics: Rotating an N x N matrix by 90 degrees clockwise without allocating extra memory is a classic FAANG interview problem. Linear algebra reveals that a 90-degree clockwise rotation is mathematically identical to a Transpose followed by a Horizontal Reflection: 1) Transpose: Swap `matrix[i][j]` with `matrix[j][i]` for all `i < j`. (This mirrors the matrix along its main diagonal). 2) Horizontal Reflection: For every row, reverse its elements (`swap(row[j], row[N - 1 - j])`). Both steps execute in-place in O(N^2) time and O(1) auxiliary space.',
      'Zigzag and Diagonal Traversals: Traversing a matrix diagonally (e.g. LeetCode 498: Diagonal Traverse) relies on the property that all cells on the same diagonal share the same sum of indices `s = r + c`. In an M x N matrix, `s` ranges from `0` to `M + N - 2`. For even `s`, we traverse up-right (row decreases, col increases); for odd `s`, we traverse down-left (row increases, col decreases). Handling boundary clamps ensures the traversal never steps outside valid matrix bounds.',
      'Cache-Oblivious Row-Major Locality in Java: In Java, a 2D array `int[][]` is not a contiguous 2D block in memory; it is an array of object references pointing to independent 1D array objects scattered on the heap. When you access `matrix[i][j]` (row-major), CPU hardware prefetchers load the entire contiguous row into the L1/L2 cache lines (64 bytes at a time). If you access `matrix[j][i]` (column-major), each access jumps to a completely different array on the heap, triggering massive CPU cache misses and TLB misses, slowing down traversal by up to 20x on large matrices.'
    ],
    diagram: `SPIRAL MATRIX 4-BOUNDARY SHRINKING BOX
========================================================================

Initial State:
top = 0, bottom = 3, left = 0, right = 3  (4 x 4 Matrix)

Step 1: Sweep Top Row (left to right) -> [ 1   2   3   4 ]
        Action: top++ (top becomes 1)

Step 2: Sweep Right Col (top to bottom) -> [ 5, 8, 9 ] -> [ 5   6   7 ]
        Action: right-- (right becomes 2)

Step 3: Sweep Bottom Row (right to left) -> [ 8   9  10 ]
        Action: bottom-- (bottom becomes 2)

Step 4: Sweep Left Col (bottom to top) -> [ 11  12 ]
        Action: left++ (left becomes 1)

Visual Result of 4x4 Inward Spiral:
   1   2   3   4
  12  13  14   5
  11  16  15   6
  10   9   8   7

------------------------------------------------------------------------
IN-PLACE 90° CLOCKWISE ROTATION (Transpose + Reverse Rows):

Original Matrix:         Step 1: Transpose (i < j)     Step 2: Reverse Each Row
 1  2  3                  1  4  7                       7  4  1
 4  5  6         ==>      2  5  8              ==>      8  5  2
 7  8  9                  3  6  9                       9  6  3`,
    codeSnippet: {
      title: 'Clockwise Spiral Generation & In-Place 90° Rotation',
      code: `public class MatrixAdvancedPatterns {
    public static int[][] generateSpiralMatrix(int n) {
        int[][] matrix = new int[n][n];
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int val = 1;

        while (top <= bottom && left <= right) {
            // 1. Traverse Right along Top row
            for (int j = left; j <= right; j++) matrix[top][j] = val++;
            top++;

            // 2. Traverse Down along Right col
            for (int i = top; i <= bottom; i++) matrix[i][right] = val++;
            right--;

            // 3. Traverse Left along Bottom row (Guarded!)
            if (top <= bottom) {
                for (int j = right; j >= left; j--) matrix[bottom][j] = val++;
                bottom--;
            }

            // 4. Traverse Up along Left col (Guarded!)
            if (left <= right) {
                for (int i = bottom; i >= top; i--) matrix[i][left] = val++;
                left++;
            }
        }
        return matrix;
    }

    public static void rotate90Clockwise(int[][] matrix) {
        int n = matrix.length;
        // Step 1: Transpose in-place (swap matrix[i][j] with matrix[j][i])
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Step 2: Reverse each row horizontally
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }

    public static void main(String[] args) {
        int n = 4;
        System.out.println("--- Generated Spiral Matrix (4x4) ---");
        int[][] spiral = generateSpiralMatrix(n);
        for (int[] row : spiral) {
            for (int x : row) System.out.printf("%2d ", x);
            System.out.println();
        }

        System.out.println("--- Rotated 90° Clockwise ---");
        rotate90Clockwise(spiral);
        for (int[] row : spiral) {
            for (int x : row) System.out.printf("%2d ", x);
            System.out.println();
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'int top = 0, bottom = n - 1, left = 0, right = n - 1;', explanation: 'Initializes the 4 bounding perimeter walls of the matrix.' },
        { line: 'for (int j = left; j <= right; j++) matrix[top][j] = val++;', explanation: 'Fills the top row from left to right with consecutive values.' },
        { line: 'top++;', explanation: 'Pushes the top boundary wall down by 1 row.' },
        { line: 'if (top <= bottom)', explanation: 'Essential guard check preventing duplicate traversal on single-row matrices.' },
        { line: 'for (int j = i + 1; j < n; j++)', explanation: 'Transposes strictly above the diagonal (i < j) to prevent double swapping.' }
      ],
      output: `--- Generated Spiral Matrix (4x4) ---
 1  2  3  4 
12 13 14  5 
11 16 15  6 
10  9  8  7 
--- Rotated 90° Clockwise ---
10 11 12  1 
 9 16 13  2 
 8 15 14  3 
 7  6  5  4 `
    },
    codeExamples: [
      {
        title: 'Concentric Target Number Square (O(1) Space)',
        description: 'Generates concentric rings from N down to 1 using the min-boundary-distance formula with zero array allocation.',
        code: `public class ConcentricSquarePattern {
    public static void main(String[] args) {
        int n = 4;
        int size = 2 * n - 1;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                int minDist = Math.min(Math.min(i, j), Math.min(size - 1 - i, size - 1 - j));
                System.out.print((n - minDist) + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `4 4 4 4 4 4 4 
4 3 3 3 3 3 4 
4 3 2 2 2 3 4 
4 3 2 1 2 3 4 
4 3 2 2 2 3 4 
4 3 3 3 3 3 4 
4 4 4 4 4 4 4 `
      },
      {
        title: 'Diagonal Traversal of Matrix',
        description: 'Traverses and prints matrix elements diagonal-by-diagonal grouped by row + col index sum.',
        code: `public class DiagonalTraversal {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int R = mat.length, C = mat[0].length;
        System.out.println("Diagonals by sum (r + c):");
        for (int sum = 0; sum <= (R - 1) + (C - 1); sum++) {
            System.out.print("Sum " + sum + ": ");
            for (int r = 0; r < R; r++) {
                int c = sum - r;
                if (c >= 0 && c < C) {
                    System.out.print(mat[r][c] + " ");
                }
            }
            System.out.println();
        }
    }
}`,
        output: `Diagonals by sum (r + c):
Sum 0: 1 
Sum 1: 2 4 
Sum 2: 3 5 7 
Sum 3: 6 8 
Sum 4: 9 `
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Omitting the `if (top <= bottom)` and `if (left <= right)` checks inside spiral loops.',
        whyItHappens: 'In square matrices (N x N), the loop condition `while (top <= bottom && left <= right)` often masks the bug. But on rectangular matrices (e.g. 3x5 or 1x4), elements get printed twice or overwritten.',
        howToFix: 'Always include defensive guard checks before the bottom (right-to-left) and left (bottom-to-top) traversals.'
      },
      {
        mistake: 'Transposing across the entire grid (j = 0 to n - 1) during matrix rotation.',
        whyItHappens: 'Swapping `mat[i][j]` with `mat[j][i]` for all j swaps elements when i < j, and then swaps them right back when i > j, resulting in an unmodified matrix.',
        howToFix: 'Start the inner loop at `j = i + 1` so every pair above the diagonal is swapped exactly once.'
      },
      {
        mistake: 'Iterating matrix in column-major order (for j; for i; access mat[i][j]) in performance-critical code.',
        whyItHappens: 'Developers assume order of index variables doesn’t matter in 2D array traversal.',
        howToFix: 'Always iterate row-major (outer loop i, inner loop j, accessing `mat[i][j]`) to exploit CPU hardware cache line prefetching.'
      },
      {
        mistake: 'Off-by-one errors in size calculation of concentric number squares.',
        whyItHappens: 'Using size = 2*n instead of 2*n - 1 creates an even grid without a unique central 1.',
        howToFix: 'Remember that a concentric square centered at 1 with border n has size 2*n - 1 (e.g. n=4 has size 7).'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Concentric Square Center Element Coordinate',
        problemStatement: 'In a concentric square pattern where border is n = 4 (size = 7, 0-indexed 0 to 6), what are the coordinates of the unique central cell containing 1?',
        code: `// n = 4, size = 2 * n - 1 = 7`,
        options: [
            'A) (2, 2)',
            'B) (3, 3)',
            'C) (4, 4)',
            'D) (3, 4)'
        ],
        correctOptionIndex: 1,
        hint: 'The center of indices 0 through 6 is 7 / 2 = 3.',
        solution: 'Option B is correct: (3, 3).',
        explanation: 'For size = 7 (indices 0, 1, 2, 3, 4, 5, 6), the midpoint index is (size - 1) / 2 = 6 / 2 = 3. Thus cell (3, 3) is the exact center.'
      },
      {
        title: 'Puzzle 2: 4-Boundary Shrinking Box Pointer State Trace',
        problemStatement: 'In a 3x3 matrix spiral fill (values 1 to 9), what value is assigned to the center cell `matrix[1][1]`?',
        code: `// 3x3 Spiral Matrix:
// Top row: 1 2 3
// Right col: 4 5
// Bottom row: 6 7
// Left col: 8
// Center: ?`,
        options: [
            'A) 7',
            'B) 8',
            'C) 9',
            'D) 5'
        ],
        correctOptionIndex: 2,
        hint: 'The spiral winds from 1 on the perimeter inward to 9 at the center.',
        solution: 'Option C is correct: 9.',
        explanation: 'Top row gets 1, 2, 3; right col gets 4, 5; bottom row gets 6, 7; left col gets 8. The remaining center cell (1, 1) is filled last with value 9.'
      },
      {
        title: 'Puzzle 3: Transpose Double-Swap Reversion',
        problemStatement: 'What happens to matrix `mat` after running this code?',
        code: `int[][] mat = {{1, 2}, {3, 4}};
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        int temp = mat[i][j];
        mat[i][j] = mat[j][i];
        mat[j][i] = temp;
    }
}`,
        options: [
            'A) The matrix is transposed cleanly',
            'B) The matrix remains completely unchanged',
            'C) The elements are all 0',
            'D) IndexOutOfBoundsException'
        ],
        correctOptionIndex: 1,
        hint: 'When i=0, j=1: (0,1) and (1,0) swap. When i=1, j=0: (1,0) and (0,1) swap again!',
        solution: 'Option B is correct: The matrix remains completely unchanged.',
        explanation: 'Because the inner loop runs over all j (0 to 1), every off-diagonal element pair is swapped twice, undoing the transposition and leaving the matrix in its original state.'
      },
      {
        title: 'Puzzle 4: Rectangular Spiral Guard Failure',
        problemStatement: 'What bug occurs if `if (top <= bottom)` is omitted when spiral traversing a 1x4 matrix (1 row, 4 cols)?',
        code: `// Matrix: [10, 20, 30, 40]
// top = 0, bottom = 0, left = 0, right = 3`,
        options: [
            'A) Infinite loop',
            'B) The elements 30, 20, 10 are traversed a second time in reverse',
            'C) NullPointerException',
            'D) Out of bounds exception'
        ],
        correctOptionIndex: 1,
        hint: 'Top row traverses left-to-right (10, 20, 30, 40) and executes top++ (top=1). If unguarded, bottom row executes at bottom=0.',
        solution: 'Option B is correct: Elements are traversed a second time in reverse.',
        explanation: 'After step 1, top is incremented to 1. Since bottom is still 0, an unguarded bottom sweep at row 0 traverses right-to-left from right=2 down to left=0, re-reading 30, 20, 10.'
      },
      {
        title: 'Puzzle 5: Anti-Diagonal Index Invariant',
        problemStatement: 'In a 4x4 matrix, which of the following cells lies on the anti-diagonal that passes through the top-right corner (0, 3)?',
        code: `// Anti-diagonal passing through (0, 3): sum = 0 + 3 = 3`,
        options: [
            'A) (1, 1)',
            'B) (2, 1)',
            'C) (2, 2)',
            'D) (3, 3)'
        ],
        correctOptionIndex: 1,
        hint: 'Check if row + col == 3. For (2, 1): 2 + 1 = 3.',
        solution: 'Option B is correct: (2, 1).',
        explanation: 'All cells on this secondary diagonal have row + col = 3. These cells are (0, 3), (1, 2), (2, 1), and (3, 0). (2, 1) satisfies the invariant.'
      },
      {
        title: 'Puzzle 6: Number of Rings in an N x N Matrix',
        problemStatement: 'How many concentric rectangular rings/layers are there in an 8 x 8 matrix?',
        code: `// Formula for concentric layers: (min(R, C) + 1) / 2`,
        options: [
            'A) 2',
            'B) 4',
            'C) 8',
            'D) 16'
        ],
        correctOptionIndex: 1,
        hint: '8 / 2 = 4 layers.',
        solution: 'Option B is correct: 4 rings.',
        explanation: 'Each ring strips 2 rows and 2 columns (top/bottom and left/right). An 8 x 8 matrix has 8 / 2 = 4 concentric rings.'
      },
      {
        title: 'Puzzle 7: Matrix 180-Degree Rotation Decomposition',
        problemStatement: 'How can an N x N matrix be rotated 180 degrees in-place without transposing?',
        code: `// In-place 180-degree rotation options:`,
        options: [
            'A) Transpose twice',
            'B) Reverse all rows horizontally, then reverse all columns vertically',
            'C) Rotate 90 degrees clockwise, then transpose',
            'D) Swap primary and secondary diagonals'
        ],
        correctOptionIndex: 1,
        hint: 'Flipping horizontally and then vertically reflects every cell through the center: (r, c) -> (N-1-r, N-1-c).',
        solution: 'Option B is correct: Reverse all rows horizontally, then reverse all columns vertically.',
        explanation: 'A 180-degree rotation maps cell (r, c) to (N - 1 - r, N - 1 - c). Reversing rows maps c to N - 1 - c; reversing columns maps r to N - 1 - r. Together they achieve 180-degree rotation in O(1) space.'
      },
      {
        title: 'Puzzle 8: Snake Matrix Row Parity Direction',
        problemStatement: 'In an 0-indexed snake/zigzag matrix fill of size 5x5, which rows are filled from right to left?',
        code: `// Rows: 0, 1, 2, 3, 4`,
        options: [
            'A) Rows 0, 2, 4',
            'B) Rows 1, 3',
            'C) All rows',
            'D) Only row 4'
        ],
        correctOptionIndex: 1,
        hint: 'Row 0 is left-to-right (even). Row 1 is right-to-left (odd).',
        solution: 'Option B is correct: Rows 1 and 3 (the odd-indexed rows).',
        explanation: 'In 0-indexed conventions, even rows (0, 2, 4) proceed left-to-right, while odd rows (1, 3) proceed right-to-left.'
      },
      {
        title: 'Puzzle 9: Concentric Number Box Min-Distance Value',
        problemStatement: 'In a concentric box with n = 5 (size = 9), what is the value at cell (2, 3)?',
        code: `int minDist = Math.min(Math.min(i, j), Math.min(size - 1 - i, size - 1 - j));
int val = n - minDist; // i = 2, j = 3, size = 9, n = 5`,
        options: [
            'A) 5',
            'B) 4',
            'C) 3',
            'D) 2'
        ],
        correctOptionIndex: 2,
        hint: 'i = 2, j = 3, 9-1-2 = 6, 9-1-3 = 5. Minimum is 2. val = 5 - 2 = 3.',
        solution: 'Option C is correct: 3.',
        explanation: 'Distances to the 4 edges are: top = 2, left = 3, bottom = 6, right = 5. The minimum distance is 2. Thus `val = 5 - 2 = 3`.'
      },
      {
        title: 'Puzzle 10: Clockwise Spiral 90-Degree Turn Sequence',
        problemStatement: 'What is the precise sequence of directional movements in standard clockwise spiral traversal?',
        code: `// Directional cycle:`,
        options: [
            'A) Down, Right, Up, Left',
            'B) Right, Down, Left, Up',
            'C) Left, Down, Right, Up',
            'D) Right, Up, Left, Down'
        ],
        correctOptionIndex: 1,
        hint: 'Starts at top-left going across the top row to the right.',
        solution: 'Option B is correct: Right, Down, Left, Up.',
        explanation: 'Clockwise spiral traversal begins at (0,0), sweeps Right across the top row, turns Down along the right column, turns Left across the bottom row, and turns Up along the left column.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Walk through the 4-Boundary Shrinking Box algorithm for Spiral Matrix Traversal. Why are the inner conditional guard checks mandatory for rectangular matrices?',
        answer: 'The 4-Boundary algorithm tracks four pointers defining the untraversed subgrid: `top = 0`, `bottom = R - 1`, `left = 0`, `right = C - 1`. Traversal proceeds in 4 phases within `while (top <= bottom && left <= right)`: 1) Left-to-Right along `top`, then `top++`. 2) Top-to-Bottom along `right`, then `right--`. 3) Right-to-Left along `bottom`, then `bottom--`. 4) Bottom-to-Top along `left`, then `left++`. The inner guard checks `if (top <= bottom)` and `if (left <= right)` are mandatory because after phase 1 and 2, `top` or `right` are mutated. In a matrix with an odd number of rows (e.g. 1x4 or 3x5), phase 1 may consume the final remaining row, causing `top > bottom`. Without the guard check before phase 3, the loop would execute the bottom row sweep across an already-visited row, corrupting the traversal with duplicate elements.',
        followUp: 'How does this algorithm handle a 1x1 matrix?',
        followUpAnswer: 'Top row runs for j from 0 to 0 (visits the single element), executes top++ (top=1). Because top > bottom (1 > 0), the guard checks block phases 3 and 4, and the while loop terminates cleanly.',
        keyPhrases: [
          '4-boundary pointers (top, bottom, left, right)',
          'Post-sweep pointer shrinkage (top++, right--, bottom--, left++)',
          'Inner guard checks: if (top <= bottom) and if (left <= right)',
          'Prevention of duplicate sweeps on single/odd row boundaries'
        ],
        commonMistakeAnswer: 'Omitting the guard checks and claiming the outer while loop condition is sufficient.'
      },
      {
        question: 'How do you rotate an N x N matrix 90 degrees clockwise IN-PLACE with O(1) auxiliary space? Prove why Transpose + Horizontal Reverse works.',
        answer: 'Let cell coordinates be (r, c) where `0 <= r, c < N`. When rotated 90 degrees clockwise, an element at (r, c) moves to new coordinate `(c, N - 1 - r)`. We can achieve this mapping through two geometric steps: Step 1 (Transpose): Swap `matrix[r][c]` with `matrix[c][r]` for all `r < c`. This maps `(r, c) -> (c, r)`. Step 2 (Horizontal Reflection): For each row, reverse its columns by swapping element at column `k` with `N - 1 - k`. This maps the second coordinate from `r` to `N - 1 - r`, resulting in `(c, N - 1 - r)`. Because both transpose and row reversal operate strictly via 2-element swaps, auxiliary space is strictly O(1) and time is O(N^2).',
        followUp: 'How would you rotate the matrix 90 degrees ANTI-CLOCKWISE in-place?',
        followUpAnswer: 'Two approaches: 1) Transpose first, then reverse each column vertically (`swap(mat[top][c], mat[bottom][c])`), or 2) Reverse each row horizontally first, then transpose.',
        keyPhrases: [
          'Target mapping: (r, c) -> (c, N - 1 - r)',
          'Transpose mapping: (r, c) -> (c, r)',
          'Horizontal reflection mapping: (c, r) -> (c, N - 1 - r)',
          'In-place two-element swap O(1) space'
        ],
        commonMistakeAnswer: 'Allocating a second matrix new int[n][n] and claiming it is in-place.'
      },
      {
        question: 'Derive the closed-form equation to compute any cell in a Concentric Number Square in O(1) time without allocating a matrix.',
        answer: 'In a concentric square of size `S = 2*n - 1` with numbers decreasing from `n` at the outer perimeter to `1` at the center: each concentric ring represents distance from the nearest boundary. For any 0-indexed cell (r, c): 1) Distance to top border is `r`. 2) Distance to left border is `c`. 3) Distance to bottom border is `(S - 1 - r)`. 4) Distance to right border is `(S - 1 - c)`. The layer/ring index is the minimum of these four distances: `d = Math.min(Math.min(r, c), Math.min(S - 1 - r, S - 1 - c))`. Because the outer ring (d = 0) has value `n`, ring d has value `n - d`. The formula `n - Math.min(Math.min(r, c), Math.min(S - 1 - r, S - 1 - c))` computes the exact value in O(1) time and O(1) space.',
        followUp: 'What if the numbers increase from 1 at the border up to n at the center?',
        followUpAnswer: 'Simply invert the relation: `val = 1 + d`.',
        keyPhrases: [
          'Chebyshev boundary distance',
          'd = min(min(r, c), min(S-1-r, S-1-c))',
          'Formula: n - d for outer n to center 1',
          'O(1) time per cell, zero memory allocation'
        ],
        commonMistakeAnswer: 'Simulating the pattern by filling concentric square rings inside a 2D array.'
      },
      {
        question: 'Explain the Direction Vector approach for Spiral Matrix Traversal and compare it with the 4-Boundary approach.',
        answer: 'The Direction Vector approach simulates a walking agent with coordinates `(r, c)` and direction index `d = 0`. Directions are encoded as arrays: `int[] dr = {0, 1, 0, -1}` and `int[] dc = {1, 0, -1, 0}` (Right, Down, Left, Up). At each step: 1) Mark `visited[r][c] = true`. 2) Calculate next position `nr = r + dr[d]`, `nc = c + dc[d]`. 3) If `(nr, nc)` is out of bounds or already visited, turn 90 degrees right: `d = (d + 1) % 4`, and recompute `nr = r + dr[d]`, `nc = c + dc[d]`. 4) Update `r = nr, c = nc`. Comparison: The direction vector approach is conceptually intuitive for grid simulations (like robot paths) but requires O(R * C) auxiliary memory for the `visited` array (or in-place cell mutation) and incurs modulo/branching overhead. The 4-Boundary approach requires zero visited array and runs faster.',
        followUp: 'Can the direction vector approach run without a boolean[][] visited matrix?',
        followUpAnswer: 'Yes, if the matrix itself can be mutated by overwriting visited cells with a sentinel value (e.g. Integer.MIN_VALUE or 101 if values are bounded).',
        keyPhrases: [
          'Direction arrays dr = {0, 1, 0, -1}, dc = {1, 0, -1, 0}',
          'Turn condition: (d + 1) % 4 on boundary or collision',
          'Visited matrix O(R*C) memory overhead',
          '4-Boundary superior for cache and memory efficiency'
        ],
        commonMistakeAnswer: 'Failing to realize that direction vectors require collision tracking, unlike the 4-boundary method.'
      },
      {
        question: 'How do CPU Cache Lines and Memory Layout affect the performance of 2D matrix traversals in Java?',
        answer: 'In Java, multidimensional arrays are "arrays of arrays"—heap objects containing pointers to distinct 1D array instances. When traversing row-major (`for i: for j: access mat[i][j]`), the inner loop accesses consecutive memory addresses within the same 1D array. When a thread accesses `mat[i][0]`, the CPU hardware prefetcher loads an entire 64-byte Cache Line (containing 16 consecutive 32-bit integers) into L1 Data Cache. All subsequent 15 accesses hit the L1 cache in ~1 nanosecond. In contrast, column-major traversal (`for j: for i: access mat[i][j]`) jumps between completely different array heap objects on every iteration. Each jump causes an L1/L2 cache miss and TLB miss, forcing expensive DRAM access (~50-100 ns). In large matrices, row-major traversal is 10x to 20x faster.',
        followUp: 'How does Transpose affect cache performance, and how can it be optimized for massive matrices?',
        followUpAnswer: 'A naive transpose naturally incurs column-major writes. For massive matrices (e.g. 10,000 x 10,000), engineers use Cache-Blocking (Tiling): dividing the matrix into small B x B sub-blocks (e.g. 32x32) that fit entirely within L1 cache, transposing block-by-block.',
        keyPhrases: [
          '64-byte CPU cache line prefetching',
          'L1/L2 cache hit vs DRAM latency (1ns vs 70ns)',
          'Spatial locality in row-major order',
          'Cache-blocking / Tiling for large matrix transpositions'
        ],
        commonMistakeAnswer: 'Assuming 2D arrays are stored as a single contiguous linear memory block in the JVM.'
      },
      {
        question: 'Explain the Diagonal Traverse algorithm (LeetCode 498) where directions alternate between up-right and down-left.',
        answer: 'In an M x N matrix, the sum of indices `s = r + c` identifies each diagonal, ranging from `0` to `M + N - 2` (total M + N - 1 diagonals). 1) When `s` is even: traversal moves UP-RIGHT. Start at row `r = min(s, M - 1)`, compute `c = s - r`. Loop while `r >= 0 && c < N`, decrementing `r--` and incrementing `c++`. 2) When `s` is odd: traversal moves DOWN-LEFT. Start at col `c = min(s, N - 1)`, compute `r = s - c`. Loop while `c >= 0 && r < M`, decrementing `c--` and incrementing `r++`. This guarantees all elements are visited in exact zigzag diagonal order in O(M * N) time with zero extra space.',
        followUp: 'Why is r = min(s, M - 1) necessary when starting the up-right diagonal?',
        followUpAnswer: 'Because when s >= M, starting at r = s would exceed the valid row boundary (M - 1). The min clamp ensures we start at the valid bottom-most available row.',
        keyPhrases: [
          'Index sum invariant s = r + c',
          'Even sum: up-right (r--, c++)',
          'Odd sum: down-left (r++, c--)',
          'Boundary clamping: min(s, M - 1) and min(s, N - 1)'
        ],
        commonMistakeAnswer: 'Using a collection of lists to collect diagonals and then reversing even lists, which uses O(M*N) extra memory.'
      },
      {
        question: 'How do you extract and print only the boundary elements of a matrix in clockwise order?',
        answer: 'Boundary extraction is essentially a single outer cycle of the spiral algorithm: 1) Print top row: `for (int j = 0; j < C; j++) print(mat[0][j])`. 2) Print right column (excluding top-right corner): `for (int i = 1; i < R; i++) print(mat[i][C - 1])`. 3) Print bottom row in reverse (excluding bottom-right corner, guarded by `R > 1`): `for (int j = C - 2; j >= 0; j--) print(mat[R - 1][j])`. 4) Print left column upward (excluding top-left and bottom-left corners, guarded by `C > 1`): `for (int i = R - 2; i >= 1; i--) print(mat[i][0])`. The perimeter contains `2*R + 2*C - 4` elements for R, C > 1.',
        followUp: 'What is the perimeter element count when R = 1 or C = 1?',
        followUpAnswer: 'When R = 1, it is C elements. When C = 1, it is R elements. The guards prevent double counting.',
        keyPhrases: [
          'Perimeter formula: 2*R + 2*C - 4',
          'Corner deduplication via offset bounds',
          'Guards R > 1 and C > 1 for degenerate matrices',
          'Single cycle spiral subset'
        ],
        commonMistakeAnswer: 'Printing all 4 edges from 0 to N without adjusting corner indices, printing the 4 corner cells twice.'
      },
      {
        question: 'How do you rotate only the outermost ring of an N x M matrix clockwise by K positions?',
        answer: '1) Extract the outermost ring into a 1D linear array of size `L = 2*R + 2*C - 4`. 2) Normalize rotation count: `k = k % L`. If `k < 0`, `k += L`. 3) Rotate the 1D array in-place by K positions using the 3-reversal algorithm: `reverse(0, L-1)`, `reverse(0, k-1)`, `reverse(k, L-1)`. 4) Write the rotated 1D elements back into the perimeter cells in the exact same clockwise traversal order. This achieves the rotation in O(L) time and O(L) temporary memory without shifting cells one-by-one.',
        followUp: 'How can this be extended to rotate the ENTIRE matrix layer-by-layer (Matrix Block Rotation)?',
        followUpAnswer: 'By running this ring rotation algorithm iteratively for each concentric layer from ring 0 to min(R, C)/2 - 1.',
        keyPhrases: [
          'Ring perimeter length L = 2*R + 2*C - 4',
          'Modulo normalization k % L',
          '3-reversal 1D rotation algorithm',
          'Clockwise scatter-gather writeback'
        ],
        commonMistakeAnswer: 'Shifting the 2D elements one step at a time K times, causing O(K * L) slow performance.'
      },
      {
        question: 'How do you check if a matrix is a Toeplitz Matrix (every diagonal from top-left to bottom-right has identical elements)?',
        answer: 'A matrix is Toeplitz if every cell `matrix[i][j]` equals `matrix[i - 1][j - 1]` for all `i > 0` and `j > 0`. Rather than traversing individual diagonals: iterate row-major `for (int i = 1; i < R; i++)` and `for (int j = 1; j < C; j++)`: check `if (matrix[i][j] != matrix[i - 1][j - 1]) return false;`. If all checks pass, return `true`. This runs in O(R * C) time, O(1) auxiliary space, and benefits from maximum CPU cache locality.',
        followUp: 'What if the matrix is so massive that it cannot fit in memory and must be read row by row from disk?',
        followUpAnswer: 'Store only the previous row in memory (`int[] prevRow`). When reading the current row, compare `currentRow[j] == prevRow[j - 1]` for `j >= 1`. This reduces memory from O(R*C) to O(C).',
        keyPhrases: [
          'Toeplitz definition: mat[i][j] == mat[i-1][j-1]',
          'Row-major single pass validation',
          'Streaming memory optimization: O(C) memory buffer',
          'Cache-friendly adjacent cell comparison'
        ],
        commonMistakeAnswer: 'Writing complex diagonal iteration loops when a simple adjacent neighbor check is all that is required.'
      },
      {
        question: 'Explain how to generate an Outward Expanding Spiral (Ulam Spiral / Prime Spiral) starting from the center.',
        answer: 'An outward spiral starts at the center coordinate `(r, c) = (N/2, N/2)` and moves in expanding concentric square shells: Right 1, Down 1, Left 2, Up 2, Right 3, Down 3, Left 4, Up 4... Notice the step pattern: the step length starts at 1 and increases by 1 every TWO directional turns (1, 1, 2, 2, 3, 3, 4, 4...). By maintaining `stepLength = 1`, `direction = 0`, and a loop counter, the algorithm walks the grid outward, writing consecutive numbers until reaching N^2. In the Ulam spiral, composite numbers are printed as dots and primes as numbers/stars, revealing unexpected diagonal prime clusters.',
        followUp: 'Why do primes form diagonals in the Ulam spiral?',
        followUpAnswer: 'Because quadratic polynomials of the form f(4x^2 + bx + c) generate rich sequences of primes (like Euler’s prime polynomial n^2 - n + 41), which map to straight diagonal lines on the square spiral grid.',
        keyPhrases: [
          'Center origin (N/2, N/2)',
          'Step sequence 1, 1, 2, 2, 3, 3, 4, 4...',
          'Step length increments every two turns',
          'Ulam spiral quadratic polynomial diagonals'
        ],
        commonMistakeAnswer: 'Attempting to run the inward shrinking box backwards without realizing the step lengths expand in pairs.'
      }
    ],
    miniQuiz: [
      {
        question: 'How many boundary pointers are maintained in the shrinking box spiral algorithm?',
        options: [
            '2',
            '4',
            '6',
            '8'
        ],
        correctIndex: 1,
        explanation: 'The 4 boundaries are top, bottom, left, and right.'
      },
      {
        question: 'In a square matrix of size n x n, what is the time complexity of generating a spiral fill from 1 to n^2?',
        options: [
            'O(n)',
            'O(n log n)',
            'O(n^2)',
            'O(n^3)'
        ],
        correctIndex: 2,
        explanation: 'Every one of the n^2 cells is visited exactly once, making the time complexity O(n^2).'
      },
      {
        question: 'Which two operations rotate an N x N matrix 90 degrees clockwise in-place?',
        options: [
            'Transpose, then reverse each row',
            'Transpose, then reverse each column',
            'Reverse each row, then reverse each column',
            'Swap diagonals, then transpose'
        ],
        correctIndex: 0,
        explanation: 'Transposing followed by reversing each row horizontally rotates the matrix 90 degrees clockwise.'
      },
      {
        question: 'Why are `if (top <= bottom)` guard checks required in spiral matrix algorithms?',
        options: [
            'To prevent infinite loops',
            'To prevent duplicate traversal in odd/rectangular grids',
            'To allocate memory dynamically',
            'To handle negative numbers'
        ],
        correctIndex: 1,
        explanation: 'After updating top or right, the subgrid might be fully visited; the guard checks ensure bottom and left traversals do not re-visit rows/columns.'
      },
      {
        question: 'All cells on the primary diagonal of an N x N matrix share which property?',
        options: [
            'row + col == N - 1',
            'row == col',
            'row - col == 1',
            'row + col == 0'
        ],
        correctIndex: 1,
        explanation: 'The primary diagonal running from top-left to bottom-right consists of cells where row index equals column index (row == col).'
      },
      {
        question: 'In a concentric number square of size 2*n - 1, what does `min(i, j, size-1-i, size-1-j)` compute?',
        options: [
            'The value printed in the cell',
            'Distance from cell to the nearest border',
            'Distance to the center',
            'Row index'
        ],
        correctIndex: 1,
        explanation: 'It computes the minimum distance of the cell (i, j) to any of the 4 outer walls (top, left, bottom, right).'
      },
      {
        question: 'What is the sum of row and col indices for all cells on the anti-diagonal in an N x N matrix (0-indexed)?',
        options: [
            'N',
            'N - 1',
            '2 * N',
            '0'
        ],
        correctIndex: 1,
        explanation: 'In 0-indexed grids, the anti-diagonal satisfies row + col = N - 1.'
      },
      {
        question: 'Which traversal order maximizes CPU L1/L2 cache hit rates for Java 2D arrays?',
        options: [
            'Column-major order (for j; for i; mat[i][j])',
            'Row-major order (for i; for j; mat[i][j])',
            'Random order',
            'Diagonal order'
        ],
        correctIndex: 1,
        explanation: 'Row-major order accesses elements consecutively within the same 1D array object, leveraging hardware cache line prefetching.'
      },
      {
        question: 'How many total elements are on the perimeter border of an R x C matrix (R > 1, C > 1)?',
        options: [
            '2 * R + 2 * C',
            '2 * R + 2 * C - 4',
            'R * C',
            '2 * (R + C)'
        ],
        correctIndex: 1,
        explanation: 'Sum of the 4 sides is 2*R + 2*C, but the 4 corner cells are counted twice, giving 2*R + 2*C - 4.'
      },
      {
        question: 'What matrix transformation is produced by transposing and then reversing columns vertically?',
        options: [
            '90° Clockwise rotation',
            '90° Anti-clockwise rotation',
            '180° Rotation',
            'Identity matrix'
        ],
        correctIndex: 1,
        explanation: 'Transpose followed by vertical column reversal produces a 90-degree counter-clockwise (anti-clockwise) rotation.'
      }
    ]
  }
};
