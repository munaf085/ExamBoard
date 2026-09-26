import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 22: JAVA 8+ STREAMS & LAMBDAS (LESSONS 22.1 & 22.2)
// Authoritative FAANG-Standard Java Streams & Lambdas Curriculum
// ============================================================

export const streams22_1_2_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 22.1: Lambdas, Functional Interfaces & Method References
  // ─────────────────────────────────────────────────────────────
  'lambdas-and-functional-interfaces': {
    id: 'lambdas-and-functional-interfaces',
    moduleId: 'java-streams',
    moduleTitle: '22. Java 8+ Streams & Lambdas',
    lessonNumber: 'Lesson 22.1',
    title: 'Lambdas, Functional Interfaces & Method References',
    subtitle: '@FunctionalInterface SAM contract, java.util.function primitives & compositions, invokedynamic bytecode mechanics, method references (4 types), and effectively final closures',
    estimatedMinutes: 30,
    beginnerAnalogy: 'Think of an Anonymous Inner Class as hiring a full brick-and-mortar contractor every single time you need a minor plumbing fix: the contractor must bring their own truck, erect scaffolding, register an official company branch (generating a physical Foo$1.class file on your hard disk), allocate dedicated office space (heap memory), and maintain their own private manager (their own "this" reference). A Lambda Expression, by contrast, is like sending an instant SMS with a precise digital instruction slip: the JVM does not build a physical company on disk or create a separate class file. Instead, it uses modern JVM telecommunications (the "invokedynamic" bytecode instruction) to dynamically wire that instruction slip directly into an existing burner or burner slot on demand. If the instruction slip references any tools from your workshop (local variables), you must not change or move those tools while the task is underway (they must be final or effectively final) because the instruction slip only received an immutable snapshot copy of the tool at the moment it was dispatched!',
    interviewTakeaways: [
      'Bytecode Realization via invokedynamic: Lambdas do NOT compile into separate anonymous inner class files (e.g., Enclosing$1.class). Instead, javac emits an `invokedynamic` (indy) opcode that references `LambdaMetafactory.metafactory`. At runtime, the JVM dynamically spins a lightweight implementation class (often via ASM/MethodHandles), reducing Metaspace bloat and cold-startup classloading overhead.',
      'Single Abstract Method (SAM) Contract: A Functional Interface has EXACTLY ONE abstract method. Default methods, static methods, and public abstract methods that override methods of `java.lang.Object` (such as `boolean equals(Object)`) do NOT count toward the SAM threshold. The `@FunctionalInterface` annotation is optional but enforces compile-time verification.',
      'Lexical Scoping and the "this" Pointer: Unlike anonymous inner classes where `this` refers to the inner class instance itself, a lambda expression is lexically scoped. Inside a lambda, `this` refers strictly to the enclosing class instance where the lambda was defined.',
      'Closures and Effective Finality: Local variables captured by a lambda MUST be `final` or effectively final (never mutated after assignment). This is because local variables reside on the thread stack (which is destroyed upon method return), while lambdas live on the heap. The JVM captures local variables by value (copying them to the heap). Allowing mutations would cause fatal concurrency desynchronization and race conditions.',
      'The 4 Typologies of Method References: 1) Static method reference: `ClassName::staticMethod` -> `(x) -> ClassName.staticMethod(x)`; 2) Bound instance method reference: `instance::method` -> `(x) -> instance.method(x)`; 3) Unbound instance method reference: `ClassName::method` -> `(target, x) -> target.method(x)` (first argument becomes the invocation target); 4) Constructor reference: `ClassName::new` -> `(args) -> new ClassName(args)`.',
      'The java.util.function Core Taxonomy: Java provides four core functional archetypes: `Predicate<T>` (T -> boolean), `Function<T, R>` (T -> R), `Consumer<T>` (T -> void), and `Supplier<T>` (void -> T), augmented by two-argument variants (`BiPredicate`, `BiFunction`, `BiConsumer`) and operators (`UnaryOperator<T>`, `BinaryOperator<T>`).',
      'Zero-Allocation Primitive Specializations: Using `Predicate<Integer>` incurs massive autoboxing and unboxing penalties (allocating `java.lang.Integer` heap wrappers). Specialized interfaces like `IntPredicate`, `LongConsumer`, `DoubleFunction<R>`, and `ToIntFunction<T>` operate directly on primitive values with zero heap allocation.',
      'Functional Composition Mechanics: Interfaces provide default methods for declarative chaining: `Function.andThen()` (g(f(x))), `Function.compose()` (f(g(x))), `Predicate.and()`, `Predicate.or()`, and `Predicate.negate()` enable rich, fluent processing pipelines.'
    ],
    cheatSheet: {
      summary: 'Lambdas provide concise syntax for Single Abstract Method (SAM) interfaces via invokedynamic. Local captured variables must be effectively final. Method references come in 4 distinct forms. Primitive specializations avoid boxing overhead.',
      syntaxTemplate: `// 1. Lambda Syntax
Predicate<String> isLong = s -> s.length() > 5;
BiFunction<Integer, Integer, Integer> adder = (a, b) -> a + b;

// 2. Functional Interface Contract (SAM)
@FunctionalInterface
public interface DataFilter<T> {
    boolean accept(T item); // The Single Abstract Method
    default void log(T item) { System.out.println(item); } // Ignored
    static void info() { System.out.println("Filter"); }    // Ignored
    boolean equals(Object obj);                             // Ignored (Object method)
}

// 3. Four Method Reference Types
Function<String, Integer> staticRef  = Integer::parseInt;          // Static: Class::staticMethod
Consumer<String>          boundRef   = System.out::println;        // Bound:  instance::method
BiPredicate<String, String> unboundRef = String::contains;         // Unbound: Class::instanceMethod
Supplier<List<String>>    ctorRef    = ArrayList::new;             // Constructor: Class::new

// 4. Functional Composition
Function<Integer, Integer> times2 = x -> x * 2;
Function<Integer, Integer> plus3  = x -> x + 3;
Function<Integer, Integer> f1 = times2.andThen(plus3); // plus3(times2(x)) -> (5 * 2) + 3 = 13
Function<Integer, Integer> f2 = times2.compose(plus3); // times2(plus3(x)) -> (5 + 3) * 2 = 16`,
      rules: [
        { rule: 'SAM Constraint', explanation: 'A functional interface must have exactly one abstract method. Declaring two abstract methods breaks the SAM contract and fails compilation under @FunctionalInterface.' },
        { rule: 'Object Methods Exemption', explanation: 'Abstract methods declared in a functional interface that match public signatures of java.lang.Object (equals, hashCode, toString) do NOT count toward the single abstract method count.' },
        { rule: 'Lexical Scoping of this', explanation: 'Inside a lambda, "this" refers to the enclosing instance. Unlike anonymous inner classes, a lambda does not introduce a new variable scope or its own "this" reference.' },
        { rule: 'Effective Finality for Local Capture', explanation: 'Any local stack variable accessed inside a lambda must be marked final or effectively final (assigned exactly once and never modified thereafter).' },
        { rule: 'Unbound Method Reference Target Matching', explanation: 'In an unbound instance method reference ClassName::method, the first parameter of the functional interface must match ClassName (or a subclass) and acts as the receiver target.' },
        { rule: 'Checked Exception Non-Declaration', explanation: 'Standard java.util.function interfaces do not declare checked exceptions; any checked exception inside a lambda must be caught locally, wrapped in a RuntimeException, or thrown via sneaky throws.' }
      ],
      quickComparison: [
        { aspect: 'Bytecode Output', optionA: 'Anonymous Class: Creates separate Foo$1.class file on disk', optionB: 'Lambda: Uses invokedynamic and synthetic private method in same class' },
        { aspect: 'this Reference', optionA: 'Anonymous Class: Refers to the inner class instance itself', optionB: 'Lambda: Lexically bound to the enclosing class instance' },
        { aspect: 'Memory Overhead', optionA: 'Anonymous Class: Full object header + enclosing class reference pointer', optionB: 'Lambda: Minimal call-site object instantiation, highly optimized/stateless' },
        { aspect: 'Classloading Impact', optionA: 'Anonymous Class: Separate classloader lookup and verification per class', optionB: 'Lambda: Lazy linkage on first execution via LambdaMetafactory' },
        { aspect: 'Variable Shadowing', optionA: 'Anonymous Class: Can shadow variables of enclosing scope', optionB: 'Lambda: Cannot declare parameters with same name as enclosing local variables' }
      ]
    },
    coreExplanation: [
      'The Paradigm Shift of Java 8: Before Java 8, Java was strictly object-oriented; passing behavior required instantiating boilerplate Anonymous Inner Classes (AICs). While AICs achieved behavioral parameterization, they suffered from crippling architectural deficiencies: bloated syntax, hard disk pollution with thousands of compiled `Enclosing$1.class` files, Metaspace class-loading pressure, and unavoidable heap allocation for every instance. Java 8 introduced lambda expressions not as mere syntactic sugar over anonymous inner classes, but as a fundamental re-engineering of JVM bytecode execution via `invokedynamic`.',
      'The Mechanics of invokedynamic and LambdaMetafactory: When `javac` compiles a lambda expression, it does not create a new `.class` file. Instead, it extracts the lambda body into a synthetic `private static` (or `private instance` if capturing `this`) method in the declaring class (named e.g., `lambda$main$0`). At the lambda site, `javac` emits an `invokedynamic` (indy) instruction with a bootstrap specifier targeting `java.lang.invoke.LambdaMetafactory.metafactory`. Upon first execution, the JVM invokes the bootstrap method, which dynamically generates and links a lightweight class implementing the functional interface via runtime bytecode generation (typically using internal Unsafe/MethodHandle spin). Subsequent calls reuse the established `CallSite` with zero overhead.',
      'The Single Abstract Method (SAM) Contract: A Functional Interface is any interface that specifies exactly one abstract method. Even if an interface defines 50 `default` methods and 20 `static` methods, it remains a valid functional interface as long as it has exactly one abstract method. Furthermore, Java Language Specification (JLS §9.8) mandates a critical exception: if an interface declares an abstract method that overrides a `public` method of `java.lang.Object` (such as `boolean equals(Object)`), that method does NOT count toward the single abstract method total, because every Java class inherently implements all `Object` methods.',
      'Lexical Scoping and the "this" Discrepancy: One of the most frequent sources of bugs in Java transitions is the semantic difference between `this` in an AIC versus a lambda. In an anonymous inner class, `this` evaluates to the newly instantiated anonymous class instance. If you need to access the outer instance, you must explicitly qualify it via `OuterClass.this`. In a lambda, the expression is lexically scoped: no new scope is introduced. The keyword `this` inside a lambda refers unambiguously to the enclosing `OuterClass` instance. Similarly, declaring a parameter in a lambda with the same name as an enclosing local variable is a compile-time error (`variable is already defined in scope`), whereas an AIC shadows it.',
      'The java.util.function Ecosystem: The standard library establishes a clean taxonomy: 1) `Predicate<T>` accepts `T` and returns a primitive `boolean` (ideal for filtering); 2) `Function<T, R>` transforms an input of type `T` into a result of type `R`; 3) `Consumer<T>` accepts `T` and returns `void` (intended for side-effects); 4) `Supplier<T>` takes no arguments and lazily yields a `T`. Their two-argument equivalents are `BiPredicate<T, U>`, `BiFunction<T, U, R>`, and `BiConsumer<T, U>`. When input and output types are identical, `UnaryOperator<T>` (extends `Function<T, T>`) and `BinaryOperator<T>` (extends `BiFunction<T, T, T>`) provide concise domain semantics.',
      'The Autoboxing Trap and Primitive Specializations: Generics in Java are subject to type erasure and cannot be parameterized by primitives (`Predicate<int>` is illegal). If you write `Predicate<Integer>`, every single evaluation requires converting an `int` to an `Integer` object on the heap (autoboxing), followed by pointer dereferencing and garbage collection pressure. In a streaming pipeline processing 100 million integers, this creates gigabytes of garbage and degrades throughput by an order of magnitude. To eliminate this penalty, Java 8 provides 43 specialized primitive functional interfaces (e.g., `IntPredicate`, `LongFunction<R>`, `DoubleConsumer`, `ToIntFunction<T>`, `DoubleBinaryOperator`) that operate strictly on CPU registers and primitive stack values.',
      'Demystifying the 4 Forms of Method References: A method reference is a shorthand syntax for a lambda that simply invokes an existing method. Java recognizes four structural forms: 1) Static Reference (`ClassName::staticMethod`): equivalent to `(args) -> ClassName.staticMethod(args)`; 2) Bound Instance Reference (`expr::instanceMethod`): where `expr` evaluates to an existing object reference, equivalent to `(args) -> expr.instanceMethod(args)`; 3) Unbound Instance Reference (`ClassName::instanceMethod`): where the method is an instance method, but no target object is pre-bound. Here, the first argument of the functional interface becomes the receiver object on which the method is invoked, equivalent to `(target, args) -> target.instanceMethod(args)`; 4) Constructor Reference (`ClassName::new`): equivalent to `(args) -> new ClassName(args)`.',
      'Closures, Stack Lifetimes, and Effectively Final Variables: Why does Java forbid modifying local variables from inside a lambda? In languages like JavaScript or C#, closures can capture mutable variables by automatically heap-allocating the entire lexical environment frame. In Java, local variables live on the thread call stack. When a method returns, its stack frame is instantly popped and destroyed. If a lambda were returned or passed to an asynchronous thread pool, the stack variable would no longer exist! To solve this without redesigning the entire JVM memory model, Java captures local variables BY VALUE—copying their state to the heap. If Java allowed code to mutate the original variable or the copy, the two values would immediately diverge, leading to bizarre state inconsistencies and thread-safety hazards. Hence, Java strictly requires captured local variables to be final or effectively final.'
    ],
    diagram: `JVM BYTECODE & CAPTURE MECHANICS: AIC vs LAMBDA
========================================================================

1. ANONYMOUS INNER CLASS (Compile-Time Class Generation):
   Source: Runnable r = new Runnable() { public void run() { ... } };
   Disk:   OuterClass.class  AND  OuterClass$1.class (Heavy, separate class)
   Heap:   [ OuterClass$1 Object | header | OuterClass.this ref | captured fields ]

2. LAMBDA EXPRESSION (invokedynamic & Lightweight Linkage):
   Source: Runnable r = () -> { ... };
   Disk:   OuterClass.class ONLY! (Zero extra .class files)
   Bytecode:
     0: invokedynamic #2, 0  // Bootstrap: LambdaMetafactory.metafactory
     5: astore_1
   Synthetic Method in OuterClass:
     private static synthetic void lambda$main$0();

------------------------------------------------------------------------
STACK LIFETIME VS HEAP CLOSURE CAPTURE:
------------------------------------------------------------------------
   Thread Stack (Pushed/Popped)                 JVM Heap (Persistent)
   ┌────────────────────────────────┐         ┌───────────────────────────────┐
   │ void executeTask() {           │         │                               │
   │   int port = 8080; // on stack │         │  Lambda Synthetic Instance    │
   │                                │         │  ┌─────────────────────────┐  │
   │   // Lambda captures 'port'    │         │  │ captured_port = 8080    │  │
   │   Runnable r = () ->           │─────────┼─>│ (Immutable Copy)        │  │
   │     connect(port);             │ (COPY)  │  └─────────────────────────┘  │
   │                                │         │                               │
   │   return r; // FRAME POPPED!   │         │  Thread Pool executes r       │
   │ } // 'port' stack slot DESTROYED│        │  Safely reads 8080 from Heap! │
   └────────────────────────────────┘         └───────────────────────────────┘
   * Why "Effectively Final"? If 'port' could change, the Stack and
     Heap copies would desynchronize, causing corrupt concurrent state!`,
    codeSnippet: {
      title: 'Lambda Mechanics, Effective Finality & Method References',
      code: `import java.util.function.*;
import java.util.*;

public class LambdaArchitectureDemo {
    private String instancePrefix = "INSTANCE_LOG";

    public void demonstrate() {
        int localPort = 9090; // Effectively final local variable
        // localPort = 9091; // UNCOMMENTING CAUSES COMPILE ERROR: must be effectively final!

        // 1. Lambda capturing enclosing instance field and local variable
        Consumer<String> logger = msg -> {
            // "this" refers to LambdaArchitectureDemo, NOT the lambda
            System.out.println(this.instancePrefix + " [" + localPort + "]: " + msg);
        };
        logger.accept("Connection initialized");

        // 2. The 4 Types of Method References
        // Type 1: Static method reference (Class::staticMethod)
        Function<String, Integer> staticParser = Integer::parseInt;
        System.out.println("Parsed: " + staticParser.apply("42"));

        // Type 2: Bound instance method reference (instance::instanceMethod)
        Consumer<String> boundRef = System.out::println;
        boundRef.accept("Bound reference executed");

        // Type 3: Unbound instance method reference (Class::instanceMethod)
        // First parameter becomes the target object!
        BiPredicate<String, String> unboundRef = String::equalsIgnoreCase;
        System.out.println("Equals Ignore Case: " + unboundRef.test("JAVA", "java"));

        // Type 4: Constructor reference (Class::new)
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> dynamicList = listFactory.get();
        dynamicList.add("Item 1");
        System.out.println("Constructed List size: " + dynamicList.size());
    }

    public static void main(String[] args) {
        new LambdaArchitectureDemo().demonstrate();
    }
}`,
      lineByLineExplanation: [
        { line: 'int localPort = 9090;', explanation: 'Local variable allocated on the thread stack frame.' },
        { line: 'Consumer<String> logger = msg -> { ... }', explanation: 'Creates a lambda expression. The compiler emits an invokedynamic instruction linked via LambdaMetafactory.' },
        { line: 'this.instancePrefix + " [" + localPort + "]: " + msg', explanation: 'Captures "this" lexically from the enclosing class and captures localPort by value into the lambda.' },
        { line: 'Function<String, Integer> staticParser = Integer::parseInt;', explanation: 'Static method reference Class::staticMethod, equivalent to s -> Integer.parseInt(s).' },
        { line: 'Consumer<String> boundRef = System.out::println;', explanation: 'Bound instance reference instance::method. System.out is already evaluated and bound to the call site.' },
        { line: 'BiPredicate<String, String> unboundRef = String::equalsIgnoreCase;', explanation: 'Unbound instance reference Class::instanceMethod. The 1st param is the receiver: (s1, s2) -> s1.equalsIgnoreCase(s2).' },
        { line: 'Supplier<List<String>> listFactory = ArrayList::new;', explanation: 'Constructor reference Class::new, equivalent to () -> new ArrayList<String>().' }
      ],
      output: `INSTANCE_LOG [9090]: Connection initialized
Parsed: 42
Bound reference executed
Equals Ignore Case: true
Constructed List size: 1`
    },
    codeExamples: [
      {
        title: 'Lexical Scoping and "this" Resolution: AIC vs Lambda',
        description: 'Proves that anonymous inner classes create a new scope with their own "this", while lambdas retain the enclosing class "this".',
        code: `public class LexicalScopeDemo {
    private final String scopeName = "ENCLOSING_SCOPE";

    public void execute() {
        // 1. Anonymous Inner Class
        Runnable aic = new Runnable() {
            private final String scopeName = "AIC_INNER_SCOPE";
            @Override
            public void run() {
                // "this" refers to the Anonymous Inner Class instance!
                System.out.println("AIC this.scopeName:        " + this.scopeName);
                System.out.println("AIC Outer.this.scopeName:  " + LexicalScopeDemo.this.scopeName);
            }
        };
        aic.run();

        // 2. Lambda Expression
        Runnable lambda = () -> {
            // Cannot declare: String scopeName = "FAIL"; // COMPILE ERROR: variable already defined!
            // "this" refers strictly to LexicalScopeDemo
            System.out.println("Lambda this.scopeName:     " + this.scopeName);
        };
        lambda.run();
    }

    public static void main(String[] args) {
        new LexicalScopeDemo().execute();
    }
}`,
        output: `AIC this.scopeName:        AIC_INNER_SCOPE
AIC Outer.this.scopeName:  ENCLOSING_SCOPE
Lambda this.scopeName:     ENCLOSING_SCOPE`
      },
      {
        title: 'The 4 Typologies of Method References with Signatures',
        description: 'Side-by-side comparison of the four method reference forms against their explicit lambda expansions.',
        code: `import java.util.function.*;

public class MethodReferenceTaxonomy {
    public static boolean isEven(int n) { return n % 2 == 0; }
    public boolean startsWithVowel(String s) {
        return "AEIOU".indexOf(Character.toUpperCase(s.charAt(0))) >= 0;
    }

    public static void main(String[] args) {
        MethodReferenceTaxonomy instance = new MethodReferenceTaxonomy();

        // Form 1: Static Method Reference (ClassName::staticMethod)
        IntPredicate p1Lambda = n -> MethodReferenceTaxonomy.isEven(n);
        IntPredicate p1Method = MethodReferenceTaxonomy::isEven;
        System.out.println("Static ref: " + p1Method.test(10));

        // Form 2: Bound Instance Reference (instance::instanceMethod)
        Predicate<String> p2Lambda = s -> instance.startsWithVowel(s);
        Predicate<String> p2Method = instance::startsWithVowel;
        System.out.println("Bound ref: " + p2Method.test("Apple"));

        // Form 3: Unbound Instance Reference (ClassName::instanceMethod)
        // Notice: The first lambda parameter 's' becomes the target of .length()!
        Function<String, Integer> p3Lambda = s -> s.length();
        Function<String, Integer> p3Method = String::length;
        System.out.println("Unbound ref: " + p3Method.apply("Architect"));

        // Form 4: Constructor Reference (ClassName::new)
        Function<String, StringBuilder> p4Lambda = s -> new StringBuilder(s);
        Function<String, StringBuilder> p4Method = StringBuilder::new;
        System.out.println("Constructor ref: " + p4Method.apply("Constructed!").reverse());
    }
}`,
        output: `Static ref: true
Bound ref: true
Unbound ref: 9
Constructor ref: !detcurtsnoC`
      },
      {
        title: 'Functional Composition Engine: andThen, compose & Predicates',
        description: 'Constructs an enterprise validation and normalization pipeline demonstrating Function and Predicate composition.',
        code: `import java.util.function.*;

public class CompositionPipelineDemo {
    public static void main(String[] args) {
        // Mathematical pipeline: andThen vs compose
        Function<Integer, Integer> multiplyBy10 = x -> x * 10;
        Function<Integer, Integer> add5 = x -> x + 5;

        // andThen: multiplyBy10 FIRST, then add5 -> (2 * 10) + 5 = 25
        Function<Integer, Integer> pipelineAndThen = multiplyBy10.andThen(add5);
        System.out.println("andThen(2): " + pipelineAndThen.apply(2));

        // compose: add5 FIRST, then multiplyBy10 -> (2 + 5) * 10 = 70
        Function<Integer, Integer> pipelineCompose = multiplyBy10.compose(add5);
        System.out.println("compose(2): " + pipelineCompose.apply(2));

        // Predicate Boolean Algebra
        Predicate<String> isNotNull = s -> s != null;
        Predicate<String> isLongEnough = s -> s.length() >= 5;
        Predicate<String> startsWithAdmin = s -> s.startsWith("ADMIN");

        Predicate<String> validAdminToken = isNotNull
                .and(isLongEnough)
                .and(startsWithAdmin);

        Predicate<String> invalidToken = validAdminToken.negate();

        System.out.println("ADMIN_SECRET valid? " + validAdminToken.test("ADMIN_SECRET"));
        System.out.println("USER_KEY valid?     " + validAdminToken.test("USER_KEY"));
        System.out.println("USER_KEY invalid?   " + invalidToken.test("USER_KEY"));
    }
}`,
        output: `andThen(2): 25
compose(2): 70
ADMIN_SECRET valid? true
USER_KEY valid?     false
USER_KEY invalid?   true`
      },
      {
        title: 'Micro-Benchmark: Generic Predicate<Integer> vs IntPredicate',
        description: 'Demonstrates the severe memory allocation and throughput cost of generic boxing vs primitive specializations.',
        code: `import java.util.function.*;

public class BoxingBenchmark {
    private static final int ITERATIONS = 10_000_000;

    public static void main(String[] args) {
        // Generic Predicate<Integer>: forces Integer.valueOf(i) on every pass
        Predicate<Integer> genericPred = val -> (val & 1) == 0;
        long startGeneric = System.nanoTime();
        int count1 = 0;
        for (int i = 0; i < ITERATIONS; i++) {
            if (genericPred.test(i)) count1++; // Autoboxing heap allocation!
        }
        long timeGeneric = System.nanoTime() - startGeneric;

        // Primitive IntPredicate: pure register/stack computation
        IntPredicate primitivePred = val -> (val & 1) == 0;
        long startPrimitive = System.nanoTime();
        int count2 = 0;
        for (int i = 0; i < ITERATIONS; i++) {
            if (primitivePred.test(i)) count2++; // Zero allocation!
        }
        long timePrimitive = System.nanoTime() - startPrimitive;

        System.out.println("Generic Predicate<Integer> elapsed: " + (timeGeneric / 1_000_000.0) + " ms");
        System.out.println("Primitive IntPredicate elapsed:     " + (timePrimitive / 1_000_000.0) + " ms");
        System.out.printf("Speedup: %.2fx faster with IntPredicate!\\n", (double) timeGeneric / timePrimitive);
    }
}`,
        output: `Generic Predicate<Integer> elapsed: 48.35 ms
Primitive IntPredicate elapsed:     7.91 ms
Speedup: 6.11x faster with IntPredicate!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Mutating a captured local variable from inside a lambda body (e.g. int counter = 0; list.forEach(x -> counter++);)',
        whyItHappens: 'Developers coming from JavaScript or Python assume Java lambdas capture stack variables by reference (mutable closures). In Java, stack frames are destroyed on method return, so Java copies captured primitives to the heap. To prevent desynchronization between stack and heap, Java mandates effective finality.',
        howToFix: 'Use atomic wrappers like AtomicInteger, an array container of length 1 (int[] counter = {0}), or restructure the operation using functional reduction (Stream.count(), mapToInt().sum()).'
      },
      {
        mistake: 'Confusing an Unbound Instance Reference (ClassName::method) with a Bound Instance Reference (instance::method)',
        whyItHappens: 'Both use the double colon (::) syntax, but ClassName::method requires that the functional interface accept an instance of ClassName as its first argument (the receiver), whereas instance::method does not accept the receiver as an argument.',
        howToFix: 'Examine the functional interface signature. If the interface takes (T, U) -> R and you call T.method(U), use ClassName::method. If you already have an existing object instance obj and the interface takes (U) -> R, use obj::method.'
      },
      {
        mistake: 'Assuming that declaring public Object methods (equals, hashCode, toString) in an interface violates the @FunctionalInterface contract',
        whyItHappens: 'Developers see two abstract methods declared in an interface and assume it can no longer be a functional interface.',
        howToFix: 'Remember JLS §9.8: Any abstract method overriding a public method of java.lang.Object is excluded from the SAM count because every implementing class inherits an implementation from Object.'
      },
      {
        mistake: 'Assuming Function.compose(g) executes left-to-right like andThen(g)',
        whyItHappens: 'Developers read f.compose(g) as "f and then compose with g", leading to reversed execution orders and silent logic bugs.',
        howToFix: 'Remember mathematical composition: f.compose(g) represents f(g(x)) where g executes FIRST, and f executes second. For left-to-right execution, always use f.andThen(g), representing g(f(x)).'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Mutating Captured Local Stack Variable',
        problemStatement: 'What happens when attempting to compile and run the following code?',
        code: `import java.util.function.Consumer;

public class Puzzle1 {
    public static void main(String[] args) {
        int factor = 2;
        Consumer<Integer> multiplier = n -> System.out.print((n * factor) + " ");
        factor = 3;
        multiplier.accept(5);
    }
}`,
        options: [
            'A) Prints: 10 ',
            'B) Prints: 15 ',
            'C) Compilation Error: local variables referenced from a lambda expression must be final or effectively final',
            'D) Runtime Exception: ConcurrentModificationException'
        ],
        correctOptionIndex: 2,
        hint: 'Was factor modified after being referenced in the lambda definition?',
        solution: 'Option C is correct: Compilation Error.',
        explanation: 'In Java, any local variable referenced inside a lambda expression must be `final` or effectively final. An effectively final variable is one whose value is never changed after initialization. Because `factor = 3;` reassigns the variable, it loses its effectively final status, and the compiler rejects the lambda definition on the line where `factor` is captured.'
      },
      {
        title: 'Puzzle 2: The "this" Pointer in Lambda vs Anonymous Class',
        problemStatement: 'What does this program print?',
        code: `public class Puzzle2 {
    private String tag = "OUTER";

    public void run() {
        Runnable r1 = new Runnable() {
            private String tag = "INNER";
            public void run() {
                System.out.print(this.tag + " ");
            }
        };

        Runnable r2 = () -> {
            System.out.print(this.tag + " ");
        };

        r1.run();
        r2.run();
    }

    public static void main(String[] args) {
        new Puzzle2().run();
    }
}`,
        options: [
            'A) OUTER OUTER ',
            'B) INNER INNER ',
            'C) INNER OUTER ',
            'D) Compilation Error: cannot use "this" in lambda expression'
        ],
        correctOptionIndex: 2,
        hint: 'How is "this" scoped in an anonymous inner class versus a lambda expression?',
        solution: 'Option C is correct: Prints "INNER OUTER ".',
        explanation: 'In an anonymous inner class, `this` evaluates to the instance of that anonymous inner class, printing "INNER". In a lambda expression, there is no separate inner class instance; `this` is lexically scoped to the enclosing instance (`Puzzle2`), printing "OUTER".'
      },
      {
        title: 'Puzzle 3: Evaluation Order of compose() vs andThen()',
        problemStatement: 'What is the output of the following mathematical functional pipeline?',
        code: `import java.util.function.Function;

public class Puzzle3 {
    public static void main(String[] args) {
        Function<Integer, Integer> f1 = x -> x + 2;
        Function<Integer, Integer> f2 = x -> x * 3;
        Function<Integer, Integer> f3 = x -> x - 1;

        Function<Integer, Integer> pipeline = f1.andThen(f2).compose(f3);
        System.out.println(pipeline.apply(5));
    }
}`,
        options: [
            'A) 20',
            'B) 17',
            'C) 18',
            'D) 14'
        ],
        correctOptionIndex: 2,
        hint: 'Evaluate the outer compose() call first: pipeline.apply(x) = (f1.andThen(f2))(f3(x)).',
        solution: 'Option C is correct: 18.',
        explanation: 'Let H = f1.andThen(f2). The expression is H.compose(f3). By definition of compose, H.compose(f3).apply(x) = H.apply(f3(x)). Given x = 5: First, f3(5) = 5 - 1 = 4. Next, H.apply(4) executes: f1(4) = 4 + 2 = 6, followed by f2(6) = 6 * 3 = 18. Thus, the final result is 18.'
      },
      {
        title: 'Puzzle 4: Multiple Abstract Methods with java.lang.Object Overrides',
        problemStatement: 'Does the following interface compile cleanly as a @FunctionalInterface?',
        code: `import java.io.Serializable;

@FunctionalInterface
public interface Validator<T> {
    boolean validate(T value);
    boolean equals(Object obj);
    int hashCode();
    String toString();
    default void reset() {}
    static void log() {}
}`,
        options: [
            'A) No, it has 4 abstract methods (validate, equals, hashCode, toString) which violates the SAM rule',
            'B) Yes, it compiles cleanly because equals, hashCode, and toString are public methods of java.lang.Object and are excluded from the SAM count',
            'C) No, because static and default methods are forbidden in @FunctionalInterface',
            'D) No, because toString() must have a default implementation'
        ],
        correctOptionIndex: 1,
        hint: 'Which abstract methods are explicitly exempted by JLS §9.8 from counting toward the Single Abstract Method count?',
        solution: 'Option B is correct: Yes, it compiles cleanly.',
        explanation: 'Under JLS §9.8, any abstract method in an interface that overrides a public method of `java.lang.Object` (such as `equals`, `hashCode`, `toString`) does NOT count toward the single abstract method total. Furthermore, `default` and `static` methods do not count. The only non-Object abstract method is `validate(T value)`. Because there is exactly one such abstract method, it fulfills the SAM contract.'
      },
      {
        title: 'Puzzle 5: Unbound Instance Method Reference Parameter Matching',
        problemStatement: 'Which of the following method reference assignments causes a COMPILATION ERROR?',
        code: `import java.util.function.*;

public class Puzzle5 {
    public static void main(String[] args) {
        // Line 1:
        BiPredicate<String, String> b1 = String::contains;
        // Line 2:
        BiFunction<String, Integer, Character> b2 = String::charAt;
        // Line 3:
        Function<String, Integer> b3 = String::length;
        // Line 4:
        BiConsumer<String, String> b4 = String::concat;
    }
}`,
        options: [
            'A) Line 1',
            'B) Line 2',
            'C) Line 3',
            'D) Line 4'
        ],
        correctOptionIndex: 3,
        hint: 'What does String.concat(String) return, and what does BiConsumer require for its return type?',
        solution: 'Option D is correct: Line 4 causes a compilation error.',
        explanation: '`BiConsumer<T, U>` has the method `void accept(T t, U u)` which mandates a `void` return type. In an unbound reference `String::concat`, the method signature is `String concat(String str)`, returning a `String`. While Java allows statement expressions returning values in lambda bodies for void methods (e.g. `(s1, s2) -> s1.concat(s2)`), method reference type compatibility requires the method result to be discarded or match. For `BiConsumer`, `String::concat` produces an incompatible return type compile error because `concat` produces a value not permitted where a void-compatible method reference is not recognized in strict method reference matching.'
      },
      {
        title: 'Puzzle 6: Capturing Array Reference vs Mutating Array Contents',
        problemStatement: 'What does this program print?',
        code: `import java.util.function.IntConsumer;

public class Puzzle6 {
    public static void main(String[] args) {
        final int[] container = { 10 };
        IntConsumer adder = n -> container[0] += n;
        adder.accept(5);
        adder.accept(15);
        System.out.println(container[0]);
    }
}`,
        options: [
            'A) Compilation Error: container cannot be modified inside lambda',
            'B) 10',
            'C) 30',
            'D) Runtime Exception: ArrayStoreException'
        ],
        correctOptionIndex: 2,
        hint: 'Is the reference "container" being reassigned, or is the heap array being mutated?',
        solution: 'Option C is correct: Prints 30.',
        explanation: 'In Java, the rule of effective finality applies to the *reference* variable itself, not the internal state of the object/array it references on the heap. Because `container` is never reassigned to point to another array (`container = ...`), the reference remains strictly final. Mutating its array elements (`container[0] += n`) is completely valid. 10 + 5 + 15 = 30.'
      },
      {
        title: 'Puzzle 7: Ambiguous Overload Resolution with Method References',
        problemStatement: 'What happens when compiling the following code?',
        code: `public class Puzzle7 {
    interface ActionA { void run(String s); }
    interface ActionB { void run(Integer i); }

    static void execute(ActionA a) { System.out.print("ActionA "); }
    static void execute(ActionB b) { System.out.print("ActionB "); }

    static void printValue(Object obj) { System.out.print(obj); }

    public static void main(String[] args) {
        execute(Puzzle7::printValue);
    }
}`,
        options: [
            'A) Prints: ActionA ',
            'B) Prints: ActionB ',
            'C) Compilation Error: reference to execute is ambiguous',
            'D) Runtime Exception: NoSuchMethodException'
        ],
        correctOptionIndex: 2,
        hint: 'Both ActionA.run(String) and ActionB.run(Integer) are compatible with printValue(Object). Can the compiler disambiguate?',
        solution: 'Option C is correct: Compilation Error: reference to execute is ambiguous.',
        explanation: 'Because `printValue(Object)` can accept both `String` and `Integer`, `Puzzle7::printValue` is equally compatible with both `ActionA` (takes String) and `ActionB` (takes Integer). Neither interface is more specific than the other, resulting in a compile-time ambiguity error: "reference to execute is ambiguous, both method execute(ActionA) and method execute(ActionB) match".'
      },
      {
        title: 'Puzzle 8: Effectively Final Shadowing in Enclosing Blocks',
        problemStatement: 'What happens when compiling this code?',
        code: `import java.util.function.Supplier;

public class Puzzle8 {
    public static void main(String[] args) {
        int x = 100;
        Supplier<Integer> s1 = () -> {
            int y = x + 10;
            return y;
        };
        for (int i = 0; i < 2; i++) {
            int val = i;
            Supplier<Integer> s2 = () -> val * 2;
            System.out.print(s2.get() + " ");
        }
    }
}`,
        options: [
            'A) Prints: 0 2 ',
            'B) Compilation Error: val is redeclared inside loop and cannot be effectively final',
            'C) Prints: 2 2 ',
            'D) Runtime Exception'
        ],
        correctOptionIndex: 0,
        hint: 'Is "val" in scope across multiple iterations, or does each iteration allocate a fresh local variable on the stack?',
        solution: 'Option A is correct: Prints "0 2 ".',
        explanation: 'Each iteration of the `for` loop introduces a new lexical block scope where `int val` is newly created and assigned exactly once per iteration. Because `val` is never reassigned within that iteration block, it is effectively final in each separate iteration. When i=0, val=0, s2.get() returns 0. When i=1, val=1, s2.get() returns 2.'
      },
      {
        title: 'Puzzle 9: Constructor Reference with Array Factory',
        problemStatement: 'What does the following code print?',
        code: `import java.util.function.IntFunction;

public class Puzzle9 {
    public static void main(String[] args) {
        IntFunction<String[]> arrayCreator = String[]::new;
        String[] arr = arrayCreator.apply(5);
        System.out.println(arr.length + " " + arr.getClass().isArray());
    }
}`,
        options: [
            'A) 0 true',
            'B) 5 true',
            'C) Compilation Error: String[]::new is not a valid constructor reference',
            'D) Runtime Exception: ClassCastException'
        ],
        correctOptionIndex: 1,
        hint: 'In Java, an array constructor reference Type[]::new takes an integer size argument.',
        solution: 'Option B is correct: Prints "5 true".',
        explanation: '`IntFunction<R>` has the method `R apply(int value)`. When applied to an array constructor reference `String[]::new`, the int argument represents the desired array dimension size. `arrayCreator.apply(5)` invokes `new String[5]`. Thus `arr.length` is 5, and `arr.getClass().isArray()` is true.'
      },
      {
        title: 'Puzzle 10: Null Handling with Predicate.and() and Short-Circuiting',
        problemStatement: 'What does the following code print when executed?',
        code: `import java.util.function.Predicate;

public class Puzzle10 {
    public static void main(String[] args) {
        Predicate<String> nonNull = s -> s != null;
        Predicate<String> hasContent = s -> s.length() > 0;

        Predicate<String> composite = nonNull.and(hasContent);
        System.out.print(composite.test(null) + " ");

        Predicate<String> broken = hasContent.and(nonNull);
        try {
            System.out.print(broken.test(null));
        } catch (NullPointerException e) {
            System.out.print("NPE");
        }
    }
}`,
        options: [
            'A) false false',
            'B) false NPE',
            'C) NPE NPE',
            'D) false true'
        ],
        correctOptionIndex: 1,
        hint: 'Does Predicate.and() short-circuit like the Java && operator?',
        solution: 'Option B is correct: Prints "false NPE".',
        explanation: '`Predicate.and()` uses standard short-circuit evaluation: `return (t) -> test(t) && other.test(t);`. For `composite.test(null)`, `nonNull.test(null)` returns `false`. Because of short-circuiting, `hasContent.test(null)` is NEVER evaluated, returning `false`. For `broken.test(null)`, `hasContent.test(null)` executes first and immediately dereferences `null.length()`, throwing `NullPointerException`, caught to print "NPE".'
      }
    ],
    interviewQuestions: [
      {
        question: 'How do Lambdas physically execute in the JVM? Contrast the bytecode mechanics of Lambdas (invokedynamic) with Anonymous Inner Classes.',
        answer: 'When compiling an Anonymous Inner Class (AIC), `javac` generates a physical `.class` file on disk (e.g. `Outer$1.class`). Loading an AIC requires disk I/O, class verification, Metaspace memory allocation, and classloader overhead. Furthermore, every instantiation allocates a full object header plus an implicit reference pointer to the enclosing instance (`Outer.this`). In stark contrast, Lambdas do NOT generate separate class files at compile-time. Instead, `javac` compiles the lambda body as a synthetic method (e.g., `lambda$main$0`) inside the enclosing class, and emits an `invokedynamic` (indy) opcode pointing to `LambdaMetafactory.metafactory`. Upon first execution, the JVM invokes this bootstrap method to dynamically generate and link a lightweight call site class via bytecode generation (MethodHandles/Unsafe). Subsequent invocations reuse this CallSite, avoiding redundant classloading and drastically minimizing heap allocations.',
        followUp: 'What happens if a lambda does not capture any variables from its enclosing scope (non-capturing lambda)?',
        followUpAnswer: 'If a lambda is non-capturing (it does not reference instance fields, "this", or local variables), the JVM optimizes it into a singleton instance. The same synthetic lambda instance is reused across every single invocation, resulting in zero ongoing heap allocations.',
        keyPhrases: [
          'invokedynamic instruction (indy)',
          'LambdaMetafactory.metafactory bootstrap',
          'Synthetic method generation (lambda$name$0)',
          'No separate .class file generated at compile time',
          'Non-capturing singleton optimization'
        ],
        commonMistakeAnswer: 'Claiming lambdas are simply syntactic sugar that generate hidden anonymous inner classes behind the scenes.'
      },
      {
        question: 'Why MUST local variables captured by a lambda expression be final or effectively final in Java? Why not allow mutable closures like JavaScript or C#?',
        answer: 'In Java, local primitive variables and object references reside on the thread execution stack. When a method finishes execution, its stack frame is instantly popped and destroyed. However, a lambda expression is an object residing on the heap and can easily outlive the method that created it (e.g., if returned from the method, registered as an event listener, or submitted to an asynchronous ExecutorService). If the lambda accessed the raw stack variable, it would encounter dangling pointer memory corruption once the stack popped. To solve this safely, Java CAPTURES local variables BY VALUE—copying the primitive value or object reference from the stack into a field on the heap-allocated lambda instance. If Java permitted modifying the variable after capture, the stack variable and heap copy would diverge, creating unpredictable race conditions and impossible-to-debug concurrency bugs. Languages like JavaScript or C# allow mutable closures only by heap-allocating the entire lexical activation frame, which incurs significant GC overhead that Java JVM designers intentionally avoided.',
        followUp: 'How can you capture and mutate a value inside a lambda if you genuinely need state accumulation?',
        followUpAnswer: 'By wrapping the primitive value in a heap-allocated container whose reference remains final, such as AtomicInteger, AtomicReference, or a single-element array: `int[] counter = new int[1]; list.forEach(x -> counter[0] += x);`.',
        keyPhrases: [
          'Stack lifetime vs Heap lifetime',
          'Stack frame destruction on method return',
          'Capture by value (copying)',
          'Desynchronization and race condition prevention',
          'Avoiding heap-allocated activation records'
        ],
        commonMistakeAnswer: 'Saying Java forbids it purely because the creators wanted to force functional purity without technical memory constraints.'
      },
      {
        question: 'Explain the lexical scoping rules of "this" and "super" inside a lambda versus an anonymous inner class.',
        answer: 'An Anonymous Inner Class creates a new, independent lexical scope and instantiates a distinct Java class. Therefore, inside an AIC, the unqualified keyword `this` resolves to the instance of the anonymous class itself. To access the enclosing class instance, one must use the qualified syntax `EnclosingClass.this`. In contrast, a lambda expression does NOT introduce a new scope; it is lexically scoped within its enclosing class. The keyword `this` inside a lambda refers strictly and unconditionally to the enclosing class instance where the lambda was written. Similarly, `super` in a lambda resolves to the superclass of the enclosing class, whereas in an AIC it resolves to the superclass of the anonymous inner class.',
        followUp: 'What happens if you reference "this" inside a lambda declared inside a static method?',
        followUpAnswer: 'It produces a compile-time error: "non-static variable this cannot be referenced from a static context", proving that the lambda inherits the lexical context of the enclosing method.',
        keyPhrases: [
          'Lexical scoping in lambdas',
          'No new scope introduced',
          'this resolves to enclosing class instance',
          'AIC introduces independent scope',
          'Variable shadowing forbidden in lambdas'
        ],
        commonMistakeAnswer: 'Believing that lambda "this" points to the synthetic functional interface implementation instance.'
      },
      {
        question: 'What constitutes a Single Abstract Method (SAM) interface? How do default, static, and java.lang.Object methods factor into the contract?',
        answer: 'A Single Abstract Method (SAM) interface is an interface containing exactly ONE abstract method signature. Under JLS §9.8: 1) Default methods provide concrete implementations and do not count toward SAM; 2) Static methods belong to the interface namespace and do not count; 3) Crucially, any abstract method declared in the interface that overrides a public method of `java.lang.Object` (specifically `boolean equals(Object)`, `int hashCode()`, and `String toString()`) does NOT count toward the single abstract method total. This exception exists because any concrete implementation class will automatically inherit implementations of these methods from `java.lang.Object`. The `@FunctionalInterface` annotation is optional, but strongly recommended because it forces `javac` to validate this SAM contract at compile time.',
        followUp: 'Can an interface extend another interface and still be a valid @FunctionalInterface?',
        followUpAnswer: 'Yes, as long as the cumulative count of non-Object abstract methods across the entire inheritance hierarchy remains exactly one (e.g. extending an empty marker interface, or inheriting an abstract method without declaring any new ones).',
        keyPhrases: [
          'Single Abstract Method (SAM) definition',
          'java.lang.Object public method exemption (JLS §9.8)',
          'Default and static methods ignored',
          '@FunctionalInterface compile-time enforcement',
          'Inheritance across interface hierarchies'
        ],
        commonMistakeAnswer: 'Believing that declaring boolean equals(Object) in an interface breaks @FunctionalInterface.'
      },
      {
        question: 'Enumerate and differentiate the 4 categories of Method References in Java. Provide the exact lambda equivalence for each.',
        answer: 'The four categories of Method References are: 1) Static Method Reference (`ClassName::staticMethod`): Maps to `(args) -> ClassName.staticMethod(args)`. Example: `Integer::parseInt` maps to `s -> Integer.parseInt(s)`. 2) Bound Instance Method Reference (`instanceExpr::instanceMethod`): The target object is pre-evaluated and bound to the reference. Maps to `(args) -> instanceExpr.instanceMethod(args)`. Example: `System.out::println` maps to `x -> System.out.println(x)`. 3) Unbound Instance Method Reference (`ClassName::instanceMethod`): No instance is pre-bound. The functional interface MUST accept the target object as its first argument! Maps to `(target, args) -> target.instanceMethod(args)`. Example: `String::compareToIgnoreCase` maps to `(s1, s2) -> s1.compareToIgnoreCase(s2)`. 4) Constructor Reference (`ClassName::new`): Maps to `(args) -> new ClassName(args)`. Example: `ArrayList::new` maps to `() -> new ArrayList<>()`.',
        followUp: 'How does the compiler distinguish between a static method reference and an unbound instance method reference when both use ClassName::method?',
        followUpAnswer: 'The compiler inspects the target method signature in ClassName. If method is static, the functional interface arguments map directly to the method parameters. If method is non-static, the compiler checks if the first argument of the functional interface matches ClassName to serve as the invocation receiver.',
        keyPhrases: [
          'Static: ClassName::staticMethod',
          'Bound: instance::instanceMethod',
          'Unbound: ClassName::instanceMethod (1st arg is receiver)',
          'Constructor: ClassName::new',
          'Receiver parameter matching'
        ],
        commonMistakeAnswer: 'Failing to explain that an unbound method reference requires the target object to be passed as the first parameter to the functional interface.'
      },
      {
        question: 'Compare Function.compose(f) and Function.andThen(f). How do they relate to mathematical function composition?',
        answer: 'Both `compose()` and `andThen()` are default methods on `java.util.function.Function<T, R>` that combine two functions into a pipeline, but they execute in opposite orders. Given `f` and `g`: `f.andThen(g)` executes `f` FIRST and passes its result into `g`, corresponding to the mathematical application $g(f(x))$. In contrast, `f.compose(g)` executes `g` FIRST and passes its result into `f`, corresponding directly to mathematical function composition $(f \\circ g)(x) = f(g(x))$. For readability in enterprise streaming pipelines, `andThen()` is almost universally favored because it reads naturally from left-to-right (first this, and then that).',
        followUp: 'What happens if the first function in an andThen chain throws an exception?',
        followUpAnswer: 'The pipeline aborts immediately; the subsequent function in the andThen chain is never called, and the exception propagates to the caller.',
        keyPhrases: [
          'andThen is left-to-right (g(f(x)))',
          'compose is right-to-left (f(g(x)))',
          'Mathematical composition (f o g)',
          'Exception short-circuiting'
        ],
        commonMistakeAnswer: 'Confusing compose with andThen and claiming compose runs left-to-right.'
      },
      {
        question: 'Why did Java introduce 43 primitive functional interfaces (IntPredicate, DoubleFunction, etc.) instead of simply using generics with primitives?',
        answer: 'Java generic type arguments are erased at compile-time to `Object` (or their upper bound). Because primitive types (`int`, `long`, `double`) are value types that do not inherit from `java.lang.Object`, generics CANNOT directly parameterize primitives (`Function<int, int>` is illegal). Using generic wrappers like `Function<Integer, Integer>` or `Predicate<Integer>` forces the JVM to perform autoboxing on every single invocation: allocating a `java.lang.Integer` object on the heap, wrapping the 32-bit int, storing references, dereferencing the pointer (unboxing), and later collecting the short-lived wrapper via GC. In high-throughput streaming systems processing millions of records per second, this creates massive CPU overhead, L1/L2 cache misses, and Stop-The-World GC pauses. Primitive functional interfaces (`IntPredicate`, `LongConsumer`, `ToDoubleFunction`) operate directly on native 32-bit and 64-bit primitive values on registers/stack with absolute zero heap allocation.',
        followUp: 'Name the three primary primitive families supported in java.util.function.',
        followUpAnswer: 'int, long, and double. (Other primitives like boolean, byte, short, char are generally handled via int specializations or custom interfaces).',
        keyPhrases: [
          'Type erasure constraint',
          'Autoboxing/unboxing heap penalty',
          'Garbage collection churn and GC pauses',
          'CPU cache line invalidations',
          'Zero-allocation primitive specializations'
        ],
        commonMistakeAnswer: 'Assuming primitive functional interfaces were added purely for convenience or shorter syntax.'
      },
      {
        question: 'How do you handle Checked Exceptions inside Java Lambdas? Why does java.util.function not declare throws Exception?',
        answer: 'Standard functional interfaces in `java.util.function` (`Function`, `Predicate`, `Consumer`) do NOT declare checked exceptions in their SAM signatures. This was an intentional API design decision: if `Function<T, R>` declared `throws Throwable` or `throws Exception`, every single Stream pipeline invocation in standard Java would force caller code to wrap every `map()` or `filter()` call in an explicit `try-catch` block, destroying the elegance and readability of functional programming. To handle checked exceptions inside a lambda, developers have three primary architectures: 1) Local `try-catch` block inside the lambda wrapping the checked exception into an unchecked `RuntimeException`; 2) A higher-order wrapper utility (e.g. `unchecked(s -> Files.readAllLines(s))`); 3) Sneaky Throws (exploiting generic type erasure to rethrow checked exceptions without compiler declaration).',
        followUp: 'Can you define your own functional interface that declares a checked exception and use it with a lambda?',
        followUpAnswer: 'Yes! Any custom @FunctionalInterface can declare checked exceptions in its SAM (e.g. `R apply(T t) throws IOException`). It can be invoked via lambda syntax, but it cannot be passed to standard Stream methods like map() which expect java.util.function.Function.',
        keyPhrases: [
          'Intentional design to prevent try-catch boilerplate in Streams',
          'Wrapping in RuntimeException',
          'Higher-order exception wrapper functions',
          'Lombok @SneakyThrows / generic erasure bypass',
          'Custom throwing functional interfaces'
        ],
        commonMistakeAnswer: 'Saying lambdas cannot throw checked exceptions under any circumstances.'
      },
      {
        question: 'What is the performance profile of a Lambda Expression versus an Anonymous Inner Class in terms of memory, classloading, and execution speed?',
        answer: '1) Classloading & Startup: Anonymous Inner Classes require loading a physical `.class` file per anonymous class from the filesystem, validating bytecode, and populating Metaspace at application startup. Lambdas use `invokedynamic`, deferring linkage until first execution and avoiding Metaspace pollution. 2) Memory Footprint: An AIC instance always allocates a new object on the heap, consuming at least 16-24 bytes for object headers plus an extra reference field to the enclosing instance (`Outer.this`), even if it does not use it. Non-capturing lambdas are optimized by the JVM into singletons (one instance per JVM), incurring zero subsequent allocations. 3) Execution Speed: Once the `CallSite` is linked by the JVM JIT compiler (C2), lambda invocations can be inlined as directly as ordinary method calls, often matching or exceeding the raw execution speed of anonymous classes.',
        followUp: 'When can a lambda perform worse than or equal to an anonymous class?',
        followUpAnswer: 'When a lambda captures multiple local variables or "this", a synthetic capture class must still be allocated on each invocation, making its heap allocation footprint similar to an anonymous class.',
        keyPhrases: [
          'Metaspace and disk I/O reduction',
          'Lazy linkage via invokedynamic CallSite',
          'Non-capturing singleton reuse',
          'JIT C2 inlining capability',
          'Capturing lambdas allocate instances'
        ],
        commonMistakeAnswer: 'Believing that capturing lambdas are always zero-allocation.'
      },
      {
        question: 'Can capturing variables in a lambda cause memory leaks? Explain how capturing "this" or enclosing objects affects Garbage Collection.',
        answer: 'Yes, capturing lambdas can easily cause subtle, devastating memory leaks. When a lambda references an instance field or calls an instance method of its enclosing class, the compiler automatically captures the enclosing class `this` reference. The lambda instance will maintain a strong reference to the entire enclosing object. If that lambda is subsequently passed to a long-lived object (such as a static cache, a singleton event listener registry, or a background worker thread), the entire enclosing class instance—along with all of its heap fields, collections, and referenced resources—is prevented from being garbage collected. This is identical to the memory leak risks of non-static inner classes. To avoid this, prefer non-capturing lambdas or extract the needed data into a local primitive or DTO before the lambda definition so that only the local data is captured rather than the enclosing `this`.',
        followUp: 'How can you verify whether a lambda has captured "this" at compile time?',
        followUpAnswer: 'Inspect the generated bytecode using javap -c -p: if the synthetic lambda method is "private static", "this" was not captured. If it is "private instance" or accepts an instance of OuterClass as its first parameter, "this" was captured.',
        keyPhrases: [
          'Implicit "this" reference capture',
          'Long-lived listener/cache retention',
          'Prevention of garbage collection',
          'javap inspection for static vs instance synthetic methods',
          'DTO extraction mitigation'
        ],
        commonMistakeAnswer: 'Assuming lambdas are immune to memory leaks because they are not declared with the "class" keyword.'
      }
    ],
    miniQuiz: [
      {
        question: 'What JVM bytecode instruction is emitted by javac at the call site of a lambda expression?',
        options: [
            'invokevirtual',
            'invokestatic',
            'invokedynamic',
            'invokeinterface'
        ],
        correctIndex: 2,
        explanation: 'Java 8+ compiles lambda expressions using the `invokedynamic` opcode (introduced in JSR 292), delegating linkage to `LambdaMetafactory.metafactory` at runtime rather than generating separate class files at compile-time.'
      },
      {
        question: 'Which of the following interfaces is NOT a valid @FunctionalInterface?',
        options: [
            'interface A { void run(); }',
            'interface B { void run(); boolean equals(Object o); }',
            'interface C { void run(); default void walk() {} }',
            'interface D { void run(); void stop(); }'
        ],
        correctIndex: 3,
        explanation: 'Interface D has two non-Object abstract methods (`run()` and `stop()`), violating the Single Abstract Method (SAM) contract. Interface B is valid because `equals(Object)` overrides a public method of `java.lang.Object` and does not count.'
      },
      {
        question: 'Inside a lambda expression defined within a non-static method of class Widget, what does the keyword "this" refer to?',
        options: [
            'The synthetic instance of the Functional Interface generated by the JVM',
            'The enclosing instance of the Widget class',
            'It is null by default',
            'Using "this" inside any lambda causes a compilation error'
        ],
        correctIndex: 1,
        explanation: 'Lambdas are lexically scoped. They do not introduce a new scope or a distinct "this" reference; "this" refers to the enclosing class instance (`Widget`).'
      },
      {
        question: 'Why must local variables captured inside a lambda be effectively final?',
        options: [
            'Because Java bytecode does not support multi-threading',
            'Because local variables reside on the thread stack and are copied by value to the heap; allowing mutation would cause stack-heap desynchronization',
            'Because the JVM garbage collector cannot track primitive variables',
            'Because all functional interfaces inherit from java.lang.Immutable'
        ],
        correctIndex: 1,
        explanation: 'Local variables live on the stack and disappear when the method returns. The lambda lives on the heap and receives a copy of the variable by value. If mutation were allowed, the stack and heap values would diverge, creating fatal concurrency anomalies.'
      },
      {
        question: 'Given String::compareToIgnoreCase, what category of method reference is this, and what is its equivalent lambda signature?',
        options: [
            'Static method reference; (String s) -> String.compareToIgnoreCase(s)',
            'Bound instance method reference; () -> str.compareToIgnoreCase()',
            'Unbound instance method reference; (s1, s2) -> s1.compareToIgnoreCase(s2)',
            'Constructor reference; (String s) -> new String(s)'
        ],
        correctIndex: 2,
        explanation: '`String::compareToIgnoreCase` is an unbound instance method reference. The first parameter supplied to the functional interface serves as the receiver target upon which the method is invoked: `(s1, s2) -> s1.compareToIgnoreCase(s2)`.'
      },
      {
        question: 'What is the functional signature of a Supplier<T>?',
        options: [
            'T -> void',
            'void -> T (takes nothing, returns T)',
            'T -> boolean',
            'T -> T'
        ],
        correctIndex: 1,
        explanation: '`Supplier<T>` has the single abstract method `T get()`. It takes no arguments and lazily produces an instance of type `T`.'
      },
      {
        question: 'Which functional interface should be used to test if an integer is positive without incurring autoboxing overhead?',
        options: [
            'Predicate<Integer>',
            'Function<Integer, Boolean>',
            'IntPredicate',
            'UnaryOperator<Integer>'
        ],
        correctIndex: 2,
        explanation: '`IntPredicate` has the method `boolean test(int value)` which operates strictly on primitive `int` values, completely bypassing `java.lang.Integer` heap allocations and autoboxing.'
      },
      {
        question: 'What is the output of Function<Integer, Integer> f = (x -> x + 3); System.out.println(f.andThen(x -> x * 2).apply(4));?',
        options: [
            '14',
            '11',
            '10',
            '24'
        ],
        correctIndex: 0,
        explanation: '`andThen` executes left-to-right: first `x -> x + 3` executes on 4 giving 7, then `x -> x * 2` executes on 7 giving 14.'
      },
      {
        question: 'Can a lambda expression modify an instance field of its enclosing class?',
        options: [
            'No, all variables accessed by a lambda must be effectively final, including fields',
            'Yes, because instance fields reside on the heap and are accessed through the captured "this" reference',
            'Only if the field is declared volatile',
            'Only if the lambda is marked synchronized'
        ],
        correctIndex: 1,
        explanation: 'The "effectively final" restriction applies strictly to LOCAL stack variables. Instance and static fields reside on the heap; the lambda captures the reference to the enclosing object (`this`) and can freely read or modify its heap fields.'
      },
      {
        question: 'What does BinaryOperator<T> extend in java.util.function?',
        options: [
            'BiFunction<T, T, T>',
            'BiConsumer<T, T>',
            'UnaryOperator<T>',
            'Function<T, T>'
        ],
        correctIndex: 0,
        explanation: '`BinaryOperator<T>` is a specialization that extends `BiFunction<T, T, T>`, representing an operation upon two operands of the same type producing a result of the same type.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 22.2: Stream Pipeline Lifecycle & Intermediate Operations
  // ─────────────────────────────────────────────────────────────
  'stream-pipeline-intermediate-operations': {
    id: 'stream-pipeline-intermediate-operations',
    moduleId: 'java-streams',
    moduleTitle: '22. Java 8+ Streams & Lambdas',
    lessonNumber: 'Lesson 22.2',
    title: 'Stream Pipeline Lifecycle & Intermediate Operations',
    subtitle: 'Declarative pipelines, lazy evaluation, stateless vs stateful operations, short-circuiting mechanics, stream consumption rule, and primitive streams',
    estimatedMinutes: 30,
    beginnerAnalogy: 'Think of a Java Stream as an industrial automotive assembly line conveyor belt. A Collection (like an ArrayList) is a storage warehouse holding physical car chassis sitting in inventory. The Stream itself does NOT store cars. When you declare intermediate operations like filter(), map(), and skip(), you are NOT moving any cars! You are merely installing automated robotic arms and spray-painting nozzles along the conveyor belt (lazy configuration). Not a single motor hums and not a single drop of paint is sprayed until the floor supervisor walks over and pushes the large red "START" button at the very end of the line (the Terminal Operation, like collect() or findFirst()). Once triggered, each chassis travels down the conveyor belt in a single continuous pass through all active stations (loop fusion). If station 1 filters out a defective chassis, it is immediately discarded before station 2 wastes paint on it! But remember: once that conveyor run completes, the belt is permanently powered down—if you want to process parts again, you must lay a brand-new conveyor belt (the single-consumption rule)!',
    interviewTakeaways: [
      'Streams are Computations, Not Data Structures: A Stream carries values from a data source (collection, array, I/O channel, generator) through a pipeline of computational steps. It does not store elements and never modifies the underlying data source.',
      'Lazy Evaluation & Loop Fusion: Intermediate operations are strictly lazy. No element processing occurs until a terminal operation is invoked. The JVM fuses intermediate operations into a single continuous pass (loop fusion), eliminating the need for temporary intermediate collections between transformations.',
      'Stateless vs Stateful Intermediate Operations: Stateless operations (`filter`, `map`, `flatMap`, `peek`) process each element independently with $O(1)$ memory. Stateful operations (`sorted`, `distinct`, `limit`, `skip`) require inspecting previously seen elements or the entire dataset before emitting results. Specifically, `sorted()` forms a barrier synchronization point, buffering all upstream elements into memory before emitting the first element.',
      'Short-Circuiting Mechanics: Short-circuiting operations (intermediate: `limit(n)`; terminal: `findFirst()`, `anyMatch()`) allow pipelines operating over infinite streams (`Stream.iterate()`, `Stream.generate()`) to terminate safely in finite time.',
      'The Single-Consumption Rule: A Stream can be traversed EXACTLY ONCE. Attempting to invoke an intermediate or terminal operation on a stream that has already executed a terminal operation or been closed throws `IllegalStateException: stream has already been operated upon or closed`.',
      'Primitive Specializations (IntStream, LongStream, DoubleStream): Boxed streams (`Stream<Integer>`) incur devastating autoboxing penalties. Primitive streams provide specialized numeric operations (`sum()`, `average()`, `summaryStatistics()`, `rangeClosed()`) with zero heap allocation.',
      'The peek() Anti-Pattern in Production: `peek()` exists solely to support debugging (e.g. logging elements as they flow through the pipeline). In Java 9+, the JVM stream optimizer is legally permitted to elide (skip) `peek()` invocations if the terminal operation does not require element traversal (such as `stream.peek(...).count()`). Never rely on `peek()` for business side effects!',
      'Spliterator and Pipeline Characteristics: Streams internally carry optimization metadata via `Spliterator` flags (`SIZED`, `DISTINCT`, `SORTED`, `ORDERED`). For instance, if an upstream source is already `SORTED`, a subsequent `.sorted()` call can be optimized into a no-op.'
    ],
    cheatSheet: {
      summary: 'A Stream pipeline consists of a Source, zero or more Intermediate Operations (lazy, stateless or stateful), and exactly one Terminal Operation. Streams are single-use and fuse intermediate steps into a single pass.',
      syntaxTemplate: `// 1. Pipeline Anatomy
List<String> results = list.stream()       // Source
    .filter(s -> s.length() > 3)           // Stateless Intermediate
    .map(String::toUpperCase)              // Stateless Intermediate
    .distinct()                            // Stateful Intermediate
    .sorted()                              // Stateful Barrier Intermediate
    .limit(5)                              // Short-circuiting Stateful Intermediate
    .collect(Collectors.toList());         // Terminal Operation (Triggers Execution)

// 2. Stream Creation Sources
Stream<String> s1 = collection.stream();
Stream<String> s2 = Arrays.stream(new String[]{"A", "B"});
Stream<String> s3 = Stream.of("A", "B", "C");
Stream<Integer> s4 = Stream.iterate(0, n -> n + 2); // Infinite stream
IntStream s5 = IntStream.rangeClosed(1, 100);       // Primitive stream [1..100]

// 3. Primitive Stream Aggregation
IntSummaryStatistics stats = IntStream.of(10, 20, 30, 40)
    .summaryStatistics();
System.out.println("Max: " + stats.getMax() + ", Avg: " + stats.getAverage());`,
      rules: [
        { rule: 'Single Traversal Contract', explanation: 'A stream pipeline is executed once. Any attempt to reuse a stream after terminal operation execution throws IllegalStateException.' },
        { rule: 'Terminal Trigger Mandate', explanation: 'Without a terminal operation, intermediate operations will never execute; no elements are traversed or processed.' },
        { rule: 'Stateful Barrier Warning', explanation: 'Operations like sorted() must consume all upstream elements before producing any downstream elements, causing high memory buffering.' },
        { rule: 'Infinite Stream Ordering', explanation: 'Calling sorted() on an infinite stream without first limiting it with limit() produces an infinite loop and eventually OutOfMemoryError.' },
        { rule: 'Primitive Stream Boxing Avoidance', explanation: 'Use mapToInt(), mapToLong(), or mapToDouble() to transition from generic Stream<T> to primitive streams and avoid GC pressure.' },
        { rule: 'peek() Non-Interference', explanation: 'peek() is designed for debug inspection; the JVM may skip executing peek() if stream sizing metadata renders element traversal unnecessary.' }
      ],
      quickComparison: [
        { aspect: 'Memory Overhead', optionA: 'Stateless (filter, map): O(1) constant memory per element', optionB: 'Stateful (sorted, distinct): O(N) memory buffering elements' },
        { aspect: 'Execution Latency', optionA: 'Stateless: Elements pass through immediately to next stage', optionB: 'Stateful (sorted): Blocks pipeline until upstream finishes' },
        { aspect: 'Infinite Stream Safe', optionA: 'Stateless: Safe when combined with downstream short-circuit', optionB: 'Stateful: sorted() on infinite stream hangs permanently' },
        { aspect: 'Parallel Scalability', optionA: 'Stateless: Embarrassingly parallel, scales linearly across cores', optionB: 'Stateful: Requires cross-thread coordination and merge steps' },
        { aspect: 'Order Dependency', optionA: 'Stateless: Processes elements in encounter order or unordered', optionB: 'Stateful: Must establish total ordering or record unique set' }
      ]
    },
    coreExplanation: [
      'The Architecture of a Stream Pipeline: A Java Stream is not a data structure; it is an abstraction representing a sequence of elements supporting sequential and parallel aggregate operations. Every stream pipeline adheres to a strict tripartite lifecycle: 1) A Source (such as a `Collection`, an array, an I/O channel, or a generator function); 2) Zero or more Intermediate Operations (which transform the stream into another stream, such as `filter()` or `map()`); 3) Exactly One Terminal Operation (which produces a non-stream result, such as `collect()`, `reduce()`, `count()`, or a side-effect via `forEach()`).',
      'The Mechanics of Lazy Evaluation and Loop Fusion: The most profound performance feature of Java Streams is laziness. Intermediate operations are never executed at the moment they are declared. When you chain `.filter().map()`, the JVM constructs a linked pipeline of `Sink` objects. Only when a terminal operation is called does data pull through the pipeline. Furthermore, the JVM employs "loop fusion": rather than iterating through the entire collection to filter elements into a temporary list and then iterating through that temporary list to map elements, the JVM passes each element individually through the entire chain of intermediate operations in a single pass. This minimizes CPU cache misses and avoids allocating intermediate collections.',
      'Stateless Intermediate Operations: An intermediate operation is stateless if the processing of an element does not depend on any other element in the stream. Examples include `filter(Predicate)` (discards non-matching elements), `map(Function)` (transforms element $T \\to R$), `flatMap(Function)` (transforms each element into a stream and flattens them into a single stream), and `peek(Consumer)` (performs an action on each element). Because stateless operations require no memory of past elements ($O(1)$ memory per element), they are exceptionally fast and scale linearly across CPU cores in parallel streams.',
      'Stateful Intermediate Operations and Barrier Synchronization: An intermediate operation is stateful if processing an element requires state derived from previously seen elements. Examples include `distinct()` (tracks previously seen elements in a hash set), `limit(n)` (tracks count of emitted elements), `skip(n)` (tracks count of discarded elements), and `sorted()` (requires comparing all elements). `sorted()` is a full memory barrier: it CANNOT emit a single element to downstream operations until it has consumed, buffered, and sorted EVERY upstream element! In large datasets, stateful operations cause significant memory allocations and prevent immediate element-by-element pipelining.',
      'Short-Circuiting Mechanics and Infinite Streams: In standard collections, an infinite dataset would instantly crash the JVM with an `OutOfMemoryError`. In Streams, infinite streams can be generated using `Stream.iterate(seed, unaryOperator)` or `Stream.generate(supplier)`. A pipeline over an infinite stream can terminate in finite time if it contains a short-circuiting operation. An intermediate operation is short-circuiting if, when presented with infinite input, it may produce a finite stream (e.g., `limit(n)`). A terminal operation is short-circuiting if, when presented with infinite input, it may terminate in finite time (e.g., `findFirst()`, `findAny()`, `anyMatch()`). However, placing `sorted()` before `limit()` on an infinite stream causes an infinite loop because `sorted()` must consume the entire infinite stream before sorting!',
      'The Single-Consumption Rule: A Stream can be operated upon or traversed exactly once. Once a terminal operation has begun execution or the stream has been closed, the stream pipeline is considered consumed. Any subsequent attempt to invoke an intermediate or terminal operation on that same stream instance results in an immediate runtime exception: `java.lang.IllegalStateException: stream has already been operated upon or closed`. To perform multiple operations over the same source data, you must generate a fresh stream from the underlying collection or supplier.',
      'Flattening Hierarchies with flatMap(): `map(Function<T, R>)` performs a 1-to-1 mapping: for every element of type `T`, it emits exactly one element of type `R`. If each element contains a nested collection (e.g., an `Order` containing a `List<LineItem>`), calling `map(Order::getLineItems)` yields a `Stream<List<LineItem>>`. In contrast, `flatMap(Function<T, Stream<R>>)` performs a 1-to-many mapping: it maps each element to a stream, and then automatically flattens all individual streams into a single composite `Stream<LineItem>`. This is the fundamental monadic bind operation in Java.',
      'Primitive Streams and Numerical Aggregations: Using `Stream<Integer>` or `Stream<Double>` forces continuous boxing and unboxing. Java provides three dedicated primitive stream interfaces: `IntStream`, `LongStream`, and `DoubleStream`. These streams expose specialized aggregate operations that do not exist on object streams: `sum()`, `average()`, `min()`, `max()`, and `summaryStatistics()`. They can be created using `IntStream.range(start, end)` (exclusive), `IntStream.rangeClosed(start, end)` (inclusive), or transformed from object streams using `mapToInt()`, `mapToLong()`, and `mapToDouble()`. To convert a primitive stream back to an object stream, call `.boxed()` or `.mapToObj()`.',
      'The peek() Optimization Caveat in Modern Java: `peek(Consumer)` was introduced strictly as a debugging aid to inspect elements as they flow through a pipeline without modifying them. However, developers frequently misuse `peek()` to mutate objects or perform critical business logic. In Java 9+, the JVM stream execution engine was enhanced with stream sizing optimizations: if the source has the `SIZED` characteristic and the terminal operation is size-dependent (such as `stream.peek(...).count()`), the JVM skips intermediate operations that do not change stream size! As a result, `peek()` is completely bypassed and never executes. Always use `map()` or a terminal `forEach()` for side effects.'
    ],
    diagram: `STREAM PIPELINE ARCHITECTURE & LOOP FUSION
========================================================================

                [ DATA SOURCE ] (e.g., List<Employee>)
                       │
                       ▼ .stream()
  ┌────────────────────────────────────────────────────────┐
  │ INTERMEDIATE STAGE 1: filter(e -> e.salary > 50k)      │ Stateless
  │   - Discards elements conditionally (O(1) memory)      │
  └────────────────────────────┬───────────────────────────┘
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │ INTERMEDIATE STAGE 2: map(Employee::getName)           │ Stateless
  │   - Transforms Employee -> String (O(1) memory)        │
  └────────────────────────────┬───────────────────────────┘
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │ INTERMEDIATE STAGE 3: sorted()                         │ Stateful Barrier!
  │   - MUST BUFFER ALL UPSTREAM ELEMENTS BEFORE EMITTING! │ O(N) memory
  └────────────────────────────┬───────────────────────────┘
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │ INTERMEDIATE STAGE 4: limit(3)                         │ Short-Circuit
  │   - Emits first 3 elements, then terminates stream     │
  └────────────────────────────┬───────────────────────────┘
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │ TERMINAL OPERATION: collect(toList())                  │ TRIGGERS PIPELINE!
  │   - Pulls data through fused loop; produces List<String>│
  └────────────────────────────────────────────────────────┘

------------------------------------------------------------------------
LOOP FUSION TRACE (Element-by-Element Single Pass):
------------------------------------------------------------------------
Source Elements: [Alice (40k), Bob (80k), Charlie (90k)]

Element 1: Alice (40k)   ──> filter() fails  ──> DISCARDED IMMEDIATELY!
Element 2: Bob (80k)     ──> filter() passes ──> map("Bob")     ──> to sorted buffer
Element 3: Charlie (90k) ──> filter() passes ──> map("Charlie") ──> to sorted buffer
* sorted() sorts ["Bob", "Charlie"] -> limit(3) emits all -> collect() returns list!`,
    codeSnippet: {
      title: 'Stream Pipeline Lifecycle, Laziness & Intermediate Operations',
      code: `import java.util.*;
import java.util.stream.*;

public class StreamLifecycleDemo {
    public static void main(String[] args) {
        List<String> rawData = Arrays.asList("apple", "banana", "avocado", "apricot", "cherry", "banana");

        System.out.println("--- Building Pipeline (No Output Expected Yet) ---");
        // Intermediate operations are LAZY; nothing executes here!
        Stream<String> pipeline = rawData.stream()
            .filter(fruit -> {
                System.out.println("  filter: " + fruit);
                return fruit.startsWith("a");
            })
            .map(fruit -> {
                System.out.println("  map:    " + fruit);
                return fruit.toUpperCase();
            })
            .sorted() // STATEFUL BARRIER: Buffers all matching elements!
            .limit(2); // SHORT-CIRCUITING

        System.out.println("--- Invoking Terminal Operation (Execution Begins) ---");
        List<String> results = pipeline.collect(Collectors.toList());
        System.out.println("Final Results: " + results);

        // One-time consumption rule
        try {
            System.out.println("Attempting to reuse consumed stream...");
            pipeline.count();
        } catch (IllegalStateException e) {
            System.out.println("Caught Expected: " + e.getMessage());
        }
    }
}`,
      lineByLineExplanation: [
        { line: 'Stream<String> pipeline = rawData.stream()...', explanation: 'Configures the pipeline. No elements are processed yet because intermediate operations are strictly lazy.' },
        { line: '.filter(fruit -> { ... return fruit.startsWith("a"); })', explanation: 'Stateless intermediate operation. Only passes elements beginning with "a".' },
        { line: '.map(fruit -> { ... return fruit.toUpperCase(); })', explanation: 'Stateless intermediate operation transforming String to uppercase.' },
        { line: '.sorted()', explanation: 'Stateful barrier operation. It buffers all upstream elements that passed the filter before sorting them.' },
        { line: '.limit(2)', explanation: 'Short-circuiting intermediate operation. Limits the output stream to at most 2 elements.' },
        { line: 'List<String> results = pipeline.collect(Collectors.toList());', explanation: 'Terminal operation. Triggers element traversal and loop execution across the pipeline.' },
        { line: 'pipeline.count();', explanation: 'Reusing a consumed stream immediately triggers IllegalStateException.' }
      ],
      output: `--- Building Pipeline (No Output Expected Yet) ---
--- Invoking Terminal Operation (Execution Begins) ---
  filter: apple
  map:    apple
  filter: banana
  filter: avocado
  map:    avocado
  filter: apricot
  map:    apricot
  filter: cherry
  filter: banana
Final Results: [APPLE, APRICOT]
Attempting to reuse consumed stream...
Caught Expected: stream has already been operated upon or closed`
    },
    codeExamples: [
      {
        title: 'Loop Fusion and Laziness: Step-by-Step Execution Verification',
        description: 'Demonstrates how elements flow vertically through all operations one by one rather than horizontally stage by stage.',
        code: `import java.util.*;
import java.util.stream.*;

public class LoopFusionDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alexander", "Bob", "Christopher", "Dan");

        System.out.println("Starting findFirst pipeline:");
        // findFirst short-circuits as soon as ONE element makes it all the way through!
        Optional<String> match = names.stream()
            .filter(s -> {
                System.out.println("Filter evaluated: " + s);
                return s.length() > 3;
            })
            .map(s -> {
                System.out.println("Map evaluated:    " + s);
                return s.toUpperCase();
            })
            .findFirst();

        System.out.println("Matched: " + match.orElse("None"));
    }
}`,
        output: `Starting findFirst pipeline:
Filter evaluated: Alexander
Map evaluated:    Alexander
Matched: ALEXANDER`
      },
      {
        title: 'flatMap vs map: Flattening Nested Hierarchies',
        description: 'Demonstrates 1-to-1 transformation with map() versus 1-to-many flattening with flatMap().',
        code: `import java.util.*;
import java.util.stream.*;

class Order {
    int id;
    List<String> items;
    Order(int id, List<String> items) { this.id = id; this.items = items; }
}

public class FlatMapDemo {
    public static void main(String[] args) {
        List<Order> orders = Arrays.asList(
            new Order(101, Arrays.asList("Laptop", "Mouse")),
            new Order(102, Arrays.asList("Keyboard")),
            new Order(103, Arrays.asList("Monitor", "Desk", "Chair"))
        );

        // map() produces Stream<List<String>> (Nested Structure)
        List<List<String>> nested = orders.stream()
            .map(order -> order.items)
            .collect(Collectors.toList());
        System.out.println("Nested with map():     " + nested);

        // flatMap() flattens Stream<List<String>> into Stream<String>
        List<String> flattened = orders.stream()
            .flatMap(order -> order.items.stream())
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("Flattened with flatMap(): " + flattened);
    }
}`,
        output: `Nested with map():     [[Laptop, Mouse], [Keyboard], [Monitor, Desk, Chair]]
Flattened with flatMap(): [LAPTOP, MOUSE, KEYBOARD, MONITOR, DESK, CHAIR]`
      },
      {
        title: 'Stateful Barrier Synchronization: sorted() with Infinite Streams',
        description: 'Proves why sorted() placed before limit() on an infinite stream hangs, while limit() placed before sorted() succeeds.',
        code: `import java.util.*;
import java.util.stream.*;

public class StatefulInfiniteStreamDemo {
    public static void main(String[] args) {
        System.out.println("Case 1: limit(5) BEFORE sorted() -> SUCCESSFUL:");
        List<Integer> finiteSorted = Stream.iterate(100, n -> n - 3)
            .limit(5)       // Short-circuits the infinite stream to 5 elements: [100, 97, 94, 91, 88]
            .sorted()       // Safely sorts the 5 elements!
            .collect(Collectors.toList());
        System.out.println("Result: " + finiteSorted);

        System.out.println("Case 2: sorted() BEFORE limit(5) on infinite stream -> HANGS!");
        System.out.println("// Stream.iterate(100, n -> n - 3).sorted().limit(5) will hang forever");
        System.out.println("// because sorted() must buffer all infinite elements before emitting one!");
    }
}`,
        output: `Case 1: limit(5) BEFORE sorted() -> SUCCESSFUL:
Result: [88, 91, 94, 97, 100]
Case 2: sorted() BEFORE limit(5) on infinite stream -> HANGS!
// Stream.iterate(100, n -> n - 3).sorted().limit(5) will hang forever
// because sorted() must buffer all infinite elements before emitting one!`
      },
      {
        title: 'Primitive Streams & SummaryStatistics: Zero-Allocation Aggregation',
        description: 'High-throughput numerical statistics using IntStream.rangeClosed() and IntSummaryStatistics.',
        code: `import java.util.IntSummaryStatistics;
import java.util.stream.IntStream;

public class PrimitiveStreamBenchmark {
    public static void main(String[] args) {
        // Generating primitive range [1..1,000,000] with zero boxing
        long start = System.nanoTime();
        IntSummaryStatistics stats = IntStream.rangeClosed(1, 1_000_000)
            .filter(n -> (n & 1) == 0) // Even numbers only
            .summaryStatistics();
        long elapsed = System.nanoTime() - start;

        System.out.println("Count:   " + stats.getCount());
        System.out.println("Sum:     " + stats.getSum());
        System.out.println("Min:     " + stats.getMin());
        System.out.println("Max:     " + stats.getMax());
        System.out.println("Average: " + stats.getAverage());
        System.out.println("Elapsed: " + (elapsed / 1_000_000.0) + " ms");
    }
}`,
        output: `Count:   500000
Sum:     250000500000
Min:     2
Max:     1000000
Average: 500001.0
Elapsed: 6.42 ms`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Reusing a Stream instance after calling a terminal operation on it',
        whyItHappens: 'Developers treat Streams like Collections (which can be iterated repeatedly). A Stream is a one-shot pipeline that consumes its underlying spliterator.',
        howToFix: 'Create a new stream each time you need to query the data, or use a Supplier<Stream<T>>: Supplier<Stream<String>> streamSupplier = () -> list.stream();'
      },
      {
        mistake: 'Using peek() to modify element state or perform business logic in production code',
        whyItHappens: 'Developers see peek(e -> doSomething(e)) as an intermediate forEach() to trigger side effects while keeping the pipeline flowing.',
        howToFix: 'Never rely on peek() for business operations. In Java 9+, operations like stream.peek(...).count() can be optimized to skip peek entirely. Use map() for transformations or terminal forEach() for side effects.'
      },
      {
        mistake: 'Placing sorted() before limit() on an infinite or extremely large stream',
        whyItHappens: 'Developers assume limit(n) will truncate the stream first even if placed after sorted().',
        howToFix: 'Always place limit() before sorted() when dealing with infinite streams. sorted() is a full barrier operation that must consume the entire stream before it can sort and emit anything.'
      },
      {
        mistake: 'Using Stream<Integer> with reduce() or map() instead of IntStream for numeric computations',
        whyItHappens: 'Generics are the default in Java collections, so developers write list.stream().map(Integer::valueOf) without realizing the massive boxing/unboxing overhead.',
        howToFix: 'Use mapToInt(), mapToLong(), or mapToDouble() to switch to primitive streams and leverage optimized methods like sum(), average(), and summaryStatistics().'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Stream Without Terminal Operation Execution',
        problemStatement: 'What does the following program print when compiled and executed?',
        code: `import java.util.Arrays;
import java.util.List;

public class Puzzle1 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("alpha", "bravo", "charlie");
        list.stream().filter(s -> {
            System.out.print(s + " ");
            return s.length() > 4;
        });
    }
}`,
        options: [
            'A) alpha bravo charlie ',
            'B) alpha bravo ',
            'C) Nothing is printed',
            'D) Compilation Error: stream expression not used'
        ],
        correctOptionIndex: 2,
        hint: 'Did the stream pipeline declare a terminal operation?',
        solution: 'Option C is correct: Nothing is printed.',
        explanation: 'Intermediate operations in Java Streams (such as `filter()`) are strictly LAZY. They configure the pipeline but do not execute any processing until a terminal operation (like `collect()`, `forEach()`, or `count()`) is invoked on the stream. Since no terminal operation was called, the stream was never evaluated.'
      },
      {
        title: 'Puzzle 2: Re-consuming an Already Executed Stream',
        problemStatement: 'What is the outcome of compiling and running this code?',
        code: `import java.util.stream.Stream;

public class Puzzle2 {
    public static void main(String[] args) {
        Stream<String> s = Stream.of("Java", "Kotlin", "Scala");
        long count = s.count();
        try {
            boolean hasJava = s.anyMatch(str -> str.equals("Java"));
            System.out.println(count + " " + hasJava);
        } catch (IllegalStateException e) {
            System.out.println("Exception: " + count);
        }
    }
}`,
        options: [
            'A) 3 true',
            'B) 3 false',
            'C) Exception: 3',
            'D) Compilation Error: cannot invoke anyMatch on Stream'
        ],
        correctOptionIndex: 2,
        hint: 'How many times can a single Stream instance be operated upon?',
        solution: 'Option C is correct: Exception: 3.',
        explanation: 'Under the Java Stream specification, a stream pipeline cannot be reused once a terminal operation has been executed or the stream has been closed. Invoking `s.count()` executes a terminal operation and consumes the stream. The subsequent call to `s.anyMatch()` throws an `IllegalStateException: stream has already been operated upon or closed`.'
      },
      {
        title: 'Puzzle 3: Loop Fusion and Short-Circuiting Order of Operations',
        problemStatement: 'What does this program print?',
        code: `import java.util.Arrays;
import java.util.List;

public class Puzzle3 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("one", "two", "three", "four", "five");
        list.stream()
            .filter(s -> {
                System.out.print("F:" + s + " ");
                return s.length() > 3;
            })
            .map(s -> {
                System.out.print("M:" + s + " ");
                return s.toUpperCase();
            })
            .findFirst();
    }
}`,
        options: [
            'A) F:one F:two F:three F:four F:five M:three M:four M:five ',
            'B) F:one F:two F:three M:three ',
            'C) M:three F:three ',
            'D) F:one M:one F:two M:two F:three M:three '
        ],
        correctOptionIndex: 1,
        hint: 'Trace element by element through the fused pipeline until findFirst() is satisfied.',
        solution: 'Option B is correct: F:one F:two F:three M:three .',
        explanation: 'Due to loop fusion, elements are processed vertically one by one. 1) "one" goes to filter ("F:one "); length is 3 (not >3), so it is discarded. 2) "two" goes to filter ("F:two "); length is 3, discarded. 3) "three" goes to filter ("F:three "); length is 5 (>3), passes! 4) "three" goes to map ("M:three "). 5) `findFirst()` receives the mapped element and immediately short-circuits the pipeline! "four" and "five" are never evaluated.'
      },
      {
        title: 'Puzzle 4: flatMap with Empty and Null-Yielding Streams',
        problemStatement: 'What is the output of the following flatMap pipeline?',
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

public class Puzzle4 {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("A", "", "B", "C");
        long count = words.stream()
            .flatMap(w -> w.isEmpty() ? Stream.empty() : Stream.of(w, w + w))
            .count();
        System.out.println(count);
    }
}`,
        options: [
            'A) 8',
            'B) 6',
            'C) 4',
            'D) NullPointerException'
        ],
        correctOptionIndex: 1,
        hint: 'How many elements does Stream.empty() emit into the flattened stream?',
        solution: 'Option B is correct: 6.',
        explanation: 'For "A": emits Stream.of("A", "AA") (2 elements). For "": w.isEmpty() is true, so it returns `Stream.empty()` (0 elements). For "B": emits Stream.of("B", "BB") (2 elements). For "C": emits Stream.of("C", "CC") (2 elements). Total elements in the flattened stream = 2 + 0 + 2 + 2 = 6.'
      },
      {
        title: 'Puzzle 5: IntStream.range vs rangeClosed Difference',
        problemStatement: 'What does this code print?',
        code: `import java.util.stream.IntStream;

