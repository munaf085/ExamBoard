import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 6: PATTERN PROGRAMS CAPSTONE EXERCISES (LESSON 6.5)
// Exactly 10 dedicated coding assignments
// ============================================================
export const patternsP5_challenge_exercises: Record<string, ProgrammingExercise[]> = {
  "patterns-challenge": [
    {
      "id": "patc-1",
      "title": "Exercise 1: Hollow Diamond Invariant Pattern",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printHollowDiamond(int n)` that prints a hollow diamond of size n = 3 (total rows = 2*n - 1 = 5). Boundary stars appear at `Math.abs(n - 1 - i)` spaces from the center. Test with n = 3.",
      "hint": "Use vertical symmetry r = i < n ? i : (2*n - 2 - i). Print stars at left and right boundaries.",
      "solutionCode": "public class Solution {\n    public static void printHollowDiamond(int n) {\n        int totalRows = 2 * n - 1;\n        for (int i = 0; i < totalRows; i++) {\n            int r = (i < n) ? i : (totalRows - 1 - i);\n            int outerSpaces = n - 1 - r;\n            for (int s = 0; s < outerSpaces; s++) System.out.print(\" \");\n            System.out.print(\"*\");\n            if (r > 0) {\n                int innerSpaces = 2 * r - 1;\n                for (int s = 0; s < innerSpaces; s++) System.out.print(\" \");\n                System.out.print(\"*\");\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printHollowDiamond(3);\n    }\n}",
      "output": "  *\n * *\n*   *\n * *\n  *",
      "explanation": "Symmetrical vertical index r manages leading and inner spaces cleanly with zero code duplication."
    },
    {
      "id": "patc-2",
      "title": "Exercise 2: Floyd's Triangle Number Generator",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static void printFloydsTriangle(int rows)` that prints Floyd's Triangle for `rows = 4`. Separate numbers with single spaces.",
      "hint": "Maintain an integer counter outside the outer loop and increment it for each element.",
      "solutionCode": "public class Solution {\n    public static void printFloydsTriangle(int rows) {\n        int count = 1;\n        for (int i = 1; i <= rows; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(count++ + (j < i ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printFloydsTriangle(4);\n    }\n}",
      "output": "1\n2 3\n4 5 6\n7 8 9 10",
      "explanation": "Sequential counter increments across row boundaries, producing consecutive natural numbers."
    },
    {
      "id": "patc-3",
      "title": "Exercise 3: Alternating 0-1 Binary Triangle",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static void printBinaryTriangle(int rows)` where each cell prints `(i + j) % 2` for 1-indexed rows and columns up to `rows = 4`.",
      "hint": "For row i from 1 to rows and col j from 1 to i, print (i + j) % 2.",
      "solutionCode": "public class Solution {\n    public static void printBinaryTriangle(int rows) {\n        for (int i = 1; i <= rows; i++) {\n            for (int j = 1; j <= i; j++) {\n                System.out.print(((i + j) % 2 == 0 ? \"1\" : \"0\") + (j < i ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printBinaryTriangle(4);\n    }\n}",
      "output": "1\n0 1\n1 0 1\n0 1 0 1",
      "explanation": "Sum of indices parity creates alternating binary numbers on each row."
    },
    {
      "id": "patc-4",
      "title": "Exercise 4: Concentric Number Square Layering",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printConcentricSquare(int n)` for n = 3 (size = 5x5) using the minimum perimeter distance formula. Separate numbers by spaces.",
      "hint": "size = 2*n - 1. layer = min(r, c, size - 1 - r, size - 1 - c). Print n - layer.",
      "solutionCode": "public class Solution {\n    public static void printConcentricSquare(int n) {\n        int size = 2 * n - 1;\n        for (int i = 0; i < size; i++) {\n            for (int j = 0; j < size; j++) {\n                int minD = Math.min(Math.min(i, j), Math.min(size - 1 - i, size - 1 - j));\n                System.out.print((n - minD) + (j < size - 1 ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printConcentricSquare(3);\n    }\n}",
      "output": "3 3 3 3 3\n3 2 2 2 3\n3 2 1 2 3\n3 2 2 2 3\n3 3 3 3 3",
      "explanation": "Calculates concentric layer depths directly using perimeter distance in O(N^2) time and O(1) space."
    },
    {
      "id": "patc-5",
      "title": "Exercise 5: Symmetrical Alphabet Palindrome Pyramid",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printAlphabetPyramid(int n)` that prints symmetrical palindromic letter pyramids for n = 3: row 1 is 'A', row 2 is 'A B A', row 3 is 'A B C B A' with appropriate leading spaces.",
      "hint": "Leading spaces are n - 1 - i. Characters ascend to 'A' + i then descend back to 'A'.",
      "solutionCode": "public class Solution {\n    public static void printAlphabetPyramid(int n) {\n        for (int i = 0; i < n; i++) {\n            for (int s = 0; s < n - 1 - i; s++) System.out.print(\"  \");\n            for (int j = 0; j <= i; j++) {\n                System.out.print((char)('A' + j) + \" \");\n            }\n            for (int j = i - 1; j >= 0; j--) {\n                System.out.print((char)('A' + j) + (j > 0 ? \" \" : \"\"));\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printAlphabetPyramid(3);\n    }\n}",
      "output": "    A \n  A B A \nA B C B A",
      "explanation": "Characters ascend through uppercase codepoints and mirror symmetrically downward."
    },
    {
      "id": "patc-6",
      "title": "Exercise 6: Pascal's Triangle with O(1) Space Multiplicative Step",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printPascalRow(int n)` that prints row n = 4 of Pascal's triangle (0-indexed: 1 4 6 4 1) using the multiplicative combination formula without allocating an array.",
      "hint": "Start val = 1. Next val is val * (n - k) / (k + 1).",
      "solutionCode": "public class Solution {\n    public static void printPascalRow(int n) {\n        long val = 1;\n        for (int k = 0; k <= n; k++) {\n            System.out.print(val + (k < n ? \" \" : \"\"));\n            val = val * (n - k) / (k + 1);\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        printPascalRow(4);\n    }\n}",
      "output": "1 4 6 4 1",
      "explanation": "Multiplicative step calculates binomial coefficients in O(N) time with O(1) auxiliary space."
    },
    {
      "id": "patc-7",
      "title": "Exercise 7: Hollow Square with Diagonal Cross",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printCrossSquare(int n)` for n = 5 that prints '*' if the coordinate is on the perimeter or on either diagonal (`i == j || i + j == n - 1`), else prints ' '.",
      "hint": "Combine perimeter check with diagonal checks in a single boolean expression.",
      "solutionCode": "public class Solution {\n    public static void printCrossSquare(int n) {\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                if (i == 0 || i == n - 1 || j == 0 || j == n - 1 || i == j || i + j == n - 1) {\n                    System.out.print(\"*\");\n                } else {\n                    System.out.print(\" \");\n                }\n            }\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printCrossSquare(5);\n    }\n}",
      "output": "*****\n** **\n* * *\n** **\n*****",
      "explanation": "Synthesizes perimeter and diagonal intersection conditions in a single coordinate loop."
    },
    {
      "id": "patc-8",
      "title": "Exercise 8: Inverted Hourglass Number Pattern",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void printHourglass(int n)` for n = 3 (height = 5) printing rows of stars that contract from 5 stars to 1, then expand back to 5 stars.",
      "hint": "Use reflection r = i < n ? (n - 1 - i) : (i - n + 1). Leading spaces = n - 1 - r, stars = 2 * r + 1.",
      "solutionCode": "public class Solution {\n    public static void printHourglass(int n) {\n        int totalRows = 2 * n - 1;\n        for (int i = 0; i < totalRows; i++) {\n            int r = (i < n) ? (n - 1 - i) : (i - n + 1);\n            for (int s = 0; s < n - 1 - r; s++) System.out.print(\" \");\n            for (int j = 0; j < 2 * r + 1; j++) System.out.print(\"*\");\n            System.out.println();\n        }\n    }\n    public static void main(String[] args) {\n        printHourglass(3);\n    }\n}",
      "output": "*****\n ***\n  *\n ***\n*****",
      "explanation": "Reflects row index r to shrink and expand symmetrically around the central vertex."
    },
    {
      "id": "patc-9",
      "title": "Exercise 9: Spiral Matrix 2D Array Traversal",
      "difficulty": "Hard",
      "problemStatement": "Write a method `public static void printSpiral(int[][] matrix)` that prints elements of a 3x3 matrix in clockwise spiral order separated by spaces: [[1, 2, 3], [4, 5, 6], [7, 8, 9]].",
      "hint": "Maintain top, bottom, left, right pointers and constrict boundaries clockwise.",
      "solutionCode": "public class Solution {\n    public static void printSpiral(int[][] matrix) {\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        boolean first = true;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) {\n                System.out.print((first ? \"\" : \" \") + matrix[top][i]);\n                first = false;\n            }\n            top++;\n            for (int i = top; i <= bottom; i++) {\n                System.out.print(\" \" + matrix[i][right]);\n            }\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) {\n                    System.out.print(\" \" + matrix[bottom][i]);\n                }\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) {\n                    System.out.print(\" \" + matrix[i][left]);\n                }\n                left++;\n            }\n        }\n        System.out.println();\n    }\n    public static void main(String[] args) {\n        int[][] m = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        printSpiral(m);\n    }\n}",
      "output": "1 2 3 6 9 8 7 4 5",
      "explanation": "Clockwise boundary contraction visits all cells in single-pass O(M*N) time."
    },
    {
      "id": "patc-10",
      "title": "Exercise 10: Buffered Console Pattern Rendering",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static void renderBufferedBox(int n)` that builds an n x n square of '#' using a `StringBuilder` with pre-allocated capacity `n * (n + 1)` and prints it once. Test with n = 3.",
      "hint": "new StringBuilder(n * (n + 1)); append '#' and '\\n'.",
      "solutionCode": "public class Solution {\n    public static void renderBufferedBox(int n) {\n        StringBuilder sb = new StringBuilder(n * (n + 1));\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                sb.append(\"#\");\n            }\n            sb.append(\"\\n\");\n        }\n        System.out.print(sb.toString());\n    }\n    public static void main(String[] args) {\n        renderBufferedBox(3);\n    }\n}",
      "output": "###\n###\n###\n",
      "explanation": "Pre-allocated StringBuilder buffers rendering in user-space heap, executing a single synchronized write."
    }
  ]
};
