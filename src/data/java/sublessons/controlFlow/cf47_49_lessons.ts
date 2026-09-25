import { DetailedLesson } from '../../detailedLessons';

export const cf47_49_lessons: Record<string, DetailedLesson> = {
  // ============================================================
  // LESSON 5.4: THE DO-WHILE LOOP (RUNS >= 1 TIME)
  // ============================================================
  'do-while-loop': {
    id: 'do-while-loop',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.4',
    title: 'The do-while Loop (Runs >= 1 Time)',
    subtitle: 'Post-condition evaluation, the mandatory semicolon, variable scope boundaries, and interactive validation loops',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of an amusement park ride where ticket inspection happens at the EXIT turnstile instead of the entrance. With a standard while loop, the attendant checks your ticket before you get on; if your ticket is invalid, you ride zero times. But with a do-while loop, you board and enjoy the ride first, and only when you step off is your ticket checked. You are 100% guaranteed to experience the ride at least once!',
    interviewTakeaways: [
      'Guaranteed Minimum Iteration: The do-while loop is an exit-controlled (post-test) loop. It executes its body statements at least once before evaluating its boolean condition.',
      'Mandatory Semicolon Rule: Syntax mandates a semicolon immediately following the condition: do { ... } while (condition);. Omitting it causes a compile-time syntax error.',
      'Variable Scope Trap: Variables declared inside the do { ... } block cannot be referenced in while(condition); because the block scope ends at the closing curly brace.',
      'Condition Side-Effects: Expressions like while(count++ < 5) modify the variable during condition evaluation, which often trips up developers during loop tracing.'
    ],
    cheatSheet: {
      summary: 'An exit-controlled iteration construct guaranteed to execute its body at least once, testing its termination condition only after each iteration completes.',
      syntaxTemplate: `// 1. Declare loop control variable OUTSIDE the do-block
int counter = 1;

do {
    // Statements execute at least once unconditionally
    System.out.println("Iteration: " + counter);
    counter++; // Update expression
} while (counter <= 5); // <-- MANDATORY semicolon!`,
      rules: [
        { rule: 'Execution Guarantee', explanation: 'Condition evaluation occurs strictly AFTER the body executes. Minimum execution count is always 1.' },
        { rule: 'Mandatory Semicolon', explanation: 'Must terminate with a semicolon after while(condition);. Forgetting it causes a compile-time syntax error.' },
        { rule: 'Scope Boundary', explanation: 'Variables declared inside do { } are local to that block and cannot be accessed inside while(condition);.' },
        { rule: 'Strict Boolean Condition', explanation: 'Condition expression must evaluate strictly to boolean (true or false). Numbers like 0 or 1 fail compilation.' },
        { rule: 'Update Responsibility', explanation: 'Loop control variables must be updated inside the body; otherwise, the condition remains true forever, causing an infinite loop.' },
        { rule: 'Exit Jump Flow', explanation: 'When condition evaluates to true, execution jumps back to "do {". When false, execution falls through to the next line.' }
      ],
      quickComparison: [
        { aspect: 'Condition Evaluation Timing', optionA: 'while: Pre-test (checked BEFORE entering body)', optionB: 'do-while: Post-test (checked AFTER executing body)' },
        { aspect: 'Minimum Executions', optionA: 'while: 0 times (if initial condition is false)', optionB: 'do-while: 1 time (guaranteed under all circumstances)' },
        { aspect: 'Ending Semicolon', optionA: 'while: Never put semicolon after while(cond)', optionB: 'do-while: Mandatory semicolon after while(cond);' },
        { aspect: 'Loop Variable Scope', optionA: 'while: Declared before loop; accessible throughout', optionB: 'do-while: Must be declared before do-block to be used in condition' },
        { aspect: 'Primary Real-World Use', optionA: 'while: Unknown iterations based on external sensor/flag', optionB: 'do-while: Menu prompts, PIN entry retry, parsing at least 1 token' }
      ]
    },
    coreExplanation: [
      'The do-while loop is Java\'s exit-controlled (post-tested) iteration construct. Its core architectural guarantee is that the body executes at least once regardless of whether the condition is initially true or false.',
      'Post-Condition Evaluation: In contrast to while and for loops which check their conditions at the entry gate, do-while executes the entire block of code first, and tests the condition only upon reaching the trailing while (condition); statement.',
      'Control Flow Jump Mechanics: If the boolean condition evaluates to true, program control immediately jumps backward to the opening brace of the do block. If it evaluates to false, control moves directly to the line immediately following the semicolon.',
      'The Mandatory Semicolon Requirement: The Java Language Specification requires a terminating semicolon after the while clause in a do-while construct: do { ... } while (condition);. Omitting this semicolon triggers a compilation error: "\';\' expected".',
      'Variable Scope Limitation: Any variable declared inside the do { ... } block has block scope restricted to those curly braces. The condition in while(condition); sits outside that block. Therefore, any variable tested in the condition MUST be declared before the do block.',
      'Condition Side-Effects and Tracing: When post-increment (x++) or pre-increment (++x) operators are embedded directly inside while(x++ < 5);, the variable value changes during condition evaluation, affecting subsequent iterations or statements after loop exit.',
      'Interactive Input & Validation Pattern: Because user interfaces and console programs must prompt the user at least once before validating input, do-while is the canonical choice for menu-driven loops and retry-on-failure workflows.'
    ],
    diagram: `+-----------------------------------------------------------+
|              WHILE LOOP (Pre-test / Entry-test)           |
|                                                           |
|       +-------------------+                               |
|  ---> | Condition Check?  | ---[ false ]---> [ Exit: 0 ]  |
|       +-------------------+                               |
|                 | true                                    |
|                 v                                         |
|       +-------------------+                               |
|       |    Loop Body      |                               |
|       +-------------------+                               |
|                 |                                         |
|                 +----------> (re-check condition)         |
+-----------------------------------------------------------+

+-----------------------------------------------------------+
|            DO-WHILE LOOP (Post-test / Exit-test)          |
|                                                           |
|       +-------------------+                               |
|  ---> |    Loop Body      | <--- (Always runs >= 1 time!) |
|       +-------------------+                               |
|                 |                                         |
|                 v                                         |
|       +-------------------+                               |
|       | Condition Check?  | ---[ false ]---> [ Exit: >=1] |
|       +-------------------+                               |
|                 | true                                    |
|                 +----------> (re-enter loop body)         |
+-----------------------------------------------------------+`,
    codeSnippet: {
      title: 'Guaranteed Single Execution When Condition Is Initially False',
      code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int number = 100;

        // Even though (number < 10) is FALSE right from the start:
        do {
            System.out.println("Inside do-while body! number = " + number);
            number += 10;
        } while (number < 10); // Condition is false: 110 < 10

        System.out.println("After loop! Final number = " + number);
    }
}`,
      lineByLineExplanation: [
        { line: 'int number = 100;', explanation: 'Initializes variable number with 100 outside the loop block.' },
        { line: 'do {', explanation: 'Enters the loop body directly without checking any boolean condition.' },
        { line: 'System.out.println(...); number += 10;', explanation: 'Prints the line and increments number to 110.' },
        { line: '} while (number < 10);', explanation: 'Evaluates (110 < 10), which is false. The mandatory semicolon terminates the construct.' },
        { line: 'System.out.println(...);', explanation: 'Execution continues past the loop, printing the final value of 110.' }
      ],
      output: `Inside do-while body! number = 100
After loop! Final number = 110`
    },
    codeExamples: [
      {
        title: 'Example 1: Interactive Menu Simulator with Input Validation',
        description: 'Demonstrating how do-while guarantees presenting choices at least once and repeats while input is invalid.',
        code: `public class MenuValidator {
    public static void main(String[] args) {
        int simulatedUserChoice = -1;
        int attempts = 0;

        do {
            attempts++;
            System.out.println("--- System Menu ---");
            System.out.println("1. Start Game");
            System.out.println("2. High Scores");
            System.out.println("3. Exit");
            System.out.println("Attempt " + attempts + ": Processing choice " + simulatedUserChoice);

            // Simulate user picking option 2 on their third attempt
            if (attempts == 2) {
                simulatedUserChoice = 2;
            }
        } while (simulatedUserChoice < 1 || simulatedUserChoice > 3);

        System.out.println("Valid choice accepted: " + simulatedUserChoice);
    }
}`,
        output: `--- System Menu ---
1. Start Game
2. High Scores
3. Exit
Attempt 1: Processing choice -1
--- System Menu ---
1. Start Game
2. High Scores
3. Exit
Attempt 2: Processing choice 2
Valid choice accepted: 2`
      },
      {
        title: 'Example 2: Digit Extraction and Number Reversal',
        description: 'Using do-while to reverse an integer. Works properly even for 0 because the loop runs at least once.',
        code: `public class ReverseNumber {
    public static void main(String[] args) {
        int original = 0;
        int temp = original;
        int reversed = 0;

        do {
            int lastDigit = temp % 10;
            reversed = (reversed * 10) + lastDigit;
            temp /= 10;
        } while (temp > 0);

        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reversed);
    }
}`,
        output: `Original: 0
Reversed: 0`
      },
      {
        title: 'Example 3: Exponential Step Counter',
        description: 'Multiplying a value by 2 each cycle until exceeding a threshold, tracking exact steps taken.',
        code: `public class ExponentialSteps {
    public static void main(String[] args) {
        int value = 3;
        int steps = 0;

        do {
            value *= 2;
            steps++;
            System.out.println("Step " + steps + ": value = " + value);
        } while (value < 50);

        System.out.println("Target reached in " + steps + " steps with final value " + value);
    }
}`,
        output: `Step 1: value = 6
