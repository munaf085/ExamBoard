import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 20: GENERICS & TYPE SAFETY (40 EXERCISES)
// 10 Exercises per sub-lesson across Lessons 20.1 - 20.4
// ============================================================

export const col20Exercises: Record<string, ProgrammingExercise[]> = {
  // ── LESSON 20.1: Generic Types, Classes & Methods ───────────────────
  'generic-types-and-methods': [
    {
      id: 'col-20-1-ex1',
      title: 'Generic Box Container with Type Safety',
      problemStatement: 'Implement a generic `Box<T>` container class with `set(T item)` and `get()` methods, demonstrating compile-time type safety with String and Integer types.',
      hint: 'Declare class Box<T> with private T content.',
      solutionCode: `class Box<T> {
    private T content;
    public void set(T item) { this.content = item; }
    public T get() { return content; }
}

public class Main {
    public static void main(String[] args) {
        Box<String> strBox = new Box<>();
        strBox.set("Generics in Java");
        String text = strBox.get(); // No cast needed!

        Box<Integer> intBox = new Box<>();
        intBox.set(42);
        int num = intBox.get();

        System.out.println("String Box: " + text);
        System.out.println("Integer Box: " + num);
    }
}`,
      output: `String Box: Generics in Java
Integer Box: 42`,
      explanation: 'Generic type parameters eliminate manual object casting and catch type mismatch bugs at compile time.'
    },
    {
      id: 'col-20-1-ex2',
      title: 'Generic Pair Class with Multiple Type Parameters',
      problemStatement: 'Create a generic `Pair<K, V>` immutable class with getters, constructing an instance that pairs a String key with a List of integers.',
      hint: 'Declare class Pair<K, V> with final fields K key and V value.',
      solutionCode: `import java.util.*;

final class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() { return key; }
    public V getValue() { return value; }

    @Override
    public String toString() { return "(" + key + " -> " + value + ")"; }
}

public class Main {
    public static void main(String[] args) {
        Pair<String, List<Integer>> pair = new Pair<>("scores", Arrays.asList(95, 88, 92));
        System.out.println("Pair: " + pair);
        System.out.println("Key: " + pair.getKey() + " | First item: " + pair.getValue().get(0));
    }
}`,
      output: `Pair: (scores -> [95, 88, 92])
Key: scores | First item: 95`,
      explanation: 'Generics can support multiple type parameters, preserving complete type safety across complex composite data structures.'
    },
    {
      id: 'col-20-1-ex3',
      title: 'Generic Swap Method for Arrays',
      problemStatement: 'Write a generic static method `<T> void swap(T[] array, int i, int j)` that swaps two elements in an array of any reference type.',
      hint: 'Declare <T> before the return type void.',
      solutionCode: `import java.util.Arrays;

public class Main {
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static void main(String[] args) {
        String[] words = {"Apple", "Banana", "Cherry"};
        swap(words, 0, 2);
        System.out.println("Swapped Strings: " + Arrays.toString(words));

        Integer[] numbers = {10, 20, 30};
        swap(numbers, 1, 2);
        System.out.println("Swapped Integers: " + Arrays.toString(numbers));
    }
}`,
      output: `Swapped Strings: [Cherry, Banana, Apple]
Swapped Integers: [10, 30, 20]`,
      explanation: 'The `<T>` declaration preceding the method return type defines a generic method capable of operating on arrays of any reference type.'
    },
    {
      id: 'col-20-1-ex4',
      title: 'Bounded Type Parameter for Numeric Summation',
      problemStatement: 'Create a generic method `<T extends Number> double sum(T num1, T num2)` that accepts any Number subclass and returns their sum as a double.',
      hint: 'Bound type parameter with <T extends Number> and call num.doubleValue().',
      solutionCode: `public class Main {
    public static <T extends Number> double sum(T num1, T num2) {
        return num1.doubleValue() + num2.doubleValue();
    }

    public static void main(String[] args) {
        System.out.println("Sum of ints:    " + sum(10, 25));
        System.out.println("Sum of doubles: " + sum(3.14, 2.86));
        System.out.println("Sum of mixed:   " + sum(5L, 2.5f));
    }
}`,
      output: `Sum of ints:    35.0
Sum of doubles: 6.0
Sum of mixed:   7.5`,
      explanation: 'Upper bound `<T extends Number>` restricts the type to Number or its subclasses, enabling direct invocation of Number methods like `doubleValue()`.'
    },
    {
      id: 'col-20-1-ex5',
      title: 'Generic Maximum Finder with Comparable Bound',
      problemStatement: 'Implement a generic method `<T extends Comparable<T>> T findMax(T[] array)` that finds and returns the maximum element in an array.',
      hint: 'Bound T with <T extends Comparable<T>> and use element.compareTo(max) > 0.',
      solutionCode: `public class Main {
    public static <T extends Comparable<T>> T findMax(T[] array) {
        if (array == null || array.length == 0) return null;
        T max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i].compareTo(max) > 0) {
                max = array[i];
            }
        }
        return max;
    }

    public static void main(String[] args) {
        Integer[] nums = {12, 45, 7, 89, 23};
        String[] words = {"zebra", "apple", "mango", "banana"};

        System.out.println("Max Integer: " + findMax(nums));
        System.out.println("Max String:  " + findMax(words));
    }
}`,
      output: `Max Integer: 89
Max String:  zebra`,
      explanation: 'The recursively bounded type `<T extends Comparable<T>>` guarantees that elements can be compared with each other via `compareTo()`.'
    },
    {
      id: 'col-20-1-ex6',
      title: 'Generic Stack ADT Implementation',
      problemStatement: 'Implement a generic `SimpleStack<T>` using an internal ArrayList, supporting `push(T item)`, `pop()`, `peek()`, and `isEmpty()`.',
      hint: 'Wrap ArrayList<T> and operate on size() - 1.',
      solutionCode: `import java.util.*;

class SimpleStack<T> {
    private final List<T> list = new ArrayList<>();

    public void push(T item) { list.add(item); }
    public T pop() {
        if (isEmpty()) throw new NoSuchElementException("Stack is empty");
        return list.remove(list.size() - 1);
    }
    public T peek() {
        if (isEmpty()) throw new NoSuchElementException("Stack is empty");
        return list.get(list.size() - 1);
    }
    public boolean isEmpty() { return list.isEmpty(); }
    public int size() { return list.size(); }
}

public class Main {
    public static void main(String[] args) {
        SimpleStack<String> stack = new SimpleStack<>();
        stack.push("First");
        stack.push("Second");
        stack.push("Third");

        System.out.println("Peek: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
        System.out.println("Remaining size: " + stack.size());
    }
}`,
      output: `Peek: Third
Popped: Third
Remaining size: 2`,
      explanation: 'Generics allow data structure implementations to be completely type-agnostic while preserving strict compile-time types for callers.'
    },
    {
      id: 'col-20-1-ex7',
      title: 'Multiple Bounded Type Parameters (<T extends Class & Interface>)',
      problemStatement: 'Write a generic method `<T extends Number & Comparable<T>>` that accepts an item and prints whether it is greater than zero.',
      hint: 'Class bound must come first, followed by interface bounds using &.',
      solutionCode: `public class Main {
    public static <T extends Number & Comparable<T>> boolean isPositive(T val) {
        return val.doubleValue() > 0;
    }

    public static void main(String[] args) {
        System.out.println("isPositive(42):   " + isPositive(42));
        System.out.println("isPositive(-15):  " + isPositive(-15));
        System.out.println("isPositive(3.14): " + isPositive(3.14));
    }
}`,
      output: `isPositive(42):   true
isPositive(-15):  false
isPositive(3.14): true`,
      explanation: 'Multiple bounds use the `&` operator. The single class bound (if any) must be declared first, followed by any number of interface bounds.'
    },
    {
      id: 'col-20-1-ex8',
      title: 'Generic Factory Interface with Lambda Implementation',
      problemStatement: 'Define a generic `Factory<T>` functional interface with a `T create()` method, implementing factories for User and Product objects using method references.',
      hint: 'Use @FunctionalInterface interface Factory<T> { T create(); } and constructor reference User::new.',
      solutionCode: `class User {
    private final String name = "Default User";
    @Override public String toString() { return name; }
}

class Product {
    private final String title = "Default Product";
    @Override public String toString() { return title; }
}

@FunctionalInterface
interface Factory<T> {
    T create();
}

public class Main {
    public static <T> T produce(Factory<T> factory) {
        return factory.create();
    }

    public static void main(String[] args) {
        User u = produce(User::new);
        Product p = produce(Product::new);

        System.out.println("Created: " + u);
        System.out.println("Created: " + p);
    }
}`,
      output: `Created: Default User
Created: Default Product`,
      explanation: 'Generic functional interfaces allow factory patterns to construct arbitrary domain instances safely with method references.'
    },
    {
      id: 'col-20-1-ex9',
      title: 'Type Inference with Diamond Operator in Java 7+',
      problemStatement: 'Demonstrate type inference where compiler infers type arguments without explicit repetition using the diamond operator `<>`.',
      hint: 'Map<String, List<Integer>> map = new HashMap<>() infers inner type arguments.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Compiler infers String and List<Integer> via diamond operator <>
        Map<String, List<Integer>> matrix = new HashMap<>();
        matrix.put("row1", Arrays.asList(1, 2, 3));

        System.out.println("Inferred type entry: " + matrix.get("row1"));
    }
}`,
      output: `Inferred type entry: [1, 2, 3]`,
      explanation: 'Java 7+ diamond operator `<>` infers generic type parameters from the variable declaration, eliminating redundant boilerplate.'
    },
    {
      id: 'col-20-1-ex10',
      title: 'Compiler Rejection of Raw Types',
      problemStatement: 'Demonstrate why raw types produce unchecked warnings and Runtime ClassCastException, comparing raw List against `List<String>`.',
      hint: 'Raw list accepts any Object, leading to runtime crash when casting.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Type-Safe Generic List
        List<String> safeList = new ArrayList<>();
        safeList.add("Valid String");
        // safeList.add(123); // Compiler rejects this!

        // Raw Type List (Bad practice)
        List rawList = new ArrayList();
        rawList.add("Valid");
        rawList.add(456); // Compiles without error, but unsafe!

        System.out.println("Safe list item: " + safeList.get(0));

        try {
            for (Object obj : rawList) {
                String str = (String) obj; // Fails on Integer 456!
                System.out.println("Parsed: " + str);
            }
        } catch (ClassCastException e) {
            System.out.println("Caught ClassCastException on raw type: " + e.getMessage());
        }
    }
}`,
      output: `Safe list item: Valid String
Parsed: Valid
Caught ClassCastException on raw type: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')`,
      explanation: 'Raw types bypass compile-time verification, deferring type mismatches to runtime ClassCastExceptions.'
    }
  ],

  // ── LESSON 20.2: Type Erasure & Synthetic Bridge Methods ─────────────
  'type-erasure-and-bridge-methods': [
    {
      id: 'col-20-2-ex1',
      title: 'Observing Type Erasure via Reflection',
      problemStatement: 'Prove that `List<String>` and `List<Integer>` have the exact same runtime `Class` object due to compile-time type erasure.',
      hint: 'Compare list1.getClass() == list2.getClass().',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();

        System.out.println("String List Class:  " + strings.getClass().getName());
        System.out.println("Integer List Class: " + integers.getClass().getName());
        System.out.println("Are classes identical? " + (strings.getClass() == integers.getClass()));
    }
}`,
      output: `String List Class:  java.util.ArrayList
