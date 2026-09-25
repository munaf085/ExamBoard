import { DetailedLesson } from '../../detailedLessons';

export const cf44_46_lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 5.1: The For Loop Deep Dive
  // ─────────────────────────────────────────────────────────────
  'for-loop-deep-dive': {
    id: 'for-loop-deep-dive',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.1',
    title: 'The For Loop Deep Dive',
    subtitle: 'Mastering the three-part loop header, execution cycle, multi-variable declarations, scoping rules, and complexity patterns',
    estimatedMinutes: 18,
    beginnerAnalogy: 'Think of an Olympic swimmer practicing laps. Before entering the water, the coach sets the counter to lap 1 (initialization, happens once). Before pushing off for each lap, the swimmer glances at the scoreboard to check if they have reached the goal of 10 laps (condition check, happens before each lap). The swimmer swims across the pool (loop body). After reaching the far wall, the swimmer clicks the lap counter by +1 (update expression, happens after the lap). If the counter reaches 11, the swimmer exits the pool.',
    coreExplanation: [
      'The standard `for` loop is Java\'s primary count-controlled iteration construct, best suited for iterations where the initialization, condition, and update naturally belong together.',
      'The loop header consists of three distinct clauses separated by semicolons: `for (initialization; condition; update)`. All three clauses are optional, but the two separating semicolons are mandatory.',
      'Execution Lifecycle: (1) Execute initialization expression(s) exactly once upon entry; (2) Evaluate the condition boolean expression; (3) If true, execute the loop body; (4) Execute the update expression(s); (5) Repeat from step 2 until the condition evaluates to false.',
      'Loop Counter Scoping: A variable declared in the initialization clause (e.g., `for (int i = 0; ...)`) has block scope restricted strictly to the loop header and body. If you need the counter after the loop terminates, declare it in the enclosing scope before the header.',
      'Update Clause Statement Restrictions: The update clause must consist of legal statement expressions: assignments (e.g., `i = i + 2`), prefix/postfix increments/decrements (`i++`, `--i`), or method calls. Arbitrary non-statement expressions like `i < 5` or `i + 1` cause a compile-time "not a statement" error.',
      'Multiple Variables in Header: You may declare multiple variables in the initialization clause, provided they share the exact same data type (e.g., `for (int i = 0, j = 10; i < j; i++, j--)`). Mixed types like `int i = 0, double d = 1.0` are illegal.',
      'Jump Statements Preview: A `continue` statement inside the loop skips the remaining body statements and jumps immediately to the update expression before re-evaluating the condition. A `break` statement exits the loop immediately, bypassing the update clause.',
      'The Infinite Loop Contract: Omitting the condition clause defaults implicitly to `true`. Consequently, `for (;;)` produces a legal, infinite loop that compiles to the exact same bytecode branching structure as `while (true)`.'
    ],
    diagram: `+-----------------------------------------------------------+
|                  FOR LOOP EXECUTION CYCLE                 |
+-----------------------------------------------------------+

   [ 1. INITIALIZATION ]  (Runs ONCE on entry: int i = 0)
             |
             v
   +---> [ 2. CONDITION CHECK ]  (Pre-test: i < 5)
   |             |
   |      +------+------+
   |      |             |
   |   (true)        (false)
   |      |             |
   |      v             v
   |   [ 3. LOOP BODY ]     [ EXIT LOOP ]
   |      System.out.println(i);
   |      |
   |      +--------------------+ (continue jumps here)
   |      |                    |
   |      v                    | (break exits directly)
   |   [ 4. UPDATE ] <---------+
   |      Post-step: i++
   +------+`,
    codeSnippet: {
      title: 'Counting Even Numbers and Accumulating Sum',
      code: `public class ForLoopDemo {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 2; i <= 10; i += 2) {
            sum += i;
            System.out.println("Added: " + i + " | Current Sum: " + sum);
        }
        System.out.println("Final Sum: " + sum);
    }
}`,
      lineByLineExplanation: [
        { line: 'int sum = 0;', explanation: 'Initializes the accumulator variable before loop entry so it remains in scope after the loop terminates.' },
        { line: 'for (int i = 2; i <= 10; i += 2) {', explanation: 'Loop header: declares loop counter i=2 (runs once), checks if i <= 10 before each pass, and increments i by 2 after each pass.' },
        { line: 'sum += i;', explanation: 'Adds the current even number to the accumulator during each iteration.' },
        { line: 'System.out.println(...);', explanation: 'Prints the current step details for tracking the loop state.' },
        { line: 'System.out.println("Final Sum: " + sum);', explanation: 'Outputs the final aggregated result after the loop completes all 5 iterations.' }
      ],
      output: `Added: 2 | Current Sum: 2
Added: 4 | Current Sum: 6
Added: 6 | Current Sum: 12
Added: 8 | Current Sum: 20
Added: 10 | Current Sum: 30
Final Sum: 30`
    },
    codeExamples: [
      {
        title: 'Countdown with Custom Decrement Step',
        description: 'Demonstrates a loop counting backward from 20 to 5 by steps of 5.',
        code: `public class CountdownDemo {
    public static void main(String[] args) {
        for (int timer = 20; timer >= 5; timer -= 5) {
            System.out.println("T-minus: " + timer + " seconds");
        }
        System.out.println("Ignition!");
    }
}`,
        output: `T-minus: 20 seconds
T-minus: 15 seconds
T-minus: 10 seconds
T-minus: 5 seconds
Ignition!`
      },
      {
        title: 'Optional Clauses & Counter Scope Comparison',
        description: 'Contrasting a counter declared in the header vs declared prior in the enclosing block, and omitting initialization or update clauses.',
        code: `public class OptionalClausesAndScope {
    public static void main(String[] args) {
        // Example A: Variable declared in outer scope persists after loop
        int counter = 0;
        for (; counter < 3; counter++) {
            System.out.print(counter + " ");
        }
        System.out.println("| Counter after loop: " + counter);

        // Example B: Update performed inside the body, update clause omitted
        for (int k = 1; k <= 4; ) {
            System.out.print(k + " ");
            k *= 2; // manual update
        }
        System.out.println();
    }
}`,
        output: `0 1 2 | Counter after loop: 3
1 2 4 `
      },
      {
        title: 'Two-Pointer Converging Loop with Break and Continue',
        description: 'Demonstrates multi-variable initialization and how continue jumps directly to the update clause while break terminates immediately.',
        code: `public class LoopControlFlow {
    public static void main(String[] args) {
        for (int left = 1, right = 9; left < right; left++, right--) {
            if (left == 3) {
                // Skips printing for left=3, but still increments left & decrements right!
                continue;
            }
            if (left > 4) {
                break;
            }
            System.out.println("Pair: (" + left + ", " + right + ") | Diff: " + (right - left));
        }
    }
}`,
        output: `Pair: (1, 9) | Diff: 8
Pair: (2, 8) | Diff: 6
Pair: (4, 6) | Diff: 2`
      },
      {
        title: 'Geometric Progression via Multiplicative Step',
        description: 'Demonstrates scaling the loop counter exponentially using multiplication instead of addition.',
        code: `public class PowersOfTwo {
    public static void main(String[] args) {
        for (int power = 1; power <= 32; power *= 2) {
            System.out.print(power + " ");
        }
        System.out.println();
    }
}`,
        output: '1 2 4 8 16 32'
      },
      {
        title: 'The Integer Overflow Trap',
        description: 'Demonstrates what occurs when a loop counter reaches Integer.MAX_VALUE and wraps around to negative values.',
        code: `public class IntegerOverflowTrap {
    public static void main(String[] args) {
        // Counting near Integer.MAX_VALUE
        int max = Integer.MAX_VALUE;
        int steps = 0;
        for (int i = max - 2; i > 0; i++) {
            System.out.println("Step " + (++steps) + ": i = " + i);
        }
        System.out.println("Loop exited because i wrapped to negative Integer.MIN_VALUE!");
    }
}`,
        output: `Step 1: i = 2147483645
Step 2: i = 2147483646
Step 3: i = 2147483647
Loop exited because i wrapped to negative Integer.MIN_VALUE!`
      }
    ],
    cheatSheet: {
      summary: 'Count-controlled pre-tested loop packing initialization, condition testing, and iteration stepping into a single structured header.',
      syntaxTemplate: `for (initialization; booleanCondition; updateExpression) {
    // Statements executed repeatedly while booleanCondition is true
}`,
      rules: [
        { rule: 'Initialization Timing', explanation: 'Runs exactly once before the condition is ever tested. Can declare multiple variables of the same type.' },
        { rule: 'Pre-Test Condition', explanation: 'Evaluated before every iteration (including the first). If initially false, the loop body executes 0 times.' },
        { rule: 'Post-Iteration Update', explanation: 'Executes strictly at the end of each iteration, immediately before the condition is re-evaluated. Must be a statement expression.' },
        { rule: 'Block Scope of Counter', explanation: 'Variables declared in the header exist only within the loop construct and cannot be accessed outside.' },
        { rule: 'Continue vs Break', explanation: 'continue jumps immediately to the update expression; break immediately exits the loop entirely.' },
        { rule: 'Omitted Clauses', explanation: 'All three parts are optional. Omitting the condition creates an infinite loop: for (;;) is identical to while (true).' },
        { rule: 'Semicolon Hazard', explanation: 'Placing a semicolon directly after the header (for (...);) binds an empty body, running the loop to completion before executing the next block once.' }
      ],
      quickComparison: [
        { aspect: 'Linear Step (i++)', optionA: 'for (int i = 0; i < n; i++)', optionB: 'Time: O(n) | Space: O(1) — Standard canonical traversal' },
        { aspect: 'Skip Step (i += k)', optionA: 'for (int i = 0; i < n; i += k)', optionB: 'Time: O(n/k) = O(n) | Space: O(1) — Even/odd or stride sampling' },
        { aspect: 'Geometric (i *= 2)', optionA: 'for (int i = 1; i <= n; i *= 2)', optionB: 'Time: O(log n) | Space: O(1) — Powers, binary subdivisions' },
        { aspect: 'Two Pointers', optionA: 'for (int i = 0, j = n-1; i < j; i++, j--)', optionB: 'Time: O(n) | Space: O(1) — Converging bilateral scans' },
        { aspect: 'Nested Loops', optionA: 'for (int i = 0; i < n; i++) { for (int j = 0; j < n; j++) }', optionB: 'Time: O(n^2) | Space: O(1) — Matrix / grid iterations' },
        { aspect: 'for vs while Bytecode', optionA: 'for: Compiles to conditional branches (if_icmp*) & jumps (goto)', optionB: 'while: Compiles to identical branch and jump instructions (goto, if_icmp*)' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Placing a semicolon immediately after the for loop header: `for (int i = 0; i < 5; i++); { System.out.println(i); }`',
        whyItHappens: 'Habit of ending Java statements with a semicolon. The semicolon acts as an empty statement body, executing 5 empty cycles. Then the subsequent block `{}` attempts to access `i`, triggering a compilation error.',
        howToFix: 'Never place a semicolon directly after the closing parenthesis of a `for` loop header. Always attach a curly-braced block: `for (int i = 0; i < 5; i++) { ... }`.'
      },
      {
        mistake: 'Off-by-one errors with loop boundaries: using `<` instead of `<=` or vice versa.',
        whyItHappens: 'Confusion between 0-indexed count iterations (e.g. `i = 0; i < N`) and 1-indexed human counting (e.g. `i = 1; i <= N`).',
        howToFix: 'Adopt standard idioms: use `for (int i = 0; i < n; i++)` to repeat `n` times from 0 to n-1, and `for (int i = 1; i <= n; i++)` to repeat `n` times from 1 to n.'
      },
      {
        mistake: 'Infinite loop due to wrong step direction or integer overflow: `for (int i = 0; i >= 0; i++)` or `for (int i = 10; i > 0; i++)`',
        whyItHappens: 'Typing `i++` instead of `i--` when counting backwards, or relying on `i >= 0` with integer overflow wrapping back to negative.',
        howToFix: 'Double check that the update expression steps towards the termination boundary. For decrementing loops, use `i--`. Avoid `i >= 0` with increments.'
      },
      {
        mistake: 'Unintentionally modifying the loop counter inside the loop body: `for (int i = 0; i < 10; i++) { i++; }`',
        whyItHappens: 'Adding manual increments inside the body while also retaining the header update, causing the counter to advance twice per cycle and skip values.',
        howToFix: 'Rely on the header update clause (`i++`) to advance the loop counter. Avoid mutating the primary counter variable inside the body unless building custom skip logic.'
      },
      {
        mistake: 'Placing a non-statement expression in the update clause: `for (int i = 0; i < 5; i < 5)` or `for (int i = 0; i < 5; i + 1)`',
        whyItHappens: 'Assuming the update slot can take any expression, including comparisons or pure values.',
        howToFix: 'The update slot only accepts statement expressions (assignments, pre/post increment or decrement, or method calls). Use `i++` or `i = i + 1`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Basic Counter and Post-Increment',
        problemStatement: 'Determine the exact output printed by this program.',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 1; i <= 5; i += 2) {
            count += i;
        }
        System.out.println(count);
    }
}`,
        options: ['6', '9', '15', '25'],
        correctOptionIndex: 1,
        hint: 'List the values of i that satisfy i <= 5 when starting at 1 and incrementing by 2.',
        solution: '9',
        explanation: 'i takes the values 1, 3, and 5. When i = 7, 7 <= 5 is false. Sum = 1 + 3 + 5 = 9.'
      },
      {
        title: 'Puzzle 2: Two Converging Pointers',
        problemStatement: 'What does this program print to standard output?',
        code: `public class Puzzle2 {
    public static void main(String[] args) {
        int ops = 0;
        for (int a = 0, b = 6; a < b; a++, b--) {
            ops++;
        }
        System.out.println(ops);
    }
}`,
        options: ['2', '3', '4', '6'],
        correctOptionIndex: 1,
        hint: 'Track (a, b) at each iteration: Iteration 1: (0, 6) -> next (1, 5). Keep going until a < b is false.',
        solution: '3',
        explanation: 'Iteration 1: a=0, b=6 (ops=1) -> update a=1, b=5. Iteration 2: a=1, b=5 (ops=2) -> update a=2, b=4. Iteration 3: a=2, b=4 (ops=3) -> update a=3, b=3. Check: 3 < 3 is false. Loop terminates. Output is 3.'
      },
      {
        title: 'Puzzle 3: Geometric Progression Counter',
        problemStatement: 'How many times does the loop body execute in this snippet?',
        code: `public class Puzzle3 {
    public static void main(String[] args) {
        int ticks = 0;
        for (int k = 1; k < 30; k *= 3) {
            ticks++;
        }
        System.out.println(ticks);
    }
}`,
        options: ['3', '4', '5', '10'],
        correctOptionIndex: 1,
        hint: 'Calculate values of k: 1, 3, 9, 27, 81...',
        solution: '4',
        explanation: 'Values of k tested: k=1 (true, ticks=1) -> k=3 (true, ticks=2) -> k=9 (true, ticks=3) -> k=27 (true, ticks=4) -> k=81 (81 < 30 is false). Total iterations = 4.'
      },
      {
        title: 'Puzzle 4: The Semicolon Loop Trap',
        problemStatement: 'What is the output of the following code snippet?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        int x = 10;
        int i;
        for (i = 0; i < 3; i++);
        {
            x += i;
        }
        System.out.println("x=" + x + ", i=" + i);
    }
}`,
        options: ['x=13, i=3', 'x=10, i=3', 'x=16, i=3', 'Compilation Error'],
        correctOptionIndex: 0,
        hint: 'Notice the semicolon after the for loop header: for (i = 0; i < 3; i++);',
        solution: 'x=13, i=3',
        explanation: 'The semicolon after the for header creates an empty body that loops 3 times until i becomes 3. The subsequent braced block is just an independent block executed once with i=3. Thus x becomes 10 + 3 = 13, and i is 3.'
      },
      {
        title: 'Puzzle 5: Mutating Loop Variable Inside Body',
        problemStatement: 'Analyze the following code and determine the output.',
        code: `public class Puzzle5 {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 8; i++) {
            if (i % 2 == 0) {
                i++;
            }
            count++;
        }
        System.out.println(count);
    }
}`,
        options: ['4', '5', '8', 'Infinite loop'],
        correctOptionIndex: 0,
        hint: 'Trace i and count step by step, remembering that the header update i++ also runs after each iteration.',
        solution: '4',
        explanation: 'Pass 1: i=0 (even) -> i becomes 1 -> count=1 -> header i++ -> i=2. Pass 2: i=2 (even) -> i becomes 3 -> count=2 -> header i++ -> i=4. Pass 3: i=4 (even) -> i becomes 5 -> count=3 -> header i++ -> i=6. Pass 4: i=6 (even) -> i becomes 7 -> count=4 -> header i++ -> i=8. 8 < 8 is false. Total count is 4.'
      },
      {
        title: 'Puzzle 6: Loop Counter Outside Scope',
        problemStatement: 'What happens when compiling and running this code?',
        code: `public class Puzzle6 {
    public static void main(String[] args) {
        for (int k = 0; k < 5; k++) {
            // work
        }
        System.out.println(k);
    }
}`,
        options: ['Prints 5', 'Prints 4', 'Prints 0', 'Compile-time error: cannot find symbol k'],
        correctOptionIndex: 3,
        hint: 'Where was variable k declared? What is its scope?',
        solution: 'Compile-time error: cannot find symbol k',
        explanation: 'Variable k is declared inside the initialization clause of the for loop. Its scope is strictly confined to the loop. Referencing k outside the loop results in a compile-time error.'
      },
      {
        title: 'Puzzle 7: Decrementing Loop with Boundary',
        problemStatement: 'What will be printed by the following code?',
        code: `public class Puzzle7 {
    public static void main(String[] args) {
        int result = 1;
        for (int n = 4; n > 1; n--) {
            result *= n;
        }
        System.out.println(result);
    }
}`,
        options: ['12', '24', '4', '1'],
        correctOptionIndex: 1,
        hint: 'Notice the condition n > 1. What values does n take inside the body?',
        solution: '24',
        explanation: 'Values of n inside the loop: 4, 3, 2. When n reaches 1, 1 > 1 is false. Result = 1 * 4 * 3 * 2 = 24.'
      },
      {
        title: 'Puzzle 8: Compound Boolean Condition in Header',
        problemStatement: 'What is printed after executing this loop?',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        int a = 0;
        int b = 10;
        for (int i = 0; i < 5 && b > 4; i++) {
            a += i;
            b -= 2;
        }
        System.out.println("a=" + a + ", b=" + b);
    }
}`,
        options: ['a=10, b=0', 'a=6, b=4', 'a=3, b=4', 'a=6, b=2'],
        correctOptionIndex: 2,
        hint: 'Check both conditions (i < 5 && b > 4) before each iteration.',
        solution: 'a=3, b=4',
        explanation: 'Iteration 0 (i=0, b=10): a becomes 0, b becomes 8. Iteration 1 (i=1, b=8): a becomes 1, b becomes 6. Iteration 2 (i=2, b=6): a becomes 3, b becomes 4. Before iteration 3 (i=3, b=4): the condition 4 > 4 evaluates to false, terminating the loop. Final values are a=3 and b=4.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you describe the exact execution sequence of a standard for loop header in Java?',
        answer: 'When Java enters a for loop, the initialization clause executes first and exactly once. Immediately following that, Java evaluates the termination condition. If the condition is true, the loop body executes. After the loop body finishes the current iteration, Java executes the update expression. Finally, execution cycles back to evaluate the condition again. This cycle repeats until the condition evaluates to false, at which point control jumps past the loop body.',
        followUp: 'If the condition evaluates to false on the very first check, how many times does the update expression run?',
        followUpAnswer: 'Zero times. The update expression only executes after a successful completion of the loop body. If the initial condition check is false, neither the loop body nor the update expression ever executes.',
        keyPhrases: ['Initialization runs once', 'Condition is a pre-test', 'Update runs after the body', '0 executions if condition is initially false'],
        commonMistakeAnswer: 'Believing that the update expression runs immediately after initialization or before the body.'
      },
      {
        question: 'What is the scope of a variable declared inside the for loop header?',
        answer: 'A variable declared within the for loop initialization clause, such as `for (int i = 0; ...)`, is scoped strictly to the loop header and its body block. Once the loop terminates and control leaves the loop\'s closing brace, the variable ceases to exist. Any attempt to reference it outside causes a compile-time "cannot find symbol" error.',
        followUp: 'How can you retain the final value of the loop counter after the loop terminates?',
        followUpAnswer: 'Declare the variable outside and before the loop header: `int i; for (i = 0; i < 10; i++) { ... }`. Because `i` was declared in the enclosing scope, it remains accessible after the loop finishes, holding the value that caused the condition to fail (e.g. 10).',
        keyPhrases: ['Block scope', 'Cannot find symbol', 'Declare outside loop to preserve value'],
        commonMistakeAnswer: 'Assuming the loop variable automatically persists in the method scope.'
      },
      {
        question: 'How does a for loop differ from a while loop in terms of syntax, design intent, and bytecode?',
        answer: 'In terms of design intent, a `for` loop is preferred when initialization, condition testing, and iteration stepping naturally belong together (count-controlled or bounded iteration), which keeps the loop counter strictly scoped. A `while` loop is preferred for indefinite or state-based iteration where loop continuation depends on dynamic conditions (e.g., waiting for user input or a flag change). At the JVM bytecode level, neither loop has a distinct instruction: both compile into identical conditional jump opcodes (such as `if_icmpge` or `if_icmplt`) and unconditional jump opcodes (`goto`).',
        followUp: 'Why is a for loop considered cleaner than a while loop for counter-based loops?',
        followUpAnswer: 'Because a for loop encapsulates the counter lifecycle in one place. In a while loop, the counter must be declared outside (polluting outer scope), and the update must be placed inside the body, where an accidental continue can bypass the update and trigger an infinite loop.',
        keyPhrases: ['Syntactic consolidation', 'No distinct bytecode instruction', 'Goto and conditional branches (if_icmp*)', 'Encapsulated counter lifecycle'],
        commonMistakeAnswer: 'Claiming that for loops have dedicated bytecode instructions or run faster than while loops.'
      },
      {
        question: 'Is it legal syntax in Java to omit all three expressions in the for loop header?',
        answer: 'Yes, `for (;;)` is completely valid Java syntax. When the initialization is omitted, nothing runs on entry. When the update is omitted, no step action occurs at the end of each iteration. When the condition is omitted, Java\'s language specification defines it as implicitly evaluating to `true`. Therefore, `for (;;)` constructs an infinite loop that compiles down to the exact same bytecode branching structure as `while (true)`.',
        followUp: 'Does the compiler allow code directly after `for (;;)` if there is no break statement inside?',
        followUpAnswer: 'No. The Java compiler performs reachability analysis. If a `for (;;)` block contains no `break` or return path, any statement written after the loop will fail compilation with an "unreachable statement" error.',
        keyPhrases: ['for (;;)', 'Implicitly true condition', 'Unreachable statement error', 'Bytecode equivalence to while(true)'],
        commonMistakeAnswer: 'Thinking that omitting the condition causes a syntax error or defaults to false.'
      },
      {
        question: 'What are the restrictions on the update clause in a Java for loop?',
        answer: 'Java strictly requires expressions in the update clause to be "statement expressions". According to the Java Language Specification (JLS), statement expressions include only: (1) Assignment expressions (e.g. `i = i + 1`, `i += 2`); (2) Pre-increment/decrement expressions (`++i`, `--i`); (3) Post-increment/decrement expressions (`i++`, `i--`); and (4) Method invocations. Standalone relational or boolean expressions like `i < 10` or arithmetic operations without assignment like `i + 1` cause a compile-time "not a statement" error.',
        followUp: 'Can you call a void method in the update clause?',
        followUpAnswer: 'Yes! Any method invocation is a statement expression, so `for (int i = 0; i < 5; printProgress())` is syntactically valid in Java.',
        keyPhrases: ['Statement expressions only', 'JLS specification', 'Assignments, increments, decrements, method calls', 'Not a statement compiler error'],
        commonMistakeAnswer: 'Thinking any valid Java expression can be placed in the update clause.'
      },
      {
        question: 'What is the Integer Overflow trap in for loops, and how can it cause an infinite loop?',
        answer: 'In Java, 32-bit signed integers wrap around from `Integer.MAX_VALUE` (2,147,483,647) to `Integer.MIN_VALUE` (-2,147,483,648) when incremented. If a loop is written as `for (int i = 0; i <= Integer.MAX_VALUE; i++)`, the condition `i <= Integer.MAX_VALUE` is ALWAYS true for all 32-bit integers. When `i` reaches `Integer.MAX_VALUE`, `i++` wraps it to `Integer.MIN_VALUE`, which is still `<= Integer.MAX_VALUE`. Consequently, the loop never terminates and runs forever.',
        followUp: 'How do you safely iterate across the entire positive integer range without overflow?',
        followUpAnswer: 'Use a larger primitive type like `long` for the loop counter: `for (long i = 0; i <= Integer.MAX_VALUE; i++)`. Because `long` has 64 bits, it will comfortably hold `Integer.MAX_VALUE + 1` without wrapping.',
        keyPhrases: ['Integer.MAX_VALUE wrap around', 'Integer.MIN_VALUE', 'Condition always true', 'Use long to prevent overflow'],
        commonMistakeAnswer: 'Assuming Java throws an ArithmeticException when an int counter overflows.'
      },
      {
        question: 'What is the behavior of continue vs break inside a for loop?',
        answer: '`break` unconditionally exits the entire for loop immediately; control jumps to the statement following the loop\'s closing brace, and neither the remaining loop body nor the update clause runs. `continue`, by contrast, terminates ONLY the current iteration; control jumps straight to the loop\'s update clause (e.g. `i++`), executes it, and then re-evaluates the condition for the next iteration.',
        followUp: 'How does continue in a while loop differ dangerously from continue in a for loop?',
        followUpAnswer: 'In a while loop, if the increment statement is written at the bottom of the body, a `continue` will skip past that increment, leaving the counter unchanged and causing an infinite loop. In a for loop, `continue` is guaranteed to execute the header update clause.',
        keyPhrases: ['break exits loop', 'continue skips to update clause', 'while loop continue danger'],
        commonMistakeAnswer: 'Believing continue bypasses the for loop update clause.'
      },
      {
        question: 'Can you initialize multiple variables in a single for loop header? What are the restrictions?',
        answer: 'Yes, you can initialize multiple variables in the header using a comma-separated list, but they must all share the exact same data type. For example, `for (int i = 0, j = 10; i < j; i++, j--)` is valid because both `i` and `j` are `int`. However, `for (int i = 0, double d = 0.5; ...)` is a syntax error because Java does not allow multiple type specifiers in a single declaration statement.',
        followUp: 'Can the update section also execute multiple statements?',
        followUpAnswer: 'Yes. The update section can contain multiple comma-separated statement expressions, such as `i++, j--, step *= 2`. Unlike the initialization section, these are statement expressions and do not involve type declarations.',
        keyPhrases: ['Same data type requirement', 'Comma-separated expressions', 'Multiple update statements'],
        commonMistakeAnswer: 'Claiming that Java forbids multiple variables or allows declaring different types separated by commas.'
      },
      {
        question: 'What happens if a developer places an accidental semicolon at the end of a for header?',
        answer: 'Placing a semicolon after the header, such as `for (int i = 0; i < 5; i++);`, binds an empty statement as the loop body. The loop will run through all iterations doing nothing. When `i` reaches 5 and the loop terminates, execution continues to the following block or statement, which only executes once. If that following block tries to use `i` (assuming `i` was declared in the header), compilation fails because `i` is already out of scope.',
        followUp: 'How do modern linters and IDEs protect developers against this mistake?',
        followUpAnswer: 'Most modern IDEs (like IntelliJ and Eclipse) and linters (like Checkstyle and SonarQube) flag "empty statement in loop" as a high-severity warning or error, warning that the loop has an empty body.',
        keyPhrases: ['Empty statement', 'Runs to completion doing nothing', 'Scope error in trailing block'],
        commonMistakeAnswer: 'Thinking the semicolon causes an immediate compilation syntax error on the header itself.'
      },
      {
        question: 'How does a traditional indexed for loop compare to an enhanced for-each loop?',
        answer: 'A traditional for loop provides explicit access to the iteration index, allows iterating in reverse, skipping elements with custom step increments (`i += 2`), modifying array elements by index, or traversing multiple arrays in parallel. An enhanced for-each loop is cleaner and eliminates off-by-one errors, but is read-only regarding array elements, offers no index variable, and only iterates forward one element at a time.',
        followUp: 'Can you remove elements from a collection using a traditional indexed for loop vs enhanced for-each?',
        followUpAnswer: 'In an enhanced for-each loop, modifying or removing from a collection throws `ConcurrentModificationException`. In an indexed for loop on a List, you can remove elements by index, provided you adjust the index (`i--`) to account for element shifting, though using an `Iterator` is safer.',
        keyPhrases: ['Index access', 'Forward only vs custom step', 'ConcurrentModificationException', 'Read-only iteration'],
        commonMistakeAnswer: 'Assuming for-each can iterate backward or modify array contents.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following clauses in a for loop header executes only once?',
        options: ['Condition', 'Initialization', 'Update', 'Loop body'],
        correctIndex: 1,
        explanation: 'The initialization clause executes exactly once when control first enters the for loop.'
      },
      {
        question: 'What is the result of executing the statement `for (;;)` in a Java program?',
        options: [
          'A compilation error because expressions are missing',
          'A loop that executes zero times',
          'An infinite loop identical to while (true)',
          'A runtime NullPointerException'
        ],
        correctIndex: 2,
        explanation: 'All three clauses are optional. An omitted condition defaults to true, creating an infinite loop identical to while (true).'
      },
      {
        question: 'What is printed by: `for (int i = 0; i < 3; i++) System.out.print(i);`?',
        options: ['012', '0123', '123', 'Compilation error'],
        correctIndex: 0,
        explanation: 'i starts at 0, prints 0, increments to 1, prints 1, increments to 2, prints 2, increments to 3. 3 < 3 is false. Output is 012.'
      },
      {
        question: 'Which declaration in a for loop header is syntactically INVALID in Java?',
        options: [
          'for (int i = 0, j = 10; i < j; i++)',
          'for (int i = 0, double d = 0.0; i < 5; i++)',
          'for (int i = 0; ; i++)',
          'for (; ; )'
        ],
        correctIndex: 1,
        explanation: 'Java requires all variables declared in the initialization section to share the same type. You cannot mix int and double in the same declaration list.'
      },
      {
        question: 'When is the update expression of a for loop evaluated?',
        options: [
          'Before the condition is checked for the first time',
          'Simultaneously with the condition',
          'Immediately after each execution of the loop body',
          'Only once when the loop terminates'
        ],
        correctIndex: 2,
        explanation: 'The update expression runs strictly after each successful completion of the loop body, right before re-testing the condition.'
      },
      {
        question: 'What is the output of: `int c = 0; for (int i = 5; i > 0; i -= 2) c++; System.out.println(c);`?',
        options: ['2', '3', '5', '0'],
        correctIndex: 1,
        explanation: 'i takes values 5, 3, and 1. For each value, c is incremented. When i becomes -1, -1 > 0 is false. c is 3.'
      },
      {
        question: 'What happens if a semicolon is placed immediately after the closing parenthesis: `for (int i = 0; i < 5; i++);`?',
        options: [
          'The loop fails to compile',
          'The loop body is considered empty and repeats 5 times',
          'The loop never runs',
          'An infinite loop occurs'
        ],
        correctIndex: 1,
        explanation: 'The semicolon serves as an empty statement body. The loop runs 5 times doing nothing, then program execution proceeds to the next line.'
      },
      {
        question: 'What is the scope of variable `i` in `for (int i = 0; i < 10; i++) { ... }`?',
        options: [
          'The entire class',
          'The entire enclosing method',
          'Strictly within the for loop header and body',
          'From the for loop declaration until the end of the file'
        ],
        correctIndex: 2,
        explanation: 'Variables declared in the for loop initialization clause have block scope restricted exclusively to the for loop.'
      },
      {
        question: 'How many times does the body of `for (int i = 10; i < 10; i++)` execute?',
        options: ['10 times', '1 time', '0 times', 'Infinite times'],
        correctIndex: 2,
        explanation: 'The condition 10 < 10 is tested immediately after initialization. Because it evaluates to false, the body executes 0 times.'
      },
      {
        question: 'Which of the following is the standard idiom to repeat a loop body N times from index 0?',
        options: [
          'for (int i = 1; i <= N; i++)',
          'for (int i = 0; i < N; i++)',
          'for (int i = 0; i <= N; i++)',
          'for (int i = 1; i < N; i++)'
        ],
        correctIndex: 1,
        explanation: '`for (int i = 0; i < N; i++)` is the canonical zero-based idiom, visiting indices 0, 1, ..., N-1 for exactly N iterations.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5.2: The Enhanced For-Each Loop
  // ─────────────────────────────────────────────────────────────
  'enhanced-for-each': {
    id: 'enhanced-for-each',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.2',
    title: 'The Enhanced For-Each Loop',
    subtitle: 'Simplified array traversal, read-only iteration semantics, indexless processing, and performance',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an airport baggage carousel. Suitcases glide past you one by one. You inspect each suitcase and read its luggage tag. You do not need to know whether the bag was loaded into carousel slot #1 or slot #42 (no index tracking needed). Furthermore, picking up a bag to inspect it and putting a sticker on your notebook does not alter the luggage on the belt—reassigning your local inspection variable does not alter the items inside the array!',
    coreExplanation: [
      'The enhanced `for` loop (commonly called the "for-each" loop) was introduced in Java 5 to eliminate the boilerplate code and off-by-one risks associated with standard indexed array traversal.',
      'The syntax is `for (Declaration : Expression) { ... }`, where `Declaration` defines a local iteration variable whose type matches the elements of the target array, and `Expression` evaluates to an array.',
      'Strictly Forward and Sequential: The for-each loop always traverses elements in natural order from index 0 to `array.length - 1`. You cannot traverse backward, skip elements, or step by 2 without manual tracking.',
      'Indexless Processing: The loop hides the index variable completely. If your algorithm requires the numerical index (for example, to display row numbers or compare adjacent elements `arr[i]` and `arr[i+1]`), a traditional indexed `for` loop must be used.',
      'Read-Only Primitive Semantics: When iterating over primitive arrays (like `int[]` or `double[]`), the loop variable holds a copy of each element value. Reassigning the loop variable (e.g., `num = 0;`) modifies only the local temporary variable; the original array element remains completely unchanged.',
      'Null Safety Warning: If the array reference being iterated over is `null`, Java throws a `NullPointerException` at the loop header before the first iteration begins.',
      'Compiler Desugaring: Under the hood, the Java compiler desugars an enhanced for-loop over an array into an exact traditional indexed for loop with a cached length, resulting in zero performance penalty.'
    ],
    diagram: `+-----------------------------------------------------------+
