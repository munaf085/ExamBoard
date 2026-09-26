import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 9: RECURSION & CALL STACK - PROGRAMMING EXERCISES
// Total: 40 FAANG-Standard exercises (10 per sub-lesson)
// Progressive difficulty: Beginner to Advanced
// All runnable in `public class Main { public static void main(String[] args) { ... } }`
// ============================================================

export const recursionExercises: Record<string, ProgrammingExercise[]> = {
  "recursion-and-call-stack": [
    {
      "id": "ex-rec-stack-1",
      "title": "Recursive Factorial with Call Stack Trace",
      "problemStatement": "Write a recursive method `factorial(int n, int depth)` that calculates n! and visually prints indentation proportional to recursion depth on method entry ('-> factorial(n) ENTER') and exit ('<- factorial(n) RETURN result'). In `main()`, invoke `factorial(4, 0)` and print the final result.",
      "hint": "Base case is n <= 1 returning 1. Use '  '.repeat(depth) to indent traces according to current frame depth.",
      "solutionCode": "public class Main {\n    public static long factorial(int n, int depth) {\n        String indent = \"  \".repeat(depth);\n        System.out.println(indent + \"-> factorial(\" + n + \") ENTER\");\n        if (n <= 1) {\n            System.out.println(indent + \"<- factorial(\" + n + \") RETURN 1\");\n            return 1;\n        }\n        long result = n * factorial(n - 1, depth + 1);\n        System.out.println(indent + \"<- factorial(\" + n + \") RETURN \" + result);\n        return result;\n    }\n\n    public static void main(String[] args) {\n        long ans = factorial(4, 0);\n        System.out.println(\"Result: 4! = \" + ans);\n    }\n}",
      "output": "-> factorial(4) ENTER\n  -> factorial(3) ENTER\n    -> factorial(2) ENTER\n      -> factorial(1) ENTER\n      <- factorial(1) RETURN 1\n    <- factorial(2) RETURN 2\n  <- factorial(3) RETURN 6\n<- factorial(4) RETURN 24\nResult: 4! = 24",
      "explanation": "The indentation trace clearly demonstrates stack winding as frames are pushed from depth 0 down to depth 3. When n=1 triggers the base case, frames unwind in LIFO order, multiplying n by the child result and returning to the caller."
    },
    {
      "id": "ex-rec-stack-2",
      "title": "Recursive Sum of Natural Numbers",
      "problemStatement": "Implement a recursive method `sumNatural(int n)` that computes the sum 1 + 2 + ... + n. If n <= 0, return 0; if n == 1, return 1. In `main()`, compute and print the sum for n = 5 and n = 10.",
      "hint": "The recurrence relation is sumNatural(n) = n + sumNatural(n - 1).",
      "solutionCode": "public class Main {\n    public static int sumNatural(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return n + sumNatural(n - 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum 1..5: \" + sumNatural(5));\n        System.out.println(\"Sum 1..10: \" + sumNatural(10));\n    }\n}",
      "output": "Sum 1..5: 15\nSum 1..10: 55",
      "explanation": "sumNatural decomposes sum(n) into n + sum(n-1). Each frame waits for its child call to return before adding n and returning up the stack."
    },
    {
      "id": "ex-rec-stack-3",
      "title": "Recursive Digit Sum",
      "problemStatement": "Write a recursive method `sumDigits(int n)` that computes the sum of the digits of a non-negative integer using recursion: n % 10 + sumDigits(n / 10). If n == 0, return 0. In `main()`, test with 12345 and 908.",
      "hint": "Base case is n == 0 returning 0. For each call, extract the least significant digit with n % 10 and recurse on n / 10.",
      "solutionCode": "public class Main {\n    public static int sumDigits(int n) {\n        if (n <= 0) return 0;\n        return (n % 10) + sumDigits(n / 10);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Sum of digits (12345): \" + sumDigits(12345));\n        System.out.println(\"Sum of digits (908): \" + sumDigits(908));\n    }\n}",
      "output": "Sum of digits (12345): 15\nSum of digits (908): 17",
      "explanation": "12345 is broken down into 5 + sumDigits(1234), which adds 4, 3, 2, and 1 during unwinding, producing 15 with zero loops."
    },
    {
      "id": "ex-rec-stack-4",
      "title": "Recursive Countdown and Countup (Dual Execution Phases)",
      "problemStatement": "Write a recursive method `countUpDown(int n)` that demonstrates winding and unwinding phases by printing 'Winding: ' + n before recursing, and 'Unwinding: ' + n after child recursion returns. Halts when n <= 0. In `main()`, call `countUpDown(3)`.",
      "hint": "Statements before the recursive call execute descending; statements after the call execute ascending.",
      "solutionCode": "public class Main {\n    public static void countUpDown(int n) {\n        if (n <= 0) return;\n        System.out.println(\"Winding: \" + n);\n        countUpDown(n - 1);\n        System.out.println(\"Unwinding: \" + n);\n    }\n\n    public static void main(String[] args) {\n        countUpDown(3);\n    }\n}",
      "output": "Winding: 3\nWinding: 2\nWinding: 1\nUnwinding: 1\nUnwinding: 2\nUnwinding: 3",
      "explanation": "Pre-call statements execute in forward order (3, 2, 1) during winding descent. Post-call statements execute in reverse LIFO order (1, 2, 3) as stack frames pop."
    },
    {
      "id": "ex-rec-stack-5",
      "title": "Fast Binary Exponentiation",
      "problemStatement": "Implement fast exponentiation `power(long base, int exp)` in O(log exp) time. If exp == 0, return 1; if exp is even, calculate half = power(base, exp / 2) and return half * half; if exp is odd, return base * power(base, exp - 1). In `main()`, compute 2^10 and 3^5.",
      "hint": "Store half = power(base, exp / 2) in a local variable so the recursive call is not duplicated.",
      "solutionCode": "public class Main {\n    public static long power(long base, int exp) {\n        if (exp == 0) return 1;\n        if (exp == 1) return base;\n        if (exp % 2 == 0) {\n            long half = power(base, exp / 2);\n            return half * half;\n        } else {\n            return base * power(base, exp - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"2^10 = \" + power(2, 10));\n        System.out.println(\"3^5 = \" + power(3, 5));\n    }\n}",
      "output": "2^10 = 1024\n3^5 = 243",
      "explanation": "Fast exponentiation cuts the problem size in half on even powers, achieving O(log exp) time complexity and requiring only 4-5 stack frames for 2^10."
    },
    {
      "id": "ex-rec-stack-6",
      "title": "Count Occurrences of a Target Digit",
      "problemStatement": "Implement a recursive method `countDigit(long n, int d)` that counts how many times a target digit d appears in the decimal representation of n. In `main()`, count digit 7 in 7071727 and digit 0 in 50050.",
      "hint": "Check if (n % 10 == d). Return (match ? 1 : 0) + countDigit(n / 10, d). Base case is n == 0.",
      "solutionCode": "public class Main {\n    public static int countDigit(long n, int d) {\n        if (n == 0) return 0;\n        int match = ((n % 10) == d) ? 1 : 0;\n        return match + countDigit(n / 10, d);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Count of 7 in 7071727: \" + countDigit(7071727L, 7));\n        System.out.println(\"Count of 0 in 50050: \" + countDigit(50050L, 0));\n    }\n}",
      "output": "Count of 7 in 7071727: 4\nCount of 0 in 50050: 3",
      "explanation": "The method inspects the last digit, checks if it equals target d, and adds the result to the recursive count of the remaining prefix (n / 10)."
    },
    {
      "id": "ex-rec-stack-7",
      "title": "Recursive Greatest Common Divisor (Euclidean Algorithm)",
      "problemStatement": "Implement `gcd(int a, int b)` using Euclidean recursion: if b == 0, return a; otherwise return gcd(b, a % b). In `main()`, compute and print the GCD of (48, 18), (101, 10), and (54, 24).",
      "hint": "The Euclidean algorithm reduces the problem by replacing (a, b) with (b, a % b) until remainder b becomes 0.",
      "solutionCode": "public class Main {\n    public static int gcd(int a, int b) {\n        if (b == 0) return a;\n        return gcd(b, a % b);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"GCD(48, 18) = \" + gcd(48, 18));\n        System.out.println(\"GCD(101, 10) = \" + gcd(101, 10));\n        System.out.println(\"GCD(54, 24) = \" + gcd(54, 24));\n    }\n}",
      "output": "GCD(48, 18) = 6\nGCD(101, 10) = 1\nGCD(54, 24) = 6",
      "explanation": "gcd(48, 18) -> gcd(18, 12) -> gcd(12, 6) -> gcd(6, 0) = 6. The algorithm computes the greatest common divisor in logarithmic steps."
    },
    {
      "id": "ex-rec-stack-8",
      "title": "Recursive Decimal to Hexadecimal Converter",
      "problemStatement": "Write a recursive method `toHex(int n)` that converts a non-negative integer into its hexadecimal string representation. In `main()`, test with 0, 10, 255, and 4094.",
      "hint": "Use '0123456789ABCDEF'.charAt(n % 16). If n < 16, return direct character string. Otherwise return toHex(n / 16) + charAt(n % 16).",
      "solutionCode": "public class Main {\n    private static final String HEX_CHARS = \"0123456789ABCDEF\";\n\n    public static String toHex(int n) {\n        if (n < 16) {\n            return String.valueOf(HEX_CHARS.charAt(n));\n        }\n        return toHex(n / 16) + HEX_CHARS.charAt(n % 16);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Hex of 0: \" + toHex(0));\n        System.out.println(\"Hex of 10: \" + toHex(10));\n        System.out.println(\"Hex of 255: \" + toHex(255));\n        System.out.println(\"Hex of 4094: \" + toHex(4094));\n    }\n}",
      "output": "Hex of 0: 0\nHex of 10: A\nHex of 255: FF\nHex of 4094: FFE",
      "explanation": "Higher-order hexadecimal digits are calculated first during the winding phase. On unwinding, characters append from left to right in correct hex order."
    },
    {
      "id": "ex-rec-stack-9",
      "title": "Call Stack Frame Depth Counter",
      "problemStatement": "Write a recursive method `measureDepth(int n, int currentDepth)` that prints 'Descending: depth = ' + currentDepth + ' (n=' + n + ')' on entry, detects when n == 1, prints 'Peak depth reached: ' + currentDepth, and prints 'Ascending: depth = ' + currentDepth on exit. In `main()`, call `measureDepth(5, 1)`.",
      "hint": "Pass depth + 1 to the recursive call. Print descending before the recursive call and ascending after it.",
      "solutionCode": "public class Main {\n    public static void measureDepth(int n, int currentDepth) {\n        System.out.println(\"Descending: depth = \" + currentDepth + \" (n=\" + n + \")\");\n        if (n <= 1) {\n            System.out.println(\"Peak depth reached: \" + currentDepth);\n            System.out.println(\"Ascending: depth = \" + currentDepth + \" (n=\" + n + \")\");\n            return;\n        }\n        measureDepth(n - 1, currentDepth + 1);\n        System.out.println(\"Ascending: depth = \" + currentDepth + \" (n=\" + n + \")\");\n    }\n\n    public static void main(String[] args) {\n        measureDepth(5, 1);\n    }\n}",
      "output": "Descending: depth = 1 (n=5)\nDescending: depth = 2 (n=4)\nDescending: depth = 3 (n=3)\nDescending: depth = 4 (n=2)\nDescending: depth = 5 (n=1)\nPeak depth reached: 5\nAscending: depth = 5 (n=1)\nAscending: depth = 4 (n=2)\nAscending: depth = 3 (n=3)\nAscending: depth = 2 (n=4)\nAscending: depth = 1 (n=5)",
      "explanation": "This exercise explicitly demonstrates activation record allocation on descent and deallocation on ascent, peaking at depth 5."
    },
    {
      "id": "ex-rec-stack-10",
      "title": "Hailstone Sequence (Collatz Conjecture) Length",
      "problemStatement": "Write a recursive method `collatzLength(long n)` that computes the number of transitions to reach 1: if n == 1 return 0; if n is even recurse on n / 2; if n is odd recurse on 3 * n + 1. In `main()`, compute steps for 6, 11, and 27.",
      "hint": "Add 1 to the result of the recursive call. Base case is n == 1 returning 0.",
      "solutionCode": "public class Main {\n    public static int collatzLength(long n) {\n        if (n <= 1) return 0;\n        if (n % 2 == 0) {\n            return 1 + collatzLength(n / 2);\n        } else {\n            return 1 + collatzLength(3 * n + 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Collatz steps for 6: \" + collatzLength(6));\n        System.out.println(\"Collatz steps for 11: \" + collatzLength(11));\n        System.out.println(\"Collatz steps for 27: \" + collatzLength(27));\n    }\n}",
      "output": "Collatz steps for 6: 8\nCollatz steps for 11: 14\nCollatz steps for 27: 111",
      "explanation": "Collatz sequence recursively computes step counts. Starting from 27, it traverses 111 recursive frames through complex peaks before unwinding to 0 at value 1."
    }
  ],
  "recursion-head-tail-tree": [
    {
      "id": "ex-rec-tail-1",
      "title": "Head vs Tail Recursion Print Sequencing",
      "problemStatement": "Implement `headPrint(int n)` which prints numbers from 1 to n using head recursion (work after recursive call), and `tailPrint(int n)` which prints numbers from n to 1 using tail recursion (work before recursive call). In `main()`, test both with n = 4.",
      "hint": "headPrint calls headPrint(n - 1) before printing. tailPrint prints n before calling tailPrint(n - 1).",
      "solutionCode": "public class Main {\n    public static void headPrint(int n) {\n        if (n <= 0) return;\n        headPrint(n - 1);\n        System.out.print(n + \" \");\n    }\n\n    public static void tailPrint(int n) {\n        if (n <= 0) return;\n        System.out.print(n + \" \");\n        tailPrint(n - 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Head (Ascending):  \");\n        headPrint(4);\n        System.out.println();\n\n        System.out.print(\"Tail (Descending): \");\n        tailPrint(4);\n        System.out.println();\n    }\n}",
      "output": "Head (Ascending):  1 2 3 4 \nTail (Descending): 4 3 2 1 ",
      "explanation": "Head recursion executes printing on the return journey (unwinding phase) giving 1 2 3 4. Tail recursion prints on entry (winding phase) giving 4 3 2 1."
    },
    {
      "id": "ex-rec-tail-2",
      "title": "Tail-Recursive Factorial with Accumulator",
      "problemStatement": "Implement a tail-recursive factorial helper `factTail(int n, long acc)` and public facade `factorial(int n)` that computes n! using the accumulator pattern. In `main()`, calculate 5! and 6!.",
      "hint": "The recursive call must be 'return factTail(n - 1, n * acc);'. Base case is n <= 1 returning acc.",
      "solutionCode": "public class Main {\n    public static long factTail(int n, long acc) {\n        if (n <= 1) return acc;\n        return factTail(n - 1, n * acc);\n    }\n\n    public static long factorial(int n) {\n        return factTail(n, 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Factorial 5! = \" + factorial(5));\n        System.out.println(\"Factorial 6! = \" + factorial(6));\n    }\n}",
      "output": "Factorial 5! = 120\nFactorial 6! = 720",
      "explanation": "By threading the running product into parameter acc, the recursive call is the absolute final action. When base case n=1 is reached, acc holds 120, which is returned without any pending multiplications."
    },
    {
      "id": "ex-rec-tail-3",
      "title": "Tail-Recursive Fibonacci with Dual Accumulators",
      "problemStatement": "Implement `fibTail(int n, long a, long b)` and public wrapper `fib(int n)` that computes the N-th Fibonacci number in O(N) linear time using two accumulator parameters. In `main()`, print the Fibonacci sequence for n = 0 through 8.",
      "hint": "Base cases: if n == 0 return a; if n == 1 return b. Recursive step: return fibTail(n - 1, b, a + b); initialized with a=0, b=1.",
      "solutionCode": "public class Main {\n    public static long fibTail(int n, long a, long b) {\n        if (n == 0) return a;\n        if (n == 1) return b;\n        return fibTail(n - 1, b, a + b);\n    }\n\n    public static long fib(int n) {\n        return fibTail(n, 0, 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Fibonacci sequence: \");\n        for (int i = 0; i <= 8; i++) {\n            System.out.print(fib(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
      "output": "Fibonacci sequence: 0 1 1 2 3 5 8 13 21 ",
      "explanation": "Dual accumulators a and b track the two most recent Fibonacci values, eliminating overlapping subproblems and reducing runtime from O(2^N) to O(N)."
    },
    {
      "id": "ex-rec-tail-4",
      "title": "Manual Tail-Call Elimination into Iterative Loop",
      "problemStatement": "Implement `sumTail(int n, long acc)` and its mechanically converted iterative equivalent `sumIterative(int n)` that uses a while loop to achieve O(1) stack space. In `main()`, verify both methods compute the exact same sum for n = 1000.",
      "hint": "Convert 'acc = acc + n; n = n - 1;' into a while (n > 0) loop.",
      "solutionCode": "public class Main {\n    public static long sumTail(int n, long acc) {\n        if (n <= 0) return acc;\n        return sumTail(n - 1, acc + n);\n    }\n\n    public static long sumIterative(int n) {\n        long acc = 0;\n        while (n > 0) {\n            acc += n;\n            n--;\n        }\n        return acc;\n    }\n\n    public static void main(String[] args) {\n        int n = 1000;\n        long r1 = sumTail(n, 0);\n        long r2 = sumIterative(n);\n        System.out.println(\"Tail Rec Sum: \" + r1);\n        System.out.println(\"Iterative Sum: \" + r2);\n        System.out.println(\"Match verified: \" + (r1 == r2));\n    }\n}",
      "output": "Tail Rec Sum: 500500\nIterative Sum: 500500\nMatch verified: true",
      "explanation": "Mechanical tail-call elimination transforms recursive parameter updates into variable reassignments in a while loop, guaranteeing zero stack overflow risk in Java."
    },
    {
      "id": "ex-rec-tail-5",
      "title": "Tree Recursion Invocation Counter",
      "problemStatement": "Write a recursive Fibonacci method `fibTree(int n)` that tracks the total number of method calls using a static integer variable `counter`. In `main()`, compute `fibTree(6)` and print the result and total recursive calls made.",
      "hint": "Increment counter on entry. Base cases are n <= 0 returning 0 and n == 1 returning 1.",
      "solutionCode": "public class Main {\n    public static int counter = 0;\n\n    public static int fibTree(int n) {\n        counter++;\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibTree(n - 1) + fibTree(n - 2);\n    }\n\n    public static void main(String[] args) {\n        counter = 0;\n        int ans = fibTree(6);\n        System.out.println(\"Fib(6) = \" + ans);\n        System.out.println(\"Total recursive calls: \" + counter);\n    }\n}",
      "output": "Fib(6) = 8\nTotal recursive calls: 25",
      "explanation": "To compute Fib(6)=8, naive tree recursion makes 25 distinct function invocations, illustrating the exponential O(2^N) branching of tree recursion without memoization."
    },
    {
      "id": "ex-rec-tail-6",
      "title": "Tail-Recursive Array Sum with Accumulator",
      "problemStatement": "Implement `sumArrayTail(int[] arr, int index, int acc)` that sums all elements in an integer array in tail position. In `main()`, calculate the sum of {4, 8, 15, 16, 23, 42}.",
      "hint": "Base case is index == arr.length returning acc. Recursive step passes acc + arr[index] with index + 1.",
      "solutionCode": "public class Main {\n    public static int sumArrayTail(int[] arr, int index, int acc) {\n        if (index == arr.length) return acc;\n        return sumArrayTail(arr, index + 1, acc + arr[index]);\n    }\n\n    public static void main(String[] args) {\n        int[] data = {4, 8, 15, 16, 23, 42};\n        int total = sumArrayTail(data, 0, 0);\n        System.out.println(\"Array sum (tail): \" + total);\n    }\n}",
      "output": "Array sum (tail): 108",
      "explanation": "Each recursive call eagerly adds the current element into accumulator acc, executing the recursive call in pure tail position."
    },
    {
      "id": "ex-rec-tail-7",
      "title": "Mutual Recursion Parity Checker",
      "problemStatement": "Implement `isEven(int n)` and `isOdd(int n)` using mutual recursion: isEven(0) is true, isEven(n) calls isOdd(n - 1); isOdd(0) is false, isOdd(n) calls isEven(n - 1). In `main()`, test 0, 7, 10, and 15.",
      "hint": "Use Math.abs(n) to handle non-negative parity.",
      "solutionCode": "public class Main {\n    public static boolean isEven(int n) {\n        if (n == 0) return true;\n        return isOdd(n - 1);\n    }\n\n    public static boolean isOdd(int n) {\n        if (n == 0) return false;\n        return isEven(n - 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"isEven(0): \" + isEven(0));\n        System.out.println(\"isEven(7): \" + isEven(7));\n        System.out.println(\"isOdd(10): \" + isOdd(10));\n        System.out.println(\"isOdd(15): \" + isOdd(15));\n    }\n}",
      "output": "isEven(0): true\nisEven(7): false\nisOdd(10): false\nisOdd(15): true",
      "explanation": "Demonstrates mutual recursion with alternating stack frames ([isEven] -> [isOdd] -> [isEven]), terminating cleanly at base case 0."
    },
    {
      "id": "ex-rec-tail-8",
      "title": "Tail-Recursive String Length Calculator",
      "problemStatement": "Write a tail-recursive method `lengthTail(String s, int acc)` that calculates the length of a string without using String.length(). Base case checks if s.isEmpty(). In `main()`, calculate lengths of \"\", \"Java\", and \"Recursion\".",
      "hint": "Recursive step: return lengthTail(s.substring(1), acc + 1); with base case s.isEmpty() returning acc.",
      "solutionCode": "public class Main {\n    public static int lengthTail(String s, int acc) {\n        if (s == null || s.isEmpty()) return acc;\n        return lengthTail(s.substring(1), acc + 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Length of \"\": \" + lengthTail(\"\", 0));\n        System.out.println(\"Length of \"Java\": \" + lengthTail(\"Java\", 0));\n        System.out.println(\"Length of \"Recursion\": \" + lengthTail(\"Recursion\", 0));\n    }\n}",
      "output": "Length of \"\": 0\nLength of \"Java\": 4\nLength of \"Recursion\": 9",
      "explanation": "The tail call advances down the string, accumulating character count into acc until the empty string base case returns the total."
    },
    {
      "id": "ex-rec-tail-9",
      "title": "Tree Recursion Catalan Number Calculator",
      "problemStatement": "Write a recursive method `catalan(int n)` that evaluates Catalan numbers using the summation formula C(0)=1, C(n) = sum_{i=0}^{n-1} C(i) * C(n-1-i). In `main()`, print Catalan numbers for n = 0 through 5.",
      "hint": "Base case is n <= 1 returning 1. Use a loop inside the method from i=0 to n-1 summing catalan(i) * catalan(n - 1 - i).",
      "solutionCode": "public class Main {\n    public static int catalan(int n) {\n        if (n <= 1) return 1;\n        int sum = 0;\n        for (int i = 0; i < n; i++) {\n            sum += catalan(i) * catalan(n - 1 - i);\n        }\n        return sum;\n    }\n\n    public static void main(String[] args) {\n        System.out.print(\"Catalan numbers: \");\n        for (int i = 0; i <= 5; i++) {\n            System.out.print(catalan(i) + \" \");\n        }\n        System.out.println();\n    }\n}",
      "output": "Catalan numbers: 1 1 2 5 14 42 ",
      "explanation": "Catalan numbers count valid parentheses expressions, BST topologies, and polygon triangulations using multi-way tree recursion."
    },
    {
      "id": "ex-rec-tail-10",
      "title": "Tail-Recursive vs Iterative GCD Verification",
      "problemStatement": "Implement `gcdTail(int a, int b)` and `gcdIterative(int a, int b)` and demonstrate their equivalence. In `main()`, test with (252, 105) and (462, 1071).",
      "hint": "Euclidean GCD is naturally tail-recursive. In while loop: while (b != 0) { int t = b; b = a % b; a = t; } return a;",
      "solutionCode": "public class Main {\n    public static int gcdTail(int a, int b) {\n        if (b == 0) return a;\n        return gcdTail(b, a % b);\n    }\n\n    public static int gcdIterative(int a, int b) {\n        while (b != 0) {\n            int temp = b;\n            b = a % b;\n            a = temp;\n        }\n        return a;\n    }\n\n    public static void main(String[] args) {\n        int a1 = 252, b1 = 105;\n        int a2 = 462, b2 = 1071;\n        System.out.println(\"GCD(\" + a1 + \", \" + b1 + \") -> Tail: \" + gcdTail(a1, b1) + \", Iterative: \" + gcdIterative(a1, b1));\n        System.out.println(\"GCD(\" + a2 + \", \" + b2 + \") -> Tail: \" + gcdTail(a2, b2) + \", Iterative: \" + gcdIterative(a2, b2));\n    }\n}",
      "output": "GCD(252, 105) -> Tail: 21, Iterative: 21\nGCD(462, 1071) -> Tail: 21, Iterative: 21",
      "explanation": "Demonstrates the direct one-to-one mapping between a tail-recursive function and its iterative while loop counterpart."
    }
  ],
  "recursion-arrays-and-strings": [
    {
      "id": "ex-rec-arr-1",
      "title": "Recursive Linear Search",
      "problemStatement": "Implement `linearSearch(int[] arr, int target, int index)` returning the index of target or -1 if not found. In `main()`, search for 35 and 99 in {10, 20, 35, 40, 50}.",
      "hint": "Base cases: if index >= arr.length return -1; if arr[index] == target return index.",
      "solutionCode": "public class Main {\n    public static int linearSearch(int[] arr, int target, int index) {\n        if (arr == null || index >= arr.length) return -1;\n        if (arr[index] == target) return index;\n        return linearSearch(arr, target, index + 1);\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 35, 40, 50};\n        System.out.println(\"Search 35 -> index: \" + linearSearch(nums, 35, 0));\n        System.out.println(\"Search 99 -> index: \" + linearSearch(nums, 99, 0));\n    }\n}",
      "output": "Search 35 -> index: 2\nSearch 99 -> index: -1",
      "explanation": "Index navigation walks through the array element-by-element without copying or modifying the underlying array."
    },
    {
      "id": "ex-rec-arr-2",
      "title": "Recursive Array Maximum (Divide-and-Conquer)",
      "problemStatement": "Implement `findMax(int[] arr, int low, int high)` using divide-and-conquer: split array into left and right halves and return Math.max(leftMax, rightMax). In `main()`, test on {14, 82, 3, 99, 45, 61, 7}.",
      "hint": "Base case is low == high returning arr[low]. Calculate mid = low + (high - low) / 2.",
      "solutionCode": "public class Main {\n    public static int findMax(int[] arr, int low, int high) {\n        if (low == high) return arr[low];\n        int mid = low + (high - low) / 2;\n        int leftMax = findMax(arr, low, mid);\n        int rightMax = findMax(arr, mid + 1, high);\n        return Math.max(leftMax, rightMax);\n    }\n\n    public static void main(String[] args) {\n        int[] data = {14, 82, 3, 99, 45, 61, 7};\n        int maxVal = findMax(data, 0, data.length - 1);\n        System.out.println(\"Maximum element: \" + maxVal);\n    }\n}",
      "output": "Maximum element: 99",
      "explanation": "Divide-and-conquer finds the maximum in O(N) comparisons while keeping maximum call stack depth strictly bounded to O(log N)."
    },
    {
      "id": "ex-rec-arr-3",
      "title": "Recursive Array In-Place Reversal",
      "problemStatement": "Implement `reverse(int[] arr, int left, int right)` that reverses an array in-place using two pointers without extra array allocations. In `main()`, reverse {1, 2, 3, 4, 5} and print.",
      "hint": "Base case: left >= right. Swap arr[left] and arr[right], then recurse with left + 1, right - 1.",
      "solutionCode": "public class Main {\n    public static void reverse(int[] arr, int left, int right) {\n        if (left >= right) return;\n        int temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        reverse(arr, left + 1, right - 1);\n    }\n\n    public static void main(String[] args) {\n        int[] numbers = {1, 2, 3, 4, 5};\n        reverse(numbers, 0, numbers.length - 1);\n        System.out.print(\"Reversed: \");\n        for (int num : numbers) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
      "output": "Reversed: 5 4 3 2 1 ",
      "explanation": "The two-pointer technique swaps mirror elements and converges inward toward the middle, modifying the original array in place."
    },
    {
      "id": "ex-rec-arr-4",
      "title": "Recursive Binary Search on Sorted Array",
      "problemStatement": "Implement `binarySearch(int[] arr, int target, int low, int high)` with overflow-safe midpoint calculation. In `main()`, search for 23 and 50 in {2, 5, 8, 12, 16, 23, 38, 56}.",
      "hint": "If low > high return -1. mid = low + (high - low) / 2. Recurse left or right based on comparison with arr[mid].",
      "solutionCode": "public class Main {\n    public static int binarySearch(int[] arr, int target, int low, int high) {\n        if (low > high) return -1;\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] > target) {\n            return binarySearch(arr, target, low, mid - 1);\n        } else {\n            return binarySearch(arr, target, mid + 1, high);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56};\n        System.out.println(\"Search 23: index \" + binarySearch(sorted, 23, 0, sorted.length - 1));\n        System.out.println(\"Search 50: index \" + binarySearch(sorted, 50, 0, sorted.length - 1));\n    }\n}",
      "output": "Search 23: index 5\nSearch 50: index -1",
      "explanation": "Binary search halves the search space at every step, finding elements in O(log N) time with at most 3-4 stack frames for 8 elements."
    },
    {
      "id": "ex-rec-arr-5",
      "title": "Recursive Palindrome Verification (Two Pointers)",
      "problemStatement": "Implement `isPalindrome(String s, int left, int right)` that checks if string s is a palindrome without creating substrings. In `main()`, test 'racecar', 'step on no pets', and 'hello'.",
      "hint": "Base cases: left >= right returns true; s.charAt(left) != s.charAt(right) returns false. Otherwise recurse with left + 1, right - 1.",
      "solutionCode": "public class Main {\n    public static boolean isPalindrome(String s, int left, int right) {\n        if (left >= right) return true;\n        if (s.charAt(left) != s.charAt(right)) return false;\n        return isPalindrome(s, left + 1, right - 1);\n    }\n\n    public static void main(String[] args) {\n        String s1 = \"racecar\";\n        String s2 = \"step on no pets\";\n        String s3 = \"hello\";\n\n        System.out.println(\"\\\"\" + s1 + \"\\\" is palindrome: \" + isPalindrome(s1, 0, s1.length() - 1));\n        System.out.println(\"\\\"\" + s2 + \"\\\" is palindrome: \" + isPalindrome(s2, 0, s2.length() - 1));\n        System.out.println(\"\\\"\" + s3 + \"\\\" is palindrome: \" + isPalindrome(s3, 0, s3.length() - 1));\n    }\n}",
      "output": "\"racecar\" is palindrome: true\n\"step on no pets\" is palindrome: true\n\"hello\" is palindrome: false",
      "explanation": "Two-pointer index inspection checks character pairs from outer bounds toward center without allocating temporary String objects on the heap."
    },
    {
      "id": "ex-rec-arr-6",
      "title": "Recursive String Character Removal",
      "problemStatement": "Write a recursive method `removeChar(String s, char target, int index)` that returns a new string with all occurrences of target removed, without loops. In `main()`, remove 'a' from 'abracadabra'.",
      "hint": "If index == s.length() return \"\". Check current char: if target, return rest; else return current + rest.",
      "solutionCode": "public class Main {\n    public static String removeChar(String s, char target, int index) {\n        if (index >= s.length()) return \"\";\n        char current = s.charAt(index);\n        String rest = removeChar(s, target, index + 1);\n        return (current == target) ? rest : current + rest;\n    }\n\n    public static void main(String[] args) {\n        String original = \"abracadabra\";\n        String cleaned = removeChar(original, 'a', 0);\n        System.out.println(\"Original: \" + original);\n        System.out.println(\"Without 'a': \" + cleaned);\n    }\n}",
      "output": "Original: abracadabra\nWithout 'a': brcdbr",
      "explanation": "Recursion filters out the target character during stack unwinding, appending non-matching characters in original sequence."
    },
    {
      "id": "ex-rec-arr-7",
      "title": "Recursive Array Sorted Check",
      "problemStatement": "Implement `isSorted(int[] arr, int index)` that verifies whether an array is strictly in non-decreasing order. In `main()`, test {1, 3, 5, 7, 9} and {1, 5, 3, 7}.",
      "hint": "Base case: if index >= arr.length - 1 return true. If arr[index] > arr[index + 1] return false. Otherwise recurse on index + 1.",
      "solutionCode": "public class Main {\n    public static boolean isSorted(int[] arr, int index) {\n        if (arr == null || index >= arr.length - 1) return true;\n        if (arr[index] > arr[index + 1]) return false;\n        return isSorted(arr, index + 1);\n    }\n\n    public static void main(String[] args) {\n        int[] a1 = {1, 3, 5, 7, 9};\n        int[] a2 = {1, 5, 3, 7};\n        System.out.println(\"{1, 3, 5, 7, 9} is sorted: \" + isSorted(a1, 0));\n        System.out.println(\"{1, 5, 3, 7} is sorted: \" + isSorted(a2, 0));\n    }\n}",
      "output": "{1, 3, 5, 7, 9} is sorted: true\n{1, 5, 3, 7} is sorted: false",
      "explanation": "Linear recursion checks consecutive pairs. As soon as an inversion arr[index] > arr[index+1] is detected, false is returned immediately."
    },
    {
      "id": "ex-rec-arr-8",
      "title": "Recursive Subsequence Checker",
      "problemStatement": "Implement `isSubsequence(String s, String t, int i, int j)` checking whether string s is a subsequence of string t. In `main()`, test 'ace' in 'abcde' and 'aec' in 'abcde'.",
      "hint": "If i == s.length() return true. If j == t.length() return false. If s.charAt(i) == t.charAt(j) recurse (i+1, j+1), else (i, j+1).",
      "solutionCode": "public class Main {\n    public static boolean isSubsequence(String s, String t, int i, int j) {\n        if (i == s.length()) return true;\n        if (j == t.length()) return false;\n        if (s.charAt(i) == t.charAt(j)) {\n            return isSubsequence(s, t, i + 1, j + 1);\n        } else {\n            return isSubsequence(s, t, i, j + 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        String t = \"abcde\";\n        System.out.println(\"\"ace\" in \"abcde\": \" + isSubsequence(\"ace\", t, 0, 0));\n        System.out.println(\"\"aec\" in \"abcde\": \" + isSubsequence(\"aec\", t, 0, 0));\n    }\n}",
      "output": "\"ace\" in \"abcde\": true\n\"aec\" in \"abcde\": false",
      "explanation": "Matches characters sequentially: when characters match, both pointers advance; otherwise only the target pointer j advances."
    },
    {
      "id": "ex-rec-arr-9",
      "title": "Recursive Array Prefix Sum Accumulator",
      "problemStatement": "Implement `computePrefix(int[] arr, int[] prefix, int index, int runningSum)` that populates prefix array where prefix[i] = sum(arr[0]..arr[i]). In `main()`, compute prefix sums for {2, 4, 6, 8, 10}.",
      "hint": "Base case is index == arr.length. Calculate sum = runningSum + arr[index], store in prefix[index], and recurse on index + 1.",
      "solutionCode": "public class Main {\n    public static void computePrefix(int[] arr, int[] prefix, int index, int runningSum) {\n        if (index == arr.length) return;\n        int currentSum = runningSum + arr[index];\n        prefix[index] = currentSum;\n        computePrefix(arr, prefix, index + 1, currentSum);\n    }\n\n    public static void main(String[] args) {\n        int[] original = {2, 4, 6, 8, 10};\n        int[] prefix = new int[original.length];\n        computePrefix(original, prefix, 0, 0);\n\n        System.out.print(\"Original: \");\n        for (int v : original) System.out.print(v + \" \");\n        System.out.println();\n\n        System.out.print(\"Prefix:   \");\n        for (int v : prefix) System.out.print(v + \" \");\n        System.out.println();\n    }\n}",
      "output": "Original: 2 4 6 8 10 \nPrefix:   2 6 12 20 30 ",
      "explanation": "Uses accumulator parameter runningSum to calculate running prefix totals forward down the stack in O(N) time."
    },
    {
      "id": "ex-rec-arr-10",
      "title": "Divide-and-Conquer Mini Merge Sort",
      "problemStatement": "Implement recursive `mergeSort(int[] arr, int l, int r)` with an auxiliary merge helper. In `main()`, sort {38, 27, 43, 3, 9, 82, 10} and print the result.",
      "hint": "Base case is l >= r. Split at mid = l + (r - l) / 2. Sort left, sort right, then merge the two sorted halves.",
      "solutionCode": "public class Main {\n    public static void merge(int[] arr, int l, int m, int r) {\n        int n1 = m - l + 1;\n        int n2 = r - m;\n        int[] left = new int[n1];\n        int[] right = new int[n2];\n        for (int i = 0; i < n1; i++) left[i] = arr[l + i];\n        for (int j = 0; j < n2; j++) right[j] = arr[m + 1 + j];\n\n        int i = 0, j = 0, k = l;\n        while (i < n1 && j < n2) {\n            if (left[i] <= right[j]) arr[k++] = left[i++];\n            else arr[k++] = right[j++];\n        }\n        while (i < n1) arr[k++] = left[i++];\n        while (j < n2) arr[k++] = right[j++];\n    }\n\n    public static void mergeSort(int[] arr, int l, int r) {\n        if (l >= r) return;\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {38, 27, 43, 3, 9, 82, 10};\n        mergeSort(arr, 0, arr.length - 1);\n        System.out.print(\"Sorted array: \");\n        for (int n : arr) System.out.print(n + \" \");\n        System.out.println();\n    }\n}",
      "output": "Sorted array: 3 9 10 27 38 43 82 ",
      "explanation": "Divide-and-conquer divides array into halves down to single-element bases cases, then merges sorted subarrays back together in O(N log N) time."
    }
  ],
  "recursion-backtracking-foundations": [
    {
      "id": "ex-rec-back-1",
      "title": "Generate All Binary Strings of Length N",
      "problemStatement": "Implement `generateBinary(int n, StringBuilder sb, List<String> result)` using the Choose-Explore-Unchoose paradigm to generate all 2^N binary strings of length N. In `main()`, generate and print all strings of length 3.",
      "hint": "At each decision: append '0', recurse, delete last char; append '1', recurse, delete last char.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void generateBinary(int n, StringBuilder sb, List<String> result) {\n        if (sb.length() == n) {\n            result.add(sb.toString());\n            return;\n        }\n        // Choose '0'\n        sb.append('0');\n        generateBinary(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1); // Unchoose\n\n        // Choose '1'\n        sb.append('1');\n        generateBinary(n, sb, result);\n        sb.deleteCharAt(sb.length() - 1); // Unchoose\n    }\n\n    public static void main(String[] args) {\n        List<String> res = new ArrayList<>();\n        generateBinary(3, new StringBuilder(), res);\n        System.out.println(\"Binary strings of length 3: \" + res);\n    }\n}",
      "output": "Binary strings of length 3: [000, 001, 010, 011, 100, 101, 110, 111]",
      "explanation": "The canonical binary tree exploration branches on '0' and '1', restoring the StringBuilder state after each recursive descent."
    },
    {
      "id": "ex-rec-back-2",
      "title": "Power Set (All Subsets of an Array)",
      "problemStatement": "Implement `subsets(int[] nums, int start, List<Integer> current, List<List<Integer>> result)` that generates all 2^N subsets using defensive copying. In `main()`, generate subsets for {1, 2, 3}.",
      "hint": "Always do result.add(new ArrayList<>(current)) at entry. Loop from start to nums.length - 1: add, recurse with i + 1, remove.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void subsets(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {\n        result.add(new ArrayList<>(current));\n        for (int i = start; i < nums.length; i++) {\n            current.add(nums[i]);\n            subsets(nums, i + 1, current, result);\n            current.remove(current.size() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> result = new ArrayList<>();\n        subsets(nums, 0, new ArrayList<>(), result);\n        System.out.println(\"Total subsets: \" + result.size());\n        System.out.println(\"Subsets: \" + result);\n    }\n}",
      "output": "Total subsets: 8\nSubsets: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]",
      "explanation": "Generates all 2^3 = 8 subsets by systematically adding each element, exploring sub-combinations, and popping during backtracking."
    },
    {
      "id": "ex-rec-back-3",
      "title": "Permutations of an Array",
      "problemStatement": "Implement `permute(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result)` to generate all N! permutations. In `main()`, generate permutations of {1, 2, 3}.",
      "hint": "Base case: current.size() == nums.length. Iterate i=0..nums.length-1, skipping if used[i]. Mark used, add, recurse, remove, unmark used.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void permute(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {\n        if (current.size() == nums.length) {\n            result.add(new ArrayList<>(current));\n            return;\n        }\n        for (int i = 0; i < nums.length; i++) {\n            if (used[i]) continue;\n            used[i] = true;\n            current.add(nums[i]);\n            permute(nums, used, current, result);\n            current.remove(current.size() - 1);\n            used[i] = false;\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3};\n        List<List<Integer>> result = new ArrayList<>();\n        permute(nums, new boolean[nums.length], new ArrayList<>(), result);\n        System.out.println(\"Total permutations: \" + result.size());\n        System.out.println(result);\n    }\n}",
      "output": "Total permutations: 6\n[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]",
      "explanation": "Permutation generation explores all 3! = 6 orderings using a boolean used array to keep track of selected candidates."
    },
    {
      "id": "ex-rec-back-4",
      "title": "Combination Sum with Target Pruning",
      "problemStatement": "Implement `combinationSum(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> result)` where candidates can be reused and sum equals target. In `main()`, test on {2, 3, 6, 7} with target 7.",
      "hint": "If remain == 0 record solution. Loop from start: if candidates[i] > remain skip. Recurse with remain - candidates[i] and i (reuse allowed).",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void backtrack(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> result) {\n        if (remain == 0) {\n            result.add(new ArrayList<>(path));\n            return;\n        }\n        for (int i = start; i < candidates.length; i++) {\n            if (candidates[i] > remain) break;\n            path.add(candidates[i]);\n            backtrack(candidates, remain - candidates[i], i, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        int[] candidates = {2, 3, 6, 7};\n        Arrays.sort(candidates);\n        List<List<Integer>> result = new ArrayList<>();\n        backtrack(candidates, 7, 0, new ArrayList<>(), result);\n        System.out.println(\"Combinations summing to 7: \" + result);\n    }\n}",
      "output": "Combinations summing to 7: [[2, 2, 3], [7]]",
      "explanation": "Pruning candidate elements larger than remaining target prevents exploring non-viable branches, finding combinations in minimal time."
    },
    {
      "id": "ex-rec-back-5",
      "title": "Generate Valid Parentheses Combinations",
      "problemStatement": "Implement `generateParentheses(int n, int open, int close, StringBuilder sb, List<String> result)` using pruning constraints open < n and close < open. In `main()`, generate all combinations for N = 3.",
      "hint": "Append '(', recurse with open + 1, backtrack. If close < open, append ')', recurse with close + 1, backtrack.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void backtrack(int n, int open, int close, StringBuilder sb, List<String> result) {\n        if (sb.length() == 2 * n) {\n            result.add(sb.toString());\n            return;\n        }\n        if (open < n) {\n            sb.append('(');\n            backtrack(n, open + 1, close, sb, result);\n            sb.deleteCharAt(sb.length() - 1);\n        }\n        if (close < open) {\n            sb.append(')');\n            backtrack(n, open, close + 1, sb, result);\n            sb.deleteCharAt(sb.length() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<String> result = new ArrayList<>();\n        backtrack(3, 0, 0, new StringBuilder(), result);\n        System.out.println(\"Valid parentheses (N=3): \" + result);\n    }\n}",
      "output": "Valid parentheses (N=3): [((())), (()()), (())(), ()(()), ()()()]",
      "explanation": "Constraint bounding (close < open) ensures only mathematically balanced strings are generated, matching the 3rd Catalan number (5 combinations)."
    },
    {
      "id": "ex-rec-back-6",
      "title": "Grid Maze Pathfinding (All Paths in 3x3 Grid)",
      "problemStatement": "Write a recursive backtracking method `findPaths(int r, int c, int rows, int cols, String path, List<String> result)` that finds all paths moving Down ('D') and Right ('R') in a 3x3 grid from (0,0) to (2,2). In `main()`, print all discovered paths.",
      "hint": "Base case: r == rows - 1 && c == cols - 1. Recurse down if r + 1 < rows; recurse right if c + 1 < cols.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void findPaths(int r, int c, int rows, int cols, String path, List<String> result) {\n        if (r == rows - 1 && c == cols - 1) {\n            result.add(path);\n            return;\n        }\n        if (r + 1 < rows) {\n            findPaths(r + 1, c, rows, cols, path + \"D\", result);\n        }\n        if (c + 1 < cols) {\n            findPaths(r, c + 1, rows, cols, path + \"R\", result);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<String> paths = new ArrayList<>();\n        findPaths(0, 0, 3, 3, \"\", paths);\n        System.out.println(\"Paths in 3x3 grid: \" + paths);\n    }\n}",
      "output": "Paths in 3x3 grid: [DDRR, DRDR, DRRD, RDDR, RDRD, RRDD]",
      "explanation": "Depth-first maze exploration branches Down first then Right, finding all 6 distinct paths to reach the destination in a 3x3 grid."
    },
    {
      "id": "ex-rec-back-7",
      "title": "Letter Combinations of a Phone Number",
      "problemStatement": "Implement `letterCombinations(String digits, int index, StringBuilder sb, List<String> result)` that maps telephone keypad digits (2-9) to letters and generates all combinations. In `main()`, test with digits '23'.",
      "hint": "Use a static array MAPPING = {\"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"}. Base case is index == digits.length().",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    private static final String[] MAPPING = {\n        \"\", \"\", \"abc\", \"def\", \"ghi\", \"jkl\", \"mno\", \"pqrs\", \"tuv\", \"wxyz\"\n    };\n\n    public static void backtrack(String digits, int index, StringBuilder sb, List<String> result) {\n        if (index == digits.length()) {\n            result.add(sb.toString());\n            return;\n        }\n        String letters = MAPPING[digits.charAt(index) - '0'];\n        for (char ch : letters.toCharArray()) {\n            sb.append(ch);\n            backtrack(digits, index + 1, sb, result);\n            sb.deleteCharAt(sb.length() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<String> res = new ArrayList<>();\n        backtrack(\"23\", 0, new StringBuilder(), res);\n        System.out.println(\"Keypad combinations for \\\"23\\\": \" + res);\n    }\n}",
      "output": "Keypad combinations for \"23\": [ad, ae, af, bd, be, bf, cd, ce, cf]",
      "explanation": "Backtracking iterates over candidate letters for each digit, building all 3 x 3 = 9 possible string representations."
    },
    {
      "id": "ex-rec-back-8",
      "title": "Combinations of Size K Summing to N (Combination Sum III)",
      "problemStatement": "Implement `combinationSum3(int k, int n, int start, List<Integer> path, List<List<Integer>> result)` to find all combinations of k numbers chosen from 1 to 9 that sum to n without duplicates. In `main()`, test (k=3, n=7) and (k=3, n=9).",
      "hint": "Base case: path.size() == k. If n == 0, record copy. Prune: if i > n, break loop.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void backtrack(int k, int n, int start, List<Integer> path, List<List<Integer>> result) {\n        if (path.size() == k) {\n            if (n == 0) {\n                result.add(new ArrayList<>(path));\n            }\n            return;\n        }\n        for (int i = start; i <= 9; i++) {\n            if (i > n) break; // Pruning\n            path.add(i);\n            backtrack(k, n - i, i + 1, path, result);\n            path.remove(path.size() - 1);\n        }\n    }\n\n    public static void main(String[] args) {\n        List<List<Integer>> res1 = new ArrayList<>();\n        backtrack(3, 7, 1, new ArrayList<>(), res1);\n        System.out.println(\"k=3, n=7: \" + res1);\n\n        List<List<Integer>> res2 = new ArrayList<>();\n        backtrack(3, 9, 1, new ArrayList<>(), res2);\n        System.out.println(\"k=3, n=9: \" + res2);\n    }\n}",
      "output": "k=3, n=7: [[1, 2, 4]]\nk=3, n=9: [[1, 2, 6], [1, 3, 5], [2, 3, 4]]",
      "explanation": "Pruning when candidate i > n terminates fruitless searches early, ensuring each combination uses unique digits strictly in ascending order."
    },
    {
      "id": "ex-rec-back-9",
      "title": "Defensive Copying vs Mutable Reference Verification",
      "problemStatement": "Demonstrate the critical difference between defensive copying and referencing in backtracking: populate `good` with `new ArrayList<>(cur)` and `bad` with `cur`. In `main()`, print both lists after backtracking completes to show why defensive copying is required.",
      "hint": "Populate both lists during exploration: cur.add(1), cur.add(2). In unwinding, cur.remove(...) resets the list.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<List<Integer>> good = new ArrayList<>();\n        List<List<Integer>> bad = new ArrayList<>();\n        List<Integer> cur = new ArrayList<>();\n\n        // Step 1: add 1\n        cur.add(1);\n        good.add(new ArrayList<>(cur));\n        bad.add(cur);\n\n        // Step 2: add 2\n        cur.add(2);\n        good.add(new ArrayList<>(cur));\n        bad.add(cur);\n\n        // Backtracking unwind: remove elements\n        cur.remove(cur.size() - 1);\n        cur.remove(cur.size() - 1);\n\n        System.out.println(\"Correct (defensive copy): \" + good);\n        System.out.println(\"Buggy (no copy): \" + bad);\n    }\n}",
      "output": "Correct (defensive copy): [[1], [1, 2]]\nBuggy (no copy): [[], []]",
      "explanation": "Without defensive copying, the 'bad' list holds references to the single mutated object, which ends up completely empty after unwinding completes."
    },
    {
      "id": "ex-rec-back-10",
      "title": "Four Queens (4-Queens) Backtracking Solver",
      "problemStatement": "Implement a 4-Queens backtracking solver `placeQueens(int row, int[] queens, List<List<Integer>> solutions)` that places 4 non-attacking queens on a 4x4 chessboard. In `main()`, print total solutions and each solution board configuration.",
      "hint": "queens[r] stores the column for row r. Check conflicts: queens[i] == col || Math.abs(queens[i] - col) == row - i.",
      "solutionCode": "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static boolean isSafe(int[] queens, int row, int col) {\n        for (int i = 0; i < row; i++) {\n            if (queens[i] == col || Math.abs(queens[i] - col) == row - i) {\n                return false;\n            }\n        }\n        return true;\n    }\n\n    public static void solve(int row, int[] queens, List<List<Integer>> solutions) {\n        if (row == 4) {\n            List<Integer> sol = new ArrayList<>();\n            for (int q : queens) sol.add(q);\n            solutions.add(sol);\n            return;\n        }\n        for (int col = 0; col < 4; col++) {\n            if (isSafe(queens, row, col)) {\n                queens[row] = col;\n                solve(row + 1, queens, solutions);\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        List<List<Integer>> solutions = new ArrayList<>();\n        solve(0, new int[4], solutions);\n        System.out.println(\"Total 4-Queens solutions: \" + solutions.size());\n        for (int i = 0; i < solutions.size(); i++) {\n            System.out.println(\"Solution \" + (i + 1) + \": \" + solutions.get(i));\n        }\n    }\n}",
      "output": "Total 4-Queens solutions: 2\nSolution 1: [1, 3, 0, 2]\nSolution 2: [2, 0, 3, 1]",
      "explanation": "The 4-Queens solver systematically places queens row-by-row, pruning attacking columns and diagonals, discovering exactly 2 safe board arrangements."
    }
  ]
};
