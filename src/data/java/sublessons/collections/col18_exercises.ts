import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 18: COLLECTIONS FRAMEWORK (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 18.1 - 18.4
// ============================================================

export const col18Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 18.1: Collections Framework Overview & Iterators ──────────
  'collections-framework-overview': [
    {
      id: 'col-18-1-ex1',
      title: 'Safe Element Removal via Iterator',
      problemStatement: 'Demonstrate removing all words with length less than 4 from an ArrayList using `Iterator.remove()` to prevent ConcurrentModificationException.',
      hint: 'Never call list.remove() while iterating with a for-each loop. Use iterator.remove().',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList("cat", "elephant", "dog", "tiger", "ox"));
        Iterator<String> it = words.iterator();
        while (it.hasNext()) {
            if (it.next().length() < 4) {
                it.remove();
            }
        }
        System.out.println("Filtered: " + words);
    }
}`,
      output: `Filtered: [elephant, tiger]`,
      explanation: '`Iterator.remove()` synchronizes the internal `expectedModCount` with `modCount`, preventing `ConcurrentModificationException`.'
    },
    {
      id: 'col-18-1-ex2',
      title: 'Bidirectional Traversal with ListIterator',
      problemStatement: 'Use `ListIterator` to traverse a list backward from the end, replacing any negative number with 0.',
      hint: 'Obtain listIterator with list.size() to position cursor at the end.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(Arrays.asList(10, -5, 20, -15, 30));
        ListIterator<Integer> lit = nums.listIterator(nums.size());
        while (lit.hasPrevious()) {
            int val = lit.previous();
            if (val < 0) {
                lit.set(0);
            }
        }
        System.out.println("Modified: " + nums);
    }
}`,
      output: `Modified: [10, 0, 20, 0, 30]`,
      explanation: '`ListIterator` supports bidirectional traversal (`hasPrevious`/`previous`) and in-place element replacement (`set`).'
    },
    {
      id: 'col-18-1-ex3',
      title: 'Fail-Safe Iteration with CopyOnWriteArrayList',
      problemStatement: 'Demonstrate iterating through a list while concurrently adding an element, showing that `CopyOnWriteArrayList` does not throw ConcurrentModificationException.',
      hint: 'CopyOnWriteArrayList iterates over a snapshot array created at the time iterator() was called.',
      solutionCode: `import java.util.concurrent.CopyOnWriteArrayList;

public class Main {
    public static void main(String[] args) {
        CopyOnWriteArrayList<String> list = new CopyOnWriteArrayList<>();
        list.add("Java");
        list.add("Kotlin");

        for (String item : list) {
            System.out.println("Reading: " + item);
            list.add("Scala"); // Concurrent modification
        }
        System.out.println("Final List Size: " + list.size());
    }
}`,
      output: `Reading: Java
Reading: Kotlin
Final List Size: 4`,
      explanation: 'The iterator operates on an immutable snapshot of the backing array, so concurrent mutations never produce CME.'
    },
    {
      id: 'col-18-1-ex4',
      title: 'Modern Collection Filtering with removeIf',
      problemStatement: 'Filter out all odd numbers from a list using Java 8\'s `Collection.removeIf()` with a lambda predicate.',
      hint: 'removeIf accepts a Predicate and removes elements matching the condition in a single pass.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8));
        numbers.removeIf(n -> n % 2 != 0);
        System.out.println("Even Numbers: " + numbers);
    }
}`,
      output: `Even Numbers: [2, 4, 6, 8]`,
      explanation: '`Collection.removeIf()` operates directly on the underlying storage array using bitmasks to shift elements in $O(N)$ time.'
    },
    {
      id: 'col-18-1-ex5',
      title: 'Unmodifiable List View vs List.of()',
      problemStatement: 'Demonstrate the difference between `Collections.unmodifiableList()` (a view of the underlying list) and `List.of()` (an immutable copy).',
      hint: 'Modifying the underlying list reflects in unmodifiableList view, but List.of is strictly independent.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> mutable = new ArrayList<>(Arrays.asList("A", "B"));
        List<String> view = Collections.unmodifiableList(mutable);
        List<String> copy = List.of("A", "B");

        mutable.add("C");
        System.out.println("Unmodifiable view reflects mutation: " + view);
        System.out.println("Immutable copy remains fixed: " + copy);
    }
}`,
      output: `Unmodifiable view reflects mutation: [A, B, C]
Immutable copy remains fixed: [A, B]`,
      explanation: '`Collections.unmodifiableList()` is a wrapper view pointing to the live collection, whereas `List.of()` creates an independent compact immutable collection.'
    },
    {
      id: 'col-18-1-ex6',
      title: 'Sorting Custom Objects with Comparable',
      problemStatement: 'Implement `Comparable<Employee>` on an `Employee` class to define natural ordering by salary ascending, then by name alphabetically.',
      hint: 'Compare salaries first; if equal, compare names with String.compareTo().',
      solutionCode: `import java.util.*;

public class Main {
    static class Employee implements Comparable<Employee> {
        String name;
        int salary;

        Employee(String name, int salary) {
            this.name = name;
            this.salary = salary;
        }

        @Override
        public int compareTo(Employee o) {
            int cmp = Integer.compare(this.salary, o.salary);
            return (cmp != 0) ? cmp : this.name.compareTo(o.name);
        }

        @Override
        public String toString() {
            return name + "($" + salary + ")";
        }
    }

    public static void main(String[] args) {
        List<Employee> list = Arrays.asList(
            new Employee("Bob", 80000),
            new Employee("Alice", 95000),
            new Employee("Charlie", 80000)
        );
        Collections.sort(list);
        System.out.println("Sorted: " + list);
    }
}`,
      output: `Sorted: [Bob($80000), Charlie($80000), Alice($95000)]`,
      explanation: 'Implementing `Comparable` embeds the natural sorting order directly inside the domain class via `compareTo()`.'
    },
    {
      id: 'col-18-1-ex7',
      title: 'Multi-Criteria Sorting with Comparator.comparing',
      problemStatement: 'Sort a list of student records by GPA descending, then by age ascending, using modern `Comparator.comparing` combinators.',
      hint: 'Chain Comparator.comparing(Student::getGpa).reversed().thenComparing(Student::getAge).',
      solutionCode: `import java.util.*;

public class Main {
    static class Student {
        String name;
        double gpa;
        int age;

        Student(String name, double gpa, int age) {
            this.name = name;
            this.gpa = gpa;
            this.age = age;
        }

        public double getGpa() { return gpa; }
        public int getAge() { return age; }

        @Override
        public String toString() {
            return name + "(" + gpa + ", " + age + "y)";
        }
    }

    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("David", 3.8, 22),
            new Student("Emma", 3.9, 21),
            new Student("Frank", 3.8, 20)
        );

        students.sort(
            Comparator.comparing(Student::getGpa).reversed()
                      .thenComparing(Student::getAge)
        );
        System.out.println("Sorted Students: " + students);
    }
}`,
      output: `Sorted Students: [Emma(3.9, 21y), Frank(3.8, 20y), David(3.8, 22y)]`,
      explanation: 'Java 8 `Comparator.comparing()` and `thenComparing()` compose declarative, type-safe comparison chains without messy nested ternary expressions.'
    },
    {
      id: 'col-18-1-ex8',
      title: 'SubList View Modification Invariant',
      problemStatement: 'Demonstrate modifying a sublist and verify that changes propagate directly to the backing list.',
      hint: 'list.subList(from, to) returns a view. Modifying the sublist modifies the parent list.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> parent = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        List<Integer> sub = parent.subList(1, 4); // View of [2, 3, 4]
        sub.clear(); // Clears elements from parent!

        System.out.println("Parent List after subList.clear(): " + parent);
    }
}`,
      output: `Parent List after subList.clear(): [1, 5, 6]`,
      explanation: '`subList()` returns a window view into the parent list; clearing the sublist removes those exact elements from the backing array.'
    },
    {
      id: 'col-18-1-ex9',
      title: 'Disjoint and Frequency Operations with Collections',
      problemStatement: 'Use `Collections.disjoint()` to verify if two collections have no elements in common, and `Collections.frequency()` to count element occurrences.',
      hint: 'Collections.disjoint returns true if intersection is empty.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> groupA = Arrays.asList("apple", "banana", "cherry");
        List<String> groupB = Arrays.asList("date", "fig", "grape");
        List<String> groupC = Arrays.asList("banana", "kiwi");

        System.out.println("A and B disjoint? " + Collections.disjoint(groupA, groupB));
        System.out.println("A and C disjoint? " + Collections.disjoint(groupA, groupC));

        List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 4, 2, 5);
        System.out.println("Frequency of 2: " + Collections.frequency(numbers, 2));
    }
}`,
      output: `A and B disjoint? true
A and C disjoint? false
Frequency of 2: 3`,
      explanation: '`Collections.disjoint()` and `Collections.frequency()` provide expressive, bug-free utility methods over manual iterative loops.'
    },
    {
      id: 'col-18-1-ex10',
      title: 'Converting Between Collections and Arrays',
      problemStatement: 'Demonstrate converting a collection to an array using modern `toArray(String[]::new)` and converting an array to a mutable list using `new ArrayList<>(Arrays.asList())`.',
      hint: 'Arrays.asList produces a fixed-size list. Wrap it with new ArrayList() to make it mutable.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Spring", "Hibernate", "Kafka");

        // Java 11 method reference array conversion
        String[] arr = list.toArray(String[]::new);
        System.out.println("Array Length: " + arr.length);

        // Convert array to fully mutable list
        List<String> mutableList = new ArrayList<>(Arrays.asList(arr));
        mutableList.add("Redis");
        System.out.println("Mutable List: " + mutableList);
    }
}`,
      output: `Array Length: 3