Step 2: value = 12
Step 3: value = 24
Step 4: value = 48
Step 5: value = 96
Target reached in 5 steps with final value 96`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Omitting the terminating semicolon after while(condition)',
        whyItHappens: 'In standard while and for loops, putting a semicolon after the parentheses is usually a bug. Beginners mistakenly assume do-while follows the same convention.',
        howToFix: 'Remember: do-while is the ONLY loop in Java that MUST end with a semicolon: do { ... } while (condition);.'
      },
      {
        mistake: 'Declaring the condition variable inside the do block',
        whyItHappens: 'Developers declare `int x = 1;` inside `do { ... }` and then write `while (x < 5);`. Because `x` is local to the block, the while condition cannot resolve `x`.',
        howToFix: 'Declare all variables that need to be evaluated in the condition before the `do {` keyword.'
      },
      {
        mistake: 'Assuming do-while will skip if condition is initially false',
        whyItHappens: 'Developers treat do-while as interchangeable with while, forgetting that condition checking happens at the bottom.',
        howToFix: 'If 0 executions is a valid requirement, use a standard while or for loop. Use do-while only when at least 1 execution is mandatory.'
      },
      {
        mistake: 'Overlooking side-effects inside the while condition expression',
        whyItHappens: 'Writing `while (i++ < 5);` increments `i` during the condition check. Even when the check evaluates to false, `i` has already been incremented.',
        howToFix: 'Separate the increment step into the body (`i++;`) before the condition check, or carefully trace post-condition increments.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Initial False Condition Tracing',
        problemStatement: 'What is printed to the console when the following code snippet executes?',
        code: `int x = 5;
do {
    x += 2;
    System.out.print(x + " ");
} while (x < 5);
System.out.print("End: " + x);`,
        options: [
          'End: 5',
          '7 End: 7',
          '5 7 End: 7',
          'Compile Error: unreachable code'
        ],
        correctOptionIndex: 1,
        hint: 'Remember that the body executes once before (x < 5) is ever evaluated.',
        solution: '7 End: 7',
        explanation: 'The loop body runs immediately: x becomes 5 + 2 = 7, and "7 " is printed. Then (7 < 5) is tested, which is false. The loop terminates immediately. Finally, "End: 7" is printed.'
      },
      {
        title: 'Puzzle 2: Post-Increment in Condition',
        problemStatement: 'Trace the exact output of this code with post-increment in the while check:',
        code: `int c = 1;
do {
    System.out.print(c + " ");
} while (c++ < 3);
System.out.print("Final:" + c);`,
        options: [
          '1 2 3 Final:3',
          '1 2 3 Final:4',
          '1 2 Final:3',
          '1 2 Final:4'
        ],
        correctOptionIndex: 1,
        hint: 'Trace both the comparison (c < 3) and the increment of c that happens immediately after.',
        solution: '1 2 3 Final:4',
        explanation: 'Iteration 1: prints "1 ", check (1 < 3) is true, c becomes 2. Iteration 2: prints "2 ", check (2 < 3) is true, c becomes 3. Iteration 3: prints "3 ", check (3 < 3) is false, c becomes 4! Loop terminates. Prints "Final:4".'
      },
      {
        title: 'Puzzle 3: Accumulator with Decrement',
        problemStatement: 'What does the following do-while loop output?',
        code: `int n = 4;
int sum = 0;
do {
    sum += n;
    n -= 2;
} while (n > 0);
System.out.println("sum=" + sum + ", n=" + n);`,
        options: [
          'sum=6, n=0',
          'sum=4, n=2',
          'sum=6, n=-2',
          'sum=10, n=0'
        ],
        correctOptionIndex: 0,
        hint: 'Trace values of n and sum at each step. What is n after the second subtraction?',
        solution: 'sum=6, n=0',
        explanation: 'Iteration 1: sum = 0 + 4 = 4, n becomes 4 - 2 = 2. Condition (2 > 0) is true. Iteration 2: sum = 4 + 2 = 6, n becomes 2 - 2 = 0. Condition (0 > 0) is false. Loop terminates. Output is "sum=6, n=0".'
      },
      {
        title: 'Puzzle 4: Variable Scope Error Detection',
        problemStatement: 'Will this code compile, and if not, what is the cause?',
        code: `do {
    int val = 10;
    System.out.print(val + " ");
    val--;
} while (val > 5);`,
        options: [
          'Prints: 10 9 8 7 6',
          'Prints: 10',
          'Compile Error: cannot find symbol variable val in while condition',
          'Runtime Error: NullPointerException'
        ],
        correctOptionIndex: 2,
        hint: 'Look closely at where `int val` is declared relative to the while condition.',
        solution: 'Compile Error: cannot find symbol variable val in while condition',
        explanation: '`val` is declared inside the `do { ... }` block. Its scope ends at the closing curly brace `}`. The condition `while (val > 5)` is outside that block and cannot access `val`, resulting in a compilation error.'
      },
      {
        title: 'Puzzle 5: Pre-Decrement in Body',
        problemStatement: 'Determine the output of this do-while loop:',
        code: `int a = 3;
do {
    System.out.print(--a + " ");
} while (a > 0);`,
        options: [
          '3 2 1 ',
          '2 1 0 ',
          '2 1 ',
          '2 '
        ],
        correctOptionIndex: 1,
        hint: '--a decrements BEFORE printing.',
        solution: '2 1 0 ',
        explanation: 'Iteration 1: a decrements from 3 to 2, prints "2 ". Check (2 > 0) is true. Iteration 2: a decrements from 2 to 1, prints "1 ". Check (1 > 0) is true. Iteration 3: a decrements from 1 to 0, prints "0 ". Check (0 > 0) is false. Loop terminates. Output is "2 1 0 ".'
      },
      {
        title: 'Puzzle 6: Multiplying Counter',
        problemStatement: 'What is the printed value of total after the loop finishes?',
        code: `int total = 1;
int multiplier = 2;
do {
    total *= multiplier;
    multiplier++;
} while (multiplier <= 4);
System.out.println(total);`,
        options: [
          '8',
          '24',
          '6',
          '12'
        ],
        correctOptionIndex: 1,
        hint: 'Trace multiplier: starts at 2, runs for 2, 3, and 4.',
        solution: '24',
        explanation: 'Iteration 1: total = 1 * 2 = 2, multiplier becomes 3. (3 <= 4) is true. Iteration 2: total = 2 * 3 = 6, multiplier becomes 4. (4 <= 4) is true. Iteration 3: total = 6 * 4 = 24, multiplier becomes 5. (5 <= 4) is false. Loop exits. Total is 24.'
      },
      {
        title: 'Puzzle 7: Negative Number Termination',
        problemStatement: 'What does this code print to the console?',
        code: `int k = 10;
do {
    k -= 4;
} while (k >= 0);
System.out.println("k=" + k);`,
        options: [
          'k=0',
          'k=-2',
          'k=-4',
          'k=2'
        ],
        correctOptionIndex: 1,
        hint: 'Track k: 10 -> 6 -> 2 -> ?',
        solution: 'k=-2',
        explanation: 'Iteration 1: k = 10 - 4 = 6. (6 >= 0) is true. Iteration 2: k = 6 - 4 = 2. (2 >= 0) is true. Iteration 3: k = 2 - 4 = -2. (-2 >= 0) is false. Loop exits. Prints "k=-2".'
      },
      {
        title: 'Puzzle 8: Combined Pre-Increment and Comparison',
        problemStatement: 'Analyze the final output of the following snippet:',
        code: `int count = 0;
