import { DetailedLesson } from '../../detailedLessons';

export const lesson6_4: Record<string, DetailedLesson> = {
  'stringbuilder-vs-stringbuffer': {
    id: 'stringbuilder-vs-stringbuffer',
    moduleId: 'java-strings',
    moduleTitle: '6. Strings & String Pool',
    lessonNumber: 'Lesson 6.4',
    title: 'StringBuilder vs StringBuffer & Performance',
    subtitle: 'Mutable text buffers, capacity management, method chaining, thread safety, and benchmark mechanics',
    estimatedMinutes: 16,
    beginnerAnalogy: 'Imagine you need to write an ongoing daily diary entry that updates throughout the day. Using `String` is like writing a sentence on a tiny sticky note, throwing it in the trash can, grabbing a slightly bigger sticky note, copying all previous sentences, adding the new sentence, and repeating this 10,000 times! By the end of the day, your trash can (the heap) is overflowing with thousands of discarded sticky notes, and you have spent hours copying text. `StringBuilder` is a reusable dry-erase whiteboard: you write directly on it, add words to the end, erase mistakes, or flip words in-place without generating a single scrap of trash!',
    interviewTakeaways: [
      'Mutability vs Immutability: String is immutable; StringBuilder and StringBuffer represent mutable, expandable sequences of characters that can be updated in-place without generating garbage.',
      'StringBuilder vs StringBuffer: StringBuilder (Java 5) is unsynchronized and fast, designed for single-threaded usage; StringBuffer (Java 1.0) has synchronized methods for thread safety, which introduces locking overhead.',
      'Capacity Growth Formula: When an append causes the buffer to overflow, capacity is automatically expanded via: `(oldCapacity * 2) + 2`. If that is still insufficient, it expands to the needed length.',
      'The equals() Trap: Neither StringBuilder nor StringBuffer overrides equals() from Object; calling `sb1.equals(sb2)` performs reference comparison (==), NOT character content comparison.',
      'Fluent Method Chaining: Methods like append(), insert(), delete(), and reverse() return `this` (the current builder instance), enabling concise, fluent method chaining.'
    ],
    cheatSheet: {
      summary: 'High-performance mutable text sequence classes designed to avoid the quadratic memory allocation overhead of repeated String concatenation.',
      syntaxTemplate: `// Construction (default capacity 16)
StringBuilder sb = new StringBuilder();

// Pre-sized construction (prevents re-allocation)
StringBuilder sb2 = new StringBuilder(1024);

// Fluent modification
sb.append("Score: ").append(100).append("\\n");
sb.insert(0, "[LOG] ");
sb.delete(0, 6);
sb.reverse();

// Convert to immutable String
String finalResult = sb.toString();`,
      rules: [
        { rule: 'Avoid String + in Loops', explanation: 'Never use string concatenation (+) inside loops; always use StringBuilder to avoid O(N^2) memory and time overhead.' },
        { rule: 'Pre-size Capacity When Known', explanation: 'If the approximate length is known in advance, initialize StringBuilder with `new StringBuilder(estimatedSize)` to avoid buffer resizing.' },
        { rule: 'Default Capacity is 16', explanation: '`new StringBuilder()` defaults to 16 characters. `new StringBuilder("abc")` has capacity 16 + 3 = 19.' },
        { rule: 'Never Use .equals() on Builders', explanation: 'StringBuilder does not override equals(). To compare contents, call `sb1.toString().equals(sb2.toString())` or `sb1.compareTo(sb2)` (Java 11+).' },
        { rule: 'StringBuilder is Not Thread-Safe', explanation: 'Do not share a single StringBuilder across multiple threads without external synchronization; use StringBuffer if thread safety is required.' },
        { rule: 'Capacity Expansion Formula', explanation: 'When buffer exceeds capacity, new capacity = `(oldCapacity * 2) + 2`. This amortizes resizing to O(1) time.' }
      ],
      quickComparison: [
        { aspect: 'Introduced In', optionA: 'Java 5 (Modern standard)', optionB: 'Java 1.0 (Legacy standard)' },
        { aspect: 'Thread Safety', optionA: 'Not thread-safe (Unsynchronized, single-thread)', optionB: 'Thread-safe (Synchronized methods)' },
        { aspect: 'Performance', optionA: 'Fastest (Zero lock acquisition overhead)', optionB: 'Slower due to method synchronization monitor locks' },
        { aspect: 'Time Complexity', optionA: 'append(): Amortized O(1); insert()/delete(): O(n)', optionB: 'append(): Amortized O(1) + synchronized lock wait' },
        { aspect: 'Space Complexity', optionA: 'Internal byte[] buffer sized to capacity(); O(1) aux', optionB: 'Internal byte[] buffer sized to capacity(); O(1) aux' },
        { aspect: 'equals() Implementation', optionA: 'Inherits Object.equals (reference == comparison)', optionB: 'Inherits Object.equals (reference == comparison)' },
        { aspect: 'Primary Use Case', optionA: 'Local method loops, string generation, builders', optionB: 'Multi-threaded legacy shared logging across threads' }
      ]
    },
    coreExplanation: [
      'The Performance Flaw of String Concatenation: When strings are concatenated repeatedly in a loop (`s += i;`), each iteration constructs a new String object and copies all characters from the previous iteration. For N iterations, this requires copying 1 + 2 + 3 + ... + N characters, producing O(N^2) time complexity and generating N transient garbage objects on the heap.',
      'What StringBuilder Is: Introduced in Java 5, StringBuilder is a mutable sequence of characters backed by an expandable internal array (`byte[]` in Java 9+, formerly `char[]`). It performs append, insert, and delete operations in-place without allocating intermediate String instances.',
      'What StringBuffer Is: Introduced in Java 1.0, StringBuffer provides the exact same API and functionality as StringBuilder, but almost every public method is marked with the `synchronized` keyword. While thread-safe, thread locks incur unnecessary CPU overhead in 99% of single-threaded programming scenarios.',
      'Capacity Management: A StringBuilder has two distinct metrics: `length()` (the number of characters currently stored) and `capacity()` (the total number of characters the allocated internal buffer can hold before needing to resize). The default constructor allocates an initial capacity of 16 characters.',
      'Buffer Resizing Mechanism: When an append operation exceeds the current capacity, the JVM allocates a new internal array with expanded capacity calculated as `(oldCapacity * 2) + 2`. It then copies the existing characters using `System.arraycopy`. To avoid this resizing cost, instantiate with `new StringBuilder(int initialCapacity)`.',
      'Core Mutation Operations: `append(...)` appends primitives, strings, or objects to the end; `insert(int offset, ...)` shifts characters right and inserts data; `delete(int start, int end)` removes a character slice; `deleteCharAt(int index)` deletes a single char; `reverse()` reverses all characters in place; `setCharAt(int index, char ch)` replaces a single character.',
      'Method Chaining and Fluent API: Most modifying methods in StringBuilder return `this` (the instance itself). This enables fluent method chaining: `sb.append("ID: ").append(userId).append(";");` without intermediate variable declarations.',
      'The equals() Gotcha: Neither StringBuilder nor StringBuffer overrides `equals()` or `hashCode()` from `java.lang.Object`. Consequently, `sb1.equals(sb2)` evaluates reference equality (`==`), returning false even if both builders contain identical text! Java 11 added `Comparable<StringBuilder>` so you can use `sb1.compareTo(sb2) == 0` for content comparison.'
    ],
    diagram: `+========================================================================+
|             STRING CONCATENATION vs STRINGBUILDER BUFFER               |
+========================================================================+
| 1. STRING CONCATENATION IN A LOOP (O(N^2) & HEAP CHURN):               |
|                                                                        |
|    String s = "";                                                      |
|    s += "A";  --> creates new Heap object "A"      (discarded "")      |
|    s += "B";  --> creates new Heap object "AB"     (discarded "A")     |
|    s += "C";  --> creates new Heap object "ABC"    (discarded "AB")    |
|    Result: Tons of intermediate objects allocated and left for GC!     |
+------------------------------------------------------------------------+
| 2. STRINGBUILDER IN-PLACE BUFFER (O(N) & ZERO INTERMEDIATE OBJECTS):   |
|                                                                        |
|    StringBuilder sb = new StringBuilder(16);                           |
|                                                                        |
|    Internal Array: [ _ | _ | _ | _ | _ | _ | _ | _ | ... (16) ]        |
|    Length = 0, Capacity = 16                                           |
|                                                                        |
|    sb.append("ABC");                                                   |
|    Internal Array: [ A | B | C | _ | _ | _ | _ | _ | ... (16) ]        |
|    Length = 3, Capacity = 16                                           |
|    (Same array mutated directly in place; no new objects created!)     |
+========================================================================+`,
    codeSnippet: {
      title: 'StringBuilder In-Place Mutation and Capacity Expansion',
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder(10); // initial capacity 10
        System.out.println("Init Cap: " + sb.capacity() + ", Len: " + sb.length());

        sb.append("Java");
        sb.append(" 21");
        System.out.println("After append: [" + sb.toString() + "]");

        // In-place modification
        sb.insert(4, " Edition");
        System.out.println("After insert: [" + sb.toString() + "]");

        // Reversal
        sb.reverse();
        System.out.println("After reverse: [" + sb.toString() + "]");
    }
}`,
      lineByLineExplanation: [
        { line: 'StringBuilder sb = new StringBuilder(10);', explanation: 'Allocates an internal character buffer with initial capacity 10 and length 0.' },
        { line: 'sb.append("Java").append(" 21");', explanation: 'Appends characters in-place into the existing buffer without creating any intermediate String objects.' },
        { line: 'sb.insert(4, " Edition");', explanation: 'Inserts " Edition" at index 4, shifting following characters to the right and automatically expanding capacity.' },
        { line: 'sb.reverse();', explanation: 'Inverts the entire sequence of characters directly within the internal buffer.' },
        { line: 'sb.toString();', explanation: 'Creates a single final immutable String object containing the finished character sequence.' }
      ],
      output: `Init Cap: 10, Len: 0
After append: [Java 21]
After insert: [Java Edition 21]
After reverse: [12 noitidE avaJ]`
    },
    codeExamples: [
      {
        title: 'Example 1: High-Efficiency Loop Concatenation',
        description: 'Building a formatted list of items with StringBuilder instead of the quadratic + operator.',
        code: `public class LoopConcatDemo {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        int count = 5;

        for (int i = 1; i <= count; i++) {
            builder.append("Node-").append(i);
            if (i < count) {
                builder.append(" -> ");
            }
        }

        String chain = builder.toString();
        System.out.println("Linked Chain: " + chain);
    }
}`,
        output: 'Linked Chain: Node-1 -> Node-2 -> Node-3 -> Node-4 -> Node-5'
      },
      {
        title: 'Example 2: The equals() Trap on StringBuilder',
        description: 'Demonstrating why sb1.equals(sb2) returns false even when contents are identical, and how to fix it.',
        code: `public class BuilderEqualsTrap {
    public static void main(String[] args) {
        StringBuilder sb1 = new StringBuilder("Echo");
        StringBuilder sb2 = new StringBuilder("Echo");

        // Fails! StringBuilder does NOT override Object.equals()
        System.out.println("sb1.equals(sb2): " + sb1.equals(sb2));

        // Correct comparison: convert to String first or use compareTo
        System.out.println("Content equal via toString(): " + sb1.toString().equals(sb2.toString()));
        System.out.println("Content equal via compareTo(): " + (sb1.compareTo(sb2) == 0));
    }
}`,
        output: `sb1.equals(sb2): false