|               ENHANCED FOR-EACH ARRAY TRAVERSAL           |
+-----------------------------------------------------------+

   int[] numbers = { 10, 20, 30 };
                     |   |   |
     Index 0 --------+   |   |
     Index 1 ------------+   |
     Index 2 ----------------+

   FOR-EACH LOOP: for (int num : numbers) { ... }

   Step 1: num = numbers[0] (10)  --->  Execute Body with num = 10
   Step 2: num = numbers[1] (20)  --->  Execute Body with num = 20
   Step 3: num = numbers[2] (30)  --->  Execute Body with num = 30
   Step 4: End of Array reached   --->  Exit Loop smoothly (No OBOE!)`,
    codeSnippet: {
      title: 'Summing and Finding Maximum in an Array',
      code: `public class ForEachDemo {
    public static void main(String[] args) {
        int[] scores = { 85, 92, 78, 96, 88 };
        int sum = 0;
        int max = scores[0];

        for (int score : scores) {
            sum += score;
            if (score > max) {
                max = score;
            }
        }
        System.out.println("Total: " + sum);
        System.out.println("Highest: " + max);
    }
}`,
      lineByLineExplanation: [
        { line: 'int[] scores = { 85, 92, 78, 96, 88 };', explanation: 'Creates and initializes an array of integers with 5 test scores.' },
        { line: 'for (int score : scores) {', explanation: 'Loop header: on each pass, score receives a copy of the next element from the scores array.' },
        { line: 'sum += score;', explanation: 'Accumulates the current score into sum without needing an index like scores[i].' },
        { line: 'if (score > max) { max = score; }', explanation: 'Updates the peak score if the current element exceeds the highest recorded so far.' },
        { line: 'System.out.println(...);', explanation: 'Prints the calculated aggregate sum and maximum score after loop termination.' }
      ],
      output: `Total: 439
