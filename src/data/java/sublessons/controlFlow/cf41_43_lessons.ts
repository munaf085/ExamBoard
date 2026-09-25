import { DetailedLesson } from '../../detailedLessons';

export const cf41_43_lessons: Record<string, DetailedLesson> = {
  // =========================================================================
  // LESSON 4.1: If-Else Ladders & Decision Making
  // =========================================================================
  'if-else-ladder': {
    id: 'if-else-ladder',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow',
    lessonNumber: 'Lesson 4.1',
    title: 'If-Else Ladders & Decision Making',
    subtitle: 'Branching execution paths, strict boolean conditions, short-circuit logic, and definite assignment',
    estimatedMinutes: 14,
    beginnerAnalogy: 'Think of a highway toll plaza with dedicated lanes. As your car approaches, an automated scanner checks lane criteria one by one: first, are you an Emergency Vehicle? If yes, take Lane 1 immediately and ignore all other lanes. If no, are you an Electric Vehicle? If yes, take Lane 2. If no, are you carrying a FastPass? If not, you are directed to the General Cash lane at the end. You can only enter ONE lane; as soon as the first matching condition turns green, the gate opens and every remaining gate is skipped.',
    interviewTakeaways: [
      'Strict Boolean Enforcement: In Java, condition expressions inside if/else-if MUST evaluate strictly to boolean (true or false). Integers like "if (1)" or assignment numbers "if (x = 5)" fail at compile time.',
      'Definite Assignment Analysis: The Java compiler verifies that local variables are initialized on EVERY possible execution branch before they are read. If a variable is assigned inside an if block without an exhaustive else, reading it causes a compile-time error.',
      'Dangling Else Resolution: When multiple nested if statements omit curly braces {}, an else clause always binds to the NEAREST preceding unmatched if statement.',
      'Short-Circuit Side Effects: The logical operators && and || halt evaluation as soon as the outcome is certain. Any increment, decrement, or expression on the right side of a short-circuited condition will NOT execute.',
      'The Semicolon Bug: Placing an accidental semicolon after an if condition: "if (score >= 90);" defines an empty statement; the subsequent block executes unconditionally.'
    ],
    cheatSheet: {
      summary: 'Sequential multi-branch decision construct executing at most one branch from top to bottom based on boolean evaluations.',
      syntaxTemplate: `if (condition1) {
    // Executes when condition1 is true
} else if (condition2) {
    // Executes when condition1 is false AND condition2 is true
} else if (condition3) {
    // Executes when condition1 & condition2 are false AND condition3 is true
} else {
    // Default fallback: executes when ALL preceding conditions are false
}`,
      rules: [
        { rule: 'Condition Type', explanation: 'Conditions must be strictly boolean expressions. Java does NOT support truthy/falsy numeric coercion.' },
        { rule: 'First Match Wins', explanation: 'The first branch whose condition evaluates to true executes. All subsequent else-if and else blocks are skipped.' },
        { rule: 'Mandatory Block Bracing', explanation: 'Although single statements do not syntactically require braces {}, production Java mandates braces to prevent dangling-else and indentation bugs.' },
        { rule: 'Short-Circuiting', explanation: 'In conditionA && conditionB, conditionB is skipped if conditionA is false. In conditionA || conditionB, conditionB is skipped if conditionA is true.' },
        { rule: 'Definite Assignment', explanation: 'A local variable read after an if-ladder must be guaranteed to have received a value across all branches (including the else branch).' },
        { rule: 'Branch Ordering', explanation: 'Place more specific conditions before general ones. Placing a general condition (e.g. x > 0) before a specific one (e.g. x > 100) shadows the specific branch.' }
      ],
      quickComparison: [
        { aspect: 'Condition Expression', optionA: 'if-else: Any expression evaluating to boolean, including complex ranges and comparisons', optionB: 'switch: Discrete equality against compile-time constants (int, String, enum, etc.)' },
        { aspect: 'Evaluation Order', optionA: 'if-else: Evaluated sequentially from top to bottom O(N)', optionB: 'switch: Optimized with tableswitch / lookupswitch jump tables O(1)' },
        { aspect: 'Exhaustiveness', optionA: 'if-else: Optional else block; compiler checks definite assignment if values are read later', optionB: 'switch: Optional default in statements; mandatory exhaustiveness in switch expressions' },
        { aspect: 'Floating-Point Comparisons', optionA: 'if-else: Fully supported (e.g. price > 19.99 && price <= 49.99)', optionB: 'switch: Illegal; float and double cannot be switch selectors' },
        { aspect: 'Best Used For', optionA: 'if-else: Ranges, relational comparisons (<, >, <=), null guards, compound boolean flags', optionB: 'switch: Discrete menus, exact state tokens, command routing' }
      ]
    },
    coreExplanation: [
      'The if, if-else, and if-else-if ladder constructs form Java\'s primary mechanism for conditional decision making, directing control flow along divergent execution paths at runtime.',
      'Strict Primitive Boolean Type Requirement: Unlike C, C++, or JavaScript where non-zero numbers or non-null references are coerced to "truthy", Java strictly forbids non-boolean expressions in if statements. Writing "if (1)" or "if (count = 0)" produces an incompatible types compilation error.',
      'Sequential First-Match-Wins Semantics: Java tests ladder conditions sequentially from the topmost if downward. As soon as a condition evaluates to true, its associated statement block executes, and Java immediately jumps beyond the entire construct, skipping all subsequent else-if and else branches.',
      'The Dangling Else Ambiguity: When nested if statements are written without curly braces, an else statement binds syntactically to the nearest preceding unmatched if, regardless of visual indentation. Using braces {} eliminates ambiguity and ensures correct nesting.',
      'The Empty Statement Semicolon Trap: Placing a semicolon directly after the condition header, such as "if (x > 10);", terminates the conditional branch immediately with an empty statement. The subsequent braced block then executes unconditionally as a standalone block.',
      'Definite Assignment Analysis by javac: The Java compiler enforces definite assignment for local variables. If a variable is declared without initialization and assigned inside an if block, the compiler will disallow reading that variable afterwards unless an accompanying else branch guarantees an assignment on all paths.',
      'Short-Circuit Evaluation in Compound Conditions: In expressions containing logical AND (&&) and logical OR (||), Java evaluates operands strictly from left to right and stops the instant the final outcome is decided. For example, in "(x != 0 && 100 / x > 2)", the right-hand division never executes if x is 0, avoiding an ArithmeticException.',
      'Boolean Assignment vs Equality Trap: Writing "if (isFound = true)" assigns true to the boolean variable isFound and returns true, causing the branch to always execute. The idiomatic Java pattern is to write "if (isFound)" or "if (!isFound)" rather than comparing with == true.'
    ],
    diagram: `        +------------------------+
        |   boolean condition1   |
        +------------------------+
               /          \\
         true /            \\ false
             v              v
    +----------------+   +------------------------+
    | Execute Block1 |   |   boolean condition2   |
    +----------------+   +------------------------+
             |                 /          \\
             |           true /            \\ false
             |               v              v
             |      +----------------+   +------------------------+
             |      | Execute Block2 |   |   boolean condition3   |
             |      +----------------+   +------------------------+
             |               |                 /          \\
             |               |           true /            \\ false
             |               |               v              v
             |               |      +----------------+   +------------------------+
             |               |      | Execute Block3 |   | Fallback 'else' Block  |
             |               |      +----------------+   +------------------------+
             \\               |               /                      /
              \\              |              /                      /
               +------------->------+------+----------------------+
                                    |
                                    v
                         [ Continue Execution ]`,
    codeSnippet: {
      title: 'E-Commerce Tiered Discount Calculator',
      code: `public class DiscountCalculator {
    public static void main(String[] args) {
        double cartTotal = 175.50;
        double discountRate;

        if (cartTotal >= 200.0) {
            discountRate = 0.20; // 20% discount
        } else if (cartTotal >= 100.0) {
            discountRate = 0.10; // 10% discount (175.50 lands here)
        } else if (cartTotal >= 50.0) {
            discountRate = 0.05; // 5% discount
        } else {
            discountRate = 0.0;  // No discount
        }

        double finalAmount = cartTotal - (cartTotal * discountRate);
        System.out.println("Rate: " + (int)(discountRate * 100) + "%");
        System.out.println("Final: $" + finalAmount);
    }
}`,
      lineByLineExplanation: [
        { line: 'double discountRate;', explanation: 'Local variable declared uninitialized; Java verifies definite assignment across all branches.' },
        { line: 'if (cartTotal >= 200.0)', explanation: '175.50 >= 200.0 is false, so control drops to the first else-if branch.' },
        { line: 'else if (cartTotal >= 100.0)', explanation: '175.50 >= 100.0 is true! discountRate is assigned 0.10.' },
        { line: 'else if (cartTotal >= 50.0)...', explanation: 'Because a match was found, all subsequent else-if and else branches are completely skipped.' },
        { line: 'double finalAmount = cartTotal - ...', explanation: 'Calculates 175.50 - 17.55 = 157.95 using the definitely assigned discountRate.' }
      ],
      output: `Rate: 10%
Final: $157.95`
    },
    codeExamples: [
      {
        title: 'Example 1: Safe Division with Short-Circuit Guard',
        description: 'Using logical AND (&&) to guard against divide-by-zero errors without throwing an ArithmeticException.',
        code: `public class ShortCircuitGuard {
    public static void main(String[] args) {
        int divisor = 0;
        int numerator = 50;

        // Divisor is checked first; if 0, the right side NEVER executes
        if (divisor != 0 && (numerator / divisor) > 5) {
            System.out.println("Quotient is greater than 5");
        } else {
            System.out.println("Safe branch: divisor is zero or quotient <= 5");
        }
    }
}`,
        output: 'Safe branch: divisor is zero or quotient <= 5'
      },
      {
        title: 'Example 2: The Semicolon Trap in Action',
        description: 'Demonstrating how an unintended semicolon between the condition and the block creates an empty statement.',
        code: `public class SemicolonTrapDemo {
    public static void main(String[] args) {
        int userAge = 14;

        // Pitfall: the semicolon ends the if statement immediately!
        if (userAge >= 18); {
            System.out.println("Age check passed (Accidental execution!)");
        }

        System.out.println("User age verified: " + userAge);
    }
}`,
        output: `Age check passed (Accidental execution!)
User age verified: 14`
      },
      {
        title: 'Example 3: Compiler Definite Assignment Verification',
        description: 'Illustrating why the compiler mandates an else block when local variables are initialized inside conditional branches.',
        code: `public class DefiniteAssignmentDemo {
    public static void main(String[] args) {
        int score = 78;
        String status;

        if (score >= 60) {
            status = "PASSED";
        } else {
            status = "FAILED"; // Without this else, compilation fails!
        }

        // status is guaranteed to be initialized on all execution paths
        System.out.println("Examination Status: " + status);
    }
}`,
        output: 'Examination Status: PASSED'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Terminating the if condition with a semicolon: if (x > 5); { System.out.println(x); }',
        whyItHappens: 'Habit from writing standard Java statements ending with a semicolon. In an if statement, the semicolon acts as an empty statement body.',
        howToFix: 'Never place a semicolon between the closing parenthesis of an if/else-if condition and its opening curly brace.'
      },
      {
        mistake: 'Using assignment = instead of comparison ==: if (isValid = false)',
        whyItHappens: 'Typing a single equals sign. For boolean variables, this assigns the value and returns it, altering the variable and giving unintended branch execution.',
        howToFix: 'Use idiomatic boolean conditions like "if (!isValid)" or "if (isValid)", which are cleaner and immune to accidental assignment.'
      },
      {
        mistake: 'Writing out-of-order conditions in ladders (e.g. checking score >= 60 before score >= 90).',
        whyItHappens: 'Not realizing that ladders evaluate top-to-bottom and stop on the first match. A score of 95 triggers the >= 60 branch and never reaches the >= 90 branch.',
        howToFix: 'Order numerical range conditions strictly from most restrictive (highest threshold) to least restrictive, or use explicit bounded ranges.'
      },
      {
        mistake: 'Omitting curly braces in nested conditionals leading to the dangling else bug.',
        whyItHappens: 'Assuming that visual indentation dictates code hierarchy. Java ignores whitespace; the else binds to the nearest unmatched if.',
        howToFix: 'Always wrap all conditional bodies in curly braces {}, even for one-line statements.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: The Dangling Else Association',
        problemStatement: 'What does this code snippet print to standard output?',
        code: `int x = 4;
int y = 9;
if (x > 5)
    if (y > 5)
        System.out.print("A");
else
    System.out.print("B");
System.out.print("C");`,
        options: [
          'BC',
          'AC',
          'C',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Without braces, to which if statement does the else clause bind?',
        solution: 'C',
        explanation: 'In Java, an else clause matches with the nearest preceding unmatched if. Here, the else binds to "if (y > 5)", NOT "if (x > 5)". The outer condition "x > 5" (4 > 5) evaluates to false. Because the outer condition is false, its entire nested statement (the inner if and its else) is skipped completely. Only the subsequent unconditional print statement executes, printing "C".'
      },
      {
        title: 'Puzzle 2: Boolean Assignment in Conditional Header',
        problemStatement: 'What is printed after executing the following statements?',
        code: `boolean active = false;
if (active = true) {
    System.out.print("ON-");
} else {
    System.out.print("OFF-");
}
System.out.print(active);`,
        options: [
          'OFF-false',
          'ON-true',
          'ON-false',
          'Compilation Error: Cannot assign within if condition'
        ],
        correctOptionIndex: 1,
        hint: 'Notice single = is an assignment expression. What does an assignment expression evaluate to in Java?',
        solution: 'ON-true',
        explanation: 'The expression "active = true" assigns true to active and evaluates to the assigned value (true). Because Java requires a boolean condition, the resulting true satisfies the if condition. The if block executes, printing "ON-". Since active was assigned true, printing active yields "true", resulting in "ON-true".'
      },
      {
        title: 'Puzzle 3: Short-Circuit Side Effects in Compound OR',
        problemStatement: 'What are the final values of a and b printed to the console?',
        code: `int a = 10;
int b = 5;
if (a > 5 || ++b > 5) {
    a += 2;
}
System.out.print("a=" + a + ",b=" + b);`,
        options: [
          'a=12,b=6',
          'a=12,b=5',
          'a=10,b=5',
          'a=10,b=6'
        ],
        correctOptionIndex: 1,
        hint: 'Does Java evaluate the right-hand operand of || if the left-hand operand is already true?',
        solution: 'a=12,b=5',
        explanation: 'In the condition (a > 5 || ++b > 5), the left operand (10 > 5) evaluates to true. Because the logical OR operator (||) short-circuits, Java skips the right operand entirely. The expression ++b is never executed, leaving b at 5. The if body executes, updating a to 10 + 2 = 12. Final output: "a=12,b=5".'
      },
      {
        title: 'Puzzle 4: Semicolon Pitfall Output Tracing',
        problemStatement: 'Trace the output produced by this snippet:',
        code: `int speed = 45;
if (speed > 70);
{
    System.out.print("TICKET ");
}
System.out.print("CHECKED");`,
        options: [
          'CHECKED',
          'TICKET CHECKED',
          'TICKET',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Look closely at the line containing the if statement. Does it end with a semicolon?',
        solution: 'TICKET CHECKED',
        explanation: 'The semicolon at the end of "if (speed > 70);" acts as an empty statement for the if condition. The following block { System.out.print("TICKET "); } is an independent standalone block that executes unconditionally regardless of the value of speed. Therefore, both "TICKET " and "CHECKED" print.'
      },
      {
        title: 'Puzzle 5: Definite Assignment with Conditional Initialization',
        problemStatement: 'What is the outcome of compiling and running this program?',
        code: `int val = 15;
int multiplier;
if (val > 10) {
    multiplier = 2;
} else if (val <= 10) {
    multiplier = 1;
}
System.out.print(val * multiplier);`,
        options: [
          '30',
          '15',
          'Compilation Error: variable multiplier might not have been initialized',
          '0'
        ],
        correctOptionIndex: 2,
        hint: 'Does the Java compiler evaluate runtime arithmetic to verify if the conditions are mutually exhaustive, or does it require an else block?',
        solution: 'Compilation Error: variable multiplier might not have been initialized',
        explanation: 'The Java compiler does not evaluate runtime boolean expressions (like val > 10 and val <= 10) to determine mathematical completeness. Because there is no terminal "else" block, javac marks multiplier as potentially uninitialized, causing a compile-time error on "val * multiplier". Adding a trailing else resolves this error.'
      },
      {
        title: 'Puzzle 6: Ladder Ordering Shadowing Bug',
        problemStatement: 'What does this grade evaluator print for an input score of 95?',
        code: `int score = 95;
String grade = "F";
if (score >= 50) {
    grade = "Pass";
} else if (score >= 75) {
    grade = "Distinction";
} else if (score >= 90) {
    grade = "High Distinction";
}
System.out.print(grade);`,
        options: [
          'High Distinction',
          'Distinction',
          'Pass',
          'F'
        ],
        correctOptionIndex: 2,
        hint: 'If-else ladders evaluate top-to-bottom and stop at the first matching true branch.',
        solution: 'Pass',
        explanation: 'Since 95 >= 50 evaluates to true, the first branch executes immediately and assigns "Pass" to grade. All subsequent else-if conditions are skipped. To fix this logic, conditions should be sorted in descending order from most restrictive (>= 90) to least restrictive (>= 50).'
      },
      {
        title: 'Puzzle 7: Short-Circuit AND with Increment in Both Branches',
        problemStatement: 'Trace the output of this conditional sequence:',
        code: `int x = 2;
int y = 3;
if (x++ > 2 && y++ > 3) {
    x += 10;
}
System.out.print("x=" + x + ",y=" + y);`,
        options: [
          'x=3,y=4',
          'x=3,y=3',
          'x=13,y=4',
          'x=2,y=3'
        ],
        correctOptionIndex: 1,
        hint: 'Remember post-increment: x++ uses the current value of x in the comparison before incrementing.',
        solution: 'x=3,y=3',
        explanation: 'In the left operand "x++ > 2", the current value of x (2) is compared: (2 > 2) is false. Afterward, x increments to 3. Because the left side of && is false, the operator short-circuits and skips "y++ > 3" entirely. Thus, y remains 3. The if block does not execute. The output is "x=3,y=3".'
      },
      {
        title: 'Puzzle 8: Nested If with Complex Compound Conditions',
        problemStatement: 'What is printed after executing this code block?',
        code: `int temperature = 28;
boolean isRaining = false;
int planCode = 0;

if (temperature > 25) {
    if (!isRaining) {
        planCode = 1;
    } else {
        planCode = 2;
    }
} else if (temperature > 15 && !isRaining) {
    planCode = 3;
} else {
    planCode = 4;
}
System.out.print("Plan=" + planCode);`,
        options: [
          'Plan=1',
          'Plan=2',
          'Plan=3',
          'Plan=4'
        ],
        correctOptionIndex: 0,
        hint: 'Check temperature (28 > 25), then check !isRaining (!false is true).',
        solution: 'Plan=1',
        explanation: 'The outer condition (28 > 25) is true, entering the first block. Inside, !isRaining evaluates to !false, which is true. Thus, planCode is assigned 1. All subsequent else-if and else branches of the outer ladder are skipped. The program prints "Plan=1".'
      }
    ],
    interviewQuestions: [
      {
        question: 'How does Java\'s compiler handle definite assignment analysis in if-else constructs, and what causes the "variable might not have been initialized" error?',
        answer: 'Java enforces definite assignment for local variables at compile time. The compiler constructs a control flow graph to determine if every possible execution path through an if-else structure assigns a value to the variable before any subsequent read. If a variable is declared without an initial value and assigned inside an if block, the compiler insists on an exhaustive else branch or a preceding default initialization. Even if two if conditions seem mathematically complete (like x >= 0 and x < 0), the compiler does not evaluate runtime math, so it still considers the variable potentially uninitialized unless an else block is present.',
        followUp: 'Why doesn\'t the compiler simply provide a default value of 0 or null for local variables like it does for class member fields?',
        followUpAnswer: 'Class member fields belong to the object or class and represent object state where safe defaults (0, false, null) prevent memory corruption. Local variables, however, exist temporarily on the thread\'s call stack. Requiring explicit initialization of local variables is a deliberate design decision in Java to catch developer logic bugs, such as unhandled conditional branches or typos, at compile time rather than permitting subtle bugs at runtime.',
        keyPhrases: ['Definite assignment', 'Control flow analysis', 'Exhaustive branches', 'Call stack allocation', 'Compile-time bug prevention'],
        commonMistakeAnswer: 'A common mistake is thinking the compiler runs the math to know if the condition will always be true, or claiming that local variables are initialized to 0 by default.'
      },
      {
        question: 'What is the "Dangling Else" problem in programming languages, and how does the Java Language Specification resolve it?',
        answer: 'The dangling else problem occurs in nested conditional statements without explicit block boundaries (braces {}). When an inner if statement is nested inside an outer if statement followed by a single else clause, it creates syntactic ambiguity regarding which if statement owns the else. The Java Language Specification resolves this ambiguity by strictly binding the else clause to the nearest preceding unmatched if statement in the parse tree, regardless of how the code is indented.',
        followUp: 'How can a developer force an else clause to associate with the outer if statement instead of the inner if statement?',
        followUpAnswer: 'By wrapping the inner if statement entirely within curly braces {}. Placing the inner if statement inside a block isolates it, preventing the subsequent else clause from seeing it. The else clause then associates unambiguously with the outer if statement.',
        keyPhrases: ['Nearest unmatched if', 'Syntactic ambiguity', 'Parse tree binding', 'Block delimitation with braces', 'Whitespace insensitivity'],
        commonMistakeAnswer: 'Assuming that indentation determines the association, or believing that an else binds to the first if statement.'
      },
      {
        question: 'Explain the difference between the bitwise AND (&) and logical AND (&&) operators when used inside an if condition.',
        answer: 'The logical AND operator (&&) is a short-circuit operator: if its left operand evaluates to false, Java immediately concludes that the overall expression is false and skips evaluating the right operand. In contrast, the bitwise/logical boolean AND operator (&) is non-short-circuiting: it guarantees that both operands are always evaluated, even if the left operand is false. In practice, && is used in almost all control flow logic because it avoids unnecessary operations and safely guards against NullPointerException or ArithmeticException.',
        followUp: 'Can you give a concrete scenario where using & instead of && would cause an immediate runtime crash?',
        followUpAnswer: 'Consider guarding a null reference or zero divisor: "if (text != null && text.length() > 0)". With &&, if text is null, the left side is false and text.length() is never called. If we wrote "text != null & text.length() > 0", the & operator forces evaluation of text.length() on a null reference, crashing the program with a NullPointerException.',
        keyPhrases: ['Short-circuit evaluation', 'Non-short-circuiting &', 'Null guard', 'Divide-by-zero guard', 'Performance optimization'],
        commonMistakeAnswer: 'Saying & is only for numbers and cannot be used with booleans, or claiming that && and & behave identically in conditions.'
      },
      {
        question: 'Why does "if (x = 5)" cause a compile-time error in Java, but "if (flag = true)" compiles successfully?',
        answer: 'In Java, an assignment expression evaluates to the value that was assigned. In "if (x = 5)", 5 is assigned to x and the expression evaluates to the integer 5. Because Java\'s if statement strictly requires an expression of primitive boolean type (or Boolean wrapper), the compiler reports an incompatible types error ("int cannot be converted to boolean"). However, in "if (flag = true)", true is assigned to the boolean variable flag, and the expression evaluates to boolean true. Since the type is boolean, the compiler accepts it, even though it is almost always a bug where the developer intended the comparison "==".',
        followUp: 'What coding standard or practice prevents accidental boolean assignment in conditional statements?',
        followUpAnswer: 'The standard best practice is to test boolean variables directly without comparison operators, writing "if (flag)" or "if (!flag)". This makes an accidental assignment impossible because no assignment operator is used. Alternatively, some teams use "Yoda conditions" (e.g. "if (true == flag)"), where an accidental single = causes a compile error because a literal cannot be assigned to.',
        keyPhrases: ['Assignment expression value', 'Type incompatibility', 'Strict boolean typing', 'Idiomatic boolean testing', 'Yoda conditions'],
        commonMistakeAnswer: 'Believing that assignment is never allowed inside any if statement in Java.'
      },
      {
        question: 'How does condition ordering impact the performance and correctness of an if-else if-else ladder?',
        answer: 'Condition ordering impacts both correctness and performance. For correctness, conditions representing narrower, more specific subsets must appear before broader, general subsets. If a broad condition (e.g. score >= 50) is placed above a specific condition (e.g. score >= 90), any score of 95 triggers the first branch, rendering the specific branch dead code. For performance, in scenarios where conditions are mutually independent, ordering conditions by frequency of occurrence (most likely to least likely) minimizes the average number of boolean evaluations executed at runtime.',
        followUp: 'What compiler warning or error does Java produce if an else-if condition is completely unreachable due to previous conditions?',
        followUpAnswer: 'Java produces an "unreachable code" compile error for statements that can never be reached under any circumstances (such as code following an unconditional return or while(true)). However, for overlapping conditions in a ladder (like score >= 50 preceding score >= 90), javac typically allows compilation without error because it does not perform deep mathematical value range analysis on variables.',
        keyPhrases: ['Specificity ordering', 'Branch shadowing', 'Frequency-based optimization', 'Unreachable code', 'Linear evaluation overhead'],
        commonMistakeAnswer: 'Assuming the compiler will automatically reorder if-else ladder branches to make the logic work.'
      },
      {
        question: 'Can you declare a variable inside an if statement condition header, such as "if (int x = getValue() > 0)"?',
        answer: 'No, Java does not permit variable declarations inside the condition parentheses of an if statement. Unlike C++ (which allows declarations in conditions) or newer languages like Go, Java requires the condition expression to be a pure expression that evaluates to a boolean value. Variables must be declared before the if statement or inside the curly braces of the if block.',
        followUp: 'What is the scope of a variable declared inside the body of an if statement?',
        followUpAnswer: 'A variable declared inside the curly braces of an if block has block scope. Its lifetime begins at its point of declaration and ends at the closing curly brace of that block. It cannot be accessed in the else-if branches, the else branch, or after the if-else construct.',
        keyPhrases: ['Pure boolean expression', 'No declaration in condition header', 'Block scope', 'Stack frame lifetime', 'Lexical scoping'],
        commonMistakeAnswer: 'Confusing Java with languages like Go or C++ that allow variable declaration alongside conditions.'
      },
      {
        question: 'What is the purpose of nested if statements, and when should they be refactored into guard clauses or compound conditions?',
        answer: 'Nested if statements are used when a secondary decision depends strictly on the outcome of a primary decision. While useful for hierarchical decisions, deeply nested if statements (the "arrow anti-pattern") reduce readability and increase cognitive complexity. They should be refactored using guard clauses (early exits/returns) or combined using compound boolean operators (&&) when the nested conditions form a single logical prerequisite.',
        followUp: 'When would combining nested ifs into a single condition with && be worse than keeping them nested?',
        followUpAnswer: 'Combining is worse when each intermediate step requires specific error handling or logging, or when an expensive operation should only be computed after multiple other lightweight conditions pass. Keeping them separate or using nested blocks allows clean logging at each validation phase.',
        keyPhrases: ['Arrow anti-pattern', 'Guard clauses', 'Cognitive complexity', 'Stepwise validation', 'Readability refactoring'],
        commonMistakeAnswer: 'Claiming that nested if statements are always bad and should never be used under any circumstances.'
      },
      {
        question: 'Explain what happens when an if statement has an empty block {} or an empty statement ;.',
        answer: 'In Java, a semicolon alone constitutes an empty statement (a statement that performs no action). If placed after an if condition: "if (condition);", the if controls only the empty statement. The subsequent code block { ... } is treated as a normal, unconditional block of code that executes regardless of the condition. An empty block "{}" following an if statement executes nothing when the condition is true and continues to the next statement.',
        followUp: 'Is an empty statement ever valid or useful in production Java code?',
        followUpAnswer: 'An empty statement is rarely useful in if statements and is almost always a bug. Occasionally, developers use an empty loop body with a semicolon in low-level pointer-like scanning loops, but modern static analysis tools (like SonarQube or SpotBugs) flag empty statements as code smells or defects.',
        keyPhrases: ['Empty statement', 'Null statement', 'Unconditional block', 'Static analysis code smell', 'Accidental semicolon'],
        commonMistakeAnswer: 'Believing that "if (condition);" causes a compiler error.'
      },
      {
        question: 'How do floating-point comparisons behave inside an if condition, and why is "if (d1 == d2)" dangerous?',
        answer: 'Floating-point values (float and double) are represented in IEEE 754 binary floating-point format, which cannot represent many decimal fractions (such as 0.1 or 0.2) with exact precision. Performing arithmetic like 0.1 + 0.2 results in 0.30000000000000004. Comparing floating-point numbers with "==" will fail because the tiny rounding error makes them unequal. In an if condition, floating-point numbers should be compared using an epsilon (tolerance threshold): "if (Math.abs(d1 - d2) < 1e-9)".',
        followUp: 'How do Special floating-point values like NaN behave in if statements?',
        followUpAnswer: 'Double.NaN (Not-a-Number) has unique comparison semantics: NaN is not equal to anything, including itself. Therefore, "if (Double.NaN == Double.NaN)" evaluates to false! To check for NaN, you must use Double.isNaN(value).',
        keyPhrases: ['IEEE 754 representation', 'Rounding error', 'Epsilon tolerance', 'Math.abs comparison', 'Double.isNaN check'],
        commonMistakeAnswer: 'Assuming floating-point numbers can always be safely compared with == if they look equal in print statements.'
      },
      {
        question: 'How does the compiler evaluate constant expressions in if conditions, such as "if (false)" vs "if (flag)"?',
        answer: 'When a condition is a compile-time constant expression evaluating to false (like "if (false)"), the Java compiler identifies that the code inside the block can never be reached. However, the Java Language Specification specifically permits "if (false) { ... }" without throwing an "unreachable code" compile error to allow conditional compilation (similar to #ifdef in C). In contrast, "while (false)" will cause a compile-time error. If the condition uses a variable, even if initialized to false, it is not treated as a constant branch unless marked final.',
        followUp: 'What happens if a final boolean variable initialized to false is used in an if condition?',
        followUpAnswer: 'A "final boolean DEBUG = false;" is a compile-time constant expression. The compiler allows the if block to compile without error, but the compiler completely strips out the body of "if (DEBUG)" from the generated bytecode, achieving zero runtime overhead.',
        keyPhrases: ['Compile-time constant expression', 'Conditional compilation', 'Bytecode elimination', 'Unreachable statement exemption', 'Dead code stripping'],
        commonMistakeAnswer: 'Claiming that "if (false)" causes an unreachable code compilation error just like "while (false)".'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the required type of the expression inside the parentheses of an if statement in Java?',
        options: [
          'Any primitive numeric or boolean type',
          'Strictly boolean (or Boolean wrapper)',
          'Any non-null object reference or number',
          'int, char, or boolean'
        ],
        correctIndex: 1,
        explanation: 'In Java, the condition expression of an if statement must strictly evaluate to a boolean primitive or a Boolean object. Unlike C/C++, numeric values cannot be coerced to boolean.'
      },
      {
        question: 'In an if-else if-else ladder, what happens once a condition evaluates to true?',
        options: [
          'All remaining conditions are still checked in case another one is true',
          'Its block executes and all remaining else-if and else branches are skipped',
          'Execution terminates the enclosing program immediately',
          'Only the final else block is also executed'
        ],
        correctIndex: 1,
        explanation: 'An if-else ladder executes under first-match-wins semantics: the first true branch executes, and the JVM immediately bypasses all remaining branches.'
      },
      {
        question: 'What does the code "if (x > 10); { y = 20; }" do when x is 5?',
        options: [
          'y is set to 20 because the semicolon creates an empty statement and the block runs unconditionally',
          'y remains unchanged because x is not greater than 10',
          'Causes a compile-time error due to the misplaced semicolon',
          'Throws a NullPointerException at runtime'
        ],
        correctIndex: 0,
        explanation: 'The semicolon immediately terminates the if statement with an empty body. The subsequent block { y = 20; } is an independent block that executes unconditionally.'
      },
      {
        question: 'To which if statement does an else clause bind when nested without curly braces?',
        options: [
          'The first if statement in the file',
          'The furthest unmatched if statement',
          'The nearest preceding unmatched if statement',
          'The if statement with the identical indentation level'
        ],
        correctIndex: 2,
        explanation: 'By the Java Language Specification, an else binds to the nearest preceding unmatched if statement regardless of indentation.'
      },
      {
        question: 'What is the result of evaluating: false && (++count > 0)?',
        options: [
          'count is incremented and the expression evaluates to false',
          'count is NOT incremented because && short-circuits on a false left operand',
          'Causes an ArithmeticException',
          'Evaluates to true'
        ],
        correctIndex: 1,
        explanation: 'Because the left operand of && is false, the entire expression cannot be true. Java short-circuits and never evaluates the right operand, so count is not incremented.'
      },
      {
        question: 'Why does the compiler reject: int x; if (flag) { x = 10; } System.out.println(x);?',
        options: [
          'x cannot be assigned inside a block',
          'System.out.println cannot print local integers',
          'x might not have been initialized if flag evaluates to false',
          'flag must be an integer'
        ],
        correctIndex: 2,
        explanation: 'The compiler enforces definite assignment. If flag is false, x is never initialized, making reading x illegal at compile time.'
      },
      {
        question: 'What will "if (b = true)" do if b is a boolean variable initially set to false?',
        options: [
          'Causes a compile-time error because = is assignment',
          'Assigns true to b and executes the if block',
          'Compares b to true without changing b',
          'Assigns false to b'
        ],
        correctIndex: 1,
        explanation: 'The assignment expression "b = true" assigns true to b and evaluates to true. Because the condition evaluates to true, the if branch executes.'
      },
      {
        question: 'Which of the following conditions correctly guards against divide-by-zero when testing if 100/n > 10?',
        options: [
          'if (100 / n > 10 && n != 0)',
          'if (n != 0 & 100 / n > 10)',
          'if (n != 0 && 100 / n > 10)',
          'if (n == 0 || 100 / n > 10)'
        ],
        correctIndex: 2,
        explanation: 'The short-circuit operator && evaluates left-to-right. When n is 0, "n != 0" is false, so "100 / n > 10" is skipped, preventing an ArithmeticException.'
      },
      {
        question: 'What is the scope of a variable declared inside the body of an else block?',
        options: [
          'The entire class file',
          'The enclosing method including subsequent lines outside the if-else construct',
          'Only within the curly braces of that else block',
          'Shared between the if block and the else block'
        ],
        correctIndex: 2,
        explanation: 'Variables declared inside an else block have block scope and cease to exist once execution leaves the closing brace of that block.'
      },
      {
        question: 'How should two double variables d1 and d2 be compared for equality in an if condition?',
        options: [
          'if (d1 == d2)',
          'if (d1.equals(d2))',
          'if (Math.abs(d1 - d2) < 1e-9)',
          'if (d1 === d2)'
        ],
        correctIndex: 2,
        explanation: 'Due to binary floating-point rounding precision in IEEE 754, doubles should be compared using an epsilon tolerance (Math.abs(d1 - d2) < threshold).'
      }
    ]
  },

  // =========================================================================
  // LESSON 4.2: The Traditional Switch Statement & Fall-Through
  // =========================================================================
  'switch-statement': {
    id: 'switch-statement',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow',
    lessonNumber: 'Lesson 4.2',
    title: 'The Traditional Switch Statement & Fall-Through',
    subtitle: 'Multi-way jump tables, supported selector types, intentional vs accidental fall-through, and block scoping',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of an elevator in a multi-story hotel. When you press button "4", the elevator doesn\'t stop on floors 1, 2, or 3 to ask if you want to get off—it jumps directly to Floor 4. However, in a traditional Java switch without a "break", imagine the elevator doors open on Floor 4, you don\'t get off, and the elevator immediately continues tumbling down through Floor 5, Floor 6, and the Basement! The "break" statement is the emergency brake that lets you step out safely at your desired floor.',
    interviewTakeaways: [
      'Allowed Selector Types: Traditional switch works ONLY with char, byte, short, int, their corresponding wrappers (Character, Byte, Short, Integer), String (Java 7+), and enum types. long, float, double, and boolean are ILLEGAL.',
      'Fall-Through Mechanics: In a switch statement, execution jumps to the matching case label and flows sequentially through all subsequent cases until a "break" or the closing brace is reached.',
      'Compile-Time Constant Case Labels: Every case label value MUST be a compile-time constant expression (literals or final variables initialized with constants). Variables or runtime method calls cannot be used.',
      'Shared Scope across Cases: A switch block constitutes a SINGLE local variable scope. Declaring "int x = 1;" in case 1 and "int x = 2;" in case 2 causes a duplicate variable compilation error unless enclosed in curly braces {}.',
      'Bytecode Architecture: The JVM compiles switch statements into either a "tableswitch" (dense values, O(1) direct array indexing) or a "lookupswitch" (sparse values, O(log N) binary search).'
    ],
    cheatSheet: {
      summary: 'Multi-way constant branch construct utilizing jump tables for discrete value matching with sequential fall-through mechanics.',
      syntaxTemplate: `switch (expression) {
    case CONSTANT_1:
        // Statements executed for CONSTANT_1
        break; // Exits the switch statement
    case CONSTANT_2:
    case CONSTANT_3:
        // Grouped cases (intentional fall-through)
        break;
    default:
        // Optional fallback executed when no case matches
        break;
}`,
      rules: [
        { rule: 'Supported Types', explanation: 'Only byte, short, char, int, wrapper classes, String, and enum are permitted. long, float, double, boolean are forbidden.' },
        { rule: 'Constant Expressions', explanation: 'Case values must be compile-time constants or literals. Duplicate case values cause a compilation error.' },
        { rule: 'Fall-Through Behavior', explanation: 'Omitting a "break" causes control to fall through into subsequent case blocks, executing their code regardless of matching labels.' },
        { rule: 'Default Placement', explanation: 'The default label can be placed anywhere in the switch. If placed at the top or middle without a break, it will fall through into subsequent cases!' },
        { rule: 'Block Scope Sharing', explanation: 'Variables declared inside a switch share scope across all cases unless explicitly enclosed inside nested curly braces {}.' },
        { rule: 'Null String Selector', explanation: 'Passing a null String or null wrapper to a switch statement throws a NullPointerException immediately at runtime.' }
      ],
      quickComparison: [
        { aspect: 'Selector Expression', optionA: 'Traditional Switch: Evaluates integral primitives, String, enum', optionB: 'If-Else Ladder: Evaluates any arbitrary boolean expression' },
        { aspect: 'Execution Dispatch', optionA: 'Traditional Switch: JVM tableswitch/lookupswitch jump table O(1)', optionB: 'If-Else Ladder: Linear top-to-bottom condition testing O(N)' },
        { aspect: 'Branch Termination', optionA: 'Traditional Switch: Requires explicit "break;" to prevent fall-through', optionB: 'If-Else Ladder: Automatically breaks out upon executing matching block' },
        { aspect: 'Value Matching', optionA: 'Traditional Switch: Exact equality against discrete constants', optionB: 'If-Else Ladder: Range comparisons (<, >, <=), relational logic, inequalities' },
        { aspect: 'Duplicate Check', optionA: 'Traditional Switch: Compiler rejects duplicate case values', optionB: 'If-Else Ladder: Overlapping conditions compile silently, shadowing later branches' }
      ]
    },
    coreExplanation: [
      'The traditional switch statement provides multi-way branch selection based on the equality of a single selector expression against discrete compile-time constant values.',
      'Permissible Selector Data Types: A switch selector expression must evaluate to primitive char, byte, short, int, their respective wrapper types (Character, Byte, Short, Integer), String (since Java 7), or an enum constant. The 64-bit long primitive, floating-point types (float, double), and boolean are strictly prohibited by the Java language specification.',
      'Case Labels Must Be Compile-Time Constants: Each case label must be followed by a constant expression evaluated at compile time. This includes literals (e.g. 10, \'A\', "ADMIN") and final variables initialized with constant expressions. Non-final variables or dynamic method calls cannot be used as case values.',
      'Fall-Through Mechanics and the break Statement: When a matching case label is found, the JVM transfers control directly to that label. Execution then proceeds sequentially down through all following statements across subsequent cases until a "break" statement or the end of the switch block is encountered. Omitting break causes accidental fall-through.',
      'Intentional Fall-Through Patterns: Fall-through is occasionally exploited intentionally to share identical logic across multiple case values, such as stacking multiple labels: "case 1: case 2: case 3: doAction(); break;".',
      'The default Case Semantics: The default block handles all values not explicitly matched by a case label. It is completely optional. While conventionally placed at the end of the switch, it may be placed anywhere; if placed first or in the middle without a break, it too will fall through into subsequent cases.',
      'Switch-Level Variable Scoping: The entire body of a switch statement forms a single local variable scope. If a variable is declared in "case 1: int count = 0; break;", that variable name remains in scope for all subsequent cases. Declaring "int count = 10;" in "case 2" causes a "duplicate local variable" compilation error unless individual cases are enclosed in separate curly braces {}.',
      'Underlying JVM Bytecode: tableswitch vs lookupswitch: When case values are dense (consecutive or near-consecutive integers), javac compiles the switch into a "tableswitch" bytecode instruction, which indexes an array of jump targets in O(1) time. When values are sparse, javac emits a "lookupswitch" instruction, which searches sorted keys via binary search in O(log N) time.'
    ],
    diagram: `                     switch (selectorExpression)
                                 |
           +---------------------+---------------------+
           |                     |                     |
     case CONST_A          case CONST_B             default
           |                     |                     |
    [ Execute Code A ]    [ Execute Code B ]    [ Execute Fallback ]
           |                     |                     |
      has break?            has break?            has break?
      /         \\           /         \\           /         \\
    yes          no       yes          no       yes          no
     v            v        v            v        v            v
  [ EXIT ]   [FALL-THROUGH] [ EXIT ] [FALL-THROUGH] [ EXIT ]  [ EXIT ]
                   |                    |
                   v                    v
          (Enters Code B)      (Enters Default)`,
    codeSnippet: {
      title: 'Traffic Signal Controller with Fall-Through Handling',
      code: `public class TrafficSignalSwitch {
    public static void main(String[] args) {
        String lightColor = "YELLOW";
        String action;

        switch (lightColor) {
            case "RED":
                action = "Stop completely behind the line";
                break;
            case "YELLOW":
                action = "Prepare to stop safely";
                break; // Essential break to prevent fall-through!
            case "GREEN":
                action = "Proceed with caution";
                break;
            default:
                action = "Signal malfunctioning - treat as 4-way stop";
                break;
        }

        System.out.println("Light: " + lightColor);
        System.out.println("Action: " + action);
    }
}`,
      lineByLineExplanation: [
        { line: 'switch (lightColor)', explanation: 'Evaluates the String variable lightColor; uses String.hashCode() and equals() internally.' },
        { line: 'case "YELLOW":', explanation: 'Matches "YELLOW" directly; control jumps straight to this label.' },
        { line: 'action = "Prepare to stop safely";', explanation: 'Assigns the appropriate action description for the yellow signal.' },
        { line: 'break;', explanation: 'Exits the switch statement immediately, preventing execution from bleeding into case "GREEN".' },
        { line: 'System.out.println(...);', explanation: 'Prints the verified traffic signal action.' }
      ],
      output: `Light: YELLOW
Action: Prepare to stop safely`
    },
    codeExamples: [
      {
        title: 'Example 1: Intentional Fall-Through for Days in Month',
        description: 'Demonstrating grouped case labels to map multiple months to their respective day counts.',
        code: `public class DaysInMonthDemo {
    public static void main(String[] args) {
        int month = 4; // April
        int days;

        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4: case 6: case 9: case 11:
                days = 30; // April matches here
                break;
            case 2:
                days = 28;
                break;
            default:
                days = 0; // Invalid month
                break;
        }

        System.out.println("Month " + month + " has " + days + " days.");
    }
}`,
        output: 'Month 4 has 30 days.'
      },
      {
        title: 'Example 2: Scope Isolation inside Switch Cases',
        description: 'Using explicit curly braces {} within individual cases to allow reusing local variable names.',
        code: `public class SwitchScopingDemo {
    public static void main(String[] args) {
        int commandCode = 1;

        switch (commandCode) {
            case 1: {
                int tempResult = 100; // Isolated block scope
                System.out.println("Command 1 processed: " + tempResult);
                break;
            }
            case 2: {
                int tempResult = 200; // Legal! No variable name collision
                System.out.println("Command 2 processed: " + tempResult);
                break;
            }
            default:
                System.out.println("Unknown command");
                break;
        }
    }
}`,
        output: 'Command 1 processed: 100'
      },
      {
        title: 'Example 3: Non-Standard Default Placement with Fall-Through',
        description: 'Illustrating what occurs when default is placed at the top of a switch without a break.',
        code: `public class DefaultTopFallthrough {
    public static void main(String[] args) {
        int testVal = 99; // Matches no explicit case

        switch (testVal) {
            default:
                System.out.print("Default ");
                // Missing break! Falls directly through into case 1:
            case 1:
                System.out.print("One ");
                break;
            case 2:
                System.out.print("Two ");
                break;
        }
    }
}`,
        output: 'Default One '
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Attempting to switch on a long, float, double, or boolean type: switch (10.5) { ... }',
        whyItHappens: 'Assuming that switch supports all primitive types just like if-else statements.',
        howToFix: 'Use an if-else ladder for floating-point numbers, long integers, and booleans, or cast narrow integral values to int if appropriate.'
      },
      {
        mistake: 'Forgetting the break statement at the end of a case block.',
        whyItHappens: 'Assuming each case block terminates automatically at the next case label.',
        howToFix: 'Always include "break;" at the end of each case block unless intentional fall-through is explicitly desired and documented.'
      },
      {
        mistake: 'Using a non-final variable or method result as a case label: case myVariable:',
        whyItHappens: 'Treating case labels like if-condition equality comparisons (e.g. if (x == myVariable)).',
        howToFix: 'Case labels must be compile-time constants. Mark variables as "final int MY_CONST = 5;" or use literals.'
      },
      {
        mistake: 'Declaring the same variable name in two different cases without curly braces {}.',
        whyItHappens: 'Assuming each case has its own private scope.',
        howToFix: 'Wrap case code in curly braces: "case 1: { int x = 10; break; } case 2: { int x = 20; break; }".'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Cascading Fall-Through Output Trace',
        problemStatement: 'What does the following program print to the console?',
        code: `int code = 2;
switch (code) {
    case 1:
        System.out.print("A");
    case 2:
        System.out.print("B");
    case 3:
        System.out.print("C");
        break;
    case 4:
        System.out.print("D");
    default:
        System.out.print("E");
}`,
        options: [
          'B',
          'BC',
          'BCDE',
          'BDE'
        ],
        correctOptionIndex: 1,
        hint: 'Find the entry case label for code = 2. Trace execution downward until you hit a break.',
        solution: 'BC',
        explanation: 'Execution jumps to "case 2:", printing "B". Because there is no break statement after case 2, control falls through into "case 3:", printing "C". Case 3 contains a break statement, which terminates the switch. Output is "BC".'
      },
      {
        title: 'Puzzle 2: Missing Break with Default at the End',
        problemStatement: 'What will be printed when this snippet runs?',
        code: `int x = 3;
switch (x) {
    case 1:
        System.out.print("1");
        break;
    case 2:
        System.out.print("2");
    case 3:
        System.out.print("3");
    case 4:
        System.out.print("4");
    default:
        System.out.print("D");
}`,
        options: [
          '3',
          '34',
          '34D',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Notice that neither case 3, case 4, nor default contains a break statement.',
        solution: '34D',
        explanation: 'x is 3, so execution enters at "case 3:", printing "3". With no break, it falls through to "case 4:", printing "4". With still no break, it falls through into "default:", printing "D". Total printed output is "34D".'
      },
      {
        title: 'Puzzle 3: The Default-First Trap with Unmatched Input',
        problemStatement: 'Trace what is printed when the following code executes:',
        code: `int rank = 7;
switch (rank) {
    default:
        System.out.print("DEF ");
    case 1:
        System.out.print("ONE ");
        break;
    case 2:
        System.out.print("TWO ");
        break;
}`,
        options: [
          'DEF ',
          'DEF ONE ',
          'DEF ONE TWO ',
          'ONE '
        ],
        correctOptionIndex: 1,
        hint: 'rank is 7, which matches neither 1 nor 2. Control goes to default. Is there a break in default?',
        solution: 'DEF ONE ',
        explanation: 'Because rank (7) does not match case 1 or 2, execution jumps to the default block, printing "DEF ". Because the default block has no break statement, execution falls through into case 1, printing "ONE ". Case 1 contains a break, terminating the switch. The output is "DEF ONE ".'
      },
      {
        title: 'Puzzle 4: Variable Scoping Across Switch Cases',
        problemStatement: 'What happens when attempting to compile this Java code?',
        code: `int mode = 2;
switch (mode) {
    case 1:
        int value = 10;
        System.out.print(value);
        break;
    case 2:
        int value = 20;
        System.out.print(value);
        break;
    default:
        System.out.print("None");
}`,
        options: [
          'Prints 20',
          'Prints 10',
          'Compilation Error: Variable "value" is already defined in the scope',
          'Runtime Error: Incompatible scope access'
        ],
        correctOptionIndex: 2,
        hint: 'Remember that a switch statement contains a single shared local variable scope between the opening { and closing } braces.',
        solution: 'Compilation Error: Variable "value" is already defined in the scope',
        explanation: 'In Java, the entire switch block represents a single scope for local variables. Declaring "int value" in case 1 puts that identifier into the switch\'s symbol table. Repeating "int value" in case 2 causes a duplicate local variable compilation error. To resolve this, each case must be wrapped in its own curly braces {}.'
      },
      {
        title: 'Puzzle 5: Illegal Selector Type Compilation Check',
        problemStatement: 'Which of the following variable declarations will cause a compilation error if used as the selector in a traditional switch?',
        code: `// Which of these CANNOT be used in switch (val) { ... }?
// Option 0: char val = 'A';
// Option 1: short val = 12;
// Option 2: long val = 100L;
// Option 3: String val = "HELLO";`,
        options: [
          'char val = \'A\';',
          'short val = 12;',
          'long val = 100L;',
          'String val = "HELLO";'
        ],
        correctOptionIndex: 2,
        hint: 'Switch selectors only support integral types up to 32 bits (and String/enum). Which type is 64-bit?',
        solution: 'long val = 100L;',
        explanation: 'In Java, primitive long (and Long wrapper) cannot be used as the selector expression in a switch statement. The allowed types are byte, short, char, int, their wrappers, String, and enums. float, double, boolean, and long are all prohibited.'
      },
      {
        title: 'Puzzle 6: Final vs Non-Final Case Label Constant',
        problemStatement: 'What is the outcome of compiling and running this snippet?',
        code: `int target = 10;
int x = 10;
switch (target) {
    case x:
        System.out.print("MATCH");
        break;
    default:
        System.out.print("NO MATCH");
}`,
        options: [
          'Prints MATCH',
          'Prints NO MATCH',
          'Compilation Error: Constant expression required',
          'Runtime Exception'
        ],
        correctOptionIndex: 2,
        hint: 'Is "x" a compile-time constant?',
        solution: 'Compilation Error: Constant expression required',
        explanation: 'In Java, case labels must be compile-time constants. Because "x" is declared as a regular mutable variable (not marked final), the compiler rejects "case x:" with the error "constant expression required". If it had been declared as "final int x = 10;", it would have compiled successfully.'
      },
      {
        title: 'Puzzle 7: Char Arithmetic and Fall-Through',
        problemStatement: 'What does this snippet print to the console?',
        code: `char letter = 'B';
switch (letter) {
    case 'A':
        System.out.print("Alpha ");
    case 'B':
        System.out.print("Bravo ");
    case 'C':
        System.out.print("Charlie ");
        break;
    case 'D':
        System.out.print("Delta ");
        break;
}`,
        options: [
          'Bravo ',
          'Bravo Charlie ',
          'Alpha Bravo Charlie ',
          'Bravo Charlie Delta '
        ],
        correctOptionIndex: 1,
        hint: 'Execution begins at case \'B\'. Trace downward until a break is hit.',
        solution: 'Bravo Charlie ',
        explanation: 'letter is \'B\', matching "case \'B\':" and printing "Bravo ". Because case \'B\' has no break statement, control falls through into case \'C\', printing "Charlie ". Case \'C\' ends with a break, terminating the switch. The output is "Bravo Charlie ".'
      },
      {
        title: 'Puzzle 8: Tricky Evaluation of Matched Default without Break',
        problemStatement: 'Trace the output of this code with a matched middle case:',
        code: `int k = 1;
switch (k) {
    case 0:
        System.out.print("Zero ");
        break;
    case 1:
        System.out.print("One ");
    default:
        System.out.print("Default ");
    case 2:
        System.out.print("Two ");
        break;
}`,
        options: [
          'One ',
          'One Default ',
          'One Default Two ',
          'Default Two '
        ],
        correctOptionIndex: 2,
        hint: 'k matches case 1. Trace sequential execution through default and case 2.',
        solution: 'One Default Two ',
        explanation: 'k equals 1, so execution jumps to "case 1:", printing "One ". Since there is no break, control falls through into the "default:" label, printing "Default ". With still no break, execution continues into "case 2:", printing "Two ". At case 2, a break statement is finally reached, exiting the switch. Output: "One Default Two ".'
      }
    ],
    interviewQuestions: [
      {
        question: 'Why are float, double, boolean, and long types disallowed as selectors in a traditional Java switch statement?',
        answer: 'The restriction stems from JVM architecture and bytecode efficiency. The JVM switch bytecode instructions—tableswitch and lookupswitch—operate exclusively on 32-bit signed integer values. Supporting long would require 64-bit jump tables, adding instruction set complexity for negligible practical benefit. Floating-point types (float and double) suffer from IEEE 754 precision rounding issues, making exact equality checks unreliable and inappropriate for discrete jump tables. Finally, boolean has only two states (true/false), for which an if-else statement is syntactically clearer and more efficient.',
        followUp: 'How does Java support String in switch statements since Java 7 if the JVM only supports 32-bit integer jump tables?',
        followUpAnswer: 'Javac desugars String switches at compile time into a two-step process: first, it computes the 32-bit String.hashCode() of the selector and performs an integer switch over the hash codes. Upon landing at a hash match, it performs an exact string equality check using String.equals() to handle hash collisions. Finally, it assigns an integer case index and executes a second fast tableswitch over that index.',
        keyPhrases: ['32-bit signed integers', 'tableswitch and lookupswitch', 'IEEE 754 rounding inaccuracy', 'Desugaring via String.hashCode()', 'Collision handling with equals()'],
        commonMistakeAnswer: 'Believing that the JVM has native string comparison instructions, or that long was omitted by accident.'
      },
      {
        question: 'What is the difference between the tableswitch and lookupswitch bytecode instructions in the JVM?',
        answer: 'tableswitch and lookupswitch are the two JVM instructions used to compile switch statements. The javac compiler generates a tableswitch when the case constants are dense (contiguous or tightly clustered integers). A tableswitch contains a table of target offsets indexed directly by subtracting the low value from the selector, yielding O(1) time complexity. When the case values are sparse (e.g. 1, 1000, 50000), emitting a dense table would waste memory on padding offsets. In that case, javac emits a lookupswitch, which stores a sorted list of key-offset pairs and performs a binary search at runtime with O(log N) time complexity.',
        followUp: 'What determines the threshold where the compiler switches from tableswitch to lookupswitch?',
        followUpAnswer: 'The compiler evaluates the density of the cases: (number of cases) / (max_val - min_val + 1). If the space efficiency of a table with empty jump slots outweighs the performance penalty of a binary search table, it generates tableswitch; otherwise, it chooses lookupswitch.',
        keyPhrases: ['tableswitch', 'lookupswitch', 'Dense vs sparse keys', 'O(1) direct indexing', 'O(log N) binary search'],
        commonMistakeAnswer: 'Thinking switch statements are always compiled into linear if-else cascades under the hood.'
      },
      {
        question: 'What happens if a null reference is passed to a switch statement on a String or boxed wrapper type?',
        answer: 'If the selector expression in a switch evaluates to null, the switch statement throws a NullPointerException immediately when the switch header is evaluated at runtime. It does NOT jump to the default case. For a String, this happens because the generated bytecode calls selector.hashCode(). For boxed primitives like Integer or Character, this happens because the JVM automatically invokes unboxing (e.g. intValue()), which fails on a null reference.',
        followUp: 'How can a developer prevent this NullPointerException in traditional switch statements?',
        followUpAnswer: 'The developer must perform an explicit null check before the switch statement (e.g. "if (str == null) { ... }"), provide a non-null default fallback via Objects.requireNonNullElse(), or upgrade to Java 17+ pattern matching switch which explicitly allows "case null:".',
        keyPhrases: ['NullPointerException', 'Auto-unboxing failure', 'hashCode() on null', 'Does NOT go to default', 'case null in modern Java'],
        commonMistakeAnswer: 'Assuming that passing null will cleanly jump to the default case.'
      },
      {
        question: 'Explain why variable declarations inside a switch statement can cause scoping and compilation issues.',
        answer: 'In Java, the block delimited by the switch braces { } constitutes a single local variable scope. Case labels are merely entry points (labels) within this single scope, not separate blocks. Consequently, if a variable is declared in one case, declaring another variable with the same identifier in another case is a duplicate declaration error. Furthermore, if a variable is declared and initialized in case 1, and execution jumps directly to case 2, the variable is in scope in case 2, but its initialization was bypassed, leading to "variable might not have been initialized" errors if read.',
        followUp: 'What is the clean, idiomatic way to isolate variable scopes inside traditional switch statements?',
        followUpAnswer: 'Enclose the statements belonging to each case in explicit curly braces: "case 1: { int temp = 10; ... break; } case 2: { int temp = 20; ... break; }". This creates an isolated lexical scope for each case.',
        keyPhrases: ['Single switch scope', 'Jump target labels', 'Bypassed initialization', 'Lexical scope isolation with braces', 'Duplicate local variable'],
        commonMistakeAnswer: 'Believing that each case automatically creates its own independent scope.'
      },
      {
        question: 'Is the default case required to be the last case in a switch statement? What are the behavioral implications if it is not?',
        answer: 'No, Java does not mandate that the default case be placed at the end of the switch statement; it can legally appear anywhere, including at the very top or between other cases. Regardless of its position, the default case is only entered if no explicit case label matches the selector. However, if the default case is placed at the top or in the middle and does NOT end with a "break" statement, execution will fall through into whatever case label immediately follows it in physical source order.',
        followUp: 'Why do virtually all style guides mandate placing default at the very end?',
        followUpAnswer: 'Placing default at the end eliminates accidental fall-through bugs into subsequent cases, adheres to the principle of least astonishment for code maintenance, and cleanly reflects the fallback nature of default.',
        keyPhrases: ['Flexible placement', 'Fallback semantics', 'Fall-through from middle default', 'Principle of least astonishment', 'Defensive break'],
        commonMistakeAnswer: 'Believing that default MUST always be the last line of a switch, or thinking default runs first if placed at the top.'
      },
      {
        question: 'What is "intentional fall-through" and how should it be documented in production code?',
        answer: 'Intentional fall-through is the practice of deliberately omitting a break statement so that multiple case labels share code, or so that execution cascades through sequential stages. The most common use case is grouping multiple labels to share a single action (e.g. "case 1: case 2: case 3: return OK;"). When fall-through is used between non-empty case bodies, standard production guidelines (such as Google Java Style or SonarQube) require a comment like "/* fall through */" to signal to static analyzers and other developers that the omission of break was intentional.',
        followUp: 'What modern Java alternative completely eliminates the need for fall-through comments?',
        followUpAnswer: 'Modern switch expressions using the arrow syntax (->), introduced in Java 14. They permit multiple comma-separated case labels (e.g. "case 1, 2, 3 -> doAction();") with zero fall-through by design.',
        keyPhrases: ['Intentional fall-through', 'Grouped case labels', 'Static analysis comment', '/* fall through */', 'Modern comma-separated labels'],
        commonMistakeAnswer: 'Believing that fall-through is always a bug and has no valid software design applications.'
      },
      {
        question: 'Can you use an enum in a traditional switch statement? What special syntax rule applies to enum case labels?',
        answer: 'Yes, enums are fully supported in switch statements. The special syntax rule is that the case labels MUST be the unqualified names of the enum constants. You cannot qualify the enum constant with its class name. For example, if switching on "DayOfWeek day", you must write "case MONDAY:", NOT "case DayOfWeek.MONDAY:". Writing the qualified name causes a compile-time error.',
        followUp: 'Why did the Java language designers require unqualified enum names in case labels?',
        followUpAnswer: 'Because the compiler already knows the exact enum type from the switch selector expression. Requiring unqualified names avoids redundant verbosity and keeps case labels concise and clean.',
        keyPhrases: ['Unqualified enum constant', 'No class prefix', 'Compile-time type inference', 'Concise syntax', 'Enum switch'],
        commonMistakeAnswer: 'Writing "case MyEnum.VALUE:" and wondering why it fails to compile.'
      },
      {
        question: 'Can a switch statement be nested inside another switch statement?',
        answer: 'Yes, switch statements can be freely nested inside cases of another switch statement. Each nested switch has its own selector expression, case labels, and break boundary. A break statement inside the inner switch exits ONLY the inner switch; it does not break out of the outer switch.',
        followUp: 'How can a developer break out of both the inner and outer switch simultaneously?',
        followUpAnswer: 'By using a labeled break statement: label the outer switch (e.g. "OUTER: switch (...)"), and call "break OUTER;" from inside the inner switch.',
        keyPhrases: ['Nested switch', 'Independent break boundaries', 'Labeled break', 'OUTER label', 'Control flow escape'],
        commonMistakeAnswer: 'Thinking that a break inside an inner switch will break out of both switches.'
      },
      {
        question: 'What is the performance comparison between a large if-else ladder and a large switch statement?',
        answer: 'A large if-else ladder evaluates conditions sequentially from top to bottom, resulting in O(N) time complexity where N is the number of branches. In contrast, a switch statement on integers or strings is compiled into tableswitch or lookupswitch bytecode. A tableswitch achieves O(1) constant-time direct jump lookup regardless of how many cases exist, while a lookupswitch achieves O(log N) binary search lookup. Therefore, for 5 or more discrete constant values, a switch statement is significantly faster and more memory-friendly than an if-else ladder.',
        followUp: 'Does the JVM JIT compiler optimize if-else ladders into jump tables at runtime?',
        followUpAnswer: 'In rare cases, HotSpot JIT can optimize consecutive equals checks, but it cannot generally convert arbitrary boolean expressions into jump tables. Switch statements provide a guaranteed jump-table bytecode structure right from compile time.',
        keyPhrases: ['O(N) vs O(1) / O(log N)', 'Branch prediction overhead', 'Direct memory offset jumping', 'JIT compiler optimization', 'Instruction cache efficiency'],
        commonMistakeAnswer: 'Claiming that modern compilers optimize if-else ladders and switch statements to identical bytecode.'
      },
      {
        question: 'Why are duplicate case values forbidden in a switch statement, and how does the compiler detect them?',
        answer: 'Duplicate case values create ambiguous jump targets. If two cases had the value 5, the JVM would have no deterministic way to know which branch to execute first. The Java compiler detects duplicates at compile time because all case labels are required to be compile-time constants. The compiler evaluates each constant expression to its primitive value, stores them in a hash set or sorted array, and immediately flags any duplicate value with a "duplicate case label" error.',
        followUp: 'Can two cases have different expressions that evaluate to the same value, like "case 2 + 2:" and "case 4:"?',
        followUpAnswer: 'No, because "2 + 2" is a compile-time constant expression that evaluates to 4. The compiler simplifies it to 4 before checking for duplicates and rejects "case 2 + 2:" alongside "case 4:".',
        keyPhrases: ['Ambiguous jump target', 'Compile-time constant evaluation', 'Duplicate case label error', 'Deterministic branch dispatch', 'Constant folding'],
        commonMistakeAnswer: 'Thinking that duplicate cases are allowed as long as they have different break statements.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following primitive types CANNOT be used as a selector in a switch statement?',
        options: [
          'char',
          'byte',
          'double',
          'int'
        ],
        correctIndex: 2,
        explanation: 'Floating-point types (float and double), along with long and boolean, are strictly illegal as switch selectors.'
      },
      {
        question: 'What happens if a "break" statement is omitted at the end of a matching case in a traditional switch?',
        options: [
          'The program throws an AccidentalFallthroughException',
          'The switch immediately terminates',
          'Control falls through and executes the statements in subsequent cases',
          'The compiler rejects the code with an error'
        ],
        correctIndex: 2,
        explanation: 'In traditional switch statements, omitting a break causes execution to fall through into subsequent case blocks regardless of whether their labels match.'
      },
      {
        question: 'What is required of every case label value in a traditional switch statement?',
        options: [
          'It must be a compile-time constant expression',
          'It must be an object reference',
          'It must be a method returning a boolean',
          'It must be a variable declared in the same method'
        ],
        correctIndex: 0,
        explanation: 'Case label values must be compile-time constants (literals or final variables initialized with constant expressions).'
      },
      {
        question: 'What happens when a null String variable is evaluated in a switch statement?',
        options: [
          'Execution jumps to the default case',
          'The switch block is skipped entirely',
          'Throws a NullPointerException at runtime',
          'Matches case "":'
        ],
        correctIndex: 2,
        explanation: 'Evaluating a null selector in a switch statement immediately throws a NullPointerException because the JVM invokes methods like hashCode() on the selector.'
      },
      {
        question: 'Why does declaring "int x = 5;" in case 1 and "int x = 10;" in case 2 cause a compile error?',
        options: [
          'x cannot be an integer',
          'Variables cannot be assigned inside switch cases',
          'The entire switch block shares a single local variable scope',
          'Only constants can be declared in switch statements'
        ],
        correctIndex: 2,
        explanation: 'The entire switch body forms one single scope. Declaring x twice in that scope creates a duplicate local variable compilation error unless enclosed in {}.'
      },
      {
        question: 'Which JVM bytecode instruction is generated when switch case constants are dense and contiguous?',
        options: [
          'lookupswitch',
          'tableswitch',
          'invokevirtual',
          'goto_table'
        ],
        correctIndex: 1,
        explanation: 'The javac compiler generates tableswitch for dense integer keys, providing direct O(1) jump table indexing.'
      },
      {
        question: 'What is printed by: int x = 2; switch(x) { case 2: System.out.print("A"); case 3: System.out.print("B"); break; }?',
        options: [
          'A',
          'AB',
          'B',
          'Compilation Error'
        ],
        correctIndex: 1,
        explanation: 'Matches case 2, prints "A". With no break after case 2, it falls through to case 3, prints "B", and then breaks. Output: "AB".'
      },
      {
        question: 'Where can the "default:" label be legally positioned within a switch block?',
        options: [
          'Strictly as the very last statement before the closing brace',
          'Strictly as the very first statement before any case label',
          'Anywhere inside the switch block',
          'Only immediately after case 0'
        ],
        correctIndex: 2,
        explanation: 'Java permits default anywhere inside the switch block. If placed in the beginning or middle without a break, it falls through into subsequent cases.'
      },
      {
        question: 'What is the correct syntax for an enum case label when switching on an enum Day?',
        options: [
          'case Day.MONDAY:',
          'case MONDAY:',
          'case "MONDAY":',
          'case Day(MONDAY):'
        ],
        correctIndex: 1,
        explanation: 'Enum case labels must be unqualified constant names (e.g. "case MONDAY:"). Specifying "case Day.MONDAY:" is a compile error.'
      },
      {
        question: 'How can multiple case values be grouped together to execute the same logic in a traditional switch?',
        options: [
          'case 1 || 2 || 3:',
          'case 1..3:',
          'Stacking case labels: case 1: case 2: case 3:',
          'case [1, 2, 3]:'
        ],
        correctIndex: 2,
        explanation: 'In traditional switch statements, grouping is accomplished by stacking case labels one after another without break statements between them.'
      }
    ]
  },

  // =========================================================================
  // LESSON 4.3: Modern Switch Expressions (->)
  // =========================================================================
  'switch-expressions': {
    id: 'switch-expressions',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow',
    lessonNumber: 'Lesson 4.3',
    title: 'Modern Switch Expressions (->)',
    subtitle: 'Arrow syntax, producing values, exhaustiveness enforcement, multi-label matching, and the yield keyword',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of a modern vending machine compared to an old mechanical jukebox. In an old jukebox (traditional switch), you press a button, the needle drops, and if the mechanical stop is missing, the needle slides right through into the next record playing songs you didn\'t ask for! In a modern vending machine (switch expression with ->), you press "B4", it precisely drops that exact item into the retrieval tray, yields it to you, and closes. No sliding into other items, no missing break disasters, and it produces a tangible item directly into your hands.',
    interviewTakeaways: [
      'Switch as an Expression: In modern Java (Java 14+), switch can evaluate directly to a value: "int days = switch (month) { ... };". When used as an expression, it MUST terminate with a semicolon (;).',
      'Arrow Syntax (->) Eliminates Fall-Through: Using "case L ->" guarantees that ONLY the expression or block on the right-hand side executes. Fall-through is completely impossible.',
      'Comma-Separated Case Labels: Multiple constants can be cleanly listed in a single case line: "case 1, 2, 3 -> ...", eliminating ugly stacked case labels.',
      'Mandatory Exhaustiveness: When switch is used as an expression, it MUST cover all possible values of the selector type. If not all values are explicitly matched, a "default ->" branch is mandatory.',
      'The yield Keyword: When a case branch requires multiple statements enclosed in a block {}, the "yield" keyword is used to return the computed value from that block. "yield" exits the switch expression, whereas "return" exits the entire method.'
    ],
    cheatSheet: {
      summary: 'Modern functional switch construct producing values with arrow syntax, zero accidental fall-through, and compiler-enforced exhaustiveness.',
      syntaxTemplate: `// 1. Switch Expression assigning directly to a variable:
String result = switch (dayNumber) {
    case 1, 7   -> "Weekend";
    case 2, 3, 4, 5, 6 -> "Weekday";
    default     -> "Invalid";
}; // Semicolon required!

// 2. Multi-line block with yield:
int discount = switch (tier) {
    case "VIP" -> {
        int bonus = calculateBonus();
        yield 20 + bonus; // yields value from switch
    }
    case "REGULAR" -> 5;
    default -> 0;
};`,
      rules: [
        { rule: 'Arrow Syntax (->)', explanation: 'Using -> executes strictly the right-hand expression or block. Fall-through is impossible.' },
        { rule: 'Exhaustiveness Required', explanation: 'A switch expression producing a value must cover 100% of possible input values (via exhaustive enums or a default branch).' },
        { rule: 'Yielding from Blocks', explanation: 'If an arrow branch uses curly braces {}, it must yield a value using "yield value;".' },
        { rule: 'No Syntax Mixing', explanation: 'You cannot mix colon (:) and arrow (->) syntax within the same switch construct.' },
        { rule: 'Trailing Semicolon', explanation: 'When switch is used as an expression on the right side of assignment, the entire statement must end with a semicolon (;).' },
        { rule: 'Multi-Label Comma List', explanation: 'Comma-separated labels (case A, B, C ->) replace traditional stacked fall-through cases.' }
      ],
      quickComparison: [
        { aspect: 'Construct Nature', optionA: 'Traditional Switch: Statement only (performs side-effects)', optionB: 'Modern Switch: Both Statement and Expression (can return a value)' },
        { aspect: 'Fall-Through Mechanics', optionA: 'Traditional Switch: Falls through by default unless "break;" is present', optionB: 'Modern Switch (->): Zero fall-through; only right-hand side executes' },
        { aspect: 'Multi-Value Matching', optionA: 'Traditional Switch: Stacked labels: case 1: case 2: case 3:', optionB: 'Modern Switch: Comma-separated: case 1, 2, 3 ->' },
        { aspect: 'Exhaustiveness Check', optionA: 'Traditional Switch: Optional default; unhandled values simply do nothing', optionB: 'Modern Switch Expression: Mandatory exhaustiveness; compile error without default' },
        { aspect: 'Block Value Return', optionA: 'Traditional Switch: Cannot yield values; must mutate external variable', optionB: 'Modern Switch Expression: Uses "yield" keyword to produce value from { }' }
      ]
    },
    coreExplanation: [
      'Evolution into Expressions: Introduced as a standard feature in Java 14 (JEP 361), switch expressions elevate the switch construct from a clunky statement-only jump table into a first-class expression that computes and yields a value.',
      'Arrow Syntax (case L ->): The arrow syntax eliminates the #1 source of switch bugs: accidental fall-through. In an arrow case, only the single expression, throw statement, or braced block to the right of the arrow is executed. No break statement is needed or permitted.',
      'Multiple Comma-Separated Labels: Instead of stacking empty cases (case 1: case 2: case 3:), modern switch allows grouping multiple match values onto a single line separated by commas: "case 1, 2, 3 -> ...".',
      'Strict Compiler Exhaustiveness Enforcement: When switch is used as an expression (yielding a value), the compiler strictly guarantees exhaustiveness. Every possible value of the selector type must be handled. For primitive types or Strings, this mandates a "default ->" branch; for enums, defining cases for all constants satisfies exhaustiveness.',
      'The yield Contextual Keyword: Inside a multi-line block branch "{ ... }", the "yield" keyword supplies the value produced by the switch expression. Unlike "return", which terminates and exits the surrounding method, "yield" terminates only the switch block and returns the value to the assignment expression.',
      'Prohibition on Syntax Mixing: A switch must use either traditional colon syntax (case L:) or arrow syntax (case L ->). Mixing colons and arrows within the same switch construct causes an immediate compile-time error.',
      'Statements vs Expressions with Arrow: The arrow syntax can also be used as a standalone statement without producing a value: "switch (action) { case RUN -> System.out.println(\"Running\"); ... }". When used as a statement, exhaustiveness is not enforced.',
      'Type Inference and Poly Expressions: A switch expression is a poly expression whose type is determined by its target type or by the least upper bound (common supertype) of all its yield/expression branches.'
    ],
    diagram: `        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;      // Direct value yield
            case 4, 6, 9, 11           -> 30;      // Direct value yield
            case 2                     -> {        // Block yield
                int leapDays = isLeap ? 29 : 28;
                yield leapDays;                    // yield keyword!
            }
            default                    -> 0;       // Mandatory exhaustive default
        };
               |
               v
    +-------------------------------------------------------+
    | Evaluates Month -> Computes Exact Value -> Yields Out |
    +-------------------------------------------------------+
               |
               v (ZERO fall-through!)
        [ days assigned ]`,
    codeSnippet: {
      title: 'Coffee Pricing Calculator with Modern Switch Expression',
      code: `public class CoffeePricingSwitch {
    public static void main(String[] args) {
        String cupSize = "MEDIUM";

        // Switch used directly as an expression assigning to price
        double price = switch (cupSize) {
            case "SMALL" -> 2.50;
            case "MEDIUM" -> 3.75;
            case "LARGE", "EXTRA_LARGE" -> 4.90; // Grouped labels!
            default -> {
                System.out.println("Unknown size: " + cupSize + ", defaulting to Small");
                yield 2.50; // yield keyword used in multi-line block
            }
        }; // Semicolon required for expression assignment!

        System.out.println("Cup Size: " + cupSize);
        System.out.println("Final Price: $" + price);
    }
}`,
      lineByLineExplanation: [
        { line: 'double price = switch (cupSize) {', explanation: 'Switch acts as an expression producing a double value assigned directly to price.' },
        { line: 'case "MEDIUM" -> 3.75;', explanation: 'Matches "MEDIUM"; returns 3.75 directly without falling through to subsequent cases.' },
        { line: 'case "LARGE", "EXTRA_LARGE" -> 4.90;', explanation: 'Demonstrates comma-separated labels handling multiple values in one clean line.' },
        { line: 'default -> { ... yield 2.50; }', explanation: 'Block syntax requires the "yield" keyword to supply the computed expression value.' },
        { line: '};', explanation: 'The trailing semicolon terminates the variable assignment statement.' }
      ],
      output: `Cup Size: MEDIUM
Final Price: $3.75`
    },
    codeExamples: [
      {
        title: 'Example 1: Determining Quarter of the Year with Grouped Labels',
        description: 'Using comma-separated case labels to map months to calendar quarters cleanly.',
        code: `public class QuarterDetector {
    public static void main(String[] args) {
        int month = 8; // August

        String quarter = switch (month) {
            case 1, 2, 3 -> "Q1: First Quarter";
            case 4, 5, 6 -> "Q2: Second Quarter";
            case 7, 8, 9 -> "Q3: Third Quarter";
            case 10, 11, 12 -> "Q4: Fourth Quarter";
            default -> "Invalid Month";
        };

        System.out.println("Month " + month + " falls in " + quarter);
    }
}`,
        output: 'Month 8 falls in Q3: Third Quarter'
      },
      {
        title: 'Example 2: Multi-Line Logic with the yield Keyword',
        description: 'Calculating shipping costs with complex tax calculation inside a braced block yielding a value.',
        code: `public class ShippingCalculator {
    public static void main(String[] args) {
        String shippingZone = "REMOTE";
        double baseWeight = 4.5;

        double shippingCost = switch (shippingZone) {
            case "LOCAL" -> baseWeight * 1.20;
            case "REGIONAL" -> baseWeight * 2.50;
            case "REMOTE" -> {
                double surcharge = 15.00;
                double fuelTax = 3.50;
                System.out.println("Applying remote territory surcharges...");
                yield (baseWeight * 3.80) + surcharge + fuelTax;
            }
            default -> {
                System.out.println("Unrecognized zone; international flat rate applied");
                yield 50.00;
            }
        };

        System.out.println("Total Shipping Cost: $" + shippingCost);
    }
}`,
        output: `Applying remote territory surcharges...
Total Shipping Cost: $35.6`
      },
      {
        title: 'Example 3: Arrow Switch Used as a Statement',
        description: 'Using arrow syntax for side-effect-only statements without returning a value.',
        code: `public class ActionDispatcher {
    public static void main(String[] args) {
        String event = "LOGOUT";

        // Arrow syntax used purely as a statement (no variable assignment)
        switch (event) {
            case "LOGIN" -> System.out.println("User session started");
            case "LOGOUT" -> System.out.println("User session terminated safely");
            case "REFRESH" -> System.out.println("Token refreshed");
            default -> System.out.println("Unknown event ignored");
        }
    }
}`,
        output: 'User session terminated safely'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using "return" instead of "yield" to produce a value from a switch expression block.',
        whyItHappens: 'Thinking of the { } block inside a switch case as an independent function.',
        howToFix: 'Use "yield" to supply a value from the switch block. "return" will exit the entire enclosing main() method prematurely!'
      },
      {
        mistake: 'Forgetting the default branch in a switch expression.',
        whyItHappens: 'Traditional switch statements do not require a default branch, so beginners assume switch expressions don\'t either.',
        howToFix: 'Always include an exhaustive "default ->" branch unless switching over an enum where all constants are explicitly covered.'
      },
      {
        mistake: 'Mixing traditional colons (:) and modern arrows (->) in the same switch: case 1 -> ... case 2: ...',
        whyItHappens: 'Incomplete refactoring of legacy switch code to modern syntax.',
        howToFix: 'Stick 100% to either arrow syntax (case L ->) or colon syntax (case L:) throughout the entire switch construct.'
      },
      {
        mistake: 'Omitting the terminating semicolon at the end of the closing brace of a switch expression.',
        whyItHappens: 'Traditional switch blocks end with just "}". Since a switch expression is part of a variable assignment statement, it requires "};".',
        howToFix: 'Ensure every variable assignment using a switch expression ends with a closing brace and semicolon: "};".'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Direct Value Yielding with Multiple Labels',
        problemStatement: 'What does this program print to standard output?',
        code: `int code = 5;
String type = switch (code) {
    case 1, 3, 5 -> "ODD_PRIME";
    case 2, 4 -> "EVEN";
    default -> "OTHER";
};
System.out.print(type);`,
        options: [
          'ODD_PRIME',
          'EVEN',
          'OTHER',
          'Compilation Error: Multiple labels require stacking'
        ],
        correctOptionIndex: 0,
        hint: 'Modern switch allows comma-separated labels. code is 5; which case matches?',
        solution: 'ODD_PRIME',
        explanation: 'In Java 14+, comma-separated labels "case 1, 3, 5 ->" are fully valid. Because code is 5, it matches this case directly, yielding "ODD_PRIME" into the variable type without fall-through. Output is "ODD_PRIME".'
      },
      {
        title: 'Puzzle 2: Return vs Yield in Switch Expression Block',
        problemStatement: 'What happens when compiling the following Java snippet?',
        code: `public class TestYield {
    public static void main(String[] args) {
        int x = 2;
        int result = switch (x) {
            case 1 -> 10;
            case 2 -> {
                int bonus = 5;
                return bonus * 2;
            }
            default -> 0;
        };
        System.out.println(result);
    }
}`,
        options: [
          'Prints 10',
          'Prints 0',
          'Compilation Error: return outside of method or attempted return from switch expression',
          'Runtime Exception'
        ],
        correctOptionIndex: 2,
        hint: 'Can you use the "return" keyword to produce a value from a switch expression block?',
        solution: 'Compilation Error: return outside of method or attempted return from switch expression',
        explanation: 'In Java switch expressions, you cannot use "return" to yield a value from a block branch. The keyword "return" attempts to exit the enclosing method (main), which is illegal because main returns void. To supply a value from a switch block, the "yield" keyword must be used: "yield bonus * 2;".'
      },
      {
        title: 'Puzzle 3: Mixing Colons and Arrows Compilation Failure',
        problemStatement: 'What is the outcome of compiling this switch construct?',
        code: `int selector = 1;
switch (selector) {
    case 1 -> System.out.print("ONE ");
    case 2:
        System.out.print("TWO ");
        break;
    default -> System.out.print("DEF ");
}`,
        options: [
          'Prints ONE ',
          'Prints ONE TWO ',
          'Compilation Error: Different case kinds used in the switch',
          'Prints DEF '
        ],
        correctOptionIndex: 2,
        hint: 'Can arrow rules (->) and colon rules (:) be used together inside the same switch?',
        solution: 'Compilation Error: Different case kinds used in the switch',
        explanation: 'Java strictly prohibits mixing different case kinds within the same switch construct. A switch must exclusively use either traditional colon syntax (case L:) or arrow syntax (case L ->). Combining both produces the compile error: "different case kinds used in the switch".'
      },
      {
        title: 'Puzzle 4: Semicolon Requirement on Switch Expression',
        problemStatement: 'What error, if any, is present in this assignment?',
        code: `int category = 2;
String desc = switch (category) {
    case 1 -> "Entry Level"
    case 2 -> "Mid Level"
    default -> "Executive"
}
System.out.println(desc);`,
        options: [
          'Missing break statements after each case',
          'Missing semicolons after each arrow branch and after the closing brace of the switch expression',
          'switch cannot produce String values',
          'default cannot use arrow syntax'
        ],
        correctOptionIndex: 1,
        hint: 'Check statement termination on the individual arrow expressions and the enclosing assignment.',
        solution: 'Missing semicolons after each arrow branch and after the closing brace of the switch expression',
        explanation: 'Each branch expression in an arrow switch must end with a semicolon (e.g. "case 1 -> \"Entry Level\";"), and because the entire switch expression forms the right side of a variable declaration statement, it must end with a semicolon after the closing brace: "};".'
      },
      {
        title: 'Puzzle 5: Exhaustiveness Requirement in Switch Expressions',
        problemStatement: 'What is the compiler error in the following snippet?',
        code: `int status = 200;
String message = switch (status) {
    case 200 -> "OK";
    case 404 -> "Not Found";
    case 500 -> "Server Error";
};`,
        options: [
          'status cannot be an int in switch expressions',
          'Compilation Error: the switch expression does not cover all possible input values',
          'Comma-separated labels are missing',
          'No error; compiles and runs cleanly'
        ],
        correctOptionIndex: 1,
        hint: 'An int has over 4 billion possible values. Does this switch handle all of them?',
        solution: 'Compilation Error: the switch expression does not cover all possible input values',
        explanation: 'When switch is used as an expression (producing a value assigned to message), the Java compiler enforces exhaustiveness. Because status is an integer and not all possible integer values are matched, the compiler rejects the code with "the switch expression does not cover all possible input values". A "default ->" branch is mandatory.'
      },
      {
        title: 'Puzzle 6: Arrow Switch Execution without Break (Fall-Through Check)',
        problemStatement: 'What does this program print to standard output?',
        code: `int rating = 1;
switch (rating) {
    case 1 -> System.out.print("Bronze ");
    case 2 -> System.out.print("Silver ");
    case 3 -> System.out.print("Gold ");
    default -> System.out.print("None ");
}`,
        options: [
          'Bronze ',
          'Bronze Silver Gold None ',
          'Bronze Silver ',
          'Compilation Error: break required after each arrow'
        ],
        correctOptionIndex: 0,
        hint: 'Does the arrow syntax (->) fall through to subsequent cases?',
        solution: 'Bronze ',
        explanation: 'In modern arrow switch syntax (->), fall-through is impossible by language design. Only the statement on the right-hand side of the matching case executes. Since rating is 1, only "Bronze " is printed. It does NOT fall through to Silver, Gold, or None.'
      },
      {
        title: 'Puzzle 7: Block Scope inside Arrow Switch',
        problemStatement: 'Trace what is printed by this valid snippet:',
        code: `int token = 10;
int result = switch (token) {
    case 5 -> 50;
    case 10 -> {
        int temp = 20;
        int multiplier = 3;
        yield temp * multiplier;
    }
    default -> 0;
};
System.out.print(result);`,
        options: [
          '50',
          '60',
          '0',
          'Compilation Error: yield cannot multiply variables'
        ],
        correctOptionIndex: 1,
        hint: 'Token is 10. Trace into the block: temp = 20, multiplier = 3. What does yield compute?',
        solution: '60',
        explanation: 'token matches "case 10 ->". Inside the block, temp is 20 and multiplier is 3. The expression "yield temp * multiplier;" evaluates to 20 * 3 = 60, which is returned as the value of the switch expression and stored in result. The program prints 60.'
      },
      {
        title: 'Puzzle 8: Colon Syntax with Yield (Legacy-Style Expression)',
        problemStatement: 'What is printed by this switch expression using traditional colon syntax?',
        code: `int mode = 2;
String label = switch (mode) {
    case 1:
        yield "FIRST";
    case 2:
        yield "SECOND";
    default:
        yield "DEFAULT";
};
System.out.print(label);`,
        options: [
          'SECOND',
          'Compilation Error: Colon syntax cannot yield values',
          'FIRST',
          'DEFAULT'
        ],
        correctOptionIndex: 0,
        hint: 'Can traditional colon syntax (case L:) use the "yield" keyword to produce values in a switch expression?',
        solution: 'SECOND',
        explanation: 'Java allows switch expressions to use traditional colon syntax (case L:), provided that every branch uses "yield" instead of "break" to supply a value. Because mode is 2, it jumps to case 2 and yields "SECOND". Note that while legal, arrow syntax (->) is overwhelmingly preferred because colon syntax still suffers from accidental fall-through if yield is omitted.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What fundamental problems in traditional switch statements did JEP 361 (Switch Expressions) aim to solve?',
        answer: 'Traditional switch statements suffered from three major design flaws: (1) Default fall-through: omitting a "break" statement caused silent, error-prone fall-through into subsequent cases; (2) Statement-only limitation: traditional switches could not evaluate to a value, forcing developers to declare uninitialized mutable variables outside the switch and assign them within each branch; (3) Verbose scoping: the entire switch block shared a single local variable scope, causing variable name collisions across cases. Switch expressions solved these by introducing the arrow syntax (->) to eliminate fall-through, allowing switches to directly produce values with compiler-enforced exhaustiveness, and providing clean block-level scoping with yield.',
        followUp: 'Why is exhaustiveness enforced on switch expressions but optional for switch statements?',
        followUpAnswer: 'A switch expression produces a value that is immediately assigned to a variable, passed to a method, or returned. If unhandled input were allowed without a default branch, the variable would be left in an illegal uninitialized state at runtime. Switch statements, on the other hand, perform side-effects only, so leaving unhandled values unaddressed is syntactically permissible.',
        keyPhrases: ['JEP 361', 'Elimination of fall-through', 'Expression producing values', 'Compiler-enforced exhaustiveness', 'Preventing uninitialized states'],
        commonMistakeAnswer: 'Saying switch expressions were added only to make code shorter with lambda arrows.'
      },
      {
        question: 'Explain the difference between "yield" and "return" in Java.',
        answer: 'Both keywords produce values, but they operate at completely different execution scopes: (1) "yield" is a contextual keyword used exclusively within a switch expression to produce a value from a specific branch block and transfer control out of the switch expression to the receiving variable; (2) "return" is a method-level control keyword that immediately terminates execution of the entire enclosing method and returns a value to the method caller. Using "return" inside a switch expression will not return a value from the switch; it will prematurely exit the method.',
        followUp: 'Is "yield" a reserved keyword in Java like "class" or "int"?',
        followUpAnswer: 'No, "yield" is a "contextual keyword" (or restricted identifier). It has special meaning only inside switch expression blocks. Outside of a switch expression, you can still legally name a variable or method "yield" (e.g., "int yield = 10; Thread.yield();") without breaking backward compatibility.',
        keyPhrases: ['Switch expression scope vs method scope', 'Contextual keyword', 'Backward compatibility', 'Restricted identifier', 'Value transference'],
        commonMistakeAnswer: 'Believing that yield and return are interchangeable synonyms inside switch expressions.'
      },
      {
        question: 'Can you use modern arrow syntax (->) for a switch statement that does NOT return a value?',
        answer: 'Yes. The arrow syntax can be used for both switch expressions (which evaluate to a value) and switch statements (which perform side effects only, such as printing or mutating state). When used as a statement, each arrow branch contains a single statement, a block {}, or a throw statement. Crucially, even when used as a statement, the arrow syntax completely eliminates fall-through, making "break" statements unnecessary and illegal.',
        followUp: 'Is exhaustiveness enforced when using arrow syntax as a statement?',
        followUpAnswer: 'No. When an arrow switch is used as a statement, exhaustiveness is NOT enforced by the compiler (unless pattern matching on sealed hierarchies in Java 21+). If an input value matches no case and there is no default branch, the statement simply finishes without taking action.',
        keyPhrases: ['Arrow statement vs expression', 'Side-effect dispatch', 'No fall-through guarantee', 'Optional exhaustiveness in statements', 'Cleaner syntax without break'],
        commonMistakeAnswer: 'Assuming arrow syntax can only be used when assigning to a variable.'
      },
      {
        question: 'Why does the Java compiler reject mixing colon syntax (case L:) and arrow syntax (case L ->) in the same switch?',
        answer: 'Java strictly disallows mixing colon and arrow syntax within the same switch to prevent severe semantic ambiguity and cognitive confusion. Colon syntax implies fall-through by default unless accompanied by "break" or "yield", whereas arrow syntax guarantees zero fall-through. Mixing both in a single construct would create erratic, unpredictable control flow rules within the same block, completely undermining the safety guarantees that modern switch was designed to deliver.',
        followUp: 'Can you have a switch expression that uses ONLY colon syntax throughout?',
        followUpAnswer: 'Yes. Java allows switch expressions to use colon syntax uniformly (e.g. "case 1: yield 10; case 2: yield 20; default: yield 0;"). However, this style is discouraged because it still permits accidental fall-through if yield is omitted in a non-terminating case.',
        keyPhrases: ['Semantic ambiguity', 'Opposing fall-through models', 'Uniform case style', 'Cognitive confusion prevention', 'Defensive design'],
        commonMistakeAnswer: 'Thinking that you can freely mix colons and arrows as long as every case has a return or yield.'
      },
      {
        question: 'How does type inference work with switch expressions, especially when different branches yield different sub-types?',
        answer: 'A switch expression is a poly expression whose type can either be inferred from its target context (e.g., "String s = switch(...)") or determined by computing the Least Upper Bound (LUB) of all yielded types across all branches. If one branch yields an Integer (5) and another branch yields a Double (5.5), the resulting common supertype inferred by "var result = switch(...)" is Number & Comparable<?>. If the target type is explicitly specified (e.g. Object or Number), each branch\'s yielded value must be assignable to that target type.',
        followUp: 'What happens if one branch throws an exception instead of yielding a value?',
        followUpAnswer: 'Throwing an exception (e.g. "default -> throw new IllegalArgumentException();") is completely legal and does not participate in the type inference of the switch expression. The overall type is determined solely by the branches that actually yield values.',
        keyPhrases: ['Poly expression', 'Least Upper Bound (LUB)', 'Target type inference', 'var deduction', 'Throw branches exempted from type inference'],
        commonMistakeAnswer: 'Believing that every branch in a switch expression must yield the exact identical primitive type.'
      },
      {
        question: 'Can you use multiple comma-separated case labels with traditional colon syntax, or is it exclusive to arrow syntax?',
        answer: 'Comma-separated case labels can actually be used with BOTH traditional colon syntax (case 1, 2, 3:) and modern arrow syntax (case 1, 2, 3 ->). This enhancement was introduced as part of the overall switch modernization in Java 14. With colon syntax, comma-separated labels replace the need to stack multiple empty "case 1: case 2: case 3:" labels, although the case still requires a "break;" to prevent falling through into subsequent cases.',
        followUp: 'Why is arrow syntax still preferred over colon syntax even when comma-separated labels are supported in both?',
        followUpAnswer: 'Because arrow syntax guarantees zero fall-through by design, eliminates the need for boilerplate "break;" statements, and cleanly separates expression evaluation from statement execution.',
        keyPhrases: ['Comma-separated labels', 'Supported in both colon and arrow', 'Elimination of stacked cases', 'Boilerplate reduction', 'Zero fall-through preference'],
        commonMistakeAnswer: 'Assuming comma-separated case values can only be used with arrow syntax.'
      },
      {
        question: 'What is the syntax for throwing an exception from a branch of a switch expression?',
        answer: 'In an arrow switch expression, you can directly write a throw statement to the right of the arrow: "case INVALID -> throw new IllegalArgumentException(\"Invalid input\");". You do not need to wrap it in curly braces or use the yield keyword, because an exceptional termination bypasses value production entirely. This is commonly used in the default branch to signal unexpected or corrupted data.',
        followUp: 'Does the compiler consider a throw statement exhaustive?',
        followUpAnswer: 'Yes. The compiler recognizes that throwing an exception terminates normal control flow, satisfying the exhaustiveness requirement for that execution path without needing to yield a dummy value.',
        keyPhrases: ['Direct throw statement', 'No yield required for exceptions', 'Abrupt termination', 'Exhaustiveness satisfaction', 'Defensive default branch'],
        commonMistakeAnswer: 'Thinking you have to write "{ yield throw new Exception(); }".'
      },
      {
        question: 'Why is a trailing semicolon required after the closing brace of a switch expression, whereas traditional switch statements have no semicolon after }?',
        answer: 'In Java grammar, a traditional switch is a standalone statement (like an if statement or a while loop), and block statements end simply with a closing brace }. A switch expression, however, is an expression that yields a value. When used in a variable assignment (e.g. "int x = switch(...) { ... };"), the entire line is a variable declaration statement. In Java, all declaration and assignment statements must terminate with a semicolon. The semicolon belongs to the assignment statement, not to the switch block itself.',
        followUp: 'Can a switch expression be passed directly as an argument to a method without storing it in a variable?',
        followUpAnswer: 'Yes. Because it is an expression, it can be passed directly as a method parameter: "System.out.println(switch (day) { case 1 -> \"Mon\"; default -> \"Other\"; });". In this case, the method call\'s closing parenthesis and semicolon terminate the statement.',
        keyPhrases: ['Statement termination', 'Expression vs statement grammar', 'Variable declaration terminator', 'Inline method argument', 'Poly expression placement'],
        commonMistakeAnswer: 'Thinking the semicolon is part of the switch syntax itself rather than the enclosing assignment statement.'
      },
      {
        question: 'How do switch expressions improve code maintainability and refactoring safety compared to if-else ladders?',
        answer: 'Switch expressions improve maintainability in three decisive ways: (1) Exhaustiveness safety: when a new value is added (especially a new constant in an enum), the compiler immediately raises an error across all switch expressions that lack a branch for it, whereas an if-else ladder fails silently into an else block; (2) Immutability: switch expressions allow target variables to be declared "final", preventing unintended reassignments; (3) Readability: eliminating boilerplate "break" statements and repeated variable assignments reduces visual noise and cognitive load.',
        followUp: 'Why is declaring target variables as final so important in robust software design?',
        followUpAnswer: 'Declaring variables as final guarantees that their values remain constant after initialization. In traditional switch statements, variables had to be mutable and non-final because they were assigned inside branches after declaration. Switch expressions restore immutability.',
        keyPhrases: ['Exhaustiveness safety', 'Enum expansion detection', 'Immutability via final', 'Boilerplate elimination', 'Cognitive load reduction'],
        commonMistakeAnswer: 'Claiming that switch expressions run faster at runtime than traditional switch statements.'
      },
      {
        question: 'What is the role of pattern matching in the evolution of switch expressions in modern Java (Java 17 to Java 21)?',
        answer: 'Switch expressions laid the syntactic and semantic foundation for Pattern Matching for switch (standardized in Java 21 via JEP 441). By establishing arrow syntax, exhaustiveness checking, and expression-level value production, Java was able to safely introduce type patterns (e.g. "case Integer i -> ..."), record deconstruction patterns, guarded patterns with "when", and explicit "case null:" handling into the switch construct, transforming switch into a modern pattern-matching powerhouse comparable to Scala or Rust.',
        followUp: 'How was null handling changed with pattern matching in switch?',
        followUpAnswer: 'In traditional switch and Java 14 switch expressions, passing null threw a NullPointerException immediately. In Java 21 pattern matching switch, developers can explicitly define "case null ->" to handle null cleanly without crashing or needing a separate null-check guard outside the switch.',
        keyPhrases: ['JEP 441', 'Pattern matching for switch', 'Type patterns', 'Guarded patterns with when', 'case null handling', 'Sealed class exhaustiveness'],
        commonMistakeAnswer: 'Believing that pattern matching has been part of switch since Java 14.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which Java version introduced switch expressions with arrow syntax (->) as a permanent standard feature?',
        options: [
          'Java 8',
          'Java 11',
          'Java 14',
          'Java 17'
        ],
        correctIndex: 2,
        explanation: 'Switch expressions were standardized in Java 14 (JEP 361) after previewing in Java 12 and 13.'
      },
      {
        question: 'What happens regarding fall-through when using arrow syntax (case L ->)?',
        options: [
          'It falls through unless a break statement is explicitly written',
          'Fall-through is impossible; only the right-hand expression or block executes',
          'It falls through only into the default case',
          'It falls through if multiple case labels are present'
        ],
        correctIndex: 1,
        explanation: 'The arrow syntax (->) eliminates fall-through completely by language design. Only the right-hand side of the matching case executes.'
      },
      {
        question: 'How do you return a value from a multi-line block { } inside a switch expression?',
        options: [
          'return value;',
          'yield value;',
          'break value;',
          'output value;'
        ],
        correctIndex: 1,
        explanation: 'Inside a switch expression block, the "yield" keyword is used to supply the value produced by the block.'
      },
      {
        question: 'What error occurs if a switch expression over an integer lacks a default branch?',
        options: [
          'Throws an UnhandledValueException at runtime',
          'Compilation Error: the switch expression does not cover all possible input values',
          'Yields 0 by default',
          'No error; compiles without warning'
        ],
        correctIndex: 1,
        explanation: 'Switch expressions require exhaustiveness. Because an integer has billions of possible values, a default branch is mandatory at compile time.'
      },
      {
        question: 'How are multiple matching values grouped on a single line in modern switch syntax?',
        options: [
          'case 1 || 2 || 3 ->',
          'case 1, 2, 3 ->',
          'case [1, 2, 3] ->',
          'case 1 to 3 ->'
        ],
        correctIndex: 1,
        explanation: 'Multiple constants are separated by commas on the case label: "case 1, 2, 3 ->".'
      },
      {
        question: 'What is wrong with: switch(x) { case 1 -> System.out.print("A"); case 2: System.out.print("B"); break; }?',
        options: [
          'x cannot be evaluated',
          'Compilation Error: Cannot mix different case kinds (arrow and colon) in the same switch',
          'System.out.print cannot be used with arrow syntax',
          'default is missing'
        ],
        correctIndex: 1,
        explanation: 'Java strictly forbids mixing arrow syntax (->) and colon syntax (:) in the same switch construct.'
      },
      {
        question: 'Why is a semicolon required after the closing brace of "int val = switch(x) { ... };"?',
        options: [
          'Because all switch statements require semicolons in modern Java',
          'Because it terminates the variable assignment statement',
          'Because the compiler needs it to distinguish from a method call',
          'It is actually optional and ignored by javac'
        ],
        correctIndex: 1,
        explanation: 'The semicolon terminates the variable declaration/assignment statement (int val = ...;), of which the switch expression is the right-hand value.'
      },
      {
        question: 'Can you throw an exception directly from an arrow case: "case INVALID -> throw new Exception();"?',
        options: [
          'Yes, throw statements are directly permitted without braces or yield',
          'No, you must wrap it in { yield throw new Exception(); }',
          'No, exceptions cannot be thrown from switch expressions',
          'Yes, but only if the switch returns an Exception object'
        ],
        correctIndex: 0,
        explanation: 'Throw statements are valid right-hand operands of an arrow case and fulfill exhaustiveness by abruptly terminating control flow.'
      },
      {
        question: 'What is the keyword "yield" categorized as in Java?',
        options: [
          'A reserved keyword like "class" or "while"',
          'A contextual keyword (restricted identifier)',
          'A preprocessor directive',
          'A standard library method on java.lang.Object'
        ],
        correctIndex: 1,
        explanation: 'yield is a contextual keyword. It acts as a keyword only within switch expression blocks and remains valid as an identifier elsewhere for backward compatibility.'
      },
      {
        question: 'When an arrow switch is used as a STATEMENT (no value assigned or returned), is exhaustiveness enforced?',
        options: [
          'Yes, all statements must have a default branch',
          'No, statement switches do not require exhaustiveness',
          'Only if switching on strings',
          'Only if break statements are present'
        ],
        correctIndex: 1,
        explanation: 'When switch is used as a statement (not producing a value), exhaustiveness is not enforced; unmatched values simply do nothing.'
      }
    ]
  }
};
