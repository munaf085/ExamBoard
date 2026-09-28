import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 9: STRINGS & STRING POOL - CAPSTONE EXERCISES (LESSON 9.5)
// ============================================================

export const stringsChallengeExercises: Record<string, ProgrammingExercise[]> = {
  'strings-challenge': [
  {
    "id": "strc-1",
    "title": "Exercise 1: String Constant Pool vs Heap Reference Identity",
    "difficulty": "Easy",
    "problemStatement": "Write a program that initializes `String s1 = \"Java\"`, `String s2 = \"Java\"`, `String s3 = new String(\"Java\")`, and `String s4 = s3.intern()`. Print `(s1 == s2)`, `(s1 == s3)`, and `(s1 == s4)` on separate lines.",
    "hint": "s1 and s2 share the SCP instance; s3 is on the heap; s4 retrieves the pooled instance.",
    "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n        String s4 = s3.intern();\n        System.out.println(s1 == s2);\n        System.out.println(s1 == s3);\n        System.out.println(s1 == s4);\n    }\n}",
    "output": "true\nfalse\ntrue",
    "explanation": "s1 and s2 reference identical SCP instance; s3 is a separate heap instance; s3.intern() returns the SCP instance matching s1."
  },
  {
    "id": "strc-2",
    "title": "Exercise 2: High-Performance StringBuilder Loop Buffer",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static String buildCsvLine(int[] numbers)` that concatenates integers separated by commas using a `StringBuilder` without trailing commas. Test with [10, 20, 30, 40].",
    "hint": "Append comma before element if index > 0.",
    "solutionCode": "public class Solution {\n    public static String buildCsvLine(int[] numbers) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < numbers.length; i++) {\n            if (i > 0) sb.append(\",\");\n            sb.append(numbers[i]);\n        }\n        return sb.toString();\n    }\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30, 40};\n        System.out.println(buildCsvLine(nums));\n    }\n}",
    "output": "10,20,30,40",
    "explanation": "StringBuilder accumulates characters in a mutable buffer in O(N) time without intermediate String allocations."
  },
  {
    "id": "strc-3",
    "title": "Exercise 3: Unicode Surrogate Pair Code Point Counter",
    "difficulty": "Medium",
    "problemStatement": "Write a method `public static void analyzeEmojiString(String text)` that prints the count of 16-bit code units (`length()`) and the true count of Unicode code points (`codePointCount()`). Test with text containing \"Hi \ud83d\ude80\".",
    "hint": "Rocket emoji \ud83d\ude80 is 2 code units but 1 code point.",
    "solutionCode": "public class Solution {\n    public static void analyzeEmojiString(String text) {\n        int codeUnits = text.length();\n        int codePoints = text.codePointCount(0, text.length());\n        System.out.println(\"Code Units: \" + codeUnits);\n        System.out.println(\"Code Points: \" + codePoints);\n    }\n    public static void main(String[] args) {\n        analyzeEmojiString(\"Hi \ud83d\ude80\");\n    }\n}",
    "output": "Code Units: 5\nCode Points: 4",
    "explanation": "\"Hi \" has 3 characters. \ud83d\ude80 has 2 code units but represents 1 code point. Total: 5 code units, 4 code points."
  },
  {
    "id": "strc-4",
    "title": "Exercise 4: Secure Password Zeroing with Char Array",
    "difficulty": "Easy",
    "problemStatement": "Demonstrate why passwords use `char[]` instead of `String`. Declare `char[] password = {'s', 'e', 'c', 'r', 'e', 't'}`. Print the password as a string, then securely wipe the array with `Arrays.fill(password, '0')`. Print the wiped array to verify zeroing.",
    "hint": "Arrays.fill zeroes out array memory immediately.",
    "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void main(String[] args) {\n        char[] password = {'s', 'e', 'c', 'r', 'e', 't'};\n        System.out.println(\"Before: \" + new String(password));\n        Arrays.fill(password, '0');\n        System.out.println(\"After: \" + new String(password));\n    }\n}",
    "output": "Before: secret\nAfter: 000000",
    "explanation": "char[] permits immediate memory zeroing via Arrays.fill, preventing credentials from persisting in heap dumps."
  },
  {
    "id": "strc-5",
    "title": "Exercise 5: Validating Text Non-Blank with Java 11 isBlank",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static boolean isValidUsername(String name)` that returns true only if `name` is non-null, not empty, and not composed exclusively of whitespace using `!name.isBlank()`. Test with null, \"   \", and \"Alice\".",
    "hint": "Check name != null && !name.isBlank().",
    "solutionCode": "public class Solution {\n    public static boolean isValidUsername(String name) {\n        return name != null && !name.isBlank();\n    }\n    public static void main(String[] args) {\n        System.out.println(isValidUsername(null));\n        System.out.println(isValidUsername(\"   \"));\n        System.out.println(isValidUsername(\"Alice\"));\n    }\n}",
    "output": "false\nfalse\ntrue",
    "explanation": "isBlank() verifies that the input contains non-whitespace characters without allocating trimmed strings."
  },
  {
    "id": "strc-6",
    "title": "Exercise 6: Palindrome Verification via StringBuilder.reverse",
    "difficulty": "Easy",
    "problemStatement": "Write a method `public static boolean isPalindrome(String s)` that normalizes the string to lowercase and checks if it equals its reversed form using `StringBuilder.reverse()`. Test with \"Kayak\" and \"Hello\".",
    "hint": "s.toLowerCase(); new StringBuilder(clean).reverse().toString().equals(clean).",
    "solutionCode": "public class Solution {\n    public static boolean isPalindrome(String s) {\n        if (s == null) return false;\n        String clean = s.toLowerCase();\n        return clean.equals(new StringBuilder(clean).reverse().toString());\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"Kayak\"));\n        System.out.println(isPalindrome(\"Hello\"));\n    }\n}",
    "output": "true\nfalse",
    "explanation": "StringBuilder.reverse() flips character sequences in-place and safely handles character equality."
  },
  {
    "id": "strc-7",
    "title": "Exercise 7: Anagram Verification via Character Frequencies",
    "difficulty": "Medium",
    "problemStatement": "Write a method `public static boolean areAnagrams(String s1, String s2)` using an integer frequency array `int[26]` for lowercase English letters. Return true if s1 and s2 are anagrams. Test with (\"listen\", \"silent\") and (\"rat\", \"car\").",
    "hint": "Increment count for s1, decrement for s2. Verify all counts are 0.",
    "solutionCode": "public class Solution {\n    public static boolean areAnagrams(String s1, String s2) {\n        if (s1 == null || s2 == null || s1.length() != s2.length()) return false;\n        int[] counts = new int[26];\n        for (int i = 0; i < s1.length(); i++) {\n            counts[s1.charAt(i) - 'a']++;\n            counts[s2.charAt(i) - 'a']--;\n        }\n        for (int c : counts) {\n            if (c != 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(areAnagrams(\"listen\", \"silent\"));\n        System.out.println(areAnagrams(\"rat\", \"car\"));\n    }\n}",
    "output": "true\nfalse",
    "explanation": "Frequency array verifies anagram identity in O(N) time with O(1) auxiliary space."
  },
  {
    "id": "strc-8",
    "title": "Exercise 8: Compile-Time Constant Folding Verification",
    "difficulty": "Medium",
    "problemStatement": "Declare `final String f1 = \"A\"; final String f2 = \"B\"; String s1 = f1 + f2; String s2 = \"AB\";`. Also declare non-final `String v1 = \"A\"; String s3 = v1 + \"B\";`. Print `(s1 == s2)` and `(s2 == s3)`.",
    "hint": "Final variables fold into the SCP at compile time; non-final variables concatenate at runtime.",
    "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        final String f1 = \"A\";\n        final String f2 = \"B\";\n        String s1 = f1 + f2;\n        String s2 = \"AB\";\n        String v1 = \"A\";\n        String s3 = v1 + \"B\";\n        System.out.println(s1 == s2);\n        System.out.println(s2 == s3);\n    }\n}",
    "output": "true\nfalse",
    "explanation": "f1 + f2 is folded into SCP literal \"AB\" at compile time. v1 + \"B\" is evaluated dynamically at runtime on the heap."
  },
  {
    "id": "strc-9",
    "title": "Exercise 9: Literal vs Regex Replacement (replace vs replaceAll)",
    "difficulty": "Easy",
    "problemStatement": "Given `String ip = \"192.168.1.1\"`, demonstrate the difference between `replace(\".\", \"-\")` and `replaceAll(\".\", \"-\")`. Print both results.",
    "hint": "replace treats \".\" as a literal period; replaceAll treats \".\" as regex matching any character.",
    "solutionCode": "public class Solution {\n    public static void main(String[] args) {\n        String ip = \"192.168.1.1\";\n        System.out.println(\"replace: \" + ip.replace(\".\", \"-\"));\n        System.out.println(\"replaceAll: \" + ip.replaceAll(\".\", \"-\"));\n    }\n}",
    "output": "replace: 192-168-1-1\nreplaceAll: -----------",
    "explanation": "replace replaces literal dots; replaceAll treats dot as a regex wildcard, replacing every single character."
  },
  {
    "id": "strc-10",
    "title": "Exercise 10: Run-Length Compression Algorithm",
    "difficulty": "Medium",
    "problemStatement": "Implement basic run-length compression: `public static String compress(String s)`. For \"aabcccccaaa\", return \"a2b1c5a3\" using a `StringBuilder`. Test with \"aabcccccaaa\".",
    "hint": "Iterate through characters, counting consecutive runs, append char and count to StringBuilder.",
    "solutionCode": "public class Solution {\n    public static String compress(String s) {\n        if (s == null || s.isEmpty()) return \"\";\n        StringBuilder sb = new StringBuilder();\n        int count = 1;\n        for (int i = 0; i < s.length(); i++) {\n            if (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {\n                count++;\n            } else {\n                sb.append(s.charAt(i)).append(count);\n                count = 1;\n            }\n        }\n        return sb.toString();\n    }\n    public static void main(String[] args) {\n        System.out.println(compress(\"aabcccccaaa\"));\n    }\n}",
    "output": "a2b1c5a3",
    "explanation": "Single-pass StringBuilder compression encodes consecutive character runs in linear O(N) time."
  }
]
};
