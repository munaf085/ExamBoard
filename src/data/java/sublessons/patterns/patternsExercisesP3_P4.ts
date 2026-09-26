import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE P3 & P4: PATTERN EXERCISES (PART 2 - 20 EXERCISES)
// Character Patterns, Matrix Traversals, Spirals & Rotations
// ============================================================

export const patternsExercisesP3_P4: Record<string, ProgrammingExercise[]> = {
  // ─────────────────────────────────────────────────────────────
  // P3: Character & Alphabet Patterns (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'character-alphabet-patterns': [
    {
      id: 'pat-p3-ex1',
      title: 'Contiguous Alphabet Triangle',
      problemStatement: 'Write a Java program to print a contiguous alphabet triangle of height n = 5 where row i prints characters from \'A\' up to \'A\' + i - 1.',
      hint: 'Inner loop prints `(char)(\'A\' + j)` for j from 0 to i - 1.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print((char)('A' + j) + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `A 
A B 
A B C 
A B C D 
A B C D E `,
      explanation: 'For each row i (0 to n - 1), column index j starts at 0 and increments up to i. Casting the sum \'A\' + j to char produces consecutive letters from \'A\' onward.'
    },
    {
      id: 'pat-p3-ex2',
      title: 'Repeating Row Character Triangle',
      problemStatement: 'Write a Java program to print an alphabet triangle of height n = 5 where each row i repeats the i-th letter of the alphabet i times.',
      hint: 'Inner loop prints `(char)(\'A\' + i)` on every column iteration.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print((char)('A' + i) + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `A 
B B 
C C C 
D D D D 
E E E E E `,
      explanation: 'Because the character expression `(char)(\'A\' + i)` depends solely on the outer row index i, every character printed on that row is identical.'
    },
    {
      id: 'pat-p3-ex3',
      title: 'Inverted Alphabet Triangle',
      problemStatement: 'Write a Java program to print an inverted right-angled alphabet triangle of height n = 5, starting with \'A\' through \'E\' on row 1.',
      hint: 'Outer loop runs i from n down to 1; inner loop runs j from 0 to i - 1.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 0; j < i; j++) {
                System.out.print((char)('A' + j) + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `A B C D E 
A B C D 
A B C 
A B 
A `,
      explanation: 'The outer loop starts at 5 and counts down to 1. Each row prints characters starting at \'A\' up to the current row count i.'
    },
    {
      id: 'pat-p3-ex4',
      title: 'Centered Palindromic Alphabet Pyramid',
      problemStatement: 'Write a Java program to print a centered palindromic alphabet pyramid of height n = 4 (rows reading A, ABA, ABCBA, ABCDCBA).',
      hint: 'Print (n - 1 - i) double spaces, then ascending letters 0 to i, then descending letters i - 1 down to 0.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 0; i < n; i++) {
            // Leading spaces
            for (int s = 0; s < n - 1 - i; s++) {
                System.out.print("  ");
            }
            // Ascending sequence
            for (int j = 0; j <= i; j++) {
                System.out.print((char)('A' + j) + " ");
            }
            // Descending sequence
            for (int j = i - 1; j >= 0; j--) {
                System.out.print((char)('A' + j) + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `      A 
    A B A 
  A B C B A 
A B C D C B A `,
      explanation: 'For each row i, we emit (n - 1 - i) double spaces for centering. The ascending loop climbs from \'A\' to `(char)(\'A\' + i)`. The descending loop counts back down from `(char)(\'A\' + i - 1)` to \'A\'.'
    },
    {
      id: 'pat-p3-ex5',
      title: 'Alphabet Diamond (Solid Symmetrical)',
      problemStatement: 'Write a Java program to print a solid symmetrical alphabet diamond of parameter n = 4 (total 7 rows) where each row prints its corresponding letter.',
      hint: 'Upper half runs i = 0 to n - 1; lower half runs i = n - 2 down to 0.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        // Upper Half
        for (int i = 0; i < n; i++) {
            for (int s = 0; s < n - 1 - i; s++) System.out.print(" ");
            for (int j = 0; j <= i; j++) System.out.print((char)('A' + i) + " ");
            System.out.println();
        }
        // Lower Half
        for (int i = n - 2; i >= 0; i--) {
            for (int s = 0; s < n - 1 - i; s++) System.out.print(" ");
            for (int j = 0; j <= i; j++) System.out.print((char)('A' + i) + " ");
            System.out.println();
        }
    }
}`,
      output: `   A 
  B B 
 C C C 
D D D D 
 C C C 
  B B 
   A `,
      explanation: 'The upper half prints letters \'A\' through \'D\' spaced with leading offsets. The lower half starts at n - 2 (\'C\') and descends back to \'A\', forming a solid diamond.'
    },
    {
      id: 'pat-p3-ex6',
      title: 'Hollow Character Diamond',
      problemStatement: 'Write a Java program to print a hollow character diamond of parameter n = 4 where perimeter cells display their row letters and the interior is hollow.',
      hint: 'Print leading spaces, character, then if i > 0 print 2*i - 1 middle spaces and character again.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        // Upper Half
        for (int i = 0; i < n; i++) {
            for (int s = 0; s < n - 1 - i; s++) System.out.print(" ");
            System.out.print((char)('A' + i));
            if (i > 0) {
                for (int s = 0; s < 2 * i - 1; s++) System.out.print(" ");
                System.out.print((char)('A' + i));
            }
            System.out.println();
        }
        // Lower Half
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
}`,
      output: `   A
  B B
 C   C
D     D
 C   C
  B B
   A`,
      explanation: 'Only the apex and base rows (i = 0) have 1 character. All intermediate rows print a left boundary character, (2*i - 1) blank spaces, and a matching right boundary character.'
    },
    {
      id: 'pat-p3-ex7',
      title: 'Alphabet Floyd’s Triangle',
      problemStatement: 'Write a Java program to print an alphabet Floyd’s Triangle of n = 4 rows where letters increment continuously from \'A\' through \'J\'.',
      hint: 'Declare `char ch = \'A\';` outside the loop and print `ch++`.',
      solutionCode: `public class Main {
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
G H I J `,
      explanation: 'A persistent char accumulator `ch` starts at \'A\'. `ch++` prints the current letter and advances to the next character across line breaks, printing 1 + 2 + 3 + 4 = 10 letters.'
    },
    {
      id: 'pat-p3-ex8',
      title: 'Alternating Case Alphabet Triangle',
      problemStatement: 'Write a Java program to print an alphabet triangle of n = 4 rows with a continuous alphabet stream where odd rows are uppercase and even rows are lowercase.',
      hint: 'Check if `i % 2 == 0` to convert characters to lowercase via `Character.toLowerCase()`.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        char ch = 'A';
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if (i % 2 != 0) {
                    System.out.print(ch + " ");
                } else {
                    System.out.print(Character.toLowerCase(ch) + " ");
                }
                ch++;
            }
            System.out.println();
        }
    }
}`,
      output: `A 
b c 
D E F 
g h i j `,
      explanation: 'Rows 1 and 3 are odd-numbered, so characters are printed in uppercase. Rows 2 and 4 are even-numbered, so characters are converted to lowercase using `Character.toLowerCase()`.'
    },
    {
      id: 'pat-p3-ex9',
      title: 'Cyclical Caesar Alphabet Grid',
      problemStatement: 'Write a Java program to print an n x n cyclical Caesar cipher alphabet grid (n = 5) where each row shifts the alphabet forward by 1 with modulo 26 wrap-around.',
      hint: 'Cell (i, j) character is `(char)(\'A\' + (i + j) % 26)`.',
      solutionCode: `public class Main {
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
E F G H I `,
      explanation: 'Each row i starts at offset i from \'A\'. Across columns j, the offset advances `(i + j) % 26`, creating the classic Vigenère / Caesar cipher tableau.'
    },
    {
      id: 'pat-p3-ex10',
      title: 'Character Hourglass Pattern',
      problemStatement: 'Write a Java program to print a character hourglass of parameter n = 4 with letters starting at \'D\' and narrowing to \'A\' at the waist, then expanding back to \'D\'.',
      hint: 'Upper half runs i = n down to 1; lower half runs i = 2 to n. Print (n - i) spaces followed by (char)(\'A\' + i - 1) repeated.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        // Upper Inverted Pyramid
        for (int i = n; i >= 1; i--) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            char ch = (char)('A' + i - 1);
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print(ch);
            System.out.println();
        }
        // Lower Upright Pyramid
        for (int i = 2; i <= n; i++) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            char ch = (char)('A' + i - 1);
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print(ch);
            System.out.println();
        }
    }
}`,
      output: `DDDDDDD
 EEEEE
  CCC
   A
  CCC
 EEEEE
