import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 18: COLLECTIONS FRAMEWORK (LESSONS 18.3 & 18.4)
// Authoritative FAANG-Standard Collections Core Curriculum
// ============================================================

export const col18_3_4_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 18.3: Set Hierarchy: HashSet, LinkedHashSet & TreeSet
  // ─────────────────────────────────────────────────────────────
  'set-hierarchy-and-treeset': {
    id: 'set-hierarchy-and-treeset',
    moduleId: 'java-collections',
    moduleTitle: '18. Collections Framework',
    lessonNumber: 'Lesson 18.3',
    title: 'Set Hierarchy: HashSet, LinkedHashSet & TreeSet',
    subtitle: 'HashSet backing HashMap, dummy PRESENT Object, LinkedHashSet doubly-linked iteration, TreeSet Red-Black tree navigation, and compareTo vs equals contract',
    estimatedMinutes: 26,
    beginnerAnalogy: 'Imagine three VIP clubs with strict "no duplicate guests" rules. In the first club (`HashSet`), the bouncer puts everyone into numbered lockers based on a hash of their ID card. Entering and checking if someone is inside is almost instant ($O(1)$), but when you call everyone out to the dance floor, they emerge in totally random, unpredictable order! In the second club (`LinkedHashSet`), the bouncer still uses the hash lockers for instant lookup, but also ties a neon ribbon from each guest to the next in the exact order they entered ($O(1)$ lookup + preserved insertion order). In the third club (`TreeSet`), there are no lockers; instead, guests are placed into a majestic branched Red-Black family tree sorted strictly by height. Lookups take $O(\\log N)$, but you can instantly ask for the shortest person (`first()`), anyone taller than 6 feet (`tailSet()`), or the closest person just below you (`floor()`)!',
    interviewTakeaways: [
      'HashSet Backing Map: `HashSet` is not an independent data structure; it is backed internally by a `private transient HashMap<E, Object> map`. When you call `set.add(e)`, it calls `map.put(e, PRESENT)` where `PRESENT` is a static dummy `new Object()`. It returns `true` if `map.put()` returns `null`.',
      'LinkedHashSet Insertion Ordering: `LinkedHashSet` extends `HashSet` and calls `super(capacity, loadFactor, true)`, which instantiates a `LinkedHashMap`. It maintains a doubly-linked list running through all its entries, providing predictable insertion-order iteration with minimal overhead.',
      'TreeSet Red-Black Tree Backing: `TreeSet` is backed by a `NavigableMap` (specifically `TreeMap`), which implements a self-balancing Red-Black binary search tree. Operations like `add()`, `remove()`, and `contains()` run in guaranteed $O(\\log N)$ time.',
      'TreeSet Uniqueness Contract: `TreeSet` determines uniqueness strictly via `Comparable.compareTo()` or a custom `Comparator.compare()`, completely ignoring `equals()`! If `compare(a, b) == 0`, `TreeSet` considers the elements identical and rejects the addition, even if `a.equals(b)` is false!',
      'NavigableSet Rich API: `TreeSet` implements `NavigableSet<E>`, providing powerful range queries: `floor(e)` (greatest $\\le e$), `ceiling(e)` (least $\\ge e$), `lower(e)` (strictly $< e$), `higher(e)` (strictly $> e$), `pollFirst()`, `pollLast()`, and `subSet(from, true, to, false)`.',
      'Null Handling: `HashSet` and `LinkedHashSet` permit a single `null` element (stored at bucket 0). `TreeSet` rejects `null` and throws `NullPointerException` (unless a custom Comparator explicitly handles nulls).'
    ],
    cheatSheet: {
      summary: 'Set enforces mathematical uniqueness. HashSet uses a backing HashMap for O(1) operations with no order. LinkedHashSet preserves insertion order via a doubly-linked list. TreeSet uses a Red-Black tree for O(log N) sorted navigation.',
      syntaxTemplate: `// Set implementations and their common instantiation
Set<String> hashSet = new HashSet<>(); // O(1) time, arbitrary order
Set<String> linkedSet = new LinkedHashSet<>(); // O(1) time, insertion order
NavigableSet<Integer> treeSet = new TreeSet<>(); // O(log N) time, sorted order

// NavigableSet range queries
Integer fl = treeSet.floor(25);   // greatest element <= 25
Integer ce = treeSet.ceiling(25); // smallest element >= 25`,
      rules: [
        { rule: 'equals & hashCode Contract', explanation: 'If two objects are equal according to equals(Object), their hashCode() MUST return the same integer value; otherwise HashSet will accept duplicates.' },
        { rule: 'TreeSet compareTo Consistency', explanation: 'TreeSet uniqueness is defined by compare(a, b) == 0. Ensure compareTo is consistent with equals to prevent subtle set anomalies.' },
        { rule: 'TreeSet Null Rejection', explanation: 'TreeSet throws NullPointerException when adding null because compareTo(null) cannot be invoked.' },
        { rule: 'Immutable Element Keys', explanation: 'Never mutate fields of an object after adding it to a HashSet if those fields contribute to its hashCode(), as it loses bucket location.' },
        { rule: 'Set.of() Uniqueness Enforcement', explanation: 'Passing duplicate elements to Set.of("A", "A") throws IllegalArgumentException at runtime.' }
      ],
      quickComparison: [
        { aspect: 'Underlying Structure', optionA: 'HashSet: HashMap table array of buckets', optionB: 'TreeSet: TreeMap self-balancing Red-Black tree' },
        { aspect: 'Time Complexity', optionA: 'HashSet: $O(1)$ average add/contains/remove', optionB: 'TreeSet: $O(\\log N)$ guaranteed add/contains/remove' },
        { aspect: 'Element Ordering', optionA: 'HashSet: No guarantee (unpredictable)', optionB: 'TreeSet: Natural sorted order or custom Comparator' },
        { aspect: 'Duplicate Determination', optionA: 'HashSet: hashCode() bucket + equals()', optionB: 'TreeSet: compareTo() or compare() == 0' }
      ]
    },
    coreExplanation: [
      'The `Set` interface extends `Collection` and models mathematical set abstraction: a collection containing no pair of elements `e1` and `e2` such that `e1.equals(e2)`, and at most one `null` element.',
      '`HashSet` is the premier workhorse implementation. Under the hood, every `HashSet` contains a `HashMap<E, Object>`. When `add(e)` is invoked, the element is stored as the key in the map, and a dummy singleton `Object PRESENT = new Object()` is stored as the value.',
      'Because `HashSet` delegates to `HashMap`, it inherits hash bucket distribution: elements are indexed into buckets using `hash(key) = (h = key.hashCode()) ^ (h >>> 16)`. If two keys produce different hash codes or fail `equals()`, they coexist; if they match, the map overwrites the dummy value and returns the old value, signaling a duplicate rejection.',
      '`LinkedHashSet` extends `HashSet` and maintains a doubly-linked list through all its entries. This adds an 8-byte pointer overhead per element, but ensures that iteration over the set visits elements in the exact order they were inserted, without the unpredictable order of `HashSet`.',
      '`TreeSet` implements `NavigableSet` and is backed by a `TreeMap` (a Red-Black binary search tree). In a Red-Black tree, nodes are ordered, self-balancing, and ensure that no path from root to leaf is more than twice as long as any other path.',
      'Critical Interview Insight: `TreeSet` does NOT use `hashCode()` or `equals()` for uniqueness or lookup. It calls `Comparable.compareTo()` or `Comparator.compare()`. If `compare(a, b) == 0`, the elements are deemed duplicate. If a class implements `Comparable` inconsistently with `equals`, `TreeSet` behaves contrary to the general `Set` contract.',
      'NavigableSet operations (`floor`, `ceiling`, `lower`, `higher`, `headSet`, `tailSet`, `subSet`) execute in $O(\\log N)$ time, making `TreeSet` the ideal data structure for real-time leaderboards, interval tracking, and range queries.'
    ],
    diagram: `SET IMPLEMENTATIONS: HASHSET VS LINKEDHASHSET VS TREESET
========================================================================

1. HASHSET (Backed by HashMap)
   Internal dummy value: static final Object PRESENT = new Object();
   Bucket Array:
   [0] -> null
   [1] -> Node(Key: "Apple", Value: PRESENT) -> Node(Key: "Banana", Value: PRESENT)
   [2] -> null
   [3] -> Node(Key: "Cherry", Value: PRESENT)
   * Iteration order: "Apple", "Banana", "Cherry" (Unpredictable bucket order!)

2. LINKEDHASHSET (HashMap + Doubly-Linked Header Chain)
   Head -> [ "Apple" ] <=====> [ "Banana" ] <=====> [ "Cherry" ] <- Tail
              │                     │                     │
           Bucket 1              Bucket 1              Bucket 3
   * Iteration order: "Apple" -> "Banana" -> "Cherry" (Guaranteed insertion order!)

3. TREESET (Red-Black Self-Balancing Binary Search Tree)
                       [ 20 (Black) ]
                        /          \\
            [ 10 (Red) ]            [ 30 (Black) ]
             /        \\              /          \\
       [ 5 (Black) ] [ 15 (Black) ] [ 25 (Red) ] [ 35 (Red) ]
   * Guaranteed O(log N) search, insertion, and deletion.
   * In-order traversal: 5, 10, 15, 20, 25, 30, 35 (Sorted natural order!)`,
    codeSnippet: {
      title: 'HashSet vs LinkedHashSet vs TreeSet Comparison',
      code: `import java.util.*;

public class SetHierarchyDemo {
    public static void main(String[] args) {
        // 1. HashSet: Arbitrary order, O(1)
        Set<String> hash = new HashSet<>(Arrays.asList("Banana", "Apple", "Mango", "Peach"));
        System.out.println("HashSet:       " + hash);

        // 2. LinkedHashSet: Insertion order preserved, O(1)
        Set<String> linked = new LinkedHashSet<>(Arrays.asList("Banana", "Apple", "Mango", "Peach"));
        System.out.println("LinkedHashSet: " + linked);

        // 3. TreeSet: Alphabetical sorted order, O(log N)
        NavigableSet<String> tree = new TreeSet<>(Arrays.asList("Banana", "Apple", "Mango", "Peach"));
        System.out.println("TreeSet:       " + tree);

        // Range navigation with TreeSet
        System.out.println("TreeSet ceiling('Guava'): " + tree.ceiling("Guava")); // "Mango"
        System.out.println("TreeSet floor('Guava'):   " + tree.floor("Guava"));   // "Apple"
    }
}`,
      lineByLineExplanation: [
        { line: 'Set<String> hash = new HashSet<>(...);', explanation: 'Creates a HashSet whose iteration order depends on String hash codes and bucket indexing.' },
        { line: 'Set<String> linked = new LinkedHashSet<>(...);', explanation: 'Creates a LinkedHashSet which links nodes in the exact order of insertion: Banana, Apple, Mango, Peach.' },
        { line: 'NavigableSet<String> tree = new TreeSet<>(...);', explanation: 'Creates a TreeSet storing entries in a Red-Black tree sorted alphabetically: Apple, Banana, Mango, Peach.' },
        { line: 'tree.ceiling("Guava");', explanation: 'Finds the least element in the set greater than or equal to "Guava" ("Mango") in O(log N) time.' },
        { line: 'tree.floor("Guava");', explanation: 'Finds the greatest element in the set less than or equal to "Guava" ("Apple") in O(log N) time.' }
      ],
      output: `HashSet:       [Banana, Apple, Mango, Peach]
LinkedHashSet: [Banana, Apple, Mango, Peach]
TreeSet:       [Apple, Banana, Mango, Peach]
TreeSet ceiling('Guava'): Mango
TreeSet floor('Guava'):   Apple`
    },
    codeExamples: [
      {
        title: 'TreeSet compareTo Inconsistency Trap',
        description: 'Demonstrating how TreeSet uses compareTo instead of equals, leading to unexpected element rejection.',
        code: `import java.util.*;

class Student implements Comparable<Student> {
    int id;
    String name;
    Student(int id, String name) { this.id = id; this.name = name; }

    // Broken: compares by ID only, ignoring name!
    public int compareTo(Student other) {
        return Integer.compare(this.id, other.id);
    }
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Student)) return false;
        Student s = (Student) o;
        return this.id == s.id && Objects.equals(this.name, s.name);
    }
    public int hashCode() { return Objects.hash(id, name); }
}

public class TreeSetTrap {
    public static void main(String[] args) {
        Student s1 = new Student(101, "Alice");
        Student s2 = new Student(101, "Bob"); // Same ID, different name!

        Set<Student> hashSet = new HashSet<>();
        hashSet.add(s1);
        hashSet.add(s2);
        System.out.println("HashSet size (equals/hash): " + hashSet.size()); // 2

        Set<Student> treeSet = new TreeSet<>();
        treeSet.add(s1);
        treeSet.add(s2); // compareTo returns 0 -> REJECTED as duplicate!
        System.out.println("TreeSet size (compareTo):    " + treeSet.size()); // 1
    }
}`,
        output: `HashSet size (equals/hash): 2
TreeSet size (compareTo):    1`
      },
      {
        title: 'NavigableSet Range Subsets and Polling',
        description: 'Demonstrating floor, ceiling, subSet, pollFirst, and pollLast on TreeSet.',
        code: `import java.util.*;

public class NavigableSetDemo {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>(Arrays.asList(45, 60, 75, 88, 92, 99));

        // Range view: scores between 60 (inclusive) and 90 (exclusive)
        NavigableSet<Integer> passing = scores.subSet(60, true, 90, false);
        System.out.println("Scores in [60, 90): " + passing);

        // Polling lowest and highest elements
        System.out.println("Lowest: " + scores.pollFirst()); // 45 removed
        System.out.println("Highest: " + scores.pollLast());  // 99 removed
        System.out.println("Remaining: " + scores);
    }
}`,
        output: `Scores in [60, 90): [60, 75, 88]
Lowest: 45
Highest: 99
Remaining: [60, 75, 88, 92]`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Failing to override hashCode() when overriding equals() for HashSet elements',
        whyItHappens: 'If two objects are logically equal via `equals()` but produce different `hashCode()` values, they will be routed to different buckets in the backing HashMap, creating duplicate entries.',
        howToFix: 'Always override `hashCode()` whenever you override `equals()`. Ensure both methods reference the exact same identifying fields.'
      },
      {
        mistake: 'Mutating an object after adding it to a HashSet',
        whyItHappens: 'If fields contributing to `hashCode()` are mutated while an object sits inside a HashSet, its hash code changes. The next call to `set.contains(object)` calculates the NEW bucket index, fails to find it, and returns `false`, causing silent memory leaks.',
        howToFix: 'Use immutable objects (e.g. Java records, String, Integer) or immutable ID fields as Set elements.'
      },
      {
        mistake: 'Adding null to a TreeSet',
        whyItHappens: 'HashSet allows a null element, so developers expect TreeSet to allow it too. However, TreeSet must invoke `compareTo()` on the added element, throwing `NullPointerException`.',
        howToFix: 'Do not store nulls in a TreeSet, or provide a custom Comparator using `Comparator.nullsFirst(...)`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: HashSet with Custom Class Missing hashCode()',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return this.x == p.x && this.y == p.y;
    }
    // Note: hashCode() is NOT overridden!
}

public class Puzzle1 {
    public static void main(String[] args) {
        Set<Point> set = new HashSet<>();
        set.add(new Point(1, 2));
        set.add(new Point(1, 2));
        System.out.println(set.size());
    }
}`,
        options: [
          'A) 1',
          'B) 2',
          'C) Throws NullPointerException',
          'D) Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Without hashCode() overridden, what determines the bucket index for each Point?',
        solution: 'Option B is correct: 2',
        explanation: 'Because `hashCode()` is not overridden, `Point` inherits `Object.hashCode()` which returns default memory-derived identity hash codes. The two `new Point(1, 2)` instances yield different hash codes, landing in different buckets. `equals()` is never even checked between them, resulting in `size = 2`.'
      },
      {
        title: 'Puzzle 2: TreeSet compareTo Equality vs equals()',
        problemStatement: 'What is the output of this TreeSet code?',
        code: `import java.util.*;

public class Puzzle2 {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
        set.add("java");
        set.add("JAVA");
        set.add("Java");
        System.out.println(set.size() + ":" + set.first());
    }
}`,
        options: [
          'A) 3:java',
          'B) 1:java',
          'C) 1:JAVA',
          'D) 3:Java'
        ],
        correctOptionIndex: 1,
        hint: 'String.CASE_INSENSITIVE_ORDER returns 0 when strings differ only by case.',
        solution: 'Option B is correct: 1:java',
        explanation: '`String.CASE_INSENSITIVE_ORDER` treats "java", "JAVA", and "Java" as identical because `compare()` returns 0. `TreeSet` considers elements identical when `compare == 0`, rejecting the subsequent additions as duplicates. The first added string "java" is retained.'
      },
      {
        title: 'Puzzle 3: Adding null to HashSet vs TreeSet',
        problemStatement: 'What happens when executing this code?',
        code: `import java.util.*;

