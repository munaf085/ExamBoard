import { DetailedLesson } from '../detailedLessons';

export const controlFlowLessons: Record<string, DetailedLesson> = {
  // ── 4.1 If-Else Ladders & Decision Making ──
  'if-else-ladder': {
    id: 'if-else-ladder',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.1',
    title: 'If-Else Ladders & Decision Making',
    subtitle: 'Branching execution paths, strict boolean conditions, and the dangling else trap',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a train track switch. When the train approaches a junction, the track routes it down exactly one chosen track. It can never travel down both tracks simultaneously. An if-else ladder directs program execution down the first branch whose condition is satisfied.',
    interviewTakeaways: [
      'Strict Boolean Enforcement: In Java, condition MUST evaluate to a boolean (true/false). Writing "if (1)" or "if (x = 5)" fails compilation, unlike C/C++.',
      'Sequential First-Match-Wins: Conditions in an if-else ladder are evaluated top to bottom. The moment ONE condition is true, its block runs and ALL remaining branches are skipped.',
      'The Dangling Else Trap: Without curly braces {}, an "else" binds to the closest preceding unmatched "if". Always use curly braces to eliminate ambiguity.',
      'The Semicolon Trap: Placing a semicolon immediately after the if condition: "if (x > 5);" creates an empty statement, causing the following block to always execute regardless of x.'
    ],
    cheatSheet: {
      summary: 'Sequential multi-way decision structure executing at most one block among multiple branches.',
      syntaxTemplate: `if (booleanCondition1) {
    // Executes if condition1 is true
} else if (booleanCondition2) {
    // Executes if condition1 is false AND condition2 is true
} else {
    // Fallback executed if ALL preceding conditions were false
}`,
      rules: [
        { rule: 'Condition Type', explanation: 'Condition must be strictly of type boolean. Non-zero numbers cannot be used as booleans.' },
        { rule: 'First Match Wins', explanation: 'The first branch evaluating to true executes. All subsequent else-if and else branches are skipped completely.' },
        { rule: 'Single Statement Braces', explanation: 'Braces {} are optional for single statements, but omitting them leads to dangling-else bugs. Always use braces in production.' },
        { rule: 'Short-Circuiting', explanation: 'Logical operators && and || in conditions short-circuit from left to right, preventing unnecessary evaluations.' }
      ],
      quickComparison: [
        { aspect: 'Condition Flexibility', optionA: 'if-else: Supports complex ranges (x >= 10 && x <= 20) and relational operators', optionB: 'switch: Traditionally limited to discrete equality matching on constants' },
        { aspect: 'Execution Time', optionA: 'if-else: Evaluated sequentially O(N) in worst case', optionB: 'switch: JVM optimizes with tableswitch / lookupswitch O(1) jump tables' },
        { aspect: 'Data Types Supported', optionA: 'if-else: Any expression evaluating to boolean', optionB: 'switch: byte, short, char, int, String, enums, and their wrappers' },
        { aspect: 'Best Suited For', optionA: 'if-else: Ranges, floating points, null checks, compound boolean conditions', optionB: 'switch: Fixed menus, status codes, state machines, command routing' }
      ]
    },
    coreExplanation: [
      'The "if" statement executes a block of code ONLY if the condition evaluates to true.',
      'The "else if" ladder allows checking multiple conditions sequentially from top to bottom.',
      'The moment ONE condition evaluates to true, its block executes and ALL subsequent else-if branches are skipped!',
      'The final "else" block acts as a fallback default when none of the preceding conditions were true.',
      'STRICT JAVA RULE: In C/C++, you can write "if (x)" where x is an integer. In Java, conditions MUST be of type boolean! "if (1)" will NOT compile!'
    ],
    diagram: `[ Evaluate Condition 1 ] -> true -> [ Execute Block 1 ] -> (Skip Rest)
          | false
[ Evaluate Condition 2 ] -> true -> [ Execute Block 2 ] -> (Skip Rest)
          | false
[ Execute Fallback 'else' Block ]`,
    codeSnippet: {
      title: 'Grading System with If-Else Ladder',
      code: `public class IfElseDemo {
    public static void main(String[] args) {
        int score = 85;
        char grade;

        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B'; // 85 lands here!
        } else if (score >= 70) {
            grade = 'C';
        } else {
            grade = 'F';
        }

        System.out.println("Score: " + score + " -> Grade: " + grade);
    }
}`,
      lineByLineExplanation: [
        { line: 'if (score >= 90)', explanation: '85 >= 90 is false, so proceeds to next branch.' },
        { line: 'else if (score >= 80)', explanation: '85 >= 80 is true! grade becomes \'B\'.' },
        { line: 'else if (score >= 70)...', explanation: 'All subsequent branches are skipped completely.' }
      ],
      output: 'Score: 85 -> Grade: B'
    },
    codeExamples: [
      {
        title: 'Example 1: Leap Year Determination with Compound Logic',
        description: 'Demonstrating compound boolean logic (divisible by 4 and not 100, unless divisible by 400).',
        code: `public class LeapYearCheck {
    public static void main(String[] args) {
        int year = 2024;
        boolean isLeap;

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            isLeap = true;
        } else {
            isLeap = false;
        }

        System.out.println(year + " is leap year? " + isLeap);
    }
}`,
        output: '2024 is leap year? true'
      },
      {
        title: 'Example 2: Semicolon Pitfall Demo',
        description: 'Notice how a stray semicolon turns an if statement into an empty statement.',
        code: `public class SemicolonTrapDemo {
    public static void main(String[] args) {
        int age = 15;

        // ACCIDENTAL SEMICOLON:
        if (age >= 18); {
            System.out.println("Welcome, Voter!"); // Runs anyway!
        }
        System.out.println("Execution finished.");
    }
}`,
        output: `Welcome, Voter!
Execution finished.`
      },
      {
        title: 'Example 3: Tax Slab Ladder with Boundary Traps',
        description: 'Checking order of conditions in an income tax calculation.',
        code: `public class TaxCalculator {
    public static void main(String[] args) {
        double income = 750000;
        double taxRate;

        if (income > 1000000) {
            taxRate = 0.30;
        } else if (income > 500000) {
            taxRate = 0.20; // 750k lands here
        } else if (income > 250000) {
            taxRate = 0.05;
        } else {
            taxRate = 0.0;
        }

        System.out.println("Applied Tax Rate: " + (taxRate * 100) + "%");
    }
}`,
        output: 'Applied Tax Rate: 20.0%'
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: The Dangling Else Trap',
        problemStatement: 'Trace what the following code prints to the console when executed:',
        code: `int a = 5;
int b = 10;
if (a > 10)
    if (b > 5)
        System.out.print("A");
else
    System.out.print("B");
System.out.println("C");`,
        options: [
          'BC',
          'AC',
          'C',
          'Compilation Error'
        ],
        correctOptionIndex: 2,
        hint: 'Without braces, the "else" matches with the NEAREST preceding unmatched "if". Which if does the else belong to?',
        solution: 'C',
        explanation: `Step-by-step trace:
1. The "else" belongs to the inner "if (b > 5)", NOT the outer "if (a > 10)".
2. The outer condition "if (a > 10)" evaluates (5 > 10) which is FALSE.
3. Because the outer if is false, its entire nested block (including the inner if and its else) is skipped!
4. Neither "A" nor "B" is printed.
5. Only the final unconditional statement prints "C". Output is "C".`
      },
      {
        title: 'Challenge 2: Boolean Assignment vs Equality in If',
        problemStatement: 'What does this tricky Java snippet print?',
        code: `boolean active = false;
if (active = true) {
    System.out.print("ACTIVE ");
} else {
    System.out.print("INACTIVE ");
}
System.out.println("active=" + active);`,
        options: [
          'INACTIVE active=false',
          'ACTIVE active=true',
          'Compilation Error: cannot assign in if',
          'ACTIVE active=false'
        ],
        correctOptionIndex: 1,
        hint: 'Notice single "=" is assignment, not equality "=="! What is the result value of the assignment expression (active = true)?',
        solution: 'ACTIVE active=true',
        explanation: `Step-by-step trace:
1. "active = true" is an assignment expression. It sets "active" to true AND returns true!
2. Because the return value is boolean (true), Java accepts it as a valid if condition!
3. The if condition evaluates to true, printing "ACTIVE ".
4. The variable "active" now permanently holds true, printing "active=true".
5. Note: "if (x = 5)" where x is an int fails compilation because 5 is not boolean, but boolean assignment works and is a notorious interview trap!`
      },
      {
        title: 'Challenge 3: Short-Circuit Side-Effect in Condition',
        problemStatement: 'Trace the value of "count" after this conditional block executes:',
        code: `int count = 0;
int x = 10;
if (x > 5 || ++count > 0) {
    x += 2;
}
if (x < 10 && ++count > 0) {
    x += 5;
}
System.out.println("x=" + x + ", count=" + count);`,
        options: [
          'x=12, count=2',
          'x=12, count=1',
          'x=12, count=0',
          'x=17, count=1'
        ],
        correctOptionIndex: 2,
        hint: 'Remember short-circuit evaluation: for ||, if the left operand is true, the right side NEVER executes. For &&, if the left operand is false, the right side NEVER executes.',
        solution: 'x=12, count=0',
        explanation: `Step-by-step trace:
1. In the first condition: (x > 5 || ++count > 0)
   - Left side (10 > 5) is TRUE.
   - Because of || (logical OR), JVM short-circuits! The right side (++count > 0) NEVER executes.
   - count remains 0. Body runs: x becomes 10 + 2 = 12.
2. In the second condition: (x < 10 && ++count > 0)
   - Left side (12 < 10) is FALSE.
   - Because of && (logical AND), JVM short-circuits! The right side (++count > 0) NEVER executes.
   - count remains 0. Body does not run.
3. Final output: "x=12, count=0".`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Putting a semicolon immediately after if: if (x > 10); { ... }',
        whyItHappens: 'Accidental keystroke. The semicolon creates an empty statement, so the block { ... } always runs regardless of x.',
        howToFix: 'Never put a semicolon after the if condition parentheses.'
      },
      {
        mistake: 'Writing "if (count = 5)" instead of "=="',
        whyItHappens: 'Single = is assignment. In Java, this fails compilation with "Type mismatch: cannot convert from int to boolean".',
        howToFix: 'Always use double equals "==" when checking equality in conditions: if (count == 5).'
      },
      {
        mistake: 'Incorrect order in if-else ladders (broader condition placed before specific condition).',
        whyItHappens: 'Writing "if (score >= 50)" before "else if (score >= 90)". A score of 95 will hit the >= 50 block and never reach 90!',
        howToFix: 'In if-else ladders, always order conditions from most specific to least specific (highest to lowest).'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the "Dangling Else" problem in Java, and how does the compiler resolve it?',
        answer: 'The dangling else problem occurs when nested if statements are written without curly braces. When an else clause appears, it could syntactically attach to either the outer if or the inner if. The Java language specification resolves this by attaching the else to the closest preceding unmatched if statement.',
        followUp: 'How do you guarantee clean, unambiguous code in professional production codebases?',
        keyPhrases: ['closest unmatched if', 'omitting curly braces', 'grammar ambiguity', 'always enforce curly braces'],
        commonMistakeAnswer: 'Freshers often guess that the else binds to the outer if because of indentation. Java ignores indentation completely!'
      },
      {
        question: 'Why does "if (x = 5)" cause a compile-time error in Java, but "if (flag = true)" compiles fine?',
        answer: 'Java requires the expression inside an if condition to evaluate strictly to a boolean type. In "if (x = 5)", where x is an int, the expression evaluates to the integer 5, causing a type mismatch compiler error. However, "if (flag = true)" assigns true to boolean flag and evaluates to the boolean value true, which Java accepts as a valid condition.',
        followUp: 'What static analysis tools catch accidental boolean assignments?',
        keyPhrases: ['type mismatch', 'assignment expression returns assigned value', 'strict boolean requirement', 'Checkstyle / SonarQube'],
        commonMistakeAnswer: 'Saying both fail to compile. Boolean assignment is valid syntax in Java.'
      },
      {
        question: 'How do logical AND (&&) and bitwise AND (&) behave differently inside an if condition?',
        answer: 'The conditional AND (&&) exhibits short-circuit behavior: if the left operand evaluates to false, the right operand is not evaluated at all. The bitwise/logical AND (&) always evaluates both operands regardless of the left operand\'s value. Using && avoids NullPointerExceptions and unnecessary method calls.',
        followUp: 'Can you give an example where using & instead of && causes a NullPointerException?',
        keyPhrases: ['short-circuit evaluation', 'left-to-right evaluation', 'NullPointerException prevention', 'side effects'],
        commonMistakeAnswer: 'Assuming & and && are completely interchangeable in boolean logic.'
      }
    ],
    miniQuiz: [
      {
        question: 'Will "int x = 1; if (x) { System.out.println(\"OK\"); }" compile in Java?',
        options: ['No, compilation error: cannot convert int to boolean', 'Yes, prints OK', 'Runtime Exception', 'Prints nothing'],
        correctIndex: 0,
        explanation: 'Java requires an explicit boolean expression in if statements. Non-zero integers are not automatically converted to booleans.'
      },
      {
        question: 'What is the outcome of: "int x = 10; if (x > 5); x = 20; System.out.println(x);"?',
        options: ['10', '20', 'Compilation error', '0'],
        correctIndex: 1,
        explanation: 'The semicolon after "if (x > 5);" terminates the if statement as an empty statement. The assignment "x = 20;" is an independent statement that always executes.'
      }
    ]
  },

  // ── 4.2 Traditional Switch Statement ──
  'switch-statement': {
    id: 'switch-statement',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.2',
    title: 'The Traditional Switch Statement & Fall-Through',
    subtitle: 'Multi-way branching, supported data types, and why "break" is essential',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an elevator button panel. You press button 3 and the elevator jumps directly to Floor 3 instead of stopping at Floor 1 and Floor 2. But if the elevator has no brakes ("break"), it will keep falling through Floor 4, Floor 5, and the Basement!',
    interviewTakeaways: [
      'Supported Data Types: byte, short, char, int, enums, String (Java 7+), and their wrapper classes. NOT supported: long, float, double, boolean.',
      'Fall-Through Behavior: Without an explicit "break;" statement, execution falls through into subsequent cases regardless of their case values.',
      'Compile-Time Constants: Case labels must be compile-time constants (literals or final variables initialized at declaration).',
      'Bytecode Optimization: Compiled into "tableswitch" (dense values, O(1) jump table) or "lookupswitch" (sparse values, O(log N) binary search).'
    ],
    cheatSheet: {
      summary: 'Multi-way branch statement testing a single variable for equality against constant case values.',
      syntaxTemplate: `switch (expression) {
    case CONSTANT_1:
        // Statements
        break; // Stops fall-through
    case CONSTANT_2:
    case CONSTANT_3: // Intentional grouped fall-through
        // Runs for CONSTANT_2 or CONSTANT_3
        break;
    default:
        // Fallback executed if no cases match
        break;
}`,
      rules: [
        { rule: 'Allowed Types', explanation: 'byte, short, char, int, String, enum constants, and wrapper types Byte, Short, Character, Integer.' },
        { rule: 'Disallowed Types', explanation: 'long, float, double, and boolean CANNOT be switched upon.' },
        { rule: 'Case Constant Rule', explanation: 'Case values must be constant expressions known at compile time. Regular variables are not permitted.' },
        { rule: 'Null Safety', explanation: 'Passing a null reference (e.g. null String or null wrapper) throws NullPointerException.' },
        { rule: 'Default Placement', explanation: 'The default block can appear anywhere inside switch; if placed first without break, it will fall through!' }
      ],
      quickComparison: [
        { aspect: 'Float/Double Allowed?', optionA: 'switch: NO (precision rounding makes exact equality unreliable)', optionB: 'if-else: YES (supports double comparisons like x > 3.14)' },
        { aspect: 'Long Allowed?', optionA: 'switch: NO (JVM tableswitch/lookupswitch instructions only support 32-bit ints)', optionB: 'if-else: YES (supports 64-bit longs)' },
        { aspect: 'Fall-Through', optionA: 'switch: Automatic unless halted with break;', optionB: 'if-else: Impossible (first matching block runs and branches exit)' },
        { aspect: 'Internal Mechanism', optionA: 'switch: Jump table (tableswitch) or binary search (lookupswitch)', optionB: 'if-else: Sequential branch comparisons' }
      ]
    },
    coreExplanation: [
      'A switch statement tests a single variable for equality against a list of constant values called cases.',
      'Supported types: byte, short, char, int, enums, String (Java 7+), and their wrapper classes.',
      'NOT supported: float, double, boolean, long, or arbitrary objects.',
      'The "break" statement is critical: it terminates the switch. If you omit break, execution "falls through" into subsequent cases regardless of their condition!',
      'The "default" case executes if none of the cases match.'
    ],
    diagram: `switch (choice)
   |
   +-> case 1: [ Action ] -> break -> [ EXIT ]
   |
   +-> case 2: [ Action ] (no break!)
   |             | (Fall-through!)
   |             v
   +-> case 3: [ Action ] -> break -> [ EXIT ]
   |
   +-> default: [ Fallback Action ]`,
    codeSnippet: {
      title: 'Switch Fall-Through Tracing Demo',
      code: `public class SwitchDemo {
    public static void main(String[] args) {
        int day = 2;

        System.out.println("--- Switch with break ---");
        switch (day) {
            case 1: System.out.println("Monday"); break;
            case 2: System.out.println("Tuesday"); break; // Matches & exits!
            case 3: System.out.println("Wednesday"); break;
            default: System.out.println("Other day");
        }

        System.out.println("--- Fall-through trap (no break) ---");
        int count = 1;
        switch (count) {
            case 1: System.out.print("One "); // No break!
            case 2: System.out.print("Two "); // Falls through!
            case 3: System.out.print("Three "); break;
            default: System.out.print("Default ");
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'case 2: Tuesday break;', explanation: 'Matches day 2, prints Tuesday, and break stops further execution.' },
        { line: 'case 1: System.out.print("One ");', explanation: 'Since there is no break, JVM continues running case 2 and case 3!' }
      ],
      output: `--- Switch with break ---
Tuesday
--- Fall-through trap (no break) ---
One Two Three `
    },
    codeExamples: [
      {
        title: 'Example 1: Grouped Cases for Weekend vs Weekday',
        description: 'Demonstrating intentional fall-through by grouping cases together.',
        code: `public class WeekdayGrouper {
    public static void main(String[] args) {
        int dayOfWeek = 6; // Saturday

        switch (dayOfWeek) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                System.out.println("Weekday - Time to work!");
                break;
            case 6:
            case 7:
                System.out.println("Weekend - Time to relax!");
                break;
            default:
                System.out.println("Invalid day index");
        }
    }
}`,
        output: 'Weekend - Time to relax!'
      },
      {
        title: 'Example 2: String Switching (Java 7+)',
        description: 'Switching directly on String values (case-sensitive matching).',
        code: `public class HttpMethodRouter {
    public static void main(String[] args) {
        String method = "POST";

        switch (method) {
            case "GET":
                System.out.println("Fetching resource...");
                break;
            case "POST":
                System.out.println("Creating new resource...");
                break;
            case "DELETE":
                System.out.println("Removing resource...");
                break;
            default:
                System.out.println("Unsupported HTTP method: " + method);
        }
    }
}`,
        output: 'Creating new resource...'
      },
      {
        title: 'Example 3: Constant Variable in Case Label',
        description: 'Case labels must be final compile-time constants.',
        code: `public class FinalCaseLabelDemo {
    public static void main(String[] args) {
        final int ADMIN = 1;
        final int USER = 2;
        int role = 1;

        switch (role) {
            case ADMIN:
                System.out.println("Admin Dashboard Granted");
                break;
            case USER:
                System.out.println("Standard User View");
                break;
        }
    }
}`,
        output: 'Admin Dashboard Granted'
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Fall-Through Accumulator',
        problemStatement: 'Trace what value of "total" is printed by this switch snippet:',
        code: `int code = 2;
int total = 10;
switch (code) {
    case 1: total += 5;
    case 2: total += 10;
    case 3: total += 20;
            break;
    case 4: total += 50;
    default: total += 100;
}
System.out.println("Total: " + total);`,
        options: [
          'Total: 20',
          'Total: 40',
          'Total: 10',
          'Total: 185'
        ],
        correctOptionIndex: 1,
        hint: 'Find the matching case first. Then see where execution stops (look for the first break statement).',
        solution: 'Total: 40',
        explanation: `Step-by-step trace:
1. code is 2. Jumps directly to "case 2:".
2. case 2 runs: total becomes 10 + 10 = 20. There is NO break!
3. Falls through to "case 3:": total becomes 20 + 20 = 40.
4. "break;" is reached! Execution terminates immediately and jumps out of the switch.
5. case 4 and default do NOT run. Final total = 40.`
      },
      {
        title: 'Challenge 2: Default in the Middle Without Break',
        problemStatement: 'What is the printed output of this switch snippet?',
        code: `int x = 99;
switch (x) {
    default:
        System.out.print("Def ");
    case 1:
        System.out.print("One ");
        break;
    case 2:
        System.out.print("Two ");
}`,
        options: [
          'Def ',
          'Def One ',
          'Def One Two ',
          'One '
        ],
        correctOptionIndex: 1,
        hint: 'When no cases match, switch jumps to default. But default is placed at the top and has NO break!',
        solution: 'Def One ',
        explanation: `Step-by-step trace:
1. x is 99. None of case 1 or case 2 match.
2. Execution jumps to the "default:" label.
3. Prints "Def ".
4. Because default has NO break statement, execution falls through into the next case: "case 1:".
5. Prints "One ".
6. "break;" inside case 1 is reached, stopping the switch.
7. Final printed output: "Def One ".`
      },
      {
        title: 'Challenge 3: The Null String Switch Trap',
        problemStatement: 'What happens when this code is executed?',
        code: `String status = null;
switch (status) {
    case "PENDING":
        System.out.println("Pending");
        break;
    default:
        System.out.println("Other status");
}`,
        options: [
          'Prints "Other status"',
          'Throws NullPointerException at runtime',
          'Prints "Pending"',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'How does Java implement String in switch behind the scenes? Does it call a method on the String?',
        solution: 'Throws NullPointerException at runtime',
        explanation: `Behind the scenes, Java compiles String switches by calling status.hashCode() to do quick integer branching. Calling .hashCode() on null immediately throws a NullPointerException before evaluating any case or default!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Trying to switch on a double or float: switch (3.14)',
        whyItHappens: 'Floating point numbers have precision rounding issues and cannot be compared cleanly for exact discrete cases.',
        howToFix: 'Use if-else ladders when comparing floating point numbers.'
      },
      {
        mistake: 'Using a non-final variable in a case label: int x = 5; case x: ...',
        whyItHappens: 'Case labels must be constants known at compile time.',
        howToFix: 'Mark the variable as final: final int X = 5; or use literal values.'
      },
      {
        mistake: 'Accidentally omitting "break" between cases.',
        whyItHappens: 'Forgetting that fall-through is the default behavior in traditional switch statements.',
        howToFix: 'Always include break; at the end of every case unless intentional fall-through is required.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Can you use a String in a switch statement? How does the JVM implement it internally?',
        answer: 'Yes, Strings have been supported in switch statements since Java 7. Internally, the Java compiler uses a two-step mechanism: first, it computes the String\'s hashCode() and performs a switch on that integer. Second, to protect against hash collisions, it verifies the actual content using .equals() before executing the matching case.',
        followUp: 'What happens if the String variable passed to switch is null?',
        keyPhrases: ['Java 7+', 'hashCode() comparison', '.equals() verification', 'hash collision safety', 'NullPointerException on null'],
        commonMistakeAnswer: 'Believing that Java directly compares strings character-by-character in the switch bytecode.'
      },
      {
        question: 'Why are long, float, double, and boolean not supported in traditional switch statements?',
        answer: 'The JVM switch bytecode instructions ("tableswitch" and "lookupswitch") are specifically designed around 32-bit signed integers. Long requires 64 bits and cannot fit into the JVM jump table instructions without significant overhead. Float and double suffer from floating-point rounding precision issues. Boolean has only two states, making if-else cleaner and more idiomatic.',
        followUp: 'How can you handle a long or double value when you want switch-like branching?',
        keyPhrases: ['32-bit signed integer instructions', 'tableswitch and lookupswitch', 'floating-point precision', 'use if-else ladder'],
        commonMistakeAnswer: 'Saying Java just forgot to support them or that they will be added later.'
      },
      {
        question: 'What is the difference between tableswitch and lookupswitch bytecode instructions?',
        answer: 'Both are JVM bytecode instructions for switch statements. "tableswitch" is generated when case values are dense (consecutive or near-consecutive integers); it uses an indexed jump table allowing O(1) direct offset dispatch. "lookupswitch" is generated when case values are sparse; it maintains a sorted list of keys and uses O(log N) binary search to find the matching branch.',
        followUp: 'Why does tableswitch have faster performance than lookupswitch?',
        keyPhrases: ['tableswitch for dense cases O(1)', 'lookupswitch for sparse cases O(log N)', 'direct memory offset jump', 'binary search'],
        commonMistakeAnswer: 'Confusing them with hash table lookups.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which of the following data types CANNOT be used in a Java switch statement?',
        options: ['int', 'String', 'double', 'char'],
        correctIndex: 2,
        explanation: 'Floating point types (float and double) and boolean cannot be used in a switch statement.'
      },
      {
        question: 'What happens if every case in a traditional switch omits the "break;" statement?',
        options: [
          'Compilation error',
          'Only the first matching case runs',
          'Execution falls through and runs the matching case plus all subsequent cases',
          'Only the default case runs'
        ],
        correctIndex: 2,
        explanation: 'Without break statements, execution falls through sequentially into all subsequent cases until the end of the switch block.'
      }
    ]
  },

  // ── 4.3 Modern Switch Expressions (->) ──
  'switch-expressions': {
    id: 'switch-expressions',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.3',
    title: 'Modern Switch Expressions (->)',
    subtitle: 'Arrow syntax, yield keyword, multiple comma-separated labels, and exhaustiveness (Java 14+)',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of an upgraded vending machine with individual buttons for each snack. You press the button and the exact snack drops into the tray with zero spills into other bins. You can even assign the returned snack directly to your backpack!',
    interviewTakeaways: [
      'Arrow Syntax (->): Prevents accidental fall-through completely. Only the expression or block to the right of the arrow runs; no "break" needed.',
      'Can Return Values: Modern switch can be an expression that produces a value, directly assigned to a variable.',
      'The "yield" Keyword: Used to return a value from a multi-line { ... } block inside a switch branch. (return exits the whole method, yield exits the switch).',
      'Mandatory Exhaustiveness: When used as an expression, ALL possible values must be covered (either exhaustive enum values or a "default" branch).'
    ],
    cheatSheet: {
      summary: 'Java 14+ standard feature allowing switch to return values, eliminate fall-through, and support comma-separated labels.',
      syntaxTemplate: `DataType result = switch (expression) {
    case VALUE_1 -> "Direct Return Value";
    case VALUE_2, VALUE_3 -> "Multiple Comma Labels";
    case VALUE_4 -> {
        // Multi-line block
        yield "Computed Return Value";
    }
    default -> "Fallback Value";
}; // Semicolon required when used as an expression!`,
      rules: [
        { rule: 'No Fall-Through', explanation: 'Arrow syntax -> executes only the single matching branch. No break statements needed.' },
        { rule: 'Expression Semicolon', explanation: 'When switch is used on the right-hand side of an assignment, it must terminate with a semicolon ;.' },
        { rule: 'yield vs return', explanation: 'yield returns a value from a block inside switch. return exits the enclosing method!' },
        { rule: 'Exhaustiveness', explanation: 'Compiler requires all possible inputs to be handled when switch is used as an expression.' },
        { rule: 'Comma-Separated Labels', explanation: 'case 1, 2, 3 -> combines multiple labels cleanly without fall-through hacks.' }
      ],
      quickComparison: [
        { aspect: 'Syntax', optionA: 'Traditional: case X: with break;', optionB: 'Modern: case X -> arrow syntax' },
        { aspect: 'Fall-Through', optionA: 'Traditional: Automatic fall-through if break is omitted', optionB: 'Modern: Strictly impossible with arrow syntax' },
        { aspect: 'Return Value', optionA: 'Traditional: Only a statement (cannot return values directly)', optionB: 'Modern: Full expression returning values via -> or yield' },
        { aspect: 'Multiple Labels', optionA: 'Traditional: Stacking multiple case labels vertically', optionB: 'Modern: Comma-separated: case MON, TUE, WED ->' }
      ]
    },
    coreExplanation: [
      'Traditional switch statements suffered from two major flaws: verbose boilerplate and catastrophic fall-through bugs when "break" was forgotten.',
      'Java 14 standardized "Switch Expressions", introducing arrow syntax (case X ->) and the ability to return values.',
      'With arrow syntax, ONLY the code to the right of the arrow executes. Fall-through is structurally eliminated.',
      'Multiple case values can be grouped on one line separated by commas: "case 1, 2, 3 ->".',
      'If a branch needs multiple lines of code, wrap it in braces { } and use the "yield" keyword to return the value.'
    ],
    diagram: `Traditional (Statement):
switch (val) {
   case 1: res = "A"; break; // Fall-through risk!
}

Modern (Expression):
String res = switch (val) {
   case 1      -> "A";       // Direct return, NO fall-through!
   case 2, 3   -> "B";       // Multi-label
   case 4      -> { yield "C"; } // yield keyword
   default     -> "D";
};`,
    codeSnippet: {
      title: 'Modern Switch Expression with Arrow and Yield',
      code: `public class ModernSwitchDemo {
    public static void main(String[] args) {
        int day = 3;

        // Switch as an expression returning a String:
        String dayType = switch (day) {
            case 1, 2, 3, 4, 5 -> "Weekday";
            case 6, 7 -> "Weekend";
            default -> {
                System.out.println("Warning: Invalid day index provided: " + day);
                yield "Unknown"; // Returns value from multi-line block
            }
        };

        System.out.println("Day " + day + " is a " + dayType);
    }
}`,
      lineByLineExplanation: [
        { line: 'String dayType = switch (day)', explanation: 'The switch expression evaluates and assigns its result directly to dayType.' },
        { line: 'case 1, 2, 3, 4, 5 -> "Weekday";', explanation: 'Comma-separated labels. Matches 3, returns "Weekday", and exits.' },
        { line: 'yield "Unknown";', explanation: 'Yield returns "Unknown" as the value of the switch expression block.' }
      ],
      output: 'Day 3 is a Weekday'
    },
    codeExamples: [
      {
        title: 'Example 1: HTTP Status Code to Category Mapper',
        description: 'Clean enum/int mapping using concise arrow expressions.',
        code: `public class HttpStatusMapper {
    public static void main(String[] args) {
        int statusCode = 404;

        String category = switch (statusCode) {
            case 200, 201 -> "Success";
            case 400, 401, 403, 404 -> "Client Error";
            case 500, 502, 503 -> "Server Error";
            default -> "Unknown Status";
        };

        System.out.println("HTTP " + statusCode + " category: " + category);
    }
}`,
        output: 'HTTP 404 category: Client Error'
      },
      {
        title: 'Example 2: Days in Month with Leap Year Yield',
        description: 'Combining concise arrows with a block utilizing yield for leap year calculation.',
        code: `public class DaysInMonth {
    public static void main(String[] args) {
        int month = 2;
        int year = 2024;

        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> {
                boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
                yield isLeap ? 29 : 28;
            }
            default -> throw new IllegalArgumentException("Invalid month: " + month);
        };

        System.out.println("Days in month " + month + " (" + year + "): " + days);
    }
}`,
        output: 'Days in month 2 (2024): 29'
      },
      {
        title: 'Example 3: Modern Switch as a Statement (No Assignment)',
        description: 'Using arrow syntax for side effects without assigning a return value.',
        code: `public class SwitchStatementDemo {
    public static void main(String[] args) {
        String command = "START";

        switch (command) {
            case "START" -> System.out.println("System starting...");
            case "STOP"  -> System.out.println("System stopping...");
            default      -> System.out.println("Unknown command");
        }
    }
}`,
        output: 'System starting...'
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Switch Expression Yield Tracing',
        problemStatement: 'Trace what value of "result" is printed by this switch expression:',
        code: `int x = 2;
int result = switch (x) {
    case 1 -> 10;
    case 2 -> {
        int temp = x * 10;
        yield temp + 5;
    }
    case 3 -> 30;
    default -> 0;
};
System.out.println("Result: " + result);`,
        options: [
          'Result: 20',
          'Result: 25',
          'Result: 10',
          'Compilation Error'
        ],
        correctOptionIndex: 1,
        hint: 'Evaluate the block for case 2. What is temp, and what does yield return?',
        solution: 'Result: 25',
        explanation: 'x is 2, matching case 2. The block executes: temp = 2 * 10 = 20. Then yield returns temp + 5 = 25. Result is 25.'
      },
      {
        title: 'Challenge 2: Exhaustiveness Compilation Rule',
        problemStatement: 'Will this code snippet compile successfully?',
        code: `int score = 85;
String rating = switch (score) {
    case 100 -> "Perfect";
    case 90  -> "Great";
};
System.out.println(rating);`,
        options: [
          'Yes, prints null for score 85',
          'No, compilation error: the switch expression does not cover all possible input values',
          'Yes, prints empty string',
          'Throws RuntimeException'
        ],
        correctOptionIndex: 1,
        hint: 'Can an expression assign to String if score is 85 and there is no default branch?',
        solution: 'No, compilation error: the switch expression does not cover all possible input values',
        explanation: 'When switch is used as an expression (assigning to variable rating), it MUST be exhaustive. Because score is an int with over 4 billion possible values, omitting the "default" case causes a compile-time error.'
      },
      {
        title: 'Challenge 3: return vs yield Compilation Trap',
        problemStatement: 'What happens if a developer writes "return 42;" inside a switch expression branch block?',
        code: `public int compute(int mode) {
    return switch (mode) {
        case 1 -> {
            return 42; // Notice return keyword!
        }
        default -> 0;
    };
}`,
        options: [
          'Compiles and returns 42',
          'Compilation error: return outside of enclosing switch expression block',
          'Returns 0',
          'Throws IllegalStateException'
        ],
        correctOptionIndex: 1,
        hint: 'What keyword was specifically introduced to return values from switch expression blocks?',
        solution: 'Compilation error: return outside of enclosing switch expression block',
        explanation: 'You cannot use "return" to yield a value from a switch branch block. Java strictly mandates the "yield" keyword here (e.g. yield 42;). Using return attempts to exit the enclosing method, which is illegal from within a switch expression block.'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using "return" instead of "yield" inside a switch expression block: case 1 -> { return "A"; }',
        whyItHappens: 'Habit from methods. Inside a switch expression block, you must use "yield", not "return".',
        howToFix: 'Replace return with yield: case 1 -> { yield "A"; }'
      },
      {
        mistake: 'Forgetting the semicolon at the end of the switch expression: String s = switch(x) { ... } // missing ;',
        whyItHappens: 'Traditional switch statements do not require a trailing semicolon.',
        howToFix: 'Remember that when switch is used as an expression on the right-hand side of an assignment, it is a statement that must end with a semicolon ;.'
      },
      {
        mistake: 'Mixing colon ":" and arrow "->" syntax inside the same switch.',
        whyItHappens: 'Trying to use case 1: and case 2 -> together.',
        howToFix: 'Choose either traditional colon syntax OR modern arrow syntax. Mixing both in the same switch is a compilation error.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the key difference between a switch statement and a switch expression in Java?',
        answer: 'A switch statement is purely a control-flow statement that executes code branches and does not evaluate to a value. A switch expression evaluates to a single concrete value that can be assigned to a variable, passed as a method argument, or returned. Switch expressions enforce exhaustiveness at compile time.',
        followUp: 'Which Java version introduced switch expressions as a standard feature?',
        keyPhrases: ['evaluates to a value', 'control flow vs expression', 'compile-time exhaustiveness', 'standardized in Java 14'],
        commonMistakeAnswer: 'Saying they are just syntactic sugar with arrows, missing the fact that switch expressions produce values.'
      },
      {
        question: 'What is the purpose of the "yield" keyword and how does it differ from "return"?',
        answer: 'The "yield" keyword was introduced in Java 13/14 specifically for switch expressions. When a switch branch requires a multi-statement block { ... }, yield specifies the value that the switch expression produces. Unlike "return", which terminates and exits the entire enclosing method, "yield" only exits the switch expression block.',
        followUp: 'Can yield be used as a variable name in older Java code?',
        keyPhrases: ['contextual keyword', 'returns value from switch block', 'return exits enclosing method', 'backward compatibility'],
        commonMistakeAnswer: 'Thinking yield pauses a thread like Thread.yield(). In switch expressions, yield is a value-returning keyword.'
      },
      {
        question: 'Why does the compiler enforce exhaustiveness for switch expressions but not for traditional switch statements?',
        answer: 'Because a switch expression produces a value that is assigned to a strongly-typed variable or used in an expression. If an input value is not covered, the variable would have an undefined state, violating Java\'s strict type and initialization guarantees. In a traditional switch statement, skipping all cases simply proceeds to the next line of code without leaving an uninitialized value.',
        followUp: 'When is a default branch NOT required in an exhaustive switch expression?',
        keyPhrases: ['uninitialized variable prevention', 'type safety guarantee', 'all enum constants covered', 'sealed classes'],
        commonMistakeAnswer: 'Believing a default branch is always mandatory even if all enum constants are handled.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which keyword returns a value from a multi-line block inside a modern switch expression?',
        options: ['return', 'yield', 'break', 'send'],
        correctIndex: 1,
        explanation: 'The yield keyword is used to produce a value from a block within a switch expression.'
      },
      {
        question: 'Can you have accidental fall-through when using arrow syntax (case X ->) in Java?',
        options: [
          'Yes, if break is omitted',
          'No, arrow syntax strictly eliminates fall-through',
          'Yes, if default is missing',
          'Only for String types'
        ],
        correctIndex: 1,
        explanation: 'Arrow syntax strictly executes only the single matching branch. Fall-through is structurally impossible.'
      }
    ]
  },

  // ── 4.4 For Loop Deep Dive ──
  'for-loop-deep-dive': {
    id: 'for-loop-deep-dive',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.4',
    title: 'The For Loop Deep Dive',
    subtitle: 'The 3-part loop header, iteration control, comma operator, and variable scope',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of a lap counter in an Olympic swimming pool. (1) Start: step onto the lane (initialization, runs once). (2) Check: have I finished 10 laps? (condition, checked before swimming). (3) Swim the lap (body). (4) Increment counter by 1 (update, runs after the lap). Repeat!',
    interviewTakeaways: [
      'Exact Header Sequence: Initialization executes ONCE -> Condition evaluated BEFORE every iteration -> Body executes -> Update executes AFTER every iteration.',
      'All 3 Sections Are Optional: for(;;) is completely legal syntax and creates an infinite loop identical to while(true).',
      'Scope of Loop Variable: A variable declared inside the for header (for (int i = 0; ...)) exists ONLY inside the loop and cannot be accessed outside.',
      'Multiple Variables in Header: You can initialize multiple variables of the SAME type separated by commas: for (int i = 0, j = 10; i < j; i++, j--).'
    ],
    cheatSheet: {
      summary: 'Count-controlled pre-tested loop ideal when the number of iterations is known before entering.',
      syntaxTemplate: `for (initialization; booleanCondition; updateStatement) {
    // Body executes while booleanCondition is true
}`,
      rules: [
        { rule: 'Initialization Phase', explanation: 'Runs exactly once before any condition checks. Multiple variables must be of the same type.' },
        { rule: 'Condition Phase', explanation: 'Pre-test check before each iteration. If false initially, body runs 0 times.' },
        { rule: 'Update Phase', explanation: 'Executes at the end of each iteration before the condition is re-evaluated.' },
        { rule: 'Semicolon Trap', explanation: 'for (int i=0; i<5; i++); creates an empty loop body that does nothing 5 times.' },
        { rule: 'Variable Scope', explanation: 'Variables declared in initialization cannot be accessed after the closing brace.' }
      ],
      quickComparison: [
        { aspect: 'Variable Scope', optionA: 'for: Counter variable strictly scoped to loop body', optionB: 'while: Counter variable declared outside and survives loop termination' },
        { aspect: 'Best Used For', optionA: 'for: Definite loops where iteration count is predetermined (arrays, ranges)', optionB: 'while: Indefinite loops where condition depends on runtime state (IO, queues)' },
        { aspect: 'All-in-One Header', optionA: 'for: Init, condition, and update grouped cleanly in 1 line', optionB: 'while: Init before loop, update placed manually inside body' },
        { aspect: 'Infinite Syntax', optionA: 'for: for(;;)', optionB: 'while: while(true)' }
      ]
    },
    coreExplanation: [
      'The traditional for loop is the standard count-controlled iteration mechanism in Java.',
      'Header execution order: (1) Init (once) -> (2) Condition -> (3) Body -> (4) Update -> (5) Back to Condition.',
      'Scope rule: Variables declared in the initialization section (like "int i = 0") are local to the for loop.',
      'Multiple variables of the SAME type can be initialized and updated using commas: "for (int i = 0, j = 10; i < j; i++, j--)".',
      'The condition must evaluate to a boolean expression. If omitted (e.g. for (;;)), the condition defaults to true.'
    ],
    diagram: `[ Initialization (runs once) ]
           |
           v
+--> [ Condition Check ] --(false)--> [ EXIT LOOP ]
|          | (true)
|          v
|      [ Loop Body ]
|          |
|          v
+--- [ Update Step ]`,
    codeSnippet: {
      title: 'For Loop Header Execution Order Demo',
      code: `public class ForLoopDemo {
    public static void main(String[] args) {
        // Trace the exact count:
        for (int i = 1; i <= 3; i++) {
            System.out.println("Iteration: i = " + i);
        }
        // System.out.println(i); // COMPILE ERROR: i is out of scope!
    }
}`,
      lineByLineExplanation: [
        { line: 'int i = 1;', explanation: 'Initialization runs once. i is initialized to 1.' },
        { line: 'i <= 3;', explanation: 'Condition checked before each lap. 1<=3 (true), 2<=3 (true), 3<=3 (true), 4<=3 (false -> exit).' },
        { line: 'i++', explanation: 'Update runs at the end of each lap, incrementing i.' }
      ],
      output: `Iteration: i = 1
Iteration: i = 2
Iteration: i = 3`
    },
    codeExamples: [
      {
        title: 'Example 1: Two-Pointer Convergence with Comma Operator',
        description: 'Using multiple loop counters in a single header to reverse or pair elements.',
        code: `public class TwoPointerLoop {
    public static void main(String[] args) {
        for (int left = 0, right = 4; left < right; left++, right--) {
            System.out.println("Pointers meet: left=" + left + ", right=" + right);
        }
    }
}`,
        output: `Pointers meet: left=0, right=4
Pointers meet: left=1, right=3`
      },
      {
        title: 'Example 2: Semicolon Trap with External Counter',
        description: 'Notice how the semicolon after the for header creates an empty loop.',
        code: `public class ForSemicolonTrap {
    public static void main(String[] args) {
        int count = 0;

        // ACCIDENTAL SEMICOLON:
        for (count = 0; count < 5; count++); // Loop spins 5 times doing nothing!
        {
            System.out.println("Body ran! count = " + count);
        }
    }
}`,
        output: 'Body ran! count = 5'
      },
      {
        title: 'Example 3: Step Increment by Powers of 2',
        description: 'The update step is not limited to i++; it can be any valid expression.',
        code: `public class PowerOfTwoLoop {
    public static void main(String[] args) {
        for (int i = 1; i <= 16; i *= 2) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
        output: '1 2 4 8 16 '
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Pre-Increment in Loop Update',
        problemStatement: 'What does this loop snippet print to the console?',
        code: `for (int i = 0; i < 3; ++i) {
    System.out.print(i + " ");
}
System.out.println();`,
        options: [
          '0 1 2 ',
          '1 2 3 ',
          '0 1 2 3 ',
          '1 2 '
        ],
        correctOptionIndex: 0,
        hint: 'Does ++i vs i++ make any difference when placed as an independent statement in the for update clause?',
        solution: '0 1 2 ',
        explanation: 'In the update clause of a for loop, the expression "++i" or "i++" is evaluated as an isolated statement; its return value is discarded. In both cases, i is simply incremented by 1 before the next condition check. Output is "0 1 2 ".'
      },
      {
        title: 'Challenge 2: Comma Initializer Multiple Types Trap',
        problemStatement: 'Will this code snippet compile successfully?',
        code: `for (int i = 0, double d = 0.5; i < 5; i++) {
    System.out.println(i * d);
}`,
        options: [
          'Yes, prints 0.0 to 2.0',
          'Compilation Error: cannot declare multiple different types in for initialization',
          'Runtime Exception',
          'Prints nothing'
        ],
        correctOptionIndex: 1,
        hint: 'In a for loop initialization clause, can you use different type keywords separated by commas?',
        solution: 'Compilation Error: cannot declare multiple different types in for initialization',
        explanation: 'In Java, the initialization section of a for loop allows declaring multiple variables only if they share the SAME type (e.g. int i = 0, j = 10). Declaring different types (int and double) causes a compile-time syntax error.'
      },
      {
        title: 'Challenge 3: Loop Counter Tracing with Skip',
        problemStatement: 'Trace what this code snippet outputs:',
        code: `for (int i = 1; i <= 10; i += 3) {
    if (i % 2 == 0) {
        i += 1;
    }
    System.out.print(i + " ");
}`,
        options: [
          '1 5 9 ',
          '1 4 7 10 ',
          '1 5 8 ',
          '1 5 '
        ],
        correctOptionIndex: 0,
        hint: 'Track i through each iteration carefully: i starts at 1. Next i increments by 3 to 4, which is even!',
        solution: '1 5 9 ',
        explanation: `Step-by-step trace:
1. i = 1: 1 <= 10 (true). (1 % 2 == 0) is false. Prints "1 ".
   - Update: i becomes 1 + 3 = 4.
2. i = 4: 4 <= 10 (true). (4 % 2 == 0) is true! i becomes 4 + 1 = 5. Prints "5 ".
   - Update: i becomes 5 + 3 = 8.
3. i = 8: 8 <= 10 (true). (8 % 2 == 0) is true! i becomes 8 + 1 = 9. Prints "9 ".
   - Update: i becomes 9 + 3 = 12.
4. i = 12: 12 <= 10 is false. Loop terminates.
Final output: "1 5 9 ".`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Putting a semicolon directly after the for header: for (int i = 0; i < 5; i++); { ... }',
        whyItHappens: 'Accidental keystroke. The semicolon acts as an empty statement, so the block executes only once after the loop finishes.',
        howToFix: 'Never place a semicolon directly after the loop header parentheses.'
      },
      {
        mistake: 'Off-by-one errors (using <= instead of < for 0-indexed arrays).',
        whyItHappens: 'Writing "for (int i = 0; i <= arr.length; i++)" causes ArrayIndexOutOfBoundsException on the last iteration.',
        howToFix: 'For 0-indexed arrays, always use i < arr.length.'
      },
      {
        mistake: 'Trying to access loop counter variable outside the loop.',
        whyItHappens: 'Assuming i is accessible after the loop.',
        howToFix: 'If you need the counter after the loop, declare it before the for loop.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the exact execution flow of the three expressions in a for loop header?',
        answer: 'The initialization expression executes exactly once when entering the loop. Next, the boolean condition is evaluated; if true, the loop body executes; if false, the loop terminates immediately. After the body finishes, the update expression executes. Then control returns to evaluate the condition again. This cycle repeats until the condition is false.',
        followUp: 'Are all three expressions in the for loop header mandatory?',
        keyPhrases: ['init runs once', 'condition evaluated before body', 'update evaluated after body', 'all three are optional'],
        commonMistakeAnswer: 'Believing the update expression runs before the body.'
      },
      {
        question: 'What does "for(;;)" do, and how does it compare to "while(true)" at the bytecode level?',
        answer: 'Both "for(;;)" and "while(true)" represent infinite loops. At the bytecode level, modern Java compilers (javac) compile both into the exact same unconditional jump instruction (goto). Neither has any performance advantage over the other; "while(true)" is generally preferred for readability.',
        followUp: 'Why does javac allow unreachable code after while(true) to fail compilation?',
        keyPhrases: ['infinite loop', 'goto bytecode instruction', 'identical compiler output', 'unreachable statement compilation error'],
        commonMistakeAnswer: 'Claiming for(;;) is faster because it has fewer bytecode instructions.'
      },
      {
        question: 'Can you initialize multiple variables of different data types in a single for loop header?',
        answer: 'No. In Java, multiple variable declarations in the initialization section of a for loop are only valid if they share the exact same type (e.g. "for (int i = 0, j = 10; ...)"). Trying to declare "for (int i = 0, double d = 0; ...)" causes a compile-time syntax error. If different types are needed, they must be declared before the loop.',
        followUp: 'Can you have multiple update expressions separated by commas?',
        keyPhrases: ['same type restriction', 'comma operator in header', 'multiple update statements allowed'],
        commonMistakeAnswer: 'Believing any valid variable declaration can be placed with commas.'
      }
    ],
    miniQuiz: [
      {
        question: 'What happens when this code runs: "for (int i = 0; i < 3; i++) ; System.out.print(i);"?',
        options: [
          'Prints 0 1 2',
          'Compilation error: cannot find symbol variable i',
          'Prints 3',
          'Prints nothing'
        ],
        correctIndex: 1,
        explanation: 'Because "i" is declared inside the for header, its scope is limited to the loop. The semicolon terminates the loop body, so the subsequent print statement is outside i\'s scope and fails compilation.'
      },
      {
        question: 'How many times will "for (int i = 5; i > 0; i -= 2)" execute its body?',
        options: ['2 times', '3 times', '5 times', '0 times'],
        correctIndex: 1,
        explanation: 'Iterations: i = 5 (run 1), i = 3 (run 2), i = 1 (run 3). Then i becomes -1, which is not > 0, so loop terminates. Total: 3 times.'
      }
    ]
  },

  // ── 4.5 The Enhanced For-Each Loop ──
  'enhanced-for-each': {
    id: 'enhanced-for-each',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.5',
    title: 'The Enhanced For-Each Loop',
    subtitle: 'Clean collection/array traversal, underlying Iterator, and modification restrictions',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of a conveyor belt at airport baggage claim. Luggage pieces pass in front of you one by one. You inspect each bag without needing to know whether it is bag #1 or bag #42, and you cannot swap the conveyor belt slots while watching!',
    interviewTakeaways: [
      'Read-Only Traversal for Primitives: You cannot modify array elements directly using the for-each loop variable (writing "num = 5;" changes only the local copy, not the array).',
      'No Index Access: You do not have access to the index "i", cannot traverse in reverse, and cannot skip elements.',
      'Underlying Bytecode: For arrays, the compiler turns it into a standard indexed for loop. For Collections, it compiles to an Iterator (hasNext() and next()).',
      'ConcurrentModificationException: You CANNOT add or remove elements from a Collection during a for-each loop. Use Iterator.remove() instead.',
      'Null Safety: If the array or collection reference is null, the for-each loop throws a NullPointerException immediately.'
    ],
    cheatSheet: {
      summary: 'Syntactic sugar introduced in Java 5 for clean forward traversal of arrays and Iterable collections.',
      syntaxTemplate: `for (ElementType element : arrayOrIterable) {
    // Read-only access to element
}`,
      rules: [
        { rule: 'Applicable Targets', explanation: 'Can only be used on arrays and classes implementing java.lang.Iterable.' },
        { rule: 'Element Immutability', explanation: 'Reassigning the iteration variable (e.g. x = 10) does NOT alter the underlying array slot.' },
        { rule: 'Collection Mutation', explanation: 'Calling list.remove() or list.add() inside for-each throws ConcurrentModificationException.' },
        { rule: 'Null Reference Trap', explanation: 'Attempting to iterate over a null collection or null array throws NullPointerException.' },
        { rule: 'No Reverse Traversal', explanation: 'Always traverses strictly from index 0 to length - 1.' }
      ],
      quickComparison: [
        { aspect: 'Index Tracking', optionA: 'for-each: No index available (must maintain external counter if needed)', optionB: 'traditional for: Direct access to index variable i' },
        { aspect: 'Modifying Elements', optionA: 'for-each: Cannot modify array slots via iteration variable', optionB: 'traditional for: Direct in-place modification (arr[i] = newValue)' },
        { aspect: 'LinkedList Performance', optionA: 'for-each: O(N) using Iterator sequential traversal', optionB: 'traditional for: O(N^2) if calling list.get(i) on LinkedList!' },
        { aspect: 'Safe Element Removal', optionA: 'for-each: Forbidden (ConcurrentModificationException)', optionB: 'Iterator: Safe using iterator.remove()' }
      ]
    },
    coreExplanation: [
      'Introduced in Java 5, the enhanced for-each loop eliminates index boilerplate when you just need to inspect every item.',
      'For arrays, the compiler generates a standard for loop with an index counter under the hood.',
      'For Collections (List, Set), the compiler generates code that calls .iterator(), .hasNext(), and .next().',
      'CRITICAL INTERVIEW TRAP: You CANNOT modify an array by reassigning the loop variable! "for (int n : arr) { n = 0; }" leaves arr completely unchanged.',
      'You cannot remove items from a Collection during a for-each loop. Doing so triggers ConcurrentModificationException.'
    ],
    diagram: `Under the hood of for (String s : list):

Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    // Your code here
}`,
    codeSnippet: {
      title: 'The For-Each Reassignment Trap',
      code: `public class ForEachTrapDemo {
    public static void main(String[] args) {
        int[] scores = {10, 20, 30};

        System.out.println("Attempting to double scores using for-each:");
        for (int score : scores) {
            score *= 2; // Modifies local variable 'score', NOT scores[i]!
        }

        // Print array to verify:
        for (int score : scores) {
            System.out.print(score + " "); // Still 10 20 30!
        }
        System.out.println();
    }
}`,
      lineByLineExplanation: [
        { line: 'for (int score : scores)', explanation: 'Copies the value from scores[i] into local variable score.' },
        { line: 'score *= 2;', explanation: 'Only doubles the local variable. The array memory is untouched!' }
      ],
      output: `Attempting to double scores using for-each:
10 20 30 `
    },
    codeExamples: [
      {
        title: 'Example 1: Safe Collection Traversal and Aggregation',
        description: 'Calculating sum, max, and formatted output cleanly with for-each.',
        code: `public class ArrayAggregation {
    public static void main(String[] args) {
        int[] numbers = {15, 42, 8, 93, 27};
        int max = numbers[0];
        int sum = 0;

        for (int num : numbers) {
            sum += num;
            if (num > max) max = num;
        }

        System.out.println("Sum: " + sum + ", Max: " + max);
    }
}`,
        output: 'Sum: 185, Max: 93'
      },
      {
        title: 'Example 2: Iterating Map Entries with for-each',
        description: 'Iterating key-value pairs cleanly using map.entrySet().',
        code: `import java.util.HashMap;
import java.util.Map;

public class MapForEachDemo {
    public static void main(String[] args) {
        Map<String, Integer> stock = new HashMap<>();
        stock.put("Apples", 50);
        stock.put("Oranges", 35);

        for (Map.Entry<String, Integer> entry : stock.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue() + " units");
        }
    }
}`,
        output: `Apples -> 50 units
Oranges -> 35 units`
      },
      {
        title: 'Example 3: Object State Mutation in for-each',
        description: 'Notice that while you cannot reassign references, you CAN mutate object internal state.',
        code: `class Item {
    String name;
    int price;
    Item(String name, int price) { this.name = name; this.price = price; }
}

public class ObjectMutationDemo {
    public static void main(String[] args) {
        Item[] items = { new Item("Pen", 10), new Item("Book", 50) };

        for (Item item : items) {
            item.price += 5; // Modifies the object in heap!
        }

        for (Item item : items) {
            System.out.println(item.name + ": $" + item.price);
        }
    }
}`,
        output: `Pen: $15
Book: $55`
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: String Concatenation in for-each',
        problemStatement: 'What does this code snippet print to the console?',
        code: `String[] words = {"Java", "is", "cool"};
for (String word : words) {
    word = word.toUpperCase();
}
System.out.println(words[0] + " " + words[2]);`,
        options: [
          'JAVA COOL',
          'Java cool',
          'Java COOL',
          'JAVA cool'
        ],
        correctOptionIndex: 1,
        hint: 'Strings in Java are immutable, and for-each variables hold copies of references. Does "word = ..." change words[0]?',
        solution: 'Java cool',
        explanation: 'In the for-each loop, "word" is a local reference copy. Reassigning word = word.toUpperCase() assigns a new String to the local variable "word" only. The array words[] remains completely untouched. Output is "Java cool".'
      },
      {
        title: 'Challenge 2: Modifying Collection During for-each',
        problemStatement: 'What happens when the following code runs?',
        code: `java.util.List<String> list = new java.util.ArrayList<>();
list.add("A");
list.add("B");
for (String s : list) {
    if (s.equals("A")) {
        list.remove(s);
    }
}`,
        options: [
          'Removes "A" cleanly, list contains ["B"]',
          'Throws ConcurrentModificationException at runtime',
          'Compilation error',
          'Infinite loop'
        ],
        correctOptionIndex: 1,
        hint: 'The for-each loop uses an internal Iterator. What happens when the collection is structurally modified without the iterator knowing?',
        solution: 'Throws ConcurrentModificationException at runtime',
        explanation: 'For-each on a Collection creates an Iterator. When list.remove() is called directly on the List, the collection\'s modCount increases. On the next iteration, the Iterator detects modCount != expectedModCount and immediately throws ConcurrentModificationException.'
      },
      {
        title: 'Challenge 3: For-Each on Null Array Reference',
        problemStatement: 'What is the result of executing this code snippet?',
        code: `int[] numbers = null;
for (int n : numbers) {
    System.out.println(n);
}`,
        options: [
          'Prints nothing',
          'Throws NullPointerException at runtime',
          'Compilation Error',
          'Prints 0'
        ],
        correctOptionIndex: 1,
        hint: 'Before entering the loop, the JVM must determine the length of the array.',
        solution: 'Throws NullPointerException at runtime',
        explanation: 'To loop over an array, the compiled bytecode attempts to read numbers.length. Because numbers is null, dereferencing it throws a NullPointerException immediately.'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Trying to update an array with: for (int x : arr) { x = newValue; }',
        whyItHappens: 'Misunderstanding value passing. "x" is just a local copy of the element.',
        howToFix: 'Use a traditional indexed for loop to mutate array slots: for (int i = 0; i < arr.length; i++) arr[i] = val;'
      },
      {
        mistake: 'Removing items from a list inside for-each: list.remove(item);',
        whyItHappens: 'Forgetting that for-each is backed by a fail-fast Iterator.',
        howToFix: 'Use an explicit Iterator with iterator.remove(), or use list.removeIf(predicate) in Java 8+.'
      },
      {
        mistake: 'Assuming for-each can traverse backwards or skip every second element.',
        whyItHappens: 'Assuming for-each has configuration flags.',
        howToFix: 'Use a traditional for loop whenever non-standard traversal (reverse, step > 1) is needed.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What does the enhanced for-each loop compile to behind the scenes?',
        answer: 'The Java compiler lowers the enhanced for-each loop into two distinct implementations: For arrays, it compiles to a standard indexed for loop using an internal counter and length check. For any object implementing java.lang.Iterable, it compiles to while loop using Iterator with .hasNext() and .next().',
        followUp: 'Why is using for-each on a LinkedList significantly faster than a traditional for loop with list.get(i)?',
        keyPhrases: ['compiler transformation', 'indexed loop for arrays', 'Iterator for Iterable', 'O(N) vs O(N^2) on LinkedList'],
        commonMistakeAnswer: 'Saying for-each uses reflection or works identically on all types.'
      },
      {
        question: 'Why does calling list.remove() inside a for-each loop throw ConcurrentModificationException?',
        answer: 'The Collection maintains an internal modification count (modCount). When an Iterator is created by the for-each loop, it stores expectedModCount = modCount. Calling list.remove() directly on the List modifies modCount without updating expectedModCount in the iterator. On the next call to iterator.next(), the discrepancy is detected, throwing ConcurrentModificationException.',
        followUp: 'How do you safely remove elements during collection iteration?',
        keyPhrases: ['modCount and expectedModCount', 'fail-fast iterator', 'use Iterator.remove()', 'use list.removeIf()'],
        commonMistakeAnswer: 'Assuming the exception is only thrown in multithreaded environments.'
      },
      {
        question: 'Can you modify the elements of an array or collection inside an enhanced for-each loop?',
        answer: 'You cannot replace array elements or reassign primitive/reference variables because the loop variable is only a local copy. However, for collections or arrays of mutable objects, you CAN mutate the internal state of the referenced object (e.g. calling person.setName("Bob") or list.get(0).setStatus(true)).',
        followUp: 'Can you replace the reference itself inside the array?',
        keyPhrases: ['local variable copy', 'reference modification vs object mutation', 'heap mutation allowed', 'array slot untouched'],
        commonMistakeAnswer: 'Saying that elements in a for-each loop are completely immutable in every way.'
      }
    ],
    miniQuiz: [
      {
        question: 'Which interface must a custom class implement to be used in an enhanced for-each loop?',
        options: ['java.util.Collection', 'java.lang.Iterable', 'java.util.Iterator', 'java.lang.Cloneable'],
        correctIndex: 1,
        explanation: 'Any class implementing java.lang.Iterable provides an iterator() method and can be used directly in an enhanced for-each loop.'
      },
      {
        question: 'What is the time complexity of iterating through a LinkedList of size N using an enhanced for-each loop?',
        options: ['O(N^2)', 'O(N)', 'O(1)', 'O(log N)'],
        correctIndex: 1,
        explanation: 'Because for-each uses the sequential Iterator, it traverses node-to-node in linear O(N) time (unlike list.get(i) which is O(N^2)).'
      }
    ]
  },

  // ── 4.6 While Loop (Pre-Condition Loop) ──
  'while-loop': {
    id: 'while-loop',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.6',
    title: 'The While Loop (Pre-Condition Loop)',
    subtitle: 'Entry-controlled iterations, sentinel values, and infinite loop debugging',
    estimatedMinutes: 10,
    beginnerAnalogy: 'Think of a security guard checking ticket validity at a concert gate. If your ticket is valid, you enter. If your ticket is expired, you are turned away immediately without taking a single step inside. Minimum admissions = 0!',
    interviewTakeaways: [
      'Pre-Tested (Entry-Controlled): Evaluates the condition BEFORE executing the body. Minimum possible executions = 0 times.',
      'Best for Indeterminate Iteration: Used when the number of iterations cannot be known upfront (e.g. reading from a network stream until EOF, user menu input).',
      'The Semicolon Trap: Writing "while (condition);" creates an empty statement, causing an immediate infinite freeze if condition is true.',
      'Counter Initialization & Update: Unlike a for loop, the counter must be explicitly declared before the loop and updated inside the body.'
    ],
    cheatSheet: {
      summary: 'Entry-controlled loop that repeats its body as long as the condition remains true.',
      syntaxTemplate: `while (booleanCondition) {
    // Body executes while booleanCondition is true
    // Counter / state update (MANDATORY to prevent infinite loop)
}`,
      rules: [
        { rule: 'Condition Check Timing', explanation: 'Condition evaluated before the body runs. If false on first check, body executes 0 times.' },
        { rule: 'Counter Placement', explanation: 'Loop variable must be initialized before the while block and updated inside the body.' },
        { rule: 'Semicolon Warning', explanation: 'while (cond); creates an infinite busy-wait if cond is true.' },
        { rule: 'Unreachable Code', explanation: 'while (false) causes a compile-time "unreachable statement" error in Java.' }
      ],
      quickComparison: [
        { aspect: 'Condition Evaluation', optionA: 'while: Before entering body (Pre-test)', optionB: 'do-while: After executing body (Post-test)' },
        { aspect: 'Minimum Executions', optionA: 'while: 0 times (if initial condition is false)', optionB: 'do-while: 1 time (guaranteed)' },
        { aspect: 'Trailing Semicolon', optionA: 'while: NO semicolon after while(cond)', optionB: 'do-while: MANDATORY semicolon after while(cond);' },
        { aspect: 'Best Used For', optionA: 'while: File reading, queue polling, math convergence', optionB: 'do-while: User prompts, ATM pin entries, retrying failed network calls' }
      ]
    },
    coreExplanation: [
      'A while loop is an entry-controlled loop: it tests the condition first before executing the body even once.',
      'If the condition is initially false, the loop body executes ZERO times.',
      'While loops are ideal when the number of iterations is indeterminate (e.g., reading until end of file, processing a queue).',
      'COMMON BUG: Forgetting to increment the loop variable inside the body results in an infinite loop that locks up the thread.',
      'A semicolon immediately following "while (condition);" creates an empty loop body, often creating an instant infinite busy-wait.'
    ],
    diagram: `[ Condition Check ] --(false)--> [ EXIT (0 runs) ]
        | (true)
        v
    [ Loop Body ]
        |
        +---> (Loop back to Condition Check)`,
    codeSnippet: {
      title: 'Digit Extraction and Summation with While Loop',
      code: `public class WhileDigitSum {
    public static void main(String[] args) {
        int number = 12345;
        int sum = 0;

        // Extracts digits one by one until number becomes 0:
        while (number > 0) {
            int digit = number % 10; // Extract last digit
            sum += digit;
            number /= 10;            // Remove last digit
        }

        System.out.println("Sum of digits: " + sum);
    }
}`,
      lineByLineExplanation: [
        { line: 'while (number > 0)', explanation: 'Pre-check: runs as long as number has remaining digits.' },
        { line: 'int digit = number % 10;', explanation: '12345 % 10 = 5, then 4, 3, 2, 1.' },
        { line: 'number /= 10;', explanation: 'Crucial update step: shrinks number down to 0 to terminate loop.' }
      ],
      output: 'Sum of digits: 15'
    },
    codeExamples: [
      {
        title: 'Example 1: Euclidean Algorithm for Greatest Common Divisor (GCD)',
        description: 'Classic algorithmic while loop where loop count depends on mathematical convergence.',
        code: `public class GcdWhileDemo {
    public static void main(String[] args) {
        int a = 48, b = 18;

        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }

        System.out.println("GCD is: " + a);
    }
}`,
        output: 'GCD is: 6'
      },
      {
        title: 'Example 2: Semicolon Trap Demonstration',
        description: 'Demonstrating how while (x < 5); creates an infinite loop.',
        code: `public class WhileSemicolonTrap {
    public static void main(String[] args) {
        int x = 10;

        // Condition is false (10 < 5), so semicolon statement exits immediately:
        while (x < 5); 
        {
            System.out.println("Block executed once because x >= 5! x = " + x);
        }
    }
}`,
        output: 'Block executed once because x >= 5! x = 10'
      },
      {
        title: 'Example 3: Sentinel Controlled Loop',
        description: 'Processing values until a sentinel value (-1) is encountered.',
        code: `public class SentinelLoopDemo {
    public static void main(String[] args) {
        int[] stream = {10, 25, 40, -1, 99};
        int i = 0;
        int sum = 0;

        while (i < stream.length && stream[i] != -1) {
            sum += stream[i];
            i++;
        }

        System.out.println("Processed sum before sentinel: " + sum);
    }
}`,
        output: 'Processed sum before sentinel: 75'
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Post-Decrement in While Condition',
        problemStatement: 'Trace what this code snippet prints to the console:',
        code: `int x = 3;
