import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 19: HASHING & HASHMAP INTERNALS (LESSONS 19.1 & 19.2)
// Authoritative FAANG-Standard Hashing Core Curriculum
// ============================================================

export const col19_1_2_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 19.1: HashMap Architecture & Hash Spreading
  // ─────────────────────────────────────────────────────────────
  'hashmap-internal-architecture': {
    id: 'hashmap-internal-architecture',
    moduleId: 'java-hashing',
    moduleTitle: '19. Hashing & HashMap Internals',
    lessonNumber: 'Lesson 19.1',
    title: 'HashMap Architecture: Buckets, Node<K,V>, and Hash Spreading',
    subtitle: 'Node<K,V>[] table, hash perturbation function, power-of-two bitwise indexing, lazy table allocation, and putVal execution flow',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine a gigantic post office sorting room with 16 sorting mailboxes numbered 0 through 15. Every letter has a unique address (`Key`). If you only used the street number to decide the mailbox, almost all letters would end up dumped into mailbox #1 or #2! To prevent this, the postmaster puts the address through a magical blender (`hash(key)`): he chops the upper 16 digits of the postal code and mixes them thoroughly with the lower 16 digits (`(h = key.hashCode()) ^ (h >>> 16)`). Then, to pick the final box in a split second without doing slow division, he applies a cookie cutter mask (`(16 - 1) & hash`). The letter drops straight into its perfectly distributed mailbox in $O(1)$ time!',
    interviewTakeaways: [
      'Backing Array & Lazy Allocation: In Java 8, `HashMap` is backed by `transient Node<K,V>[] table`. The table array is NOT allocated when you call `new HashMap<>()`; it is lazily allocated upon the very first `put()` invocation with default capacity 16.',
      'Hash Perturbation Function: Java 8 applies a bitwise spreading function: `static final int hash(Object key) { int h; return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16); }`. By XORing the upper 16 bits into the lower 16 bits, entropy from the high-order bits influences bucket placement in small tables.',
      'Power-of-Two Indexing: Table capacity is ALWAYS a power of two ($2^n$). This allows calculating the bucket index with ultra-fast bitwise AND: `index = (table.length - 1) & hash`. This is mathematically equivalent to `hash % table.length` for powers of two, but executes in a single CPU clock cycle.',
      'Node Structure: Each basic table slot contains a `static class Node<K,V> implements Map.Entry<K,V>` with four fields: `final int hash`, `final K key`, `V value`, and `Node<K,V> next`.',
      'Null Key Handling: `HashMap` allows exactly one `null` key. Its hash is hardcoded to 0 (`key == null ? 0 : ...`), so it is always placed in bucket 0 (`table[0]`).',
      'The putVal Execution Flow: 1) If table is null or empty, resize() to allocate. 2) If bucket slot `(n - 1) & hash` is null, create a new Node. 3) If collision occurs, match key equality `(p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))`. 4) If match found, update value; otherwise chain as a linked list or TreeNode.'
    ],
    cheatSheet: {
      summary: 'HashMap uses an array of buckets (Node<K,V>[]). Spreads hashCode bits via XOR shift (>>> 16) and indexes via (n - 1) & hash. Lazy allocation deferment saves RAM until first put.',
      syntaxTemplate: `// Standard HashMap instantiation with pre-sizing
Map<String, User> cache = new HashMap<>(expectedCapacity);

// Internal Java 8 hash spreading function
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

// Internal bucket index calculation
int index = (table.length - 1) & hash;`,
      rules: [
        { rule: 'Power of Two Invariant', explanation: 'Table capacity must be a power of 2 so that (n - 1) is a bitmask of all 1s (e.g. 16 - 1 = 15 = 0b00001111).' },
        { rule: 'Hash Perturbation', explanation: 'Without (h >>> 16), tables of length 16 only inspect the lowest 4 bits of hashCode(), ignoring 28 bits of high-order entropy.' },
        { rule: 'Null Key Guarantee', explanation: 'A null key always produces hash 0 and resides at bucket 0, but multiple null values can exist at any key.' },
        { rule: 'Key Immutability Rule', explanation: 'Keys must have immutable fields for equals/hashCode; mutating a key makes it unreachable in its bucket.' },
        { rule: 'putVal Old Value Return', explanation: 'put(key, value) returns the previous value associated with key, or null if there was no prior mapping.' }
      ],
      quickComparison: [
        { aspect: 'Bucket Indexing', optionA: 'Power-of-Two Mask: (n - 1) & hash (1 CPU cycle)', optionB: 'Modulo Operator: hash % n (15-40 CPU cycles)' },
        { aspect: 'Null Key Support', optionA: 'HashMap: Allowed (placed in bucket 0)', optionB: 'Hashtable / TreeMap: Rejects null key (NPE)' },
        { aspect: 'Table Allocation', optionA: 'Java 7: Eager allocation during constructor', optionB: 'Java 8: Lazy allocation during first putVal()' },
        { aspect: 'Hash Perturbation', optionA: 'Java 7: 4 bitwise shifts and XORs', optionB: 'Java 8: Single (h >>> 16) XOR (faster, sufficient)' }
      ]
    },
    coreExplanation: [
      '`HashMap` is an associative array mapping keys to values using hash buckets. In Java 8, it represents one of the most heavily tuned data structures in computer science.',
      'The internal storage is an array `Node<K,V>[] table`. Each `Node` contains `hash` (cached 32-bit hash), `key` (reference), `value` (reference), and `next` (pointer to next node in collision chain).',
      'The Hash Perturbation Function: A basic `hashCode()` returns an arbitrary 32-bit `int` between $-2^{31}$ and $2^{31}-1$. However, a newly created HashMap only has 16 buckets. If you index via `(16 - 1) & hash`, only the lowest 4 bits are evaluated, ignoring bits 4 through 31. If different keys produce hash codes differing only in their high bits (e.g. `0x00010005` and `0x00020005`), they would all collide in bucket 5! Java 8 resolves this with: `(h = key.hashCode()) ^ (h >>> 16)`. By shifting the top 16 bits down and XORing them, variation from higher bits cascades into the lower bits, dramatically reducing collisions.',
      'Power-of-Two Capacity: Why does HashMap insist on capacities like 16, 32, 64, 128? Because when $N = 2^k$, $N - 1$ is represented in binary as all 1s (e.g., $16 - 1 = 15 = 0b1111$). Performing bitwise AND with `(N - 1)` acts as a mask, preserving only the lower $k$ bits. Bitwise AND runs in a single CPU cycle, whereas the mathematical modulo operator (`%`) requires hardware integer division taking 15 to 40 CPU clock cycles.',
      'Lazy Allocation: When `new HashMap<>()` is instantiated, `table` remains `null`. The first call to `put()` detects `table == null` and invokes `resize()` to allocate the initial 16-element array. This saves significant heap space when microservices create thousands of idle maps.',
      'Handling Key Equality: When querying a bucket, HashMap uses a multi-tiered identity and equality check: `if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))`. It compares precomputed hash integers first (extremely fast), then tests reference equality `p.key == key` (instant memory identity), and only calls `equals()` if references differ. This makes lookups blistering fast.'
    ],
    diagram: `JAVA 8 HASHMAP INTERNAL ARCHITECTURE & HASH SPREADING
========================================================================

Step 1: Key Hash Code Generation & Spreading Function
   key.hashCode()        = 01101011 00110001 11010101 00000101  (32-bit h)
   h >>> 16              = 00000000 00000000 01101011 00110001  (high 16 bits shifted)
   XOR (h ^ (h >>> 16))  = 01101011 00110001 10111110 00110100  (Spread Hash)

Step 2: Power-of-Two Indexing
   Spread Hash           = ... 10111110 00110100
   & (Table Length - 1)  = ... 00000000 00001111  (Length 16 - 1 = 15)
   -------------------------------------------------
   Bucket Index          =                  0100  = Bucket 4!

Step 3: Table Array Memory Representation
   Node<K,V>[] table:
   [0] -> Node(Key: null, Val: "Root", next: null)
   [1] -> null
   [2] -> null
   [3] -> null
   [4] -> Node(hash, Key: "interview", Val: 42, next: null)
   [5] -> Node(hash, Key: "alpha", Val: 10, next: ──> Node(hash, Key: "beta", Val: 20))
   ...
   [15]-> null`,
    codeSnippet: {
      title: 'HashMap Internal Spreading and Indexing Simulation',
      code: `import java.util.*;

public class HashMapArchitecture {
    static int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }

    static int indexFor(int hash, int length) {
        return (length - 1) & hash;
    }

    public static void main(String[] args) {
        String key1 = "Java";
        String key2 = "Kotlin";
        int capacity = 16;

        int h1 = hash(key1);
        int idx1 = indexFor(h1, capacity);

        int h2 = hash(key2);
        int idx2 = indexFor(h2, capacity);

        System.out.println("Key: " + key1 + " -> Hash: " + h1 + " -> Bucket: " + idx1);
        System.out.println("Key: " + key2 + " -> Hash: " + h2 + " -> Bucket: " + idx2);
        System.out.println("Null key bucket: " + indexFor(hash(null), capacity));
    }
}`,
      lineByLineExplanation: [
        { line: 'static int hash(Object key) { ... }', explanation: 'Reproduces Java 8 HashMap spreading function: XORs top 16 bits into bottom 16 bits.' },
        { line: 'return (length - 1) & hash;', explanation: 'Computes bucket index using bitwise AND mask, equivalent to hash % length for power of two.' },
        { line: 'int h1 = hash(key1);', explanation: 'Evaluates spread hash for "Java".' },
        { line: 'int idx1 = indexFor(h1, capacity);', explanation: 'Locates target bucket in a 16-element table.' },
        { line: 'hash(null)', explanation: 'Evaluates null key, which yields hash 0 and places null key at index 0.' }
      ],
      output: `Key: Java -> Hash: 2301607 -> Bucket: 7
Key: Kotlin -> Hash: -2043806354 -> Bucket: 14
Null key bucket: 0`
    },
    codeExamples: [
      {
        title: 'Multi-Tiered Key Equality Check in HashMap.get()',
        description: 'Demonstrating how HashMap checks hash equality, reference equality, and equals().',
        code: `import java.util.*;

public class KeyEqualityDemo {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        String k1 = new String("TOKEN");
        String k2 = new String("TOKEN"); // Separate heap instance!

        map.put(k1, "Authenticated");

        // Lookup with k2:
        // 1. k1.hash == k2.hash (Matches!)
        // 2. k1 == k2 (False - different heap pointers)
        // 3. k1.equals(k2) (True - characters match!)
        System.out.println("Lookup via k2: " + map.get(k2));
        System.out.println("Are references identical? " + (k1 == k2));
    }
}`,
        output: `Lookup via k2: Authenticated
Are references identical? false`
      },
      {
        title: 'Modern Java 8 Map Methods: computeIfAbsent, merge, getOrDefault',
        description: 'Demonstrating clean map manipulation without null pointer risks.',
        code: `import java.util.*;

public class ModernMapMethods {
    public static void main(String[] args) {
        Map<String, List<String>> userRoles = new HashMap<>();

        // computeIfAbsent initializes nested list lazily
        userRoles.computeIfAbsent("Alice", k -> new ArrayList<>()).add("ADMIN");
        userRoles.computeIfAbsent("Alice", k -> new ArrayList<>()).add("EDITOR");

        // merge accumulates values
        Map<String, Integer> scoreMap = new HashMap<>();
        scoreMap.merge("Bob", 50, Integer::sum);
        scoreMap.merge("Bob", 25, Integer::sum);

        System.out.println("Alice roles: " + userRoles.get("Alice"));
        System.out.println("Bob total score: " + scoreMap.get("Bob"));
        System.out.println("Charlie score: " + scoreMap.getOrDefault("Charlie", 0));
    }
}`,
        output: `Alice roles: [ADMIN, EDITOR]
Bob total score: 75
Charlie score: 0`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using a mutable object as a HashMap key',
        whyItHappens: 'If fields that contribute to `hashCode()` change after putting the entry, the key`s hash changes. Later calls to `map.get(key)` search the newly hashed bucket, find nothing, and return `null`, creating a memory leak.',
        howToFix: 'Use immutable classes like `String`, `Integer`, or Java 14+ `record` types as keys. If custom classes are used, declare all fields `final`.'
      },
      {
        mistake: 'Overriding equals() but forgetting to override hashCode()',
        whyItHappens: 'Two separate object instances with identical fields will return different identity hash codes from `Object.hashCode()`, landing in different buckets. `get()` will fail to find what `put()` stored.',
        howToFix: 'Always override `hashCode()` whenever you override `equals()`. Base both methods on the exact same fields.'
      },
      {
        mistake: 'Assuming table allocation happens inside new HashMap<>()',
        whyItHappens: 'Developers assume passing `new HashMap<>(1000)` immediately allocates memory. In reality, table allocation is lazily deferred to the first `putVal()` call.',
        howToFix: 'Understand lazy initialization: creating empty maps is cheap in Java 8+, but pre-sizing is still critical for bulk insertions.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Calculating Bucket Index via Bitwise Mask',
        problemStatement: 'Given a spread hash of 37 and a table capacity of 16, what bucket index does the key land in?',
        code: `// int hash = 37;
// int capacity = 16;
// int index = (capacity - 1) & hash;`,
        options: [
          'A) 5',
          'B) 7',
          'C) 1',
          'D) 9'
        ],
        correctOptionIndex: 0,
        hint: 'Calculate: 37 in binary is 0b00100101. 15 in binary is 0b00001111. 37 & 15 = ?',
        solution: 'Option A is correct: 5',
        explanation: '16 - 1 = 15 (`0b1111`). `37 & 15` extracts the lower 4 bits of 37 (`37 = 32 + 5`). The result is 5.'
      },
      {
        title: 'Puzzle 2: Return Value of Map.put() on Existing Key',
        problemStatement: 'What does this program print?',
        code: `import java.util.HashMap;

public class Puzzle2 {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        System.out.print(map.put("A", 100) + " ");
        System.out.print(map.put("A", 200) + " ");
        System.out.print(map.put("A", 300));
    }
}`,
        options: [
          'A) 100 200 300',
          'B) null 100 200',
          'C) true true true',
          'D) null null null'
        ],
        correctOptionIndex: 1,
        hint: 'put(k, v) returns the OLD value associated with key, or null if key was absent.',
        solution: 'Option B is correct: null 100 200',
        explanation: 'The first `put("A", 100)` finds no prior key, returning `null`. The second `put("A", 200)` replaces 100, returning the old value `100`. The third replaces 200, returning `200`.'
      },
      {
        title: 'Puzzle 3: Custom Key Missing equals() Method',
        problemStatement: 'What does this code output?',
        code: `import java.util.*;

class UserKey {
    int id;
    UserKey(int id) { this.id = id; }
    @Override public int hashCode() { return id; }
    // Note: equals() is NOT overridden!
}

public class Puzzle3 {
    public static void main(String[] args) {
        Map<UserKey, String> map = new HashMap<>();
        map.put(new UserKey(1), "Alice");
        System.out.println(map.get(new UserKey(1)));
    }
}`,
        options: [
          'A) Alice',
          'B) null',
          'C) Throws NullPointerException',
          'D) Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Without equals overridden, Object.equals uses reference equality (==).',
        solution: 'Option B is correct: null',
        explanation: 'Even though both keys return `hashCode() = 1` and land in the same bucket, `equals()` defaults to `Object.equals` which checks `this == other`. Since they are two distinct instances in heap memory, `equals()` returns `false`, resulting in `null`.'
      },
      {
        title: 'Puzzle 4: Null Key Location in HashMap',
        problemStatement: 'Where is a null key stored inside a HashMap?',
        code: `import java.util.HashMap;

public class Puzzle4 {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();
        map.put(null, "Genesis");
        System.out.println(map.get(null));
    }
}`,
        options: [
          'A) It is placed in a separate dedicated reference field outside the table',
          'B) It is placed in table bucket index 0 because hash(null) is hardcoded to 0',
          'C) It is placed at the last bucket index (capacity - 1)',
          'D) Null keys throw NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'Check HashMap.hash(Object key): key == null ? 0 : ...',
        solution: 'Option B is correct: It is placed in table bucket index 0 because hash(null) is hardcoded to 0',
        explanation: 'In `HashMap.hash(key)`, if `key == null`, it returns 0. `(n - 1) & 0` is always 0, placing null keys consistently in bucket `table[0]`.'
      },
      {
        title: 'Puzzle 5: Mutating a Key inside a HashMap',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

class BadKey {
    int code;
    BadKey(int c) { this.code = c; }
    @Override public int hashCode() { return code; }
    @Override public boolean equals(Object o) {
        return (o instanceof BadKey) && this.code == ((BadKey) o).code;
    }
}

public class Puzzle5 {
    public static void main(String[] args) {
        Map<BadKey, String> map = new HashMap<>();
        BadKey k = new BadKey(10);
        map.put(k, "ValueX");
        k.code = 20; // Mutate code after insertion!
        System.out.println(map.get(k) + ":" + map.containsKey(k));
    }
}`,
        options: [
          'A) ValueX:true',
          'B) null:false',
          'C) ValueX:false',
          'D) Throws ConcurrentModificationException'
        ],
        correctOptionIndex: 1,
        hint: 'Which bucket is checked when k.code is now 20?',
        solution: 'Option B is correct: null:false',
        explanation: 'When inserted, `k` was placed in bucket (10 & 15) = 10. After mutating `k.code = 20`, `get(k)` looks in bucket (20 & 15) = 4! Bucket 4 is empty, so it returns `null` and `containsKey` returns `false`.'
      },
      {
        title: 'Puzzle 6: Map.putIfAbsent vs Map.put',
        problemStatement: 'What is the value in map for "key" after this code executes?',
        code: `import java.util.HashMap;

public class Puzzle6 {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();
        map.put("key", "initial");
        map.putIfAbsent("key", "newVal");
        map.putIfAbsent("key", null);
        System.out.println(map.get("key"));
    }
}`,
        options: [
          'A) newVal',
          'B) initial',
          'C) null',
          'D) Throws IllegalArgumentException'
        ],
        correctOptionIndex: 1,
        hint: 'putIfAbsent only sets the value if key is not present or is currently mapped to null.',
        solution: 'Option B is correct: initial',
        explanation: '`putIfAbsent` checks if the key is absent or mapped to `null`. Since "key" is already mapped to "initial", subsequent `putIfAbsent` calls do nothing, retaining "initial".'
      },
      {
        title: 'Puzzle 7: Why capacity is rounded up to next power of 2',
        problemStatement: 'If you instantiate `new HashMap<>(10)`, what is the actual initial capacity allocated upon the first put?',
        code: `// HashMap<String, String> map = new HashMap<>(10);
// What is the table array length after map.put("a", "b")?`,
        options: [
          'A) 10',
          'B) 12',
          'C) 16',
          'D) 32'
        ],
        correctOptionIndex: 2,
        hint: 'HashMap rounds capacity up using tableSizeFor.',
        solution: 'Option C is correct: 16',
        explanation: '`tableSizeFor(10)` calculates the least power of two greater than or equal to 10, which is 16 (`2^4`). The table array is allocated with length 16.'
      },
      {
        title: 'Puzzle 8: Map.getOrDefault with Null Value',
        problemStatement: 'What does this program print?',
        code: `import java.util.HashMap;

public class Puzzle8 {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();
        map.put("fruit", null);
        System.out.println(map.getOrDefault("fruit", "DefaultApple"));
    }
}`,
        options: [
          'A) DefaultApple',
          'B) null',
          'C) fruit',
          'D) Throws NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'getOrDefault only returns the default value if containsKey(key) is false!',
        solution: 'Option B is correct: null',
        explanation: '`getOrDefault(k, defaultValue)` checks if `containsKey(k)`: since "fruit" IS present in the map (mapped to null), it returns the actual mapped value, which is `null`! It does NOT substitute defaultValue for mapped nulls.'
      },
      {
        title: 'Puzzle 9: HashMap EntrySet Removal Side Effect',
        problemStatement: 'What happens to the map when removing an entry from its entrySet?',
        code: `import java.util.*;

public class Puzzle9 {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.entrySet().removeIf(entry -> entry.getKey().equals("A"));
        System.out.println(map);
    }
}`,
        options: [
          'A) {A=1, B=2}',
          'B) {B=2}',
          'C) Throws UnsupportedOperationException',
          'D) Throws ConcurrentModificationException'
        ],
        correctOptionIndex: 1,
        hint: 'The entrySet collection view is backed directly by the map.',
        solution: 'Option B is correct: {B=2}',
        explanation: '`map.entrySet()`, `map.keySet()`, and `map.values()` return views backed directly by the HashMap. Mutating these views via `remove()` or `removeIf()` directly removes the corresponding entry from the underlying hash table.'
      },
      {
        title: 'Puzzle 10: HashMap Memory Leak via Static Cache',
        problemStatement: 'Why does storing objects in a static HashMap without eviction cause an OutOfMemoryError in long-running services?',
        code: `// public static final Map<String, byte[]> CACHE = new HashMap<>();
// CACHE.put(sessionId, largePayload);`,
        options: [
          'A) Hash codes overflow to negative numbers',
          'B) Objects in table buckets remain strongly reachable through GC root, preventing garbage collection',
          'C) Buckets treeify into infinite loops',
          'D) HashMap does not support more than 65536 entries'
        ],
        correctOptionIndex: 1,
        hint: 'Static references are GC roots that never get collected.',
        solution: 'Option B is correct: Objects in table buckets remain strongly reachable through GC root, preventing garbage collection',
        explanation: 'A `static` field is a GC root and lives for the entire JVM lifetime. Entries placed into the map remain strongly referenced, preventing GC from reclaiming either the keys or values, resulting in heap exhaustion.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the internal working of HashMap in Java 8. What happens step-by-step when map.put(key, value) is called?',
        answer: 'When `map.put(key, value)` is called: 1) It computes the spread hash: `hash = (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)`. 2) If `table` is null or empty, it calls `resize()` to initialize it to capacity 16. 3) It computes the bucket index: `i = (n - 1) & hash`. 4) If `table[i]` is null, it creates a new `Node<K,V>(hash, key, value, null)` and stores it there. 5) If a collision exists: if the first node has matching hash and key equality (`p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k)))`), it updates the value. If the node is a `TreeNode`, it calls `putTreeVal()`. If it is a linked list, it traverses to the end, appending the new node. If bin count reaches 8 (`TREEIFY_THRESHOLD`) and capacity >= 64, it treeifies the bin. 6) If size exceeds `threshold` (capacity * 0.75), it calls `resize()` to double capacity.',
        followUp: 'Why does HashMap precompute and store `hash` inside each Node?',
        followUpAnswer: 'Storing `final int hash` inside each Node is a performance optimization: comparing two 32-bit integers (`p.hash == hash`) in CPU registers takes 1 cycle, allowing HashMap to instantly bypass expensive `equals()` calls for any nodes in the same bucket that have different hash codes.',
        keyPhrases: [
          'Spread hash: (h ^ (h >>> 16))',
          'Bucket index: (n - 1) & hash',
          'Lazy table allocation via resize()',
          'Match on hash equality, then reference ==, then equals()',
          'Append to list or TreeNode'
        ],
        commonMistakeAnswer: 'Skipping the hash spreading function or claiming table is allocated during new HashMap<>().'
      },
      {
        question: 'Why does Java 8 HashMap use `(h = key.hashCode()) ^ (h >>> 16)` instead of using key.hashCode() directly?',
        answer: 'A standard HashMap starts with 16 buckets. To find the index, it computes `(16 - 1) & hash`, which only inspects the lowest 4 bits (bits 0-3), ignoring the upper 28 bits of `hashCode()`. If multiple keys have different hash codes that happen to end in the same 4 bits (e.g. sequences of floats or memory addresses), they will all collide into the exact same bucket! By shifting `h >>> 16` and XORing it with `h`, the variation from the high 16 bits is mixed directly into the low 16 bits. This ensures that high-order entropy influences bucket indexing even for small table capacities.',
        followUp: 'Why was XOR chosen rather than AND or OR for the spreading function?',
        followUpAnswer: 'XOR preserves an equal 50/50 statistical distribution of 0s and 1s: `0 ^ 0 = 0`, `0 ^ 1 = 1`, `1 ^ 0 = 1`, `1 ^ 1 = 0`. In contrast, AND is biased towards 0 (75% zeros) and OR is biased towards 1 (75% ones), which would severely skew hash distribution.',
        keyPhrases: [
          'Small tables only evaluate lowest bits',
          'High 16 bits are mixed into low 16 bits',
          'XOR preserves balanced bit probability',
          'Reduces collisions with negligible CPU cost'
        ],
        commonMistakeAnswer: 'Thinking (h >>> 16) produces a 16-bit hash instead of understanding it mixes bits.'
      },
      {
        question: 'Why MUST table capacity in HashMap always be a power of two ($2^n$)?',
        answer: 'There are two critical architectural reasons: 1) Fast Index Calculation: For any number $N = 2^n$, $N - 1$ in binary consists of all 1s (e.g., $16 - 1 = 15 = 0b1111$). Bitwise AND `(N - 1) & hash` mathematically equals `hash % N` for all positive integers. Bitwise AND executes in 1 CPU cycle, whereas modulo division (`%`) takes 15-40 CPU cycles. 2) Rehash Optimization: When doubling capacity during a resize ($N \\to 2N$), elements only ever stay at their old index or move to `oldIndex + oldCapacity`, determined by a single bit test `(hash & oldCapacity) == 0`.',
        followUp: 'What happens if a developer specifies an initial capacity that is not a power of two, like new HashMap<>(10)?',
        followUpAnswer: 'HashMap internally passes the argument through `tableSizeFor(int cap)`. This bit-manipulation method rounds the number up to the nearest power of two (10 becomes 16, 25 becomes 32), guaranteeing the power-of-two invariant is never broken.',
        keyPhrases: [
          '(N - 1) bitmask equivalent to modulo',
          'Bitwise AND is orders of magnitude faster than division',
          'Rehash bit-test optimization: oldIndex + oldCap',
          'tableSizeFor rounds up automatically'
        ],
        commonMistakeAnswer: 'Asserting that capacity can be arbitrary or that HashMap uses modulo (%) arithmetic.'
      },
      {
        question: 'Explain the role of equals() and hashCode() contract in HashMap. What happens if you violate it?',
        answer: 'The contract dictates: If two objects are equal according to `equals(Object)`, their `hashCode()` MUST return the identical integer value. If you override `equals()` but fail to override `hashCode()`, two logically equivalent objects will inherit identity hash codes from `Object` based on heap memory addresses. When you `put(k1, v)`, it hashes to bucket A. When you `get(k2)` with an equivalent object, it hashes to bucket B! The lookup returns `null`, losing the entry. Even if they accidentally land in the same bucket, `p.hash == hash` will evaluate to false, skipping `equals()`.',
        followUp: 'What happens if two unequal objects produce the same hashCode()?',
        followUpAnswer: 'This is a hash collision. It is completely legal and expected because 32-bit integers are finite. HashMap places both nodes in the same bucket chain and uses equals() to differentiate between them.',
        keyPhrases: [
          'Equal objects must produce equal hashCodes',
          'Unequal hashCodes route equal objects to different buckets',
          'get() returns null for existing keys',
          'Hash collision is handled via equals() chaining'
        ],
        commonMistakeAnswer: 'Believing that unequal objects having the same hashCode causes a compilation error or exception.'
      },
      {
        question: 'Why should you avoid using mutable objects as keys in a HashMap?',
        answer: 'When an entry is added to a HashMap, its bucket index is computed from its current `hashCode()`. If a key object is mutable and you change any field that contributes to its `hashCode()`, its hash code changes. However, the `Node` remains parked in the old bucket! When you subsequently call `map.get(key)` or `map.containsKey(key)`, HashMap recomputes the hash using the new state, calculates the new bucket index, and searches the wrong bucket, returning `null`. The entry becomes unreachable and orphaned, causing a memory leak.',
        followUp: 'What are the best types to use as HashMap keys in Java?',
        followUpAnswer: 'Immutable types like `java.lang.String`, `java.lang.Integer`, `UUID`, or Java 14+ `record` types whose fields are final and whose hash codes are cached or deterministic.',
        keyPhrases: [
          'Mutating key changes hashCode',
          'Queries search the wrong bucket',
          'Entry becomes orphaned and unreachable',
          'Use immutable types: String, records, Integer'
        ],
        commonMistakeAnswer: 'Thinking HashMap automatically moves nodes to new buckets when key fields change.'
      },
      {
        question: 'What is the time complexity of HashMap get() and put() in the best, average, and worst cases?',
        answer: 'In the best and average cases, `get()` and `put()` run in O(1) constant time, assuming a well-distributed hash function with few collisions. In the worst case in Java 7 (where all N keys collide into a single bucket), operations degraded to O(N) due to singly-linked list traversal. In Java 8, when a bucket exceeds 8 items and capacity >= 64, it treeifies into a Red-Black tree, improving the worst-case time complexity to guaranteed O(log N).',
        followUp: 'Can HashMap worst-case ever be exploited maliciously (Hash DoS attack)?',
        followUpAnswer: 'Yes, an attacker can craft thousands of POST parameters with colliding hash codes to force a Java 7 server`s CPU to 100% processing O(N^2) chain lookups. Java 8`s Red-Black treeification (O(log N)) was specifically introduced to defeat Hash DoS attacks.',
        keyPhrases: [
          'Average case: O(1)',
          'Java 7 worst case: O(N) linked list',
          'Java 8 worst case: O(log N) Red-Black tree',
          'Treeification mitigates Hash DoS attacks'
        ],
        commonMistakeAnswer: 'Saying worst-case in Java 8 is still O(N).'
      },
      {
        question: 'How does HashMap handle null keys versus null values?',
        answer: 'HashMap permits exactly one `null` key and unlimited `null` values. When a `null` key is passed, `hash(null)` explicitly returns 0 without calling `null.hashCode()`. Because `(n - 1) & 0 = 0`, the null key is always stored in bucket `table[0]`. In contrast, null values can be associated with any key. To verify if a key exists with a null value, you must use `map.containsKey(key)` because `map.get(key)` returns `null` both when the key is absent and when it is mapped to `null`.',
        followUp: 'Which Map implementations in java.util forbid null keys?',
        followUpAnswer: '`TreeMap` (needs compareTo), `Hashtable` (calls key.hashCode() directly), and `ConcurrentHashMap` (rejects null keys and values to prevent concurrency ambiguity).',
        keyPhrases: [
          'One null key allowed at bucket 0',
          'Unlimited null values allowed',
          'containsKey() resolves get() == null ambiguity',
          'ConcurrentHashMap and TreeMap forbid null keys'
        ],
        commonMistakeAnswer: 'Confusing HashMap with Hashtable and asserting that null keys are forbidden.'
      },
      {
        question: 'What is lazy initialization in Java 8 HashMap, and why was it introduced?',
        answer: 'In Java 7, invoking `new HashMap<>()` immediately allocated a `Node[]` array of length 16 on the heap. In large enterprise applications and frameworks like Spring, thousands of maps are created that remain empty or hold only 1-2 items, wasting hundreds of megabytes of memory. In Java 8, `new HashMap<>()` leaves `table = null`. The actual table array is lazily allocated upon the first invocation of `putVal()` via `resize()`. This significantly reduces heap footprint and improves garbage collection efficiency.',
        followUp: 'How does lazy initialization affect the threshold calculation?',
        followUpAnswer: 'When constructed, threshold stores the initial capacity (e.g. 16). Upon the first putVal(), resize() reads the initial capacity from threshold, allocates the table, and recalculates threshold as `capacity * loadFactor` (12).',
        keyPhrases: [
          'table remains null until first put()',
          'Saves memory for empty/idle maps',
          'resize() performs lazy allocation',
          'Threshold temporarily holds capacity'
        ],
        commonMistakeAnswer: 'Believing new HashMap<>() immediately allocates a 16-slot array.'
      },
      {
        question: 'What is the purpose of the Map.Entry interface in Java, and why is iterating entrySet() preferred over keySet()?',
        answer: '`Map.Entry<K, V>` represents a key-value pair mapping within a map. When you need both the key and the value, iterating over `map.entrySet()` is optimal ($O(N)$) because each `Entry` node already holds direct references to both `key` and `value`. If you iterate over `map.keySet()` and call `map.get(key)` in every iteration, each lookup requires hashing the key, computing the bucket index, and traversing the collision chain, resulting in $2 \\times$ slower performance and wasted CPU cycles.',
        followUp: 'Can you mutate the value of a map through Map.Entry?',
        followUpAnswer: 'Yes, `entry.setValue(newVal)` writes through to the underlying Node in the HashMap, updating the value in-place.',
        keyPhrases: [
          'Map.Entry holds direct key and value references',
          'entrySet() iteration is single O(N) pass',
          'keySet() with get() repeats hashing and lookup',
          'entry.setValue() writes through to map'
        ],
        commonMistakeAnswer: 'Using for (K key : map.keySet()) { V val = map.get(key); } in performance-critical code.'
      },
      {
        question: 'Explain the difference between HashMap, Hashtable, and LinkedHashMap.',
        answer: '`HashMap` is unsynchronized, allows one null key and multiple null values, offers O(1) operations, and does not guarantee iteration order. `Hashtable` is a legacy Java 1.0 synchronized class where every method is locked with monitor locks, forbids null keys and null values, and is obsolete. `LinkedHashMap` extends `HashMap`, maintaining a doubly-linked list through all its entries: it provides O(1) performance while guaranteeing predictable iteration order (either FIFO insertion order or LRU access order).',
        followUp: 'How can LinkedHashMap be used to build a Least Recently Used (LRU) Cache?',
        followUpAnswer: 'Construct `new LinkedHashMap<>(capacity, 0.75f, true)` passing `accessOrder = true`, and override `protected boolean removeEldestEntry(Map.Entry eldest) { return size() > maxCapacity; }`. When accessed, entries move to the tail, and the oldest entry at the head is evicted automatically on insert.',
        keyPhrases: [
          'HashMap: unsynchronized, permits nulls, arbitrary order',
          'Hashtable: legacy, synchronized methods, rejects nulls',
          'LinkedHashMap: preserves insertion or access order',
          'removeEldestEntry() for LRU cache implementation'
        ],
        commonMistakeAnswer: 'Thinking LinkedHashMap uses an internal LinkedList of nodes.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the default initial capacity of a Java HashMap?',
        options: [
          '8',
          '10',
          '16',
          '32'
        ],
        correctIndex: 2,
        explanation: 'In OpenJDK, `DEFAULT_INITIAL_CAPACITY = 1 << 4`, which equals 16.'
      },
      {
        question: 'What is the purpose of `(h = key.hashCode()) ^ (h >>> 16)` in Java 8 HashMap?',
        options: [
          'It converts negative hash codes to positive integers',
          'It mixes high-order bits into the low-order bits so high entropy affects bucket selection in small tables',
          'It encrypts the key for security',
          'It calculates the power-of-two capacity'
        ],
        correctIndex: 1,
        explanation: 'Bitwise spreading cascades upper 16-bit variation down into the lower 16 bits, preventing collisions when tables are small (e.g. 16 buckets).'
      },
      {
        question: 'Why does HashMap calculate bucket indices using `(n - 1) & hash` instead of `hash % n`?',
        options: [
          'Because bitwise AND executes in 1 CPU cycle, while integer modulo division takes 15-40 cycles',
          'Because modulo returns negative values in Java',
          'Because AND operations automatically prevent NullPointerExceptions',
          'Because Java compiler does not support modulo on integers'
        ],
        correctIndex: 0,
        explanation: 'When n is a power of 2, `(n - 1) & hash` is mathematically equivalent to `hash % n` but runs at hardware bit-mask speed.'
      },
      {
        question: 'When is the internal `Node<K,V>[] table` array actually allocated on the heap in Java 8?',
        options: [
          'Inside the new HashMap() constructor',
          'Lazily upon the first invocation of put() via resize()',
          'When the class is loaded by JVM class loader',
          'When size exceeds 12 elements'
        ],
        correctIndex: 1,
        explanation: 'Java 8 lazily allocates the table array upon the first call to `putVal()` to conserve heap memory for empty maps.'
      },
      {
        question: 'Where is a `null` key stored in a HashMap?',
        options: [
          'In a separate dedicated field',
          'In bucket table[0] because hash(null) is hardcoded to 0',
          'In bucket table[15]',
          'Null keys are forbidden and throw NullPointerException'
        ],
        correctIndex: 1,
        explanation: '`hash(null)` returns 0, so `(n - 1) & 0 = 0`, placing null keys in `table[0]`.'
      },
      {
        question: 'What does `map.put(key, value)` return if the key was already present in the map?',
        options: [
          'true',
          'The newly added value',
          'The previous value associated with the key',
          'null'
        ],
        correctIndex: 2,
        explanation: '`put()` overwrites the mapping and returns the previous value that was replaced (or null if previously absent).'
      },
      {
        question: 'What is the time complexity of `map.get(key)` in Java 8 under the worst-case scenario of all keys colliding in one bucket?',
        options: [
          'O(1)',
          'O(log N) due to Red-Black treeification',
          'O(N) linked list scan',
          'O(N log N)'
        ],
        correctIndex: 1,
        explanation: 'When a bucket exceeds 8 colliding nodes and capacity >= 64, it treeifies into a Red-Black tree, bounding worst-case search to O(log N).'
      },
      {
        question: 'Why is iterating `map.entrySet()` faster than iterating `map.keySet()` and calling `map.get(key)`?',
        options: [
          'entrySet() uses parallel threads',
          'entrySet() entries already contain direct references to both key and value, avoiding redundant hashing and lookup',
          'keySet() makes a defensive deep copy of the map',
          'entrySet() bypasses memory barriers'
        ],
        correctIndex: 1,
        explanation: 'Each `Map.Entry` holds direct pointers to `key` and `value`. Calling `get(key)` repeats hashing and bucket traversal unnecessarily.'
      },
      {
        question: 'What happens if you mutate a field of an object used as a HashMap key that alters its hashCode()?',
        options: [
          'HashMap automatically recalculates the index and moves the node',
          'Future lookups check the new bucket and return null, making the entry unreachable',
          'ConcurrentModificationException is thrown',
          'The entry is deleted'
        ],
        correctIndex: 1,
        explanation: 'Mutating key fields changes its hash code. Future queries search the new bucket instead of the original one, failing to find the entry.'
      },
      {
        question: 'Which method on LinkedHashMap can be overridden to implement an automatic LRU eviction policy?',
        options: [
          'evictOldest()',
          'removeEldestEntry(Map.Entry eldest)',
          'trimToSize()',
          'pollFirstEntry()'
        ],
        correctIndex: 1,
        explanation: 'Overriding `removeEldestEntry()` to return `size() > maxCapacity` automatically evicts the least recently accessed entry on each new insertion.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 19.2: Hash Collisions & Red-Black Treeification
  // ─────────────────────────────────────────────────────────────
  'hash-collisions-and-treeification': {
    id: 'hash-collisions-and-treeification',
    moduleId: 'java-hashing',
    moduleTitle: '19. Hashing & HashMap Internals',
    lessonNumber: 'Lesson 19.2',
    title: 'Hash Collisions, Chaining & Red-Black Treeification',
    subtitle: 'Separate chaining, TREEIFY_THRESHOLD = 8, UNTREEIFY_THRESHOLD = 6, MIN_TREEIFY_CAPACITY = 64, TreeNode conversion, and Comparable tie-breaking',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine a coat check room where coats with the same ticket number are hung on a single peg (`Separate Chaining`). If only 2 or 3 coats share a peg, the clerk can flick through them in a couple of seconds ($O(1)$ linked list). But imagine a busload of pranksters arrives with identical tickets, hanging 100 coats on one peg! The clerk would waste minutes searching through that one peg. In Java 7, that was an $O(N)$ disaster! But in Java 8, the clerk has a magic rule: the moment more than 8 coats pile up on a peg (`TREEIFY_THRESHOLD = 8`), and the room has at least 64 pegs total (`MIN_TREEIFY_CAPACITY = 64`), the clerk instantly snaps that pile apart into an organized, branching Red-Black family tree! Searching drops from $O(N)$ to $O(\\log N)$. If coats are picked up and the pile shrinks to 6 (`UNTREEIFY_THRESHOLD = 6`), it morphs smoothly back into a simple coat rack to save memory!',
    interviewTakeaways: [
      'Collision Resolution Strategy: Java HashMap resolves hash collisions using Separate Chaining. In Java 7, this was strictly a singly-linked list. In Java 8+, it is hybrid: bins start as singly-linked lists and convert to balanced Red-Black trees (`TreeNode<K,V>`) when threshold conditions are met.',
      'Treeification Thresholds: A bucket bin converts from a linked list to a Red-Black tree when the number of colliding nodes reaches `TREEIFY_THRESHOLD = 8`, PROVIDED that total table capacity is at least `MIN_TREEIFY_CAPACITY = 64`. If capacity is less than 64, HashMap resizes the table instead of treeifying.',
      'Untreeify Threshold: When entries are removed or split during resizing, if a tree bin shrinks to `UNTREEIFY_THRESHOLD = 6` nodes, it converts back into a standard linked list. The gap of 2 (8 vs 6) provides hysteresis, preventing rapid oscillations between list and tree structures.',
      'Poisson Distribution Rationale: Why was 8 chosen? Under random hash codes, the probability of 8 items landing in the same bucket follows a Poisson distribution: $P(k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$. For $\\lambda = 0.5$ (default load factor 0.75), the probability of 8 collisions is less than 1 in 10 million ($0.00000006$). Reaching 8 almost certainly indicates a poor hash function or an adversarial Hash DoS attack!',
      'TreeNode Balancing: `TreeNode` extends `LinkedHashMap.Entry` which extends `HashMap.Node`. It adds `parent`, `left`, `right`, `prev`, and `boolean red`. It maintains a doubly-linked list concurrently with the tree structure to support fast untreeification.',
      'Comparable Tie-Breaking: When keys collide in a tree bin, `TreeNode` first checks if keys implement `Comparable<K>`. If so, it uses `compareTo()`. If not, or if `compareTo == 0` for unequal keys, it falls back to `tieBreakOrder()` using `System.identityHashCode(a) - System.identityHashCode(b)`.'
    ],
    cheatSheet: {
      summary: 'HashMap uses separate chaining. Converts linked list to Red-Black tree when bin >= 8 and capacity >= 64. Drops search from O(N) to O(log N), mitigating Hash DoS attacks.',
      syntaxTemplate: `// Treeification constants in java.util.HashMap
static final int TREEIFY_THRESHOLD = 8;
static final int UNTREEIFY_THRESHOLD = 6;
static final int MIN_TREEIFY_CAPACITY = 64;

// Treeification condition in putVal:
// if (binCount >= TREEIFY_THRESHOLD - 1) // -1 because 0-indexed
//     treeifyBin(tab, hash);`,
      rules: [
        { rule: 'Capacity Precondition for Treeify', explanation: 'If binCount reaches 8 but table.length < 64, HashMap calls resize() to double capacity instead of treeifying.' },
        { rule: 'Hysteresis Gap', explanation: 'Treeify is at 8, untreeify is at 6. The gap of 2 prevents thrashing between tree and list structures on repetitive add/remove.' },
        { rule: 'Comparable Recommendation', explanation: 'Keys likely to collide should implement Comparable<K> so tree bins can order nodes deterministically without identity fallback.' },
        { rule: 'TreeNode Memory Trade-off', explanation: 'A TreeNode is roughly double the memory size of a regular Node (left, right, parent, red), which is why trees are only used when needed.' },
        { rule: 'Dual Representation', explanation: 'TreeNodes maintain both a Red-Black tree and a doubly-linked list (prev/next) simultaneously for instant untreeification.' }
      ],
      quickComparison: [
        { aspect: 'Bucket Collision Structure', optionA: 'Java 7: Pure singly-linked list (O(N) worst case)', optionB: 'Java 8+: Linked list (< 8) or Red-Black tree (>= 8, cap >= 64)' },
        { aspect: 'Worst-Case Search Time', optionA: 'Java 7: $O(N)$ linear probe down the chain', optionB: 'Java 8+: $O(\\log N)$ balanced binary tree descent' },
        { aspect: 'Treeify Trigger', optionA: 'binCount >= 8 AND table.length >= 64', optionB: 'If table.length < 64: invokes resize() instead' },
        { aspect: 'Untreeify Trigger', optionA: 'binCount <= 6 during resize or node removal', optionB: 'Converts TreeNode back into standard Node<K,V>' }
      ]
    },
    coreExplanation: [
      'A hash collision occurs whenever two distinct keys produce hash codes that map to the identical bucket index: `index = (n - 1) & hash`. No hash function can prevent collisions entirely because the set of possible keys is infinitely larger than the table array size.',
      'Separate Chaining: HashMap resolves collisions by placing all colliding entries into a linked list at that bucket slot. When searching, it traverses the list, checking hash and calling `equals()`.',
      'The Hash DoS Vulnerability: In Java 7, if an attacker sends HTTP requests containing thousands of parameter keys specifically engineered to have identical hash codes (e.g. "Aa", "BB"), all keys land in a single bucket. A table with 10,000 items on one list turns every insertion into an $O(N)$ traversal, requiring $10,000^2 / 2 \\approx 50,000,000$ comparisons, pinning the server CPU to 100%.',
      'Java 8 Red-Black Treeification: To eliminate this catastrophic bottleneck, Java 8 introduced treeification. When an 8th collision occurs in a single bucket, HashMap checks `table.length`: if `table.length < 64` (`MIN_TREEIFY_CAPACITY`), it resizes the table because doubling capacity will likely redistribute the colliding keys across different buckets. If `table.length >= 64`, it transforms the bucket into a balanced Red-Black tree.',
      'The Mathematics of TREEIFY_THRESHOLD = 8: Under the assumption of random, uniform hash codes, bucket occupancy follows a Poisson distribution with mean $\\lambda \\approx 0.5$ at load factor 0.75. The probability of a bucket containing 8 nodes is $0.00000006$ (less than 1 in 10,000,000). Thus, tree bins are virtually never created in normal healthy applications.',
      'TreeNode Ordering Strategy: To build a binary search tree, nodes must be orderable. `TreeNode` determines direction via: 1) Comparison of spread hash codes (`h1 < h2 ? -1 : 1`). 2) If hash codes match and `key instanceof Comparable`, it calls `((Comparable) k1).compareTo(k2)`. 3) If keys do not implement `Comparable` or `compareTo == 0` for unequal keys, it breaks ties using `tieBreakOrder(a, b)` which compares their `System.identityHashCode()`.',
      'Untreeification: When resizing splits a tree bin or elements are removed, if the node count drops to `UNTREEIFY_THRESHOLD = 6`, `untreeify()` converts the tree back into a lightweight singly-linked list of `Node` objects, conserving memory.'
    ],
    diagram: `HASH COLLISION: SEPARATE CHAINING VS RED-BLACK TREEIFICATION
========================================================================

1. SEPARATE CHAINING (Bin Count < 8)
   table[4] ──> [ Node 1 ] ──> [ Node 2 ] ──> [ Node 3 ] ──> null
   - Singly-linked list traversal: O(K) where K < 8.
   - Minimal memory overhead per node (hash, key, value, next).

2. TREEIFICATION TRIGGER: 8th Collision AND Capacity >= 64
   table[4] ──> [ TreeNode (Black Root) ]
                         /                 \\
             [ TreeNode (Red) ]        [ TreeNode (Black) ]
                 /          \\              /          \\
         [ TreeNode ]   [ TreeNode ]  [ TreeNode ]  [ TreeNode ]
   - Search complexity drops from O(N) to O(log N).
   - Immune to Hash DoS attacks!

3. THRESHOLD HYSTERESIS GAP
   [ Linked List ] ──(>= 8 items & cap >= 64)──> [ Red-Black Tree ]
   [ Linked List ] <──────(<= 6 items)─────────── [ Red-Black Tree ]
   * Gap between 8 and 6 prevents rapid flapping between data structures!`,
    codeSnippet: {
      title: 'Simulating Hash Collisions and Treeification Verification',
      code: `import java.lang.reflect.Field;
import java.util.HashMap;

class CollidingObject implements Comparable<CollidingObject> {
    final int id;
    CollidingObject(int id) { this.id = id; }

    @Override
    public int hashCode() { return 100; } // All land in the same bucket!

    @Override
    public boolean equals(Object o) {
        return (o instanceof CollidingObject) && this.id == ((CollidingObject) o).id;
    }

    @Override
    public int compareTo(CollidingObject o) {
        return Integer.compare(this.id, o.id);
    }
}

public class TreeificationDemo {
    public static void main(String[] args) throws Exception {
        // Initial capacity 64 to satisfy MIN_TREEIFY_CAPACITY
        HashMap<CollidingObject, String> map = new HashMap<>(64);

        for (int i = 1; i <= 9; i++) {
            map.put(new CollidingObject(i), "Val-" + i);
        }

        // Inspect bucket node type via reflection
        Field tableField = HashMap.class.getDeclaredField("table");
        tableField.setAccessible(true);
        Object[] table = (Object[]) tableField.get(map);

        int bucketIndex = (table.length - 1) & (100 ^ (100 >>> 16));
        Object binHead = table[bucketIndex];

        System.out.println("Table length: " + table.length);
        System.out.println("Bucket [" + bucketIndex + "] Head Node Class: " + binHead.getClass().getSimpleName());
        System.out.println("Is TreeNode? " + binHead.getClass().getSimpleName().equals("TreeNode"));
    }
}`,
      lineByLineExplanation: [
        { line: 'HashMap<CollidingObject, String> map = new HashMap<>(64);', explanation: 'Creates a HashMap with initial capacity 64 to satisfy MIN_TREEIFY_CAPACITY.' },
        { line: 'public int hashCode() { return 100; }', explanation: 'Forces every key to produce identical hash code, directing all 9 insertions to the same bucket.' },
        { line: 'for (int i = 1; i <= 9; i++) map.put(...);', explanation: 'Inserts 9 colliding elements, exceeding TREEIFY_THRESHOLD (8).' },
        { line: 'Object binHead = table[bucketIndex];', explanation: 'Retrieves the root node of the colliding bucket.' },
        { line: 'binHead.getClass().getSimpleName();', explanation: 'Verifies that the bucket head has been transformed from "Node" into "TreeNode".' }
      ],
      output: `Table length: 64
Bucket [36] Head Node Class: TreeNode
Is TreeNode? true`
    },
    codeExamples: [
      {
        title: 'Comparing Search Performance: Linked List vs Tree Bin',
        description: 'Demonstrating how O(log N) Red-Black tree searches outshine linear scans for colliding keys.',
        code: `import java.util.*;

public class CollisionSearchDemo {
    public static void main(String[] args) {
        // Under Java 8, lookups in treeified bins require at most ~log2(N) comparisons
        int[] collisionCounts = {8, 16, 64, 1024};
        System.out.println("Collisions (N) | Linked List (N/2) | Red-Black Tree (log2 N)");
        System.out.println("------------------------------------------------------------");
        for (int n : collisionCounts) {
            double listComparisons = n / 2.0;
            double treeComparisons = Math.ceil(Math.log(n) / Math.log(2));
            System.out.printf("%-14d | %-17.1f | %-20.1f%n", n, listComparisons, treeComparisons);
        }
    }
}`,
        output: `Collisions (N) | Linked List (N/2) | Red-Black Tree (log2 N)
------------------------------------------------------------
8              | 4.0               | 3.0                 
16             | 8.0               | 4.0                 
64             | 32.0              | 6.0                 
1024           | 512.0             | 10.0                `
      },
      {
        title: 'Untreeification during Element Removals',
        description: 'Explaining how UNTREEIFY_THRESHOLD = 6 converts tree bins back to linked lists.',
        code: `public class UntreeifySimulation {
    public static void main(String[] args) {
        int itemsInBin = 9;
        System.out.println("Initial items: " + itemsInBin + " -> Structure: Red-Black Tree");

        while (itemsInBin > 5) {
            itemsInBin--;
            if (itemsInBin == 6) {
                System.out.println("Items dropped to 6 (UNTREEIFY_THRESHOLD) -> Morphs back to Linked List!");
            } else {
                System.out.println("Items: " + itemsInBin + " -> Structure: Red-Black Tree");
            }
        }
    }
}`,
        output: `Initial items: 9 -> Structure: Red-Black Tree
Items: 8 -> Structure: Red-Black Tree
Items: 7 -> Structure: Red-Black Tree
Items dropped to 6 (UNTREEIFY_THRESHOLD) -> Morphs back to Linked List!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming a bucket treeifies as soon as it has 8 items regardless of capacity',
        whyItHappens: 'Many developers forget the `MIN_TREEIFY_CAPACITY = 64` rule. If table capacity is 16 or 32, reaching 8 items triggers a table `resize()` instead of treeification.',
        howToFix: 'Remember both conditions: `binCount >= 8` AND `table.length >= 64` are required to convert to `TreeNode`.'
      },
      {
        mistake: 'Failing to implement Comparable on keys with known high collision potential',
        whyItHappens: 'If colliding keys do not implement `Comparable`, `TreeNode` must fall back to `tieBreakOrder()` using `System.identityHashCode()`, slowing down branch insertion.',
        howToFix: 'Implement `Comparable<K>` on domain keys when high cardinality or potential collisions are anticipated.'
      },
      {
        mistake: 'Thinking treeification makes a bad hashCode() function acceptable',
        whyItHappens: 'Treeification bounds search to $O(\\log N)$, which is better than $O(N)$, but still far worse than the optimal $O(1)$ constant time of well-distributed hash buckets.',
        howToFix: 'Always write high-quality `hashCode()` functions using prime multipliers (`Objects.hash()`) to keep buckets at depth 0 or 1.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Treeify Threshold Condition Check',
        problemStatement: 'A HashMap has capacity 32. Bucket 5 receives its 8th colliding element. What action does HashMap take?',
        code: `// table.length = 32
// binCount reaches 8 (TREEIFY_THRESHOLD)`,
        options: [
          'A) Converts bucket 5 into a Red-Black tree',
          'B) Resizes the table from capacity 32 to 64',
          'C) Throws IllegalStateException',
          'D) Drops the oldest element in bucket 5'
        ],
        correctOptionIndex: 1,
        hint: 'Check the MIN_TREEIFY_CAPACITY constraint.',
        solution: 'Option B is correct: Resizes the table from capacity 32 to 64',
        explanation: 'In `treeifyBin()`, HashMap checks `if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY) resize()`. Since capacity 32 is less than 64, it doubles table capacity to 64 instead of treeifying.'
      },
      {
        title: 'Puzzle 2: Untreeify Threshold Value',
        problemStatement: 'At what remaining element count in a tree bin does HashMap convert a Red-Black tree back into a linked list?',
        code: `// What is the value of UNTREEIFY_THRESHOLD in HashMap?`,
        options: [
          'A) 8',
          'B) 7',
          'C) 6',
          'D) 0'
        ],
        correctOptionIndex: 2,
        hint: 'There is a hysteresis gap of 2 below TREEIFY_THRESHOLD (8).',
        solution: 'Option C is correct: 6',
        explanation: '`UNTREEIFY_THRESHOLD = 6`. When a tree bin shrinks to 6 or fewer elements during resize or node removal, `untreeify()` converts it back into a standard linked list.'
      },
      {
        title: 'Puzzle 3: Memory Footprint of TreeNode vs Node',
        problemStatement: 'Why does HashMap start with standard Node linked lists instead of creating TreeNodes immediately?',
        code: `// static class Node<K,V> { hash, key, value, next }
// static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
//     parent, left, right, prev, red
// }`,
        options: [
          'A) TreeNodes cannot store null values',
          'B) TreeNodes consume approximately twice the memory of regular Nodes, wasting RAM when collisions are rare',
          'C) TreeNodes cannot be serialized',
          'D) TreeNodes require background GC threads'
        ],
        correctOptionIndex: 1,
        hint: 'TreeNodes require 5 extra pointer/boolean fields per entry.',
        solution: 'Option B is correct: TreeNodes consume approximately twice the memory of regular Nodes, wasting RAM when collisions are rare',
        explanation: 'Under compressed OOPs, a `Node` is ~32 bytes while a `TreeNode` is ~56-64 bytes. In normal execution where >99.9% of buckets have 1 element, using TreeNodes everywhere would double heap memory consumption.'
      },
      {
        title: 'Puzzle 4: Tie-breaking in TreeNodes when compareTo returns 0',
        problemStatement: 'How does TreeNode break ties between two unequal keys in a Red-Black tree when compareTo() returns 0 or keys do not implement Comparable?',
        code: `// Keys k1 and k2 have same hash, but k1.equals(k2) is false.
// k1.compareTo(k2) returns 0.`,
        options: [
          'A) It throws ClassCastException',
          'B) It invokes tieBreakOrder() which compares System.identityHashCode(k1) and System.identityHashCode(k2)',
          'C) It falls back to an O(N) linked list within the tree',
          'D) It overwrites k1 with k2'
        ],
        correctOptionIndex: 1,
        hint: 'Identity hash code provides a consistent numeric tie-breaker based on object address.',
        solution: 'Option B is correct: It invokes tieBreakOrder() which compares System.identityHashCode(k1) and System.identityHashCode(k2)',
        explanation: '`tieBreakOrder(a, b)` uses `System.identityHashCode(a) <= System.identityHashCode(b) ? -1 : 1` to establish a deterministic total ordering in the binary search tree.'
      },
      {
        title: 'Puzzle 5: Theoretical Probability of Treeification',
        problemStatement: 'Under ideal random hash code distribution, what is the mathematical probability of a bucket reaching TREEIFY_THRESHOLD (8) elements?',
        code: `// Poisson distribution with lambda = 0.5 (load factor 0.75):
// P(k = 8) = (e^-0.5 * 0.5^8) / 8!`,
        options: [
          'A) About 1 in 10 (10%)',
          'B) About 1 in 1,000 (0.1%)',
          'C) Less than 1 in 10,000,000 (0.00000006)',
          'D) 0% (Mathematically impossible)'
        ],
        correctOptionIndex: 2,
        hint: 'The Poisson table documented in OpenJDK HashMap source code shows 0.00000006.',
        solution: 'Option C is correct: Less than 1 in 10,000,000 (0.00000006)',
        explanation: 'Under Poisson distribution with parameter 0.5, the chance of 8 collisions in a single bucket is 0.00000006. Treeification is an exceptional fallback designed strictly for pathological hash collisions or security attacks.'
      },
      {
        title: 'Puzzle 6: Preserving Insertion Order in TreeNodes',
        problemStatement: 'Why does TreeNode maintain `prev` and `next` pointers alongside `left` and `right` tree pointers?',
        code: `// TreeNode maintains:
// parent, left, right (Tree structure)
// prev, next (List structure)`,
        options: [
          'A) To support faster untreeification back to a linked list without traversing the tree',
          'B) To allow thread synchronization',
          'C) To store historical values for undo operations',
          'D) To calculate size in O(1)'
        ],
        correctOptionIndex: 0,
        hint: 'What happens when a tree bin shrinks below UNTREEIFY_THRESHOLD (6)?',
        solution: 'Option A is correct: To support faster untreeification back to a linked list without traversing the tree',
        explanation: 'By maintaining a doubly-linked list (`next`/`prev`) concurrently with the Red-Black tree structure, converting a tree back to a linked list (`untreeify`) is an instantaneous O(K) linear sweep through `next` pointers.'
      },
      {
        title: 'Puzzle 7: Java 7 vs Java 8 Collision Handling Comparison',
        problemStatement: 'Which of the following describes the difference in collision handling between Java 7 and Java 8?',
        code: `// Scenario: 1,000 keys with identical hashCode inserted into HashMap`,
        options: [
          'A) Java 7 threw OutOfMemoryError; Java 8 handles it in O(1)',
          'B) Java 7 used a singly-linked list (O(N) search); Java 8 converts to Red-Black tree (O(log N) search)',
          'C) Java 7 used open addressing; Java 8 uses separate chaining',
          'D) Both use identical singly-linked list chaining'
        ],
        correctOptionIndex: 1,
        hint: 'Treeification was introduced in Java 8.',
        solution: 'Option B is correct: Java 7 used a singly-linked list (O(N) search); Java 8 converts to Red-Black tree (O(log N) search)',
        explanation: 'Java 7 strictly chained collisions in a singly-linked list, causing O(N) degradation. Java 8 introduced Red-Black treeification for bins with >= 8 nodes (at capacity >= 64), capping search at O(log N).'
      },
      {
        title: 'Puzzle 8: TreeBin Root Node Invalidation during Balancing',
        problemStatement: 'What happens to the bucket array slot `table[i]` when a Red-Black tree rotation changes the root of the tree?',
        code: `// Red-Black tree rotation changes root node from A to B:
// How is table[i] updated?`,
        options: [
          'A) table[i] retains a pointer to A, and A points to B',
          'B) The tree bin moves the new root node to the front of the list and updates table[i] = newRoot',
          'C) The table array must be resized',
          'D) An exception is thrown'
        ],
        correctOptionIndex: 1,
        hint: 'The first node in table[i] must always be the root of the tree.',
        solution: 'Option B is correct: The tree bin moves the new root node to the front of the list and updates table[i] = newRoot',
        explanation: '`TreeNode.moveRootToFront(tab, root)` ensures that whenever tree rebalancing rotates a new node to the root, `table[i]` is immediately updated to point to the new root node.'
      },
      {
        title: 'Puzzle 9: Collision Chaining Insertion Order: Head vs Tail',
        problemStatement: 'Where does Java 8 HashMap insert a new colliding element in a linked list bucket (before treeification)?',
        code: `// Java 7 vs Java 8 insertion at bucket chain:
// Java 7: inserted at HEAD of list (reverse order)
// Java 8: inserted at ? of list`,
        options: [
          'A) Head of the list',
          'B) Tail (end) of the list',
          'C) Random position',
          'D) Middle of the list'
        ],
        correctOptionIndex: 1,
        hint: 'Java 8 inserts at the tail to count bin depth and prevent the Java 7 multi-threaded reverse-loop bug.',
        solution: 'Option B is correct: Tail (end) of the list',
        explanation: 'Java 8 inserts at the TAIL of the linked list. Because it must traverse the list to check for existing key equality anyway, inserting at the tail preserves relative ordering and avoids the cyclic infinite loop bug that plagued Java 7`s head-insertion during unsynchronized resizes.'
      },
      {
        title: 'Puzzle 10: Hash DoS Attack Mitigation',
        problemStatement: 'Why does Red-Black treeification in Java 8 mitigate Hash DoS attacks?',
        code: `// Attacker sends 50,000 POST parameters with colliding hash codes:`,
        options: [
          'A) Java drops colliding POST parameters automatically',
          'B) Worst-case lookup time is bounded to O(log N) instead of O(N), so 50,000 items take ~16 comparisons instead of 25,000',
          'C) HashMap re-encrypts the keys using SHA-256',
          'D) TreeNodes reject duplicate hash codes'
        ],
        correctOptionIndex: 1,
        hint: 'Calculate log2(50000) vs 50000/2.',
        solution: 'Option B is correct: Worst-case lookup time is bounded to O(log N) instead of O(N), so 50,000 items take ~16 comparisons instead of 25,000',
        explanation: 'In Java 7, 50,000 colliding keys required ~1.25 billion comparisons ($O(N^2)$). In Java 8, treeification guarantees each lookup takes at most $\\log_2(50000) \\approx 16$ comparisons, preventing CPU exhaustion.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is Hash Collision in a HashMap, and how does Java 8 resolve it using hybrid Separate Chaining and Treeification?',
        answer: 'A hash collision occurs when two distinct keys produce hash codes that map to the identical bucket index in the table array. Java 8 resolves collisions via hybrid Separate Chaining: Initially, colliding entries are stored in a singly-linked list of `Node<K,V>` objects where each node points to the next. However, if the number of colliding elements in any single bucket reaches `TREEIFY_THRESHOLD = 8`, and the total table capacity is at least `MIN_TREEIFY_CAPACITY = 64`, HashMap transforms that linked list into a balanced Red-Black tree of `TreeNode<K,V>` objects. This reduces search time from O(N) to O(log N). If the table capacity is less than 64, HashMap resizes the table instead of treeifying.',
        followUp: 'What happens if elements are removed from a treeified bin and its size shrinks?',
        followUpAnswer: 'When a tree bin shrinks to `UNTREEIFY_THRESHOLD = 6` nodes (either during node removal or when entries are split during a resize), `untreeify()` converts the Red-Black tree back into a standard singly-linked list to conserve memory.',
        keyPhrases: [
          'Separate chaining with singly-linked list',
          'TREEIFY_THRESHOLD = 8',
          'MIN_TREEIFY_CAPACITY = 64',
          'UNTREEIFY_THRESHOLD = 6',
          'Cuts search from O(N) to O(log N)'
        ],
        commonMistakeAnswer: 'Asserting that treeification happens whenever 8 items collide, forgetting the MIN_TREEIFY_CAPACITY = 64 prerequisite.'
      },
      {
        question: 'Why did Java designers choose 8 as the TREEIFY_THRESHOLD and 6 as the UNTREEIFY_THRESHOLD? Why not 7 for both?',
        answer: 'The threshold 8 was chosen based on Poisson distribution mathematics: under random, well-distributed hash codes with load factor 0.75, the statistical probability of 8 keys landing in the same bucket is approximately 0.00000006 (less than 1 in 10 million). Thus, under normal healthy operations, tree bins are almost never formed. The threshold 6 for untreeify creates a hysteresis gap of 2 (8 vs 6). If both thresholds were the same number (e.g., 8), a bucket hovering at that boundary with continuous insertions and deletions would repeatedly allocate and deallocate TreeNodes and restructure the tree, causing severe CPU performance thrashing.',
        followUp: 'Why does HashMap untreeify at 6 instead of keeping the tree forever?',
        followUpAnswer: 'A TreeNode consumes approximately double the memory of a basic Node (due to left, right, parent, and prev pointers). When a bucket contains only 6 or fewer elements, linear search through 6 nodes is faster than binary tree pointer navigation due to CPU cache locality, and untreeifying reclaims heap memory.',
        keyPhrases: [
          'Poisson distribution probability (0.00000006)',
          'Hysteresis gap prevents thrashing',
          'TreeNode memory overhead is ~2x standard Node',
          'Linear search is faster for <= 6 items due to cache locality'
        ],
        commonMistakeAnswer: 'Believing 8 was chosen arbitrarily without statistical justification.'
      },
      {
        question: 'What was the Hash DoS attack, and how does Java 8 Red-Black treeification prevent it?',
        answer: 'In Java 7, HashMap resolved collisions purely via singly-linked lists. Attackers discovered that certain web frameworks (Tomcat, Spring) parsed HTTP POST form parameters into a standard HashMap. By crafting thousands of strings with identical hash codes (e.g., strings matching regex patterns that collide in String.hashCode()), an attacker could send a small 2 MB POST request containing 50,000 colliding keys. This caused every key to land in a single bucket, requiring 50,000 linked list traversals ($O(N^2)$ comparisons), locking up server CPU cores for minutes and causing Denial of Service. Java 8`s treeification guarantees that even if an attacker forces thousands of collisions, the bucket treeifies into a Red-Black tree where search and insert remain bounded to O(log N) (only ~16 comparisons for 50,000 items), neutralizing the attack.',
        followUp: 'Does treeification completely eliminate the need for a good hashCode() function?',
        followUpAnswer: 'No, O(log N) is still significantly slower than O(1) constant-time hashing. A poor hash function degrades application throughput across all maps; treeification merely prevents catastrophic O(N^2) CPU stalls.',
        keyPhrases: [
          'Crafted HTTP POST keys with identical hashCodes',
          'O(N^2) linked list traversal pinned CPU',
          'Treeification bounds worst-case to O(log N)',
          'Neutralizes Hash DoS attack'
        ],
        commonMistakeAnswer: 'Thinking Hash DoS is a network layer DDoS attack rather than an algorithmic complexity attack.'
      },
      {
        question: 'How does TreeNode navigate and insert nodes when keys have identical hash codes? Explain tieBreakOrder.',
        answer: 'When multiple keys collide in a tree bin: 1) First, it compares their spread hash codes: `if (h1 != h2) return h1 < h2 ? -1 : 1`. 2) If hash codes are identical, it checks if the key class implements `Comparable<K>`: if so, it invokes `((Comparable) k1).compareTo(k2)`. 3) If keys do not implement `Comparable`, or if `compareTo()` returns 0 for two keys that are NOT equal according to `equals()`, it falls back to `tieBreakOrder(a, b)`. This method compares class names, and if class names match, compares their `System.identityHashCode(a)` and `System.identityHashCode(b)` to establish a deterministic total order in the binary tree.',
        followUp: 'Why is implementing Comparable<K> strongly recommended for custom classes used as HashMap keys?',
        followUpAnswer: 'Because if keys collide in a tree bin, implementing Comparable allows direct O(log N) branch descent via compareTo(). Without Comparable, TreeNode must search both left and right subtrees before falling back to tieBreakOrder, increasing traversal overhead.',
        keyPhrases: [
          'Hash code comparison first',
          'Comparable.compareTo() for equal hashes',
          'tieBreakOrder() via System.identityHashCode',
          'Deterministic binary tree ordering'
        ],
        commonMistakeAnswer: 'Asserting that if keys do not implement Comparable, treeification fails and throws an exception.'
      },
      {
        question: 'Why does HashMap insert new elements at the TAIL of the linked list in Java 8, whereas Java 7 inserted at the HEAD?',
        answer: 'In Java 7, HashMap inserted colliding elements at the HEAD of the bucket list (head-insertion) because it avoided traversing the list. However, under multi-threaded concurrent modifications, head-insertion during table resizing caused pointers to reverse, creating circular pointer references (`Node A -> Node B -> Node A`) that locked threads in infinite loops. In Java 8, insertion was changed to TAIL-insertion: 1) To support treeification, HashMap must count the bin depth (`binCount++`) anyway, so it has to traverse to the end of the list. 2) Tail-insertion preserves the original element sequence during resizing, preventing pointer reversal and eliminating the infinite loop bug.',
        followUp: 'Does tail-insertion make HashMap thread-safe in Java 8?',
        followUpAnswer: 'No! While it prevents the infinite loop circular reference bug during resize, unsynchronized concurrent writes in Java 8 can still cause data corruption, silent node loss, and race conditions. For concurrent use, always use ConcurrentHashMap.',
        keyPhrases: [
          'Java 7 used head-insertion (caused cyclic pointer loops during resize)',
          'Java 8 uses tail-insertion (preserves element order)',
          'Must traverse to tail anyway to count binCount',
          'HashMap is still NOT thread-safe'
        ],
        commonMistakeAnswer: 'Believing Java 8 HashMap is thread-safe because the infinite loop bug was eliminated.'
      },
      {
        question: 'Explain the internal class hierarchy of TreeNode in HashMap. Why does it extend LinkedHashMap.Entry?',
        answer: 'In OpenJDK, the class hierarchy is: `HashMap.Node` -> `LinkedHashMap.Entry` -> `HashMap.TreeNode`. `HashMap.Node` provides `hash`, `key`, `value`, and `next`. `LinkedHashMap.Entry` adds `before` and `after` pointers. `TreeNode` adds `parent`, `left`, `right`, `prev`, and `boolean red`. `TreeNode` inherits from `LinkedHashMap.Entry` so that `LinkedHashMap` can also support treeification without duplicating the complex Red-Black tree code. Furthermore, maintaining `prev` and `next` pointers allows a TreeNode to act simultaneously as a tree node and a doubly-linked list node, making `untreeify()` an instant linear traversal.',
        followUp: 'How much memory does a TreeNode consume compared to a standard Node on a 64-bit JVM with compressed OOPs?',
        followUpAnswer: 'A standard Node has 12B header + 4B hash + 4B key + 4B value + 4B next = ~32 bytes (aligned to 8 bytes). A TreeNode has 12B header + standard fields + parent (4B) + left (4B) + right (4B) + prev (4B) + red (1B) + padding = ~56-64 bytes, which is roughly double the memory.',
        keyPhrases: [
          'Inheritance: Node -> LinkedHashMap.Entry -> TreeNode',
          'Shares treeification code with LinkedHashMap',
          'Dual nature: tree node + doubly-linked list node',
          'TreeNode consumes roughly 2x memory of Node'
        ],
        commonMistakeAnswer: 'Thinking TreeNode replaces the table array entirely.'
      },
      {
        question: 'Under what exact condition does a HashMap bucket bin treeify into a Red-Black tree?',
        answer: 'A bucket bin treeifies into a Red-Black tree if and only if TWO independent conditions are simultaneously satisfied: 1) `binCount >= TREEIFY_THRESHOLD - 1` (meaning the 8th colliding element is being added to that specific bucket). 2) `table.length >= MIN_TREEIFY_CAPACITY` (which is 64). If the bin count reaches 8 but table capacity is less than 64 (such as the default 16 or 32), `treeifyBin()` halts treeification and invokes `resize()` instead to double capacity and redistribute entries.',
        followUp: 'Why does HashMap prefer resizing over treeifying when table capacity is under 64?',
        followUpAnswer: 'Because with a small table, collisions are more likely caused by limited bucket slots rather than poor hash functions. Doubling capacity from 16 to 32 exposes another bit of entropy, which typically splits the colliding bucket in half, resolving collisions naturally without tree overhead.',
        keyPhrases: [
          'binCount >= 8 (8th colliding element)',
          'table.length >= 64 (MIN_TREEIFY_CAPACITY)',
          'Resizes instead of treeifying if capacity < 64',
          'Resizing redistributes keys naturally'
        ],
        commonMistakeAnswer: 'Stating that any bucket with 8 elements treeifies immediately regardless of table size.'
      },
      {
        question: 'What is the role of the boolean `red` field in TreeNode? What properties must a Red-Black tree satisfy?',
        answer: 'The `red` boolean field tracks the color of the node in the Red-Black tree algorithm. A Red-Black tree is a self-balancing binary search tree that satisfies 5 strict invariants: 1) Every node is either red or black. 2) The root is always black. 3) All leaves (NIL nodes) are black. 4) If a node is red, both its children must be black (no two consecutive red nodes). 5) Every path from a node to any of its descendant leaves contains the exact same number of black nodes (black-height). These invariants guarantee that the longest path from root to leaf is no more than twice the shortest path, bounding tree height to $2 \\log_2(N + 1)$.',
        followUp: 'How does TreeNode maintain balance after insertion?',
        followUpAnswer: 'It invokes `balanceInsertion(root, x)`, which performs tree recoloring and left or right pointer rotations depending on whether the violation involves an uncle node that is red (recolor) or black (rotate).',
        keyPhrases: [
          '5 Red-Black tree balancing invariants',
          'No two consecutive red nodes',
          'Equal black-height along all paths',
          'Height bounded to 2 log2(N + 1)',
          'Tree rotations and recoloring'
        ],
        commonMistakeAnswer: 'Confusing Red-Black trees with AVL trees (AVL trees enforce strict height difference of <= 1, whereas Red-Black trees tolerate height up to 2x).'
      },
      {
        question: 'What happens to a treeified bucket when the HashMap resizes and doubles its capacity?',
        answer: 'When `resize()` is invoked, each tree bin is split into two separate lists: `loHead`/`loTail` (elements that remain at the old index) and `hiHead`/`hiTail` (elements that move to `oldIndex + oldCap`), determined by testing `(e.hash & oldCap) == 0`. After splitting, HashMap inspects the size of each resulting sub-chain: if a sub-chain has $\\le 6$ (`UNTREEIFY_THRESHOLD`) nodes, it calls `untreeify()` to convert it back into a standard linked list; if it still has $> 6$ nodes, it calls `treeify()` to construct a new Red-Black tree for that bucket.',
        followUp: 'Does splitting a tree bin require re-evaluating the hash codes of the keys?',
        followUpAnswer: 'No, because each TreeNode caches `final int hash`, and testing `(hash & oldCap) == 0` tests the newly exposed bit directly without calling key.hashCode() again.',
        keyPhrases: [
          'Split into loHead and hiHead using (hash & oldCap) == 0',
          'If sub-chain <= 6: untreeify into linked list',
          'If sub-chain > 6: rebuild Red-Black tree',
          'No hash code re-evaluation required'
        ],
        commonMistakeAnswer: 'Assuming the entire tree is re-inserted from scratch element by element during a resize.'
      },
      {
        question: 'How does HashMap ensure that treeified bins remain thread-safe? Or does it?',
        answer: 'HashMap provides ZERO thread-safety guarantees for treeified bins! It is completely unsynchronized. If multiple threads concurrently insert or delete entries in a treeified bin without external synchronization, Red-Black tree rotations (`rotateLeft`, `rotateRight`) and parent/child pointer assignments will race. This can lead to detached subtrees, corrupted node pointers, memory corruption, and threads stuck in infinite loops. For concurrent multi-threaded applications, `ConcurrentHashMap` must always be used instead.',
        followUp: 'How does ConcurrentHashMap handle tree bins concurrently?',
        followUpAnswer: 'In `ConcurrentHashMap`, each tree bin is wrapped in a special `TreeBin` root node. ConcurrentHashMap synchronizes on the bucket head (`synchronized (f)`) during writes, and uses a reader-writer lock mechanism with a lock state integer so that reading threads can navigate the tree concurrently while waiting for writers to finish rebalancing.',
        keyPhrases: [
          'HashMap tree bins are NOT thread-safe',
          'Concurrent rotations lead to pointer corruption',
          'ConcurrentHashMap uses TreeBin with synchronized bucket head',
          'ConcurrentHashMap uses reader-writer lock state'
        ],
        commonMistakeAnswer: 'Assuming Java 8 treeification made HashMap safe for multi-threaded access.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the value of `TREEIFY_THRESHOLD` in Java 8 HashMap?',
        options: [
          '4',
          '6',
          '8',
          '16'
        ],
        correctIndex: 2,
        explanation: '`TREEIFY_THRESHOLD = 8`. A bucket bin converts to a Red-Black tree when it reaches 8 colliding nodes, provided capacity >= 64.'
      },
      {
        question: 'What is the value of `MIN_TREEIFY_CAPACITY` in Java 8 HashMap?',
        options: [
          '16',
          '32',
          '64',
          '128'
        ],
        correctIndex: 2,
        explanation: '`MIN_TREEIFY_CAPACITY = 64`. If a bin reaches 8 collisions but table capacity is under 64, HashMap resizes rather than treeifying.'
      },
      {
        question: 'What is the value of `UNTREEIFY_THRESHOLD` in Java 8 HashMap?',
        options: [
          '2',
          '4',
          '6',
          '8'
        ],
        correctIndex: 2,
        explanation: '`UNTREEIFY_THRESHOLD = 6`. When a tree bin shrinks to 6 or fewer nodes, it is converted back into a singly-linked list.'
      },
      {
        question: 'Why does HashMap have a gap of 2 between TREEIFY_THRESHOLD (8) and UNTREEIFY_THRESHOLD (6)?',
        options: [
          'To account for null keys',
          'To provide hysteresis and prevent rapid thrashing between tree and list structures on repeated insertions and deletions',
          'Because 7 is a prime number',
          'To allow concurrent readers'
        ],
        correctIndex: 1,
        explanation: 'The hysteresis gap of 2 prevents continuous structural conversion thrashing when a bucket hovers near the threshold.'
      },
      {
        question: 'What type of self-balancing binary search tree does HashMap use for treeified bins?',
        options: [
          'AVL Tree',
          'Splay Tree',
          'Red-Black Tree',
          'B-Tree'
        ],
        correctIndex: 2,
        explanation: 'HashMap uses a Red-Black tree (`TreeNode<K,V>`), which provides guaranteed O(log N) search, insertion, and deletion.'
      },
      {
        question: 'In Java 8, where are new colliding elements inserted in a linked list bucket before treeification occurs?',
        options: [
          'At the head of the list (like Java 7)',
          'At the tail (end) of the list',
          'At a random index',
          'In sorted order'
        ],
        correctIndex: 1,
        explanation: 'Java 8 inserts at the tail of the linked list to maintain encounter order and avoid the pointer reversal loop bug of Java 7.'
      },
      {
        question: 'How does TreeNode break ties between unequal keys with identical hash codes that do not implement Comparable?',
        options: [
          'It throws an exception',
          'It calls System.identityHashCode() in tieBreakOrder()',
          'It generates a random UUID',
          'It falls back to linear scan'
        ],
        correctIndex: 1,
        explanation: '`tieBreakOrder()` compares `System.identityHashCode()` values to establish a consistent, deterministic total order in the tree.'
      },
      {
        question: 'Why is a TreeNode roughly double the memory size of a standard Node?',
        options: [
          'It stores a duplicate copy of the value',
          'It adds parent, left, right, prev pointers and a red boolean flag',
          'It contains an encryption key',
          'It maintains a secondary array'
        ],
        correctIndex: 1,
        explanation: '`TreeNode` adds 4 pointer references (`parent`, `left`, `right`, `prev`) and a `boolean red`, consuming ~56-64 bytes compared to ~32 bytes for a `Node`.'
      },
      {
        question: 'Under what statistical distribution was TREEIFY_THRESHOLD = 8 determined?',
        options: [
          'Normal (Gaussian) distribution',
          'Poisson distribution with parameter 0.5',
          'Binomial distribution',
          'Uniform distribution'
        ],
        correctIndex: 1,
        explanation: 'Under Poisson distribution with $\\lambda = 0.5$, the probability of 8 collisions is less than 1 in 10 million ($0.00000006$).'
      },
      {
        question: 'What security attack was specifically neutralized by the introduction of Java 8 treeification?',
        options: [
          'SQL Injection',
          'Cross-Site Scripting (XSS)',
          'Hash DoS (Denial of Service via engineered hash collisions)',
          'Man-in-the-Middle (MitM)'
        ],
        correctIndex: 2,
        explanation: 'Hash DoS attacks crafted thousands of colliding POST keys to force O(N^2) CPU exhaustion in Java 7; treeification caps lookup to O(log N).'
      }
    ]
  }
};
