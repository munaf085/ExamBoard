import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 8: METHODS & RECURSION - PROGRAMMING EXERCISES
// Total: 40 exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Medium-Hard
// ============================================================

export const methodsExercises: Record<string, ProgrammingExercise[]> = {
  "method-anatomy-and-returns": [
    {
      "id": "ex-method-anatomy-1",
      "title": "Fahrenheit to Celsius Temperature Converter",
      "problemStatement": "Write a static method `toCelsius(double fahrenheit)` that converts a temperature from Fahrenheit to Celsius using the standard formula: C = (F - 32) * 5.0 / 9.0. In `main()`, invoke the method with freezing (32.0), boiling (212.0), and body temperature (98.6), printing the formatted results to 2 decimal places.",
      "hint": "Ensure you use floating-point literals (5.0 / 9.0) instead of integer division (5 / 9), which would evaluate to 0.",
      "solutionCode": "public class Solution {\n    public static double toCelsius(double fahrenheit) {\n        return (fahrenheit - 32.0) * 5.0 / 9.0;\n    }\n\n    public static void main(String[] args) {\n        double f1 = 32.0;\n        double f2 = 212.0;\n        double f3 = 98.6;\n\n        System.out.printf(\"%.1f F = %.2f C%n\", f1, toCelsius(f1));\n        System.out.printf(\"%.1f F = %.2f C%n\", f2, toCelsius(f2));\n        System.out.printf(\"%.1f F = %.2f C%n\", f3, toCelsius(f3));\n    }\n}",
      "output": "32.0 F = 0.00 C\n212.0 F = 100.00 C\n98.6 F = 37.00 C",
      "explanation": "The static method toCelsius accepts a double parameter and returns a double result. Using 5.0 / 9.0 prevents integer truncation. Calling toCelsius from main() passes the arguments by value and computes the converted temperatures."
    },
    {
      "id": "ex-method-anatomy-2",
      "title": "Prime Number Predicate with Guard Clauses",
      "problemStatement": "Implement a static method `isPrime(int n)` returning a boolean. Use early return guard clauses: numbers less than or equal to 1 are not prime; 2 and 3 are prime; even numbers greater than 2 are not prime. For other numbers, test divisibility up to i * i <= n with step 2. In `main()`, test and print results for 1, 2, 17, 25, and 29.",
      "hint": "Early returns allow the method to exit immediately once the prime or composite status is determined, eliminating the need for deeply nested if statements.",
      "solutionCode": "public class Solution {\n    public static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        if (n <= 3) return true;\n        if (n % 2 == 0) return false;\n        for (int i = 3; i * i <= n; i += 2) {\n            if (n % i == 0) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        int[] testNumbers = {1, 2, 17, 25, 29};\n        for (int num : testNumbers) {\n            System.out.println(num + \" is prime? \" + isPrime(num));\n        }\n    }\n}",
      "output": "1 is prime? false\n2 is prime? true\n17 is prime? true\n25 is prime? false\n29 is prime? true",
      "explanation": "Guard clauses check edge cases first. If n <= 1, return false immediately. If n % 2 == 0, return false without looping. The loop checks odd factors up to the square root of n. As soon as a divisor is found, return false halts execution."
    },
    {
      "id": "ex-method-anatomy-3",
      "title": "Numerical Range Clamp Helper",
      "problemStatement": "Create a static helper method `clamp(int value, int min, int max)` that restricts an integer to a specified range. If value is less than min, return min. If value is greater than max, return max. Otherwise, return value. In `main()`, test clamping values below min, within range, and above max.",
      "hint": "Check if value < min first, then else if value > max. Alternatively, return value if in range.",
      "solutionCode": "public class Solution {\n    public static int clamp(int value, int min, int max) {\n        if (value < min) {\n            return min;\n        } else if (value > max) {\n            return max;\n        }\n        return value;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Clamp -5 in [0, 100]: \" + clamp(-5, 0, 100));\n        System.out.println(\"Clamp 45 in [0, 100]: \" + clamp(45, 0, 100));\n        System.out.println(\"Clamp 150 in [0, 100]: \" + clamp(150, 0, 100));\n    }\n}",
      "output": "Clamp -5 in [0, 100]: 0\nClamp 45 in [0, 100]: 45\nClamp 150 in [0, 100]: 100",
      "explanation": "The clamp method demonstrates pure decision logic where every execution path is guaranteed to return an int. The method does not alter external state, making it a predictable, pure function."
    },
    {
      "id": "ex-method-anatomy-4",
      "title": "Array Summary Statistics Bundle",
      "problemStatement": "Write a static method `calculateStats(double[] numbers)` that returns a 3-element double array containing: [min, max, average]. If the input array is null or empty, return an empty double array `new double[0]`. In `main()`, pass `{12.5, 4.0, 45.0, 18.5, 20.0}` and print min, max, and average formatted to 2 decimal places.",
      "hint": "Methods can return reference types like arrays. Allocate a new double[3] array to package multiple return values together.",
      "solutionCode": "public class Solution {\n    public static double[] calculateStats(double[] numbers) {\n        if (numbers == null || numbers.length == 0) {\n            return new double[0];\n        }\n        double min = numbers[0];\n        double max = numbers[0];\n        double sum = 0.0;\n        for (double val : numbers) {\n            if (val < min) min = val;\n            if (val > max) max = val;\n            sum += val;\n        }\n        double avg = sum / numbers.length;\n        return new double[]{min, max, avg};\n    }\n\n    public static void main(String[] args) {\n        double[] data = {12.5, 4.0, 45.0, 18.5, 20.0};\n        double[] stats = calculateStats(data);\n        System.out.printf(\"Min: %.2f%n\", stats[0]);\n        System.out.printf(\"Max: %.2f%n\", stats[1]);\n        System.out.printf(\"Avg: %.2f%n\", stats[2]);\n    }\n}",
      "output": "Min: 4.00\nMax: 45.00\nAvg: 20.00",
      "explanation": "Because Java methods can only return a single entity, returning an array allows bundling multiple calculated values (min, max, average) into a unified returned container."
    },
    {
      "id": "ex-method-anatomy-5",
      "title": "Character Case Inversion Utility",
      "problemStatement": "Write a static method `invertCase(String text)` that returns a new String where every uppercase letter is converted to lowercase and every lowercase letter is converted to uppercase. Non-alphabetic characters remain unchanged. In `main()`, test with \"Java 2026: Methods & Recursion!\".",
      "hint": "Iterate over text.toCharArray() or use charAt(i). Use Character.isUpperCase(ch) and Character.toLowerCase(ch).",
      "solutionCode": "public class Solution {\n    public static String invertCase(String text) {\n        if (text == null) return null;\n        char[] chars = text.toCharArray();\n        for (int i = 0; i < chars.length; i++) {\n            char c = chars[i];\n            if (Character.isUpperCase(c)) {\n                chars[i] = Character.toLowerCase(c);\n            } else if (Character.isLowerCase(c)) {\n                chars[i] = Character.toUpperCase(c);\n            }\n        }\n        return new String(chars);\n    }\n\n    public static void main(String[] args) {\n        String sample = \"Java 2026: Methods & Recursion!\";\n        String inverted = invertCase(sample);\n        System.out.println(\"Original: \" + sample);\n        System.out.println(\"Inverted: \" + inverted);\n    }\n}",
      "output": "Original: Java 2026: Methods & Recursion!\nInverted: jAVA 2026: mETHODS & rECURSION!",
      "explanation": "The method demonstrates taking a String as an argument, transforming its character data internally without mutating the original String, and returning a newly constructed String object."
    },
    {
      "id": "ex-method-anatomy-6",
      "title": "Leap Year and Days in Month Decomposition",
      "problemStatement": "Demonstrate functional decomposition by writing two static methods: 1) `isLeapYear(int year)` returning true if the year is divisible by 4 and (not divisible by 100 or divisible by 400); 2) `getDaysInMonth(int month, int year)` returning the number of days (28 or 29 for February depending on `isLeapYear(year)`, 30 for months 4, 6, 9, 11, and 31 for others). In `main()`, print days for Feb 2024, Feb 2025, and Nov 2026.",
      "hint": "Have getDaysInMonth call isLeapYear directly. Method decomposition promotes code reuse and separation of concerns.",
      "solutionCode": "public class Solution {\n    public static boolean isLeapYear(int year) {\n        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n    }\n\n    public static int getDaysInMonth(int month, int year) {\n        if (month == 2) {\n            return isLeapYear(year) ? 29 : 28;\n        }\n        if (month == 4 || month == 6 || month == 9 || month == 11) {\n            return 30;\n        }\n        return 31;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Feb 2024 days: \" + getDaysInMonth(2, 2024));\n        System.out.println(\"Feb 2025 days: \" + getDaysInMonth(2, 2025));\n        System.out.println(\"Nov 2026 days: \" + getDaysInMonth(11, 2026));\n    }\n}",
      "output": "Feb 2024 days: 29\nFeb 2025 days: 28\nNov 2026 days: 30",
      "explanation": "This exercise highlights functional decomposition: getDaysInMonth delegates the leap year calculation to isLeapYear. Each method has a single responsibility and is cleanly testable in isolation."
    },
    {
      "id": "ex-method-anatomy-7",
      "title": "Digit Sum and Frequency Counter",
      "problemStatement": "Write two static methods: `sumDigits(int number)` that returns the sum of all digits of an integer (treating negative numbers by their absolute value), and `countDigitOccurrences(int number, int targetDigit)` that returns how many times targetDigit appears in number. In `main()`, test with number 50525 and target digit 5.",
      "hint": "Use Math.abs(number). Repeatedly extract digits using number % 10 and number /= 10 until number reaches 0.",
      "solutionCode": "public class Solution {\n    public static int sumDigits(int number) {\n        int n = Math.abs(number);\n        if (n == 0) return 0;\n        int sum = 0;\n        while (n > 0) {\n            sum += n % 10;\n            n /= 10;\n        }\n        return sum;\n    }\n\n    public static int countDigitOccurrences(int number, int targetDigit) {\n        int n = Math.abs(number);\n        if (n == 0 && targetDigit == 0) return 1;\n        int count = 0;\n        while (n > 0) {\n            if (n % 10 == targetDigit) {\n                count++;\n            }\n            n /= 10;\n        }\n        return count;\n    }\n\n    public static void main(String[] args) {\n        int testVal = 50525;\n        System.out.println(\"Number: \" + testVal);\n        System.out.println(\"Sum of digits: \" + sumDigits(testVal));\n        System.out.println(\"Occurrences of 5: \" + countDigitOccurrences(testVal, 5));\n    }\n}",
      "output": "Number: 50525\nSum of digits: 17\nOccurrences of 5: 3",
      "explanation": "Both methods accept integer parameters and return an int. Using Math.abs() protects against negative numbers, while loops systematically extract base-10 digits without modifying the caller argument."
    },
    {
      "id": "ex-method-anatomy-8",
      "title": "First and Last Index Search Function",
      "problemStatement": "Write a static method `findFirstAndLast(int[] arr, int target)` that returns an array of two integers `[firstIndex, lastIndex]`. If the target does not exist in arr, return `[-1, -1]`. In `main()`, test with array `{4, 7, 2, 7, 9, 7, 1}` searching for 7 and 5.",
      "hint": "Scan from left to right for firstIndex, and update lastIndex as you iterate.",
      "solutionCode": "public class Solution {\n    public static int[] findFirstAndLast(int[] arr, int target) {\n        int first = -1;\n        int last = -1;\n        if (arr == null) return new int[]{-1, -1};\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) {\n                if (first == -1) {\n                    first = i;\n                }\n                last = i;\n            }\n        }\n        return new int[]{first, last};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {4, 7, 2, 7, 9, 7, 1};\n        int[] res7 = findFirstAndLast(nums, 7);\n        int[] res5 = findFirstAndLast(nums, 5);\n        System.out.println(\"Target 7 -> First: \" + res7[0] + \", Last: \" + res7[1]);\n        System.out.println(\"Target 5 -> First: \" + res5[0] + \", Last: \" + res5[1]);\n    }\n}",
      "output": "Target 7 -> First: 1, Last: 5\nTarget 5 -> First: -1, Last: -1",
      "explanation": "The method finds first and last indices in a single pass. If the element is never found, both remain -1. An array containing both results is returned."
    },
    {
      "id": "ex-method-anatomy-9",
      "title": "Title Case Sentence Formatter",
      "problemStatement": "Write a static method `toTitleCase(String sentence)` that returns a string with each word capitalized and the remaining letters lowercase. Handle multiple spaces gracefully. In `main()`, format \"java  PROGRAMMING  is   FUN!\" and print the result.",
      "hint": "Use sentence.trim().split(\"\\\\s+\") to split words by one or more whitespace characters, capitalize the first letter of each token, and join them.",
      "solutionCode": "public class Solution {\n    public static String toTitleCase(String sentence) {\n        if (sentence == null || sentence.trim().isEmpty()) {\n            return \"\";\n        }\n        String[] words = sentence.trim().split(\"\\\\s+\");\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < words.length; i++) {\n            String w = words[i];\n            String titleWord = Character.toUpperCase(w.charAt(0)) + w.substring(1).toLowerCase();\n            sb.append(titleWord);\n            if (i < words.length - 1) {\n                sb.append(\" \");\n            }\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        String input = \"java  PROGRAMMING  is   FUN!\";\n        System.out.println(\"Formatted: \" + toTitleCase(input));\n    }\n}",
      "output": "Formatted: Java Programming Is Fun!",
      "explanation": "The method accepts a String parameter, splits it into words ignoring arbitrary spacing, normalizes each word using substring and Character methods, and returns a cleanly formatted title-cased String."
    },
    {
      "id": "ex-method-anatomy-10",
      "title": "Pure Functional Array Reversal Copy",
      "problemStatement": "Write a pure static method `reverseCopy(int[] original)` that returns a brand new array with elements in reversed order. The original array must remain completely unmodified. In `main()`, reverse `{10, 20, 30, 40, 50}` and print both original and reversed arrays to verify immutability.",
      "hint": "Create a new int[original.length] inside the method and copy elements in reverse order without modifying original.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static int[] reverseCopy(int[] original) {\n        if (original == null) return null;\n        int len = original.length;\n        int[] reversed = new int[len];\n        for (int i = 0; i < len; i++) {\n            reversed[i] = original[len - 1 - i];\n        }\n        return reversed;\n    }\n\n    public static void main(String[] args) {\n        int[] original = {10, 20, 30, 40, 50};\n        int[] reversed = reverseCopy(original);\n        System.out.println(\"Original: \" + Arrays.toString(original));\n        System.out.println(\"Reversed: \" + Arrays.toString(reversed));\n    }\n}",
      "output": "Original: [10, 20, 30, 40, 50]\nReversed: [50, 40, 30, 20, 10]",
      "explanation": "A pure method produces no side effects. By allocating a new array on the heap and returning its reference, the caller original array remains completely intact."
    }
  ],
  "pass-by-value-deep-dive": [
    {
      "id": "ex-pass-val-1",
      "title": "Primitive Parameter Isolation Proof",
      "problemStatement": "Write a program containing a static method `tryToIncrement(int num)` that increments num by 10 and prints the value inside the method. In `main()`, declare `int original = 25`, print it, pass it to `tryToIncrement(original)`, and print it again after the method call to prove primitives are passed strictly by value.",
      "hint": "Inside tryToIncrement, num is a completely distinct stack variable with a copied bit-value.",
      "solutionCode": "public class Solution {\n    public static void tryToIncrement(int num) {\n        num += 10;\n        System.out.println(\"Inside tryToIncrement: \" + num);\n    }\n\n    public static void main(String[] args) {\n        int original = 25;\n        System.out.println(\"Before call: \" + original);\n        tryToIncrement(original);\n        System.out.println(\"After call: \" + original);\n    }\n}",
      "output": "Before call: 25\nInside tryToIncrement: 35\nAfter call: 25",
      "explanation": "Java copies the bits of original (25) into the parameter variable num on the stack frame of tryToIncrement. Modifying num alters only the callee frame; original in main remains untouched."
    },
    {
      "id": "ex-pass-val-2",
      "title": "Array Element In-Place Mutation",
      "problemStatement": "Write a static method `doubleAllElements(int[] numbers)` that iterates through the array and doubles every element in place. In `main()`, initialize `{3, 7, 12}`, call the method, and print the array before and after the call.",
      "hint": "While the reference variable is passed by value (copied), both caller and callee reference variables point to the exact same array object on the heap.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void doubleAllElements(int[] numbers) {\n        if (numbers == null) return;\n        for (int i = 0; i < numbers.length; i++) {\n            numbers[i] *= 2;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] data = {3, 7, 12};\n        System.out.println(\"Before: \" + Arrays.toString(data));\n        doubleAllElements(data);\n        System.out.println(\"After: \" + Arrays.toString(data));\n    }\n}",
      "output": "Before: [3, 7, 12]\nAfter: [6, 14, 24]",
      "explanation": "The reference to data is copied by value into numbers. Since numbers holds the memory address of the heap array, modifying numbers[i] directly mutates the shared heap object."
    },
    {
      "id": "ex-pass-val-3",
      "title": "Array Reference Reassignment Trap",
      "problemStatement": "Demonstrate why reassigning an array parameter has no effect on the caller. Write a static method `reassignArray(int[] arr)` that assigns `arr = new int[]{99, 99, 99}` and modifies `arr[0] = 100`. In `main()`, initialize `int[] original = {1, 2, 3}`, call `reassignArray(original)`, and print the array before and after.",
      "hint": "Reassigning arr inside the method merely points the local parameter reference to a new heap object. The caller reference still points to the old object.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void reassignArray(int[] arr) {\n        arr = new int[]{99, 99, 99};\n        arr[0] = 100;\n        System.out.println(\"Inside reassignArray: \" + Arrays.toString(arr));\n    }\n\n    public static void main(String[] args) {\n        int[] original = {1, 2, 3};\n        System.out.println(\"Before: \" + Arrays.toString(original));\n        reassignArray(original);\n        System.out.println(\"After: \" + Arrays.toString(original));\n    }\n}",
      "output": "Before: [1, 2, 3]\nInside reassignArray: [100, 99, 99]\nAfter: [1, 2, 3]",
      "explanation": "In Java, object references are passed by value. Reassigning arr redirects only the local parameter variable on the callee stack. The original reference in main remains anchored to [1, 2, 3]."
    },
    {
      "id": "ex-pass-val-4",
      "title": "Two-Element Array Swapper",
      "problemStatement": "Implement a static method `swapElements(int[] arr, int i, int j)` that swaps the values at indices i and j in arr. In `main()`, demonstrate that `swap(int a, int b)` fails to swap two primitives, but `swapElements(arr, i, j)` succeeds in swapping array elements.",
      "hint": "Because primitives are passed by value, swapping them requires an enclosing container like an array where elements can be mutated.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void badSwap(int a, int b) {\n        int temp = a;\n        a = b;\n        b = temp;\n    }\n\n    public static void swapElements(int[] arr, int i, int j) {\n        if (arr == null || i < 0 || i >= arr.length || j < 0 || j >= arr.length) return;\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n\n    public static void main(String[] args) {\n        int x = 10, y = 20;\n        badSwap(x, y);\n        System.out.println(\"Primitive swap failed: x=\" + x + \", y=\" + y);\n\n        int[] nums = {10, 20};\n        swapElements(nums, 0, 1);\n        System.out.println(\"Array swap succeeded: \" + Arrays.toString(nums));\n    }\n}",
      "output": "Primitive swap failed: x=10, y=20\nArray swap succeeded: [20, 10]",
      "explanation": "badSwap operates on copies of x and y, leaving the originals untouched. swapElements operates on the elements of the shared heap array via its copied reference, successfully mutating the contents."
    },
    {
      "id": "ex-pass-val-5",
      "title": "String Immutability and Reference Isolation",
      "problemStatement": "Write a static method `modifyString(String text)` that concatenates \" World\" using `text = text + \" World\"`. In `main()`, declare `String message = \"Hello\"`, pass it to `modifyString`, and print it before and after to illustrate how String immutability and pass-by-value interact.",
      "hint": "Strings in Java are immutable. Any modification creates a new String object and reassigns the local reference.",
      "solutionCode": "public class Solution {\n    public static void modifyString(String text) {\n        text = text + \" World\";\n        System.out.println(\"Inside modifyString: \" + text);\n    }\n\n    public static void main(String[] args) {\n        String message = \"Hello\";\n        System.out.println(\"Before call: \" + message);\n        modifyString(message);\n        System.out.println(\"After call: \" + message);\n    }\n}",
      "output": "Before call: Hello\nInside modifyString: Hello World\nAfter call: Hello",
      "explanation": "String objects cannot be mutated in place. The concatenation creates a brand new String \"Hello World\" and reassigns the local parameter text. The original reference message in main still points to \"Hello\"."
    },
    {
      "id": "ex-pass-val-6",
      "title": "In-Place Scaling vs Defensive Copy",
      "problemStatement": "Implement two static methods: 1) `scaleInPlace(double[] arr, double factor)` which modifies the input array directly; 2) `scaleDefensiveCopy(double[] arr, double factor)` which creates and returns a new scaled array leaving the original array intact. In `main()`, demonstrate both approaches.",
      "hint": "Defensive copying is the cornerstone of writing safe, side-effect-free code in enterprise systems.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void scaleInPlace(double[] arr, double factor) {\n        for (int i = 0; i < arr.length; i++) {\n            arr[i] *= factor;\n        }\n    }\n\n    public static double[] scaleDefensiveCopy(double[] arr, double factor) {\n        double[] copy = new double[arr.length];\n        for (int i = 0; i < arr.length; i++) {\n            copy[i] = arr[i] * factor;\n        }\n        return copy;\n    }\n\n    public static void main(String[] args) {\n        double[] rawData = {2.0, 4.0, 6.0};\n\n        double[] copyResult = scaleDefensiveCopy(rawData, 3.0);\n        System.out.println(\"After defensive copy: raw=\" + Arrays.toString(rawData) + \", result=\" + Arrays.toString(copyResult));\n\n        scaleInPlace(rawData, 3.0);\n        System.out.println(\"After in-place mutation: raw=\" + Arrays.toString(rawData));\n    }\n}",
      "output": "After defensive copy: raw=[2.0, 4.0, 6.0], result=[6.0, 12.0, 18.0]\nAfter in-place mutation: raw=[6.0, 12.0, 18.0]",
      "explanation": "scaleDefensiveCopy allocates a new array and returns its reference, protecting caller data from side effects. scaleInPlace directly mutates the shared heap object."
    },
    {
      "id": "ex-pass-val-7",
      "title": "Matrix Row Zeroing via Reference",
      "problemStatement": "Write a static method `zeroRow(int[][] matrix, int rowIdx)` that sets every element in the specified row of a 2D integer matrix to 0. In `main()`, create a 3x3 matrix, zero out row index 1, and print the resulting matrix to show multidimensional reference mutation.",
      "hint": "In Java, a 2D array is an array of 1D array references. matrix[rowIdx] retrieves the reference to that specific row.",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void zeroRow(int[][] matrix, int rowIdx) {\n        if (matrix == null || rowIdx < 0 || rowIdx >= matrix.length) return;\n        for (int col = 0; col < matrix[rowIdx].length; col++) {\n            matrix[rowIdx][col] = 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[][] grid = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        zeroRow(grid, 1);\n\n        for (int[] row : grid) {\n            System.out.println(Arrays.toString(row));\n        }\n    }\n}",
      "output": "[1, 2, 3]\n[0, 0, 0]\n[7, 8, 9]",
      "explanation": "grid is an array of references to 1D arrays. zeroRow accesses the reference at matrix[1] and mutates its elements. Row 1 becomes all zeros while rows 0 and 2 are unaffected."
    },
    {
      "id": "ex-pass-val-8",
      "title": "Prefix Sum Computation In-Place",
      "problemStatement": "Write a static method `computePrefixSumInPlace(int[] nums)` that replaces each element at index i with the sum of all elements from index 0 to i. Do this with O(1) auxiliary space by mutating the array in-place. In `main()`, test with `{2, 4, 6, 8, 10}`.",
      "hint": "Start looping from index 1: nums[i] = nums[i] + nums[i - 1].",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void computePrefixSumInPlace(int[] nums) {\n        if (nums == null || nums.length <= 1) return;\n        for (int i = 1; i < nums.length; i++) {\n            nums[i] += nums[i - 1];\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] values = {2, 4, 6, 8, 10};\n        System.out.println(\"Original: \" + Arrays.toString(values));\n        computePrefixSumInPlace(values);\n        System.out.println(\"Prefix Sums: \" + Arrays.toString(values));\n    }\n}",
      "output": "Original: [2, 4, 6, 8, 10]\nPrefix Sums: [2, 6, 12, 20, 30]",
      "explanation": "Because the array reference is shared between main and computePrefixSumInPlace, running the cumulative addition in-place transforms the caller array without allocating additional memory."
    },
    {
      "id": "ex-pass-val-9",
      "title": "Character Array In-Place Reversal",
      "problemStatement": "Write a static method `reverseChars(char[] letters)` that reverses a character array in place using two pointers (left and right) without allocating a new array. In `main()`, test with `char[] message = {'J', 'A', 'V', 'A'}` and print the reversed array.",
      "hint": "Initialize left = 0, right = letters.length - 1, swap letters[left] and letters[right], and increment/decrement pointers until left >= right.",
      "solutionCode": "public class Solution {\n    public static void reverseChars(char[] letters) {\n        if (letters == null) return;\n        int left = 0;\n        int right = letters.length - 1;\n        while (left < right) {\n            char temp = letters[left];\n            letters[left] = letters[right];\n            letters[right] = temp;\n            left++;\n            right--;\n        }\n    }\n\n    public static void main(String[] args) {\n        char[] message = {'J', 'A', 'V', 'A'};\n        reverseChars(message);\n        System.out.println(\"Reversed: \" + new String(message));\n    }\n}",
      "output": "Reversed: AVAJ",
      "explanation": "The two-pointer technique mutates character values inside the heap-allocated array. Since message points to this exact array, the reversed characters are immediately visible upon method completion."
    },
    {
      "id": "ex-pass-val-10",
      "title": "Pass-by-Value Comprehensive Diagnostic Pipeline",
      "problemStatement": "Create a static diagnostic method `inspectBehavior(int val, int[] arr1, int[] arr2)` that: 1) increments val by 50; 2) sets arr1[0] = 777; 3) reassigns arr2 = new int[]{999}. In `main()`, pass `x = 10`, `a = {100}`, `b = {200}`, call `inspectBehavior(x, a, b)`, and print all three variables after the call to demonstrate all 3 facets of pass-by-value.",
      "hint": "Predict what happens to x (primitive copy), a (heap mutation via copied reference), and b (reassignment of copied reference).",
      "solutionCode": "import java.util.Arrays;\n\npublic class Solution {\n    public static void inspectBehavior(int val, int[] arr1, int[] arr2) {\n        val += 50;\n        arr1[0] = 777;\n        arr2 = new int[]{999};\n    }\n\n    public static void main(String[] args) {\n        int x = 10;\n        int[] a = {100};\n        int[] b = {200};\n\n        inspectBehavior(x, a, b);\n\n        System.out.println(\"Primitive x (unmodified): \" + x);\n        System.out.println(\"Mutated arr1 (element altered): \" + Arrays.toString(a));\n        System.out.println(\"Reassigned arr2 (reference unchanged): \" + Arrays.toString(b));\n    }\n}",
      "output": "Primitive x (unmodified): 10\nMutated arr1 (element altered): [777]\nReassigned arr2 (reference unchanged): [200]",
      "explanation": "This diagnostic definitively proves Java is 100% pass-by-value: 1) primitive x was copied (10 unchanged); 2) reference a was copied, but mutating its pointed-to heap element changed arr1[0] to 777; 3) reference b was copied, and reassigning the copy inside the method left caller b pointing to [200]."
    }
  ],
  "method-overloading-and-varargs": [
    {
      "id": "ex-overload-varargs-1",
      "title": "Geometric Area Calculator Overloading",
      "problemStatement": "Overload a static method `calculateArea` to compute the area of: 1) circle: `calculateArea(double radius)`; 2) rectangle: `calculateArea(double length, double width)`; 3) triangle: `calculateArea(double base, double height, boolean isTriangle)`. In `main()`, compute and print the area for a circle of radius 5.0, a rectangle 4.0 x 6.0, and a triangle 8.0 x 3.0.",
      "hint": "Circle area is Math.PI * r * r. Triangle area is 0.5 * base * height. The boolean parameter differentiates triangle from rectangle overloads.",
      "solutionCode": "public class Solution {\n    public static double calculateArea(double radius) {\n        return Math.PI * radius * radius;\n    }\n\n    public static double calculateArea(double length, double width) {\n        return length * width;\n    }\n\n    public static double calculateArea(double base, double height, boolean isTriangle) {\n        if (isTriangle) {\n            return 0.5 * base * height;\n        }\n        return base * height;\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"Circle: %.2f%n\", calculateArea(5.0));\n        System.out.printf(\"Rectangle: %.2f%n\", calculateArea(4.0, 6.0));\n        System.out.printf(\"Triangle: %.2f%n\", calculateArea(8.0, 3.0, true));\n    }\n}",
      "output": "Circle: 78.54\nRectangle: 24.00\nTriangle: 12.00",
      "explanation": "Method overloading allows reusing the method name calculateArea with distinct parameter lists. The compiler determines which overload to invoke at compile time based on argument count and types."
    },
    {
      "id": "ex-overload-varargs-2",
      "title": "Overloaded Extremum Finder",
      "problemStatement": "Implement three overloaded versions of `findMax`: 1) `findMax(int a, int b)` returning the larger int; 2) `findMax(int a, int b, int c)` returning the largest of 3 ints; 3) `findMax(double a, double b)` returning the larger double. Reuse the 2-int overload inside the 3-int overload. In `main()`, test each overload.",
      "hint": "In findMax(a, b, c), return findMax(findMax(a, b), c). Reusing existing overloads reduces duplication.",
      "solutionCode": "public class Solution {\n    public static int findMax(int a, int b) {\n        return (a >= b) ? a : b;\n    }\n\n    public static int findMax(int a, int b, int c) {\n        return findMax(findMax(a, b), c);\n    }\n\n    public static double findMax(double a, double b) {\n        return (a >= b) ? a : b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Max of 2 ints (15, 28): \" + findMax(15, 28));\n        System.out.println(\"Max of 3 ints (15, 42, 28): \" + findMax(15, 42, 28));\n        System.out.println(\"Max of 2 doubles (3.14, 2.71): \" + findMax(3.14, 2.71));\n    }\n}",
      "output": "Max of 2 ints (15, 28): 28\nMax of 3 ints (15, 42, 28): 42\nMax of 2 doubles (3.14, 2.71): 3.14",
      "explanation": "Overloaded methods can call each other cleanly. The 3-int version delegates to the 2-int version, ensuring DRY (Don't Repeat Yourself) design while presenting a clean API."
    },
    {
      "id": "ex-overload-varargs-3",
      "title": "Varargs Number Summation Utility",
      "problemStatement": "Write a static method `sum(int... numbers)` that accepts an arbitrary number of integers (including zero) and returns their total sum. In `main()`, call `sum()` with zero arguments, three arguments (10, 20, 30), and an explicit array `{5, 10, 15, 20}`.",
      "hint": "Inside the method, numbers is treated as an int[] array. Handle the empty case naturally since an empty array produces a sum of 0.",
      "solutionCode": "public class Solution {\n    public static int sum(int... numbers) {\n        int total = 0;\n        for (int n : numbers) {\n            total += n;\n        }\n        return total;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Empty sum: \" + sum());\n        System.out.println(\"Three ints sum: \" + sum(10, 20, 30));\n        int[] arr = {5, 10, 15, 20};\n        System.out.println(\"Array sum: \" + sum(arr));\n    }\n}",
      "output": "Empty sum: 0\nThree ints sum: 60\nArray sum: 50",
      "explanation": "Varargs (Type... name) is syntactic sugar. At compile time, Java wraps individual arguments into an array. Calling sum() passes an empty array, and passing an existing array works directly."
    },
    {
      "id": "ex-overload-varargs-4",
      "title": "Guaranteed Minimum with Mandatory Parameter",
      "problemStatement": "A common bug with varargs is passing 0 arguments when at least one is logically required. Write a static method `findMin(int first, int... rest)` that mathematically guarantees at least one value must be provided at compile-time. In `main()`, test with a single value `findMin(42)` and multiple values `findMin(42, 17, 88, 5)`.",
      "hint": "By making the first parameter non-varargs, calling findMin() with 0 arguments fails at compile time, eliminating runtime errors.",
      "solutionCode": "public class Solution {\n    public static int findMin(int first, int... rest) {\n        int min = first;\n        for (int val : rest) {\n            if (val < min) {\n                min = val;\n            }\n        }\n        return min;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Min of single item: \" + findMin(42));\n        System.out.println(\"Min of multiple items: \" + findMin(42, 17, 88, 5));\n    }\n}",
      "output": "Min of single item: 42\nMin of multiple items: 5",
      "explanation": "The pattern (Type first, Type... rest) enforces at least one argument at compile time. Calling findMin() without arguments causes a compiler error rather than a runtime exception."
    },
    {
      "id": "ex-overload-varargs-5",
      "title": "Overloaded Diagnostic Logger",
      "problemStatement": "Implement an overloaded diagnostic logger with three variants: 1) `log(String msg)` printing `[INFO] msg`; 2) `log(String tag, String msg)` printing `[tag] msg`; 3) `log(String tag, int... errorCodes)` printing `[tag] Codes: code1, code2, ...`. In `main()`, test all three variants.",
      "hint": "For the varargs logger, iterate through errorCodes and join with commas.",
      "solutionCode": "public class Solution {\n    public static void log(String msg) {\n        System.out.println(\"[INFO] \" + msg);\n    }\n\n    public static void log(String tag, String msg) {\n        System.out.println(\"[\" + tag + \"] \" + msg);\n    }\n\n    public static void log(String tag, int... errorCodes) {\n        StringBuilder sb = new StringBuilder(\"[\" + tag + \"] Codes: \");\n        for (int i = 0; i < errorCodes.length; i++) {\n            sb.append(errorCodes[i]);\n            if (i < errorCodes.length - 1) sb.append(\", \");\n        }\n        System.out.println(sb.toString());\n    }\n\n    public static void main(String[] args) {\n        log(\"Application initialized\");\n        log(\"AUTH\", \"User token validated\");\n        log(\"NETWORK\", 404, 500, 503);\n    }\n}",
      "output": "[INFO] Application initialized\n[AUTH] User token validated\n[NETWORK] Codes: 404, 500, 503",
      "explanation": "Overloaded methods provide flexible API entry points. The compiler matches the call signature based on argument types and lengths, selecting the exact overload required."
    },
    {
      "id": "ex-overload-varargs-6",
      "title": "Flexible Delimited String Joiner",
      "problemStatement": "Write a static method `joinWith(String delimiter, String... elements)` that joins all strings with delimiter in between. If elements is empty or length is 0, return empty string \"\". In `main()`, join words with \", \", \" | \", and test with zero string arguments.",
      "hint": "Ensure no trailing delimiter is appended after the final string.",
      "solutionCode": "public class Solution {\n    public static String joinWith(String delimiter, String... elements) {\n        if (elements == null || elements.length == 0) {\n            return \"\";\n        }\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < elements.length; i++) {\n            sb.append(elements[i]);\n            if (i < elements.length - 1) {\n                sb.append(delimiter);\n            }\n        }\n        return sb.toString();\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Joined: \" + joinWith(\", \", \"Red\", \"Green\", \"Blue\"));\n        System.out.println(\"Piped: \" + joinWith(\" | \", \"ID\", \"Name\", \"Role\"));\n        System.out.println(\"Empty: [\" + joinWith(\" - \") + \"]\");\n    }\n}",
      "output": "Joined: Red, Green, Blue\nPiped: ID | Name | Role\nEmpty: []",
      "explanation": "Varargs makes utility methods like joinWith highly convenient, allowing callers to pass any number of items without explicitly constructing an array."
    },
    {
      "id": "ex-overload-varargs-7",
      "title": "Resolution Priority: Exact Match vs Widening vs Varargs",
      "problemStatement": "Demonstrate Java's method resolution priority order. Define three overloaded methods: `process(int x)` printing \"Exact int\", `process(long x)` printing \"Widened to long\", and `process(int... x)` printing \"Varargs int\". In `main()`, invoke `process((short) 5)`, `process(10L)`, `process(20)`, and `process(1, 2)`.",
      "hint": "Java resolves overloads in order: 1. Exact match, 2. Primitive widening, 3. Autoboxing, 4. Varargs (lowest priority).",
      "solutionCode": "public class Solution {\n    public static void process(int x) {\n        System.out.println(\"Exact int: \" + x);\n    }\n\n    public static void process(long x) {\n        System.out.println(\"Widened to long: \" + x);\n    }\n\n    public static void process(int... x) {\n        System.out.println(\"Varargs int count: \" + x.length);\n    }\n\n    public static void main(String[] args) {\n        short s = 5;\n        process(s);     // short widens to int before long or varargs\n        process(10L);   // exact long match\n        process(20);    // exact int match\n        process(1, 2);  // varargs (multiple arguments)\n    }\n}",
      "output": "Exact int: 5\nWidened to long: 10\nExact int: 20\nVarargs int count: 2",
      "explanation": "Java compiler prioritizes: 1) exact matches, 2) widening primitive conversions (short -> int), 3) varargs as lowest priority fallback. For short s, widening to int is preferred over widening to long or varargs."
    },
    {
      "id": "ex-overload-varargs-8",
      "title": "Decorated Block Formatter with Varargs",
      "problemStatement": "Write a static method `printBlock(String title, String... lines)` that prints a bordered ASCII banner around title and lines. In `main()`, print a block with 3 lines and another with 1 line.",
      "hint": "Print a border of equal width before and after the lines.",
      "solutionCode": "public class Solution {\n    public static void printBlock(String title, String... lines) {\n        String border = \"====================\";\n        System.out.println(border);\n        System.out.println(\"  \" + title.toUpperCase());\n        System.out.println(border);\n        for (String line : lines) {\n            System.out.println(\"  * \" + line);\n        }\n        System.out.println(border);\n    }\n\n    public static void main(String[] args) {\n        printBlock(\"Instructions\", \"Compile with javac\", \"Run with java\", \"Inspect call stack\");\n        printBlock(\"Notice\", \"System maintenance at midnight\");\n    }\n}",
      "output": "====================\n  INSTRUCTIONS\n====================\n  * Compile with javac\n  * Run with java\n  * Inspect call stack\n====================\n====================\n  NOTICE\n====================\n  * System maintenance at midnight\n====================",
      "explanation": "printBlock combines a fixed title parameter with a varargs lines parameter. The mandatory title ensures context while lines gives full flexibility."
    },
    {
      "id": "ex-overload-varargs-9",
      "title": "Overloaded Multi-Type Array Search",
      "problemStatement": "Implement two overloaded `indexOf` methods: 1) `indexOf(int[] arr, int target)` returning the index of the first occurrence of target or -1; 2) `indexOf(String[] arr, String target)` doing the same for String arrays using `.equals()`. In `main()`, test both methods.",
      "hint": "Remember that primitives compare with == while String references require .equals().",
      "solutionCode": "public class Solution {\n    public static int indexOf(int[] arr, int target) {\n        if (arr == null) return -1;\n        for (int i = 0; i < arr.length; i++) {\n            if (arr[i] == target) return i;\n        }\n        return -1;\n    }\n\n    public static int indexOf(String[] arr, String target) {\n        if (arr == null || target == null) return -1;\n        for (int i = 0; i < arr.length; i++) {\n            if (target.equals(arr[i])) return i;\n        }\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30, 40};\n        String[] words = {\"Apple\", \"Banana\", \"Cherry\"};\n\n        System.out.println(\"Index of 30: \" + indexOf(numbers, 30));\n        System.out.println(\"Index of 99: \" + indexOf(numbers, 99));\n        System.out.println(\"Index of Banana: \" + indexOf(words, \"Banana\"));\n        System.out.println(\"Index of Mango: \" + indexOf(words, \"Mango\"));\n    }\n}",
      "output": "Index of 30: 2\nIndex of 99: -1\nIndex of Banana: 1\nIndex of Mango: -1",
      "explanation": "Overloading allows intuitive polymorphism: developers call indexOf regardless of whether they search an int array or a String array, and the compiler dispatches to the correct type-safe overload."
    },
    {
      "id": "ex-overload-varargs-10",
      "title": "Overloaded Statistical Aggregator",
      "problemStatement": "Implement three overloaded `average` methods: 1) `average(int a, int b)` returning double; 2) `average(int[] numbers)` returning double; 3) `average(double... values)` returning double. In `main()`, test all three variants.",
      "hint": "Be careful with integer division when computing averages: cast sum to double before dividing by count.",
      "solutionCode": "public class Solution {\n    public static double average(int a, int b) {\n        return (a + b) / 2.0;\n    }\n\n    public static double average(int[] numbers) {\n        if (numbers == null || numbers.length == 0) return 0.0;\n        int sum = 0;\n        for (int n : numbers) sum += n;\n        return (double) sum / numbers.length;\n    }\n\n    public static double average(double... values) {\n        if (values == null || values.length == 0) return 0.0;\n        double sum = 0;\n        for (double v : values) sum += v;\n        return sum / values.length;\n    }\n\n    public static void main(String[] args) {\n        System.out.printf(\"Average of 2 ints (10, 15): %.2f%n\", average(10, 15));\n        int[] arr = {10, 20, 30, 40, 50};\n        System.out.printf(\"Average of int array: %.2f%n\", average(arr));\n        System.out.printf(\"Average of varargs doubles: %.2f%n\", average(1.5, 2.5, 3.5));\n    }\n}",
      "output": "Average of 2 ints (10, 15): 12.50\nAverage of int array: 30.00\nAverage of varargs doubles: 2.50",
      "explanation": "This exercise showcases how overloading provides specialized fast paths (2-arg int average) alongside general array and varargs methods while ensuring correct floating-point calculations."
    }
  ],
  "recursion-and-call-stack": [
    {
      "id": "ex-recursion-1",
      "title": "Recursive Factorial with Call Stack Trace",
      "problemStatement": "Write a recursive method `factorial(int n, int depth)` that calculates n! and visually prints indentation proportional to recursion depth on method entry and exit. In `main()`, calculate `factorial(4, 0)` to display winding (call descent) and unwinding (return ascent).",
      "hint": "Base case is n <= 1 returning 1. Print indentation with depth spaces before recursive call and upon returning.",
      "solutionCode": "public class Solution {\n    public static long factorial(int n, int depth) {\n        String indent = \"  \".repeat(depth);\n        System.out.println(indent + \"-> factorial(\" + n + \") ENTER\");\n        if (n <= 1) {\n            System.out.println(indent + \"<- factorial(\" + n + \") RETURN 1 (Base Case)\");\n            return 1;\n        }\n        long result = n * factorial(n - 1, depth + 1);\n        System.out.println(indent + \"<- factorial(\" + n + \") RETURN \" + result);\n        return result;\n    }\n\n    public static void main(String[] args) {\n        long ans = factorial(4, 0);\n        System.out.println(\"Result: 4! = \" + ans);\n    }\n}",
      "output": "-> factorial(4) ENTER\n  -> factorial(3) ENTER\n    -> factorial(2) ENTER\n      -> factorial(1) ENTER\n      <- factorial(1) RETURN 1 (Base Case)\n    <- factorial(2) RETURN 2\n  <- factorial(3) RETURN 6\n<- factorial(4) RETURN 24\nResult: 4! = 24",
      "explanation": "The trace demonstrates stack winding as frames are pushed for factorial(4) down to factorial(1). Once the base case is hit, stack frames unwind in reverse (LIFO) order, multiplying values and returning results."
    },
    {
      "id": "ex-recursion-2",
      "title": "Recursive Sum of Natural Numbers",
      "problemStatement": "Write a recursive method `sumNatural(int n)` that computes the sum 1 + 2 + ... + n. If n <= 0, return 0. If n == 1, return 1. In `main()`, test with n = 5 and n = 10.",
      "hint": "Recursive step: return n + sumNatural(n - 1).",
      "solutionCode": "public class Solution {\n    public static int sumNatural(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return n + sumNatural(n - 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 1..5: \" + sumNatural(5));\n        System.out.println(\"Sum 1..10: \" + sumNatural(10));\n    }\n}",
      "output": "Sum 1..5: 15\nSum 1..10: 55",
      "explanation": "sumNatural decomposes sum(n) into n + sum(n-1). Each frame waits for its child call to return before computing its final sum and popping off the stack."
    },
    {
      "id": "ex-recursion-3",
      "title": "Fast Recursive Exponentiation",
      "problemStatement": "Implement fast recursive exponentiation `power(int base, int exp)` in O(log exp) time using the divide-and-conquer strategy: if exp == 0 return 1; if exp is even, calculate half = power(base, exp / 2) and return half * half; if exp is odd, return base * power(base, exp - 1). In `main()`, compute 2^10 and 3^5.",
      "hint": "Storing half = power(base, exp / 2) avoids evaluating the branch twice, achieving logarithmic time complexity.",
      "solutionCode": "public class Solution {\n    public static long power(int base, int exp) {\n        if (exp == 0) return 1;\n        if (exp == 1) return base;\n        if (exp % 2 == 0) {\n            long half = power(base, exp / 2);\n            return half * half;\n        } else {\n            return base * power(base, exp - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"2^10 = \" + power(2, 10));\n        System.out.println(\"3^5 = \" + power(3, 5));\n    }\n}",
      "output": "2^10 = 1024\n3^5 = 243",
      "explanation": "Fast exponentiation cuts problem size in half on even powers. Computing 2^10 requires only ~4 recursive frames compared to 10 frames in linear recursion."
    },
    {
      "id": "ex-recursion-4",
      "title": "Recursive Array Element Accumulation",
      "problemStatement": "Write a recursive method `sumArray(int[] arr, int index)` that calculates the sum of all elements from index to arr.length - 1. Base case is index == arr.length, returning 0. In `main()`, calculate the sum of `{5, 12, 8, 3, 17}` starting from index 0.",
      "hint": "Recursive step: return arr[index] + sumArray(arr, index + 1).",
      "solutionCode": "public class Solution {\n    public static int sumArray(int[] arr, int index) {\n        if (arr == null || index >= arr.length) {\n            return 0;\n        }\n        return arr[index] + sumArray(arr, index + 1);\n    }\n\n    public static void main(String[] args) {\n        int[] numbers = {5, 12, 8, 3, 17};\n        int total = sumArray(numbers, 0);\n        System.out.println(\"Array Sum: \" + total);\n    }\n}",
      "output": "Array Sum: 45",
      "explanation": "Recursive traversal on arrays passes an index counter. When index reaches length, the base case triggers 0, and unwinding sums each element backwards to index 0."
    },
    {
      "id": "ex-recursion-5",
      "title": "Recursive String Reversal",
      "problemStatement": "Write a recursive method `reverseString(String str)` that reverses a string without any loops or StringBuilder.reverse(). If str is null, empty, or length 1, return str. Otherwise return `reverseString(str.substring(1)) + str.charAt(0)`. In `main()`, reverse \"RECURSION\".",
      "hint": "The recursive step peels off the first character and appends it to the end of the reversed substring.",
      "solutionCode": "public class Solution {\n    public static String reverseString(String str) {\n        if (str == null || str.length() <= 1) {\n            return str;\n        }\n        return reverseString(str.substring(1)) + str.charAt(0);\n    }\n\n    public static void main(String[] args) {\n        String original = \"RECURSION\";\n        String reversed = reverseString(original);\n        System.out.println(\"Original: \" + original);\n        System.out.println(\"Reversed: \" + reversed);\n    }\n}",
      "output": "Original: RECURSION\nReversed: NOISRUCER",
      "explanation": "For \"RECURSION\", reverseString(\"ECURSION\") + 'R' is queued. The stack unwinds from the single-character base case 'N', reconstructing the string in reverse order."
    },
    {
      "id": "ex-recursion-6",
      "title": "Recursive Palindrome Verification",
      "problemStatement": "Implement a recursive method `isPalindrome(String s, int left, int right)` that tests whether a string is a palindrome. If left >= right, return true. If characters at left and right do not match, return false. Otherwise, recurse on left + 1 and right - 1. In `main()`, test \"racecar\" and \"recursion\".",
      "hint": "Pass s.toLowerCase() with left = 0 and right = s.length() - 1.",
      "solutionCode": "public class Solution {\n    public static boolean isPalindrome(String s, int left, int right) {\n        if (s == null) return false;\n        if (left >= right) return true;\n        if (s.charAt(left) != s.charAt(right)) return false;\n        return isPalindrome(s, left + 1, right - 1);\n    }\n\n    public static void main(String[] args) {\n        String s1 = \"racecar\";\n        String s2 = \"recursion\";\n\n        System.out.println(s1 + \" is palindrome? \" + isPalindrome(s1, 0, s1.length() - 1));\n        System.out.println(s2 + \" is palindrome? \" + isPalindrome(s2, 0, s2.length() - 1));\n    }\n}",
      "output": "racecar is palindrome? true\nrecursion is palindrome? false",
      "explanation": "The two-pointer recursive verification checks outer characters. If equal, it moves pointers inward until they meet or cross (base case true). Any mismatch exits early with false."
    },
    {
      "id": "ex-recursion-7",
      "title": "Recursive Fibonacci with Call Counter Metric",
      "problemStatement": "Write a recursive Fibonacci method `fib(int n)` that tracks the total number of method calls using a static integer variable `callCount`. In `main()`, reset `callCount`, calculate `fib(6)`, and print the result and total calls to expose the exponential overhead of naive tree recursion.",
      "hint": "Increment callCount at the beginning of each fib call. fib(0)=0, fib(1)=1, fib(n) = fib(n-1) + fib(n-2).",
      "solutionCode": "public class Solution {\n    public static int callCount = 0;\n\n    public static int fib(int n) {\n        callCount++;\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fib(n - 1) + fib(n - 2);\n    }\n\n    public static void main(String[] args) {\n        callCount = 0;\n        int n = 6;\n        int result = fib(n);\n        System.out.println(\"Fib(\" + n + \") = \" + result);\n        System.out.println(\"Total recursive calls: \" + callCount);\n    }\n}",
      "output": "Fib(6) = 8\nTotal recursive calls: 25",
      "explanation": "Tree recursion branches into two subproblems per frame. For n=6, 25 distinct stack frames are allocated to compute fib(6)=8. This demonstrates O(2^N) exponential time complexity."
    },
    {
      "id": "ex-recursion-8",
      "title": "Recursive Binary Search on Sorted Array",
      "problemStatement": "Implement `binarySearch(int[] arr, int target, int low, int high)` recursively. If low > high, return -1 (target not found). Calculate mid = low + (high - low) / 2. If arr[mid] == target return mid; if arr[mid] > target recurse left; else recurse right. In `main()`, search for 35 and 99 in `{3, 9, 14, 21, 35, 48, 62, 79}`.",
      "hint": "Use mid = low + (high - low) / 2 to avoid integer overflow that could occur with (low + high) / 2.",
      "solutionCode": "public class Solution {\n    public static int binarySearch(int[] arr, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) {\n            return mid;\n        } else if (arr[mid] > target) {\n            return binarySearch(arr, target, low, mid - 1);\n        } else {\n            return binarySearch(arr, target, mid + 1, high);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {3, 9, 14, 21, 35, 48, 62, 79};\n        int target1 = 35;\n        int target2 = 99;\n\n        System.out.println(\"Search \" + target1 + \" -> index: \" + binarySearch(sorted, target1, 0, sorted.length - 1));\n        System.out.println(\"Search \" + target2 + \" -> index: \" + binarySearch(sorted, target2, 0, sorted.length - 1));\n    }\n}",
      "output": "Search 35 -> index: 4\nSearch 99 -> index: -1",
      "explanation": "Recursive binary search splits the search interval in half with each frame. The call stack depth is at most O(log N), making it an efficient divide-and-conquer algorithm."
    },
    {
      "id": "ex-recursion-9",
      "title": "Recursive Greatest Common Divisor (Euclidean Algorithm)",
      "problemStatement": "Write a recursive method `gcd(int a, int b)` implementing the Euclidean algorithm: if b == 0, return a; otherwise, return `gcd(b, a % b)`. In `main()`, compute the GCD of (48, 18), (101, 10), and (54, 24).",
      "hint": "The Euclidean algorithm works by repeatedly replacing (a, b) with (b, a % b) until the remainder b is 0.",
      "solutionCode": "public class Solution {\n    public static int gcd(int a, int b) {\n        if (b == 0) {\n            return a;\n        }\n        return gcd(b, a % b);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"GCD(48, 18) = \" + gcd(48, 18));\n        System.out.println(\"GCD(101, 10) = \" + gcd(101, 10));\n        System.out.println(\"GCD(54, 24) = \" + gcd(54, 24));\n    }\n}",
      "output": "GCD(48, 18) = 6\nGCD(101, 10) = 1\nGCD(54, 24) = 6",
      "explanation": "The Euclidean GCD algorithm demonstrates elegant tail recursion: gcd(48, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) which hits base case b==0 and returns 6."
    },
    {
      "id": "ex-recursion-10",
      "title": "Recursive Decimal to Binary String Converter",
      "problemStatement": "Write a recursive method `toBinary(int n)` that converts a non-negative integer into its binary representation string. If n == 0, return \"0\". If n == 1, return \"1\". For n > 1, return `toBinary(n / 2) + (n % 2)`. In `main()`, convert 0, 1, 13, and 45.",
      "hint": "Dividing by 2 shifts bits to the right, and n % 2 extracts the least significant bit (0 or 1).",
      "solutionCode": "public class Solution {\n    public static String toBinary(int n) {\n        if (n == 0) return \"0\";\n        if (n == 1) return \"1\";\n        return toBinary(n / 2) + (n % 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Binary of 0: \" + toBinary(0));\n        System.out.println(\"Binary of 1: \" + toBinary(1));\n        System.out.println(\"Binary of 13: \" + toBinary(13));\n        System.out.println(\"Binary of 45: \" + toBinary(45));\n    }\n}",
      "output": "Binary of 0: 0\nBinary of 1: 1\nBinary of 13: 1101\nBinary of 45: 101101",
      "explanation": "The recursive call toBinary(n / 2) calculates higher-order bits first on the winding stack. On unwinding, the remainder (n % 2) appends the lowest bit, yielding correct binary order without manual string reversal."
    }
  ]
};