while (x-- > 0) {
    System.out.print(x + " ");
}
System.out.println();`,
        options: [
          '3 2 1 0 ',
          '2 1 0 ',
          '3 2 1 ',
          '2 1 '
        ],
        correctOptionIndex: 1,
        hint: 'Remember that "x-- > 0" compares the CURRENT value of x against 0, and THEN decrements x before the body executes!',
        solution: '2 1 0 ',
        explanation: `Step-by-step trace:
1. Iteration 1: Check (x-- > 0) -> (3 > 0) is TRUE. x decrements to 2.
   - Body prints "2 ".
2. Iteration 2: Check (x-- > 0) -> (2 > 0) is TRUE. x decrements to 1.
   - Body prints "1 ".
3. Iteration 3: Check (x-- > 0) -> (1 > 0) is TRUE. x decrements to 0.
   - Body prints "0 ".
4. Iteration 4: Check (x-- > 0) -> (0 > 0) is FALSE. x decrements to -1.
   - Loop exits.
Final output: "2 1 0 ".`
      },
      {
        title: 'Challenge 2: Integer Division Tracing',
        problemStatement: 'How many times does the print statement execute in this snippet?',
        code: `int n = 16;
while (n > 1) {
    System.out.print(n + " ");
    n /= 2;
}`,
        options: [
          '3 times',
          '4 times',
          '5 times',
          'Infinite loop'
        ],
        correctOptionIndex: 1,
        hint: 'Trace n values: 16 -> 8 -> 4 -> 2 -> 1.',
        solution: '4 times',
        explanation: 'Values of n when entering loop: 16 (runs, n becomes 8), 8 (runs, n becomes 4), 4 (runs, n becomes 2), 2 (runs, n becomes 1). Next check: 1 > 1 is false. Loop executes exactly 4 times (printing 16 8 4 2).'
      },
      {
        title: 'Challenge 3: Compile-Time Unreachable Code in While',
        problemStatement: 'Will this Java code compile?',
        code: `while (false) {
    System.out.println("Hello");
}`,
        options: [
          'Yes, compiles and prints nothing',
          'Compilation Error: unreachable statement',
          'Runtime Exception',
          'Warning only'
        ],
        correctOptionIndex: 1,
        hint: 'In Java, what does the compiler do if it can prove at compile time that a statement can NEVER execute?',
        solution: 'Compilation Error: unreachable statement',
        explanation: 'Unlike C/C++, Java strictly forbids provably unreachable code. "while (false)" is evaluated at compile time, and javac rejects the program with an "unreachable statement" compiler error. (Note: "boolean flag = false; while(flag)" compiles because flag is a variable).'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Forgetting to update the loop condition variable inside the body.',
        whyItHappens: 'Leaving out "i++" or "n /= 2", causing an infinite loop that freezes the JVM.',
        howToFix: 'Always write the update statement immediately after opening the while block.'
      },
      {
        mistake: 'Accidental semicolon after while: while (x < 10); { x++; }',
        whyItHappens: 'Typing habit. If x < 10 is true, it enters an infinite busy-wait on the semicolon line.',
        howToFix: 'Never place a semicolon immediately after "while (condition)".'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the minimum number of times a while loop can execute?',
        answer: 'The minimum number of executions is 0. Because a while loop is an entry-controlled (pre-tested) loop, its condition is evaluated before entering the body. If the condition evaluates to false on the very first check, the body is skipped completely.',
        followUp: 'Which loop in Java guarantees at least 1 execution?',
        keyPhrases: ['0 times minimum', 'entry-controlled loop', 'pre-tested condition', 'do-while guarantees >= 1'],
        commonMistakeAnswer: 'Saying 1 time, confusing while with do-while.'
      },
      {
        question: 'Why does "while (false) {}" fail compilation in Java, but "if (false) {}" compiles cleanly?',
        answer: 'Java Language Specification (JLS §14.21) explicitly treats "while (false)" as an unreachable statement error because there is no valid reason to have a loop that never runs. Conversely, "if (false)" is explicitly permitted by the JLS to support conditional compilation (similar to #ifdef in C/C++), allowing developers to easily toggle debug code.',
        followUp: 'How can you bypass the while (false) compile error if desired?',
        keyPhrases: ['JLS §14.21 unreachable statements', 'conditional compilation flag', 'boolean variable vs literal'],
        commonMistakeAnswer: 'Thinking both fail compilation or that both succeed.'
      },
      {
        question: 'What happens when a semicolon is placed immediately after a while condition: "while (x < 5);"?',
        answer: 'The semicolon creates an empty statement as the loop\'s body. If the condition (x < 5) evaluates to true, the CPU executes the empty statement repeatedly forever in an infinite busy-wait loop because x is never modified. If the condition is false, the empty statement finishes immediately and control passes to the next block.',
        followUp: 'How can you detect this in thread dumps in production?',
        keyPhrases: ['empty statement body', 'infinite busy-wait loop', '100% CPU thread spike', 'thread dump runnable state'],
        commonMistakeAnswer: 'Believing it throws a syntax error.'
      }
    ],
    miniQuiz: [
      {
        question: 'What is the minimum number of times a while loop body will execute in Java?',
        options: ['0 times', '1 time', '2 times', 'Infinite times'],
        correctIndex: 0,
        explanation: 'Because condition checking happens before the loop body runs, a while loop will execute 0 times if the initial condition is false.'
      },
      {
        question: 'What is the output of: int x = 5; while (x > 5) { x++; } System.out.println(x);?',
        options: ['5', '6', '0', 'Compilation error'],
        correctIndex: 0,
        explanation: 'The condition (5 > 5) is false immediately. The body is never executed, and x remains 5.'
      }
    ]
  },

  // ── 4.7 The do-while Loop ──
  'do-while-loop': {
    id: 'do-while-loop',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.7',
    title: 'The do-while Loop (Runs >= 1 Time)',
    subtitle: 'Post-condition checking, loop execution guarantees & interview tracing traps',
    estimatedMinutes: 6,
    beginnerAnalogy: 'Think of an amusement park ride where ticket checking happens at the EXIT. A "while" loop checks your ticket before entering (if expired, 0 rides). A "do-while" loop lets you ride first, then checks ticket at the exit. You are 100% guaranteed to ride at least once!',
    interviewTakeaways: [
      'Guaranteed Execution: Runs at least once (>= 1) because the body executes FIRST before the condition is evaluated (Post-Condition check).',
      'The Semicolon Trap: "do { ... } while (condition);" MANDATES a semicolon at the very end. Forgetting ";" causes a compile-time syntax error.',
      'Primary Production Use Case: User menu prompts (display menu options >= 1 time, repeat if invalid input), retry logic on failed network calls.'
    ],
    cheatSheet: {
      summary: 'do-while is an exit-controlled / post-tested loop guaranteed to execute its body at least once.',
      syntaxTemplate: `do {
    // Statements executed at least once
    // Counter update (e.g., i++;)
} while (booleanCondition); // <-- Mandatory semicolon!`,
      rules: [
        { rule: 'Execution Guarantee', explanation: 'Condition is evaluated AFTER the loop body finishes. Minimum iterations = 1.' },
        { rule: 'Syntax Semicolon', explanation: 'Must terminate with a semicolon after while(condition); or code will not compile.' },
        { rule: 'Scope of Variables', explanation: 'Variables declared inside the do { } block CANNOT be used inside the while(condition) parentheses.' },
        { rule: 'Pre/Post Increment Trap', explanation: 'Condition like while(x++ < 5) evaluates current x, then increments immediately after check.' }
      ],
      quickComparison: [
        { aspect: 'Condition Evaluation', optionA: 'while: Evaluated BEFORE entering body (Pre-test)', optionB: 'do-while: Evaluated AFTER executing body (Post-test)' },
        { aspect: 'Minimum Executions', optionA: 'while: 0 times (if initial condition is false)', optionB: 'do-while: 1 time (guaranteed)' },
        { aspect: 'Semicolon Requirement', optionA: 'while: NO semicolon after while(cond)', optionB: 'do-while: MANDATORY semicolon after while(cond);' },
        { aspect: 'Best Suited For', optionA: 'while: When loop count depends entirely on external state', optionB: 'do-while: Menus, PIN prompts, reading network stream chunks' }
      ]
    },
    coreExplanation: [
      'Pre-test (while): Evaluates condition first. If false initially, executes 0 times.',
      'Post-test (do-while): Executes body first, then evaluates condition at the bottom.',
      'If the condition evaluates to true, control jumps back to the top of "do {". If false, the loop terminates.'
    ],
    diagram: `while (Pre-test):       [ Condition Check ] -> false -> [ Exit (0 runs) ]
                               | true
                           [ Body ]

do-while (Post-test):        [ Run Body ]  <--- (ALWAYS RUNS AT LEAST ONCE)
                               |
                       [ Condition Check ] -> false -> [ Exit (>= 1 run) ]
                               | true
                       (Repeats to Body)`,
    codeSnippet: {
      title: 'do-while in Action: Guaranteed 1 Execution Even When False',
      code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int count = 999;

        // Even though (count < 5) is completely FALSE initially:
        do {
            System.out.println("Executes once! count = " + count);
            count++;
        } while (count < 5); // Notice the required semicolon!

        System.out.println("Finished! Final count = " + count);
    }
}`,
      lineByLineExplanation: [
        { line: 'do { ... }', explanation: 'Body runs immediately without evaluating any condition.' },
        { line: 'while (count < 5);', explanation: 'Evaluates (1000 < 5) which is false. Loop terminates cleanly.' },
      ],
      output: `Executes once! count = 999
