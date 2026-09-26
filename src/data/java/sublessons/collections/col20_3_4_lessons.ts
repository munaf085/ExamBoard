import { DetailedLesson } from '../../detailedLessons';

// ============================================================
// MODULE 20: GENERICS & TYPE SAFETY (LESSONS 20.3 & 20.4)
// Authoritative FAANG-Standard Generics Core Curriculum
// ============================================================

export const col20_3_4_Lessons: Record<string, DetailedLesson> = {
  // ─────────────────────────────────────────────────────────────
  // LESSON 20.3: Wildcards & The PECS Principle
  // ─────────────────────────────────────────────────────────────
  'wildcards-and-pecs-principle': {
    id: 'wildcards-and-pecs-principle',
    moduleId: 'java-generics',
    moduleTitle: '20. Generics & Type Safety',
    lessonNumber: 'Lesson 20.3',
    title: 'Wildcards & The PECS Principle (Producer Extends, Consumer Super)',
    subtitle: 'Generic invariance, unbounded wildcards (<?>), upper bounds (<? extends T>), lower bounds (<? super T>), and Joshua Bloch`s PECS mnemonic',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine a conveyor belt system in a smoothie factory. If the recipe requires a bucket of fresh fruit to juice, the conveyor belt is a "Producer" (`<? extends Fruit>`): you only want to take fruit OUT of the bucket to squeeze. Whether someone hands you a bucket of Apples or a bucket of Strawberries, you can safely pull fruit out and squeeze it into juice! But you are NOT allowed to throw a coconut into that bucket because it might be a strawberry-only bucket. On the other hand, if you are a garbage truck receiving compost scraps to haul away, you are a "Consumer" (`<? super Apple>`): you only want to PUT apples INTO the bin. Whether the bin is labeled for Apples, all Fruits, or general Food Waste (`Object`), you can safely dump your apple inside! In short: Producer Extends (read-only), Consumer Super (write-friendly)!',
    interviewTakeaways: [
      'Invariance of Generics: In Java, generics are invariant. Even though `Integer` is a subtype of `Number`, `List<Integer>` is NOT a subtype of `List<Number>`. If it were, you could assign `List<Number> numList = intList;` and call `numList.add(3.14)`, injecting a Double into what was supposed to be a pure list of Integers!',
      'Wildcards Enable Subtyping: Wildcards (`?`) relax invariance to enable polymorphism. `List<? extends Number>` is a covariant supertype of `List<Integer>`, `List<Double>`, etc. `List<? super Integer>` is a contravariant supertype of `List<Number>` and `List<Object>`.',
      'The PECS Principle: Formulated by Joshua Bloch in Effective Java: "Producer Extends, Consumer Super". If a parameterized type represents a Producer from which you read data, use `<? extends T>`. If it represents a Consumer into which you write data, use `<? super T>`. If you need to both read and write, use exact invariance `<T>`.',
      'Upper-Bounded Wildcard Restrictions: `List<? extends Number>` is strictly read-only: you cannot add any element to it (except literal `null`)! Because the compiler cannot know whether the underlying list is `List<Double>`, `List<Integer>`, or a custom Number subtype, it prohibits adding any object to prevent type corruption.',
      'Lower-Bounded Wildcard Capabilities: `List<? super Integer>` allows adding `Integer` (or its subtypes) safely! Because the underlying list is guaranteed to be a list of `Integer` or one of its superclasses (`Number`, `Object`), an `Integer` can always be safely added to it.',
      'Unbounded Wildcard (<?>): Represents an unknown type. `List<?>` is the universal supertype of all lists. It is optimal when code only depends on methods from `Object` or collection container operations like `size()`, `isEmpty()`, or `clear()`.'
    ],
    cheatSheet: {
      summary: 'Generics are invariant. Wildcards relax invariance: <? extends T> for Producers (read data, cannot add), <? super T> for Consumers (write data, safe to add). Joshua Bloch`s PECS mnemonic governs API design.',
      syntaxTemplate: `// PECS in standard Collections.copy signature:
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (int i = 0; i < src.size(); i++) {
        dest.set(i, src.get(i)); // Read from src (Producer), write to dest (Consumer)
    }
}

// Upper bound for calculation:
public static double sum(List<? extends Number> numbers) { ... }

// Lower bound for insertion:
public static void populate(List<? super Integer> destination) { ... }`,
      rules: [
        { rule: 'Producer Extends', explanation: 'Use <? extends T> when reading elements from a collection. You cannot invoke add() on an extends wildcard (except null).' },
        { rule: 'Consumer Super', explanation: 'Use <? super T> when adding elements to a collection. Elements of type T can safely be written into a super wildcard.' },
        { rule: 'Both Read & Write', explanation: 'If a method must both read from and write to a collection, do not use wildcards; use exact invariance <T>.' },
        { rule: 'Unbounded Wildcard <?>', explanation: 'List<?> is the parent of all lists. Reads return Object; writes (except null) are prohibited.' },
        { rule: 'Never Use Wildcard in Return Type', explanation: 'Avoid using wildcards as method return types; forcing callers to deal with wildcards degrades API usability.' }
      ],
      quickComparison: [
        { aspect: 'Subtyping Relationship', optionA: 'List<Integer> to List<Number>: Illegal (Invariant)', optionB: 'List<Integer> to List<? extends Number>: Legal (Covariant)' },
        { aspect: 'Reading Elements', optionA: '<? extends T>: Reads as type T safely', optionB: '<? super T>: Reads as Object (requires casting)' },
        { aspect: 'Writing Elements', optionA: '<? extends T>: FORBIDDEN (cannot add anything except null)', optionB: '<? super T>: ALLOWED (can add instances of T)' },
        { aspect: 'Role in PECS', optionA: 'Producer (data source): Extends', optionB: 'Consumer (data destination): Super' }
      ]
    },
    coreExplanation: [
      'Understanding why generics are invariant is the foundation of wildcard mastery. In Java, arrays are covariant: `String[]` is an `Object[]`. This allowed pre-Java 5 methods like `Arrays.sort(Object[])` to sort any array, but caused runtime `ArrayStoreException` when an Integer was stored into a String array.',
      'Java Generics intentionally rejected covariance: `List<Dog>` does NOT inherit from `List<Animal>`. If this assignment were legal: `List<Animal> animals = dogList; animals.add(new Cat());`, a Cat would now live inside a Dog list, causing a runtime crash on retrieval! Invariance protects type safety, but without wildcards, it makes APIs rigid and frustrating.',
      'Upper-Bounded Wildcards (`? extends T`): Expresses covariance. `List<? extends Animal>` means "a list of some unknown type that is either Animal or a subclass of Animal". Because the element is guaranteed to be at least an Animal, you can safely read elements as `Animal a = list.get(0)`. However, you CANNOT add any animal: if the list is secretly a `List<Lion>`, adding a `Dog` would be disastrous. The compiler enforces safety by rejecting all `add()` calls.',
      'Lower-Bounded Wildcards (`? super T`): Expresses contravariance. `List<? super Dog>` means "a list of some unknown type that is Dog or a superclass of Dog" (e.g. `List<Dog>`, `List<Animal>`, `List<Object>`). Because every valid target list is capable of holding a `Dog`, you can safely add Dogs: `list.add(new Dog())`. However, reading elements only guarantees `Object`.',
      'The PECS Principle: In API design, follow Joshua Bloch`s rule: "Producer Extends, Consumer Super". In `Collections.copy(dest, src)`, `src` produces elements to be read (`List<? extends T> src`), while `dest` consumes elements to be written (`List<? super T> dest`).',
      'Wildcard Capture: Occasionally, a method accepts a wildcard `List<?>` but needs to set elements (e.g. reversing a list). Java cannot assign `?` to `?` directly. The solution is the Wildcard Capture Helper idiom: delegate to a private generic helper method `<T> void helper(List<T> list)` which captures the unknown wildcard as a concrete type parameter `T`.',
      'API Design Rule: Do not return wildcards from methods! A return type of `List<? extends Number>` forces callers to write wildcard types in their own code. Return the most specific concrete type (`List<Number>` or `<T extends Number> List<T>`).'
    ],
    diagram: `JAVA GENERICS WILDCARDS: INVARIANCE VS COVARIANCE VS CONTRAVARIANCE
========================================================================

1. INVARIANCE (Exact Type Match Required)
   Object ──> Number ──> Integer
   
   List<Object>      List<Number>      List<Integer>
        │                 │                 │
        └── NO SUBTYPING RELATIONSHIP! ─────┘
   (List<Integer> CANNOT be assigned to List<Number>!)

2. COVARIANCE: <? extends Number> (Producer - Read Only)
   List<? extends Number>  (Supertype of all Number lists!)
        ▲                ▲
        │                │
   List<Integer>    List<Double>
   - Reading: Returns Number (Safe!)
   - Writing: list.add(10) -> COMPILER ERROR! (Read-Only)

3. CONTRAVARIANCE: <? super Integer> (Consumer - Write Friendly)
   List<Integer>    List<Number>    List<Object>
        ▲                ▲               ▲
        │                │               │
        └────────────────┴───────────────┘
                        │
              List<? super Integer>
   - Writing: list.add(new Integer(42)) -> Safe!
   - Reading: Returns Object (Requires Cast)

4. JOSHUA BLOCH'S PECS SUMMARY:
   * Producer Extends: When you GET data from it.
   * Consumer Super:   When you PUT data into it.`,
    codeSnippet: {
      title: 'The PECS Principle Demonstration (Collections.copy Simulation)',
      code: `import java.util.*;

public class PecsDemonstration {
    // Producer Extends (src produces data)
    // Consumer Super (dest consumes data)
    public static <T> void copyElements(List<? super T> dest, List<? extends T> src) {
        for (T item : src) {
            dest.add(item); // Safe write to consumer!
        }
    }

    public static void main(String[] args) {
        // Source: Producer of Integers
        List<Integer> sourceInts = Arrays.asList(10, 20, 30);

        // Destination: Consumer capable of holding Numbers
        List<Number> destNumbers = new ArrayList<>();

        // Works seamlessly because Integer extends Number (PECS)!
        copyElements(destNumbers, sourceInts);

        System.out.println("Copied Numbers: " + destNumbers);
        System.out.println("First element double value: " + destNumbers.get(0).doubleValue());
    }
}`,
      lineByLineExplanation: [
        { line: 'public static <T> void copyElements(...)', explanation: 'Declares generic copy method parameterized by type T.' },
        { line: 'List<? super T> dest', explanation: 'Destination is a Consumer: accepts any list capable of holding T (T, superclasses of T, Object).' },
        { line: 'List<? extends T> src', explanation: 'Source is a Producer: accepts any list whose elements are T or subclasses of T.' },
        { line: 'for (T item : src) { dest.add(item); }', explanation: 'Reads T from producer and writes T into consumer with 100% compile-time safety.' },
        { line: 'copyElements(destNumbers, sourceInts);', explanation: 'T is inferred as Integer; dest is List<Number> (super Integer) and src is List<Integer> (extends Integer).' }
      ],
      output: `Copied Numbers: [10, 20, 30]
First element double value: 10.0`
    },
    codeExamples: [
      {
        title: 'Why You Cannot Add to an Upper-Bounded Wildcard',
        description: 'Demonstrating why javac rejects list.add() on <? extends Number>.',
        code: `import java.util.*;

public class ExtendsAddFailure {
    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>(Arrays.asList(1, 2, 3));
        List<? extends Number> numList = intList;

        // Reading is completely valid:
        Number n = numList.get(0);
        System.out.println("Read number: " + n);

        // Writing is rejected by compiler:
        // numList.add(Integer.valueOf(10)); // ERROR: capture#1 of ? extends Number
        // numList.add(Double.valueOf(3.14)); // ERROR: capture#1 of ? extends Number

        // The ONLY element that can be added is literal null!
        numList.add(null);
        System.out.println("Size after adding null: " + numList.size());
    }
}`,
        output: `Read number: 1
Size after adding null: 4`
      },
      {
        title: 'Wildcard Capture Helper Pattern',
        description: 'Demonstrating how a private helper method captures unknown wildcard types.',
        code: `import java.util.*;

public class WildcardCaptureDemo {
    public static void swapFirstAndLast(List<?> list) {
        // Cannot do: list.set(0, list.get(list.size() - 1)); // Compiler error on ?
        swapHelper(list); // Captures wildcard into concrete type T
    }

    private static <T> void swapHelper(List<T> list) {
        if (list.size() < 2) return;
        T first = list.get(0);
        list.set(0, list.get(list.size() - 1));
        list.set(list.size() - 1, first);
    }

    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList("First", "Middle", "Last"));
        swapFirstAndLast(words);
        System.out.println("Swapped: " + words);
    }
}`,
        output: `Swapped: [Last, Middle, First]`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Assuming List<Integer> can be assigned to List<Number>',
        whyItHappens: 'Because Integer is a Number, beginners expect subtyping to apply to their generic containers.',
        howToFix: 'Remember: generics are invariant. Use `List<? extends Number>` if you need to accept any number list for reading.'
      },
      {
        mistake: 'Trying to add elements into a collection typed with <? extends T>',
        whyItHappens: 'Developers think "Since Integer extends Number, I can add an Integer into `List<? extends Number>`".',
        howToFix: 'Follow PECS: if you need to add elements, the collection is a Consumer, so use `List<? super Integer>`.'
      },
      {
        mistake: 'Returning wildcards from public methods: public List<? extends Number> getItems()',
        whyItHappens: 'Developers think returning wildcards offers flexibility.',
        howToFix: 'Return concrete types (`List<Number>`). Returning wildcards burdens callers with messy wildcard declarations in their own code.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Assignment to Upper Bounded Wildcard',
        problemStatement: 'Which of the following assignments causes a compilation error?',
        code: `List<Integer> ints = new ArrayList<>();
List<Double> doubles = new ArrayList<>();
List<Number> numbers = new ArrayList<>();
List<Object> objects = new ArrayList<>();

// Line 1: List<? extends Number> l1 = ints;
// Line 2: List<? extends Number> l2 = doubles;
// Line 3: List<? extends Number> l3 = numbers;
// Line 4: List<? extends Number> l4 = objects;`,
        options: [
          'A) Line 1',
          'B) Line 2',
          'C) Line 3',
          'D) Line 4'
        ],
        correctOptionIndex: 3,
        hint: 'Object is a superclass of Number, not a subclass.',
        solution: 'Option D is correct: Line 4',
        explanation: '`List<? extends Number>` requires the type argument to be `Number` or a subclass of `Number`. `Object` is a superclass of `Number`, so Line 4 fails compilation.'
      },
      {
        title: 'Puzzle 2: Writing into Lower Bounded Wildcard',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle2 {
    public static void main(String[] args) {
        List<Number> numList = new ArrayList<>();
        List<? super Integer> consumer = numList;
        consumer.add(10);
        consumer.add(20);
        System.out.println(numList.size() + ":" + numList.get(0));
    }
}`,
        options: [
          'A) 2:10',
          'B) Compilation Error on consumer.add()',
          'C) ClassCastException at runtime',
          'D) 0:null'
        ],
        correctOptionIndex: 0,
        hint: '<? super Integer> allows adding Integers safely.',
        solution: 'Option A is correct: 2:10',
        explanation: '`List<? super Integer>` is a consumer: it accepts `Integer` and its subtypes. Adding 10 and 20 into `consumer` writes directly to `numList`. Output is "2:10".'
      },
      {
        title: 'Puzzle 3: Reading from Lower Bounded Wildcard',
        problemStatement: 'What is the return type of `consumer.get(0)` on `List<? super Integer>` without an explicit cast?',
        code: `List<? super Integer> consumer = new ArrayList<Number>();
// ? val = consumer.get(0);`,
        options: [
          'A) Integer',
          'B) Number',
          'C) Object',
          'D) Compilation error on get()'
        ],
        correctOptionIndex: 2,
        hint: 'What is the only guaranteed common supertype of Integer and all its superclasses?',
        solution: 'Option C is correct: Object',
        explanation: 'Because `List<? super Integer>` could refer to `List<Integer>`, `List<Number>`, or `List<Object>`, the compiler only knows that the returned element is an instance of `Object`.'
      },
      {
        title: 'Puzzle 4: Valid Method Call under PECS',
        problemStatement: 'Given method `public static void process(List<? extends Number> list)`, which call causes a compilation error?',
        code: `List<Integer> a = Arrays.asList(1, 2);
List<Double> b = Arrays.asList(1.1, 2.2);
List<String> c = Arrays.asList("A", "B");
List<Number> d = Arrays.asList(10, 20L);`,
        options: [
          'A) process(a)',
          'B) process(b)',
          'C) process(c)',
          'D) process(d)'
        ],
        correctOptionIndex: 2,
        hint: 'String does not extend Number.',
        solution: 'Option C is correct: process(c)',
        explanation: '`String` does not extend `Number`. Passing `List<String>` to `List<? extends Number>` fails compilation with type mismatch.'
      },
      {
        title: 'Puzzle 5: The Only Value Permitted in <? extends T>',
        problemStatement: 'What is the ONLY value that can be added into a `List<? extends Number>` variable?',
        code: `List<? extends Number> list = new ArrayList<Integer>();
// list.add(?);`,
        options: [
          'A) 0',
          'B) Integer.valueOf(0)',
          'C) null',
          'D) No value can be added, not even null'
        ],
        correctOptionIndex: 2,
        hint: 'null belongs to all reference types.',
        solution: 'Option C is correct: null',
        explanation: 'Because `null` is a member of every reference type in Java, `list.add(null)` is the only legal invocation on an upper-bounded wildcard.'
      },
      {
        title: 'Puzzle 6: Unbounded Wildcard Size Check',
        problemStatement: 'What does this program print?',
        code: `import java.util.*;

public class Puzzle6 {
    public static int count(Collection<?> c) {
        return c.size();
    }
    public static void main(String[] args) {
        System.out.println(count(Arrays.asList("A", "B")) + count(new HashSet<>(Arrays.asList(1, 2, 3))));
    }
}`,
        options: [
          'A) 5',
          'B) Compilation Error: Cannot pass typed collections to Collection<?>',
          'C) 0',
          'D) ClassCastException'
        ],
        correctOptionIndex: 0,
        hint: 'Collection<?> is the universal supertype of all collections.',
        solution: 'Option A is correct: 5',
        explanation: '`Collection<?>` accepts any collection. `size()` returns 2 for the list and 3 for the set, summing to 5.'
      },
      {
        title: 'Puzzle 7: PECS Direction Identification',
        problemStatement: 'In the method `Collections.max(Collection<? extends T> coll)`, why is `<? extends T>` used rather than `<? super T>`?',
        code: `// public static <T extends Comparable<? super T>> T max(Collection<? extends T> coll)`,
        options: [
          'A) Because the collection consumes T objects',
          'B) Because the collection acts as a Producer: max reads elements from coll to find the largest',
          'C) Because <? super T> is deprecated',
          'D) Because coll is sorted'
        ],
        correctOptionIndex: 1,
        hint: 'Is coll being read from or written to?',
        solution: 'Option B is correct: Because the collection acts as a Producer: max reads elements from coll to find the largest',
        explanation: '`max()` reads elements out of `coll` to evaluate them. Under PECS, when you read from a parameter, it is a Producer, so you use `extends`.'
      },
      {
        title: 'Puzzle 8: Comparator with Super Wildcard',
        problemStatement: 'Why do sorting methods accept `Comparator<? super T>` rather than `Comparator<T>`?',
        code: `public static <T> void sort(List<T> list, Comparator<? super T> c)`,
        options: [
          'A) To allow comparing null values',
          'B) To allow a comparator designed for a superclass (e.g. Comparator<Person>) to sort a subclass list (e.g. List<Employee>)',
          'C) To sort in reverse order',
          'D) To speed up sorting'
        ],
        correctOptionIndex: 1,
        hint: 'A Comparator<Animal> can compare two Dogs.',
        solution: 'Option B is correct: To allow a comparator designed for a superclass (e.g. Comparator<Person>) to sort a subclass list (e.g. List<Employee>)',
        explanation: '`Comparator<? super T>` consumes `T` objects (`compare(T, T)`). A `Comparator<Person>` can compare two `Employee` objects because an Employee is a Person.'
      },
      {
        title: 'Puzzle 9: Wildcard Capture Compile Error',
        problemStatement: 'What happens when compiling this method without a helper?',
        code: `import java.util.List;

public class Puzzle9 {
    public static void setFirst(List<?> list) {
        // list.set(0, list.get(0));
    }
}`,
        options: [
          'A) Compiles cleanly and replaces element 0 with itself',
          'B) Compilation Error: The method set(int, capture#1-of ?) is not applicable for arguments (int, capture#2-of ?)',
          'C) Throws UnsupportedOperationException',
          'D) Throws ClassCastException'
        ],
        correctOptionIndex: 1,
        hint: 'The compiler captures each ? as a distinct fresh type variable.',
        solution: 'Option B is correct: Compilation Error',
        explanation: 'The compiler treats each occurrence of `?` as a distinct captured type variable (`capture#1` vs `capture#2`). It cannot verify they are identical, failing compilation unless a generic helper `<T>` is used.'
      },
      {
        title: 'Puzzle 10: Incompatible Wildcard Assignment',
        problemStatement: 'Which line fails to compile?',
        code: `List<? super Number> consumer = new ArrayList<Object>();
List<? extends Number> producer = new ArrayList<Integer>();

// Line 1: Object o = consumer.get(0);
// Line 2: Number n = producer.get(0);
// Line 3: consumer.add(123);
// Line 4: producer.add(123);`,
        options: [
          'A) Line 1',
          'B) Line 2',
          'C) Line 3',
          'D) Line 4'
        ],
        correctOptionIndex: 3,
        hint: 'Producer extends is read-only.',
        solution: 'Option D is correct: Line 4',
        explanation: 'Line 4 fails to compile. Calling `add(123)` on `producer` (`List<? extends Number>`) is illegal because upper-bounded wildcards cannot accept additions.'
      }
    ],
    interviewQuestions: [
      {
        question: 'What is the PECS principle in Java Generics? How does it guide API design?',
        answer: 'PECS stands for "Producer Extends, Consumer Super", coined by Joshua Bloch in Effective Java. It is the golden rule for designing flexible generic method signatures: 1) Producer Extends: If a parameterized collection or stream supplies (produces) data to your method (you read from it), declare it with `<? extends T>`. This allows callers to pass collections of `T` or any subtype of `T`. 2) Consumer Super: If a collection receives (consumes) data from your method (you write into it), declare it with `<? super T>`. This allows callers to pass collections of `T` or any supertype of `T`. 3) Both: If you need to both read from and write into the collection, use exact invariant typing `<T>`.',
        followUp: 'Show how PECS is applied in the JDK method Collections.copy().',
        followUpAnswer: 'The signature is: `public static <T> void copy(List<? super T> dest, List<? extends T> src)`. `src` produces elements to be copied, so it is `<? extends T>`. `dest` consumes elements being copied into it, so it is `<? super T>`.',
        keyPhrases: [
          'Producer Extends, Consumer Super (PECS)',
          'Producer: data source (read-only, <? extends T>)',
          'Consumer: data sink (writable, <? super T>)',
          'Maximizes API flexibility without sacrificing type safety',
          'Collections.copy signature as primary example'
        ],
        commonMistakeAnswer: 'Mixing up the mnemonic (e.g. saying Producer Super, Consumer Extends).'
      },
      {
        question: 'Why are Java Generics invariant? Why cannot List<Dog> be assigned to List<Animal>?',
        answer: 'Generics are invariant to protect type safety. While `Dog` is a subclass of `Animal`, `List<Dog>` is NOT a subclass of `List<Animal>`. If this assignment were legal: `List<Dog> dogs = new ArrayList<>(); List<Animal> animals = dogs; animals.add(new Cat());`. Because `animals` references the `dogs` list in memory, a `Cat` would now reside in a list expected to contain only Dogs! When the original caller executes `Dog myDog = dogs.get(0);`, the runtime would attempt to cast the `Cat` to a `Dog`, resulting in a catastrophic `ClassCastException`. Java prevents this corruption at compile time by mandating that generic containers are invariant.',
        followUp: 'How do arrays differ from generics in this regard?',
        followUpAnswer: 'Java arrays are covariant (`Dog[]` is an `Animal[]`), which allows `animals[0] = new Cat()`, but arrays reify their type and throw `ArrayStoreException` at runtime. Generics prevent the error at compile time.',
        keyPhrases: [
          'Invariance prevents inserting incompatible subtypes',
          'Assigning List<Dog> to List<Animal> would allow adding Cats',
          'Guarantees no ClassCastException on retrieval',
          'Arrays are covariant; Generics are invariant'
        ],
        commonMistakeAnswer: 'Claiming that List<Dog> is a List<Animal> because of OOP inheritance.'
      },
      {
        question: 'Why does calling list.add(element) fail on a List<? extends Number>? What is the only value allowed?',
        answer: 'Calling `list.add(e)` on `List<? extends Number>` fails to compile because the compiler cannot determine the concrete subtype at runtime. The variable could be referencing a `List<Double>`, a `List<Integer>`, or a `List<BigDecimal>`. If you attempt to add `Integer.valueOf(5)`, but the actual instance is `List<Double>`, type safety would be broken. Because the compiler cannot verify that the added object matches the unknown subtype `?`, it rejects all additions. The ONLY value permitted to be added is literal `null`, because `null` represents the absence of a value and is a legal member of all Java reference types.',
        followUp: 'How can you add an element to an upper-bounded list?',
        followUpAnswer: 'You cannot. You must either change the method signature to a consumer `<? super Number>` or use an invariant generic type parameter `<T extends Number>` on a collection you own.',
        keyPhrases: [
          'Compiler does not know the actual concrete subtype',
          'Adding Integer to List<Double> would corrupt the list',
          'Rejects all additions at compile time',
          'null is the only legal element allowed'
        ],
        commonMistakeAnswer: 'Asserting that you can add instances of Number into List<? extends Number>.'
      },
      {
        question: 'Explain what an Unbounded Wildcard (<?>) is. When should you use it over a generic type parameter <T>?',
        answer: 'An unbounded wildcard `<?>` represents an unknown type with no bounds. `List<?>` is the supertype of all lists (`List<String>`, `List<Integer>`, `List<Object>`). You should use `<?>` when: 1) The method implementation only uses capabilities provided by `java.lang.Object` (e.g. `System.out.println(item.toString())`). 2) The method operates on the collection itself regardless of element type (e.g. `list.size()`, `list.isEmpty()`, `list.clear()`). You should use `<T>` when: 1) You need to declare dependencies between arguments or return values (e.g. return type matches argument type). 2) You need to write elements into the collection.',
        followUp: 'Can you read from a List<?>?',
        followUpAnswer: 'Yes, but the returned elements are strictly typed as java.lang.Object, because Object is the only common supertype shared by all possible types.',
        keyPhrases: [
          'Represents an unknown type without bounds',
          'Universal supertype of all parameterized instantiations',
          'Ideal when code only depends on Object methods or collection size',
          'Use <T> when return type depends on argument type'
        ],
        commonMistakeAnswer: 'Believing List<?> and List<Object> are identical.'
      },
      {
        question: 'Explain the Wildcard Capture Helper idiom in Java. When is it necessary?',
        answer: 'Wildcard capture occurs when the compiler infers a specific type for a wildcard `?`. A compilation problem arises when a method accepts a wildcard `List<?>` and needs to perform an operation requiring matching types, such as `list.set(i, list.get(j))`. The compiler emits an error because it captures the first `?` as `capture#1` and the second `?` as `capture#2`, treating them as two incompatible types! To resolve this, you write a private generic helper method: `private static <T> void helper(List<T> list, int i, int j) { list.set(i, list.get(j)); }`. The public method calls `helper(list)`. The compiler captures the wildcard into the single concrete type variable `T`, allowing safe assignments.',
        followUp: 'Why not just make the public method generic (<T> void set(List<T> list)) in the first place?',
        followUpAnswer: 'Because `List<?>` is often simpler and cleaner for callers to use, keeping the wildcard capture complexity encapsulated as a private implementation detail.',
        keyPhrases: [
          'Compiler captures ? as distinct type variables',
          'list.set fails on capture mismatch',
          'Private generic helper method captures wildcard as T',
          'Encapsulates internal typing complexity'
        ],
        commonMistakeAnswer: 'Trying to cast `(capture) list.get()` manually.'
      },
      {
        question: 'Why should you never use wildcards in method return types?',
        answer: 'Joshua Bloch explicitly warns in Effective Java: "Do not use wildcard types as return types." Returning a wildcard (like `public List<? extends Number> getNumbers()`) forces callers to use wildcard syntax in their own client code, polluting user code with complex and un-instantiable types. Callers cannot add elements to the returned list and must constantly use `? extends Number`. If a method returns a collection, return the exact type (e.g. `List<Number>`) or a generic type `<T extends Number> List<T>`. Wildcards should only be used to specify input parameters.',
        followUp: 'What is the rule of thumb for wildcards in API signatures?',
        followUpAnswer: '"Be liberal in what you accept, and conservative in what you return." Accept wildcards on inputs for flexibility; return exact types for usability.',
        keyPhrases: [
          'Forces callers to handle wildcards in client code',
          'Pollutes user code and restricts operations',
          'Use wildcards for parameters, not return types',
          'Liberal in what you accept, conservative in what you return'
        ],
        commonMistakeAnswer: 'Thinking returning List<? extends T> makes the method more reusable.'
      },
      {
        question: 'How does Comparable<? super T> work in complex inheritance hierarchies?',
        answer: 'Consider `class Person implements Comparable<Person>` and `class Employee extends Person`. `Employee` inherits `compareTo(Person)` from `Person`, but does NOT implement `Comparable<Employee>`. If a sorting method had the rigid signature `<T extends Comparable<T>> void sort(List<T> list)`, sorting `List<Employee>` would FAIL compilation because `Employee` implements `Comparable<Person>`, not `Comparable<Employee>`! By declaring `<T extends Comparable<? super T>>`, Java allows `T` (`Employee`) to satisfy the bound because it implements `Comparable` parameterized by a supertype (`Person`). This is essential for all real-world object hierarchies.',
        followUp: 'Which standard JDK methods use <T extends Comparable<? super T>>?',
        followUpAnswer: '`Collections.sort(List<T>)`, `Collections.max(Collection<T>)`, `Collections.min(Collection<T>)`, and `TreeSet` constructors.',
        keyPhrases: [
          'Subclasses inherit compareTo from superclasses',
          'Rigid <T extends Comparable<T>> rejects subclasses',
          'Comparable<? super T> permits superclass comparison contracts',
          'Standard across JDK collection sorting utilities'
        ],
        commonMistakeAnswer: 'Asserting that subclasses must re-implement Comparable for their own class.'
      },
      {
        question: 'Explain why Predicate<? super T> and Consumer<? super T> use lower bounds in functional programming.',
        answer: 'In functional interfaces, `Consumer<T>` and `Predicate<T>` accept arguments of type `T` (they consume data). Under PECS, consumers should use `? super T`. For example, consider `List<String> words` and a `Predicate<CharSequence> isLong = cs -> cs.length() > 5;`. A `CharSequence` is a supertype of `String`. Can `isLong` evaluate a String? Yes, every String is a CharSequence! By typing the parameter as `filter(List<T> list, Predicate<? super T> predicate)`, a single general predicate written for `CharSequence` can be reused to filter `List<String>`, `List<StringBuilder>`, and `List<StringBuffer>` without duplicate code.',
        followUp: 'What would happen if the parameter was rigidly typed as Predicate<T>?',
        followUpAnswer: 'Passing Predicate<CharSequence> to filter List<String> would fail compilation, severely restricting code reuse.',
        keyPhrases: [
          'Functional interfaces consume arguments',
          'PECS dictates Consumer Super',
          'Allows general supertype predicates to evaluate subtype lists',
          'Maximizes functional reuse across types'
        ],
        commonMistakeAnswer: 'Thinking Predicate produces boolean, so it should use extends.'
      },
      {
        question: 'Contrast Bounded Type Parameters (<T extends Number>) with Bounded Wildcards (<? extends Number>). When do you use which?',
        answer: 'Use a Bounded Type Parameter `<T extends Number>` when: 1) You need to establish a type relationship across multiple arguments (e.g. `void copy(T a, T b)`). 2) The return type depends directly on the argument type (e.g. `T findMax(T[] array)`). 3) You need to instantiate local variables of type `T`. Use a Bounded Wildcard `<? extends Number>` when: 1) You only need flexible subtyping for a single parameter. 2) The method does not depend on the exact type for other parameters or the return type (e.g. `double sum(List<? extends Number> list)`). Wildcards make APIs cleaner and easier to read.',
        followUp: 'Can a generic method use both T and wildcards in the same signature?',
        followUpAnswer: 'Yes! Example: `<T> void copy(List<? super T> dest, List<? extends T> src)` combines a type variable T with wildcards to express precise producer/consumer relationships.',
        keyPhrases: [
          '<T extends Bound> establishes type relationships across parameters',
          '<? extends Bound> provides flexible subtyping for single parameters',
          'Use <T> when return type matches argument',
          'Combine T with wildcards for complex APIs'
        ],
        commonMistakeAnswer: 'Believing wildcards and bounded type parameters are completely interchangeable.'
      },
      {
        question: 'What is the Subtyping Hierarchy among List<Integer>, List<? extends Number>, List<? super Integer>, and List<?>?',
        answer: 'The hierarchy forms a diamond lattice: 1) At the very top stands `List<?>` (the universal supertype of all lists). 2) Below `List<?>` sit `List<? extends Number>` (all number lists) and `List<? super Integer>` (all lists capable of accepting integers). 3) Both `List<? extends Number>` and `List<? super Integer>` are supertypes of the concrete invariant leaf type `List<Integer>`. You can assign `List<Integer>` to `List<? extends Number>`, to `List<? super Integer>`, and to `List<?>`. However, you cannot assign `List<? extends Number>` to `List<Integer>` or vice versa without casting.',
        followUp: 'Can List<? extends Integer> be assigned to List<? extends Number>?',
        followUpAnswer: 'Yes, because Integer is a subtype of Number, covariance allows assigning List<? extends Integer> to List<? extends Number>.',
        keyPhrases: [
          'List<?> is top type of all list instantiations',
          'List<? extends Number> is covariant branch',
          'List<? super Integer> is contravariant branch',
          'List<Integer> is the concrete leaf type'
        ],
        commonMistakeAnswer: 'Assuming List<Object> is the top type of all generic lists (List<?> is the top type).'
      }
    ],
    miniQuiz: [
      {
        question: 'What does the PECS mnemonic stand for?',
        options: [
          'Parameter Extends, Constructor Super',
          'Producer Extends, Consumer Super',
          'Polymorphism Extends, Casting Super',
          'Pointer Extends, Class Super'
        ],
        correctIndex: 1,
        explanation: 'PECS stands for "Producer Extends, Consumer Super", formulated by Joshua Bloch for generic collection API design.'
      },
      {
        question: 'Why does Java reject assigning `List<Integer>` to `List<Number>`?',
        options: [
          'Integer is not a Number',
          'Generics are invariant: allowing the assignment would permit adding Doubles into an Integer list, causing runtime crashes',
          'Because Number is an abstract class',
          'Because ArrayList is not synchronized'
        ],
        correctIndex: 1,
        explanation: 'Generics are invariant to prevent inserting incompatible objects (like Double) into an Integer list through a parent reference.'
      },
      {
        question: 'What happens if you attempt to call `list.add(10)` on a `List<? extends Number>`?',
        options: [
          'It adds 10 to the list successfully',
          'Compilation Error: Cannot add elements to an upper-bounded wildcard because the concrete subtype is unknown',
          'Throws ClassCastException at runtime',
          'Converts 10 to Double'
        ],
        correctIndex: 1,
        explanation: '`List<? extends Number>` is read-only (Producer) because the compiler cannot guarantee the concrete subtype at runtime.'
      },
      {
        question: 'Which element is ALWAYS legal to add into a `List<? extends Number>`?',
        options: [
          '0',
          'Double.NaN',
          'null',
          'No elements are legal'
        ],
        correctIndex: 2,
        explanation: '`null` is a member of every Java reference type, making it the only element accepted by upper-bounded wildcards.'
      },
      {
        question: 'What type can be safely written into a `List<? super Integer>`?',
        options: [
          'Instances of Integer or subtypes of Integer',
          'Any Object',
          'Instances of Number only',
          'Only null'
        ],
        correctIndex: 0,
        explanation: '`List<? super Integer>` is a Consumer: it is guaranteed to be a list of Integer or a superclass of Integer, so Integers can safely be added.'
      },
      {
        question: 'What is the return type of `list.get(0)` on a `List<? super Integer>` without casting?',
        options: [
          'Integer',
          'Number',
          'Object',
          'Compilation error'
        ],
        correctIndex: 2,
        explanation: 'Because the list could be `List<Object>`, the compiler only knows that elements are instances of `Object`.'
      },
      {
        question: 'Why should public APIs avoid using wildcards in their return types (e.g. `public List<? extends Number> getItems()`)?',
        options: [
          'Because it leaks memory',
          'Because it forces callers to deal with wildcards in their own code and prevents them from adding items',
          'Because wildcards are deprecated',
          'Because it reduces JVM speed'
        ],
        correctIndex: 1,
        explanation: 'Returning wildcards forces callers to write wildcard types, restricting client operations and degrading API usability.'
      },
      {
        question: 'What is the purpose of the Wildcard Capture Helper idiom?',
        options: [
          'To capture stack traces during exceptions',
          'To delegate an operation on a List<?> to a private generic helper <T> that captures the unknown type as concrete T',
          'To enable multi-threading on wildcards',
          'To prevent garbage collection'
        ],
        correctIndex: 1,
        explanation: 'A private helper method captures the wildcard `?` as a concrete type parameter `T`, enabling operations like `list.set()`.'
      },
      {
        question: 'Why does `Collections.sort(list, comparator)` accept `Comparator<? super T>`?',
        options: [
          'To allow comparators defined for superclasses (e.g. Comparator<Person>) to sort subclass lists (e.g. List<Employee>)',
          'To sort in reverse order',
          'To avoid comparing nulls',
          'To use quicksort instead of timsort'
        ],
        correctIndex: 0,
        explanation: '`Comparator` is a Consumer of `T`. Using `? super T` allows general superclass comparators to sort subclass collections.'
      },
      {
        question: 'Which of the following is the top-level supertype of all generic list instantiations in Java?',
        options: [
          'List<Object>',
          'List<Void>',
          'List<?>',
          'Collection<Object>'
        ],
        correctIndex: 2,
        explanation: 'The unbounded wildcard `List<?>` is the universal supertype of all parameterized list instantiations.'
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // LESSON 20.4: Generics Limitations & Heap Pollution
  // ─────────────────────────────────────────────────────────────
  'generics-limitations-and-heap-pollution': {
    id: 'generics-limitations-and-heap-pollution',
    moduleId: 'java-generics',
    moduleTitle: '20. Generics & Type Safety',
    lessonNumber: 'Lesson 20.4',
    title: 'Generics Limitations, Arrays & Heap Pollution',
    subtitle: 'Primitive types restriction, inability to instantiate new T(), non-reifiable types, generic array creation ban, heap pollution, and @SafeVarargs',
    estimatedMinutes: 28,
    beginnerAnalogy: 'Imagine a country where everyone must carry a digital passport (`Reified Type`), except for tourists who are issued temporary paper badges that dissolve at border control (`Erased Generic Type`). When everyone walks on foot, things work fine. But suppose a transport train (`Java Array`) requires checking digital passports for every passenger at every single stop (`ArrayStoreException`). If you try to build a train specifically reserved for tourists with dissolving badges (`new List<String>[10]`), the railway inspector shuts you down immediately! Why? Because once the badges dissolve at compile time, someone could slip a smuggler onto the train, and the train inspector would not be able to tell the difference until the destination! This type of undetected contamination is called Heap Pollution.',
    interviewTakeaways: [
      'Seven Core Limitations of Java Generics: 1) Cannot instantiate generic types with primitives (`List<int>`). 2) Cannot create instances of type parameters (`new T()`). 3) Cannot declare static fields of type `T`. 4) Cannot use `instanceof` with parameterized types (`obj instanceof List<String>`). 5) Cannot create arrays of parameterized types (`new List<String>[10]`). 6) Cannot create, catch, or throw objects of generic exception classes (`class MyEx<T> extends Exception`). 7) Cannot overload methods where formal parameter types erase to the same raw type.',
      'Reifiable vs Non-Reifiable Types: A reifiable type is one whose type information is fully available at runtime: primitives (`int`), non-generic types (`String`), raw types (`List`), unbounded wildcards (`List<?>`), and arrays of reifiable types (`int[]`, `String[]`). A non-reifiable type is one whose type information has been partially erased at compile time: parameterized types (`List<String>`), bounded wildcards (`List<? extends Number>`), and type variables (`T`).',
      'The Generic Array Ban: You CANNOT create arrays of non-reifiable types (`new T[10]` or `new List<String>[10]`). Arrays are covariant and enforce runtime component types via `ArrayStoreException`. Generics are erased and invariant. Combining them would permit undetected heap pollution.',
      'Heap Pollution: Occurs when a variable of a parameterized type refers to an object that is not of that parameterized type. This turns compile-time type guarantees into silent timebombs that explode as `ClassCastException` upon reading.',
      '@SafeVarargs Annotation: When a method declares generic varargs (`T... args`), the compiler creates an underlying array (`T[]`), which is a generic array! To suppress the resulting heap pollution compiler warning, apply `@SafeVarargs`. This is only legal on `static`, `final`, or `private` methods that do not store into or leak the varargs array.',
      'Workaround for `new T()`: Use factory functional interfaces (`Supplier<T> factory` calling `factory.get()`) or reflection type tokens (`Class<T> clazz` calling `clazz.getDeclaredConstructor().newInstance()`).'
    ],
    cheatSheet: {
      summary: 'Java generics cannot use primitives, instantiate new T(), create generic arrays, or extend Throwable due to Type Erasure. Heap pollution occurs when parameterized variables point to incompatible objects.',
      syntaxTemplate: `// Workaround for new T():
public static <T> T create(Supplier<T> factory) {
    return factory.get(); // Clean, type-safe instantiation
}

// Suppressing safe varargs warnings:
@SafeVarargs
public static <T> List<T> of(T... elements) {
    List<T> list = new ArrayList<>(elements.length);
    for (T e : elements) list.add(e);
    return list;
}`,
      rules: [
        { rule: 'Generic Array Prohibition', explanation: 'new T[10] and new List<String>[10] are compile-time errors. Use ArrayList<T> instead.' },
        { rule: 'Primitive Generics Banned', explanation: 'List<int> is illegal; use wrapper class List<Integer> or IntStream.' },
        { rule: 'Generic Exceptions Banned', explanation: 'class MyException<T> extends Exception is illegal; JVM catch tables cannot dispatch erased types.' },
        { rule: 'Instanceof Parameterized Types Banned', explanation: 'obj instanceof List<String> is illegal; only unbounded obj instanceof List<?> is permitted.' },
        { rule: '@SafeVarargs Constraints', explanation: '@SafeVarargs is restricted to static, final, or private methods that do not leak or mutate the varargs array.' }
      ],
      quickComparison: [
        { aspect: 'Array Creation', optionA: 'new String[10]: Legal (Reifiable type)', optionB: 'new List<String>[10]: Illegal (Non-reifiable type)' },
        { aspect: 'Instanceof Check', optionA: 'obj instanceof List<?>: Legal (Unbounded wildcard)', optionB: 'obj instanceof List<String>: Illegal (Erased parameter)' },
        { aspect: 'Instantiation', optionA: 'new T(): Compile Error', optionB: 'factory.get() via Supplier<T>: Clean & Type-Safe' },
        { aspect: 'Exception Subclassing', optionA: 'class CustomEx extends Exception: Legal', optionB: 'class CustomEx<T> extends Exception: Illegal (Generic exception)' }
      ]
    },
    coreExplanation: [
      'The limitations of Java Generics are not arbitrary quirks; every single limitation is the direct, unavoidable consequence of implementing Generics via Type Erasure without modifying the underlying JVM specification.',
      'Limitation 1: Cannot Instantiate Generics with Primitives (`List<int>`). In the JVM, all object variables are reference pointers (addresses). Type erasure replaces `T` with `java.lang.Object`. Primitive types (`int`, `boolean`, `double`) are raw memory bits that do not extend `Object`. Storing an `int` inside an `Object` reference slot is impossible without autoboxing into an `Integer` wrapper object.',
      'Limitation 2: Cannot Create Instances of Type Parameters (`new T()`). Because `T` is erased to `Object` at runtime, the compiler has no way to know whether `T` is an interface, an abstract class, or a concrete class, what constructor it has, or how much memory to allocate. The standard solution is passing a `Supplier<T>` or `Class<T>` token.',
      'Limitation 3: Cannot Declare Static Fields of Type T. In Java, a generic class is compiled into a single `.class` file. All parameterized instances (`Box<String>` and `Box<Integer>`) share the exact same static variables. If `static T item` were allowed, what type would it hold? It cannot be both a String and an Integer simultaneously.',
      'Limitation 4: Cannot Use `instanceof` with Parameterized Types. `instanceof` is evaluated at runtime by the JVM. Because the type arguments are erased, the JVM only knows the object is an `ArrayList`; it has no runtime record of whether it was created as `ArrayList<String>` or `ArrayList<Integer>`. Testing `obj instanceof List<String>` is therefore rejected by `javac`. You can only test against raw types or unbounded wildcards: `obj instanceof List<?>`.',
      'Limitation 5: Cannot Create Arrays of Parameterized Types (`new List<String>[10]`). Java arrays are reified (they check types at runtime via `ArrayStoreException`) and covariant (`String[]` is an `Object[]`). Generics are erased and invariant. If you could create `List<String>[] arr = new List<String>[10]`, you could assign it to `Object[] objArr = arr`. Then `objArr[0] = new ArrayList<Integer>()` would pass runtime array checks (since `ArrayList` is an `Object`). But reading `arr[0].get(0)` would crash with a ClassCastException! To prevent this heap pollution, Java bans generic array instantiation.',
      'Limitation 6: Cannot Extend Throwable (`class MyException<T> extends Exception`). When an exception is thrown, the JVM inspects the catch blocks in the method`s exception table to find a matching class descriptor. Because generics are erased, the JVM cannot distinguish between `catch (MyException<String> e)` and `catch (MyException<Integer> e)`. Hence, generic exception classes are prohibited.',
      'Limitation 7: Method Overloading Clash. Two methods cannot have parameter lists that erase to the same raw types: `void sort(List<String> l)` and `void sort(List<Integer> l)` both erase to `void sort(List l)`, causing a duplicate method error in bytecode.'
    ],
    diagram: `WHY GENERIC ARRAY CREATION IS FORBIDDEN: HEAP POLLUTION TRAP
========================================================================

HYPOTHETICAL SCENARIO (If "new List<String>[2]" were permitted):

Step 1: Create generic array
   List<String>[] stringLists = new List<String>[2]; // ILLEGAL IN JAVA!

Step 2: Assign to Object[] (legal because arrays are covariant!)
   Object[] objects = stringLists;

Step 3: Insert an incompatible list into the Object[] array
   List<Integer> intList = Arrays.asList(42);
   objects[0] = intList; // ArrayStoreException CANNOT detect this because
                         // at runtime, intList is just a raw ArrayList!

Step 4: Retrieve string from the original generic reference
   String str = stringLists[0].get(0);
   ▲
   └── CRASH! Runtime ClassCastException: Integer cannot be cast to String!

* CONCLUSION: Java bans generic array creation at compile time to prevent
  this catastrophic type safety failure (Heap Pollution)!`,
    codeSnippet: {
      title: 'Overcoming Generic Limitations with Class Tokens and Suppliers',
      code: `import java.lang.reflect.Array;
import java.util.*;
import java.util.function.Supplier;

public class GenericsWorkarounds {
    // Workaround 1: Supplier<T> for new T()
    public static <T> T instantiateWithSupplier(Supplier<T> supplier) {
        return supplier.get();
    }

    // Workaround 2: Reflection Class<T> for generic array creation
    @SuppressWarnings("unchecked")
    public static <T> T[] createGenericArray(Class<T> clazz, int capacity) {
        return (T[]) Array.newInstance(clazz, capacity);
    }

    public static void main(String[] args) {
        // Safe instantiation via method reference
        StringBuilder sb = instantiateWithSupplier(StringBuilder::new);
        sb.append("Created via Supplier!");
        System.out.println(sb);

        // Safe generic array creation via reflection token
        String[] words = createGenericArray(String.class, 3);
        words[0] = "Alpha";
        words[1] = "Beta";
        words[2] = "Gamma";
        System.out.println("Array component type: " + words.getClass().getComponentType().getSimpleName());
        System.out.println("Array contents: " + Arrays.toString(words));
    }
}`,
      lineByLineExplanation: [
        { line: 'public static <T> T instantiateWithSupplier(Supplier<T> supplier)', explanation: 'Uses functional Supplier<T> to delegate object construction to caller without reflection.' },
        { line: 'Array.newInstance(clazz, capacity)', explanation: 'Uses JVM reflection API to allocate an array with reified component type Class<T> at runtime.' },
        { line: 'StringBuilder sb = instantiateWithSupplier(StringBuilder::new);', explanation: 'Passes constructor reference StringBuilder::new to instantiate T cleanly.' },
        { line: 'String[] words = createGenericArray(String.class, 3);', explanation: 'Allocates a genuine String[] array of length 3 via the Class<String> runtime token.' },
        { line: 'words.getClass().getComponentType()', explanation: 'Proves the array component type is genuine String, avoiding heap pollution.' }
      ],
      output: `Created via Supplier!
Array component type: String
Array contents: [Alpha, Beta, Gamma]`
    },
    codeExamples: [
      {
        title: 'Safe Varargs Method with @SafeVarargs',
        description: 'Demonstrating how to safely write generic varargs without heap pollution warnings.',
        code: `import java.util.*;

public class SafeVarargsDemo {
    // @SafeVarargs suppresses "Possible heap pollution from parameterized vararg type"
    @SafeVarargs
    public static <T> List<T> makeList(T... elements) {
        List<T> list = new ArrayList<>(elements.length);
        for (T elem : elements) {
            list.add(elem);
        }
        return list; // Safe: array does not escape, elements are not overwritten!
    }

    public static void main(String[] args) {
        List<String> names = makeList("Alice", "Bob", "Charlie");
        System.out.println("Names list: " + names);

        List<Integer> primes = makeList(2, 3, 5, 7, 11);
        System.out.println("Primes list: " + primes);
    }
}`,
        output: `Names list: [Alice, Bob, Charlie]
Primes list: [2, 3, 5, 7, 11]`
      },
      {
        title: 'Instanceof Checks with Unbounded Wildcard List<?>',
        description: 'Demonstrating the only legal way to check parameterized collections using instanceof.',
        code: `import java.util.*;

public class InstanceofWildcardDemo {
    public static void processUnknown(Object obj) {
        // Legal: Testing against reifiable unbounded wildcard List<?>
        if (obj instanceof List<?>) {
            List<?> list = (List<?>) obj;
            System.out.println("Found List of size: " + list.size());
            if (!list.isEmpty()) {
                System.out.println("First item: " + list.get(0));
            }
        } else {
            System.out.println("Not a List!");
        }
    }

    public static void main(String[] args) {
        processUnknown(Arrays.asList("Java", "Kotlin"));
        processUnknown(42);
    }
}`,
        output: `Found List of size: 2
First item: Java
Not a List!`
      }
    ],
    beginnerMistakes: [
      {
        mistake: 'Trying to create an array of generic lists: new List<String>[10]',
        whyItHappens: 'Developers need a list of lists and attempt to use arrays for the outer layer.',
        howToFix: 'Use `List<List<String>> list = new ArrayList<>()`. Collections are superior to arrays for generic types.'
      },
      {
        mistake: 'Attempting to create generic exceptions: class MyException<T> extends Exception',
        whyItHappens: 'Developers want to attach generic payload data to an exception class.',
        howToFix: 'Use a standard non-generic exception class with an `Object` payload or a specific domain payload field.'
      },
      {
        mistake: 'Putting @SafeVarargs on a method that modifies the varargs array',
        whyItHappens: 'Developers apply the annotation just to silence compiler warnings without understanding the safety contract.',
        howToFix: 'Only use `@SafeVarargs` if the method never stores into the varargs array and never exposes the array reference to other code.'
      }
    ],
    practiceProblems: [
      {
        title: 'Puzzle 1: Illegal Generic Array Creation',
        problemStatement: 'Which of the following array creation statements causes a compile-time error?',
        code: `// Line 1: String[] a = new String[10];
// Line 2: Object[] b = new Object[10];
// Line 3: List<?>[] c = new List<?>[10];
// Line 4: List<String>[] d = new List<String>[10];`,
        options: [
          'A) Line 1',
          'B) Line 2',
          'C) Line 3',
          'D) Line 4'
        ],
        correctOptionIndex: 3,
        hint: 'Non-reifiable parameterized types cannot be instantiated as arrays.',
        solution: 'Option D is correct: Line 4',
        explanation: '`new List<String>[10]` is illegal because `List<String>` is non-reifiable. Note that `new List<?>[10]` (Line 3) IS legal because unbounded wildcard `List<?>` is reifiable.'
      },
      {
        title: 'Puzzle 2: Compiling Generic Exception Class',
        problemStatement: 'What happens when compiling `class DataException<T> extends Exception { T data; }`?',
        code: `class DataException<T> extends Exception {
    T data;
}`,
        options: [
          'A) Compiles cleanly',
          'B) Compilation Error: A generic class may not extend java.lang.Throwable',
          'C) Throws ClassCastException',
          'D) Compiles only if T extends Serializable'
        ],
        correctOptionIndex: 1,
        hint: 'JVM catch blocks require exact reified class descriptors.',
        solution: 'Option B is correct: Compilation Error: A generic class may not extend java.lang.Throwable',
        explanation: 'In Java, a generic class may not extend `java.lang.Throwable` directly or indirectly. The JVM exception handling mechanism operates at runtime on reified types and cannot dispatch erased generic exceptions.'
      },
      {
        title: 'Puzzle 3: Method Overload Erasure Clash',
        problemStatement: 'What is the compilation result of these two methods in the same class?',
        code: `public void handle(Set<String> s) {}
public void handle(Set<Integer> s) {}`,
        options: [
          'A) Compiles cleanly and dispatches based on set element type',
          'B) Compilation Error: Name clash: both methods have the same erasure handle(Set)',
          'C) Throws AmbiguousMethodException at runtime',
          'D) The second method overwrites the first'
        ],
        correctOptionIndex: 1,
        hint: 'What do both parameter types erase to in bytecode?',
        solution: 'Option B is correct: Compilation Error: Name clash: both methods have the same erasure handle(Set)',
        explanation: 'Both methods erase to `public void handle(Set s)`. Because the JVM does not allow two methods with identical names and parameter descriptors in the same class, `javac` rejects this with a name clash error.'
      },
      {
        title: 'Puzzle 4: Where is ClassCastException Thrown in Heap Pollution?',
        problemStatement: 'In which line does the runtime exception occur?',
        code: `import java.util.*;

public class Puzzle4 {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(); // Line 1
        List raw = list;                       // Line 2
        raw.add(100);                          // Line 3
        String str = list.get(0);              // Line 4
    }
}`,
        options: [
          'A) Line 2',
          'B) Line 3',
          'C) Line 4',
          'D) No exception; 100 is converted to "100"'
        ],
        correctOptionIndex: 2,
        hint: 'Heap pollution is a silent corruption that detonates on read.',
        solution: 'Option C is correct: Line 4',
        explanation: 'Line 3 pollutes the heap by adding an Integer into the raw list. Line 4 attempts to read `list.get(0)` as a String: the compiler-inserted `checkcast` fails, throwing `ClassCastException`.'
      },
      {
        title: 'Puzzle 5: Legal Instanceof Check with Generics',
        problemStatement: 'Which of the following instanceof expressions is syntactically legal in Java?',
        code: `Object obj = new HashMap<String, Integer>();
// Option A: obj instanceof Map<String, Integer>
// Option B: obj instanceof Map<?, ?>
// Option C: obj instanceof Map<String, ?>
// Option D: obj instanceof Map<Object, Object>`,
        options: [
          'A) Option A',
          'B) Option B',
          'C) Option C',
          'D) Option D'
        ],
        correctOptionIndex: 1,
        hint: 'Only reifiable types (including unbounded wildcards) are permitted with instanceof.',
        solution: 'Option B is correct: Option B',
        explanation: '`obj instanceof Map<?, ?>` is legal because the unbounded wildcard is reifiable (it requires no runtime knowledge of erased type arguments).'
      },
      {
        title: 'Puzzle 6: Valid Application of @SafeVarargs',
        problemStatement: 'On which of the following method declarations is `@SafeVarargs` ILLEGAL?',
        code: `// Method 1: @SafeVarargs public static <T> void m1(T... args) {}
// Method 2: @SafeVarargs public final <T> void m2(T... args) {}
// Method 3: @SafeVarargs private <T> void m3(T... args) {}
// Method 4: @SafeVarargs public <T> void m4(T... args) {}`,
        options: [
          'A) Method 1',
          'B) Method 2',
          'C) Method 3',
          'D) Method 4'
        ],
        correctOptionIndex: 3,
        hint: '@SafeVarargs requires that the method cannot be overridden.',
        solution: 'Option D is correct: Method 4',
        explanation: '`@SafeVarargs` can only be applied to methods that cannot be overridden by subclasses: `static` methods, `final` instance methods, and `private` methods. Method 4 is a non-final public instance method, so `@SafeVarargs` is illegal.'
      },
      {
        title: 'Puzzle 7: Instantiating T[] using Object[] Cast',
        problemStatement: 'Consider: `T[] arr = (T[]) new Object[size];`. What is the primary safety risk of this pattern (used inside ArrayList)?',
        code: `public class CustomList<T> {
    private T[] elements;
    @SuppressWarnings("unchecked")
    public CustomList(int size) {
        elements = (T[]) new Object[size];
    }
    public T[] getArray() { return elements; }
}`,
        options: [
          'A) CustomList constructor throws OutOfMemoryError',
          'B) getArray() causes ClassCastException if caller assigns it to String[] because the actual runtime object is an Object[]',
          'C) Elements cannot be stored into the array',
          'D) Garbage collection is permanently disabled'
        ],
        correctOptionIndex: 1,
        hint: 'Can an Object[] be cast to a String[] at runtime?',
        solution: 'Option B is correct: getArray() causes ClassCastException if caller assigns it to String[] because the actual runtime object is an Object[]',
        explanation: 'The runtime array is an `Object[]`. If `getArray()` leaks `elements` to a caller who writes `String[] arr = list.getArray()`, the JVM emits a `checkcast [Ljava/lang/String;` on the `Object[]`, throwing `ClassCastException`!'
      },
      {
        title: 'Puzzle 8: Static Method Independent Type Parameter',
        problemStatement: 'What does this program print?',
        code: `class Box<T> {
    T val;
    Box(T val) { this.val = val; }

    public static <T> T identity(T item) {
        return item;
    }
}

public class Puzzle8 {
    public static void main(String[] args) {
        Box<Integer> box = new Box<>(10);
        String text = Box.identity("Static Generics");
        System.out.println(text);
    }
}`,
        options: [
          'A) Compilation Error: Cannot pass String to Box<Integer>',
          'B) Static Generics',
          'C) 10',
          'D) ClassCastException'
        ],
        correctOptionIndex: 1,
        hint: 'Static method type parameter T is completely independent of the class T.',
        solution: 'Option B is correct: Static Generics',
        explanation: '`Box.identity(T item)` is a static generic method with its own independent type parameter `T`. It has no connection to `Box<Integer>` instance typing, allowing `String` to be passed cleanly.'
      },
      {
        title: 'Puzzle 9: Sneaky Throws Generic Hack',
        problemStatement: 'How does Java`s "Sneaky Throws" idiom bypass checked exception handling?',
        code: `public static <E extends Throwable> void sneakyThrow(Throwable e) throws E {
    throw (E) e;
}`,
        options: [
          'A) It converts checked exceptions into Error instances',
          'B) Type erasure replaces E with RuntimeException in bytecode',
          'C) E erases to Throwable in bytecode, bypassing javac`s checked exception compiler checks while throwing the original checked exception',
          'D) It catches and swallows the exception silently'
        ],
        correctOptionIndex: 2,
        hint: 'The JVM does not distinguish between checked and unchecked exceptions; only javac does.',
        solution: 'Option C is correct: E erases to Throwable in bytecode, bypassing javac`s checked exception compiler checks while throwing the original checked exception',
        explanation: 'In bytecode, `throws E` erases to `throws Throwable`. Because the JVM does not enforce checked exception rules at runtime, throwing `(E) e` fools `javac` into letting a checked exception escape without `try-catch` or `throws` declaration.'
      },
      {
        title: 'Puzzle 10: ArrayStoreException with Covariant Array of Generics',
        problemStatement: 'Why is `new List<?>[10]` legal while `new List<String>[10]` is illegal?',
        code: `// Legal:
List<?>[] wildcardArray = new List<?>[10];
// Illegal:
// List<String>[] typedArray = new List<String>[10];`,
        options: [
          'A) Because List<?> is reifiable since its element type is unbounded and requires no erased type checks',
          'B) Because List<?> is synchronized',
          'C) Because wildcard arrays are stored on the stack',
          'D) Because List<?> uses less memory'
        ],
        correctOptionIndex: 0,
        hint: 'Is List<?> reifiable or non-reifiable?',
        solution: 'Option A is correct: Because List<?> is reifiable since its element type is unbounded and requires no erased type checks',
        explanation: 'An unbounded wildcard type `List<?>` is reifiable: it carries no specific type parameters that need to be verified, meaning the array runtime check cannot be violated by type erasure.'
      }
    ],
    interviewQuestions: [
      {
        question: 'Name at least five fundamental limitations of Java Generics and explain why each exists.',
        answer: 'All limitations stem from implementing Generics via Type Erasure without modifying the JVM: 1) Cannot use primitive types (`List<int>`): Generics erase to `Object`, which primitives do not extend. 2) Cannot instantiate type parameters (`new T()`): `T` erases to `Object`, so the compiler cannot determine the constructor or memory allocation size. 3) Cannot create generic arrays (`new T[10]` or `new List<String>[10]`): Arrays are reified and covariant; combining them with erased generics causes undetected heap pollution. 4) Cannot use `instanceof` with parameterized types (`obj instanceof List<String>`): The JVM has no record of erased type arguments at runtime. 5) Cannot create generic exception classes (`class MyEx<T> extends Exception`): JVM catch tables dispatch exceptions using reified class types. 6) Cannot declare static fields of type `T`: The class template is shared across all parameterized types. 7) Overloading name clashes: Methods that erase to the same raw types cannot coexist.',
        followUp: 'How does Project Valhalla plan to address some of these limitations?',
        followUpAnswer: 'Project Valhalla aims to introduce Primitive Specialization and Value Objects to the JVM, enabling generic collections of primitives (List<int>) without autoboxing overhead.',
        keyPhrases: [
          'All limitations stem from Type Erasure',
          'Primitives do not extend Object',
          'new T() lacks concrete constructor metadata',
          'Generic arrays conflict with reified array covariance',
          'Generic exceptions violate JVM catch table dispatch'
        ],
        commonMistakeAnswer: 'Asserting that limitations were design oversights that will be fixed in a minor patch.'
      },
      {
        question: 'What is the difference between Reifiable and Non-Reifiable types in Java?',
        answer: 'A Reifiable type is a type whose complete type information is fully available at runtime (it is not erased during compilation). Reifiable types include: 1) Primitives (`int`, `boolean`), 2) Non-generic reference types (`String`, `Thread`), 3) Raw types (`List`, `Map`), 4) Unbounded wildcard types (`List<?>`, `Map<?, ?>`), 5) Arrays of reifiable types (`int[]`, `String[]`, `List<?>[]`). A Non-Reifiable type is a type whose type information is partially or fully erased at compile time: 1) Parameterized types with concrete arguments (`List<String>`, `Map<String, Integer>`), 2) Bounded wildcard types (`List<? extends Number>`), 3) Type parameters (`T`, `E`). Non-reifiable types cannot be used in `instanceof` checks or array creation.',
        followUp: 'Why is List<?> reifiable while List<Object> is non-reifiable?',
        followUpAnswer: 'Because `List<?>` represents a list of unknown type with no constraints: its runtime representation (`List`) contains all the information needed to represent it. In contrast, `List<Object>` asserts that only Objects can be added, which is erased at runtime.',
        keyPhrases: [
          'Reifiable: full type information available at runtime',
          'Non-reifiable: type parameters erased at compile time',
          'Primitives, raw types, and List<?> are reifiable',
          'Parameterized types and type variables are non-reifiable'
        ],
        commonMistakeAnswer: 'Thinking all classes in Java are reifiable.'
      },
      {
        question: 'Explain why generic array creation (new List<String>[10] or new T[10]) is banned in Java.',
        answer: 'Generic array creation is banned because Java arrays are covariant and reified, while generics are invariant and erased. If `new List<String>[10]` were permitted: 1) It would erase to `new List[10]`. 2) Because arrays are covariant, you could assign it to an Object array: `Object[] arr = new List<String>[10]`. 3) You could then store an incompatible list into it: `arr[0] = new ArrayList<Integer>()`. Because arrays reify types, the JVM checks if `ArrayList` is an `Object`, which is true, so `ArrayStoreException` is NOT thrown! 4) Later, reading from the original reference: `String s = ((List<String>[]) arr)[0].get(0)` would detonate with a `ClassCastException`! To prevent this invisible heap pollution, Java completely bans generic array instantiation at compile time.',
        followUp: 'Why is new List<?>[10] allowed?',
        followUpAnswer: 'Because `List<?>` is reifiable. You cannot add any element to `List<?>` (except null), so you cannot inject mismatched types into it.',
        keyPhrases: [
          'Arrays are reified and covariant',
          'Generics are erased and invariant',
          'ArrayStoreException cannot detect erased type mismatches',
          'Leads to undetectable heap pollution and runtime crashes',
          'Banned at compile time by javac'
        ],
        commonMistakeAnswer: 'Believing generic arrays are banned because arrays cannot hold collections.'
      },
      {
        question: 'What is Heap Pollution? How does it occur, and how do you prevent it?',
        answer: 'Heap Pollution occurs when a variable of a parameterized type refers to an object that is not of that parameterized type. It occurs primarily through two vectors: 1) Raw Type Aliasing: Assigning a parameterized collection to a raw type reference, adding an incompatible object, and reading it through the parameterized reference. 2) Generic Varargs: Because varargs creates an underlying array (`T[]`), passing parameterized types into varargs methods can result in mixed-type arrays. Prevention: 1) Never use raw types in modern code. 2) Eliminate all unchecked compiler warnings (`-Xlint:unchecked`). 3) Use `@SafeVarargs` only on methods that do not mutate or leak the varargs array.',
        followUp: 'Does heap pollution throw an immediate exception when the wrong object is stored?',
        followUpAnswer: 'No! That is what makes it so dangerous: the corrupted object sits silently in the heap. The exception only occurs later when another thread or method attempts to read and cast the value.',
        keyPhrases: [
          'Parameterized variable points to object of wrong type',
          'Caused by raw types and generic varargs',
          'Silent corruption at write time',
          'Explodes as ClassCastException at read time',
          'Prevent by eliminating unchecked compiler warnings'
        ],
        commonMistakeAnswer: 'Confusing heap pollution with native memory corruption or C++ buffer overflows.'
      },
      {
        question: 'Explain the purpose and constraints of the @SafeVarargs annotation.',
        answer: 'When a method declares a generic varargs parameter (`public static <T> void addAll(List<T> list, T... elements)`), the compiler synthesizes a backing array (`new T[]`), which is a non-reifiable generic array. This triggers compiler warnings: `Possible heap pollution from parameterized vararg type`. If the author knows the method is safe, they apply `@SafeVarargs` to suppress the warning for all callers. Safety Contract: 1) The method must never store anything into the varargs array. 2) The method must never allow the array reference to escape (e.g. returning it or passing it to untrusted code). Constraints: To prevent subclasses from overriding the method with an unsafe implementation, `@SafeVarargs` can ONLY be applied to `static` methods, `final` instance methods, and `private` methods.',
        followUp: 'Why was private method support added in Java 9?',
        followUpAnswer: 'Private methods cannot be overridden, making them just as safe as final and static methods.',
        keyPhrases: [
          'Suppresses heap pollution warnings on generic varargs',
          'Contract: does not store into array or escape array reference',
          'Restricted to static, final, and private methods',
          'Cannot be overridden by subclasses'
        ],
        commonMistakeAnswer: 'Applying @SafeVarargs on public overridable methods.'
      },
      {
        question: 'How does ArrayList implement its internal array storage (elementData) despite the generic array creation ban?',
        answer: 'Because `new E[capacity]` is illegal, `ArrayList<E>` uses an internal `transient Object[] elementData;` array. When elements are added, they are stored directly as `Object`. When elements are retrieved, `ArrayList` performs an explicit cast: `return (E) elementData[index];`. This cast generates an unchecked cast compiler warning, which the JDK designers suppressed with `@SuppressWarnings("unchecked")` inside the method. Because the only way to add elements to the `elementData` array is through `ArrayList` methods that enforce compile-time type `E`, this unchecked cast is mathematically guaranteed to be safe.',
        followUp: 'What would happen if ArrayList declared its field as E[] elementData?',
        followUpAnswer: 'It would have to construct `elementData = (E[]) new Object[cap]`. While this works internally, returning `elementData` directly to callers would cause ClassCastException if assigned to `E[]`.',
        keyPhrases: [
          'Backing array is transient Object[] elementData',
          'Retrieval performs cast: (E) elementData[index]',
          '@SuppressWarnings("unchecked") applied locally',
          'Encapsulation guarantees cast safety'
        ],
        commonMistakeAnswer: 'Claiming ArrayList uses reflection Array.newInstance() for every resize.'
      },
      {
        question: 'Why can you not catch or throw generic exceptions in Java?',
        answer: 'In the JVM, exception handling is governed by an exception table in the bytecode. When an exception is thrown, the JVM traverses the table comparing the exception object`s actual runtime `Class` against the caught class descriptors. Because generics are erased at compile time, `MyException<String>` and `MyException<Integer>` would both erase to `MyException`. The JVM would have no way to determine which catch block should handle the exception at runtime. Furthermore, if generic exceptions were allowed: `try { ... } catch (T e) { ... }` would erase to `catch (Object e)`, which violates the fundamental JVM rule that catch blocks can only catch subclasses of `Throwable`.',
        followUp: 'Can a method declare `throws T` where `T extends Throwable`?',
        followUpAnswer: 'Yes! Method throws clauses CAN declare type variables (`<T extends Throwable> void run() throws T`), because throws declarations are verified at compile time.',
        keyPhrases: [
          'JVM exception table requires reified Class descriptors',
          'Type erasure makes catch blocks indistinguishable',
          'catch (T e) would erase to catch (Object)',
          'Method throws T clause is legal because it is compile-time'
        ],
        commonMistakeAnswer: 'Asserting that throws T is also illegal in Java.'
      },
      {
        question: 'What is the "Sneaky Throws" pattern in Java, and how does it exploit Generics type erasure?',
        answer: 'Sneaky Throws is a clever hack (popularized by Project Lombok`s `@SneakyThrows`) that allows throwing checked exceptions without declaring them in a `throws` clause or wrapping them in a `RuntimeException`. It exploits type erasure: `public static <E extends Throwable> void sneakyThrow(Throwable e) throws E { throw (E) e; }`. When calling `sneakyThrow(new IOException())`, the compiler infers `E` as `RuntimeException`. However, at bytecode level, `(E) e` erases to `(Throwable) e`. Because the JVM does not enforce checked exceptions at runtime (checked exceptions are purely a `javac` compiler feature), the checked exception is thrown directly up the call stack without compilation errors!',
        followUp: 'Should Sneaky Throws be used in standard production business logic?',
        followUpAnswer: 'No, it should generally be avoided because it hides checked exceptions from callers, making error handling brittle and violating Java exception handling design.',
        keyPhrases: [
          'Throws checked exceptions without throws declaration',
          'Exploits type erasure of <E extends Throwable>',
          'JVM does not enforce checked exceptions at runtime',
          'Used in Lombok @SneakyThrows'
        ],
        commonMistakeAnswer: 'Thinking the JVM wraps the exception in a RuntimeException at runtime.'
      },
      {
        question: 'How do you instantiate a generic type T safely in modern Java without reflection?',
        answer: 'The modern, idiomatic approach is to pass a factory functional interface: `java.util.function.Supplier<T>`. For example: `public <T> T createItem(Supplier<T> factory) { return factory.get(); }`. Callers invoke this using constructor references: `createItem(StringBuilder::new)` or `createItem(ArrayList::new)`. Advantages over reflection: 1) 100% compile-time type-safe. 2) Works with constructors that accept parameters via custom functional interfaces. 3) Does not throw checked reflection exceptions (`NoSuchMethodException`, `InstantiationException`). 4) Zero reflection overhead; the HotSpot JIT compiler can inline constructor calls directly.',
        followUp: 'When would you still use Class<T> reflection over Supplier<T>?',
        followUpAnswer: 'When working with serialization, JSON deserializers (Jackson/Gson), or ORM frameworks (JPA/Hibernate) where classes are configured dynamically via strings or configuration files at runtime.',
        keyPhrases: [
          'Pass Supplier<T> factory parameter',
          'Caller passes constructor reference (ClassName::new)',
          'Avoids reflection exceptions and runtime overhead',
          'JIT can inline Supplier invocation'
        ],
        commonMistakeAnswer: 'Suggesting that new T() will be supported in the next Java release.'
      },
      {
        question: 'What is the difference between casting to a raw type vs casting to an unbounded wildcard?',
        answer: 'Casting to a raw type like `(List) obj` tells the compiler to completely abandon generic type checking for that expression, producing an unchecked warning and allowing you to add any object into the resulting list. Casting to an unbounded wildcard `(List<?>) obj` participates in generic type safety: it produces NO unchecked compiler warning because `List<?>` is reifiable. The compiler verifies that `obj` is indeed a `List`, but because the element type is unknown, the compiler enforces that `List<?>` is read-only (you cannot call `add()` on it). Thus, casting to `List<?>` is always preferred over casting to raw `List`.',
        followUp: 'Can you cast (List<String>) obj without a compiler warning?',
        followUpAnswer: 'No, casting to a non-reifiable parameterized type produces an unchecked cast warning because the JVM cannot verify element types at runtime.',
        keyPhrases: [
          'Raw cast disables all generic checks and warns',
          'Unbounded wildcard cast List<?> is safe and produces no warning',
          'List<?> enforces read-only safety',
          'Prefer List<?> over raw types'
        ],
        commonMistakeAnswer: 'Believing that casting to List<?> and raw List have the same compile-time behavior.'
      }
    ],
    miniQuiz: [
      {
        question: 'Why cannot primitive types (int, double) be used as generic type parameters in Java?',
        options: [
          'Because primitive types do not extend java.lang.Object, and type erasure replaces type parameters with Object',
          'Because primitive types are too large in memory',
          'Because the compiler cannot format numbers',
          'Because primitives are mutable'
        ],
        correctIndex: 0,
        explanation: 'Type erasure replaces type parameters with `Object`. Since primitives are raw values and do not inherit from `Object`, they cannot be substituted.'
      },
      {
        question: 'Why is `new T[10]` a compile-time error in Java?',
        options: [
          'Because arrays cannot hold more than 5 elements in generic classes',
          'Because arrays are reified and enforce types at runtime, while T is erased at compile time, leading to potential heap pollution',
          'Because arrays are deprecated',
          'Because 10 is not a power of 2'
        ],
        correctIndex: 1,
        explanation: 'Arrays reify their component type at runtime. Because `T` is erased, creating a generic array would bypass array type checks, causing heap pollution.'
      },
      {
        question: 'What is a Reifiable type in Java?',
        options: [
          'A type whose complete information is available at runtime (not erased)',
          'A type that can be serialized to JSON',
          'A type that extends Exception',
          'A type with no methods'
        ],
        correctIndex: 0,
        explanation: 'A reifiable type retains full type metadata at runtime without having been erased during compilation.'
      },
      {
        question: 'Which of the following is a non-reifiable type?',
        options: [
          'int',
          'String',
          'List<?>',
          'List<String>'
        ],
        correctIndex: 3,
        explanation: '`List<String>` is non-reifiable because its type argument (`String`) is erased to raw `List` at runtime.'
      },
      {
        question: 'What is Heap Pollution?',
        options: [
          'When a variable of a parameterized type refers to an object of a different type, leading to later ClassCastExceptions on read',
          'A native memory leak in JVM metaspace',
          'Garbage collector failure',
          'Stack overflow from deep recursion'
        ],
        correctIndex: 0,
        explanation: 'Heap pollution is the silent corruption where a parameterized reference points to an object of an incompatible type.'
      },
      {
        question: 'Why cannot a class extend `java.lang.Throwable` with generic type parameters (`class MyEx<T> extends Exception`)?',
        options: [
          'Because exceptions must be serializable',
          'Because JVM catch blocks dispatch exceptions using reified Class objects, which would be indistinguishable after type erasure',
          'Because exceptions cannot hold fields',
          'Because Throwable is a final class'
        ],
        correctIndex: 1,
        explanation: 'JVM catch blocks require reified type descriptors. Type erasure would make `catch (MyEx<String>)` indistinguishable from `catch (MyEx<Integer>)`.'
      },
      {
        question: 'What does the `@SafeVarargs` annotation do?',
        options: [
          'Automatically checks types at runtime',
          'Suppresses compiler heap pollution warnings on generic varargs methods, provided the method does not mutate or leak the array',
          'Converts varargs arrays into ArrayLists',
          'Synchronizes the varargs array'
        ],
        correctIndex: 1,
        explanation: '`@SafeVarargs` asserts that a generic varargs method is safe, suppressing compiler heap pollution warnings.'
      },
      {
        question: 'Which is the recommended modern way to instantiate generic type T without reflection?',
        options: [
          'new T()',
          'Passing a Supplier<T> factory lambda (e.g. StringBuilder::new)',
          'Calling T.class.newInstance()',
          'Using clone()'
        ],
        correctIndex: 1,
        explanation: 'Passing a `Supplier<T>` is type-safe, avoids checked reflection exceptions, and allows HotSpot JIT inlining.'
      },
      {
        question: 'Why can static fields NOT be declared with a generic type parameter T (`private static T item;`)?',
        options: [
          'Because static fields are stored in Metaspace',
          'Because the generic class is loaded once and shared across all parameterized types; T is instance-specific',
          'Because static fields must be primitive',
          'Because static fields are final by default'
        ],
        correctIndex: 1,
        explanation: 'There is only one static field for the class. Since all instantiations share the class, `T` cannot be resolved statically.'
      },
      {
        question: 'What happens when casting `(List<?>) obj` versus `(List) obj`?',
        options: [
          'Casting to List<?> produces no unchecked warning and enforces read-only safety, whereas raw List produces an unchecked warning',
          'They produce the identical compiler warning',
          'Casting to List<?> is illegal syntax',
          'Raw List is faster'
        ],
        correctIndex: 0,
        explanation: '`List<?>` is reifiable, so casting to `List<?>` produces no warning while preventing unsafe writes.'
      }
    ]
  }
};