Content equal via toString(): true
Content equal via compareTo(): true`
      },
      {
        title: 'Example 3: In-Place Editing with delete and replace',
        description: 'Using delete and replace to sanitize text without string allocations.',
        code: `public class InPlaceEditingDemo {
    public static void main(String[] args) {
        StringBuilder text = new StringBuilder("User: [REDACTED] logged in");

        // Replace "[REDACTED]" with "Alice" (indices 6 to 16)
        text.replace(6, 16, "Alice");
        System.out.println("After replace: " + text);

        // Delete "User: " prefix (indices 0 to 6)
        text.delete(0, 6);
        System.out.println("After delete:  " + text);
    }
}`,
        output: `After replace: User: Alice logged in
After delete:  Alice logged in`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using sb1.equals(sb2) to test if two StringBuilders have the same text.',
        whyItHappens: 'String.equals() compares text, so developers assume StringBuilder.equals() does the same. StringBuilder inherits Object.equals(), which checks memory address (==).',
        howToFix: 'Compare using sb1.toString().equals(sb2.toString()) or sb1.compareTo(sb2) == 0 (Java 11+).'
      },
      {
        mistake: 'Instantiating new StringBuilder() inside every iteration of a loop.',
        whyItHappens: 'Misunderstanding where the builder belongs. Creating a new builder on each iteration still produces new objects on each cycle.',
        howToFix: 'Instantiate the StringBuilder outside the loop and append to it across iterations.'
      },
      {
        mistake: 'Confusing length() with capacity().',
        whyItHappens: 'Assuming capacity() tells you how many characters are stored. length() is character count; capacity() is total allocated buffer size.',
        howToFix: 'Use length() to check character count, and capacity() only for low-level memory sizing.'
      },
      {
        mistake: 'Calling .toString() repeatedly inside a performance-critical loop.',
        whyItHappens: 'Calling sb.toString() creates an immutable String object each time. Doing this inside a loop destroys the performance benefit of StringBuilder.',
        howToFix: 'Perform all appends and edits in the builder, calling .toString() only once at the very end.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: StringBuilder Reference Equality Trap',
        problemStatement: 'What does this code snippet print?',
        code: `StringBuilder s1 = new StringBuilder("Alpha");
