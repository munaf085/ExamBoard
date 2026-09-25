// @ts-nocheck

export interface JavaMCQ {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const javaStringsQuestions: JavaMCQ[] = [
  {
    id: "strings-1",
    moduleId: "java-strings",
    question: "What does it mean that Java Strings are immutable?",
    options: [
      "Their values cannot be changed after creation",
      "They cannot be used as keys in HashMaps",
      "They are created in a special memory area",
      "They can only be modified by the garbage collector"
    ],
    correctAnswer: "Their values cannot be changed after creation",
    explanation: "String immutability means that once a String object is created, its state or value cannot be altered. Any operation that seems to modify a String actually creates a new String object.",
    difficulty: "Easy"
  },
  {
    id: "strings-2",
    moduleId: "java-strings",
    question: "Which class provides a mutable sequence of characters and is NOT thread-safe?",
    options: [
      "String",
      "StringBuilder",
      "StringBuffer",
      "CharSequence"
    ],
    correctAnswer: "StringBuilder",
    explanation: "StringBuilder is a mutable sequence of characters that is not thread-safe, making it faster than StringBuffer for single-threaded string manipulations.",
    difficulty: "Easy"
  },
  {
    id: "strings-3",
    moduleId: "java-strings",
    question: "What is the primary difference between StringBuffer and StringBuilder?",
    options: [
      "StringBuffer is thread-safe (synchronized), StringBuilder is not",
      "StringBuilder is thread-safe (synchronized), StringBuffer is not",
      "StringBuffer cannot be reversed",
      "StringBuilder provides faster concatenation than String, but StringBuffer does not"
    ],
    correctAnswer: "StringBuffer is thread-safe (synchronized), StringBuilder is not",
    explanation: "Both provide mutable strings, but StringBuffer's methods are synchronized for thread safety. StringBuilder was introduced later as an unsynchronized, faster alternative.",
    difficulty: "Easy"
  },
  {
    id: "strings-4",
    moduleId: "java-strings",
    question: "What will be the output of the following code?\n```java\nString s1 = \"Hello\";\nString s2 = \"Hello\";\nSystem.out.println(s1 == s2);\n```",
    options: [
      "true",
      "false",
      "Compilation Error",
      "Runtime Exception"
    ],
    correctAnswer: "true",
    explanation: "String literals are placed in the String pool. Since s1 and s2 refer to the same literal, they point to the exact same object in memory, causing the == operator to return true.",
    difficulty: "Easy"
  },
  {
    id: "strings-5",
    moduleId: "java-strings",
    question: "Which method is used to compare two strings for content equality, ignoring case differences?",
    options: [
      "equals()",
      "equalsIgnoreCase()",
      "compareTo()",
      "matches()"
    ],
    correctAnswer: "equalsIgnoreCase()",
    explanation: "The equalsIgnoreCase() method compares this String to another String, ignoring case considerations.",
    difficulty: "Easy"
  },
  {
    id: "strings-6",
    moduleId: "java-strings",
    question: "What will `System.out.println(\"Java\".charAt(1));` print?",
    options: [
      "J",
      "a",
      "v",
      "StringIndexOutOfBoundsException"
    ],
    correctAnswer: "a",
    explanation: "Indices in Java strings are 0-based. The character at index 0 is 'J', and the character at index 1 is 'a'.",
    difficulty: "Easy"
  },
  {
    id: "strings-7",
    moduleId: "java-strings",
    question: "What is the result of `System.out.println(\"Hello World\".length());`?",
    options: [
      "10",
      "11",
      "12",
      "Compilation error"
    ],
    correctAnswer: "11",
    explanation: "The length() method returns the number of characters in the string, including spaces. \"Hello World\" has 11 characters.",
    difficulty: "Easy"
  },
  {
    id: "strings-8",
    moduleId: "java-strings",
    question: "Which String method returns a new string with all leading and trailing whitespace removed?",
    options: [
      "strip()",
      "trim()",
      "clean()",
      "Both trim() and strip()"
    ],
    correctAnswer: "Both trim() and strip()",
    explanation: "Both trim() (original) and strip() (introduced in Java 11) remove leading and trailing whitespaces. However, strip() is \"Unicode-aware\".",
    difficulty: "Easy"
  },
  {
    id: "strings-9",
    moduleId: "java-strings",
    question: "What happens when you use the `+` operator with a String and an int?",
    options: [
      "The int is converted to a String and concatenated",
      "A compilation error occurs",
      "The String is converted to an int and added",
      "A RuntimeException is thrown"
    ],
    correctAnswer: "The int is converted to a String and concatenated",
    explanation: "When the + operator is used with a String and a primitive like int, the primitive is implicitly converted to a String and then concatenated.",
    difficulty: "Easy"
  },
  {
    id: "strings-10",
    moduleId: "java-strings",
    question: "Which modifier is used to declare the String class, preventing it from being subclassed?",
    options: [
      "static",
      "abstract",
      "final",
      "private"
    ],
    correctAnswer: "final",
    explanation: "The java.lang.String class is declared as final, meaning it cannot be extended. This guarantees immutability and security.",
    difficulty: "Easy"
  },
  {
    id: "strings-11",
    moduleId: "java-strings",
    question: "What will be the output of this code?\n```java\nString s1 = new String(\"Java\");\nString s2 = new String(\"Java\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));\n```",
    options: [
      "true, true",
      "false, false",
      "true, false",
      "false, true"
    ],
    correctAnswer: "false, true",
    explanation: "Using 'new String()' explicitly creates new objects in the heap memory. Thus, s1 and s2 are different objects (== is false). However, their content is the same (.equals() is true).",
    difficulty: "Medium"
  },
  {
    id: "strings-12",
    moduleId: "java-strings",
    question: "What will be the output of `System.out.println(\"Programming\".substring(3, 7));`?",
    options: [
      "gram",
      "gramm",
      "ogra",
      "ogram"
    ],
    correctAnswer: "gram",
    explanation: "substring(beginIndex, endIndex) extracts characters from beginIndex up to endIndex - 1. Indexes are 0-based. Indices 3 to 6 correspond to 'g', 'r', 'a', 'm'.",
    difficulty: "Medium"
  },
  {
    id: "strings-13",
    moduleId: "java-strings",
    question: "What does the `compareTo()` method return when the invoking string is lexicographically greater than the string argument?",
    options: [
      "A positive integer",
      "A negative integer",
      "Zero",
      "A boolean true"
    ],
    correctAnswer: "A positive integer",
    explanation: "The compareTo() method compares strings lexicographically. It returns a positive integer if the invoking string is greater, negative if smaller, and zero if equal.",
    difficulty: "Medium"
  },
  {
    id: "strings-14",
    moduleId: "java-strings",
    question: "What will be the output of the following code?\n```java\nString s = \"Hello\";\ns.toUpperCase();\nSystem.out.println(s);\n```",
    options: [
      "HELLO",
      "Hello",
      "hello",
      "Compilation error"
    ],
    correctAnswer: "Hello",
    explanation: "Strings are immutable. `toUpperCase()` creates and returns a new string but doesn't modify the original one. Since the result is ignored, `s` remains \"Hello\".",
    difficulty: "Medium"
  },
  {
    id: "strings-15",
    moduleId: "java-strings",
    question: "What will `System.out.println(\"Java\".indexOf('a'));` print?",
    options: [
      "1",
      "3",
      "1 and 3",
      "-1"
    ],
    correctAnswer: "1",
    explanation: "`indexOf` returns the index of the FIRST occurrence of the specified character. The first 'a' in \"Java\" is at index 1.",
    difficulty: "Medium"
  },
  {
    id: "strings-16",
    moduleId: "java-strings",
    question: "Which of the following accurately describes the `.intern()` method?",
    options: [
      "It returns a canonical representation for the string object from the string pool",
      "It converts the string to uppercase",
      "It removes whitespace from the string",
      "It converts a String into a StringBuilder"
    ],
    correctAnswer: "It returns a canonical representation for the string object from the string pool",
    explanation: "When intern() is invoked, if the string pool already contains a string equal to this object, the pool's string is returned. Otherwise, this string object is added to the pool and a reference to it is returned.",
    difficulty: "Medium"
  },
  {
    id: "strings-17",
    moduleId: "java-strings",
    question: "What will be the output of the following code?\n```java\nStringBuilder sb = new StringBuilder(\"Java\");\nsb.reverse();\nSystem.out.println(sb);\n```",
    options: [
      "avaJ",
      "Java",
      "J",
      "Compilation error"
    ],
    correctAnswer: "avaJ",
    explanation: "StringBuilder is mutable, so calling `.reverse()` reverses the contents of the object in-place. Printing it yields \"avaJ\".",
    difficulty: "Medium"
  },
  {
    id: "strings-18",
    moduleId: "java-strings",
    question: "What is the output of `System.out.println(String.format(\"Value: %03d\", 5));`?",
    options: [
      "Value: 500",
      "Value: 005",
      "Value:   5",
      "Value: 03d"
    ],
    correctAnswer: "Value: 005",
    explanation: "The format specifier `%03d` formats the integer to be at least 3 characters wide, padding with leading zeros.",
    difficulty: "Medium"
  },
  {
    id: "strings-19",
    moduleId: "java-strings",
    question: "What will be the output of the following code?\n```java\nString[] parts = \"a,b,c\".split(\",\");\nSystem.out.println(parts.length);\n```",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: "3",
    explanation: "The `split(\",\")` method splits the string at each comma, creating an array `[\"a\", \"b\", \"c\"]`, which has a length of 3.",
    difficulty: "Medium"
  },
  {
    id: "strings-20",
    moduleId: "java-strings",
    question: "What will be the output of this code snippet?\n```java\nStringBuilder sb = new StringBuilder(\"123\");\nsb.insert(1, \"abc\");\nSystem.out.println(sb);\n```",
    options: [
      "abc123",
      "1abc23",
      "12abc3",
      "123abc"
    ],
    correctAnswer: "1abc23",
    explanation: "`insert(1, \"abc\")` inserts \"abc\" starting at index 1. The character at index 1 ('2') and subsequent characters are shifted to the right, resulting in \"1abc23\".",
    difficulty: "Medium"
  },
  {
    id: "strings-21",
    moduleId: "java-strings",
    question: "What is the output of the following code?\n```java\nSystem.out.println(10 + 20 + \"Java\" + 10 + 20);\n```",
    options: [
      "30Java1020",
      "30Java30",
      "1020Java1020",
      "1020Java30"
    ],
    correctAnswer: "30Java1020",
    explanation: "Evaluation is left-to-right. First, `10 + 20` is calculated mathematically as 30. Then, `30 + \"Java\"` becomes \"30Java\". Next, `\"30Java\" + 10` concatenates to \"30Java10\", and finally `+ 20` results in \"30Java1020\".",
    difficulty: "Hard"
  },
  {
    id: "strings-22",
    moduleId: "java-strings",
    question: "Consider the following code:\n```java\nString s1 = new String(\"hello\").intern();\nString s2 = \"hello\";\nSystem.out.println(s1 == s2);\n```\nWhat is the output?",
    options: [
      "true",
      "false",
      "Compilation error",
      "Runtime exception"
    ],
    correctAnswer: "true",
    explanation: "The `intern()` method returns the string instance from the string pool. Since the literal \"hello\" is already in the pool, `s1` ends up referencing the exact same object as `s2`.",
    difficulty: "Hard"
  },
  {
    id: "strings-23",
    moduleId: "java-strings",
    question: "What is the result of executing the following code?\n```java\npublic class Test {\n    static void modify(String s, StringBuilder sb) {\n        s = s.concat(\" World\");\n        sb.append(\" World\");\n    }\n    public static void main(String[] args) {\n        String str = \"Hello\";\n        StringBuilder sBuilder = new StringBuilder(\"Hello\");\n        modify(str, sBuilder);\n        System.out.println(str + \", \" + sBuilder);\n    }\n}\n```",
    options: [
      "Hello World, Hello World",
      "Hello, Hello",
      "Hello, Hello World",
      "Hello World, Hello"
    ],
    correctAnswer: "Hello, Hello World",
    explanation: "Java is pass-by-value. For objects, the reference is passed by value. Reassigning `s` in `modify` does not affect `str`. However, modifying the object that `sb` points to using `.append()` modifies the same object `sBuilder` references.",
    difficulty: "Hard"
  },
  {
    id: "strings-24",
    moduleId: "java-strings",
    question: "What is the output of the following code?\n```java\nString str = \"a.b.c\";\nString[] arr = str.split(\".\");\nSystem.out.println(arr.length);\n```",
    options: [
      "3",
      "1",
      "0",
      "Compilation error"
    ],
    correctAnswer: "0",
    explanation: "`split()` takes a regular expression. In regex, `.` is a metacharacter matching any character. Because it matches every single character in \"a.b.c\", they are all treated as delimiters, resulting in an empty array of length 0.",
    difficulty: "Hard"
  },
  {
    id: "strings-25",
    moduleId: "java-strings",
    question: "What will the following code output?\n```java\nString s = null;\nSystem.out.println(s + \"null\");\nSystem.out.println(String.valueOf(s));\n```",
    options: [
      "nullnull\\nnull",
      "Compilation error",
      "NullPointerException",
      "null\\nnull"
    ],
    correctAnswer: "nullnull\\nnull",
    explanation: "When a null reference is concatenated with a String, it is converted to the string \"null\". Thus `s + \"null\"` becomes `\"null\" + \"null\"`, which is \"nullnull\". `String.valueOf((Object)null)` returns the string \"null\".",
    difficulty: "Hard"
  }
];