int iterations = 0;
do {
    iterations++;
} while (++count < 3);
System.out.println(iterations + ":" + count);`,
        options: [
          '3:3',
          '3:4',
          '2:3',
          '4:3'
        ],
        correctOptionIndex: 0,
        hint: '++count increments before comparison with 3.',
        solution: '3:3',
        explanation: 'Iteration 1: iterations = 1. ++count makes count = 1. (1 < 3) is true. Iteration 2: iterations = 2. ++count makes count = 2. (2 < 3) is true. Iteration 3: iterations = 3. ++count makes count = 3. (3 < 3) is false. Loop exits. Output: "3:3".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the primary difference between a while loop and a do-while loop in Java?',
        answer: 'The primary difference lies in the timing of condition evaluation. A while loop is an entry-controlled (pre-test) loop, meaning its condition is evaluated before any statements in the body execute. If the condition is initially false, the body never runs (0 executions). In contrast, a do-while loop is an exit-controlled (post-test) loop. It executes the body first and evaluates the condition at the end, guaranteeing at least one execution regardless of initial condition state.',
        followUp: 'What happens if you accidentally put a semicolon after the while condition in a standard while loop versus a do-while loop?',
        followUpAnswer: 'In a standard while loop, writing `while(cond);` creates an empty statement as the loop body. If the condition is true, it enters an immediate infinite loop doing nothing. In a do-while loop, however, the semicolon after `while(cond);` is required by the Java language syntax. Without it, the code will fail compilation.',
        keyPhrases: ['pre-test vs post-test', 'guaranteed >= 1 execution', 'entry-controlled vs exit-controlled', 'mandatory semicolon'],
        commonMistakeAnswer: 'Saying they are basically identical except do-while is just written backwards.'
      },
      {
        question: 'Can you declare a variable inside the do block and use it in the while condition? Explain why or why not.',
        answer: 'No, you cannot. In Java, variable scope is strictly block-scoped to the enclosing pair of curly braces. Any variable declared inside the `do { ... }` block goes out of scope at the closing curly brace. The `while (condition);` clause is outside those curly braces, so the compiler will throw a "cannot find symbol" error. To use a variable in the condition, it must be declared before the `do` block.',
        followUp: 'Can you re-initialize or modify that variable inside the do block?',
        followUpAnswer: 'Yes, absolutely. Because the variable is declared in the enclosing outer scope, the inner do-block has full access to read and reassign its value during every iteration.',
        keyPhrases: ['block scope', 'cannot find symbol', 'declared before do block', 'lifetime of local variable'],
        commonMistakeAnswer: 'Thinking that because while is part of the do-while syntax, it shares the same scope as the do block.'
      },
      {
        question: 'Give two real-world software engineering scenarios where a do-while loop is preferred over a for or while loop.',
        answer: 'First is user input prompting and validation in console/CLI applications. You must display the prompt and receive input at least once before you can check whether that input is valid; if invalid, you repeat. Second is communication retry logic, such as attempting a network socket read or API call at least once, and then retrying if it fails up to a maximum attempt limit.',
        followUp: 'Could those same scenarios be written using a while loop?',
        followUpAnswer: 'Yes, any do-while loop can be rewritten as a while loop, but it typically requires either duplicating the prompt/call code once before the while loop, or using a "while(true)" loop with an internal "if" and "break". The do-while loop expresses the "at least once" intent much more cleanly without boilerplate.',
        keyPhrases: ['input validation', 'console menu', 'network retry logic', 'avoids code duplication'],
        commonMistakeAnswer: 'Saying do-while is faster or uses less memory than a while loop (they compile to virtually identical bytecode).'
      },
      {
        question: 'What is the output of `int i = 0; do { System.out.print(i); } while (i != 0);`?',
        answer: 'It prints `0`. The do block executes first without checking the condition, printing the current value of `i` (0). Next, the condition `(i != 0)` is evaluated. Since `0 != 0` is false, the loop terminates immediately after that single execution.',
        followUp: 'What would a standard `while (i != 0)` loop output with the same initial value?',
        followUpAnswer: 'It would print nothing at all because `(0 != 0)` evaluates to false at the entry gate, skipping the body entirely.',
        keyPhrases: ['prints 0', 'condition false on first check', 'zero executions for while loop'],
        commonMistakeAnswer: 'Assuming it loops infinitely or does not print anything.'
      },
      {
        question: 'What bytecode instruction does the JVM typically generate for a do-while loop compared to a while loop?',
        answer: 'A do-while loop compiles cleanly to sequential body instructions followed by a single conditional jump instruction (like `if_icmplt` or `ifne`) at the bottom jumping back to the top of the body if true. A standard while loop typically generates either an unconditional `goto` to the test at the bottom, or an initial test and conditional branch at the top jumping past the body when false.',
        followUp: 'Does this mean do-while is faster than while?',
        followUpAnswer: 'In modern HotSpot JVMs with JIT compilation, loop unrolling and branch prediction optimize both constructs to practically identical machine code. Performance differences are negligible, so code clarity and correctness should always guide loop choice.',
        keyPhrases: ['conditional branch at bottom', 'goto', 'HotSpot JIT optimization', 'negligible performance difference'],
        commonMistakeAnswer: 'Claiming do-while is significantly faster because it has one less instruction in production.'
      },
      {
        question: 'How does the continue statement behave inside a do-while loop?',
        answer: 'When a `continue` statement executes inside a do-while loop, it immediately skips any remaining statements in the current iteration of the body and jumps directly to the `while (condition);` check at the bottom. If the condition evaluates to true, the next iteration begins; if false, the loop terminates.',
        followUp: 'What is the danger of using continue in a do-while loop if the increment statement is at the very bottom?',
        followUpAnswer: 'If the counter increment (e.g. `i++`) is placed after the `continue` statement, it will be skipped entirely. This means the counter never changes, causing the condition to remain true and triggering an accidental infinite loop.',
        keyPhrases: ['jumps directly to condition check', 'skips remaining body statements', 'accidental infinite loop if counter skipped'],
        commonMistakeAnswer: 'Thinking continue jumps back to the "do" keyword without testing the condition.'
      },
      {
        question: 'Can you have a do-while loop without curly braces in Java?',
        answer: 'Yes, Java syntax permits omitting curly braces if the loop body contains exactly one statement, for example: `int x = 0; do x++; while (x < 5);`. However, omitting braces is widely considered an anti-pattern because it severely degrades readability and easily introduces bugs if a developer later adds a second statement.',
        followUp: 'Why is it particularly dangerous to omit braces in do-while compared to if statements?',
        followUpAnswer: 'Because `do singleStatement; while (cond);` visually separates the loop boundaries, making it easy to mistake the single statement for normal sequential code and the while clause for an empty while loop.',
        keyPhrases: ['syntactically valid for single statement', 'severe code readability risk', 'always use braces'],
        commonMistakeAnswer: 'Claiming that do-while strictly requires curly braces in Java.'
      },
      {
        question: 'How do you create an intentional infinite loop using do-while, and when might that be used?',
        answer: 'An intentional infinite do-while loop is written as `do { ... } while (true);`. It is used in daemon service threads, game loops, or event-driven polling workers that must run continuously until an explicit external signal, `break` statement, or `return` terminates execution.',
        followUp: 'Is `while (true)` preferred over `do { ... } while (true);` in idiomatic Java?',
        followUpAnswer: 'Yes, `while (true)` or `for (;;)` is overwhelmingly preferred in the Java community for infinite loops because the infinite intent is stated clearly at the top rather than buried at the bottom.',
        keyPhrases: ['do { ... } while (true)', 'event polling', 'while(true) is more idiomatic'],
        commonMistakeAnswer: 'Saying you cannot write an infinite loop with do-while.'
      },
      {
        question: 'What happens if the boolean condition in a do-while loop throws an exception?',
        answer: 'If evaluating the condition expression throws an exception (such as `NullPointerException` or `ArithmeticException`), the exception propagates immediately up the call stack, abruptly terminating the loop. The loop body will not re-execute, and control will not fall through to the next statement.',
        followUp: 'Does the loop body still execute if the exception happens in the condition on the very first iteration?',
        followUpAnswer: 'Yes, because the body executes BEFORE the condition is evaluated. Any side effects produced by the body during that first pass (such as printed output or modified variables) have already occurred.',
        keyPhrases: ['abrupt termination', 'exception propagates', 'body already executed once'],
        commonMistakeAnswer: 'Thinking the loop body rolls back its changes if the condition throws an exception.'
      },
      {
        question: 'How does compiler unreachable code analysis apply to do-while loops with constant false conditions?',
        answer: 'In Java, `do { ... } while (false);` is legal and compiles without error! The compiler recognizes this as a valid single-pass construct (often used in C/C++ macro idioms). In contrast, writing `while (false) { ... }` causes a compile-time "unreachable statement" error because the body can never be entered.',
        followUp: 'Why does the Java Language Specification treat `while(false)` and `do-while(false)` differently?',
        followUpAnswer: 'Because in `do-while(false)`, the body IS reachable and executes exactly once. Therefore, its statements are valid reachable code. In `while(false)`, the body is unreachable by definition, violating Java\'s reachability rules.',
        keyPhrases: ['do-while(false) is valid', 'body is reachable', 'while(false) fails compilation', 'reachability rules'],
        commonMistakeAnswer: 'Assuming `do { ... } while (false);` also causes an unreachable code compiler error.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the minimum number of times a do-while loop body will execute?',
        options: ['0 times', '1 time', '2 times', 'Depends on whether condition is true or false'],
        correctIndex: 1,
        explanation: 'Because do-while evaluates its condition at the exit (bottom) of the loop, the body is guaranteed to execute at least once.'
      },
      {
        question: 'Which of the following lines correctly terminates a do-while loop?',
        options: [
          'while (x < 10)',
          'while (x < 10);',
          '} while (x < 10)',
          'repeat while (x < 10);'
        ],
        correctIndex: 1,
        explanation: 'Java requires a semicolon immediately after the while condition: do { ... } while (condition);.'
      },
      {
        question: 'What is the output of this code?\nint x = 10;\ndo {\n    x++;\n} while (x < 5);\nSystem.out.println(x);',
        options: ['10', '11', '5', 'Compile Error'],
        correctIndex: 1,
        explanation: 'The body runs once: x increments from 10 to 11. Then (11 < 5) is false, so the loop exits and prints 11.'
      },
      {
        question: 'Where must a variable be declared if it is used in the while condition of a do-while loop?',
        options: [
          'Inside the do block',
          'Before the do block',
          'Inside the while parentheses',
          'Anywhere in the class'
        ],
        correctIndex: 1,
        explanation: 'Variables declared inside the do block go out of scope at the closing brace, so condition variables must be declared before the do block.'
      },
      {
        question: 'What happens in: do { ... } while (false);',
        options: [
          'Compile error: unreachable statement',
          'The body executes exactly once',
          'The body never executes',
          'Infinite loop'
        ],
        correctIndex: 1,
        explanation: 'In Java, `do { ... } while(false);` compiles cleanly and executes the body exactly once.'
      },
      {
        question: 'What is the output of:\nint i = 1;\ndo {\n    System.out.print(i + " ");\n    i += 2;\n} while (i <= 5);',
        options: ['1 3 5 ', '1 3 5 7 ', '1 3 ', '3 5 '],
        correctIndex: 0,
        explanation: 'i starts at 1 (prints 1, i becomes 3), 3 <= 5 is true (prints 3, i becomes 5), 5 <= 5 is true (prints 5, i becomes 7), 7 <= 5 is false. Loop exits.'
      },
      {
        question: 'When is a do-while loop preferred over a while loop?',
        options: [
          'When the loop must execute 0 or more times',
          'When the number of iterations is known before loop entry',
          'When the body must execute at least once, such as showing a user menu',
          'When optimizing for JVM bytecode size'
        ],
        correctIndex: 2,
        explanation: 'do-while is ideal when an action must be performed at least once prior to validating a continuation condition, like showing an input menu.'
      },
      {
        question: 'What is the output of:\nint a = 0;\ndo {\n    a++;\n    if (a == 2) continue;\n    System.out.print(a + " ");\n} while (a < 3);',
        options: ['1 2 3 ', '1 3 ', '1 ', '2 3 '],
        correctIndex: 1,
        explanation: 'Iteration 1: a=1, prints "1 ". Iteration 2: a=2, continue skips print, condition (2 < 3) is true. Iteration 3: a=3, prints "3 ", condition (3 < 3) is false. Loop terminates.'
      },
      {
        question: 'Which of the following loop types is categorized as an "exit-controlled" loop in Java?',
        options: ['for loop', 'while loop', 'enhanced for-each loop', 'do-while loop'],
        correctIndex: 3,
        explanation: 'The do-while loop is an exit-controlled loop because its test condition is evaluated at the exit of the loop.'
      },
      {
        question: 'What will happen if the developer forgets to increment the counter inside a do-while loop whose condition is `while (i < 5)` where `i = 0`?',
        options: [
          'The code fails compilation',
          'The loop executes once and terminates',
          'An infinite loop occurs at runtime',
          'The JVM throws an ArithmeticException'
        ],
        correctIndex: 2,
        explanation: 'If `i` is never incremented, `i < 5` remains true indefinitely, causing an infinite loop.'
      }
    ]
  },

  // ============================================================
  // LESSON 5.5: BREAK, CONTINUE & LABELED STATEMENTS
  // ============================================================
  'break-continue-labeled': {
    id: 'break-continue-labeled',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.5',
    title: 'Break, Continue & Labeled Statements',
    subtitle: 'Early loop termination, skipping iterations, labeled multi-level jumps, and unreachable code traps',
    estimatedMinutes: 18,
    beginnerAnalogy: 'Think of an automated candy factory conveyor belt:\n- A "break" is like an emergency stop button: if an alarm triggers, the entire conveyor belt shuts down immediately, and production ends.\n- A "continue" is an item rejection arm: when a misshapen candy appears, the sensor skips packaging that single piece and immediately moves on to the next candy.\n- A "labeled break" is a master facility shutdown switch: when a major defect occurs on an inner sub-assembly line, instead of just pausing that local station, it halts the entire factory line designated by the label!',
    interviewTakeaways: [
      'Unlabeled Break vs Continue: "break" terminates the innermost enclosing loop or switch immediately. "continue" skips the rest of the current iteration and jumps directly to the next loop cycle.',
      'For Loop vs While Loop Continue: In a for loop, continue jumps to the update expression (e.g. i++). In a while loop, continue jumps directly to the boolean condition—if the increment is below continue, it causes an infinite loop!',
      'Labeled Jump Statements: Java does not have "goto", but it provides labeled break and continue to control multi-nested loops cleanly.',
      'Unreachable Code Error: Placing any statement immediately after an unconditional break or continue causes a compile-time "unreachable statement" error.'
    ],
    cheatSheet: {
      summary: 'Branching statements that alter regular loop flow: break terminates, continue skips to next iteration, and labeled versions jump across nested loop boundaries.',
      syntaxTemplate: `// 1. Unlabeled break & continue
for (int i = 0; i < 10; i++) {
    if (i == 3) continue; // Skip iteration 3
    if (i == 7) break;    // Terminate entire loop
    System.out.print(i + " ");
}

// 2. Labeled break
outerLoop:
for (int r = 1; r <= 3; r++) {
    for (int c = 1; c <= 3; c++) {
        if (r * c == 4) break outerLoop; // Exits BOTH loops!
    }
}`,
      rules: [
        { rule: 'Innermost Scope Default', explanation: 'Without a label, break and continue apply strictly to the single innermost enclosing loop or switch.' },
        { rule: 'For Loop Continue Mechanics', explanation: 'In a for loop, continue executes the update expression (i++) before evaluating the condition.' },
        { rule: 'While Loop Continue Pitfall', explanation: 'In a while loop, continue skips statements below it. If counter increment is below, it creates an infinite loop.' },
        { rule: 'Unreachable Statement Trap', explanation: 'Any code following an unconditional break or continue in the same block will fail to compile.' },
        { rule: 'Label Placement', explanation: 'A label must immediately precede a loop statement: labelName: for(...). You cannot put code between label and loop.' },
        { rule: 'Switch vs Loop Break', explanation: 'Inside a switch enclosed in a loop, a standard break exits ONLY the switch, NOT the enclosing loop.' }
      ],
      quickComparison: [
        { aspect: 'Current Iteration', optionA: 'break: Immediately aborted', optionB: 'continue: Immediately aborted' },
        { aspect: 'Subsequent Iterations', optionA: 'break: Completely cancelled (loop terminates)', optionB: 'continue: Proceed normally with next cycle' },
        { aspect: 'Next Step in For Loop', optionA: 'break: Jumps past closing brace of loop', optionB: 'continue: Jumps to update expression (i++)' },
        { aspect: 'Next Step in While Loop', optionA: 'break: Jumps past closing brace of loop', optionB: 'continue: Jumps directly to condition check' },
        { aspect: 'With Labeled Target', optionA: 'break label: Exits the labeled enclosing block/loop', optionB: 'continue label: Jumps to next cycle of labeled loop' }
      ]
    },
    coreExplanation: [
      'Java provides three jump statements to alter the natural sequential flow of loops: break, continue, and return. This lesson focuses on break, continue, and their labeled variants.',
      'The break Statement: When encountered inside a loop (for, while, or do-while) or a switch block, break causes immediate cessation of the innermost loop. Execution resumes at the first statement following the loop.',
      'The continue Statement: Rather than terminating the loop, continue halts only the current iteration. Any remaining statements in the loop body are bypassed, and control jumps directly to the next iteration.',
      'Difference in For vs While Continue Behavior: In a for loop, continue jumps to the iteration/update step (e.g., i++), followed by the condition evaluation. In a while or do-while loop, continue jumps directly to the condition test. If your counter increment is located after the continue statement inside a while loop, it will never execute, resulting in an infinite loop.',
      'Labeled Break: In deeply nested loops, a standard break only terminates the innermost loop. Java allows prefixing a loop with an identifier followed by a colon (e.g., outer: for(...)). Calling "break outer;" breaks out of all nested loops up to and including the labeled loop.',
      'Labeled Continue: Calling "continue outer;" aborts the current iteration of the inner loop and immediately proceeds to the next iteration of the labeled outer loop.',
      'The Unreachable Code Rule: The Java compiler enforces strict reachability analysis. If an unconditional break or continue is followed by code within the same block without a conditional branch, the compiler rejects the program with an "unreachable statement" error.',
      'Clean Code Best Practice: While break and continue are powerful for early search exits and guard clauses, excessive use can lead to "spaghetti control flow". Always prefer clear loop boundary conditions when practical.'
    ],
    diagram: `+-----------------------------------------------------------+