public class Puzzle3 {
    public static void main(String[] args) {
        Set<String> hs = new HashSet<>();
        hs.add(null);
        System.out.print(hs.size() + " ");

        Set<String> ts = new TreeSet<>();
        try {
            ts.add(null);
            System.out.print(ts.size());
        } catch (NullPointerException e) {
            System.out.print("NPE");
        }
    }
}`,
        options: [
          'A) 1 1',
          'B) 1 NPE',
          'C) NPE NPE',
          'D) 0 NPE'
        ],
        correctOptionIndex: 1,
        hint: 'HashSet maps null to bucket 0; TreeSet invokes compareTo() on the element.',
        solution: 'Option B is correct: 1 NPE',
        explanation: '`HashSet` permits one `null` element, placing it safely in bucket 0 of the backing HashMap. `TreeSet` invokes `element.compareTo()`, which immediately throws `NullPointerException` on `null`.'
      },
      {
        title: 'Puzzle 4: LinkedHashSet Iteration Order',
        problemStatement: 'What is the iteration output of this LinkedHashSet?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        Set<Integer> set = new LinkedHashSet<>();
        set.add(30);
        set.add(10);
        set.add(20);
        set.add(10); // duplicate
        for (int v : set) System.out.print(v + " ");
    }
}`,
        options: [
          'A) 10 20 30',
          'B) 30 10 20',
          'C) 30 20 10',
          'D) Unpredictable'
        ],
        correctOptionIndex: 1,
        hint: 'Does re-adding an existing element in LinkedHashSet update its position?',
        solution: 'Option B is correct: 30 10 20',
        explanation: '`LinkedHashSet` preserves the original insertion order. When `set.add(10)` is called a second time, it is rejected as a duplicate and does NOT alter the existing insertion position. Elements are iterated in original insertion order: 30, 10, 20.'
      },
      {
        title: 'Puzzle 5: Mutating Element in HashSet and Finding It',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

class Key {
    int id;
    Key(int id) { this.id = id; }
    public boolean equals(Object o) { return o instanceof Key && ((Key)o).id == this.id; }
    public int hashCode() { return id; }
}

public class Puzzle5 {
    public static void main(String[] args) {
        Set<Key> set = new HashSet<>();
        Key k = new Key(5);
        set.add(k);
        k.id = 10; // Mutate the key after adding!
        System.out.println(set.contains(k));
    }
}`,
        options: [
          'A) true',
          'B) false',
          'C) Throws ConcurrentModificationException',
          'D) Throws IllegalStateException'
        ],
        correctOptionIndex: 1,
        hint: 'Which bucket does contains() inspect when k.id is now 10?',
        solution: 'Option B is correct: false',
        explanation: 'When `k` was added, its hashCode was 5, placing it in bucket (5 % tableLength). After mutating `k.id = 10`, `set.contains(k)` hashes `k` to bucket (10 % tableLength). It searches that bucket, finds nothing (or other keys), and returns `false`! The object is effectively lost inside the HashSet.'
      },
      {
        title: 'Puzzle 6: TreeSet Range Operations: headSet and tailSet',
        problemStatement: 'What does this code output?',
        code: `import java.util.*;

public class Puzzle6 {
    public static void main(String[] args) {
        TreeSet<Integer> ts = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50));
        SortedSet<Integer> head = ts.headSet(30); // strictly < 30
        SortedSet<Integer> tail = ts.tailSet(30); // >= 30
        System.out.println(head.size() + ":" + tail.size());
    }
}`,
        options: [
          'A) 3:3',
          'B) 2:3',
          'C) 3:2',
          'D) 2:2'
        ],
        correctOptionIndex: 1,
        hint: 'In SortedSet, headSet(toElement) is exclusive (< toElement); tailSet(fromElement) is inclusive (>= fromElement).',
        solution: 'Option B is correct: 2:3',
        explanation: '`headSet(30)` contains elements strictly less than 30: `{10, 20}` (size 2). `tailSet(30)` contains elements greater than or equal to 30: `{30, 40, 50}` (size 3). Output is "2:3".'
      },
      {
        title: 'Puzzle 7: Duplicate Element in Set.of()',
        problemStatement: 'What occurs when executing this line?',
        code: `import java.util.Set;

