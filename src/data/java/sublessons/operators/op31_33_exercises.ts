import { ProgrammingExercise } from '../../detailedLessons';

export const op31_33_exercises: Record<string, ProgrammingExercise[]> = {
  // ============================================================
  // LESSON 3.1: Arithmetic Operators & Modulo (%)
  // ============================================================
  'arithmetic-and-modulo': [
    {
      id: 'op-arith-1',
      title: 'Shopping Cart Total and Average Price',
      problemStatement: `Write a Java program to calculate the total cost and the average price of three shopping items priced at $25, $40, and $15.
Ensure the average price preserves decimal accuracy using floating-point division.

Input:
- Item 1: 25
- Item 2: 40
- Item 3: 15

Output Format:
Total: $[total]
Average: $[average]`,
      hint: 'To avoid integer division truncation, cast the sum to (double) or divide by 3.0 instead of 3.',
      solutionCode: `public class ShoppingCart {
    public static void main(String[] args) {
        int item1 = 25;
        int item2 = 40;
        int item3 = 15;

        int total = item1 + item2 + item3;
        double average = (double) total / 3;

        System.out.println("Total: $" + total);
        System.out.println("Average: $" + average);
    }
}`,
      output: `Total: $80
Average: $26.666666666666668`,
      explanation: 'The sum of 25 + 40 + 15 is 80. Casting total to (double) before dividing by 3 ensures floating-point division produces 26.666... rather than truncated integer 26.'
    },
    {
      id: 'op-arith-2',
      title: 'Even or Odd Number Classifier',
      problemStatement: `Write a program to determine if an integer variable is even or odd using the modulo operator (%).

Input:
int number = 47;

Output Format:
Print "[number] is EVEN" if divisible by 2 with no remainder, otherwise print "[number] is ODD".`,
      hint: 'Use (number % 2 == 0) to check for evenness.',
      solutionCode: `public class EvenOddCheck {
    public static void main(String[] args) {
        int number = 47;

        if (number % 2 == 0) {
            System.out.println(number + " is EVEN");
        } else {
            System.out.println(number + " is ODD");
        }
    }
}`,
      output: '47 is ODD',
      explanation: '47 divided by 2 is 23 with a remainder of 1. Because 47 % 2 is not 0, the else branch executes.'
    },
    {
      id: 'op-arith-3',
      title: 'Extract Last Digit of an Integer',
      problemStatement: `Write a program that extracts and prints the units (rightmost) digit of an integer using the modulo operator.

Input:
int num = 8492;

Output Format:
The last digit of [num] is: [digit]`,
      hint: 'Any integer modulo 10 (num % 10) returns its rightmost digit.',
      solutionCode: `public class ExtractLastDigit {
    public static void main(String[] args) {
        int num = 8492;
        int lastDigit = num % 10;

        System.out.println("The last digit of " + num + " is: " + lastDigit);
    }
}`,
      output: 'The last digit of 8492 is: 2',
      explanation: '8492 divided by 10 is 849 with a remainder of 2. The expression num % 10 isolates this remainder.'
    },
    {
      id: 'op-arith-4',
      title: 'Remove the Last Digit from a Number',
      problemStatement: `Write a program that removes the units digit from an integer using integer division.

Input:
int num = 8492;

Output Format:
Original: [num]
After removing last digit: [result]`,
      hint: 'Dividing an integer by 10 (num / 10) truncates the decimal and effectively drops the units digit.',
      solutionCode: `public class RemoveLastDigit {
    public static void main(String[] args) {
        int num = 8492;
        int remaining = num / 10;

        System.out.println("Original: " + num);
        System.out.println("After removing last digit: " + remaining);
    }
}`,
      output: `Original: 8492
After removing last digit: 849`,
      explanation: 'Integer division 8492 / 10 truncates toward zero, discarding the 0.2 fractional part and leaving 849.'
    },
    {
      id: 'op-arith-5',
      title: 'Seconds to Time Breakdown',
      problemStatement: `Write a program to convert a total duration given in seconds into whole hours, remaining whole minutes, and remaining seconds.

Input:
int totalSeconds = 3665;

Output Format:
[totalSeconds] seconds = [hours]h [minutes]m [seconds]s`,
      hint: 'There are 3600 seconds in an hour. Calculate hours with totalSeconds / 3600, then find remainder with % 3600. Then divide remainder by 60 for minutes, and % 60 for seconds.',
      solutionCode: `public class TimeConverter {
    public static void main(String[] args) {
        int totalSeconds = 3665;

        int hours = totalSeconds / 3600;
        int remainderAfterHours = totalSeconds % 3600;
        int minutes = remainderAfterHours / 60;
        int seconds = remainderAfterHours % 60;

        System.out.println(totalSeconds + " seconds = " + hours + "h " + minutes + "m " + seconds + "s");
    }
}`,
      output: '3665 seconds = 1h 1m 5s',
      explanation: '3665 / 3600 = 1 hour. The remainder 3665 % 3600 = 65 seconds. 65 / 60 = 1 minute, and 65 % 60 = 5 seconds.'
    },
    {
      id: 'op-arith-6',
      title: 'Student Exam Percentage with Floating-Point Precision',
      problemStatement: `A student scored 435 marks out of a total possible of 500.
Write a program to calculate the exact percentage, ensuring you do not truncate the result to 0.

Input:
- int scored = 435;
- int maxMarks = 500;

Output Format:
Marks Scored: [scored]/[maxMarks]
Percentage: [percentage]%`,
      hint: 'Multiply scored by 100.0 or cast to (double) before dividing: ((double) scored / maxMarks) * 100.',
      solutionCode: `public class ExamPercentage {
    public static void main(String[] args) {
        int scored = 435;
        int maxMarks = 500;

        double percentage = ((double) scored / maxMarks) * 100.0;

        System.out.println("Marks Scored: " + scored + "/" + maxMarks);
        System.out.println("Percentage: " + percentage + "%");
    }
}`,
      output: `Marks Scored: 435/500
Percentage: 87.0%`,
      explanation: 'Without casting, 435 / 500 integer division would truncate to 0. Casting scored to double yields 0.87, which multiplied by 100.0 gives 87.0%.'
    },
    {
      id: 'op-arith-7',
      title: 'Leap Year Divisibility Verifier',
      problemStatement: `Write a program to check if the year 2024 is a leap year using modulo operations.
A leap year is divisible by 4 AND not divisible by 100, OR it is divisible by 400.

Input:
int year = 2024;

Output Format:
Year: [year]
Is Leap Year: [true/false]`,
      hint: 'Combine conditions using modulo: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0).',
      solutionCode: `public class LeapYearCheck {
    public static void main(String[] args) {
        int year = 2024;

        boolean isLeapYear = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

        System.out.println("Year: " + year);
        System.out.println("Is Leap Year: " + isLeapYear);
    }
}`,
      output: `Year: 2024
Is Leap Year: true`,
      explanation: '2024 is evenly divisible by 4 (2024 % 4 == 0) and not divisible by 100 (2024 % 100 != 0), fulfilling the primary leap year condition.'
    },
    {
      id: 'op-arith-8',
      title: 'ATM Cash Withdrawal Denomination Breakdown',
      problemStatement: `An ATM needs to dispense $388 using the fewest bills possible using denominations of $100, $50, $20, and $1.
Write a program using division and modulo to compute the count of each bill.

Input:
int amount = 388;

Output Format:
$100 bills: [count]
$50 bills: [count]
$20 bills: [count]
$1 bills: [count]`,
      hint: 'At each step, calculate the bill count with / and update the remaining amount with %.',
      solutionCode: `public class AtmDenominations {
    public static void main(String[] args) {
        int amount = 388;

        int bills100 = amount / 100;
        amount = amount % 100; // Remaining: 88

        int bills50 = amount / 50;
        amount = amount % 50;  // Remaining: 38

        int bills20 = amount / 20;
        amount = amount % 20;  // Remaining: 18

        int bills1 = amount;

        System.out.println("$100 bills: " + bills100);
        System.out.println("$50 bills: " + bills50);
        System.out.println("$20 bills: " + bills20);
        System.out.println("$1 bills: " + bills1);
    }
}`,
      output: `$100 bills: 3
$50 bills: 1
$20 bills: 1
$1 bills: 18`,
      explanation: '388 / 100 = 3 ($300). Remaining 88 / 50 = 1 ($50). Remaining 38 / 20 = 1 ($20). Remaining 18 / 1 = 18 ($18).'
    },
    {
      id: 'op-arith-9',
      title: 'Swap Two Variables Without a Temporary Variable',
      problemStatement: `Write a Java program to swap the values of two integer variables without declaring a third (temporary) variable, using only addition and subtraction.

Input:
int a = 15;
int b = 27;

Output Format:
Before: a = [a], b = [b]
After: a = [a], b = [b]`,
      hint: 'Step 1: a = a + b; Step 2: b = a - b; Step 3: a = a - b;',
      solutionCode: `public class SwapNumbers {
    public static void main(String[] args) {
        int a = 15;
        int b = 27;

        System.out.println("Before: a = " + a + ", b = " + b);

        a = a + b; // a becomes 42
        b = a - b; // b becomes 42 - 27 = 15 (original a)
        a = a - b; // a becomes 42 - 15 = 27 (original b)

        System.out.println("After: a = " + a + ", b = " + b);
    }
}`,
      output: `Before: a = 15, b = 27
After: a = 27, b = 15`,
      explanation: 'Using arithmetic relations, storing the sum in "a" allows recovering the original "a" by subtracting "b", and then recovering "b" similarly.'
    },
    {
      id: 'op-arith-10',
      title: 'Sum of Digits of a Three-Digit Number',
      problemStatement: `Write a program to calculate the sum of the digits of a three-digit integer (e.g., 574) using only division and modulo operators.

Input:
int num = 574;

Output Format:
Number: [num]
Sum of digits: [sum]`,
      hint: 'Extract hundreds with num / 100, tens with (num / 10) % 10, and units with num % 10.',
      solutionCode: `public class SumOfDigits {
    public static void main(String[] args) {
        int num = 574;

        int hundreds = num / 100;
        int tens = (num / 10) % 10;
        int units = num % 10;

        int sum = hundreds + tens + units;

        System.out.println("Number: " + num);
        System.out.println("Sum of digits: " + sum);
    }
}`,
      output: `Number: 574
Sum of digits: 16`,
      explanation: '574 / 100 = 5. (574 / 10) % 10 = 57 % 10 = 7. 574 % 10 = 4. Sum = 5 + 7 + 4 = 16.'
    }
  ],

  // ============================================================
  // LESSON 3.2: Pre vs Post Increment (++i vs i++)
  // ============================================================
  'pre-post-increment': [
    {
      id: 'op-inc-1',
      title: 'Compare Post-Increment and Pre-Increment Assignments',
      problemStatement: `Write a program to clearly observe the difference between post-increment and pre-increment when assigned to new variables.

Input:
int a = 10;
int b = 10;

Operations:
int x = a++;
int y = ++b;

Output Format:
x = [x], a = [a]
y = [y], b = [b]`,
      hint: 'a++ assigns first then increments. ++b increments first then assigns.',
      solutionCode: `public class IncrementComparison {
    public static void main(String[] args) {
        int a = 10;
        int b = 10;

        int x = a++;
        int y = ++b;

        System.out.println("x = " + x + ", a = " + a);
        System.out.println("y = " + y + ", b = " + b);
    }
}`,
      output: `x = 10, a = 11
y = 11, b = 11`,
      explanation: 'x receives the original value of a (10) before a becomes 11. y receives the new incremented value of b (11) because ++b increments first.'
    },
    {
      id: 'op-inc-2',
      title: 'Inline Print Statement Increments',
      problemStatement: `Write a program that prints a variable while using post-increment and pre-increment directly inside System.out.println.

Input:
int val = 5;

Output Format:
Initial: 5
During val++: 5
After val++: 6
During ++val: 7
After ++val: 7`,
      hint: 'val++ returns 5 to println, then val becomes 6. ++val increments 6 to 7 and returns 7 to println.',
      solutionCode: `public class PrintIncrement {
    public static void main(String[] args) {
        int val = 5;

        System.out.println("Initial: " + val);
        System.out.println("During val++: " + (val++));
        System.out.println("After val++: " + val);
        System.out.println("During ++val: " + (++val));
        System.out.println("After ++val: " + val);
    }
}`,
      output: `Initial: 5
During val++: 5
After val++: 6
During ++val: 7
After ++val: 7`,
      explanation: 'val++ passes the unmodified 5 to println and then updates memory to 6. ++val updates memory from 6 to 7 first and passes 7 to println.'
    },
    {
      id: 'op-inc-3',
      title: 'Step-by-Step Counter Mutation',
      problemStatement: `Write a program that uses standalone increment operators on an integer variable and prints its value after each step.

Input:
int counter = 0;

Operations:
1. counter++
2. ++counter
3. counter++

Output Format:
Step 1: [counter]
Step 2: [counter]
Step 3: [counter]`,
      hint: 'As standalone statements, both counter++ and ++counter simply increase counter by 1.',
      solutionCode: `public class CounterSteps {
    public static void main(String[] args) {
        int counter = 0;

        counter++;
        System.out.println("Step 1: " + counter);

        ++counter;
        System.out.println("Step 2: " + counter);

        counter++;
        System.out.println("Step 3: " + counter);
    }
}`,
      output: `Step 1: 1
Step 2: 2
Step 3: 3`,
      explanation: 'Each standalone statement increments counter by 1, progressing from 0 to 1, then 2, then 3.'
    },
    {
      id: 'op-inc-4',
      title: 'Post-Decrement in Compound Arithmetic',
      problemStatement: `Write a program that uses the post-decrement operator inside an arithmetic calculation.
Given a player who has 3 lives and a score multiplier of 10, calculate the score before the life is consumed.

Input:
int lives = 3;
int multiplier = 10;
int score = lives-- * multiplier;

Output Format:
Score Awarded: [score]
Remaining Lives: [lives]`,
      hint: 'lives-- uses the current value of lives (3) in the multiplication, then decrements lives to 2.',
      solutionCode: `public class LifeDecrement {
    public static void main(String[] args) {
        int lives = 3;
        int multiplier = 10;

        int score = lives-- * multiplier;

        System.out.println("Score Awarded: " + score);
        System.out.println("Remaining Lives: " + lives);
    }
}`,
      output: `Score Awarded: 30
Remaining Lives: 2`,
      explanation: 'lives-- evaluates to 3 for the multiplication (3 * 10 = 30), and afterwards decrements lives from 3 to 2.'
    },
    {
      id: 'op-inc-5',
      title: 'Dual Variable Increment Addition',
      problemStatement: `Write a program to evaluate the sum of two variables where both variables are post-incremented in the same expression.

Input:
int a = 4;
int b = 7;
int sum = a++ + b++;

Output Format:
sum = [sum]
a = [a]
b = [b]`,
      hint: 'Both a++ and b++ evaluate to their original values before incrementing.',
      solutionCode: `public class DualIncrement {
    public static void main(String[] args) {
        int a = 4;
        int b = 7;

        int sum = a++ + b++;

        System.out.println("sum = " + sum);
        System.out.println("a = " + a);
        System.out.println("b = " + b);
    }
}`,
      output: `sum = 11
a = 5
b = 8`,
      explanation: 'a++ returns 4 (a becomes 5). b++ returns 7 (b becomes 8). sum = 4 + 7 = 11.'
    },
    {
      id: 'op-inc-6',
      title: 'Tracing Same-Variable Pre and Post Addition',
      problemStatement: `Trace and print the result of the classic interview expression: result = n++ + ++n, where n begins at 5.

Input:
int n = 5;
int result = n++ + ++n;

Output Format:
result = [result]
final n = [n]`,
      hint: 'Left operand n++ returns 5 (n becomes 6). Right operand ++n increments 6 to 7 and returns 7.',
      solutionCode: `public class SameVarIncrement {
    public static void main(String[] args) {
        int n = 5;

        int result = n++ + ++n;

        System.out.println("result = " + result);
        System.out.println("final n = " + n);
    }
}`,
      output: `result = 12
final n = 7`,
      explanation: 'n++ returns 5 and modifies n to 6. Next, ++n increments n to 7 and returns 7. result = 5 + 7 = 12. Final n is 7.'
    },
    {
      id: 'op-inc-7',
      title: 'Mixed Increment and Decrement Arithmetic',
      problemStatement: `Evaluate an expression combining pre-decrement, post-increment, and post-increment across two variables: total = --x + y++ - x++.

Input:
int x = 10;
int y = 5;

Output Format:
total = [total]
x = [x]
y = [y]`,
      hint: 'Step-by-step: --x decrements x to 9 and returns 9. y++ returns 5 (y becomes 6). x++ returns 9 (x becomes 10).',
      solutionCode: `public class MixedIncrementTrace {
    public static void main(String[] args) {
        int x = 10;
        int y = 5;

        int total = --x + y++ - x++;

        System.out.println("total = " + total);
        System.out.println("x = " + x);
        System.out.println("y = " + y);
    }
}`,
      output: `total = 5
x = 10
y = 6`,
      explanation: '--x yields 9 (x=9). y++ yields 5 (y=6). x++ yields 9 (x=10). Calculation: 9 + 5 - 9 = 5.'
    },
    {
      id: 'op-inc-8',
      title: 'Demonstrating the Post-Increment Self-Assignment Trap',
      problemStatement: `Write a program to demonstrate why self-assigning a post-increment (i = i++) does NOT increase the variable, while self-assigning a pre-increment (j = ++j) does.

Input:
int i = 5;
int j = 5;

Operations:
i = i++;
j = ++j;

Output Format:
i after i = i++: [i]
j after j = ++j: [j]`,
      hint: 'i++ stores original value 5 on stack, increments i to 6, then = writes 5 back into i.',
      solutionCode: `public class SelfAssignmentDemo {
    public static void main(String[] args) {
        int i = 5;
        int j = 5;

        i = i++;
        j = ++j;

        System.out.println("i after i = i++: " + i);
        System.out.println("j after j = ++j: " + j);
    }
}`,
      output: `i after i = i++: 5
j after j = ++j: 6`,
      explanation: 'In i = i++, the original value 5 is returned first, and the assignment operator overwrites the increment with 5. In j = ++j, j is incremented to 6 first, so 6 is assigned back to j.'
    },
    {
      id: 'op-inc-9',
      title: 'Game Round Score and Health Simulation',
      problemStatement: `Simulate a player in a game:
- Starts with health = 3 and score = 100.
- Loses a life using --health.
- Earns bonus points where bonus = score++ * 2.

Print final health, bonus earned, and final score.

Output Format:
Final Health: [health]
Bonus Earned: [bonus]
Final Score: [score]`,
      hint: 'score++ returns 100 to the multiplication (100 * 2 = 200), and score increments to 101.',
      solutionCode: `public class GameSimulation {
    public static void main(String[] args) {
        int health = 3;
        int score = 100;

        --health; // health becomes 2
        int bonus = score++ * 2; // bonus = 100 * 2 = 200, score becomes 101

        System.out.println("Final Health: " + health);
        System.out.println("Bonus Earned: " + bonus);
        System.out.println("Final Score: " + score);
    }
}`,
      output: `Final Health: 2
Bonus Earned: 200
Final Score: 101`,
      explanation: '--health directly drops health from 3 to 2. score++ evaluates to 100 during multiplication (yielding 200) and leaves score at 101.'
    },
    {
      id: 'op-inc-10',
      title: 'Complex Four-Term Increment Expression Tracing',
      problemStatement: `Trace and evaluate the four-term expression:
int res = ++a * 3 + a++ - --a + a--;
starting with a = 2.

Output Format:
res = [res]
final a = [a]`,
      hint: 'Trace a through each term from left to right: ++a (a=3, returns 3), a++ (returns 3, a=4), --a (a=3, returns 3), a-- (returns 3, a=2).',
      solutionCode: `public class FourTermTrace {
    public static void main(String[] args) {
        int a = 2;

        int res = ++a * 3 + a++ - --a + a--;

        System.out.println("res = " + res);
        System.out.println("final a = " + a);
    }
}`,
      output: `res = 12
final a = 2`,
      explanation: 'Term 1: ++a makes a=3 and returns 3. 3 * 3 = 9. Term 2: a++ returns 3 (a becomes 4). Term 3: --a decrements a to 3 and returns 3. Term 4: a-- returns 3 (a becomes 2). Math: 9 + 3 - 3 + 3 = 12. Final a = 2.'
    }
  ],

  // ============================================================
  // LESSON 3.3: Relational & Equality Operators (== vs .equals())
  // ============================================================
  'relational-equality': [
    {
      id: 'op-rel-1',
      title: 'Relational Operator Truth Table Generator',
      problemStatement: `Write a program to evaluate and print the boolean results of all six relational operators comparing x = 15 and y = 20.

Input:
int x = 15;
int y = 20;

Output Format:
x > y: [result]
x < y: [result]
x >= y: [result]
x <= y: [result]
x == y: [result]
x != y: [result]`,
      hint: 'Use the operators >, <, >=, <=, ==, != directly inside println expressions.',
      solutionCode: `public class RelationalTruthTable {
    public static void main(String[] args) {
        int x = 15;
        int y = 20;

        System.out.println("x > y: " + (x > y));
        System.out.println("x < y: " + (x < y));
        System.out.println("x >= y: " + (x >= y));
        System.out.println("x <= y: " + (x <= y));
        System.out.println("x == y: " + (x == y));
        System.out.println("x != y: " + (x != y));
    }
}`,
      output: `x > y: false
x < y: true
x >= y: false
x <= y: true
x == y: false
x != y: true`,
      explanation: '15 is strictly less than 20, so <, <=, and != evaluate to true, while >, >=, and == evaluate to false.'
    },
    {
      id: 'op-rel-2',
      title: 'Voter Age Eligibility Checker',
      problemStatement: `Write a program to check if an applicant is eligible to vote (age 18 or older).
Store the result in a boolean variable and print the status.

Input:
int age = 19;

Output Format:
Age: [age]
Eligible to vote: [true/false]`,
      hint: 'Use the greater-than-or-equal-to operator: age >= 18.',
      solutionCode: `public class VotingEligibility {
    public static void main(String[] args) {
        int age = 19;
        boolean isEligible = age >= 18;

        System.out.println("Age: " + age);
        System.out.println("Eligible to vote: " + isEligible);
    }
}`,
      output: `Age: 19
Eligible to vote: true`,
      explanation: 'Because 19 >= 18 evaluates to true, isEligible stores true.'
    },
    {
      id: 'op-rel-3',
      title: 'Inclusive Range Boundary Verification',
      problemStatement: `Write a program to test whether a test score is within the valid inclusive range of 0 to 100.
Do not use chained comparisons (0 <= score <= 100 is illegal in Java).

Input:
int score = 75;

Output Format:
Score: [score]
Is Valid Score: [true/false]`,
      hint: 'Split the range check into two relational expressions joined by &&: (score >= 0 && score <= 100).',
      solutionCode: `public class RangeVerification {
    public static void main(String[] args) {
        int score = 75;
        boolean isValid = (score >= 0 && score <= 100);

        System.out.println("Score: " + score);
        System.out.println("Is Valid Score: " + isValid);
    }
}`,
      output: `Score: 75
Is Valid Score: true`,
      explanation: '75 >= 0 is true, and 75 <= 100 is true. true && true produces true.'
    },
    {
      id: 'op-rel-4',
      title: 'Cross-Type Numeric and Character Equality',
      problemStatement: `Write a program to verify that Java performs widening numeric promotion when comparing mixed primitive types with ==.
Test:
1. int 100 == double 100.0
2. char 'Z' == int 90

Output Format:
100 == 100.0: [true/false]
'Z' == 90: [true/false]`,
      hint: 'Java promotes int 100 to double 100.0, and char \'Z\' to its ASCII code 90 before equality checking.',
      solutionCode: `public class CrossTypeEquality {
    public static void main(String[] args) {
        int iVal = 100;
        double dVal = 100.0;
        char cVal = 'Z';
        int asciiVal = 90;

        System.out.println("100 == 100.0: " + (iVal == dVal));
        System.out.println("'Z' == 90: " + (cVal == asciiVal));
    }
}`,
      output: `100 == 100.0: true
'Z' == 90: true`,
      explanation: 'Numeric promotion automatically converts iVal to double 100.0, which matches dVal. \'Z\' has Unicode value 90, which matches asciiVal.'
    },
    {
      id: 'op-rel-5',
      title: 'String Reference vs Textual Content Comparison',
      problemStatement: `Demonstrate the fundamental difference between == and .equals() using String objects.
Create one string literal "Java" and another string using new String("Java").
Print the comparison results.

Output Format:
Using ==: [true/false]
Using .equals(): [true/false]`,
      hint: '== compares memory addresses (different for new String), while .equals() compares the characters.',
      solutionCode: `public class StringEqualityDemo {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = new String("Java");

        boolean referenceEqual = (s1 == s2);
        boolean contentEqual = s1.equals(s2);

        System.out.println("Using ==: " + referenceEqual);
        System.out.println("Using .equals(): " + contentEqual);
    }
}`,
      output: `Using ==: false
Using .equals(): true`,
      explanation: 's1 and s2 point to different memory locations because "new" allocates a new instance, so == is false. However, both strings contain the characters \'J\', \'a\', \'v\', \'a\', so .equals() is true.'
    },
    {
      id: 'op-rel-6',
      title: 'Case-Insensitive Admin Command Verification',
      problemStatement: `Write a program to compare an input command with a target command ("QUIT").
Compare using both .equals() and .equalsIgnoreCase() to observe case sensitivity.

Input:
String target = "QUIT";
String input = "quit";

Output Format:
Exact Match (.equals): [true/false]
Case-Insensitive Match (.equalsIgnoreCase): [true/false]`,
      hint: '.equals() requires identical casing, whereas .equalsIgnoreCase() ignores case.',
      solutionCode: `public class CommandVerification {
    public static void main(String[] args) {
        String target = "QUIT";
        String input = "quit";

        boolean exactMatch = target.equals(input);
        boolean ignoreCaseMatch = target.equalsIgnoreCase(input);

        System.out.println("Exact Match (.equals): " + exactMatch);
        System.out.println("Case-Insensitive Match (.equalsIgnoreCase): " + ignoreCaseMatch);
    }
}`,
      output: `Exact Match (.equals): false
Case-Insensitive Match (.equalsIgnoreCase): true`,
      explanation: 'target.equals(input) is false because \'Q\' != \'q\'. target.equalsIgnoreCase(input) matches them successfully.'
    },
    {
      id: 'op-rel-7',
      title: 'Exam Pass Criteria Verification',
      problemStatement: `A student must score at least 40 marks in theory AND at least 40 marks in practical to pass an exam.
Given theory = 45 and practical = 38, check if the student passed both components and print the outcome.

Input:
int theory = 45;
int practical = 38;

Output Format:
Theory Passed: [true/false]
Practical Passed: [true/false]
Overall Passed: [true/false]`,
      hint: 'Use >= 40 for both components and join with && for overall result.',
      solutionCode: `public class PassCriteriaCheck {
    public static void main(String[] args) {
        int theory = 45;
        int practical = 38;

        boolean passTheory = theory >= 40;
        boolean passPractical = practical >= 40;
        boolean passOverall = passTheory && passPractical;

        System.out.println("Theory Passed: " + passTheory);
        System.out.println("Practical Passed: " + passPractical);
        System.out.println("Overall Passed: " + passOverall);
    }
}`,
      output: `Theory Passed: true
Practical Passed: false
Overall Passed: false`,
      explanation: '45 >= 40 is true, but 38 >= 40 is false. Because both must be true for &&, overall pass status is false.'
    },
    {
      id: 'op-rel-8',
      title: 'Triangle Inequality Side Length Validator',
      problemStatement: `According to the triangle inequality theorem, three positive lengths can form a triangle if and only if the sum of any two sides is strictly greater than the third side.
Check if sides a = 5, b = 7, c = 10 can form a triangle.

Output Format:
Side a: 5, Side b: 7, Side c: 10
Valid Triangle: [true/false]`,
      hint: 'Verify (a + b > c) && (a + c > b) && (b + c > a).',
      solutionCode: `public class TriangleValidator {
    public static void main(String[] args) {
        int a = 5;
        int b = 7;
        int c = 10;

        boolean isValidTriangle = (a + b > c) && (a + c > b) && (b + c > a);

        System.out.println("Side a: " + a + ", Side b: " + b + ", Side c: " + c);
        System.out.println("Valid Triangle: " + isValidTriangle);
    }
}`,
      output: `Side a: 5, Side b: 7, Side c: 10
Valid Triangle: true`,
      explanation: '5 + 7 = 12 > 10 (true), 5 + 10 = 15 > 7 (true), 7 + 10 = 17 > 5 (true). All three inequalities hold, confirming a valid triangle.'
    },
    {
      id: 'op-rel-9',
      title: 'Product Discount Eligibility Check',
      problemStatement: `A customer qualifies for a discount if their purchase total is at least $100.0 OR if they are a premium loyalty member.
Given purchase = 85.0 and isPremium = true, determine discount eligibility.

Input:
double purchase = 85.0;
boolean isPremium = true;

Output Format:
Purchase Amount: $[purchase]
Premium Member: [true/false]
Discount Qualified: [true/false]`,
      hint: 'Combine the conditions using logical OR (||): (purchase >= 100.0 || isPremium).',
      solutionCode: `public class DiscountCheck {
    public static void main(String[] args) {
        double purchase = 85.0;
        boolean isPremium = true;

        boolean qualifiesForDiscount = (purchase >= 100.0) || isPremium;

        System.out.println("Purchase Amount: $" + purchase);
        System.out.println("Premium Member: " + isPremium);
        System.out.println("Discount Qualified: " + qualifiesForDiscount);
    }
}`,
      output: `Purchase Amount: $85.0
Premium Member: true
Discount Qualified: true`,
      explanation: 'Although 85.0 >= 100.0 is false, isPremium is true. The logical OR operator (||) evaluates to true if either condition is met.'
    },
    {
      id: 'op-rel-10',
      title: 'Two-Factor Login Credential Checker',
      problemStatement: `Validate login credentials where:
- Username must match "admin" (case-insensitive).
- Security PIN must match numeric integer 4321.

Input:
String inputUsername = "Admin";
int inputPin = 4321;

Output Format:
Username Match: [true/false]
PIN Match: [true/false]
Access Granted: [true/false]`,
      hint: 'Use .equalsIgnoreCase("admin") for username and == 4321 for the integer PIN.',
      solutionCode: `public class LoginCredentialsCheck {
    public static void main(String[] args) {
        String inputUsername = "Admin";
        int inputPin = 4321;

        boolean userMatch = inputUsername.equalsIgnoreCase("admin");
        boolean pinMatch = (inputPin == 4321);
        boolean accessGranted = userMatch && pinMatch;

        System.out.println("Username Match: " + userMatch);
        System.out.println("PIN Match: " + pinMatch);
        System.out.println("Access Granted: " + accessGranted);
    }
}`,
      output: `Username Match: true
PIN Match: true
Access Granted: true`,
      explanation: '"Admin".equalsIgnoreCase("admin") evaluates to true, and 4321 == 4321 evaluates to true. Both conditions are satisfied, granting access.'
    }
  ]
};