StringBuilder s2 = new StringBuilder("Alpha");
System.out.print((s1 == s2) + " " + s1.equals(s2));`,
        options: [
          'true true',
          'false false',
          'false true',
          'true false'
        ],
        correctOptionIndex: 1,
        hint: 'Does StringBuilder override Object.equals()?',
        solution: 'false false',
        explanation: 's1 and s2 are two distinct objects in memory, so s1 == s2 is false. Furthermore, StringBuilder does NOT override equals() from Object, so s1.equals(s2) also performs reference comparison (==), returning false.'
      },
      {
        title: 'Puzzle 2: Capacity Growth Calculation',
        problemStatement: 'What are the length and capacity after these statements?',
        code: `StringBuilder sb = new StringBuilder(); // default capacity 16
sb.append("01234567890123456"); // 17 characters
System.out.print(sb.length() + " " + sb.capacity());`,
        options: [
          '17 17',
          '17 32',
          '17 34',
          '16 32'
        ],
        correctOptionIndex: 2,
        hint: 'Default capacity is 16. What is the growth formula when 17 characters are appended: (oldCap * 2) + 2?',
        solution: '17 34',
        explanation: 'Appending 17 characters exceeds initial capacity 16. The new capacity is calculated as (16 * 2) + 2 = 34. The length is 17 and the capacity is 34.'
      },
      {
        title: 'Puzzle 3: Method Chaining Execution',
        problemStatement: 'What is printed after executing the chained methods?',
        code: `StringBuilder sb = new StringBuilder("A");
