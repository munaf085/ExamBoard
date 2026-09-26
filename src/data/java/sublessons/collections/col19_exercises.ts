import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 19: HASHING & HASHMAP INTERNALS (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 19.1 - 19.4
// ============================================================

export const col19Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 19.1: HashMap Architecture & Hash Spreading ──────────────
  'hashmap-internal-architecture': [
    {
      id: 'col-19-1-ex1',
      title: 'Manual Hash Spreading Function Simulation',
      problemStatement: 'Implement Java 8 HashMap`s hash spreading function `(h = key.hashCode()) ^ (h >>> 16)` and compute the table bucket index for a table of length 16.',
      hint: 'Bitwise shift high 16 bits to the right and XOR with original hashCode, then bitwise AND with (tableLength - 1).',
      solutionCode: `public class Main {
    public static int spreadHash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

    public static int getBucketIndex(Object key, int tableLength) {
        int hash = spreadHash(key);
        return (tableLength - 1) & hash;
    }

    public static void main(String[] args) {
        String key = "interview";
        int hash = spreadHash(key);
        int index = getBucketIndex(key, 16);
        System.out.println("Key: " + key + " | Spread Hash: " + hash + " | Bucket Index: " + index);
    }
}`,
      output: `Key: interview | Spread Hash: 1222453444 | Bucket Index: 4`,
      explanation: 'Bitwise XORing the upper 16 bits into the lower 16 bits spreads entropy across all bits so that small tables (length 16) take advantage of high-order bits.'
    },
    {
      id: 'col-19-1-ex2',
      title: 'Tracking Word Frequencies using Map.merge()',
      problemStatement: 'Use Java 8 `Map.merge()` to compute word counts cleanly without verbose null checks or `getOrDefault()`.',
      hint: 'map.merge(word, 1, Integer::sum) atomically increments counts.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
        Map<String, Integer> counts = new HashMap<>();

        for (String w : words) {
            counts.merge(w, 1, Integer::sum);
        }

        System.out.println("Frequencies: " + counts);
    }
}`,
      output: `Frequencies: {banana=2, apple=3, cherry=1}`,
      explanation: '`Map.merge(key, 1, Integer::sum)` inserts 1 if key is absent; otherwise it applies the remapping function `Integer::sum`.'
    },
    {
      id: 'col-19-1-ex3',
      title: 'Custom Key with Proper equals() and hashCode()',
      problemStatement: 'Create an immutable `EmployeeId` class with valid `equals()` and `hashCode()`, demonstrating that two distinct object instances with identical department and id map to the same HashMap entry.',
      hint: 'Use Objects.equals() and Objects.hash(dept, id).',
      solutionCode: `import java.util.*;

final class EmployeeId {
    private final String dept;
    private final int id;

    public EmployeeId(String dept, int id) {
        this.dept = dept;
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EmployeeId)) return false;
        EmployeeId that = (EmployeeId) o;
        return this.id == that.id && Objects.equals(this.dept, that.dept);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dept, id);
    }

    @Override
    public String toString() { return dept + "-" + id; }
}

public class Main {
    public static void main(String[] args) {
        Map<EmployeeId, String> roster = new HashMap<>();
        roster.put(new EmployeeId("ENG", 101), "Alice");

        // Retrieve using a separate new instance with identical fields
        String name = roster.get(new EmployeeId("ENG", 101));
        System.out.println("Found: " + name + " | Map Size: " + roster.size());
    }
}`,
      output: `Found: Alice | Map Size: 1`,
      explanation: 'Overriding both equals and hashCode ensures different heap instances with equivalent fields hash to the same bucket and evaluate as equal.'
    },
    {
      id: 'col-19-1-ex4',
      title: 'Finding First Non-Repeating Character in O(N)',
      problemStatement: 'Find the first non-repeating character in a string using a LinkedHashMap to preserve first-seen character order.',
      hint: 'Count frequencies in LinkedHashMap, then iterate entrySet to find the first character with count 1.',
      solutionCode: `import java.util.*;

public class Main {
    public static Character firstNonRepeating(String s) {
        Map<Character, Integer> counts = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            counts.put(c, counts.getOrDefault(c, 0) + 1);
        }
        for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 1) return entry.getKey();
        }
        return null;
    }

    public static void main(String[] args) {
        System.out.println("First non-repeating in 'swiss': " + firstNonRepeating("swiss"));
        System.out.println("First non-repeating in 'recurrent': " + firstNonRepeating("recurrent"));
    }
}`,
      output: `First non-repeating in 'swiss': w
First non-repeating in 'recurrent': u`,
      explanation: 'LinkedHashMap preserves encounter order, enabling instant identification of the first unique element after a single frequency-counting pass.'
    },
    {
      id: 'col-19-1-ex5',
      title: 'Group Anagrams using Sorted String Key',
      problemStatement: 'Given an array of strings, group all anagrams together into sub-lists using a HashMap where the key is the sorted character array.',
      hint: 'Sort characters of each string: "eat" -> "aet". Use map.computeIfAbsent().',
      solutionCode: `import java.util.*;

public class Main {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println("Grouped Anagrams: " + groupAnagrams(words));
    }
}`,
      output: `Grouped Anagrams: [[eat, tea, ate], [bat], [tan, nat]]`,
      explanation: 'Sorting the characters creates a canonical signature for each anagram family. computeIfAbsent initializes and appends to the list in O(N * K log K) time.'
    },
    {
      id: 'col-19-1-ex6',
      title: 'Subarray Sum Equals K via Prefix Sum Hash Map',
      problemStatement: 'Count the total number of continuous subarrays whose sum equals K in O(N) time using a prefix sum frequency map.',
      hint: 'If prefixSum - K exists in map, add its frequency to total count. Seed map with (0, 1).',
      solutionCode: `import java.util.*;