|                     LOOP EXECUTION FLOW                   |
|                                                           |
|    for (int i = 0; i < 5; i++) {                          |
|         |                                                 |
|         +---> [ Code before branch ]                      |
|         |                                                 |
|         +---> if (conditionA) continue;                   |
|         |         |                                       |
|         |         +====[ JUMP TO i++ ]===> Next Iteration |
|         |                                                 |
|         +---> if (conditionB) break;                      |
|         |         |                                       |
|         |         +====[ JUMP OUT ]======> Loop Exits!    |
|         |                                                 |
|         +---> [ Code after branch ]                       |
|    }                                                      |
|    [ Code after loop resumes here ] <--------------------+|
+-----------------------------------------------------------+

+-----------------------------------------------------------+
|                   LABELED BREAK JUMP                      |
|                                                           |
|   outerLoop: for (int r = 0; ...) {                       |
|       for (int c = 0; ...) {                              |
|           if (foundTarget) break outerLoop;               |
|                   |                                       |
|                   +==============[ JUMP OUT OF BOTH ]====+|
|       }                                                  ||
|   }                                                      ||
|   [ Resumes here outside outerLoop ] <===================+|
+-----------------------------------------------------------+`,
    codeSnippet: {
      title: 'Break vs Continue in Action',
      code: `public class BreakContinueDemo {
    public static void main(String[] args) {
        System.out.print("Testing continue: ");
        for (int i = 1; i <= 6; i++) {
            if (i == 4) {
                continue; // Skips printing 4
            }
            System.out.print(i + " ");
        }

        System.out.println();
        System.out.print("Testing break: ");
        for (int i = 1; i <= 6; i++) {
            if (i == 4) {
                break; // Terminates loop completely when i is 4
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int i = 1; i <= 6; i++)', explanation: 'Sets up a standard loop running from i = 1 to 6.' },
        { line: 'if (i == 4) continue;', explanation: 'When i equals 4, skips printing and jumps directly to i++.' },
        { line: 'System.out.print(i + " ");', explanation: 'Prints 1, 2, 3, 5, 6 (4 was skipped).' },
        { line: 'if (i == 4) break;', explanation: 'In the second loop, when i equals 4, terminates the loop entirely.' },
        { line: 'System.out.print(i + " ");', explanation: 'Prints 1, 2, 3 and exits before printing 4, 5, or 6.' }
      ],
      output: `Testing continue: 1 2 3 5 6 
Testing break: 1 2 3 `
    },
    codeExamples: [
      {
        title: 'Example 1: Linear Search with Early Termination (Break)',
        description: 'Searching for a target value in a sequence and stopping the moment it is found to avoid wasted cycles.',
        code: `public class EarlySearch {
    public static void main(String[] args) {
        int target = 28;
        int foundAt = -1;

        for (int i = 10; i <= 50; i += 2) {
            if (i == target) {
                foundAt = i;
                System.out.println("Target " + target + " found! Exiting loop early.");
                break; // No need to continue checking numbers up to 50
            }
        }

        System.out.println("Search completed. Result: " + foundAt);
    }
}`,
        output: `Target 28 found! Exiting loop early.
Search completed. Result: 28`
      },
      {
        title: 'Example 2: Skipping Even Numbers to Sum Only Odds (Continue)',
        description: 'Using continue as a filter guard clause to process only odd numbers.',
        code: `public class SumOddNumbers {
    public static void main(String[] args) {
        int oddSum = 0;

        for (int num = 1; num <= 10; num++) {
            if (num % 2 == 0) {
                continue; // Skip even numbers immediately
            }
            oddSum += num;
            System.out.print(num + " ");
        }

        System.out.println();
        System.out.println("Sum of odd numbers: " + oddSum);
    }
}`,
        output: `1 3 5 7 9 
Sum of odd numbers: 25`
      },
      {
        title: 'Example 3: Labeled Break in a 2D Matrix Coordinate Search',
        description: 'Breaking out of both inner and outer loops simultaneously when a target coordinate condition is met.',
        code: `public class LabeledGridSearch {
    public static void main(String[] args) {
        int targetProduct = 12;
        boolean found = false;

        searchGrid:
        for (int row = 1; row <= 5; row++) {
            for (int col = 1; col <= 5; col++) {
                int product = row * col;
                if (product == targetProduct) {
                    System.out.println("Match found at (" + row + ", " + col + ")");
                    found = true;
                    break searchGrid; // Exits BOTH row and col loops!
                }
            }
        }

        System.out.println("Grid search status: " + (found ? "SUCCESS" : "NOT FOUND"));
    }
}`,
        output: `Match found at (3, 4)
Grid search status: SUCCESS`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'The while loop continue counter trap (accidental infinite loop)',
        whyItHappens: 'In `while(i < 10) { if(i==5) continue; i++; }`, when `i` reaches 5, `continue` jumps directly to `while(i < 10)` without executing `i++`. `i` stays 5 forever.',
        howToFix: 'Ensure `i++;` occurs BEFORE the `continue`, or prefer a `for` loop where `i++` is automatically executed on continue.'
      },
      {
        mistake: 'Unreachable statement error following unconditional break or continue',
        whyItHappens: 'Writing code immediately after a `break;` or `continue;` without placing it inside a conditional `if` block.',
        howToFix: 'The Java compiler detects dead code. Always place `break` and `continue` inside an `if` condition.'
      },
      {
        mistake: 'Expecting break inside a switch to exit the enclosing loop',
        whyItHappens: 'When a `switch` is nested inside a `for` or `while` loop, writing `break;` inside a switch case exits ONLY the switch, not the loop.',
        howToFix: 'Use a labeled break (e.g. `break outerLoop;`) or a boolean flag if you want to exit the enclosing loop from within a switch.'
      },
      {
        mistake: 'Placing statements between a label and its loop',
        whyItHappens: 'Writing `myLabel: int x = 0; for(...)` fails compilation because a label must be directly attached to the target statement or loop.',
        howToFix: 'Place the label immediately preceding the loop header: `myLabel: for (...)`.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Break in a For Loop',
        problemStatement: 'What is printed by the following code?',
        code: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        break;
    }
    sum += i;
}
System.out.println("sum=" + sum);`,
        options: [
          'sum=3',
          'sum=6',
          'sum=15',
          'sum=1'
        ],
        correctOptionIndex: 0,
        hint: 'When i == 3, the loop terminates immediately before adding 3 to sum.',
        solution: 'sum=3',
        explanation: 'i = 1: sum = 1. i = 2: sum = 1 + 2 = 3. i = 3: if condition triggers break, terminating loop immediately. Output is "sum=3".'
      },
      {
        title: 'Puzzle 2: Continue in a For Loop with Multiplier',
        problemStatement: 'Trace the output printed to the console:',
        code: `for (int k = 1; k <= 5; k++) {
    if (k % 2 != 0) {
        continue;
    }
    System.out.print((k * 10) + " ");
}`,
        options: [
          '10 30 50 ',
          '20 40 ',
          '20 40 60 ',
          '10 20 30 40 50 '
        ],
        correctOptionIndex: 1,
        hint: 'Odd numbers (1, 3, 5) trigger continue and are skipped.',
        solution: '20 40 ',
        explanation: 'k = 1: 1%2 != 0 (true), skipped. k = 2: 2%2 != 0 (false), prints 20. k = 3: skipped. k = 4: prints 40. k = 5: skipped. Output is "20 40 ".'
      },
      {
        title: 'Puzzle 3: Nested Loops with Unlabeled Break',
        problemStatement: 'What is the exact output of this nested loop snippet?',
        code: `for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            break;
        }
        System.out.print(i + "" + j + " ");
    }
}`,
        options: [
          '11 12 21 22 ',
          '11 21 ',
          '11 ',
          '11 12 13 '
        ],
        correctOptionIndex: 1,
        hint: 'An unlabeled break breaks ONLY the innermost loop (j).',
        solution: '11 21 ',
        explanation: 'Outer i = 1: j = 1 prints "11 ". Then j = 2 triggers break, exiting inner loop. Outer i = 2: j = 1 prints "21 ". Then j = 2 triggers break, exiting inner loop. Final output is "11 21 ".'
      },
      {
        title: 'Puzzle 4: Labeled Break Across Nested Loops',
        problemStatement: 'What does this code with a labeled break output?',
        code: `outer:
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == 2 && j == 2) {
            break outer;
        }
        System.out.print(i + "" + j + " ");
    }
}`,
        options: [
          '11 12 13 21 ',
          '11 12 13 21 31 32 33 ',
          '11 12 13 21 22 ',
          '11 12 13 '
        ],
        correctOptionIndex: 0,
        hint: 'When i == 2 and j == 2, `break outer` terminates BOTH loops permanently.',
        solution: '11 12 13 21 ',
        explanation: 'i = 1: prints "11 12 13 ". i = 2: j = 1 prints "21 ". When j = 2, condition (i == 2 && j == 2) is met, triggering `break outer`. Both loops terminate immediately. Output is "11 12 13 21 ".'
      },
      {
        title: 'Puzzle 5: Labeled Continue in Nested Loops',
        problemStatement: 'What is printed by this labeled continue code?',
        code: `outer:
for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        if (j == 2) {
            continue outer;
        }
        System.out.print(i + "" + j + " ");
    }
}`,
        options: [
          '11 21 ',
          '11 13 21 23 ',
          '11 12 21 22 ',
          '13 23 '
        ],
        correctOptionIndex: 0,
        hint: '`continue outer` jumps to the next iteration of the outer loop i, skipping j = 3.',
        solution: '11 21 ',
        explanation: 'i = 1: j = 1 prints "11 ". When j = 2, `continue outer` abandons the rest of the inner loop and increments i to 2. For i = 2: j = 1 prints "21 ". When j = 2, `continue outer` increments i to 3, which terminates outer loop. Output is "11 21 ".'
      },
      {
        title: 'Puzzle 6: Break Inside Switch Inside a Loop',
        problemStatement: 'Determine what the following code outputs:',
        code: `for (int k = 1; k <= 3; k++) {
    switch (k) {
        case 1:
            System.out.print("A");
            break;
        case 2:
            System.out.print("B");
            break;
        default:
            System.out.print("C");
    }
    System.out.print("-");
}`,
        options: [
          'A-',
          'A-B-C-',
          'ABC-',
          'Compile Error'
        ],
        correctOptionIndex: 1,
        hint: 'Does the break in a switch case break out of the for loop or only the switch?',
        solution: 'A-B-C-',
        explanation: 'A break inside a switch statement breaks ONLY the switch statement, not the enclosing for loop. Each iteration prints the letter and then prints "-": k=1 -> "A-", k=2 -> "B-", k=3 -> "C-". Result is "A-B-C-".'
      },
      {
        title: 'Puzzle 7: Loop Counter After Early Break',
        problemStatement: 'What is the final value of count printed to the console?',
        code: `int count = 0;
