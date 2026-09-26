import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 16: STACKS, QUEUES & LISTS (LESSONS 16.1 - 16.4)
// Authoritative FAANG-Standard DSA Core Curriculum
// ============================================================

export const dsa16Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 16.1: Stack Architecture & ArrayDeque Implementation
  // ─────────────────────────────────────────────────────────────
  'stack-adt-and-arraydeque': {
    id: 'stack-adt-and-arraydeque',
    moduleId: 'java-dsa-stacks-queues',
    moduleTitle: '16. Stacks, Queues & Lists',
    lessonNumber: 'Lesson 16.1',
    title: 'Stack Architecture & ArrayDeque Implementation',
    subtitle: 'LIFO operational semantics, push/pop/peek mechanics, why java.util.Stack is legacy, ArrayDeque cache performance, Monotonic Stack pattern, and expression parsing',
    estimatedMinutes: 22,
    beginnerAnalogy: 'Imagine a spring-loaded cafeteria plate dispenser. Clean plates are pushed down onto the top of the stack. When a student needs a plate, they pop the top plate off. You can only inspect or remove the plate that was placed on top most recently (Last-In, First-Out: LIFO). The very first plate placed at the bottom of the dispenser will be the last one taken out. In software, this exact mechanism drives your browser\'s Back button, text editor Undo histories (Ctrl+Z), compiler syntax checkers matching parentheses, and the JVM call stack executing method invocations.',
    interviewTakeaways: [
      'LIFO Principle: Stacks enforce Last-In, First-Out order. All primary operations (`push`, `pop`, `peek`) operate strictly at the top in $O(1)$ constant time.',
      'Why java.util.Stack is Deprecated: `java.util.Stack` extends `java.util.Vector`, inheriting synchronized method locks that cause severe thread contention overhead in single-threaded code, and exposes random access methods (`get(index)`) that violate the Stack ADT contract.',
      'ArrayDeque as Modern Stack: Java documentation recommends `Deque<T> stack = new ArrayDeque<>()` as the high-performance replacement for `Stack`. It is unsynchronized, allocates a contiguous array, and provides superior CPU cache locality.',
      'Monotonic Stack Pattern: A stack maintained in strictly increasing or decreasing order solves "Next Greater Element", "Daily Temperatures", and "Largest Rectangle in Histogram" in $O(N)$ linear time instead of $O(N^2)$.',
      'Balanced Parentheses Invariant: An expression is balanced if every closing bracket matches the most recently opened bracket. Pushing expected closers onto a stack detects invalid nesting immediately.',
      'Memory Overhead: `ArrayDeque` uses an internal contiguous array with doubling resizing, achieving $O(1)$ amortized push with minimal object allocation overhead compared to linked nodes.'
    ],
    cheatSheet: {
      summary: 'Stack is a LIFO data structure supporting O(1) push, pop, and peek. Always use ArrayDeque instead of legacy java.util.Stack.',
      syntaxTemplate: `// Recommended Modern Stack in Java
Deque<Integer> stack = new ArrayDeque<>();

stack.push(10);        // Adds to top
int top = stack.peek(); // Inspects top without removal (10)
int popped = stack.pop(); // Removes and returns top (10)
boolean empty = stack.isEmpty(); // Checks if empty
int size = stack.size(); // Returns element count`,
      rules: [
        {
          rule: 'LIFO Access Rule',
          explanation: 'Elements can only be added to or removed from the top of the stack. Direct middle access is forbidden.'
        },
        {
          rule: 'ArrayDeque vs Stack Rule',
          explanation: 'Never use `java.util.Stack` in modern Java code. Use `Deque<T> stack = new ArrayDeque<>()`.'
        },
        {
          rule: 'Empty Stack Underflow Rule',
          explanation: 'Invoking `pop()` or `peek()` on an empty `ArrayDeque` throws `NoSuchElementException`. Always check `isEmpty()` first.'
        },
        {
          rule: 'Null Prohibition Rule',
          explanation: '`ArrayDeque` strictly prohibits `null` elements. Invoking `push(null)` throws `NullPointerException`.'
        },
        {
          rule: 'Monotonic Stack Amortized Rule',
          explanation: 'In a monotonic stack, each array element is pushed at most once and popped at most once, guaranteeing $O(N)$ total time.'
        }
      ],
      quickComparison: [
        {
          aspect: 'Data Structure',
          optionA: 'ArrayDeque: Circular array backing, unsynchronized',
          optionB: 'java.util.Stack: Extends Vector, synchronized on every call'
        },
        {
          aspect: 'Single-Threaded Speed',
          optionA: 'ArrayDeque: Ultra-fast, zero lock overhead, L1 cache friendly',
          optionB: 'Stack: Slower due to lock acquisition and volatile memory barriers'
        },
        {
          aspect: 'ADT Integrity',
          optionA: 'ArrayDeque: Only exposes Deque/Queue/Stack operations',
          optionB: 'Stack: Inherits get(i), insertElementAt(), violating LIFO purity'
        },
        {
          aspect: 'Null Elements',
          optionA: 'ArrayDeque: Rejects null (throws NullPointerException)',
          optionB: 'Stack: Permits null elements'
        },
        {
          aspect: 'Auxiliary Complexity',
          optionA: 'Push/Pop/Peek: O(1) Time, O(1) Auxiliary Space',
          optionB: 'Overall Capacity: O(N) heap memory for backing array'
        }
      ]
    },
    coreExplanation: [
      'A Stack is an Abstract Data Type (ADT) defined by the Last-In, First-Out (LIFO) access discipline: the element most recently inserted is the first element removed.',
      'The three fundamental operations are: `push(element)` (adds element to the top), `pop()` (removes and returns the top element), and `peek()` (returns the top element without removing it). All three operations run in $O(1)$ constant time.',
      'Java originally provided `java.util.Stack` in JDK 1.0. However, `Stack` extends `java.util.Vector`, which synchronizes every method invocation (`public synchronized E pop()`). In modern multi-threaded Java, synchronized method locks cause unnecessary thread contention, and in single-threaded code, lock acquisition causes performance overhead. Furthermore, extending `Vector` allows callers to call `stack.get(3)` or `stack.add(1, val)`, violating the encapsulation of the stack abstraction.',
      'Java\'s official recommendation is to use `java.util.ArrayDeque` as a stack: `Deque<Integer> stack = new ArrayDeque<>()`. `ArrayDeque` is backed by a resizable circular array, does not synchronize methods, and maintains pointers to `head` and `tail`, giving superior throughput and cache locality.',
      'The Monotonic Stack is an algorithmic pattern where elements in the stack are strictly ordered (either strictly increasing or strictly decreasing). When iterating through an array, elements are popped from the stack until the monotonic condition is restored before pushing the new element. This pattern solves "Next Greater Element", "Daily Temperatures", and "Stock Span" problems in $O(N)$ linear time.',
      'Expression parsing (infix, prefix, postfix) relies heavily on stacks. Compilers use Dijkstra\'s Shunting-Yard Algorithm to convert standard infix expressions (`3 + 4 * 2`) into postfix (Reverse Polish Notation: `3 4 2 * +`), which can then be evaluated in a single pass using a stack without operator precedence ambiguities.',
      'Balanced brackets validation checks whether delimiter pairs (`()`, `{}`, `[]`) are correctly formatted. Opening brackets are pushed onto the stack; when a closing bracket arrives, it must match the bracket popped from the top of the stack. If the stack is empty or types mismatch, the string is malformed.'
    ],
    diagram: `+-----------------------------------------------------------+
|               STACK (LIFO) OPERATIONAL LIFECYCLE          |
+-----------------------------------------------------------+
  push(10) -> push(20) -> push(30) -> pop()

      [ PUSH 10 ]         [ PUSH 20 ]         [ PUSH 30 ]           [ POP() ]
                                            +---------+          Returns 30!
                                            | 30 (Top)|       +------------+
                        +---------+         +---------+       |            |
                        | 20 (Top)|         |   20    |       |  20 (Top)  |
      +---------+       +---------+         +---------+       +------------+
      | 10 (Top)|       |   10    |         |   10    |       |    10      |
      +---------+       +---------+         +---------+       +------------+
      Bottom of Stack   Bottom of Stack     Bottom of Stack   Bottom of Stack`,
    codeSnippet: {
      title: 'Modern Stack Usage with ArrayDeque in Java',
      code: `import java.util.ArrayDeque;
import java.util.Deque;

public class StackDemo {
    public static void main(String[] args) {
        // Modern recommended idiom: Deque interface with ArrayDeque
        Deque<String> stack = new ArrayDeque<>();

        stack.push("Alpha");
        stack.push("Beta");
        stack.push("Gamma");

        System.out.println("Top element (peek): " + stack.peek());
        System.out.println("Popped: " + stack.pop());
        System.out.println("New top: " + stack.peek());
        System.out.println("Stack size: " + stack.size());
    }
}`,
      lineByLineExplanation: [
        { line: 'Deque<String> stack = new ArrayDeque<>();', explanation: 'Creates an unsynchronized resizable array-backed stack.' },
        { line: 'stack.push("Gamma");', explanation: 'Pushes "Gamma" to the top of the stack in O(1) time.' },
        { line: 'stack.pop();', explanation: 'Removes and returns "Gamma" (most recently inserted element).' }
      ],
      output: `Top element (peek): Gamma
Popped: Gamma
New top: Beta
Stack size: 2`
    },
    codeExamples: [
      {
        title: 'Balanced Parentheses Validator using ArrayDeque',
        description: 'Validating nested brackets (), {}, [] in O(N) time and O(N) space.',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

public class BalancedBrackets {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else {
                if (stack.isEmpty() || stack.pop() != c) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("({[]}) valid? " + isValid("({[]})"));
        System.out.println("([)] valid? " + isValid("([)]"));
    }
}`,
        output: `({[]}) valid? true
([)] valid? false`
      },
      {
        title: 'Next Greater Element via Monotonic Stack',
        description: 'Finding the next greater value to the right in O(N) linear time using a monotonic stack.',
        code: `import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NextGreaterDemo {
    public static int[] nextGreater(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= nums[i]) {
                stack.pop(); // Discard smaller elements
            }
            res[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(nums[i]);
        }
        return res;
    }

    public static void main(String[] args) {
        int[] nums = { 2, 1, 5, 3, 4 };
        System.out.println("Next greater: " + Arrays.toString(nextGreater(nums)));
    }
}`,
        output: 'Next greater: [5, 5, -1, 4, -1]'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using `new Stack<>()` instead of `new ArrayDeque<>()`.',
        whyItHappens: 'Seeing `Stack` as an obvious class name in the standard library.',
        howToFix: 'Always declare `Deque<T> stack = new ArrayDeque<>()` as explicitly recommended in official Java documentation.'
      },
      {
        mistake: 'Attempting to push `null` into an `ArrayDeque`.',
        whyItHappens: 'Expecting `ArrayDeque` to behave like `ArrayList` or `LinkedList`.',
        howToFix: '`ArrayDeque` uses `null` as a sentinel return value for methods like `poll()`; it throws `NullPointerException` if you pass `null` to `push()` or `offer()`.'
      },
      {
        mistake: 'Calling `pop()` on an empty stack without checking `isEmpty()`.',
        whyItHappens: 'Assuming `pop()` returns `null` on an empty stack.',
        howToFix: '`pop()` throws `NoSuchElementException` when called on an empty `ArrayDeque`. Use `isEmpty()` or use `poll()` if you prefer receiving `null`.'
      },
      {
        mistake: 'Using an $O(N^2)$ nested loop for Next Greater Element instead of a Monotonic Stack.',
        whyItHappens: 'Writing an outer loop for each element and an inner loop scanning to the right.',
        howToFix: 'Use a monotonic stack to process each element in amortized $O(1)$ operations, achieving $O(N)$ linear time overall.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: ArrayDeque Null Element Rejection',
        problemStatement: 'What happens when running this code?',
        code: `Deque<String> stack = new ArrayDeque<>();
stack.push("A");
stack.push(null);
System.out.println(stack.size());`,
        options: [
          '2',
          'NullPointerException',
          '1',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Does ArrayDeque permit null elements?',
        solution: 'NullPointerException',
        explanation: '`ArrayDeque` strictly prohibits null elements because its internal algorithms use `null` as an empty sentinel. Invoking `stack.push(null)` throws `NullPointerException`.'
      },
      {
        title: 'Puzzle 2: Postfix Evaluation Step Tracing',
        problemStatement: 'What is the top of the stack after evaluating `5 3 2 - *` in Reverse Polish Notation?',
        code: `// Tokens: 5, 3, 2, "-", "*"`,
        options: [
          '5',
          '15',
          '1',
          '25'
        ],
        correctOptionIndex: 0,
        hint: 'First push 5, 3, 2. Operator "-" pops 2 and 3: 3 - 2 = 1. Operator "*" pops 1 and 5: 5 * 1 = 5.',
        solution: '5',
        explanation: '1) Push 5, 3, 2. 2) "-" pops 2 and 3, pushes $3 - 2 = 1$. Stack now holds [5, 1]. 3) "*" pops 1 and 5, pushes $5 \\times 1 = 5$. Final answer is 5.'
      },
      {
        title: 'Puzzle 3: Empty Stack Pop Behavior',
        problemStatement: 'What exception is thrown when `stack.pop()` is called on an empty `ArrayDeque`?',
        code: `Deque<Integer> stack = new ArrayDeque<>();
stack.pop();`,
        options: [
          'NullPointerException',
          'NoSuchElementException',
          'IndexOutOfBoundsException',
          'EmptyStackException'
        ],
        correctOptionIndex: 1,
        hint: 'ArrayDeque implements Deque, whose pop() method throws NoSuchElementException on empty container.',
        solution: 'NoSuchElementException',
        explanation: '`ArrayDeque.pop()` (and `removeFirst()`) throws `NoSuchElementException` when the deque is empty. Note: legacy `Stack.pop()` threw `EmptyStackException`, but `ArrayDeque` throws `NoSuchElementException`.'
      },
      {
        title: 'Puzzle 4: Monotonic Stack Number of Pops',
        problemStatement: 'In Next Greater Element with input `{ 10, 8, 6, 12 }` scanning right-to-left, what is on stack before 10 is pushed?',
        code: `// Scanning right to left: 12, then 6, then 8, then 10`,
        options: [
          '[12, 8]',
          '[12]',
          '[6, 8, 12]',
          'Empty'
        ],
        correctOptionIndex: 0,
        hint: 'When 8 was processed, 6 was popped because 6 <= 8. So stack had [12, 8]. When 10 arrives, 8 is popped.',
        solution: '[12, 8]',
        explanation: 'When 12 is processed, stack holds `[12]`. When 6 is processed, stack holds `[12, 6]`. When 8 arrives, 6 is popped, leaving `[12, 8]`. Then 8 is pushed. Right before 10 arrives, the stack contains `[12, 8]`.'
      },
      {
        title: 'Puzzle 5: Bracket Validator Mismatched Delimiters',
        problemStatement: 'What does `isValid("([)]")` return?',
        code: `public static boolean isValid(String s) { ... }`,
        options: [
          'true',
          'false',
          'StringIndexOutOfBoundsException',
          'NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'Brackets must close in reverse order of opening: the inner \'[\' must close before \'(\' closes.',
        solution: 'false',
        explanation: 'The brackets overlap incorrectly: the square bracket \'[\' was opened last, so it must close first with \']\'. Encountering \')\' when \']\' is expected triggers a mismatch and returns `false`.'
      },
      {
        title: 'Puzzle 6: Stack Reversal using Two Stacks',
        problemStatement: 'If stack A has `[1, 2, 3]` (3 at top), and elements are popped from A and pushed to B, what is at top of B?',
        code: `while (!A.isEmpty()) B.push(A.pop());`,
        options: [
          '3',
          '1',
          '2',
          'Stack is empty'
        ],
        correctOptionIndex: 1,
        hint: '3 is popped first and goes to bottom of B. 1 is popped last and goes to top of B.',
        solution: '1',
        explanation: 'Popping from stack A gives 3, then 2, then 1. Pushing these in order onto B puts 3 at the bottom, 2 in the middle, and 1 at the top. This reverses the stack order.'
      },
      {
        title: 'Puzzle 7: peek() vs pop() State Modification',
        problemStatement: 'What is the output of this code?',
        code: `Deque<Integer> s = new ArrayDeque<>();
s.push(100);
System.out.print(s.peek() + " " + s.size() + " ");
System.out.print(s.pop() + " " + s.size());`,
        options: [
          '100 1 100 0',
          '100 0 100 0',
          '100 1 100 1',
          '100 0 null 0'
        ],
        correctOptionIndex: 0,
        hint: 'peek() inspects without removing; pop() removes the element.',
        solution: '100 1 100 0',
        explanation: '`peek()` inspects 100, leaving size = 1. `pop()` removes 100, reducing size = 0. Output: "100 1 100 0".'
      },
      {
        title: 'Puzzle 8: java.util.Stack ADT Violation',
        problemStatement: 'Why does this code compile even though it violates pure Stack ADT rules?',
        code: `java.util.Stack<Integer> s = new java.util.Stack<>();
s.push(10);
s.push(20);
s.add(0, 99); // Compiles!
System.out.println(s.get(0));`,
        options: [
          'Because Java 8 added index access to Stacks.',
          'Because java.util.Stack extends Vector, exposing arbitrary index insertion and access methods.',
          'It does not compile.',
          'Because s is cast to List.'
        ],
        correctOptionIndex: 1,
        hint: 'What superclass does java.util.Stack inherit from?',
        solution: 'Because java.util.Stack extends Vector, exposing arbitrary index insertion and access methods.',
        explanation: '`java.util.Stack` inherits from `Vector`, exposing list operations like `add(index, element)` and `get(index)`, completely violating the encapsulation of a pure LIFO stack.'
      },
      {
        title: 'Puzzle 9: Monotonic Stack Total Complexity',
        problemStatement: 'What is the overall time complexity of Monotonic Stack on an array of size N?',
        code: `for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && stack.peek() < arr[i]) {
        stack.pop();
    }
    stack.push(arr[i]);
}`,
        options: [
          'O(N^2)',
          'O(N log N)',
          'O(N)',
          'O(1)'
        ],
        correctOptionIndex: 2,
        hint: 'How many times can each element be pushed and popped across the entire algorithm?',
        solution: 'O(N)',
        explanation: 'Although there is a nested while loop, each of the $N$ elements is pushed onto the stack exactly once and can be popped at most once. The inner while loop runs at most $N$ times across the ENTIRE execution. Amortized time is strictly $O(N)$.'
      },
      {
        title: 'Puzzle 10: ArrayDeque Initial Capacity Resizing',
        problemStatement: 'What is the default initial capacity of an empty `ArrayDeque` in Java HotSpot?',
        code: `Deque<Integer> q = new ArrayDeque<>();`,
        options: [
          '10',
          '16',
          '0',
          '32'
        ],
        correctOptionIndex: 1,
        hint: 'ArrayDeque capacities are always powers of 2 (default is 16).',
        solution: '16',
        explanation: 'In Java\'s standard `ArrayDeque`, initial capacity is 16 (always a power of 2 to allow fast bitwise AND modulo masking `head & (elements.length - 1)`).'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does the Java documentation officially recommend ArrayDeque over java.util.Stack?',
        answer: 'The Java documentation explicitly states: "A more complete and consistent set of LIFO stack operations is provided by the Deque interface and its implementations, which should be used in preference to the Stack class: Deque<Integer> stack = new ArrayDeque<>()". There are three architectural reasons: 1) Synchronization Overhead: `java.util.Stack` inherits from `Vector`, meaning every method (`push`, `pop`, `peek`) is `synchronized`. In single-threaded applications, acquiring and releasing object monitors causes unnecessary CPU cache coherence churn and pipeline stalls. 2) Encapsulation Violation: Because `Stack` extends `Vector`, it exposes index-based methods like `get(int index)`, `set(int index, E element)`, and `remove(int index)`, which directly violate the LIFO abstraction contract. 3) Memory and Speed: `ArrayDeque` is backed by a circular resizable array with power-of-two capacity, offering superior CPU cache locality and zero lock overhead.',
        followUp: 'What if you need a thread-safe stack in concurrent code?',
        followUpAnswer: 'Use a non-blocking concurrent collection like ConcurrentLinkedDeque or wrap ArrayDeque using Collections.synchronizedCollection, or use a blocking queue like LinkedBlockingDeque.',
        keyPhrases: [
          'Inheritance from Vector',
          'Synchronized method lock contention',
          'Violation of LIFO encapsulation',
          'ArrayDeque circular array performance'
        ],
        commonMistakeAnswer: 'Believing Stack is faster than ArrayDeque because it is a dedicated class.'
      },
      {
        question: 'What is a Monotonic Stack, and why does it achieve O(N) linear time for "Next Greater Element"?',
        answer: 'A Monotonic Stack is a stack whose elements are strictly monotonic (strictly increasing or strictly decreasing from bottom to top). When processing an array element $X$, we repeatedly pop all stack elements that violate the monotonic property before pushing $X$. While it looks like an $O(N^2)$ algorithm due to the nested `while` loop inside the `for` loop, its amortized complexity is strictly $O(N)$: each element is pushed onto the stack exactly once and popped at most once throughout the entire lifespan of the algorithm. Therefore, across all $N$ loop iterations, the total number of `pop()` operations cannot exceed $N$. This solves problems like "Next Greater Element", "Daily Temperatures", and "Stock Span" in $O(N)$ time instead of brute-force $O(N^2)$.',
        followUp: 'How does a Monotonic Stack solve the "Largest Rectangle in Histogram" problem?',
        followUpAnswer: 'By maintaining an increasing stack of bar indices. When a shorter bar arrives, elements are popped, and the popped height is multiplied by the width (distance between current index and the new top of the stack) in O(N) time.',
        keyPhrases: [
          'Strictly increasing or decreasing invariant',
          'Each element pushed and popped at most once',
          'Amortized O(N) linear time guarantee',
          'Eliminating brute-force O(N^2) scans'
        ],
        commonMistakeAnswer: 'Analyzing the nested loop as O(N^2) without amortized accounting.'
      },
      {
        question: 'How do you design a MinStack that supports push, pop, top, and getMin() all in O(1) time?',
        answer: 'A MinStack can be implemented in $O(1)$ time and $O(N)$ space using two stacks: 1) Primary Data Stack: stores all values normally. 2) Auxiliary Min Stack: stores the running minimum value. When `push(x)` is called, we push $x$ to the primary stack. If `minStack` is empty or $x \\le \\text{minStack.peek()}$, we also push $x$ onto `minStack`. When `pop()` is called, if the popped element equals `minStack.peek()`, we pop from `minStack` as well. `getMin()` simply inspects `minStack.peek()` in $O(1)$ time. An optimized alternative stores the difference between value and current minimum `diff = x - min` in a single stack, eliminating the second stack entirely while retaining $O(1)$ time.',
        followUp: 'Why is the condition for pushing to minStack val <= minStack.peek() instead of strictly less than (<)?',
        followUpAnswer: 'Because if duplicate minimum values are pushed (e.g. -3 then -3), popping the first -3 would prematurely remove the minimum for both instances if duplicates were not tracked.',
        keyPhrases: [
          'Dual stack architecture (dataStack and minStack)',
          'O(1) time guarantee for getMin()',
          'Handling duplicate minimums with <=',
          'Single stack difference optimization'
        ],
        commonMistakeAnswer: 'Searching the stack in O(N) to find the minimum on getMin().'
      },
      {
        question: 'How does expression evaluation work using Dijkstra\'s Shunting-Yard Algorithm and a Stack?',
        answer: 'Dijkstra\'s Shunting-Yard algorithm parses infix expressions (e.g. `3 + 4 * 2 / ( 1 - 5 )`) into postfix notation (Reverse Polish Notation) using an operator stack: 1) Operands (numbers) are appended directly to the output. 2) When an operator arrives, operators on the stack with greater or equal precedence (and left-associativity) are popped to the output, then the incoming operator is pushed. 3) Left parentheses `(` are pushed unconditionally. 4) When a right parenthesis `)` arrives, operators are popped to the output until the matching `(` is popped. Once in postfix notation (`3 4 2 * 1 5 - / +`), a single stack evaluates the expression in $O(N)$ time: push numbers, and on encountering an operator, pop two operands, apply the operator, and push the result.',
        followUp: 'What is the time and space complexity of the Shunting-Yard algorithm?',
        followUpAnswer: 'Time complexity is O(N) where N is token count, and auxiliary space is O(N) for operator and operand stacks.',
        keyPhrases: [
          'Dijkstra Shunting-Yard algorithm',
          'Operator precedence and associativity stack',
          'Parentheses delimiter matching',
          'Reverse Polish Notation evaluation in O(N)'
        ],
        commonMistakeAnswer: 'Evaluating operators strictly left-to-right without respecting mathematical precedence.'
      },
      {
        question: 'What is the internal data structure of java.util.ArrayDeque, and how does it resize?',
        answer: '`ArrayDeque` is implemented using a resizable circular array (`Object[] elements`) with two pointer indices: `head` and `tail`. When elements are pushed or added, `head` moves backward (`(head - 1) & (elements.length - 1)`) and `tail` moves forward (`(tail + 1) & (elements.length - 1)`). To make modulo arithmetic fast, the capacity of `ArrayDeque` is ALWAYS a power of 2 (16, 32, 64...), allowing `index % capacity` to be computed using a single-cycle bitwise AND instruction `index & (capacity - 1)`. When `head == tail`, the array is completely full; `ArrayDeque` doubles its capacity ($2 \\times$), re-aligns elements from index 0, and updates pointers in $O(N)$ time, achieving $O(1)$ amortized push/pop.',
        followUp: 'Does ArrayDeque ever automatically shrink its array capacity when elements are popped?',
        followUpAnswer: 'No, standard ArrayDeque does not downsize its backing array when elements are popped. To reclaim memory, a new instance must be created or trimmed.',
        keyPhrases: [
          'Circular array with head and tail pointers',
          'Power-of-two capacity bitwise AND masking',
          'Geometric capacity doubling when head == tail',
          'No automatic shrinking on pop'
        ],
        commonMistakeAnswer: 'Assuming ArrayDeque uses a linked list of nodes.'
      },
      {
        question: 'How do you implement an undo/redo feature in software using Stacks?',
        answer: 'Undo/Redo is implemented using the Command Design Pattern backed by two stacks: an `undoStack` and a `redoStack`: 1) Execute Action: When a user performs an action (e.g. typing a character or drawing a shape), a Command object containing the action and its inverse is pushed onto `undoStack`, and `redoStack` is cleared. 2) Undo: Pop the top Command from `undoStack`, execute its `undo()` method, and push the Command onto `redoStack`. 3) Redo: Pop the top Command from `redoStack`, execute its `execute()` method, and push it back onto `undoStack`. Both operations run in $O(1)$ constant time with $O(H)$ space, where $H$ is the action history limit.',
        followUp: 'Why must the redoStack be cleared whenever a new action is performed?',
        followUpAnswer: 'Because performing a new action creates a new timeline branch, invalidating previously undone forward actions.',
        keyPhrases: [
          'Dual stack architecture (undoStack and redoStack)',
          'Command Design Pattern integration',
          'Clearing redoStack on new action execution',
          'O(1) time undo and redo operations'
        ],
        commonMistakeAnswer: 'Trying to store full application snapshots instead of differential command actions.'
      },
      {
        question: 'What is the call stack in Java, and what happens during a StackOverflowError?',
        answer: 'In the JVM runtime data area, each thread has its own private Call Stack created when the thread starts. Whenever a method is invoked, a `StackFrame` is pushed onto the thread stack, containing the method\'s local variables array, operand stack, and reference to the runtime constant pool. When a method returns, its frame is popped. If an algorithm recurses infinitely (e.g. missing base condition) or deeply beyond the allocated thread stack size (default 1024KB, configured via `-Xss`), the JVM runs out of stack memory and throws `java.lang.StackOverflowError`. Unlike `OutOfMemoryError` (which occurs on the Heap), `StackOverflowError` is strictly a thread stack exhaustion error.',
        followUp: 'Can you catch and recover from a StackOverflowError in Java?',
        followUpAnswer: 'Technically yes (it is a Throwable/Error), but it is considered an anti-pattern because the thread stack may be in an inconsistent state.',
        keyPhrases: [
          'Per-thread JVM call stack frames',
          'Local variables and operand stack storage',
          'StackOverflowError vs OutOfMemoryError',
          '-Xss thread stack size configuration'
        ],
        commonMistakeAnswer: 'Confusing the Java Call Stack with the JVM Garbage-Collected Heap.'
      },
      {
        question: 'How do you check for balanced parentheses in an expression that contains strings, character literals, and escaped characters?',
        answer: 'Real-world source code parsing (such as in an IDE or compiler) cannot naively push all brackets because brackets inside string literals (`"hello ( world"`) or character literals (`\'{\'`) are not syntax delimiters. A robust parser maintains a state machine: 1) Normal state: push openers, match closers. 2) In-String state: when encountering unescaped quote `"`, transition to String mode; ignore all brackets until closing `"` arrives. 3) In-Char state: handle `\'`. 4) Escape flag: if preceded by backslash `\\`, treat the next character literally. Only brackets encountered in the Normal state are pushed/popped on the delimiter stack. This runs in $O(N)$ linear time and $O(D)$ stack space.',
        followUp: 'How do you handle multi-line comments (/* ... */) in this state machine?',
        followUpAnswer: 'Add a Comment state: when seeing /*, enter comment mode and ignore all characters including brackets until */ appears.',
        keyPhrases: [
          'Finite state machine parser',
          'Ignoring delimiters within string/char literals',
          'Escape character handling',
          'Delimiters evaluated only in normal token state'
        ],
        commonMistakeAnswer: 'Treating brackets inside quotes as delimiters, causing false syntax errors.'
      },
      {
        question: 'What is the difference between Stack.peek() and Queue.peek() in Java\'s Deque interface?',
        answer: 'Because `Deque` supports both Stack (LIFO) and Queue (FIFO) semantics, method names can be confusing: 1) Stack methods: `push(e)` adds to front (top), `pop()` removes from front (top), and `peek()` / `peekFirst()` inspects the front (top) element. 2) Queue methods: `offer(e)` / `add(e)` adds to the rear (tail), `poll()` / `remove()` removes from front (head), and `peek()` / `peekFirst()` inspects the front (head). Notice that in `ArrayDeque`, `peek()` ALWAYS returns the first element (`head`), which represents the top of the stack when using `push()`, and represents the front of the queue when using `offer()`.',
        followUp: 'What method should you call to inspect the bottom of a stack in an ArrayDeque?',
        followUpAnswer: 'stack.peekLast() inspects the element at the bottom of the stack without removing it.',
        keyPhrases: [
          'Deque dual LIFO and FIFO semantics',
          'peek() inspects head element in both contracts',
          'push() inserts at head; offer() inserts at tail',
          'peekLast() inspects bottom of stack'
        ],
        commonMistakeAnswer: 'Assuming peek() returns different elements depending on whether the variable is declared as Stack or Queue.'
      },
      {
        question: 'How can you simulate a Stack using two FIFO Queues?',
        answer: 'A stack can be simulated with two queues ($Q_1$ and $Q_2$) using either Push-Costly or Pop-Costly strategies: 1) Push-Costly ($O(N)$ push, $O(1)$ pop): Enqueue incoming element $x$ into $Q_2$. Then dequeue all elements from $Q_1$ and enqueue them into $Q_2$. Swap the names of $Q_1$ and $Q_2$. $Q_1$ now holds elements in LIFO order, so `pop()` is $O(1)$ from $Q_1$. 2) Pop-Costly ($O(1)$ push, $O(N)$ pop): Enqueue $x$ into $Q_1$. When popping, transfer $N - 1$ elements from $Q_1$ into $Q_2$, leaving the last added element in $Q_1$ to be dequeued and returned, then swap queues. Push-costly is generally preferred when read operations dominate.',
        followUp: 'Can you implement a Stack using just a SINGLE Queue?',
        followUpAnswer: 'Yes! Enqueue x, then rotate the previous (size - 1) elements by dequeuing and immediately re-enqueueing them, placing x at the front in O(N) push and O(1) pop.',
        keyPhrases: [
          'Push-costly vs Pop-costly trade-off',
          'Reversing FIFO order via queue rotation',
          'Single queue rotation optimization',
          'O(1) pop with O(N) push'
        ],
        commonMistakeAnswer: 'Claiming two queues cannot simulate a stack without extra arrays.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which principle governs the operational behavior of a Stack?',
        options: [
          'First-In, First-Out (FIFO)',
          'Last-In, First-Out (LIFO)',
          'Shortest-Job-First (SJF)',
          'Random access'
        ],
        correctIndex: 1,
        explanation: 'Stacks operate strictly on the Last-In, First-Out (LIFO) access discipline.'
      },
      {
        question: 'Why does Java recommend `ArrayDeque` over `java.util.Stack`?',
        options: [
          'ArrayDeque is faster, unsynchronized, and does not expose vector random-access methods.',
          'java.util.Stack has been deleted in Java 17.',
          'ArrayDeque stores elements on the GPU.',
          'java.util.Stack cannot store Strings.'
        ],
        correctIndex: 0,
        explanation: 'ArrayDeque avoids Vector\'s lock overhead and preserves proper stack encapsulation.'
      },
      {
        question: 'What happens when `pop()` is invoked on an empty `ArrayDeque`?',
        options: [
          'It returns null.',
          'It throws a NoSuchElementException.',
          'It returns -1.',
          'It blocks the thread indefinitely.'
        ],
        correctIndex: 1,
        explanation: '`ArrayDeque.pop()` throws `NoSuchElementException` when called on an empty deque.'
      },
      {
        question: 'What is the time complexity of `push`, `pop`, and `peek` in a stack?',
        options: [
          '$O(N)$',
          '$O(\\log N)$',
          '$O(1)$',
          '$O(N^2)$'
        ],
        correctIndex: 2,
        explanation: 'All standard stack operations execute in $O(1)$ constant time.'
      },
      {
        question: 'What is the overall time complexity of Monotonic Stack on an array of size $N$?',
        options: [
          '$O(N^2)$',
          '$O(N)$',
          '$O(N \\log N)$',
          '$O(\\log N)$'
        ],
        correctIndex: 1,
        explanation: 'Each element is pushed once and popped at most once, yielding $O(N)$ amortized time.'
      },
      {
        question: 'Which method inspects the top element of an `ArrayDeque` stack without removing it?',
        options: [
          '`poll()`',
          '`pop()`',
          '`peek()`',
          '`top()`'
        ],
        correctIndex: 2,
        explanation: '`peek()` returns the top element without removing it from the stack.'
      },
      {
        question: 'What happens if you invoke `stack.push(null)` on an `ArrayDeque`?',
        options: [
          'It pushes null successfully.',
          'It throws a NullPointerException.',
          'It ignores the operation.',
          'It clears the stack.'
        ],
        correctIndex: 1,
        explanation: '`ArrayDeque` strictly prohibits null elements and throws `NullPointerException`.'
      },
      {
        question: 'What algorithm uses an operator stack to convert infix expressions to postfix expressions?',
        options: [
          'Dijkstra\'s Shunting-Yard Algorithm',
          'Floyd\'s Cycle Finding Algorithm',
          'Kadane\'s Algorithm',
          'Boyer-Moore Algorithm'
        ],
        correctIndex: 0,
        explanation: 'Dijkstra\'s Shunting-Yard algorithm parses infix expressions into postfix notation using an operator stack.'
      },
      {
        question: 'In a MinStack implementation, what is the time complexity of `getMin()`?',
        options: [
          '$O(N)$',
          '$O(\\log N)$',
          '$O(1)$',
          '$O(N^2)$'
        ],
        correctIndex: 2,
        explanation: 'A MinStack maintains the minimum in an auxiliary stack or difference variable, yielding $O(1)$ lookup.'
      },
      {
        question: 'What exception is thrown when the JVM call stack exceeds its configured memory limit?',
        options: [
          '`OutOfMemoryError`',
          '`StackOverflowError`',
          '`IndexOutOfBoundsException`',
          '`ClassCastException`'
        ],
        correctIndex: 1,
        explanation: 'Exhausting thread call stack frames triggers a JVM `StackOverflowError`.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 16.2: Queue Architecture, FIFO Ring Buffers & Priority Queues
  // ─────────────────────────────────────────────────────────────
  'queue-adt-and-ring-buffers': {
    id: 'queue-adt-and-ring-buffers',
      moduleId: 'java-dsa-stacks-queues',
      moduleTitle: '16. Stacks, Queues & Lists',
      lessonNumber: 'Lesson 16.2',
      title: 'Queue Architecture, FIFO Ring Buffers & Priority Queues',
      subtitle: 'FIFO operational invariants, circular array modulo wrapping, offer/poll/peek vs add/remove/element exceptions, and PriorityQueue min-heap internals',
      estimatedMinutes: 24,
      beginnerAnalogy: 'Imagine standing in line at an airport security checkpoint. The first passenger to step into line is the first passenger processed and cleared through security (First-In, First-Out: FIFO). You join the line at the back (rear/tail) and exit at the front (head). Cutting in the middle is not allowed. In computer architecture, queues handle printer job spools, operating system CPU scheduling run queues, asynchronous web server request handling, message brokers like Kafka and RabbitMQ, and Breadth-First Search (BFS) graph traversals.',
      interviewTakeaways: [
        'FIFO Principle: Queues enforce First-In, First-Out order. Enqueue happens at the tail/rear, and dequeue happens at the head/front in $O(1)$ time.',
        'Java Queue Method Pair Contracts: Java provides two sets of methods: 1) Throws Exception: `add()`, `remove()`, `element()`; 2) Returns Special Value (`false`/`null`): `offer()`, `poll()`, `peek()`. Always prefer `offer`/`poll`/`peek` in production.',
        'Circular Ring Buffer: Using circular modulo indexing `(tail + 1) % capacity` eliminates the need to shift array elements on dequeue, giving $O(1)$ time and fixed memory bounds.',
        'PriorityQueue Min-Heap Internals: `java.util.PriorityQueue` is NOT a FIFO queue; it is an unbounded binary min-heap where `peek()` returns the smallest element in $O(1)$ and `offer()`/`poll()` take $O(\\log N)$.',
        'Queue Implementations in JDK: `ArrayDeque` (fastest general-purpose FIFO queue), `LinkedList` (FIFO queue with node overhead), `PriorityQueue` (heap-ordered), and `ArrayBlockingQueue` (bounded thread-safe concurrent buffer).',
        'Null Prohibition: `ArrayDeque` and `PriorityQueue` strictly reject `null` elements because `null` is used as a sentinel return value by `poll()` and `peek()`.'
      ],
      cheatSheet: {
        summary: 'Queues enforce FIFO ordering. Prefer offer/poll/peek over add/remove/element. Use ArrayDeque for FIFO queues and PriorityQueue for min/max heaps.',
        syntaxTemplate: `// Standard FIFO Queue using ArrayDeque
Queue<String> queue = new ArrayDeque<>();
queue.offer("A");       // Enqueue at rear (O(1))
String front = queue.peek(); // Inspect head without removal ("A")
String dequeued = queue.poll(); // Dequeue from front ("A")

// PriorityQueue Min-Heap (Smallest first)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(40);
minHeap.offer(10);
int smallest = minHeap.poll(); // 10 (O(log N))

// PriorityQueue Max-Heap (Largest first)
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());`,
        rules: [
          {
            rule: 'FIFO Access Invariant',
            explanation: 'Elements enter at the rear and exit from the front in the exact order of their arrival.'
          },
          {
            rule: 'Method Choice Rule',
            explanation: 'Use `offer()`, `poll()`, and `peek()` to avoid exceptions on capacity-restricted or empty queues.'
          },
          {
            rule: 'Modulo Ring Buffer Rule',
            explanation: 'Compute circular array pointer wrapping using `(index + 1) % capacity`.'
          },
          {
            rule: 'PriorityQueue Heap Invariant',
            explanation: '`PriorityQueue` orders elements by natural order (`Comparable`) or custom `Comparator`, NOT insertion order.'
          },
          {
            rule: 'PriorityQueue Poll Complexity Rule',
            explanation: '`PriorityQueue.poll()` takes $O(\\log N)$ time to re-heapify down from root.'
          }
        ],
        quickComparison: [
          {
            aspect: 'Discipline',
            optionA: 'Queue (FIFO): First-In, First-Out (head to tail)',
            optionB: 'PriorityQueue: Priority-Ordered binary heap (min/max root)'
          },
          {
            aspect: 'Offer / Enqueue Time',
            optionA: 'ArrayDeque: O(1) amortized constant time',
            optionB: 'PriorityQueue: O(log N) sift-up heap insertion'
          },
          {
            aspect: 'Poll / Dequeue Time',
            optionA: 'ArrayDeque: O(1) pointer adjustment',
            optionB: 'PriorityQueue: O(log N) sift-down heap restoration'
          },
          {
            aspect: 'Peek Time',
            optionA: 'ArrayDeque: O(1) inspects head index',
            optionB: 'PriorityQueue: O(1) inspects root at index 0'
          },
          {
            aspect: 'Backing Structure',
            optionA: 'ArrayDeque: Resizable circular array',
            optionB: 'PriorityQueue: Binary tree stored inside contiguous array'
          }
        ]
      },
      coreExplanation: [
        'A Queue is an Abstract Data Type (ADT) defined by the First-In, First-Out (FIFO) discipline: elements are inserted at the tail (rear) and extracted from the head (front).',
        'In the Java Collections Framework, the `java.util.Queue` interface defines two distinct sets of methods for each operation: 1) Methods that throw exceptions when operations fail: `add(e)` (throws `IllegalStateException` if full), `remove()` (throws `NoSuchElementException` if empty), and `element()` (throws `NoSuchElementException` if empty). 2) Methods that return special sentinel values: `offer(e)` (returns `false` if full), `poll()` (returns `null` if empty), and `peek()` (returns `null` if empty). In production, the `offer`/`poll`/`peek` triad is universally preferred.',
        'Circular Ring Buffer (Array-based Queue): Naively implementing a queue with an array by incrementing `head` leaves unused memory at the beginning. Shifting elements left on dequeue takes $O(N)$ time. A Circular Queue wraps pointers around using modulo arithmetic: `tail = (head + count) % capacity` and `head = (head + 1) % capacity`. This achieves $O(1)$ enqueue and dequeue with zero element shifting.',
        'PriorityQueue Internals: `java.util.PriorityQueue` is backed by a binary min-heap stored in an array (`Object[] queue`). For any node at index $i$, its left child is at $2i + 1$, right child is at $2i + 2$, and parent is at $(i - 1) / 2$. Inserting an element takes $O(\\log N)$ via "sift-up"; extracting the minimum element takes $O(\\log N)$ via "sift-down". Inspecting the minimum takes $O(1)$ by reading `queue[0]`.',
        'Breadth-First Search (BFS): Queues are the core data structure driving BFS in trees and graphs. Starting from a source node, the algorithm enqueues neighbors level by level, ensuring nodes are visited in order of shortest distance from the source.',
        'Blocking Queues in Concurrency: In multi-threaded producer-consumer architectures, `java.util.concurrent.BlockingQueue` (like `ArrayBlockingQueue` or `LinkedBlockingQueue`) provides thread-safe blocking operations: `put()` blocks when full, and `take()` blocks when empty, eliminating busy-waiting loops.'
      ],
      diagram: `+-----------------------------------------------------------+
|              CIRCULAR FIFO QUEUE (RING BUFFER)            |
+-----------------------------------------------------------+
  Capacity: 6, Head: 2, Tail: 5, Count: 3

              Index 0     Index 1
             +---------+---------+
             |  EMPTY  |  EMPTY  |
             +---------+---------+
            /                     \\
  Index 5  +                       +  Index 2 (HEAD)
  [ 30 ]   |                       |  [ 10 ] -> Next to DEQUEUE
  (TAIL)   +                       +
            \\                     /
             +---------+---------+
             |   20    |  EMPTY  |
             +---------+---------+
              Index 4     Index 3

  Enqueue 40 -> placed at (5 + 1) % 6 = Index 0 (Wraps around in O(1)!)`,
    codeSnippet: {
      title: 'Standard Queue and PriorityQueue Usage in Java',
      code: `import java.util.ArrayDeque;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {
        // 1. Standard FIFO Queue using ArrayDeque
        Queue<String> fifo = new ArrayDeque<>();
        fifo.offer("Alice");
        fifo.offer("Bob");
        fifo.offer("Charlie");

        System.out.println("FIFO Dequeue: " + fifo.poll()); // Alice (first in)
        System.out.println("FIFO Front: " + fifo.peek());   // Bob

        // 2. PriorityQueue Min-Heap
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(50);
        minHeap.offer(10);
        minHeap.offer(30);

        System.out.println("Min-Heap root: " + minHeap.poll()); // 10 (smallest)
        System.out.println("Min-Heap next: " + minHeap.poll()); // 30
    }
}`,
      lineByLineExplanation: [
        { line: 'Queue<String> fifo = new ArrayDeque<>();', explanation: 'Creates an array-backed FIFO queue.' },
        { line: 'fifo.poll();', explanation: 'Extracts "Alice", the element that arrived first (FIFO order).' },
        { line: 'minHeap.poll();', explanation: 'Extracts 10, the smallest element in the binary min-heap.' }
      ],
      output: `FIFO Dequeue: Alice
FIFO Front: Bob
Min-Heap root: 10
Min-Heap next: 30`
    },
    codeExamples: [
      {
        title: 'Circular Queue (Ring Buffer) Implementation',
        description: 'Fixed-size array queue using modulo wrap-around arithmetic.',
        code: `public class RingBufferDemo {
    static class RingBuffer {
        int[] data;
        int head = 0, count = 0, capacity;

        RingBuffer(int cap) {
            capacity = cap;
            data = new int[cap];
        }

        boolean enqueue(int val) {
            if (count == capacity) return false; // Full
            int tail = (head + count) % capacity;
            data[tail] = val;
            count++;
            return true;
        }

        int dequeue() {
            if (count == 0) return -1; // Empty
            int val = data[head];
            head = (head + 1) % capacity;
            count--;
            return val;
        }
    }

    public static void main(String[] args) {
        RingBuffer rb = new RingBuffer(3);
        rb.enqueue(10);
        rb.enqueue(20);
        rb.enqueue(30);
        System.out.println("Dequeued: " + rb.dequeue()); // 10
        rb.enqueue(40); // Wraps around to slot 0
        System.out.println("Dequeued: " + rb.dequeue()); // 20
    }
}`,
        output: `Dequeued: 10
Dequeued: 20`
      },
      {
        title: 'Top K Largest Elements using Min-Heap PriorityQueue',
        description: 'Maintaining a min-heap of size K to find largest elements in O(N log K) time.',
        code: `import java.util.PriorityQueue;

public class TopKDemo {
    public static int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
        for (int n : nums) {
            minHeap.offer(n);
            if (minHeap.size() > k) minHeap.poll();
        }
        return minHeap.peek();
    }

    public static void main(String[] args) {
        int[] data = { 3, 2, 1, 5, 6, 4 };
        System.out.println("2nd largest: " + findKthLargest(data, 2)); // 5
    }
}`,
        output: '2nd largest: 5'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming PriorityQueue returns elements in insertion order (FIFO).',
        whyItHappens: 'Because PriorityQueue implements the Queue interface, developers assume it behaves like a FIFO queue.',
        howToFix: 'Recognize that PriorityQueue orders elements by priority (min-heap by default). Use `ArrayDeque` for FIFO queues.'
      },
      {
        mistake: 'Using `queue.remove()` without checking if the queue is empty, causing crashes.',
        whyItHappens: 'Not knowing that `remove()` throws `NoSuchElementException` while `poll()` returns `null`.',
        howToFix: 'Use `poll()` or check `isEmpty()` before invoking `remove()`.'
      },
      {
        mistake: 'Iterating over PriorityQueue with a for-each loop expecting sorted order.',
        whyItHappens: 'Assuming `for (int x : priorityQueue)` iterates in sorted order.',
        howToFix: 'PriorityQueue iterator reflects internal array heap order, NOT sorted order! To read in sorted order, you must repeatedly invoke `poll()` until empty.'
      },
      {
        mistake: 'Shifting array elements left on dequeue in a custom array queue.',
        whyItHappens: 'Copying elements down to index 0, turning an $O(1)$ dequeue into an $O(N)$ operation.',
        howToFix: 'Use circular modulo pointers (`head = (head + 1) % capacity`) to achieve $O(1)$ dequeue without shifting.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Queue add() vs offer() on Full Bounded Queue',
        problemStatement: 'What happens when you invoke `add()` on a capacity-restricted queue that is full?',
        code: `// ArrayBlockingQueue with capacity 1
BlockingQueue<Integer> q = new ArrayBlockingQueue<>(1);
q.add(10);
q.add(20); // What happens here?`,
        options: [
          'Returns false',
          'Throws IllegalStateException',
          'Overwrites 10',
          'Blocks the thread'
        ],
        correctOptionIndex: 1,
        hint: 'add() belongs to the exception-throwing method group in the Queue interface.',
        solution: 'Throws IllegalStateException',
        explanation: '`add()` throws `IllegalStateException("Queue full")` if an element cannot be added due to capacity restrictions. `offer()` returns `false` instead.'
      },
      {
        title: 'Puzzle 2: PriorityQueue For-Each Iteration Trap',
        problemStatement: 'What does this program print?',
        code: `PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(30);
pq.offer(10);
pq.offer(20);

for (int x : pq) {
    System.out.print(x + " ");
}`,
        options: [
          '10 20 30 (Strictly sorted)',
          '10 30 20 (Array heap layout: root at 0, children at 1 and 2)',
          '30 10 20 (Insertion order)',
          'Random order'
        ],
        correctOptionIndex: 1,
        hint: 'Does the iterator of PriorityQueue sort elements or traverse the internal heap array?',
        solution: '10 30 20 (Array heap layout: root at 0, children at 1 and 2)',
        explanation: 'The iterator of `PriorityQueue` does NOT guarantee elements in priority order! It traverses the underlying binary heap array directly: index 0 is 10 (root), index 1 is 30, index 2 is 20. To retrieve in sorted order, you must call `poll()` repeatedly.'
      },
      {
        title: 'Puzzle 3: Circular Queue Modulo Index Calculation',
        problemStatement: 'In a circular queue of capacity 8 with head = 6 and count = 5, what is the index of the tail element?',
        code: `int capacity = 8, head = 6, count = 5;
int tail = (head + count - 1) % capacity;`,
        options: [
          '11',
          '2',
          '3',
          '1'
        ],
        correctOptionIndex: 1,
        hint: '(6 + 5 - 1) % 8 = 10 % 8 = 2.',
        solution: '2',
        explanation: 'The elements occupy indices 6, 7, 0, 1, 2. The tail element resides at index $(6 + 5 - 1) \\% 8 = 10 \\% 8 = 2$.'
      },
      {
        title: 'Puzzle 4: PriorityQueue Custom Comparator Inversion',
        problemStatement: 'What does `pq.poll()` return when configured with `Collections.reverseOrder()`?',
        code: `PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
pq.offer(15);
pq.offer(42);
pq.offer(8);
System.out.println(pq.poll());`,
        options: [
          '8',
          '15',
          '42',
          'null'
        ],
        correctOptionIndex: 2,
        hint: 'Collections.reverseOrder() converts the default min-heap into a max-heap.',
        solution: '42',
        explanation: 'Passing `Collections.reverseOrder()` configures `PriorityQueue` as a max-heap. The root contains the largest element, so `poll()` returns 42.'
      },
      {
        title: 'Puzzle 5: Queue FIFO Dequeue Order',
        problemStatement: 'What is the output of these queue operations?',
        code: `Queue<Integer> q = new ArrayDeque<>();
q.offer(1);
q.offer(2);
System.out.print(q.poll() + " ");
q.offer(3);
System.out.print(q.poll() + " " + q.poll());`,
        options: [
          '1 2 3',
          '2 1 3',
          '3 2 1',
          '1 3 2'
        ],
        correctOptionIndex: 0,
        hint: 'Elements leave in the exact order they entered.',
        solution: '1 2 3',
        explanation: '1 leaves first (output: 1). Queue has [2]. 3 is added: [2, 3]. Then 2 leaves, then 3 leaves. Output: "1 2 3".'
      },
      {
        title: 'Puzzle 6: PriorityQueue Heapify Down Complexity',
        problemStatement: 'What is the time complexity of `PriorityQueue.poll()` on a heap of size N?',
        code: `pq.poll(); // Removes root and sifts down last element`,
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N log N)'
        ],
        correctOptionIndex: 1,
        hint: 'After removing root, how deep does the replacement node sift down?',
        solution: 'O(log N)',
        explanation: 'Removing root requires moving the last leaf to index 0 and sifting down through the tree of height $\\log_2 N$. Time complexity is $O(\\log N)$.'
      },
      {
        title: 'Puzzle 7: PriorityQueue Heapify Up Complexity',
        problemStatement: 'What is the time complexity of `PriorityQueue.offer(x)` on a heap of size N?',
        code: `pq.offer(99); // Appends to array and sifts up`,
        options: [
          'O(1)',
          'O(log N)',
          'O(N)',
          'O(N^2)'
        ],
        correctOptionIndex: 1,
        hint: 'The inserted element travels up from leaf to root at most log2(N) levels.',
        solution: 'O(log N)',
        explanation: 'The new element is appended at the end of the array and sifts up toward the root, taking at most $\\log_2 N$ comparisons.'
      },
      {
        title: 'Puzzle 8: Two-Stack Queue Amortized Dequeue',
        problemStatement: 'In a queue implemented with two stacks (inStack and outStack), when does outStack need to be populated?',
        code: `public int poll() {
    if (outStack.isEmpty()) {
        while (!inStack.isEmpty()) outStack.push(inStack.pop());
    }
    return outStack.pop();
}`,
        options: [
          'On every single poll() call.',
          'Only when outStack is completely empty.',
          'Whenever inStack has more elements than outStack.',
          'Never.'
        ],
        correctOptionIndex: 1,
        hint: 'If outStack already has elements, its top is already the oldest remaining element.',
        solution: 'Only when outStack is completely empty.',
        explanation: 'Transferring from `inStack` to `outStack` reverses elements into FIFO order. As long as `outStack` has elements, its top is the next in FIFO order. We only transfer when `outStack` is empty, giving $O(1)$ amortized time.'
      },
      {
        title: 'Puzzle 9: Queue peek() on Empty Queue',
        problemStatement: 'What does `q.peek()` return on an empty `ArrayDeque`?',
        code: `Queue<Integer> q = new ArrayDeque<>();
System.out.println(q.peek());`,
        options: [
          'Throws NoSuchElementException',
          'null',
          '-1',
          '0'
        ],
        correctOptionIndex: 1,
        hint: 'peek() belongs to the special-value return group of Queue methods.',
        solution: 'null',
        explanation: '`peek()` returns `null` when the queue is empty. In contrast, `element()` throws `NoSuchElementException`.'
      },
      {
        title: 'Puzzle 10: ArrayDeque Double-Ended Polling',
        problemStatement: 'What does this program print?',
        code: `Deque<Integer> d = new ArrayDeque<>();
d.offer(10);
d.offer(20);
d.offer(30);
System.out.println(d.pollFirst() + " " + d.pollLast());`,
        options: [
          '10 30',
          '10 20',
          '30 10',
          '20 30'
        ],
        correctOptionIndex: 0,
        hint: 'pollFirst() removes from head; pollLast() removes from tail.',
        solution: '10 30',
        explanation: '`d.pollFirst()` removes 10 from the front. `d.pollLast()` removes 30 from the back. Output: "10 30".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the difference between the two method families in Java\'s Queue interface.',
        answer: 'The `java.util.Queue` interface defines two distinct method families for every queue operation: 1) Exception-Throwing Family: `add(e)` inserts or throws `IllegalStateException` if capacity is full; `remove()` retrieves and removes the head or throws `NoSuchElementException` if empty; `element()` inspects the head or throws `NoSuchElementException` if empty. 2) Special-Value Family: `offer(e)` inserts or returns `false` if full; `poll()` retrieves and removes the head or returns `null` if empty; `peek()` inspects the head or returns `null` if empty. In production systems, the special-value family (`offer`, `poll`, `peek`) is strongly preferred because handling return values is significantly faster than generating and unwinding stack traces for expected boundary conditions.',
        followUp: 'Why does this method design explain why ArrayDeque prohibits null elements?',
        followUpAnswer: 'Because if null were allowed as an element, calling q.poll() and receiving null would be ambiguous: did the queue return a stored null element, or was the queue empty? Prohibiting null ensures null unambiguously means the queue is empty.',
        keyPhrases: [
          'Exception-throwing vs special-value return families',
          'add/remove/element vs offer/poll/peek',
          'Stack trace generation overhead',
          'Ambiguity prevention of null return value'
        ],
        commonMistakeAnswer: 'Assuming offer() and add() do the exact same thing in all queue implementations.'
      },
      {
        question: 'How does a Circular Queue (Ring Buffer) work, and how does it prevent the element shifting penalty?',
        answer: 'A naive array queue maintains a `head` index that increments on dequeue. Eventually, `head` reaches the end of the array, leaving empty memory at the start. Shifting elements left on every dequeue takes $O(N)$ time. A Circular Queue solves this by connecting the end of the array back to the beginning conceptually. It maintains three integers: `head`, `count`, and `capacity`. To enqueue: `tail = (head + count) % capacity; data[tail] = val; count++;`. To dequeue: `val = data[head]; head = (head + 1) % capacity; count--;`. Both operations run in $O(1)$ constant time with zero element shifting. If capacity is a power of 2, the modulo `% capacity` is optimized into a bitwise AND: `(head + 1) & (capacity - 1)`.',
        followUp: 'How do you detect whether a circular queue is full vs empty without a count variable?',
        followUpAnswer: 'Leave one slot unused: full when (tail + 1) % cap == head; empty when head == tail. Alternatively, use a boolean flag isFull.',
        keyPhrases: [
          'Modulo arithmetic pointer wrap-around',
          'Eliminating O(N) element shifting on dequeue',
          'Bitwise AND optimization for power-of-2 capacity',
          'Full vs empty condition disambiguation'
        ],
        commonMistakeAnswer: 'Shifting all elements to index 0 on every dequeue in custom queues.'
      },
      {
        question: 'How is PriorityQueue implemented internally in Java, and why is it not a FIFO queue?',
        answer: '`java.util.PriorityQueue` is implemented as an array-backed binary min-heap (`Object[] queue`), NOT a FIFO queue. In a min-heap, every parent node is less than or equal to its children (`queue[parent] <= queue[child]`). For any element at index $i$: left child is at $2i + 1$, right child is at $2i + 2$, and parent is at $(i - 1) / 2$. Operations work as follows: 1) `peek()`: returns `queue[0]` (the root) in $O(1)$ time. 2) `offer(e)`: appends $e$ to the end of the array and performs "sift-up" ($O(\\log N)$ comparisons). 3) `poll()`: removes `queue[0]`, moves the last element to index 0, and performs "sift-down" ($O(\\log N)$). Elements leave in priority order (natural ordering or custom `Comparator`), not arrival order.',
        followUp: 'Why does iterating over a PriorityQueue with a for-each loop NOT print elements in sorted order?',
        followUpAnswer: 'Because the iterator simply iterates over the raw backing array. The binary heap only guarantees that the parent is smaller than its children; it does not sort sibling nodes. To get sorted order, you must repeatedly poll().',
        keyPhrases: [
          'Array-backed binary min-heap',
          'Node indexing: left=2i+1, right=2i+2, parent=(i-1)/2',
          'O(log N) sift-up and sift-down mechanics',
          'Raw array iteration does NOT reflect sorted order'
        ],
        commonMistakeAnswer: 'Assuming PriorityQueue is internally sorted like a TreeSet.'
      },
      {
        question: 'How do you find the Kth largest element in an ongoing stream of integers using a PriorityQueue?',
        answer: 'To find the $K$-th largest element in a stream, we maintain a MIN-HEAP of fixed capacity $K$. For each incoming element $X$: 1) Offer $X$ to the min-heap. 2) If the min-heap size exceeds $K$, invoke `minHeap.poll()` to evict the smallest element in the heap. Because the min-heap only holds $K$ elements, all elements smaller than the $K$-th largest have been evicted. The smallest element currently in the heap (the root, accessed via `minHeap.peek()`) is guaranteed to be the $K$-th largest element seen so far! Time complexity per stream element is $O(\\log K)$, and auxiliary space is $O(K)$.',
        followUp: 'Why do we use a MIN-heap of size K instead of a MAX-heap of size N?',
        followUpAnswer: 'A max-heap would need to store all N elements in O(N) space and popping K times would take O(K log N). A min-heap bounds space to O(K) and keeps the K-th largest at the root in O(1) peek time.',
        keyPhrases: [
          'Min-heap of capacity K',
          'Evicting smallest element when size > K',
          'Root holds the K-th largest element',
          'O(log K) insertion time and O(K) space'
        ],
        commonMistakeAnswer: 'Using a max-heap of all elements, requiring O(N) space.'
      },
      {
        question: 'What is Breadth-First Search (BFS), and why is a Queue mandatory for its implementation?',
        answer: 'Breadth-First Search (BFS) is a graph/tree traversal algorithm that visits nodes level by level, exploring all immediate neighbors at distance $D$ before exploring any nodes at distance $D + 1$. A FIFO Queue is mandatory because it preserves the exact order of discovery: 1) Enqueue start node. 2) While queue is not empty, dequeue node $U$, process it, and enqueue all unvisited neighbors of $U$ at the rear of the queue. Because all distance-$D$ neighbors enter the queue before any distance-$(D+1)$ neighbors, the FIFO order guarantees that all distance-$D$ nodes are processed first. This makes BFS the standard algorithm for finding the shortest path in unweighted graphs.',
        followUp: 'What happens if you accidentally replace the Queue with a Stack in BFS?',
        followUpAnswer: 'The traversal immediately transforms into Depth-First Search (DFS), exploring deep paths instead of shortest level-by-level paths.',
        keyPhrases: [
          'Level-by-level shortest path discovery',
          'FIFO arrival order preservation',
          'Distance D nodes processed before distance D+1',
          'Queue to Stack substitution turns BFS into DFS'
        ],
        commonMistakeAnswer: 'Thinking BFS can be implemented recursively without a queue.'
      },
      {
        question: 'How do you implement a Queue using two Stacks, and what is its amortized complexity?',
        answer: 'A queue can be implemented using two stacks: `inStack` (for enqueue) and `outStack` (for dequeue): 1) `push(x)`: simply push $x$ onto `inStack` ($O(1)$). 2) `pop()` / `peek()`: if `outStack` is empty, pop all elements from `inStack` and push them onto `outStack` (which reverses their order from LIFO to FIFO!). Then pop/peek from `outStack`. If `outStack` is not empty, pop directly from `outStack`. While an individual `pop()` can take $O(N)$ when transferring elements, each element is pushed into `inStack` once, moved to `outStack` once, and popped from `outStack` once. Across $N$ operations, total work is $3N$, yielding an amortized time complexity of $O(1)$ per operation.',
        followUp: 'When is outStack replenished from inStack?',
        followUpAnswer: 'Strictly when outStack is completely empty. Transferring early would scramble the FIFO order.',
        keyPhrases: [
          'Dual stack architecture (inStack and outStack)',
          'Reversal from LIFO to FIFO during transfer',
          'Transfer strictly when outStack is empty',
          'Amortized O(1) time complexity per operation'
        ],
        commonMistakeAnswer: 'Transferring elements back and forth between stacks on every push and pop.'
      },
      {
        question: 'What is the Sliding Window Maximum problem, and why is a Monotonic Deque used?',
        answer: 'Given an array of numbers and a sliding window of size $K$, find the maximum value in each window position. A brute force check takes $O(N \\times K)$ time. A `PriorityQueue` takes $O(N \\log K)$ time. A Monotonic Double-Ended Queue (`Deque`) solves it in $O(N)$ optimal linear time: we maintain a deque of indices such that elements at those indices are in strictly decreasing order. For each element `nums[i]`: 1) Remove indices from the front if they fall outside the current window (`deque.peekFirst() <= i - k`). 2) Remove indices from the back while `nums[deque.peekLast()] <= nums[i]` (they can never be the maximum). 3) Add `i` to the back. 4) The front of the deque `deque.peekFirst()` always holds the maximum of the current window.',
        followUp: 'Why is each element processed in O(1) amortized time?',
        followUpAnswer: 'Because each index is added to the deque once and removed at most once from either end.',
        keyPhrases: [
          'Monotonic decreasing deque of indices',
          'Front eviction of expired window indices',
          'Rear eviction of dominated smaller elements',
          'O(N) linear time optimal solution'
        ],
        commonMistakeAnswer: 'Using a PriorityQueue and assuming it is O(N).'
      },
      {
        question: 'What is a BlockingQueue in Java, and how does it implement thread safety?',
        answer: '`java.util.concurrent.BlockingQueue` is a concurrent queue interface designed for the Producer-Consumer pattern. It provides blocking methods: `put(e)` inserts an element, blocking the producer thread if the queue is full until space becomes available; `take()` retrieves and removes an element, blocking the consumer thread if the queue is empty until an element arrives. Standard implementations include `ArrayBlockingQueue` (backed by a bounded array using a `ReentrantLock` and two `Condition` variables: `notEmpty` and `notFull`) and `LinkedBlockingQueue` (using two separate locks: `takeLock` and `putLock` to allow concurrent enqueue and dequeue).',
        followUp: 'What is the advantage of LinkedBlockingQueue having two separate locks?',
        followUpAnswer: 'It allows a producer thread and a consumer thread to operate concurrently without blocking each other, increasing throughput on multi-core systems.',
        keyPhrases: [
          'Producer-Consumer pattern',
          'put() blocks when full; take() blocks when empty',
          'ReentrantLock with notEmpty and notFull conditions',
          'Two-lock concurrency in LinkedBlockingQueue'
        ],
        commonMistakeAnswer: 'Using busy-wait while loops instead of blocking queues in concurrent code.'
      },
      {
        question: 'How do you design a Moving Average from a streaming dataset using a Queue?',
        answer: 'To calculate the moving average of the last $W$ numbers from an infinite stream in $O(1)$ time: maintain a FIFO queue `Queue<Integer> q = new ArrayDeque<>()` of capacity $W$, and a running sum variable `double sum = 0.0`. When a new number $V$ arrives: 1) If `q.size() == W`, evict the oldest number: `sum -= q.poll();`. 2) Add the new number: `q.offer(V); sum += V;`. 3) Return `sum / q.size()`. Because each addition and eviction takes $O(1)$ time, calculating the moving average is strictly $O(1)$ time per query and consumes $O(W)$ auxiliary memory.',
        followUp: 'What floating-point precision hazard can occur with running sums over billions of operations?',
        followUpAnswer: 'Floating-point rounding errors can accumulate over time. Recomputing sum from scratch periodically (e.g. every 100,000 queries) resets numerical drift.',
        keyPhrases: [
          'FIFO eviction of oldest window element',
          'Running sum maintenance in O(1)',
          'O(W) auxiliary window storage',
          'Floating-point drift mitigation'
        ],
        commonMistakeAnswer: 'Iterating over all W elements on every stream query in O(W) time.'
      },
      {
        question: 'What is the Difference between Deque and Queue in Java, and when should you choose Deque?',
        answer: '`Queue` represents a unidirectional FIFO queue where elements are added at the tail and removed from the head. `Deque` (Double-Ended Queue, pronounced "deck") extends `Queue` and allows insertion, removal, and inspection at BOTH ends (`addFirst`, `addLast`, `removeFirst`, `removeLast`). Choose `Deque` when: 1) You need a Stack (LIFO): use `push()` and `pop()` on `ArrayDeque`. 2) You need a double-ended queue (e.g. palindrome checking, sliding window maximum, work-stealing algorithms in ForkJoinPool). 3) You need a standard FIFO queue: `ArrayDeque` implementing `Queue` is faster and allocates less memory than `LinkedList`.',
        followUp: 'Why is ArrayDeque faster than LinkedList when used as a Queue?',
        followUpAnswer: 'LinkedList allocates a new 24-byte Node object for every element added and causes pointer-chasing CPU cache misses. ArrayDeque stores elements in contiguous memory blocks, maximizing cache locality.',
        keyPhrases: [
          'Bidirectional insertion and removal at both ends',
          'Deque extends Queue in Java collections hierarchy',
          'Work-stealing thread pool implementation',
          'ArrayDeque cache superiority over LinkedList'
        ],
        commonMistakeAnswer: 'Using LinkedList as the default Queue implementation in Java.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which principle governs a standard Queue?',
        options: [
          'Last-In, First-Out (LIFO)',
          'First-In, First-Out (FIFO)',
          'Highest-Priority First',
          'Random order'
        ],
        correctIndex: 1,
        explanation: 'Standard queues operate strictly on the First-In, First-Out (FIFO) principle.'
      },
      {
        question: 'Which Queue method removes and returns the head, or returns `null` if empty?',
        options: [
          '`remove()`',
          '`poll()`',
          '`peek()`',
          '`pop()`'
        ],
        correctIndex: 1,
        explanation: '`poll()` retrieves and removes the head of the queue, returning `null` if empty.'
      },
      {
        question: 'What is the time complexity of `offer()` in a Java `PriorityQueue`?',
        options: [
          '$O(1)$',
          '$O(\\log N)$',
          '$O(N)$',
          '$O(N \\log N)$'
        ],
        correctIndex: 1,
        explanation: 'Inserting into a binary min-heap requires sifting up, taking $O(\\log N)$ comparisons.'
      },
      {
        question: 'How does a Circular Queue avoid shifting elements on dequeue?',
        options: [
          'By using multiple threads.',
          'By wrapping pointers using modulo arithmetic `(head + 1) % capacity`.',
          'By allocating a new array on every dequeue.',
          'By using a HashMap.'
        ],
        correctIndex: 1,
        explanation: 'Modulo arithmetic wraps pointers around to index 0, eliminating shifting.'
      },
      {
        question: 'What happens when you iterate over a `PriorityQueue` using a for-each loop?',
        options: [
          'Elements are traversed in sorted order.',
          'Elements are traversed in internal binary heap array order (not sorted).',
          'It throws an exception.',
          'Elements are traversed in reverse order.'
        ],
        correctIndex: 1,
        explanation: 'The iterator of PriorityQueue walks the raw backing array, which is heap-ordered, not fully sorted.'
      },
      {
        question: 'What graph traversal algorithm fundamentally relies on a FIFO Queue?',
        options: [
          'Depth-First Search (DFS)',
          'Breadth-First Search (BFS)',
          'Dijkstra\'s Algorithm with negative weights',
          'Kruskal\'s Algorithm'
        ],
        correctIndex: 1,
        explanation: 'Breadth-First Search (BFS) uses a FIFO queue to explore nodes level-by-level.'
      },
      {
        question: 'Which class is the fastest general-purpose implementation of a FIFO Queue in Java?',
        options: [
          '`java.util.LinkedList`',
          '`java.util.ArrayDeque`',
          '`java.util.Vector`',
          '`java.util.Stack`'
        ],
        correctIndex: 1,
        explanation: '`ArrayDeque` is backed by a contiguous circular array, offering superior cache locality over `LinkedList`.'
      },
      {
        question: 'What does `peek()` return on an empty `PriorityQueue`?',
        options: [
          'Throws NoSuchElementException',
          'null',
          '-1',
          '0'
        ],
        correctIndex: 1,
        explanation: '`PriorityQueue.peek()` returns `null` when the queue is empty.'
      },
      {
        question: 'How do you configure a `PriorityQueue` to act as a Max-Heap in Java?',
        options: [
          '`new PriorityQueue<>(Collections.reverseOrder())`',
          '`new PriorityQueue<>(max)`',
          '`new MaxPriorityQueue<>()`',
          'PriorityQueue cannot be a Max-Heap'
        ],
        correctIndex: 0,
        explanation: 'Passing `Collections.reverseOrder()` inverts natural ordering, creating a max-heap.'
      },
      {
        question: 'What is the amortized time complexity of enqueueing and dequeueing in a two-stack queue?',
        options: [
          '$O(N)$',
          '$O(\\log N)$',
          '$O(1)$',
          '$O(N^2)$'
        ],
        correctIndex: 2,
        explanation: 'Each element is transferred between stacks at most once, yielding $O(1)$ amortized time.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 16.3: Singly & Doubly Linked List Internals
  // ─────────────────────────────────────────────────────────────
  'singly-doubly-linked-lists': {
    id: 'singly-doubly-linked-lists',
    moduleId: 'java-dsa-stacks-queues',
    moduleTitle: '16. Stacks, Queues & Lists',
    lessonNumber: 'Lesson 16.3',
    title: 'Singly & Doubly Linked List Internals',
    subtitle: 'Node object heap layout, reference pointer manipulation, sentinel dummy nodes, in-place pointer reversal ($O(1)$ space), and linked list vs dynamic array cache performance',
    estimatedMinutes: 24,
    beginnerAnalogy: 'Imagine a treasure hunt where every clue card does not reveal the treasure, but contains the GPS coordinates of the next clue card hidden in the city. You cannot skip directly to clue #5 because you do not know its location until you visit clue #1, then clue #2, then clue #3, then clue #4. In an array, all houses are built side-by-side on the same numbered street, allowing instant $O(1)$ teleportation to house #5. In a linked list, clue nodes are scattered arbitrarily across the city (the JVM heap), connected only by reference address pointers. Inserting a new clue between #2 and #3 is trivial: just rewrite clue #2 to point to your new clue, without moving any houses.',
    interviewTakeaways: [
      'Node Heap Allocation: Unlike contiguous arrays, each linked list node is an independent heap object containing data plus reference pointers (`next`, and `prev` in doubly linked lists).',
      'No Reallocation Penalty: Linked lists grow dynamically without capacity doubling or memory copying overhead; inserting or deleting at a known position takes $O(1)$ time.',
      'No Random Access: Accessing the $K$-th element requires traversing $K$ pointer hops from `head`, taking $O(K) = O(N)$ linear time.',
      'Sentinel Dummy Node Pattern: Using a dummy node (`ListNode dummy = new ListNode(0); dummy.next = head;`) eliminates edge-case checks for inserting/deleting at the head or operating on empty lists.',
      'In-Place Reversal: Reversing a singly linked list in $O(N)$ time and $O(1)$ auxiliary space requires updating pointers using three references: `prev`, `curr`, and `nextTemp`.',
      'Memory Overhead & Cache Penalty: A linked list node consumes 24 bytes (12-byte header + 4-byte int + 4-byte next pointer + 4-byte padding) for 4 bytes of data, causing frequent CPU cache line misses during traversal.'
    ],
    cheatSheet: {
      summary: 'Linked lists provide O(1) insertion/deletion at known nodes but O(N) access. Always use dummy sentinel nodes to eliminate null checks.',
      syntaxTemplate: `// Singly Linked List Node Definition
class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

// In-Place Reversal Pattern (Iterative O(1) space)
public static ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev; // New head!
}`,
      rules: [
        {
          rule: 'Sequential Traversal Rule',
          explanation: 'Accessing or searching any node in a singly linked list requires $O(N)$ pointer hops.'
        },
        {
          rule: 'Dummy Node Invariant',
          explanation: 'Initialize `ListNode dummy = new ListNode(0); dummy.next = head;` to simplify head insertions and deletions.'
        },
        {
          rule: 'Pointer Severance Rule',
          explanation: 'Always save `curr.next` in a temporary variable before redirecting `curr.next`, otherwise the remainder of the list is lost to garbage collection.'
        },
        {
          rule: 'Doubly Linked Deletion Rule',
          explanation: 'In doubly linked lists, deleting any node `x` takes $O(1)$: `x.prev.next = x.next; x.next.prev = x.prev;`.'
        },
        {
          rule: 'Memory Overhead Ratio',
          explanation: 'A 64-bit JVM node object with CompressedOOPs uses 24 bytes for a single 4-byte integer (6x memory bloat).'
        }
      ],
      quickComparison: [
        {
          aspect: 'Access by Index',
          optionA: 'Array / ArrayList: O(1) direct memory calculation',
          optionB: 'Linked List: O(N) sequential pointer traversal'
        },
        {
          aspect: 'Insert at Head',
          optionA: 'ArrayList: O(N) shifts all elements right',
          optionB: 'Linked List: O(1) updates head pointer only'
        },
        {
          aspect: 'Delete Known Node',
          optionA: 'ArrayList: O(N) shifts remaining elements left',
          optionB: 'Doubly Linked List: O(1) re-links neighbor pointers'
        },
        {
          aspect: 'CPU Cache Locality',
          optionA: 'ArrayList: High L1/L2 cache hits (contiguous memory)',
          optionB: 'Linked List: Frequent cache misses (scattered heap nodes)'
        },
        {
          aspect: 'Memory Overhead',
          optionA: 'ArrayList: ~4 bytes per primitive int slot',
          optionB: 'Linked List: 24 to 32 bytes per node object'
        }
      ]
    },
    coreExplanation: [
      'A Singly Linked List is a linear collection of data elements called "nodes", where each node points to the next node in sequence via a reference pointer (`next`). The last node points to `null`.',
      'A Doubly Linked List enhances each node with two pointers: `next` (successor) and `prev` (predecessor). This allows bidirectional traversal and enables $O(1)$ deletion of any given node without needing a reference to its predecessor.',
      'Memory Architecture in Java: Unlike arrays where elements reside in contiguous memory, linked list nodes are individually allocated on the JVM heap via `new Node()`. A 64-bit JVM with CompressedOOPs requires: 12 bytes object header + 4 bytes integer value + 4 bytes reference pointer + 4 bytes padding = 24 bytes minimum per singly-linked node. For a doubly-linked list node (adding a second 4-byte pointer), it occupies 24 bytes (header 12 + val 4 + next 4 + prev 4 = 24 bytes). This high pointer-to-data ratio results in massive memory amplification.',
      'CPU Cache Inefficiency: When traversing an array, the hardware CPU pre-fetcher loads consecutive elements into high-speed L1/L2 cache lines automatically. With linked lists, nodes are scattered across the heap, forcing the CPU to fetch from slow main RAM on almost every pointer dereference ("pointer chasing"). In practice, an `ArrayList` frequently outperforms a `LinkedList` even on insertions because array copying uses vectorized CPU instructions that outpace pointer chasing.',
      'The Dummy Sentinel Node Pattern: Manipulating the head of a linked list (inserting before head, deleting head, merging two lists) requires tedious null checks. Creating a dummy sentinel node (`ListNode dummy = new ListNode(0); dummy.next = head;`) ensures the head node always has a predecessor, eliminating special-casing and simplifying algorithms.',
      'In-Place Reversal: Reversing a singly linked list iteratively requires three pointers: `prev` (starts null), `curr` (starts head), and `nextTemp`. In each step, save `nextTemp = curr.next`, point `curr.next = prev`, advance `prev = curr`, and advance `curr = nextTemp`. When `curr == null`, `prev` points to the new head. Time complexity is $O(N)$ and auxiliary space is $O(1)$.',
      'The "Delete Node without Head" Trick: If given only a reference to a non-tail node to delete (without access to head), copy the value of `node.next` into `node.val` and bypass `node.next` (`node.next = node.next.next`). This achieves deletion in $O(1)$ time by overwriting data.'
    ],
    diagram: `+-----------------------------------------------------------+
|          SINGLY VS DOUBLY LINKED LIST HEAP LAYOUT         |
+-----------------------------------------------------------+
  SINGLY LINKED LIST:
  Head -> [ Val: 10 | Next: 0x200 ] -> [ Val: 20 | Next: 0x300 ] -> [ Val: 30 | Next: null ]
          Address: 0x100                Address: 0x200                Address: 0x300

  DOUBLY LINKED LIST:
  Head <-> [ Prev: null  | Val: 10 | Next: 0x500 ]
                       ^              |
                       |              v
           [ Prev: 0x400 | Val: 20 | Next: null  ] <-> Tail`,
    codeSnippet: {
      title: 'In-Place Singly Linked List Reversal in Java',
      code: `public class LinkedListReversal {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public static ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // 1. Save next
            curr.next = prev;              // 2. Reverse pointer
            prev = curr;                   // 3. Step prev forward
            curr = nextTemp;               // 4. Step curr forward
        }
        return prev; // New head of reversed list
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(3);

        ListNode rev = reverse(h);
        while (rev != null) {
            System.out.print(rev.val + " ");
            rev = rev.next;
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'ListNode nextTemp = curr.next;', explanation: 'Saves reference to remaining list before severing the link.' },
        { line: 'curr.next = prev;', explanation: 'Redirects pointer backward to previous node.' },
        { line: 'prev = curr; curr = nextTemp;', explanation: 'Advances both pointers one step forward for the next iteration.' }
      ],
      output: '3 2 1 '
    },
    codeExamples: [
      {
        title: 'Merge Two Sorted Lists using Dummy Sentinel Node',
        description: 'Merging two pre-sorted linked lists in O(N + M) time and O(1) auxiliary space.',
        code: `public class MergeListsDemo {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public static ListNode merge(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // Sentinel node
        ListNode tail = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1; l1 = l1.next;
            } else {
                tail.next = l2; l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode a = new ListNode(1); a.next = new ListNode(3);
        ListNode b = new ListNode(2); b.next = new ListNode(4);
        ListNode m = merge(a, b);
        while (m != null) { System.out.print(m.val + " "); m = m.next; }
    }
}`,
        output: '1 2 3 4 '
      },
      {
        title: 'Remove Nth Node From End of List in One Pass',
        description: 'Using two pointers separated by N steps to delete the Nth node from the end.',
        code: `public class RemoveNthFromEndDemo {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;

        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next; // Delete Nth node
        return dummy.next;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(10);
        h.next = new ListNode(20);
        h.next.next = new ListNode(30);
        ListNode res = removeNthFromEnd(h, 2); // Deletes 20
        while (res != null) { System.out.print(res.val + " "); res = res.next; }
    }
}`,
        output: '10 30 '
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Severing `curr.next` without saving it in a temporary variable first.',
        whyItHappens: 'Writing `curr.next = prev;` directly, which destroys the only reference to the remainder of the linked list.',
        howToFix: 'Always declare `ListNode nextTemp = curr.next;` as the very first line before re-linking.'
      },
      {
        mistake: 'Writing complex special-case branches for `head == null` or modifying the first node.',
        whyItHappens: 'Forgetting that deleting or inserting at index 0 requires changing the head pointer variable.',
        howToFix: 'Use a dummy sentinel node: `ListNode dummy = new ListNode(0); dummy.next = head;` and return `dummy.next`.'
      },
      {
        mistake: 'Assuming `java.util.LinkedList` is faster than `ArrayList` because insertions are $O(1)$.',
        whyItHappens: 'Overlooking that finding the insertion position in a linked list takes $O(N)$ pointer steps, and node allocations cause severe cache misses.',
        howToFix: 'Use `ArrayList` as the default list. Only use `LinkedList` if you are exclusively inserting/removing at the head/tail as a Deque.'
      },
      {
        mistake: 'Causing memory leaks by failing to nullify references in custom linked list deletions.',
        whyItHappens: 'Leaving unused pointers referencing old nodes, preventing the Garbage Collector from freeing memory.',
        howToFix: 'Explicitly nullify unneeded references (`node.prev = null; node.next = null;`) when detaching nodes.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Link Severance Pointer Loss Trap',
        problemStatement: 'What happens to the nodes after curr if `curr.next = prev;` executes without saving `curr.next`?',
        code: `ListNode prev = null, curr = head;
curr.next = prev; // No nextTemp saved!
curr = curr.next;`,
        options: [
          'The list reverses normally.',
          'The remaining nodes become unreachable and are lost to the garbage collector.',
          'curr advances to node 2.',
          'NullPointerException is thrown.'
        ],
        correctOptionIndex: 1,
        hint: 'If curr.next is set to null, how can you reach the next node in memory?',
        solution: 'The remaining nodes become unreachable and are lost to the garbage collector.',
        explanation: 'Because linked lists have no index access, the ONLY way to reach subsequent nodes is through `curr.next`. Setting `curr.next = null` permanently severs the reference path, leaving the rest of the list orphaned for garbage collection.'
      },
      {
        title: 'Puzzle 2: Dummy Sentinel Return Value',
        problemStatement: 'Why does the merge subroutine return `dummy.next` instead of `dummy`?',
        code: `ListNode dummy = new ListNode(0);
// ... stitching nodes ...
return dummy.next;`,
        options: [
          'Because dummy is null.',
          'Because dummy is an artificial placeholder node (value 0) created solely to simplify pointer updates.',
          'Because dummy causes a memory leak.',
          'To reverse the list.'
        ],
        correctOptionIndex: 1,
        hint: 'Was dummy part of the original input data or created by us?',
        solution: 'Because dummy is an artificial placeholder node (value 0) created solely to simplify pointer updates.',
        explanation: '`dummy` is a sentinel placeholder node with arbitrary value 0. Its sole purpose is to provide a fixed anchor so `tail.next = node` works without null-checking `head`. The actual merged list begins at `dummy.next`.'
      },
      {
        title: 'Puzzle 3: Delete Node without Head Reference',
        problemStatement: 'Given only a reference to node with value 2 in `1 -> 2 -> 3`, what does this trick do?',
        code: `node.val = node.next.val;
node.next = node.next.next;`,
        options: [
          'Deletes node 1',
          'Transforms list to 1 -> 3',
          'Throws NullPointerException',
          'Creates a cycle'
        ],
        correctOptionIndex: 1,
        hint: 'Node 2 copies value 3 from its neighbor, then bypasses the neighbor.',
        solution: 'Transforms list to 1 -> 3',
        explanation: 'The node with value 2 overwrites its value with 3, becoming `[val: 3]`. It then points its `next` pointer to `node.next.next` (null). The list becomes `1 -> 3`, effectively deleting 2 in $O(1)$ time without a head pointer.'
      },
      {
        title: 'Puzzle 4: Remove Nth Node Gap Size',
        problemStatement: 'In `removeNthFromEnd(head, n)`, why does the fast pointer advance `n + 1` steps from dummy?',
        code: `for (int i = 0; i <= n; i++) fast = fast.next;`,
        options: [
          'To skip the entire list.',
          'So that when fast reaches null, slow stops at the node IMMEDIATELY PRECEDING the node to be deleted.',
          'To test if n is valid.',
          'Because arrays are 0-indexed.'
        ],
        correctOptionIndex: 1,
        hint: 'To delete a node, does slow need to point to the node itself, or the node right before it?',
        solution: 'So that when fast reaches null, slow stops at the node IMMEDIATELY PRECEDING the node to be deleted.',
        explanation: 'To delete a node in a singly linked list (`slow.next = slow.next.next`), we must position `slow` at the predecessor node. Advancing `fast` by `n + 1` steps ensures `slow` halts exactly one node before the target when `fast` hits null.'
      },
      {
        title: 'Puzzle 5: Doubly Linked List Node Memory Size',
        problemStatement: 'On a 64-bit JVM with CompressedOOPs, what is the memory footprint of a `DoublyLinkedNode(int val, Node prev, Node next)`?',
        code: `class DNode { int val; DNode prev, next; }`,
        options: [
          '8 bytes',
          '12 bytes',
          '24 bytes',
          '64 bytes'
        ],
        correctOptionIndex: 2,
        hint: 'Header (12B) + int (4B) + prev pointer (4B) + next pointer (4B) = 24B.',
        solution: '24 bytes',
        explanation: 'Object Header = 12 bytes (8B Mark Word + 4B Klass pointer). Integer val = 4 bytes. Reference pointers = 4 bytes each (8B total with CompressedOOPs). Sum $= 12 + 4 + 8 = 24$ bytes. This is 6 times larger than a raw 4-byte primitive integer!'
      },
      {
        title: 'Puzzle 6: Reversing a List of Size 2',
        problemStatement: 'Trace `reverse(head)` for `1 -> 2 -> null`. What is returned?',
        code: `ListNode h = new ListNode(1); h.next = new ListNode(2);
ListNode rev = reverse(h);`,
        options: [
          '1 -> 2',
          '2 -> 1 -> null',
          'null',
          'Cycle between 1 and 2'
        ],
        correctOptionIndex: 1,
        hint: 'In step 1, 1 points to null. In step 2, 2 points to 1. Loop exits with prev pointing to 2.',
        solution: '2 -> 1 -> null',
        explanation: 'Iteration 1: `1.next = null; prev = 1; curr = 2`. Iteration 2: `2.next = 1; prev = 2; curr = null`. Loop terminates. Returns `prev` (node 2), producing `2 -> 1 -> null`.'
      },
      {
        title: 'Puzzle 7: Partition List Dummy Node Severance',
        problemStatement: 'In the partition list algorithm, why is `greater.next = null;` mandatory before returning?',
        code: `greater.next = null; // Why is this critical?
less.next = greaterDummy.next;`,
        options: [
          'To satisfy the garbage collector.',
          'To prevent cycles, because the last node in greater may still point to a node that was moved to the less list.',
          'To avoid NullPointerException.',
          'It is optional.'
        ],
        correctOptionIndex: 1,
        hint: 'If the last node in the greater list originally pointed to an element < X, what happens if its next pointer is not severed?',
        solution: 'To prevent cycles, because the last node in greater may still point to a node that was moved to the less list.',
        explanation: 'If the last node placed in `greater` originally pointed to a node that was appended to `less`, failing to set `greater.next = null` creates a fatal cycle in the linked list!'
      },
      {
        title: 'Puzzle 8: Single Element List Reversal',
        problemStatement: 'What does `reverse(head)` do when head contains a single node `[10]`?',
        code: `ListNode h = new ListNode(10);
ListNode r = reverse(h);`,
        options: [
          'Returns null',
          'Returns [10] pointing to null',
          'Throws NullPointerException',
          'Loops infinitely'
        ],
        correctOptionIndex: 1,
        hint: 'Iteration 1: nextTemp = null, 10.next = null, prev = 10, curr = null. Loop exits.',
        solution: 'Returns [10] pointing to null',
        explanation: 'On iteration 1, `10.next` is set to `prev` (null), `prev` becomes 10, and `curr` becomes null. The loop exits and returns `prev` (node 10). It handles single-node lists cleanly.'
      },
      {
        title: 'Puzzle 9: Deleting Node in Doubly Linked List',
        problemStatement: 'To delete middle node `x` in doubly linked list, which two pointer updates are required?',
        code: `// Disconnecting x from its predecessor and successor`,
        options: [
          'x.prev.next = x.next; x.next.prev = x.prev;',
          'x.next = null; x.prev = null;',
          'x.prev = x.next; x.next = x.prev;',
          'x.val = 0;'
        ],
        correctOptionIndex: 0,
        hint: 'The predecessor\'s next must bypass x to point to x.next, and successor\'s prev must point to x.prev.',
        solution: 'x.prev.next = x.next; x.next.prev = x.prev;',
        explanation: 'Updating `x.prev.next = x.next` and `x.next.prev = x.prev` cleanly splices node `x` out of the chain in $O(1)$ time.'
      },
      {
        title: 'Puzzle 10: Linked List Recursive Call Stack Footprint',
        problemStatement: 'What is the auxiliary space complexity of reversing a linked list recursively?',
        code: `public static ListNode revRec(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = revRec(head.next);
    head.next.next = head; head.next = null;
    return newHead;
}`,
        options: [
          'O(1) space',
          'O(N) space on JVM call stack',
          'O(N^2) space',
          'O(log N) space'
        ],
        correctOptionIndex: 1,
        hint: 'Does the method recurse N times before hitting the base case?',
        solution: 'O(N) space on JVM call stack',
        explanation: 'The recursive reversal dives to the end of the list, holding $N$ activation records concurrently on the thread call stack, consuming $O(N)$ auxiliary space.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does an ArrayList almost always outperform a LinkedList in real-world Java applications, even for insertions?',
        answer: 'Computer science textbooks often state that `LinkedList` has $O(1)$ insertion while `ArrayList` has $O(N)$ insertion. In practice, `ArrayList` is almost always faster due to three modern hardware and JVM realities: 1) CPU Cache Locality: `ArrayList` stores elements in contiguous memory. When element $i$ is accessed, the hardware CPU pre-fetcher loads the next 64 bytes into L1/L2 cache lines, allowing memory operations to execute in ~1 nanosecond. `LinkedList` nodes are scattered randomly across the heap; traversing them causes continuous CPU cache line misses (~100 nanoseconds per pointer hop). 2) Locating Insertion Position: While the actual pointer swap is $O(1)$, reaching the $K$-th position in a `LinkedList` requires $O(K)$ pointer hops. 3) Memory Overhead & GC Pressure: Each `LinkedList` node is a separate heap object (24 bytes minimum on 64-bit JVM for a 4-byte int). Creating millions of nodes strains garbage collection. In contrast, `ArrayList` shifting uses `System.arraycopy`, which compiles to high-speed SIMD/vectorized assembly instructions.',
        followUp: 'When would you genuinely choose LinkedList over ArrayList?',
        followUpAnswer: 'When memory is unbounded and you strictly need O(1) insertions and deletions at BOTH the head and tail without dynamic array resizing spikes, such as implementing an LRU cache or a Deque.',
        keyPhrases: [
          'Contiguous memory L1/L2 cache pre-fetching',
          'Pointer chasing cache miss penalty (~100ns vs ~1ns)',
          'Vectorized System.arraycopy SIMD efficiency',
          '24-byte object allocation overhead and GC churn'
        ],
        commonMistakeAnswer: 'Claiming LinkedList is always faster because insertion doesn\'t shift elements.'
      },
      {
        question: 'Explain the Sentinel (Dummy) Node pattern in linked list algorithms and why it is indispensable.',
        answer: 'In linked list manipulation, operations on the head node (`head`) are notoriously prone to bugs because: 1) Inserting before head requires modifying the head pointer itself. 2) Deleting the head requires reassigning head to `head.next`. 3) Merging lists requires special-case branching to determine which list supplies the initial head. The Sentinel (Dummy) Node pattern solves this by allocating an artificial temporary node: `ListNode dummy = new ListNode(0); dummy.next = head;`. By operating through `dummy`, EVERY node in the list (including the real head) is guaranteed to have a non-null predecessor node (`dummy`), eliminating special-case `if (head == null)` or `if (prev == null)` branches. At the conclusion of the algorithm, returning `dummy.next` seamlessly returns the true, modified head.',
        followUp: 'Does the dummy node create unnecessary garbage collection overhead?',
        followUpAnswer: 'A dummy node allocates a single 16-byte object on the heap that is immediately reclaimed in Eden space during minor GC, a negligible cost for complete bug elimination.',
        keyPhrases: [
          'Eliminating head pointer special-case branches',
          'Guaranteed non-null predecessor invariant',
          'Unified insertion and deletion logic',
          'Seamless return of dummy.next'
        ],
        commonMistakeAnswer: 'Returning dummy instead of dummy.next, including the arbitrary placeholder in the output.'
      },
      {
        question: 'How do you reverse a singly linked list iteratively in O(N) time and O(1) space?',
        answer: 'Iterative in-place reversal uses three pointers: `prev` (initialized to `null`), `curr` (initialized to `head`), and `nextTemp`: 1) While `curr != null`: 2) Save the remaining list: `nextTemp = curr.next;`. 3) Reverse the current node\'s pointer: `curr.next = prev;`. 4) Step `prev` forward: `prev = curr;`. 5) Step `curr` forward: `curr = nextTemp;`. When the loop terminates (`curr == null`), `prev` points to the new head of the reversed list. Because pointers are modified in-place, auxiliary space is strictly $O(1)$, and every node is visited exactly once in $O(N)$ time.',
        followUp: 'Why does recursive reversal consume O(N) auxiliary space?',
        followUpAnswer: 'Because recursive reversal pushes N activation frames onto the JVM call stack before unwinding from the tail back to the head, consuming O(N) stack memory.',
        keyPhrases: [
          'Three-pointer pattern: prev, curr, nextTemp',
          'Saving curr.next before severing link',
          'O(N) time and O(1) auxiliary space guarantee',
          'Termination when curr == null returns prev'
        ],
        commonMistakeAnswer: 'Forgetting to save curr.next, causing the rest of the list to be lost to GC.'
      },
      {
        question: 'How do you remove the Nth node from the end of a linked list in a single pass?',
        answer: 'Removing the $N$-th node from the end in a single pass uses the Two-Pointer Gap technique with a dummy node: 1) Create `ListNode dummy = new ListNode(0); dummy.next = head;`. 2) Initialize two pointers: `fast = dummy` and `slow = dummy`. 3) Advance `fast` forward by $N + 1$ steps. 4) Advance both `fast` and `slow` one step at a time until `fast == null`. Because `fast` is separated from `slow` by a fixed gap of $N + 1$ nodes, when `fast` reaches `null` (past the end of the list), `slow` is guaranteed to be positioned at the node IMMEDIATELY PRECEDING the node to be deleted! 5) Delete the target node: `slow.next = slow.next.next;`. 6) Return `dummy.next`. Time is $O(N)$ in a single pass, space is $O(1)$.',
        followUp: 'Why is fast advanced N + 1 steps rather than N steps?',
        followUpAnswer: 'Because slow must land on the predecessor node (one node before the target) to update slow.next.',
        keyPhrases: [
          'Two-pointer gap of N + 1 steps',
          'Single pass traversal',
          'Positioning slow at predecessor node',
          'O(N) time and O(1) space guarantee'
        ],
        commonMistakeAnswer: 'Scanning the list in pass 1 to count length L, then traversing L - N in pass 2.'
      },
      {
        question: 'How do you delete a node in a singly linked list in O(1) time if given only a reference to that node?',
        answer: 'In a singly linked list, standard deletion requires access to the predecessor node to redirect `prev.next = curr.next`. If given only a reference to `node` (and `node.next != null`), we cannot reach `prev`. However, we can perform an "identity theft" trick: 1) Copy the value of the next node into the current node: `node.val = node.next.val;`. 2) Bypass the next node: `node.next = node.next.next;`. The current node now assumes the identity of its successor, and the physical successor node is spliced out and garbage collected. This accomplishes deletion in strictly $O(1)$ time and $O(1)$ space.',
        followUp: 'What is the fatal limitation of this trick?',
        followUpAnswer: 'It cannot delete the very last node (tail) of the list because node.next is null, meaning there is no successor to copy from.',
        keyPhrases: [
          'Value copy and successor bypass trick',
          'O(1) time without head reference',
          'Inability to delete the tail node',
          'Garbage collection of orphaned successor'
        ],
        commonMistakeAnswer: 'Setting node = null, which only rebinds the local parameter variable without affecting the list.'
      },
      {
        question: 'How do you implement an LRU (Least Recently Used) Cache in O(1) time using a Doubly Linked List and HashMap?',
        answer: 'An LRU Cache requires $O(1)$ `get(key)` and $O(1)$ `put(key, val)`. It combines two data structures: 1) Doubly Linked List: stores nodes ordered by access recency. The most recently used node is at the head; the least recently used node is at the tail. Doubly linked nodes allow $O(1)$ removal and insertion: when a node is accessed, it is detached in $O(1)$ (`removeNode(node)`) and moved to the head (`addToHead(node)`). 2) HashMap (`Map<K, Node>`): maps each key to its corresponding doubly-linked node, providing $O(1)$ node lookup. When capacity is exceeded, the tail node (`tail.prev`) is evicted from both the list and the map in $O(1)$ time. This is the exact design behind Java\'s `LinkedHashMap` with `accessOrder = true`.',
        followUp: 'Why is a Doubly Linked List required instead of a Singly Linked List for LRU Cache?',
        followUpAnswer: 'Because removing a node from the middle of an LRU list in O(1) requires updating its predecessor\'s next pointer (node.prev.next = node.next), which is impossible in O(1) in a singly linked list.',
        keyPhrases: [
          'Doubly linked list recency ordering',
          'HashMap node pointer lookup in O(1)',
          'O(1) middle node detachment via prev pointer',
          'LinkedHashMap accessOrder implementation'
        ],
        commonMistakeAnswer: 'Using a Queue or ArrayList, where removing an element takes O(N) time.'
      },
      {
        question: 'How do you detect and fix memory leaks when manipulating linked lists in Java?',
        answer: 'Memory leaks in Java linked lists occur when detached nodes remain reachable through lingering reference pointers, preventing the Garbage Collector from freeing them: 1) Lingering Prev/Next Pointers: When detaching a node in a custom doubly linked list or clearing a cache, always nullify its pointers: `node.prev = null; node.next = null;`. 2) Large Object Payloads: If a node holds a reference to a large byte array or Bitmap, nullify `node.item = null;` upon deletion. In Java\'s standard `LinkedList`, the internal `unlink(Node<E> x)` method explicitly sets `x.item = null; x.next = null; x.prev = null;` to ensure prompt garbage collection.',
        followUp: 'How does Java\'s Generational GC handle linked list nodes allocated over time?',
        followUpAnswer: 'If nodes live long enough, they are promoted from Eden to Tenured (Old) generation. Scattered nodes across the old generation cause fragmentation and expensive Full GC compaction sweeps.',
        keyPhrases: [
          'Nullifying unlinked node references',
          'Preventing lingering pointer reachability',
          'LinkedList.unlink() implementation details',
          'Heap fragmentation in Tenured generation'
        ],
        commonMistakeAnswer: 'Assuming the Garbage Collector automatically cleans up nodes that still have references pointing to them.'
      },
      {
        question: 'How do you add two numbers represented by linked lists in reverse order?',
        answer: 'Given two linked lists representing numbers stored in reverse order (e.g. $342$ is `2 -> 4 -> 3`), the digits are aligned from least significant to most significant at the heads, mirroring elementary column addition: 1) Initialize `dummy = new ListNode(0)`, `cur = dummy`, and `carry = 0`. 2) Loop while `l1 != null || l2 != null || carry != 0`: 3) `sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0);`. 4) `carry = sum / 10;`. 5) `cur.next = new ListNode(sum % 10); cur = cur.next;`. 6) Advance `l1` and `l2` if non-null. When the loop terminates, `dummy.next` contains the sum linked list in $O(\\max(N, M))$ time and $O(\\max(N, M))$ space.',
        followUp: 'How would you solve this if the digits were stored in NORMAL (forward) order?',
        followUpAnswer: 'Push both lists onto two Stacks to reverse them, then pop digits and prepend new nodes to the result list with carry.',
        keyPhrases: [
          'Column addition simulation with carry',
          'Loop invariant while l1 != null || l2 != null || carry != 0',
          'O(max(N, M)) linear time guarantee',
          'Stack-based solution for forward-order digits'
        ],
        commonMistakeAnswer: 'Converting the linked list to an integer, which causes 64-bit long overflow on large inputs.'
      },
      {
        question: 'How do you partition a linked list around a value X while preserving original relative order?',
        answer: 'To partition a linked list around $X$ with stability, create two separate dummy chains: `lessDummy` (for nodes with `val < x`) and `greaterDummy` (for nodes with `val >= x`). Maintain two pointers `less = lessDummy` and `greater = greaterDummy`. Iterate through the original list: if `head.val < x`, attach to `less.next` and advance `less`; else attach to `greater.next` and advance `greater`. After the loop finishes: 1) CRITICAL: Terminate the greater list with `greater.next = null;` to prevent infinite cycles. 2) Connect the two partitions: `less.next = greaterDummy.next;`. 3) Return `lessDummy.next`. This runs in $O(N)$ time and $O(1)$ auxiliary space.',
        followUp: 'Why is setting greater.next = null mandatory?',
        followUpAnswer: 'Because if the last node in greater originally had its next pointer pointing to a node that was moved to less, a circular loop/cycle is created.',
        keyPhrases: [
          'Two dummy sentinel chains (less and greater)',
          'Preserving relative stability',
          'Mandatory greater.next = null cycle prevention',
          'O(N) time and O(1) auxiliary space'
        ],
        commonMistakeAnswer: 'Forgetting greater.next = null, causing an infinite loop in the returned list.'
      },
      {
        question: 'What is a Skip List, and how does it achieve O(log N) search on a linked list?',
        answer: 'A standard linked list cannot support binary search because reaching the midpoint takes $O(N)$ pointer steps. A Skip List (invented by William Pugh) augments a sorted linked list with multiple hierarchical layers of forward pointers: Layer 0 contains all $N$ elements; Layer 1 contains roughly $N/2$ elements; Layer 2 contains $N/4$ elements, up to Layer $\\log_2 N$. Searching begins at the highest layer: the algorithm scans forward until the next node is larger than the target, then drops down to the next lower layer. By skipping over large spans of elements, search, insertion, and deletion achieve $O(\\log N)$ average time, matching balanced trees (like Red-Black Trees) without requiring complex tree rotations. Java uses Skip Lists in `java.util.concurrent.ConcurrentSkipListMap`.',
        followUp: 'Why is ConcurrentSkipListMap preferred over ConcurrentHashMap for sorted concurrent data?',
        followUpAnswer: 'Because Skip Lists can be modified using lock-free CAS (Compare-And-Swap) pointer updates on individual nodes, whereas balancing Red-Black trees requires locking multi-node subtrees.',
        keyPhrases: [
          'Hierarchical probabilistic multi-layer express lanes',
          'O(log N) search, insertion, and deletion',
          'Avoiding Red-Black tree rotations',
          'ConcurrentSkipListMap lock-free CAS scaling'
        ],
        commonMistakeAnswer: 'Believing standard linked lists cannot ever be searched in O(log N) time.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the time complexity of accessing the $K$-th element in a singly linked list?',
        options: [
          '$O(1)$',
          '$O(K)$ which is $O(N)$ worst case',
          '$O(\\log N)$',
          '$O(N^2)$'
        ],
        correctIndex: 1,
        explanation: 'Linked lists do not support random access; reaching index $K$ requires traversing $K$ pointer hops.'
      },
      {
        question: 'What is the primary purpose of a Dummy Sentinel Node in linked list algorithms?',
        options: [
          'To increase heap memory consumption.',
          'To eliminate special-case edge handling when modifying the head node.',
          'To reverse the linked list.',
          'To enable multi-threading.'
        ],
        correctIndex: 1,
        explanation: 'A dummy sentinel node provides a guaranteed predecessor for head operations, eliminating null checks.'
      },
      {
        question: 'What is the auxiliary space complexity of iterative in-place linked list reversal?',
        options: [
          '$O(N)$',
          '$O(1)$',
          '$O(\\log N)$',
          '$O(N^2)$'
        ],
        correctIndex: 1,
        explanation: 'Iterative reversal updates pointers in-place using only three primitive references, requiring $O(1)$ auxiliary space.'
      },
      {
        question: 'How much memory does a singly linked list node typically consume on a 64-bit JVM with CompressedOOPs?',
        options: [
          '4 bytes',
          '8 bytes',
          '24 bytes',
          '64 bytes'
        ],
        correctIndex: 2,
        explanation: '12-byte header + 4-byte int + 4-byte reference pointer + 4-byte padding = 24 bytes.'
      },
      {
        question: 'What hardware limitation causes LinkedList traversal to be slower than ArrayList traversal?',
        options: [
          'CPU cache line misses caused by scattered heap node allocations ("pointer chasing").',
          'The GPU is not utilized.',
          'Garbage collection pauses on every read.',
          'Integer overflow.'
        ],
        correctIndex: 0,
        explanation: 'Scattered heap nodes prevent the CPU hardware pre-fetcher from loading sequential cache lines.'
      },
      {
        question: 'In `removeNthFromEnd(head, n)`, how many steps must the fast pointer advance from dummy before moving both pointers?',
        options: [
          '$n$',
          '$n - 1$',
          '$n + 1$',
          '$2n$'
        ],
        correctIndex: 2,
        explanation: 'Advancing $n + 1$ steps positions slow at the node immediately before the target when fast hits null.'
      },
      {
        question: 'What happens if you reverse `curr.next = prev;` without saving `curr.next` first?',
        options: [
          'The remaining list nodes become unreachable and are orphaned for garbage collection.',
          'The list doubles in size.',
          'An exception is thrown.',
          'The method restarts automatically.'
        ],
        correctIndex: 0,
        explanation: 'Severing `curr.next` without a temporary reference permanently loses the rest of the list.'
      },
      {
        question: 'How do you delete a non-tail node in $O(1)$ time given only a reference to that node?',
        options: [
          'Copy the next node\'s value into the current node and bypass the next node (`node.next = node.next.next`).',
          'Set `node = null`.',
          'Traverse to the head.',
          'Call `System.gc()`.'
        ],
        correctIndex: 0,
        explanation: 'Copying the successor\'s value and cutting out the successor node deletes the node in $O(1)$ time.'
      },
      {
        question: 'What two data structures are combined to build an LRU Cache with $O(1)$ operations?',
        options: [
          'Binary Search Tree and Stack',
          'Doubly Linked List and HashMap',
          'Array and PriorityQueue',
          'Two FIFO Queues'
        ],
        correctIndex: 1,
        explanation: 'A Doubly Linked List maintains access recency order, and a HashMap provides $O(1)$ node lookup.'
      },
      {
        question: 'What concurrent data structure implements a Skip List in Java?',
        options: [
          '`ConcurrentSkipListMap`',
          '`ConcurrentHashMap`',
          '`CopyOnWriteArrayList`',
          '`ArrayBlockingQueue`'
        ],
        correctIndex: 0,
        explanation: '`ConcurrentSkipListMap` uses lock-free CAS skip lists to maintain sorted key order under concurrency.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 16.4: Fast-Slow Pointers & Floyd's Cycle Detection
  // ─────────────────────────────────────────────────────────────
  'floyd-cycle-detection-and-pointers': {
    id: 'floyd-cycle-detection-and-pointers',
      moduleId: 'java-dsa-stacks-queues',
      moduleTitle: '16. Stacks, Queues & Lists',
      lessonNumber: 'Lesson 16.4',
      title: 'Fast-Slow Pointers & Floyd\'s Cycle Detection',
      subtitle: 'Tortoise and Hare algorithm, cycle existence detection, mathematical proof of cycle entrance node ($F = kC - a$), single-pass midpoint location, and in-place palindrome verification',
      estimatedMinutes: 24,
      beginnerAnalogy: 'Imagine two runners, Tortoise (running at 1 lap per hour) and Hare (running at 2 laps per hour), starting simultaneously on a track shaped like a magnifying glass (a straight path leading into a circular loop). If the track were infinitely straight, Hare would simply pull away forever and they would never meet. But because the track ends in a circular loop, Hare enters the loop, circles around, and eventually laps Tortoise from behind! The moment Hare and Tortoise collide at the exact same location, you have mathematically proven that the track contains a cycle! That is the core of Robert Floyd\'s Tortoise and Hare algorithm.',
      interviewTakeaways: [
        'Floyd\'s Cycle-Finding Algorithm: Uses two pointers moving at different speeds: `slow` advances 1 step per iteration, `fast` advances 2 steps. A collision (`slow == fast`) guarantees a cycle exists in $O(N)$ time and $O(1)$ space.',
        'No Infinite Loops: If a cycle of length $C$ exists, the distance between fast and slow decreases by exactly 1 node per iteration, guaranteeing a collision within $C$ iterations after slow enters the cycle.',
        'Mathematical Proof of Cycle Entrance: If distance from head to cycle entrance is $F$, distance from entrance to meeting point is $a$, and cycle length is $C$, then $2(F + a) = F + kC + a \\implies F = kC - a$. Resetting one pointer to `head` and advancing both 1 step causes them to collide at the cycle start.',
        'Single-Pass Midpoint Location: Fast-slow pointers find the middle node of a linked list in a single pass without pre-counting length. When fast reaches the end, slow is at the middle.',
        'In-Place Palindrome Linked List: Palindrome check in $O(N)$ time and $O(1)$ space: 1) find middle using fast-slow, 2) reverse second half, 3) compare two halves, 4) restore list.',
        'Intersection of Two Lists: Two pointers traversing `headA` then `headB` equalize total path lengths ($L_A + L_B$), guaranteeing collision at the intersection node in $O(N + M)$ time and $O(1)$ space.'
      ],
      cheatSheet: {
        summary: 'Floyd\'s Tortoise and Hare algorithm detects cycles in O(N) time and O(1) space. Resetting one pointer to head finds the cycle entrance.',
        syntaxTemplate: `// 1. Detect Cycle (Floyd's Algorithm)
public static boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true; // Collision!
    }
    return false; // Reached end, no cycle
}

// 2. Find Cycle Start Node
public static ListNode findCycleStart(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next; fast = fast.next.next;
        if (slow == fast) {
            ListNode p1 = head, p2 = slow;
            while (p1 != p2) { p1 = p1.next; p2 = p2.next; }
            return p1; // Cycle entrance!
        }
    }
    return null;
}`,
        rules: [
          {
            rule: 'Loop Condition Rule',
            explanation: 'Always guard fast pointer traversal with `while (fast != null && fast.next != null)` to avoid `NullPointerException`.'
          },
          {
            rule: 'Relative Speed Invariant',
            explanation: 'Fast moves 2 steps while slow moves 1 step. Inside a cycle, fast closes the gap by 1 node per iteration.'
          },
          {
            rule: 'Cycle Start Reset Rule',
            explanation: 'Upon collision, reset one pointer to `head` and advance both pointers by 1 step: they meet at the cycle entrance.'
          },
          {
            rule: 'Midpoint Invariant',
            explanation: 'When `fast.next == null` (odd length) or `fast == null` (even length), `slow` points to the middle node.'
          },
          {
            rule: 'Intersection Equalization Rule',
            explanation: 'Redirecting pointer A to head B and pointer B to head A traverses $Length(A) + Length(B)$, meeting at intersection.'
          }
        ],
        quickComparison: [
          {
            aspect: 'Cycle Detection Strategy',
            optionA: 'HashSet: O(N) Time, O(N) Auxiliary Space',
            optionB: 'Floyd\'s Algorithm: O(N) Time, O(1) Auxiliary Space'
          },
          {
            aspect: 'Pointers Speed',
            optionA: 'Slow Pointer: Advances 1 node per step',
            optionB: 'Fast Pointer: Advances 2 nodes per step'
          },
          {
            aspect: 'Collision Certainty',
            optionA: 'No Cycle: fast reaches null in N/2 iterations',
            optionB: 'Cycle Present: fast collides with slow in <= C iterations'
          },
          {
            aspect: 'Midpoint Discovery',
            optionA: 'Two-Pass: Count size N in pass 1, traverse N/2 in pass 2',
            optionB: 'Fast-Slow: Single pass, slow lands at N/2 when fast hits end'
          },
          {
            aspect: 'Palindrome Check',
            optionA: 'Stack / Array Copy: O(N) Time, O(N) Auxiliary Space',
            optionB: 'Fast-Slow + Reverse: O(N) Time, O(1) Auxiliary Space'
          }
        ]
      },
      coreExplanation: [
        'Floyd\'s Cycle-Finding Algorithm (also known as the Tortoise and Hare algorithm) is a pointer algorithm that uses two references moving at different speeds to detect loops in linked sequences.',
        'Why Fast-Slow Never Misses Inside a Cycle: When `slow` enters a cycle of length $C$, `fast` is already inside the cycle. The distance $D$ from `fast` to `slow` along the cycle decreases by 1 on every iteration ($2 - 1 = 1$). Because the distance decreases by 1 in discrete integer steps, it MUST reach 0 without skipping over `slow`. A collision is mathematically guaranteed within at most $C$ iterations.',
        'Mathematical Proof for Finding Cycle Entrance: Let $F$ be the distance from `head` to the cycle entrance, $C$ be the cycle length, and $a$ be the distance from the entrance to the collision point. When they meet: `distance(slow) = F + a`, and `distance(fast) = F + kC + a` (where $k \\ge 1$ is the number of full laps fast completed). Because fast travels at twice the speed of slow: $2(F + a) = F + kC + a \\implies 2F + 2a = F + kC + a \\implies F + a = kC \\implies F = kC - a$. This equation reveals that the distance from `head` to the entrance ($F$) is mathematically identical to the distance from the collision point to the entrance ($kC - a$). Therefore, resetting pointer 1 to `head` and advancing both pointer 1 and pointer 2 by 1 step ensures they collide at the exact cycle entrance!',
        'Finding Middle Node in One Pass: In an array, finding the middle element is $O(1)$ (`arr[n / 2]`). In a linked list, pre-counting length requires two passes. Fast-slow pointers solve this in a single pass: `slow = slow.next; fast = fast.next.next;`. When `fast` reaches the end of the list ($N$ steps), `slow` has traversed exactly $N/2$ steps, landing directly on the middle node.',
        'Palindrome Linked List in O(1) Space: Verifying whether a singly linked list is a palindrome in $O(1)$ auxiliary space combines three techniques: (1) Find middle node using fast-slow pointers; (2) Reverse the second half in-place; (3) Compare values from `head` and reversed second half; (4) (Optional clean code practice) Restore the original list by reversing the second half back.',
        'Intersection Node of Two Linked Lists: If two linked lists intersect, they share all nodes from the intersection to the tail. Pointer $A$ starts at `headA`, and pointer $B$ starts at `headB`. When pointer $A$ reaches `null`, redirect it to `headB`; when $B$ reaches `null`, redirect it to `headA`. Both pointers traverse exactly $L_A + L_B$ nodes. If an intersection exists, they collide at the intersection node; if not, both hit `null` simultaneously.'
      ],
      diagram: `+-----------------------------------------------------------+
|          MATHEMATICAL PROOF: FLOYD'S CYCLE ENTRANCE       |
+-----------------------------------------------------------+
             F (Head to Entrance)
  Head =========================> [ Cycle Entrance ]
                                     /            \\
                                    /              \\
                          C - a    |                |  a
                                   |    Collision   |
                                    \\   [ slow==fast ]
                                     \\            /
                                      +----------+
                          Total Cycle Circumference = C

  distance(slow) = F + a
  distance(fast) = F + k*C + a
  Since fast speed = 2 * slow speed:
  2 * (F + a) = F + k*C + a
  => 2F + 2a = F + k*C + a
  => F + a = k*C
  => F = k*C - a   <-- DISTANCE FROM HEAD == DISTANCE FROM COLLISION!`,
    codeSnippet: {
      title: 'Floyd\'s Cycle Detection and Entrance Discovery in Java',
      code: `public class FloydCycleDemo {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode detectCycleStart(ListNode head) {
        if (head == null) return null;
        ListNode slow = head, fast = head;
        boolean hasCycle = false;

        // Phase 1: Detect Collision
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }
        if (!hasCycle) return null;

        // Phase 2: Find Cycle Entrance (F = kC - a)
        ListNode p1 = head, p2 = slow;
        while (p1 != p2) {
            p1 = p1.next;
            p2 = p2.next;
        }
        return p1; // Cycle entrance node!
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(3);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(0);
        ListNode n4 = new ListNode(-4);
        n1.next = n2; n2.next = n3; n3.next = n4;
        n4.next = n2; // Loop: 3 -> 2 -> 0 -> -4 -> 2...

        ListNode start = detectCycleStart(n1);
        System.out.println("Cycle begins at node with value: " + (start != null ? start.val : "none"));
    }
}`,
      lineByLineExplanation: [
        { line: 'while (fast != null && fast.next != null)', explanation: 'Guards against NullPointerException when fast reaches list end.' },
        { line: 'slow = slow.next; fast = fast.next.next;', explanation: 'Slow moves 1 step; fast moves 2 steps, closing distance by 1 per cycle.' },
        { line: 'while (p1 != p2) { p1 = p1.next; p2 = p2.next; }', explanation: 'Advances both 1 step at a time; mathematical proof guarantees collision at entrance.' }
      ],
      output: 'Cycle begins at node with value: 2'
    },
    codeExamples: [
      {
        title: 'Find Middle Node of Linked List in a Single Pass',
        description: 'Using fast-slow pointers to find the middle node without pre-calculating list length.',
        code: `public class MiddleNodeDemo {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { this.val = v; }
    }

    public static ListNode findMiddle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    public static void main(String[] args) {
        ListNode h = new ListNode(1);
        h.next = new ListNode(2);
        h.next.next = new ListNode(3);
        h.next.next.next = new ListNode(4);
        h.next.next.next.next = new ListNode(5);

        System.out.println("Middle node: " + findMiddle(h).val); // 3
    }
}`,
        output: 'Middle node: 3'
      },
      {
        title: 'Happy Number Detection via Fast-Slow Pointer Cycle',
        description: 'Determining if a number is happy without using extra memory for a HashSet.',
        code: `public class HappyNumberDemo {
    private static int sumSquares(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            sum += d * d;
            n /= 10;
        }
        return sum;
    }

    public static boolean isHappy(int n) {
        int slow = n;
        int fast = sumSquares(n);
        while (fast != 1 && slow != fast) {
            slow = sumSquares(slow);
            fast = sumSquares(sumSquares(fast));
        }
        return fast == 1;
    }

    public static void main(String[] args) {
        System.out.println("19 is happy? " + isHappy(19));
        System.out.println("4 is happy? " + isHappy(4));
    }
}`,
        output: `19 is happy? true
4 is happy? false`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Writing `while (fast.next != null)` without checking `fast != null`.',
        whyItHappens: 'If `fast` becomes `null` on even-length lists, `fast.next` immediately crashes with `NullPointerException`.',
        howToFix: 'Always check both: `while (fast != null && fast.next != null)`. Short-circuit `&&` guards `fast.next`.'
      },
      {
        mistake: 'Using a `HashSet` to detect cycles in technical interviews.',
        whyItHappens: 'Using `HashSet.add(node)` works and runs in $O(N)$ time, but consumes $O(N)$ auxiliary memory.',
        howToFix: 'Interviewers expect Floyd\'s algorithm because it achieves $O(N)$ time with $O(1)$ auxiliary space.'
      },
      {
        mistake: 'Advancing fast by 2 steps in Phase 2 of cycle entrance detection.',
        whyItHappens: 'Forgetting that Phase 2 requires BOTH pointers to advance at the SAME SPEED (1 step per iteration).',
        howToFix: 'In Phase 2, `p1 = p1.next; p2 = p2.next;` advance at 1 step each to satisfy $F = kC - a$.'
      },
      {
        mistake: 'Failing to restore the linked list after checking for a palindrome.',
        whyItHappens: 'Leaving the second half of the list reversed, which corrupts the data structure for subsequent callers.',
        howToFix: 'Always reverse the second half back before returning the boolean result.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Fast Pointer NullPointerException Guard',
        problemStatement: 'Why is `while (fast != null && fast.next != null)` correct, but `while (fast.next != null)` buggy?',
        code: `// Loop condition evaluation`,
        options: [
          'Because fast could be negative.',
          'For even-length lists, fast reaches null, so checking fast.next causes NullPointerException.',
          'Because slow moves faster than fast.',
          'Both are identical.'
        ],
        correctOptionIndex: 1,
        hint: 'On an array of length 2, fast jumps from 0 to 2 (null). What happens if you inspect fast.next when fast is null?',
        solution: 'For even-length lists, fast reaches null, so checking fast.next causes NullPointerException.',
        explanation: 'In even-length lists, `fast` steps two nodes ahead and lands on `null`. If the loop only checks `fast.next != null`, dereferencing `null.next` throws `NullPointerException`. Short-circuit `fast != null && ...` prevents this.'
      },
      {
        title: 'Puzzle 2: Distance Reduction Rate Inside Cycle',
        problemStatement: 'If slow moves 1 step and fast moves 2 steps, by how many nodes does the gap between them decrease each iteration inside a cycle?',
        code: `// Relative speed inside cycle`,
        options: [
          '2 nodes',
          '1 node',
          '3 nodes',
          '0 nodes'
        ],
        correctOptionIndex: 1,
        hint: 'fast speed - slow speed = 2 - 1 = ?',
        solution: '1 node',
        explanation: 'Because fast travels at 2 steps/iteration and slow travels at 1 step/iteration, fast gains on slow by exactly $2 - 1 = 1$ node per iteration, guaranteeing a collision without jumping past slow.'
      },
      {
        title: 'Puzzle 3: Middle Node for Even Length List',
        problemStatement: 'Given list `1 -> 2 -> 3 -> 4`, what node does `while (fast != null && fast.next != null)` return as middle?',
        code: `// Initial: slow=1, fast=1
// Step 1: slow=2, fast=3
// Step 2: slow=3, fast=null -> loop terminates`,
        options: [
          'Node 2',
          'Node 3 (second middle node)',
          'Node 1',
          'Node 4'
        ],
        correctOptionIndex: 1,
        hint: 'On step 2, fast becomes null, leaving slow at index 2 (node with value 3).',
        solution: 'Node 3 (second middle node)',
        explanation: 'For even-length list `[1, 2, 3, 4]`, on step 1: `slow=2, fast=3`. On step 2: `slow=3, fast=null`. The loop terminates with `slow` pointing to node 3 (the second middle node, following LeetCode conventions).'
      },
      {
        title: 'Puzzle 4: Mathematical Meaning of F = kC - a',
        problemStatement: 'In Floyd\'s algorithm, what does the proof $F = kC - a$ tell us?',
        code: `// F = distance from head to cycle entrance
// a = distance from entrance to meeting point
// C = cycle length`,
        options: [
          'That fast travels in the wrong direction.',
          'That the distance from head to entrance equals the distance from the collision point to the entrance.',
          'That the cycle has no entrance.',
          'That the list cannot be reversed.'
        ],
        correctOptionIndex: 1,
        hint: 'kC is a full number of laps. Subtracting a leaves the distance from meeting point to cycle start.',
        solution: 'That the distance from head to entrance equals the distance from the collision point to the entrance.',
        explanation: '$F = kC - a$ proves that walking $F$ steps from the collision point brings you to the exact cycle entrance, identical to walking $F$ steps from `head`.'
      },
      {
        title: 'Puzzle 5: Intersection of Disjoint Lists',
        problemStatement: 'If two lists of length 3 and 5 DO NOT intersect, what happens when pointers switch heads?',
        code: `pA = (pA == null) ? headB : pA.next;
pB = (pB == null) ? headA : pB.next;`,
        options: [
          'They loop infinitely.',
          'Both reach null simultaneously at step 8 (3 + 5), and the loop terminates.',
          'Throws NullPointerException.',
          'One pointer overtakes the other.'
        ],
        correctOptionIndex: 1,
        hint: 'Both pointers traverse 3 + 5 = 8 nodes total.',
        solution: 'Both reach null simultaneously at step 8 (3 + 5), and the loop terminates.',
        explanation: 'Each pointer traverses $Length(A) + Length(B) = 3 + 5 = 8$ steps. Since they do not intersect, both hit `null` at the exact same step, exiting the loop and returning `null`.'
      },
      {
        title: 'Puzzle 6: Cycle Length Calculation Method',
        problemStatement: 'Once slow and fast collide, how can you determine the cycle length in $O(1)$ space?',
        code: `// Collision detected at node M`,
        options: [
          'Traverse from head again.',
          'Keep fast stationary at M, advance slow until it returns to M, counting steps.',
          'Divide list length by 2.',
          'Count pointers in a stack.'
        ],
        correctOptionIndex: 1,
        hint: 'Traversing around the circular loop once counts all nodes inside the cycle.',
        solution: 'Keep fast stationary at M, advance slow until it returns to M, counting steps.',
        explanation: 'Holding one pointer stationary at the meeting node and advancing the other pointer around the loop until it returns to the meeting point counts all $C$ nodes in the cycle in $O(C)$ time and $O(1)$ space.'
      },
      {
        title: 'Puzzle 7: Palindrome Check on Single Element',
        problemStatement: 'What does `isPalindrome(new ListNode(1))` return?',
        code: `if (head == null || head.next == null) return true;`,
        options: [
          'true',
          'false',
          'NullPointerException',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'A single element reads identically forwards and backwards.',
        solution: 'true',
        explanation: 'A linked list with 0 or 1 node is trivially a palindrome. The base case `if (head == null || head.next == null) return true;` returns true immediately.'
      },
      {
        title: 'Puzzle 8: Circular Linked List Head Re-entry',
        problemStatement: 'In a circular linked list where tail.next = head, where do slow and fast meet in Phase 2?',
        code: `// Cycle entrance is head itself (F = 0)`,
        options: [
          'At the tail node',
          'At head',
          'At the middle node',
          'They never meet'
        ],
        correctOptionIndex: 1,
        hint: 'If F = 0, distance from head to entrance is 0.',
        solution: 'At head',
        explanation: 'Because the entire list is a cycle, the entrance is `head` itself ($F = 0$). In Phase 2, `p1 = head` and `p2 = slow` are already at the entrance or meet at `head`.'
      },
      {
        title: 'Puzzle 9: Happy Number Cycle Termination',
        problemStatement: 'Why is fast-slow pointer detection applicable to Happy Number calculation?',
        code: `// Repeated sum of squares of digits`,
        options: [
          'Because numbers are stored in a linked list.',
          'Because the sequence of squared digit sums either reaches 1 or repeats values in an infinite cycle.',
          'Because digits are base 10.',
          'Because 19 is prime.'
        ],
        correctOptionIndex: 1,
        hint: 'Treat next sum of squared digits as next pointer in a virtual linked list.',
        solution: 'Because the sequence of squared digit sums either reaches 1 or repeats values in an infinite cycle.',
        explanation: 'The function $f(N) = \\sum d_i^2$ creates an implicit directed graph. Since numbers $\\le 1000$ map to values $\\le 3 \\times 9^2 = 243$, the values are finite, meaning the sequence MUST either terminate at 1 or cycle infinitely. Floyd\'s algorithm detects this cycle in $O(1)$ memory.'
      },
      {
        title: 'Puzzle 10: Reorder List Split Step Invariant',
        problemStatement: 'In `reorderList(head)`, why is `prev.next = null;` required after finding the middle?',
        code: `prev.next = null; // Sever link between first and second halves`,
        options: [
          'To reverse the first half.',
          'To break the linked list into two completely independent lists before interleaving.',
          'To delete the middle node.',
          'To prevent memory leaks.'
        ],
        correctOptionIndex: 1,
        hint: 'If the first half is not severed, it remains connected to the second half, creating cross-links.',
        solution: 'To break the linked list into two completely independent lists before interleaving.',
        explanation: 'Severing the link at `prev.next = null` splits the list into two cleanly separated lists: $L_1$ and $L_2$. This allows $L_2$ to be reversed and interleaved into $L_1$ without cyclic cross-references.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain Floyd\'s Cycle-Finding Algorithm and prove mathematically why resetting one pointer to head finds the cycle start.',
        answer: 'Floyd\'s algorithm operates in two phases: 1) Detection Phase: Pointer `slow` moves 1 step and `fast` moves 2 steps. Inside a cycle of length $C$, `fast` gains on `slow` by 1 node per iteration ($2 - 1 = 1$), guaranteeing a collision without jumping past slow. 2) Entrance Discovery: Let $F$ be the distance from `head` to the cycle entrance, $a$ be the distance from the entrance to the collision point, and $C$ be the cycle length. When they collide: distance traveled by slow $= F + a$; distance traveled by fast $= F + kC + a$ (where $k \\ge 1$ is fast\'s completed laps). Since fast moves at twice the speed of slow: $2(F + a) = F + kC + a \\implies 2F + 2a = F + kC + a \\implies F + a = kC \\implies F = kC - a$. This proves that the distance from `head` to the entrance ($F$) equals the remaining distance from the meeting point to the entrance ($kC - a$). Therefore, resetting pointer 1 to `head` and advancing both pointer 1 and pointer 2 at 1 step per iteration guarantees they collide at the exact cycle entrance!',
        followUp: 'What is the time and space complexity of both phases combined?',
        followUpAnswer: 'Time complexity is strictly O(N) where N is total nodes, and auxiliary space is O(1) using only two reference pointers.',
        keyPhrases: [
          'Two-phase algorithm: detection and entrance discovery',
          'Relative speed reduction of 1 node per iteration',
          'Mathematical derivation 2(F + a) = F + kC + a',
          'F = kC - a equivalence proof'
        ],
        commonMistakeAnswer: 'Explaining how to detect cycles but failing to prove mathematically why resetting to head works.'
      },
      {
        question: 'How do you check if a singly linked list is a palindrome in O(N) time and O(1) space?',
        answer: 'Checking a palindrome linked list in $O(1)$ space requires an elegant 4-step pipeline: 1) Find Middle: Use fast and slow pointers (`slow = slow.next; fast = fast.next.next;`). When `fast` reaches the end, `slow` is at the middle. 2) Reverse Second Half: Reverse the linked list starting from `slow` in-place using three pointers (`prev`, `curr`, `nextTemp`), running in $O(N/2)$ time and $O(1)$ space. 3) Compare Halves: Set `p1 = head` and `p2 = prev` (head of reversed second half). Compare `p1.val == p2.val` while advancing both until `p2 == null`. If any mismatch occurs, it is not a palindrome. 4) Restore List: Reverse the second half back and reconnect it to preserve data structure integrity. Total time is $O(N)$ and auxiliary space is strictly $O(1)$.',
        followUp: 'Why is an array or stack copy rejected in senior FAANG interviews for this problem?',
        followUpAnswer: 'Copying node values into an ArrayList or Stack takes O(N) auxiliary heap memory. Senior interviews strictly test whether you can manipulate pointers in O(1) memory.',
        keyPhrases: [
          'Four-step pipeline: find middle, reverse, compare, restore',
          'O(N) time and strictly O(1) auxiliary space',
          'Preserving data structure integrity by restoring list',
          'Rejection of O(N) ArrayList/Stack copying'
        ],
        commonMistakeAnswer: 'Reversing the list without restoring it, leaving the original list permanently mutated.'
      },
      {
        question: 'How do you find the intersection node of two singly linked lists in O(N + M) time and O(1) space?',
        answer: 'Two linked lists intersect if they merge into a common tail. Let the length of list A be $L_A$ and list B be $L_B$. We initialize `pA = headA` and `pB = headB`: 1) Advance both pointers one step at a time. 2) When `pA` reaches `null`, redirect it to `headB`. When `pB` reaches `null`, redirect it to `headA`. 3) Both pointers now traverse the exact same total distance: $L_A + L_B$. By swapping starting points, any difference in initial length $|L_A - L_B|$ is completely eliminated! If they intersect, `pA` and `pB` will point to the exact same node on their second pass; if they do not intersect, both will reach `null` simultaneously. Time is $O(L_A + L_B)$ and auxiliary space is $O(1)$.',
        followUp: 'How would you solve this using list lengths instead of pointer swapping?',
        followUpAnswer: 'Count length of A and B. Advance the longer list pointer by |L_A - L_B| steps so both pointers are equidistant from the tail, then walk both together.',
        keyPhrases: [
          'Path length equalization: L_A + L_B',
          'Redirecting to opposite head on null',
          'Eliminating length difference |L_A - L_B|',
          'O(N + M) time and O(1) auxiliary space'
        ],
        commonMistakeAnswer: 'Using a HashSet of nodes, which consumes O(N) extra memory.'
      },
      {
        question: 'How does Floyd\'s Cycle Detection solve the "Find the Duplicate Number" problem on an array (LeetCode 287)?',
        answer: 'In LeetCode 287, we are given an array of $N + 1$ integers where each integer is between $1$ and $N$, with guaranteed at least one duplicate. We must find the duplicate in $O(N)$ time and $O(1)$ space without modifying the array. This can be mapped directly to a Linked List Cycle problem! Treat the array indices as node memory addresses and array values `nums[i]` as `next` pointers (`next = nums[curr]`). Because values are between $1$ and $N$, index 0 has no incoming edges (it is the `head`). Because there are $N + 1$ elements with values $\\le N$, the Pigeonhole Principle guarantees that at least two indices point to the same value, creating a cycle! The entrance to the cycle is the duplicate number. Running Floyd\'s algorithm on `slow = nums[slow]` and `fast = nums[nums[fast]]` finds the duplicate in $O(N)$ time and $O(1)$ space.',
        followUp: 'Why does index 0 never belong to the cycle?',
        followUpAnswer: 'Because all numbers in the array are >= 1, no element in the array can ever have value 0 pointing back to index 0. Index 0 is strictly outside the cycle.',
        keyPhrases: [
          'Mapping array indices to linked list nodes (next = nums[i])',
          'Pigeonhole Principle cycle formation',
          'Duplicate number is the cycle entrance',
          'Read-only array traversal in O(1) space'
        ],
        commonMistakeAnswer: 'Sorting the array (violates read-only rule) or using a boolean visited array (violates O(1) space).'
      },
      {
        question: 'How do you find the length of a linked list cycle in O(1) space once a cycle is confirmed?',
        answer: 'Once `slow` and `fast` collide at meeting node $M$: 1) Hold `fast` stationary at node $M$. 2) Initialize `int length = 0`. 3) Advance `slow` one step at a time: `slow = slow.next; length++;`. 4) Continue advancing `slow` until `slow == fast` again. Because `slow` traversed around the circular loop exactly once from $M$ back to $M$, the variable `length` holds the exact number of nodes $C$ inside the cycle. Time complexity is $O(C)$ (proportional to cycle length) and auxiliary space is $O(1)$ with zero additional allocations.',
        followUp: 'How do you remove the cycle (break the loop)?',
        followUpAnswer: 'Find the cycle entrance using Phase 2. Then traverse around the cycle until reaching the node whose next pointer points to the entrance, and set its next = null.',
        keyPhrases: [
          'Stationary anchor node at collision point',
          'Counting steps for full loop traversal',
          'Cycle length C discovery in O(C) time',
          'Breaking cycle by setting predecessor.next = null'
        ],
        commonMistakeAnswer: 'Attempting to calculate cycle length using the number of iterations in Phase 1.'
      },
      {
        question: 'Why does fast-slow pointer traversal work for detecting odd vs even length linked lists?',
        answer: 'When finding the midpoint of a linked list using `slow = slow.next; fast = fast.next.next;`: 1) Odd Length List (e.g. 5 nodes): `fast` lands on the last node (`fast.next == null`), and `slow` lands on the exact single middle node (node 3). 2) Even Length List (e.g. 6 nodes): `fast` steps past the last node and becomes `null` (`fast == null`), while `slow` lands on the second middle node (node 4). Therefore, inspecting whether `fast == null` or `fast.next == null` when the loop exits reveals the parity of the list length in a single pass without computing `size % 2`.',
        followUp: 'What if an interview question requires returning the FIRST middle node for an even list?',
        followUpAnswer: 'Change the loop condition to while (fast.next != null && fast.next.next != null). For [1, 2, 3, 4], slow stops at node 2.',
        keyPhrases: [
          'Odd length: fast.next == null',
          'Even length: fast == null',
          'Second middle vs first middle node convention',
          'Loop condition while (fast.next != null && fast.next.next != null)'
        ],
        commonMistakeAnswer: 'Counting the list length in a separate loop first.'
      },
      {
        question: 'How do you reorder a linked list in-place from L0 -> L1 -> ... -> Ln into L0 -> Ln -> L1 -> Ln-1 in O(N) time?',
        answer: 'Reordering a list into folded zigzag order combines three core primitives in $O(N)$ time and $O(1)$ space: 1) Split at Midpoint: Use fast-slow pointers to find the middle node. Sever the connection between halves: `prev.next = null;`. We now have two independent lists: $L_1$ and $L_2$. 2) Reverse Second Half: Reverse list $L_2$ in-place using iterative three-pointer reversal. 3) Interleave Nodes: Merge the two lists by alternating nodes: save `n1 = p1.next` and `n2 = p2.next`, connect `p1.next = p2`, and connect `p2.next = n1`. Advance `p1 = n1` and `p2 = n2`. Because each step is $O(N)$ time and operates in-place, total time is $O(N)$ and space is $O(1)$.',
        followUp: 'What edge cases must be handled in reorderList?',
        followUpAnswer: 'Lists with 0, 1, or 2 nodes (which require no reordering and should return immediately).',
        keyPhrases: [
          'Split at midpoint with link severance',
          'In-place reversal of second half',
          'Two-pointer alternating node interleaving',
          'O(N) time and O(1) space guarantee'
        ],
        commonMistakeAnswer: 'Storing nodes in an ArrayList, which uses O(N) auxiliary memory.'
      },
      {
        question: 'Can fast-slow pointer detection be applied to detect cycles in functional sequences (Brent\'s algorithm vs Floyd\'s)?',
        answer: 'Yes! Floyd\'s cycle-finding algorithm and its optimization Brent\'s algorithm apply to ANY sequence generated by an iterated function $x_{i+1} = f(x_i)$ over a finite domain (such as random number generators, cryptographic hashes, or Pollard\'s rho algorithm for integer factorization). While Floyd\'s algorithm moves `slow` 1 step and `fast` 2 steps, Richard Brent\'s algorithm moves `fast` in powers of two ($1, 2, 4, 8, 16...$) and teleports `slow` to `fast` at each power of 2. Brent\'s algorithm performs on average 24% to 36% fewer function evaluations than Floyd\'s algorithm and guarantees finding the minimum cycle length directly.',
        followUp: 'Why is Floyd\'s algorithm still preferred in coding interviews over Brent\'s?',
        followUpAnswer: 'Floyd\'s algorithm is significantly simpler to implement and reason about, needing only two pointers and a while loop without power-of-two step tracking.',
        keyPhrases: [
          'Iterated function sequences x_{i+1} = f(x_i)',
          'Brent\'s power-of-two teleportation algorithm',
          'Pollard\'s rho integer factorization',
          'Fewer function evaluations in Brent\'s algorithm'
        ],
        commonMistakeAnswer: 'Believing cycle detection only applies to linked list data structures.'
      },
      {
        question: 'How do you segregate odd-indexed nodes from even-indexed nodes in a linked list in O(N) time and O(1) space?',
        answer: 'To group odd-indexed nodes followed by even-indexed nodes (LeetCode 328): 1) Guard base case: `if (head == null) return null;`. 2) Initialize `odd = head`, `even = head.next`, and save `evenHead = even`. 3) Loop `while (even != null && even.next != null)`: 4) Connect odd nodes: `odd.next = even.next; odd = odd.next;`. 5) Connect even nodes: `even.next = odd.next; even = even.next;`. 6) After the loop, link the tail of the odd list to the head of the even list: `odd.next = evenHead;`. 7) Return `head`. The nodes are rewired in a single pass in $O(N)$ time and $O(1)$ space without allocating new nodes.',
        followUp: 'Why is the loop condition while (even != null && even.next != null) instead of checking odd?',
        followUpAnswer: 'Because even is always ahead of odd. If even or even.next is null, the end of the list has been reached.',
        keyPhrases: [
          'Odd and even pointer chains',
          'Saving evenHead for final concatenation',
          'Loop invariant while even != null && even.next != null',
          'O(N) time and O(1) auxiliary space'
        ],
        commonMistakeAnswer: 'Creating new nodes and copying data instead of rearranging pointers in-place.'
      },
      {
        question: 'How do you split a Circular Linked List into two equal circular halves in O(1) space?',
        answer: 'To split a circular linked list into two circular lists: 1) Initialize `slow = head` and `fast = head`. 2) Advance pointers with modified circular conditions: `while (fast.next != head && fast.next.next != head)` advance `slow = slow.next` and `fast = fast.next.next`. 3) If the list has an even number of elements, advance `fast = fast.next` once more. 4) Set `head1 = head` and `head2 = slow.next`. 5) Close second circular list: `fast.next = slow.next;`. 6) Close first circular list: `slow.next = head;`. Both resulting lists are independent, perfectly formed circular linked lists, achieved in $O(N)$ time and $O(1)$ space.',
        followUp: 'What is the size distribution if the original list has an odd number of nodes?',
        followUpAnswer: 'The first circular half receives (N + 1)/2 nodes and the second half receives (N - 1)/2 nodes.',
        keyPhrases: [
          'Circular fast-slow pointer traversal',
          'Fast.next != head and fast.next.next != head loop guards',
          'Rewiring slow.next = head1 and fast.next = head2',
          'O(N) time and O(1) auxiliary space'
        ],
        commonMistakeAnswer: 'Breaking the circular link before locating both heads, causing lost node references.'
      }
    ],
    miniQuiz: [
      {
        question: 'In Floyd\'s cycle detection, how many steps does `slow` and `fast` move per iteration?',
        options: [
          'Slow moves 1 step; fast moves 2 steps.',
          'Slow moves 2 steps; fast moves 4 steps.',
          'Both move 1 step.',
          'Slow moves 1 step; fast moves 3 steps.'
        ],
        correctIndex: 0,
        explanation: 'The standard Tortoise and Hare algorithm advances slow by 1 step and fast by 2 steps.'
      },
      {
        question: 'What is the auxiliary space complexity of Floyd\'s Cycle-Finding Algorithm?',
        options: [
          '$O(N)$',
          '$O(1)$',
          '$O(\\log N)$',
          '$O(N^2)$'
        ],
        correctIndex: 1,
        explanation: 'Floyd\'s algorithm uses only two reference pointers (`slow` and `fast`), requiring $O(1)$ space.'
      },
      {
        question: 'Once a collision is detected in Floyd\'s algorithm, how do you find the cycle entrance node?',
        options: [
          'Reverse the list.',
          'Reset one pointer to `head`, advance both pointers by 1 step: they meet at the cycle entrance.',
          'Advance fast by 2 steps until it reaches head.',
          'Count the list length.'
        ],
        correctIndex: 1,
        explanation: 'The mathematical proof $F = kC - a$ establishes that moving both pointers 1 step converges at the entrance.'
      },
      {
        question: 'What does the fast-slow pointer technique find in a singly linked list in a single pass without cycles?',
        options: [
          'The maximum value.',
          'The middle node of the linked list.',
          'The cycle length.',
          'The sum of values.'
        ],
        correctIndex: 1,
        explanation: 'When fast reaches the end ($N$ steps), slow has covered $N/2$ steps, pointing to the middle node.'
      },
      {
        question: 'What is the time complexity of checking if a linked list is a palindrome using fast-slow pointers and in-place reversal?',
        options: [
          '$O(N^2)$',
          '$O(N)$',
          '$O(N \\log N)$',
          '$O(\\log N)$'
        ],
        correctIndex: 1,
        explanation: 'Finding middle, reversing second half, and comparing takes $O(N/2 + N/2 + N/2) = O(N)$ time.'
      },
      {
        question: 'Why does fast-slow cycle detection never jump over the slow pointer inside a cycle?',
        options: [
          'Because the fast pointer stops when close.',
          'Because the relative distance between fast and slow decreases by exactly 1 node per iteration.',
          'Because the cycle expands.',
          'Because Java locks the nodes.'
        ],
        correctIndex: 1,
        explanation: 'The distance decreases by 1 in discrete steps ($2 - 1 = 1$), making it impossible to skip over slow.'
      },
      {
        question: 'How do you find the intersection of two linked lists in $O(N + M)$ time and $O(1)$ space?',
        options: [
          'Traverse list A then switch to head B; traverse list B then switch to head A until pointers collide.',
          'Use two nested loops.',
          'Sort both lists.',
          'Store nodes in an array.'
        ],
        correctIndex: 0,
        explanation: 'Switching heads equalizes the total path lengths to $L_A + L_B$, causing them to collide at intersection.'
      },
      {
        question: 'In LeetCode 287 (Find Duplicate Number), how is the array mapped to a linked list cycle?',
        options: [
          'Elements are stored in a LinkedList.',
          'Array values act as `next` pointers: `next = nums[curr]`.',
          'Array is sorted.',
          'Array elements are hashed.'
        ],
        correctIndex: 1,
        explanation: 'Treating `nums[i]` as a pointer creates a directed graph where the duplicate value is the cycle entrance.'
      },
      {
        question: 'What happens when `fast` reaches `null` in `while (fast != null && fast.next != null)`?',
        options: [
          'The list contains a cycle.',
          'The list does NOT contain a cycle (reached end of list).',
          'A NullPointerException is thrown.',
          'The loop restarts.'
        ],
        correctIndex: 1,
        explanation: 'Reaching `null` proves the list terminates, meaning no cycle exists.'
      },
      {
        question: 'Why is `pA = (pA == null) ? headB : pA.next;` used in intersection finding?',
        options: [
          'To reverse list A.',
          'To ensure both pointers traverse the same total distance ($L_A + L_B$).',
          'To avoid stack overflow.',
          'To check for cycles.'
        ],
        correctIndex: 1,
        explanation: 'Switching heads equalizes traversal length, canceling out the difference $|L_A - L_B|$.'
      }
    ]
  }
};
