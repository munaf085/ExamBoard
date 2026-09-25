// @ts-nocheck

import { JavaMCQ } from './javaOOPQuestions';

export const javaStreamsQuestions: JavaMCQ[] = [
  {
    id: 'str-1',
    moduleId: 'java-streams',
    question: 'What is a Stream in Java 8?',
    options: [
      'A new kind of I/O reader to replace InputStream.',
      'A sequence of elements supporting sequential and parallel aggregate operations.',
      'A data structure that stores elements permanently.',
      'An interface that extends Collection.'
    ],
    correctAnswer: 1,
    explanation: 'A Stream is a sequence of elements supporting sequential and parallel aggregate operations. It does not store data like a Collection.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['stream', 'definition']
  },
  {
    id: 'str-2',
    moduleId: 'java-streams',
    question: 'Which of the following is an intermediate operation?',
    options: [
      'forEach()',
      'collect()',
      'filter()',
      'count()'
    ],
    correctAnswer: 2,
    explanation: 'Intermediate operations return another Stream (e.g., filter, map). Terminal operations (forEach, collect, count) produce a non-stream result.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['intermediate-operations', 'filter']
  },
  {
    id: 'str-3',
    moduleId: 'java-streams',
    question: 'What is the characteristic of Stream laziness?',
    options: [
      'Streams process elements very slowly.',
      'Intermediate operations are not executed until a terminal operation is invoked.',
      'Streams wait for the garbage collector before executing.',
      'Streams only execute in parallel.'
    ],
    correctAnswer: 1,
    explanation: 'Streams are lazy; computation on the source data is only performed when the terminal operation is initiated, and source elements are consumed only as needed.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['laziness']
  },
  {
    id: 'str-4',
    moduleId: 'java-streams',
    question: 'Can a Stream be reused after a terminal operation has been executed?',
    options: [
      'Yes, it resets to the beginning.',
      'No, a Stream is consumed and cannot be reused.',
      'Yes, but only for the same terminal operation.',
      'Only if it is a parallel stream.'
    ],
    correctAnswer: 1,
    explanation: 'Once a terminal operation is invoked, the Stream is considered consumed or closed, and you will get an IllegalStateException if you try to use it again.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['stream-reuse']
  },
  {
    id: 'str-5',
    moduleId: 'java-streams',
    question: 'What does the map() operation do in a Stream?',
    options: [
      'Filters elements based on a condition.',
      'Converts the stream into a HashMap.',
      'Applies a given function to the elements, returning a stream consisting of the results.',
      'Sorts the elements.'
    ],
    correctAnswer: 2,
    explanation: 'The map() operation transforms each element of the stream into another object using the provided Function.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['map', 'transformation']
  },
  {
    id: 'str-6',
    moduleId: 'java-streams',
    question: 'Which operation would you use to remove duplicate elements from a stream?',
    options: [
      'filter(unique)',
      'distinct()',
      'unique()',
      'removeDuplicates()'
    ],
    correctAnswer: 1,
    explanation: 'The distinct() intermediate operation returns a stream consisting of the distinct elements based on Object.equals().',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['distinct', 'duplicates']
  },
  {
    id: 'str-7',
    moduleId: 'java-streams',
    question: 'What is the return type of the count() terminal operation?',
    options: [
      'int',
      'Integer',
      'long',
      'Optional'
    ],
    correctAnswer: 2,
    explanation: 'The count() operation returns a long representing the number of elements in the stream.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['count']
  },
  {
    id: 'str-8',
    moduleId: 'java-streams',
    question: 'What does the reduce() operation do?',
    options: [
      'Limits the stream to a specific number of elements.',
      'Removes elements that do not match a predicate.',
      'Combines elements of a stream to produce a single summary result.',
      'Transforms elements from one type to another.'
    ],
    correctAnswer: 2,
    explanation: 'reduce() performs a reduction on the elements of the stream, using an associative accumulation function, and returns an Optional or a specific value.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['reduce', 'reduction']
  },
  {
    id: 'str-9',
    moduleId: 'java-streams',
    question: 'What will be the output of the following code?',
    code: `List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 3)
    .forEach(System.out::println);`,
    options: [
      '2, 4',
      '3, 6, 9, 12, 15',
      '6, 12',
      'Compilation Error'
    ],
    correctAnswer: 2,
    explanation: 'filter passes only even numbers (2, 4). map multiplies them by 3 (6, 12). forEach prints them.',
    difficulty: 'Medium',
    type: 'output',
    tags: ['filter', 'map', 'forEach']
  },
  {
    id: 'str-10',
    moduleId: 'java-streams',
    question: 'Which method reference is equivalent to n -> System.out.println(n)?',
    options: [
      'System.out.println',
      'System.out::println',
      'System::out::println',
      'System.out.println()'
    ],
    correctAnswer: 1,
    explanation: 'Method references use the :: syntax. System.out::println is a reference to an instance method on a particular object (System.out).',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['method-reference']
  },
  {
    id: 'str-11',
    moduleId: 'java-streams',
    question: 'What does the flatMap() operation do?',
    options: [
      'Flattens a 2D array into a 1D array directly.',
      'Transforms each element into a stream of objects, and then flattens the resulting streams into a single stream.',
      'Compresses the stream to save memory.',
      'Sorts a stream completely flat.'
    ],
    correctAnswer: 1,
    explanation: 'flatMap maps each element to a stream, and then concatenates (flattens) those streams into one combined stream.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['flatMap']
  },
  {
    id: 'str-12',
    moduleId: 'java-streams',
    question: 'What is the purpose of the Optional class?',
    options: [
      'To provide optional parameters to methods.',
      'To represent a container object which may or may not contain a non-null value, avoiding NullPointerExceptions.',
      'To allow fields in a class to be optional.',
      'To skip compilation errors.'
    ],
    correctAnswer: 1,
    explanation: 'Optional is a container object used to contain not-null objects, helping developers avoid NullPointerExceptions by explicitly indicating the absence of a value.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['optional']
  },
  {
    id: 'str-13',
    moduleId: 'java-streams',
    question: 'Which Functional Interface takes one argument and returns a boolean?',
    options: [
      'Function',
      'Consumer',
      'Predicate',
      'Supplier'
    ],
    correctAnswer: 2,
    explanation: 'A Predicate takes one argument and returns a boolean. It is heavily used in the filter() method.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['functional-interfaces', 'predicate']
  },
  {
    id: 'str-14',
    moduleId: 'java-streams',
    question: 'Which Functional Interface takes no arguments and returns a result?',
    options: [
      'Consumer',
      'Predicate',
      'Supplier',
      'Function'
    ],
    correctAnswer: 2,
    explanation: 'A Supplier provides a result and takes no arguments.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['functional-interfaces', 'supplier']
  },
  {
    id: 'str-15',
    moduleId: 'java-streams',
    question: 'Which terminal operation determines if ANY element of the stream matches the provided predicate?',
    options: [
      'findAny()',
      'anyMatch()',
      'allMatch()',
      'contains()'
    ],
    correctAnswer: 1,
    explanation: 'anyMatch() takes a Predicate and returns true if at least one element matches the condition.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['anyMatch']
  },
  {
    id: 'str-16',
    moduleId: 'java-streams',
    question: 'How do you collect stream elements into a List?',
    options: [
      'stream.toList() (in Java 8)',
      'stream.collect(Collectors.toList())',
      'stream.asList()',
      'stream.aggregate(List)'
    ],
    correctAnswer: 1,
    explanation: 'In Java 8, Collectors.toList() is passed into the collect() method. (Java 16 introduced a direct toList() method, but Collectors.toList() is the classic Java 8 way).',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['collectors', 'toList']
  },
  {
    id: 'str-17',
    moduleId: 'java-streams',
    question: 'Which Collector groups elements by a classifier function?',
    options: [
      'Collectors.groupBy',
      'Collectors.partitioningBy',
      'Collectors.groupingBy',
      'Collectors.mapping'
    ],
    correctAnswer: 2,
    explanation: 'Collectors.groupingBy() returns a Collector implementing a "group by" operation on input elements, returning a Map.',
    difficulty: 'Hard',
    type: 'syntax',
    tags: ['collectors', 'groupingBy']
  },
  {
    id: 'str-18',
    moduleId: 'java-streams',
    question: 'What is the difference between groupingBy and partitioningBy?',
    options: [
      'partitioningBy partitions into exactly two groups (true/false) based on a Predicate, groupingBy groups by any object type based on a Function.',
      'There is no difference.',
      'groupingBy uses parallel processing, partitioningBy does not.',
      'partitioningBy works on Sets, groupingBy works on Lists.'
    ],
    correctAnswer: 0,
    explanation: 'partitioningBy takes a Predicate and splits the data into a Map<Boolean, List<T>>. groupingBy takes a Function and splits by the return type of that function.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['groupingBy', 'partitioningBy']
  },
  {
    id: 'str-19',
    moduleId: 'java-streams',
    question: 'What happens if you call get() on an empty Optional?',
    options: [
      'It returns null.',
      'It throws a NullPointerException.',
      'It throws NoSuchElementException.',
      'It returns Optional.empty().'
    ],
    correctAnswer: 2,
    explanation: 'Calling get() on an Optional that has no value throws a NoSuchElementException.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['optional', 'get']
  },
  {
    id: 'str-20',
    moduleId: 'java-streams',
    question: 'Which method should you use on Optional to provide a fallback value if the Optional is empty?',
    options: [
      'getOrElse()',
      'orElse()',
      'ifEmpty()',
      'fallback()'
    ],
    correctAnswer: 1,
    explanation: 'orElse(T other) returns the value if present, otherwise returns the specified other value.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['optional', 'orElse']
  },
  {
    id: 'str-21',
    moduleId: 'java-streams',
    question: 'What does the limit(n) method do?',
    options: [
      'Throws an exception if the stream has more than n elements.',
      'Returns a stream consisting of the elements of the stream, truncated to be no longer than n in length.',
      'Skips the first n elements of the stream.',
      'Checks if the stream size is exactly n.'
    ],
    correctAnswer: 1,
    explanation: 'limit(n) is an intermediate, short-circuiting operation that truncates the stream to the specified maximum size.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['limit']
  },
  {
    id: 'str-22',
    moduleId: 'java-streams',
    question: 'Which intermediate operation discards the first n elements of a stream?',
    options: [
      'drop()',
      'discard()',
      'skip()',
      'remove()'
    ],
    correctAnswer: 2,
    explanation: 'skip(n) returns a stream consisting of the remaining elements of the stream after discarding the first n elements.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['skip']
  },
  {
    id: 'str-23',
    moduleId: 'java-streams',
    question: 'Which Functional Interface represents an operation that accepts a single input argument and returns no result (used in forEach)?',
    options: [
      'Function',
      'Runnable',
      'Predicate',
      'Consumer'
    ],
    correctAnswer: 3,
    explanation: 'Consumer<T> accepts a single argument and returns no result. It operates via side effects.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['functional-interfaces', 'consumer']
  },
  {
    id: 'str-24',
    moduleId: 'java-streams',
    question: 'What happens if a stream pipeline has no terminal operation?',
    options: [
      'The intermediate operations execute and print their results.',
      'The intermediate operations never execute.',
      'It causes a memory leak.',
      'It compiles with a warning.'
    ],
    correctAnswer: 1,
    explanation: 'Because streams are lazy, without a terminal operation, no processing is actually performed on the source elements.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['laziness', 'terminal-operations']
  },
  {
    id: 'str-25',
    moduleId: 'java-streams',
    question: 'Can you have a parallel stream in Java 8?',
    options: [
      'No, streams are strictly sequential.',
      'Yes, by calling .parallelStream() on a collection or .parallel() on an existing stream.',
      'Only if you implement Runnable.',
      'Yes, but only for Collections of Integers.'
    ],
    correctAnswer: 1,
    explanation: 'You can create a parallel stream directly from a collection using parallelStream(), or transform a sequential stream into parallel using parallel().',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['parallel-stream']
  }
];