Integer List Class: java.util.ArrayList
Are classes identical? true`,
      explanation: 'Generic type parameters are erased at compile time: both generic lists share the identical `java.util.ArrayList` Class object at runtime.'
    },
    {
      id: 'col-20-2-ex2',
      title: 'Bypassing Generics at Runtime via Reflection',
      problemStatement: 'Demonstrate type erasure by using reflection to insert an Integer into a `List<String>` at runtime, and observe when ClassCastException occurs.',
      hint: 'Get list.getClass().getMethod("add", Object.class) and invoke it.',
      solutionCode: `import java.lang.reflect.Method;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        List<String> list = new ArrayList<>();
        list.add("Hello");

        // Use reflection to bypass generic compile check
        Method addMethod = list.getClass().getMethod("add", Object.class);
        addMethod.invoke(list, 999); // Appends Integer 999 into List<String>!

        System.out.println("List contents via raw print: " + list);

        try {
            // Compiler inserts checkcast to String on get()!
            String val = list.get(1);
            System.out.println("Value: " + val);
        } catch (ClassCastException e) {
            System.out.println("Caught ClassCastException on get(1): Integer cannot be cast to String!");
        }
    }
}`,
      output: `List contents via raw print: [Hello, 999]
Caught ClassCastException on get(1): Integer cannot be cast to String!`,
      explanation: 'Type erasure leaves the underlying list capable of holding any Object. The compiler inserts a bytecode `checkcast` on `get(1)`, which fails at runtime.'
    },
    {
      id: 'col-20-2-ex3',
      title: 'Detecting Synthetic Bridge Methods via Reflection',
      problemStatement: 'Create a generic parent class and a typed child class, then inspect the child class methods using reflection to identify the compiler-generated `isBridge()` method.',
      hint: 'Method.isBridge() returns true for synthetic bridge methods generated by javac.',
      solutionCode: `import java.lang.reflect.Method;