Mutable List: [Spring, Hibernate, Kafka, Redis]`,
      explanation: '`list.toArray(String[]::new)` uses an array constructor reference for zero-copy type-safe array allocation in Java 11+.'
    }
  ],

  // ── LESSON 18.2: ArrayList vs LinkedList Internals ───────────────────
  'arraylist-vs-linkedlist-internals': [
    {
      id: 'col-18-2-ex1',
      title: 'ArrayList Capacity Expansion Tracing',
      problemStatement: 'Demonstrate how ArrayList grows by measuring insertion times and explaining the $1.5\\times$ growth formula (`newCapacity = oldCapacity + (oldCapacity >> 1)`).',
      hint: 'Initial default capacity is 10. Growth increases capacity to 15, then 22, then 33...',
      solutionCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        int initialCapacity = 10;
        int firstExpansion = initialCapacity + (initialCapacity >> 1); // 10 + 5 = 15
        int secondExpansion = firstExpansion + (firstExpansion >> 1); // 15 + 7 = 22
        int thirdExpansion = secondExpansion + (secondExpansion >> 1); // 22 + 11 = 33

        System.out.println("Default: " + initialCapacity);
        System.out.println("Growth 1: " + firstExpansion);
        System.out.println("Growth 2: " + secondExpansion);
        System.out.println("Growth 3: " + thirdExpansion);

        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < 35; i++) list.add(i);
        System.out.println("Items added successfully. Size: " + list.size());
    }
}`,
      output: `Default: 10
Growth 1: 15
Growth 2: 22
Growth 3: 33
Items added successfully. Size: 35`,
      explanation: 'HotSpot JVM grows `ArrayList` by 50% ($1.5\\times$) using bitwise right-shift `oldCapacity + (oldCapacity >> 1)` and copies elements via native `System.arraycopy`.'
    },
    {
      id: 'col-18-2-ex2',
      title: 'Pre-sizing ArrayList with ensureCapacity',
      problemStatement: 'Show how `ensureCapacity()` prevents repeated array reallocation when inserting 100,000 elements.',
      hint: 'Pre-sizing prevents log(N) array copy reallocations.',
      solutionCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        int n = 100_000;

        // Pre-allocated capacity
        ArrayList<Integer> preAllocated = new ArrayList<>(n);
        long start = System.nanoTime();
        for (int i = 0; i < n; i++) preAllocated.add(i);
        long preAllocatedTime = System.nanoTime() - start;

        System.out.println("Pre-allocated size: " + preAllocated.size());
        System.out.println("Pre-allocation avoids resizing overhead!");
    }
}`,
      output: `Pre-allocated size: 100000
