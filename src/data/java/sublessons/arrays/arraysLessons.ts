import { DetailedLesson } from '../../detailedLessons';

export const arraysLessons: Record<string, DetailedLesson> = {
  // ============================================================
  // LESSON 7.1: ARRAY DECLARATION, MEMORY ALLOCATION & INDEXING
  // ============================================================
  'array-declaration-and-memory': {
    id: 'array-declaration-and-memory',
    moduleId: 'java-arrays',
    moduleTitle: '7. Arrays & 2D Matrix',
    lessonNumber: 'Lesson 7.1',
    title: 'Array Declaration, Memory Allocation & Indexing',
    subtitle: 'Stack reference vs Heap objects, fixed length, zero-based indexing, and default initialization values',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Think of an array as a bank of numbered lockers built into a school hallway. You walk up to the administration office (the Java compiler and runtime) and ask for a locker bank of exactly 5 lockers. The office hands you a single keyring tagged "lockers" (the reference variable on the stack), which points to the physical bank of lockers bolted into the hallway floor (the heap). Each locker door is labeled starting from 0 up to 4. When the lockers are first installed, they are not empty voids—by law, the school cleans and zeroes them out: each locker begins with the default value (0 for numbers, false for booleans). You cannot magically stretch or shrink the locker bank later; it was built with 5 doors, and 5 doors it shall remain!',
    interviewTakeaways: [
      'Arrays are Objects on the Heap: The array variable itself is merely a reference stored on the call stack; the actual contiguous container is an object allocated on the heap.',
      'Fixed Length Immutability: Once instantiated in memory with `new int[N]`, the length cannot change. The `.length` property is a `public final int` field on the array object.',
      'Automatic Default Initialization: Heap memory allocated for arrays is zeroed out by the JVM: numeric primitives default to 0/0.0, booleans to false, chars to \\u0000, and object references to null.',
      'Zero-Based O(1) Indexing: Accessing `arr[i]` computes the memory address via `BaseAddress + (i * elementSize)`, yielding instantaneous constant-time random access.',
      'Runtime Boundary Check: Accessing an invalid index throws `ArrayIndexOutOfBoundsException` at runtime, not compile-time.'
    ],
    cheatSheet: {
      summary: 'An array is a fixed-size, homogeneous data structure allocated as an object on the heap, referenced via a stack variable, and indexed from 0 to length - 1.',
      syntaxTemplate: `// 1. Declaration only (allocates reference on stack, holds null):
int[] numbers;

// 2. Instantiation (allocates heap object with default 0s):
numbers = new int[5];

// 3. Combined Declaration + Allocation:
int[] scores = new int[4];

// 4. Array Literal Initialization (declaration + instantiation + values):
int[] primes = {2, 3, 5, 7, 11};

// 5. Anonymous Array Instantiation:
int[] data = new int[]{10, 20, 30};

// 6. Accessing length (field, NOT a method):
int size = scores.length; // Note: no parentheses!`,
      rules: [
        { rule: 'Homogeneous Storage', explanation: 'All elements in an array must strictly match the declared component type or be implicitly convertible to it.' },
        { rule: 'Fixed Size at Birth', explanation: 'An array cannot grow or shrink once instantiated. Its length is permanently fixed on the heap.' },
        { rule: 'Stack Reference vs Heap Object', explanation: 'The variable holds a 32-bit or 64-bit reference address; multiple variables can point to the exact same heap array.' },
        { rule: 'Zero-Based Index Range', explanation: 'Valid indices strictly range from 0 to array.length - 1. Any other index triggers ArrayIndexOutOfBoundsException.' },
        { rule: 'Field, Not Method', explanation: 'Array size is retrieved via the public final field .length (e.g. arr.length), NOT .length() like Strings.' },
        { rule: 'Automatic Zeroing', explanation: 'Elements allocated with "new" receive default values immediately: 0 for ints, 0.0 for doubles, false for booleans, null for objects.' }
      ],
      quickComparison: [
        { aspect: 'Memory Location', optionA: 'Stack: Stores reference variable (memory address pointer)', optionB: 'Heap: Stores actual contiguous element data & length' },
        { aspect: 'Syntax: int[] arr vs int arr[]', optionA: 'int[] arr: Standard Java convention, groups type with brackets', optionB: 'int arr[]: C/C++ legacy syntax, valid in Java but discouraged' },
        { aspect: 'Initialization: new int[3] vs {1, 2, 3}', optionA: 'new int[3]: Dynamic size, all elements default to 0', optionB: '{1, 2, 3}: Array literal, size inferred from supplied elements' },
        { aspect: 'Size Query: Array vs String', optionA: 'arr.length: Public final field on the array object', optionB: 'str.length(): Method call on the String instance' },
        { aspect: 'Assignment: b = a', optionA: 'Copies the reference address only (shallow alias)', optionB: 'Does NOT clone or copy the underlying array elements' }
      ]
    },
    coreExplanation: [
      'What is an Array in Java? An array is a container object that holds a fixed number of values of a single uniform data type. In Java, unlike C/C++, arrays are first-class objects created on the garbage-collected heap.',
      'Reference on Stack, Object on Heap: When you write "int[] scores = new int[4];", two distinct memory allocations take place: (1) a reference variable named "scores" is created on the current stack frame, and (2) a contiguous memory block holding 4 integer slots plus an object header (containing metadata and the length field) is allocated on the heap. The variable "scores" simply stores the memory address of that heap block.',
      'Fixed Length Immutability: Once allocated, an array\'s size can never be resized. The JVM reserves contiguous memory based on the requested dimension. If you need to store more elements, you must allocate a brand-new, larger array and copy the elements across.',
      'Automatic Default Values: When an array is allocated using the "new" keyword, the JVM initializes all slots to their type-specific default values before user code can read them: numeric types (byte, short, int, long) get 0, floating-points (float, double) get 0.0, boolean gets false, char gets \'\\u0000\' (null character), and reference types (like String[]) get null.',
      'Zero-Based Indexing & Memory Calculation: Array indexing starts at 0 because the index represents the memory offset (distance) from the array\'s base memory address. The JVM computes the physical address of element "i" in constant time O(1) via the hardware formula: Address(arr[i]) = BaseAddress + (i * elementSizeInBytes).',
      'The .length Field vs .length() Method: The number of elements in an array is stored in an immutable, read-only field named ".length". Because it is a field and not a method, no parentheses are used: "arr.length". Writing "arr.length()" is a compile-time error.',
      'ArrayIndexOutOfBoundsException: If code attempts to access an index that is negative (e.g. arr[-1]) or greater than or equal to arr.length (e.g. arr[arr.length]), the JVM immediately halts execution and throws an ArrayIndexOutOfBoundsException. This boundary check happens at runtime for safety.',
      'Reference Aliasing Trap: In Java, assigning one array variable to another ("int[] copy = original;") does NOT duplicate the elements. It merely copies the memory address. Both reference variables now point to the identical heap array. Modifying "copy[0]" instantly changes "original[0]".'
    ],
    diagram: `+-------------------------------------------------------------------------------+
|                        JAVA ARRAY MEMORY ALLOCATION                           |
+-------------------------------------------------------------------------------+

  STACK MEMORY (Thread Frame)             HEAP MEMORY (Garbage-Collected)
 +-----------------------------+         +--------------------------------------+
 |                             |         | Object Header: [Class: int[], len: 4]|
 |  Reference Variable:        |         +--------------------------------------+
 |  int[] numbers = 0x7FA1     | ------> | [0] @ 0x7FA1 + 0 bytes :  10         |
 |                             |         | [1] @ 0x7FA1 + 4 bytes :  25         |
 |                             |         | [2] @ 0x7FA1 + 8 bytes :  40         |
 |                             |         | [3] @ 0x7FA1 + 12 bytes:  55         |
 +-----------------------------+         +--------------------------------------+
                                           Base Address: 0x7FA1
                                           Formula: Address = Base + (index * 4)

                                         Valid Index Range: 0 to (length - 1)
                                         Invalid Index: numbers[4] -> CRASH!
                                         (Throws ArrayIndexOutOfBoundsException)`,
    codeSnippet: {
      title: 'Declaring, Allocating, and Accessing Array Elements',
      code: `public class ArrayMemoryDemo {
    public static void main(String[] args) {
        // 1. Declare and allocate heap space for 4 integers
        int[] scores = new int[4];

        // 2. Default values are automatically 0
        System.out.println("Default value at index 0: " + scores[0]);
        System.out.println("Array length: " + scores.length);

        // 3. Assigning values to valid indices (0 to length - 1)
        scores[0] = 85;
        scores[1] = 92;
        scores[2] = 78;
        scores[3] = 95;

        // 4. Reading values via indexing
        System.out.println("First element: " + scores[0]);
        System.out.println("Last element: " + scores[scores.length - 1]);

        // 5. Array literal declaration (shorthand syntax)
        String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri"};
        System.out.println("Days array length: " + days.length);
        System.out.println("Midweek day: " + days[2]);
    }
}`,
      lineByLineExplanation: [
        { line: 'int[] scores = new int[4];', explanation: 'Creates a reference variable "scores" on the stack and allocates 4 contiguous integer slots initialized to 0 on the heap.' },
        { line: 'System.out.println("Default value: " + scores[0]);', explanation: 'Reads index 0 before manual assignment, demonstrating that the JVM automatically zeroes out heap allocations.' },
        { line: 'scores[3] = 95;', explanation: 'Assigns 95 to index 3, which is the final valid index for an array of length 4.' },
        { line: 'scores[scores.length - 1];', explanation: 'Idiomatic Java pattern to safely access the very last element of any non-empty array.' },
        { line: 'String[] days = {"Mon", "Tue", "Wed", "Thu", "Fri"};', explanation: 'Array literal shorthand that declares, allocates, and initializes an array of 5 String references in one statement.' }
      ],
      output: `Default value at index 0: 0
Array length: 4
First element: 85
Last element: 95
Days array length: 5
Midweek day: Wed`
    },
    codeExamples: [
      {
        title: 'Example 1: Default Values for Different Component Types',
        description: 'Demonstrating that the JVM zeroes all primitive heap slots and assigns null to reference arrays.',
        code: `public class ArrayDefaultsDemo {
    public static void main(String[] args) {
        int[] intArr = new int[2];
        double[] doubleArr = new double[2];
        boolean[] boolArr = new boolean[2];
        char[] charArr = new char[2];
        String[] strArr = new String[2];

        System.out.println("int default: " + intArr[0]);
        System.out.println("double default: " + doubleArr[0]);
        System.out.println("boolean default: " + boolArr[0]);
        System.out.println("char default (as int): " + (int) charArr[0]);
        System.out.println("String default: " + strArr[0]);
    }
}`,
        output: `int default: 0
double default: 0.0
boolean default: false
char default (as int): 0
String default: null`
      },
      {
        title: 'Example 2: Reference Aliasing vs Independent Copy',
        description: 'Showing how assigning array variables copies references, not array contents.',
        code: `public class ArrayAliasingDemo {
    public static void main(String[] args) {
        int[] original = {10, 20, 30};

        // Aliasing: copy refers to the EXACT SAME heap object
        int[] alias = original;

        alias[0] = 999;
        System.out.println("original[0] after modifying alias: " + original[0]);
        System.out.println("Are references equal? " + (original == alias));

        // True clone: allocate a distinct heap block and copy elements
        int[] trueCopy = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            trueCopy[i] = original[i];
        }

        trueCopy[0] = 42;
        System.out.println("original[0] after modifying trueCopy: " + original[0]);
        System.out.println("trueCopy[0]: " + trueCopy[0]);
        System.out.println("Are references equal? " + (original == trueCopy));
    }
}`,
        output: `original[0] after modifying alias: 999
Are references equal? true
original[0] after modifying trueCopy: 999
trueCopy[0]: 42
Are references equal? false`
      },
      {
        title: 'Example 3: Boundary Guard and ArrayIndexOutOfBoundsException',
        description: 'Demonstrating the fatal error of accessing out-of-bounds indices and how to protect against it.',
        code: `public class BoundaryDemo {
    public static void main(String[] args) {
        int[] values = {100, 200, 300};

        // Safe indexing with boundary guard
        int targetIndex = 3;
        if (targetIndex >= 0 && targetIndex < values.length) {
            System.out.println("Value: " + values[targetIndex]);
        } else {
            System.out.println("Index " + targetIndex + " is out of bounds! Valid: 0 to " + (values.length - 1));
        }

        // Accessing values[3] directly throws ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
        System.out.println("Safely guarded against crash.");
    }
}`,
        output: `Index 3 is out of bounds! Valid: 0 to 2
Safely guarded against crash.`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using arr.length as an index (e.g. "int last = arr[arr.length];").',
        whyItHappens: 'Forgetting that indices are 0-based, so the valid indices for length 5 are 0, 1, 2, 3, 4.',
        howToFix: 'Always subtract 1 to get the last valid element: "arr[arr.length - 1]".'
      },
      {
        mistake: 'Writing "arr.length()" with parentheses like a String method.',
        whyItHappens: 'Confusing the String method ".length()" with the array property ".length".',
        howToFix: 'Remember: arrays use the field ".length" (no parentheses); Strings use the method ".length()".'
      },
      {
        mistake: 'Assuming "int[] b = a;" makes a separate, independent duplicate of the array.',
        whyItHappens: 'Treating array variables like primitive ints where assignment copies the value.',
        howToFix: 'Array variables hold object references. Use a loop or a copying method to create an independent heap duplicate.'
      },
      {
        mistake: 'Specifying a size when using array literal syntax: "int[] arr = new int[3]{1, 2, 3};".',
        whyItHappens: 'Attempting to explicitly enforce the size while simultaneously listing the elements.',
        howToFix: 'When curly braces are provided, leave the dimension brackets empty: "new int[]{1, 2, 3}" or simply "{1, 2, 3}".'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Default Values of Allocated Integer Array',
        problemStatement: 'What does this code print after allocating a 3-element integer array and modifying only index 1?',
        code: `int[] arr = new int[3];
arr[1] = 50;
System.out.println(arr[0] + " " + arr[1] + " " + arr[2]);`,
        options: ['null 50 null', '0 50 0', 'garbage 50 garbage', 'Compilation Error: uninitialized elements'],
        correctOptionIndex: 1,
        hint: 'When an array is allocated with "new", the JVM automatically fills every unassigned slot with 0 for numeric types.',
        solution: '0 50 0',
        explanation: 'The "new int[3]" expression allocates 3 heap slots initialized to 0. Setting arr[1] = 50 leaves index 0 and index 2 holding their default values of 0.'
      },
      {
        title: 'Puzzle 2: Array Reference Aliasing and Mutation',
        problemStatement: 'What is the printed value of x[0] after modifying y[0]?',
        code: `int[] x = {5, 10, 15};
int[] y = x;
y[0] = 99;
System.out.println(x[0]);`,
        options: ['5', '99', '15', '0'],
        correctOptionIndex: 1,
        hint: 'Assignment "int[] y = x;" copies the heap memory address, so x and y point to the exact same array.',
        solution: '99',
        explanation: 'Because "y = x" copies the reference, both x and y reference the same array on the heap. Changing y[0] to 99 modifies the shared heap object, so x[0] evaluates to 99.'
      },
      {
        title: 'Puzzle 3: Boundary Exception on Last Index',
        problemStatement: 'What happens when executing this code snippet?',
        code: `int[] nums = {10, 20, 30, 40};
System.out.println(nums[nums.length]);`,
        options: [
          'Prints 40',
          'Prints 0',
          'Compilation error',
          'Runtime ArrayIndexOutOfBoundsException'
        ],
        correctOptionIndex: 3,
        hint: 'nums.length is 4. The valid indices are 0, 1, 2, and 3. What happens when accessing index 4?',
        solution: 'Runtime ArrayIndexOutOfBoundsException',
        explanation: 'The length of nums is 4, but valid indices are 0 through 3. Accessing nums[4] causes the JVM to throw an ArrayIndexOutOfBoundsException at runtime.'
      },
      {
        title: 'Puzzle 4: Array Reference Reassignment',
        problemStatement: 'What value is printed after reference reassignment?',
        code: `int[] a = {1, 2, 3};
int[] b = {4, 5, 6};
a = b;
b[1] = 99;
System.out.println(a[1]);`,
        options: ['2', '5', '99', 'Compilation Error'],
        correctOptionIndex: 2,
        hint: 'After "a = b", reference "a" points to the second array {4, 5, 6}.',
        solution: '99',
        explanation: 'The statement "a = b" updates "a" to hold the memory address of "b"\'s array. When b[1] is updated to 99, a[1] reflects that change because both point to the same array.'
      },
      {
        title: 'Puzzle 5: Nested Array Index Expression',
        problemStatement: 'Trace the value printed by evaluating the nested index lookup.',
        code: `int[] list = {2, 0, 1};
System.out.println(list[list[0]]);`,
        options: ['2', '0', '1', 'ArrayIndexOutOfBoundsException'],
        correctOptionIndex: 2,
        hint: 'Evaluate list[0] first. What value does it hold? Then use that value as the outer index.',
        solution: '1',
        explanation: 'list[0] evaluates to 2. Then the expression becomes list[2]. Looking at index 2 of the array, the value is 1.'
      },
      {
        title: 'Puzzle 6: Swapping Array Elements In-Place',
        problemStatement: 'What are the contents of the array after executing these swap statements?',
        code: `int[] items = {10, 20, 30};
int temp = items[0];
items[0] = items[2];
items[2] = temp;
System.out.println(items[0] + " " + items[1] + " " + items[2]);`,
        options: ['10 20 30', '30 20 10', '30 20 30', '10 20 10'],
        correctOptionIndex: 1,
        hint: 'temp saves 10. items[0] receives 30. items[2] receives the saved 10.',
        solution: '30 20 10',
        explanation: 'This is a standard swap algorithm: items[0] and items[2] exchange their values using temp as a holding variable. The array becomes [30, 20, 10].'
      },
      {
        title: 'Puzzle 7: Uninstantiated Array Reference',
        problemStatement: 'What occurs when running the following code?',
        code: `int[] data = null;
System.out.println(data.length);`,
        options: [
          'Prints 0',
          'Compilation Error: data not initialized',
          'Runtime NullPointerException',
          'Prints -1'
        ],
        correctOptionIndex: 2,
        hint: 'data holds null, meaning it points to no object in heap memory. Attempting to access a field on null fails.',
        solution: 'Runtime NullPointerException',
        explanation: 'Because data is explicitly assigned null, there is no array object on the heap. Dereferencing data to read .length triggers a runtime NullPointerException.'
      },
      {
        title: 'Puzzle 8: Arithmetic Inside Index Brackets',
        problemStatement: 'What does this code output?',
        code: `int[] vals = {10, 20, 30, 40, 50};
int k = 1;
System.out.println(vals[k * 2 + 1]);`,
        options: ['20', '30', '40', '50'],
        correctOptionIndex: 2,
        hint: 'Evaluate the expression inside the brackets: 1 * 2 + 1 = 3.',
        solution: '40',
        explanation: 'Operator precedence evaluates multiplication first: k * 2 = 2, then 2 + 1 = 3. vals[3] corresponds to the 4th element, which is 40.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is an array in Java, and where does it reside in computer memory?',
        answer: 'In Java, an array is a dynamically created object that stores a fixed-size sequence of elements of the same type. The array elements and its metadata (including its length) are always allocated contiguously on the garbage-collected heap. The variable holding the array is a reference variable stored on the thread stack frame, which simply holds the memory address of the heap object.',
        followUp: 'If an array stores primitive values like int or double, are those primitives stored on the stack or the heap?',
        followUpAnswer: 'The primitives inside the array are stored directly inside the array object on the heap! Even though int is a primitive type, because it lives inside an array object, its bits reside in the contiguous heap block allocated for that array.',
        keyPhrases: ['dynamically created object', 'contiguous heap memory', 'reference on stack', 'primitives inside heap object'],
        commonMistakeAnswer: 'Claiming primitive arrays live on the stack while object arrays live on the heap.'
      },
      {
        question: 'Why are array indices in Java 0-based instead of 1-based?',
        answer: 'Zero-based indexing stems from memory address calculation. An array index represents the offset (distance) from the array\'s base memory address. The address of element i is calculated as BaseAddress + (i * elementSize). For the very first element, the offset is 0 * elementSize = 0, meaning it is located exactly at the base address. Using 0-based indexing avoids an extra subtraction instruction at the CPU hardware level for every array access.',
        followUp: 'What is the time complexity of accessing an array element by index in Java?',
        followUpAnswer: 'It is O(1) constant time. Because the memory is contiguous and elements are uniformly sized, the CPU calculates the exact memory address in a single arithmetic operation and accesses it immediately.',
        keyPhrases: ['offset from base address', 'memory address arithmetic', 'O(1) constant time access', 'hardware optimization'],
        commonMistakeAnswer: 'Saying it is just an arbitrary historical tradition without mentioning the memory offset formula.'
      },
      {
        question: 'What happens when you declare "int[] arr = new int[5];" behind the scenes in JVM memory?',
        answer: 'Two main events occur: First, the JVM allocates space on the current thread stack for the reference variable "arr". Second, the JVM allocates a block of contiguous memory on the heap large enough for an array object header (which holds type metadata, hashcode, lock state, and the length 5) plus 5 * 4 = 20 bytes for the integer elements. The JVM automatically writes zeroes to all 20 bytes, and finally writes the base memory address of that heap block into "arr".',
        followUp: 'What default values are assigned to arrays of boolean, double, and String?',
        followUpAnswer: 'boolean arrays default to false (0 in JVM bytecode), double arrays default to 0.0, and String (or any reference type) arrays default to null.',
        keyPhrases: ['object header', 'contiguous heap block', 'JVM zeroing', 'reference address assignment'],
        commonMistakeAnswer: 'Thinking uninitialized array elements contain random garbage memory like in C.'
      },
      {
        question: 'Can you change the size of an array in Java once it has been created? Why or why not?',
        answer: 'No, arrays in Java have an immutable, fixed length once instantiated. The JVM requests a single contiguous block of memory from the heap for that exact size. Allowing an array to expand in-place would require contiguous space directly adjacent to it, which might already be occupied by other heap objects. To "resize" an array, you must allocate a new array of the desired capacity and copy elements over.',
        followUp: 'How is the array\'s length accessed, and can code modify it directly?',
        followUpAnswer: 'It is accessed via the public final field "arr.length". Because it is declared final, any attempt to reassign it (e.g. "arr.length = 10;") causes a compilation error: "cannot assign a value to final variable length".',
        keyPhrases: ['fixed contiguous allocation', 'heap fragmentation prevention', 'public final field', 'cannot assign to final variable'],
        commonMistakeAnswer: 'Believing you can resize an array by reassigning arr.length.'
      },
      {
        question: 'What is the difference between "arr.length" and "str.length()" in Java?',
        answer: '"arr.length" is a public final instance field built directly into every Java array object at the JVM level, so no parentheses are used. On the other hand, "str.length()" is a public instance method defined on the java.lang.String class that returns the number of characters in the string, requiring parentheses.',
        followUp: 'Why didn\'t Java designers provide a length() method for arrays as well?',
        followUpAnswer: 'For performance and direct JVM representation. An array is a primitive data structure heavily optimized by the JVM. Exposing the length as a final field allows the JIT compiler to fetch the dimension directly from the object header with zero method invocation overhead.',
        keyPhrases: ['final instance field vs instance method', 'no parentheses for array', 'JIT compiler optimization', 'object header retrieval'],
        commonMistakeAnswer: 'Confusing the syntax and writing arr.length() or str.length.'
      },
      {
        question: 'What is the difference between "int[] arr" and "int arr[]"? Which is preferred?',
        answer: 'Both syntaxes are syntactically valid in Java and produce identical bytecode. However, "int[] arr" is strongly preferred by the Java community and Google Java Style Guide because it keeps the data type cleanly grouped together—it clearly reads "arr is a variable of type int-array". The "int arr[]" syntax was only added to Java originally to help C/C++ developers transition smoothly.',
        followUp: 'Is there any subtle difference when declaring multiple variables on one line?',
        followUpAnswer: 'Yes! "int[] a, b;" declares BOTH a and b as int arrays (int[]). In contrast, "int a[], b;" declares "a" as an int array, but "b" as a regular single primitive integer! This makes "int[] arr" much safer.',
        keyPhrases: ['int[] arr is idiomatic Java', 'int arr[] is C-legacy', 'multi-variable declaration trap', 'type grouping'],
        commonMistakeAnswer: 'Believing one allocates differently in memory or has different performance.'
      },
      {
        question: 'What happens at runtime if you access a negative index or an index >= arr.length?',
        answer: 'The JVM throws an "ArrayIndexOutOfBoundsException" at runtime and terminates the thread if unhandled. Java guarantees memory safety: every array access is checked by the runtime against 0 and arr.length to prevent reading or corrupting arbitrary memory outside the allocated boundary, completely eliminating buffer overflow vulnerabilities common in C/C++.',
        followUp: 'Can the Java compiler detect array index out of bounds errors during compilation?',
        followUpAnswer: 'Generally no. Array index checking is performed at runtime. Even with literals like "int[] a = new int[3]; a[5] = 10;", standard javac does not prevent compilation because array indexing semantics are enforced dynamically by the JVM instruction "iastore".',
        keyPhrases: ['ArrayIndexOutOfBoundsException', 'memory safety guarantee', 'buffer overflow prevention', 'runtime boundary check'],
        commonMistakeAnswer: 'Thinking it causes a compile-time error or prints null.'
      },
      {
        question: 'What happens when you execute "int[] b = a;" where "a" is an existing array?',
        answer: 'This performs a reference copy, creating an alias. The variable "b" receives a copy of the 32-bit or 64-bit memory address stored in "a". No new array is created on the heap. Both "a" and "b" now refer to the exact same heap object. Any modification made through "b" (e.g. "b[0] = 50;") is immediately reflected when accessing "a[0]".',
        followUp: 'How do you create an independent, separate clone of an array?',
        followUpAnswer: 'You can allocate a new array of the same length and copy elements using a loop, use "a.clone()", use "System.arraycopy()", or use "Arrays.copyOf(a, a.length)".',
        keyPhrases: ['shallow reference copy', 'shared heap object', 'aliasing', 'a.clone() or Arrays.copyOf()'],
        commonMistakeAnswer: 'Assuming assignment creates an independent deep copy of the array.'
      },
      {
        question: 'Can an array in Java have a length of 0? Can it have a negative length?',
        answer: 'An array CAN have a length of 0 (e.g. "new int[0]"). An empty array is a valid, fully formed heap object with "length == 0", useful for returning empty results without returning null. However, attempting to instantiate an array with a negative size (e.g. "new int[-5]") immediately throws a "NegativeArraySizeException" at runtime.',
        followUp: 'Why is returning a zero-length array preferred over returning null from methods?',
        followUpAnswer: 'It avoids NullPointerExceptions in client code. If a method returns "new int[0]", callers can safely write "for (int x : result)" without having to write defensive "if (result != null)" guards.',
        keyPhrases: ['zero-length array is valid', 'NegativeArraySizeException', 'null-avoidance pattern', 'safe iteration'],
        commonMistakeAnswer: 'Thinking an array of size 0 is identical to null.'
      },
      {
        question: 'What is an anonymous array in Java, and when is it useful?',
        answer: 'An anonymous array is an array instantiated without assigning it to a named reference variable, using the syntax "new int[]{1, 2, 3}". It is created on the fly and typically passed directly as an argument to a method, e.g. "calculateTotal(new int[]{10, 20, 30});".',
        followUp: 'Why can\'t you just write "calculateTotal({10, 20, 30});" without the "new int[]"?',
        followUpAnswer: 'The shortcut literal "{...}" is only legal right at the point of variable declaration (e.g. "int[] arr = {1, 2, 3};"). Outside of declaration statements, the Java compiler requires the explicit type constructor "new int[]{...}" to disambiguate the array type.',
        keyPhrases: ['no reference identifier', 'inline method parameter', 'new int[]{...} syntax', 'declaration-only shortcut { }'],
        commonMistakeAnswer: 'Thinking anonymous arrays are arrays with empty brackets.'
      },
      {
        question: 'How are arrays passed into Java methods—by value or by reference?',
        answer: 'Java is STRICTLY pass-by-value, always! When an array is passed to a method, what is passed by value is the copy of the reference (the memory address). Inside the method, you can use that copied reference to modify the contents of the caller\'s array (e.g. "arr[0] = 99;"). However, if you reassign the parameter itself ("arr = new int[10];"), you are only changing the local copied reference; the caller\'s original array reference remains completely unchanged.',
        followUp: 'Why do many developers incorrectly describe Java array passing as "pass-by-reference"?',
        followUpAnswer: 'Because mutations to the array elements inside the method are visible outside the method. However, in true pass-by-reference languages (like C++ with &), reassigning the parameter variable would repoint the caller\'s original variable, which is impossible in Java.',
        keyPhrases: ['strictly pass-by-value', 'copy of the reference', 'element mutation vs reference reassignment', 'caller reference unchanged'],
        commonMistakeAnswer: 'Claiming Java passes primitives by value and objects/arrays by reference.'
      }
    ],
    miniQuiz: [
      {
        question: 'Where is an array object stored in Java memory when created inside a local method?',
        options: ['On the thread stack frame', 'On the garbage-collected heap', 'In the Metaspace / Method Area', 'In the CPU cache registers'],
        correctIndex: 1,
        explanation: 'In Java, all array objects are allocated on the heap. The local variable on the stack merely holds the memory address pointing to the heap object.'
      },
      {
        question: 'What is the default value of elements in a newly allocated "boolean[] flags = new boolean[5];"?',
        options: ['true', 'false', '0', 'null'],
        correctIndex: 1,
        explanation: 'The JVM automatically zeroes heap memory. The default value for boolean elements is false.'
      },
      {
        question: 'Which of the following lines correctly retrieves the number of elements in an array named "items"?',
        options: ['items.length()', 'items.length', 'items.size()', 'items.count'],
        correctIndex: 1,
        explanation: 'In Java, arrays have a public final field named "length". It is a field, not a method, so no parentheses are used.'
      },
      {
        question: 'What happens when executing "int[] arr = new int[3]; System.out.println(arr[3]);"?',
        options: [
          'Prints 0',
          'Prints null',
          'Compilation error',
          'Throws ArrayIndexOutOfBoundsException at runtime'
        ],
        correctIndex: 3,
        explanation: 'An array of size 3 has valid indices 0, 1, and 2. Index 3 is out of bounds, so the JVM throws an ArrayIndexOutOfBoundsException at runtime.'
      },
      {
        question: 'What does the assignment "int[] b = a;" do in Java?',
        options: [
          'Creates a brand new array on the heap with identical elements',
          'Copies the memory address of "a" into "b" so both point to the same array',
          'Transfers ownership of the array to "b" and deletes "a"',
          'Causes a compile error unless a.clone() is used'
        ],
        correctIndex: 1,
        explanation: 'Array variables store object references. Assigning "b = a" copies the reference address, creating an alias to the same heap object.'
      },
      {
        question: 'Which statement about array sizing in Java is TRUE?',
        options: [
          'An array can dynamically grow when new elements are inserted',
          'An array size can be changed by reassigning "arr.length = 10;"',
          'An array\'s size is permanently fixed once instantiated on the heap',
          'Arrays can shrink automatically when elements are set to 0'
        ],
        correctIndex: 2,
        explanation: 'Arrays in Java have a fixed, immutable size once allocated on the heap. To store more elements, a new array must be created.'
      },
      {
        question: 'What exception is thrown if you try to instantiate an array with "new int[-5]"?',
        options: ['ArrayIndexOutOfBoundsException', 'NegativeArraySizeException', 'IllegalArgumentException', 'NullPointerException'],
        correctIndex: 1,
        explanation: 'Attempting to allocate an array with a negative dimension throws a NegativeArraySizeException at runtime.'
      },
      {
        question: 'Which of the following is a valid anonymous array instantiation in Java?',
        options: ['new int[3]{1, 2, 3}', 'new int[]{1, 2, 3}', 'new {1, 2, 3}', 'int[]{1, 2, 3}'],
        correctIndex: 1,
        explanation: '"new int[]{1, 2, 3}" is the valid syntax. Specifying a dimension inside brackets like new int[3]{...} is a compile-time error.'
      },
      {
        question: 'What is the default value of elements in a "String[] names = new String[4];" array?',
        options: ['"" (empty string)', '"null"', 'null', '0'],
        correctIndex: 2,
        explanation: 'String is a reference type (an object). All unassigned reference type array slots default to null.'
      },
      {
        question: 'What is the valid index range for an array of length N?',
        options: ['1 to N', '0 to N', '0 to N - 1', '-1 to N - 1'],
        correctIndex: 2,
        explanation: 'Java arrays are 0-based. For an array of length N, the valid indices range from 0 to N - 1 inclusive.'
      }
    ]
  },

  // ============================================================
  // LESSON 7.2: ARRAY TRAVERSALS & COMMON PATTERNS
  // ============================================================
  'array-traversals-and-algorithms': {
    id: 'array-traversals-and-algorithms',
    moduleId: 'java-arrays',
    moduleTitle: '7. Arrays & 2D Matrix',
    lessonNumber: 'Lesson 7.2',
    title: 'Array Traversals & Common Patterns',
    subtitle: 'Standard for loops, enhanced for-each loop, two-pointer reversal, linear search, and running statistics',
    estimatedMinutes: 25,
    beginnerAnalogy: 'Imagine a long hallway lined with numbered storage lockers. A standard for-loop is like an inspector walking with a clipboard displaying locker numbers (0, 1, 2...): you know your exact position, you can walk forward, walk backward, skip lockers, look at your neighbor locker, or swap items between lockers. An enhanced for-each loop, by contrast, is like standing by a conveyor belt: each item is brought to your hands one by one. It is smooth and easy for inspecting items, but you do not know the locker number, you cannot step backward, and altering the item in your hands does not change what remains stored in the locker!',
    interviewTakeaways: [
      'For-Loop vs For-Each: Use standard indexed for loops when you need the index, need to mutate array elements, or need custom steps/reverse traversal. Use enhanced for-each strictly for read-only forward passes.',
      'For-Each Cannot Mutate: The loop variable in "for (int x : arr)" is a local copy of each element. Reassigning "x = 100;" modifies only the local variable, leaving the heap array untouched.',
      'Two-Pointer In-Place Reversal: Reversing an array using left and right pointers achieves O(N) time and O(1) auxiliary space without creating a second array.',
      'Safe Min/Max Initialization: Never initialize min/max to arbitrary values like 0. Always initialize to arr[0] or Integer.MIN_VALUE / Integer.MAX_VALUE to handle all-negative arrays correctly.',
      'Single-Pass Second Largest: Maintain largest and secondLargest in a single O(N) scan by updating secondLargest whenever a new largest is found or when a candidate lies between the two.'
    ],
    cheatSheet: {
      summary: 'Array traversal involves iterating through elements sequentially using indexed loops or enhanced for-each loops to search, filter, aggregate, or rearrange elements.',
      syntaxTemplate: `// 1. Standard Forward Traversal:
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}

// 2. Backward / Reverse Traversal:
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.println(arr[i]);
}

// 3. Enhanced For-Each (Read-Only):
for (int item : arr) {
    System.out.println(item); // Note: cannot mutate arr[i] here!
}

// 4. Two-Pointer In-Place Reversal:
int left = 0, right = arr.length - 1;
while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
}`,
      rules: [
        { rule: 'Loop Boundary Safety', explanation: 'Condition must strictly be "i < arr.length" (or "i <= arr.length - 1"). Using "i <= arr.length" crashes at runtime.' },
        { rule: 'For-Each Immutability', explanation: 'Reassigning the iteration variable in an enhanced for-each loop has zero effect on the array.' },
        { rule: 'Extreme Values Setup', explanation: 'Initialize min and max with arr[0], never with 0, so negative arrays are evaluated accurately.' },
        { rule: 'Empty Array Guard', explanation: 'Always verify "arr != null && arr.length > 0" before accessing arr[0] for min/max calculations.' },
        { rule: 'Two-Pointer Space Efficiency', explanation: 'In-place array algorithms use O(1) auxiliary space by swapping elements directly within the existing memory.' }
      ],
      quickComparison: [
        { aspect: 'Index Availability', optionA: 'Standard for: Full access to index "i" for offsets & conditions', optionB: 'Enhanced for-each: No index available (hidden iterator)' },
        { aspect: 'Element Mutation', optionA: 'Standard for: Can modify array via "arr[i] = newVal"', optionB: 'Enhanced for-each: Cannot modify array elements' },
        { aspect: 'Traversal Direction', optionA: 'Standard for: Any direction (forward, backward, stride by k)', optionB: 'Enhanced for-each: Strictly forward from 0 to length - 1' },
        { aspect: 'Reversal Strategy', optionA: 'Two-Pointer In-Place: O(N) time, O(1) extra space', optionB: 'New Array Clone: O(N) time, O(N) extra space' },
        { aspect: 'Search Strategy', optionA: 'Linear Search: Works on unsorted arrays, O(N) time', optionB: 'Binary Search: Requires sorted array, O(log N) time' }
      ]
    },
    coreExplanation: [
      'Indexed For Loop Traversal: The standard loop "for (int i = 0; i < arr.length; i++)" provides complete control. The index variable "i" acts as a pointer moving through indices 0 to length - 1, allowing reading, writing, bidirectional movement, and comparing adjacent elements ("arr[i]" vs "arr[i+1]").',
      'Enhanced For-Each Loop: Introduced in Java 5, "for (int element : arr)" provides clean, readable syntax that completely eliminates off-by-one boundary errors. It sequentially copies each element into the local variable "element".',
      'The For-Each Mutation Trap: The iteration variable in a for-each loop is merely a local copy on the stack. If you execute "for (int x : arr) { x = x * 2; }", you are only doubling the local stack variable "x". The elements in the heap array remain completely unchanged! To mutate elements, you must use an indexed for loop.',
      'Reverse Traversal: To process an array backwards, start the loop at "int i = arr.length - 1" and decrement "i--" until "i >= 0". This pattern is vital for reversing data, printing backwards, and processing postfix structures.',
      'Linear Search Algorithm: Linear search sequentially checks each slot from 0 to length - 1 until it finds an element equal to the target. If found, it returns the index; if the loop completes without finding a match, it returns -1. Time complexity is O(N) and works on both sorted and unsorted arrays.',
      'Finding Min and Max (The Initializer Trap): When searching for the minimum or maximum element, never initialize your tracker to 0! If the array contains negative numbers like {-10, -5, -20}, a max initialized to 0 will incorrectly return 0. Always initialize "max = arr[0]" and "min = arr[0]".',
      'Two-Pointer Reversal: To reverse an array in-place, place a "left" pointer at index 0 and a "right" pointer at "arr.length - 1". In a while loop ("while (left < right)"), swap the elements at left and right using a temporary variable, then increment left and decrement right. This takes O(N) time and O(1) extra space.',
      'Single-Pass Second Largest: Finding the second largest element without sorting requires tracking two variables: "largest" and "secondLargest". For each element "x", if "x > largest", "secondLargest" becomes "largest" and "largest" becomes "x". Else if "x > secondLargest && x != largest", "secondLargest" becomes "x". This runs in O(N) time vs O(N log N) for sorting.'
    ],
    diagram: `+-------------------------------------------------------------------------------+
|                    TWO-POINTER IN-PLACE ARRAY REVERSAL                        |
+-------------------------------------------------------------------------------+

Initial State:
  Indices:    [0]     [1]     [2]     [3]     [4]
  Elements:  | 10  |  20   |  30   |  40   |  50  |
               ^                               ^
             left                            right   (Swap 10 and 50)
             left++                          right--

Step 1:
  Elements:  | 50  |  20   |  30   |  40   |  10  |
                       ^               ^
                     left            right           (Swap 20 and 40)
                     left++          right--

Step 2:
  Elements:  | 50  |  40   |  30   |  20   |  10  |
                               ^
                          left == right              (Loop terminates! left < right is false)

Final Result: [50, 40, 30, 20, 10] in O(N/2) swaps and O(1) Auxiliary Memory!`,
    codeSnippet: {
      title: 'Two-Pointer Array Reversal and Statistics in Java',
      code: `public class TraversalPatternsDemo {
    public static void main(String[] args) {
        int[] numbers = {14, 7, 28, 4, 35, 21};

        // 1. Finding Min, Max, and Sum in a single pass
        int min = numbers[0];
        int max = numbers[0];
        int sum = 0;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] < min) min = numbers[i];
            if (numbers[i] > max) max = numbers[i];
            sum += numbers[i];
        }

        double average = (double) sum / numbers.length;
        System.out.println("Min: " + min + ", Max: " + max);
        System.out.println("Sum: " + sum + ", Average: " + average);

        // 2. In-Place Reversal using Two Pointers
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int temp = numbers[left];
            numbers[left] = numbers[right];
            numbers[right] = temp;
            left++;
            right--;
        }

        // 3. Printing reversed array using enhanced for-each
        System.out.print("Reversed Array: ");
        for (int val : numbers) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'int min = numbers[0]; int max = numbers[0];', explanation: 'Initializes min and max with the first element, guaranteeing correct results even for all-negative values.' },
        { line: 'sum += numbers[i];', explanation: 'Accumulates each element into a running total variable across the loop.' },
        { line: 'double average = (double) sum / numbers.length;', explanation: 'Casts sum to double before division to prevent integer truncation of the decimal component.' },
        { line: 'while (left < right)', explanation: 'Executes until pointers meet in the middle; elements at left and right are swapped each iteration.' },
        { line: 'for (int val : numbers)', explanation: 'Enhanced for-each loop cleanly iterates over each element for read-only printing.' }
      ],
      output: `Min: 4, Max: 35
Sum: 109, Average: 18.166666666666668
Reversed Array: 21 35 4 28 7 14 `
    },
    codeExamples: [
      {
        title: 'Example 1: Linear Search with Found Index and Flag',
        description: 'Searching for a target value in an unsorted array and handling hit vs miss.',
        code: `public class LinearSearchDemo {
    public static void main(String[] args) {
        int[] scores = {65, 82, 94, 71, 88};
        int target = 94;
        int foundIndex = -1;

        for (int i = 0; i < scores.length; i++) {
            if (scores[i] == target) {
                foundIndex = i;
                break; // Target located; terminate loop early
            }
        }

        if (foundIndex != -1) {
            System.out.println("Target " + target + " found at index: " + foundIndex);
        } else {
            System.out.println("Target " + target + " not found in array.");
        }
    }
}`,
        output: 'Target 94 found at index: 2'
      },
      {
        title: 'Example 2: Single-Pass Second Largest Element',
        description: 'Finding the second largest element in O(N) time without sorting.',
        code: `public class SecondLargestDemo {
    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 35};

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > largest) {
                secondLargest = largest;
                largest = arr[i];
            } else if (arr[i] > secondLargest && arr[i] != largest) {
                secondLargest = arr[i];
            }
        }

        System.out.println("Largest: " + largest);
        System.out.println("Second Largest: " + secondLargest);
    }
}`,
        output: `Largest: 35
