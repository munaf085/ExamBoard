import { ProgrammingExercise } from '../../detailedLessons';

export const stringsExercises: Record<string, ProgrammingExercise[]> = {
  // =========================================================================
  // LESSON 6.1: String Immutability & Memory Internals (10 Exercises)
  // =========================================================================
  'string-immutability-and-memory': [
    {
      id: 'str-imm-ex01',
      title: 'Verify String Immutability',
      problemStatement: 'Given a String `text = "hello"`, call the `.concat(" world")` method on it without reassigning the variable. Print the value of `text` to observe whether the original object changed, and then reassign `text` to the concatenated result and print it again.',
      hint: 'Calling text.concat(...) creates a new String in memory and returns it. If you do not assign that returned reference, the original string remains untouched.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String text = "hello";
        text.concat(" world");
        System.out.println("After concat without assignment: " + text);

        text = text.concat(" world");
        System.out.println("After concat with assignment: " + text);
    }
}`,
      output: `After concat without assignment: hello
After concat with assignment: hello world`,
      explanation: 'Strings in Java are immutable. The expression text.concat(" world") generates a brand-new String object containing "hello world", but the variable text still references the original "hello" object until explicitly reassigned.'
    },
    {
      id: 'str-imm-ex02',
      title: 'Reassignment vs Object Modification',
      problemStatement: 'Create two String variables, `first = "Java"` and `second = first`. Reassign `first = first + " Rocks"`. Print both `first` and `second` to demonstrate that `second` continues to reference the original object while `first` points to an entirely new object.',
      hint: 'Remember that String variables are reference variables holding memory addresses. Reassigning one reference variable does not alter other variables pointing to the original object.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String first = "Java";
        String second = first;

        first = first + " Rocks";

        System.out.println("first: " + first);
        System.out.println("second: " + second);
    }
}`,
      output: `first: Java Rocks
second: Java`,
      explanation: 'Initially, both first and second hold the reference to the "Java" literal in the String Constant Pool. When first is concatenated with " Rocks", a new String object is allocated on the heap and its address is assigned to first. The variable second remains pointing to the unchanged "Java" object.'
    },
    {
      id: 'str-imm-ex03',
      title: 'Literal vs New String Reference Check',
      problemStatement: 'Declare two String literals `str1 = "Omega"` and `str2 = "Omega"`. Then create a third String `str3 = new String("Omega")`. Compare `str1 == str2` and `str1 == str3` using the reference equality operator (`==`) and print the results with explanatory labels.',
      hint: 'String literals are cached in the String Constant Pool (SCP), so identical literals share the same reference. The new operator forces allocation of a distinct object in the general heap.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String str1 = "Omega";
        String str2 = "Omega";
        String str3 = new String("Omega");

        System.out.println("str1 == str2: " + (str1 == str2));
        System.out.println("str1 == str3: " + (str1 == str3));
    }
}`,
      output: `str1 == str2: true
str1 == str3: false`,
      explanation: 'str1 and str2 both point to the identical "Omega" object residing in the String Constant Pool, making str1 == str2 true. Conversely, str3 is allocated as a new object in the general heap outside the pool, so str1 == str3 evaluates to false.'
    },
    {
      id: 'str-imm-ex04',
      title: 'String Interning with SCP',
      problemStatement: 'Create a String on the heap using `new String("Alpha")`. Call `.intern()` on that object and assign the result to a variable `interned`. Then declare a literal `String poolLiteral = "Alpha"`. Compare `heapString == poolLiteral` and `interned == poolLiteral` using `==`.',
      hint: 'The intern() method searches the String Constant Pool. If the string exists in the pool, it returns the reference to the pooled instance.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String heapString = new String("Alpha");
        String interned = heapString.intern();
        String poolLiteral = "Alpha";

        System.out.println("heapString == poolLiteral: " + (heapString == poolLiteral));
        System.out.println("interned == poolLiteral: " + (interned == poolLiteral));
    }
}`,
      output: `heapString == poolLiteral: false
interned == poolLiteral: true`,
      explanation: 'heapString refers to a heap object outside the pool, so heapString == poolLiteral is false. When heapString.intern() is invoked, the JVM returns the canonical reference from the SCP, which matches poolLiteral exactly.'
    },
    {
      id: 'str-imm-ex05',
      title: 'Count Objects Created in Loop',
      problemStatement: 'Simulate repeated string concatenation in a loop that iterates 4 times, starting with `result = ""`. In each iteration, perform `result = result + i + "-"`. Print the final string and calculate and print the total number of intermediate String objects created across the 4 iterations.',
      hint: 'Each + concatenation with a new value creates intermediate String instances because Strings cannot be updated in place.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String result = "";
        int iterations = 4;

        for (int i = 0; i < iterations; i++) {
            result = result + i + "-";
        }

        System.out.println("Final Result: " + result);
        // Each iteration produces intermediate String objects (converting i, concatenating with result, and adding "-")
        // At least 2-3 String allocations occur per iteration:
        int estimatedObjects = 1 + (iterations * 2);
        System.out.println("Estimated String objects created: " + estimatedObjects);
    }
}`,
      output: `Final Result: 0-1-2-3-