sb.append("B").append("C").reverse();
System.out.print(sb);`,
        options: [
          'ABC',
          'CBA',
          'A',
          'BCA'
        ],
        correctOptionIndex: 1,
        hint: 'Appends "B" then "C" to get "ABC", then reverses the entire buffer in place.',
        solution: 'CBA',
        explanation: 'The append calls construct "ABC" in the builder. The reverse() call reverses all characters in place to "CBA".'
      },
      {
        title: 'Puzzle 4: Insert and Delete Range Boundaries',
        problemStatement: 'What does this code snippet print?',
        code: `StringBuilder sb = new StringBuilder("HelloWorld");
sb.insert(5, " ");
sb.delete(0, 6);
System.out.print(sb);`,
        options: [
          'World',
          ' World',
          'Hello',
          'rld'
        ],
        correctOptionIndex: 0,
        hint: 'sb.insert(5, " ") produces "Hello World". What does delete(0, 6) remove?',
        solution: 'World',
        explanation: 'After insert(5, " "), the string is "Hello World". delete(0, 6) removes characters from index 0 up to index 5 (6 is exclusive), which removes "Hello ". The remaining text is "World".'
      },
      {
        title: 'Puzzle 5: Initial Capacity with String Constructor',
        problemStatement: 'What is the initial capacity of: StringBuilder sb = new StringBuilder("Java");?',
        options: [
          '4',
          '16',
          '20',
          '32'
        ],
        correctOptionIndex: 2,
        hint: 'When initialized with a String of length L, capacity is 16 + L.',
        solution: '20',
        explanation: 'The constructor `new StringBuilder(String str)` allocates a buffer with capacity equal to str.length() + 16. For "Java", 4 + 16 = 20.'
      },
      {
        title: 'Puzzle 6: deleteCharAt in a Loop Trap',
        problemStatement: 'What is printed after executing this deletion?',
        code: `StringBuilder sb = new StringBuilder("abcdef");
sb.deleteCharAt(1);
sb.deleteCharAt(1);
System.out.print(sb);`,
        options: [
          'acdef',
          'adef',
          'abdef',
          'cdef'
        ],
        correctOptionIndex: 1,
        hint: 'Deleting at index 1 shifts all subsequent characters to the left!',
        solution: 'adef',
        explanation: 'Initially: "abcdef". deleteCharAt(1) removes \'b\', leaving "acdef". Next, deleteCharAt(1) removes \'c\' (which shifted into index 1), leaving "adef".'
      },
      {
        title: 'Puzzle 7: setLength Truncation',
        problemStatement: 'What does setLength(4) do to a StringBuilder containing "Supercomputer"?',
        code: `StringBuilder sb = new StringBuilder("Supercomputer");