Highest: 96`
    },
    codeExamples: [
      {
        title: 'Traversing a String Array',
        description: 'Demonstrates reading each String element sequentially and filtering words by length.',
        code: `public class StringArrayTraversal {
    public static void main(String[] args) {
        String[] cities = { "Tokyo", "London", "San Francisco", "Rome" };
        for (String city : cities) {
            if (city.length() <= 5) {
                System.out.println("Short name: " + city);
            }
        }
    }
}`,
        output: `Short name: Tokyo
Short name: Rome`
      },
      {
        title: 'Demonstrating Read-Only Behavior with Primitives',
        description: 'Proves that reassigning the iteration variable does NOT modify the original array.',
        code: `public class ReadOnlyProof {
    public static void main(String[] args) {
        int[] values = { 1, 2, 3 };

        // Attempting to double each element
        for (int val : values) {
            val *= 2; // Only modifies local variable 'val'
        }

        // Verifying original array contents
        System.out.println("Array after for-each:");
        for (int val : values) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
        output: `Array after for-each:
1 2 3 `
      },
      {
        title: 'Linear Search with Early Termination (Break)',
        description: 'Demonstrates locating a target value in an array and exiting the loop early using break.',
        code: `public class LinearSearchDemo {
    public static void main(String[] args) {
        int[] serials = { 104, 209, 318, 412, 550 };
        int target = 318;
        boolean found = false;

        for (int serial : serials) {
            if (serial == target) {
                found = true;
                break;
            }
        }
        System.out.println("Found " + target + "? " + found);
    }
}`,
        output: 'Found 318? true'
      }
    ],
    cheatSheet: {
      summary: 'Clean, read-only iteration syntax designed for safe, indexless traversal over arrays without boundary errors.',
      syntaxTemplate: `for (ElementType variableName : arrayName) {
    // Read and process variableName
}`,
      rules: [
        { rule: 'Type Compatibility', explanation: 'The declared loop variable type must be assignment-compatible with the array\'s component type.' },
        { rule: 'Primitive Immutability', explanation: 'Assigning a new value to the loop variable does NOT update the underlying array slot.' },
        { rule: 'No Index Access', explanation: 'There is no built-in index counter. If an index is needed, maintain an external counter or use a traditional for loop.' },
        { rule: 'Forward-Only Order', explanation: 'Elements are always traversed from index 0 to length - 1. Reverse traversal cannot be done natively.' },
        { rule: 'Null Array Exception', explanation: 'If the array reference is null, entering the for-each loop immediately throws NullPointerException.' },
        { rule: 'Zero Performance Overhead', explanation: 'Compiles down to standard indexed traversal; no extra memory or CPU overhead is introduced.' }
      ],
      quickComparison: [
        { aspect: 'Syntax Cleanliness', optionA: 'for-each: Minimal boilerplate; no counter, bound, or increment', optionB: 'standard for: Requires explicit counter declaration, limit check, and step' },
        { aspect: 'Index Access', optionA: 'for-each: No direct access to element index', optionB: 'standard for: Direct access to index variable i' },
        { aspect: 'Modifying Elements', optionA: 'for-each: Cannot modify array slots through the loop variable', optionB: 'standard for: Direct assignment to array slots via arr[i] = value' },
        { aspect: 'Traversal Direction', optionA: 'for-each: Strictly forward (0 to length - 1)', optionB: 'standard for: Highly flexible (forward, backward, stepping by 2, etc.)' },
        { aspect: 'Risk of OBOE', optionA: 'for-each: Zero risk of ArrayIndexOutOfBoundsException', optionB: 'standard for: Risk of off-by-one errors with boundary conditions' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Trying to update array values using the loop variable: `for (int x : arr) { x = 0; }`',
        whyItHappens: 'Misunderstanding value copying. For primitives, `x` holds a copy of each element. Mutating `x` changes only the local stack variable, leaving `arr` untouched.',
        howToFix: 'Use a standard indexed `for` loop when writing to or modifying array elements: `for (int i = 0; i < arr.length; i++) { arr[i] = 0; }`.'
      },
      {
        mistake: 'Using for-each when the index is required to solve the problem (e.g., printing row numbers).',
        whyItHappens: 'Preferring the cleaner syntax of for-each without realizing that creating an external `int index = 0; index++;` adds more boilerplate than a standard loop.',
        howToFix: 'If the problem involves indices, positions, or comparing adjacent elements (`arr[i]` vs `arr[i+1]`), choose the standard `for (int i = 0; i < arr.length; i++)` loop directly.'
      },
      {
        mistake: 'Attempting reverse traversal with for-each.',
        whyItHappens: 'Assuming there is a hidden keyword or syntax flag to reverse the for-each order.',
        howToFix: 'For-each only traverses forward. To iterate backward, use `for (int i = arr.length - 1; i >= 0; i--)`.'
      },
      {
        mistake: 'Iterating over a null array reference without a safety check.',
        whyItHappens: 'Assuming that an empty or null array will simply cause the loop to execute zero times.',
        howToFix: 'An empty array (`new int[0]`) executes 0 times safely, but a `null` array throws `NullPointerException`. Always verify `if (arr != null)` before looping if nullability is possible.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Accumulator in For-Each',
        problemStatement: 'What will be printed when this code is executed?',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        int[] vals = { 2, 4, 6 };
        int product = 1;
        for (int v : vals) {
            product *= v;
        }
        System.out.println(product);
    }
}`,
        options: ['12', '48', '24', '0'],
        correctOptionIndex: 1,
        hint: 'Multiply 1 * 2 * 4 * 6 sequentially.',
        solution: '48',
        explanation: 'The loop visits 2 (product=2), then 4 (product=8), then 6 (product=48). Output is 48.'
      },
      {
        title: 'Puzzle 2: Primitive Value Immutability Check',
        problemStatement: 'What is printed by this program?',
        code: `public class Puzzle2 {
    public static void main(String[] args) {
        int[] data = { 10, 20, 30 };
        for (int item : data) {
            item += 5;
        }
        System.out.println(data[0] + data[1] + data[2]);
    }
}`,
        options: ['75', '60', '65', '15'],
        correctOptionIndex: 1,
        hint: 'Does modifying item inside the loop change data[0], data[1], or data[2]?',
        solution: '60',
        explanation: 'item is a local copy of each array element. Modifying item does not change the array elements. data remains {10, 20, 30}, and their sum is 10 + 20 + 30 = 60.'
      },
      {
        title: 'Puzzle 3: Counting Filtered Strings',
        problemStatement: 'Determine the output of the following code snippet.',
        code: `public class Puzzle3 {
    public static void main(String[] args) {
        String[] words = { "cat", "elephant", "dog", "tiger" };
        int count = 0;
        for (String w : words) {
            if (w.length() > 3) {
                count++;
            }
        }
        System.out.println(count);
    }
}`,
        options: ['1', '2', '3', '4'],
        correctOptionIndex: 1,
        hint: 'Count how many strings in the array have length strictly greater than 3.',
        solution: '2',
        explanation: '"cat".length() is 3 (not > 3). "elephant".length() is 8 (> 3, count=1). "dog".length() is 3 (not > 3). "tiger".length() is 5 (> 3, count=2). Output is 2.'
      },
      {
        title: 'Puzzle 4: Early Termination with Break',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        int[] nums = { 3, 7, 2, 8, 5 };
        int sum = 0;
        for (int n : nums) {
            if (n % 2 == 0) {
                break;
            }
            sum += n;
        }
        System.out.println(sum);
    }
}`,
        options: ['10', '12', '25', '3'],
        correctOptionIndex: 0,
        hint: 'Trace through the elements until an even number is encountered.',
        solution: '10',
        explanation: 'Element 3: odd, sum becomes 3. Element 7: odd, sum becomes 3 + 7 = 10. Element 2: even (2 % 2 == 0), break triggers and exits the loop immediately. Output is 10.'
      },
      {
        title: 'Puzzle 5: Skipping Elements with Continue',
        problemStatement: 'What is the value of sum after running this code?',
        code: `public class Puzzle5 {
    public static void main(String[] args) {
        int[] nums = { 5, -2, 10, -8, 3 };
        int sum = 0;
        for (int x : nums) {
            if (x < 0) {
                continue;
            }
            sum += x;
        }
        System.out.println(sum);
    }
}`,
        options: ['8', '18', '15', '20'],
        correctOptionIndex: 1,
        hint: 'continue skips the rest of the body for negative numbers.',
        solution: '18',
        explanation: 'Negative numbers (-2 and -8) are skipped by continue. Positive numbers are added: 5 + 10 + 3 = 18.'
      },
      {
        title: 'Puzzle 6: Empty Array Iteration',
        problemStatement: 'What happens when executing this loop on an empty array?',
        code: `public class Puzzle6 {
    public static void main(String[] args) {
        int[] empty = new int[0];
        int count = 0;
        for (int n : empty) {
            count++;
        }
        System.out.println("count=" + count);
    }
}`,
        options: [
          'Throws ArrayIndexOutOfBoundsException',
          'Throws NullPointerException',
          'Prints count=0',
          'Compilation error'
        ],
        correctOptionIndex: 2,
        hint: 'An array of length 0 exists in memory, but has no elements.',
        solution: 'Prints count=0',
        explanation: 'An empty array is a valid non-null object with length 0. The for-each loop checks bounds on entry, finds 0 elements, and executes 0 times without error. count remains 0.'
      },
      {
        title: 'Puzzle 7: Character Array Concatenation',
        problemStatement: 'What is printed by the following character traversal?',
        code: `public class Puzzle7 {
    public static void main(String[] args) {
        char[] letters = { 'J', 'a', 'v', 'a' };
        String res = "";
        for (char ch : letters) {
            res = ch + res;
        }
        System.out.println(res);
    }
}`,
        options: ['Java', 'avaJ', 'J a v a', 'Compilation error'],
        correctOptionIndex: 1,
        hint: 'Notice the prepend operation: res = ch + res;',
        solution: 'avaJ',
        explanation: 'Ch \'J\': res = "J". Ch \'a\': res = \'a\' + "J" = "aJ". Ch \'v\': res = \'v\' + "aJ" = "vaJ". Ch \'a\': res = \'a\' + "vaJ" = "avaJ". Output is avaJ.'
      },
      {
        title: 'Puzzle 8: Conditional Count of Even Numbers',
        problemStatement: 'What is the output of the following snippet?',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        int[] arr = { 1, 4, 7, 10, 13, 16 };
        int evens = 0;
        for (int val : arr) {
            if ((val & 1) == 0) {
                evens++;
            }
        }
        System.out.println(evens);
    }
}`,
        options: ['2', '3', '4', '6'],
        correctOptionIndex: 1,
        hint: 'The bitwise expression (val & 1) == 0 checks if a number is even.',
        solution: '3',
        explanation: 'Even numbers in the array are 4, 10, and 16. Total count of even numbers is 3.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the enhanced for-each loop in Java, and why was it introduced?',
        answer: 'The enhanced for-each loop was introduced in Java 5 as a syntactic convenience to iterate sequentially through arrays and collections. Its primary design goal was to eliminate boilerplate code—such as manually declaring counter variables, writing boundary conditions, and incrementing counters—and to eliminate the most common source of off-by-one errors and ArrayIndexOutOfBoundsExceptions.',
        followUp: 'How does the Java compiler implement an enhanced for loop over an array at bytecode level?',
        followUpAnswer: 'For arrays, the compiler desugars the enhanced for loop into a standard indexed for loop with a temporary local variable storing the array reference and an int counter running from 0 to length - 1. There is zero runtime performance overhead compared to a manual indexed loop.',
        keyPhrases: ['Syntactic sugar', 'Eliminates off-by-one errors', 'Compiler desugaring into indexed loop', 'Zero performance overhead'],
        commonMistakeAnswer: 'Believing that for-each uses an Iterator object behind the scenes when iterating over primitive arrays.'
      },
      {
        question: 'Can you modify the elements of an array using an enhanced for-each loop? Why or why not?',
        answer: 'No, you cannot modify the contents of an array using the iteration variable in an enhanced for-each loop. When iterating over an array of primitives, the loop variable receives a copy of each element value by value. Reassigning the variable (e.g. `x = 10;`) updates only that temporary local stack variable, leaving the original array slot untouched. To modify array elements, you must use a traditional indexed loop: `arr[i] = 10;`.',
        followUp: 'What if the array stores mutable objects? Does the same restriction apply?',
        followUpAnswer: 'If the array stores reference objects, reassigning the loop variable (`obj = new Object();`) still does not modify the array slot. However, invoking a mutating method on the object (`obj.setName("Alex");`) will mutate the underlying object because the variable holds a copy of the reference pointing to the same heap object.',
        keyPhrases: ['Pass-by-value copy', 'Local stack variable', 'Array slots remain unchanged', 'Must use indexed loop to modify slots'],
        commonMistakeAnswer: 'Believing that reassigning the loop variable writes back into the array slot.'
      },
      {
        question: 'Under what circumstances CANNOT you use an enhanced for-each loop in Java?',
        answer: 'You cannot use an enhanced for-each loop when: (1) You need to modify the array elements; (2) You need access to the current element\'s index; (3) You need to traverse the array backward; (4) You need to skip elements (e.g., visit every alternate element); or (5) You need to compare adjacent elements simultaneously (e.g., `arr[i]` with `arr[i+1]`). In all these scenarios, a traditional indexed `for` loop is required.',
        followUp: 'If you only need the index occasionally, is it acceptable to keep a manual `int index = 0` counter outside the for-each loop?',
        followUpAnswer: 'While syntactically valid, it defeats the purpose of the for-each loop and is considered an anti-pattern. If an index is necessary, using `for (int i = 0; i < arr.length; i++)` is cleaner, more idiomatic, and less prone to counter-management bugs.',
        keyPhrases: ['No index access', 'No reverse traversal', 'Cannot modify slots', 'Cannot compare adjacent elements'],
        commonMistakeAnswer: 'Claiming that for-each can do everything a traditional for loop can do.'
      },
      {
        question: 'What happens if you attempt to iterate over a null array using an enhanced for-each loop?',
        answer: 'If the array reference evaluates to `null`, entering the enhanced for loop throws a `NullPointerException` immediately at runtime. This happens because the compiler\'s desugared code attempts to evaluate `array.length` to establish the loop boundary before the first iteration.',
        followUp: 'How does iterating over a null array differ from iterating over an array of size zero (`new int[0]`)?',
        followUpAnswer: 'An array of size zero is a valid, instantiated object whose `length` property is 0. The loop checks `0 < 0` (false) and terminates gracefully without executing the body. A null reference has no object instance, so accessing its length throws a NullPointerException.',
        keyPhrases: ['NullPointerException', 'Evaluates array.length on entry', 'Empty array terminates gracefully'],
        commonMistakeAnswer: 'Thinking that iterating over null simply skips the loop without throwing an exception.'
      },
      {
        question: 'Is there any performance difference between a traditional for loop and an enhanced for loop for arrays?',
        answer: 'No, there is virtually zero performance difference. In fact, the enhanced for loop can sometimes be slightly faster than a poorly written manual loop because the compiler caches the array length in a local register variable rather than repeatedly querying `arr.length` if the compiler cannot prove immutability.',
        followUp: 'Does the JIT compiler optimize both styles identically?',
        followUpAnswer: 'Yes. The HotSpot JIT compiler optimizes both into identical machine code with loop unrolling, bounds-check elimination, and SIMD vectorization where applicable.',
        keyPhrases: ['Virtually identical performance', 'Cached array length', 'JIT bounds-check elimination'],
        commonMistakeAnswer: 'Assuming that for-each is slower because it creates extra helper objects.'
      },
      {
        question: 'Can you use the break and continue statements inside an enhanced for-each loop?',
        answer: 'Yes, both `break` and `continue` work inside an enhanced for-each loop with the exact same semantics as in a traditional loop. Calling `break` terminates the loop immediately and transfers control to the statement following the loop. Calling `continue` skips the remainder of the current element\'s body execution and advances directly to the next element.',
        followUp: 'Can you use labeled break to exit nested for-each loops?',
        followUpAnswer: 'Yes. You can label an outer for-each loop (e.g., `outer: for (int[] row : matrix)`) and call `break outer;` from an inner loop to terminate both loops at once.',
        keyPhrases: ['break exits immediately', 'continue advances to next element', 'Labeled break supported'],
        commonMistakeAnswer: 'Thinking break or continue cannot be used because there is no explicit loop counter.'
      },
      {
        question: 'What type compatibility rules apply to the loop variable in an enhanced for loop?',
        answer: 'The declared type of the iteration variable must be assignment-compatible with the element type of the array. For example, for an `int[]` array, you can declare the loop variable as `int`, or a wider primitive like `long`, `float`, or `double`. However, you cannot declare it as a narrower type like `byte` or `short` without a compilation error.',
        followUp: 'Can you use the `var` keyword (type inference) for the loop variable in Java 10+?',
        followUpAnswer: 'Yes, `for (var x : arr)` is fully supported in Java 10+. The compiler automatically infers the exact component type of the array.',
        keyPhrases: ['Assignment compatibility', 'Widening conversions allowed', 'Narrowing conversions illegal', 'var keyword supported'],
        commonMistakeAnswer: 'Assuming the variable type must be an exact literal match with no widening permitted.'
      },
      {
        question: 'Why does the enhanced for-each loop prevent off-by-one errors?',
        answer: 'In a traditional for loop, developers must manually write three separate boundary components: the initial index (0 vs 1), the relational comparison (`<` vs `<=`), and the boundary limit (`arr.length` vs `arr.length - 1`). Mistyping any of these creates an off-by-one bug. The enhanced for loop encapsulates the boundary internally, guaranteeing traversal from index 0 to length - 1 with no opportunity for manual index mistakes.',
        followUp: 'What exception is completely eliminated by using the for-each loop on arrays?',
        followUpAnswer: '`ArrayIndexOutOfBoundsException` is completely eliminated during normal iteration because the JVM-generated bounds are mathematically exact.',
        keyPhrases: ['Encapsulates boundaries', 'Eliminates manual index management', 'Prevents ArrayIndexOutOfBoundsException'],
        commonMistakeAnswer: 'Saying it prevents NullPointerExceptions.'
      },
      {
        question: 'Can an enhanced for-each loop iterate in reverse order?',
        answer: 'No. The enhanced for-each loop has no mechanism or keyword to iterate in reverse. It is strictly hardcoded by the Java language specification to traverse sequentially from the first element to the last element. If reverse traversal is required, you must use a standard for loop: `for (int i = arr.length - 1; i >= 0; i--)`.',
        followUp: 'Why didn\'t the Java language designers add reverse for-each syntax?',
        followUpAnswer: 'To keep the language simple and avoid syntax clutter. Standard indexed loops already handle reverse traversal cleanly, and not all data structures support efficient reverse traversal.',
        keyPhrases: ['Strictly forward-only', 'No reverse syntax', 'Must use traditional for loop for reverse'],
        commonMistakeAnswer: 'Believing that an array can be reversed by adding a decrement operator in the header.'
      },
      {
        question: 'Explain what happens in memory when executing: `for (int val : new int[]{10, 20, 30})`?',
        answer: 'At runtime, the integer array `{10, 20, 30}` is allocated on the heap. On each iteration, Java copies the 32-bit integer primitive value from the array slot into a 32-bit local stack slot assigned to `val`. The body executes using this local stack variable. After three iterations, the loop terminates and the anonymous array becomes eligible for garbage collection.',
        followUp: 'Does the iteration variable get re-allocated on the stack every iteration?',
        followUpAnswer: 'No. The compiler reuses the exact same stack frame slot for `val` across all iterations, simply overwriting its 32-bit value on each pass.',
        keyPhrases: ['Value copy to stack slot', 'Stack slot reuse', 'Heap allocation', 'Garbage collection eligibility'],
        commonMistakeAnswer: 'Thinking that a new stack frame is created for each iteration.'
      }
    ],
    miniQuiz: [
      {
        question: 'In which version of Java was the enhanced for-each loop introduced?',
        options: ['Java 1.2', 'Java 1.4', 'Java 5', 'Java 8'],
        correctIndex: 2,
        explanation: 'The enhanced for-each loop was introduced in Java 5 (alongside generics, enums, and autoboxing).'
      },
      {
        question: 'What happens if you modify the loop variable during iteration over an int[] array?',
        options: [
          'The array element is updated simultaneously',
          'Only the local copy is modified; the array remains unchanged',
          'A compile-time error occurs because the variable is implicitly final',
          'An UnsupportedOperationException is thrown at runtime'
        ],
        correctIndex: 1,
        explanation: 'For primitive arrays, the loop variable receives a copy of each value. Mutating it affects only the local variable, not the array.'
      },
      {
        question: 'What happens when running `int[] arr = null; for (int x : arr) { ... }`?',
        options: [
          'The loop executes 0 times safely',
          'A NullPointerException is thrown',
          'A compilation error occurs',
          'The loop variable x becomes 0'
        ],
        correctIndex: 1,
        explanation: 'Iterating over a null reference throws a NullPointerException immediately when the loop header evaluates.'
      },
      {
        question: 'Which of the following tasks CANNOT be performed with an enhanced for-each loop?',
        options: [
          'Finding the sum of all elements',
          'Finding the maximum element',
          'Modifying every element in place to double its value',
          'Counting how many elements match a condition'
        ],
        correctIndex: 2,
        explanation: 'An enhanced for-each loop cannot modify array elements in place because the loop variable is merely a value copy.'
      },
      {
        question: 'What is the underlying bytecode implementation of an enhanced for-each loop over an array?',
        options: [
          'An java.util.Iterator object',
          'A standard indexed for loop with a cached array length',
          'A recursive method call',
          'A Java reflection invoke call'
        ],
        correctIndex: 1,
        explanation: 'For arrays, the compiler desugars the enhanced for-each loop directly into a standard indexed for loop.'
      },
      {
        question: 'What is the output of: `int[] a = { 1, 2, 3 }; for (int x : a) x *= 10; System.out.println(a[0]);`?',
        options: ['10', '1', '0', 'Compilation error'],
        correctIndex: 1,
        explanation: 'x is a copy of each element. Mutating x does not change a[0], which remains 1.'
      },
      {
        question: 'Can you traverse an array in reverse order using the enhanced for-each loop natively?',
        options: [
          'Yes, by writing for (int x : reverse arr)',
          'Yes, by writing for (int x :- arr)',
          'No, the enhanced for-each loop only traverses forward',
          'Yes, if the array is sorted'
        ],
        correctIndex: 2,
        explanation: 'The enhanced for-each loop strictly traverses forward from index 0 to length - 1. Reverse iteration requires a standard indexed loop.'
      },
      {
        question: 'Which variable declaration in the header is valid for iterating over an `int[]` array?',
        options: [
          'for (long x : arr)',
          'for (short x : arr)',
          'for (byte x : arr)',
          'for (boolean x : arr)'
        ],
        correctIndex: 0,
        explanation: 'int values can be widened to long without casting, making long assignment-compatible. Narrowing to short or byte requires an explicit cast and fails compilation.'
      },
      {
        question: 'How many times does `for (int x : new int[0])` execute its loop body?',
        options: ['0 times', '1 time', 'Throws ArrayIndexOutOfBoundsException', 'Throws NullPointerException'],
        correctIndex: 0,
        explanation: 'An array of size 0 has length 0. The loop checks bounds, discovers 0 elements, and executes 0 times safely.'
      },
      {
        question: 'If you need to know the index of an element during iteration, what is the best practice?',
        options: [
          'Maintain an external counter variable alongside the for-each loop',
          'Use a traditional indexed for loop',
          'Call arr.indexOf(element)',
          'Cast the element to an index'
        ],
        correctIndex: 1,
        explanation: 'If the element index is required, using a standard `for (int i = 0; i < arr.length; i++)` loop is the clean, idiomatic Java best practice.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 5.3: The While Loop (Pre-Condition Loop)
  // ─────────────────────────────────────────────────────────────
  'while-loop': {
    id: 'while-loop',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.3',
    title: 'The While Loop (Pre-Condition Loop)',
    subtitle: 'Entry-controlled repetition, indefinite iterations, state evolution, and avoiding infinite loops',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an automated toll gate on a highway. Before the barrier lifts, an electronic sensor scans your transponder card (pre-condition check). If your account has sufficient funds, the gate opens and you drive through (loop body). After you pass through, the toll system deducts the fee from your account (state update). As long as you maintain a positive balance, you can keep passing toll gates; but if your account has zero balance at the very first gate, the barrier never opens even once (0 minimum executions).',
    coreExplanation: [
      'The `while` loop is Java\'s fundamental pre-condition (entry-controlled) loop. It evaluates its boolean condition BEFORE executing the loop body.',
      'Minimum Executions Guarantee: Because the condition check occurs prior to entry, if the condition evaluates to `false` on the initial check, the loop body executes exactly zero times.',
      'Ideal for Indefinite Iteration: While loops are best suited for situations where the number of repetitions is not known upfront and depends on dynamic runtime events, such as processing digits until a number becomes zero or reading input until a sentinel value is reached.',
      'The 3 Essential Phases: Every reliable while loop requires: (1) Initialization of state variables before the loop; (2) A termination test in `while (condition)`; and (3) An explicit state progression/update statement inside the body that drives the condition toward `false`.',
      'The Infinite Loop Hazard: Forgetting to update state variables inside the body leaves the condition permanently true, freezing the executing thread in an infinite loop that spikes CPU utilization.',
      'The Accidental Semicolon Trap: Writing `while (condition);` binds an empty statement as the body. If `condition` is true, the program enters an immediate, unresponsive infinite busy-wait.',
      'Strict Reachability Analysis: In Java, writing `while (false) { ... }` causes a compile-time "unreachable statement" error, whereas `while (true)` is legal and explicitly denotes an intentional infinite loop to be exited via `break`.'
    ],
    diagram: `+-----------------------------------------------------------+
