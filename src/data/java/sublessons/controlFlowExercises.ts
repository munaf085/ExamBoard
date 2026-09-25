import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR CONTROL FLOW
// Every problem has Input Format, Output Format, Examples,
// Hints, Complete Runnable Java Solution, and Expected Output.
// ============================================================

export const controlFlowExercises: Record<string, ProgrammingExercise[]> = {
  // ── 4.1 If-Else Ladders & Decision Making (7 Exercises) ──
  'if-else-ladder': [
    {
      id: 'cf-if-1',
      title: '1. Check Divisibility by Both 2 and 3',
      problemStatement: `Write a Java program to check whether a given integer is divisible by both 2 and 3.

Input Format: An integer variable \`int num\` (e.g. 18).
Output Format: Print "[num] is divisible by both 2 and 3" if divisible, otherwise print "[num] is not divisible by both 2 and 3".

Example 1:
Input: num = 18
Output: 18 is divisible by both 2 and 3

Example 2:
Input: num = 14
Output: 14 is not divisible by both 2 and 3`,
      hint: 'Use the modulo operator % along with the short-circuit logical AND (&&): (num % 2 == 0 && num % 3 == 0).',
      solutionCode: `public class DivisibilityCheck {
    public static void main(String[] args) {
        int num = 18;

        if (num % 2 == 0 && num % 3 == 0) {
            System.out.println(num + " is divisible by both 2 and 3");
        } else {
            System.out.println(num + " is not divisible by both 2 and 3");
        }
    }
}`,
      output: '18 is divisible by both 2 and 3',
      explanation: '18 % 2 equals 0 (even), and 18 % 3 equals 0. Both conditions are true, so the if-branch executes.'
    },
    {
      id: 'cf-if-2',
      title: '2. Voting Eligibility Checker',
      problemStatement: `Write a program to determine if a citizen is eligible to vote based on age and citizenship status.

Input Format:
- \`int age\`
- \`boolean isCitizen\`

Output Format: Print "Eligible to vote" or "Not eligible: [reason]".

Example 1:
Input: age = 20, isCitizen = true
Output: Eligible to vote

Example 2:
Input: age = 16, isCitizen = true
Output: Not eligible: Underage (must be 18+)`,
      hint: 'First check if age >= 18. If true, verify isCitizen == true using nested if or compound condition.',
      solutionCode: `public class VotingEligibility {
    public static void main(String[] args) {
        int age = 20;
        boolean isCitizen = true;

        if (age >= 18 && isCitizen) {
            System.out.println("Eligible to vote");
        } else if (age < 18) {
            System.out.println("Not eligible: Underage (must be 18+)");
        } else {
            System.out.println("Not eligible: Citizenship required");
        }
    }
}`,
      output: 'Eligible to vote',
      explanation: 'Since age is 20 (>= 18) and isCitizen is true, the citizen meets all constitutional criteria.'
    },
    {
      id: 'cf-if-3',
      title: '3. Student Grading System (A, B, C, D, F)',
      problemStatement: `Implement an academic grading calculator with the following grade bounds:
- 90 to 100: Grade A
- 80 to 89: Grade B
- 70 to 79: Grade C
- 60 to 69: Grade D
- Below 60: Grade F
- Outside 0-100: Invalid Score

Input Format: \`int marks\` (e.g. 84)
Output Format: Print "Score: [marks] -> Grade: [grade]"

Example 1:
Input: marks = 84
Output: Score: 84 -> Grade: B

Example 2:
Input: marks = 105
Output: Invalid score: marks must be between 0 and 100`,
      hint: 'Order your if-else ladder from highest score (90) down to lowest (60) to avoid shadowing later checks.',
      solutionCode: `public class GradeCalculator {
    public static void main(String[] args) {
        int marks = 84;

        if (marks < 0 || marks > 100) {
            System.out.println("Invalid score: marks must be between 0 and 100");
        } else if (marks >= 90) {
            System.out.println("Score: " + marks + " -> Grade: A");
        } else if (marks >= 80) {
            System.out.println("Score: " + marks + " -> Grade: B");
        } else if (marks >= 70) {
            System.out.println("Score: " + marks + " -> Grade: C");
        } else if (marks >= 60) {
            System.out.println("Score: " + marks + " -> Grade: D");
        } else {
            System.out.println("Score: " + marks + " -> Grade: F");
        }
    }
}`,
      output: 'Score: 84 -> Grade: B',
      explanation: 'Marks = 84 is evaluated: 84 >= 90 is false, then 84 >= 80 is true, setting Grade B and skipping the rest.'
    },
    {
      id: 'cf-if-4',
      title: '4. Leap Year Verification',
      problemStatement: `Determine whether a given year is a Leap Year.
Rules:
- A year is a leap year if divisible by 4, EXCEPT century years (divisible by 100).
- Century years are leap years ONLY if divisible by 400.

Input Format: \`int year\` (e.g. 2024, 1900, 2000)
Output Format: Print "[year] is a Leap Year" or "[year] is NOT a Leap Year".

Example 1: Input: 2024 -> Output: 2024 is a Leap Year
Example 2: Input: 1900 -> Output: 1900 is NOT a Leap Year
Example 3: Input: 2000 -> Output: 2000 is a Leap Year`,
      hint: 'Combine conditions: (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0).',
      solutionCode: `public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;
        boolean isLeap;

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            isLeap = true;
        } else {
            isLeap = false;
        }

        System.out.println(year + (isLeap ? " is a Leap Year" : " is NOT a Leap Year"));
    }
}`,
      output: '2024 is a Leap Year',
      explanation: '2024 is divisible by 4 and not divisible by 100, satisfying the first clause.'
    },
    {
      id: 'cf-if-5',
      title: '5. Largest of 3 Numbers using Nested If',
      problemStatement: `Find the maximum of three integer numbers without using Math.max(), strictly using nested if-else statements.

Input Format: \`int a, b, c\`
Output Format: Print "The largest number is: [max]"

Example:
Input: a = 25, b = 78, c = 43
Output: The largest number is: 78`,
      hint: 'Outer condition: if (a >= b). Inside that, check if (a >= c). In the else branch, check if (b >= c).',
      solutionCode: `public class MaxOfThree {
    public static void main(String[] args) {
        int a = 25, b = 78, c = 43;
        int max;

        if (a >= b) {
            if (a >= c) {
                max = a;
            } else {
                max = c;
            }
        } else {
            if (b >= c) {
                max = b;
            } else {
                max = c;
            }
        }

        System.out.println("The largest number is: " + max);
    }
}`,
      output: 'The largest number is: 78',
      explanation: 'Since 25 >= 78 is false, control jumps to the outer else branch. In the inner condition, 78 >= 43 is true, so max is 78.'
    },
    {
      id: 'cf-if-6',
      title: '6. Vowel or Consonant Identification',
      problemStatement: `Write a program that takes a character \`char ch\` and determines whether it is a Vowel, Consonant, or Not an Alphabet.

Input Format: \`char ch\` (e.g. 'E')
Output Format: Print "[ch] is a Vowel", "[ch] is a Consonant", or "[ch] is not an alphabet".

Example 1: Input: 'E' -> Output: E is a Vowel
Example 2: Input: 'k' -> Output: k is a Consonant
Example 3: Input: '9' -> Output: 9 is not an alphabet`,
      hint: 'First convert the character to lowercase with Character.toLowerCase(ch). Check if it is between "a" and "z", then check vowel set (a, e, i, o, u).',
      solutionCode: `public class VowelConsonantCheck {
    public static void main(String[] args) {
        char ch = 'E';
        char lower = Character.toLowerCase(ch);

        if (lower >= 'a' && lower <= 'z') {
            if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
                System.out.println(ch + " is a Vowel");
            } else {
                System.out.println(ch + " is a Consonant");
            }
        } else {
            System.out.println(ch + " is not an alphabet");
        }
    }
}`,
      output: 'E is a Vowel',
      explanation: 'Character "E" converted to lower is "e", which matches the vowel check.'
    },
    {
      id: 'cf-if-7',
      title: '7. Electricity Bill Calculator (Slab Pricing)',
      problemStatement: `Calculate the total electricity bill for a consumer based on tiered units:
- First 100 units: $1.50 per unit
- Next 100 units (101-200): $2.50 per unit
- Next 100 units (201-300): $4.00 per unit
- Above 300 units: $6.00 per unit
- Fixed surcharge: A meter charge of $50 is added to every bill.

Input Format: \`int units\` (e.g. 250)
Output Format: Print "Total Electricity Bill: $[amount]"

Example:
Input: units = 250
Calculation:
100 * 1.50 = 150
100 * 2.50 = 250
50 * 4.00 = 200
Surcharge = 50
Total = 150 + 250 + 200 + 50 = $650.00`,
      hint: 'Break calculations down by units consumed per tier: subtract units as you calculate each bracket.',
      solutionCode: `public class ElectricityBill {
    public static void main(String[] args) {
        int units = 250;
        double bill = 0;
        double meterCharge = 50.0;

        if (units <= 100) {
            bill = units * 1.50;
        } else if (units <= 200) {
            bill = (100 * 1.50) + (units - 100) * 2.50;
        } else if (units <= 300) {
            bill = (100 * 1.50) + (100 * 2.50) + (units - 200) * 4.00;
        } else {
            bill = (100 * 1.50) + (100 * 2.50) + (100 * 4.00) + (units - 300) * 6.00;
        }

        double total = bill + meterCharge;
        System.out.printf("Units: %d -> Total Electricity Bill: $%.2f\\n", units, total);
    }
}`,
      output: 'Units: 250 -> Total Electricity Bill: $650.00',
      explanation: 'The first 100 units cost $150, next 100 cost $250, remaining 50 cost $200. Plus $50 surcharge = $650.00.'
    }
  ],

  // ── 4.2 Traditional Switch Statement (5 Exercises) ──
  'switch-statement': [
    {
      id: 'cf-sw-1',
      title: '1. Day of the Week Converter',
      problemStatement: `Convert an integer from 1 to 7 into its corresponding weekday name (1 = Monday ... 7 = Sunday). Handle invalid numbers with a default case.

Input Format: \`int dayNumber\` (e.g. 3)
Output Format: Print "Day [dayNumber] is [Weekday]" or "Invalid day number".

Example 1: Input: 3 -> Output: Day 3 is Wednesday
Example 2: Input: 8 -> Output: Invalid day number (must be 1-7)`,
      hint: 'Use a switch (dayNumber) with cases 1 through 7 and a default case for errors.',
      solutionCode: `public class WeekdayFinder {
    public static void main(String[] args) {
        int dayNumber = 3;
        String dayName;

        switch (dayNumber) {
            case 1: dayName = "Monday"; break;
            case 2: dayName = "Tuesday"; break;
            case 3: dayName = "Wednesday"; break;
            case 4: dayName = "Thursday"; break;
            case 5: dayName = "Friday"; break;
            case 6: dayName = "Saturday"; break;
            case 7: dayName = "Sunday"; break;
            default: dayName = "Invalid day number (must be 1-7)"; break;
        }

        System.out.println("Day " + dayNumber + " is " + dayName);
    }
}`,
      output: 'Day 3 is Wednesday',
      explanation: 'The switch matches case 3, assigns "Wednesday", and hits the break statement to exit.'
    },
    {
      id: 'cf-sw-2',
      title: '2. Four-Function Math Calculator',
      problemStatement: `Build a console calculator that performs arithmetic on two double values based on a character operator ('+', '-', '*', '/', '%').
Handle division by zero safely.

Input Format: \`double num1, double num2, char op\`
Output Format: Print "[num1] [op] [num2] = [result]"

Example 1: Input: 12.0, 4.0, '/' -> Output: 12.0 / 4.0 = 3.0
Example 2: Input: 10.0, 0.0, '/' -> Output: Error: Division by zero!`,
      hint: 'Switch on the char operator: switch (op) { case \'+\': ... }',
      solutionCode: `public class Calculator {
    public static void main(String[] args) {
        double num1 = 12.0;
        double num2 = 4.0;
        char op = '/';

        switch (op) {
            case '+':
                System.out.println(num1 + " + " + num2 + " = " + (num1 + num2));
                break;
            case '-':
                System.out.println(num1 + " - " + num2 + " = " + (num1 - num2));
                break;
            case '*':
                System.out.println(num1 + " * " + num2 + " = " + (num1 * num2));
                break;
            case '/':
                if (num2 == 0) {
                    System.out.println("Error: Division by zero!");
                } else {
                    System.out.println(num1 + " / " + num2 + " = " + (num1 / num2));
                }
                break;
            case '%':
                System.out.println(num1 + " % " + num2 + " = " + (num1 % num2));
                break;
            default:
                System.out.println("Unsupported operator: " + op);
        }
    }
}`,
      output: '12.0 / 4.0 = 3.0',
      explanation: 'The operator "/" triggers case \'/\'. The denominator is non-zero, producing 3.0.'
    },
    {
      id: 'cf-sw-3',
      title: '3. Number of Days in a Month (Leveraging Fall-Through)',
      problemStatement: `Find the number of days in a month (1-12) by grouping cases with fall-through:
- 31 days: Months 1, 3, 5, 7, 8, 10, 12
- 30 days: Months 4, 6, 9, 11
- 28 or 29 days: Month 2 (check if leap year)

Input Format: \`int month, int year\` (e.g. month = 2, year = 2024)
Output Format: Print "[days] days in month [month]"`,
      hint: 'Stack case labels without break to group common months: case 1: case 3: case 5: days = 31; break;',
      solutionCode: `public class MonthDays {
    public static void main(String[] args) {
        int month = 2;
        int year = 2024;
        int days;

        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4: case 6: case 9: case 11:
                days = 30;
                break;
            case 2:
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
                break;
            default:
                days = -1;
        }

        System.out.println(days + " days in month " + month + " (" + year + ")");
    }
}`,
      output: '29 days in month 2 (2024)',
      explanation: 'February in leap year 2024 evaluates to 29 days.'
    },
    {
      id: 'cf-sw-4',
      title: '4. Traffic Light State Controller',
      problemStatement: `Simulate an automated intersection controller that outputs driver action based on traffic light color ("RED", "YELLOW", "GREEN").

Input Format: \`String lightColor\` (case-insensitive)
Output Format: Print "[lightColor]: [Action Description]"

Example 1: "RED" -> Stop immediately and wait behind the stop line.
Example 2: "YELLOW" -> Prepare to stop safely.
Example 3: "GREEN" -> Proceed through the intersection.`,
      hint: 'Java 7+ supports String in switch statements. Normalize input with lightColor.toUpperCase().',
      solutionCode: `public class TrafficLight {
    public static void main(String[] args) {
        String lightColor = "RED";

        switch (lightColor.toUpperCase()) {
            case "RED":
                System.out.println("RED: Stop immediately and wait behind the stop line.");
                break;
            case "YELLOW":
                System.out.println("YELLOW: Prepare to stop safely.");
                break;
            case "GREEN":
                System.out.println("GREEN: Proceed through the intersection.");
                break;
            default:
                System.out.println("MALFUNCTION: Flashing amber, proceed with caution.");
        }
    }
}`,
      output: 'RED: Stop immediately and wait behind the stop line.',
      explanation: 'String switch compares using equals(). "RED" matches case "RED" and prints the stop action.'
    },
    {
      id: 'cf-sw-5',
      title: '5. Academic Grade Remarks Generator',
      problemStatement: `Output teacher evaluation remarks based on a letter grade ('A', 'B', 'C', 'D', 'F').

Input Format: \`char grade\` (e.g. 'A')
Output Format:
- 'A': "Outstanding performance! Keep it up."
- 'B': "Good job, but room for improvement."
- 'C': "Satisfactory, needs more dedication."
- 'D': "Borderline pass, extra tutoring recommended."
- 'F': "Failed, must retake the examination."`,
      hint: 'Support both uppercase and lowercase by stacking labels: case \'A\': case \'a\': ...',
      solutionCode: `public class GradeRemarks {
    public static void main(String[] args) {
        char grade = 'A';

        switch (Character.toUpperCase(grade)) {
            case 'A':
                System.out.println("Grade A: Outstanding performance! Keep it up.");
                break;
            case 'B':
                System.out.println("Grade B: Good job, but room for improvement.");
                break;
            case 'C':
                System.out.println("Grade C: Satisfactory, needs more dedication.");
                break;
            case 'D':
                System.out.println("Grade D: Borderline pass, extra tutoring recommended.");
                break;
            case 'F':
                System.out.println("Grade F: Failed, must retake the examination.");
                break;
            default:
                System.out.println("Invalid Grade: " + grade);
        }
    }
}`,
      output: 'Grade A: Outstanding performance! Keep it up.',
      explanation: 'Character \'A\' triggers the top case and breaks immediately.'
    }
  ],

  // ── 4.3 Modern Switch Expressions (4 Exercises) ──
  'switch-expressions': [
    {
      id: 'cf-se-1',
      title: '1. Season Finder using Modern Arrow Syntax',
      problemStatement: `Implement a season resolver using Java 14+ switch expressions with arrow syntax (\`->\`). Return the season name directly from the expression without any break statements.

Input Format: \`int month\` (1 to 12)
Output Format: Print "Month [month] belongs to [Season]" (Winter, Spring, Summer, Autumn)

Example:
Input: month = 7
Output: Month 7 belongs to Summer`,
      hint: 'Comma-separated labels: case 12, 1, 2 -> "Winter";',
      solutionCode: `public class SeasonFinder {
    public static void main(String[] args) {
        int month = 7;

        String season = switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Spring";
            case 6, 7, 8 -> "Summer";
            case 9, 10, 11 -> "Autumn";
            default -> "Unknown Season";
        };

        System.out.println("Month " + month + " belongs to " + season);
    }
}`,
      output: 'Month 7 belongs to Summer',
      explanation: 'Modern arrow switch expressions evaluate right-hand side expressions directly into the return variable without fall-through.'
    },
    {
      id: 'cf-se-2',
      title: '2. HTTP Status Code Category Resolver with Yield',
      problemStatement: `Write a switch expression that resolves an HTTP status code into its category description. Use a multi-line block with the \`yield\` keyword for logging details.

Input Format: \`int statusCode\` (e.g. 404)
Output Format: Category description string.`,
      hint: 'When an arrow branch has multiple statements in curly braces {}, use \`yield value;\` to return the result.',
      solutionCode: `public class HttpStatusResolver {
    public static void main(String[] args) {
        int statusCode = 404;

        String category = switch (statusCode) {
            case 200, 201, 204 -> "Success (2xx)";
            case 301, 302 -> "Redirection (3xx)";
            case 400, 401, 403, 404 -> {
                System.out.println("[AUDIT LOG] Client request rejected with code: " + statusCode);
                yield "Client Error (4xx)";
            }
            case 500, 502, 503 -> "Server Error (5xx)";
            default -> "Unknown Status Code";
        };

        System.out.println("Status " + statusCode + " category: " + category);
    }
}`,
      output: `[AUDIT LOG] Client request rejected with code: 404
Status 404 category: Client Error (4xx)`,
      explanation: 'The block { ... yield "Client Error (4xx)"; } executes the audit print statement and yields the string value to category.'
    },
    {
      id: 'cf-se-3',
      title: '3. Role Permission Mapper',
      problemStatement: `Write an enterprise role mapper that assigns access clearance level (1 to 4) based on employee role ("ADMIN", "MANAGER", "DEVELOPER", "GUEST").

Input Format: \`String role\`
Output Format: Clearance level integer.`,
      hint: 'switch (role.toUpperCase()) { case "ADMIN" -> 4; ... }',
      solutionCode: `public class RolePermissions {
    public static void main(String[] args) {
        String role = "DEVELOPER";

        int clearance = switch (role.toUpperCase()) {
            case "ADMIN" -> 4;
            case "MANAGER" -> 3;
            case "DEVELOPER" -> 2;
            case "GUEST" -> 1;
            default -> 0;
        };

        System.out.println("Role: " + role + " -> Security Clearance Level: " + clearance);
    }
}`,
      output: 'Role: DEVELOPER -> Security Clearance Level: 2',
      explanation: 'Directly yields integer 2 without boilerplate break statements.'
    },
    {
      id: 'cf-se-4',
      title: '4. Days in Month using Switch Expression',
      problemStatement: `Refactor the Days in Month calculator to a clean, expression-based syntax returning the day count directly.

Input Format: \`int month = 4, int year = 2024\`
Output Format: Day count integer.`,
      hint: 'Combine comma-separated case labels with arrow syntax.',
      solutionCode: `public class SwitchExpressionDays {
    public static void main(String[] args) {
        int month = 4;
        int year = 2024;

        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) ? 29 : 28;
            default -> -1;
        };

        System.out.println("Month " + month + " has " + days + " days");
    }
}`,
      output: 'Month 4 has 30 days',
      explanation: 'Month 4 matches case 4, 6, 9, 11 and directly returns 30.'
    }
  ],

  // ── 4.4 The For Loop Deep Dive (9 Exercises) ──
  'for-loop-deep-dive': [
    {
      id: 'cf-for-1',
      title: '1. Print Numbers 1 to 10 on a Single Line',
      problemStatement: `Write a standard for loop to print numbers from 1 to 10 separated by spaces.

Input Format: None (fixed range 1 to 10).
Output Format: "1 2 3 4 5 6 7 8 9 10"`,
      hint: 'for (int i = 1; i <= 10; i++) System.out.print(i + " ");',
      solutionCode: `public class PrintOneToTen {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
      output: '1 2 3 4 5 6 7 8 9 10 ',
      explanation: 'Loop variable i starts at 1, increments by 1 each iteration, and terminates once i exceeds 10.'
    },
    {
      id: 'cf-for-2',
      title: '2. Factorial of a Number',
      problemStatement: `Calculate the factorial of a positive integer N (N! = 1 * 2 * ... * N).
For N = 0, factorial is 1.

Input Format: \`int n = 5\`
Output Format: "Factorial of 5 = 120"`,
      hint: 'Use a long variable initialized to 1: fact *= i inside a loop from 1 to n.',
      solutionCode: `public class FactorialCalculator {
    public static void main(String[] args) {
        int n = 5;
        long factorial = 1;

        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }

        System.out.println("Factorial of " + n + " = " + factorial);
    }
}`,
      output: 'Factorial of 5 = 120',
      explanation: '1 * 2 = 2 * 3 = 6 * 4 = 24 * 5 = 120.'
    },
    {
      id: 'cf-for-3',
      title: '3. Sum of First N Natural Numbers',
      problemStatement: `Compute the sum of the first N natural numbers using a for loop.

Input Format: \`int n = 100\`
Output Format: "Sum of first 100 natural numbers = 5050"`,
      hint: 'Accumulator variable sum initialized to 0. Add each i from 1 to n.',
      solutionCode: `public class SumOfNaturalNumbers {
    public static void main(String[] args) {
        int n = 100;
        int sum = 0;

        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        System.out.println("Sum of first " + n + " natural numbers = " + sum);
    }
}`,
      output: 'Sum of first 100 natural numbers = 5050',
      explanation: 'Accumulates 1 + 2 + ... + 100 = 5050.'
    },
    {
      id: 'cf-for-4',
      title: '4. Fibonacci Series (First N Numbers)',
      problemStatement: `Print the first N terms of the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13... where each term is the sum of the two preceding ones.

Input Format: \`int n = 8\`
Output Format: "Fibonacci (8 terms): 0 1 1 2 3 5 8 13"`,
      hint: 'Keep track of two variables a = 0 and b = 1. Next is a + b. Then update a = b and b = next.',
      solutionCode: `public class FibonacciSeries {
    public static void main(String[] args) {
        int n = 8;
        int a = 0, b = 1;

        System.out.print("Fibonacci (" + n + " terms): ");
        for (int i = 1; i <= n; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }
}`,
      output: 'Fibonacci (8 terms): 0 1 1 2 3 5 8 13 ',
      explanation: 'Each step prints the current term a and advances the two pointers.'
    },
    {
      id: 'cf-for-5',
      title: '5. Multiplication Table of a Number',
      problemStatement: `Generate the multiplication table of a given number from 1 to 10.

Input Format: \`int num = 7\`
Output Format:
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70`,
      hint: 'Run loop from i = 1 to 10, printing num + " x " + i + " = " + (num * i).',
      solutionCode: `public class MultiplicationTable {
    public static void main(String[] args) {
        int num = 7;
        for (int i = 1; i <= 10; i++) {
            System.out.println(num + " x " + i + " = " + (num * i));
        }
    }
}`,
      output: `7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70`,
      explanation: 'Iterates 10 times, printing the formatted product each round.'
    },
    {
      id: 'cf-for-6',
      title: '6. Reverse a Given Integer',
      problemStatement: `Reverse the digits of an integer using a for loop. For example, 12345 becomes 54321.

Input Format: \`int num = 12345\`
Output Format: "Original: 12345 -> Reversed: 54321"`,
      hint: 'In the loop: reversed = reversed * 10 + (temp % 10); temp /= 10; until temp == 0.',
      solutionCode: `public class ReverseNumber {
    public static void main(String[] args) {
        int num = 12345;
        int reversed = 0;

        for (int temp = num; temp != 0; temp /= 10) {
            int digit = temp % 10;
            reversed = reversed * 10 + digit;
        }

        System.out.println("Original: " + num + " -> Reversed: " + reversed);
    }
}`,
      output: 'Original: 12345 -> Reversed: 54321',
      explanation: 'Extracts the last digit using % 10 and appends it to the reversed number by multiplying previous reversed by 10.'
    },
    {
      id: 'cf-for-7',
      title: '7. Prime Number Checker',
      problemStatement: `Determine whether a given positive integer N is a prime number (has only two factors: 1 and itself).

Input Format: \`int num = 29\`
Output Format: "29 is a Prime Number" or "29 is NOT a Prime Number"`,
      hint: 'Numbers <= 1 are not prime. Check divisors from 2 up to Math.sqrt(num). If any divide evenly, it is not prime.',
      solutionCode: `public class PrimeCheck {
    public static void main(String[] args) {
        int num = 29;
        boolean isPrime = num > 1;

        for (int i = 2; i * i <= num; i++) {
            if (num % i == 0) {
                isPrime = false;
                break;
            }
        }

        System.out.println(num + (isPrime ? " is a Prime Number" : " is NOT a Prime Number"));
    }
}`,
      output: '29 is a Prime Number',
      explanation: 'Divisors checked up to sqrt(29) (~5.38). None of 2, 3, 4, 5 divide 29, confirming it is prime.'
    },
    {
      id: 'cf-for-8',
      title: '8. Palindrome Number Check',
      problemStatement: `A number is a palindrome if it reads the same backwards as forwards (e.g. 121, 1331). Write a program to verify if a number is a palindrome.

Input Format: \`int num = 1331\`
Output Format: "1331 is a Palindrome Number"`,
      hint: 'Reverse the number and compare reversed == original.',
      solutionCode: `public class PalindromeNumber {
    public static void main(String[] args) {
        int num = 1331;
        int reversed = 0;

        for (int temp = num; temp > 0; temp /= 10) {
            reversed = reversed * 10 + (temp % 10);
        }

        if (num == reversed) {
            System.out.println(num + " is a Palindrome Number");
        } else {
            System.out.println(num + " is NOT a Palindrome Number");
        }
    }
}`,
      output: '1331 is a Palindrome Number',
      explanation: 'Reversing 1331 produces 1331. Since original == reversed, it is a palindrome.'
    },
    {
      id: 'cf-for-9',
      title: '9. Armstrong Number Check (Narcissistic Number)',
      problemStatement: `An Armstrong number of 3 digits is an integer such that the sum of the cubes of its digits is equal to the number itself (e.g. 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153). Check if a number is an Armstrong number.

Input Format: \`int num = 153\`
Output Format: "153 is an Armstrong Number"`,
      hint: 'Extract each digit, cube it, and sum them up. Compare sum == num.',
      solutionCode: `public class ArmstrongCheck {
    public static void main(String[] args) {
        int num = 153;
        int sum = 0;

        for (int temp = num; temp != 0; temp /= 10) {
            int digit = temp % 10;
            sum += digit * digit * digit;
        }

        if (sum == num) {
            System.out.println(num + " is an Armstrong Number");
        } else {
            System.out.println(num + " is NOT an Armstrong Number");
        }
    }
}`,
      output: '153 is an Armstrong Number',
      explanation: '1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153. Matches the original value.'
    }
  ],

  // ── 4.5 The Enhanced For-Each Loop (4 Exercises) ──
  'enhanced-for-each': [
    {
      id: 'cf-fe-1',
      title: '1. Find Maximum and Minimum in an Array',
      problemStatement: `Find both the highest and lowest integer values in an array using an enhanced for-each loop without indexing.

Input Format: \`int[] nums = {45, 12, 89, 3, 67, 99, 23}\`
Output Format:
Min: 3
Max: 99`,
      hint: 'Initialize min = nums[0] and max = nums[0]. In the for-each: if (n < min) min = n; if (n > max) max = n;',
      solutionCode: `public class ArrayMinMax {
    public static void main(String[] args) {
        int[] nums = {45, 12, 89, 3, 67, 99, 23};
        int min = nums[0];
        int max = nums[0];

        for (int n : nums) {
            if (n < min) min = n;
            if (n > max) max = n;
        }

        System.out.println("Min: " + min);
        System.out.println("Max: " + max);
    }
}`,
      output: `Min: 3
Max: 99`,
      explanation: 'Iterates through each element, updating min and max bounds directly.'
    },
    {
      id: 'cf-fe-2',
      title: '2. Calculate Average of a Double Array',
      problemStatement: `Compute the arithmetic mean of an array of daily temperature recordings.

Input Format: \`double[] temps = {28.5, 31.0, 29.8, 32.4, 27.5}\`
Output Format: "Average Temperature: 29.84 C"`,
      hint: 'Sum all elements using for-each, then divide by temps.length.',
      solutionCode: `public class AverageCalculator {
    public static void main(String[] args) {
        double[] temps = {28.5, 31.0, 29.8, 32.4, 27.5};
        double sum = 0;

        for (double t : temps) {
            sum += t;
        }

        double avg = sum / temps.length;
        System.out.printf("Average Temperature: %.2f C\\n", avg);
    }
}`,
      output: 'Average Temperature: 29.84 C',
      explanation: 'Sums all 5 temperature readings (149.2) and divides by 5 = 29.84.'
    },
    {
      id: 'cf-fe-3',
      title: '3. Count Occurrences of a Target Value',
      problemStatement: `Count how many times a given target integer appears inside an array using for-each.

Input Format: \`int[] numbers = {4, 2, 7, 4, 9, 4, 1, 4}\`, \`int target = 4\`
Output Format: "Target 4 appears 4 times"`,
      hint: 'Counter variable initialized to 0. Increment whenever element == target.',
      solutionCode: `public class CountOccurrences {
    public static void main(String[] args) {
        int[] numbers = {4, 2, 7, 4, 9, 4, 1, 4};
        int target = 4;
        int count = 0;

        for (int num : numbers) {
            if (num == target) {
                count++;
            }
        }

        System.out.println("Target " + target + " appears " + count + " times");
    }
}`,
      output: 'Target 4 appears 4 times',
      explanation: 'The number 4 occurs at 4 different positions in the array.'
    },
    {
      id: 'cf-fe-4',
      title: '4. Case-Insensitive String Search in String Array',
      problemStatement: `Search whether a specific employee name exists in a roster array regardless of letter casing.

Input Format: \`String[] roster = {"Alice", "Bob", "Charlie", "David"}\`, \`String search = "charlie"\`
Output Format: "Found Charlie in roster: true"`,
      hint: 'Use name.equalsIgnoreCase(search) inside the for-each loop.',
      solutionCode: `public class NameSearch {
    public static void main(String[] args) {
        String[] roster = {"Alice", "Bob", "Charlie", "David"};
        String search = "charlie";
        boolean found = false;

        for (String name : roster) {
            if (name.equalsIgnoreCase(search)) {
                found = true;
                break;
            }
        }

        System.out.println("Found " + search + " in roster: " + found);
    }
}`,
      output: 'Found charlie in roster: true',
      explanation: 'equalsIgnoreCase matches "Charlie" with "charlie", sets found to true and breaks early.'
    }
  ],

  // ── 4.6 The While Loop (11 Exercises) ──
  'while-loop': [
    {
      id: 'cf-wh-1',
      title: '1. Sum of Digits of a Number',
      problemStatement: `Write a while loop to compute the sum of all individual digits of a positive number.
For example, for 1234, the sum is 1 + 2 + 3 + 4 = 10.

Input Format: \`int num = 1234\`
Output Format: "Sum of digits of 1234 = 10"`,
      hint: 'while (num > 0): add (num % 10) to sum, and do num = num / 10.',
      solutionCode: `public class SumOfDigits {
    public static void main(String[] args) {
        int original = 1234;
        int num = original;
        int sum = 0;

        while (num > 0) {
            sum += num % 10;
            num /= 10;
        }

        System.out.println("Sum of digits of " + original + " = " + sum);
    }
}`,
      output: 'Sum of digits of 1234 = 10',
      explanation: '4 + 3 + 2 + 1 = 10.'
    },
    {
      id: 'cf-wh-2',
      title: '2. Perfect Number Verification',
      problemStatement: `A Perfect Number is a positive integer that is equal to the sum of its proper positive divisors (excluding the number itself).
Examples:
- 6: 1 + 2 + 3 = 6 (Perfect!)
- 28: 1 + 2 + 4 + 7 + 14 = 28 (Perfect!)
Verify if a number is a Perfect Number using a while loop.

Input Format: \`int num = 28\`
Output Format: "28 is a Perfect Number"`,
      hint: 'Run a while loop divisor = 1 up to num / 2. If num % divisor == 0, add to sum.',
      solutionCode: `public class PerfectNumberCheck {
    public static void main(String[] args) {
        int num = 28;
        int sum = 0;
        int divisor = 1;

        while (divisor <= num / 2) {
            if (num % divisor == 0) {
                sum += divisor;
            }
            divisor++;
        }

        if (sum == num && num > 0) {
            System.out.println(num + " is a Perfect Number");
        } else {
            System.out.println(num + " is NOT a Perfect Number");
        }
    }
}`,
      output: '28 is a Perfect Number',
      explanation: 'Divisors of 28 are 1, 2, 4, 7, 14. Sum = 1 + 2 + 4 + 7 + 14 = 28.'
    },
    {
      id: 'cf-wh-3',
      title: '3. Print Even Numbers in Given Range',
      problemStatement: `Print all even numbers in a given range [start, end] inclusive using a while loop.

Input Format: \`int start = 10, int end = 24\`
Output Format: "10 12 14 16 18 20 22 24"`,
      hint: 'If start is odd, increment by 1. Then step by 2 in the while loop: start += 2.',
      solutionCode: `public class EvenNumbersRange {
    public static void main(String[] args) {
        int start = 10;
        int end = 24;

        int current = (start % 2 != 0) ? start + 1 : start;
        while (current <= end) {
            System.out.print(current + " ");
            current += 2;
        }
        System.out.println();
    }
}`,
      output: '10 12 14 16 18 20 22 24 ',
      explanation: 'Starts at 10 and steps by +2 until 24 is printed.'
    },
    {
      id: 'cf-wh-4',
      title: '4. Greatest Common Divisor (GCD / HCF) via Euclidean Algorithm',
      problemStatement: `Find the Greatest Common Divisor (GCD) of two integers using Euclid's subtraction/remainder algorithm with a while loop.

Input Format: \`int a = 48, int b = 18\`
Output Format: "GCD of 48 and 18 is: 6"`,
      hint: 'while (b != 0) { int temp = b; b = a % b; a = temp; } return a;',
      solutionCode: `public class GcdEuclidean {
    public static void main(String[] args) {
        int a = 48;
        int b = 18;
        int originalA = a, originalB = b;

        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }

        System.out.println("GCD of " + originalA + " and " + originalB + " is: " + a);
    }
}`,
      output: 'GCD of 48 and 18 is: 6',
      explanation: '48 % 18 = 12 -> 18 % 12 = 6 -> 12 % 6 = 0. Remainder is 0, so GCD is 6.'
    },
    {
      id: 'cf-wh-5',
      title: '5. Generate First N Prime Numbers',
      problemStatement: `Print the first N prime numbers starting from 2 using a while loop.

Input Format: \`int count = 5\`
Output Format: "First 5 primes: 2 3 5 7 11"`,
      hint: 'Maintain primesFound = 0 and candidate = 2. Inside while (primesFound < count): check if candidate is prime, if so print and primesFound++, then candidate++.',
      solutionCode: `public class GenerateFirstNPrimes {
    public static void main(String[] args) {
        int count = 5;
        int primesFound = 0;
        int candidate = 2;

        System.out.print("First " + count + " primes: ");
        while (primesFound < count) {
            boolean isPrime = true;
            for (int i = 2; i * i <= candidate; i++) {
                if (candidate % i == 0) {
                    isPrime = false;
                    break;
                }
            }

            if (isPrime) {
                System.out.print(candidate + " ");
                primesFound++;
            }
            candidate++;
        }
        System.out.println();
    }
}`,
      output: 'First 5 primes: 2 3 5 7 11 ',
      explanation: 'Iteratively checks candidates starting at 2 until exactly 5 prime numbers are emitted.'
    },
    {
      id: 'cf-wh-6',
      title: '6. Leap Year Verification Loop across Multiple Years',
      problemStatement: `Find and print the next 5 leap years following a given starting year using a while loop.

Input Format: \`int startYear = 2024, int count = 5\`
Output Format: "Next 5 leap years: 2024 2028 2032 2036 2040"`,
      hint: 'while (found < count): check leap year rule, increment year by 1 each time.',
      solutionCode: `public class NextLeapYears {
    public static void main(String[] args) {
        int year = 2024;
        int needed = 5;
        int found = 0;

        System.out.print("Next " + needed + " leap years: ");
        while (found < needed) {
            if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                System.out.print(year + " ");
                found++;
            }
            year++;
        }
        System.out.println();
    }
}`,
      output: 'Next 5 leap years: 2024 2028 2032 2036 2040 ',
      explanation: 'Generates the sequence of the first 5 leap years starting from 2024.'
    },
    {
      id: 'cf-wh-7',
      title: '7. Pascal\'s Triangle Row Generator using While Loop',
      problemStatement: `Generate row N of Pascal\'s Triangle using a while loop (Row 0 is 1, Row 1 is 1 1, Row 2 is 1 2 1, Row 3 is 1 3 3 1, Row 4 is 1 4 6 4 1).

Input Format: \`int row = 4\`
Output Format: "Pascal Row 4: 1 4 6 4 1"`,
      hint: 'Each element can be computed from the previous element: val = val * (row - col) / col.',
      solutionCode: `public class PascalRow {
    public static void main(String[] args) {
        int n = 4;
        int col = 0;
        long val = 1;

        System.out.print("Pascal Row " + n + ": ");
        while (col <= n) {
            System.out.print(val + " ");
            val = val * (n - col) / (col + 1);
            col++;
        }
        System.out.println();
    }
}`,
      output: 'Pascal Row 4: 1 4 6 4 1 ',
      explanation: 'Calculates binomial coefficients C(4, 0)=1, C(4, 1)=4, C(4, 2)=6, C(4, 3)=4, C(4, 4)=1.'
    },
    {
      id: 'cf-wh-8',
      title: '8. Power Calculator Without Math.pow',
      problemStatement: `Calculate base^exp (e.g. 2^10 = 1024) using a while loop without using Java's built-in Math.pow() method.

Input Format: \`int base = 2, int exp = 10\`
Output Format: "2^10 = 1024"`,
      hint: 'long result = 1; while (exp > 0) { result *= base; exp--; }',
      solutionCode: `public class PowerCalculator {
    public static void main(String[] args) {
        int base = 2;
        int exp = 10;
        long result = 1;
        int count = exp;

        while (count > 0) {
            result *= base;
            count--;
        }

        System.out.println(base + "^" + exp + " = " + result);
    }
}`,
      output: '2^10 = 1024',
      explanation: 'Multiplies 2 by itself 10 times = 1024.'
    },
    {
      id: 'cf-wh-9',
      title: '9. Character Counter (Vowels, Consonants, Digits, Spaces)',
      problemStatement: `Traverse a String using a while loop with an index pointer and count total vowels, consonants, digits, and whitespace characters.

Input Format: \`String text = "Java 21 is Awesome!"\`
Output Format:
Vowels: 7
Consonants: 6
Digits: 2
Spaces: 3`,
      hint: 'while (i < text.length()) { char c = text.charAt(i); ... i++; }',
      solutionCode: `public class CharacterCounter {
    public static void main(String[] args) {
        String text = "Java 21 is Awesome!";
        int vowels = 0, consonants = 0, digits = 0, spaces = 0;
        int i = 0;

        while (i < text.length()) {
            char ch = Character.toLowerCase(text.charAt(i));
            if (ch >= 'a' && ch <= 'z') {
                if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                    vowels++;
                } else {
                    consonants++;
                }
            } else if (ch >= '0' && ch <= '9') {
                digits++;
            } else if (Character.isWhitespace(ch)) {
                spaces++;
            }
            i++;
        }

        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        System.out.println("Digits: " + digits);
        System.out.println("Spaces: " + spaces);
    }
}`,
      output: `Vowels: 7
Consonants: 6
Digits: 2
Spaces: 3`,
      explanation: 'Analyzes character by character across the entire string length.'
    },
    {
      id: 'cf-wh-10',
      title: '10. Binary Search Implementation using While Loop',
      problemStatement: `Implement the classic Binary Search algorithm on a sorted array using a while loop. Return the 0-based index of the target element, or -1 if not found.

Input Format: \`int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91}\`, \`int target = 23\`
Output Format: "Target 23 found at index: 5"`,
      hint: 'int low = 0, high = arr.length - 1; while (low <= high) { int mid = low + (high - low)/2; ... }',
      solutionCode: `public class BinarySearchWhile {
    public static void main(String[] args) {
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int target = 23;
        int low = 0, high = sorted.length - 1;
        int index = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sorted[mid] == target) {
                index = mid;
                break;
            } else if (sorted[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        System.out.println("Target " + target + " found at index: " + index);
    }
}`,
      output: 'Target 23 found at index: 5',
      explanation: 'Binary search splits the range in half each step in O(log N) time, locating 23 at index 5.'
    },
    {
      id: 'cf-wh-11',
      title: '11. Collatz Conjecture (3N + 1 Sequence)',
      problemStatement: `The Collatz sequence starts with any positive integer N:
- If N is even, next is N / 2.
- If N is odd, next is 3 * N + 1.
The sequence always terminates at 1. Print all terms of the sequence until 1 is reached.

Input Format: \`int n = 6\`
Output Format: "Collatz sequence: 6 3 10 5 16 8 4 2 1 (Total steps: 8)"`,
      hint: 'while (n != 1) { if (n % 2 == 0) n /= 2; else n = 3 * n + 1; }',
      solutionCode: `public class CollatzConjecture {
    public static void main(String[] args) {
        long n = 6;
        int steps = 0;

        System.out.print("Collatz sequence: " + n + " ");
        while (n != 1) {
            if (n % 2 == 0) {
                n = n / 2;
            } else {
                n = 3 * n + 1;
            }
            System.out.print(n + " ");
            steps++;
        }
        System.out.println("(Total steps: " + steps + ")");
    }
}`,
      output: 'Collatz sequence: 6 3 10 5 16 8 4 2 1 (Total steps: 8)',
      explanation: '6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1, taking 8 transformation steps.'
    }
  ],

  // ── 4.7 The do-while Loop (4 Exercises) ──
  'do-while-loop': [
    {
      id: 'cf-dw-1',
      title: '1. Menu-Driven Application Loop',
      problemStatement: `Simulate a console banking menu that repeatedly displays options to the user until they choose option 0 to exit. The menu must be shown at least once regardless of initial state.

Input Format: Simulated choice sequence [1, 2, 0]
Output Format: Display choices and exit notice.`,
      hint: 'do { ... } while (choice != 0); guarantees menu renders at least once.',
      solutionCode: `public class ConsoleMenu {
    public static void main(String[] args) {
        int[] choices = {1, 2, 0};
        int index = 0;
        int choice;

        do {
            choice = choices[index++];
            System.out.println("--- Banking Menu ---");
            System.out.println("1. Check Balance | 2. Deposit | 0. Exit");
            System.out.println("Selected Choice: " + choice);
        } while (choice != 0);

        System.out.println("Exited successfully.");
    }
}`,
      output: `--- Banking Menu ---
1. Check Balance | 2. Deposit | 0. Exit
Selected Choice: 1
--- Banking Menu ---
1. Check Balance | 2. Deposit | 0. Exit
Selected Choice: 2
--- Banking Menu ---
1. Check Balance | 2. Deposit | 0. Exit
Selected Choice: 0
Exited successfully.`,
      explanation: 'The loop executes the body first, processes choices 1 and 2, and terminates when choice equals 0.'
    },
    {
      id: 'cf-dw-2',
      title: '2. Positive Number Input Validation',
      problemStatement: `Simulate reading user input where the program keeps asking for input until a strictly positive number (> 0) is supplied.

Input Format: Simulated input stream [-5, 0, -2, 15]
Output Format: Log rejected inputs and accept 15.`,
      hint: 'do { read number; } while (number <= 0);',
      solutionCode: `public class InputValidator {
    public static void main(String[] args) {
        int[] inputs = {-5, 0, -2, 15};
        int idx = 0;
        int value;

        do {
            value = inputs[idx++];
            if (value <= 0) {
                System.out.println("Rejected invalid input: " + value);
            }
        } while (value <= 0);

        System.out.println("Accepted valid positive number: " + value);
    }
}`,
      output: `Rejected invalid input: -5
Rejected invalid input: 0
Rejected invalid input: -2
Accepted valid positive number: 15`,
      explanation: 'Rejects all non-positive inputs and terminates the do-while loop upon reading 15.'
    },
    {
      id: 'cf-dw-3',
      title: '3. ATM PIN Verification with Max 3 Attempts',
      problemStatement: `Simulate an ATM security check where the user has up to 3 attempts to enter the correct PIN (1234). If correct, grant access; if 3 attempts fail, lock the account.

Input Format: Attempts stream [9999, 5555, 1234]
Output Format: Access status.`,
      hint: 'do { attempts++; } while (pin != correctPin && attempts < 3);',
      solutionCode: `public class AtmPinCheck {
    public static void main(String[] args) {
        int correctPin = 1234;
        int[] enteredPins = {9999, 5555, 1234};
        int attempts = 0;
        boolean authenticated = false;

        do {
            int entered = enteredPins[attempts];
            attempts++;
            if (entered == correctPin) {
                authenticated = true;
                break;
            } else {
                System.out.println("Incorrect PIN attempt " + attempts + "/3");
            }
        } while (attempts < 3);

        if (authenticated) {
            System.out.println("PIN accepted. Access granted on attempt " + attempts + ".");
        } else {
            System.out.println("Account locked. 3 failed attempts.");
        }
    }
}`,
      output: `Incorrect PIN attempt 1/3
Incorrect PIN attempt 2/3
PIN accepted. Access granted on attempt 3.`,
      explanation: 'Attempts 1 and 2 fail, attempt 3 matches 1234 and grants access.'
    },
    {
      id: 'cf-dw-4',
      title: '4. Print Number Digits Even for Zero',
      problemStatement: `Demonstrate why do-while is superior for digit extraction when the input number is 0. A while (num > 0) loop prints nothing for num = 0, whereas do-while guarantees at least 1 iteration.

Input Format: \`int num = 0\`
Output Format: "Digits extracted: 0"`,
      hint: 'do { digit = num % 10; ... } while (num > 0);',
      solutionCode: `public class DigitExtractorDoWhile {
    public static void main(String[] args) {
        int num = 0;
        int temp = num;

        System.out.print("Digits extracted: ");
        do {
            int digit = temp % 10;
            System.out.print(digit + " ");
            temp /= 10;
        } while (temp > 0);
        System.out.println();
    }
}`,
      output: 'Digits extracted: 0 ',
      explanation: 'Even when temp is 0, the body executes once, correctly outputting the digit 0.'
    }
  ],

  // ── 4.8 Break, Continue & Labeled Statements (4 Exercises) ──
  'break-continue-labeled': [
    {
      id: 'cf-bc-1',
      title: '1. Linear Search with Early Break Optimization',
      problemStatement: `Search for a target value in an unsorted array. Stop the loop immediately once found to prevent wasted iterations.

Input Format: \`int[] arr = {14, 52, 98, 33, 71, 85}\`, \`int target = 33\`
Output Format: "Found 33 at index: 3 after 4 comparisons"`,
      hint: 'Inside loop: comparisons++; if (arr[i] == target) { foundIndex = i; break; }',
      solutionCode: `public class EarlyBreakSearch {
    public static void main(String[] args) {
        int[] arr = {14, 52, 98, 33, 71, 85};
        int target = 33;
        int foundIndex = -1;
        int comparisons = 0;

        for (int i = 0; i < arr.length; i++) {
            comparisons++;
            if (arr[i] == target) {
                foundIndex = i;
                break; // Stop immediately!
            }
        }

        System.out.println("Found " + target + " at index: " + foundIndex + " after " + comparisons + " comparisons");
    }
}`,
      output: 'Found 33 at index: 3 after 4 comparisons',
      explanation: 'The break statement terminates the loop at index 3, skipping the remaining elements 71 and 85.'
    },
    {
      id: 'cf-bc-2',
      title: '2. Skip Even Numbers using Continue',
      problemStatement: `Print all odd numbers between 1 and 20 by using a \`continue\` statement to skip any even numbers.

Input Format: Range 1 to 20
Output Format: "1 3 5 7 9 11 13 15 17 19"`,
      hint: 'if (i % 2 == 0) continue;',
      solutionCode: `public class SkipEvens {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0) {
                continue; // Skip the rest of loop body for evens
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
      output: '1 3 5 7 9 11 13 15 17 19 ',
      explanation: 'When i is even, continue jumps directly to the increment i++ without executing the print statement.'
    },
    {
      id: 'cf-bc-3',
      title: '3. Search 2D Matrix with Labeled Break',
      problemStatement: `Find a target number in a 2D matrix. Use a labeled break (\`searchLoop: break searchLoop;\`) to escape both inner and outer loops simultaneously the instant the target is found.

Input Format:
int[][] matrix = {
    {10, 20, 30},
    {40, 50, 60},
    {70, 80, 90}
};
target = 50
Output Format: "Found 50 at row 1, col 1"`,
      hint: 'searchLoop: for (...) { for (...) { if (matrix[r][c] == target) break searchLoop; } }',
      solutionCode: `public class LabeledBreakMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };
        int target = 50;
        int foundRow = -1, foundCol = -1;

        searchLoop:
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    foundRow = r;
                    foundCol = c;
                    break searchLoop; // Escapes BOTH loops!
                }
            }
        }

        System.out.println("Found " + target + " at row " + foundRow + ", col " + foundCol);
    }
}`,
      output: 'Found 50 at row 1, col 1',
      explanation: 'A regular break would only exit the inner c loop. The labeled break exits outer r loop as well.'
    },
    {
      id: 'cf-bc-4',
      title: '4. Skip Multiples of 5 in Sum Accumulation',
      problemStatement: `Calculate the sum of numbers from 1 to 50, but skip any numbers that are multiples of 5 using \`continue\`.

Input Format: Range 1 to 50
Output Format: Sum value.`,
      hint: 'if (i % 5 == 0) continue; sum += i;',
      solutionCode: `public class SkipMultiplesOfFive {
    public static void main(String[] args) {
        int sum = 0;
        int skippedCount = 0;

        for (int i = 1; i <= 50; i++) {
            if (i % 5 == 0) {
                skippedCount++;
                continue;
            }
            sum += i;
        }

        System.out.println("Skipped " + skippedCount + " numbers. Final Sum = " + sum);
    }
}`,
      output: 'Skipped 10 numbers. Final Sum = 1000',
      explanation: 'Total sum of 1-50 is 1275. Multiples of 5 (5, 10, ... 50) sum to 275. 1275 - 275 = 1000.'
    }
  ],

  // ── 4.9 Nested Loops & Loop Tracing (4 Exercises) ──
  'nested-loops-and-tracing': [
    {
      id: 'cf-nl-1',
      title: '1. Right-Angled Number Triangle Pattern',
      problemStatement: `Print a right-angled triangle pattern of height N (e.g. N = 5):
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5

Input Format: \`int rows = 5\`
Output Format: Formatted pattern.`,
      hint: 'Outer loop i from 1 to rows. Inner loop j from 1 to i.',
      solutionCode: `public class NumberTriangle {
    public static void main(String[] args) {
        int rows = 5;

        for (int i = 1; i <= rows; i++) {
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
1 2 3 4 
1 2 3 4 5 `,
      explanation: 'Outer loop controls line count (1 to 5). Inner loop prints 1 through current line number.'
    },
    {
      id: 'cf-nl-2',
      title: '2. Inverted Star Pyramid Pattern',
      problemStatement: `Print an inverted star pyramid of N rows:
* * * * *
* * * *
* * *
* *
*

Input Format: \`int n = 5\`
Output Format: Formatted star triangle.`,
      hint: 'for (int i = n; i >= 1; i--) { for (int j = 1; j <= i; j++) { System.out.print("* "); } }',
      solutionCode: `public class InvertedPyramid {
    public static void main(String[] args) {
        int n = 5;

        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      output: `* * * * * 
* * * * 
* * * 
* * 
* `,
      explanation: 'Outer loop decrements from 5 down to 1 stars per row.'
    },
    {
      id: 'cf-nl-3',
      title: '3. Floyd\'s Triangle Pattern',
      problemStatement: `Print Floyd\'s Triangle of N rows, where consecutive integers are placed sequentially:
1
2 3
4 5 6
7 8 9 10

Input Format: \`int rows = 4\`
Output Format: Formatted Floyd triangle.`,
      hint: 'Maintain counter = 1 outside loops. Print counter++ in the inner loop.',
      solutionCode: `public class FloydsTriangle {
    public static void main(String[] args) {
        int rows = 4;
        int counter = 1;

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(counter + " ");
                counter++;
            }
            System.out.println();
        }
    }
}`,
      output: `1 
2 3 
4 5 6 
7 8 9 10 `,
      explanation: 'Counter increases monotonically from 1 to 10 across the rows.'
    },
    {
      id: 'cf-nl-4',
      title: '4. Matrix Multiplication of Two 2D Arrays',
      problemStatement: `Perform matrix multiplication of two 2x2 matrices using triple nested loops.
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]

Input Format: Two 2D integer arrays of dimension 2x2.
Output Format: Result matrix [[19, 22], [43, 50]]`,
      hint: 'C[i][j] += A[i][k] * B[k][j] in a 3-level loop over i, j, k.',
      solutionCode: `public class MatrixMultiplication {
    public static void main(String[] args) {
        int[][] A = {{1, 2}, {3, 4}};
        int[][] B = {{5, 6}, {7, 8}};
        int[][] C = new int[2][2];

        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }

        System.out.println("Result Matrix C:");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print(C[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      output: `Result Matrix C:
19 22 
43 50 `,
      explanation: 'Row 0: 1*5 + 2*7 = 19; 1*6 + 2*8 = 22. Row 1: 3*5 + 4*7 = 43; 3*6 + 4*8 = 50.'
    }
  ]
};