Second Largest: 34`
      },
      {
        title: 'Example 3: The For-Each Mutation Trap Demo',
        description: 'Proving that modifying the enhanced for-each loop variable fails to modify the array.',
        code: `public class ForEachTrapDemo {
    public static void main(String[] args) {
        int[] data = {1, 2, 3};

        // Attempting to double each element using for-each
        for (int val : data) {
            val = val * 2; // Only modifies local stack variable 'val'!
        }
        System.out.println("After for-each loop: data[0] = " + data[0]);

        // Proper modification using standard indexed loop
        for (int i = 0; i < data.length; i++) {
            data[i] = data[i] * 2; // Directly mutates heap slot
        }
        System.out.println("After indexed loop:  data[0] = " + data[0]);
    }
}`,
        output: `After for-each loop: data[0] = 1
After indexed loop:  data[0] = 2`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Initializing min or max to 0 (e.g. "int max = 0;").',
        whyItHappens: 'Assuming array elements will always be positive numbers.',
        howToFix: 'Always initialize with the first element: "int max = arr[0];", or use Integer.MIN_VALUE / Integer.MAX_VALUE.'
      },
      {
        mistake: 'Using "i <= arr.length" in loop condition.',
        whyItHappens: 'Thinking the loop should count all the way up to the length value.',
        howToFix: 'Use strictly less-than: "i < arr.length". The last valid index is always length - 1.'
      },
      {
        mistake: 'Returning from a search method inside the loop on the first mismatch.',
        whyItHappens: 'Putting an "else return -1;" inside the loop body, which gives up after checking index 0.',
        howToFix: 'Only return inside the loop when the target IS found. Place the return -1 AFTER the loop completes.'
      },
      {
        mistake: 'Checking adjacent elements with "arr[i+1]" without adjusting the loop limit.',
        whyItHappens: 'Running "i < arr.length", so when "i = length - 1", "arr[i+1]" crashes out of bounds.',
        howToFix: 'When accessing "arr[i+1]", stop the loop at "i < arr.length - 1".'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Max on All-Negative Array',
        problemStatement: 'What does this code print for an array containing only negative numbers?',
        code: `int[] nums = {-8, -3, -15, -2};
