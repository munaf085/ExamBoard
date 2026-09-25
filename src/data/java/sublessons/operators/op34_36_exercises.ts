import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR OPERATORS (3.4 - 3.6)
// Zero forward topics: No loops, no custom methods, no classes/inheritance.
// Clean titles without duplicate badge numbers.
// ============================================================

export const op34_36_exercises: Record<string, ProgrammingExercise[]> = {
  // ────────────────────────────────────────────────────────────
  // LESSON 3.4: Logical Operators & Short-Circuiting
  // ────────────────────────────────────────────────────────────
  'short-circuit-evaluation': [
    {
      id: 'op-sc-eligibility',
      title: 'Eligibility Checker with Logical AND',
      problemStatement: `Write a program that determines whether a candidate is eligible for a senior loan.
A candidate is eligible if their age is 21 or older AND their credit score is at least 700.

Input:
int age = 24;
int creditScore = 720;

Output Format:
Age: 24
Credit Score: 720
Eligible for Loan: true`,
      hint: 'Combine the two relational comparisons using the logical AND operator (&&).',
      solutionCode: `public class LoanEligibility {
    public static void main(String[] args) {
        int age = 24;
        int creditScore = 720;

        boolean isEligible = (age >= 21) && (creditScore >= 700);

        System.out.println("Age: " + age);
        System.out.println("Credit Score: " + creditScore);
        System.out.println("Eligible for Loan: " + isEligible);
    }
}`,
      output: `Age: 24
Credit Score: 720
Eligible for Loan: true`,
      explanation: 'Both conditions (age >= 21) and (creditScore >= 700) evaluate to true, so the logical AND (&&) evaluates to true.'
    },
    {
      id: 'op-sc-range',
      title: 'Number Range Validator with Compound Logic',
      problemStatement: `Write a program that verifies whether a temperature reading falls within a safe working range of 15°C to 45°C inclusive.

Input:
int temperature = 32;

Output Format:
Temperature: 32C
Within Safe Range: true`,
      hint: 'In Java, range checks cannot be written as 15 <= temp <= 45. Use (temp >= 15) && (temp <= 45).',
      solutionCode: `public class RangeValidator {
    public static void main(String[] args) {
        int temperature = 32;

        boolean isSafe = (temperature >= 15) && (temperature <= 45);

        System.out.println("Temperature: " + temperature + "C");
        System.out.println("Within Safe Range: " + isSafe);
    }
}`,
      output: `Temperature: 32C
Within Safe Range: true`,
      explanation: 'The compound expression checks that temperature is both greater than or equal to 15 AND less than or equal to 45.'
    },
    {
      id: 'op-sc-zero-guard',
      title: 'Safe Division Guard with Short-Circuit AND',
      problemStatement: `Demonstrate defensive coding using the guard pattern. Given a divisor initialized to 0 and a dividend of 100, check whether the divisor is non-zero AND the division result exceeds 10.
Ensure the program executes safely without throwing an ArithmeticException.

Input:
int divisor = 0;
int dividend = 100;

Output Format:
Divisor: 0
Safe Division Result: false`,
      hint: 'Place the safety check `divisor != 0` on the LEFT side of `&&`. If the left operand is false, the right-hand division is skipped.',
      solutionCode: `public class SafeDivisionGuard {
    public static void main(String[] args) {
        int divisor = 0;
        int dividend = 100;

        boolean canDivideAndExceeds = (divisor != 0) && ((dividend / divisor) > 10);

        System.out.println("Divisor: " + divisor);
        System.out.println("Safe Division Result: " + canDivideAndExceeds);
    }
}`,
      output: `Divisor: 0
Safe Division Result: false`,
      explanation: 'Because divisor != 0 evaluates to false, short-circuit AND immediately returns false without evaluating dividend / divisor, preventing an ArithmeticException: / by zero.'
    },
    {
      id: 'op-sc-weekend-pass',
      title: 'Access Authorization with Logical OR',
      problemStatement: `Write a program that verifies whether an employee has building access on weekends.
Access is granted if the employee has an administrator role OR holds an active weekend pass.

Input:
boolean isAdmin = false;
boolean hasWeekendPass = true;

Output Format:
Is Admin: false
Has Weekend Pass: true
Access Granted: true`,
      hint: 'Use the logical OR operator (||) between the two boolean flags.',
      solutionCode: `public class AccessControl {
    public static void main(String[] args) {
        boolean isAdmin = false;
        boolean hasWeekendPass = true;

        boolean accessGranted = isAdmin || hasWeekendPass;

        System.out.println("Is Admin: " + isAdmin);
        System.out.println("Has Weekend Pass: " + hasWeekendPass);
        System.out.println("Access Granted: " + accessGranted);
    }
}`,
      output: `Is Admin: false
Has Weekend Pass: true
Access Granted: true`,
      explanation: 'Logical OR (||) returns true if at least one of the conditions is true. Here, hasWeekendPass is true, so access is granted.'
    },
    {
      id: 'op-sc-side-effect-and',
      title: 'Tracking Bypassed Side Effects in Logical AND',
      problemStatement: `Write a program to demonstrate the side-effect bypassing trap in short-circuit AND.
Initialize counter to 0 and evaluate an expression where the left operand is false and the right operand is ++counter > 0.
Print the expression result and the value of counter to prove that the increment was skipped.

Input:
int counter = 0;

Output Format:
Evaluation Result: false
Counter Value: 0`,
      hint: 'In `false && (++counter > 0)`, the left condition is false, so JVM halts without running ++counter.',
      solutionCode: `public class ShortCircuitSideEffectAnd {
    public static void main(String[] args) {
        int counter = 0;

        boolean result = (false) && (++counter > 0);

        System.out.println("Evaluation Result: " + result);
        System.out.println("Counter Value: " + counter);
    }
}`,
      output: `Evaluation Result: false
Counter Value: 0`,
      explanation: 'Short-circuit AND halts execution as soon as the first operand evaluates to false. The ++counter operation on the right is completely skipped, leaving counter at 0.'
    },
    {
      id: 'op-sc-side-effect-or',
      title: 'Tracking Bypassed Side Effects in Logical OR',
      problemStatement: `Write a program to demonstrate side-effect bypassing in short-circuit OR.
Initialize clicks to 0 and evaluate an expression where the left operand is true and the right operand increments clicks.
Print the expression result and the clicks count to prove the increment was skipped.

Input:
int clicks = 0;

Output Format:
Evaluation Result: true
Clicks Count: 0`,
      hint: 'In `true || (++clicks > 0)`, the left condition is true, so JVM halts without running ++clicks.',
      solutionCode: `public class ShortCircuitSideEffectOr {
    public static void main(String[] args) {
        int clicks = 0;

        boolean result = (true) || (++clicks > 0);

        System.out.println("Evaluation Result: " + result);
        System.out.println("Clicks Count: " + clicks);
    }
}`,
      output: `Evaluation Result: true
Clicks Count: 0`,
      explanation: 'Short-circuit OR halts execution as soon as the first operand evaluates to true. The ++clicks operation is never evaluated, leaving clicks at 0.'
    },
    {
      id: 'op-sc-de-morgan',
      title: 'De Morgan Law Verification',
      problemStatement: `Verify De Morgan's Law in code:
Show that !(a && b) produces the exact same truth value as (!a || !b) for two boolean variables.

Input:
boolean a = true;
boolean b = false;

Output Format:
Original !(a && b): true
De Morgan (!a || !b): true
Are Both Equal: true`,
      hint: 'Compute both expressions independently and check their equality with ==.',
      solutionCode: `public class DeMorganVerification {
    public static void main(String[] args) {
        boolean a = true;
        boolean b = false;

        boolean original = !(a && b);
        boolean transformed = (!a || !b);
        boolean areEqual = (original == transformed);

        System.out.println("Original !(a && b): " + original);
        System.out.println("De Morgan (!a || !b): " + transformed);
        System.out.println("Are Both Equal: " + areEqual);
    }
}`,
      output: `Original !(a && b): true
De Morgan (!a || !b): true
Are Both Equal: true`,
      explanation: 'Because a && b is false, !(a && b) is true. Distributing NOT flips AND to OR: !true || !false -> false || true -> true. Both expressions match.'
    },
    {
      id: 'op-sc-multi-guard',
      title: 'Chained Multi-Condition Guard Expression',
      problemStatement: `Write a program that verifies industrial sensor data.
A sensor reading is considered VALID only if:
1. The sensor is powered on (isPowered is true).
2. Calibration status is OK (isCalibrated is true).
3. The reading is between 100 and 500 inclusive.

Input:
boolean isPowered = true;
boolean isCalibrated = true;
int reading = 350;

Output Format:
Sensor Powered: true
Sensor Calibrated: true
Reading: 350
Is Reading Valid: true`,
      hint: 'Chain all four conditions sequentially using `&&`.',
      solutionCode: `public class SensorValidator {
    public static void main(String[] args) {
        boolean isPowered = true;
        boolean isCalibrated = true;
        int reading = 350;

        boolean isValid = isPowered && isCalibrated && (reading >= 100) && (reading <= 500);

        System.out.println("Sensor Powered: " + isPowered);
        System.out.println("Sensor Calibrated: " + isCalibrated);
        System.out.println("Reading: " + reading);
        System.out.println("Is Reading Valid: " + isValid);
    }
}`,
      output: `Sensor Powered: true
Sensor Calibrated: true
Reading: 350
Is Reading Valid: true`,
      explanation: 'All chained sub-conditions evaluate to true, so the final composite expression evaluates to true.'
    },
    {
      id: 'op-sc-bitwise-vs-logical',
      title: 'Side Effect Comparison: Bitwise AND vs Short-Circuit AND',
      problemStatement: `Compare the execution behavior of the short-circuit AND (&&) with the non-short-circuit bitwise AND (&).
Given two separate counter variables x = 0 and y = 0, evaluate:
1. res1 = false && (++x > 0);
2. res2 = false & (++y > 0);
Print x and y to show that x remained 0 while y was incremented to 1.

Input:
int x = 0, y = 0;

Output Format:
Short-Circuit Counter x: 0
Non-Short-Circuit Counter y: 1`,
      hint: '&& skips the right operand when the left is false, while & always evaluates both operands unconditionally.',
      solutionCode: `public class BitwiseVsLogicalComparison {
    public static void main(String[] args) {
        int x = 0;
        int y = 0;

        boolean res1 = false && (++x > 0);
        boolean res2 = false & (++y > 0);

        System.out.println("Short-Circuit Counter x: " + x);
        System.out.println("Non-Short-Circuit Counter y: " + y);
    }
}`,
      output: `Short-Circuit Counter x: 0
Non-Short-Circuit Counter y: 1`,
      explanation: '&& short-circuits on the left false and skips ++x. Single & does not short-circuit, forcing ++y to execute and increment y to 1.'
    },
    {
      id: 'op-sc-circuit-breaker',
      title: 'Circuit Breaker State Evaluator',
      problemStatement: `Evaluate electrical circuit safety using logical operators.
A power grid should supply power only if:
- Main breaker is engaged (mainBreakerOn = true)
- AND (Load is safe (loadUnderLimit = true) OR Emergency bypass is active (emergencyBypass = true))
- AND Ground fault is NOT detected (!groundFaultDetected)

Input:
boolean mainBreakerOn = true;
boolean loadUnderLimit = false;
boolean emergencyBypass = true;
boolean groundFaultDetected = false;

Output Format:
Grid Safe to Power: true`,
      hint: 'Structure the logic: mainBreakerOn && (loadUnderLimit || emergencyBypass) && !groundFaultDetected.',
      solutionCode: `public class CircuitBreakerEvaluator {
    public static void main(String[] args) {
        boolean mainBreakerOn = true;
        boolean loadUnderLimit = false;
        boolean emergencyBypass = true;
        boolean groundFaultDetected = false;

        boolean isSafe = mainBreakerOn
                      && (loadUnderLimit || emergencyBypass)
                      && !groundFaultDetected;

        System.out.println("Grid Safe to Power: " + isSafe);
    }
}`,
      output: 'Grid Safe to Power: true',
      explanation: 'mainBreakerOn is true; (false || true) resolves to true via bypass; !false is true. All terms evaluate to true, so power is permitted.'
    }
  ],

  // ────────────────────────────────────────────────────────────
  // LESSON 3.5: Assignment Operators & The Compound Cast Trap
  // ────────────────────────────────────────────────────────────
  'assignment-operators': [
    {
      id: 'op-assign-basic',
      title: 'Accumulating Scores with Addition Assignment',
      problemStatement: `Write a program that tracks a player's score during a game using compound assignment operators.
1. Start with initial score of 100.
2. Add bonus points of 25 using +=.
3. Deduct a penalty of 15 using -=.
Print the score after each operation.

Input:
int score = 100;

Output Format:
Initial Score: 100
After Bonus: 125
After Penalty: 110`,
      hint: 'Use `score += 25` to add and `score -= 15` to subtract in-place.',
      solutionCode: `public class ScoreAccumulator {
    public static void main(String[] args) {
        int score = 100;
        System.out.println("Initial Score: " + score);

        score += 25;
        System.out.println("After Bonus: " + score);

        score -= 15;
        System.out.println("After Penalty: " + score);
    }
}`,
      output: `Initial Score: 100
After Bonus: 125
After Penalty: 110`,
      explanation: 'Compound assignment operators modify the existing variable directly without repeating its name.'
    },
    {
      id: 'op-assign-chained',
      title: 'Chained Assignment Propagation',
      problemStatement: `Demonstrate right-to-left associativity in chained assignment.
Declare three integer variables x, y, and z.
In a single chained assignment statement, assign 50 to all three variables.
Then, deduct 10 from z using -=.
Print all three variables.

Input:
int x, y, z;

Output Format:
x: 50, y: 50, z: 40`,
      hint: 'Chain assignment: `x = y = z = 50;`. Then modify z with `z -= 10;`.',
      solutionCode: `public class ChainedAssignmentDemo {
    public static void main(String[] args) {
        int x, y, z;
        x = y = z = 50;

        z -= 10;

        System.out.println("x: " + x + ", y: " + y + ", z: " + z);
    }
}`,
      output: 'x: 50, y: 50, z: 40',
      explanation: 'Chained assignments associate from right to left: z becomes 50, which is assigned to y, which is assigned to x. Decrementing z only modifies z.'
    },
    {
      id: 'op-assign-compound-mult',
      title: 'Compound Multiplication and Division',
      problemStatement: `Write a program that manages inventory batch sizes using *= and /=:
1. Start with quantity = 24.
2. Triple the quantity using *= 3.
3. Halve the resulting quantity using /= 2.
Print the quantity after each stage.

Input:
int quantity = 24;

Output Format:
Original Quantity: 24
Tripled Quantity: 72
Halved Quantity: 36`,
      hint: 'Use `quantity *= 3` and then `quantity /= 2`.',
      solutionCode: `public class InventoryBatchScaling {
    public static void main(String[] args) {
        int quantity = 24;
        System.out.println("Original Quantity: " + quantity);

        quantity *= 3;
        System.out.println("Tripled Quantity: " + quantity);

        quantity /= 2;
        System.out.println("Halved Quantity: " + quantity);
    }
}`,
      output: `Original Quantity: 24
Tripled Quantity: 72
Halved Quantity: 36`,
      explanation: 'quantity *= 3 multiplies 24 by 3 resulting in 72. quantity /= 2 divides 72 by 2 yielding 36.'
    },
    {
      id: 'op-assign-modulo-reduction',
      title: 'Modulo Assignment for Remainder Reduction',
      problemStatement: `Given a total time of 375 seconds, use compound assignment operators to determine:
1. The total whole minutes (divide by 60 using /=).
2. The remaining leftover seconds (use %= 60 on a separate variable).

Input:
int totalSeconds = 375;

Output Format:
Total Seconds: 375
Whole Minutes: 6
Remaining Seconds: 15`,
      hint: 'Keep a copy of totalSeconds for minutes, and another copy for leftover seconds via `%= 60`.',
      solutionCode: `public class ModuloReduction {
    public static void main(String[] args) {
        int totalSeconds = 375;
        int minutes = totalSeconds;
        int seconds = totalSeconds;

        minutes /= 60;
        seconds %= 60;

        System.out.println("Total Seconds: " + totalSeconds);
        System.out.println("Whole Minutes: " + minutes);
        System.out.println("Remaining Seconds: " + seconds);
    }
}`,
      output: `Total Seconds: 375
Whole Minutes: 6
Remaining Seconds: 15`,
      explanation: 'Integer division minutes /= 60 calculates full 60-second chunks (6), while seconds %= 60 extracts the leftover remainder (15).'
    },
    {
      id: 'op-assign-byte-cast',
      title: 'The Hidden Compound Cast with Byte Arithmetic',
      problemStatement: `Demonstrate the hidden compound cast rule (JLS §15.26.2).
Create a byte variable with initial value 40.
Add 30 to it using the compound assignment operator +=.
Print the result and explain why this compiles without manual casting.

Input:
byte b = 40;

Output Format:
Byte Value after += 30: 70`,
      hint: '`b += 30` automatically expands to `b = (byte)(b + 30)`.',
      solutionCode: `public class ByteCompoundCast {
    public static void main(String[] args) {
        byte b = 40;

        // b = b + 30; // Would cause compile error: int to byte
        b += 30; // Compiles via hidden cast: b = (byte)(b + 30)

        System.out.println("Byte Value after += 30: " + b);
    }
}`,
      output: 'Byte Value after += 30: 70',
      explanation: 'Under JLS §15.26.2, compound assignments automatically cast the result back to the target variable\'s type: (byte)(40 + 30) = 70.'
    },
    {
      id: 'op-assign-byte-overflow',
      title: 'Silent Byte Overflow with Compound Addition',
      problemStatement: `Demonstrate the silent overflow danger of compound assignment.
Initialize a byte variable to 125.
Add 5 to it using +=.
Print the resulting value and explain why it wrapped to a negative number.

Input:
byte value = 125;

Output Format:
Initial Byte: 125
Overflowed Byte: -126`,
      hint: '125 + 5 = 130. Since maximum signed byte is 127, 130 wraps around in two\'s complement to -126.',
      solutionCode: `public class SilentByteOverflow {
    public static void main(String[] args) {
        byte value = 125;
        System.out.println("Initial Byte: " + value);

        value += 5; // (byte)(125 + 5) = (byte)(130) -> -126
        System.out.println("Overflowed Byte: " + value);
    }
}`,
      output: `Initial Byte: 125
Overflowed Byte: -126`,
      explanation: 'Maximum value for a signed 8-bit byte is 127. Adding 5 pushes it past 127 into negative two\'s complement space: 127 + 1 = -128, + 1 = -127, + 1 = -126.'
    },
    {
      id: 'op-assign-char-step',
      title: 'Character Stepping with Compound Operators',
      problemStatement: `Demonstrate that compound assignment operators work seamlessly on character primitives.
Initialize a char variable to 'B'.
Step it forward by 5 positions in the alphabet using += 5.
Print the original and updated character.

Input:
char letter = 'B';

Output Format:
Original Letter: B
Stepped Letter: G`,
      hint: '\'B\' has ASCII code 66. `letter += 5` computes `(char)(66 + 5) = \'G\'`.',
      solutionCode: `public class CharStepping {
    public static void main(String[] args) {
        char letter = 'B';
        System.out.println("Original Letter: " + letter);

        letter += 5; // letter = (char)(letter + 5)
        System.out.println("Stepped Letter: " + letter);
    }
}`,
      output: `Original Letter: B
Stepped Letter: G`,
      explanation: 'Compound assignment inserts an implicit (char) cast, stepping Unicode code point 66 (\'B\') forward by 5 to 71 (\'G\').'
    },
    {
      id: 'op-assign-mixed-types',
      title: 'Compound Assignment Across Mixed Types',
      problemStatement: `Demonstrate implicit type truncation when mixing integer and floating point in compound assignment.
Initialize an integer variable total to 20.
Multiply it by a double factor 1.75 using *=.
Print the final integer result.

Input:
int total = 20;
double factor = 1.75;

Output Format:
Total after *= 1.75: 35`,
      hint: '`total *= factor` expands to `total = (int)(total * factor)`. 20 * 1.75 is 35.0, truncated to int 35.',
      solutionCode: `public class MixedTypeCompound {
    public static void main(String[] args) {
        int total = 20;
        double factor = 1.75;

        total *= factor; // total = (int)(total * factor)

        System.out.println("Total after *= 1.75: " + total);
    }
}`,
      output: 'Total after *= 1.75: 35',
      explanation: 'The product 20 * 1.75 evaluates to double 35.0, which is cast back to int 35 by the hidden compound narrowing cast.'
    },
    {
      id: 'op-assign-compound-bits',
      title: 'Bitwise Compound Flag Toggling',
      problemStatement: `Demonstrate bitwise compound operators:
1. Initialize flags to 0.
2. Turn on bit 2 (value 4) using |=.
3. Toggle bit 2 off using ^=.
Print the flags value at each step.

Input:
int flags = 0;

Output Format:
Initial Flags: 0
After Setting Bit 2: 4
After Toggling Bit 2 Off: 0`,
      hint: 'Use `flags |= 4` to set bit 2 and `flags ^= 4` to toggle it.',
      solutionCode: `public class BitwiseCompoundFlags {
    public static void main(String[] args) {
        int flags = 0;
        System.out.println("Initial Flags: " + flags);

        flags |= 4; // Turn on bit 2
        System.out.println("After Setting Bit 2: " + flags);

        flags ^= 4; // Toggle bit 2 off
        System.out.println("After Toggling Bit 2 Off: " + flags);
    }
}`,
      output: `Initial Flags: 0
After Setting Bit 2: 4
After Toggling Bit 2 Off: 0`,
      explanation: 'Bitwise compound OR (|=) sets specific bits, while XOR (^=) flips bits between 0 and 1.'
    },
    {
      id: 'op-assign-eval-order',
      title: 'Compound Assignment Evaluation Order Mystery',
      problemStatement: `Trace the evaluation order of compound assignment when the right-hand operand reassigns the target variable.
Given int a = 5, execute:
a += (a = 3);
Print the final value of a and explain why it is 8 rather than 6.

Input:
int a = 5;

Output Format:
Final value of a: 8`,
      hint: 'In `a += expr`, the left-hand variable\'s initial value (5) is captured BEFORE evaluating the right-hand expression.',
      solutionCode: `public class AssignmentEvaluationOrder {
    public static void main(String[] args) {
        int a = 5;

        a += (a = 3); // LHS captured as 5; RHS evaluates to 3; 5 + 3 = 8

        System.out.println("Final value of a: " + a);
    }
}`,
      output: 'Final value of a: 8',
      explanation: 'JLS §15.26.2 specifies that the destination variable and its current value (5) are captured first. Then (a = 3) evaluates to 3. The addition 5 + 3 produces 8, which is written to a.'
    }
  ],

  // ────────────────────────────────────────────────────────────
  // LESSON 3.6: The Ternary Operator (? :)
  // ────────────────────────────────────────────────────────────
  'ternary-operator': [
    {
      id: 'op-tern-min-max',
      title: 'Finding Minimum and Maximum of Two Numbers',
      problemStatement: `Write a program that finds both the minimum and maximum of two integers using inline ternary expressions.

Input:
int first = 48;
int second = 72;

Output Format:
Minimum: 48
Maximum: 72`,
      hint: 'Use `(first < second) ? first : second` for minimum and `(first > second) ? first : second` for maximum.',
      solutionCode: `public class MinMaxTernary {
    public static void main(String[] args) {
        int first = 48;
        int second = 72;

        int min = (first < second) ? first : second;
        int max = (first > second) ? first : second;

        System.out.println("Minimum: " + min);
        System.out.println("Maximum: " + max);
    }
}`,
      output: `Minimum: 48
Maximum: 72`,
      explanation: 'The ternary operator evaluates the condition and returns first for min and second for max.'
    },
    {
      id: 'op-tern-even-odd',
      title: 'Parity Checker using Ternary Operator',
      problemStatement: `Write a program that checks whether a given number is "EVEN" or "ODD" using a single ternary expression.

Input:
int num = 17;

Output Format:
Number 17 is: ODD`,
      hint: 'Check if `num % 2 == 0 ? "EVEN" : "ODD"`.',
      solutionCode: `public class ParityTernary {
    public static void main(String[] args) {
        int num = 17;

        String parity = (num % 2 == 0) ? "EVEN" : "ODD";

        System.out.println("Number " + num + " is: " + parity);
    }
}`,
      output: 'Number 17 is: ODD',
      explanation: '17 % 2 is 1 (not 0), so the false branch "ODD" is selected.'
    },
    {
      id: 'op-tern-abs-val',
      title: 'Absolute Value Calculator',
      problemStatement: `Write a program that calculates the absolute value of a signed integer using the ternary operator without using Math.abs().

Input:
int value = -34;

Output Format:
Original: -34
Absolute Value: 34`,
      hint: 'If `value < 0`, negate it (`-value`); otherwise keep `value`.',
      solutionCode: `public class AbsoluteValueTernary {
    public static void main(String[] args) {
        int value = -34;

        int abs = (value < 0) ? -value : value;

        System.out.println("Original: " + value);
        System.out.println("Absolute Value: " + abs);
    }
}`,
      output: `Original: -34
Absolute Value: 34`,
      explanation: 'Because -34 < 0 is true, the true branch evaluates -(-34), yielding positive 34.'
    },
    {
      id: 'op-tern-pass-fail',
      title: 'Academic Distinction Classifier',
      problemStatement: `Classify a student\'s performance into three tiers using nested ternary expressions:
- Score >= 85: "Distinction"
- Score >= 50: "Pass"
- Otherwise: "Fail"

Input:
int score = 88;

Output Format:
Score: 88
Status: Distinction`,
      hint: 'Nest the ternaries: `score >= 85 ? "Distinction" : (score >= 50 ? "Pass" : "Fail")`.',
      solutionCode: `public class DistinctionClassifier {
    public static void main(String[] args) {
        int score = 88;

        String status = (score >= 85) ? "Distinction"
                      : (score >= 50) ? "Pass"
                      : "Fail";

        System.out.println("Score: " + score);
        System.out.println("Status: " + status);
    }
}`,
      output: `Score: 88
Status: Distinction`,
      explanation: 'score >= 85 evaluates to true, immediately selecting "Distinction" without evaluating subsequent branches.'
    },
    {
      id: 'op-tern-type-promotion',
      title: 'Implicit Double Promotion in Ternary Expression',
      problemStatement: `Demonstrate the binary numeric promotion rule in ternary operators.
Evaluate an expression where condition is true, the true branch is integer 25, and the false branch is double 30.5.
Assign the result to a double variable and print it.

Input:
boolean condition = true;

Output Format:
Promoted Value: 25.0`,
      hint: 'Because one branch is a double, the integer 25 is promoted to double 25.0 at compile time.',
      solutionCode: `public class TernaryTypePromotion {
    public static void main(String[] args) {
        boolean condition = true;

        double result = condition ? 25 : 30.5;

        System.out.println("Promoted Value: " + result);
    }
}`,
      output: 'Promoted Value: 25.0',
      explanation: 'Type unification rules dictate that mixing int and double promotes the whole expression to double, producing 25.0.'
    },
    {
      id: 'op-tern-short-circuit',
      title: 'Short-Circuiting in Ternary Branch Evaluation',
      problemStatement: `Demonstrate that the unselected branch of a ternary operator never executes side effects.
Initialize counter to 10.
Evaluate \`boolean flag = true; int result = flag ? 500 : ++counter;\`.
Print result and counter to prove counter remains 10.

Input:
int counter = 10;
boolean flag = true;

Output Format:
Result: 500
Counter: 10`,
      hint: 'When condition is true, only the true expression executes. The false branch ++counter is skipped.',
      solutionCode: `public class TernaryBranchShortCircuit {
    public static void main(String[] args) {
        int counter = 10;
        boolean flag = true;

        int result = flag ? 500 : ++counter;

        System.out.println("Result: " + result);
        System.out.println("Counter: " + counter);
    }
}`,
      output: `Result: 500
Counter: 10`,
      explanation: 'Ternary evaluates only the branch matching the condition. The ++counter expression is never reached, so counter stays 10.'
    },
    {
      id: 'op-tern-discount-calc',
      title: 'Tiered Discount Rate Selector',
      problemStatement: `Compute the final payable amount for a purchase using nested ternary expressions:
- Purchases >= 1000 receive 20% discount (0.20)
- Purchases >= 500 receive 10% discount (0.10)
- Purchases below 500 receive 0% discount (0.0)

Input:
double billAmount = 800.0;

Output Format:
Bill Amount: 800.0
Discount Rate: 0.1
Final Payable: 720.0`,
      hint: 'Select the discount rate first with nested ternary: `bill >= 1000 ? 0.20 : bill >= 500 ? 0.10 : 0.0`.',
      solutionCode: `public class TieredDiscountCalculator {
    public static void main(String[] args) {
        double billAmount = 800.0;

        double discountRate = (billAmount >= 1000) ? 0.20
                            : (billAmount >= 500)  ? 0.10
                            : 0.0;

        double discount = billAmount * discountRate;
        double finalPayable = billAmount - discount;

        System.out.println("Bill Amount: " + billAmount);
        System.out.println("Discount Rate: " + discountRate);
        System.out.println("Final Payable: " + finalPayable);
    }
}`,
      output: `Bill Amount: 800.0
Discount Rate: 0.1
Final Payable: 720.0`,
      explanation: '800.0 is >= 500, selecting a 10% discount rate (0.1). 800.0 - 80.0 leaves 720.0.'
    },
    {
      id: 'op-tern-char-case',
      title: 'Character Case Classifier',
      problemStatement: `Classify a character into "UPPERCASE", "LOWERCASE", or "OTHER" using nested ternary expressions.

Input:
char testChar = 'K';

Output Format:
Character: K
Case: UPPERCASE`,
      hint: 'Check `(ch >= \'A\' && ch <= \'Z\') ? "UPPERCASE" : (ch >= \'a\' && ch <= \'z\') ? "LOWERCASE" : "OTHER"`.',
      solutionCode: `public class CharCaseClassifier {
    public static void main(String[] args) {
        char testChar = 'K';

        String classification = (testChar >= 'A' && testChar <= 'Z') ? "UPPERCASE"
                              : (testChar >= 'a' && testChar <= 'z') ? "LOWERCASE"
                              : "OTHER";

        System.out.println("Character: " + testChar);
        System.out.println("Case: " + classification);
    }
}`,
      output: `Character: K
Case: UPPERCASE`,
      explanation: '\'K\' falls between \'A\' and \'Z\', so the first branch evaluates to "UPPERCASE".'
    },
    {
      id: 'op-tern-nested-validator',
      title: 'Three-Way Signum Evaluator',
      problemStatement: `Implement the mathematical signum (sign) function using nested ternary operators:
- Returns 1 if number is positive
- Returns -1 if number is negative
- Returns 0 if number is zero

Input:
int number = -18;

Output Format:
Number: -18
Signum: -1`,
      hint: 'Use `(num > 0) ? 1 : (num < 0) ? -1 : 0`.',
      solutionCode: `public class SignumEvaluator {
    public static void main(String[] args) {
        int number = -18;

        int sign = (number > 0) ? 1 : (number < 0) ? -1 : 0;

        System.out.println("Number: " + number);
        System.out.println("Signum: " + sign);
    }
}`,
      output: `Number: -18
Signum: -1`,
      explanation: '-18 > 0 is false, so it moves to -18 < 0 which is true, yielding -1.'
    },
    {
      id: 'op-tern-safe-division',
      title: 'Safe Division Fallback with Ternary',
      problemStatement: `Write a program that calculates average items per box using the ternary operator.
If boxes count is 0, return 0 instead of dividing to avoid ArithmeticException.

Input:
int totalItems = 250;
int boxes = 5;

Output Format:
Total Items: 250
Boxes: 5
Items Per Box: 50`,
      hint: 'Expression: `(boxes != 0) ? (totalItems / boxes) : 0`.',
      solutionCode: `public class SafeDivisionTernary {
    public static void main(String[] args) {
        int totalItems = 250;
        int boxes = 5;

        int itemsPerBox = (boxes != 0) ? (totalItems / boxes) : 0;

        System.out.println("Total Items: " + totalItems);
        System.out.println("Boxes: " + boxes);
        System.out.println("Items Per Box: " + itemsPerBox);
    }
}`,
      output: `Total Items: 250
Boxes: 5
Items Per Box: 50`,
      explanation: 'Since boxes (5) != 0 is true, the division 250 / 5 evaluates cleanly to 50.'
    }
  ]
};
