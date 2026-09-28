import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 4: DECISION MAKING & BRANCHING CAPSTONE (LESSON 4.4)
// ============================================================
export const cf44_challenge_lessons: Record<string, DetailedLesson> = {
  "control-flow-challenge": {
    "id": "control-flow-challenge",
    "moduleId": "java-control-flow",
    "moduleTitle": "4. Decision Making & Branching",
    "lessonNumber": "Lesson 4.4",
    "title": "Module 4 Challenge & Interview Assessment",
    "subtitle": "Branching execution paths, strict boolean conditions, switch fall-through, switch expressions (->), yield keyword, and definite assignment",
    "estimatedMinutes": 25,
    "beginnerAnalogy": "In the Java Language Specification (JLS §§14.9 - 14.11, §15.28), conditional and decision-making statements control the flow of execution through divergent branch pathways evaluated at runtime. Java strictly requires expressions within if, while, and do-while conditions to evaluate to the primitive boolean type or its Boolean wrapper, forbidding truthy or falsy integer evaluations standard in languages like C or C++. Java 14+ standardized switch expressions, introducing arrow syntax (->) with exhaustive pattern matching and the yield keyword to produce values directly from switch blocks.\n\nAt the JVM bytecode level, branching constructs compile into explicit control transfer instructions. If-else ladders compile into conditional jump opcodes such as ifeq, ifne, if_icmpeq, and goto that evaluate the operand stack and alter the program counter (PC) register. Traditional switch statements compile into either tableswitch (for dense contiguous integer values with O(1) indexed jump table lookup) or lookupswitch (for sparse values, strings, or enums with O(log N) binary search on sorted keys). Modern switch expressions enforce compiler-verified exhaustiveness, eliminating default branch omissions at compile time while translating yield statements into stack pushes prior to jump target consolidation.\n\nIn enterprise software architectures, decision constructs govern critical business logic, security gating, and algorithmic dispatch. Improper understanding of fall-through leads to severe vulnerabilities where execution silently bleeds into unauthorized permission blocks. Furthermore, Java's definite assignment rules (JLS §16) require every variable to be guaranteed initialized along all possible branch paths before reading, preventing subtle uninitialized pointer bugs common in legacy systems.",
    "coreExplanation": [
      "Strict Boolean Invariant: Java mandates that conditional expressions evaluate to boolean. An assignment like `if (x = 5)` results in a compile error, fundamentally preventing the accidental assignment bugs common in C-family languages.",
      "Definite Assignment Analysis (JLS §16): Local variables must be definitely assigned before access. If a local variable is initialized inside an `if` block without an `else` block (or with branches that fail to assign it), the compiler flags a 'variable might not have been initialized' error.",
      "Bytecode Branching Mechanics (ifeq vs goto): When evaluating `if (condition)`, javac evaluates the condition onto the operand stack. If false, `ifeq` branches to the start of the `else` block. At the end of the `if` block, an unconditional `goto` instruction jumps over the `else` block to merge execution.",
      "Traditional Switch & Fall-Through: In traditional switch statements (`case X:`), omitting `break` causes execution to fall through sequentially to subsequent case blocks regardless of whether their labels match the selector expression.",
      "Tableswitch vs Lookupswitch Opcodes: Javac optimizes switch statements into two distinct bytecode instructions. Dense contiguous case values generate `tableswitch` providing O(1) indexed table jumps. Sparse case values or String hashes generate `lookupswitch` requiring O(log N) binary searching on sorted keys.",
      "Modern Switch Expressions (Arrow Syntax `->`): Java 14+ switch expressions eliminate accidental fall-through completely. Each case label with arrow syntax executes strictly its target statement, block, or expression.",
      "The `yield` Keyword for Block Expressions: When a case branch in a switch expression requires multiple statements, a block `{}` is used, and the result value is explicitly produced using the `yield` statement.",
      "Exhaustiveness Guarantee: A switch expression must be exhaustive—it must yield a value for every possible state of the selector type. If using enums or sealed classes without covering all possibilities, or when switching on primitives/Strings, a `default` case is strictly mandated by the compiler."
    ],
    "codeSnippet": {
      "title": "Decision Making: Traditional Fall-Through vs Modern Switch Expressions",
      "code": "public class DecisionMastery {\n    public static void main(String[] args) {\n        // 1. Traditional Switch Fall-Through Demonstration\n        int level = 2;\n        int permissions = 0;\n        switch (level) {\n            case 1: permissions |= 1; // Read\n            case 2: permissions |= 2; // Write\n            case 3: permissions |= 4; // Execute\n                break;\n            default: permissions = 0;\n        }\n        // Level 2 falls through to case 3: permissions = 2 | 4 = 6\n        System.out.println(\"Permissions: \" + permissions);\n\n        // 2. Modern Switch Expression with Arrow & Yield\n        String status = \"PENDING\";\n        int priority = switch (status) {\n            case \"CRITICAL\" -> 1;\n            case \"HIGH\", \"URGENT\" -> 2;\n            case \"PENDING\" -> {\n                boolean expedited = true;\n                yield expedited ? 3 : 5;\n            }\n            default -> 10;\n        };\n        System.out.println(\"Priority: \" + priority);\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "switch (level) { case 1: ... case 2: ... case 3: ... }",
          "explanation": "level matches case 2. Because case 2 lacks a break, execution falls through into case 3, setting permissions |= 4."
        },
        {
          "line": "System.out.println(\"Permissions: \" + permissions);",
          "explanation": "Permissions evaluate to 2 | 4 = 6."
        },
        {
          "line": "int priority = switch (status) { ... }",
          "explanation": "Modern switch expression returns a value directly assigned to priority, evaluated exhaustively at compile time."
        },
        {
          "line": "case \"PENDING\" -> { boolean expedited = true; yield expedited ? 3 : 5; }",
          "explanation": "Multi-statement block in switch expression produces a value using the yield keyword."
        }
      ],
      "output": "Permissions: 6\nPriority: 3"
    },
    "beginnerMistakes": [
      {
        "mistake": "Relying on non-boolean conditions like `if (count)` or `if (objectRef)`.",
        "whyItHappens": "Developers coming from JavaScript, Python, or C assume truthy/falsy coercion exists in Java.",
        "howToFix": "Explicitly compare against zero, boolean flags, or null: `if (count > 0)` or `if (objectRef != null)`.",
        "codeSnippet": "// WRONG: if (list.size()) { ... }\n// CORRECT: if (list.size() > 0) { ... }"
      },
      {
        "mistake": "Forgetting break in traditional switch statements leading to accidental fall-through.",
        "whyItHappens": "Traditional switch syntax defaults to fall-through unless explicitly halted with break.",
        "howToFix": "Always include break, or prefer modern arrow syntax `case ->` which completely eliminates fall-through.",
        "codeSnippet": "switch (role) {\n    case ADMIN -> grantAdminAccess();\n    case USER -> grantUserAccess();\n    default -> denyAccess();\n}"
      },
      {
        "mistake": "Unchecked null selector in traditional switch statement.",
        "whyItHappens": "Assuming switch gracefully jumps to `default` when evaluating a null reference.",
        "howToFix": "Traditional switch throws NullPointerException immediately if the selector is null. Guard the expression or use Java 17+ `case null`.",
        "codeSnippet": "String code = null;\n// Throws NullPointerException immediately at runtime in traditional switch:\nswitch (code) {\n    case \"A\": break;\n    default: break;\n}"
      },
      {
        "mistake": "Failing definite assignment inside conditional branches.",
        "whyItHappens": "Declaring a local variable and initializing it inside `if` without covering the `else` path.",
        "howToFix": "Initialize local variables at declaration, or guarantee assignment in all branch permutations.",
        "codeSnippet": "int result;\nif (condition) {\n    result = 10;\n}\n// Compile error: variable result might not have been initialized\nSystem.out.println(result);"
      }
    ],
    "cheatSheet": {
      "summary": "Module 4 Decision Making & Branching Technical Reference",
      "rules": [
        {
          "rule": "Strict Boolean Condition Invariant",
          "explanation": "JLS §14.9 mandates that conditional test expressions evaluate strictly to type boolean."
        },
        {
          "rule": "Definite Assignment Requirement",
          "explanation": "JLS §16 requires compiler-proven definite assignment of local variables along every possible execution path before reading."
        },
        {
          "rule": "Traditional Switch Fall-Through",
          "explanation": "Omitting break causes unconditional execution of subsequent case blocks until break or block termination."
        },
        {
          "rule": "Tableswitch vs Lookupswitch",
          "explanation": "JVM uses tableswitch (O(1)) for dense integer ranges and lookupswitch (O(log N)) for sparse values and strings."
        },
        {
          "rule": "Modern Switch Arrow Syntax (->)",
          "explanation": "Arrow syntax executes strictly the matching arm without fall-through, preventing accidental bleed-through."
        },
        {
          "rule": "The yield Keyword",
          "explanation": "Yield produces a value from a multi-statement block inside a modern switch expression."
        },
        {
          "rule": "Switch Expression Exhaustiveness",
          "explanation": "Switch expressions must handle all possible selector values; omission of cases without default causes compilation error."
        },
        {
          "rule": "Null Selector Behavior",
          "explanation": "Traditional switch on null throws NullPointerException before evaluating any case or default labels."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Fall-Through",
          "optionA": "Traditional switch (`case :`) falls through unless `break` is present",
          "optionB": "Modern switch (`case ->`) strictly isolates arm execution without fall-through"
        },
        {
          "aspect": "Return Value",
          "optionA": "Switch statement executes side-effects only (void)",
          "optionB": "Switch expression evaluates and returns a typed value directly"
        },
        {
          "aspect": "Exhaustiveness",
          "optionA": "Traditional switch statement does not require default",
          "optionB": "Modern switch expression strictly mandates exhaustive case coverage"
        },
        {
          "aspect": "Multi-Statement Blocks",
          "optionA": "Traditional switch groups statements under case label",
          "optionB": "Modern switch expression requires `{ ... yield value; }`"
        },
        {
          "aspect": "Bytecode Dispatch",
          "optionA": "Tableswitch: direct indexed jump O(1)",
          "optionB": "Lookupswitch: binary search key table O(log N)"
        }
      ]
    },
    "practiceProblems": [
      {
        "title": "Puzzle 1: Nested Switch Fall-Through Cascade",
        "problemStatement": "Determine the exact integer value of count printed by this program:",
        "code": "public class Problem1 {\n    public static void main(String[] args) {\n        int x = 2;\n        int count = 0;\n        switch (x) {\n            case 1: count += 10;\n            case 2: count += 20;\n            case 3: count += 30;\n                break;\n            case 4: count += 40;\n            default: count += 50;\n        }\n        System.out.println(count);\n    }\n}",
        "options": [
          "50",
          "20",
          "150",
          "100"
        ],
        "correctOptionIndex": 0,
        "hint": "x matches case 2. count adds 20. There is no break after case 2, so execution cascades into case 3. What does case 3 add before breaking?",
        "solution": "Output: 50",
        "explanation": "x matches case 2: count becomes 0 + 20 = 20. Without a break, execution falls through into case 3: count becomes 20 + 30 = 50. Case 3 contains break, terminating the switch."
      },
      {
        "title": "Puzzle 2: Definite Assignment in If-Else",
        "problemStatement": "What is the compiler or runtime behavior of the following code?",
        "code": "public class Problem2 {\n    public static void main(String[] args) {\n        int a = 10;\n        int b;\n        if (a > 5) {\n            b = 100;\n        } else if (a <= 5) {\n            b = 200;\n        }\n        System.out.println(b);\n    }\n}",
        "options": [
          "Compile Error: variable b might not have been initialized",
          "Prints 100",
          "Prints 0",
          "Runtime Exception"
        ],
        "correctOptionIndex": 0,
        "hint": "Does the Java compiler analyze mathematical complements (a > 5 vs a <= 5) when enforcing definite assignment?",
        "solution": "Output: Compile Error",
        "explanation": "Per JLS §16, definite assignment analysis does not evaluate mathematical relationship consistency between conditions. Because there is no terminal `else` block, the compiler cannot verify that `b` is assigned along all possible control flow paths."
      },
      {
        "title": "Puzzle 3: Modern Switch Expression Multiple Labels",
        "problemStatement": "What is the output of the modern switch expression for month = 4?",
        "code": "public class Problem3 {\n    public static void main(String[] args) {\n        int month = 4;\n        int days = switch (month) {\n            case 1, 3, 5, 7, 8, 10, 12 -> 31;\n            case 4, 6, 9, 11 -> 30;\n            case 2 -> 28;\n            default -> 0;\n        };\n        System.out.println(days);\n    }\n}",
        "options": [
          "30",
          "31",
          "28",
          "0"
        ],
        "correctOptionIndex": 0,
        "hint": "Comma-separated case labels match if month equals any of the listed values.",
        "solution": "Output: 30",
        "explanation": "month is 4, which matches the label list `case 4, 6, 9, 11`. The switch expression directly produces 30 without fall-through."
      },
      {
        "title": "Puzzle 4: Switch on String with Null Reference",
        "problemStatement": "What occurs when this switch statement executes with a null String variable?",
        "code": "public class Problem4 {\n    public static void main(String[] args) {\n        String role = null;\n        switch (role) {\n            case \"ADMIN\": System.out.println(\"Admin\"); break;\n            case \"USER\": System.out.println(\"User\"); break;\n            default: System.out.println(\"Guest\"); break;\n        }\n    }\n}",
        "options": [
          "Throws NullPointerException at runtime",
          "Prints Guest",
          "Prints null",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Traditional switch compiles String matching by first invoking role.hashCode().",
        "solution": "Output: Exception in thread \"main\" java.lang.NullPointerException",
        "explanation": "Traditional switch statements on String compile by invoking `.hashCode()` on the selector expression. Dereferencing null triggers a NullPointerException before any cases or default are evaluated."
      },
      {
        "title": "Puzzle 5: Switch Expression Yield in Block",
        "problemStatement": "Determine the output produced by the switch expression with block yield:",
        "code": "public class Problem5 {\n    public static void main(String[] args) {\n        int code = 2;\n        int result = switch (code) {\n            case 1 -> 10;\n            case 2 -> {\n                int factor = 5;\n                yield factor * 8;\n            }\n            default -> 0;\n        };\n        System.out.println(result);\n    }\n}",
        "options": [
          "40",
          "10",
          "0",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "In switch expressions, multi-statement blocks produce their evaluation value via yield.",
        "solution": "Output: 40",
        "explanation": "code matches case 2. The block executes: factor = 5, factor * 8 = 40. The yield statement returns 40 as the switch expression's value."
      },
      {
        "title": "Puzzle 6: Dangling Else Ambiguity Binding",
        "problemStatement": "To which if statement does the else clause bind in this snippet?",
        "code": "public class Problem6 {\n    public static void main(String[] args) {\n        int x = 5;\n        int y = 15;\n        if (x > 10)\n            if (y > 10)\n                System.out.println(\"A\");\n        else\n            System.out.println(\"B\");\n    }\n}",
        "options": [
          "Prints nothing",
          "Prints B",
          "Prints A",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Per JLS §14.9.2, an else clause always associates with the nearest preceding if statement that does not already have an else clause.",
        "solution": "Output: (Prints nothing)",
        "explanation": "The else binds to the inner `if (y > 10)`, NOT the outer `if (x > 10)`. Because x is 5 (not > 10), the outer if evaluates to false, skipping the entire inner block. Nothing is printed."
      },
      {
        "title": "Puzzle 7: Tableswitch Dense Jump Table",
        "problemStatement": "Which bytecode opcode is generated for a switch with case values 1, 2, 3, 4, 5?",
        "code": "// Bytecode inspection:\nswitch (x) {\n    case 1: break;\n    case 2: break;\n    case 3: break;\n    case 4: break;\n    case 5: break;\n}",
        "options": [
          "tableswitch",
          "lookupswitch",
          "invokevirtual",
          "goto_w"
        ],
        "correctOptionIndex": 0,
        "hint": "When case labels form a compact, contiguous integer range, the compiler creates an indexed jump table.",
        "solution": "Output: tableswitch",
        "explanation": "javac analyzes case density. For dense contiguous values, it emits `tableswitch` which indexes an offset table directly in O(1) time without comparisons."
      },
      {
        "title": "Puzzle 8: Conditional Ternary Short-Circuit in Assignment",
        "problemStatement": "What are the values of a and b after this conditional execution?",
        "code": "public class Problem8 {\n    public static void main(String[] args) {\n        int a = 0;\n        int b = 0;\n        boolean test = true || (++a > 0);\n        if (test) {\n            b = 1;\n        }\n        System.out.println(a + \" \" + b);\n    }\n}",
        "options": [
          "0 1",
          "1 1",
          "0 0",
          "1 0"
        ],
        "correctOptionIndex": 0,
        "hint": "In true || (++a > 0), the left operand is true. Does short-circuit evaluation execute the right operand?",
        "solution": "Output: 0 1",
        "explanation": "Because the left operand of || is true, the right operand (++a > 0) is bypassed due to short-circuiting. a remains 0. test is true, so b is assigned 1. Output: 0 1."
      },
      {
        "title": "Puzzle 9: Fall-Through After Default in Middle",
        "problemStatement": "What is printed when default is placed before other cases and fall-through occurs?",
        "code": "public class Problem9 {\n    public static void main(String[] args) {\n        int x = 99;\n        int res = 0;\n        switch (x) {\n            default: res += 5;\n            case 1: res += 10;\n            case 2: res += 20;\n                break;\n            case 3: res += 30;\n        }\n        System.out.println(res);\n    }\n}",
        "options": [
          "35",
          "5",
          "65",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "x does not match 1, 2, or 3, so execution jumps to default. Because default has no break, execution continues downward.",
        "solution": "Output: 35",
        "explanation": "x = 99 matches default. res += 5 (res = 5). Without break, execution falls through to case 1: res += 10 (res = 15), then to case 2: res += 20 (res = 35). Case 2 has break, ending the switch."
      },
      {
        "title": "Puzzle 10: Switch Expression Type Inference",
        "problemStatement": "What is the static type inferred by var in this switch expression?",
        "code": "public class Problem10 {\n    public static void main(String[] args) {\n        int code = 1;\n        var val = switch (code) {\n            case 1 -> \"Active\";\n            case 2 -> \"Suspended\";\n            default -> \"Unknown\";\n        };\n        System.out.println(val.length());\n    }\n}",
        "options": [
          "String",
          "Object",
          "CharSequence",
          "Comparable"
        ],
        "correctOptionIndex": 0,
        "hint": "All arms of the switch expression return String literals.",
        "solution": "Output: String",
        "explanation": "Because all branches of the switch expression evaluate to String, the compiler infers the exact type String for the local variable `val`, allowing direct access to `.length()`."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-44-1",
        "question": "Which bytecode opcode is generated for a switch statement with sparse, widely separated case constants?",
        "options": [
          "lookupswitch",
          "tableswitch",
          "ifeq",
          "checkcast"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "javac emits `lookupswitch` when case values are sparse, performing an O(log N) binary search on sorted keys."
      },
      {
        "id": "mq-44-2",
        "question": "Why does `if (x = 5)` cause a compile error in Java for integer `x`?",
        "options": [
          "Because Java strictly requires conditional expressions to evaluate to type boolean",
          "Because the assignment operator cannot be used inside methods",
          "Because 5 is not an object",
          "Because the equals method is required"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Java enforces a strict boolean invariant for conditionals. Assignment `x = 5` yields int 5, causing a type mismatch error."
      },
      {
        "id": "mq-44-3",
        "question": "What happens when a traditional switch expression on a String encounters a null reference at runtime?",
        "options": [
          "Throws NullPointerException immediately",
          "Jumps directly to the default case",
          "Evaluates to an empty string",
          "Skips the switch statement"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "The JVM invokes `.hashCode()` on the selector expression, which throws NullPointerException immediately upon dereferencing null."
      },
      {
        "id": "mq-44-4",
        "question": "In modern switch expressions (Java 14+), what keyword is used to return a value from a multi-statement block?",
        "options": [
          "yield",
          "return",
          "break",
          "pass"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "The `yield` keyword yields a value from a block within a switch expression, distinguishing expression returns from method returns."
      },
      {
        "id": "mq-44-5",
        "question": "Under what condition is a `default` branch strictly required in a modern switch expression?",
        "options": [
          "When the cases do not exhaustively cover all possible values of the selector type",
          "In every switch expression regardless of enum coverage",
          "Only when switching on booleans",
          "Never; default is always optional"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Switch expressions must be exhaustive. If the selector type is int, String, or an enum where not all constants are handled, a default branch is mandatory."
      },
      {
        "id": "mq-44-6",
        "question": "Does modern switch arrow syntax (`case ->`) permit fall-through to subsequent arms?",
        "options": [
          "No, arrow syntax eliminates fall-through entirely",
          "Yes, unless break is specified",
          "Yes, if multiple comma-separated labels are used",
          "Yes, only between consecutive number cases"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Arrow syntax (`->`) executes only the matching case arm, preventing fall-through without requiring `break`."
      },
      {
        "id": "mq-44-7",
        "question": "What rule governs the association of an `else` branch when nested `if` statements are unbracketed?",
        "options": [
          "The else clause binds to the nearest preceding if statement that lacks an else",
          "The else clause binds to the outermost if statement",
          "The compiler flags an ambiguous syntax error",
          "The else clause binds based on indentation whitespace"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §14.9.2 (the dangling-else rule), `else` binds to the nearest preceding unclosed `if`."
      },
      {
        "id": "mq-44-8",
        "question": "Which of the following data types cannot be used as the selector expression in a switch statement?",
        "options": [
          "float",
          "byte",
          "String",
          "char"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Floating-point types (float, double), boolean, and long cannot be used as switch selectors in standard Java switch statements."
      },
      {
        "id": "mq-44-9",
        "question": "What does Java's definite assignment analysis (JLS §16) ensure?",
        "options": [
          "That every local variable is assigned a value along all execution paths before being read",
          "That all class variables are initialized to zero",
          "That heap memory is garbage collected",
          "That methods always return non-null values"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Definite assignment proves at compile time that every local variable has been initialized before any access occurs."
      },
      {
        "id": "mq-44-10",
        "question": "Can multiple case constants be grouped on a single line in modern switch syntax?",
        "options": [
          "Yes, using comma-separated values: `case A, B, C ->`",
          "No, each case requires its own line",
          "Yes, using bitwise OR: `case A | B | C ->`",
          "Yes, using semicolon: `case A; B; C ->`"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Java 14+ allows comma-separated case labels on a single arm: `case 1, 2, 3 ->`."
      },
      {
        "id": "mq-44-11",
        "question": "What bytecode instruction jumps unconditionally to another location?",
        "options": [
          "goto",
          "ifeq",
          "ifne",
          "nop"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`goto` performs an unconditional jump to the specified target bytecode offset."
      },
      {
        "id": "mq-44-12",
        "question": "What is the result of switching on an enum type when all enum constants are covered by arrow cases without a default?",
        "options": [
          "Compiles cleanly and satisfies exhaustiveness",
          "Fails to compile because default is always mandatory",
          "Throws an EnumConstantNotPresentException",
          "Causes a warning at runtime"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "When switching on an enum, covering all declared enum constants satisfies exhaustiveness without requiring a redundant `default` case."
      },
      {
        "id": "mq-44-13",
        "question": "What happens if a switch expression block does not yield a value along all possible paths?",
        "options": [
          "Compile error: switch expression must yield a value along all paths",
          "Returns null automatically",
          "Returns 0 automatically",
          "Throws a NoSuchElementException at runtime"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "A switch expression block must terminate with a `yield` or throw an exception along every possible branch; otherwise, javac flags a compile error."
      },
      {
        "id": "mq-44-14",
        "question": "In Java bytecode, how are String values matched inside a switch statement?",
        "options": [
          "By matching hashCodes via lookupswitch, then confirming equality with String.equals()",
          "By comparing memory pointer addresses directly",
          "By lexicographical compareTo sorting at runtime",
          "By converting strings to integers via Integer.parseInt()"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Javac compiles String switches by evaluating `.hashCode()` with a `lookupswitch` or `tableswitch`, followed by `.equals()` checks to guard against hash collisions."
      },
      {
        "id": "mq-44-15",
        "question": "What is the scope of a local variable declared inside a modern switch arrow arm: `case 1 -> { int x = 10; yield x; }`?",
        "options": [
          "Strictly scoped within the curly brace block of that case arm",
          "Shared across all cases in the switch statement",
          "Scoped to the entire enclosing method",
          "Accessible to the default case"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Variables declared inside curly braces of a case arm are strictly block-scoped to that arm, preventing variable scope pollution across cases."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain the difference between tableswitch and lookupswitch bytecodes. When does javac emit each?",
        "expectedAnswer": "Javac compiles switch statements into either `tableswitch` or `lookupswitch`. When case constants form a dense, contiguous (or nearly contiguous) integer range, javac generates `tableswitch`. In bytecode, `tableswitch` stores a direct array of jump targets indexed from min to max; the JVM computes the target in O(1) time using an array offset lookup. When case constants are sparse with large gaps, generating a dense table would waste memory with empty target slots. In that case, javac emits `lookupswitch`, which stores sorted pairs of (case value, target offset) and executes an O(log N) binary search. For Strings, javac hashes the strings and uses lookupswitch on the hashCodes.",
        "followUp": "Why does a String switch require a secondary comparison after matching the hash code?",
        "followUpAnswer": "Hash codes are not unique; different strings can produce identical hash codes (hash collision). To guarantee semantic correctness, bytecode must verify string equality using `.equals()` after the hash code matches.",
        "commonMistake": "Thinking switch statements are always faster than if-else ladders in all scenarios.",
        "commonMistakeAnswer": "If there are only 1 or 2 conditions, the branch prediction of `ifeq` is faster than table setup overhead.",
        "keyPhrases": [
          "tableswitch direct O(1) indexed jump",
          "lookupswitch binary search O(log N)",
          "case density analysis by javac",
          "String hashCode collision resolution with equals()"
        ]
      },
      {
        "question": "How do modern switch expressions (Java 14+) differ from traditional switch statements in semantics, syntax, and safety?",
        "expectedAnswer": "Modern switch expressions introduce four primary architectural improvements: 1) Syntax: Arrow syntax (`case ->`) executes only the matching arm, eliminating accidental fall-through and removing the need for error-prone `break` statements. 2) Evaluation: Switch expressions evaluate to a typed value that can be assigned directly to variables or returned from methods. 3) Block returns: Multi-statement arms use the `yield` keyword to return values explicitly. 4) Exhaustiveness: The compiler verifies exhaustiveness at compile time, guaranteeing that every possible state of the selector type is covered, which eliminates unhandled runtime edge cases.",
        "followUp": "Can you use both arrow syntax (->) and colon syntax (:) in the same switch statement?",
        "followUpAnswer": "No. JLS strictly prohibits mixing arrow rules and colon rules within the same switch block; doing so generates a compile-time error.",
        "commonMistake": "Confusing yield with return.",
        "commonMistakeAnswer": "Return exits the enclosing method immediately, whereas yield produces a value for the switch expression while keeping execution inside the method.",
        "keyPhrases": [
          "arrow syntax (->) eliminating fall-through",
          "typed value return capability",
          "yield keyword for block expressions",
          "compiler-enforced exhaustiveness"
        ]
      },
      {
        "question": "What is definite assignment analysis (JLS §16) and how does it affect variable initialization across if-else ladders?",
        "expectedAnswer": "Definite assignment is a compile-time analysis performed by the Java compiler ensuring that every local variable has a definitely assigned value before any access or read operation occurs. If a variable is assigned inside an `if` block, the compiler traces all execution paths. If an `else` path exists that does not assign the variable, or if the ladder terminates without a fallback `else`, the variable is classified as 'not definitely assigned', causing a compilation error. Definite assignment ensures that uninitialized memory bits are never read, maintaining Java's memory safety guarantees.",
        "followUp": "Why doesn't the compiler recognize that `if (x > 0) a = 1; if (x <= 0) a = 2;` covers all cases?",
        "followUpAnswer": "Definite assignment operates on formal syntactic control-flow graphs, not mathematical logic or range analysis. It treats each independent `if` condition as potentially independent, so it cannot prove that the second `if` executes when the first fails.",
        "commonMistake": "Assuming local variables receive default zero values like instance fields.",
        "commonMistakeAnswer": "Local variables on the stack frame are uninitialized by default; the compiler strictly enforces assignment before reading.",
        "keyPhrases": [
          "JLS §16 definite assignment",
          "control-flow graph analysis",
          "mandatory assignment before read",
          "absence of default values on stack frame"
        ]
      },
      {
        "question": "What occurs when null is passed as the selector expression to a traditional switch statement versus modern pattern matching switch?",
        "expectedAnswer": "In a traditional switch statement (Java 7 through 16), passing `null` as the selector expression causes the JVM to throw a `NullPointerException` immediately upon entering the switch block, before any `case` or `default` label is evaluated. In Java 21+ pattern matching for switch (JLS §14.11.1), developers can explicitly define a `case null` label (or `case null, default ->`). If a null selector is evaluated and `case null` is declared, execution branches safely into that arm without throwing an exception.",
        "followUp": "What happens in Java 21+ if `case null` is omitted and a null selector is evaluated?",
        "followUpAnswer": "It preserves backward compatibility and throws NullPointerException immediately.",
        "commonMistake": "Assuming `default` catches null in traditional switch statements.",
        "commonMistakeAnswer": "In traditional switch, null triggers an immediate NullPointerException before `default` is ever considered.",
        "keyPhrases": [
          "immediate NullPointerException on null selector",
          "case null label in modern Java",
          "backward compatibility preservation",
          "dereferencing before case evaluation"
        ]
      },
      {
        "question": "Explain the 'dangling else' problem in Java and how the language specification resolves it.",
        "expectedAnswer": "The dangling else problem occurs in nested if-else structures when an `else` clause follows nested `if` statements without explicit curly braces. Because grammar can ambiguously bind the `else` to either the outer or inner `if`, JLS §14.9.2 formally dictates that an `else` keyword always associates with the nearest preceding `if` statement that does not already have an `else` clause. To prevent logical defects and misinterpretation by developers, enterprise coding standards mandate wrapping all branch bodies in explicit curly braces `{}`.",
        "followUp": "How do modern linters (such as Checkstyle, PMD, SonarQube) enforce this?",
        "followUpAnswer": "They enforce the 'NeedBraces' rule, flagging compile-time warnings or build failures for any unbraced if, else, for, or while statements.",
        "commonMistake": "Believing compiler indentation or whitespace influences else association.",
        "commonMistakeAnswer": "Java is free-form and ignores whitespace; only syntax token ordering determines AST binding.",
        "keyPhrases": [
          "dangling else ambiguity",
          "JLS §14.9.2 nearest preceding if binding",
          "mandatory curly braces rule",
          "AST token association"
        ]
      },
      {
        "question": "Why does Java disallow switching on long, float, double, and boolean in traditional switch statements?",
        "expectedAnswer": "Traditional switch statements were designed around the JVM's `tableswitch` and `lookupswitch` opcodes, which operate exclusively on 32-bit integer values (`int`). Types narrower than int (byte, short, char) are promoted to int per JLS rules. Floating-point types (`float`, `double`) are disallowed due to IEEE 754 precision issues (such as representation error and `NaN != NaN`), which make exact equality matching problematic. `long` was excluded because 64-bit jump tables would require 64-bit table opcodes that increase bytecode overhead. `boolean` was excluded because `if-else` handles two states more efficiently.",
        "followUp": "Can pattern matching switch in modern Java switch on record types containing doubles?",
        "followUpAnswer": "Yes, record patterns and type patterns in Java 21+ allow pattern matching on arbitrary objects, delegating equality to pattern guards (`when` clauses).",
        "commonMistake": "Believing String is a primitive because it can be used in switch.",
        "commonMistakeAnswer": "String support was added in Java 7 by compiling to hashCode integers followed by equals checks.",
        "keyPhrases": [
          "32-bit integer bytecode opcode constraint",
          "IEEE 754 floating-point equality ambiguity",
          "absence of 64-bit jump table opcodes",
          "binary numeric promotion to int"
        ]
      },
      {
        "question": "How does compiler branch prediction and bytecode ordering optimize high-frequency if-else ladders?",
        "expectedAnswer": "Modern JVMs (HotSpot C2 JIT) monitor branch profiling counters during execution. If an `if` condition evaluates to true 99% of the time, the JIT reorders the machine code so that the predicted fall-through path avoids hardware branch mispredictions. In source code, developers optimize critical performance paths by placing the most probable conditions at the top of the ladder to minimize sequential condition evaluation overhead.",
        "followUp": "What is the penalty of a CPU branch misprediction?",
        "followUpAnswer": "A branch misprediction flushes the CPU instruction pipeline, costing 10 to 20 clock cycles of latency while instructions are refetched.",
        "commonMistake": "Placing rarely triggered error conditions at the top of high-throughput request loops.",
        "commonMistakeAnswer": "Evaluating false conditions on every iteration wastes CPU cycles; place the hot path first.",
        "keyPhrases": [
          "JIT branch profiling counters",
          "hardware branch prediction pipeline",
          "instruction pipeline flush latency",
          "hot-path condition ordering"
        ]
      },
      {
        "question": "What is the purpose of pattern matching for switch introduced in Java 21 (JLS §14.11)?",
        "expectedAnswer": "Pattern matching for switch enhances the switch construct to accept any object selector and match against type patterns, record patterns, and guarded conditions. It eliminates verbose chains of `if (obj instanceof Type) { Type t = (Type) obj; ... }`. Furthermore, pattern switch supports guarded patterns using the `when` clause (e.g. `case String s when s.length() > 5 -> ...`), and enforces exhaustiveness for sealed class hierarchies without requiring a default clause.",
        "followUp": "What is the dominance rule in pattern matching switch?",
        "followUpAnswer": "A pattern cannot be preceded by a pattern that dominates it (e.g. `case Object o` cannot appear before `case String s`), or javac fails with a compile error because the subsequent case would be unreachable.",
        "commonMistake": "Placing base class patterns before subclass patterns.",
        "commonMistakeAnswer": "Subclasses must precede superclasses in case arms to avoid unreachable case compile errors.",
        "keyPhrases": [
          "type patterns and record patterns",
          "guarded patterns with when clause",
          "dominance and reachability rules",
          "sealed hierarchy exhaustiveness"
        ]
      },
      {
        "question": "What is the difference between an if-else ladder and a switch statement in terms of time complexity?",
        "expectedAnswer": "An if-else ladder evaluates conditions sequentially from top to bottom, resulting in O(N) time complexity where N is the number of conditions. In contrast, a switch statement compiles into `tableswitch` (providing O(1) constant time direct table indexing) or `lookupswitch` (providing O(log N) binary search on sorted keys). For large numbers of cases (> 4-5 branches), switch statements significantly outperform if-else ladders.",
        "followUp": "When would an if-else ladder outperform a switch statement?",
        "followUpAnswer": "When evaluating range conditions (e.g. `x >= 10 && x < 50`) or complex non-equality expressions that cannot be represented as discrete constants.",
        "commonMistake": "Assuming javac automatically converts large if-else ladders into jump tables.",
        "commonMistakeAnswer": "Javac does not convert if-else ladders into jump tables; they remain sequential conditional branch instructions.",
        "keyPhrases": [
          "O(N) sequential condition evaluation",
          "O(1) tableswitch jump table",
          "O(log N) lookupswitch binary search",
          "range check limitations of switch"
        ]
      },
      {
        "question": "Explain the architectural danger of switch fall-through in mission-critical applications.",
        "expectedAnswer": "Switch fall-through occurs when a `case` block lacks a terminating `break`, `return`, or `yield`, causing execution to cascade into the next case regardless of whether its condition matched. In security or financial systems, accidental fall-through has caused famous catastrophic vulnerabilities: for instance, authenticating as a guest and falling through into the administrator execution block. Modern Java arrow syntax (`case ->`) was explicitly designed to eliminate this class of software defect.",
        "followUp": "Is intentional fall-through ever acceptable in enterprise code?",
        "followUpAnswer": "Only when grouping multiple labels that share identical logic (e.g. `case A, B, C ->` in modern syntax, or stacked `case A: case B:` in legacy code).",
        "commonMistake": "Assuming unit tests easily catch all fall-through bugs.",
        "commonMistakeAnswer": "Fall-through often passes nominal tests and only triggers unexpected side-effects under specific edge-case input permutations.",
        "keyPhrases": [
          "accidental fall-through vulnerability",
          "security privilege escalation risk",
          "arrow syntax safety advantage",
          "stacked case label grouping"
        ]
      }
    ]
  }
};