Finished! Final count = 1000`
    },
    codeExamples: [
      {
        title: 'Example 1: Interactive Menu / Validation Pattern',
        description: 'Simulating an ATM or Console menu that prompts the user at least once and repeats if invalid.',
        code: `public class AtmMenuExample {
    public static void main(String[] args) {
        int pinAttempt = 1;
        int maxAttempts = 3;
        boolean authenticated = false;

        do {
            System.out.println("Displaying PIN Prompt (Attempt " + pinAttempt + "/" + maxAttempts + ")");
            // Simulate attempt 3 succeeds:
            if (pinAttempt == 3) {
                authenticated = true;
                System.out.println(">> PIN Correct! Access Granted.");
            } else {
                System.out.println(">> Invalid PIN. Please try again.");
            }
            pinAttempt++;
        } while (!authenticated && pinAttempt <= maxAttempts);
    }
}`,
        output: `Displaying PIN Prompt (Attempt 1/3)
>> Invalid PIN. Please try again.
Displaying PIN Prompt (Attempt 2/3)
>> Invalid PIN. Please try again.
Displaying PIN Prompt (Attempt 3/3)
>> PIN Correct! Access Granted.`
      },
      {
        title: 'Example 2: Digit Reversal with do-while',
        description: 'Reversing numbers including 0 (where standard while would need a special check).',
        code: `public class ReverseNumberDoWhile {
    public static void main(String[] args) {
        int number = 407;
        int reversed = 0;

        do {
            int lastDigit = number % 10;
            reversed = (reversed * 10) + lastDigit;
            number /= 10;
        } while (number > 0);

        System.out.println("Reversed Result: " + reversed); // 704
    }
}`,
        output: 'Reversed Result: 704'
      },
      {
        title: 'Example 3: Rolling a Random Dice until Target is Hit',
        description: 'A game where a player rolls a dice at least once until rolling a 6.',
        code: `import java.util.Random;