Pre-allocation avoids resizing overhead!`,
      explanation: 'Supplying initial capacity avoids repeated garbage collection of discarded intermediate arrays and saves multiple `System.arraycopy` operations.'
    },
    {
      id: 'col-18-2-ex3',
      title: 'Random Access Benchmark: ArrayList vs LinkedList',
      problemStatement: 'Demonstrate why `ArrayList.get(index)` is $O(1)$ and `LinkedList.get(index)` is $O(N)$ by accessing elements at arbitrary indices.',
      hint: 'LinkedList must traverse node references from head or tail to reach the requested index.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int size = 50_000;
        List<Integer> arrayList = new ArrayList<>(size);
        List<Integer> linkedList = new LinkedList<>();

        for (int i = 0; i < size; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }

        // Access middle element
        int target = size / 2;
        int valA = arrayList.get(target); // Direct array lookup O(1)
        int valL = linkedList.get(target); // Node traversal O(N)

        System.out.println("ArrayList retrieved: " + valA);
        System.out.println("LinkedList retrieved: " + valL);
        System.out.println("ArrayList access is O(1) via base + index * 4 offset calculation.");
    }
}`,
      output: `ArrayList retrieved: 25000
LinkedList retrieved: 25000
ArrayList access is O(1) via base + index * 4 offset calculation.`,
      explanation: '`ArrayList` computes direct memory address offsets in $O(1)$ time, whereas `LinkedList` traverses pointers from the nearest boundary.'
    },
    {
      id: 'col-18-2-ex4',
      title: 'LinkedList as a Deque (addFirst/addLast)',
      problemStatement: 'Use `LinkedList` as a double-ended queue demonstrating $O(1)$ insertion and removal at both head and tail.',
      hint: 'LinkedList implements Deque with addFirst, addLast, removeFirst, removeLast.',
      solutionCode: `import java.util.LinkedList;

public class Main {
    public static void main(String[] args) {
        LinkedList<String> deque = new LinkedList<>();
        deque.addFirst("Middle");
        deque.addFirst("Front");
        deque.addLast("Back");

        System.out.println("Deque: " + deque);
        System.out.println("Removed Front: " + deque.removeFirst());
        System.out.println("Removed Back: " + deque.removeLast());
        System.out.println("Remaining: " + deque);
    }
}`,
      output: `Deque: [Front, Middle, Back]
Removed Front: Front
Removed Back: Back
Remaining: [Middle]`,
      explanation: 'Maintaining explicit `first` and `last` node pointers gives `LinkedList` $O(1)$ head and tail mutations.'
    },
    {
      id: 'col-18-2-ex5',
      title: 'Memory Overhead Calculation: Node vs Array Element',
      problemStatement: 'Calculate the heap memory overhead of storing 1,000,000 elements in a LinkedList vs an ArrayList with CompressedOops.',
      hint: 'Each LinkedList Node requires 24 bytes (12 header + 4 item + 4 prev + 4 next). ArrayList requires 4 bytes per pointer.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int n = 1_000_000;
        long arrayListBytes = (long) n * 4; // 4 bytes per reference
        long linkedListNodeBytes = (long) n * 24; // 12-byte header + 3x4-byte refs = 24 bytes

        System.out.println("ArrayList Reference Storage: " + (arrayListBytes / (1024 * 1024)) + " MB");
        System.out.println("LinkedList Node Storage: " + (linkedListNodeBytes / (1024 * 1024)) + " MB");
        System.out.println("LinkedList consumes 6x more memory solely for pointer overhead!");
    }
}`,
      output: `ArrayList Reference Storage: 3 MB
