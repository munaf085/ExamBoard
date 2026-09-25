import { DetailedLesson } from '../../detailedLessons';

export const lesson6_1: Record<string, DetailedLesson> = {
  'string-immutability-and-memory': {
    id: 'string-immutability-and-memory',
    moduleId: 'java-strings',
    moduleTitle: '6. Strings & String Pool',
    lessonNumber: 'Lesson 6.1',
    title: 'String Immutability & Memory Internals',
    subtitle: 'The String Constant Pool (SCP), heap mechanics, value immutability, literal vs new String(), and intern()',
    estimatedMinutes: 16,
    beginnerAnalogy: 'Think of a hardcover book in a city library. Once printed and bound with an ISBN, nobody is allowed to take a pen and change words on page 50. If the author wants to update the story, the publisher must print an entirely brand-new physical edition at a separate shelf location. In Java, Strings are immutable hardcover editions. Furthermore, the library keeps a special curated showcase called the "String Constant Pool". When 500 readers ask for "Hello World", the librarian hands all 500 readers a reference badge pointing to the exact same physical copy in the showcase, saving enormous amounts of shelf space!',
    interviewTakeaways: [
      'Immutability Guarantee: Once a String object is created in Java, its character sequence and internal array cannot be changed; every string manipulation method returns a new String object.',
      'String Constant Pool (SCP): A specialized cache region inside the Java Heap managed by the JVM to store unique string literals and avoid duplicate memory allocation.',
      'Literal vs new String(): Literal syntax ("abc") searches the SCP and reuses existing instances; "new String(\\"abc\\")" forces allocation of a distinct object in the general heap while ensuring the literal is also in SCP.',
      'The intern() Method: Calling s.intern() queries the SCP: if a string with identical content exists, its pool reference is returned; otherwise, the string is added to the pool and returned.',
      'Rationale for Immutability: Guarantees security (file paths, sockets, DB URLs), thread safety without synchronization, reliable caching (like precomputed hashCode), and pool sharing.'
    ],
    cheatSheet: {
      summary: 'Strings in Java are immutable reference types backed by an internal byte array, cached via the String Constant Pool to optimize memory.',
      syntaxTemplate: `// String literal (re-uses instance from SCP)
String s1 = "Java";

// Heap object creation (creates new object in Heap, guarantees "Java" in SCP)
String s2 = new String("Java");

// Manual pool lookup / registration
String s3 = s2.intern(); // s3 == s1 is true!`,
      rules: [
        { rule: 'Immutability Rule', explanation: 'No method in java.lang.String modifies the underlying string; all transformative methods return a newly created String.' },
        { rule: 'SCP Location', explanation: 'Since Java 7, the String Constant Pool resides inside the main Java Heap (moved out of PermGen), allowing pool strings to be garbage collected when unreferenced.' },
        { rule: 'Literal Deduplication', explanation: 'All identical string literals occurring anywhere in the application share the same single instance in the SCP.' },
        { rule: 'The new String() Trap', explanation: 'new String("text") creates two objects if "text" is not yet in SCP: one literal in SCP, and one separate object in general heap memory.' },
        { rule: 'Reassignment vs Mutation', explanation: 'Changing a String variable (s = s + "!") only points the reference variable to a new heap object; the original object remains untouched.' },
        { rule: 'Hash Code Caching', explanation: 'Because strings cannot change, the hash code is calculated lazily once and cached in an internal field (hash), making Strings ideal HashMap keys.' }
      ],
      quickComparison: [
        { aspect: 'Memory Location', optionA: 'Literal ("abc"): Stored in String Constant Pool (SCP)', optionB: 'new String("abc"): Stored in standard Heap memory' },
        { aspect: 'Duplicate Handling', optionA: 'Literal: Automatically deduplicated; reuses existing pool reference', optionB: 'new String(): Bypasses pool reuse; allocates new heap object every time' },
        { aspect: 'Equality with ==', optionA: 's1 == s2 for identical literals: true', optionB: 's1 == new String(s1): false (distinct memory addresses)' },
        { aspect: 'Performance', optionA: 'Literal: Zero allocation overhead if literal already exists in SCP', optionB: 'new String(): Heap allocation and garbage collection overhead' },
        { aspect: 'Best Practice', optionA: 'Literal: Standard idiomatic Java; always preferred', optionB: 'new String(): Anti-pattern; avoid unless explicit separate identity is required' }
      ]
    },
    coreExplanation: [
      'In Java, java.lang.String is an immutable class. Once an instance is constructed on the heap, the sequence of characters it encapsulates cannot be altered, extended, or shrunk by any public API.',
      'The String Constant Pool (SCP) is a dedicated hash table structure residing within the Java Heap. Its purpose is literal deduplication: whenever the JVM encounters a string literal like "Alpha", it checks if an equal string already exists in the pool. If so, it returns the existing reference, saving memory.',
      'Creating strings via literals vs new: Writing `String s = "apple"` checks the SCP and assigns the pooled address. Writing `String s = new String("apple")` explicitly instructs the JVM to construct a brand-new String object in the general heap, pointing to its own memory space even if "apple" already exists in the pool.',
      'The intern() method provides programmatic access to the SCP. Calling `str.intern()` instructs the JVM to search the SCP for a string equal to `str`. If found, it returns the pooled reference. If not found, it adds `str` to the pool and returns its reference.',
      'Why Strings are Immutable: (1) Security: Strings represent database credentials, network connection strings, and file paths. If mutable, a malicious thread could alter a filename after security validation. (2) String Pool Caching: If strings were mutable, altering a string via one reference would corrupt the value for all other variables sharing that pooled instance.',
      'Further Immutability Benefits: (3) Thread Safety: Immutable objects are inherently thread-safe without locks or synchronization. (4) Hash Code Caching: The hashCode of a String is computed once upon first request and cached forever in a private `hash` field, making String lookups in hash-based structures extremely fast.',
      'Internal Representation: In modern Java (Java 9+), String is implemented using Compact Strings (`byte[] value` paired with an encoding flag `byte coder`). Latin-1 characters require only 1 byte per char instead of UTF-16\'s 2 bytes, reducing string memory footprint by up to 50% across typical enterprise heaps.',
      'Reassignment vs Mutation: Writing `String msg = "Hello"; msg = msg + " World";` does not modify "Hello". It creates a new String object "Hello World" on the heap and updates the local variable `msg` to point to the new address. The original "Hello" remains in the SCP.'
    ],
    diagram: `+========================================================================+
|                              JAVA MEMORY                               |
+========================================================================+
|  STACK FRAME                           HEAP MEMORY                     |
|                                                                        |
|  [ s1 ] ---------------\\         +----------------------------------+  |
|                        \\        |     STRING CONSTANT POOL (SCP)   |  |
|  [ s2 ] ----------------+-----> |  +----------------------------+  |  |
|                                 |  | "Java" (Address: 0x1001)    |  |  |
|  [ s4 (interned) ] ----/        |  +----------------------------+  |  |
|                                 +----------------------------------+  |
|                                                                        |
|                                 +----------------------------------+  |
|  [ s3 ] ----------------------> | GENERAL HEAP OBJECT              |  |
|  (new String)                   |  Address: 0x5008                 |  |
|                                 |  Internal value -> "Java"        |  |
|                                 +----------------------------------+  |
+========================================================================+
| Comparison Summary:                                                    |
|   s1 == s2  -> true  (Both reference 0x1001 in SCP)                    |
|   s1 == s3  -> false (0x1001 != 0x5008; s3 is a distinct heap object)  |
|   s1 == s4  -> true  (s3.intern() returned canonical SCP 0x1001)       |
|   s1.equals(s3) -> true (Characters are both "Java")                   |
+========================================================================+`,
    codeSnippet: {
      title: 'String Immutability and Reference Mechanics',
      code: `public class ImmutabilityDemo {
    public static void main(String[] args) {
        String original = "Immutable";
        
        // Calling concat without capturing the return value
        original.concat(" Text");
        System.out.println("After concat without assignment: " + original);
        
        // Reassignment captures the new object reference
        original = original.concat(" Text");
        System.out.println("After reassignment: " + original);
    }
}`,
      lineByLineExplanation: [
        { line: 'String original = "Immutable";', explanation: 'Creates or finds the literal "Immutable" in the SCP and assigns its reference to variable original.' },
        { line: 'original.concat(" Text");', explanation: 'Allocates a new String "Immutable Text" on the heap and returns it, but the return value is discarded.' },
        { line: 'System.out.println(... + original);', explanation: 'Prints "Immutable" because the original object referenced by original was never modified.' },
        { line: 'original = original.concat(" Text");', explanation: 'Creates a new String "Immutable Text" and reassigns the variable original to point to this new object.' },
        { line: 'System.out.println(... + original);', explanation: 'Prints "Immutable Text" showing that the reference variable now points to the new heap object.' }
      ],
      output: `After concat without assignment: Immutable
After reassignment: Immutable Text`
    },
    codeExamples: [
      {
        title: 'Example 1: Literal Pooling vs Explicit Heap Allocation',
        description: 'Demonstrating how string literals share memory addresses in the SCP while new String() forces separate heap instances.',
        code: `public class PoolVsHeapDemo {
    public static void main(String[] args) {
        String a = "Bytecode";
        String b = "Bytecode";
        String c = new String("Bytecode");

        System.out.println("a == b (both from SCP): " + (a == b));
        System.out.println("a == c (SCP vs Heap):   " + (a == c));
        System.out.println("a.equals(c) (content):  " + a.equals(c));
    }
}`,
        output: `a == b (both from SCP): true
a == c (SCP vs Heap):   false
a.equals(c) (content):  true`
      },
      {
        title: 'Example 2: Programmatic Interning with intern()',
        description: 'Using intern() to fetch the canonical pool reference for a dynamic heap string.',
        code: `public class InterningDemo {
    public static void main(String[] args) {
        String heapStr = new String("Architecture");
        String poolStr = "Architecture";

        // intern() returns the SCP reference
        String internedStr = heapStr.intern();

        System.out.println("heapStr == poolStr:     " + (heapStr == poolStr));
        System.out.println("internedStr == poolStr: " + (internedStr == poolStr));
    }
}`,
        output: `heapStr == poolStr:     false
internedStr == poolStr: true`
      },
      {
        title: 'Example 3: Reassignment Creating Abandoned Objects',
        description: 'Tracking how successive string concatenation generates intermediate objects.',
        code: `public class ReassignmentDemo {
    public static void main(String[] args) {
        String token = "A";
        token = token + "B"; // creates "AB"
        token = token + "C"; // creates "ABC"
        token = token + "D"; // creates "ABCD"

        System.out.println("Final token: " + token);
    }
}`,
        output: 'Final token: ABCD'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming methods like toUpperCase() or replace() modify the original String in place.',
        whyItHappens: 'In languages like C or Python lists, some methods modify data in-place. Beginners write "s.toUpperCase();" and expect "s" to become uppercase.',
        howToFix: 'Always capture the return value: write "s = s.toUpperCase();" to assign the reference of the newly created String.'
      },
      {
        mistake: 'Using new String("literal") in normal application code.',
        whyItHappens: 'Beginners learn that objects are created with "new" and assume String must also be created with new.',
        howToFix: 'Always write string literals directly: "String s = \\"text\\";". Avoid "new String()" because it wastes heap memory with duplicate wrappers.'
      },
      {
        mistake: 'Believing that reassigning a variable modifies the string object.',
        whyItHappens: 'Confusing the reference variable (the pointer on the stack) with the object payload (bytes on the heap).',
        howToFix: 'Understand that variables are merely remote controls pointing to objects. Reassignment points the remote control to a different TV; it does not change the broadcast of the first TV.'
      },
      {
        mistake: 'Concatenating strings inside heavy loops using the + operator.',
        whyItHappens: 'The + operator looks clean and simple, but in loops it repeatedly allocates new String instances and copies characters O(N^2).',
        howToFix: 'Use StringBuilder or StringBuffer when appending strings inside loops.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Unassigned Concat Behavior',
        problemStatement: 'What does this code snippet print to standard output?',
        code: `String s = "Core";
s.concat("Java");
System.out.print(s);`,
        options: [
          'CoreJava',
          'Core',
          'Java',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Does concat() modify the calling String, or does it return a new String?',
        solution: 'Core',
        explanation: 'Because Strings are immutable, s.concat("Java") produces a new String "CoreJava", but since its return value is never assigned back to s, s continues to reference "Core".'
      },
      {
        title: 'Puzzle 2: Literal Reference Comparison',
        problemStatement: 'What is printed after executing the following statements?',
        code: `String s1 = "JVM";
String s2 = "JVM";
String s3 = new String("JVM");
System.out.print((s1 == s2) + " " + (s1 == s3));`,
        options: [
          'true true',
          'true false',
          'false false',
          'false true'
        ],
        correctOptionIndex: 1,
        hint: 'Do identical literals share the same SCP reference? Does new String() create a new heap object?',
        solution: 'true false',
        explanation: 's1 and s2 both point to the canonical "JVM" object in the String Constant Pool, so s1 == s2 is true. s3 references a separate object allocated in the heap, so s1 == s3 is false.'
      },
      {
        title: 'Puzzle 3: The intern() Method on Heap Strings',
        problemStatement: 'What will be printed to the console?',
        code: `String a = new String("Spring");
String b = a.intern();
String c = "Spring";
System.out.print((a == b) + " " + (b == c));`,
        options: [
          'true true',
          'false true',
          'false false',
          'true false'
        ],
        correctOptionIndex: 1,
        hint: 'What does a.intern() return? Does it return a or the pool reference?',
        solution: 'false true',
        explanation: 'a is a heap object, while b is the reference returned by a.intern(), which fetches the entry from the SCP. c is a literal pointing directly to the SCP. Hence, a == b is false, but b == c is true.'
      },
      {
        title: 'Puzzle 4: Reassignment Tracking',
        problemStatement: 'What is the final output of this sequence?',
        code: `String x = "A";
String y = x;
x = x + "B";
System.out.print(x + "-" + y);`,
        options: [
          'AB-AB',
          'AB-A',
          'A-A',
          'A-AB'
        ],
        correctOptionIndex: 1,
        hint: 'When x is reassigned to x + "B", does y change?',
        solution: 'AB-A',
        explanation: 'y points to the original "A" object. When x = x + "B" executes, a new String "AB" is created and assigned to x. The variable y still points to "A". Therefore, x + "-" + y prints "AB-A".'
      },
      {
        title: 'Puzzle 5: Object Count from new String()',
        problemStatement: 'Assuming the pool is empty initially, how many total String objects are created by: String s = new String("Data");?',
        options: [
          '1 object',
          '2 objects',
          '0 objects',
          '3 objects'
        ],
        correctOptionIndex: 1,
        hint: 'Consider the literal argument inside the parentheses and the new operator.',
        solution: '2 objects',
        explanation: 'First, the literal "Data" creates an object in the String Constant Pool (if not already present). Second, the new operator constructs a distinct String object in the general heap memory. Thus, 2 objects are created.'
      },
      {
        title: 'Puzzle 6: Chained String Methods Without Capture',
        problemStatement: 'What is printed by this code?',
        code: `String title = " developer ";
title.trim();
title.toUpperCase();
System.out.print("[" + title + "]");`,
        options: [
          '[DEVELOPER]',
          '[developer]',
          '[ developer ]',
          '[DEVELOPER ]'
        ],
        correctOptionIndex: 2,
        hint: 'Were any of the method call results assigned back to title?',
        solution: '[ developer ]',
        explanation: 'Neither trim() nor toUpperCase() alters title in place. Because neither return value was stored, title still points to the original string " developer ".'
      },
      {
        title: 'Puzzle 7: Multiple Reassignments in a Loop',
        problemStatement: 'What does this loop print?',
        code: `String num = "0";
for (int i = 1; i <= 3; i++) {
    num = num + i;
}
System.out.print(num);`,
        options: [
          '0123',
          '0',
          '6',
          '3'
        ],
        correctOptionIndex: 0,
        hint: 'String concatenation in a loop accumulates characters into newly created strings.',
        solution: '0123',
        explanation: 'Iteration 1: num becomes "01". Iteration 2: num becomes "012". Iteration 3: num becomes "0123". The final value printed is "0123".'
      },
      {
        title: 'Puzzle 8: Equality of Interned Heap vs Literal',
        problemStatement: 'Trace the output of this code snippet:',
        code: `String p1 = new String("KAFKA");
String p2 = new String("KAFKA");
System.out.print((p1.intern() == p2.intern()) + " " + (p1 == p2));`,
        options: [
          'true true',
          'false false',
          'true false',
          'false true'
        ],
        correctOptionIndex: 2,
        hint: 'Does p1.intern() return the same SCP reference as p2.intern()?',
        solution: 'true false',
        explanation: 'p1 and p2 are two distinct objects on the heap, so p1 == p2 is false. However, both p1.intern() and p2.intern() look up "KAFKA" in the String Constant Pool and return the exact same canonical reference, making p1.intern() == p2.intern() true.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why are Strings immutable in Java? Explain the key architectural reasons.',
        answer: 'Strings are immutable in Java for four primary reasons: First, Security: Strings are extensively used as parameters for network sockets, database connection URLs, file system paths, and class loading. If Strings were mutable, an attacker could pass a legitimate path, pass security checks, and then mutate the string concurrently before the file is opened (Time-of-Check to Time-of-Use flaw). Second, String Constant Pool (SCP) Caching: Immutability enables sharing a single string literal among thousands of references without fear that one component will alter it for others. Third, Thread Safety: Immutable objects can be freely shared across multiple threads without synchronization or locking. Fourth, Hash Code Caching: The hashCode is calculated once and cached forever, making Strings exceptionally fast and reliable as keys in HashMaps.',
        followUp: 'Where is the String Constant Pool stored in memory, and how has its location evolved across Java versions?',
        followUpAnswer: 'Prior to Java 7, the String Constant Pool was located in the Permanent Generation (PermGen), which had a fixed size and frequently suffered from java.lang.OutOfMemoryError: PermGen space. In Java 7, Oracle relocated the SCP to the main Java Heap. This allows interned strings to be garbage collected when they are no longer referenced, significantly reducing memory leak risks.',
        keyPhrases: ['Security & TOCTOU attack', 'String Constant Pool sharing', 'Thread safety without locks', 'Hash code caching', 'PermGen to Heap relocation'],
        commonMistakeAnswer: 'Saying strings are immutable just to make them faster, or not knowing that the pool moved from PermGen to the Heap in Java 7.'
      },
      {
        question: 'How many objects are created by the statement: String s = new String("Hello");?',
        answer: 'This statement creates either one or two objects, depending on the state of the String Constant Pool. If the literal "Hello" does not already exist in the SCP, two objects are created: one in the String Constant Pool created by the literal "Hello", and a second object created in the general Heap by the new operator. If "Hello" was already present in the SCP prior to this line executing, then only one new object is created in the general Heap.',
        followUp: 'Why is writing "String s = new String(\\"Hello\\");" considered an anti-pattern in modern Java development?',
        followUpAnswer: 'Because it creates an unnecessary wrapper object on the heap that duplicates the character sequence already present in the SCP. This consumes extra heap memory and places unnecessary allocation and garbage collection pressure on the JVM without providing any functional benefit over the literal "Hello".',
        keyPhrases: ['Two objects if pool is empty', 'One object if literal already in SCP', 'Unnecessary heap allocation', 'Garbage collection overhead'],
        commonMistakeAnswer: 'Asserting dogmatically that it always creates exactly two objects, forgetting that the literal might already exist in the pool.'
      },
      {
        question: 'What is the purpose of the intern() method in java.lang.String, and when would you use it?',
        answer: 'The intern() method returns the canonical representation of a string from the String Constant Pool. When s.intern() is invoked, the JVM looks up the pool for a string equal to s. If found, it returns that pooled reference. If not, s is added to the pool and returned. It is primarily used in memory-constrained applications with millions of duplicate strings (such as XML parsing or large data pipelines) to deduplicate references and allow rapid identity comparison (==).',
        followUp: 'What are the risks of calling intern() indiscriminately on arbitrary user-provided strings?',
        followUpAnswer: 'Interned strings reside in the String Constant Pool, which is maintained as a native JVM hash table. Interning millions of unpredictable strings can cause hash collisions in the pool table, slowing down pool operations and consuming heap memory that may not be promptly reclaimed.',
        keyPhrases: ['Canonical representation', 'String deduplication', 'Pool lookup and registration', 'Native hash table overhead'],
        commonMistakeAnswer: 'Thinking intern() permanently pins strings in memory that can never be garbage collected in modern Java.'
      },
      {
        question: 'How does the JVM optimize string storage in Java 9 and newer versions via "Compact Strings"?',
        answer: 'Prior to Java 9, String characters were stored internally in a char array (`char[] value`), where every character consumed 2 bytes (16 bits) in UTF-16 encoding. In Java 9, JEP 254 introduced Compact Strings: String now uses a byte array (`byte[] value`) accompanied by a 1-byte encoding flag (`byte coder`). If all characters fit into Latin-1 (ISO-8859-1, 1 byte per character), coder is 0 and only 1 byte per char is allocated. If any character requires UTF-16, coder is 1 and 2 bytes per char are used. This reduces heap usage by up to 50% for typical Western text.',
        followUp: 'Does the Compact Strings feature change any public String APIs or behavior?',
        followUpAnswer: 'No, it is purely an internal implementation optimization. Public methods such as charAt(), length(), and substring() behave identically and maintain full backward compatibility.',
        keyPhrases: ['Compact Strings (JEP 254)', 'byte[] value instead of char[]', 'coder byte (Latin-1 vs UTF-16)', '50% heap reduction', 'Transparent API compatibility'],
        commonMistakeAnswer: 'Claiming that Java 9 changed String to only support ASCII, or that length() now returns byte count instead of character count.'
      },
      {
        question: 'What is the difference between reassigning a String variable and mutating an object?',
        answer: 'A variable in Java is a reference (a memory address stored on the stack). Reassigning a String variable (e.g. s = s + "!") simply changes the address that s points to, directing it to a newly allocated object on the heap. The original String object is left untouched in memory. In contrast, mutating an object means modifying its internal fields in-place while keeping the object at the exact same memory address. Since String has no mutating methods, mutation is impossible through standard APIs.',
        followUp: 'Can a String object ever be mutated using Java Reflection?',
        followUpAnswer: 'Historically, reflection could access the private `value` field and modify the array contents, though doing so broke immutability, corrupted the SCP, and ruined HashMaps. In modern Java (Java 9+ and especially Java 17+ with strong encapsulation via JEP 403), accessing private internal fields of java.lang.String via reflection is blocked by default with an InaccessibleObjectException.',
        keyPhrases: ['Reference pointer vs object payload', 'Stack address vs Heap contents', 'Reflection violation', 'Strong encapsulation (JEP 403)'],
        commonMistakeAnswer: 'Thinking that "s = s + 1" modifies the existing string in-place.'
      },
      {
        question: 'Why does Java cache the hashCode of a String, and how does immutability make this possible?',
        answer: 'String implements hashCode() by iterating through its characters. Because strings are frequently used as keys in HashMaps and HashSets, recalculating the hash code on every lookup would be an O(N) operation. Immutability guarantees that once constructed, the characters never change; therefore, the hash code will never change. The String class maintains a private `int hash` field initialized to 0. The first time hashCode() is called, it computes the value and saves it in `hash`. Subsequent calls immediately return the cached integer in O(1) time.',
        followUp: 'What happens if a string\'s computed hash code happens to evaluate to exactly 0?',
        followUpAnswer: 'In older Java versions, a hash of 0 meant the caching flag couldn\'t distinguish an uncomputed hash from a computed hash of 0, causing recalculation. In modern Java (Java 13+), an additional `hashIsZero` boolean flag was introduced to prevent recalculating hash codes that legitimately evaluate to 0.',
        keyPhrases: ['Lazy evaluation', 'O(1) cached lookup', 'Immutable key stability', 'hash field caching', 'hashIsZero flag'],
        commonMistakeAnswer: 'Believing the hash code is computed eagerly in the constructor rather than lazily on the first hashCode() call.'
      },
      {
        question: 'How do String literals get loaded and placed into the String Constant Pool by the JVM?',
        answer: 'During compilation, javac records all string literals in the Constant Pool table of the compiled .class bytecode file. When the class is loaded and linked by the JVM, these constant pool entries are resolved into live String objects in the String Constant Pool on the Heap, either during class linking or lazily upon first execution of the instruction referencing the literal.',
        followUp: 'If two different classes in different packages declare the literal "STATUS_OK", do they share the same object?',
        followUpAnswer: 'Yes. The String Constant Pool is JVM-wide (shared across all classes loaded by the same JVM runtime). Both classes will resolve "STATUS_OK" to the identical String instance in the SCP.',
        keyPhrases: ['Bytecode Constant Pool table', 'Class loading resolution', 'JVM-wide shared pool', 'Identical literal deduplication'],
        commonMistakeAnswer: 'Thinking each class or package has its own private String Constant Pool.'
      },
      {
        question: 'What is the relationship between String immutability and Garbage Collection?',
        answer: 'String immutability means every modification produces a new String object. In applications with heavy string manipulations (like string concatenation in loops), thousands of transient String instances are created and discarded. This creates high allocation churn and triggers frequent Young Generation Garbage Collection cycles. Developers must use StringBuilder to minimize this GC pressure.',
        followUp: 'Can objects in the String Constant Pool ever be garbage collected?',
        followUpAnswer: 'Yes. Since Java 7 moved the SCP to the main heap, interned strings and literals are eligible for garbage collection if their corresponding ClassLoader is unloaded and no active live references point to them.',
        keyPhrases: ['GC allocation churn', 'Young generation pressure', 'Garbage collection eligibility', 'ClassLoader lifecycle'],
        commonMistakeAnswer: 'Assuming that string literals or interned strings can never be garbage collected under any circumstances.'
      },
      {
        question: 'Why does passing a String to a method feel like pass-by-value even though String is an object reference?',
        answer: 'Java is strictly pass-by-value for all arguments. When an object reference (like a String) is passed to a method, a copy of the reference address is passed to the parameter. If the method reassigns the parameter (e.g. str = str + "suffix"), it only reassigns its local copy of the pointer. Because String has no mutating methods to modify the underlying object, the caller\'s original String remains completely unchanged.',
        followUp: 'How does this contrast with passing a mutable object like an array or StringBuilder?',
        followUpAnswer: 'With an array or StringBuilder, while the reference itself cannot be changed in the caller, calling mutating methods like sb.append() or array[0] = 5 modifies the shared underlying object in the heap, reflecting changes back to the caller.',
        keyPhrases: ['Strict pass-by-value of reference', 'Local pointer reassignment', 'Lack of mutating API', 'Immutable side-effect freedom'],
        commonMistakeAnswer: 'Claiming that Java passes primitives by value and objects by reference (Java always passes everything by value).'
      },
      {
        question: 'Can you create an immutable class in Java with a mutable component, and how does String avoid this?',
        answer: 'To make a class truly immutable, all fields must be private and final, the class itself must be final (preventing subclassing), no setters must exist, and any mutable components (like Date or arrays) must be defensively copied during construction and retrieval. String achieves this: it is marked `final public class String`, and its internal `byte[] value` is private, final, and never exposed directly to external callers without copying.',
        followUp: 'Why is the String class declared final?',
        followUpAnswer: 'If String were not final, a malicious subclass could override methods like charAt(), length(), or equals(), or introduce mutable internal state, completely subverting the security guarantees and immutability assumptions relied upon by the JVM and core libraries.',
        keyPhrases: ['final class prevention of subclassing', 'Defensive copying', 'Private final internal array', 'Subversion of security checks'],
        commonMistakeAnswer: 'Forgetting that making the class final is required to prevent subclasses from overriding methods to introduce mutable behavior.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does calling s.toUpperCase() do to the original variable s if s = "abc"?',
        options: [
          'Modifies s in place to "ABC"',
          'Leaves s as "abc" and returns a new String "ABC"',
          'Throws an UnsupportedOperationException',
          'Converts s to a char array'
        ],
        correctIndex: 1,
        explanation: 'Because Strings are immutable, toUpperCase() creates and returns a new String object with uppercase letters without changing the original object.'
      },
      {
        question: 'Where is the String Constant Pool (SCP) located in modern Java (Java 7+)?',
        options: [
          'Stack Memory',
          'Permanent Generation (PermGen)',
          'Java Heap Memory',
          'Native CPU Registers'
        ],
        correctIndex: 2,
        explanation: 'In Java 7, the String Constant Pool was moved from PermGen into the main Java Heap, making pool strings eligible for normal garbage collection.'
      },
      {
        question: 'What is the result of comparing two identical string literals with ==: ("Alpha" == "Alpha")?',
        options: [
          'Always true because both reference the same object in the SCP',
          'Always false because each literal creates a new object',
          'true only if intern() was called first',
          'Compile-time error'
        ],
        correctIndex: 0,
        explanation: 'The JVM caches string literals in the SCP. Identical literals resolve to the exact same memory address in the pool, so == returns true.'
      },
      {
        question: 'How many objects are created by: String s = new String("Test"); when "Test" is not yet in the pool?',
        options: [
          '0',
          '1',
          '2',
          '3'
        ],
        correctIndex: 2,
        explanation: 'One object is created in the String Constant Pool for the literal "Test", and a second distinct object is created in the general Heap by new String().'
      },
      {
        question: 'What does the intern() method on a String object return?',
        options: [
          'A copy of the string in the stack',
          'The canonical reference to the string from the String Constant Pool',
          'The integer hash code of the string',
          'A mutable StringBuilder instance'
        ],
        correctIndex: 1,
        explanation: 'intern() queries the String Constant Pool and returns the canonical pool reference for the given string content.'
      },
      {
        question: 'Which internal data structure is used to store characters in Java 9+ (Compact Strings)?',
        options: [
          'char[] paired with an int length',
          'byte[] paired with a byte coder',
          'int[] containing Unicode codepoints',
          'ArrayList<Character>'
        ],
        correctIndex: 1,
        explanation: 'Java 9 introduced Compact Strings using byte[] and a coder byte (0 for Latin-1, 1 for UTF-16) to halve memory consumption for Latin-1 text.'
      },
      {
        question: 'Why is the String class declared with the final keyword?',
        options: [
          'To prevent garbage collection',
          'To prevent any subclass from extending it and breaking immutability or security',
          'To force all methods to run statically',
          'Because all classes in java.lang must be final'
        ],
        correctIndex: 1,
        explanation: 'Marking String final prevents subclasses from overriding methods to introduce mutability, which would compromise JVM security and pooling.'
      },
      {
        question: 'What happens to the previous String object when you write: String s = "A"; s = s + "B";?',
        options: [
          'It is deleted immediately from memory',
          'It remains on the heap/SCP; s now points to a new String "AB"',
          'Its character array is expanded to hold "B"',
          'A runtime exception is thrown because Strings cannot be extended'
        ],
        correctIndex: 1,
        explanation: 'The original "A" object remains unchanged. A new String "AB" is constructed and assigned to s.'
      },
      {
        question: 'Which of the following is NOT a reason for String immutability in Java?',
        options: [
          'Thread safety without locking',
          'Security in file paths and network connections',
          'Allowing automatic primitive unboxing to int',
          'Safe sharing of instances in the String Constant Pool'
        ],
        correctIndex: 2,
        explanation: 'Strings do not unbox to int. The valid reasons for immutability are thread safety, security, pooling/caching, and stable hash codes.'
      },
      {
        question: 'What will be printed: String s = "A"; s.concat("B"); s.replace(\'A\', \'C\'); System.out.println(s);?',
        options: [
          'CB',
          'C',
          'AB',
          'A'
        ],
        correctIndex: 3,
        explanation: 'Neither concat() nor replace() modifies the original string, and neither return value was stored. Therefore, s remains "A".'
      }
    ]
  }
};
