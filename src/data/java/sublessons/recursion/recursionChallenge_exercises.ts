import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 10: RECURSION & CALL STACK - CAPSTONE EXERCISES (LESSON 10.5)
// ============================================================

export const recursionChallengeExercises: Record<string, ProgrammingExercise[]> = {
  'recursion-challenge': [
  {
    "id": "rec-ch-01",
    "title": "Call Stack Trace Visualizer",
    "difficulty": "Easy",
    "problemStatement": "Implement a recursive method `countUpAndDown(int n, int max, int depth)` that prints indentation corresponding to recursion depth. On winding descent, print `depth: n`. On base case (n == max), print `BASE CASE REACHED: max`. On unwinding ascent, print `unwind: n`. In `main()`, invoke `countUpAndDown(1, 3, 0)`.",
    "hint": "Pass an extra integer parameter `depth` to track call depth and print indentation using '  '.repeat(depth).",
    "solutionCode": "public class Main {\n    public static void countUpAndDown(int n, int max, int depth) {\n        String indent = \"  \".repeat(depth);\n        System.out.println(indent + \"winding: \" + n);\n        if (n == max) {\n            System.out.println(indent + \"BASE CASE REACHED: \" + n);\n            System.out.println(indent + \"unwinding: \" + n);\n            return;\n        }\n        countUpAndDown(n + 1, max, depth + 1);\n        System.out.println(indent + \"unwinding: \" + n);\n    }\n\n    public static void main(String[] args) {\n        countUpAndDown(1, 3, 0);\n    }\n}",
    "output": "winding: 1\n  winding: 2\n    winding: 3\n    BASE CASE REACHED: 3\n    unwinding: 3\n  unwinding: 2\nunwinding: 1",
    "explanation": "Demonstrates strict LIFO stack frame allocation and destruction. The base case executes at maximum stack depth, followed by symmetrical unwinding."
  },
  {
    "id": "rec-ch-02",
    "title": "Recursive Binary Search with Verification",
    "difficulty": "Easy",
    "problemStatement": "Implement `binarySearch(int[] arr, int target, int low, int high)` recursively. Return the 0-based index if target is found; return -1 if target is absent. In `main()`, search for target 25 and target 99 in `{5, 12, 19, 25, 34, 45, 56}` and print results.",
    "hint": "Base case is low > high returning -1. Compute mid = low + (high - low) / 2 to prevent integer overflow.",
    "solutionCode": "public class Main {\n    public static int binarySearch(int[] arr, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] > target) {\n            return binarySearch(arr, target, low, mid - 1);\n        } else {\n            return binarySearch(arr, target, mid + 1, high);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] numbers = {5, 12, 19, 25, 34, 45, 56};\n        System.out.println(\"Index of 25: \" + binarySearch(numbers, 25, 0, numbers.length - 1));\n        System.out.println(\"Index of 99: \" + binarySearch(numbers, 99, 0, numbers.length - 1));\n    }\n}",
    "output": "Index of 25: 3\nIndex of 99: -1",
    "explanation": "Divides the search space in half with each recursive step, achieving logarithmic O(log N) time and stack space."
  },
  {
    "id": "rec-ch-03",
    "title": "Recursive String Inversion without String Concatenation in Loops",
    "difficulty": "Easy",
    "problemStatement": "Write a recursive method `reverseString(String s, int index)` that prints characters of string `s` in reverse order during unwinding. In `main()`, test with `\"Recursion\"`.",
    "hint": "Recurse with index + 1 until reaching index == s.length() (base case). Print s.charAt(index) after the recursive call returns.",
    "solutionCode": "public class Main {\n    public static void reverseString(String s, int index) {\n        if (index == s.length()) return;\n        reverseString(s, index + 1);\n        System.out.print(s.charAt(index));\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Reversed: \");\n        reverseString(\"Recursion\", 0);\n        System.out.println();\n    }\n}",
    "output": "Reversed: noisruceR",
    "explanation": "Because the print statement occurs after the recursive call, the deepest frame (last character 'n') prints first, unwinding up to index 0 ('R')."
  },
  {
    "id": "rec-ch-04",
    "title": "Memoized Fibonacci with Call Counter",
    "difficulty": "Medium",
    "problemStatement": "Implement `fib(int n, long[] memo)` with a static call counter. In `main()`, calculate Fibonacci for n = 35 and print both the result and the total recursive calls made to prove memoization effectiveness.",
    "hint": "Allocate long[n + 1] filled with 0 (or -1). Check if memo[n] != 0 before recursing.",
    "solutionCode": "public class Main {\n    static int totalCalls = 0;\n\n    public static long fib(int n, long[] memo) {\n        totalCalls++;\n        if (n <= 1) return n;\n        if (memo[n] != 0) return memo[n];\n        memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n        return memo[n];\n    }\n\n    public static void main(String[] args) {\n        int n = 35;\n        long[] memo = new long[n + 1];\n        long result = fib(n, memo);\n        System.out.println(\"Fibonacci(\" + n + \") = \" + result);\n        System.out.println(\"Total calls made: \" + totalCalls);\n    }\n}",
    "output": "Fibonacci(35) = 9227465\nTotal calls made: 69",
    "explanation": "Without memoization, fib(35) requires 29,860,703 calls. With memoization, exactly 2*35 - 1 = 69 calls are executed."
  },
  {
    "id": "rec-ch-05",
    "title": "Tower of Hanoi Move Generator",
    "difficulty": "Medium",
    "problemStatement": "Implement recursive `solveHanoi(int n, char fromRod, char toRod, char auxRod)` that generates and prints each disk transfer step. In `main()`, solve for 3 disks from rod 'A' to rod 'C' using 'B' as auxiliary.",
    "hint": "Recurrence: move n-1 disks from source to aux; move disk n from source to target; move n-1 disks from aux to target.",
    "solutionCode": "public class Main {\n    public static void solveHanoi(int n, char fromRod, char toRod, char auxRod) {\n        if (n == 1) {\n            System.out.println(\"Move disk 1 from \" + fromRod + \" to \" + toRod);\n            return;\n        }\n        solveHanoi(n - 1, fromRod, auxRod, toRod);\n        System.out.println(\"Move disk \" + n + \" from \" + fromRod + \" to \" + toRod);\n        solveHanoi(n - 1, auxRod, toRod, fromRod);\n    }\n\n    public static void main(String[] args) {\n        solveHanoi(3, 'A', 'C', 'B');\n    }\n}",
    "output": "Move disk 1 from A to C\nMove disk 2 from A to B\nMove disk 1 from C to B\nMove disk 3 from A to C\nMove disk 1 from B to A\nMove disk 2 from B to C\nMove disk 1 from A to C",
    "explanation": "Solves the classic Tower of Hanoi in 2^n - 1 = 7 steps using dual recursive decomposition."
  },
  {
    "id": "rec-ch-06",
    "title": "Generate All Subsets (Power Set) with Backtracking",
    "difficulty": "Medium",
    "problemStatement": "Implement `generateSubsets(int[] nums, int index, List<Integer> current, List<List<Integer>> result)` to produce all 2^N subsets of `{1, 2, 3}`. In `main()`, print the total subset count and the generated subsets.",
    "hint": "At each index, choose to either include nums[index] (add, recurse, remove) or exclude nums[index] (recurse directly). Remember defensive copy at base case.",
    "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void generateSubsets(int[] nums, int index, List<Integer> current, List<List<Integer>> result) {\n        if (index == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n        // Include nums[index]\n        current.add(nums[index]);\n        generateSubsets(nums, index + 1, current, result);\n        current.remove(current.size() - 1); // Backtrack\n\n        // Exclude nums[index]\n        generateSubsets(nums, index + 1, current, result);\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> result = new ArrayList<>();\n        generateSubsets(nums, 0, new ArrayList<>(), result);\n        System.out.println(\"Total subsets: \" + result.size());\n        System.out.println(\"Subsets: \" + result);\n    }\n}",
    "output": "Total subsets: 8\nSubsets: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []]",
    "explanation": "Generates all 2^3 = 8 subsets by systematically branching on inclusion and exclusion, with proper state unwinding."
  },
  {
    "id": "rec-ch-07",
    "title": "Combination Sum Backtracking with Pruning",
    "difficulty": "Medium",
    "problemStatement": "Given candidates `{2, 3, 6, 7}` and target 7, implement `findCombinations(int[] candidates, int start, int remaining, List<Integer> path, List<List<Integer>> result)` where numbers can be used repeatedly. In `main()`, print all combinations summing to 7.",
    "hint": "If remaining == 0, record path copy. If remaining < 0, return (prune). In loop, recurse with same start index i since elements may be reused.",
    "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void findCombinations(int[] candidates, int start, int remaining, List<Integer> path, List<List<Integer>> result) {\n        if (remaining == 0) {\n            result.add(new ArrayList<>(path));\n            return;\n        }\n        if (remaining < 0) return;\n\n        for (int i = start; i < candidates.length; i++) {\n            path.add(candidates[i]);\n            findCombinations(candidates, i, remaining - candidates[i], path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] candidates = {2, 3, 6, 7};\n        List<List<Integer>> result = new ArrayList<>();\n        findCombinations(candidates, 0, 7, new ArrayList<>(), result);\n        System.out.println(\"Combinations summing to 7: \" + result);\n    }\n}",
    "output": "Combinations summing to 7: [[2, 2, 3], [7]]",
    "explanation": "Backtracking explores all candidate combinations, pruning paths where remaining < 0 and reusing candidates."
  },
  {
    "id": "rec-ch-08",
    "title": "Permutations of an Array Generator",
    "difficulty": "Hard",
    "problemStatement": "Implement `permute(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result)` to generate all distinct permutations of `{1, 2, 3}`. In `main()`, print total count and generated permutations.",
    "hint": "Use a boolean array `used` to prevent re-using elements in the same permutation. When current.size() == nums.length, add defensive copy.",
    "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void permute(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {\n        if (current.size() == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n        for (int i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n            used[i] = true;\n            current.add(nums[i]);\n            permute(nums, used, current, result);\n            current.remove(current.size() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> result = new ArrayList<>();\n        permute(nums, new boolean[nums.length], new ArrayList<>(), result);\n        System.out.println(\"Total permutations: \" + result.size());\n        System.out.println(\"Permutations: \" + result);\n    }\n}",
    "output": "Total permutations: 6\nPermutations: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
    "explanation": "Produces all 3! = 6 permutations using the visited boolean array pattern with symmetrical state restoration."
  },
  {
    "id": "rec-ch-09",
    "title": "Grid Path Matrix Counter with Obstacles",
    "difficulty": "Hard",
    "problemStatement": "Implement `countPaths(int[][] grid, int r, int c, int[][] memo)` that returns the number of unique paths from (0,0) to bottom-right cell in a grid where 1 represents an obstacle and 0 represents open space. You may only move Down and Right. In `main()`, test on a 3x3 grid with an obstacle at (1,1).",
    "hint": "If r or c out of bounds or grid[r][c] == 1, return 0. If at destination, return 1. Use memo table to prevent recalculation.",
    "solutionCode": "public class Main {\n    public static int countPaths(int[][] grid, int r, int c, int[][] memo) {\n        int m = grid.length, n = grid[0].length;\n        if (r >= m || c >= n || grid[r][c] == 1) return 0;\n        if (r == m - 1 && c == n - 1) return 1;\n        if (memo[r][c] != -1) return memo[r][c];\n\n        memo[r][c] = countPaths(grid, r + 1, c, memo) + countPaths(grid, r, c + 1, memo);\n        return memo[r][c];\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {\n            {0, 0, 0},\n            {0, 1, 0},\n            {0, 0, 0}\n        };\n        int[][] memo = new int[3][3];\n        for (int i = 0; i < 3; i++) java.util.Arrays.fill(memo[i], -1);\n\n        int paths = countPaths(grid, 0, 0, memo);\n        System.out.println(\"Unique paths avoiding obstacle: \" + paths);\n    }\n}",
    "output": "Unique paths avoiding obstacle: 2",
    "explanation": "Computes distinct navigation paths using memoized grid recursion, correctly ignoring paths intersecting the obstacle."
  },
  {
    "id": "rec-ch-10",
    "title": "Palindrome Partitioning Backtracking Engine",
    "difficulty": "Hard",
    "problemStatement": "Implement `partition(String s, int start, List<String> current, List<List<String>> result)` to partition string `\"aab\"` such that every substring is a palindrome. In `main()`, print all valid palindrome partitions.",
    "hint": "Helper isPalindrome(s, left, right) verifies palindrome substrings. In loop from start to s.length()-1, if substring is palindrome, recurse on i + 1.",
    "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    private static boolean isPalindrome(String s, int lo, int hi) {\n        while (lo < hi) {\n            if (s.charAt(lo++) != s.charAt(hi--)) return false;\n        }\n        return true;\n    }\n\n    public static void partition(String s, int start, List<String> current, List<List<String>> result) {\n        if (start == s.length()) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n        for (int i = start; i < s.length(); i++) {\n            if (isPalindrome(s, start, i)) {\n                current.add(s.substring(start, i + 1));\n                partition(s, i + 1, current, result);\n                current.remove(current.size() - 1);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        String s = \"aab\";\n        List<List<String>> result = new ArrayList<>();\n        partition(s, 0, new ArrayList<>(), result);\n        System.out.println(\"Palindrome partitions for \\\"aab\\\": \" + result);\n    }\n}",
    "output": "Palindrome partitions for \"aab\": [[a, a, b], [aa, b]]",
    "explanation": "Systematically partitions the string into palindromic substrings using depth-first backtracking and defensive copying."
  }
]
};