LinkedList Node Storage: 22 MB
LinkedList consumes 6x more memory solely for pointer overhead!`,
      explanation: 'Every `LinkedList.Node` is an independent heap object consuming 24 bytes with CompressedOops, yielding massive memory bloat compared to contiguous array references.'
    },
    {
      id: 'col-18-2-ex6',
      title: 'ArrayList Trim to Size',
      problemStatement: 'Demonstrate releasing unused backing array capacity in an ArrayList using `trimToSize()`.',
      hint: 'trimToSize() reallocates the array to exactly match list.size().',
      solutionCode: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(1000); // 1000 capacity allocated
        list.add("Java");
        list.add("Spring");
        list.add("PostgreSQL");

        list.trimToSize(); // Backing array reallocated to size 3
        System.out.println("Size: " + list.size());
        System.out.println("trimToSize() trimmed unused capacity to minimize memory footprint.");
    }
}`,
      output: `Size: 3
trimToSize() trimmed unused capacity to minimize memory footprint.`,
      explanation: '`trimToSize()` replaces the oversized backing array with an array whose length exactly equals `size`, freeing unused heap space.'
    },
    {
      id: 'col-18-2-ex7',
      title: 'Sequential Head Insertion Benchmark',
      problemStatement: 'Demonstrate inserting elements at index 0 of an ArrayList vs LinkedList, showing LinkedList is $O(1)$ while ArrayList is $O(N)$ per insert.',
      hint: 'ArrayList.add(0, item) shifts all existing elements to the right via System.arraycopy.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int count = 10_000;
        List<Integer> linkedList = new LinkedList<>();
        for (int i = 0; i < count; i++) {
            linkedList.add(0, i); // O(1) head insertion
        }

        System.out.println("LinkedList head insertions complete. Size: " + linkedList.size());
        System.out.println("Each head insert in LinkedList rewires first pointer in O(1).");
    }
}`,
      output: `LinkedList head insertions complete. Size: 10000
Each head insert in LinkedList rewires first pointer in O(1).`,
      explanation: 'Prepending to `LinkedList` takes $O(1)$ pointer rewiring, whereas `ArrayList.add(0, x)` requires an $O(N)$ native array shift.'
    },
    {
      id: 'col-18-2-ex8',
      title: 'Cache Locality Effect on Linear Traversal',
      problemStatement: 'Explain and demonstrate sequential iteration over ArrayList vs LinkedList, emphasizing CPU cache prefetching efficiency.',
      hint: 'Contiguous memory in ArrayList matches 64-byte CPU cache lines.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        int n = 100_000;
        List<Integer> arrayList = new ArrayList<>(n);
        for (int i = 0; i < n; i++) arrayList.add(i);

        long sum = 0;
        for (int x : arrayList) {
            sum += x;
        }
        System.out.println("ArrayList Sum: " + sum);
        System.out.println("Contiguous primitive pointer traversal triggers CPU L1/L2 prefetching!");
    }
}`,
      output: `ArrayList Sum: 4999950000
Contiguous primitive pointer traversal triggers CPU L1/L2 prefetching!`,
      explanation: 'Linear array traversal allows CPU prefetchers to load entire 64-byte cache lines before access, whereas linked node pointer hopping causes repeated RAM latency stalls.'
    },
    {
      id: 'col-18-2-ex9',
      title: 'In-Place List Reversal',
      problemStatement: 'Reverse an ArrayList in-place using two converging pointers without calling Collections.reverse().',
      hint: 'Swap elements at left and right pointers while left < right.',
      solutionCode: `import java.util.*;

public class Main {
    public static void reverseInPlace(List<Integer> list) {
        int left = 0, right = list.size() - 1;
        while (left < right) {
            int temp = list.get(left);
            list.set(left, list.get(right));
            list.set(right, temp);
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        reverseInPlace(nums);
        System.out.println("Reversed: " + nums);
    }
}`,
      output: `Reversed: [5, 4, 3, 2, 1]`,
      explanation: 'In-place two-pointer reversal on `ArrayList` takes $O(N)$ time and $O(1)$ auxiliary space via index `set()`.'
    },
    {
      id: 'col-18-2-ex10',
      title: 'Converting LinkedList to ArrayList for Sorting',
      problemStatement: 'Demonstrate why sorting a LinkedList in Java converts it internally to an array, and show how to explicitly perform this pattern.',
      hint: 'Collections.sort() copies elements to an Object array, sorts with TimSort, and writes back.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        LinkedList<Integer> list = new LinkedList<>(Arrays.asList(40, 10, 30, 20));

        // Explicit conversion to ArrayList for fast random-access sort
        ArrayList<Integer> fastSort = new ArrayList<>(list);
        Collections.sort(fastSort);

        // Put back into LinkedList if required
        list.clear();
        list.addAll(fastSort);

        System.out.println("Sorted LinkedList: " + list);
    }
}`,
      output: `Sorted LinkedList: [10, 20, 30, 40]`,
      explanation: 'Because sorting algorithms (TimSort) require frequent $O(1)$ index random access, sorting linked nodes directly would degrade to $O(N^2)$; arrays are strictly required.'
    }
  ],

  // ── LESSON 18.3: Set Hierarchy & TreeSet Red-Black Internals ─────────
  'set-hierarchy-and-treeset': [
    {
      id: 'col-18-3-ex1',
      title: 'HashSet Deduplication with Custom Object Equals/HashCode',
      problemStatement: 'Create a `Book` class with `isbn` and `title`. Correctly implement `equals()` and `hashCode()` to ensure `HashSet` eliminates duplicate books with the same ISBN.',
      hint: 'Only isbn should be included in equals and hashCode if ISBN is unique.',
      solutionCode: `import java.util.*;

public class Main {
    static class Book {
        String isbn;
        String title;

