import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 18: COLLECTIONS FRAMEWORK (LESSONS 18.1 & 18.2)
// Authoritative FAANG-Standard Collections Core Curriculum
// ============================================================

export const col18_1_2_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 18.1: Collections Framework Architecture & Iterators
  // ─────────────────────────────────────────────────────────────
  'collections-framework-overview': {
    id: 'collections-framework-overview',
    moduleId: 'java-collections',
    moduleTitle: '18. Collections Framework',
    lessonNumber: 'Lesson 18.1',
    title: 'Collections Framework Architecture & Fail-Fast Iterators',
    subtitle: 'Iterable and Collection hierarchies, List/Set/Queue contracts, fail-fast vs fail-safe iterators, modCount mutation tracking, and ConcurrentModificationException',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Imagine a high-security library reading room where you are cataloging books on a table. The library keeper provides you with a magnifying glass (`Iterator`) that records the exact catalog stamp number (`expectedModCount`) from when you sat down. If another librarian quietly walks up and slips a new book onto your table or removes one (`list.add()` or `list.remove()`), the table badge count (`modCount`) ticks up. The moment you peer through your magnifying glass again (`it.next()`), the numbers do not match! The alarm sounds immediately (`ConcurrentModificationException`). The ONLY sanctioned way to adjust the books is to ask the magnifying glass itself to remove it (`it.remove()`), which updates both your stamp and the table counter simultaneously!',
    interviewTakeaways: [
      'Hierarchy Distinctions: `Iterable<T>` is the root interface of the collections hierarchy (granting `iterator()` and enabling Java enhanced for-each loops). `Collection<E>` extends `Iterable<E>` and unifies `List`, `Set`, and `Queue`. Note that `Map<K, V>` does NOT extend `Collection` or `Iterable` because maps operate on key-value pairs rather than discrete elements.',
      'Core Sub-interface Contracts: `List` preserves insertion order and allows indexed positional access with duplicate elements. `Set` mandates mathematical uniqueness without duplicate entries. `Queue` enforces disciplined processing order (typically FIFO or priority-based).',
      'Fail-Fast Iterator Mechanics: Standard collection iterators maintain an internal `expectedModCount` initialized to the collection`s `modCount`. Any structural modification (add, remove, clear) directly on the collection increments `modCount`. If `modCount != expectedModCount` during `next()` or `remove()`, an immediate `ConcurrentModificationException` is thrown.',
      'Safe Removal Invariant: Never invoke `collection.remove(element)` or `collection.add(element)` while iterating with an enhanced for-loop. Always invoke `iterator.remove()`, or use Java 8+ `collection.removeIf(predicate)`.',
      'Fail-Fast vs Fail-Safe: Collections in `java.util` (ArrayList, HashSet) are fail-fast. Concurrent collections in `java.util.concurrent` (CopyOnWriteArrayList, ConcurrentHashMap) are fail-safe/weakly-consistent: they traverse snapshot arrays or lock buckets without throwing `ConcurrentModificationException`.',
      'ListIterator Superpowers: `ListIterator<E>` extends `Iterator<E>`, allowing bidirectional traversal (`hasPrevious()`, `previous()`), index inspection (`nextIndex()`, `previousIndex()`), in-flight element replacement (`set(E)`), and element insertion (`add(E)`).'
    ],
    cheatSheet: {
      summary: 'The Java Collections Framework standardizes data container interfaces. Iteration is governed by Iterable/Iterator. Structural modifications outside of Iterator.remove() cause fail-fast ConcurrentModificationException via modCount comparison.',
      syntaxTemplate: `// Standard Fail-Safe Iterator Pattern
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String item = it.next();
    if (shouldRemove(item)) {
        it.remove(); // Safely updates expectedModCount and modCount
    }
}

// Java 8+ Functional Predicate Removal (internally safe)
list.removeIf(item -> item.startsWith("EXPIRE_"));`,
      rules: [
        { rule: 'Map Separation', explanation: 'Map does NOT implement Collection or Iterable. To iterate a map, obtain its collection views: entrySet(), keySet(), or values().' },
        { rule: 'modCount Invariant', explanation: 'Any structural change increments modCount. Modifying element contents (e.g. list.get(0).setName(...)) is NOT structural and does not increment modCount.' },
        { rule: 'Iterator.remove() Restriction', explanation: 'it.remove() can only be called ONCE per call to it.next(). Calling it consecutively without an intervening next() throws IllegalStateException.' },
        { rule: 'Bidirectional ListIterator', explanation: 'ListIterator is available strictly on List implementations via list.listIterator(), not on Set or Queue.' },
        { rule: 'Unmodifiable Collections', explanation: 'Collections.unmodifiableList() or List.of() produce immutable views whose iterators throw UnsupportedOperationException on remove().' }
      ],
      quickComparison: [
        { aspect: 'Root Interface', optionA: 'Collection: Iterable<T> (holds elements)', optionB: 'Map: Standalone interface (holds (K, V) pairs)' },
        { aspect: 'Iterator Type', optionA: 'Fail-Fast: Throws CME immediately upon structural change', optionB: 'Fail-Safe (Weakly Consistent): Operates on snapshot/concurrent view' },
        { aspect: 'Removal during Loop', optionA: 'for (T x : list) list.remove(x) -> CME crash', optionB: 'it.remove() or list.removeIf(...) -> Safe & O(N)' },
        { aspect: 'Traversal Direction', optionA: 'Iterator: Forward-only (hasNext(), next(), remove())', optionB: 'ListIterator: Bidirectional (hasPrevious(), previous(), set(), add())' }
      ]
    },
    coreExplanation: [
      'The Java Collections Framework (JCF) provides an architecture for representing and manipulating collections of objects uniformly, abstracting data structure details behind clean, polymorphic interfaces.',
      'At the zenith stands `java.lang.Iterable<T>`, mandating `Iterator<T> iterator()`. Any class implementing `Iterable` qualifies for Java`s compiler syntactic sugar: the enhanced for-each loop.',
      '`java.util.Collection<E>` is the root interface of the actual collection hierarchy, declaring universal operations: `add()`, `remove()`, `contains()`, `size()`, `isEmpty()`, and `toArray()`.',
      'The primary sub-interfaces represent fundamental abstract data types: `List` (ordered sequence with indexed access), `Set` (collection containing no duplicate elements), and `Queue` (ordered staging line for processing).',
      '`Map<K, V>` deliberately resides outside the `Collection` hierarchy because a key-value mapping does not model a collection of standalone elements; instead, it exposes collection views via `keySet()`, `values()`, and `entrySet()`.',
      'Fail-fast behavior is implemented via an internal volatile/int field named `modCount` in abstract classes (`AbstractList`). When an `Iterator` is spawned, it clones `expectedModCount = modCount`.',
      'Every invocation of `it.next()` checks `if (modCount != expectedModCount) throw new ConcurrentModificationException()`. This detection is best-effort and guards against subtle memory race bugs in single-threaded and concurrent contexts.'
    ],
    diagram: `JAVA COLLECTIONS FRAMEWORK HIERARCHY
========================================================================

                 <<interface>>
               java.lang.Iterable
                       ▲
                       │
                 <<interface>>                     <<interface>>
             java.util.Collection                 java.util.Map
             /        │         \\                       ▲
            /         │          \\                      │
  <<interface>>  <<interface>>  <<interface>>           ├── HashMap
      List           Set           Queue                ├── LinkedHashMap
       ▲              ▲              ▲                  ├── TreeMap
       │              │              │                  └── ConcurrentHashMap
       ├── ArrayList  ├── HashSet    ├── PriorityQueue
       ├── LinkedList ├── TreeSet    └── Deque (<<interface>>)
       └── Vector     └── LinkedHashSet       ▲
                                              ├── ArrayDeque
                                              └── LinkedList

------------------------------------------------------------------------
FAIL-FAST MODCOUNT SYNCHRONIZATION MECHANISM
------------------------------------------------------------------------
List State:       [ "Alpha", "Beta", "Gamma" ]  (modCount = 3)
                      ▲
Iterator created:    cursor = 0, expectedModCount = 3

Scenario A (Illegal):
   list.remove(1);   ──> modCount becomes 4!
   it.next();        ──> Checks: (modCount == expectedModCount) => (4 == 3) FALSE!
                     ──> THROWS ConcurrentModificationException!

Scenario B (Legal):
   it.remove();      ──> Removes current element via Iterator
                     ──> Updates modCount = 4 AND expectedModCount = 4
   it.next();        ──> (4 == 4) TRUE, continues safely!`,
    codeSnippet: {
      title: 'Fail-Fast Iterator vs Iterator.remove() Demonstration',
      code: `import java.util.*;

public class IteratorMechanics {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("Java", "Go", "Rust", "Python"));

        // Safe removal using Iterator.remove()
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            String lang = it.next();
            if (lang.equals("Go")) {
                it.remove(); // Synchronizes expectedModCount = modCount
            }
        }
        System.out.println("After safe Iterator.remove: " + list);

        // Demonstrating modern Java 8+ removeIf
        list.removeIf(s -> s.startsWith("P"));
        System.out.println("After removeIf: " + list);
    }
}`,
      lineByLineExplanation: [
        { line: 'List<String> list = new ArrayList<>(...);', explanation: 'Instantiates a mutable ArrayList initialized with four programming language names.' },
        { line: 'Iterator<String> it = list.iterator();', explanation: 'Creates an iterator instance whose internal expectedModCount is set to list.modCount.' },
        { line: 'String lang = it.next();', explanation: 'Advances the internal cursor, checking modCount == expectedModCount prior to returning the reference.' },
        { line: 'it.remove();', explanation: 'Removes the last returned element and updates both list.modCount and it.expectedModCount, keeping them synchronized.' },
        { line: 'list.removeIf(s -> s.startsWith("P"));', explanation: 'Uses Java 8 collection removeIf, which safely strips elements matching the Predicate without ConcurrentModificationException.' }
      ],
      output: `After safe Iterator.remove: [Java, Rust, Python]
After removeIf: [Java, Rust]`
    },
    codeExamples: [
      {
        title: 'Bidirectional Traversal with ListIterator',
        description: 'Demonstrates backward navigation and in-place element replacement using ListIterator.',
        code: `import java.util.*;

public class ListIteratorDemo {
    public static void main(String[] args) {
        List<String> tokens = new ArrayList<>(Arrays.asList("10", "+", "20", "*", "30"));
        ListIterator<String> lit = tokens.listIterator(tokens.size()); // Start at end

        System.out.print("Reverse Traversal: ");
        while (lit.hasPrevious()) {
            String tok = lit.previous();
            System.out.print(tok + " ");
            if (tok.equals("*")) {
                lit.set("MULTIPLY"); // Replace element in-place
            }
        }
        System.out.println("\\nMutated List: " + tokens);
    }
}`,
        output: `Reverse Traversal: 30 * 20 + 10 
Mutated List: [10, +, 20, MULTIPLY, 30]`
      },
      {
        title: 'The Enhanced For-Loop Trap (ConcurrentModificationException)',
        description: 'Demonstrating why invoking list.remove() inside an enhanced for-each loop triggers CME.',
        code: `import java.util.*;

public class ForEachTrap {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        try {
            for (String s : items) {
                if (s.equals("B")) {
                    items.remove(s); // Mutates modCount outside iterator!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught CME as expected due to modCount mismatch!");
        }
    }
}`,
        output: `Caught CME as expected due to modCount mismatch!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Calling list.remove() inside an enhanced for-loop',
        whyItHappens: 'Enhanced for-loops compile into standard Iterator calls (`it.hasNext()` and `it.next()`). Directly mutating the underlying list increments `modCount` without updating `it.expectedModCount`.',
        howToFix: 'Use `Iterator<E> it = list.iterator()` with `it.remove()`, or use `list.removeIf(predicate)`.'
      },
      {
        mistake: 'Calling it.remove() twice in a row without an intervening it.next()',
        whyItHappens: '`it.remove()` removes the element returned by the most recent `next()` call. Calling it again immediately has no referenced element to delete, throwing `IllegalStateException`.',
        howToFix: 'Always ensure exactly one `it.next()` is called before each call to `it.remove()`.'
      },
      {
        mistake: 'Assuming Map implements Collection or Iterable',
        whyItHappens: 'Because maps are part of the Collections Framework, developers intuitively expect `for (Entry e : map)`.',
        howToFix: 'Iterate over `map.entrySet()`, `map.keySet()`, or `map.values()` which return true Collection views.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing the Second-to-Last Element Removal Loophole',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle1 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        for (String s : list) {
            if (s.equals("C")) {
                list.remove(s);
            }
        }
        System.out.println(list);
    }
}`,
        options: [
          'A) [A, B, D]',
          'B) ConcurrentModificationException',
          'C) [A, B, C, D]',
          'D) IndexOutOfBoundsException'
        ],
        correctOptionIndex: 0,
        hint: 'Analyze how ArrayList cursor advances in hasNext() when the second-to-last element is removed.',
        solution: 'Option A is correct: [A, B, D]',
        explanation: 'This is a famous Java edge-case puzzle! When "C" (index 2) is removed, list.size() drops from 4 to 3. The iterator internal cursor was 3 (pointing to index after "C"). In the next iteration, hasNext() checks `cursor != size`, which is `3 != 3` (FALSE)! The loop terminates immediately without ever calling `next()`, so the modCount check is never executed and CME is avoided by quirk! However, relying on this is dangerous and bad practice.'
      },
      {
        title: 'Puzzle 2: Removing the First Element in Enhanced For-Loop',
        problemStatement: 'What is the output when removing the first element during a for-each loop?',
        code: `import java.util.*;

public class Puzzle2 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        for (String s : list) {
            if (s.equals("A")) {
                list.remove(s);
            }
        }
        System.out.println(list);
    }
}`,
        options: [
          'A) [B, C]',
          'B) [A, B, C]',
          'C) Throws ConcurrentModificationException',
          'D) Infinite Loop'
        ],
        correctOptionIndex: 2,
        hint: 'After removing "A", does hasNext() return true for the next iteration?',
        solution: 'Option C is correct: Throws ConcurrentModificationException',
        explanation: 'When "A" is removed, size becomes 2 and cursor is 1. hasNext() checks `1 != 2` (true). In the next iteration, `it.next()` checks `modCount != expectedModCount` (which is 4 != 3) and immediately throws ConcurrentModificationException.'
      },
      {
        title: 'Puzzle 3: Consecutive Iterator.remove() Invocations',
        problemStatement: 'What happens when it.remove() is called consecutively?',
        code: `import java.util.*;

public class Puzzle3 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));
        Iterator<Integer> it = list.iterator();
        it.next();
        it.remove();
        it.remove();
        System.out.println(list.size());
    }
}`,
        options: [
          'A) Prints 1',
          'B) Prints 2',
          'C) Throws IllegalStateException',
          'D) Throws ConcurrentModificationException'
        ],
        correctOptionIndex: 2,
        hint: 'What state must the iterator maintain between next() and remove()?',
        solution: 'Option C is correct: Throws IllegalStateException',
        explanation: '`it.remove()` resets its internal `lastRet` pointer to -1. A second consecutive call to `it.remove()` finds `lastRet < 0` and throws `IllegalStateException: Exception in thread "main" java.lang.IllegalStateException`.'
      },
      {
        title: 'Puzzle 4: ListIterator In-Flight Element Addition',
        problemStatement: 'What is printed after using ListIterator.add()?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B"));
        ListIterator<String> lit = list.listIterator();
        while (lit.hasNext()) {
            String val = lit.next();
            if (val.equals("A")) {
                lit.add("X");
            }
        }
        System.out.println(list);
    }
}`,
        options: [
          'A) [A, B, X]',
          'B) [A, X, B]',
          'C) Throws ConcurrentModificationException',
          'D) Infinite loop adding "X"'
        ],
        correctOptionIndex: 1,
        hint: 'Where does ListIterator.add() insert the element relative to cursor?',
        solution: 'Option B is correct: [A, X, B]',
        explanation: '`lit.add("X")` inserts "X" immediately before the element that would be returned by `next()`, advancing the cursor past the inserted element. Therefore, "X" is NOT traversed again, preventing an infinite loop, and `lit.expectedModCount` is synchronized with `list.modCount`.'
      },
      {
        title: 'Puzzle 5: Modifying Element Content vs Structural Modification',
        problemStatement: 'Does mutating an object inside a collection trigger ConcurrentModificationException?',
        code: `import java.util.*;

class Item {
    String name;
    Item(String n) { this.name = n; }
}

public class Puzzle5 {
    public static void main(String[] args) {
        List<Item> items = new ArrayList<>(Arrays.asList(new Item("A"), new Item("B")));
        for (Item item : items) {
            item.name = item.name.toLowerCase();
        }
        System.out.println(items.get(0).name + items.get(1).name);
    }
}`,
        options: [
          'A) Throws ConcurrentModificationException',
          'B) Prints "ab"',
          'C) Prints "AB"',
          'D) NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'Does altering an object attribute change the size or structural integrity of the ArrayList?',
        solution: 'Option B is correct: Prints "ab"',
        explanation: '`modCount` tracks STRUCTURAL modifications (additions, removals, capacity changes). Mutating the internal state or fields of an element already residing in the list does NOT touch `modCount`, so no CME is thrown.'
      },
      {
        title: 'Puzzle 6: Arrays.asList() Structure Modification Trap',
        problemStatement: 'What happens when calling remove() on an iterator over Arrays.asList()?',
        code: `import java.util.*;

public class Puzzle6 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("1", "2", "3");
        Iterator<String> it = list.iterator();
        while (it.hasNext()) {
            if (it.next().equals("2")) {
                it.remove();
            }
        }
        System.out.println(list.size());
    }
}`,
        options: [
          'A) Prints 2',
          'B) Throws UnsupportedOperationException',
          'C) Throws ConcurrentModificationException',
          'D) Prints 3'
        ],
        correctOptionIndex: 1,
        hint: 'What type of list does Arrays.asList() return?',
        solution: 'Option B is correct: Throws UnsupportedOperationException',
        explanation: '`Arrays.asList()` returns a fixed-size wrapper backed by the original array (`Arrays$ArrayList`). It does not support adding or removing elements. Calling `it.remove()` delegates to `AbstractList.remove()` which throws `UnsupportedOperationException`.'
      },
      {
        title: 'Puzzle 7: Java 8 Collection.removeIf with Unmodifiable List',
        problemStatement: 'What is the outcome of running removeIf on List.of()?',
        code: `import java.util.*;

