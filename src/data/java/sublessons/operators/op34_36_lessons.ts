import { DetailedLesson } from '../../detailedLessons';

export const op34_36_lessons: Record<string, DetailedLesson> = {
  // ────────────────────────────────────────────────────────────
  // LESSON 3.4: Logical Operators & Short-Circuiting
  // ────────────────────────────────────────────────────────────
  'short-circuit-evaluation': {
    id: 'short-circuit-evaluation',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.4',
    title: 'Logical Operators & Short-Circuiting',
    subtitle: 'Short-circuit evaluation (&&, ||), logical NOT (!), side-effect traps, and guarding against runtime errors',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Imagine a bouncer at a club door checking two requirements: "Has valid ID AND is wearing formal shoes". If the guest has NO ID, the bouncer immediately turns them away without ever glancing down at their shoes. Why waste time checking shoes when entry is already impossible? Conversely, at a VIP lounge with "Has VIP Pass OR on Guest List", showing a VIP pass grants immediate entry without the host searching the guest list. In Java, this intelligent early exit is called short-circuit evaluation.',
    interviewTakeaways: [
      'Short-circuit AND (&&) halts and returns false immediately if the left operand is false; the right operand is never evaluated.',
      'Short-circuit OR (||) halts and returns true immediately if the left operand is true; the right operand is never evaluated.',
      'Non-short-circuit operators (& and |) evaluate BOTH operands unconditionally, even on boolean expressions.',
      'The Guard Pattern: Always place safety checks (such as divisor != 0) on the left of && to protect right-side expressions from crashing.',
      'Side-Effect Trap: Never place increments (++x) or assignments in the right operand of && or ||, as they may be skipped silently.'
    ],
    cheatSheet: {
      summary: 'Short-circuit logical operators (&&, ||) optimize runtime evaluation by skipping the right-hand operand whenever the left operand suffices to determine the boolean outcome.',
      syntaxTemplate: `boolean resultAnd = (leftCondition && rightCondition); // Skips right if left is false
boolean resultOr  = (leftCondition || rightCondition); // Skips right if left is true
boolean resultNot = !condition;                        // Inverts boolean state`,
      rules: [
        { rule: 'Strict Boolean Operands', explanation: 'Logical operators &&, ||, and ! strictly require boolean operands. Passing numbers or integers causes a compile-time error.' },
        { rule: '&& Short-Circuit Rule', explanation: 'If left operand evaluates to false, result is guaranteed false. Right operand is skipped entirely.' },
        { rule: '|| Short-Circuit Rule', explanation: 'If left operand evaluates to true, result is guaranteed true. Right operand is skipped entirely.' },
        { rule: 'Precedence Hierarchy', explanation: 'Logical NOT (!) has highest unary precedence, followed by Logical AND (&&), followed by Logical OR (||).' },
        { rule: 'Left-to-Right Associativity', explanation: 'Expressions involving multiple logical operators evaluate strictly from left to right.' },
        { rule: 'Bitwise / Boolean Non-Short-Circuit', explanation: '& and | evaluate both sides regardless of outcome, which can lead to unexpected runtime exceptions if used as guards.' }
      ],
      quickComparison: [
        { aspect: 'Operator', optionA: '&& (Conditional AND)', optionB: '& (Logical / Bitwise AND)' },
        { aspect: 'Short-Circuiting', optionA: 'Yes: Skips RHS if LHS is false', optionB: 'No: Always evaluates both LHS and RHS' },
        { aspect: 'Safe Guard Usage', optionA: 'Safe: (b != 0 && a / b > 1) prevents / by zero', optionB: 'Hazardous: Evaluates a / 0 and throws ArithmeticException' },
        { aspect: 'Side-Effect Execution', optionA: 'Conditional: RHS side-effects run ONLY if LHS is true', optionB: 'Guaranteed: RHS side-effects ALWAYS execute' },
        { aspect: 'Primary Use Case', optionA: 'Boolean control logic and conditional branch guards', optionB: 'Bitwise masking or mandatory dual evaluation' }
      ]
    },
    coreExplanation: [
      'Java provides three primary logical operators: Logical NOT (!), Logical AND (&&), and Logical OR (||). These operators strictly require boolean operands and produce boolean results.',
      'Logical NOT (!) is a unary operator with high precedence that inverts boolean state: !true becomes false, and !false becomes true. Double negation (!!flag) restores the original boolean value.',
      'Short-Circuit AND (&&): Java evaluates operands from left to right. If the left-hand operand evaluates to false, the entire expression cannot possibly be true. The JVM short-circuits immediately, returning false without executing the right-hand operand.',
      'Short-Circuit OR (||): If the left-hand operand evaluates to true, the compound expression is guaranteed to be true. The JVM halts evaluation immediately, returning true without touching the right-hand operand.',
      'The Guard Pattern: Short-circuiting is essential for defensive coding. For example, in (denominator != 0 && numerator / denominator > 2), the left condition acts as a protective shield. If denominator is 0, the division is never evaluated, preventing an ArithmeticException.',
      'The Side-Effect Trap: Any operation that modifies program state (such as ++counter, --x, or variable assignment) placed on the right side of a short-circuit operator will be bypassed if the left operand triggers a short circuit, creating elusive bugs.',
      'Logical Non-Short-Circuit Operators (& and |): When applied to boolean values, single & and | perform boolean logic without short-circuiting. Both operands are unconditionally evaluated, which forfeits the guard pattern protection.'
    ],
    diagram: `=== LOGICAL OPERATOR SHORT-CIRCUITING IN JAVA ===

1. Conditional AND (&&):
   [ Left Operand ] --- false ---> [ RESULT: false ] (Right Operand SKIPPED)
          |
         true
          v
   [ Evaluate Right Operand ] ---> [ Return Right Operand's Value ]

2. Conditional OR (||):
   [ Left Operand ] --- true ----> [ RESULT: true  ] (Right Operand SKIPPED)
          |
        false
          v
   [ Evaluate Right Operand ] ---> [ Return Right Operand's Value ]

3. Defensive Guard Pattern:
   (divisor != 0  &&  dividend / divisor > 5)
         |
      false ---> Skips division entirely -> NO ArithmeticException!`,
    codeSnippet: {
      title: 'Short-Circuit Evaluation and Guard Patterns in Java',
      code: `public class ShortCircuitDemo {
    public static void main(String[] args) {
        int divisor = 0;
        int dividend = 50;

        // SAFE: Short-circuit prevents division by zero
        if (divisor != 0 && (dividend / divisor > 2)) {
            System.out.println("Condition met!");
        } else {
            System.out.println("Safely guarded against division by zero!");
        }

        // SIDE EFFECT TRAP: ++count is skipped because left side is true
        int count = 0;
        boolean result = (10 > 2) || (++count > 0);
        System.out.println("Result: " + result + ", count: " + count);
    }
}`,
      lineByLineExplanation: [
        { line: 'divisor != 0 && (dividend / divisor > 2)', explanation: 'divisor != 0 evaluates to false. Short-circuit AND immediately stops; right operand is never executed.' },
        { line: 'System.out.println("Safely guarded...");', explanation: 'Executes safely without throwing ArithmeticException: / by zero.' },
        { line: 'boolean result = (10 > 2) || (++count > 0);', explanation: '(10 > 2) evaluates to true. Short-circuit OR stops immediately; ++count is bypassed.' },
        { line: 'System.out.println("Result: " + ...);', explanation: 'Prints Result: true and count: 0, proving the right-hand increment never ran.' }
      ],
      output: `Safely guarded against division by zero!
Result: true, count: 0`
    },
    codeExamples: [
      {
        title: 'Safe Defensive Guard Pattern',
        description: 'Using short-circuit && to prevent runtime arithmetic crashes when dividing numbers.',
        code: `public class SafeGuardExample {
    public static void main(String[] args) {
        int capacity = 0;
        int items = 100;

        // Without && short-circuit, this would crash with ArithmeticException
        boolean hasRoom = (capacity > 0) && ((items / capacity) < 10);

        System.out.println("Has room: " + hasRoom);
        System.out.println("Program finished safely without crash!");
    }
}`,
        output: `Has room: false
Program finished safely without crash!`
      },
      {
        title: 'Side-Effect Bypassing Trap',
        description: 'Demonstrating how pre-increment operations on the right side of || and && are skipped.',
        code: `public class SideEffectTrap {
    public static void main(String[] args) {
        int x = 10;
        int y = 20;

        // Left is true -> || short-circuits -> ++y NEVER happens
        boolean orResult = (x == 10) || (++y > 20);
        System.out.println("orResult: " + orResult + ", y after OR: " + y);

        // Left is false -> && short-circuits -> ++x NEVER happens
        boolean andResult = (y == 99) && (++x > 10);
        System.out.println("andResult: " + andResult + ", x after AND: " + x);
    }
}`,
        output: `orResult: true, y after OR: 20
andResult: false, x after AND: 10`
      },
      {
        title: 'Non-Short-Circuit Boolean Operator (& vs &&)',
        description: 'Comparing short-circuit && with bitwise/boolean & where both sides must evaluate.',
        code: `public class BitwiseVsLogical {
    public static void main(String[] args) {
        int a = 0;
        int b = 0;

        // Short-circuit: right side skipped
        boolean test1 = (false) && (++a > 0);

        // Non-short-circuit: right side ALWAYS evaluated
        boolean test2 = (false) & (++b > 0);

        System.out.println("test1: " + test1 + ", a: " + a);
        System.out.println("test2: " + test2 + ", b: " + b);
    }
}`,
        output: `test1: false, a: 0
test2: false, b: 1`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Putting side-effects (like ++i or i += 2) in the right-hand operand of && or ||.',
        whyItHappens: 'Developers assume every expression in a line of code is guaranteed to execute.',
        howToFix: 'Extract the side effect into its own independent statement before evaluating the logical condition.'
      },
      {
        mistake: 'Reversing the order in a guard condition: (dividend / divisor > 2 && divisor != 0).',
        whyItHappens: 'Assuming the compiler analyzes all parts of the condition before executing any part.',
        howToFix: 'Always write the protective safety check on the LEFT side of the && operator.'
      },
      {
        mistake: 'Using single & instead of double && when writing boolean conditional logic.',
        whyItHappens: 'Typing typo or confusion with bitwise operators. Single & evaluates both sides and can trigger runtime exceptions.',
        howToFix: 'Always use && for conditional boolean logic and guards; reserve & strictly for bitwise integer operations.'
      },
      {
        mistake: 'Writing redundant comparisons like if (isReady == true) or if (isReady == false).',
        whyItHappens: 'Beginners feel more secure seeing an explicit comparison operator.',
        howToFix: 'Write idiomatic Java: use if (isReady) directly, or if (!isReady) for negation.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing the Short-Circuit OR Increment',
        problemStatement: 'What does this program print to the console?',
        code: `int x = 5;
int y = 10;
boolean test = (x < 10) || (++y > 10);
System.out.println("y=" + y + ", test=" + test);`,
        options: [
          'y=11, test=true',
          'y=10, test=true',
          'y=10, test=false',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Evaluate the left operand of || first. Is 5 < 10 true? If so, does the right side evaluate?',
        solution: 'y=10, test=true',
        explanation: 'The left-hand expression (x < 10) evaluates to true (5 < 10). For logical OR (||), if the first operand is true, the entire expression evaluates to true and the right operand (++y > 10) is completely skipped. Therefore, y remains 10.'
      },
      {
        title: 'Puzzle 2: The Guard Order Dilemma',
        problemStatement: 'What happens when this snippet is executed?',
        code: `int val = 0;
boolean check = (val != 0) && (100 / val > 1);
System.out.println("check=" + check);`,
        options: [
          'Throws ArithmeticException: / by zero',
          'check=true',
          'check=false',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'What does the left operand (val != 0) evaluate to when val is 0? Does the division run?',
        solution: 'check=false',
        explanation: 'val != 0 evaluates to (0 != 0) which is false. Because this is a short-circuit AND (&&), the JVM stops immediately and returns false. The right-hand division (100 / val) is never executed, safely avoiding ArithmeticException.'
      },
      {
        title: 'Puzzle 3: The Fatal Reversed Guard',
        problemStatement: 'What is the outcome of executing this code?',
        code: `int val = 0;
boolean check = (100 / val > 1) && (val != 0);
System.out.println("check=" + check);`,
        options: [
          'check=false',
          'check=true',
          'Throws ArithmeticException: / by zero at runtime',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Java evaluates expressions strictly from left to right. Which operand executes first?',
        solution: 'Throws ArithmeticException: / by zero at runtime',
        explanation: 'Java evaluates left-to-right. The left-hand operand (100 / val > 1) is evaluated first. Since val is 0, integer division by zero throws ArithmeticException before the right-hand safety check can ever be reached.'
      },
      {
        title: 'Puzzle 4: Chained Short-Circuit Logic',
        problemStatement: 'Trace the final value of counter after executing this snippet:',
        code: `int counter = 0;
boolean result = (false && ++counter > 0) || (true && ++counter > 0);
System.out.println("counter=" + counter + ", result=" + result);`,
        options: [
          'counter=0, result=true',
          'counter=1, result=true',
          'counter=2, result=true',
          'counter=1, result=false'
        ],
        correctOptionIndex: 1,
        hint: 'Evaluate the expression around || in two halves: left sub-expression and right sub-expression.',
        solution: 'counter=1, result=true',
        explanation: '1. Left of ||: (false && ++counter > 0). The left of && is false, so ++counter is skipped. The left half yields false. counter remains 0. 2. Since the left of || was false, the right half MUST be evaluated: (true && ++counter > 0). The left of && is true, so ++counter executes! counter becomes 1. (1 > 0) is true. True && true is true. Final result: counter=1, result=true.'
      },
      {
        title: 'Puzzle 5: Bitwise Single & vs Logical Double &&',
        problemStatement: 'What is printed by this comparison between & and &&?',
        code: `int a = 0;
int b = 0;
boolean r1 = false && (++a > 0);
boolean r2 = false & (++b > 0);
System.out.println("a=" + a + ", b=" + b);`,
        options: [
          'a=0, b=0',
          'a=1, b=1',
          'a=0, b=1',
          'a=1, b=0'
        ],
        correctOptionIndex: 2,
        hint: 'Double && short-circuits on false. Does single & short-circuit on false?',
        solution: 'a=0, b=1',
        explanation: 'Double && short-circuits when the left operand is false, bypassing (++a > 0), so a remains 0. Single & is a non-short-circuit boolean operator; it evaluates both operands unconditionally. Thus (++b > 0) executes, incrementing b to 1.'
      },
      {
        title: 'Puzzle 6: Multiple NOTs and Precedence',
        problemStatement: 'What does this boolean expression evaluate to?',
        code: `boolean a = true;
boolean b = false;
boolean c = !a || !b && a;
System.out.println(c);`,
        options: [
          'true',
          'false',
          'Compilation Error',
          'null'
        ],
        correctOptionIndex: 0,
        hint: 'Remember operator precedence: ! comes first, then &&, then ||.',
        solution: 'true',
        explanation: 'Step 1: Evaluate unary NOTs: !a is !true -> false. !b is !false -> true. The expression becomes: false || true && true. Step 2: && has higher precedence than ||, so evaluate (true && true) -> true. Step 3: Evaluate false || true -> true. Thus c is true.'
      },
      {
        title: 'Puzzle 7: Short-Circuit with Variable Assignment',
        problemStatement: 'Trace the output of this code snippet:',
        code: `int x = 20;
int y = 5;
boolean ok = (x > 10) || ((y = 50) > 20);
System.out.println("y=" + y);`,
        options: [
          'y=50',
          'y=5',
          'y=20',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Is (x > 10) true? What does the || operator do when its first operand is true?',
        solution: 'y=5',
        explanation: '(x > 10) is (20 > 10), which is true. Because || short-circuits on true, the entire right operand ((y = 50) > 20) is never executed. The variable y is never assigned 50 and retains its initial value of 5.'
      },
      {
        title: 'Puzzle 8: Combined Compound Boolean Evaluation',
        problemStatement: 'What is printed after executing this code?',
        code: `int m = 1;
boolean test = (m++ > 1) && (++m > 2);
System.out.println("m=" + m + ", test=" + test);`,
        options: [
          'm=2, test=false',
          'm=3, test=false',
          'm=1, test=false',
          'm=2, test=true'
        ],
        correctOptionIndex: 0,
        hint: 'Evaluate post-increment m++: what value is compared against 1? What does m become? Does the second operand run?',
        solution: 'm=2, test=false',
        explanation: 'In the left operand (m++ > 1), post-increment provides the current value of m (which is 1) for the comparison: (1 > 1) is false. Immediately after providing its value, m increments to 2. Because the left operand of && evaluated to false, short-circuiting occurs! The right operand (++m > 2) is completely skipped. Therefore, m remains 2 and test is false.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is short-circuit evaluation in Java, and why is it important?',
        answer: 'Short-circuit evaluation is an optimization and safety mechanism in Java where logical operators && and || halt evaluation as soon as the outcome of the overall boolean expression is conclusively determined. For &&, if the left operand is false, the result must be false, so the right side is skipped. For ||, if the left operand is true, the result must be true, so the right side is skipped. This is critical both for runtime performance and for defensive programming patterns, such as guarding against division by zero.',
        followUp: 'What happens if you use single & or | instead of && or || in boolean expressions?',
        followUpAnswer: 'Single & and | are non-short-circuit operators. Even when applied to booleans, they force both left and right operands to be evaluated unconditionally. If the right operand contains potential runtime hazards (like dividing by zero), single & will fail to protect against them and crash the program.',
        keyPhrases: ['halts evaluation early', 'left-to-right evaluation', 'defensive guard pattern', 'performance optimization'],
        commonMistakeAnswer: 'Stating that short-circuiting only saves CPU time, forgetting its critical role as a safety guard to prevent runtime crashes.'
      },
      {
        question: 'Can you demonstrate the Guard Pattern using short-circuit AND (&&)?',
        answer: 'In Java, the Guard Pattern places a precondition check on the left side of a short-circuit && operator to protect a subsequent dangerous operation on the right side. For instance: if (divisor != 0 && total / divisor > 10). If divisor is 0, the left side evaluates to false, and Java never executes the right side, completely preventing an ArithmeticException.',
        followUp: 'What would happen if the conditions in that guard pattern were swapped?',
        followUpAnswer: 'If swapped to (total / divisor > 10 && divisor != 0), Java evaluates left-to-right and immediately attempts the division before checking whether divisor is zero. When divisor is zero, it immediately throws an ArithmeticException: / by zero at runtime.',
        keyPhrases: ['precondition check', 'prevents ArithmeticException', 'left-to-right execution order', 'protective condition'],
        commonMistakeAnswer: 'Assuming the compiler rearranges conditions to optimize safety. Java strictly guarantees left-to-right evaluation order.'
      },
      {
        question: 'Why is it considered bad practice to include side effects inside boolean expressions?',
        answer: 'Including side effects—such as ++count, method calls that alter state, or variable assignments—inside short-circuit expressions introduces severe unpredictability. Because short-circuiting dynamically skips the right operand based on runtime data, the side effect will execute only intermittently. This results in elusive, state-dependent bugs that are notoriously difficult to reproduce and debug.',
        followUp: 'How should you refactor code where a side-effect is conditionally required?',
        followUpAnswer: 'You should extract the side effect into an explicit, dedicated statement either before the condition or inside an explicit if-block body where the execution intent is clear and unambiguous.',
        keyPhrases: ['intermittent execution', 'unpredictable state changes', 'silent bug source', 'extract into explicit statement'],
        commonMistakeAnswer: 'Believing that pre-increment ++i always runs regardless of where it appears in a line of code.'
      },
      {
        question: 'What is the precedence hierarchy among !, &&, and ||?',
        answer: 'Logical NOT (!) has the highest precedence as a unary operator. Next is Logical AND (&&), which binds tighter than Logical OR (||). Finally, Logical OR (||) has the lowest precedence among the three. Therefore, in an expression like !a || b && c, it is parsed as (!a) || (b && c).',
        followUp: 'Should developers rely on operator precedence or use parentheses?',
        followUpAnswer: 'Production best practices strongly encourage using explicit parentheses even when operator precedence is well-understood. Parentheses eliminate ambiguity for human readers and eliminate subtle logical bugs during future code refactoring.',
        keyPhrases: ['NOT highest precedence', 'AND higher than OR', 'explicit parentheses for clarity'],
        commonMistakeAnswer: 'Thinking that && and || share identical precedence and are resolved strictly left-to-right.'
      },
      {
        question: 'Explain De Morgan’s Laws and how they apply to Java boolean expressions.',
        answer: 'De Morgan’s Laws provide algebraic equivalence rules for negating compound boolean expressions. Rule 1 states: !(A && B) is logically equivalent to (!A || !B). Rule 2 states: !(A || B) is logically equivalent to (!A && !B). In Java, applying De Morgan’s Laws allows developers to simplify complex nested negative conditions into readable positive logic.',
        followUp: 'How would you simplify: !(!isWeekend || !hasTicket)?',
        followUpAnswer: 'Applying De Morgan’s Law, distributing the outer negation across || transforms it into an AND operator with negated terms: !(!isWeekend) && !(!hasTicket), which simplifies cleanly to (isWeekend && hasTicket).',
        keyPhrases: ['distribute negation', 'flip AND to OR', 'flip OR to AND', 'simplifying complex conditions'],
        commonMistakeAnswer: 'Forgetting to flip the operator when distributing NOT (e.g., falsely asserting !(A && B) == !A && !B).'
      },
      {
        question: 'Why does "if (x = 5)" fail to compile in Java, whereas "if (flag = true)" compiles cleanly?',
        answer: 'In Java, the condition inside an if statement must strictly evaluate to a primitive boolean type. The assignment expression (x = 5), where x is an int, yields the integer value 5, resulting in a compile-time type mismatch. In contrast, (flag = true), where flag is a boolean, assigns true to flag and returns the boolean value true, which satisfies the compiler.',
        followUp: 'Why is "if (flag = true)" considered a dangerous anti-pattern?',
        followUpAnswer: 'It overwrites the variable flag to true on every check and always branches into the if-block, completely ignoring the previous value of flag. To prevent this, developers should use "if (flag)" or configure linters like SonarQube to flag assignments in conditions.',
        keyPhrases: ['strict boolean requirement', 'assignment returns assigned value', 'accidental assignment anti-pattern'],
        commonMistakeAnswer: 'Thinking that Java bans all assignment expressions inside if statements.'
      },
      {
        question: 'How does Java evaluate boolean expressions with more than two operands chained by &&?',
        answer: 'Java evaluates chained expressions strictly from left to right. In a chain like A && B && C && D, evaluation proceeds sequentially. The moment ANY operand evaluates to false, evaluation terminates immediately, returning false without evaluating any subsequent operands in the chain.',
        followUp: 'In what order would you place conditions in an enterprise transaction validation pipeline?',
        followUpAnswer: 'Place the cheapest and most restrictive conditions first (like local null and zero checks), and place the most expensive or risky checks (like remote service calls or complex computations) at the end of the chain.',
        keyPhrases: ['left-to-right evaluation', 'early termination on first false', 'cheapest checks first'],
        commonMistakeAnswer: 'Assuming all operands are evaluated in parallel by the JVM compiler.'
      },
      {
        question: 'What is the exact return type of logical operators in Java?',
        answer: 'Logical operators (&&, ||, !) in Java strictly accept boolean operands and always return a primitive boolean value (true or false). Unlike Python or JavaScript, where logical operators can return truthy/falsy non-boolean objects, Java enforces strict static typing.',
        followUp: 'Can you perform logical operations on integers like in C++ (e.g., 5 && 2)?',
        followUpAnswer: 'No. In C++, non-zero numbers are implicitly truthy, but Java has no truthy/falsy concept for numbers. Attempting (5 && 2) will fail compilation with "bad operand types for binary operator".',
        keyPhrases: ['primitive boolean return', 'no truthy or falsy concepts', 'strict type checking'],
        commonMistakeAnswer: 'Assuming Java treats non-zero numbers as true in logical operations.'
      },
      {
        question: 'Does short-circuiting occur when using ternary operators or only logical operators?',
        answer: 'The ternary operator (? :) also exhibits short-circuit branch evaluation. In condition ? expr1 : expr2, only ONE of the expressions is evaluated: expr1 is evaluated if condition is true, and expr2 is evaluated if condition is false. The unselected expression is completely skipped.',
        followUp: 'How does ternary short-circuiting interact with logical operator short-circuiting?',
        followUpAnswer: 'They compose seamlessly: the condition expression itself can short-circuit via && or ||, and once resolved, the ternary operator proceeds to evaluate strictly the chosen branch.',
        keyPhrases: ['branch evaluation', 'unselected branch skipped', 'conditional evaluation'],
        commonMistakeAnswer: 'Thinking the ternary operator evaluates both branches before choosing one.'
      },
      {
        question: 'What is the difference between bitwise XOR (^) and logical XOR in Java?',
        answer: 'In Java, the caret symbol (^) functions as the XOR operator. When applied to integers, it performs bitwise XOR. When applied to boolean operands, it performs logical XOR, returning true if and only if exactly one operand is true and the other is false. Logical XOR NEVER short-circuits because both operands must be inspected to determine inequality.',
        followUp: 'Can logical XOR be used as a guard pattern?',
        followUpAnswer: 'No, because XOR must evaluate both operands to verify if they differ, it cannot short-circuit and thus cannot guard against runtime exceptions.',
        keyPhrases: ['exactly one true', 'no short-circuiting in XOR', 'evaluates both operands'],
        commonMistakeAnswer: 'Believing that Java has a ^^ short-circuit XOR operator. No such operator exists.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the output of: boolean res = true || (5 / 0 == 0); System.out.println(res);?',
        options: ['Throws ArithmeticException', 'Prints true', 'Prints false', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'Because the left operand is true, the short-circuit OR (||) halts immediately and returns true without evaluating the right operand (5 / 0), avoiding the ArithmeticException.'
      },
      {
        question: 'What is the output of: boolean res = false && (5 / 0 == 0); System.out.println(res);?',
        options: ['Throws ArithmeticException', 'Prints false', 'Prints true', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'Because the left operand is false, the short-circuit AND (&&) halts immediately and returns false without evaluating the right operand.'
      },
      {
        question: 'Which of the following operators guarantees that BOTH operands are ALWAYS evaluated?',
        options: ['&&', '||', '&', '? :'],
        correctIndex: 2,
        explanation: 'The single bitwise/boolean AND operator (&) does not short-circuit; it always evaluates both operands.'
      },
      {
        question: 'What is the value of x after: int x = 10; boolean b = (x > 5) || (++x > 10);?',
        options: ['11', '10', '12', '9'],
        correctIndex: 1,
        explanation: '(x > 5) is (10 > 5) which is true. The || operator short-circuits immediately, skipping (++x > 10). x remains 10.'
      },
      {
        question: 'What is the value of y after: int y = 10; boolean b = (y < 5) && (++y > 10);?',
        options: ['11', '10', '9', 'Compilation Error'],
        correctIndex: 1,
        explanation: '(y < 5) is false. The && operator short-circuits immediately, skipping (++y > 10). y remains 10.'
      },
      {
        question: 'What is the result of !true || false && true in Java?',
        options: ['true', 'false', 'Compilation Error', 'Runtime Exception'],
        correctIndex: 1,
        explanation: 'Precedence: ! is evaluated first (!true is false). Next, && is evaluated (false && true is false). Finally, || is evaluated (false || false is false).'
      },
      {
        question: 'According to De Morgan\'s Law, !(A || B) is equivalent to which expression?',
        options: ['!A && !B', '!A || !B', 'A && B', '!A && B'],
        correctIndex: 0,
        explanation: 'Negating a disjunction (A || B) is equivalent to the conjunction of the negations: (!A && !B).'
      },
      {
        question: 'Which statement correctly protects against division by zero when calculating a / b > 5?',
        options: [
          'if (a / b > 5 && b != 0)',
          'if (b != 0 && a / b > 5)',
          'if (b != 0 & a / b > 5)',
          'if (b == 0 || a / b > 5)'
        ],
        correctIndex: 1,
        explanation: 'Placing b != 0 on the left side of && ensures that if b is 0, the right-side division is never executed.'
      },
      {
        question: 'What does the expression !!(5 > 3) evaluate to?',
        options: ['true', 'false', '2', 'Compilation Error'],
        correctIndex: 0,
        explanation: '(5 > 3) is true. !true is false. !false is true. Double negation restores the original boolean value.'
      },
      {
        question: 'What happens when compiling: boolean flag = (1 && 0); in Java?',
        options: [
          'flag is false (0)',
          'flag is true (1)',
          'Compilation Error: bad operand types for binary operator',
          'Runtime Exception'
        ],
        correctIndex: 2,
        explanation: 'In Java, 1 and 0 are integer primitives, not boolean values. The && operator strictly requires boolean operands, so this fails compilation.'
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 3.5: Assignment Operators & The Compound Cast Trap
  // ────────────────────────────────────────────────────────────
  'assignment-operators': {
    id: 'assignment-operators',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.5',
    title: 'Assignment Operators & The Compound Cast Trap',
    subtitle: 'Simple assignment, compound assignment operators, evaluation order, and hidden implicit casting',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Imagine packing clothes into a compact suitcase with a strict 10-kg limit. If you manually pack 12 kg of clothes (explicit addition: s = s + 1), the airline agent stops you and raises an error: "Exceeds capacity!" But if you use the airline\'s "Express Auto-Packer" (compound operator: s += 1), the machine silently chops off the excess 2 kg of your clothes and zips the suitcase shut without warning you. Compound assignment operators in Java automatically and invisibly cast the result back into the target variable\'s type!',
    interviewTakeaways: [
      'JLS §15.26.2 Rule: A compound assignment E1 op= E2 is formally defined as E1 = (T)((E1) op (E2)), where T is the type of E1.',
      'Hidden Narrowing Cast: s += 1 compiles on byte/short/char, while s = s + 1 fails compilation due to automatic integer promotion.',
      'Silent Overflow Danger: Because compound operators inject an implicit narrowing cast, integer overflow occurs silently without errors or exceptions.',
      'Right-to-Left Associativity: Assignment operators chain from right to left: a = b = c = 10 sets c first, then b, then a.',
      'Target Address Evaluation: In E1 op= E2, the variable expression E1 is evaluated only once to determine its destination before E2 is evaluated.'
    ],
    cheatSheet: {
      summary: 'Assignment operators copy values into variable storage. Compound assignment operators combine an operation with assignment while injecting an implicit narrowing cast to the target type.',
      syntaxTemplate: `variable = expression;        // Simple assignment
variable += expression;       // Equivalent to: variable = (TargetType)(variable + expression)
a = b = c = 100;              // Chained assignment (right-to-left)`,
      rules: [
        { rule: 'Right-to-Left Associativity', explanation: 'Chained assignments evaluate right to left. The rightmost expression evaluates first and cascades leftward.' },
        { rule: 'Implicit Compound Cast', explanation: 'x op= y is strictly expanded to x = (Type of x)(x op y). The narrowing cast is completely hidden.' },
        { rule: 'Binary Numeric Promotion', explanation: 'Arithmetic operations on byte, short, and char automatically promote operands to int before computation.' },
        { rule: 'Silent Overflow', explanation: 'Due to the hidden cast, exceeding primitive bounds (e.g. byte b = 127; b += 1) wraps around silently without warning.' },
        { rule: 'Single Evaluation of LHS', explanation: 'The left-hand target expression in compound assignment is evaluated exactly once to determine destination storage.' },
        { rule: 'Assignment Returns Value', explanation: 'An assignment expression evaluates to the assigned value, allowing it to be embedded inside expressions.' }
      ],
      quickComparison: [
        { aspect: 'Syntax', optionA: 'b = b + 1', optionB: 'b += 1' },
        { aspect: 'Compilation (byte/short)', optionA: 'Fails: int cannot be converted to byte', optionB: 'Compiles: hidden (byte) cast added' },
        { aspect: 'Underlying JLS Expansion', optionA: 'Direct assignment of evaluated int', optionB: 'b = (byte)(b + 1)' },
        { aspect: 'Overflow Handling', optionA: 'Compiler blocks assignment if types mismatch', optionB: 'Silently wraps around at boundary' },
        { aspect: 'Readability & Conciseness', optionA: 'Repetitive variable name', optionB: 'Clean, idiomatic Java standard' }
      ]
    },
    coreExplanation: [
      'The simple assignment operator (=) evaluates its right-hand expression and stores that value into the left-hand variable storage location.',
      'Assignment operators associate from right to left. An expression like a = b = c = 40; evaluates c = 40, assigns 40 to b, and finally assigns 40 to a.',
      'Java provides 11 compound assignment operators: +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, and >>>=.',
      'The Compound Cast Trap (JLS §15.26.2): A compound assignment expression of the form E1 op= E2 is NOT equivalent to E1 = E1 op E2. Instead, it is strictly equivalent to E1 = (T)((E1) op (E2)), where T is the static type of E1.',
      'The Byte and Short Arithmetic Trap: In Java, any arithmetic operation involving byte, short, or char automatically promotes operands to int. Therefore, byte b = 10; b = b + 1; fails compilation because an int cannot be assigned to byte. However, b += 1; compiles cleanly because the compiler silently adds the cast: b = (byte)(b + 1);.',
      'Silent Overflow Danger: Because of this automatic narrowing cast, compound assignments suppress standard compiler type checks and allow arithmetic overflow to occur silently. For example, byte b = 127; b += 1; results in -128 without any warning.',
      'Evaluation Order of Operands: In E1 op= E2, the left-hand variable expression E1 is evaluated first to determine the target variable, then E2 is evaluated, and finally the binary operation and assignment occur.'
    ],
    diagram: `=== THE COMPOUND ASSIGNMENT CAST TRAP ===

Case 1: Explicit Arithmetic Addition
   byte b = 10;
   b = b + 1;
       |   |
     byte int
       \\   /
    promoted to int (11)
           |
   Attempting to assign int (11) to byte variable 'b'
           v
   [ COMPILATION ERROR: incompatible types: possible lossy conversion from int to byte ]

-----------------------------------------------------------------------------------

Case 2: Compound Assignment Operator
   byte b = 10;
   b += 1;
       |
   Java Language Specification (JLS §15.26.2) expands this to:
       v
   b = (byte)(b + 1);  <--- HIDDEN NARROWING CAST INJECTED!
           |
       Compiles Cleanly! (Watch out for silent byte overflow: 127 + 1 = -128)`,
    codeSnippet: {
      title: 'The Compound Assignment Implicit Cast Trap in Action',
      code: `public class CompoundCastDemo {
    public static void main(String[] args) {
        byte b = 127;

        // b = b + 1; // COMPILE ERROR: possible lossy conversion from int to byte

        // Compound assignment silently inserts (byte) cast:
        b += 1; // Equivalent to: b = (byte)(b + 1);

        System.out.println("b after adding 1: " + b); // Silent overflow to -128!

        // Tracing chained assignment
        int x, y, z;
        x = y = z = 50;
        System.out.println("x=" + x + ", y=" + y + ", z=" + z);
    }
}`,
      lineByLineExplanation: [
        { line: 'byte b = 127;', explanation: 'Initializes byte b to its maximum positive value (127).' },
        { line: '// b = b + 1;', explanation: 'Illegal without manual cast because b + 1 produces an int.' },
        { line: 'b += 1;', explanation: 'Compiles via hidden implicit cast: b = (byte)(b + 1).' },
        { line: 'System.out.println("b after adding 1: " + b);', explanation: 'Prints -128 due to silent two\'s complement overflow.' },
        { line: 'x = y = z = 50;', explanation: 'Right-to-left associativity: z receives 50, then y receives 50, then x receives 50.' }
      ],
      output: `b after adding 1: -128
x=50, y=50, z=50`
    },
    codeExamples: [
      {
        title: 'Byte Promotion vs Compound Assignment',
        description: 'Demonstrating why s = s + 1 fails on short, but s += 1 compiles cleanly.',
        code: `public class ShortCompoundDemo {
    public static void main(String[] args) {
        short s = 100;

        // s = s + 5; // Compilation Error! (s + 5) evaluates to int

        // Valid: Compiler automatically inserts (short) cast
        s += 5;

        System.out.println("short s = " + s);
    }
}`,
        output: 'short s = 105'
      },
      {
        title: 'Silent Overflow with Compound Multiplication',
        description: 'Multiplying byte values using compound assignment causes silent truncation.',
        code: `public class CompoundOverflowDemo {
    public static void main(String[] args) {
        byte val = 40;

        // 40 * 4 = 160. Max byte is 127!
        val *= 4; // val = (byte)(val * 4) -> 160 as signed 8-bit byte is -96

        System.out.println("val after *= 4: " + val);
    }
}`,
        output: 'val after *= 4: -96'
      },
      {
        title: 'Chained Assignment and Embedded Assignment Values',
        description: 'Assignment expressions return the assigned value and associate from right to left.',
        code: `public class AssignmentExpressionDemo {
    public static void main(String[] args) {
        int a = 5;
        int b;

        // Assignment returns the assigned value
        System.out.println("Assigned value: " + (b = a * 10));

        // Right-to-left chained modifications
        int p = 10, q = 20;
        p += q += 5; // q becomes 25, then p += 25 (p becomes 35)

        System.out.println("p=" + p + ", q=" + q);
    }
}`,
        output: `Assigned value: 50
p=35, q=25`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming s += 1 is 100% identical to s = s + 1.',
        whyItHappens: 'Textbooks often simplify compound operators without explaining JLS type narrowing semantics.',
        howToFix: 'Remember that compound operators insert an implicit narrowing cast: s = (Type)(s + 1).'
      },
      {
        mistake: 'Accidentally writing =+ or =- instead of += or -=.',
        whyItHappens: 'Typo in operator order. x =+ 5 is interpreted as assignment of unary positive 5 (x = +5), not addition!',
        howToFix: 'Ensure the arithmetic symbol always precedes the equals sign: +=, -=, *=, /=.'
      },
      {
        mistake: 'Ignoring silent overflow when doing arithmetic on byte or short with compound operators.',
        whyItHappens: 'Because the compiler generates no error, developers assume the calculation remained safely within range.',
        howToFix: 'Promote variables to int or long when performing accumulating arithmetic.'
      },
      {
        mistake: 'Confusing assignment (=) with relational equality (==) in conditions.',
        whyItHappens: 'Single equal keypress error. In boolean variables (if (isActive = true)), it silently reassigns the variable.',
        howToFix: 'Always use == for comparison, or simply write if (isActive) directly.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Byte Maximum Increment',
        problemStatement: 'What does this code print when compiled and run?',
        code: `byte b = 127;
b += 2;
System.out.println(b);`,
        options: [
          '129',
          '-127',
          '-128',
          'Compilation Error: lossy conversion'
        ],
        correctOptionIndex: 1,
        hint: 'Max value of signed byte is 127. What happens when you add 2 with an implicit (byte) cast?',
        solution: '-127',
        explanation: 'b += 2 expands to b = (byte)(b + 2). 127 + 2 is 129. In signed 8-bit two\'s complement, 127 + 1 wraps to -128, and +1 more becomes -127.'
      },
      {
        title: 'Puzzle 2: The Explicit Cast Failure',
        problemStatement: 'What is the result of attempting to compile this snippet?',
        code: `short s = 20;
s = s + 10;
System.out.println(s);`,
        options: [
          '30',
          'Compilation Error: possible lossy conversion from int to short',
          'Runtime Exception',
          '0'
        ],
        correctOptionIndex: 1,
        hint: 'In Java arithmetic, what type are short variables promoted to before the addition?',
        solution: 'Compilation Error: possible lossy conversion from int to short',
        explanation: 'In Java, the binary addition (s + 10) promotes s to an int and evaluates to int 30. Assigning an int to a short variable without an explicit cast causes a compile-time error.'
      },
      {
        title: 'Puzzle 3: The Unary Sign Assignment Typo',
        problemStatement: 'Trace the output of this code snippet:',
        code: `int x = 10;
x =+ 5;
System.out.println(x);`,
        options: [
          '15',
          '5',
          'Compilation Error',
          '10'
        ],
        correctOptionIndex: 1,
        hint: 'Look closely at the operator: is it += or =+ ?',
        solution: '5',
        explanation: 'x =+ 5 is parsed as x = (+5), which assigns unary positive 5 to x, completely overwriting the original 10. The output is 5.'
      },
      {
        title: 'Puzzle 4: Chained Compound Modification',
        problemStatement: 'What are the final values of a and b?',
        code: `int a = 10;
int b = 20;
a += b -= 5;
System.out.println("a=" + a + ", b=" + b);`,
        options: [
          'a=25, b=15',
          'a=30, b=15',
          'a=25, b=20',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'Assignment operators associate from right to left. Evaluate b -= 5 first.',
        solution: 'a=25, b=15',
        explanation: 'Assignment operators associate right-to-left: 1. b -= 5 executes first: b becomes 20 - 5 = 15, and the expression (b -= 5) yields 15. 2. Next, a += 15 executes: a becomes 10 + 15 = 25. Final values: a=25, b=15.'
      },
      {
        title: 'Puzzle 5: Compound Assignment with Floating Point',
        problemStatement: 'What is printed after executing this code?',
        code: `int n = 10;
n += 3.7;
System.out.println(n);`,
        options: [
          '13.7',
          '13',
          '14',
          'Compilation Error: lossy conversion from double to int'
        ],
        correctOptionIndex: 1,
        hint: 'Remember that n += 3.7 expands to n = (int)(n + 3.7).',
        solution: '13',
        explanation: 'n += 3.7 is equivalent to n = (int)(n + 3.7). In Java, 10 + 3.7 is double 13.7. Casting 13.7 to an int truncates the fractional portion, leaving 13.'
      },
      {
        title: 'Puzzle 6: Evaluation Order with Self-Assignment',
        problemStatement: 'What is printed by this tricky assignment snippet?',
        code: `int x = 5;
x += (x = 2);
System.out.println(x);`,
        options: [
          '4',
          '7',
          '2',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'In x += expr, the destination variable x and its initial value (5) are captured before evaluating expr.',
        solution: '7',
        explanation: 'According to JLS §15.26.2, in x += (x = 2), the value of the left operand x (5) is captured and remembered first. Then the right operand (x = 2) is evaluated, setting x to 2 and returning 2. Finally, the saved value 5 is added to 2, yielding 7, which is written to x.'
      },
      {
        title: 'Puzzle 7: Character Stepping with Compound Operator',
        problemStatement: 'What does this program print?',
        code: `char ch = 'A';
ch += 3;
System.out.println(ch);`,
        options: [
          'D',
          '68',
          'Compilation Error: int cannot be converted to char',
          'A3'
        ],
        correctOptionIndex: 0,
        hint: '\'A\' has ASCII value 65. What is (char)(65 + 3)?',
        solution: 'D',
        explanation: 'ch += 3 expands to ch = (char)(ch + 3). The character \'A\' (code 65) + 3 produces 68, which is cast back to char, producing \'D\'.'
      },
      {
        title: 'Puzzle 8: Multi-Variable Reassignment Cascade',
        problemStatement: 'Trace the final value of sum:',
        code: `int a = 2, b = 3, c = 4;
int sum = a += b *= c += 1;
System.out.println("sum=" + sum + ", b=" + b + ", c=" + c);`,
        options: [
          'sum=17, b=15, c=5',
          'sum=20, b=15, c=5',
          'sum=17, b=12, c=5',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'Evaluate from right to left: c += 1 first, then b *= c, then a += b.',
        solution: 'sum=17, b=15, c=5',
        explanation: 'Right-to-left evaluation: 1. c += 1 -> c becomes 5. Expression returns 5. 2. b *= 5 -> b becomes 3 * 5 = 15. Expression returns 15. 3. a += 15 -> a becomes 2 + 15 = 17. Expression returns 17. 4. sum = 17. Output: sum=17, b=15, c=5.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why does "short s = 1; s = s + 1;" fail to compile, but "s += 1;" compiles without error?',
        answer: 'In Java, binary arithmetic operations on small integral types (byte, short, char) automatically undergo binary numeric promotion to int. Therefore, (s + 1) produces an int, and attempting to assign an int back into a short variable without an explicit cast causes a compile-time error. In contrast, according to JLS §15.26.2, compound assignment s += 1 is defined as s = (short)(s + 1). The compiler automatically inserts the narrowing cast, allowing it to compile cleanly.',
        followUp: 'What hidden risk does this automatic narrowing cast introduce?',
        followUpAnswer: 'It completely masks potential arithmetic overflow. If the calculation exceeds the storage range of the smaller type, bits are truncated silently without compiler warnings or runtime exceptions.',
        keyPhrases: ['binary numeric promotion to int', 'JLS §15.26.2', 'implicit narrowing cast', 'silent truncation risk'],
        commonMistakeAnswer: 'Answering that s += 1 keeps everything as a short internally without promoting to int.'
      },
      {
        question: 'What is the formal specification for compound assignment operators according to the Java Language Specification?',
        answer: 'Under JLS §15.26.2, a compound assignment expression of the form E1 op= E2 is equivalent to E1 = (T)((E1) op (E2)), where T is the static type of E1, except that E1 is evaluated only once.',
        followUp: 'Why is the rule that E1 is evaluated only once significant?',
        followUpAnswer: 'If E1 involves an expression with side effects (such as an array index computation arr[i++]), evaluating E1 only once ensures the index is not incremented twice.',
        keyPhrases: ['E1 = (T)((E1) op (E2))', 'evaluated only once', 'narrowing cast to target type T'],
        commonMistakeAnswer: 'Stating that E1 op= E2 is strictly identical to E1 = E1 op E2.'
      },
      {
        question: 'What happens when you perform byte b = 127; b += 1;?',
        answer: 'The variable b wraps around to -128. Because b += 1 expands to b = (byte)(b + 1), the int value 128 is narrowed to an 8-bit signed two\'s complement byte. The binary representation 10000000 corresponds to -128. The operation completes silently with no exception or warning.',
        followUp: 'How can you prevent silent integer overflow in production Java applications?',
        followUpAnswer: 'By using Math.addExact() and Math.multiplyExact() introduced in Java 8, which explicitly throw ArithmeticException if integer overflow occurs, or by working with larger primitive types like long.',
        keyPhrases: ['two\'s complement wrap-around', 'silent overflow', 'Math.addExact', 'boundary wrapping'],
        commonMistakeAnswer: 'Expecting Java to throw an ArithmeticException on byte overflow.'
      },
      {
        question: 'Explain associativity in chained assignments like a = b = c = 100.',
        answer: 'Assignment operators in Java have right-to-left associativity. In a = b = c = 100, the rightmost expression c = 100 evaluates first, storing 100 into c and returning 100. Then b = 100 evaluates, storing 100 into b and returning 100. Finally, a = 100 evaluates, storing 100 into a.',
        followUp: 'Do the variables have to be of the exact same type in chained assignments?',
        followUpAnswer: 'Not necessarily, provided each assignment satisfies widening conversion rules. For example: double d; int i; d = i = 50; is valid because int 50 can be widened to double 50.0. However, int i; double d; i = d = 50.5; fails to compile because double cannot be assigned to int without an explicit cast.',
        keyPhrases: ['right-to-left associativity', 'assignment expression returns value', 'widening type compatibility'],
        commonMistakeAnswer: 'Thinking chained assignment evaluates left-to-right like arithmetic operators.'
      },
      {
        question: 'What is the outcome of int x = 5; x += (x = 3); in Java?',
        answer: 'The result is 8. According to the JLS evaluation order, in a compound assignment, the left-hand operand is evaluated first to determine the variable and capture its initial value (5). Next, the right-hand operand (x = 3) is evaluated, which assigns 3 to x and returns 3. Finally, the addition takes place between the saved initial value (5) and the right operand (3), producing 8, which is stored into x.',
        followUp: 'Is this construct acceptable in clean production code?',
        followUpAnswer: 'No, relying on operand evaluation side-effects within the same expression is a notorious code smell that violates clean code standards and causes severe maintainability issues.',
        keyPhrases: ['LHS evaluated first', 'initial value captured', 'JLS evaluation order', 'code smell'],
        commonMistakeAnswer: 'Guessing 6 because they assume x becomes 3 before the addition starts.'
      },
      {
        question: 'What happens when you mix floating-point and integer types in compound assignments, such as int x = 10; x += 4.9;?',
        answer: 'The code compiles successfully and x becomes 14. Because x += 4.9 expands to x = (int)(x + 4.9), the addition (10 + 4.9) produces double 14.9, which is then explicitly cast to int via the hidden cast, truncating the decimal part and leaving integer 14.',
        followUp: 'Would int x = 10; x = x + 4.9; compile?',
        followUpAnswer: 'No, it would fail compilation with "possible lossy conversion from double to int" because without the compound operator, no implicit cast is inserted.',
        keyPhrases: ['implicit int cast', 'decimal truncation', 'double to int narrowing'],
        commonMistakeAnswer: 'Assuming it will round up to 15 or fail to compile.'
      },
      {
        question: 'Can you explain the difference between x =+ 1 and x += 1?',
        answer: 'x += 1 is the compound addition assignment operator that adds 1 to x. In contrast, x =+ 1 is a simple assignment where the + is interpreted as the unary plus operator applied to the literal 1. Thus, x =+ 1 simply assigns positive 1 to x, completely overwriting whatever value x previously held.',
        followUp: 'Similarly, what does x =- 1 do?',
        followUpAnswer: 'It assigns negative 1 (unary minus) to x, overwriting its value rather than decrementing it.',
        keyPhrases: ['unary plus operator', 'accidental overwrite', 'syntactic typo'],
        commonMistakeAnswer: 'Believing that =+ is an alternate legacy syntax for +='
      },
      {
        question: 'Are compound assignment operators atomic in Java multithreaded environments?',
        answer: 'No, compound assignment operators like count += 1 are NOT atomic. They consist of three distinct operations: reading the current value, computing the sum, and writing the new value back to memory. Without synchronization or AtomicInteger, concurrent threads will experience race conditions and lost updates.',
        followUp: 'What primitive types have non-atomic 64-bit assignments in standard 32-bit JVMs?',
        followUpAnswer: 'Non-volatile long and double variables are treated as two separate 32-bit write operations under the JVM specification, which can result in "word tearing" without the volatile keyword.',
        keyPhrases: ['read-modify-write cycle', 'not atomic', 'race conditions', 'lost updates'],
        commonMistakeAnswer: 'Assuming single-line statements like count++ or count += 1 are inherently thread-safe.'
      },
      {
        question: 'Can compound assignment be applied to Strings in Java?',
        answer: 'Yes, the += operator is overloaded for String variables in Java. For example, String s = "Hello"; s += " World"; is valid. Under the hood, modern Java compilers translate this into StringBuilder concatenation or invokedynamic StringConcatFactory calls.',
        followUp: 'Can other compound operators like -= or *= be used on Strings?',
        followUpAnswer: 'No. In Java, only + and += are overloaded for String concatenation. Operators like -= or *= on Strings produce a compile-time error.',
        keyPhrases: ['overloaded for String concatenation', 'StringBuilder', 'no subtraction on strings'],
        commonMistakeAnswer: 'Thinking compound operators are strictly restricted to numeric primitives.'
      },
      {
        question: 'What is the value of char ch = \'Z\'; ch += 2; in Java?',
        answer: 'The ASCII/Unicode value of \'Z\' is 90. When evaluating ch += 2, Java computes (char)(90 + 2), which is 92. The Unicode character corresponding to code point 92 is the backslash \'\\\'.',
        followUp: 'Why doesn\'t ch = ch + 2 compile on its own?',
        followUpAnswer: 'Because ch + 2 promotes ch to an int, producing int 92. Assigning int 92 directly to char ch requires an explicit cast (char)92.',
        keyPhrases: ['Unicode code point', 'promoted to int', 'implicit char cast'],
        commonMistakeAnswer: 'Saying it concatenates to "Z2" or fails compilation.'
      }
    ],
    miniQuiz: [
      {
        question: 'According to JLS §15.26.2, what is E1 op= E2 strictly equivalent to?',
        options: [
          'E1 = E1 op E2',
          'E1 = (T)((E1) op (E2)) where T is type of E1',
          'E1 = (int)(E1 op E2)',
          'E1 = E2 op E1'
        ],
        correctIndex: 1,
        explanation: 'JLS explicitly defines compound assignment with an automatic cast back to the target variable\'s type T.'
      },
      {
        question: 'Will "byte b = 5; b = b + 1;" compile successfully in Java?',
        options: [
          'Yes, b becomes 6',
          'No, compile error: possible lossy conversion from int to byte',
          'Yes, but b overflows',
          'Runtime Exception'
        ],
        correctIndex: 1,
        explanation: 'Arithmetic addition on byte promotes operands to int. Assigning int back to byte without an explicit cast causes a compile-time error.'
      },
      {
        question: 'What is the result of executing: byte b = 127; b += 1; System.out.println(b);?',
        options: ['128', '-128', 'Compile error', 'ArithmeticException'],
        correctIndex: 1,
        explanation: 'b += 1 expands to b = (byte)(b + 1). 128 narrowed to an 8-bit signed byte wraps around to -128.'
      },
      {
        question: 'What is the associativity of assignment operators in Java?',
        options: ['Left to right', 'Right to left', 'Associativity depends on the data type', 'No associativity'],
        correctIndex: 1,
        explanation: 'Assignment and compound assignment operators associate strictly from right to left.'
      },
      {
        question: 'What does int x = 10; x =+ 3; output when x is printed?',
        options: ['13', '3', '7', 'Compilation error'],
        correctIndex: 1,
        explanation: 'x =+ 3 is an assignment of positive 3 (+3) to x, overwriting 10 with 3.'
      },
      {
        question: 'What does int a = 5; a *= 2 + 3; evaluate to?',
        options: ['13', '25', '10', 'Compilation error'],
        correctIndex: 1,
        explanation: 'The right-hand expression (2 + 3) is evaluated first to 5. Then a *= 5 results in a = 5 * 5 = 25.'
      },
      {
        question: 'What is the result of: int x = 10; x += 5.5; System.out.println(x);?',
        options: ['15.5', '15', '16', 'Compile error: cannot assign double to int'],
        correctIndex: 1,
        explanation: 'x += 5.5 expands to x = (int)(x + 5.5). 15.5 cast to int is truncated to 15.'
      },
      {
        question: 'What will "int a, b; a = b = 20; a += b -= 5;" produce for a and b?',
        options: ['a=35, b=15', 'a=25, b=15', 'a=30, b=20', 'a=40, b=15'],
        correctIndex: 0,
        explanation: 'Right to left: b -= 5 makes b = 15. Then a += 15 makes a = 20 + 15 = 35.'
      },
      {
        question: 'Which of the following compound operators is NOT valid in Java?',
        options: ['>>>=', '%=', '**=', '^='],
        correctIndex: 2,
        explanation: 'Java does not have an exponentiation operator (**), so **= does not exist.'
      },
      {
        question: 'In the expression E1 op= E2, how many times is E1 evaluated?',
        options: ['Zero times', 'Exactly once', 'Twice', 'Depends on whether overflow occurs'],
        correctIndex: 1,
        explanation: 'Under JLS §15.26.2, the left-hand operand expression E1 is evaluated exactly once.'
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // LESSON 3.6: The Ternary Operator (? :)
  // ────────────────────────────────────────────────────────────
  'ternary-operator': {
    id: 'ternary-operator',
    moduleId: 'java-operators',
    moduleTitle: '3. Operators & Expressions',
    lessonNumber: 'Lesson 3.6',
    title: 'The Ternary Operator (? :)',
    subtitle: 'Inline conditional expressions, type unification, auto-unboxing NPEs, and evaluation short-circuiting',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Think of a highway fork with a toll-booth sign: if you have an electronic pass (condition is true), you take Lane A ($2); otherwise, you take Lane B ($5). Unlike a large detour building (a full multi-line if-else block), the toll gate is an in-line chute that immediately hands you a single ticket amount to keep driving. Crucially, the ticket machine must print both amounts in the same currency format (type unification)!',
    interviewTakeaways: [
      'Expression vs Statement: Ternary is an expression that yields a value; it cannot stand alone like an if-else statement.',
      'Short-Circuit Branch Evaluation: Only the branch matching the condition is evaluated; the unselected branch is completely bypassed.',
      'Type Unification Rule: The compiler unifies the return types of both branches using Binary Numeric Promotion (e.g. int and double unify to double).',
      'Right-to-Left Associativity: Ternary expressions chain right-to-left: a ? b : c ? d : e parses as a ? b : (c ? d : e).',
      'Unboxing NPE Hazard: When mixing a wrapper class and primitive in ternary branches, Java auto-unboxes the wrapper, risking NullPointerException if null.'
    ],
    cheatSheet: {
      summary: 'The ternary operator (? :) is Java\'s only three-operand operator, providing a concise inline conditional expression that produces a value.',
      syntaxTemplate: `type result = (booleanCondition) ? expressionWhenTrue : expressionWhenFalse;
int max = (a > b) ? a : b;
String status = (score >= 50) ? "Pass" : "Fail";`,
      rules: [
        { rule: 'Expression Semantics', explanation: 'Ternary (? :) is an expression and must evaluate to a concrete value. It cannot contain standalone void statements.' },
        { rule: 'Short-Circuit Branching', explanation: 'Only the chosen branch evaluates at runtime. Side effects in the alternative branch never run.' },
        { rule: 'Binary Numeric Promotion', explanation: 'If one operand is int and the other is double, the entire expression promotes to double (e.g. true ? 1 : 2.0 yields 1.0).' },
        { rule: 'Right-to-Left Associativity', explanation: 'Nested ternaries associate from right to left: c1 ? v1 : c2 ? v2 : v3 is parsed as c1 ? v1 : (c2 ? v2 : v3).' },
        { rule: 'Auto-Unboxing Trap', explanation: 'If one branch is a null reference and the other is a primitive, the compiler attempts unboxing and throws NullPointerException at runtime.' },
        { rule: 'Readability Guideline', explanation: 'Do not nest ternaries more than two levels deep; use standard if-else ladders for complex business rules.' }
      ],
      quickComparison: [
        { aspect: 'Feature', optionA: 'Ternary Operator (? :)', optionB: 'if-else Statement' },
        { aspect: 'Classification', optionA: 'Expression (returns a value)', optionB: 'Control flow statement (no direct value)' },
        { aspect: 'Inline Assignment', optionA: 'Direct: int x = cond ? 1 : 2;', optionB: 'Verbose: requires multi-line block assignment' },
        { aspect: 'Type Consistency', optionA: 'Both branches must be type-compatible', optionB: 'Each branch can execute independent statements' },
        { aspect: 'Short-Circuiting', optionA: 'Evaluates only the selected branch', optionB: 'Executes only the selected block' }
      ]
    },
    coreExplanation: [
      'The ternary operator (? :) is Java\'s only conditional operator that takes three operands: a boolean condition, an expression if true, and an expression if false.',
      'Expression vs Statement: An if-else construct is a statement that directs execution flow; it does not produce a value on its own. The ternary operator is an expression that computes and returns a concrete value, allowing it to be assigned directly to variables or passed to methods.',
      'Short-Circuit Branch Evaluation: Only ONE of the two branch expressions is evaluated at runtime. If the condition is true, the second operand is evaluated and the third operand is completely skipped. Side effects in the unselected branch never execute.',
      'Type Unification (Binary Numeric Promotion): The compiler determines a single unified return type for the ternary expression at compile time. If one branch is an int and the other is a double, the int is promoted to double. For example, true ? 1 : 2.0 produces the double 1.0.',
      'The Auto-Unboxing NullPointerException (NPE) Trap: When one branch is a boxed primitive wrapper (e.g., Integer) and the other is a primitive (e.g., int or double), Java unboxes the wrapper. If the wrapper object happens to be null at runtime, an unexpected NullPointerException is thrown.',
      'Right-to-Left Associativity: When chaining multiple ternary operators without parentheses, Java parses them from right to left: a ? b : c ? d : e is parsed as a ? b : (c ? d : e).',
      'Syntax Restrictions: Because ternary is an expression, both branches must yield a value. Writing void method calls (like System.out.println()) directly as ternary branches fails compilation.'
    ],
    diagram: `=== TERNARY OPERATOR EVALUATION FLOW ===

                  [ Boolean Condition ]
                       /        \\
                 true /          \\ false
                     v            v
            [ Expression 1 ]   [ Expression 2 ]
                   |                  |
           (Expr 2 SKIPPED)    (Expr 1 SKIPPED)
                   \\                  /
                    v                v
                 [ Type Unification / Promotion ]
                                |
                                v
                         [ Final Value ]

Example of Type Promotion:
   boolean flag = true;
   double d = flag ? 10 : 20.5;
                     |     |
                    int  double  --> Unified to DOUBLE
                     v
             Evaluates to: 10.0`,
    codeSnippet: {
      title: 'Ternary Operator Evaluation, Type Promotion, and Short-Circuiting',
      code: `public class TernaryDemo {
    public static void main(String[] args) {
        int a = 15;
        int b = 25;

        // Basic max determination
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);

        // Type Promotion Trap: int 10 promoted to double 10.0
        boolean flag = true;
        System.out.println("Promoted value: " + (flag ? 10 : 20.5));

        // Short-circuiting side effects
        int counter = 0;
        int result = flag ? 100 : ++counter;
        System.out.println("result: " + result + ", counter: " + counter);
    }
}`,
      lineByLineExplanation: [
        { line: 'int max = (a > b) ? a : b;', explanation: '(15 > 25) is false, so expression evaluates to b (25).' },
        { line: 'flag ? 10 : 20.5', explanation: 'Since 20.5 is double, int 10 is promoted to double 10.0 at compile time.' },
        { line: 'int result = flag ? 100 : ++counter;', explanation: 'flag is true, so only 100 is evaluated; ++counter is completely skipped.' },
        { line: 'System.out.println(... counter: " + counter);', explanation: 'Prints counter: 0, confirming the unselected branch never executed.' }
      ],
      output: `Max: 25
Promoted value: 10.0
result: 100, counter: 0`
    },
    codeExamples: [
      {
        title: 'Finding Absolute Value and Parity',
        description: 'Using inline ternary expressions to compute absolute value and classify even/odd numbers.',
        code: `public class ParityAndAbsDemo {
    public static void main(String[] args) {
        int number = -42;

        // Absolute value inline
        int abs = (number < 0) ? -number : number;

        // Parity classification inline
        String parity = (number % 2 == 0) ? "EVEN" : "ODD";

        System.out.println("Number: " + number);
        System.out.println("Absolute: " + abs);
        System.out.println("Parity: " + parity);
    }
}`,
        output: `Number: -42
Absolute: 42
Parity: EVEN`
      },
      {
        title: 'Nested Ternary for Multi-Tier Evaluation',
        description: 'Chaining ternary operators to classify student grade marks without loops or methods.',
        code: `public class NestedTernaryGrades {
    public static void main(String[] args) {
        int marks = 82;

        // Nested right-to-left ternary grading
        char grade = (marks >= 90) ? 'A'
                   : (marks >= 80) ? 'B'
                   : (marks >= 70) ? 'C'
                   : 'F';

        System.out.println("Marks: " + marks + " -> Grade: " + grade);
    }
}`,
        output: 'Marks: 82 -> Grade: B'
      },
      {
        title: 'Branch Short-Circuiting Verification',
        description: 'Demonstrating that side effects in the unselected ternary branch do not execute.',
        code: `public class TernaryShortCircuitDemo {
    public static void main(String[] args) {
        int x = 10;
        int y = 20;

        // Condition is false -> only second branch executes
        int val = (x > 50) ? ++x : ++y;

        System.out.println("val: " + val + ", x: " + x + ", y: " + y);
    }
}`,
        output: 'val: 21, x: 10, y: 21'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Trying to execute void statements: (x > 0) ? System.out.println("Pos") : System.out.println("Neg");',
        whyItHappens: 'Treating the ternary operator as a shorthand syntax for an if-else statement.',
        howToFix: 'Remember ternary is an expression returning a value. Use: System.out.println((x > 0) ? "Pos" : "Neg");'
      },
      {
        mistake: 'Overlooking implicit floating-point promotion: flag ? 1 : 2.0 returning 1.0.',
        whyItHappens: 'Developers expect integer 1 to stay an integer when the true branch is taken.',
        howToFix: 'Ensure both branch operands have the exact same target type if decimal conversion is unwanted.'
      },
      {
        mistake: 'Writing deeply nested unparenthesized ternaries: a ? b : c ? d : e ? f : g.',
        whyItHappens: 'Attempting to cram complex branching logic into a single line.',
        howToFix: 'Use explicit parentheses for readability, or refactor into clear if-else blocks.'
      },
      {
        mistake: 'Unboxing null wrapper references in mixed-type ternaries causing NullPointerException.',
        whyItHappens: 'Mixing Integer and int causes auto-unboxing. If the Integer is null, it throws an NPE.',
        howToFix: 'Keep both branch expressions consistently primitive or consistently reference objects.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Tracing Type Promotion in Ternary',
        problemStatement: 'What does this program print?',
        code: `boolean condition = true;
System.out.println(condition ? 5 : 9.0);`,
        options: [
          '5',
          '5.0',
          '9.0',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'What happens when one branch is int and the other is double?',
        solution: '5.0',
        explanation: 'Due to binary numeric promotion rules, the Java compiler unifies the types of both branches. Because 9.0 is a double, the int 5 is promoted to double 5.0. Since condition is true, 5.0 is printed.'
      },
      {
        title: 'Puzzle 2: Bypassed Increment in False Branch',
        problemStatement: 'What are the values of res and count after this code executes?',
        code: `int count = 0;
int res = (10 > 2) ? 50 : ++count;
System.out.println("res=" + res + ", count=" + count);`,
        options: [
          'res=50, count=1',
          'res=50, count=0',
          'res=1, count=1',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Does the false branch evaluate when the condition is true?',
        solution: 'res=50, count=0',
        explanation: 'The condition (10 > 2) is true. The ternary operator evaluates ONLY the true branch (50) and completely skips the false branch (++count). Thus, count remains 0.'
      },
      {
        title: 'Puzzle 3: Nested Ternary Evaluation',
        problemStatement: 'What does this nested ternary expression print?',
        code: `int score = 75;
String result = score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Work";
System.out.println(result);`,
        options: [
          'Excellent',
          'Good',
          'Needs Work',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Evaluate from right to left: is score >= 90? No. Then evaluate the next ternary: is score >= 70?',
        solution: 'Good',
        explanation: 'score >= 90 (75 >= 90) is false. Execution moves to the false branch, which is another ternary: (score >= 70 ? "Good" : "Needs Work"). Since 75 >= 70 is true, it yields "Good".'
      },
      {
        title: 'Puzzle 4: Character and Integer Branch Promotion',
        problemStatement: 'What does this program print?',
        code: `char c = 'X';
int i = 0;
System.out.println(true ? c : 0);
System.out.println(false ? i : c);`,
        options: [
          'X followed by X',
          'X followed by 88',
          '88 followed by 88',
          '88 followed by X'
        ],
        correctOptionIndex: 1,
        hint: 'A constant literal 0 fits within char range (constant narrowing), but variable i is of type int (forces promotion to int).',
        solution: 'X followed by 88',
        explanation: 'In (true ? c : 0), 0 is a compile-time constant int that fits in char, so the expression type is char, printing \'X\'. In (false ? i : c), i is a variable of type int, which forces c to promote to int (ASCII 88), printing 88.'
      },
      {
        title: 'Puzzle 5: The Unboxing Null Trap',
        problemStatement: 'What happens when this snippet runs?',
        code: `boolean flag = false;
Integer val = null;
int num = flag ? 10 : val;
System.out.println(num);`,
        options: [
          'Prints 10',
          'Prints 0',
          'Throws NullPointerException at runtime',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Because num is primitive int, the right-hand branch val (which is null) must be unboxed to int.',
        solution: 'Throws NullPointerException at runtime',
        explanation: 'The false branch is selected, returning val. Because the variable num is primitive int, Java automatically unboxes the Integer object by calling val.intValue(). Since val is null, this throws a NullPointerException at runtime.'
      },
      {
        title: 'Puzzle 6: Ternary Precedence with String Concatenation',
        problemStatement: 'What does this snippet print?',
        code: `int x = 5;
System.out.println("Result: " + (x > 3 ? "Greater" : "Lesser"));`,
        options: [
          'Result: Greater',
          'Result: Lesser',
          'Compilation Error: bad operand types',
          'Greater'
        ],
        correctOptionIndex: 0,
        hint: 'The ternary operator is wrapped in parentheses, ensuring it evaluates before the String concatenation.',
        solution: 'Result: Greater',
        explanation: 'Because of the parentheses around (x > 3 ? "Greater" : "Lesser"), the ternary evaluates first, producing "Greater". Then String concatenation produces "Result: Greater".'
      },
      {
        title: 'Puzzle 7: The Unparenthesized String Concatenation Trap',
        problemStatement: 'What happens when parentheses are omitted around ternary in println?',
        code: `int x = 5;
System.out.println("Score is " + x > 3 ? "Pass" : "Fail");`,
        options: [
          'Score is Pass',
          'Pass',
          'Compilation Error: operator > cannot be applied to String and int',
          'Score is 5'
        ],
        correctOptionIndex: 2,
        hint: 'Operator precedence: String concatenation (+) has higher precedence than relational comparison (>).',
        solution: 'Compilation Error: operator > cannot be applied to String and int',
        explanation: '+ has higher precedence than >. The compiler parses this as ("Score is " + x) > 3, attempting to compare a String ("Score is 5") with integer 3 using >, which fails compilation.'
      },
      {
        title: 'Puzzle 8: Combined Ternary with Assignment and Increment',
        problemStatement: 'What are the final values of a and b?',
        code: `int a = 4;
int b = 6;
int result = (a++ > 4) ? (b += 2) : (a += b);
System.out.println("result=" + result + ", a=" + a + ", b=" + b);`,
        options: [
          'result=11, a=11, b=6',
          'result=8, a=5, b=8',
          'result=10, a=10, b=6',
          'Compilation Error'
        ],
        correctOptionIndex: 0,
        hint: 'In (a++ > 4), post-increment compares 4 > 4 (false), and a becomes 5. Which branch executes?',
        solution: 'result=11, a=11, b=6',
        explanation: '1. In (a++ > 4), the current value 4 is compared: (4 > 4) is false. Then a increments to 5. 2. Since condition is false, only the false branch (a += b) executes. 3. a += b adds 6 to 5: a becomes 11. The expression evaluates to 11. 4. b was never modified, so b remains 6. result = 11.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the ternary operator in Java, and why is it categorized as an expression rather than a statement?',
        answer: 'The ternary operator (? :) is Java\'s only operator that takes three operands: a boolean condition, an expression evaluated if true, and an expression evaluated if false. It is categorized as an expression because it computes and produces a concrete return value. Unlike an if-else statement, which simply directs execution flow, a ternary expression can be assigned to a variable, passed directly as a method parameter, or embedded within a larger calculation.',
        followUp: 'Can you place a void method call like System.out.println() inside a ternary branch?',
        followUpAnswer: 'No. Because ternary is an expression that must produce a value, neither branch can evaluate to void. Writing (flag) ? System.out.println("A") : System.out.println("B"); causes a compile-time error.',
        keyPhrases: ['produces a value', 'expression vs statement', 'inline assignment', 'cannot return void'],
        commonMistakeAnswer: 'Assuming ternary is just a concise syntax shorthand for if-else that can execute arbitrary statements.'
      },
      {
        question: 'How does type unification work in ternary operator expressions?',
        answer: 'The Java compiler must assign a single, static return type to the entire ternary expression at compile time according to the rules of Binary Numeric Promotion. If one branch is an int and the other is a double, the int is promoted to double. For example, in boolean flag = true; double val = flag ? 1 : 2.0;, the expression evaluates to the double 1.0 rather than integer 1.',
        followUp: 'What happens if the two branches have completely incompatible reference types?',
        followUpAnswer: 'The compiler computes their most specific common supertype (often Object, or a common interface). If assigned to an incompatible variable type, it will produce a compilation error.',
        keyPhrases: ['binary numeric promotion', 'compile-time static typing', 'promoted to double', 'common supertype'],
        commonMistakeAnswer: 'Believing that Java dynamically selects the type at runtime based on which branch was taken.'
      },
      {
        question: 'Does the ternary operator short-circuit, and how does it affect side effects?',
        answer: 'Yes, the ternary operator strictly short-circuits. At runtime, the boolean condition is evaluated first. If true, only the true expression is evaluated, and the false expression is completely skipped. If false, only the false expression is evaluated. Any side effects (such as variable assignments or pre/post-increments) located in the unselected branch do not execute.',
        followUp: 'Can you provide a code example proving branch short-circuiting?',
        followUpAnswer: 'int x = 0; int val = true ? 100 : ++x; results in val = 100 and x = 0. The ++x in the false branch never executed.',
        keyPhrases: ['evaluates only one branch', 'skips unselected branch', 'bypasses side effects'],
        commonMistakeAnswer: 'Assuming both branches are evaluated before the condition picks one.'
      },
      {
        question: 'What is the Auto-Unboxing NullPointerException trap associated with ternary operators?',
        answer: 'When a ternary expression mixes a boxed wrapper type (such as Integer) with a primitive type (such as int), Java automatically applies numeric unboxing. If the condition causes the expression to evaluate to the wrapper branch and that wrapper reference is null, Java attempts to call .intValue() during unboxing and throws a NullPointerException at runtime.',
        followUp: 'How can you safeguard against this NullPointerException?',
        followUpAnswer: 'Ensure that both branches of the ternary operator return the exact same boxed wrapper type (e.g., Integer.valueOf(0) instead of primitive 0), avoiding automatic unboxing.',
        keyPhrases: ['auto-unboxing', 'NullPointerException', 'mixing wrapper and primitive', 'intValue() call on null'],
        commonMistakeAnswer: 'Thinking that ternary expressions cannot throw NullPointerExceptions on primitive assignments.'
      },
      {
        question: 'What is the associativity of the ternary operator in Java?',
        answer: 'The ternary operator associates from right to left. This means that an unparenthesized nested ternary expression like a ? b : c ? d : e is parsed by the compiler as a ? b : (c ? d : e).',
        followUp: 'Why is it dangerous to write nested ternaries without parentheses?',
        followUpAnswer: 'Although the compiler resolves right-to-left associativity deterministically, human developers frequently misunderstand the grouping, creating severe logic bugs and unmaintainable code.',
        keyPhrases: ['right-to-left associativity', 'nested grouping', 'parentheses for readability'],
        commonMistakeAnswer: 'Assuming ternary associates from left to right like arithmetic addition.'
      },
      {
        question: 'Why does "System.out.println(\"Val: \" + flag ? 1 : 2);" fail to compile?',
        answer: 'Because the string concatenation operator (+) has higher precedence than the ternary operator (? :). The compiler parses the expression as ("Val: " + flag) ? 1 : 2. Since ("Val: " + flag) evaluates to a String, it cannot serve as the boolean condition required by the ternary operator, causing a compilation error.',
        followUp: 'How do you fix this error?',
        followUpAnswer: 'By wrapping the entire ternary expression in parentheses: System.out.println("Val: " + (flag ? 1 : 2));',
        keyPhrases: ['operator precedence', 'plus operator binds tighter', 'String cannot convert to boolean'],
        commonMistakeAnswer: 'Assuming the colon or question mark has the highest precedence in Java.'
      },
      {
        question: 'When should a developer choose an if-else statement over a ternary operator?',
        answer: 'Use a ternary operator for simple, single-line value selections (like picking min/max, setting defaults, or building concise strings). Choose an if-else statement when the logic requires executing multiple statements, performing I/O operations, dealing with complex nested business rules, or when branching clarity is paramount.',
        followUp: 'What does Clean Code philosophy say about nested ternary operators?',
        followUpAnswer: 'Clean Code principles advise avoiding nested ternaries altogether or limiting them strictly to two readable, cleanly formatted lines, as excessive nesting destroys code readability.',
        keyPhrases: ['single-line value selection', 'multiple statements require if-else', 'readability over conciseness'],
        commonMistakeAnswer: 'Believing that ternary is always faster or better than if-else in bytecode execution.'
      },
      {
        question: 'Is there any performance difference between a ternary operator and an equivalent if-else block in Java bytecode?',
        answer: 'No. The Java compiler (javac) compiles both a ternary operator and an equivalent if-else block into nearly identical bytecode branch instructions (such as ifeq or if_icmpne jump instructions). There is no measurable runtime performance difference; the choice is purely a matter of code style and readability.',
        followUp: 'Can JIT compilers optimize ternary expressions better than if-else?',
        followUpAnswer: 'Modern HotSpot JIT compilers optimize both constructs identically, often converting simple branch logic into branchless CPU instructions (like CMOV) where applicable.',
        keyPhrases: ['identical bytecode', 'branch instructions (ifeq)', 'no performance penalty', 'matter of style'],
        commonMistakeAnswer: 'Claiming that ternary is faster because it fits on a single line of source code.'
      },
      {
        question: 'How does Java handle constant expressions in ternary operators, such as final boolean FLAG = true; int x = FLAG ? 1 : 2;?',
        answer: 'When the condition in a ternary operator is a compile-time constant expression, the Java compiler evaluates the condition at compile time and emits bytecode only for the chosen branch. The dead code from the unselected branch is completely eliminated by the compiler.',
        followUp: 'Does this apply to dead code elimination in if statements as well?',
        followUpAnswer: 'Yes, if (false) { ... } is also recognized at compile time and the body is omitted from bytecode, though the compiler still verifies syntax.',
        keyPhrases: ['compile-time constant', 'dead code elimination', 'evaluated at compile time'],
        commonMistakeAnswer: 'Assuming the JVM must always evaluate the condition at runtime.'
      },
      {
        question: 'What is the result of evaluating: int x = -5; int sign = (x > 0) ? 1 : (x < 0) ? -1 : 0;?',
        answer: 'The result is -1. The outer condition (x > 0) is false because -5 is not greater than 0. Execution shifts to the false branch, which is another ternary: (x < 0) ? -1 : 0. Since -5 < 0 is true, it yields -1.',
        followUp: 'What mathematical function does this nested ternary implement?',
        followUpAnswer: 'It implements the signum (or sgn) function, which returns 1 for positive numbers, -1 for negative numbers, and 0 for zero.',
        keyPhrases: ['signum function', 'nested ternary evaluation', 'cascading conditions'],
        commonMistakeAnswer: 'Getting confused by the right-hand associativity and guessing 0.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the syntax of the ternary operator in Java?',
        options: [
          'condition ? expr1 : expr2',
          'condition : expr1 ? expr2',
          'condition ? expr1 , expr2',
          'if condition ? expr1 : expr2'
        ],
        correctIndex: 0,
        explanation: 'The ternary operator follows the syntax: booleanCondition ? expressionIfTrue : expressionIfFalse.'
      },
      {
        question: 'What does the expression true ? 10 : 20.0 evaluate to?',
        options: ['10', '10.0', '20.0', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'Because 20.0 is a double, numeric promotion unifies the expression type to double, producing 10.0.'
      },
      {
        question: 'What is the value of count after: int count = 0; int x = true ? 5 : ++count;?',
        options: ['1', '0', '5', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'Because the condition is true, only the true branch is evaluated; ++count is skipped, leaving count at 0.'
      },
      {
        question: 'Which of the following statements about the ternary operator is FALSE?',
        options: [
          'It is an expression that returns a value',
          'Only one of the two branch expressions is evaluated at runtime',
          'Both branch expressions must have compatible types',
          'It can be used to execute void statements directly'
        ],
        correctIndex: 3,
        explanation: 'Ternary is an expression and must return a value; it cannot execute void statements directly.'
      },
      {
        question: 'What is the result of: int a = 10, b = 20; int min = (a < b) ? a : b;?',
        options: ['10', '20', 'true', 'Compilation Error'],
        correctIndex: 0,
        explanation: '(10 < 20) is true, so a (10) is returned.'
      },
      {
        question: 'How does Java parse: a ? b : c ? d : e?',
        options: [
          '(a ? b : c) ? d : e',
          'a ? b : (c ? d : e)',
          '(a ? b : c ? d) : e',
          'It causes a compilation error without parentheses'
        ],
        correctIndex: 1,
        explanation: 'The ternary operator associates from right to left, parsing as a ? b : (c ? d : e).'
      },
      {
        question: 'What happens in: boolean flag = false; Integer i = null; int x = flag ? 1 : i;?',
        options: [
          'x becomes 1',
          'x becomes 0',
          'Throws NullPointerException at runtime',
          'Compilation Error'
        ],
        correctIndex: 2,
        explanation: 'Since the false branch is chosen, Java attempts to unbox the null Integer into primitive int, throwing a NullPointerException.'
      },
      {
        question: 'What does System.out.println("Answer: " + (5 > 2 ? "Yes" : "No")); print?',
        options: ['Answer: Yes', 'Answer: No', 'Yes', 'Compilation Error'],
        correctIndex: 0,
        explanation: '(5 > 2) is true, so the ternary evaluates to "Yes", concatenated to "Answer: Yes".'
      },
      {
        question: 'What is printed by: int val = -10; System.out.println(val > 0 ? "POS" : val < 0 ? "NEG" : "ZERO");?',
        options: ['POS', 'NEG', 'ZERO', 'Compilation Error'],
        correctIndex: 1,
        explanation: 'val > 0 is false. The nested ternary checks val < 0, which is true (-10 < 0), printing "NEG".'
      },
      {
        question: 'Can the condition in a ternary operator be an integer like in C (e.g. 5 ? 1 : 2)?',
        options: [
          'Yes, any non-zero number is true',
          'No, Java strictly requires a boolean condition',
          'Yes, but only for positive integers',
          'Yes, with a compiler warning'
        ],
        correctIndex: 1,
        explanation: 'In Java, the condition must strictly evaluate to a primitive boolean (true or false). Integers are not implicitly convertible to booleans.'
      }
    ]
  }
};
