// ============================================================
// JAVA ADVANCED CORE LESSONS (Modules 20 - 24)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const ADVANCED_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 20: Exception Handling ──────────────────────────
  'java-exceptions': {
    intro: 'Exception handling provides a structured mechanism to intercept and recover from runtime errors without abnormal application termination. In Java, Throwable is the root of the hierarchy, branching into Errors (system-level) and Exceptions (application-level).',
    keyConcepts: [
      { term: 'Throwable Hierarchy', definition: 'Throwable is superclass. Divided into Error (JVM/system failures like OutOfMemoryError, StackOverflowError) and Exception.', example: 'Throwable -> Error / Exception' },
      { term: 'Checked vs Unchecked', definition: 'Checked (extends Exception directly): validated at compile-time; must catch or declare with throws (e.g. IOException, SQLException). Unchecked (extends RuntimeException): not checked at compile-time (e.g. NullPointerException, ArithmeticException).', example: 'Checked: IOException; Unchecked: NullPointerException' },
      { term: 'try-catch-finally', definition: 'try contains error-prone code; catch captures and handles; finally ALWAYS executes regardless of exception or return (except System.exit).', example: 'finally { cleanUp(); }' },
      { term: 'throw vs throws', definition: 'throw explicitly raises an exception object inside method body. throws declares potential exceptions in method signature.', example: 'throw new IllegalArgumentException(); void readFile() throws IOException' },
      { term: 'try-with-resources', definition: 'Java 7+ construct that automatically closes any resource implementing AutoCloseable at end of try block, preventing resource leaks.', example: 'try (FileReader fr = new FileReader("data.txt")) { ... }' },
    ],
    codeExamples: [
      {
        title: 'try-with-resources and Multi-Catch',
        code: `import java.io.*;

public class ExceptionDemo {
    public static void readFileSafe(String path) {
        // Automatic resource management (AutoCloseable)
        try (BufferedReader br = new BufferedReader(new StringReader("Line 1\\nLine 2"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println("Read: " + line);
            }
        } catch (IOException | NullPointerException e) { // Multi-catch
            System.err.println("Handling error: " + e.getMessage());
        } finally {
            System.out.println("Completed file processing.");
        }
    }

    public static void main(String[] args) {
        readFileSafe("test.txt");
    }
}`,
        output: `Read: Line 1
Read: Line 2
Completed file processing.`
      }
    ],
    commonMistakes: [
      'Catching generic Exception or Throwable and swallowing it silently without logging.',
      'Ordering catch blocks from parent to child (e.g. catch Exception before IOException causes compile error).',
      'Thinking finally won\'t run when a return statement is present in the try block (finally executes before the method returns!).',
    ],
    interviewTips: [
      '"Can finally block be skipped?" -> Yes, only in two scenarios: (1) System.exit(0) is called, or (2) JVM crashes / fatal OS process kill.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between final, finally, and finalize in Java?', a: 'final is a modifier (constant variable, un-extendable class, un-overridable method). finally is a block attached to try-catch that always executes. finalize() is a deprecated Object method previously invoked by the Garbage Collector before reclaiming memory.' },
    ],
    revisionPoints: [
      'Checked = compile-time enforced; Unchecked = RuntimeException',
      'finally block always runs before return',
      'Use try-with-resources for AutoCloseable resources',
      'Catch specific exceptions before general ones',
    ]
  },

  // ── MODULE 21: Java 8+ Streams & Lambdas ────────────────────
  'java-streams': {
    intro: 'Introduced in Java 8, Lambdas bring functional programming to Java, enabling functional interfaces to be treated as first-class parameters. The Stream API provides a declarative, pipeline-based approach for processing collections of data with automatic parallelization support.',
    keyConcepts: [
      { term: 'Lambda Expressions', definition: 'Anonymous functions without names or access modifiers. Syntax: (parameters) -> { body }.', example: '(a, b) -> a + b' },
      { term: 'Functional Interfaces', definition: 'Interfaces with exactly one abstract method (SAM). Core 4: Predicate<T> (returns boolean), Function<T, R> (transforms), Consumer<T> (accepts, returns void), Supplier<T> (returns instance).', example: '@FunctionalInterface Predicate<String> isEmpty = s -> s.isEmpty();' },
      { term: 'Intermediate Operations', definition: 'Operations that transform a stream and are LAZY (executed only when terminal operation is reached). Examples: filter(), map(), sorted(), distinct(), flatMap().', example: 'stream.filter(...).map(...)' },
      { term: 'Terminal Operations', definition: 'Eager operations that trigger execution and produce a non-stream result (collection, scalar, or side-effect). Examples: collect(), count(), forEach(), reduce().', example: 'collect(Collectors.toList())' },
      { term: 'Optional<T>', definition: 'A container object that may or may not contain a non-null value, designed to prevent NullPointerExceptions.', example: 'Optional<User> user = findById(1);' },
      { term: 'Method References', definition: 'Compact shorthand for lambdas calling existing methods: ClassName::methodName or instance::methodName.', example: 'System.out::println' },
    ],
    codeExamples: [
      {
        title: 'Stream Pipeline: Filter, Map, GroupingBy, and Reduce',
        code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamsDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Java", "Spring", "Docker", "Kubernetes", "AWS", "JPA");

        // Filter length > 3, uppercase, sorted
        List<String> filtered = names.stream()
            .filter(s -> s.length() > 3)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Filtered: " + filtered);

        // Group by length
        Map<Integer, List<String>> byLength = names.stream()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("Grouped by length: " + byLength);

        // Summing with reduce
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        int sum = numbers.stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);
    }
}`,
        output: `Filtered: [DOCKER, JAVA, KUBERNETES, SPRING]
