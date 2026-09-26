import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 17: TWO POINTERS & SLIDING WINDOW (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 17.1 - 17.4
// ============================================================

export const dsa17Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 17.1: Two Pointers: Converging Left-Right Pointers ────────
  'two-pointers-converging': [
    {
      id: 'dsa-17-1-ex1',
      title: 'Two Sum II in Sorted Array',
      problemStatement: 'Given a 1-indexed sorted integer array `numbers` and a target value `target`, find the two numbers such that they add up to `target`. Return their 1-based indices.',
      hint: 'Initialize left at 0 and right at numbers.length - 1. If sum < target, advance left; if sum > target, decrement right.',
      solutionCode: `public class Main {
    public static int[] twoSumSorted(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left + 1, right + 1};
            else if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] res = twoSumSorted(nums, target);
        System.out.println("Indices: [" + res[0] + ", " + res[1] + "]");
    }
}`,
      output: `Indices: [1, 2]`,
      explanation: 'The converging two-pointer technique solves Two Sum II in $O(N)$ time and $O(1)$ auxiliary space by eliminating unnecessary candidate pairs monotonically.'
    },
    {
      id: 'dsa-17-1-ex2',
      title: 'Container With Most Water',
      problemStatement: 'Given an array `height` representing vertical lines, find two lines that together with the x-axis form a container that stores the maximum amount of water.',
      hint: 'The area is limited by the shorter line: (right - left) * min(height[left], height[right]). Moving the taller pointer can never increase area; always move the shorter one.',
      solutionCode: `public class Main {
    public static int maxArea(int[] height) {
        int left = 0, right = height.length - 1;
        int maxWater = 0;
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            maxWater = Math.max(maxWater, width * h);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxWater;
    }

    public static void main(String[] args) {
        int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println("Max Water: " + maxArea(heights));
    }
}`,
      output: `Max Water: 49`,
      explanation: 'Greedy invariant: moving the shorter barrier is the only step that offers any possibility of discovering a taller barrier to compensate for decreasing width.'
    },
    {
      id: 'dsa-17-1-ex3',
      title: 'Valid Palindrome After Cleanup',
      problemStatement: 'Given a string `s`, determine if it is a palindrome considering only alphanumeric characters and ignoring cases, using $O(1)$ extra memory.',
      hint: 'Converge left and right pointers while skipping non-alphanumeric characters with Character.isLetterOrDigit.',
      solutionCode: `public class Main {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        String s = "A man, a plan, a canal: Panama";
        System.out.println("Is Palindrome: " + isPalindrome(s));
    }
}`,
      output: `Is Palindrome: true`,
      explanation: 'Two pointers skip irrelevant characters in $O(N)$ time with zero string object allocations in heap ($O(1)$ space).'
    },
    {
      id: 'dsa-17-1-ex4',
      title: '3Sum Zero Triplet Search',
      problemStatement: 'Given an integer array `nums`, find all unique triplets `[nums[i], nums[j], nums[k]]` such that `i != j != k` and their sum equals 0.',
      hint: 'Sort the array first. Fix each element nums[i], then run converging two-pointers for the remaining pair. Skip duplicates to prevent duplicate triplets.',
      solutionCode: `import java.util.*;

public class Main {
    public static List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicate anchor
            if (nums[i] > 0) break; // Smallest number positive, sum can't be 0
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = {-1, 0, 1, 2, -1, -4};
        System.out.println("Triplets: " + threeSum(nums));
    }
}`,
      output: `Triplets: [[-1, -1, 2], [-1, 0, 1]]`,
      explanation: 'Sorting takes $O(N \\log N)$, and fixing each anchor followed by converging two pointers takes $O(N^2)$ total time, with duplicate skipping guaranteeing uniqueness.'
    },
    {
      id: 'dsa-17-1-ex5',
      title: 'Trapping Rain Water (Two Pointers)',
      problemStatement: 'Given `n` non-negative integers representing an elevation map where width of each bar is 1, compute how much water it can trap after raining in $O(1)$ space.',
      hint: 'Maintain leftMax and rightMax. If height[left] < height[right], trapped water at left is determined by leftMax; advance left.',
      solutionCode: `public class Main {
    public static int trap(int[] height) {
        if (height.length == 0) return 0;
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int trappedWater = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else trappedWater += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else trappedWater += rightMax - height[right];
                right--;
            }
        }
        return trappedWater;
    }

    public static void main(String[] args) {
        int[] elevation = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
        System.out.println("Trapped Water: " + trap(elevation));
    }
}`,
      output: `Trapped Water: 6`,
      explanation: 'The two-pointer technique optimizes the DP approach from $O(N)$ space to $O(1)$ auxiliary space, since the lower boundary strictly bounds the trapped water level.'
    },
    {
      id: 'dsa-17-1-ex6',
      title: 'Squares of a Sorted Array',
      problemStatement: 'Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order in $O(N)$ time.',
      hint: 'The largest squares lie at either the extreme negative left end or extreme positive right end. Populate the result array from back to front.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int left = 0, right = n - 1;
        int idx = n - 1;

        while (left <= right) {
            int sqLeft = nums[left] * nums[left];
            int sqRight = nums[right] * nums[right];
            if (sqLeft > sqRight) {
                result[idx--] = sqLeft;
                left++;
            } else {
                result[idx--] = sqRight;
                right--;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {-4, -1, 0, 3, 10};
        System.out.println("Squares: " + Arrays.toString(sortedSquares(nums)));
    }
}`,
      output: `Squares: [0, 1, 9, 16, 100]`,
      explanation: 'Filling from the end of the array based on comparing squares of outermost elements avoids an $O(N \\log N)$ sort, executing in exact $O(N)$ time.'
    },
    {
      id: 'dsa-17-1-ex7',
      title: 'Reverse Vowels of a String',
      problemStatement: 'Given a string `s`, reverse only all the vowels in the string and return it.',
      hint: 'Converge left and right pointers until both point to vowels, swap their character positions, then advance.',
      solutionCode: `public class Main {
    private static boolean isVowel(char c) {
        c = Character.toLowerCase(c);
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }

    public static String reverseVowels(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            while (left < right && !isVowel(chars[left])) left++;
            while (left < right && !isVowel(chars[right])) right--;
            if (left < right) {
                char temp = chars[left];
                chars[left] = chars[right];
                chars[right] = temp;
                left++;
                right--;
            }
        }
        return new String(chars);
    }

    public static void main(String[] args) {
        String s = "IceCreAm";
        System.out.println("Reversed Vowels: " + reverseVowels(s));
    }
}`,
      output: `Reversed Vowels: AceCreIm`,
      explanation: 'Two converging pointers isolate vowels in a single pass ($O(N)$ time) with in-place swaps on a character array.'
    },
    {
      id: 'dsa-17-1-ex8',
      title: 'Sort Array By Parity II',
      problemStatement: 'Given an array `nums` of half even and half odd integers, sort the array so that whenever `nums[i]` is odd, `i` is odd, and whenever `nums[i]` is even, `i` is even.',
      hint: 'Maintain an even pointer stepping by 2 and an odd pointer stepping by 2. Swap when both encounter misplaced values.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] sortArrayByParityII(int[] nums) {
        int n = nums.length;
        int even = 0, odd = 1;
        while (even < n && odd < n) {
            while (even < n && nums[even] % 2 == 0) even += 2;
            while (odd < n && nums[odd] % 2 != 0) odd += 2;
            if (even < n && odd < n) {
                int temp = nums[even];
                nums[even] = nums[odd];
                nums[odd] = temp;
            }
        }
        return nums;
    }

    public static void main(String[] args) {
        int[] nums = {4, 2, 5, 7};
        System.out.println("Parity Sorted: " + Arrays.toString(sortArrayByParityII(nums)));
    }
}`,
      output: `Parity Sorted: [4, 5, 2, 7]`,
      explanation: 'Stepping pointers by 2 isolates mismatched parity indices and restores the invariant in $O(N)$ time and $O(1)$ extra space.'
    },
    {
      id: 'dsa-17-1-ex9',
      title: 'Boats to Save People',
      problemStatement: 'You are given an array `people` where `people[i]` is the weight of the $i$-th person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people. Return the minimum number of boats required.',
      hint: 'Sort weights. Pair the heaviest person with the lightest person if their combined weight <= limit; otherwise the heaviest person travels alone.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int numRescueBoats(int[] people, int limit) {
        Arrays.sort(people);
        int left = 0, right = people.length - 1;
        int boats = 0;

        while (left <= right) {
            if (people[left] + people[right] <= limit) {
                left++; // Lightest person can ride with heaviest
            }
            right--; // Heaviest person always boards a boat
            boats++;
        }
        return boats;
    }

    public static void main(String[] args) {
        int[] people = {3, 2, 2, 1};
        int limit = 3;
        System.out.println("Boats Required: " + numRescueBoats(people, limit));
    }
}`,
      output: `Boats Required: 3`,
      explanation: 'Greedy pairing with two pointers after sorting minimizes boat count in $O(N \\log N)$ time and $O(1)$ auxiliary space.'
    },
    {
      id: 'dsa-17-1-ex10',
      title: '3Sum Closest Target Match',
      problemStatement: 'Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum.',
      hint: 'Sort the array. Converge left and right pointers for each anchor. Keep track of the minimum absolute difference.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                if (Math.abs(target - currentSum) < Math.abs(target - closestSum)) {
                    closestSum = currentSum;
                }
                if (currentSum < target) left++;
                else if (currentSum > target) right--;
                else return target; // Exact match found
            }
        }
        return closestSum;
    }

    public static void main(String[] args) {
        int[] nums = {-1, 2, 1, -4};
        int target = 1;
        System.out.println("Closest Sum: " + threeSumClosest(nums, target));
    }
}`,
      output: `Closest Sum: 2`,
      explanation: 'Two-pointer convergence within an anchored loop tests all viable proximity sums in $O(N^2)$ time with $O(1)$ auxiliary space.'
    }
  ],

  // ── LESSON 17.2: Fast & Slow Pointer Traversal ────────────────────────
  'fast-slow-pointer-traversal': [
    {
      id: 'dsa-17-2-ex1',
      title: 'Remove Duplicates from Sorted Array',
      problemStatement: 'Given an integer array `nums` sorted in non-decreasing order, remove duplicates in-place such that each unique element appears once. Return `k`, the number of unique elements.',
      hint: 'Use a slow pointer for the insertion index and a fast pointer scanning each element. When nums[fast] != nums[slow], advance slow and copy.',
      solutionCode: `public class Main {
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

    public static void main(String[] args) {
        int[] nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        int k = removeDuplicates(nums);
        System.out.print("Unique Count: " + k + ", Elements: ");
        for (int i = 0; i < k; i++) System.out.print(nums[i] + " ");
        System.out.println();
    }
}`,
      output: `Unique Count: 5, Elements: 0 1 2 3 4 `,
      explanation: 'Fast-slow pointers process the array in $O(N)$ time with $O(1)$ memory, writing unique values without any extra collections.'
    },
    {
      id: 'dsa-17-2-ex2',
      title: 'Move Zeroes to End In-Place',
      problemStatement: 'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements in $O(N)$ time.',
      hint: 'Maintain slow pointer for the next position of a non-zero element. Fast pointer traverses and swaps non-zero values into slow.',
      solutionCode: `import java.util.Arrays;

public class Main {
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

    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12};
        moveZeroes(nums);
        System.out.println("Result: " + Arrays.toString(nums));
    }
}`,
      output: `Result: [1, 3, 12, 0, 0]`,
      explanation: 'By swapping `nums[fast]` with `nums[slow]` on non-zero occurrences, all non-zero numbers shift forward stably in $O(N)$ time and $O(1)$ space.'
    },
    {
      id: 'dsa-17-2-ex3',
      title: 'Remove Element Value In-Place',
      problemStatement: 'Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place and return the number of elements not equal to `val`.',
      hint: 'Slow pointer writes accepted elements; fast pointer skips elements equal to val.',
      solutionCode: `public class Main {
    public static int removeElement(int[] nums, int val) {
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != val) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 2, 3};
        int k = removeElement(nums, 3);
        System.out.print("Remaining: " + k + " -> ");
        for (int i = 0; i < k; i++) System.out.print(nums[i] + " ");
        System.out.println();
    }
}`,
      output: `Remaining: 2 -> 2 2 `,
      explanation: 'Fast-slow pointers filter values in a single forward pass without shifting overhead, achieving $O(N)$ time.'
    },
    {
      id: 'dsa-17-2-ex4',
      title: 'Remove Duplicates Allowing at Most Twice',
      problemStatement: 'Given a sorted array `nums`, remove duplicates in-place such that each unique element appears at most twice. Return the new length.',
      hint: 'Compare nums[fast] with nums[slow - 2]. If they are different, nums[fast] is safe to write.',
      solutionCode: `public class Main {
    public static int removeDuplicatesAtMostTwice(int[] nums) {
        if (nums.length <= 2) return nums.length;
        int slow = 2;
        for (int fast = 2; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow - 2]) {
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 2, 2, 3};
        int k = removeDuplicatesAtMostTwice(nums);
        System.out.print("Count: " + k + " -> ");
        for (int i = 0; i < k; i++) System.out.print(nums[i] + " ");
        System.out.println();
    }
}`,
      output: `Count: 5 -> 1 1 2 2 3 `,
      explanation: 'The `slow - 2` invariant generalizes to allowing at most $K$ duplicates by checking `nums[slow - K]`, running in $O(N)$ time.'
    },
    {
      id: 'dsa-17-2-ex5',
      title: 'Happy Number Cycle Detection',
      problemStatement: 'Write an algorithm to determine if a number `n` is happy. A happy number reaches 1 when repeatedly replaced by the sum of the squares of its digits.',
      hint: 'Use Floyd\'s tortoise and hare: slow advances 1 step, fast advances 2 steps. If they meet at 1, it is happy; if they meet at any other number, a cycle exists.',
      solutionCode: `public class Main {
    private static int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }

    public static boolean isHappy(int n) {
        int slow = n;
        int fast = getNext(n);

        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }

    public static void main(String[] args) {
        System.out.println("Is 19 happy? " + isHappy(19));
        System.out.println("Is 2 happy? " + isHappy(2));
    }
}`,
      output: `Is 19 happy? true
Is 2 happy? false`,
      explanation: 'Floyd\'s fast-slow pointer cycle detection checks state transitions without a HashSet, consuming $O(1)$ memory.'
    },
    {
      id: 'dsa-17-2-ex6',
      title: 'Find the Duplicate Number in Array',
      problemStatement: 'Given an array of integers `nums` containing `n + 1` integers where each integer is between `1` and `n` inclusive, prove that at least one duplicate exists and find it without modifying the array in $O(1)$ extra space.',
      hint: 'Treat the array as a linked list where nums[i] is the pointer to index nums[i]. Apply Floyd\'s cycle detection.',
      solutionCode: `public class Main {
    public static int findDuplicate(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];

        // Step 1: Detect cycle
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);

        // Step 2: Find cycle entrance
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 4, 2, 2};
        System.out.println("Duplicate Number: " + findDuplicate(nums));
    }
}`,
      output: `Duplicate Number: 2`,
      explanation: 'Because array values map to indices 1..n, the duplicate creates multiple incoming pointers to the same node, forming a cycle entrance found in $O(N)$ time.'
    },
    {
      id: 'dsa-17-2-ex7',
      title: 'Partition Array According to Pivot',
      problemStatement: 'Rearrange an array `nums` such that all elements less than `pivot` come first, followed by elements equal to `pivot`, followed by elements greater than `pivot`, maintaining relative order.',
      hint: 'Two-pass linear approach or three auxiliary placement pointers.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] pivotArray(int[] nums, int pivot) {
        int[] result = new int[nums.length];
        int left = 0, right = nums.length - 1;

        // Populate elements < pivot from left and > pivot from right
        for (int i = 0, j = nums.length - 1; i < nums.length; i++, j--) {
            if (nums[i] < pivot) result[left++] = nums[i];
            if (nums[j] > pivot) result[right--] = nums[j];
        }

        // Fill middle with pivot
        while (left <= right) {
            result[left++] = pivot;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {9, 12, 5, 10, 14, 3, 10};
        int pivot = 10;
        System.out.println("Pivot Array: " + Arrays.toString(pivotArray(nums, pivot)));
    }
}`,
      output: `Pivot Array: [9, 5, 3, 10, 10, 14, 12]`,
      explanation: 'Two converging pointers fill from opposite ends in a single scan, preserving relative order in $O(N)$ time.'
    },
    {
      id: 'dsa-17-2-ex8',
      title: 'String Compression with Run-Length',
      problemStatement: 'Given an array of characters `chars`, compress it in-place using run-length encoding. Return the new length of the array.',
      hint: 'Fast pointer counts repeating sequence length. Slow pointer writes character followed by digit characters of the count.',
      solutionCode: `public class Main {
    public static int compress(char[] chars) {
        int slow = 0, fast = 0;
        while (fast < chars.length) {
            char curr = chars[fast];
            int count = 0;
            while (fast < chars.length && chars[fast] == curr) {
                fast++;
                count++;
            }
            chars[slow++] = curr;
            if (count > 1) {
                for (char c : Integer.toString(count).toCharArray()) {
                    chars[slow++] = c;
                }
            }
        }
        return slow;
    }

    public static void main(String[] args) {
        char[] chars = {'a', 'a', 'b', 'b', 'c', 'c', 'c'};
        int len = compress(chars);
        System.out.print("Compressed Length: " + len + ", Result: ");
        for (int i = 0; i < len; i++) System.out.print(chars[i]);
        System.out.println();
    }
}`,
      output: `Compressed Length: 6, Result: a2b2c3`,
      explanation: 'In-place compression uses fast-slow pointers to overwrite redundant runs without exceeding the original array length ($O(N)$ time, $O(1)$ space).'
    },
    {
      id: 'dsa-17-2-ex9',
      title: 'Longest Mountain in Array',
      problemStatement: 'Given an integer array `arr`, return the length of the longest subarray that is a mountain (`arr[0] < arr[1] < ... < arr[top] > arr[top+1] > ...`). Return 0 if none.',
      hint: 'Find a peak where arr[i-1] < arr[i] > arr[i+1]. Expand left and right pointers downwards from the peak.',
      solutionCode: `public class Main {
    public static int longestMountain(int[] arr) {
        int n = arr.length;
        int maxLen = 0;
        for (int i = 1; i < n - 1; i++) {
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
                int left = i - 1;
                while (left > 0 && arr[left] > arr[left - 1]) left--;
                int right = i + 1;
                while (right < n - 1 && arr[right] > arr[right + 1]) right++;
                maxLen = Math.max(maxLen, right - left + 1);
            }
        }
        return maxLen;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 4, 7, 3, 2, 5};
        System.out.println("Longest Mountain: " + longestMountain(arr));
    }
}`,
      output: `Longest Mountain: 5`,
      explanation: 'Identifying peak anchors and expanding boundary pointers outward solves the mountain subarray problem in $O(N)$ amortized time.'
    },
    {
      id: 'dsa-17-2-ex10',
      title: 'Circular Array Loop Detection',
      problemStatement: 'Determine if an integer array `nums` has a cycle of length > 1 moving along indices modulo array length, where all steps in the cycle must be strictly forward or strictly backward.',
      hint: 'Use fast-slow pointers on directed steps. Mark visited elements with 0 to prevent re-checking.',
      solutionCode: `public class Main {
    private static int next(int[] nums, int curr) {
        int n = nums.length;
        return ((curr + nums[curr]) % n + n) % n;
    }

    public static boolean circularArrayLoop(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) continue;
            int slow = i, fast = next(nums, i);
            boolean forward = nums[i] > 0;

            while (nums[fast] * (forward ? 1 : -1) > 0 && 
                   nums[next(nums, fast)] * (forward ? 1 : -1) > 0) {
                if (slow == fast) {
                    if (slow == next(nums, slow)) break; // 1-element loop
                    return true;
                }
                slow = next(nums, slow);
                fast = next(nums, next(nums, fast));
            }

            // Zero out traversed elements
            int curr = i;
            while (nums[curr] * (forward ? 1 : -1) > 0) {
                int nextIdx = next(nums, curr);
                nums[curr] = 0;
                curr = nextIdx;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] nums = {2, -1, 1, 2, 2};
        System.out.println("Has Loop: " + circularArrayLoop(nums));
    }
}`,
      output: `Has Loop: true`,
      explanation: 'Floyd\'s fast-slow pointer traversal on circular modulo paths with zero-marking detects directional cycles in $O(N)$ time and $O(1)$ space.'
    }
  ],

  // ── LESSON 17.3: Sliding Window: Fixed Size Subarrays ──────────────────
  'fixed-size-sliding-window': [
    {
      id: 'dsa-17-3-ex1',
      title: 'Maximum Sum Subarray of Size K',
      problemStatement: 'Given an array of integers `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.',
      hint: 'Compute the sum of the first k elements. Then slide the window: subtract nums[i - k] and add nums[i].',
      solutionCode: `public class Main {
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

    public static void main(String[] args) {
        int[] nums = {2, 1, 5, 1, 3, 2};
        int k = 3;
        System.out.println("Max Sum: " + maxSumSubarray(nums, k));
    }
}`,
      output: `Max Sum: 9`,
      explanation: 'Sliding window updates the running sum in $O(1)$ per step, reducing brute-force $O(N \\times K)$ to $O(N)$ linear time.'
    },
    {
      id: 'dsa-17-3-ex2',
      title: 'Maximum Average Subarray of Size K',
      problemStatement: 'Given an integer array `nums` consisting of `n` elements and an integer `k`, find a contiguous subarray whose length is equal to `k` that has the maximum average value.',
      hint: 'Max average is max sum divided by k.',
      solutionCode: `public class Main {
    public static double findMaxAverage(int[] nums, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) sum += nums[i];
        int maxSum = sum;

        for (int i = k; i < nums.length; i++) {
            sum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, sum);
        }
        return (double) maxSum / k;
    }

    public static void main(String[] args) {
        int[] nums = {1, 12, -5, -6, 50, 3};
        int k = 4;
        System.out.println("Max Average: " + findMaxAverage(nums, k));
    }
}`,
      output: `Max Average: 12.75`,
      explanation: 'Tracking running sum avoids floating-point precision issues until the final division, running in $O(N)$ time.'
    },
    {
      id: 'dsa-17-3-ex3',
      title: 'Number of Subarrays of Size K with Threshold Average',
      problemStatement: 'Given an array of integers `arr` and two integers `k` and `threshold`, return the number of sub-arrays of size `k` and average greater than or equal to `threshold`.',
      hint: 'Average >= threshold is equivalent to sum >= k * threshold.',
      solutionCode: `public class Main {
    public static int numOfSubarrays(int[] arr, int k, int threshold) {
        int targetSum = k * threshold;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += arr[i];

        int count = (windowSum >= targetSum) ? 1 : 0;
        for (int i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            if (windowSum >= targetSum) count++;
        }
        return count;
    }

    public static void main(String[] args) {
        int[] arr = {2, 2, 2, 2, 5, 5, 5, 8};
        int k = 3, threshold = 4;
        System.out.println("Valid Subarrays: " + numOfSubarrays(arr, k, threshold));
    }
}`,
      output: `Valid Subarrays: 3`,
      explanation: 'Multiplying threshold by k converts floating point checks into exact integer comparisons in $O(N)$ time.'
    },
    {
      id: 'dsa-17-3-ex4',
      title: 'First Negative Number in Every Window of Size K',
      problemStatement: 'Given an array `arr` and a window size `k`, find the first negative integer for each and every contiguous subarray of size `k`. If a window does not contain a negative integer, print 0.',
      hint: 'Maintain a queue or ArrayDeque of indices of negative numbers.',
      solutionCode: `import java.util.*;

public class Main {
    public static List<Integer> firstNegativeInWindow(int[] arr, int k) {
        List<Integer> result = new ArrayList<>();
        Deque<Integer> negIndices = new ArrayDeque<>();

        for (int i = 0; i < arr.length; i++) {
            // Remove indices outside window
            if (!negIndices.isEmpty() && negIndices.peekFirst() <= i - k) {
                negIndices.pollFirst();
            }
            if (arr[i] < 0) negIndices.offerLast(i);

            // Once first window is formed
            if (i >= k - 1) {
                if (!negIndices.isEmpty()) result.add(arr[negIndices.peekFirst()]);
                else result.add(0);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {12, -1, -7, 8, -15, 30, 16, 28};
        int k = 3;
        System.out.println("First Negatives: " + firstNegativeInWindow(arr, k));
    }
}`,
      output: `First Negatives: [-1, -1, -7, -15, -15, 0]`,
      explanation: 'Maintaining a queue of negative indices processes each element at most twice, providing $O(N)$ total time.'
    },
    {
      id: 'dsa-17-3-ex5',
      title: 'Maximum Vowels in Substring of Given Length',
      problemStatement: 'Given a string `s` and an integer `k`, return the maximum number of vowel letters in any substring of `s` with length `k`.',
      hint: 'Track vowel count in sliding window of size k.',
      solutionCode: `public class Main {
    private static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }

    public static int maxVowels(String s, int k) {
        int count = 0;
        for (int i = 0; i < k; i++) {
            if (isVowel(s.charAt(i))) count++;
        }
        int maxCount = count;
        for (int i = k; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) count++;
            if (isVowel(s.charAt(i - k))) count--;
            maxCount = Math.max(maxCount, count);
        }
        return maxCount;
    }

    public static void main(String[] args) {
        String s = "abciiidef";
        int k = 3;
        System.out.println("Max Vowels: " + maxVowels(s, k));
    }
}`,
      output: `Max Vowels: 3`,
      explanation: 'Fixed sliding window increments on entering vowel and decrements on leaving vowel in $O(N)$ time and $O(1)$ space.'
    },
    {
      id: 'dsa-17-3-ex6',
      title: 'Sliding Window Maximum (Monotonic Deque)',
      problemStatement: 'Given an array `nums` and window size `k`, return the max sliding window array. Must run in $O(N)$ time.',
      hint: 'Maintain a monotonically decreasing deque of indices. Elements smaller than current incoming are popped from tail.',
      solutionCode: `import java.util.*;

public class Main {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Remove elements outside current window
            if (!deque.isEmpty() && deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }
            // Maintain monotonic decreasing order
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }
            deque.offerLast(i);

            // Record maximum once window reaches size k
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, -1, -3, 5, 3, 6, 7};
        int k = 3;
        System.out.println("Window Max: " + Arrays.toString(maxSlidingWindow(nums, k)));
    }
}`,
      output: `Window Max: [3, 3, 5, 5, 6, 7]`,
      explanation: 'Every element enters and leaves the monotonic deque at most once, achieving amortized $O(N)$ time.'
    },
    {
      id: 'dsa-17-3-ex7',
      title: 'Find All Anagrams in a String',
      problemStatement: 'Given two strings `s` and `p`, return an array of all the start indices of `p`\'s anagrams in `s`.',
      hint: 'Use a fixed window of size p.length() with two 26-element character frequency count arrays.',
      solutionCode: `import java.util.*;

public class Main {
    public static List<Integer> findAnagrams(String s, String p) {
        List<Integer> res = new ArrayList<>();
        if (s.length() < p.length()) return res;

        int[] pCount = new int[26];
        int[] sCount = new int[26];
        for (char c : p.toCharArray()) pCount[c - 'a']++;

        int k = p.length();
        for (int i = 0; i < s.length(); i++) {
            sCount[s.charAt(i) - 'a']++;
            if (i >= k) sCount[s.charAt(i - k) - 'a']--;
            if (Arrays.equals(pCount, sCount)) {
                res.add(i - k + 1);
            }
        }
        return res;
    }

    public static void main(String[] args) {
        String s = "cbaebabacd", p = "abc";
        System.out.println("Anagram Indices: " + findAnagrams(s, p));
    }
}`,
      output: `Anagram Indices: [0, 6]`,
      explanation: 'Comparing two size-26 frequency vectors takes $O(26) = O(1)$ per shift, resulting in $O(N)$ overall time.'
    },
    {
      id: 'dsa-17-3-ex8',
      title: 'Permutation in String Verification',
      problemStatement: 'Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.',
      hint: 'Check if any substring of s2 of length s1.length() matches s1 frequency counts.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] count1 = new int[26];
        int[] count2 = new int[26];

        int k = s1.length();
        for (int i = 0; i < k; i++) {
            count1[s1.charAt(i) - 'a']++;
            count2[s2.charAt(i) - 'a']++;
        }
        if (Arrays.equals(count1, count2)) return true;

        for (int i = k; i < s2.length(); i++) {
            count2[s2.charAt(i) - 'a']++;
            count2[s2.charAt(i - k) - 'a']--;
            if (Arrays.equals(count1, count2)) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        System.out.println("Is permutation present: " + checkInclusion("ab", "eidbaooo"));
    }
}`,
      output: `Is permutation present: true`,
      explanation: 'A fixed window sliding across s2 detects permutation equivalence in $O(26 \\times N) = O(N)$ time with $O(1)$ memory.'
    },
    {
      id: 'dsa-17-3-ex9',
      title: 'K-Radius Subarray Averages',
      problemStatement: 'Given an array `nums` and radius `k`, return an array `avgs` where `avgs[i]` is the average of elements between `i - k` and `i + k` inclusive. Return -1 for boundary indices.',
      hint: 'Fixed window size is 2 * k + 1. Use 64-bit long for sum to avoid integer overflow.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static int[] getAverages(int[] nums, int k) {
        int n = nums.length;
        int[] avgs = new int[n];
        Arrays.fill(avgs, -1);

        int windowSize = 2 * k + 1;
        if (n < windowSize) return avgs;

        long windowSum = 0;
        for (int i = 0; i < windowSize; i++) windowSum += nums[i];
        avgs[k] = (int) (windowSum / windowSize);

        for (int i = windowSize; i < n; i++) {
            windowSum += nums[i] - nums[i - windowSize];
            avgs[i - k] = (int) (windowSum / windowSize);
        }
        return avgs;
    }

    public static void main(String[] args) {
        int[] nums = {7, 4, 3, 9, 1, 8, 5, 2, 6};
        int k = 3;
        System.out.println("K-Radius Averages: " + Arrays.toString(getAverages(nums, k)));
    }
}`,
      output: `K-Radius Averages: [-1, -1, -1, 5, 4, 4, -1, -1, -1]`,
      explanation: 'Maintaining a 64-bit window sum of size $2k + 1$ prevents numeric overflow while calculating averages in $O(N)$ time.'
    },
    {
      id: 'dsa-17-3-ex10',
      title: 'Diet Plan Performance Calories Tracker',
      problemStatement: 'A dieter consumes `calories[i]` calories on the $i$-th day. For every sequence of `k` consecutive days, if total calories < `lower`, they lose 1 point; if total calories > `upper`, they gain 1 point. Return total points.',
      hint: 'Slide a window of size k and compare sum against lower and upper bounds.',
      solutionCode: `public class Main {
    public static int dietPlanPerformance(int[] calories, int k, int lower, int upper) {
        int points = 0;
        int sum = 0;
        for (int i = 0; i < k; i++) sum += calories[i];

        if (sum < lower) points--;
        else if (sum > upper) points++;

        for (int i = k; i < calories.length; i++) {
            sum += calories[i] - calories[i - k];
            if (sum < lower) points--;
            else if (sum > upper) points++;
        }
        return points;
    }

    public static void main(String[] args) {
        int[] calories = {1, 2, 3, 4, 5};
        int k = 1, lower = 3, upper = 3;
        System.out.println("Total Points: " + dietPlanPerformance(calories, k, lower, upper));
    }
}`,
      output: `Total Points: 0`,
      explanation: 'Fixed window tracking aggregates calorie consumption in $O(N)$ time and $O(1)$ space.'
    }
  ],

  // ── LESSON 17.4: Sliding Window: Dynamic Window & Invariants ──────────
  'dynamic-sliding-window': [
    {
      id: 'dsa-17-4-ex1',
      title: 'Longest Substring Without Repeating Characters',
      problemStatement: 'Given a string `s`, find the length of the longest substring without repeating characters in $O(N)$ time.',
      hint: 'Expand right pointer. Use an array or Map storing last seen indices. If character was seen within current window, jump left pointer to lastIndex + 1.',
      solutionCode: `public class Main {
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

    public static void main(String[] args) {
        String s = "abcabcbb";
        System.out.println("Longest Unique Substring: " + lengthOfLongestSubstring(s));
    }
}`,
      output: `Longest Unique Substring: 3`,
      explanation: 'Storing last observed character indices allows the left pointer to jump directly past duplicates in $O(N)$ time without linear scanning.'
    },
    {
      id: 'dsa-17-4-ex2',
      title: 'Minimum Size Subarray Sum',
      problemStatement: 'Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If none, return 0.',
      hint: 'Expand right to add elements to window. While sum >= target, update minLen and contract left.',
      solutionCode: `public class Main {
    public static int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }

    public static void main(String[] args) {
        int[] nums = {2, 3, 1, 2, 4, 3};
        int target = 7;
        System.out.println("Min Subarray Length: " + minSubArrayLen(target, nums));
    }
}`,
      output: `Min Subarray Length: 2`,
      explanation: 'Left and right pointers move forward monotonically; each element enters and leaves the window at most once, yielding $O(N)$ time.'
    },
    {
      id: 'dsa-17-4-ex3',
      title: 'Subarray Product Less Than K',
      problemStatement: 'Given an array of integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all elements is strictly less than `k`.',
      hint: 'If k <= 1, product of positive numbers cannot be < k. Expand right, while prod >= k divide by nums[left++]. Add right - left + 1 to count.',
      solutionCode: `public class Main {
    public static int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int prod = 1, count = 0, left = 0;

        for (int right = 0; right < nums.length; right++) {
            prod *= nums[right];
            while (prod >= k) {
                prod /= nums[left++];
            }
            count += right - left + 1;
        }
        return count;
    }

    public static void main(String[] args) {
        int[] nums = {10, 5, 2, 6};
        int k = 100;
        System.out.println("Subarray Count: " + numSubarrayProductLessThanK(nums, k));
    }
}`,
      output: `Subarray Count: 8`,
      explanation: 'Every valid window ending at `right` contributes exactly `right - left + 1` new contiguous subarrays in $O(N)$ time.'
    },
    {
      id: 'dsa-17-4-ex4',
      title: 'Max Consecutive Ones III (At Most K Flips)',
      problemStatement: 'Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`\'s in the array if you can flip at most `k` `0`\'s.',
      hint: 'Count zeroes in window. When zeroes > k, contract left until zeroes <= k.',
      solutionCode: `public class Main {
    public static int longestOnes(int[] nums, int k) {
        int left = 0, zeroCount = 0, maxLen = 0;

        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeroCount++;
            while (zeroCount > k) {
                if (nums[left] == 0) zeroCount--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0};
        int k = 2;
        System.out.println("Max Consecutive Ones: " + longestOnes(nums, k));
    }
}`,
      output: `Max Consecutive Ones: 6`,
      explanation: 'Dynamic sliding window maintaining at most `k` zeroes finds the longest valid sequence in $O(N)$ time and $O(1)$ space.'
    },
    {
      id: 'dsa-17-4-ex5',
      title: 'Longest Repeating Character Replacement',
      problemStatement: 'Given a string `s` and integer `k`, return the length of the longest substring containing the same letter you can get after replacing at most `k` characters.',
      hint: 'Window validity: (window length - max frequency character) <= k.',
      solutionCode: `public class Main {
    public static int characterReplacement(String s, int k) {
        int[] counts = new int[26];
        int left = 0, maxCount = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            counts[s.charAt(right) - 'A']++;
            maxCount = Math.max(maxCount, counts[s.charAt(right) - 'A']);

            // If characters to replace > k, shrink window
            while ((right - left + 1) - maxCount > k) {
                counts[s.charAt(left) - 'A']--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        String s = "AABABBA";
        int k = 1;
        System.out.println("Max Repeating Length: " + characterReplacement(s, k));
    }
}`,
      output: `Max Repeating Length: 4`,
      explanation: 'Tracking the max frequency character inside the window ensures invalid windows with > k substitutions contract immediately in $O(N)$ time.'
    },
    {
      id: 'dsa-17-4-ex6',
      title: 'Fruit Into Baskets (At Most 2 Types)',
      problemStatement: 'You have two baskets, each holding only a single type of fruit. Find the maximum number of fruits you can pick from consecutive trees.',
      hint: 'Equivalent to finding the longest contiguous subarray containing at most 2 distinct integers.',
      solutionCode: `import java.util.*;

public class Main {
    public static int totalFruit(int[] fruits) {
        Map<Integer, Integer> countMap = new HashMap<>();
        int left = 0, maxFruits = 0;

        for (int right = 0; right < fruits.length; right++) {
            countMap.put(fruits[right], countMap.getOrDefault(fruits[right], 0) + 1);

            while (countMap.size() > 2) {
                countMap.put(fruits[left], countMap.get(fruits[left]) - 1);
                if (countMap.get(fruits[left]) == 0) {
                    countMap.remove(fruits[left]);
                }
                left++;
            }
            maxFruits = Math.max(maxFruits, right - left + 1);
        }
        return maxFruits;
    }

    public static void main(String[] args) {
        int[] fruits = {1, 2, 3, 2, 2};
        System.out.println("Max Fruits: " + totalFruit(fruits));
    }
}`,
      output: `Max Fruits: 4`,
      explanation: 'Maintaining a frequency map bounded at 2 distinct keys finds the maximum contiguous sequence in $O(N)$ time.'
    },
    {
      id: 'dsa-17-4-ex7',
      title: 'Minimum Window Substring (FAANG Hard)',
      problemStatement: 'Given strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If none, return empty string.',
      hint: 'Use frequency map of t and matched counter. Expand right until all chars are matched, then contract left to minimize.',
      solutionCode: `public class Main {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        int[] tCount = new int[128];
        for (char c : t.toCharArray()) tCount[c]++;

        int required = 0;
        for (int c : tCount) if (c > 0) required++;

        int[] sCount = new int[128];
        int formed = 0, left = 0;
        int minLen = Integer.MAX_VALUE, startIdx = 0;

        for (int right = 0; right < s.length(); right++) {
            char r = s.charAt(right);
            sCount[r]++;
            if (tCount[r] > 0 && sCount[r] == tCount[r]) formed++;

            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    startIdx = left;
                }
                char l = s.charAt(left);
                sCount[l]--;
                if (tCount[l] > 0 && sCount[l] < tCount[l]) formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(startIdx, startIdx + minLen);
    }

    public static void main(String[] args) {
        String s = "ADOBECODEBANC", t = "ABC";
        System.out.println("Min Window: " + minWindow(s, t));
    }
}`,
      output: `Min Window: BANC`,
      explanation: 'The `formed == required` match variable eliminates $O(128)$ map comparisons per step, solving Minimum Window Substring in strictly $O(|S| + |T|)$ time.'
    },
    {
      id: 'dsa-17-4-ex8',
      title: 'Subarrays with K Different Integers',
      problemStatement: 'Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums` that contain exactly `k` different integers.',
      hint: 'Exactly(k) = atMost(k) - atMost(k - 1).',
      solutionCode: `import java.util.*;

public class Main {
    private static int atMost(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        int left = 0, res = 0;
        for (int right = 0; right < nums.length; right++) {
            count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);
            while (count.size() > k) {
                count.put(nums[left], count.get(nums[left]) - 1);
                if (count.get(nums[left]) == 0) count.remove(nums[left]);
                left++;
            }
            res += right - left + 1;
        }
        return res;
    }

    public static int subarraysWithKDistinct(int[] nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 1, 2, 3};
        int k = 2;
        System.out.println("Subarrays with 2 distinct: " + subarraysWithKDistinct(nums, k));
    }
}`,
      output: `Subarrays with 2 distinct: 7`,
      explanation: 'Decomposing exact-$K$ into difference of two at-most sliding windows `atMost(k) - atMost(k - 1)` runs in $O(N)$ time.'
    },
    {
      id: 'dsa-17-4-ex9',
      title: 'Count Complete Subarrays in an Array',
      problemStatement: 'You are given an array `nums` consisting of positive integers. We call a subarray complete if the number of distinct elements in the subarray is equal to the number of distinct elements in the whole array. Return count.',
      hint: 'Find total distinct elements in array. Use dynamic sliding window: when window has all distinct, every extension to the right is also valid.',
      solutionCode: `import java.util.*;

public class Main {
    public static int countCompleteSubarrays(int[] nums) {
        Set<Integer> allSet = new HashSet<>();
        for (int x : nums) allSet.add(x);
        int totalDistinct = allSet.size();

        Map<Integer, Integer> windowCount = new HashMap<>();
        int left = 0, count = 0;
        int n = nums.length;

        for (int right = 0; right < n; right++) {
            windowCount.put(nums[right], windowCount.getOrDefault(nums[right], 0) + 1);
            while (windowCount.size() == totalDistinct) {
                count += (n - right); // All subarrays from right to n-1 are valid!
                windowCount.put(nums[left], windowCount.get(nums[left]) - 1);
                if (windowCount.get(nums[left]) == 0) windowCount.remove(nums[left]);
                left++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 1, 2, 2};
        System.out.println("Complete Subarrays: " + countCompleteSubarrays(nums));
    }
}`,
      output: `Complete Subarrays: 4`,
      explanation: 'Once a window has all distinct elements, all suffixes ending up to `n - 1` are automatically valid, adding `n - right` in $O(1)$.'
    },
    {
      id: 'dsa-17-4-ex10',
      title: 'Replace the Substring for Balanced String',
      problemStatement: 'You are given a string `s` of length `n` containing only \'Q\', \'W\', \'E\', \'R\'. A string is balanced if each character appears `n / 4` times. Return the minimum length of the substring that can be replaced with any other string of the same length to make `s` balanced.',
      hint: 'Characters outside the sliding window must have counts <= n / 4.',
      solutionCode: `public class Main {
    public static int balancedString(String s) {
        int n = s.length(), k = n / 4;
        int[] count = new int[128];
        for (char c : s.toCharArray()) count[c]++;

        if (count['Q'] <= k && count['W'] <= k && count['E'] <= k && count['R'] <= k) {
            return 0; // Already balanced
        }

        int minLen = n, left = 0;
        for (int right = 0; right < n; right++) {
            count[s.charAt(right)]--;
            while (count['Q'] <= k && count['W'] <= k && count['E'] <= k && count['R'] <= k) {
                minLen = Math.min(minLen, right - left + 1);
                count[s.charAt(left++)]++;
            }
        }
        return minLen;
    }

    public static void main(String[] args) {
        String s = "QWER";
        System.out.println("Min Substring to Replace: " + balancedString(s));
        String s2 = "QQQW";
        System.out.println("Min Substring to Replace for QQQW: " + balancedString(s2));
    }
}`,
      output: `Min Substring to Replace: 0
Min Substring to Replace for QQQW: 2`,
      explanation: 'Inverted sliding window: keeping external character counts under `n / 4` guarantees the replaced internal window can balance the string in $O(N)$ time.'
    }
  ]
};