Estimated String objects created: 9`,
      explanation: 'Because Strings are immutable, each step of loop concatenation creates new heap objects rather than modifying result in place. Over many iterations, this creates significant garbage collection pressure.'
    },
    {
      id: 'str-imm-ex06',
      title: 'Identity HashCode Inspector',
      problemStatement: 'Demonstrate that reassigning a modified String allocates a new memory address by printing `System.identityHashCode()` of a String variable `s = "Base"` before and after executing `s = s.toUpperCase()`.',
      hint: 'System.identityHashCode(obj) returns the default hash code based on the object\'s identity (memory reference), regardless of whether the class overrides hashCode().',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String s = "Base";
        int hashBefore = System.identityHashCode(s);

        s = s.toUpperCase();
        int hashAfter = System.identityHashCode(s);

        System.out.println("Original string hash recorded: " + (hashBefore != 0));
        System.out.println("New string value: " + s);
        System.out.println("Memory address changed: " + (hashBefore != hashAfter));
    }
}`,
      output: `Original string hash recorded: true
New string value: BASE
Memory address changed: true`,
      explanation: 'Because String is immutable, toUpperCase() cannot change the original "Base" object. It creates a brand-new String object "BASE" at a different memory address, confirmed by hashBefore != hashAfter.'
    },
    {
      id: 'str-imm-ex07',
      title: 'Compile-Time Literal Pooling',
      problemStatement: 'Verify Java compiler literal folding. Declare `String s1 = "HelloWorld"`, `String s2 = "Hello" + "World"`, and `String s3 = "Hello"; String s4 = s3 + "World";`. Compare `s1 == s2` and `s1 == s4` and print the boolean results.',
      hint: 'Expressions composed solely of compile-time literals (like "Hello" + "World") are folded at compile time by javac into a single literal. Concatenations involving variables are evaluated at runtime.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String s1 = "HelloWorld";
        String s2 = "Hello" + "World";

        String s3 = "Hello";
        String s4 = s3 + "World";

        System.out.println("s1 == s2: " + (s1 == s2));
        System.out.println("s1 == s4: " + (s1 == s4));
    }
}`,
      output: `s1 == s2: true
s1 == s4: false`,
      explanation: '"Hello" + "World" contains only constant literals, so the compiler optimizes it into "HelloWorld" at compile time, reusing the pool entry. In contrast, s3 + "World" involves a variable and is evaluated at runtime on the heap, producing a separate object.'
    },
    {
      id: 'str-imm-ex08',
      title: 'Dynamic vs Static Concatenation',
      problemStatement: 'Demonstrate how the `final` modifier changes concatenation behavior. Declare `final String prefix = "Super"` and non-final `String regularPrefix = "Super"`. Concatenate each with `"Hero"` to form `combinedFinal = prefix + "Hero"` and `combinedRegular = regularPrefix + "Hero"`. Compare each against the literal `"SuperHero"` using `==`.',
      hint: 'A final variable initialized with a compile-time constant is treated as a compile-time constant by the compiler!',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        final String prefix = "Super";
        String regularPrefix = "Super";

        String target = "SuperHero";
        String combinedFinal = prefix + "Hero";
        String combinedRegular = regularPrefix + "Hero";

        System.out.println("combinedFinal == target: " + (combinedFinal == target));
        System.out.println("combinedRegular == target: " + (combinedRegular == target));
    }
}`,
      output: `combinedFinal == target: true
combinedRegular == target: false`,
      explanation: 'Because prefix is marked final and initialized with a literal, the compiler substitutes its value directly at compile time (constant inlining), so prefix + "Hero" is folded into "SuperHero". regularPrefix is not final, so its concatenation happens dynamically at runtime on the heap.'
    },
    {
      id: 'str-imm-ex09',
      title: 'String Intern Lookup Verification',
      problemStatement: 'Construct two separate heap strings with `new String("Delta")`. Call `.intern()` on both of them to obtain `interned1` and `interned2`. Compare `heap1 == heap2` and `interned1 == interned2` using `==`.',
      hint: 'Even if multiple distinct heap objects are created with new String, calling intern() on each always returns the single shared canonical reference from the pool.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String heap1 = new String("Delta");
        String heap2 = new String("Delta");

        String interned1 = heap1.intern();
        String interned2 = heap2.intern();

        System.out.println("heap1 == heap2: " + (heap1 == heap2));
        System.out.println("interned1 == interned2: " + (interned1 == interned2));
    }
}`,
      output: `heap1 == heap2: false
interned1 == interned2: true`,
      explanation: 'heap1 and heap2 are two independent objects residing in the general heap, so heap1 == heap2 is false. Calling intern() returns the exact same reference from the String Constant Pool for both, so interned1 == interned2 is true.'
    },
    {
      id: 'str-imm-ex10',
      title: 'Simulate Immutable Wrapper Behavior',
      problemStatement: 'Demonstrate that passing a String to a method cannot modify the caller\'s string variable. In `main`, initialize `String message = "Ready"`. Pass `message` to a helper method `static void modify(String s)` that performs `s = s + " Set Go"`. Print `message` before and after the method call.',
      hint: 'Java passes references by value. Modifying or reassigning the parameter variable inside a method only changes the local copy of the reference.',
      solutionCode: `public class Solution {
    public static void modify(String s) {
        s = s + " Set Go";
        System.out.println("Inside modify method: " + s);
    }

    public static void main(String[] args) {
        String message = "Ready";
        System.out.println("Before method call: " + message);
        modify(message);
        System.out.println("After method call: " + message);
    }
}`,
      output: `Before method call: Ready
