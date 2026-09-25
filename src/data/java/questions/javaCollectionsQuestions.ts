import { JavaMCQ } from './javaOOPQuestions';

export const javaCollectionsQuestions: JavaMCQ[] = [
  {
    id: 'coll-1',
    moduleId: 'java-collections',
    question: 'Which interface is the root of the Java Collections Framework (excluding Map)?',
    options: [
      'Collection',
      'Iterable',
      'List',
      'Set'
    ],
    correctAnswer: 1,
    explanation: 'The Iterable interface is the true root of the Collections framework. The Collection interface extends Iterable.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['hierarchy', 'iterable']
  },
  {
    id: 'coll-2',
    moduleId: 'java-collections',
    question: 'What is the primary difference between ArrayList and LinkedList?',
    options: [
      'ArrayList is faster for insertions in the middle, while LinkedList is faster for random access.',
      'ArrayList uses a dynamic array for storage, while LinkedList uses a doubly-linked list.',
      'LinkedList implements the Set interface, while ArrayList implements List.',
      'ArrayList is synchronized, while LinkedList is not.'
    ],
    correctAnswer: 1,
    explanation: 'ArrayList is backed by an array, offering fast random access. LinkedList is backed by nodes pointing to each other, making insertions/deletions at the ends faster but random access slower.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['arraylist', 'linkedlist']
  },
  {
    id: 'coll-3',
    moduleId: 'java-collections',
    question: 'Which Collection does not allow duplicate elements?',
    options: [
      'List',
      'Set',
      'Queue',
      'ArrayList'
    ],
    correctAnswer: 1,
    explanation: 'A Set is a collection that contains no duplicate elements.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['set', 'duplicates']
  },
  {
    id: 'coll-4',
    moduleId: 'java-collections',
    question: 'Which implementation of Set maintains insertion order?',
    options: [
      'HashSet',
      'TreeSet',
      'LinkedHashSet',
      'EnumSet'
    ],
    correctAnswer: 2,
    explanation: 'LinkedHashSet maintains a doubly-linked list running through all of its entries, which allows it to preserve insertion order.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['linkedhashset', 'order']
  },
  {
    id: 'coll-5',
    moduleId: 'java-collections',
    question: 'Which implementation of Set stores its elements sorted by their natural ordering?',
    options: [
      'HashSet',
      'LinkedHashSet',
      'TreeSet',
      'SortedSet'
    ],
    correctAnswer: 2,
    explanation: 'TreeSet relies on a TreeMap to store elements and maintains them ordered according to their natural ordering or a specified Comparator.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['treeset', 'sorting']
  },
  {
    id: 'coll-6',
    moduleId: 'java-collections',
    question: 'What is the main difference between HashMap and Hashtable?',
    options: [
      'HashMap is thread-safe, Hashtable is not.',
      'Hashtable allows null keys, HashMap does not.',
      'Hashtable is synchronized and does not allow null keys or values, while HashMap is unsynchronized and allows one null key.',
      'HashMap maintains insertion order, Hashtable does not.'
    ],
    correctAnswer: 2,
    explanation: 'Hashtable is a legacy synchronized class that forbids nulls. HashMap is non-synchronized and permits one null key and multiple null values.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['hashmap', 'hashtable']
  },
  {
    id: 'coll-7',
    moduleId: 'java-collections',
    question: 'Which Map implementation guarantees that the keys will be in ascending order?',
    options: [
      'HashMap',
      'LinkedHashMap',
      'TreeMap',
      'ConcurrentHashMap'
    ],
    correctAnswer: 2,
    explanation: 'TreeMap implements SortedMap and guarantees that the map will be in ascending key order.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['treemap', 'sorting']
  },
  {
    id: 'coll-8',
    moduleId: 'java-collections',
    question: 'What is a "fail-fast" Iterator?',
    options: [
      'An iterator that skips null values.',
      'An iterator that returns elements instantly.',
      'An iterator that throws ConcurrentModificationException if the collection is modified directly while iterating.',
      'An iterator used only in multi-threaded environments.'
    ],
    correctAnswer: 2,
    explanation: 'Fail-fast iterators throw a ConcurrentModificationException immediately if they detect the collection has been structurally modified after the iterator was created.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['iterator', 'fail-fast']
  },
  {
    id: 'coll-9',
    moduleId: 'java-collections',
    question: 'Which class provides utility methods for collections, such as sorting and reversing?',
    options: [
      'Collection',
      'Collections',
      'Arrays',
      'Utils'
    ],
    correctAnswer: 1,
    explanation: 'The java.util.Collections class consists exclusively of static methods that operate on or return collections.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['collections-utility']
  },
  {
    id: 'coll-10',
    moduleId: 'java-collections',
    question: 'What is the difference between Comparable and Comparator?',
    options: [
      'Comparable is used to define natural sorting within the class, Comparator is used for custom sorting outside the class.',
      'They are identical and can be used interchangeably.',
      'Comparable handles multiple sorting sequences, Comparator handles single sequences.',
      'Comparator is in java.lang, Comparable is in java.util.'
    ],
    correctAnswer: 0,
    explanation: 'Comparable provides a natural ordering (implemented in the class via compareTo), while Comparator allows creating multiple external sorting logics (via compare method).',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['comparable', 'comparator']
  },
  {
    id: 'coll-11',
    moduleId: 'java-collections',
    question: 'Which data structure follows First-In-First-Out (FIFO) ordering?',
    options: [
      'Stack',
      'Queue',
      'Set',
      'Tree'
    ],
    correctAnswer: 1,
    explanation: 'A Queue typically orders elements in a FIFO (first-in-first-out) manner.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['queue', 'fifo']
  },
  {
    id: 'coll-12',
    moduleId: 'java-collections',
    question: 'How do you create an unmodifiable list of elements in modern Java (Java 9+)?',
    options: [
      'List.unmodifiable(1, 2, 3)',
      'new ArrayList<>(1, 2, 3).lock()',
      'List.of(1, 2, 3)',
      'Arrays.asList(1, 2, 3)'
    ],
    correctAnswer: 2,
    explanation: 'List.of() introduced in Java 9 creates an immutable (unmodifiable) list containing the specified elements.',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['list.of', 'java-9']
  },
  {
    id: 'coll-13',
    moduleId: 'java-collections',
    question: 'What happens if you insert a null key into a TreeMap?',
    options: [
      'It is added successfully as the first element.',
      'It is added successfully as the last element.',
      'It throws a NullPointerException.',
      'It throws an IllegalArgumentException.'
    ],
    correctAnswer: 2,
    explanation: 'TreeMap sorts its keys using compareTo(). Since you cannot call compareTo() on null, it throws a NullPointerException.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['treemap', 'null']
  },
  {
    id: 'coll-14',
    moduleId: 'java-collections',
    question: 'What happens if you use a custom object as a key in a HashMap without overriding hashCode() and equals()?',
    options: [
      'The map will not compile.',
      'The map will function normally based on memory addresses, often leading to unretrievable values.',
      'The compiler automatically generates hashCode() based on object fields.',
      'HashMap will use a default key.'
    ],
    correctAnswer: 1,
    explanation: 'If equals() and hashCode() are not overridden, Object\'s default implementations (based on memory address) are used, making it nearly impossible to retrieve the value with a new identical object instance.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['hashmap', 'custom-objects']
  },
  {
    id: 'coll-15',
    moduleId: 'java-collections',
    question: 'Which method should you use to add an element to a Queue without throwing an exception if capacity is full (in a bounded queue)?',
    options: [
      'add()',
      'insert()',
      'offer()',
      'push()'
    ],
    correctAnswer: 2,
    explanation: 'The offer() method is designed for use with capacity-restricted queues and returns false if it fails, whereas add() throws an IllegalStateException.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['queue', 'offer']
  },
  {
    id: 'coll-16',
    moduleId: 'java-collections',
    question: 'Which collection is a synchronized data structure implementing List?',
    options: [
      'ArrayList',
      'LinkedList',
      'Vector',
      'CopyOnWriteArrayList'
    ],
    correctAnswer: 2,
    explanation: 'Vector is a legacy synchronized List implementation. (CopyOnWriteArrayList is also thread-safe, but Vector is the classic synchronized one).',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['vector', 'synchronization']
  },
  {
    id: 'coll-17',
    moduleId: 'java-collections',
    question: 'Which Map implementation maintains insertion order of keys?',
    options: [
      'HashMap',
      'TreeMap',
      'LinkedHashMap',
      'ConcurrentHashMap'
    ],
    correctAnswer: 2,
    explanation: 'LinkedHashMap maintains a doubly-linked list running through all its entries, preserving the insertion order.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['linkedhashmap', 'order']
  },
  {
    id: 'coll-18',
    moduleId: 'java-collections',
    question: 'What happens if a HashMap get() method uses a key whose properties were mutated after it was inserted (changing its hashCode)?',
    options: [
      'The get() method will return the correct value.',
      'The get() method will likely return null because the hash bucket changed.',
      'The map automatically rehashes the key.',
      'A ConcurrentModificationException is thrown.'
    ],
    correctAnswer: 1,
    explanation: 'If a key\'s hashCode changes after insertion, the HashMap will look in the wrong bucket and fail to find the original entry, returning null.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['hashmap', 'mutation']
  },
  {
    id: 'coll-19',
    moduleId: 'java-collections',
    question: 'What does PriorityQueue order its elements based on?',
    options: [
      'Insertion order',
      'Reverse insertion order',
      'Natural ordering or a provided Comparator',
      'Random order'
    ],
    correctAnswer: 2,
    explanation: 'A PriorityQueue orders its elements according to their natural ordering or by a Comparator provided at queue construction time.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['priorityqueue', 'ordering']
  },
  {
    id: 'coll-20',
    moduleId: 'java-collections',
    question: 'What happens if you try to add a duplicate element to a HashSet?',
    options: [
      'The program throws an exception.',
      'The new element is added and the set grows.',
      'The add() method returns false and the set remains unchanged.',
      'The existing element is pushed down in the set.'
    ],
    correctAnswer: 2,
    explanation: 'If a Set already contains the element, the add() method returns false and does not change the set.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['hashset', 'duplicates']
  },
  {
    id: 'coll-21',
    moduleId: 'java-collections',
    question: 'Is it allowed to have a null key in a HashMap?',
    options: [
      'No, a NullPointerException is thrown.',
      'Yes, but only one null key is allowed.',
      'Yes, you can have unlimited null keys.',
      'Only if the values are also null.'
    ],
    correctAnswer: 1,
    explanation: 'HashMap allows at most one null key (since duplicate keys are not allowed).',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['hashmap', 'null']
  },
  {
    id: 'coll-22',
    moduleId: 'java-collections',
    question: 'How do you convert an Array to a List?',
    options: [
      'List.toArray()',
      'Arrays.asList()',
      'Collections.toList()',
      'new List(array)'
    ],
    correctAnswer: 1,
    explanation: 'Arrays.asList() provides a fixed-size list backed by the specified array.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['arrays', 'list']
  },
  {
    id: 'coll-23',
    moduleId: 'java-collections',
    question: 'Which method returns the number of elements in a Collection?',
    options: [
      'length',
      'length()',
      'size()',
      'count()'
    ],
    correctAnswer: 2,
    explanation: 'The size() method returns the number of elements in a collection, unlike arrays which use the length property.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['size']
  },
  {
    id: 'coll-24',
    moduleId: 'java-collections',
    question: 'What interface does a Stack implement?',
    options: [
      'Queue',
      'Set',
      'List',
      'Map'
    ],
    correctAnswer: 2,
    explanation: 'The Stack class extends Vector, which implements the List interface.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['stack', 'list']
  },
  {
    id: 'coll-25',
    moduleId: 'java-collections',
    question: 'What happens when ArrayList reaches its maximum capacity during an add() operation?',
    options: [
      'It throws an OutOfMemoryError.',
      'It throws an IndexOutOfBoundsException.',
      'It automatically grows its internal array capacity (usually by 50%).',
      'It deletes the oldest element.'
    ],
    correctAnswer: 2,
    explanation: 'When an ArrayList exceeds its internal capacity, it automatically creates a new larger array (typically 1.5x the size) and copies the elements over.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['arraylist', 'capacity']
  }
];