sb.setLength(5);
System.out.print(sb);`,
        options: [
          'Super',
          'Supercomputer',
          'computer',
          'Throws IndexOutOfBoundsException'
        ],
        correctOptionIndex: 0,
        hint: 'setLength(newLength) truncates the character sequence if newLength < current length.',
        solution: 'Super',
        explanation: 'Calling setLength(5) truncates the builder to the first 5 characters [0..4], producing "Super".'
      },
      {
        title: 'Puzzle 8: Pre-Sized Buffer Expansion Check',
        problemStatement: 'What is the capacity after appending 10 characters to a builder constructed with: new StringBuilder(50)?',
        options: [
          '10',
          '50',
          '66',
          '102'
        ],
        correctOptionIndex: 1,
        hint: 'Does appending 10 characters exceed an initial capacity of 50?',
        solution: '50',
        explanation: 'Because 10 characters easily fit inside the pre-allocated capacity of 50, no expansion occurs. The capacity remains 50.'
      },
      {
        title: 'Puzzle 9: Equals on Distinct StringBuilders',
        problemStatement: 'Trace the output printed to the console:',
        code: `StringBuilder sb1 = new StringBuilder("Alpha");
StringBuilder sb2 = new StringBuilder("Alpha");
System.out.println((sb1.equals(sb2)) + " " + (sb1.toString().equals(sb2.toString())));`,
        options: [
          'false true',
          'true true',
          'false false',
          'true false'
        ],
        correctOptionIndex: 0,
        hint: 'Does StringBuilder override equals() from java.lang.Object?',
        solution: 'false true',
        explanation: 'StringBuilder inherits Object.equals(), which tests reference equality (==). Because sb1 and sb2 are two distinct instances in heap memory, sb1.equals(sb2) is false. Calling toString() produces String objects that override equals() to compare character values, returning true.'
      },
      {
        title: 'Puzzle 10: Automatic Capacity Expansion Formula',
        problemStatement: 'What are the length and capacity printed by this snippet?',
        code: `StringBuilder sb = new StringBuilder();
