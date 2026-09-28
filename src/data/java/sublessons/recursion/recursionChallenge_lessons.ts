import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 10: RECURSION & CALL STACK - CAPSTONE LESSON 10.5
// ============================================================

export const recursionChallengeLessons: Record<string, DetailedLesson> = {
  'recursion-challenge': {
  "id": "recursion-challenge",
  "moduleId": "java-recursion",
  "moduleTitle": "10. Recursion & Call Stack",
  "lessonNumber": "Lesson 10.5",
  "title": "Module 10 Challenge & Technical Interview Assessment",
  "subtitle": "Comprehensive assessment covering call stack memory dynamics, recursion depth limits (-Xss), base case invariants, tail call optimization realities, memoization vs tabulation, and backtracking tree exploration",
  "estimatedMinutes": 25,
  "beginnerAnalogy": "In Java runtime architecture, recursion is modeled as a direct sequence of invocation activation frames pushed onto a thread's private Java Virtual Machine stack. Each recursive call allocates a contiguous activation record containing local variable arrays, operand stacks, and frame data (references to the runtime constant pool and exception tables). The winding phase corresponds to sequential frame allocation towards stack boundary limits, while the unwinding phase corresponds to the LIFO destruction of frames as return values are propagated to predecessor callers. At the hardware and operating system level, recursion transforms iterative branch-counter operations into stack pointer movements, where bounded recursion provides mathematically verifiable state decomposition at the cost of thread stack consumption governed by the -Xss configuration flag.",
  "coreExplanation": [
    "Thread Call Stack Architecture: Each Java thread possesses an independent runtime stack sized via the -Xss configuration parameter (default ~1024KB). Invocations push activation frames holding primitive registers, object references, and return program counters.",
    "Winding vs Unwinding Execution Mechanics: Winding represents the state descent phase where call frames accumulate toward the base case. Unwinding represents the ascent phase where base case evaluations return, popping frames in strict Last-In, First-Out (LIFO) order.",
    "Non-Existence of HotSpot Tail-Call Optimization: The HotSpot Virtual Machine preserves call stack frames intentionally across all execution paths to preserve security permission checks and diagnostic stack trace fidelity.",
    "Tree Recursion and Exponential Branching: Algorithms with branching factor k and depth d spawn O(k^d) total method invocations, requiring top-down memoization or bottom-up tabulation to avoid combinatorial explosion.",
    "StackOverflowError vs OutOfMemoryError Boundaries: StackOverflowError is an asynchronous JVM VirtualMachineError resulting from thread stack exhaustion, whereas OutOfMemoryError signals shared heap exhaustion.",
    "Backtracking Search Symmetry: When exploring combinatorial solution spaces, every state mutation executed during winding must be symmetrically restored upon unwinding before traversing sibling branches.",
    "Defensive Copying at Leaf Nodes: Persistent accumulation lists must duplicate candidate collections (e.g., new ArrayList<>(path)) upon reaching goal conditions, as subsequent unwinding removes elements from shared instances.",
    "Recursion-to-Iteration Mapping via Explicit Stacks: Any non-tail recursive formulation can be converted to an iterative model using an explicit heap-allocated stack (ArrayDeque), eliminating JVM thread stack overflow constraints."
  ],
  "beginnerMistakes": [
    {
      "mistake": "Omitting an explicit base case or writing an unreachable termination condition.",
      "whyItHappens": "Assuming recursion will terminate naturally without identifying the minimal non-decomposable state.",
      "howToFix": "Define base cases as the initial guard statements of the recursive method with strict parameter convergence.",
      "codeSnippet": "// WRONG: void recurse(int n) { recurse(n - 1); } // StackOverflowError\n// CORRECT: void recurse(int n) { if (n <= 0) return; recurse(n - 1); }"
    },
    {
      "mistake": "Adding shared mutable collections directly into results without defensive copying.",
      "whyItHappens": "Forgetting that Java passes object references by value; adding the reference causes all result entries to point to one mutated list.",
      "howToFix": "Instantiate a snapshot copy when recording solutions at base cases: results.add(new ArrayList<>(currentPath));",
      "codeSnippet": "// WRONG: results.add(currentPath); // Leaves empty lists at end\n// CORRECT: results.add(new ArrayList<>(currentPath));"
    },
    {
      "mistake": "Failing to backtrack state changes across sibling branches.",
      "whyItHappens": "Mutating shared state (such as visited sets or coordinate paths) without restoring previous values during unwinding.",
      "howToFix": "Ensure every mutation has a corresponding undo step immediately after the recursive call.",
      "codeSnippet": "path.add(candidate);\nbacktrack(nextState, path, results);\npath.remove(path.size() - 1); // Mandatory state restoration"
    },
    {
      "mistake": "Catching Exception instead of Throwable to intercept StackOverflowError.",
      "whyItHappens": "Confusing java.lang.Error with java.lang.Exception in the Java Throwable class hierarchy.",
      "howToFix": "Never rely on catching StackOverflowError for application control flow. If catching is necessary for isolation, catch Error or Throwable.",
      "codeSnippet": "// WRONG: catch (Exception e) { ... } // Misses StackOverflowError\n// CORRECT: catch (StackOverflowError e) { ... }"
    }
  ],
  "interviewTakeaways": [
    "Thread Stack vs Heap Boundary: Recursive frames reside entirely within the private thread stack (-Xss, default ~1MB); exceeding frame limits triggers java.lang.StackOverflowError, which is an asynchronous JVM Error rather than a catchable Exception.",
    "Absence of HotSpot Tail Call Optimization (TCO): The Java Virtual Machine specification deliberately preserves stack traces for security checks (AccessController) and debugging fidelity; consequently, tail recursion incurs identical O(N) stack frame overhead as non-tail recursion.",
    "Recursion Tree Branching Metrics: A recursive method generating k branches per frame with depth d exhibits O(k^d) time complexity and O(d) auxiliary stack space, necessitating memoization (top-down caching) or tabulation (bottom-up DP) to collapse exponential trees into polynomial or linear operations.",
    "Backtracking State Invariants: Every branch in a backtracking decision tree must establish post-return symmetry; mutable state modifications made during the winding descent must be precisely reversed during unwinding ascent prior to traversing subsequent sibling branches.",
    "Defensive Copying at Terminal Leaves: When capturing combinations, permutations, or paths at recursive base cases, candidate collections must be defensively copied (e.g., new ArrayList<>(path)) because the shared accumulator is systematically mutated and emptied during unwinding."
  ],
  "cheatSheet": {
    "summary": "Recursion decomposes complex problems into self-similar subproblems evaluated across the JVM thread stack. Mastering base case placement, call stack budget management, tree pruning, and state restoration during unwinding constitutes essential senior engineering competence.",
    "syntaxTemplate": "public static ReturnType backtrack(State state, Path currentPath, List<Path> results) {\n    if (isGoal(state)) {\n        results.add(new ArrayList<>(currentPath)); // Defensive copy\n        return;\n    }\n    for (Choice choice : getChoices(state)) {\n        if (isValid(choice, state)) {\n            applyChoice(choice, state);       // Winding step\n            currentPath.add(choice);\n            backtrack(state, currentPath, results); // Recurse\n            currentPath.remove(currentPath.size() - 1); // Unwinding: undo\n            undoChoice(choice, state);         // Restore state symmetry\n        }\n    }\n}",
    "rules": [
      {
        "rule": "Base Case Reachability Invariant",
        "explanation": "Every execution path through a recursive method must guarantee monotonic parameter convergence toward an explicit non-recursive base case."
      },
      {
        "rule": "Stack Frame Memory Footprint",
        "explanation": "Stack frames consume thread stack memory governed by -Xss. Infinite or excessively deep recursion throws java.lang.StackOverflowError."
      },
      {
        "rule": "No Tail-Call Elimination Guarantee",
        "explanation": "HotSpot JVM does not convert tail-recursive calls to iterative loops; tail recursion retains O(N) call stack memory overhead."
      },
      {
        "rule": "Overlapping Subproblem Memoization",
        "explanation": "Methods exhibiting tree recursion with overlapping branches require memoization tables to reduce exponential O(2^N) complexity to O(N)."
      },
      {
        "rule": "Backtracking State Restoration Symmetry",
        "explanation": "All mutable mutations applied prior to a recursive descent must be reversed symmetrically upon return before evaluating alternative sibling choices."
      },
      {
        "rule": "Defensive Copying on Solution Capture",
        "explanation": "Accumulator collections passed across recursive frames must be duplicated before insertion into persistent result collections."
      }
    ],
    "quickComparison": [
      {
        "aspect": "Call Stack Memory",
        "optionA": "Linear Recursion: O(N) frames pushed onto thread stack",
        "optionB": "Iteration: O(1) stack memory using local primitive counters",
        "optionC": "Tree Recursion: O(d) max stack depth where d is tree depth"
      },
      {
        "aspect": "Failure Mode",
        "optionA": "Recursion: java.lang.StackOverflowError when stack space exhausts",
        "optionB": "Iteration: Infinite loop freezes CPU thread with 0 stack overflow",
        "optionC": "Unmemoized Tree: Near-infinite CPU duration due to O(2^N) calls"
      },
      {
        "aspect": "Optimization In JVM",
        "optionA": "Recursion: No TCO; stack frame maintained for stack trace fidelity",
        "optionB": "Iteration: JIT loop unrolling, SIMD vectorization, and escape analysis",
        "optionC": "Memoization: Top-down recursion backed by HashMap or flat array"
      }
    ]
  },
  "codeSnippet": {
    "title": "Dual-Branch Recursion: Tree Exploration with Memoization & Stack Verification",
    "code": "import java.util.Arrays;\n\npublic class RecursionDemonstration {\n    private static int callsMade = 0;\n\n    public static long fibMemo(int n, long[] memo) {\n        callsMade++;\n        if (n <= 1) return n;\n        if (memo[n] != -1) return memo[n];\n        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);\n        return memo[n];\n    }\n\n    public static void main(String[] args) {\n        int target = 40;\n        long[] memo = new long[target + 1];\n        Arrays.fill(memo, -1);\n\n        long result = fibMemo(target, memo);\n        System.out.println(\"Fibonacci(\" + target + \") = \" + result);\n        System.out.println(\"Total recursive frames allocated: \" + callsMade);\n    }\n}",
    "lineByLineExplanation": [
      {
        "line": "private static int callsMade = 0;",
        "explanation": "Tracks total recursive method invocations to measure tree expansion reduction."
      },
      {
        "line": "if (n <= 1) return n;",
        "explanation": "Base case halting condition returning immediate values without allocating child stack frames."
      },
      {
        "line": "if (memo[n] != -1) return memo[n];",
        "explanation": "Pruning check: retrieves precomputed subproblem result in O(1) time, preventing exponential sub-tree generation."
      },
      {
        "line": "memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);",
        "explanation": "Winding phase evaluates left branch to leaf, then unwinds and populates cache before right branch query."
      },
      {
        "line": "Arrays.fill(memo, -1);",
        "explanation": "Initializes cache with sentinel -1 denoting uncomputed states."
      },
      {
        "line": "System.out.println(...)",
        "explanation": "Outputs the computed Fibonacci value and proves calls collapsed from over 2 billion to exactly 79."
      }
    ],
    "output": "Fibonacci(40) = 102334155\nTotal recursive frames allocated: 79"
  },
  "miniQuiz": [
    {
      "id": "rec-mq-01",
      "question": "Which memory region hosts activation records allocated for each recursive Java method call?",
      "options": [
        "Metaspace memory allocated per class loader",
        "Shared Java Heap memory containing object instances",
        "Thread-private JVM Call Stack memory",
        "Off-heap direct native memory buffer"
      ],
      "correctIndex": 2,
      "explanation": "Each thread in Java has its own private JVM call stack. Method invocations, including recursive calls, push stack frames containing local variables, operand stacks, and frame data onto this thread stack."
    },
    {
      "id": "rec-mq-02",
      "question": "What is the primary technical reason why HotSpot JVM does NOT support Tail Call Optimization (TCO)?",
      "options": [
        "Java bytecode cannot express jumps between subroutine boundaries",
        "Preserving exact stack frames is required for stack trace fidelity, security access control checks, and debugging",
        "Tail Call Optimization is mathematically impossible in strongly typed languages",
        "Stack memory is garbage-collected automatically every 10 milliseconds"
      ],
      "correctIndex": 1,
      "explanation": "The Java platform relies on precise stack frame inspection for security checks (e.g. java.lang.SecurityManager and AccessController) and full stack trace diagnostics during exceptions. Collapsing frames via TCO would break these invariants."
    },
    {
      "id": "rec-mq-03",
      "question": "Which JVM command-line flag configures the maximum stack size allocated to each Java thread?",
      "options": [
        "-Xms",
        "-Xmx",
        "-Xss",
        "-XX:MaxDirectMemorySize"
      ],
      "correctIndex": 2,
      "explanation": "-Xss defines the thread stack size (typically between 512KB and 1024KB depending on platform and 64-bit architecture), directly determining maximum recursive call depth before StackOverflowError."
    },
    {
      "id": "rec-mq-04",
      "question": "When a recursive method exhausts available thread stack memory, which Throwable type is instantiated?",
      "options": [
        "java.lang.StackOverflowError, a subclass of java.lang.Error",
        "java.lang.StackOverflowException, a checked Exception",
        "java.lang.OutOfMemoryError, indicating insufficient Heap space",
        "java.lang.IllegalStateException, indicating an invalid recursive state"
      ],
      "correctIndex": 0,
      "explanation": "StackOverflowError directly inherits from java.lang.VirtualMachineError and java.lang.Error. It signals an abnormal, fatal virtual machine condition, not a normal catchable checked or unchecked Exception."
    },
    {
      "id": "rec-mq-05",
      "question": "What defines the 'unwinding' phase of a recursive method execution?",
      "options": [
        "The initial descent where parameters are validated and frames are pushed",
        "The return phase where base cases produce results and activation frames pop off the stack in LIFO order",
        "The compilation step where the JIT compiler unrolls recursive methods into while loops",
        "The garbage collector scanning thread stacks for unreachable references"
      ],
      "correctIndex": 1,
      "explanation": "Winding pushes activation frames deeper onto the stack until a base case halts descent. Unwinding is the reverse ascent where base case results propagate backwards, executing post-recursive logic and popping frames in LIFO order."
    },
    {
      "id": "rec-mq-06",
      "question": "What is the time complexity of the naive dual-recursive Fibonacci implementation `fib(n) = fib(n-1) + fib(n-2)` without memoization?",
      "options": [
        "O(N)",
        "O(N log N)",
        "O(2^N)",
        "O(N^2)"
      ],
      "correctIndex": 2,
      "explanation": "Naive recursive Fibonacci generates a binary recursion tree where every frame forks two child invocations, resulting in O(2^N) exponential time complexity due to massive redundant subproblem recomputation."
    },
    {
      "id": "rec-mq-07",
      "question": "What is the auxiliary space complexity of naive dual-recursive Fibonacci `fib(n)` on the call stack?",
      "options": [
        "O(2^N)",
        "O(N)",
        "O(1)",
        "O(N^2)"
      ],
      "correctIndex": 1,
      "explanation": "Although total invocations are exponential O(2^N), the maximum depth of the call stack at any single instant is bounded by the longest path from root to leaf, which is O(N)."
    },
    {
      "id": "rec-mq-08",
      "question": "In backtracking algorithms, why must state modifications be explicitly undone during the unwinding phase?",
      "options": [
        "To release stack frames earlier to prevent garbage collection pauses",
        "To restore the shared state so subsequent sibling branches evaluate against the correct candidate state",
        "Because Java variables lose their values automatically after recursive calls",
        "To force the JIT compiler to inline the recursive subroutine"
      ],
      "correctIndex": 1,
      "explanation": "Backtracking searches decision trees by depth-first traversal. Because data structures (such as path lists or visited matrices) are passed as shared mutable references, mutating them during descent requires symmetrical undo operations during ascent so other sibling branches remain unaffected."
    },
    {
      "id": "rec-mq-09",
      "question": "Consider `void printNums(int n) { if (n == 0) return; printNums(n - 1); System.out.print(n + \" \"); }`. For `printNums(3)`, what is printed?",
      "options": [
        "3 2 1 ",
        "1 2 3 ",
        "3 2 1 0 ",
        "0 1 2 3 "
      ],
      "correctIndex": 1,
      "explanation": "The print statement is placed AFTER the recursive call. Therefore, calls nest down to n=0 first. As frames pop during unwinding from n=1, 2, to 3, the output produces '1 2 3 '."
    },
    {
      "id": "rec-mq-10",
      "question": "Why is defensive copying (`results.add(new ArrayList<>(path))`) necessary when storing paths in recursive backtracking?",
      "options": [
        "ArrayList does not implement the Serializable interface",
        "Storing `path` directly stores a reference to a single mutable list that will be emptied by subsequent unwinding steps",
        "The JVM throws ConcurrentModificationException if the same reference is added twice",
        "Stack frames cannot read references stored in heap collections"
      ],
      "correctIndex": 1,
      "explanation": "If the reference `path` is added without copying, every entry in `results` references the exact same list instance on the heap. When backtracking unwinds and removes elements, all recorded paths become empty."
    },
    {
      "id": "rec-mq-11",
      "question": "What is the fundamental difference between head recursion and tail recursion?",
      "options": [
        "Head recursion uses heap memory; tail recursion uses stack memory",
        "In head recursion, the recursive call occurs before other processing; in tail recursion, the recursive call is the final logical action",
        "Tail recursion can only return boolean values, whereas head recursion can return any type",
        "Head recursion only works with arrays, while tail recursion only works with strings"
      ],
      "correctIndex": 1,
      "explanation": "In head recursion, the recursive call precedes local operations, forcing work to occur during unwinding. In tail recursion, the recursive call is the very last operation executed, meaning no work remains during unwinding."
    },
    {
      "id": "rec-mq-12",
      "question": "How does memoization differ from bottom-up dynamic programming tabulation?",
      "options": [
        "Memoization is top-down recursion with cached returns; tabulation is bottom-up iterative computation filling an array",
        "Memoization avoids stack memory; tabulation uses thread stack memory",
        "Tabulation is O(2^N); memoization is always O(1)",
        "Memoization only works for strings; tabulation only works for numbers"
      ],
      "correctIndex": 0,
      "explanation": "Memoization maintains the top-down recursive decomposition while caching subproblem results. Tabulation replaces recursion with iterative loops that build answers bottom-up from base cases without call stack overhead."
    },
    {
      "id": "rec-mq-13",
      "question": "What will occur if a recursive method lacks a base case?",
      "options": [
        "The program executes indefinitely until manually stopped by the operating system",
        "The compiler flags a syntax error: 'Recursive call requires halting condition'",
        "The thread exhausts its stack frame quota and throws java.lang.StackOverflowError",
        "The JVM automatically translates the method into an empty loop"
      ],
      "correctIndex": 2,
      "explanation": "Without a base case, the method pushes frames continually onto the thread's call stack until it crosses the limit defined by -Xss, immediately throwing StackOverflowError."
    },
    {
      "id": "rec-mq-14",
      "question": "In a divide-and-conquer algorithm like Merge Sort, what constitutes the base case?",
      "options": [
        "An array segment containing zero or one element (low >= high)",
        "The middle index computation `mid = (low + high) / 2`",
        "The completion of the merge subroutine",
        "An array containing sorted positive integers only"
      ],
      "correctIndex": 0,
      "explanation": "In Merge Sort, an array or slice with 0 or 1 element is inherently sorted. The base case check `if (low >= high) return;` prevents further decomposition."
    },
    {
      "id": "rec-mq-15",
      "question": "Which of the following problems CANNOT be naturally solved using classic depth-first recursion without an explicit auxiliary queue?",
      "options": [
        "Depth-First Search (DFS) on an arbitrary tree",
        "Generating all subsets (power set) of an array",
        "Breadth-First Search (BFS) level-order traversal of a binary tree",
        "Tower of Hanoi disk transfer algorithm"
      ],
      "correctIndex": 2,
      "explanation": "Classic recursive calls inherently model LIFO execution (stack behavior), perfectly matching DFS. BFS requires FIFO evaluation of sibling nodes, which necessitates an explicit queue data structure."
    }
  ],
  "practiceProblems": [
    {
      "title": "Tracing Pre-Recursive vs Post-Recursive Execution",
      "problemStatement": "Analyze the execution of this recursive method and determine the exact printed output.",
      "code": "public class TraceOne {\n    public static void fun(int n) {\n        if (n == 0) return;\n        System.out.print(n + \" \");\n        fun(n - 1);\n        System.out.print(n + \" \");\n    }\n    public static void main(String[] args) {\n        fun(3);\n    }\n}",
      "options": [
        "3 2 1 1 2 3",
        "3 2 1 3 2 1",
        "1 2 3 3 2 1",
        "3 2 1 0 1 2 3"
      ],
      "correctOptionIndex": 0,
      "hint": "The first print statement executes during the winding phase. The second print statement executes during the unwinding phase after fun(n-1) returns.",
      "solution": "3 2 1 1 2 3",
      "explanation": "Winding phase pushes frames for n=3, 2, 1, printing '3 2 1 '. At n=0 it returns. Unwinding phase pops frames in reverse order (n=1, 2, 3), executing the second print to append '1 2 3 ', producing '3 2 1 1 2 3 '."
    },
    {
      "title": "Nested Recursive Call Arithmetic",
      "problemStatement": "What is the return value of mystery(4)?",
      "code": "public class TraceTwo {\n    public static int mystery(int n) {\n        if (n <= 1) return 1;\n        return n * mystery(n - 2);\n    }\n    public static void main(String[] args) {\n        System.out.println(mystery(4));\n    }\n}",
      "options": [
        "24",
        "8",
        "4",
        "12"
      ],
      "correctOptionIndex": 1,
      "hint": "Notice that the step decrements by 2 (n - 2), not 1.",
      "solution": "8",
      "explanation": "mystery(4) = 4 * mystery(2). mystery(2) = 2 * mystery(0). For n=0, n <= 1 is true, returning 1. Thus: 4 * (2 * 1) = 8."
    },
    {
      "title": "Tree Recursion Invocations Count",
      "problemStatement": "Determine the exact integer output printed by main().",
      "code": "public class TraceThree {\n    static int count = 0;\n    public static int tree(int n) {\n        count++;\n        if (n <= 1) return n;\n        return tree(n - 1) + tree(n - 2);\n    }\n    public static void main(String[] args) {\n        tree(4);\n        System.out.println(count);\n    }\n}",
      "options": [
        "5",
        "7",
        "9",
        "15"
      ],
      "correctOptionIndex": 2,
      "hint": "Draw the recursion tree for tree(4): root is 4; children are 3 and 2; expand each down to base cases n <= 1.",
      "solution": "9",
      "explanation": "tree(4) calls tree(3) and tree(2). tree(3) calls tree(2) and tree(1). The tree(2) calls each call tree(1) and tree(0). Total calls: 1 (for 4) + 1 (for 3) + 2 (for 2) + 3 (for 1) + 2 (for 0) = 9 invocations."
    },
    {
      "title": "Tail Recursive Accumulator Tracing",
      "problemStatement": "What does the following tail-recursive accumulator method print for input (4, 1)?",
      "code": "public class TraceFour {\n    public static int accSum(int n, int total) {\n        if (n == 0) return total;\n        return accSum(n - 1, total + n);\n    }\n    public static void main(String[] args) {\n        System.out.println(accSum(4, 0));\n    }\n}",
      "options": [
        "10",
        "24",
        "4",
        "0"
      ],
      "correctOptionIndex": 0,
      "hint": "Trace (n, total): (4,0) -> (3,4) -> (2,7) -> (1,9) -> (0,10).",
      "solution": "10",
      "explanation": "accSum(4, 0) accumulates n into total during winding: 0+4=4; 4+3=7; 7+2=9; 9+1=10. When n reaches 0, total (10) is returned directly."
    },
    {
      "title": "Modulo Digit Extraction In Unwinding",
      "problemStatement": "What is printed when mystery(375) is executed?",
      "code": "public class TraceFive {\n    public static void mystery(int n) {\n        if (n == 0) return;\n        mystery(n / 10);\n        System.out.print((n % 10) + \" \");\n    }\n    public static void main(String[] args) {\n        mystery(375);\n    }\n}",
      "options": [
        "5 7 3 ",
        "3 7 5 ",
        "5 7 ",
        "375"
      ],
      "correctOptionIndex": 1,
      "hint": "The recursive call mystery(n / 10) happens before the print statement.",
      "solution": "3 7 5 ",
      "explanation": "mystery(375) calls mystery(37), which calls mystery(3), which calls mystery(0). mystery(0) returns. Frame 3 prints 3 % 10 = 3; frame 37 prints 37 % 10 = 7; frame 375 prints 375 % 10 = 5. Result: '3 7 5 '."
    },
    {
      "title": "String Palindrome Recursive Logic",
      "problemStatement": "What does the method return for check(\"racecar\", 0, 6)?",
      "code": "public class TraceSix {\n    public static boolean check(String s, int left, int right) {\n        if (left >= right) return true;\n        if (s.charAt(left) != s.charAt(right)) return false;\n        return check(s, left + 1, right - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(check(\"racecar\", 0, 6));\n    }\n}",
      "options": [
        "true",
        "false",
        "ArrayIndexOutOfBoundsException",
        "StackOverflowError"
      ],
      "correctOptionIndex": 0,
      "hint": "Characters match pairwise: ('r','r'), ('a','a'), ('c','c'), until left == right at index 3 ('e').",
      "solution": "true",
      "explanation": "The pointers converge inward: (0,6) compares 'r' == 'r'; (1,5) compares 'a' == 'a'; (2,4) compares 'c' == 'c'; (3,3) hits base case left >= right and returns true."
    },
    {
      "title": "Recursive Binary Search Bounds",
      "problemStatement": "What does rSearch return for target 7 in {2, 4, 6, 8, 10}?",
      "code": "public class TraceSeven {\n    public static int rSearch(int[] arr, int target, int lo, int hi) {\n        if (lo > hi) return -1;\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] > target) return rSearch(arr, target, lo, mid - 1);\n        return rSearch(arr, target, mid + 1, hi);\n    }\n    public static void main(String[] args) {\n        int[] arr = {2, 4, 6, 8, 10};\n        System.out.println(rSearch(arr, 7, 0, arr.length - 1));\n    }\n}",
      "options": [
        "3",
        "-1",
        "2",
        "0"
      ],
      "correctOptionIndex": 1,
      "hint": "When the element is not found, lo crosses hi (lo > hi), returning the sentinel value -1.",
      "solution": "-1",
      "explanation": "mid=2 (arr[2]=6) < 7 -> lo becomes 3. mid=3 (arr[3]=8) > 7 -> hi becomes 2. Now lo=3 > hi=2, hitting the base case which returns -1."
    },
    {
      "title": "Backtracking Path Size Bug Tracing",
      "problemStatement": "What does this code print?",
      "code": "import java.util.*;\n\npublic class TraceEight {\n    public static void collect(int n, List<Integer> cur, List<List<Integer>> res) {\n        if (n == 0) {\n            res.add(cur);\n            return;\n        }\n        cur.add(n);\n        collect(n - 1, cur, res);\n        cur.remove(cur.size() - 1);\n    }\n    public static void main(String[] args) {\n        List<List<Integer>> res = new ArrayList<>();\n        collect(2, new ArrayList<>(), res);\n        System.out.println(res.get(0).size());\n    }\n}",
      "options": [
        "2",
        "0",
        "1",
        "IndexOutOfBoundsException"
      ],
      "correctOptionIndex": 1,
      "hint": "The code added `cur` directly instead of `new ArrayList<>(cur)`. Trace cur after all unwinding steps finish.",
      "solution": "0",
      "explanation": "Because `cur` was added directly without a defensive copy (`res.add(cur)`), `res.get(0)` references the shared list. When unwinding completes, `cur.remove(...)` removes all elements, leaving the list size as 0."
    },
    {
      "title": "GCD (Euclidean Algorithm) Recursive Steps",
      "problemStatement": "How many times is gcd() invoked when calculating gcd(48, 18)?",
      "code": "public class TraceNine {\n    static int calls = 0;\n    public static int gcd(int a, int b) {\n        calls++;\n        if (b == 0) return a;\n        return gcd(b, a % b);\n    }\n    public static void main(String[] args) {\n        gcd(48, 18);\n        System.out.println(calls);\n    }\n}",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correctOptionIndex": 1,
      "hint": "Calls sequence: (48, 18) -> (18, 12) -> (12, 6) -> (6, 0).",
      "solution": "4",
      "explanation": "Call 1: gcd(48, 18). Call 2: gcd(18, 12). Call 3: gcd(12, 6). Call 4: gcd(6, 0). At b=0 it returns 6. Total invocations = 4."
    },
    {
      "title": "Static Variable Mutation Across Recursive Branches",
      "problemStatement": "What is the printed value of res?",
      "code": "public class TraceTen {\n    static int res = 0;\n    public static void branch(int n) {\n        if (n <= 0) return;\n        res += n;\n        branch(n - 1);\n        branch(n - 2);\n    }\n    public static void main(String[] args) {\n        branch(3);\n        System.out.println(res);\n    }\n}",
      "options": [
        "6",
        "9",
        "8",
        "10"
      ],
      "correctOptionIndex": 1,
      "hint": "branch(3) adds 3, branch(2) adds 2, branch(1) adds 1, branch(1) from branch(3) adds 1, etc.",
      "solution": "9",
      "explanation": "Calls where n > 0:\nbranch(3): adds 3, calls branch(2) and branch(1).\nbranch(2): adds 2, calls branch(1) and branch(0).\nbranch(1) from branch(2): adds 1, calls branch(0) and branch(-1).\nbranch(1) from branch(3): adds 1, calls branch(0) and branch(-1).\nTotal accumulated sum = 3 + 2 + 1 + 1 + 2 = 9."
    }
  ],
  "interviewQuestions": [
    {
      "question": "What is the fundamental difference between recursion and iteration from a JVM memory perspective?",
      "expectedAnswer": "Recursion allocates a discrete activation frame on the thread's private JVM call stack for every invocation, consuming memory bounded by -Xss. Iteration executes within a single stack frame, updating local variables stored in primitive slot registers without frame allocation overhead.",
      "followUp": "Can every recursive algorithm be rewritten iteratively, and what data structure might be required?",
      "followUpAnswer": "Yes, Church-Turing thesis dictates that any recursive algorithm can be converted to an iterative one. If the recursion is non-tail (e.g., tree recursion or backtracking), an explicit heap-based Stack (such as ArrayDeque) is required to simulate the JVM call stack.",
      "keyPhrases": [
        "JVM call stack frames",
        "single frame register mutation",
        "-Xss stack limit",
        "simulated heap stack with ArrayDeque"
      ],
      "commonMistake": "Believing tail-recursive methods in Java do not consume stack memory.",
      "commonMistakeAnswer": "Java HotSpot does not support Tail Call Optimization; even tail-recursive methods allocate a new stack frame on every call."
    },
    {
      "question": "Why does HotSpot JVM throw StackOverflowError instead of OutOfMemoryError when recursion goes too deep?",
      "expectedAnswer": "StackOverflowError occurs when a thread exhausts its allocated call stack space (-Xss). OutOfMemoryError occurs when the shared Java heap cannot satisfy an object allocation request. Thread stacks are memory-independent from the heap.",
      "followUp": "Can StackOverflowError be caught with a standard catch (Exception e) block?",
      "followUpAnswer": "No, because StackOverflowError extends java.lang.Error, not java.lang.Exception. Catching it requires catch (Throwable t) or catch (StackOverflowError e), though recovering from an Error is generally unsafe.",
      "keyPhrases": [
        "thread stack vs heap",
        "-Xss boundary",
        "VirtualMachineError",
        "Error vs Exception hierarchy"
      ],
      "commonMistake": "Attempting to prevent stack overflow using try-catch(Exception e).",
      "commonMistakeAnswer": "Errors bypass Exception catch blocks, causing unexpected thread termination if not caught via Throwable."
    },
    {
      "question": "Explain why Java HotSpot intentionally omits Tail Call Optimization (TCO).",
      "expectedAnswer": "Java's security architecture relies on stack inspection (e.g. AccessController.checkPermission()) which verifies the call stack before granting sensitive permissions. In addition, preserving stack frames ensures accurate diagnostics and stack traces during exceptions.",
      "followUp": "How can a developer write tail-recursive logic in Java without risking stack overflow?",
      "followUpAnswer": "By converting the recursion into a standard while or for loop, or using the Trampoline pattern with functional interfaces (Supplier) to execute thunks iteratively.",
      "keyPhrases": [
        "stack inspection security model",
        "stack trace fidelity for debugging",
        "while loop conversion",
        "Trampoline pattern"
      ],
      "commonMistake": "Assuming Java 17 or 21 added TCO.",
      "commonMistakeAnswer": "No version of standard HotSpot Java supports automatic TCO for general method calls."
    },
    {
      "question": "How does memoization reduce the time complexity of recursive algorithms?",
      "expectedAnswer": "Memoization caches the computed results of recursive calls indexed by their input parameters in a lookup table (such as an array or HashMap). When the method encounters an already-evaluated state, it returns the cached value in O(1) time instead of recomputing the entire sub-tree.",
      "followUp": "What is the trade-off of memoization compared to bottom-up dynamic programming?",
      "followUpAnswer": "Memoization is easier to implement top-down and only computes necessary subproblems, but retains O(N) call stack overhead and hash/array lookup latency. Tabulation operates iteratively with zero stack overhead and superior cache locality.",
      "keyPhrases": [
        "subproblem caching",
        "O(1) table lookup",
        "exponential to polynomial collapse",
        "top-down vs bottom-up trade-off"
      ],
      "commonMistake": "Using memoization when subproblems do not overlap.",
      "commonMistakeAnswer": "Memoization adds memory overhead without performance benefit if every recursive call receives unique inputs (e.g. Merge Sort)."
    },
    {
      "question": "What is the role of pruning in recursive backtracking algorithms?",
      "expectedAnswer": "Pruning uses constraint checks to abandon candidate paths early before recursing deeper into branches that cannot possibly lead to valid solutions, drastically reducing the search space from exponential toward manageable bounds.",
      "followUp": "Give an example of pruning in the N-Queens or Subset Sum problem.",
      "followUpAnswer": "In Subset Sum with positive integers, if currentSum + candidate > targetSum, we immediately prune that branch with a break statement rather than recursing.",
      "keyPhrases": [
        "constraint validation",
        "early branch termination",
        "search space reduction",
        "bounding function"
      ],
      "commonMistake": "Exploring all leaf nodes and only filtering out invalid answers at the base case.",
      "commonMistakeAnswer": "Filtering only at the base case results in evaluating the full O(2^N) or O(N!) tree, defeating the primary efficiency goal of backtracking."
    },
    {
      "question": "Why is defensive copying mandatory when storing candidate solutions in backtracking?",
      "expectedAnswer": "In backtracking, a single mutable collection (e.g., ArrayList) is passed across frames and mutated via add() and remove(). If stored directly, all entries in the final result list reference the same object, which becomes empty when unwinding finishes.",
      "followUp": "How do you perform defensive copying in Java?",
      "followUpAnswer": "By creating a new instance holding the current elements: `results.add(new ArrayList<>(currentPath));` or `results.add(List.copyOf(currentPath));`.",
      "keyPhrases": [
        "shared mutable reference",
        "unwinding mutation side effects",
        "new ArrayList<>(path)",
        "snapshot isolation"
      ],
      "commonMistake": "Writing `results.add(currentPath)` and wondering why the final list contains only empty lists.",
      "commonMistakeAnswer": "The reference is shared, so post-recursion cleanup mutates all previously saved references."
    },
    {
      "question": "What is the difference between linear recursion and tree recursion?",
      "expectedAnswer": "Linear recursion executes at most one recursive call per activation frame, resulting in a single execution line with O(N) calls and O(N) depth. Tree recursion executes two or more recursive calls per frame, generating a branching tree with exponential O(k^N) calls unless memoized.",
      "followUp": "Can linear recursion always be easily converted to a while loop?",
      "followUpAnswer": "Yes, tail-linear recursion directly maps to a while loop by updating parameter variables and jumping back to the loop head.",
      "keyPhrases": [
        "single call per frame vs multiple calls",
        "O(N) vs O(k^N) complexity",
        "recursion tree branching factor",
        "linear while loop transformation"
      ],
      "commonMistake": "Confusing call stack depth with total call count in tree recursion.",
      "commonMistakeAnswer": "In tree recursion, stack depth is O(depth) but total calls allocated across time is O(branching^depth)."
    },
    {
      "question": "How does the Euclidean GCD algorithm demonstrate optimal recursive problem decomposition?",
      "expectedAnswer": "The Euclidean algorithm decomposes gcd(a, b) into gcd(b, a % b) with base case b == 0 returning a. Because each step reduces the arguments by at least a factor of two every two iterations, it achieves logarithmic O(log(min(a, b))) time complexity.",
      "followUp": "What is the call stack space complexity of recursive Euclidean GCD?",
      "followUpAnswer": "The call stack depth is bounded by O(log(min(a, b))) frames, which for 64-bit integers will never exceed ~100 frames, making it completely safe from stack overflow.",
      "keyPhrases": [
        "gcd(b, a % b)",
        "logarithmic convergence",
        "O(log N) stack frames",
        "safe recursion depth"
      ],
      "commonMistake": "Believing GCD recursion requires O(min(a, b)) steps.",
      "commonMistakeAnswer": "Modulo arithmetic ensures exponential reduction in parameter magnitude, yielding logarithmic steps."
    },
    {
      "question": "Explain the concept of 'Winding' versus 'Unwinding' with an example from string reversal.",
      "expectedAnswer": "During winding, characters are deferred as calls descend to the base case (empty string). During unwinding, the base case returns and each pending frame appends its local character to the child's return value in reverse order.",
      "followUp": "Where does the computational work take place in reverseString(s) = reverseString(s.substring(1)) + s.charAt(0)?",
      "followUpAnswer": "The concatenation occurs strictly during unwinding, after child frames have completed and returned their sub-strings.",
      "keyPhrases": [
        "pre-recursive winding descent",
        "post-recursive unwinding ascent",
        "LIFO frame destruction",
        "deferred concatenation"
      ],
      "commonMistake": "Assuming concatenation happens before the recursive call.",
      "commonMistakeAnswer": "Because the recursive call is an operand in the addition expression, it must evaluate first, postponing the addition until unwinding."
    },
    {
      "question": "How do you analyze the space complexity of a recursive backtracking algorithm?",
      "expectedAnswer": "Space complexity consists of two parts: 1) Maximum call stack depth at any point during DFS (O(N) where N is recursion depth), and 2) Auxiliary heap space used by the current path accumulator and stored results (O(N) for current path, plus O(Solutions * N) for the solution output).",
      "followUp": "Does generating 2^N subsets require 2^N call stack frames simultaneously?",
      "followUpAnswer": "No. The stack depth never exceeds N because depth-first traversal pops child frames before visiting sibling branches. Maximum concurrent stack depth is strictly O(N).",
      "keyPhrases": [
        "maximum DFS tree depth",
        "concurrent frame allocation",
        "accumulator memory overhead",
        "O(N) stack vs O(2^N) total paths"
      ],
      "commonMistake": "Thinking memory consumption is proportional to the total number of explored paths.",
      "commonMistakeAnswer": "Only one path from root to leaf resides on the call stack at any given instant."
    }
  ]
}
};