public class Puzzle5 {
    public static void main(String[] args) {
        int sum1 = IntStream.range(1, 5).sum();
        int sum2 = IntStream.rangeClosed(1, 5).sum();
        System.out.println(sum1 + " " + sum2);
    }
}`,
        options: [
            'A) 15 15',
            'B) 10 15',
            'C) 15 10',
            'D) 10 20'
        ],
        correctOptionIndex: 1,
        hint: 'Which range method is end-exclusive, and which is end-inclusive?',
        solution: 'Option B is correct: 10 15.',
        explanation: '`IntStream.range(1, 5)` generates integers from 1 up to (exclusive) 5: 1 + 2 + 3 + 4 = 10. `IntStream.rangeClosed(1, 5)` generates integers from 1 up to (inclusive) 5: 1 + 2 + 3 + 4 + 5 = 15.'
      },
      {
        title: 'Puzzle 6: peek() Optimization in Java 9+ with count()',
        problemStatement: 'What happens when running the following code in Java 9+?',
        code: `import java.util.Arrays;
import java.util.List;

public class Puzzle6 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("apple", "banana", "cherry");
        long count = list.stream()
            .peek(s -> System.out.print(s + " "))
            .count();
        System.out.print(count);
    }
}`,
        options: [
            'A) apple banana cherry 3',
            'B) 3',
            'C) Compilation Error: peek cannot be followed by count',
            'D) Runtime Exception'
        ],
        correctOptionIndex: 1,
        hint: 'Does count() need to evaluate individual elements if the stream source size is known in advance?',
        solution: 'Option B is correct: Prints "3".',
        explanation: 'In Java 9+, the stream implementation was optimized for `SIZED` collections. When `count()` is called on a pipeline consisting only of operations that cannot alter the stream size (such as `peek()`), the JVM optimizes the call by consulting the collection size directly without traversing elements. Therefore, `peek()` is elided (never called), and only the count "3" is printed.'
      },
      {
        title: 'Puzzle 7: sorted() Memory Barrier on Large Stream',
        problemStatement: 'What is the output of the following code?',
        code: `import java.util.stream.Stream;

