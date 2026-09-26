import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE P1 & P2: PATTERN EXERCISES (PART 1 - 20 EXERCISES)
// Star Patterns, Symmetrical Pyramids, Number Series, Floyd's & Pascal
// ============================================================

export const patternsExercisesP1_P2: Record<string, ProgrammingExercise[]> = {
  // ─────────────────────────────────────────────────────────────
  // P1: Star Patterns & Pyramids (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'star-patterns-and-pyramids': [
    {
      id: 'pat-p1-ex1',
      title: 'Right-Angled Star Triangle',
      problemStatement: 'Write a Java program to print a standard right-angled triangle of stars of height n = 5, where row i contains i stars.',
      hint: 'Outer loop runs i from 1 to n; inner loop runs j from 1 to i, printing "* ".',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      output: `* 
* * 
* * * 
* * * * 
* * * * * `,
      explanation: 'The outer loop dictates the row number i from 1 to 5. The inner loop executes i times for each row, printing "* " without a line break. After the inner loop completes, System.out.println() moves the cursor to the next line.'
    },
    {
      id: 'pat-p1-ex2',
      title: 'Inverted Right-Angled Star Triangle',
      problemStatement: 'Write a Java program to print an inverted right-angled triangle of stars of height n = 5, where row 1 has 5 stars and row 5 has 1 star.',
      hint: 'Outer loop runs i from n down to 1 (or 1 to n with inner loop up to n - i + 1).',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      output: `* * * * * 
* * * * 
* * * 
* * 
* `,
      explanation: 'The outer loop starts at i = 5 and decrements down to 1. On each row, the inner loop prints i stars, naturally shrinking the row length from 5 down to 1.'
    },
    {
      id: 'pat-p1-ex3',
      title: 'Mirrored (Right-Aligned) Star Triangle',
      problemStatement: 'Write a Java program to print a right-aligned right-angled triangle of height n = 5, padded with leading spaces.',
      hint: 'Row i requires (n - i) double spaces followed by i stars.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            // Leading spaces to right-align
            for (int s = 1; s <= n - i; s++) {
                System.out.print("  ");
            }
            // Stars
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      output: `        * 
      * * 
    * * * 
  * * * * 
* * * * * `,
      explanation: 'To align stars against the right margin, we first emit (n - i) double spaces ("  "). Then we print i stars ("* "). As i increases, leading spaces decrease and stars expand.'
    },
    {
      id: 'pat-p1-ex4',
      title: 'Centered Star Pyramid',
      problemStatement: 'Write a Java program to print a centered equilateral pyramid of stars of height n = 5. Row i must contain (2*i - 1) stars centered with leading spaces.',
      hint: 'Print (n - i) single spaces followed by (2*i - 1) stars on row i.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * i - 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: `    *
   ***
  *****
 *******
*********`,
      explanation: 'Row i requires (n - i) single leading spaces. The number of stars is given by the odd number formula (2 * i - 1), producing 1, 3, 5, 7, and 9 stars with a single apex.'
    },
    {
      id: 'pat-p1-ex5',
      title: 'Inverted Centered Star Pyramid',
      problemStatement: 'Write a Java program to print an inverted centered pyramid of stars of height n = 5, starting with 9 stars at the base and tapering to 1 star at the bottom.',
      hint: 'Row i (1 to n) needs (i - 1) leading spaces and 2 * (n - i) + 1 stars.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s < i; s++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= 2 * (n - i) + 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: `*********
 *******
  *****
   ***
    *`,
      explanation: 'Leading spaces increase from 0 to 4 (formula: i - 1). The star count decreases via formula 2*(n - i) + 1, generating 9, 7, 5, 3, 1 stars.'
    },
    {
      id: 'pat-p1-ex6',
      title: 'Solid Rhombus / Parallelogram',
      problemStatement: 'Write a Java program to print a solid rhombus of width and height n = 5, shifted rightward by leading spaces.',
      hint: 'Row i (1 to n) prints (n - i) spaces followed by n stars.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
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
      output: `    *****
   *****
  *****
 *****
*****`,
      explanation: 'Each row contains a constant block of n = 5 stars. The leading spaces decrease from 4 down to 0 (n - i), slanting the square into a 45-degree rhombus.'
    },
    {
      id: 'pat-p1-ex7',
      title: 'Full Symmetrical Star Diamond',
      problemStatement: 'Write a Java program to print a full symmetrical star diamond of height parameter n = 5 (total 2*n - 1 = 9 rows).',
      hint: 'Combine an upper centered pyramid (i = 1 to n) with a lower inverted pyramid (i = n - 1 down to 1).',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        // Upper Half
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Half
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
      output: `    *
   ***
  *****
 *******
*********
 *******
  *****
   ***
    *`,
      explanation: 'The diamond is composed of two symmetrical phases: upper pyramid (1 to n) and lower pyramid (n-1 down to 1). Starting the lower loop at n - 1 prevents duplicating the 9-star center row.'
    },
    {
      id: 'pat-p1-ex8',
      title: 'Hollow Star Diamond',
      problemStatement: 'Write a Java program to print a hollow star diamond of parameter n = 5 where only the outer perimeter stars are printed.',
      hint: 'In the star loop, print "*" only when j == 1 or j == 2*i - 1; otherwise print " ".',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
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
}`,
      output: `    *
   * *
  *   *
 *     *
*       *
 *     *
  *   *
   * *
    *`,
      explanation: 'The boundary condition `j == 1 || j == 2 * i - 1` checks whether the current column is the first or last star on row i. All interior columns receive spaces, producing a hollow diamond.'
    },
    {
      id: 'pat-p1-ex9',
      title: 'Hourglass Star Pattern',
      problemStatement: 'Write a Java program to print an hourglass star pattern of parameter n = 5, with inverted pyramid on top and upright pyramid on bottom.',
      hint: 'Upper half runs i = n down to 1. Lower half runs i = 2 to n (skipping 1 to avoid duplicate waist star).',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        // Upper Inverted Pyramid
        for (int i = n; i >= 1; i--) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Upright Pyramid
        for (int i = 2; i <= n; i++) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            for (int j = 1; j <= 2 * i - 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
      output: `*********
 *******
  *****
   ***
    *
   ***
  *****
 *******
*********`,
      explanation: 'The upper inverted pyramid narrows from 9 stars down to 1. The lower upright pyramid begins at i = 2 (3 stars) and expands back to 9 stars, forming a symmetric hourglass.'
    },
    {
      id: 'pat-p1-ex10',
      title: 'Butterfly Star Pattern',
      problemStatement: 'Write a Java program to print a butterfly star pattern of parameter n = 4 (total 8 rows) with expanding and contracting wing gaps.',
      hint: 'On row i: print i stars, 2*(n - i) spaces, and i stars. Reflect in bottom half.',
      solutionCode: `public class Main {
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
*      *`,
      explanation: 'In the top half, left and right wings have i stars each, separated by 2*(n - i) spaces. At i = 4, spaces become 0, creating a solid 8-star bar. The bottom half mirrors this sequence.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // P2: Number Patterns & Series (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'number-patterns-and-series': [
    {
      id: 'pat-p2-ex1',
      title: 'Simple Right-Angled Number Triangle',
      problemStatement: 'Write a Java program to print a right-angled number triangle of height n = 5 where each row prints consecutive numbers starting from 1 up to row number i.',
      hint: 'Inner loop prints j for j from 1 to i.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `1 
1 2 
1 2 3 
1 2 3 4 
1 2 3 4 5 `,
      explanation: 'On each row i, the inner loop variable j starts at 1 and counts up to i, emitting each number followed by a space.'
    },
    {
      id: 'pat-p2-ex2',
      title: 'Inverted Right-Angled Number Triangle',
      problemStatement: 'Write a Java program to print an inverted right-angled number triangle of height n = 5 where row 1 prints 1 to 5, and row 5 prints 1.',
      hint: 'Outer loop runs i from n down to 1; inner loop runs j from 1 to i.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `1 2 3 4 5 
1 2 3 4 
1 2 3 
1 2 
1 `,
      explanation: 'The outer loop starts at 5 and counts down to 1. On row i, numbers 1 through i are printed.'
    },
    {
      id: 'pat-p2-ex3',
      title: 'Repeated Row Number Triangle',
      problemStatement: 'Write a Java program to print a number triangle of height n = 5 where each row i prints the value i repeated i times.',
      hint: 'Inner loop runs i times printing i.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `1 
2 2 
3 3 3 
4 4 4 4 
5 5 5 5 5 `,
      explanation: 'The inner loop prints the outer loop counter i on each iteration, causing row 1 to print 1 once, row 2 to print 2 twice, and so on.'
    },
    {
      id: 'pat-p2-ex4',
      title: 'Floyd’s Triangle (Continuous Rolling Counter)',
      problemStatement: 'Write a Java program to print Floyd’s Triangle of n = 5 rows using a rolling counter from 1 to n*(n+1)/2 = 15.',
      hint: 'Declare `int count = 1;` outside the loops and print `count++` in the inner loop.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        int count = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.printf("%-3d", count++);
            }
            System.out.println();
        }
    }
}`,
      output: `1  
2  3  
4  5  6  
7  8  9  10 
11 12 13 14 15 `,
      explanation: 'An independent integer `count` is initialized to 1. Each time a cell is printed, `count++` emits the current number and increments it, creating a continuous sequential stream across row breaks.'
    },
    {
      id: 'pat-p2-ex5',
      title: 'Binary 0-1 Alternating Triangle',
      problemStatement: 'Write a Java program to print an alternating 0-1 binary triangle of height n = 5 where cell (i, j) is 1 if (i + j) is even, and 0 otherwise.',
      hint: 'Use parity check `(i + j) % 2 == 0 ? 1 : 0`.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(((i + j) % 2 == 0 ? "1 " : "0 "));
            }
            System.out.println();
        }
    }
}`,
      output: `1 
