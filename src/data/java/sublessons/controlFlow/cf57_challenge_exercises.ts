import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 5: LOOPS & ITERATIONS CAPSTONE EXERCISES (LESSON 5.7)
// Exactly 10 dedicated coding assignments
// ============================================================
export const cf57_challenge_exercises: Record<string, ProgrammingExercise[]> = {
  "loops-challenge": [
    {
      "id": "lpc-1",
      "title": "Exercise 1: Matrix Search with Labeled Break",
      "difficulty": "Medium",
      "problemStatement": "Implement a method `public static String findCoordinates(int[][] grid, int target)` that uses a labeled break to search a 2D matrix. Return \"(row, col)\" when found, or \"(-1, -1)\" if not found. Test with a 3x3 grid containing target 42 at row 1 col 2.",
      "hint": "Label the outer loop `search:` and execute `break search;` upon finding target.",
      "solutionCode": "public class Solution {\n    public static String findCoordinates(int[][] grid, int target) {\n        int rFound = -1, cFound = -1;\n        search:\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[r].length; c++) {\n                if (grid[r][c] == target) {\n                    rFound = r;\n                    cFound = c;\n                    break search;\n                }\n            }\n        }\n        return \"(\" + rFound + \", \" + cFound + \")\";\n    }\n    public static void main(String[] args) {\n        int[][] grid = {\n            {1, 2, 3},\n            {4, 5, 42},\n            {7, 8, 9}\n        };\n        System.out.println(findCoordinates(grid, 42));\n        System.out.println(findCoordinates(grid, 99));\n    }\n}",
      "output": "(1, 2)\n(-1, -1)",
      "explanation": "Labeled break cleanly escapes both nested loop layers upon locating target without auxiliary boolean flags."
    },
    {
      "id": "lpc-2",
      "title": "Exercise 2: Safe In-Place Removal via Iterator",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void removeShortStrings(List<String> list, int minLength)` that safely removes strings shorter than `minLength` using `Iterator.remove()` to avoid `ConcurrentModificationException`. Test with [\"Java\", \"Go\", \"Rust\", \"C\"] and minLength = 3.",
      "hint": "Obtain Iterator<String> it = list.iterator() and call it.remove() inside a while(it.hasNext()) loop.",
      "solutionCode": "import java.util.*;\n\npublic class Solution {\n    public static void removeShortStrings(List<String> list, int minLength) {\n        Iterator<String> it = list.iterator();\n        while (it.hasNext()) {\n            String s = it.next();\n            if (s.length() < minLength) {\n                it.remove();\n            }\n        }\n    }\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList(\"Java\", \"Go\", \"Rust\", \"C\"));\n        removeShortStrings(list, 3);\n        System.out.println(list);\n    }\n}",
      "output": "[Java, Rust]",
      "explanation": "Iterator.remove() synchronizes expectedModCount with modCount, preventing ConcurrentModificationException."
    },
    {
      "id": "lpc-3",
      "title": "Exercise 3: Two-Pointer In-Place Array Reversal",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static void reverseArray(int[] arr)` that reverses an integer array in place using a two-pointer while loop (`left < right`). Test with [1, 2, 3, 4, 5] and print the elements separated by spaces.",
      "hint": "Initialize left = 0, right = arr.length - 1; swap and move pointers towards center.",
      "solutionCode": "public class Solution {\n    public static void reverseArray(int[] arr) {\n        int left = 0, right = arr.length - 1;\n        while (left < right) {\n            int temp = arr[left];\n            arr[left] = arr[right];\n            arr[right] = temp;\n            left++;\n            right--;\n        }\n    }\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        reverseArray(arr);\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + (i < arr.length - 1 ? \" \" : \"\"));\n        }\n        System.out.println();\n    }\n}",
      "output": "5 4 3 2 1",
      "explanation": "Two-pointer while loop reverses the array in O(N/2) swaps with O(1) auxiliary memory."
    },
    {
      "id": "lpc-4",
      "title": "Exercise 4: Guaranteed Single Execution Do-While Retry",
      "difficulty": "Easy",
      "problemStatement": "Implement a method `public static int simulateRetry(int maxAttempts, int succeedOn)` that executes attempts using a `do-while` loop. Increment attempt counter on each iteration until `attempt == succeedOn` or `attempt >= maxAttempts`. Return total attempts made. Test with (3, 1) and (3, 5).",
      "hint": "Use do { attempts++; } while (attempts < succeedOn && attempts < maxAttempts);.",
      "solutionCode": "public class Solution {\n    public static int simulateRetry(int maxAttempts, int succeedOn) {\n        int attempts = 0;\n        do {\n            attempts++;\n            if (attempts == succeedOn) break;\n        } while (attempts < maxAttempts);\n        return attempts;\n    }\n    public static void main(String[] args) {\n        System.out.println(simulateRetry(3, 1));\n        System.out.println(simulateRetry(3, 5));\n    }\n}",
      "output": "1\n3",
      "explanation": "The do-while loop guarantees at least one execution attempt before checking continuation boundaries."
    },
    {
      "id": "lpc-5",
      "title": "Exercise 5: Multi-Variable For Loop Convergence",
      "difficulty": "Easy",
      "problemStatement": "Write a program that uses a multi-variable for loop with two variables `start = 0` and `end = 20`. On each iteration, increment `start += 3` and decrement `end -= 2`. Terminate when `start >= end`. Print the final values of `start` and `end` separated by space.",
      "hint": "for (int start = 0, end = 20; start < end; start += 3, end -= 2).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        int start, end;\n        for (start = 0, end = 20; start < end; start += 3, end -= 2) {\n            // iterating\n        }\n        System.out.println(start + \" \" + end);\n    }\n}",
      "output": "12 12",
      "explanation": "Iterations: (0, 20) -> (3, 18) -> (6, 16) -> (9, 14) -> (12, 12). Since 12 < 12 is false, loop terminates at 12 12."
    },
    {
      "id": "lpc-6",
      "title": "Exercise 6: Fibonacci Sequence Iteration Invariant",
      "difficulty": "Medium",
      "problemStatement": "Compute the N-th Fibonacci number iteratively using a for loop to avoid exponential recursion overhead. `fib(0) = 0, fib(1) = 1`. Write a method `public static long fib(int n)` and test with n = 10 and n = 20.",
      "hint": "Maintain previous two values: a = 0, b = 1; in loop compute c = a + b, then a = b, b = c.",
      "solutionCode": "public class Solution {\n    public static long fib(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        long a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            long c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n    public static void main(String[] args) {\n        System.out.println(fib(10));\n        System.out.println(fib(20));\n    }\n}",
      "output": "55\n6765",
      "explanation": "Iterative state transition runs in O(N) time with O(1) space, maintaining the invariant that b holds fib(i)."
    },
    {
      "id": "lpc-7",
      "title": "Exercise 7: Labeled Continue in Prime Number Generator",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static int countPrimesUpTo(int limit)` that counts prime numbers up to `limit` using a nested loop with a labeled continue `nextNumber:` to skip non-primes immediately upon finding a divisor. Test with limit = 20.",
      "hint": "For each number n from 2 to limit, test divisors d from 2 up to d * d <= n. If n % d == 0 continue nextNumber;.",
      "solutionCode": "public class Solution {\n    public static int countPrimesUpTo(int limit) {\n        int count = 0;\n        nextNumber:\n        for (int n = 2; n <= limit; n++) {\n            for (int d = 2; d * d <= n; d++) {\n                if (n % d == 0) {\n                    continue nextNumber;\n                }\n            }\n            count++;\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(countPrimesUpTo(20));\n    }\n}",
      "output": "8",
      "explanation": "Primes up to 20 are 2, 3, 5, 7, 11, 13, 17, 19 (total 8). Labeled continue skips remaining checks for non-primes."
    },
    {
      "id": "lpc-8",
      "title": "Exercise 8: Palindrome Verification with While Loop",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static boolean isPalindrome(String s)` using a two-pointer while loop comparing characters from left and right inward. Return true if palindrome, false otherwise. Test with \"racecar\" and \"java\".",
      "hint": "Compare s.charAt(left) != s.charAt(right).",
      "solutionCode": "public class Solution {\n    public static boolean isPalindrome(String s) {\n        int left = 0, right = s.length() - 1;\n        while (left < right) {\n            if (s.charAt(left) != s.charAt(right)) {\n                return false;\n            }\n            left++;\n            right--;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"racecar\"));\n        System.out.println(isPalindrome(\"java\"));\n    }\n}",
      "output": "true\nfalse",
      "explanation": "Two-pointer while loop converges inward in O(N/2) time, terminating immediately on mismatch."
    },
    {
      "id": "lpc-9",
      "title": "Exercise 9: Integer Scaling to Avoid Floating-Point Loop Drift",
      "difficulty": "Easy",
      "problemStatement": "Demonstrate the proper pattern for fractional stepping: iterate from 0.0 to 1.0 in steps of 0.2 using an integer counter `step` from 0 to 5. Multiply `step * 0.2` inside the loop and print each value on a new line.",
      "hint": "Use integer counter for (int step = 0; step <= 5; step++).",
      "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        for (int step = 0; step <= 5; step++) {\n            double val = Math.round(step * 0.2 * 10.0) / 10.0;\n            System.out.println(val);\n        }\n    }\n}",
      "output": "0.0\n0.2\n0.4\n0.6\n0.8\n1.0",
      "explanation": "Scaling from an integer loop counter guarantees exact 6-iteration termination without infinite loop drift."
    },
    {
      "id": "lpc-10",
      "title": "Exercise 10: Nested Loop Matrix Transpose In-Place",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static void transposeSquareMatrix(int[][] matrix)` that transposes an N x N matrix in place using nested loops (`for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++)`). Test with 2x2 matrix [[1, 2], [3, 4]] and print the transposed matrix.",
      "hint": "Swap matrix[i][j] with matrix[j][i] only for j > i to avoid swapping back.",
      "solutionCode": "public class Solution {\n    public static void transposeSquareMatrix(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[][] m = {\n            {1, 2},\n            {3, 4}\n        };\n        transposeSquareMatrix(m);\n        System.out.println(m[0][0] + \" \" + m[0][1]);\n        System.out.println(m[1][0] + \" \" + m[1][1]);\n    }\n}",
      "output": "1 3\n2 4",
      "explanation": "Inner loop starting at j = i + 1 swaps elements across the main diagonal once, completing in-place matrix transposition."
    }
  ]
};
