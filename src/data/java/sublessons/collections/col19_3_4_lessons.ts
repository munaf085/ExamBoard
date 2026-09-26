import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 19: HASHING & HASHMAP INTERNALS (LESSONS 19.3 & 19.4)
// Authoritative FAANG-Standard Hashing Core Curriculum
// ============================================================

export const col19_3_4_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 19.3: Resizing, Load Factor & Rehashing Mechanics
  // ─────────────────────────────────────────────────────────────
  'hashmap-resizing-and-rehash': {
    id: 'hashmap-resizing-and-rehash',
    moduleId: 'java-hashing',
    moduleTitle: '19. Hashing & HashMap Internals',
    lessonNumber: 'Lesson 19.3',
    title: 'HashMap Resizing, Load Factor & Rehashing Mechanics',
    subtitle: 'DEFAULT_LOAD_FACTOR = 0.75f, threshold calculation, doubling capacity, bit-test split (e.hash & oldCap) == 0, and the Java 7 infinite loop race condition',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine an apartment parking garage with 16 reserved parking spots. When 12 spots fill up (75% full, `threshold = 16 * 0.75 = 12`), finding an open spot begins to cause traffic jams. Instead of waiting until all 16 spots are jammed, the garage manager doubles the garage size to 32 spots! In the old days (Java 7), the attendants re-calculated everyone`s license plate numbers from scratch and hung them upside down, which occasionally caused attendants to collide and chase each other in an infinite circle! In Java 8, the manager has an ingenious trick: he looks at just ONE digit on each car`s parking permit (`(e.hash & oldCap) == 0`). If that digit is 0, the car stays parked right where it is; if it is 1, the car drives straight to the identical slot in the new annex (`oldIndex + 16`). No recalculations, no traffic jams, and zero circular collisions!',
    interviewTakeaways: [
      'Load Factor & Threshold: The load factor (`DEFAULT_LOAD_FACTOR = 0.75f`) controls the density limit before resizing. The threshold is calculated as: `threshold = (int) (capacity * loadFactor)`. For initial capacity 16, `threshold = 12`. The 13th element triggers an automatic table resize.',
      'Why 0.75f is the Gold Standard: 0.75 represents the mathematically proven balance between space and time: a lower load factor (e.g. 0.5) wastes substantial heap memory with empty buckets; a higher load factor (e.g. 0.9) produces long collision chains, degrading $O(1)$ operations towards $O(N)$.',
      'Table Capacity Doubling: When resizing, capacity doubles: `newCap = oldCap << 1` (e.g. 16 -> 32 -> 64). The threshold also doubles: `newThr = oldThr << 1`.',
      'Java 8 Bit-Test Rehash Optimization: When doubling from $N$ to $2N$, the index bitmask expands by 1 bit (`N - 1` -> `2N - 1`). Elements in bucket $i$ do NOT need their hash codes recomputed! Java 8 simply tests: `if ((e.hash & oldCap) == 0)`. If 0, the element stays at index $i$ (`loHead`); if 1, it moves to index $i + \\text{oldCap}$ (`hiHead`).',
      'Head vs Tail Insertion & Race Prevention: Java 7 inserted rehashed nodes at the HEAD of the new bucket, reversing list order. Under concurrent multi-threaded execution, this caused a fatal race condition where two threads formed a circular pointer loop (`A.next = B; B.next = A`), causing 100% CPU lockups. Java 8 uses TAIL insertion (`loTail`, `hiTail`), preserving original order and eliminating this cycle.',
      'Pre-sizing Formula: To store $N$ elements without triggering an expensive resize, calculate: `initialCapacity = (int) Math.ceil(N / 0.75f)`. For example, to store 100 elements: $100 / 0.75 = 133.3$, which rounds up via `tableSizeFor` to initial capacity 256.'
    ],
    cheatSheet: {
      summary: 'HashMap resizes when size > capacity * 0.75. Capacity doubles (2x). Java 8 splits bucket chains using bit-test (hash & oldCap) == 0 into loHead (index i) and hiHead (index i + oldCap) with tail insertion.',
      syntaxTemplate: `// Optimal pre-sizing for N items:
int targetItems = 1000;
int initialCap = (int) Math.ceil(targetItems / 0.75f); // 1334 -> rounds to 2048
Map<String, String> map = new HashMap<>(initialCap);

// Java 8 bit-test rehash logic inside resize():
Node<K,V> loHead = null, loTail = null;
Node<K,V> hiHead = null, hiTail = null;
if ((e.hash & oldCap) == 0) {
    // Stays at oldIndex: loTail = e;
} else {
    // Moves to oldIndex + oldCap: hiTail = e;
}`,
      rules: [
        { rule: 'Resizing is Amortized O(1)', explanation: 'An individual resize is O(N) because it visits every node, but happens logarithmically infrequently, yielding amortized O(1) append time.' },
        { rule: 'Bit-Test Rehash Rule', explanation: 'Elements in a bucket only ever have two destinations in the new table: oldIndex or oldIndex + oldCap.' },
        { rule: 'Preserve Order via Tail Insertion', explanation: 'Tail insertion preserves relative node order during resize, preventing cyclic circular reference loops.' },
        { rule: 'Avoid Post-Resize Compaction', explanation: 'HashMap never shrinks its table capacity automatically when elements are removed; table size stays at its peak until clear() or GC.' },
        { rule: 'Pre-size with Load Factor in Mind', explanation: 'new HashMap<>(16) resizes at 13 elements. If you know you have 16 items, pass new HashMap<>(32) or (int)(16/0.75)+1.' }
      ],
      quickComparison: [
        { aspect: 'Rehashing Algorithm', optionA: 'Java 7: Re-computes (hash & (newCap - 1)) for each node', optionB: 'Java 8: Bit-test (hash & oldCap) == 0 splits into lo/hi lists' },
        { aspect: 'Rehash Node Insertion', optionA: 'Java 7: Head insertion (reverses list, causes cycle bug)', optionB: 'Java 8: Tail insertion (preserves order, prevents cycle bug)' },
        { aspect: 'Memory Allocation during Resize', optionA: 'Java 7: Modifies table in-place using transfer() loop', optionB: 'Java 8: Builds lo/hi lists and assigns array slots directly' },
        { aspect: 'Rehash Hash Computation', optionA: 'Java 7: Invoked hash(k) if alternative hashing enabled', optionB: 'Java 8: Uses cached e.hash directly without re-evaluation' }
      ]
    },
    coreExplanation: [
      'Resizing is the mechanism by which a HashMap maintains its $O(1)$ constant-time performance invariant as elements accumulate. Without resizing, bucket chains would grow arbitrarily long, degrading lookups to $O(N)$ linear scans.',
      'The Load Factor Principle: The load factor $\\alpha = \\text{size} / \\text{capacity}$ measures how full the table is permitted to become. The default value `0.75f` was selected based on the Poisson distribution and empirical cache performance benchmarks: it offers ~25% headroom to minimize collisions while utilizing 75% of allocated heap memory.',
      'Threshold Mechanics: Each HashMap maintains `int threshold`. When constructed, `threshold` records initial capacity. Upon the first `put()`, `resize()` initializes the table and computes: `threshold = (int) (newCap * loadFactor)`. For a 16-slot table, `threshold = 12`. When `++size > threshold`, `resize()` is invoked immediately.',
      'Capacity Doubling: `resize()` allocates a new table of twice the previous capacity: `newCap = oldCap << 1`. Because capacities are powers of two ($2^n$), the binary representation of capacity has exactly one set bit (e.g., $16 = 0b00010000$).',
      'The Java 8 Bit-Test Rehash Breakthrough: In Java 7, resizing required re-indexing every element via `e.hash & (newTable.length - 1)`. In Java 8, designers noticed that when capacity doubles from 16 (`0b1111` mask) to 32 (`0b11111` mask), the index mask only expands by ONE new bit—the 16s bit (`oldCap = 16 = 0b10000`)! If that bit in `e.hash` is 0, the new index is identical to the old index. If that bit is 1, the new index is exactly `oldIndex + oldCap`. HashMap tests this with `(e.hash & oldCap) == 0`. It builds two chains (`loHead..loTail` and `hiHead..hiTail`) and links them into `newTab[j]` and `newTab[j + oldCap]` in a single pass without recomputing hashes!',
      'The Java 7 Cyclic Loop Deadlock: In Java 7, the `transfer()` method re-linked nodes at the head of the new bucket. If two threads called `put()` simultaneously and both triggered `resize()`, Thread 1 could be preempted after setting `next = e.next`. Thread 2 would complete its resize, reversing the order of nodes A and B (`B.next = A`). When Thread 1 resumed, it executed `A.next = B`, forming a circular loop `A -> B -> A`. Any subsequent `get()` on that bucket would loop infinitely, consuming 100% CPU. Java 8`s tail-insertion completely eradicated this cyclic loop bug.'
    ],
    diagram: `JAVA 8 BIT-TEST REHASH MECHANICS: (hash & oldCap) == 0
========================================================================

Old Capacity = 16  (Mask = 15 = 0b00001111)
New Capacity = 32  (Mask = 31 = 0b00011111)
The only difference is the 5th bit (bit value 16)!

Consider four keys currently colliding in Bucket 5 (old index 5):
Key A (hash = 5):   00000101 & 16 (00010000) = 0  ──> STAYS at index 5  (loHead)
Key B (hash = 21):  00010101 & 16 (00010000) != 0 ──> MOVES to index 21 (hiHead)
Key C (hash = 37):  00100101 & 16 (00010000) = 0  ──> STAYS at index 5  (loHead)
Key D (hash = 53):  00110101 & 16 (00010000) != 0 ──> MOVES to index 21 (hiHead)

Visual Transformation:
Old Bucket 5: [ A ] ──> [ B ] ──> [ C ] ──> [ D ] ──> null

After Bit-Test Split (Tail Insertion preserves order):
New Table [5]:  [ A ] ──> [ C ] ──> null          (Low Chain)
New Table [21]: [ B ] ──> [ D ] ──> null          (High Chain: 5 + 16 = 21)

* Zero hash recalculation!
* Zero circular reference race conditions!`,
    codeSnippet: {
      title: 'Simulating Java 8 Bit-Test Rehash Splitting',
      code: `public class BitTestRehashDemo {
    public static void main(String[] args) {
        int oldCap = 16;
        int newCap = 32;

        // Keys that all collide at bucket 3 in table of size 16:
        // (hash & 15) == 3
        int[] collidingHashes = {3, 19, 35, 51, 67};

        System.out.println("Splitting colliding bucket 3 during 16 -> 32 resize:\\n");

        for (int h : collidingHashes) {
            boolean bitZero = (h & oldCap) == 0;
            int newIndex = bitZero ? (h & (newCap - 1)) : (3 + oldCap);
            String chain = bitZero ? "Low Chain (Bucket 3)" : "High Chain (Bucket 19)";

            System.out.printf("Hash: %2d (0b%7s) | (h & %d) == 0? %-5s | -> %s%n",
                h, Integer.toBinaryString(h), oldCap, bitZero, chain);
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'int oldCap = 16;', explanation: 'Initial capacity prior to expansion.' },
        { line: 'int[] collidingHashes = {3, 19, 35, 51, 67};', explanation: 'All five hash codes yield (h & 15) = 3, residing in bucket 3 in the old table.' },
        { line: 'boolean bitZero = (h & oldCap) == 0;', explanation: 'Tests the newly exposed 16s bit without re-evaluating the hash code.' },
        { line: 'int newIndex = bitZero ? ... : (3 + oldCap);', explanation: 'Assigns either to old index (3) or old index + oldCap (3 + 16 = 19).' },
        { line: 'System.out.printf(...);', explanation: 'Prints the binary bit test and resulting bucket placement.' }
      ],
      output: `Splitting colliding bucket 3 during 16 -> 32 resize:

Hash:  3 (0b    011) | (h & 16) == 0? true  | -> Low Chain (Bucket 3)
Hash: 19 (0b  10011) | (h & 16) == 0? false | -> High Chain (Bucket 19)
Hash: 35 (0b 100011) | (h & 16) == 0? true  | -> Low Chain (Bucket 3)
Hash: 51 (0b 110011) | (h & 16) == 0? false | -> High Chain (Bucket 19)
Hash: 67 (0b1000011) | (h & 16) == 0? true  | -> Low Chain (Bucket 3)`
    },
    codeExamples: [
      {
        title: 'Threshold Trigger Demonstration',
        description: 'Tracking the exact insertion count that forces HashMap to resize.',
        code: `import java.util.*;

public class ResizeThresholdDemo {
    public static void main(String[] args) {
        // Capacity 16, loadFactor 0.75 -> threshold = 12
        Map<Integer, String> map = new HashMap<>();

        for (int i = 1; i <= 15; i++) {
            map.put(i, "val" + i);
            if (i == 12) {
                System.out.println("Item 12 added: Table is 75% full (at threshold 12).");
            }
            if (i == 13) {
                System.out.println("Item 13 added: EXCEEDS threshold 12! resize() called (capacity now 32, threshold 24).");
            }
        }
    }
}`,
        output: `Item 12 added: Table is 75% full (at threshold 12).
Item 13 added: EXCEEDS threshold 12! resize() called (capacity now 32, threshold 24).`
      },
      {
        title: 'Proper Pre-sizing to Avoid Multiple Resizes',
        description: 'Comparing default allocation vs pre-sized allocation for bulk data ingestion.',
        code: `import java.util.*;

public class PreSizingComparison {
    public static void main(String[] args) {
        int elementCount = 1000;

        // Default map triggers resizes at: 13, 25, 49, 97, 193, 385, 769 (7 separate resizes!)
        long start1 = System.nanoTime();
        Map<Integer, Integer> defaultMap = new HashMap<>();
        for (int i = 0; i < elementCount; i++) defaultMap.put(i, i);
        long timeDefault = System.nanoTime() - start1;

        // Pre-sized map: 1000 / 0.75 = 1334 -> rounds up to 2048 (ZERO resizes!)
        long start2 = System.nanoTime();
        int preSizedCap = (int) Math.ceil(elementCount / 0.75f);
        Map<Integer, Integer> preSizedMap = new HashMap<>(preSizedCap);
        for (int i = 0; i < elementCount; i++) preSizedMap.put(i, i);
        long timePreSized = System.nanoTime() - start2;

        System.out.println("Default Map insertion time:   " + timeDefault + " ns (7 resizes)");
        System.out.println("Pre-sized Map insertion time: " + timePreSized + " ns (0 resizes)");
    }
}`,
        output: `Default Map insertion time:   1250000 ns (7 resizes)
Pre-sized Map insertion time: 480000 ns (0 resizes)`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Passing expectedSize directly as initialCapacity: new HashMap<>(16)',
        whyItHappens: 'Developers assume `new HashMap<>(16)` can hold 16 items. In reality, with load factor 0.75, its threshold is 12! Adding the 13th item triggers an unexpected resize.',
        howToFix: 'Account for load factor: pass `(int) Math.ceil(expectedSize / 0.75f)` or use `Map.of()` / Guava`s `Maps.newHashMapWithExpectedSize(N)`.'
      },
      {
        mistake: 'Assuming HashMap shrinks its table array when elements are removed',
        whyItHappens: 'Developers expect table capacity to decrease as items are removed. HashMap NEVER down-sizes its table array automatically; memory remains allocated until the map is dereferenced or garbage collected.',
        howToFix: 'If a massive map shrinks permanently, create a new pre-sized HashMap and copy the remaining elements, or call `map.clear()`.'
      },
      {
        mistake: 'Using HashMap in multi-threaded code thinking Java 8 made it safe',
        whyItHappens: 'Java 8 eliminated the infinite loop bug, leading some developers to believe it is concurrency-safe. In reality, unsynchronized concurrent writes cause lost updates, broken tree invariants, and data corruption.',
        howToFix: 'Always use `ConcurrentHashMap` for multi-threaded environments.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Resizing Threshold Calculation',
        problemStatement: 'A HashMap is constructed with initial capacity 32 and default load factor 0.75f. What is the threshold that triggers the first resize?',
        code: `HashMap<String, Integer> map = new HashMap<>(32);
// What is map's threshold after first put?`,
        options: [
          'A) 32',
          'B) 24',
          'C) 16',
          'D) 25'
        ],
        correctOptionIndex: 1,
        hint: 'Calculate: 32 * 0.75.',
        solution: 'Option B is correct: 24',
        explanation: '`threshold = (int) (capacity * loadFactor) = 32 * 0.75 = 24`. When `size` exceeds 24 (on the 25th insertion), `resize()` is invoked.'
      },
      {
        title: 'Puzzle 2: Java 8 Bit-Test Rehash New Index',
        problemStatement: 'During a resize from capacity 16 to 32, a node with hash 27 is rehashed. What is its new bucket index?',
        code: `int oldCap = 16;
int hash = 27;
// What is the new bucket index in table of capacity 32?`,
        options: [
          'A) 11',
          'B) 27',
          'C) 16',
          'D) 5'
        ],
        correctOptionIndex: 1,
        hint: 'In oldCap 16, index was 27 & 15 = 11. What is (27 & 16) == 0? If false, new index = 11 + 16.',
        solution: 'Option B is correct: 27',
        explanation: '`hash = 27` (`0b00011011`). Old index was `27 & 15 = 11`. Bit test: `(27 & 16) != 0` (16s bit is 1). Therefore, it moves to `oldIndex + oldCap = 11 + 16 = 27` (which is also `27 & 31 = 27`).'
      },
      {
        title: 'Puzzle 3: Capacity Round-up in Constructor',
        problemStatement: 'What is the table capacity allocated when constructing `new HashMap<>(7)`?',
        code: `HashMap<String, String> map = new HashMap<>(7);`,
        options: [
          'A) 7',
          'B) 8',
          'C) 14',
          'D) 16'
        ],
        correctOptionIndex: 1,
        hint: 'tableSizeFor rounds up to the nearest power of 2.',
        solution: 'Option B is correct: 8',
        explanation: '`tableSizeFor(7)` evaluates the least power of two greater than or equal to 7, which is 8 (`2^3`).'
      },
      {
        title: 'Puzzle 4: Number of Resizes for 100 Elements with Default Constructor',
        problemStatement: 'If you add 100 elements one-by-one into `new HashMap<>()`, how many resize operations occur?',
        code: `HashMap<Integer, Integer> map = new HashMap<>();
for (int i = 0; i < 100; i++) map.put(i, i);`,
        options: [
          'A) 1 (initial allocation)',
          'B) 4 (at 13, 25, 49, 97)',
          'C) 5 (at 1, 13, 25, 49, 97)',
          'D) 7'
        ],
        correctOptionIndex: 2,
        hint: 'Initial allocation is counted as a resize (16). Subsequent resizes occur when exceeding thresholds: 12 (to 32), 24 (to 64), 48 (to 128), and 96 (to 256).',
        solution: 'Option C is correct: 5 (at 1, 13, 25, 49, 97)',
        explanation: 'In Java 8, `resize()` is called 5 times: 1) first put initializes table to 16 (threshold 12). 2) 13th put resizes to 32 (threshold 24). 3) 25th put resizes to 64 (threshold 48). 4) 49th put resizes to 128 (threshold 96). 5) 97th put resizes to 256 (threshold 192).'
      },
      {
        title: 'Puzzle 5: Pre-sizing Calculation for 50 Elements',
        problemStatement: 'What initial capacity should you pass to `new HashMap<>(cap)` to insert 50 elements without triggering any resize after table initialization?',
        code: `// To store 50 items with load factor 0.75 without subsequent resize:`,
        options: [
          'A) 50',
          'B) 64',
          'C) 128',
          'D) 32'
        ],
        correctOptionIndex: 2,
        hint: 'Calculate: 50 / 0.75 = 66.67. What is the next power of 2?',
        solution: 'Option C is correct: 128',
        explanation: '`50 / 0.75f = 66.67`. If capacity were 64, threshold would be `64 * 0.75 = 48`, which would trigger a resize on the 49th element! Therefore, capacity must round up to the next power of two: 128 (threshold = 96).'
      },
      {
        title: 'Puzzle 6: Why Java 7 Experienced Infinite Loops during Resizing',
        problemStatement: 'What specific design implementation caused the infamous infinite loop bug in Java 7 HashMap during concurrent resizes?',
        code: `// Java 7 transfer() loop:
// e.next = newTable[i];
// newTable[i] = e;
// e = next;`,
        options: [
          'A) Head-insertion reversed the order of nodes in the bucket list, creating circular references when racing with another thread',
          'B) Tail-insertion exhausted CPU registers',
          'C) Lock striping deadlock',
          'D) Garbage collector memory compaction race'
        ],
        correctOptionIndex: 0,
        hint: 'Reversing list order under concurrency causes A.next = B and B.next = A.',
        solution: 'Option A is correct: Head-insertion reversed the order of nodes in the bucket list, creating circular references when racing with another thread',
        explanation: 'Java 7 transferred elements by inserting them at the head of the new table, reversing their order. If two threads executed `transfer()` concurrently, the pointers could form a cycle (`A -> B -> A`), causing infinite loops on subsequent `get()` calls.'
      },
      {
        title: 'Puzzle 7: Impact of Extreme Load Factor (10.0f)',
        problemStatement: 'What happens if a HashMap is constructed with `new HashMap<>(16, 10.0f)`?',
        code: `HashMap<String, Integer> map = new HashMap<>(16, 10.0f);`,
        options: [
          'A) Throws IllegalArgumentException',
          'B) Table capacity remains 16 until size exceeds 160, causing deep bucket collision chains and O(N) lookup degradation',
          'C) Allocates 160 buckets immediately',
          'D) Automatically enables multi-threading'
        ],
        correctOptionIndex: 1,
        hint: 'Threshold = 16 * 10.0 = 160.',
        solution: 'Option B is correct: Table capacity remains 16 until size exceeds 160, causing deep bucket collision chains and O(N) lookup degradation',
        explanation: 'A load factor of 10.0f is valid. It will not resize until 160 items are stored. Consequently, an average of 10 items will collide in each bucket, wasting CPU on linked list and tree traversals.'
      },
      {
        title: 'Puzzle 8: Does HashMap Table Array Shrink on Remove?',
        problemStatement: 'A HashMap grows to size 100,000 (capacity 131,072). Then, 99,990 elements are removed using `map.remove()`, leaving 10 elements. What is the table array length now?',
        code: `// Size shrank from 100,000 to 10
// What is table.length?`,
        options: [
          'A) 16',
          'B) 32',
          'C) 131,072 (unchanged)',
          'D) 0'
        ],
        correctOptionIndex: 2,
        hint: 'Does HashMap implement automatic table compaction on deletion?',
        solution: 'Option C is correct: 131,072 (unchanged)',
        explanation: 'HashMap NEVER shrinks its internal table array on element deletion. The 131,072-slot array remains allocated in heap memory until the map instance is reclaimed by GC.'
      },
      {
        title: 'Puzzle 9: Bit-Test on Hash with Matching 16s Bit',
        problemStatement: 'In a resize from capacity 16 to 32, a key has hash `0b00100011` (decimal 35). Does it stay in the low bucket or move to high bucket?',
        code: `int h = 35; // 0b00100011
int oldCap = 16; // 0b00010000
// Does (h & oldCap) == 0?`,
        options: [
          'A) Moves to high bucket (index + 16)',
          'B) Stays in low bucket (same index)',
          'C) Lands at index 0',
          'D) Triggers rehash exception'
        ],
        correctOptionIndex: 1,
        hint: 'Check the 16s bit (bit 4, 0-indexed) of 35. 35 = 32 + 2 + 1. Is bit 16 set?',
        solution: 'Option B is correct: Stays in low bucket (same index)',
        explanation: '35 in binary is `0b00100011`. The 16s bit (`0b00010000`) is 0! `(35 & 16) == 0` is true. Therefore, the node stays in the low chain at its existing index (`35 & 15 = 3`).'
      },
      {
        title: 'Puzzle 10: Maximum Capacity Limit of HashMap',
        problemStatement: 'What is the absolute maximum capacity limit of a Java HashMap?',
        code: `// static final int MAXIMUM_CAPACITY = ?;`,
        options: [
          'A) Integer.MAX_VALUE (2,147,483,647)',
          'B) 1 << 30 (1,073,741,824)',
          'C) 65,536',
          'D) 16,777,216'
        ],
        correctOptionIndex: 1,
        hint: 'It is the highest positive power of two representable in a 32-bit signed int.',
        solution: 'Option B is correct: 1 << 30 (1,073,741,824)',
        explanation: '`MAXIMUM_CAPACITY = 1 << 30` (1,073,741,824). It cannot be $1 \\ll 31$ because in 32-bit signed integers, that represents negative $-2^{31}$.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain how HashMap resizing works in Java 8. What triggers it and what are the exact steps?',
        answer: 'Resizing is triggered when `++size > threshold`, where `threshold = (int) (capacity * loadFactor)`. In Java 8, `resize()` executes the following steps: 1) It calculates new capacity: `newCap = oldCap << 1` (doubles capacity) and `newThr = oldThr << 1`. 2) It allocates a new table array: `new Node[newCap]`. 3) It transfers all existing nodes to the new table. Rather than re-hashing each key, it evaluates the single newly exposed bit: `(e.hash & oldCap) == 0`. Nodes evaluating to 0 are collected in a low list (`loHead..loTail`) and assigned to `newTab[j]` (same index). Nodes evaluating to 1 are collected in a high list (`hiHead..hiTail`) and assigned to `newTab[j + oldCap]`. 4) It uses tail insertion for both lists to preserve original element order. 5) It replaces `table = newTab`.',
        followUp: 'What is the time complexity of the resizing operation?',
        followUpAnswer: 'The time complexity of an individual resize is O(N), where N is the total number of entries, because every node must be visited and re-linked. However, because resizing doubles capacity, it occurs logarithmically infrequently, meaning the amortized insertion time remains strictly O(1).',
        keyPhrases: [
          'Triggered when ++size > threshold',
          'Capacity doubles: newCap = oldCap << 1',
          'Bit test: (e.hash & oldCap) == 0',
          'Splits into loHead (same index) and hiHead (index + oldCap)',
          'Tail insertion preserves order'
        ],
        commonMistakeAnswer: 'Believing HashMap re-calls key.hashCode() for every element during resize.'
      },
      {
        question: 'Why did Java 7 HashMap suffer from an infinite loop bug during concurrent resizes, and how did Java 8 fix it?',
        answer: 'In Java 7, `transfer()` used head-insertion when moving nodes into the new table (`e.next = newTable[i]; newTable[i] = e; e = next;`). This reversed the order of nodes in the collision chain. If two threads executed `put()` concurrently and both triggered `resize()`, Thread 1 could be paused after reading `e = NodeA; next = NodeB`. Thread 2 would then execute its entire resize, reversing the order in the new table so that `NodeB.next = NodeA`. When Thread 1 resumed, its execution linked `NodeA.next = NodeB`, creating a circular reference loop: `NodeA -> NodeB -> NodeA`. Any subsequent `get()` on that bucket entered an infinite loop, consuming 100% CPU. Java 8 completely solved this by using tail-insertion (`loTail.next = e; hiTail.next = e`), preserving the exact relative order of elements and making cyclic pointer creation impossible.',
        followUp: 'Does the Java 8 fix make HashMap thread-safe?',
        followUpAnswer: 'No! While the circular reference infinite loop was fixed, unsynchronized concurrent writes in Java 8 still lead to lost updates (one thread overwriting another thread`s node), corrupted size counts, and broken tree invariants. ConcurrentHashMap must always be used for concurrent multi-threading.',
        keyPhrases: [
          'Java 7 head-insertion reversed node order',
          'Concurrent threads created cyclic pointer loop (A -> B -> A)',
          'Caused 100% CPU usage in get()',
          'Java 8 tail-insertion preserves original node sequence',
          'HashMap is still NOT thread-safe'
        ],
        commonMistakeAnswer: 'Asserting that Java 8 HashMap is safe to use across multiple threads without locks.'
      },
      {
        question: 'Why is the default load factor of HashMap 0.75f? What happens if you configure it to 0.5f or 0.95f?',
        answer: 'The default load factor 0.75 represents the optimal trade-off between space efficiency and time latency based on Poisson probability distribution. If you set a low load factor like 0.5f, the table resizes very early when only half full. This reduces hash collisions to near zero, making lookups slightly faster, but wastes substantial heap memory because 50% of buckets sit empty, and frequent resizes increase GC overhead. If you set a high load factor like 0.95f, memory utilization is high, but bucket collisions increase dramatically. Collision chains grow long, increasing the average number of comparisons and degrading O(1) performance towards O(N) or O(log N).',
        followUp: 'How does load factor affect CPU cache performance?',
        followUpAnswer: 'At 0.75, most buckets have 0 or 1 item, meaning single-lookup memory fetches hit CPU L1/L2 cache lines directly without pointer chasing.',
        keyPhrases: [
          'Optimal trade-off between time and space',
          'Poisson distribution parameter lambda ~ 0.5',
          'Low LF (0.5) wastes heap memory and resizes too often',
          'High LF (0.95) increases collision chains and lookup latency'
        ],
        commonMistakeAnswer: 'Thinking load factor 1.0 is ideal because it uses 100% of the table before resizing.'
      },
      {
        question: 'Explain the mathematical elegance of the Java 8 bit-test rehash: (e.hash & oldCap) == 0.',
        answer: 'When a table doubles from capacity $N$ to $2N$ (where $N = 2^k$), the index mask changes from $N - 1$ to $2N - 1$. In binary, $N - 1$ is $k$ ones, and $2N - 1$ is $k + 1$ ones. The only difference is the single $(k + 1)$-th bit, which has numerical value $N$ (`oldCap`). For example, expanding from 16 to 32: mask 15 is `00001111`, mask 31 is `00011111`. The 16s bit is the only bit tested! If `(e.hash & oldCap) == 0`, that bit is 0, so the masked index in the 32-element table is identical to the index in the 16-element table (`oldIndex`). If `(e.hash & oldCap) != 0`, that bit is 1, so the new index is `oldIndex + oldCap`. This eliminates all hash recalculation and modulo division.',
        followUp: 'Does this bit test also apply to TreeNodes when splitting tree bins during a resize?',
        followUpAnswer: 'Yes! TreeNodes maintain `next` pointers forming a doubly-linked list. The resize method uses the identical `(e.hash & oldCap) == 0` bit test to split the tree bin into `loHead` and `hiHead` chains, and only rebuilds trees if a chain has more than 6 nodes.',
        keyPhrases: [
          'Capacity doubling expands mask by exactly 1 bit',
          'The newly exposed bit has value oldCap',
          'Bit is 0 -> stays at oldIndex',
          'Bit is 1 -> moves to oldIndex + oldCap',
          'Eliminates hash recalculation completely'
        ],
        commonMistakeAnswer: 'Assuming HashMap re-evaluates the hash spreading function during rehash.'
      },
      {
        question: 'How do you correctly pre-size a HashMap to store N items without triggering a resize?',
        answer: 'To store $N$ elements without triggering a resize, you must ensure that $N \\le \\text{threshold} = \\text{capacity} \\times \\text{loadFactor}$. Solving for capacity yields: $\\text{capacity} \\ge N / \\text{loadFactor}$. For the default load factor of 0.75: $\\text{capacity} \\ge N / 0.75 = N \\times 1.3333$. You must round this result up: `(int) Math.ceil(N / 0.75f)`. For example, to store 100 items: $100 / 0.75 = 133.3$. Passing 134 to `new HashMap<>(134)` causes `tableSizeFor` to round up to the next power of two: 256. At capacity 256, threshold is $256 \\times 0.75 = 192$, guaranteeing 100 insertions occur with ZERO resizes.',
        followUp: 'What happens if you naively write `new HashMap<>(100)`?',
        followUpAnswer: '`new HashMap<>(100)` rounds up to capacity 128. Threshold is `128 * 0.75 = 96`. Inserting the 97th element will trigger an unexpected table resize to 256, causing an expensive array reallocation and memory copy.',
        keyPhrases: [
          'Formula: (int) Math.ceil(N / 0.75f)',
          'Accounts for threshold = capacity * 0.75',
          'tableSizeFor rounds up to next power of 2',
          'Prevents costly array reallocation during bulk loads'
        ],
        commonMistakeAnswer: 'Writing new HashMap<>(N) directly without dividing by load factor 0.75.'
      },
      {
        question: 'What is the maximum capacity of a HashMap, and what happens when you attempt to exceed it?',
        answer: 'The maximum capacity is `1 << 30` (1,073,741,824), defined as `MAXIMUM_CAPACITY`. It is the largest positive power of two representable in a 32-bit signed integer (since $1 \\ll 31$ represents $-2^{31}$). When table capacity reaches `MAXIMUM_CAPACITY` and `resize()` is triggered again, HashMap cannot double the table array. Instead, it sets `threshold = Integer.MAX_VALUE` ($2^{31}-1$) and returns the existing table unmodified. From that point onward, the table never resizes again, and further insertions simply lengthen existing collision chains.',
        followUp: 'Can a HashMap hold more than Integer.MAX_VALUE elements?',
        followUpAnswer: 'No, because Java array indexing and the `size` field are 32-bit signed integers bounded by Integer.MAX_VALUE (2,147,483,647).',
        keyPhrases: [
          'MAXIMUM_CAPACITY = 1 << 30 (1,073,741,824)',
          'Largest positive power of 2 in 32-bit signed int',
          'Sets threshold = Integer.MAX_VALUE when exceeded',
          'Stops resizing and allows chains to grow'
        ],
        commonMistakeAnswer: 'Claiming maximum capacity is Integer.MAX_VALUE (which is not a power of 2).'
      },
      {
        question: 'Does HashMap ever shrink its internal table array when elements are removed? Why or why not?',
        answer: 'No, HashMap never down-sizes or compacts its internal table array when elements are removed. If a map grows to capacity 1,048,576 and you subsequently remove all but 10 elements, the backing table array remains at length 1,048,576, consuming ~4 MB of reference memory on the heap. HashMap does not shrink because shrinking requires allocating a smaller array, rehashing all surviving elements, and incurring GC churn. In high-churn applications where maps repeatedly expand and contract, continuous shrinking and expanding would create severe memory fragmentation and CPU overhead.',
        followUp: 'How can you reclaim memory from a large HashMap that has permanently shrunk?',
        followUpAnswer: 'Create a new properly pre-sized HashMap and copy the surviving elements using `newMap.putAll(oldMap)`, then dereference the old map to allow garbage collection of the oversized table array.',
        keyPhrases: [
          'HashMap never auto-shrinks table capacity',
          'Avoids reallocation and rehashing churn',
          'Overhead remains until map is garbage collected',
          'Copy surviving items to a new map to reclaim memory'
        ],
        commonMistakeAnswer: 'Asserting that table size halves when size drops below 25% of capacity.'
      },
      {
        question: 'Explain the difference in resize behavior between HashMap and ArrayList.',
        answer: '1) Growth Factor: ArrayList expands by 1.5x (`oldCap + (oldCap >> 1)`), whereas HashMap doubles its capacity (2.0x, `oldCap << 1`). 2) Data Transfer: ArrayList transfers contiguous memory via a single native `System.arraycopy` memory block transfer. HashMap cannot perform a bulk array copy; it must iterate through every bucket and split linked list chains using bit-testing. 3) Trigger: ArrayList resizes when `size == capacity` (100% full), while HashMap resizes when `size > capacity * loadFactor` (75% full by default).',
        followUp: 'Why does HashMap double (2x) while ArrayList expands by 1.5x?',
        followUpAnswer: 'HashMap MUST double (2x) because its bitwise masking indexing `(n - 1) & hash` strictly requires capacity to remain an exact power of two ($2^n$). ArrayList has no power-of-two requirement and uses 1.5x to facilitate memory chunk reuse by the OS heap allocator.',
        keyPhrases: [
          'ArrayList grows 1.5x; HashMap doubles 2.0x',
          'ArrayList uses native System.arraycopy',
          'HashMap splits chains via bit-testing',
          'HashMap requires power-of-two for bitwise masking'
        ],
        commonMistakeAnswer: 'Thinking both collections use 1.5x or both use 2.0x growth factor.'
      },
      {
        question: 'How does tableSizeFor(int cap) work in HashMap? Walk through the bitwise shifts.',
        answer: '`tableSizeFor(cap)` computes the smallest power of two $\\ge cap$. The code is: `int n = cap - 1; n |= n >>> 1; n |= n >>> 2; n |= n >>> 4; n |= n >>> 8; n |= n >>> 16; return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;`. Walkthrough: Subtracting 1 handles the case where `cap` is already a power of 2. Then, `n |= n >>> 1` copies the highest set 1-bit to the bit immediately to its right (now 2 consecutive 1s). `n |= n >>> 2` copies those 2 bits to the next 2 bits (now 4 consecutive 1s). Repeating with shifts of 4, 8, and 16 fills all bits below the highest bit with 1s. Finally, `n + 1` flips all 1s to 0 and carries a 1 into the next higher bit, yielding the exact power of two in just 10 CPU instructions without any loop!',
        followUp: 'Why does it begin with int n = cap - 1?',
        followUpAnswer: 'If cap is already an exact power of two (e.g. 16 = `0b10000`), smearing without subtracting 1 would turn it into `0b11111` and `n + 1` would double it to 32! Subtracting 1 gives 15 (`0b01111`), which smears to 15, and `n + 1` restores the correct power of two: 16.',
        keyPhrases: [
          'Bit-smearing algorithm propagates highest 1-bit',
          'Shifts by 1, 2, 4, 8, 16 turn lower bits into all 1s',
          'n + 1 yields the exact next power of 2',
          'n = cap - 1 prevents doubling when cap is already power of 2'
        ],
        commonMistakeAnswer: 'Thinking tableSizeFor uses a while loop or Math.pow().'
      },
      {
        question: 'What are the performance and memory implications of frequent HashMap resizing in high-throughput microservices?',
        answer: 'Frequent resizing causes three severe performance penalties: 1) Latency Spikes: An $O(N)$ resize forces the worker thread to pause handling incoming requests while it traverses thousands of nodes and re-links them across new buckets, violating P99 latency SLAs. 2) Garbage Collection Pressure: Abandoned old table arrays immediately become garbage. For large maps (e.g., resizing from 500,000 to 1,000,000 entries), a 4 MB or 8 MB array is dropped into heap young or tenured generation, triggering frequent Minor or Major GC pauses. 3) Memory Fragmentation: Repeated allocations of large arrays fragment the JVM heap. Pre-sizing collections at construction completely eliminates these issues.',
        followUp: 'How can you detect HashMap resizing bottlenecks in production?',
        followUpAnswer: 'Using Java Flight Recorder (JFR) or async-profiler to inspect allocation call trees: high allocations of `Node[]` inside `HashMap.resize()` indicate under-sized maps.',
        keyPhrases: [
          'P99 latency spikes during O(N) transfer',
          'GC pressure from discarded old table arrays',
          'Heap memory fragmentation',
          'Pre-sizing eliminates resize overhead entirely'
        ],
        commonMistakeAnswer: 'Underestimating the impact of resizing by assuming it is negligible.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the default load factor of a Java HashMap?',
        options: [
          '0.5f',
          '0.75f',
          '0.8f',
          '1.0f'
        ],
        correctIndex: 1,
        explanation: 'In OpenJDK, `DEFAULT_LOAD_FACTOR = 0.75f`, providing the optimal balance between space and lookup time.'
      },
      {
        question: 'For an initial capacity of 16 and default load factor 0.75f, adding which element number triggers the first resize?',
        options: [
          '12th',
          '13th',
          '16th',
          '17th'
        ],
        correctIndex: 1,
        explanation: 'Threshold is `(int)(16 * 0.75) = 12`. The 13th element exceeds threshold (`++size > threshold`), triggering resize.'
      },
      {
        question: 'How much does HashMap expand its capacity during a resize?',
        options: [
          'By 50% (1.5x)',
          'Doubles capacity (2.0x, oldCap << 1)',
          'Adds 16 slots',
          'Triples capacity (3.0x)'
        ],
        correctIndex: 1,
        explanation: 'HashMap doubles capacity (`newCap = oldCap << 1`) to preserve the power-of-two bitmask property.'
      },
      {
        question: 'How does Java 8 split bucket elements during resize without recomputing their hash codes?',
        options: [
          'By evaluating `(e.hash & oldCap) == 0` to assign nodes to either low index or high index (oldIndex + oldCap)',
          'By generating new random hash codes',
          'By sorting the keys alphabetically',
          'By placing half the elements in a TreeMap'
        ],
        correctIndex: 0,
        explanation: 'Testing `(e.hash & oldCap) == 0` tests the newly exposed bit, cleanly partitioning nodes between `oldIndex` and `oldIndex + oldCap`.'
      },
      {
        question: 'Why did Java 7 HashMap get stuck in infinite loops under concurrent multi-threaded execution?',
        options: [
          'Head-insertion during resize reversed node order, allowing concurrent threads to link nodes into circular references (A -> B -> A)',
          'The CPU instruction cache overflowed',
          'The JVM garbage collector suspended threads permanently',
          'Thread local storage exhausted memory'
        ],
        correctIndex: 0,
        explanation: 'Java 7 reversed bucket lists using head-insertion. Racing threads could create circular pointer loops, trapping subsequent `get()` calls in infinite loops.'
      },
      {
        question: 'How did Java 8 fix the cyclic pointer loop bug during resizing?',
        options: [
          'By making all methods in HashMap synchronized',
          'By using tail-insertion for both low and high chains, preserving the original relative order of nodes',
          'By using software transactional memory',
          'By forbidding table resizes'
        ],
        correctIndex: 1,
        explanation: 'Java 8 builds `loHead..loTail` and `hiHead..hiTail` using tail-insertion, preserving original node order and eliminating circular pointer creation.'
      },
      {
        question: 'How do you calculate the optimal initial capacity to store 300 items without triggering a resize?',
        options: [
          'new HashMap<>(300)',
          '(int) Math.ceil(300 / 0.75f) = 400 -> rounds up to 512 via tableSizeFor',
          'new HashMap<>(300 * 2)',
          'new HashMap<>(1024)'
        ],
        correctIndex: 1,
        explanation: '`300 / 0.75 = 400`. The next power of two is 512, ensuring the threshold (384) comfortably accommodates 300 items without resizing.'
      },
      {
        question: 'What happens to the internal table array capacity when you delete 99% of entries in a HashMap?',
        options: [
          'The table array halves in size automatically',
          'The table array remains at its peak allocated capacity and does not shrink',
          'The table is reset to default capacity 16',
          'The JVM throws an OutOfMemoryError'
        ],
        correctIndex: 1,
        explanation: 'HashMap never shrinks its table array automatically on deletions to avoid memory allocation and rehashing churn.'
      },
      {
        question: 'What is the absolute maximum capacity limit of a Java HashMap?',
        options: [
          '1 << 16 (65,536)',
          '1 << 30 (1,073,741,824)',
          'Integer.MAX_VALUE (2,147,483,647)',
          'Long.MAX_VALUE'
        ],
        correctIndex: 1,
        explanation: '`MAXIMUM_CAPACITY = 1 << 30` (1,073,741,824), the highest positive power of two representable in a 32-bit signed int.'
      },
      {
        question: 'What does `tableSizeFor(cap)` in HashMap do?',
        options: [
          'Calculates the memory size in megabytes',
          'Uses bit-smearing shifts (>>> 1, 2, 4, 8, 16) to round any integer up to the next power of two',
          'Counts the number of elements in the table',
          'Sets load factor to default'
        ],
        correctIndex: 1,
        explanation: '`tableSizeFor` smears the highest 1-bit across all lower bits, adding 1 to compute the exact next power of two.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 19.4: ConcurrentHashMap Internals
  // ─────────────────────────────────────────────────────────────
  'concurrenthashmap-internals': {
      id: 'concurrenthashmap-internals',
      moduleId: 'java-hashing',
      moduleTitle: '19. Hashing & HashMap Internals',
      lessonNumber: 'Lesson 19.4',
      title: 'ConcurrentHashMap: CAS, Synchronized Buckets & Lock-Free Reads',
      subtitle: 'Java 7 Segment striping vs Java 8 CAS & synchronized bucket heads, volatile memory visibility, multi-threaded transfer, and lock-free reads',
      estimatedMinutes: 30,
      beginnerAnalogy: 'Imagine a bank with 1,000 safety deposit boxes. In the ancient days (`Hashtable`), a single security guard locked the front door of the entire bank whenever any customer touched a box—everyone else had to stand outside in the rain! In Java 7 (`Segment Lock Striping`), the bank divided the boxes into 16 separate rooms; 16 customers could enter at once, but they still locked an entire room of 64 boxes. In Java 8 (`ConcurrentHashMap`), the bank achieved engineering perfection: reading any box is completely lock-free because all boxes have transparent glass doors (`volatile` memory visibility). When writing to an empty box, the system uses an instant pneumatic air-tube (`CAS - Compare-And-Swap`) with zero locks. Only when two customers try to modify the exact same box at the same time does a mini-lock snap shut on just that single box (`synchronized (bucketHead)`), leaving the remaining 999 boxes wide open!',
    interviewTakeaways: [
      'Architectural Evolution: In Java 7, `ConcurrentHashMap` used Segment Lock Striping (typically 16 `Segment<K,V>` subclasses of `ReentrantLock`), allowing at most 16 concurrent write threads. In Java 8, Segments were completely eliminated in favor of a flat `Node<K,V>[] table` with fine-grained bucket-level synchronization.',
      'Lock-Free CAS on Empty Buckets: When adding to an empty bucket, Java 8 ConcurrentHashMap uses lock-free Compare-And-Swap (`casTabAt`) via Unsafe / VarHandle. Zero mutex locks or monitor locks are acquired!',
      'Synchronized Bucket Head on Collisions: If a bucket is already populated, it synchronizes strictly on the first node of that bucket: `synchronized (f)`. This locks only that individual collision chain or tree bin, allowing threads writing to different buckets to proceed concurrently without blocking.',
      '100% Lock-Free Reads: `get()` is completely lock-free and never acquires any lock! This is achieved because `Node.val` and `Node.next` are declared `volatile`, and table array reads use volatile memory barriers (`tabAt`), guaranteeing immediate cross-thread visibility per the Java Memory Model.',
      'Strict Null Rejection: `ConcurrentHashMap` strictly forbids both `null` keys and `null` values! Doug Lea deliberately prohibited nulls because in multi-threaded code, `map.get(key) == null` cannot reliably distinguish between "key is absent" and "key is mapped to null" without race conditions.',
      'Concurrent Cooperative Resizing: Resizing in Java 8 ConcurrentHashMap is multi-threaded and cooperative. When a thread encounters a forwarding node (`ForwardingNode` with hash `-1`), it actively assists the resizing process by transferring a chunk (stride) of buckets to the `nextTable`.'
    ],
    cheatSheet: {
      summary: 'ConcurrentHashMap provides high-concurrency thread safety. Lock-free CAS for empty buckets, synchronized(bucketHead) for collisions, and 100% lock-free reads via volatile variables. Rejects null keys and values.',
      syntaxTemplate: `// Thread-safe map instantiation
ConcurrentMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();

// Atomic check-and-act operations
concurrentMap.putIfAbsent("Key", 100);
concurrentMap.replace("Key", 100, 200);

// Atomic compute and merge (locks only the target bucket head)
concurrentMap.compute("Key", (k, v) -> (v == null) ? 1 : v + 1);
concurrentMap.merge("Key", 1, Integer::sum);`,
      rules: [
        { rule: 'Zero Null Tolerance', explanation: 'Calling put(null, v) or put(k, null) throws NullPointerException immediately.' },
        { rule: 'Lock-Free Reads', explanation: 'get(), containsKey(), and iterations are lock-free due to volatile table elements and node value/next fields.' },
        { rule: 'Fine-Grained Bucket Locks', explanation: 'Writes only lock the target bucket head node: synchronized(f). Unrelated buckets are completely unblocked.' },
        { rule: 'Weakly Consistent Iterators', explanation: 'Iterators reflect state at or since creation, tolerate concurrent modifications, and never throw ConcurrentModificationException.' },
        { rule: 'Atomic Compound Operations', explanation: 'Always use compute(), merge(), or putIfAbsent() instead of non-atomic get()-then-put() sequences.' }
      ],
      quickComparison: [
        { aspect: 'Architecture', optionA: 'Java 7: 16 ReentrantLock Segments', optionB: 'Java 8+: CAS on empty bin + synchronized(bucketHead)' },
        { aspect: 'Read (get) Locking', optionA: 'Hashtable: synchronized method lock', optionB: 'ConcurrentHashMap: 100% lock-free via volatile' },
        { aspect: 'Null Policy', optionA: 'HashMap: Permits 1 null key & null values', optionB: 'ConcurrentHashMap: Throws NPE on null key or value' },
        { aspect: 'Resizing Execution', optionA: 'Single-threaded sequential transfer', optionB: 'Multi-threaded cooperative transfer with ForwardingNodes' }
      ]
    },
    coreExplanation: [
      '`ConcurrentHashMap` is the premier concurrent associative array in Java, designed by concurrency pioneer Doug Lea to deliver high throughput across multi-core processors.',
      'The Java 7 Architecture (Segment Lock Striping): Java 7 structured the map as an array of 16 `Segment<K,V>` instances, each extending `ReentrantLock` and managing its own sub-hash table. This permitted up to 16 threads to write concurrently without blocking. However, it incurred heavy object allocation overhead, and global operations like `size()` required acquiring multiple segment locks.',
      'The Java 8 Architecture: Java 8 discarded Segments completely. It uses a single flat `Node<K,V>[] table`, identical in layout to a standard HashMap. Concurrency control is achieved using a combination of hardware-level CAS (Compare-And-Swap) and fine-grained `synchronized` blocks.',
      'Write Path Mechanics (putVal): 1) If `table` is unallocated, initialize via CAS on `sizeCtl`. 2) If the target bucket is empty (`tabAt(tab, i) == null`), insert the new node using lock-free CAS: `casTabAt(tab, i, null, new Node(...))`. If another thread raced and inserted first, CAS fails and it retries the loop. 3) If the bucket contains a `ForwardingNode` (`hash == MOVED == -1`), the thread joins the cooperative resize. 4) If the bucket is populated, it enters a `synchronized (f)` block locking ONLY the first node `f` of that bucket. It appends to the list or treeifies.',
      'Lock-Free Reads (get): Why does `get()` never block? In `Node<K,V>`, `volatile V val` and `volatile Node<K,V> next` guarantee that writes made by any thread are immediately visible across CPU core caches via memory barriers (happens-before relationship). Furthermore, reads from the table array use `tabAt()` which performs an Unsafe volatile memory read.',
      'Why Nulls are Forbidden: In a single-threaded HashMap, if `map.get("key")` returns null, you can call `map.containsKey("key")` to determine whether the key is missing or mapped to null. In a multi-threaded map, another thread could insert or delete the key in the microseconds between your `get()` and `containsKey()` calls! To eliminate this race condition, Doug Lea mandated that null keys and null values are illegal.',
      'Cooperative Resizing with ForwardingNode: During a resize, `ConcurrentHashMap` creates a `nextTable` of twice the size. When a bucket has been transferred, its slot is replaced with a `ForwardingNode` (`hash = -1`). Any other thread attempting to write to that bucket detects `MOVED` and cooperatively helps transfer remaining buckets, accelerating resizes on multi-core systems.'
    ],
    diagram: `CONCURRENTHASHMAP: JAVA 7 SEGMENTS VS JAVA 8 FINE-GRAINED CAS
========================================================================

JAVA 7: SEGMENT LOCK STRIPING (16 Segments)
   ConcurrentHashMap
   ├── Segment[0] (ReentrantLock) ──> [ Sub-Table: Buckets 0..3 ]
   ├── Segment[1] (ReentrantLock) ──> [ Sub-Table: Buckets 4..7 ]
   ...
   └── Segment[15](ReentrantLock) ──> [ Sub-Table: Buckets 60..63 ]
   * Maximum 16 concurrent writing threads!

JAVA 8: CAS + SYNCHRONIZED BUCKET HEADS (Flat Table)
   Node<K,V>[] table:
   [0] ──> null ──[Thread 1: casTabAt(0, null, Node) -> LOCK-FREE!]
   [1] ──> [ HeadNode A ] ──[Thread 2: synchronized(HeadNode A)]
                │
             [ Node B ]
   [2] ──> [ ForwardingNode (hash = -1) ] ──[Thread 3: Helps resize nextTable!]
   [3] ──> [ HeadNode C ] ──[Thread 4: synchronized(HeadNode C)]
   ...
   [N] ──> [ HeadNode D ] ──[Thread 5: get() -> 100% LOCK-FREE via volatile!]

* Zero Segment overhead!
* Concurrency scales to thousands of buckets!`,
    codeSnippet: {
      title: 'Atomic Compute and Thread-Safe Concurrency in ConcurrentHashMap',
      code: `import java.util.concurrent.*;

public class ConcurrentHashMapDemo {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> inventory = new ConcurrentHashMap<>();
        inventory.put("Widget", 50);

        // Atomic check-and-act: putIfAbsent
        Integer prev = inventory.putIfAbsent("Widget", 100);
        System.out.println("putIfAbsent('Widget', 100) returned: " + prev); // 50

        // Atomic compute: updates value safely without external synchronization
        inventory.compute("Widget", (k, v) -> v - 10);
        System.out.println("After compute (sold 10): " + inventory.get("Widget")); // 40

        // Atomic merge: accumulates values
        inventory.merge("Widget", 20, Integer::sum);
        System.out.println("After merge (restocked 20): " + inventory.get("Widget")); // 60
    }
}`,
      lineByLineExplanation: [
        { line: 'ConcurrentHashMap<String, Integer> inventory = new ConcurrentHashMap<>();', explanation: 'Creates a ConcurrentHashMap with fine-grained bucket synchronization.' },
        { line: 'inventory.putIfAbsent("Widget", 100);', explanation: 'Atomically checks if "Widget" exists; since it does, returns 50 without overwriting.' },
        { line: 'inventory.compute("Widget", (k, v) -> v - 10);', explanation: 'Locks only the "Widget" bucket head node, decrements 10, and releases lock.' },
        { line: 'inventory.merge("Widget", 20, Integer::sum);', explanation: 'Atomically applies Integer::sum to add 20 to the existing stock.' },
        { line: 'inventory.get("Widget");', explanation: 'Performs a 100% lock-free volatile read to fetch the latest value.' }
      ],
      output: `putIfAbsent('Widget', 100) returned: 50
After compute (sold 10): 40
After merge (restocked 20): 60`
    },
    codeExamples: [
      {
        title: 'The Non-Atomic Check-Then-Act Trap in ConcurrentHashMap',
        description: 'Demonstrating why get()-then-put() causes race conditions despite using ConcurrentHashMap.',
        code: `import java.util.concurrent.ConcurrentHashMap;

public class CompoundActionTrap {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
        map.put("hits", 0);

        // BROKEN ANTI-PATTERN: Not atomic across threads!
        // Thread A and Thread B could both read hits = 0, and both write 1.
        int current = map.get("hits");
        map.put("hits", current + 1);

        // CORRECT PATTERN: Atomic compound execution per bucket
        map.compute("hits", (k, v) -> v + 1);
        System.out.println("Hits safely incremented: " + map.get("hits"));
    }
}`,
        output: `Hits safely incremented: 2`
      },
      {
        title: 'Weakly Consistent Iteration without ConcurrentModificationException',
        description: 'Demonstrating that ConcurrentHashMap iterators tolerate in-flight modifications.',
        code: `import java.util.concurrent.ConcurrentHashMap;

public class WeaklyConsistentDemo {
    public static void main(String[] args) {
        ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
        map.put("A", "Alpha");
        map.put("B", "Beta");

        System.out.print("Iteration: ");
        for (String key : map.keySet()) {
            System.out.print(key + " ");
            if (key.equals("A")) {
                map.put("C", "Gamma"); // In-flight mutation!
            }
        }
        System.out.println("\\nFinal map contents: " + map.keySet());
    }
}`,
        output: `Iteration: A B 
Final map contents: [A, B, C]`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Passing null as a key or value to ConcurrentHashMap',
        whyItHappens: 'Standard HashMap permits a null key and null values. Calling `concurrentMap.put(null, "val")` throws an immediate `NullPointerException`.',
        howToFix: 'Never use null in ConcurrentHashMap. Use sentinel objects (e.g. `""` or `Optional.empty()`) if representing absence is needed.'
      },
      {
        mistake: 'Writing non-atomic compound operations: if (!map.containsKey(k)) map.put(k, v)',
        whyItHappens: 'Developers assume ConcurrentHashMap makes code blocks thread-safe. Individual methods are thread-safe, but sequences of separate method calls have race conditions in between.',
        howToFix: 'Use atomic compound methods: `map.putIfAbsent(k, v)`, `map.computeIfAbsent(k, lambda)`, or `map.replace(k, oldVal, newVal)`.'
      },
      {
        mistake: 'Using Collections.synchronizedMap(new HashMap<>()) instead of ConcurrentHashMap',
        whyItHappens: 'SynchronizedMap wraps a standard HashMap with a single coarse-grained mutex lock. Every read and write blocks all other threads, creating severe contention on multi-core CPUs.',
        howToFix: 'Always prefer `ConcurrentHashMap` for high-concurrency systems.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: ConcurrentHashMap Null Key Behavior',
        problemStatement: 'What happens when attempting to put a null key into a ConcurrentHashMap?',
        code: `import java.util.concurrent.ConcurrentHashMap;

public class Puzzle1 {
    public static void main(String[] args) {
        ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
        map.put(null, "Value");
    }
}`,
        options: [
          'A) null is stored at bucket 0',
          'B) Throws NullPointerException',
          'C) Returns null silently',
          'D) Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'ConcurrentHashMap has a zero-tolerance policy for nulls.',
        solution: 'Option B is correct: Throws NullPointerException',
        explanation: '`ConcurrentHashMap` explicitly validates that neither keys nor values are null (`if (key == null || value == null) throw new NullPointerException();`).'
      },
      {
        title: 'Puzzle 2: Mechanism Used on Empty Bucket Insertions in Java 8',
        problemStatement: 'What synchronization technique does Java 8 ConcurrentHashMap use when inserting a node into an empty bucket?',
        code: `// Bucket tabAt(tab, i) is null:
// Which mechanism is used to insert?`,
        options: [
          'A) synchronized (this)',
          'B) ReentrantLock',
          'C) Lock-free Compare-And-Swap (casTabAt)',
          'D) ReadWriteLock'
        ],
        correctOptionIndex: 2,
        hint: 'It uses atomic hardware instructions with zero mutex locking.',
        solution: 'Option C is correct: Lock-free Compare-And-Swap (casTabAt)',
        explanation: 'When a bucket is empty, Java 8 ConcurrentHashMap uses `casTabAt(tab, i, null, new Node(...))` to insert the head node without acquiring any lock.'
      },
      {
        title: 'Puzzle 3: Mechanism Used on Populated Bucket Insertions in Java 8',
        problemStatement: 'What does Java 8 ConcurrentHashMap lock when inserting an element into a bucket that already has colliding elements?',
        code: `// Bucket tabAt(tab, i) already contains HeadNode f:`,
        options: [
          'A) It acquires a lock on the entire ConcurrentHashMap instance',
          'B) It synchronizes on the first node of that bucket: synchronized (f)',
          'C) It acquires a Segment lock',
          'D) It creates a spinlock on the thread'
        ],
        correctOptionIndex: 1,
        hint: 'It locks strictly the first node of the collision chain.',
        solution: 'Option B is correct: It synchronizes on the first node of that bucket: synchronized (f)',
        explanation: 'When collisions occur, ConcurrentHashMap synchronizes on the bucket head node (`synchronized (f)`), restricting contention exclusively to that single bucket while allowing other buckets to be modified concurrently.'
      },
      {
        title: 'Puzzle 4: Why ConcurrentHashMap.get() Never Acquires Locks',
        problemStatement: 'Why is `ConcurrentHashMap.get(key)` able to read values in a 100% lock-free manner without risking stale reads?',
        code: `// Node declaration inside ConcurrentHashMap:
// volatile V val;
// volatile Node<K,V> next;`,
        options: [
          'A) Because CPU cores share a single L1 cache',
          'B) Because Node.val and Node.next are declared volatile, ensuring happens-before memory visibility',
          'C) Because Java freezes writing threads during reads',
          'D) Because get() makes a defensive copy of the table'
        ],
        correctOptionIndex: 1,
        hint: 'Volatile variables establish cross-thread memory visibility barriers.',
        solution: 'Option B is correct: Because Node.val and Node.next are declared volatile, ensuring happens-before memory visibility',
        explanation: 'Declaring `volatile V val` and `volatile Node<K,V> next` guarantees that any write to an entry is immediately visible to any reading thread across CPU caches, eliminating the need for read locks.'
      },
      {
        title: 'Puzzle 5: ConcurrentModificationException in ConcurrentHashMap',
        problemStatement: 'What happens when a thread modifies a ConcurrentHashMap while another thread is iterating over it?',
        code: `// Thread 1 iterates: for (String k : map.keySet()) ...
// Thread 2 mutates: map.put("NewKey", 100);`,
        options: [
          'A) Throws ConcurrentModificationException',
          'B) The iterator is weakly consistent: it never throws CME and reflects modifications safely',
          'C) Deadlock occurs',
          'D) Iteration halts and returns an empty set'
        ],
        correctOptionIndex: 1,
        hint: 'ConcurrentHashMap iterators are designed for concurrent environments.',
        solution: 'Option B is correct: The iterator is weakly consistent: it never throws CME and reflects modifications safely',
        explanation: 'Iterators in `ConcurrentHashMap` are weakly consistent. They traverse bucket nodes via volatile pointers, never throw `ConcurrentModificationException`, and may or may not reflect additions made after the iterator was constructed.'
      },
      {
        title: 'Puzzle 6: What is a ForwardingNode in Java 8 ConcurrentHashMap?',
        problemStatement: 'What does a ForwardingNode with hash = -1 (MOVED) indicate inside a ConcurrentHashMap bucket?',
        code: `// Node with hash = -1 (MOVED) encountered during putVal:`,
        options: [
          'A) The bucket contains a deleted tombstone',
          'B) The table is currently resizing, and this bucket has already been transferred to nextTable',
          'C) The bucket is corrupt',
          'D) The bucket has treeified into a B-Tree'
        ],
        correctOptionIndex: 1,
        hint: 'A ForwardingNode points to nextTable during cooperative resizing.',
        solution: 'Option B is correct: The table is currently resizing, and this bucket has already been transferred to nextTable',
        explanation: 'A `ForwardingNode` (`hash = MOVED = -1`) acts as a sentinel placed in old buckets that have completed transfer to `nextTable`. When other threads encounter it, they help transfer remaining buckets.'
      },
      {
        title: 'Puzzle 7: Return Value of putIfAbsent on New Key',
        problemStatement: 'What does `concurrentMap.putIfAbsent("A", 10)` return if "A" was not previously in the map?',
        code: `ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
Integer res = map.putIfAbsent("A", 10);
System.out.println(res);`,
        options: [
          'A) 10',
          'B) null',
          'C) true',
          'D) 0'
        ],
        correctOptionIndex: 1,
        hint: 'Like Map.putIfAbsent, it returns null if the key had no previous mapping.',
        solution: 'Option B is correct: null',
        explanation: '`putIfAbsent` returns the previous value associated with the key. If there was no prior mapping, it returns `null`.'
      },
      {
        title: 'Puzzle 8: Accurate Size Calculation in ConcurrentHashMap',
        problemStatement: 'How does Java 8 ConcurrentHashMap calculate its size without locking the entire table?',
        code: `// map.size() or map.mappingCount()`,
        options: [
          'A) It locks every bucket sequentially',
          'B) It uses a striped CounterCell array (similar to LongAdder) to distribute counter updates and sum them',
          'C) It runs an O(N) full table scan',
          'D) It stops all writing threads'
        ],
        correctOptionIndex: 1,
        hint: 'Doug Lea uses striped counters to prevent CAS contention on a single size integer.',
        solution: 'Option B is correct: It uses a striped CounterCell array (similar to LongAdder) to distribute counter updates and sum them',
        explanation: '`ConcurrentHashMap` maintains a `baseCount` and an array of `CounterCell` objects. When threads update the map, they increment different counter cells to avoid CAS contention, and `size()` sums these cells.'
      },
      {
        title: 'Puzzle 9: Method Recommendation for Concurrent Counter',
        problemStatement: 'Which method should be used to atomically increment an Integer counter in a ConcurrentHashMap?',
        code: `// ConcurrentHashMap<String, Integer> map = ...;
// Goal: Increment counter for "hits"`,
        options: [
          'A) map.put("hits", map.get("hits") + 1);',
          'B) map.compute("hits", (k, v) -> (v == null) ? 1 : v + 1);',
          'C) synchronized(map) { map.put("hits", map.get("hits") + 1); }',
          'D) map.replace("hits", map.get("hits") + 1);'
        ],
        correctOptionIndex: 1,
        hint: 'compute() executes the remapping function atomically under the bucket lock.',
        solution: 'Option B is correct: map.compute("hits", (k, v) -> (v == null) ? 1 : v + 1);',
        explanation: '`compute()` evaluates the update atomically inside the bucket`s synchronized block, guaranteeing thread safety without external synchronization.'
      },
      {
        title: 'Puzzle 10: MappingCount vs Size in ConcurrentHashMap',
        problemStatement: 'Why was `mappingCount()` introduced in Java 8 for ConcurrentHashMap alongside `size()`?',
        code: `long count = concurrentMap.mappingCount();`,
        options: [
          'A) mappingCount() returns a 64-bit long, accommodating maps with more than Integer.MAX_VALUE entries',
          'B) mappingCount() is synchronized while size() is not',
          'C) mappingCount() includes deleted entries',
          'D) mappingCount() only counts treeified bins'
        ],
        correctOptionIndex: 0,
        hint: 'size() returns an int which caps out at 2^31 - 1.',
        solution: 'Option A is correct: mappingCount() returns a 64-bit long, accommodating maps with more than Integer.MAX_VALUE entries',
        explanation: '`size()` returns an `int` which caps at `Integer.MAX_VALUE`. `mappingCount()` returns a `long`, allowing high-capacity concurrent maps to accurately report counts exceeding 2 billion entries.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Compare ConcurrentHashMap in Java 7 vs Java 8. What major architectural changes were made and why?',
        answer: 'In Java 7, `ConcurrentHashMap` used Segment Lock Striping: the map was partitioned into an array of 16 `Segment<K,V>` instances (each extending `ReentrantLock`). A thread acquired a lock on the specific Segment corresponding to the key`s hash. While this allowed up to 16 concurrent writes, concurrency was bounded by the segment count, and global operations like `size()` or `containsValue()` required locking multiple segments. In Java 8, Segments were completely removed in favor of a single flat `Node<K,V>[] table`. Concurrency control was upgraded to: 1) Lock-free CAS (`casTabAt`) for empty buckets; 2) Fine-grained `synchronized` on the bucket head node (`synchronized (f)`) for populated bins; 3) 100% lock-free reads via `volatile` memory visibility; 4) Red-Black treeification for collision bins >= 8 nodes; 5) Cooperative multi-threaded resizing using `ForwardingNode`. This drastically reduced memory overhead and allowed concurrency to scale to thousands of buckets simultaneously.',
        followUp: 'Why was synchronized chosen over ReentrantLock in Java 8?',
        followUpAnswer: 'JVM engineers heavily optimized Java intrinsic synchronized locks (biased locking, lock coarsening, adaptive spinning) in HotSpot. In Java 8, synchronized on an existing object header requires zero extra memory allocation, whereas ReentrantLock requires allocating a separate Lock object for every bucket.',
        keyPhrases: [
          'Java 7: 16 ReentrantLock Segments',
          'Java 8: Flat Node[] table with CAS and synchronized(bucketHead)',
          'Lock-free reads via volatile variables',
          'Cooperative multi-threaded resizing',
          'Synchronized avoids ReentrantLock object allocation overhead'
        ],
        commonMistakeAnswer: 'Asserting that Java 8 still uses Segments under the hood.'
      },
      {
        question: 'Why does ConcurrentHashMap strictly forbid null keys and null values, whereas standard HashMap permits them?',
        answer: 'Doug Lea deliberately banned null keys and null values due to concurrency ambiguity. In a single-threaded HashMap, if `map.get(key)` returns `null`, the developer can call `map.containsKey(key)` to determine whether the key is genuinely absent or mapped to `null`. In a multi-threaded ConcurrentHashMap, this check is impossible: between your call to `get(key)` and `containsKey(key)`, another thread could concurrently insert, update, or remove the key! The state observed between the two calls would be non-deterministic and corrupt. By prohibiting null values, `map.get(key) != null` unambiguously confirms the key is present in a single atomic step.',
        followUp: 'What exception is thrown if you pass null to put(), get(), or containsKey()?',
        followUpAnswer: '`NullPointerException` is thrown immediately by put(), get(), containsKey(), and all mutating methods.',
        keyPhrases: [
          'Ambiguity between key absence and key mapped to null',
          'Race condition between get() and containsKey()',
          'Single atomic read confirmation: get(key) != null',
          'Throws NullPointerException immediately'
        ],
        commonMistakeAnswer: 'Thinking null was forbidden because of hash code calculations or memory alignment.'
      },
      {
        question: 'How does ConcurrentHashMap achieve 100% lock-free reads in get() without dirty or stale reads?',
        answer: '`get()` achieves 100% lock-freedom through three Java Memory Model (JMM) guarantees: 1) Volatile Node Fields: Inside `Node<K,V>`, `volatile V val` and `volatile Node<K,V> next` ensure that any modification made by a writing thread establishes a happens-before relationship, immediately flushing CPU store buffers and making the update visible to other CPU cores. 2) Volatile Array Access: Reading the table bucket uses `tabAt(tab, i)`, which performs an Unsafe volatile memory read (`getObjectVolatile`), ensuring the reading thread sees the latest array element reference. 3) Forwarding Nodes: If resizing is underway, reading threads encounter a `ForwardingNode` that smoothly redirects lookups to `nextTable` without locking.',
        followUp: 'Can get() ever block on a thread that is currently rebalancing a Red-Black tree?',
        followUpAnswer: 'No! Red-Black tree bins in ConcurrentHashMap (`TreeBin`) maintain a reader-writer lock state. If a writer is currently rotating the tree, reading threads do not block on a monitor; instead, they temporarily traverse the node chain using the underlying doubly-linked list (`next` pointers) in O(K) time until writing completes.',
        keyPhrases: [
          'volatile V val and volatile Node next',
          'tabAt() Unsafe volatile array memory reads',
          'Happens-before memory barrier guarantee',
          'TreeBin reader-writer state falls back to list traversal'
        ],
        commonMistakeAnswer: 'Believing get() acquires a read lock from a ReentrantReadWriteLock.'
      },
      {
        question: 'Explain how cooperative resizing works in Java 8 ConcurrentHashMap using ForwardingNode.',
        answer: 'In standard HashMap, resizing is single-threaded: one thread pauses all progress to copy all buckets. In `ConcurrentHashMap`, resizing is cooperative and multi-threaded. When resizing starts, it allocates `nextTable` of double capacity. As buckets are transferred from `table` to `nextTable`, the old bucket slot is replaced with a special `ForwardingNode` with `hash = MOVED = -1` and a reference to `nextTable`. When another worker thread calls `put()` or `compute()` and lands on a bucket with a `ForwardingNode`, rather than waiting or blocking, it actively joins the resizing effort! It invokes `helpTransfer()`, claiming a stride of remaining buckets (minimum 16 buckets) and transferring them in parallel. Once all threads finish, `table` is swapped to `nextTable`.',
        followUp: 'What is the stride size in concurrent resizing?',
        followUpAnswer: 'The stride is the number of buckets assigned to each worker thread, calculated dynamically based on available CPU cores (`(N >>> 3) / NCPU`), with a hard lower bound of 16 (`MIN_TRANSFER_STRIDE = 16`).',
        keyPhrases: [
          'ForwardingNode with hash = -1 (MOVED)',
          'Threads actively join resizing via helpTransfer()',
          'Parallel bucket transfer across CPU cores',
          'Stride chunks prevent thread contention'
        ],
        commonMistakeAnswer: 'Assuming one thread stops the world to resize while all other threads sleep.'
      },
      {
        question: 'What is the "Check-Then-Act" race condition in ConcurrentHashMap, and how do atomic methods solve it?',
        answer: 'A Check-Then-Act race condition occurs when code combines multiple atomic method calls into a non-atomic compound sequence. For example: `if (!map.containsKey("count")) map.put("count", 1); else map.put("count", map.get("count") + 1);`. Although `containsKey`, `get`, and `put` are individually thread-safe, another thread can interleave execution between the check and the put, causing lost updates. ConcurrentHashMap solves this by providing atomic compound methods that execute the check and the act inside a single bucket lock: 1) `putIfAbsent(k, v)`, 2) `replace(k, oldVal, newVal)`, 3) `compute(k, remappingFunction)`, 4) `computeIfAbsent(k, mappingFunction)`, and 5) `merge(k, v, remappingFunction)`.',
        followUp: 'Why is computeIfAbsent preferred over putIfAbsent for expensive object initialization?',
        followUpAnswer: 'Because `putIfAbsent(k, new ExpensiveService())` instantiates the expensive object before calling the method, wasting CPU/RAM even if the key is already present. In contrast, `computeIfAbsent(k, key -> new ExpensiveService())` evaluates the lambda mapping function lazily only if the key is confirmed absent.',
        keyPhrases: [
          'Compound sequences have interleaving race gaps',
          'Atomic methods lock the bucket head during evaluation',
          'putIfAbsent, replace, compute, merge',
          'computeIfAbsent lazily evaluates mapping function'
        ],
        commonMistakeAnswer: 'Believing ConcurrentHashMap automatically synchronizes multi-line code blocks.'
      },
      {
        question: 'How does ConcurrentHashMap calculate size() without locking all buckets? How does CounterCell work?',
        answer: 'In Java 7, `size()` attempted to read segments without locking up to 3 times; if modCount changed, it locked all 16 segments. In Java 8, Doug Lea adopted the `LongAdder` cell-striping approach to avoid lock contention. The map maintains a `volatile long baseCount` and a `volatile CounterCell[] counterCells`. When a thread updates the map, it first attempts a fast CAS on `baseCount`. If CAS fails due to contention from other threads, it hashes the thread`s probe value to a `CounterCell` slot and increments that cell via CAS. When `size()` or `mappingCount()` is called, it sums `baseCount` and all active `CounterCell` values in a single pass without locking any buckets.',
        followUp: 'What is the difference between size() and mappingCount()?',
        followUpAnswer: '`size()` returns an `int` capped at `Integer.MAX_VALUE`. `mappingCount()` returns a 64-bit `long` and is officially recommended for high-volume concurrent maps that may exceed 2 billion mappings.',
        keyPhrases: [
          'CounterCell striping inspired by LongAdder',
          'Fast CAS on baseCount, falls back to CounterCell array',
          'Sums cells in single pass without locking',
          'mappingCount() returns long for large maps'
        ],
        commonMistakeAnswer: 'Asserting that size() acquires locks on all bucket heads to count.'
      },
      {
        question: 'Explain what weakly consistent iterators are in ConcurrentHashMap.',
        answer: 'Iterators in `ConcurrentHashMap` are "weakly consistent" (unlike the fail-fast iterators of `HashMap`). A weakly consistent iterator guarantees: 1) It will never throw `ConcurrentModificationException`. 2) It traverses elements via volatile `next` pointers as they existed at the time of iterator construction. 3) It tolerates concurrent additions, updates, and removals without failing. 4) It may, but is not guaranteed to, reflect modifications made to the map after iterator construction. 5) It guarantees each element will be visited at most once.',
        followUp: 'Can you call iterator.remove() on a ConcurrentHashMap iterator?',
        followUpAnswer: 'Yes, iterator.remove() is fully supported and thread-safe; it delegates to the underlying map.remove(key, val) without corrupting concurrent traversals.',
        keyPhrases: [
          'Never throws ConcurrentModificationException',
          'Tolerates concurrent additions and deletions',
          'Traverses via volatile pointers',
          'Reflects state at or since iterator creation'
        ],
        commonMistakeAnswer: 'Thinking ConcurrentHashMap makes a cloned snapshot of the entire map for iterators (that is CopyOnWriteArrayList, not ConcurrentHashMap).'
      },
      {
        question: 'Compare ConcurrentHashMap vs Collections.synchronizedMap(map). When would you ever use synchronizedMap?',
        answer: '`Collections.synchronizedMap` is a simple decorator that wraps a map and synchronizes every single method with `synchronized (mutex)`. This creates a global bottleneck: only one thread can read or write at any time, causing severe thread contention and CPU stalls on multi-core systems. Furthermore, iterating over a synchronized map requires manual synchronization on the mutex to prevent ConcurrentModificationException. In contrast, `ConcurrentHashMap` uses bucket-level locking, CAS, and lock-free volatile reads, scaling throughput linearly with CPU cores. You would only use `synchronizedMap` if you specifically require a map implementation that preserves insertion order (`synchronizedMap(new LinkedHashMap<>())`) or sorted order (`synchronizedSortedMap(new TreeMap<>())`), or if you must allow null keys and null values under global locking.',
        followUp: 'What concurrent map alternative exists for sorted ordering?',
        followUpAnswer: '`ConcurrentSkipListMap`, which implements ConcurrentNavigableMap using a lock-free SkipList data structure, providing O(log N) thread-safe sorted operations.',
        keyPhrases: [
          'synchronizedMap uses single global mutex lock',
          'Severely limits multi-core CPU throughput',
          'ConcurrentHashMap uses bucket locks and lock-free reads',
          'ConcurrentSkipListMap for thread-safe sorted navigation'
        ],
        commonMistakeAnswer: 'Claiming synchronizedMap is faster because it does not have CAS overhead.'
      },
      {
        question: 'How does TreeBin handle concurrent reads and writes in Java 8 ConcurrentHashMap?',
        answer: 'In `ConcurrentHashMap`, treeified buckets are rooted by a specialized node called `TreeBin`. A `TreeBin` does not hold a user key/value itself; instead, it holds the root of the `TreeNode` Red-Black tree and an internal `volatile int lockState`. Writing threads acquire the bucket monitor lock (`synchronized (bucketHead)`), which sets the writer bit in `lockState`. If reading threads arrive while a writer is modifying or rebalancing the tree, they observe the writer lock state. Instead of blocking or sleeping, reading threads gracefully bypass the tree structure and traverse the nodes as a linear linked list using their `next` pointers! Once tree rebalancing completes and the writer bit clears, readers resume fast O(log N) binary tree descent.',
        followUp: 'Why is this hybrid list/tree traversal design so brilliant?',
        followUpAnswer: 'Because it guarantees that readers NEVER block on writers, preserving the fundamental promise of 100% lock-free read throughput even during complex tree rotations.',
        keyPhrases: [
          'TreeBin wraps Red-Black tree with lockState',
          'Writer acquires bucket synchronized monitor',
          'Readers never block during tree rotations',
          'Falls back to linear list traversal during rebalance'
        ],
        commonMistakeAnswer: 'Assuming readers must wait for tree rotations to finish before reading.'
      },
      {
        question: 'What is the memory footprint of ConcurrentHashMap compared to HashMap?',
        answer: 'In Java 8, `ConcurrentHashMap` has a very lean memory footprint compared to Java 7 because Segments were eliminated. Its `Node<K,V>` structure is almost identical to HashMap`s `Node`, with the addition of `volatile` modifiers on `val` and `next`. The initial table array is lazily allocated upon the first write, just like HashMap. The only minor memory additions are the `CounterCell` array (allocated only when write contention occurs) and small synchronization state fields. Therefore, in Java 8+, `ConcurrentHashMap` incurs minimal memory overhead over standard `HashMap` while providing enterprise-grade multi-threaded concurrency.',
        followUp: 'What is the default initial concurrency level in Java 8 ConcurrentHashMap?',
        followUpAnswer: 'In Java 8, the `concurrencyLevel` constructor parameter is preserved only for backwards compatibility with Java 7 and acts merely as an initial sizing hint for table capacity; it no longer creates segments.',
        keyPhrases: [
          'Lean memory footprint identical to flat table layout',
          'Eliminated Java 7 Segment overhead',
          'Lazy table allocation',
          'concurrencyLevel is only a sizing hint in Java 8'
        ],
        commonMistakeAnswer: 'Believing ConcurrentHashMap consumes 16x the memory of HashMap due to segments in modern Java.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which synchronization mechanism does Java 8 ConcurrentHashMap use when inserting a key into an empty bucket?',
        options: [
          'synchronized (this)',
          'ReentrantLock',
          'Lock-free Compare-And-Swap (casTabAt)',
          'ReadWriteLock'
        ],
        correctIndex: 2,
        explanation: 'For empty buckets, ConcurrentHashMap uses lock-free CAS (`casTabAt`) to insert the head node without acquiring any mutex lock.'
      },
      {
        question: 'When a bucket already contains colliding elements, what does Java 8 ConcurrentHashMap lock during a put operation?',
        options: [
          'The entire map instance',
          'The Segment containing the bucket',
          'Strictly the first node (head) of that specific bucket: synchronized (f)',
          'The CPU thread scheduler'
        ],
        correctIndex: 2,
        explanation: 'ConcurrentHashMap synchronizes strictly on the bucket head node (`synchronized (f)`), allowing concurrent writes to other buckets.'
      },
      {
        question: 'Why does `ConcurrentHashMap.get(key)` never acquire any lock?',
        options: [
          'Because Node.val and Node.next are declared volatile, providing immediate memory visibility across CPU cores',
          'Because get() runs on background daemon threads',
          'Because get() makes a deep copy of the table',
          'Because Java locks memory buses for all reads'
        ],
        correctIndex: 0,
        explanation: 'Volatile variables establish a happens-before memory barrier, guaranteeing reading threads observe the latest written values without locks.'
      },
      {
        question: 'What happens if you attempt to store a null key or null value in a ConcurrentHashMap?',
        options: [
          'It is placed in bucket 0',
          'Throws NullPointerException immediately',
          'Returns false',
          'null is converted to empty string'
        ],
        correctIndex: 1,
        explanation: 'ConcurrentHashMap strictly forbids null keys and null values to prevent ambiguity between an absent key and a key mapped to null.'
      },
      {
        question: 'What is a ForwardingNode with hash = -1 (MOVED) in Java 8 ConcurrentHashMap?',
        options: [
          'A tombstone for deleted items',
          'A sentinel node placed in a bucket that has been transferred to nextTable during cooperative resizing',
          'A marker for corrupt buckets',
          'A pointer to an external database'
        ],
        correctIndex: 1,
        explanation: 'ForwardingNodes indicate that a bucket has been transferred to `nextTable`, prompting other threads to help transfer remaining buckets.'
      },
      {
        question: 'How do iterators in ConcurrentHashMap behave when the map is concurrently modified?',
        options: [
          'They throw ConcurrentModificationException',
          'They are weakly consistent: they never throw CME and traverse safely via volatile pointers',
          'They deadlock',
          'They clone the entire table'
        ],
        correctIndex: 1,
        explanation: 'Iterators are weakly consistent, tolerating concurrent modifications without throwing `ConcurrentModificationException`.'
      },
      {
        question: 'Which method should you call to conditionally update a value in ConcurrentHashMap only if it matches an expected current value?',
        options: [
          'map.put(key, newVal)',
          'map.replace(key, expectedOldVal, newVal)',
          'map.set(key, newVal)',
          'map.update(key, newVal)'
        ],
        correctIndex: 1,
        explanation: '`replace(key, oldVal, newVal)` provides atomic compare-and-swap semantics on entry values.'
      },
      {
        question: 'How does Java 8 ConcurrentHashMap count size without acquiring locks across the entire table?',
        options: [
          'Using a striped CounterCell array (similar to LongAdder) to distribute counter updates and sum them',
          'Using an atomic integer on every bucket',
          'Counting nodes during an O(N) scan',
          'Locking every bucket sequentially'
        ],
        correctIndex: 0,
        explanation: 'It uses `CounterCell` striping to prevent thread contention, summing baseCount and cell values on demand.'
      },
      {
        question: 'Which method returns the total number of mappings in a ConcurrentHashMap as a 64-bit long?',
        options: [
          'size()',
          'mappingCount()',
          'totalSize()',
          'length()'
        ],
        correctIndex: 1,
        explanation: '`mappingCount()` returns a `long`, allowing high-capacity maps to report counts exceeding `Integer.MAX_VALUE`.'
      },
      {
        question: 'If a thread attempts to read from a treeified bucket while another thread is rebalancing the Red-Black tree, what happens?',
        options: [
          'The reading thread blocks until rebalancing completes',
          'The reading thread falls back to linear traversal using the nodes doubly-linked next pointers without blocking',
          'Throws ConcurrentModificationException',
          'Returns null'
        ],
        correctIndex: 1,
        explanation: 'TreeBin falls back to traversing `next` list pointers if a writer is actively rebalancing the tree, keeping reads 100% lock-free.'
      }
    ]
  }
};