Grouped by length: {3=[AWS, JPA], 4=[Java], 6=[Spring, Docker], 10=[Kubernetes]}
Sum: 15`
      }
    ],
    commonMistakes: [
      'Reusing a stream after a terminal operation has run (throws IllegalStateException: "stream has already been operated upon or closed").',
      'Forgetting that intermediate operations are lazy and never execute unless a terminal operation is attached.',
    ],
    interviewTips: [
      '"What is the difference between Collection and Stream?" -> Collections are in-memory data structures storing elements. Streams are computational pipelines that do not store data and process elements on demand lazily.',
    ],
    interviewQuestions: [
      { q: 'How does Stream laziness optimize performance?', a: 'Because intermediate operations are lazy, the JVM can fuse multiple operations into a single pass and perform short-circuiting (e.g. limit(1) halts traversal immediately after finding the first matching element without checking remaining items).' },
    ],
    revisionPoints: [
      'Lambdas implement single abstract method (SAM) interfaces',
      'Streams do not mutate underlying collection',
      'Intermediate = lazy (filter, map); Terminal = eager (collect, reduce)',
      'Streams cannot be reused once consumed',
    ]
  },

  // ── MODULE 22: Multithreading & Concurrency ─────────────────
  'java-multithreading': {
    intro: 'Multithreading is the simultaneous execution of two or more threads within the same process to achieve maximum CPU utilization. Java provides built-in multithreading support through java.lang.Thread, Runnable, Callable, synchronized blocks, and the java.util.concurrent (JUC) framework.',
    keyConcepts: [
      { term: 'Process vs Thread', definition: 'A process is an executing application with independent memory space. A thread is a lightweight unit of execution sharing the process\'s heap memory.', example: 'Process = App; Thread = worker' },
      { term: 'Thread Creation', definition: '1. Extend Thread class. 2. Implement Runnable (recommended for flexibility). 3. Implement Callable<V> (returns value, throws exception, used with Future).', example: 'new Thread(() -> System.out.println("Running")).start();' },
      { term: 'Synchronization', definition: 'Using the "synchronized" keyword on methods or blocks to acquire an intrinsic monitor lock on an object, ensuring only one thread enters at a time (Mutual Exclusion).', example: 'synchronized(this) { count++; }' },
      { term: 'Volatile Keyword', definition: 'Guarantees visibility: writes to a volatile variable are immediately flushed to main memory and subsequent reads see the updated value across all CPU core caches. Does NOT guarantee atomicity.', example: 'private volatile boolean running = true;' },
      { term: 'Deadlock', definition: 'Condition where two or more threads are permanently blocked, each waiting for a lock held by the other. Conditions: Mutual exclusion, Hold and wait, No preemption, Circular wait.', example: 'Thread 1 has Lock A, wants Lock B; Thread 2 has Lock B, wants Lock A' },
      { term: 'ExecutorService & ThreadPool', definition: 'Thread pool abstraction that reuses pre-spawned worker threads instead of continually creating/destroying threads.', example: 'ExecutorService pool = Executors.newFixedThreadPool(4);' },
    ],
    codeExamples: [
      {
        title: 'Thread Pool Execution with Callable and Future',
        code: `import java.util.concurrent.*;