class Node<T> {
    public void setData(T data) { System.out.println("Node.setData"); }
}

class MyNode extends Node<Integer> {
    @Override
    public void setData(Integer data) { System.out.println("MyNode.setData: " + data); }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Methods in MyNode:");
        for (Method m : MyNode.class.getDeclaredMethods()) {
            System.out.println("Method: " + m.getName() + 
                               " | Param: " + m.getParameterTypes()[0].getSimpleName() + 
                               " | isBridge: " + m.isBridge() + 
                               " | isSynthetic: " + m.isSynthetic());
        }
    }
}`,
      output: `Methods in MyNode:
Method: setData | Param: Integer | isBridge: false | isSynthetic: false
Method: setData | Param: Object | isBridge: true | isSynthetic: true`,
      explanation: 'The compiler generates a synthetic bridge method `setData(Object)` that casts the argument to Integer and delegates to `setData(Integer)`, preserving polymorphism.'
    },
    {
      id: 'col-20-2-ex4',
      title: 'Inspecting Generic Superclass Type via TypeTokens',
      problemStatement: 'Use `getClass().getGenericSuperclass()` and `ParameterizedType` to inspect the generic type argument of an anonymous subclass at runtime (Super Type Token pattern).',
      hint: 'Type superclass = getClass().getGenericSuperclass(); ((ParameterizedType) superclass).getActualTypeArguments()[0].',
      solutionCode: `import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

abstract class TypeReference<T> {
    private final Type type;
    protected TypeReference() {
        Type superClass = getClass().getGenericSuperclass();
        this.type = ((ParameterizedType) superClass).getActualTypeArguments()[0];
    }
    public Type getType() { return type; }
}

public class Main {
    public static void main(String[] args) {
        // Anonymous subclass captures generic type metadata in class file
        TypeReference<String> stringToken = new TypeReference<String>() {};
        TypeReference<java.util.List<Integer>> listToken = new TypeReference<java.util.List<Integer>>() {};

        System.out.println("Captured Type 1: " + stringToken.getType().getTypeName());
        System.out.println("Captured Type 2: " + listToken.getType().getTypeName());
    }
}`,
      output: `Captured Type 1: java.lang.String
Captured Type 2: java.util.List<java.lang.Integer>`,
      explanation: 'While instance types are erased, class metadata retains generic signatures. Anonymous subclasses capture generic arguments in the class bytecode (Super Type Tokens, used in Jackson and Gson).'
    },
    {
      id: 'col-20-2-ex5',
      title: 'Erasure with Bounded Type Parameter',
      problemStatement: 'Verify that a bounded type parameter `<T extends Number>` erases to `Number` rather than `Object` in compiled bytecode.',
      hint: 'Inspect method parameter types via reflection.',
      solutionCode: `import java.lang.reflect.Method;

class Calculator<T extends Number> {
    public void compute(T value) {}
}

public class Main {
    public static void main(String[] args) {
        Method m = Calculator.class.getDeclaredMethods()[0];
        System.out.println("Method name: " + m.getName());
        System.out.println("Erased parameter type: " + m.getParameterTypes()[0].getName());
    }
}`,
      output: `Method name: compute
Erased parameter type: java.lang.Number`,
      explanation: 'When a generic type parameter has an upper bound `<T extends Bound>`, the compiler erases `T` to the upper bound class (`Number`), rather than `Object`.'
    },
    {
      id: 'col-20-2-ex6',
      title: 'Method Overloading Clash under Type Erasure',
      problemStatement: 'Demonstrate why two methods `print(List<String>)` and `print(List<Integer>)` cause a compile-time error because both have the same erasure `print(List)`.',
      hint: 'Both erase to print(List list), which is a duplicate method signature in bytecode.',
      solutionCode: `import java.util.*;