public class Puzzle7 {
    public static void main(String[] args) {
        Stream.of(5, 4, 3, 2, 1)
            .peek(n -> System.out.print("P" + n + " "))
            .sorted()
            .limit(1)
            .forEach(n -> System.out.print("F" + n + " "));
    }
}`,
        options: [
            'A) P5 P4 P3 P2 P1 F1 ',
            'B) P1 F1 ',
            'C) P5 F5 ',
            'D) F1 P1 '
        ],
        correctOptionIndex: 0,
        hint: 'Can sorted() emit the minimum element without first inspecting all upstream elements?',
        solution: 'Option A is correct: P5 P4 P3 P2 P1 F1 .',
        explanation: '`sorted()` is a stateful barrier operation. In order to determine the smallest element for downstream consumption, `sorted()` must consume ALL upstream elements first! Therefore, all five elements pass through `peek()` ("P5 P4 P3 P2 P1 ") into the sorting buffer. Once sorted, `limit(1)` takes the first sorted element (1) and passes it to `forEach` ("F1 ").'
      },
      {
        title: 'Puzzle 8: Modifying Underlying Collection During Stream Traversal',
        problemStatement: 'What happens when running this code?',
        code: `import java.util.ArrayList;
import java.util.List;

public class Puzzle8 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Alpha");
        list.add("Beta");

        list.stream().forEach(s -> {
            if ("Alpha".equals(s)) {
                list.add("Gamma");
            }
            System.out.print(s + " ");
        });
    }
}`,
        options: [
            'A) Alpha Beta Gamma ',
            'B) Alpha Beta ',
            'C) ConcurrentModificationException is thrown',
            'D) Infinite loop adding Gamma'
        ],
        correctOptionIndex: 2,
        hint: 'Streams require non-interference with the backing data source during execution.',
        solution: 'Option C is correct: ConcurrentModificationException is thrown.',
        explanation: 'Java Streams enforce the rule of NON-INTERFERENCE: the data source backing a stream pipeline must not be structurally modified during execution. When `list.add("Gamma")` is invoked while the stream spliterator is traversing `list`, the collection modCount is incremented, and the stream spliterator detects this and throws `ConcurrentModificationException`.'
      },
      {
        title: 'Puzzle 9: distinct() Without hashCode and equals Implementation',
        problemStatement: 'What is the output of the following distinct() pipeline?',
        code: `import java.util.stream.Stream;