|                 WHILE LOOP EXECUTION CYCLE                |
+-----------------------------------------------------------+

   [ INITIALIZATION ]  (Done BEFORE the loop: int n = 123)
           |
           v
   +-> [ CONDITION CHECK ]  (Pre-test: while (n > 0))
   |           |
   |     +-----+-----+
   |     |           |
   |  (true)      (false)
   |     |           |
   |     v           v
   |  [ LOOP BODY ]      [ EXIT LOOP ]
   |  int digit = n % 10;
   |  sum += digit;
   |     |
   |     v
   |  [ STATE UPDATE ]  (Advance toward false: n /= 10)
   +-----+`,
    codeSnippet: {
      title: 'Number Reversal and Digit Processing',
      code: `public class WhileLoopDemo {
    public static void main(String[] args) {
        int number = 1234;
        int reversed = 0;

        while (number > 0) {
            int digit = number % 10;
            reversed = (reversed * 10) + digit;
            number /= 10;
        }
        System.out.println("Reversed: " + reversed);
    }
}`,
      lineByLineExplanation: [
        { line: 'int number = 1234; int reversed = 0;', explanation: 'Initializes the input number to reverse and the accumulator for reversed digits.' },
        { line: 'while (number > 0) {', explanation: 'Pre-condition: checks if any digits remain to be processed before executing the body.' },
        { line: 'int digit = number % 10;', explanation: 'Extracts the rightmost digit using the modulo operator.' },
        { line: 'reversed = (reversed * 10) + digit;', explanation: 'Shifts existing reversed digits left by one decimal place and appends the extracted digit.' },
        { line: 'number /= 10;', explanation: 'State update: strips off the rightmost digit, advancing the number toward 0 to ensure loop termination.' }
      ],
      output: 'Reversed: 4321'
    },
    codeExamples: [
      {
        title: 'Repeated Halving (Binary Logarithm Count)',
        description: 'Demonstrates counting how many times a positive number can be divided by 2 before reaching 1.',
        code: `public class HalvingDemo {
    public static void main(String[] args) {
        int val = 64;
        int steps = 0;

        while (val > 1) {
            val /= 2;
            steps++;
        }
        System.out.println("Halving steps required: " + steps);
    }
}`,
        output: 'Halving steps required: 6'
      },
      {
        title: 'Sum of Digits Calculator',
        description: 'Demonstrates stripping digits from an integer and summing them.',
        code: `public class SumOfDigits {
    public static void main(String[] args) {
        int n = 5824;
        int sum = 0;

        while (n != 0) {
            sum += n % 10;
            n /= 10;
        }
        System.out.println("Sum of digits: " + sum);
    }
}`,
        output: 'Sum of digits: 19'
      },
      {
        title: 'Collatz Conjecture (3n + 1 Sequence)',
        description: 'Generates hailstone numbers until the value converges to 1.',
        code: `public class CollatzSequence {
    public static void main(String[] args) {
        int n = 6;
        System.out.print(n);

        while (n > 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            System.out.print(" -> " + n);
        }
        System.out.println();
    }
}`,
        output: '6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1'
      }
    ],
    cheatSheet: {
      summary: 'Entry-controlled loop that tests its condition before every execution, ideal for indefinite iterations.',
      syntaxTemplate: `// 1. Initialization