        Book(String isbn, String title) {
            this.isbn = isbn;
            this.title = title;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof Book)) return false;
            Book book = (Book) o;
            return Objects.equals(isbn, book.isbn);
        }

        @Override
        public int hashCode() {
            return Objects.hash(isbn);
        }

        @Override
        public String toString() { return title + " [" + isbn + "]"; }
    }

    public static void main(String[] args) {
        Set<Book> library = new HashSet<>();
        library.add(new Book("978-0134685991", "Effective Java"));
        library.add(new Book("978-0134685991", "Effective Java (Copy 2)"));
        library.add(new Book("978-0596009205", "Head First Java"));

        System.out.println("Unique Books: " + library.size());
        for (Book b : library) System.out.println(" - " + b);
    }
}`,
      output: `Unique Books: 2
 - Effective Java [978-0134685991]
 - Head First Java [978-0596009205]`,
      explanation: '`HashSet` uses `hashCode()` to find the bucket and `equals()` to check identity, successfully rejecting books with matching ISBNs.'
    },
    {
      id: 'col-18-3-ex2',
      title: 'LinkedHashSet Insertion Order Preservation',
      problemStatement: 'Demonstrate that `LinkedHashSet` preserves the original insertion order of elements while `HashSet` does not guarantee any order.',
      hint: 'LinkedHashSet maintains a doubly-linked list through all its entries.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Set<String> linkedSet = new LinkedHashSet<>();
        linkedSet.add("Zebra");
        linkedSet.add("Apple");
        linkedSet.add("Mango");
        linkedSet.add("Banana");

        System.out.println("LinkedHashSet preserves insertion order: " + linkedSet);
    }
}`,
      output: `LinkedHashSet preserves insertion order: [Zebra, Apple, Mango, Banana]`,
      explanation: '`LinkedHashSet` overlays a doubly-linked list across hash table entries, iterating in exact chronological insertion order.'
    },
    {
      id: 'col-18-3-ex3',
      title: 'TreeSet Red-Black Tree Sorted Traversal',
      problemStatement: 'Add unsorted integers to a `TreeSet` and print them to demonstrate natural ascending sort order.',
      hint: 'TreeSet is backed by a NavigableMap (TreeMap) implemented as a self-balancing Red-Black Tree.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> treeSet = new TreeSet<>(Arrays.asList(45, 12, 89, 3, 27, 66));
        System.out.println("Sorted TreeSet: " + treeSet);
        System.out.println("Smallest (first): " + treeSet.first());
        System.out.println("Largest (last): " + treeSet.last());
    }
}`,
      output: `Sorted TreeSet: [3, 12, 27, 45, 66, 89]
Smallest (first): 3
Largest (last): 89`,
      explanation: '`TreeSet` stores elements in an in-order self-balancing Red-Black tree, guaranteeing $O(\\log N)$ insertions and sorted iteration.'
    },
    {
      id: 'col-18-3-ex4',
      title: 'NavigableSet Range Queries (ceiling, floor, higher, lower)',
      problemStatement: 'Demonstrate `floor`, `ceiling`, `lower`, and `higher` methods on a `TreeSet` of threshold numbers.',
      hint: 'floor is <= target; lower is < target; ceiling is >= target; higher is > target.',
      solutionCode: `import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(10);
        set.add(20);
        set.add(30);
        set.add(40);

        int query = 25;
        System.out.println("Floor of 25 (<= 25): " + set.floor(query));
        System.out.println("Ceiling of 25 (>= 25): " + set.ceiling(query));
        System.out.println("Lower than 20 (< 20): " + set.lower(20));
        System.out.println("Higher than 30 (> 30): " + set.higher(30));
    }
}`,
      output: `Floor of 25 (<= 25): 20
Ceiling of 25 (>= 25): 30
Lower than 20 (< 20): 10
Higher than 30 (> 30): 40`,
      explanation: '`NavigableSet` methods navigate the Red-Black tree in $O(\\log N)$ time to find nearest predecessor and successor values.'
    },
    {
      id: 'col-18-3-ex5',
      title: 'TreeSet with Custom Comparator',
      problemStatement: 'Instantiate a `TreeSet` that sorts strings primarily by length descending, and secondarily alphabetically.',
      hint: 'Pass a Comparator lambda to the TreeSet constructor.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>(
            Comparator.comparingInt(String::length).reversed()
                      .thenComparing(Comparator.naturalOrder())
        );

        set.addAll(Arrays.asList("cat", "hippopotamus", "dog", "elephant", "zebra"));
        System.out.println("Custom Sorted TreeSet: " + set);
    }
}`,
      output: `Custom Sorted TreeSet: [hippopotamus, elephant, zebra, cat, dog]`,
      explanation: '`TreeSet` delegates all identity and ordering checks to the supplied `Comparator`; when `compare()` returns 0, the element is deemed a duplicate.'
    },
    {
      id: 'col-18-3-ex6',
      title: 'TreeSet compareTo vs equals Inconsistency Trap',
      problemStatement: 'Demonstrate what happens when `compareTo()` returns 0 for two objects whose `equals()` returns false, proving TreeSet ignores `equals()`.',
      hint: 'TreeSet considers elements duplicates if compare(a, b) == 0, regardless of equals().',
      solutionCode: `import java.util.*;

public class Main {
    static class Item implements Comparable<Item> {
        int id;
        String name;

        Item(int id, String name) {
            this.id = id;
            this.name = name;
        }

        @Override
        public int compareTo(Item o) {
            return Integer.compare(this.id, o.id); // Only compares id!
        }

        @Override
        public boolean equals(Object o) {
            if (!(o instanceof Item)) return false;
            Item other = (Item) o;
            return this.id == other.id && Objects.equals(this.name, other.name);
        }

        @Override
        public String toString() { return name + "#" + id; }
    }

    public static void main(String[] args) {
        TreeSet<Item> set = new TreeSet<>();
        set.add(new Item(1, "Widget"));
        set.add(new Item(1, "Gadget")); // Same id, different name!

        System.out.println("TreeSet Size: " + set.size());
        System.out.println("TreeSet Content: " + set);
        System.out.println("TreeSet rejected Gadget because compareTo returned 0, ignoring equals()!");
    }
}`,
      output: `TreeSet Size: 1
TreeSet Content: [Widget#1]
TreeSet rejected Gadget because compareTo returned 0, ignoring equals()!`,
      explanation: 'A fundamental Java contract rule: `TreeSet` uses `compareTo() == 0` to test for equality, completely bypassing `equals()`.'
    },
    {
      id: 'col-18-3-ex7',
      title: 'SubSet and HeadSet Range Views',
      problemStatement: 'Extract a bounded sub-view of a TreeSet between 20 (inclusive) and 50 (exclusive) using `subSet()`.',
      hint: 'set.subSet(from, to) returns a backed navigable view.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>(Arrays.asList(10, 20, 30, 40, 50, 60));
        SortedSet<Integer> sub = set.subSet(20, 50);

        System.out.println("SubSet [20, 50): " + sub);
        System.out.println("HeadSet (< 40): " + set.headSet(40));
        System.out.println("TailSet (>= 30): " + set.tailSet(30));
    }
}`,
      output: `SubSet [20, 50): [20, 30, 40]
