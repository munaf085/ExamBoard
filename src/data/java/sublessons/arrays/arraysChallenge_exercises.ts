import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 8: ARRAYS & 2D MATRIX - CAPSTONE EXERCISES (LESSON 8.5)
// ============================================================

export const arraysChallengeExercises: Record<string, ProgrammingExercise[]> = {
  'arrays-challenge': [
  {
    "id": "arrc-1",
    "title": "Exercise 1: In-Place 90-Degree Clockwise Matrix Rotation",
    "difficulty": "Medium",
    "problemStatement": "Implement a method `public static void rotateMatrix(int[][] matrix)` that rotates an N x N matrix 90 degrees clockwise in place using transpose + row reversal. Test with 3x3 matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]] and print the rotated matrix.",
    "hint": "Step 1: swap m[i][j] with m[j][i] for j > i. Step 2: reverse each row using two pointers.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void rotateMatrix(int[][] m) {\n        int n = m.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = m[i][j];\n                m[i][j] = m[j][i];\n                m[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int left = 0, right = n - 1; left < right; left++, right--) {\n                int temp = m[i][left];\n                m[i][left] = m[i][right];\n                m[i][right] = temp;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        rotateMatrix(matrix);\n        System.out.println(Arrays.deepToString(matrix));\n    }\n}",
    "output": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
    "explanation": "Transpose followed by horizontal reflection rotates the matrix in-place in O(N^2) time with O(1) auxiliary space."
  },
  {
    "id": "arrc-2",
    "title": "Exercise 2: Array Covariance & ArrayStoreException Audit",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static String testCovariance()` that assigns a `String[2]` to an `Object[]` reference, assigns \"Valid\" to index 0, and catches `ArrayStoreException` when attempting to assign an `Integer` to index 1. Return the exception class name.",
    "hint": "Wrap the invalid assignment in a try-catch block catching ArrayStoreException.",
    "solutionCode": "public class Solution {\n    public static String testCovariance() {\n        Object[] arr = new String[2];\n        arr[0] = \"Valid\";\n        try {\n            arr[1] = Integer.valueOf(42);\n            return \"NO_EXCEPTION\";\n        } catch (ArrayStoreException e) {\n            return e.getClass().getSimpleName();\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(testCovariance());\n    }\n}",
    "output": "ArrayStoreException",
    "explanation": "JVM aastore bytecode verifies component type at runtime, throwing ArrayStoreException when storing Integer in String[]."
  },
  {
    "id": "arrc-3",
    "title": "Exercise 3: Safe Binary Search Insertion Point Recovery",
    "difficulty": "Medium",
    "problemStatement": "Write a method `public static int findOrInsertIndex(int[] sortedArr, int target)` that uses `Arrays.binarySearch()`. If target exists, return its index. If missing, recover and return the index where it should be inserted to maintain sorted order. Test with [10, 20, 30, 40] and targets 30 and 25.",
    "hint": "If res >= 0 return res, else return -res - 1.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static int findOrInsertIndex(int[] sortedArr, int target) {\n        int res = Arrays.binarySearch(sortedArr, target);\n        return res >= 0 ? res : (-res - 1);\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40};\n        System.out.println(findOrInsertIndex(arr, 30));\n        System.out.println(findOrInsertIndex(arr, 25));\n    }\n}",
    "output": "2\n2",
    "explanation": "30 is found at index 2. 25 is missing between 20 and 30; binarySearch returns -3, and -(-3) - 1 recovers insertion index 2."
  },
  {
    "id": "arrc-4",
    "title": "Exercise 4: Deep Copying an Object Array",
    "difficulty": "Medium",
    "problemStatement": "Create class `Item { int id; Item(int id) { this.id = id; } }`. Write a method `public static Item[] deepCopy(Item[] original)` that allocates a new array and instantiates a new `Item` for each element. Mutate `original[0].id = 999` and verify that `copy[0].id` is unchanged.",
    "hint": "Instantiate new Item(original[i].id) for each element in the new array.",
    "solutionCode": "public class Solution {\n    static class Item {\n        int id;\n        Item(int id) { this.id = id; }\n    }\n    public static Item[] deepCopy(Item[] original) {\n        Item[] copy = new Item[original.length];\n        for (int i = 0; i < original.length; i++) {\n            copy[i] = new Item(original[i].id);\n        }\n        return copy;\n    }\n    public static void main(String[] args) {\n        Item[] original = { new Item(10), new Item(20) };\n        Item[] copy = deepCopy(original);\n        original[0].id = 999;\n        System.out.println(\"Original: \" + original[0].id);\n        System.out.println(\"Copy: \" + copy[0].id);\n    }\n}",
    "output": "Original: 999\nCopy: 10",
    "explanation": "Deep copy allocates independent object instances on the heap, isolating state modifications."
  },
  {
    "id": "arrc-5",
    "title": "Exercise 5: Triangular Jagged Array Construction",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static int[][] createTriangularMatrix(int n)` that allocates an n-row jagged array where row i (0 to n-1) has length `i + 1`. Fill row i with 1s. Test with n = 3 and print using Arrays.deepToString.",
    "hint": "for row i, jagged[i] = new int[i + 1]; fill with 1.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static int[][] createTriangularMatrix(int n) {\n        int[][] jagged = new int[n][];\n        for (int i = 0; i < n; i++) {\n            jagged[i] = new int[i + 1];\n            Arrays.fill(jagged[i], 1);\n        }\n        return jagged;\n    }\n    public static void main(String[] args) {\n        int[][] m = createTriangularMatrix(3);\n        System.out.println(Arrays.deepToString(m));\n    }\n}",
    "output": "[[1], [1, 1], [1, 1, 1]]",
    "explanation": "Jagged array allocates each row independently with custom lengths, saving memory in sparse matrices."
  },
  {
    "id": "arrc-6",
    "title": "Exercise 6: Empty Array Pattern Eliminating Null Pointer",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static int[] getPositiveNumbers(int[] input)` that returns an array of positive integers. If no positive numbers exist, return `new int[0]` (never null). In `main`, call `for (int x : getPositiveNumbers(new int[]{-5, -2}))` and print \"Safe Execution\" to verify zero iterations without NPE.",
    "hint": "Count positive elements, allocate matching size, or return EMPTY array.",
    "solutionCode": "public class Solution {\n    private static final int[] EMPTY = new int[0];\n    public static int[] getPositiveNumbers(int[] input) {\n        int count = 0;\n        for (int x : input) if (x > 0) count++;\n        if (count == 0) return EMPTY;\n        int[] res = new int[count];\n        int idx = 0;\n        for (int x : input) if (x > 0) res[idx++] = x;\n        return res;\n    }\n    public static void main(String[] args) {\n        int[] result = getPositiveNumbers(new int[]{-5, -2});\n        for (int x : result) {\n            System.out.println(x);\n        }\n        System.out.println(\"Safe Execution: length is \" + result.length);\n    }\n}",
    "output": "Safe Execution: length is 0",
    "explanation": "Returning empty arrays guarantees calling code executes for-each loops without null guards or NPE risks."
  },
  {
    "id": "arrc-7",
    "title": "Exercise 7: System.arraycopy Subarray Shift",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static int[] removeElementAtIndex(int[] arr, int index)` using `System.arraycopy()` to return a new array of length `arr.length - 1` with the element at `index` removed. Test with [10, 20, 30, 40, 50] removing index 2 (value 30).",
    "hint": "Copy elements before index, then copy elements after index.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static int[] removeElementAtIndex(int[] arr, int index) {\n        int[] result = new int[arr.length - 1];\n        System.arraycopy(arr, 0, result, 0, index);\n        System.arraycopy(arr, index + 1, result, index, arr.length - index - 1);\n        return result;\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40, 50};\n        int[] updated = removeElementAtIndex(arr, 2);\n        System.out.println(Arrays.toString(updated));\n    }\n}",
    "output": "[10, 20, 40, 50]",
    "explanation": "System.arraycopy copies memory segments in bulk at native hardware speed."
  },
  {
    "id": "arrc-8",
    "title": "Exercise 8: Transpose Rectangular Matrix (M x N to N x M)",
    "difficulty": "Medium",
    "problemStatement": "Write a method `public static int[][] transposeRectangular(int[][] matrix)` that transposes an M x N matrix into a new N x M matrix. Test with 2x3 matrix [[1, 2, 3], [4, 5, 6]] and print using Arrays.deepToString.",
    "hint": "Allocated new matrix has dimensions [cols][rows]. transposed[c][r] = matrix[r][c].",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static int[][] transposeRectangular(int[][] matrix) {\n        int rows = matrix.length;\n        int cols = matrix[0].length;\n        int[][] transposed = new int[cols][rows];\n        for (int r = 0; r < rows; r++) {\n            for (int c = 0; c < cols; c++) {\n                transposed[c][r] = matrix[r][c];\n            }\n        }\n        return transposed;\n    }\n    public static void main(String[] args) {\n        int[][] m = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        int[][] t = transposeRectangular(m);\n        System.out.println(Arrays.deepToString(t));\n    }\n}",
    "output": "[[1, 4], [2, 5], [3, 6]]",
    "explanation": "Rectangular matrix transposition inverts row and column coordinate axes into an N x M matrix."
  },
  {
    "id": "arrc-9",
    "title": "Exercise 9: Detecting First Array Mismatch with Arrays.mismatch",
    "difficulty": "Easy",
    "problemStatement": "Use `Arrays.mismatch()` (Java 9+) to find the first index where two integer arrays differ. Test with [1, 2, 3, 4] and [1, 2, 9, 4], and test with identical arrays [1, 2] and [1, 2]. Print both mismatch indices.",
    "hint": "Arrays.mismatch returns -1 if arrays are identical, or the first differing index.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void main(String[] args) {\n        int[] a1 = {1, 2, 3, 4};\n        int[] a2 = {1, 2, 9, 4};\n        int[] b1 = {1, 2};\n        int[] b2 = {1, 2};\n        System.out.println(Arrays.mismatch(a1, a2));\n        System.out.println(Arrays.mismatch(b1, b2));\n    }\n}",
    "output": "2\n-1",
    "explanation": "Arrays.mismatch identifies index 2 as the first differing position, and returns -1 for identical arrays."
  },
  {
    "id": "arrc-10",
    "title": "Exercise 10: Matrix Saddle Point Detection",
    "difficulty": "Hard",
    "problemStatement": "A saddle point in an N x N matrix is an element that is the minimum in its row and the maximum in its column. Implement a method `public static String findSaddlePoint(int[][] matrix)` returning \"Row: R, Col: C, Val: V\" if found, or \"None\" if not. Test with [[1, 2, 3], [4, 5, 6], [7, 8, 9]].",
    "hint": "For each row, find minimum element column. Check if that element is the maximum in that column.",
    "solutionCode": "public class Solution {\n    public static String findSaddlePoint(int[][] matrix) {\n        int n = matrix.length;\n        for (int r = 0; r < n; r++) {\n            int minCol = 0;\n            for (int c = 1; c < n; c++) {\n                if (matrix[r][c] < matrix[r][minCol]) {\n                    minCol = c;\n                }\n            }\n            int candidate = matrix[r][minCol];\n            boolean isSaddle = true;\n            for (int k = 0; k < n; k++) {\n                if (matrix[k][minCol] > candidate) {\n                    isSaddle = false;\n                    break;\n                }\n            }\n            if (isSaddle) {\n                return \"Row: \" + r + \", Col: \" + minCol + \", Val: \" + candidate;\n            }\n        }\n        return \"None\";\n    }\n    public static void main(String[] args) {\n        int[][] m = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n        System.out.println(findSaddlePoint(m));\n    }\n}",
    "output": "Row: 2, Col: 0, Val: 7",
    "explanation": "In row 2, element 7 (at col 0) is minimum in row 2 (7 <= 8 <= 9) and maximum in column 0 (7 >= 4 >= 1)."
  }
]
};
