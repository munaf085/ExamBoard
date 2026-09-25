export interface JavaCodingProblem {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  examples: { input: string; output: string; explanation?: string; }[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  approach: string;
  solutionExplanation: string;
  javaSolution: string;
  tags: string[];
}

export const javaCodingProblems: JavaCodingProblem[] = [
  {
    id: "jcp_1",
    moduleId: "java_strings",
    title: "Reverse a String",
    description: "Write a function that reverses a string.",
    inputFormat: "A single string `s`.",
    outputFormat: "Return the reversed string.",
    constraints: "1 <= s.length <= 10^5\n`s` consists of printable ascii characters.",
    examples: [
      { input: "\"hello\"", output: "\"olleh\"", explanation: "The string is reversed." },
      { input: "\"Java\"", output: "\"avaJ\"", explanation: "The string is reversed." }
    ],
    difficulty: "Easy",
    hints: ["Try using a StringBuilder.", "You can also use a two-pointer approach if converting to a char array."],
    approach: "Convert the string to a character array, then swap the elements at the beginning and end, moving inwards until the pointers meet. Alternatively, use StringBuilder's reverse() method.",
    solutionExplanation: "The simplest solution uses the built-in StringBuilder.reverse() method. For an interview, an in-place char array swap is preferred. We initialize two pointers, left at 0 and right at length-1. We swap characters at these pointers and move them towards each other.",
    javaSolution: `public class Solution {
    public static String reverseString(String s) {
        char[] chars = s.toCharArray();
        int left = 0, right = chars.length - 1;
        while (left < right) {
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            left++;
            right--;
        }
        return new String(chars);
    }
}`,
    tags: ["String", "Two Pointers"]
  },
  {
    id: "jcp_2",
    moduleId: "java_strings",
    title: "Check if String is Palindrome",
    description: "Given a string `s`, return true if it is a palindrome, or false otherwise. A string is a palindrome if it reads the same forward and backward.",
    inputFormat: "A single string `s`.",
    outputFormat: "A boolean value.",
    constraints: "1 <= s.length <= 2 * 10^5",
    examples: [
      { input: "\"racecar\"", output: "true", explanation: "Reads the same forward and backward." },
      { input: "\"hello\"", output: "false", explanation: "Reads differently forward and backward." }
    ],
    difficulty: "Easy",
    hints: ["Use two pointers starting from both ends.", "Compare characters at left and right pointers."],
    approach: "Use two pointers, left starting at 0 and right starting at length - 1. Check if the characters at both pointers are equal. If they are, move pointers inward. If they are not, it's not a palindrome.",
    solutionExplanation: "We use a while loop to iterate through the string with left and right pointers. If we find a mismatch, we return false. If the loop completes, it's a palindrome.",
    javaSolution: `public class Solution {
    public static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
    tags: ["String", "Two Pointers"]
  },
  {
    id: "jcp_3",
    moduleId: "java_basics",
    title: "Find Factorial (recursive)",
    description: "Write a recursive function to find the factorial of a given non-negative integer `n`.",
    inputFormat: "A single integer `n`.",
    outputFormat: "An integer representing the factorial of `n`.",
    constraints: "0 <= n <= 12",
    examples: [
      { input: "5", output: "120", explanation: "5! = 5 * 4 * 3 * 2 * 1 = 120" },
      { input: "0", output: "1", explanation: "0! is defined as 1." }
    ],
    difficulty: "Easy",
    hints: ["Base case is when n is 0 or 1.", "Recursive step is n * factorial(n - 1)."],
    approach: "A factorial of n is n * (n-1)!. Use recursion to repeatedly multiply the number with the factorial of the number minus one, until reaching the base case of 0 or 1, which returns 1.",
    solutionExplanation: "The function calls itself with a decremented value until it hits the base case. Then it bubbles back up, multiplying the results.",
    javaSolution: `public class Solution {
    public static int factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}`,
    tags: ["Math", "Recursion"]
  },
  {
    id: "jcp_4",
    moduleId: "java_basics",
    title: "Fibonacci sequence (first N numbers)",
    description: "Generate an array containing the first `n` numbers of the Fibonacci sequence.",
    inputFormat: "An integer `n`.",
    outputFormat: "An array of `n` integers.",
    constraints: "1 <= n <= 45",
    examples: [
      { input: "5", output: "[0, 1, 1, 2, 3]", explanation: "The first 5 Fibonacci numbers." },
      { input: "1", output: "[0]", explanation: "The first Fibonacci number." }
    ],
    difficulty: "Easy",
    hints: ["Initialize an array of size n.", "First two numbers are 0 and 1. The rest are the sum of the previous two."],
    approach: "Iteratively build the sequence. Handle edge cases for n=1 and n=2. For n > 2, use a loop to add the two preceding numbers.",
    solutionExplanation: "We create an array of size n. We set the first element to 0 and the second to 1 (if n > 1). Then we loop from index 2 to n-1, computing each element as the sum of the two preceding elements.",
    javaSolution: `public class Solution {
    public static int[] fibonacci(int n) {
        if (n <= 0) return new int[0];
        int[] fib = new int[n];
        fib[0] = 0;
        if (n > 1) {
            fib[1] = 1;
            for (int i = 2; i < n; i++) {
                fib[i] = fib[i - 1] + fib[i - 2];
            }
        }
        return fib;
    }
}`,
    tags: ["Math", "Arrays"]
  },
  {
    id: "jcp_5",
    moduleId: "java_basics",
    title: "Check if number is Prime",
    description: "Determine whether a given integer `n` is a prime number.",
    inputFormat: "An integer `n`.",
    outputFormat: "A boolean value.",
    constraints: "1 <= n <= 10^9",
    examples: [
      { input: "7", output: "true", explanation: "7 has only two distinct positive divisors: 1 and 7." },
      { input: "10", output: "false", explanation: "10 is divisible by 2 and 5." }
    ],
    difficulty: "Easy",
    hints: ["Check divisibility from 2 up to the square root of n."],
    approach: "A number is prime if it is greater than 1 and has no positive divisors other than 1 and itself. We only need to check for divisors up to the square root of the number.",
    solutionExplanation: "First, return false if n <= 1. Then loop from i = 2 up to sqrt(n). If n is divisible by any i, it's not prime.",
    javaSolution: `public class Solution {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`,
    tags: ["Math"]
  },
  {
    id: "jcp_6",
    moduleId: "java_strings",
    title: "Count character frequency in a string",
    description: "Given a string `s`, return the frequency of each character as a Map.",
    inputFormat: "A string `s`.",
    outputFormat: "A Map<Character, Integer> containing character frequencies.",
    constraints: "1 <= s.length <= 10^4",
    examples: [
      { input: "\"hello\"", output: "{h=1, e=1, l=2, o=1}" },
      { input: "\"a\"", output: "{a=1}" }
    ],
    difficulty: "Easy",
    hints: ["Use a HashMap to store characters as keys and counts as values."],
    approach: "Iterate through the string character by character. If the character is in the map, increment its count. Otherwise, add it with a count of 1.",
    solutionExplanation: "We use a HashMap. For each char, we use map.getOrDefault(c, 0) + 1 to easily update the frequency.",
    javaSolution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static Map<Character, Integer> charFrequency(String s) {
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char c : s.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }
        return freqMap;
    }
}`,
    tags: ["String", "HashMap"]
  },
  {
    id: "jcp_7",
    moduleId: "java_arrays",
    title: "Find duplicate elements in an array",
    description: "Given an integer array `nums`, return all elements that appear more than once in the array.",
    inputFormat: "An integer array `nums`.",
    outputFormat: "A List of integers containing duplicates.",
    constraints: "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^5",
    examples: [
      { input: "[4,3,2,7,8,2,3,1]", output: "[2, 3]", explanation: "2 and 3 appear twice." },
      { input: "[1,1,2]", output: "[1]", explanation: "1 appears twice." }
    ],
    difficulty: "Medium",
    hints: ["Use a HashSet to keep track of seen elements."],
    approach: "Iterate over the array while keeping track of seen elements using a HashSet. If an element is already in the 'seen' set, it's a duplicate. Add it to the result list.",
    solutionExplanation: "We maintain a seen Set and a duplicates Set (to avoid returning the same duplicate multiple times). We iterate through nums. If not added to seen, it's new. If already there, we add to duplicates.",
    javaSolution: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Solution {
    public static List<Integer> findDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }
        return new ArrayList<>(duplicates);
    }
}`,
    tags: ["Array", "HashSet"]
  },
  {
    id: "jcp_8",
    moduleId: "java_arrays",
    title: "Find second largest element in array",
    description: "Given an array of integers, find the second largest distinct element.",
    inputFormat: "An integer array.",
    outputFormat: "The second largest integer. Throw exception if none exists.",
    constraints: "2 <= nums.length <= 10^5",
    examples: [
      { input: "[12, 35, 1, 10, 34, 1]", output: "34" },
      { input: "[10, 10, 10]", output: "Exception", explanation: "No second largest distinct element." }
    ],
    difficulty: "Easy",
    hints: ["Keep track of the largest and second largest elements simultaneously.", "Initialize them to Integer.MIN_VALUE."],
    approach: "Iterate through the array once. Maintain two variables: largest and secondLargest. Update them as you find larger elements.",
    solutionExplanation: "We initialize max and secondMax to Integer.MIN_VALUE. For each number, if it's > max, update secondMax to max, and max to num. If it's < max but > secondMax, update secondMax to num.",
    javaSolution: `public class Solution {
    public static int getSecondLargest(int[] nums) {
        int max = Integer.MIN_VALUE;
        int secondMax = Integer.MIN_VALUE;
        
        for (int num : nums) {
            if (num > max) {
                secondMax = max;
                max = num;
            } else if (num > secondMax && num != max) {
                secondMax = num;
            }
        }
        
        if (secondMax == Integer.MIN_VALUE) {
            throw new IllegalArgumentException("No second largest distinct element found.");
        }
        return secondMax;
    }
}`,
    tags: ["Array"]
  },
  {
    id: "jcp_9",
    moduleId: "java_arrays",
    title: "Remove duplicates from array",
    description: "Given a sorted integer array `nums`, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.",
    inputFormat: "A sorted integer array `nums`.",
    outputFormat: "An integer representing the count of unique elements.",
    constraints: "1 <= nums.length <= 3 * 10^4",
    examples: [
      { input: "[1,1,2]", output: "2", explanation: "Array becomes [1,2,_]" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", output: "5", explanation: "Array becomes [0,1,2,3,4,_,_,_,_,_]" }
    ],
    difficulty: "Easy",
    hints: ["Use a two-pointer approach.", "One pointer iterates through the array, the other keeps track of the position for the next unique element."],
    approach: "Since the array is sorted, duplicates are adjacent. Use a pointer `i` to keep track of the index for the next unique element, and a pointer `j` to scan the array. When `nums[i] != nums[j]`, increment `i` and copy `nums[j]` to `nums[i]`.",
    solutionExplanation: "Initialize index=1. Iterate j from 1 to length-1. If nums[j] != nums[j-1], it means we found a new unique element. We place it at nums[index] and increment index.",
    javaSolution: `public class Solution {
    public static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int index = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                nums[index++] = nums[i];
            }
        }
        return index;
    }
}`,
    tags: ["Array", "Two Pointers"]
  },
  {
    id: "jcp_10",
    moduleId: "java_arrays",
    title: "Find missing number in array 1 to N",
    description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    inputFormat: "An integer array `nums` of size `n`.",
    outputFormat: "The missing integer.",
    constraints: "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n",
    examples: [
      { input: "[3,0,1]", output: "2", explanation: "n = 3, range is [0,3]. 2 is missing." },
      { input: "[0,1]", output: "2", explanation: "n = 2, range is [0,2]. 2 is missing." }
    ],
    difficulty: "Easy",
    hints: ["What is the sum of numbers from 0 to n?", "Subtract the sum of the array elements from the expected sum."],
    approach: "Calculate the expected sum of numbers from 0 to n using the formula n*(n+1)/2. Then calculate the actual sum of the array elements. The difference is the missing number.",
    solutionExplanation: "The formula for the sum of the first N natural numbers is N * (N + 1) / 2. We sum the array and subtract it from the expected sum.",
    javaSolution: `public class Solution {
    public static int missingNumber(int[] nums) {
        int n = nums.length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        for (int num : nums) {
            actualSum += num;
        }
        return expectedSum - actualSum;
    }
}`,
    tags: ["Array", "Math"]
  },
  {
    id: "jcp_11",
    moduleId: "java_arrays",
    title: "Reverse an array in-place",
    description: "Write a function that reverses an array of integers in-place.",
    inputFormat: "An integer array `nums`.",
    outputFormat: "Void. Modify `nums` in-place.",
    constraints: "1 <= nums.length <= 10^5",
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" },
      { input: "[1, 2]", output: "[2, 1]" }
    ],
    difficulty: "Easy",
    hints: ["Use two pointers, one at the start and one at the end.", "Swap the elements at the pointers and move them towards the center."],
    approach: "Use a two-pointer approach. Initialize left at 0 and right at length-1. Swap the elements at left and right, then increment left and decrement right, until left >= right.",
    solutionExplanation: "We swap the elements symmetrically from the ends of the array towards the middle. This takes O(N) time and O(1) space.",
    javaSolution: `public class Solution {
    public static void reverseArray(int[] nums) {
        int left = 0;
        int right = nums.length - 1;
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}`,
    tags: ["Array", "Two Pointers"]
  },
  {
    id: "jcp_12",
    moduleId: "java_algorithms",
    title: "Binary search implementation",
    description: "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.",
    inputFormat: "A sorted integer array `nums` and an integer `target`.",
    outputFormat: "The index of the target, or -1.",
    constraints: "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4",
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums" }
    ],
    difficulty: "Easy",
    hints: ["Maintain low and high pointers.", "Calculate mid. Compare nums[mid] with target."],
    approach: "Use the binary search algorithm. Keep a low and high pointer. Find the middle element. If it's the target, return index. If it's less than target, search the right half. If greater, search the left half.",
    solutionExplanation: "Standard binary search. We loop while low <= high. Mid is calculated safely as low + (high - low) / 2 to prevent integer overflow.",
    javaSolution: `public class Solution {
    public static int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,
    tags: ["Array", "Binary Search"]
  },
  {
    id: "jcp_13",
    moduleId: "java_algorithms",
    title: "Bubble sort implementation",
    description: "Implement the Bubble Sort algorithm to sort an array of integers in ascending order in-place.",
    inputFormat: "An integer array `nums`.",
    outputFormat: "Void. Modify `nums` in-place.",
    constraints: "1 <= nums.length <= 1000",
    examples: [
      { input: "[5, 2, 9, 1, 5, 6]", output: "[1, 2, 5, 5, 6, 9]" },
      { input: "[1, 2, 3]", output: "[1, 2, 3]" }
    ],
    difficulty: "Easy",
    hints: ["Compare adjacent elements and swap them if they are in the wrong order.", "Repeat this for all elements until the array is sorted.", "Use a boolean flag to optimize if no swaps occurred in a pass."],
    approach: "Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    solutionExplanation: "We use two nested loops. The outer loop runs N-1 times. The inner loop compares adjacent elements and swaps them. An optimization `swapped` flag breaks the loop early if the array is already sorted.",
    javaSolution: `public class Solution {
    public static void bubbleSort(int[] nums) {
        int n = nums.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (nums[j] > nums[j + 1]) {
                    // swap
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break; // Optimization
        }
    }
}`,
    tags: ["Array", "Sorting"]
  },
  {
    id: "jcp_14",
    moduleId: "java_arrays",
    title: "Two Sum problem (find two indices that sum to target)",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    inputFormat: "An integer array `nums` and an integer `target`.",
    outputFormat: "An array of 2 integers representing the indices.",
    constraints: "2 <= nums.length <= 10^4\nExactly one valid answer exists.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] == 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] == 6" }
    ],
    difficulty: "Easy",
    hints: ["A brute force solution takes O(N^2). Can you do it in O(N)?", "Use a HashMap to store the numbers you've seen and their indices."],
    approach: "Use a HashMap to map values to their indices. Iterate through the array. For each element `x`, check if `target - x` is in the map. If it is, return the two indices.",
    solutionExplanation: "As we iterate, we calculate the complement (target - num). If the complement is in the map, we found our pair. If not, we add the current num and index to the map.",
    javaSolution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
    tags: ["Array", "HashMap"]
  },
  {
    id: "jcp_15",
    moduleId: "java_strings",
    title: "Anagram check (two strings)",
    description: "Given two strings `s` and `t`, return true if `t` is an anagram of `s`, and false otherwise.",
    inputFormat: "Two strings `s` and `t`.",
    outputFormat: "A boolean value.",
    constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
    examples: [
      { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
      { input: "s = \"rat\", t = \"car\"", output: "false" }
    ],
    difficulty: "Easy",
    hints: ["If the lengths are different, they can't be anagrams.", "Count the frequencies of characters in both strings."],
    approach: "Since inputs are lowercase letters, we can use an integer array of size 26 to count character frequencies. Increment counts for string `s` and decrement for string `t`. If all counts are 0 at the end, they are anagrams.",
    solutionExplanation: "We use a frequency array of size 26. We iterate through both strings simultaneously (after checking length). We increment for 's' and decrement for 't'. Finally, we check if all values in the array are 0.",
    javaSolution: `public class Solution {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); i++) {
            counts[s.charAt(i) - 'a']++;
            counts[t.charAt(i) - 'a']--;
        }
        
        for (int count : counts) {
            if (count != 0) return false;
        }
        
        return true;
    }
}`,
    tags: ["String", "HashTable"]
  },
  {
    id: "jcp_16",
    moduleId: "java_strings",
    title: "Count vowels and consonants in a string",
    description: "Write a function that counts the number of vowels and consonants in a given string. Ignore spaces and special characters.",
    inputFormat: "A single string `s`.",
    outputFormat: "An integer array of size 2: [vowelsCount, consonantsCount].",
    constraints: "1 <= s.length <= 10^4",
    examples: [
      { input: "\"Hello World\"", output: "[3, 7]", explanation: "Vowels: e, o, o. Consonants: H, l, l, W, r, l, d." }
    ],
    difficulty: "Easy",
    hints: ["Convert string to lowercase to simplify checks.", "Check if a character is a letter first."],
    approach: "Iterate through the string. Check if each character is a letter. If it is, check if it's a vowel (a, e, i, o, u). If yes, increment vowel count, else increment consonant count.",
    solutionExplanation: "We convert the string to lowercase. We iterate through each char. We use Character.isLetter() to ignore spaces and punctuation. Then we check against a string of vowels.",
    javaSolution: `public class Solution {
    public static int[] countVowelsAndConsonants(String s) {
        int vowels = 0;
        int consonants = 0;
        String vStr = "aeiou";
        
        for (char c : s.toLowerCase().toCharArray()) {
            if (Character.isLetter(c)) {
                if (vStr.indexOf(c) != -1) {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }
        return new int[]{vowels, consonants};
    }
}`,
    tags: ["String"]
  },
  {
    id: "jcp_17",
    moduleId: "java_arrays",
    title: "Print Pascal's Triangle (N rows)",
    description: "Given an integer `numRows`, return the first numRows of Pascal's triangle.",
    inputFormat: "An integer `numRows`.",
    outputFormat: "A List of List of Integers representing the triangle.",
    constraints: "1 <= numRows <= 30",
    examples: [
      { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
      { input: "1", output: "[[1]]" }
    ],
    difficulty: "Medium",
    hints: ["Each number is the sum of the two numbers directly above it.", "The first and last elements of each row are 1."],
    approach: "Build the triangle row by row. The first row is always [1]. For subsequent rows, the first and last elements are 1. Middle elements are computed by adding the two elements from the previous row directly above them.",
    solutionExplanation: "We create an outer List. We iteratively build each inner List (row). For a row of index 'i', we get the 'i-1' row to compute sums. We handle the 1s at boundaries.",
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        if (numRows == 0) return triangle;
        
        List<Integer> firstRow = new ArrayList<>();
        firstRow.add(1);
        triangle.add(firstRow);
        
        for (int i = 1; i < numRows; i++) {
            List<Integer> prevRow = triangle.get(i - 1);
            List<Integer> row = new ArrayList<>();
            
            row.add(1); // First element
            for (int j = 1; j < i; j++) {
                row.add(prevRow.get(j - 1) + prevRow.get(j));
            }
            row.add(1); // Last element
            
            triangle.add(row);
        }
        return triangle;
    }
}`,
    tags: ["Array", "Dynamic Programming"]
  },
  {
    id: "jcp_18",
    moduleId: "java_basics",
    title: "FizzBuzz (1-100)",
    description: "Return a string array from 1 to `n` where `answer[i] == \"FizzBuzz\"` if `i` is divisible by 3 and 5, `\"Fizz\"` if by 3, `\"Buzz\"` if by 5, and `i` (as a string) if none of the above.",
    inputFormat: "An integer `n`.",
    outputFormat: "A List of strings.",
    constraints: "1 <= n <= 10^4",
    examples: [
      { input: "3", output: "[\"1\",\"2\",\"Fizz\"]" },
      { input: "5", output: "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]" }
    ],
    difficulty: "Easy",
    hints: ["Use the modulo operator (%).", "Check for divisibility by 15 (3 and 5) first."],
    approach: "Loop from 1 to n. For each number, check modulo 15, then modulo 3, then modulo 5. Append the appropriate string to the result list.",
    solutionExplanation: "A standard loop with if-else-if ladder. The order of conditions is important: we must check i % 15 == 0 first because if a number is divisible by 15, it's also divisible by 3 and 5.",
    javaSolution: `import java.util.ArrayList;
import java.util.List;

public class Solution {
    public static List<String> fizzBuzz(int n) {
        List<String> result = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) {
                result.add("FizzBuzz");
            } else if (i % 3 == 0) {
                result.add("Fizz");
            } else if (i % 5 == 0) {
                result.add("Buzz");
            } else {
                result.add(String.valueOf(i));
            }
        }
        return result;
    }
}`,
    tags: ["Math", "String"]
  },
  {
    id: "jcp_19",
    moduleId: "java_basics",
    title: "Check Armstrong number",
    description: "Given an integer `n`, return true if it is an Armstrong number (an n-digit number that is equal to the sum of the nth powers of its digits).",
    inputFormat: "An integer `n`.",
    outputFormat: "A boolean value.",
    constraints: "1 <= n <= 10^8",
    examples: [
      { input: "153", output: "true", explanation: "1^3 + 5^3 + 3^3 = 153" },
      { input: "123", output: "false", explanation: "1^3 + 2^3 + 3^3 = 36 != 123" }
    ],
    difficulty: "Easy",
    hints: ["Find the number of digits first.", "Extract digits one by one using modulo 10 and division by 10."],
    approach: "First, count the number of digits in `n`. Then, iterate through each digit of `n`, raise it to the power of the number of digits, and add it to a sum. Finally, check if the sum equals the original number.",
    solutionExplanation: "We first convert to string (or loop) to find the length (power). Then we extract digits by doing num % 10, calculate Math.pow(digit, power), add to sum, and do num /= 10. We compare the sum to the original number.",
    javaSolution: `public class Solution {
    public static boolean isArmstrong(int n) {
        int original = n;
        int sum = 0;
        int digits = String.valueOf(n).length();
        
        while (n > 0) {
            int digit = n % 10;
            sum += Math.pow(digit, digits);
            n /= 10;
        }
        
        return sum == original;
    }
}`,
    tags: ["Math"]
  },
  {
    id: "jcp_20",
    moduleId: "java_data_structures",
    title: "Stack implementation using array",
    description: "Design a Stack class that supports push, pop, top, and isEmpty operations using a fixed-size array.",
    inputFormat: "Series of stack operations.",
    outputFormat: "Results of top and pop operations.",
    constraints: "Maximum 1000 operations.",
    examples: [
      { input: "push(1), push(2), top(), pop(), isEmpty()", output: "2, 2, false", explanation: "Top is 2, pop returns 2, stack is not empty." }
    ],
    difficulty: "Medium",
    hints: ["Keep a pointer/index `top` to point to the current top element.", "Initialize `top` with -1."],
    approach: "Create an array of a fixed size. Keep an integer variable `topIndex` initialized to -1. On `push`, increment `topIndex` and store the value. On `pop`, return the value at `topIndex` and decrement it.",
    solutionExplanation: "This is a basic data structure implementation. The crucial part is handling array bounds (Stack Overflow on push if full, Stack Underflow on pop if empty).",
    javaSolution: `public class MyStack {
    private int[] arr;
    private int topIndex;
    private int capacity;

    public MyStack(int capacity) {
        this.capacity = capacity;
        arr = new int[capacity];
        topIndex = -1;
    }

    public void push(int x) {
        if (topIndex == capacity - 1) {
            throw new RuntimeException("Stack Overflow");
        }
        arr[++topIndex] = x;
    }

    public int pop() {
        if (isEmpty()) {
            throw new RuntimeException("Stack Underflow");
        }
        return arr[topIndex--];
    }

    public int top() {
        if (isEmpty()) {
            throw new RuntimeException("Stack is Empty");
        }
        return arr[topIndex];
    }

    public boolean isEmpty() {
        return topIndex == -1;
    }
}`,
    tags: ["Design", "Stack"]
  }
];