public class Main {
    // Both methods would erase to: public static void process(List list)
    // Hence, they cannot coexist in the same class!
    public static void processStrings(List<String> list) {
        System.out.println("Strings: " + list);
    }

    public static void processIntegers(List<Integer> list) {
        System.out.println("Integers: " + list);
    }

    public static void main(String[] args) {
        processStrings(Arrays.asList("A", "B"));
        processIntegers(Arrays.asList(1, 2));
    }
}`,
      output: `Strings: [A, B]
Integers: [1, 2]`,
      explanation: 'Because generic parameters are erased, overloading a method solely by generic type argument creates duplicate method signatures in bytecode, which `javac` forbids.'
    },
    {
      id: 'col-20-2-ex7',
      title: 'Casting to Generic Type Generates Unchecked Warning',
      problemStatement: 'Demonstrate why casting `(List<String>) rawObject` generates an unchecked cast warning and cannot verify element types at runtime.',
      hint: 'At runtime, instance is just List; JVM cannot verify that elements are Strings.',
      solutionCode: `import java.util.*;

public class Main {
    @SuppressWarnings("unchecked")
    public static List<String> castList(Object obj) {
        // Generates compiler warning: Type safety: Unchecked cast from Object to List<String>
        return (List<String>) obj;
    }

    public static void main(String[] args) {
        List<Integer> intList = Arrays.asList(10, 20);
        List<String> strList = castList(intList); // Warning suppressed, cast succeeds at runtime!

        System.out.println("Raw cast succeeded, size: " + strList.size());
        try {
            String s = strList.get(0); // Fails on checkcast!
            System.out.println("String: " + s);
        } catch (ClassCastException e) {
            System.out.println("Caught ClassCastException on read: Integer cannot be cast to String!");
        }
    }
}`,
      output: `Raw cast succeeded, size: 2
Caught ClassCastException on read: Integer cannot be cast to String!`,
      explanation: 'At runtime, `(List<String>)` only verifies that the object is a `List`. It cannot check element types because generics are erased.'
    },
    {
      id: 'col-20-2-ex8',
      title: 'Covariant Return Types and Bridge Methods',
      problemStatement: 'Demonstrate how overriding a method with a more specific return type generates a synthetic bridge method in bytecode.',
      hint: 'Parent returns Object; Child returns String.',
      solutionCode: `import java.lang.reflect.Method;

class Producer {
    public Object produce() { return "Raw Object"; }
}

class StringProducer extends Producer {
    @Override
    public String produce() { return "Typed String"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("StringProducer methods:");
        for (Method m : StringProducer.class.getDeclaredMethods()) {
            System.out.println("Name: " + m.getName() + " | Return: " + m.getReturnType().getSimpleName() + " | isBridge: " + m.isBridge());
        }
    }
}`,
      output: `StringProducer methods:
Name: produce | Return: String | isBridge: false
Name: produce | Return: Object | isBridge: true`,
      explanation: 'Because bytecode requires overridden methods to have matching return descriptors, the compiler synthesizes a bridge method returning `Object` that delegates to `produce() -> String`.'
    },
    {
      id: 'col-20-2-ex9',
      title: 'Simulating Generic Array Creation via Reflection (Array.newInstance)',
      problemStatement: 'Implement a generic method `<T> T[] createArray(Class<T> clazz, int size)` that dynamically allocates a generic array using reflection.',
      hint: 'Use (T[]) java.lang.reflect.Array.newInstance(clazz, size).',
      solutionCode: `import java.lang.reflect.Array;
import java.util.Arrays;

public class Main {
    @SuppressWarnings("unchecked")
    public static <T> T[] createArray(Class<T> clazz, int size) {
        return (T[]) Array.newInstance(clazz, size);
    }

    public static void main(String[] args) {
        String[] strArr = createArray(String.class, 3);
        strArr[0] = "One";
        strArr[1] = "Two";
        strArr[2] = "Three";

        System.out.println("Array type: " + strArr.getClass().getComponentType().getSimpleName());
        System.out.println("Elements: " + Arrays.toString(strArr));
    }
}`,
      output: `Array type: String
Elements: [One, Two, Three]`,
      explanation: 'Passing explicit `Class<T>` runtime type tokens allows `Array.newInstance()` to allocate a typed array, bypassing the limitation that `new T[size]` is illegal.'
    },
    {
      id: 'col-20-2-ex10',
      title: 'Heap Pollution Demonstration via Raw Type Aliasing',
      problemStatement: 'Demonstrate heap pollution where a parameterized variable refers to an object that is not of that parameterized type.',
      hint: 'Assign List<String> to raw List, then add Integer, polluting the heap.',
      solutionCode: `import java.util.*;

public class Main {
    @SuppressWarnings("rawtypes")
    public static void main(String[] args) {
        List<String> stringList = new ArrayList<>();
        List rawList = stringList; // Aliased to raw type!

        // Polluting the heap: adding Integer into what is supposedly List<String>
        rawList.add(100);

        System.out.println("Raw list size: " + rawList.size());

        try {
            String text = stringList.get(0); // Compiler checkcast fails!
            System.out.println("Value: " + text);
        } catch (ClassCastException e) {
            System.out.println("Heap Pollution caught: " + e.getClass().getSimpleName());
        }
    }
}`,
      output: `Raw list size: 1