sb.append("0123456789abcdefg");
System.out.println(sb.length() + " " + sb.capacity());`,
        options: [
          '17 34',
          '17 17',
          '17 32',
          '17 16'
        ],
        correctOptionIndex: 0,
        hint: 'Default capacity is 16. Appending 17 characters triggers the expansion formula: (oldCapacity * 2) + 2.',
        solution: '17 34',
        explanation: 'The default initial capacity is 16. Appending 17 characters exceeds 16, triggering capacity expansion to (16 * 2) + 2 = 34. The length is 17 and the newly allocated capacity is 34. Output: "17 34".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Compare String, StringBuilder, and StringBuffer across mutability, thread safety, and performance.',
        answer: 'String is immutable and inherently thread-safe; however, string concatenations create new objects, making repeated modifications O(N^2) slow. StringBuilder (Java 5) is mutable and unsynchronized; it modifies character buffers in-place with O(1) amortized appends and no locking overhead, making it the fastest choice for single-threaded operations. StringBuffer (Java 1.0) is also mutable, but every public method is synchronized, providing thread safety at the cost of synchronization lock overhead. In modern Java, StringBuilder is preferred in >99% of use cases because string manipulation is almost always thread-confined to a single method or stack frame.',
        followUp: 'When would you still legitimately choose StringBuffer over StringBuilder today?',
        followUpAnswer: 'Only in legacy codebases or when a single shared mutable buffer is accessed and modified concurrently by multiple worker threads without external synchronization locks (e.g., a shared asynchronous logging buffer). In modern designs, concurrent queues or thread-local builders are preferred.',
        keyPhrases: ['Immutable vs Mutable', 'Unsynchronized vs Synchronized', 'O(1) amortized append', 'Thread-confinement to stack frame', 'Synchronization overhead'],
        commonMistakeAnswer: 'Saying StringBuffer is faster than StringBuilder, or that StringBuilder is thread-safe.'
      },
      {
        question: 'Why does StringBuilder not override equals() and hashCode()?',
        answer: 'In Java, equals() and hashCode() define value identity. In data structures like HashMap or HashSet, an object\'s equals() and hashCode() MUST remain constant while stored as a key. If StringBuilder implemented equals() based on its current character content, mutating the builder (e.g., sb.append("x")) would alter its hash code and equality while inside a set or map, hopelessly corrupting the bucket lookup. The Java designers deliberately left equals() to check reference identity (==) to discourage using mutable builders as map keys.',
        followUp: 'How can you compare the contents of two StringBuilder instances?',
        followUpAnswer: 'You can convert both to String via `.toString().equals(...)`, or starting in Java 11, use `sb1.compareTo(sb2) == 0` since StringBuilder implements `Comparable<StringBuilder>`.',
        keyPhrases: ['Mutable hash corruption in HashMaps', 'Object.equals() identity inheritance', 'sb.compareTo(sb2) in Java 11', 'sb.toString().equals()'],
        commonMistakeAnswer: 'Assuming StringBuilder simply forgot to implement equals() by accident.'
      },
      {
        question: 'Explain the capacity expansion algorithm of StringBuilder in detail.',
        answer: 'When an append operation causes the required character count to exceed the current capacity, StringBuilder invokes `grow(int minCapacity)`. The default growth formula computes `newCapacity = (oldCapacity * 2) + 2`. If `newCapacity` is still smaller than `minCapacity`, `newCapacity` is set to `minCapacity`. If the requested size exceeds Integer.MAX_VALUE - 8, it throws OutOfMemoryError. Once the new size is determined, a new byte array is allocated and existing bytes are transferred via `System.arraycopy`.',
        followUp: 'Why is the formula (oldCapacity * 2) + 2 rather than simply oldCapacity * 2?',
        followUpAnswer: 'The "+ 2" ensures that even if a StringBuilder was initialized with an initial capacity of 0 (`new StringBuilder(0)`), multiplying 0 * 2 would still be 0! The "+ 2" guarantees that the capacity grows to at least 2 and then expands exponentially.',
        keyPhrases: ['(oldCapacity * 2) + 2 formula', 'System.arraycopy buffer copy', 'Zero capacity guard (+2)', 'Amortized O(1) complexity'],
        commonMistakeAnswer: 'Saying the capacity just grows by 1 character or doubles exactly without the + 2.'
      },
      {
        question: 'What is the performance benefit of pre-sizing a StringBuilder with an explicit capacity?',
        answer: 'When a StringBuilder is created with the default constructor `new StringBuilder()`, its capacity is only 16. If you append 1,000 characters, the buffer will exceed capacity and trigger resizings at 16 -> 34 -> 70 -> 142 -> 286 -> 574 -> 1150. Each resize allocates a new byte array and executes System.arraycopy to copy all existing characters, generating 6 discarded intermediate byte arrays for the garbage collector. By constructing `new StringBuilder(1024)`, zero resizings and zero array copies occur.',
        followUp: 'How do you determine what initial capacity to specify?',
        followUpAnswer: 'Estimate the maximum anticipated character length based on domain knowledge (e.g., 50 fields * average 20 chars per field = ~1000 chars) and round up slightly.',
        keyPhrases: ['Default capacity 16', 'Repeated buffer reallocations', 'System.arraycopy overhead', 'Garbage collection allocation churn', 'Pre-sizing optimization'],
        commonMistakeAnswer: 'Thinking that specifying initial capacity limits the builder to that size and prevents adding more characters.'
      },
      {
        question: 'How does method chaining work in StringBuilder, and what design pattern does it implement?',
        answer: 'Method chaining in StringBuilder works because mutating methods like append(), insert(), delete(), and reverse() return `this` (the reference to the exact same StringBuilder instance). This implements the Builder design pattern and fluent interface idiom. Because each method returns `this`, the caller can immediately invoke the next method on the returned reference without saving it into local variables, writing clean chains like `sb.append(a).append(b).reverse();`.',
        followUp: 'Does method chaining create new objects on each chained call?',
        followUpAnswer: 'No! Unlike String methods (which return new String objects), StringBuilder methods return `return this;`, meaning zero new objects are created during the chained method calls.',
        keyPhrases: ['return this', 'Fluent interface idiom', 'Builder design pattern', 'Zero object allocations during chaining'],
        commonMistakeAnswer: 'Assuming each .append() returns a new StringBuilder object.'
      },
      {
        question: 'What happens to the internal buffer when you call sb.setLength(0)?',
        answer: 'Calling `sb.setLength(0)` resets the logical `count` (length) of the builder to 0 without deallocating or shrinking the underlying character/byte array. The capacity remains unchanged. This allows developers to reuse the exact same StringBuilder instance in high-throughput loops without having to allocate a new builder on each iteration.',
        followUp: 'Is reusing a StringBuilder via setLength(0) always better than creating a new StringBuilder?',
        followUpAnswer: 'In modern HotSpot JVMs, escape analysis and TLAB (Thread Local Allocation Buffer) make allocating small, short-lived builders in local method scopes extremely cheap. Reusing a builder that grew to a massive size (e.g. 5MB) keeps a 5MB array pinned in memory, which can waste heap space compared to letting it be collected.',
        keyPhrases: ['Logical length reset to 0', 'Retained capacity buffer', 'Escape analysis optimization', 'TLAB allocation', 'Memory retention risk'],
        commonMistakeAnswer: 'Thinking setLength(0) shrinks the capacity or deletes the internal array.'
      },
      {
        question: 'How did Java 9 Compact Strings impact StringBuilder and StringBuffer?',
        answer: 'Prior to Java 9, StringBuilder and StringBuffer inherited their implementation from AbstractStringBuilder, which stored characters in a `char[] value` (2 bytes per character). In Java 9, JEP 254 updated AbstractStringBuilder to use `byte[] value` paired with a `byte coder` flag (0 for Latin-1, 1 for UTF-16). If all appended characters are Latin-1, the buffer consumes half the memory. If a UTF-16 character is appended, the buffer inflates its byte array to UTF-16 encoding.',
        followUp: 'What is the inflation process when a UTF-16 character is appended to a Latin-1 builder?',
        followUpAnswer: 'The builder doubles the size of its internal byte array, re-encodes all existing Latin-1 bytes into 2-byte UTF-16 representations, sets the coder to UTF-16 (1), and appends the new character.',
        keyPhrases: ['AbstractStringBuilder refactor', 'byte[] value with coder', 'Latin-1 compaction', 'Buffer inflation to UTF-16'],
        commonMistakeAnswer: 'Thinking StringBuilder still uses char[] in modern Java.'
      },
      {
        question: 'What is the difference between delete(int start, int end) and deleteCharAt(int index)?',
        answer: '`delete(int start, int end)` removes a range of characters from index `start` (inclusive) to `end` (exclusive), shifting remaining characters to the left by `(end - start)` positions. `deleteCharAt(int index)` is a convenience method that deletes exactly one character at `index`, equivalent to calling `delete(index, index + 1)`. Both throw `StringIndexOutOfBoundsException` if indices are invalid.',
        followUp: 'Why is deleting characters in a forward loop dangerous when using deleteCharAt()?',
        followUpAnswer: 'Because every deletion shifts all remaining characters to the left, changing their indices. If you loop `i` forward, deleting index `i` skips the character that immediately shifted into index `i`. Deletions should be performed by iterating backward from `length() - 1` down to 0.',
        keyPhrases: ['Half-open range [start, end)', 'deleteCharAt equivalence', 'Left shift of characters', 'Backward loop iteration for deletions'],
        commonMistakeAnswer: 'Looping forward with deleteCharAt(i) and wondering why alternate characters are skipped.'
      },
      {
        question: 'How does the Java compiler optimize simple String concatenations outside of loops?',
        answer: 'For simple concatenations outside loops (e.g. `String s = "Hello, " + name + "! Welcome to " + app;`), javac does NOT require the developer to manually write a StringBuilder. Prior to Java 9, javac automatically translated such expressions into a single `new StringBuilder().append(...)...toString()` chain. In Java 9+, javac compiles it into an `invokedynamic` call to `StringConcatFactory.makeConcatWithConstants`, allowing runtime optimizations that pre-calculate the exact buffer size and avoid intermediate allocations entirely.',
        followUp: 'Why does this compiler optimization NOT work well inside loops?',
        followUpAnswer: 'Because the compiler only optimizes single expressions. In a loop `for (...) { s += item; }`, the compiler creates a brand-new StringBuilder (or invokedynamic call) on EVERY iteration of the loop, resulting in N builders and O(N^2) copying.',
        keyPhrases: ['Automatic compiler desugaring', 'invokedynamic StringConcatFactory', 'Single expression vs loop boundary', 'O(N^2) loop trap'],
        commonMistakeAnswer: 'Thinking manual StringBuilder is required for even simple one-line string concatenations.'
      },
      {
        question: 'What does trimToSize() do on a StringBuilder?',
        answer: 'The `trimToSize()` method attempts to minimize storage by reducing the capacity of the internal buffer to match its current `length()`. If `capacity() > length()`, a new array sized exactly to `length()` is allocated and the characters are copied into it. It is useful when a large temporary buffer was used to build text, and the builder itself will be retained in memory for an extended period.',
        followUp: 'Should you call trimToSize() right before calling toString()?',
        followUpAnswer: 'No, because toString() already creates an immutable String sized exactly to the content length. Calling trimToSize() before toString() simply forces an extra array allocation and copy for no reason.',
        keyPhrases: ['Capacity compaction', 'Matching capacity to length', 'Unnecessary before toString()', 'Long-lived builder memory optimization'],
        commonMistakeAnswer: 'Thinking trimToSize() trims whitespace like String.trim().'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the default initial capacity of a StringBuilder created via new StringBuilder()?',
        options: [
          '0',
          '10',
          '16',
          '32'
        ],
        correctIndex: 2,
        explanation: 'The no-argument constructor new StringBuilder() initializes an internal buffer with a default capacity of 16 characters.'
      },
      {
        question: 'What is the primary difference between StringBuilder and StringBuffer?',
        options: [
          'StringBuilder is mutable while StringBuffer is immutable',
          'StringBuilder is unsynchronized (faster); StringBuffer is synchronized (thread-safe)',
          'StringBuffer can only hold ASCII characters',
          'StringBuilder has no append() method'
        ],
        correctIndex: 1,
        explanation: 'StringBuffer has synchronized methods for thread safety, whereas StringBuilder is unsynchronized and faster for single-threaded usage.'
      },
      {
        question: 'What does sb1.equals(sb2) evaluate to if both are StringBuilders containing "Hello"?',
        options: [
          'true because the contents are identical',
          'false because StringBuilder inherits reference equality (==) from Object',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctIndex: 1,
        explanation: 'StringBuilder does not override Object.equals(), so equals() compares memory addresses. Two distinct builder instances will always return false.'
      },
      {
        question: 'What is the new capacity when a StringBuilder with capacity 10 exceeds its buffer?',
        options: [
          '20',
          '22',
          '11',
          '25'
        ],
        correctIndex: 1,
        explanation: 'The capacity expansion formula is (oldCapacity * 2) + 2. For 10: (10 * 2) + 2 = 22.'
      },
      {
        question: 'What is returned by sb.append("text")?',
        options: [
          'void',
          'A new String object',
          'The same StringBuilder instance (this)',
          'An int representing new length'
        ],
        correctIndex: 2,
        explanation: 'append() returns "this" (the reference to the builder itself) to support method chaining.'
      },
      {
        question: 'What does sb.reverse() do on new StringBuilder("Java")?',
        options: [
          'Returns a reversed String without modifying sb',
          'Reverses the characters in place to "avaJ" inside sb',
          'Throws an exception because StringBuilder is append-only',
          'Sorts the characters alphabetically'
        ],
        correctIndex: 1,
        explanation: 'reverse() flips the sequence of characters directly in place within the internal buffer.'
      },
      {
        question: 'Why is String concatenation with + inefficient inside a loop?',
        options: [
          'Because + is not supported inside loops in Java',
          'Because each iteration creates a new String object and copies previous characters, yielding O(N^2) complexity',
          'Because the compiler throws an OutOfMemoryError immediately',
          'Because loops convert strings to integers'
        ],
        correctIndex: 1,
        explanation: 'String immutability forces each + in a loop to allocate a new String and copy all existing characters, leading to quadratic time and memory churn.'
      },
      {
        question: 'What does sb.delete(1, 3) remove from new StringBuilder("abcdef")?',
        options: [
          'Indices 1, 2, and 3',
          'Indices 1 and 2 (characters \'b\' and \'c\')',
          'Characters at index 1 and 3 only',
          'The first 3 characters'
        ],
        correctIndex: 1,
        explanation: 'delete(start, end) operates on the half-open interval [start, end), removing characters at index 1 and index 2 (\'b\' and \'c\'), leaving "adef".'
      },
      {
        question: 'How do you check if two StringBuilder objects contain the same text without creating Strings in Java 11+?',
        options: [
          'sb1 == sb2',
          'sb1.equals(sb2)',
          'sb1.compareTo(sb2) == 0',
          'sb1.contentEquals(sb2)'
        ],
        correctIndex: 2,
        explanation: 'In Java 11+, StringBuilder implements Comparable<StringBuilder>, allowing sb1.compareTo(sb2) == 0 to check content equality without string allocation.'
      },
      {
        question: 'What does sb.setLength(0) do?',
        options: [
          'Deallocates the internal buffer and resets capacity to 0',
          'Resets the character count to 0 while keeping the allocated capacity intact',
          'Fills the buffer with null characters',
          'Throws an IllegalArgumentException'
        ],
        correctIndex: 1,
        explanation: 'setLength(0) clears the logical character count to 0, allowing buffer reuse without reallocating memory.'
      }
    ]
  }
};
