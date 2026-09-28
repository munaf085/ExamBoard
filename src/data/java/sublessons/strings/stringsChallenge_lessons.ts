import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 9: STRINGS & STRING POOL - CAPSTONE LESSON 9.5
// ============================================================

export const stringsChallengeLessons: Record<string, DetailedLesson> = {
  'strings-challenge': {
  "id": "strings-challenge",
  "moduleId": "java-strings",
  "moduleTitle": "9. Strings & String Pool",
  "lessonNumber": "Lesson 9.5",
  "title": "Module 9 Challenge & Interview Assessment",
  "subtitle": "String immutability, String Constant Pool (SCP) native hashtable, Compact Strings (byte[] + coder), intern() mechanics, StringConcatFactory invokedynamic, and StringBuilder vs StringBuffer",
  "estimatedMinutes": 25,
  "beginnerAnalogy": "In the Java Language Specification (JLS \u00a7\u00a73.10.5, 4.3.3, 15.18.1), a String represents an immutable sequence of Unicode characters supported directly by core language semantics. String literals are uniquely treated by the compiler as canonical constant instances automatically pooled into the String Constant Pool (SCP) at class-loading time. Once instantiated, a String's internal character sequence and hash code are permanently immutable: any operation appearing to modify a String (e.g. substring(), toUpperCase(), replace()) allocates a brand-new String object on the heap, guaranteeing thread-safety and hash stability across concurrent collections.\n\nAt the JVM execution and native memory layer, the String Constant Pool is implemented as a native C++ fixed-size hash table (StringTable) residing in native memory, while the actual pooled java.lang.String objects reside in the regular Java Heap. In Java 9+ (JEP 254 Compact Strings), the legacy char[] backing array was replaced by a byte[] array accompanied by a 1-byte coder flag (LATIN1 encoding with 1 byte per char for Western text, or UTF16 with 2 bytes per char), halving String heap memory consumption across typical enterprise workloads. String concatenation using + does not statically chain StringBuilder calls in modern Java (JDK 9+ JEP 280); instead, javac emits the invokedynamic opcode delegating to StringConcatFactory.makeConcatWithConstants(), which builds an optimized bytecode recipe dynamically evaluated with SIMD hardware memory copies.\n\nIn enterprise software architectures, Strings represent over 30% to 50% of the entire heap footprint in production web servers and microservices. Subtle misunderstandings\u2014such as repeatedly concatenating strings using + inside large loops, misusing String.intern() and causing native StringTable bucket collision stalls, or comparing strings with == instead of .equals()\u2014lead to catastrophic memory exhaustion, high-frequency GC pauses, and critical security authentication bypasses. Mastering String pool mechanics and thread-safe text builders is essential for engineering high-scale, zero-defect backends.",
  "coreExplanation": [
    "String Immutability and Security Guarantees: `java.lang.String` is marked `final`, encapsulating a `private final byte[] value` array. Immutability guarantees that once created, a string's contents cannot be tampered with. This is critical for JVM class loading security (preventing altered class paths), network socket addresses, file system paths, and secure hashing inside `HashMap`.",
    "String Constant Pool (SCP) Architecture: String literals are stored in the SCP (a native C++ hash table `StringTable`). When the JVM evaluates a literal like `\"Hello\"`, it queries the pool; if present, it returns the pooled reference; otherwise, it creates and pools a new String. `String s = new String(\"Hello\")` allocates an explicit secondary object on the standard heap outside the pool.",
    "The intern() Method Semantics: Calling `s.intern()` queries the StringTable. If the pool already contains a string equal to `s`, the pooled reference is returned; otherwise, `s` is added to the pool and its reference returned. This allows manual canonicalization, enabling `==` comparisons on interned strings.",
    "Compact Strings (Java 9+ JEP 254): In older JVMs, every String stored a `char[]` consuming 2 bytes per character regardless of whether the text was standard ASCII. Compact Strings uses a `byte[]` with a `coder` flag (0 for `LATIN-1` at 1 byte/char, 1 for `UTF-16` at 2 bytes/char), slashing string memory consumption by 50% in English/ASCII systems.",
    "Modern String Concatenation with invokedynamic (JEP 280): In JDK 9+, compiling `a + b + c` does not generate `new StringBuilder().append()`. Instead, javac emits an `invokedynamic` instruction with `StringConcatFactory.makeConcatWithConstants()`, allowing the JVM to optimize buffer sizing and SIMD copying dynamically at runtime.",
    "StringBuilder vs StringBuffer: `StringBuilder` is unsynchronized, mutable, and high-performance for single-threaded string construction. `StringBuffer` synchronizes all public methods for thread safety, introducing unnecessary lock contention overhead in single-threaded environments.",
    "Loop Concatenation GC Trap: Using `+` inside an iterating loop compiles into repeated concatenation passes, allocating O(N) temporary strings and quadratic O(N^2) character copying. Accumulating characters inside a pre-allocated `StringBuilder` runs in linear O(N) time with minimal heap churn.",
    "Surrogate Pairs and Unicode Code Points: Characters outside the Basic Multilingual Plane (BMP, code points > 0xFFFF, such as emojis) require two UTF-16 code units (a high surrogate and a low surrogate). `str.length()` returns the number of 16-bit code units (2 for an emoji), while `str.codePointCount(0, str.length())` returns the true logical character count (1)."
  ],
  "codeSnippet": {
    "title": "String Pool Equality, Interning & Compact Strings",
    "code": "public class StringMastery {\n    public static void main(String[] args) {\n        // 1. Literal Pool vs Explicit Heap Instantiation\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n        String s4 = s3.intern();\n\n        System.out.println(\"s1 == s2 (both in SCP): \" + (s1 == s2));\n        System.out.println(\"s1 == s3 (heap vs SCP): \" + (s1 == s3));\n        System.out.println(\"s1 == s4 (interned): \" + (s1 == s4));\n\n        // 2. Surrogate Pair Code Point Trap (Emoji)\n        String emoji = \"\\uD83D\\uDE00\"; // \ud83d\ude00 Grinning Face\n        System.out.println(\"UTF-16 code units (length): \" + emoji.length());\n        System.out.println(\"Unicode code points: \" + emoji.codePointCount(0, emoji.length()));\n    }\n}",
    "lineByLineExplanation": [
      {
        "line": "String s1 = \"Java\"; String s2 = \"Java\";",
        "explanation": "Both literals point to the identical canonical String instance in the String Constant Pool."
      },
      {
        "line": "String s3 = new String(\"Java\");",
        "explanation": "Explicitly allocates a new String object on the heap with its own distinct memory address."
      },
      {
        "line": "String s4 = s3.intern();",
        "explanation": "Queries the SCP, finds \"Java\", and returns the canonical pooled reference matching s1."
      },
      {
        "line": "String emoji = \"\\uD83D\\uDE00\";",
        "explanation": "Emoji requires two UTF-16 surrogate code units: length() returns 2, codePointCount returns 1."
      }
    ],
    "output": "s1 == s2 (both in SCP): true\ns1 == s3 (heap vs SCP): false\ns1 == s4 (interned): true\nUTF-16 code units (length): 2\nUnicode code points: 1"
  },
  "beginnerMistakes": [
    {
      "mistake": "Comparing Strings using '==' instead of '.equals()'.",
      "whyItHappens": "Developers assume '==' compares text content rather than memory reference pointer equality.",
      "howToFix": "Always use `str1.equals(str2)` (or `Objects.equals(str1, str2)`) for content comparison. Only use `==` when verifying reference identity.",
      "codeSnippet": "String a = new String(\"Test\");\nString b = new String(\"Test\");\n// WRONG: if (a == b) // false!\n// CORRECT: if (a.equals(b)) // true!"
    },
    {
      "mistake": "Using String concatenation '+' inside large loops.",
      "whyItHappens": "Assuming modern compilers automatically optimize loop concatenations.",
      "howToFix": "Instantiate a `StringBuilder` outside the loop and append sequentially inside the loop.",
      "codeSnippet": "// WRONG: String s = \"\"; for (int i = 0; i < 10000; i++) s += i;\n// CORRECT: StringBuilder sb = new StringBuilder(); for (int i = 0; i < 10000; i++) sb.append(i);"
    },
    {
      "mistake": "Unchecked String.intern() on unbounded user input.",
      "whyItHappens": "Believing interning saves memory for all strings universally.",
      "howToFix": "Avoid interning dynamic user strings; the native StringTable can overflow its buckets, causing high GC pauses and degraded lookup performance.",
      "codeSnippet": "// DANGEROUS: String key = userInput.intern(); // Can cause native StringTable memory leak!"
    },
    {
      "mistake": "Assuming String.length() equals the count of visual characters for all Unicode text.",
      "whyItHappens": "Not knowing that characters outside the Basic Multilingual Plane occupy two char units.",
      "howToFix": "Use `str.codePointCount(0, str.length())` when handling emojis, mathematical symbols, or international supplementary characters.",
      "codeSnippet": "String emoji = \"\ud83d\ude00\";\n// emoji.length() == 2! Use emoji.codePointCount(0, emoji.length()) == 1."
    }
  ],
  "cheatSheet": {
    "summary": "Module 9 Strings & String Pool Technical Reference",
    "rules": [
      {
        "rule": "Absolute Immutability",
        "explanation": "String state is immutable; all manipulation methods return newly allocated String instances on the heap."
      },
      {
        "rule": "String Constant Pool (SCP)",
        "explanation": "Literals are canonicalized in the native StringTable hash table; duplicate literals share the same heap instance."
      },
      {
        "rule": "Compact Strings Encoding",
        "explanation": "Java 9+ stores text in byte[] with coder flag (0 for LATIN-1 at 1 byte/char, 1 for UTF-16 at 2 bytes/char)."
      },
      {
        "rule": "intern() Canonicalization",
        "explanation": "s.intern() returns the canonical SCP reference for s, creating it in the pool if not already present."
      },
      {
        "rule": "invokedynamic Concatenation",
        "explanation": "Java 9+ replaces static StringBuilder chaining with StringConcatFactory invokedynamic recipe evaluation."
      },
      {
        "rule": "StringBuilder for Loop Buffering",
        "explanation": "Never use + inside loops; explicitly declare StringBuilder outside loops to avoid O(N^2) memory copying."
      },
      {
        "rule": "Content Equality Contract",
        "explanation": "Always use .equals() for semantic character equality; == compares reference memory addresses."
      },
      {
        "rule": "Surrogate Pair Codepoints",
        "explanation": "Emojis and supplementary characters span two UTF-16 code units; calculate count using codePointCount()."
      }
    ],
    "quickComparison": [
      {
        "aspect": "Mutability",
        "optionA": "String: immutable, thread-safe, cached hash code",
        "optionB": "StringBuilder / StringBuffer: mutable character buffer"
      },
      {
        "aspect": "Thread Safety",
        "optionA": "StringBuilder: unsynchronized, maximum performance",
        "optionB": "StringBuffer: synchronized methods, thread-safe overhead"
      },
      {
        "aspect": "Memory Storage",
        "optionA": "Literal: cached in String Constant Pool (SCP)",
        "optionB": "`new String()`: forces independent heap allocation"
      },
      {
        "aspect": "Character Encoding",
        "optionA": "Java 8: char[] (strictly 2 bytes per character)",
        "optionB": "Java 9+: byte[] + coder flag (1 byte for Latin-1, 2 for UTF-16)"
      },
      {
        "aspect": "Loop Concatenation",
        "optionA": "`s += item`: O(N^2) time, high GC memory allocation",
        "optionB": "`sb.append(item)`: O(N) time, contiguous buffer expansion"
      }
    ]
  },
  "practiceProblems": [
    {
      "title": "Puzzle 1: Literal Pool vs New String Reference Identity",
      "problemStatement": "What is printed by comparing two literals and two new String objects?",
      "code": "public class Problem1 {\n    public static void main(String[] args) {\n        String a = \"Exam\";\n        String b = \"Exam\";\n        String c = new String(\"Exam\");\n        System.out.println((a == b) + \" \" + (a == c) + \" \" + a.equals(c));\n    }\n}",
      "options": [
        "true false true",
        "true true true",
        "false false true",
        "true false false"
      ],
      "correctOptionIndex": 0,
      "hint": "Literals share the same SCP instance. new String creates a new heap object. .equals() checks characters.",
      "solution": "Output: true false true",
      "explanation": "a and b reference the identical pooled instance in the SCP (a == b is true). c references a newly allocated heap object (a == c is false). a.equals(c) compares characters, which match (true)."
    },
    {
      "title": "Puzzle 2: Compile-Time Constant Folding in String Pool",
      "problemStatement": "What is the result of comparing a concatenated literal with a constant expression?",
      "code": "public class Problem2 {\n    public static void main(String[] args) {\n        String s1 = \"JavaCore\";\n        String s2 = \"Java\" + \"Core\";\n        String s3 = \"Java\";\n        String s4 = s3 + \"Core\";\n        System.out.println((s1 == s2) + \" \" + (s1 == s4));\n    }\n}",
      "options": [
        "true false",
        "true true",
        "false false",
        "false true"
      ],
      "correctOptionIndex": 0,
      "hint": "The compiler folds literal concatenations at compile time. Variable concatenation is evaluated at runtime.",
      "solution": "Output: true false",
      "explanation": "\"Java\" + \"Core\" is a constant expression folded by javac into \"JavaCore\" at compile time (s1 == s2 is true). s3 + \"Core\" involves variable s3, evaluated at runtime into a new heap String (s1 == s4 is false)."
    },
    {
      "title": "Puzzle 3: The intern() Method Canonical Reconnection",
      "problemStatement": "What is printed after interning a dynamically concatenated string?",
      "code": "public class Problem3 {\n    public static void main(String[] args) {\n        String s1 = \"Enterprise\";\n        String s2 = new String(\"Enterprise\");\n        String s3 = s2.intern();\n        System.out.println((s1 == s2) + \" \" + (s1 == s3));\n    }\n}",
      "options": [
        "false true",
        "true true",
        "false false",
        "true false"
      ],
      "correctOptionIndex": 0,
      "hint": "s2.intern() returns the reference from the SCP, which matches s1.",
      "solution": "Output: false true",
      "explanation": "s2 is on the regular heap (s1 == s2 is false). s2.intern() looks up \"Enterprise\" in the SCP and returns the canonical pooled reference, which is identical to s1 (s1 == s3 is true)."
    },
    {
      "title": "Puzzle 4: String Substring Heap Independence (Java 7u6+)",
      "problemStatement": "In modern Java, does calling s.substring() share the underlying char/byte array with s?",
      "code": "// Modern Java substring memory model:\nString s = \"VeryLongStringHere\";\nString sub = s.substring(0, 4);",
      "options": [
        "No, modern Java allocates a brand-new byte[] for the substring to prevent memory leaks",
        "Yes, it shares the array with an offset pointer like Java 6",
        "It stores substring in native memory",
        "It mutates the original string in place"
      ],
      "correctOptionIndex": 0,
      "hint": "Java 7 update 6 removed offset sharing to prevent large parent strings from being pinned in memory.",
      "solution": "Output: Allocates a brand-new byte[]",
      "explanation": "To prevent memory leaks where small substrings kept large parent character arrays alive in memory, Java 7u6+ copies the substring characters into a new independent array."
    },
    {
      "title": "Puzzle 5: Surrogate Pair Emoji Length Calculation",
      "problemStatement": "What does \"\\uD83D\\uDE80\".length() evaluate to for a single rocket emoji (\ud83d\ude80)?",
      "code": "public class Problem5 {\n    public static void main(String[] args) {\n        String rocket = \"\\uD83D\\uDE80\";\n        System.out.println(rocket.length());\n    }\n}",
      "options": [
        "2",
        "1",
        "4",
        "8"
      ],
      "correctOptionIndex": 0,
      "hint": "length() counts 16-bit UTF-16 code units (char values), not visual glyphs.",
      "solution": "Output: 2",
      "explanation": "Rocket emoji \ud83d\ude80 has code point U+1F680 (outside the 16-bit BMP). It is encoded as two surrogate char code units (\\uD83D and \\uDE80). length() returns 2."
    },
    {
      "title": "Puzzle 6: String Immutability Modification Illusion",
      "problemStatement": "What is printed by this string manipulation snippet?",
      "code": "public class Problem6 {\n    public static void main(String[] args) {\n        String s = \"hello\";\n        s.toUpperCase();\n        s.concat(\" world\");\n        System.out.println(s);\n    }\n}",
      "options": [
        "hello",
        "HELLO WORLD",
        "HELLO",
        "hello world"
      ],
      "correctOptionIndex": 0,
      "hint": "Strings are immutable. Methods like toUpperCase() return new String objects. What happened to the return values?",
      "solution": "Output: hello",
      "explanation": "Because Strings are immutable, neither toUpperCase() nor concat() modifies s. Their return values were ignored, so s remains \"hello\"."
    },
    {
      "title": "Puzzle 7: StringBuilder Method Chaining Mutability",
      "problemStatement": "What is printed by this StringBuilder snippet?",
      "code": "public class Problem7 {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"Java\");\n        sb.append(\" 21\").reverse();\n        System.out.println(sb);\n    }\n}",
      "options": [
        "12 avaJ",
        "Java 21",
        "avaJ 12",
        "12 Java"
      ],
      "correctOptionIndex": 0,
      "hint": "sb.append(\" 21\") makes \"Java 21\". reverse() reverses the mutable buffer in place.",
      "solution": "Output: 12 avaJ",
      "explanation": "StringBuilder is mutable. append(\" 21\") produces \"Java 21\". reverse() flips the characters in-place to \"12 avaJ\"."
    },
    {
      "title": "Puzzle 8: Final String Variable Compile-Time Inlining",
      "problemStatement": "What is printed when concatenating compile-time final String variables?",
      "code": "public class Problem8 {\n    public static void main(String[] args) {\n        final String a = \"Hello\";\n        final String b = \"World\";\n        String c = a + b;\n        String d = \"HelloWorld\";\n        System.out.println(c == d);\n    }\n}",
      "options": [
        "true",
        "false",
        "Compile Error",
        "NullPointerException"
      ],
      "correctOptionIndex": 0,
      "hint": "final variables initialized with compile-time constant literals are treated as constant expressions by the compiler.",
      "solution": "Output: true",
      "explanation": "Because a and b are `final` and initialized with string literals, `a + b` is a compile-time constant expression. The compiler folds it into \"HelloWorld\", pointing to the same SCP instance as d."
    },
    {
      "title": "Puzzle 9: String.replace vs replaceAll Regex Trap",
      "problemStatement": "What is printed by s.replaceAll(\".\", \"X\") versus s.replace(\".\", \"X\") on \"a.b\"?",
      "code": "public class Problem9 {\n    public static void main(String[] args) {\n        String s = \"a.b\";\n        System.out.println(s.replace(\".\", \"X\") + \" \" + s.replaceAll(\".\", \"X\"));\n    }\n}",
      "options": [
        "aXb XXX",
        "aXb aXb",
        "XXX XXX",
        "Compile Error"
      ],
      "correctOptionIndex": 0,
      "hint": "replace treats target as literal text. replaceAll treats target as a regular expression (where '.' matches any character).",
      "solution": "Output: aXb XXX",
      "explanation": "`s.replace(\".\", \"X\")` treats \".\" as literal text, replacing the period: \"aXb\". `s.replaceAll(\".\", \"X\")` treats \".\" as a regex matching every character, replacing all 3 characters: \"XXX\"."
    },
    {
      "title": "Puzzle 10: Blank vs Empty String (Java 11+)",
      "problemStatement": "What is printed by isEmpty() versus isBlank() on a string containing spaces: \"   \"?",
      "code": "public class Problem10 {\n    public static void main(String[] args) {\n        String s = \"   \";\n        System.out.println(s.isEmpty() + \" \" + s.isBlank());\n    }\n}",
      "options": [
        "false true",
        "true true",
        "false false",
        "true false"
      ],
      "correctOptionIndex": 0,
      "hint": "isEmpty() checks length == 0. isBlank() checks if length == 0 or all characters are whitespace.",
      "solution": "Output: false true",
      "explanation": "s.isEmpty() checks if `length == 0` (false, length is 3). s.isBlank() checks if the string is empty or contains only white space code points (true)."
    }
  ],
  "miniQuiz": [
    {
      "id": "mq-95-1",
      "question": "Where does the String Constant Pool (SCP) reside in memory in Java 8 and later JVMs?",
      "options": [
        "In the standard Java Heap memory (managed by Garbage Collection)",
        "In the permanent generation (PermGen)",
        "In CPU registers",
        "In the thread execution call stack"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Since Java 7, the String Constant Pool was moved out of PermGen into the standard garbage-collected Java Heap."
    },
    {
      "id": "mq-95-2",
      "question": "What internal representation change was introduced by Compact Strings in Java 9 (JEP 254)?",
      "options": [
        "Replaced char[] with byte[] and an encoding coder flag (LATIN1 or UTF16)",
        "Compressed all strings with GZIP",
        "Stored all strings in off-heap memory",
        "Converted all strings to ASCII"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "JEP 254 replaced `char[]` with `byte[]` and a 1-byte `coder` flag, halving memory for Latin-1 character strings."
    },
    {
      "id": "mq-95-3",
      "question": "What does invoking `s.intern()` do when `s` is a dynamically created String?",
      "options": [
        "Returns the canonical reference from the String Constant Pool, adding it if not already present",
        "Converts the string into an integer",
        "Deallocates the string from heap memory",
        "Encrypts the string for security"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "intern() queries the native StringTable in the SCP, returning the canonical pooled reference."
    },
    {
      "id": "mq-95-4",
      "question": "How is the String concatenation operator `+` compiled in modern Java (JDK 9+)?",
      "options": [
        "Using the invokedynamic bytecode instruction via StringConcatFactory",
        "Using static new StringBuilder() and .append() chaining",
        "Using StringBuffer for synchronization",
        "Using native C strcat() calls"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "JEP 280 transitioned string concatenation to `invokedynamic` backed by `StringConcatFactory.makeConcatWithConstants()`."
    },
    {
      "id": "mq-95-5",
      "question": "Why is `StringBuilder` preferred over `StringBuffer` for standard string manipulation?",
      "options": [
        "StringBuilder is unsynchronized and avoids thread synchronization lock overhead",
        "StringBuilder supports emojis while StringBuffer does not",
        "StringBuffer is deprecated in Java",
        "StringBuilder allocates memory on the stack"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "StringBuffer synchronizes every method, introducing locking overhead. StringBuilder is unsynchronized and substantially faster."
    },
    {
      "id": "mq-95-6",
      "question": "How many total objects are created on the heap by `String s = new String(\"Hello\");` if \"Hello\" was not previously in the pool?",
      "options": [
        "2 objects (one in the String Constant Pool, one on the regular heap)",
        "1 object",
        "0 objects",
        "3 objects"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "The literal \"Hello\" creates one object in the String Constant Pool. The `new String(...)` constructor allocates a second distinct object on the regular heap."
    },
    {
      "id": "mq-95-7",
      "question": "What is the difference between `str.length()` and `str.codePointCount(0, str.length())`?",
      "options": [
        "length() returns the number of 16-bit UTF-16 code units; codePointCount returns true Unicode characters",
        "length() returns bytes; codePointCount returns characters",
        "They are identical in all circumstances",
        "codePointCount returns character encoding format"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Characters outside the Basic Multilingual Plane (like emojis) require two UTF-16 code units (length = 2), but represent 1 Unicode code point."
    },
    {
      "id": "mq-95-8",
      "question": "Why is String declared `final` in the Java standard library?",
      "options": [
        "To enforce immutability, thread safety, and prevent malicious subclassing that alters security invariants",
        "To make String methods run faster",
        "Because final classes consume less memory",
        "To prevent serialization"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "If String were not final, a subclass could override methods to mutate characters or forge security checks."
    },
    {
      "id": "mq-95-9",
      "question": "What does `String.join(\", \", \"A\", \"B\", \"C\")` return?",
      "options": [
        "\"A, B, C\"",
        "\"[A, B, C]\"",
        "\"A,B,C,\"",
        "\", A, B, C\""
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "String.join joins elements with the specified delimiter without adding a trailing delimiter."
    },
    {
      "id": "mq-95-10",
      "question": "What happens when you call `s.substring(0, 3)` on `String s = \"Java\";`?",
      "options": [
        "Returns a new String \"Jav\" without mutating s",
        "Mutates s into \"Jav\"",
        "Throws an IndexOutOfBoundsException",
        "Returns \"Java\""
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Strings are immutable; substring returns a newly allocated String \"Jav\" containing characters from index 0 up to index 2."
    },
    {
      "id": "mq-95-11",
      "question": "What is the difference between `String.replace()` and `String.replaceAll()`?",
      "options": [
        "replace matches literal target strings; replaceAll interprets the target as a regular expression",
        "replace replaces only the first occurrence; replaceAll replaces all",
        "replaceAll is deprecated",
        "There is no difference"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Both replace all occurrences, but replaceAll interprets the search pattern as a regex, whereas replace treats it as literal text."
    },
    {
      "id": "mq-95-12",
      "question": "What method was introduced in Java 11 to check if a String contains only whitespace characters?",
      "options": [
        "isBlank()",
        "isEmpty()",
        "isWhitespace()",
        "trim()"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Java 11 introduced `isBlank()` which returns true if the string is empty or contains exclusively whitespace code points."
    },
    {
      "id": "mq-95-13",
      "question": "How does String cache its `hashCode()` in Java?",
      "options": [
        "In a private `int hash` field, computed lazily on the first hashCode() call and cached because characters never change",
        "At class loading time for all strings",
        "In a native OS register",
        "By calling Object.hashCode() every time"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Because String is immutable, its hash code is computed once lazily and stored in a private `hash` field for fast subsequent HashMap lookups."
    },
    {
      "id": "mq-95-14",
      "question": "What happens if you concatenate strings using `+` inside a loop of 100,000 iterations?",
      "options": [
        "Allocates 100,000 temporary string objects, causing quadratic O(N^2) copying and severe GC pauses",
        "Javac optimizes it into a single StringBuilder automatically",
        "It throws a StackOverflowError",
        "The JVM executes it in O(1) time"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "Across loop iterations, the compiler cannot merge independent concatenations, generating thousands of temporary heap objects and quadratic memory copying."
    },
    {
      "id": "mq-95-15",
      "question": "What is the initial default buffer capacity of `new StringBuilder()`?",
      "options": [
        "16 characters",
        "0 characters",
        "32 characters",
        "64 characters"
      ],
      "correctIndex": 0,
      "correctOptionIndex": 0,
      "explanation": "The default no-argument constructor `new StringBuilder()` initializes an internal buffer capacity of 16 characters."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Why is String immutable in Java? Provide four distinct architectural and security reasons.",
      "expectedAnswer": "String immutability is fundamental to the security, integrity, and performance of the Java platform: 1) Security: Strings represent sensitive system parameters\u2014file paths, network socket URLs, database connection strings, and user credentials. If Strings were mutable, an untrusted component could alter a validated path between authentication and execution (Time-of-Check to Time-of-Use TOCTOU vulnerability). 2) Class Loading Safety: Class names are passed as strings to ClassLoaders; mutability would allow malicious classes to masquerade as core system classes like `java.lang.System`. 3) Thread Safety: Immutable objects are inherently thread-safe with zero synchronization overhead; strings can be freely shared across concurrent threads without race conditions. 4) HashMap & Collection Integrity: String caches its `hashCode()` in a private field. If a String key were mutable, altering its characters inside a `HashMap` would corrupt its hash bucket location, making the key permanently lost.",
      "followUp": "Can String immutability be bypassed using Reflection?",
      "followUpAnswer": "In older Java versions, reflection could modify the private value array; in modern Java (Java 9+ JPMS / Modules), strong encapsulation prevents reflective access to `java.lang.String` internal fields unless explicit `--add-opens` flags are supplied.",
      "commonMistake": "Stating that String is immutable only to save memory in the String pool.",
      "commonMistakeAnswer": "The String pool is an optimization enabled by immutability; security and thread-safety were the primary design drivers.",
      "keyPhrases": [
        "security & TOCTOU vulnerability prevention",
        "JVM class loader integrity",
        "inherent zero-lock thread safety",
        "hash code caching stability in HashMap"
      ]
    },
    {
      "question": "Explain the internal architecture of the String Constant Pool (SCP) and how StringTable works in the JVM.",
      "expectedAnswer": "The String Constant Pool is implemented in the HotSpot C++ codebase as `StringTable`, a fixed-size native hash table with open addressing/chaining. Importantly, since Java 7, the actual pooled `String` objects reside on the standard garbage-collected Java Heap (not native memory or PermGen), while the `StringTable` index references them. When a class is loaded, all literal string tokens in its constant pool table are resolved. The JVM hashes the string and checks `StringTable`; if an entry exists, the pooled instance reference is reused; if not, a new `String` is allocated on the heap and inserted into `StringTable`. When pooled strings lose external references, they are collected during normal GC cycles.",
      "followUp": "What happens if a high-throughput application calls `String.intern()` on millions of unique strings?",
      "followUpAnswer": "It leads to severe hash bucket collisions in `StringTable`, degrading pool lookups from O(1) to O(N) linked list traversals and drastically increasing GC pause times. The table capacity can be configured via `-XX:StringTableSize`.",
      "commonMistake": "Thinking String Constant Pool strings are never garbage collected.",
      "commonMistakeAnswer": "Pooled strings that are no longer strongly referenced by loaded classes can be reclaimed during Garbage Collection cycles.",
      "keyPhrases": [
        "native C++ StringTable hash table",
        "heap allocation since Java 7",
        "literal resolution at class-loading",
        "-XX:StringTableSize tuning"
      ]
    },
    {
      "question": "What is JEP 254 Compact Strings (Java 9+) and how does it optimize memory compared to Java 8?",
      "expectedAnswer": "In Java 8 and earlier, every `java.lang.String` stored characters in a `char[] value` array, consuming 2 bytes (16 bits) per character regardless of language. Heap profiling studies across enterprise Java applications revealed that over 50% of the heap was consumed by Strings, and the vast majority of those strings contained only single-byte ASCII/Latin-1 characters (consuming 2 bytes where 1 byte was sufficient). JEP 254 replaced `char[]` with a `byte[] value` array and an additional 1-byte `coder` field. The `coder` has two modes: `LATIN1` (0), allocating 1 byte per character for strings where all characters fit in ISO-8859-1 (0-255); and `UTF16` (1), allocating 2 bytes per character when any character requires multi-byte representation. This reduced String heap footprint by 40% to 50% across enterprise microservices with zero API changes.",
      "followUp": "Does Compact Strings hurt performance when reading single characters with charAt()?",
      "followUpAnswer": "No. The JVM HotSpot compiler intrinsifies `charAt()` using hardware vector instructions: reading Latin-1 shifts by 0, and reading UTF-16 shifts by 1, executing with zero measurable latency.",
      "commonMistake": "Confusing Compact Strings with String deduplication or GZIP compression.",
      "commonMistakeAnswer": "Compact Strings is an internal byte-level encoding optimization, not a compression algorithm.",
      "keyPhrases": [
        "JEP 254 Compact Strings",
        "byte[] value array with coder flag",
        "LATIN1 (1 byte/char) vs UTF16 (2 bytes/char)",
        "50% heap memory reduction for ASCII text"
      ]
    },
    {
      "question": "How does modern Java (JDK 9+ JEP 280) compile String concatenation with the '+' operator?",
      "expectedAnswer": "In Java 5 through 8, the compiler translated `\"Hello \" + name + \"!\"` into bytecode that statically instantiated `new StringBuilder()` and chained `.append()` calls. While functional, this generated rigid bytecode that could not be optimized by newer JVMs without recompilation. JEP 280 replaced static `StringBuilder` generation with the `invokedynamic` bytecode opcode pointing to `StringConcatFactory.makeConcatWithConstants()`. At runtime, the JVM bootstrap method inspects the concatenation arguments and dynamically generates an optimal recipe (using direct memory sizing, `Unsafe` memory copies, and SIMD instructions) that constructs the final `String` in a single pass without allocating intermediate `StringBuilder` objects.",
      "followUp": "Why should you still avoid using `+` inside a loop in Java 9+?",
      "followUpAnswer": "Because `invokedynamic` evaluates each statement independently. Inside an iterating loop, each pass still executes an independent concatenation recipe and produces a new intermediate String object. An explicit `StringBuilder` outside the loop is still strictly required.",
      "commonMistake": "Believing `+` in modern Java makes StringBuilder completely obsolete.",
      "commonMistakeAnswer": "StringBuilder is still mandatory for loops and conditional multi-step text construction.",
      "keyPhrases": [
        "JEP 280 invokedynamic string concatenation",
        "StringConcatFactory.makeConcatWithConstants bootstrap",
        "dynamic recipe evaluation with single memory pass",
        "mandatory StringBuilder for loop iteration"
      ]
    },
    {
      "question": "Compare StringBuilder and StringBuffer in memory layout, concurrency, and performance.",
      "expectedAnswer": "`StringBuilder` (introduced in Java 5) and `StringBuffer` (Java 1.0) both inherit from `AbstractStringBuilder` and share an identical internal mutable `byte[]` buffer architecture that grows dynamically when capacity is exceeded. The crucial difference is concurrency: all public methods in `StringBuffer` (`append`, `insert`, `delete`) are declared `synchronized`. In single-threaded execution, acquiring and releasing monitor locks incurs CPU cache synchronization and memory barrier overhead (even with HotSpot biased locking). `StringBuilder` eliminates all synchronization, providing maximum single-threaded throughput. In concurrent multi-threaded scenarios, `StringBuffer` is rarely appropriate either, because coarse per-method synchronization does not protect composite business operations; modern concurrent architectures prefer thread-confined `StringBuilder` or thread-safe atomic data pipelines.",
      "followUp": "How does AbstractStringBuilder resize its internal buffer when full?",
      "followUpAnswer": "It doubles its capacity plus 2: `newCapacity = (oldCapacity << 1) + 2`. If that is still insufficient, it expands directly to the minimum required capacity.",
      "commonMistake": "Using StringBuffer 'just to be safe' in single-threaded methods.",
      "commonMistakeAnswer": "Synchronization imposes needless CPU performance degradation; use StringBuilder for local variables.",
      "keyPhrases": [
        "AbstractStringBuilder shared architecture",
        "synchronized methods in StringBuffer",
        "unsynchronized high-throughput StringBuilder",
        "buffer growth formula (oldCapacity << 1) + 2"
      ]
    },
    {
      "question": "What is the difference between an empty string (\"\") and a blank string (\"   \"), and how are they validated?",
      "expectedAnswer": "An empty string is a string whose length is strictly zero (`length() == 0` or `isEmpty() == true`). It contains zero characters or code points. A blank string (evaluated via Java 11 `isBlank()`) is a string that is either empty OR contains exclusively whitespace characters (spaces, tabs, newlines, Unicode non-breaking spaces). In production validation, checking `isEmpty()` on `\"   \"` returns `false` (because length is 3), which would allow blank usernames or empty form submissions to bypass validation. Idiomatic Java 11+ uses `if (input == null || input.isBlank())` to reject empty or whitespace-only inputs cleanly.",
      "followUp": "How does `isBlank()` differ from `str.trim().isEmpty()`?",
      "followUpAnswer": "`str.trim().isEmpty()` allocates a new intermediate String object on the heap if whitespace is trimmed; `isBlank()` iterates through codepoints without allocating any heap memory.",
      "commonMistake": "Using `str.length() == 0` to validate that a user entered text.",
      "commonMistakeAnswer": "A string of spaces passes `length() > 0`; always use `isBlank()` to detect meaningful non-whitespace content.",
      "keyPhrases": [
        "isEmpty() (length == 0)",
        "isBlank() (whitespace codepoint verification)",
        "zero allocation in isBlank() vs trim()",
        "production user input validation"
      ]
    },
    {
      "question": "How does Java handle Unicode Supplementary Characters, Surrogate Pairs, and Code Points?",
      "expectedAnswer": "Java's `char` type was designed around Unicode 1.1 when all characters fit in 16 bits (the Basic Multilingual Plane, BMP, U+0000 to U+FFFF). When Unicode expanded to 21 bits (up to U+10FFFF) to accommodate historical scripts, mathematical notations, and emojis, Java adopted UTF-16 variable-length encoding. Characters outside the BMP are encoded as two consecutive 16-bit code units called a 'surrogate pair': a high surrogate (\\uD800-\\uDBFF) followed by a low surrogate (\\uDC00-\\uDFFF). Consequently, methods like `str.length()` count 16-bit code units (returning 2 for an emoji like \ud83d\ude80), not visual characters. To handle true characters, developers must use code point methods: `str.codePointCount(0, str.length())` returns the true character count, and `str.codePoints()` returns an `IntStream` of 32-bit Unicode code points.",
      "followUp": "What happens if you reverse a string containing an emoji using a naive char loop?",
      "followUpAnswer": "It swaps the high surrogate and low surrogate, corrupting the emoji into two invalid unprintable replacement characters. `StringBuilder.reverse()` is surrogate-aware and preserves pair order.",
      "commonMistake": "Iterating over characters using `str.charAt(i)` when handling international or emoji text.",
      "commonMistakeAnswer": "charAt(i) can split surrogate pairs; use `codePointAt(i)` and advance indices with `Character.charCount(codePoint)`.",
      "keyPhrases": [
        "UTF-16 Basic Multilingual Plane (BMP)",
        "high surrogate and low surrogate pair",
        "length() vs codePointCount()",
        "surrogate-aware StringBuilder.reverse()"
      ]
    },
    {
      "question": "Explain compile-time constant folding of String expressions in Java.",
      "expectedAnswer": "Per JLS \u00a715.28, the Java compiler performs compile-time constant folding on expressions where all operands are compile-time constants (such as string literals, primitive literals, and `final` variables initialized with constant expressions). In `String s = \"A\" + \"B\" + \"C\";`, javac evaluates the concatenation at compile time and emits `ldc \"ABC\"` directly into the bytecode constant pool table. Similarly, if `final String prefix = \"LOG_\"; String code = prefix + \"01\";`, javac inlines `prefix` and folds `code` into `\"LOG_01\"`. Because the folded result is placed in the String Constant Pool, `code == \"LOG_01\"` evaluates to `true`. If any operand is non-final or a method call, folding is disabled and evaluation is deferred to runtime.",
      "followUp": "Does `final String s = getPrefix();` participate in compile-time constant folding?",
      "followUpAnswer": "No. Because `getPrefix()` is a runtime method invocation, `s` is not a compile-time constant expression.",
      "commonMistake": "Assuming `c == \"AB\"` is always false when `c` was produced by concatenation.",
      "commonMistakeAnswer": "If `c` was produced by concatenating constants, it is folded into the pool and `==` evaluates to true.",
      "keyPhrases": [
        "JLS \u00a715.28 constant expression folding",
        "compile-time ldc opcode emission",
        "final variable inlining",
        "runtime vs compile-time evaluation"
      ]
    },
    {
      "question": "What is String Deduplication (-XX:+UseStringDeduplication) in G1 Garbage Collector?",
      "expectedAnswer": "String Deduplication is a JVM Garbage Collection optimization available in the G1 GC (Java 8u20+) and ZGC/Shenandoah in modern Java. While the String Constant Pool deduplicates literals at class-loading time, typical enterprise applications allocate millions of identical String objects dynamically at runtime (e.g. from JSON payloads or database queries). String Deduplication runs concurrently during GC passes: it inspects live String objects that have survived minor GC cycles, calculates their character hashes, and if two String instances have identical character contents, it reassigns the `value` array pointer of one String to share the `value` array of the other, freeing the redundant array memory.",
      "followUp": "How does String Deduplication differ from `String.intern()`?",
      "followUpAnswer": "`intern()` requires explicit code changes and pollutes the native StringTable. String Deduplication is completely transparent, automatic, requires no code modifications, and operates directly during GC.",
      "commonMistake": "Thinking String Deduplication merges the String objects themselves.",
      "commonMistakeAnswer": "It merges only the internal backing `byte[] value` arrays; the two String object headers remain distinct.",
      "keyPhrases": [
        "-XX:+UseStringDeduplication G1 flag",
        "backing byte[] array sharing",
        "zero code change transparent optimization",
        "elimination of duplicate heap payloads"
      ]
    },
    {
      "question": "Why should password fields be stored in `char[]` instead of `String` in secure Java applications?",
      "expectedAnswer": "Storing passwords in `String` introduces severe security vulnerabilities due to String immutability and memory retention: 1) Non-Clearable Memory: Because String is immutable, once a password string is created, its characters remain in the Java heap until garbage collected and overwritten. If an attacker dumps the application memory (core dump, heap dump, or cold boot attack), plain-text passwords can be extracted hours after login. 2) String Pool Risk: If the password string is interned, it stays in memory indefinitely. In contrast, storing passwords in `char[]` allows developers to explicitly overwrite the array memory with zeros (`Arrays.fill(password, '0')`) immediately after authentication, zeroing out sensitive credentials from RAM.",
      "followUp": "How does the Java Cryptography Architecture (JCA) enforce this standard?",
      "followUpAnswer": "Security APIs like `KeyStore.PasswordProtection` and `PBEKeySpec` require `char[]` rather than `String` for passwords.",
      "commonMistake": "Converting a char[] password into a String before calling an authentication method.",
      "commonMistakeAnswer": "Creating a temporary String defeats the purpose of char[]; the plain text is immediately captured in immutable heap memory.",
      "keyPhrases": [
        "memory zeroing via Arrays.fill()",
        "heap dump plain-text extraction prevention",
        "String immutability memory retention risk",
        "JCA PBEKeySpec char[] standard"
      ]
    }
  ]
}
};