public class ConcurrencyDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(2);

        // Submit task returning a value
        Future<Integer> future = executor.submit(() -> {
            Thread.sleep(50);
            return 42 * 2;
        });

        System.out.println("Task submitted. Doing other work...");
        Integer result = future.get(); // Blocks until result is ready
        System.out.println("Result received: " + result);

        executor.shutdown();
    }
}`,
        output: `Task submitted. Doing other work...
Result received: 84`
      }
    ],
    commonMistakes: [
      'Calling run() directly instead of start() (calling run() executes on the caller thread, not a new thread!).',
      'Assuming volatile guarantees atomic increments (count++ is 3 operations: read, modify, write; use AtomicInteger instead).',
    ],
    interviewTips: [
      '"How to avoid deadlock in Java?" -> (1) Always acquire locks in a globally consistent order across all threads, (2) Use tryLock() with timeouts from ReentrantLock, (3) Keep synchronized blocks minimal.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between Runnable and Callable in Java?', a: 'Runnable has a void run() method that cannot return a value or throw checked exceptions. Callable has a V call() method that can return a computed result and throw checked exceptions, used with ExecutorService and Future.' },
    ],
    revisionPoints: [
      'Call start(), not run(), to launch a new thread',
      'synchronized ensures mutual exclusion and visibility',
      'volatile guarantees memory visibility, not atomicity',
      'Use ExecutorService and Concurrent Collections (ConcurrentHashMap)',
    ]
  },

  // ── MODULE 23: Memory Management & JVM ─────────────────────
  'java-jvm': {
    intro: 'The JVM (Java Virtual Machine) manages memory allocation and automatic deallocation through Garbage Collection (GC). Understanding the JVM memory architecture (Stack, Heap, Metaspace) and GC algorithms is essential for tuning performance and debugging memory leaks.',
    keyConcepts: [
      { term: 'Heap Memory', definition: 'Shared runtime data area where all object instances and arrays are allocated. Divided into Young Generation (Eden + 2 Survivor spaces S0/S1) and Old (Tenured) Generation.', example: 'New objects -> Eden space' },
      { term: 'Stack Memory', definition: 'Thread-private memory. Stores stack frames containing local variables, primitive values, and object references. Deallocated automatically when methods return.', example: 'Local variables & call stack' },
      { term: 'Metaspace (Java 8+)', definition: 'Native memory area (replacing PermGen) storing loaded class metadata, bytecode, constant pool, and static variables.', example: 'Class metadata stored in native RAM' },
      { term: 'Garbage Collection (GC)', definition: 'Automatic memory management process that identifies and reclaims heap objects that are no longer reachable from any GC Root (active thread, static reference, local variable).', example: 'System.gc() requests GC (not guaranteed)' },
      { term: 'Generational GC Hypothesis', definition: 'Most objects die young. Minor GC collects Young Gen quickly. Objects surviving multiple Minor GCs are promoted to Old Gen, collected via Major/Full GC.', example: 'Eden -> Survivor -> Tenured' },
      { term: 'Memory Leak in Java', definition: 'Occurs when objects that are no longer needed remain referenced by an active GC Root (e.g. unclosed resources, static collections, listeners), preventing GC reclamation.', example: 'Static List holding obsolete references' },
    ],
    codeExamples: [
      {
        title: 'Inspecting JVM Runtime Memory Statistics',
        code: `public class JVMMemoryDemo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        long totalMemory = runtime.totalMemory() / (1024 * 1024);
        long freeMemory = runtime.freeMemory() / (1024 * 1024);

        System.out.println("Max Heap Memory: " + maxMemory + " MB");
        System.out.println("Total Allocated: " + totalMemory + " MB");
        System.out.println("Free Memory: " + freeMemory + " MB");
    }
}`,
        output: `Max Heap Memory: 4096 MB