public class Puzzle7 {
    public static void main(String[] args) {
        Set<String> s = Set.of("A", "B", "A");
        System.out.println(s.size());
    }
}`,
        options: [
          'A) Prints 2 (duplicate silently ignored)',
          'B) Throws IllegalArgumentException',
          'C) Throws UnsupportedOperationException',
          'D) Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Java 9 Set.of factory strictly forbids duplicate arguments.',
        solution: 'Option B is correct: Throws IllegalArgumentException',
        explanation: 'Unlike `new HashSet<>(Arrays.asList(...))` which silently deduplicates, `Set.of()` is intentionally strict: if duplicate elements are passed, it throws `IllegalArgumentException: duplicate element: A`.'
      },
      {
        title: 'Puzzle 8: TreeSet floor() vs lower()',
        problemStatement: 'What is printed by floor() and lower() for an exact match?',
        code: `import java.util.TreeSet;

public class Puzzle8 {
    public static void main(String[] args) {
        TreeSet<Integer> ts = new TreeSet<>();
        ts.add(10);
        ts.add(20);
        ts.add(30);
        System.out.println(ts.floor(20) + ":" + ts.lower(20));
    }
}`,
        options: [
          'A) 20:20',
          'B) 20:10',
          'C) 10:10',
          'D) 10:null'
        ],
        correctOptionIndex: 1,
        hint: 'floor(e) is <= e; lower(e) is strictly < e.',
        solution: 'Option B is correct: 20:10',
        explanation: '`floor(20)` returns the greatest element less than or equal to 20, which is 20 itself. `lower(20)` returns the greatest element strictly less than 20, which is 10. Output is "20:10".'
      },
      {
        title: 'Puzzle 9: Modifying Backing TreeSet via SubSet View',
        problemStatement: 'What is printed after adding an element through a subSet view?',
        code: `import java.util.*;

public class Puzzle9 {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 40, 50));
        SortedSet<Integer> sub = set.subSet(15, 45); // [20, 40]
        sub.add(30);
        System.out.println(set);
    }
}`,
        options: [
          'A) [10, 20, 40, 50]',
          'B) [10, 20, 30, 40, 50]',
          'C) Throws UnsupportedOperationException',
          'D) Throws IllegalArgumentException'
        ],
        correctOptionIndex: 1,
        hint: 'subSet is a write-through view of the parent TreeSet as long as the added element falls within bounds.',
        solution: 'Option B is correct: [10, 20, 30, 40, 50]',
        explanation: 'SubSet is a dynamic view backed by the underlying TreeSet. Since 30 falls within the range [15, 45), `sub.add(30)` writes directly into the parent TreeSet, inserting 30 into the Red-Black tree.'
      },
      {
        title: 'Puzzle 10: SubSet View Adding Out-of-Bounds Element',
        problemStatement: 'What happens when adding an element outside the subSet range?',
        code: `import java.util.*;