Inside modify method: Ready Set Go
After method call: Ready`,
      explanation: 'The modify method receives a copy of the reference message. Reassigning s inside modify points s to a new String object, but the original message variable in main continues pointing to "Ready".'
    }
  ],

  // =========================================================================
  // LESSON 6.2: String Equality: == vs .equals() & SCP (10 Exercises)
  // =========================================================================
  'string-equality-and-comparisons': [
    {
      id: 'str-eq-ex01',
      title: 'Reference Identity vs Content Equality',
      problemStatement: 'Declare `String a = "Quantum"`, `String b = new String("Quantum")`, and `String c = new String("Quantum")`. Compare `a`, `b`, and `c` using both `==` and `.equals()` to demonstrate the difference between reference identity and value equality.',
      hint: '== checks whether two references point to the exact same memory address. .equals() checks whether the sequences of characters inside the objects are identical.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String a = "Quantum";
        String b = new String("Quantum");
        String c = new String("Quantum");

        System.out.println("a == b: " + (a == b));
        System.out.println("b == c: " + (b == c));
        System.out.println("a.equals(b): " + a.equals(b));
        System.out.println("b.equals(c): " + b.equals(c));
    }
}`,
      output: `a == b: false
b == c: false
a.equals(b): true
b.equals(c): true`,
      explanation: 'b and c are separate objects allocated on the heap, so == evaluates to false for all pairs involving b or c. However, because their character contents are all "Quantum", .equals() returns true for all comparisons.'
    },
    {
      id: 'str-eq-ex02',
      title: 'Case-Insensitive String Matcher',
      problemStatement: 'Given two input Strings `cmd1 = "QUIT"` and `cmd2 = "quit"`, compare them using `.equals()` and `.equalsIgnoreCase()`. Print whether they match under each comparison.',
      hint: '.equals() is strictly case-sensitive (\'Q\' != \'q\'). .equalsIgnoreCase() normalizes case differences before checking character equality.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String cmd1 = "QUIT";
        String cmd2 = "quit";

        System.out.println("Strict equals: " + cmd1.equals(cmd2));
        System.out.println("Equals ignore case: " + cmd1.equalsIgnoreCase(cmd2));
    }
}`,
      output: `Strict equals: false
Equals ignore case: true`,
      explanation: 'The ASCII values of uppercase \'Q\' (81) and lowercase \'q\' (113) differ, causing .equals() to return false. .equalsIgnoreCase() converts case during comparison and finds that the characters represent the same letters, returning true.'
    },
    {
      id: 'str-eq-ex03',
      title: 'Safe Null String Equality',
      problemStatement: 'Given a String variable `userInput = null`, test if it matches the command `"CONFIRM"`. Demonstrate how `userInput.equals("CONFIRM")` would throw a NullPointerException, and show two safe alternatives: (1) literal-first comparison `"CONFIRM".equals(userInput)` and (2) a null-guard `userInput != null && userInput.equals("CONFIRM")`.',
      hint: 'Calling a method on a null reference throws NullPointerException. Calling a method on a non-null literal passing null as an argument safely returns false.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String userInput = null;

        // Literal-first comparison (Yoda condition)
        boolean match1 = "CONFIRM".equals(userInput);

        // Explicit null guard with short-circuit AND
        boolean match2 = (userInput != null && userInput.equals("CONFIRM"));

        System.out.println("Literal-first match: " + match1);
        System.out.println("Null-guarded match: " + match2);
    }
}`,
      output: `Literal-first match: false
Null-guarded match: false`,
      explanation: '"CONFIRM" is guaranteed to be a valid String object, so calling .equals(null) safely returns false without throwing an exception. The second approach uses && short-circuiting to skip .equals() when userInput is null.'
    },
    {
      id: 'str-eq-ex04',
      title: 'Lexicographical Sort Order Comparison',
      problemStatement: 'Given two words `word1 = "Apple"` and `word2 = "Banana"`, compare them using `word1.compareTo(word2)`. Interpret the returned integer: print whether `word1` comes before, after, or is identical to `word2` in dictionary order, along with the numerical difference.',
      hint: 'compareTo() returns a negative integer if the calling string comes before the argument, 0 if equal, and a positive integer if it comes after.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String word1 = "Apple";
        String word2 = "Banana";

        int result = word1.compareTo(word2);

        System.out.println("compareTo result: " + result);
        if (result < 0) {
            System.out.println(word1 + " comes before " + word2);
        } else if (result > 0) {
            System.out.println(word1 + " comes after " + word2);
        } else {
            System.out.println(word1 + " is equal to " + word2);
        }
    }
}`,
      output: `compareTo result: -1
Apple comes before Banana`,
      explanation: 'At index 0, \'A\' (ASCII 65) is compared with \'B\' (ASCII 66). The result is 65 - 66 = -1. Because -1 is negative, "Apple" lexicographically precedes "Banana".'
    },
    {
      id: 'str-eq-ex05',
      title: 'Case-Insensitive Lexicographical Comparison',
      problemStatement: 'Compare `strA = "apple"` and `strB = "Banana"` using both `strA.compareTo(strB)` and `strA.compareToIgnoreCase(strB)`. Explain why the sign of the result reverses.',
      hint: 'In standard ASCII, uppercase letters (A-Z: 65-90) come before lowercase letters (a-z: 97-122). compareToIgnoreCase() eliminates this bias.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String strA = "apple";
        String strB = "Banana";

        int standardResult = strA.compareTo(strB);
        int ignoreCaseResult = strA.compareToIgnoreCase(strB);

        System.out.println("Standard compareTo: " + standardResult);
        System.out.println("Case-insensitive compareTo: " + ignoreCaseResult);
    }
}`,
      output: `Standard compareTo: 31
Case-insensitive compareTo: -1`,
      explanation: 'In standard compareTo, \'a\' (97) - \'B\' (66) = 31 (positive), so "apple" incorrectly sorts AFTER "Banana". With compareToIgnoreCase, \'a\' is compared to \'b\', yielding 97 - 98 = -1 (negative), correctly placing "apple" before "Banana".'
    },
    {
      id: 'str-eq-ex06',
      title: 'Compile-Time Constant Folding Equality',
      problemStatement: 'Given `final int year = 2026`, declare `String s1 = "Java2026"` and `String s2 = "Java" + year`. Then declare non-final `int dynamicYear = 2026` and `String s3 = "Java" + dynamicYear`. Compare `s1 == s2` and `s1 == s3` with `==`.',
      hint: 'Primitive final variables initialized with constant values are compile-time constants. Non-final variables are evaluated at runtime.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        final int year = 2026;
        String s1 = "Java2026";
        String s2 = "Java" + year;

        int dynamicYear = 2026;
        String s3 = "Java" + dynamicYear;

        System.out.println("s1 == s2 (final constant): " + (s1 == s2));
        System.out.println("s1 == s3 (dynamic variable): " + (s1 == s3));
    }
}`,
      output: `s1 == s2 (final constant): true