int max = nums[0];
for (int i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
        max = nums[i];
    }
}
System.out.println(max);`,
        options: ['0', '-2', '-8', '-15'],
        correctOptionIndex: 1,
        hint: 'max starts at -8. Is -3 > -8? Is -15 > -3? Is -2 > -3?',
        solution: '-2',
        explanation: 'Initial: max = -8. Then -3 > -8, so max becomes -3. -15 is not greater. Finally -2 > -3, so max becomes -2. Output is -2.'
      },
      {
        title: 'Puzzle 2: Two-Pointer Reversal Swap Count',
        problemStatement: 'How many element swap operations are performed when reversing an array of length 5?',
        code: `int[] arr = {1, 2, 3, 4, 5};
int left = 0, right = arr.length - 1;
int swaps = 0;
while (left < right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    swaps++;
    left++;
    right--;
}
System.out.println(swaps);`,
        options: ['2', '3', '4', '5'],
        correctOptionIndex: 0,
        hint: 'Pairs to swap: indices (0, 4) and (1, 3). When left = 2 and right = 2, does the loop continue?',
        solution: '2',
        explanation: 'The loop executes when left < right. Iteration 1: left=0, right=4 (swap 1). Iteration 2: left=1, right=3 (swap 2). Then left=2, right=2; left < right is false, loop terminates. Total swaps = 2.'
      },
      {
        title: 'Puzzle 3: Running Prefix Accumulation',
        problemStatement: 'What values does the array hold after running this in-place accumulation loop?',
        code: `int[] vals = {2, 3, 4, 1};
for (int i = 1; i < vals.length; i++) {
    vals[i] = vals[i] + vals[i - 1];
}
System.out.println(vals[2]);`,
        options: ['4', '7', '9', '10'],
        correctOptionIndex: 2,
        hint: 'Trace index 1: 3 + 2 = 5. Now trace index 2: vals[2] + vals[1] = 4 + 5 = 9.',
        solution: '9',
        explanation: 'At i = 1: vals[1] = 3 + vals[0] = 3 + 2 = 5. At i = 2: vals[2] = 4 + vals[1] = 4 + 5 = 9. Output for vals[2] is 9.'
      },
      {
        title: 'Puzzle 4: Enhanced For-Each Mutation Attempt',
        problemStatement: 'What does this code print after executing the for-each loop?',
        code: `int[] scores = {10, 20, 30};
for (int s : scores) {
    s += 5;
}
System.out.println(scores[0] + scores[1]);`,
        options: ['30', '40', '35', 'Compilation Error'],
        correctOptionIndex: 0,
        hint: 'Does modifying the enhanced for-each iteration variable change the actual array?',
        solution: '30',
        explanation: 'In Java, the enhanced for-each loop variable "s" is a local copy on the stack. Mutating "s" does not alter the underlying array in heap memory. scores[0] is still 10, scores[1] is still 20, 10 + 20 = 30.'
      },
      {
        title: 'Puzzle 5: Linear Search Early Termination',
        problemStatement: 'What is printed by this linear search code?',
        code: `int[] nums = {4, 7, 2, 7, 9};
int target = 7;
int count = 0;
for (int n : nums) {
    if (n == target) {
        count++;
        break;
    }
}
System.out.println(count);`,
        options: ['1', '2', '0', '4'],
        correctOptionIndex: 0,
        hint: 'Notice the "break;" keyword inside the condition. When does it stop?',
        solution: '1',
        explanation: 'The loop encounters 7 at the second position, increments count to 1, and immediately hits "break;", terminating the loop. Total count is 1.'
      },
      {
        title: 'Puzzle 6: Reverse Traversal Output',
        problemStatement: 'What is the exact output of this reverse traversal loop?',
        code: `int[] arr = {1, 2, 3};
for (int i = arr.length - 1; i >= 0; i--) {
    System.out.print(arr[i] * 2 + " ");
}`,
        options: ['2 4 6 ', '6 4 2 ', '6 4 ', '2 4 '],
        correctOptionIndex: 1,
        hint: 'Start at i = 2: arr[2] * 2 = 6. Then i = 1: 4. Then i = 0: 2.',
        solution: '6 4 2 ',
        explanation: 'The loop begins at index 2 (value 3, prints 6), moves to index 1 (value 2, prints 4), and index 0 (value 1, prints 2). Output is "6 4 2 ".'
      },
      {
        title: 'Puzzle 7: Adjacent Difference Calculation',
        problemStatement: 'What does this loop calculate and output?',
        code: `int[] a = {3, 7, 2, 8};