public class Puzzle7 {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(10, 25, 30, 45);
        try {
            numbers.removeIf(n -> n % 2 == 0);
            System.out.println(numbers);
        } catch (RuntimeException e) {
            System.out.println(e.getClass().getSimpleName());
        }
    }
}`,
        options: [
          'A) Prints [25, 45]',
          'B) Prints UnsupportedOperationException',
          'C) Prints ConcurrentModificationException',
          'D) Prints IllegalArgumentException'
        ],
        correctOptionIndex: 1,
        hint: 'List.of() creates an unmodifiable immutable collection.',
        solution: 'Option B is correct: Prints UnsupportedOperationException',
        explanation: '`List.of()` returns an immutable list instance. Any mutating operation such as `add()`, `remove()`, or `removeIf()` immediately throws `UnsupportedOperationException`.'
      },
      {
        title: 'Puzzle 8: ListIterator Index Positioning',
        problemStatement: 'What does this code output?',
        code: `import java.util.*;

public class Puzzle8 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("X", "Y", "Z"));
        ListIterator<String> lit = list.listIterator();
        lit.next();
        System.out.println(lit.nextIndex() + ":" + lit.previousIndex());
    }
}`,
        options: [
          'A) 0:-1',
          'B) 1:0',
          'C) 2:1',
          'D) 1:1'
        ],
        correctOptionIndex: 1,
        hint: 'After one call to next(), cursor is at index 1. What would nextIndex() and previousIndex() report?',
        solution: 'Option B is correct: 1:0',
        explanation: 'Initially the cursor is at index 0. Calling `lit.next()` returns "X" and advances the cursor to index 1. `nextIndex()` returns the index of the element that would be returned by a subsequent call to `next()` (index 1 for "Y"). `previousIndex()` returns the index of the element that would be returned by `previous()` (index 0 for "X").'
      },
      {
        title: 'Puzzle 9: SubList Structural Invalidation',
        problemStatement: 'What happens to a subList when the parent list is structurally modified?',
        code: `import java.util.*;

