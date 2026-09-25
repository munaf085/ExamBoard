import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  BookOpen, Code, AlertTriangle, Target, RefreshCw,
  CheckCircle, ChevronDown, ChevronRight, ArrowLeft,
  Lightbulb, List, Star, Coffee
} from 'lucide-react';
import { JAVA_MODULES } from '../../data/java/curriculum';
import { getJavaProgress, markLessonComplete } from '../../utils/javaStorage';

// ─────────────────────────────────────────────────────────────
// COMPLETE JAVA BASICS LESSON CONTENT
// ─────────────────────────────────────────────────────────────
const LESSON_CONTENT: Record<string, {
  intro: string;
  keyConcepts: { term: string; definition: string; example?: string }[];
  codeExamples: { title: string; code: string; output?: string; note?: string }[];
  commonMistakes: string[];
  interviewTips: string[];
  interviewQuestions: { q: string; a: string }[];
  revisionPoints: string[];
}> = {

  // ── MODULE: Java Fundamentals ──────────────────────────────
  'java-fundamentals': {
    intro: 'Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It follows the "Write Once, Run Anywhere" (WORA) principle — compiled Java code runs on all platforms that support Java without needing to be recompiled.',
    keyConcepts: [
      { term: 'JDK (Java Development Kit)', definition: 'The full development toolkit. Contains the Java compiler (javac), the JRE, debugger, and development tools. You need this to WRITE and COMPILE Java programs.', example: 'Think of JDK as a carpenter\'s full toolbox' },
      { term: 'JRE (Java Runtime Environment)', definition: 'Contains the JVM + standard class libraries. You need this to RUN Java programs. It does NOT include the compiler.', example: 'Think of JRE as just the workshop where finished programs run' },
      { term: 'JVM (Java Virtual Machine)', definition: 'An abstract machine that executes Java bytecode. It provides memory management, garbage collection, and security. Each OS has its own JVM implementation — this is what makes Java platform-independent.', example: 'Think of JVM as a universal player that plays the same "bytecode disc" on any machine' },
      { term: 'Bytecode', definition: 'The intermediate, platform-neutral code produced by the Java compiler (javac). Stored in .class files. The JVM reads and executes bytecode.', example: '.java → (javac) → .class (bytecode) → (JVM) → runs on any OS' },
      { term: 'Compilation Process', definition: 'Step 1: Write source code in .java file. Step 2: javac compiles it to .class (bytecode). Step 3: JVM interprets/JIT-compiles bytecode to native machine code at runtime.' },
      { term: 'main() Method', definition: 'The entry point of every Java application. Signature must be exactly: public static void main(String[] args). Without this exact signature, the JVM cannot start your program.' },
      { term: 'Package', definition: 'A namespace that organizes related classes. Like folders for your .java files. Example: java.util, java.io, com.company.project' },
      { term: 'Class Naming Convention', definition: 'PascalCase: Every word starts with uppercase. E.g., HelloWorld, BankAccount, StudentRecord. The file name MUST match the public class name.' },
    ],
    codeExamples: [
      {
        title: 'Your First Java Program',
        code: `public class HelloWorld {
    // main method - entry point of the program
    public static void main(String[] args) {
        System.out.println("Hello, World!");  // prints with newline
        System.out.print("No newline here");  // prints without newline
        System.out.println();                 // just a newline
    }
}`,
        output: `Hello, World!
No newline here`,
        note: 'File must be saved as HelloWorld.java. Class name must match file name.'
      },
      {
        title: 'Understanding the Compilation Flow',
        code: `// Step 1: Write this in HelloWorld.java
// Step 2: Open terminal and run: javac HelloWorld.java
// Step 3: This creates HelloWorld.class (bytecode)
// Step 4: Run: java HelloWorld (note: no .class extension)

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Platform independent!");
        System.out.println("Same .class runs on Windows, Mac, Linux");
    }
}`,
        output: `Platform independent!
Same .class runs on Windows, Mac, Linux`
      },
      {
        title: 'Comments in Java',
        code: `public class Comments {
    public static void main(String[] args) {
        // Single-line comment

        /* Multi-line comment
           spans multiple lines */

        /**
         * Javadoc comment - used to generate documentation
         * @author YourName
         */

        System.out.println("Comments do not affect output");
    }
}`,
        output: 'Comments do not affect output'
      }
    ],
    commonMistakes: [
      'Wrong main() signature — it MUST be "public static void main(String[] args)". Using "Public" (capital P) or "Void" causes errors.',
      'File name does not match class name — if your class is "HelloWorld", your file MUST be "HelloWorld.java"',
      'Forgetting semicolons — every statement in Java ends with a semicolon (;)',
      'Confusing JDK, JRE, JVM — interviewers will ask. JDK ⊃ JRE ⊃ JVM',
      'Running "java HelloWorld.class" — it should be "java HelloWorld" (no .class extension)',
    ],
    interviewTips: [
      '"Why is Java platform independent?" → Because Java compiles to bytecode, not machine code. The JVM (installed on each OS) executes bytecode. So the same .class file runs everywhere.',
      '"What is the difference between JDK, JRE, and JVM?" → JDK = JRE + Compiler. JRE = JVM + Libraries. JVM = executes bytecode.',
      '"Is Java fully object-oriented?" → No. Java has primitive types (int, char, boolean etc.) which are not objects. Fully OO languages like Smalltalk treat everything as objects.',
    ],
    interviewQuestions: [
      { q: 'Why is Java called platform independent?', a: 'Java source code is compiled into bytecode (by javac), not native machine code. This bytecode is stored in .class files. The JVM, installed on each operating system, reads and executes this bytecode. Since different JVMs handle the platform-specific execution, the same .class file runs on any OS — hence "Write Once, Run Anywhere".' },
      { q: 'What is the difference between JDK, JRE, and JVM?', a: 'JVM (Java Virtual Machine) is the core engine that executes bytecode. JRE (Java Runtime Environment) = JVM + Java standard class libraries — needed to RUN programs. JDK (Java Development Kit) = JRE + javac compiler + developer tools — needed to WRITE and COMPILE programs.' },
      { q: 'What happens if the main() method signature is wrong?', a: 'The JVM will throw a "Main method not found" error at runtime. The exact signature required is: public static void main(String[] args). It must be public (accessible by JVM), static (called without creating an object), void (no return value), and accept a String array for command-line arguments.' },
    ],
    revisionPoints: [
      'JDK ⊃ JRE ⊃ JVM (each contains the previous)',
      'Java compiles to platform-neutral bytecode, not machine code',
      '.java → javac → .class (bytecode) → JVM executes',
      'main() signature: public static void main(String[] args)',
      'Class name = File name (case-sensitive)',
      'Java is NOT fully object-oriented (has primitives)',
      'JVM handles memory management and garbage collection',
    ]
  },

  // ── MODULE: Data Types ─────────────────────────────────────
  'java-data-types': {
    intro: 'Java has two categories of data types: primitive types (8 types built into the language) and reference types (objects, arrays, strings). Understanding these is fundamental because they behave very differently in memory and when passed to methods.',
    keyConcepts: [
      { term: 'byte', definition: '8-bit signed integer. Range: -128 to 127. Default: 0. Use when memory matters and values are small.', example: 'byte age = 25;' },
      { term: 'short', definition: '16-bit signed integer. Range: -32,768 to 32,767. Default: 0. Rarely used.', example: 'short temperature = -200;' },
      { term: 'int', definition: '32-bit signed integer. Range: -2,147,483,648 to 2,147,483,647. Default: 0. Most common integer type.', example: 'int salary = 50000;' },
      { term: 'long', definition: '64-bit signed integer. Range: very large. Default: 0L. Use \'L\' suffix. Use for large numbers like timestamps.', example: 'long population = 7_900_000_000L;' },
      { term: 'float', definition: '32-bit floating point. Default: 0.0f. Use \'f\' suffix. Imprecise — do NOT use for money.', example: 'float pi = 3.14f;' },
      { term: 'double', definition: '64-bit floating point. Default: 0.0d. More precise than float. Default for decimals.', example: 'double price = 99.99;' },
      { term: 'char', definition: '16-bit Unicode character. Range: 0 to 65,535. Uses single quotes. Can store any Unicode character.', example: "char grade = 'A'; char symbol = '\\u0041'; // also 'A'" },
      { term: 'boolean', definition: 'Represents true or false only. Default: false. Size not precisely defined.', example: 'boolean isActive = true;' },
      { term: 'Wrapper Classes', definition: 'Object versions of primitives. int→Integer, double→Double, char→Character, boolean→Boolean. Required for Collections (List, Map etc.) since they work with Objects not primitives.' },
      { term: 'Autoboxing', definition: 'Automatic conversion from primitive to wrapper class by Java compiler.', example: 'Integer i = 5; // int 5 auto-boxed to Integer' },
      { term: 'Unboxing', definition: 'Automatic conversion from wrapper class back to primitive.', example: 'int x = i; // Integer i auto-unboxed to int' },
      { term: 'Type Casting (Widening)', definition: 'Converting smaller type to larger — happens automatically. byte→short→int→long→float→double', example: 'int x = 100; long y = x; // automatic widening' },
      { term: 'Type Casting (Narrowing)', definition: 'Converting larger type to smaller — must be done explicitly. May lose data.', example: 'double d = 9.7; int i = (int) d; // i = 9, decimal lost' },
    ],
    codeExamples: [
      {
        title: 'All 8 Primitive Types',
        code: `public class PrimitiveTypes {
    public static void main(String[] args) {
        byte b = 127;           // max byte value
        short s = 32000;
        int i = 2_000_000;      // underscores for readability (Java 7+)
        long l = 9_000_000_000L; // note the L suffix
        float f = 3.14f;         // note the f suffix
        double d = 3.14159265;
        char c = 'A';
        boolean flag = true;

        System.out.println("byte: " + b);
        System.out.println("int: " + i);
        System.out.println("char: " + c + " = " + (int)c); // char to int
        System.out.println("boolean: " + flag);
    }
}`,
        output: `byte: 127
int: 2000000
char: A = 65
boolean: true`
      },
      {
        title: 'Default Values (instance fields)',
        code: `public class DefaultValues {
    // Instance variables get default values
    static int intVal;        // 0
    static double doubleVal;  // 0.0
    static boolean boolVal;   // false
    static char charVal;      // '\u0000' (null char)
    static String strVal;     // null

    public static void main(String[] args) {
        System.out.println("int default: " + intVal);
        System.out.println("double default: " + doubleVal);
        System.out.println("boolean default: " + boolVal);
        System.out.println("String default: " + strVal);
        // Note: Local variables DO NOT get defaults — must initialize
    }
}`,
        output: `int default: 0
double default: 0.0
boolean default: false
String default: null`
      },
      {
        title: 'Type Casting & Overflow',
        code: `public class CastingDemo {
    public static void main(String[] args) {
        // Widening - automatic
        int i = 100;
        long l = i;     // OK, no cast needed
        double d = l;   // OK, no cast needed
        System.out.println("widened double: " + d);

        // Narrowing - explicit cast required, data may be lost
        double pi = 3.14159;
        int truncated = (int) pi;  // loses decimal part
        System.out.println("truncated: " + truncated);

        // Overflow example
        byte maxByte = 127;
        byte overflow = (byte)(maxByte + 1);  // wraps around
        System.out.println("byte overflow: " + overflow);

        // Autoboxing
        Integer boxed = 42;   // int -> Integer
        int unboxed = boxed;  // Integer -> int
        System.out.println("boxed: " + boxed.getClass().getSimpleName());
    }
}`,
        output: `widened double: 100.0
truncated: 3
byte overflow: -128
boxed: Integer`
      },
      {
        title: 'Integer Caching Trap!',
        code: `public class IntegerCacheTrap {
    public static void main(String[] args) {
        // Java caches Integer objects for -128 to 127
        Integer a = 127;
        Integer b = 127;
        System.out.println(a == b);     // TRUE (same cached object)

        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);     // FALSE (different objects)
        System.out.println(c.equals(d)); // TRUE (same value)
    }
}`,
        output: `true
false
true`,
        note: 'This is a classic interview trap! Always use .equals() to compare Integer objects.'
      }
    ],
    commonMistakes: [
      'Using == to compare Integer objects — use .equals() for wrapper classes',
      'Forgetting the \'L\' suffix for long literals: long l = 9999999999; → ERROR. Must be: 9999999999L',
      'Forgetting the \'f\' suffix for float: float f = 3.14; → ERROR (3.14 is a double). Must be: 3.14f',
      'Integer overflow — 127 + 1 as byte wraps to -128. Use larger type if needed.',
      'NullPointerException when unboxing null: Integer i = null; int x = i; → NPE at runtime',
      'Using float for money — floating point is imprecise. Use BigDecimal for financial calculations.',
    ],
    interviewTips: [
      '"What is the default value of int?" → 0 (for instance/class fields). Local variables have no default — must be initialized before use.',
      '"What is autoboxing?" → Automatic conversion between primitive (int) and wrapper class (Integer). Introduced in Java 5.',
      '"What is the Integer cache?" → Java caches Integer objects for values -128 to 127. So Integer a=127; Integer b=127; a==b is true. But Integer a=128; Integer b=128; a==b is false.',
    ],
    interviewQuestions: [
      { q: 'What are the 8 primitive types in Java and their sizes?', a: 'byte(8-bit), short(16-bit), int(32-bit), long(64-bit), float(32-bit), double(64-bit), char(16-bit), boolean(size not precisely defined). Mnemonics: "by short int long float double char bool"' },
      { q: 'What is the difference between float and double?', a: 'float is 32-bit with about 7 decimal digits of precision. double is 64-bit with about 15-16 digits of precision. double is the default for decimal literals — float requires an \'f\' suffix. Never use float or double for money/financial calculations; use BigDecimal instead.' },
      { q: 'When would you use a wrapper class instead of a primitive?', a: 'Wrapper classes are required when: (1) working with Collections (List<Integer>, not List<int>), (2) when you need null as a possible value, (3) when using generic types, (4) when calling methods on the value like Integer.parseInt(), Integer.MAX_VALUE.' },
    ],
    revisionPoints: [
      '8 primitives: byte, short, int, long, float, double, char, boolean',
      'Default values: int=0, double=0.0, boolean=false, char=null char, Object refs=null',
      'Local variables MUST be initialized — no defaults',
      'Widening (smaller→larger) is automatic. Narrowing (larger→smaller) requires explicit cast.',
      'Autoboxing: primitive→Wrapper (automatic). Unboxing: Wrapper→primitive (automatic)',
      'Integer cache: -128 to 127. Use .equals() not == for Integer comparison',
      'Use BigDecimal for financial/monetary calculations, not float or double',
    ]
  },

  // ── MODULE: Operators ──────────────────────────────────────
  'java-operators': {
    intro: 'Operators are special symbols that perform operations on variables and values. Java has a rich set of operators, and understanding operator precedence and short-circuit evaluation is critical for both writing correct code and answering interview questions.',
    keyConcepts: [
      { term: 'Arithmetic Operators', definition: '+ (add), - (subtract), * (multiply), / (divide), % (modulo/remainder)', example: '10 / 3 = 3 (integer division), 10 % 3 = 1 (remainder)' },
      { term: 'Relational/Comparison Operators', definition: '== (equal), != (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal). Return boolean.', example: '5 > 3 → true, 5 == 5 → true' },
      { term: 'Logical Operators', definition: '&& (AND), || (OR), ! (NOT). Used with booleans. Short-circuit: && stops if first is false, || stops if first is true.', example: 'true && false → false, true || false → true' },
      { term: 'Bitwise Operators', definition: '& (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift), >>> (unsigned right shift). Operate on bits.', example: '5 & 3 = 1, 5 | 3 = 7, 5 ^ 3 = 6' },
      { term: 'Assignment Operators', definition: '= (assign), += (add and assign), -= (subtract and assign), *= (multiply and assign), /= (divide and assign), %= (modulo and assign)', example: 'x += 5 is same as x = x + 5' },
      { term: 'Increment/Decrement', definition: '++ (increment by 1), -- (decrement by 1). Pre: ++x (increment then use). Post: x++ (use then increment).', example: 'int x=5; System.out.println(x++) → 5 (prints then increments)' },
      { term: 'Ternary Operator', definition: 'Shorthand for if-else. Format: condition ? valueIfTrue : valueIfFalse', example: 'int max = (a > b) ? a : b;' },
      { term: 'instanceof Operator', definition: 'Tests if an object is an instance of a class/interface. Returns boolean.', example: '"Hello" instanceof String → true' },
      { term: 'Short-Circuit Evaluation', definition: '&& stops evaluating if left side is false (result is false regardless). || stops if left side is true (result is true regardless). Used for null safety.' },
    ],
    codeExamples: [
      {
        title: 'Pre vs Post Increment (Classic Trap)',
        code: `public class IncrementTrap {
    public static void main(String[] args) {
        int a = 5;
        System.out.println(a++); // prints 5, THEN increments a to 6
        System.out.println(a);   // now a is 6
        System.out.println(++a); // increments a to 7, THEN prints 7
        System.out.println(a);   // a is still 7

        // In expressions
        int x = 5;
        int y = x++ + ++x;
        // x++ uses 5, x becomes 6, ++x makes x=7 then uses 7
        // y = 5 + 7 = 12
        System.out.println("y = " + y + ", x = " + x);
    }
}`,
        output: `5
6
7
7
y = 12, x = 7`
      },
      {
        title: 'Short-Circuit Evaluation',
        code: `public class ShortCircuit {
    static boolean methodA() {
        System.out.println("methodA called");
        return false;
    }
    static boolean methodB() {
        System.out.println("methodB called");
        return true;
    }
    public static void main(String[] args) {
        // && short-circuits: methodA returns false, methodB NOT called
        if (methodA() && methodB()) {
            System.out.println("both true");
        }

        System.out.println("---");

        // || short-circuits: methodB returns true, methodA NOT called
        if (methodB() || methodA()) {
            System.out.println("at least one true");
        }
    }
}`,
        output: `methodA called
---
methodB called
at least one true`
      },
      {
        title: 'Integer Division vs Float Division',
        code: `public class DivisionTrap {
    public static void main(String[] args) {
        System.out.println(10 / 3);     // 3 (integer division, truncates)
        System.out.println(10 % 3);     // 1 (remainder/modulo)
        System.out.println(10.0 / 3);   // 3.3333... (float division)
        System.out.println(10 / 3.0);   // 3.3333... (one double = double result)
        System.out.println((double)10 / 3); // 3.3333... (explicit cast)

        // String concatenation with + (tricky!)
        System.out.println("Result: " + 1 + 2);  // Result: 12 (string concat)
        System.out.println("Result: " + (1 + 2)); // Result: 3 (arithmetic first)
        System.out.println(1 + 2 + " apples");    // 3 apples (left to right)
    }
}`,
        output: `3
1
3.3333333333333335
3.3333333333333335
3.3333333333333335
Result: 12
Result: 3
3 apples`
      }
    ],
    commonMistakes: [
      'Using = instead of == for comparison in if conditions: if (x = 5) won\'t compile (bool expected)',
      'Forgetting integer division truncates: 7/2 = 3, not 3.5',
      'Pre vs post increment in complex expressions — a common interview trap',
      'String + number concatenation order: "a" + 1 + 2 = "a12" but 1 + 2 + "a" = "3a"',
      'Using & and | instead of && and || — bitwise operators do NOT short-circuit',
    ],
    interviewTips: [
      'What is the difference between & and &&? — & is bitwise AND (always evaluates both). && is logical AND with short-circuit (stops if left is false).',
      'What does x++ vs ++x return? — x++ returns current value then increments. ++x increments first then returns new value.',
    ],
    interviewQuestions: [
      { q: 'What is short-circuit evaluation in Java?', a: 'With && (logical AND), if the left operand is false, Java skips evaluating the right operand entirely (because the result will be false regardless). With || (logical OR), if the left operand is true, Java skips the right. This is useful for null-safety: if (obj != null && obj.getValue() > 0) — safely avoids NPE.' },
      { q: 'What is the output of: System.out.println(1 + 2 + "Java" + 3 + 4)?', a: '3Java34. Java evaluates left to right. 1+2=3 (numeric), then 3+"Java"="3Java" (string concat), then "3Java"+3="3Java3", then "3Java34".' },
    ],
    revisionPoints: [
      '/ on two ints does integer division (truncates decimal)',
      '% gives remainder: 10 % 3 = 1',
      'x++ returns current value first; ++x increments first',
      '&& and || short-circuit; & and | do not',
      'Ternary: condition ? valueIfTrue : valueIfFalse',
      'String + evaluates left-to-right: "a"+1+2 = "a12"',
      'instanceof checks class/interface membership',
    ]
  },

  // ── MODULE: Control Flow ───────────────────────────────────
  'java-control-flow': {
    intro: 'Control flow statements determine the order in which statements execute. Mastery of loops and conditionals — especially tracing their output — is essential for both coding interviews and written tests.',
    keyConcepts: [
      { term: 'if / else if / else', definition: 'Executes a block based on a boolean condition. Conditions are evaluated top-to-bottom; first true condition executes.' },
      { term: 'switch statement', definition: 'Selects one of many code blocks. Works with int, char, String (Java 7+), enum. Each case needs break; or it falls through to the next case.' },
      { term: 'switch expression (Java 14+)', definition: 'Modern syntax: uses -> arrows, no fall-through, can return a value directly.' },
      { term: 'for loop', definition: 'Fixed-count iteration. Format: for(init; condition; update). All 3 parts are optional.' },
      { term: 'enhanced for (for-each)', definition: 'Iterates over arrays/collections without index. Cannot modify elements directly.' },
      { term: 'while loop', definition: 'Condition checked BEFORE each iteration. May execute 0 times if condition is initially false.' },
      { term: 'do-while loop', definition: 'Condition checked AFTER each iteration. Always executes at least ONCE.' },
      { term: 'break', definition: 'Exits the nearest enclosing loop or switch. Use labeled break to exit outer loops.' },
      { term: 'continue', definition: 'Skips the rest of the current iteration and moves to the next iteration of the nearest loop.' },
    ],
    codeExamples: [
      {
        title: 'Switch with Fall-Through Trap',
        code: `public class SwitchFallThrough {
    public static void main(String[] args) {
        int day = 2;
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;       // exits switch
            case 2:
                System.out.println("Tuesday");
                // NO break! Falls through to case 3
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Other day");
        }
    }
}`,
        output: `Tuesday
Wednesday`,
        note: 'Case 2 falls through to case 3 because there is no break. This is a classic interview trick!'
      },
      {
        title: 'Nested Loops — Pattern Tracing',
        code: `public class NestedLoops {
    public static void main(String[] args) {
        // Triangle pattern
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
        output: `* 
* * 
* * * 
* * * *`
      },
      {
        title: 'break and continue in Nested Loops',
        code: `public class BreakContinue {
    public static void main(String[] args) {
        // continue example
        for (int i = 1; i <= 5; i++) {
            if (i == 3) continue; // skip 3
            System.out.print(i + " ");
        }
        System.out.println();

        // break example
        for (int i = 1; i <= 5; i++) {
            if (i == 3) break; // stop at 3
            System.out.print(i + " ");
        }
        System.out.println();

        // Labeled break (breaking outer loop)
        outer:
        for (int i = 1; i <= 3; i++) {
            for (int j = 1; j <= 3; j++) {
                if (i == 2 && j == 2) break outer; // exits outer loop
                System.out.print(i + "" + j + " ");
            }
        }
    }
}`,
        output: `1 2 4 5 
1 2 
11 12 13 21 `
      },
      {
        title: 'do-while Always Executes Once',
        code: `public class DoWhileDemo {
    public static void main(String[] args) {
        int i = 10;

        // while: condition false from start, never executes
        while (i < 5) {
            System.out.println("while: " + i);
        }

        // do-while: always executes at least once
        do {
            System.out.println("do-while: " + i);
            i++;
        } while (i < 5); // false, but body already ran once

        System.out.println("After: " + i);
    }
}`,
        output: `do-while: 10
After: 11`
      }
    ],
    commonMistakes: [
      'Missing break in switch — causes fall-through to next case (sometimes intentional, often a bug)',
      'Off-by-one errors: for(int i=0; i<=n; i++) iterates n+1 times. for(int i=0; i<n; i++) iterates n times.',
      'Infinite loop: forgetting to update the loop variable in while loop',
      'Using = instead of == in loop condition',
      'Modifying collection while iterating with for-each — causes ConcurrentModificationException',
    ],
    interviewTips: [
      'Interviewers love asking you to trace nested loop output — practice drawing tables with i and j values.',
      'Know the difference between while (check before) and do-while (check after, runs at least once).',
    ],
    interviewQuestions: [
      { q: 'What is the difference between break and continue?', a: 'break exits the loop entirely — no more iterations happen. continue skips the rest of the current iteration and jumps to the next iteration (the loop continues). Both apply to the nearest enclosing loop. Labeled break (break outerLabel;) can exit an outer loop.' },
      { q: 'What is switch fall-through?', a: 'When a case in a switch statement does not have a break statement, execution continues into the next case regardless of whether it matches. This is called fall-through. It is usually a bug but can be intentional (e.g., grouping cases together).' },
    ],
    revisionPoints: [
      'do-while always executes at least once (post-condition)',
      'while checks condition before executing (may run 0 times)',
      'switch without break → falls through to next case',
      'continue skips current iteration; break exits loop',
      'Enhanced for-each: cannot modify collection during iteration',
      'Labeled break exits the specified outer loop',
    ]
  },

  // ── MODULE: Strings ────────────────────────────────────────
  'java-strings': {
    intro: 'String is one of the most frequently used classes in Java and has many interview-worthy quirks. Java Strings are immutable, stored in a special String pool, and have dozens of useful methods. Knowing when to use String vs StringBuilder vs StringBuffer is critical.',
    keyConcepts: [
      { term: 'String Immutability', definition: 'Once a String object is created, it cannot be changed. Any "modification" creates a NEW String object. The original is unchanged. This enables thread safety and String pool optimization.' },
      { term: 'String Pool (String Constant Pool)', definition: 'A special area inside the Java heap. When you create a String literal ("hello"), JVM checks the pool first. If "hello" exists, it returns the same reference — saving memory. new String("hello") always creates a new object outside the pool.' },
      { term: '== vs .equals()', definition: '== compares references (memory addresses). .equals() compares actual content. Always use .equals() to compare String values.' },
      { term: 'StringBuilder', definition: 'Mutable sequence of characters. NOT thread-safe. Much faster for string manipulation in loops. Introduced in Java 1.5.' },
      { term: 'StringBuffer', definition: 'Mutable sequence of characters. Thread-safe (synchronized). Slower than StringBuilder. Use only in multi-threaded scenarios.' },
      { term: 'String.intern()', definition: 'Adds a String to the pool (or returns the pool reference if it already exists). Used to force String pooling for new String().' },
      { term: 'charAt()', definition: 'Returns the char at specified index. index 0 to length-1.' },
      { term: 'substring()', definition: 'substring(start) → from start to end. substring(start, end) → from start to end-1 (end is exclusive).' },
      { term: 'split()', definition: 'Splits string by regex, returns String[]. split(",") splits by comma.' },
      { term: 'trim() vs strip()', definition: 'trim() removes ASCII whitespace. strip() (Java 11+) removes Unicode whitespace too. Prefer strip() in modern code.' },
    ],
    codeExamples: [
      {
        title: 'String Pool — The Most Important Concept',
        code: `public class StringPool {
    public static void main(String[] args) {
        String s1 = "Java";          // goes to pool
        String s2 = "Java";          // returns same pool reference
        String s3 = new String("Java"); // creates new object on heap

        System.out.println(s1 == s2);       // true  (same pool object)
        System.out.println(s1 == s3);       // false (different objects)
        System.out.println(s1.equals(s3));  // true  (same content)

        // intern() forces pool usage
        String s4 = s3.intern();
        System.out.println(s1 == s4);       // true (s4 now points to pool)
    }
}`,
        output: `true
false
true
true`
      },
      {
        title: 'String Immutability in Practice',
        code: `public class StringImmutable {
    public static void main(String[] args) {
        String str = "Hello";
        str = str + " World"; // creates a NEW string, str now points to it
        // Original "Hello" still exists (until GC collects it)
        System.out.println(str);

        // This is why string concat in loops is inefficient
        String result = "";
        for (int i = 0; i < 3; i++) {
            result += i; // creates new String each time!
        }
        System.out.println(result);

        // Use StringBuilder instead:
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            sb.append(i); // modifies same object
        }
        System.out.println(sb.toString());
    }
}`,
        output: `Hello World
012
012`
      },
      {
        title: 'Common String Methods',
        code: `public class StringMethods {
    public static void main(String[] args) {
        String s = "  Hello, Java!  ";

        System.out.println(s.trim());              // "Hello, Java!"
        System.out.println(s.trim().length());     // 13
        System.out.println(s.trim().toUpperCase()); // "HELLO, JAVA!"
        System.out.println(s.trim().replace("Java", "World")); // "Hello, World!"
        System.out.println(s.trim().contains("Java")); // true
        System.out.println(s.trim().startsWith("Hello")); // true
        System.out.println(s.trim().indexOf("Java")); // 7
        System.out.println(s.trim().substring(7));     // "Java!"
        System.out.println(s.trim().substring(7, 11)); // "Java"

        // split
        String csv = "apple,banana,cherry";
        String[] fruits = csv.split(",");
        System.out.println(fruits[1]); // banana
        System.out.println(fruits.length); // 3
    }
}`,
        output: `Hello, Java!
13
HELLO, JAVA!
Hello, World!
true
true
7
Java!
Java
banana
3`
      },
      {
        title: 'StringBuilder — Key Methods',
        code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");

        sb.append(" World");   // add to end
        sb.insert(5, ",");     // insert at index 5
        sb.delete(5, 6);       // delete chars 5 to 5 (", " removed)
        sb.reverse();          // reverse the whole thing
        sb.replace(0, 5, "Hi"); // replace range

        System.out.println(sb.length()); // current length
        System.out.println(sb.toString());

        // StringBuilder is mutable
        StringBuilder a = new StringBuilder("test");
        StringBuilder b = a;
        b.append("!");
        System.out.println(a); // "test!" — same object!
    }
}`,
        output: `7
HidlroW
test!`,
        note: 'StringBuilder operations modify the same object, unlike String.'
      }
    ],
    commonMistakes: [
      'Using == to compare strings: "hello" == "hello" might be true (pool), but new String("hello") == "hello" is false. ALWAYS use .equals()',
      'String concat in loops using + — creates new object each iteration. Use StringBuilder.',
      'Assuming String methods modify the original — they return a NEW String',
      'NullPointerException from calling methods on null String — check for null first',
      'String.split() with regex metacharacters: "1.2.3".split(".") splits on every char (. is regex wildcard). Use split("\\\\.") for a literal dot.',
    ],
    interviewTips: [
      '"Why is String immutable?" → 3 reasons: (1) Security — used in class loading, network connections. (2) Thread safety — can be shared between threads safely. (3) String pool efficiency — identical strings can share the same object.',
      '"When would you use StringBuilder over String?" → When building a string in a loop or with multiple concatenations. String concat in a loop creates O(n) objects; StringBuilder is O(1) for each append.',
    ],
    interviewQuestions: [
      { q: 'Why is String immutable in Java?', a: 'Immutability provides: (1) Security — Strings are used in class loading, URLs, DB connections. Mutable strings could be changed after security checks. (2) Thread safety — immutable objects can be shared between threads without synchronization. (3) String pool optimization — identical string literals share the same object, saving memory. (4) HashCode caching — String caches its hashCode since the content never changes, making HashMap/HashSet operations faster.' },
      { q: 'What is the difference between String, StringBuilder, and StringBuffer?', a: 'String is immutable — any modification creates a new object. StringBuilder is mutable, NOT thread-safe, and the fastest for string manipulation. StringBuffer is mutable and thread-safe (synchronized), but slower than StringBuilder. Use String for constant values, StringBuilder for single-threaded manipulation, StringBuffer for multi-threaded environments (rare in practice — usually other synchronization is used).' },
      { q: 'What is the String constant pool?', a: 'A special memory area in the Java heap. When you create a String literal like String s = "hello", Java checks if "hello" already exists in the pool. If yes, it returns the existing reference — both variables point to the same object. If no, it creates a new entry. new String("hello") bypasses the pool and always creates a new heap object. Use .intern() to add a new String to the pool.' },
    ],
    revisionPoints: [
      'String is immutable and final — any modification creates a new object',
      'String pool: literals share objects; new String() creates new heap object',
      'Always use .equals() for String content comparison, never ==',
      'StringBuilder: mutable, not thread-safe, fast',
      'StringBuffer: mutable, thread-safe (synchronized), slower',
      'Common methods: length(), charAt(), substring(), indexOf(), contains(), split(), trim(), replace(), toUpperCase()',
      'String + in a loop is O(n²) — use StringBuilder for O(n)',
    ]
  },

  // ── MODULE: Arrays ─────────────────────────────────────────
  'java-arrays': {
    intro: 'Arrays are the most fundamental data structure in Java — a fixed-size, ordered collection of elements of the same type. They are stored in contiguous memory and accessed by index (0-based). Every coding interview involves arrays, so mastering both the syntax and common algorithms is essential.',
    keyConcepts: [
      { term: 'Array Declaration & Initialization', definition: 'Two styles: int[] arr = new int[5]; (empty, defaults to 0) or int[] arr = {1,2,3,4,5}; (inline initialization).' },
      { term: 'Zero-Based Indexing', definition: 'First element is at index 0. Last element is at index length-1. Accessing arr[arr.length] throws ArrayIndexOutOfBoundsException.' },
      { term: 'Array Length', definition: 'Use arr.length (not arr.length()). Arrays have a property, not a method. String uses .length() — notice the difference!' },
      { term: 'Multidimensional Arrays', definition: 'int[][] matrix = new int[3][4]; — 3 rows, 4 columns. Access: matrix[row][col]. Stored as array of arrays in Java (jagged arrays allowed).' },
      { term: 'Arrays Class', definition: 'java.util.Arrays provides: Arrays.sort(), Arrays.binarySearch(), Arrays.copyOf(), Arrays.fill(), Arrays.equals(), Arrays.toString()' },
      { term: 'Array is a Reference Type', definition: 'Arrays are objects in Java. When you assign array to another variable, both point to the same array. Use Arrays.copyOf() or arr.clone() to make an independent copy.' },
      { term: 'Default Values', definition: 'int[] → all zeros, boolean[] → all false, String[] → all null, double[] → all 0.0' },
    ],
    codeExamples: [
      {
        title: 'Array Basics & Common Operations',
        code: `import java.util.Arrays;

public class ArrayBasics {
    public static void main(String[] args) {
        // Declaration and initialization
        int[] arr = {5, 2, 8, 1, 9, 3};

        System.out.println("Length: " + arr.length);  // 6 (property, not method)
        System.out.println("First: " + arr[0]);        // 5
        System.out.println("Last: " + arr[arr.length - 1]); // 3

        // Traversal
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();

        // Enhanced for-each
        for (int num : arr) {
            System.out.print(num + " ");
        }
        System.out.println();

        // Sort (modifies original array)
        Arrays.sort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));

        // Search (array must be sorted)
        int idx = Arrays.binarySearch(arr, 8);
        System.out.println("Index of 8: " + idx);
    }
}`,
        output: `Length: 6
First: 5
Last: 3
5 2 8 1 9 3 
5 2 8 1 9 3 
Sorted: [1, 2, 3, 5, 8, 9]
Index of 8: 4`
      },
      {
        title: 'Common Array Algorithms',
        code: `public class ArrayAlgorithms {
    public static void main(String[] args) {
        int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

        // Find max
        int max = arr[0];
        for (int x : arr) if (x > max) max = x;
        System.out.println("Max: " + max);

        // Reverse array
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++; right--;
        }
        System.out.println("Reversed: " + java.util.Arrays.toString(arr));

        // Count occurrences
        int target = 1;
        int count = 0;
        for (int x : arr) if (x == target) count++;
        System.out.println("Count of " + target + ": " + count);
    }
}`,
        output: `Max: 9
Reversed: [6, 2, 9, 5, 1, 4, 1, 3]
Count of 1: 2`
      },
      {
        title: '2D Arrays (Matrix)',
        code: `public class TwoDArray {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Print matrix
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%3d", matrix[i][j]);
            }
            System.out.println();
        }

        // Sum of diagonal
        int sum = 0;
        for (int i = 0; i < matrix.length; i++) {
            sum += matrix[i][i];
        }
        System.out.println("Diagonal sum: " + sum);
    }
}`,
        output: `  1  2  3
  4  5  6
  7  8  9
Diagonal sum: 15`
      }
    ],
    commonMistakes: [
      'arr.length() — arrays have .length property (no parentheses). String uses .length() — common confusion!',
      'ArrayIndexOutOfBoundsException — accessing arr[arr.length] instead of arr[arr.length-1]',
      'Array assignment copies the reference, not the data: int[] b = a; changes to b affect a!',
      'Sorting only works correctly with Arrays.binarySearch() if the array is already sorted',
      '2D array size: matrix.length gives rows, matrix[0].length gives columns',
    ],
    interviewTips: [
      'For finding duplicates → use a HashSet (O(n) time). For frequency → use a HashMap.',
      'Two-pointer technique: one pointer from left, one from right — useful for reverse, sum pairs, palindrome check.',
      'Practice the "missing number" problem: sum of 1-N is N*(N+1)/2. Subtract actual sum from expected sum.',
    ],
    interviewQuestions: [
      { q: 'How do you find the second largest element in an array?', a: 'Use two variables: largest and secondLargest. Traverse once. If current > largest, update secondLargest = largest, largest = current. Else if current > secondLargest and current != largest, update secondLargest = current. Time complexity O(n), space O(1).' },
      { q: 'How do you remove duplicates from an array?', a: 'Common approaches: (1) Use a LinkedHashSet to preserve order — add all elements, then convert back to array. O(n) time, O(n) space. (2) Sort the array, then use two-pointer to skip duplicates — O(n log n) time, O(1) extra space. (3) Use a boolean[] if values are in known range.' },
    ],
    revisionPoints: [
      'Arrays are fixed-size; use ArrayList for dynamic size',
      'arr.length property (no parentheses) vs String.length() method',
      'Default values: int[]→0, boolean[]→false, Object[]→null',
      'Arrays are reference types — assignment copies reference, not data',
      'Arrays.sort() → O(n log n), Arrays.binarySearch() → O(log n) — array must be sorted',
      'Two-pointer and sliding window are key array interview patterns',
    ]
  },

  // ── MODULE: Methods ────────────────────────────────────────
  'java-methods': {
    intro: 'Methods are the building blocks of Java programs — reusable blocks of code that perform a specific task. Understanding method signatures, overloading, recursion, and how Java passes arguments is fundamental to both interviews and daily coding.',
    keyConcepts: [
      { term: 'Method Signature', definition: 'The combination of method name and parameter list (types and order). Return type is NOT part of the signature. Two methods with same signature cannot coexist in the same class.' },
      { term: 'Method Overloading', definition: 'Multiple methods in the same class with the same name but DIFFERENT parameter lists (different number, type, or order of parameters). Resolved at compile-time.' },
      { term: 'Pass-by-Value', definition: 'Java ALWAYS passes by value. For primitives, a copy of the value is passed. For objects, a copy of the REFERENCE is passed (not the object itself). You can modify the object through the reference, but cannot change what the original variable points to.' },
      { term: 'Return Statement', definition: 'Exits the method and optionally returns a value. void methods can use return; to exit early. Non-void must return the correct type on all code paths.' },
      { term: 'Recursion', definition: 'A method that calls itself. Must have a BASE CASE (stops recursion) and a RECURSIVE CASE. Without a base case, causes StackOverflowError.' },
      { term: 'varargs', definition: 'Variable-length arguments: void print(String... items). Treated as an array inside the method. Must be last parameter. Can call with 0 or more arguments.' },
      { term: 'static methods', definition: 'Belong to the class, not an instance. Can be called without creating an object. Cannot access instance variables directly. Cannot use "this" keyword.' },
    ],
    codeExamples: [
      {
        title: 'Method Overloading',
        code: `public class OverloadDemo {
    // Same name, different parameters
    static int add(int a, int b) {
        return a + b;
    }
    static double add(double a, double b) {
        return a + b;
    }
    static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        System.out.println(add(2, 3));       // calls int version
        System.out.println(add(2.5, 3.5));   // calls double version
        System.out.println(add(1, 2, 3));    // calls 3-arg version
    }
}`,
        output: `5
6.0
6`
      },
      {
        title: 'Pass-by-Value — The Critical Concept',
        code: `public class PassByValue {
    static void changeInt(int x) {
        x = 999; // only changes local copy
    }

    static void changeArray(int[] arr) {
        arr[0] = 999; // modifies the SAME array (reference copy)
    }

    static void reassignArray(int[] arr) {
        arr = new int[]{1, 2, 3}; // only changes local reference copy
    }

    public static void main(String[] args) {
        int n = 42;
        changeInt(n);
        System.out.println(n); // still 42!

        int[] myArr = {1, 2, 3};
        changeArray(myArr);
        System.out.println(myArr[0]); // 999 (array was modified)

        int[] myArr2 = {1, 2, 3};
        reassignArray(myArr2);
        System.out.println(myArr2[0]); // still 1 (reference wasn't changed)
    }
}`,
        output: `42
999
1`
      },
      {
        title: 'Recursion — Factorial & Fibonacci',
        code: `public class RecursionDemo {
    static int factorial(int n) {
        if (n <= 1) return 1;      // base case
        return n * factorial(n - 1); // recursive case
    }

    static int fibonacci(int n) {
        if (n <= 1) return n;      // base cases: fib(0)=0, fib(1)=1
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));  // 120
        System.out.println("fib(7) = " + fibonacci(7)); // 13
    }
}`,
        output: `5! = 120
fib(7) = 13`,
        note: 'Recursive fibonacci is O(2^n) — very slow. Use dynamic programming or iteration for large n.'
      }
    ],
    commonMistakes: [
      'Confusing method overloading with overriding — overloading is same class, same name, different params; overriding is subclass, same signature.',
      'Believing Java has pass-by-reference — it does NOT. It\'s always pass-by-value (even for objects — the reference is passed by value).',
      'Missing base case in recursion → StackOverflowError',
      'Returning nothing in a non-void method on all code paths → compile error',
    ],
    interviewTips: [
      '"Does Java support pass-by-reference?" → NO. Java is always pass-by-value. For objects, the value is the reference (pointer copy). You can modify the object state through it, but cannot reassign the original variable.',
      '"What is method overloading?" → Same class, same method name, different parameter list. Resolved at compile-time (static polymorphism).',
    ],
    interviewQuestions: [
      { q: 'Is Java pass-by-value or pass-by-reference?', a: 'Java is ALWAYS pass-by-value. For primitives, a copy of the actual value is passed. For objects, a copy of the reference (memory address) is passed — not the object itself. This means you can modify the object through the reference (changes are visible to caller), but you cannot make the original variable point to a different object.' },
      { q: 'What is method overloading? How is it different from overriding?', a: 'Overloading: multiple methods in the SAME class with the same name but different parameter lists (different type, count, or order). Resolved at compile-time — also called static/compile-time polymorphism. Overriding: a SUBCLASS provides a different implementation of a method with the same name and parameters as the parent class. Resolved at runtime — also called dynamic/runtime polymorphism.' },
    ],
    revisionPoints: [
      'Java is always pass-by-value (reference copy for objects)',
      'Method signature = name + parameter list (NOT return type)',
      'Overloading: same class, same name, different params — compile-time',
      'Recursion needs a base case to prevent StackOverflowError',
      'static methods cannot access instance variables or use "this"',
      'varargs must be the last parameter: void m(int... nums)',
    ]
  },

  // ── MODULE: OOP Basics ───────────────────────────────────────
  'java-oop-basics': {
    intro: 'Object-Oriented Programming (OOP) organizes software design around objects (data + behavior) rather than functions and logic. In Java, classes are blueprints, and objects are instances created in heap memory. Encapsulation protects an object\'s internal state by bundling data with methods and restricting direct field access.',
    keyConcepts: [
      { term: 'Class vs Object', definition: 'A class is a blueprint/template (e.g., Car). An object is a concrete instance created in memory (e.g., myCar = new Car()).', example: 'Car c = new Car("Tesla");' },
      { term: 'Constructors', definition: 'Special method with no return type, named identically to the class. Called automatically during "new" to initialize fields. If no constructor is defined, Java provides a hidden default no-arg constructor.', example: 'public Student(String name) { this.name = name; }' },
      { term: 'this Keyword', definition: 'A reference to the current object. Used to resolve ambiguity between instance variables and parameters, or to chain constructors via this().', example: 'this.name = name; or this("Unknown", 0);' },
      { term: 'Encapsulation', definition: 'Hiding internal state by making fields private and exposing access through public getters and setters with validation.', example: 'private int age; public int getAge() { return age; }' },
      { term: 'Access Modifiers', definition: 'private (same class only), default/package-private (same package), protected (same package + subclasses), public (everywhere).' },
      { term: 'Static vs Instance', definition: 'static members belong to the class itself, shared across all objects. Instance members belong to each individual object.' },
    ],
    codeExamples: [
      {
        title: 'Proper Encapsulation with Getters & Setters',
        code: `public class BankAccount {
    private String accountNumber;
    private double balance; // private: hidden from direct outside tampering

    // Parameterized constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        setBalance(initialBalance); // reuse validation
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("Invalid balance: cannot be negative");
        }
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("ACC-101", 500);
        acc.deposit(250);
        System.out.println("Current balance: $" + acc.getBalance());
        acc.setBalance(-50); // Protected: rejected!
        System.out.println("After invalid attempt: $" + acc.getBalance());
    }
}`,
        output: `Current balance: $750.0
Invalid balance: cannot be negative
After invalid attempt: $750.0`
      },
      {
        title: 'Constructor Chaining with this()',
        code: `public class Employee {
    String name;
    int id;
    String department;

    // Constructor 1: 1 parameter, chains to Constructor 2
    public Employee(String name) {
        this(name, 1001, "General"); // must be 1st statement!
    }

    // Constructor 2: full parameters
    public Employee(String name, int id, String department) {
        this.name = name;
        this.id = id;
        this.department = department;
    }

    public static void main(String[] args) {
        Employee e1 = new Employee("Alice");
        System.out.println(e1.name + " | " + e1.id + " | " + e1.department);
    }
}`,
        output: 'Alice | 1001 | General'
      }
    ],
    commonMistakes: [
      'Leaving fields public — defeats encapsulation and allows unauthorized state changes.',
      'Putting a return type on a constructor: "public void Car() {}" makes it a regular method, not a constructor!',
      'Using this() anywhere other than the very first line of a constructor.',
      'Calling non-static methods or instance variables from a static method directly without an object reference.',
    ],
    interviewTips: [
      '"Why do we need encapsulation?" → Security (data hiding), maintainability (implementation can change without breaking callers), and flexibility (can make fields read-only or add validation).',
      '"What is constructor overloading?" → Defining multiple constructors in the same class with different parameter lists.',
    ],
    interviewQuestions: [
      { q: 'What is the purpose of encapsulation in Java?', a: 'Encapsulation is bundling data (fields) and methods that operate on that data into a single unit (class), while hiding internal state using access modifiers (private). Access is controlled through public getters/setters with validation rules. It prevents unauthorized direct modifications and promotes loose coupling.' },
      { q: 'Can a constructor be private, static, or final?', a: 'A constructor CAN be private (common in Singleton pattern or utility classes to prevent instantiation). It CANNOT be static (it belongs to object creation) and CANNOT be final (constructors are not inherited anyway).' },
    ],
    revisionPoints: [
      'Encapsulation = private fields + public getters/setters',
      'Constructor has no return type and shares class name',
      'this() chains constructors and must be first statement',
      'static belongs to class; instance belongs to object',
      '4 access levels: private < default < protected < public',
    ]
  },

  // ── MODULE: Inheritance & Polymorphism ───────────────────────
  'java-inheritance': {
    intro: 'Inheritance allows a subclass to acquire fields and methods of a superclass using the "extends" keyword (establishing an IS-A relationship). Polymorphism ("many forms") lets a single method call execute different behaviors at runtime based on the actual object type (Dynamic Method Dispatch).',
    keyConcepts: [
      { term: 'extends Keyword', definition: 'Inherits all accessible members from parent class. Java supports SINGLE class inheritance only (a class can extend only one class).' },
      { term: 'super Keyword', definition: 'Refers to immediate parent class. super() calls the parent constructor (must be 1st line); super.method() invokes overridden parent method.' },
      { term: 'Method Overriding', definition: 'Subclass provides a specific implementation of an inherited method with identical name, parameters, and return type. Annotated with @Override.' },
      { term: 'Dynamic Method Dispatch', definition: 'Runtime polymorphism: When an overridden method is called through a parent reference (Parent p = new Child()), the JVM determines at runtime which version to call based on the ACTUAL object.' },
      { term: 'Upcasting vs Downcasting', definition: 'Upcasting (Child to Parent) is automatic and safe. Downcasting (Parent to Child) requires explicit cast and should be verified with instanceof.' },
      { term: 'final Keyword', definition: 'final variable = constant. final method = cannot be overridden. final class = cannot be extended/subclassed.' },
    ],
    codeExamples: [
      {
        title: 'Runtime Polymorphism in Action',
        code: `class Shape {
    void draw() {
        System.out.println("Drawing a generic shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a Circle ⭕");
    }
}

class Square extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a Square ⬛");
    }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        // Parent references pointing to Child objects
        Shape s1 = new Circle();
        Shape s2 = new Square();

        // JVM resolves method at runtime based on actual object
        s1.draw(); // Circle's draw()
        s2.draw(); // Square's draw()
    }
}`,
        output: `Drawing a Circle ⭕
Drawing a Square ⬛`
      },
      {
        title: 'super() Constructor Execution Order',
        code: `class Parent {
    Parent() {
        System.out.println("1. Parent constructor executed");
    }
}

class Child extends Parent {
    Child() {
        super(); // called implicitly even if omitted
        System.out.println("2. Child constructor executed");
    }
}

public class ConstructorOrder {
    public static void main(String[] args) {
        new Child();
    }
}`,
        output: `1. Parent constructor executed
2. Child constructor executed`,
        note: 'Parent constructor always finishes before Child constructor body runs.'
      }
    ],
    commonMistakes: [
      'Assuming static methods can be overridden — static methods are hidden, not overridden (resolved at compile-time).',
      'Forgetting that Java does NOT allow multiple class inheritance (class A extends B, C is illegal). Use interfaces instead.',
      'Downcasting without checking instanceof, causing ClassCastException at runtime.',
      'Private and final methods cannot be overridden.',
    ],
    interviewTips: [
      '"Why doesn\'t Java support multiple inheritance of classes?" → The Diamond Problem (ambiguity if two parents define the same method). Solved via interfaces.',
      '"What is covariant return type?" → An overridden method in a subclass can return a subtype of the return type declared in the parent method.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between compile-time and runtime polymorphism?', a: 'Compile-time polymorphism is achieved through method overloading (same name, different params) and is resolved by the compiler. Runtime polymorphism is achieved through method overriding (same signature in subclass) where the JVM resolves the actual method to call at runtime via dynamic method dispatch.' },
      { q: 'Can you override private or static methods in Java?', a: 'No. Private methods are not visible to subclasses, so they cannot be overridden. Static methods belong to the class, not instances; if a subclass declares a static method with the same signature, it "hides" the superclass method (method hiding), which is bound at compile time, not runtime.' },
    ],
    revisionPoints: [
      'extends creates single inheritance; establishes IS-A',
      'super() invokes parent constructor; runs first',
      'Runtime polymorphism resolves overridden methods at runtime',
      'static methods are hidden, not overridden',
      'final classes cannot be inherited (e.g. String is final)',
    ]
  },

  // ── MODULE: Abstraction & Interfaces ─────────────────────────
  'java-abstraction': {
    intro: 'Abstraction hides internal implementation details and shows only essential features to the user. In Java, abstraction is achieved using Abstract Classes (0 to 100% abstraction) and Interfaces (contract specification, up to 100% abstraction).',
    keyConcepts: [
      { term: 'Abstract Class', definition: 'A class declared with the "abstract" keyword. Cannot be instantiated with new. Can contain both abstract methods (no body) and concrete methods (with body), instance variables, and constructors.' },
      { term: 'Abstract Method', definition: 'A method declared without implementation (no curly braces, ends with semicolon). Any concrete subclass MUST implement all inherited abstract methods.' },
      { term: 'Interface', definition: 'A contract defined with "interface". All methods are public abstract by default (pre-Java 8). All fields are public static final by default. A class implements an interface using "implements".' },
      { term: 'Multiple Interfaces', definition: 'Java allows a class to implement multiple interfaces (class C implements A, B), avoiding diamond inheritance issues.' },
      { term: 'default Methods (Java 8+)', definition: 'Interfaces can have methods with a default implementation using the "default" keyword, allowing interfaces to evolve without breaking existing implementers.' },
      { term: 'Functional Interface', definition: 'An interface with exactly ONE abstract method. Can be implemented using Lambda expressions. Examples: Runnable, Callable, Comparator.' },
    ],
    codeExamples: [
      {
        title: 'Interface vs Abstract Class',
        code: `interface PaymentGateway {
    void processPayment(double amount); // public abstract

    // Java 8 default method
    default void printReceipt(double amount) {
        System.out.println("Receipt: Paid $" + amount);
    }
}

class PayPalGateway implements PaymentGateway {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        PaymentGateway pg = new PayPalGateway();
        pg.processPayment(99.0);
        pg.printReceipt(99.0);
    }
}`,
        output: `Processing $99.0 via PayPal
Receipt: Paid $99.0`
      }
    ],
    commonMistakes: [
      'Attempting to instantiate an abstract class: new Animal() gives compile error.',
      'Forgetting that interface fields are implicitly public static final constants.',
      'Omitting public modifier when implementing interface methods (interface methods are public, so subclass cannot reduce visibility to package/default).',
    ],
    interviewTips: [
      '"When to choose Abstract Class vs Interface?" → Use an interface when defining a contract for unrelated classes or when multiple inheritance is needed. Use an abstract class when classes share code, state (non-static fields), or common constructor logic.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between an abstract class and an interface?', a: 'Abstract classes can have state (instance variables), constructors, and concrete methods, but allow only single inheritance. Interfaces cannot have instance state or constructors, but a class can implement multiple interfaces. Since Java 8, interfaces support default and static methods, and since Java 9, private methods.' },
    ],
    revisionPoints: [
      'Abstract classes cannot be instantiated with new',
      'A class can implement multiple interfaces',
      'Interface fields: always public static final',
      'Java 8+ allows default and static methods in interfaces',
      'Functional interface has exactly 1 abstract method',
    ]
  },

  // ── MODULE: Exceptions ───────────────────────────────────────
  'java-exceptions': {
    intro: 'An exception is an abnormal condition or event that disrupts the normal execution flow of a program. Java provides a robust mechanism using try, catch, finally, throw, and throws to handle errors gracefully without crashing the application.',
    keyConcepts: [
      { term: 'Throwable Hierarchy', definition: 'Throwable is root. Divided into Error (serious system issues like OutOfMemoryError, not meant to be caught) and Exception (application conditions to catch).' },
      { term: 'Checked Exceptions', definition: 'Inherit from Exception (not RuntimeException). Checked at compile time. Must be either handled in a try-catch or declared in method signature with throws. Examples: IOException, SQLException.' },
      { term: 'Unchecked Exceptions', definition: 'Inherit from RuntimeException. Not checked at compile time. Usually indicate programming bugs. Examples: NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException.' },
      { term: 'try-catch-finally', definition: 'try contains risky code; catch handles specific exception; finally ALWAYS executes regardless of whether an exception occurred or return was called (except System.exit).' },
      { term: 'throw vs throws', definition: 'throw explicitly throws an exception instance (throw new IllegalArgumentException()). throws declares in the method signature that the method may propagate exceptions.' },
      { term: 'try-with-resources', definition: 'Java 7+ feature for automatic resource management. Any resource implementing AutoCloseable (like Scanner, FileReader, Connection) is closed automatically.' },
    ],
    codeExamples: [
      {
        title: 'try-catch-finally Execution Order',
        code: `public class ExceptionDemo {
    public static int testFlow() {
        try {
            int result = 10 / 0; // ArithmeticException
            return result;
        } catch (ArithmeticException e) {
            System.out.println("Catch block: handled division by zero");
            return 1;
        } finally {
            System.out.println("Finally block: ALWAYS runs!");
        }
    }

    public static void main(String[] args) {
        int val = testFlow();
        System.out.println("Returned value: " + val);
    }
}`,
        output: `Catch block: handled division by zero
Finally block: ALWAYS runs!
Returned value: 1`
      },
      {
        title: 'try-with-resources (Automatic Closing)',
        code: `import java.io.*;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        // Resource automatically closed at end of try block
        try (StringReader reader = new StringReader("Java Exception Handling")) {
            int ch = reader.read();
            System.out.println("Read first char: " + (char) ch);
        } catch (IOException e) {
            System.out.println("IO Error: " + e.getMessage());
        }
        System.out.println("Reader closed automatically!");
    }
}`,
        output: `Read first char: J
Reader closed automatically!`
      }
    ],
    commonMistakes: [
      'Ordering catch blocks from general to specific (e.g. catch(Exception e) before catch(IOException e)) — compile error because specific catch is unreachable!',
      'Swallowing exceptions with empty catch blocks — hides bugs and prevents debugging.',
      'Believing finally never runs if return is in try — finally STILL executes before the method returns.',
    ],
    interviewTips: [
      '"Does finally always execute?" → Yes, except if System.exit(0) is called, or if the JVM crashes/power is lost.',
      '"What is the difference between throw and throws?" → throw throws an actual exception object inside a method; throws declares potential exceptions in the method signature.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between Checked and Unchecked exceptions?', a: 'Checked exceptions inherit directly from Exception (excluding RuntimeException) and are checked at compile time; you must handle them with try-catch or declare with throws (e.g. IOException). Unchecked exceptions extend RuntimeException and occur at runtime due to programming bugs (e.g. NullPointerException); compiler does not force handling.' },
      { q: 'What is try-with-resources and why is it preferred?', a: 'Introduced in Java 7, try-with-resources automatically closes any resource that implements java.lang.AutoCloseable at the end of the statement. It eliminates verbose finally blocks and avoids resource leaks and suppressed exceptions.' },
    ],
    revisionPoints: [
      'Throwable is root: splits into Error vs Exception',
      'Checked = compile-time; Unchecked = RuntimeException',
      'finally always runs (even when return is hit)',
      'Specific catch blocks must precede general catch blocks',
      'try-with-resources automatically closes AutoCloseable',
    ]
  },

  // ── MODULE: Collections ──────────────────────────────────────
  'java-collections': {
    intro: 'The Java Collections Framework provides an architecture to store and manipulate groups of objects. It includes interfaces (List, Set, Queue, Map), implementations (ArrayList, LinkedList, HashSet, HashMap), and utility algorithms (Collections.sort, reverse).',
    keyConcepts: [
      { term: 'List Interface', definition: 'Ordered collection with duplicate elements allowed. Positional access by index. Implementations: ArrayList (fast read O(1), dynamic array), LinkedList (doubly-linked list, fast insert/delete at edges).' },
      { term: 'Set Interface', definition: 'Collection that contains NO duplicate elements. HashSet (no order, O(1) hash table), LinkedHashSet (insertion order preserved), TreeSet (sorted according to natural order or Comparator, O(log n) Red-Black tree).' },
      { term: 'Map Interface', definition: 'Key-value pairs. Keys cannot be duplicated. HashMap (O(1), null key allowed, no order), LinkedHashMap (insertion order), TreeMap (sorted by keys).' },
      { term: 'HashMap Internals', definition: 'Uses an array of buckets. Calculates bucket index using (n - 1) & hash(key). In Java 8+, if bucket collision list exceeds 8 elements, it converts from linked list to Red-Black tree (O(log n)).' },
      { term: 'Comparable vs Comparator', definition: 'Comparable defines natural sort order inside the class via compareTo(T o). Comparator defines custom/multiple sort orders externally via compare(T o1, T o2).' },
      { term: 'Iterator & Fail-Fast', definition: 'Iterators traverse collections. If collection is structurally modified during iteration (except through iterator.remove()), it throws ConcurrentModificationException.' },
    ],
    codeExamples: [
      {
        title: 'List, Set, and Map Operations',
        code: `import java.util.*;

public class CollectionsOverview {
    public static void main(String[] args) {
        // List: allows duplicates, preserves order
        List<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Python");
        list.add("Java");
        System.out.println("List: " + list);

        // Set: eliminates duplicates
        Set<String> set = new HashSet<>(list);
        System.out.println("Set (no duplicates): " + set);

        // Map: key-value storage
        Map<String, Integer> map = new HashMap<>();
        map.put("Alice", 95);
        map.put("Bob", 82);
        System.out.println("Alice's score: " + map.get("Alice"));
    }
}`,
        output: `List: [Java, Python, Java]
Set (no duplicates): [Java, Python]
Alice's score: 95`
      },
      {
        title: 'Sorting with Comparator',
        code: `import java.util.*;

public class ComparatorDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Charlie", "Alice", "Bob");

        // Sort by length using lambda comparator
        names.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Sorted by length: " + names);

        // Natural alphabetical sort
        Collections.sort(names);
        System.out.println("Alphabetical: " + names);
    }
}`,
        output: `Sorted by length: [Bob, Alice, Charlie]
Alphabetical: [Alice, Bob, Charlie]`
      }
    ],
    commonMistakes: [
      'Choosing LinkedList over ArrayList assuming it is always faster — ArrayList is almost always faster in practice due to CPU cache locality.',
      'Modifying a collection in an enhanced for loop (causes ConcurrentModificationException) — use Iterator.remove() instead.',
      'Failing to override hashCode() when overriding equals() in custom objects used as HashMap keys or HashSet elements.',
    ],
    interviewTips: [
      '"How does HashMap work internally?" → Array of buckets + hashCode() to find bucket + equals() to resolve collisions. Treeified to Red-Black tree when bucket length exceeds 8.',
      '"Difference between ArrayList and LinkedList?" → ArrayList uses a resizable array with O(1) random access. LinkedList uses doubly-linked nodes with O(n) access but O(1) insertion/deletion once positioned.',
    ],
    interviewQuestions: [
      { q: 'How does HashMap handle collisions?', a: 'When two different keys produce the same bucket index (hash collision), HashMap stores both entries in a linked list at that bucket. When retrieving, it traverses the list comparing keys using .equals(). In Java 8+, once a bucket reaches 8 elements and total map capacity >= 64, the linked list is converted into a balanced Red-Black tree, improving worst-case search from O(n) to O(log n).' },
      { q: 'What is the contract between equals() and hashCode()?', a: 'If two objects are equal according to equals(), they MUST have the same hashCode(). However, if two objects have the same hashCode(), they are not necessarily equal (hash collision). Violating this contract causes HashMaps and HashSets to lose or fail to find objects.' },
    ],
    revisionPoints: [
      'ArrayList: fast random access O(1); dynamic array',
      'HashSet: unique elements; backed by HashMap',
      'HashMap: key-value pairs; array of buckets with treeification',
      'Comparable = compareTo (inside class); Comparator = compare (outside)',
      'Always override hashCode() when overriding equals()',
    ]
  },

  // ── MODULE: Streams & Lambdas ────────────────────────────────
  'java-streams': {
    intro: 'Introduced in Java 8, Lambdas bring functional programming capabilities to Java, allowing methods to be passed as arguments. The Stream API provides a declarative way to process sequences of elements with operations like filter, map, sorted, and reduce.',
    keyConcepts: [
      { term: 'Lambda Expression', definition: 'An anonymous function (no name, no return type declaration). Syntax: (parameters) -> { body }.', example: '(a, b) -> a + b' },
      { term: 'Stream API', definition: 'A sequence of elements supporting sequential and parallel aggregate operations. Streams do NOT store data and do not modify the underlying source.' },
      { term: 'Intermediate Operations', definition: 'Return a new Stream and are LAZY (not executed until a terminal operation is called). Examples: filter(), map(), sorted(), distinct(), limit().' },
      { term: 'Terminal Operations', definition: 'Produce a non-stream result (value or collection) or side-effect. Triggers stream execution. Examples: collect(), count(), forEach(), reduce(), findFirst().' },
      { term: 'Optional<T>', definition: 'A container object which may or may not contain a non-null value. Prevents NullPointerExceptions. Methods: isPresent(), orElse(), ifPresent().' },
      { term: 'Method References', definition: 'Shorthand syntax for lambdas that simply call an existing method. Syntax: ClassName::methodName.', example: 'System.out::println' },
    ],
    codeExamples: [
      {
        title: 'Filter, Map, and Collect',
        code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "Amy", "David");

        // Filter names starting with 'A', transform to uppercase, sort
        List<String> result = names.stream()
            .filter(name -> name.startsWith("A"))
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Result: " + result);

        // Sum of even numbers
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
        int sumOfEvens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();

        System.out.println("Sum of evens: " + sumOfEvens);
    }
}`,
        output: `Result: [ALICE, AMY]