int diff = 0;
for (int i = 0; i < a.length - 1; i++) {
    if (a[i + 1] - a[i] > diff) {
        diff = a[i + 1] - a[i];
    }
}
System.out.println(diff);`,
        options: ['4', '6', '8', '2'],
        correctOptionIndex: 1,
        hint: 'Pairs: 7 - 3 = 4; 2 - 7 = -5; 8 - 2 = 6. What is the maximum difference?',
        solution: '6',
        explanation: 'At i=0: 7 - 3 = 4 (diff = 4). At i=1: 2 - 7 = -5 (no change). At i=2: 8 - 2 = 6 (diff = 6). Final diff is 6.'
      },
      {
        title: 'Puzzle 8: Counting Elements Greater Than Average',
        problemStatement: 'What does this program print?',
        code: `int[] data = {10, 20, 30, 40};
int sum = 0;
for (int x : data) sum += x;
int avg = sum / data.length;
int count = 0;
for (int x : data) {
    if (x > avg) count++;
}
System.out.println(count);`,
        options: ['1', '2', '3', '0'],
        correctOptionIndex: 1,
        hint: 'Sum is 100. Average is 100 / 4 = 25. How many elements are strictly > 25?',
        solution: '2',
        explanation: 'Sum = 100, avg = 25. The elements strictly greater than 25 are 30 and 40. Count is 2.'
      }
    ],
    interviewQuestions: [
      {
        question: 'When should you choose a standard indexed for loop over an enhanced for-each loop?',
        answer: 'You must use a standard indexed for loop when: (1) you need to know or use the current index "i", (2) you need to mutate elements in the array ("arr[i] = value"), (3) you need to iterate backward or with a custom stride ("i += 2"), or (4) you need to compare adjacent elements ("arr[i]" and "arr[i+1]"). Choose an enhanced for-each loop only when performing a simple, read-only, forward pass over all elements.',
        followUp: 'Does the enhanced for-each loop have any performance difference compared to a standard indexed loop for arrays?',
        followUpAnswer: 'No. The Java compiler converts an enhanced for-each loop on an array into a standard indexed for loop during compilation. The generated bytecode is essentially identical.',
        keyPhrases: ['index needed', 'mutation required', 'bidirectional traversal', 'identical compiled bytecode'],
        commonMistakeAnswer: 'Thinking enhanced for-each is slower or that it can be used to modify elements.'
      },
      {
        question: 'Why does modifying the loop variable in an enhanced for-each loop not change the array elements?',
        answer: 'Because the iteration variable in "for (int x : arr)" is a local variable allocated on the thread\'s call stack. During each iteration, the JVM copies the primitive value (or reference) from the heap array into "x". Modifying "x" merely overwrites that temporary local variable on the stack; the original memory slot on the heap is never touched.',
        followUp: 'What if the array holds mutable objects and you call a setter method inside for-each?',
        followUpAnswer: 'If the array holds object references, "x" holds a copy of that reference. Calling a mutator method like "x.setName(\\"Bob\\")" will mutate the referenced heap object! However, reassigning "x = new Object()" still will not change the array reference.',
        keyPhrases: ['local stack variable', 'pass-by-value copy', 'heap memory untouched', 'object mutator vs reference reassignment'],
        commonMistakeAnswer: 'Believing the enhanced for-each loop creates an immutable view of the array.'
      },
      {
        question: 'How do you reverse an array in-place without allocating a second array? What are the complexities?',
        answer: 'You use the two-pointer technique: initialize "left = 0" and "right = arr.length - 1". In a loop while "left < right", swap "arr[left]" and "arr[right]" using a temporary variable, then increment "left" and decrement "right". This algorithm runs in O(N) time (performing exactly N / 2 swaps) and O(1) auxiliary space because it uses only a single extra primitive integer variable.',
        followUp: 'Why is an in-place reversal preferred over creating a new reversed array?',
        followUpAnswer: 'Memory efficiency. Creating a new array requires O(N) auxiliary heap memory. If the array contains 100 million integers (400 MB), an in-place swap uses zero additional heap space, avoiding garbage collection overhead and potential OutOfMemoryErrors.',
        keyPhrases: ['two-pointer technique', 'left and right swap', 'O(N) time and O(1) space', 'avoids GC heap overhead'],
        commonMistakeAnswer: 'Creating a new array and copying elements backward, which uses O(N) extra space.'
      },
      {
        question: 'Why is initializing "max = 0" a critical bug when searching for the maximum value in an array?',
        answer: 'If the array contains entirely negative numbers (such as {-10, -25, -3, -40}), every single element in the array is less than 0. The condition "if (arr[i] > max)" will never be true, and the algorithm will report that the maximum value is 0, which is incorrect and not even present in the array! Always initialize with "max = arr[0]" or "max = Integer.MIN_VALUE".',
        followUp: 'What edge case must you check before initializing "max = arr[0]"?',
        followUpAnswer: 'You must ensure the array is not null and has length > 0. If "arr" is empty ("arr.length == 0"), accessing "arr[0]" immediately throws an ArrayIndexOutOfBoundsException.',
        keyPhrases: ['all-negative array failure', 'incorrect phantom zero result', 'initialize to arr[0]', 'empty array boundary check'],
        commonMistakeAnswer: 'Assuming array numbers will always be positive.'
      },
      {
        question: 'How do you find the second largest element in an array in a single O(N) pass without sorting?',
        answer: 'Maintain two variables: "largest" and "secondLargest", both initialized to Integer.MIN_VALUE. Iterate through each element "x": (1) If "x > largest", update "secondLargest = largest" and then "largest = x". (2) Else if "x > secondLargest && x != largest", update "secondLargest = x". This ensures duplicates of the largest element do not masquerade as the second largest, completing in O(N) time and O(1) space.',
        followUp: 'Why is sorting the array to find the second largest considered suboptimal in interviews?',
        followUpAnswer: 'Sorting takes O(N log N) time and alters the original array order. The single-pass scan takes O(N) linear time, preserves the original array order, and does not require allocating extra memory.',
        keyPhrases: ['single-pass O(N)', 'duplicate filtering (x != largest)', 'track largest and secondLargest', 'avoids O(N log N) sort'],
        commonMistakeAnswer: 'Sorting the array and returning arr[arr.length - 2], which fails if duplicates exist (e.g. {10, 10, 9}).'
      },
      {
        question: 'How do you verify if an array is sorted in non-decreasing order in a single pass?',
        answer: 'Iterate from index 0 to arr.length - 2. In each step, check if "arr[i] > arr[i + 1]". If that condition is ever true, immediately return false because adjacent elements violate sorted order. If the loop completes without finding any inversion, return true. This takes O(N) time in the worst case and O(1) space.',
        followUp: 'Why must the loop stop at "arr.length - 2"?',
        followUpAnswer: 'Because the comparison inspects "arr[i + 1]". If the loop ran until "i = arr.length - 1", "arr[i + 1]" would evaluate to "arr[arr.length]", crashing with an ArrayIndexOutOfBoundsException.',
        keyPhrases: ['adjacent element comparison', 'inversion check arr[i] > arr[i+1]', 'loop boundary arr.length - 2', 'early exit on false'],
        commonMistakeAnswer: 'Running the loop to arr.length and crashing out of bounds on the final neighbor lookup.'
      },
      {
        question: 'What is the time complexity of linear search, and when is it preferred over binary search?',
        answer: 'Linear search has a time complexity of O(N) in the worst and average cases, and O(1) in the best case (when the target is at index 0). It is preferred when: (1) the array is unsorted and you only need to perform one or a few lookups (since sorting first would cost O(N log N)), (2) the array is very small where cache-friendly sequential access is faster than branch prediction in binary search, or (3) elements are arriving in a stream.',
        followUp: 'What is the space complexity of linear search?',
        followUpAnswer: 'O(1) constant space, as it only requires a single loop counter variable and a target comparator.',
        keyPhrases: ['O(N) worst case', 'unsorted data', 'avoids expensive sort', 'O(1) auxiliary space'],
        commonMistakeAnswer: 'Thinking binary search is always better even if the array is unsorted.'
      },
      {
        question: 'How do you rotate an array to the left by one position in-place?',
        answer: 'Save the first element in a temporary variable: "int first = arr[0];". Then run a loop from index 0 to arr.length - 2, shifting each element left: "arr[i] = arr[i + 1];". Finally, place the saved element into the last position: "arr[arr.length - 1] = first;". This operates in O(N) time and O(1) space.',
        followUp: 'How would you rotate an array by K positions efficiently?',
        followUpAnswer: 'Using the Reversal Algorithm in O(N) time: normalize K = K % N, reverse the first K elements, reverse the remaining N - K elements, and then reverse the entire array. It operates in-place with O(1) extra space.',
        keyPhrases: ['save first element', 'shift left arr[i] = arr[i+1]', 'assign to last index', 'reversal algorithm for K rotations'],
        commonMistakeAnswer: 'Creating a second array of size N to perform a single-position shift.'
      },
      {
        question: 'How do you calculate the prefix sum array of an input array, and why is it useful?',
        answer: 'Create a new array "prefix" of the same length, set "prefix[0] = arr[0]", and for each index from 1 to N - 1, compute "prefix[i] = prefix[i - 1] + arr[i]". It is useful because it allows any range sum from index L to R to be answered in O(1) constant time via the formula: Sum(L, R) = prefix[R] - (L > 0 ? prefix[L - 1] : 0).',
        followUp: 'Can you compute prefix sums in-place without creating a new array?',
        followUpAnswer: 'Yes, by modifying the input array directly: "arr[i] = arr[i] + arr[i - 1]" starting from index 1. This uses O(1) auxiliary memory.',
        keyPhrases: ['running cumulative sum', 'prefix[i] = prefix[i-1] + arr[i]', 'O(1) range sum queries', 'in-place prefix accumulation'],
        commonMistakeAnswer: 'Recalculating the range sum with a loop from L to R each time in O(N).'
      },
      {
        question: 'Why are sequential array traversals cache-friendly compared to linked list traversals?',
        answer: 'Arrays allocate memory in contiguous heap blocks. When the CPU loads an array element into its L1/L2 cache, the CPU hardware prefetcher automatically loads adjacent contiguous bytes (a cache line, typically 64 bytes). Subsequent array accesses hit the ultra-fast CPU cache with almost zero latency. In contrast, linked list nodes are scattered across random heap locations, causing frequent CPU cache misses.',
        followUp: 'How does spatial locality relate to array performance?',
        followUpAnswer: 'Spatial locality is the principle that accessing a memory location makes nearby memory locations likely to be accessed soon. Contiguous arrays possess ideal spatial locality, maximizing CPU throughput.',
        keyPhrases: ['contiguous memory allocation', 'CPU cache line prefetching', 'spatial locality', 'cache hit vs cache miss'],
        commonMistakeAnswer: 'Saying arrays are faster solely because indices are integers.'
      },
      {
        question: 'How can you find duplicate elements in an array without using extra data structures like HashSet?',
        answer: 'Without extra collections, you can either: (1) Use nested loops to compare every pair "arr[i] == arr[j]" in O(N^2) time and O(1) space, or (2) Sort the array in O(N log N) using Arrays.sort(), and then do a single linear pass checking if "arr[i] == arr[i + 1]" in O(N) time, yielding O(N log N) total time and O(1) space.',
        followUp: 'What trade-off is made when sorting the array first to find duplicates?',
        followUpAnswer: 'You gain speed (O(N log N) vs O(N^2)), but you mutate the original order of elements in the array.',
        keyPhrases: ['nested loop O(N^2)', 'sort and adjacent check O(N log N)', 'O(1) auxiliary space', 'order mutation trade-off'],
        commonMistakeAnswer: 'Assuming you must always use a HashSet to detect duplicates.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the correct loop header to traverse an array "arr" from start to end?',
        options: [
          'for (int i = 0; i <= arr.length; i++)',
          'for (int i = 0; i < arr.length; i++)',
          'for (int i = 1; i <= arr.length; i++)',
          'for (int i = 1; i < arr.length; i++)'
        ],
        correctIndex: 1,
        explanation: 'Arrays are 0-indexed and run up to arr.length - 1. The condition must strictly be "i < arr.length".'
      },
      {
        question: 'What happens when you reassign the loop variable inside an enhanced for-each loop: "for (int x : arr) x = 0;"?',
        options: [
          'All elements in the array are reset to 0',
          'A compilation error occurs because x is final',
          'Only the local variable x changes; the array remains unaffected',
          'An ArrayIndexOutOfBoundsException is thrown'
        ],
        correctIndex: 2,
        explanation: 'In an enhanced for-each loop, the loop variable is a local stack copy of each element. Mutating it does not modify the underlying heap array.'
      },
      {
        question: 'What is the auxiliary space complexity of reversing an array using the two-pointer swap technique?',
        options: ['O(N)', 'O(log N)', 'O(1)', 'O(N^2)'],
        correctIndex: 2,
        explanation: 'The two-pointer technique swaps elements in-place using a single temporary variable, requiring O(1) auxiliary space.'
      },
      {
        question: 'What value should an integer "max" variable be initialized to when finding the maximum of an array with possible negative values?',
        options: ['0', 'Integer.MAX_VALUE', 'arr[0]', '-1'],
        correctIndex: 2,
        explanation: 'Initializing to arr[0] (or Integer.MIN_VALUE) ensures that even if all numbers in the array are negative, the true maximum is determined correctly.'
      },
      {
        question: 'In a two-pointer array reversal, what is the continuation condition for the while loop?',
        options: ['while (left <= arr.length)', 'while (left < right)', 'while (left != arr.length - 1)', 'while (right > 0)'],
        correctIndex: 1,
        explanation: 'The two pointers start at opposite ends and move toward each other. The loop continues while left < right, stopping when they meet or cross.'
      },
      {
        question: 'What is the time complexity of linear search on an unsorted array of size N?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctIndex: 2,
        explanation: 'In the worst case (element at the end or not present), linear search must inspect all N elements, making its time complexity O(N).'
      },
      {
        question: 'When comparing adjacent elements in a loop using "arr[i]" and "arr[i + 1]", what must the loop condition be?',
        options: ['i < arr.length', 'i <= arr.length', 'i < arr.length - 1', 'i <= arr.length - 1'],
        correctIndex: 2,
        explanation: 'To prevent arr[i + 1] from going out of bounds on the last iteration, the loop must stop at i < arr.length - 1.'
      },
      {
        question: 'How many total swaps are needed to reverse an array of 6 elements in-place?',
        options: ['6', '5', '3', '2'],
        correctIndex: 2,
        explanation: 'Reversing an array of length N requires N / 2 swaps. For 6 elements, 6 / 2 = 3 swaps are performed: (0, 5), (1, 4), and (2, 3).'
      },
      {
        question: 'What does a linear search typically return when the target value is not present in the array?',
        options: ['0', '-1', 'null', 'Integer.MIN_VALUE'],
        correctIndex: 1,
        explanation: 'By convention in Java and programming in general, returning -1 signals that the target was not found, since -1 is never a valid index.'
      },
      {
        question: 'Why are arrays faster to traverse sequentially than linked lists?',
        options: [
          'Arrays consume less memory than linked list nodes',
          'Arrays are allocated in contiguous memory, enabling CPU cache line prefetching',
          'Arrays use binary search during traversal',
          'The Java compiler unrolls all array loops automatically'
        ],
        correctIndex: 1,
        explanation: 'Because array elements are stored in contiguous memory addresses, the CPU prefetcher loads neighboring elements into cache lines, maximizing cache hits.'
      }
    ]
  },

  // ============================================================
  // LESSON 7.3: THE java.util.Arrays UTILITY CLASS
  // ============================================================
  'arrays-utility-class': {
    id: 'arrays-utility-class',
    moduleId: 'java-arrays',
    moduleTitle: '7. Arrays & 2D Matrix',
    lessonNumber: 'Lesson 7.3',
    title: 'The java.util.Arrays Utility Class',
    subtitle: 'Deep printing with toString(), Dual-Pivot Quicksort with sort(), logarithmic binarySearch(), fill(), and copyOf()',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Imagine you just purchased a raw lumber kit (a basic Java array). You could use a handheld hand-saw and measuring tape to cut, sand, and measure every board yourself (manual loops). Or, you can open a master power-tool case labeled "java.util.Arrays"! Inside, you find pre-engineered, industrial-grade power tools: a laser scanner that prints your boards cleanly ("Arrays.toString()"), an automated sorting machine that organizes them by size in seconds ("Arrays.sort()"), a radar detector that pinpoints any board instantly ("Arrays.binarySearch()"), a paint sprayer that coats every board uniformly ("Arrays.fill()"), and an industrial duplicator that creates clones or stretched boards ("Arrays.copyOf()").',
    interviewTakeaways: [
      'Arrays.toString() vs Direct Printing: Printing an array directly with System.out.println(arr) outputs its internal memory identity like "[I@1b6d3586". Always use Arrays.toString(arr) for 1D arrays.',
      'Dual-Pivot Quicksort: Arrays.sort() on primitive arrays uses Dual-Pivot Quicksort by Yaroslavskiy, Bentley, and Bloch, offering O(N log N) performance without extra allocation.',
      'Binary Search Prerequisite: Arrays.binarySearch() strictly requires the array to be sorted in ascending order beforehand. Calling it on unsorted data produces undefined, erratic results.',
      'Decoding Negative Binary Search Returns: When a key is not found, binarySearch returns "-(insertion_point) - 1". The exact index where the key belongs is "-(returnValue + 1)".',
      'Arrays.copyOf() Resizing: Arrays.copyOf(arr, newSize) allocates a fresh heap array. If newSize is larger, it pads with default zeros; if smaller, it truncates elements.',
      'Arrays.equals() vs ==: "==" checks reference memory address equality. "Arrays.equals(a, b)" performs deep element-by-element value equality.'
    ],
    cheatSheet: {
      summary: 'The java.util.Arrays class provides static helper methods to print, sort, search, fill, copy, and compare arrays without writing manual boilerplate loops.',
      syntaxTemplate: `import java.util.Arrays;

