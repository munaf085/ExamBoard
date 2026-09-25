import { DetailedLesson } from '../../detailedLessons';

export const lesson6_3: Record<string, DetailedLesson> = {
  'string-methods-and-manipulation': {
    id: 'string-methods-and-manipulation',
    moduleId: 'java-strings',
    moduleTitle: '6. Strings & String Pool',
    lessonNumber: 'Lesson 6.3',
    title: 'Essential String Methods & Manipulation',
    subtitle: 'Inspection, extraction, searching, transforming, trimming, splitting, and character traversal',
    estimatedMinutes: 18,
    beginnerAnalogy: 'Imagine an archival microfilm reel containing a precious document. You cannot cut into the microfilm or scratch out characters because the master film is sealed in a glass museum case (immutable). However, you have an ultra-modern digital scanner: you can measure its exact frame count (`length()`), view the character at frame 4 (`charAt(4)`), search for the timestamp where "Apollo" appears (`indexOf("Apollo")`), make a pristine digital photo of frames 10 through 25 (`substring(10, 26)`), polish off dust at the edges (`trim()`), replace all commas with semicolons (`replace()`), or print each word onto separate index cards (`split(" ")`). The original microfilm remains untouched, but you have full power to generate any new document you need.',
    interviewTakeaways: [
      'Zero-Based Indexing & Bounds: String characters are indexed from 0 to length() - 1; attempting to access index >= length() or index < 0 throws StringIndexOutOfBoundsException.',
      'Half-Open Substring Convention: The method substring(beginIndex, endIndex) includes beginIndex but excludes endIndex [beginIndex, endIndex); the length of the extracted substring is exactly (endIndex - beginIndex).',
      'Searching Semantics: indexOf() and lastIndexOf() return -1 when the requested character or substring is not found; they support an optional fromIndex to iterate over multiple occurrences.',
      'replace() vs replaceAll(): Both replace ALL occurrences in the string; the critical difference is that replace() treats targets as literal character sequences, while replaceAll() interprets the target as a Regular Expression (regex).',
      'trim() vs strip(): trim() removes characters with ASCII value <= 32 (standard whitespace); strip() (Java 11+) is Unicode-aware and correctly strips all Unicode whitespace (such as non-breaking spaces).'
    ],
    cheatSheet: {
      summary: 'Comprehensive reference of standard java.lang.String inspection, search, extraction, and transformation methods.',
      syntaxTemplate: `// Inspection
int len = str.length();
char c = str.charAt(0);
boolean empty = str.isEmpty();
boolean blank = str.isBlank(); // Java 11+

// Extraction
String sub = str.substring(beginIndex, endIndex); // [begin, end)

// Search
int first = str.indexOf("cat");
int last = str.lastIndexOf("cat");
boolean has = str.contains("cat");

// Transformation
String upper = str.toUpperCase();
String clean = str.trim();
String replaced = str.replace('a', 'o');
String[] parts = str.split(",");`,
      rules: [
        { rule: 'Parentheses on Length', explanation: 'Strings use the method length() with parentheses, whereas primitive arrays use the property .length without parentheses.' },
        { rule: 'Exclusive End Index', explanation: 'substring(start, end) excludes end. str.substring(0, 3) takes indices 0, 1, 2 (3 characters total).' },
        { rule: 'Search Missing Flag', explanation: 'indexOf() and lastIndexOf() return -1 when no match exists. Always check if (index != -1) before using the result.' },
        { rule: 'Replace Replaces All', explanation: 'Contrary to common intuition, replace("a", "b") replaces EVERY occurrence of "a" in the string, not just the first one.' },
        { rule: 'Regex Sensitivity in split', explanation: 'split(regex) uses regular expressions. Splitting on a dot requires escaping: split("\\\\.") because dot is a regex wildcard.' },
        { rule: 'Defensive Bounds Check', explanation: 'Always check (index >= 0 && index < str.length()) before invoking charAt(index) to avoid StringIndexOutOfBoundsException.' }
      ],
      quickComparison: [
        { aspect: 'Method Pair', optionA: 'Option A', optionB: 'Option B' },
        { aspect: 'length() vs .length', optionA: 'str.length(): Method call on String objects', optionB: 'arr.length: Public final field on array types' },
        { aspect: 'replace vs replaceAll', optionA: 'replace(): Literal character/string match', optionB: 'replaceAll(): Compiles target into a Regular Expression' },
        { aspect: 'trim() vs strip()', optionA: 'trim(): Strips ASCII <= 32 whitespace only', optionB: 'strip(): Unicode-compliant whitespace removal (Java 11+)' },
        { aspect: 'isEmpty() vs isBlank()', optionA: 'isEmpty(): true ONLY if length() == 0', optionB: 'isBlank(): true if length() == 0 OR string contains only whitespace' }
      ]
    },
    coreExplanation: [
      'String Length and Character Access: The length() method returns the count of UTF-16 code units in the string. Individual characters are accessed via `charAt(int index)`. Because indexing is 0-based, valid indices range strictly from 0 to length() - 1. Accessing index == length() immediately throws `StringIndexOutOfBoundsException`.',
      'Substring Extraction: String provides two overloaded substring methods: `substring(int beginIndex)` extracts from beginIndex to the end of the string; `substring(int beginIndex, int endIndex)` extracts characters from beginIndex (inclusive) up to endIndex (exclusive). Notice that `endIndex - beginIndex` always equals the length of the extracted slice.',
      'Search and Inspection: `indexOf(int ch / String str)` scans forward from index 0 and returns the first matching index, or -1 if not found. `lastIndexOf(...)` scans backward from the end. Both methods accept an optional second argument `fromIndex` to start searching from an offset, enabling loops that find all occurrences.',
      'Boolean Inspection Helpers: `contains(CharSequence s)` checks whether the target exists anywhere in the string. `startsWith(String prefix)` and `endsWith(String suffix)` test if the string starts or finishes with the exact sequence without performing full substring extraction.',
      'Case Transformation: `toLowerCase()` and `toUpperCase()` convert all characters to lowercase or uppercase using the default locale rules. Remember that because strings are immutable, these methods leave the original string unchanged and return a newly constructed String object.',
      'Whitespace Stripping: `trim()` removes leading and trailing characters whose code points are less than or equal to `\'\\u0020\'` (ASCII space). Java 11 introduced `strip()`, `stripLeading()`, and `stripTrailing()`, which use Character.isWhitespace() to handle modern Unicode whitespace like non-breaking space (\\u00A0).',
      'String Replacement: `replace(char oldChar, char newChar)` and `replace(CharSequence target, CharSequence replacement)` replace ALL occurrences of the target with the replacement literally. In contrast, `replaceAll(String regex, String replacement)` and `replaceFirst(...)` treat the first argument as a regular expression pattern.',
      'Splitting and Conversions: `split(String regex)` splits the string around matches of the regular expression and returns a `String[]` array. `toCharArray()` copies characters into a fresh mutable `char[]` array, ideal for algorithms requiring in-place character swapping.'
    ],
    diagram: `+========================================================================+
|                    STRING INDEXING & SUBSTRING SLICING                 |
+========================================================================+
|  Characters:   | J | a | v | a | P | o | o | l |                       |
|  Indices:      | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |                       |
|  Length = 8                                                            |
+------------------------------------------------------------------------+
|  str.charAt(0) -> 'J'                                                  |
|  str.charAt(3) -> 'a'                                                  |
|  str.charAt(7) -> 'l'  (Last valid index = length() - 1)               |
|  str.charAt(8) -> StringIndexOutOfBoundsException!                     |
+------------------------------------------------------------------------+
|  SUBSTRING: str.substring(beginIndex, endIndex) -> [begin, end)        |
|                                                                        |
|    str.substring(0, 4)                                                 |
|    Indices: [0, 1, 2, 3]  (excludes index 4!)                          |
|    Result:  "Java"        (length = 4 - 0 = 4)                         |
|                                                                        |
|    str.substring(4)                                                    |
|    Indices: [4, 5, 6, 7]  (from index 4 to end)                        |
|    Result:  "Pool"        (length = 8 - 4 = 4)                         |
+========================================================================+`,
    codeSnippet: {
      title: 'Essential String Methods in Action',
      code: `public class StringMethodsDemo {
    public static void main(String[] args) {
        String data = "  Platform: Java 21 LTS  ";

        // Cleaning whitespace and measuring length
        String clean = data.trim();
        System.out.println("Trimmed: [" + clean + "]");
        System.out.println("Length: " + clean.length());

        // Substring extraction
        int colonIndex = clean.indexOf(':');
        String platform = clean.substring(0, colonIndex);
        String version = clean.substring(colonIndex + 2); // skip ": "

        System.out.println("Platform: " + platform);
        System.out.println("Version:  " + version);
    }
}`,
      lineByLineExplanation: [
        { line: 'String clean = data.trim();', explanation: 'Strips leading and trailing spaces, producing "Platform: Java 21 LTS".' },
        { line: 'System.out.println("Length: " + clean.length());', explanation: 'Returns 21, the exact character count of the trimmed string.' },
        { line: 'int colonIndex = clean.indexOf(\':\');', explanation: 'Finds the first occurrence of \':\', which is at index 8.' },
        { line: 'clean.substring(0, colonIndex);', explanation: 'Extracts characters from index 0 up to 8 (exclusive), yielding "Platform".' },
        { line: 'clean.substring(colonIndex + 2);', explanation: 'Extracts from index 10 to the end, skipping the colon and following space to yield "Java 21 LTS".' }
      ],
      output: `Trimmed: [Platform: Java 21 LTS]
Length: 21
Platform: Platform
Version:  Java 21 LTS`
    },
    codeExamples: [
      {
        title: 'Example 1: Parsing Key-Value Pairs with indexOf and Substring',
        description: 'Demonstrating how to parse configuration parameters safely using string inspection.',
        code: `public class ConfigParser {
    public static void main(String[] args) {
        String entry = "database.port=5432";

        int separator = entry.indexOf('=');
        if (separator != -1) {
            String key = entry.substring(0, separator);
            String value = entry.substring(separator + 1);
            System.out.println("Key:   " + key);
            System.out.println("Value: " + value);
        }
    }
}`,
        output: `Key:   database.port
Value: 5432`
      },
      {
        title: 'Example 2: Two-Pointer Palindrome Verification with charAt()',
        description: 'Checking whether a string is a palindrome by comparing characters from outer boundaries moving inward.',
        code: `public class PalindromeCheck {
    public static void main(String[] args) {
        String test = "racecar";
        boolean palindrome = true;

        for (int i = 0, j = test.length() - 1; i < j; i++, j--) {
            if (test.charAt(i) != test.charAt(j)) {
                palindrome = false;
                break;
            }
        }

        System.out.println(test + " is palindrome: " + palindrome);
    }
}`,
        output: 'racecar is palindrome: true'
      },
      {
        title: 'Example 3: Safe Token Splitting and Reconstruction',
        description: 'Splitting comma-separated values and transforming them in a loop.',
        code: `public class CsvProcessor {
    public static void main(String[] args) {
        String csv = "apple,banana,cherry,date";
        String[] fruits = csv.split(",");

        for (int i = 0; i < fruits.length; i++) {
            System.out.println((i + 1) + ". " + fruits[i].toUpperCase());
        }
    }
}`,
        output: `1. APPLE
2. BANANA
3. CHERRY
4. DATE`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using str.length without parentheses (like arr.length).',
        whyItHappens: 'In Java, arrays have a .length field, but String has a .length() method. Confusing the two causes a compile-time error.',
        howToFix: 'Remember: arrays use fields (arr.length); Strings use methods (str.length()).'
      },
      {
        mistake: 'Off-by-one error with charAt(str.length()).',
        whyItHappens: 'Forgetting that strings are 0-indexed. A string of length 5 has characters at indices 0, 1, 2, 3, 4. Accessing index 5 throws StringIndexOutOfBoundsException.',
        howToFix: 'The last valid character is always at str.charAt(str.length() - 1).'
      },
      {
        mistake: 'Forgetting that substring(begin, end) excludes the endIndex.',
        whyItHappens: 'Assuming substring(0, 3) includes index 3. In reality, it only extracts indices 0, 1, and 2.',
        howToFix: 'Remember the length rule: the number of characters returned by substring(a, b) is always exactly (b - a).'
      },
      {
        mistake: 'Splitting on a period with split(".") without escaping.',
        whyItHappens: 'split() takes a regular expression. In regex, "." matches ANY character, so split(".") splits on every single character, returning an empty array.',
        howToFix: 'Escape the dot with double backslashes: split("\\\\.") or use Pattern.quote(".").'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Half-Open Substring Extraction',
        problemStatement: 'What does this code snippet output?',
        code: `String s = "Developer";
System.out.print(s.substring(2, 6));`,
        options: [
          'velop',
          'velo',
          'elop',
          'elo'
        ],
        correctOptionIndex: 1,
        hint: 'Indices extracted are 2, 3, 4, 5. What characters are at those indices?',
        solution: 'velo',
        explanation: 'Index 0=\'D\', 1=\'e\', 2=\'v\', 3=\'e\', 4=\'l\', 5=\'o\', 6=\'p\'. The range [2, 6) extracts indices 2 through 5: \'v\', \'e\', \'l\', \'o\', which is "velo".'
      },
      {
        title: 'Puzzle 2: Last Valid Index Boundary',
        problemStatement: 'What happens when running this code?',
        code: `String s = "Java";
System.out.print(s.charAt(s.length()));`,
        options: [
          'Prints \'a\'',
          'Prints null',
          'Throws StringIndexOutOfBoundsException',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'What is s.length() for "Java"? What is the index of the final character?',
        solution: 'Throws StringIndexOutOfBoundsException',
        explanation: '"Java" has length 4. Its valid indices are 0, 1, 2, 3. Calling s.charAt(4) attempts to access an out-of-bounds index and throws StringIndexOutOfBoundsException.'
      },
      {
        title: 'Puzzle 3: Replace Method Scope',
        problemStatement: 'What is printed after executing the replacement?',
        code: `String s = "banana";
String res = s.replace('a', 'o');
System.out.print(res);`,
        options: [
          'bonana',
          'bonono',
          'banana',
          'bonano'
        ],
        correctOptionIndex: 1,
        hint: 'Does replace() replace only the first occurrence or all occurrences?',
        solution: 'bonono',
        explanation: 'String.replace(char, char) replaces ALL occurrences of the target character throughout the entire string, turning all three \'a\'s into \'o\'s to make "bonono".'
      },
      {
        title: 'Puzzle 4: Missing Index Search Result',
        problemStatement: 'What is printed by this search sequence?',
        code: `String phrase = "Cloud Computing";
int pos1 = phrase.indexOf("put");
int pos2 = phrase.indexOf("xyz");
System.out.print(pos1 + " " + pos2);`,
        options: [
          '9 0',
          '9 -1',
          '10 -1',
          '8 -1'
        ],
        correctOptionIndex: 1,
        hint: 'What integer does indexOf return when the search string does not exist?',
        solution: '9 -1',
        explanation: '"Cloud " has length 6, "Com" is 3 chars, so "put" starts at index 6 + 3 = 9. "xyz" does not exist in the string, so indexOf returns -1.'
      },
      {
        title: 'Puzzle 5: Substring with Identical Begin and End',
        problemStatement: 'What is returned by s.substring(3, 3) on any non-empty String of length >= 3?',
        options: [
          'The character at index 3',
          'An empty string ""',
          'Throws StringIndexOutOfBoundsException',
          'null'
        ],
        correctOptionIndex: 1,
        hint: 'What is the length of a slice where beginIndex == endIndex (3 - 3)?',
        solution: 'An empty string ""',
        explanation: 'When beginIndex equals endIndex, the slice has length (3 - 3) = 0. As long as index 3 is within 0 <= index <= length(), it safely returns an empty string "".'
      },
      {
        title: 'Puzzle 6: trim() vs Original String',
        problemStatement: 'What does this code snippet print?',
        code: `String raw = "  code  ";
raw.trim();
System.out.print("[" + raw + "]");`,
        options: [
          '[code]',
          '[  code  ]',
          '[code  ]',
          '[  code]'
        ],
        correctOptionIndex: 1,
        hint: 'Is the return value of trim() assigned back to raw?',
        solution: '[  code  ]',
        explanation: 'Because Strings are immutable, raw.trim() returns a trimmed copy without altering raw. Since raw was not reassigned, it still holds "  code  ".'
      },
      {
        title: 'Puzzle 7: startsWith and endsWith Validation',
        problemStatement: 'What is printed by the boolean expression?',
        code: `String path = "/var/log/syslog.log";
boolean b = path.startsWith("/var") && path.endsWith(".log");
System.out.print(b);`,
        options: [
          'true',
          'false',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctOptionIndex: 0,
        hint: 'Does path start with "/var"? Does it end with ".log"?',
        solution: 'true',
        explanation: 'path starts with "/var" at index 0 and terminates with ".log". Both conditions evaluate to true, so true && true yields true.'
      },
      {
        title: 'Puzzle 8: Regex Split on Dot Trap',
        problemStatement: 'What is printed by this IP address parsing snippet?',
        code: `String ip = "192.168.1.1";
String[] parts = ip.split("\\\\.");
System.out.print(parts.length + "-" + parts[0]);`,
        options: [
          '0-',
          '4-192',
          '1-192.168.1.1',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Notice the double backslash "\\\\." correctly escapes the regex dot.',
        solution: '4-192',
        explanation: 'Because the dot is escaped with "\\\\.", split treats it as a literal period delimiter. The string splits into 4 parts: ["192", "168", "1", "1"]. parts.length is 4, and parts[0] is "192".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why did substring() in Java 7 update 6 change its internal implementation, and what memory leak did that change resolve?',
        answer: 'Prior to Java 7u6, String.substring() shared the parent String\'s internal char[] array, simply adjusting `offset` and `count` fields. While this made substring an O(1) operation, it caused severe memory leaks: if you extracted a small 5-character substring from a 10MB document string, the small substring retained a reference to the entire 10MB char array, preventing the 10MB buffer from being garbage collected. In Java 7u6, Oracle changed substring() to always allocate a new, compact copy of the character array (`Arrays.copyOfRange`). Substring became O(N) in time, but completely solved the memory leak.',
        followUp: 'How can you verify that a substring in modern Java is a separate array in memory?',
        followUpAnswer: 'In modern Java, you can inspect memory with profilers or note that since Java 9 Compact Strings, each String instance encapsulates its own private byte[] array sized exactly to the substring length plus coder byte, with no shared backing array.',
        keyPhrases: ['Shared backing char[] array', 'offset and count fields', 'Memory retention leak', 'Arrays.copyOfRange', 'Java 7u6 redesign'],
        commonMistakeAnswer: 'Thinking substring still shares the underlying char array in modern Java versions.'
      },
      {
        question: 'What is the difference between replace() and replaceAll() in java.lang.String?',
        answer: 'Both methods replace ALL occurrences of a pattern in the string. The critical distinction lies in how the first argument is interpreted: replace(CharSequence, CharSequence) treats the search target as a literal sequence of characters. In contrast, replaceAll(String, String) compiles the first argument into a Regular Expression (java.util.regex.Pattern). For example, replace(".", "_") replaces periods literally, while replaceAll(".", "_") matches ANY character and turns the entire string into underscores!',
        followUp: 'What is the performance implication of using replaceAll() when a literal replace() would suffice?',
        followUpAnswer: 'replaceAll() compiles a regex Pattern on every call, which incurs substantial CPU overhead for parsing, compiling the NFA/DFA state machine, and matching. replace() performs a fast, literal character scan with much lower overhead.',
        keyPhrases: ['Literal replacement vs Regular Expression', 'Pattern compilation overhead', 'Dot wildcard trap in replaceAll', 'CharSequence vs regex String'],
        commonMistakeAnswer: 'Assuming replace() replaces only the first occurrence while replaceAll() replaces all occurrences.'
      },
      {
        question: 'How do isEmpty() and isBlank() differ, and when was isBlank() introduced?',
        answer: 'isEmpty() was introduced in Java 6 and returns true if and only if `length() == 0`. If a string contains spaces, tabs, or newlines, isEmpty() returns false. Java 11 introduced isBlank(): it returns true if `length() == 0` OR if every character in the string is a whitespace character according to `Character.isWhitespace()`. For example, `"   ".isEmpty()` is false, but `"   ".isBlank()` is true.',
        followUp: 'Why is isBlank() preferred for validating user form inputs?',
        followUpAnswer: 'Because users frequently submit inputs with only spaces or accidental tabs. Previously, developers had to write `str.trim().isEmpty()`, which allocated an unnecessary temporary trimmed String on the heap. isBlank() checks characters without any heap allocation.',
        keyPhrases: ['Java 11 isBlank()', 'length() == 0 check', 'Whitespace-only detection', 'Zero heap allocation validation', 'Character.isWhitespace()'],
        commonMistakeAnswer: 'Thinking isBlank() and isEmpty() are identical, or claiming isBlank() was available in Java 8.'
      },
      {
        question: 'Explain why str.split(".") returns an empty array or unexpected results, and how to fix it.',
        answer: 'The split(String regex) method expects a regular expression. In regex syntax, a lone dot (`.`) is a wildcard metacharacter that matches ANY character. When split(".") is executed, every single character in the string matches the delimiter. The string is chopped between every character, and trailing empty strings are discarded, resulting in an empty array `String[0]`. To split by a literal dot, the dot must be escaped: `str.split("\\\\.")` or `str.split(Pattern.quote("."))`.',
        followUp: 'What other characters require regex escaping when used as split delimiters?',
        followUpAnswer: 'Characters with special regex meanings, including `|` (pipe), `+` (plus), `*` (star), `?` (question mark), `(` and `)` (parentheses), and `[` and `]` (brackets), all require escaping (`\\\\|`, etc.) when used with split().',
        keyPhrases: ['Regex metacharacter wildcard', 'Double backslash escaping (\\\\.)', 'Pattern.quote()', 'Trailing empty token stripping'],
        commonMistakeAnswer: 'Believing split() always uses literal character matching like indexOf().'
      },
      {
        question: 'What is the difference between trim(), strip(), stripLeading(), and stripTrailing()?',
        answer: 'trim() was created in Java 1.0 and strips characters with codepoints <= `\'\\u0020\'` (the ASCII space). However, it does not recognize non-ASCII Unicode whitespaces such as the non-breaking space (\\u00A0) or thin space. Java 11 introduced strip(), which is fully Unicode-aware and uses `Character.isWhitespace(int)` to strip all whitespace from both ends. Java 11 also added stripLeading() (strips only start whitespace) and stripTrailing() (strips only end whitespace).',
        followUp: 'Why was trim() not simply retrofitted to handle Unicode whitespace in Java 11?',
        followUpAnswer: 'Because altering trim()\'s behavior would break backward compatibility for legacy applications that specifically relied on trim() only stripping ASCII characters <= 32.',
        keyPhrases: ['Unicode-aware whitespace', 'Character.isWhitespace()', 'Backward compatibility preservation', 'stripLeading and stripTrailing', 'Java 11 enhancement'],
        commonMistakeAnswer: 'Thinking trim() and strip() do the exact same thing in modern Java.'
      },
      {
        question: 'How do indexOf() and lastIndexOf() work with the fromIndex parameter?',
        answer: 'Both methods accept a second parameter, `fromIndex`. In `indexOf(str, fromIndex)`, the forward search begins scanning from `fromIndex` toward the end of the string. In `lastIndexOf(str, fromIndex)`, the backward search begins at `fromIndex` and scans toward index 0 (matching the last occurrence that starts at or before `fromIndex`). This allows building loops to discover all occurrences of a token without modifying the original string.',
        followUp: 'What happens if fromIndex is negative in indexOf(), or greater than length in lastIndexOf()?',
        followUpAnswer: 'In indexOf(), a negative fromIndex is clamped to 0 (searches the whole string). In lastIndexOf(), a fromIndex >= length() is clamped to length() - 1.',
        keyPhrases: ['fromIndex offset parameter', 'Forward scan vs backward scan', 'Looping multiple matches', 'Index clamping rules'],
        commonMistakeAnswer: 'Assuming a negative fromIndex in indexOf() throws an IndexOutOfBoundsException.'
      },
      {
        question: 'What is the time complexity of String.length(), charAt(), indexOf(), and substring() in Java?',
        answer: 'String.length() is O(1) because length is stored directly in an internal field. charAt(i) is O(1) because it performs a direct array index access into the underlying byte/char array. indexOf(target) is O(N * M) in the worst case (where N is string length and M is target length), though average performance is near O(N). substring(start, end) is O(K) where K = end - start, because it copies K bytes into a new array.',
        followUp: 'Why was substring() O(1) before Java 7u6?',
        followUpAnswer: 'Because prior to Java 7u6, it did not copy characters; it simply created a new String object pointing to the parent\'s char[] with offset and count fields.',
        keyPhrases: ['O(1) field lookup for length', 'O(1) array index for charAt', 'O(K) character array copy for substring', 'O(N) search complexity'],
        commonMistakeAnswer: 'Claiming that String.length() has to loop through characters to count them like strlen() in C.'
      },
      {
        question: 'What is the purpose of toCharArray(), and when should you prefer it over charAt() in a loop?',
        answer: 'toCharArray() creates a brand-new mutable `char[]` array containing a copy of all characters in the String. While calling charAt(i) in a simple loop has no allocation overhead, converting to `char[]` is preferred when: (1) you need to perform in-place swaps (like reversing or sorting characters), (2) you want to use enhanced for-each loops (`for (char c : str.toCharArray())`), or (3) you want to clear sensitive data (like passwords) from memory immediately after use.',
        followUp: 'Why should passwords be stored in char[] rather than String in Java?',
        followUpAnswer: 'Strings are immutable and cached in pool or heap memory until garbage collected, leaving plain-text passwords visible in heap dumps. A char[] can be explicitly wiped (e.g. `Arrays.fill(pwd, \'0\')`) immediately after verification.',
        keyPhrases: ['Defensive character copy', 'In-place array mutations', 'Security memory wiping', 'Heap dump exposure risk'],
        commonMistakeAnswer: 'Saying toCharArray() gives you direct access to the String\'s internal private array without copying.'
      },
      {
        question: 'How does String.repeat(int count) work, and when was it introduced?',
        answer: 'Introduced in Java 11, `repeat(int count)` returns a new String consisting of the original string repeated `count` times. If count is 0, it returns an empty string `""`. If count is 1, it returns the string itself. If count is negative, it throws `IllegalArgumentException`. Internally, it calculates the exact total length upfront and uses System.arraycopy to replicate the bytes rapidly, far outperforming manual loop concatenation.',
        followUp: 'What happens if repeating a string causes its length to exceed Integer.MAX_VALUE?',
        followUpAnswer: 'It throws an OutOfMemoryError, as Java arrays and strings cannot exceed Integer.MAX_VALUE - 8 elements.',
        keyPhrases: ['Java 11 repeat()', 'System.arraycopy byte replication', 'Pre-allocated buffer', 'IllegalArgumentException on negative count'],
        commonMistakeAnswer: 'Thinking repeat() was in Java 8, or that it uses a StringBuilder loop internally.'
      },
      {
        question: 'What happens when you pass null as an argument to String methods like contains(), startsWith(), or replace()?',
        answer: 'Most String methods (such as contains(CharSequence), startsWith(String), endsWith(String), indexOf(String), and replace(CharSequence, CharSequence)) explicitly reject null arguments and immediately throw a NullPointerException. The String class requires valid, non-null sequences to perform character matching.',
        followUp: 'Is there any String method where passing null does NOT throw an exception?',
        followUpAnswer: 'Yes! `String.valueOf(null)` returns the string literal `"null"` without throwing an exception, and `str.equals(null)` returns false safely.',
        keyPhrases: ['Explicit NullPointerException check', 'String.valueOf(null) exception', 'equals(null) safety'],
        commonMistakeAnswer: 'Assuming contains(null) returns false instead of throwing NullPointerException.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does str.substring(1, 4) return for the string "Computer"?',
        options: [
          '"Com"',
          '"omp"',
          '"ompu"',
          '"mpu"'
        ],
        correctIndex: 1,
        explanation: 'Indices extracted are 1, 2, 3 (endIndex 4 is exclusive). Index 1=\'o\', 2=\'m\', 3=\'p\', returning "omp".'
      },
      {
        question: 'What is the return value of "Java".indexOf("x")?',
        options: [
          '0',
          'null',
          '-1',
          'Throws IndexOutOfBoundsException'
        ],
        correctIndex: 2,
        explanation: 'When the search character or string is not found, indexOf() returns -1.'
      },
      {
        question: 'What does "  ".isEmpty() and "  ".isBlank() return in Java 11+?',
        options: [
          'true and true',
          'false and false',
          'false and true',
          'true and false'
        ],
        correctIndex: 2,
        explanation: 'isEmpty() is false because length is 2 (not 0). isBlank() is true because all characters are whitespace.'
      },
      {
        question: 'What is the length of str.substring(2, 7)?',
        options: [
          '5',
          '6',
          '7',
          '4'
        ],
        correctIndex: 0,
        explanation: 'The length of any substring(begin, end) slice is always exactly (end - begin) = 7 - 2 = 5.'
      },
      {
        question: 'What is the last valid index of a String named text?',
        options: [
          'text.length()',
          'text.length() - 1',
          'text.length() + 1',
          'text.size()'
        ],
        correctIndex: 1,
        explanation: 'Because Java strings are 0-indexed, the indices range from 0 to text.length() - 1.'
      },
      {
        question: 'What does "banana".replace("an", "XX") return?',
        options: [
          '"bXXana"',
          '"bXXXXa"',
          '"banana"',
          '"bXXa"'
        ],
        correctIndex: 1,
        explanation: 'replace() replaces ALL occurrences of the target sequence, turning both "an" segments into "XX", yielding "bXXXXa".'
      },
      {
        question: 'Why does "192.168.0.1".split(".") fail to split properly?',
        options: [
          'Because dots cannot be used as delimiters in Java',
          'Because split() accepts a regex, and "." matches any character',
          'Because split() requires single quotes for characters',
          'Because IP addresses are too long'
        ],
        correctIndex: 1,
        explanation: 'In regular expressions, "." matches any character. To split by a literal dot, use "\\\\.".'
      },
      {
        question: 'What does "HELLO".toLowerCase() do to the original string "HELLO"?',
        options: [
          'Changes it to "hello" in place',
          'Nothing; it returns a new string "hello" and leaves "HELLO" intact',
          'Converts it to lowercase and interns it',
          'Deletes the uppercase string'
        ],
        correctIndex: 1,
        explanation: 'Strings are immutable. toLowerCase() returns a new lowercase string while leaving the original untouched.'
      },
      {
        question: 'What does str.charAt(0) return if str = ""?',
        options: [
          'null',
          '\'\\0\'',
          'Throws StringIndexOutOfBoundsException',
          'Throws NullPointerException'
        ],
        correctIndex: 2,
        explanation: 'An empty string has length 0, so index 0 is out of bounds, throwing StringIndexOutOfBoundsException.'
      },
      {
        question: 'Which method removes only the leading whitespace of a String in Java 11+?',
        options: [
          'trimLeft()',
          'stripLeading()',
          'ltrim()',
          'stripStart()'
        ],
        correctIndex: 1,
        explanation: 'Java 11 introduced stripLeading() to remove leading whitespace and stripTrailing() for trailing whitespace.'
      }
    ]
  }
};
