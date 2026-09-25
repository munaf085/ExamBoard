import { ProgrammingExercise } from '../../detailedLessons';

export const cf47_49_exercises: Record<string, ProgrammingExercise[]> = {
  // ============================================================
  // LESSON 4.7: THE DO-WHILE LOOP (RUNS >= 1 TIME)
  // ============================================================
  'do-while-loop': [
    {
      id: 'cf-dw-1',
      title: 'Guaranteed Single Execution Verification',
      problemStatement: `Demonstrate the core guarantee of the do-while loop: write a Java program where the continuation condition is false right from the start, but the loop body executes exactly once.

Input Format: An integer \`int count = 100\`.
Output Format: Print the value of count inside the loop, increment it by 10, and verify the condition \`count < 50\`. Then print the final value after loop exit.

Example:
Input: count = 100
Output:
Inside do-while: 100
After loop: 110`,
      hint: 'Declare `int count = 100;` before the `do { ... }` block, print and increment inside the body, and end with `while (count < 50);`.',
      solutionCode: `public class SingleExecutionDemo {
    public static void main(String[] args) {
        int count = 100;

        do {
            System.out.println("Inside do-while: " + count);
            count += 10;
        } while (count < 50);

        System.out.println("After loop: " + count);
    }
}`,
      output: `Inside do-while: 100
After loop: 110`,
      explanation: 'Because do-while is an exit-controlled loop, the body executes before the condition is checked. 100 is printed, count becomes 110, and then (110 < 50) evaluates to false, terminating the loop after 1 run.'
    },
    {
      id: 'cf-dw-2',
      title: 'Countdown to Zero Simulator',
      problemStatement: `Write a program that uses a do-while loop to simulate a rocket launch countdown from 5 down to 0, followed by the message "Liftoff!".

Input Format: An integer \`int timer = 5\`.
Output Format: Print each number followed by "... " on the same line, then print "Liftoff!" on the next line.

Example:
Input: timer = 5
Output:
5... 4... 3... 2... 1... 0... 
Liftoff!`,
      hint: 'Inside the do-while loop, print `timer + "... "` with System.out.print, decrement `timer--`, and loop while `timer >= 0`.',
      solutionCode: `public class RocketCountdown {
    public static void main(String[] args) {
        int timer = 5;

        do {
            System.out.print(timer + "... ");
            timer--;
        } while (timer >= 0);

        System.out.println();
        System.out.println("Liftoff!");
    }
}`,
      output: `5... 4... 3... 2... 1... 0... 
Liftoff!`,
      explanation: 'The loop executes for timer values 5, 4, 3, 2, 1, and 0. When timer becomes -1, the condition (timer >= 0) is false and the loop terminates.'
    },
    {
      id: 'cf-dw-3',
      title: 'Console Menu Selection Validator',
      problemStatement: `Simulate a CLI menu prompt where the program displays a menu and prompts the user until a valid choice between 1 and 3 is provided. Use a simulated input sequence where choice starts invalid (-1), changes to 5 on attempt 2, and becomes valid (2) on attempt 3.

Input Format: Simulated inputs tracked by an attempt counter.
Output Format: For each attempt, print "Displaying menu (Attempt [attempt])... Input: [choice]". When valid, print "Selection accepted: [choice]".

Example Output:
Displaying menu (Attempt 1)... Input: -1
Displaying menu (Attempt 2)... Input: 5
Displaying menu (Attempt 3)... Input: 2
Selection accepted: 2`,
      hint: 'Use a do-while loop with condition `while (choice < 1 || choice > 3);`. Update choice inside the loop based on the attempt counter.',
      solutionCode: `public class MenuValidator {
    public static void main(String[] args) {
        int choice = -1;
        int attempt = 0;

        do {
            attempt++;
            if (attempt == 1) {
                choice = -1;
            } else if (attempt == 2) {
                choice = 5;
            } else if (attempt == 3) {
                choice = 2;
            }
            System.out.println("Displaying menu (Attempt " + attempt + ")... Input: " + choice);
        } while (choice < 1 || choice > 3);

        System.out.println("Selection accepted: " + choice);
    }
}`,
      output: `Displaying menu (Attempt 1)... Input: -1
Displaying menu (Attempt 2)... Input: 5
Displaying menu (Attempt 3)... Input: 2
Selection accepted: 2`,
      explanation: 'The menu is displayed at least once. On attempts 1 and 2, the choice is out of bounds (1 to 3), so the loop repeats. On attempt 3, choice 2 satisfies the bounds, ending the loop.'
    },
    {
      id: 'cf-dw-4',
      title: 'Digit Counter for Non-Negative Integers',
      problemStatement: `Write a program using a do-while loop to count the number of digits in an integer. The program must correctly report that 0 has 1 digit.

Input Format: An integer \`int num = 0\` or \`int num = 45892\`.
Output Format: Print "[original] has [count] digit(s)".

Example 1:
Input: num = 0
Output: 0 has 1 digit(s)

Example 2:
Input: num = 45892
Output: 45892 has 5 digit(s)`,
      hint: 'A standard while loop fails for 0 if the condition is `while (temp > 0)`. A do-while loop runs at least once, guaranteeing 0 is counted as having 1 digit.',
      solutionCode: `public class DigitCounter {
    public static void main(String[] args) {
        int num = 0;
        int temp = num;
        int digitCount = 0;

        do {
            digitCount++;
            temp /= 10;
        } while (temp > 0);

        System.out.println(num + " has " + digitCount + " digit(s)");
    }
}`,
      output: `0 has 1 digit(s)`,
      explanation: 'Because do-while executes before checking (temp > 0), digitCount increments to 1 on the first pass even when num is 0. temp becomes 0/10 = 0, and the loop terminates.'
    },
    {
      id: 'cf-dw-5',
      title: 'Reverse an Integer Using Extraction',
      problemStatement: `Write a Java program to reverse the digits of an integer using a do-while loop.

Input Format: An integer \`int number = 12345\`.
Output Format: Print the original number and the reversed number.

Example:
Input: number = 12345
Output:
Original: 12345
Reversed: 54321`,
      hint: 'Extract the last digit using `temp % 10`, build the reversed number with `reversed = (reversed * 10) + digit`, and reduce `temp /= 10`. Loop while `temp > 0`.',
      solutionCode: `public class ReverseInteger {
    public static void main(String[] args) {
        int number = 12345;
        int temp = number;
        int reversed = 0;

        do {
            int digit = temp % 10;
            reversed = (reversed * 10) + digit;
            temp /= 10;
        } while (temp > 0);

        System.out.println("Original: " + number);
        System.out.println("Reversed: " + reversed);
    }
}`,
      output: `Original: 12345
Reversed: 54321`,
      explanation: 'In each iteration, the rightmost digit is stripped and appended to reversed by multiplying the existing reversed total by 10 and adding the digit.'
    },
    {
      id: 'cf-dw-6',
      title: 'Exponential Doubling Target Reach',
      problemStatement: `Write a program that begins with value 1 and repeatedly doubles it in a do-while loop until it meets or exceeds 1000. Track the number of doublings.

Input Format: An integer \`int value = 1\` and threshold \`1000\`.
Output Format: Print each step "Step [step]: [value]" and the final summary.

Example Output:
Step 1: 2
Step 2: 4
...
Step 10: 1024
Target reached in 10 doublings. Final value: 1024`,
      hint: 'Multiply `value *= 2;` and increment `steps++;` in the body, checking `while (value < 1000);`.',
      solutionCode: `public class ExponentialDoubling {
    public static void main(String[] args) {
        int value = 1;
        int steps = 0;

        do {
            value *= 2;
            steps++;
            System.out.println("Step " + steps + ": " + value);
        } while (value < 1000);

        System.out.println("Target reached in " + steps + " doublings. Final value: " + value);
    }
}`,
      output: `Step 1: 2
Step 2: 4
Step 3: 8
Step 4: 16
Step 5: 32
Step 6: 64
Step 7: 128
Step 8: 256
Step 9: 512
Step 10: 1024
Target reached in 10 doublings. Final value: 1024`,
      explanation: 'At step 9, value is 512, which is < 1000 so the loop continues. At step 10, value becomes 1024. The condition (1024 < 1000) is false, terminating the loop.'
    },
    {
      id: 'cf-dw-7',
      title: 'Digital Root Calculator',
      problemStatement: `The digital root of a non-negative integer is the single-digit value obtained by repeatedly summing its digits until only one digit remains. Write a program to compute the digital root of 9875 using a do-while loop.

Input Format: An integer \`int number = 9875\`.
Output Format: Print each intermediate sum until a single-digit result is reached.

Example:
Input: number = 9875
Output:
Sum of digits: 29
Sum of digits: 11
Sum of digits: 2
Digital root of 9875 is 2`,
      hint: 'Use an outer do-while loop that repeats while `currentSum >= 10`. Inside, use an inner loop to sum the digits of the current number.',
      solutionCode: `public class DigitalRoot {
    public static void main(String[] args) {
        int original = 9875;
        int current = original;

        do {
            int sum = 0;
            int temp = current;
            while (temp > 0) {
                sum += temp % 10;
                temp /= 10;
            }
            System.out.println("Sum of digits: " + sum);
            current = sum;
        } while (current >= 10);

        System.out.println("Digital root of " + original + " is " + current);
    }
}`,
      output: `Sum of digits: 29
Sum of digits: 11
Sum of digits: 2
Digital root of 9875 is 2`,
      explanation: '9875 sums to 29 (>= 10, repeats). 29 sums to 11 (>= 10, repeats). 11 sums to 2 (< 10, terminates). The final single-digit root is 2.'
    },
    {
      id: 'cf-dw-8',
      title: 'ATM Security PIN Retry Counter',
      problemStatement: `Simulate an ATM security check that gives a user up to 3 attempts to enter the correct PIN (1234). Use simulated inputs: 9999 (attempt 1), 0000 (attempt 2), and 1234 (attempt 3). If correct, print "Access Granted!". If 3 failed attempts occur, print "Account Locked!".

Input Format: Simulated PIN attempts.
Output Format: Print the outcome of each attempt and the final status.

Example Output:
Attempt 1: Entered 9999 -> Incorrect PIN
Attempt 2: Entered 0000 -> Incorrect PIN
Attempt 3: Entered 1234 -> PIN Verified
Access Granted!`,
      hint: 'Track `attempt` counter and `boolean authenticated`. Loop while `!authenticated && attempt < 3`.',
      solutionCode: `public class AtmPinRetry {
    public static void main(String[] args) {
        int correctPin = 1234;
        int attempt = 0;
        boolean authenticated = false;

        do {
            attempt++;
            int enteredPin;
            if (attempt == 1) {
                enteredPin = 9999;
            } else if (attempt == 2) {
                enteredPin = 0;
            } else {
                enteredPin = 1234;
            }

            if (enteredPin == correctPin) {
                System.out.println("Attempt " + attempt + ": Entered " + enteredPin + " -> PIN Verified");
                authenticated = true;
            } else {
                System.out.println("Attempt " + attempt + ": Entered " + enteredPin + " -> Incorrect PIN");
            }
        } while (!authenticated && attempt < 3);

        if (authenticated) {
            System.out.println("Access Granted!");
        } else {
            System.out.println("Account Locked!");
        }
    }
}`,
      output: `Attempt 1: Entered 9999 -> Incorrect PIN
Attempt 2: Entered 0 -> Incorrect PIN
Attempt 3: Entered 1234 -> PIN Verified
Access Granted!`,
      explanation: 'The loop executes at least once for attempt 1. On attempt 3, the entered PIN matches the correct PIN, authenticated becomes true, and the loop terminates.'
    },
    {
      id: 'cf-dw-9',
      title: 'Decimal to Binary String Converter',
      problemStatement: `Write a program using a do-while loop to convert a positive decimal integer into its binary representation as a String. It must correctly output "0" when given 0.

Input Format: An integer \`int decimal = 19\`.
Output Format: Print the decimal value and its binary representation.

Example:
Input: decimal = 19
Output:
Decimal: 19
Binary: 10011`,
      hint: 'Extract `remainder = temp % 2`, prepend to binary string `binary = remainder + binary`, and divide `temp /= 2`. Loop while `temp > 0`.',
      solutionCode: `public class DecimalToBinary {
    public static void main(String[] args) {
        int decimal = 19;
        int temp = decimal;
        String binary = "";

        do {
            int remainder = temp % 2;
            binary = remainder + binary;
            temp /= 2;
        } while (temp > 0);

        System.out.println("Decimal: " + decimal);
        System.out.println("Binary: " + binary);
    }
}`,
      output: `Decimal: 19
Binary: 10011`,
      explanation: '19 % 2 is 1 (temp=9), 9 % 2 is 1 (temp=4), 4 % 2 is 0 (temp=2), 2 % 2 is 0 (temp=1), 1 % 2 is 1 (temp=0). Prepending digits gives "10011".'
    },
    {
      id: 'cf-dw-10',
      title: 'Collatz Sequence Generator with Step Counter',
      problemStatement: `Generate the Collatz sequence for a given positive integer n = 6 using a do-while loop. If n is even, divide it by 2; if n is odd, multiply by 3 and add 1. Repeat until n reaches 1, tracking the total transformation steps.

Input Format: An integer \`int n = 6\`.
Output Format: Print each step in the sequence followed by " -> ", and finally print the total steps taken.

Example:
Input: n = 6
Output:
Sequence: 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
Total steps: 8`,
      hint: 'Print the current value of n inside the do-block. Then if n != 1, update n using `(n % 2 == 0) ? (n / 2) : (3 * n + 1)` and increment steps. Check `while (n != 1);`.',
      solutionCode: `public class CollatzSequence {
    public static void main(String[] args) {
        int n = 6;
        int steps = 0;

        System.out.print("Sequence: ");
        do {
            System.out.print(n);
            if (n != 1) {
                System.out.print(" -> ");
                if (n % 2 == 0) {
                    n = n / 2;
                } else {
                    n = 3 * n + 1;
                }
                steps++;
            }
        } while (n != 1);

        System.out.println();
        System.out.println("Total steps: " + steps);
    }
}`,
      output: `Sequence: 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
Total steps: 8`,
      explanation: '6 is even (3), 3 is odd (10), 10 is even (5), 5 is odd (16), 16->8->4->2->1. Exactly 8 transformation steps are performed before reaching 1.'
    }
  ],

  // ============================================================
  // LESSON 4.8: BREAK, CONTINUE & LABELED STATEMENTS
  // ============================================================
  'break-continue-labeled': [
    {
      id: 'cf-bcl-1',
      title: 'Find First Multiple of 7 and 13',
      problemStatement: `Write a program that uses a for loop to scan numbers from 1 to 200 to find the first integer that is evenly divisible by both 7 and 13. Use the break statement to terminate the loop immediately upon finding the number.

Input Format: Range from 1 to 200.
Output Format: Print the first matching multiple and the number of iterations performed.

Example:
Output:
First multiple of 7 and 13 is: 91
Iterations performed: 91`,
      hint: 'Check `if (i % 7 == 0 && i % 13 == 0)`. When true, save the result and `break;`.',
      solutionCode: `public class FirstCommonMultiple {
    public static void main(String[] args) {
        int foundNumber = -1;
        int iterations = 0;

        for (int i = 1; i <= 200; i++) {
            iterations++;
            if (i % 7 == 0 && i % 13 == 0) {
                foundNumber = i;
                break;
            }
        }

        System.out.println("First multiple of 7 and 13 is: " + foundNumber);
        System.out.println("Iterations performed: " + iterations);
    }
}`,
      output: `First multiple of 7 and 13 is: 91
Iterations performed: 91`,
      explanation: '91 is 7 * 13. When i reaches 91, both conditions are met. The break statement terminates the loop immediately, avoiding iterations 92 through 200.'
    },
    {
      id: 'cf-bcl-2',
      title: 'Sum Positive Numbers Skipping Negatives',
      problemStatement: `Given an array of integers containing both positive and negative values, calculate the sum of only the positive integers. Use the continue statement to skip negative numbers and zeros.

Input Format: An array \`int[] numbers = {12, -5, 8, -2, 15, 0, -9, 20}\`.
Output Format: Print each positive number included, followed by the total sum.

Example:
Output:
Adding positive: 12
Adding positive: 8
Adding positive: 15
Adding positive: 20
Total positive sum: 55`,
      hint: 'Inside the loop, check `if (num <= 0) continue;`. Then add `sum += num;`.',
      solutionCode: `public class SumPositiveNumbers {
    public static void main(String[] args) {
        int[] numbers = {12, -5, 8, -2, 15, 0, -9, 20};
        int totalSum = 0;

        for (int i = 0; i < numbers.length; i++) {
            int num = numbers[i];
            if (num <= 0) {
                continue;
            }
            System.out.println("Adding positive: " + num);
            totalSum += num;
        }

        System.out.println("Total positive sum: " + totalSum);
    }
}`,
      output: `Adding positive: 12
Adding positive: 8
Adding positive: 15
Adding positive: 20
Total positive sum: 55`,
      explanation: 'Whenever a non-positive number (-5, -2, 0, -9) is encountered, `continue` aborts the current iteration, skipping both the print statement and the accumulator.'
    },
    {
      id: 'cf-bcl-3',
      title: 'Prime Number Verification with Early Break',
      problemStatement: `Write a program to determine if an integer n = 29 is prime. Use a loop to check potential divisors from 2 up to n / 2. If any divisor evenly divides n, set a flag and break out of the loop early.

Input Format: An integer \`int n = 29\`.
Output Format: Print whether the number is prime.

Example 1:
Input: n = 29
Output: 29 is a prime number

Example 2:
Input: n = 24
Output: 24 is NOT a prime number (divisible by 2)`,
      hint: 'If `n % i == 0`, set `isPrime = false;` and execute `break;` immediately.',
      solutionCode: `public class PrimeChecker {
    public static void main(String[] args) {
        int n = 29;
        boolean isPrime = true;

        if (n <= 1) {
            isPrime = false;
        } else {
            for (int i = 2; i <= n / 2; i++) {
                if (n % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }

        if (isPrime) {
            System.out.println(n + " is a prime number");
        } else {
            System.out.println(n + " is NOT a prime number");
        }
    }
}`,
      output: `29 is a prime number`,
      explanation: 'No integer between 2 and 14 evenly divides 29. The loop completes without hitting break, so isPrime remains true.'
    },
    {
      id: 'cf-bcl-4',
      title: 'Filter Multiples of Three and Five',
      problemStatement: `Print numbers from 1 to 20, but use the continue statement to skip any number that is divisible by 3 or divisible by 5.

Input Format: Range from 1 to 20.
Output Format: Print the accepted numbers separated by spaces on a single line.

Example Output:
1 2 4 7 8 11 13 14 16 17 19 `,
      hint: 'Inside the loop from 1 to 20, check `if (i % 3 == 0 || i % 5 == 0) continue;`.',
      solutionCode: `public class SkipMultiples {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            if (i % 3 == 0 || i % 5 == 0) {
                continue;
            }
            System.out.print(i + " ");
        }
        System.out.println();
    }
}`,
      output: `1 2 4 7 8 11 13 14 16 17 19 `,
      explanation: 'Numbers 3, 5, 6, 9, 10, 12, 15, 18, and 20 are skipped by continue because they are divisible by 3 or 5.'
    },
    {
      id: 'cf-bcl-5',
      title: 'First Duplicate Adjacent Element Finder',
      problemStatement: `Given an array of integers, find the first occurrence of two consecutive identical numbers using a for loop and break.

Input Format: An array \`int[] arr = {10, 25, 40, 40, 55, 60, 60}\`.
Output Format: Print the duplicate value and the index positions where it was first detected.

Example:
Output: First duplicate 40 found at indices 2 and 3`,
      hint: 'Loop from index 0 to `arr.length - 2`. If `arr[i] == arr[i + 1]`, print and `break;`.',
      solutionCode: `public class FirstAdjacentDuplicate {
    public static void main(String[] args) {
        int[] arr = {10, 25, 40, 40, 55, 60, 60};
        int duplicateVal = -1;
        int firstIndex = -1;

        for (int i = 0; i < arr.length - 1; i++) {
            if (arr[i] == arr[i + 1]) {
                duplicateVal = arr[i];
                firstIndex = i;
                break;
            }
        }

        if (firstIndex != -1) {
            System.out.println("First duplicate " + duplicateVal + " found at indices " + firstIndex + " and " + (firstIndex + 1));
        } else {
            System.out.println("No adjacent duplicates found");
        }
    }
}`,
      output: `First duplicate 40 found at indices 2 and 3`,
      explanation: 'The loop examines pairs: (10,25), (25,40), and (40,40). At index 2, 40 == 40 is detected, and break terminates the loop before checking subsequent pairs.'
    },
    {
      id: 'cf-bcl-6',
      title: 'Budget Spend Cap with Break',
      problemStatement: `You have a spending budget of $100. A list of item prices is provided in an array: \`{25, 30, 40, 20, 10}\`. Iterate through the items; if purchasing the next item would cause total spending to exceed the budget, stop immediately using break.

Input Format: An array \`int[] prices = {25, 30, 40, 20, 10}\` and \`int budget = 100\`.
Output Format: Print each purchased item, total spent, remaining budget, and items bought.

Example:
Output:
Purchased item for: $25 (Total: $25)
Purchased item for: $30 (Total: $55)
Purchased item for: $40 (Total: $95)
Cannot afford next item ($20). Stopping purchases.
Items bought: 3
Total spent: $95
Remaining: $5`,
      hint: 'Before adding to total, check `if (spent + price > budget) break;`.',
      solutionCode: `public class BudgetTracker {
    public static void main(String[] args) {
        int[] prices = {25, 30, 40, 20, 10};
        int budget = 100;
        int spent = 0;
        int itemsCount = 0;

        for (int i = 0; i < prices.length; i++) {
            int price = prices[i];
            if (spent + price > budget) {
                System.out.println("Cannot afford next item ($" + price + "). Stopping purchases.");
                break;
            }
            spent += price;
            itemsCount++;
            System.out.println("Purchased item for: $" + price + " (Total: $" + spent + ")");
        }

        System.out.println("Items bought: " + itemsCount);
        System.out.println("Total spent: $" + spent);
        System.out.println("Remaining: $" + (budget - spent));
    }
}`,
      output: `Purchased item for: $25 (Total: $25)
Purchased item for: $30 (Total: $55)
Purchased item for: $40 (Total: $95)
Cannot afford next item ($20). Stopping purchases.
Items bought: 3
Total spent: $95
Remaining: $5`,
      explanation: 'After purchasing the first 3 items (25 + 30 + 40 = 95), the fourth item ($20) would push total to $115, exceeding $100. The break terminates the loop.'
    },
    {
      id: 'cf-bcl-7',
      title: 'Labeled Break in 2D Search Matrix',
      problemStatement: `Given a 3x3 matrix, write a program that searches for the target number 42. When 42 is found, terminate both loops immediately using a labeled break statement, and print its coordinates.

Input Format: A 3x3 array \`int[][] matrix = {{10, 20, 30}, {35, 42, 50}, {60, 70, 80}}\`.
Output Format: Print "Target [target] found at row [r], col [c]" and confirm that search halted immediately.

Example Output:
Checking (0,0): 10
Checking (0,1): 20
Checking (0,2): 30
Checking (1,0): 35
Checking (1,1): 42
Target 42 found at row 1, col 1! Exiting search.`,
      hint: 'Label the outer loop `searchMatrix: for (int r = 0; ...)` and call `break searchMatrix;` when target matches.',
      solutionCode: `public class LabeledMatrixSearch {
    public static void main(String[] args) {
        int[][] matrix = {
            {10, 20, 30},
            {35, 42, 50},
            {60, 70, 80}
        };
        int target = 42;
        boolean found = false;

        searchMatrix:
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                System.out.println("Checking (" + r + "," + c + "): " + matrix[r][c]);
                if (matrix[r][c] == target) {
                    System.out.println("Target " + target + " found at row " + r + ", col " + c + "! Exiting search.");
                    found = true;
                    break searchMatrix;
                }
            }
        }
    }
}`,
      output: `Checking (0,0): 10
Checking (0,1): 20
Checking (0,2): 30
Checking (1,0): 35
Checking (1,1): 42
Target 42 found at row 1, col 1! Exiting search.`,
      explanation: 'Without a labeled break, breaking would only exit the inner column loop, continuing to inspect row 2. `break searchMatrix` exits both row and column loops immediately.'
    },
    {
      id: 'cf-bcl-8',
      title: 'Labeled Continue Skipping Invalid Data Rows',
      problemStatement: `You are processing sensor data from a 2D array where each row represents a sensor package. If ANY value in a row is negative (indicating sensor error), discard that entire row immediately using a labeled continue, without adding its readings to the grand total.

Input Format: A 3x3 array:
\`{{10, 20, 30}, {15, -1, 25}, {5, 10, 15}}\`
Output Format: Print the status of each row and the final sum of valid rows.

Example Output:
Row 0 valid: sum = 60
Row 1 contains corrupted reading! Skipping row.
Row 2 valid: sum = 30
Grand valid total: 90`,
      hint: 'Label the outer loop `nextRow: for (int r = 0; ...)`. If `reading < 0`, print error and call `continue nextRow;`.',
      solutionCode: `public class LabeledSensorFilter {
    public static void main(String[] args) {
        int[][] readings = {
            {10, 20, 30},
            {15, -1, 25},
            {5, 10, 15}
        };
        int grandTotal = 0;

        nextRow:
        for (int r = 0; r < readings.length; r++) {
            int rowSum = 0;
            for (int c = 0; c < readings[r].length; c++) {
                if (readings[r][c] < 0) {
                    System.out.println("Row " + r + " contains corrupted reading! Skipping row.");
                    continue nextRow;
                }
                rowSum += readings[r][c];
            }
            System.out.println("Row " + r + " valid: sum = " + rowSum);
            grandTotal += rowSum;
        }

        System.out.println("Grand valid total: " + grandTotal);
    }
}`,
      output: `Row 0 valid: sum = 60
Row 1 contains corrupted reading! Skipping row.
Row 2 valid: sum = 30
Grand valid total: 90`,
      explanation: 'When readings[1][1] is -1, `continue nextRow` immediately aborts the rest of row 1, bypassing the `grandTotal += rowSum` step and starting row 2.'
    },
    {
      id: 'cf-bcl-9',
      title: 'Vowel Filter Using Continue in String Parsing',
      problemStatement: `Write a program that iterates through the characters of the string "Control Flow in Java". Use the continue statement to skip vowels (a, e, i, o, u, both uppercase and lowercase) and spaces, printing only consonants on the same line.

Input Format: \`String str = "Control Flow in Java"\`.
Output Format: Print only the consonants.

Example Output:
CntrlFlwnJv`,
      hint: 'In a loop from index 0 to `str.length() - 1`, extract `char ch = str.charAt(i)`. If ch is a vowel or space, `continue;`.',
      solutionCode: `public class VowelFilter {
    public static void main(String[] args) {
        String str = "Control Flow in Java";

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            char lower = Character.toLowerCase(ch);

            if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u' || ch == ' ') {
                continue;
            }
            System.out.print(ch);
        }
        System.out.println();
    }
}`,
      output: `CntrlFlwnJv`,
      explanation: 'All vowels and whitespace characters satisfy the skip condition, triggering continue. Only consonant letters reach the print statement.'
    },
    {
      id: 'cf-bcl-10',
      title: 'First Pair Summing to Target with Labeled Break',
      problemStatement: `Given an array of distinct integers \`{2, 5, 8, 11, 14, 17}\`, find the first pair of elements (at distinct indices i < j) whose sum equals 19. Use a labeled break to stop scanning once the pair is found.

Input Format: An array \`int[] arr = {2, 5, 8, 11, 14, 17}\` and \`int target = 19\`.
Output Format: Print the pair elements and their indices.

Example Output:
Found pair: arr[1] (5) + arr[4] (14) = 19`,
      hint: 'Outer loop `pairSearch: for (int i = 0; ...)` and inner loop `for (int j = i + 1; ...)`. If sum == target, print and `break pairSearch;`.',
      solutionCode: `public class PairSumFinder {
    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 11, 14, 17};
        int target = 19;
        boolean found = false;

        pairSearch:
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] + arr[j] == target) {
                    System.out.println("Found pair: arr[" + i + "] (" + arr[i] + ") + arr[" + j + "] (" + arr[j] + ") = " + target);
                    found = true;
                    break pairSearch;
                }
            }
        }

        if (!found) {
            System.out.println("No pair sums to " + target);
        }
    }
}`,
      output: `Found pair: arr[1] (5) + arr[4] (14) = 19`,
      explanation: 'Pairs evaluated: (2+5), (2+8), (2+11), (2+14), (2+17), (5+8), (5+11), (5+14=19). At (i=1, j=4), 5 + 14 = 19, triggering `break pairSearch` to halt all searching.'
    }
  ],

  // ============================================================
  // LESSON 4.9: NESTED LOOPS & LOOP TRACING
  // ============================================================
  'nested-loops-and-tracing': [
    {
      id: 'cf-nlt-1',
      title: 'Multiplication Table Grid Generator',
      problemStatement: `Write a Java program using nested for loops to generate a 5x5 multiplication table grid where each cell (row * col) is formatted with clean spacing.

Input Format: Dimension \`int size = 5\`.
Output Format: A 5x5 grid of integers where row i and col j print \`i * j\`.

Example Output:
 1  2  3  4  5
 2  4  6  8 10
 3  6  9 12 15
 4  8 12 16 20
 5 10 15 20 25`,
      hint: 'Outer loop runs `r = 1` to 5. Inner loop runs `c = 1` to 5. Print `(r * c)` with space padding, and print a newline after the inner loop completes.',
      solutionCode: `public class MultiplicationGrid {
    public static void main(String[] args) {
        int size = 5;

        for (int r = 1; r <= size; r++) {
            for (int c = 1; c <= size; c++) {
                int prod = r * c;
                if (prod < 10) {
                    System.out.print(" " + prod + " ");
                } else {
                    System.out.print(prod + " ");
                }
            }
            System.out.println();
        }
    }
}`,
      output: ` 1  2  3  4  5 
 2  4  6  8 10 
 3  6  9 12 15 
 4  8 12 16 20 
 5 10 15 20 25 `,
      explanation: 'The outer loop manages the rows (1 to 5) and the inner loop manages the columns (1 to 5). After each row of 5 numbers finishes printing, System.out.println() creates the line break.'
    },
    {
      id: 'cf-nlt-2',
      title: 'Right-Angled Number Triangle',
      problemStatement: `Generate a right-angled triangle of numbers with height 5 where row i prints numbers from 1 up to i.

Input Format: Height \`int n = 5\`.
Output Format:
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5`,
      hint: 'Use a dependent inner loop: `for (int j = 1; j <= i; j++)`. Print `j + " "` and output a newline after the inner loop.',
      solutionCode: `public class NumberTrianglePattern {
    public static void main(String[] args) {
        int n = 5;

        for (int i = 1; i <= n; i++) {
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
      explanation: 'For row 1, j runs 1 time. For row 2, j runs 2 times, up to row 5 where j runs 5 times. Total numbers printed = 1 + 2 + 3 + 4 + 5 = 15.'
    },
    {
      id: 'cf-nlt-3',
      title: 'Inverted Asterisk Triangle',
      problemStatement: `Write a program using nested loops to print an inverted right-angled triangle of asterisks starting with 5 stars on the first row and decreasing down to 1 star on the last row.

Input Format: Height \`int rows = 5\`.
Output Format:
* * * * *
* * * *
* * *
* *
*`,
      hint: 'Make the outer loop count backwards: `for (int i = rows; i >= 1; i--)`, and the inner loop run `for (int j = 1; j <= i; j++)`.',
      solutionCode: `public class InvertedStarTriangle {
    public static void main(String[] args) {
        int rows = 5;

        for (int i = rows; i >= 1; i--) {
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
      explanation: 'When i = 5, the inner loop prints 5 stars. On each subsequent outer cycle, i decrements by 1, resulting in 4, 3, 2, and finally 1 star.'
    },
    {
      id: 'cf-nlt-4',
      title: 'Floyd\'s Triangle Generator',
      problemStatement: `Floyd\'s triangle is a right-angled triangular array of natural numbers where each row contains consecutive integers starting from 1. Write a program to print Floyd\'s triangle with 4 rows.

Input Format: An integer \`int rows = 4\`.
Output Format:
1 
2 3 
4 5 6 
7 8 9 10 `,
      hint: 'Maintain a continuous counter `int num = 1;` declared outside both loops. Inside the inner loop, print `num++ + " "`.',
      solutionCode: `public class FloydsTriangle {
    public static void main(String[] args) {
        int rows = 4;
        int num = 1;

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }
    }
}`,
      output: `1 
2 3 
4 5 6 
7 8 9 10 `,
      explanation: 'The variable num is not reset between rows; it continuously increments from 1 up to 10 across all 4 rows.'
    },
    {
      id: 'cf-nlt-5',
      title: 'Hollow Square Pattern',
      problemStatement: `Print a hollow square border of asterisks of size 5x5. The boundary rows and columns should contain asterisks, while internal cells should contain spaces.

Input Format: Dimension \`int size = 5\`.
Output Format:
* * * * *
*       *
*       *
*       *
* * * * *`,
      hint: 'Check if current position is on border: `if (r == 1 || r == size || c == 1 || c == size) print("* "); else print("  ");`.',
      solutionCode: `public class HollowSquare {
    public static void main(String[] args) {
        int size = 5;

        for (int r = 1; r <= size; r++) {
            for (int c = 1; c <= size; c++) {
                if (r == 1 || r == size || c == 1 || c == size) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
      output: `* * * * * 
*       * 
*       * 
*       * 
* * * * * `,
      explanation: 'Border cells satisfy the boundary condition (first/last row or column), printing "* ". Inner cells fail the condition and print two spaces.'
    },
    {
      id: 'cf-nlt-6',
      title: 'Mirrored Right-Angled Triangle',
      problemStatement: `Print a right-aligned (mirrored) right-angled triangle of asterisks with height 5. Each row has leading spaces followed by asterisks.

Input Format: Height \`int n = 5\`.
Output Format:
        *
      * *
    * * *
  * * * *
* * * * *`,
      hint: 'Inside the outer loop for row i (1 to n), use two sequential inner loops: first prints `(n - i)` pairs of spaces `"  "`, second prints `i` asterisks `"* "`.',
      solutionCode: `public class MirroredTriangle {
    public static void main(String[] args) {
        int n = 5;

        for (int i = 1; i <= n; i++) {
            // Inner loop 1: leading spaces
            for (int s = 1; s <= n - i; s++) {
                System.out.print("  ");
            }
            // Inner loop 2: asterisks
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      output: `        * 
      * * 
    * * * 
  * * * * 
* * * * * `,
      explanation: 'For row 1: 4 spaces, 1 star. Row 2: 3 spaces, 2 stars... Row 5: 0 spaces, 5 stars. The result is a right-aligned triangle.'
    },
    {
      id: 'cf-nlt-7',
      title: 'Star Pyramid Pattern Generator',
      problemStatement: `Print a centered symmetric pyramid of asterisks with height 4. Row i (1 to 4) has (height - i) leading spaces and (2 * i - 1) asterisks.

Input Format: Height \`int height = 4\`.
Output Format:
   *
  ***
 *****
*******`,
      hint: 'Outer loop runs i = 1 to height. First inner loop prints spaces `(height - i)`. Second inner loop prints stars `(2 * i - 1)`.',
      solutionCode: `public class StarPyramid {
    public static void main(String[] args) {
        int height = 4;

        for (int i = 1; i <= height; i++) {
            // Print leading spaces
            for (int s = 1; s <= height - i; s++) {
                System.out.print(" ");
            }
            // Print odd number of stars: 2*i - 1
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: `   *
  ***
 *****
*******`,
      explanation: 'Row 1 has 3 spaces and 1 star. Row 2 has 2 spaces and 3 stars. Row 3 has 1 space and 5 stars. Row 4 has 0 spaces and 7 stars.'
    },
    {
      id: 'cf-nlt-8',
      title: 'Prime Numbers in Range Generator',
      problemStatement: `Write a program using nested loops to find and print all prime numbers in the range from 2 to 30.

Input Format: Range from 2 to 30.
Output Format: Print the primes on a single line separated by spaces.

Example Output:
2 3 5 7 11 13 17 19 23 29 `,
      hint: 'Outer loop iterates `num` from 2 to 30. Inner loop checks if `num % d == 0` for `d` from 2 up to `num / 2`. If no divisor is found, print `num`.',
      solutionCode: `public class PrimesInRange {
    public static void main(String[] args) {
        int limit = 30;

        for (int num = 2; num <= limit; num++) {
            boolean isPrime = true;
            for (int d = 2; d <= num / 2; d++) {
                if (num % d == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                System.out.print(num + " ");
            }
        }
        System.out.println();
    }
}`,
      output: `2 3 5 7 11 13 17 19 23 29 `,
      explanation: 'The outer loop tests each number from 2 to 30. The inner loop searches for a divisor. If a divisor is found, break halts the inner search early. Numbers with isPrime=true are printed.'
    },
    {
      id: 'cf-nlt-9',
      title: 'Matrix Coordinate Pair Printer',
      problemStatement: `Write a program using nested loops to print all coordinate pairs (row, col) for a 3x3 matrix along with an indicator when the element lies on the main diagonal (where row == col).

Input Format: Dimensions \`rows = 3, cols = 3\`.
Output Format: Print each cell coordinate, appending "[D]" if on diagonal.

Example Output:
(0,0)[D] (0,1) (0,2) 
(1,0) (1,1)[D] (1,2) 
(2,0) (2,1) (2,2)[D] `,
      hint: 'Outer loop r from 0 to 2; inner loop c from 0 to 2. Check `if (r == c) print("(" + r + "," + c + ")[D] "); else print("(" + r + "," + c + ") ");`.',
      solutionCode: `public class MatrixCoordinatePrinter {
    public static void main(String[] args) {
        int rows = 3;
        int cols = 3;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (r == c) {
                    System.out.print("(" + r + "," + c + ")[D] ");
                } else {
                    System.out.print("(" + r + "," + c + ") ");
                }
            }
            System.out.println();
        }
    }
}`,
      output: `(0,0)[D] (0,1) (0,2) 
(1,0) (1,1)[D] (1,2) 
(2,0) (2,1) (2,2)[D] `,
      explanation: 'The inner loop cycles through all column indices for each row. The diagonal condition r == c matches cells (0,0), (1,1), and (2,2).'
    },
    {
      id: 'cf-nlt-10',
      title: 'Diamond Star Pattern Generator',
      problemStatement: `Print a symmetric diamond pattern of asterisks. For n = 3 (upper half height), the top pyramid has 3 rows (1, 3, 5 stars) and the bottom inverted pyramid has 2 rows (3, 1 stars).

Input Format: Half-height \`int n = 3\`.
Output Format:
  *
 ***
*****
 ***
  *`,
      hint: 'Construct two outer loops: the first for the top half (i = 1 to n), and the second for the bottom half (i = n - 1 down to 1).',
      solutionCode: `public class DiamondPattern {
    public static void main(String[] args) {
        int n = 3;

        // Upper pyramid (including middle widest row)
        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= n - i; s++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }

        // Lower inverted pyramid
        for (int i = n - 1; i >= 1; i--) {
            for (int s = 1; s <= n - i; s++) {
                System.out.print(" ");
            }
            for (int j = 1; j <= (2 * i - 1); j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      output: `  *
 ***
*****
 ***
  *`,
      explanation: 'The top half prints rows with 1, 3, and 5 stars with 2, 1, and 0 leading spaces. The bottom half mirrors this by decrementing i from 2 down to 1, producing 3 and 1 stars.'
    }
  ]
};