// 1. Human-Readable Printing:
String text = Arrays.toString(arr);

// 2. Sorting in Ascending Order:
Arrays.sort(arr);                     // Entire array
Arrays.sort(arr, fromIndex, toIndex); // Range [fromIndex, toIndex)

// 3. Binary Search (MUST be sorted first!):
int index = Arrays.binarySearch(arr, target);

// 4. Uniform Filling:
Arrays.fill(arr, 0);                  // Set all to 0
Arrays.fill(arr, 1, 4, -1);           // Set indices 1..3 to -1

// 5. Copying & Resizing:
int[] clone = Arrays.copyOf(arr, arr.length);
int[] expanded = Arrays.copyOf(arr, arr.length * 2);
int[] slice = Arrays.copyOfRange(arr, 1, 4);

// 6. Element Equality:
boolean identical = Arrays.equals(arr1, arr2);`,
      rules: [
        { rule: 'Static-Only Class', explanation: 'java.util.Arrays has a private constructor; all methods are static and called directly on the class name.' },
        { rule: 'Binary Search Requires Sorted Array', explanation: 'Calling Arrays.binarySearch() on an unsorted array returns unpredictable, meaningless results.' },
        { rule: 'Exclusive To-Index Ranges', explanation: 'All range-based methods [fromIndex, toIndex) include fromIndex but exclude toIndex.' },
        { rule: 'Primitive Dual-Pivot Quicksort', explanation: 'Arrays.sort() for primitives modifies the array in-place with O(N log N) average complexity.' },
        { rule: 'Content Equality with Arrays.equals', explanation: 'Never use "==" to compare array contents; "==" only checks if both references share the same heap address.' }
      ],
      quickComparison: [
        { aspect: 'Direct Printing vs toString()', optionA: 'System.out.println(arr): Prints hash code [I@2c7b', optionB: 'Arrays.toString(arr): Prints readable [10, 20, 30]' },
        { aspect: 'Equality: == vs Arrays.equals()', optionA: '==: Checks reference address identity only', optionB: 'Arrays.equals(): Checks length and element values' },
        { aspect: 'Copying: = vs Arrays.copyOf()', optionA: 'b = a: Alias pointer to identical heap array', optionB: 'Arrays.copyOf(a, n): Allocates brand new array object' },
        { aspect: 'Search: Linear vs Binary', optionA: 'Linear search: Works on unsorted, O(N) time', optionB: 'Arrays.binarySearch(): Requires sorted, O(log N) time' },
        { aspect: 'Multi-Dimensional Printing', optionA: 'Arrays.toString(matrix): Prints row memory hashes', optionB: 'Arrays.deepToString(matrix): Recursively prints 2D data' }
      ]
    },
    coreExplanation: [
      'What is java.util.Arrays? It is a standard Java utility class introduced in java.util that contains static methods for searching, sorting, comparing, filling, and serializing arrays. It cannot be instantiated.',
      'The HashCode Printing Trap: In Java, arrays inherit toString() directly from java.lang.Object without overriding it. Calling System.out.println(arr) prints the class name descriptor plus the hex identity hash code (e.g. "[I@1b6d3586", where "[" means array, "I" means int, and "@..." is memory identity). To get a human-readable string like "[1, 2, 3]", you must call "Arrays.toString(arr)".',
      'Dual-Pivot Quicksort with Arrays.sort(): For primitive arrays, "Arrays.sort()" runs the Dual-Pivot Quicksort algorithm. It partitions the array into three segments using two pivot points instead of one, reducing comparison counts and running in O(N log N) time in-place without memory allocation.',
      'Subarray Sorting: You can sort a specific subsection of an array using "Arrays.sort(arr, fromIndex, toIndex)". In Java conventions, "toIndex" is always exclusive: the range sorted includes "fromIndex" up to "toIndex - 1".',
      'Logarithmic Lookup with Arrays.binarySearch(): Binary search operates by repeatedly dividing the search space in half, achieving blazing O(log N) lookup time. However, the array MUST be sorted in ascending order before calling it. If unsorted, the binary split logic fails and returns invalid results.',
      'Decoding Negative Binary Search Returns: If the search key is not found, "Arrays.binarySearch()" returns a negative number: "-(insertion point) - 1". The insertion point is defined as the index where the key would be inserted to maintain sorted order! To decode where the element belongs, calculate: "int insertionIndex = -(returnValue + 1);".',
      'Bulk Initialization with Arrays.fill(): "Arrays.fill(arr, val)" overwrites every slot in the array with "val". It can also target sub-ranges: "Arrays.fill(arr, 2, 5, -1)" sets indices 2, 3, and 4 to -1. This is heavily used in dynamic programming to initialize memoization tables.',
      'Copying and Resizing with Arrays.copyOf(): "Arrays.copyOf(arr, newLength)" creates an entirely new array on the heap. If "newLength" is greater than original, the extra slots are padded with default values (0, false, null), effectively simulating array expansion. If "newLength" is smaller, the array is truncated.'
    ],
    diagram: `+-------------------------------------------------------------------------------+
|                       java.util.Arrays UTILITY METHODS                        |
+-------------------------------------------------------------------------------+

1. Printing:
   int[] arr = {10, 25, 40};
   System.out.println(arr);                 ---> "[I@7ad04a0f"  (Object hashcode)
   System.out.println(Arrays.toString(arr));---> "[10, 25, 40]" (Human-readable)

2. Copying & Resizing:
   Arrays.copyOf(arr, 5);                   ---> [10, 25, 40, 0, 0]  (Padded)
   Arrays.copyOf(arr, 2);                   ---> [10, 25]            (Truncated)

3. Binary Search Returns:
   Sorted Array: Indices:    [0]   [1]   [2]   [3]   [4]
                 Values:    | 10 | 25 | 40 | 60 | 90 |

   Arrays.binarySearch(arr, 40)  --->  Returns:  2  (Found at index 2)
   Arrays.binarySearch(arr, 50)  --->  Returns: -4  (Key belongs at index 3)
                                       Formula: -(insertion_point) - 1 = -(3) - 1 = -4!
                                       Decode:  -( -4 + 1 ) = 3!`,
    codeSnippet: {
      title: 'Comprehensive java.util.Arrays Operations',
      code: `import java.util.Arrays;

public class ArraysUtilityDemo {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 6, 8};

        // 1. Human-readable printing before sorting
        System.out.println("Original: " + Arrays.toString(numbers));

        // 2. In-place sorting using Dual-Pivot Quicksort
        Arrays.sort(numbers);
        System.out.println("Sorted:   " + Arrays.toString(numbers));

        // 3. Binary Search for existing element
        int foundIdx = Arrays.binarySearch(numbers, 42);
        System.out.println("Index of 42: " + foundIdx);

        // 4. Binary Search for missing element (decoding insertion point)
        int missingKey = 50;
        int searchResult = Arrays.binarySearch(numbers, missingKey);
        int insertionPoint = -(searchResult + 1);
        System.out.println("Result for 50: " + searchResult + ", belongs at index: " + insertionPoint);

        // 5. Copy and expand array
        int[] expanded = Arrays.copyOf(numbers, numbers.length + 2);
        System.out.println("Expanded: " + Arrays.toString(expanded));

        // 6. Range fill with sentinel values
        Arrays.fill(expanded, numbers.length, expanded.length, 999);
        System.out.println("Filled:   " + Arrays.toString(expanded));
    }
}`,
      lineByLineExplanation: [
        { line: 'Arrays.toString(numbers);', explanation: 'Formats the 1D array into a clean comma-separated bracketed string "[45, 12, ...]".' },
        { line: 'Arrays.sort(numbers);', explanation: 'Sorts the primitive integer array in-place in ascending order using Dual-Pivot Quicksort in O(N log N) time.' },
        { line: 'Arrays.binarySearch(numbers, 42);', explanation: 'Executes binary search on the sorted array, returning the exact index of 42.' },
        { line: 'int insertionPoint = -(searchResult + 1);', explanation: 'Decodes the negative binary search return value to determine where the missing key 50 belongs.' },
        { line: 'Arrays.copyOf(numbers, numbers.length + 2);', explanation: 'Allocates a new heap array of length 14, copying all 12 original elements and padding the last 2 with 0.' }
      ],
      output: `Original: [45, 12, 85, 32, 89, 39, 69, 44, 42, 1, 6, 8]
Sorted:   [1, 6, 8, 12, 32, 39, 42, 44, 45, 69, 85, 89]
Index of 42: 6
Result for 50: -9, belongs at index: 8
Expanded: [1, 6, 8, 12, 32, 39, 42, 44, 45, 69, 85, 89, 0, 0]
Filled:   [1, 6, 8, 12, 32, 39, 42, 44, 45, 69, 85, 89, 999, 999]`
    },
    codeExamples: [
      {
        title: 'Example 1: Reference Equality (==) vs Content Equality (Arrays.equals)',
        description: 'Demonstrating why == fails for distinct array objects with identical contents.',
        code: `import java.util.Arrays;

public class ArrayEqualityDemo {
    public static void main(String[] args) {
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        int[] arr3 = arr1;

        System.out.println("arr1 == arr2: " + (arr1 == arr2)); // False: different heap memory addresses
        System.out.println("arr1 == arr3: " + (arr1 == arr3)); // True: exact same reference alias
        System.out.println("Arrays.equals(arr1, arr2): " + Arrays.equals(arr1, arr2)); // True: identical content!
    }
}`,
        output: `arr1 == arr2: false
arr1 == arr3: true
Arrays.equals(arr1, arr2): true`
      },
      {
        title: 'Example 2: Slicing Subarrays with Arrays.copyOfRange',
        description: 'Extracting specific sub-sections of an array using fromIndex and toIndex.',
        code: `import java.util.Arrays;

public class CopyOfRangeDemo {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig"};

        // Extract indices 1, 2, 3 (toIndex 4 is exclusive)
        String[] slice = Arrays.copyOfRange(fruits, 1, 4);
        System.out.println("Slice [1..4): " + Arrays.toString(slice));

        // Over-indexing pads with null for object types
        String[] padded = Arrays.copyOfRange(fruits, 4, 8);
        System.out.println("Padded slice: " + Arrays.toString(padded));
    }
}`,
        output: `Slice [1..4): [Banana, Cherry, Date]
Padded slice: [Elderberry, Fig, null, null]`
      },
      {
        title: 'Example 3: Subarray Sorting within a Specific Range',
        description: 'Sorting a portion of an array while leaving surrounding elements in their original positions.',
        code: `import java.util.Arrays;

public class PartialSortDemo {
    public static void main(String[] args) {
        int[] data = {100, 50, 20, 80, 10, 500};

        // Sort only indices 1, 2, 3, 4 (excluding index 0 and index 5)
        Arrays.sort(data, 1, 5);
        System.out.println("Partially Sorted: " + Arrays.toString(data));
    }
}`,
        output: 'Partially Sorted: [100, 10, 20, 50, 80, 500]'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Calling Arrays.binarySearch() on an unsorted array.',
        whyItHappens: 'Assuming binarySearch automatically sorts the array before searching.',
        howToFix: 'Always call Arrays.sort(arr) first. Binary search requires pre-sorted data to operate correctly.'
      },
      {
        mistake: 'Treating negative binarySearch return values as simply "-1".',
        whyItHappens: 'Assuming binary search returns -1 on failure like String.indexOf() does.',
        howToFix: 'Remember that binarySearch returns "-(insertion_point) - 1", which encodes the exact insertion index.'
      },
      {
        mistake: 'Comparing arrays using "arr1.equals(arr2)".',
        whyItHappens: 'Assuming arrays override Object.equals() to check element contents.',
        howToFix: 'Arrays inherit Object.equals(), which checks reference equality (==). Always use "Arrays.equals(arr1, arr2)".'
      },
      {
        mistake: 'Forgetting that range methods exclude the toIndex parameter.',
        whyItHappens: 'Expecting Arrays.fill(arr, 0, 5, -1) to fill index 5.',
        howToFix: 'Java range parameters are half-open intervals [fromIndex, toIndex). Index 5 is excluded; indices 0..4 are filled.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Binary Search Insertion Point Formula',
        problemStatement: 'What does this binarySearch call return for a missing value?',
        code: `int[] arr = {10, 20, 30, 40};
int result = Arrays.binarySearch(arr, 25);
System.out.println(result);`,
        options: ['-1', '-2', '-3', '-4'],
        correctOptionIndex: 2,
        hint: 'Where would 25 belong in {10, 20, 30, 40}? At index 2 (between 20 and 30). Formula is -(insertion_point) - 1.',
        solution: '-3',
        explanation: 'The value 25 belongs at index 2 (between 20 and 30). The formula for missing elements is -(insertion_point) - 1 = -(2) - 1 = -3. Output is -3.'
      },
      {
        title: 'Puzzle 2: Arrays.copyOf Expanding with Defaults',
        problemStatement: 'What is printed after copying and expanding an array?',
        code: `int[] a = {5, 10};
int[] b = Arrays.copyOf(a, 4);
System.out.println(b[2] + " " + b.length);`,
        options: ['null 4', '0 4', '10 4', 'ArrayIndexOutOfBoundsException'],
        correctOptionIndex: 1,
        hint: 'When Arrays.copyOf expands an integer array, extra slots are filled with the default value of int.',
        solution: '0 4',
        explanation: 'Arrays.copyOf(a, 4) creates an array of length 4. The first two elements are copied from a (5, 10), and the remaining two slots are filled with default 0. b[2] is 0, length is 4.'
      },
      {
        title: 'Puzzle 3: Partial Array Range Sorting',
        problemStatement: 'What does this code print after sorting a partial range?',
        code: `int[] nums = {9, 5, 2, 7, 1};
Arrays.sort(nums, 1, 4);
System.out.println(Arrays.toString(nums));`,
        options: [
          '[9, 2, 5, 7, 1]',
          '[1, 2, 5, 7, 9]',
          '[9, 2, 5, 1, 7]',
          '[2, 5, 7, 9, 1]'
        ],
        correctOptionIndex: 0,
        hint: 'Range 1 to 4 sorts indices 1, 2, and 3 only (values 5, 2, 7). Index 0 (9) and index 4 (1) remain untouched.',
        solution: '[9, 2, 5, 7, 1]',
        explanation: 'Arrays.sort(nums, 1, 4) sorts from index 1 inclusive up to index 4 exclusive. Elements at indices 1, 2, 3 (5, 2, 7) are sorted to (2, 5, 7). The array becomes [9, 2, 5, 7, 1].'
      },
      {
        title: 'Puzzle 4: Partial Arrays.fill Range',
        problemStatement: 'What are the contents of the array after the fill operation?',
        code: `int[] data = {1, 1, 1, 1, 1};
Arrays.fill(data, 2, 4, 9);
System.out.println(data[1] + " " + data[2] + " " + data[3] + " " + data[4]);`,
        options: ['1 9 9 1', '1 9 9 9', '9 9 9 1', '1 1 9 9'],
        correctOptionIndex: 0,
        hint: 'Range 2 to 4 modifies indices 2 and 3. Index 4 is exclusive and unchanged.',
        solution: '1 9 9 1',
        explanation: 'Arrays.fill(data, 2, 4, 9) overwrites indices 2 and 3 with 9. Index 1 remains 1, and index 4 remains 1. Output is "1 9 9 1".'
      },
      {
        title: 'Puzzle 5: Array Content Equality Comparison',
        problemStatement: 'What will be printed by the comparison expressions?',
        code: `int[] x = {10, 20};
int[] y = {10, 20};
System.out.println((x == y) + " " + Arrays.equals(x, y));`,
        options: ['true true', 'false true', 'false false', 'true false'],
        correctOptionIndex: 1,
        hint: 'x and y are two distinct objects in heap memory. "==" checks addresses, Arrays.equals checks elements.',
        solution: 'false true',
        explanation: '"x == y" evaluates to false because x and y point to two separate heap objects. "Arrays.equals(x, y)" returns true because lengths and corresponding elements match.'
      },
      {
        title: 'Puzzle 6: Arrays.copyOf Truncation',
        problemStatement: 'What is the length and last element of the truncated array copy?',
        code: `int[] original = {10, 20, 30, 40, 50};