s1 == s3 (dynamic variable): false`,
      explanation: 'Because year is a final compile-time constant, "Java" + year is folded into "Java2026" at compile time and fetched from the SCP. dynamicYear is non-final, so the concatenation happens at runtime, creating a new heap object.'
    },
    {
      id: 'str-eq-ex07',
      title: 'Manual Character Sequence Equality Checker',
      problemStatement: 'Write a manual equality checker without using `.equals()`. Given `String str1 = "Code"` and `String str2 = new String("Code")`, compare their lengths first. If equal, compare each character with `charAt()` in a loop. Print whether the strings are content-equal.',
      hint: 'Two strings are equal if their lengths match and every character at index i matches for all 0 <= i < length.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String str1 = "Code";
        String str2 = new String("Code");

        boolean areEqual = true;

        if (str1.length() != str2.length()) {
            areEqual = false;
        } else {
            for (int i = 0; i < str1.length(); i++) {
                if (str1.charAt(i) != str2.charAt(i)) {
                    areEqual = false;
                    break;
                }
            }
        }

        System.out.println("Reference equality (==): " + (str1 == str2));
        System.out.println("Manual character equality: " + areEqual);
    }
}`,
      output: `Reference equality (==): false
Manual character equality: true`,
      explanation: 'This manual implementation demonstrates what String.equals() does internally: it performs a fast reference check, verifies length equality, and then compares underlying characters one by one.'
    },
    {
      id: 'str-eq-ex08',
      title: 'Prefix and Suffix Equality Matcher',
      problemStatement: 'Given an URL string `url = "https://example.com/api"`, check whether it starts with `"https://"` and whether a second domain string `domain = "portal.example.com"` ends with `".com"`. Print the results using `startsWith()` and `endsWith()`.',
      hint: 'startsWith(prefix) and endsWith(suffix) check whether a string begins or ends with the exact specified substring.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String url = "https://example.com/api";
        String domain = "portal.example.com";

        boolean isSecure = url.startsWith("https://");
        boolean isDotCom = domain.endsWith(".com");

        System.out.println("URL is secure (HTTPS): " + isSecure);
        System.out.println("Domain is .com: " + isDotCom);
    }
}`,
      output: `URL is secure (HTTPS): true
Domain is .com: true`,
      explanation: 'startsWith checks the beginning characters from index 0. endsWith checks the trailing characters from index (length - suffix.length()). Both return boolean true.'
    },
    {
      id: 'str-eq-ex09',
      title: 'Dictionary Order Ranker',
      problemStatement: 'Given three strings `s1 = "Pear"`, `s2 = "Peach"`, and `s3 = "Pineapple"`, use `compareTo()` to find the alphabetically first word among the three without using arrays or sorting libraries.',
      hint: 'Compare s1 with s2. Keep the smaller one, then compare it with s3.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String s1 = "Pear";
        String s2 = "Peach";
        String s3 = "Pineapple";

        String first = s1;

        if (s2.compareTo(first) < 0) {
            first = s2;
        }
        if (s3.compareTo(first) < 0) {
            first = s3;
        }

        System.out.println("Alphabetically first word: " + first);
    }
}`,
      output: 'Alphabetically first word: Peach',
      explanation: 'Comparing "Peach" with "Pear": "Pea" is identical, but at index 3, \'c\' (99) < \'r\' (114), so s2.compareTo(s1) is negative. "Peach" becomes the current minimum. Next, "Pineapple" starts with \'i\' > \'e\', so "Peach" remains the first word.'
    },
    {
      id: 'str-eq-ex10',
      title: 'Interning For Fast Reference Equality',
      problemStatement: 'Given dynamic strings `dyn1 = new String("KEY")` and `dyn2 = new String("KEY")`, intern both into `fast1` and `fast2`. Verify that after interning, `fast1 == fast2` is true and `fast1 == "KEY"` is true.',
      hint: 'By canonicalizing strings with intern(), repeated equality checks can be accelerated to single pointer comparisons (==), though interning itself has an initial lookup cost.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String dyn1 = new String("KEY");
        String dyn2 = new String("KEY");

        System.out.println("Before intern ==: " + (dyn1 == dyn2));

        String fast1 = dyn1.intern();
        String fast2 = dyn2.intern();

        System.out.println("After intern fast1 == fast2: " + (fast1 == fast2));
        System.out.println("fast1 == literal: " + (fast1 == "KEY"));
    }
}`,
      output: `Before intern ==: false