Heap Pollution caught: ClassCastException`,
      explanation: 'Heap pollution occurs when a variable of a parameterized type refers to an object of a different type, turning compile-time guarantees into runtime ClassCastExceptions.'
    }
  ],

  // ── LESSON 20.3: Wildcards & The PECS Principle ───────────────────────
  'wildcards-and-pecs-principle': [
    {
      id: 'col-20-3-ex1',
      title: 'Invariance of Generics: List<Integer> is NOT a List<Number>',
      problemStatement: 'Demonstrate that while Integer is a subclass of Number, `List<Integer>` is NOT a subclass of `List<Number>`, proving generic invariance.',
      hint: 'Attempting to assign List<Integer> to List<Number> produces a compilation error.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Integer i = 10;
        Number n = i; // Covariant primitive assignment is legal!
        System.out.println("Number value: " + n);

        List<Integer> intList = Arrays.asList(1, 2, 3);
        // List<Number> numList = intList; // COMPILATION ERROR: Incompatible types!

        System.out.println("List<Integer> cannot be assigned to List<Number> because Generics are Invariant!");
    }
}`,
      output: `Number value: 10
List<Integer> cannot be assigned to List<Number> because Generics are Invariant!`,
      explanation: 'Generics are invariant: `List<Integer>` does not extend `List<Number>`. If it did, you could call `numList.add(3.14)` and corrupt the integer list!'
    },
    {
      id: 'col-20-3-ex2',
      title: 'Upper-Bounded Wildcard <? extends Number> for Read-Only Sum',
      problemStatement: 'Write a method `sumOfList(List<? extends Number> list)` that calculates the sum of elements from any Number list (Integer, Double, Long).',
      hint: 'Use <? extends Number> to read numbers via num.doubleValue().',
      solutionCode: `import java.util.*;

public class Main {
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number num : list) {
            sum += num.doubleValue();
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(10, 20, 30);
        List<Double> doubles = Arrays.asList(1.5, 2.5, 3.5);

        System.out.println("Sum of ints:    " + sumOfList(ints));
        System.out.println("Sum of doubles: " + sumOfList(doubles));
    }
}`,
      output: `Sum of ints:    60.0
Sum of doubles: 7.5`,
      explanation: '`<? extends Number>` accepts any collection whose element type is Number or a subtype. The collection acts as a Producer (read-only).'
    },
    {
      id: 'col-20-3-ex3',
      title: 'Lower-Bounded Wildcard <? super Integer> for Writing',
      problemStatement: 'Write a method `addNumbers(List<? super Integer> list)` that adds integers 1 through 5 to any list capable of holding Integers (e.g. `List<Integer>`, `List<Number>`, `List<Object>`).',
      hint: 'Use <? super Integer> to allow adding Integers.',
      solutionCode: `import java.util.*;

public class Main {
    public static void addNumbers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) {
            list.add(i); // Safe to insert Integer!
        }
    }

    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>();
        List<Number> numList = new ArrayList<>();
        List<Object> objList = new ArrayList<>();

        addNumbers(intList);
        addNumbers(numList);
        addNumbers(objList);

        System.out.println("Integer List: " + intList);
        System.out.println("Number List:  " + numList);
        System.out.println("Object List:  " + objList);
    }
}`,
      output: `Integer List: [1, 2, 3, 4, 5]
Number List:  [1, 2, 3, 4, 5]
Object List:  [1, 2, 3, 4, 5]`,
      explanation: '`<? super Integer>` accepts Integer or any superclass of Integer. The collection acts as a Consumer (write-friendly).'
    },
    {
      id: 'col-20-3-ex4',
      title: 'Implementing Collections.copy with PECS Principle',
      problemStatement: 'Implement `copy(List<? super T> dest, List<? extends T> src)` demonstrating Joshua Bloch`s PECS mnemonic: Producer Extends, Consumer Super.',
      hint: 'src produces data (extends T), dest consumes data (super T).',
      solutionCode: `import java.util.*;

public class Main {
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (T item : src) {
            dest.add(item);
        }
    }

    public static void main(String[] args) {
        List<Integer> sourceInts = Arrays.asList(10, 20, 30);
        List<Number> destNumbers = new ArrayList<>();

        copy(destNumbers, sourceInts);
        System.out.println("Destination numbers: " + destNumbers);
    }
}`,
      output: `Destination numbers: [10, 20, 30]`,
      explanation: 'PECS: `src` is a Producer (you read from it, so use `extends`); `dest` is a Consumer (you write into it, so use `super`).'
    },
    {
      id: 'col-20-3-ex5',
      title: 'Why You Cannot Add to <? extends T>',
      problemStatement: 'Demonstrate why calling `list.add(element)` on a `List<? extends Number>` generates a compile-time error, except for null.',
      hint: 'Compiler does not know the exact concrete subtype (could be List<Double>, so adding Integer is unsafe).',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> intList = new ArrayList<>(Arrays.asList(1, 2, 3));
        List<? extends Number> numList = intList;

        // numList.add(10); // COMPILATION ERROR: The method add(capture#1-of ? extends Number) is not applicable!
        numList.add(null); // The only value allowed is null!

        System.out.println("numList size: " + numList.size());
        System.out.println("First element read: " + numList.get(0));
    }
}`,
      output: `numList size: 4
First element read: 1`,
      explanation: '`List<? extends Number>` is read-only because the compiler cannot guarantee the specific subtype at runtime. Adding any object (except null) is prohibited.'
    },
    {
      id: 'col-20-3-ex6',
      title: 'Unbounded Wildcard <?> for Universal Printing',
      problemStatement: 'Implement a universal print utility `printList(List<?> list)` that prints the size and elements of any list regardless of its type parameter.',
      hint: 'Use List<?> to accept any list type without raw type warnings.',
      solutionCode: `import java.util.*;

public class Main {
    public static void printList(List<?> list) {
        System.out.print("Size " + list.size() + " -> [");
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + (i < list.size() - 1 ? ", " : ""));
        }
        System.out.println("]");
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Alpha", "Beta");
        List<Integer> nums = Arrays.asList(1, 2, 3);

        printList(words);
        printList(nums);
    }
}`,
      output: `Size 2 -> [Alpha, Beta]
