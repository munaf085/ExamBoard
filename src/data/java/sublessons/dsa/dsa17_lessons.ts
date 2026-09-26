import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 17: TWO POINTERS & SLIDING WINDOW (LESSONS 17.1 - 17.4)
// Authoritative FAANG-Standard DSA Core Curriculum
// ============================================================

export const dsa17Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 17.1: Two Pointers: Converging Left-Right Pointers
  // ─────────────────────────────────────────────────────────────
  'two-pointers-converging': {
    id: 'two-pointers-converging',
    moduleId: 'java-dsa-patterns',
    moduleTitle: '17. Two Pointers & Sliding Window',
    lessonNumber: 'Lesson 17.1',
    title: 'Two Pointers: Converging Left-Right Pointers',
    subtitle: 'Opposite-direction pointer convergence, monotonic search space elimination, Two Sum II, Container With Most Water, 3Sum reduction, and Trapping Rain Water',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Imagine two detectives searching a sorted suspects line from opposite ends. One starts at the very shortest suspect on the left, and the other starts at the tallest on the right. If the sum of their heights is too low for their target description, the left detective moves rightward to someone taller. If the sum is too high, the right detective moves leftward to someone shorter. Because the lineup is ordered, neither detective ever needs to step backward! Every single step permanently cuts the remaining suspect pool without brute-force checking every combination.',
    interviewTakeaways: [
      'Monotonic Invariant: Converging two pointers require an ordered search space or monotonic property. If `sum < target`, incrementing `left` is the ONLY move that can increase the sum; decrementing `right` can never help.',
      'Time Complexity Reduction: Converging pointers drop search complexity from $O(N^2)$ to $O(N)$ for pair searches, and from $O(N^3)$ to $O(N^2)$ for 3Sum triplets.',
      'Container With Most Water Greedy Proof: Area is `(right - left) * min(h[left], h[right])`. Moving the taller boundary decreases width while height remains bounded by the shorter line, guaranteeing area strictly shrinks or stays same. Thus, moving the shorter line is the ONLY step with any chance of discovering a larger area.',
      'Trapping Rain Water Optimization: Tracking `leftMax` and `rightMax` with converging pointers eliminates $O(N)$ prefix/suffix arrays, trapping water in $O(1)$ auxiliary space.',
      'Duplicate Pruning in 3Sum: After sorting, advance pointer past duplicate values (`while (left < right && nums[left] == nums[left + 1]) left++`) to guarantee unique triplet outputs without a HashSet overhead.',
      'Cache Line Locality: Converging pointers traverse contiguous arrays sequentially from exterior boundaries inward, benefiting from L1/L2 hardware prefetching compared to hash table lookup pointer chasing.'
    ],
    cheatSheet: {
      summary: 'Converging pointers move left and right inward on sorted or bounded arrays. Solves Two Sum II, 3Sum, Container With Most Water in O(N) or O(N^2) time with O(1) space.',
      syntaxTemplate: `// Standard Converging Two-Pointers Template
int left = 0, right = arr.length - 1;
while (left < right) {
    int current = arr[left] + arr[right];
    if (current == target) {
        // Match found
        return new int[]{left, right};
    } else if (current < target) {
        left++; // Increase sum
    } else {
        right--; // Decrease sum
    }
}`,
      rules: [
        { rule: 'Sorted Array Requirement', explanation: 'Converging sum search strictly relies on sorting. Without ordering, moving left or right produces unpredictable sum changes.' },
        { rule: 'Termination Condition', explanation: 'Use `left < right` when pairing two distinct elements; use `left <= right` when single-element boundaries are permissible.' },
        { rule: 'Always Advance Shorter Side', explanation: 'In container/elevation problems, the smaller boundary limits capacity. Advance the smaller boundary to seek improvements.' },
        { rule: 'Duplicate Skipping Invariant', explanation: 'In multi-sum problems (3Sum, 4Sum), skip identical consecutive elements on both anchor and inner pointers to ensure unique combinations.' },
        { rule: 'Avoid Integer Overflow', explanation: 'When calculating sums of large integers, cast to `long` before addition (`(long) nums[left] + nums[right]`).' }
      ],
      quickComparison: [
        { aspect: 'Two Sum (Unsorted)', optionA: 'HashMap: $O(N)$ Time, $O(N)$ Space', optionB: 'Sort + Two Pointers: $O(N \\log N)$ Time, $O(1)$ Space' },
        { aspect: 'Two Sum II (Sorted)', optionA: 'Binary Search per element: $O(N \\log N)$ Time', optionB: 'Converging Two Pointers: $O(N)$ Time, $O(1)$ Space' },
        { aspect: 'Trapping Rain Water', optionA: 'Prefix/Suffix Max Arrays: $O(N)$ Time, $O(N)$ Space', optionB: 'Two Pointers: $O(N)$ Time, $O(1)$ Space' },
        { aspect: '3Sum', optionA: 'Brute Force 3 Loops: $O(N^3)$ Time', optionB: 'Sort + Anchored Two Pointers: $O(N^2)$ Time, $O(1)$ Space' }
      ]
    },
    coreExplanation: [
      'The Two Pointers pattern replaces nested loops with two coordinated indices traversing the data structure simultaneously, typically converging from exterior bounds towards the center.',
      'In a sorted array, the sum `nums[left] + nums[right]` possesses a strict monotonic gradient: moving `left` rightward increases the sum, whereas moving `right` leftward decreases it.',
      'This monotonic guarantee enables pruning an entire row or column of the search matrix in $O(1)$ time per comparison, achieving $O(N)$ total running time instead of $O(N^2)$.',
      'For 3Sum ($A + B + C = 0$), fixing element $A$ leaves a 2Sum problem for $B + C = -A$. Sorting upfront takes $O(N \\log N)$, and $N$ two-pointer passes take $O(N^2)$ time with $O(1)$ auxiliary memory.',
      'In Container With Most Water, the width between boundaries decreases monotonically at each step (`right - left`). To maximize area, we must seek a taller boundary, which requires moving the pointer at the shorter wall.',
      'In Trapping Rain Water, the amount of water trapped at any index is bounded by `min(maxLeft, maxRight) - height[i]`. Because the smaller of `maxLeft` and `maxRight` acts as the definitive ceiling, we only need to advance the side with the lower maximum.',
      'Hardware Efficiency: Unlike hash table lookups that cause CPU L1 cache misses and object autoboxing overhead, two-pointer array traversals execute in pure primitive registers with hardware streaming prefetchers.'
    ],
    diagram: `Two Sum II Converging Search:
Sorted Array: [ 2,  7, 11, 15 ], Target = 18

Step 1:
 left                          right
   ↓                             ↓
[  2,     7,    11,    15  ]   -> Sum = 2 + 15 = 17 (< 18) -> Increment left!

Step 2:
        left                   right
          ↓                      ↓
[  2,     7,    11,    15  ]   -> Sum = 7 + 15 = 22 (> 18) -> Decrement right!

Step 3:
        left    right
          ↓       ↓
[  2,     7,    11,    15  ]   -> Sum = 7 + 11 = 18 (== 18) -> Match Found! Indices [2, 3]`,
    codeSnippet: {
      title: 'Two Sum II Converging Pointers',
      code: `public class TwoSumSorted {
    public static int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1}; // 1-indexed
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
      lineByLineExplanation: [
        { line: 'int left = 0, right = numbers.length - 1;', explanation: 'Initializes converging left and right pointers at array boundaries.' },
        { line: 'int sum = numbers[left] + numbers[right];', explanation: 'Calculates the sum of the boundary elements.' },
        { line: 'if (sum == target) return new int[]{left + 1, right + 1};', explanation: 'Returns 1-based indices on exact match.' },
        { line: 'else if (sum < target) left++;', explanation: 'Sum too small; increments left pointer to increase sum.' },
        { line: 'else right--;', explanation: 'Sum too large; decrements right pointer to decrease sum.' }
      ],
      output: 'Indices: [1, 2]'
    },
    codeExamples: [
      {
        title: 'Container With Most Water',
        description: 'Calculates maximum water contained between vertical bars using greedy convergence.',
        code: `public class ContainerWater {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int max = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            max = Math.max(max, width * h);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return max;
    }
}`,
        output: 'Max Area: 49'
      },
      {
        title: 'Trapping Rain Water in O(1) Space',
        description: 'Computes trapped water using converging pointers tracking left and right peaks.',
        code: `public class TrappingRainWater {
    public static int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
        output: 'Trapped Water: 6'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Applying converging pointers on an unsorted array for Two Sum without sorting first',
        whyItHappens: 'Assuming converging pointers work on any arbitrary array sequence.',
        howToFix: 'Verify the array is sorted. If unsorted, sort first ($O(N \\log N)$) or use a HashMap ($O(N)$ time, $O(N)$ space).'
      },
      {
        mistake: 'Using left <= right instead of left < right in Two Sum II',
        whyItHappens: 'Allowing the same element to be added to itself.',
        howToFix: 'Two Sum requires two distinct elements (`left != right`), so use `while (left < right)`.'
      },
      {
        mistake: 'Forgetting to skip duplicates in 3Sum resulting in duplicate triplets',
        whyItHappens: 'Failing to advance pointers past identical values after recording a valid triplet.',
        howToFix: 'Include `while (left < right && nums[left] == nums[left+1]) left++;` and corresponding right pointer skip.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Two Sum II Pointer Trace',
        problemStatement: 'Given sorted array `[1, 3, 4, 7, 10, 12]` and target `11`, how many sum evaluations occur before finding the match?',
        code: `int[] nums = {1, 3, 4, 7, 10, 12};
int target = 11;
// Trace:
// 1) 1 + 12 = 13 (> 11) -> right = 4 (10)
// 2) 1 + 10 = 11 (== 11) -> Match!`,
        options: ['1', '2', '3', '4'],
        correctOptionIndex: 1,
        hint: 'Start with 1 + 12. Since 13 > 11, decrement right to 10.',
        solution: 'Step 1 checks 1 + 12 = 13. Step 2 checks 1 + 10 = 11, which matches target.',
        explanation: 'Exactly 2 evaluations occur before locating indices with sum 11.'
      },
      {
        title: 'Puzzle 2: Container With Most Water Shift',
        problemStatement: 'In heights `[1, 8, 6, 2, 5, 4, 8, 3, 7]`, left = 0 (height 1) and right = 8 (height 7). Which pointer moves first?',
        options: ['left moves from 0 to 1', 'right moves from 8 to 7', 'Both move simultaneously', 'Neither moves'],
        correctOptionIndex: 0,
        hint: 'The algorithm always advances the pointer with the strictly smaller height.',
        solution: 'height[left] = 1 and height[right] = 7. Since 1 < 7, left moves to 1.',
        explanation: 'The limiting wall is height 1. Keeping it cannot produce a larger area as width shrinks; left must advance.'
      },
      {
        title: 'Puzzle 3: 3Sum Anchor Optimization',
        problemStatement: 'In a sorted array, if `nums[i] > 0`, why can we immediately break the 3Sum outer loop?',
        options: [
          'Because the array is corrupted.',
          'Because if the smallest of 3 numbers is positive, their sum can never equal zero.',
          'Because 3Sum only works on negative numbers.',
          'To prevent stack overflow.'
        ],
        correctOptionIndex: 1,
        hint: 'If a > 0 and a <= b <= c, then a + b + c > 0.',
        solution: 'Since the array is sorted, all subsequent elements are >= nums[i] > 0, making a sum of 0 mathematically impossible.',
        explanation: 'Breaking when nums[i] > 0 prunes unnecessary checks once all numbers are positive.'
      },
      {
        title: 'Puzzle 4: Valid Palindrome Case and Symbols',
        problemStatement: 'What does `isPalindrome("0P")` return?',
        options: ['true', 'false', 'Compilation Error', 'ArrayIndexOutOfBoundsException'],
        correctOptionIndex: 1,
        hint: '\'0\' is ASCII 48; \'P\' (or \'p\') is ASCII 80 (or 112).',
        solution: 'Both \'0\' and \'P\' are alphanumeric, but \'0\' != \'p\', so false.',
        explanation: '0 and P are distinct alphanumeric characters; the string is not a palindrome.'
      },
      {
        title: 'Puzzle 5: Trapping Rain Water Left Boundary',
        problemStatement: 'In Trapping Rain Water, if `height[left] < height[right]` and `height[left] < leftMax`, how much water is trapped at `left`?',
        options: [
          'height[right] - height[left]',
          'leftMax - height[left]',
          'rightMax - height[left]',
          '0'
        ],
        correctOptionIndex: 1,
        hint: 'The current water column is bounded by the smaller of leftMax and rightMax, which is leftMax.',
        solution: 'Since height[left] < height[right], leftMax is guaranteed to be <= rightMax. Water trapped is leftMax - height[left].',
        explanation: 'The water height is strictly bounded by leftMax because a taller right wall is guaranteed to exist.'
      },
      {
        title: 'Puzzle 6: Squares of Sorted Array Space Complexity',
        problemStatement: 'What is the auxiliary space complexity of two-pointer squares of a sorted array, excluding the output array?',
        options: ['$O(1)$', '$O(\\log N)$', '$O(N)$', '$O(N^2)$'],
        correctOptionIndex: 0,
        hint: 'We only use two pointer integer variables (left, right, and write index).',
        solution: 'Only scalar pointer variables are used, giving $O(1)$ auxiliary space.',
        explanation: 'Excluding the required $O(N)$ output array, auxiliary space is $O(1)$.'
      },
      {
        title: 'Puzzle 7: Converging Two Pointers Time Complexity',
        problemStatement: 'What is the maximum number of pointer movements in a converging two-pointer scan of an array of size $N$?',
        options: ['$N / 2$', '$N - 1$', '$N^2$', '$2N$'],
        correctOptionIndex: 1,
        hint: 'At each step, either left increases or right decreases until left == right.',
        solution: 'The distance between left and right decreases by 1 at each step, totaling $N - 1$ steps.',
        explanation: 'The loop executes at most $N - 1$ times, yielding linear $O(N)$ complexity.'
      },
      {
        title: 'Puzzle 8: 3Sum Triplet Uniqueness',
        problemStatement: 'What ensures that `[-1, 0, 1]` is not outputted multiple times in 3Sum for `[-1, -1, 0, 0, 1, 1]`?',
        options: [
          'A HashSet of lists.',
          'Explicit `while` loops skipping adjacent duplicate elements.',
          'The JVM compiler optimization.',
          'Arrays.binarySearch.'
        ],
        correctOptionIndex: 1,
        hint: 'Skipping duplicate values for the anchor and both pointers ensures unique combinations.',
        solution: 'Skipping `nums[i] == nums[i-1]` and identical adjacent pointer values guarantees uniqueness without HashSet overhead.',
        explanation: 'Manual duplicate skipping on sorted values enforces unique output combinations.'
      },
      {
        title: 'Puzzle 9: Reverse Vowels Behavior',
        problemStatement: 'What is the result of reversing vowels in `"hello"`?',
        options: ['"holle"', '"hello"', '"olleh"', '"hleol"'],
        correctOptionIndex: 0,
        hint: 'Vowels are \'e\' at index 1 and \'o\' at index 4.',
        solution: 'Swapping \'e\' and \'o\' yields "holle".',
        explanation: 'Only the vowels at indices 1 and 4 are swapped, leaving consonants in place.'
      },
      {
        title: 'Puzzle 10: Sort by Parity In-Place Pointer Steps',
        problemStatement: 'When separating even and odd numbers to alternate indices, by how much do the even and odd pointers advance?',
        options: ['1 step', '2 steps', '3 steps', 'Random steps'],
        correctOptionIndex: 1,
        hint: 'Even indices are 0, 2, 4... Odd indices are 1, 3, 5...',
        solution: 'Pointers advance by 2 steps to remain on strictly even and odd index positions.',
        explanation: 'Incrementing by 2 preserves the even/odd index parity invariants.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does the converging two-pointer approach work for Two Sum II but fail on an unsorted array?',
        answer: 'The converging two-pointer technique relies strictly on the monotonic gradient provided by sorting. In a sorted array, if `nums[left] + nums[right] < target`, the sum is too small. Because `nums[right]` is already the largest available value for `nums[left]`, no other element can pair with `nums[left]` to reach the target; therefore, `left` can safely be permanently incremented. On an unsorted array, no such directional deduction exists, making it impossible to discard candidates monotonically without checking all pairs.',
        followUp: 'How can you solve Two Sum on an unsorted array in $O(N)$ time?',
        followUpAnswer: 'By using a hash map storing value-to-index mappings. For each element `x`, we check if `target - x` exists in the map in $O(1)$ average time, achieving $O(N)$ time at the cost of $O(N)$ space.',
        keyPhrases: ['Monotonic gradient', 'Ordered search space', 'Eliminate candidate pairs', 'Hash map tradeoff'],
        commonMistakeAnswer: 'Saying you can just check adjacent elements or that two pointers work on any array.'
      },
      {
        question: 'Explain the mathematical proof for Container With Most Water: why do we move the shorter line?',
        answer: 'Water area is given by `(right - left) * min(height[left], height[right])`. Suppose `height[left] < height[right]`. If we were to move the taller line `right` to `right - 1`, the width decreases from `W` to `W - 1`. The new height would be `min(height[left], height[right - 1])`, which cannot exceed `height[left]`. Because width strictly decreased and the height bound cannot increase, any container formed with `left` and an interior `right` index is guaranteed to have a smaller area than the current container. Thus, moving the shorter line (`left++`) is the only transition that can possibly discover a taller wall and increase total area.',
        followUp: 'What if height[left] == height[right]?',
        followUpAnswer: 'If both heights are equal, moving either pointer (or both) is valid because neither can form a larger container with any interior line without the other also being replaced.',
        keyPhrases: ['Width strictly decreases', 'Height bounded by shorter wall', 'Greedy choice property', 'Exhaustive elimination'],
        commonMistakeAnswer: 'Claiming we should move the taller line to find an even taller one, ignoring that the shorter line remains the bottleneck.'
      },
      {
        question: 'How does the two-pointer approach optimize Trapping Rain Water from $O(N)$ space to $O(1)$ space?',
        answer: 'The standard dynamic programming solution computes `leftMax[i]` and `rightMax[i]` arrays, using $O(N)$ auxiliary space. The two-pointer optimization maintains scalar `leftMax` and `rightMax` variables. At each step, if `height[left] < height[right]`, we know that whatever `rightMax` is, it is at least `height[right] > height[left]`. Therefore, the limiting ceiling at `left` is definitively `leftMax`. We can compute trapped water at `left` as `leftMax - height[left]` and advance `left++`. The symmetric argument applies when `height[right] <= height[left]`. This eliminates both arrays, running in $O(N)$ time with $O(1)$ space.',
        followUp: 'What is the time complexity of the two-pointer solution?',
        followUpAnswer: 'Strictly $O(N)$ time because each step advances either `left` or `right`, visiting every bar exactly once.',
        keyPhrases: ['Scalar tracking', 'Bottleneck boundary', 'Eliminate prefix arrays', 'O(1) auxiliary space'],
        commonMistakeAnswer: 'Believing you must know the exact rightMax value to calculate trapped water on the left side.'
      },
      {
        question: 'What is the time and space complexity of 3Sum using the Two Pointer technique?',
        answer: 'Sorting the array takes $O(N \\log N)$ time. The outer loop runs $N - 2$ times, and for each anchor, the converging two-pointer scan takes $O(N)$ time. The total time complexity is $O(N \\log N) + O(N^2) = O(N^2)$. Auxiliary space complexity is $O(1)$ if the sorting algorithm operates in-place (or $O(N)$ depending on the language sort implementation like Dual-Pivot Quicksort / TimSort), excluding the memory required for the output list.',
        followUp: 'How do you extend this technique to 4Sum and kSum?',
        followUpAnswer: 'By using recursion: $k$Sum reduces to $(k-1)$Sum by fixing an anchor and recursing down to base case $k = 2$, which is solved using converging two pointers in $O(N^{k-1})$ time.',
        keyPhrases: ['O(N^2) time complexity', 'Sort upfront', 'Anchored two-pointer scan', 'kSum reduction'],
        commonMistakeAnswer: 'Saying 3Sum with two pointers takes $O(N^3)$ or claiming it requires a HashSet for deduplication.'
      },
      {
        question: 'Why is in-place character array manipulation preferred over string concatenation in palindrome checks in Java?',
        answer: 'In Java, `java.lang.String` is immutable. Appending or stripping characters from a String creates a new `String` object on the heap at each step, consuming $O(N)$ memory and generating garbage collection churn. Using converging pointers directly on `s.charAt(i)` or converting once to `s.toCharArray()` allows $O(1)$ auxiliary space comparisons with zero intermediate allocations.',
        followUp: 'Does s.charAt(i) introduce method invocation overhead compared to char[]?',
        followUpAnswer: 'HotSpot JVM JIT compiler inlines `s.charAt(i)` into direct array memory reads at runtime, making performance practically identical to raw array access.',
        keyPhrases: ['String immutability', 'Heap allocation churn', 'O(1) auxiliary space', 'JIT inlining'],
        commonMistakeAnswer: 'Creating a reversed copy of the string with StringBuilder and comparing with equals().'
      },
      {
        question: 'How do converging pointers handle duplicate values in 3Sum without using a Set?',
        answer: 'After sorting, duplicate values appear adjacently. To avoid duplicate triplets, we skip identical elements at two points: 1) In the outer loop, if `i > 0 && nums[i] == nums[i - 1]`, we `continue`; 2) When a valid triplet sum equals zero, after adding the triplet, we advance `left` while `nums[left] == nums[left + 1]` and decrement `right` while `nums[right] == nums[right - 1]` before performing the final `left++` and `right--`.',
        followUp: 'Why not just use a HashSet<List<Integer>> to store triplets?',
        followUpAnswer: 'A HashSet incurs significant memory overhead from `ArrayList` object wrappers, hash code calculations, and bucket collision chains, while still executing in $O(N^2)$ time. Manual pointer skipping is faster and uses zero extra heap memory.',
        keyPhrases: ['Adjacent duplicate skipping', 'Outer loop anchor skip', 'Inner pointer skip', 'Zero HashSet overhead'],
        commonMistakeAnswer: 'Relying entirely on a Set or only skipping duplicates on the left pointer.'
      },
      {
        question: 'In Squares of a Sorted Array, why do we populate the result array from back to front?',
        answer: 'Because the original array contains negative numbers, squaring inverts their order: the largest negative numbers (at the left end) produce the largest positive squares, while the largest positive numbers (at the right end) also produce large squares. The largest values of the output array are guaranteed to be at the extreme outer edges (either `left` or `right`). By comparing `nums[left]^2` and `nums[right]^2`, we can place the maximum at index `n - 1` and decrement inward, achieving $O(N)$ time.',
        followUp: 'What would happen if you tried to populate from front to back?',
        followUpAnswer: 'The smallest squares are located near the zero-crossing in the interior of the array, requiring a search for the minimum element or two diverging pointers from the center.',
        keyPhrases: ['Extreme outer edges', 'Back to front placement', 'Single pass O(N)', 'Avoid O(N log N) sorting'],
        commonMistakeAnswer: 'Squaring every element in place and then calling Arrays.sort(), which degrades performance to O(N log N).'
      },
      {
        question: 'How does hardware CPU cache prefetching benefit Two Pointers compared to Hash Tables?',
        answer: 'Two Pointers iterate sequentially through contiguous array memory (`arr[left++]` and `arr[right--]`). Modern CPU hardware prefetchers recognize this linear stride and preload entire 64-byte cache lines into L1 and L2 caches before execution, resulting in near-zero cache misses. In contrast, Hash Tables store node objects scattered arbitrarily across the heap, requiring pointer dereferencing that causes repeated CPU cache line misses and pipeline stalls.',
        followUp: 'How significant is this cache locality difference in performance benchmarks?',
        followUpAnswer: 'Sequential array reads can be 5x to 10x faster than random pointer-chasing memory accesses, even when theoretical Big-O operations are identical.',
        keyPhrases: ['Contiguous memory', '64-byte cache lines', 'Hardware prefetcher', 'Avoid pointer chasing'],
        commonMistakeAnswer: 'Thinking Big-O is the only metric that determines execution speed.'
      },
      {
        question: 'Can the converging two-pointer technique be used on linked lists?',
        answer: 'Not directly, because singly linked lists only support forward traversal (`node.next`) in $O(1)$ time; accessing the end node requires $O(N)$ traversal, and backward movement is impossible. To use converging pointers on a linked list, one must either convert it to an array/list ($O(N)$ space), use a doubly linked list with a tail pointer, or reverse the second half of the list in-place.',
        followUp: 'How is Palindrome Linked List solved in O(1) space using pointers?',
        followUpAnswer: 'Find the middle using fast-slow pointers, reverse the second half of the linked list in-place, and then compare the first half and second half using two forward pointers.',
        keyPhrases: ['No random access', 'Unidirectional traversal', 'Doubly linked list requirement', 'Reverse second half'],
        commonMistakeAnswer: 'Claiming you can just set right = tail and do right = right.prev on a singly linked list.'
      },
      {
        question: 'What is the condition for using two pointers vs binary search for pair finding in sorted arrays?',
        answer: 'If you need to find a single pair summing to a target, converging two pointers is optimal: $O(N)$ time and $O(1)$ space, compared to binary search which takes $O(N \\log N)$ time ($N$ binary searches of $\\log N$). However, if the array is static and you must answer $Q$ independent queries for different targets, sorting once in $O(N \\log N)$ and answering queries with binary search or two pointers gives different architectural tradeoffs.',
        followUp: 'What if you need to find all pairs where difference is target (nums[j] - nums[i] = target)?',
        followUpAnswer: 'For differences, two pointers move in the SAME direction (both forward), where `right` expands and `left` catches up, maintaining the difference invariant.',
        keyPhrases: ['O(N) vs O(N log N)', 'Single pass vs binary search', 'Same direction for difference', 'Opposite direction for sum'],
        commonMistakeAnswer: 'Using binary search for pair sum when two pointers is strictly faster at O(N).'
      }
    ],
    miniQuiz: [
      {
        question: 'What prerequisite is strictly required to use converging two pointers for target sum searching?',
        options: [
          'The array must be sorted.',
          'The array must contain only positive integers.',
          'The array size must be an even number.',
          'The array must be stored in a LinkedList.'
        ],
        correctIndex: 0,
        explanation: 'Converging sum search relies on the sorted order to know whether to move left or right.'
      },
      {
        question: 'In Two Sum II, if `arr[left] + arr[right] > target`, what is the correct action?',
        options: [
          '`left++`',
          '`right--`',
          '`left = right`',
          '`return -1`'
        ],
        correctIndex: 1,
        explanation: 'To decrease the sum towards the target, the larger right boundary must be decremented.'
      },
      {
        question: 'What is the time complexity of the Two Pointers Container With Most Water algorithm?',
        options: [
          '$O(N^2)$',
          '$O(N \\log N)$',
          '$O(N)$',
          '$O(1)$'
        ],
        correctIndex: 2,
        explanation: 'Each step moves either left or right by 1, visiting each element in linear $O(N)$ time.'
      },
      {
        question: 'What is the auxiliary space complexity of 3Sum using the Two Pointers technique?',
        options: [
          '$O(1)$',
          '$O(N)$',
          '$O(N^2)$',
          '$O(\\log N)$'
        ],
        correctIndex: 0,
        explanation: 'Excluding the output result list, converging pointers only use scalar variables ($O(1)$ space).'
      },
      {
        question: 'In Container With Most Water, why is the shorter pointer moved inward?',
        options: [
          'Moving the taller pointer can never increase area because height is limited by the shorter line.',
          'Moving the taller pointer causes an index out of bounds exception.',
          'To sort the array in reverse order.',
          'Because the shorter line is always negative.'
        ],
        correctIndex: 0,
        explanation: 'Width decreases at every step; the only chance of finding a larger area is discovering a taller wall by moving the shorter side.'
      },
      {
        question: 'What is the best way to skip duplicates in 3Sum to ensure unique triplets?',
        options: [
          'Store all results in a `HashSet<List<Integer>>`.',
          'Increment/decrement pointers past adjacent identical values.',
          'Re-sort the array after every iteration.',
          'Throw an IllegalArgumentException on duplicates.'
        ],
        correctIndex: 1,
        explanation: 'Manual pointer skipping avoids the memory allocation and hashing overhead of a HashSet.'
      },
      {
        question: 'In Squares of a Sorted Array, where do the largest squared values reside?',
        options: [
          'In the exact center of the array.',
          'At the extreme outer ends (leftmost negative or rightmost positive).',
          'At random indices.',
          'At even-numbered indices only.'
        ],
        correctIndex: 1,
        explanation: 'Large magnitude negative numbers and positive numbers reside at opposite outer boundaries.'
      },
      {
        question: 'What is the space complexity of Trapping Rain Water using the Two Pointers approach?',
        options: [
          '$O(N)$',
          '$O(1)$',
          '$O(N \\log N)$',
          '$O(N^2)$'
        ],
        correctIndex: 1,
        explanation: 'Tracking leftMax and rightMax with scalar pointers eliminates prefix arrays, achieving $O(1)$ auxiliary space.'
      },
      {
        question: 'When is `left <= right` appropriate instead of `left < right`?',
        options: [
          'When the problem allows using the same single element (e.g. binary search or center palindrome check).',
          'Always in Two Sum.',
          'Never in any algorithm.',
          'Only when array length is odd.'
        ],
        correctIndex: 0,
        explanation: '`left <= right` is used when the middle single element must be evaluated (such as in binary search or odd-length palindromes).'
      },
      {
        question: 'Why does Two Pointers offer superior hardware cache locality over HashMap lookups?',
        options: [
          'Array elements are stored contiguously in memory and preloaded by CPU hardware prefetchers.',
          'HashMaps are written in C++ while arrays are in Java.',
          'Two Pointers allocate more heap memory.',
          'HashMaps disable CPU caching.'
        ],
        correctIndex: 0,
        explanation: 'Contiguous sequential memory access maximizes CPU L1/L2 cache line hits and streaming prefetch efficiency.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 17.2: Fast & Slow Pointer Traversal
  // ─────────────────────────────────────────────────────────────
  'fast-slow-pointer-traversal': {
    id: 'fast-slow-pointer-traversal',
    moduleId: 'java-dsa-patterns',
    moduleTitle: '17. Two Pointers & Sliding Window',
    lessonNumber: 'Lesson 17.2',
    title: 'Fast & Slow Pointer Traversal',
    subtitle: 'Same-direction pointer traversal, in-place array modification, duplicate removal invariants, zero partitioning, Floyd\'s cycle detection on arrays, and Happy Number',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Imagine a street cleaning crew with two workers moving down a road in the same direction. Worker #1 (the Fast Scout) sprints ahead, inspecting every item on the road. Worker #2 (the Slow Collector) walks slowly behind, holding the collection cart. Whenever the Fast Scout spots a valid item worth keeping (e.g. a non-zero number), they toss it directly to the Slow Collector, who places it into the next empty spot in the cart and takes one step forward. The trash (zeroes and duplicates) is ignored and left behind. In a single sweep, the road is cleaned without needing a second road built alongside it!',
    interviewTakeaways: [
      'Write-Read Invariant: The slow pointer tracks the boundary of valid processed data (the write index), while the fast pointer acts as the explorer scanning unprocessed elements.',
      'In-Place Array Mutation: Removes duplicates and moves zeroes in $O(N)$ time with $O(1)$ auxiliary space, eliminating temporary ArrayList allocations.',
      'Generalizing K-Duplicates: In sorted duplicate removal, comparing `nums[fast] != nums[slow - k]` allows keeping at most $k$ duplicates for any arbitrary integer $k$.',
      'Floyd\'s Cycle Detection on Arrays: Mapping array values as pointers (`next = nums[curr]`) transforms duplicate finding in range $[1, n]$ into linked list cycle detection in $O(1)$ space without modifying the array.',
      'Happy Number Cycle Detection: Fast-slow pointers detect repeating loops in mathematical number transformations without a HashSet.',
      'Stable Partitioning: Fast-slow swapping maintains the relative ordering of non-zero elements while zeroing the remainder.'
    ],
    cheatSheet: {
      summary: 'Fast and slow pointers move in the same direction. Slow writes filtered output while fast explores. Solves Remove Duplicates, Move Zeroes, and Floyd cycle detection.',
      syntaxTemplate: `// Standard Fast-Slow Array Filtering Template
int slow = 0;
for (int fast = 0; fast < arr.length; fast++) {
    if (isValid(arr[fast])) {
        arr[slow] = arr[fast];
        slow++;
    }
}
return slow; // New logical length`,
      rules: [
        { rule: 'Slow Is Write Index', explanation: 'Elements before index `slow` are strictly valid and finalized. `slow` points to where the next valid element should be placed.' },
        { rule: 'Fast Is Read Index', explanation: '`fast` scans every element from 0 to $N-1$ without skipping.' },
        { rule: 'At Most K Duplicates Rule', explanation: 'Compare `nums[fast]` against `nums[slow - k]` to allow up to $k$ duplicate copies of any element.' },
        { rule: 'Zero Swapping Invariant', explanation: 'Swap `nums[slow]` and `nums[fast]` on non-zero to move zeroes to the end without extra memory.' },
        { rule: 'Array as Graph', explanation: 'When array elements are in range $1..n$, treat index $i$ as a node pointing to node $nums[i]$.' }
      ],
      quickComparison: [
        { aspect: 'Remove Duplicates', optionA: 'HashSet: $O(N)$ Time, $O(N)$ Space', optionB: 'Fast-Slow: $O(N)$ Time, $O(1)$ Space' },
        { aspect: 'Move Zeroes', optionA: 'New Array Copy: $O(N)$ Space', optionB: 'In-Place Swap: $O(1)$ Space' },
        { aspect: 'Find Duplicate in 1..n', optionA: 'Boolean Visited Array: $O(N)$ Space', optionB: 'Floyd\'s Tortoise & Hare: $O(1)$ Space' },
        { aspect: 'Happy Number', optionA: 'HashSet tracking: $O(K)$ Space', optionB: 'Fast-Slow Pointers: $O(1)$ Space' }
      ]
    },
    coreExplanation: [
      'The Fast and Slow pointer pattern (also known as the Read-Write pointer pattern) moves two indices in the SAME direction at different speeds or conditions.',
      'In array compaction (e.g. Remove Duplicates, Move Zeroes), `slow` maintains the boundary of the cleaned subarray, and `fast` inspects incoming candidates.',
      'In Remove Duplicates from Sorted Array, because duplicates are adjacent, `nums[fast]` is compared with `nums[slow]`. If different, `slow` increments and receives `nums[fast]`.',
      'For "At Most Twice" duplicate removal, comparing `nums[fast]` with `nums[slow - 2]` guarantees that an element is only written if fewer than two copies exist in the processed prefix.',
      'Move Zeroes can be implemented with a swap: whenever `nums[fast] != 0`, swap `nums[slow]` and `nums[fast]`, then increment `slow`. This stably pushes zeroes to the back in a single pass.',
      'Floyd\'s Cycle Detection on Arrays: In an array of size $n + 1$ with values in range $1..n$, Dirichlet\'s Pigeonhole Principle guarantees at least one duplicate. By viewing each index $i$ as pointing to node `nums[i]`, the duplicate acts as a node with multiple incoming edges (a cycle entrance).',
      'Running Floyd\'s algorithm on this implicit graph finds the duplicate in $O(N)$ time and $O(1)$ space without altering the original array.'
    ],
    diagram: `Fast-Slow Remove Duplicates:
Sorted Array: [ 1,  1,  2,  2,  3 ]

Initial: slow = 0, fast = 1
 slow   fast
   ↓     ↓
[  1,    1,    2,    2,    3  ]   nums[fast] == nums[slow] (1 == 1) -> Skip!

Step 1: fast = 2
 slow         fast
   ↓           ↓
[  1,    1,    2,    2,    3  ]   nums[fast] != nums[slow] (2 != 1) -> slow++; nums[slow] = nums[fast];

Result after Step 1:
        slow   fast
          ↓     ↓
[  1,     2,    2,    2,    3  ]

Step 2: fast = 3
        slow         fast
          ↓           ↓
[  1,     2,    2,    2,    3  ]   nums[fast] == nums[slow] (2 == 2) -> Skip!

Step 3: fast = 4
        slow               fast
          ↓                 ↓
[  1,     2,    2,    2,    3  ]   nums[fast] != nums[slow] (3 != 2) -> slow++; nums[slow] = 3;

Final: slow = 2 (Length = 3) -> [ 1, 2, 3 ]`,
    codeSnippet: {
      title: 'Remove Duplicates from Sorted Array',
      code: `public class RemoveDuplicates {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
}`,
      lineByLineExplanation: [
        { line: 'int slow = 0;', explanation: 'Sets slow pointer to index 0 (first element is always unique).' },
        { line: 'for (int fast = 1; fast < nums.length; fast++)', explanation: 'Fast pointer scans every subsequent element.' },
        { line: 'if (nums[fast] != nums[slow])', explanation: 'Detects a new unique element.' },
        { line: 'nums[++slow] = nums[fast];', explanation: 'Advances slow and copies the unique element into place.' },
        { line: 'return slow + 1;', explanation: 'Returns the count of unique elements in the prefix.' }
      ],
      output: 'Unique Count: 3'
    },
    codeExamples: [
      {
        title: 'Move Zeroes In-Place Stably',
        description: 'Swaps non-zero elements forward to preserve relative order in O(1) space.',
        code: `public class MoveZeroes {
    public static void moveZeroes(int[] nums) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                int temp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = temp;
                slow++;
            }
        }
    }
}`,
        output: 'Result: [1, 3, 12, 0, 0]'
      },
      {
        title: 'Find Duplicate Number via Floyd\'s Tortoise and Hare',
        description: 'Finds duplicate in range [1, n] using array as an implicit functional graph.',
        code: `public class FindDuplicate {
    public static int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
        output: 'Duplicate: 2'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using slow++ before assigning when slow starts at 0 in Move Zeroes',
        whyItHappens: 'Confusing write-then-increment with increment-then-write patterns.',
        howToFix: 'In Move Zeroes, `slow` represents the current slot to fill; assign/swap first, then `slow++`.'
      },
      {
        mistake: 'Modifying the array when finding the duplicate number when problem states read-only',
        whyItHappens: 'Using negative marking (`nums[abs(x)] = -nums[abs(x)]`) which violates read-only constraints.',
        howToFix: 'Use Floyd\'s fast-slow pointer algorithm, which treats the array as read-only functional graph.'
      },
      {
        mistake: 'Infinite loop in Happy Number due to not detecting cycles',
        whyItHappens: 'Assuming all numbers eventually terminate at 1.',
        howToFix: 'Apply fast-slow pointers: if fast == slow and fast != 1, a repeating cycle is confirmed.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Fast-Slow Remove Duplicates Trace',
        problemStatement: 'In `nums = [1, 1, 2]`, what is the value of `slow` after `fast` reaches the end?',
        code: `int[] nums = {1, 1, 2};
int slow = 0;
for (int fast = 1; fast < nums.length; fast++) {
    if (nums[fast] != nums[slow]) {
        slow++;
        nums[slow] = nums[fast];
    }
}
// What is slow?`,
        options: ['0', '1', '2', '3'],
        correctOptionIndex: 1,
        hint: 'slow starts at 0. For fast=1 (1==1), nothing happens. For fast=2 (2!=1), slow becomes 1.',
        solution: 'slow increments once to 1 and nums[1] becomes 2. Unique count is slow + 1 = 2.',
        explanation: 'slow index ends at 1, representing 2 unique values (`[1, 2]`).'
      },
      {
        title: 'Puzzle 2: Move Zeroes Swap Count',
        problemStatement: 'How many swaps occur when running Move Zeroes on `[0, 1, 0, 3, 12]`?',
        options: ['2', '3', '4', '5'],
        correctOptionIndex: 1,
        hint: 'A swap occurs every time nums[fast] != 0. Count non-zero elements.',
        solution: 'There are 3 non-zero elements (1, 3, 12), so exactly 3 swaps occur.',
        explanation: 'Every non-zero element triggers a swap with the slow index.'
      },
      {
        title: 'Puzzle 3: Remove Duplicates K=2 Condition',
        problemStatement: 'To allow at most 2 duplicate copies of each number, what condition must be checked before writing `nums[fast]`?',
        options: [
          '`nums[fast] != nums[slow]`',
          '`nums[fast] != nums[slow - 2]`',
          '`nums[fast] != nums[slow - 1]`',
          '`nums[fast] > nums[slow]`'
        ],
        correctOptionIndex: 1,
        hint: 'Compare against the element written 2 positions earlier.',
        solution: 'If nums[fast] != nums[slow - 2], writing nums[fast] will produce at most 2 copies.',
        explanation: 'The `slow - 2` check prevents a third duplicate from being appended.'
      },
      {
        title: 'Puzzle 4: Happy Number Cycle Termination',
        problemStatement: 'What does Happy Number return for input `n = 4`?',
        options: ['true', 'false', '1', 'StackOverflowError'],
        correctOptionIndex: 1,
        hint: '4 leads to 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4 (cycle detected).',
        solution: '4 enters an 8-number cycle and never reaches 1, returning false.',
        explanation: 'Any cycle not terminating at 1 confirms the number is unhappy.'
      },
      {
        title: 'Puzzle 5: Array as Linked List Pointer',
        problemStatement: 'In array `nums = [1, 3, 4, 2, 2]`, what is the node reached after 2 steps starting from index 0?',
        options: ['1', '3', '4', '2'],
        correctOptionIndex: 1,
        hint: 'Step 0: index 0 -> val = 1. Step 1: index 1 -> val = 3.',
        solution: 'From 0 we go to nums[0] = 1. From 1 we go to nums[1] = 3.',
        explanation: 'Traversing pointers: $0 \\to 1 \\to 3$. Node is 3.'
      },
      {
        title: 'Puzzle 6: Duplicate Number Cycle Proof',
        problemStatement: 'Why does an array of $n + 1$ elements with values $1..n$ always contain a cycle when mapped as $i \\to nums[i]$?',
        options: [
          'Because the array is sorted.',
          'Pigeonhole Principle: $n+1$ elements mapped into $n$ distinct values forces at least two indices to point to the same value.',
          'Because all numbers are prime.',
          'Because of JVM garbage collection.'
        ],
        correctOptionIndex: 1,
        hint: 'Pigeonhole Principle guarantees a duplicate node with in-degree >= 2.',
        solution: 'Two different indices pointing to the same index creates a cycle entrance.',
        explanation: 'Multiple incoming edges into a single node create a cycle in a functional graph.'
      },
      {
        title: 'Puzzle 7: Move Zeroes vs New Array Space',
        problemStatement: 'Why is the fast-slow pointer approach preferred over allocating a new array for Move Zeroes in production?',
        options: [
          'It uses $O(1)$ memory, avoiding heap allocation and GC pressure.',
          'It runs in $O(1)$ time.',
          'It works on Strings directly.',
          'It sorts the array in descending order.'
        ],
        correctOptionIndex: 0,
        hint: 'In-place avoids new object allocations.',
        solution: 'In-place swaps operate in $O(1)$ space without creating heap garbage.',
        explanation: 'Zero allocations reduce GC latency in performance-critical code.'
      },
      {
        title: 'Puzzle 8: String Compression Run Length',
        problemStatement: 'What does in-place compression of `[\'a\', \'b\', \'b\']` return?',
        options: ['2', '3', '4', '1'],
        correctOptionIndex: 1,
        hint: '\'a\' appears once -> "a". \'b\' appears twice -> "b", "2". Total length = 3.',
        solution: 'Chars become [\'a\', \'b\', \'2\'], length = 3.',
        explanation: 'Single occurrences omit count; length 1 (\'a\') + length 2 (\'b2\') = 3.'
      },
      {
        title: 'Puzzle 9: Fast-Slow Remove Element Invariant',
        problemStatement: 'In Remove Element for `val = 2` on `[2, 2, 3]`, what does `slow` equal at termination?',
        options: ['0', '1', '2', '3'],
        correctOptionIndex: 1,
        hint: 'Only 3 is kept; slow increments once.',
        solution: 'Only element 3 is != 2. It is written to nums[0] and slow becomes 1.',
        explanation: 'The single valid element 3 leaves slow at 1.'
      },
      {
        title: 'Puzzle 10: Circular Array Loop Forward Invariant',
        problemStatement: 'In Circular Array Loop, what invalidates a loop where `nums[i] = 3` and `nums[j] = -2`?',
        options: [
          'Cycle must be strictly unidirectional (all positive or all negative).',
          'Array cannot have negative numbers.',
          'Array must be sorted.',
          'Modulo operation fails.'
        ],
        correctOptionIndex: 0,
        hint: 'The problem statement requires all loop transitions to be forward or all backward.',
        solution: 'Mixing forward (> 0) and backward (< 0) steps violates the loop definition.',
        explanation: 'Loops must be strictly unidirectional.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain how the Fast and Slow pointer pattern achieves $O(1)$ auxiliary space in array filtering.',
        answer: 'The fast and slow pointer pattern divides the single array into two logical sections: the processed prefix (`0` to `slow - 1`) and the uninspected suffix (`fast` to `n - 1`). The `slow` pointer marks the write head, while the `fast` pointer marks the read head. Because `slow <= fast` at all times, the read head is always ahead of or equal to the write head, meaning `fast` reads an element before `slow` can ever overwrite it. This enables in-place mutation without any secondary storage, yielding $O(1)$ space and $O(N)$ time.',
        followUp: 'What would happen if slow moved faster than fast?',
        followUpAnswer: 'That is impossible because fast increments on every step ($fast++$), while slow only increments when a valid element is accepted ($slow \\le fast$).',
        keyPhrases: ['Read-Write pointers', 'Logical partitioning', 'slow <= fast invariant', 'No overwrite before read'],
        commonMistakeAnswer: 'Allocating an ArrayList to collect valid elements and copying back.'
      },
      {
        question: 'How does Floyd\'s Cycle Detection algorithm find the duplicate number without modifying the array?',
        answer: 'Given an array of length $n + 1$ with numbers in range $1..n$, each element can be viewed as a functional pointer: $f(i) = nums[i]$. Since index 0 cannot be pointed to by any element (values are $1..n$), starting at 0 guarantees we can traverse into the structure without returning to 0. By the Pigeonhole Principle, at least two indices point to the same value, forming a cycle entrance. Phase 1 uses slow and fast pointers ($slow = nums[slow]$, $fast = nums[nums[fast]]$) to find an intersection inside the cycle. Phase 2 resets slow to `nums[0]` and advances both pointers 1 step at a time. The point where they meet is mathematically the cycle entrance, which corresponds to the duplicate number.',
        followUp: 'What is the mathematical proof that slow and fast meet at the entrance in Phase 2?',
        followUpAnswer: 'Let $F$ be distance to cycle entrance, $C$ cycle length, and $a$ distance from entrance to meeting point. $2(F + a) - (F + a) = kC \\implies F = kC - a$. Advancing $F$ steps from start and $F$ steps from meeting point reaches the entrance simultaneously.',
        keyPhrases: ['Functional graph', 'Pigeonhole principle', 'Phase 1 intersection', 'Phase 2 cycle entrance'],
        commonMistakeAnswer: 'Sorting the array or using a HashSet, violating the O(1) space or read-only constraints.'
      },
      {
        question: 'How do you generalize "Remove Duplicates from Sorted Array" to allow at most $K$ duplicates?',
        answer: 'The generalized solution maintains `slow` as the insertion index. For an array sorted in non-decreasing order, we can initialize `slow = k` (since the first $k$ elements are always valid if $n \\ge k$). We then iterate `fast` from $k$ to $n - 1$. An incoming element `nums[fast]` is valid to include if and only if `nums[fast] != nums[slow - k]`. If valid, we assign `nums[slow++] = nums[fast]`. This single check guarantees that no value appears more than $k$ times in the finalized prefix in $O(N)$ time and $O(1)$ space.',
        followUp: 'Why do we compare with nums[slow - k] instead of nums[fast - k]?',
        followUpAnswer: 'Because `nums[slow - k]` checks against the already finalized, filtered sequence, whereas `nums[fast - k]` could refer to intermediate discarded duplicates.',
        keyPhrases: ['nums[slow - k] invariant', 'Generalized K duplicates', 'Finalized prefix', 'O(N) time O(1) space'],
        commonMistakeAnswer: 'Using a counter variable for each element and resetting it when value changes.'
      },
      {
        question: 'Why does Move Zeroes using swaps preserve the relative order of non-zero elements?',
        answer: 'In the swap implementation, `fast` scans the array from index 0 to $n - 1$ sequentially. Every time a non-zero element is found at `nums[fast]`, it is swapped with `nums[slow]`, and `slow` increments. Because `fast` visits non-zero elements in their exact original order, and `slow` always points to the earliest available slot (either an existing zero or `fast` itself), non-zero elements are placed into `slow` in strictly increasing order of their discovery, guaranteeing stability in $O(N)$ time.',
        followUp: 'How does this compare to the two-pass approach (copy non-zeroes then fill zeroes)?',
        followUpAnswer: 'Both are $O(N)$ time and $O(1)$ space, but the swap approach operates in a single pass and performs fewer total writes when the array has few zeroes.',
        keyPhrases: ['Sequential discovery', 'Stable partitioning', 'Single pass swap', 'Earliest available slot'],
        commonMistakeAnswer: 'Using converging pointers from both ends, which reverses or scrambles relative order.'
      },
      {
        question: 'How does the Happy Number problem connect to cycle detection?',
        answer: 'The Happy Number problem transforms a number $n$ by repeatedly replacing it with the sum of the squares of its digits: $f(n) = \\sum d_i^2$. Because the sum of squares of digits for any large number decreases rapidly (e.g. for a 3-digit number, max sum is $3 \\times 9^2 = 243$), the state space is finite. In any finite state system with deterministic transitions, sequence generation must either terminate at 1 or enter a repeating cycle. By applying Floyd\'s Tortoise and Hare algorithm with $slow = f(slow)$ and $fast = f(f(fast))$, we detect cycles in $O(1)$ space without a HashSet.',
        followUp: 'What is the cycle that unhappy numbers enter?',
        followUpAnswer: 'All unhappy numbers in base 10 fall into the specific cycle: $4 \\to 16 \\to 37 \\to 58 \\to 89 \\to 145 \\to 42 \\to 20 \\to 4$.',
        keyPhrases: ['Deterministic transition', 'Finite state space', 'Floyd cycle detection', 'O(1) memory'],
        commonMistakeAnswer: 'Running a while loop with a hardcoded iteration limit like 1000.'
      },
      {
        question: 'What is the difference between fast-slow pointer traversal and two-pointer converging traversal?',
        answer: 'Fast-slow pointers move in the SAME direction (typically left-to-right) at different rates or conditions, primarily used for filtering, cycle detection, or midpoint finding. Converging pointers start at OPPOSITE ends (index 0 and $n - 1$) and move towards each other, primarily used for searching pairs in sorted spaces, finding max area containers, or verifying palindromes.',
        followUp: 'When would you use two pointers moving in the same direction at the same speed?',
        followUpAnswer: 'When finding the $K$-th element from the end of a linked list: pointer 2 is advanced $K$ steps ahead, then both move forward at the same speed until pointer 2 hits null.',
        keyPhrases: ['Same direction vs opposite direction', 'Read/write filtering vs boundary convergence', 'Stride differences', 'Midpoint vs pair sum'],
        commonMistakeAnswer: 'Confusing the two and trying to solve Two Sum with fast-slow pointers.'
      },
      {
        question: 'In String Compression, why is the compressed array guaranteed not to overflow the original array bounds?',
        answer: 'Every consecutive sequence of identical characters has length $L \\ge 1$. If $L = 1$, it writes 1 character (\'a\'). If $L = 2$, it writes 2 characters (\'a\', \'2\'). If $L = 10$, it writes 3 characters (\'a\', \'1\', \'0\') for 10 input characters ($3 \\le 10$). For any $L$, the number of written characters is $1 + \\text{digits}(L)$, which is strictly $\\le L$. Therefore, the write index `slow` can never surpass the read index `fast`, preventing array overflow in $O(1)$ space.',
        followUp: 'What if L is 1? Why not write \'a1\'?',
        followUpAnswer: 'Standard run-length encoding specifications omit counts of 1 to minimize output size for non-repeating characters.',
        keyPhrases: ['1 + digits(L) <= L', 'slow <= fast invariant', 'No buffer overflow', 'Run-length compression'],
        commonMistakeAnswer: 'Thinking that counts like 1000 might overflow because "1000" has 4 digits.'
      },
      {
        question: 'How do you detect a circular loop in an array with both positive and negative step sizes?',
        answer: 'We treat the array indices as a circular directed graph where node $i$ has edge to $((i + nums[i]) \\% n + n) \\% n$. A valid cycle must have length $> 1$ and be strictly unidirectional (all steps $> 0$ or all steps $< 0$). We run Floyd\'s cycle detection starting from each index $i$. If a slow/fast collision occurs with consistent direction and cycle length $> 1$, a cycle exists. To achieve $O(N)$ overall time, traversed non-cycle paths are marked with 0 so they are never re-evaluated.',
        followUp: 'Why is ((i + nums[i]) % n + n) % n needed in Java?',
        followUpAnswer: 'Because Java\'s `%` operator is remainder, not true mathematical modulo; for negative numbers, `-2 % 5` is `-2`. Adding `n` and taking modulo again ensures non-negative index wrapping.',
        keyPhrases: ['Modulo wrapping', 'Unidirectional invariant', 'Zero-marking visited nodes', 'Floyd algorithm on array'],
        commonMistakeAnswer: 'Using regular % n which causes negative index ArrayIndexOutOfBoundsException in Java.'
      },
      {
        question: 'Can fast-slow pointers be used to find the middle of an array?',
        answer: 'While mathematically possible ($fast += 2, slow += 1$), doing so on an array is redundant because arrays provide $O(1)$ random access (`nums[nums.length / 2]`). Fast-slow pointers for midpoint location are specifically designed for linked lists, where the length is unknown upfront and indexing requires $O(N)$ sequential traversal.',
        followUp: 'What is the exact position found by slow on an even-length linked list?',
        followUpAnswer: 'If initialized at head with `fast != null && fast.next != null`, slow stops at the second middle node. With `fast.next != null && fast.next.next != null`, slow stops at the first middle node.',
        keyPhrases: ['O(1) array random access', 'Linked list midpoint requirement', 'First vs second middle node', 'fast = fast.next.next'],
        commonMistakeAnswer: 'Using fast-slow pointers on an array to find the middle index.'
      },
      {
        question: 'How does fast-slow pointer traversal behave on primitive vs object arrays in the JVM?',
        answer: 'On primitive arrays (`int[]`), fast-slow pointer reading and writing operates on raw contiguous 32-bit values directly in cache lines with zero object overhead. On object arrays (`Integer[]` or custom objects), writes update references (4 bytes with CompressedOops). Overwriting an object reference at `nums[slow]` replaces the reference pointer without mutating the underlying heap object; unreferenced previous objects eventually become eligible for GC.',
        followUp: 'Can overwriting object references cause memory leaks in Java?',
        followUpAnswer: 'If elements past the new `slow` length are not cleared (`nums[i] = null`), "loitering" references keep those objects alive in heap, preventing garbage collection.',
        keyPhrases: ['Primitive cache line efficiency', 'CompressedOops references', 'Object loitering prevention', 'Nulling out trailing references'],
        commonMistakeAnswer: 'Believing in-place array writes modify the underlying object instances rather than references.'
      }
    ],
    miniQuiz: [
      {
        question: 'In fast-slow array filtering, what does the `slow` pointer represent?',
        options: [
          'The write index boundary for valid, filtered data.',
          'The total number of comparisons made.',
          'The current maximum value in the array.',
          'The index of the last deleted item.'
        ],
        correctIndex: 0,
        explanation: '`slow` points to the next slot where a valid filtered element will be written.'
      },
      {
        question: 'What is the time complexity of Remove Duplicates from Sorted Array using fast-slow pointers?',
        options: [
          '$O(N^2)$',
          '$O(N \\log N)$',
          '$O(N)$',
          '$O(1)$'
        ],
        correctIndex: 2,
        explanation: 'The fast pointer inspects each element exactly once in a single linear pass ($O(N)$).'
      },
      {
        question: 'Why does fast-slow pointer filtering never overwrite unprocessed data?',
        options: [
          'Because `fast` is always $\\ge slow$, reading elements before or when `slow` writes to them.',
          'Because Java locks the array.',
          'Because the array is cloned automatically.',
          'Because slow moves backwards.'
        ],
        correctIndex: 0,
        explanation: 'Since `slow <= fast`, the read head is never behind the write head.'
      },
      {
        question: 'In Happy Number, when does the algorithm determine the number is happy?',
        options: [
          'When slow == 0.',
          'When fast == 1.',
          'When slow == fast and fast != 1.',
          'When slow reaches 100.'
        ],
        correctIndex: 1,
        explanation: 'Reaching 1 proves the number terminates happily.'
      },
      {
        question: 'What is the auxiliary space complexity of finding a duplicate number using Floyd\'s algorithm?',
        options: [
          '$O(1)$',
          '$O(N)$',
          '$O(\\log N)$',
          '$O(N^2)$'
        ],
        correctIndex: 0,
        explanation: 'Floyd\'s algorithm operates solely using two integer index variables ($O(1)$ space).'
      },
      {
        question: 'To allow at most $K$ duplicates in a sorted array, what condition is checked?',
        options: [
          '`nums[fast] != nums[slow - k]`',
          '`nums[fast] == nums[slow]`',
          '`nums[fast] > nums[slow + k]`',
          '`nums[fast] % k == 0`'
        ],
        correctIndex: 0,
        explanation: 'Comparing with `nums[slow - k]` guarantees that no value appears more than $k$ times in the prefix.'
      },
      {
        question: 'What happens to the remaining elements past `slow` in a Java object array if not set to `null`?',
        options: [
          'Memory loitering occurs, preventing those objects from being garbage collected.',
          'A NullPointerException is thrown.',
          'The JVM crashes.',
          'They are automatically deleted by the compiler.'
        ],
        correctIndex: 0,
        explanation: 'Dangling references in unused array slots prevent the garbage collector from reclaiming memory.'
      },
      {
        question: 'Why is `((curr + nums[curr]) % n + n) % n` used for circular array steps in Java?',
        options: [
          'To handle negative step sizes correctly because `%` in Java is remainder, not true mathematical modulo.',
          'To speed up division by using bitwise shifts.',
          'To ensure the array stays sorted.',
          'To prevent stack overflow in recursion.'
        ],
        correctIndex: 0,
        explanation: 'Java remainder `%` returns negative values for negative dividends; adding `n` and taking modulo guarantees a valid non-negative index.'
      },
      {
        question: 'In Move Zeroes, what occurs when `nums[fast] != 0`?',
        options: [
          '`nums[fast]` is swapped with `nums[slow]`, and `slow` increments.',
          '`fast` stops and waits for `slow`.',
          '`nums[slow]` is deleted.',
          'A new array is created.'
        ],
        correctIndex: 0,
        explanation: 'Swapping non-zero values into `slow` shifts them forward stably.'
      },
      {
        question: 'What mathematical principle proves a duplicate exists in an array of $n + 1$ integers from $1$ to $n$?',
        options: [
          'Dirichlet\'s Pigeonhole Principle.',
          'Fermat\'s Little Theorem.',
          'Euclidean Algorithm.',
          'Pythagorean Theorem.'
        ],
        correctIndex: 0,
        explanation: 'Putting $n + 1$ items into $n$ slots guarantees at least one slot contains multiple items.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 17.3: Sliding Window: Fixed Size Subarrays
  // ─────────────────────────────────────────────────────────────
  'fixed-size-sliding-window': {
    id: 'fixed-size-sliding-window',
      moduleId: 'java-dsa-patterns',
      moduleTitle: '17. Two Pointers & Sliding Window',
      lessonNumber: 'Lesson 17.3',
      title: 'Sliding Window: Fixed Size Subarrays',
      subtitle: 'Constant window width $K$, running state maintenance in $O(1)$, Max Sum Subarray, Anagram detection, Monotonic Deque for Sliding Window Maximum, and numeric overflow guards',
      estimatedMinutes: 24,
      beginnerAnalogy: 'Imagine looking at a scenic train route through a rectangular passenger window of fixed width. As the train moves forward, you do not need to repaint the entire landscape. A sliver of new scenery appears at the right edge, while an equal sliver of old scenery disappears past the left edge. The bulk of the view in the middle remains identical! By simply adding the incoming sliver and subtracting the departing sliver, you calculate the total brightness of your view in $O(1)$ instant time, rather than recalculating the whole window from scratch every second.',
      interviewTakeaways: [
        'Running State Maintenance: Sliding a fixed window of size $K$ updates sum/state in $O(1)$ time by adding the incoming element (`nums[i]`) and subtracting the outgoing element (`nums[i - K]`), achieving $O(N)$ time instead of $O(N \\times K)$.',
        'Initial Window Bootstrapping: Always compute the state of the first $K$ elements ($i = 0$ to $K - 1$) before entering the sliding loop.',
        'Frequency Vector Comparison: Fixed window anagram matching compares two size-26 integer arrays in $O(26) = O(1)$ time per shift.',
        'Sliding Window Maximum ($O(N)$): A Monotonic Decreasing Deque storing indices maintains the maximum element at the head (`deque.peekFirst()`) in amortized $O(1)$ time per element.',
        'Integer Overflow Prevention: When computing sum of $K$ elements, use a 64-bit `long` accumulator to prevent 32-bit `int` overflow when $K \\times \\max(arr) > 2^{31}-1$.',
        'Boundary Index Alignment: The answer for window ending at `i` corresponds to starting index `i - K + 1`.'
      ],
      cheatSheet: {
        summary: 'Fixed sliding window slides a window of size K across an array in O(N) time. Add incoming element at right, subtract outgoing element at left.',
        syntaxTemplate: `// Standard Fixed Sliding Window Template (Size K)
int windowSum = 0;
for (int i = 0; i < k; i++) {
    windowSum += nums[i]; // Bootstrap initial window
}
int maxSum = windowSum;

for (int i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // Add incoming, subtract outgoing
    maxSum = Math.max(maxSum, windowSum);
}`,
        rules: [
          { rule: 'Add Right, Subtract Left', explanation: 'At index $i \\ge K$, add `nums[i]` and subtract `nums[i - K]`.' },
          { rule: 'Bootstrap First Window', explanation: 'Pre-compute window state for indices $0$ to $K - 1$ before sliding.' },
          { rule: 'Monotonic Deque Pruning', explanation: 'Before adding `i` to deque, pop all indices from tail whose values are $\\le nums[i]$.' },
          { rule: 'Deque Expiry Pruning', explanation: 'If `deque.peekFirst() <= i - K`, poll the head as it has expired from the window.' },
          { rule: 'Avoid Floating Point Inaccuracies', explanation: 'Compare `windowSum >= threshold * K` instead of `windowSum / K >= threshold`.' }
        ],
        quickComparison: [
          { aspect: 'Max Sum Subarray of Size K', optionA: 'Brute Force: $O(N \\times K)$ Time', optionB: 'Sliding Window: $O(N)$ Time, $O(1)$ Space' },
          { aspect: 'Sliding Window Maximum', optionA: 'Max-Heap (PriorityQueue): $O(N \\log K)$ Time', optionB: 'Monotonic Deque: $O(N)$ Time, $O(K)$ Space' },
          { aspect: 'Anagram Search in String', optionA: 'Substring Sorting: $O(N \\times K \\log K)$', optionB: 'Fixed Window Counts: $O(26 \\times N) = O(N)$' },
          { aspect: 'Subarray Average Check', optionA: 'Floating division: potential precision bug', optionB: 'Integer multiplication $K \\times threshold$' }
        ]
      },
      coreExplanation: [
        'The Fixed-Size Sliding Window pattern is used when problems ask for contiguous subarray properties of an exact predefined length $K$.',
        'Brute-force recomputation of every window takes $O(K)$ time per window, yielding $O(N \\times K)$ total time. For $N = 10^5$ and $K = 5 \\times 10^4$, this results in $5 \\times 10^9$ operations (Time Limit Exceeded).',
        'Sliding Window observes that adjacent windows overlap by $K - 1$ elements. Transitioning from window $[i - K, i - 1]$ to $[i - K + 1, i]$ requires exactly two arithmetic operations: subtracting `nums[i - K]` and adding `nums[i]`, completing each step in $O(1)$ time.',
        'For Sliding Window Maximum, a naive PriorityQueue takes $O(\\log K)$ per shift ($O(N \\log K)$ total) and requires $O(K)$ lazy removal. A Monotonic Deque achieves true $O(N)$ amortized time: indices are maintained in strictly decreasing order of values, so `deque.peekFirst()` always contains the maximum.',
        'When adding element $x$ at index $i$, all smaller elements at the tail of the deque can NEVER become the maximum in any future window containing $x$, because $x$ is larger and lives longer! Thus, they can be safely removed immediately.',
        'For anagram detection, two size-26 frequency arrays represent character counts. `Arrays.equals(pCount, sCount)` runs in exactly 26 operations ($O(1)$), allowing $O(N)$ anagram location.',
        'Cache Line Efficiency: Fixed sliding window sequentially reads contiguous array elements with constant spatial stride, keeping memory bandwidth optimal.'
      ],
      diagram: `Fixed Window Sliding (K = 3):
Array: [ 2,  1,  5,  1,  3,  2 ]

Window 0: [ 2,  1,  5 ] -> Sum = 8
            └───────┘

Window 1: subtract 2, add 1:
                [ 1,  5,  1 ] -> Sum = 8 - 2 + 1 = 7
                  └───────┘

Window 2: subtract 1, add 3:
                      [ 5,  1,  3 ] -> Sum = 7 - 1 + 3 = 9 (Max!)
                        └───────┘

Window 3: subtract 5, add 2:
                            [ 1,  3,  2 ] -> Sum = 9 - 5 + 2 = 6
                              └───────┘`,
      codeSnippet: {
        title: 'Maximum Sum Subarray of Size K',
        code: `public class FixedSlidingWindow {
    public static int maxSumSubarray(int[] nums, int k) {
        if (nums.length < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];

        int maxSum = windowSum;
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
}`,
        lineByLineExplanation: [
          { line: 'for (int i = 0; i < k; i++) windowSum += nums[i];', explanation: 'Bootstraps initial sum of first k elements.' },
          { line: 'int maxSum = windowSum;', explanation: 'Initializes maxSum to the first window sum.' },
          { line: 'windowSum += nums[i] - nums[i - k];', explanation: 'Adds incoming element and subtracts outgoing element in O(1).' },
          { line: 'maxSum = Math.max(maxSum, windowSum);', explanation: 'Maintains running maximum across all windows.' },
          { line: 'return maxSum;', explanation: 'Returns global maximum subarray sum in O(N) time.' }
        ],
        output: 'Max Sum: 9'
      },
      codeExamples: [
        {
          title: 'Find All Anagrams in String',
          description: 'Tracks character frequencies in sliding window of size p.length().',
          code: `import java.util.*;

public class FindAnagrams {
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (s.length() < p.length()) return res;
        int[] pCount = new int[26], sCount = new int[26];
        for (char c : p.toCharArray()) pCount[c - 'a']++;

        int k = p.length();
        for (int i = 0; i < s.length(); i++) {
            sCount[s.charAt(i) - 'a']++;
            if (i >= k) sCount[s.charAt(i - k) - 'a']--;
            if (Arrays.equals(pCount, sCount)) res.add(i - k + 1);
        }
        return res;
    }
}`,
          output: 'Anagrams: [0, 6]'
        },
        {
          title: 'Sliding Window Maximum via Monotonic Deque',
          description: 'Maintains decreasing deque of indices for O(N) sliding window maximum.',
          code: `import java.util.*;

public class WindowMax {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] res = new int[n - k + 1];
        Deque<Integer> q = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            if (!q.isEmpty() && q.peekFirst() <= i - k) q.pollFirst();
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();
            q.offerLast(i);
            if (i >= k - 1) res[i - k + 1] = nums[q.peekFirst()];
        }
        return res;
    }
}`,
          output: 'Window Max: [3, 3, 5, 5, 6, 7]'
        }
      ],
      beginnerMistakes: [
        {
          mistake: 'Subtracting nums[i - k - 1] instead of nums[i - k] when sliding',
          whyItHappens: 'Off-by-one error regarding the index of the element departing the window.',
          howToFix: 'When loop starts at $i = K$, the outgoing element is strictly at index $i - K$.'
        },
        {
          mistake: 'Re-summing all elements inside the window on every iteration',
          whyItHappens: 'Forgetting to subtract the leaving element, falling back to $O(N \\times K)$ brute force.',
          howToFix: 'Maintain `windowSum += nums[i] - nums[i - k]` in $O(1)$ operations.'
        },
        {
          mistake: 'Using a PriorityQueue for Sliding Window Maximum in time-critical interviews',
          whyItHappens: 'Not knowing the Monotonic Deque pattern, resulting in $O(N \\log K)$ time and TLE.',
          howToFix: 'Use `ArrayDeque` to maintain monotonically decreasing indices in $O(N)$ amortized time.'
        }
      ],
      practiceProblems: [
        {
          title: 'Puzzle 1: Fixed Window Update Formula',
          problemStatement: 'In window of size $K=4$ at index $i=7$, which element is added and which is subtracted?',
          options: [
            'Add nums[7], subtract nums[3]',
            'Add nums[7], subtract nums[4]',
            'Add nums[8], subtract nums[4]',
            'Add nums[6], subtract nums[3]'
          ],
          correctOptionIndex: 0,
          hint: 'Incoming is nums[i] = nums[7]; outgoing is nums[i - K] = nums[7 - 4] = nums[3].',
          solution: '`windowSum += nums[7] - nums[3]`.',
          explanation: 'The new element at index 7 enters, and the element at index 3 exits.'
        },
        {
          title: 'Puzzle 2: Monotonic Deque Element Invalidation',
          problemStatement: 'In Monotonic Deque for Sliding Window Maximum, why are elements smaller than `nums[i]` popped from the tail?',
          options: [
            'Because they are smaller and will expire earlier or at the same time as `nums[i]`, so they can never be the maximum again.',
            'To sort the deque in ascending order.',
            'To prevent integer overflow.',
            'Because the deque capacity is limited to 2.'
          ],
          correctOptionIndex: 0,
          hint: 'nums[i] is larger and will stay in future windows longer than those smaller elements.',
          solution: 'An older, smaller element is completely dominated by nums[i] and can never be the window maximum.',
          explanation: 'Dominated elements are discarded, maintaining monotonic decreasing order.'
        },
        {
          title: 'Puzzle 3: Anagram Frequency Vector Size',
          problemStatement: 'What is the time complexity of `Arrays.equals(count1, count2)` when comparing 26 lowercase English letters?',
          options: ['$O(1)$', '$O(N)$', '$O(K)$', '$O(N \\log N)$'],
          correctOptionIndex: 0,
          hint: '26 is a constant.',
          solution: 'Comparing two fixed 26-element arrays takes exactly 26 operations, which is $O(1)$ constant time.',
          explanation: 'Fixed alphabet sizes yield $O(1)$ comparisons.'
        },
        {
          title: 'Puzzle 4: Number of Windows of Size K',
          problemStatement: 'How many contiguous subarrays of size $K$ exist in an array of length $N$ ($N \\ge K$)?',
          options: ['$N - K + 1$', '$N - K$', '$N / K$', '$N + K - 1$'],
          correctOptionIndex: 0,
          hint: 'The first window starts at 0, the last window starts at N - K.',
          solution: 'Indices range from 0 to $N - K$ inclusive, yielding $N - K + 1$ total windows.',
          explanation: 'There are exactly $N - K + 1$ valid windows.'
        },
        {
          title: 'Puzzle 5: Deque Expiry Condition',
          problemStatement: 'When window has slid to index $i$, when is the head index `deque.peekFirst()` expired?',
          options: [
            '`deque.peekFirst() <= i - K`',
            '`deque.peekFirst() >= i`',
            '`deque.peekFirst() == i`',
            '`deque.peekFirst() < 0`'
          ],
          correctOptionIndex: 0,
          hint: 'Current window spans indices from i - K + 1 to i.',
          solution: 'Any index $\\le i - K$ lies outside the current window $[i - K + 1, i]$ and must be popped.',
          explanation: 'Indices $\\le i - K$ have fallen behind the window.'
        },
        {
          title: 'Puzzle 6: Monotonic Deque Amortized Analysis',
          problemStatement: 'What is the amortized number of times each element is pushed and popped from the Monotonic Deque?',
          options: [
            'Each element is pushed once and popped at most once ($O(1)$ amortized).',
            '$O(K)$ times per element.',
            '$O(\\log K)$ times per element.',
            '$O(N)$ times per element.'
          ],
          correctOptionIndex: 0,
          hint: 'Every element enters the deque once and leaves it once.',
          solution: 'Across the entire algorithm, $N$ elements are pushed once and popped at most once, yielding $2N$ operations ($O(1)$ amortized per step).',
          explanation: 'Aggregate operations are bounded by $2N$, giving $O(N)$ total time.'
        },
        {
          title: 'Puzzle 7: Integer Overflow in Window Sum',
          problemStatement: 'If array elements are up to $10^9$ and $K = 5$, what data type must `windowSum` be to prevent overflow in Java?',
          options: ['long', 'int', 'short', 'byte'],
          correctOptionIndex: 0,
          hint: '$5 \\times 10^9 > 2^{31} - 1 \\approx 2.14 \\times 10^9$.',
          solution: 'The maximum sum ($5 \\times 10^9$) exceeds Integer.MAX_VALUE, requiring a 64-bit `long`.',
          explanation: 'Using `int` will overflow into negative values.'
        },
        {
          title: 'Puzzle 8: Max Average Subarray Division',
          problemStatement: 'Why is it better to compute `maxSum` first and divide by `K` once at the end, rather than tracking running averages?',
          options: [
            'Avoids floating-point precision inaccuracies and costly floating-point divisions on every step.',
            'Floating point numbers cannot be stored in arrays.',
            'Java disables double division in loops.',
            'To make the code compile on 16-bit systems.'
          ],
          correctOptionIndex: 0,
          hint: 'Integer arithmetic is exact and faster than floating-point math.',
          solution: 'Performing integer arithmetic avoids precision drift and improves CPU performance.',
          explanation: 'Dividing once at the end is mathematically exact and computationally optimal.'
        },
        {
          title: 'Puzzle 9: First Negative in Window Queue Size',
          problemStatement: 'In First Negative Number in Window of Size K, what is stored in the auxiliary queue?',
          options: [
            'Indices of negative numbers within the current window.',
            'All numbers in the window.',
            'Only positive numbers.',
            'The sum of the window.'
          ],
          correctOptionIndex: 0,
          hint: 'Tracking indices allows easy expiry checks when index <= i - K.',
          solution: 'Storing indices allows instant expiration when they fall outside the current window.',
          explanation: 'Indices identify both the value and its window expiration status.'
        },
        {
          title: 'Puzzle 10: Diet Plan Performance Boundary',
          problemStatement: 'In Diet Plan Performance, if `lower = 3`, `upper = 5`, and window sum is 4, what points are awarded?',
          options: ['0 points', '+1 point', '-1 point', '+2 points'],
          correctOptionIndex: 0,
          hint: 'Points are gained if sum > upper, and lost if sum < lower.',
          solution: 'Since 3 <= 4 <= 5, no points are gained or lost (0 points).',
          explanation: 'Sum falls strictly between lower and upper thresholds.'
        }
      ],
      interviewQuestions: [
        {
          question: 'What is the core intuition behind the Sliding Window pattern and when should it be applied?',
          answer: 'The core intuition is re-using overlapping computation between adjacent contiguous subarrays. Instead of recalculating the entire state for a new window in $O(K)$ time, sliding the window by 1 index simply adds the incoming element and removes the outgoing element in $O(1)$ time. It should be applied when a problem asks for an aggregate (sum, average, max, min, frequency, anagram) over contiguous subarrays or substrings of fixed length $K$.',
          followUp: 'Can sliding window be applied to non-contiguous subsequences?',
          followUpAnswer: 'No; sliding window strictly requires spatial contiguity because elements must enter and exit in sequential order.',
          keyPhrases: ['Re-using overlapping computation', 'Contiguous subarrays', 'O(1) state transition', 'Add incoming subtract outgoing'],
          commonMistakeAnswer: 'Trying to apply sliding window to subsets or non-contiguous elements.'
        },
        {
          question: 'Explain how a Monotonic Deque solves Sliding Window Maximum in $O(N)$ time instead of $O(N \\log K)$ with a Heap.',
          answer: 'A PriorityQueue takes $O(\\log K)$ per insertion and $O(K)$ for arbitrary removal in Java (or $O(\\log K)$ with lazy deletion), giving $O(N \\log K)$ time. A Monotonic Deque maintains indices in strictly decreasing order of values. When a new element `nums[i]` arrives: 1) Any expired index at the head (`index <= i - K`) is removed in $O(1)$; 2) All indices from the tail whose values are $\\le nums[i]$ are popped because `nums[i]` is both larger and will stay in the window longer; 3) `i` is added to the tail. The maximum is always at `deque.peekFirst()` in $O(1)$. Since every index enters and leaves the deque at most once, total time is amortized $O(N)$ with $O(K)$ space.',
          followUp: 'Why does ArrayDeque perform better than LinkedList for this deque?',
          followUpAnswer: 'ArrayDeque is backed by a contiguous circular array, providing superior cache locality and avoiding linked node object allocation overhead.',
          keyPhrases: ['Monotonic decreasing order', 'Dominated elements discarded', 'Amortized O(1) per step', 'ArrayDeque cache locality'],
          commonMistakeAnswer: 'Suggesting a max heap and claiming it runs in O(N) time.'
        },
        {
          question: 'How do you detect all anagram occurrences of string $P$ in string $S$ in $O(|S|)$ time?',
          answer: 'Two strings are anagrams if and only if their character frequency counts are identical. Since $P$ has a fixed length $K = |P|$, any anagram in $S$ must be a contiguous substring of length $K$. We maintain two frequency arrays of size 26 (`pCount` and `sCount`). We bootstrap `pCount` and the first $K$ characters of $S$. Then, we slide the window across $S$: at each step $i \\ge K$, increment `sCount[s.charAt(i) - \'a\']` and decrement `sCount[s.charAt(i - K) - \'a\']`. Comparing `Arrays.equals(pCount, sCount)` takes exactly 26 operations ($O(1)$). Total time is $O(26 \\times |S|) = O(|S|)$ with $O(1)$ extra space.',
          followUp: 'Can you optimize the 26-array comparison to true O(1) without comparing 26 items?',
          followUpAnswer: 'Yes, by maintaining a `matches` counter tracking how many of the 26 characters have identical counts between both strings.',
          keyPhrases: ['Fixed length K', 'Frequency array of size 26', 'Add incoming subtract outgoing', 'O(1) comparison'],
          commonMistakeAnswer: 'Sorting every substring of length K, which takes O(N * K log K) time.'
        },
        {
          question: 'What is the danger of integer overflow in sliding window sum problems and how do you mitigate it?',
          answer: 'In Java, a signed 32-bit `int` overflows at $2^{31} - 1 \\approx 2.14 \\times 10^9$. If an array contains $10^5$ elements each with value $10^5$, or $K = 10^5$ with values $10^9$, the window sum can reach $10^{14}$, which severely overflows into negative values. To mitigate this, accumulator variables (`windowSum`, `maxSum`) must be declared as 64-bit `long`. When converting back to average or integer results, perform division before casting.',
          followUp: 'Does casting to long inside the loop prevent overflow if the array is int[]?',
          followUpAnswer: 'Yes, because adding an `int` to a `long` automatically promotes the operation to 64-bit arithmetic.',
          keyPhrases: ['Integer.MAX_VALUE overflow', '64-bit long accumulator', 'Silent negative wrap-around', 'Type promotion'],
          commonMistakeAnswer: 'Assuming int is sufficient because individual array elements fit inside int.'
        },
        {
          question: 'How do you find the first negative number in every window of size $K$ in $O(N)$ time?',
          answer: 'We use a queue (or `ArrayDeque`) to store the indices of negative numbers. As we iterate through the array: 1) Expire indices from the queue head that are $\\le i - K$; 2) If `arr[i] < 0`, append `i` to the queue tail; 3) Once the first window is formed ($i \\ge K - 1$), the first negative number is `arr[queue.peek()]` if the queue is non-empty, or `0` if empty. Because each negative index is added and removed at most once, the algorithm executes in $O(N)$ time and $O(K)$ space.',
          followUp: 'Can this be done in O(1) auxiliary space without a queue?',
          followUpAnswer: 'Yes, by tracking a pointer to the first negative index and advancing it only when it falls outside the window or after being consumed.',
          keyPhrases: ['Queue of negative indices', 'Index expiration <= i - K', 'Amortized O(1) query', 'First negative lookup'],
          commonMistakeAnswer: 'Scanning backwards up to K elements for every window, which takes O(N * K) time.'
        },
        {
          question: 'Why should you compare `windowSum >= threshold * K` instead of `(double) windowSum / K >= threshold`?',
          answer: 'Performing `windowSum >= threshold * K` uses pure integer arithmetic, which is completely exact, faster to execute on CPU ALU execution units, and immune to IEEE 754 floating-point rounding errors. Floating-point division can introduce precision drift (e.g. `1.9999999999999998` instead of `2.0`), which may cause edge-case conditional failures.',
          followUp: 'When would threshold * K be dangerous?',
          followUpAnswer: 'When `threshold * K` can exceed `Integer.MAX_VALUE`, in which case the product must be computed using `long`.',
          keyPhrases: ['Exact integer arithmetic', 'IEEE 754 precision drift', 'ALU execution speed', 'Integer multiplication'],
          commonMistakeAnswer: 'Using double division inside tight loops without considering precision errors.'
        },
        {
          question: 'What is the difference between Fixed-Size Sliding Window and Dynamic Sliding Window?',
          answer: 'In a Fixed-Size Sliding Window, the window width $K$ is constant; both left and right pointers advance simultaneously on each step after the initial bootstrap ($left = i - K + 1$, $right = i$). In a Dynamic Sliding Window, the window size expands and contracts variably based on condition invariants: the `right` pointer expands the window to satisfy a condition, and the `left` pointer contracts the window when the invariant is violated or to optimize a minimum/maximum length.',
          followUp: 'Can a fixed sliding window problem be solved using dynamic sliding window logic?',
          followUpAnswer: 'Yes, but it adds unnecessary branching complexity; fixed window bounds can be maintained with simple direct index math ($i - K$).',
          keyPhrases: ['Constant K width vs variable width', 'Simultaneous advance vs conditional contraction', 'Invariant-driven resizing'],
          commonMistakeAnswer: 'Treating all sliding window problems with while loops for left pointer contraction.'
        },
        {
          question: 'How do you handle K-Radius Subarray Averages when $K$ is very large relative to array length?',
          answer: 'The window size for radius $K$ is $2K + 1$. If $2K + 1 > N$, no element can have $K$ elements on both its left and right sides; we can immediately return an array filled with `-1` in $O(N)$ time. Otherwise, indices from $0$ to $K - 1$ and $N - K$ to $N - 1$ cannot have full radius, so they remain `-1`. Only indices $i$ from $K$ to $N - K - 1$ have valid windows of size $2K + 1$, which are computed via sliding window in $O(N)$ time.',
          followUp: 'What is the sum data type required for K-radius averages?',
          followUpAnswer: 'Since window size is $2K + 1 \\le 10^5$ and elements can be $10^5$, sum can reach $10^{10}$, requiring a 64-bit `long`.',
          keyPhrases: ['Window size 2K + 1', 'Boundary padding -1', 'Immediate size check', '64-bit long sum'],
          commonMistakeAnswer: 'Trying to compute partial averages for elements near the boundaries.'
        },
        {
          question: 'How does sliding window benefit CPU cache locality compared to random subarray access?',
          answer: 'Sliding window accesses array elements with a unit stride ($i, i+1, i+2...$). CPU hardware prefetchers recognize this predictable forward pattern and preload contiguous 64-byte cache lines from main RAM into L1 and L2 caches well before the CPU executes the instructions. This eliminates cache miss stalls, making sliding window algorithms run at memory bus wire speeds.',
          followUp: 'What is the memory footprint of an ArrayDeque with capacity K in Java?',
          followUpAnswer: 'An ArrayDeque with power-of-two capacity $C \\ge K$ allocates an internal `Object[]` array of size $C$, consuming $16 + 4C$ bytes (with compressed oops), which easily fits into L1/L2 CPU cache.',
          keyPhrases: ['Unit stride prefetching', '64-byte cache lines', 'Zero cache miss stalls', 'L1/L2 cache residency'],
          commonMistakeAnswer: 'Thinking that array traversal speed is only determined by the number of loop iterations.'
        },
        {
          question: 'Can you use the sliding window technique on streams where elements arrive one-by-one in real-time?',
          answer: 'Yes! Sliding window is the foundation of stream processing engines (e.g. Apache Flink, Kafka Streams). Because the fixed window only needs the most recent $K$ elements in memory (stored in a circular ring buffer or deque), it can process infinite unbounded real-time streams in $O(1)$ time per event with bounded $O(K)$ memory, without storing the full history.',
          followUp: 'What data structure is ideal for sliding window over unbounded streams?',
          followUpAnswer: 'A circular array ring buffer where `head = (head + 1) % K`, continuously overwriting expired entries.',
          keyPhrases: ['Stream processing', 'Unbounded data streams', 'Circular ring buffer', 'Bounded O(K) memory'],
          commonMistakeAnswer: 'Assuming all data must be loaded into memory before processing.'
        }
      ],
      miniQuiz: [
        {
          question: 'What is the time complexity of updating a fixed-size sliding window sum of size $K$?',
          options: [
            '$O(1)$',
            '$O(K)$',
            '$O(\\log K)$',
            '$O(N)$'
          ],
          correctIndex: 0,
          explanation: 'Adding the incoming element and subtracting the outgoing element takes constant $O(1)$ time.'
        },
        {
          question: 'What is the index of the element exiting the window when the current index is $i$ and window size is $K$?',
          options: [
            '`i - K`',
            '`i - K + 1`',
            '`i - K - 1`',
            '`i + K`'
          ],
          correctIndex: 0,
          explanation: 'The element leaving the window is strictly at index `i - K`.'
        },
        {
          question: 'What is the time complexity of Sliding Window Maximum using a Monotonic Deque?',
          options: [
            '$O(N)$',
            '$O(N \\log K)$',
            '$O(N \\times K)$',
            '$O(N^2)$'
          ],
          correctIndex: 0,
          explanation: 'Each element enters and leaves the deque at most once, yielding amortized $O(N)$ time.'
        },
        {
          question: 'In Monotonic Deque, what order is maintained among the values of stored indices?',
          options: [
            'Monotonically decreasing.',
            'Monotonically increasing.',
            'Random order.',
            'Alternating odd and even.'
          ],
          correctIndex: 0,
          explanation: 'A decreasing order ensures that `peekFirst()` always returns the maximum value.'
        },
        {
          question: 'Why is `Arrays.equals(count1, count2)` $O(1)$ in lowercase anagram detection?',
          options: [
            'Because the alphabet size is a fixed constant of 26.',
            'Because the strings are hashed.',
            'Because Java implements SIMD vectorization.',
            'Because the array length is dynamic.'
          ],
          correctIndex: 0,
          explanation: 'Comparing two fixed 26-element arrays takes constant 26 operations ($O(1)$).'
        },
        {
          question: 'What is the total number of windows of size $K$ in an array of size $N$?',
          options: [
            '$N - K + 1$',
            '$N - K$',
            '$N / K$',
            '$N \\times K$'
          ],
          correctIndex: 0,
          explanation: 'The window starts at indices 0 through $N - K$, giving $N - K + 1$ total windows.'
        },
        {
          question: 'What potential bug occurs if `windowSum` is stored in an `int` when $K = 10^5$ and values are $10^5$?',
          options: [
            'Integer overflow wrapping to negative values.',
            'ArrayIndexOutOfBoundsException.',
            'NullPointerException.',
            'Division by zero.'
          ],
          correctIndex: 0,
          explanation: 'The sum reaches $10^{10}$, which exceeds 32-bit `Integer.MAX_VALUE` ($2.14 \\times 10^9$).'
        },
        {
          question: 'What data structure is recommended for implementing a Monotonic Deque in Java?',
          options: [
            '`java.util.ArrayDeque`',
            '`java.util.Stack`',
            '`java.util.Vector`',
            '`java.util.PriorityQueue`'
          ],
          correctIndex: 0,
          explanation: '`ArrayDeque` is unsynchronized and backed by a circular array, offering superior CPU cache locality.'
        },
        {
          question: 'How do you check if `windowSum` of size $K$ meets or exceeds `threshold` without floating point precision issues?',
          options: [
            '`windowSum >= threshold * K`',
            '`(double) windowSum / K >= threshold`',
            '`windowSum / K == threshold`',
            '`windowSum % K >= threshold`'
          ],
          correctIndex: 0,
          explanation: 'Multiplying by $K$ keeps all arithmetic in exact integers.'
        },
        {
          question: 'In First Negative Number in Window of Size K, what does the queue contain?',
          options: [
            'Indices of negative numbers within the current window.',
            'All numbers in the array.',
            'Only positive numbers.',
            'The sum of the window.'
          ],
          correctIndex: 0,
          explanation: 'Tracking indices allows instant identification and expiration when they fall behind the window.'
        }
      ]
    },

  // ─────────────────────────────────────────────────────────────
  // LESSON 17.4: Sliding Window: Dynamic Window & Invariants
  // ─────────────────────────────────────────────────────────────
  'dynamic-sliding-window': {
    id: 'dynamic-sliding-window',
    moduleId: 'java-dsa-patterns',
    moduleTitle: '17. Two Pointers & Sliding Window',
    lessonNumber: 'Lesson 17.4',
    title: 'Sliding Window: Dynamic Window & Invariants',
    subtitle: 'Variable-size sliding window, expansion and contraction invariants, Longest Substring Without Repeating Characters, Minimum Window Substring, and exact-K decomposition',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Imagine an accordion player stretching and squeezing an accordion. The right hand pulls the bellows outward to bring in more air (expanding the window to incorporate more elements). As long as the musical notes sound harmonious (the window invariant holds), the player keeps expanding. But the moment a discordant note appears (a duplicate character or constraint violation), the left hand squeezes inward (contracting the window from the left) until harmony is restored. By dynamically stretching and squeezing across the song, the accordionist finds the longest harmonious melody in a single pass!',
    interviewTakeaways: [
      'Two-Phase Invariant: 1) Expand `right` pointer to include elements and grow the window; 2) When the window violates the required condition (or to minimize length when valid), contract `left` pointer until the invariant is restored.',
      'Amortized $O(N)$ Complexity: Even though there is a nested `while` loop contracting `left`, both `left` and `right` advance strictly forward from $0$ to $N$. Each element enters and leaves the window at most once, guaranteeing strictly $2N = O(N)$ total operations.',
      'Last Seen Index Jump: In Longest Substring Without Repeating Characters, storing `lastSeenIndex` in an array allows jumping `left = lastSeen[c] + 1` directly past the duplicate, bypassing step-by-step contraction.',
      'Minimum Window Substring Pattern: Use a `formed == required` match counter to verify all character requirements in $O(1)$ time per step instead of comparing frequency maps.',
      'Exact-K via At-Most Decomposition: Counting subarrays with exactly $K$ distinct elements equals `atMost(K) - atMost(K - 1)`.',
      'Contiguous Subarray Contribution: Any valid window from `left` to `right` contributes exactly `right - left + 1` new valid subarrays ending at `right`.'
    ],
    cheatSheet: {
      summary: 'Dynamic sliding window expands right and contracts left based on condition invariants. Runs in amortized O(N) time with O(1) or O(K) space.',
      syntaxTemplate: `// Standard Dynamic Sliding Window Template
int left = 0, result = 0;
for (int right = 0; right < arr.length; right++) {
    // 1. Add arr[right] to window state
    add(arr[right]);

    // 2. Contract left while window is invalid
    while (isInvalid()) {
        remove(arr[left]);
        left++;
    }

    // 3. Update result with valid window
    result = Math.max(result, right - left + 1);
}`,
      rules: [
        { rule: 'Monotonic Forward Motion', explanation: 'Neither `left` nor `right` ever moves backward. This guarantees amortized $O(N)$ linear time.' },
        { rule: 'Add Before Contracting', explanation: 'Always incorporate `arr[right]` into state first before evaluating the contraction condition.' },
        { rule: 'Contract Until Valid', explanation: 'The `while` loop must contract `left` until the window invariant is strictly re-established.' },
        { rule: 'Exact K Decomposition', explanation: 'Convert `exactly(K)` problems into `atMost(K) - atMost(K - 1)` for clean $O(N)$ sliding windows.' },
        { rule: 'Subarray Counting Formula', explanation: 'A valid window $[left, right]$ adds `right - left + 1` subarrays ending at `right`.' }
      ],
      quickComparison: [
        { aspect: 'Longest Substring Without Repeats', optionA: 'Brute Force Substrings: $O(N^3)$ Time', optionB: 'Dynamic Window: $O(N)$ Time, $O(1)$ Space' },
        { aspect: 'Minimum Window Substring', optionA: 'Map Comparison per shift: $O(|S| \\times |T|)$', optionB: 'Formed Counter: $O(|S| + |T|)$ Time' },
        { aspect: 'Subarrays with K Distinct', optionA: 'Two Pointers direct: hard to track', optionB: '`atMost(k) - atMost(k-1)`: Clean $O(N)$' },
        { aspect: 'Max Consecutive Ones III', optionA: 'Flip simulation: $O(N^2)$ Time', optionB: 'Zero count window: $O(N)$ Time, $O(1)$ Space' }
      ]
    },
    coreExplanation: [
      'The Dynamic (Variable-Size) Sliding Window pattern is used when problems ask for the longest, shortest, or count of contiguous subarrays meeting an invariant condition.',
      'Unlike fixed windows where the window size $K$ is constant, dynamic windows grow and shrink adaptively based on data values.',
      'The core algorithm consists of three phases: 1) Expand `right` to incorporate a new element; 2) Contract `left` while the window violates the constraint (for longest valid window) OR while the window satisfies the constraint (for shortest valid window); 3) Update the answer using current window length `right - left + 1`.',
      'Amortized Analysis Proof: Even though the algorithm contains a nested `while` loop (`while (invalid) left++;`), `left` starts at 0 and increments at most $N$ times across the entire execution. `right` also increments at most $N$ times. Total operations are $N + N = 2N = O(N)$.',
      'In Longest Substring Without Repeating Characters, an array of size 128 tracks the last seen index of every ASCII character. If character `c` was seen at `idx >= left`, we can jump `left = idx + 1` in $O(1)$ without an inner while loop.',
      'In Minimum Window Substring, we maintain a `formed` variable tracking how many unique characters have satisfied their required frequency. When `formed == required`, the window is valid, and we contract `left` while recording the minimum window found.',
      'In Subarray Counting problems (e.g. Subarrays with K Distinct Elements), exact counts are hard to track directly with sliding window because shrinking `left` can produce multiple valid answers. Decomposing into `atMost(K) - atMost(K - 1)` solves both subproblems monotonically in $O(N)$ time.'
    ],
    diagram: `Dynamic Sliding Window (Max Subarray with at most 1 Zero):
Array: [ 1,  0,  1,  1,  0,  1 ]

Step 1: right = 0 (val 1) -> zeroCount = 0 -> len = 1
 [ 1 ]

Step 2: right = 1 (val 0) -> zeroCount = 1 -> len = 2
 [ 1,  0 ]

Step 3: right = 2 (val 1) -> zeroCount = 1 -> len = 3
 [ 1,  0,  1 ]

Step 4: right = 3 (val 1) -> zeroCount = 1 -> len = 4
 [ 1,  0,  1,  1 ]

Step 5: right = 4 (val 0) -> zeroCount = 2 (> 1) -> CONTRACT LEFT!
 left was 0 (val 1) -> left becomes 1
 left was 1 (val 0) -> zeroCount becomes 1, left becomes 2
 [ 1,  1,  0 ] -> valid again! len = 3

Step 6: right = 5 (val 1) -> zeroCount = 1 -> len = 4
 [ 1,  1,  0,  1 ]

Max Length = 4`,
    codeSnippet: {
      title: 'Longest Substring Without Repeating Characters',
      code: `public class LongestUniqueSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[128];
        java.util.Arrays.fill(lastIndex, -1);
        int maxLen = 0, left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1; // Jump past duplicate
            }
            lastIndex[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      lineByLineExplanation: [
        { line: 'int[] lastIndex = new int[128];', explanation: 'Creates direct-mapped table of last seen ASCII indices initialized to -1.' },
        { line: 'for (int right = 0; right < s.length(); right++)', explanation: 'Expands window right boundary character by character.' },
        { line: 'if (lastIndex[c] >= left) left = lastIndex[c] + 1;', explanation: 'Jumps left pointer past previous occurrence if within current window.' },
        { line: 'lastIndex[c] = right;', explanation: 'Records current character position.' },
        { line: 'maxLen = Math.max(maxLen, right - left + 1);', explanation: 'Maintains running maximum valid substring length.' }
      ],
      output: 'Max Length: 3'
    },
    codeExamples: [
      {
        title: 'Minimum Size Subarray Sum',
        description: 'Finds the minimal length subarray whose sum is >= target.',
        code: `public class MinSubArrayLen {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0, minLen = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,
        output: 'Min Length: 2'
      },
      {
        title: 'Minimum Window Substring (FAANG Hard)',
        description: 'Finds smallest substring containing all characters of target string T.',
        code: `public class MinWindowSubstring {
    public static String minWindow(String s, String t) {
        int[] tCount = new int[128];
        for (char c : t.toCharArray()) tCount[c]++;
        int required = 0;
        for (int c : tCount) if (c > 0) required++;

        int[] sCount = new int[128];
        int formed = 0, left = 0, minLen = Integer.MAX_VALUE, start = 0;

        for (int right = 0; right < s.length(); right++) {
            char r = s.charAt(right);
            sCount[r]++;
            if (tCount[r] > 0 && sCount[r] == tCount[r]) formed++;

            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    start = left;
                }
                char l = s.charAt(left);
                sCount[l]--;
                if (tCount[l] > 0 && sCount[l] < tCount[l]) formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);
    }
}`,
        output: 'Min Window: BANC'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Incrementing both left and right inside the same loop without while contraction',
        whyItHappens: 'Treating dynamic sliding window as a fixed window, missing optimal contraction points.',
        howToFix: 'Use a `for` loop for `right`, and an inner `while` loop contracting `left` whenever the invariant is violated.'
      },
      {
        mistake: 'Jumping left backwards in Longest Substring Without Repeating Characters',
        whyItHappens: 'Setting `left = lastIndex[c] + 1` without checking if `lastIndex[c] >= left`.',
        howToFix: 'Only update `left` if the duplicate occurs within the current window: `if (lastIndex[c] >= left) left = lastIndex[c] + 1;`.'
      },
      {
        mistake: 'Trying to track exact-K directly with sliding window in Subarrays with K Distinct',
        whyItHappens: 'Contracting `left` on exact match shrinks the window prematurely, missing sub-combinations.',
        howToFix: 'Decompose the problem into `atMost(K) - atMost(K - 1)`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Dynamic Window Contraction Count',
        problemStatement: 'In `nums = [2, 3, 1, 2, 4, 3]` with target `7`, how many times does `left` increment when `right = 4` (val 4, window [2, 3, 1, 2, 4], sum = 12)?',
        options: ['1 time', '2 times', '3 times', '4 times'],
        correctOptionIndex: 2,
        hint: 'Sum is 12. Sum >= 7: subtract 2 (sum 10), subtract 3 (sum 7), subtract 1 (sum 6 < 7).',
        solution: 'left advances 3 times: past 2, past 3, and past 1 until sum drops to 6.',
        explanation: 'Three contractions occur: sum goes 12 -> 10 -> 7 -> 6, leaving left at index 3.'
      },
      {
        title: 'Puzzle 2: Longest Substring Last Index Jump',
        problemStatement: 'In `"abba"`, when `right = 3` (character \'a\'), `lastIndex[\'a\'] = 0`. What should `left` be?',
        options: [
          'left remains at index 2 (past \'b\') because lastIndex[\'a\'] (0) < left (2)',
          'left jumps back to 1',
          'left jumps to 0',
          'left jumps to 3'
        ],
        correctOptionIndex: 0,
        hint: 'left cannot move backwards! If lastIndex < left, the duplicate was already excluded.',
        solution: 'Since `lastIndex[\'a\'] < left`, the previous \'a\' is outside the active window, so left does not move backwards.',
        explanation: 'The check `lastIndex[c] >= left` prevents the left pointer from moving backwards.'
      },
      {
        title: 'Puzzle 3: Subarray Product Less Than K Empty Case',
        problemStatement: 'What does Subarray Product Less Than K return if `k <= 1` for an array of positive integers?',
        options: ['0', '1', '-1', 'Array length'],
        correctOptionIndex: 0,
        hint: 'Positive integers have minimum value 1. Any product is >= 1, so no product can be strictly < 1.',
        solution: 'Since elements are positive, the minimum possible product is 1, which cannot be strictly less than 1 or 0.',
        explanation: 'Returns 0 immediately for $k \\le 1$.'
      },
      {
        title: 'Puzzle 4: Subarrays Contributed by Window',
        problemStatement: 'If a valid window spans from index `left = 2` to `right = 5`, how many valid subarrays END at index 5?',
        options: ['4', '3', '5', '6'],
        correctOptionIndex: 0,
        hint: 'Formula is right - left + 1.',
        solution: 'Subarrays ending at index 5 start at indices 2, 3, 4, and 5: exactly $5 - 2 + 1 = 4$ subarrays.',
        explanation: 'Every element from left to right can serve as the starting point.'
      },
      {
        title: 'Puzzle 5: Max Consecutive Ones III Flip Invariant',
        problemStatement: 'In Max Consecutive Ones III with $K = 2$, when must the left pointer advance?',
        options: [
          'Whenever the count of zeroes in the window exceeds 2.',
          'Whenever a 1 is encountered.',
          'On every step.',
          'Never.'
        ],
        correctOptionIndex: 0,
        hint: 'The window is valid as long as at most K zeroes are present.',
        solution: 'When zeroes > K, the window contracts from the left until zeroes <= K.',
        explanation: 'Maintaining at most K zeroes allows all of them to be flipped to ones.'
      },
      {
        title: 'Puzzle 6: Minimum Window Substring Match Counter',
        problemStatement: 'In Minimum Window Substring, what does `formed == required` signify?',
        options: [
          'All unique characters in T are present in the current window with sufficient frequency.',
          'The window is exactly equal to T.',
          'The window length is equal to T length.',
          'The string S is exhausted.'
        ],
        correctOptionIndex: 0,
        hint: 'required is the count of unique chars in T; formed is how many meet the required count.',
        solution: 'It signifies that the current window is a valid superstring containing all characters of T.',
        explanation: 'The window satisfies all character frequency constraints of T.'
      },
      {
        title: 'Puzzle 7: Exact-K Decomposition Formula',
        problemStatement: 'How is the number of subarrays with exactly $K$ distinct integers computed using sliding window?',
        options: [
          '`atMost(K) - atMost(K - 1)`',
          '`atMost(K) + atMost(K - 1)`',
          '`atMost(K) * K`',
          '`atMost(K) / 2`'
        ],
        correctOptionIndex: 0,
        hint: 'Subarrays with exactly K distinct = (subarrays with <= K) - (subarrays with <= K - 1).',
        solution: 'Subtracting subarrays with at most $K - 1$ distinct from those with at most $K$ distinct leaves exactly $K$.',
        explanation: 'Exact $K$ decomposition into two monotonic sliding window passes.'
      },
      {
        title: 'Puzzle 8: Fruit Into Baskets Equivalence',
        problemStatement: 'Fruit Into Baskets is identical to which standard LeetCode problem?',
        options: [
          'Longest Substring with At Most 2 Distinct Characters',
          'Two Sum II',
          'Trapping Rain Water',
          'Merge Intervals'
        ],
        correctOptionIndex: 0,
        hint: 'Each basket holds 1 fruit type, and you have 2 baskets.',
        solution: 'Two baskets correspond to at most 2 distinct integers/characters in the contiguous subarray.',
        explanation: 'It is the exact array equivalent of longest subarray with at most 2 distinct elements.'
      },
      {
        title: 'Puzzle 9: Amortized Operations Proof',
        problemStatement: 'Why is dynamic sliding window $O(N)$ despite having a while loop inside a for loop?',
        options: [
          'Because both `left` and `right` only move forward; `left` increments at most $N$ times across the entire run.',
          'Because the while loop only runs once.',
          'Because Java optimizes while loops into O(1).',
          'Because N is small.'
        ],
        correctOptionIndex: 0,
        hint: 'Each element enters through right once and exits through left once.',
        solution: 'Total increments of left across all iterations cannot exceed $N$, bounding total operations to $2N = O(N)$.',
        explanation: 'Amortized analysis guarantees $O(N)$ linear time.'
      },
      {
        title: 'Puzzle 10: Inverted Sliding Window Replacement',
        problemStatement: 'In Replace Substring for Balanced String, what condition must characters OUTSIDE the window satisfy?',
        options: [
          'Every character outside must have count <= N / 4.',
          'Every character outside must have count == N / 4.',
          'Characters outside must be empty.',
          'Characters outside must all be \'Q\'.'
        ],
        correctOptionIndex: 0,
        hint: 'The substring inside the window can be replaced by any characters needed to balance the remainder.',
        solution: 'If all characters outside have frequency $\\le N/4$, the replaced inside substring can supply the missing counts.',
        explanation: 'The replaced window can absorb any deficiency as long as no character outside exceeds $N/4$.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Prove why Dynamic Sliding Window has an amortized time complexity of $O(N)$ despite the nested while loop.',
        answer: 'Let $N$ be the length of the array. The outer `for` loop advances the `right` pointer from $0$ to $N - 1$, which executes exactly $N$ times. The inner `while` loop advances the `left` pointer (`left++`). Notice that `left` is never reset to 0; it starts at 0 and increments strictly forward. Because `left` cannot surpass `right` ($left \\le right < N$), the total number of times `left++` can execute across all iterations of the outer loop combined is at most $N$. Therefore, the total number of element additions is $N$ and the total number of element removals is at most $N$. Total operations are $N + N = 2N = O(N)$, proving strictly linear amortized time complexity.',
        followUp: 'Can you construct a worst-case input where the inner while loop runs N times in a single step?',
        followUpAnswer: 'Yes: an array of $N - 1$ ones followed by a single zero, with a condition requiring zero sum. The inner loop will run $N - 1$ times on the final element, but ran 0 times on all previous elements, preserving the $O(N)$ aggregate bound.',
        keyPhrases: ['Amortized analysis', 'Aggregate operations bounded by 2N', 'Strictly monotonic forward progression', 'No reset of left pointer'],
        commonMistakeAnswer: 'Saying it is O(N^2) because of the nested loop, or claiming the while loop only runs 1 time per iteration.'
      },
      {
        question: 'How does the Last Seen Index table optimize Longest Substring Without Repeating Characters?',
        answer: 'In the standard sliding window with a Set, when a duplicate character is found at `right`, `left` increments one index at a time, removing characters from the Set until the duplicate is evicted. By maintaining an array `int[] lastIndex = new int[128]` initialized to -1, we store the most recent index where each ASCII character was observed. When `right` encounters character `c`, if `lastIndex[c] >= left`, we know the duplicate is within the current window and we can immediately jump `left = lastIndex[c] + 1` in $O(1)$ without a while loop. We must include the check `lastIndex[c] >= left` to prevent `left` from moving backwards if `c` was seen in an earlier, already-discarded window.',
        followUp: 'What if the string contains non-ASCII Unicode characters?',
        followUpAnswer: 'Use a `HashMap<Character, Integer>` instead of a 128-element array to store last-seen indices for full UTF-16 characters.',
        keyPhrases: ['Direct index jump', 'lastIndex[c] >= left check', 'Eliminate inner while loop', 'O(1) auxiliary table'],
        commonMistakeAnswer: 'Setting left = lastIndex[c] + 1 unconditionally, causing left to move backwards on characters seen long ago.'
      },
      {
        question: 'Explain the algorithm for Minimum Window Substring and why the `formed` counter is essential.',
        answer: 'Minimum Window Substring requires finding the shortest substring in $S$ that contains all characters of $T$. We build a frequency array `tCount` and count distinct characters `required`. We maintain `sCount` for the window and an integer `formed = 0`. As `right` expands, if `sCount[c] == tCount[c]`, we increment `formed++`. When `formed == required`, the window contains all required characters. We then contract `left` while recording the minimum window length: if `sCount[left] == tCount[left]`, decrementing `left` will cause `formed--`, which terminates contraction. The `formed` counter is essential because checking whether the window satisfies $T$ takes $O(1)$ via integer comparison (`formed == required`), avoiding an $O(128)$ array comparison on every single step.',
        followUp: 'What is the overall time and space complexity of this approach?',
        followUpAnswer: 'Time complexity is $O(|S| + |T|)$ and auxiliary space complexity is $O(128) = O(1)$ using fixed size ASCII tables.',
        keyPhrases: ['formed == required invariant', 'O(1) validity check', 'Contract to minimize', 'O(|S| + |T|) optimal time'],
        commonMistakeAnswer: 'Comparing the two frequency maps on every step, degrading performance to O(128 * |S|).'
      },
      {
        question: 'Why is the "At Most K" decomposition used for "Subarrays with Exactly K Distinct Elements"?',
        answer: 'Directly counting subarrays with *exactly* $K$ distinct elements using a standard sliding window is difficult because when a window $[left, right]$ has exactly $K$ distinct elements, shrinking `left` might immediately drop distinct elements to $K - 1$, but multiple valid prefixes ending at `right` might still exist, requiring complex lookaheads. However, counting subarrays with *at most* $K$ distinct elements is straightforward: every valid window $[left, right]$ ending at `right` contributes exactly `right - left + 1` subarrays. Since $\\text{Exact}(K) = \\text{AtMost}(K) - \\text{AtMost}(K - 1)$, we can run the simple monotonic sliding window twice, achieving $O(N)$ time with zero branching complexity.',
        followUp: 'Why does a valid window of size W contribute exactly W subarrays?',
        followUpAnswer: 'Because if the window $[left, right]$ has at most $K$ distinct elements, every sub-window ending at `right` ($[left, right]$, $[left+1, right]$... $[right, right]$) also has at most $K$ distinct elements, totaling `right - left + 1`.',
        keyPhrases: ['Exact(K) = AtMost(K) - AtMost(K-1)', 'right - left + 1 formula', 'Monotonic prefix property', 'Avoid lookahead complexity'],
        commonMistakeAnswer: 'Trying to maintain a secondary inner pointer inside the while loop.'
      },
      {
        question: 'How does the Max Consecutive Ones III problem map to Dynamic Sliding Window?',
        answer: 'The problem asks for the maximum consecutive 1s after flipping at most $K$ zeroes. This is equivalent to finding the longest contiguous subarray that contains at most $K$ zeroes! We maintain `zeroCount` in the window. As `right` advances, if `nums[right] == 0`, increment `zeroCount++`. When `zeroCount > K`, the window is invalid; we contract `left` while decrementing `zeroCount` if `nums[left] == 0`, until `zeroCount <= K`. At each step, we update `maxLen = Math.max(maxLen, right - left + 1)`. The algorithm runs in $O(N)$ time and $O(1)$ space.',
        followUp: 'Can this be solved without ever shrinking the window size?',
        followUpAnswer: 'Yes: instead of shrinking with `while`, we can use `if (zeroCount > K) { if (nums[left] == 0) zeroCount--; left++; }`, letting the window size only grow or shift, outputting `right - left`.',
        keyPhrases: ['Equivalent to at most K zeroes', 'zeroCount tracking', 'Contract when zeroCount > K', 'O(1) space'],
        commonMistakeAnswer: 'Actually attempting to mutate or flip elements in the array.'
      },
      {
        question: 'What is the invariant in Longest Repeating Character Replacement?',
        answer: 'A window of length $L = right - left + 1$ can be turned into a repeating character string with at most $K$ replacements if and only if $L - \\text{maxFrequency} \\le K$, where $\\text{maxFrequency}$ is the count of the most frequent character in the current window. We track character frequencies in `int[26]` and maintain `maxCount = Math.max(maxCount, count[c])`. If $(right - left + 1) - maxCount > K$, the window cannot be converted; we contract `left++` and decrement `count[nums[left]]`. Maximum valid window length is updated on each step in $O(N)$ time.',
        followUp: 'Why do we not need to decrement maxCount when contracting left?',
        followUpAnswer: 'Because a smaller `maxCount` can never produce a larger window than the maximum already found. We only care when a new character exceeds the historical `maxCount`.',
        keyPhrases: ['(window length - maxCount) <= K', 'Historical maxCount validity', '26-element frequency table', 'O(N) time'],
        commonMistakeAnswer: 'Recalculating the max frequency across all 26 letters on every left contraction.'
      },
      {
        question: 'In Subarray Product Less Than K, why is the condition `k <= 1` checked upfront?',
        answer: 'The problem specifies that array elements are strictly positive integers ($nums[i] \\ge 1$). The smallest possible product of any non-empty subarray is therefore $1$. If $k = 0$ or $k = 1$, no product of positive integers can be strictly less than $k$ ($prod < 1$ is impossible for integers $\\ge 1$). Furthermore, if $k \\le 1$, the inner while loop `while (prod >= k)` would divide until `left > right`, causing index out of bounds. Checking `if (k <= 1) return 0;` handles the edge case in $O(1)$ time.',
        followUp: 'What if the array could contain 0 or negative numbers?',
        followUpAnswer: 'Sliding window would fail because multiplication by 0 or negative numbers destroys the monotonic property. Prefix products with HashMaps or dynamic programming would be required.',
        keyPhrases: ['Strictly positive integers', 'Minimum product is 1', 'Monotonicity destroyed by negatives', 'Edge case check'],
        commonMistakeAnswer: 'Omitting the k <= 1 check, leading to an infinite while loop or wrong answer on k = 0.'
      },
      {
        question: 'How do you optimize Dynamic Sliding Window memory allocation in high-throughput Java services?',
        answer: 'In high-throughput services (e.g. processing millions of requests per second), avoiding object allocation on the young generation heap prevents garbage collection pauses. Instead of using `HashMap<Character, Integer>` or `HashSet<Character>`, use fixed-size primitive arrays (`int[128]` for ASCII or `int[26]` for lowercase alphabet). Primitive arrays are allocated once or reused with `Arrays.fill(arr, 0)`, incurring zero boxing overhead (`Integer` object creation) and zero GC pressure.',
        followUp: 'How much heap memory does an Integer wrapper consume compared to a primitive int?',
        followUpAnswer: 'A primitive `int` is 4 bytes. An `Integer` object has a 12-byte header + 4-byte payload = 16 bytes, plus an 8-byte reference, totaling 24 bytes (a 6x memory increase per entry).',
        keyPhrases: ['Primitive arrays vs HashMaps', 'Zero autoboxing overhead', 'Prevent GC allocation pauses', '16-byte object headers'],
        commonMistakeAnswer: 'Using `HashMap<Character, Integer>` for simple ASCII character windowing.'
      },
      {
        question: 'What is the Inverted Sliding Window pattern in "Replace the Substring for Balanced String"?',
        answer: 'In standard sliding window, the elements INSIDE the window must satisfy a condition. In "Replace the Substring for Balanced String", the substring INSIDE the window will be completely replaced. Therefore, the condition applies to elements OUTSIDE the window! Each character must appear $N / 4$ times in the final string. Thus, the characters OUTSIDE the window must each appear at most $N / 4$ times, so that the replaced window can supply the remaining counts. We expand `right` and decrement outside counts; when all 4 characters outside have count $\\le N/4$, the window is valid and we contract `left` to minimize the window length.',
        followUp: 'What are the only 4 characters in this problem?',
        followUpAnswer: '\'Q\', \'W\', \'E\', and \'R\'.',
        keyPhrases: ['Condition on external elements', 'Outside count <= N / 4', 'Replaced window supplies difference', 'Inverted invariant'],
        commonMistakeAnswer: 'Trying to count characters inside the window and match them to N / 4.'
      },
      {
        question: 'When does the Dynamic Sliding Window pattern fail, requiring Dynamic Programming or Monotonic Stacks instead?',
        answer: 'Dynamic Sliding Window strictly requires that the window validity is **monotonic**: adding an element must predictably change the invariant in one direction, and removing an element must reverse it. Sliding window FAILS when: 1) The array contains negative numbers in sum problems (adding an element could increase or decrease sum unpredictably, breaking monotonicity); 2) Non-contiguous subsequences are required; 3) Finding the Next Greater Element (requires Monotonic Stack); 4) Subarrays with target sum where numbers are negative (requires Prefix Sum + HashMap).',
        followUp: 'How do you solve Subarray Sum Equals K when array has negative numbers?',
        followUpAnswer: 'Using Prefix Sums stored in a `HashMap<Integer, Integer>` (prefix sum frequency) in $O(N)$ time and $O(N)$ space.',
        keyPhrases: ['Monotonic validity requirement', 'Negative numbers destroy monotonicity', 'Prefix sum + HashMap fallback', 'Contiguity requirement'],
        commonMistakeAnswer: 'Attempting to use sliding window for Subarray Sum Equals K with negative numbers.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the total amortized time complexity of dynamic sliding window on an array of length $N$?',
        options: [
          '$O(N)$',
          '$O(N^2)$',
          '$O(N \\log N)$',
          '$O(2^N)$'
        ],
        correctIndex: 0,
        explanation: 'Both left and right pointers advance at most $N$ times, bounding total operations to $2N = O(N)$.'
      },
      {
        question: 'In Longest Substring Without Repeating Characters, what does `lastIndex[c] >= left` ensure?',
        options: [
          'The duplicate character is inside the current active window, so `left` can safely jump past it.',
          'The character is an uppercase letter.',
          'The string is a palindrome.',
          'The window is empty.'
        ],
        correctIndex: 0,
        explanation: 'It ensures the left pointer only jumps forward, never backward to duplicates outside the window.'
      },
      {
        question: 'In Minimum Window Substring, why is `formed == required` used instead of map comparisons?',
        options: [
          'It checks window validity in $O(1)$ time rather than comparing 128 elements.',
          'It is required by the JVM compiler.',
          'It reduces memory from 64-bit to 32-bit.',
          'It automatically sorts characters.'
        ],
        correctIndex: 0,
        explanation: 'Comparing an integer `formed` with `required` is an instantaneous $O(1)$ operation.'
      },
      {
        question: 'How many new subarrays ending at `right` are contributed by a valid window $[left, right]$?',
        options: [
          '`right - left + 1`',
          '`right - left`',
          '`(right - left) / 2`',
          '`1`'
        ],
        correctIndex: 0,
        explanation: 'Every start index from `left` up to `right` forms a valid contiguous subarray ending at `right`.'
      },
      {
        question: 'Why does Subarray Product Less Than K return 0 immediately when $k \\le 1$ for positive integers?',
        options: [
          'Because the minimum product of positive integers is 1, which cannot be strictly less than 1 or 0.',
          'Because negative products are not supported.',
          'Because the array is empty.',
          'To avoid NullPointerException.'
        ],
        correctIndex: 0,
        explanation: 'With positive integers, the minimum product is 1, so no subarray product can be $< 1$.'
      },
      {
        question: 'What formula computes the number of subarrays with exactly $K$ distinct elements?',
        options: [
          '`atMost(K) - atMost(K - 1)`',
          '`atMost(K) + atMost(K - 1)`',
          '`atMost(K) * K`',
          '`atMost(K) / K`'
        ],
        correctIndex: 0,
        explanation: 'Subtracting subarrays with at most $K - 1$ distinct from those with at most $K$ distinct leaves exactly $K$.'
      },
      {
        question: 'What invariant must hold in Longest Repeating Character Replacement for a window of size $L$?',
        options: [
          '$L - \\text{maxCount} \\le K$',
          '$L + \\text{maxCount} \\le K$',
          '$L = K$',
          '$\\text{maxCount} \\ge 2K$'
        ],
        correctIndex: 0,
        explanation: 'The number of characters that need replacement ($L - \\text{maxCount}$) must not exceed $K$.'
      },
      {
        question: 'Why does Dynamic Sliding Window FAIL on Subarray Sum Equals K when the array contains negative numbers?',
        options: [
          'Negative numbers destroy the monotonic property: expanding or contracting no longer predictably increases or decreases sum.',
          'Because negative numbers cause index out of bounds.',
          'Because the JVM does not support negative addition.',
          'Because the array cannot be hashed.'
        ],
        correctIndex: 0,
        explanation: 'Sliding window requires monotonic state changes; negative numbers break directional predictability.'
      },
      {
        question: 'In Replace the Substring for Balanced String, what condition must characters OUTSIDE the window satisfy?',
        options: [
          'Every character count outside must be $\\le N / 4$.',
          'Every character count outside must be $\\ge N / 4$.',
          'The outside characters must all be identical.',
          'The outside characters must be empty.'
        ],
        correctIndex: 0,
        explanation: 'If external characters have frequency $\\le N/4$, the replaced window can supply the missing counts to balance the string.'
      },
      {
        question: 'Why are primitive arrays (`int[128]`) preferred over `HashMap<Character, Integer>` in performance-critical code?',
        options: [
          'They eliminate heap object allocations, prevent autoboxing, and avoid GC pauses.',
          'HashMaps cannot store characters.',
          'Primitive arrays are dynamic in size.',
          'HashMaps are deprecated in Java.'
        ],
        correctIndex: 0,
        explanation: 'Fixed primitive arrays avoid heap wrapper allocations and hash collision lookups, maximizing performance.'
      }
    ]
  }
};
