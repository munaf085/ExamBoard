import { DetailedLesson } from '../../detailedLessons';

export const lesson6_2: Record<string, DetailedLesson> = {
  'string-equality-and-comparisons': {
    id: 'string-equality-and-comparisons',
    moduleId: 'java-strings',
    moduleTitle: '6. Strings & String Pool',
    lessonNumber: 'Lesson 6.2',
    title: 'String Equality: == vs .equals() & SCP',
    subtitle: 'Reference identity vs value equality, equalsIgnoreCase(), compareTo(), compile-time constants, and the intern() mechanism',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Imagine two people holding identical brass keys cut from the same locksmith mold to open apartment 4B. If you ask: "Are these two keys the exact same physical piece of metal?" (`==`), the answer is NO—they are two separate metal objects held in two different hands at different locations. But if you ask: "Do both keys open the exact same apartment door and have the exact same teeth pattern?" (`.equals()`), the answer is YES! In Java, `==` compares the physical memory addresses of two references, while `.equals()` unlocks and inspects the actual characters inside.',
    interviewTakeaways: [
      'Reference vs Value Equality: `==` tests whether two references point to the exact same memory address on the heap/SCP; `.equals()` compares the actual sequence of characters character-by-character.',
      'Compile-Time Constant Folding: The Java compiler evaluates concatenations of constant string literals (e.g., "a" + "b") at compile time, placing the merged string ("ab") directly in the SCP so `==` returns true.',
      'Runtime Concatenation: Concatenations involving variables (e.g., s1 + s2 or s1 + "b") execute dynamically at runtime, creating a brand-new object on the heap where `==` returns false.',
      'compareTo() Lexicographical Contract: compareTo() returns a negative integer if this string precedes the argument, 0 if equal, and a positive integer if it succeeds, based on the Unicode difference of the first differing characters.',
      'Null-Safe Comparisons: Writing `"CONSTANT".equals(variable)` prevents NullPointerException if variable is null, contrasting with `variable.equals("CONSTANT")` which throws an exception.'
    ],
    cheatSheet: {
      summary: 'String comparison in Java distinguishes between physical reference identity (==) and character sequence equivalence (.equals()), with compile-time constants pooled automatically.',
      syntaxTemplate: `// Content comparison (case-sensitive)
boolean sameContent = str1.equals(str2);

// Content comparison (case-insensitive)
boolean match = str1.equalsIgnoreCase(str2);

// Lexicographical ordering (returns negative, 0, or positive int)
int order = str1.compareTo(str2);

// Safe comparison against null
boolean safe = "EXPECTED".equals(untrustedInput);`,
      rules: [
        { rule: 'Never Use == for Content', explanation: 'Never use == to test if two strings contain the same text. Always use .equals() or .equalsIgnoreCase().' },
        { rule: 'Constant Folding Rule', explanation: 'javac automatically folds compile-time literal expressions like "A" + "B" into "AB" in the bytecode, sharing SCP identity.' },
        { rule: 'Runtime Non-Folding Rule', explanation: 'Any string expression containing non-final variables is computed at runtime via StringBuilder/invokedynamic, producing a new heap object.' },
        { rule: 'compareTo Return Value', explanation: 'compareTo returns char1 - char2 for the first differing character, or length1 - length2 if one string is a prefix of the other.' },
        { rule: 'Yoda Notation for Null Safety', explanation: 'Placing the known non-null literal on the left ("ACTIVE".equals(status)) eliminates NullPointerException risks.' },
        { rule: 'final Variable Folding', explanation: 'Variables declared `final String` and initialized with literals are treated as compile-time constants and folded by javac.' }
      ],
      quickComparison: [
        { aspect: 'Operator / Method', optionA: '== Operator', optionB: '.equals() Method' },
        { aspect: 'What is Compared?', optionA: 'Memory reference addresses (Stack pointers)', optionB: 'Underlying character sequence values (Heap payload)' },
        { aspect: 'SCP Literals ("a" == "a")', optionA: 'true (both point to the same SCP address)', optionB: 'true (same characters)' },
        { aspect: 'new String() Comparison', optionA: 'false (distinct heap addresses)', optionB: 'true (identical character content)' },
        { aspect: 'Null Safety', optionA: 'Safe: null == null returns true; s == null works', optionB: 'Throws NullPointerException if caller is null' }
      ]
    },
    coreExplanation: [
      'The identity operator `==` checks reference equality in Java: it verifies whether two reference variables point to the exact same memory location on the heap or SCP. It does not inspect the characters inside the string.',
      'The `.equals(Object obj)` method is overridden in java.lang.String to perform content comparison: it first checks reference equality (`this == obj`) for speed, then checks if the argument is a String, verifies lengths match, and finally compares the underlying byte/char arrays element-by-element.',
      'The `.equalsIgnoreCase(String anotherString)` method compares two strings while ignoring ASCII and Unicode case distinctions. It avoids allocating new strings because it does not call toLowerCase() or toUpperCase() internally.',
      'Compile-Time Constant Expressions: When the Java compiler (javac) sees `"hello" + "world"`, it knows both operands are immutable literals whose values are fixed at compile time. It combines them into `"helloworld"` directly in the generated .class file\'s constant pool.',
      'Dynamic Runtime Evaluation: When either operand is a variable (e.g. `String str = "hello"; String res = str + "world";`), the concatenation is executed dynamically at runtime using StringBuilder (or invokedynamic StringConcatFactory in Java 9+). This always creates a new object in the general heap, meaning `res == "helloworld"` is false.',
      'The `final` Modifier Influence: If a variable is declared `final String str = "hello";`, the compiler recognizes `str` as an inlined compile-time constant. Therefore, `str + "world"` IS folded at compile time, matching `"helloworld"` in the pool.',
      'Lexicographical Comparison with `compareTo()`: String implements `Comparable<String>`. The `compareTo(String other)` method iterates through both strings until characters differ at index `i`, returning `this.charAt(i) - other.charAt(i)`. If all characters match but lengths differ, it returns `this.length() - other.length()`.',
      'The Null Pointer Hazard: Invoking `userStr.equals("admin")` will crash with a `NullPointerException` if `userStr` is null. Writing `"admin".equals(userStr)` is completely null-safe because the string literal `"admin"` is guaranteed non-null, and equals() returns false when passed null.'
    ],
    diagram: `+========================================================================+
|                    EQUALITY OPERATOR vs .equals()                      |
+========================================================================+
|  STACK REFERENCES                 HEAP / POOL MEMORY                   |
|                                                                        |
|  [ s1 ] ------------------------> [ SCP: 0x1000 ] -> ['J','a','v','a'] |
|                                         ^                              |
|  [ s2 ] --------------------------------+                              |
|                                                                        |
|  [ s3 ] ------------------------> [ HEAP: 0x4000 ] -> ['J','a','v','a']|
|                                                                        |
+------------------------------------------------------------------------+
| 1. REFERENCE COMPARISON (==):                                          |
|    s1 == s2  --> 0x1000 == 0x1000  --> TRUE  (Identical Address)       |
|    s1 == s3  --> 0x1000 == 0x4000  --> FALSE (Different Addresses)     |
+------------------------------------------------------------------------+
| 2. CONTENT COMPARISON (.equals()):                                     |
|    s1.equals(s3):                                                      |
|      Step 1: Check length -> s1.len (4) == s3.len (4) -> TRUE          |
|      Step 2: Compare chars index-by-index:                             |
|              s1[0]=='J' == s3[0]=='J' -> TRUE                          |
|              s1[1]=='a' == s3[1]=='a' -> TRUE                          |
|              s1[2]=='v' == s3[2]=='v' -> TRUE                          |
|              s1[3]=='a' == s3[3]=='a' -> TRUE                          |
|      Result: TRUE (Characters match!)                                  |
+========================================================================+`,
    codeSnippet: {
      title: 'Comparing == vs .equals() with Literals, Objects, and Variables',
      code: `public class EqualityDemo {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");
        String s4 = "Ja" + "va"; // compile-time folded

        System.out.println("s1 == s2: " + (s1 == s2));           // true (SCP)
        System.out.println("s1 == s3: " + (s1 == s3));           // false (Heap vs SCP)
        System.out.println("s1 == s4: " + (s1 == s4));           // true (Folded into SCP)
        System.out.println("s1.equals(s3): " + s1.equals(s3));   // true (Same content)
    }
}`,
      lineByLineExplanation: [
        { line: 'String s1 = "Java"; String s2 = "Java";', explanation: 'Both literals resolve to the same canonical String object in the String Constant Pool.' },
        { line: 'String s3 = new String("Java");', explanation: 'Creates a separate object on the general heap containing the same characters.' },
        { line: 'String s4 = "Ja" + "va";', explanation: 'The compiler folds "Ja" + "va" into "Java" at compile time, resolving to the SCP entry.' },
        { line: 'System.out.println(s1 == s3);', explanation: 'Returns false because s1 points to the pool and s3 points to a distinct heap instance.' },
        { line: 'System.out.println(s1.equals(s3));', explanation: 'Returns true because .equals() verifies that both strings contain [J, a, v, a].' }
      ],
      output: `s1 == s2: true
s1 == s3: false
s1 == s4: true
s1.equals(s3): true`
    },
    codeExamples: [
      {
        title: 'Example 1: Dynamic Concatenation vs Final Inlining',
        description: 'Demonstrating how the final keyword affects compile-time constant folding and reference identity.',
        code: `public class ConstantFoldingDemo {
    public static void main(String[] args) {
        String base = "Dev";
        String dyn = base + "eloper"; // computed at runtime on heap

        final String finalBase = "Dev";
        String folded = finalBase + "eloper"; // folded at compile time

        String literal = "Developer";

        System.out.println("dyn == literal:    " + (dyn == literal));
        System.out.println("folded == literal: " + (folded == literal));
    }
}`,
        output: `dyn == literal:    false
folded == literal: true`
      },
      {
        title: 'Example 2: Lexicographical Ordering with compareTo()',
        description: 'Demonstrating how compareTo() computes Unicode differences and prefix length differences.',
        code: `public class CompareToDemo {
    public static void main(String[] args) {
        String a = "Cat";
        String b = "Car";
        String c = "Catering";

        // 't' (ASCII 116) - 'r' (ASCII 114) = 2
        System.out.println("Cat vs Car:      " + a.compareTo(b));
        // Cat is a prefix of Catering: length 3 - length 8 = -5
        System.out.println("Cat vs Catering: " + a.compareTo(c));
    }
}`,
        output: `Cat vs Car:      2
Cat vs Catering: -5`
      },
      {
        title: 'Example 3: Null-Safe Equality Check',
        description: 'Comparing user input against an expected command safely without risking NullPointerException.',
        code: `public class NullSafeCheckDemo {
    public static void main(String[] args) {
        String userInput = null;

        // Yoda notation: literal on left
        if ("EXIT".equals(userInput)) {
            System.out.println("Exiting application");
        } else {
            System.out.println("Safe check completed: no crash!");
        }
    }
}`,
        output: 'Safe check completed: no crash!'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using == to compare user inputs, method parameters, or database strings.',
        whyItHappens: 'In primitive types (int, double), == compares values. Beginners assume it does the same for Strings.',
        howToFix: 'Always use .equals() for content comparison, or .equalsIgnoreCase() when case does not matter.'
      },
      {
        mistake: 'Calling .equals() on a variable that might be null (e.g. str.equals("YES")).',
        whyItHappens: 'Natural phrasing is "if input equals yes", leading to input.equals("yes"). If input is null, it throws NullPointerException.',
        howToFix: 'Put the constant literal on the left: "YES".equals(input), or use an explicit null check.'
      },
      {
        mistake: 'Assuming compareTo() only returns -1, 0, or 1.',
        whyItHappens: 'Beginners confuse compareTo() with Comparator return conventions where only sign matters, expecting strictly -1 or 1.',
        howToFix: 'Check for < 0, == 0, or > 0. The actual magnitude is the difference between character ASCII/Unicode values.'
      },
      {
        mistake: 'Assuming uppercase and lowercase letters have equal ASCII values in compareTo().',
        whyItHappens: 'Forgetting that ASCII uppercase letters (65-90) precede lowercase letters (97-122). "a".compareTo("B") is positive (97 - 66 = 31).',
        howToFix: 'Use compareToIgnoreCase() when alphabetical order without case distinction is needed.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Constant Folding vs Variable Concat',
        problemStatement: 'What does this code snippet print?',
        code: `String s1 = "ab";
String s2 = "a" + "b";
String s3 = "a";
String s4 = s3 + "b";
System.out.print((s1 == s2) + " " + (s1 == s4));`,
        options: [
          'true true',
          'true false',
          'false false',
          'false true'
        ],
        correctOptionIndex: 1,
        hint: 'Which concatenation is resolved at compile time, and which at runtime?',
        solution: 'true false',
        explanation: '"a" + "b" is a constant expression evaluated at compile time to "ab" (in SCP), so s1 == s2 is true. s3 + "b" involves the variable s3, so it is evaluated at runtime creating a new heap object; s1 == s4 is false.'
      },
      {
        title: 'Puzzle 2: The final Variable Inlining Effect',
        problemStatement: 'What is printed by this code block?',
        code: `final String x = "pre";
String y = "fix";
String z = x + "fix";
String target = "prefix";
System.out.print((z == target) + " " + ((x + y) == target));`,
        options: [
          'true true',
          'false false',
          'true false',
          'false true'
        ],
        correctOptionIndex: 2,
        hint: 'Notice x is final and initialized with a literal. Is y final?',
        solution: 'true false',
        explanation: 'Because x is final, x + "fix" is treated as a compile-time constant folded into "prefix", so z == target is true. Because y is not final, x + y is evaluated dynamically at runtime, so (x + y) == target is false.'
      },
      {
        title: 'Puzzle 3: Safe Null Comparison',
        problemStatement: 'What is printed after executing the following statements?',
        code: `String status = null;
boolean check1 = "OK".equals(status);
boolean check2 = false;
try {
    check2 = status.equals("OK");
} catch (NullPointerException e) {
    check2 = true;
}
System.out.print(check1 + " " + check2);`,
        options: [
          'false false',
          'false true',
          'true true',
          'NullPointerException unhandled'
        ],
        correctOptionIndex: 1,
        hint: 'What does "OK".equals(null) return? What happens when calling .equals() on null?',
        solution: 'false true',
        explanation: '"OK".equals(null) returns false safely. status.equals("OK") throws a NullPointerException because status is null, which is caught and sets check2 to true.'
      },
      {
        title: 'Puzzle 4: Character Difference in compareTo',
        problemStatement: 'What numerical value does this statement output?',
        code: `String s1 = "abc";
String s2 = "abe";
System.out.print(s1.compareTo(s2));`,
        options: [
          '-2',
          '-1',
          '2',
          '0'
        ],
        correctOptionIndex: 0,
        hint: 'Find the first differing character and calculate char1 - char2.',
        solution: '-2',
        explanation: 'Characters at index 0 and 1 match (\'a\', \'b\'). At index 2, \'c\' has ASCII value 99 and \'e\' has ASCII value 101. The result is 99 - 101 = -2.'
      },
      {
        title: 'Puzzle 5: Prefix Comparison in compareTo',
        problemStatement: 'What is printed when one string is a strict prefix of another?',
        code: `String shortStr = "app";
String longStr = "apple";
System.out.print(shortStr.compareTo(longStr));`,
        options: [
          '-2',
          '-1',
          '2',
          '-5'
        ],
        correctOptionIndex: 0,
        hint: 'When all characters of the shorter string match the start of the longer string, what difference is returned?',
        solution: '-2',
        explanation: 'When one string is an exact prefix of another, compareTo returns this.length() - other.length(). Here, 3 - 5 = -2.'
      },
      {
        title: 'Puzzle 6: Identity vs Content Equality on new String',
        problemStatement: 'Trace the output of this code snippet:',
        code: `String s1 = new String("Java");
String s2 = new String("Java");
System.out.print((s1 == s2) + " " + s1.equals(s2));`,
        options: [
          'true true',
          'false false',
          'false true',
          'true false'
        ],
        correctOptionIndex: 2,
        hint: 'new String() produces distinct heap instances with identical character arrays.',
        solution: 'false true',
        explanation: 's1 and s2 are two distinct objects created by new, so their memory addresses differ: s1 == s2 is false. Their content is identical, so s1.equals(s2) is true.'
      },
      {
        title: 'Puzzle 7: equalsIgnoreCase with Mixed Casing',
        problemStatement: 'What is printed by this comparison?',
        code: `String a = "JaVa";
String b = "jAvA";
System.out.print(a.equals(b) + " " + a.equalsIgnoreCase(b));`,
        options: [
          'true true',
          'false true',
          'false false',
          'true false'
        ],
        correctOptionIndex: 1,
        hint: '.equals() is strictly case-sensitive. .equalsIgnoreCase() ignores case differences.',
        solution: 'false true',
        explanation: 'Because character casing differs, .equals() returns false. .equalsIgnoreCase() normalizes case during comparison and finds all characters represent the same letters, returning true.'
      },
      {
        title: 'Puzzle 8: Interned Equality After Dynamic Concatenation',
        problemStatement: 'What does this code snippet print?',
        code: `String part = "Code";
String full = (part + "Base").intern();
String direct = "CodeBase";
System.out.print(full == direct);`,
        options: [
          'false',
          'true',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctOptionIndex: 1,
        hint: 'What does intern() return when the literal "CodeBase" already exists in the pool?',
        solution: 'true',
        explanation: 'The literal "CodeBase" ensures that "CodeBase" is in the String Constant Pool. When (part + "Base").intern() is called, it returns the pool reference. Hence full == direct evaluates to true.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the fundamental difference between == and .equals() when comparing Strings in Java.',
        answer: 'In Java, == is the reference equality operator: it checks whether two reference variables point to the exact same memory address in heap or pool memory. In contrast, .equals() is a method defined in Object and overridden in String to perform value (content) equality: it compares the actual characters contained within the two string objects, returning true if both strings have the identical length and character sequence, regardless of whether they exist at different memory addresses.',
        followUp: 'Can you write an example where two Strings return true for == but false for .equals()?',
        followUpAnswer: 'No, that is mathematically impossible for non-null Strings. If two references satisfy == (they point to the exact same object), then calling .equals() on that object compares the object to itself, which always returns true.',
        keyPhrases: ['Reference equality vs value equality', 'Memory address comparison', 'Character-by-character check', 'Overridden Object.equals()'],
        commonMistakeAnswer: 'Saying == compares primitives and .equals() compares objects, without mentioning that == can compare object references by memory address.'
      },
      {
        question: 'How does compile-time constant folding work for Strings in Java?',
        answer: 'Compile-time constant folding is an optimization performed by javac. When an expression consists exclusively of compile-time constants (such as string literals, primitive literals, and final variables initialized with constant expressions), javac evaluates the expression during compilation and writes the combined result directly into the bytecode constant pool. At runtime, the JVM loads this pre-computed string into the SCP, meaning expressions like "A" + "B" share reference identity with "AB".',
        followUp: 'Why doesn\'t constant folding work when one of the operands is a non-final variable?',
        followUpAnswer: 'A non-final variable can theoretically be reassigned or modified before the expression is reached; its value is not guaranteed to be invariant. Therefore, the compiler cannot safely bake its value into the class file at compile time, and must generate runtime instructions (invokedynamic / StringBuilder) to evaluate it dynamically.',
        keyPhrases: ['Compile-time constant expression', 'Bytecode constant pool table', 'Literal folding by javac', 'Inlining of final variables'],
        commonMistakeAnswer: 'Believing that the JVM does constant folding at runtime during garbage collection.'
      },
      {
        question: 'What is the internal implementation logic of String.equals() in Java?',
        answer: 'String.equals() follows a high-efficiency four-step check: (1) Reference identity check: `if (this == anObject) return true;` (fast path for identical references). (2) Type check: `if (anObject instanceof String)` (returns false if null or not a String). (3) Length comparison: if lengths differ, returns false immediately. (4) Element comparison: compares the internal byte/char arrays element-by-element. If all match, returns true; otherwise false.',
        followUp: 'Why is the reference check (this == anObject) placed first?',
        followUpAnswer: 'Because testing if two pointers hold the same address is a single CPU instruction (O(1)). If the references are identical, it skips scanning thousands of characters entirely, providing a major performance boost.',
        keyPhrases: ['Fast-path reference check (this == anObject)', 'instanceof type verification', 'Length guard check', 'Element-by-element byte array scan'],
        commonMistakeAnswer: 'Thinking that .equals() immediately starts comparing characters from index 0 without checking reference identity or length first.'
      },
      {
        question: 'What is "Yoda notation" in string equality, and why is it recommended for null safety?',
        answer: 'Yoda notation refers to placing the known constant string literal on the left-hand side of the .equals() call, e.g. `"ADMIN".equals(role)` instead of `role.equals("ADMIN")`. If `role` is null, calling `role.equals(...)` throws a NullPointerException because you cannot invoke a method on null. However, string literals like `"ADMIN"` are guaranteed to be valid non-null objects. Calling `"ADMIN".equals(null)` safely returns false without throwing an exception.',
        followUp: 'Is there any modern alternative to Yoda notation in Java standard library?',
        followUpAnswer: 'Yes, `Objects.equals(role, "ADMIN")` from java.util.Objects handles null safety cleanly on both sides without requiring inverted Yoda syntax.',
        keyPhrases: ['Yoda notation', 'NullPointerException prevention', 'Guaranteed non-null caller', 'Objects.equals() alternative'],
        commonMistakeAnswer: 'Thinking that "ADMIN".equals(null) throws an exception.'
      },
      {
        question: 'How does compareTo() determine the ordering between two strings?',
        answer: 'String.compareTo() implements lexicographical comparison based on the Unicode value of each character. It scans both strings from index 0 up to min(len1, len2). At the first index where `charAt(k)` differs, it returns `char1 - char2`. If all characters up to min(len1, len2) are identical, it compares lengths and returns `len1 - len2`. It returns a negative integer if this string precedes the argument, 0 if equal, and a positive integer if it follows.',
        followUp: 'Why does "Apple".compareTo("apple") return a negative number?',
        followUpAnswer: 'Because in the Unicode/ASCII table, uppercase letters (A-Z) have values 65-90, whereas lowercase letters (a-z) have values 97-122. At index 0, \'A\' (65) - \'a\' (97) = -32. Since -32 is negative, "Apple" precedes "apple".',
        keyPhrases: ['Unicode value subtraction', 'Prefix length fallback (len1 - len2)', 'Lexicographical order', 'ASCII casing difference'],
        commonMistakeAnswer: 'Assuming compareTo() only returns -1, 0, or 1, or that it is case-insensitive by default.'
      },
      {
        question: 'What is the contract between equals() and hashCode() for java.lang.String?',
        answer: 'The general contract states: if two objects are equal according to equals(), they MUST have the same hashCode(). String strictly obeys this contract: two Strings with identical character sequences will produce identical integer hashCodes. However, the reverse is not required: two unequal Strings can occasionally produce the same hashCode (known as a hash collision), although String\'s hash algorithm minimizes collisions.',
        followUp: 'Can you name two well-known different Strings that have the exact same hashCode in Java?',
        followUpAnswer: 'Yes! "FB" and "Ea" produce the exact same hashCode (2236). For "FB": \'F\'*31 + \'B\' = 70*31 + 66 = 2236. For "Ea": \'E\'*31 + \'a\' = 69*31 + 97 = 2236.',
        keyPhrases: ['equals() and hashCode() contract', 'Identical content implies identical hash', 'Hash collision possibility', '"FB" and "Ea" classic collision'],
        commonMistakeAnswer: 'Claiming that two strings with the same hash code are guaranteed to be equal.'
      },
      {
        question: 'Why does "Ja" + "va" == "Java" evaluate to true, while ("Ja" + getVa()) == "Java" evaluates to false?',
        answer: '"Ja" + "va" is an entirely constant expression formed from literals, so javac performs constant folding and replaces it with the literal "Java" in the class constant pool. However, ("Ja" + getVa()) calls a method `getVa()`. The compiler cannot predict the return value of a method at compile time, so the concatenation must be deferred to runtime. At runtime, concatenation allocates a new String object on the heap, which has a distinct memory address from the pooled "Java".',
        followUp: 'What if getVa() is marked static final and returns "va"?',
        followUpAnswer: 'Even if the method is static and returns a literal, method invocations are never inlined as compile-time constant expressions under the Java Language Specification. Only field constants can be compile-time constants.',
        keyPhrases: ['Compile-time constant vs method call', 'Deferred runtime concatenation', 'JLS constant expression rules', 'New heap allocation'],
        commonMistakeAnswer: 'Believing that if a method returns a literal, the compiler will fold the method call at compile time.'
      },
      {
        question: 'What is the difference between equals() and contentEquals() in java.lang.String?',
        answer: 'The .equals(Object) method only returns true if the argument is specifically an instance of java.lang.String with matching characters. In contrast, .contentEquals(CharSequence) can compare a String against ANY implementation of CharSequence (such as StringBuilder, StringBuffer, or CharBuffer) without needing to convert that buffer to a String first. This avoids allocating a temporary String object.',
        followUp: 'Why is contentEquals() advantageous when working with StringBuilder?',
        followUpAnswer: 'If you have a String `s` and a StringBuilder `sb`, writing `s.equals(sb)` always returns false because sb is not a String. Writing `s.equals(sb.toString())` works but creates an unnecessary garbage String. Writing `s.contentEquals(sb)` compares characters directly with zero object allocation.',
        keyPhrases: ['CharSequence abstraction', 'StringBuilder/StringBuffer comparison', 'Zero-allocation comparison', 'instanceof String check in equals()'],
        commonMistakeAnswer: 'Assuming contentEquals() and equals() are just aliases for the same method.'
      },
      {
        question: 'How does invokedynamic optimize string concatenation in Java 9+ compared to old StringBuilder bytecode?',
        answer: 'Prior to Java 9, javac translated string concatenations with + into explicit StringBuilder bytecode chains (new StringBuilder().append(...).append(...).toString()). In Java 9 (JEP 280), javac generates an `invokedynamic` bytecode instruction that calls StringConcatFactory.makeConcatWithConstants. This defers the exact concatenation strategy to runtime, allowing the JVM to calculate exact byte sizes upfront, allocate a single byte array, and avoid intermediate re-allocations.',
        followUp: 'Does this change how == behaves for runtime concatenations?',
        followUpAnswer: 'No, runtime concatenations still produce newly allocated String objects on the heap, so == still evaluates to false against SCP literals.',
        keyPhrases: ['JEP 280', 'invokedynamic instruction', 'StringConcatFactory', 'Single pre-sized byte array allocation', 'Preserved semantic equality'],
        commonMistakeAnswer: 'Thinking Java 9 makes runtime concatenation automatically pool strings in the SCP.'
      },
      {
        question: 'Why should you never use == when comparing strings in conditional control flow?',
        answer: 'Because == compares memory addresses rather than the semantic text. In real-world software, strings originate from varied sources: user form inputs, file reads, network payloads, database queries, and substring operations. All of these create dynamic heap objects outside the String Constant Pool. If you use ==, two strings with identical text like "admin" will evaluate to false, resulting in severe authorization bypasses or silent business logic failures.',
        followUp: 'Are there any legitimate cases where using == on Strings is acceptable?',
        followUpAnswer: 'Only when you have deliberately interned all strings in an internal enum-like dictionary or tokenizer system where canonical instance identity is strictly guaranteed, or when checking for null (`str == null`). In general application code, .equals() is always the standard.',
        keyPhrases: ['Dynamic heap sources', 'Silent logic failures', 'Security bypass risk', 'Canonical interning dictionary exception', 'Null checking safety'],
        commonMistakeAnswer: 'Saying == is fine as long as you test your code with literals in unit tests.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does the == operator compare when used between two String variables in Java?',
        options: [
          'The character count of the two strings',
          'The memory addresses (references) of the two objects',
          'The lexicographical order of characters',
          'The hash codes of the two strings'
        ],
        correctIndex: 1,
        explanation: 'The == operator checks reference identity, meaning it tests whether both variables hold the exact same memory address.'
      },
      {
        question: 'What is the result of: "Java" == new String("Java")?',
        options: [
          'true',
          'false',
          'Compilation Error',
          'NullPointerException'
        ],
        correctIndex: 1,
        explanation: '"Java" is in the String Constant Pool, while new String("Java") is a distinct object in general heap memory. Their addresses differ, so == returns false.'
      },
      {
        question: 'What is the result of: ("a" + "b") == "ab"?',
        options: [
          'true because javac folds constant literals at compile time',
          'false because concatenation always creates a new heap object',
          'Compilation error',
          'Depends on the JVM heap size'
        ],
        correctIndex: 0,
        explanation: 'Because "a" and "b" are compile-time literals, the compiler folds them into "ab" during compilation, resolving to the identical SCP entry.'
      },
      {
        question: 'What does compareTo() return when comparing "abc" with "abc"?',
        options: [
          'true',
          '1',
          '0',
          '-1'
        ],
        correctIndex: 2,
        explanation: 'When two strings contain the identical character sequence, compareTo() returns 0.'
      },
      {
        question: 'What happens when executing: String s = null; s.equals("hello");?',
        options: [
          'Returns false',
          'Returns true',
          'Throws NullPointerException',
          'Causes a compile error'
        ],
        correctIndex: 2,
        explanation: 'Invoking any instance method (such as .equals()) on a null reference throws a NullPointerException.'
      },
      {
        question: 'Why is "hello".equals(s) safe when s is null?',
        options: [
          '"hello" is a non-null literal and its .equals() method safely returns false when given null',
          'Java converts null to an empty string automatically',
          'The compiler replaces .equals with ==',
          'String literals catch exceptions internally'
        ],
        correctIndex: 0,
        explanation: 'The calling object "hello" is non-null, and the implementation of String.equals(Object) checks if the argument is null and returns false.'
      },
      {
        question: 'If final String a = "Go"; String b = a + "lang"; String c = "Golang";, what is (b == c)?',
        options: [
          'false because + was used',
          'true because a is final and treated as a compile-time constant',
          'Compilation Error',
          'Runtime Exception'
        ],
        correctIndex: 1,
        explanation: 'Because a is declared final and initialized with a literal, javac inlines it and folds a + "lang" into "Golang" at compile time.'
      },
      {
        question: 'What does "Cat".compareTo("Dog") return?',
        options: [
          'A positive integer',
          'A negative integer because \'C\' precedes \'D\' in Unicode',
          '0',
          'false'
        ],
        correctIndex: 1,
        explanation: '\'C\' (ASCII 67) - \'D\' (ASCII 68) = -1. Since it is negative, "Cat" comes before "Dog".'
      },
      {
        question: 'How does equalsIgnoreCase() compare characters without allocating new strings?',
        options: [
          'It converts both strings to uppercase using toUpperCase() on the heap',
          'It compares characters using Character.toUpperCase() and Character.toLowerCase() directly on character codes',
          'It strips vowels first',
          'It relies on the operating system locale table'
        ],
        correctIndex: 1,
        explanation: 'equalsIgnoreCase() inspects characters in place, checking direct equality first and then comparing case-folded character codes without heap allocations.'
      },
      {
        question: 'Which method should you use to check if a String has the same content as a StringBuilder without allocating a String?',
        options: [
          '.equals()',
          '==',
          '.contentEquals()',
          '.compareTo()'
        ],
        correctIndex: 2,
        explanation: '.contentEquals(CharSequence) accepts any CharSequence (including StringBuilder) and compares character sequences directly without creating a new String.'
      }
    ]
  }
};