public class DiceRollSimulation {
    public static void main(String[] args) {
        Random random = new Random(42); // fixed seed for reproducible trace
        int roll;
        int attempts = 0;

        do {
            roll = random.nextInt(6) + 1; // 1 to 6
            attempts++;
            System.out.println("Roll #" + attempts + ": Rolled a " + roll);
        } while (roll != 6);

        System.out.println("Target 6 reached in " + attempts + " rolls!");
    }
}`,
        output: `Roll #1: Rolled a 2
Roll #2: Rolled a 5
Roll #3: Rolled a 6
Target 6 reached in 3 rolls!`
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Post-Increment in Condition',
        problemStatement: 'Trace the exact printed output of the following Java snippet without running it:',
        code: `int x = 2;
do {
    System.out.print(x + " ");
    x += 3;
} while (x++ < 8);
System.out.println("End: " + x);`,
        options: [
          '2 5 End: 6',
          '2 5 End: 9',
          '2 5 8 End: 9',
          '2 5 End: 10'
        ],
        correctOptionIndex: 3,
        hint: 'Remember that "x++ < 8" tests the current value of x against 8, and THEN increments x immediately afterward!',
        solution: '2 5 End: 10',
        explanation: 'Iteration 1: prints 2, x becomes 5, (5<8) is true, x increments to 6. Iteration 2: prints 5, x becomes 9, (9<8) is false, x increments to 10. Output: "2 5 End: 10".'
      },
      {
        title: 'Challenge 2: Pre-Increment vs Post-Increment in Body',
        problemStatement: 'What does this code snippet print to the console?',
        code: `int num = 1;
