// ============================================================
// JAVA COLLECTIONS & GENERICS LESSONS (Modules 17 - 19)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const COLLECTIONS_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 17: Collections Framework ───────────────────────
  'java-collections': {
    intro: 'The Java Collections Framework provides an unified architecture for representing and manipulating collections of objects. It consists of core interfaces (Collection, List, Set, Queue, Map), concrete implementations (ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap), and utility algorithms in java.util.Collections.',
    keyConcepts: [
      { term: 'Collection Hierarchy', definition: 'Iterable is root -> Collection -> List, Set, Queue. Note: Map does NOT extend Collection, but is part of the framework.', example: 'Iterable -> Collection -> List' },
      { term: 'ArrayList vs LinkedList', definition: 'ArrayList is backed by dynamic array (O(1) random get, O(n) insert/remove). LinkedList is doubly linked nodes (O(n) get, O(1) insert/remove at known position).', example: 'List<String> list = new ArrayList<>();' },
      { term: 'Set Implementations', definition: 'HashSet (no order, O(1) hash table), LinkedHashSet (insertion order preserved, O(1)), TreeSet (sorted according to natural order or Comparator, O(log n) Red-Black tree).', example: 'Set<Integer> set = new TreeSet<>();' },
      { term: 'Queue & PriorityQueue', definition: 'FIFO structure. PriorityQueue orders elements by natural priority or custom Comparator (min-heap by default).', example: 'PriorityQueue<Integer> pq = new PriorityQueue<>();' },
      { term: 'Comparable vs Comparator', definition: 'Comparable defines single natural sort order inside the class via compareTo(). Comparator defines custom/multiple sort orders externally via compare(o1, o2).', example: 'Collections.sort(list, (a, b) -> a.compareTo(b));' },
      { term: 'Fail-Fast Iterators', definition: 'Iterators throw ConcurrentModificationException if the collection is structurally modified during iteration (except through iterator\'s own remove() method).', example: 'iterator.remove(); // safe' },
    ],
    codeExamples: [
      {
        title: 'List, Set, PriorityQueue, and Sorting',
        code: `import java.util.*;

public class CollectionsDemo {
    public static void main(String[] args) {
        // List with duplicate entries
        List<String> list = new ArrayList<>(Arrays.asList("Banana", "Apple", "Cherry", "Apple"));

        // Set removes duplicates
        Set<String> unique = new LinkedHashSet<>(list);
        System.out.println("Unique preserving order: " + unique);

        // Sorting using custom Comparator
        list.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));
        System.out.println("Sorted by length: " + list);

        // Min-Heap PriorityQueue
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(40);
        pq.offer(10);
        pq.offer(30);
        System.out.println("Smallest element extracted: " + pq.poll()); // 10
    }
}`,
        output: `Unique preserving order: [Banana, Apple, Cherry]
Sorted by length: [Apple, Apple, Banana, Cherry]
Smallest element extracted: 10`
      }
    ],
    commonMistakes: [
      'Modifying a collection inside a for-each loop instead of using an explicit Iterator, causing ConcurrentModificationException.',
      'Assuming LinkedList is always faster than ArrayList for insertions (ArrayList is faster in modern CPUs due to cache locality).',
    ],
    interviewTips: [
      '"How to make a collection unmodifiable in Java?" -> Use Collections.unmodifiableList(list) or Java 9+ factory methods: List.of(), Set.of(), Map.of().',
    ],
    interviewQuestions: [
      { q: 'What is the difference between Comparable and Comparator in Java?', a: 'Comparable is implemented within the domain class itself and provides a single "natural" sort ordering via compareTo(T o). Comparator is implemented as a separate class or lambda expression, allowing multiple different sorting criteria without modifying the original class.' },
    ],
    revisionPoints: [
      'ArrayList: O(1) read, dynamic resizing (50% growth)',
      'HashSet: O(1) unique elements, backed by HashMap',
      'TreeSet / TreeMap: O(log n) sorted order (Red-Black tree)',
      'Map is NOT a child of Collection interface',
    ]
  },

  // ── MODULE 18: Hashing & HashMap Internals ──────────────────
  'java-hashing': {
    intro: 'HashMap is the most widely asked data structure in Java interviews. It stores key-value pairs and achieves O(1) average time complexity for get() and put() using hashing, bucket arrays, and collision resolution strategies.',
    keyConcepts: [
      { term: 'Bucket Array Structure', definition: 'HashMap internally maintains an array of Node<K, V> buckets (initial capacity 16, default load factor 0.75).', example: 'Node<K,V>[] table;' },
      { term: 'Hash Calculation', definition: 'Key\'s hashCode() is passed through a supplementary hash function to spread bits: hash = (h = key.hashCode()) ^ (h >>> 16). Bucket index = (n - 1) & hash.', example: 'index = (capacity - 1) & hash' },
      { term: 'Collision Handling', definition: 'When two different keys map to the same bucket index, HashMap chains them in a singly linked list. When retrieving, it traverses the list matching via .equals().' },
      { term: 'Java 8 Treeification', definition: 'If a bucket\'s chain exceeds TREEIFY_THRESHOLD (8) and the total table capacity >= 64, the linked list converts to a balanced Red-Black Tree (TreeNode), improving worst-case lookup from O(n) to O(log n).', example: 'O(n) linked list -> O(log n) red-black tree' },
      { term: 'Rehashing / Resizing', definition: 'When entries exceed capacity * loadFactor (16 * 0.75 = 12), the bucket array doubles in size (16 -> 32) and all entries are re-indexed.', example: 'Capacity doubles: 16 -> 32 -> 64' },
      { term: 'Mutable Key Danger', definition: 'If an object\'s fields used in hashCode() are modified while acting as a HashMap key, its hashcode changes, making it impossible to retrieve the value (memory leak).', example: 'Always use immutable keys like String, Integer' },
    ],
    codeExamples: [
      {
        title: 'HashMap Operations & Collision Resolution',
        code: `import java.util.HashMap;
import java.util.Map;

public class HashMapInternalsDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        // put computes hash, locates bucket, stores node
        scores.put("Alice", 95);
        scores.put("Bob", 88);
        scores.put(null, 0); // HashMap allows 1 null key at index 0

        // get computes hash, checks equals()
        System.out.println("Alice's score: " + scores.get("Alice"));
        System.out.println("Contains Bob: " + scores.containsKey("Bob"));

        // Java 8 helpful methods
        scores.putIfAbsent("Alice", 100); // won't overwrite 95
        scores.computeIfPresent("Bob", (k, v) -> v + 5); // 88 -> 93
        System.out.println("Bob's updated score: " + scores.get("Bob"));
    }
}`,
        output: `Alice's score: 95
Contains Bob: true
Bob's updated score: 93`
      }
    ],
    commonMistakes: [
      'Using a mutable custom object as a HashMap key and mutating its state after insertion.',
      'Failing to override hashCode() when overriding equals(), leading to duplicate keys in HashMap.',
      'Expecting HashMap to maintain any insertion or alphabetical order (use LinkedHashMap or TreeMap instead).',
    ],
    interviewTips: [
      '"How does Java 8 improve HashMap over Java 7?" -> In Java 7, collisions formed linked lists with O(n) worst-case search. In Java 8, long chains (> 8) are treeified into Red-Black trees with O(log n) worst-case search, preventing hash-collision denial-of-service (DoS) attacks.',
    ],
    interviewQuestions: [
      { q: 'Explain step-by-step how hashmap.put(key, value) works internally.', a: '1. Computes hash = hash(key.hashCode()). 2. Calculates bucket index = (n - 1) & hash. 3. If bucket is empty, creates new Node. 4. If bucket contains nodes (collision), traverses nodes comparing key.equals(). If matching key is found, overwrites value. If not found, appends to end of list. 5. If chain length reaches 8 and capacity >= 64, converts list to Red-Black tree. 6. If size > threshold, doubles table capacity and rehashes.' },
      { q: 'What is the difference between HashMap and Hashtable?', a: 'HashMap is unsynchronized (faster, not thread-safe) and permits one null key and multiple null values. Hashtable is legacy, synchronized (slower), and throws NullPointerException on any null key or value. In concurrent environments, use ConcurrentHashMap instead of Hashtable.' },
    ],
    revisionPoints: [
      'Bucket index = (capacity - 1) & hash',
      'Default capacity = 16; default load factor = 0.75',
      'Treeification happens at 8 elements per bucket if table size >= 64',
      'Always use immutable objects (like String) as HashMap keys',
    ]
  },

  // ── MODULE 19: Generics & Type Safety ───────────────────────
  'java-generics': {
    intro: 'Generics (introduced in Java 5) enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods. Generics eliminate explicit casting, enforce compile-time type safety, and avoid runtime ClassCastExceptions.',
    keyConcepts: [
      { term: 'Compile-Time Type Safety', definition: 'The compiler ensures only objects of the specified type are added to a collection, catching type mismatches at compile time.', example: 'List<String> list = new ArrayList<>();' },
      { term: 'Type Erasure', definition: 'To ensure backward compatibility with older Java versions, the compiler erases all generic type information during compilation. Bytecode contains raw types with appropriate casts.', example: 'List<String> becomes List at runtime' },
      { term: 'Bounded Type Parameters', definition: 'Restricting allowed type arguments. <T extends Number> allows only Number and its subclasses (Integer, Double, etc.).', example: 'class Box<T extends Number>' },
      { term: 'Wildcards (?)', definition: 'Unbounded (?), Upper-Bounded (? extends T), and Lower-Bounded (? super T).', example: 'List<? extends Number>' },
      { term: 'PECS Rule', definition: '"Producer Extends, Consumer Super". Use ? extends T when reading data from a structure (producer). Use ? super T when writing data into a structure (consumer).', example: 'Collections.copy(destList, srcList)' },
    ],
    codeExamples: [
      {
        title: 'Generic Method and PECS Wildcard Principle',
        code: `import java.util.*;

public class GenericsDemo {
    // Upper-bounded: Producer Extends (read-only)
    public static double sumOfNumbers(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue(); // Reading is safe!
        }
        return sum;
    }

    // Lower-bounded: Consumer Super (write-capable)
    public static void addIntegers(List<? super Integer> list) {
        list.add(10);
        list.add(20); // Writing Integer is safe!
    }

    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(1, 2, 3, 4, 5);
        List<Double> doubleList = Arrays.asList(1.5, 2.5, 3.5);

        System.out.println("Int sum: " + sumOfNumbers(intList));
        System.out.println("Double sum: " + sumOfNumbers(doubleList));
    }
}`,
        output: `Int sum: 15.0
Double sum: 7.5`
      }
    ],
    commonMistakes: [
      'Attempting to instantiate a generic type directly: new T() is illegal due to type erasure.',
      'Assuming List<String> is a subtype of List<Object> (generics are invariant; compile error!).',
      'Using primitive types as generic arguments: List<int> is invalid, must use List<Integer>.',
    ],
    interviewTips: [
      '"What is PECS?" -> Producer Extends, Consumer Super. If you only read from a generic collection, use ? extends T. If you only put items into it, use ? super T. If both, don\'t use wildcards.',
    ],
    interviewQuestions: [
      { q: 'What is Type Erasure in Java Generics?', a: 'Type Erasure is the process where the Java compiler replaces generic type parameters with their bounds (or Object if unbounded) and inserts appropriate casts in bytecode. At runtime, the JVM has no knowledge of generic type arguments, ensuring full compatibility with legacy pre-Java 5 code.' },
    ],
    revisionPoints: [
      'Generics provide compile-time type safety; erased at runtime',
      'Generics are invariant: List<Integer> is not a List<Number>',
      'PECS: Producer Extends, Consumer Super',
      'Cannot use primitives as generic type arguments (use wrappers)',
    ]
  },
};