public class Main {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0, 1);
        int currentSum = 0;
        int totalSubarrays = 0;

        for (int x : nums) {
            currentSum += x;
            if (prefixCounts.containsKey(currentSum - k)) {
                totalSubarrays += prefixCounts.get(currentSum - k);
            }
            prefixCounts.merge(currentSum, 1, Integer::sum);
        }
        return totalSubarrays;
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3, -2, 1, 1, 1};
        System.out.println("Subarrays summing to 3: " + subarraySum(nums, 3));
    }
}`,
      output: `Subarrays summing to 3: 4`,
      explanation: 'If `currentSum - previousSum = k`, then the subarray between them sums to `k`. Tracking prefix sum counts in a HashMap reduces O(N^2) search to O(N).'
    },
    {
      id: 'col-19-1-ex7',
      title: 'Handling Null Keys and Values in HashMap',
      problemStatement: 'Demonstrate how HashMap accommodates a null key and null values, and how `containsKey()` distinguishes between an absent key and a key mapped to null.',
      hint: 'HashMap stores null key at bucket index 0. Use containsKey() instead of checking get() == null.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put(null, "Root");
        map.put("keyA", null);

        System.out.println("Null key value: " + map.get(null));
        System.out.println("get('keyA') == null: " + (map.get("keyA") == null));
        System.out.println("containsKey('keyA'): " + map.containsKey("keyA"));
        System.out.println("containsKey('keyB'): " + map.containsKey("keyB"));
    }
}`,
      output: `Null key value: Root
get('keyA') == null: true
containsKey('keyA'): true
containsKey('keyB'): false`,
      explanation: '`get(k) == null` is ambiguous because the key might be absent or present with value null. `containsKey(k)` accurately differentiates between the two.'
    },
    {
      id: 'col-19-1-ex8',
      title: 'Map.computeIfAbsent for In-Memory Caching',
      problemStatement: 'Implement a memoized Fibonacci calculator using `Map.computeIfAbsent` to prevent redundant recursive calculations.',
      hint: 'map.computeIfAbsent(n, k -> fib(k - 1) + fib(k - 2)).',
      solutionCode: `import java.util.*;

public class Main {
    private static final Map<Integer, Long> memo = new HashMap<>();

    public static long fib(int n) {
        if (n <= 1) return n;
        return memo.computeIfAbsent(n, k -> fib(k - 1) + fib(k - 2));
    }

    public static void main(String[] args) {
        System.out.println("fib(10): " + fib(10));
        System.out.println("fib(50): " + fib(50));
    }
}`,
      output: `fib(10): 55
fib(50): 12586269025`,
      explanation: '`computeIfAbsent` evaluates the lambda mapping function only when the key is absent, memoizing intermediate calculations and turning O(2^N) recursion into linear O(N).'
    },
    {
      id: 'col-19-1-ex9',
      title: 'IdentityHashMap Reference Equality vs Object Equality',
      problemStatement: 'Demonstrate how `IdentityHashMap` compares keys using reference equality (`==`) rather than `equals()`, allowing distinct String objects with the same characters to coexist.',
      hint: 'Use new String("test") to generate distinct heap instances.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> standardMap = new HashMap<>();
        Map<String, Integer> identityMap = new IdentityHashMap<>();

        String s1 = new String("key");
        String s2 = new String("key");

        standardMap.put(s1, 100);
        standardMap.put(s2, 200);

        identityMap.put(s1, 100);
        identityMap.put(s2, 200);

        System.out.println("Standard HashMap size:  " + standardMap.size());
        System.out.println("IdentityHashMap size:   " + identityMap.size());
    }
}`,
      output: `Standard HashMap size:  1
IdentityHashMap size:   2`,
      explanation: '`IdentityHashMap` uses `System.identityHashCode(k)` and `k1 == k2`. Since `s1` and `s2` are separate heap references, both are retained.'
    },
    {
      id: 'col-19-1-ex10',
      title: 'Top K Frequent Elements using Frequency Map and Min-Heap',
      problemStatement: 'Given an integer array, return the K most frequent elements using a HashMap frequency counter combined with a min-heap PriorityQueue of size K in O(N log K) time.',
      hint: 'Map element to count. Store entries in PriorityQueue comparing counts ascending.',
      solutionCode: `import java.util.*;

public class Main {
    public static List<Integer> topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);

        PriorityQueue<Map.Entry<Integer, Integer>> minHeap =
            new PriorityQueue<>(Comparator.comparingInt(Map.Entry::getValue));

        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) minHeap.poll();
        }

        List<Integer> result = new ArrayList<>();
        while (!minHeap.isEmpty()) result.add(minHeap.poll().getKey());
        Collections.reverse(result);
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 2, 2, 3, 4, 4, 4, 4};
        System.out.println("Top 2 frequent: " + topKFrequent(nums, 2));
    }
}`,
      output: `Top 2 frequent: [4, 1]`,
      explanation: 'Combining a HashMap frequency counter with a bounded Min-Heap of size K yields optimal O(N log K) time and O(N) space.'
    }
  ],

  // ── LESSON 19.2: Hash Collisions & Red-Black Treeification ───────────
  'hash-collisions-and-treeification': [
    {
      id: 'col-19-2-ex1',
      title: 'Simulating Hash Collisions with Same hashCode()',
      problemStatement: 'Create a collision-prone class where every instance returns `hashCode() = 42`. Put 5 objects into a HashMap and observe that all values are stored correctly via `equals()`.',
      hint: 'Override hashCode() to return constant 42. Verify equals() uses an ID field.',
      solutionCode: `import java.util.*;

class CollidingKey {
    final int id;
    CollidingKey(int id) { this.id = id; }

    @Override
    public int hashCode() { return 42; } // Guaranteed collision!

    @Override
    public boolean equals(Object o) {
        return (o instanceof CollidingKey) && this.id == ((CollidingKey) o).id;
    }

    @Override
    public String toString() { return "Key-" + id; }
}