Size 3 -> [1, 2, 3]`,
      explanation: 'The unbounded wildcard `<?>` signifies an unknown type, allowing safe inspection of any collection without triggering raw-type compiler warnings.'
    },
    {
      id: 'col-20-3-ex7',
      title: 'Wildcard Capture Helper Pattern',
      problemStatement: 'Implement a wildcard reverse method `reverse(List<?> list)` using a private helper method `<T> void reverseHelper(List<T> list)` to capture the wildcard type.',
      hint: 'A generic helper method captures the unknown type ? into type parameter T.',
      solutionCode: `import java.util.*;

public class Main {
    public static void reverse(List<?> list) {
        reverseHelper(list);
    }

    private static <T> void reverseHelper(List<T> list) {
        int left = 0, right = list.size() - 1;
        while (left < right) {
            T temp = list.get(left);
            list.set(left, list.get(right));
            list.set(right, temp);
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        List<String> letters = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        reverse(letters);
        System.out.println("Reversed: " + letters);
    }
}`,
      output: `Reversed: [D, C, B, A]`,
      explanation: 'The helper method `<T>` captures the wildcard type `?`, allowing operations like `list.set()` that require a specific concrete type.'
    },
    {
      id: 'col-20-3-ex8',
      title: 'Comparable and Super Wildcard in Max Element Search',
      problemStatement: 'Write the complete signature for finding maximum elements across inheritance hierarchies: `<T extends Comparable<? super T>> T max(Collection<? extends T> coll)`.',
      hint: '<? super T> allows T to inherit compareTo from a superclass (e.g. Employee extends Person).',
      solutionCode: `import java.util.*;

class Person implements Comparable<Person> {
    final String name;
    Person(String name) { this.name = name; }
    @Override public int compareTo(Person o) { return this.name.compareTo(o.name); }
    @Override public String toString() { return name; }
}

class Employee extends Person {
    Employee(String name) { super(name); }
}

public class Main {
    public static <T extends Comparable<? super T>> T findMax(Collection<? extends T> coll) {
        Iterator<? extends T> it = coll.iterator();
        T candidate = it.next();
        while (it.hasNext()) {
            T next = it.next();
            if (next.compareTo(candidate) > 0) candidate = next;
        }
        return candidate;
    }

    public static void main(String[] args) {
        List<Employee> team = Arrays.asList(new Employee("Bob"), new Employee("Alice"), new Employee("Charlie"));
        System.out.println("Max Employee (alphabetical): " + findMax(team));
    }
}`,
      output: `Max Employee (alphabetical): Charlie`,
      explanation: '`<T extends Comparable<? super T>>` permits subclasses (Employee) to be compared using compareTo implemented by their superclasses (Person).'
    },
    {
      id: 'col-20-3-ex9',
      title: 'Filtering Collections with Predicate<? super T>',
      problemStatement: 'Implement a filter method `filter(List<T> list, Predicate<? super T> pred)` that uses a super-bounded predicate to filter a subclass list.',
      hint: 'Predicate<? super T> allows a Predicate<Animal> to filter a List<Dog>.',
      solutionCode: `import java.util.*;
import java.util.function.Predicate;

public class Main {
    public static <T> List<T> filter(List<T> list, Predicate<? super T> predicate) {
        List<T> result = new ArrayList<>();
        for (T item : list) {
            if (predicate.test(item)) result.add(item);
        }
        return result;
    }

    public static void main(String[] args) {
        List<String> words = Arrays.asList("sky", "apple", "cat", "banana");
        // Predicate<CharSequence> checks length
        Predicate<CharSequence> isLong = cs -> cs.length() > 3;

        List<String> longWords = filter(words, isLong);
        System.out.println("Filtered words: " + longWords);
    }
}`,
      output: `Filtered words: [apple, banana]`,
      explanation: '`Predicate<? super T>` allows a predicate accepting a broader supertype (`CharSequence`) to filter a collection of subtypes (`String`).'
    },
    {
      id: 'col-20-3-ex10',
      title: 'Subtyping and Wildcard Hierarchy Demonstration',
      problemStatement: 'Demonstrate the assignment hierarchy of `List<Integer>`, `List<? extends Number>`, `List<? super Integer>`, and `List<?>`.',
      hint: 'List<?> is the supertype of all List instantiations.',
      solutionCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> exactList = new ArrayList<>(Arrays.asList(10, 20));

        // Subtyping rules:
        List<? extends Number> producer = exactList;   // Producer (extends)
        List<? super Integer> consumer = exactList;    // Consumer (super)
        List<?> unbounded = exactList;                 // Unbounded top type

        System.out.println("Read from producer:  " + producer.get(0));
        consumer.add(30);                              // Write to consumer
        System.out.println("Size from unbounded:  " + unbounded.size());
        System.out.println("Exact list contents:  " + exactList);
    }
}`,
      output: `Read from producer:  10
Size from unbounded:  3
Exact list contents:  [10, 20, 30]`,
      explanation: 'Wildcards provide flexibility: `List<? extends Number>` is covariant (read-only), `List<? super Integer>` is contravariant (write-enabled), and `List<?>` is bivariant.'
    }
  ],

  // ── LESSON 20.4: Generics Limitations & Heap Pollution ───────────────
  'generics-limitations-and-heap-pollution': [
    {
      id: 'col-20-4-ex1',
      title: 'Why Generic Array Creation is Forbidden (new T[])',
      problemStatement: 'Explain why `new T[10]` or `new List<String>[10]` is illegal in Java by showing the covariant array flaw that generics avoid.',
      hint: 'Arrays are covariant and reified; generics are invariant and erased. Mixing them causes ArrayStoreException.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        // Java arrays are covariant (String[] is an Object[])
        String[] strArr = new String[2];
        Object[] objArr = strArr;

        try {
            objArr[0] = 123; // Fails at runtime with ArrayStoreException!
        } catch (ArrayStoreException e) {
            System.out.println("Caught ArrayStoreException: " + e.getMessage());
        }

        System.out.println("If new List<String>[10] were allowed, type erasure would convert it to Object[],");
        System.out.println("allowing someone to insert List<Integer> and corrupting type safety silently!");
    }
}`,
      output: `Caught ArrayStoreException: java.lang.Integer