Total Allocated: 256 MB
Free Memory: 248 MB`
      }
    ],
    commonMistakes: [
      'Assuming System.gc() immediately frees memory (it is only an advisory hint to the JVM and may be ignored).',
      'Forgetting that static variables exist for the entire lifetime of the application, leading to memory leaks if holding large object graphs.',
    ],
    interviewTips: [
      '"What are modern GC collectors in Java?" -> Serial GC, Parallel GC, G1 GC (default since Java 9, region-based with predictable pause times), and ZGC / Shenandoah (ultra-low pause time < 1ms collectors).',
    ],
    interviewQuestions: [
      { q: 'How does the JVM decide an object is eligible for Garbage Collection?', a: 'Through Reachability Analysis starting from GC Roots. If no active GC Root (such as an executing thread stack frame, a static variable, or JNI pointer) has a reference path reaching the object, it is deemed unreachable and eligible for collection.' },
    ],
    revisionPoints: [
      'Heap holds objects; Stack holds local variables & references',
      'Young Gen (Eden, S0, S1) -> Old Gen (Tenured)',
      'Java 8 Metaspace lives in native OS memory (not heap)',
      'G1 GC is default collector since Java 9',
    ]
  },

  // ── MODULE 24: File I/O & Serialization ────────────────────
  'java-io': {
    intro: 'Java I/O handles reading and writing data across files, network streams, and memory buffers. Java provides classic stream/reader I/O (java.io) and modern non-blocking NIO.2 (java.nio.file) with Path and Files utilities.',
    keyConcepts: [
      { term: 'Byte Streams vs Character Streams', definition: 'Byte streams (InputStream, OutputStream) handle raw binary data (images, PDFs, 8-bit). Character streams (Reader, Writer) handle text with Unicode encoding (16-bit).', example: 'FileInputStream vs FileReader' },
      { term: 'Buffered I/O', definition: 'Buffering reads/writes in large memory chunks rather than single bytes/characters, dramatically improving disk I/O performance.', example: 'BufferedReader / BufferedWriter' },
      { term: 'java.nio.file (NIO.2)', definition: 'Modern file utility package using Path and Files classes providing atomic operations, file tree walking, and stream integration.', example: 'Files.readAllLines(Path.of("file.txt"))' },
      { term: 'Serialization', definition: 'Converting an object\'s state into a byte stream to persist to disk or transmit over a network. Requires implementing java.io.Serializable.', example: 'implements Serializable' },
      { term: 'transient Keyword', definition: 'Marks a field so that it is skipped and not serialized during the serialization process (useful for passwords, security tokens).', example: 'private transient String password;' },
      { term: 'serialVersionUID', definition: 'A unique version identifier used during deserialization to verify that the sender and receiver of a serialized object have loaded compatible classes.', example: 'private static final long serialVersionUID = 1L;' },
    ],
    codeExamples: [
      {
        title: 'Modern File I/O with Files and Path',
        code: `import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class FileIODemo {
    public static void main(String[] args) throws IOException {
        Path tempPath = Files.createTempFile("sample", ".txt");

        // Write lines
        Files.write(tempPath, List.of("Java NIO.2", "High performance File I/O"));

        // Read lines
        List<String> lines = Files.readAllLines(tempPath);
        for (String line : lines) {
            System.out.println("Line: " + line);
        }

        // Clean up
        Files.deleteIfExists(tempPath);
    }
}`,
        output: `Line: Java NIO.2
Line: High performance File I/O`
      }
    ],
    commonMistakes: [
      'Not closing streams, resulting in locked file handles (always use try-with-resources).',
      'Forgetting serialVersionUID in Serializable classes, causing InvalidClassException when class structure changes.',
    ],
    interviewTips: [
      '"What is the transient keyword?" -> It specifies that a field should not be serialized when saving the object to a stream.',
    ],
    interviewQuestions: [
      { q: 'Why is java.nio.file.Files preferred over java.io.File in modern Java?', a: 'NIO.2 provides better error handling via explicit exceptions, supports symbolic links and file metadata attributes, performs atomic operations, and integrates seamlessly with Java 8 Streams.' },
    ],
    revisionPoints: [
      'Byte streams for binary; Character streams for text',
      'Always buffer I/O for performance (BufferedReader)',
      'NIO.2 (Path, Files) is preferred over legacy File class',
      'transient fields are omitted during serialization',
    ]
  },
};