After intern fast1 == fast2: true
fast1 == literal: true`,
      explanation: 'intern() canonicalizes both heap strings to the identical SCP entry for "KEY". Consequently, subsequent reference equality checks with == succeed.'
    }
  ],

  // =========================================================================
  // LESSON 6.3: Essential String Methods & Manipulation (10 Exercises)
  // =========================================================================
  'string-methods-and-manipulation': [
    {
      id: 'str-meth-ex01',
      title: 'Extract Initials from Full Name',
      problemStatement: "Given a full name `fullName = \"Ada Lovelace\"`, extract the first letter of each name using `charAt()` and `indexOf(' ')`. Print the uppercase initials separated by a dot (e.g., \"A.L.\").",
      hint: 'The first initial is at charAt(0). Find the space using indexOf(\' \'). The second initial is at charAt(spaceIndex + 1).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String fullName = "Ada Lovelace";

        char firstInitial = fullName.charAt(0);
        int spaceIndex = fullName.indexOf(' ');
        char secondInitial = fullName.charAt(spaceIndex + 1);

        String initials = firstInitial + "." + secondInitial + ".";
        System.out.println("Full Name: " + fullName);
        System.out.println("Initials: " + initials);
    }
}`,
      output: `Full Name: Ada Lovelace
Initials: A.L.`,
      explanation: 'charAt(0) retrieves \'A\'. fullName.indexOf(\' \') locates the space at index 3. charAt(4) retrieves \'L\'. The initials are combined to form "A.L.".'
    },
    {
      id: 'str-meth-ex02',
      title: 'Extract Email Domain',
      problemStatement: 'Given an email string `email = "developer@javaboard.org"`, extract only the domain portion (everything after the `@` symbol) using `indexOf()` and `substring()`. Print the extracted domain.',
      hint: 'Find the index of \'@\'. The domain begins at atIndex + 1 and extends to the end of the string, which can be extracted with email.substring(atIndex + 1).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String email = "developer@javaboard.org";

        int atIndex = email.indexOf('@');
        String domain = email.substring(atIndex + 1);

        System.out.println("Email: " + email);
        System.out.println("Domain: " + domain);
    }
}`,
      output: `Email: developer@javaboard.org
Domain: javaboard.org`,
      explanation: 'indexOf(\'@\') returns 9. Calling email.substring(10) slices the string from index 10 to the end, yielding "javaboard.org".'
    },
    {
      id: 'str-meth-ex03',
      title: 'Count Vowels and Consonants',
      problemStatement: 'Given a String `sentence = "Object Oriented"`, iterate through all its characters with a for-loop and `charAt()`. Count how many letters are vowels (A, E, I, O, U, case-insensitive) and how many are consonants. Ignore spaces. Print the vowel and consonant counts.',
      hint: 'Convert each character to lowercase using Character.toLowerCase(ch) before checking. Check if the character is a letter with Character.isLetter(ch).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String sentence = "Object Oriented";
        int vowels = 0;
        int consonants = 0;

        for (int i = 0; i < sentence.length(); i++) {
            char ch = Character.toLowerCase(sentence.charAt(i));
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            }
        }

        System.out.println("Sentence: " + sentence);
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
}`,
      output: `Sentence: Object Oriented
Vowels: 6
Consonants: 8`,
      explanation: 'The loop traverses each of the 15 characters. "Object Oriented" contains \'O\', \'e\', \'O\', \'i\', \'e\', \'e\' (6 vowels) and 8 consonants, excluding the space.'
    },
    {
      id: 'str-meth-ex04',
      title: 'Check Palindrome Using CharAt',
      problemStatement: 'Given a String `word = "radar"`, check whether it is a palindrome by comparing characters from the start and end moving inward using a while-loop and `charAt()`. Print whether the word is a palindrome.',
      hint: 'Use two pointers: left = 0 and right = word.length() - 1. If characters at left and right ever differ, it is not a palindrome.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String word = "radar";
        boolean isPalindrome = true;

        int left = 0;
        int right = word.length() - 1;

        while (left < right) {
            if (word.charAt(left) != word.charAt(right)) {
                isPalindrome = false;
                break;
            }
            left++;
            right--;
        }

        System.out.println("Word: " + word);
        System.out.println("Is Palindrome: " + isPalindrome);
    }
}`,
      output: `Word: radar
Is Palindrome: true`,
      explanation: 'The loop compares index 0 (\'r\') with index 4 (\'r\'), and index 1 (\'a\') with index 3 (\'a\'). All match, confirming "radar" is a palindrome.'
    },
    {
      id: 'str-meth-ex05',
      title: 'Mask Credit Card Number',
      problemStatement: 'Given a 16-digit credit card number String `cardNumber = "4532789123459876"`, mask all digits except the last 4 with the character `\'*\'`. Print the masked credit card number.',
      hint: 'Extract the last 4 digits using cardNumber.substring(cardNumber.length() - 4). Build the prefix of 12 asterisks or use a loop.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String cardNumber = "4532789123459876";

        int length = cardNumber.length();
        String lastFour = cardNumber.substring(length - 4);

        String maskedPrefix = "";
        for (int i = 0; i < length - 4; i++) {
            maskedPrefix = maskedPrefix + "*";
        }

        String maskedCard = maskedPrefix + lastFour;
        System.out.println("Original: " + cardNumber);
        System.out.println("Masked:   " + maskedCard);
    }
}`,
      output: `Original: 4532789123459876