If new List<String>[10] were allowed, type erasure would convert it to Object[],
allowing someone to insert List<Integer> and corrupting type safety silently!`,
      explanation: 'Arrays reify type checks at runtime. Generics erase type parameters at compile time. Mixing them would create undetected type safety loopholes.'
    },
    {
      id: 'col-20-4-ex2',
      title: 'Safe Varargs Method with @SafeVarargs Annotation',
      problemStatement: 'Create a generic varargs method `safeList(T... elements)` and apply `@SafeVarargs` to suppress unchecked warnings safely.',
      hint: '@SafeVarargs can only be applied to final methods, static methods, or private methods.',
      solutionCode: `import java.util.*;

public class Main {
    @SafeVarargs
    public static <T> List<T> asSafeList(T... elements) {
        List<T> list = new ArrayList<>();
        for (T e : elements) {
            list.add(e);
        }
        return list;
    }

    public static void main(String[] args) {
        List<String> names = asSafeList("Alice", "Bob", "Charlie");
        System.out.println("Safe list: " + names);
    }
}`,
      output: `Safe list: [Alice, Bob, Charlie]`,
      explanation: '`@SafeVarargs` asserts that the method does not store into the varargs array or allow its reference to escape, suppressing heap pollution compiler warnings.'
    },
    {
      id: 'col-20-4-ex3',
      title: 'Instantiating Generic Types via Reflection Class Token',
      problemStatement: 'Demonstrate why `new T()` is a compile error, and implement the standard solution: passing `Class<T>` to construct instances via reflection.',
      hint: 'clazz.getDeclaredConstructor().newInstance().',
      solutionCode: `class Account {
    public Account() {}
    @Override public String toString() { return "Active Account #" + hashCode(); }
}

public class Main {
    // Cannot do: public static <T> T create() { return new T(); }
    public static <T> T createInstance(Class<T> clazz) throws Exception {
        return clazz.getDeclaredConstructor().newInstance();
    }

    public static void main(String[] args) throws Exception {
        Account acc = createInstance(Account.class);
        System.out.println("Created via Class<T> token: " + acc);
    }
}`,
      output: `Created via Class<T> token: Active Account #1205555397`,
      explanation: 'Because `T` is erased to `Object` at runtime, `new T()` cannot know which constructor or memory size to allocate. Explicit `Class<T>` tokens solve this.'
    },
    {
      id: 'col-20-4-ex4',
      title: 'Primitive Types Restriction and Autoboxing Overhead',
      problemStatement: 'Demonstrate why primitive types cannot be used in generics (`List<int>` is illegal) and benchmark memory overhead of `List<Integer>` vs primitive `int[]`.',
      hint: 'Generics erase to Object, and primitives do not inherit from Object.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Why List<int> is impossible in Java:");
        System.out.println("1. Generics erase to java.lang.Object in bytecode.");
        System.out.println("2. Primitive types (int, double) are raw bits and do not extend Object.");
        System.out.println("3. Boxed Integer requires 16-24 bytes per number, whereas primitive int requires 4 bytes.");
        System.out.println("Memory overhead of 1M Integers: ~20 MB vs ~4 MB for int[] (5x difference!)");
    }
}`,
      output: `Why List<int> is impossible in Java:
1. Generics erase to java.lang.Object in bytecode.
2. Primitive types (int, double) are raw bits and do not extend Object.
3. Boxed Integer requires 16-24 bytes per number, whereas primitive int requires 4 bytes.
Memory overhead of 1M Integers: ~20 MB vs ~4 MB for int[] (5x difference!)`,
      explanation: 'Type erasure requires all generic types to be representable as Object references, excluding primitives.'
    },
    {
      id: 'col-20-4-ex5',
      title: 'Static Context Restriction for Generic Type Parameters',
      problemStatement: 'Demonstrate why static fields and static methods of a generic class cannot reference the class type parameter `T`.',
      hint: 'Static members belong to the class, not instances, while T is per-instance.',
      solutionCode: `class Container<T> {
    private T instanceValue;
    // public static T staticItem; // COMPILATION ERROR: Cannot make a static reference to the non-static type T

    // Valid: Generic static method declares its OWN independent type parameter <U>
    public static <U> void printItem(U item) {
        System.out.println("Static generic method item: " + item);
    }
}

public class Main {
    public static void main(String[] args) {
        Container.printItem("Independent static type");
        Container.printItem(42);
    }
}`,
      output: `Static generic method item: Independent static type
Static generic method item: 42`,
      explanation: 'Because a generic class is loaded only once by the JVM and shared across all parameterized instantiations, static fields cannot depend on instance type parameter `T`.'
    },
    {
      id: 'col-20-4-ex6',
      title: 'Instanceof Restriction with Parameterized Types',
      problemStatement: 'Show that `instanceof List<String>` is illegal due to type erasure, and demonstrate the legal `instanceof List<?>` syntax.',
      hint: 'Compiler cannot verify generic type at runtime; only unbounded wildcard List<?> is legal with instanceof.',
      solutionCode: `import java.util.*;

public class Main {
    public static void checkList(Object obj) {
        // if (obj instanceof List<String>) // COMPILATION ERROR: Cannot perform instanceof check against parameterized type!
        if (obj instanceof List<?>) {
            List<?> list = (List<?>) obj;
            System.out.println("Valid list of size: " + list.size());
        }
    }

