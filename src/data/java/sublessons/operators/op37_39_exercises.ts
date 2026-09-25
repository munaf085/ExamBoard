import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================================
// DEDICATED HANDS-ON CODING EXERCISES FOR LESSONS 3.7, 3.8, AND 3.9
// Strict Constraints: ZERO loops, ZERO custom methods, pure main() runnable code.
// Clean titles without leading badge numbers.
// ============================================================================

export const op37_39_exercises: Record<string, ProgrammingExercise[]> = {
  // ==========================================================================
  // LESSON 3.7: Bitwise & Shift Operators (10 Exercises)
  // ==========================================================================
  'bitwise-shift-operators': [
    {
      id: 'op-bit-parity',
      title: 'Bitwise AND Parity and Least Significant Bit Check',
      problemStatement: `In binary representation, the lowest bit (Least Significant Bit, LSB) determines whether an integer is odd or even.
Write a program that initializes an integer variable \`number = 29\` and uses the bitwise AND operator (\`&\`) with \`1\` to extract its LSB and determine its parity.

Input Format: \`int number = 29;\`
Output Format:
Number: 29
Least Significant Bit: 1
Is Odd: true`,
      hint: 'Mask the number using `number & 1`. If the result is 1, the number is odd; if 0, it is even.',
      solutionCode: `public class BitwiseParityCheck {
    public static void main(String[] args) {
        int number = 29;
        int lsb = number & 1;
        boolean isOdd = (lsb == 1);

        System.out.println("Number: " + number);
        System.out.println("Least Significant Bit: " + lsb);
        System.out.println("Is Odd: " + isOdd);
    }
}`,
      output: `Number: 29
Least Significant Bit: 1
Is Odd: true`,
      explanation: 'Binary 29 is 0001_1101. Bitwise AND with 1 (0000_0001) isolates the lowest bit, which is 1, proving 29 is odd.'
    },
    {
      id: 'op-bit-flag-masking',
      title: 'Bitwise OR and AND-NOT Feature Flag Masking',
      problemStatement: `Operating systems pack permission settings into a single integer using powers of two.
Define flags: READ = 1 (bit 0), WRITE = 2 (bit 1), EXECUTE = 4 (bit 2).
Write a program that:
1. Starts with \`userPerms = 0\`.
2. Grants READ and EXECUTE permissions using bitwise OR (\`|\`).
3. Checks if the user has WRITE permission using \`&\`.
4. Revokes EXECUTE permission using bitwise AND with bitwise NOT (\`& ~EXECUTE\`).
5. Prints the permission state after each step.`,
      hint: 'Use `perms | FLAG` to add a flag, `(perms & FLAG) != 0` to check a flag, and `perms & (~FLAG)` to remove a flag.',
      solutionCode: `public class PermissionFlags {
    public static void main(String[] args) {
        int READ = 1;
        int WRITE = 2;
        int EXECUTE = 4;

        int userPerms = 0;
        userPerms = userPerms | READ | EXECUTE;
        System.out.println("Granted READ and EXECUTE: " + userPerms);

        boolean hasWrite = (userPerms & WRITE) != 0;
        System.out.println("Has WRITE permission: " + hasWrite);

        userPerms = userPerms & (~EXECUTE);
        System.out.println("After revoking EXECUTE: " + userPerms);
        System.out.println("Has EXECUTE permission now: " + ((userPerms & EXECUTE) != 0));
    }
}`,
      output: `Granted READ and EXECUTE: 5
Has WRITE permission: false
After revoking EXECUTE: 1
Has EXECUTE permission now: false`,
      explanation: 'READ (1) | EXECUTE (4) produces 5 (0101). Masking with WRITE (2) yields 0 (false). ANDing with ~EXECUTE (~4) clears bit 2, leaving 1.'
    },
    {
      id: 'op-bit-xor-swap',
      title: 'In-Place Variable Swap with Bitwise XOR',
      problemStatement: `Write a program that swaps two integer variables \`a = 64\` and \`b = 125\` without creating or using any temporary holding variable.
Use the three-step XOR swap algorithm:
1. \`a = a ^ b;\`
2. \`b = a ^ b;\`
3. \`a = a ^ b;\`
Print both variables before and after the swap.`,
      hint: 'XOR satisfies x ^ x = 0 and x ^ 0 = x. Applying XOR three times exchanges the values in place.',
      solutionCode: `public class XorVariableSwap {
    public static void main(String[] args) {
        int a = 64;
        int b = 125;

        System.out.println("Before swap: a = " + a + ", b = " + b);

        a = a ^ b;
        b = a ^ b;
        a = a ^ b;

        System.out.println("After swap: a = " + a + ", b = " + b);
    }
}`,
      output: `Before swap: a = 64, b = 125
After swap: a = 125, b = 64`,
      explanation: 'In step 1, a stores the XOR difference. In step 2, b = (a ^ b) ^ b = a. In step 3, a = (a ^ b) ^ a = b. Zero extra memory is required.'
    },
    {
      id: 'op-bit-shift-arithmetic',
      title: 'Multiplying and Dividing Powers of Two with Shifts',
      problemStatement: `Bitwise left shift (\`<<\`) and right shift (\`>>\`) provide fast arithmetic for powers of two.
Given \`int base = 14;\`:
1. Multiply \`base\` by 8 using left shift (\`<< 3\`).
2. Divide \`base\` by 4 using right shift (\`>> 2\`).
Print the original, multiplied, and divided results.`,
      hint: '`x << n` multiplies x by 2^n. `x >> n` divides x by 2^n.',
      solutionCode: `public class ShiftArithmetic {
    public static void main(String[] args) {
        int base = 14;
        int multiplied = base << 3; // 14 * (2^3) = 14 * 8 = 112
        int divided = base >> 2;    // 14 / (2^2) = 14 / 4 = 3 (integer division)

        System.out.println("Original: " + base);
        System.out.println("Multiplied by 8 (<< 3): " + multiplied);
        System.out.println("Divided by 4 (>> 2): " + divided);
    }
}`,
      output: `Original: 14
Multiplied by 8 (<< 3): 112
Divided by 4 (>> 2): 3`,
      explanation: 'Shifting left by 3 bits multiplies 14 by 8 = 112. Shifting right by 2 bits divides 14 by 4 = 3 (truncating the remainder).'
    },
    {
      id: 'op-bit-toggle-status',
      title: 'Toggling Specific Bit Flags with Bitwise XOR',
      problemStatement: `Write a program that uses bitwise XOR (\`^\`) to toggle status flags.
Given an initial status code \`int status = 5\` (binary 0101):
1. Toggle bit 1 (value 2) using XOR.
2. Toggle bit 0 (value 1) using XOR.
Print the status value after each toggle operation.`,
      hint: 'XORing a bit with 1 flips it (0 becomes 1, 1 becomes 0). XORing with 0 leaves it unchanged.',
      solutionCode: `public class ToggleStatusBits {
    public static void main(String[] args) {
        int status = 5; // 0101
        System.out.println("Initial status: " + status);

        // Toggle bit 1 (mask 2: 0010) -> 0101 ^ 0010 = 0111 (7)
        status = status ^ 2;
        System.out.println("After toggling bit 1: " + status);

        // Toggle bit 0 (mask 1: 0001) -> 0111 ^ 0001 = 0110 (6)
        status = status ^ 1;
        System.out.println("After toggling bit 0: " + status);
    }
}`,
      output: `Initial status: 5
After toggling bit 1: 7
After toggling bit 0: 6`,
      explanation: 'Status 5 is 0101. Toggling bit 1 (mask 2) turns bit 1 on, yielding 7 (0111). Toggling bit 0 (mask 1) turns bit 0 off, yielding 6 (0110).'
    },
    {
      id: 'op-bit-not-formula',
      title: 'Bitwise NOT Inversion and Two\'s Complement Formula',
      problemStatement: `Write a program to demonstrate Java\'s two\'s complement bitwise NOT operator (\`~\`).
Initialize \`int positiveVal = 30;\` and \`int negativeVal = -15;\`.
Compute the bitwise NOT of both values and verify that the result matches the mathematical formula \`-(n + 1)\`.`,
      hint: 'Invert using `~val`. Formula verification is `-(val + 1)`.',
      solutionCode: `public class BitwiseNotVerification {
    public static void main(String[] args) {
        int positiveVal = 30;
        int negativeVal = -15;

        int notPos = ~positiveVal;
        int notNeg = ~negativeVal;

        System.out.println("~" + positiveVal + " = " + notPos);
        System.out.println("Formula check: " + (-(positiveVal + 1)));

        System.out.println("~(" + negativeVal + ") = " + notNeg);
        System.out.println("Formula check: " + (-(negativeVal + 1)));
    }
}`,
      output: `~30 = -31
Formula check: -31
~(-15) = 14
Formula check: 14`,
      explanation: 'In Java\'s two\'s complement system, inverting all bits produces -(n + 1). ~30 produces -31, and ~(-15) produces -(-15 + 1) = 14.'
    },
    {
      id: 'op-bit-shift-comparison',
      title: 'Signed vs Unsigned Right Shift Comparison',
      problemStatement: `Write a program that compares the signed right shift (\`>>\`) and unsigned right shift (\`>>>\`) operators on a negative integer.
Given \`int negNum = -32;\`:
1. Compute \`negNum >> 3\` and print the result.
2. Compute \`negNum >>> 3\` and print the result.
Explain why one remains negative while the other becomes a massive positive number.`,
      hint: '`>>` copies the negative sign bit (fills with 1s). `>>>` fills with 0s regardless of sign.',
      solutionCode: `public class ShiftComparison {
    public static void main(String[] args) {
        int negNum = -32;

        int signedShift = negNum >> 3;
        int unsignedShift = negNum >>> 3;

        System.out.println("Signed Shift (-32 >> 3): " + signedShift);
        System.out.println("Unsigned Shift (-32 >>> 3): " + unsignedShift);
    }
}`,
      output: `Signed Shift (-32 >> 3): -4
Unsigned Shift (-32 >>> 3): 536870908`,
      explanation: 'Signed shift >> preserves the sign bit (filling left with 1s), yielding -4. Unsigned shift >>> fills left with 0s, turning the 32-bit negative number into a large positive integer (536870908).'
    },
    {
      id: 'op-bit-rgb-extraction',
      title: 'RGB Color Component Extraction with Bitwise Shifts and Masks',
      problemStatement: `A 24-bit RGB color is packed into an integer where:
- Red occupies bits 16-23.
- Green occupies bits 8-15.
- Blue occupies bits 0-7.
Given \`int hexColor = 0xE67E22\` (Carrot Orange):
Extract and print the individual Red, Green, and Blue component values in decimal.`,
      hint: 'Shift right to bring the desired byte to the lowest position, then mask with `& 0xFF`.',
      solutionCode: `public class RgbColorExtractor {
    public static void main(String[] args) {
        int hexColor = 0xE67E22; // Hex: E6 = Red, 7E = Green, 22 = Blue

        int red   = (hexColor >> 16) & 0xFF;
        int green = (hexColor >> 8) & 0xFF;
        int blue  = hexColor & 0xFF;

        System.out.println("Packed Color: 0x" + Integer.toHexString(hexColor).toUpperCase());
        System.out.println("Red:   " + red);
        System.out.println("Green: " + green);
        System.out.println("Blue:  " + blue);
    }
}`,
      output: `Packed Color: 0xE67E22
Red:   230
Green: 126
Blue:  34`,
      explanation: '0xE6 is shifted right 16 bits and masked to yield 230. 0x7E is shifted right 8 bits to yield 126. 0x22 is masked directly to yield 34.'
    },
    {
      id: 'op-bit-power-of-two',
      title: 'Power of Two Verification via Bitwise AND',
      problemStatement: `An integer n > 0 is a power of two if and only if it has exactly one bit set to 1 in binary.
The bitwise expression \`(n > 0) && ((n & (n - 1)) == 0)\` checks if n is a power of two.
Write a program that tests \`num1 = 32\` and \`num2 = 40\` using this formula and prints whether each is a power of two.`,
      hint: 'Subtracting 1 from a power of two flips all bits after the single 1. Their AND is strictly 0.',
      solutionCode: `public class PowerOfTwoCheck {
    public static void main(String[] args) {
        int num1 = 32;
        int num2 = 40;

        boolean isPower1 = (num1 > 0) && ((num1 & (num1 - 1)) == 0);
        boolean isPower2 = (num2 > 0) && ((num2 & (num2 - 1)) == 0);

        System.out.println(num1 + " is power of two: " + isPower1);
        System.out.println(num2 + " is power of two: " + isPower2);
    }
}`,
      output: `32 is power of two: true
40 is power of two: false`,
      explanation: '32 in binary is 0010_0000; 31 is 0001_1111. 32 & 31 = 0, confirming it is a power of two. 40 is 0010_1000; 40 & 39 = 0010_0000 != 0.'
    },
    {
      id: 'op-bit-pack-channels',
      title: 'Packing 8-Bit Components into a 24-Bit Integer',
      problemStatement: `Write a program that takes three separate 8-bit color channels:
\`int red = 255;\`
\`int green = 165;\`
\`int blue = 0;\`
Pack them into a single 24-bit RGB integer using bitwise left shift (\`<<\`) and bitwise OR (\`|\`).
Print the combined decimal integer and its uppercase hexadecimal string.`,
      hint: 'Position each channel using `(red << 16) | (green << 8) | blue`.',
      solutionCode: `public class PackRgbChannels {
    public static void main(String[] args) {
        int red = 255;
        int green = 165;
        int blue = 0;

        int packedRgb = (red << 16) | (green << 8) | blue;

        System.out.println("Decimal Packed Value: " + packedRgb);
        System.out.println("Hex String: 0x" + Integer.toHexString(packedRgb).toUpperCase());
    }
}`,
      output: `Decimal Packed Value: 16753920
Hex String: 0xFFA500`,
      explanation: 'Red 255 (0xFF) shifted left 16 bits gives 0xFF0000. Green 165 (0xA5) shifted left 8 bits gives 0x00A500. Combining with OR gives 0xFFA500 (16753920).'
    }
  ],

  // ==========================================================================
  // LESSON 3.8: The instanceof Operator & Pattern Matching (10 Exercises)
  // ==========================================================================
  'instanceof-operator': [
    {
      id: 'op-inst-type-check',
      title: 'Safe Type Verification with instanceof',
      problemStatement: `Write a program that initializes an \`Object\` reference pointing to a String: \`Object obj = "Hello Java Platform";\`.
Use the \`instanceof\` operator to verify that \`obj\` is an instance of \`String\`.
If true, cast \`obj\` to a \`String\` variable and print its length and its first 5 characters.`,
      hint: 'Use `if (obj instanceof String)` and then `String s = (String) obj;`.',
      solutionCode: `public class SafeTypeCheck {
    public static void main(String[] args) {
        Object obj = "Hello Java Platform";

        if (obj instanceof String) {
            String str = (String) obj;
            System.out.println("Object is a String: true");
            System.out.println("Length: " + str.length());
            System.out.println("Substring: " + str.substring(0, 5));
        } else {
            System.out.println("Object is a String: false");
        }
    }
}`,
      output: `Object is a String: true
Length: 19
Substring: Hello`,
      explanation: 'instanceof verifies the runtime type of obj is String before casting, preventing a ClassCastException.'
    },
    {
      id: 'op-inst-pattern-string',
      title: 'Pattern Matching for String Variable Binding',
      problemStatement: `Modern Java (Java 14+) introduces Pattern Matching for instanceof to eliminate manual casting boilerplate.
Write a program that assigns a String to an \`Object\` variable: \`Object rawData = "ExamBoard Architecture";\`.
Use pattern matching \`if (rawData instanceof String text)\` to automatically bind the String variable \`text\`.
Print the uppercase representation of \`text\` and its character count.`,
      hint: 'Write `if (rawData instanceof String text)` without manual `(String)` casting.',
      solutionCode: `public class PatternMatchingString {
    public static void main(String[] args) {
        Object rawData = "ExamBoard Architecture";

        if (rawData instanceof String text) {
            System.out.println("Uppercase: " + text.toUpperCase());
            System.out.println("Character Count: " + text.length());
        }
    }
}`,
      output: `Uppercase: EXAMBOARD ARCHITECTURE
Character Count: 22`,
      explanation: 'Pattern matching introduces the typed variable "text" directly in the if condition, removing the need for an explicit (String) cast.'
    },
    {
      id: 'op-inst-null-handling',
      title: 'Safe Null Reference Verification with instanceof',
      problemStatement: `In Java, evaluating \`null instanceof AnyType\` is guaranteed to return \`false\` safely without throwing a \`NullPointerException\`.
Write a program that initializes \`Object nullRef = null;\`.
Evaluate and print the boolean results of:
1. \`nullRef instanceof String\`
2. \`nullRef instanceof Object\`
Demonstrate that no exception occurs.`,
      hint: 'Directly pass `nullRef` to `instanceof`. No explicit null check is required.',
      solutionCode: `public class NullSafetyCheck {
    public static void main(String[] args) {
        Object nullRef = null;

        boolean isString = nullRef instanceof String;
        boolean isObject = nullRef instanceof Object;

        System.out.println("nullRef instanceof String: " + isString);
        System.out.println("nullRef instanceof Object: " + isObject);
        System.out.println("Execution completed safely without NullPointerException.");
    }
}`,
      output: `nullRef instanceof String: false
nullRef instanceof Object: false
Execution completed safely without NullPointerException.`,
      explanation: 'Because null does not reference any instantiated object, instanceof always returns false without throwing NullPointerException.'
    },
    {
      id: 'op-inst-wrapper-polymorphism',
      title: 'Testing Wrapper Hierarchy with Number Class',
      problemStatement: `All numeric wrapper classes in Java (\`Integer\`, \`Double\`, \`Long\`, etc.) extend the abstract class \`java.lang.Number\`.
Write a program that creates two \`Object\` references:
\`Object first = 100;\` (Integer)
\`Object second = 49.99;\` (Double)
Check if each object is an instance of \`Number\`, and print the results.`,
      hint: 'Both `Integer` and `Double` inherit from `Number`. Test with `obj instanceof Number`.',
      solutionCode: `public class NumberWrapperHierarchy {
    public static void main(String[] args) {
        Object first = 100;
        Object second = 49.99;

        boolean firstIsNum = first instanceof Number;
        boolean secondIsNum = second instanceof Number;

        System.out.println("100 is Number: " + firstIsNum);
        System.out.println("49.99 is Number: " + secondIsNum);
    }
}`,
      output: `100 is Number: true
49.99 is Number: true`,
      explanation: 'Because Integer and Double are both subclasses of Number, instanceof Number returns true for both.'
    },
    {
      id: 'op-inst-pattern-and-condition',
      title: 'Flow Scoping Pattern Matching with Logical AND',
      problemStatement: `Under flow scoping rules, a pattern variable is available in the right operand of a logical AND (\`&&\`) expression because that operand only executes if the pattern match was true.
Given \`Object token = "AdminToken99";\`:
Write an if statement testing \`if (token instanceof String s && s.startsWith("Admin"))\`.
Inside the block, print the valid token and its character length.`,
      hint: 'Combine pattern matching with `&&` in the same if statement.',
      solutionCode: `public class PatternFlowScoping {
    public static void main(String[] args) {
        Object token = "AdminToken99";

        if (token instanceof String s && s.startsWith("Admin")) {
            System.out.println("Authorized admin token: " + s);
            System.out.println("Token length: " + s.length());
        } else {
            System.out.println("Invalid or non-admin token.");
        }
    }
}`,
      output: `Authorized admin token: AdminToken99
Token length: 12`,
      explanation: 'Flow scoping allows variable s to be used on the right side of && because that expression is only reached when token is guaranteed to be a String.'
    },
    {
      id: 'op-inst-multi-branch-inspector',
      title: 'Multi-Type Inspector with Pattern Matching Ladder',
      problemStatement: `Write a program that inspects an unknown \`Object target = 88;\` using an if-else if ladder with pattern matching:
- If it is a \`String s\`, print \`"String: "\` followed by \`s\`.
- If it is an \`Integer i\`, print \`"Integer: "\` followed by \`i\` and \`"Doubled: "\` followed by \`i * 2\`.
- If it is a \`Double d\`, print \`"Double: "\` followed by \`d\`.
- Otherwise, print \`"Unknown Type"\`.`,
      hint: 'Use `else if (target instanceof Integer i)` in the ladder.',
      solutionCode: `public class MultiTypeInspector {
    public static void main(String[] args) {
        Object target = 88;

        if (target instanceof String s) {
            System.out.println("String: " + s);
        } else if (target instanceof Integer i) {
            System.out.println("Integer: " + i);
            System.out.println("Doubled: " + (i * 2));
        } else if (target instanceof Double d) {
            System.out.println("Double: " + d);
        } else {
            System.out.println("Unknown Type");
        }
    }
}`,
      output: `Integer: 88
Doubled: 176`,
      explanation: 'The runtime type of target is Integer, so the second branch executes, binding variable i to 88 and doubling it to 176.'
    },
    {
      id: 'op-inst-guard-clause',
      title: 'Negative Guard Check with Inverted instanceof',
      problemStatement: `Write a program that checks whether an input object is NOT a String using the inverted check \`!(obj instanceof String)\`.
Given \`Object session = "ActiveSession";\`:
Use an if statement to test if session is NOT a String. If it is not, print an error; otherwise, in the else branch, cast and print the active session name.`,
      hint: 'Wrap the check in parentheses: `!(session instanceof String)`.',
      solutionCode: `public class InvertedInstanceCheck {
    public static void main(String[] args) {
        Object session = "ActiveSession";

        if (!(session instanceof String)) {
            System.out.println("Error: Session payload must be a String.");
        } else {
            String active = (String) session;
            System.out.println("Valid Session: " + active);
        }
    }
}`,
      output: `Valid Session: ActiveSession`,
      explanation: 'session is an instance of String, so !(session instanceof String) evaluates to false, proceeding safely to the else block.'
    },
    {
      id: 'op-inst-object-super-check',
      title: 'Universal Inheritance Verification against Object',
      problemStatement: `In Java, every class implicitly inherits from \`java.lang.Object\`.
Write a program that declares three variables of type \`Object\`:
\`Object val1 = "Text";\`
\`Object val2 = 42;\`
\`Object val3 = true;\`
Verify that all three variables are instances of \`Object\` using \`instanceof Object\`, and print the confirmation.`,
      hint: 'Test `val1 instanceof Object`, `val2 instanceof Object`, and `val3 instanceof Object`.',
      solutionCode: `public class UniversalObjectCheck {
    public static void main(String[] args) {
        Object val1 = "Text";
        Object val2 = 42;
        Object val3 = true;

        System.out.println("val1 instanceof Object: " + (val1 instanceof Object));
        System.out.println("val2 instanceof Object: " + (val2 instanceof Object));
        System.out.println("val3 instanceof Object: " + (val3 instanceof Object));
    }
}`,
      output: `val1 instanceof Object: true
val2 instanceof Object: true
val3 instanceof Object: true`,
      explanation: 'String, Integer (autoboxed from 42), and Boolean (autoboxed from true) all inherit from java.lang.Object.'
    },
    {
      id: 'op-inst-safe-sum',
      title: 'Type-Safe Integer Extraction and Addition',
      problemStatement: `Write a program that receives two \`Object\` variables:
\`Object argA = 25;\`
\`Object argB = 75;\`
Use pattern matching to verify that both objects are instances of \`Integer\`. If both are integers, extract their values and calculate their sum.
Print the calculated sum.`,
      hint: 'Use `if (argA instanceof Integer numA && argB instanceof Integer numB)` to bind both in one statement.',
      solutionCode: `public class TypeSafeSum {
    public static void main(String[] args) {
        Object argA = 25;
        Object argB = 75;

        if (argA instanceof Integer numA && argB instanceof Integer numB) {
            int sum = numA + numB;
            System.out.println("First Integer: " + numA);
            System.out.println("Second Integer: " + numB);
            System.out.println("Calculated Sum: " + sum);
        } else {
            System.out.println("Error: Both arguments must be Integers.");
        }
    }
}`,
      output: `First Integer: 25
Second Integer: 75
Calculated Sum: 100`,
      explanation: 'Pattern matching extracts numA (25) and numB (75) safely in a single condition, allowing direct addition without risk of ClassCastException.'
    },
    {
      id: 'op-inst-pattern-scope-isolation',
      title: 'Pattern Variable Scope Isolation in Sibling Branches',
      problemStatement: `Write a program demonstrating that pattern variables declared in separate if-statements are isolated to their own scopes.
Given two distinct \`Object\` variables:
\`Object item1 = "First Item";\`
\`Object item2 = "Second Item";\`
Declare \`if (item1 instanceof String val)\` and print \`val\`.
Immediately follow it with another independent block: \`if (item2 instanceof String val)\` and print \`val\`.
Demonstrate that reusing the variable name \`val\` is completely legal.`,
      hint: 'Because the scope of each pattern variable ends at its closing brace, sibling blocks can reuse the same identifier.',
      solutionCode: `public class ScopeIsolationDemo {
    public static void main(String[] args) {
        Object item1 = "First Item";
        Object item2 = "Second Item";

        if (item1 instanceof String val) {
            System.out.println("First block val: " + val);
        }

        // Reusing 'val' in an independent block is completely legal
        if (item2 instanceof String val) {
            System.out.println("Second block val: " + val);
        }
    }
}`,
      output: `First block val: First Item
Second block val: Second Item`,
      explanation: 'Pattern variables have block-level flow scope. Once the first if block closes, val ceases to exist, allowing the second if block to declare val anew.'
    }
  ],

  // ==========================================================================
  // LESSON 3.9: Operator Precedence & Associativity (10 Exercises)
  // ==========================================================================
  'operator-precedence': [
    {
      id: 'op-prec-arith-ladder',
      title: 'Arithmetic Multiplicative and Additive Precedence',
      problemStatement: `In Java arithmetic, multiplicative operators (\`*\`, \`/\`, \`%\`) have higher precedence than additive operators (\`+\`, \`-\`), and evaluate from left to right.
Write a program that evaluates the expression:
\`int result = 8 + 4 * 3 - 10 / 2;\`
Trace each step manually and print the final computed value.`,
      hint: 'Evaluate `4 * 3 = 12` and `10 / 2 = 5` first, then evaluate `8 + 12 - 5` left to right.',
      solutionCode: `public class ArithmeticPrecedence {
    public static void main(String[] args) {
        int result = 8 + 4 * 3 - 10 / 2;
        // Step 1: 4 * 3 = 12
        // Step 2: 10 / 2 = 5
        // Step 3: 8 + 12 = 20
        // Step 4: 20 - 5 = 15

        System.out.println("Evaluated result: " + result);
    }
}`,
      output: `Evaluated result: 15`,
      explanation: 'Multiplication and division take precedence over addition and subtraction: 4*3=12, 10/2=5. Then 8+12=20, and 20-5=15.'
    },
    {
      id: 'op-prec-parentheses-override',
      title: 'Overriding Default Precedence with Explicit Parentheses',
      problemStatement: `Parentheses \`()\` have the highest precedence in Java and explicitly dictate evaluation order.
Given \`int a = 15, b = 5, c = 2;\`:
1. Calculate \`int unparenthesized = a + b * c;\`.
2. Calculate \`int parenthesized = (a + b) * c;\`.
Print both results to show how parentheses alter the mathematical outcome.`,
      hint: 'Without parentheses, `b * c` happens first. With parentheses, `(a + b)` happens first.',
      solutionCode: `public class ParenthesesOverride {
    public static void main(String[] args) {
        int a = 15;
        int b = 5;
        int c = 2;

        int unparenthesized = a + b * c;
        int parenthesized = (a + b) * c;

        System.out.println("Unparenthesized (15 + 5 * 2): " + unparenthesized);
        System.out.println("Parenthesized ((15 + 5) * 2): " + parenthesized);
    }
}`,
      output: `Unparenthesized (15 + 5 * 2): 25
Parenthesized ((15 + 5) * 2): 40`,
      explanation: 'In 15 + 5 * 2, multiplication runs first (5 * 2 = 10, then 15 + 10 = 25). Parentheses force addition first (15 + 5 = 20, then 20 * 2 = 40).'
    },
    {
      id: 'op-prec-string-concat-trap',
      title: 'String Concatenation vs Arithmetic Addition Trap',
      problemStatement: `Because \`+\` associates from left to right, combining text with numbers can yield unexpected string results.
Given \`int a = 12;\` and \`int b = 18;\`:
1. Print the result of \`"Values: " + a + b\`.
2. Print the result of \`"Values: " + (a + b)\`.
Explain why the outputs differ.`,
      hint: 'Wrap the numbers in parentheses to force numeric addition before concatenation.',
      solutionCode: `public class StringConcatTrap {
    public static void main(String[] args) {
        int a = 12;
        int b = 18;

        System.out.println("Without parentheses: " + "Values: " + a + b);
        System.out.println("With parentheses:    " + "Values: " + (a + b));
    }
}`,
      output: `Without parentheses: Values: 1218
With parentheses:    Values: 30`,
      explanation: 'In "Values: " + 12 + 18, left-to-right evaluation forms "Values: 12" first, then concatenates 18 to make "Values: 1218". Parentheses force 12 + 18 = 30 first.'
    },
    {
      id: 'op-prec-unary-multiplication',
      title: 'Unary Prefix and Postfix Precedence in Multiplication',
      problemStatement: `Write a program that contrasts prefix (\`++x\`) and postfix (\`y++\`) increment operators when combined with multiplication.
Initialize:
\`int x = 4; int res1 = 3 * ++x;\`
\`int y = 4; int res2 = 3 * y++;\`
Print \`res1\`, \`res2\`, and the final values of \`x\` and \`y\`.`,
      hint: 'Prefix increments before evaluation; postfix delivers the current value to the multiplication before incrementing.',
      solutionCode: `public class UnaryMultiplicationPrecedence {
    public static void main(String[] args) {
        int x = 4;
        int res1 = 3 * ++x; // x increments to 5, then 3 * 5 = 15

        int y = 4;
        int res2 = 3 * y++; // 3 * 4 = 12 is calculated, then y increments to 5

        System.out.println("res1 (3 * ++x): " + res1 + ", final x: " + x);
        System.out.println("res2 (3 * y++): " + res2 + ", final y: " + y);
    }
}`,
      output: `res1 (3 * ++x): 15, final x: 5
res2 (3 * y++): 12, final y: 5`,
      explanation: 'Prefix ++x increments x to 5 first, so 3 * 5 = 15. Postfix y++ yields the original 4 for the multiplication (3 * 4 = 12) before incrementing y to 5.'
    },
    {
      id: 'op-prec-relational-equality',
      title: 'Relational Precedence over Equality Operators',
      problemStatement: `In Java, relational operators (\`<\`, \`>\`, \`<=\`, \`>=\`) have higher precedence than equality operators (\`==\`, \`!=\`).
Write a program that evaluates:
\`boolean result = 5 + 3 > 7 == 10 < 20;\`
Print the final boolean value and trace how addition, relational, and equality operators execute in sequence.`,
      hint: 'First addition `5 + 3`, then comparisons `8 > 7` and `10 < 20`, then equality between the boolean results.',
      solutionCode: `public class RelationalEqualityPrecedence {
    public static void main(String[] args) {
        boolean result = 5 + 3 > 7 == 10 < 20;
        // Step 1: Additive: 5 + 3 = 8
        // Step 2: Relational: 8 > 7 is true
        // Step 3: Relational: 10 < 20 is true
        // Step 4: Equality: true == true is true

        System.out.println("Result of (5 + 3 > 7 == 10 < 20): " + result);
    }
}`,
      output: `Result of (5 + 3 > 7 == 10 < 20): true`,
      explanation: 'Additive (+) runs first (5+3=8). Relational (>, <) runs next (8>7 is true, 10<20 is true). Finally, equality (==) compares true == true, yielding true.'
    },
    {
      id: 'op-prec-logical-and-or',
      title: 'Logical AND Precedence over Logical OR',
      problemStatement: `Logical AND (\`&&\`) has higher precedence than Logical OR (\`||\`).
Given \`boolean flagA = true, flagB = false, flagC = false;\`:
1. Evaluate \`boolean res1 = flagA || flagB && flagC;\`.
2. Evaluate \`boolean res2 = (flagA || flagB) && flagC;\`.
Print both boolean results to demonstrate that \`&&\` binds tighter than \`||\`.`,
      hint: 'In `flagA || flagB && flagC`, `flagB && flagC` is evaluated first unless parentheses override it.',
      solutionCode: `public class LogicalAndOrPrecedence {
    public static void main(String[] args) {
        boolean flagA = true;
        boolean flagB = false;
        boolean flagC = false;

        boolean res1 = flagA || flagB && flagC;
        boolean res2 = (flagA || flagB) && flagC;

        System.out.println("flagA || flagB && flagC: " + res1);
        System.out.println("(flagA || flagB) && flagC: " + res2);
    }
}`,
      output: `flagA || flagB && flagC: true
(flagA || flagB) && flagC: false`,
      explanation: 'In res1, && binds tighter: (false && false) is false; true || false is true. In res2, parentheses force (true || false) = true first; true && false is false.'
    },
    {
      id: 'op-prec-bitwise-equality-fix',
      title: 'Resolving the Bitwise AND and Equality Precedence Trap',
      problemStatement: `Equality (\`==\`) has higher precedence than bitwise AND (\`&\`).
Attempting to write \`status & 4 == 4\` results in a compile-time error because Java parses it as \`status & (4 == 4)\`.
Given \`int status = 6;\` (binary 0110):
Write a program that uses parentheses correctly to test if bit 2 (value 4) is set.
Print whether the bit is active.`,
      hint: 'Always write `(status & 4) == 4` with parentheses around the bitwise expression.',
      solutionCode: `public class BitwiseEqualityFix {
    public static void main(String[] args) {
        int status = 6; // Binary: 0110

        // CORRECT: Wrap bitwise operation in parentheses:
        boolean isBitSet = (status & 4) == 4;

        System.out.println("Status Value: " + status);
        System.out.println("Is Bit 2 Set: " + isBitSet);
    }
}`,
      output: `Status Value: 6
Is Bit 2 Set: true`,
      explanation: 'Parentheses force status & 4 (6 & 4 = 4) to evaluate first before comparing with 4, preventing a type mismatch compile error.'
    },
    {
      id: 'op-prec-right-to-left-assign',
      title: 'Right-to-Left Associativity in Chained Assignment',
      problemStatement: `Assignment operators (\`=\`, \`+=\`, etc.) associate from Right to Left.
Write a program that declares three integer variables \`int x, y, z;\`:
1. Perform chained assignment: \`x = y = z = 50;\`.
2. Perform compound chained assignment: \`x += y += z;\`.
Print the final values of \`x\`, \`y\`, and \`z\`.`,
      hint: 'Right-to-left associativity groups `x += (y += z)`.',
      solutionCode: `public class ChainedAssignmentAssociativity {
    public static void main(String[] args) {
        int x, y, z;
        x = y = z = 50;

        System.out.println("After initial chain: x=" + x + ", y=" + y + ", z=" + z);

        // Right-to-left: y += z (y = 50 + 50 = 100), then x += 100 (x = 50 + 100 = 150)
        x += y += z;

        System.out.println("After compound chain: x=" + x + ", y=" + y + ", z=" + z);
    }
}`,
      output: `After initial chain: x=50, y=50, z=50
After compound chain: x=150, y=100, z=50`,
      explanation: 'y += z executes first, making y = 100. Then x += 100 executes, making x = 150. Variable z remains 50 throughout.'
    },
    {
      id: 'op-prec-nested-ternary',
      title: 'Right-to-Left Associativity in Nested Ternary Expressions',
      problemStatement: `The conditional ternary operator (\`? :\`) associates from Right to Left.
Given \`int testScore = 82;\`:
Evaluate the nested ternary expression:
\`String result = testScore >= 90 ? "Distinction" : testScore >= 75 ? "Merit" : "Pass";\`
Print \`result\` and explain how right-to-left grouping parses the conditions.`,
      hint: 'Parsed as `testScore >= 90 ? "Distinction" : (testScore >= 75 ? "Merit" : "Pass")`.',
      solutionCode: `public class NestedTernaryAssociativity {
    public static void main(String[] args) {
        int testScore = 82;

        String result = testScore >= 90 ? "Distinction" : testScore >= 75 ? "Merit" : "Pass";

        System.out.println("Test Score: " + testScore);
        System.out.println("Assigned Grade: " + result);
    }
}`,
      output: `Test Score: 82
Assigned Grade: Merit`,
      explanation: 'Because ternary associates right-to-left, testScore >= 90 is false, so the false branch (testScore >= 75 ? "Merit" : "Pass") evaluates. 82 >= 75 is true, returning "Merit".'
    },
    {
      id: 'op-prec-complex-expression-trace',
      title: 'Step-by-Step Decomposition of a Multi-Operator Expression',
      problemStatement: `Write a program that traces a multi-operator expression combining arithmetic, shifts, relational, equality, and logical operators.
Given \`int a = 3, b = 2;\`:
Evaluate:
\`boolean flag = a + b * 2 > 6 && b << 1 == 4;\`
Trace each intermediate step and print the final boolean outcome.`,
      hint: 'Evaluation order: `*`, then `+`, then `>`, then `<<`, then `==`, and finally `&&`.',
      solutionCode: `public class ComplexExpressionTrace {
    public static void main(String[] args) {
        int a = 3;
        int b = 2;

        // Step 1: Multiplicative: b * 2 = 2 * 2 = 4
        // Step 2: Additive: a + 4 = 3 + 4 = 7
        // Step 3: Relational: 7 > 6 = true
        // Step 4: Shift: b << 1 = 2 << 1 = 4
        // Step 5: Equality: 4 == 4 = true
        // Step 6: Logical AND: true && true = true
        boolean flag = a + b * 2 > 6 && b << 1 == 4;

        System.out.println("Decomposed flag result: " + flag);
    }
}`,
      output: `Decomposed flag result: true`,
      explanation: 'Multiplication (b*2=4) runs first. Addition (3+4=7) runs next. Relational (7>6) is true. Left shift (2<<1=4) runs, then equality (4==4) is true. Finally, true && true yields true.'
    }
  ]
};
