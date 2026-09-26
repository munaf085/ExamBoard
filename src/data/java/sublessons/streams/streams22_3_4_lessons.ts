import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 22: JAVA 8+ STREAMS & LAMBDAS (LESSONS 22.3 & 22.4)
// Authoritative FAANG-Standard Streams, Collectors, Optional & Concurrency
// ============================================================

export const streams22_3_4_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 22.3: Terminal Operations, Reduction & Advanced Collectors
  // ─────────────────────────────────────────────────────────────
  'terminal-operations-and-collectors': {
    id: 'terminal-operations-and-collectors',
    moduleId: 'java-streams',
    moduleTitle: '22. Java 8+ Streams & Lambdas',
    lessonNumber: 'Lesson 22.3',
    title: 'Terminal Operations, Reduction & Advanced Collectors',
    subtitle: 'Eager pipeline execution, reduce() accumulator vs combiner, Collectors.toList/toSet/toMap collision handling, groupingBy multi-level aggregation, partitioningBy, and custom Collector mechanics',
    estimatedMinutes: 32,
    beginnerAnalogy: 'A specialized automated manufacturing and packaging assembly line. Intermediate stream operations (filter, map, sorted) are like conveyor belts, guide rails, and spray nozzles that only prepare the items—nothing actually moves until a worker at the end of the line (the terminal operation) engages the master packaging motor. If the terminal operation is `reduce()`, all incoming raw metal sheets are melted down and forged into a single engine block. If it is `collect(groupingBy())`, a sorting robot inspects each item and places it into designated color-coded storage crates. And if the terminal operation is `toMap()`, each item is placed into an addressable locker based on its barcode; if two items share the exact same barcode and you haven\'t supplied a dispute resolution rule (merge function), the entire factory halt alarm sounds with an IllegalStateException!',
    interviewTakeaways: [
      'Terminal Operations Drive Pipeline Execution: Streams are strictly lazy. No intermediate operation (filter, map, flatMap) executes until a terminal operation is invoked. Once a terminal operation completes, the stream is consumed and closed; invoking any further operation on it throws IllegalStateException.',
      'Taxonomy of Non-Collector Terminals: Matching operations (allMatch, anyMatch, noneMatch) and element finders (findFirst, findAny) are short-circuiting operations that stop processing upon determining the boolean result. Iteration (forEach, forEachOrdered) and reductions (count, min, max, reduce) process elements eagerly.',
      'The Three Variants of reduce(): (1) Optional<T> reduce(BinaryOperator<T>) without identity; (2) T reduce(T identity, BinaryOperator<T>) with identity; (3) <U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner) required when transforming item type T into an accumulator type U in parallel streams.',
      'Associativity & Identity Invariants: In parallel reduce(), the identity value I must satisfy combiner.apply(I, u) == u, and the accumulator and combiner functions must be strictly associative: (a op b) op c == a op (b op c). Violating associativity results in non-deterministic, silent data corruption.',
      'toMap Collision Trap: Collectors.toMap(keyMapper, valueMapper) throws an IllegalStateException with "Duplicate key" if two elements produce identical keys. Production-grade code must supply a mergeFunction: Collectors.toMap(keyMapper, valueMapper, (oldVal, newVal) -> newVal, LinkedHashMap::new).',
      'Multi-Level groupingBy Aggregations: Collectors.groupingBy() can be nested infinitely using downstream collectors: groupingBy(classifier, downstream). Common downstream collectors include counting(), summingDouble(), mapping(), maxBy(), and filtering() (Java 9+). To enforce map ordering, use the 3-parameter overload specifying a map supplier like TreeMap::new.',
      'partitioningBy Mechanics: Collectors.partitioningBy(Predicate) partitions elements into a Map<Boolean, List<T>>. Crucially, the returned Map ALWAYS contains both Boolean.TRUE and Boolean.FALSE keys, even if one or both partitions are empty.',
      'The Anatomy of a Collector: A Collector<T, A, R> is defined by five components: supplier() (creates mutable container A), accumulator() (folds element T into container A), combiner() (merges two containers A in parallel execution), finisher() (transforms container A into final result R), and characteristics() (CONCURRENT, UNORDERED, IDENTITY_FINISH).'
    ],
    cheatSheet: {
      summary: 'Terminal operations trigger eager stream evaluation, consuming the stream. Reductions fold elements into a summary value, while Collectors accumulate elements into rich collections, multi-level grouped maps, or custom data structures.',
      syntaxTemplate: `// 1. Basic & Unmodifiable Collections
List<String> list = stream.collect(Collectors.toList());
List<String> immutable = stream.collect(Collectors.toUnmodifiableList()); // Java 10+
Set<String> set = stream.collect(Collectors.toCollection(TreeSet::new));

// 2. Safe toMap with collision handler & map supplier
Map<Integer, String> map = stream.collect(Collectors.toMap(
    Item::getId,
    Item::getName,
    (existing, replacement) -> existing, // merge function resolves collision!
    LinkedHashMap::new                    // preserves insertion order
));

// 3. Multi-level groupingBy with downstream aggregation
Map<Department, Double> deptSalaries = employees.stream().collect(
    Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.summingDouble(Employee::getSalary)
    )
);

// 4. Custom 3-arg parallel reduce
int totalLength = strings.parallelStream().reduce(
    0,                                      // identity
    (accum, str) -> accum + str.length(),    // accumulator
    Integer::sum                            // combiner
);`,
      rules: [
        { rule: 'Single Use Stream', explanation: 'A stream cannot be reused after any terminal operation has been called. Attempting to do so throws IllegalStateException.' },
        { rule: 'toMap Duplicate Key Trap', explanation: 'The 2-argument Collectors.toMap() throws IllegalStateException on duplicate keys. Always supply a merge function when keys might not be unique.' },
        { rule: 'Parallel Reducer Associativity', explanation: 'Accumulator and combiner functions in reduce() must be strictly associative. Non-associative operations like subtraction or division produce corrupted parallel results.' },
        { rule: 'Partitioning Map Completeness', explanation: 'partitioningBy() always returns a Map with both true and false keys populated, even if one group contains zero matching elements.' },
        { rule: 'Downstream Collector Default', explanation: 'The 1-arg groupingBy(classifier) implicitly defaults to downstream toList(): groupingBy(classifier, toList()).' },
        { rule: 'IDENTITY_FINISH Optimization', explanation: 'When the intermediate accumulator container matches the final return type, the finisher function is Function.identity() and marked with Characteristics.IDENTITY_FINISH.' }
      ],
      quickComparison: [
        { aspect: 'collect() vs reduce()', optionA: 'collect() performs mutable reduction into a container (List, Map, StringBuilder) without reallocating objects.', optionB: 'reduce() performs immutable reduction by combining two values into an updated value (e.g., Integer::sum).' },
        { aspect: 'forEach() vs forEachOrdered()', optionA: 'forEach() ignores encounter order in parallel streams for higher throughput.', optionB: 'forEachOrdered() strictly preserves encounter order even across parallel worker threads.' },
        { aspect: 'findFirst() vs findAny()', optionA: 'findFirst() guarantees returning the first encounter-order element (costly in parallel).', optionB: 'findAny() returns any encountered element non-deterministically (optimal for parallel).' },
        { aspect: 'groupingBy() vs partitioningBy()', optionA: 'groupingBy(Function) splits into arbitrary keys (Map<K, List<T>>) using classifier hash.', optionB: 'partitioningBy(Predicate) strictly splits into a Map<Boolean, List<T>> with true/false.' }
      ]
    },
    coreExplanation: [
      'Terminal Operations Lifecycle & Eager Execution: Stream pipelines in Java are divided into intermediate operations (which transform a stream into another stream lazily) and terminal operations (which initiate traversal, consume elements, and produce a non-stream result or side-effect). Intermediate operations build an internal execution graph of PipelineHelper and Sink nodes. No computation occurs until a terminal operation (such as collect, reduce, count, min, max, or forEach) is called. Upon terminal invocation, the pipeline pulls or pushes elements through the chained Sink operators. Once the terminal operation completes, the stream is considered operated upon and closed. Any subsequent call to intermediate or terminal operations on that stream instance throws java.lang.IllegalStateException.',
      'Non-Collector Terminals and Short-Circuiting: Not all terminal operations need to process the entire dataset. Short-circuiting terminal operations terminate infinite or finite streams as soon as their termination condition is satisfied. Matching methods—allMatch(Predicate), anyMatch(Predicate), noneMatch(Predicate)—short-circuit based on boolean truth tables (e.g., anyMatch stops immediately upon encountering the first true element). Similarly, findFirst() and findAny() return an Optional<T> representing an element matching upstream filters. In sequential streams, findAny() almost always returns the first element, but in parallel streams, findAny() permits worker threads to return whichever element they find first without coordinating encounter order. Conversely, count(), min(Comparator), max(Comparator), and forEach() must evaluate every remaining element.',
      'The Mechanics of reduce(): The reduce() method implements fold operations. Java provides three overloads: (1) `Optional<T> reduce(BinaryOperator<T> accumulator)`: Returns empty Optional if the stream is empty, otherwise folds elements using the accumulator. (2) `T reduce(T identity, BinaryOperator<T> accumulator)`: Uses the identity value as the initial seed and returns T directly; if the stream is empty, identity is returned. (3) `<U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner)`: Used when the stream element type T differs from the accumulated result type U. In a parallel stream, each thread independently folds a sub-stream of T into a partial result U using the accumulator; the combiner then merges these partial U results into a single final U.',
      'The Invariants of Parallel Reduction: For parallel reduction to yield deterministic, correct results, two mathematical laws must hold: (a) Identity Contract: `combiner.apply(identity, u) == u` for all values u. (b) Associativity Contract: `combiner.apply(a, combiner.apply(b, c)) == combiner.apply(combiner.apply(a, b), c)`. If you attempt to reduce numbers using subtraction `(a, b) -> a - b`, the operation is non-associative: `(10 - 2) - 1 = 7`, but `10 - (2 - 1) = 9`. Running non-associative operations in parallel pipelines produces silent, non-deterministic bugs that evade unit tests.',
      'The Collectors API & toMap Collision Handling: While reduce() combines values immutably, `collect()` performs mutable reduction, accumulating items into a mutable container (like an ArrayList or StringBuilder) without the overhead of creating intermediate wrapper objects. Collectors.toList() and Collectors.toSet() collect into standard collections. When collecting into maps, `Collectors.toMap(keyMapper, valueMapper)` evaluates each element. If two stream elements evaluate to the same key, toMap throws `IllegalStateException: Duplicate key`. In production systems, you must handle collisions using the 3-parameter overload `toMap(keyMapper, valueMapper, mergeFunction)` where `mergeFunction` dictates whether to keep the existing value, overwrite with the new value, or merge them. The 4-parameter overload adds a `mapSupplier`, allowing the caller to specify concrete map implementations like `TreeMap::new` or `LinkedHashMap::new`.',
      'Multi-Level Grouping with groupingBy: Collectors.groupingBy() mirrors the SQL `GROUP BY` operator. The single-argument `groupingBy(classifier)` groups items into a `Map<K, List<T>>`. The powerful two-argument `groupingBy(classifier, downstream)` applies a secondary collector to the grouped lists. For example, using downstream collectors such as `Collectors.counting()`, `Collectors.summingDouble(toDoubleFunction)`, `Collectors.mapping(mapper, downstream)`, or `Collectors.maxBy(comparator)` allows computing multi-level aggregations in a single traversal. The three-argument overload `groupingBy(classifier, mapFactory, downstream)` allows controlling the type of the resulting Map (e.g., `TreeMap::new` for sorted keys).',
      'Partitioning with partitioningBy: Collectors.partitioningBy(Predicate) is a specialized binary grouping. It partitions elements into a `Map<Boolean, List<T>>`. Unlike `groupingBy`, which only inserts keys that actually match elements in the stream, `partitioningBy` guarantees that BOTH keys—`Boolean.TRUE` and `Boolean.FALSE`—are present in the resulting map, mapping to empty lists if no elements match that partition.',
      'Custom Collectors via Collector.of(): When built-in collectors are insufficient, developers can author custom collectors using the interface `Collector<T, A, R>` or the factory method `Collector.of(supplier, accumulator, combiner, finisher, characteristics...)`. Here, `T` is the stream element type, `A` is the intermediate accumulator type, and `R` is the final result type. Characteristics include: `IDENTITY_FINISH` (finisher is an identity cast `A -> R`), `UNORDERED` (collection ignores stream order), and `CONCURRENT` (accumulator can be called concurrently from multiple threads across the same accumulator instance without synchronization).'
    ],
    diagram: `STREAM REDUCTION & MULTI-LEVEL GROUPING ARCHITECTURE
================================================================================

1. THREE-ARGUMENT PARALLEL REDUCE: SPLIT -> ACCUMULATE -> COMBINE
   Stream<String>: ["apple", "banana", "cherry", "date"]  (Goal: Total char length)
   
           Thread 1 (Spliterator chunk 1)               Thread 2 (Spliterator chunk 2)
           ["apple", "banana"]                         ["cherry", "date"]
                   │                                           │
       Accumulator: (0 + 5) -> 5                   Accumulator: (0 + 6) -> 6
       Accumulator: (5 + 6) -> 11                  Accumulator: (6 + 4) -> 10
                   │                                           │
                   ▼                                           ▼
             Partial Result: 11                          Partial Result: 10
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         ▼
                                Combiner: Integer::sum
                                      (11 + 10)
                                         ▼
                                 Final Result: 21

2. MULTI-LEVEL groupingBy DOWNSTREAM AGGREGATION TREE
   Stream<Employee> ──> Collectors.groupingBy(Employee::getDepartment, ...)
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      ▼                                                       ▼
   Key: "ENGINEERING"                                      Key: "SALES"
   Downstream: Collectors.mapping(                         Downstream: Collectors.mapping(
     Employee::getSalary,                                    Employee::getSalary,
     Collectors.averagingDouble(Double::doubleValue)         Collectors.averagingDouble(Double::doubleValue)
   )                                                       )
      │                                                       │
      ▼                                                       ▼
   Value: 145000.00                                        Value: 92000.00

   Final Map: { "ENGINEERING" = 145000.00, "SALES" = 92000.00 }`,
    codeSnippet: {
      title: 'Advanced Collectors: Collision Resolution, Multi-Level Grouping & Custom Collector',
      code: `import java.util.*;
import java.util.stream.*;

class ServerTransaction {
    private final String service;
    private final String status;
    private final double latencyMs;

    public ServerTransaction(String service, String status, double latencyMs) {
        this.service = service;
        this.status = status;
        this.latencyMs = latencyMs;
    }

    public String getService() { return service; }
    public String getStatus() { return status; }
    public double getLatencyMs() { return latencyMs; }
}

public class TerminalCollectorsDemo {
    public static void main(String[] args) {
        List<ServerTransaction> txs = List.of(
            new ServerTransaction("AUTH", "200", 45.2),
            new ServerTransaction("AUTH", "500", 120.0),
            new ServerTransaction("PAYMENT", "200", 85.5),
            new ServerTransaction("PAYMENT", "200", 92.1),
            new ServerTransaction("SEARCH", "200", 15.0),
            new ServerTransaction("SEARCH", "504", 450.0)
        );

        // 1. toMap with Duplicate Key Collision Resolution
        // Map Service to Max Latency, resolving collisions with Math::max
        Map<String, Double> maxLatencyByService = txs.stream().collect(
            Collectors.toMap(
                ServerTransaction::getService,
                ServerTransaction::getLatencyMs,
                Math::max,
                TreeMap::new // Sorted keys
            )
        );
        System.out.println("Max Latency by Service (Sorted): " + maxLatencyByService);

        // 2. Multi-Level Grouping: Service -> Status -> Count
        Map<String, Map<String, Long>> statusBreakdown = txs.stream().collect(
            Collectors.groupingBy(
                ServerTransaction::getService,
                Collectors.groupingBy(
                    ServerTransaction::getStatus,
                    Collectors.counting()
                )
            )
        );
        System.out.println("Status Breakdown by Service: " + statusBreakdown);

        // 3. partitioningBy with downstream average calculation
        Map<Boolean, Double> avgLatencyBySuccess = txs.stream().collect(
            Collectors.partitioningBy(
                tx -> tx.getStatus().startsWith("2"),
                Collectors.averagingDouble(ServerTransaction::getLatencyMs)
            )
        );
        System.out.printf("Avg Latency - Success (true): %.2f ms, Error (false): %.2f ms%n",
            avgLatencyBySuccess.get(true), avgLatencyBySuccess.get(false));
    }
}`,
      lineByLineExplanation: [
        { line: 'Collectors.toMap(..., Math::max, TreeMap::new)', explanation: 'Maps service name to latency. When duplicate service keys collide (e.g. AUTH), Math::max picks the higher latency. TreeMap::new ensures alphabetical key ordering.' },
        { line: 'Collectors.groupingBy(..., Collectors.groupingBy(..., Collectors.counting()))', explanation: 'Two-level downstream grouping. First groups transactions by service name, then sub-groups by HTTP status code, counting occurrences.' },
        { line: 'Collectors.partitioningBy(tx -> tx.getStatus().startsWith("2"), ...)', explanation: 'Splits elements into Boolean.TRUE (2xx success) and Boolean.FALSE (non-2xx error), computing average latency downstream for each.' }
      ],
      output: `Max Latency by Service (Sorted): {AUTH=120.0, PAYMENT=92.1, SEARCH=450.0}
Status Breakdown by Service: {AUTH={200=1, 500=1}, PAYMENT={200=2}, SEARCH={200=1, 504=1}}
Avg Latency - Success (true): 59.45 ms, Error (false): 285.00 ms`
    },
    codeExamples: [
      {
        title: 'Collision-Resistant Map Collection with LinkedHashMap Preservation',
        description: 'Demonstrating how to avoid IllegalStateException on duplicate keys while preserving insertion order.',
        code: `import java.util.*;
import java.util.stream.*;

class OrderItem {
    private final String sku;
    private final int quantity;

    public OrderItem(String sku, int quantity) {
        this.sku = sku;
        this.quantity = quantity;
    }

    public String getSku() { return sku; }
    public int getQuantity() { return quantity; }
}

public class MapCollisionExample {
    public static void main(String[] args) {
        List<OrderItem> items = List.of(
            new OrderItem("KB-99", 2),
            new OrderItem("MOU-01", 1),
            new OrderItem("KB-99", 5), // Duplicate SKU!
            new OrderItem("MON-27", 3)
        );

        // Accumulate quantities for duplicate SKUs, preserving original insertion order
        Map<String, Integer> aggregatedQuantities = items.stream().collect(
            Collectors.toMap(
                OrderItem::getSku,
                OrderItem::getQuantity,
                (oldQty, newQty) -> oldQty + newQty, // Merge function sums quantities
                LinkedHashMap::new                  // Preserves encounter order
            )
        );

        System.out.println("Aggregated Order Inventory: " + aggregatedQuantities);
    }
}`,
        output: `Aggregated Order Inventory: {KB-99=7, MOU-01=1, MON-27=3}`
      },
      {
        title: 'Multi-Level Downstream Aggregations with Java 9 filtering() and mapping()',
        description: 'Complex grouping combining filtering, property extraction, and summarizing statistics.',
        code: `import java.util.*;
import java.util.stream.*;

class EmployeeRecord {
    private final String division;
    private final String title;
    private final double bonus;

    public EmployeeRecord(String division, String title, double bonus) {
        this.division = division;
        this.title = title;
        this.bonus = bonus;
    }

    public String getDivision() { return division; }
    public String getTitle() { return title; }
    public double getBonus() { return bonus; }
}

public class MultiLevelAggregationExample {
    public static void main(String[] args) {
        List<EmployeeRecord> employees = List.of(
            new EmployeeRecord("Cloud", "Senior SRE", 25000.0),
            new EmployeeRecord("Cloud", "Staff SRE", 45000.0),
            new EmployeeRecord("Cloud", "Junior SRE", 8000.0),
            new EmployeeRecord("Security", "SecOps Lead", 35000.0),
            new EmployeeRecord("Security", "PenTester", 18000.0)
        );

        // Group by division, then extract statistics on high bonuses (> 10000.0) only
        Map<String, DoubleSummaryStatistics> divisionStats = employees.stream().collect(
            Collectors.groupingBy(
                EmployeeRecord::getDivision,
                Collectors.filtering(
                    e -> e.getBonus() > 10000.0,
                    Collectors.summarizingDouble(EmployeeRecord::getBonus)
                )
            )
        );

        divisionStats.forEach((div, stats) -> {
            System.out.printf("Div: %s | High-Bonus Count: %d | Total: $%.1f | Max: $%.1f%n",
                div, stats.getCount(), stats.getSum(), stats.getMax());
        });
    }
}`,
        output: `Div: Cloud | High-Bonus Count: 2 | Total: $70000.0 | Max: $45000.0
Div: Security | High-Bonus Count: 2 | Total: $53000.0 | Max: $35000.0`
      },
      {
        title: 'Custom Collector Creation via Collector.of()',
        description: 'Building an immutable custom collector that joins strings with custom formatting and character length metrics.',
        code: `import java.util.StringJoiner;
import java.util.stream.*;

class TagReport {
    private final String formattedTags;
    private final int totalChars;

    public TagReport(String formattedTags, int totalChars) {
        this.formattedTags = formattedTags;
        this.totalChars = totalChars;
    }

    @Override
    public String toString() {
        return "TagReport[formattedTags='" + formattedTags + "', totalChars=" + totalChars + "]";
    }
}

public class CustomCollectorExample {
    public static void main(String[] args) {
        Collector<String, StringJoiner, TagReport> tagReportCollector = Collector.of(
            () -> new StringJoiner(", ", "[", "]"), // 1. Supplier
            StringJoiner::add,                      // 2. Accumulator
            StringJoiner::merge,                    // 3. Combiner (for parallel streams)
            sj -> new TagReport(sj.toString(), sj.length()), // 4. Finisher
            Collector.Characteristics.UNORDERED     // 5. Characteristics
        );

        TagReport report = Stream.of("java", "microservices", "kubernetes", "grpc")
                                 .collect(tagReportCollector);

        System.out.println(report);
    }
}`,
        output: `TagReport[formattedTags='[java, microservices, kubernetes, grpc]', totalChars=39]`
      },
      {
        title: 'Post-Transformation with Collectors.collectingAndThen()',
        description: 'Using collectingAndThen to wrap collected collections in unmodifiable wrappers or compute derived domain models.',
        code: `import java.util.*;
import java.util.stream.*;

public class CollectingAndThenExample {
    public static void main(String[] args) {
        List<String> rawTokens = List.of("alpha", "beta", "gamma", "alpha");

        // Collect to Set, then convert immediately into an unmodifiable List sorted by length
        List<String> sortedDistinct = rawTokens.stream().collect(
            Collectors.collectingAndThen(
                Collectors.toSet(),
                set -> set.stream()
                          .sorted(Comparator.comparingInt(String::length))
                          .collect(Collectors.toUnmodifiableList())
            )
        );

        System.out.println("Immutable Sorted Unique Tokens: " + sortedDistinct);
        System.out.println("Is Unmodifiable List Class: " + sortedDistinct.getClass().getName().contains("Unmodifiable"));
    }
}`,
        output: `Immutable Sorted Unique Tokens: [beta, alpha, gamma]
Is Unmodifiable List Class: true`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using Collectors.toMap() without a mergeFunction on datasets containing duplicate keys',
        whyItHappens: 'Developers assume toMap() will silently overwrite duplicate keys like java.util.Map.put(). In reality, the 2-argument toMap() throws an IllegalStateException.',
        howToFix: 'Always provide a mergeFunction when keys can collide: Collectors.toMap(k -> k.getId(), v -> v, (oldVal, newVal) -> newVal).'
      },
      {
        mistake: 'Reusing a stream after a terminal operation has already executed',
        whyItHappens: 'Beginners view Streams as collections or queryable data structures rather than single-pass pipelines.',
        howToFix: 'Remember that streams are single-use disposable pipelines. To perform multiple operations, recreate the stream from the source supplier or collection.'
      },
      {
        mistake: 'Mutating external state inside a forEach() terminal operation',
        whyItHappens: 'Developers use .forEach(item -> externalList.add(item)) instead of collect(Collectors.toList()).',
        howToFix: 'Avoid side effects in stream pipelines. Use collectors (collect(Collectors.toList())) rather than mutating shared collections, especially since parallel streams will cause data races.'
      },
      {
        mistake: 'Using non-associative functions in parallel reduce()',
        whyItHappens: 'Using subtraction or non-associative string concatenation in reduce((a, b) -> a - b) works sequentially by luck, but yields wildly incorrect results in parallel execution.',
        howToFix: 'Ensure your reduction operation satisfies (a op b) op c == a op (b op c). For subtraction, accumulate positive and negative terms separately using addition, then subtract once at the end.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Stream Reuse After Terminal Operation',
        problemStatement: 'What exception is thrown when running this code?',
        code: `import java.util.stream.Stream;

public class Puzzle1 {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("cat", "dog", "bear");
        long count = stream.count();
        stream.forEach(System.out::println);
    }
}`,
        options: [
          'A) Prints cat, dog, bear normally',
          'B) Throws UnsupportedOperationException',
          'C) Throws IllegalStateException',
          'D) Throws NoSuchElementException'
        ],
        correctOptionIndex: 2,
        hint: 'Streams are single-use pipelines. count() is a terminal operation.',
        solution: 'Option C is correct: Throws IllegalStateException',
        explanation: 'Once a terminal operation like count() is called on a stream, the stream is considered consumed and closed. Any subsequent operation on that stream throws java.lang.IllegalStateException: stream has already been operated upon or closed.'
      },
      {
        title: 'Puzzle 2: Duplicate Key Collision in toMap',
        problemStatement: 'What is the outcome of executing this stream pipeline?',
        code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Puzzle2 {
    public static void main(String[] args) {
        List<String> list = List.of("apple", "banana", "apricot", "blueberry");
        Map<Character, String> map = list.stream().collect(
            Collectors.toMap(
                s -> s.charAt(0),
                s -> s
            )
        );
        System.out.println(map.size());
    }
}`,
        options: [
          'A) Prints 2 (latest values overwrite earlier ones)',
          'B) Throws IllegalStateException: Duplicate key a (attempted merging values apple and apricot)',
          'C) Prints 4',
          'D) Throws IllegalArgumentException'
        ],
        correctOptionIndex: 1,
        hint: 'Both "apple" and "apricot" map to the key \'a\'. Does the 2-argument toMap allow duplicates?',
        solution: 'Option B is correct: Throws IllegalStateException: Duplicate key',
        explanation: 'The 2-argument Collectors.toMap() does not permit duplicate keys. When "apricot" yields the same key (\'a\') as "apple", it throws java.lang.IllegalStateException: Duplicate key a (or similar JVM duplicate key message). To avoid this, a 3-argument mergeFunction must be provided.'
      },
      {
        title: 'Puzzle 3: reduce() with Non-Zero Identity',
        problemStatement: 'What does this sequential reduction print?',
        code: `import java.util.List;

public class Puzzle3 {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4);
        int result = numbers.stream().reduce(10, (a, b) -> a + b);
        System.out.println(result);
    }
}`,
        options: [
          'A) 10',
          'B) 20',
          'C) 50',
          'D) 14'
        ],
        correctOptionIndex: 1,
        hint: 'The identity value 10 is applied as the initial accumulator value in sequential reduction.',
        solution: 'Option B is correct: 20',
        explanation: 'In sequential reduction with identity 10, the calculation is: ((10 + 1) + 2) + 3 + 4 = 20. The identity starts the accumulator.'
      },
      {
        title: 'Puzzle 4: reduce() Identity Hazard in Parallel Stream',
        problemStatement: 'What does this parallel reduction print?',
        code: `import java.util.List;

public class Puzzle4 {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(1, 2, 3, 4);
        int result = numbers.parallelStream().reduce(10, (a, b) -> a + b, (a, b) -> a + b);
        System.out.println(result);
    }
}`,
        options: [
          'A) 20',
          'B) 50',
          'C) 40',
          'D) Non-deterministic result between 10 and 20'
        ],
        correctOptionIndex: 1,
        hint: 'In parallel reduction, the identity is applied to EVERY split chunk. How many sub-threads fold 1 element each?',
        solution: 'Option B is correct: 50',
        explanation: 'In parallelStream(), each of the 4 elements is processed in a separate partition seeded with identity 10: (10+1)=11, (10+2)=12, (10+3)=13, (10+4)=14. The combiner then sums these partial results: 11 + 12 + 13 + 14 = 50! This proves that for addition, the mathematical identity MUST be 0, not 10. Violating the identity rule breaks parallel reduction.'
      },
      {
        title: 'Puzzle 5: Short-Circuiting Matcher Execution Count',
        problemStatement: 'How many times is the predicate evaluated in this pipeline?',
        code: `import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Puzzle5 {
    public static void main(String[] args) {
        AtomicInteger count = new AtomicInteger(0);
        List<String> items = List.of("alpha", "beta", "gamma", "delta");
        
        boolean matched = items.stream().anyMatch(s -> {
            count.incrementAndGet();
            return s.startsWith("b");
        });
        
        System.out.println(matched + " " + count.get());
    }
}`,
        options: [
          'A) true 4',
          'B) true 2',
          'C) true 1',
          'D) false 2'
        ],
        correctOptionIndex: 1,
        hint: 'anyMatch is a short-circuiting terminal operation. When does it stop evaluating?',
        solution: 'Option B is correct: true 2',
        explanation: 'anyMatch is short-circuiting. It checks "alpha" (count=1, false), then "beta" (count=2, true). Because "beta" matches, anyMatch halts immediately and returns true without evaluating "gamma" or "delta". Hence count is 2.'
      },
      {
        title: 'Puzzle 6: Empty Partitioning Completeness',
        problemStatement: 'What does this code print when no elements match the predicate?',
        code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Puzzle6 {
    public static void main(String[] args) {
        List<Integer> numbers = List.of(2, 4, 6, 8);
        Map<Boolean, List<Integer>> partitioned = numbers.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 != 0));
        
        System.out.print(partitioned.get(true).size() + " " + partitioned.get(false).size());
    }
}`,
        options: [
          'A) Throws NullPointerException on partitioned.get(true)',
          'B) 0 4',
          'C) null 4',
          'D) 4 0'
        ],
        correctOptionIndex: 1,
        hint: 'Does partitioningBy always initialize both Boolean keys in the returned map?',
        solution: 'Option B is correct: 0 4',
        explanation: 'By specification, Collectors.partitioningBy() always creates a map containing both Boolean.TRUE and Boolean.FALSE keys. Even if no elements match the predicate (n % 2 != 0), partitioned.get(true) returns an empty, non-null List. Thus, size() is 0 for true and 4 for false.'
      },
      {
        title: 'Puzzle 7: groupingBy Downstream Reduction Value',
        problemStatement: 'What is printed by this groupingBy counting collector?',
        code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Puzzle7 {
    public static void main(String[] args) {
        List<String> words = List.of("to", "be", "or", "not", "to", "be");
        Map<String, Long> freq = words.stream().collect(
            Collectors.groupingBy(w -> w, Collectors.counting())
        );
        System.out.print(freq.get("to") + " " + freq.get("or"));
    }
}`,
        options: [
          'A) 2 1',
          'B) 2.0 1.0',
          'C) 1 1',
          'D) 2 0'
        ],
        correctOptionIndex: 0,
        hint: 'Collectors.counting() returns a Long count of elements in each bucket.',
        solution: 'Option A is correct: 2 1',
        explanation: 'The classifier groups by string identity. "to" occurs twice (count 2L), "or" occurs once (count 1L). Printing them outputs "2 1".'
      },
      {
        title: 'Puzzle 8: findFirst vs findAny on Sequential Stream',
        problemStatement: 'What is guaranteed about findAny() on an ordered sequential stream?',
        code: `import java.util.List;
import java.util.Optional;

public class Puzzle8 {
    public static void main(String[] args) {
        List<String> list = List.of("first", "second", "third");
        Optional<String> result = list.stream().filter(s -> s.length() > 4).findAny();
        System.out.println(result.get());
    }
}`,
        options: [
          'A) Throws NoSuchElementException',
          'B) Always returns "third" because findAny picks randomly',
          'C) Deterministically returns "first" in sequential streams with encounter order',
          'D) May return "first" or "second" unpredictably on every run'
        ],
        correctOptionIndex: 2,
        hint: 'Does sequential execution with encounter order behave deterministically for findAny?',
        solution: 'Option C is correct: Deterministically returns "first" in sequential streams with encounter order',
        explanation: 'In sequential streams derived from ordered collections (like List), findAny() is free to select any element, but the sequential implementation traverses in encounter order and returns the first matching element encountered ("first"). Only in parallel streams does findAny() behave non-deterministically.'
      },
      {
        title: 'Puzzle 9: Collectors.collectingAndThen Finisher Execution',
        problemStatement: 'What does this collectingAndThen pipeline return?',
        code: `import java.util.List;
import java.util.stream.Collectors;

public class Puzzle9 {
    public static void main(String[] args) {
        List<Integer> list = List.of(10, 20, 30);
        int max = list.stream().collect(
            Collectors.collectingAndThen(
                Collectors.maxBy(Integer::compareTo),
                opt -> opt.orElse(-1) * 2
            )
        );
        System.out.println(max);
    }
}`,
        options: [
          'A) 30',
          'B) 60',
          'C) -2',
          'D) Throws NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'collectingAndThen executes the downstream collector (maxBy), then passes its result into the finisher function.',
        solution: 'Option B is correct: 60',
        explanation: 'Collectors.maxBy() yields Optional.of(30). The finishing function `opt -> opt.orElse(-1) * 2` receives this Optional and evaluates 30 * 2 = 60.'
      },
      {
        title: 'Puzzle 10: Non-Associative Combiner Corruption',
        problemStatement: 'Consider this reduction using integer division. What is true about running it sequentially vs in parallel?',
        code: `import java.util.List;

public class Puzzle10 {
    public static void main(String[] args) {
        List<Integer> vals = List.of(64, 4, 2);
        int seq = vals.stream().reduce((a, b) -> a / b).orElse(0);
        int par = vals.parallelStream().reduce((a, b) -> a / b).orElse(0);
        System.out.println(seq == par);
    }
}`,
        options: [
          'A) Always prints true because division is deterministic',
          'B) seq is 8; par may produce 32 or 8 depending on chunking, so true is NOT guaranteed',
          'C) Compilation error because reduce requires 3 arguments',
          'D) Throws ArithmeticException'
        ],
        correctOptionIndex: 1,
        hint: 'Is division associative? Does (64 / 4) / 2 equal 64 / (4 / 2)?',
        solution: 'Option B is correct: seq is 8; par may produce 32 or 8 depending on chunking',
        explanation: 'Division is strictly non-associative: (64 / 4) / 2 = 16 / 2 = 8. But in parallel execution, if split as 64 and (4 / 2), it computes 64 / 2 = 32! Because the reduction function is not associative, parallel reduction produces corrupted, non-deterministic results.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the fundamental architectural difference between intermediate and terminal operations in the Java Streams API?',
        answer: 'Intermediate operations (filter, map, flatMap, sorted, distinct) are lazy declarations that transform an input Stream into another Stream. They do not process any data upon invocation; instead, they construct an internal linked list of Sink stages (PipelineHelper). Terminal operations (collect, reduce, count, forEach, allMatch) are eager triggers. When a terminal operation is called, it initiates data pull/push through the pipeline, executing the intermediate operations in a fused single pass. Once a terminal operation concludes, the stream pipeline is closed and consumed; any subsequent operation on that stream throws IllegalStateException.',
        followUp: 'Can an intermediate operation ever trigger partial stream execution?',
        followUpAnswer: 'No. Intermediate operations never trigger execution. However, stateful intermediate operations like sorted() or distinct() create barrier buffers that must accumulate upstream elements before allowing downstream processing to proceed when the terminal operation is finally invoked.',
        keyPhrases: [
          'Intermediate operations are lazy and declarative',
          'Terminal operations trigger eager pipeline evaluation',
          'Pipeline stages fused into chained Sink nodes',
          'Streams are single-use; terminal operations consume and close them',
          'Attempting reuse throws IllegalStateException'
        ],
        commonMistakeAnswer: 'Believing that intermediate operations execute immediately and store intermediate collections in memory.'
      },
      {
        question: 'Explain why Collectors.toMap() frequently throws IllegalStateException in production and how you resolve it.',
        answer: 'The standard two-argument Collectors.toMap(keyMapper, valueMapper) assumes that every element in the stream maps to a strictly unique key. Under the hood, it delegates to Map.merge() with a throwing merge function: `(u, v) -> { throw new IllegalStateException(String.format("Duplicate key %s", u)); }`. If the stream contains duplicate keys (e.g., two Users with the same department), it immediately fails with IllegalStateException. To resolve this, you must use the three-argument overload Collectors.toMap(keyMapper, valueMapper, mergeFunction). The mergeFunction receives the existing value and the newly encountered colliding value, allowing the developer to decide whether to keep the old value `(oldVal, newVal) -> oldVal`, overwrite with the new value `(oldVal, newVal) -> newVal`, or combine them `(oldVal, newVal) -> oldVal + newVal`.',
        followUp: 'How do you ensure the resulting Map is a specific implementation, like LinkedHashMap or TreeMap?',
        followUpAnswer: 'Use the four-argument overload: Collectors.toMap(keyMapper, valueMapper, mergeFunction, mapSupplier). For example, passing `LinkedHashMap::new` guarantees insertion order, while `TreeMap::new` guarantees sorted keys.',
        keyPhrases: [
          'Duplicate key collision throws IllegalStateException',
          'Internal Map.merge throws exception by default',
          'Resolved using 3-arg toMap with mergeFunction (BinaryOperator)',
          '4-arg toMap accepts MapSupplier (e.g., LinkedHashMap::new, TreeMap::new)',
          'Permits keeping old, taking new, or aggregating duplicate values'
        ],
        commonMistakeAnswer: 'Assuming toMap() behaves like HashMap.put() by silently overwriting existing keys.'
      },
      {
        question: 'What is the contract for the accumulator and combiner in the 3-argument Stream.reduce() method?',
        answer: 'The 3-argument reduce method signature is: `<U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner)`. This overload is used when the return type U differs from the stream element type T. (1) Identity Contract: The identity value must be an identity for the combiner: `combiner.apply(identity, u) == u` for any u. (2) Accumulator Contract: Folds a stream element of type T into an accumulator of type U. (3) Combiner Contract: Merges two intermediate accumulators of type U. In parallel streams, the dataset is split; each thread computes a partial U accumulator using the accumulator function, and then the combiner merges these partial U accumulators. Both accumulator and combiner must be strictly associative and stateless.',
        followUp: 'Why does the 2-argument reduce(T identity, BinaryOperator<T> op) not require a separate combiner?',
        followUpAnswer: 'In the 2-argument variant, both the elements and the accumulated result share the exact same type T. Therefore, the BinaryOperator<T> accumulator can also double as the combiner to merge partial results.',
        keyPhrases: [
          'Used when accumulated type U differs from element type T',
          'Identity must satisfy combiner(identity, u) == u',
          'Accumulator folds T into U',
          'Combiner merges two U containers in parallel processing',
          'Must be strictly associative and stateless'
        ],
        commonMistakeAnswer: 'Claiming the combiner is used in sequential streams to combine elements with the identity.'
      },
      {
        question: 'Compare reduce() with collect(). When should you prefer collect() over reduce() in enterprise applications?',
        answer: 'Both reduce() and collect() perform reduction, but they differ fundamentally in mutability and memory allocation: reduce() is an IMMUTABLE reduction. It combines two values to produce a brand-new immutable value (e.g., Integer::sum, BigInteger::multiply). If you try to accumulate elements into a collection using reduce()—e.g., `reduce(new ArrayList<>(), (list, item) -> { list.add(item); return list; })`—in a parallel stream, multiple threads mutate the same shared ArrayList without synchronization, corrupting data. If you copy the list on every reduction step, you incur an O(N^2) memory copy penalty. Conversely, collect() is a MUTABLE reduction. It accumulates elements by mutating a local container (like an ArrayList or StringBuilder) created per thread via supplier(), and then uses combiner() to merge container contents cleanly without repeated copying.',
        followUp: 'Can collect() be used for mathematical operations like summing?',
        followUpAnswer: 'Yes, via Collectors.summingInt(), Collectors.averagingDouble(), or Collectors.summarizingInt(), which internally use mutable accumulator objects to avoid wrapper boxing allocations.',
        keyPhrases: [
          'reduce() is immutable reduction producing new values',
          'collect() is mutable reduction into a mutable container',
          'Accumulating collections with reduce() causes O(N^2) copying or race conditions',
          'collect() uses supplier, accumulator, combiner safely across threads',
          'Prefer collect() when accumulating into collections, strings, or summary stats'
        ],
        commonMistakeAnswer: 'Thinking collect() is only for converting streams into Lists, while reduce() is for numbers.'
      },
      {
        question: 'How does multi-level groupingBy work in Java? Provide an example of nesting downstream collectors.',
        answer: 'Collectors.groupingBy() operates on a classifier function to partition stream items into buckets, returning a Map<K, V>. When using the 2-argument overload `groupingBy(Function<? super T, ? extends K> classifier, Collector<? super T, A, D> downstream)`, the downstream collector is applied to the stream of items belonging to each group. This allows arbitrary levels of aggregation. For instance, to group Employees by Department, and within each department compute the average salary: `groupingBy(Employee::getDepartment, Collectors.averagingDouble(Employee::getSalary))`. You can nest further: to group by Department, then by Role, and count: `groupingBy(Employee::getDepartment, groupingBy(Employee::getRole, counting()))`.',
        followUp: 'What downstream collector was introduced in Java 9 to filter elements before grouping without omitting empty keys?',
        followUpAnswer: 'Collectors.filtering(Predicate, downstream). Unlike a stream-level filter() which removes items before grouping (potentially dropping entire keys from the map), Collectors.filtering() preserves the key with an empty collection if no elements match the predicate.',
        keyPhrases: [
          '2-arg groupingBy accepts classifier and downstream Collector',
          'Downstream collector aggregates elements within each partition bucket',
          'Can be nested recursively for multi-level hierarchical grouping',
          'Supports counting, mapping, summing, maxBy, and filtering downstream',
          'Java 9 filtering() preserves empty group keys'
        ],
        commonMistakeAnswer: 'Believing you must run separate stream passes or nested loops to compute grouped aggregations.'
      },
      {
        question: 'What are the semantic differences between Collectors.partitioningBy() and Collectors.groupingBy()?',
        answer: 'While partitioningBy() is technically a specialized form of groupingBy(), they have three major semantic differences: (1) Key Type: partitioningBy() takes a Predicate<? super T> and strictly returns a Map<Boolean, D>, whereas groupingBy() takes a general Function<? super T, ? extends K> and returns Map<K, D>. (2) Key Guarantees: partitioningBy() ALWAYS returns a Map containing both Boolean.TRUE and Boolean.FALSE keys, even if one or both partitions contain zero elements. In contrast, groupingBy() only creates keys for values that actually appeared in the stream. (3) Performance: partitioningBy() is optimized internally as a two-slot array structure (true/false) rather than a dynamic hash table lookup.',
        followUp: 'What happens if you run partitioningBy on an empty stream?',
        followUpAnswer: 'The returned map still contains both Boolean.TRUE and Boolean.FALSE, with both mapping to empty downstream collections (e.g. empty lists).',
        keyPhrases: [
          'partitioningBy uses Predicate returning Map<Boolean, List<T>>',
          'Guarantees both true and false keys exist even if empty',
          'groupingBy uses Function returning Map<K, List<T>>',
          'groupingBy only contains keys present in data',
          'partitioningBy has lower overhead due to two-element partitioning'
        ],
        commonMistakeAnswer: 'Asserting that partitioningBy omits the false key if all elements match the predicate.'
      },
      {
        question: 'Explain the 5 components of a custom Collector<T, A, R> and the role of Characteristics.',
        answer: 'A custom Collector<T, A, R> is parameterized by element type T, intermediate accumulator type A, and final result type R. Its five methods are: (1) `Supplier<A> supplier()`: Creates and returns a new mutable result container. (2) `BiConsumer<A, T> accumulator()`: Folds an input element T into the mutable container A. (3) `BinaryOperator<A> combiner()`: Merges two partial containers A when executed in parallel. (4) `Function<A, R> finisher()`: Transforms intermediate container A into final result R. (5) `Set<Characteristics> characteristics()`: Provides JVM optimization hints via an EnumSet containing: IDENTITY_FINISH (finisher is an unchecked identity cast), CONCURRENT (accumulator can be called concurrently from multiple threads on the same container A without synchronization; requires UNORDERED unless data source is unordered), and UNORDERED (collection does not preserve encounter order).',
        followUp: 'When can a collector specify Characteristics.CONCURRENT?',
        followUpAnswer: 'Only when the accumulator container is thread-safe (e.g. ConcurrentHashMap or AtomicInteger) and the collector is either UNORDERED or operating on an unordered stream.',
        keyPhrases: [
          'Supplier: creates mutable container A',
          'Accumulator: folds element T into container A',
          'Combiner: merges two containers A in parallel execution',
          'Finisher: transforms intermediate A into final result R',
          'Characteristics: CONCURRENT, UNORDERED, IDENTITY_FINISH'
        ],
        commonMistakeAnswer: 'Forgetting the finisher and thinking the accumulator container must always be identical to the return type.'
      },
      {
        question: 'Why should developers avoid forEach() with side effects, and what should be used instead?',
        answer: 'Using Stream.forEach() to perform side effects (such as adding elements to an external List: `list::add` or incrementing an external counter) violates the functional programming principles of Streams. In sequential streams, it creates unnecessary coupling to external mutable state. In parallel streams, calling `list.add()` on a standard non-thread-safe collection (like ArrayList) causes race conditions, corrupted internal array capacities, null elements, or ArrayIndexOutOfBoundsException. Furthermore, side-effecting forEach prevents JVM internal optimizations like pipeline fusing and short-circuiting. Instead, developers should use `collect()` to gather elements into collections, `reduce()` to aggregate metrics, or pure intermediate mapping operations.',
        followUp: 'When is forEach() appropriate?',
        followUpAnswer: 'forEach() is strictly meant for terminal actions that interact with the outside world at the boundary of your system, such as writing completed records to an output stream, printing to a logger, or sending messages to an event bus.',
        keyPhrases: [
          'Mutating external state in forEach causes race conditions',
          'Breaks thread-safety on non-concurrent collections',
          'Inhibits JVM pipeline optimizations',
          'Prefer collect() or reduce() over side-effecting forEach',
          'forEach is only for terminal I/O or logging'
        ],
        commonMistakeAnswer: 'Using stream.forEach(resultList::add) and defending it as clean modern Java.'
      },
      {
        question: 'What is the purpose of Collectors.collectingAndThen(), and where is it commonly applied?',
        answer: 'Collectors.collectingAndThen(Collector<T,A,R> downstream, Function<R,RR> finisher) performs a downstream collection and then applies an additional finishing transformation to the result. It is commonly applied in three enterprise scenarios: (1) Immutability: Collecting to a mutable list or set, and immediately wrapping it in an unmodifiable collection: `collectingAndThen(toList(), Collections::unmodifiableList)` (prior to Java 10`s toUnmodifiableList()). (2) Optional Unwrapping: Downstream collectors like `maxBy()` or `minBy()` return `Optional<T>`; collectingAndThen unwraps it safely: `collectingAndThen(maxBy(comparator), Optional::get)`. (3) Custom Domain Wrapping: Converting an accumulated collection directly into a domain-specific first-class collection or DTO, such as `collectingAndThen(toList(), OrderHistory::new)`.',
        followUp: 'How does collectingAndThen differ from mapping with stream().map() before collect()?',
        followUpAnswer: 'stream().map() transforms each individual element before collection, whereas collectingAndThen transforms the entire aggregated collection as a single unified entity after collection completes.',
        keyPhrases: [
          'Applies post-processing transformation to collector result',
          'Enforces immutability via Collections.unmodifiableList',
          'Unwraps Optionals from maxBy/minBy downstream collectors',
          'Transforms aggregated collection into domain DTO',
          'Executes once on the final container, not per element'
        ],
        commonMistakeAnswer: 'Confusing collectingAndThen with Collectors.mapping().'
      },
      {
        question: 'How do forEach() and forEachOrdered() differ in parallel streams?',
        answer: 'The difference manifests exclusively when processing streams with a defined encounter order (such as streams created from a List or array) in parallel. Stream.forEach() does not respect the encounter order of the stream in parallel execution; worker threads consume elements and execute the Consumer action as soon as they become available, optimizing for maximum concurrency and throughput. In contrast, Stream.forEachOrdered() strictly preserves encounter order even across multiple concurrent worker threads. It forces synchronization and buffer coordination among threads so that the Consumer is invoked in the exact order of the original source elements. Consequently, forEachOrdered() incurs substantial coordination overhead and nullifies much of the performance advantage of parallel streams.',
        followUp: 'Does forEachOrdered() force the entire pipeline to execute sequentially?',
        followUpAnswer: 'No. Upstream intermediate operations (like CPU-intensive filtering or mapping) still run in parallel across worker threads, but the terminal terminal action is constrained to execute sequentially in encounter order.',
        keyPhrases: [
          'forEach() ignores encounter order in parallel streams for throughput',
          'forEachOrdered() enforces strict source encounter order',
          'Requires inter-thread synchronization and buffering',
          'forEachOrdered() degrades parallel performance benefits',
          'Upstream processing remains parallel; terminal action is ordered'
        ],
        commonMistakeAnswer: 'Believing forEach and forEachOrdered behave identically in all stream configurations.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following is a short-circuiting terminal operation?',
        options: ['count()', 'forEach()', 'anyMatch()', 'reduce()'],
        correctIndex: 2,
        explanation: 'anyMatch() is short-circuiting because it stops processing elements as soon as it finds an element satisfying the predicate, without evaluating remaining items.'
      },
      {
        question: 'What exception is thrown by Collectors.toMap(k -> k.id, v -> v) if two objects share the same id?',
        options: ['IllegalArgumentException', 'IllegalStateException', 'DuplicateKeyException', 'NullPointerException'],
        correctIndex: 1,
        explanation: 'The 2-argument Collectors.toMap throws java.lang.IllegalStateException: Duplicate key when encountering colliding keys.'
      },
      {
        question: 'What does partitioningBy(Predicate) return when executed on an empty stream?',
        options: [
          'An empty Map with size 0',
          'A Map with size 2 containing true and false mapped to empty lists',
          'null',
          'Throws NoSuchElementException'
        ],
        correctIndex: 1,
        explanation: 'Collectors.partitioningBy always guarantees a map with both Boolean.TRUE and Boolean.FALSE keys, each mapped to an empty List if no elements match.'
      },
      {
        question: 'In a parallel stream reduce(identity, accumulator, combiner), what must combiner.apply(identity, x) equal?',
        options: ['identity', 'x', '0', 'null'],
        correctIndex: 1,
        explanation: 'The identity contract mandates that the identity value combined with any value x must equal x (identity invariant).'
      },
      {
        question: 'Which method on Stream consumes elements strictly in encounter order even in parallel streams?',
        options: ['forEach()', 'forEachOrdered()', 'parallelForEach()', 'peek()'],
        correctIndex: 1,
        explanation: 'forEachOrdered() guarantees that elements are processed in the stream`s encounter order, even if the pipeline is parallel.'
      },
      {
        question: 'What is the return type of the single-argument Collectors.counting()?',
        options: ['Collector<T, ?, Integer>', 'Collector<T, ?, Long>', 'Collector<T, ?, Double>', 'Collector<T, ?, AtomicLong>'],
        correctIndex: 1,
        explanation: 'Collectors.counting() returns a Collector that accumulates elements into a java.lang.Long.'
      },
      {
        question: 'What happens if you invoke stream.filter(...).collect(...) twice on the same stream instance?',
        options: [
          'The second collect re-runs the pipeline from scratch',
          'Throws IllegalStateException on the second operation',
          'The second collect returns an empty collection',
          'The JVM caches the result and returns it instantly'
        ],
        correctIndex: 1,
        explanation: 'Streams cannot be reused once operated upon or closed. Calling a second terminal or intermediate operation throws IllegalStateException.'
      },
      {
        question: 'Which Collector characteristic indicates that the finisher function is just an identity cast (Function.identity())?',
        options: ['CONCURRENT', 'UNORDERED', 'IDENTITY_FINISH', 'DIRECT_RETURN'],
        correctIndex: 2,
        explanation: 'Characteristics.IDENTITY_FINISH indicates that the intermediate accumulator A can be directly cast to the result type R without executing finisher().'
      },
      {
        question: 'How do you specify that Collectors.toMap should produce a TreeMap rather than the default HashMap?',
        options: [
          'toMap(keyMapper, valueMapper, TreeMap::new)',
          'toMap(keyMapper, valueMapper, (v1, v2) -> v1, TreeMap::new)',
          'toMap(TreeMap::new, keyMapper, valueMapper)',
          'TreeMap is not supported by Collectors.toMap'
        ],
        correctIndex: 1,
        explanation: 'The 4-argument overload takes: keyMapper, valueMapper, mergeFunction, and mapSupplier (TreeMap::new).'
      },
      {
        question: 'Which downstream collector was added in Java 9 to filter elements within groupingBy without omitting empty groups?',
        options: ['Collectors.filtering()', 'Collectors.where()', 'Collectors.predicate()', 'Collectors.filter()'],
        correctIndex: 0,
        explanation: 'Collectors.filtering(Predicate, downstream) was introduced in Java 9 to filter elements during downstream aggregation.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 22.4: Optional<T> Best Practices & Parallel Streams
  // ─────────────────────────────────────────────────────────────
  'optional-and-parallel-streams': {
    id: 'optional-and-parallel-streams',
    moduleId: 'java-streams',
    moduleTitle: '22. Java 8+ Streams & Lambdas',
    lessonNumber: 'Lesson 22.4',
    title: 'Optional<T> Best Practices & Parallel Streams',
    subtitle: 'Null-safety return mechanics, orElse() eager evaluation trap vs orElseGet(), monadic chaining (map/flatMap/filter), ForkJoinPool.commonPool(), Spliterator splitting overhead, and stateful race conditions',
    estimatedMinutes: 32,
    beginnerAnalogy: 'A high-grade pharmaceutical prescription and an interstate superhighway. First, `Optional<T>` is a sealed childproof prescription bottle: it either contains the exact dose or is certified empty. In the bad old days, a pharmacist handed you a raw pill or thin air (null); if you swallowed thin air, you choked with a NullPointerException! Calling `.get()` without checking is like ripping the cap off with your teeth without reading the label. Furthermore, using `orElse(callExpensivePharmacy())` means you pay thousands of dollars to order a backup pill every single time even when your bottle already has the pill inside! You should use `orElseGet(() -> orderBackup())` so you only order when the bottle is truly empty.\n\nSecond, Parallel Streams is an 8-lane superhighway: If 8 cars travel independently in their own lanes without interfering (an ArrayList split cleanly across 8 CPU cores performing pure math), travel throughput is multiplied by 8! But if all 8 lanes merge into a single manual toll booth where every car tries to write to a shared non-thread-safe `ArrayList.add()`, or if every car stops on the highway to make a synchronous network call, the entire city superhighway (`ForkJoinPool.commonPool()`) comes to a grinding halt, paralyzing all services in your JVM application!',
    interviewTakeaways: [
      'Optional Is Intended Exclusively for Return Types: Brian Goetz and the Java language architects designed Optional strictly as a return type for libraries to represent "no result". Never use Optional for method parameters, class fields, or collection elements (it is not Serializable and incurs a 16-24 byte heap overhead per instance).',
      'The orElse() vs orElseGet() Eager Trap: `orElse(fallback)` evaluates its argument eagerly every single time, even if the Optional contains a value! `orElseGet(() -> fallback)` evaluates lazily only when the Optional is empty. Never pass a method call with side effects or cost to orElse().',
      'Monadic Composition: Replace procedural `if (opt.isPresent())` checks with fluent monadic chains using `map()`, `flatMap()` (avoids `Optional<Optional<T>>`), `filter()`, and Java 9`s `ifPresentOrElse()` and `stream()`.',
      'The ForkJoinPool.commonPool() Architecture: Parallel streams execute on the shared JVM-wide `ForkJoinPool.commonPool()` whose default parallelism level is `Runtime.getRuntime().availableProcessors() - 1`. All parallel streams in the same JVM share these identical worker threads.',
      'The Blocking I/O Saturation Catastrophe: Never perform blocking I/O (database calls, REST requests, file locks) inside parallel streams. Doing so blocks the common pool threads, starving the entire JVM and degrading web container throughput.',
      'The N * Q Parallelism Formula: Parallel streams are only beneficial when `N * Q > 10,000`, where `N` is the number of elements and `Q` is the computational cost per element. For small datasets or trivial operations, thread creation, Spliterator decomposition, and merge overhead make parallel streams significantly slower than sequential loops.',
      'Spliterator Splitting Efficiency: Data structures split with radically different performance: `ArrayList` and primitive arrays split in O(1) time with perfect balance (`SIZED`, `SUBSIZED`). `LinkedList` and `Stream.iterate()` split in O(N) time with terrible imbalance and zero parallelism gain.',
      'Thread Safety & Race Conditions: Lambdas in parallel streams must be purely stateless and thread-safe. Accumulating state via `parallelStream().forEach(list::add)` results in lost updates, corrupted arrays, and `ArrayIndexOutOfBoundsException`. Always use `collect(Collectors.toList())` instead.'
    ],
    cheatSheet: {
      summary: 'Optional eliminates NullPointerException when used correctly as a return type with monadic methods. Parallel streams leverage ForkJoinPool.commonPool() for CPU-bound tasks on easily splittable data structures, but introduce severe race conditions when shared mutable state is present.',
      syntaxTemplate: `// 1. Safe Optional Creation & Retrieval
Optional<User> userOpt = Optional.ofNullable(findUser(id)); // safe with null
User user = userOpt.orElseGet(() -> loadDefaultUser());     // lazy fallback!

// 2. Monadic Chaining (Eliminating Nested Null Checks)
String city = Optional.ofNullable(order)
    .map(Order::getCustomer)          // Customer can be null
    .map(Customer::getAddress)        // Address can be null
    .map(Address::getCity)            // City can be null
    .filter(c -> !c.isBlank())
    .orElse("UNKNOWN_CITY");

// 3. Optional to Stream unwrapping (Java 9+)
List<Order> activeOrders = userIds.stream()
    .map(this::findActiveOrder)       // returns Optional<Order>
    .flatMap(Optional::stream)        // unwraps present values, drops empty!
    .collect(Collectors.toList());

// 4. Safe Parallel Stream Reduction (Zero shared state)
long primeCount = numbers.parallelStream()
    .filter(PrimeUtil::isPrime)       // CPU-intensive stateless predicate
    .count();                         // thread-safe reduction`,
      rules: [
        { rule: 'Never Use Optional as Field or Parameter', explanation: 'Optional is not Serializable and introduces pointer indirection and GC heap overhead. Use standard null checks or annotations for fields/parameters.' },
        { rule: 'Avoid .get() Code Smell', explanation: 'Calling opt.get() without isPresent() throws NoSuchElementException. Use orElse(), orElseGet(), or orElseThrow().' },
        { rule: 'Prefer orElseGet() for Dynamic Values', explanation: 'orElse() evaluates eagerly. Always use orElseGet(Supplier) if computing the fallback involves method calls, object instantiation, or database access.' },
        { rule: 'No Blocking I/O in Parallel Streams', explanation: 'Parallel streams use ForkJoinPool.commonPool(). Blocking calls starve all CPU cores across the entire JVM.' },
        { rule: 'Avoid LinkedList for Parallel Streams', explanation: 'LinkedList has an O(N) spliterator that cannot divide work evenly. Use ArrayList or primitive arrays for parallel processing.' },
        { rule: 'Stateless Lambdas Only', explanation: 'Functions in parallel streams must not read or mutate shared state. Never use list::add inside parallel forEach.' }
      ],
      quickComparison: [
        { aspect: 'orElse(val) vs orElseGet(supplier)', optionA: 'orElse(val) computes val eagerly on every invocation regardless of presence.', optionB: 'orElseGet(supplier) evaluates lazily only when Optional is empty.' },
        { aspect: 'map() vs flatMap() on Optional', optionA: 'map(Function<T, U>) wraps return value in Optional<U>.', optionB: 'flatMap(Function<T, Optional<U>>) flattens return value, avoiding Optional<Optional<U>>.' },
        { aspect: 'Sequential vs Parallel Stream', optionA: 'Sequential executes on caller thread with predictable low overhead and order.', optionB: 'Parallel splits across ForkJoinPool.commonPool() threads; requires high N*Q to beat overhead.' },
        { aspect: 'ArrayList vs LinkedList (Parallel)', optionA: 'ArrayList splits instantly in O(1) with exact midpoint indexes.', optionB: 'LinkedList requires O(N/2) traversal per split, causing severe thread starvation.' }
      ]
    },
    coreExplanation: [
      'The Purpose and Design Philosophy of Optional<T>: Java 8 introduced `java.util.Optional<T>` to provide a type-level solution for representing the absence of a value without resorting to `null`. As stated by Java language architect Brian Goetz, Optional was designed specifically as a return type for library methods where returning `null` was historically prone to causing `NullPointerException`. It forces the API consumer to actively acknowledge and handle the empty scenario. However, Optional was deliberately not made `Serializable`, and each instance incurs 16 to 24 bytes of object header overhead on the 64-bit JVM. Consequently, using Optional as class fields, method parameters, or collection elements (e.g., `List<Optional<T>>`) is considered an anti-pattern that bloats memory and complicates serialization.',
      'Optional Creation and the Eager Evaluation Trap: An Optional is created using three factory methods: `Optional.empty()` (empty container), `Optional.of(value)` (wraps non-null value; throws NullPointerException immediately if value is null), and `Optional.ofNullable(value)` (wraps value if non-null, returns empty if null). When retrieving values, calling `.get()` without checking `.isPresent()` is a dangerous code smell that throws `NoSuchElementException`. A far more subtle trap lies in `orElse()` vs `orElseGet()`. The method `opt.orElse(computeDefault())` evaluates its argument *eagerly* during method invocation, even if `opt` already contains a value! If `computeDefault()` performs a database query or allocates resources, that work is executed needlessly every time. Conversely, `opt.orElseGet(() -> computeDefault())` accepts a `Supplier` and evaluates *lazily* only when the Optional is empty.',
      'Monadic Transformation and Java 9+ Enhancements: Rather than writing procedural `if (opt.isPresent())` blocks, idiomatic Java treats Optional as a monad. The `map(Function)` method transforms the inner value if present. If the mapping function itself returns an `Optional`, using `map()` produces a clumsy `Optional<Optional<U>>`; `flatMap(Function)` flattens this into `Optional<U>`. The `filter(Predicate)` method tests the inner value, keeping it if it matches and turning it into empty if it fails. In Java 9, three critical methods were added: (1) `ifPresentOrElse(Consumer, Runnable)` provides clean if/else branch handling; (2) `or(Supplier<Optional<T>>)` allows chaining alternative Optional producers; (3) `stream()` converts an `Optional<T>` into a zero- or one-element `Stream<T>`, enabling clean unwrapping inside stream pipelines: `stream.map(this::lookup).flatMap(Optional::stream)`.',
      'Parallel Streams and ForkJoinPool.commonPool(): Invoking `.parallel()` on an existing stream or calling `.parallelStream()` on a Collection transitions pipeline execution from the single calling thread to the shared JVM-wide `ForkJoinPool.commonPool()`. The common pool uses a work-stealing algorithm where idle worker threads steal tasks from the deques of busy threads. The default pool size is configured to `Runtime.getRuntime().availableProcessors() - 1` worker threads (leaving one thread for the main task). Because the common pool is shared globally across the entire JVM (servicing all web requests in a Tomcat or Spring Boot container), running heavy parallel streams impacts the entire system.',
      'The Blocking I/O Hazard in Parallel Streams: The common pool is architected strictly for non-blocking, CPU-bound tasks. If code inside a parallel stream executes blocking I/O—such as REST HTTP calls, JDBC queries, or distributed cache fetches—the worker threads block while waiting for network responses. Since the pool size equals the CPU core count (e.g., 8 threads on an 8-core CPU), just 8 concurrent blocking I/O operations will completely saturate the common pool! All subsequent parallel streams throughout the entire JVM are blocked from making progress, causing cascading latency spikes.',
      'The N * Q Model and Performance Penalties: Parallel streams do not magically make code faster; they introduce substantial overhead: splitting the data source, scheduling tasks on the ForkJoinPool, managing context switches between CPU cores, and combining partial results. The rule of thumb formulated by Doug Lea is the `N * Q` model: `N` is the number of data elements, and `Q` is the computation time per element. If the product `N * Q` is less than 10,000, parallel execution is almost always slower than a simple sequential `for` loop. For example, summing an array of 1,000 integers in parallel is vastly slower than sequential summation due to thread scheduling overhead.',
      'Spliterator Decomposability: The data structure backing the stream heavily dictates parallel efficiency through its `Spliterator`. Data structures with indexed, random-access backing arrays—such as `ArrayList`, `int[]`, and `IntStream.range()`—have characteristics `SIZED` and `SUBSIZED`. Their Spliterators can split in O(1) time by simply dividing array indices in half (`[0..5000]` and `[5001..10000]`), achieving perfect load balance across worker threads. In contrast, `LinkedList` or `Stream.iterate()` cannot split by index; finding the midpoint requires traversing half the list in O(N) time. Parallelizing a `LinkedList` or unbounded `Stream.iterate()` results in terrible imbalance and often runs slower than sequential processing.',
      'Thread Safety Hazards and Stateful Race Conditions: The lambdas passed to parallel stream intermediate operations must be strictly stateless, non-interfering, and thread-safe. A common developer blunder is accumulating results using an external collection: `numbers.parallelStream().forEach(list::add)`. Because `ArrayList` is not thread-safe, concurrent invocations of `add()` produce race conditions that lead to lost updates, null values in the array, or `ArrayIndexOutOfBoundsException` during internal buffer resizing. Thread-safe alternatives like `Collections.synchronizedList()` or `CopyOnWriteArrayList` prevent corruption but introduce massive lock contention that destroys parallelism. The correct solution is always to use functional reduction: `numbers.parallelStream().filter(...).collect(Collectors.toList())`.'
    ],
    diagram: `OPTIONAL MONADIC CHAINING & PARALLEL WORK-STEALING FORK-JOIN POOL
================================================================================

1. OPTIONAL MONADIC PIPELINE (Avoiding Nested Null Checks)
   Input: order (nullable)
     │
     ▼ Optional.ofNullable(order)
   ┌───────────────────────┐
   │ Optional[Order]       │
   └───────────────────────┘
     │ map(Order::getCustomer)       ──> If null, becomes Optional.empty()
     ▼
   ┌───────────────────────┐
   │ Optional[Customer]    │
   └───────────────────────┘
     │ flatMap(Customer::getProfile) ──> Avoids Optional<Optional<Profile>>
     ▼
   ┌───────────────────────┐
   │ Optional[Profile]     │
   └───────────────────────┘
     │ orElseGet(() -> loadDefaultProfile()) ──> Evaluated ONLY if empty!
     ▼
   Result: Profile (Always non-null)

2. PARALLEL STREAMS: ForkJoinPool.commonPool() WORK-STEALING ENGINE
   Source: ArrayList<Integer> [0 .. 100,000]
   
               Root Spliterator.trySplit() [O(1) Array Split]
                         ┌───────────────┴───────────────┐
                         ▼                               ▼
                 Chunk [0 .. 50,000]             Chunk [50,001 .. 100,000]
                   ┌─────┴─────┐                   ┌─────┴─────┐
                   ▼           ▼                   ▼           ▼
               Task A        Task B              Task C        Task D
             [0..25,000]  [25,001..50k]       [50k..75k]    [75k..100k]
                  │            │                   │             │
                  ▼            ▼                   ▼             ▼
             Worker-1     Worker-2            Worker-3      Worker-4
             (Deque 1)    (Deque 2)           (Deque 3)     (Deque 4)
                  │                                              │
                  └── If Worker-1 finishes early, it STEALS ─────┘
                      tasks from the tail of Worker-4's Deque!`,
    codeSnippet: {
      title: 'Optional Best Practices vs Parallel Stream Thread-Safety Hazards',
      code: `import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;

public class OptionalAndParallelDemo {

    // Simulates an expensive external call
    private static String queryBackupRegistry() {
        System.out.println("  [ALERT] queryBackupRegistry() executed!");
        return "FALLBACK_USER";
    }

    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== 1. orElse (Eager) vs orElseGet (Lazy) ===");
        Optional<String> activeUser = Optional.of("Alice");

        System.out.println("Testing orElse() with present value:");
        // orElse evaluates its argument eagerly!
        String res1 = activeUser.orElse(queryBackupRegistry());
        System.out.println("Result: " + res1);

        System.out.println("Testing orElseGet() with present value:");
        // orElseGet evaluates lazily (lambda NOT called!)
        String res2 = activeUser.orElseGet(OptionalAndParallelDemo::queryBackupRegistry);
        System.out.println("Result: " + res2);

        System.out.println("\\n=== 2. Parallel Streams Race Condition vs Safe Reduction ===");
        int totalElements = 10_000;
        List<Integer> unsafeList = new ArrayList<>();

        // ANTI-PATTERN: Mutating shared state in parallel stream
        IntStream.range(0, totalElements).parallel().forEach(unsafeList::add);
        System.out.println("Unsafe ArrayList size (Expected 10000): " + unsafeList.size());

        // SAFE PATTERN: Using collect(Collectors.toList())
        List<Integer> safeList = IntStream.range(0, totalElements)
            .parallel()
            .boxed()
            .collect(Collectors.toList());
        System.out.println("Safe collected list size (Expected 10000): " + safeList.size());

        System.out.println("\\n=== 3. Common Pool Parallelism Level ===");
        int parallelism = ForkJoinPool.commonPool().getParallelism();
        System.out.println("ForkJoinPool.commonPool() Parallelism: " + parallelism);
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());
    }
}`,
      lineByLineExplanation: [
        { line: 'activeUser.orElse(queryBackupRegistry())', explanation: 'Eager evaluation pitfall: queryBackupRegistry() executes even though activeUser is already populated with "Alice".' },
        { line: 'activeUser.orElseGet(OptionalAndParallelDemo::queryBackupRegistry)', explanation: 'Lazy evaluation: The Supplier lambda is never invoked because activeUser contains a value.' },
        { line: 'IntStream.range(0, totalElements).parallel().forEach(unsafeList::add)', explanation: 'Catastrophic race condition: ArrayList is not thread-safe. Multiple threads resize the internal backing array concurrently, resulting in lost updates and size < 10000.' },
        { line: 'IntStream.range(0, totalElements).parallel().boxed().collect(Collectors.toList())', explanation: 'Thread-safe reduction: Streams internally manages per-thread buffers and merges them without race conditions.' }
      ],
      output: `=== 1. orElse (Eager) vs orElseGet (Lazy) ===
Testing orElse() with present value:
  [ALERT] queryBackupRegistry() executed!
Result: Alice
Testing orElseGet() with present value:
Result: Alice

=== 2. Parallel Streams Race Condition vs Safe Reduction ===
Unsafe ArrayList size (Expected 10000): 9421
Safe collected list size (Expected 10000): 10000

=== 3. Common Pool Parallelism Level ===
ForkJoinPool.commonPool() Parallelism: 7
Available Processors: 8`
    },
    codeExamples: [
      {
        title: 'Deep Monadic Optional Chaining Without Procedural Null Checks',
        description: 'Demonstrating how map(), flatMap(), and filter() safely navigate deeply nested domain objects.',
        code: `import java.util.Optional;

class Address {
    private final String zipCode;
    public Address(String zipCode) { this.zipCode = zipCode; }
    public String getZipCode() { return zipCode; }
}

class UserProfile {
    private final Address address;
    public UserProfile(Address address) { this.address = address; }
    public Optional<Address> getAddress() { return Optional.ofNullable(address); }
}

class Account {
    private final UserProfile profile;
    public Account(UserProfile profile) { this.profile = profile; }
    public Optional<UserProfile> getProfile() { return Optional.ofNullable(profile); }
}

public class MonadicOptionalExample {
    public static String extractZip(Account account) {
        return Optional.ofNullable(account)
            .flatMap(Account::getProfile)        // Avoids Optional<Optional<UserProfile>>
            .flatMap(UserProfile::getAddress)    // Flattens to Optional<Address>
            .map(Address::getZipCode)            // Maps to Optional<String>
            .filter(zip -> zip.matches("\\\\d{5}")) // Validates 5-digit US ZIP
            .orElse("INVALID_OR_MISSING_ZIP");
    }

    public static void main(String[] args) {
        Account validAcc = new Account(new UserProfile(new Address("94043")));
        Account badZipAcc = new Account(new UserProfile(new Address("ABCDE")));
        Account nullAcc = null;

        System.out.println("Valid Account: " + extractZip(validAcc));
        System.out.println("Bad Zip Account: " + extractZip(badZipAcc));
        System.out.println("Null Account: " + extractZip(nullAcc));
    }
}`,
        output: `Valid Account: 94043
Bad Zip Account: INVALID_OR_MISSING_ZIP
Null Account: INVALID_OR_MISSING_ZIP`
      },
      {
        title: 'Java 9+ Optional Enhancements: ifPresentOrElse, or, and stream()',
        description: 'Leveraging modern Java Optional methods for stream unwrapping and branch management.',
        code: `import java.util.*;
import java.util.stream.*;

public class ModernOptionalExample {
    public static Optional<String> findLocalCache(String key) {
        return key.equals("host") ? Optional.of("localhost") : Optional.empty();
    }

    public static Optional<String> findRemoteConfig(String key) {
        return key.equals("port") ? Optional.of("8080") : Optional.empty();
    }

    public static void main(String[] args) {
        List<String> queryKeys = List.of("host", "port", "missing");

        // 1. Chaining fallbacks with Optional.or()
        for (String key : queryKeys) {
            Optional<String> val = findLocalCache(key)
                .or(() -> findRemoteConfig(key));

            val.ifPresentOrElse(
                v -> System.out.println("Found [" + key + "] = " + v),
                () -> System.out.println("Missing config for key: " + key)
            );
        }

        // 2. Unwrapping stream of Optionals via Optional::stream
        List<String> resolvedValues = queryKeys.stream()
            .map(ModernOptionalExample::findLocalCache) // Stream<Optional<String>>
            .flatMap(Optional::stream)                 // Stream<String> (drops empty!)
            .collect(Collectors.toList());

        System.out.println("Resolved local values: " + resolvedValues);
    }
}`,
        output: `Found [host] = localhost
Found [port] = 8080
Missing config for key: missing
Resolved local values: [localhost]`
      },
      {
        title: 'Custom ForkJoinPool Isolation for Parallel Streams',
        description: 'Executing a parallel stream inside a dedicated ForkJoinPool to protect commonPool from exhaustion.',
        code: `import java.util.*;
import java.util.concurrent.*;
import java.util.stream.*;

public class CustomPoolParallelExample {
    public static void main(String[] args) throws Exception {
        List<Integer> taskIds = IntStream.rangeClosed(1, 8).boxed().collect(Collectors.toList());

        // Dedicated pool with 4 threads
        ForkJoinPool customPool = new ForkJoinPool(4);
        try {
            List<String> results = customPool.submit(() ->
                taskIds.parallelStream()
                    .map(id -> {
                        String threadName = Thread.currentThread().getName();
                        return "Task " + id + " executed on " + threadName;
                    })
                    .collect(Collectors.toList())
            ).get();

            results.forEach(System.out::println);
        } finally {
            customPool.shutdown();
        }
    }
}`,
        output: `Task 1 executed on ForkJoinPool-1-worker-1
Task 2 executed on ForkJoinPool-1-worker-2
Task 3 executed on ForkJoinPool-1-worker-3
Task 4 executed on ForkJoinPool-1-worker-4
Task 5 executed on ForkJoinPool-1-worker-1
Task 6 executed on ForkJoinPool-1-worker-2
Task 7 executed on ForkJoinPool-1-worker-3
Task 8 executed on ForkJoinPool-1-worker-4`
      },
      {
        title: 'Spliterator Performance Benchmark: ArrayList vs LinkedList',
        description: 'Illustrating why LinkedList degrades parallel performance compared to ArrayList.',
        code: `import java.util.*;
import java.util.stream.*;

public class SpliteratorComparisonDemo {
    public static void main(String[] args) {
        int size = 100_000;
        List<Integer> arrayList = new ArrayList<>(size);
        List<Integer> linkedList = new LinkedList<>();

        for (int i = 0; i < size; i++) {
            arrayList.add(i);
            linkedList.add(i);
        }

        // Test ArrayList Spliterator characteristics
        Spliterator<Integer> arrSplit = arrayList.spliterator();
        System.out.println("ArrayList Spliterator SIZED: " + arrSplit.hasCharacteristics(Spliterator.SIZED));
        System.out.println("ArrayList Spliterator SUBSIZED: " + arrSplit.hasCharacteristics(Spliterator.SUBSIZED));

        // Test LinkedList Spliterator characteristics
        Spliterator<Integer> linkSplit = linkedList.spliterator();
        System.out.println("LinkedList Spliterator SIZED: " + linkSplit.hasCharacteristics(Spliterator.SIZED));
        System.out.println("LinkedList Spliterator SUBSIZED: " + linkSplit.hasCharacteristics(Spliterator.SUBSIZED));
    }
}`,
        output: `ArrayList Spliterator SIZED: true
ArrayList Spliterator SUBSIZED: true
LinkedList Spliterator SIZED: true
LinkedList Spliterator SUBSIZED: false`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using Optional.get() without checking isPresent()',
        whyItHappens: 'Developers treat Optional as a simple wrapper and call .get() directly, triggering NoSuchElementException on empty Optionals.',
        howToFix: 'Use orElse(), orElseGet(), orElseThrow(), or monadic methods (map, ifPresent) instead of get().'
      },
      {
        mistake: 'Calling an expensive method or database query inside orElse()',
        whyItHappens: 'Developers do not realize that orElse(computeValue()) evaluates its argument eagerly on every call, even when the Optional contains a valid value.',
        howToFix: 'Always use orElseGet(() -> computeValue()) to defer computation until the Optional is verified empty.'
      },
      {
        mistake: 'Mutating an external non-thread-safe collection inside a parallel stream',
        whyItHappens: 'Developers write parallelStream().forEach(list::add) expecting Java to handle concurrency automatically.',
        howToFix: 'Never mutate shared collections in stream pipelines. Use collect(Collectors.toList()) to gather results in a thread-safe manner.'
      },
      {
        mistake: 'Executing blocking network I/O or database calls inside parallel streams',
        whyItHappens: 'Developers see parallelStream() as an easy way to speed up REST or DB queries across multiple items.',
        howToFix: 'Parallel streams share the fixed ForkJoinPool.commonPool(). Blocking I/O starves all CPU cores. Use CompletableFuture with a dedicated ExecutorService instead.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Eager orElse Evaluation Side Effect',
        problemStatement: 'What does this program print?',
        code: `import java.util.Optional;

public class Puzzle1 {
    private static int counter = 0;

    private static String getDefault() {
        counter++;
        return "DEFAULT";
    }

    public static void main(String[] args) {
        Optional<String> opt = Optional.of("HELLO");
        String val = opt.orElse(getDefault());
        System.out.println(val + " " + counter);
    }
}`,
        options: [
          'A) HELLO 0',
          'B) HELLO 1',
          'C) DEFAULT 1',
          'D) Compilation error'
        ],
        correctOptionIndex: 1,
        hint: 'Are arguments to Java methods evaluated before or after entering the method?',
        solution: 'Option B is correct: HELLO 1',
        explanation: 'In Java, method arguments are always evaluated eagerly before the method executes. Calling `opt.orElse(getDefault())` executes `getDefault()`, incrementing counter to 1, even though `opt` is present and returns "HELLO". Using `orElseGet(Puzzle1::getDefault)` would keep counter at 0.'
      },
      {
        title: 'Puzzle 2: Optional.of() with Null Value',
        problemStatement: 'What happens when Optional.of(null) is invoked?',
        code: `import java.util.Optional;

public class Puzzle2 {
    public static void main(String[] args) {
        try {
            Optional<String> opt = Optional.of(null);
            System.out.println(opt.isPresent());
        } catch (Exception e) {
            System.out.println(e.getClass().getSimpleName());
        }
    }
}`,
        options: [
          'A) false',
          'B) Throws NullPointerException',
          'C) Throws IllegalArgumentException',
          'D) Prints true'
        ],
        correctOptionIndex: 1,
        hint: 'Which method accepts null: of() or ofNullable()?',
        solution: 'Option B is correct: Throws NullPointerException',
        explanation: '`Optional.of(val)` requires val to be non-null; if val is null, it immediately throws NullPointerException. To safely wrap a nullable reference, `Optional.ofNullable(val)` must be used.'
      },
      {
        title: 'Puzzle 3: map() vs flatMap() Nesting',
        problemStatement: 'What is the return type of `opt.map(s -> Optional.of(s.length()))` when `opt` is `Optional<String>`?',
        code: `import java.util.Optional;

public class Puzzle3 {
    public static void main(String[] args) {
        Optional<String> opt = Optional.of("apple");
        var result = opt.map(s -> Optional.of(s.length()));
        System.out.println(result.getClass().getSimpleName());
    }
}`,
        options: [
          'A) Optional (wrapping Integer)',
          'B) Optional (wrapping Optional<Integer>)',
          'C) Integer',
          'D) Compilation error'
        ],
        correctOptionIndex: 1,
        hint: 'map wraps whatever the mapper returns in an Optional. What if the mapper already returns an Optional?',
        solution: 'Option B is correct: Optional (wrapping Optional<Integer>)',
        explanation: 'The `map()` method takes a Function<T, U> and wraps the returned U into `Optional<U>`. When U is `Optional<Integer>`, the result is `Optional<Optional<Integer>>`. To flatten this, `flatMap()` must be used instead.'
      },
      {
        title: 'Puzzle 4: flatMap on Empty Optional',
        problemStatement: 'What does this pipeline output?',
        code: `import java.util.Optional;

public class Puzzle4 {
    public static void main(String[] args) {
        Optional<String> empty = Optional.empty();
        Optional<Integer> result = empty.flatMap(s -> Optional.of(s.length()));
        System.out.println(result.isPresent());
    }
}`,
        options: [
          'A) Throws NullPointerException',
          'B) Throws NoSuchElementException',
          'C) false',
          'D) true'
        ],
        correctOptionIndex: 2,
        hint: 'If the starting Optional is empty, does flatMap invoke the mapping function?',
        solution: 'Option C is correct: false',
        explanation: 'When flatMap is called on an empty Optional, the mapper function is not executed at all; it immediately returns Optional.empty(). Therefore, result.isPresent() is false.'
      },
      {
        title: 'Puzzle 5: Parallel Stream Race Condition Output',
        problemStatement: 'What happens when running this parallel reduction to an ArrayList?',
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

public class Puzzle5 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        IntStream.range(0, 1000).parallel().forEach(list::add);
        System.out.println(list.size() == 1000);
    }
}`,
        options: [
          'A) Always prints true',
          'B) May print false, throw ArrayIndexOutOfBoundsException, or produce null entries',
          'C) Always throws ConcurrentModificationException',
          'D) Always deadlocks'
        ],
        correctOptionIndex: 1,
        hint: 'Is ArrayList thread-safe when multiple threads call add() concurrently?',
        solution: 'Option B is correct: May print false, throw ArrayIndexOutOfBoundsException, or produce null entries',
        explanation: 'ArrayList is not thread-safe. Multiple ForkJoin worker threads calling list.add() concurrently encounter race conditions during element assignment and internal array resizing (grow()). This results in lost updates (size < 1000), ArrayIndexOutOfBoundsException, or stray nulls.'
      },
      {
        title: 'Puzzle 6: filter() on Optional Matching State',
        problemStatement: 'What is printed by this Optional filter chain?',
        code: `import java.util.Optional;

public class Puzzle6 {
    public static void main(String[] args) {
        String res = Optional.of("developer")
            .filter(s -> s.length() < 5)
            .orElse("too_long");
        System.out.println(res);
    }
}`,
        options: [
          'A) developer',
          'B) too_long',
          'C) null',
          'D) Throws NoSuchElementException'
        ],
        correctOptionIndex: 1,
        hint: '"developer".length() is 9. Does 9 < 5 evaluate to true or false?',
        solution: 'Option B is correct: too_long',
        explanation: '"developer".length() is 9, which does not satisfy `s.length() < 5`. The filter() operation therefore converts the Optional into `Optional.empty()`. Consequently, `orElse("too_long")` provides the fallback string "too_long".'
      },
      {
        title: 'Puzzle 7: ForkJoinPool.commonPool Default Parallelism',
        problemStatement: 'On an 8-core CPU, what does ForkJoinPool.commonPool().getParallelism() return by default?',
        code: `import java.util.concurrent.ForkJoinPool;

public class Puzzle7 {
    public static void main(String[] args) {
        System.out.println(ForkJoinPool.commonPool().getParallelism());
    }
}`,
        options: [
          'A) 8',
          'B) 7 (availableProcessors - 1)',
          'C) 16',
          'D) 1'
        ],
        correctOptionIndex: 1,
        hint: 'Does the common pool count the calling thread as part of its parallelism?',
        solution: 'Option B is correct: 7 (availableProcessors - 1)',
        explanation: 'By default, `ForkJoinPool.commonPool().getParallelism()` is configured to `Runtime.getRuntime().availableProcessors() - 1`. On an 8-core machine, this returns 7. The main or submitting thread acts as the 8th thread when waiting on tasks.'
      },
      {
        title: 'Puzzle 8: Java 9 Optional.stream() FlatMap Behavior',
        problemStatement: 'What does this pipeline print?',
        code: `import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Puzzle8 {
    public static void main(String[] args) {
        List<Optional<String>> options = List.of(
            Optional.of("A"),
            Optional.empty(),
            Optional.of("B")
        );
        
        List<String> list = options.stream()
            .flatMap(Optional::stream)
            .collect(Collectors.toList());
            
        System.out.println(list);
    }
}`,
        options: [
          'A) [A, null, B]',
          'B) [A, B]',
          'C) [Optional[A], Optional[B]]',
          'D) Throws NoSuchElementException'
        ],
        correctOptionIndex: 1,
        hint: 'What does Optional.stream() produce for an empty Optional vs a populated Optional?',
        solution: 'Option B is correct: [A, B]',
        explanation: 'Java 9 added `Optional.stream()`. If the Optional is present, it returns a 1-element Stream of that value; if empty, it returns an empty Stream (0 elements). flatMap cleanly unwraps the present values and discards the empty ones, resulting in `[A, B]`.'
      },
      {
        title: 'Puzzle 9: Stateful Intermediate Operation in Parallel Stream',
        problemStatement: 'What does this parallel stream print?',
        code: `import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Puzzle9 {
    public static void main(String[] args) {
        List<Integer> list = IntStream.rangeClosed(1, 10)
            .parallel()
            .limit(3)
            .boxed()
            .collect(Collectors.toList());
            
        System.out.println(list);
    }
}`,
        options: [
          'A) Any random 3 numbers between 1 and 10',
          'B) [1, 2, 3]',
          'C) Throws UnsupportedOperationException',
          'D) [8, 9, 10]'
        ],
        correctOptionIndex: 1,
        hint: 'Does IntStream.rangeClosed define an encounter order?',
        solution: 'Option B is correct: [1, 2, 3]',
        explanation: 'IntStream.rangeClosed has a defined encounter order. Even in a parallel stream, `limit(3)` is constrained to return the first 3 elements in encounter order: `[1, 2, 3]`. However, this requires expensive cross-thread coordination and barrier synchronization, making limit() costly in parallel streams.'
      },
      {
        title: 'Puzzle 10: orElseThrow() Parameterless vs Custom Exception',
        problemStatement: 'In Java 10+, what does parameterless `opt.orElseThrow()` throw when `opt` is empty?',
        code: `import java.util.Optional;

public class Puzzle10 {
    public static void main(String[] args) {
        try {
            Optional<String> empty = Optional.empty();
            empty.orElseThrow();
        } catch (Exception e) {
            System.out.println(e.getClass().getSimpleName());
        }
    }
}`,
        options: [
          'A) NullPointerException',
          'B) NoSuchElementException',
          'C) IllegalArgumentException',
          'D) IllegalStateException'
        ],
        correctOptionIndex: 1,
        hint: 'What standard exception does Optional.get() throw when empty?',
        solution: 'Option B is correct: NoSuchElementException',
        explanation: 'Java 10 introduced the parameterless `orElseThrow()` as the preferred replacement for `.get()`. When the Optional is empty, it throws `NoSuchElementException`.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What was the specific architectural intent behind the design of Optional<T> in Java 8, and why should it NOT be used for class fields or method parameters?',
        answer: 'Optional<T> was introduced by the Java language architects (led by Brian Goetz) strictly as a library return type to clearly signify methods that might return "no result" (e.g. Stream.findFirst(), Map.max()). Its design forces calling code to explicitly confront the possibility of absence, thereby preventing NullPointerException. It was NOT designed for general null replacement. Using Optional for class fields or method parameters is strongly discouraged for three reasons: (1) Heap & GC Overhead: Each Optional is a full object requiring 16 bytes (or 24 bytes on uncompressed 64-bit JVMs) plus a reference pointer, creating significant memory pressure and GC churn compared to a simple null reference. (2) Serialization: Optional does not implement java.io.Serializable. Using it in domain entity fields breaks Java native serialization and many enterprise frameworks (like Hibernate, RMI, or legacy RPC). (3) Parameter Clutter: Requiring callers to pass `Optional.of(arg)` or `Optional.empty()` litters calling code with boilerplate. Method overloading or null-checking is far cleaner.',
        followUp: 'Is there any performance overhead when returning an Optional from a hot method?',
        followUpAnswer: 'Yes. Unless the JVM JIT compiler can perform escape analysis and scalar replacement to eliminate the allocation, returning Optional allocates a new object on the heap for every call.',
        keyPhrases: [
          'Designed strictly as a library return type',
          'Forces callers to handle absence explicitly',
          'Not Serializable (breaks Hibernate, RMI, caching)',
          'Incurs 16-24 byte heap overhead per instance',
          'Never use as method parameters, class fields, or collection elements'
        ],
        commonMistakeAnswer: 'Believing Optional was designed to replace all nulls across the entire application codebase.'
      },
      {
        question: 'Explain the critical difference between Optional.orElse() and Optional.orElseGet(). What performance trap occurs when using orElse()?',
        answer: 'The difference lies in eager versus lazy evaluation. The method signature for orElse is `T orElse(T other)`, which accepts a concrete value. In Java, method arguments are always evaluated eagerly before the method body is invoked. Therefore, if you write `opt.orElse(computeDefault())`, the method `computeDefault()` is executed EVERY SINGLE TIME, even if `opt.isPresent()` is true and the fallback value is discarded! In contrast, `orElseGet(Supplier<? extends T> supplier)` takes a functional interface. It evaluates the lambda lazily, executing the supplier ONLY when the Optional is empty. If the fallback computation involves a database query, network call, or expensive object instantiation, using `orElse()` causes severe redundant latency and resource waste.',
        followUp: 'Can orElse(null) ever be appropriate?',
        followUpAnswer: 'Yes. If you simply want to extract the underlying value or null if absent (e.g., when interacting with legacy APIs that expect null), `opt.orElse(null)` is completely fine and has no performance penalty since null is a literal constant.',
        keyPhrases: [
          'orElse(val) evaluates argument eagerly before method execution',
          'orElseGet(Supplier) evaluates lazily only when Optional is empty',
          'Passing method calls to orElse causes redundant DB or network calls',
          'Always use orElseGet for dynamic, computed, or expensive fallbacks'
        ],
        commonMistakeAnswer: 'Claiming that orElse() and orElseGet() are identical syntactic sugar.'
      },
      {
        question: 'How do map() and flatMap() differ on Optional<T>, and when must you use flatMap()?',
        answer: 'Both map() and flatMap() apply a transforming function to the inner value if present. The difference is: (1) `map(Function<T, U>)`: The mapping function returns a raw type U. `map()` automatically wraps that U inside `Optional<U>`. If the mapping function returns null, it returns `Optional.empty()`. (2) `flatMap(Function<T, Optional<U>>)`: The mapping function itself returns an `Optional<U>`. `flatMap()` does not wrap the result in an additional Optional; instead, it returns `Optional<U>` directly. You MUST use flatMap() whenever the getter or transformation method already returns an `Optional`. If you used `map()` on a method returning `Optional<Address>`, you would end up with an unmanageable nested `Optional<Optional<Address>>`.',
        followUp: 'What happens if the function passed to flatMap returns null?',
        followUpAnswer: 'flatMap() explicitly checks for null and throws a NullPointerException, because an Optional-returning function is strictly expected to return Optional.empty(), never null.',
        keyPhrases: [
          'map wraps result U into Optional<U>',
          'flatMap expects mapper to return Optional<U> and flattens it',
          'flatMap prevents nested Optional<Optional<T>>',
          'Essential when navigating domain models with Optional getters',
          'flatMap throws NPE if mapping function returns null'
        ],
        commonMistakeAnswer: 'Saying flatMap is only for collections and cannot be used on a single Optional.'
      },
      {
        question: 'What is ForkJoinPool.commonPool(), how is its default parallelism calculated, and how does it execute parallel streams?',
        answer: 'ForkJoinPool.commonPool() is the default, shared thread pool used by all parallel streams, CompletableFutures (without explicit executors), and ForkJoin tasks in the JVM. It is designed around work-stealing: each worker thread maintains a double-ended queue (deque) of tasks. Threads push and pop subtasks from the head of their own deque (LIFO, optimizing for cache locality). When a thread runs out of work, it steals tasks from the tail of another thread`s deque (FIFO). By default, its parallelism level is set to `Runtime.getRuntime().availableProcessors() - 1`. The subtracting of 1 accounts for the thread submitting the parallel stream, allowing all CPU cores to stay saturated during parallel reduction.',
        followUp: 'How can you override the default common pool parallelism level?',
        followUpAnswer: 'Via the JVM system property `-Djava.util.concurrent.ForkJoinPool.common.parallelism=N`. However, this changes the pool size globally for all components in the entire JVM.',
        keyPhrases: [
          'Shared JVM-wide pool for parallel streams and CompletableFuture',
          'Work-stealing algorithm with per-thread deques',
          'Default parallelism is availableProcessors() - 1',
          'LIFO local execution with FIFO task stealing across threads',
          'Global resource shared across all web requests and subsystems'
        ],
        commonMistakeAnswer: 'Thinking each parallel stream creates its own separate thread pool.'
      },
      {
        question: 'Why is running blocking I/O (e.g., HTTP requests or database calls) inside a parallel stream considered a catastrophic anti-pattern in enterprise systems?',
        answer: 'Because parallel streams execute on the shared, JVM-wide `ForkJoinPool.commonPool()`. The common pool size is strictly tuned for CPU-bound computations (equal to CPU core count, e.g., 8 threads on an 8-core host). If a parallel stream performs blocking I/O (such as calling a 500ms REST endpoint or waiting on a database lock), those worker threads enter a BLOCKED or WAITING state. With just 8 concurrent blocking tasks, all 8 common pool worker threads become paralyzed! Any other parallel stream, parallel collector, or CompletableFuture in the entire JVM—including those handling unrelated user web requests in a Spring Boot application—are starved of execution threads and freeze. To run concurrent I/O, developers must use CompletableFutures with a dedicated, custom ThreadPoolExecutor sized appropriately for I/O concurrency.',
        followUp: 'Can you run a parallel stream on a custom ForkJoinPool instead of the common pool?',
        followUpAnswer: 'Yes, by submitting the parallel stream inside `customForkJoinPool.submit(() -> stream.parallel()...).get()`. However, this relies on internal ForkJoinPool implementation details and is still less flexible than an ExecutorService with CompletableFutures.',
        keyPhrases: [
          'commonPool has limited threads equal to CPU cores',
          'Blocking I/O starves worker threads in BLOCKED/WAITING state',
          'Paralyzes all parallel streams across the entire JVM',
          'Causes cascading latency and request timeouts in web containers',
          'Use CompletableFuture with dedicated ExecutorService for I/O'
        ],
        commonMistakeAnswer: 'Assuming parallelStream automatically scales up threads dynamically to handle blocking operations.'
      },
      {
        question: 'Explain the N * Q formula and identify the overheads that can make a parallel stream slower than a sequential loop.',
        answer: 'Formulated by concurrency expert Doug Lea, the `N * Q` model provides a heuristic for deciding whether to parallelize: `N` is the number of data items, and `Q` is the amount of work (CPU cycles) performed per item. Parallelization provides a net performance gain only when the product `N * Q` is large (typically `N * Q > 10,000`). If `N * Q` is small, parallel streams are often significantly SLOWER than a simple sequential loop due to four major overheads: (1) Splitting Overhead: Splitting the source collection into subtasks via Spliterator.trySplit(). (2) Task Creation & Scheduling: Allocating ForkJoinTask objects and enqueuing them on worker deques. (3) Context Switching & Inter-Core Cache Invalidation: Passing data across CPU core caches causes cache misses and CPU bus synchronization. (4) Merging / Combining: Combining partial results in the terminal operation via combiner functions.',
        followUp: 'Give an example where a parallel stream is dramatically slower than sequential.',
        followUpAnswer: 'Summing 1,000 integers: `IntStream.range(0, 1000).parallel().sum()`. The addition takes 1 CPU cycle per element (Q=1, N=1000, N*Q=1000). The overhead of ForkJoin task scheduling exceeds the computation time by 10x to 100x.',
        keyPhrases: [
          'N * Q model: N elements * Q computation cycles per item',
          'Threshold: N * Q should exceed 10,000 for parallel gain',
          'Overheads: Spliterator splitting, task scheduling, cache misses, result merging',
          'Trivial operations on small data run slower in parallel',
          'Boxed primitive streams incur severe GC and cache penalties'
        ],
        commonMistakeAnswer: 'Believing that parallel streams are always faster regardless of dataset size.'
      },
      {
        question: 'Why does ArrayList parallelize exceptionally well, while LinkedList parallelizes terribly?',
        answer: 'The difference lies in how their respective `Spliterator` implementations decompose data. (1) `ArrayList`: Backed by a contiguous memory array with instant random access. Its Spliterator has characteristics `SIZED` and `SUBSIZED`. Calling `trySplit()` computes the midpoint in O(1) time: `int mid = (lo + hi) >>> 1`, creating two perfectly balanced sub-spliterators with zero memory traversal. Furthermore, contiguous memory arrays benefit from CPU L1/L2 prefetching. (2) `LinkedList`: A doubly-linked node list scattered across the heap. It does NOT have random access. To split a LinkedList in half, the Spliterator must traverse node references one by one in O(N) time! Worse, finding the exact midpoint is so costly that LinkedList spliterators often split into uneven, poorly balanced chunks. The thread splitting overhead completely eclipses the work to be done.',
        followUp: 'What other data sources split poorly in parallel streams?',
        followUpAnswer: 'Stream.iterate() (unbounded with no size knowledge) and I/O streams like BufferedReader.lines() (must read lines sequentially to find line breaks).',
        keyPhrases: [
          'ArrayList spliterator splits in O(1) by index midpoint',
          'ArrayList has SIZED and SUBSIZED characteristics and CPU cache locality',
          'LinkedList requires O(N) sequential pointer chasing to split',
          'LinkedList produces unbalanced chunks and pointer cache misses',
          'Stream.iterate and BufferedReader.lines split poorly'
        ],
        commonMistakeAnswer: 'Assuming all Collection types parallelize equally well.'
      },
      {
        question: 'What happens when a parallel stream executes a stateful operation like list.add() or limit()?',
        answer: 'There are two critical consequences: (1) Race Conditions on Shared Mutable State: If the lambda modifies external state (e.g. `list::add` where list is an ArrayList), multiple threads access and mutate the non-thread-safe internal array concurrently. This results in data races, lost elements, and ArrayIndexOutOfBoundsException. (2) Synchronization Barriers in Stateful Intermediate Operations: Operations like `limit(n)`, `skip(n)`, `distinct()`, and `sorted()` are stateful. To enforce the stream`s encounter order in parallel execution, `limit(n)` cannot simply let threads run wild; it must coordinate among all worker threads to ensure only the first n items in encounter order are kept. This requires cross-thread synchronization, buffering, and thread waiting, which eliminates concurrency benefits.',
        followUp: 'How can you safely gather elements from a parallel stream into a list?',
        followUpAnswer: 'Always use `stream.parallel().collect(Collectors.toList())`. Streams will create thread-local accumulators and merge them safely without external synchronization.',
        keyPhrases: [
          'Mutating external collections causes race conditions and lost updates',
          'ArrayList::add in parallel causes ArrayIndexOutOfBoundsException',
          'Stateful operations (limit, sorted, distinct) require cross-thread coordination',
          'Encounter order enforcement adds synchronization barriers',
          'Always use collect(Collectors.toList()) for thread-safe accumulation'
        ],
        commonMistakeAnswer: 'Thinking wrapping ArrayList in Collections.synchronizedList() makes parallel streams fast and optimal.'
      },
      {
        question: 'How do Java 9`s Optional.ifPresentOrElse() and Optional.or() improve clean code over pre-Java 9 idioms?',
        answer: 'Prior to Java 9, handling both present and absent cases required either breaking out of functional style into procedural code: `if (opt.isPresent()) { doSomething(opt.get()); } else { doDefault(); }` or writing convoluted tertiary expressions. Java 9 introduced `ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction)`, allowing both branches to be handled concisely within a functional pipeline without calling `.get()`. Similarly, before Java 9, if you wanted to check multiple fallback sources returning Optional (e.g. check local cache, then remote cache, then database), you had to write nested ternary operators. Java 9 introduced `or(Supplier<? extends Optional<? extends T>> supplier)`, which allows chaining fallback Optional producers lazily: `findInLocalCache().or(this::findInRemoteCache).or(this::findInDb)`.',
        followUp: 'How does Optional.or() differ from Optional.orElseGet()?',
        followUpAnswer: 'Optional.orElseGet() returns the raw unwrapped value T, terminating the Optional chain. Optional.or() returns another Optional<T>, allowing continued monadic chaining.',
        keyPhrases: [
          'ifPresentOrElse eliminates procedural if (opt.isPresent()) / else blocks',
          'Accepts Consumer for value and Runnable for absence',
          'Optional.or() enables chaining fallback Optional producers',
          'Optional.or() returns Optional<T>, preserving monadic chaining',
          'orElseGet returns unwrapped T, terminating the chain'
        ],
        commonMistakeAnswer: 'Confusing Optional.or() with Optional.orElse().'
      },
      {
        question: 'Under what specific conditions is it safe and recommended to use a parallel stream in enterprise production systems?',
        answer: 'A parallel stream is safe and recommended ONLY when ALL of the following criteria are met: (1) CPU-Bound Work: The operation is purely computational (e.g. cryptography, hashing, complex mathematical scoring, image processing) with ZERO blocking I/O. (2) Sufficient Workload (N * Q > 10,000): The dataset is sufficiently large or the per-element calculation is computationally heavy enough to exceed thread coordination costs. (3) Highly Decomposable Data Source: The source is an array, `ArrayList`, or primitive range (`IntStream.range`) with O(1) SIZED splitting. (4) Purely Stateless Lambdas: The operations have no side effects, do not access or mutate shared state, and do not rely on thread-local variables. (5) Associative Reduction: Any reduction or combination operation is strictly associative and stateless. (6) No Low-Latency Web Container Thread Competition: The parallel stream does not run inside a latency-critical web request thread where monopolizing commonPool threads could cause starvation for concurrent requests.',
        followUp: 'What is the preferred alternative when you need high concurrency for I/O-bound tasks?',
        followUpAnswer: 'Use asynchronous CompletableFuture pipelines or Java 21 Virtual Threads (Project Loom) configured with dedicated executors sized for I/O concurrency.',
        keyPhrases: [
          'Purely CPU-bound computation with zero blocking I/O',
          'N * Q exceeds 10,000',
          'Easily splittable source (ArrayList, arrays, IntStream)',
          'Stateless, non-interfering lambdas without shared mutable state',
          'Associative reduction operations',
          'Not competing with latency-critical web request threads'
        ],
        commonMistakeAnswer: 'Recommending parallel streams for batch database processing or calling third-party microservices.'
      }
    ],
    miniQuiz: [
      {
        question: 'Why is Optional NOT recommended for use as a class field?',
        options: [
          'It is not serializable and adds heap overhead of 16-24 bytes per instance',
          'It causes a compilation error if used in classes',
          'It can only hold primitive types',
          'It is deprecated in Java 17'
        ],
        correctIndex: 0,
        explanation: 'Optional does not implement Serializable, breaking Java serialization and ORM frameworks, and adds object header overhead to every instance.'
      },
      {
        question: 'What is the critical difference between orElse(compute()) and orElseGet(() -> compute())?',
        options: [
          'orElse() is lazy while orElseGet() is eager',
          'orElse() evaluates compute() eagerly every time; orElseGet() evaluates compute() only when the Optional is empty',
          'orElse() returns an Optional while orElseGet() returns a raw value',
          'There is no difference; they are identical'
        ],
        correctIndex: 1,
        explanation: 'orElse() evaluates its parameter eagerly regardless of whether the Optional has a value, while orElseGet() defers evaluation lazily via Supplier.'
      },
      {
        question: 'Which method on Optional should you use when your mapping function returns an Optional<U> to avoid Optional<Optional<U>>?',
        options: ['map()', 'flatMap()', 'filter()', 'unwrap()'],
        correctIndex: 1,
        explanation: 'flatMap() flattens the returned Optional<U>, avoiding nested Optionals.'
      },
      {
        question: 'What thread pool does a parallel stream use by default?',
        options: [
          'Executors.newCachedThreadPool()',
          'ForkJoinPool.commonPool()',
          'Executors.newFixedThreadPool(4)',
          'A newly spawned Thread for each element'
        ],
        correctIndex: 1,
        explanation: 'Parallel streams run on the shared JVM-wide ForkJoinPool.commonPool() by default.'
      },
      {
        question: 'What happens if you execute parallelStream().forEach(list::add) where list is a standard ArrayList?',
        options: [
          'The list is populated safely and deterministically',
          'A compilation error occurs',
          'Race conditions cause lost updates, ArrayIndexOutOfBoundsException, or null elements',
          'The stream automatically switches to sequential execution'
        ],
        correctIndex: 2,
        explanation: 'ArrayList is not thread-safe. Concurrent additions from multiple worker threads cause data corruption and lost updates.'
      },
      {
        question: 'Which data source splits most efficiently in a parallel stream?',
        options: [
          'LinkedList',
          'ArrayList',
          'Stream.iterate(0, i -> i + 1)',
          'BufferedReader.lines()'
        ],
        correctIndex: 1,
        explanation: 'ArrayList is backed by an indexed array, allowing its Spliterator to split in O(1) time with perfect load balance.'
      },
      {
        question: 'What is the default parallelism level of ForkJoinPool.commonPool() on a system with N available processors?',
        options: ['N', 'N - 1', '2 * N', '1'],
        correctIndex: 1,
        explanation: 'By default, commonPool parallelism is Runtime.getRuntime().availableProcessors() - 1.'
      },
      {
        question: 'What Java 9 method converts an Optional<T> directly into a zero- or one-element Stream<T>?',
        options: ['toStream()', 'stream()', 'asStream()', 'toList()'],
        correctIndex: 1,
        explanation: 'Java 9 added Optional.stream(), which returns a Stream containing the inner value if present, or an empty Stream if absent.'
      },
      {
        question: 'Why should blocking network I/O NEVER be performed inside a parallel stream?',
        options: [
          'Network sockets cannot be opened from worker threads',
          'Blocking I/O starves the fixed commonPool threads, paralyzing parallel processing across the entire JVM',
          'Parallel streams only support mathematical functions',
          'It throws an UnsupportedOperationException at runtime'
        ],
        correctIndex: 1,
        explanation: 'Because commonPool has a limited number of worker threads equal to CPU cores, blocking I/O halts those threads and starves all other tasks in the JVM.'
      },
      {
        question: 'What does parameterless orElseThrow() throw in Java 10+ when the Optional is empty?',
        options: [
          'NullPointerException',
          'NoSuchElementException',
          'IllegalStateException',
          'OptionalEmptyException'
        ],
        correctIndex: 1,
        explanation: 'In Java 10+, calling opt.orElseThrow() without arguments throws java.util.NoSuchElementException when empty.'
      }
    ]
  }
};
