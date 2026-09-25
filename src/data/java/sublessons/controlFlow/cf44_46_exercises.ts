import { ProgrammingExercise } from '../../detailedLessons';

export const cf44_46_exercises: Record<string, ProgrammingExercise[]> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 4.4: The For Loop Deep Dive (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'for-loop-deep-dive': [
    {
      id: 'cf44-ex-1',
      title: 'Factorial Calculator',
      problemStatement: `Write a Java program to compute the factorial of a positive integer N using a standard for loop.
Recall that N! = N * (N - 1) * (N - 2) * ... * 1. For N = 5, the factorial is 5 * 4 * 3 * 2 * 1 = 120.

Input Format: An integer variable \`int n = 5;\`
Output Format: Print "Factorial of [n] is [result]".

Example:
Input: n = 5
Output: Factorial of 5 is 120`,
      hint: 'Initialize an accumulator variable `int fact = 1;` before the loop. Run a for loop starting at 1 up to n, multiplying `fact *= i;` on each step.',
      solutionCode: `public class FactorialCalculator {
    public static void main(String[] args) {
        int n = 5;
        int fact = 1;

        for (int i = 1; i <= n; i++) {
            fact *= i;
        }

        System.out.println("Factorial of " + n + " is " + fact);
    }
}`,
      output: 'Factorial of 5 is 120',
      explanation: 'The loop counter i runs from 1 to 5 inclusive. In each iteration, fact is multiplied by i: 1*1=1, 1*2=2, 2*3=6, 6*4=24, 24*5=120.'
    },
    {
      id: 'cf44-ex-2',
      title: 'Multiplication Table Generator',
      problemStatement: `Write a Java program to print the multiplication table for a given integer N from 1 through 10.

Input Format: An integer variable \`int n = 7;\`
Output Format: Print 10 lines, each formatted as "[n] x [i] = [product]".

Example:
Input: n = 7
Output:
7 x 1 = 7
7 x 2 = 14
...
7 x 10 = 70`,
      hint: 'Use a for loop with counter `i` starting at 1 and ending at 10 (`i <= 10`). In each iteration, calculate `n * i` and print.',
      solutionCode: `public class MultiplicationTable {
    public static void main(String[] args) {
        int n = 7;

        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
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
      explanation: 'The loop executes exactly 10 times, incrementing i by 1 each time. Each pass computes and displays the product of 7 and i.'
    },
    {
      id: 'cf44-ex-3',
      title: 'Sum of Multiples of Three or Five',
      problemStatement: `Write a Java program to calculate the sum of all natural numbers up to a given limit that are multiples of 3 or 5.

Input Format: An integer variable \`int limit = 20;\`
Output Format: Print "Sum of multiples: [sum]".

Example:
Input: limit = 20
Multiples: 3, 5, 6, 9, 10, 12, 15, 18, 20
Output: Sum of multiples: 98`,
      hint: 'Loop from 1 to limit. Inside the loop, test `if (i % 3 == 0 || i % 5 == 0)` and add `i` to an accumulator.',
      solutionCode: `public class MultiplesSum {
    public static void main(String[] args) {
        int limit = 20;
        int sum = 0;

        for (int i = 1; i <= limit; i++) {
            if (i % 3 == 0 || i % 5 == 0) {
                sum += i;
            }
        }

        System.out.println("Sum of multiples: " + sum);
    }
}`,
      output: 'Sum of multiples: 98',
      explanation: 'The numbers 3, 5, 6, 9, 10, 12, 15, 18, and 20 satisfy the modulo condition. Adding them yields 98.'
    },
    {
      id: 'cf44-ex-4',
      title: 'Rocket Launch Countdown',
      problemStatement: `Write a Java program that simulates a rocket launch countdown from 10 down to 1, followed by "Liftoff!".
Each number must be printed on the same line separated by spaces.

Input Format: An integer variable \`int start = 10;\`
Output Format: Print the countdown numbers followed by "Liftoff!".

Example:
Input: start = 10
Output: 10 9 8 7 6 5 4 3 2 1 Liftoff!`,
      hint: 'Initialize the loop counter to start, use condition `timer >= 1`, and update with `timer--`. Use `System.out.print` inside the loop.',
      solutionCode: `public class RocketCountdown {
    public static void main(String[] args) {
        int start = 10;

        for (int timer = start; timer >= 1; timer--) {
            System.out.print(timer + " ");
        }
        System.out.println("Liftoff!");
    }
}`,
      output: '10 9 8 7 6 5 4 3 2 1 Liftoff!',
      explanation: 'The loop decrements timer by 1 after each pass. When timer reaches 0, the condition timer >= 1 evaluates to false and the loop terminates.'
    },
    {
      id: 'cf44-ex-5',
      title: 'Powers of Two Progression',
      problemStatement: `Write a Java program using a multiplicative for loop step to print powers of 2 starting at 1 up to a given maximum value.

Input Format: An integer variable \`int max = 128;\`
Output Format: Print the powers of two separated by spaces.

Example:
Input: max = 128
Output: 1 2 4 8 16 32 64 128`,
      hint: 'Set up the loop header as `for (int val = 1; val <= max; val *= 2)`.',
      solutionCode: `public class PowersOfTwoProgression {
    public static void main(String[] args) {
        int max = 128;

        for (int val = 1; val <= max; val *= 2) {
            System.out.print(val + " ");
        }
        System.out.println();
    }
}`,
      output: '1 2 4 8 16 32 64 128',
      explanation: 'Rather than adding 1, the update expression multiplies val by 2 (val *= 2) on every iteration, doubling its value geometrically.'
    },
    {
      id: 'cf44-ex-6',
      title: 'Converging Pointers Symmetric Sum',
      problemStatement: `Write a Java program using a two-variable for loop header where one pointer starts at 1 and increases by 1, while the other starts at 10 and decreases by 1.
The loop continues as long as \`left < right\`. Print each pair and their sum.

Input Format: Header declaration \`int left = 1, right = 10;\`
Output Format: Print each pair as "[left] + [right] = [sum]".

Example:
Output:
1 + 10 = 11
2 + 9 = 11
3 + 8 = 11
4 + 7 = 11
5 + 6 = 11`,
      hint: 'Use `for (int left = 1, right = 10; left < right; left++, right--)` to advance both pointers simultaneously.',
      solutionCode: `public class ConvergingPointersSum {
    public static void main(String[] args) {
        for (int left = 1, right = 10; left < right; left++, right--) {
            System.out.println(left + " + " + right + " = " + (left + right));
        }
    }
}`,
      output: `1 + 10 = 11
2 + 9 = 11
3 + 8 = 11
4 + 7 = 11
5 + 6 = 11`,
      explanation: 'In each step, left increases by 1 and right decreases by 1. When left=6 and right=5, the condition 6 < 5 is false, terminating the loop after exactly 5 iterations.'
    },
    {
      id: 'cf44-ex-7',
      title: 'Fibonacci Sequence Generator',
      problemStatement: `Write a Java program to print the first N numbers of the Fibonacci sequence using a for loop.
The sequence starts with 0 and 1, and each subsequent number is the sum of the previous two.

Input Format: An integer variable \`int n = 8;\`
Output Format: Print the first N Fibonacci numbers separated by spaces.

Example:
Input: n = 8
Output: 0 1 1 2 3 5 8 13`,
      hint: 'Maintain two variables `first = 0` and `second = 1`. In each iteration, print `first`, then compute `next = first + second`, update `first = second`, and `second = next`.',
      solutionCode: `public class FibonacciGenerator {
    public static void main(String[] args) {
        int n = 8;
        int first = 0;
        int second = 1;

        for (int i = 1; i <= n; i++) {
            System.out.print(first + " ");
            int next = first + second;
            first = second;
            second = next;
        }
        System.out.println();
    }
}`,
      output: '0 1 1 2 3 5 8 13',
      explanation: 'The loop executes 8 times. In each iteration, it prints the current term first, then calculates the next term and shifts values forward.'
    },
    {
      id: 'cf44-ex-8',
      title: 'Range Evens Sum and Count',
      problemStatement: `Write a Java program to calculate both the count and the sum of all even numbers in a given inclusive range [start, end].

Input Format:
- \`int start = 4;\`
- \`int end = 16;\`

Output Format: Print "Count: [count], Sum: [sum]".

Example:
Input: start = 4, end = 16
Even numbers: 4, 6, 8, 10, 12, 14, 16 (7 numbers)
Output: Count: 7, Sum: 70`,
      hint: 'Loop from start to end with step 1. If `i % 2 == 0`, increment count and add `i` to sum.',
      solutionCode: `public class RangeEvensCalculator {
    public static void main(String[] args) {
        int start = 4;
        int end = 16;
        int count = 0;
        int sum = 0;

        for (int i = start; i <= end; i++) {
            if (i % 2 == 0) {
                count++;
                sum += i;
            }
        }

        System.out.println("Count: " + count + ", Sum: " + sum);
    }
}`,
      output: 'Count: 7, Sum: 70',
      explanation: 'The even numbers between 4 and 16 are 4, 6, 8, 10, 12, 14, and 16. Total count is 7, and their sum is 70.'
    },
    {
      id: 'cf44-ex-9',
      title: 'Square and Cube Table',
      problemStatement: `Write a Java program to print the square and cube for each number from 1 to 5.

Input Format: An integer variable \`int limit = 5;\`
Output Format: Print 5 lines in the format "N: [n], Sq: [sq], Cube: [cube]".

Example:
Output:
N: 1, Sq: 1, Cube: 1
N: 2, Sq: 4, Cube: 8
N: 3, Sq: 9, Cube: 27
N: 4, Sq: 16, Cube: 64
N: 5, Sq: 25, Cube: 125`,
      hint: 'Run a for loop from 1 to limit. Compute `i * i` and `i * i * i` on each step.',
      solutionCode: `public class PowersTable {
    public static void main(String[] args) {
        int limit = 5;

        for (int i = 1; i <= limit; i++) {
            int sq = i * i;
            int cube = i * i * i;
            System.out.println("N: " + i + ", Sq: " + sq + ", Cube: " + cube);
        }
    }
}`,
      output: `N: 1, Sq: 1, Cube: 1
N: 2, Sq: 4, Cube: 8
N: 3, Sq: 9, Cube: 27
N: 4, Sq: 16, Cube: 64
N: 5, Sq: 25, Cube: 125`,
      explanation: 'The loop executes 5 times, computing and printing the algebraic square and cube for each integer from 1 to 5.'
    },
    {
      id: 'cf44-ex-10',
      title: 'Alternating Series Summation',
      problemStatement: `Write a Java program to compute the alternating series sum for N terms:
S = 1 - 2 + 3 - 4 + 5 - 6 + ... up to N.

Input Format: An integer variable \`int n = 10;\`
Output Format: Print "Alternating sum for n=[n]: [sum]".

Example:
Input: n = 10
Calculation: (1 - 2) + (3 - 4) + (5 - 6) + (7 - 8) + (9 - 10) = -5
Output: Alternating sum for n=10: -5`,
      hint: 'Check if `i` is odd or even inside the loop. If `i` is odd, add it to sum (`sum += i`). If `i` is even, subtract it (`sum -= i`).',
      solutionCode: `public class AlternatingSeriesSum {
    public static void main(String[] args) {
        int n = 10;
        int sum = 0;

        for (int i = 1; i <= n; i++) {
            if (i % 2 != 0) {
                sum += i;
            } else {
                sum -= i;
            }
        }

        System.out.println("Alternating sum for n=" + n + ": " + sum);
    }
}`,
      output: 'Alternating sum for n=10: -5',
      explanation: 'Odd numbers (1, 3, 5, 7, 9) contribute +25. Even numbers (2, 4, 6, 8, 10) contribute -30. Total sum = 25 - 30 = -5.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // LESSON 4.5: The Enhanced For-Each Loop (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'enhanced-for-each': [
    {
      id: 'cf45-ex-1',
      title: 'Array Sum and Average Calculator',
      problemStatement: `Write a Java program using an enhanced for-each loop to calculate the sum and integer average of an array of integers.

Input Format: An array \`int[] values = { 12, 24, 36, 48, 60 };\`
Output Format: Print "Sum: [sum], Average: [avg]".

Example:
Input: values = { 12, 24, 36, 48, 60 }
Output: Sum: 180, Average: 36`,
      hint: 'Use `for (int val : values)` to accumulate `sum += val;`. Compute average using `sum / values.length`.',
      solutionCode: `public class ArraySumAverage {
    public static void main(String[] args) {
        int[] values = { 12, 24, 36, 48, 60 };
        int sum = 0;

        for (int val : values) {
            sum += val;
        }

        int avg = sum / values.length;
        System.out.println("Sum: " + sum + ", Average: " + avg);
    }
}`,
      output: 'Sum: 180, Average: 36',
      explanation: 'The for-each loop traverses all 5 elements. The sum is 12 + 24 + 36 + 48 + 60 = 180. Integer average is 180 / 5 = 36.'
    },
    {
      id: 'cf45-ex-2',
      title: 'Find Maximum Value in Array',
      problemStatement: `Write a Java program using an enhanced for-each loop to find the highest value in an array of temperature readings.

Input Format: An array \`int[] temperatures = { 68, 72, 85, 91, 77, 84 };\`
Output Format: Print "Highest temperature: [max]".

Example:
Input: temperatures = { 68, 72, 85, 91, 77, 84 }
Output: Highest temperature: 91`,
      hint: 'Initialize `int max = temperatures[0];`. In the for-each loop, update `max` whenever `temp > max`.',
      solutionCode: `public class FindMaxTemperature {
    public static void main(String[] args) {
        int[] temperatures = { 68, 72, 85, 91, 77, 84 };
        int max = temperatures[0];

        for (int temp : temperatures) {
            if (temp > max) {
                max = temp;
            }
        }

        System.out.println("Highest temperature: " + max);
    }
}`,
      output: 'Highest temperature: 91',
      explanation: 'The for-each loop visits each temperature. When it encounters 91, max is updated from 85 to 91. Subsequent temperatures are smaller, so 91 remains maximum.'
    },
    {
      id: 'cf45-ex-3',
      title: 'Count Frequency of Target Value',
      problemStatement: `Write a Java program using an enhanced for-each loop to count how many times candidate #2 received a vote in an election.

Input Format:
- \`int[] votes = { 1, 2, 2, 3, 2, 1, 2, 4 };\`
- \`int target = 2;\`

Output Format: Print "Candidate [target] received [count] votes".

Example:
Input: votes = { 1, 2, 2, 3, 2, 1, 2, 4 }, target = 2
Output: Candidate 2 received 4 votes`,
      hint: 'Iterate over each vote using for-each. If `vote == target`, increment a counter.',
      solutionCode: `public class VoteCounter {
    public static void main(String[] args) {
        int[] votes = { 1, 2, 2, 3, 2, 1, 2, 4 };
        int target = 2;
        int count = 0;

        for (int vote : votes) {
            if (vote == target) {
                count++;
            }
        }

        System.out.println("Candidate " + target + " received " + count + " votes");
    }
}`,
      output: 'Candidate 2 received 4 votes',
      explanation: 'The value 2 appears at indices 1, 2, 4, and 6. The for-each loop inspects each element and counts 4 total occurrences.'
    },
    {
      id: 'cf45-ex-4',
      title: 'Filter Words by Length',
      problemStatement: `Write a Java program using an enhanced for-each loop to print all programming languages from an array that have a name of 4 or more characters.
Print all matching words on a single line separated by spaces.

Input Format: An array \`String[] languages = { "Java", "C", "Python", "Go", "Rust", "JavaScript" };\`
Output Format: Print the matching language names.

Example:
Output: Java Python Rust JavaScript `,
      hint: 'Iterate over `String lang : languages`. Check `if (lang.length() >= 4)` and print using `System.out.print(lang + " ")`.',
      solutionCode: `public class WordLengthFilter {
    public static void main(String[] args) {
        String[] languages = { "Java", "C", "Python", "Go", "Rust", "JavaScript" };

        for (String lang : languages) {
            if (lang.length() >= 4) {
                System.out.print(lang + " ");
            }
        }
        System.out.println();
    }
}`,
      output: 'Java Python Rust JavaScript ',
      explanation: '"Java" (4), "Python" (6), "Rust" (4), and "JavaScript" (10) satisfy length >= 4. "C" (1) and "Go" (2) are skipped.'
    },
    {
      id: 'cf45-ex-5',
      title: 'All Positive Numbers Validator',
      problemStatement: `Write a Java program using an enhanced for-each loop to check whether all financial transaction values in an array are strictly positive (> 0).
If a negative or zero number is found, stop checking immediately using \`break\`.

Input Format: An array \`int[] transactions = { 150, 80, -20, 300, 45 };\`
Output Format: Print "All positive: [true/false]".

Example:
Input: transactions = { 150, 80, -20, 300, 45 }
Output: All positive: false`,
      hint: 'Declare `boolean allPositive = true;`. Loop through `int tx : transactions`. If `tx <= 0`, set `allPositive = false; break;`.',
      solutionCode: `public class PositiveValidator {
    public static void main(String[] args) {
        int[] transactions = { 150, 80, -20, 300, 45 };
        boolean allPositive = true;

        for (int tx : transactions) {
            if (tx <= 0) {
                allPositive = false;
                break;
            }
        }

        System.out.println("All positive: " + allPositive);
    }
}`,
      output: 'All positive: false',
      explanation: 'At element -20, the condition tx <= 0 is met. allPositive is set to false and the break statement halts the loop immediately.'
    },
    {
      id: 'cf45-ex-6',
      title: 'Even and Odd Number Tally',
      problemStatement: `Write a Java program using an enhanced for-each loop to count the total number of even and odd integers in an array.

Input Format: An array \`int[] numbers = { 14, 21, 33, 42, 56, 77, 88 };\`
Output Format: Print "Evens: [evenCount], Odds: [oddCount]".

Example:
Input: numbers = { 14, 21, 33, 42, 56, 77, 88 }
Evens: 14, 42, 56, 88 (4)
Odds: 21, 33, 77 (3)
Output: Evens: 4, Odds: 3`,
      hint: 'Maintain two counters: `evens = 0;` and `odds = 0;`. In the for-each loop, test `num % 2 == 0`.',
      solutionCode: `public class EvenOddTally {
    public static void main(String[] args) {
        int[] numbers = { 14, 21, 33, 42, 56, 77, 88 };
        int evens = 0;
        int odds = 0;

        for (int num : numbers) {
            if (num % 2 == 0) {
                evens++;
            } else {
                odds++;
            }
        }

        System.out.println("Evens: " + evens + ", Odds: " + odds);
    }
}`,
      output: 'Evens: 4, Odds: 3',
      explanation: '14, 42, 56, and 88 are even (evens=4). 21, 33, and 77 are odd (odds=3).'
    },
    {
      id: 'cf45-ex-7',
      title: 'Hyphen-Separated String Joiner',
      problemStatement: `Write a Java program using an enhanced for-each loop to join an array of date components into a single formatted string separated by hyphens (without a leading or trailing hyphen).

Input Format: An array \`String[] parts = { "2026", "09", "25" };\`
Output Format: Print "Joined date: [formattedString]".

Example:
Input: parts = { "2026", "09", "25" }
Output: Joined date: 2026-09-25`,
      hint: 'Maintain an accumulator `String result = "";`. Inside the loop, if `result.isEmpty()`, assign `part`; otherwise append `"-" + part`.',
      solutionCode: `public class StringJoinerDemo {
    public static void main(String[] args) {
        String[] parts = { "2026", "09", "25" };
        String result = "";

        for (String part : parts) {
            if (result.isEmpty()) {
                result = part;
            } else {
                result += "-" + part;
            }
        }

        System.out.println("Joined date: " + result);
    }
}`,
      output: 'Joined date: 2026-09-25',
      explanation: 'On the first iteration, "2026" is set without a hyphen. Subsequent elements "09" and "25" append with leading hyphens.'
    },
    {
      id: 'cf45-ex-8',
      title: 'Threshold Score Counter',
      problemStatement: `Write a Java program using an enhanced for-each loop to count how many students scored at or above the passing threshold of 75 in an exam.

Input Format: An array \`int[] examScores = { 88, 64, 92, 75, 59, 98, 71, 83 };\`
Output Format: Print "Passing scores: [count]".

Example:
Passing scores (>= 75): 88, 92, 75, 98, 83 (5 scores)
Output: Passing scores: 5`,
      hint: 'In the loop, test `score >= 75` and increment the passing counter.',
      solutionCode: `public class ThresholdCounter {
    public static void main(String[] args) {
        int[] examScores = { 88, 64, 92, 75, 59, 98, 71, 83 };
        int count = 0;

        for (int score : examScores) {
            if (score >= 75) {
                count++;
            }
        }

        System.out.println("Passing scores: " + count);
    }
}`,
      output: 'Passing scores: 5',
      explanation: 'Scores 88, 92, 75, 98, and 83 are all >= 75, giving a total of 5 passing scores.'
    },
    {
      id: 'cf45-ex-9',
      title: 'Second Largest Element Finder',
      problemStatement: `Write a Java program using enhanced for-each loops to find the second largest distinct number in an array of integers.

Input Format: An array \`int[] nums = { 15, 42, 88, 23, 74, 88, 61 };\`
Output Format: Print "Second largest: [value]".

Example:
Input: nums = { 15, 42, 88, 23, 74, 88, 61 }
Largest: 88, Second Largest: 74
Output: Second largest: 74`,
      hint: 'First find the maximum element with a for-each loop. Then use a second for-each loop to find the largest element strictly less than that maximum.',
      solutionCode: `public class SecondLargestFinder {
    public static void main(String[] args) {
        int[] nums = { 15, 42, 88, 23, 74, 88, 61 };
        int max = nums[0];

        for (int n : nums) {
            if (n > max) {
                max = n;
            }
        }

        int secondMax = Integer.MIN_VALUE;
        for (int n : nums) {
            if (n < max && n > secondMax) {
                secondMax = n;
            }
        }

        System.out.println("Second largest: " + secondMax);
    }
}`,
      output: 'Second largest: 74',
      explanation: 'The first pass determines that 88 is the maximum. The second pass checks all numbers smaller than 88 and finds that 74 is the largest among them.'
    },
    {
      id: 'cf45-ex-10',
      title: 'Array Element Sign Tally',
      problemStatement: `Write a Java program using an enhanced for-each loop to count the number of positive values, zero values, and negative values in an array.

Input Format: An array \`int[] measurements = { -5, 0, 12, -3, 0, 8, 15, -1 };\`
Output Format: Print "Positive: [p], Zero: [z], Negative: [n]".

Example:
Input: measurements = { -5, 0, 12, -3, 0, 8, 15, -1 }
Output: Positive: 3, Zero: 2, Negative: 3`,
      hint: 'Maintain three counters. In each iteration, use if-else if-else to classify the element based on whether it is greater than, equal to, or less than 0.',
      solutionCode: `public class SignTally {
    public static void main(String[] args) {
        int[] measurements = { -5, 0, 12, -3, 0, 8, 15, -1 };
        int positive = 0;
        int zero = 0;
        int negative = 0;

        for (int val : measurements) {
            if (val > 0) {
                positive++;
            } else if (val == 0) {
                zero++;
            } else {
                negative++;
            }
        }

        System.out.println("Positive: " + positive + ", Zero: " + zero + ", Negative: " + negative);
    }
}`,
      output: 'Positive: 3, Zero: 2, Negative: 3',
      explanation: 'Positive values are 12, 8, 15 (3). Zeroes appear twice (2). Negative values are -5, -3, -1 (3).'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // LESSON 4.6: The While Loop (Pre-Condition Loop) (10 Exercises)
  // ─────────────────────────────────────────────────────────────
  'while-loop': [
    {
      id: 'cf46-ex-1',
      title: 'Integer Digits Reversal',
      problemStatement: `Write a Java program using a while loop to reverse the digits of a given positive integer.

Input Format: An integer variable \`int n = 98765;\`
Output Format: Print "Original: [n], Reversed: [reversed]".

Example:
Input: n = 98765
Output: Original: 98765, Reversed: 56789`,
      hint: 'While `temp > 0`, extract digit with `temp % 10`, shift reversed with `reversed = (reversed * 10) + digit`, and divide `temp /= 10`.',
      solutionCode: `public class ReverseInteger {
    public static void main(String[] args) {
        int n = 98765;
        int temp = n;
        int reversed = 0;

        while (temp > 0) {
            int digit = temp % 10;
            reversed = (reversed * 10) + digit;
            temp /= 10;
        }

        System.out.println("Original: " + n + ", Reversed: " + reversed);
    }
}`,
      output: 'Original: 98765, Reversed: 56789',
      explanation: 'Digits are stripped from right to left: 5, then 6, 7, 8, 9. Each digit is shifted into reversed by multiplying by 10 and adding the digit.'
    },
    {
      id: 'cf46-ex-2',
      title: 'Sum of Digits Calculator',
      problemStatement: `Write a Java program using a while loop to calculate the sum of all digits of a given positive integer.

Input Format: An integer variable \`int number = 4927;\`
Output Format: Print "Sum of digits for [number]: [sum]".

Example:
Input: number = 4927
Calculation: 4 + 9 + 2 + 7 = 22
Output: Sum of digits for 4927: 22`,
      hint: 'Use a while loop with condition `temp > 0`. Add `temp % 10` to sum and divide `temp /= 10`.',
      solutionCode: `public class SumOfDigitsCalculator {
    public static void main(String[] args) {
        int number = 4927;
        int temp = number;
        int sum = 0;

        while (temp > 0) {
            sum += temp % 10;
            temp /= 10;
        }

        System.out.println("Sum of digits for " + number + ": " + sum);
    }
}`,
      output: 'Sum of digits for 4927: 22',
      explanation: 'Extracted digits: 7 + 2 + 9 + 4 = 22. When temp reaches 0, the condition temp > 0 terminates the loop.'
    },
    {
      id: 'cf46-ex-3',
      title: 'Count Digits in an Integer',
      problemStatement: `Write a Java program using a while loop to count the total number of decimal digits in a given positive integer.

Input Format: An integer variable \`int val = 508219;\`
Output Format: Print "Number of digits in [val]: [count]".

Example:
Input: val = 508219
Output: Number of digits in 508219: 6`,
      hint: 'While `temp > 0`, increment `count++` and truncate the rightmost digit with `temp /= 10`.',
      solutionCode: `public class DigitCounter {
    public static void main(String[] args) {
        int val = 508219;
        int temp = val;
        int count = 0;

        while (temp > 0) {
            count++;
            temp /= 10;
        }

        System.out.println("Number of digits in " + val + ": " + count);
    }
}`,
      output: 'Number of digits in 508219: 6',
      explanation: '508219 is divided by 10 six consecutive times before reaching 0: 50821 -> 5082 -> 508 -> 50 -> 5 -> 0. count is 6.'
    },
    {
      id: 'cf46-ex-4',
      title: 'Greatest Common Divisor (Euclidean Algorithm)',
      problemStatement: `Write a Java program using the Euclidean algorithm with a while loop to find the Greatest Common Divisor (GCD) of two positive integers.

Input Format:
- \`int a = 54;\`
- \`int b = 24;\`

Output Format: Print "GCD of [origA] and [origB] is [gcd]".

Example:
Input: a = 54, b = 24
Output: GCD of 54 and 24 is 6`,
      hint: 'While `b != 0`, compute `int remainder = a % b;`, update `a = b;`, and set `b = remainder;`. When b becomes 0, `a` is the GCD.',
      solutionCode: `public class EuclideanGCD {
    public static void main(String[] args) {
        int origA = 54;
        int origB = 24;
        int a = origA;
        int b = origB;

        while (b != 0) {
            int remainder = a % b;
            a = b;
            b = remainder;
        }

        System.out.println("GCD of " + origA + " and " + origB + " is " + a);
    }
}`,
      output: 'GCD of 54 and 24 is 6',
      explanation: 'Step 1: 54 % 24 = 6 -> a=24, b=6. Step 2: 24 % 6 = 0 -> a=6, b=0. Loop terminates because b == 0. GCD is 6.'
    },
    {
      id: 'cf46-ex-5',
      title: 'Binary to Decimal Converter',
      problemStatement: `Write a Java program using a while loop to convert a binary number (represented as an integer composed of 0s and 1s) into its decimal equivalent.

Input Format: An integer variable \`int binary = 1101;\`
Output Format: Print "Binary [binary] in decimal: [decimal]".

Example:
Input: binary = 1101
Calculation: (1 * 2^0) + (0 * 2^1) + (1 * 2^2) + (1 * 2^3) = 1 + 0 + 4 + 8 = 13
Output: Binary 1101 in decimal: 13`,
      hint: 'Extract the rightmost bit with `temp % 10`. Multiply by a base power of 2 (`base`), add to decimal, multiply `base *= 2`, and divide `temp /= 10`.',
      solutionCode: `public class BinaryToDecimal {
    public static void main(String[] args) {
        int binary = 1101;
        int temp = binary;
        int decimal = 0;
        int base = 1;

        while (temp > 0) {
            int lastDigit = temp % 10;
            decimal += lastDigit * base;
            base *= 2;
            temp /= 10;
        }

        System.out.println("Binary " + binary + " in decimal: " + decimal);
    }
}`,
      output: 'Binary 1101 in decimal: 13',
      explanation: 'Bits extracted from right to left: 1 * 1 = 1; 0 * 2 = 0; 1 * 4 = 4; 1 * 8 = 8. Sum is 1 + 0 + 4 + 8 = 13.'
    },
    {
      id: 'cf46-ex-6',
      title: 'Collatz Conjecture Step Counter',
      problemStatement: `Write a Java program using a while loop to determine how many steps it takes for a positive integer N to reach 1 according to the Collatz rules:
- If N is even: N = N / 2
- If N is odd: N = 3 * N + 1

Input Format: An integer variable \`int n = 12;\`
Output Format: Print "Starting at [origN] took [steps] steps to reach 1".

Example:
Input: n = 12
Sequence: 12 -> 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (9 steps)
Output: Starting at 12 took 9 steps to reach 1`,
      hint: 'Loop with `while (n > 1)`. If `n % 2 == 0`, divide by 2; otherwise compute `3 * n + 1`. Increment `steps++` on each pass.',
      solutionCode: `public class CollatzStepCounter {
    public static void main(String[] args) {
        int origN = 12;
        int n = origN;
        int steps = 0;

        while (n > 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }

        System.out.println("Starting at " + origN + " took " + steps + " steps to reach 1");
    }
}`,
      output: 'Starting at 12 took 9 steps to reach 1',
      explanation: 'The sequence of values is 12 -> 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1, requiring 9 transitions.'
    },
    {
      id: 'cf46-ex-7',
      title: 'Integer Square Root Floor Estimator',
      problemStatement: `Write a Java program using a while loop to find the largest integer K such that K * K <= N (the floor of the square root) without using any math library functions.

Input Format: An integer variable \`int target = 50;\`
Output Format: Print "Integer square root floor of [target] is [k]".

Example:
Input: target = 50
Since 7 * 7 = 49 <= 50 and 8 * 8 = 64 > 50, the answer is 7.
Output: Integer square root floor of 50 is 7`,
      hint: 'Start with `k = 1`. In a while loop, test if `(k + 1) * (k + 1) <= target`. As long as it is, increment `k++`.',
      solutionCode: `public class IntegerSquareRoot {
    public static void main(String[] args) {
        int target = 50;
        int k = 1;

        while ((k + 1) * (k + 1) <= target) {
            k++;
        }

        System.out.println("Integer square root floor of " + target + " is " + k);
    }
}`,
      output: 'Integer square root floor of 50 is 7',
      explanation: 'k advances until (7+1)*(7+1) = 64 <= 50 becomes false. The highest valid integer is k=7 (49 <= 50).'
    },
    {
      id: 'cf46-ex-8',
      title: 'Palindrome Number Validator',
      problemStatement: `Write a Java program using a while loop to determine whether a given positive integer is a palindrome (reads the exact same forwards and backwards).

Input Format: An integer variable \`int n = 12321;\`
Output Format: Print "[n] is a palindrome: [true/false]".

Example:
Input: n = 12321
Reversed: 12321
Output: 12321 is a palindrome: true`,
      hint: 'Reverse the digits using a while loop. After the loop, test `if (reversed == n)`.',
      solutionCode: `public class PalindromeNumberValidator {
    public static void main(String[] args) {
        int n = 12321;
        int temp = n;
        int reversed = 0;

        while (temp > 0) {
            int digit = temp % 10;
            reversed = (reversed * 10) + digit;
            temp /= 10;
        }

        boolean isPalindrome = (reversed == n);
        System.out.println(n + " is a palindrome: " + isPalindrome);
    }
}`,
      output: '12321 is a palindrome: true',
      explanation: 'Reversing 12321 yields 12321. Since reversed equals original n, it is confirmed as a palindrome.'
    },
    {
      id: 'cf46-ex-9',
      title: 'Power of Two Verifier',
      problemStatement: `Write a Java program using a while loop to determine if a positive integer N is a power of 2.
Repeatedly divide N by 2 as long as N is even. If N eventually reduces to 1, it was a power of 2.

Input Format: An integer variable \`int n = 64;\`
Output Format: Print "[n] is power of two: [true/false]".

Example:
Input: n = 64
Output: 64 is power of two: true`,
      hint: 'While `temp > 1 && temp % 2 == 0`, divide `temp /= 2`. Then check `temp == 1`.',
      solutionCode: `public class PowerOfTwoVerifier {
    public static void main(String[] args) {
        int n = 64;
        int temp = n;

        while (temp > 1 && temp % 2 == 0) {
            temp /= 2;
        }

        boolean isPower = (temp == 1);
        System.out.println(n + " is power of two: " + isPower);
    }
}`,
      output: '64 is power of two: true',
      explanation: '64 is halved repeatedly: 32 -> 16 -> 8 -> 4 -> 2 -> 1. Since temp reaches 1 without any odd divisors, 64 is a power of 2.'
    },
    {
      id: 'cf46-ex-10',
      title: 'Digital Root Calculator',
      problemStatement: `Write a Java program using nested while loops to find the digital root of a positive integer.
The digital root is obtained by repeatedly summing the digits of a number until a single-digit value is reached.

Input Format: An integer variable \`int n = 9875;\`
Output Format: Print "Digital root of [n] is [root]".

Example:
Input: n = 9875
Round 1: 9 + 8 + 7 + 5 = 29
Round 2: 2 + 9 = 11
Round 3: 1 + 1 = 2
Output: Digital root of 9875 is 2`,
      hint: 'Use an outer while loop `while (val >= 10)`. Inside, compute the sum of digits of `val` using an inner while loop, then set `val = sum`.',
      solutionCode: `public class DigitalRootCalculator {
    public static void main(String[] args) {
        int n = 9875;
        int val = n;

        while (val >= 10) {
            int sum = 0;
            while (val > 0) {
                sum += val % 10;
                val /= 10;
            }
            val = sum;
        }

        System.out.println("Digital root of " + n + " is " + val);
    }
}`,
      output: 'Digital root of 9875 is 2',
      explanation: '9875 sums to 29 (>= 10), 29 sums to 11 (>= 10), and 11 sums to 2 (< 10). The single-digit digital root is 2.'
    }
  ]
};
