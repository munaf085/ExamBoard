import { ProgrammingExercise } from '../../detailedLessons';

export const cf41_43_exercises: Record<string, ProgrammingExercise[]> = {
  // =========================================================================
  // LESSON 4.1: If-Else Ladders & Decision Making (10 Exercises)
  // =========================================================================
  'if-else-ladder': [
    {
      id: 'cf-41-ex01',
      title: 'Parity and Sign Verifier',
      problemStatement: 'Given an integer variable `number = -14`, write an if-else ladder to determine whether the number is "Positive Even", "Positive Odd", "Negative Even", "Negative Odd", or "Zero". Store the result in a String variable `classification` and print it.',
      hint: 'First check if the number is zero. If not, use (number > 0) to check sign and (number % 2 == 0) to check parity. Remember that in Java, negative numbers with % 2 yield 0 or -1 (or use number % 2 != 0).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int number = -14;
        String classification;

        if (number == 0) {
            classification = "Zero";
        } else if (number > 0 && number % 2 == 0) {
            classification = "Positive Even";
        } else if (number > 0 && number % 2 != 0) {
            classification = "Positive Odd";
        } else if (number < 0 && number % 2 == 0) {
            classification = "Negative Even";
        } else {
            classification = "Negative Odd";
        }

        System.out.println("Number " + number + " is " + classification);
    }
}`,
      output: 'Number -14 is Negative Even',
      explanation: 'The code checks number == 0 first. Since -14 is less than 0 and -14 % 2 is 0, it satisfies the "number < 0 && number % 2 == 0" branch, setting classification to "Negative Even".'
    },
    {
      id: 'cf-41-ex02',
      title: 'Student Grade Classifier',
      problemStatement: 'Given a student exam score `score = 88`, determine the letter grade using a standard if-else ladder: 90 and above is "A", 80 to 89 is "B", 70 to 79 is "C", 60 to 69 is "D", and anything below 60 is "F". Print the score and letter grade.',
      hint: 'Order conditions from highest to lowest (score >= 90, score >= 80, etc.). Because ladders stop on the first true match, checking score >= 80 already guarantees score < 90.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int score = 88;
        char grade;

        if (score >= 90) {
            grade = 'A';
        } else if (score >= 80) {
            grade = 'B';
        } else if (score >= 70) {
            grade = 'C';
        } else if (score >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        System.out.println("Score: " + score + ", Grade: " + grade);
    }
}`,
      output: 'Score: 88, Grade: B',
      explanation: 'Evaluation begins at score >= 90 (false for 88), then reaches score >= 80 (true). The grade is set to \'B\' and all subsequent branches are skipped.'
    },
    {
      id: 'cf-41-ex03',
      title: 'Leap Year Evaluator',
      problemStatement: 'Given a calendar year `year = 2000`, test whether it is a leap year using boolean logic in an if-else statement. A year is a leap year if it is divisible by 4 and not divisible by 100, unless it is also divisible by 400. Print whether the year is a leap year.',
      hint: 'Combine conditions using logical operators: ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int year = 2000;
        boolean isLeap;

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            isLeap = true;
        } else {
            isLeap = false;
        }

        System.out.println(year + " is a leap year: " + isLeap);
    }
}`,
      output: '2000 is a leap year: true',
      explanation: 'Although 2000 is divisible by 100, it is also divisible by 400 (2000 % 400 == 0 is true). By the OR (||) rule, isLeap becomes true.'
    },
    {
      id: 'cf-41-ex04',
      title: 'Cinema Ticket Pricing with Loyalty Discount',
      problemStatement: 'Calculate a movie ticket price based on age `age = 16` and membership status `isMember = true`. Children under 12 pay $8, seniors 65 and older pay $10, and standard adults (12-64) pay $15. If the patron is a loyalty member (`isMember == true`), apply a $2 discount to their base ticket price. Print the final ticket price.',
      hint: 'First determine the base price with an if-else ladder on age. Then use a separate if statement to subtract $2 if isMember is true.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int age = 16;
        boolean isMember = true;
        int ticketPrice;

        if (age < 12) {
            ticketPrice = 8;
        } else if (age >= 65) {
            ticketPrice = 10;
        } else {
            ticketPrice = 15;
        }

        if (isMember) {
            ticketPrice -= 2;
        }

        System.out.println("Final Ticket Price: $" + ticketPrice);
    }
}`,
      output: 'Final Ticket Price: $13',
      explanation: 'Age 16 falls into the standard adult else branch ($15). Since isMember is true, the subsequent if statement deducts $2, giving $13.'
    },
    {
      id: 'cf-41-ex05',
      title: 'Triangle Inequality and Type Classifier',
      problemStatement: 'Given three side lengths `a = 5`, `b = 5`, and `c = 8`, verify if they can form a valid triangle using the Triangle Inequality Theorem (the sum of any two sides must be strictly greater than the third side: a + b > c && a + c > b && b + c > a). If valid, classify the triangle as "Equilateral" (all 3 sides equal), "Isosceles" (exactly 2 sides equal), or "Scalene" (all sides distinct). If invalid, print "Invalid Triangle".',
      hint: 'Use a nested if structure: outer if validates the inequality theorem; inner ladder checks equality of sides.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int a = 5;
        int b = 5;
        int c = 8;
        String type;

        if (a + b > c && a + c > b && b + c > a) {
            if (a == b && b == c) {
                type = "Equilateral";
            } else if (a == b || b == c || a == c) {
                type = "Isosceles";
            } else {
                type = "Scalene";
            }
        } else {
            type = "Invalid Triangle";
        }

        System.out.println("Triangle Type: " + type);
    }
}`,
      output: 'Triangle Type: Isosceles',
      explanation: '5 + 5 > 8 is true, so the triangle is valid. Inside, a == b is true (5 == 5) while b != c, which matches the Isosceles condition.'
    },
    {
      id: 'cf-41-ex06',
      title: 'Progressive Income Tax Calculator',
      problemStatement: 'Compute total income tax for taxable income `income = 65000.0` using progressive tax brackets: first $10,000 is taxed at 0%; income between $10,001 and $40,000 is taxed at 10%; income between $40,001 and $80,000 is taxed at 20%; income above $80,000 is taxed at 30%. Print the total calculated tax.',
      hint: 'Progressive tax means each portion is taxed at its respective bracket rate: for 65000, tax = 0 + (30000 * 0.10) + ((65000 - 40000) * 0.20). Use if-else branches based on which tier the top dollar lands in.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        double income = 65000.0;
        double totalTax;

        if (income > 80000.0) {
            totalTax = (30000.0 * 0.10) + (40000.0 * 0.20) + ((income - 80000.0) * 0.30);
        } else if (income > 40000.0) {
            totalTax = (30000.0 * 0.10) + ((income - 40000.0) * 0.20);
        } else if (income > 10000.0) {
            totalTax = (income - 10000.0) * 0.10;
        } else {
            totalTax = 0.0;
        }

        System.out.println("Total Tax: $" + totalTax);
    }
}`,
      output: 'Total Tax: $8000.0',
      explanation: '65000 exceeds 40000 but is <= 80000. The bracket evaluates (30000 * 0.10) + (25000 * 0.20) = 3000.0 + 5000.0 = 8000.0.'
    },
    {
      id: 'cf-41-ex07',
      title: 'Cartesian Quadrant Identifier',
      problemStatement: 'Given Cartesian point coordinates `x = -4` and `y = 7`, determine whether the point lies at the "Origin", on the "X-axis", on the "Y-axis", or in "Quadrant I", "Quadrant II", "Quadrant III", or "Quadrant IV". Print the classification.',
      hint: 'Check for origin (x == 0 && y == 0) and axis intercepts first, then test signs: Q1 (x > 0, y > 0), Q2 (x < 0, y > 0), Q3 (x < 0, y < 0), Q4 (x > 0, y < 0).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int x = -4;
        int y = 7;
        String location;

        if (x == 0 && y == 0) {
            location = "Origin";
        } else if (x == 0) {
            location = "Y-axis";
        } else if (y == 0) {
            location = "X-axis";
        } else if (x > 0 && y > 0) {
            location = "Quadrant I";
        } else if (x < 0 && y > 0) {
            location = "Quadrant II";
        } else if (x < 0 && y < 0) {
            location = "Quadrant III";
        } else {
            location = "Quadrant IV";
        }

        System.out.println("Point (" + x + ", " + y + ") is in " + location);
    }
}`,
      output: 'Point (-4, 7) is in Quadrant II',
      explanation: 'Since x is -4 (< 0) and y is 7 (> 0), the condition "x < 0 && y > 0" matches Quadrant II.'
    },
    {
      id: 'cf-41-ex08',
      title: 'Guarded Arithmetic Operator Dispatcher',
      problemStatement: 'Given two operands `num1 = 40`, `num2 = 0` and an operator character `op = \'/\'`. Use an if-else ladder to perform addition (\'+\'), subtraction (\'-\'), multiplication (\'*\'), or division (\'/\'). When dividing, you must guard against division by zero: if `num2 == 0`, print "Error: Division by zero" instead of performing the division.',
      hint: 'Inside the branch for op == \'/\', use a nested if-else to verify num2 != 0 before performing num1 / num2.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int num1 = 40;
        int num2 = 0;
        char op = '/';

        if (op == '+') {
            System.out.println("Result: " + (num1 + num2));
        } else if (op == '-') {
            System.out.println("Result: " + (num1 - num2));
        } else if (op == '*') {
            System.out.println("Result: " + (num1 * num2));
        } else if (op == '/') {
            if (num2 == 0) {
                System.out.println("Error: Division by zero");
            } else {
                System.out.println("Result: " + (num1 / num2));
            }
        } else {
            System.out.println("Error: Invalid operator");
        }
    }
}`,
      output: 'Error: Division by zero',
      explanation: 'The operator is \'/\'. The nested if detects num2 == 0 and prints the safety error message, preventing an ArithmeticException.'
    },
    {
      id: 'cf-41-ex09',
      title: 'Credit Card Eligibility Screener',
      problemStatement: 'Screen credit card applicants based on `creditScore = 720`, `annualSalary = 48000`, and `hasBankruptcy = false`. Rules:\n- If `hasBankruptcy` is true, immediately assign "Rejected: Prior bankruptcy on file".\n- Else if `creditScore >= 750` AND `annualSalary >= 50000`, assign "Approved: Platinum Tier".\n- Else if `creditScore >= 700` AND `annualSalary >= 40000`, assign "Approved: Gold Tier".\n- Else if `creditScore >= 650` AND `annualSalary >= 30000`, assign "Approved: Silver Tier".\n- Else assign "Rejected: Does not meet credit criteria". Print the final status.',
      hint: 'Place the bankruptcy disqualifier as the topmost condition so high credit scores cannot override a bankruptcy record.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int creditScore = 720;
        int annualSalary = 48000;
        boolean hasBankruptcy = false;
        String status;

        if (hasBankruptcy) {
            status = "Rejected: Prior bankruptcy on file";
        } else if (creditScore >= 750 && annualSalary >= 50000) {
            status = "Approved: Platinum Tier";
        } else if (creditScore >= 700 && annualSalary >= 40000) {
            status = "Approved: Gold Tier";
        } else if (creditScore >= 650 && annualSalary >= 30000) {
            status = "Approved: Silver Tier";
        } else {
            status = "Rejected: Does not meet credit criteria";
        }

        System.out.println("Status: " + status);
    }
}`,
      output: 'Status: Approved: Gold Tier',
      explanation: 'hasBankruptcy is false. Platinum requires >= 750, which fails (720). Gold requires >= 700 and >= 40000, both of which pass (720 >= 700 && 48000 >= 40000). Hence "Approved: Gold Tier".'
    },
    {
      id: 'cf-41-ex10',
      title: 'Timestamp Duration Unit Breakdown',
      problemStatement: 'Given a duration in total seconds `totalSeconds = 3665`, convert and breakdown the duration into hours, minutes, and remaining seconds using integer arithmetic and conditional branching. Compute hours = totalSeconds / 3600, minutes = (totalSeconds % 3600) / 60, and remaining seconds = totalSeconds % 60. Print the breakdown.',
      hint: 'Divide totalSeconds by 3600 to find hours, then use modulo % to find leftover minutes and seconds.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int totalSeconds = 3665;
        int hours = totalSeconds / 3600;
        int minutes = (totalSeconds % 3600) / 60;
        int seconds = totalSeconds % 60;

        System.out.println("Duration: " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds");
    }
}`,
      output: 'Duration: 1 hours, 1 minutes, 5 seconds',
      explanation: '3665 / 3600 = 1 hour with remainder 65 seconds. 65 / 60 = 1 minute with remainder 5 seconds. The program formats and prints: "Duration: 1 hours, 1 minutes, 5 seconds".'
    }
  ],

  // =========================================================================
  // LESSON 4.2: The Traditional Switch Statement & Fall-Through (10 Exercises)
  // =========================================================================
  'switch-statement': [
    {
      id: 'cf-42-ex01',
      title: 'Day of the Week Name Lookup',
      problemStatement: 'Given an integer `dayNumber = 3`, use a traditional switch statement with `break;` statements to map numbers 1 through 7 to the days of the week: 1 is "Monday", 2 is "Tuesday", 3 is "Wednesday", 4 is "Thursday", 5 is "Friday", 6 is "Saturday", and 7 is "Sunday". Use default to assign "Invalid day". Print the mapped day name.',
      hint: 'Remember to add a "break;" statement at the end of each case to prevent falling through to the next day.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int dayNumber = 3;
        String dayName;

        switch (dayNumber) {
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            case 7:
                dayName = "Sunday";
                break;
            default:
                dayName = "Invalid day";
                break;
        }

        System.out.println("Day " + dayNumber + " is " + dayName);
    }
}`,
      output: 'Day 3 is Wednesday',
      explanation: 'The switch jumps directly to case 3, assigns "Wednesday" to dayName, and the break statement exits the switch block cleanly.'
    },
    {
      id: 'cf-42-ex02',
      title: 'Weekday vs Weekend Classifier via Stacked Cases',
      problemStatement: 'Given `dayNumber = 6`, use intentional fall-through with stacked case labels in a traditional switch statement to categorize days 1, 2, 3, 4, 5 as "Weekday", and days 6 and 7 as "Weekend". Assign the classification to a String variable and print it.',
      hint: 'Stack case labels without break: case 1: case 2: case 3: case 4: case 5: category = "Weekday"; break;',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int dayNumber = 6;
        String category;

        switch (dayNumber) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                category = "Weekday";
                break;
            case 6:
            case 7:
                category = "Weekend";
                break;
            default:
                category = "Invalid day";
                break;
        }

        System.out.println("Day " + dayNumber + " is " + category);
    }
}`,
      output: 'Day 6 is Weekend',
      explanation: 'dayNumber is 6, matching case 6. Because case 6 has no break, control falls through into case 7, assigns "Weekend", and then encounters a break.'
    },
    {
      id: 'cf-42-ex03',
      title: 'HTTP Response Code Category Mapper',
      problemStatement: 'Given HTTP status code `int statusCode = 404`, write a traditional switch statement to map codes 200, 201, 400, 404, and 500 to their canonical descriptions: 200 -> "200 OK: Request succeeded", 201 -> "201 Created: Resource created", 400 -> "400 Bad Request: Malformed syntax", 404 -> "404 Not Found: Resource not found", 500 -> "500 Internal Server Error", and default -> "Unknown Status Code". Print the description.',
      hint: 'Use int literals for each case: case 200:, case 404:, etc., with break statements after each.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int statusCode = 404;
        String description;

        switch (statusCode) {
            case 200:
                description = "200 OK: Request succeeded";
                break;
            case 201:
                description = "201 Created: Resource created";
                break;
            case 400:
                description = "400 Bad Request: Malformed syntax";
                break;
            case 404:
                description = "404 Not Found: Resource not found";
                break;
            case 500:
                description = "500 Internal Server Error";
                break;
            default:
                description = "Unknown Status Code";
                break;
        }

        System.out.println("Response: " + description);
    }
}`,
      output: 'Response: 404 Not Found: Resource not found',
      explanation: 'The JVM performs a jump lookup on statusCode (404), jumps directly to case 404, assigns the string description, and breaks out of the switch.'
    },
    {
      id: 'cf-42-ex04',
      title: 'Vowel Character Verifier',
      problemStatement: 'Given a character variable `char ch = \'e\'`, use a traditional switch statement with stacked case labels for uppercase and lowercase vowels (\'a\', \'A\', \'e\', \'E\', \'i\', \'I\', \'o\', \'O\', \'u\', \'U\') to determine whether the character is a "Vowel" or "Consonant or Other". Print the result.',
      hint: 'Stack all 10 vowel cases together. Put "Vowel" inside that block with a break, and put "Consonant or Other" in default.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        char ch = 'e';
        String type;

        switch (ch) {
            case 'a': case 'A':
            case 'e': case 'E':
            case 'i': case 'I':
            case 'o': case 'O':
            case 'u': case 'U':
                type = "Vowel";
                break;
            default:
                type = "Consonant or Other";
                break;
        }

        System.out.println("Letter '" + ch + "' is a " + type);
    }
}`,
      output: "Letter 'e' is a Vowel",
      explanation: 'The character \'e\' matches case \'e\'. Because it shares the stacked fall-through with other vowels, it assigns "Vowel" and breaks.'
    },
    {
      id: 'cf-42-ex05',
      title: 'Days in Month with Leap Year Calculation',
      problemStatement: 'Given month `month = 2` and year `year = 2024`, use a traditional switch statement on `month` to calculate the number of days. Group 31-day months (1, 3, 5, 7, 8, 10, 12), group 30-day months (4, 6, 9, 11), and in case 2, use leap year logic ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) to set 29 or 28 days. Print the number of days.',
      hint: 'Stack the 31-day month cases, stack the 30-day cases, and handle case 2 with an if-else for leap year.',
      solutionCode: `public class Solution {
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
                days = 0;
                break;
        }

        System.out.println("Days in Month " + month + " of " + year + ": " + days);
    }
}`,
      output: 'Days in Month 2 of 2024: 29',
      explanation: 'month is 2, so control jumps to case 2. 2024 is a leap year (2024 % 4 == 0), so days is set to 29.'
    },
    {
      id: 'cf-42-ex06',
      title: 'Role-Based Permission Accumulation',
      problemStatement: 'Given a user role `String role = "MANAGER"`, demonstrate deliberate fall-through without break statements to build an accumulated permission string! Rules: ADMIN receives "[Full Admin] " and falls through; MANAGER receives "[Manage Team] " and falls through; EMPLOYEE receives "[View Reports] " and falls through; GUEST receives "[Read Only]" and breaks. Print the accumulated permissions for MANAGER.',
      hint: 'Do NOT put break statements in ADMIN, MANAGER, or EMPLOYEE! Only put a break in GUEST.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String role = "MANAGER";
        String permissions = "";

        switch (role) {
            case "ADMIN":
                permissions += "[Full Admin] ";
                // deliberate fall through
            case "MANAGER":
                permissions += "[Manage Team] ";
                // deliberate fall through
            case "EMPLOYEE":
                permissions += "[View Reports] ";
                // deliberate fall through
            case "GUEST":
                permissions += "[Read Only]";
                break;
            default:
                permissions = "No Permissions";
                break;
        }

        System.out.println("Permissions for " + role + ": " + permissions);
    }
}`,
      output: 'Permissions for MANAGER: [Manage Team] [View Reports] [Read Only]',
      explanation: 'Control starts at case "MANAGER" adding "[Manage Team] ", then falls through to case "EMPLOYEE" adding "[View Reports] ", and finally falls through to case "GUEST" adding "[Read Only]" before hitting break.'
    },
    {
      id: 'cf-42-ex07',
      title: 'String-Based Math Command Dispatcher',
      problemStatement: 'Given integer operands `a = 15`, `b = 4` and operation `String operation = "MODULO"`, write a switch statement on `operation` that supports "ADD", "SUBTRACT", "MULTIPLY", "DIVIDE", and "MODULO". Compute the resulting integer and print it.',
      hint: 'In Java 7+, switch supports String directly using case "ADD":, etc.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;
        String operation = "MODULO";
        int result;

        switch (operation) {
            case "ADD":
                result = a + b;
                break;
            case "SUBTRACT":
                result = a - b;
                break;
            case "MULTIPLY":
                result = a * b;
                break;
            case "DIVIDE":
                result = a / b;
                break;
            case "MODULO":
                result = a % b;
                break;
            default:
                result = 0;
                break;
        }

        System.out.println("Operation " + operation + " on " + a + " and " + b + " = " + result);
    }
}`,
      output: 'Operation MODULO on 15 and 4 = 3',
      explanation: 'The switch matches "MODULO", computing 15 % 4 = 3, assigns it to result, and breaks.'
    },
    {
      id: 'cf-42-ex08',
      title: 'Fiscal Quarter Tax Deadline Scheduler',
      problemStatement: 'Given fiscal quarter code `char quarter = \'2\'`, write a switch statement on the char variable to determine the federal filing deadline: \'1\' -> "April 15", \'2\' -> "June 15", \'3\' -> "September 15", \'4\' -> "January 15 of next year", default -> "Invalid Quarter". Print the deadline.',
      hint: 'Remember to use single quotes for char literals: case \'1\':, case \'2\':, etc.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        char quarter = '2';
        String deadline;

        switch (quarter) {
            case '1':
                deadline = "April 15";
                break;
            case '2':
                deadline = "June 15";
                break;
            case '3':
                deadline = "September 15";
                break;
            case '4':
                deadline = "January 15 of next year";
                break;
            default:
                deadline = "Invalid Quarter";
                break;
        }

        System.out.println("Filing Deadline for Q" + quarter + ": " + deadline);
    }
}`,
      output: 'Filing Deadline for Q2: June 15',
      explanation: 'quarter is \'2\', matching case \'2\'. deadline is assigned "June 15" and the break terminates the switch.'
    },
    {
      id: 'cf-42-ex09',
      title: 'Isolated Scope Declaration in Cases',
      problemStatement: 'Demonstrate safe variable scope isolation inside a switch statement. Given `int mode = 2` and `int base = 4`, write a switch where case 1 and case 2 each use their OWN curly braces `{}` to declare a local variable `int delta`. In case 1: delta is 10, total = base + delta. In case 2: delta is 25, total = base * delta. Print the calculated total.',
      hint: 'Without curly braces { }, declaring int delta in both cases causes a compiler error "Variable delta is already defined in the scope".',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int mode = 2;
        int base = 4;
        int total;

        switch (mode) {
            case 1: {
                int delta = 10;
                total = base + delta;
                break;
            }
            case 2: {
                int delta = 25;
                total = base * delta;
                break;
            }
            default: {
                int delta = 0;
                total = delta;
                break;
            }
        }

        System.out.println("Base " + base + " transformed at mode " + mode + " = " + total);
    }
}`,
      output: 'Base 4 transformed at mode 2 = 100',
      explanation: 'Because each case body is enclosed in { }, the variable delta exists only within its respective case block. At mode 2, total becomes 4 * 25 = 100.'
    },
    {
      id: 'cf-42-ex10',
      title: 'Airline Cabin Allowance and Fee Calculator',
      problemStatement: 'Given airline cabin class `String cabin = "BUSINESS"`, write a switch statement to determine baggage allowance in kilograms and seat surcharge in dollars. "ECONOMY": baggage = 20, surcharge = 0. "PREMIUM_ECONOMY": baggage = 25, surcharge = 150. "BUSINESS": baggage = 35, surcharge = 450. "FIRST": baggage = 50, surcharge = 900. Default: baggage = 0, surcharge = -1. Print the allowance summary.',
      hint: 'Declare baggage and surcharge outside the switch, then assign them in each case.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String cabin = "BUSINESS";
        int baggage;
        int surcharge;

        switch (cabin) {
            case "ECONOMY":
                baggage = 20;
                surcharge = 0;
                break;
            case "PREMIUM_ECONOMY":
                baggage = 25;
                surcharge = 150;
                break;
            case "BUSINESS":
                baggage = 35;
                surcharge = 450;
                break;
            case "FIRST":
                baggage = 50;
                surcharge = 900;
                break;
            default:
                baggage = 0;
                surcharge = -1;
                break;
        }

        System.out.println("Cabin: " + cabin + " | Baggage: " + baggage + "kg | Surcharge: $" + surcharge);
    }
}`,
      output: 'Cabin: BUSINESS | Baggage: 35kg | Surcharge: $450',
      explanation: 'The switch matches "BUSINESS", setting baggage to 35 and surcharge to 450, and breaks.'
    }
  ],

  // =========================================================================
  // LESSON 4.3: Modern Switch Expressions (->) (10 Exercises)
  // =========================================================================
  'switch-expressions': [
    {
      id: 'cf-43-ex01',
      title: 'Day Type Direct Assignment Expression',
      problemStatement: 'Given an integer `int day = 7`, use a modern Java switch expression with arrow syntax (`->`) to assign the day type ("Weekday", "Weekend", or "Invalid Day") directly into a String variable `dayType`. Group days 1 through 5 as "Weekday", and days 6 and 7 as "Weekend". Print the result.',
      hint: 'Use: String dayType = switch (day) { case 1, 2, 3, 4, 5 -> "Weekday"; case 6, 7 -> "Weekend"; default -> "Invalid Day"; }; (Remember the trailing semicolon!).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int day = 7;

        String dayType = switch (day) {
            case 1, 2, 3, 4, 5 -> "Weekday";
            case 6, 7 -> "Weekend";
            default -> "Invalid Day";
        };

        System.out.println("Day " + day + " is " + dayType);
    }
}`,
      output: 'Day 7 is Weekend',
      explanation: 'Day 7 matches the comma-separated label "case 6, 7 ->", returning "Weekend" directly to the dayType variable without fall-through.'
    },
    {
      id: 'cf-43-ex02',
      title: 'Seasonal Calendar Grouping',
      problemStatement: 'Given a calendar month `int month = 10` (October), use a switch expression with comma-separated labels to determine the astronomical season: months 12, 1, 2 -> "Winter"; 3, 4, 5 -> "Spring"; 6, 7, 8 -> "Summer"; 9, 10, 11 -> "Autumn"; default -> "Invalid Month". Assign the season directly to a variable and print it.',
      hint: 'Modern switch allows listing comma-separated integers on the left side of the arrow: case 9, 10, 11 -> "Autumn";',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int month = 10;

        String season = switch (month) {
            case 12, 1, 2 -> "Winter";
            case 3, 4, 5 -> "Spring";
            case 6, 7, 8 -> "Summer";
            case 9, 10, 11 -> "Autumn";
            default -> "Invalid Month";
        };

        System.out.println("Month " + month + " is in " + season);
    }
}`,
      output: 'Month 10 is in Autumn',
      explanation: '10 matches "case 9, 10, 11 ->", yielding "Autumn" cleanly.'
    },
    {
      id: 'cf-43-ex03',
      title: 'Coffee Pricing with Block Yielding',
      problemStatement: 'Given cup size `String size = "VENTI"`, compute the drink price using a switch expression. "SHORT" -> 2.75, "TALL" -> 3.50, "GRANDE" -> 4.25. For "VENTI", use a braced block `{ }` to calculate a base price of 4.75 plus a 0.25 specialty roast surcharge, yielding the total using the `yield` keyword. Provide a default of 0.0. Print the price.',
      hint: 'Inside the { } block for "VENTI", write "yield base + surcharge;". Do NOT use "return".',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String size = "VENTI";

        double price = switch (size) {
            case "SHORT" -> 2.75;
            case "TALL" -> 3.50;
            case "GRANDE" -> 4.25;
            case "VENTI" -> {
                double base = 4.75;
                double surcharge = 0.25;
                yield base + surcharge;
            }
            default -> 0.0;
        };

        System.out.println("Price for size " + size + ": $" + price);
    }
}`,
      output: 'Price for size VENTI: $5.0',
      explanation: '"VENTI" enters the multi-line block branch. base (4.75) + surcharge (0.25) evaluates to 5.0, which is returned via yield to the price variable.'
    },
    {
      id: 'cf-43-ex04',
      title: 'Letter Grade to GPA Points Conversion',
      problemStatement: 'Given letter grade `char grade = \'B\'`, write a switch expression that produces the numeric GPA value: \'A\' -> 4.0, \'B\' -> 3.0, \'C\' -> 2.0, \'D\' -> 1.0, \'F\' -> 0.0, default -> -1.0. Assign the result to `double gpa` and print it.',
      hint: 'Use: double gpa = switch (grade) { case \'A\' -> 4.0; ... default -> -1.0; };',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        char grade = 'B';

        double gpa = switch (grade) {
            case 'A' -> 4.0;
            case 'B' -> 3.0;
            case 'C' -> 2.0;
            case 'D' -> 1.0;
            case 'F' -> 0.0;
            default -> -1.0;
        };

        System.out.println("Grade " + grade + " converts to GPA: " + gpa);
    }
}`,
      output: 'Grade B converts to GPA: 3.0',
      explanation: 'The switch expression evaluates grade (\'B\'), maps directly to 3.0 without fall-through, and stores 3.0 in gpa.'
    },
    {
      id: 'cf-43-ex05',
      title: 'Arrow Switch Action Dispatcher Statement',
      problemStatement: 'Given flight controller status `String droneState = "HOVER"`, use an arrow switch purely as a STATEMENT (no variable assignment, no break statements) to print operational telemetry:\n- "TAKEOFF" -> print "Ascending to 10 meters"\n- "HOVER" -> print "Maintaining current altitude and position"\n- "LAND" -> print "Descending to touchdown"\n- default -> print "Emergency shutoff engaged"',
      hint: 'Write: switch (droneState) { case "TAKEOFF" -> System.out.println(...); ... } with no break statements.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String droneState = "HOVER";

        switch (droneState) {
            case "TAKEOFF" -> System.out.println("Ascending to 10 meters");
            case "HOVER" -> System.out.println("Maintaining current altitude and position");
            case "LAND" -> System.out.println("Descending to touchdown");
            default -> System.out.println("Emergency shutoff engaged");
        }
    }
}`,
      output: 'Maintaining current altitude and position',
      explanation: 'When used as a statement, the arrow syntax dispatches only the matching branch statement without fall-through.'
    },
    {
      id: 'cf-43-ex06',
      title: 'Days in Month Switch Expression with Leap Check',
      problemStatement: 'Given `int month = 9` (September) and `int year = 2026`, write a switch expression to compute the number of days: months 1, 3, 5, 7, 8, 10, 12 -> 31; months 4, 6, 9, 11 -> 30; month 2 -> braced block yielding 29 if leap year ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)), else yielding 28; default -> -1. Print the days.',
      hint: 'Combine comma-separated cases for 31 and 30 day months, and use yield inside case 2 { }.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int month = 9;
        int year = 2026;

        int days = switch (month) {
            case 1, 3, 5, 7, 8, 10, 12 -> 31;
            case 4, 6, 9, 11 -> 30;
            case 2 -> {
                boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
                yield isLeap ? 29 : 28;
            }
            default -> -1;
        };

        System.out.println("Days in month " + month + ": " + days);
    }
}`,
      output: 'Days in month 9: 30',
      explanation: 'Month 9 matches "case 4, 6, 9, 11 -> 30;", assigning 30 to days.'
    },
    {
      id: 'cf-43-ex07',
      title: 'Subscription Tier Quota Calculator',
      problemStatement: 'Given subscription plan `String plan = "PRO"`, compute allowed monthly API credits using a switch expression:\n- "FREE" -> 1000\n- "STARTER" -> 10000\n- "PRO" -> a block yielding 50000 base + 15000 promotional bonus\n- "ENTERPRISE" -> 1000000\n- default -> 0\nPrint the allotted credits.',
      hint: 'In case "PRO", open a block { int base = 50000; int bonus = 15000; yield base + bonus; }.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String plan = "PRO";

        int credits = switch (plan) {
            case "FREE" -> 1000;
            case "STARTER" -> 10000;
            case "PRO" -> {
                int base = 50000;
                int bonus = 15000;
                yield base + bonus;
            }
            case "ENTERPRISE" -> 1000000;
            default -> 0;
        };

        System.out.println("API Credits for " + plan + " plan: " + credits);
    }
}`,
      output: 'API Credits for PRO plan: 65000',
      explanation: 'Matches "PRO", enters block, computes 50000 + 15000 = 65000, and yields the total.'
    },
    {
      id: 'cf-43-ex08',
      title: 'Mathematical Transformation Dispatcher',
      problemStatement: 'Given integer `int x = 9` and transformation command `String op = "SQRT"`, use a switch expression to perform mathematical operations: "SQUARE" -> (double)(x * x), "CUBE" -> (double)(x * x * x), "SQRT" -> Math.sqrt(x), "ABS" -> (double)Math.abs(x), default -> 0.0. Assign the result to `double result` and print it.',
      hint: 'Switch expressions can call standard library math methods on the right side of the arrow: case "SQRT" -> Math.sqrt(x);',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        int x = 9;
        String op = "SQRT";

        double result = switch (op) {
            case "SQUARE" -> (double)(x * x);
            case "CUBE" -> (double)(x * x * x);
            case "SQRT" -> Math.sqrt(x);
            case "ABS" -> (double)Math.abs(x);
            default -> 0.0;
        };

        System.out.println("Result of " + op + " on " + x + " = " + result);
    }
}`,
      output: 'Result of SQRT on 9 = 3.0',
      explanation: 'op is "SQRT", which triggers Math.sqrt(9) = 3.0 directly into result.'
    },
    {
      id: 'cf-43-ex09',
      title: 'Commercial Vehicle Highway Toll Calculator',
      problemStatement: 'Given vehicle type `String vehicle = "TRUCK"` and axle count `int axles = 4`, compute the toll fee using a switch expression:\n- "MOTORCYCLE" -> 2.50\n- "CAR" -> 5.00\n- "BUS" -> 9.00\n- "TRUCK" -> block calculating base fee 10.00 + (axles * 4.25), yielded from the block\n- default -> 0.00\nPrint the final toll.',
      hint: 'Use yield inside the "TRUCK" block to compute: 10.00 + (axles * 4.25).',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String vehicle = "TRUCK";
        int axles = 4;

        double toll = switch (vehicle) {
            case "MOTORCYCLE" -> 2.50;
            case "CAR" -> 5.00;
            case "BUS" -> 9.00;
            case "TRUCK" -> {
                double baseFee = 10.00;
                double perAxle = 4.25;
                yield baseFee + (axles * perAxle);
            }
            default -> 0.00;
        };

        System.out.println("Toll for " + vehicle + " with " + axles + " axles: $" + toll);
    }
}`,
      output: 'Toll for TRUCK with 4 axles: $27.0',
      explanation: 'For TRUCK with 4 axles: 10.00 + (4 * 4.25) = 10.00 + 17.00 = 27.0, returned via yield.'
    },
    {
      id: 'cf-43-ex10',
      title: 'Cryptographic Security Profile Evaluator',
      problemStatement: 'Given cipher mode `String cipher = "GCM"`, use a switch expression to assign a descriptive security status string:\n- "ECB" -> "Insecure: Electronic Codebook leaks patterns"\n- "CBC" -> "Legacy: Requires unpredictable initialization vector"\n- "CTR" -> "Standard: Stream cipher mode"\n- "GCM" -> a block building "Authenticated AEAD encryption with 128-bit integrity tag" using yield\n- default -> "Unsupported cipher mode"\nPrint the status string.',
      hint: 'In case "GCM", assemble and yield the authenticated encryption descriptor string.',
      solutionCode: `public class Solution {
    public static void main(String[] args) {
        String cipher = "GCM";

        String status = switch (cipher) {
            case "ECB" -> "Insecure: Electronic Codebook leaks patterns";
            case "CBC" -> "Legacy: Requires unpredictable initialization vector";
            case "CTR" -> "Standard: Stream cipher mode";
            case "GCM" -> {
                String modeType = "Authenticated AEAD encryption";
                String tag = "with 128-bit integrity tag";
                yield modeType + " " + tag;
            }
            default -> "Unsupported cipher mode";
        };

        System.out.println("Cipher Mode " + cipher + " Status: " + status);
    }
}`,
      output: 'Cipher Mode GCM Status: Authenticated AEAD encryption with 128-bit integrity tag',
      explanation: 'Matches "GCM", concatenates the mode description inside the block, and yields the resulting status string.'
    }
  ]
};