DDDDDDD`,
      explanation: 'The upper half prints (2*i - 1) copies of character (A + i - 1), tapering from D to A. The lower half starts at i = 2 and expands back up to D.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // P4: Advanced Matrix & Spiral Patterns (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'advanced-matrix-spiral-patterns': [
    {
      id: 'pat-p4-ex1',
      title: 'Concentric Target Number Square',
      problemStatement: 'Write a Java program to print a concentric square of size 2*n - 1 (for n = 4) where outer borders are 4 and numbers decrease to 1 at the center, in O(1) space.',
      hint: 'Value at (i, j) is `n - min(min(i, j), min(size - 1 - i, size - 1 - j))`.',
      solutionCode: `public class Main {
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
4 4 4 4 4 4 4 `,
      explanation: 'The minimum distance from (i, j) to the 4 boundaries determines which concentric layer the cell belongs to. Outer ring (minDist = 0) has value 4; innermost cell has minDist = 3, value 1.'
    },
    {
      id: 'pat-p4-ex2',
      title: 'Clockwise Inward Spiral Matrix Fill',
      problemStatement: 'Write a Java program to generate an n x n matrix (n = 4) filled with numbers 1 to n^2 in inward clockwise spiral order using the 4-boundary algorithm.',
      hint: 'Maintain top, bottom, left, right bounds and shrink them after each directional pass.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        int[][] matrix = new int[n][n];
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
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
        }

        for (int[] row : matrix) {
            for (int x : row) System.out.printf("%2d ", x);
            System.out.println();
        }
    }
}`,
      output: ` 1  2  3  4 
12 13 14  5 
11 16 15  6 
10  9  8  7 `,
      explanation: 'The 4-boundary algorithm fills Top (left to right), Right (top to bottom), Bottom (right to left, guarded), and Left (bottom to top, guarded) before advancing inward.'
    },
    {
      id: 'pat-p4-ex3',
      title: 'Clockwise Spiral Matrix Traversal',
      problemStatement: 'Write a Java program to read and print all elements of a pre-populated 3x4 rectangular matrix in clockwise spiral order.',
      hint: 'Use the 4-boundary pointers with guard checks `top <= bottom` and `left <= right`.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12}
        };
        int R = mat.length, C = mat[0].length;
        int top = 0, bottom = R - 1, left = 0, right = C - 1;

        System.out.print("Spiral Traversal: ");
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) System.out.print(mat[top][j] + " ");
            top++;
            for (int i = top; i <= bottom; i++) System.out.print(mat[i][right] + " ");
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) System.out.print(mat[bottom][j] + " ");
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) System.out.print(mat[i][left] + " ");
                left++;
            }
        }
        System.out.println();
    }
}`,
      output: `Spiral Traversal: 1 2 3 4 8 12 11 10 9 5 6 7 `,
      explanation: 'The rectangular 3x4 grid is unwound into a 1D sequence. The guard conditions prevent the middle row from being read twice when top exceeds bottom.'
    },
    {
      id: 'pat-p4-ex4',
      title: 'Snake / Zigzag Matrix Traversal',
      problemStatement: 'Write a Java program to traverse a 4x4 matrix in snake/zigzag order (even rows left-to-right, odd rows right-to-left).',
      hint: 'Check `i % 2 == 0` to decide column loop direction.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12},
            {13, 14, 15, 16}
        };

        System.out.print("Snake Traversal: ");
        for (int i = 0; i < mat.length; i++) {
            if (i % 2 == 0) {
                for (int j = 0; j < mat[i].length; j++) {
                    System.out.print(mat[i][j] + " ");
                }
            } else {
                for (int j = mat[i].length - 1; j >= 0; j--) {
                    System.out.print(mat[i][j] + " ");
                }
            }
        }
        System.out.println();
    }
}`,
      output: `Snake Traversal: 1 2 3 4 8 7 6 5 9 10 11 12 16 15 14 13 `,
      explanation: 'Even rows (0, 2) iterate columns from 0 to 3. Odd rows (1, 3) iterate columns from 3 down to 0, producing continuous snake traversal.'
    },
    {
      id: 'pat-p4-ex5',
      title: 'In-Place 90-Degree Clockwise Matrix Rotation',
      problemStatement: 'Write a Java program to rotate a 3x3 matrix 90 degrees clockwise in-place with O(1) auxiliary space.',
      hint: 'Transpose the matrix (swap mat[i][j] with mat[j][i] for i < j), then reverse each row horizontally.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int n = mat.length;

        // Step 1: Transpose (i < j)
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }

        // Step 2: Reverse each row
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = mat[i][left];
                mat[i][left] = mat[i][right];
                mat[i][right] = temp;
                left++;
                right--;
            }
        }

        System.out.println("Rotated 90° Clockwise:");
        for (int[] row : mat) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}`,
      output: `Rotated 90° Clockwise:
7 4 1 
8 5 2 
9 6 3 `,
      explanation: 'Transposing mirrors across the main diagonal: row 1 becomes col 1. Then reversing each row horizontally completes the 90-degree clockwise rotation in-place.'
    },
    {
      id: 'pat-p4-ex6',
      title: 'Anti-Clockwise 90-Degree Matrix Rotation',
      problemStatement: 'Write a Java program to rotate a 3x3 matrix 90 degrees counter-clockwise (anti-clockwise) in-place.',
      hint: 'Transpose the matrix, then reverse each column vertically.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int n = mat.length;

        // Step 1: Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = temp;
            }
        }

        // Step 2: Reverse each column vertically
        for (int j = 0; j < n; j++) {
            int top = 0, bottom = n - 1;
            while (top < bottom) {
                int temp = mat[top][j];
                mat[top][j] = mat[bottom][j];
                mat[bottom][j] = temp;
                top++;
                bottom--;
            }
        }

        System.out.println("Rotated 90° Anti-Clockwise:");
        for (int[] row : mat) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}`,
      output: `Rotated 90° Anti-Clockwise:
3 6 9 
2 5 8 
1 4 7 `,
      explanation: 'Transposing followed by vertical column reversal mirrors elements upward, achieving a 90-degree counter-clockwise rotation.'
    },
    {
      id: 'pat-p4-ex7',
      title: 'Diagonal / Anti-Diagonal Traversal of Matrix',
      problemStatement: 'Write a Java program to print all anti-diagonals of a 3x3 matrix grouped by coordinate sum `r + c`.',
      hint: 'Outer loop iterates sum from 0 to 2*(n - 1); inner loop checks valid c = sum - r.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        int n = mat.length;

        System.out.println("Anti-Diagonals:");
        for (int sum = 0; sum <= 2 * (n - 1); sum++) {
            for (int r = 0; r < n; r++) {
                int c = sum - r;
                if (c >= 0 && c < n) {
                    System.out.print(mat[r][c] + " ");
                }
            }
            System.out.println();
        }
    }
}`,
      output: `Anti-Diagonals:
1 
2 4 
3 5 7 
6 8 
9 `,
      explanation: 'Every secondary diagonal satisfies r + c = sum. Iterating sum from 0 to 4 visits all 5 diagonals in top-right to bottom-left orientation.'
    },
    {
      id: 'pat-p4-ex8',
      title: 'Matrix Perimeter / Ring Boundary Extraction',
      problemStatement: 'Write a Java program to extract and print only the outermost perimeter boundary elements of a 4x4 matrix in clockwise order.',
      hint: 'Traverse top row, right column, bottom row in reverse, and left column upward, avoiding corner duplicates.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            { 1,  2,  3,  4},
            { 5,  6,  7,  8},
            { 9, 10, 11, 12},
            {13, 14, 15, 16}
        };
        int n = mat.length;

        System.out.print("Perimeter Ring: ");
        // 1. Top row
        for (int j = 0; j < n; j++) System.out.print(mat[0][j] + " ");
        // 2. Right col (skip top corner)
        for (int i = 1; i < n; i++) System.out.print(mat[i][n - 1] + " ");
        // 3. Bottom row (skip right corner)
        for (int j = n - 2; j >= 0; j--) System.out.print(mat[n - 1][j] + " ");
        // 4. Left col (skip bottom and top corners)
        for (int i = n - 2; i >= 1; i--) System.out.print(mat[i][0] + " ");
        System.out.println();
    }
}`,
      output: `Perimeter Ring: 1 2 3 4 8 12 16 15 14 13 9 5 `,
      explanation: 'The outer perimeter contains 2*n + 2*n - 4 = 12 elements. Adjusted loop bounds prevent reading the 4 corner cells twice.'
    },
    {
      id: 'pat-p4-ex9',
      title: 'Concentric Alphabet Box',
      problemStatement: 'Write a Java program to print a concentric alphabet box of size 2*n - 1 (for n = 4) where outer perimeter is \'D\' and center is \'A\'.',
      hint: 'Use `(char)(\'A\' + (n - 1 - minDist))` where minDist is the distance to nearest border.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        int size = 2 * n - 1;
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                int minDist = Math.min(Math.min(i, j), Math.min(size - 1 - i, size - 1 - j));
                char ch = (char)('A' + (n - 1 - minDist));
                System.out.print(ch + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `D D D D D D D 
D C C C C C D 
D C B B B C D 
D C B A B C D 
D C B B B C D 
D C C C C C D 
D D D D D D D `,
      explanation: 'At the perimeter (minDist = 0), offset is n - 1 = 3 (\'D\'). At the center (minDist = 3), offset is 0 (\'A\').'
    },
    {
      id: 'pat-p4-ex10',
      title: 'Transpose of Rectangular Matrix',
      problemStatement: 'Write a Java program to compute and print the transpose of a 2x3 rectangular matrix.',
      hint: 'Transpose swaps rows and columns: result is 3x2 with `trans[j][i] = mat[i][j]`.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[][] mat = {
            {1, 2, 3},
            {4, 5, 6}
        };
        int R = mat.length;
        int C = mat[0].length;
        int[][] trans = new int[C][R];

        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                trans[j][i] = mat[i][j];
            }
        }

        System.out.println("Transposed Matrix (3x2):");
        for (int[] row : trans) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}`,
      output: `Transposed Matrix (3x2):
1 4 
2 5 
3 6 `,
      explanation: 'For rectangular matrices (R != C), in-place transposition is not possible without shifting memory blocks. We allocate a new C x R matrix and assign `trans[j][i] = mat[i][j]`.'
    }
  ]
};
