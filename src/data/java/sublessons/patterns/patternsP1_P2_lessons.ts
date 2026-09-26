import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE P1 & P2: PATTERN PROGRAMS & LOGIC BUILDING (PART 1)
// Star Patterns, Symmetrical Pyramids, Number Series, Floyd's & Pascal
// ============================================================

export const patternsP1_P2_lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON P1.1: Star Patterns & Symmetrical Pyramids
  // ─────────────────────────────────────────────────────────────
  'star-patterns-and-pyramids': {
    id: 'star-patterns-and-pyramids',
    moduleId: 'java-patterns',
    moduleTitle: '6. Pattern Programs & Logic Building',
    lessonNumber: 'Lesson 6.1',
    title: 'Star Patterns & Symmetrical Pyramids',
    subtitle: 'Nested loop coordinate mapping (row i, column j), spaces vs star mathematical relations, right-angled triangles, inverted pyramids, centered pyramids, diamonds, hollow diamonds, and butterfly patterns',
    estimatedMinutes: 35,
    beginnerAnalogy: 'Think of printing star patterns like a robotic typewriter or an inkjet printer head traversing a 2D canvas row by row. The typewriter carriage can only move from left to right along the horizontal axis (inner loop j) and then execute a carriage return / line feed to move down to the next row (outer loop i). It can never move backward or jump up to a previous line! Therefore, every 2D shape—whether a simple right-angled triangle, a majestic centered pyramid, or an intricate hollow butterfly—is fundamentally a mathematical schedule of decisions made before each carriage return: "How many blank space characters must I emit first, how many visible star glyphs must I stamp next, and when must I advance to the next line?"',
    interviewTakeaways: [
      'The 2D Grid Mental Model: Every 2D pattern program is governed by an outer loop controlling the row index i (1 to n or 0 to n-1) and one or more inner loops controlling columns j. Formulating the relationship between row index i and column count j is the core skill.',
      'Space-Star Linear Equations: In symmetric centered pyramids of height n, row i (1-indexed) requires exactly (n - i) leading spaces and (2*i - 1) stars. The odd number formula (2*i - 1) guarantees a unique central apex star.',
      'Symmetry and Reflection via Two-Phase vs Math.abs(): Symmetric structures like diamonds and butterflies can either be rendered via two sequential loop phases (upper half 1..n, lower half n-1..1) or via a single loop using radial distance Math.abs(mid - i) from the center.',
      'Hollow Pattern Boundary Predicates: Hollow shapes convert a solid fill into a conditional test: print a star if the cell lies on a boundary (e.g., j == 1 || j == 2*i - 1 || i == n), otherwise print a space.',
      'Manhattan Distance Formulation: Concentric diamonds and hollow diamonds can be elegantly expressed using Manhattan distance: |row - mid| + |col - mid| == mid for hollow diamond boundaries.',
      'I/O Performance Optimization: Calling System.out.print() millions of times in nested loops incurs heavy kernel context-switch overhead. In competitive programming and high-performance services, buffer pattern rows using StringBuilder or BufferedWriter.'
    ],
    cheatSheet: {
      summary: 'Coordinate mapping converts geometric shapes into nested loop bounds. Outer loop dictates row index i; inner loops emit leading spaces, characters, and newline.',
      syntaxTemplate: `// Standard Pattern Template (1-indexed)
int n = 5;
for (int i = 1; i <= n; i++) {
    // Phase 1: Leading spaces
    for (int s = 1; s <= n - i; s++) {
        System.out.print(" ");
    }
    // Phase 2: Stars / Characters
    for (int j = 1; j <= 2 * i - 1; j++) {
        System.out.print("*");
    }
    // Phase 3: Line feed
    System.out.println();
}`,
      rules: [
        { rule: 'Row Invariance', explanation: 'The outer loop variable i represents the current row and remains invariant across all inner loop executions for that line.' },
        { rule: 'Leading vs Trailing Spaces', explanation: 'Leading spaces are mandatory to shift visible characters to the right. Trailing spaces are generally redundant unless building an explicit 2D char buffer.' },
        { rule: 'Odd Star Progression', explanation: 'To achieve a centered pyramid with a single peak star, the star count must increase by 2 per row: formula is (2 * i - 1) for 1-indexed loops.' },
        { rule: 'Hollow Border Condition', explanation: 'Replace solid inner loops with if (j == 1 || j == maxCols || i == 1 || i == maxRows) to render hollow borders.' },
        { rule: 'Index Base Consistency', explanation: 'Always remain consistent with 0-indexed vs 1-indexed loops. 1-indexed is generally easier for human geometric reasoning.' }
      ],
      quickComparison: [
        { aspect: 'Right Triangle', optionA: 'Spaces: 0', optionB: 'Stars: i' },
        { aspect: 'Inverted Right Triangle', optionA: 'Spaces: 0', optionB: 'Stars: n - i + 1' },
        { aspect: 'Centered Pyramid', optionA: 'Spaces: n - i', optionB: 'Stars: 2 * i - 1' },
        { aspect: 'Inverted Pyramid', optionA: 'Spaces: i - 1', optionB: 'Stars: 2 * (n - i) + 1' },
        { aspect: 'Diamond (Row i of 2n-1)', optionA: 'Spaces: |n - i|', optionB: 'Stars: 2 * (n - |n - i|) - 1' }
      ]
    },
    coreExplanation: [
      'The Cartesian Canvas and the Matrix Coordinate System: In standard school mathematics, the origin (0,0) is at the bottom-left corner with the Y-axis pointing upward. In computer graphics, console terminal printing, and 2D arrays, the coordinate system is inverted: (0,0) is at the TOP-LEFT corner. The row index i increases DOWNWARD, while the column index j increases RIGHTWARD. Understanding this coordinate flip is the foundational step in logic building.',
      'Deriving Linear Equations for Inner Loops: The secret to solving any triangular or pyramidal pattern is creating a mathematical table linking the row number i to the required counts of spaces and stars. For a centered pyramid of height n = 5: at Row 1 (i=1), spaces = 4, stars = 1; at Row 2 (i=2), spaces = 3, stars = 3; at Row 3 (i=3), spaces = 2, stars = 5; at Row 4 (i=4), spaces = 1, stars = 7; at Row 5 (i=5), spaces = 0, stars = 9. Notice the linear relations: Spaces(i) = n - i, Stars(i) = 2*i - 1. Once these algebraic expressions are established, writing the code is mechanical.',
      'The Two-Phase Symmetric Decomposition: Shapes like the full diamond (rhombus) or hourglass exhibit vertical symmetry. The simplest, cleanest approach to rendering them is two-phase decomposition: write a first loop nest for the upper half (rows 1 to n), followed by an independent second loop nest for the lower half (rows n-1 down to 1). This eliminates complex branching conditionals inside the loop body.',
      'Single-Loop Mathematical Modeling using Absolute Value: An alternative advanced technique renders symmetric patterns using a single outer loop running from 1 to 2*n - 1. By defining the radial distance from the center row mid = n as d = Math.abs(mid - i), the space count becomes d and the star count becomes 2*(n - d) - 1. This mathematical approach demonstrates deep algorithmic reasoning in technical interviews.',
      'Hollow Shapes and Coordinate Boundary Predicates: Hollow patterns require distinguishing perimeter pixels from interior pixels. Rather than changing the loop ranges, the loop ranges remain identical to the solid pattern, but the inner printing statement is wrapped in an if-else condition: if (j == 1 || j == totalStarsOnRow || i == 1 || i == totalRows) emit "*", else emit " ".',
      'The Butterfly Pattern Dynamics: The butterfly pattern consists of two opposing right-angled triangles separated by a shrinking central gap of spaces in the upper half, which inverts in the lower half. For row i (1 to n): Left stars = i, Middle spaces = 2*(n - i), Right stars = i. At the middle row i = n, middle spaces collapse to 0. In the lower half, the formulas reverse symmetrically.'
    ],
    diagram: `COORDINATE MAPPING & PYRAMID DECOMPOSITION
========================================================================

Matrix Origin: (Row i, Col j) -> Top-Left is (1, 1)

Row i  Spaces (n - i)    Stars (2*i - 1)       Output Visual
------------------------------------------------------------------------
i = 1  [ . . . . ] (4)   [ * ]           (1)       *
i = 2  [ . . . ]   (3)   [ * * * ]       (3)      ***
i = 3  [ . . ]     (2)   [ * * * * * ]   (5)     *****
i = 4  [ . ]       (1)   [ * * * * * * * ](7)   *******
i = 5  [ ]         (0)   [ * * * * * * * * * ] *********

------------------------------------------------------------------------
BUTTERFLY PATTERN DYNAMICS (n = 4):
Row i  Left Stars(i)   Gap Spaces 2*(n-i)   Right Stars(i)   Visual
------------------------------------------------------------------------
i = 1  * (1)           . . . . . . (6)      * (1)            *      *
i = 2  * * (2)         . . . . (4)          * * (2)          **    **
i = 3  * * * (3)       . . (2)              * * * (3)        ***  ***
i = 4  * * * * (4)     (0)                  * * * * (4)      ********
------------------------------------------------------------------------
i = 3  * * * (3)       . . (2)              * * * (3)        ***  ***
i = 2  * * (2)         . . . . (4)          * * (2)          **    **
i = 1  * (1)           . . . . . . (6)      * (1)            *      *`,
    codeSnippet: {
      title: 'Full Symmetrical Star Diamond & Hollow Diamond',
      code: `public class DiamondPatterns {
    public static void printSolidDiamond(int n) {
        // Upper Half (Rows 1 to n)
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Half (Rows n - 1 down to 1)
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }

    public static void printHollowDiamond(int n) {
        // Upper Half
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) {
                if (j == 1 || j == 2 * i - 1) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
        // Lower Half
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) {
                if (j == 1 || j == 2 * i - 1) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Solid Diamond (n = 4) ---");
        printSolidDiamond(4);
        System.out.println("--- Hollow Diamond (n = 4) ---");
        printHollowDiamond(4);
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 1; i <= n; i++)', explanation: 'Outer loop iterates through the top half rows from 1 to n.' },
        { line: 'for (int s = 1; s <= n - i; s++) System.out.print(" ");', explanation: 'Emits decreasing leading spaces (n-1, n-2, ..., 0) to align the apex.' },
        { line: 'for (int j = 1; j <= 2 * i - 1; j++)', explanation: 'Emits an odd number of positions on row i.' },
        { line: 'if (j == 1 || j == 2 * i - 1) System.out.print("*");', explanation: 'In hollow diamond, prints star only on the left and right perimeter boundaries.' },
        { line: 'for (int i = n - 1; i >= 1; i--)', explanation: 'Inverts the row counter to reflect the top half into a matching bottom half.' }
      ],
      output: `--- Solid Diamond (n = 4) ---
   *
  ***
 *****
*******
 *****
  ***
   *
--- Hollow Diamond (n = 4) ---
   *
  * *
 *   *
*     *
 *   *
  * *
   *`
    },
    codeExamples: [
      {
        title: 'Hourglass Star Pattern',
        description: 'Demonstrates an inverted pyramid followed by a centered upright pyramid to form an hourglass.',
        code: `public class HourglassPattern {
    public static void main(String[] args) {
        int n = 4;
        // Upper inverted pyramid
        for (int i = n; i >= 1; i--) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
        // Lower upright pyramid (start from 2 to avoid duplicate middle apex)
        for (int i = 2; i <= n; i++) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
        output: `*******
 *****
  ***
   *
  ***
 *****
*******`
      },
      {
        title: 'Butterfly Pattern with Opposing Triangles',
        description: 'Two mirrored triangles with dynamically expanding and contracting space gaps.',
        code: `public class ButterflyPattern {
    public static void main(String[] args) {
        int n = 4;
        // Upper Wings
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            for (int s = 1; s <= 2 * (n - i); s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Wings
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            for (int s = 1; s <= 2 * (n - i); s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
        output: `*      *
**    **
***  ***
********
********
***  ***
**    **
*      *`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using System.out.println() instead of System.out.print() inside the inner column loop.',
        whyItHappens: 'Beginners conflate printing a character on the current row with printing an entire line, causing each star to appear on its own line vertically.',
        howToFix: 'Use System.out.print() for spaces and characters inside the inner loops. Call System.out.println() exactly once per row immediately after the inner loops complete.'
      },
      {
        mistake: 'Forgetting leading spaces when attempting to right-align or center a pyramid.',
        whyItHappens: 'Looking at console output, blank spaces are invisible, leading learners to assume stars magically position themselves in the center.',
        howToFix: 'Always calculate and print the required count of " " (blank space) characters before emitting the stars for that row.'
      },
      {
        mistake: 'Duplicating the middle row when combining upper and lower halves in diamonds or hourglasses.',
        whyItHappens: 'Running both upper loop (1 to n) and lower loop (n down to 1) prints the widest row twice.',
        howToFix: 'Start the lower loop at (n - 1) instead of n, or skip the apex in the second half.'
      },
      {
        mistake: 'Off-by-one errors in centered pyramid star counts producing even numbers of stars.',
        whyItHappens: 'Writing j <= 2 * i instead of j <= 2 * i - 1 outputs 2, 4, 6, 8 stars, which cannot have a centered peak.',
        howToFix: 'Use the formula 2 * i - 1 for 1-indexed loops to guarantee odd sequence: 1, 3, 5, 7, 9.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Right-Angled Triangle Boundary Off-by-One',
        problemStatement: 'What does the following code print when n = 4?',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) A 4-row right-angled triangle with 1, 2, 3, 4 stars',
            'B) A blank line followed by rows with 1, 2, 3 stars (total 4 lines)',
            'C) Compilation error',
            'D) An infinite loop'
        ],
        correctOptionIndex: 1,
        hint: 'Examine the condition `j < i`. What happens when i = 1?',
        solution: 'Option B is correct: A blank line followed by rows with 1, 2, 3 stars.',
        explanation: 'When i = 1, the inner condition is `j < 1`, which is false immediately for j = 1. Nothing is printed before the newline, producing an empty line. For i = 2, 3, 4, it prints 1, 2, and 3 stars respectively. To get 1..4 stars, the condition must be `j <= i`.'
      },
      {
        title: 'Puzzle 2: Leading Space Formula in Inverted Pyramid',
        problemStatement: 'What is the exact output of this code snippet?',
        code: `public class Puzzle2 {
    public static void main(String[] args) {
        int n = 3;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s < i; s++) System.out.print("-");
            for (int j = 1; j <= 2 * (n - i) + 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
        options: [
            'A)\n*****\n-***\n--*',
            'B)\n-*****\n--***\n---*',
            'C)\n***\n-**\n--*',
            'D)\n*****\n***\n*'
        ],
        correctOptionIndex: 0,
        hint: 'For i=1, s < 1 is false (0 dashes), stars = 2*(3-1)+1 = 5.',
        solution: 'Option A is correct.',
        explanation: 'Row 1 (i=1): 0 dashes, 5 stars (*****). Row 2 (i=2): 1 dash, 3 stars (-***). Row 3 (i=3): 2 dashes, 1 star (--*).'
      },
      {
        title: 'Puzzle 3: Hollow Square Diagonal Check',
        problemStatement: 'What shape is rendered by the following condition inside an n x n loop?',
        code: `public class Puzzle3 {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) A hollow square with empty diagonals',
            'B) An "X" shape / Cross along both diagonals',
            'C) A plus sign "+" through the center',
            'D) A solid square of stars'
        ],
        correctOptionIndex: 1,
        hint: 'i == j is the main diagonal. i + j == n + 1 is the anti-diagonal.',
        solution: 'Option B is correct: An "X" shape / Cross along both diagonals.',
        explanation: 'In an n x n matrix, cells where row index equals column index (i == j) form the primary diagonal from top-left to bottom-right. Cells where i + j == n + 1 form the secondary (anti) diagonal from top-right to bottom-left. Together they form an "X".'
      },
      {
        title: 'Puzzle 4: Rhombus Loop Shift Evaluation',
        problemStatement: 'How many total space characters are emitted across all rows in this rhombus of size n = 4?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= n; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) 10 spaces',
            'B) 6 spaces',
            'C) 4 spaces',
            'D) 16 spaces'
        ],
        correctOptionIndex: 1,
        hint: 'Calculate spaces per row: (4 - 1) + (4 - 2) + (4 - 3) + (4 - 4).',
        solution: 'Option B is correct: 6 spaces.',
        explanation: 'For i = 1: 4 - 1 = 3 spaces. For i = 2: 4 - 2 = 2 spaces. For i = 3: 4 - 3 = 1 space. For i = 4: 4 - 4 = 0 spaces. Total spaces = 3 + 2 + 1 + 0 = 6 spaces.'
      },
      {
        title: 'Puzzle 5: Mirrored Right Triangle Alignment',
        problemStatement: 'What does this program print for n = 3?',
        code: `public class Puzzle5 {
    public static void main(String[] args) {
        int n = 3;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (j <= n - i) System.out.print(" ");
                else System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) Left-aligned right triangle',
            'B) Right-aligned right triangle',
            'C) Centered pyramid',
            'D) Inverted left-aligned right triangle'
        ],
        correctOptionIndex: 1,
        hint: 'For i=1: 2 spaces, 1 star. For i=2: 1 space, 2 stars. For i=3: 0 spaces, 3 stars.',
        solution: 'Option B is correct: Right-aligned right triangle.',
        explanation: 'The condition `j <= n - i` outputs spaces until column n - i, after which stars are printed. This pushes the stars to the right boundary of the n x n box, creating a right-aligned triangle.'
      },
      {
        title: 'Puzzle 6: Hollow Diamond Perimeter Condition',
        problemStatement: 'In a centered hollow diamond with height parameter n = 4 (top half rows 1..4), what is printed on row 3?',
        code: `// Top half hollow diamond logic:
for (int s = 1; s <= n - i; s++) System.out.print(" ");
for (int j = 1; j <= 2 * i - 1; j++) {
    if (j == 1 || j == 2 * i - 1) System.out.print("*");
    else System.out.print(" ");
}`,
        options: [
            'A) `  * *` (2 spaces, star, space, star)',
            'B) ` *   *` (1 space, star, 3 spaces, star)',
            'C) ` *** `',
            'D) `*     *`'
        ],
        correctOptionIndex: 1,
        hint: 'For i = 3: leading spaces = n - i = 4 - 3 = 1. Inner range is 1 to 2*3 - 1 = 5.',
        solution: 'Option B is correct: ` *   *`.',
        explanation: 'At i = 3: leading spaces = 4 - 3 = 1 space. Inside the inner loop (j = 1 to 5): j=1 prints "*", j=2,3,4 print " " (3 spaces), and j=5 prints "*". Total line is 1 leading space, star, 3 spaces, star.'
      },
      {
        title: 'Puzzle 7: Butterfly Middle Row Star Count',
        problemStatement: 'In the butterfly pattern for n = 4, how many stars are printed on row i = 4?',
        code: `// Row i = 4:
for (int j = 1; j <= i; j++) System.out.print("*");
for (int s = 1; s <= 2 * (n - i); s++) System.out.print(" ");
for (int j = 1; j <= i; j++) System.out.print("*");`,
        options: [
            'A) 4 stars',
            'B) 6 stars with 2 spaces in between',
            'C) 8 continuous stars with 0 spaces',
            'D) 16 stars'
        ],
        correctOptionIndex: 2,
        hint: 'At i = 4, n - i = 0. How many spaces are printed?',
        solution: 'Option C is correct: 8 continuous stars with 0 spaces.',
        explanation: 'When i = 4: left loop prints 4 stars. Spaces loop runs for s <= 2*(4-4) = 0 times (0 spaces). Right loop prints 4 stars. Result: 8 contiguous stars: `********`.'
      },
      {
        title: 'Puzzle 8: Checkerboard Grid Parity',
        problemStatement: 'What does the following pattern generate?',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        int n = 3;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print((i + j) % 2 == 0 ? "* " : "O ");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) All stars',
            'B) Alternating checkerboard grid of * and O',
            'C) Rows of stars alternating with rows of Os',
            'D) Primary diagonal of * with Os elsewhere'
        ],
        correctOptionIndex: 1,
        hint: '(i + j) % 2 alternates between 0 and 1 across adjacent cells.',
        solution: 'Option B is correct: Alternating checkerboard grid.',
        explanation: 'Because the sum (i + j) alternates in parity for each step in both horizontal and vertical directions, this produces a 2D chessboard / checkerboard pattern of alternating symbols.'
      },
      {
        title: 'Puzzle 9: Hollow Square with Crosshair',
        problemStatement: 'What cells receive a star when condition is: `i == 1 || i == n || j == 1 || j == n || i == (n+1)/2 || j == (n+1)/2` for n = 5?',
        code: `// n = 5 (odd dimension)`,
        options: [
            'A) Only the outer border of the square',
            'B) Hollow square plus a central horizontal and vertical cross (window pane)',
            'C) A solid 5x5 square',
            'D) An X inside a square'
        ],
        correctOptionIndex: 1,
        hint: 'The first 4 terms define the border; the last 2 terms define the middle row and middle column.',
        solution: 'Option B is correct: A 4-pane window / crosshair pattern inside a square.',
        explanation: '`i==1 || i==n || j==1 || j==n` draws the 4 borders of the square. `i == (n+1)/2` draws the middle horizontal line, and `j == (n+1)/2` draws the middle vertical line, forming a 4-pane window.'
      },
      {
        title: 'Puzzle 10: Downward Triangle Step Increment',
        problemStatement: 'What is the output of this loop with step 2?',
        code: `public class Puzzle10 {
    public static void main(String[] args) {
        for (int i = 5; i >= 1; i -= 2) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A) 5 stars, then 4 stars, then 3 stars',
            'B) 5 stars, then 3 stars, then 1 star',
            'C) 5 stars, then 1 star',
            'D) Infinite loop'
        ],
        correctOptionIndex: 1,
        hint: 'Look at the decrement: i -= 2. Values of i are 5, 3, 1.',
        solution: 'Option B is correct: 5 stars, then 3 stars, then 1 star.',
        explanation: 'The outer loop starts at i = 5, decrements by 2 to 3, and then to 1. The inner loop prints i stars each time, resulting in 3 lines containing 5, 3, and 1 stars.'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do you systematically derive the mathematical equations relating row index i to spaces and stars for any symmetric pyramid?',
        answer: 'The systematic derivation follows a 4-step tabular method: 1) Construct a discrete state table with columns: Row Number i, Leading Spaces S(i), and Printed Glyphs G(i). 2) Identify the linear slope: for spaces, if S decreases by 1 for each row increment, the equation is S(i) = n - i (for 1-indexed i). 3) For stars, if G starts at 1 and increases by 2 per row, it is an arithmetic progression with common difference d = 2 and initial term a = 1, giving G(i) = a + (i - 1)*d = 1 + 2*(i - 1) = 2*i - 1. 4) Verify against boundary conditions: at the peak (i = 1), S = n - 1 and G = 1; at the base (i = n), S = 0 and G = 2*n - 1.',
        followUp: 'What if the loop is 0-indexed (i = 0 to n-1)? How do the formulas change?',
        followUpAnswer: 'For 0-indexed loops: Spaces S(i) = n - 1 - i, and Stars G(i) = 2*i + 1. Both produce the identical geometric output.',
        keyPhrases: [
          'State table mapping row to space and star counts',
          'Arithmetic progression formula G(i) = a + (i-1)d',
          'Odd sequence 2*i - 1 for 1-indexed',
          'Boundary condition verification at apex and base'
        ],
        commonMistakeAnswer: 'Guessing and hardcoding trial-and-error numbers without setting up a linear equation.'
      },
      {
        question: 'How can you eliminate inner nested loops in Java and render patterns with O(N) loop iterations?',
        answer: 'In modern Java (Java 11+), string repetition allows eliminating the inner loops entirely. Using `String.repeat(int count)`, a row can be synthesized in a single statement: `System.out.println(" ".repeat(n - i) + "*".repeat(2 * i - 1));`. Under the hood, `String.repeat()` performs a vectorized array memory copy (using `System.arraycopy`), which is orders of magnitude faster than iterating a character printing loop in bytecode. In Java 8, one can achieve the same using a pre-filled `char[]` buffer or `new String(new char[count]).replace("\\0", "*")`.',
        followUp: 'Does using String.repeat() change the algorithmic time complexity of printing the pattern?',
        followUpAnswer: 'No. The total number of characters generated is still O(N^2) (the area of the shape). While the outer loop is O(N), repeating the string of length K takes O(K) memory operations, keeping overall computational time at O(N^2). However, it drastically reduces interpreter instruction overhead and branch mispredictions.',
        keyPhrases: [
          'Java 11 String.repeat()',
          'Vectorized System.arraycopy memory fill',
          'Outer O(N) iterations with O(K) row synthesis',
          'Overall time complexity remains O(N^2)'
        ],
        commonMistakeAnswer: 'Claiming that String.repeat() makes the pattern O(N) total time.'
      },
      {
        question: 'Explain how to render a symmetric Diamond pattern using a SINGLE outer loop via radial distance Math.abs().',
        answer: 'A diamond of height (2*n - 1) has its horizontal axis of symmetry at row mid = n. For any row i running from 1 to 2*n - 1, the vertical distance from the center row is `d = Math.abs(n - i)`. As i moves from 1 to 2*n - 1, d starts at n - 1, decreases to 0 at the equator (i = n), and increases back to n - 1. Remarkably, the leading space count is EXACTLY equal to d: `spaces = d`. The star count is `stars = 2 * (n - d) - 1`. This mathematical symmetry allows rendering the entire diamond with a single outer loop `for (int i = 1; i <= 2 * n - 1; i++)` without duplicating loops for upper and lower halves.',
        followUp: 'How does this formula adapt to a hollow diamond?',
        followUpAnswer: 'For a hollow diamond, the outer loop and space counts remain identical (`d = Math.abs(n - i)`), but inside the star loop (running 1 to 2*(n - d) - 1), we check `if (j == 1 || j == 2 * (n - d) - 1)` to print stars and spaces otherwise.',
        keyPhrases: [
          'Radial distance d = Math.abs(mid - i)',
          'Equator at i = n where d = 0',
          'Spaces = d and Stars = 2*(n - d) - 1',
          'Single outer loop from 1 to 2*n - 1'
        ],
        commonMistakeAnswer: 'Thinking two separate loop nests are mathematically required to draw symmetric shapes.'
      },
      {
        question: 'What is Manhattan Distance and how does it relate to generating diamonds, circles, and borders?',
        answer: 'Manhattan Distance (or L1 distance) between two points (x1, y1) and (x2, y2) on a grid is defined as `|x1 - x2| + |y1 - y2|`. In an n x n coordinate grid where center is `(mid, mid)` (with mid = n / 2): all points where `|i - mid| + |j - mid| <= mid` form a solid diamond (rhombus tilted at 45 degrees). All points where `|i - mid| + |j - mid| == mid` form the exact 1-pixel perimeter of a hollow diamond. By evaluating this single boolean predicate inside a standard n x n double loop, one can render hollow or solid diamonds without separate space and star loops.',
        followUp: 'What shape is produced if Euclidean distance (L2 norm) `(i-mid)^2 + (j-mid)^2 <= r^2` is used instead?',
        followUpAnswer: 'It produces an ASCII circle or disk. The discrete threshold approximation produces circular contours on the terminal.',
        keyPhrases: [
          'Manhattan L1 norm: |x - x_c| + |y - y_c|',
          'Perimeter condition == radius',
          'Solid interior condition <= radius',
          'Geometric transformation on discrete 2D grid'
        ],
        commonMistakeAnswer: 'Not recognizing that a diamond is mathematically a circle under the L1 metric.'
      },
      {
        question: 'Why is System.out.print() a performance bottleneck in pattern printing, and how do senior engineers optimize it?',
        answer: 'Each invocation of `System.out.print()` delegates to `PrintStream`, which synchronizes on a monitor lock, flushes or passes characters through a character set encoder, and performs an underlying OS write syscall (`write()` in Unix or `WriteFile()` in Windows). In a 1000 x 1000 pattern, calling `print()` 1,000,000 times causes 1,000,000 synchronization locks and context transitions. Senior engineers solve this by buffering output: accumulating characters in a `StringBuilder` or writing to a `BufferedWriter` (wrapping `OutputStreamWriter(System.out)`), which aggregates thousands of characters into an 8KB memory chunk before issuing a single batch OS write.',
        followUp: 'How much faster is BufferedWriter compared to individual System.out.print calls for large N?',
        followUpAnswer: 'BufferedWriter is typically 15x to 50x faster for console I/O, often turning a Time Limit Exceeded (TLE) verdict into an accepted solution in algorithmic competitions.',
        keyPhrases: [
          'PrintStream synchronization lock overhead',
          'OS kernel write syscall cost',
          'StringBuilder accumulation per row',
          'BufferedWriter 8KB block flushing'
        ],
        commonMistakeAnswer: 'Assuming console printing is instantaneous because characters are small.'
      },
      {
        question: 'How do you design a generalized hollow pattern algorithm for any arbitrary convex polygon?',
        answer: 'A generalized hollow pattern algorithm operates on edge boundary equations. For any polygon, each boundary edge can be represented as a linear inequality `A*i + B*j + C >= 0`. To make it hollow: 1) Identify the bounding box [minRow..maxRow, minCol..maxCol]. 2) For each coordinate (i, j), determine if it satisfies the boundary condition: a cell is on the perimeter if it satisfies the polygon interior condition but has at least one 4-connected neighbor (up, down, left, right) that lies outside the polygon. 3) For simple triangles and pyramids, this simplifies directly to `j == firstCol(i) || j == lastCol(i) || i == firstRow || i == lastRow`.',
        followUp: 'How do you handle hollow patterns where the stroke width is 2 characters instead of 1?',
        followUpAnswer: 'By widening the boundary predicate: `j <= width || j >= maxCols - width + 1 || i <= width || i >= maxRows - width + 1`.',
        keyPhrases: [
          'Perimeter neighbor adjacency test',
          'First column and last column predicates per row',
          'Stroke width expansion',
          'Bounding box traversal'
        ],
        commonMistakeAnswer: 'Creating separate code branches for each individual pixel rather than a generalized boundary condition.'
      },
      {
        question: 'How do you handle even versus odd dimensions in symmetric patterns like hourglasses and diamonds?',
        answer: 'Symmetric patterns with a unique central point (like a 1-star diamond apex or an hourglass center) REQUIRE an odd dimension N (e.g., 3, 5, 7, 9) because odd numbers have a unique integer center `mid = (N + 1) / 2`. If an even number N (e.g., 6) is provided to an odd-symmetry formula: 1) It either fails to center (the peak has 2 stars instead of 1), or 2) The waist has a 2x2 star block. To make an algorithm robust: either reject even N with an `IllegalArgumentException`, automatically increment N to the next odd integer (`if (n % 2 == 0) n++;`), or explicitly duplicate the central row to maintain dual-axis reflection.',
        followUp: 'In a dual-apex even diamond (e.g., n = 4, meaning 4 rows top and 4 rows bottom), how does the star sequence progress?',
        followUpAnswer: 'Top: 1, 3, 5, 7 stars; Bottom: 7, 5, 3, 1 stars. Both center rows have 7 stars, preserving symmetry without an odd waist.',
        keyPhrases: [
          'Odd dimensions have unique center (N+1)/2',
          'Even dimensions require dual-center symmetry',
          'Defensive validation against invalid even inputs',
          'Waist duplicate row handling'
        ],
        commonMistakeAnswer: 'Assuming odd and even inputs produce identical geometric centering without adjustments.'
      },
      {
        question: 'Explain the complete logic of the Butterfly pattern and how it can be adapted into an hourglass or diamond.',
        answer: 'The Butterfly pattern is the negative inverse of an hourglass. In an hourglass, stars are grouped in the center surrounded by outer spaces. In a butterfly, stars are anchored at the left and right extremities, separated by an inner shrinking gap. The upper half (i = 1 to n) prints: `Left Stars = i`, `Middle Spaces = 2 * (n - i)`, `Right Stars = i`. The lower half reverses this: `i = n down to 1`. If you invert the characters (print spaces where stars were and stars where spaces were), the butterfly transforms into a diamond inscribed inside a square.',
        followUp: 'What happens at i = n in the butterfly pattern?',
        followUpAnswer: 'At i = n, middle spaces = 2*(n - n) = 0. The left and right wings merge into a single solid bar of 2*n stars.',
        keyPhrases: [
          'Anchored extremities with central gap',
          'Gap formula 2*(n - i)',
          'Merge into solid line at i = n',
          'Inversion duality between butterfly and diamond'
        ],
        commonMistakeAnswer: 'Treating the butterfly as three unrelated loops per row without realizing the gap is 2*(n-i).'
      },
      {
        question: 'Can any 2D pattern be rendered using a single for loop without helper functions? Explain how.',
        answer: 'Yes. Any 2D grid of size R x C can be flattened into a 1D sequence of length R * C. A single loop running `index = 0` to `R * C - 1` maps to 2D coordinates using integer division and modulo: `row = index / C` and `col = index % C`. The algorithm then evaluates the pattern predicate using `row` and `col`. When `col == C - 1` (the end of the row), it emits the character followed by a newline `\\n`; otherwise, it emits the character followed by a space. This technique proves the isomorphism between 1D memory buffers and 2D visual grids.',
        followUp: 'What are the pros and cons of using 1D index flattening for pattern printing?',
        followUpAnswer: 'Pros: Single loop counter, easily parallelizable across GPU threads or SIMD lanes. Cons: Division `/` and modulo `%` on every iteration are computationally more expensive than simple inner loop increments.',
        keyPhrases: [
          'Index flattening: row = index / C, col = index % C',
          '1D loop over R * C elements',
          'End of row check col == C - 1 for newline',
          'Division/modulo arithmetic overhead'
        ],
        commonMistakeAnswer: 'Claiming it is mathematically impossible to produce 2D shapes without nested loops.'
      },
      {
        question: 'What is the trade-off between streaming characters directly to stdout versus rendering into a char[][] matrix first?',
        answer: 'Direct streaming computes and outputs characters on-the-fly, requiring O(1) auxiliary memory because no intermediate grid is stored in RAM. However, direct streaming requires that the pattern logic be formulated in strict scan-line order (top-to-bottom, left-to-right). In contrast, rendering into a `char[][] canvas = new char[R][C]` requires O(R * C) heap memory, but allows non-scanline rendering algorithms—such as drawing lines using Bresenham algorithm, painting geometric overlays, performing 90-degree rotations, or rendering fractals recursively before doing a single dump to stdout.',
        followUp: 'When is a 2D char[][] canvas mandatory?',
        followUpAnswer: 'When patterns involve multi-pass overwrites, matrix rotations, spiral inward fills, or game rendering engines (like ASCII raycasting).',
        keyPhrases: [
          'Direct streaming: O(1) auxiliary space, strict scan-line constraint',
          'Canvas matrix: O(R*C) heap allocation, arbitrary rendering order',
          'Multi-pass overwrite and rotation capability',
          'Memory footprint trade-off'
        ],
        commonMistakeAnswer: 'Believing direct streaming is always superior without considering non-linear pattern generation.'
      }
    ],
    miniQuiz: [
      {
        question: 'In a centered star pyramid of height n (1-indexed), how many leading spaces are required on row i?',
        options: [
            '2 * i - 1',
            'n - i',
            'n + i',
            '2 * (n - i)'
        ],
        correctIndex: 1,
        explanation: 'Row i requires exactly (n - i) spaces to center the odd number of stars. At i = 1, there are n - 1 spaces; at i = n, there are 0 spaces.'
      },
      {
        question: 'How many stars are printed on row i (1-indexed) of a centered pyramid of height n?',
        options: [
            'i * i',
            '2 * i',
            '2 * i - 1',
            '2 * i + 1'
        ],
        correctIndex: 2,
        explanation: 'The odd progression 1, 3, 5, 7, ... is governed by the formula (2 * i - 1).'
      },
      {
        question: 'What is the time complexity of printing an n-row right-angled triangle of stars?',
        options: [
            'O(N)',
            'O(N log N)',
            'O(N^2)',
            'O(2^N)'
        ],
        correctIndex: 2,
        explanation: 'Total stars printed is 1 + 2 + ... + n = n*(n+1)/2, which is O(N^2).'
      },
      {
        question: 'Which boolean condition identifies the anti-diagonal in an n x n matrix with 1-based indexing?',
        options: [
            'i == j',
            'i + j == n',
            'i + j == n + 1',
            'i - j == 1'
        ],
        correctIndex: 2,
        explanation: 'In 1-based indexing, the secondary/anti-diagonal satisfies i + j = n + 1 (e.g. for n=5: (1,5), (2,4), (3,3), (4,2), (5,1)).'
      },
      {
        question: 'In the upper half of a butterfly pattern of size n, what is the formula for the central space gap on row i?',
        options: [
            'n - i',
            '2 * (n - i)',
            '2 * i - 1',
            'n - 2 * i'
        ],
        correctIndex: 1,
        explanation: 'Each side wing has i stars. In a canvas of width 2*n, the remaining middle space is 2*n - 2*i = 2*(n - i).'
      },
      {
        question: 'What happens if you omit the newline System.out.println() after the inner column loops?',
        options: [
            'Compile-time error',
            'All stars and spaces print on a single continuous horizontal line',
            'Stars print vertically on separate lines',
            'NullPointerException at runtime'
        ],
        correctIndex: 1,
        explanation: 'Without System.out.println(), the terminal cursor never advances to the next row, streaming all characters onto a single line.'
      },
      {
        question: 'In a full diamond of height 2*n - 1, how many rows are in the lower inverted pyramid if the upper half runs 1 to n?',
        options: [
            'n rows',
            'n - 1 rows',
            'n + 1 rows',
            '2 * n rows'
        ],
        correctIndex: 1,
        explanation: 'To avoid duplicating the widest equator row (i = n), the lower half runs from n - 1 down to 1, containing exactly n - 1 rows.'
      },
      {
        question: 'Which condition correctly prints the perimeter of an n x n hollow square?',
        options: [
            'i == 1 && j == 1',
            'i == j || i + j == n + 1',
            'i == 1 || i == n || j == 1 || j == n',
            'i <= n && j <= n'
        ],
        correctIndex: 2,
        explanation: 'The 4 borders of a square are top row (i == 1), bottom row (i == n), left column (j == 1), and right column (j == n).'
      },
      {
        question: 'How many total stars are printed in an inverted centered pyramid of height n (1-indexed)?',
        options: [
            'n * n (n^2)',
            'n * (n + 1) / 2',
            '2 * n - 1',
            'n * (2 * n - 1)'
        ],
        correctIndex: 0,
        explanation: 'The sum of the first n odd numbers (1 + 3 + 5 + ... + 2n - 1) is mathematically identical to n^2.'
      },
      {
        question: 'In an odd-dimension grid of size n, what coordinate represents the exact center cell (1-indexed)?',
        options: [
            '(n/2, n/2)',
            '((n+1)/2, (n+1)/2)',
            '(n, n)',
            '(n-1, n-1)'
        ],
        correctIndex: 1,
        explanation: 'For odd n (e.g. 5), the center is (5 + 1) / 2 = 3. Cell (3, 3) is the exact center.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON P2.1: Number Patterns & Series
  // ─────────────────────────────────────────────────────────────
  'number-patterns-and-series': {
    id: 'number-patterns-and-series',
    moduleId: 'java-patterns',
    moduleTitle: '6. Pattern Programs & Logic Building',
    lessonNumber: 'Lesson 6.2',
    title: 'Number Patterns, Floyds & Pascal Triangle',
    subtitle: 'Linear incrementing sequences, Floyd triangle, binary 0-1 alternating triangles, Pascal triangle formula nCr, palindromic number pyramids, and number spirals',
    estimatedMinutes: 35,
    beginnerAnalogy: 'Imagine an accountant filling a spreadsheet ledger with consecutive transaction numbers. If the accountant writes 1 on the first row, then 2, 3 on the second, and 4, 5, 6 on the third, the accountant is creating Floyd’s Triangle—a rolling odometer that keeps ticking forward regardless of when new lines start! Now imagine a family tree where every child inherits traits equal to the sum of the two parents directly standing above them: that is Pascal’s Triangle. Number patterns take the spatial geometry of star patterns and infuse them with arithmetic data flow, state accumulation, and algebraic recurrence relations.',
    interviewTakeaways: [
      'Stateful Counters vs Row/Column Variables: In Floyd’s triangle, the printed number is driven by an independent accumulator variable (int count = 1) that increments continuously across row boundaries, unlike coordinate-derived variables.',
      'Parity Logic for Binary Triangles: Alternating 0-1 patterns can be generated via coordinate parity check ((i + j) % 2 == 0) or through a bitwise toggle (val ^= 1) at each step.',
      'Pascal Triangle via Multiplicative Formula: Computing Pascal’s triangle row elements in O(1) auxiliary space uses the identity nCr = (nC(r-1) * (n - r + 1)) / r. This avoids both recursive overhead and factorial overflow.',
      'Palindromic Split Loops: Palindromic number pyramids (e.g., 1, 1 2 1, 1 2 3 2 1) require splitting the numeric phase into two distinct inner loops: ascending (1 to i) followed by descending (i - 1 down to 1).',
      'Dynamic Number Formatting: As numbers increase in digit count (e.g., in Floyd’s triangle where numbers exceed 9), use printf("%-3d") or printf("%4d") to prevent pyramid distortion.',
      'Prefix Sum and Series Triangles: Printing arithmetic series in triangular formats requires evaluating sum formulas S(n) = n*(n+1)/2 or holding running prefix sums.'
    ],
    cheatSheet: {
      summary: 'Number patterns map mathematical sequences into nested loops. Key archetypes include continuous Floyd counters, parity toggles, palindromic split loops, and Pascal nCr recurrence.',
      syntaxTemplate: `// 1. Floyd's Triangle
int count = 1;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) System.out.print(count++ + " ");
    System.out.println();
}

// 2. Pascal's Triangle (O(1) Aux Space per row)
for (int i = 0; i < n; i++) {
    int val = 1;
    for (int s = 0; s < n - i - 1; s++) System.out.print(" ");
    for (int j = 0; j <= i; j++) {
        System.out.print(val + " ");
        val = val * (i - j) / (j + 1);
    }
    System.out.println();
}`,
      rules: [
        { rule: 'Floyd Row Sum', explanation: 'The sum of numbers in row i of Floyd triangle is i*(i^2 + 1)/2.' },
        { rule: 'Pascal Element Identity', explanation: 'The j-th element in row i is C(i, j) = i! / (j! * (i - j)!). Row sum is always 2^i.' },
        { rule: 'Integer Division Ordering in nCr', explanation: 'Always multiply before dividing: val = val * (i - j) / (j + 1). Dividing first truncates to 0!' },
        { rule: 'Parity Symmetry', explanation: '(i + j) % 2 ensures diagonal stripe alternation across the entire grid.' },
        { rule: 'Palindromic Apex Singularity', explanation: 'The descending loop must start at i - 1 to avoid printing the peak number twice.' }
      ],
      quickComparison: [
        { aspect: 'Floyd’s Triangle', optionA: 'State: Global continuous counter (count++)', optionB: 'Growth: Sum from 1 to n(n+1)/2' },
        { aspect: 'Repeated Row Num', optionA: 'State: Outer loop index i', optionB: 'Output: i printed i times' },
        { aspect: 'Column Counting', optionA: 'State: Inner loop index j', optionB: 'Output: 1..i printed on row i' },
        { aspect: 'Binary Alternating', optionA: 'State: (i + j) % 2 parity', optionB: 'Output: Alternates 1 and 0' },
        { aspect: 'Pascal’s Triangle', optionA: 'State: Multiplicative binomial nCr', optionB: 'Output: Combinatorial coefficients' }
      ]
    },
    coreExplanation: [
      'The Anatomy of Floyd’s Triangle: Named after Robert W. Floyd, this right-angled triangular array consists of consecutive natural numbers starting from 1. The first row has 1 number (1), the second row has 2 numbers (2, 3), the third has 3 (4, 5, 6), and row i contains i numbers. The last number of row i is the i-th triangular number T(i) = i*(i + 1)/2. The first number of row i is T(i - 1) + 1 = i*(i - 1)/2 + 1. The state accumulator `count` is initialized once outside all loops and simply post-incremented.',
      'Binary Alternating 0-1 Triangles: In interview coding rounds, candidates are frequently asked to print triangles of alternating 1s and 0s where the starting value of each row alternates (e.g. Row 1 starts with 1, Row 2 starts with 0, Row 3 starts with 1). There are two elegant ways to achieve this: 1) Coordinate Parity: A cell (i, j) is 1 if `(i + j) % 2 == 0` (assuming 1-based indexing where (1,1) is 1+1=2, even -> 1). 2) Toggle Variable: Initialize `int start = (i % 2 == 1) ? 1 : 0`, and flip `start = 1 - start` inside the column loop.',
      'Pascal’s Triangle and Binomial Coefficients: Pascal’s triangle is an infinite triangular array of binomial coefficients. Row n (0-indexed) contains the coefficients of the polynomial expansion (x + y)^n. Cell (i, j) equals C(i, j) = i! / (j! * (i - j)!). While building Pascal’s triangle using a 2D matrix (`arr[i][j] = arr[i-1][j-1] + arr[i-1][j]`) takes O(N^2) space, it can be computed in O(1) auxiliary space per row using the multiplicative relation: C(i, j) = C(i, j - 1) * (i - j + 1) / j. In 0-indexed terms starting with val = 1: the next element is `val = val * (i - j) / (j + 1)`.',
      'The Order of Operations in Binomial Generation: A classic trap in calculating Pascal elements iteratively is writing `val = (val / (j + 1)) * (i - j)`. Because integer division truncates fractions, dividing first causes immediate truncation to zero! Multiplying first (`val * (i - j) / (j + 1)`) is mathematically guaranteed to be evenly divisible without any remainder by the properties of binomial coefficients.',
      'Palindromic Number Pyramids: A palindromic number pyramid row reads the same forwards and backwards (e.g., Row 4: `1 2 3 4 3 2 1`). This is accomplished by dividing the inner execution into two phases: an ascending loop `for (int j = 1; j <= i; j++)` which climbs to the peak i, followed immediately by a descending loop `for (int j = i - 1; j >= 1; j--)` which steps down to 1. Notice the descending loop starts at `i - 1`, ensuring the peak i is never duplicated.',
      'Number Spirals and Concentric Rings: Number spirals fill a 2D matrix in concentric rings either inward (1 to N^2) or outward. For a concentric square of size 2*n - 1 where the outer border is n and numbers decrease toward a central 1, the value at cell (i, j) is determined by its minimum distance to any of the 4 borders: `val = n - Math.min(Math.min(i, j), Math.min(2*n - 2 - i, 2*n - 2 - j))` (for 0-indexed loops).'
    ],
    diagram: `NUMBER PATTERNS & PASCAL COEFFICIENTS
========================================================================

1. FLOYD'S TRIANGLE (Continuous Accumulator count++):
Row 1:  1                     -> End: T(1) = 1
Row 2:  2  3                  -> End: T(2) = 3
Row 3:  4  5  6               -> End: T(3) = 6
Row 4:  7  8  9 10            -> End: T(4) = 10
Row 5: 11 12 13 14 15         -> End: T(5) = 15

Total elements printed for n rows = n*(n + 1)/2

------------------------------------------------------------------------
2. PASCAL'S TRIANGLE (Combinatorial Binomial Coefficients C(n, k)):
Row 0:           1                   (2^0 = 1)
Row 1:         1   1                 (2^1 = 2)
Row 2:       1   2   1               (2^2 = 4)
Row 3:     1   3   3   1             (2^3 = 8)
Row 4:   1   4   6   4   1           (2^4 = 16)
Row 5: 1   5  10  10   5   1         (2^5 = 32)

Recurrence: Cell(r, c) = Cell(r-1, c-1) + Cell(r-1, c)
Direct formula: val = val * (row - col) / (col + 1)

------------------------------------------------------------------------
3. PALINDROMIC NUMBER PYRAMID:
Row 1:       1             Ascending: [1]          Descending: []
Row 2:     1 2 1           Ascending: [1, 2]       Descending: [1]
Row 3:   1 2 3 2 1         Ascending: [1, 2, 3]    Descending: [2, 1]
Row 4: 1 2 3 4 3 2 1       Ascending: [1, 2, 3, 4] Descending: [3, 2, 1]`,
    codeSnippet: {
      title: 'Floyd’s Triangle, Binary Triangle & Pascal’s Triangle',
      code: `public class NumberPatternsDemo {
    public static void printFloydTriangle(int n) {
        int count = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%-3d ", count++);
            }
            System.out.println();
        }
    }

    public static void printBinaryTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                // Parity check: (i + j) even -> 1, odd -> 0
                System.out.print(((i + j) % 2 == 0 ? "1 " : "0 "));
            }
            System.out.println();
        }
    }

    public static void printPascalTriangle(int n) {
        for (int i = 0; i < n; i++) {
            // Centering spaces
            for (int s = 0; s < n - i - 1; s++) System.out.print("  ");
            int val = 1;
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", val);
                val = val * (i - j) / (j + 1);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("--- Floyd's Triangle (n = 4) ---");
        printFloydTriangle(4);
        System.out.println("--- Binary Triangle (n = 4) ---");
        printBinaryTriangle(4);
        System.out.println("--- Pascal's Triangle (n = 5) ---");
        printPascalTriangle(5);
    }
}`,
      lineByLineExplanation: [
        { line: 'int count = 1;', explanation: 'Initializes the global accumulator for Floyd’s triangle outside all loops.' },
        { line: 'System.out.printf("%-3d ", count++);', explanation: 'Formats number to 3 left-aligned characters and increments count after printing.' },
        { line: '((i + j) % 2 == 0 ? "1 " : "0 ")', explanation: 'Mathematical parity check generating alternating 1s and 0s.' },
        { line: 'int val = 1;', explanation: 'First element of every Pascal row is always 1 (C(n, 0) = 1).' },
        { line: 'val = val * (i - j) / (j + 1);', explanation: 'Iteratively calculates C(i, j+1) from C(i, j) in O(1) space with no factorial overflow.' }
      ],
      output: `--- Floyd's Triangle (n = 4) ---