public class Puzzle10 {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 40, 50));
        SortedSet<Integer> sub = set.subSet(15, 45);
        try {
            sub.add(60); // 60 is outside [15, 45)
        } catch (IllegalArgumentException e) {
            System.out.println("Range error caught!");
        }
    }
}`,
        options: [
          'A) 60 is added to parent set',
          'B) Range error caught!',
          'C) 60 is ignored silently',
          'D) Throws IndexOutOfBoundsException'
        ],
        correctOptionIndex: 1,
        hint: 'SubSet views strictly validate that any added elements stay within range boundaries.',
        solution: 'Option B is correct: Range error caught!',
        explanation: 'A subSet view enforces range bounds: inserting an element outside `[fromKey, toKey)` causes the view to throw `IllegalArgumentException: key out of range`.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain how HashSet works internally in Java. How does it ensure no duplicate elements are stored?',
        answer: 'HashSet is backed by an internal HashMap: `private transient HashMap<E, Object> map`. When `hashSet.add(e)` is called, it executes `map.put(e, PRESENT)`, where `PRESENT` is a static dummy Object. To check for duplicates, HashMap computes `hash(e)` and locates the bucket index. If the bucket is empty, a new node is created. If nodes already exist in the bucket, it traverses the collision chain comparing both `hash` and `(node.key == e || (e != null && e.equals(node.key)))`. If an equal key is found, `map.put()` overwrites the value and returns the old value (PRESENT). Since the return value is not null, `hashSet.add(e)` returns `false`, signaling duplicate rejection.',
        followUp: 'What is the purpose of the dummy PRESENT object in HashSet?',
        followUpAnswer: 'Since Map requires a (key, value) pair for every entry, HashSet supplies a single shared dummy Object reference (`PRESENT = new Object()`) for all entries. Reusing a single static instance avoids creating separate value objects on the heap.',
        keyPhrases: [
          'Backed by internal HashMap',
          'Stores elements as keys with dummy PRESENT value',
          'Checks hash equality and equals()',
          'add() returns false when map.put() returns non-null'
        ],
        commonMistakeAnswer: 'Thinking HashSet is an array of elements or that it uses compareTo to find duplicates.'
      },
      {
        question: 'What is the contract between equals() and hashCode()? What catastrophic bug occurs if this contract is violated in a HashSet?',
        answer: 'The contract states: If two objects are equal according to `equals(Object)`, they MUST produce the identical integer result from `hashCode()`. However, two unequal objects may produce the same hash code (a hash collision). If you override `equals()` but fail to override `hashCode()`, two logically identical objects will inherit default identity hash codes from `Object` based on distinct memory addresses. Consequently, when added to a `HashSet`, they will map to different buckets, and `HashSet` will store both duplicates side-by-side, violating the fundamental set contract!',
        followUp: 'If two objects have the same hashCode(), are they guaranteed to be equal according to equals()?',
        followUpAnswer: 'No, this is a hash collision. Different objects can produce the same hash code because 32-bit integers are finite (2^32 possible values), whereas the universe of possible objects is infinite. In such cases, HashMap chains them in the same bucket and distinguishes them via equals().',
        keyPhrases: [
          'Equal objects must have equal hashCodes',
          'Unequal hashCodes place equal objects in different buckets',
          'Duplicates slip past HashSet without error',
          'Hash collisions are handled via equals()'
        ],
        commonMistakeAnswer: 'Asserting that if hashCode() is equal, the objects must be equal.'
      },
      {
        question: 'How does LinkedHashSet preserve insertion order while maintaining O(1) performance?',
        answer: 'LinkedHashSet extends HashSet and delegates to LinkedHashMap. Internally, each entry is an `Entry<K, V>` subclass that adds `before` and `after` pointer references. When an element is added, it is indexed into the hash table array for O(1) bucket lookups, and simultaneously appended to the end of a doubly-linked circular list connecting all entries. When iterating over the LinkedHashSet, the iterator simply follows the `after` pointers from head to tail in O(N) time, completely bypassing empty table buckets.',
        followUp: 'Does re-inserting an existing element in a LinkedHashSet move it to the end of the iteration order?',
        followUpAnswer: 'No, calling add() on an existing element has no effect on its position in the doubly-linked list. Its original insertion order is preserved. To achieve an access-order LRU cache behavior, you must use LinkedHashMap directly with its accessOrder constructor flag.',
        keyPhrases: [
          'Extends HashSet and uses LinkedHashMap',
          'Doubly-linked list across entries (before/after)',
          'O(1) hash lookup + O(1) pointer updates',
          'Re-inserting duplicates does not change order'
        ],
        commonMistakeAnswer: 'Claiming LinkedHashSet sorts elements by timestamp or maintains an ArrayList of keys.'
      },
      {
        question: 'Why does TreeSet determine uniqueness based on compareTo() / compare() rather than equals()?',
        answer: 'TreeSet is backed by TreeMap, which is a Red-Black binary search tree. When traversing the tree to insert or look up an element, TreeMap evaluates `compare(element, node.key)`. If the result is negative, it traverses left; if positive, it traverses right. If `compare(a, b) == 0`, it concludes that the keys are identical and updates the value, without ever calling `equals()`. Therefore, in a TreeSet, uniqueness and sorting are unified under the Comparator/Comparable contract.',
        followUp: 'What happens if a class implements Comparable such that compareTo() returns 0 for two objects where equals() returns false?',
        followUpAnswer: 'TreeSet will reject the second object as a duplicate, while HashSet would accept both. This violates the general Set contract (which specifies uniqueness according to equals). The Java specification strongly recommends that natural ordering be consistent with equals: `(x.compareTo(y) == 0) == (x.equals(y))`.',
        keyPhrases: [
          'Backed by Red-Black tree (TreeMap)',
          'compare(a, b) == 0 defines uniqueness',
          'equals() is completely bypassed',
          'Ordering should be consistent with equals'
        ],
        commonMistakeAnswer: 'Believing TreeSet calls equals() when compareTo() returns 0.'
      },
      {
        question: 'Compare HashSet, LinkedHashSet, and TreeSet in terms of time complexity, memory overhead, and ordering.',
        answer: 'HashSet provides O(1) average time for add/remove/contains, has no ordering guarantee, and incurs moderate memory overhead (HashMap node + dummy object). LinkedHashSet provides O(1) average time, preserves FIFO insertion order, and incurs higher memory overhead (extra before/after pointers per node). TreeSet provides guaranteed O(log N) time for add/remove/contains, sorts elements naturally or via custom Comparator, and incurs tree node overhead (left, right, parent pointers, red/black boolean bit). Choose HashSet for general performance, LinkedHashSet for predictable iteration, and TreeSet for sorted order and range queries.',
        followUp: 'Why is TreeSet not the default choice if it provides automatic sorting?',
        followUpAnswer: 'Because O(log N) is asymptotically slower than O(1) hash lookups, especially as N scales to millions of elements. Furthermore, Red-Black tree pointer rotations and balancing add CPU cache miss overhead compared to flat hash bucket access.',
        keyPhrases: [
          'HashSet: O(1) average, no order',
          'LinkedHashSet: O(1) average, insertion order',
          'TreeSet: O(log N) guaranteed, sorted order',
          'TreeSet enables NavigableSet range queries'
        ],
        commonMistakeAnswer: 'Saying TreeSet is O(1) or that HashSet uses less memory than an ArrayList.'
      },
      {
        question: 'Explain NavigableSet methods in TreeSet: floor, ceiling, lower, higher. How do they differ?',
        answer: 'These four methods provide boundary-relative element searches in O(log N) time. `floor(e)` returns the greatest element in the set less than or equal to e (<= e). `ceiling(e)` returns the least element in the set greater than or equal to e (>= e). In contrast, `lower(e)` returns the greatest element strictly less than e (< e), and `higher(e)` returns the least element strictly greater than e (> e). If no matching element exists, each returns null.',
        followUp: 'How do pollFirst() and pollLast() operate in NavigableSet?',
        followUpAnswer: '`pollFirst()` retrieves and removes the lowest (first) element from the set, or returns null if empty. `pollLast()` retrieves and removes the highest (last) element. Both execute in O(log N) time.',
        keyPhrases: [
          'floor(e) is <= e (inclusive)',
          'ceiling(e) is >= e (inclusive)',
          'lower(e) is < e (strictly exclusive)',
          'higher(e) is > e (strictly exclusive)',
          'pollFirst() and pollLast() remove extremes'
        ],
        commonMistakeAnswer: 'Confusing floor with lower, or ceiling with higher regarding inclusivity of the query key.'
      },
      {
        question: 'What is the effect of mutating an object after it has been stored in a HashSet?',
        answer: 'If any fields that determine the object`s hashCode() are mutated, its hash code changes. However, the object remains parked in the bucket corresponding to its original hash code calculated during add(). When `contains(object)` or `remove(object)` is later invoked, HashSet calculates the new hash code, navigates to the wrong bucket, and reports `false`! The object becomes un-removable and invisible to normal queries, creating a severe memory leak. If another object happens to land in the original bucket, equals() may also fail.',
        followUp: 'How do you design domain classes intended to be stored in Sets safely?',
        followUpAnswer: 'Make Set element classes immutable: declare fields `final`, provide no setter methods, and use Java records or value-based classes. If mutability is necessary, base equals() and hashCode() strictly on a unique immutable identifier (like an immutable UUID or database primary key).',
        keyPhrases: [
          'Hash code recalculation directs queries to wrong bucket',
          'contains() and remove() fail to locate object',
          'Leads to silent memory leaks',
          'Use immutable objects or immutable ID fields'
        ],
        commonMistakeAnswer: 'Thinking HashSet dynamically rehashes objects automatically when their internal fields change.'
      },
      {
        question: 'Why does TreeSet reject null elements by throwing NullPointerException, whereas HashSet allows a null element?',
        answer: 'HashSet allows null because HashMap permits null keys: it handles null keys as a special case, assigning them hash code 0 and placing them directly in bucket 0 without calling null.hashCode(). Conversely, TreeSet relies on comparing elements: when adding an element into a Red-Black tree, it must compare it against existing nodes by calling `e.compareTo(node.key)` or `comparator.compare(e, node.key)`. Calling compareTo on or with null results in an immediate NullPointerException.',
        followUp: 'Can you configure a TreeSet to accept null elements?',
        followUpAnswer: 'Yes, by providing an explicit custom Comparator that handles nulls, such as `Comparator.nullsFirst(Comparator.naturalOrder())` or `Comparator.nullsLast(...)`. However, storing null in sorted sets is generally discouraged as it complicates range queries.',
        keyPhrases: [
          'HashSet routes null to bucket 0',
          'TreeSet invokes compareTo() which NPEs on null',
          'Custom Comparator.nullsFirst allows null in TreeSet',
          'Null in sorted sets is discouraged'
        ],
        commonMistakeAnswer: 'Believing TreeSet allows one null as long as the set is initially empty.'
      },
      {
        question: 'What is a subSet view in TreeSet, and how are range bounds enforced?',
        answer: '`treeSet.subSet(fromElement, fromInclusive, toElement, toInclusive)` returns a NavigableSet view of the portion of this set whose elements range from `fromElement` to `toElement`. The returned set is backed by the original TreeSet, so changes in one reflect in the other. Range bounds are strictly validated on mutations: attempting to insert an element outside the specified range into the subSet view immediately throws `IllegalArgumentException`.',
        followUp: 'Does creating a subSet duplicate the underlying Red-Black tree?',
        followUpAnswer: 'No, it allocates a lightweight wrapper object (`AscendingSubMap` or `NavigableSubSet`) holding the parent map reference and the bounding keys. Lookup and insertion operations navigate the parent tree while clipping bounds at O(log N).',
        keyPhrases: [
          'Lightweight view backed by parent tree',
          'Mutations write through to parent set',
          'Out-of-range insertions throw IllegalArgumentException',
          'No duplication of tree nodes'
        ],
        commonMistakeAnswer: 'Thinking subSet creates an independent deep-copy of the elements.'
      },
      {
        question: 'How do you create a thread-safe Set in Java?',
        answer: 'There are several approaches depending on the concurrency profile: 1) `Collections.synchronizedSet(new HashSet<>())`, which wraps the set and synchronizes all methods on a shared mutex (requires manual synchronization during iteration); 2) `ConcurrentHashMap.newKeySet()`, which returns a thread-safe, high-concurrency Set backed by ConcurrentHashMap supporting lock-striped operations; 3) `CopyOnWriteArraySet`, which is backed by CopyOnWriteArrayList and is optimal for read-heavy, write-rare scenarios where iterators never throw ConcurrentModificationException.',
        followUp: 'Which thread-safe set implementation is best for high-throughput multi-threaded writes?',
        followUpAnswer: '`ConcurrentHashMap.newKeySet()` is the standard production choice for high concurrent throughput. It uses synchronized bucket heads and CAS (Compare-And-Swap) operations to allow multiple threads to write to different buckets concurrently without blocking.',
        keyPhrases: [
          'Collections.synchronizedSet with mutex',
          'ConcurrentHashMap.newKeySet() for high concurrency',
          'CopyOnWriteArraySet for read-heavy workloads',
          'CAS operations and bucket-level locks'
        ],
        commonMistakeAnswer: 'Recommending CopyOnWriteArraySet for write-heavy multi-threaded systems.'
      }
    ],
    miniQuiz: [
      {
        question: 'What underlying data structure does java.util.HashSet use to store its elements?',
        options: [
          'A dynamic resizable array of objects',
          'A java.util.HashMap where elements are keys and values are a dummy Object',
          'A singly-linked list with no duplicates',
          'A balanced AVL tree'
        ],
        correctIndex: 1,
        explanation: 'HashSet is an adapter around an internal `HashMap<E, Object>`, storing elements as keys associated with a shared dummy `PRESENT` Object.'
      },
      {
        question: 'What is the iteration order of java.util.LinkedHashSet?',
        options: [
          'Ascending natural sorted order',
          'Unpredictable bucket order',
          'The exact order in which elements were inserted (FIFO)',
          'Descending order of hash codes'
        ],
        correctIndex: 2,
        explanation: 'LinkedHashSet maintains a doubly-linked list through all its entries, guaranteeing iteration in the exact order elements were inserted.'
      },
      {
        question: 'How does java.util.TreeSet determine whether two elements are duplicate?',
        options: [
          'By comparing their hashCode() and calling equals()',
          'By checking if compareTo() or compare() returns 0',
          'By checking if their memory reference addresses are identical (==)',
          'By serializing the objects to byte arrays'
        ],
        correctIndex: 1,
        explanation: 'TreeSet relies entirely on its sorting Comparator or Comparable: if `compare(a, b) == 0`, the elements are treated as duplicates, completely bypassing equals().'
      },
      {
        question: 'What happens if you invoke `set.add(null)` on a default java.util.TreeSet?',
        options: [
          'null is inserted at the beginning of the set',
          'null is silently ignored and returns false',
          'Throws NullPointerException',
          'null is placed at the root of the tree'
        ],
        correctIndex: 2,
        explanation: 'TreeSet must invoke `compareTo()` to locate the node insertion position. Comparing against `null` triggers `NullPointerException`.'
      },
      {
        question: 'What is the time complexity of add(), remove(), and contains() in a TreeSet with N elements?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctIndex: 1,
        explanation: 'Because TreeSet is backed by a self-balancing Red-Black binary search tree, all basic operations run in guaranteed O(log N) time.'
      },
      {
        question: 'What happens if you mutate a field of an object stored in a HashSet that alters its hashCode()?',
        options: [
          'The HashSet automatically moves the object to its new bucket',
          'Subsequent contains() or remove() calls may fail to find the object because they search the wrong bucket',
          'ConcurrentModificationException is thrown immediately',
          'The object is automatically deleted'
        ],
        correctIndex: 1,
        explanation: 'Mutating hashCode fields leaves the object in its original bucket. Inquiries calculate the new hash and check a different bucket, failing to find the object.'
      },
      {
        question: 'Which method on NavigableSet returns the greatest element strictly less than the given element e?',
        options: [
          'floor(e)',
          'lower(e)',
          'ceiling(e)',
          'pollFirst()'
        ],
        correctIndex: 1,
        explanation: '`lower(e)` returns the greatest element strictly less than e (< e), whereas `floor(e)` allows equality (<= e).'
      },
      {
        question: 'What does Set.of("apple", "banana", "apple") do at runtime?',
        options: [
          'Creates a Set containing ["apple", "banana"]',
          'Throws IllegalArgumentException because duplicates are strictly forbidden in Set.of()',
          'Throws NullPointerException',
          'Returns an empty set'
        ],
        correctIndex: 1,
        explanation: 'Java 9 `Set.of()` factory methods intentionally throw `IllegalArgumentException` if any duplicate elements are detected.'
      },
      {
        question: 'Why does HashSet require that if a.equals(b) is true, a.hashCode() == b.hashCode() must also be true?',
        options: [
          'To ensure both objects get compiled to the same bytecode',
          'To guarantee that equal objects are routed to the same hash bucket so duplicate checks can succeed',
          'To prevent garbage collection of duplicate objects',
          'To enable binary search on the bucket array'
        ],
        correctIndex: 1,
        explanation: 'If equal objects produce different hash codes, they land in different buckets and HashSet cannot detect the duplicate, resulting in duplicate storage.'
      },
      {
        question: 'Which Set implementation is recommended for thread-safe high-throughput read/write concurrency in modern Java?',
        options: [
          'Collections.synchronizedSet(new TreeSet<>())',
          'ConcurrentHashMap.newKeySet()',
          'Vector',
          'CopyOnWriteArraySet for write-heavy workloads'
        ],
        correctIndex: 1,
        explanation: '`ConcurrentHashMap.newKeySet()` uses non-blocking algorithms and lock striping across buckets, offering superior concurrent throughput.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 18.4: Queue, Deque & PriorityQueue Internals
  // ─────────────────────────────────────────────────────────────
  'queue-deque-and-priorityqueue': {
    id: 'queue-deque-and-priorityqueue',
    moduleId: 'java-collections',
    moduleTitle: '18. Collections Framework',
    lessonNumber: 'Lesson 18.4',
    title: 'Queue, Deque & PriorityQueue Internals',
    subtitle: 'FIFO Queue contracts, ArrayDeque circular ring-buffer, PriorityQueue binary min-heap array representation, siftUp/siftDown algorithms, and thread-safe queues',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine three ticket booths at an amusement park. The first booth is a standard turnstile (`Queue`): people line up at the back and exit at the front (FIFO). In Java, this turnstile comes in two flavors of rules: strict rules that scream with an alarm if you break protocol (`add`, `remove`, `element` throw exceptions), and courteous rules that return a polite warning code (`offer`, `poll`, `peek` return false or null). The second booth is a revolving circular carousel (`ArrayDeque`): passengers can hop on or off at both front and back effortlessly, spinning around a circular ring buffer without ever shifting anyone. The third booth is a VIP emergency triage (`PriorityQueue`): guests do NOT exit in the order they arrived; instead, an energetic nurse reorganizes them into a binary heap pyramid. The sickest patient is always perched right at the apex, ready to be treated next in $O(\\log N)$ time!',
    interviewTakeaways: [
      'Two Sets of Queue Methods: The `Queue` interface declares two distinct API philosophies: 1) Exception-throwing on failure: `add(e)`, `remove()`, `element()`; 2) Special value (null/false) on failure: `offer(e)`, `poll()`, `peek()`. Always prefer `offer()`, `poll()`, and `peek()` in robust production code.',
      'ArrayDeque Circular Ring Buffer: `ArrayDeque` uses a resizable contiguous array `Object[] elements` with head and tail pointers. Because capacity is strictly maintained as a power of two, wrap-around index arithmetic is executed via ultra-fast bitwise AND: `head = (head - 1) & (elements.length - 1)` and `tail = (tail + 1) & (elements.length - 1)`.',
      'PriorityQueue Binary Heap: `PriorityQueue` is an unbounded priority queue backed by an array representation of a complete binary min-heap. For an element at index $i$: parent is at `(i - 1) >>> 1`, left child is at `(i << 1) + 1`, and right child is at `(i << 1) + 2`.',
      'Heapification Algorithms: Adding an element invokes `siftUp(k, x)` ($O(\\log N)$), bubbling the new element up to restore the min-heap invariant. Removing the root invokes `poll()` which places the last leaf at index 0 and calls `siftDown(k, x)` ($O(\\log N)$), pushing it down by swapping with the smaller child.',
      'PriorityQueue Bulk Initialization: Constructing a `PriorityQueue` from an existing collection via `new PriorityQueue<>(collection)` uses Floyd`s linear heapify algorithm, running in $O(N)$ time, NOT $O(N \\log N)$!',
      'Stack & Concurrency Recommendations: `ArrayDeque` is the official modern replacement for `java.util.Stack`. For multi-threaded producer-consumer architectures, use `BlockingQueue` implementations (`ArrayBlockingQueue`, `LinkedBlockingQueue`) or lock-free `ConcurrentLinkedQueue`.'
    ],
    cheatSheet: {
      summary: 'Queue defines FIFO ordering with exception-throwing vs special-value methods. ArrayDeque implements a high-performance circular ring buffer for Stack/Queue. PriorityQueue maintains a binary min-heap in an array with O(log N) siftUp/siftDown.',
      syntaxTemplate: `// Recommended Queue / Deque instantiation
Queue<String> queue = new ArrayDeque<>();
queue.offer("task1"); // Returns false if capacity restricted
String head = queue.poll(); // Returns null if empty

// PriorityQueue Min-Heap and Max-Heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>(); // Natural lowest first
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());

// LIFO Stack using Deque (replaces java.util.Stack)
Deque<String> stack = new ArrayDeque<>();
stack.push("A");
String top = stack.pop();`,
      rules: [
        { rule: 'Avoid Exception-Throwing Methods', explanation: 'Use offer(), poll(), peek() instead of add(), remove(), element() to handle empty/full bounds gracefully without exception overhead.' },
        { rule: 'ArrayDeque Null Rejection', explanation: 'ArrayDeque strictly forbids null elements because poll() and peek() use null as an empty sentinel indicator.' },
        { rule: 'PriorityQueue Heap Order Trap', explanation: 'Iterating over a PriorityQueue does NOT yield sorted elements! Only repetitive calls to poll() guarantee sorted priority order.' },
        { rule: 'Power of Two Capacity in ArrayDeque', explanation: 'ArrayDeque capacity is always a power of 2, allowing index wrapping with (tail + 1) & (length - 1) without costly modulo (%) operations.' },
        { rule: 'Floyd Linear Heap Construction', explanation: 'Instantiating PriorityQueue from an existing list runs in O(N) time by sifting down from (size/2 - 1) down to 0.' }
      ],
      quickComparison: [
        { aspect: 'Queue Implementation', optionA: 'ArrayDeque: Circular array ring buffer, $O(1)$ amortized', optionB: 'PriorityQueue: Binary min-heap array, $O(\\log N)$ offer/poll' },
        { aspect: 'Stack Implementation', optionA: 'ArrayDeque: High cache locality, lock-free, zero node alloc', optionB: 'java.util.Stack: Legacy, synchronized method overhead, extends Vector' },
        { aspect: 'Empty Removal (poll vs remove)', optionA: 'poll(): Returns null safely', optionB: 'remove(): Throws NoSuchElementException' },
        { aspect: 'Null Element Policy', optionA: 'ArrayDeque: NullPointerException on null', optionB: 'PriorityQueue: NullPointerException on null (needs compareTo)' }
      ]
    },
    coreExplanation: [
      'The `Queue` interface models a collection designed for holding elements prior to processing. Beyond basic `Collection` operations, queues introduce insertion, extraction, and inspection methods.',
      'The Queue API divides methods into two distinct categories: one set throws exceptions when operations fail (`add`, `remove`, `element`), while the other returns special sentinel values (`offer` returns false, `poll` returns null, `peek` returns null).',
      '`Deque` (Double Ended Queue) extends `Queue` to support element insertion and removal at both endpoints. `Deque` can be used directly as a FIFO Queue or as a LIFO Stack. It formally supersedes the legacy `java.util.Stack` class.',
      '`ArrayDeque` is the premier resizable array implementation of `Deque`. It maintains `head` and `tail` index pointers into an `Object[] elements` array. The array is treated as a circular ring buffer: when `tail` reaches the end of the array, it wraps around to index 0.',
      'To make wrap-around index computation near instantaneous, `ArrayDeque` enforces that capacity is always an exact power of two ($2^k$). This allows the expensive mathematical modulo operator `(index + 1) % capacity` to be replaced with the single CPU clock cycle bitwise AND: `(index + 1) & (capacity - 1)`.',
      '`PriorityQueue` represents an unbounded priority queue based on a binary min-heap stored in an array `Object[] queue`. Elements are ordered according to natural order or a provided `Comparator`.',
      'The binary heap invariant dictates that for every node $k$, the value at $k$ is less than or equal to values at its children ($2k+1$ and $2k+2$). The minimum element is always stored at `queue[0]`, allowing $O(1)$ `peek()`.',
      'When an element is added, `siftUp` is executed: the element is placed at index `size` and iteratively swapped with its parent until heap order is restored ($O(\\log N)$). When `poll()` removes the root, the last leaf replaces `queue[0]` and `siftDown` pushes it down by swapping with the smaller child ($O(\\log N)$).'
    ],
    diagram: `ARRAYDEQUE RING BUFFER VS PRIORITYQUEUE BINARY HEAP
========================================================================

1. ARRAYDEQUE: CIRCULAR RING BUFFER (Capacity = 8, Mask = 7)
   Indices:   0     1     2     3     4     5     6     7
           ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
   Array:  │  C  │  D  │ null│ null│ null│ null│  A  │  B  │
           └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
                         ▲                       ▲
                       tail = 2                head = 6
   - Elements stored logically: A -> B -> C -> D
   - pollFirst() returns A, head advances: (6 + 1) & 7 = 7
   - offerLast(E) writes to tail, tail advances: (2 + 1) & 7 = 3

2. PRIORITYQUEUE: BINARY MIN-HEAP IN AN ARRAY
   Tree Representation:                 Array Layout:
            [ 10 ] (index 0)            Indices:  0   1   2   3   4   5
           /      \\                     Values: [10, 15, 20, 40, 50, 30]
        [ 15 ]    [ 20 ]                - Root = index 0 (Min = 10)
        /    \\    /                     - Left Child of i = 2*i + 1
     [ 40 ] [ 50][ 30 ]                 - Right Child of i = 2*i + 2
                                        - Parent of i = (i - 1) / 2
   - peek() = array[0] -> O(1)
   - offer() -> Append to end + siftUp -> O(log N)
   - poll()  -> Swap with array[0] + siftDown -> O(log N)`,
    codeSnippet: {
      title: 'PriorityQueue Min-Heap vs Max-Heap Demonstration',
      code: `import java.util.*;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        // 1. Min-Heap (Natural ordering: smallest emerges first)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(Arrays.asList(40, 10, 30, 5, 20));

        System.out.print("Min-Heap poll order: ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " "); // 5, 10, 20, 30, 40
        }
        System.out.println();

        // 2. Max-Heap using Collections.reverseOrder()
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.addAll(Arrays.asList(40, 10, 30, 5, 20));

        System.out.print("Max-Heap poll order: ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " "); // 40, 30, 20, 10, 5
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'PriorityQueue<Integer> minHeap = new PriorityQueue<>();', explanation: 'Creates a binary min-heap where lowest numerical values have highest priority.' },
        { line: 'minHeap.addAll(...);', explanation: 'Inserts elements into the heap; bulk heapify organizes them in array heap order.' },
        { line: 'System.out.print(minHeap.poll() + " ");', explanation: 'Extracts the root element (queue[0]) in O(log N) time via siftDown algorithm.' },
        { line: 'new PriorityQueue<>(Collections.reverseOrder());', explanation: 'Supplies a reverse Comparator to invert the heap invariant into a max-heap.' },
        { line: 'maxHeap.poll();', explanation: 'Extracts the maximum integer on every extraction cycle.' }
      ],
      output: `Min-Heap poll order: 5 10 20 30 40 
Max-Heap poll order: 40 30 20 10 5`
    },
    codeExamples: [
      {
        title: 'ArrayDeque as a High-Performance LIFO Stack',
        description: 'Demonstrating how ArrayDeque replaces legacy java.util.Stack for bracket matching.',
        code: `import java.util.*;

public class ArrayDequeStackDemo {
    public static boolean isValidParentheses(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("Valid '({[]})': " + isValidParentheses("({[]})"));
        System.out.println("Valid '([)]':   " + isValidParentheses("([)]"));
    }
}`,
        output: `Valid '({[]})': true
Valid '([)]':   false`
      },
      {
        title: 'PriorityQueue Iteration Order Trap',
        description: 'Demonstrates why enhanced for-loop iteration on a PriorityQueue does NOT print sorted elements.',
        code: `import java.util.PriorityQueue;

public class PriorityQueueIterationTrap {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.add(50);
        pq.add(10);
        pq.add(30);
        pq.add(20);
        pq.add(5);

        // Printing via for-each prints raw backing array layout, NOT sorted order!
        System.out.print("For-each iteration: ");
        for (int val : pq) {
            System.out.print(val + " ");
        }
        System.out.println();

        // Polling extracts elements in true sorted priority order
        System.out.print("Polling order:      ");
        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " ");
        }
        System.out.println();
    }
}`,
        output: `For-each iteration: 5 10 30 50 20 
Polling order:      5 10 20 30 50`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Iterating over a PriorityQueue expecting sorted output',
        whyItHappens: 'A binary heap array only guarantees that `parent <= children`. It does not maintain a total sorted order across siblings or array indices.',
        howToFix: 'To process elements in sorted order, drain the queue using `while (!pq.isEmpty()) pq.poll();` or convert to a list and sort.'
      },
      {
        mistake: 'Using java.util.Stack instead of Deque / ArrayDeque',
        whyItHappens: '`java.util.Stack` extends `Vector`, synchronizing every single method invocation and degrading performance in single-threaded code.',
        howToFix: 'Use `Deque<T> stack = new ArrayDeque<>()` with `push()`, `pop()`, and `peek()`.'
      },
      {
        mistake: 'Inserting null into an ArrayDeque or PriorityQueue',
        whyItHappens: 'In `ArrayDeque`, `null` is used as a sentinel return value by `poll()` and `peek()` to indicate emptiness, so adding null throws `NullPointerException`. In `PriorityQueue`, comparing against null throws NPE.',
        howToFix: 'Never insert `null` into queues; use `Optional` wrappers or sentinel empty objects if null representation is required.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Queue add() vs offer() on Bounded Capacity',
        problemStatement: 'What is the fundamental difference when a bounded queue reaches full capacity?',
        code: `// Bounded Queue of capacity 2
// queue.add("Third");
// vs
// queue.offer("Third");`,
        options: [
          'A) add() returns false, offer() throws IllegalStateException',
          'B) add() throws IllegalStateException, offer() returns false',
          'C) Both throw NoSuchElementException',
          'D) Both silently drop the element'
        ],
        correctOptionIndex: 1,
        hint: 'Review the two method families of the Queue interface.',
        solution: 'Option B is correct: add() throws IllegalStateException, offer() returns false',
        explanation: 'In the `Queue` interface, `add(e)` belongs to the exception-throwing family (throws `IllegalStateException: Queue full`). `offer(e)` belongs to the special-value family and returns `false` gracefully.'
      },
      {
        title: 'Puzzle 2: PriorityQueue Top-K Frequent Element Ordering',
        problemStatement: 'What does this PriorityQueue code output?',
        code: `import java.util.*;

public class Puzzle2 {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>(3);
        int[] nums = {4, 1, 8, 2, 9, 3};
        for (int n : nums) {
            pq.offer(n);
            if (pq.size() > 3) {
                pq.poll();
            }
        }
        System.out.println(pq.peek());
    }
}`,
        options: [
          'A) 1',
          'B) 4',
          'C) 8',
          'D) 9'
        ],
        correctOptionIndex: 1,
        hint: 'This is the standard K-th largest pattern using a min-heap of size K.',
        solution: 'Option B is correct: 4',
        explanation: 'The min-heap retains the 3 largest elements seen so far by evicting the smallest element whenever size exceeds 3. For `{4, 1, 8, 2, 9, 3}`, the 3 largest elements are `{4, 8, 9}`. `pq.peek()` returns the minimum of these 3, which is 4 (the 3rd largest element).'
      },
      {
        title: 'Puzzle 3: ArrayDeque Bitwise Circular Index Calculation',
        problemStatement: 'An ArrayDeque has capacity 8 (mask = 7). If head is at index 0 and addFirst() is called, what is the new head index?',
        code: `// ArrayDeque internal head calculation:
// head = (head - 1) & (elements.length - 1);
// With head = 0 and elements.length = 8:`,
        options: [
          'A) -1',
          'B) 7',
          'C) 0',
          'D) 8'
        ],
        correctOptionIndex: 1,
        hint: 'Compute (0 - 1) & 7 in 32-bit two-complement arithmetic.',
        solution: 'Option B is correct: 7',
        explanation: '-1 in binary is `0xFFFFFFFF`. `0xFFFFFFFF & 7 = 7`. This wraps the head pointer to the last slot of the array in a single clock cycle without conditional branching.'
      },
      {
        title: 'Puzzle 4: PriorityQueue Custom Comparator Stability',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        PriorityQueue<String> pq = new PriorityQueue<>((a, b) -> a.length() - b.length());
        pq.offer("banana");
        pq.offer("kiwi");
        pq.offer("apple");
        pq.offer("fig");
        System.out.println(pq.poll() + ":" + pq.poll());
    }
}`,
        options: [
          'A) fig:kiwi',
          'B) kiwi:fig',
          'C) apple:kiwi',
          'D) banana:apple'
        ],
        correctOptionIndex: 0,
        hint: 'Sort order is by string length ascending.',
        solution: 'Option A is correct: fig:kiwi',
        explanation: 'Length of "fig" is 3 (smallest), so it is polled first. Length of "kiwi" and "apple" are 4 and 5; 4 is smaller than 5, so "kiwi" is polled second. Output is "fig:kiwi".'
      },
      {
        title: 'Puzzle 5: Deque push() vs offer() Semantics',
        problemStatement: 'What does this code print?',
        code: `import java.util.*;