while (count < 10) {
    count += 2;
    if (count == 6) {
        break;
    }
}
System.out.println(count);`,
        options: [
          '6',
          '4',
          '10',
          '8'
        ],
        correctOptionIndex: 0,
        hint: 'Trace count: 0 -> 2 -> 4 -> 6 (break triggers).',
        solution: '6',
        explanation: 'count starts at 0. First cycle: count becomes 2. Second cycle: count becomes 4. Third cycle: count becomes 6, condition count == 6 is true, break executes. Output is 6.'
      },
      {
        title: 'Puzzle 8: Nested Loop Total Iterations with Break',
        problemStatement: 'How many times does the print statement execute in this code?',
        code: `int executions = 0;
for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;
        executions++;
    }
}
System.out.println(executions);`,
        options: [
          '12',
          '4',
          '8',
          '0'
        ],
        correctOptionIndex: 1,
        hint: 'For every iteration of i, what values of j execute executions++ before breaking?',
        solution: '4',
        explanation: 'Outer loop runs 4 times (i = 0, 1, 2, 3). For each i, when j = 0: executions is incremented. When j = 1: break triggers, terminating inner loop. Thus executions++ runs exactly once per outer loop: 4 * 1 = 4.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the difference between break and continue in Java with respect to loop execution.',
        answer: 'The `break` statement completely terminates the loop in which it appears; the remaining iterations are cancelled, and program control jumps to the statement immediately following the loop\'s closing brace. In contrast, `continue` terminates only the current iteration; it skips the remaining code in the body for that single cycle and immediately advances to the next iteration (jumping to the update expression in a `for` loop or to the condition in a `while` loop).',
        followUp: 'What happens if break is called inside an if statement that is not inside any loop or switch?',
        followUpAnswer: 'It will fail compilation with an error such as "break outside switch or loop". Break cannot be used in a standalone if statement unless associated with a labeled block.',
        keyPhrases: ['break terminates entire loop', 'continue skips current iteration', 'next iteration', 'unreachable outside loop'],
        commonMistakeAnswer: 'Saying both stop the loop but continue allows you to start over from 0.'
      },
      {
        question: 'Why does a continue statement in a while loop risk creating an infinite loop while the same logic in a for loop typically works fine?',
        answer: 'In a `for` loop, the update expression (e.g. `i++`) is a formal part of the loop header and is guaranteed to execute whenever `continue` is invoked. In a `while` loop, the update statement is written manually inside the body. If `continue` is placed above the update statement, execution jumps directly to the while condition at the top, skipping the increment. Because the counter is never updated, the condition remains true indefinitely, producing an accidental infinite loop.',
        followUp: 'How can you prevent this while loop trap?',
        followUpAnswer: 'Either perform the update step before the continue statement, or refactor the loop into a standard for loop where update execution is guaranteed by language design.',
        keyPhrases: ['update expression executed in for loop', 'update skipped in while loop', 'accidental infinite loop'],
        commonMistakeAnswer: 'Believing continue in a while loop also automatically increments variables.'
      },
      {
        question: 'Does Java have a "goto" statement? How do labeled break and continue relate to goto?',
        answer: 'In Java, `goto` is a reserved keyword, but it has no function and cannot be used in code. Instead, Java provides labeled `break` and labeled `continue` statements. Unlike arbitrary `goto` jumps which can jump anywhere in the program and create spaghetti code, Java\'s labeled statements can only jump to the boundaries of enclosing code blocks or loops that physically enclose the statement.',
        followUp: 'Can a labeled break jump forward to a loop that has not started yet?',
        followUpAnswer: 'No, a labeled break can only break out of an enclosing block that is currently active on the execution stack.',
        keyPhrases: ['goto is a reserved keyword without function', 'labeled break and continue', 'enclosing scope only', 'prevents spaghetti code'],
        commonMistakeAnswer: 'Saying Java has full goto support or that labeled break can jump to any arbitrary label anywhere in the file.'
      },
      {
        question: 'What is an "unreachable statement" compiler error, and how does it relate to break and continue?',
        answer: 'The Java compiler performs flow analysis to ensure that every statement in a program can theoretically be reached. If a `break` or `continue` is written unconditionally, any statement written after it in the same block can never be executed under any circumstance. The compiler flags this as an "unreachable statement" compile-time error. To fix it, the break or continue must be wrapped in a conditional branch (like an `if`).',
        followUp: 'Why doesn\'t the compiler just ignore the dead code as a warning?',
        followUpAnswer: 'The Java Language Specification strictly mandates that unreachable code is a compile error rather than a warning to prevent subtle developer mistakes and dead code accumulation in production systems.',
        keyPhrases: ['flow analysis', 'unconditional break/continue', 'compile-time error', 'Java Language Specification mandate'],
        commonMistakeAnswer: 'Saying unreachable code is only a runtime warning that is ignored by the JVM.'
      },
      {
        question: 'How do you break out of two or more nested loops at once in Java without using a labeled break?',
        answer: 'Without a labeled break, the standard approach is using a boolean flag (e.g. `boolean found = false;`). In the inner loop, when the exit condition is met, set `found = true;` and `break;`. Immediately in the outer loop, check `if (found) break;`. Alternatively, if the nested loops are inside their own method, an early `return` statement exits all nested loops and the method entirely.',
        followUp: 'Which approach is cleaner: labeled break or boolean flag?',
        followUpAnswer: 'For search algorithms across 2D structures, a labeled break is often cleaner and faster because it eliminates the boolean variable and redundant outer if checks. However, extracting the search into a helper method with an early return is often the cleanest architectural choice.',
        keyPhrases: ['boolean flag', 'early return', 'labeled break', 'eliminates redundant checks'],
        commonMistakeAnswer: 'Claiming that writing "break break;" works in Java.'
      },
      {
        question: 'If a break statement is placed inside a switch that is itself nested inside a while loop, what does the break terminate?',
        answer: 'The `break` terminates only the `switch` statement. It transfers control to the line immediately following the switch block, remaining inside the while loop. If the intention was to terminate the while loop from inside a switch case, a labeled break targeting the while loop must be used (e.g. `break myLoop;`).',
        followUp: 'What would happen if you used `continue` inside that same switch case?',
        followUpAnswer: 'Because switch does not support `continue`, the `continue` statement automatically binds to the enclosing while loop, skipping the rest of the loop iteration.',
        keyPhrases: ['terminates only the switch', 'labeled break to exit enclosing loop', 'continue binds to enclosing loop'],
        commonMistakeAnswer: 'Assuming break in a switch terminates both the switch and the enclosing loop.'
      },
      {
        question: 'Can you use a labeled break with a plain code block `{ }` that is not a loop?',
        answer: 'Yes! Java permits labeling any code block surrounded by curly braces `{ }`. A labeled break can break out of that block early. For example:\n`myBlock: {\n    if (error) break myBlock;\n    // remaining block code skipped\n}`\nThis is occasionally used in low-level bytecode generators or parsing routines without defining helper methods.',
        followUp: 'Can you use labeled continue with a plain block?',
        followUpAnswer: 'No, labeled `continue` can ONLY be used with loop statements (for, while, do-while). Attempting to use continue with a non-loop block causes a compile error: "not a loop label".',
        keyPhrases: ['labeled break works on any { } block', 'labeled continue requires a loop', 'compile error if continue on block'],
        commonMistakeAnswer: 'Believing labels can only ever be attached to loops.'
      },
      {
        question: 'What is the performance impact of using break and continue compared to regular condition checking?',
        answer: 'At the bytecode level, `break` and `continue` compile directly to simple unconditional jump instructions (`goto`). There is zero runtime performance penalty; in fact, early `break` often provides dramatic performance gains by eliminating thousands or millions of unnecessary iterations during search operations.',
        followUp: 'Are there any code maintainability trade-offs with excessive break/continue?',
        followUpAnswer: 'Yes, heavy use of multiple break and continue statements creates multiple exit points, making the loop\'s invariant and termination conditions harder to reason about and debug. They should be used judiciously, such as for clear guard clauses.',
        keyPhrases: ['compiles to goto bytecode', 'zero performance penalty', 'algorithmic speedup on early exit', 'maintainability trade-off'],
        commonMistakeAnswer: 'Saying break is slow because the JVM has to clean up loop variables.'
      },
      {
        question: 'What happens when `continue` executes inside the body of a `do-while` loop?',
        answer: 'Control immediately jumps past any remaining statements in the body directly to the `while (condition);` expression at the bottom of the loop. The condition is evaluated: if true, the next iteration starts; if false, the loop terminates.',
        followUp: 'How does this contrast with a `for` loop?',
        followUpAnswer: 'In a `for` loop, `continue` jumps to the update expression (`i++`) before the condition is evaluated. In a `do-while` loop, there is no separate update phase; it jumps straight to the condition check.',
        keyPhrases: ['jumps to while condition at bottom', 'evaluates condition immediately', 'contrasts with for update step'],
        commonMistakeAnswer: 'Thinking continue in a do-while loop skips the condition check and goes straight back to do.'
      },
      {
        question: 'Is it possible to have an infinite loop where break never executes? How do static analyzers detect this?',
        answer: 'Yes, if the condition guarding the `break` statement never evaluates to true due to a logic bug (e.g. `if (x == 10)` when `x` only takes odd values), the loop will run infinitely. Modern static analysis tools (like SonarQube or IntelliJ inspections) inspect loop variants and condition bounds to alert developers to potentially unreachable breaks or non-terminating loops.',
        followUp: 'Can the Java compiler itself detect all infinite loops at compile time?',
        followUpAnswer: 'No, due to the fundamental Halting Problem in computer science, a compiler cannot generally determine whether arbitrary loops will terminate at runtime.',
        keyPhrases: ['logic bug in guard condition', 'Halting Problem', 'static analysis tools', 'non-terminating loop'],
        commonMistakeAnswer: 'Assuming the Java compiler guarantees all loops will eventually terminate.'
      }
    ],
    miniQuiz: [
      {
        question: 'What does an unlabeled `break` statement do when executed inside a nested loop?',
        options: [
          'Terminates all enclosing loops',
          'Terminates only the innermost enclosing loop or switch',
          'Skips to the next iteration of the inner loop',
          'Exits the current method'
        ],
        correctIndex: 1,
        explanation: 'An unlabeled break terminates strictly the innermost loop or switch statement that contains it.'
      },
      {
        question: 'In a standard `for (int i = 0; i < 10; i++)` loop, what is the immediate effect of executing `continue`?',
        options: [
          'i is reset to 0',
          'Execution jumps past the closing brace of the loop',
          'Execution jumps directly to the update expression (i++)',
          'The program terminates'
        ],
        correctIndex: 2,
        explanation: 'In a for loop, continue skips remaining body statements and immediately executes the update expression (i++).'
      },
      {
        question: 'What will happen with this code?\nint i = 0;\nwhile (i < 5) {\n    if (i == 2) continue;\n    i++;\n}',
        options: [
          'The loop finishes normally when i is 5',
          'Compile error on continue',
          'An infinite loop occurs when i equals 2',
          'Prints: 0 1 3 4'
        ],
        correctIndex: 2,
        explanation: 'When i is 2, continue skips i++, jumping directly to while(i < 5). i remains 2 forever, causing an infinite loop.'
      },
      {
        question: 'What is the syntax for breaking out of an outer loop named `outer`?',
        options: [
          'break(outer);',
          'break outer;',
          'exit outer;',
          'goto outer;'
        ],
        correctIndex: 1,
        explanation: 'The syntax for a labeled break in Java is `break labelName;`.'
      },
      {
        question: 'What happens if you write a statement immediately after an unconditional `break;` inside an if block?',
        options: [
          'It executes after the loop exits',
          'It compiles with a warning',
          'The compiler reports an "unreachable statement" error',
          'The statement is executed conditionally'
        ],
        correctIndex: 2,
        explanation: 'Code immediately following an unconditional break in the same block can never be reached, causing a compilation error.'
      },
      {
        question: 'What does this code output?\nfor (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    if (i == 5) break;\n    System.out.print(i + " ");\n}',
        options: ['1 2 4 ', '1 2 3 4 ', '1 2 ', '1 2 4 5 '],
        correctIndex: 0,
        explanation: 'i=1 prints "1 ", i=2 prints "2 ", i=3 is skipped by continue, i=4 prints "4 ", i=5 triggers break. Final output is "1 2 4 ".'
      },
      {
        question: 'Can `continue` be used with a labeled statement that is a plain block `{ }` instead of a loop?',
        options: [
          'Yes, it jumps to the beginning of the block',
          'Yes, it behaves identically to break',
          'No, continue can only target loop statements',
          'Only if the block contains a switch'
        ],
        correctIndex: 2,
        explanation: 'Labeled continue can ONLY target loops (for, while, do-while). Using continue on a non-loop block is a compile error.'
      },
      {
        question: 'What is printed by:\nint x = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == j) continue;\n        x++;\n    }\n}\nSystem.out.println(x);',
        options: ['9', '6', '3', '0'],
        correctIndex: 1,
        explanation: 'There are 9 total pairs. The condition (i == j) is true for (0,0), (1,1), and (2,2) (3 times). The remaining 6 pairs increment x: 9 - 3 = 6.'
      },
      {
        question: 'Inside a switch statement nested in a loop, what does a standard `break;` inside a case do?',
        options: [
          'Breaks both the switch and the loop',
          'Breaks only the switch statement',
          'Breaks only the outer loop',
          'Throws an IllegalStateException'
        ],
        correctIndex: 1,
        explanation: 'A break inside a switch case breaks only out of the switch block, leaving loop execution active.'
      },
      {
        question: 'Which keyword is a reserved keyword in Java that cannot be used as an identifier, even though it has no function?',
        options: ['goto', 'jump', 'pass', 'label'],
        correctIndex: 0,
        explanation: '`goto` and `const` are reserved keywords in Java that are currently unused in the language syntax.'
      }
    ]
  },

  // ============================================================
  // LESSON 5.6: NESTED LOOPS & LOOP TRACING
  // ============================================================
  'nested-loops-and-tracing': {
    id: 'nested-loops-and-tracing',
    moduleId: 'java-loops',
    moduleTitle: '5. Loops & Iterations',
    lessonNumber: 'Lesson 5.6',
    title: 'Nested Loops & Loop Tracing',
    subtitle: 'Multi-dimensional iterations, coordinate grids, total iteration calculations, and systematic execution tracing',
    estimatedMinutes: 20,
    beginnerAnalogy: 'Think of an old mechanical clock or a car\'s digital trip odometer. The hour hand (outer loop) cannot advance by even a single notch until the minute hand (inner loop) has completed a full 60-minute journey around the clock face! For every single step the outer loop takes, the inner loop resets from scratch and runs through its entire lifecycle from beginning to end.',
    interviewTakeaways: [
      'Total Iterations Formula: For independent nested loops, the total iterations equal (Outer Count * Inner Count). Two nested loops of N iterations each result in O(N^2) quadratic time complexity.',
      'Dependent Inner Loops: When the inner loop limit depends on the outer loop counter (e.g. j <= i), total iterations follow the arithmetic sequence 1 + 2 + ... + N = N(N + 1)/2.',
      'Fresh Reset Every Cycle: The inner loop\'s initialization clause executes anew every time the outer loop body starts. Inner loop variables are re-initialized from scratch.',
      'Systematic Tracing Tables: Professional developers trace nested loops using a table with columns for: Outer Var, Inner Var, Inner Condition, Body Action/Print, and Post-Iteration Var State.'
    ],
    cheatSheet: {
      summary: 'A loop structure placed inside another loop, where the entire inner loop runs to completion for each single iteration of the outer loop.',
      syntaxTemplate: `// Standard 2D Grid Traversal (Rows and Columns)
for (int row = 1; row <= totalRows; row++) {
    for (int col = 1; col <= totalCols; col++) {
        System.out.print("(" + row + "," + col + ") ");
    }
    System.out.println(); // Newline after each full row completes!
}`,
      rules: [
        { rule: 'Inner Loop Reset', explanation: 'The inner loop initializes, runs all its iterations, and terminates completely for EACH step of the outer loop.' },
        { rule: 'Independent Iteration Math', explanation: 'If outer loop runs M times and inner runs N times independently, inner body executes M * N times.' },
        { rule: 'Dependent Triangular Math', explanation: 'If inner loop runs up to outer variable i (j <= i), total executions equal N(N + 1) / 2.' },
        { rule: 'Distinct Counter Variables', explanation: 'Never reuse the same counter name for nested loops (e.g. using `i` for both). Use `i` and `j`, or `row` and `col`.' },
        { rule: 'Outer Variable Corruption', explanation: 'Accidentally modifying the outer loop counter inside the inner loop body leads to premature termination or infinite loops.' },
        { rule: 'Row Formatting Rule', explanation: 'Use System.out.print() inside the inner loop for columns, and System.out.println() after the inner loop for row breaks.' }
      ],
      quickComparison: [
        { aspect: 'Loop Role', optionA: 'Outer Loop: Controls rows / macro cycles', optionB: 'Inner Loop: Controls columns / micro steps per row' },
        { aspect: 'Execution Frequency', optionA: 'Outer Loop: Advances once per full inner cycle', optionB: 'Inner Loop: Runs completely to termination for EVERY outer step' },
        { aspect: 'Variable Initialization', optionA: 'Outer Loop: Initialized once when nested construct starts', optionB: 'Inner Loop: Re-initialized from scratch on each outer iteration' },
        { aspect: 'Time Complexity', optionA: 'Independent: O(M * N) - multiplication', optionB: 'Dependent (j <= i): O(N^2) - triangular sum' },
        { aspect: 'Common Patterns', optionA: 'Independent: Grids, multiplication tables, matrices', optionB: 'Dependent: Pyramids, triangles, pair comparisons' }
      ]
    },
    coreExplanation: [
      'A nested loop is simply one loop placed inside the body of another loop. Java supports nesting any loop type (for, while, do-while) inside any other loop type to arbitrary depth.',
      'The Core Execution Lifecycle: When the outer loop starts iteration 1, control enters the inner loop. The inner loop executes its complete lifecycle from start to finish. Once the inner loop terminates, control proceeds to any remaining statements in the outer loop body, updates the outer counter, and re-enters the inner loop for iteration 2.',
      'Calculating Total Work (Independent Loops): When the inner loop\'s bounds do not depend on the outer loop variable, total body executions equal the product of both loops. If the outer loop runs R times and the inner loop runs C times, the innermost statement executes R * C times.',
      'Calculating Work for Dependent Loops: When the inner loop limit depends on the outer variable (e.g. `for (int j = 1; j <= i; j++)`), the inner loop executes 1 time when i=1, 2 times when i=2, up to N times when i=N. By Gauss\'s formula, the total iterations are 1 + 2 + ... + N = N(N + 1) / 2, which has O(N^2) quadratic growth.',
      'The 2D Grid Coordinate Mental Model: The outer loop index represents the row (vertical Y-axis), while the inner loop index represents the column (horizontal X-axis). Printing cell contents with `System.out.print()` followed by `System.out.println()` after the inner loop produces cleanly formatted rectangular and triangular patterns.',
      'Variable Shadowing & Scope Protection: In Java, declaring `for (int i = 0; ...)` and then declaring an inner `for (int i = 0; ...)` is illegal and produces a compile error: "variable i is already defined in method". Standard convention uses distinct identifiers like `i, j, k` or semantic names like `row, col`.',
      'Loop Tracing Methodology: Systematic code tracing involves constructing a state table on paper or scratchpad. For every step, record (1) Current Outer Var, (2) Current Inner Var, (3) Condition Truth Value, (4) Output Generated, and (5) State Changes after Update.',
      'Performance Warning: Nesting three loops each running N times creates O(N^3) cubic time complexity. For N = 1,000, three nested loops perform 1,000,000,000 operations, which can freeze applications. Always analyze nested loop bounds carefully.'
    ],
    diagram: `+-----------------------------------------------------------+
|              NESTED LOOP EXECUTION ARCHITECTURE           |
|                                                           |
|  OUTER LOOP (e.g., row = 1 to 3)                          |
|  +-----------------------------------------------------+  |
|  | [row = 1]                                           |  |
|  |   INNER LOOP (col = 1 to 4):                        |  |
|  |   col=1 -> col=2 -> col=3 -> col=4  [Completes!]     |  |
|  |   Print newline "\\n"                                |  |
|  +-----------------------------------------------------+  |
|  | [row = 2]                                           |  |
|  |   INNER LOOP (col = 1 to 4):                        |  |
|  |   col=1 -> col=2 -> col=3 -> col=4  [Completes!]     |  |
|  |   Print newline "\\n"                                |  |
|  +-----------------------------------------------------+  |
|  | [row = 3]                                           |  |
|  |   INNER LOOP (col = 1 to 4):                        |  |
|  |   col=1 -> col=2 -> col=3 -> col=4  [Completes!]     |  |
|  |   Print newline "\\n"                                |  |
|  +-----------------------------------------------------+  |
|  Total Inner Body Executions = 3 rows * 4 cols = 12       |
+-----------------------------------------------------------+`,
    codeSnippet: {
      title: 'Coordinate Grid Generation with Row & Column Loops',
      code: `public class NestedGridDemo {
    public static void main(String[] args) {
        int rows = 3;
        int cols = 3;

        for (int r = 1; r <= rows; r++) {
            for (int c = 1; c <= cols; c++) {
                System.out.print("[" + r + "," + c + "] ");
            }
            System.out.println(); // Advances to next line after completing a full row
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int r = 1; r <= rows; r++)', explanation: 'Outer loop manages rows from 1 to 3.' },
        { line: 'for (int c = 1; c <= cols; c++)', explanation: 'Inner loop manages columns from 1 to 3, resetting to 1 for every row.' },
        { line: 'System.out.print("[" + r + "," + c + "] ");', explanation: 'Prints the coordinate pair on the current line without a newline.' },
        { line: 'System.out.println();', explanation: 'Executes after inner loop finishes 3 columns, creating a new row in output.' }
      ],
      output: `[1,1] [1,2] [1,3] 
[2,1] [2,2] [2,3] 
[3,1] [3,2] [3,3] `
    },
    codeExamples: [
      {
        title: 'Example 1: Multiplication Table Grid (1 to 4)',
        description: 'Generating a formatted multiplication table using outer row numbers multiplied by inner column numbers.',
        code: `public class MultiplicationTable {
    public static void main(String[] args) {
        int size = 4;

        for (int i = 1; i <= size; i++) {
            for (int j = 1; j <= size; j++) {
                int product = i * j;
                // Print with spacing
                if (product < 10) {
                    System.out.print(" " + product + " ");
                } else {
                    System.out.print(product + " ");
                }
            }
            System.out.println();
        }
    }
}`,
        output: ` 1  2  3  4 
 2  4  6  8 
 3  6  9 12 
 4  8 12 16 `
      },
      {
        title: 'Example 2: Dependent Triangle Number Pattern',
        description: 'Creating a right-angled triangle where the inner column count is bounded by the current outer row number (j <= i).',
        code: `public class NumberTriangle {
    public static void main(String[] args) {
        int height = 4;

        for (int i = 1; i <= height; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `1 
1 2 
1 2 3 
1 2 3 4 `
      },
      {
        title: 'Example 3: Inverted Asterisk Triangle',
        description: 'Counting backwards in the outer loop to generate an inverted pattern from 4 stars down to 1.',
        code: `public class InvertedTriangle {
    public static void main(String[] args) {
        int rows = 4;

        for (int i = rows; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
        output: `* * * * 
* * * 
* * 
* `
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Incrementing the outer variable inside the inner loop header',
        whyItHappens: 'Accidentally typing `for (int j = 0; j < 3; i++)` instead of `j++`. The inner loop variable `j` never updates, causing an infinite loop while `i` skyrockets.',
        howToFix: 'Always double-check that the loop update matches the loop variable declared in that header: `j++` for variable `j`.'
      },
      {
        mistake: 'Forgetting System.out.println() after the inner loop',
        whyItHappens: 'Leaving out the newline causes all grid or pattern output to print across a single endless horizontal line.',
        howToFix: 'Place `System.out.println();` immediately after the closing brace of the inner loop, before the outer loop closes.'
      },
      {
        mistake: 'Re-declaring the same counter variable in nested loops',
        whyItHappens: 'Writing `for (int i = 0; ...)` and then `for (int i = 0; ...)` inside it. Java will not compile this because `i` is already in scope.',
        howToFix: 'Use separate variable names: `i` for outer, `j` for inner, or semantic names like `row` and `col`.'
      },
      {
        mistake: 'Miscounting total iterations when inner loop is dependent',
        whyItHappens: 'Assuming that because outer is N and inner runs up to i, total iterations is N * N. In reality, it is 1 + 2 + ... + N = N(N + 1)/2.',
        howToFix: 'Use a trace table to write down the number of steps for each outer iteration and sum them up.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Basic 2D Grid Total Iterations',
        problemStatement: 'How many total times will the string "X" be printed by this code?',
        code: `int count = 0;
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        System.out.print("X");
        count++;
    }
}
System.out.println();
System.out.println("count=" + count);`,
        options: [
          '7',
          '12',
          '9',
          '16'
        ],
        correctOptionIndex: 1,
        hint: 'Outer loop runs 3 times; inner loop runs 4 times for each outer iteration.',
        solution: '12',
        explanation: 'The outer loop runs 3 times (i = 0, 1, 2). For each outer iteration, the inner loop runs 4 times (j = 0, 1, 2, 3). Total executions = 3 * 4 = 12.'
      },
      {
        title: 'Puzzle 2: Dependent Inner Loop Accumulator',
        problemStatement: 'What is the final value of sum printed to the console?',
        code: `int sum = 0;
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        sum += j;
    }
}
System.out.println("sum=" + sum);`,
        options: [
          'sum=14',
          'sum=10',
          'sum=6',
          'sum=8'
        ],
        correctOptionIndex: 1,
        hint: 'Trace inner loop sum for i = 1, then i = 2, then i = 3.',
        solution: 'sum=10',
        explanation: 'i = 1: j runs for 1 -> sum adds 1 (sum = 1). i = 2: j runs for 1, 2 -> sum adds 1 + 2 = 3 (sum = 4). i = 3: j runs for 1, 2, 3 -> sum adds 1 + 2 + 3 = 6 (sum = 10). Final sum = 10.'
      },
      {
        title: 'Puzzle 3: Coordinate Product Filter',
        problemStatement: 'Trace the output printed by this nested loop snippet:',
        code: `for (int r = 1; r <= 2; r++) {
    for (int c = 1; c <= 3; c++) {
        if (r * c == 2) {
            System.out.print("(" + r + "," + c + ") ");
        }
    }
}`,
        options: [
          '(1,2) (2,1) ',
          '(1,2) ',
          '(2,1) ',
          '(1,1) (2,2) '
        ],
        correctOptionIndex: 0,
        hint: 'Which pairs (r, c) satisfy r * c == 2 where r in [1,2] and c in [1,3]?',
        solution: '(1,2) (2,1) ',
        explanation: 'Pairs evaluated: (1,1)->1, (1,2)->2 (match!), (1,3)->3, (2,1)->2 (match!), (2,2)->4, (2,3)->6. Output is "(1,2) (2,1) ".'
      },
      {
        title: 'Puzzle 4: Inverted Inner Loop Tracing',
        problemStatement: 'What is the exact output of this code?',
        code: `for (int i = 2; i >= 1; i--) {
    for (int j = 1; j <= i; j++) {
        System.out.print(i + "" + j + " ");
    }
}`,
        options: [
          '21 22 11 ',
          '21 11 12 ',
          '11 12 21 ',
          '22 21 11 '
        ],
        correctOptionIndex: 0,
        hint: 'Trace i = 2 first, then i = 1.',
        solution: '21 22 11 ',
        explanation: 'When i = 2: inner loop j runs for 1, 2 -> prints "21 22 ". When i = 1: inner loop j runs for 1 -> prints "11 ". Output is "21 22 11 ".'
      },
      {
        title: 'Puzzle 5: Diagonal Matrix Output',
        problemStatement: 'What does the following nested loop print to the console?',
        code: `for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == j) {
            System.out.print("1");
        } else {
            System.out.print("0");
        }
    }
    System.out.print(" ");
}`,
        options: [
          '100 010 001 ',
          '111 000 000 ',
          '001 010 100 ',
          '101 010 101 '
        ],
        correctOptionIndex: 0,
        hint: 'When row == col, 1 is printed; otherwise 0.',
        solution: '100 010 001 ',
        explanation: 'Row 0: i=0, j=0 (1), j=1 (0), j=2 (0) -> "100". Row 1: i=1, j=0 (0), j=1 (1), j=2 (0) -> "010". Row 2: i=2, j=0 (0), j=1 (0), j=2 (1) -> "001". Result with trailing space per row is "100 010 001 ".'
      },
      {
        title: 'Puzzle 6: Tracing Independent Inner while Loop',
        problemStatement: 'Trace the output of this mixed for-while nested loop:',
        code: `for (int i = 1; i <= 2; i++) {
    int w = 2;
    while (w > 0) {
        System.out.print(i * w + " ");
        w--;
    }
}`,
        options: [
          '2 1 4 2 ',
          '2 1 2 1 ',
          '2 4 1 2 ',
          '4 2 2 1 '
        ],
        correctOptionIndex: 0,
        hint: 'Notice that w is re-initialized to 2 at the beginning of each outer for-loop cycle.',
        solution: '2 1 4 2 ',
        explanation: 'i = 1: w = 2 -> prints 1*2 = 2. w = 1 -> prints 1*1 = 1. w becomes 0, while loop exits. i = 2: w is reset to 2. w = 2 -> prints 2*2 = 4. w = 1 -> prints 2*1 = 2. Result is "2 1 4 2 ".'
      },
      {
        title: 'Puzzle 7: Outer Variable Mutation Bug',
        problemStatement: 'What does this buggy loop print before terminating?',
        code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 2; j++) {
        System.out.print(i + " ");
        i++; // Mutating outer variable!
    }
}`,
        options: [
          '1 2 4 5 ',
          '1 2 ',
          '1 2 3 ',
          'Infinite loop'
        ],
        correctOptionIndex: 1,
        hint: 'Trace how i changes during the first run of the inner loop and then what i becomes after the outer loop increment.',
        solution: '1 2 ',
        explanation: 'i starts at 1. j=1: prints "1 ", i increments to 2. j=2: prints "2 ", i increments to 3. Inner loop exits. Outer loop update executes: `i++`, so i becomes 4. Outer condition `(4 <= 3)` is false! Loop terminates. Final output is "1 2 ".'
      },
      {
        title: 'Puzzle 8: Three-Level Nested Loop Count',
        problemStatement: 'What is the final value of counter?',
        code: `int counter = 0;
for (int a = 0; a < 2; a++) {
    for (int b = 0; b < 3; b++) {
        for (int c = 0; c < 2; c++) {
            counter++;
        }
    }
}
System.out.println(counter);`,
        options: [
          '12',
          '7',
          '8',
          '18'
        ],
        correctOptionIndex: 0,
        hint: 'Multiply the iteration count of each independent level: 2 * 3 * 2.',
        solution: '12',
        explanation: 'Independent loops multiply: 2 (outer) * 3 (middle) * 2 (inner) = 12 total iterations. counter is 12.'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do you calculate the time complexity of nested loops?',
        answer: 'You determine the number of iterations each loop level performs as a function of input size N. For independent nested loops, you multiply the bounds: an outer loop running N times with an inner loop running N times results in N * N = O(N^2) quadratic time. For dependent nested loops where the inner loop runs from 1 to i, total iterations equal 1 + 2 + ... + N = N(N+1)/2, which is also asymptotically O(N^2). If there are K nested independent loops of size N, the complexity is O(N^K).',
        followUp: 'Can two nested loops ever have O(N) linear time complexity?',
        followUpAnswer: 'Yes! In algorithms like the two-pointer approach or sliding window, even though there is an outer loop and an inner while loop, the inner pointer only advances forward and never resets. Across all outer iterations, the inner pointer moves at most N times total, resulting in O(N) amortized linear time.',
        keyPhrases: ['multiply bounds for independent', 'triangular sum N(N+1)/2', 'O(N^2) quadratic time', 'amortized analysis for sliding window'],
        commonMistakeAnswer: 'Assuming any code with two nested loops is automatically O(N^2) without checking if the inner pointer resets.'
      },
      {
        question: 'What is the difference between an independent nested loop and a dependent nested loop?',
        answer: 'In an independent nested loop, the inner loop\'s start, termination condition, and update are completely fixed and do not reference the outer loop counter (e.g. `for(int j=0; j<M; j++)`). The inner loop always executes exactly M times regardless of the outer loop. In a dependent nested loop, the inner loop\'s bounds depend directly on the outer loop\'s current state (e.g. `for(int j=0; j<=i; j++)`). As the outer loop progresses, the number of inner iterations dynamically changes on each cycle.',
        followUp: 'What kinds of real-world problems require dependent nested loops?',
        followUpAnswer: 'Algorithms comparing unique pairs in a sequence without duplicate self-comparisons (e.g. comparing element i with element j for all j > i), generating permutations/combinations, and rendering triangular visual patterns.',
        keyPhrases: ['fixed bounds vs dynamic bounds', 'references outer variable', 'pair comparisons without duplicates', 'arithmetic progression'],
        commonMistakeAnswer: 'Saying independent loops run concurrently on different CPU cores while dependent loops run sequentially.'
      },
      {
        question: 'Why does Java disallow declaring the same variable name in nested loop headers (e.g. using `int i` for both)?',
        answer: 'Java strictly enforces variable scoping rules to prevent variable shadowing within the same method. When `for (int i = 0; ...)` is declared, `i` exists within the outer loop body scope. Declaring `for (int i = 0; ...)` inside that scope would create a name collision where the compiler cannot disambiguate which `i` is being referenced. The compiler throws a "variable i is already defined" error.',
        followUp: 'Is this rule the same in C or C++?',
        followUpAnswer: 'In C and C++, block scope shadowing is permitted: the inner `i` simply shadows the outer `i`, making the outer variable temporarily inaccessible. Java intentionally banned local variable shadowing inside methods to prevent catastrophic logic bugs.',
        keyPhrases: ['variable shadowing prohibited in method scope', 'name collision', 'already defined compile error', 'prevent subtle bugs'],
        commonMistakeAnswer: 'Thinking Java allows it but gives a warning.'
      },
      {
        question: 'What is a loop tracing table and how do you construct one when debugging complex nested loops?',
        answer: 'A loop tracing table is a structured tabular representation of program state tracked manually step by step. Columns typically include: Step/Line Number, Outer Loop Variable, Inner Loop Variable, Inner Condition Evaluation (True/False), Variables Modified/Output Printed, and Next State. By executing each line exactly as the JVM does, developers identify off-by-one errors, incorrect boundary conditions, and unintended variable mutations.',
        followUp: 'What are the two most common bugs identified via trace tables in nested loops?',
        followUpAnswer: 'First is off-by-one errors in boundary conditions (using `<` instead of `<=`), and second is forgetting to reset an inner accumulator variable inside the outer loop body.',
        keyPhrases: ['tabular state representation', 'step-by-step JVM simulation', 'identifies off-by-one errors', 'accumulator reset bugs'],
        commonMistakeAnswer: 'Describing a trace table as an automated IDE profiling graph.'
      },
      {
        question: 'What happens if you accidentally modify the outer loop counter inside the inner loop body?',
        answer: 'Modifying the outer loop variable inside the inner loop corrupts the macro iteration sequence. If you increment the outer counter inside the inner loop, the outer loop will advance prematurely and terminate far earlier than intended. If you decrement it, you will likely cause an accidental infinite loop. Best practice dictates that the outer counter should only be modified in its own loop header.',
        followUp: 'Is there ever a legitimate reason to modify an outer loop variable inside an inner loop?',
        followUpAnswer: 'Rarely. In certain custom parsing or token consumption algorithms, an inner loop may consume variable-length tokens and advance the outer stream index. However, in modern clean architecture, such logic is almost always refactored into dedicated stream iterators or helper methods.',
        keyPhrases: ['corrupts iteration sequence', 'premature termination', 'accidental infinite loop', 'code smell'],
        commonMistakeAnswer: 'Claiming Java prevents you from modifying the outer variable at compile time (it compiles fine, but introduces runtime logic bugs).'
      },
      {
        question: 'How do you print a 2D matrix or pattern with correct line breaks using nested loops?',
        answer: 'Inside the inner loop, use `System.out.print()` to output each cell or character on the same horizontal line, accompanied by a space or separator. Immediately following the closing brace of the inner loop (but still inside the outer loop), call `System.out.println();` with no arguments. This moves the console cursor down to the next row before the next outer iteration begins.',
        followUp: 'What happens if you put `System.out.println()` inside the inner loop instead?',
        followUpAnswer: 'Every single cell or character will be printed on its own individual line, creating a single vertical strip of output rather than a 2D grid.',
        keyPhrases: ['print() inside inner loop', 'println() after inner loop', 'row break', 'avoids single vertical strip'],
        commonMistakeAnswer: 'Using `System.out.println()` everywhere and wondering why the grid is vertical.'
      },
      {
        question: 'Can you nest loops of different types, such as a while loop inside a for loop or vice versa?',
        answer: 'Yes, completely. Java treats all loop constructs as statements. You can nest a `while` loop inside a `for` loop, a `do-while` loop inside a `while` loop, or any other combination. The semantics remain identical: the inner loop executes completely to termination for every single step of the outer loop.',
        followUp: 'When would you use a while loop inside a for loop?',
        followUpAnswer: 'A classic example is processing a fixed number of rows (using a for loop for known count) where each row contains variable-length data read from an input stream until a sentinel character is encountered (using an inner while loop).',
        keyPhrases: ['loops are interchangeable statements', 'arbitrary mixing', 'fixed rows with variable input streams'],
        commonMistakeAnswer: 'Assuming you can only nest loops of the exact same type (e.g. for inside for only).'
      },
      {
        question: 'What is the impact of deeply nested loops (3, 4, or more levels) on software quality and performance?',
        answer: 'Deeply nested loops degrade software along two dimensions: performance and maintainability. Performance-wise, each nesting level multiplies runtime, leading to polynomial (O(N^3), O(N^4)) execution times that fail to scale. Maintainability-wise, deeply nested code creates high cyclomatic complexity, deeply indented "arrow anti-pattern" code, and severe cognitive load for developers trying to reason about state.',
        followUp: 'How do professional engineers refactor deeply nested loops?',
        followUpAnswer: 'By extracting inner loops into well-named private helper methods, utilizing lookup sets or hash maps to replace inner search loops with O(1) lookups, or adopting Java Streams and database-level joins.',
        keyPhrases: ['polynomial complexity O(N^3)', 'cyclomatic complexity', 'arrow anti-pattern', 'extract method refactoring'],
        commonMistakeAnswer: 'Saying modern CPUs are so fast that 4 nested loops do not matter.'
      },
      {
        question: 'How do you invert a triangle pattern from pointing down to pointing up?',
        answer: 'In a triangle pointing down (widest at top), the outer loop typically starts at N and decrements down to 1 (`for(int i = N; i >= 1; i--)`), while the inner loop runs `j <= i`. To invert it so it points up (narrowest at top), the outer loop starts at 1 and increments up to N (`for(int i = 1; i <= N; i++)`), with the inner loop still running `j <= i`.',
        followUp: 'What if the triangle needs leading spaces to be right-aligned?',
        followUpAnswer: 'You introduce two sequential inner loops inside the outer loop: the first inner loop prints `N - i` spaces, and the second inner loop prints `i` asterisks, followed by `System.out.println()`.',
        keyPhrases: ['decrementing vs incrementing outer loop', 'two sequential inner loops', 'leading spaces loop'],
        commonMistakeAnswer: 'Trying to use a negative number of stars in a single inner loop.'
      },
      {
        question: 'In loop tracing, what is an "off-by-one error" and why is it especially rampant in nested loops?',
        answer: 'An off-by-one error (OBOE) occurs when a loop iterates one time too many or one time too few due to improper boundary operators (`<` vs `<=`), incorrect initial values (0 vs 1), or incorrect termination conditions. In nested loops, an off-by-one error in the outer loop scales across all inner iterations; an error of just 1 extra outer iteration can trigger an entire extra cycle of N inner iterations, significantly distorting results or overflowing array boundaries.',
        followUp: 'What simple mental sanity check helps eliminate off-by-one errors?',
        followUpAnswer: 'Test extreme boundary values: check the behavior when N = 0, N = 1, and the final value. For a standard 0-indexed loop of size N, the pattern is strictly `for(int i = 0; i < N; i++)`.',
        keyPhrases: ['iterates one time too many/few', '< vs <= boundary', 'scales across inner loops', 'test boundary conditions N=0, N=1'],
        commonMistakeAnswer: 'Saying off-by-one error only happens when using <= with 0.'
      }
    ],
    miniQuiz: [
      {
        question: 'If an outer loop runs 5 times and an inner loop runs 4 times independently, how many times does the inner loop body execute?',
        options: ['9 times', '20 times', '25 times', '16 times'],
        correctIndex: 1,
        explanation: 'For independent nested loops, total executions equal the product of both iteration counts: 5 * 4 = 20.'
      },
      {
        question: 'What is the total number of inner loop executions in: for (int i = 1; i <= 4; i++) for (int j = 1; j <= i; j++) ?',
        options: ['16', '10', '12', '8'],
        correctIndex: 1,
        explanation: 'When i=1 (1 run), i=2 (2 runs), i=3 (3 runs), i=4 (4 runs). Total executions = 1 + 2 + 3 + 4 = 10.'
      },
      {
        question: 'What will happen if you declare `for (int i = 0; ...)` and then inside it declare `for (int i = 0; ...)`?',
        options: [
          'The inner loop shadows the outer variable cleanly',
          'A compilation error occurs: variable i is already defined',
          'The outer loop variable is automatically renamed',
          'A runtime NullPointerException is thrown'
        ],
        correctIndex: 1,
        explanation: 'Java prohibits re-declaring a variable with the same name inside the same local scope, failing with a compile-time error.'
      },
      {
        question: 'What is the purpose of placing `System.out.println();` after the inner loop in a grid printing routine?',
        options: [
          'To flush the standard output buffer',
          'To move to the next row line after all columns for that row are printed',
          'To reset the inner loop counter to zero',
          'To terminate the outer loop'
        ],
        correctIndex: 1,
        explanation: 'The inner loop prints elements across columns on the same line. `System.out.println()` inserts a line break to start the next row.'
      },
      {
        question: 'What does this code output?\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 2; j++) {\n        System.out.print(i * j + " ");\n    }\n}',
        options: ['1 2 2 4 ', '1 1 2 2 ', '1 2 3 4 ', '2 4 2 4 '],
        correctIndex: 0,
        explanation: 'i=1: j=1 -> 1, j=2 -> 2. i=2: j=1 -> 2, j=2 -> 4. Output: "1 2 2 4 ".'
      },
      {
        question: 'What is the time complexity of two nested loops of size N where the inner loop is dependent (`j <= i`)?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'The arithmetic series sum is N(N + 1) / 2 = (N^2 + N) / 2, which has quadratic O(N^2) complexity.'
      },
      {
        question: 'What happens when a `break` statement without a label is executed inside an inner loop?',
        options: [
          'It terminates both the inner and outer loops',
          'It terminates only the inner loop',
          'It skips to the next iteration of the inner loop',
          'It exits the main method'
        ],
        correctIndex: 1,
        explanation: 'An unlabeled break statement terminates only the single innermost loop that encloses it.'
      },
      {
        question: 'What is printed by:\nint x = 0;\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        x++;\n    }\n}\nSystem.out.println(x);',
        options: ['5', '6', '8', '9'],
        correctIndex: 1,
        explanation: 'The inner loop body executes 3 * 2 = 6 times. x increments 6 times, ending at 6.'
      },
      {
        question: 'In a coordinate system model of nested loops, which axis does the outer loop index typically represent?',
        options: [
          'The column (horizontal X-axis)',
          'The row (vertical Y-axis)',
          'The Z-depth axis',
          'The diagonal axis'
        ],
        correctIndex: 1,
        explanation: 'By standard convention, the outer loop controls the vertical row index and the inner loop controls the horizontal column index.'
      },
      {
        question: 'Which of the following is the most effective technique to avoid off-by-one errors when writing nested loop bounds?',
        options: [
          'Always use while loops instead of for loops',
          'Trace extreme boundary conditions (e.g. N = 0 and N = 1) manually',
          'Add an extra dummy iteration to every loop',
          'Use floating-point loop counters'
        ],
        correctIndex: 1,
        explanation: 'Tracing edge cases with boundary values (such as N=0 and N=1) ensures loop conditions start and terminate at the precise expected counts.'
      }
    ]
  }
};