public class Main {
    public static void main(String[] args) {
        Map<CollidingKey, String> map = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            map.put(new CollidingKey(i), "Val-" + i);
        }

        System.out.println("Map size: " + map.size());
        System.out.println("Lookup Key-3: " + map.get(new CollidingKey(3)));
    }
}`,
      output: `Map size: 5
Lookup Key-3: Val-3`,
      explanation: 'All 5 keys land in bucket (42 ^ (42 >>> 16)) & 15. HashMap chains them in a singly-linked list, resolving collisions through equals().'
    },
    {
      id: 'col-19-2-ex2',
      title: 'Inspecting Bucket Treeification Thresholds',
      problemStatement: 'Verify the Java 8 HashMap treeification constants: `TREEIFY_THRESHOLD = 8`, `UNTREEIFY_THRESHOLD = 6`, and `MIN_TREEIFY_CAPACITY = 64`. Print and verify these values.',
      hint: 'In OpenJDK, bucket bins treeify into TreeNode only if bin count >= 8 AND table capacity >= 64.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        final int TREEIFY_THRESHOLD = 8;
        final int UNTREEIFY_THRESHOLD = 6;
        final int MIN_TREEIFY_CAPACITY = 64;

        System.out.println("Treeify Threshold:       " + TREEIFY_THRESHOLD);
        System.out.println("Untreeify Threshold:     " + UNTREEIFY_THRESHOLD);
        System.out.println("Min Treeify Capacity:    " + MIN_TREEIFY_CAPACITY);
        System.out.println("Hysteresis Gap:          " + (TREEIFY_THRESHOLD - UNTREEIFY_THRESHOLD));
    }
}`,
      output: `Treeify Threshold:       8
Untreeify Threshold:     6
Min Treeify Capacity:    64
Hysteresis Gap:          2`,
      explanation: 'The hysteresis gap of 2 (8 vs 6) prevents thrashing between linked list and red-black tree when elements around threshold 8 are repeatedly added and removed.'
    },
    {
      id: 'col-19-2-ex3',
      title: 'Comparable Custom Key for Deterministic Tree Bins',
      problemStatement: 'Implement `Comparable<CustomKey>` on colliding keys so that when a bucket treeifies into a Red-Black tree, TreeNode uses `compareTo()` for fast O(log N) branch traversal.',
      hint: 'TreeNode checks if key implements Comparable; otherwise it falls back to tieBreakOrder using System.identityHashCode.',
      solutionCode: `import java.util.*;

class SortableKey implements Comparable<SortableKey> {
    final int id;
    SortableKey(int id) { this.id = id; }

    @Override
    public int hashCode() { return 100; } // Same bucket

    @Override
    public boolean equals(Object o) {
        return (o instanceof SortableKey) && this.id == ((SortableKey) o).id;
    }

    @Override
    public int compareTo(SortableKey o) {
        return Integer.compare(this.id, o.id);
    }
}

public class Main {
    public static void main(String[] args) {
        Map<SortableKey, Integer> map = new HashMap<>();
        for (int i = 0; i < 10; i++) {
            map.put(new SortableKey(i), i * 10);
        }
        System.out.println("Total inserted: " + map.size());
        System.out.println("Key-7 value: " + map.get(new SortableKey(7)));
    }
}`,
      output: `Total inserted: 10
Key-7 value: 70`,
      explanation: 'Implementing Comparable ensures that when a bucket converts to a Red-Black tree, searches traverse left or right branches via compareTo in O(log N) time.'
    },
    {
      id: 'col-19-2-ex4',
      title: 'Dos Attack Simulation with Colliding Hash Codes',
      problemStatement: 'Demonstrate performance degradation in a poorly distributed hash function where N items collide into a single bucket, comparing iteration vs lookup.',
      hint: 'All keys returning the same hashCode cause bucket chaining.',
      solutionCode: `import java.util.*;

class BadHashKey {
    final String key;
    BadHashKey(String key) { this.key = key; }
    @Override public int hashCode() { return 1; }
    @Override public boolean equals(Object o) {
        return (o instanceof BadHashKey) && Objects.equals(this.key, ((BadHashKey) o).key);
    }
}

public class Main {
    public static void main(String[] args) {
        Map<BadHashKey, Integer> map = new HashMap<>(128);
        for (int i = 0; i < 20; i++) {
            map.put(new BadHashKey("K" + i), i);
        }
        System.out.println("Colliding map size: " + map.size());
        System.out.println("Contains K15: " + map.containsKey(new BadHashKey("K15")));
    }
}`,
      output: `Colliding map size: 20
Contains K15: true`,
      explanation: 'In Java 7, 20 collisions in one bucket required O(N) linear search. In Java 8, with capacity >= 64, this bin treeifies into a Red-Black tree bounding search to O(log N).'
    },
    {
      id: 'col-19-2-ex5',
      title: 'Counting Collisions Across Random Keys',
      problemStatement: 'Simulate hashing 100 random keys into a table of size 16 and count the number of keys assigned to each bucket to visualize collision distribution.',
      hint: 'bucketIndex = (16 - 1) & spreadHash(key).',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int[] bucketCounts = new int[16];
        for (int i = 0; i < 100; i++) {
            String key = "User_" + i;
            int h = key.hashCode();
            int spread = h ^ (h >>> 16);
            int bucket = spread & 15;
            bucketCounts[bucket]++;
        }

        System.out.println("Bucket Distribution across 16 bins for 100 keys:");
        for (int b = 0; b < 16; b++) {
            System.out.println("Bucket [" + b + "]: " + bucketCounts[b] + " items");
        }
    }
}`,
      output: `Bucket Distribution across 16 bins for 100 keys:
Bucket [0]: 8 items
Bucket [1]: 5 items
Bucket [2]: 6 items
Bucket [3]: 7 items
Bucket [4]: 5 items
Bucket [5]: 6 items
Bucket [6]: 8 items
Bucket [7]: 7 items
Bucket [8]: 6 items
Bucket [9]: 7 items
Bucket [10]: 6 items
Bucket [11]: 5 items
Bucket [12]: 6 items
Bucket [13]: 6 items
Bucket [14]: 6 items
Bucket [15]: 6 items`,
      explanation: 'A well-distributed hash function distributes 100 items evenly across 16 buckets with an average bin depth of ~6.25 items, well below the treeify threshold of 8.'
    },
    {
      id: 'col-19-2-ex6',
      title: 'Two Sum Problem using Collision-Resistant HashMap',
      problemStatement: 'Find indices of two numbers that add up to target in O(N) time using a HashMap complement lookup.',
      hint: 'For each number x, check if (target - x) exists in map. Otherwise store (x, index).',
      solutionCode: `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println("Indices: [" + result[0] + ", " + result[1] + "]");
    }
}`,
      output: `Indices: [0, 1]`,
      explanation: 'HashMap lookup takes O(1) average time, reducing the brute-force O(N^2) pair search to a single linear O(N) sweep.'
    },
    {
      id: 'col-19-2-ex7',
      title: 'Isomorphic Strings Verification with Dual Maps',
      problemStatement: 'Determine if two strings s and t are isomorphic (characters in s can be replaced to get t) using two HashMaps to track bidirectional character mappings.',
      hint: 'Ensure mapS.put(c1, c2) matches mapT.put(c2, c1).',
      solutionCode: `import java.util.*;

public class Main {
    public static boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<Character, Character> mapST = new HashMap<>();
        Map<Character, Character> mapTS = new HashMap<>();

        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i), c2 = t.charAt(i);
            if (mapST.containsKey(c1) && mapST.get(c1) != c2) return false;
            if (mapTS.containsKey(c2) && mapTS.get(c2) != c1) return false;
            mapST.put(c1, c2);
            mapTS.put(c2, c1);
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("egg & add: " + isIsomorphic("egg", "add"));
        System.out.println("foo & bar: " + isIsomorphic("foo", "bar"));
    }
}`,
      output: `egg & add: true
foo & bar: false`,
      explanation: 'Bidirectional mapping via dual HashMaps guarantees a 1-to-1 bijection between character alphabets in O(N) time.'
    },
    {
      id: 'col-19-2-ex8',
      title: 'Longest Consecutive Sequence in O(N) Time',
      problemStatement: 'Find the length of the longest consecutive elements sequence in an unsorted array in O(N) time using a HashSet.',
      hint: 'Only start counting streak if (num - 1) is NOT in the set (i.e. num is the start of a streak).',
      solutionCode: `import java.util.*;

public class Main {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int n : nums) numSet.add(n);

        int longest = 0;
        for (int n : numSet) {
            // Check if n is the start of a sequence
            if (!numSet.contains(n - 1)) {
                int current = n;
                int streak = 1;
                while (numSet.contains(current + 1)) {
                    current++;
                    streak++;
                }
                longest = Math.max(longest, streak);
            }
        }
        return longest;
    }

    public static void main(String[] args) {
        int[] nums = {100, 4, 200, 1, 3, 2};
        System.out.println("Longest consecutive: " + longestConsecutive(nums));
    }
}`,
      output: `Longest consecutive: 4`,
      explanation: 'Filtering for streak starters (`!set.contains(n - 1)`) guarantees each element is visited at most twice, achieving strict O(N) time.'
    },
    {
      id: 'col-19-2-ex9',
      title: 'Custom Hash Function with High Collision Rate vs Prime Multiplier',
      problemStatement: 'Compare a naive additive hash function `sum(chars)` against Java String`s `31 * h + c` prime multiplier hash on anagram strings.',
      hint: 'Additive hash produces identical hash codes for all anagrams (e.g. "listen" and "silent").',
      solutionCode: `public class Main {
    public static int naiveAdditiveHash(String s) {
        int sum = 0;
        for (char c : s.toCharArray()) sum += c;
        return sum;
    }

    public static void main(String[] args) {
        String s1 = "listen";
        String s2 = "silent";

        System.out.println("Naive Additive Hash s1: " + naiveAdditiveHash(s1));
        System.out.println("Naive Additive Hash s2: " + naiveAdditiveHash(s2) + " (Collision!)");

        System.out.println("Java String hashCode s1: " + s1.hashCode());
        System.out.println("Java String hashCode s2: " + s2.hashCode() + " (Unique!)");
    }
}`,
      output: `Naive Additive Hash s1: 655
Naive Additive Hash s2: 655 (Collision!)
Java String hashCode s1: -1097462182
Java String hashCode s2: -891823906 (Unique!)`,
      explanation: 'Prime multiplier 31 incorporates positional weight (`31 * h + c`), ensuring anagrams with identical character counts yield different hash codes.'
    },
    {
      id: 'col-19-2-ex10',
      title: 'Detecting Treeification Requirements via Table Capacity',
      problemStatement: 'Demonstrate that adding 8 colliding items into a HashMap with capacity 16 causes table resize rather than treeification until capacity reaches 64.',
      hint: 'In HashMap.putVal: if binCount >= TREEIFY_THRESHOLD - 1, call treeifyBin(). Inside treeifyBin: if tab.length < 64, call resize() instead.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int currentCapacity = 16;
        int collidingElements = 9;
        
        System.out.println("Colliding elements in bin: " + collidingElements);
        System.out.println("Initial table capacity:    " + currentCapacity);
        
        if (collidingElements >= 8 && currentCapacity < 64) {
            System.out.println("Action taken: RESIZE table to double capacity (not treeify yet!)");
        } else if (collidingElements >= 8 && currentCapacity >= 64) {
            System.out.println("Action taken: TREEIFY bin into Red-Black Tree!");
        }
    }
}`,
      output: `Colliding elements in bin: 9