int[] truncated = Arrays.copyOf(original, 3);
System.out.println(truncated.length + " " + truncated[truncated.length - 1]);`,
        options: ['3 30', '3 50', '5 30', '3 40'],
        correctOptionIndex: 0,
        hint: 'Copying with length 3 copies indices 0, 1, and 2. The last element is at index 2.',
        solution: '3 30',
        explanation: 'Arrays.copyOf(original, 3) creates a new array of length 3 with elements [10, 20, 30]. Length is 3 and the last element is 30.'
      },
      {
        title: 'Puzzle 7: Binary Search on Existing Key',
        problemStatement: 'What index is returned by searching for 30 after sorting?',
        code: `int[] arr = {50, 10, 40, 30, 20};
Arrays.sort(arr);
int idx = Arrays.binarySearch(arr, 30);
System.out.println(idx);`,
        options: ['3', '2', '1', '4'],
        correctOptionIndex: 1,
        hint: 'After sorting: {10, 20, 30, 40, 50}. At what index is 30 located?',
        solution: '2',
        explanation: 'After Arrays.sort(arr), the array is [10, 20, 30, 40, 50]. Element 30 is at index 2. Output is 2.'
      },
      {
        title: 'Puzzle 8: Arrays.copyOfRange Over-Indexing',
        problemStatement: 'What value is stored at the final index when copyOfRange exceeds original length?',
        code: `int[] base = {7, 8};
int[] ext = Arrays.copyOfRange(base, 1, 4);
System.out.println(ext[0] + " " + ext[1] + " " + ext[2]);`,
        options: ['8 0 0', '7 8 0', '8 null null', 'ArrayIndexOutOfBoundsException'],
        correctOptionIndex: 0,
        hint: 'Index 1 is 8. Beyond length 2, extra requested slots are padded with 0.',
        solution: '8 0 0',
        explanation: 'Arrays.copyOfRange(base, 1, 4) produces an array of length 3 (indices 1, 2, 3). Index 1 of base is 8. Indices 2 and 3 exceed base.length, so they are padded with default 0s. Result: [8, 0, 0].'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does "System.out.println(arr)" print something like "[I@15db9742" instead of array elements?',
        answer: 'Arrays in Java are objects, but they do not override the "toString()" method from java.lang.Object. Object.toString() returns: getClass().getName() + "@" + Integer.toHexString(hashCode()). In "[I@15db9742", "[" denotes a 1D array, "I" denotes the component type int, and the remainder is the unsigned hex memory identity hashcode. To print actual contents, you must call "Arrays.toString(arr)".',
        followUp: 'How do you print multi-dimensional arrays (like 2D matrices) cleanly?',
        followUpAnswer: 'Use "Arrays.deepToString(matrix)". While Arrays.toString(matrix) merely prints an array of row hashcodes, deepToString recursively travels through sub-arrays and prints nested bracketed values.',
        keyPhrases: ['Object.toString() inheritance', 'class descriptor [I', 'identity hashcode', 'Arrays.deepToString() for 2D'],
        commonMistakeAnswer: 'Believing [I@... is a compilation bug or memory leak.'
      },
      {
        question: 'What sorting algorithm does "Arrays.sort()" use for primitive arrays versus object arrays?',
        answer: 'For primitive arrays (like int[], double[]), "Arrays.sort()" uses Dual-Pivot Quicksort by Vladimir Yaroslavskiy, Jon Bentley, and Joshua Bloch. It offers O(N log N) average performance and does not allocate auxiliary memory. For Object arrays (like String[], Integer[]), it uses TimSort (a hybrid of MergeSort and InsertionSort), which is adaptive, guaranteed O(N log N) worst-case, and strictly STABLE (preserves the relative order of equal elements).',
        followUp: 'Why doesn\'t Java use Quicksort for Object arrays?',
        followUpAnswer: 'Because Quicksort is NOT stable! For objects, developers expect equal elements to retain their original relative order (e.g. sorting students by grade while preserving their alphabetical order). TimSort provides this stability guarantee.',
        keyPhrases: ['Dual-Pivot Quicksort for primitives', 'TimSort for objects', 'stability guarantee', 'O(N log N)'],
        commonMistakeAnswer: 'Saying Java uses basic Bubble Sort or single-pivot Quicksort for all arrays.'
      },
      {
        question: 'What is the strict prerequisite before calling "Arrays.binarySearch()", and what happens if you violate it?',
        answer: 'The array MUST be sorted in ascending order according to natural ordering before calling "Arrays.binarySearch()". If the array is unsorted, the result of binarySearch is completely undefined: it may return a negative number even when the target is present, or return an incorrect index. Binary search relies on dividing sorted intervals in half.',
        followUp: 'What is the time complexity of binarySearch compared to linear search?',
        followUpAnswer: 'Binary search runs in O(log N) logarithmic time, requiring at most ~31 comparisons for an array of 2 billion elements, compared to O(N) for linear search.',
        keyPhrases: ['must be sorted in ascending order', 'undefined behavior if unsorted', 'O(log N) logarithmic time', 'halving search space'],
        commonMistakeAnswer: 'Believing binarySearch will automatically sort the array internally first.'
      },
      {
        question: 'What does a negative return value from "Arrays.binarySearch()" represent, and how do you decode it?',
        answer: 'When the key is not found, binarySearch returns "-(insertion_point) - 1". The insertion point is defined as the index where the key would be inserted while keeping the array sorted. It uses "- 1" so that if the element belongs at index 0, it returns -(0) - 1 = -1 instead of 0 (which would falsely signal found at index 0). To decode the insertion point, calculate: "int index = -(returnValue + 1);".',
        followUp: 'Why is knowing the insertion point useful in practice?',
        followUpAnswer: 'It allows you to maintain sorted collections. For example, if you are building an autocomplete dictionary or priority list, you can immediately know where a new incoming item should be inserted without re-scanning or re-sorting.',
        keyPhrases: ['-(insertion_point) - 1', 'disambiguate index 0', 'decode via -(ret + 1)', 'maintaining sorted order'],
        commonMistakeAnswer: 'Thinking negative numbers just mean -1 (failure).'
      },
      {
        question: 'What is the difference between "arr1 == arr2" and "Arrays.equals(arr1, arr2)"?',
        answer: '"arr1 == arr2" checks reference identity: it returns true ONLY if both variables point to the exact same heap memory address. If two arrays are allocated independently but contain identical numbers in the exact same positions, "==" returns false. In contrast, "Arrays.equals(arr1, arr2)" compares lengths and iterates through every index checking element equality, returning true for distinct arrays with matching values.',
        followUp: 'What does "arr1.equals(arr2)" do?',
        followUpAnswer: 'It performs the exact same check as "=="! Because arrays do not override equals() from Object, "arr1.equals(arr2)" merely checks reference equality. Never use .equals() on arrays; always use Arrays.equals().',
        keyPhrases: ['reference identity vs content equality', 'Object.equals() not overridden', 'Arrays.equals checks element-by-element', 'same heap address check'],
        commonMistakeAnswer: 'Assuming arr1.equals(arr2) compares contents like it does for Strings.'
      },
      {
        question: 'How does "Arrays.copyOf()" simulate dynamic resizing of an array, and what happens to extra allocated slots?',
        answer: '"Arrays.copyOf(original, newLength)" allocates a brand-new array object of length "newLength" on the heap and copies up to min(original.length, newLength) elements into it. If "newLength" is larger than original, the newly exposed slots are automatically initialized to their default values (0 for primitives, null for objects). This gives the illusion of growing an array, though it creates a new object and leaves the old array for garbage collection.',
        followUp: 'What happens if "newLength" is smaller than original.length?',
        followUpAnswer: 'The array is truncated: only elements from index 0 up to newLength - 1 are copied into the new array.',
        keyPhrases: ['brand-new heap object', 'padding with default values', 'truncation if smaller', 'garbage collection of old array'],
        commonMistakeAnswer: 'Believing Arrays.copyOf modifies the existing array in-place.'
      },
      {
        question: 'What is the relationship between "Arrays.copyOf()" and "System.arraycopy()"?',
        answer: '"System.arraycopy()" is a native C++ method provided by the JVM that copies a range of elements from a source array to a destination array at high speed using low-level memory block copying (memmove/memcpy). "Arrays.copyOf()" is actually a convenience wrapper around "System.arraycopy()": it allocates the new destination array for you and then calls "System.arraycopy()" under the hood.',
        followUp: 'When would you use System.arraycopy() directly over Arrays.copyOf()?',
        followUpAnswer: 'When you already have a pre-allocated destination array, or when you need to shift elements within the SAME array (like shifting elements left or right during insertion/deletion).',
        keyPhrases: ['native JVM method', 'low-level memory block copy', 'convenience wrapper', 'in-place element shifting'],
        commonMistakeAnswer: 'Thinking Arrays.copyOf is faster than System.arraycopy.'
      },
      {
        question: 'Can "Arrays.sort()" sort a primitive int[] array in descending order directly?',
        answer: 'No, not directly with built-in primitive overloads. The overloaded "Arrays.sort(T[], Comparator)" requires reference types (T[]), which works for "Integer[]" using "Collections.reverseOrder()", but does NOT accept primitive "int[]". To sort a primitive "int[]" in descending order, you either: (1) sort ascending with Arrays.sort(arr) and then reverse it in-place using two pointers, or (2) box into Integer[].',
        followUp: 'Why is sorting ascending and reversing in-place preferred over boxing into Integer[]?',
        followUpAnswer: 'Boxing every int into an Integer object creates massive heap memory overhead (each Integer object has 16-24 bytes of object header overhead) and triggers garbage collection. Reversing an int[] in-place uses zero extra heap memory.',
        keyPhrases: ['no primitive Comparator overload', 'sort ascending and reverse in-place', 'avoids Integer boxing overhead', 'cache efficiency'],
        commonMistakeAnswer: 'Trying to pass Collections.reverseOrder() to Arrays.sort(int[]).'
      },
      {
        question: 'What happens if "fromIndex > toIndex" in range-based methods like "Arrays.sort(arr, fromIndex, toIndex)"?',
        answer: 'The method immediately throws an "IllegalArgumentException" at runtime (specifically: "fromIndex(X) > toIndex(Y)"). Furthermore, if either index is negative or exceeds arr.length, it throws an "ArrayIndexOutOfBoundsException".',
        followUp: 'What happens if "fromIndex == toIndex"?',
        followUpAnswer: 'The range represents an empty interval [fromIndex, fromIndex). The method succeeds quietly without performing any operations and without throwing any exception.',
        keyPhrases: ['IllegalArgumentException', 'empty interval is valid no-op', 'ArrayIndexOutOfBoundsException for negative'],
        commonMistakeAnswer: 'Thinking it automatically swaps the indices or reverses the range.'
      },
      {
        question: 'Why is "Arrays.fill()" frequently used in competitive programming and dynamic programming?',
        answer: 'In dynamic programming and graph algorithms, sentinel values like -1, Integer.MAX_VALUE, or false are needed to represent unvisited states, infinite distances, or uncomputed subproblems. "Arrays.fill(dp, -1)" allows instant bulk initialization of an entire table in a single line, making algorithms concise and preventing uninitialized state bugs.',
        followUp: 'Can Arrays.fill() be used to initialize a 2D array in a single call?',
        followUpAnswer: 'No, "Arrays.fill(matrix, -1)" fails on a 2D int[][] matrix because the elements of matrix are int[] references, not integers! You must loop through each row: "for (int[] row : matrix) Arrays.fill(row, -1);".',
        keyPhrases: ['memoization table initialization', 'sentinel values like -1', 'requires row loop for 2D', 'single-line bulk setup'],
        commonMistakeAnswer: 'Trying to do Arrays.fill(2D_array, 0) directly.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does "System.out.println(new int[]{1, 2, 3});" output directly in the console?',
        options: ['[1, 2, 3]', '{1, 2, 3}', 'A memory identity string like [I@...', 'null'],
        correctIndex: 2,
        explanation: 'Arrays do not override Object.toString(). Direct printing outputs the type descriptor and hex hashcode like "[I@1b6d3586".'
      },
      {
        question: 'Which method properly converts a 1D array into a readable "[elem1, elem2, ...]" String format?',
        options: ['arr.toString()', 'Arrays.toString(arr)', 'Arrays.print(arr)', 'String.valueOf(arr)'],
        correctIndex: 1,
        explanation: 'The static method "Arrays.toString(arr)" formats 1D arrays into readable strings.'
      },
      {
        question: 'What sorting algorithm is utilized by "Arrays.sort(int[])" for primitive types?',
        options: ['MergeSort', 'Dual-Pivot Quicksort', 'HeapSort', 'BubbleSort'],
        correctIndex: 1,
        explanation: 'Java uses Dual-Pivot Quicksort for primitive arrays, providing fast O(N log N) average sorting in-place.'
      },
      {
        question: 'What MUST be done to an array before passing it to "Arrays.binarySearch()"?',
        options: [
          'It must be sorted in ascending order',
          'It must contain no duplicate values',
          'It must be converted to an object array',
          'It must have an even length'
        ],
        correctIndex: 0,
        explanation: 'Binary search requires the elements to be in sorted ascending order. Unsorted arrays produce undefined results.'
      },
      {
        question: 'If "Arrays.binarySearch(arr, key)" returns -4 on a sorted array, what does this indicate?',
        options: [
          'The key was found at index 4',
          'The search failed with an error',
          'The key was not found; it belongs at index 3 to maintain sorted order',
          'The key was not found; it belongs at index 4'
        ],
        correctIndex: 2,
        explanation: 'The return value is -(insertion_point) - 1. If return is -4, then -(ip) - 1 = -4 => ip = 3. The key belongs at index 3.'
      },
      {
        question: 'What does "Arrays.copyOf(arr, 6)" do if "arr" is an int array of length 4?',
        options: [
          'Throws an ArrayIndexOutOfBoundsException',
          'Creates a new array of length 6 with the original 4 elements padded with two 0s',
          'Expands the original array in-place without creating a new object',
          'Truncates the array'
        ],
        correctIndex: 1,
        explanation: 'Arrays.copyOf allocates a new array of length 6, copies the 4 original elements, and initializes the extra 2 slots with default 0.'
      },
      {
        question: 'Which method should be used to test if two distinct arrays have the same length and identical element values?',
        options: ['arr1 == arr2', 'arr1.equals(arr2)', 'Arrays.equals(arr1, arr2)', 'Arrays.compare(arr1, arr2) == -1'],
        correctIndex: 2,
        explanation: 'Arrays.equals(arr1, arr2) iterates through both arrays checking that lengths match and corresponding elements are equal.'
      },
      {
        question: 'What does "Arrays.fill(arr, 1, 4, 99)" do?',
        options: [
          'Fills indices 1, 2, 3, 4 with 99',
          'Fills indices 1, 2, 3 with 99 (index 4 is excluded)',
          'Fills 4 elements starting at index 1',
          'Throws an IllegalArgumentException'
        ],
        correctIndex: 1,
        explanation: 'Java range methods follow the half-open interval [fromIndex, toIndex). Indices 1, 2, and 3 are filled; index 4 is excluded.'
      },
      {
        question: 'What method should you use to convert a 2D matrix into a human-readable string?',
        options: ['Arrays.toString(matrix)', 'Arrays.deepToString(matrix)', 'matrix.toString()', 'Arrays.toMatrixString(matrix)'],
        correctIndex: 1,
        explanation: 'Arrays.deepToString() recursively traverses nested sub-arrays to print multi-dimensional arrays.'
      },
      {
        question: 'What happens if you invoke "Arrays.sort(arr, 3, 1)" where fromIndex > toIndex?',
        options: [
          'The array is sorted in reverse order',
          'It throws an IllegalArgumentException at runtime',
          'The indices are silently swapped',
          'It operates as a no-op'
        ],
        correctIndex: 1,
        explanation: 'Passing fromIndex > toIndex violates the range contract and throws an IllegalArgumentException at runtime.'
      }
    ]
  },

  // ============================================================
  // LESSON 7.4: 2D ARRAYS & MATRIX TRAVERSAL
  // ============================================================
  'two-dimensional-arrays-and-matrices': {
    id: 'two-dimensional-arrays-and-matrices',
    moduleId: 'java-arrays',
    moduleTitle: '7. Arrays & 2D Matrix',
    lessonNumber: 'Lesson 7.4',
    title: '2D Arrays & Matrix Traversal',
    subtitle: 'Arrays of arrays, row-major vs column-major traversal, jagged (ragged) arrays, and matrix operations',
    estimatedMinutes: 25,
    beginnerAnalogy: 'Think of a 2D array in Java like a multi-story apartment building directory. In the lobby, there is a master directory board: "Floor 0, Floor 1, Floor 2" (the outer master array). When you press the elevator button for Floor 0, it does not open into one giant warehouse; it opens onto a hallway where individual apartment doors are lined up: Room 0, Room 1, Room 2 (the inner row array). Because each floor is an independently constructed hallway, different floors don\'t even have to have the same number of apartments! Floor 0 might have 2 penthouses, while Floor 1 has 5 studios—this is exactly how Java creates jagged arrays!',
    interviewTakeaways: [
      'Arrays of Arrays Architecture: In Java, a 2D array is literally a 1D array whose elements hold references to other 1D arrays on the heap. There is no single contiguous rectangular matrix in JVM memory.',
      'Jagged / Ragged Arrays: Because rows are independent heap objects, each row can have a completely different length. You can instantiate only the outer array with "new int[3][]" and allocate rows on demand.',
      'Row-Major Cache Locality: Always traverse 2D arrays in Row-Major order (outer loop rows, inner loop columns). Because each row\'s elements are contiguous, row-major traversal maximizes CPU cache hits; column-major jumps across separate heap objects causing cache misses.',
      'Dimensions Retrieval: "matrix.length" gives the number of rows. "matrix[r].length" gives the number of columns in row "r". Never assume all rows have length equal to matrix[0].length.',
      'Diagonals in Square Matrices: Main diagonal elements satisfy "row == col" (matrix[i][i]). Anti-diagonal elements satisfy "row + col == N - 1" (matrix[i][N - 1 - i]). Both can be scanned in a single O(N) pass.',
      'Deep Printing: Always use "Arrays.deepToString(matrix)" to print 2D arrays; "Arrays.toString(matrix)" only prints row reference hashes.'
    ],
    cheatSheet: {
      summary: 'A 2D array in Java is an array of 1D array references. Traversal requires nested loops, and rows can be rectangular or jagged.',
      syntaxTemplate: `// 1. Fixed Rectangular Matrix (3 rows, 4 columns):
