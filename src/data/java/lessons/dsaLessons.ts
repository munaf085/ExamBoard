// ============================================================
// JAVA DSA LESSONS (Modules 14 - 16)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const DSA_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 14: DSA Foundations & Searching/Sorting ─────────
  'java-dsa-foundations': {
    intro: 'Data Structures and Algorithms (DSA) form the foundation of efficient software engineering and technical problem solving. Understanding asymptotic analysis (Big O notation), searching algorithms, and sorting algorithms is required for all developer interviews.',
    keyConcepts: [
      { term: 'Big O Notation', definition: 'Mathematical notation describing the limiting behavior of an algorithm execution time or memory space as input size n increases towards infinity.', example: 'O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)' },
      { term: 'Linear Search', definition: 'Sequential inspection of each element from index 0 to n-1. Works on unsorted data. Time: O(n), Space: O(1).', example: 'for (int i = 0; i < arr.length; i++) if (arr[i] == target) return i;' },
      { term: 'Binary Search', definition: 'Divide-and-conquer search on a SORTED array. Halves search interval in each step. Time: O(log n), Space: O(1).', example: 'mid = left + (right - left) / 2;' },
      { term: 'Bubble & Insertion Sort', definition: 'Simple comparison sorts with O(n^2) average and worst-case time complexity. Stable sorts with O(1) space.' },
      { term: 'Merge Sort', definition: 'Divide-and-conquer recursive sort. Guarantees O(n log n) time in all cases. Requires O(n) auxiliary space. Stable.' },
      { term: 'Quick Sort', definition: 'Pivot-based partitioning sort. Average time O(n log n), worst-case O(n^2). In-place O(log n) space. Unstable.' },
    ],
    codeExamples: [
      {
        title: 'Binary Search Implementation in Java',
        code: `public class BinarySearchDemo {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            // Avoid integer overflow vs (left + right) / 2
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid; // Found!
            if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return -1; // Not found
    }

    public static void main(String[] args) {
        int[] sortedData = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int target = 23;
        int index = binarySearch(sortedData, target);
        System.out.println("Found " + target + " at index: " + index);
    }
}`,
        output: 'Found 23 at index: 5'
      }
    ],
    commonMistakes: [
      'Calculating midpoint with (left + right) / 2 which can cause integer overflow for large arrays. Use left + (right - left) / 2.',
      'Applying binary search on an unsorted array, returning invalid results.',
    ],
    interviewTips: [
      '"Which sort does Arrays.sort() use in Java?" -> For primitives, Dual-Pivot Quicksort (O(n log n) average, in-place). For Objects, TimSort (adaptive, stable merge sort, O(n log n) worst-case).',
    ],
    interviewQuestions: [
      { q: 'Why is Binary Search O(log n) and when can you use it?', a: 'Because the algorithm cuts the remaining search space in half at each iteration. It requires the data structure to provide O(1) random access (like an array) and the elements must be in sorted order.' },
    ],
    revisionPoints: [
      'Binary Search: O(log n) time, requires sorted array',
      'Midpoint overflow fix: left + (right - left) / 2',
      'Merge Sort: O(n log n) guaranteed, O(n) space, stable',
      'Java uses TimSort for objects, Dual-Pivot Quicksort for primitives',
    ]
  },

  // ── MODULE 15: Stacks, Queues & Linked Lists ────────────────
  'java-dsa-stacks-queues': {
    intro: 'Linear data structures store elements sequentially. Linked Lists store nodes with pointers allowing dynamic resizing; Stacks follow LIFO (Last-In-First-Out); Queues follow FIFO (First-In-First-Out).',
    keyConcepts: [
      { term: 'Singly Linked List', definition: 'Sequence of nodes where each node contains data and a "next" pointer. O(1) prepend, O(n) random access.', example: 'class Node { int val; Node next; }' },
      { term: 'Doubly Linked List', definition: 'Nodes contain "prev" and "next" pointers. Allows bidirectional traversal. Used by Java\'s LinkedList.', example: 'Node prev, next;' },
      { term: 'Stack (LIFO)', definition: 'Last-In, First-Out structure. Operations: push() O(1), pop() O(1), peek() O(1). In Java, prefer ArrayDeque over legacy Stack class.', example: 'Deque<Integer> stack = new ArrayDeque<>();' },
      { term: 'Queue (FIFO)', definition: 'First-In, First-Out structure. Operations: offer()/add() O(1), poll()/remove() O(1), peek() O(1).', example: 'Queue<String> q = new LinkedList<>();' },
      { term: 'Deque (Double-Ended Queue)', definition: 'Allows insertion and removal from both ends. Can function as both Stack and Queue.', example: 'ArrayDeque' },
    ],
    codeExamples: [
      {
        title: 'Valid Parentheses Matching Using Stack',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) {
                return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("({[]}) is valid: " + isValid("({[]})"));
        System.out.println("([)] is valid: " + isValid("([)]"));
    }
}`,
        output: `({[]}) is valid: true
([)] is valid: false`
      }
    ],
    commonMistakes: [
      'Using the legacy java.util.Stack class (which extends Vector and incurs synchronization overhead) instead of modern ArrayDeque.',
      'Losing reference to the head of a linked list during pointer updates.',
    ],
    interviewTips: [
      'Use Floyd\'s Cycle-Finding Algorithm (Tortoise and Hare with slow and fast pointers) to detect cycles in linked lists in O(n) time and O(1) space.',
    ],
    interviewQuestions: [
      { q: 'How do you reverse a singly linked list iteratively?', a: 'Initialize three pointers: prev = null, curr = head, next = null. Iterate while curr != null: next = curr.next; curr.next = prev; prev = curr; curr = next. At the end, return prev as the new head.' },
    ],
    revisionPoints: [
      'Stack is LIFO; Queue is FIFO',
      'Use ArrayDeque instead of legacy Stack class in Java',
      'Detect linked list cycles using Floyd\'s two pointers (slow/fast)',
    ]
  },

  // ── MODULE 16: Two Pointers, Sliding Window & Recursion ─────
  'java-dsa-patterns': {
    intro: 'Mastering algorithm design patterns like Two Pointers, Sliding Window, and Backtracking allows developers to solve complex technical problems with optimal time and space complexity.',
    keyConcepts: [
      { term: 'Two Pointers Pattern', definition: 'Using two index pointers to traverse data. Converging (left=0, right=n-1) or Same Direction (fast/slow).', example: 'Two Sum on sorted array, Palindrome check' },
      { term: 'Sliding Window', definition: 'Maintains a sub-segment (window) of an array or string that expands or shrinks to find optimal contiguous subarrays in O(n) time instead of O(n^2).', example: 'Maximum sum subarray of size k' },
      { term: 'Prefix Sums', definition: 'Precomputing cumulative sums array allowing O(1) range sum queries: sum(i, j) = prefix[j] - prefix[i - 1].', example: 'prefix[i] = prefix[i-1] + arr[i]' },
      { term: 'Backtracking', definition: 'Systematic depth-first search that explores paths and abandons (backtracks) when constraints are violated.', example: 'Subsets, Permutations, N-Queens' },
    ],
    codeExamples: [
      {
        title: 'Two Sum on Sorted Array (Two Pointers)',
        code: `public class TwoSumSorted {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;

        while (left < right) {
            int currentSum = numbers[left] + numbers[right];
            if (currentSum == target) {
                return new int[]{left, right}; // 0-indexed
            } else if (currentSum < target) {
                left++; // Need larger sum
            } else {
                right--; // Need smaller sum
            }
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] arr = {2, 7, 11, 15};
        int target = 9;
        int[] indices = twoSum(arr, target);
        System.out.println("Pair indices: [" + indices[0] + ", " + indices[1] + "]");
    }
}`,
        output: 'Pair indices: [0, 1]'
      }
    ],
    commonMistakes: [
      'Using brute-force nested loops O(n^2) when Sliding Window or Two Pointers can achieve O(n).',
      'Forgetting to reset state when returning in recursive backtracking.',
    ],
    interviewTips: [
      '"When to use Sliding Window?" -> Whenever the problem asks for contiguous subarrays/substrings meeting a condition (e.g. longest substring without repeating characters).',
    ],
    interviewQuestions: [
      { q: 'How does Sliding Window optimize from O(n^2) to O(n)?', a: 'Instead of recalculating the entire window from scratch for every starting index (which takes O(k * n)), Sliding Window adjusts the running state by adding the incoming element at the right and subtracting the outgoing element at the left in O(1) per step.' },
    ],
    revisionPoints: [
      'Two Pointers: O(n) for pair searches and reversals',
      'Sliding Window: O(n) for contiguous subarray/substring optimization',
      'Prefix Sum: O(1) range sum queries after O(n) pre-computation',
    ]
  },
};