Sum of evens: 12`
      }
    ],
    commonMistakes: [
      'Reusing a stream after a terminal operation has been executed — throws IllegalStateException: "stream has already been operated upon or closed".',
      'Forgetting that intermediate operations are lazy — stream().filter(...) does nothing without a terminal operation like collect() or forEach().',
      'Modifying the source collection while a stream pipeline is executing.',
    ],
    interviewTips: [
      '"What is the difference between intermediate and terminal operations?" → Intermediate returns a stream and is lazy; terminal triggers evaluation and produces a concrete result or side effect.',
      '"Why use Stream API over traditional loops?" → Cleaner declarative syntax, composability, and built-in support for parallel execution via parallelStream().',
    ],
    interviewQuestions: [
      { q: 'What is Stream laziness in Java 8?', a: 'Intermediate operations (filter, map, sorted) do not execute immediately when declared. They build a pipeline of operations. Execution only begins when a terminal operation (collect, count, forEach) is called. This allows the JVM to optimize processing (e.g. short-circuiting limit(1) without processing the entire dataset).' },
      { q: 'What is an Optional in Java and how does it prevent NPE?', a: 'Optional<T> is a single-value container introduced in Java 8 that either contains a non-null value or is empty. It explicitly documents that a method might return no value, forcing callers to check or provide defaults using methods like .orElse("default") or .ifPresent(val -> ...), eliminating unchecked NullPointerExceptions.' },
    ],
    revisionPoints: [
      'Lambda: (params) -> expression',
      'Streams do not store elements and do not mutate source',
      'Intermediate = lazy (filter, map); Terminal = eager (collect, count)',
      'Streams cannot be reused once consumed',
      'Optional avoids null checks and NullPointerExceptions',
    ]
  },
};

// ─────────────────────────────────────────────────────────────
// SIDEBAR CATEGORIZED CONFIG
// ─────────────────────────────────────────────────────────────
const SIDEBAR_CATEGORIES = [
  {
    id: 'fundamentals',
    label: '☕ Java Basics',
    modules: [
      { id: 'java-fundamentals',  label: 'Java Fundamentals',     badge: '🏗️' },
      { id: 'java-data-types',    label: 'Data Types & Variables', badge: '📊' },
      { id: 'java-operators',     label: 'Operators',              badge: '⚡' },
      { id: 'java-control-flow',  label: 'Control Flow & Loops',   badge: '🔄' },
      { id: 'java-strings',       label: 'Strings & StringBuilder',badge: '📝' },
      { id: 'java-arrays',        label: 'Arrays & 2D Matrix',     badge: '📦' },
      { id: 'java-methods',       label: 'Methods & Recursion',    badge: '🔧' },
    ]
  },
  {
    id: 'oop',
    label: '🧱 Object-Oriented',
    modules: [
      { id: 'java-oop-basics',   label: 'OOP Fundamentals',       badge: '🏛️' },
      { id: 'java-inheritance',  label: 'Inheritance & Polymorphism', badge: '🌳' },
      { id: 'java-abstraction',  label: 'Abstraction & Interfaces', badge: '🛡️' },
    ]
  },
  {
    id: 'collections',
    label: '📦 Collections',
    modules: [
      { id: 'java-collections',  label: 'Collections Framework',  badge: '📚' },
      { id: 'java-generics',     label: 'Generics',               badge: '📦' },
    ]
  },
  {
    id: 'advanced',
    label: '⚡ Advanced Java',
    modules: [
      { id: 'java-exceptions',      label: 'Exception Handling',    badge: '⚠️' },
      { id: 'java-streams',         label: 'Streams & Lambdas',     badge: '💨' },
      { id: 'java-multithreading',  label: 'Multithreading',        badge: '🧵' },
      { id: 'java-jvm',             label: 'JVM & Memory',          badge: '💾' },
    ]
  },
  {
    id: 'spring',
    label: '🍃 Spring & DB',
    modules: [
      { id: 'java-spring', label: 'Spring Boot',    badge: '🌱' },
      { id: 'java-rest',   label: 'REST APIs',      badge: '🌐' },
      { id: 'java-jpa',    label: 'JPA & Hibernate',badge: '💽' },
      { id: 'java-sql',    label: 'SQL for Java',   badge: '🗄️' },
    ]
  }
];

// ─────────────────────────────────────────────────────────────
// COLLAPSIBLE SECTION COMPONENT
// ─────────────────────────────────────────────────────────────
function Section({ title, icon: Icon, children, defaultOpen = false, accent = 'blue', forceOpen }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean; accent?: string; forceOpen?: boolean | null;
}) {
  const [open, setOpen] = useState(defaultOpen);

  React.useEffect(() => {
    if (forceOpen !== null && forceOpen !== undefined) {
      setOpen(forceOpen);
    }
  }, [forceOpen]);

  const colors: Record<string, string> = {
    blue: 'text-blue-400 border-blue-500/30',
    green: 'text-green-400 border-green-500/30',
    yellow: 'text-yellow-400 border-yellow-500/30',
    purple: 'text-purple-400 border-purple-500/30',
    red: 'text-red-400 border-red-500/30',
    cyan: 'text-cyan-400 border-cyan-500/30',
  };
  const color = colors[accent] || colors.blue;
  return (
    <div className={`rounded-xl border ${color.split(' ')[1]} bg-slate-800/50 mb-4 overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-700/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${color.split(' ')[0]}`} />
          <span className="font-semibold text-slate-100 text-base">{title}</span>
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-slate-400" />
          : <ChevronRight className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-slate-700/50 pt-4">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────
export default function JavaModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeModule, setActiveModule] = useState(moduleId || 'java-fundamentals');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    fundamentals: true,
    oop: true,
    collections: false,
    advanced: false,
    spring: false,
  });
  const [forceExpandAll, setForceExpandAll] = useState<boolean | null>(null);

  React.useEffect(() => {
    const p = getJavaProgress();
    setCompleted(p.lessonsCompleted);
  }, []);

  React.useEffect(() => {
    if (moduleId) {
      setActiveModule(moduleId);
      // Auto-expand category containing current module
      const cat = SIDEBAR_CATEGORIES.find(c => c.modules.some(m => m.id === moduleId));
      if (cat) {
        setExpandedCategories(prev => ({ ...prev, [cat.id]: true }));
      }
    }
  }, [moduleId]);

  const lesson = LESSON_CONTENT[activeModule];
  const moduleInfo = JAVA_MODULES.find(m => m.id === activeModule);
  const isDone = completed.includes(activeModule);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const handleMarkDone = () => {
    markLessonComplete(activeModule);
    setCompleted(prev => [...prev, activeModule]);
  };

  const handleTopicClick = (id: string) => {
    setActiveModule(id);
    navigate(`/java/module/${id}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">

      {/* ── LEFT SIDEBAR ── */}
      <aside className="w-72 min-h-screen bg-slate-800 border-r border-slate-700 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <Link to="/java" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Java Dashboard
          </Link>
          <span className="text-xs font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded">
            {completed.length}/20 Done
          </span>
        </div>

        {/* Sidebar Topics Menu */}
        <div className="p-3 space-y-2">
          {SIDEBAR_CATEGORIES.map(category => {
            const isCatOpen = expandedCategories[category.id];
            const hasActiveModule = category.modules.some(m => m.id === activeModule);

            return (
              <div key={category.id} className="rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900/40">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    hasActiveModule ? 'text-emerald-300 bg-slate-750' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {category.label}
                    <span className="text-[10px] text-slate-500 font-normal">({category.modules.length})</span>
                  </span>
                  {isCatOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </button>

                {isCatOpen && (
                  <div className="p-1 space-y-0.5 bg-slate-900/70 border-t border-slate-800">
                    {category.modules.map(m => {
                      const done = completed.includes(m.id);
                      const active = m.id === activeModule;
                      return (
                        <button
                          key={m.id}
                          onClick={() => handleTopicClick(m.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between gap-2 text-xs font-medium ${
                            active
                              ? 'bg-emerald-600/25 text-emerald-300 border border-emerald-500/40 font-semibold'
                              : 'hover:bg-slate-700/70 text-slate-300'
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span>{m.badge}</span>
                            <span className="truncate">{m.label}</span>
                          </span>
                          {done && <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Tools */}
          <div className="mt-4 pt-4 border-t border-slate-700/80">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">⚡ Quick Links</p>
            <Link to={`/java/mcq/${activeModule}`}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <Star className="w-3.5 h-3.5 text-yellow-400" /> Practice MCQs
            </Link>
            <Link to="/java/mock-interview"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <Coffee className="w-3.5 h-3.5 text-orange-400" /> Mock Interview
            </Link>
            <Link to="/java/revision"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Revision Mode
            </Link>
            <Link to="/java/flashcards"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-2 block">
              <List className="w-3.5 h-3.5 text-purple-400" /> Flashcards
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">Java Topic Lesson</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                {moduleInfo?.title || activeModule}
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  moduleInfo?.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                  moduleInfo?.difficulty === 'Hard' ? 'bg-red-900/50 text-red-400' :
                  'bg-yellow-900/50 text-yellow-400'
                }`}>{moduleInfo?.difficulty || 'Beginner'}</span>
                <span>⏱ {moduleInfo?.estimatedMinutes || 45} mins</span>
                {isDone && <span className="text-green-400 flex items-center gap-1 text-xs font-semibold bg-green-900/30 px-2 py-0.5 rounded"><CheckCircle className="w-3.5 h-3.5" /> Learned</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setForceExpandAll(prev => prev === true ? false : true)}
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Expand or collapse all sections"
              >
                {forceExpandAll === true ? 'Collapse All' : 'Expand All'}
              </button>
              <button
                onClick={handleMarkDone}
                disabled={isDone}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isDone
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30 cursor-default'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                }`}
              >
                {isDone ? '✓ Completed' : 'Mark as Learned'}
              </button>
            </div>
          </div>

          {lesson ? (
            <>
              {/* Intro */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 mb-6">
                <p className="text-slate-300 leading-relaxed text-sm">{lesson.intro}</p>
              </div>

              {/* Key Concepts */}
              <Section title="📘 Key Concepts & Definitions" icon={BookOpen} defaultOpen={true} accent="blue" forceOpen={forceExpandAll}>
                <div className="grid md:grid-cols-2 gap-3">
                  {lesson.keyConcepts.map((c, i) => (
                    <div key={i} className="bg-slate-900/70 rounded-lg p-4 border border-slate-700/60">
                      <h3 className="font-bold text-blue-300 text-sm mb-1">{c.term}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">{c.definition}</p>
                      {c.example && (
                        <code className="text-xs text-emerald-400 bg-slate-950 px-2 py-1 rounded mt-2 block border border-slate-800">{c.example}</code>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Code Examples */}
              <Section title="💻 Code Examples & Tracing" icon={Code} defaultOpen={true} accent="green" forceOpen={forceExpandAll}>
                <div className="space-y-5">
                  {lesson.codeExamples.map((ex, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-slate-700">
                      <div className="bg-slate-750 px-4 py-2 text-xs font-semibold text-slate-300 flex items-center gap-2 border-b border-slate-700">
                        <Code className="w-3.5 h-3.5 text-emerald-400" /> {ex.title}
                      </div>
                      <pre className="bg-slate-950 p-4 text-xs text-green-300 overflow-x-auto whitespace-pre-wrap leading-relaxed font-mono">
                        <code>{ex.code}</code>
                      </pre>
                      {ex.output && (
                        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Output:</span>
                          <pre className="text-emerald-400 text-xs mt-1 whitespace-pre-wrap font-mono">{ex.output}</pre>
                        </div>
                      )}
                      {ex.note && (
                        <div className="bg-yellow-900/20 border-t border-yellow-500/20 px-4 py-2">
                          <p className="text-yellow-300 text-xs">💡 {ex.note}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>

              {/* Common Mistakes */}
              <Section title="⚠️ Common Traps & Mistakes" icon={AlertTriangle} accent="red" forceOpen={forceExpandAll}>
                <ul className="space-y-2.5">
                  {lesson.commonMistakes.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-red-950/20 p-2.5 rounded-lg border border-red-900/30">
                      <span className="text-red-400 font-bold mt-0.5 flex-shrink-0">✗</span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Interview Tips */}
              <Section title="🎯 Freshers Interview Tips" icon={Target} accent="purple" forceOpen={forceExpandAll}>
                <ul className="space-y-2.5">
                  {lesson.interviewTips.map((tip, i) => (
                    <li key={i} className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
                      <span className="text-purple-300 font-bold">💬 Pro Tip: </span>{tip}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Interview Q&A */}
              <Section title="❓ Common Interview Questions & Answers" icon={Lightbulb} accent="yellow" forceOpen={forceExpandAll}>
                <div className="space-y-3">
                  {lesson.interviewQuestions.map((qa, i) => (
                    <div key={i} className="bg-slate-900/70 rounded-lg border border-slate-700/60 overflow-hidden">
                      <div className="px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
                        <p className="font-semibold text-yellow-300 text-xs">Q: {qa.q}</p>
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-slate-300 text-xs leading-relaxed">A: {qa.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Revision Points */}
              <Section title="📌 Quick Revision Points" icon={RefreshCw} accent="cyan" forceOpen={forceExpandAll}>
                <div className="grid sm:grid-cols-2 gap-2">
                  {lesson.revisionPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs bg-slate-900/40 p-2 rounded border border-slate-800">
                      <span className="text-cyan-400 flex-shrink-0 font-bold">•</span>
                      <span className="text-slate-300">{pt}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          ) : (
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-300 font-semibold mb-2">Lesson for {moduleInfo?.title || activeModule}</p>
              <p className="text-slate-400 text-sm mb-4">Please select any topic from the menu on the left to start learning.</p>
              <div className="flex justify-center gap-3">
                <Link to={`/java/mcq/${activeModule}`} className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-lg font-medium">
                  Practice MCQs
                </Link>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-slate-800">
            <Link
              to={`/java/mcq/${activeModule}`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Star className="w-4 h-4" /> Practice MCQs for This Topic
            </Link>
            <Link
              to="/java/mock-interview"
              className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Coffee className="w-4 h-4 text-orange-400" /> Mock Interview
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