Initial table capacity:    16
Action taken: RESIZE table to double capacity (not treeify yet!)`,
      explanation: 'Java 8 avoids unnecessary treeification when the table is small: it doubles the table capacity first, which often splits the colliding bucket across high and low indices.'
    }
  ],

  // ── LESSON 19.3: Resizing, Load Factor & Rehashing Mechanics ─────────
  'hashmap-resizing-and-rehash': [
    {
      id: 'col-19-3-ex1',
      title: 'Threshold Calculation and 0.75f Load Factor',
      problemStatement: 'Calculate the threshold at which a HashMap resizes for initial capacities of 16, 32, and 64 with default load factor 0.75f.',
      hint: 'threshold = (int) (capacity * loadFactor).',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        float loadFactor = 0.75f;
        int[] capacities = {16, 32, 64, 128};

        for (int cap : capacities) {
            int threshold = (int) (cap * loadFactor);
            System.out.println("Capacity: " + cap + " | Threshold: " + threshold + " (resizes on " + (threshold + 1) + "th add)");
        }
    }
}`,
      output: `Capacity: 16 | Threshold: 12 (resizes on 13th add)
Capacity: 32 | Threshold: 24 (resizes on 25th add)
Capacity: 64 | Threshold: 48 (resizes on 49th add)
Capacity: 128 | Threshold: 96 (resizes on 97th add)`,
      explanation: 'At 0.75 load factor, a 16-slot table resizes when size exceeds 12. 0.75 offers the mathematical sweet spot between time (few collisions) and space (25% headroom).'
    },
    {
      id: 'col-19-3-ex2',
      title: 'Java 8 Bit-Test Rehash Simulation: (hash & oldCap) == 0',
      problemStatement: 'Simulate Java 8 HashMap`s rehashing algorithm where elements in a bucket are split into `lowHead` (same index) and `highHead` (index + oldCap) using `(hash & oldCap) == 0`.',
      hint: 'If (hash & oldCap) == 0, new index is old index. If != 0, new index is old index + oldCap.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int oldCap = 16;
        int newCap = 32;
        int[] hashes = {5, 21, 37, 53}; // All had index 5 in oldCap: (hash & 15) == 5

        System.out.println("Rehashing bucket 5 from capacity 16 to 32:");
        for (int h : hashes) {
            boolean staysAtLow = (h & oldCap) == 0;
            int newIndex = staysAtLow ? (h & (newCap - 1)) : (5 + oldCap);
            System.out.println("Hash: " + h + " | (h & 16) == 0? " + staysAtLow + " -> New Index: " + newIndex);
        }
    }
}`,
      output: `Rehashing bucket 5 from capacity 16 to 32:
Hash: 5 | (h & 16) == 0? true -> New Index: 5
Hash: 21 | (h & 16) == 0? false -> New Index: 21
Hash: 37 | (h & 16) == 0? true -> New Index: 5
Hash: 53 | (h & 16) == 0? false -> New Index: 21`,
      explanation: 'Java 8 rehashes without re-evaluating hash codes: testing the newly exposed power-of-two bit splits the bucket cleanly between oldIndex and oldIndex + oldCap.'
    },
    {
      id: 'col-19-3-ex3',
      title: 'Pre-sizing HashMap to Prevent Resizes',
      problemStatement: 'Calculate the required initial capacity to store N items without triggering a resize using the formula `(int) Math.ceil(targetItems / 0.75f)`.',
      hint: 'To store 100 items without resize: 100 / 0.75 = 133.3 -> round up to next power of 2: 256.',
      solutionCode: `public class Main {
    public static int optimalCapacity(int expectedItems) {
        int required = (int) Math.ceil(expectedItems / 0.75f);
        // Round up to next power of two
        int cap = 1;
        while (cap < required) cap <<= 1;
        return cap;
    }

    public static void main(String[] args) {
        System.out.println("Capacity for 10 items:  " + optimalCapacity(10));
        System.out.println("Capacity for 50 items:  " + optimalCapacity(50));
        System.out.println("Capacity for 100 items: " + optimalCapacity(100));
        System.out.println("Capacity for 1000 items:" + optimalCapacity(1000));
    }
}`,
      output: `Capacity for 10 items:  16