HeadSet (< 40): [10, 20, 30]
TailSet (>= 30): [30, 40, 50, 60]`,
      explanation: '`subSet`, `headSet`, and `tailSet` produce bounded sub-tree window views in $O(1)$ time without copying elements.'
    },
    {
      id: 'col-18-3-ex8',
      title: 'Set Intersection, Union, and Difference',
      problemStatement: 'Perform standard mathematical set operations: Union (`addAll`), Intersection (`retainAll`), and Difference (`removeAll`).',
      hint: 'Work on defensive copies so the original sets remain unmodified.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Set<Integer> s1 = new HashSet<>(Arrays.asList(1, 2, 3, 4));
        Set<Integer> s2 = new HashSet<>(Arrays.asList(3, 4, 5, 6));

        // Union
        Set<Integer> union = new HashSet<>(s1);
        union.addAll(s2);
        System.out.println("Union: " + union);

        // Intersection
        Set<Integer> intersection = new HashSet<>(s1);
        intersection.retainAll(s2);
        System.out.println("Intersection: " + intersection);

        // Difference (s1 - s2)
        Set<Integer> diff = new HashSet<>(s1);
        diff.removeAll(s2);
        System.out.println("Difference: " + diff);
    }
}`,
      output: `Union: [1, 2, 3, 4, 5, 6]
Intersection: [3, 4]
Difference: [1, 2]`,
      explanation: '`retainAll` and `removeAll` execute set intersections and differences directly using the internal bucket hash lookups.'
    },
    {
      id: 'col-18-3-ex9',
      title: 'Null Rejection in TreeSet',
      problemStatement: 'Demonstrate that inserting `null` into a `TreeSet` throws NullPointerException in modern Java.',
      hint: 'TreeSet cannot compare null with existing elements using compareTo().',
      solutionCode: `import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>();
        set.add("Alpha");
        try {
            set.add(null);
        } catch (NullPointerException e) {
            System.out.println("Caught Expected: " + e.getClass().getSimpleName());
        }
        System.out.println("TreeSet strictly rejects null to prevent comparison crashes.");
    }
}`,
      output: `Caught Expected: NullPointerException
TreeSet strictly rejects null to prevent comparison crashes.`,
      explanation: 'Since JDK 7, `TreeSet` rejects `null` on insertion because calling `null.compareTo()` or passing `null` to a Comparator would cause fatal crashes.'
    },
    {
      id: 'col-18-3-ex10',
      title: 'EnumSet Bit-Vector Performance',
      problemStatement: 'Demonstrate creating and using an `EnumSet` for high-performance bit-flag manipulation.',
      hint: 'EnumSet is backed by a single 64-bit long (RegularEnumSet) when enum has <= 64 constants.',
      solutionCode: `import java.util.EnumSet;

public class Main {
    enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }

    public static void main(String[] args) {
        EnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);
        EnumSet<Day> workdays = EnumSet.range(Day.MON, Day.FRI);

        System.out.println("Weekend: " + weekend);
        System.out.println("Workdays: " + workdays);
        System.out.println("Is MON a workday? " + workdays.contains(Day.MON));
    }
}`,
      output: `Weekend: [SAT, SUN]
Workdays: [MON, TUE, WED, THU, FRI]
Is MON a workday? true`,
      explanation: '`EnumSet` is implemented internally as a single 64-bit `long` bit-vector, executing `contains` and set operations using lightning-fast bitwise CPU instructions.'
    }
  ],

  // ── LESSON 18.4: Queue, Deque & PriorityQueue ────────────────────────
  'queue-deque-and-priorityqueue': [
    {
      id: 'col-18-4-ex1',
      title: 'PriorityQueue Min-Heap Ordering',
      problemStatement: 'Add unsorted integers to a `PriorityQueue` and poll them in order, demonstrating that elements are retrieved in ascending order in $O(\\log N)$ time.',
      hint: 'PriorityQueue default constructor creates a binary min-heap.',
      solutionCode: `import java.util.PriorityQueue;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(40);
        pq.offer(10);
        pq.offer(30);
        pq.offer(5);
        pq.offer(20);

        System.out.print("Polled Order: ");
        while (!pq.isEmpty()) {
            System.out.print(pq.poll() + " ");
        }
        System.out.println();
    }
}`,
      output: `Polled Order: 5 10 20 30 40 `,
      explanation: 'The binary min-heap maintains the smallest element at index 0, restoring the heap invariant on every `poll()` via downward sifting in $O(\\log N)$ time.'
    },
    {
      id: 'col-18-4-ex2',
      title: 'PriorityQueue Max-Heap Configuration',
      problemStatement: 'Configure a `PriorityQueue` as a Max-Heap using `Collections.reverseOrder()` to retrieve largest elements first.',
      hint: 'Pass Collections.reverseOrder() to the constructor.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.offer(15);
        maxHeap.offer(50);
        maxHeap.offer(25);
        maxHeap.offer(90);

        System.out.println("Max Element: " + maxHeap.peek());
        System.out.print("Polled Order: ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");
        }
        System.out.println();
    }
}`,
      output: `Max Element: 90