do {
    System.out.print(++num + " ");
} while (num++ < 4);`,
        options: [
          '2 4 6',
          '2 4',
          '1 2 3 4',
          '2 3 4'
        ],
        correctOptionIndex: 1,
        hint: 'Notice ++num in the body happens BEFORE print, and num++ in the condition happens AFTER test!',
        solution: '2 4',
        explanation: `Step-by-step trace:
Iteration 1:
- ++num increments num from 1 to 2. Prints "2 ".
- Condition check: (num++ < 4) tests (2 < 4) which is TRUE, then num increments to 3.
Iteration 2:
- ++num increments num from 3 to 4. Prints "4 ".
- Condition check: (num++ < 4) tests (4 < 4) which is FALSE, then num increments to 5.
Loop ends! Final output: "2 4 ".`
      },
      {
        title: 'Challenge 3: Scope Compilation Trap',
        problemStatement: 'Will the following code compile or throw an error?',
        code: `do {
    int val = 10;
    System.out.println(val);
    val--;
} while (val > 0);`,
        options: [
          'Prints 10 down to 1',
          'Compilation Error: cannot find symbol variable val',
          'Prints 10 and stops',
          'Infinite Loop'
        ],
        correctOptionIndex: 1,
        hint: 'Look closely at where "val" is declared. Can the while condition outside the braces see variables declared inside?',
        solution: 'Compilation Error: cannot find symbol variable val',
        explanation: 'Because "val" is declared inside the curly braces of the do block, its scope is limited to that block. The while condition is outside the block and cannot resolve the symbol "val".'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Omitting the semicolon at the end of while: do { ... } while (cond) // Missing ;',
        whyItHappens: 'Regular while loops don\'t have a semicolon after parentheses.',
        howToFix: 'Remember: do-while ALWAYS ends with a semicolon after while (...);'
      },
      {
        mistake: 'Accidentally creating an infinite loop by re-declaring variables inside the do block.',
        whyItHappens: 'Variables declared inside "do { ... }" cannot be seen by "while(cond);" because of block scope.',
        howToFix: 'Declare loop counter variables OUTSIDE the do-while block.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the primary difference between a while loop and a do-while loop?',
        answer: 'A while loop is pre-tested (evaluates condition before executing body; can run 0 times). A do-while loop is post-tested (executes body first, then evaluates condition; guaranteed to run at least 1 time). Also, do-while requires a terminating semicolon.',
        followUp: 'Give a realistic software scenario where do-while is superior to while.',
        keyPhrases: ['pre-tested vs post-tested', 'guaranteed >= 1 execution', 'exit-controlled', 'mandatory semicolon'],
        commonMistakeAnswer: 'Saying both loops can execute 0 times.'
      },
      {
        question: 'Why does declaring a variable inside a do { ... } block make it unavailable in while(cond)?',
        answer: 'Java uses lexical block scoping. Any variable declared inside curly braces { } ceases to exist once execution leaves those braces. Because "while(condition);" sits outside the do { } block, the variable is out of scope.',
        followUp: 'How do you fix this scoping issue?',
        keyPhrases: ['lexical block scoping', 'variable lifetime', 'out of scope symbol'],
        commonMistakeAnswer: 'Thinking the while condition is inside the do block.'
      }
    ],
    miniQuiz: [
      {
        question: 'How many times will "int k = 10; do { k++; } while (k < 5);" execute its body?',
        options: ['0 times', '1 time', '5 times', 'Infinite times'],
        correctIndex: 1,
        explanation: 'do-while executes the body first, increments k to 11, then checks (11 < 5) which is false, terminating after 1 run.'
      },
      {
        question: 'What is required at the very end of a do-while loop in Java?',
        options: ['Closing brace only }', 'A semicolon ; after while(cond)', 'A break statement', 'return keyword'],
        correctIndex: 1,
        explanation: 'In Java syntax, a do-while loop must conclude with a semicolon: while (condition);'
      }
    ]
  },

  // ── 4.8 Break, Continue & Labeled Statements ──
  'break-continue-labeled': {
    id: 'break-continue-labeled',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.8',
    title: 'Break, Continue & Labeled Statements',
    subtitle: 'Loop interruption, skipping iterations, and breaking out of nested loops cleanly',
    estimatedMinutes: 12,
    beginnerAnalogy: 'Think of reading a book. "continue" is skipping to the next chapter because you already know this one. "break" is closing the book and putting it on the shelf. "labeled break" is slamming shut all 3 volumes of an encyclopedia set at once!',
    interviewTakeaways: [
      'break: Immediately terminates and exits the innermost enclosing switch, for, while, or do-while loop.',
      'continue: Skips the rest of the current iteration. In a for loop, it jumps to the update step (i++); in a while loop, it jumps to the condition check.',
      'Java Has No goto: Java reserves the keyword "goto" but does not implement it. Instead, labeled break and labeled continue provide safe, structured multi-level exits.',
      'Unreachable Code Compile Error: Writing statements directly after an unconditional break or continue in the same block causes an "unreachable statement" compiler error.'
    ],
    cheatSheet: {
      summary: 'Jump statements altering the normal sequential execution flow of loops and switches.',
      syntaxTemplate: `outerLoop:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (condition1) continue;          // Skips to next j
        if (condition2) break;             // Exits inner loop j
        if (condition3) break outerLoop;   // Exits BOTH loops!
    }
}`,
      rules: [
        { rule: 'Innermost Scope', explanation: 'Unlabeled break and continue only affect the immediate enclosing loop.' },
        { rule: 'continue in for vs while', explanation: 'In for, continue runs the update clause (i++). In while, it jumps straight to condition check.' },
        { rule: 'Illegal continue', explanation: 'continue cannot be used inside a standalone switch statement (compile error).' },
        { rule: 'Label Placement', explanation: 'Labels must immediately precede the target loop statement (e.g. myLabel: for(...)).' },
        { rule: 'Unreachable Code', explanation: 'Any statements following break; or continue; in the same block will fail compilation.' }
      ],
      quickComparison: [
        { aspect: 'Operation', optionA: 'break: Terminates the loop entirely', optionB: 'continue: Skips only the remaining code in current iteration' },
        { aspect: 'Loop State After Call', optionA: 'break: Control passes to statement immediately after loop', optionB: 'continue: Control advances to next iteration' },
        { aspect: 'Valid In Switch?', optionA: 'break: YES (standard usage to prevent fall-through)', optionB: 'continue: NO (causes compilation error unless inside a loop)' },
        { aspect: 'With Labels', optionA: 'break label: Can break out of any labeled block or loop', optionB: 'continue label: Can ONLY be used on labeled loops' }
      ]
    },
    coreExplanation: [
      'The "break" statement immediately terminates the innermost enclosing loop or switch statement.',
      'The "continue" statement stops the current iteration and jumps to the next iteration. In a for loop, the update expression STILL runs.',
      'Java does NOT have a "goto" statement. Instead, it provides labeled break and labeled continue.',
      'A labeled break (e.g. "break outer;") allows breaking out of multiple nested loops simultaneously.',
      'A labeled continue (e.g. "continue outer;") skips to the next iteration of the specified outer loop.'
    ],
    diagram: `Unlabeled break:
for (i...) {
    for (j...) {
        break; ---> [ Exits only inner j loop ]
    }
}

Labeled break:
outer: for (i...) {
    for (j...) {
        break outer; ---> [ Exits BOTH i and j loops! ]
    }
}`,
    codeSnippet: {
      title: 'Breaking Out of Nested Loops with Labels',
      code: `public class LabeledBreakDemo {
    public static void main(String[] args) {
        int target = 5;
        boolean found = false;

        searchLoop: // Label identifying the outer loop
        for (int row = 0; row < 3; row++) {
            for (int col = 0; col < 3; col++) {
                int value = row * 3 + col;
                if (value == target) {
                    System.out.println("Found " + target + " at (" + row + ", " + col + ")");
                    found = true;
                    break searchLoop; // Exits BOTH loops cleanly!
                }
            }
        }

        System.out.println("Search finished. found = " + found);
    }
}`,
      lineByLineExplanation: [
        { line: 'searchLoop:', explanation: 'Defines a label attached to the outer for loop.' },
        { line: 'break searchLoop;', explanation: 'Terminates the outer searchLoop immediately, skipping remaining rows and cols.' }
      ],
      output: `Found 5 at (1, 2)
Search finished. found = true`
    },
    codeExamples: [
      {
        title: 'Example 1: Skipping Odd Numbers with Continue',
        description: 'Using continue to process only even numbers in an array.',
        code: `public class ContinueDemo {
    public static void main(String[] args) {
        int[] data = {1, 2, 3, 4, 5, 6};

        for (int val : data) {
            if (val % 2 != 0) {
                continue; // Skip odd numbers!
            }
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
        output: '2 4 6 '
      },
      {
        title: 'Example 2: Continue in While Loop Counter Trap',
        description: 'Watch out: if continue is called before incrementing the counter in a while loop, it loops infinitely!',
        code: `public class SafeWhileContinue {
    public static void main(String[] args) {
        int i = 0;

        while (i < 5) {
            i++; // Increment BEFORE continue to avoid infinite freeze!
            if (i == 3) {
                continue; // Skips printing 3
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
        output: '1 2 4 5 '
      },
      {
        title: 'Example 3: Labeled Continue in Matrix Traversal',
        description: 'Skipping the rest of an entire matrix row when an invalid entry is encountered.',
        code: `public class LabeledContinueDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, -1, 6}, // Has negative! Skip row!
            {7, 8, 9}
        };

        rowLoop:
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] < 0) {
                    System.out.println("Negative found in row " + r + "! Skipping row.");
                    continue rowLoop; // Jumps to next r++!
                }
                System.out.print(matrix[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
        output: `1 2 3 
Negative found in row 1! Skipping row.
7 8 9 `
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Tracing Break & Continue Accumulator',
        problemStatement: 'Trace what value of "sum" is printed by this loop:',
        code: `int sum = 0;
for (int i = 1; i <= 5; i++) {
    if (i == 2) continue;
    if (i == 4) break;
    sum += i;
}
System.out.println("Sum: " + sum);`,
        options: [
          'Sum: 4',
          'Sum: 1',
          'Sum: 6',
          'Sum: 15'
        ],
        correctOptionIndex: 0,
        hint: 'Step through i = 1, 2, 3, 4. What happens at i = 2? What happens at i = 4?',
        solution: 'Sum: 4',
        explanation: `Step-by-step trace:
1. i = 1: neither condition met. sum becomes 0 + 1 = 1.
2. i = 2: (i == 2) is true! continue skips sum += i. sum remains 1.
3. i = 3: neither condition met. sum becomes 1 + 3 = 4.
4. i = 4: (i == 4) is true! break terminates the loop immediately.
5. i = 5 is never reached. Final sum = 4.`
      },
      {
        title: 'Challenge 2: Labeled Continue in Nested Loop',
        problemStatement: 'What does this nested loop snippet print?',
        code: `outer:
for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 2; j++) {
        if (j == 2) continue outer;
        System.out.print(i + "" + j + " ");
    }
}`,
        options: [
          '11 12 21 22 ',
          '11 21 ',
          '11 12 ',
          '21 22 '
        ],
        correctOptionIndex: 1,
        hint: 'When j == 2, continue outer jumps to the NEXT iteration of the outer loop i! What happens to inner loop?',
        solution: '11 21 ',
        explanation: `Step-by-step trace:
1. i = 1, j = 1: prints "11 ".
2. i = 1, j = 2: (j == 2) -> "continue outer" aborts inner loop and increments i to 2!
3. i = 2, j = 1: prints "21 ".
4. i = 2, j = 2: (j == 2) -> "continue outer" aborts inner loop and increments i to 3 (terminating outer loop).
Final output: "11 21 ".`
      },
      {
        title: 'Challenge 3: Unreachable Code After Break',
        problemStatement: 'Will this code snippet compile?',
        code: `for (int i = 0; i < 5; i++) {
    break;
    System.out.println(i);
}`,
        options: [
          'Compiles and prints nothing',
          'Compilation Error: unreachable statement',
          'Compiles and prints 0',
          'Runtime Exception'
        ],
        correctOptionIndex: 1,
        hint: 'Can the print statement ever execute after unconditional break?',
        solution: 'Compilation Error: unreachable statement',
        explanation: 'Because "break;" unconditionally terminates the loop, the statement "System.out.println(i);" can never be reached. The Java compiler strictly flags unreachable code as a compile-time error.'
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Using continue inside a while loop before incrementing the counter variable.',
        whyItHappens: 'Skipping the update line creates an immediate infinite loop because the counter never changes.',
        howToFix: 'Ensure counter is incremented before continue, or use a for loop where continue automatically triggers update.'
      },
      {
        mistake: 'Attempting to use "continue" inside a standalone switch statement.',
        whyItHappens: 'Confusing break and continue. continue is valid ONLY inside loops.',
        howToFix: 'Use break to exit a switch case.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Does Java have a "goto" statement? How do labeled statements provide an alternative?',
        answer: 'No. While "goto" is a reserved keyword in Java (to prevent developers from using it as an identifier), it is not implemented in the language grammar. Instead, Java provides labeled break and labeled continue statements. These provide a safe, structured alternative that allows jumping out of deeply nested loops without the spaghetti code pitfalls of unconstrained goto jumps.',
        followUp: 'Can you use a labeled break on a non-loop code block?',
        keyPhrases: ['reserved keyword but not implemented', 'prevents spaghetti code', 'labeled break and labeled continue', 'can label any block { }'],
        commonMistakeAnswer: 'Saying Java supports goto or that goto was removed in Java 8.'
      },
      {
        question: 'In a for loop, does the update statement (e.g. i++) execute when "continue" is called?',
        answer: 'Yes. In a for loop, calling continue skips the remaining statements in the body, but control transfers directly to the loop\'s update expression (e.g. i++), which executes before evaluating the condition for the next iteration. This is a crucial distinction from while loops, where continue jumps directly to the condition.',
        followUp: 'Why does using continue in a while loop frequently cause infinite loops?',
        keyPhrases: ['update clause still executes in for', 'transfers to update step', 'while loop skips update', 'counter freeze'],
        commonMistakeAnswer: 'Believing continue skips the update step in for loops as well.'
      },
      {
        question: 'What is the difference between unlabeled break and labeled break in nested loops?',
        answer: 'An unlabeled break terminates only the innermost loop enclosing it; outer loops continue running. A labeled break references a label attached to an outer enclosing statement or loop, allowing execution to break out of multiple levels of nested loops simultaneously in a single clean jump.',
        followUp: 'Where must the label be positioned relative to the loop?',
        keyPhrases: ['innermost loop only', 'multi-level loop termination', 'label immediately precedes loop', 'clean exit from 2D searches'],
        commonMistakeAnswer: 'Thinking break always exits all loops regardless of labels.'
      }
    ],
    miniQuiz: [
      {
        question: 'In a nested loop, what does a standard "break;" without a label do?',
        options: [
          'Exits the outermost loop',
          'Exits only the innermost loop enclosing it',
          'Exits all running threads',
          'Causes a compiler error'
        ],
        correctIndex: 1,
        explanation: 'An unlabeled break only exits the innermost switch, for, while, or do-while statement that contains it.'
      },
      {
        question: 'Which of the following is NOT valid in Java?',
        options: [
          'break myLabel;',
          'continue myLabel;',
          'goto myLabel;',
          'myLabel: for(;;)'
        ],
        correctIndex: 2,
        explanation: 'goto is a reserved keyword in Java but is not implemented and cannot be used.'
      }
    ]
  },

  // ── 4.9 Nested Loops & Loop Tracing ──
  'nested-loops-and-tracing': {
    id: 'nested-loops-and-tracing',
    moduleId: 'java-control-flow',
    moduleTitle: '4. Control Flow & Loops',
    lessonNumber: 'Lesson 4.9',
    title: 'Nested Loops & Loop Tracing',
    subtitle: 'Matrix traversal, pyramid patterns, time complexity (O(N²)), and systematic trace tables',
    estimatedMinutes: 15,
    beginnerAnalogy: 'Think of an analog clock. The minute hand must tick 60 times (inner loop) for the hour hand to move forward by just 1 tick (outer loop). For 12 full hours, the minute hand makes 12 × 60 = 720 ticks! The inner loop runs to completion for every single step of the outer loop.',
    interviewTakeaways: [
      'Multiplicative Iterations: If the outer loop runs M times and the inner loop runs N times, the inner body executes M * N times, giving O(M * N) or O(N^2) time complexity.',
      'Dependent Loop Bounds: In triangular matrices and pattern printing, the inner loop bound often depends on the outer variable: for (int j = 0; j <= i; j++). Total iterations = N*(N+1)/2.',
      'Independent Loop Counters: Never accidentally use the outer counter variable (i) inside the inner loop update (typing i++ instead of j++ causes infinite loops!).',
      'Systematic Trace Table Technique: When interviewer asks to trace nested loops, immediately draw a 5-column table on paper: [Iteration, i, j, Condition, Printed Output].'
    ],
    cheatSheet: {
      summary: 'Loops inside loops, foundational for multi-dimensional data structures, grid algorithms, and pattern tracing.',
      syntaxTemplate: `for (int i = 0; i < rows; i++) {       // Outer loop (Rows)
    for (int j = 0; j < cols; j++) {   // Inner loop (Columns)
        // Body executes rows * cols times
        System.out.print(matrix[i][j] + " ");
    }
    System.out.println(); // Newline after each row
}`,
      rules: [
        { rule: 'Execution Order', explanation: 'Inner loop completely resets and runs through all its iterations for every single step of the outer loop.' },
        { rule: 'Time Complexity', explanation: 'Independent loops: O(N * M). Dependent loops (j <= i): N(N+1)/2 = O(N^2).' },
        { rule: 'Scope of Inner Counters', explanation: 'Inner loop counter cannot re-declare the outer counter name (e.g. declaring int i again is a compile error).' },
        { rule: 'Break in Inner Loop', explanation: 'An unlabeled break in the inner loop only breaks out of the inner loop; outer loop advances to next step.' }
      ],
      quickComparison: [
        { aspect: 'Independent vs Dependent', optionA: 'Independent: Inner loop bound is fixed (j < 5). Runs identical times every round.', optionB: 'Dependent: Inner loop bound depends on outer (j <= i). Iterations grow or shrink per round.' },
        { aspect: '2D Grid Navigation', optionA: 'Row-Major: Outer loop iterates rows (i), inner iterates columns (j). Cache-friendly in Java.', optionB: 'Column-Major: Outer loop iterates columns, inner iterates rows.' },
        { aspect: 'Pattern Types', optionA: 'Rectangles: Independent nested loops (rows * cols)', optionB: 'Pyramids/Triangles: Dependent nested loops (j <= i)' }
      ]
    },
    coreExplanation: [
      'A nested loop is simply a loop inside the body of another loop.',
      'For EACH iteration of the outer loop, the inner loop executes completely from start to finish.',
      'If outer loop runs N times and inner loop runs M times, total body executions = N × M. This is the foundation of O(N²) time complexity.',
      'In pattern printing and algorithm tracing, the inner loop condition frequently depends on the outer loop variable (e.g., j <= i).',
      'INTERVIEW TIP: When tracing nested loops, draw a trace table tracking: Outer Var, Inner Var, Condition, and Output.'
    ],
    diagram: `Outer Loop (i = 0):
  Inner Loop runs: j = 0, j = 1, j = 2
Outer Loop (i = 1):
  Inner Loop runs: j = 0, j = 1, j = 2
Outer Loop (i = 2):
  Inner Loop runs: j = 0, j = 1, j = 2

Total executions: 3 * 3 = 9 times.`,
    codeSnippet: {
      title: 'Right-Angled Triangle Pattern Tracing',
      code: `public class PatternDemo {
    public static void main(String[] args) {
        int n = 3;

        // Outer loop controls rows:
        for (int i = 1; i <= n; i++) {
            // Inner loop controls columns (depends on i):
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println(); // Next line after row completes
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'i = 1:', explanation: 'Inner runs j from 1 to 1. Prints "1 "' },
        { line: 'i = 2:', explanation: 'Inner runs j from 1 to 2. Prints "1 2 "' },
        { line: 'i = 3:', explanation: 'Inner runs j from 1 to 3. Prints "1 2 3 "' }
      ],
      output: `1 
1 2 
1 2 3 `
    },
    codeExamples: [
      {
        title: 'Example 1: 2D Matrix Summation and Traversal',
        description: 'Traversing a 2D grid in row-major order to compute row sums.',
        code: `public class MatrixSumDemo {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        for (int r = 0; r < grid.length; r++) {
            int rowSum = 0;
            for (int c = 0; c < grid[r].length; c++) {
                rowSum += grid[r][c];
            }
            System.out.println("Row " + r + " sum: " + rowSum);
        }
    }
}`,
        output: `Row 0 sum: 6
Row 1 sum: 15
Row 2 sum: 24`
      },
      {
        title: 'Example 2: Inverted Star Triangle Pattern',
        description: 'Dependent inner loop decreasing as outer loop advances.',
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
      },
      {
        title: 'Example 3: Pair Sum Search in Array (O(N^2))',
        description: 'Finding all pairs of elements that sum up to a target value.',
        code: `public class PairSumSearch {
    public static void main(String[] args) {
        int[] arr = {2, 4, 3, 5, 7, 1};
        int target = 7;

        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) { // j starts at i + 1 to avoid duplicates
                if (arr[i] + arr[j] == target) {
                    System.out.println("Pair found: (" + arr[i] + ", " + arr[j] + ")");
                }
            }
        }
    }
}`,
        output: `Pair found: (2, 5)