public class Puzzle5 {
    public static void main(String[] args) {
        Deque<Integer> dq = new ArrayDeque<>();
        dq.push(10);
        dq.offer(20);
        dq.push(30);
        System.out.println(dq.pop() + ":" + dq.poll());
    }
}`,
        options: [
          'A) 30:10',
          'B) 10:20',
          'C) 30:20',
          'D) 10:30'
        ],
        correctOptionIndex: 0,
        hint: 'push() adds to the front (head); offer() adds to the back (tail). pop() removes from head; poll() removes from head.',
        solution: 'Option A is correct: 30:10',
        explanation: '`dq.push(10)` -> head: `[10]`. `dq.offer(20)` adds to tail -> `[10, 20]`. `dq.push(30)` adds to head -> `[30, 10, 20]`. `pop()` removes head -> returns 30 (queue is now `[10, 20]`). `poll()` removes head -> returns 10. Output is "30:10".'
      },
      {
        title: 'Puzzle 6: PriorityQueue Constructor Floyd Heapify Time Complexity',
        problemStatement: 'What is the time complexity of constructing a PriorityQueue from an existing List of N elements using `new PriorityQueue<>(list)`?',
        code: `List<Integer> list = Arrays.asList(5, 2, 9, 1, 7, 6, 3);
PriorityQueue<Integer> pq = new PriorityQueue<>(list);`,
        options: [
          'A) O(1)',
          'B) O(N)',
          'C) O(N log N)',
          'D) O(N^2)'
        ],
        correctOptionIndex: 1,
        hint: 'Floyd bottom-up heap construction runs in linear time.',
        solution: 'Option B is correct: O(N)',
        explanation: 'When initializing a PriorityQueue from a collection, Java uses Floyd`s bottom-up heapification algorithm (calling `siftDown` starting from index `(size >>> 1) - 1` down to 0). Mathematically, the sum of node heights forms a convergent series that bounds total operations to strictly $O(N)$ time.'
      },
      {
        title: 'Puzzle 7: PriorityQueue Heap Invariant during Mutation',
        problemStatement: 'What happens if an object in a PriorityQueue has its priority field mutated after insertion?',
        code: `import java.util.PriorityQueue;

class Task implements Comparable<Task> {
    int priority;
    Task(int p) { this.priority = p; }
    public int compareTo(Task o) { return Integer.compare(this.priority, o.priority); }
}

public class Puzzle7 {
    public static void main(String[] args) {
        PriorityQueue<Task> pq = new PriorityQueue<>();
        Task t1 = new Task(10);
        Task t2 = new Task(20);
        pq.offer(t1);
        pq.offer(t2);
        t2.priority = 1; // Mutate after insertion!
        System.out.println(pq.poll().priority);
    }
}`,
        options: [
          'A) Prints 1',
          'B) Prints 10',
          'C) Throws ConcurrentModificationException',
          'D) Throws IllegalStateException'
        ],
        correctOptionIndex: 1,
        hint: 'Does PriorityQueue re-heapify automatically when internal object fields change?',
        solution: 'Option B is correct: Prints 10',
        explanation: 'PriorityQueue does NOT monitor element state. Changing `t2.priority = 1` does NOT trigger `siftUp` or `siftDown`. `t1` (priority 10) remains sitting at root index 0, so `poll()` returns `t1` (priority 10).'
      },
      {
        title: 'Puzzle 8: Empty Queue poll() vs remove()',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle8 {
    public static void main(String[] args) {
        Queue<String> q = new ArrayDeque<>();
        System.out.print(q.poll() + " ");
        try {
            System.out.print(q.remove());
        } catch (NoSuchElementException e) {
            System.out.print("NSEE");
        }
    }
}`,
        options: [
          'A) null null',
          'B) null NSEE',
          'C) NSEE NSEE',
          'D) false NSEE'
        ],
        correctOptionIndex: 1,
        hint: 'poll() returns null when empty; remove() throws NoSuchElementException.',
        solution: 'Option B is correct: null NSEE',
        explanation: '`q.poll()` safely returns `null` on an empty queue. `q.remove()` throws `NoSuchElementException` when invoked on an empty queue.'
      },
      {
        title: 'Puzzle 9: ArrayDeque Capacity Expansion',
        problemStatement: 'What triggers resizing in an ArrayDeque, and how much does it expand?',
        code: `// ArrayDeque internal check when adding:
// if ((tail = (tail + 1) & (elements.length - 1)) == head)
//     doubleCapacity();`,
        options: [
          'A) Resizes when 75% full, expands by 1.5x',
          'B) Resizes when head == tail (100% full), doubles capacity (2.0x)',
          'C) Resizes when 50% full, adds 16 slots',
          'D) Never resizes; it is fixed-capacity'
        ],
        correctOptionIndex: 1,
        hint: 'ArrayDeque has no empty sentinel slots when completely full.',
        solution: 'Option B is correct: Resizes when head == tail (100% full), doubles capacity (2.0x)',
        explanation: 'In `ArrayDeque`, when adding an element causes `tail == head`, the circular buffer is completely full. It calls `doubleCapacity()`, doubling the array length to the next power of 2.'
      },
      {
        title: 'Puzzle 10: PriorityQueue with Null Element',
        problemStatement: 'What happens when offering null to a PriorityQueue?',
        code: `import java.util.PriorityQueue;

public class Puzzle10 {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        try {
            pq.offer(null);
        } catch (NullPointerException e) {
            System.out.println("NPE Caught");
        }
    }
}`,
        options: [
          'A) null is added to root index 0',
          'B) offer() returns false',
          'C) NPE Caught',
          'D) Silent no-op'
        ],
        correctOptionIndex: 2,
        hint: 'PriorityQueue must compare elements to maintain heap order.',
        solution: 'Option C is correct: NPE Caught',
        explanation: '`PriorityQueue` explicitly forbids `null` elements. Calling `offer(null)` immediately throws `NullPointerException`.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the internal architecture of ArrayDeque. How does it implement a circular buffer using bitwise operations?',
        answer: 'ArrayDeque is backed by an `Object[] elements` array whose length is strictly maintained as a power of two (e.g. 16, 32, 64). It maintains two integer pointers: `head` (pointing to the current front element) and `tail` (pointing to the next available slot at the end). When elements are added or removed, pointers wrap around the array boundaries. Because capacity is always a power of two, the modulo operation `(index % capacity)` is replaced by the bitwise operation `(index & (capacity - 1))`. When adding to the front, `head = (head - 1) & (elements.length - 1)`. When adding to the back, `tail = (tail + 1) & (elements.length - 1)`. When `head == tail`, the buffer is full and capacity is doubled.',
        followUp: 'Why does ArrayDeque strictly forbid null elements?',
        followUpAnswer: 'Because methods like poll(), peek(), pollFirst(), and pollLast() use null as a sentinel return value to signify that the deque is empty. Allowing null elements would create ambiguity between an empty deque and a deque containing a null element.',
        keyPhrases: [
          'Circular array ring buffer with head and tail',
          'Capacity is strictly a power of two',
          'Bitwise wrap-around: index & (length - 1)',
          'Null is forbidden as empty sentinel'
        ],
        commonMistakeAnswer: 'Assuming ArrayDeque shifts elements like ArrayList on addFirst() or pollFirst().'
      },
      {
        question: 'How does PriorityQueue implement a binary min-heap internally? What are the array index relationships?',
        answer: 'PriorityQueue represents a complete binary tree stored compactly in a contiguous array `Object[] queue`. For any node located at index `i`: its parent is located at index `(i - 1) >>> 1`, its left child is at `(i << 1) + 1` (or `2i + 1`), and its right child is at `(i << 1) + 2` (or `2i + 2`). The min-heap property ensures that for every node `i`, `queue[parent(i)] <= queue[i]`. The minimum element is always stored at `queue[0]`, allowing O(1) peek(). Insertions (siftUp) and extractions (siftDown) both run in O(log N) time.',
        followUp: 'Why is an array representation preferred over a linked tree of Node objects for a binary heap?',
        followUpAnswer: 'Because a complete binary tree has no gaps, it maps perfectly to array indices without wasting space. Array storage eliminates node pointer overhead (saving 16-24 bytes per node) and provides optimal CPU cache line locality during heap traversals.',
        keyPhrases: [
          'Complete binary heap in contiguous array',
          'Parent: (i - 1) >>> 1',
          'Left child: 2i + 1, Right child: 2i + 2',
          'Min element at index 0 in O(1)',
          'siftUp and siftDown in O(log N)'
        ],
        commonMistakeAnswer: 'Mixing up child and parent index formulas or thinking PriorityQueue sorts all elements.'
      },
      {
        question: 'Explain the difference between siftUp and siftDown in PriorityQueue.',
        answer: '`siftUp(k, x)` is used during insertion (`offer`). The new element `x` is initially placed at index `k = size`. It is compared with its parent at `(k - 1) >>> 1`. If `x` is smaller than its parent, the parent is shifted down into slot `k`, and `k` becomes the parent index. This repeats upward until the parent is smaller or the root is reached ($O(\\log N)$). `siftDown(k, x)` is used during extraction (`poll`). The root element `queue[0]` is removed, and the last leaf `x = queue[--size]` is placed at root `k = 0`. It compares `x` against the smaller of its two children: if the smaller child is less than `x`, that child shifts up into slot `k`, and `k` moves down to that child position. This repeats downward until heap order is restored ($O(\\log N)$).',
        followUp: 'Why is siftDown faster than siftUp in bulk heap construction?',
        followUpAnswer: 'In a binary heap, the majority of nodes reside at the bottom levels (half the nodes are leaves with height 0). SiftDown starts from the middle and moves down, so the vast majority of nodes perform at most 0 or 1 comparisons. In contrast, SiftUp from leaves forces the largest layer of nodes to travel the full tree height, which would take O(N log N) instead of O(N).',
        keyPhrases: [
          'siftUp bubbles new element upward from leaf',
          'siftDown pushes replacement element downward from root',
          'Both operate in O(log N) worst-case time',
          'Swaps are avoided by shifting values and inserting at the end'
        ],
        commonMistakeAnswer: 'Thinking that full two-way element swaps occur at every level rather than single shifts.'
      },
      {
        question: 'Why does constructing a PriorityQueue from an existing Collection run in O(N) time instead of O(N log N)?',
        answer: 'When a PriorityQueue is initialized with a collection via `new PriorityQueue<>(collection)`, it does NOT call `offer()` N times (which would take O(N log N)). Instead, it copies all elements into the array and executes Floyd`s heap construction algorithm (`heapify()`). It loops backward starting from the last non-leaf node: `for (int i = (size >>> 1) - 1; i >= 0; i--) siftDown(i, (E) queue[i]);`. The number of operations is proportional to the sum of heights of all nodes, which converges to a geometric series bounded by $O(N)$.',
        followUp: 'At what index does the last non-leaf parent node reside in an array heap of size N?',
        followUpAnswer: 'It resides at index `(N >>> 1) - 1` (or `(N / 2) - 1`). All nodes from index `N / 2` to `N - 1` are leaves and have no children to sift down.',
        keyPhrases: [
          'Floyd bottom-up heapify algorithm',
          'Starts from last non-leaf parent: (size >>> 1) - 1',
          'Iterates downward to index 0 calling siftDown',
          'Sum of node heights converges to O(N)'
        ],
        commonMistakeAnswer: 'Asserting that creating a heap from an array of N items always takes O(N log N).'
      },
      {
        question: 'Why is java.util.Stack deprecated in spirit, and why should you use ArrayDeque instead?',
        answer: '`java.util.Stack` was introduced in Java 1.0 and extends `Vector`. Because it inherits from `Vector`, every single method (push, pop, peek, size) is individually synchronized with object monitor locks. This creates heavy locking overhead in single-threaded contexts. Furthermore, because it extends `Vector`, it violates the LIFO stack abstraction by allowing arbitrary index-based operations like `stack.insertElementAt("item", 2)` or `stack.get(0)`. Java officially recommends using the `Deque` interface with `ArrayDeque` (`Deque<T> stack = new ArrayDeque<>()`), which is lock-free, highly cache-localized, and strictly enforces stack semantics.',
        followUp: 'Is ArrayDeque thread-safe?',
        followUpAnswer: 'No, ArrayDeque is not thread-safe. If multiple threads access it concurrently and at least one thread mutates it, it must be synchronized externally, or a concurrent collection like ConcurrentLinkedDeque or LinkedBlockingDeque must be used.',
        keyPhrases: [
          'Stack extends Vector with synchronized locking overhead',
          'Violates LIFO abstraction by exposing vector indexed methods',
          'ArrayDeque is faster, cache-friendly, and lock-free',
          'Deque<T> stack = new ArrayDeque<>() is best practice'
        ],
        commonMistakeAnswer: 'Thinking ArrayDeque is thread-safe because it replaced Stack.'
      },
      {
        question: 'Contrast the Queue method pairs: add/offer, remove/poll, element/peek. When should you use which?',
        answer: 'The Queue interface defines two parallel sets of methods: 1) The exception-throwing group: `add(e)` (throws IllegalStateException if full), `remove()` (throws NoSuchElementException if empty), and `element()` (throws NoSuchElementException if empty). 2) The special-value group: `offer(e)` (returns false if full), `poll()` (returns null if empty), and `peek()` (returns null if empty). In production software, the special-value group (`offer`, `poll`, `peek`) is strongly preferred because throwing and catching exceptions is computationally expensive and poll/peek allow clean null checks.',
        followUp: 'What exception does queue.element() throw when the queue is empty?',
        followUpAnswer: 'It throws `NoSuchElementException`. In contrast, `queue.peek()` returns `null`.',
        keyPhrases: [
          'add/remove/element throw exceptions on failure',
          'offer/poll/peek return false/null on failure',
          'Exception throwing incurs heavy stack-trace creation overhead',
          'Special-value methods are preferred in production'
        ],
        commonMistakeAnswer: 'Confusing which method returns null versus false on failure.'
      },
      {
        question: 'How do you implement a Max-Heap using Java PriorityQueue?',
        answer: 'By default, Java`s PriorityQueue is a Min-Heap. To convert it into a Max-Heap, pass a descending Comparator to the constructor: `PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());` or using a lambda: `new PriorityQueue<>((a, b) -> b.compareTo(a));` or `new PriorityQueue<>(Comparator.reverseOrder())`. When `poll()` is called on this queue, the largest element is extracted first.',
        followUp: 'What is a common trap when writing custom Comparators with integer subtraction like (a, b) -> b - a?',
        followUpAnswer: 'Integer overflow! If `b` is `Integer.MAX_VALUE` and `a` is negative, `b - a` overflows to a negative number, corrupting comparator ordering. Always use `Integer.compare(b, a)` instead of subtraction.',
        keyPhrases: [
          'Collections.reverseOrder() or Comparator.reverseOrder()',
          'b.compareTo(a) reverse ordering',
          'Integer subtraction overflow trap: use Integer.compare()',
          'Largest element extracted first on poll()'
        ],
        commonMistakeAnswer: 'Using `(a, b) -> b - a` without guarding against integer underflow/overflow.'
      },
      {
        question: 'Explain how you would implement a Thread-Safe Producer-Consumer queue in Java.',
        answer: 'Use a `BlockingQueue<E>` implementation from `java.util.concurrent`, such as `ArrayBlockingQueue` (bounded, backed by circular array) or `LinkedBlockingQueue` (optionally bounded, backed by nodes with separate putLock and takeLock). The producer invokes `queue.put(item)`, which blocks if the queue is full until space becomes available. The consumer invokes `queue.take()`, which blocks if the queue is empty until an item is offered. Internally, `ArrayBlockingQueue` uses a `ReentrantLock` with two `Condition` variables: `notEmpty` and `notFull`.',
        followUp: 'What is the advantage of LinkedBlockingQueue over ArrayBlockingQueue in high-concurrency systems?',
        followUpAnswer: '`LinkedBlockingQueue` employs two separate locks: `putLock` for producers and `takeLock` for consumers. This allows a producer thread and a consumer thread to operate concurrently without contending for the same lock, whereas `ArrayBlockingQueue` uses a single shared lock for both puts and takes.',
        keyPhrases: [
          'BlockingQueue interface with put() and take()',
          'ArrayBlockingQueue vs LinkedBlockingQueue',
          'ReentrantLock with notEmpty and notFull Condition variables',
          'Separate putLock and takeLock in LinkedBlockingQueue'
        ],
        commonMistakeAnswer: 'Suggesting to synchronize a standard ArrayDeque with a synchronized block instead of using BlockingQueue.'
      },
      {
        question: 'How does PriorityQueue handle elements with equal priority?',
        answer: 'PriorityQueue does NOT guarantee stability or FIFO ordering among elements with equal priority! If multiple elements produce `compare == 0`, their relative retrieval order is arbitrary and depends on internal array positions and tree restructuring during sifts. If FIFO order among equal-priority elements is required, you must design a composite key containing an incremental sequence counter (e.g. `class Task { int priority; long seqNum; }`) and compare `seqNum` when priorities match.',
        followUp: 'Does PriorityQueue implement the NavigableSet interface?',
        followUpAnswer: 'No, PriorityQueue only implements Queue and Collection. It does not implement NavigableSet or SortedSet and does not provide floor(), ceiling(), or range queries.',
        keyPhrases: [
          'PriorityQueue is not a stable queue',
          'Relative order among equal elements is non-deterministic',
          'Use composite key with sequence number for FIFO tie-breaking',
          'Does not implement NavigableSet'
        ],
        commonMistakeAnswer: 'Assuming elements with equal priority will exit in the order they were inserted (FIFO).'
      },
      {
        question: 'What is the time complexity of PriorityQueue.remove(Object o) and PriorityQueue.contains(Object o)?',
        answer: 'Both `PriorityQueue.contains(Object o)` and `PriorityQueue.remove(Object o)` (removing an arbitrary object by value, NOT `poll()`) run in O(N) linear time! Because a binary heap only enforces a vertical partial order (parent <= child) rather than a horizontal sorted order across array slots, finding an arbitrary element requires a full linear scan of the backing array. Once found, `remove(o)` replaces the element with the last leaf and calls `siftDown` or `siftUp`, but the total complexity remains dominated by the $O(N)$ scan.',
        followUp: 'What data structure would you use if you need both O(log N) priority polling AND O(log N) arbitrary element removal?',
        followUpAnswer: 'Use a `TreeSet` (if elements are unique), or an indexed heap / dual structure combining a binary heap with a HashMap tracking array indices for each element (commonly used in Dijkstra`s shortest path algorithm).',
        keyPhrases: [
          'contains(o) requires O(N) linear array scan',
          'remove(o) requires O(N) scan + O(log N) sift',
          'Heap does not support binary search',
          'Indexed heap or TreeSet for fast arbitrary removals'
        ],
        commonMistakeAnswer: 'Assuming remove(Object o) runs in O(log N) time because it is a heap.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which Queue method attempts to retrieve and remove the head of the queue, returning null if the queue is empty?',
        options: [
          'remove()',
          'poll()',
          'element()',
          'peek()'
        ],
        correctIndex: 1,
        explanation: '`poll()` retrieves and removes the head, returning `null` if empty. In contrast, `remove()` throws `NoSuchElementException`.'
      },
      {
        question: 'Why does ArrayDeque compute its internal circular array index using `(tail + 1) & (length - 1)`?',
        options: [
          'Because capacity is strictly a power of 2, making bitwise AND equivalent to modulo while running in a single CPU cycle',
          'Because it avoids negative numbers in Java',
          'Because bitwise operations automatically synchronize threads',
          'Because array indices in Java are stored as 16-bit shorts'
        ],
        correctIndex: 0,
        explanation: 'For any power of two $M = 2^k$, $X \\pmod M \\equiv X \\& (M - 1)$. This replaces expensive division/modulo with a single bitwise AND.'
      },
      {
        question: 'What is the time complexity of `PriorityQueue.peek()`?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctIndex: 0,
        explanation: 'In a binary min-heap stored in an array, the minimum element is always stored at `queue[0]`, enabling instant O(1) inspection.'
      },
      {
        question: 'In a PriorityQueue array representation, what is the index of the parent of a node at index `i`?',
        options: [
          'i / 2',
          '(i - 1) >>> 1',
          '2 * i + 1',
          '2 * i + 2'
        ],
        correctIndex: 1,
        explanation: 'The parent index of node `i` is computed as `(i - 1) >>> 1` (or `(i - 1) / 2`).'
      },
      {
        question: 'What occurs when you iterate through a PriorityQueue using an enhanced for-each loop?',
        options: [
          'Elements are output in exact sorted ascending order',
          'Elements are traversed in the raw order of the underlying heap array, which is NOT fully sorted',
          'ConcurrentModificationException is thrown',
          'Elements are output in reverse sorted order'
        ],
        correctIndex: 1,
        explanation: 'The iterator of a PriorityQueue traverses the backing array sequentially, reflecting heap tree structure rather than a total sorted order.'
      },
      {
        question: 'Which class is the modern, officially recommended replacement for the legacy `java.util.Stack` class?',
        options: [
          'java.util.Vector',
          'java.util.ArrayDeque',
          'java.util.ArrayList',
          'java.util.PriorityQueue'
        ],
        correctIndex: 1,
        explanation: '`ArrayDeque` implementing `Deque` is the recommended stack replacement, providing lock-free, high-performance LIFO operations.'
      },
      {
        question: 'What is the time complexity of `new PriorityQueue<>(existingList)` containing N elements?',
        options: [
          'O(1)',
          'O(N)',
          'O(N log N)',
          'O(N^2)'
        ],
        correctIndex: 1,
        explanation: 'Initializing a PriorityQueue from a collection uses Floyd`s linear heapify algorithm, taking O(N) time.'
      },
      {
        question: 'What happens if you invoke `arrayDeque.add(null)`?',
        options: [
          'null is placed at the end of the queue',
          'Throws NullPointerException',
          'The call returns false',
          'It clears the deque'
        ],
        correctIndex: 1,
        explanation: '`ArrayDeque` strictly rejects null elements to avoid ambiguity with sentinel return values (`null` on empty poll/peek).'
      },
      {
        question: 'What is the time complexity of removing an arbitrary element by value using `priorityQueue.remove(targetObject)`?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctIndex: 2,
        explanation: 'Finding an arbitrary element requires an O(N) linear search through the array because heaps do not maintain horizontal search order.'
      },
      {
        question: 'Which blocking queue implementation uses separate locks for producers (`putLock`) and consumers (`takeLock`)?',
        options: [
          'ArrayBlockingQueue',
          'LinkedBlockingQueue',
          'PriorityBlockingQueue',
          'SynchronousQueue'
        ],
        correctIndex: 1,
        explanation: '`LinkedBlockingQueue` uses two distinct ReentrantLocks (`putLock` and `takeLock`), allowing producers and consumers to operate concurrently.'
      }
    ]
  }
};