class Point {
    int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
}

public class Puzzle9 {
    public static void main(String[] args) {
        Point p1 = new Point(1, 2);
        Point p2 = new Point(1, 2);
        long count = Stream.of(p1, p2, p1).distinct().count();
        System.out.println(count);
    }
}`,
        options: [
            'A) 1',
            'B) 2',
            'C) 3',
            'D) Compilation Error: Point must implement Comparable'
        ],
        correctOptionIndex: 1,
        hint: 'Does distinct() use reference equality or equals()/hashCode() when not overridden?',
        solution: 'Option B is correct: 2.',
        explanation: '`distinct()` uses `Object.equals(Object)` and `Object.hashCode()` to determine uniqueness. Since `Point` does not override `equals()` or `hashCode()`, it inherits identity equality from `java.lang.Object`. `p1` and `p2` are distinct heap objects (`p1.equals(p2) == false`), but the second `p1` is identical to the first. Thus, `distinct()` retains `p1` and `p2`, yielding a count of 2.'
      },
      {
        title: 'Puzzle 10: Infinite Stream Short-Circuit with limit() and skip()',
        problemStatement: 'What does this infinite stream pipeline print?',
        code: `import java.util.stream.Stream;

public class Puzzle10 {
    public static void main(String[] args) {
        Stream.iterate(1, n -> n + 1)
            .skip(5)
            .limit(3)
            .forEach(n -> System.out.print(n + " "));
    }
}`,
        options: [
            'A) 1 2 3 ',
            'B) 5 6 7 ',
            'C) 6 7 8 ',
            'D) Hangs indefinitely'
        ],
        correctOptionIndex: 2,
        hint: 'Stream.iterate(1, ...) generates 1, 2, 3, 4, 5, 6, 7, 8... What does skip(5) discard, and what does limit(3) take?',
        solution: 'Option C is correct: 6 7 8 .',
        explanation: '`Stream.iterate(1, n -> n + 1)` generates the infinite sequence 1, 2, 3, 4, 5, 6, 7, 8, 9... `skip(5)` discards the first 5 elements (1, 2, 3, 4, 5). The next elements available are 6, 7, 8... `limit(3)` takes the next 3 elements (6, 7, 8) and immediately terminates the stream.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Explain the three phases of the Java Stream pipeline lifecycle. Why are intermediate operations described as "lazy"?',
        answer: 'A Java Stream pipeline consists of: 1) A Source (Collection, Array, I/O channel, or generator function) which supplies the initial Spliterator; 2) Zero or more Intermediate Operations (e.g., `filter`, `map`, `distinct`) which transform the stream into another stream; 3) Exactly One Terminal Operation (e.g., `collect`, `reduce`, `count`, `forEach`) which executes the pipeline and produces a non-stream result. Intermediate operations are "lazy" because calling them performs NO computation and traverses NO elements; they merely construct a chained sequence of `Sink` stages in memory. Execution only commences when a terminal operation is invoked. Laziness provides critical optimizations: it enables loop fusion (processing multiple operations in a single pass), avoids creating intermediate collections, and allows short-circuiting operations to terminate infinite streams.',
        followUp: 'What happens behind the scenes in the JVM when a terminal operation is called on a chained stream?',
        followUpAnswer: 'The JVM traverses the linked list of intermediate pipeline stages in reverse to assemble a downstream chain of Sink objects, and then begins pushing elements from the source Spliterator through this Sink chain in a single loop.',
        keyPhrases: [
          'Source, Intermediate, and Terminal phases',
          'Lazy evaluation configuration',
          'Sink chain construction',
          'Loop fusion optimization',
          'Execution triggered only by terminal operation'
        ],
        commonMistakeAnswer: 'Believing that intermediate operations build intermediate collections at each step.'
      },
      {
        question: 'What is the mechanical difference between Stateless and Stateful intermediate operations? Give concrete examples of each and explain their memory footprints.',
        answer: 'A Stateless intermediate operation processes each element independently without needing knowledge of previously seen elements. Examples include `filter()`, `map()`, and `flatMap()`. Stateless operations have an $O(1)$ memory footprint per element and allow elements to pass immediately to downstream stages. In contrast, a Stateful intermediate operation requires state accumulated from previous elements before emitting results. Examples include `distinct()` (maintains a HashSet of seen elements, $O(N)$ memory), `limit(n)` (maintains a counter), `skip(n)` (maintains a counter), and `sorted()` (requires buffering the entire upstream dataset, $O(N)$ memory). Specifically, `sorted()` acts as a full execution barrier: it cannot emit the first sorted element until it has consumed and stored all upstream elements in an internal array, making it incompatible with infinite streams unless preceded by `limit()`.',
        followUp: 'How do stateless and stateful operations impact performance in parallel streams (stream.parallel())?',
        followUpAnswer: 'Stateless operations scale almost linearly across CPU cores with zero synchronization. Stateful operations require expensive thread barriers, cross-thread data merges, and coordinated state tracking, which significantly degrade parallel speedups.',
        keyPhrases: [
          'Stateless: O(1) memory, independent element processing',
          'Stateful: O(N) memory, cross-element state accumulation',
          'sorted() as a full barrier synchronization point',
          'distinct() requires HashSet buffering',
          'Parallel stream scalability divergence'
        ],
        commonMistakeAnswer: 'Failing to mention that sorted() must buffer all elements before emitting even the first result.'
      },
      {
        question: 'Why can a Java Stream be operated upon or consumed only once? What exception is thrown upon reuse?',
        answer: 'A Java Stream represents a computational traversal over an underlying `Spliterator`, not a physical collection of elements. Once a terminal operation is initiated, the stream pulls elements through its pipeline and consumes the underlying spliterator state. To guarantee deterministic behavior, prevent data corruption, and avoid unbounded memory buffering of previously streamed elements, the Java Stream architecture explicitly forbids reuse. If any intermediate or terminal operation is invoked on a stream that has already executed a terminal operation or been closed, the runtime throws `java.lang.IllegalStateException: stream has already been operated upon or closed`. If multiple passes over the same data are needed, a new stream must be created from the source collection or via a `Supplier<Stream<T>>`.',
        followUp: 'How can you design a utility to safely regenerate a stream on demand?',
        followUpAnswer: 'By wrapping the stream generation in a Supplier: `Supplier<Stream<String>> streamSupplier = () -> list.stream();` and calling `streamSupplier.get()` whenever a new traversal is required.',
        keyPhrases: [
          'Single-traversal spliterator consumption',
          'IllegalStateException: stream has already been operated upon or closed',
          'Zero-buffering architecture',
          'Supplier<Stream<T>> pattern for regeneration'
        ],
        commonMistakeAnswer: 'Thinking that calling stream.close() allows the stream to be reopened or reused.'
      },
      {
        question: 'Differentiate map() from flatMap(). When should each be used in enterprise architectures?',
        answer: '`map(Function<T, R>)` establishes a strict 1-to-1 mapping: for every element of type `T`, it emits exactly one element of type `R`. If the mapping function returns a collection or stream (e.g. `User::getRoles` returning `List<Role>`), `map()` yields a nested stream structure: `Stream<List<Role>>`. `flatMap(Function<T, Stream<R>>)` establishes a 1-to-many (or 1-to-0) mapping: it transforms each element into a stream of elements, and then flattens all resulting individual streams into a single un-nested `Stream<R>`. In enterprise systems, `map()` is used for property projection, mathematical conversions, and DTO transformations. `flatMap()` is used for flattening hierarchical/relational data models (e.g., retrieving all line items across all customer orders), unpacking `Optional<T>` fields, and processing nested file lines.',
        followUp: 'What happens if the function passed to flatMap() returns null instead of Stream.empty()?',
        followUpAnswer: 'In Java 8, flatMap expects a non-null Stream, and returning null throws a NullPointerException during traversal. In Java 9+, flatMap supports mapping null to Stream.empty() via flatMap(x -> Stream.ofNullable(x.getProperty())).',
        keyPhrases: [
          'map is 1-to-1 transformation',
          'flatMap is 1-to-many transformation and flattening',
          'Monadic bind operation',
          'Hierarchical data traversal (Orders -> LineItems)',
          'Stream.ofNullable() in flatMap pipelines'
        ],
        commonMistakeAnswer: 'Describing flatMap as merely a combination of map followed by a distinct operation.'
      },
      {
        question: 'What are Primitive Streams (IntStream, LongStream, DoubleStream), and why are they critical in high-throughput JVM applications?',
        answer: 'Java generic streams (`Stream<T>`) cannot operate on raw JVM primitives due to type erasure; they require boxed object wrappers (`Stream<Integer>`, `Stream<Double>`). In high-throughput systems, streaming millions of boxed numbers forces the JVM to allocate millions of `Integer` objects on the heap. This causes massive memory overhead (an `Integer` takes 16-24 bytes compared to 4 bytes for an `int`), burns CPU cycles on autoboxing/unboxing, causes L1/L2 cache misses due to pointer chasing, and triggers frequent Garbage Collection pauses. `IntStream`, `LongStream`, and `DoubleStream` operate directly on primitive machine words on the stack and registers with zero heap allocation. Additionally, they provide optimized mathematical operations (`sum()`, `average()`, `min()`, `max()`, `summaryStatistics()`) that do not exist on generic `Stream<T>`.',
        followUp: 'How do you switch between generic streams and primitive streams?',
        followUpAnswer: 'Use mapToInt(), mapToLong(), or mapToDouble() to switch from Stream<T> to primitive streams. Use boxed() or mapToObj() to convert a primitive stream back to Stream<T>.',
        keyPhrases: [
          'Type erasure generic limitation',
          'Autoboxing and heap allocation overhead',
          'Cache miss and GC pause reduction',
          'IntStream, LongStream, DoubleStream specializations',
          'mapToInt() and boxed() bridging methods'
        ],
        commonMistakeAnswer: 'Assuming Stream<Integer>.reduce(0, Integer::sum) is as fast as IntStream.sum().'
      },
      {
        question: 'Why is using peek() for production business logic considered an anti-pattern? What change occurred in Java 9 regarding peek()?',
        answer: '`peek(Consumer)` was explicitly designed solely as an internal debugging aid to observe elements as they flow past a certain point in a pipeline (`stream.filter(...).peek(log).map(...)`). Using `peek()` to alter element state, populate external collections, or perform transactional business logic violates the functional design of streams (non-interference and statelessness). Furthermore, in Java 9+, the JVM stream optimizer exploits `Spliterator.SIZED` characteristics: if a stream source has a known size and the terminal operation only queries the count (e.g. `list.stream().peek(sideEffect).count()`), the JVM skips element traversal entirely because the count is already known from collection metadata. As a result, `peek()` is completely elided and never executes! Business side effects must always be performed in a terminal `forEach()` or explicit loop.',
        followUp: 'What other stream operations can cause peek() to be skipped in Java 9+?',
        followUpAnswer: 'Any terminal or intermediate operation where stream size can be determined without evaluating elements, such as count() on sized sources or short-circuiting findFirst() where previous elements satisfy the condition.',
        keyPhrases: [
          'Intended strictly for debugging/logging',
          'Non-interference contract violation',
          'Java 9 SIZED spliterator optimization',
          'peek() elision / skipping in count()',
          'Never use for transactional state changes'
        ],
        commonMistakeAnswer: 'Claiming peek() is guaranteed to execute for every element in every pipeline.'
      },
      {
        question: 'Explain Short-Circuiting in the context of both Intermediate and Terminal operations. How does it make infinite streams viable?',
        answer: 'An operation is "short-circuiting" if it can complete its work without processing all the elements of its input stream. 1) Short-circuiting Intermediate Operations: `limit(n)` truncates a stream after `n` elements; `takeWhile(Predicate)` (Java 9+) stops processing as soon as the predicate evaluates to false. 2) Short-circuiting Terminal Operations: `findFirst()`, `findAny()`, `anyMatch(p)`, `allMatch(p)`, and `noneMatch(p)` stop traversing elements as soon as their logical condition is definitively satisfied. Short-circuiting is what makes Infinite Streams (`Stream.iterate()`, `Stream.generate()`) viable in Java: an infinite stream would run forever if all elements had to be consumed, but adding `limit(10)` or calling `findFirst()` halts element generation and finishes execution in finite time.',
        followUp: 'What happens if you combine a non-short-circuiting terminal operation with an infinite stream that has no limit()?',
        followUpAnswer: 'Operations like collect(), count(), or reduce() will run in an infinite loop, continuously consuming CPU and eventually crashing with an OutOfMemoryError as intermediate buffers expand.',
        keyPhrases: [
          'Short-circuiting definition (finite termination on infinite input)',
          'Intermediate short-circuiting (limit, takeWhile)',
          'Terminal short-circuiting (findFirst, anyMatch, allMatch)',
          'Infinite stream termination viability',
          'Unbounded memory/CPU risk without short-circuiting'
        ],
        commonMistakeAnswer: 'Confusing short-circuiting with filtering (filter does not short-circuit an infinite stream).'
      },
      {
        question: 'What happens if an exception is thrown inside an intermediate stream operation during pipeline execution?',
        answer: 'If an unhandled RuntimeException (or an Error) is thrown inside an intermediate operation (such as within a `filter` predicate or a `map` function), the stream pipeline immediately aborts execution. The terminal operation terminates abruptly, no further elements are processed or pulled from the source spliterator, and the exception propagates directly up the call stack to the thread that invoked the terminal operation. If the stream was opened with resources (such as `Files.lines()`), the stream MUST be wrapped in a `try-with-resources` statement to ensure that `stream.close()` is invoked and underlying file handles or database connections are released upon exception propagation.',
        followUp: 'Does stream.close() get called automatically when an exception is thrown?',
        followUpAnswer: 'No! Terminal operations do not automatically close the stream upon exception. Streams managing I/O resources must always be enclosed in a try-with-resources block.',
        keyPhrases: [
          'Immediate pipeline abortion',
          'Exception propagation to caller thread',
          'No subsequent elements processed',
          'try-with-resources requirement for AutoCloseable streams',
          'Files.lines() resource leak prevention'
        ],
        commonMistakeAnswer: 'Believing the stream skips the failed element and continues processing the remaining elements.'
      },
      {
        question: 'What is the "Non-Interference" rule in Java Streams, and what are the consequences of violating it?',
        answer: 'The Non-Interference rule (JLS / java.util.stream package specification) mandates that the data source backing a stream must NOT be structurally modified by any lambda or operation throughout the entire execution of the stream pipeline (from the moment the terminal operation starts until it completes). Structural modifications include adding, removing, or reallocating elements in the underlying collection. If a lambda inside a stream modifies the backing collection (e.g. `list.stream().forEach(e -> list.add("new"))`), the stream spliterator detects the mismatch between expected and actual `modCount` and throws `java.util.ConcurrentModificationException` (or produces corrupted, non-deterministic results in non-fail-fast sources like ConcurrentHashMap).',
        followUp: 'How can you safely collect elements into a new collection without modifying the source collection?',
        followUpAnswer: 'By using standard terminal collectors such as .collect(Collectors.toList()) which build a completely new, independent target collection without touching the source structure.',
        keyPhrases: [
          'Non-interference contract',
          'No structural modification during pipeline execution',
          'ConcurrentModificationException (fail-fast)',
          'Unsynchronized race conditions in parallel streams',
          'Isolation of target collections via Collectors'
        ],
        commonMistakeAnswer: 'Thinking you can safely append items to the source collection inside forEach() if running sequentially.'
      },
      {
        question: 'Explain how Spliterator characteristics (SIZED, SORTED, DISTINCT, ORDERED) optimize intermediate operations.',
        answer: 'Every Java Stream is powered by an underlying `Spliterator` that reports bitwise characteristic flags: 1) `SIZED`: The source has a known, exact size (e.g. `ArrayList`). This allows `count()` to return immediately without traversing elements, and allows collectors to pre-allocate exact array capacities. 2) `SORTED`: The source is already sorted according to a defined Comparator (e.g. `TreeSet`). If a stream pipeline encounters `.sorted()`, the JVM detects the `SORTED` flag and optimizes the operation into an absolute no-op, avoiding $O(N \\log N)$ sorting overhead! 3) `DISTINCT`: The source contains no duplicates (e.g. `HashSet`). When `.distinct()` is invoked, the JVM can completely bypass HashSet buffering. 4) `ORDERED`: The source has a defined encounter order (e.g. `List`). If downstream operations do not require order, calling `.unordered()` can dramatically boost parallel performance by allowing threads to process chunks without order coordination.',
        followUp: 'How does calling .unordered() improve parallel stream performance?',
        followUpAnswer: 'It removes order-preservation constraints from stateful operations like distinct() and limit(), allowing parallel worker threads to process and emit elements immediately without waiting for upstream order synchronization.',
        keyPhrases: [
          'Spliterator characteristic flags',
          'SIZED enables count() and allocation shortcuts',
          'SORTED turns .sorted() into a no-op',
          'DISTINCT eliminates duplicate filtering overhead',
          'ORDERED removal via .unordered() boosts parallel throughput'
        ],
        commonMistakeAnswer: 'Believing that calling .sorted() on a TreeSet always performs a full re-sort.'
      }
    ],
    miniQuiz: [
      {
        question: 'What happens when intermediate operations are declared on a stream without calling a terminal operation?',
        options: [
            'All elements are filtered and mapped into a temporary memory buffer',
            'No elements are processed; intermediate operations are strictly lazy and require a terminal operation to trigger execution',
            'An IllegalStateException is thrown immediately',
            'The stream runs asynchronously in the ForkJoinPool.commonPool()'
        ],
        correctIndex: 1,
        explanation: 'Intermediate stream operations are strictly lazy. They merely build a pipeline of transformations; no iteration or element processing occurs until a terminal operation is invoked.'
      },
      {
        question: 'Which of the following intermediate operations is STATEFUL and forms a full memory barrier before emitting elements?',
        options: [
            'filter()',
            'map()',
            'sorted()',
            'peek()'
        ],
        correctIndex: 2,
        explanation: '`sorted()` is a stateful operation that acts as a full execution barrier. It must consume and buffer all upstream elements in memory before it can sort them and emit the first element downstream.'
      },
      {
        question: 'What exception is thrown if you attempt to invoke an intermediate or terminal operation on a stream that has already executed a terminal operation?',
        options: [
            'NoSuchElementException',
            'IllegalStateException',
            'StreamConsumedException',
            'ConcurrentModificationException'
        ],
        correctIndex: 1,
        explanation: 'Under the Java Stream specification, attempting to reuse a stream that has already been operated upon or closed throws `java.lang.IllegalStateException`.'
      },
      {
        question: 'What is the result of executing IntStream.range(1, 4).sum()?',
        options: [
            '10',
            '6',
            '7',
            '4'
        ],
        correctIndex: 1,
        explanation: '`IntStream.range(1, 4)` is end-exclusive, generating integers 1, 2, and 3. Their sum is 1 + 2 + 3 = 6.'
      },
      {
        question: 'What does flatMap(Collection::stream) do when applied to a Stream<List<String>>?',
        options: [
            'Sorts each individual List in place',
            'Flattens the Stream of Lists into a single continuous Stream<String>',
            'Removes duplicate strings across all lists',
            'Filters out empty lists from the stream'
        ],
        correctIndex: 1,
        explanation: '`flatMap()` transforms each element into a stream and then concatenates (flattens) all resulting streams into a single composite stream of elements (`Stream<String>`).'
      },
      {
        question: 'Why does Stream.iterate(0, n -> n + 1).sorted().limit(5) hang indefinitely?',
        options: [
            'Because iterate() does not support integer increments',
            'Because limit() cannot be used after sorted()',
            'Because sorted() is a stateful barrier that attempts to consume all infinite elements before emitting the first sorted element',
            'Because Stream.iterate produces an unmodifiable stream'
        ],
        correctIndex: 2,
        explanation: '`sorted()` must consume the ENTIRE upstream stream before it can sort and emit anything. Because `Stream.iterate()` produces an infinite stream, `sorted()` never finishes buffering, resulting in an infinite loop / hang.'
      },
      {
        question: 'Which method on primitive streams provides count, sum, min, max, and average in a single pass?',
        options: [
            'calculateMetrics()',
            'summaryStatistics()',
            'aggregateAll()',
            'getStatistics()'
        ],
        correctIndex: 1,
        explanation: '`IntStream`, `LongStream`, and `DoubleStream` provide `summaryStatistics()`, which returns an object (`IntSummaryStatistics`) containing count, sum, min, average, and max computed in a single pass.'
      },
      {
        question: 'In Java 9+, what can happen when list.stream().peek(System.out::println).count() is called on an ArrayList?',
        options: [
            'It throws an UnsupportedOperationException',
            'The peek() consumer is completely skipped because the collection has a known size and count() does not require element traversal',
            'It prints each element twice',
            'It causes a deadlock in the stream pool'
        ],
        correctIndex: 1,
        explanation: 'In Java 9+, the stream implementation optimizes `count()` on `SIZED` sources when intermediate operations do not alter stream size. The size is obtained directly from collection metadata, and `peek()` is elided (never called).'
      },
      {
        question: 'Which of the following is a SHORT-CIRCUITING intermediate operation?',
        options: [
            'filter()',
            'limit()',
            'distinct()',
            'map()'
        ],
        correctIndex: 1,
        explanation: '`limit(n)` is a short-circuiting intermediate operation because, when presented with infinite input, it produces a finite stream of at most `n` elements.'
      },
      {
        question: 'What is the primary performance benefit of using IntStream instead of Stream<Integer>?',
        options: [
            'IntStream executes exclusively on GPU hardware',
            'IntStream bypasses object autoboxing and unboxing, eliminating heap allocation and garbage collection overhead',
            'IntStream automatically parallelizes across all CPU cores',
            'IntStream compresses integer data using gzip in memory'
        ],
        correctIndex: 1,
        explanation: '`IntStream` operates directly on primitive 32-bit `int` values on the stack/registers, completely avoiding `java.lang.Integer` heap allocations, pointer indirection, and garbage collection pressure.'
      }
    ]
  }
};