1   
2   3   
4   5   6   
7   8   9   10  
--- Binary Triangle (n = 4) ---
1 
0 1 
1 0 1 
0 1 0 1 
--- Pascal's Triangle (n = 5) ---
           1
         1   1
       1   2   1
     1   3   3   1
   1   4   6   4   1`
    },
    codeExamples: [
      {
        title: 'Palindromic Number Pyramid with Centering',
        description: 'Ascending and descending split loop number pyramid with leading space centering.',
        code: `public class PalindromicPyramid {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            // Leading spaces for centering
            for (int s = 1; s <= n - i; s++) System.out.print("  ");
            // Ascending sequence
            for (int j = 1; j <= i; j++) System.out.print(j + " ");
            // Descending sequence (starts at i - 1)
            for (int j = i - 1; j >= 1; j--) System.out.print(j + " ");
            System.out.println();
        }
    }
}`,
        output: `      1 
    1 2 1 
  1 2 3 2 1 
1 2 3 4 3 2 1 `
      },
      {
        title: 'Snake / Zigzag Number Matrix',
        description: 'Odd rows run left-to-right; even rows run right-to-left.',
        code: `public class SnakeNumberMatrix {
    public static void main(String[] args) {
        int n = 4;
        int count = 1;
        for (int i = 1; i <= n; i++) {
            if (i % 2 != 0) {
                // Odd row: Left to Right
                for (int j = 1; j <= n; j++) System.out.printf("%2d ", count++);
            } else {
                // Even row: Right to Left
                int temp = count + n - 1;
                for (int j = 1; j <= n; j++) System.out.printf("%2d ", temp--);
                count += n;
            }
            System.out.println();
        }
    }
}`,
        output: ` 1  2  3  4 
 8  7  6  5 
 9 10 11 12 