0 1 
1 0 1 
0 1 0 1 
1 0 1 0 1 `,
      explanation: 'Because both i and j advance by 1 at each step, the coordinate sum (i + j) alternates parity between even and odd across both adjacent columns and rows, creating a checkerboard binary pattern.'
    },
    {
      id: 'pat-p2-ex6',
      title: 'Centered Palindromic Number Pyramid',
      problemStatement: 'Write a Java program to print a centered palindromic number pyramid of height n = 5. Row i must read 1..i..1 with leading spaces.',
      hint: 'Print (n - i) double spaces, then ascending numbers 1 to i, then descending numbers i - 1 down to 1.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            // Centering spaces
            for (int s = 1; s <= n - i; s++) {
                System.out.print("  ");
            }
            // Ascending sequence
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            // Descending sequence
            for (int j = i - 1; j >= 1; j--) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `        1 
      1 2 1 
    1 2 3 2 1 
  1 2 3 4 3 2 1 
1 2 3 4 5 4 3 2 1 `,
      explanation: 'For each row, we print (n - i) double spaces. Then the ascending loop counts 1 to i. The descending loop starts at i - 1 and counts down to 1, ensuring the apex i is printed only once.'
    },
    {
      id: 'pat-p2-ex7',
      title: 'Pascal’s Triangle (Combinatorial Pyramid)',
      problemStatement: 'Write a Java program to print Pascal’s Triangle of n = 5 rows in O(1) auxiliary space using the multiplicative binomial formula.',
      hint: 'Each row starts with val = 1. Next element is val = val * (i - j) / (j + 1) for 0-indexed j.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 0; i < n; i++) {
            for (int s = 0; s < n - i - 1; s++) {
                System.out.print("  ");
            }
            int val = 1;
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", val);
                val = val * (i - j) / (j + 1);
            }
            System.out.println();
        }
    }
}`,
      output: `          1
        1   1
      1   2   1
    1   3   3   1
  1   4   6   4   1`,
      explanation: 'Each row i represents binomial coefficients C(i, j). Starting with val = 1 (C(i, 0)), each subsequent element C(i, j+1) is computed as val * (i - j) / (j + 1) without storing any arrays.'
    },
    {
      id: 'pat-p2-ex8',
      title: 'Symmetrical Diamond of Numbers',
      problemStatement: 'Write a Java program to print a symmetrical diamond of numbers of parameter n = 4 (total 7 rows). Row i prints numbers 1 to row width.',
      hint: 'Upper half runs i = 1 to n; lower half runs i = n - 1 down to 1.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        // Upper Half
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print(j + " ");
            System.out.println();
        }
        // Lower Half
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print(j + " ");
            System.out.println();
        }
    }
}`,
      output: `   1 
  1 2 
 1 2 3 