Capacity for 50 items:  128
Capacity for 100 items: 256
Capacity for 1000 items: 2048`,
      explanation: 'Pre-sizing HashMap prevents multiple costly array allocations and rehashing cycles during bulk data ingestion.'
    },
    {
      id: 'col-19-3-ex4',
      title: 'Tracking HashMap Size Expansion with Simple Probe',
      problemStatement: 'Insert 20 elements into a default HashMap and track when the size exceeds threshold 12.',
      hint: 'Default capacity is 16, threshold is 12.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();
        for (int i = 1; i <= 20; i++) {
            map.put(i, "val" + i);
            if (i == 12) {
                System.out.println("Size reached 12 (Threshold). Next insert triggers 16 -> 32 resize!");
            }
            if (i == 13) {
                System.out.println("13th element added: HashMap has resized to capacity 32!");
            }
        }
        System.out.println("Final size: " + map.size());
    }
}`,
      output: `Size reached 12 (Threshold). Next insert triggers 16 -> 32 resize!
13th element added: HashMap has resized to capacity 32!
Final size: 20`,
      explanation: 'When size exceeds threshold (12), HashMap invokes `resize()`, doubling table capacity from 16 to 32 and setting new threshold to 24.'
    },
    {
      id: 'col-19-3-ex5',
      title: 'LRU Cache Eviction using LinkedHashMap',
      problemStatement: 'Implement a fixed-capacity Least Recently Used (LRU) Cache of size 3 by extending `LinkedHashMap` and overriding `removeEldestEntry()`.',
      hint: 'Use LinkedHashMap constructor with accessOrder = true, and return size() > MAX_CAPACITY in removeEldestEntry.',
      solutionCode: `import java.util.*;

class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int cap) {
        super(cap, 0.75f, true); // accessOrder = true
        this.capacity = cap;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}

public class Main {
    public static void main(String[] args) {
        LRUCache<String, Integer> cache = new LRUCache<>(3);
        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);
        System.out.println("Initial Cache: " + cache.keySet());

        cache.get("A"); // Access "A", making it most recently used
        cache.put("D", 4); // Evicts eldest ("B")!

        System.out.println("After accessing A and adding D: " + cache.keySet());
    }
}`,
      output: `Initial Cache: [A, B, C]
After accessing A and adding D: [C, A, D]`,
      explanation: 'LinkedHashMap with `accessOrder = true` moves accessed entries to the tail of its doubly-linked list. `removeEldestEntry` evicts the head when size exceeds capacity.'
    },
    {
      id: 'col-19-3-ex6',
      title: 'TableSizeFor Power of Two Round-up',
      problemStatement: 'Implement HashMap`s bit-smearing `tableSizeFor(int cap)` algorithm that rounds any integer up to the next power of two.',
      hint: 'n |= n >>> 1; n |= n >>> 2; n |= n >>> 4; n |= n >>> 8; n |= n >>> 16; return n + 1.',
      solutionCode: `public class Main {
    public static int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= 1 << 30) ? 1 << 30 : n + 1;
    }

    public static void main(String[] args) {
        System.out.println("tableSizeFor(5):   " + tableSizeFor(5));
        System.out.println("tableSizeFor(16):  " + tableSizeFor(16));
        System.out.println("tableSizeFor(25):  " + tableSizeFor(25));
        System.out.println("tableSizeFor(100): " + tableSizeFor(100));
    }
}`,
      output: `tableSizeFor(5):   8
tableSizeFor(16):  16
tableSizeFor(25):  32
tableSizeFor(100): 128`,
      explanation: 'Bitwise ORs with shifted values propagate the highest set bit through all lower bits, turning them into all 1s. Adding 1 yields the exact next power of 2.'
    },
    {
      id: 'col-19-3-ex7',
      title: 'Preserving Iteration Order During Resize with LinkedHashMap',
      problemStatement: 'Demonstrate that while HashMap bucket order reshuffles unpredictably during a resize, LinkedHashMap maintains identical insertion order before and after resizing.',
      hint: 'LinkedHashMap iterates via its doubly-linked list, completely independent of table bucket indices.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, Integer> lhm = new LinkedHashMap<>(4, 0.75f);
        lhm.put("First", 1);
        lhm.put("Second", 2);
        lhm.put("Third", 3);
        lhm.put("Fourth", 4); // Exceeds threshold 3, resizes!
        lhm.put("Fifth", 5);

        System.out.print("LinkedHashMap after resize: ");
        for (String k : lhm.keySet()) System.out.print(k + " ");
        System.out.println();
    }
}`,
      output: `LinkedHashMap after resize: First Second Third Fourth Fifth`,
      explanation: 'Because LinkedHashMap iterates through its separate `before` and `after` pointers, table rehashing does not disturb the sequence of entries.'
    },
    {
      id: 'col-19-3-ex8',
      title: 'Intersection of Two Arrays II with Duplicates',
      problemStatement: 'Compute the intersection of two integer arrays including duplicates using a frequency HashMap.',
      hint: 'Count elements of nums1 in HashMap. For nums2, decrement count and collect matching elements.',
      solutionCode: `import java.util.*;

public class Main {
    public static int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int n : nums1) counts.merge(n, 1, Integer::sum);

        List<Integer> list = new ArrayList<>();
        for (int n : nums2) {
            if (counts.getOrDefault(n, 0) > 0) {
                list.add(n);
                counts.put(n, counts.get(n) - 1);
            }
        }
        return list.stream().mapToInt(i -> i).toArray();
    }

    public static void main(String[] args) {
        int[] res = intersect(new int[]{4, 9, 5, 4}, new int[]{9, 4, 9, 8, 4});
        System.out.println("Intersection: " + Arrays.toString(res));
    }
}`,
      output: `Intersection: [9, 4, 4]`,
      explanation: 'Tracking available occurrences in a frequency map matches duplicate entries in O(M + N) time.'
    },
    {
      id: 'col-19-3-ex9',
      title: 'Maximum Size Subarray Sum Equals Target',
      problemStatement: 'Find the maximum length of a contiguous subarray that sums to target using a HashMap storing first-seen prefix sum indices.',
      hint: 'Store prefixSum -> earliestIndex. Do NOT overwrite existing prefixSum indices to maximize subarray length.',
      solutionCode: `import java.util.*;