Masked:   ************9876`,
      explanation: 'The last 4 characters are isolated using substring(12), returning "9876". The first 12 characters are masked with asterisks.'
    },
    {
      id: 'str-meth-ex06',
      title: 'Clean and Format Messy Input',
      problemStatement: 'Given a dirty user input string `rawInput = "   jAvA_pRoGrAmMiNg  "`, perform three cleanup steps: (1) trim the leading and trailing spaces, (2) convert to lowercase, and (3) replace all underscores `\'_\'` with single spaces `\' \'`. Print the cleaned result.',
      hint: 'Chain or sequentially apply rawInput.trim().toLowerCase().replace(\'_\', \' \').',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String rawInput = "   jAvA_pRoGrAmMiNg  ";

        String cleaned = rawInput.trim().toLowerCase().replace('_', ' ');

        System.out.println("Raw Input:     [" + rawInput + "]");
        System.out.println("Cleaned Input: [" + cleaned + "]");
    }
}`,
      output: `Raw Input:     [   jAvA_pRoGrAmMiNg  ]
Cleaned Input: [java programming]`,
      explanation: 'trim() strips outer whitespace, toLowerCase() transforms uppercase characters to lowercase, and replace(\'_\', \' \') converts underscores to spaces.'
    },
    {
      id: 'str-meth-ex07',
      title: 'Find All Occurrences of a Substring',
      problemStatement: 'Given a text `content = "the cat in the hat sat on the mat"`, find and print all starting index positions where the word `"the"` occurs using a while-loop and `indexOf(String str, int fromIndex)`. Also count the total occurrences.',
      hint: 'Call indexOf("the", index). If found, record the index, increment occurrences, and update index = foundIndex + 1 to search for the next match.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String content = "the cat in the hat sat on the mat";
        String target = "the";

        int count = 0;
        int index = content.indexOf(target);

        System.out.print("Indices found: ");
        while (index != -1) {
            System.out.print(index + " ");
            count++;
            index = content.indexOf(target, index + target.length());
        }
        System.out.println();
        System.out.println("Total occurrences: " + count);
    }
}`,
      output: `Indices found: 0 11 26 
Total occurrences: 3`,
      explanation: 'indexOf("the") finds the first occurrence at 0. Advancing to index + 3 finds the next at 11, and then at 26. When no more are found, indexOf returns -1, terminating the loop.'
    },
    {
      id: 'str-meth-ex08',
      title: 'Count Words in a Sentence',
      problemStatement: 'Given a sentence `text = "Java is powerful robust and fast"`, split the sentence into individual words using `.split(" ")`. Print each word on a new line with its index, and print the total word count.',
      hint: 'The split(" ") method splits a String around matches of the given delimiter and returns an array of String elements (String[]).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String text = "Java is powerful robust and fast";
        String[] words = text.split(" ");

        System.out.println("Total words: " + words.length);
        for (int i = 0; i < words.length; i++) {
            System.out.println("Word " + (i + 1) + ": " + words[i]);
        }
    }
}`,
      output: `Total words: 6
Word 1: Java
Word 2: is
Word 3: powerful
Word 4: robust
Word 5: and
Word 6: fast`,
      explanation: 'text.split(" ") breaks the string at each space character into a 6-element String array. We iterate through the array and print each element.'
    },
    {
      id: 'str-meth-ex09',
      title: 'Custom Substring Reversal',
      problemStatement: 'Given a String `str = "abcdefgh"`, reverse only the middle substring between indices 2 and 6 (i.e. characters at index 2, 3, 4, 5: "cdef"), leaving the prefix ("ab") and suffix ("gh") intact. Print the resulting string.',
      hint: 'Extract the prefix with substring(0, 2), the middle with substring(2, 6), and the suffix with substring(6). Reverse the middle using a loop from end to start.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String str = "abcdefgh";

        String prefix = str.substring(0, 2);
        String middle = str.substring(2, 6);
        String suffix = str.substring(6);

        String reversedMiddle = "";
        for (int i = middle.length() - 1; i >= 0; i--) {
            reversedMiddle = reversedMiddle + middle.charAt(i);
        }

        String result = prefix + reversedMiddle + suffix;
        System.out.println("Original: " + str);
        System.out.println("Modified: " + result);
    }
}`,
      output: `Original: abcdefgh
Modified: abfedcgh`,
      explanation: 'prefix is "ab", middle is "cdef", and suffix is "gh". Reversing "cdef" yields "fedc". Recombining produces "abfedcgh".'
    },
    {
      id: 'str-meth-ex10',
      title: 'Character Frequency Counter',
      problemStatement: 'Given a lowercase string `message = "success"`, count how many times each character appears using a primitive integer array of size 26 (`int[] freq = new int[26]`). Print the frequency of only those characters that appear in the string.',
      hint: 'For a lowercase character ch, its array index is ch - \'a\'. Traverse the string once to increment frequencies, then print frequencies for characters present.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String message = "success";
        int[] freq = new int[26];

        for (int i = 0; i < message.length(); i++) {
            char ch = message.charAt(i);
            freq[ch - 'a']++;
        }

        System.out.println("Character frequencies for: " + message);
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) {
                char ch = (char) ('a' + i);
                System.out.println("'" + ch + "': " + freq[i]);
            }
        }
    }
}`,
      output: `Character frequencies for: success