16 15 14 13 `
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Resetting the counter inside the outer loop in Floyd’s Triangle.',
        whyItHappens: 'Placing `int count = 1;` inside `for (int i = 1; ...)` resets count back to 1 on every row, producing `1`, `1 2`, `1 2 3` instead of Floyd’s running sequence.',
        howToFix: 'Declare `int count = 1;` strictly outside the outer loop so it persists and increments across all rows.'
      },
      {
        mistake: 'Dividing before multiplying when calculating Pascal triangle elements.',
        whyItHappens: 'Writing `val = (val / (j + 1)) * (i - j)` causes integer division truncation to 0 for any j >= 1.',
        howToFix: 'Always multiply first, then divide: `val = val * (i - j) / (j + 1)`. In integer arithmetic, multiplication preserves precision before division.'
      },
      {
        mistake: 'Duplicating the apex number in palindromic number pyramids.',
        whyItHappens: 'Starting the descending loop at `j = i` prints the peak number twice (e.g., `1 2 3 4 4 3 2 1`).',
        howToFix: 'Start the descending loop at `j = i - 1` so the peak is printed exactly once.'
      },
      {
        mistake: 'Failing to format column widths when printing multi-digit numbers.',
        whyItHappens: 'Using `print(num + " ")` causes alignment to stagger when numbers grow from 1-digit (9) to 2-digit (10).',
        howToFix: 'Use `System.out.printf("%-3d ", num)` or `printf("%4d", num)` to ensure fixed-width column cells.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Floyd’s Triangle Last Number',
        problemStatement: 'What is the last number printed on row i = 5 of Floyd’s Triangle?',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        int n = 5, count = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (i == 5 && j == 5) System.out.println(count);
                count++;
            }
        }
    }
}`,
        options: [
            'A) 10',
            'B) 15',
            'C) 20',
            'D) 25'
        ],
        correctOptionIndex: 1,
        hint: 'The last number of row n is the n-th triangular number n*(n+1)/2.',
        solution: 'Option B is correct: 15.',
        explanation: 'The total count of numbers printed through row 5 is 1 + 2 + 3 + 4 + 5 = 15. Thus, the last number printed on row 5 is 15.'
      },
      {
        title: 'Puzzle 2: Binary Triangle Parity Trace',
        problemStatement: 'What is the output of row 3 (i = 3) in this binary triangle?',
        code: `for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(((i + j) % 2 == 0 ? "1 " : "0 "));
    }
    System.out.println();
}`,
        options: [
            'A) 0 1 0',
            'B) 1 0 1',
            'C) 1 1 1',
            'D) 0 0 0'
        ],
        correctOptionIndex: 1,
        hint: 'For i = 3: j=1 -> (3+1)=4 (even -> 1); j=2 -> (3+2)=5 (odd -> 0); j=3 -> (3+3)=6 (even -> 1).',
        solution: 'Option B is correct: 1 0 1.',
        explanation: 'For row i = 3: at j = 1, sum = 4 (even -> "1 "); at j = 2, sum = 5 (odd -> "0 "); at j = 3, sum = 6 (even -> "1 "). Output is "1 0 1 ".'
      },
      {
        title: 'Puzzle 3: Palindromic Pyramid Split Loop Peak Check',
        problemStatement: 'What does this loop print for i = 3?',
        code: `int i = 3;
for (int j = 1; j <= i; j++) System.out.print(j);
for (int j = i - 1; j >= 1; j--) System.out.print(j);`,
        options: [
            'A) 123321',
            'B) 12321',
            'C) 32123',
            'D) 123'
        ],
        correctOptionIndex: 1,
        hint: 'Ascending: 1, 2, 3. Descending: starts at 3 - 1 = 2, then 1.',
        solution: 'Option B is correct: 12321.',
        explanation: 'Ascending loop prints 1, 2, 3. Descending loop starts at i - 1 = 2 and prints 2, 1. Concatenated output is 12321.'
      },
      {
        title: 'Puzzle 4: Pascal’s Triangle Middle Element Row 4',
        problemStatement: 'In Pascal’s triangle (0-indexed), what is the value of C(4, 2) at row 4, column 2?',
        code: `// Row 4 elements: C(4, 0), C(4, 1), C(4, 2), C(4, 3), C(4, 4)`,
        options: [
            'A) 4',
            'B) 6',
            'C) 8',
            'D) 10'
        ],
        correctOptionIndex: 1,
        hint: 'Row 4 values are 1, 4, 6, 4, 1.',
        solution: 'Option B is correct: 6.',
        explanation: 'By formula: C(4, 2) = 4! / (2! * 2!) = (4 * 3) / (2 * 1) = 6. The row is 1, 4, 6, 4, 1.'
      },
      {
        title: 'Puzzle 5: Reverse Number Triangle Bound',
        problemStatement: 'What does the following code print?',
        code: `public class Puzzle5 {
    public static void main(String[] args) {
        int n = 3;
        for (int i = 1; i <= n; i++) {
            for (int j = n; j >= i; j--) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A)\n3 2 1\n3 2\n3',
            'B)\n1 2 3\n1 2\n1',
            'C)\n3\n3 2\n3 2 1',
            'D)\n3 2 1\n2 1\n1'
        ],
        correctOptionIndex: 0,
        hint: 'For i = 1: j runs 3 down to 1. For i = 2: j runs 3 down to 2. For i = 3: j runs 3 to 3.',
        solution: 'Option A is correct.',
        explanation: 'Row 1 (i=1): 3, 2, 1. Row 2 (i=2): 3, 2. Row 3 (i=3): 3.'
      },
      {
        title: 'Puzzle 6: Repeated Row Number Logic',
        problemStatement: 'What is printed by this loop for n = 3?',
        code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.print(i + " ");
    }
    System.out.println();
}`,
        options: [
            'A)\n1\n1 2\n1 2 3',
            'B)\n1\n2 2\n3 3 3',
            'C)\n1\n2 3\n4 5 6',
            'D)\n3\n2 2\n1 1 1'
        ],
        correctOptionIndex: 1,
        hint: 'Notice System.out.print prints i (the row number), not j or count.',
        solution: 'Option B is correct: 1 on row 1, 2 2 on row 2, 3 3 3 on row 3.',
        explanation: 'The inner loop runs i times, and each iteration prints i. Thus row 1 prints 1 once, row 2 prints 2 twice, and row 3 prints 3 three times.'
      },
      {
        title: 'Puzzle 7: Alternating Row Values Toggle',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle7 {
    public static void main(String[] args) {
        for (int i = 1; i <= 3; i++) {
            int val = i % 2;
            for (int j = 1; j <= i; j++) {
                System.out.print(val + " ");
                val = 1 - val;
            }
            System.out.println();
        }
    }
}`,
        options: [
            'A)\n1\n0 1\n1 0 1',
            'B)\n0\n1 0\n0 1 0',
            'C)\n1\n1 0\n1 0 1',
            'D)\n0\n0 1\n0 1 0'
        ],
        correctOptionIndex: 0,
        hint: 'Row 1: i=1, val=1. Row 2: i=2, val=0 -> prints 0, 1. Row 3: i=3, val=1 -> prints 1, 0, 1.',
        solution: 'Option A is correct.',
        explanation: 'Row 1 starts with 1 % 2 = 1 (prints "1 "). Row 2 starts with 2 % 2 = 0 (prints "0 1 "). Row 3 starts with 3 % 2 = 1 (prints "1 0 1 ").'
      },
      {
        title: 'Puzzle 8: Powers of 2 Number Pyramid Peak',
        problemStatement: 'What is the peak element of row 4 (1-indexed) in a pyramid where numbers double ascending and halve descending?',
        code: `// Row 1: 1
// Row 2: 1 2 1
// Row 3: 1 2 4 2 1
// Row 4: ?`,
        options: [
            'A) 4',
            'B) 8',
            'C) 16',
            'D) 6'
        ],
        correctOptionIndex: 1,
        hint: 'Peak of row i is 2^(i - 1). For i = 4, 2^(4 - 1) = 2^3 = 8.',
        solution: 'Option B is correct: 8.',
        explanation: 'In a powers-of-two pyramid, the values along row i are 2^0, 2^1, ..., 2^(i-1) and then back down. For row 4, the peak is 2^3 = 8. The row is 1 2 4 8 4 2 1.'
      },
      {
        title: 'Puzzle 9: Diagonal Sum in Floyd’s Triangle',
        problemStatement: 'In a Floyd’s Triangle of 4 rows, what is the sum of the primary diagonal elements (row i, col i)?',
        code: `// Floyd's Triangle:
// Row 1: 1
// Row 2: 2  3
// Row 3: 4  5  6
// Row 4: 7  8  9 10
// Diagonal elements are: (1,1)=1, (2,2)=3, (3,3)=6, (4,4)=10`,
        options: [
            'A) 15',
            'B) 20',
            'C) 24',
            'D) 10'
        ],
        correctOptionIndex: 1,
        hint: 'Add 1 + 3 + 6 + 10.',
        solution: 'Option B is correct: 20.',
        explanation: 'The rightmost element (col i) of each row is the triangular number T(i): T(1)=1, T(2)=3, T(3)=6, T(4)=10. The sum of these tetrahedral numbers is 1 + 3 + 6 + 10 = 20.'
      },
      {
        title: 'Puzzle 10: Multiplicative Formula Overflow Boundary',
        problemStatement: 'Up to what row n can Pascal’s Triangle be calculated using standard 32-bit signed int without arithmetic overflow?',
        code: `int val = val * (i - j) / (j + 1); // signed 32-bit int`,
        options: [
            'A) Row 12',
            'B) Row 30',
            'C) Row 34',
            'D) Row 60'
        ],
        correctOptionIndex: 2,
        hint: 'C(34, 17) exceeds Integer.MAX_VALUE (2,147,483,647).',
        solution: 'Option C is correct: Row 34 (specifically up to row 33 safely; row 34 overflows 32-bit signed int).',
        explanation: 'In 32-bit signed integer arithmetic, MAX_VALUE is ~2.14 x 10^9. The central coefficient C(34, 17) = 2,333,606,220, which exceeds Integer.MAX_VALUE. For rows 34 and above, one must use 64-bit `long` (safe up to row 62) or `BigInteger`.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is Floyd’s Triangle? Derive the closed-form mathematical formulas for the first and last element of row i.',
        answer: 'Floyd’s Triangle is a right-angled triangular array of consecutive natural numbers starting from 1. 1) Last Element of Row i: Because row k contains k numbers, the total count of numbers from row 1 to row i is the sum of the first i integers: S = 1 + 2 + ... + i = i*(i + 1)/2. Hence, the last element of row i is exactly T(i) = i*(i + 1)/2. 2) First Element of Row i: The first element is simply the number immediately following the last element of row (i - 1): First(i) = T(i - 1) + 1 = [(i - 1)*i / 2] + 1 = (i^2 - i + 2)/2. 3) Row Sum: The sum of row i is i*(i^2 + 1)/2.',
        followUp: 'Given a number K, how can you find which row of Floyd’s Triangle it belongs to in O(1) time?',
        followUpAnswer: 'By inverting the triangular number formula K <= i*(i + 1)/2: solving the quadratic equation i^2 + i - 2K >= 0 yields row i = (int) Math.ceil((-1 + Math.sqrt(1 + 8.0 * K)) / 2).',
        keyPhrases: [
          'Triangular number formula T(i) = i*(i+1)/2',
          'First element: i*(i-1)/2 + 1',
          'Row sum: i*(i^2 + 1)/2',
          'O(1) row location via quadratic inversion'
        ],
        commonMistakeAnswer: 'Running a simulation loop to find the row rather than using the quadratic closed-form equation.'
      },
      {
        question: 'Compare the three primary approaches to generating Pascal’s Triangle: 2D Matrix DP, 1D Array In-Place, and O(1) Aux Space Multiplicative Formula.',
        answer: '1) 2D Matrix DP: Allocates `int[][] pascal = new int[n][n]` and computes `pascal[i][j] = pascal[i-1][j-1] + pascal[i-1][j]`. Time: O(N^2), Space: O(N^2). Simple but wastes memory. 2) 1D Array In-Place: Uses a single row buffer `int[] row = new int[n]`. For each row i, updates elements backwards from j = i down to 1: `row[j] = row[j] + row[j-1]`. Time: O(N^2), Space: O(N). Prevents overwriting values needed in the current step. 3) Multiplicative Binomial Formula: Computes each row on-the-fly using `val = val * (i - j) / (j + 1)`. Time: O(N^2), Space: O(1) auxiliary memory. This is the gold standard when printing directly to output.',
        followUp: 'Why must the 1D array approach update elements from right to left (backwards)?',
        followUpAnswer: 'If updated forwards (0 to i), `row[j]` would be overwritten with the new value before `row[j+1]` has a chance to read the old `row[j]`, corrupting all subsequent values.',
        keyPhrases: [
          '2D DP: O(N^2) time and space',
          '1D In-Place: O(N) space updating right-to-left',
          'Multiplicative formula: O(1) auxiliary space',
          'Right-to-left prevents clobbering preceding values'
        ],
        commonMistakeAnswer: 'Updating the 1D array from left to right and wondering why numbers become exponential garbage.'
      },
      {
        question: 'Why does the multiplicative formula for Pascal’s Triangle val * (i - j) / (j + 1) never produce a fraction or remainder in integer arithmetic?',
        answer: 'This is guaranteed by number theory and combinatorics. The quantity being computed is C(i, j + 1) = [i * (i - 1) * ... * (i - j)] / [(j + 1)!]. At every step, the numerator represents the product of (j + 1) consecutive integers. In elementary number theory, the product of any k consecutive integers is ALWAYS divisible by k! (k factorial). Because `val` represents C(i, j), multiplying by (i - j) and dividing by (j + 1) evaluates C(i, j + 1), which is strictly an integer. As long as multiplication precedes division, no fractional truncation ever occurs.',
        followUp: 'At what point does this formula fail in Java, and how do you protect against it?',
        followUpAnswer: 'It fails when the intermediate product `val * (i - j)` exceeds `Integer.MAX_VALUE` (overflow). To protect against this, promote `val` to `long` or use `BigInteger`.',
        keyPhrases: [
          'Product of k consecutive integers is divisible by k!',
          'Combinatorial identity guarantees integer result',
          'Multiplication must precede division',
          'Intermediate overflow requires 64-bit long'
        ],
        commonMistakeAnswer: 'Assuming integer division works by luck or floating-point rounding.'
      },
      {
        question: 'Explain the mathematical relationship between the sum of elements in row i of Pascal’s Triangle and binary subsets.',
        answer: 'The sum of all elements in row n of Pascal’s Triangle is equal to 2^n: `sum_{k=0}^{n} C(n, k) = 2^n`. This follows directly from the Binomial Theorem: `(x + y)^n = sum_{k=0}^{n} C(n, k) * x^{n-k} * y^k`. Substituting x = 1 and y = 1 yields `(1 + 1)^n = 2^n = sum C(n, k)`. Combinatorially, C(n, k) represents the number of ways to choose a subset of k elements from a set of size n. Summing C(n, k) for all k from 0 to n counts the total number of all possible subsets of an n-element set—which is the power set of cardinality 2^n.',
        followUp: 'What is the sum of alternating elements in row n: C(n, 0) - C(n, 1) + C(n, 2) - ... ?',
        followUpAnswer: 'It is exactly 0 (for n >= 1), derived by substituting x = 1 and y = -1 into (1 - 1)^n = 0^n = 0.',
        keyPhrases: [
          'Binomial theorem substitution (1 + 1)^n = 2^n',
          'Power set cardinality of an n-element set',
          'Alternating sum evaluates to (1 - 1)^n = 0',
          'Combinatorial proof of subset summation'
        ],
        commonMistakeAnswer: 'Computing the sum by manually adding the array elements without knowing the 2^n closed form.'
      },
      {
        question: 'How do you print a centered Palindromic Number Pyramid where numbers are formatted properly for double digits?',
        answer: 'Centering a palindromic number pyramid with double digits requires fixed-width formatting. If numbers range from 1 to 9, each number takes 1 digit plus 1 trailing space (width 2). If numbers exceed 9, a 1-digit number takes fewer columns than a 2-digit number, skewing the pyramid. To fix this: 1) Determine the maximum number maxVal = n. 2) Determine the column width: `int width = String.valueOf(maxVal).length() + 1`. 3) Print leading spaces equal to `(n - i) * width`. 4) Print each ascending and descending number using `System.out.printf("%" + width + "d", num)`.',
        followUp: 'How do you format Pascal’s triangle so numbers align perfectly as a centered equilateral triangle?',
        followUpAnswer: 'By reserving fixed width W per number (e.g. 4 spaces "%4d") and emitting W/2 leading spaces per row offset.',
        keyPhrases: [
          'Fixed-width column reservation via printf',
          'Digit length calculation String.valueOf(n).length()',
          'Scaling leading spaces by cell width',
          'Preserving equilateral apex alignment'
        ],
        commonMistakeAnswer: 'Printing plain spaces and wondering why numbers >= 10 distort the pyramid shape.'
      },
      {
        question: 'What is the Snake / Zigzag pattern in a square matrix, and how do you implement it without reversing arrays?',
        answer: 'A Snake / Zigzag matrix fills numbers 1 to N^2 such that odd rows (1, 3, 5, ...) flow left-to-right, while even rows (2, 4, 6, ...) flow right-to-left. To implement this without reversing arrays or allocating extra buffers: for row i (1 to n), the first element of row i is `start = (i - 1) * n + 1`. If i is odd, iterate `j = 0 to n - 1` and print `start + j`. If i is even, iterate `j = 0 to n - 1` and print `start + (n - 1) - j`. This computes the exact number mathematically on-the-fly in O(1) auxiliary space.',
        followUp: 'How does diagonal zigzag traversal (like JPEG DCT scanning) differ from row-based snake traversal?',
        followUpAnswer: 'Diagonal zigzag travels along diagonals where row + col = sum, alternating between moving up-right and down-left, requiring two pointer updates.',
        keyPhrases: [
          'Row offset start = (i - 1) * n + 1',
          'Even row inversion: start + (n - 1) - j',
          'O(1) aux space mathematical generation',
          'Elimination of temporary row buffers'
        ],
        commonMistakeAnswer: 'Creating a full 2D array, filling it forwards, and then reversing even rows in a second pass.'
      },
      {
        question: 'How do you construct a Palindromic Number Pyramid using a SINGLE inner loop instead of two separate loops?',
        answer: 'A palindromic row of height i has (2*i - 1) elements. A single inner loop can run `for (int j = 1; j <= 2 * i - 1; j++)`. To map index j to the palindromic value: when j <= i, the value is simply j (ascending). When j > i, the value must step down from i, which is given by `2 * i - j`. Thus, using the ternary operator `int val = (j <= i) ? j : (2 * i - j);`, the entire ascending and descending sequence is generated inside one loop without code duplication.',
        followUp: 'Can this single-loop mapping be extended to letters (e.g., A, B, C, B, A)?',
        followUpAnswer: 'Yes: `char c = (char)(\'A\' + ((j <= i) ? j - 1 : 2 * i - 1 - j));`. The mathematical mapping is identical.',
        keyPhrases: [
          'Inner loop length 2*i - 1',
          'Ascending branch j <= i: value is j',
          'Descending branch j > i: value is 2*i - j',
          'Ternary conditional folding'
        ],
        commonMistakeAnswer: 'Believing that two independent loops are mandatory for palindromic sequences.'
      },
      {
        question: 'How do you generate a binary alternating 0-1 triangle using bitwise XOR operations?',
        answer: 'Instead of computing modulo arithmetic `(i + j) % 2` (which requires hardware division), one can maintain a single integer state variable `val` that toggles between 0 and 1 using bitwise XOR: `val ^= 1`. At the start of row i, initialize `int val = (i % 2 != 0) ? 1 : 0`. Inside the column loop (j = 1 to i), print `val`, and immediately toggle `val ^= 1`. In hardware, XOR is a single-cycle ALU instruction, whereas integer modulo involves a multi-cycle division operation.',
        followUp: 'Is there another arithmetic way to toggle between 0 and 1 without XOR?',
        followUpAnswer: 'Yes: `val = 1 - val;`. If val is 1, 1 - 1 = 0. If val is 0, 1 - 0 = 1.',
        keyPhrases: [
          'Bitwise XOR toggle: val ^= 1',
          'Arithmetic subtraction toggle: val = 1 - val',
          'Avoiding multi-cycle modulo division',
          'Single-cycle ALU execution'
        ],
        commonMistakeAnswer: 'Using an if-else block with four lines to toggle a binary flag.'
      },
      {
        question: 'Explain how to compute the N-th row of Pascal’s Triangle using Java 8 Streams.',
        answer: 'In Java 8, the N-th row can be generated as a `List<Long>` using `Stream.iterate()` or `LongStream`. Using the multiplicative recurrence: we can generate a stream of indices `0` to `N` and map each index using a custom reduction or stateful accumulator. Alternatively, using iterative stream folding: start with `Stream.of(1L)`, and apply a reduction step N times where each step zips the previous list with a shifted version of itself: `row[j] = prev[j-1] + prev[j]`.',
        followUp: 'Why is the iterative procedural loop preferred over Streams for Pascal’s triangle in production code?',
        followUpAnswer: 'The procedural loop avoids autoboxing primitive `long` to `Long`, eliminates lambda object allocation overhead, and executes in nanoseconds without garbage collection pressure.',
        keyPhrases: [
          'Stream.iterate() combinatorial mapping',
          'List zipping of shifted rows',
          'Autoboxing overhead of Long wrappers',
          'Zero-allocation procedural superiority'
        ],
        commonMistakeAnswer: 'Assuming Streams are always more efficient than traditional loops.'
      },
      {
        question: 'How do you print a concentric number box (e.g. 4 4 4 4 4 4 4 / 4 3 3 3 3 3 4 ...)? Explain the min-distance formula.',
        answer: 'A concentric number square of dimension `size = 2*n - 1` has numbers decreasing from n on the perimeter down to 1 at the center. For any 0-indexed cell (i, j): its distance to the top edge is `i`, to the left edge is `j`, to the bottom edge is `(size - 1 - i)`, and to the right edge is `(size - 1 - j)`. The ring index (distance to nearest edge) is `dist = Math.min(Math.min(i, j), Math.min(size - 1 - i, size - 1 - j))`. Because the outer ring (dist = 0) has value n, the value at any cell is simply: `val = n - dist`. This allows computing any cell in O(1) time without allocating any matrix!',
        followUp: 'What is the time and space complexity of generating this pattern for size N?',
        followUpAnswer: 'Time complexity is O(N^2) to emit all characters; auxiliary space complexity is O(1) since no 2D array is required.',
        keyPhrases: [
          'Minimum distance to 4 boundaries',
          'dist = min(min(i, j), min(size-1-i, size-1-j))',
          'Cell value formula: n - dist',
          'O(1) auxiliary space without matrix allocation'
        ],
        commonMistakeAnswer: 'Attempting to simulate this by creating a 2D array and writing four loops per concentric ring.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the total count of numbers printed in a Floyd’s Triangle of n rows?',
        options: [
            'n * n',
            'n * (n + 1) / 2',
            '2^n',
            'n * (n - 1) / 2'
        ],
        correctIndex: 1,
        explanation: 'Row 1 has 1 number, row 2 has 2, ..., row n has n. Total is the arithmetic sum n*(n+1)/2.'
      },
      {
        question: 'What is the first number on row i of Floyd’s Triangle (1-indexed)?',
        options: [
            'i * (i - 1) / 2',
            'i * (i - 1) / 2 + 1',
            'i * (i + 1) / 2',
            'i^2'
        ],
        correctIndex: 1,
        explanation: 'The number immediately following the last number of row (i-1) is [i*(i-1)/2] + 1.'
      },
      {
        question: 'What is the sum of all numbers across row n in Pascal’s Triangle (0-indexed)?',
        options: [
            '2^n',
            'n^2',
            'n * (n + 1) / 2',
            '2 * n - 1'
        ],
        correctIndex: 0,
        explanation: 'By the Binomial Theorem, sum of row n is (1 + 1)^n = 2^n.'
      },
      {
        question: 'In a binary alternating triangle (1-indexed), what value is printed at row 4, column 3?',
        options: [
            '1',
            '0',
            '2',
            '3'
        ],
        correctIndex: 1,
        explanation: '(i + j) = 4 + 3 = 7 (odd). Parity condition (7 % 2 == 0) is false, emitting 0.'
      },
      {
        question: 'What is the correct multiplicative formula to find C(n, k+1) from C(n, k)?',
        options: [
            'C(n, k) * (n - k) / (k + 1)',
            'C(n, k) / (k + 1) * (n - k)',
            'C(n, k) * (n + k) / k',
            'C(n, k) * k / (n - k)'
        ],
        correctIndex: 0,
        explanation: 'Multiply first to avoid integer division truncation: C(n, k) * (n - k) / (k + 1).'
      },
      {
        question: 'In a palindromic number pyramid row of height i, how many numbers are printed in total?',
        options: [
            'i',
            '2 * i',
            '2 * i - 1',
            '2 * i + 1'
        ],
        correctIndex: 2,
        explanation: 'Ascending has i numbers (1 to i), descending has i - 1 numbers (i-1 down to 1). Total is i + (i - 1) = 2*i - 1.'
      },
      {
        question: 'What bitwise operation toggles a binary variable x between 0 and 1?',
        options: [
            'x &= 1',
            'x |= 1',
            'x ^= 1',
            'x = ~x'
        ],
        correctIndex: 2,
        explanation: 'XOR with 1 flips the least significant bit: 0 ^ 1 = 1, and 1 ^ 1 = 0.'
      },
      {
        question: 'What is the value of C(5, 3) in Pascal’s Triangle?',
        options: [
            '5',
            '10',
            '15',
            '20'
        ],
        correctIndex: 1,
        explanation: 'C(5, 3) = 5! / (3! * 2!) = (5 * 4) / 2 = 10.'
      },
      {
        question: 'In an n x n snake matrix, what is the first number of row i (1-indexed)?',
        options: [
            '(i - 1) * n + 1',
            'i * n',
            'i * (i - 1) / 2',
            '(i - 1) * n'
        ],
        correctIndex: 0,
        explanation: 'Each row contains n numbers. The first number of row i is (i - 1)*n + 1.'
      },
      {
        question: 'What is the center number in a concentric number square of size 2*n - 1 where borders are n?',
        options: [
            'n',
            '0',
            '1',
            'n / 2'
        ],
        correctIndex: 2,
        explanation: 'The numbers decrease by 1 for each inward ring: n, n-1, ..., reaching 1 at the innermost center cell.'
      }
    ]
  }
};