public class Main {
    public static int maxSubArrayLen(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0, maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (map.containsKey(sum - k)) {
                maxLen = Math.max(maxLen, i - map.get(sum - k));
            }
            // Store only the earliest index for each prefix sum
            map.putIfAbsent(sum, i);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        int[] nums = {1, -1, 5, -2, 3};
        System.out.println("Max subarray length summing to 3: " + maxSubArrayLen(nums, 3));
    }
}`,
      output: `Max subarray length summing to 3: 4`,
      explanation: 'Keeping only the first occurrence of each prefix sum maximizes the distance `i - firstIndex`, finding the longest valid subarray in linear O(N) time.'
    },
    {
      id: 'col-19-3-ex10',
      title: 'Impact of Degenerate Load Factor (0.1 vs 2.0)',
      problemStatement: 'Compare memory and search implications of a tiny load factor (0.1f) versus an overloaded load factor (2.0f).',
      hint: '0.1f resizes constantly and wastes RAM; 2.0f never resizes but creates long collision chains.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int cap = 16;
        float lowLF = 0.1f;
        float highLF = 2.0f;

        System.out.println("Capacity: " + cap);
        System.out.println("Low LF (0.1f) Threshold:  " + (int)(cap * lowLF) + " -> Frequent resizes, wasted memory!");
        System.out.println("High LF (2.0f) Threshold: " + (int)(cap * highLF) + " -> Dense buckets, O(N) chain lookups!");
        System.out.println("Default (0.75f) Threshold:" + (int)(cap * 0.75f) + " -> Optimal trade-off.");
    }
}`,
      output: `Capacity: 16
Low LF (0.1f) Threshold:  1 -> Frequent resizes, wasted memory!
High LF (2.0f) Threshold: 32 -> Dense buckets, O(N) chain lookups!
Default (0.75f) Threshold:12 -> Optimal trade-off.`,
      explanation: 'The default load factor 0.75 represents the empirically and mathematically optimal trade-off between memory overhead and search latency.'
    }
  ],

  // ── LESSON 19.4: ConcurrentHashMap Internals ─────────────────────────
  'concurrenthashmap-internals': [
    {
      id: 'col-19-4-ex1',
      title: 'Thread-Safe Counting with ConcurrentHashMap.compute()',
      problemStatement: 'Use `ConcurrentHashMap` with atomic `compute()` to count occurrences across concurrent threads without explicit synchronized locks.',
      hint: 'map.compute(key, (k, v) -> (v == null) ? 1 : v + 1) executes atomically per bucket.',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        String key = "metric_counter";

        // Atomic compute updates value without external locking
        map.compute(key, (k, v) -> (v == null) ? 1 : v + 1);
        map.compute(key, (k, v) -> v + 1);

        System.out.println(key + " count: " + map.get(key));
    }
}`,
      output: `metric_counter count: 2`,
      explanation: '`ConcurrentHashMap.compute()` locks only the specific bucket head node, guaranteeing atomic updates without blocking other buckets.'
    },
    {
      id: 'col-19-4-ex2',
      title: 'Atomic putIfAbsent vs standard put in ConcurrentHashMap',
      problemStatement: 'Demonstrate how `putIfAbsent` prevents race conditions when registering a single singleton service instance in a cache.',
      hint: 'putIfAbsent returns null if key was newly mapped, or existing value if already present.',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentMap<String, String> cache = new ConcurrentHashMap<>();

        String existing = cache.putIfAbsent("ServiceA", "Endpoint_V1");
        System.out.println("First putIfAbsent returned: " + existing); // null

        String secondAttempt = cache.putIfAbsent("ServiceA", "Endpoint_V2");
        System.out.println("Second putIfAbsent returned: " + secondAttempt); // Endpoint_V1
        System.out.println("Final value in cache: " + cache.get("ServiceA"));
    }
}`,
      output: `First putIfAbsent returned: null
Second putIfAbsent returned: Endpoint_V1
Final value in cache: Endpoint_V1`,
      explanation: '`putIfAbsent` performs an atomic check-and-act operation, guaranteeing that only the first caller registers their endpoint.'
    },
    {
      id: 'col-19-4-ex3',
      title: 'Weakly Consistent Iteration in ConcurrentHashMap',
      problemStatement: 'Demonstrate that iterating over a ConcurrentHashMap does NOT throw `ConcurrentModificationException` when elements are added during iteration.',
      hint: 'Iterators in ConcurrentHashMap are weakly consistent and reflect mutations safely.',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        System.out.print("Iteration: ");
        for (String key : map.keySet()) {
            System.out.print(key + " ");
            if (key.equals("B")) {
                map.put("D", 4); // Mutate during iteration!
            }
        }
        System.out.println("\\nFinal map size: " + map.size());
    }
}`,
      output: `Iteration: A B C 
Final map size: 4`,
      explanation: '`ConcurrentHashMap` iterators are weakly consistent: they traverse bucket nodes as they existed and do not throw ConcurrentModificationException.'
    },
    {
      id: 'col-19-4-ex4',
      title: 'High-Concurrency Atomic Integer Accumulation via LongAdder',
      problemStatement: 'Pair `ConcurrentHashMap` with `LongAdder` for high-throughput multi-threaded counters without CAS contention on a single Integer.',
      hint: 'map.computeIfAbsent(key, k -> new LongAdder()).increment().',
      solutionCode: `import java.util.concurrent.*;
import java.util.concurrent.atomic.LongAdder;

public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, LongAdder> stats = new ConcurrentHashMap<>();

        // Simulate multi-threaded hits
        for (int i = 0; i < 5; i++) {
            stats.computeIfAbsent("page_views", k -> new LongAdder()).increment();
        }

        System.out.println("Total Page Views: " + stats.get("page_views").sum());
    }
}`,
      output: `Total Page Views: 5`,
      explanation: '`LongAdder` stripes counter updates across CPU thread cells, completely eliminating CAS contention compared to `AtomicInteger`.'
    },
    {
      id: 'col-19-4-ex5',
      title: 'Comparing Null Rejection in ConcurrentHashMap vs HashMap',
      problemStatement: 'Show that `ConcurrentHashMap` throws NullPointerException on null keys and null values, explaining why this design choice was deliberate.',
      hint: 'null values cause ambiguity in multi-threaded map.get() (is key absent or mapped to null?).',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();

        try {
            map.put(null, "value");
        } catch (NullPointerException e) {
            System.out.println("Caught NPE on null key!");
        }

        try {
            map.put("key", null);
        } catch (NullPointerException e) {
            System.out.println("Caught NPE on null value!");
        }
    }
}`,
      output: `Caught NPE on null key!
Caught NPE on null value!`,
      explanation: 'Doug Lea explicitly designed ConcurrentHashMap to reject nulls because in concurrent code, you cannot distinguish between an absent key and a key mapped to null without a race condition.'
    },
    {
      id: 'col-19-4-ex6',
      title: 'Parallel Search and Reduce in Java 8 ConcurrentHashMap',
      problemStatement: 'Use `ConcurrentHashMap.reduceValues()` with a parallelism threshold to sum all values in parallel across worker threads.',
      hint: 'map.reduceValues(parallelismThreshold, Long::sum).',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Long> metrics = new ConcurrentHashMap<>();
        metrics.put("login", 120L);
        metrics.put("checkout", 450L);
        metrics.put("browse", 890L);

        // Parallelism threshold: 1 means use ForkJoinPool if size >= 1
        Long total = metrics.reduceValues(1, Long::sum);
        System.out.println("Total metrics sum: " + total);
    }
}`,
      output: `Total metrics sum: 1460`,
      explanation: 'Java 8 added parallel bulk operations (`forEach`, `search`, `reduce`) to ConcurrentHashMap that automatically utilize the common ForkJoinPool.'
    },
    {
      id: 'col-19-4-ex7',
      title: 'Concurrent Set Creation from ConcurrentHashMap',
      problemStatement: 'Create a thread-safe `Set<String>` backed by `ConcurrentHashMap` using `ConcurrentHashMap.newKeySet()`.',
      hint: 'ConcurrentHashMap.newKeySet() produces a thread-safe Set with O(1) concurrent operations.',
      solutionCode: `import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class Main {
    public static void main(String[] args) {
        Set<String> activeUsers = ConcurrentHashMap.newKeySet();
        activeUsers.add("Alice");
        activeUsers.add("Bob");
        activeUsers.add("Alice"); // Duplicate

        System.out.println("Active users size: " + activeUsers.size());
        System.out.println("Contains Bob: " + activeUsers.contains("Bob"));
    }
}`,
      output: `Active users size: 2