'c': 2
'e': 1
's': 3
'u': 1`,
      explanation: 'The array maps \'a\' through \'z\' to indices 0 through 25. For "success", \'s\' appears 3 times, \'u\' 1 time, \'c\' 2 times, and \'e\' 1 time.'
    }
  ],

  // =========================================================================
  // LESSON 6.4: StringBuilder vs StringBuffer & Performance (10 Exercises)
  // =========================================================================
  'stringbuilder-vs-stringbuffer': [
    {
      id: 'str-sb-ex01',
      title: 'Efficient Number String Builder',
      problemStatement: 'Using `StringBuilder`, build a comma-separated list of numbers from 1 to 10 without a trailing comma (e.g. "1, 2, 3, 4, 5, 6, 7, 8, 9, 10"). Print the resulting String.',
      hint: 'In a loop from 1 to 10, append the number. If i > 1, append ", " before the number, or check if i < 10 to append after.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();

        for (int i = 1; i <= 10; i++) {
            sb.append(i);
            if (i < 10) {
                sb.append(", ");
            }
        }

        String result = sb.toString();
        System.out.println("Numbered list: " + result);
    }
}`,
      output: 'Numbered list: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
      explanation: 'StringBuilder appends each integer and delimiter directly into its internal expandable character buffer, avoiding intermediate String object creations.'
    },
    {
      id: 'str-sb-ex02',
      title: 'Reverse Words in a String',
      problemStatement: 'Given a sentence `sentence = "Java String Performance"`, split it into words, reverse each word individually using `StringBuilder.reverse()`, and reassemble the sentence with spaces. Print the final reversed-words sentence.',
      hint: 'Split by " ". For each word, create a new StringBuilder(word), call .reverse(), and append to a master StringBuilder.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String sentence = "Java String Performance";
        String[] words = sentence.split(" ");
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            StringBuilder wordBuilder = new StringBuilder(words[i]);
            result.append(wordBuilder.reverse());
            if (i < words.length - 1) {
                result.append(" ");
            }
        }

        System.out.println("Original: " + sentence);
        System.out.println("Reversed: " + result.toString());
    }
}`,
      output: `Original: Java String Performance
Reversed: avaJ gnirtS ecnamrofreP`,
      explanation: 'Each individual token ("Java", "String", "Performance") is reversed in-place via StringBuilder.reverse(), yielding "avaJ", "gnirtS", and "ecnamrofreP".'
    },
    {
      id: 'str-sb-ex03',
      title: 'Insert and Delete Formatting',
      problemStatement: 'Given a raw 10-digit phone number String `digits = "5551234567"`, use a `StringBuilder` and its `.insert()` method to format it into `"(555) 123-4567"`. Then demonstrate `.delete()` by deleting the area code and parentheses to leave just `"123-4567"`. Print both results.',
      hint: 'Insert "(" at 0, ") " at 4, and "-" at 9. To delete the area code, use delete(0, 6).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String digits = "5551234567";
        StringBuilder sb = new StringBuilder(digits);

        // Format to (555) 123-4567
        sb.insert(0, "(");
        sb.insert(4, ") ");
        sb.insert(9, "-");

        System.out.println("Formatted: " + sb.toString());

        // Delete "(555) " which occupies indices 0 through 5 (endIndex 6 exclusive)
        sb.delete(0, 6);
        System.out.println("Local number: " + sb.toString());
    }
}`,
      output: `Formatted: (555) 123-4567
Local number: 123-4567`,
      explanation: 'sb.insert() shifts characters in the buffer to make room for inserted substrings. sb.delete(0, 6) removes characters in the half-open range [0, 6).'
    },
    {
      id: 'str-sb-ex04',
      title: 'Capacity and Length Tracker',
      problemStatement: 'Track and print the `length()` and `capacity()` of a default `new StringBuilder()` before adding any characters, after appending a 10-character string `"HelloWorld"`, and after appending a 20-character string to force capacity expansion.',
      hint: 'Default capacity is 16. When exceeded, the new capacity becomes (oldCapacity * 2) + 2.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder();
        System.out.println("Initial - Length: " + sb.length() + ", Capacity: " + sb.capacity());

        sb.append("HelloWorld"); // 10 chars
        System.out.println("After 10 chars - Length: " + sb.length() + ", Capacity: " + sb.capacity());

        sb.append("12345678901234567890"); // +20 chars (total 30 chars, exceeds 16)
        System.out.println("After 30 chars - Length: " + sb.length() + ", Capacity: " + sb.capacity());
    }
}`,
      output: `Initial - Length: 0, Capacity: 16
