import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 7: METHODS IN JAVA CAPSTONE EXERCISES (LESSON 7.4)
// Exactly 10 dedicated coding assignments
// ============================================================
export const methodsChallenge_exercises: Record<string, ProgrammingExercise[]> = {
  "methods-challenge": [
    {
      "id": "metc-1",
      "title": "Exercise 1: Pass-by-Value Reference Reassignment Verification",
      "difficulty": "Easy",
      "problemStatement": "Write a class `Person { String name; Person(String n) { name = n; } }`. Implement a method `public static void attemptReassign(Person p)` that assigns `p = new Person(\"New Name\");`. In `main`, instantiate a Person with \"Original\", call `attemptReassign`, and print `person.name` to prove pass-by-value.",
      "hint": "Reassigning the parameter modifies only the local stack copy of the pointer.",
      "solutionCode": "public class Solution {\n    static class Person {\n        String name;\n        Person(String name) { this.name = name;\n        }\n    }\n    public static void attemptReassign(Person p) {\n        p = new Person(\"New Name\");\n    }\n    public static void main(String[] args) {\n        Person person = new Person(\"Original\");\n        attemptReassign(person);\n        System.out.println(person.name);\n    }\n}",
      "output": "Original",
      "explanation": "Because Java is strictly pass-by-value, attemptReassign overwrites only its local parameter reference; caller's person object is unchanged."
    },
    {
      "id": "metc-2",
      "title": "Exercise 2: Heap State Mutation Through Reference Parameter",
      "difficulty": "Easy",
      "problemStatement": "Using the same `Person` class, implement `public static void mutateState(Person p, String newName)` that executes `p.name = newName;`. In `main`, call `mutateState(person, \"Updated Name\");` and print `person.name`.",
      "hint": "Dereferencing the pointer parameter mutates the shared heap object.",
      "solutionCode": "public class Solution {\n    static class Person {\n        String name;\n        Person(String name) { this.name = name;\n        }\n    }\n    public static void mutateState(Person p, String newName) {\n        p.name = newName;\n    }\n    public static void main(String[] args) {\n        Person person = new Person(\"Original\");\n        mutateState(person, \"Updated Name\");\n        System.out.println(person.name);\n    }\n}",
      "output": "Updated Name",
      "explanation": "Dereferencing p modifies the shared heap instance, altering state visible to the caller."
    },
    {
      "id": "metc-3",
      "title": "Exercise 3: Overload Resolution Widening vs Boxing Proof",
      "difficulty": "Medium",
      "problemStatement": "Create overloaded methods `public static String test(long x)` (returns \"WIDENING\") and `public static String test(Integer x)` (returns \"BOXING\"). Call `test(10)` with an `int` literal and print the returned result.",
      "hint": "Phase 1 widening takes precedence over Phase 2 autoboxing.",
      "solutionCode": "public class Solution {\n    public static String test(long x) { return \"WIDENING\"; }\n    public static String test(Integer x) { return \"BOXING\"; }\n    public static void main(String[] args) {\n        int val = 10;\n        System.out.println(test(val));\n    }\n}",
      "output": "WIDENING",
      "explanation": "Per JLS §15.12.2, Phase 1 evaluates widening without boxing, selecting test(long) before Phase 2 is considered."
    },
    {
      "id": "metc-4",
      "title": "Exercise 4: Varargs Summation Utility Method",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static int sumAll(int multiplier, int... values)` that multiplies each value by `multiplier` and returns the total sum. Test with `sumAll(2, 10, 20, 30)` and `sumAll(5)` (zero values).",
      "hint": "Varargs parameter values behaves as an int[] array inside the method.",
      "solutionCode": "public class Solution {\n    public static int sumAll(int multiplier, int... values) {\n        int total = 0;\n        for (int v : values) {\n            total += v * multiplier;\n        }\n        return total;\n    }\n    public static void main(String[] args) {\n        System.out.println(sumAll(2, 10, 20, 30));\n        System.out.println(sumAll(5));\n    }\n}",
      "output": "120\n0",
      "explanation": "Varargs accepts comma-separated values or empty lists, compiling to array traversal internally."
    },
    {
      "id": "metc-5",
      "title": "Exercise 5: Early Return Guard Clause Pattern",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static String processTransaction(int amount, boolean accountActive)` using early return guard clauses: if !accountActive return \"INACTIVE\"; if amount <= 0 return \"INVALID_AMOUNT\"; if amount > 1000 return \"LIMIT_EXCEEDED\"; else return \"SUCCESS\". Test with (500, true) and (50, false).",
      "hint": "Validate edge cases up front and return immediately.",
      "solutionCode": "public class Solution {\n    public static String processTransaction(int amount, boolean accountActive) {\n        if (!accountActive) return \"INACTIVE\";\n        if (amount <= 0) return \"INVALID_AMOUNT\";\n        if (amount > 1000) return \"LIMIT_EXCEEDED\";\n        return \"SUCCESS\";\n    }\n    public static void main(String[] args) {\n        System.out.println(processTransaction(500, true));\n        System.out.println(processTransaction(50, false));\n    }\n}",
      "output": "SUCCESS\nINACTIVE",
      "explanation": "Guard clauses discharge error conditions early, keeping the happy path linear."
    },
    {
      "id": "metc-6",
      "title": "Exercise 6: Overloaded Fixed-Arity vs Varargs Dispatch",
      "difficulty": "Medium",
      "problemStatement": "Demonstrate that fixed-arity beats varargs. Create `public static String log(String msg)` returning \"SINGLE\" and `public static String log(String... msgs)` returning \"VARARGS\". Call `log(\"Hello\")` and `log(\"A\", \"B\")` and print results.",
      "hint": "Single-argument matches Phase 1 fixed-arity; multiple arguments match Phase 3 varargs.",
      "solutionCode": "public class Solution {\n    public static String log(String msg) { return \"SINGLE\"; }\n    public static String log(String... msgs) { return \"VARARGS\"; }\n    public static void main(String[] args) {\n        System.out.println(log(\"Hello\"));\n        System.out.println(log(\"A\", \"B\"));\n    }\n}",
      "output": "SINGLE\nVARARGS",
      "explanation": "Fixed-arity method log(String) is selected in Phase 1, avoiding heap array allocation when 1 argument is passed."
    },
    {
      "id": "metc-7",
      "title": "Exercise 7: Array Swap Method In-Place",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static void swap(int[] arr, int i, int j)` that swaps elements at indices i and j in array `arr`. Demonstrate with [10, 20, 30] swapping index 0 and 2. Print the array.",
      "hint": "Mutating array indices directly modifies heap array memory.",
      "solutionCode": "public class Solution {\n    public static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30};\n        swap(arr, 0, 2);\n        System.out.println(arr[0] + \" \" + arr[1] + \" \" + arr[2]);\n    }\n}",
      "output": "30 20 10",
      "explanation": "Because array reference is passed by value, swapping indices inside the method mutates the shared heap array."
    },
    {
      "id": "metc-8",
      "title": "Exercise 8: Covariant Return Type Overriding",
      "difficulty": "Medium",
      "problemStatement": "Declare base class `VehicleProducer { Vehicle produce() { return new Vehicle(\"Generic\"); } }` and subclass `CarProducer extends VehicleProducer { @Override Car produce() { return new Car(\"Sedan\"); } }`. Demonstrate calling `produce()` via `VehicleProducer v = new CarProducer();` and print the vehicle model.",
      "hint": "Car is a subtype of Vehicle. Runtime dispatch executes CarProducer.produce().",
      "solutionCode": "public class Solution {\n    static class Vehicle {\n        String model;\n        Vehicle(String m) { model = m; }\n    }\n    static class Car extends Vehicle {\n        Car(String m) { super(m); }\n    }\n    static class VehicleProducer {\n        Vehicle produce() { return new Vehicle(\"Generic\"); }\n    }\n    static class CarProducer extends VehicleProducer {\n        @Override\n        Car produce() { return new Car(\"Sedan\"); }\n    }\n    public static void main(String[] args) {\n        VehicleProducer producer = new CarProducer();\n        System.out.println(producer.produce().model);\n    }\n}",
      "output": "Sedan",
      "explanation": "Covariant return allows CarProducer to return Car; runtime virtual dispatch calls CarProducer.produce()."
    },
    {
      "id": "metc-9",
      "title": "Exercise 9: Static Method Hiding Verification",
      "difficulty": "Medium",
      "problemStatement": "Create class `Base { static String info() { return \"BASE\"; } }` and class `Derived extends Base { static String info() { return \"DERIVED\"; } }`. In `main`, assign `Base b = new Derived();`. Print `b.info()` and `Derived.info()` to demonstrate static hiding.",
      "hint": "Static methods are bound at compile time based on reference type.",
      "solutionCode": "public class Solution {\n    static class Base {\n        static String info() { return \"BASE\"; }\n    }\n    static class Derived extends Base {\n        static String info() { return \"DERIVED\"; }\n    }\n    public static void main(String[] args) {\n        Base b = new Derived();\n        System.out.println(b.info());\n        System.out.println(Derived.info());\n    }\n}",
      "output": "BASE\nDERIVED",
      "explanation": "Static method invocations use compile-time static binding; b.info() compiles to Base.info()."
    },
    {
      "id": "metc-10",
      "title": "Exercise 10: Pure Recursive Function with Base Case Guard",
      "difficulty": "Easy",
      "problemStatement": "Implement a pure static method `public static int factorial(int n)` using recursion with a guard clause for `n <= 1` returning 1. Test with n = 5 and n = 0.",
      "hint": "Base case: if (n <= 1) return 1; Recursive step: return n * factorial(n - 1);.",
      "solutionCode": "public class Solution {\n    public static int factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(5));\n        System.out.println(factorial(0));\n    }\n}",
      "output": "120\n1",
      "explanation": "Base case guard terminates stack frame accumulation, computing 5! = 120 cleanly."
    }
  ]
};