public class Puzzle9 {
    public static void main(String[] args) {
        List<String> parent = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        List<String> sub = parent.subList(1, 3); // ["B", "C"]
        parent.add("E");
        try {
            System.out.println(sub.size());
        } catch (ConcurrentModificationException e) {
            System.out.println("CME Caught!");
        }
    }
}`,
        options: [
          'A) Prints 2',
          'B) Prints 3',
          'C) CME Caught!',
          'D) IndexOutOfBoundsException'
        ],
        correctOptionIndex: 2,
        hint: 'Does subList hold a reference to parent modCount?',
        solution: 'Option C is correct: CME Caught!',
        explanation: '`subList()` returns a view backed by the original list. The SubList view stores the parent`s `modCount` at creation. If the parent list is structurally modified directly, any subsequent operation on the subList detects the mismatch and throws `ConcurrentModificationException`.'
      },
      {
        title: 'Puzzle 10: Collection.removeAll with Self-Reference',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle10 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 2, 1));
        list.removeAll(Collections.singleton(2));
        System.out.println(list);
    }
}`,
        options: [
          'A) [1, 3, 2, 1]',
          'B) [1, 3, 1]',
          'C) [1, 2, 3, 2, 1]',
          'D) Throws ConcurrentModificationException'
        ],
        correctOptionIndex: 1,
        hint: 'Collections.singleton(2) produces an immutable set containing only 2. removeAll removes ALL occurrences.',
        solution: 'Option B is correct: [1, 3, 1]',
        explanation: '`removeAll(c)` strips all elements from `list` that are contained in the specified collection. `Collections.singleton(2)` contains 2, so both occurrences of 2 are cleanly removed in O(N) time without throwing CME.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the root of the Java Collections Framework, and why does Map not extend Collection?',
        answer: 'The root of the element-based collection hierarchy is java.lang.Iterable<T>, which java.util.Collection<E> extends. Map<K, V> does not extend Collection or Iterable because maps operate on key-value pairs rather than discrete standalone elements. An element in Collection represents a single item, whereas a map entry represents a bidirectional associative mapping. Furthermore, operations like add(E) in Collection do not make sense for Map, which requires put(K, V). Instead, Map provides collection views through entrySet(), keySet(), and values().',
        followUp: 'How do you iterate over a Map using Java enhanced for-loops if Map does not implement Iterable?',
        followUpAnswer: 'You invoke map.entrySet() which returns a Set<Map.Entry<K, V>>. Because Set implements Collection which implements Iterable, you can write: `for (Map.Entry<K, V> entry : map.entrySet()) { ... }`. Alternatively, use map.forEach((k, v) -> ...).',
        keyPhrases: [
          'Iterable is the root interface',
          'Map operates on key-value associations',
          'Incompatible API contracts (add vs put)',
          'Collection views: entrySet(), keySet(), values()'
        ],
        commonMistakeAnswer: 'Saying Collection is the root interface (forgetting Iterable), or claiming Map was just forgotten in early Java versions.'
      },
      {
        question: 'Explain how fail-fast iterators work internally in Java. What is the role of modCount?',
        answer: 'Fail-fast iterators detect concurrent or external structural modifications during iteration to fail immediately rather than yielding non-deterministic behavior. In classes like ArrayList, a protected int field named modCount increments every time a structural mutation occurs (add, remove, clear, ensureCapacity). When an iterator is instantiated, it records expectedModCount = modCount. On every invocation of next() or remove(), it performs a check: `if (modCount != expectedModCount) throw new ConcurrentModificationException()`.',
        followUp: 'Does the fail-fast mechanism guarantee thread-safety in multi-threaded programs?',
        followUpAnswer: 'No, fail-fast behavior is not guaranteed in multi-threaded environments. The modCount check is best-effort and is not performed atomically with the data read. In concurrent execution without synchronization, race conditions can cause stale reads or missed updates. For thread-safe iteration, use concurrent collections like ConcurrentHashMap or CopyOnWriteArrayList.',
        keyPhrases: [
          'modCount tracks structural changes',
          'expectedModCount snapshot in Iterator',
          'Best-effort detection mechanism',
          'Not a guarantee of multi-threaded safety'
        ],
        commonMistakeAnswer: 'Believing modCount is an atomic lock or that fail-fast iterators prevent data corruption in multi-threaded code.'
      },
      {
        question: 'What is the difference between fail-fast and fail-safe (weakly consistent) iterators?',
        answer: 'Fail-fast iterators (found in java.util collections like ArrayList, HashSet, HashMap) operate directly on the backing data structure. If modified during iteration outside the iterator`s own remove() method, they immediately throw ConcurrentModificationException. Fail-safe or weakly-consistent iterators (found in java.util.concurrent like CopyOnWriteArrayList, ConcurrentHashMap) operate on a cloned snapshot of the backing array or maintain bucket-level concurrent pointers. They never throw ConcurrentModificationException and can tolerate concurrent modifications, though they may or may not reflect modifications made after iterator creation.',
        followUp: 'What is the performance trade-off of CopyOnWriteArrayList over ArrayList?',
        followUpAnswer: 'CopyOnWriteArrayList creates a brand-new copy of the underlying array on EVERY write operation (add, set, remove), resulting in O(N) write cost and high GC memory churn. However, read operations (get, iteration) are purely lock-free and extremely fast O(1). It is only optimal for read-heavy, write-rare scenarios such as event listener registries.',
        keyPhrases: [
          'Fail-fast throws CME via modCount',
          'Fail-safe operates on snapshot or concurrent view',
          'Weakly consistent guarantees',
          'CopyOnWriteArrayList O(N) writes'
        ],
        commonMistakeAnswer: 'Thinking fail-safe iterators always return the absolute latest data written by other threads in real time.'
      },
      {
        question: 'Why does removing an element using list.remove(x) inside an enhanced for-each loop throw ConcurrentModificationException?',
        answer: 'Because Java`s enhanced for-each loop is syntactic sugar compiled into bytecode that uses an Iterator. The loop initializes an Iterator instance with expectedModCount = list.modCount. When list.remove(x) is called, it increments list.modCount directly. In the next iteration, the loop invokes iterator.next(), which compares list.modCount against expectedModCount. Finding a discrepancy, it throws ConcurrentModificationException. The correct approach is either to use an explicit Iterator with it.remove() or use list.removeIf(predicate).',
        followUp: 'Why does removing the second-to-last element sometimes NOT throw ConcurrentModificationException?',
        followUpAnswer: 'When the second-to-last element is removed, list.size() decreases by 1. Because the iterator`s cursor already advanced to that exact index, hasNext() checks `cursor != size`. Since cursor now equals size, hasNext() returns false and the loop terminates gracefully before next() is ever invoked to check modCount!',
        keyPhrases: [
          'Syntactic sugar compiles to Iterator',
          'list.remove updates modCount but not expectedModCount',
          'hasNext() cursor == size quirk on second-to-last element',
          'Prefer removeIf or iterator.remove()'
        ],
        commonMistakeAnswer: 'Believing the enhanced for loop uses an index counter under the hood for all collections.'
      },
      {
        question: 'Compare Iterator vs ListIterator. When would you choose ListIterator?',
        answer: 'Iterator is universal across all Collection types and supports forward-only traversal with three methods: hasNext(), next(), and remove(). ListIterator extends Iterator and is exclusively available for List implementations. It provides bidirectional traversal (hasPrevious(), previous()), allows index inspection (nextIndex(), previousIndex()), and enables both element replacement (set(E)) and in-flight element insertion (add(E)). You choose ListIterator when you need to walk backward, insert elements during traversal, or update values without restarting iteration.',
        followUp: 'Does calling listIterator.add(E) trigger ConcurrentModificationException on subsequent next() calls?',
        followUpAnswer: 'No, listIterator.add(E) modifies the list and immediately updates both list.modCount and its own expectedModCount, maintaining synchronization. Furthermore, it advances the cursor past the newly added element so it is not revisited.',
        keyPhrases: [
          'Iterator is forward-only and universal',
          'ListIterator is bidirectional and List-specific',
          'Supports set(), add(), previousIndex(), nextIndex()',
          'Synchronizes expectedModCount during add/set'
        ],
        commonMistakeAnswer: 'Assuming ListIterator can be invoked on a HashSet or TreeSet.'
      },
      {
        question: 'What is the contract and return type of Collection.toArray()? Why are there two overloads?',
        answer: 'The first overload, Object[] toArray(), returns an array containing all elements in the collection, but the runtime type of the returned array is strictly Object[]. It cannot be cast directly to (String[]) without triggering ClassCastException. The second overload, <T> T[] toArray(T[] a), returns an array of the specified generic runtime type. If the provided array is large enough, the elements are stored in it; if not, a new array of the same runtime type and appropriate size is allocated via reflection (Array.newInstance).',
        followUp: 'What is the modern best practice for calling toArray(T[] a) in Java 8 and above?',
        followUpAnswer: 'The modern convention is `list.toArray(new String[0])` or `list.toArray(String[]::new)` in Java 11+. Passing an empty array of size 0 (`new String[0]`) is now preferred by HotSpot JIT over pre-sizing `new String[list.size()]` because modern JVMs optimize zero-sized array allocation and escape analysis more efficiently.',
        keyPhrases: [
          'Object[] toArray loses type information',
          '<T> T[] toArray(T[] a) preserves generic array type',
          'Reflection allocation when array too small',
          'list.toArray(String[]::new) in Java 11+'
        ],
        commonMistakeAnswer: 'Writing `(String[]) list.toArray()` and expecting it to compile and run without ClassCastException.'
      },
      {
        question: 'How does Collection.removeIf(Predicate<? super E> filter) work internally?',
        answer: 'Introduced in Java 8, removeIf takes a functional Predicate and removes all elements satisfying it. In ArrayList, removeIf is overridden with a highly optimized two-pass bit-set algorithm: in the first pass, it evaluates the predicate and records indices to remove in a BitSet without moving any elements; in the second pass, it shifts surviving elements in a single compacting sweep via System.arraycopy, then nulls out trailing references for GC. This achieves O(N) total time and minimizes memory copies compared to repetitive O(N^2) individual removals.',
        followUp: 'What happens if the predicate throws a RuntimeException during removeIf evaluation?',
        followUpAnswer: 'If the predicate throws an exception during evaluation, the operation halts immediately. Because the elements are only shifted after the scan phase in ArrayList, the collection remains unmodified in its original valid state, preserving exception atomicity.',
        keyPhrases: [
          'Java 8 default and overridden method',
          'Two-pass BitSet optimization in ArrayList',
          'Avoids O(N^2) shifting overhead',
          'Atomicity on predicate exception'
        ],
        commonMistakeAnswer: 'Believing removeIf is just a simple while-iterator-remove loop in ArrayList.'
      },
      {
        question: 'What is an unmodifiable view versus an immutable collection in Java?',
        answer: 'An unmodifiable view (produced by Collections.unmodifiableList(list)) is a wrapper delegating to an underlying mutable list. Any mutation calls on the wrapper throw UnsupportedOperationException, but if the underlying backing list is modified directly, the changes are immediately visible through the unmodifiable view! In contrast, a truly immutable collection (created via List.of(), Set.of(), or List.copyOf() in Java 9+) owns its data: it has no underlying mutable backing reference, forbids nulls, cannot be modified by anyone, and is structurally thread-safe.',
        followUp: 'Do List.of() collections permit null elements?',
        followUpAnswer: 'No, Java 9+ factory methods (`List.of`, `Set.of`, `Map.of`) strictly reject null elements, throwing NullPointerException immediately upon creation. This prevents insidious null-pointer bugs and allows aggressive internal memory optimization.',
        keyPhrases: [
          'Unmodifiable view wraps a mutable backing collection',
          'Underlying mutations reflect in unmodifiable views',
          'List.of creates truly immutable data structures',
          'List.of strictly rejects null elements'
        ],
        commonMistakeAnswer: 'Asserting that Collections.unmodifiableList makes a defensive copy of the collection elements.'
      },
      {
        question: 'What is the contract between Iterable and the Java enhanced for-each loop?',
        answer: 'The enhanced for-each loop (`for (Type x : iterable)`) is a compiler language feature that strictly requires the right-hand expression to either be a Java array (`Type[]`) or implement `java.lang.Iterable<T>`. At compile time, the Java compiler translates the for-each loop over an Iterable into an explicit Iterator block with `iterator()`, `hasNext()`, and `next()`. Custom classes can participate in enhanced for-loops simply by implementing `Iterable` and returning an `Iterator`.',
        followUp: 'Can you use a primitive type as the type parameter of Iterable?',
        followUpAnswer: 'No, Java generics do not support primitive types due to type erasure. You must use wrapper classes like `Iterable<Integer>`. For primitive performance, specialized stream types like `IntStream` or third-party primitive libraries (e.g. Eclipse Collections, Trove) are used.',
        keyPhrases: [
          'Requires array or java.lang.Iterable',
          'Compiler emits bytecode for iterator(), hasNext(), next()',
          'Generics require boxed wrapper types',
          'Custom classes can implement Iterable'
        ],
        commonMistakeAnswer: 'Thinking the enhanced for-each loop uses index-based get(i) for List types.'
      },
      {
        question: 'What are the architectural trade-offs of Vector vs ArrayList in Java?',
        answer: 'Vector is a legacy collection from Java 1.0 that was retrofitted into the Collections Framework in Java 2. Every method in Vector (add, get, remove, size) is synchronized at the method level. This synchronization incurs heavy locking overhead even in single-threaded environments. Furthermore, Vector doubles its capacity (100% expansion) when resized, whereas ArrayList expands by 50% (1.5x factor). In modern Java, ArrayList is preferred for single-threaded code, and synchronized wrappers or concurrent collections are used for concurrent needs.',
        followUp: 'How can you obtain a synchronized list from an ArrayList?',
        followUpAnswer: 'By using `Collections.synchronizedList(new ArrayList<>())`. It wraps the ArrayList and synchronizes each method on a shared mutex object. However, during iteration over the synchronized list, manual synchronization on the list object is still required to guarantee thread safety.',
        keyPhrases: [
          'Vector methods are synchronized individually',
          'Heavy performance penalty from unnecessary locking',
          'Vector doubles capacity (2x), ArrayList grows 1.5x',
          'Collections.synchronizedList vs CopyOnWriteArrayList'
        ],
        commonMistakeAnswer: 'Assuming Vector is deprecated (it is legacy, but not officially deprecated with @Deprecated annotation).'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following interfaces is the direct super-interface of java.util.Collection?',
        options: [
          'java.util.Iterator',
          'java.lang.Iterable',
          'java.util.Map',
          'java.lang.Comparable'
        ],
        correctIndex: 1,
        explanation: '`java.util.Collection<E>` extends `java.lang.Iterable<E>`, which defines the `iterator()` method that enables enhanced for-loop syntax.'
      },
      {
        question: 'Why does java.util.Map NOT extend java.util.Collection?',
        options: [
          'Map was introduced in Java 5 while Collection was introduced in Java 1.2',
          'Map handles key-value pairs rather than discrete standalone elements, with incompatible method contracts like put(K, V) vs add(E)',
          'Map is purely an abstract class and cannot implement interfaces',
          'Collections can only hold primitive types while Map holds objects'
        ],
        correctIndex: 1,
        explanation: 'Map models a mapping of keys to values, which is fundamentally different from a collection of individual elements. It provides collection views via entrySet(), keySet(), and values().'
      },
      {
        question: 'What causes a fail-fast iterator to throw ConcurrentModificationException?',
        options: [
          'When two threads access the collection simultaneously without synchronization',
          'When expectedModCount != modCount during iterator operations like next() or remove()',
          'When null elements are added to the collection',
          'When the collection capacity exceeds 16 elements'
        ],
        correctIndex: 1,
        explanation: 'Fail-fast iterators detect structural changes made outside the iterator itself by comparing expectedModCount with the collection`s modCount field.'
      },
      {
        question: 'Which of the following is the SAFE way to remove elements while iterating through a standard ArrayList?',
        options: [
          'for (int i = 0; i < list.size(); i++) { list.remove(i); }',
          'for (String s : list) { if (condition) list.remove(s); }',
          'Iterator<String> it = list.iterator(); while (it.hasNext()) { if (condition(it.next())) it.remove(); }',
          'list.forEach(item -> { if (condition) list.remove(item); });'
        ],
        correctIndex: 2,
        explanation: '`Iterator.remove()` safely updates both `modCount` and `expectedModCount`, preventing `ConcurrentModificationException`.'
      },
      {
        question: 'What happens if you invoke it.remove() immediately after calling it.remove() without an intervening it.next()?',
        options: [
          'It removes the preceding element',
          'It throws IllegalStateException',
          'It throws ConcurrentModificationException',
          'It is a silent no-op'
        ],
        correctIndex: 1,
        explanation: '`it.remove()` can only be invoked once per call to `it.next()`. Multiple consecutive calls throw `IllegalStateException`.'
      },
      {
        question: 'What capability does ListIterator provide that standard Iterator does NOT?',
        options: [
          'Bidirectional traversal (previous/hasPrevious), index retrieval, and in-flight set/add modifications',
          'Thread-safe lock-free iteration across multiple worker threads',
          'Automatic sorting of elements during iteration',
          'Ability to iterate over Maps directly'
        ],
        correctIndex: 0,
        explanation: '`ListIterator` is tailored for Lists, providing bidirectional navigation, current index reporting (`nextIndex`, `previousIndex`), and mutation (`set`, `add`).'
      },
      {
        question: 'What does List.of("A", "B", "C") return?',
        options: [
          'A standard java.util.ArrayList with initial capacity 3',
          'An unmodifiable view backed by an array that permits nulls',
          'A truly immutable list that rejects null elements and throws UnsupportedOperationException on any mutation',
          'A synchronized Vector instance'
        ],
        correctIndex: 2,
        explanation: '`List.of()` returns an immutable list that rejects null elements and throws `UnsupportedOperationException` on attempts to mutate it.'
      },
      {
        question: 'What is the runtime type of the array returned by `list.toArray()` with no arguments?',
        options: [
          'The exact generic type of elements (e.g. String[] if List<String>)',
          'Object[]',
          'ClassCastException at runtime',
          'T[] where T is inferred'
        ],
        correctIndex: 1,
        explanation: 'The no-arg `toArray()` method always returns `Object[]`. To get a typed array, use `list.toArray(new String[0])` or `list.toArray(String[]::new)`.'
      },
      {
        question: 'Which of the following operations on an ArrayList increments modCount?',
        options: [
          'list.get(2)',
          'list.set(2, "newVal")',
          'list.add("newVal")',
          'list.contains("val")'
        ],
        correctIndex: 2,
        explanation: 'Structural modifications (additions, removals, capacity changes) increment `modCount`. In contrast, `list.set(i, val)` replaces an element at an existing index without altering list structure or size, and does NOT increment `modCount`.'
      },
      {
        question: 'How does ArrayList.removeIf(predicate) achieve high performance in Java 8+?',
        options: [
          'It spawns parallel background threads for every element',
          'It uses a two-pass algorithm with a BitSet to record deletion targets, then compacts the surviving elements in a single System.arraycopy sweep',
          'It converts the list to a LinkedList temporarily',
          'It creates a new ArrayList and swaps the internal reference'
        ],
        correctIndex: 1,
        explanation: 'ArrayList overrides `removeIf` with an optimized two-pass algorithm using a BitSet, eliminating repeated array shifting and running in linear O(N) time.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 18.2: ArrayList vs LinkedList Internals
  // ─────────────────────────────────────────────────────────────
  'arraylist-vs-linkedlist-internals': {
    id: 'arraylist-vs-linkedlist-internals',
    moduleId: 'java-collections',
    moduleTitle: '18. Collections Framework',
    lessonNumber: 'Lesson 18.2',
    title: 'ArrayList vs LinkedList Under the Hood',
    subtitle: 'Dynamic resizing factor, elementData array, System.arraycopy, LinkedList doubly-linked Node overhead, CPU cache line locality, and Big-O benchmarks',
    estimatedMinutes: 26,
    beginnerAnalogy: 'Imagine two ways to organize emergency train passengers. An `ArrayList` is a single long passenger coach with consecutive numbered seats. If you ask for seat #42, the conductor strides straight to it instantly ($O(1)$ random access). But when the coach fills up, the entire train must pause, pull up beside a 50% larger empty coach, and copy every passenger over one by one! A `LinkedList`, on the other hand, is a line of passengers holding hands in the dark. Adding someone to the front or back is effortless ($O(1)$ pointer hookup), but finding passenger #42 requires tapping shoulders and asking 41 people in a row ($O(N)$ traversal). Moreover, each person in the chain needs two walkie-talkies (prev and next pointers), eating up 24 extra bytes of memory per person!',
    interviewTakeaways: [
      'Backing Data Structure: `ArrayList` is backed by a contiguous `transient Object[] elementData`. `LinkedList` is backed by a doubly-linked list of private static `Node<E>` objects with `item`, `next`, and `prev` pointers.',
      'Resizing Growth Factor: When full, `ArrayList` grows by 50% using bitwise shift: `int newCapacity = oldCapacity + (oldCapacity >> 1)`. It then executes a native `Arrays.copyOf` (which invokes `System.arraycopy`).',
      'Memory Overhead per Element: `ArrayList` has minimal overhead: 4 or 8 bytes per reference in `elementData`. `LinkedList` allocates a discrete `Node` object for EVERY element, consuming 24 bytes of object overhead (12-byte header + 4-byte item + 4-byte next + 4-byte prev under 32-bit/compressed OOPs) on 64-bit JVMs.',
      'CPU Cache Line Locality: Modern CPUs load memory into 64-byte L1/L2 cache lines. `ArrayList` elements reside contiguously in memory, triggering hardware cache prefetching. `LinkedList` nodes are scattered randomly across the heap, causing frequent CPU cache misses ("pointer chasing").',
      'Algorithmic Complexity Realities: While `LinkedList` offers theoretical $O(1)$ insertion at an iterator position, searching for that position is $O(N)$. `ArrayList.add(index, element)` requires shifting elements via `System.arraycopy`, but CPU cache locality makes it faster than `LinkedList` for sizes up to tens of thousands of elements!',
      'When to Actually Use LinkedList: Almost never in modern production code. Even for FIFO queues, `ArrayDeque` outperforms `LinkedList` by orders of magnitude due to cache locality and zero node allocation.'
    ],
    cheatSheet: {
      summary: 'ArrayList uses a resizable contiguous array with O(1) indexed reads and 1.5x amortized growth. LinkedList uses doubly-linked heap nodes with heavy memory overhead and severe CPU cache misses. ArrayList is almost universally superior.',
      syntaxTemplate: `// Optimal ArrayList instantiation with known capacity
List<String> list = new ArrayList<>(expectedCapacity);

// System.arraycopy internally executed during ArrayList.remove(int index):
// System.arraycopy(elementData, index + 1, elementData, index, numMoved);
// elementData[--size] = null; // Clear to let GC reclaim!`,
      rules: [
        { rule: 'Pre-size ArrayList', explanation: 'When the expected volume is known, pass initialCapacity to new ArrayList<>(size) to prevent multiple costly 1.5x resize-and-copy operations.' },
        { rule: 'Clear Trailing References', explanation: 'During ArrayList.remove(index), the trailing slot elementData[--size] is explicitly set to null to avoid loitering object memory leaks.' },
        { rule: 'Amortized O(1) Add', explanation: 'Appending to the end of an ArrayList is amortized O(1); an individual append that triggers a resize is O(N).' },
        { rule: 'LinkedList Node Overhead', explanation: 'Each LinkedList element incurs 24 bytes of Node object overhead plus GC book-keeping, making it 6x more memory-intensive than ArrayList.' },
        { rule: 'Avoid LinkedList Random Access', explanation: 'Calling linkedList.get(i) inside a loop produces disastrous O(N^2) complexity because traversal restarts from head or tail.' }
      ],
      quickComparison: [
        { aspect: 'Random Access (get(i))', optionA: 'ArrayList: $O(1)$ direct array index offset', optionB: 'LinkedList: $O(N)$ sequential pointer hopping' },
        { aspect: 'Amortized Append (add(e))', optionA: 'ArrayList: $O(1)$ amortized (occasional 1.5x copy)', optionB: 'LinkedList: $O(1)$ new Node allocation at tail' },
        { aspect: 'Insert/Delete at Index', optionA: 'ArrayList: $O(N)$ contiguous System.arraycopy shift', optionB: 'LinkedList: $O(N)$ traversal + $O(1)$ pointer swap' },
        { aspect: 'Memory & Cache Locality', optionA: 'ArrayList: Contiguous, L1/L2 prefetch friendly', optionB: 'LinkedList: 24-byte Node overhead, heap scattered cache misses' }
      ]
    },
    coreExplanation: [
      'The debate between `ArrayList` and `LinkedList` is one of the most classic Java performance questions, revealing the divide between abstract theoretical Big-O complexity and physical hardware realities.',
      '`ArrayList` represents a resizable array. When initialized with the default no-arg constructor, it begins with an empty array `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`. Upon the very first `add()`, it inflates to a default capacity of 10.',
      'When capacity is exceeded, the growth algorithm calculates `int newCapacity = oldCapacity + (oldCapacity >> 1)`, which is precisely a 1.5x expansion (e.g. 10 -> 15 -> 22 -> 33). This prevents quadratic memory allocation while minimizing wasted space.',
      'The resizing operation invokes `Arrays.copyOf(elementData, newCapacity)`, which delegates to the intrinsic JVM method `System.arraycopy()`. Because `System.arraycopy` is implemented in native CPU instructions (e.g. `memmove`), it copies blocks of contiguous memory at hardware bus bandwidth.',
      'Conversely, `LinkedList` maintains `Node<E> first` and `Node<E> last`. Each `Node` contains `E item`, `Node<E> next`, and `Node<E> prev`. Every insertion requires a heap allocation (`new Node()`), which strains the JVM garbage collector and fragments memory.',
      'CPU Cache Line Locality: Modern processors read memory in 64-byte chunks into L1/L2 caches. When an `ArrayList` is read sequentially, loading index 0 automatically fetches indices 1 through 7 into L1 cache for free! In a `LinkedList`, consecutive nodes reside at arbitrary heap addresses, meaning nearly every pointer traversal triggers an expensive L3 cache or DRAM bus stall (~100-200 CPU cycles).',
      'For Queue/Deque workloads, Java provides `ArrayDeque`, a circular ring buffer that avoids both the shifting overhead of `ArrayList` and the node allocation overhead of `LinkedList`.'
    ],
    diagram: `ARRAYLIST VS LINKEDLIST MEMORY LAYOUT & CPU CACHE LINES
========================================================================

1. ARRAYLIST (Contiguous in RAM - L1/L2 Cache Friendly)
   [CPU Cache Line: 64 bytes] ──> Fetches 8-16 references in ONE memory cycle!
   ┌───────────────────────────────────────────────────────────┐
   │ elementData[0] │ elementData[1] │ elementData[2] │  ...   │
   │  0x1000        │  0x1008        │  0x1010        │        │
   └───────────────────────────────────────────────────────────┘
   - get(i) = baseAddress + (i * referenceSize) ──> O(1) Instant

2. LINKEDLIST (Scattered Heap Nodes - Constant Cache Misses)
   Heap Addr: 0x4800          Heap Addr: 0x8200          Heap Addr: 0x1100
   ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
   │ Node A          │        │ Node B          │        │ Node C          │
   │ [Header: 12B]   │        │ [Header: 12B]   │        │ [Header: 12B]   │
   │ item: ref       │ ────>  │ item: ref       │ ────>  │ item: ref       │
   │ prev: null      │ <────  │ prev: 0x4800    │ <────  │ prev: 0x8200    │
   │ next: 0x8200    │        │ next: 0x1100    │        │ next: null      │
   └─────────────────┘        └─────────────────┘        └─────────────────┘
   - Each Node = 24 bytes overhead (Compressed OOPs)
   - Pointer chasing from 0x4800 to 0x8200 stalls CPU pipeline!`,
    codeSnippet: {
      title: 'ArrayList Growth and Trimming Simulation',
      code: `import java.lang.reflect.Field;
import java.util.ArrayList;

public class ArrayListInternals {
    public static void main(String[] args) throws Exception {
        ArrayList<Integer> list = new ArrayList<>();
        System.out.println("Initial capacity: " + getCapacity(list));

        // First add triggers inflation to default capacity 10
        list.add(100);
        System.out.println("After 1st add, capacity: " + getCapacity(list));

        // Add 10 more elements to exceed 10 and trigger 1.5x resize
        for (int i = 1; i <= 10; i++) list.add(i);
        System.out.println("After 11 elements, capacity: " + getCapacity(list) + " (10 + 10>>1 = 15)");

        // Trim excess capacity to fit exact size
        list.trimToSize();
        System.out.println("After trimToSize(), capacity: " + getCapacity(list));
    }

    private static int getCapacity(ArrayList<?> l) throws Exception {
        Field field = ArrayList.class.getDeclaredField("elementData");
        field.setAccessible(true);
        return ((Object[]) field.get(l)).length;
    }
}`,
      lineByLineExplanation: [
        { line: 'ArrayList<Integer> list = new ArrayList<>();', explanation: 'Creates an ArrayList referencing the static empty shared array DEFAULTCAPACITY_EMPTY_ELEMENTDATA.' },
        { line: 'list.add(100);', explanation: 'Detects default empty array and inflates elementData to DEFAULT_CAPACITY (10).' },
        { line: 'for (int i = 1; i <= 10; i++) list.add(i);', explanation: 'Adding the 11th element exceeds capacity 10, invoking grow() to compute 10 + (10 >> 1) = 15.' },
        { line: 'list.trimToSize();', explanation: 'Replaces elementData with a freshly allocated array of length exactly matching current size (11), trimming wasted space.' },
        { line: 'field.setAccessible(true);', explanation: 'Uses reflection on the internal elementData Object[] array to inspect actual physical capacity.' }
      ],
      output: `Initial capacity: 0
After 1st add, capacity: 10
After 11 elements, capacity: 15 (10 + 10>>1 = 15)
After trimToSize(), capacity: 11`
    },
    codeExamples: [
      {
        title: 'LinkedList Traversal Performance Trap: get(i) in a Loop',
        description: 'Demonstrating why invoking get(i) in a loop on LinkedList creates disastrous O(N^2) complexity.',
        code: `import java.util.*;

public class LinkedListGetTrap {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>();
        for (int i = 0; i < 5; i++) list.add(i * 10);

        // Disastrous O(N^2) Anti-Pattern:
        System.out.print("Index get(i): ");
        for (int i = 0; i < list.size(); i++) {
            // Internally traverses from first or last node every single call!
            System.out.print(list.get(i) + " ");
        }

        // Correct O(N) Traversal via Iterator / for-each:
        System.out.print("\\nIterator loop: ");
        for (int val : list) {
            System.out.print(val + " ");
        }
    }
}`,
        output: `Index get(i): 0 10 20 30 40 
Iterator loop: 0 10 20 30 40`
      },
      {
        title: 'ArrayList Insertion and Internal Element Shifting',
        description: 'Demonstrating how inserting into the middle of an ArrayList shifts elements using System.arraycopy.',
        code: `import java.util.*;

public class ArrayListShiftDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "D", "E"));
        System.out.println("Before insert: " + list);

        // Inserts at index 2, shifting "D" and "E" to indices 3 and 4
        list.add(2, "C");
        System.out.println("After list.add(2, 'C'): " + list);

        // Remove element at index 1 ("B"), shifting elements left
        list.remove(1);
        System.out.println("After list.remove(1): " + list);
    }
}`,
        output: `Before insert: [A, B, D, E]
After list.add(2, 'C'): [A, B, C, D, E]
After list.remove(1): [A, C, D, E]`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using LinkedList because "it has O(1) insertions"',
        whyItHappens: 'Textbooks teach that linked lists have $O(1)$ insertion. In practice, finding the node to insert at requires $O(N)$ traversal, and Node creation incurs heap allocation and GC overhead.',
        howToFix: 'Default to `ArrayList` for almost all List use cases. If you need FIFO queue operations, use `ArrayDeque`.'
      },
      {
        mistake: 'Iterating a LinkedList using for (int i = 0; i < list.size(); i++) list.get(i)',
        whyItHappens: 'Developers coming from arrays assume `get(i)` is $O(1)$. In LinkedList, `get(i)` starts at head or tail and counts $i$ steps, resulting in total $O(N^2)$ execution time.',
        howToFix: 'Always use an enhanced for-each loop (`for (E item : list)`) or an `Iterator`, which maintains a direct pointer to the current Node in $O(1)$ per step.'
      },
      {
        mistake: 'Not pre-sizing an ArrayList when the item count is already known',
        whyItHappens: 'Relying on default constructor (`new ArrayList<>()`) when adding 1,000,000 items triggers ~30 successive array resize and `System.arraycopy` operations.',
        howToFix: 'Instantiate with `new ArrayList<>(expectedSize)` or invoke `list.ensureCapacity(expectedSize)` prior to bulk insertions.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: ArrayList Growth Calculation',
        problemStatement: 'An ArrayList is created with initial capacity 10. When the 11th element is added, what is its new capacity?',
        code: `import java.util.ArrayList;

public class Puzzle1 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(10);
        for (int i = 1; i <= 11; i++) {
            list.add(i);
        }
        // What is the internal capacity of elementData?
    }
}`,
        options: [
          'A) 11',
          'B) 15',
          'C) 20',
          'D) 16'
        ],
        correctOptionIndex: 1,
        hint: 'Calculate: oldCapacity + (oldCapacity >> 1).',
        solution: 'Option B is correct: 15',
        explanation: 'In OpenJDK HotSpot, ArrayList growth formula is `newCapacity = oldCapacity + (oldCapacity >> 1)`. For capacity 10: 10 + (10 >> 1) = 10 + 5 = 15.'
      },
      {
        title: 'Puzzle 2: Removing by Value vs Removing by Index',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle2 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(10, 20, 30));
        list.remove(1);
        list.remove(Integer.valueOf(30));
        System.out.println(list);
    }
}`,
        options: [
          'A) [20, 30]',
          'B) [10]',
          'C) [30]',
          'D) IndexOutOfBoundsException'
        ],
        correctOptionIndex: 1,
        hint: 'Distinguish between remove(int index) and remove(Object o) for Integer lists.',
        solution: 'Option B is correct: [10]',
        explanation: '`list.remove(1)` invokes the overloaded `remove(int index)`, removing element at index 1 ("20"), leaving `[10, 30]`. Next, `list.remove(Integer.valueOf(30))` invokes `remove(Object o)`, finding and removing the value 30. The list now contains only `[10]`.'
      },
      {
        title: 'Puzzle 3: LinkedList Node Traversal Optimization',
        problemStatement: 'How does LinkedList.get(int index) optimize traversal when index is near the end?',
        code: `import java.util.LinkedList;

public class Puzzle3 {
    public static void main(String[] args) {
        LinkedList<String> list = new LinkedList<>();
        for (int i = 0; i < 100; i++) list.add("Item" + i);
        System.out.println(list.get(90));
    }
}`,
        options: [
          'A) It searches from index 0 forward 90 steps',
          'B) It searches backward from the tail node (last) 10 steps',
          'C) It performs a binary search',
          'D) It accesses an internal index lookup table in O(1)'
        ],
        correctOptionIndex: 1,
        hint: 'LinkedList checks whether index < (size >> 1).',
        solution: 'Option B is correct: It searches backward from the tail node (last) 10 steps',
        explanation: 'In `LinkedList.node(int index)`, it evaluates `if (index < (size >> 1))`: if true, it traverses forward from `first`; otherwise, it traverses backward from `last`. Since 90 > 50, it begins at `last` and hops backward 10 nodes.'
      },
      {
        title: 'Puzzle 4: SubList View Element Replacement Side Effects',
        problemStatement: 'What is printed after modifying a subList?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        List<String> sub = list.subList(1, 3); // ["B", "C"]
        sub.set(0, "Z");
        System.out.println(list);
    }
}`,
        options: [
          'A) [A, B, C, D]',
          'B) [A, Z, C, D]',
          'C) [Z, B, C, D]',
          'D) Throws UnsupportedOperationException'
        ],
        correctOptionIndex: 1,
        hint: 'subList is NOT a copy; it is a view backed directly by the parent list.',
        solution: 'Option B is correct: [A, Z, C, D]',
        explanation: '`subList()` returns a view directly referencing the parent list. Mutating the subList via `set()` directly writes through to the underlying `elementData` array of the parent at the corresponding offset.'
      },
      {
        title: 'Puzzle 5: ArrayList trimToSize Garbage Collection Effect',
        problemStatement: 'What does trimToSize() do to the internal elementData array?',
        code: `import java.util.ArrayList;

public class Puzzle5 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(1000);
        list.add("Alpha");
        list.add("Beta");
        list.trimToSize();
        System.out.println(list.size());
    }
}`,
        options: [
          'A) Reduces size to 0',
          'B) Leaves capacity at 1000 and clears nulls',
          'C) Replaces elementData with an exact array of length 2',
          'D) Throws IllegalStateException'
        ],
        correctOptionIndex: 2,
        hint: 'trimToSize minimizes storage capacity to match size().',
        solution: 'Option C is correct: Replaces elementData with an exact array of length 2',
        explanation: '`trimToSize()` checks if `size < elementData.length`. If so, it reallocates `elementData = Arrays.copyOf(elementData, size)`, allowing the previous 1000-slot array to be reclaimed by garbage collection.'
      },
      {
        title: 'Puzzle 6: LinkedList as a Deque (offerFirst vs offerLast)',
        problemStatement: 'What is printed by this LinkedList deque sequence?',
        code: `import java.util.LinkedList;

public class Puzzle6 {
    public static void main(String[] args) {
        LinkedList<Integer> dq = new LinkedList<>();
        dq.offer(1);
        dq.offerFirst(2);
        dq.offerLast(3);
        System.out.println(dq.poll() + ":" + dq.pollLast());
    }
}`,
        options: [
          'A) 1:3',
          'B) 2:3',
          'C) 2:1',
          'D) 1:2'
        ],
        correctOptionIndex: 1,
        hint: 'Trace list after each offer: offer(1) -> [1]; offerFirst(2) -> [2, 1]; offerLast(3) -> [2, 1, 3].',
        solution: 'Option B is correct: 2:3',
        explanation: '`offer(1)` adds to tail: `[1]`. `offerFirst(2)` prepends to head: `[2, 1]`. `offerLast(3)` appends to tail: `[2, 1, 3]`. `poll()` removes and returns head (2). `pollLast()` removes and returns tail (3). Output is "2:3".'
      },
      {
        title: 'Puzzle 7: Removing Primitive vs Removing Object in Integer List',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle7 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(1);
        list.add(0);
        list.remove(1);
        System.out.println(list);
    }
}`,
        options: [
          'A) [2, 0]',
          'B) [1, 0]',
          'C) [2, 1]',
          'D) IndexOutOfBoundsException'
        ],
        correctOptionIndex: 0,
        hint: 'Does remove(1) pass an int primitive or an Integer object?',
        solution: 'Option A is correct: [2, 0]',
        explanation: 'Because literal `1` is an `int` primitive, compiler binds to `List.remove(int index)`. It removes the element at index 1 (which is the value 1), leaving `[2, 0]`.'
      },
      {
        title: 'Puzzle 8: Performance of ArrayList vs LinkedList for Queue operations',
        problemStatement: 'Why is ArrayDeque preferred over LinkedList when implementing a FIFO Queue?',
        code: `// Scenario A: Queue<Integer> q = new LinkedList<>();
