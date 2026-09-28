import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 7: METHODS IN JAVA CAPSTONE (LESSON 7.4)
// ============================================================
export const methodsChallenge_lessons: Record<string, DetailedLesson> = {
  "methods-challenge": {
    "id": "methods-challenge",
    "moduleId": "java-methods",
    "moduleTitle": "7. Methods in Java",
    "lessonNumber": "Lesson 7.4",
    "title": "Module 7 Challenge & Interview Assessment",
    "subtitle": "Strict pass-by-value semantics, stack frame execution boundaries, method signature contracts, ambiguous overloading resolution, varargs bytecode mechanics, and recursion base cases",
    "estimatedMinutes": 25,
    "beginnerAnalogy": "In the Java Language Specification (JLS §§8.4, 8.4.8, 15.12), methods declare executable behavioral contracts bound to classes or instances, encapsulating operations within private execution scopes. Java enforces strict, universal pass-by-value evaluation semantics for all method arguments without exception: whether passing a primitive literal (e.g., int, double) or an object reference variable, Java evaluates the argument expression, copies the raw binary bits of the value into formal parameter registers in the target method's stack frame, and executes the body within an isolated activation record.\n\nAt the JVM execution layer, invoking a method pushes a new stack frame onto the current thread's private JVM call stack. The frame contains the Local Variable Array, the Operand Stack, and a Reference to the Run-Time Constant Pool. Invocation dispatch utilizes four primary opcodes: invokestatic (for class methods), invokespecial (for private methods, constructors, and super calls), invokevirtual (for standard dynamic dispatch using the receiver's vtable), and invokeinterface (for interface table lookups). For method overloading, the compiler resolves method signatures at compile time through a strict three-phase hierarchy: Phase 1 evaluates subtyping without boxing or varargs; Phase 2 permits autoboxing/unboxing; Phase 3 permits variable arity (varargs).\n\nIn enterprise software architectures, method contracts define API surfaces, transaction boundaries, and thread-safety limits. Misunderstanding pass-by-value leads to catastrophic defects where developers expect reassigning a parameter reference to mutate the caller's pointer, or mutate shared object graphs unexpectedly without defensive copying. Furthermore, incorrect overloading resolution between boxed types and varargs can introduce silent runtime bugs and regression failures under high-concurrency production workloads.",
    "coreExplanation": [
      "Universal Pass-by-Value Semantics: Java is strictly pass-by-value. When an argument is passed, its exact binary bit pattern is copied into the method's local variable slot. For primitives, the numerical bits are copied. For objects, the memory address pointer bits are copied. The caller's reference variable and the parameter reference variable are two distinct slots on the stack containing identical heap addresses.",
      "Reference Reassignment vs Heap State Mutation: Reassigning a parameter reference (`param = new Object()`) overwrites only the local stack frame register, having zero effect on the caller's original reference. Conversely, invoking a mutator method (`param.setName(\"Alice\")`) dereferences the shared heap memory address, modifying the object visible to the caller.",
      "Method Signature Composition: In the JLS, a method signature consists strictly of the method identifier name and the sequence of its formal parameter types. Return type, access modifiers, parameter names, and throws clauses are excluded from signature equality, which is why methods cannot be overloaded by differing return types alone.",
      "Three-Phase Overload Resolution Hierarchy (JLS §15.12.2): Javac resolves overloaded methods at compile time using three distinct phases: Phase 1: Subtyping and widening without boxing or variable arity. Phase 2: Widening with autoboxing or unboxing. Phase 3: Variable arity (varargs). The compiler selects the most specific applicable method in the earliest successful phase.",
      "Ambiguous Invocation Compiler Trap: If multiple overloaded methods qualify in the same phase without one being strictly more specific than the others (e.g. `test(Integer, int)` vs `test(int, Integer)` called with `test(1, 2)`), javac aborts with an 'ambiguous method call' compilation error.",
      "Varargs (`...`) Bytecode Implementation: Variable arity parameters (`Type... name`) are syntactic sugar. Javac compiles `foo(String... args)` into `foo(String[] args)`. At the call site, the compiler synthesizes array creation bytecode (`anewarray`), populating it with arguments before passing the array reference.",
      "Stack Frame Lifecycle & O(1) Allocation: Every method invocation allocates a stack frame inside the thread's execution stack memory. Stack frame allocation and deallocation occur in O(1) time simply by adjusting the CPU stack pointer register.",
      "Covariant Return Types (Java 5+): A subclass overriding a method can declare a return type that is a subtype of the return type declared in the superclass. In bytecode, javac synthesizes a synthetic bridge method with the superclass return type to satisfy JVM verifier requirements."
    ],
    "codeSnippet": {
      "title": "Pass-by-Value Semantics & Method Overload Resolution",
      "code": "public class MethodMastery {\n    static class Person {\n        String name;\n        Person(String name) { this.name = name; }\n    }\n\n    // 1. Pass-by-Value Proof\n    public static void modify(Person p, int num) {\n        num = 100;                 // Modifies local stack slot only\n        p.name = \"Modified State\"; // Mutates shared heap object\n        p = new Person(\"New\");     // Reassigns local pointer only\n    }\n\n    // 2. Overload Resolution: Widening vs Boxing vs Varargs\n    public static String dispatch(long x) { return \"widening-long\"; }\n    public static String dispatch(Integer x) { return \"boxing-Integer\"; }\n    public static String dispatch(int... x) { return \"varargs-int\"; }\n\n    public static void main(String[] args) {\n        Person person = new Person(\"Original\");\n        int val = 42;\n        modify(person, val);\n        System.out.println(\"val: \" + val);\n        System.out.println(\"person.name: \" + person.name);\n\n        int primitiveInt = 5;\n        // Phase 1 (widening to long) beats Phase 2 (boxing to Integer)\n        System.out.println(\"dispatch(int): \" + dispatch(primitiveInt));\n    }\n}",
      "lineByLineExplanation": [
        {
          "line": "modify(person, val);",
          "explanation": "Passes copies of val's bits (42) and person's heap pointer address."
        },
        {
          "line": "num = 100;",
          "explanation": "Changes local parameter num in modify's stack frame; caller's val remains 42."
        },
        {
          "line": "p.name = \"Modified State\";",
          "explanation": "Dereferences shared heap address, modifying the Person object on the heap."
        },
        {
          "line": "p = new Person(\"New\");",
          "explanation": "Overwrites local stack slot p with a new address; caller's person reference is unaffected."
        },
        {
          "line": "dispatch(primitiveInt);",
          "explanation": "JLS Phase 1 selects widening to long over Phase 2 boxing to Integer."
        }
      ],
      "output": "val: 42\nperson.name: Modified State\ndispatch(int): widening-long"
    },
    "beginnerMistakes": [
      {
        "mistake": "Believing Java uses pass-by-reference for objects.",
        "whyItHappens": "Because mutating an object inside a method affects the caller's object, developers confuse reference passing with pass-by-reference.",
        "howToFix": "Recognize that the object reference itself is passed by value (a copy of the address pointer). Reassigning the parameter cannot change the caller's pointer.",
        "codeSnippet": "// In Java, swapping two objects via a method is impossible:\npublic static void swap(Person a, Person b) {\n    Person temp = a; a = b; b = temp; // Swaps local stack variables only!\n}"
      },
      {
        "mistake": "Attempting to overload a method solely by changing its return type.",
        "whyItHappens": "Developers assume return type is part of the method signature.",
        "howToFix": "Method signatures in Java consist strictly of the method name and parameter types. Overloaded methods must differ in parameter types or count.",
        "codeSnippet": "// COMPILE ERROR: method already defined\npublic int calculate(int x) { return x; }\npublic double calculate(int x) { return (double) x; }"
      },
      {
        "mistake": "Placing the varargs parameter before other parameters.",
        "whyItHappens": "Not knowing the JLS grammar rule for variable arity.",
        "howToFix": "Varargs (`Type...`) must always be the last parameter in the method declaration, and only one varargs parameter is allowed per method.",
        "codeSnippet": "// WRONG: public void log(String... messages, int level)\n// CORRECT: public void log(int level, String... messages)"
      },
      {
        "mistake": "Unintentional call-site array allocation inside high-throughput varargs loops.",
        "whyItHappens": "Not realizing that each invocation of a varargs method allocates a new array on the heap.",
        "howToFix": "Provide specialized overloaded methods for common argument counts (e.g. 1, 2, or 3 arguments) to avoid array allocation in hot paths.",
        "codeSnippet": "// Hot path allocation trap:\npublic void log(String... args) { ... }\n// Preferred for performance:\npublic void log(String arg1) { ... }\npublic void log(String arg1, String arg2) { ... }"
      }
    ],
    "cheatSheet": {
      "summary": "Module 7 Methods in Java Technical Reference",
      "rules": [
        {
          "rule": "Universal Pass-by-Value",
          "explanation": "Java strictly passes the value of arguments: primitive bits for primitives, reference address bits for objects."
        },
        {
          "rule": "Method Signature Components",
          "explanation": "JLS §8.4.2 defines signature as strictly method identifier name + formal parameter type sequence."
        },
        {
          "rule": "Overload Phase Precedence",
          "explanation": "Phase 1 (Widening) > Phase 2 (Autoboxing/Unboxing) > Phase 3 (Varargs). Widening never crosses to boxing."
        },
        {
          "rule": "Varargs Parameter Position",
          "explanation": "Varargs (Type...) must be the final formal parameter in a method declaration."
        },
        {
          "rule": "Definite Return Requirement",
          "explanation": "Every possible execution branch in a non-void method must terminate with a return statement or throw an exception."
        },
        {
          "rule": "Stack Frame Isolation",
          "explanation": "Each method invocation allocates an isolated activation record on the thread stack, popped upon return."
        },
        {
          "rule": "Covariant Return Types",
          "explanation": "Subclass overriding methods may return a narrower subtype of the superclass method return type."
        },
        {
          "rule": "Static Method Hiding vs Overriding",
          "explanation": "Static methods are resolved at compile time via reference type (method hiding), not dynamically dispatched."
        }
      ],
      "quickComparison": [
        {
          "aspect": "Parameter Evaluation",
          "optionA": "Primitives: copies raw value bits",
          "optionB": "Objects: copies 32/64-bit heap address reference pointer"
        },
        {
          "aspect": "Overloading vs Overriding",
          "optionA": "Overloading: resolved at compile time (static dispatch)",
          "optionB": "Overriding: resolved at runtime (dynamic vtable dispatch)"
        },
        {
          "aspect": "Widening vs Boxing",
          "optionA": "Widening: int -> long (Phase 1, preferred)",
          "optionB": "Boxing: int -> Integer (Phase 2, fallback)"
        },
        {
          "aspect": "Varargs vs Array",
          "optionA": "Varargs: accepts comma-separated list or array directly",
          "optionB": "Explicit array: caller must construct array explicitly"
        },
        {
          "aspect": "Dispatch Opcodes",
          "optionA": "invokestatic: no receiver instance required",
          "optionB": "invokevirtual: checks receiver runtime type via vtable"
        }
      ]
    },
    "practiceProblems": [
      {
        "title": "Puzzle 1: Primitive Parameter Independence",
        "problemStatement": "What is the console output of this program demonstrating pass-by-value on primitive integers?",
        "code": "public class Problem1 {\n    public static void doubleValue(int n) {\n        n *= 2;\n    }\n    public static void main(String[] args) {\n        int x = 25;\n        doubleValue(x);\n        System.out.println(x);\n    }\n}",
        "options": [
          "25",
          "50",
          "0",
          "Compile Error"
        ],
        "correctOptionIndex": 0,
        "hint": "Java passes a copy of x's value (25) to doubleValue. Does modifying the copy alter x?",
        "solution": "Output: 25",
        "explanation": "Java evaluates arguments by value. `doubleValue` receives a copy of 25 in its local stack frame. Modifying `n` has zero effect on `x` in the caller's stack frame."
      },
      {
        "title": "Puzzle 2: Object Reference Reassignment Trap",
        "problemStatement": "What is printed by this program after attempting to reassign an object reference?",
        "code": "public class Problem2 {\n    static class Box {\n        int val = 10;\n    }\n    public static void changeBox(Box b) {\n        b = new Box();\n        b.val = 50;\n    }\n    public static void main(String[] args) {\n        Box box = new Box();\n        changeBox(box);\n        System.out.println(box.val);\n    }\n}",
        "options": [
          "10",
          "50",
          "null",
          "NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "`b = new Box()` overwrites only the local parameter pointer `b`. It does not redirect the caller's `box` variable.",
        "solution": "Output: 10",
        "explanation": "Inside `changeBox`, `b` is a copy of the pointer to the original Box. Executing `b = new Box()` rebinds the local slot `b` to a new object. The original `box` in `main` still points to the original object with val = 10."
      },
      {
        "title": "Puzzle 3: Method Overload Widening vs Boxing",
        "problemStatement": "Which overloaded method is executed when passing an `int` literal 5?",
        "code": "public class Problem3 {\n    public static void test(long x) { System.out.println(\"long\"); }\n    public static void test(Integer x) { System.out.println(\"Integer\"); }\n    public static void main(String[] args) {\n        test(5);\n    }\n}",
        "options": [
          "long",
          "Integer",
          "Compile Error: ambiguous invocation",
          "Runtime Exception"
        ],
        "correctOptionIndex": 0,
        "hint": "Phase 1 (widening without boxing) takes precedence over Phase 2 (autoboxing).",
        "solution": "Output: long",
        "explanation": "Per JLS §15.12.2, Phase 1 tests widening conversions (int to long) without boxing. Since widening succeeds, test(long) is selected before Phase 2 (autoboxing to Integer) is ever considered."
      },
      {
        "title": "Puzzle 4: Varargs vs Exact Overload Match",
        "problemStatement": "Which method is invoked for `printNumbers(1, 2)`?",
        "code": "public class Problem4 {\n    public static void printNumbers(int a, int b) { System.out.println(\"exact\"); }\n    public static void printNumbers(int... nums) { System.out.println(\"varargs\"); }\n    public static void main(String[] args) {\n        printNumbers(1, 2);\n    }\n}",
        "options": [
          "exact",
          "varargs",
          "Compile Error: ambiguous method call",
          "Prints both"
        ],
        "correctOptionIndex": 0,
        "hint": "Fixed-arity methods (exact matches) take precedence over variable-arity methods.",
        "solution": "Output: exact",
        "explanation": "Phase 1 finds the exact fixed-arity match `printNumbers(int, int)`. Varargs methods are only considered in Phase 3 if no fixed-arity method matches."
      },
      {
        "title": "Puzzle 5: Ambiguous Overloading Compilation Failure",
        "problemStatement": "What is the compiler behavior for the following code?",
        "code": "public class Problem5 {\n    public static void process(int a, long b) {}\n    public static void process(long a, int b) {}\n    public static void main(String[] args) {\n        process(10, 20);\n    }\n}",
        "options": [
          "Compile Error: reference to process is ambiguous",
          "Calls process(int, long)",
          "Calls process(long, int)",
          "Runtime Exception"
        ],
        "correctOptionIndex": 0,
        "hint": "10, 20 can be converted to (int, long) or (long, int) equally via widening. Neither method is more specific.",
        "solution": "Output: Compile Error",
        "explanation": "Both methods require widening one int argument to long. Since neither method signature is strictly more specific than the other, javac flags an 'ambiguous method call' error."
      },
      {
        "title": "Puzzle 6: Array Mutation Through Parameter Copy",
        "problemStatement": "What is printed after passing an array to a method that mutates index 0?",
        "code": "public class Problem6 {\n    public static void mutate(int[] arr) {\n        arr[0] = 999;\n    }\n    public static void main(String[] args) {\n        int[] numbers = {1, 2, 3};\n        mutate(numbers);\n        System.out.println(numbers[0]);\n    }\n}",
        "options": [
          "999",
          "1",
          "0",
          "NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "numbers passes a copy of the array reference. Both pointers target the identical heap array.",
        "solution": "Output: 999",
        "explanation": "Because Java passes the reference by value, `mutate` receives a pointer to the original array. Modifying `arr[0]` directly mutates the heap memory, reflected in `numbers[0]`."
      },
      {
        "title": "Puzzle 7: Static Method Hiding",
        "problemStatement": "What is printed when invoking a hidden static method through a superclass reference?",
        "code": "class Parent {\n    public static void greet() { System.out.println(\"Parent\"); }\n}\nclass Child extends Parent {\n    public static void greet() { System.out.println(\"Child\"); }\n}\npublic class Problem7 {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.greet();\n    }\n}",
        "options": [
          "Parent",
          "Child",
          "Compile Error",
          "ClassCastException"
        ],
        "correctOptionIndex": 0,
        "hint": "Static methods cannot be overridden dynamically; they are hidden and bound at compile time to the reference type.",
        "solution": "Output: Parent",
        "explanation": "Static method invocations are bound at compile time based on the declared type of the reference (`Parent`). Javac emits `invokestatic Parent.greet()`, ignoring the runtime instance type `Child`."
      },
      {
        "title": "Puzzle 8: Varargs Invocation with Array vs Null",
        "problemStatement": "What does this varargs call print when passed an explicit array versus null?",
        "code": "public class Problem8 {\n    public static void check(Object... args) {\n        System.out.println(args == null ? \"null\" : args.length);\n    }\n    public static void main(String[] args) {\n        check((Object[]) null);\n    }\n}",
        "options": [
          "null",
          "0",
          "1",
          "NullPointerException"
        ],
        "correctOptionIndex": 0,
        "hint": "Casting null to (Object[]) passes null directly as the array argument rather than wrapping null in a single-element array.",
        "solution": "Output: null",
        "explanation": "When null is explicitly cast to `(Object[])`, the compiler does not synthesize a wrapper array; it passes null directly as the varargs array reference, printing \"null\"."
      },
      {
        "title": "Puzzle 9: Method Return Definite Assignment in Loops",
        "problemStatement": "What is the compiler behavior of this method?",
        "code": "public class Problem9 {\n    public static int getNumber(int x) {\n        while (x > 0) {\n            return x;\n        }\n    }\n}",
        "options": [
          "Compile Error: missing return statement",
          "Compiles cleanly",
          "Returns 0 if x <= 0",
          "Throws an exception at runtime"
        ],
        "correctOptionIndex": 0,
        "hint": "If x <= 0, does the method have a return statement?",
        "solution": "Output: Compile Error",
        "explanation": "Per JLS §8.4.7, every non-void method must definitely return along all execution paths. Because the while loop condition is not a compile-time constant true, execution can bypass the loop body, leaving the method without a return."
      },
      {
        "title": "Puzzle 10: Covariant Return Dynamic Dispatch",
        "problemStatement": "What is printed when calling an overridden method with a covariant return type?",
        "code": "class SuperType {\n    public CharSequence get() { return \"Super\"; }\n}\nclass SubType extends SuperType {\n    @Override\n    public String get() { return \"Sub\"; }\n}\npublic class Problem10 {\n    public static void main(String[] args) {\n        SuperType obj = new SubType();\n        System.out.println(obj.get());\n    }\n}",
        "options": [
          "Sub",
          "Super",
          "Compile Error",
          "ClassCastException"
        ],
        "correctOptionIndex": 0,
        "hint": "Overriding methods with covariant returns are dispatched dynamically via the vtable at runtime.",
        "solution": "Output: Sub",
        "explanation": "At runtime, `obj` points to an instance of `SubType`. The virtual method invocation (`invokevirtual`) dispatches to `SubType.get()`, which returns \"Sub\"."
      }
    ],
    "miniQuiz": [
      {
        "id": "mq-74-1",
        "question": "Which of the following describes Java's parameter passing evaluation semantics?",
        "options": [
          "Strictly pass-by-value for all types (both primitives and object references)",
          "Pass-by-value for primitives, pass-by-reference for objects",
          "Pass-by-reference for all objects and arrays",
          "Pass-by-name for lambda parameters"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Java is unconditionally pass-by-value. Primitives pass a copy of their numeric bits; object parameters pass a copy of their reference address pointer."
      },
      {
        "id": "mq-74-2",
        "question": "What elements strictly constitute a method signature in the Java Language Specification (JLS §8.4.2)?",
        "options": [
          "Method identifier name and formal parameter types in order",
          "Method name, parameter types, and return type",
          "Method name, parameter types, access modifier, and throws clause",
          "Parameter names and return type"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "JLS §8.4.2 explicitly defines a method signature as consisting only of the method name and the sequence of parameter types."
      },
      {
        "id": "mq-74-3",
        "question": "In method overloading resolution, which phase has higher precedence?",
        "options": [
          "Widening without autoboxing (Phase 1)",
          "Autoboxing with widening (Phase 2)",
          "Variable arity / varargs (Phase 3)",
          "They share identical precedence"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §15.12.2, Phase 1 (widening) takes priority over Phase 2 (boxing/unboxing), which takes priority over Phase 3 (varargs)."
      },
      {
        "id": "mq-74-4",
        "question": "What happens if two overloaded methods are both applicable in the same resolution phase with neither being more specific?",
        "options": [
          "Compile error: reference to method is ambiguous",
          "The JVM chooses the first declared method",
          "The JVM chooses the method with fewer parameters",
          "A NoSuchMethodError is thrown at runtime"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Ambiguity during overload resolution is caught at compile time; javac emits an ambiguous method invocation error."
      },
      {
        "id": "mq-74-5",
        "question": "How does the Java compiler implement a variable arity parameter (`int... nums`) at the bytecode level?",
        "options": [
          "It translates the parameter into a standard array `int[] nums`",
          "It creates a java.util.List internally",
          "It stores parameters in thread-local memory",
          "It expands the call into multiple method overloads"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Varargs is compile-time syntactic sugar that compiles to an array type; call sites allocate and pass an array."
      },
      {
        "id": "mq-74-6",
        "question": "Can a method be overloaded simply by having a different return type with identical parameter types?",
        "options": [
          "No, methods cannot be overloaded by return type alone",
          "Yes, the compiler infers the return type from caller context",
          "Yes, if marked with @Override",
          "Yes, if the return types are primitives"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Because return type is not part of the method signature, having identical parameter lists causes a 'method already defined' compile error."
      },
      {
        "id": "mq-74-7",
        "question": "What is the consequence of reassigning a parameter variable `p = null;` inside a method?",
        "options": [
          "It overwrites only the local parameter slot on the stack; the caller's reference remains unchanged",
          "The caller's variable also becomes null",
          "The referenced heap object is garbage collected immediately",
          "A NullPointerException is thrown"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Because Java passes references by value, reassigning the parameter modifies only the local stack frame register."
      },
      {
        "id": "mq-74-8",
        "question": "What bytecode instruction is used to invoke standard public or protected instance methods in Java?",
        "options": [
          "invokevirtual",
          "invokestatic",
          "invokespecial",
          "invokedynamic"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`invokevirtual` performs dynamic method dispatch by looking up the receiver's runtime class vtable."
      },
      {
        "id": "mq-74-9",
        "question": "What is a 'covariant return type' in Java method overriding?",
        "options": [
          "An overriding method declaring a return type that is a subtype of the superclass method's return type",
          "A method returning multiple values simultaneously",
          "A return type that varies based on input arguments",
          "A method that returns void"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Java 5+ allows overriding methods to narrow the return type to a more specific subclass of the original return type."
      },
      {
        "id": "mq-74-10",
        "question": "Where must the varargs ellipsis (`...`) appear in a method parameter list?",
        "options": [
          "Exclusively as the last parameter in the declaration",
          "As the first parameter",
          "Anywhere in the parameter list",
          "Both at the beginning and the end"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Per JLS §8.4.1, only the last formal parameter in a method declaration can be a variable arity parameter."
      },
      {
        "id": "mq-74-11",
        "question": "Can you declare more than one varargs parameter in a single method signature?",
        "options": [
          "No, at most one varargs parameter is permitted per method",
          "Yes, up to 2 varargs parameters",
          "Yes, if they have different types",
          "Yes, in interface default methods"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Java grammar strictly limits method declarations to at most one varargs parameter, which must occupy the terminal position."
      },
      {
        "id": "mq-74-12",
        "question": "What happens when a static method is declared with the same signature in both a parent class and a child class?",
        "options": [
          "The child method hides the parent method (method hiding, resolved statically at compile time)",
          "The child method overrides the parent method dynamically",
          "The compiler reports an ambiguous override error",
          "The child method cannot be invoked"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Static methods cannot be overridden dynamically; the child method merely hides the parent method based on compile-time reference type."
      },
      {
        "id": "mq-74-13",
        "question": "What is the memory structure pushed onto the thread call stack during a method invocation called?",
        "options": [
          "Stack Frame (Activation Record)",
          "Heap Segment",
          "Method Table",
          "Constant Pool Cache"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Each method invocation allocates an isolated stack frame containing local variables, operand stack, and frame data."
      },
      {
        "id": "mq-74-14",
        "question": "Why does `swap(Integer a, Integer b)` fail to swap two variables in Java?",
        "options": [
          "Because references are passed by value and Integer objects are immutable",
          "Because Integer cannot be passed to methods",
          "Because Integer caching prevents swapping",
          "Because Java methods cannot take two parameters"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "Reassigning reference parameters modifies only local copies of pointers, and Integer value fields are private and immutable."
      },
      {
        "id": "mq-74-15",
        "question": "What bytecode instruction is emitted for private methods and superclass constructor calls?",
        "options": [
          "invokespecial",
          "invokevirtual",
          "invokestatic",
          "invokeinterface"
        ],
        "correctIndex": 0,
        "correctOptionIndex": 0,
        "explanation": "`invokespecial` invokes constructors (`<init>`), private methods, and `super` methods using static dispatch."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Explain Java's pass-by-value evaluation model for both primitive types and object references.",
        "expectedAnswer": "Java evaluates all method arguments strictly pass-by-value. When an argument is evaluated, its raw binary bit pattern is copied into a local parameter register within the newly allocated stack frame. For primitive types (int, double, boolean), the numeric bits are copied directly; changes to the formal parameter inside the method have zero effect on the caller's variable. For object references (e.g. `String`, `List`, custom classes), the value copied is the 32-bit or 64-bit memory address pointing to the object on the heap. Therefore, the parameter is an independent reference variable holding a copy of the pointer. Reassigning the parameter (`p = new Object()`) changes only the local copy, leaving the caller's reference intact. However, dereferencing the pointer to mutate internal state (`p.setName(...)`) alters the shared heap object.",
        "followUp": "How would you explain this in an interview to prove Java is not pass-by-reference?",
        "followUpAnswer": "Provide a swap method: `swap(Person a, Person b) { Person t = a; a = b; b = t; }`. In true pass-by-reference languages (like C++ or C# with `ref`), the caller's variables would be swapped; in Java, the caller's variables remain completely unchanged.",
        "commonMistake": "Saying 'primitives are pass-by-value, but objects are pass-by-reference'.",
        "commonMistakeAnswer": "This is fundamentally false; object references themselves are passed by value.",
        "keyPhrases": [
          "universal pass-by-value",
          "pointer bit-pattern copying",
          "heap address dereferencing vs pointer reassignment",
          "swap method impossibility proof"
        ]
      },
      {
        "question": "Describe the three phases of method overload resolution defined in JLS §15.12.2.",
        "expectedAnswer": "Javac resolves overloaded method invocations in three distinct sequential phases: Phase 1: Subtyping and widening without autoboxing or variable arity (e.g. `int` matches `long` or `double`). Phase 2: Overload resolution permitting autoboxing or unboxing, but excluding variable arity (e.g. `int` matches `Integer`). Phase 3: Overload resolution permitting variable arity (varargs, e.g. `int...`). The compiler evaluates all declared methods in Phase 1; if any applicable method is found, it terminates and selects the most specific match without ever proceeding to Phase 2. This design prioritizes backward compatibility with pre-Java 5 code.",
        "followUp": "Why does `test(long)` win over `test(Integer)` when called with `test(5)`?",
        "followUpAnswer": "Because `test(long)` succeeds in Phase 1 via primitive widening, whereas `test(Integer)` requires autoboxing in Phase 2.",
        "commonMistake": "Assuming boxing is tried before widening.",
        "commonMistakeAnswer": "Java rules explicitly prioritize widening over boxing to protect legacy type hierarchies.",
        "keyPhrases": [
          "JLS §15.12.2 three-phase resolution",
          "Phase 1: subtyping and widening",
          "Phase 2: autoboxing and unboxing",
          "Phase 3: variable arity (varargs)"
        ]
      },
      {
        "question": "What is the difference between method overloading and method overriding in memory, dispatch, and binding?",
        "expectedAnswer": "Method overloading occurs within the same class (or across inheritance) where methods share the same name but have different parameter type signatures. Overloading is resolved entirely at compile time (static binding) based on the declared reference types of arguments. Javac writes the resolved signature directly into the bytecode call site. Method overriding occurs when a subclass provides a specific implementation of an inherited instance method with the exact same signature. Overriding is resolved dynamically at runtime (dynamic binding) using the `invokevirtual` opcode and the receiver object's runtime Virtual Method Table (vtable), independent of the compile-time reference type.",
        "followUp": "Can private or final methods be overridden?",
        "followUpAnswer": "No. Private methods are not visible to subclasses, and final methods explicitly forbid overriding; both are dispatched via static binding using `invokespecial` or direct inlining.",
        "commonMistake": "Thinking overridden methods are resolved at compile time.",
        "commonMistakeAnswer": "Overriding requires dynamic runtime polymorphism based on the actual heap object instance.",
        "keyPhrases": [
          "static compile-time binding (overloading)",
          "dynamic runtime vtable dispatch (overriding)",
          "method signature identity",
          "invokevirtual vs invokestatic/invokespecial"
        ]
      },
      {
        "question": "How do varargs work internally in Java bytecode, and what performance hazards do they introduce?",
        "expectedAnswer": "Varargs (`Type... args`) is syntactic sugar introduced in Java 5. In class files, javac declares the method with an array parameter (`Type[] args`) flagged with the `ACC_VARARGS` access flag. At every call site where arguments are passed, javac synthesizes bytecode to allocate a new array: `anewarray` (or primitive `newarray`), pops arguments into the array slots, and passes the array reference to the method. In high-frequency, ultra-low-latency loops (like logging or financial matching engines), invoking a varargs method millions of times per second generates millions of short-lived heap arrays, polluting young generation memory and triggering frequent Garbage Collection pauses.",
        "followUp": "How do high-performance libraries like Log4j2 or Guava avoid this varargs overhead?",
        "followUpAnswer": "They implement overloaded methods for common argument counts (e.g. `info(String)`, `info(String, Object)`, `info(String, Object, Object)`) and only fall back to varargs for 4 or more arguments.",
        "commonMistake": "Believing varargs passes arguments on the thread stack without heap allocation.",
        "commonMistakeAnswer": "Varargs always allocates a real Java array on the heap unless optimized away by JIT Escape Analysis.",
        "keyPhrases": [
          "ACC_VARARGS access flag",
          "call-site anewarray heap allocation",
          "young generation GC pressure",
          "fixed-parameter method overloading optimization"
        ]
      },
      {
        "question": "What is an ambiguous method invocation, and how does the compiler determine method specificity?",
        "expectedAnswer": "When an overloaded method call matches multiple candidate methods, the compiler attempts to determine which candidate is 'more specific' per JLS §15.12.2.5. Method M1 is more specific than M2 if any argument list acceptable to M1 can be passed to M2 without compile error (meaning M1's parameter types are subtypes or narrower than M2's). If neither method is strictly more specific—for instance, `void f(int a, double b)` and `void f(double a, int b)` called with `f(5, 5)`—the compiler cannot decide which widening is preferred and emits a compile-time error: 'reference to f is ambiguous'.",
        "followUp": "How do you resolve an ambiguous method invocation in client code?",
        "followUpAnswer": "Cast at least one argument explicitly to the desired target type: e.g. `f((int) 5, (double) 5)`.",
        "commonMistake": "Thinking the compiler picks the method declared first in source code order.",
        "commonMistakeAnswer": "Source code declaration order is completely ignored during overload resolution.",
        "keyPhrases": [
          "JLS §15.12.2.5 most specific method rule",
          "subtype applicability test",
          "ambiguous invocation compile error",
          "explicit argument type casting"
        ]
      },
      {
        "question": "Explain covariant return types in Java and the role of synthetic bridge methods.",
        "expectedAnswer": "Java 5 introduced covariant return types, allowing an overriding method in a subclass to return a subtype of the return type declared in the superclass (e.g., `SuperClass.get(): Number` and `SubClass.get(): Integer`). However, the JVM bytecode specification enforces that method descriptors include the return type, meaning the JVM treats `()Ljava/lang/Number;` and `()Ljava/lang/Integer;` as different methods. To maintain binary backward compatibility and polymorphism, javac automatically synthesizes a hidden 'bridge method' in the subclass: `public Number get() { return this.get(); }` flagged with `ACC_BRIDGE` and `ACC_SYNTHETIC`, delegating to the covariant method.",
        "followUp": "How can you observe synthetic bridge methods in production?",
        "followUpAnswer": "Using `javap -c -v SubClass` or reflection: `Method.isBridge()` returns `true`.",
        "commonMistake": "Assuming the JVM natively supports covariant return types without compiler assistance.",
        "commonMistakeAnswer": "The JVM verifier requires identical descriptors; javac bridges the difference with synthetic delegation.",
        "keyPhrases": [
          "covariant return type narrowing",
          "JVM method descriptor return type constraint",
          "synthetic bridge method generation",
          "ACC_BRIDGE and ACC_SYNTHETIC bytecode flags"
        ]
      },
      {
        "question": "What is the difference between static method hiding and instance method overriding?",
        "expectedAnswer": "Instance method overriding participates in runtime dynamic polymorphism: when an instance method is called, the JVM inspects the actual object on the heap and dispatches via `invokevirtual` using the receiver's vtable. Static methods belong to the class, not instance objects, and cannot be overridden. If a subclass declares a static method with the identical signature as a static method in its parent class, the child method 'hides' the parent method. Static invocations are bound at compile time based strictly on the declared reference type: `Parent p = new Child(); p.staticMethod();` executes `Parent.staticMethod()` because the compiler emits `invokestatic Parent.staticMethod()`. Calling static methods via object instances is an anti-pattern.",
        "followUp": "Can a static method hide an instance method, or vice-versa?",
        "followUpAnswer": "No. A compile error occurs if a class tries to declare a static method with the same signature as an inherited instance method (or an instance method matching an inherited static method).",
        "commonMistake": "Calling static methods on instance references expecting polymorphic behavior.",
        "commonMistakeAnswer": "Static methods are resolved at compile time via the reference type and ignore runtime instance polymorphism.",
        "keyPhrases": [
          "static method hiding",
          "compile-time static binding via invokestatic",
          "vtable dynamic dispatch exclusion",
          "class-level vs instance-level behavioral binding"
        ]
      },
      {
        "question": "Explain how stack frame memory is allocated and deallocated during recursive method execution.",
        "expectedAnswer": "When a thread invokes a method, the JVM pushes an activation record (stack frame) onto that thread's private runtime call stack. The frame size is determined at compile time and includes: the Local Variable Array (storing this reference, arguments, and local variables), the Operand Stack (for intermediate calculations), and Constant Pool reference data. In recursion, each nested recursive call pushes another independent stack frame. Memory allocation is instantaneous (incrementing the stack pointer). When the base case is reached, each frame returns and is instantly popped (decrementing the stack pointer) with zero garbage collection overhead. If recursion exceeds available stack memory (configured via `-Xss`), the JVM throws a `StackOverflowError`.",
        "followUp": "Does Java support Tail Call Optimization (TCO)?",
        "followUpAnswer": "No. The standard JVM (HotSpot) does not implement TCO, so every recursive call pushes a full stack frame regardless of whether the call is in tail position.",
        "commonMistake": "Thinking recursive stack frames allocate memory on the heap.",
        "commonMistakeAnswer": "Stack frames allocate on thread-private stack memory, not the garbage-collected heap.",
        "keyPhrases": [
          "thread call stack activation record",
          "Local Variable Array and Operand Stack",
          "-Xss stack memory sizing",
          "StackOverflowError on frame exhaustion"
        ]
      },
      {
        "question": "What is method inlining in the JVM HotSpot C2 compiler, and when does it occur?",
        "expectedAnswer": "Method inlining is one of the most critical JIT compiler optimizations. It replaces a method invocation call site directly with the bytecode body of the called method. This eliminates method call overhead (frame push/pop, parameter copying, branch instructions) and opens opportunities for further optimizations like loop unrolling, constant folding, and dead code elimination. HotSpot inlines methods automatically if they are small (typically < 35 bytes of bytecode for frequently called 'hot' methods, or < 325 bytes if trivial) and monomorphic (only one implementation exists at runtime).",
        "followUp": "How do megamorphic call sites affect method inlining?",
        "followUpAnswer": "If a call site invokes 3 or more different concrete implementations (megamorphic), the JIT cannot inline and must fall back to a full vtable lookup.",
        "commonMistake": "Manually inlining code in Java source files for micro-performance.",
        "commonMistakeAnswer": "The HotSpot JIT compiler inlines hot code much better than manual refactoring, which ruins code design and readability.",
        "keyPhrases": [
          "HotSpot C2 method inlining",
          "call-site elimination and constant folding",
          "monomorphic vs megamorphic dispatch",
          "bytecode size inlining threshold (< 35 bytes)"
        ]
      },
      {
        "question": "Why is the 'Return Early' / Guard Clause pattern preferred over deeply nested if-else statements inside methods?",
        "expectedAnswer": "The Guard Clause pattern evaluates error conditions, invalid arguments, or terminal boundary cases at the very beginning of a method and immediately returns (or throws an exception). This approach offers three major architectural advantages: 1) Readability: It eliminates deeply nested indentation (the 'arrow anti-pattern'), keeping the happy path linear and prominent at the lowest indentation level. 2) Cyclomatic Complexity: It reduces cognitive load by discharging edge cases up front. 3) Memory & Execution: It avoids unnecessary variable allocations and processing when preconditions are violated.",
        "followUp": "What is the relationship between Guard Clauses and the Bouncer Pattern?",
        "followUpAnswer": "They are synonymous: the method operates as a bouncer at an entryway, rejecting invalid requests immediately before allowing valid requests inside.",
        "commonMistake": "Insisting on the outdated 'Single Return Per Method' (SESE) rule in modern object-oriented languages.",
        "commonMistakeAnswer": "Single return was meant for C memory cleanups with goto; in Java, garbage collection and try-finally make early returns cleaner and safer.",
        "keyPhrases": [
          "guard clause pattern",
          "elimination of arrow anti-pattern indentation",
          "cyclomatic complexity reduction",
          "precondition validation up front"
        ]
      }
    ]
  }
};
