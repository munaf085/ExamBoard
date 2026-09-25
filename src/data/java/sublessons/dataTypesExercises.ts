import { ProgrammingExercise } from '../detailedLessons';

// ============================================================
// DEDICATED HANDS-ON CODING ASSIGNMENTS FOR DATA TYPES & VARIABLES
// Every problem has Input Format, Output Format, Examples,
// Hints, Complete Runnable Java Solution, and Expected Output.
// ============================================================

export const dataTypesExercises: Record<string, ProgrammingExercise[]> = {
  // ── 2.1 Variables & Scope ──
  'variables-and-scope': [
    {
      id: 'dt-var-1',
      title: 'Sum, Difference, Product & Quotient of Two Numbers',
      problemStatement: `Write a Java program to perform basic arithmetic with local variables:
1. Declare two integer variables: \`int num1 = 20;\` and \`int num2 = 4;\`.
2. Calculate and store their sum, difference, product, and quotient in separate local variables.
3. Print each calculated result with an informative message.`,
      hint: 'Declare local variables like int sum = num1 + num2; and use System.out.println() to display the values.',
      solutionCode: `public class BasicArithmetic {
    public static void main(String[] args) {
        int num1 = 20;
        int num2 = 4;

        int sum = num1 + num2;
        int difference = num1 - num2;
        int product = num1 * num2;
        int quotient = num1 / num2;

        System.out.println("First Number: " + num1);
        System.out.println("Second Number: " + num2);
        System.out.println("Sum: " + sum);
        System.out.println("Difference: " + difference);
        System.out.println("Product: " + product);
        System.out.println("Quotient: " + quotient);
    }
}`,
      output: `First Number: 20
Second Number: 4
Sum: 24
Difference: 16
Product: 80
Quotient: 5`,
      explanation: 'Variables store values in memory. In Java, you specify the type (int) and name, then perform arithmetic operations (+, -, *, /) directly with the variable identifiers.'
    },
    {
      id: 'dt-var-2',
      title: 'Swap Two Numbers Using a Temporary Variable',
      problemStatement: `Write a Java program to swap the values of two variables:
1. Declare \`int a = 15;\` and \`int b = 30;\`.
2. Print their values before swapping.
3. Use a third helper variable \`int temp;\` to exchange the values so \`a\` becomes 30 and \`b\` becomes 15.
4. Print their values after swapping.`,
      hint: 'Copy the value of a into temp first, then overwrite a with b, and finally put temp into b.',
      solutionCode: `public class SwapWithTemp {
    public static void main(String[] args) {
        int a = 15;
        int b = 30;

        System.out.println("Before Swap: a = " + a + ", b = " + b);

        // Step 1: Save a in temp
        int temp = a;
        // Step 2: Assign b to a
        a = b;
        // Step 3: Put saved original a into b
        b = temp;

        System.out.println("After Swap: a = " + a + ", b = " + b);
    }
}`,
      output: `Before Swap: a = 15, b = 30
After Swap: a = 30, b = 15`,
      explanation: 'If you directly assign a = b without saving a first, the original value of a (15) is permanently overwritten. A temporary helper variable preserves it during the exchange.'
    },
    {
      id: 'dt-var-3',
      title: 'Swap Two Numbers Without Using a Third Variable',
      problemStatement: `Write a Java program to swap two integer variables WITHOUT creating a third variable:
1. Declare \`int a = 10;\` and \`int b = 25;\`.
2. Print their values before swapping.
3. Use addition and subtraction arithmetic to swap their contents.
4. Print their values after swapping to verify \`a = 25\` and \`b = 10\`.`,
      hint: 'First set a = a + b (combined sum). Then b = a - b (gives original a). Finally a = a - b (gives original b).',
      solutionCode: `public class SwapWithoutTemp {
    public static void main(String[] args) {
        int a = 10;
        int b = 25;

        System.out.println("Before Swap: a = " + a + ", b = " + b);

        // Step 1: a holds the sum (10 + 25 = 35)
        a = a + b;
        // Step 2: b gets the original a (35 - 25 = 10)
        b = a - b;
        // Step 3: a gets the original b (35 - 10 = 25)
        a = a - b;

        System.out.println("After Swap: a = " + a + ", b = " + b);
    }
}`,
      output: `Before Swap: a = 10, b = 25
After Swap: a = 25, b = 10`,
      explanation: 'By accumulating both numbers into a single variable sum (a = a + b), you can extract either original operand using subtraction without needing extra memory.'
    },
    {
      id: 'dt-var-4',
      title: 'Calculate Area and Perimeter of a Rectangle',
      problemStatement: `Write a Java program to calculate geometry measurements using variables:
1. Declare two double variables: \`double length = 12.5;\` and \`double width = 5.0;\`.
2. Calculate the area using formula: \`length * width\`.
3. Calculate the perimeter using formula: \`2 * (length + width)\`.
4. Print the length, width, area, and perimeter.`,
      hint: 'Use the double data type to support decimal numbers for length, width, area, and perimeter.',
      solutionCode: `public class RectangleCalculator {
    public static void main(String[] args) {
        double length = 12.5;
        double width = 5.0;

        double area = length * width;
        double perimeter = 2 * (length + width);

        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
    }
}`,
      output: `Length: 12.5
Width: 5.0
Area: 62.5
Perimeter: 35.0`,
      explanation: 'Parentheses (length + width) ensure addition happens before multiplying by 2, respecting standard arithmetic precedence.'
    },
    {
      id: 'dt-var-5',
      title: 'Convert Celsius Temperature to Fahrenheit',
      problemStatement: `Write a Java program to convert temperature from Celsius to Fahrenheit:
1. Declare a variable \`double celsius = 25.0;\`.
2. Convert it to Fahrenheit using the standard formula: \`F = (C * 9/5) + 32\`.
3. Store the result in \`double fahrenheit;\`.
4. Print both the Celsius and converted Fahrenheit temperatures.`,
      hint: 'Write 9.0 / 5.0 rather than 9 / 5, because 9 / 5 in Java does integer division and truncates to 1!',
      solutionCode: `public class TemperatureConverter {
    public static void main(String[] args) {
        double celsius = 25.0;
        double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

        System.out.println("Temperature in Celsius: " + celsius + "°C");
        System.out.println("Temperature in Fahrenheit: " + fahrenheit + "°F");
    }
}`,
      output: `Temperature in Celsius: 25.0°C
Temperature in Fahrenheit: 77.0°F`,
      explanation: 'When working with double variables, using floating-point literals like 9.0 and 5.0 ensures exact decimal arithmetic without integer truncation.'
    },
    {
      id: 'dt-var-6',
      title: 'Calculate Simple Interest and Total Repayment',
      problemStatement: `Write a Java program to compute simple interest on a loan:
1. Declare \`double principal = 10000.0;\`.
2. Declare \`double rateOfInterest = 7.5;\` (annual percentage).
3. Declare \`int timeYears = 3;\`.
4. Calculate simple interest using formula: \`(principal * rate * time) / 100\`.
5. Calculate total repayment amount: \`principal + interest\`.
6. Print the breakdown.`,
      hint: 'Store each parameter in its own variable and multiply them together before dividing by 100.0.',
      solutionCode: `public class SimpleInterest {
    public static void main(String[] args) {
        double principal = 10000.0;
        double rateOfInterest = 7.5;
        int timeYears = 3;

        double interest = (principal * rateOfInterest * timeYears) / 100.0;
        double totalRepayment = principal + interest;

        System.out.println("Principal Amount: $" + principal);
        System.out.println("Interest Rate: " + rateOfInterest + "%");
        System.out.println("Time Period: " + timeYears + " years");
        System.out.println("Simple Interest: $" + interest);
        System.out.println("Total Amount to Repay: $" + totalRepayment);
    }
}`,
      output: `Principal Amount: $10000.0
Interest Rate: 7.5%
Time Period: 3 years
Simple Interest: $2250.0
Total Amount to Repay: $12250.0`,
      explanation: 'Decomposing business calculations into descriptive local variables makes the code easy to understand, verify, and maintain.'
    },
    {
      id: 'dt-var-7',
      title: 'Calculate Item Bill with 18% Tax (GST)',
      problemStatement: `Write a Java program to calculate the total price of a retail purchase:
1. Declare \`double itemPrice = 450.0;\`.
2. Declare \`double taxRate = 0.18;\` (18% sales tax).
3. Calculate the tax amount: \`itemPrice * taxRate\`.
4. Calculate the grand total bill: \`itemPrice + taxAmount\`.
5. Print the item price, tax, and final payable amount.`,
      hint: 'Multiply itemPrice by taxRate to find the tax charge, then add it to the original item price.',
      solutionCode: `public class GroceryBill {
    public static void main(String[] args) {
        double itemPrice = 450.0;
        double taxRate = 0.18; // 18% GST

        double taxAmount = itemPrice * taxRate;
        double totalBill = itemPrice + taxAmount;

        System.out.println("Item Price: Rs. " + itemPrice);
        System.out.println("Tax Amount (18%): Rs. " + taxAmount);
        System.out.println("Final Bill: Rs. " + totalBill);
    }
}`,
      output: `Item Price: Rs. 450.0
Tax Amount (18%): Rs. 81.0
Final Bill: Rs. 531.0`,
      explanation: 'Using meaningful variable names like itemPrice and taxAmount communicates business logic clearly and avoids hardcoded magic numbers.'
    },
    {
      id: 'dt-var-8',
      title: 'Average of 5 Subject Test Scores',
      problemStatement: `Write a Java program to calculate a student\'s performance across 5 subjects:
1. Declare integer variables for 5 subject marks: \`english = 78\`, \`math = 92\`, \`science = 85\`, \`history = 88\`, \`art = 90\`.
2. Calculate total marks obtained.
3. Calculate the average score by dividing total marks by \`5.0\`.
4. Display the total marks and average score.`,
      hint: 'Divide by 5.0 (double) instead of 5 (int) so that decimal fractions in the average are not lost.',
      solutionCode: `public class StudentAverage {
    public static void main(String[] args) {
        int english = 78;
        int math = 92;
        int science = 85;
        int history = 88;
        int art = 90;

        int totalMarks = english + math + science + history + art;
        double averageMarks = totalMarks / 5.0;

        System.out.println("Scores: 78, 92, 85, 88, 90");
        System.out.println("Total Marks: " + totalMarks + " out of 500");
        System.out.println("Average Score: " + averageMarks);
    }
}`,
      output: `Scores: 78, 92, 85, 88, 90
Total Marks: 433 out of 500
Average Score: 86.6`,
      explanation: 'totalMarks / 5.0 promotes the division to double precision, yielding 86.6 instead of the truncated 86.'
    },
    {
      id: 'dt-var-9',
      title: 'Variable Reassignment & Running Balance',
      problemStatement: `Write a Java program that demonstrates how a variable changes value over time:
1. Declare an initial bank balance: \`double balance = 1000.0;\`.
2. Add a salary deposit of $2500.0 by updating the balance (\`balance = balance + 2500.0;\`). Print the balance.
3. Deduct rent expense of $800.0 (\`balance = balance - 800.0;\`). Print the balance.
4. Deduct groceries expense of $150.0 (\`balance = balance - 150.0;\`). Print the final balance.`,
      hint: 'When reassigning an existing variable, do NOT write the "double" keyword again; simply write balance = balance + 2500.0;.',
      solutionCode: `public class BankAccountBalance {
    public static void main(String[] args) {
        double balance = 1000.0;
        System.out.println("Opening Balance: $" + balance);

        // Salary credited: update existing balance
        balance = balance + 2500.0;
        System.out.println("After Salary Deposit: $" + balance);

        // Rent paid: update existing balance
        balance = balance - 800.0;
        System.out.println("After Paying Rent: $" + balance);

        // Groceries paid: update existing balance
        balance = balance - 150.0;
        System.out.println("Final Account Balance: $" + balance);
    }
}`,
      output: `Opening Balance: $1000.0
After Salary Deposit: $3500.0
After Paying Rent: $2700.0
Final Account Balance: $2550.0`,
      explanation: 'Variables are mutable containers. Once declared, you can update their stored value as many times as needed using the assignment operator (=) without repeating the type.'
    },
    {
      id: 'dt-var-10',
      title: 'Block Scope & Temporary Variable Isolation',
      problemStatement: `Write a Java program that demonstrates block scope using curly braces { }:
1. Declare an outer variable \`int accountBalance = 500;\`.
2. Create an inner block with \`{\` containing a temporary variable \`int giftBonus = 100;\`.
3. Inside the inner block, add the bonus to \`accountBalance\` and print a confirmation message.
4. Close the block with \`}\`.
5. In the outer method scope, print \`accountBalance\`. Confirm that the balance updated, while \`giftBonus\` is out of scope and cannot be accessed.`,
      hint: 'Variables declared inside { } only exist between { and }. The outer code can see accountBalance, but cannot see giftBonus.',
      solutionCode: `public class BlockScopeIsolation {
    public static void main(String[] args) {
        // Outer variable: lives throughout main()
        int accountBalance = 500;
        System.out.println("Starting Balance: $" + accountBalance);

        // Inner block: creates an isolated temporary scope
        {
            int giftBonus = 100;
            System.out.println("[Inside Block] Adding Bonus: $" + giftBonus);
            accountBalance = accountBalance + giftBonus;
        }
        // giftBonus is destroyed here! Trying to use giftBonus here would cause a compile error.

        System.out.println("Updated Balance outside block: $" + accountBalance);
    }
}`,
      output: `Starting Balance: $500
[Inside Block] Adding Bonus: $100
Updated Balance outside block: $600`,
      explanation: 'A variable declared inside curly braces { } is scoped exclusively to that block. When execution reaches the closing brace }, that variable is popped off the stack and destroyed, keeping temporary variables isolated.'
    }
  ],

  // ── 2.2 Primitive Types Deep Dive ──
  'primitive-types-deep-dive': [
    {
      id: 'dt-prim-1',
      title: '1. Primitive Memory Boundaries & Min/Max Values',
      problemStatement: `Write a program that inspects and displays the byte size, bit width, and minimum and maximum values of the 4 integral types in Java: \`byte\`, \`short\`, \`int\`, and \`long\`.

Input Format: None.
Output Format:
byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]

Example:
Output:
byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]`,
      hint: 'Use the wrapper class constants Byte.SIZE, Byte.MIN_VALUE, Byte.MAX_VALUE, etc.',
      solutionCode: `public class PrimitiveLimits {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.SIZE + " bits, [" + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE + "]");
        System.out.println("short: " + Short.SIZE + " bits, [" + Short.MIN_VALUE + " to " + Short.MAX_VALUE + "]");
        System.out.println("int: " + Integer.SIZE + " bits, [" + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE + "]");
        System.out.println("long: " + Long.SIZE + " bits, [" + Long.MIN_VALUE + " to " + Long.MAX_VALUE + "]");
    }
}`,
      output: `byte: 8 bits, [-128 to 127]
short: 16 bits, [-32768 to 32767]
int: 32 bits, [-2147483648 to 2147483647]
long: 64 bits, [-9223372036854775808 to 9223372036854775807]`,
      explanation: 'Java primitives have fixed bit widths regardless of underlying hardware architecture, preserving the WORA guarantee across 32-bit and 64-bit systems.'
    },
    {
      id: 'dt-prim-2',
      title: '2. Char as Numeric Code Point & Offset Calculation',
      problemStatement: `In Java, \`char\` is an unsigned 16-bit Unicode value.
Write a program that takes a character \`char ch = 'A'\`, prints its numeric ASCII/Unicode code point value, and generates the next 5 alphabet characters using char arithmetic.

Input Format: \`char ch = 'A'\`
Output Format:
Initial Char: A, ASCII Code: 65
Next 5 Characters: B C D E F

Example:
Input: ch = 'M'
Output:
Initial Char: M, ASCII Code: 77
Next 5 Characters: N O P Q R`,
      hint: 'Cast char to int `(int) ch` to get code point. Use `(char)(ch + i)` in a loop to generate sequential characters.',
      solutionCode: `public class CharArithmetic {
    public static void main(String[] args) {
        char ch = 'A';
        int asciiValue = (int) ch;

        System.out.println("Initial Char: " + ch + ", ASCII Code: " + asciiValue);
        System.out.print("Next 5 Characters: ");

        for (int i = 1; i <= 5; i++) {
            char nextChar = (char) (ch + i);
            System.out.print(nextChar + (i < 5 ? " " : "\\n"));
        }
    }
}`,
      output: `Initial Char: A, ASCII Code: 65
Next 5 Characters: B C D E F`,
      explanation: 'Java chars can be manipulated mathematically because they represent UTF-16 code points from 0 to 65,535 (\'\\u0000\' to \'\\uffff\').'
    }
  ],

  // ── 2.3 Type Casting & Overflow ──
  'type-casting-and-overflow': [
    {
      id: 'dt-cast-1',
      title: '1. Widening vs Narrowing Casting with Data Loss',
      problemStatement: `Write a program that demonstrates both Widening (automatic) casting and Narrowing (explicit) casting.
1. Widen an \`int\` (100) to a \`double\` (no loss).
2. Narrow a \`double\` (99.99) to an \`int\` (truncation of decimal part).
3. Narrow an \`int\` (300) to a \`byte\` (overflow truncation).

Input Format: None.
Output Format:
Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44

Example:
Output:
Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44`,
      hint: 'Widening happens automatically: `double d = i;`. Narrowing requires explicit cast syntax: `int i2 = (int) d;` and `byte b = (byte) 300;`.',
      solutionCode: `public class CastingDemo {
    public static void main(String[] args) {
        int originalInt = 100;
        double widened = originalInt; // automatic widening

        double originalDouble = 99.99;
        int narrowed = (int) originalDouble; // explicit truncation

        int largeInt = 300;
        byte overflowByte = (byte) largeInt; // 300 - 256 = 44

        System.out.println("Widening (int to double): " + originalInt + " -> " + widened);
        System.out.println("Narrowing (double to int): " + originalDouble + " -> " + narrowed);
        System.out.println("Narrowing with Overflow (int " + largeInt + " to byte): " + overflowByte);
    }
}`,
      output: `Widening (int to double): 100 -> 100.0
Narrowing (double to int): 99.99 -> 99
Narrowing with Overflow (int 300 to byte): 44`,
      explanation: 'When casting a larger type to a smaller type (like int to byte), Java silently discards the high-order bits. 300 in binary is 00000001 00101100. Discarding the upper bits leaves 00101100, which is 44.'
    },
    {
      id: 'dt-cast-2',
      title: '2. Integer Overflow Detection',
      problemStatement: `When adding two large integers, standard Java addition can quietly wrap around into negative numbers.
Write a program that demonstrates normal overflow with \`Integer.MAX_VALUE + 1\`, and then uses Java 8\'s \`Math.addExact()\` to safely detect and handle the \`ArithmeticException\`.

Input Format: None.
Output Format:
Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!

Example:
Output:
Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!`,
      hint: 'Perform `int overflow = Integer.MAX_VALUE + 1;` then inside a try-catch execute `Math.addExact(Integer.MAX_VALUE, 1);`.',
      solutionCode: `public class OverflowDetector {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        int wrapped = max + 1;
        System.out.println("Standard Addition (Overflown): " + wrapped);

        try {
            int safeSum = Math.addExact(max, 1);
            System.out.println("Safe Sum: " + safeSum);
        } catch (ArithmeticException e) {
            System.out.println("Math.addExact: Caught ArithmeticException - integer overflow!");
        }
    }
}`,
      output: `Standard Addition (Overflown): -2147483648
Math.addExact: Caught ArithmeticException - integer overflow!`,
      explanation: 'By default, Java integer arithmetic uses two\'s complement wrap-around on overflow. To protect mission-critical business logic (like banking balances), Math.addExact() throws an ArithmeticException upon exceeding boundaries.'
    }
  ],

  // ── 2.4 Wrapper Classes ──
  'wrapper-classes': [
    {
      id: 'dt-wrap-1',
      title: '1. Parsing String Inputs to Wrapper Types & Radix Conversion',
      problemStatement: `Write a program that uses Wrapper classes to parse various numerical strings into their typed equivalents:
1. Parse decimal string "450" into an \`Integer\`
2. Parse binary string "101101" into an \`Integer\` with base 2
3. Parse hex string "1A3F" into an \`Integer\` with base 16
4. Parse float string "98.6" into a \`Double\`

Input Format: None.
Output Format:
Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6

Example:
Output:
Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6`,
      hint: 'Use `Integer.parseInt(str)` and `Integer.parseInt(str, radix)`.',
      solutionCode: `public class WrapperParsing {
    public static void main(String[] args) {
        int dec = Integer.parseInt("450");
        int fromBinary = Integer.parseInt("101101", 2);
        int fromHex = Integer.parseInt("1A3F", 16);
        double valDouble = Double.parseDouble("98.6");

        System.out.println("Decimal: " + dec);
        System.out.println("Binary 101101 to Dec: " + fromBinary);
        System.out.println("Hex 1A3F to Dec: " + fromHex);
        System.out.println("Parsed Double: " + valDouble);
    }
}`,
      output: `Decimal: 450
Binary 101101 to Dec: 45
Hex 1A3F to Dec: 6719
Parsed Double: 98.6`,
      explanation: 'Wrapper classes provide utility parsing methods like `Integer.parseInt(str, radix)` that convert textual representations in any base into standard primitive integers.'
    }
  ],

  // ── 2.5 Autoboxing & Unboxing ──
  'autoboxing-and-unboxing': [
    {
      id: 'dt-auto-1',
      title: '1. Autoboxing in Collections & NullPointerException Trap',
      problemStatement: `Write a Java program that demonstrates:
1. Autoboxing: Automatically converting primitive \`int\` values when adding to an \`ArrayList<Integer>\`.
2. Unboxing: Automatically extracting primitive values from the collection in an enhanced for-loop.
3. Unboxing trap: Show how unboxing a \`null\` \`Integer\` wrapper triggers a \`NullPointerException\` and catch it safely.

Input Format: None.
Output Format:
Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null

Example:
Output:
Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null`,
      hint: 'Create `ArrayList<Integer> list = new ArrayList<>();`. When calling `int val = nullRef;`, the compiler injects `nullRef.intValue()`, causing NPE.',
      solutionCode: `import java.util.ArrayList;

public class AutoboxingDemo {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        // Autoboxing: int primitive -> Integer object
        list.add(10);
        list.add(20);
        list.add(30);

        System.out.println("Autoboxed Collection: " + list);

        // Unboxing: Integer object -> int primitive
        int sum = 0;
        for (int num : list) {
            sum += num;
        }
        System.out.println("Unboxed Sum: " + sum);

        // The classic Autoboxing / Unboxing Trap
        Integer nullWrapper = null;
        try {
            int primitive = nullWrapper; // Compiler calls nullWrapper.intValue()!
            System.out.println("Primitive: " + primitive);
        } catch (NullPointerException npe) {
            System.out.println("Caught Expected Exception: " + npe.getClass().getName() + " during unboxing of null");
        }
    }
}`,
      output: `Autoboxed Collection: [10, 20, 30]
Unboxed Sum: 60
Caught Expected Exception: java.lang.NullPointerException during unboxing of null`,
      explanation: 'Autoboxing is syntactic sugar inserted by javac (`Integer.valueOf(x)` and `obj.intValue()`). When an unboxing operation runs on a reference holding null, calling `.intValue()` results in a NullPointerException.'
    }
  ],

  // ── 2.6 The Integer Cache Trap ──
  'integer-cache-trap': [
    {
      id: 'dt-cache-1',
      title: '1. Integer Cache Verification (-128 to 127 vs 128+)',
      problemStatement: `Java maintains an internal flyweight cache for \`Integer\` objects with values from -128 to 127.
Write a Java program that creates two pairs of autoboxed Integers:
Pair 1: a = 100, b = 100
Pair 2: c = 200, d = 200
Compare them using reference equality (\`==\`) and content equality (\`.equals()\`) to prove the cache behavior.

Input Format: None.
Output Format:
a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true

Example:
Output:
a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true`,
      hint: 'Autoboxing invokes `Integer.valueOf()`. For values within [-128, 127], it returns a pre-cached object reference, so `==` is true. For 200, it allocates new heap objects, so `==` is false.',
      solutionCode: `public class IntegerCacheTest {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;

        Integer c = 200;
        Integer d = 200;

        System.out.println("a == b (100 == 100): " + (a == b));
        System.out.println("a.equals(b): " + a.equals(b));

        System.out.println("c == d (200 == 200): " + (c == d));
        System.out.println("c.equals(d): " + c.equals(d));
    }
}`,
      output: `a == b (100 == 100): true
a.equals(b): true
c == d (200 == 200): false
c.equals(d): true`,
      explanation: 'JLS §5.1.7 mandates that Integer.valueOf() caches objects from -128 to 127. Outside this range, new heap instances are allocated. Therefore, reference equality (==) produces true only within the cached window; .equals() must always be used for object content equality.'
    }
  ],

  // ── 2.7 Floating Point Imprecision & BigDecimal ──
  'floating-point-bigdecimal': [
    {
      id: 'dt-bigdec-1',
      title: '1. Binary Floating-Point Drift vs Exact BigDecimal Financials',
      problemStatement: `Demonstrate why primitive \`double\` must NEVER be used for currency calculations.
1. Subtract 0.90 from 1.00 using standard primitive \`double\`, and display the binary rounding drift.
2. Perform the exact same subtraction using \`BigDecimal\` initialized with string literals to achieve exact financial accuracy.

Input Format: None.
Output Format:
Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10

Example:
Output:
Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10`,
      hint: 'Use `new BigDecimal("1.00").subtract(new BigDecimal("0.90"))`. Always pass String constructors, not double constructors, to BigDecimal!',
      solutionCode: `import java.math.BigDecimal;

public class FinancialPrecision {
    public static void main(String[] args) {
        // Floating point inaccuracy
        double d1 = 1.00;
        double d2 = 0.90;
        double doubleResult = d1 - d2;
        System.out.println("Primitive double: 1.00 - 0.90 = " + doubleResult);

        // Exact decimal arithmetic with BigDecimal
        BigDecimal b1 = new BigDecimal("1.00");
        BigDecimal b2 = new BigDecimal("0.90");
        BigDecimal bdResult = b1.subtract(b2);
        System.out.println("BigDecimal exact: 1.00 - 0.90 = " + bdResult);
    }
}`,
      output: `Primitive double: 1.00 - 0.90 = 0.09999999999999998
BigDecimal exact: 1.00 - 0.90 = 0.10`,
      explanation: 'IEEE 754 floating-point representations cannot represent decimal fractions like 0.1 or 0.9 exactly in base-2 binary, resulting in precision leakage. BigDecimal performs arbitrary-precision base-10 arithmetic, making it mandatory for financial calculations.'
    }
  ]
};