// Scenario B: Queue<Integer> q = new ArrayDeque<>();`,
        options: [
          'A) ArrayDeque is synchronized while LinkedList is not',
          'B) ArrayDeque uses a circular array buffer with no Node allocation and excellent cache locality',
          'C) LinkedList has O(N) offer() and poll() operations',
          'D) ArrayDeque allows null elements while LinkedList does not'
        ],
        correctOptionIndex: 1,
        hint: 'Consider object allocation per operation and CPU cache behavior.',
        solution: 'Option B is correct: ArrayDeque uses a circular array buffer with no Node allocation and excellent cache locality',
        explanation: '`LinkedList` creates a new `Node` object on every single `offer()` and discards it on `poll()`, burdening the GC. `ArrayDeque` uses a circular array with bitwise pointer arithmetic, allocating zero objects during normal steady-state queue operations.'
      },
      {
        title: 'Puzzle 9: Clearing an ArrayList Internals',
        problemStatement: 'What does ArrayList.clear() do to the internal array elements?',
        code: `import java.util.ArrayList;

public class Puzzle9 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Hello");
        list.add("World");
        list.clear();
        System.out.println(list.size());
    }
}`,
        options: [
          'A) It sets elementData to null',
          'B) It loops through elementData setting all slots to null and sets size to 0',
          'C) It only sets size = 0 without changing elementData',
          'D) It allocates a new array of capacity 10'
        ],
        correctOptionIndex: 1,
        hint: 'Why must element references in elementData be nullified after size is reset?',
        solution: 'Option B is correct: It loops through elementData setting all slots to null and sets size to 0',
        explanation: 'If `clear()` only set `size = 0`, the references stored in `elementData[0..size-1]` would remain alive, preventing the Garbage Collector from reclaiming the objects (loitering memory leak). `clear()` loops through all active slots setting them to null, then sets `size = 0`.'
      },
      {
        title: 'Puzzle 10: ensureCapacity Pre-allocation',
        problemStatement: 'What does list.ensureCapacity(50) do on an ArrayList with size 5 and capacity 10?',
        code: `import java.util.ArrayList;

public class Puzzle10 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(10);
        for (int i = 0; i < 5; i++) list.add(i);
        list.ensureCapacity(50);
        System.out.println(list.size());
    }
}`,
        options: [
          'A) Prints 50 and fills slots with nulls',
          'B) Prints 5 while reallocating internal elementData to capacity at least 50',
          'C) Prints 10',
          'D) Throws IllegalArgumentException'
        ],
        correctOptionIndex: 1,
        hint: 'Does ensureCapacity change the size() or the capacity?',
        solution: 'Option B is correct: Prints 5 while reallocating internal elementData to capacity at least 50',
        explanation: '`ensureCapacity(minCapacity)` expands the internal `elementData` array capacity if necessary to hold at least 50 elements without triggering subsequent resizes. It does NOT change `size` (which remains 5).'
      }
    ],
    interviewQuestions: [
      {
        question: 'Compare ArrayList vs LinkedList in detail. Which one would you choose for high-performance applications and why?',
        answer: 'ArrayList is backed by a contiguous Object array, offering O(1) random access by index, O(1) amortized appends, and exceptional CPU cache line locality. LinkedList is a doubly-linked list of individual Node objects, offering O(1) insertions at known node positions but O(N) search to find any index. In real-world high-performance software, ArrayList is almost universally superior. Because modern CPUs utilize 64-byte L1/L2 cache lines, sequential iteration over an ArrayList triggers automatic hardware prefetching. In contrast, LinkedList nodes are scattered arbitrarily across the heap, causing CPU cache misses on nearly every pointer hop. Furthermore, LinkedList consumes 24 bytes of object overhead per element and places continuous pressure on the Garbage Collector.',
        followUp: 'Are there any scenarios where LinkedList is strictly faster than ArrayList?',
        followUpAnswer: 'Only in the specific theoretical scenario where you maintain a ListIterator at a position in the middle of a massive list and perform millions of insertions/deletions without moving the iterator or indexing. In every other practical scenario—including queues where ArrayDeque dominates—ArrayList or ArrayDeque is faster.',
        keyPhrases: [
          'ArrayList contiguous Object[] array',
          'CPU cache line locality and prefetching',
          'LinkedList scattered heap nodes and cache misses',
          '24-byte Node memory overhead',
          'ArrayDeque is superior for queues'
        ],
        commonMistakeAnswer: 'Saying LinkedList is faster for adding elements because it does not have to resize.'
      },
      {
        question: 'How does ArrayList dynamically resize itself when its capacity is exhausted? Explain the formula.',
        answer: 'When an element is added and size equals elementData.length, ArrayList invokes grow(). The new capacity is calculated as: `int newCapacity = oldCapacity + (oldCapacity >> 1)`. The bitwise right-shift by 1 divides oldCapacity by 2, resulting in a growth factor of 1.5x (e.g., 10 -> 15 -> 22 -> 33). Once computed, ArrayList calls `Arrays.copyOf(elementData, newCapacity)`, which delegates to the native intrinsic `System.arraycopy()` to allocate a new array and blit the memory references.',
        followUp: 'Why did Java designers choose 1.5x rather than 2.0x (which is used in C++ std::vector)?',
        followUpAnswer: 'A growth factor of 2.0x mathematically guarantees that a newly allocated block can NEVER reuse memory previously freed by earlier allocations of the same vector throughout the entire process lifetime. A growth factor strictly less than 1.618 (the Golden Ratio), such as 1.5x, allows the JVM memory allocator to eventually reuse contiguous blocks previously freed by prior resizes.',
        keyPhrases: [
          '1.5x growth factor: oldCapacity + (oldCapacity >> 1)',
          'System.arraycopy intrinsic native execution',
          'Amortized O(1) append time',
          'Allocator memory reuse below Golden Ratio'
        ],
        commonMistakeAnswer: 'Stating that ArrayList doubles its size (2x). That was true for Vector, but ArrayList grows by 50% (1.5x).'
      },
      {
        question: 'What is "memory loitering" or an obsolete reference in an ArrayList, and how does ArrayList prevent it on removal?',
        answer: 'An obsolete reference (or memory loitering) occurs when an array holds a reference to an object that will never be dereferenced again by the program, preventing the Garbage Collector from freeing it. When `ArrayList.remove(int index)` is invoked, it shifts elements left using `System.arraycopy(elementData, index + 1, elementData, index, numMoved)`. After the shift, the slot at the old end (`elementData[size - 1]`) would still point to the duplicate trailing object if not cleared. ArrayList explicitly executes `elementData[--size] = null;` to clear the reference, allowing the GC to reclaim the object.',
        followUp: 'What happens in custom object pools or stack implementations if you fail to null out popped references?',
        followUpAnswer: 'A silent memory leak occurs: objects remain strongly reachable through the backing array even though the logical stack size has shrunk, eventually exhausting heap memory (OutOfMemoryError).',
        keyPhrases: [
          'Obsolete reference prevents GC reclamation',
          'elementData[--size] = null clears reference',
          'System.arraycopy shifts elements left',
          'Prevents memory leaks'
        ],
        commonMistakeAnswer: 'Assuming that just decrementing the size integer is sufficient for garbage collection.'
      },
      {
        question: 'Why does ArrayList implement RandomAccess, and what does this marker interface signify?',
        answer: 'RandomAccess is a marker interface (containing no methods) used by generic algorithms to determine whether a List supports constant-time O(1) indexed access or linear-time O(N) access. For example, `Collections.binarySearch(list, key)` checks `if (list instanceof RandomAccess)`: if true, it uses an indexed binary search loop (`list.get(mid)`); if false (such as for LinkedList), it falls back to an iterator-based search to avoid catastrophic O(N^2) pointer traversal.',
        followUp: 'Does LinkedList implement RandomAccess?',
        followUpAnswer: 'No, LinkedList deliberately does NOT implement RandomAccess because positional access via get(index) requires sequential O(N) pointer traversal from head or tail.',
        keyPhrases: [
          'Marker interface with no methods',
          'Signals O(1) indexed random access capability',
          'Checked by Collections.binarySearch and algorithms',
          'LinkedList does not implement RandomAccess'
        ],
        commonMistakeAnswer: 'Thinking RandomAccess generates random numbers or provides random shuffling.'
      },
      {
        question: 'Calculate the exact heap memory footprint of storing 1,000,000 Integer objects in an ArrayList vs a LinkedList on a 64-bit JVM with compressed OOPs.',
        answer: 'With Compressed OOPs (-XX:+UseCompressedOops), object headers are 12 bytes and references are 4 bytes. An Integer object occupies 16 bytes (12B header + 4B int + 0B padding). For ArrayList: 1M Integer references in elementData = 4 MB. 1M Integer objects = 16 MB. Total = ~20 MB. For LinkedList: 1M Node objects. Each Node has 12B header + 4B item + 4B next + 4B prev = 24 bytes. 1M Nodes = 24 MB. Plus 1M Integer objects = 16 MB. Total = ~40 MB. LinkedList consumes double the memory! If primitive unboxed ints were used in an `int[]`, it would take only 4 MB total.',
        followUp: 'How does Compressed OOPs impact memory calculation on 64-bit JVMs?',
        followUpAnswer: 'Compressed OOPs encodes 64-bit heap addresses into 32-bit pointers by taking advantage of 8-byte object alignment. It is enabled by default for heaps under 32 GB, cutting reference sizes from 8 bytes down to 4 bytes.',
        keyPhrases: [
          '12-byte object header under compressed OOPs',
          '4-byte reference pointer',
          'Node object consumes 24 bytes',
          'LinkedList uses roughly 2x memory of ArrayList'
        ],
        commonMistakeAnswer: 'Calculating memory assuming 64-bit pointers (8 bytes) without considering compressed OOPs, or ignoring Node object headers.'
      },
      {
        question: 'Explain the internal workings of LinkedList.node(int index). How does it optimize traversal?',
        answer: 'Because LinkedList is a doubly-linked list with references to both `first` and `last`, `node(int index)` checks whether `index < (size >> 1)`. If the target index is in the first half of the list, it starts at `first` and iterates forward using `x.next`. If the target index is in the second half, it starts at `last` and iterates backward using `x.prev`. While this halves the average number of hops to N/4, the time complexity remains strictly O(N).',
        followUp: 'What is the time complexity of linkedList.addFirst(e) and linkedList.addLast(e)?',
        followUpAnswer: 'Both are strictly O(1) time and require zero traversal because LinkedList holds direct pointers to `first` and `last`. It simply updates the adjacent node pointer and reassigns `first` or `last`.',
        keyPhrases: [
          'index < (size >> 1) check',
          'Traverses from first if in first half',
          'Traverses from last if in second half',
          'Halves hops but remains O(N)'
        ],
        commonMistakeAnswer: 'Claiming LinkedList always starts from the first node regardless of index.'
      },
      {
        question: 'What is the initial default capacity of an ArrayList, and when is the backing array actually allocated?',
        answer: 'When `new ArrayList<>()` is instantiated without arguments, no backing array of length 10 is allocated initially! Instead, `elementData` is assigned a static shared empty array constant `DEFAULTCAPACITY_EMPTY_ELEMENTDATA` (length 0). The actual allocation of a 10-element array is lazily deferred until the very first call to `add()`. This lazy allocation optimization saves substantial heap memory when applications create thousands of collections that remain empty.',
        followUp: 'What is the difference between EMPTY_ELEMENTDATA and DEFAULTCAPACITY_EMPTY_ELEMENTDATA?',
        followUpAnswer: '`EMPTY_ELEMENTDATA` is used when the user explicitly constructs `new ArrayList<>(0)`. When the first element is added to it, it expands to capacity 1. `DEFAULTCAPACITY_EMPTY_ELEMENTDATA` is used for `new ArrayList<>()`, and upon the first add, it expands to `DEFAULT_CAPACITY` (10).',
        keyPhrases: [
          'Lazy allocation upon first add()',
          'Default capacity is 10',
          'DEFAULTCAPACITY_EMPTY_ELEMENTDATA constant',
          'Saves memory for empty lists'
        ],
        commonMistakeAnswer: 'Asserting that new ArrayList<>() immediately allocates a 10-element array on the heap.'
      },
      {
        question: 'What happens when ArrayList.add(int index, E element) is called at index 0 vs the end of the list?',
        answer: 'Adding at the end (index == size) is an append operation: if capacity allows, it simply executes `elementData[size++] = element` in O(1) time. Adding at index 0 requires shifting all existing N elements one position to the right via `System.arraycopy(elementData, 0, elementData, 1, size)`. This makes prepending to an ArrayList an O(N) operation. For frequent prepends or FIFO operations, `ArrayDeque` should be used.',
        followUp: 'Why is System.arraycopy so much faster than a standard manual for-loop copy?',
        followUpAnswer: 'System.arraycopy is a JVM intrinsic mapped directly to native assembly instructions (such as `rep movsq` on x86 or SIMD block transfer instructions). It copies memory directly across CPU cache lines without per-element bounds checking or object type inspection.',
        keyPhrases: [
          'Append is O(1) amortized',
          'Prepend at index 0 is O(N) shifting',
          'System.arraycopy native memory transfer',
          'ArrayDeque is preferred for prepends'
        ],
        commonMistakeAnswer: 'Thinking prepending to an ArrayList is O(1) if capacity has already been allocated.'
      },
      {
        question: 'Why does LinkedList implement both List and Deque interfaces?',
        answer: 'LinkedList is structurally a doubly-linked list with head and tail pointers, allowing O(1) operations at both boundaries. By implementing `List`, it satisfies the positional list contract with indexed operations. By implementing `Deque` (Double Ended Queue), it supports stack operations (push, pop, peek) and queue operations (offerFirst, offerLast, pollFirst, pollLast). However, modern Java applications should prefer `ArrayDeque` for Deque/Stack/Queue needs and `ArrayList` for List needs.',
        followUp: 'Can LinkedList be used as a LIFO Stack in place of the legacy java.util.Stack class?',
        followUpAnswer: 'Yes, because LinkedList implements Deque, it has push() and pop() methods. The legacy java.util.Stack class extends Vector and incurs synchronized method locking overhead, so Deque implementations (specifically ArrayDeque) are the officially recommended stack replacements in modern Java.',
        keyPhrases: [
          'Implements List and Deque',
          'O(1) operations at head and tail',
          'Replaces legacy java.util.Stack',
          'ArrayDeque is still superior in performance'
        ],
        commonMistakeAnswer: 'Recommending java.util.Stack for stack implementations in new Java code.'
      },
      {
        question: 'Under what specific circumstances should a developer call ArrayList.trimToSize()?',
        answer: 'A developer should invoke `trimToSize()` when an ArrayList has finished expanding and will hold a stable set of elements for a prolonged duration, and its internal capacity significantly exceeds its size. For example, if a list grew to capacity 100,000 during data ingestion but filtered down to 10,000 items, 90,000 reference slots (~360 KB or ~720 KB) sit idle in memory. Calling `trimToSize()` allocates an array of exact length 10,000, allowing the oversized array to be garbage collected.',
        followUp: 'Does trimToSize() mutate the list elements or modCount?',
        followUpAnswer: 'It modifies `modCount` because resizing the internal array is considered a structural modification, but the element objects and their ordering remain unchanged.',
        keyPhrases: [
          'Reclaims unused trailing array capacity',
          'Appropriate for long-lived static lists after filtering',
          'Modifies modCount',
          'Avoid in high-churn temporary lists'
        ],
        commonMistakeAnswer: 'Calling trimToSize() frequently during loops or active insertions, causing endless array reallocations.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the default capacity of an ArrayList constructed with `new ArrayList<>()` once the first element is added?',
        options: [
          '0',
          '10',
          '16',
          '1'
        ],
        correctIndex: 1,
        explanation: 'In OpenJDK, `new ArrayList<>()` lazily allocates an array of `DEFAULT_CAPACITY = 10` upon the first call to `add()`.'
      },
      {
        question: 'What is the growth factor of an ArrayList when resizing in Java?',
        options: [
          '2.0x (doubles capacity)',
          '1.5x (oldCapacity + (oldCapacity >> 1))',
          'Increments by 10 elements',
          'Golden ratio (1.618x)'
        ],
        correctIndex: 1,
        explanation: 'ArrayList expands by 50% using the bitwise formula `oldCapacity + (oldCapacity >> 1)`.'
      },
      {
        question: 'What is the time complexity of `LinkedList.get(int index)`?',
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N^2)'
        ],
        correctIndex: 2,
        explanation: 'LinkedList must traverse node by node from either head or tail to reach the requested index, making it O(N).'
      },
      {
        question: 'Why does ArrayList offer vastly superior sequential iteration performance compared to LinkedList?',
        options: [
          'ArrayList is synchronized while LinkedList is not',
          'Contiguous array elements maximize CPU L1/L2 cache line hits and hardware prefetching, whereas LinkedList incurs CPU cache misses hopping between heap nodes',
          'ArrayList uses multi-core SIMD instructions for all loops',
          'LinkedList does not support enhanced for-loops'
        ],
        correctIndex: 1,
        explanation: 'Hardware cache lines fetch contiguous memory in 64-byte blocks. ArrayList benefits from spatial locality, while LinkedList suffers from pointer-chasing cache misses.'
      },
      {
        question: 'How much object overhead does each Node in a LinkedList incur on a 64-bit JVM with compressed OOPs?',
        options: [
          '0 bytes',
          '4 bytes',
          '24 bytes',
          '64 bytes'
        ],
        correctIndex: 2,
        explanation: 'Each Node has a 12-byte object header, three 4-byte references (item, next, prev), totaling 24 bytes per node.'
      },
      {
        question: 'What does `ArrayList.remove(int index)` do with the trailing array slot after shifting elements left?',
        options: [
          'Leaves it as-is since size is decremented',
          'Explicitly assigns `elementData[--size] = null` to prevent memory loitering and assist garbage collection',
          'Fills it with a sentinel tombstone value',
          'Deallocates the single slot directly'
        ],
        correctIndex: 1,
        explanation: 'ArrayList sets the trailing slot to `null` (`elementData[--size] = null`) so the GC can reclaim the referenced object.'
      },
      {
        question: 'Which method should you call on an ArrayList before inserting a known massive number of elements to prevent resizes?',
        options: [
          'trimToSize()',
          'ensureCapacity(int minCapacity)',
          'setSize(int newSize)',
          'rehash()'
        ],
        correctIndex: 1,
        explanation: '`ensureCapacity(minCapacity)` pre-allocates the underlying array to hold at least the specified volume, avoiding incremental 1.5x resizing.'
      },
      {
        question: 'If you need a double-ended queue (Deque) with fast insertion and deletion at both ends, what is the best collection to use?',
        options: [
          'java.util.Stack',
          'java.util.LinkedList',
          'java.util.ArrayDeque',
          'java.util.Vector'
        ],
        correctIndex: 2,
        explanation: '`ArrayDeque` is backed by a circular ring buffer array. It has zero node allocation overhead and superior cache locality over `LinkedList`.'
      },
      {
        question: 'What does the marker interface `RandomAccess` indicate to algorithms like Collections.binarySearch()?',
        options: [
          'The collection supports constant-time O(1) indexed access (like ArrayList)',
          'The collection returns random items upon calling next()',
          'The collection is thread-safe',
          'The collection does not allow duplicates'
        ],
        correctIndex: 0,
        explanation: '`RandomAccess` signals that the list supports O(1) indexed positional access, prompting algorithms to use index loops rather than iterators.'
      },
      {
        question: 'What is the performance implication of calling `list.remove(0)` on an ArrayList with 1,000,000 elements?',
        options: [
          'O(1) instant removal by updating the head pointer',
          'O(N) operation requiring System.arraycopy to shift 999,999 memory references left',
          'UnsupportedOperationException',
          'Throws IndexOutOfBoundsException'
        ],
        correctIndex: 1,
        explanation: 'ArrayList has a fixed zero-indexed offset. Removing index 0 forces the entire remainder of the array (999,999 references) to be shifted left by 1 position via `System.arraycopy`.'
      }
    ]
  }
};