1 2 3 4 
 1 2 3 
  1 2 
   1 `,
      explanation: 'The upper half prints numbers 1..i preceded by (n - i) spaces. The lower half mirrors this from n - 1 down to 1, producing a centered numeric diamond.'
    },
    {
      id: 'pat-p2-ex9',
      title: 'Hollow Number Square Border Matrix',
      problemStatement: 'Write a Java program to print an n x n hollow square (n = 5) where the border cells contain their column numbers and interior cells are blank.',
      hint: 'Condition: if (i == 1 || i == n || j == 1 || j == n) print j, else print space.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == 1 || i == n || j == 1 || j == n) {
                    System.out.print(j + " ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
      output: `1 2 3 4 5 
1       5 
1       5 
1       5 
1 2 3 4 5 `,
      explanation: 'The border condition checks if the current cell is on row 1, row n, col 1, or col n. If so, it prints the column number j; otherwise it prints two blank spaces.'
    },
    {
      id: 'pat-p2-ex10',
      title: 'Snake / Zigzag Number Triangle',
      problemStatement: 'Write a Java program to print a right-angled number triangle of height n = 4 with a rolling counter where odd rows run left-to-right and even rows run right-to-left.',
      hint: 'For even rows, calculate the row end value and decrement backwards.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 4;
        int count = 1;
        for (int i = 1; i <= n; i++) {
            if (i % 2 != 0) {
                // Odd row: Left-to-Right
                for (int j = 1; j <= i; j++) {
                    System.out.print(count++ + " ");
                }
            } else {
                // Even row: Right-to-Left
                int end = count + i - 1;
                for (int j = end; j >= count; j--) {
                    System.out.print(j + " ");
                }
                count += i;
            }
            System.out.println();
        }
    }
}`,
      output: `1 
3 2 
4 5 6 
10 9 8 7 `,
      explanation: 'Odd rows print numbers in natural ascending order. Even rows peek ahead to `end = count + i - 1` and print backward down to `count`, then advance `count += i`.'
    }
  ]
};