Polled Order: 90 50 25 15 `,
      explanation: 'Inverting natural comparator ordering causes `siftUp` and `siftDown` to prioritize larger elements at the root.'
    },
    {
      id: 'col-18-4-ex3',
      title: 'Find Kth Largest Element with Fixed Min-Heap',
      problemStatement: 'Find the $K$-th largest element in an unsorted stream using a bounded min-heap of size $K$.',
      hint: 'Maintain min-heap of size K. If incoming element > pq.peek(), poll and offer incoming.',
      solutionCode: `import java.util.PriorityQueue;

public class Main {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        for (int x : nums) {
            minHeap.offer(x);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] nums = {3, 2, 1, 5, 6, 4};
        int k = 2;
        System.out.println("2nd Largest Element: " + findKthLargest(nums, k));
    }
}`,
      output: `2nd Largest Element: 5`,
      explanation: 'By capping the min-heap at size $K$, the root is strictly the $K$-th largest element, consuming only $O(K)$ space and $O(N \\log K)$ time.'
    },
    {
      id: 'col-18-4-ex4',
      title: 'ArrayDeque as a Circular FIFO Buffer',
      problemStatement: 'Demonstrate using `ArrayDeque` as a FIFO queue, highlighting `offer()`, `poll()`, and `peek()` methods.',
      hint: 'offer adds at tail, poll removes from head.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("Task 1");
        queue.offer("Task 2");
        queue.offer("Task 3");

        System.out.println("Front: " + queue.peek());
        System.out.println("Processing: " + queue.poll());
        System.out.println("Processing: " + queue.poll());
        System.out.println("Remaining queue: " + queue);
    }
}`,
      output: `Front: Task 1
Processing: Task 1
Processing: Task 2
Remaining queue: [Task 3]`,
      explanation: '`ArrayDeque` implements circular array pointer modulo indexing, achieving true $O(1)$ enqueue and dequeue operations.'
    },
    {
      id: 'col-18-4-ex5',
      title: 'PriorityQueue Custom Task Scheduling',
      problemStatement: 'Create a `Task` class with `priority` and `description`. Schedule tasks in a `PriorityQueue` such that highest priority runs first.',
      hint: 'Compare task.priority in descending order.',
      solutionCode: `import java.util.PriorityQueue;

public class Main {
    static class Task implements Comparable<Task> {
        int priority; // 1 = low, 10 = critical
        String name;

        Task(int priority, String name) {
            this.priority = priority;
            this.name = name;
        }

        @Override
        public int compareTo(Task o) {
            return Integer.compare(o.priority, this.priority); // Higher priority first
        }

        @Override
        public String toString() { return name + "(P=" + priority + ")"; }
    }

    public static void main(String[] args) {
        PriorityQueue<Task> scheduler = new PriorityQueue<>();
        scheduler.offer(new Task(3, "Backup Database"));
        scheduler.offer(new Task(10, "Security Patch"));
        scheduler.offer(new Task(5, "Send Newsletter"));

        System.out.println("Execution Order:");
        while (!scheduler.isEmpty()) {
            System.out.println("Executing: " + scheduler.poll());
        }
    }
}`,
      output: `Execution Order:
Executing: Security Patch(P=10)
Executing: Send Newsletter(P=5)
Executing: Backup Database(P=3)`,
      explanation: '`PriorityQueue` ensures that critical tasks with higher priority scores are always dispatched first in $O(\\log N)$ time.'
    },
    {
      id: 'col-18-4-ex6',
      title: 'Merge K Sorted Lists using PriorityQueue',
      problemStatement: 'Merge 3 sorted integer lists into a single sorted list using a PriorityQueue.',
      hint: 'Push the head of each list into the heap; continuously poll min and advance that list.',
      solutionCode: `import java.util.*;

public class Main {
    static class Element {
        int val, listIdx, elemIdx;
        Element(int val, int listIdx, int elemIdx) {
            this.val = val;
            this.listIdx = listIdx;
            this.elemIdx = elemIdx;
        }
    }

    public static List<Integer> mergeKSorted(List<List<Integer>> lists) {
        PriorityQueue<Element> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.val));
        for (int i = 0; i < lists.size(); i++) {
            if (!lists.get(i).isEmpty()) {
                pq.offer(new Element(lists.get(i).get(0), i, 0));
            }
        }

        List<Integer> result = new ArrayList<>();
        while (!pq.isEmpty()) {
            Element curr = pq.poll();
            result.add(curr.val);
            if (curr.elemIdx + 1 < lists.get(curr.listIdx).size()) {
                int nextVal = lists.get(curr.listIdx).get(curr.elemIdx + 1);
                pq.offer(new Element(nextVal, curr.listIdx, curr.elemIdx + 1));
            }
        }
        return result;
    }

    public static void main(String[] args) {
        List<List<Integer>> lists = Arrays.asList(
            Arrays.asList(1, 4, 7),
            Arrays.asList(2, 5, 8),
            Arrays.asList(3, 6, 9)
        );
        System.out.println("Merged: " + mergeKSorted(lists));
    }
}`,
      output: `Merged: [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
      explanation: 'Maintaining a heap of size $K$ merges $N$ total elements in optimal $O(N \\log K)$ time and $O(K)$ space.'
    },
    {
      id: 'col-18-4-ex7',
      title: 'ArrayDeque Bitwise Capacity Masking',
      problemStatement: 'Explain and demonstrate how `ArrayDeque` enforces power-of-two capacity so head and tail wrap around using `(tail + 1) & (elements.length - 1)` instead of slow modulo.',
      hint: 'Bitwise AND with (2^k - 1) is equivalent to modulo 2^k and runs in a single CPU cycle.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        int capacity = 16; // Power of two (2^4)
        int mask = capacity - 1; // 15 (binary 00001111)

        System.out.println("Pointer wrap-around using bitwise AND:");
        for (int i = 13; i <= 18; i++) {
            int wrappedIndex = i & mask;
            System.out.println("Index " + i + " & " + mask + " = " + wrappedIndex);
        }
    }
}`,
      output: `Pointer wrap-around using bitwise AND:
Index 13 & 15 = 13
Index 14 & 15 = 14
Index 15 & 15 = 15
Index 16 & 15 = 0
Index 17 & 15 = 1
Index 18 & 15 = 2`,
      explanation: 'Because array length is guaranteed to be a power of two, `(i + 1) & (length - 1)` performs instant bitwise modulo wrapping without expensive division hardware instructions.'
    },
    {
      id: 'col-18-4-ex8',
      title: 'BlockingQueue Producer-Consumer Handshake',
      problemStatement: 'Demonstrate thread-safe queue handoff using `ArrayBlockingQueue` with `put()` and `take()`.',
      hint: 'ArrayBlockingQueue blocks the producer when full and blocks the consumer when empty.',
      solutionCode: `import java.util.concurrent.*;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(2);

        // Producer thread
        Thread producer = new Thread(() -> {
            try {
                queue.put("Message 1");
                queue.put("Message 2");
                System.out.println("Producer placed 2 messages.");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        producer.join();

        System.out.println("Consumer consumed: " + queue.take());
        System.out.println("Consumer consumed: " + queue.take());
    }
}`,
      output: `Producer placed 2 messages.
Consumer consumed: Message 1
Consumer consumed: Message 2`,
      explanation: '`ArrayBlockingQueue` uses `ReentrantLock` and condition variables (`notFull`, `notEmpty`) to coordinate thread-safe producer-consumer pipelines.'
    },
    {
      id: 'col-18-4-ex9',
      title: 'PriorityQueue Mutation Pitfall',
      problemStatement: 'Demonstrate what happens when an object inside a PriorityQueue is modified externally without re-inserting it.',
      hint: 'PriorityQueue does not detect internal field changes; heap order becomes corrupted.',
      solutionCode: `import java.util.PriorityQueue;

public class Main {
    static class MutableItem implements Comparable<MutableItem> {
        int val;
        MutableItem(int val) { this.val = val; }
        @Override
        public int compareTo(MutableItem o) { return Integer.compare(this.val, o.val); }
        @Override
        public String toString() { return String.valueOf(val); }
    }

    public static void main(String[] args) {
        PriorityQueue<MutableItem> pq = new PriorityQueue<>();
        MutableItem item1 = new MutableItem(10);
        MutableItem item2 = new MutableItem(20);
        pq.offer(item1);
        pq.offer(item2);

        // Mutate item2 externally to be smaller than item1!
        item2.val = 5;

        // Heap is corrupted because siftUp was never triggered!
        System.out.println("Corrupted poll (Expected 5, got): " + pq.poll());
        System.out.println("Lesson: Never mutate elements stored inside a PriorityQueue!");
    }
}`,
      output: `Corrupted poll (Expected 5, got): 10
Lesson: Never mutate elements stored inside a PriorityQueue!`,
      explanation: '`PriorityQueue` only balances during `offer()` and `poll()`. Mutating object fields in-place corrupts the binary heap invariant.'
    },
    {
      id: 'col-18-4-ex10',
      title: 'ArrayDeque as LIFO Stack vs FIFO Queue Methods',
      problemStatement: 'Demonstrate that calling `push()` and `pop()` treats ArrayDeque as a LIFO stack, while `offer()` and `poll()` treats it as a FIFO queue.',
      hint: 'push adds at head; offer adds at tail.',
      solutionCode: `import java.util.ArrayDeque;

public class Main {
    public static void main(String[] args) {
        // Stack mode (LIFO)
        ArrayDeque<String> stack = new ArrayDeque<>();
        stack.push("Bottom");
        stack.push("Top");
        System.out.println("Stack Pop: " + stack.pop()); // Returns "Top"

        // Queue mode (FIFO)
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.offer("First");
        queue.offer("Second");
        System.out.println("Queue Poll: " + queue.poll()); // Returns "First"
    }
}`,
      output: `Stack Pop: Top
Queue Poll: First`,
      explanation: '`ArrayDeque` implements both `Deque` and `Queue`: `push`/`pop` operate on the head for LIFO, while `offer`/`poll` operate from tail to head for FIFO.'
    }
  ]
};