    public static void main(String[] args) {
        checkList(Arrays.asList("A", "B", "C"));
        checkList(Arrays.asList(1, 2));
    }
}`,
      output: `Valid list of size: 3
Valid list of size: 2`,
      explanation: 'Because type arguments are erased at compile time, the JVM runtime cannot determine whether a list contains Strings or Integers during an `instanceof` check.'
    },
    {
      id: 'col-20-4-ex7',
      title: 'Exception Class Cannot Be Generic',
      problemStatement: 'Demonstrate why a class cannot extend `Throwable` or `Exception` with generic type parameters, and show how to catch re-thrown generic exceptions.',
      hint: 'Generic exceptions would violate JVM catch block exception table dispatch.',
      solutionCode: `// class GenericException<T> extends Exception {} // COMPILATION ERROR: A generic class may not extend java.lang.Throwable

public class Main {
    // Legal: Method can declare throws T where T extends Throwable
    public static <T extends Throwable> void sneakyThrow(Throwable t) throws T {
        @SuppressWarnings("unchecked")
        T casted = (T) t;
        throw casted;
    }

    public static void main(String[] args) {
        try {
            sneakyThrow(new IllegalArgumentException("Custom error"));
        } catch (IllegalArgumentException e) {
            System.out.println("Caught sneaked exception: " + e.getMessage());
        }
    }
}`,
      output: `Caught sneaked exception: Custom error`,
      explanation: 'The JVM exception table dispatches exceptions by inspecting their exact runtime Class object. Because generics are erased, generic catch blocks would be impossible.'
    },
    {
      id: 'col-20-4-ex8',
      title: 'Heap Pollution in Varargs Array Passing',
      problemStatement: 'Demonstrate a classic heap pollution flaw where passing a generic varargs array to another method causes a ClassCastException at the call site.',
      hint: 'Mixing varargs arrays with generics creates an Object[] containing heterogeneous types.',
      solutionCode: `import java.util.*;

public class Main {
    public static Object[] toArray(Object... items) {
        return items;
    }

    public static void main(String[] args) {
        // Generates compiler warning: Possible heap pollution from parameterized vararg type
        Object[] arr = toArray("Hello", "World");
        System.out.println("Array length: " + arr.length);
        System.out.println("First element: " + arr[0]);
    }
}`,
      output: `Array length: 2
First element: Hello`,
      explanation: 'Varargs creates a hidden backing array `T[] elements`. Because `T` erases to `Object`, passing this array around risks storing mismatched types into it.'
    },
    {
      id: 'col-20-4-ex9',
      title: 'Reifiable vs Non-Reifiable Types Comparison',
      problemStatement: 'Print and classify Java types into Reifiable (types fully available at runtime) versus Non-Reifiable (types whose information is partially erased).',
      hint: 'Primitives, raw types, and List<?> are reifiable. List<String> is non-reifiable.',
      solutionCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Reifiable Types (Full runtime information):");
        System.out.println("- Primitive types: int, double, boolean");
        System.out.println("- Non-generic reference types: String, Thread");
        System.out.println("- Raw types: List, Map");
        System.out.println("- Unbounded wildcard types: List<?>, Map<?, ?>");
        System.out.println("- Arrays of reifiable types: int[], String[], List<?>[]");
        System.out.println("\\nNon-Reifiable Types (Erased at compile time):");
        System.out.println("- Parameterized types: List<String>, Map<String, Integer>");
        System.out.println("- Bounded wildcard types: List<? extends Number>");
        System.out.println("- Type variables: T, E, K, V");
    }
}`,
      output: `Reifiable Types (Full runtime information):
- Primitive types: int, double, boolean
- Non-generic reference types: String, Thread
- Raw types: List, Map
- Unbounded wildcard types: List<?>, Map<?, ?>
- Arrays of reifiable types: int[], String[], List<?>[]

Non-Reifiable Types (Erased at compile time):
- Parameterized types: List<String>, Map<String, Integer>
- Bounded wildcard types: List<? extends Number>
- Type variables: T, E, K, V`,
      explanation: 'Reifiable types retain full type descriptors at runtime; non-reifiable types lose their type parameters during compilation due to type erasure.'
    },
    {
      id: 'col-20-4-ex10',
      title: 'Safe Heterogeneous Container Pattern',
      problemStatement: 'Implement Joshua Bloch`s Typesafe Heterogeneous Container pattern using `Map<Class<?>, Object>` to store and retrieve multiple types safely.',
      hint: 'Use map.put(clazz, clazz.cast(value)) and clazz.cast(map.get(clazz)).',
      solutionCode: `import java.util.*;

class TypeSafeContainer {
    private final Map<Class<?>, Object> values = new HashMap<>();

    public <T> void put(Class<T> type, T instance) {
        if (type == null) throw new NullPointerException("Type cannot be null");
        values.put(type, type.cast(instance));
    }

    public <T> T get(Class<T> type) {
        return type.cast(values.get(type));
    }
}

public class Main {
    public static void main(String[] args) {
        TypeSafeContainer container = new TypeSafeContainer();
        container.put(String.class, "Configuration String");
        container.put(Integer.class, 8080);
        container.put(Double.class, 3.14159);

        String s = container.get(String.class);
        Integer port = container.get(Integer.class);
        Double pi = container.get(Double.class);

        System.out.println("Fetched String:  " + s);
        System.out.println("Fetched Integer: " + port);
        System.out.println("Fetched Double:  " + pi);
    }
}`,
      output: `Fetched String:  Configuration String
Fetched Integer: 8080
Fetched Double:  3.14159`,
      explanation: 'The Typesafe Heterogeneous Container parameterizes the key rather than the container, storing arbitrary types with 100% compile-time and runtime safety.'
    }
  ]
};