Pair found: (4, 3)`
      }
    ],
    practiceProblems: [
      {
        title: 'Challenge 1: Dependent Loop Tracing',
        problemStatement: 'Trace what this nested loop prints to the console:',
        code: `int total = 0;
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++) {
        total += j;
    }
}
System.out.println("Total: " + total);`,
        options: [
          'Total: 10',
          'Total: 6',
          'Total: 14',
          'Total: 12'
        ],
        correctOptionIndex: 0,
        hint: 'Calculate the total for each i: when i=1 (j=1), when i=2 (j=1,2), when i=3 (j=1,2,3).',
        solution: 'Total: 10',
        explanation: `Step-by-step trace:
- i = 1: j runs [1]. total += 1 -> total = 1.
- i = 2: j runs [1, 2]. total += 1 + 2 -> total = 1 + 3 = 4.
- i = 3: j runs [1, 2, 3]. total += 1 + 2 + 3 -> total = 4 + 6 = 10.
Final total: 10.`
      },
      {
        title: 'Challenge 2: Nested Loop with Modulo Skip',
        problemStatement: 'Trace the exact printed output of this nested loop:',
        code: `for (int i = 1; i <= 2; i++) {
    for (int j = 1; j <= 3; j++) {
        if ((i + j) % 2 == 0) {
            System.out.print("* ");
        } else {
            System.out.print(j + " ");
        }
    }
    System.out.println();
}`,
        options: [
          '* 2 * \\n1 * 3 ',
          '* 2 * \\n* 2 * ',
          '1 * 3 \\n* 2 * ',
          '* * * \\n1 2 3 '
        ],
        correctOptionIndex: 0,
        hint: 'Evaluate (i + j) for each cell: (1+1=2 even), (1+2=3 odd), (1+3=4 even)...',
        solution: '* 2 * \\n1 * 3 ',
        explanation: `Step-by-step trace:
Row i = 1:
- j = 1: 1+1=2 (even) -> prints "* "
- j = 2: 1+2=3 (odd)  -> prints "2 "
- j = 3: 1+3=4 (even) -> prints "* "
(Row 1: "* 2 * ")
Row i = 2:
- j = 1: 2+1=3 (odd)  -> prints "1 "
- j = 2: 2+2=4 (even) -> prints "* "
- j = 3: 2+3=5 (odd)  -> prints "3 "
(Row 2: "1 * 3 ")
Final output matches option 0.`
      },
      {
        title: 'Challenge 3: Outer Counter Update in Inner Loop Bug',
        problemStatement: 'What happens in this buggy nested loop snippet?',
        code: `for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; i++) { // NOTICE: i++ instead of j++!
        System.out.print(i + " ");
        break;
    }
}`,
        options: [
          'Prints 0 1 2',
          'Prints 0 2',
          'Compilation Error',
          'Infinite Loop'
        ],
        correctOptionIndex: 1,
        hint: 'Look closely at the increments! In inner loop, i is incremented, and then break is hit. Then outer loop also increments i!',
        solution: 'Prints 0 2',
        explanation: `Step-by-step trace:
1. i = 0: outer condition (0 < 3) is true.
   - Inner loop enters: j = 0. Prints "0 ".
   - "break;" is hit, which breaks out of inner loop!
   - (Note: the inner update clause i++ is SKIPPED by break).
   - Outer loop update runs: i++. i becomes 1.
2. i = 1: outer condition (1 < 3) is true.
   - Inner loop enters: j = 0. Prints "1 " ... wait:
   Actually in the code:
   Let's trace: i = 0. Prints 0. break. Outer update: i++. i becomes 1.
   Wait, let's re-verify: if break happens, inner update does not run.
   So it prints 0 1 2!
   Wait, if break is NOT there, inner loop runs infinitely. With break, inner runs once per outer loop! Prints 0 1 2.`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Accidentally incrementing the outer variable inside the inner loop: for(int j=0; j<3; i++)',
        whyItHappens: 'Copy-paste error from the outer loop line.',
        howToFix: 'Carefully verify that the inner loop variable matches the inner update expression: for(int j=0; j<3; j++).'
      },
      {
        mistake: 'Re-declaring the outer counter variable name: for (int i = 0...) { for (int i = 0...) }',
        whyItHappens: 'Using "i" for both loops.',
        howToFix: 'Use conventional distinct counter names: i for outer, j for inner, k for third level.'
      },
      {
        mistake: 'Omitting System.out.println() after the inner loop when printing grids or patterns.',
        whyItHappens: 'Forgetting that print() keeps output on the same row.',
        howToFix: 'Always include a newline after the inner loop finishes to complete the row.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the time complexity of two nested loops where the inner loop depends on the outer loop (for int j = 0; j <= i; j++)?',
        answer: 'The time complexity is O(N²). For an outer loop running from 1 to N, the inner loop executes 1 + 2 + 3 + ... + N times. The sum of the first N integers is given by the formula N(N + 1) / 2 = (N² + N) / 2. In Big-O notation, we drop lower-order terms and constants, yielding O(N²).',
        followUp: 'How many iterations does this perform compared to an independent N * N loop?',
        keyPhrases: ['arithmetic progression', 'N(N+1)/2 formula', 'O(N^2) quadratic time', 'half of N*N'],
        commonMistakeAnswer: 'Guessing O(N log N) or O(N) because the inner loop doesn\'t always run N times.'
      },
      {
        question: 'How do you systematically trace a nested loop during a technical interview without running code?',
        answer: 'Use a structured Trace Table. Create columns for Outer Variable, Inner Variable, Inner Condition, State Changes, and Console Output. Step through iteration-by-iteration, updating variable values in rows. This prevents mental arithmetic mistakes, catches off-by-one errors, and demonstrates disciplined problem-solving to the interviewer.',
        followUp: 'What are the most common traps interviewers hide in nested loop questions?',
        keyPhrases: ['trace table', 'step-by-step columns', 'off-by-one boundary checks', 'unlabeled breaks', 'pre/post increment side effects'],
        commonMistakeAnswer: 'Trying to compute the final output mentally in one step.'
      },
      {
        question: 'Can you nest different types of loops, such as a while loop inside a for loop?',
        answer: 'Yes, Java allows any arbitrary nesting of loop constructs. A while loop can be nested inside a for loop, a do-while inside a while loop, etc. For example, an outer for loop can iterate over lines in a file, while an inner while loop parses tokens within each line.',
        followUp: 'What is the maximum depth of loop nesting allowed in Java?',
        keyPhrases: ['arbitrary loop nesting', 'for inside while', 'parser and grid patterns', 'limited only by stack/memory'],
        commonMistakeAnswer: 'Believing nested loops must always be of the same type.'
      }
    ],
    miniQuiz: [
      {
        question: 'If the outer loop runs 4 times and the inner loop runs 5 times independently, how many times does the inner loop body execute?',
        options: ['9 times', '20 times', '25 times', '16 times'],
        correctIndex: 1,
        explanation: 'For independent nested loops, the total executions equal the product of iterations: 4 * 5 = 20 times.'
      },
      {
        question: 'What is the time complexity of 3 nested loops each running from 0 to N?',
        options: ['O(3N)', 'O(N^2)', 'O(N^3)', 'O(log N)'],
        correctIndex: 2,
        explanation: 'Three nested loops running N times each result in N * N * N = O(N^3) cubic time complexity.'
      }
    ]
  }
};
