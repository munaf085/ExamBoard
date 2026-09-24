import { WrittenQuestion } from '../../types';

export const topicCsharpBasicsQuestions: WrittenQuestion[] = [
  // --- Data Types & Variables (8 questions) ---
  {
    id: 'TCB-001',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which of the following data types is best suited for financial and monetary calculations in C# to avoid rounding errors?',
    options: ['float', 'double', 'decimal', 'long'],
    correctAnswer: 2,
    explanation: 'The `decimal` type is a 128-bit data type suitable for financial and monetary calculations because it provides higher precision and a smaller range than `double` or `float`, preventing common rounding errors.',
    tags: ['data-types', 'decimal', 'basics']
  },
  {
    id: 'TCB-002',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the primary difference between a `char` and a `string` in C#?',
    options: [
      '`char` is a reference type, while `string` is a value type.',
      '`char` represents a single Unicode character and uses single quotes (\'\'), while `string` represents a sequence of characters and uses double quotes ("").',
      '`char` can store multiple characters, while `string` can only store one.',
      'There is no difference; they are interchangeable.'
    ],
    correctAnswer: 1,
    explanation: 'A `char` is a value type representing a single UTF-16 character enclosed in single quotes. A `string` is a reference type representing a sequence of characters enclosed in double quotes.',
    tags: ['char', 'string', 'basics']
  },
  {
    id: 'TCB-003',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the default value of a `bool` variable in C# when declared as a class field?',
    options: ['true', 'false', 'null', '0'],
    correctAnswer: 1,
    explanation: 'The default value of the `bool` type in C# is `false`.',
    tags: ['bool', 'default-values', 'basics']
  },
  {
    id: 'TCB-004',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What will be the output of the following code?',
    code: `var number = 10;
number = 10.5;
Console.WriteLine(number);`,
    options: [
      '10',
      '10.5',
      'A compile-time error',
      'A runtime error'
    ],
    correctAnswer: 2,
    explanation: 'The `var` keyword implies implicit typing, but the type is determined at compile-time. Here, `number` is inferred as `int`. Reassigning it to `10.5` (a `double`) causes a compile-time error.',
    tags: ['var', 'implicit-typing', 'basics']
  },
  {
    id: 'TCB-005',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the main difference between `const` and `readonly` in C#?',
    options: [
      '`const` is evaluated at runtime, while `readonly` is evaluated at compile-time.',
      '`const` can be modified after initialization, while `readonly` cannot.',
      '`const` is implicitly static and evaluated at compile-time, while `readonly` can be either instance-level or static and is evaluated at runtime.',
      '`readonly` fields can only be assigned inline, while `const` fields can be assigned in a constructor.'
    ],
    correctAnswer: 2,
    explanation: '`const` variables must be initialized at declaration and are evaluated at compile-time. `readonly` variables can be evaluated at runtime and can be assigned a value in the declaration or in the constructor of the same class.',
    tags: ['const', 'readonly', 'basics']
  },
  {
    id: 'TCB-006',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What does the following code output?',
    code: `int? value = null;
int result = value ?? 5;
Console.WriteLine(result);`,
    options: ['0', '5', 'null', 'Exception at runtime'],
    correctAnswer: 1,
    explanation: '`int?` is a nullable value type. The null-coalescing operator `??` returns the left-hand operand if it is not null; otherwise, it evaluates the right-hand operand. Since `value` is null, `result` becomes 5.',
    tags: ['nullable', 'null-coalescing', 'basics']
  },
  {
    id: 'TCB-007',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the default value of an uninitialized `int` field in a C# class?',
    options: ['null', '0', '-1', 'undefined'],
    correctAnswer: 1,
    explanation: 'Value types in C# have a default value. For numeric types like `int`, the default value is `0`.',
    tags: ['default-values', 'int', 'basics']
  },
  {
    id: 'TCB-008',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What happens when this code is executed?',
    code: `int max = int.MaxValue;
unchecked
{
    max = max + 1;
}
Console.WriteLine(max);`,
    options: [
      'It prints the value of int.MaxValue + 1',
      'It throws an OverflowException',
      'It prints int.MinValue',
      'It prints 0'
    ],
    correctAnswer: 2,
    explanation: 'The `unchecked` keyword suppresses overflow-checking for integral-type arithmetic operations. When `int.MaxValue` overflows, it wraps around to `int.MinValue`.',
    tags: ['unchecked', 'overflow', 'basics']
  },

  // --- Operators & Expressions (6 questions) ---
  {
    id: 'TCB-009',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is the correct syntax for the ternary conditional operator in C#?',
    options: [
      'condition ? true_value : false_value',
      'condition : true_value ? false_value',
      'condition ? true_value ; false_value',
      'condition = true_value : false_value'
    ],
    correctAnswer: 0,
    explanation: 'The ternary conditional operator `?:` evaluates a boolean expression and returns the result of one of the two expressions, depending on whether the boolean expression evaluates to true or false.',
    tags: ['ternary', 'operators', 'basics']
  },
  {
    id: 'TCB-010',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code snippet?',
    code: `string name = null;
name ??= "Guest";
Console.WriteLine(name);`,
    options: ['null', 'Guest', 'Exception', '"" (empty string)'],
    correctAnswer: 1,
    explanation: 'The null-coalescing assignment operator `??=` assigns the value of its right-hand operand to its left-hand operand only if the left-hand operand evaluates to `null`. Therefore, `name` is assigned "Guest".',
    tags: ['operators', 'null-coalescing-assignment', 'basics']
  },
  {
    id: 'TCB-011',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the value of `z` after the following operations?',
    code: `int x = 5; // 0101 in binary
int y = 3; // 0011 in binary
int z = x ^ y;`,
    options: ['8', '2', '6', '1'],
    correctAnswer: 2,
    explanation: 'The bitwise XOR operator `^` compares corresponding bits. 0101 ^ 0011 = 0110, which is 6 in decimal.',
    tags: ['bitwise', 'operators', 'basics']
  },
  {
    id: 'TCB-012',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which operator is used to perform a safe type cast in C#, returning null if the cast fails?',
    options: ['is', 'as', 'typeof', '(type)'],
    correctAnswer: 1,
    explanation: 'The `as` operator is used to perform safe conversions between compatible reference types or nullable types. If the conversion is not possible, it returns `null` instead of throwing an exception.',
    tags: ['casting', 'as-operator', 'basics']
  },
  {
    id: 'TCB-013',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of this code?',
    code: `double d = 10.5;
int i = (int)d;
Console.WriteLine(i);`,
    options: ['11', '10', '10.5', 'Compilation error'],
    correctAnswer: 1,
    explanation: 'Explicit casting from `double` to `int` truncates the decimal part without rounding. So `10.5` becomes `10`.',
    tags: ['casting', 'explicit', 'basics']
  },
  {
    id: 'TCB-014',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the result of the following boolean expression?',
    code: `bool a = true;
bool b = false;
bool result = a || (b = true);
Console.WriteLine(b);`,
    options: ['true', 'false', 'Compilation error', 'null'],
    correctAnswer: 1,
    explanation: 'The logical OR operator `||` short-circuits. Since `a` is true, the second operand `(b = true)` is never evaluated. Therefore, `b` remains `false`.',
    tags: ['logical-operators', 'short-circuit', 'basics']
  },

  // --- Strings & StringBuilder (8 questions) ---
  {
    id: 'TCB-015',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What does it mean that strings in C# are immutable?',
    options: [
      'Strings cannot be reassigned to a new variable.',
      'String objects cannot be modified after they are created in memory.',
      'Strings can only contain alphanumeric characters.',
      'Strings automatically resize when modified.'
    ],
    correctAnswer: 1,
    explanation: 'Immutability means that once a `string` object is created in memory, its value cannot be changed. Operations that seem to modify a string actually create and return a new string object.',
    tags: ['string', 'immutability', 'basics']
  },
  {
    id: 'TCB-016',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of this code snippet?',
    code: `string s1 = "hello";
string s2 = s1.ToUpper();
Console.WriteLine(s1);`,
    options: ['hello', 'HELLO', 'Compilation error', 'null'],
    correctAnswer: 0,
    explanation: 'Because strings are immutable, `s1.ToUpper()` creates a new string with the capitalized letters but does not change the original string `s1`. So `s1` remains "hello".',
    tags: ['string', 'methods', 'basics']
  },
  {
    id: 'TCB-017',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which method should you use to check if a string is null, contains only spaces, or is an empty string?',
    options: [
      'String.IsNullOrEmpty(str)',
      'String.IsNullOrWhiteSpace(str)',
      'str.Trim() == ""',
      'str.Length == 0'
    ],
    correctAnswer: 1,
    explanation: '`String.IsNullOrWhiteSpace` is the most comprehensive method to check if a string is null, empty (""), or consists only of white-space characters.',
    tags: ['string', 'validation', 'basics']
  },
  {
    id: 'TCB-018',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the primary advantage of using `StringBuilder` over regular string concatenation in a loop?',
    options: [
      '`StringBuilder` uses less memory because it compresses the string.',
      '`StringBuilder` provides automatic formatting of text.',
      '`StringBuilder` reduces memory allocations by modifying a buffer instead of creating new string objects on each concatenation.',
      '`StringBuilder` makes the code execute on a background thread.'
    ],
    correctAnswer: 2,
    explanation: 'Since strings are immutable, concatenating strings in a loop creates many temporary string objects, leading to performance issues and garbage collection overhead. `StringBuilder` uses a mutable buffer to efficiently construct strings.',
    tags: ['stringbuilder', 'performance', 'basics']
  },
  {
    id: 'TCB-019',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What will be printed by the following code?',
    code: `string name = "John";
int age = 30;
Console.WriteLine($"My name is {name} and I am {age}");`,
    options: [
      'My name is {name} and I am {age}',
      'My name is John and I am 30',
      'Compilation error',
      'My name is $John and I am $30'
    ],
    correctAnswer: 1,
    explanation: 'The `$` character identifies a string literal as an interpolated string. The expressions inside `{}` are evaluated and inserted into the string at runtime.',
    tags: ['string', 'interpolation', 'basics']
  },
  {
    id: 'TCB-020',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'code-output',
    question: 'What is the purpose of the `@` symbol in `@"C:\\temp\\file.txt"`?',
    options: [
      'It creates an interpolated string.',
      'It denotes a verbatim string literal, which ignores escape characters like \\.',
      'It allows the string to span multiple lines only.',
      'It automatically formats the string as a file path.'
    ],
    correctAnswer: 1,
    explanation: 'The `@` symbol creates a verbatim string literal. In verbatim strings, escape sequences (like `\\`) are not processed, which is highly useful for file paths and regular expressions.',
    tags: ['string', 'verbatim', 'basics']
  },
  {
    id: 'TCB-021',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What will this code output?',
    code: `string a = "Test";
string b = new string(new char[] { 'T', 'e', 's', 't' });
Console.WriteLine(a == b);
Console.WriteLine(object.ReferenceEquals(a, b));`,
    options: [
      'True, True',
      'False, False',
      'True, False',
      'False, True'
    ],
    correctAnswer: 2,
    explanation: 'The `==` operator for strings compares their values, so `a == b` is True. However, because `b` is explicitly created with `new string()`, it occupies a different memory address, so `object.ReferenceEquals` returns False.',
    tags: ['string', 'comparison', 'basics']
  },
  {
    id: 'TCB-022',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the result of the `Substring` operation?',
    code: `string text = "Programming";
string sub = text.Substring(3, 4);
Console.WriteLine(sub);`,
    options: ['gram', 'ogra', 'gramm', 'rogram'],
    correctAnswer: 0,
    explanation: '`Substring(startIndex, length)` starts at index 3 (\'g\') and takes 4 characters, resulting in "gram".',
    tags: ['string', 'methods', 'substring', 'basics']
  },

  // --- Arrays & Collections (8 questions) ---
  {
    id: 'TCB-023',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is the correct way to initialize a 1D array of integers in C#?',
    options: [
      'int[] arr = new int(5);',
      'int arr[] = new int[5];',
      'int[] arr = new int[5];',
      'Array<int> arr = new Array<int>(5);'
    ],
    correctAnswer: 2,
    explanation: 'In C#, array types are declared by adding `[]` after the type name. The initialization uses the `new` keyword followed by the type and the size in brackets.',
    tags: ['array', 'initialization', 'basics']
  },
  {
    id: 'TCB-024',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is a jagged array in C#?',
    options: [
      'A multidimensional array with equal row lengths.',
      'An array whose elements are arrays, possibly of different sizes.',
      'An array that can dynamically resize itself.',
      'An array of objects.'
    ],
    correctAnswer: 1,
    explanation: 'A jagged array is an "array of arrays" where each inner array can have a different length.',
    tags: ['array', 'jagged-array', 'basics']
  },
  {
    id: 'TCB-025',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which property is used to get the total number of elements in all dimensions of an Array?',
    options: ['Length', 'Count', 'Size', 'Capacity'],
    correctAnswer: 0,
    explanation: 'The `Length` property of an Array returns the total number of elements across all dimensions. `List<T>` uses `Count`.',
    tags: ['array', 'properties', 'basics']
  },
  {
    id: 'TCB-026',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What will be the output of this code?',
    code: `int[] numbers = { 3, 1, 4, 1, 5 };
Array.Sort(numbers);
Array.Reverse(numbers);
Console.WriteLine(numbers[0]);`,
    options: ['1', '3', '5', '4'],
    correctAnswer: 2,
    explanation: '`Array.Sort` sorts the array in ascending order: { 1, 1, 3, 4, 5 }. `Array.Reverse` reverses it to descending order: { 5, 4, 3, 1, 1 }. The element at index 0 is 5.',
    tags: ['array', 'methods', 'basics']
  },
  {
    id: 'TCB-027',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'When should you choose a `List<T>` over a standard array (`T[]`)?',
    options: [
      'When you need a fixed-size collection for maximum performance.',
      'When the number of elements is unknown at compile-time and can change dynamically.',
      'When you need to store multidimensional data like a grid.',
      'When you want to prevent duplicate elements.'
    ],
    correctAnswer: 1,
    explanation: '`List<T>` is a dynamic array that automatically resizes as elements are added or removed, making it ideal when the collection size is not known in advance. Standard arrays have a fixed size.',
    tags: ['list', 'array', 'collections', 'basics']
  },
  {
    id: 'TCB-028',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of this Dictionary access code?',
    code: `Dictionary<int, string> dict = new Dictionary<int, string>();
dict.Add(1, "One");
dict[2] = "Two";
Console.WriteLine(dict.ContainsKey(2) ? dict[2] : "None");`,
    options: ['One', 'Two', 'None', 'KeyNotFoundException'],
    correctAnswer: 1,
    explanation: 'The indexer `dict[2] = "Two"` adds the key 2 with value "Two" (or updates it if it existed). `ContainsKey(2)` is true, so it prints "Two".',
    tags: ['dictionary', 'collections', 'basics']
  },
  {
    id: 'TCB-029',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What happens when modifying an array inside a `foreach` loop?',
    code: `int[] arr = { 1, 2, 3 };
foreach (var item in arr)
{
    // Assume attempt to modify item here, e.g., item = item * 2;
}`,
    options: [
      'The array elements are doubled successfully.',
      'A compile-time error occurs because the iteration variable is read-only.',
      'A runtime InvalidOperationException is thrown.',
      'The loop modifies a copy, and the original array remains unchanged.'
    ],
    correctAnswer: 1,
    explanation: 'In a `foreach` loop over an array, the iteration variable is immutable (read-only). Attempting to assign a new value to it results in a compile-time error.',
    tags: ['array', 'foreach', 'basics']
  },
  {
    id: 'TCB-030',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'How do you correctly declare a 2D rectangular array?',
    options: [
      'int[][] grid = new int[3][3];',
      'int[,] grid = new int[3, 3];',
      'int grid[,] = new int[3, 3];',
      'Array2D<int> grid = new Array2D<int>(3, 3);'
    ],
    correctAnswer: 1,
    explanation: 'In C#, a comma inside the brackets `[,]` denotes a multi-dimensional (rectangular) array. `[][]` denotes a jagged array.',
    tags: ['array', 'multidimensional', 'basics']
  },

  // --- Enums, Structs & Value vs Reference (5 questions) ---
  {
    id: 'TCB-031',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the default underlying type of an `enum` in C#?',
    options: ['short', 'int', 'long', 'byte'],
    correctAnswer: 1,
    explanation: 'By default, the underlying type of the enumeration elements in C# is `int`.',
    tags: ['enum', 'types', 'basics']
  },
  {
    id: 'TCB-032',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What will be output by this code?',
    code: `enum Days { Sun, Mon, Tue = 5, Wed, Thu }
Console.WriteLine((int)Days.Wed);`,
    options: ['3', '4', '6', '7'],
    correctAnswer: 2,
    explanation: 'By default, enum values start at 0 and increment by 1. Sun=0, Mon=1. Since Tue is explicitly set to 5, the next value Wed will be 6.',
    tags: ['enum', 'values', 'basics']
  },
  {
    id: 'TCB-033',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which of the following is a key difference between a `struct` and a `class` in C#?',
    options: [
      'A `struct` can inherit from other structs, while a `class` cannot.',
      'A `struct` is a value type stored on the stack (typically), while a `class` is a reference type stored on the heap.',
      'A `struct` can have a parameterless constructor, but a `class` cannot.',
      'Classes can implement interfaces, but structs cannot.'
    ],
    correctAnswer: 1,
    explanation: 'Structs are value types and are typically allocated on the stack (when used as local variables), whereas classes are reference types and their instances are allocated on the heap.',
    tags: ['struct', 'class', 'value-type', 'basics']
  },
  {
    id: 'TCB-034',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'Given the following struct and method, what is the output?',
    code: `struct Point { public int X; }

void Modify(Point p) { p.X = 10; }

Point p1 = new Point { X = 5 };
Modify(p1);
Console.WriteLine(p1.X);`,
    options: ['0', '5', '10', 'Compilation error'],
    correctAnswer: 1,
    explanation: 'Because `Point` is a struct (value type), it is passed by value to the `Modify` method. The method modifies a copy of the struct, not the original `p1`. Thus, `p1.X` remains 5.',
    tags: ['struct', 'pass-by-value', 'basics']
  },
  {
    id: 'TCB-035',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'How do you convert a string representation of an enum value to the actual enum value?',
    options: [
      'Enum.Convert<T>(string)',
      'Enum.Parse(typeof(T), string)',
      'Enum.Cast(string)',
      'Enum.ToString(T)'
    ],
    correctAnswer: 1,
    explanation: '`Enum.Parse` (or `Enum.TryParse`) is used to convert the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.',
    tags: ['enum', 'parsing', 'basics']
  },

  // --- ref, out, params keywords (5 questions) ---
  {
    id: 'TCB-036',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the primary difference between the `ref` and `out` keywords in C#?',
    options: [
      '`ref` is used for reference types, while `out` is used for value types.',
      'A variable passed as `ref` must be initialized before it is passed, while a variable passed as `out` does not need to be initialized before being passed.',
      '`ref` parameters cannot be modified inside the method, while `out` parameters must be.',
      'There is no difference; they are aliases for the same underlying mechanism.'
    ],
    correctAnswer: 1,
    explanation: 'Both `ref` and `out` pass arguments by reference. However, a `ref` argument must be initialized before passing it, while an `out` argument does not. The method receiving the `out` parameter must assign a value to it before returning.',
    tags: ['ref', 'out', 'basics']
  },
  {
    id: 'TCB-037',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `void UpdateValue(ref int x) { x += 5; }

int val = 10;
UpdateValue(ref val);
Console.WriteLine(val);`,
    options: ['10', '15', '0', 'Compilation error'],
    correctAnswer: 1,
    explanation: 'Because `val` is passed with the `ref` keyword, it is passed by reference. The method modifies the original variable, changing its value to 15.',
    tags: ['ref', 'pass-by-reference', 'basics']
  },
  {
    id: 'TCB-038',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the result of executing this snippet?',
    code: `void Initialize(out int number) {
    // missing assignment
}
int x;
Initialize(out x);`,
    options: [
      'It prints nothing.',
      'x becomes 0 automatically.',
      'A compile-time error occurs because the out parameter is not assigned within the method.',
      'A runtime error occurs.'
    ],
    correctAnswer: 2,
    explanation: 'A method with an `out` parameter must assign a value to that parameter before the method returns. Failure to do so results in a compile-time error.',
    tags: ['out', 'parameters', 'basics']
  },
  {
    id: 'TCB-039',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the purpose of the `params` keyword in a C# method signature?',
    options: [
      'It forces all arguments to be passed by reference.',
      'It allows a method to accept a variable number of arguments of a specified type.',
      'It creates named parameters to improve code readability.',
      'It allows you to pass parameters of any type.'
    ],
    correctAnswer: 1,
    explanation: 'The `params` keyword lets you specify a method parameter that takes a variable number of arguments. The parameter type must be a single-dimensional array.',
    tags: ['params', 'methods', 'basics']
  },
  {
    id: 'TCB-040',
    paperId: 'topic-csharp-basics',
    category: 'CSharp',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `int Sum(params int[] numbers) {
    int total = 0;
    foreach(var n in numbers) total += n;
    return total;
}
Console.WriteLine(Sum());`,
    options: ['0', 'null', 'Compilation error', 'IndexOutOfRangeException'],
    correctAnswer: 0,
    explanation: 'When calling a method with a `params` parameter without passing any arguments, the compiler creates an empty array (length 0). The loop doesn\'t execute, and the method returns the initialized `total` (0).',
    tags: ['params', 'methods', 'basics']
  }
];