int[][] grid = new int[3][4];

// 2. Matrix Literal:
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// 3. Jagged Array Allocation:
int[][] jagged = new int[3][];
jagged[0] = new int[2];
jagged[1] = new int[4];
jagged[2] = new int[1];

// 4. Standard Row-Major Traversal:
for (int r = 0; r < matrix.length; r++) {
    for (int c = 0; c < matrix[r].length; c++) {
        System.out.print(matrix[r][c] + " ");
    }
    System.out.println();
}

// 5. Deep Printing:
System.out.println(Arrays.deepToString(matrix));`,
      rules: [
        { rule: 'Array of References', explanation: 'A 2D array is a top-level array containing pointers to independent 1D row array objects.' },
        { rule: 'Row Count vs Column Count', explanation: '"matrix.length" is the row count; "matrix[r].length" is the column count for that specific row.' },
        { rule: 'Row-Major Precedence', explanation: 'Access syntax is strictly matrix[rowIndex][colIndex]. Reversing to [col][row] causes out-of-bounds on non-square matrices.' },
        { rule: 'Independent Row Allocation', explanation: 'Rows can be reallocated, swapped, or sized independently without affecting other rows.' },
        { rule: 'Jagged Safety', explanation: 'Always use "matrix[r].length" in the inner loop rather than "matrix[0].length" to safely handle jagged arrays.' }
      ],
      quickComparison: [
        { aspect: 'Traversal Order', optionA: 'Row-Major (outer row, inner col): Cache-friendly, fast', optionB: 'Column-Major (outer col, inner row): Cache misses, slower' },
        { aspect: 'Array Structure', optionA: 'Rectangular Matrix: All rows have identical length', optionB: 'Jagged Array: Rows have different lengths' },
        { aspect: 'Dimensions Check', optionA: 'matrix.length: Returns total number of rows', optionB: 'matrix[i].length: Returns number of columns in row i' },
        { aspect: 'Printing Method', optionA: 'Arrays.toString(): Prints row object hashes [[I@..., [I@...]', optionB: 'Arrays.deepToString(): Recursively prints elements [[1, 2], [3, 4]]' },
        { aspect: 'Memory Layout', optionA: 'C/C++: Single contiguous flattened 2D memory block', optionB: 'Java: Scattered independent 1D heap objects' }
      ]
    },
    coreExplanation: [
      'Java 2D Arrays are "Arrays of Arrays": In Java, true multi-dimensional contiguous arrays do not exist. A 2D array "int[][] arr" is a master 1D array where every element holds a reference to another independent 1D array representing a row.',
      'Memory Layout on the Heap: When you allocate "int[][] grid = new int[3][4];", Java creates: (1) a master array of size 3 on the heap, and (2) three separate 1D array objects of size 4 on the heap. The master array slots point to those three row objects. The rows are not guaranteed to be adjacent in physical memory.',
      'Jagged (Ragged) Arrays: Because each row is an independent heap object, different rows can have different lengths! You can declare "int[][] triangle = new int[3][];" and then allocate "triangle[0] = new int[1];", "triangle[1] = new int[2];", and "triangle[2] = new int[3];". This saves memory when modeling triangular structures like Pascal\'s Triangle.',
      'Row-Major Traversal (Cache Friendly): The standard way to traverse a matrix is Row-Major order: outer loop iterates through rows ("r = 0; r < matrix.length; r++"), and inner loop iterates columns ("c = 0; c < matrix[r].length; c++"). Because all elements in a single row are stored contiguously in that row\'s heap object, the CPU cache line prefetcher accelerates access dramatically.',
      'Column-Major Traversal (Cache Unfriendly): Column-major traversal swaps the loops: outer loop iterates columns, inner loop iterates rows ("matrix[r][c]"). In Java, this jumps between different heap objects on every single access, causing CPU cache misses and running substantially slower for large matrices.',
      'Matrix Transposition: Transposing an M x N matrix converts rows into columns, producing an N x M matrix where "transposed[c][r] = matrix[r][c]". For a square N x N matrix, transposition can be done in-place by swapping "matrix[i][j]" and "matrix[j][i]" for all "j > i".',
      'Square Matrix Diagonals: In an N x N matrix, the Main (Primary) diagonal elements satisfy "r == c" (e.g. matrix[0][0], matrix[1][1], matrix[2][2]). The Anti (Secondary) diagonal elements satisfy "r + c == N - 1", accessed directly as "matrix[i][N - 1 - i]". Both diagonals can be traversed together in a single O(N) pass.',
      'The Arrays.deepToString() Method: Calling "System.out.println(Arrays.toString(matrix))" produces a useless string of hash codes like "[[I@1a..., [I@2b...]". To properly inspect a multi-dimensional array, Java provides "Arrays.deepToString(matrix)", which recursively walks nested arrays and formats all levels.'
    ],
    diagram: `+-------------------------------------------------------------------------------+
|                    JAVA 2D ARRAY HEAP ARCHITECTURE                            |
+-------------------------------------------------------------------------------+

  STACK MEMORY                            HEAP MEMORY
 +---------------+               +---------------------------------------------+
 | int[][] matrix| ------------> | Master Array (matrix.length = 3)            |
 +---------------+               | [0] = 0x1A00 | [1] = 0x2B00 | [2] = 0x3C00  |
                                 +------+--------------+--------------+---------+
                                        |              |              |
                +-----------------------+              |              +-----------------------+
                v                                      v                                      v
     Row 0 @ 0x1A00                         Row 1 @ 0x2B00                         Row 2 @ 0x3C00
    +--------------------+                 +--------------------+                 +--------------------+
    | [0]: 10 | [1]: 20  |                 | [0]: 30 | [1]: 40  |                 | [0]: 50 | [1]: 60  |
    +--------------------+                 +--------------------+                 +--------------------+

    Row-Major Traversal: Accesses [0][0] then [0][1] (Contiguous! Cache hit!)
    Column-Major Traversal: Accesses [0][0] then [1][0] then [2][0] (Jumps between heap objects!)`,
    codeSnippet: {
      title: '2D Matrix Traversal, Row Sums, and Jagged Array Setup',
      code: `import java.util.Arrays;

public class MatrixTraversalDemo {
    public static void main(String[] args) {
        // 1. Declare and initialize a 3x3 rectangular matrix
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // 2. Row-major traversal and row sum calculation
        System.out.println("--- Matrix and Row Sums ---");
        for (int r = 0; r < matrix.length; r++) {
            int rowSum = 0;
            for (int c = 0; c < matrix[r].length; c++) {
                System.out.print(matrix[r][c] + "\\t");
                rowSum += matrix[r][c];
            }
            System.out.println("| Row Sum: " + rowSum);
        }

        // 3. Diagonal elements traversal in a single O(N) loop
        int mainDiagonalSum = 0;
        int antiDiagonalSum = 0;
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            mainDiagonalSum += matrix[i][i];
            antiDiagonalSum += matrix[i][n - 1 - i];
        }
        System.out.println("Main Diagonal Sum: " + mainDiagonalSum);
        System.out.println("Anti Diagonal Sum: " + antiDiagonalSum);

        // 4. Constructing and printing a Jagged Array
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{10, 20};
        jagged[1] = new int[]{30, 40, 50, 60};
        jagged[2] = new int[]{70};

        System.out.println("Jagged Array: " + Arrays.deepToString(jagged));
    }
}`,
      lineByLineExplanation: [
        { line: 'int[][] matrix = { ... };', explanation: 'Creates a 3x3 2D array literal containing 3 row arrays on the heap.' },
        { line: 'for (int r = 0; r < matrix.length; r++)', explanation: 'Outer loop iterates over each row from 0 to matrix.length - 1 (row count).' },
        { line: 'for (int c = 0; c < matrix[r].length; c++)', explanation: 'Inner loop iterates over the columns of row r, safely handling any row length.' },
        { line: 'matrix[i][i] and matrix[i][n - 1 - i];', explanation: 'Accesses the main diagonal (r == c) and secondary diagonal (r + c == n - 1) in a single pass.' },
        { line: 'Arrays.deepToString(jagged);', explanation: 'Recursively serializes the jagged multi-dimensional array into a readable formatted string.' }
      ],
      output: `--- Matrix and Row Sums ---
1\t2\t3\t| Row Sum: 6
4\t5\t6\t| Row Sum: 15
7\t8\t9\t| Row Sum: 24
Main Diagonal Sum: 15
Anti Diagonal Sum: 15
Jagged Array: [[10, 20], [30, 40, 50, 60], [70]]`
    },
    codeExamples: [
      {
        title: 'Example 1: Transposing an M x N Matrix into an N x M Matrix',
        description: 'Converting rows into columns for rectangular matrices.',
        code: `import java.util.Arrays;

public class MatrixTransposeDemo {
    public static void main(String[] args) {
        int[][] original = {
            {1, 2, 3},
            {4, 5, 6}
        }; // 2 rows, 3 columns

        int rows = original.length;
        int cols = original[0].length;
        int[][] transposed = new int[cols][rows]; // 3 rows, 2 columns

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                transposed[c][r] = original[r][c];
            }
        }

        System.out.println("Original:   " + Arrays.deepToString(original));
        System.out.println("Transposed: " + Arrays.deepToString(transposed));
    }
}`,
        output: `Original:   [[1, 2, 3], [4, 5, 6]]