After 10 chars - Length: 10, Capacity: 16
After 30 chars - Length: 30, Capacity: 34`,
      explanation: 'Initial capacity is 16. Appending 10 characters fits within 16. Appending 20 more brings length to 30, which exceeds 16. The new capacity is expanded via (16 * 2) + 2 = 34.'
    },
    {
      id: 'str-sb-ex05',
      title: 'Remove All Vowels In-Place',
      problemStatement: 'Given a `StringBuilder sb = new StringBuilder("Algorithm Design")`, remove all vowel characters (\'a\', \'e\', \'i\', \'o\', \'u\', case-insensitive) directly from the buffer using `deleteCharAt()`. Print the final string.',
      hint: 'When deleting characters by index, iterate backwards from sb.length() - 1 down to 0 so earlier indices are not shifted!',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Algorithm Design");

        for (int i = sb.length() - 1; i >= 0; i--) {
            char ch = Character.toLowerCase(sb.charAt(i));
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                sb.deleteCharAt(i);
            }
        }

        System.out.println("Vowels removed: " + sb.toString());
    }
}`,
      output: 'Vowels removed: lgrthm Dsgn',
      explanation: 'Iterating backward ensures that removing a character at index i does not alter the indices of the remaining unexamined characters at indices 0 through i - 1.'
    },
    {
      id: 'str-sb-ex06',
      title: 'Method Chaining Expression',
      problemStatement: 'Demonstrate fluent method chaining with `StringBuilder`. In a single chained expression, create a StringBuilder with `"INFO"`, append `": "`, append `"Status="`, append `200`, append `", Message="`, and append `"OK"`. Print the result.',
      hint: 'Because append() returns the same StringBuilder instance (return this;), you can chain method calls one after another.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String logEntry = new StringBuilder("INFO")
                .append(": ")
                .append("Status=")
                .append(200)
                .append(", Message=")
                .append("OK")
                .toString();

        System.out.println("Log: " + logEntry);
    }
}`,
      output: 'Log: INFO: Status=200, Message=OK',
      explanation: 'Every call to .append() returns the reference to the StringBuilder itself, allowing fluent chaining of diverse types (String, int) before finalizing with .toString().'
    },
    {
      id: 'str-sb-ex07',
      title: 'StringBuffer Thread-Safe Character Replace',
      problemStatement: 'Create a `StringBuffer buffer = new StringBuffer("Thread Safety in Java")`. Use `.replace()` to replace `"Thread"` with `"Concurrency"`, and use `.setCharAt()` to change the first lowercase letter to uppercase if needed. Print the buffer contents.',
      hint: 'StringBuffer provides thread-safe synchronized methods with the same API as StringBuilder. buffer.replace(start, end, str) replaces the character slice.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        StringBuffer buffer = new StringBuffer("Thread Safety in Java");

        // "Thread" is at indices 0 to 6 (length 6)
        buffer.replace(0, 6, "Concurrency");

        System.out.println("After replace: " + buffer.toString());

        // Reverse the entire buffer
        buffer.reverse();
        System.out.println("Reversed: " + buffer.toString());
    }
}`,
      output: `After replace: Concurrency Safety in Java
Reversed: avaJ ni ytefaS ycrerrucnoC`,
      explanation: 'StringBuffer methods are synchronized for thread safety. buffer.replace(0, 6, "Concurrency") substitutes the initial slice, and buffer.reverse() flips all characters in-place.'
    },
    {
      id: 'str-sb-ex08',
      title: 'Pre-Sized StringBuilder for Performance',
      problemStatement: 'When appending 100 small items, dynamic resizing causes multiple array reallocations. Initialize a `StringBuilder` with an explicit initial capacity of `500` using `new StringBuilder(500)`. Append 100 occurrences of `"X,"`. Verify that its capacity never grew beyond 500.',
      hint: 'Passing an integer to the StringBuilder constructor allocates the internal buffer upfront with that initial size.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int estimatedSize = 500;
        StringBuilder sb = new StringBuilder(estimatedSize);

        int initialCapacity = sb.capacity();

        for (int i = 0; i < 100; i++) {
            sb.append("X,");
        }

        int finalCapacity = sb.capacity();
        int finalLength = sb.length();

        System.out.println("Initial Capacity: " + initialCapacity);
        System.out.println("Final Length:     " + finalLength);
        System.out.println("Final Capacity:    " + finalCapacity);
        System.out.println("No re-allocations needed: " + (initialCapacity == finalCapacity));
    }
}`,
      output: `Initial Capacity: 500
Final Length:     200
Final Capacity:    500
No re-allocations needed: true`,
      explanation: 'Because the buffer was pre-sized to 500 characters, appending 200 characters required zero buffer resize operations and zero array copies, providing optimal throughput.'
    },
    {
      id: 'str-sb-ex09',
      title: 'Palindrome Verification with StringBuilder Reverse',
      problemStatement: 'Given a test string `candidate = "racecar"`, use `StringBuilder` to reverse the string in one step and check if the reversed string equals the original string using `.equals()`. Print whether it is a palindrome.',
      hint: 'Remember that StringBuilder does not override equals(). You must convert it back to a String using .toString() before calling .equals() on the candidate String.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String candidate = "racecar";

        StringBuilder sb = new StringBuilder(candidate);
        sb.reverse();
        String reversed = sb.toString();

        boolean isPalindrome = candidate.equals(reversed);

        System.out.println("Original: " + candidate);
        System.out.println("Reversed: " + reversed);
        System.out.println("Is Palindrome: " + isPalindrome);
    }
}`,
      output: `Original: racecar
Reversed: racecar
Is Palindrome: true`,
      explanation: 'sb.reverse() inverts the characters in place. Calling sb.toString() yields an immutable String that can be compared against the original string using String.equals().'
    },
    {
      id: 'str-sb-ex10',
      title: 'Run-Length Character Compressor',
      problemStatement: 'Given a string of repeated characters `input = "aaabbbccccd"`, compress it into `"a3b3c4d1"` using a `StringBuilder` and a loop. Print the compressed output.',
      hint: 'Keep track of the currentChar and count. When the next character differs or when reaching the end of the string, append currentChar and count to the StringBuilder.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String input = "aaabbbccccd";
        StringBuilder compressed = new StringBuilder();

        int count = 1;
        for (int i = 0; i < input.length(); i++) {
            if (i + 1 < input.length() && input.charAt(i) == input.charAt(i + 1)) {
                count++;
            } else {
                compressed.append(input.charAt(i));
                compressed.append(count);
                count = 1;
            }
        }

        System.out.println("Original:   " + input);
        System.out.println("Compressed: " + compressed.toString());
    }
}`,
      output: `Original:   aaabbbccccd
Compressed: a3b3c4d1`,
      explanation: 'The loop counts runs of identical characters. Whenever the character changes or the string ends, the character and its frequency count are appended to the StringBuilder.'
    }
  ]
};