while (booleanCondition) {
    // 2. Loop Body
    // 3. State Update (mandatory to prevent infinite loop)
}`,
      rules: [
        { rule: 'Pre-Test Timing', explanation: 'Condition evaluated before the body executes. If initially false, body executes 0 times.' },
        { rule: 'Counter Scope', explanation: 'Loop state variables are declared outside and remain in scope after the loop terminates.' },
        { rule: 'Mandatory State Progression', explanation: 'The body must modify at least one variable involved in the condition to guarantee termination.' },
        { rule: 'Semicolon Hazard', explanation: 'while (condition); binds an empty statement, causing an immediate infinite freeze if condition is true.' },
        { rule: 'Unreachable Code on False', explanation: 'while (false) { ... } triggers a compile-time "unreachable statement" error in Java.' },
        { rule: 'Intentional Infinite Loop', explanation: 'while (true) creates a standard intentional infinite loop, usually exited via an internal break.' }
      ],
      quickComparison: [
        { aspect: 'Condition Evaluation', optionA: 'while: Evaluated BEFORE entering body (Pre-test)', optionB: 'do-while: Evaluated AFTER executing body (Post-test)' },
        { aspect: 'Minimum Executions', optionA: 'while: 0 times (if initial condition is false)', optionB: 'do-while: Guaranteed at least 1 time' },
        { aspect: 'Variable Scope', optionA: 'while: Variables initialized outside and survive loop exit', optionB: 'for: Variables declared in header are scoped strictly to loop' },
        { aspect: 'Best Suited For', optionA: 'while: Indefinite iterations, digit stripping, mathematical convergence', optionB: 'for: Definite iterations, known bounds, array index traversal' },
        { aspect: 'Trailing Semicolon', optionA: 'while: Semicolon after header is a dangerous bug', optionB: 'do-while: Semicolon after while(condition); is syntactically mandatory' }
      ]
    },
    beginnerMistakes: [
      {
        mistake: 'Forgetting to update the state variable inside the loop body, causing an infinite loop: `int i = 0; while (i < 5) { System.out.println(i); }`',
        whyItHappens: 'In a for loop, the update clause is part of the header. In a while loop, it must be written manually inside the body and is easy to overlook.',
        howToFix: 'Always write the state progression statement (e.g. `i++` or `n /= 10`) immediately upon creating the while block.'
      },
      {
        mistake: 'Accidentally placing a semicolon after the while condition: `while (x > 0); { x--; }`',
        whyItHappens: 'Habit of placing semicolons at the end of lines. The semicolon creates an empty body, resulting in an infinite loop if `x > 0` is true.',
        howToFix: 'Never put a semicolon after the condition parenthesis of a `while` loop: `while (x > 0) { x--; }`.'
      },
      {
        mistake: 'Using `while (false)` and expecting the compiler to simply ignore the block.',
        whyItHappens: 'Developers sometimes use `while (false)` to temporarily disable a block of code.',
        howToFix: 'Java strictly rejects unreachable code. Use line comments `//` or block comments `/* ... */` to disable code.'
      },
      {
        mistake: 'Off-by-one errors with boundary checks: using `while (n > 0)` versus `while (n >= 0)`.',
        whyItHappens: 'Not carefully checking the boundary value (zero). For digit extraction, `n > 0` is correct. For zero-based countdowns, `n >= 0` is needed to process 0.',
        howToFix: 'Trace the final iteration manually with test values like 1 and 0 to verify whether the terminal edge case should execute.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing While Loop Counter',
        problemStatement: 'What does this program print to standard output?',
        code: `public class Puzzle1 {
    public static void main(String[] args) {
        int x = 1;
        while (x < 10) {
            x *= 2;
        }
        System.out.println(x);
    }
}`,
        options: ['8', '10', '16', '32'],
        correctOptionIndex: 2,
        hint: 'Trace x through each doubling: 1 -> 2 -> 4 -> 8 -> 16.',
        solution: '16',
        explanation: 'x starts at 1. Iteration 1: x=2. Iteration 2: x=4. Iteration 3: x=8. Iteration 4: x=16. Check: 16 < 10 is false. Loop terminates. Output is 16.'
      },
      {
        title: 'Puzzle 2: Zero Iterations Pre-Test',
        problemStatement: 'What is printed after executing this code snippet?',
        code: `public class Puzzle2 {
    public static void main(String[] args) {
        int count = 100;
        while (count < 50) {
            count += 10;
        }
        System.out.println(count);
    }
}`,
        options: ['100', '110', '50', 'Infinite loop'],
        correctOptionIndex: 0,
        hint: 'Evaluate the condition count < 50 on the very first check.',
        solution: '100',
        explanation: 'The condition 100 < 50 is false immediately on the first evaluation. The loop body executes 0 times. count remains 100.'
      },
      {
        title: 'Puzzle 3: Post-Decrement in While Condition',
        problemStatement: 'What is the exact output of this program?',
        code: `public class Puzzle3 {
    public static void main(String[] args) {
        int n = 3;
        while (n-- > 0) {
            System.out.print(n + " ");
        }
    }
}`,
        options: ['3 2 1 ', '2 1 0 ', '3 2 1 0 ', '2 1 '],
        correctOptionIndex: 1,
        hint: 'Remember: n-- evaluates the comparison using n\'s current value, then decrements n immediately.',
        solution: '2 1 0 ',
        explanation: 'Check 1: 3 > 0 is true, n decrements to 2, prints "2 ". Check 2: 2 > 0 is true, n decrements to 1, prints "1 ". Check 3: 1 > 0 is true, n decrements to 0, prints "0 ". Check 4: 0 > 0 is false, n decrements to -1, loop exits. Output is "2 1 0 ".'
      },
      {
        title: 'Puzzle 4: Semicolon Freeze Trap',
        problemStatement: 'What will happen when executing the following snippet?',
        code: `public class Puzzle4 {
    public static void main(String[] args) {
        int a = 5;
        while (a > 0);
        {
            a--;
        }
        System.out.println(a);
    }
}`,
        options: [
          'Prints 0',
          'Prints 4',
          'Compilation error',
          'Program hangs indefinitely in an infinite loop'
        ],
        correctOptionIndex: 3,
        hint: 'Look closely at the line: while (a > 0);',
        solution: 'Program hangs indefinitely in an infinite loop',
        explanation: 'The semicolon after while (a > 0); binds an empty statement as the body. Since a is 5, 5 > 0 is permanently true. The loop spins endlessly doing nothing, never reaching { a--; }.'
      },
      {
        title: 'Puzzle 5: Digit Stripping Sum',
        problemStatement: 'What is the value of sum printed by this code?',
        code: `public class Puzzle5 {
    public static void main(String[] args) {
        int num = 246;
        int sum = 0;
        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }
        System.out.println(sum);
    }
}`,
        options: ['12', '10', '6', '8'],
        correctOptionIndex: 0,
        hint: 'Extract digits from right to left: 6, then 4, then 2.',
        solution: '12',
        explanation: 'Iteration 1: num%10 = 6, sum = 6, num becomes 24. Iteration 2: num%10 = 4, sum = 10, num becomes 2. Iteration 3: num%10 = 2, sum = 12, num becomes 0. Loop terminates. Output is 12.'
      },
      {
        title: 'Puzzle 6: Dual Variable While Loop',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle6 {
    public static void main(String[] args) {
        int i = 1;
        int j = 10;
        while (i < j) {
            i += 2;
            j -= 1;
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}`,
        options: ['i=7, j=7', 'i=5, j=8', 'i=7, j=6', 'i=9, j=6'],
        correctOptionIndex: 0,
        hint: 'Track (i, j) per cycle: Start: (1, 10). Cycle 1: (3, 9). Cycle 2: (5, 8). Cycle 3: (7, 7).',
        solution: 'i=7, j=7',
        explanation: 'Start: i=1, j=10. Pass 1: 1 < 10 -> i=3, j=9. Pass 2: 3 < 9 -> i=5, j=8. Pass 3: 5 < 8 -> i=7, j=7. Check: 7 < 7 is false. Loop terminates. Output is "i=7, j=7".'
      },
      {
        title: 'Puzzle 7: Tracing Multiple Modulo Operations',
        problemStatement: 'What will be printed by this program?',
        code: `public class Puzzle7 {
    public static void main(String[] args) {
        int n = 15;
        int count = 0;
        while (n % 2 != 0) {
            n = (n + 1) / 2;
            count++;
        }
        System.out.println("count=" + count + ", n=" + n);
    }
}`,
        options: ['count=1, n=8', 'count=2, n=4', 'count=3, n=2', 'count=4, n=1'],
        correctOptionIndex: 0,
        hint: 'Evaluate 15 % 2, then compute (15 + 1) / 2.',
        solution: 'count=1, n=8',
        explanation: 'Pass 1: 15 % 2 is 1 (!= 0, true). n = (15 + 1) / 2 = 8. count = 1. Check: 8 % 2 is 0 (!= 0 is false!). Loop terminates immediately. Output is "count=1, n=8".'
      },
      {
        title: 'Puzzle 8: Pre-Increment in While Condition',
        problemStatement: 'Determine the exact output of this snippet.',
        code: `public class Puzzle8 {
    public static void main(String[] args) {
        int k = 0;
        while (++k < 4) {
            System.out.print(k + " ");
        }
    }
}`,
        options: ['0 1 2 3 ', '1 2 3 ', '1 2 3 4 ', '2 3 4 '],
        correctOptionIndex: 1,
        hint: '++k increments k FIRST, then tests whether the new value is < 4.',
        solution: '1 2 3 ',
        explanation: 'Check 1: ++k makes k=1. 1 < 4 is true -> prints "1 ". Check 2: ++k makes k=2. 2 < 4 is true -> prints "2 ". Check 3: ++k makes k=3. 3 < 4 is true -> prints "3 ". Check 4: ++k makes k=4. 4 < 4 is false -> loop terminates. Output is "1 2 3 ".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is a while loop, and what does it mean that it is an entry-controlled loop?',
        answer: 'A while loop is Java\'s fundamental entry-controlled loop statement that executes its body repeatedly as long as a specified boolean expression evaluates to true. "Entry-controlled" (or pre-condition) means that the test condition is evaluated before control is ever permitted to enter the loop body. If the condition evaluates to false on the very first check, the body is completely bypassed and executes zero times.',
        followUp: 'How does an entry-controlled loop differ fundamentally from an exit-controlled loop?',
        followUpAnswer: 'An exit-controlled loop (such as do-while) executes the loop body first before evaluating the condition at the end. Consequently, an exit-controlled loop guarantees at least 1 execution, whereas an entry-controlled loop guarantees a minimum of 0 executions.',
        keyPhrases: ['Entry-controlled', 'Pre-condition test', 'Minimum 0 executions', 'Bypassed if initially false'],
        commonMistakeAnswer: 'Asserting that while loops always execute at least once.'
      },
      {
        question: 'When should a developer choose a while loop over a for loop in Java?',
        answer: 'A developer should choose a while loop when the number of iterations is indefinite and cannot be calculated in advance—for instance, when reading data until an end-of-stream or sentinel value is encountered, stripping digits from a number until it reaches zero, or continuing a mathematical approximation until error falls below an epsilon threshold. In contrast, a for loop is preferred for definite loops with known boundaries or array indices.',
        followUp: 'Can every for loop be rewritten as a while loop?',
        followUpAnswer: 'Yes. Any for loop `for (init; cond; update) { body; }` can be mechanically transformed into `{ init; while (cond) { body; update; } }`. The only subtle difference is the scope of the loop variable if declared in the init clause.',
        keyPhrases: ['Indefinite iteration', 'Sentinel values', 'Mathematical convergence', 'Universal equivalence to for loop'],
        commonMistakeAnswer: 'Thinking that while loops have special JVM performance benefits over for loops.'
      },
      {
        question: 'What causes an infinite while loop, and how can it be diagnosed in production?',
        answer: 'An infinite while loop occurs when the loop condition permanently evaluates to true. This typically happens because the developer forgot to include a state update statement inside the body, updated the wrong variable, or wrote an impossible termination condition (such as `x > 0` with `x++`). In production, it manifests as 100% CPU utilization on a thread, unresponsive requests, thread pool starvation, and eventual server timeouts.',
        followUp: 'How can you capture and diagnose an infinite loop on a live running JVM?',
        followUpAnswer: 'Take multiple consecutive thread dumps using `jcmd` or `jstack`. If a thread is stuck at the exact same line within the while loop across consecutive dumps while consuming high CPU (visible via `top -H` or OS task manager), it is locked in an infinite loop.',
        keyPhrases: ['Missing state update', '100% CPU thread spike', 'Thread dump analysis (jstack, jcmd)'],
        commonMistakeAnswer: 'Thinking an infinite loop immediately causes an OutOfMemoryError.'
      },
      {
        question: 'Why does `while (false) { System.out.println("Hi"); }` cause a compilation error in Java?',
        answer: 'The Java language specification enforces strict reachability analysis at compile time. Because the condition `false` is a compile-time constant expression, the compiler can mathematically prove that the statements inside the curly braces can never be reached under any execution scenario. Java treats unreachable code as a compiler error ("unreachable statement") rather than a harmless warning.',
        followUp: 'Why does `if (false) { System.out.println("Hi"); }` compile successfully while `while (false)` fails?',
        followUpAnswer: 'The Java Language Specification contains an explicit exception for `if (false)` to support conditional compilation flags (similar to `#ifdef` in C/C++). This exemption does not apply to `while`, `for`, or `do-while` loops.',
        keyPhrases: ['Reachability analysis', 'Unreachable statement error', 'Conditional compilation exception for if'],
        commonMistakeAnswer: 'Assuming while(false) compiles cleanly and is simply optimized away at runtime.'
      },
      {
        question: 'Explain the semicolon trap with while loops: `while (condition);`',
        answer: 'Placing a semicolon immediately after the while header creates an empty statement that acts as the entire loop body. If the condition is true, Java executes this empty body repeatedly. Because nothing inside the empty body changes the condition, the loop becomes an instantaneous infinite busy-wait loop that freezes thread execution and prevents any subsequent code from running.',
        followUp: 'Does the compiler emit an error or warning for `while (condition);`?',
        followUpAnswer: 'Standard javac compiles it without error because an empty statement is syntactically valid in Java. However, modern IDEs and static analysis tools (like SonarQube and SpotBugs) will flag it with a high-severity warning.',
        keyPhrases: ['Empty statement body', 'Infinite busy-wait', 'Syntactically valid but logically fatal'],
        commonMistakeAnswer: 'Believing the compiler rejects trailing semicolons on control flow headers.'
      },
      {
        question: 'What is the scope and lifetime of a variable initialized before a while loop?',
        answer: 'Because a while loop header cannot declare variables (unlike a for loop), any counter or state tracking variable must be declared in the enclosing scope before the while loop. Consequently, that variable remains alive and accessible throughout the remainder of the enclosing method after the while loop finishes, retaining whatever value caused the loop condition to evaluate to false.',
        followUp: 'What problem can arise if you reuse this outer variable for a second while loop below it?',
        followUpAnswer: 'If you forget to reinitialize it to its starting value, the second loop may immediately terminate (evaluating to false on entry) or produce incorrect calculations using stale leftover state.',
        keyPhrases: ['Enclosing method scope', 'Retains termination value', 'Risk of stale state on reuse'],
        commonMistakeAnswer: 'Believing the variable gets automatically destroyed or reset when the while loop exits.'
      },
      {
        question: 'Can you use the break and continue statements inside a while loop? How does continue behave?',
        answer: 'Yes, both `break` and `continue` are supported. `break` immediately halts the loop and jumps to the statement following the closing brace. `continue` skips all remaining statements in the current iteration and immediately jumps back to the while condition test at the top of the loop.',
        followUp: 'What common infinite-loop bug occurs when using continue in a while loop?',
        followUpAnswer: 'If the counter update (like `i++`) is placed at the bottom of the loop body and a `continue` executes before reaching it, the update is skipped. On the next cycle, the condition evaluates with the exact same unchanged counter, triggering an infinite loop.',
        keyPhrases: ['break exits loop', 'continue re-tests condition', 'Skipped update leading to infinite loop'],
        commonMistakeAnswer: 'Assuming continue jumps to the update statement like it does in a for loop.'
      },
      {
        question: 'What is the idiom `while (true)` typically used for in Java?',
        answer: 'The idiom `while (true)` creates an intentional indefinite loop that runs indefinitely until an internal condition triggers a `break`, `return`, or throws an exception. It is commonly used in server listeners, event dispatch threads, game loops, or interactive command-line prompts where termination criteria must be evaluated in the middle of the body rather than at the top.',
        followUp: 'Is there any difference between `while (true)` and `for (;;)` in compiled bytecode?',
        followUpAnswer: 'None whatsoever. Both compile into an unconditional jump instruction (`goto`) targeting the start of the loop block.',
        keyPhrases: ['Intentional infinite loop', 'Mid-body termination with break', 'Server socket listening', 'Bytecode equivalence'],
        commonMistakeAnswer: 'Stating that while (true) causes memory leaks on its own.'
      },
      {
        question: 'How do you safely process digits of a number using a while loop?',
        answer: 'The standard idiom uses `while (num > 0)` (or `while (num != 0)` to support negative numbers). Inside the body, `num % 10` extracts the lowest (rightmost) digit, and `num /= 10` truncates the lowest digit via integer division. This division strictly decreases the magnitude of `num` on every iteration, guaranteeing that `num` eventually reaches 0 and terminates the loop in logarithmic time O(log10 N).',
        followUp: 'What edge case fails if using `while (num > 0)` when the input number is 0?',
        followUpAnswer: 'If the input is 0, `0 > 0` is false immediately, so the loop body executes 0 times. If the goal is to process the digit 0, a special check or a `do-while` loop is required.',
        keyPhrases: ['num % 10 extracts digit', 'num /= 10 truncates digit', 'Logarithmic time complexity', 'Edge case of input = 0'],
        commonMistakeAnswer: 'Converting the number to a String when a pure mathematical while loop is faster and cleaner.'
      },
      {
        question: 'How does the JVM handle condition evaluation with short-circuit operators inside a while loop?',
        answer: 'When a while condition uses `&&` or `||`, Java evaluates expressions strictly from left to right with short-circuit semantics. For `while (index < arr.length && arr[index] != target)`, if `index < arr.length` evaluates to false, the second expression `arr[index] != target` is never evaluated, completely preventing an `ArrayIndexOutOfBoundsException`.',
        followUp: 'What would happen if the single ampersand `&` was used instead?',
        followUpAnswer: 'The non-short-circuit bitwise/logical AND (`&`) forces evaluation of both operands regardless of the first result, causing an `ArrayIndexOutOfBoundsException` as soon as index reaches `arr.length`.',
        keyPhrases: ['Short-circuit evaluation', 'Left-to-right evaluation', 'Guards against ArrayIndexOutOfBoundsException'],
        commonMistakeAnswer: 'Believing both operands of && are always evaluated in loop conditions.'
      }
    ],
    miniQuiz: [
      {
        question: 'Why is a while loop referred to as an "entry-controlled" or "pre-test" loop?',
        options: [
          'Because its condition is tested after the body executes',
          'Because its condition is evaluated before the loop body executes',
          'Because it controls entry to the entire method',
          'Because it cannot be exited once entered'
        ],
        correctIndex: 1,
        explanation: 'A while loop is entry-controlled because its boolean condition is evaluated prior to executing the loop body.'
      },
      {
        question: 'What is the minimum number of times a while loop body can execute?',
        options: ['0 times', '1 time', '2 times', 'Depends on JVM settings'],
        correctIndex: 0,
        explanation: 'If the condition evaluates to false on the very first evaluation, the loop body executes 0 times.'
      },
      {
        question: 'What happens when compiling and running: `while (false) { int x = 1; }`?',
        options: [
          'Compiles cleanly and skips the loop at runtime',
          'Compile-time error: unreachable statement',
          'Throws NullPointerException at runtime',
          'Executes the body exactly once'
        ],
        correctIndex: 1,
        explanation: 'Java performs compile-time reachability analysis. Because the condition is constant false, the body is unreachable, causing a compile-time error.'
      },
      {
        question: 'What is the output of: `int n = 5; while (n > 2) n--; System.out.println(n);`?',
        options: ['1', '2', '3', '5'],
        correctIndex: 1,
        explanation: 'n decrements from 5 to 4, then 3, then 2. When n is 2, 2 > 2 is false. Loop exits and prints 2.'
      },
      {
        question: 'What happens if you place a semicolon after the while condition: `while (x < 10);` (where x is initially 0)?',
        options: [
          'The program throws a SyntaxException',
          'The loop body is considered empty and the program hangs in an infinite loop',
          'x is incremented automatically',
          'The loop terminates immediately'
        ],
        correctIndex: 1,
        explanation: 'The semicolon binds an empty statement. Since x remains 0, 0 < 10 remains true forever, freezing the program in an infinite loop.'
      },
      {
        question: 'What happens to a variable declared inside the body of a while loop upon each iteration?',
        options: [
          'It retains its previous value across iterations',
          'It is newly declared and reinitialized on every iteration',
          'It becomes a global static variable',
          'A compilation error occurs if declared inside a loop'
        ],
        correctIndex: 1,
        explanation: 'Variables declared inside the loop body have block scope limited to that single iteration; they are re-created and initialized on each cycle.'
      },
      {
        question: 'What is the output of: `int i = 0; while (i++ < 2) { } System.out.println(i);`?',
        options: ['2', '3', '1', '0'],
        correctIndex: 1,
        explanation: 'Check 1: i=0 (< 2 true), i becomes 1. Check 2: i=1 (< 2 true), i becomes 2. Check 3: i=2 (< 2 false), i becomes 3. Loop terminates with i=3.'
      },
      {
        question: 'Which of the following operations is the standard way to remove the rightmost digit of an integer `n` in Java?',
        options: ['n = n % 10;', 'n = n / 10;', 'n = n - 10;', 'n = n >> 10;'],
        correctIndex: 1,
        explanation: 'Integer division by 10 (`n /= 10` or `n = n / 10`) strips the rightmost digit by truncating the decimal portion.'
      },
      {
        question: 'What risk is introduced if `continue` is invoked before the loop counter update in a while loop?',
        options: [
          'The program throws an IllegalStateException',
          'The counter update is skipped, creating an infinite loop',
          'The loop terminates prematurely',
          'The loop runs in reverse'
        ],
        correctIndex: 1,
        explanation: 'In a while loop, continue jumps directly to the condition test, bypassing any updates placed below it, frequently causing an infinite loop.'
      },
      {
        question: 'When is a while loop preferred over an enhanced for-each loop?',
        options: [
          'When reading every element of an array sequentially',
          'When calculating the sum of elements in an array',
          'When the number of iterations depends on an unpredictable runtime condition',
          'When iterating over a fixed list of numbers from 0 to 9'
        ],
        correctIndex: 2,
        explanation: 'A while loop is designed for indefinite iteration where termination depends on runtime events rather than a fixed collection or array length.'
      }
    ]
  }
};
