export interface JavaMCQ {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  codeSnippet?: string;
}

export const javaDataTypesQuestions: JavaMCQ[] = [
  {
    id: "datatypes-1",
    moduleId: "java-data-types",
    question: "What is the size of an 'int' primitive data type in Java?",
    options: ["8 bits", "16 bits", "32 bits", "64 bits"],
    correctAnswer: 2,
    explanation: "In Java, an 'int' is a 32-bit signed two's complement integer, regardless of the underlying platform.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-2",
    moduleId: "java-data-types",
    question: "What is the default value of a boolean instance variable in Java?",
    options: ["true", "false", "null", "0"],
    correctAnswer: 1,
    explanation: "The default value of a boolean instance or static variable in Java is false. Local variables do not have default values.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-3",
    moduleId: "java-data-types",
    question: "Which of the following is the correct wrapper class for the primitive type 'char'?",
    options: ["Char", "String", "Character", "CharSequence"],
    correctAnswer: 2,
    explanation: "The Character class wraps a value of the primitive type char in an object.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-4",
    moduleId: "java-data-types",
    question: "What is the result of the following code snippet?",
    codeSnippet: "Integer a = 127;\nInteger b = 127;\nSystem.out.println(a == b);",
    options: ["true", "false", "Compilation error", "Runtime exception"],
    correctAnswer: 0,
    explanation: "Java caches Integer objects for values between -128 and 127. Since both 'a' and 'b' fall in this range, they point to the same cached object in memory, so '==' returns true.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-5",
    moduleId: "java-data-types",
    question: "What is the result of the following code snippet?",
    codeSnippet: "Integer a = 128;\nInteger b = 128;\nSystem.out.println(a == b);",
    options: ["true", "false", "Compilation error", "Runtime exception"],
    correctAnswer: 1,
    explanation: "Integer values outside the -128 to 127 range are not cached. So 'a' and 'b' reference different objects in memory. The '==' operator checks for reference equality, which is false.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-6",
    moduleId: "java-data-types",
    question: "What will be printed when the following code is executed?",
    codeSnippet: "System.out.println(7 / 2);",
    options: ["3.5", "3", "4", "Compilation error"],
    correctAnswer: 1,
    explanation: "Both 7 and 2 are integers, so Java performs integer division, truncating any fractional part. Thus, 7 / 2 evaluates to 3.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-7",
    moduleId: "java-data-types",
    question: "What happens when you compile and run this code?",
    codeSnippet: "byte b = (byte) 130;\nSystem.out.println(b);",
    options: ["130", "127", "-126", "Compilation error"],
    correctAnswer: 2,
    explanation: "A byte holds values from -128 to 127. 130 in binary is 10000010, which represents -126 in an 8-bit signed two's complement system.",
    difficulty: "Hard"
  },
  {
    id: "datatypes-8",
    moduleId: "java-data-types",
    question: "Which of the following describes widening type casting?",
    options: [
      "Converting a larger type to a smaller type manually",
      "Converting a smaller type to a larger type automatically",
      "Converting a primitive type to a String",
      "Converting a String to a primitive type"
    ],
    correctAnswer: 1,
    explanation: "Widening casting (implicit) converts a smaller type to a larger type size automatically, for example, from int to long.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-9",
    moduleId: "java-data-types",
    question: "What is the output of the following code?",
    codeSnippet: "public class Test {\n    static int x;\n    public static void main(String[] args) {\n        System.out.println(x);\n    }\n}",
    options: ["0", "null", "Compilation error", "Garbage value"],
    correctAnswer: 0,
    explanation: "Static variables are initialized to their default values when the class is loaded. The default value for 'int' is 0.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-10",
    moduleId: "java-data-types",
    question: "What is the output of the following code?",
    codeSnippet: "public class Test {\n    public static void main(String[] args) {\n        int x;\n        System.out.println(x);\n    }\n}",
    options: ["0", "null", "Compilation error", "Garbage value"],
    correctAnswer: 2,
    explanation: "Local variables must be initialized before use in Java. They do not get default values. Attempting to use 'x' before initialization results in a compilation error.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-11",
    moduleId: "java-data-types",
    question: "Which method is used to convert a String to a primitive int?",
    options: ["Integer.valueOf()", "Integer.parseInt()", "Integer.getInt()", "Integer.toInt()"],
    correctAnswer: 1,
    explanation: "Integer.parseInt() parses the string argument as a signed decimal integer (returns an int). Integer.valueOf() returns an Integer object.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-12",
    moduleId: "java-data-types",
    question: "What happens in the following code?",
    codeSnippet: "public class Test {\n    int x = 10;\n    void display() {\n        int x = 20;\n        System.out.println(x);\n    }\n    public static void main(String[] args) {\n        new Test().display();\n    }\n}",
    options: ["10", "20", "Compilation error", "Runtime Exception"],
    correctAnswer: 1,
    explanation: "This is an example of variable shadowing. The local variable 'x' shadows the instance variable 'x', so it prints 20.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-13",
    moduleId: "java-data-types",
    question: "What happens when you declare a variable as 'final'?",
    options: [
      "It can be changed only within its class",
      "Its value cannot be changed once initialized",
      "It can be changed by subclasses",
      "It must be initialized at the time of declaration only"
    ],
    correctAnswer: 1,
    explanation: "A final variable can only be initialized once, either via an initializer or an assignment statement. Once assigned, its value cannot be modified.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-14",
    moduleId: "java-data-types",
    question: "What is autoboxing in Java?",
    options: [
      "Converting an object to a primitive type automatically",
      "Converting a primitive type to its corresponding wrapper class object automatically",
      "Converting a String to a wrapper class object automatically",
      "Automatically boxing variables in a collection"
    ],
    correctAnswer: 1,
    explanation: "Autoboxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes. For example, converting an int to an Integer.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-15",
    moduleId: "java-data-types",
    question: "What is the output of the following code?",
    codeSnippet: "int max = Integer.MAX_VALUE;\nSystem.out.println(max + 1);",
    options: ["2147483648", "-2147483648", "Compilation error", "ArithmeticException"],
    correctAnswer: 1,
    explanation: "Adding 1 to Integer.MAX_VALUE causes an integer overflow, wrapping around to Integer.MIN_VALUE (-2147483648). Java does not throw an exception for integer overflow.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-16",
    moduleId: "java-data-types",
    question: "Which of these is a valid declaration of a float variable?",
    options: ["float f = 3.14;", "float f = 3.14d;", "float f = 3.14f;", "float f = (double) 3.14;"],
    correctAnswer: 2,
    explanation: "By default, decimal literals are of type double. To assign a value to a float, you must append an 'f' or 'F' to the literal, or explicitly cast it.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-17",
    moduleId: "java-data-types",
    question: "What is the output of the following code?",
    codeSnippet: "double d = 10.5;\nint i = (int) d;\nSystem.out.println(i);",
    options: ["10.5", "11", "10", "Compilation error"],
    correctAnswer: 2,
    explanation: "Casting a floating-point number to an integer results in truncation of the fractional part, not rounding. So 10.5 becomes 10.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-18",
    moduleId: "java-data-types",
    question: "What will be the output of this unboxing code snippet?",
    codeSnippet: "Integer num = null;\nint x = num;\nSystem.out.println(x);",
    options: ["null", "0", "Compilation error", "NullPointerException"],
    correctAnswer: 3,
    explanation: "When Java attempts to unbox a null wrapper object to a primitive type, it throws a NullPointerException at runtime because there is no value to assign.",
    difficulty: "Hard"
  },
  {
    id: "datatypes-19",
    moduleId: "java-data-types",
    question: "In Java, what is the default value of a String instance variable?",
    options: ["\"\"", "null", "0", "undefined"],
    correctAnswer: 1,
    explanation: "String is an object reference type. All uninitialized reference variables in Java default to null.",
    difficulty: "Easy"
  },
  {
    id: "datatypes-20",
    moduleId: "java-data-types",
    question: "Consider the following code:",
    codeSnippet: "Long a = 100L;\nLong b = 100L;\nSystem.out.println(a == b);",
    options: ["true", "false", "Compilation error", "Runtime exception"],
    correctAnswer: 0,
    explanation: "Similar to Integer, Long also caches values in the range -128 to 127. So 'a' and 'b' refer to the same cached Long object, and '==' evaluates to true.",
    difficulty: "Hard"
  },
  {
    id: "datatypes-21",
    moduleId: "java-data-types",
    question: "What is the difference between Integer.valueOf() and Integer.parseInt()?",
    options: [
      "parseInt() returns a primitive int, valueOf() returns an Integer object",
      "parseInt() returns an Integer object, valueOf() returns a primitive int",
      "Both return a primitive int",
      "Both return an Integer object"
    ],
    correctAnswer: 0,
    explanation: "Integer.parseInt() returns a primitive int, while Integer.valueOf() returns a java.lang.Integer object.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-22",
    moduleId: "java-data-types",
    question: "What is the output of the following code snippet?",
    codeSnippet: "Object obj = new Integer(10);\nString str = (String) obj;\nSystem.out.println(str);",
    options: ["10", "null", "Compilation error", "ClassCastException"],
    correctAnswer: 3,
    explanation: "Although the compilation succeeds because 'obj' is of type Object and can potentially be a String, at runtime, it is an Integer. Casting an Integer to a String causes a ClassCastException.",
    difficulty: "Hard"
  },
  {
    id: "datatypes-23",
    moduleId: "java-data-types",
    question: "What is the behavior of the 'final' keyword when applied to an object reference?",
    options: [
      "The object's state cannot be modified",
      "The reference cannot be reassigned to point to another object",
      "Both the object state and the reference are immutable",
      "It prevents garbage collection of the object"
    ],
    correctAnswer: 1,
    explanation: "Making an object reference 'final' means that the reference variable cannot be reassigned to point to a different object. It does not make the object's internal state immutable.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-24",
    moduleId: "java-data-types",
    question: "Which code snippet correctly demonstrates widening conversion?",
    options: [
      "int i = (int) 5.5;",
      "long l = 100;",
      "byte b = 50;",
      "short s = (short) 30000;"
    ],
    correctAnswer: 1,
    explanation: "Assigning an int literal (100) to a long variable (l) is an implicit widening conversion. The integer value is automatically converted to a long.",
    difficulty: "Medium"
  },
  {
    id: "datatypes-25",
    moduleId: "java-data-types",
    question: "What is the output of the following code?",
    codeSnippet: "int x = 5;\nSystem.out.println(x++);\nSystem.out.println(x);",
    options: [
      "6 then 6",
      "5 then 6",
      "5 then 5",
      "6 then 5"
    ],
    correctAnswer: 1,
    explanation: "The post-increment operator (x++) uses the current value of x (which is 5) for the expression, and then increments x to 6. The second print statement outputs the new value, 6.",
    difficulty: "Medium"
  }
];