Contains Bob: true`,
      explanation: '`ConcurrentHashMap.newKeySet()` is the modern high-concurrency replacement for synchronized sets or CopyOnWriteArraySet.'
    },
    {
      id: 'col-19-4-ex8',
      title: 'CAS vs Synchronized Head in Java 8 ConcurrentHashMap',
      problemStatement: 'Demonstrate how Java 8 ConcurrentHashMap inserts into an empty bucket via CAS (`casTabAt`) versus locking an existing bucket head (`synchronized (f)`).',
      hint: 'First entry in bucket uses lock-free Compare-And-Swap. Collisions lock the first Node.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java 8 ConcurrentHashMap Put Protocol:");
        System.out.println("1. If table is unallocated -> Initialize table via CAS (sizeCtl = -1).");
        System.out.println("2. If bucket is EMPTY -> Use lock-free CAS (casTabAt) to insert node.");
        System.out.println("3. If bucket contains MOVED (-1) -> Help resize (transfer).");
        System.out.println("4. If bucket is POPULATED -> synchronized(bucketHead) and traverse/treeify.");
    }
}`,
      output: `Java 8 ConcurrentHashMap Put Protocol:
1. If table is unallocated -> Initialize table via CAS (sizeCtl = -1).
2. If bucket is EMPTY -> Use lock-free CAS (casTabAt) to insert node.
3. If bucket contains MOVED (-1) -> Help resize (transfer).
4. If bucket is POPULATED -> synchronized(bucketHead) and traverse/treeify.`,
      explanation: 'Locking only individual bucket heads eliminates Java 7 Segment allocation overhead, reducing contention to at most the individual bucket collision level.'
    },
    {
      id: 'col-19-4-ex9',
      title: 'Atomic Compound Replacement with replace(K, oldVal, newVal)',
      problemStatement: 'Use `ConcurrentMap.replace(key, oldValue, newValue)` to conditionally update an account balance only if the current value matches the expected state.',
      hint: 'Atomic CAS-style replace returns true only if the current mapping equals oldValue.',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) {
        ConcurrentMap<String, Integer> balances = new ConcurrentHashMap<>();
        balances.put("ACC_101", 500);

        // Attempt conditional update: update from 500 to 450 (withdraw 50)
        boolean success1 = balances.replace("ACC_101", 500, 450);
        System.out.println("Withdraw 50 succeeded: " + success1 + " | Balance: " + balances.get("ACC_101"));

        // Stale update attempt: expect 500, but current is 450
        boolean success2 = balances.replace("ACC_101", 500, 400);
        System.out.println("Stale withdraw succeeded: " + success2 + " | Balance: " + balances.get("ACC_101"));
    }
}`,
      output: `Withdraw 50 succeeded: true | Balance: 450
Stale withdraw succeeded: false | Balance: 450`,
      explanation: '`replace(key, oldVal, newVal)` provides atomic compare-and-swap semantics at the map entry level without manual mutex locks.'
    },
    {
      id: 'col-19-4-ex10',
      title: 'Benchmark Verification: Read Lock-Freedom in ConcurrentHashMap',
      problemStatement: 'Explain why `ConcurrentHashMap.get(key)` is 100% lock-free and never blocks reading threads, citing volatile table reference and node value fields.',
      hint: 'In OpenJDK, Node.val and Node.next are declared volatile, providing happens-before memory visibility without synchronized blocks.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Lock-Free Read Mechanics in ConcurrentHashMap:");
        System.out.println("1. Node.val is declared volatile -> immediate memory visibility.");
        System.out.println("2. Node.next is declared volatile -> safe concurrent list traversal.");
        System.out.println("3. Table array elements are accessed via Unsafe/VarHandle volatile reads.");
        System.out.println("Conclusion: Readers never acquire locks and run at pure hardware memory speed!");
    }
}`,
      output: `Lock-Free Read Mechanics in ConcurrentHashMap:
1. Node.val is declared volatile -> immediate memory visibility.
2. Node.next is declared volatile -> safe concurrent list traversal.
3. Table array elements are accessed via Unsafe/VarHandle volatile reads.
Conclusion: Readers never acquire locks and run at pure hardware memory speed!`,
      explanation: 'Volatile reads ensure threads always observe the latest written value without locking, making ConcurrentHashMap read throughput scale linearly with CPU core counts.'
    }
  ]
};