Transposed: [[1, 4], [2, 5], [3, 6]]`
      },
      {
        title: 'Example 2: Constructing Pascal\'s Triangle using Jagged Arrays',
        description: 'Demonstrating dynamic row allocation where each row i has length i + 1.',
        code: `public class PascalsTriangleDemo {
    public static void main(String[] args) {
        int numRows = 5;
        int[][] triangle = new int[numRows][];

        for (int i = 0; i < numRows; i++) {
            triangle[i] = new int[i + 1];
            triangle[i][0] = 1;         // First element of row is 1
            triangle[i][i] = 1;         // Last element of row is 1

            for (int j = 1; j < i; j++) {
                triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
            }
        }

        for (int[] row : triangle) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `1 
1 1 
1 2 1 
1 3 3 1 
1 4 6 4 1 `
      },
      {
        title: 'Example 3: Checking Matrix Symmetry (A == A^T)',
        description: 'Verifying if a square matrix is equal to its transpose.',
        code: `public class SymmetricMatrixDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 7, 3},
            {7, 4, -5},
            {3, -5, 6}
        };

        boolean isSymmetric = true;
        int n = matrix.length;

        for (int r = 0; r < n; r++) {
            for (int c = r + 1; c < n; c++) { // Only check upper triangle
                if (matrix[r][c] != matrix[c][r]) {
                    isSymmetric = false;
                    break;
                }
            }
            if (!isSymmetric) break;
        }

        System.out.println("Is matrix symmetric? " + isSymmetric);
    }
}`,
        output: 'Is matrix symmetric? true'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using matrix[0].length in the inner loop when handling jagged arrays.',
        whyItHappens: 'Assuming all rows have the exact same length as row 0.',
        howToFix: 'Always use "c < matrix[r].length" to query the length of that specific row.'
      },
      {
        mistake: 'Inverting indices as matrix[c][r] instead of matrix[r][c].',
        whyItHappens: 'Confusing mathematical (x, y) Cartesian coordinates with (row, column) matrix coordinates.',
        howToFix: 'Remember: the first bracket is always the Row index, and the second bracket is the Column index.'
      },
      {
        mistake: 'Checking matrix[0].length before checking if matrix.length > 0.',
        whyItHappens: 'Assuming the matrix always contains at least one row.',
        howToFix: 'Guard with "if (matrix != null && matrix.length > 0)" before querying matrix[0].length.'
      },
      {
        mistake: 'Trying to specify column count without row count: "new int[][4]".',
        whyItHappens: 'Thinking the dimensions can be defined in any order.',
        howToFix: 'In Java, the first (row) dimension MUST be specified: "new int[3][]" is legal, but "new int[][3]" is a compile error.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Row Sum vs Column Sum',
        problemStatement: 'What does this program print for column 1 sum?',
        code: `int[][] grid = {
    {2, 5, 8},
    {3, 4, 1}
};
int colSum = 0;
for (int r = 0; r < grid.length; r++) {
    colSum += grid[r][1];
}
System.out.println(colSum);`,
        options: ['15', '9', '7', '8'],
        correctOptionIndex: 1,
        hint: 'Look at column index 1: row 0 has 5, row 1 has 4. 5 + 4 = ?',
        solution: '9',
        explanation: 'The loop iterates through rows r=0 and r=1 with column fixed at 1. At r=0: grid[0][1] = 5. At r=1: grid[1][1] = 4. 5 + 4 = 9.'
      },
      {
        title: 'Puzzle 2: Diagonal Element Sum in 3x3 Matrix',
        problemStatement: 'What is the sum of the main diagonal elements in this matrix?',
        code: `int[][] m = {
    {1, 0, 0},
    {0, 5, 0},
    {0, 0, 9}
};
int sum = 0;
for (int i = 0; i < m.length; i++) {
    sum += m[i][i];
}
System.out.println(sum);`,
        options: ['1', '5', '9', '15'],
        correctOptionIndex: 3,
        hint: 'Main diagonal elements are m[0][0], m[1][1], m[2][2]. Sum: 1 + 5 + 9.',
        solution: '15',
        explanation: 'The main diagonal elements are m[0][0] = 1, m[1][1] = 5, and m[2][2] = 9. Total sum is 1 + 5 + 9 = 15.'
      },
      {
        title: 'Puzzle 3: Jagged Array Length and Index Lookup',
        problemStatement: 'What does this jagged array code print?',
        code: `int[][] j = new int[3][];
j[0] = new int[]{10};
j[1] = new int[]{20, 30, 40};
j[2] = new int[]{50, 60};
System.out.println(j.length + " " + j[1].length + " " + j[1][2]);`,
        options: ['3 3 40', '3 2 30', '3 3 30', 'ArrayIndexOutOfBoundsException'],
        correctOptionIndex: 0,
        hint: 'j.length is 3. Row 1 has length 3. Element at j[1][2] is 40.',
        solution: '3 3 40',
        explanation: 'j.length is the row count (3). j[1].length is the length of row 1 (3). j[1][2] is the element at index 2 of row 1, which is 40. Output is "3 3 40".'
      },
      {
        title: 'Puzzle 4: In-Place Square Matrix Transpose',
        problemStatement: 'What value is stored at m[0][1] after the transpose swap loop?',
        code: `int[][] m = {
    {1, 2},
    {3, 4}
};
int temp = m[0][1];
m[0][1] = m[1][0];
m[1][0] = temp;
System.out.println(m[0][1]);`,
        options: ['1', '2', '3', '4'],
        correctOptionIndex: 2,
        hint: 'm[0][1] originally holds 2. m[1][0] holds 3. After swapping, what does m[0][1] hold?',
        solution: '3',
        explanation: 'm[0][1] (which was 2) receives m[1][0] (which is 3). Thus m[0][1] becomes 3.'
      },
      {
        title: 'Puzzle 5: Finding Maximum in a 2D Matrix',
        problemStatement: 'What is the maximum value found in this 2D matrix?',
        code: `int[][] vals = {
    {12, 45, 8},
    {77, 23, 91},
    {34, 88, 19}
};
int max = vals[0][0];
for (int[] row : vals) {
    for (int val : row) {
        if (val > max) max = val;
    }
}
System.out.println(max);`,
        options: ['88', '77', '91', '45'],
        correctOptionIndex: 2,
        hint: 'Inspect all 9 elements. What is the highest value?',
        solution: '91',
        explanation: 'Scanning through all elements, 91 at vals[1][2] is the maximum value. Output is 91.'
      },
      {
        title: 'Puzzle 6: Uninstantiated Jagged Row Exception',
        problemStatement: 'What occurs when running the following code?',
        code: `int[][] data = new int[2][];
System.out.println(data[0][0]);`,
        options: [
          'Prints 0',
          'Compilation Error',
          'Runtime NullPointerException',
          'Runtime ArrayIndexOutOfBoundsException'
        ],
        correctOptionIndex: 2,
        hint: 'data[0] was never allocated with "new int[...]". What does data[0] contain?',
        solution: 'Runtime NullPointerException',
        explanation: 'Because data was allocated as new int[2][], data[0] is null. Attempting to access data[0][0] dereferences null, throwing a NullPointerException at runtime.'
      },
      {
        title: 'Puzzle 7: Secondary Diagonal Lookup Formula',
        problemStatement: 'In a 3x3 matrix, what elements constitute the secondary (anti) diagonal?',
        code: `int[][] mat = {
    {10, 20, 30},
    {40, 50, 60},
    {70, 80, 90}
};
int n = mat.length;
for (int i = 0; i < n; i++) {
    System.out.print(mat[i][n - 1 - i] + " ");
}`,
        options: ['10 50 90 ', '30 50 70 ', '20 50 80 ', '70 50 30 '],
        correctOptionIndex: 1,
        hint: 'At i=0: mat[0][2] = 30. At i=1: mat[1][1] = 50. At i=2: mat[2][0] = 70.',
        solution: '30 50 70 ',
        explanation: 'The anti-diagonal connects top-right to bottom-left: mat[0][2]=30, mat[1][1]=50, mat[2][0]=70. Output is "30 50 70 ".'
      },
      {
        title: 'Puzzle 8: Boundary Sum of a 2x2 Matrix',
        problemStatement: 'What is the sum of all elements in this 2x2 matrix?',
        code: `int[][] b = {{3, 4}, {5, 6}};
int total = 0;
for (int r = 0; r < b.length; r++) {
    for (int c = 0; c < b[r].length; c++) {
        total += b[r][c];
    }
}
System.out.println(total);`,
        options: ['15', '18', '11', '14'],
        correctOptionIndex: 1,
        hint: 'Sum: 3 + 4 + 5 + 6 = 18.',
        solution: '18',
        explanation: 'The nested loop adds 3 + 4 + 5 + 6 = 18. Output is 18.'
      }
    ],
    interviewQuestions: [
      {
        question: 'How are 2D arrays represented internally in Java heap memory?',
        answer: 'In Java, 2D arrays are implemented as "arrays of arrays." There is no single contiguous rectangular memory block. Instead, Java allocates a master 1D array where each element contains a reference (memory address) to a separate, independently allocated 1D array representing a row. These individual row arrays can be located anywhere in heap memory and can even have differing lengths.',
        followUp: 'How does this differ from 2D arrays in C/C++?',
        followUpAnswer: 'In C/C++, a static 2D array "int arr[3][4]" is allocated as a single, contiguous block of 12 integers in row-major order. In Java, it is always an object holding references to other distinct objects.',
        keyPhrases: ['array of arrays', 'master array of references', 'independent heap row objects', 'not contiguous across rows'],
        commonMistakeAnswer: 'Assuming Java allocates a single flat 2D contiguous memory grid.'
      },
      {
        question: 'What is a jagged (ragged) array in Java, and how do you construct one?',
        answer: 'A jagged array is a multi-dimensional array where each row has a different number of columns. Because each row is an independent heap array, Java naturally supports this. You construct one by specifying only the outer dimension: "int[][] jagged = new int[3][];" and then independently allocating each row with its specific size: "jagged[0] = new int[2]; jagged[1] = new int[5]; jagged[2] = new int[1];".',
        followUp: 'Can you instantiate a 2D array by specifying only the column dimension, e.g. "new int[][4]"?',
        followUpAnswer: 'No, that is a compile-time error. Java requires the first (outer) dimension so it knows how many references to allocate in the master array. The inner dimensions can be left empty for later instantiation.',
        keyPhrases: ['differing row lengths', 'new int[3][] syntax', 'independent row allocation', 'first dimension required'],
        commonMistakeAnswer: 'Thinking 2D arrays in Java must always be rectangular.'
      },
      {
        question: 'Why is row-major traversal significantly faster than column-major traversal in Java?',
        answer: 'Because of CPU cache spatial locality. When an array element is accessed, the CPU hardware prefetcher fetches an entire 64-byte cache line containing contiguous memory into the L1/L2 cache. In row-major traversal, elements in the same row are stored contiguously in memory, so sequential accesses hit the cache. In column-major traversal, the code jumps between different row array objects on every step, causing constant CPU cache misses.',
        followUp: 'What is the time complexity difference between the two traversals?',
        followUpAnswer: 'Both have the exact same theoretical time complexity of O(Rows * Cols), but row-major traversal can be 5 to 10 times faster in actual wall-clock execution time due to cache hits.',
        keyPhrases: ['spatial locality', 'CPU cache line prefetching', 'contiguous row memory', 'cache hit vs cache miss'],
        commonMistakeAnswer: 'Thinking row-major and column-major have different algorithmic complexities.'
      },
      {
        question: 'What is the difference between "matrix.length" and "matrix[0].length"?',
        answer: '"matrix.length" returns the number of rows (the length of the outer master array). "matrix[0].length" returns the number of columns in the first row. In rectangular matrices, all rows have the same length as "matrix[0].length", but in jagged arrays, each row "r" must be queried via "matrix[r].length".',
        followUp: 'What fatal error occurs if you query "matrix[0].length" on an empty matrix?',
        followUpAnswer: 'If "matrix.length == 0" (an empty matrix with 0 rows), accessing "matrix[0]" throws an ArrayIndexOutOfBoundsException at runtime. You must always check "if (matrix.length > 0)" first.',
        keyPhrases: ['matrix.length is row count', 'matrix[r].length is column count', 'ArrayIndexOutOfBoundsException on empty matrix', 'jagged row safety'],
        commonMistakeAnswer: 'Confusing rows with columns and writing matrix[0].length for row count.'
      },
      {
        question: 'Why does "Arrays.toString(matrix)" fail to print the contents of a 2D array, and what should you use?',
        answer: '"Arrays.toString(matrix)" only formats the top-level array. Because the elements of "matrix" are 1D row array references, it prints the hash codes of those row objects, resulting in output like "[[I@1b6d3586, [I@4554617c]". You should use "Arrays.deepToString(matrix)", which recursively inspects nested sub-arrays and prints their human-readable values.',
        followUp: 'Can Arrays.deepToString() handle 3D and higher-dimensional arrays?',
        followUpAnswer: 'Yes! Arrays.deepToString() recursively traverses arrays of any arbitrary depth until it reaches base primitive or object elements.',
        keyPhrases: ['top-level formatting only', 'prints row reference hashes', 'Arrays.deepToString() recursive walk', 'arbitrary depth support'],
        commonMistakeAnswer: 'Believing you must always write nested loops to print a 2D matrix.'
      },
      {
        question: 'How do you calculate the sum of both the main and secondary diagonals of an N x N matrix in O(N) time?',
        answer: 'Use a single loop from "i = 0" to "N - 1". The main diagonal element is at "matrix[i][i]". The secondary (anti) diagonal element is at "matrix[i][N - 1 - i]". Accumulate both in each iteration. If N is odd and you only want to count each cell once, subtract the overlapping center element "matrix[N / 2][N / 2]" at the end.',
        followUp: 'Why is this O(N) instead of O(N^2)?',
        followUpAnswer: 'Because we use a single loop with direct index arithmetic rather than nested loops, touching only 2N elements instead of all N^2 elements.',
        keyPhrases: ['matrix[i][i] main diagonal', 'matrix[i][N - 1 - i] anti-diagonal', 'single O(N) loop', 'center intersection handling'],
        commonMistakeAnswer: 'Using nested loops and checking "if (r == c)" which takes O(N^2) time.'
      },
      {
        question: 'How do you transpose an M x N rectangular matrix into an N x M matrix?',
        answer: 'Allocate a new 2D array with swapped dimensions: "int[][] transposed = new int[cols][rows];" where "rows = matrix.length" and "cols = matrix[0].length". Then run nested loops: for each "r" from 0 to rows - 1 and each "c" from 0 to cols - 1, assign "transposed[c][r] = matrix[r][c];". This runs in O(M * N) time and O(M * N) space.',
        followUp: 'Can an M x N non-square matrix be transposed in-place?',
        followUpAnswer: 'No, because the dimensions change (e.g. from 2x3 to 3x2), which requires a new master array and row arrays with different lengths. Only square (N x N) matrices can be transposed in-place.',
        keyPhrases: ['swapped dimensions int[cols][rows]', 'transposed[c][r] = matrix[r][c]', 'non-square requires new array', 'in-place only for square'],
        commonMistakeAnswer: 'Attempting to transpose a non-square matrix in-place by swapping matrix[r][c] and matrix[c][r].'
      },
      {
        question: 'What happens if you instantiate "int[][] matrix = new int[3][];" and immediately try to access "matrix[0][0]"?',
        answer: 'The JVM throws a "NullPointerException" at runtime. The statement "new int[3][]" allocates only the master array of 3 reference slots. Because reference types default to null, "matrix[0]", "matrix[1]", and "matrix[2]" all hold null. Dereferencing "matrix[0]" to access index 0 triggers a NullPointerException.',
        followUp: 'How do you fix this before accessing elements?',
        followUpAnswer: 'You must allocate the inner row array before reading or writing elements: "matrix[0] = new int[4];", after which "matrix[0][0]" is safely accessible.',
        keyPhrases: ['uninstantiated row is null', 'NullPointerException', 'master array holds nulls', 'allocate inner row first'],
        commonMistakeAnswer: 'Thinking it throws an ArrayIndexOutOfBoundsException or prints 0.'
      },
      {
        question: 'How do you rotate an N x N square matrix 90 degrees clockwise in-place?',
        answer: 'Rotating 90 degrees clockwise in-place is achieved in two clean steps: (1) Transpose the matrix in-place by swapping "matrix[i][j]" with "matrix[j][i]" for all "j > i". (2) Reverse each row individually using the two-pointer technique. Both steps operate in-place with O(N^2) time and O(1) auxiliary space.',
        followUp: 'How would you rotate the matrix 90 degrees counter-clockwise in-place?',
        followUpAnswer: 'Either: (1) Reverse each row first, then transpose, or (2) Transpose first, then reverse each column vertically.',
        keyPhrases: ['transpose then reverse each row', 'two-pointer row reversal', 'O(N^2) time and O(1) space', 'in-place transformation'],
        commonMistakeAnswer: 'Allocating an entire second matrix and copying elements.'
      },
      {
        question: 'What is the space complexity of a jagged array where row i has length i + 1 for N rows?',
        answer: 'The total number of elements is 1 + 2 + 3 + ... + N, which equals N * (N + 1) / 2 = O(N^2) space. However, compared to a full N x N square matrix which uses N^2 elements, the jagged triangular array uses roughly half the memory (approx 50% savings). In addition, Java allocates N + 1 object headers (1 for the master array and N for the individual row objects).',
        followUp: 'Why is object header overhead relevant when using many small rows in jagged arrays?',
        followUpAnswer: 'In a 64-bit JVM, each array object has 16 bytes of header overhead. If you create a jagged array with 10,000 rows where each row has only 1 or 2 ints, the object header overhead exceeds the actual data payload!',
        keyPhrases: ['N*(N+1)/2 elements', '50% memory savings vs rectangular', 'object header overhead per row', 'triangle array complexity'],
        commonMistakeAnswer: 'Ignoring object header overhead when calculating heap memory.'
      }
    ],
    miniQuiz: [
      {
        question: 'How are 2D arrays structured in Java memory?',
        options: [
          'A single contiguous rectangular block of memory on the heap',
          'A master 1D array of references, where each reference points to an independent 1D row array on the heap',
          'A linked list of stack frames',
          'A native C-style contiguous flat array'
        ],
        correctIndex: 1,
        explanation: 'In Java, 2D arrays are "arrays of arrays": a master 1D array stores references to independent 1D row arrays on the heap.'
      },
      {
        question: 'What expression gives the number of rows in a 2D array named "grid"?',
        options: ['grid.length', 'grid[0].length', 'grid.rows', 'grid.size()'],
        correctIndex: 0,
        explanation: '"grid.length" returns the length of the outer master array, which is the total number of rows.'
      },
      {
        question: 'What happens when executing "int[][] arr = new int[3][]; System.out.println(arr[0][0]);"?',
        options: [
          'Prints 0',
          'Throws NullPointerException at runtime',
          'Throws ArrayIndexOutOfBoundsException at runtime',
          'Compilation error'
        ],
        correctIndex: 1,
        explanation: '"new int[3][]" leaves the rows uninstantiated (arr[0] is null). Attempting to access arr[0][0] throws a NullPointerException.'
      },
      {
        question: 'Why is row-major traversal of a 2D array faster than column-major traversal in Java?',
        options: [
          'Row-major traversal has lower Big-O time complexity',
          'Elements in the same row are contiguous in memory, maximizing CPU cache hits',
          'Column-major traversal is not supported by Java loops',
          'The Java compiler optimizes row-major loops into SIMD instructions automatically'
        ],
        correctIndex: 1,
        explanation: 'Each row array is contiguous in heap memory. Iterating row-major takes advantage of CPU cache spatial locality, avoiding cache misses.'
      },
      {
        question: 'Which of the following is a valid jagged array declaration and instantiation in Java?',
        options: [
          'int[][] a = new int[][3];',
          'int[][] a = new int[3][]; a[0] = new int[2];',
          'int[3][] a = new int[][];',
          'int[][] a = new int[3, 2];'
        ],
        correctIndex: 1,
        explanation: 'Java requires the outer dimension to be specified ("new int[3][]"). Individual rows can then be instantiated with differing lengths.'
      },
      {
        question: 'Which method should you use to print a 2D matrix into a human-readable nested string?',
        options: ['Arrays.toString(matrix)', 'Arrays.deepToString(matrix)', 'matrix.toString()', 'Arrays.print2D(matrix)'],
        correctIndex: 1,
        explanation: '"Arrays.deepToString(matrix)" recursively traverses multi-dimensional arrays to produce clean formatted strings.'
      },
      {
        question: 'In an N x N matrix, what formula accesses elements on the anti-diagonal (top-right to bottom-left)?',
        options: ['matrix[i][i]', 'matrix[i][N - 1 - i]', 'matrix[N - 1][i]', 'matrix[i][N - i]'],
        correctIndex: 1,
        explanation: 'The anti-diagonal connects (0, N-1) to (N-1, 0). The column index is given by "N - 1 - i".'
      },
      {
        question: 'What are the dimensions of the transposed matrix if the original matrix has 3 rows and 5 columns?',
        options: ['3 rows and 5 columns', '5 rows and 3 columns', '5 rows and 5 columns', '3 rows and 3 columns'],
        correctIndex: 1,
        explanation: 'Transposing a matrix swaps rows and columns. A 3x5 matrix becomes a 5x3 matrix.'
      },
      {
        question: 'What is the correct inner loop condition when traversing a potentially jagged 2D array?',
        options: ['c < matrix[0].length', 'c < matrix.length', 'c < matrix[r].length', 'c <= matrix[r].length'],
        correctIndex: 2,
        explanation: 'In a jagged array, each row can have a different length. You must query "c < matrix[r].length" for that specific row.'
      },
      {
        question: 'What is the first step to rotate an N x N matrix 90 degrees clockwise in-place?',
        options: [
          'Reverse all rows',
          'Transpose the matrix (swap matrix[i][j] with matrix[j][i])',
          'Reverse the columns',
          'Invert all element signs'
        ],
        correctIndex: 1,
        explanation: 'Rotating 90 degrees clockwise in-place is done by first transposing the matrix and then reversing each row individually.'
      }
    ]
  }
};
