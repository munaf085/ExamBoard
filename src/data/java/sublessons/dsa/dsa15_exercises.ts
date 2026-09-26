import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 15: DSA FOUNDATIONS & SEARCHING (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 15.1 - 15.4
// ============================================================

export const dsa15Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 15.1: Big-O Asymptotic Analysis & Space Complexity ──────────
  'big-o-asymptotic-analysis': [
    {
      id: 'dsa-15-1-ex1',
      title: 'Constant Time Verification ($O(1)$)',
      problemStatement: 'Write a program with a method `getFirstAndLast(int[] arr)` that returns the sum of the first and last elements in $O(1)$ constant time regardless of array size. Print the result for a 6-element array.',
      hint: 'Direct array indexing arr[0] and arr[arr.length - 1] performs memory address arithmetic in O(1) time without any iteration.',
      solutionCode: `public class Main {
    public static int getFirstAndLast(int[] arr) {
        if (arr == null || arr.length == 0) return 0;
        return arr[0] + arr[arr.length - 1]; // O(1) constant time access
    }

    public static void main(String[] args) {
        int[] nums = { 10, 20, 30, 40, 50, 60 };
        System.out.println("First + Last = " + getFirstAndLast(nums));
    }
}`,
      output: 'First + Last = 70',
      explanation: 'Array index access in Java evaluates to base address + (index * 4 bytes), which is executed in a single machine CPU cycle ($O(1)$ constant time) and $O(1)$ space.'
    },
    {
      id: 'dsa-15-1-ex2',
      title: 'Linear Scan Step Counter ($O(N)$)',
      problemStatement: 'Write a method `linearSum(int[] arr)` that sums all elements in the array while counting the exact number of iterations executed. Print the sum and the step count.',
      hint: 'A single loop that touches each of the N elements once runs in O(N) linear time.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = { 4, 8, 15, 16, 23, 42 };
        int sum = 0;
        int operations = 0;

        for (int x : arr) {
            sum += x;
            operations++;
        }

        System.out.println("Sum: " + sum + ", Loop Operations: " + operations);
    }
}`,
      output: 'Sum: 108, Loop Operations: 6',
      explanation: 'For an input array of size N = 6, the loop body executes exactly 6 times. As N scales, time grows linearly $O(N)$. Space complexity is $O(1)$ because only primitive counters are stored.'
    },
    {
      id: 'dsa-15-1-ex3',
      title: 'Quadratic Pair Verification ($O(N^2)$)',
      problemStatement: 'Write a program with nested loops that prints all pairs `(arr[i], arr[j])` where `i < j`, and tracks the total comparison count for an array of size 5.',
      hint: 'A nested loop where the inner loop runs N - 1, N - 2, ..., 1 times executes N*(N - 1)/2 iterations, which is O(N^2).',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5 };
        int comparisons = 0;

        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                comparisons++;
            }
        }

        System.out.println("Array size: " + arr.length + ", Pair comparisons: " + comparisons);
    }
}`,
      output: 'Array size: 5, Pair comparisons: 10',
      explanation: 'The number of comparisons is $5 \\times 4 / 2 = 10$. In general asymptotic notation, $N(N-1)/2 = (N^2 - N)/2 = O(N^2)$ quadratic time.'
    },
    {
      id: 'dsa-15-1-ex4',
      title: 'Logarithmic Halving Counter ($O(\\log N)$)',
      problemStatement: 'Write a method `countHalvings(int n)` that divides an integer `n` by 2 until it reaches 1, counting the total number of divisions. Test with n = 64.',
      hint: 'Any loop where the problem size is halved each step runs in O(log2 N) time.',
      solutionCode: `public class Main {
    public static int countHalvings(int n) {
        int steps = 0;
        int current = n;
        while (current > 1) {
            current /= 2;
            steps++;
        }
        return steps;
    }

    public static void main(String[] args) {
        int n = 64;
        System.out.println("Halvings for " + n + ": " + countHalvings(n));
    }
}`,
      output: 'Halvings for 64: 6',
      explanation: '$2^6 = 64$, so halving 64 down to 1 takes $\\log_2(64) = 6$ operations. Time complexity is $O(\\log N)$, space complexity is $O(1)$.'
    },
    {
      id: 'dsa-15-1-ex5',
      title: 'Linearithmic Step Simulation ($O(N \\log N)$)',
      problemStatement: 'Simulate an $O(N \\log N)$ algorithm by running an outer loop that divides $N$ by 2 (log N levels), and inside each level runs an $O(N)$ linear pass. Count total inner steps for N = 16.',
      hint: 'The outer loop runs log2(16) = 4 times. Each iteration performs 16 units of work.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 16;
        int totalSteps = 0;
        int levels = 0;

        for (int size = n; size > 1; size /= 2) {
            levels++;
            for (int i = 0; i < n; i++) {
                totalSteps++;
            }
        }

        System.out.println("N=" + n + ", Levels=" + levels + ", Total Steps=" + totalSteps);
    }
}`,
      output: 'N=16, Levels=4, Total Steps=64',
      explanation: 'With $N = 16$, the outer loop executes $\\log_2(16) = 4$ times. Each pass processes 16 items. Total steps $= 16 \\times 4 = 64 = N \\log_2 N$. This mirrors Merge Sort divide-and-conquer.'
    },
    {
      id: 'dsa-15-1-ex6',
      title: 'Auxiliary Space Analysis ($O(N)$ Space)',
      problemStatement: 'Write a method `prefixSums(int[] arr)` that allocates and returns a new array where each element is the cumulative sum up to that index. Contrast its space complexity with in-place modification.',
      hint: 'Allocating a new array of length N requires O(N) auxiliary heap space.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] prefixSums(int[] arr) {
        int[] prefix = new int[arr.length]; // O(N) Auxiliary Space
        int running = 0;
        for (int i = 0; i < arr.length; i++) {
            running += arr[i];
            prefix[i] = running;
        }
        return prefix;
    }

    public static void main(String[] args) {
        int[] input = { 2, 4, 6, 8 };
        int[] result = prefixSums(input);
        System.out.println("Prefix sums: " + Arrays.toString(result));
    }
}`,
      output: 'Prefix sums: [2, 6, 12, 20]',
      explanation: 'The method allocates `new int[arr.length]` which consumes $O(N)$ auxiliary memory on the JVM heap. The time complexity is $O(N)$ since the array is traversed once.'
    },
    {
      id: 'dsa-15-1-ex7',
      title: 'In-Place Reversal ($O(1)$ Auxiliary Space)',
      problemStatement: 'Write an in-place array reversal method `reverseInPlace(int[] arr)` using two pointers that achieves $O(N)$ time and $O(1)$ auxiliary space without allocating a second array.',
      hint: 'Swap elements at left and right indices, incrementing left and decrementing right until left >= right.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static void reverseInPlace(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] nums = { 1, 2, 3, 4, 5 };
        reverseInPlace(nums);
        System.out.println("Reversed in-place: " + Arrays.toString(nums));
    }
}`,
      output: 'Reversed in-place: [5, 4, 3, 2, 1]',
      explanation: 'Only three primitive variables (`left`, `right`, `temp`) are allocated on the stack frame. The array is mutated in-place, yielding $O(1)$ auxiliary space and $O(N/2) = O(N)$ time.'
    },
    {
      id: 'dsa-15-1-ex8',
      title: 'Amortized Array Resizing Simulation',
      problemStatement: 'Simulate Java\'s `ArrayList` dynamic resizing by starting with an array of capacity 2 and doubling its capacity whenever full. Insert 9 elements and print the resizing events.',
      hint: 'When full, allocate new array of size capacity * 2, copy old elements, and point reference to new array. Total copies across N inserts is ~2N, giving O(1) amortized insertion.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int capacity = 2;
        int[] arr = new int[capacity];
        int size = 0;

        for (int i = 1; i <= 9; i++) {
            if (size == capacity) {
                int oldCap = capacity;
                capacity *= 2;
                int[] newArr = new int[capacity];
                System.arraycopy(arr, 0, newArr, 0, size);
                arr = newArr;
                System.out.println("Resized: " + oldCap + " -> " + capacity);
            }
            arr[size++] = i;
        }

        System.out.println("Final size=" + size + ", capacity=" + capacity);
    }
}`,
      output: `Resized: 2 -> 4
Resized: 4 -> 8
Resized: 8 -> 16
Final size=9, capacity=16`,
      explanation: 'Although individual resizing operations take $O(N)$ time to copy elements, resizing happens infrequently (only at powers of 2). Spreading the cost over $N$ inserts gives $O(1)$ amortized time per insertion.'
    },
    {
      id: 'dsa-15-1-ex9',
      title: 'Exponential Growth Step Counter ($O(2^N)$)',
      problemStatement: 'Write a recursive Fibonacci method that counts the total number of method calls made for `fib(5)`. Show why naive recursion exhibits exponential $O(2^N)$ growth.',
      hint: 'Use a static counter incremented at the top of each recursive call.',
      solutionCode: `public class Main {
    static int callCount = 0;

    public static int fib(int n) {
        callCount++;
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        int result = fib(5);
        System.out.println("fib(5) = " + result + ", Recursive calls: " + callCount);
    }
}`,
      output: 'fib(5) = 5, Recursive calls: 15',
      explanation: 'Naive recursive Fibonacci branches into two calls per level, forming a binary recursion tree of depth $N$. The number of calls scales as $O(2^N)$ (specifically $1.618^N$), demonstrating why dynamic programming or iteration is required for larger $N$.'
    },
    {
      id: 'dsa-15-1-ex10',
      title: 'Two Pointers Asymptotic Step Count ($O(N)$)',
      problemStatement: 'Given a sorted array, write a method `hasPairWithSum(int[] arr, int target)` using two converging pointers that finds whether any two numbers sum to target in $O(N)$ time and $O(1)$ space.',
      hint: 'Start with left=0 and right=n-1. If sum > target, decrement right; if sum < target, increment left. Each step moves at least one pointer.',
      solutionCode: `public class Main {
    public static boolean hasPairWithSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int steps = 0;

        while (left < right) {
            steps++;
            int currentSum = arr[left] + arr[right];
            if (currentSum == target) {
                System.out.println("Pair found in " + steps + " steps: " + arr[left] + " + " + arr[right]);
                return true;
            } else if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] sorted = { 1, 3, 5, 7, 9, 11, 15 };
        hasPairWithSum(sorted, 16);
    }
}`,
      output: 'Pair found in 3 steps: 1 + 15',
      explanation: 'Because each comparison advances either `left` or `right`, the while loop runs at most $N$ times. Time complexity is $O(N)$, an improvement over the $O(N^2)$ brute-force double loop.'
    }
  ],

  // ── LESSON 15.2: Linear Search & Array Scanning Techniques ─────────────
  'linear-search-and-sentinels': [
    {
      id: 'dsa-15-2-ex1',
      title: 'Basic Linear Search (First Occurrence)',
      problemStatement: 'Implement `linearSearch(int[] arr, int target)` that returns the zero-based index of the first occurrence of `target`, or -1 if not found. Test with target 25.',
      hint: 'Iterate from index 0 to arr.length - 1. Return immediately upon match.',
      solutionCode: `public class Main {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Early exit on first match
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = { 12, 45, 25, 89, 25, 7 };
        System.out.println("Index of 25: " + linearSearch(data, 25));
    }
}`,
      output: 'Index of 25: 2',
      explanation: 'Linear search iterates forward until the target is encountered at index 2. Early termination ensures we do not inspect subsequent elements.'
    },
    {
      id: 'dsa-15-2-ex2',
      title: 'Linear Search for Last Occurrence',
      problemStatement: 'Write a method `findLastIndex(int[] arr, int target)` that finds the index of the last occurrence of a target in an array by scanning backwards.',
      hint: 'Scanning backwards from index arr.length - 1 down to 0 allows early return upon the first match from the end.',
      solutionCode: `public class Main {
    public static int findLastIndex(int[] arr, int target) {
        for (int i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == target) {
                return i; // First match from back is last occurrence
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = { 10, 20, 30, 20, 40, 20, 50 };
        System.out.println("Last index of 20: " + findLastIndex(data, 20));
    }
}`,
      output: 'Last index of 20: 5',
      explanation: 'By scanning in reverse from right to left, the first match found is guaranteed to be the last occurrence in the array, avoiding scanning all previous elements once found.'
    },
    {
      id: 'dsa-15-2-ex3',
      title: 'Count Target Frequency via Linear Scan',
      problemStatement: 'Write a method `countOccurrences(String[] arr, String target)` that counts how many times `target` appears in an array of Strings using `.equals()`.',
      hint: 'Linear scan must check every element because earlier matches do not preclude later matches.',
      solutionCode: `public class Main {
    public static int countOccurrences(String[] arr, String target) {
        int count = 0;
        for (String s : arr) {
            if (target == null ? s == null : target.equals(s)) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        String[] words = { "java", "python", "java", "c++", "java", "go" };
        System.out.println("Count of 'java': " + countOccurrences(words, "java"));
    }
}`,
      output: "Count of 'java': 3",
      explanation: 'Counting all occurrences is strictly $\\Theta(N)$ in best, average, and worst cases because all $N$ elements must be inspected. Space complexity is $O(1)$.'
    },
    {
      id: 'dsa-15-2-ex4',
      title: 'Sentinel Linear Search Implementation',
      problemStatement: 'Implement Sentinel Linear Search: replace the last element with target so the inner loop does not need boundary checks (`i < n`), then check if the match was found before the sentinel.',
      hint: 'Save the last element, set arr[n-1] = target. Loop while arr[i] != target without checking i < n-1. Restore the last element after.',
      solutionCode: `public class Main {
    public static int sentinelSearch(int[] arr, int target) {
        int n = arr.length;
        if (n == 0) return -1;

        int last = arr[n - 1];
        arr[n - 1] = target; // Install sentinel

        int i = 0;
        while (arr[i] != target) {
            i++; // Single comparison per loop iteration!
        }

        arr[n - 1] = last; // Restore original value

        if (i < n - 1 || arr[n - 1] == target) {
            return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = { 42, 17, 88, 33, 91, 5 };
        System.out.println("Index of 33: " + sentinelSearch(nums, 33));
    }
}`,
      output: 'Index of 33: 3',
      explanation: 'In standard linear search, two tests occur per iteration: `i < n` and `arr[i] == target`. Sentinel search eliminates the index boundary test from the inner loop, saving $N$ conditional branches.'
    },
    {
      id: 'dsa-15-2-ex5',
      title: 'Early Termination in Sorted Array',
      problemStatement: 'Write a linear search method `sortedLinearSearch(int[] arr, int target)` on an ascending sorted array that terminates early as soon as an element strictly greater than target is observed.',
      hint: 'In a sorted array, if arr[i] > target, all subsequent elements will also be > target.',
      solutionCode: `public class Main {
    public static int sortedLinearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
            if (arr[i] > target) {
                System.out.println("Terminated early at index " + i + " (val " + arr[i] + " > " + target + ")");
                return -1; // Cannot exist further right
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = { 10, 20, 30, 40, 50, 60 };
        System.out.println("Search result: " + sortedLinearSearch(sorted, 25));
    }
}`,
      output: `Terminated early at index 2 (val 30 > 25)
Search result: -1`,
      explanation: 'Since the array is sorted, observing 30 at index 2 proves that 25 cannot appear anywhere later in the array. The search exits after inspecting only 3 elements instead of all 6.'
    },
    {
      id: 'dsa-15-2-ex6',
      title: 'Linear Search for Minimum & Maximum',
      problemStatement: 'Write a method `findMinMax(int[] arr)` that finds both the minimum and maximum values in an array with a single linear pass ($O(N)$ time).',
      hint: 'Initialize min and max to arr[0], then iterate from index 1 updating both.',
      solutionCode: `public class Main {
    public static void findMinMax(int[] arr) {
        if (arr == null || arr.length == 0) return;
        int min = arr[0];
        int max = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            if (arr[i] > max) max = arr[i];
        }

        System.out.println("Min: " + min + ", Max: " + max);
    }

    public static void main(String[] args) {
        int[] numbers = { 34, -5, 12, 89, 0, -18, 55 };
        findMinMax(numbers);
    }
}`,
      output: 'Min: -18, Max: 89',
      explanation: 'Finding both extremum values requires only $2(N - 1)$ comparisons in a single pass ($O(N)$ time) and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-15-2-ex7',
      title: 'Multi-Dimensional Matrix Linear Search',
      problemStatement: 'Write a method `searchMatrix(int[][] matrix, int target)` that scans a 2D matrix row by row and returns the coordinates `[row, col]` of the target.',
      hint: 'Use nested loops: outer loop iterates through rows, inner loop through columns.',
      solutionCode: `public class Main {
    public static int[] searchMatrix(int[][] matrix, int target) {
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    return new int[] { r, c };
                }
            }
        }
        return new int[] { -1, -1 };
    }

    public static void main(String[] args) {
        int[][] grid = {
            { 1, 4, 7 },
            { 11, 15, 19 },
            { 22, 26, 30 }
        };
        int[] coords = searchMatrix(grid, 15);
        System.out.println("Target 15 found at: row=" + coords[0] + ", col=" + coords[1]);
    }
}`,
      output: 'Target 15 found at: row=1, col=1',
      explanation: 'A 2D array linear scan visits up to $R \\times C$ cells. For an unsorted matrix, worst-case time is $O(R \\times C)$ and auxiliary space is $O(1)$.'
    },
    {
      id: 'dsa-15-2-ex8',
      title: 'Linear Character Search in String',
      problemStatement: 'Write a method `firstNonRepeatedChar(String s)` that finds the first non-repeated character in a string using linear scanning.',
      hint: 'Count frequencies using an int[256] array in pass 1, then scan string again in pass 2 to find the first character with count == 1.',
      solutionCode: `public class Main {
    public static char firstNonRepeatedChar(String s) {
        int[] freq = new int[256];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i)]++;
        }
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i)] == 1) {
                return s.charAt(i);
            }
        }
        return '\\0';
    }

    public static void main(String[] args) {
        String input = "swiss";
        System.out.println("First non-repeated char in 'swiss': " + firstNonRepeatedChar(input));
    }
}`,
      output: "First non-repeated char in 'swiss': w",
      explanation: 'Two consecutive linear passes: Pass 1 populates the frequency table in $O(N)$ time. Pass 2 scans the string to find the first character with frequency 1. Total time: $O(N)$, space: $O(1)$ constant 256-int buffer.'
    },
    {
      id: 'dsa-15-2-ex9',
      title: 'Collect All Matching Indices via Linear Scan',
      problemStatement: 'Write a method `findAllIndices(int[] arr, int target)` that returns an array of all indices where `target` appears.',
      hint: 'First count matches in pass 1, allocate int[count], then copy matching indices in pass 2.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] findAllIndices(int[] arr, int target) {
        int count = 0;
        for (int x : arr) if (x == target) count++;

        int[] result = new int[count];
        int idx = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                result[idx++] = i;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] numbers = { 5, 2, 5, 8, 5, 9, 1 };
        int[] matches = findAllIndices(numbers, 5);
        System.out.println("Indices of 5: " + Arrays.toString(matches));
    }
}`,
      output: 'Indices of 5: [0, 2, 4]',
      explanation: 'Using two linear passes allows allocating an exact-sized primitive array without boxing overhead or resizing penalties. Time complexity is $O(2N) = O(N)$.'
    },
    {
      id: 'dsa-15-2-ex10',
      title: 'Find Missing Number from 1 to N',
      problemStatement: 'An array of size $N - 1$ contains distinct numbers from $1$ to $N$. Find the missing number in $O(N)$ time and $O(1)$ space using Gauss\'s summation formula.',
      hint: 'Expected sum is N * (N + 1) / 2. Subtract each array element from the expected sum.',
      solutionCode: `public class Main {
    public static int findMissing(int[] arr, int n) {
        long expectedSum = (long) n * (n + 1) / 2;
        long actualSum = 0;
        for (int val : arr) {
            actualSum += val;
        }
        return (int) (expectedSum - actualSum);
    }

    public static void main(String[] args) {
        int[] nums = { 1, 2, 4, 6, 3, 7, 8 }; // Missing 5 (N=8)
        System.out.println("Missing number: " + findMissing(nums, 8));
    }
}`,
      output: 'Missing number: 5',
      explanation: 'Expected sum for $1..8$ is $8 \\times 9 / 2 = 36$. Summing the elements in a single $O(N)$ pass gives 31. The difference $36 - 31 = 5$ gives the missing number in $O(1)$ auxiliary space.'
    }
  ],

  // ── LESSON 15.3: Binary Search: Midpoint Overflow, Bounds & Invariants ─
  'binary-search-bounds-and-invariants': [
    {
      id: 'dsa-15-3-ex1',
      title: 'Overflow-Safe Iterative Binary Search',
      problemStatement: 'Implement standard iterative binary search with the overflow-safe midpoint calculation `mid = low + ((high - low) >>> 1)`. Search for 44 in a sorted 7-element array.',
      hint: 'Avoid (low + high) / 2 because for large indices near Integer.MAX_VALUE it wraps to negative.',
      solutionCode: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + ((high - low) >>> 1); // Overflow-safe!

            if (arr[mid] == target) {
                return mid; // Found
            } else if (arr[mid] < target) {
                low = mid + 1; // Search right half
            } else {
                high = mid - 1; // Search left half
            }
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] sorted = { 3, 9, 14, 28, 44, 67, 89 };
        System.out.println("Index of 44: " + binarySearch(sorted, 44));
    }
}`,
      output: 'Index of 44: 4',
      explanation: 'In each step, the search window $[low, high]$ is cut in half. Finding 44 requires $\\log_2(7) \\approx 3$ comparisons. Using unsigned shift `>>> 1` guarantees prevention of integer overflow.'
    },
    {
      id: 'dsa-15-3-ex2',
      title: 'Recursive Binary Search with Midpoint Shift',
      problemStatement: 'Implement binary search recursively. Trace the low, mid, and high values during the recursion searching for 50.',
      hint: 'Base case: low > high returns -1. Recursive case checks mid, then recurses on [low, mid - 1] or [mid + 1, high].',
      solutionCode: `public class Main {
    public static int binarySearchRec(int[] arr, int low, int high, int target) {
        if (low > high) return -1;

        int mid = low + ((high - low) >>> 1);
        System.out.println("low=" + low + ", mid=" + mid + " (val=" + arr[mid] + "), high=" + high);

        if (arr[mid] == target) return mid;
        if (arr[mid] < target) return binarySearchRec(arr, mid + 1, high, target);
        return binarySearchRec(arr, low, mid - 1, target);
    }

    public static void main(String[] args) {
        int[] sorted = { 10, 20, 30, 40, 50, 60, 70 };
        int idx = binarySearchRec(sorted, 0, sorted.length - 1, 50);
        System.out.println("Found at index: " + idx);
    }
}`,
      output: `low=0, mid=3 (val=40), high=6
low=4, mid=5 (val=60), high=6
low=4, mid=4 (val=50), high=4
Found at index: 4`,
      explanation: 'The call stack grows by at most $O(\\log N)$ frames. In iteration 1, mid is 3 (val 40). Since $40 < 50$, search shifts to right half. In iteration 2, mid is 5 (val 60). Search shifts left to index 4, finding 50.'
    },
    {
      id: 'dsa-15-3-ex3',
      title: 'Lower Bound Binary Search (First Element $\\ge$ Target)',
      problemStatement: 'Implement `lowerBound(int[] arr, int target)` that returns the index of the first element greater than or equal to target. Test with target 20 on an array with duplicates.',
      hint: 'When arr[mid] >= target, high = mid (keep mid in search space). When arr[mid] < target, low = mid + 1. Loop while low < high.',
      solutionCode: `public class Main {
    public static int lowerBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = low + ((high - low) >>> 1);
            if (arr[mid] >= target) {
                high = mid; // Candidate found, check left for earlier occurrence
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        int[] data = { 5, 10, 20, 20, 20, 30, 40 };
        System.out.println("Lower bound of 20: index " + lowerBound(data, 20));
    }
}`,
      output: 'Lower bound of 20: index 2',
      explanation: 'Lower bound returns the first position where the element is at least target. Even though index 3 and 4 also equal 20, the search continues left to identify index 2.'
    },
    {
      id: 'dsa-15-3-ex4',
      title: 'Upper Bound Binary Search (First Element $>$ Target)',
      problemStatement: 'Implement `upperBound(int[] arr, int target)` that returns the index of the first element strictly greater than target.',
      hint: 'When arr[mid] > target, high = mid. When arr[mid] <= target, low = mid + 1. Loop while low < high.',
      solutionCode: `public class Main {
    public static int upperBound(int[] arr, int target) {
        int low = 0, high = arr.length;
        while (low < high) {
            int mid = low + ((high - low) >>> 1);
            if (arr[mid] > target) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }

    public static void main(String[] args) {
        int[] data = { 5, 10, 20, 20, 20, 30, 40 };
        System.out.println("Upper bound of 20: index " + upperBound(data, 20));
    }
}`,
      output: 'Upper bound of 20: index 5',
      explanation: 'The first element strictly greater than 20 is 30 at index 5. The range $[\\text{lowerBound}, \\text{upperBound})$ gives all occurrences of 20 (indices 2, 3, 4: length = $5 - 2 = 3$).'
    },
    {
      id: 'dsa-15-3-ex5',
      title: 'Search Insert Position',
      problemStatement: 'Given a sorted array of distinct integers and a target value, return the index if target is found. If not, return the index where it would be inserted in order.',
      hint: 'When standard binary search terminates without finding the target, the variable low points to the exact insertion index.',
      solutionCode: `public class Main {
    public static int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + ((high - low) >>> 1);
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return low; // low is the insertion position!
    }

    public static void main(String[] args) {
        int[] nums = { 1, 3, 5, 6 };
        System.out.println("Insert 5 at: " + searchInsert(nums, 5));
        System.out.println("Insert 2 at: " + searchInsert(nums, 2));
        System.out.println("Insert 7 at: " + searchInsert(nums, 7));
    }
}`,
      output: `Insert 5 at: 2
Insert 2 at: 1
Insert 7 at: 4`,
      explanation: 'When target is not found, `high` falls behind `low`, and `low` marks the insertion point. This is also how `Arrays.binarySearch` computes `-(insertionPoint + 1)`.'
    },
    {
      id: 'dsa-15-3-ex6',
      title: 'Find First and Last Position in Sorted Array',
      problemStatement: 'Given a sorted array with duplicates, write a method `searchRange(int[] nums, int target)` that returns `[firstIndex, lastIndex]` in $O(\\log N)$ time.',
      hint: 'Run binary search twice: once finding the leftmost occurrence (high = mid - 1 on match) and once finding the rightmost (low = mid + 1 on match).',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int findBound(int[] nums, int target, boolean isFirst) {
        int low = 0, high = nums.length - 1;
        int result = -1;
        while (low <= high) {
            int mid = low + ((high - low) >>> 1);
            if (nums[mid] == target) {
                result = mid;
                if (isFirst) high = mid - 1; // Keep searching left
                else low = mid + 1;          // Keep searching right
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = { 5, 7, 7, 8, 8, 10 };
        int first = findBound(nums, 8, true);
        int last = findBound(nums, 8, false);
        System.out.println("Range for 8: " + Arrays.toString(new int[] { first, last }));
    }
}`,
      output: 'Range for 8: [3, 4]',
      explanation: 'By running two specialized binary searches, both the first index (3) and last index (4) are found in $2 \\times O(\\log N) = O(\\log N)$ time, avoiding an $O(N)$ linear expansion.'
    },
    {
      id: 'dsa-15-3-ex7',
      title: 'Integer Square Root via Binary Search ($O(\\log N)$)',
      problemStatement: 'Compute the integer square root $\\lfloor \\sqrt{x} \\rfloor$ for non-negative integer $x$ in $O(\\log x)$ time without using `Math.sqrt`. Test with x = 27.',
      hint: 'Search space is [1, x]. Test mid * mid <= x using division (mid <= x / mid) to prevent 32-bit overflow.',
      solutionCode: `public class Main {
    public static int mySqrt(int x) {
        if (x < 2) return x;
        int low = 1, high = x / 2;
        int ans = 1;

        while (low <= high) {
            int mid = low + ((high - low) >>> 1);
            if (mid <= x / mid) { // Safe from mid * mid overflow!
                ans = mid;
                low = mid + 1; // Try larger
            } else {
                high = mid - 1; // Too big
            }
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println("sqrt(27) = " + mySqrt(27));
        System.out.println("sqrt(36) = " + mySqrt(36));
    }
}`,
      output: `sqrt(27) = 5
sqrt(36) = 6`,
      explanation: 'Binary search on answer space: for 27, candidates converge on 5 because $5 \\times 5 = 25 \\le 27$ and $6 \\times 6 = 36 > 27$. Time complexity is $O(\\log x)$, space $O(1)$.'
    },
    {
      id: 'dsa-15-3-ex8',
      title: 'Find Peak Element in Mountain Array',
      problemStatement: 'An array contains numbers strictly increasing to a peak and then strictly decreasing. Find the index of the peak element in $O(\\log N)$ time.',
      hint: 'If arr[mid] < arr[mid + 1], peak is in right half (low = mid + 1). Else peak is at mid or in left half (high = mid).',
      solutionCode: `public class Main {
    public static int findPeak(int[] arr) {
        int low = 0, high = arr.length - 1;
        while (low < high) {
            int mid = low + ((high - low) >>> 1);
            if (arr[mid] < arr[mid + 1]) {
                low = mid + 1; // Ascending slope, peak to the right
            } else {
                high = mid; // Descending slope, peak at mid or to the left
            }
        }
        return low;
    }

    public static void main(String[] args) {
        int[] mountain = { 1, 3, 8, 12, 4, 2 };
        int peakIdx = findPeak(mountain);
        System.out.println("Peak value " + mountain[peakIdx] + " at index " + peakIdx);
    }
}`,
      output: 'Peak value 12 at index 3',
      explanation: 'The slope test `arr[mid] < arr[mid + 1]` determines whether we are climbing or descending. Binary search eliminates half the mountain in each step, finding the peak in $O(\\log N)$ time.'
    },
    {
      id: 'dsa-15-3-ex9',
      title: 'Search in Rotated Sorted Array',
      problemStatement: 'An ascending array is rotated at an unknown pivot (e.g. `[4, 5, 6, 7, 0, 1, 2]`). Find the index of target 0 in $O(\\log N)$ time.',
      hint: 'At least one half [low..mid] or [mid..high] is always normally sorted. Check if target lies within the sorted half; if not, search the other half.',
      solutionCode: `public class Main {
    public static int searchRotated(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + ((high - low) >>> 1);
            if (nums[mid] == target) return mid;

            // Left half is normally sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else { // Right half is normally sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] rotated = { 4, 5, 6, 7, 0, 1, 2 };
        System.out.println("Index of 0: " + searchRotated(rotated, 0));
    }
}`,
      output: 'Index of 0: 4',
      explanation: 'Because a rotated sorted array always contains at least one completely sorted half, checking boundary conditions against the sorted half maintains the $O(\\log N)$ binary search invariant.'
    },
    {
      id: 'dsa-15-3-ex10',
      title: 'Find Minimum in Rotated Sorted Array',
      problemStatement: 'Find the minimum element in a rotated sorted array with distinct values in $O(\\log N)$ time.',
      hint: 'Compare arr[mid] with arr[high]. If arr[mid] > arr[high], minimum must be in right half (low = mid + 1). Otherwise high = mid.',
      solutionCode: `public class Main {
    public static int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        while (low < high) {
            int mid = low + ((high - low) >>> 1);
            if (nums[mid] > nums[high]) {
                low = mid + 1; // Inflection point lies in right half
            } else {
                high = mid;    // Minimum is at mid or in left half
            }
        }
        return nums[low];
    }

    public static void main(String[] args) {
        int[] nums = { 3, 4, 5, 1, 2 };
        System.out.println("Minimum element: " + findMin(nums));
    }
}`,
      output: 'Minimum element: 1',
      explanation: 'If `nums[mid] > nums[high]`, the array rotated through the right subarray, so the minimum must lie strictly to the right of `mid`. When `low == high`, the minimum element (1) is isolated in $O(\\log N)$ time.'
    }
  ],

  // ── LESSON 15.4: Divide-and-Conquer Sorting: Merge Sort vs Quick Sort vs TimSort ─
  'merge-quick-timsort-internals': [
    {
      id: 'dsa-15-4-ex1',
      title: 'Merge Two Sorted Arrays ($O(N + M)$)',
      problemStatement: 'Write a method `mergeSorted(int[] a, int[] b)` that takes two pre-sorted arrays and merges them into a single sorted array in $O(N + M)$ linear time.',
      hint: 'Use two pointers i and j comparing a[i] and b[j], copying the smaller element into result array.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] mergeSorted(int[] a, int[] b) {
        int[] res = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;

        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) res[k++] = a[i++];
            else res[k++] = b[j++];
        }
        while (i < a.length) res[k++] = a[i++];
        while (j < b.length) res[k++] = b[j++];
        return res;
    }

    public static void main(String[] args) {
        int[] a = { 1, 3, 5, 7 };
        int[] b = { 2, 4, 6, 8, 10 };
        System.out.println("Merged: " + Arrays.toString(mergeSorted(a, b)));
    }
}`,
      output: 'Merged: [1, 2, 3, 4, 5, 6, 7, 8, 10]',
      explanation: 'Each element from both arrays is examined exactly once. Total time is $O(N + M)$ and auxiliary space is $O(N + M)$. This merge subroutine forms the backbone of Merge Sort.'
    },
    {
      id: 'dsa-15-4-ex2',
      title: 'Merge Sort Recursive Implementation',
      problemStatement: 'Implement the full recursive Merge Sort algorithm. Sort an unsorted array of 8 integers and print the sorted array.',
      hint: 'Recursively split array into left and right halves until size == 1, then merge back up.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;

        int mid = left + ((right - left) >>> 1);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];

        System.arraycopy(temp, 0, arr, left, temp.length);
    }

    public static void main(String[] args) {
        int[] nums = { 38, 27, 43, 3, 9, 82, 10, 19 };
        mergeSort(nums, 0, nums.length - 1);
        System.out.println("Merge sorted: " + Arrays.toString(nums));
    }
}`,
      output: 'Merge sorted: [3, 9, 10, 19, 27, 38, 43, 82]',
      explanation: 'Merge sort splits the array into $\\log_2 N$ recursive levels. At each level, merging takes $O(N)$ operations. Total time is guaranteed $O(N \\log N)$ in best, average, and worst cases, using $O(N)$ auxiliary space.'
    },
    {
      id: 'dsa-15-4-ex3',
      title: 'Lomuto Partition Scheme for Quick Sort',
      problemStatement: 'Implement Lomuto partitioning using the last element as pivot. Show the partitioned array and the returned pivot index for `{ 10, 80, 30, 90, 40, 50, 70 }`.',
      hint: 'Maintain pointer i at boundary of elements smaller than pivot. Iterate j from low to high - 1. When arr[j] < pivot, increment i and swap arr[i] with arr[j]. Finally swap arr[i + 1] with arr[high].',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int lomutoPartition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
    }

    public static void main(String[] args) {
        int[] nums = { 10, 80, 30, 90, 40, 50, 70 };
        int pIdx = lomutoPartition(nums, 0, nums.length - 1);
        System.out.println("Pivot 70 at index: " + pIdx + ", Array: " + Arrays.toString(nums));
    }
}`,
      output: 'Pivot 70 at index: 4, Array: [10, 30, 40, 50, 70, 90, 80]',
      explanation: 'Lomuto partition places all elements $\\le 70$ (10, 30, 40, 50) to the left of index 4, and all elements $> 70$ (90, 80) to the right. It runs in $O(N)$ time and $O(1)$ space.'
    },
    {
      id: 'dsa-15-4-ex4',
      title: 'Full Quick Sort Implementation',
      problemStatement: 'Combine partitioning with recursive divide-and-conquer to build an in-place Quick Sort algorithm.',
      hint: 'Partition the array to find pivot index p, then recursively quicksort left subarray [low, p - 1] and right subarray [p + 1, high].',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int p = partition(arr, low, high);
            quickSort(arr, low, p - 1);
            quickSort(arr, p + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
        }
        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] nums = { 64, 25, 12, 22, 11 };
        quickSort(nums, 0, nums.length - 1);
        System.out.println("Quick sorted: " + Arrays.toString(nums));
    }
}`,
      output: 'Quick sorted: [11, 12, 22, 25, 64]',
      explanation: 'Quick sort sorts in-place with average time $O(N \\log N)$ and $O(\\log N)$ call stack space. It avoids the $O(N)$ extra memory allocation required by Merge Sort.'
    },
    {
      id: 'dsa-15-4-ex5',
      title: 'Dutch National Flag 3-Way Partitioning (0s, 1s, 2s)',
      problemStatement: 'Given an array containing only values 0, 1, and 2, sort them in a single pass ($O(N)$ time, $O(1)$ space) using Dijkstra\'s 3-way partitioning algorithm.',
      hint: 'Use three pointers: low, mid, high. Swap 0s to low, 2s to high, and leave 1s in the middle.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
                high--;
            }
        }
    }

    public static void main(String[] args) {
        int[] colors = { 2, 0, 2, 1, 1, 0 };
        sortColors(colors);
        System.out.println("3-Way Partitioned: " + Arrays.toString(colors));
    }
}`,
      output: '3-Way Partitioned: [0, 0, 1, 1, 2, 2]',
      explanation: '3-way partitioning segregates elements into three zones: $< 1$ (zone 0), $== 1$ (zone 1), and $> 1$ (zone 2) in a single pass of $O(N)$ comparisons and $O(1)$ space. This solves QuickSort\'s duplicate keys degradation.'
    },
    {
      id: 'dsa-15-4-ex6',
      title: 'Sorting Stability Verification',
      problemStatement: 'Demonstrate that Merge Sort is a STABLE sort by sorting objects with identical keys and proving their original relative order is preserved.',
      hint: 'In merge step, use <= (arr[i].key <= arr[j].key) so left elements take precedence on equal keys.',
      solutionCode: `class Student {
    String name;
    int score;
    Student(String name, int score) { this.name = name; this.score = score; }
    public String toString() { return name + ":" + score; }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Alice", 90),
            new Student("Bob", 85),
            new Student("Charlie", 90),
            new Student("Dave", 85)
        };

        // Stable sort by score ascending
        java.util.Arrays.sort(students, (s1, s2) -> Integer.compare(s1.score, s2.score));

        for (Student s : students) {
            System.out.print(s + " ");
        }
        System.out.println();
    }
}`,
      output: 'Bob:85 Dave:85 Alice:90 Charlie:90 ',
      explanation: 'Notice that "Bob" preceded "Dave" in the original array and still precedes Dave after sorting. "Alice" also precedes "Charlie". Java\'s `Arrays.sort(Object[])` uses TimSort, which is guaranteed stable.'
    },
    {
      id: 'dsa-15-4-ex7',
      title: 'Insertion Sort for Small Run Arrays (TimSort Foundation)',
      problemStatement: 'Implement Insertion Sort. Explain why TimSort falls back to binary insertion sort for small subarrays ($N \\le 32$).',
      hint: 'Iterate i from 1 to n-1. Slide element arr[i] backwards into its correct position among already-sorted elements 0..i-1.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

    public static void main(String[] args) {
        int[] nums = { 12, 11, 13, 5, 6 };
        insertionSort(nums);
        System.out.println("Insertion sorted: " + Arrays.toString(nums));
    }
}`,
      output: 'Insertion sorted: [5, 6, 11, 12, 13]',
      explanation: 'For small arrays ($N \\le 32$), insertion sort outperforms $O(N \\log N)$ algorithms because it has zero recursion overhead, excellent CPU L1/L2 cache locality, and runs in $O(N)$ for nearly-sorted data.'
    },
    {
      id: 'dsa-15-4-ex8',
      title: 'Hoare Partition Scheme Comparison',
      problemStatement: 'Implement Hoare\'s partition scheme using two converging pointers and compare the number of swaps against Lomuto partition.',
      hint: 'Start i at low - 1, j at high + 1. Move i right while arr[i] < pivot, move j left while arr[j] > pivot. If i >= j return j, else swap.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int hoarePartition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low - 1;
        int j = high + 1;

        while (true) {
            do { i++; } while (arr[i] < pivot);
            do { j--; } while (arr[j] > pivot);
            if (i >= j) return j;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }

    public static void main(String[] args) {
        int[] nums = { 5, 2, 9, 3, 7, 6, 1, 8 };
        int p = hoarePartition(nums, 0, nums.length - 1);
        System.out.println("Hoare split index: " + p + ", Array: " + Arrays.toString(nums));
    }
}`,
      output: 'Hoare split index: 3, Array: [1, 2, 3, 9, 7, 6, 5, 8]',
      explanation: 'Hoare partition does on average 3 times fewer swaps than Lomuto partition because pointers converge from both ends rather than scanning sequentially.'
    },
    {
      id: 'dsa-15-4-ex9',
      title: 'QuickSelect: Kth Smallest Element ($O(N)$ Average)',
      problemStatement: 'Use QuickSelect (partitioning without recursing into both halves) to find the 3rd smallest element in an unsorted array in $O(N)$ average time.',
      hint: 'If pivot index p == k, return arr[p]. If p > k, search left subarray. If p < k, search right subarray.',
      solutionCode: `public class Main {
    public static int quickSelect(int[] arr, int low, int high, int k) {
        if (low <= high) {
            int p = partition(arr, low, high);
            if (p == k) return arr[p];
            if (p > k) return quickSelect(arr, low, p - 1, k);
            return quickSelect(arr, p + 1, high, k);
        }
        return -1;
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            }
        }
        int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] nums = { 7, 10, 4, 3, 20, 15 };
        int k = 2; // 0-indexed: 3rd smallest
        int val = quickSelect(nums, 0, nums.length - 1, k);
        System.out.println("3rd smallest element: " + val);
    }
}`,
      output: '3rd smallest element: 7',
      explanation: 'By discarding half the array after each partition step, recurrence is $T(N) = T(N/2) + O(N) = O(N)$ average time, far superior to sorting the whole array in $O(N \\log N)$.'
    },
    {
      id: 'dsa-15-4-ex10',
      title: 'Counting Inversions via Merge Sort ($O(N \\log N)$)',
      problemStatement: 'Count the number of inversions in an array (pairs where `i < j` but `arr[i] > arr[j]`) by augmenting Merge Sort. Test with `{ 8, 4, 2, 1 }`.',
      hint: 'When merging, if left element arr[i] > right element arr[j], then all remaining elements in left half (mid - i + 1) form inversions with arr[j].',
      solutionCode: `public class Main {
    public static int countInversions(int[] arr, int left, int right) {
        int count = 0;
        if (left < right) {
            int mid = left + ((right - left) >>> 1);
            count += countInversions(arr, left, mid);
            count += countInversions(arr, mid + 1, right);
            count += mergeAndCount(arr, left, mid, right);
        }
        return count;
    }

    private static int mergeAndCount(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0, inv = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
                inv += (mid - i + 1); // Crucial inversion counting!
            }
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
        return inv;
    }

    public static void main(String[] args) {
        int[] nums = { 8, 4, 2, 1 };
        int inversions = countInversions(nums, 0, nums.length - 1);
        System.out.println("Total inversions: " + inversions);
    }
}`,
      output: 'Total inversions: 6',
      explanation: 'In reverse-sorted array [8, 4, 2, 1], every pair is inverted: $(8,4), (8,2), (8,1), (4,2), (4,1), (2,1)$ for a total of 6 inversions. Merge Sort computes this in $O(N \\log N)$ time, avoiding an $O(N^2)$ brute force loop.'
    }
  ]
};
