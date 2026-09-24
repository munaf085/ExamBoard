import { WrittenQuestion } from '../../types';

export const topicCsharpOopQuestions: WrittenQuestion[] = [
  // --- Classes & Objects (6 questions) ---
  {
    id: 'TOOP-001',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is true about classes and objects in C#?',
    options: [
      'A class is a reference type, and an object is an instance of a class.',
      'A class is a value type, and an object is a blueprint.',
      'Classes cannot contain fields, only methods.',
      'Objects can only be created using the static keyword.'
    ],
    correctAnswer: 0,
    explanation: 'In C#, a class is a reference type that acts as a blueprint. An object is a specific instance of that class, created dynamically in memory.',
    tags: ['Classes', 'Objects', 'Basics']
  },
  {
    id: 'TOOP-002',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `class Person {
    public Person() { Console.Write("1"); }
    public Person(string name) { Console.Write("2"); }
    public Person(string name, int age) : this(name) { Console.Write("3"); }
}
class Program {
    static void Main() {
        var p = new Person("John", 30);
    }
}`,
    options: [
      '123',
      '23',
      '32',
      '3'
    ],
    correctAnswer: 1,
    explanation: 'The parameterized constructor with two arguments calls the one-argument constructor using `this(name)`. The target of `this(...)` runs first, printing "2", then the body of the calling constructor runs, printing "3".',
    tags: ['Constructors', 'this', 'Code-Output']
  },
  {
    id: 'TOOP-003',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following C# code snippet involving static members?',
    code: `class Counter {
    public static int Count = 0;
    public Counter() { Count++; }
}
class Program {
    static void Main() {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Console.Write(Counter.Count);
    }
}`,
    options: [
      '0',
      '1',
      '2',
      'Compilation error'
    ],
    correctAnswer: 2,
    explanation: 'Static members belong to the class rather than to any specific instance. The static `Count` variable is shared. It is incremented twice by the two constructor calls, resulting in 2.',
    tags: ['Static', 'Classes', 'Code-Output']
  },
  {
    id: 'TOOP-004',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the syntax for creating an object using an object initializer?',
    options: [
      'Person p = new Person(Name = "John", Age = 30);',
      'Person p = new Person { Name = "John", Age = 30 };',
      'Person p = Person.Initialize("John", 30);',
      'Person p = { Name = "John", Age = 30 };'
    ],
    correctAnswer: 1,
    explanation: 'Object initializer syntax in C# uses curly braces to assign values to accessible properties or fields right after instantiation: `new Person { Name = "John", Age = 30 }`.',
    tags: ['Object Initializer', 'Syntax']
  },
  {
    id: 'TOOP-005',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'Which of the following statements about partial classes is FALSE?',
    options: [
      'All parts of a partial class must use the partial keyword.',
      'Different parts of a partial class can inherit from different base classes.',
      'All parts of a partial class must be available at compile time.',
      'Partial classes allow splitting a single class definition across multiple files.'
    ],
    correctAnswer: 1,
    explanation: 'Different parts of a partial class must inherit from the same base class. If they specify base classes, they must be identical. They cannot inherit from different classes (C# does not support multiple inheritance of classes).',
    tags: ['Partial Classes', 'Architecture']
  },
  {
    id: 'TOOP-006',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code involving constructor chaining?',
    code: `class Test {
    public Test() : this(10) { Console.Write("A"); }
    public Test(int n) : this(n, "Hello") { Console.Write("B"); }
    public Test(int n, string s) { Console.Write("C"); }
}
class Program {
    static void Main() {
        Test t = new Test();
    }
}`,
    options: [
      'ABC',
      'CBA',
      'ACB',
      'BCA'
    ],
    correctAnswer: 1,
    explanation: 'The parameterless constructor calls the int constructor, which calls the int-string constructor. Therefore, the innermost target (int, string) runs first ("C"), then the int constructor ("B"), and finally the parameterless one ("A").',
    tags: ['Constructors', 'Code-Output']
  },

  // --- Encapsulation & Access Modifiers (6 questions) ---
  {
    id: 'TOOP-007',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What does the "protected internal" access modifier mean in C#?',
    options: [
      'Accessible only within the same class and its subclasses in the same assembly.',
      'Accessible anywhere in the same assembly OR from derived classes in any assembly.',
      'Accessible only from derived classes within the same assembly.',
      'Accessible everywhere, like public.'
    ],
    correctAnswer: 1,
    explanation: '`protected internal` means the member is accessible from any type within its containing assembly (internal), OR from a derived class in any assembly (protected). It is the union of protected and internal access.',
    tags: ['Access Modifiers', 'Encapsulation']
  },
  {
    id: 'TOOP-008',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What happens when this code is executed?',
    code: `class Employee {
    public string Name { get; private set; }
    public Employee(string name) { Name = name; }
}
class Program {
    static void Main() {
        var emp = new Employee("Alice");
        emp.Name = "Bob";
        Console.WriteLine(emp.Name);
    }
}`,
    options: [
      'Bob',
      'Alice',
      'Compilation error',
      'Runtime exception'
    ],
    correctAnswer: 2,
    explanation: 'The property `Name` has a `private set`, meaning it can only be assigned a value within the `Employee` class. Attempting to set it from `Program` results in a compilation error.',
    tags: ['Properties', 'Encapsulation', 'Code-Output']
  },
  {
    id: 'TOOP-009',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is an expression-bodied property?',
    options: [
      'public string FullName { get { return First + " " + Last; } }',
      'public string FullName => First + " " + Last;',
      'public string FullName { get; set; } = "John Doe";',
      'public string FullName() => First + " " + Last;'
    ],
    correctAnswer: 1,
    explanation: '`public string FullName => First + " " + Last;` is an expression-bodied read-only property introduced in C# 6.',
    tags: ['Properties', 'C# Features']
  },
  {
    id: 'TOOP-010',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is a key difference between a readonly field and a getter-only auto-property?',
    options: [
      'Readonly fields can only be initialized at the declaration, while getter-only properties can be initialized anywhere.',
      'Getter-only auto-properties are implicitly backed by a readonly field, but can only be initialized from constructors or inline initializers.',
      'Getter-only auto-properties can be reassigned via reflection without restrictions, but readonly fields cannot.',
      'There is no difference; they compile to the exact same IL.'
    ],
    correctAnswer: 1,
    explanation: 'Getter-only auto-properties (e.g., `public int Id { get; }`) are implemented via a compiler-generated readonly backing field, and they can only be assigned a value in the constructor or via inline initialization.',
    tags: ['Properties', 'Readonly', 'Encapsulation']
  },
  {
    id: 'TOOP-011',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'scenario',
    question: 'You are designing a BankAccount class. The balance must never drop below 0. How should you best enforce this using encapsulation?',
    options: [
      'Make Balance a public field and rely on UI validation.',
      'Make Balance a public property with no setter and calculate it dynamically from a public transaction list.',
      'Make Balance a private field with a public getter, and update it only through public Deposit and Withdraw methods that validate the input.',
      'Make Balance a public property with a private getter and a public setter.'
    ],
    correctAnswer: 2,
    explanation: 'Encapsulation involves hiding the internal state and requiring all interaction to occur through a well-defined interface. Private field with public methods (Deposit/Withdraw) that enforce business rules prevents invalid states.',
    tags: ['Encapsulation', 'Design', 'Scenario']
  },
  {
    id: 'TOOP-012',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What will the compiler do with this code snippet?',
    code: `class Item {
    readonly int _id = 10;
    public Item(int id) {
        _id = id;
    }
    public void UpdateId(int newId) {
        _id = newId;
    }
}`,
    options: [
      'Compile successfully.',
      'Compile error because _id is assigned twice.',
      'Compile error in UpdateId method because _id is readonly.',
      'Compile error in constructor because _id is already initialized.'
    ],
    correctAnswer: 2,
    explanation: 'A `readonly` field can be initialized at declaration and modified in a constructor. However, it cannot be modified in a standard method like `UpdateId`.',
    tags: ['Readonly', 'Code-Output']
  },

  // --- Inheritance (8 questions) ---
  {
    id: 'TOOP-013',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What does the "base" keyword do in C#?',
    options: [
      'It creates an instance of the base class.',
      'It is used to access members of the base class from within a derived class.',
      'It is used to restrict inheritance.',
      'It allows a class to inherit from multiple base classes.'
    ],
    correctAnswer: 1,
    explanation: 'The `base` keyword is used to access members of the base class (like calling a base constructor or base method) from within a derived class.',
    tags: ['Inheritance', 'base keyword']
  },
  {
    id: 'TOOP-014',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output of the following code?',
    code: `class A {
    public virtual void Show() { Console.Write("A"); }
}
class B : A {
    public override void Show() { Console.Write("B"); }
}
class Program {
    static void Main() {
        A obj = new B();
        obj.Show();
    }
}`,
    options: [
      'A',
      'B',
      'Compilation error',
      'AB'
    ],
    correctAnswer: 1,
    explanation: 'Since `Show` is virtual in `A` and overridden in `B`, calling it on an `A` reference pointing to a `B` object will result in polymorphic dispatch, invoking `B`\'s `Show()` method and printing "B".',
    tags: ['Polymorphism', 'Override', 'Virtual', 'Code-Output']
  },
  {
    id: 'TOOP-015',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What is the output when using the "new" keyword for method hiding?',
    code: `class BaseClass {
    public void Display() { Console.Write("Base"); }
}
class DerivedClass : BaseClass {
    public new void Display() { Console.Write("Derived"); }
}
class Program {
    static void Main() {
        BaseClass b = new DerivedClass();
        b.Display();
    }
}`,
    options: [
      'Base',
      'Derived',
      'Compilation error',
      'BaseDerived'
    ],
    correctAnswer: 0,
    explanation: 'Method hiding (with `new`) does not use polymorphic dispatch. Since `b` is statically typed as `BaseClass`, and `Display` is not virtual/overridden, the `BaseClass.Display()` method is called.',
    tags: ['Method Hiding', 'new keyword', 'Code-Output']
  },
  {
    id: 'TOOP-016',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is true about a "sealed" class?',
    options: [
      'It cannot be instantiated.',
      'It can only inherit from one specific class.',
      'It cannot be inherited by other classes.',
      'It hides all methods of its base class.'
    ],
    correctAnswer: 2,
    explanation: 'A `sealed` class cannot be used as a base class. It prevents other classes from inheriting from it.',
    tags: ['Sealed', 'Inheritance']
  },
  {
    id: 'TOOP-017',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'multiple-choice',
    question: 'Which of the following methods are inherited by EVERY class in C# from the System.Object root? (Select all that apply)',
    options: [
      'ToString()',
      'Clone()',
      'GetHashCode()',
      'Dispose()'
    ],
    correctAnswer: [0, 2],
    explanation: '`System.Object` provides `ToString()`, `GetHashCode()`, `Equals()`, and `GetType()`. `Clone()` belongs to `ICloneable`, and `Dispose()` belongs to `IDisposable`.',
    tags: ['System.Object', 'Inheritance']
  },
  {
    id: 'TOOP-018',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What happens when calling base.Method() from an overridden method?',
    code: `class Parent {
    public virtual void Greet() { Console.Write("Hello "); }
}
class Child : Parent {
    public override void Greet() {
        base.Greet();
        Console.Write("World");
    }
}
class Program {
    static void Main() {
        Child c = new Child();
        c.Greet();
    }
}`,
    options: [
      'World',
      'Hello',
      'Hello World',
      'World Hello'
    ],
    correctAnswer: 2,
    explanation: 'Calling `base.Greet()` inside the overridden method executes the base class logic ("Hello "), followed by the derived class logic ("World"), resulting in "Hello World".',
    tags: ['Inheritance', 'base', 'Code-Output']
  },
  {
    id: 'TOOP-019',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'Trace the constructor order in this inheritance chain:',
    code: `class A {
    public A() { Console.Write("A"); }
}
class B : A {
    public B() { Console.Write("B"); }
}
class C : B {
    public C() { Console.Write("C"); }
}
class Program {
    static void Main() {
        C obj = new C();
    }
}`,
    options: [
      'CBA',
      'ABC',
      'BCA',
      'CAB'
    ],
    correctAnswer: 1,
    explanation: 'When creating a derived class, constructors are called from the top of the hierarchy down to the most derived class. So A, then B, then C.',
    tags: ['Constructors', 'Inheritance', 'Code-Output']
  },
  {
    id: 'TOOP-020',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'A protected member of a base class is accessible in a derived class...',
    options: [
      'Only if the derived class is in the same namespace.',
      'Only if the derived class is in the same assembly.',
      'Always, regardless of the assembly or namespace.',
      'Only if the derived class explicitly casts to the base class.'
    ],
    correctAnswer: 2,
    explanation: '`protected` members are accessible to any derived class, regardless of which namespace or assembly the derived class resides in.',
    tags: ['Access Modifiers', 'Inheritance']
  },

  // --- Polymorphism (6 questions) ---
  {
    id: 'TOOP-021',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following describes compile-time polymorphism in C#?',
    options: [
      'Method overriding',
      'Method overloading',
      'Virtual method dispatch',
      'Interface implementation'
    ],
    correctAnswer: 1,
    explanation: 'Method overloading allows multiple methods in the same scope to have the same name but different signatures, and the compiler determines which method to call at compile-time based on arguments.',
    tags: ['Polymorphism', 'Overloading']
  },
  {
    id: 'TOOP-022',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'To achieve runtime polymorphism through method overriding, which keywords are strictly required on the base and derived methods?',
    options: [
      'Base: virtual or abstract; Derived: override',
      'Base: virtual; Derived: new',
      'Base: abstract; Derived: virtual',
      'Base: none; Derived: override'
    ],
    correctAnswer: 0,
    explanation: 'The base method must be marked as `virtual` or `abstract`, and the derived method must be marked with `override` to participate in polymorphic virtual dispatch.',
    tags: ['Polymorphism', 'Override']
  },
  {
    id: 'TOOP-023',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output of this complex polymorphism chain?',
    code: `class X {
    public virtual void Do() { Console.Write("X"); }
}
class Y : X {
    public override void Do() { Console.Write("Y"); }
}
class Z : Y {
    public new virtual void Do() { Console.Write("Z"); }
}
class Program {
    static void Main() {
        X obj = new Z();
        obj.Do();
    }
}`,
    options: [
      'X',
      'Y',
      'Z',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: '`obj` is of type `X`, but points to a `Z` object. The method `Do` in `Z` is marked `new`, severing the polymorphic chain from `X/Y`. The most derived override in the `X` chain is `Y`\'s `Do()`. Therefore, `Y` is printed.',
    tags: ['Polymorphism', 'Hiding', 'Code-Output']
  },
  {
    id: 'TOOP-024',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'What happens during this upcasting and downcasting sequence?',
    code: `class Base { }
class Derived : Base { public void Speak() { Console.Write("Hi"); } }
class Program {
    static void Main() {
        Base b = new Derived(); // Upcast
        Derived d = (Derived)b; // Downcast
        d.Speak();
    }
}`,
    options: [
      'Hi',
      'Compilation error at downcast',
      'InvalidCastException at runtime',
      'No output'
    ],
    correctAnswer: 0,
    explanation: 'The upcast is implicit and safe. The underlying object is actually a `Derived` instance. Thus, explicitly downcasting it back to `Derived` succeeds at runtime, and `d.Speak()` prints "Hi".',
    tags: ['Casting', 'Polymorphism', 'Code-Output']
  },
  {
    id: 'TOOP-025',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'Observe the method overloading resolution:',
    code: `class Printer {
    public void Print(object o) { Console.Write("Object "); }
    public void Print(string s) { Console.Write("String "); }
}
class Program {
    static void Main() {
        Printer p = new Printer();
        object str = "Hello";
        p.Print(str);
        p.Print("World");
    }
}`,
    options: [
      'String String',
      'Object String',
      'Object Object',
      'String Object'
    ],
    correctAnswer: 1,
    explanation: 'Overload resolution happens at compile-time based on the static type of the variable. `str` is typed as `object`, so `Print(object)` is called. `"World"` is a string literal, so `Print(string)` is called.',
    tags: ['Overloading', 'Polymorphism', 'Code-Output']
  },
  {
    id: 'TOOP-026',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'scenario',
    question: 'Why is polymorphism useful when dealing with a collection of shapes (Circle, Square, Triangle)?',
    options: [
      'It allows writing a single method like Draw() on a base Shape class, and iterating through a List<Shape> to call Draw(), with each shape drawing itself correctly.',
      'It prevents shapes from being instantiated.',
      'It enforces that all shapes must have the exact same fields and memory footprint.',
      'It automatically converts all shapes into a generic Object type to save memory.'
    ],
    correctAnswer: 0,
    explanation: 'Polymorphism allows a generic base class reference (Shape) to invoke overridden methods on derived types at runtime, enabling code that can operate on varied objects uniformly.',
    tags: ['Polymorphism', 'Scenario', 'Design']
  },

  // --- Abstract Classes & Interfaces (8 questions) ---
  {
    id: 'TOOP-027',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Which of the following is TRUE about an abstract class?',
    options: [
      'It can be instantiated using the new keyword.',
      'It can contain both abstract methods and fully implemented methods.',
      'It must not contain any fields or state.',
      'All methods inside an abstract class must be abstract.'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes cannot be instantiated, but they can contain implemented methods, fields, and constructors, in addition to abstract methods that must be overridden by derived classes.',
    tags: ['Abstract Class']
  },
  {
    id: 'TOOP-028',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'Prior to C# 8.0, what characterized an interface?',
    options: [
      'It could contain method implementations.',
      'It could only contain declarations of methods, properties, events, and indexers, all inherently public and abstract.',
      'It could have protected and private fields.',
      'It could define constructors.'
    ],
    correctAnswer: 1,
    explanation: 'Before C# 8, interfaces could only contain definitions (signatures) without implementation, and all members were implicitly public and abstract. They could not contain fields or constructors.',
    tags: ['Interfaces']
  },
  {
    id: 'TOOP-029',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'scenario',
    question: 'When should you choose an abstract class over an interface?',
    options: [
      'When you need to support multiple inheritance of functionality.',
      'When you want to define a contract for completely unrelated classes.',
      'When you have shared state (fields) or shared default implementation for related derived classes.',
      'When you need to define events.'
    ],
    correctAnswer: 2,
    explanation: 'Abstract classes are best used when related objects share core functionality or state. Interfaces are better for defining a capability across disparate, unrelated types, or supporting multiple inheritance.',
    tags: ['Design', 'Abstract vs Interface']
  },
  {
    id: 'TOOP-030',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'code-output',
    question: 'Can a C# class implement multiple interfaces?',
    code: `interface IWorker { void Work(); }
interface ISleeper { void Sleep(); }
class Employee : IWorker, ISleeper {
    public void Work() { Console.Write("W"); }
    public void Sleep() { Console.Write("S"); }
}
class Program {
    static void Main() {
        Employee e = new Employee();
        e.Work();
        e.Sleep();
    }
}`,
    options: [
      'Yes, output is WS',
      'Yes, output is SW',
      'No, compilation error because multiple inheritance is not allowed.',
      'No, compilation error because interfaces cannot have methods.'
    ],
    correctAnswer: 0,
    explanation: 'While C# restricts a class to inheriting from only one base class, it allows implementing multiple interfaces.',
    tags: ['Interfaces', 'Code-Output']
  },
  {
    id: 'TOOP-031',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output of this explicit interface implementation?',
    code: `interface IPrintable { void Print(); }
class Document : IPrintable {
    void IPrintable.Print() { Console.Write("Doc"); }
}
class Program {
    static void Main() {
        Document d = new Document();
        d.Print();
    }
}`,
    options: [
      'Doc',
      'Compilation error',
      'Runtime exception',
      'No output'
    ],
    correctAnswer: 1,
    explanation: 'Because `Print` is implemented explicitly (`void IPrintable.Print()`), it is not accessible through the class reference `d`. It can only be called if `d` is cast to the interface: `((IPrintable)d).Print()`. This causes a compile error.',
    tags: ['Interfaces', 'Explicit Implementation', 'Code-Output']
  },
  {
    id: 'TOOP-032',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'In C# 8.0 and later, what new feature was added to interfaces?',
    options: [
      'The ability to define instance fields.',
      'The ability to define constructors.',
      'The ability to provide default method implementations.',
      'The ability to inherit from a class.'
    ],
    correctAnswer: 2,
    explanation: 'C# 8.0 introduced Default Interface Methods (DIMs), allowing interfaces to provide default implementations for methods, helping evolve interfaces without breaking existing implementations.',
    tags: ['Interfaces', 'C# 8']
  },
  {
    id: 'TOOP-033',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the main difference between an abstract method and a virtual method?',
    options: [
      'Abstract methods must have a body; virtual methods cannot have a body.',
      'Abstract methods must be overridden in derived non-abstract classes; virtual methods have an implementation and overriding is optional.',
      'Abstract methods can be static; virtual methods cannot.',
      'There is no difference; they are synonyms.'
    ],
    correctAnswer: 1,
    explanation: 'Abstract methods have no implementation and force derived classes to provide one. Virtual methods have a base implementation that derived classes can optionally override.',
    tags: ['Abstract vs Virtual']
  },
  {
    id: 'TOOP-034',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What happens when this code runs?',
    code: `abstract class Base {
    public Base() { Console.Write("Base"); }
    public abstract void DoWork();
}
class Derived : Base {
    public override void DoWork() { Console.Write("Work"); }
}
class Program {
    static void Main() {
        Base b = new Derived();
        b.DoWork();
    }
}`,
    options: [
      'Work',
      'BaseWork',
      'Compilation error',
      'Base'
    ],
    correctAnswer: 1,
    explanation: 'Even though `Base` is abstract, its constructor is called when the `Derived` object is instantiated. It prints "Base", then `b.DoWork()` prints "Work", resulting in "BaseWork".',
    tags: ['Abstract Class', 'Constructors', 'Code-Output']
  },

  // --- Special Concepts (6 questions) ---
  {
    id: 'TOOP-035',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'multiple-choice',
    question: 'Which of the following are valid uses of the "this" keyword in C#? (Select all that apply)',
    options: [
      'To qualify members hidden by similar names (e.g., this.name = name).',
      'To pass the current instance as a parameter to other methods.',
      'To call a base class constructor.',
      'To chain constructors in the same class (e.g., : this(...)).'
    ],
    correctAnswer: [0, 1, 3],
    explanation: '`this` refers to the current instance. It resolves shadowing, can be passed around, and is used for constructor chaining. `base` is used to call a base class constructor, not `this`.',
    tags: ['this keyword', 'Special Concepts']
  },
  {
    id: 'TOOP-036',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'When is a static constructor in C# invoked?',
    options: [
      'Every time a new instance of the class is created.',
      'Explicitly by calling ClassName.StaticConstructor().',
      'Automatically, exactly once, before the first instance is created or any static members are referenced.',
      'When the application domain unloads.'
    ],
    correctAnswer: 2,
    explanation: 'A static constructor is used to initialize any static data, or to perform a particular action that needs to be performed once only. It is called automatically before the first instance is created or any static members are referenced.',
    tags: ['Static', 'Constructors']
  },
  {
    id: 'TOOP-037',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Hard',
    type: 'code-output',
    question: 'What is the output of the following comparison code?',
    code: `string s1 = "hello";
string s2 = new string(new char[] { 'h', 'e', 'l', 'l', 'o' });
Console.Write(s1.Equals(s2) + " ");
Console.Write(object.ReferenceEquals(s1, s2));`,
    options: [
      'True True',
      'False False',
      'True False',
      'False True'
    ],
    correctAnswer: 2,
    explanation: '`Equals()` for strings checks if the content is the same (True). `ReferenceEquals()` checks if they are the exact same object in memory. Because `s2` is created via `new`, it does not point to the interned string literal `s1`, so it is False.',
    tags: ['Object.Equals', 'ReferenceEquals', 'Code-Output']
  },
  {
    id: 'TOOP-038',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'How do you overload the addition (+) operator in C# for a custom Vector class?',
    options: [
      'public Vector Add(Vector v1, Vector v2)',
      'public static Vector operator +(Vector a, Vector b)',
      'public Vector override +(Vector a)',
      'operator + (Vector a, Vector b)'
    ],
    correctAnswer: 1,
    explanation: 'Operator overloads in C# must be defined as `public static` methods, using the `operator` keyword followed by the symbol.',
    tags: ['Operator Overloading']
  },
  {
    id: 'TOOP-039',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Medium',
    type: 'single-choice',
    question: 'What is the primary difference between IComparable and IComparer?',
    options: [
      'IComparable is used to provide a default sort order on the class itself; IComparer is used to define custom sorting logic outside the class.',
      'IComparable can only sort primitives; IComparer sorts objects.',
      'IComparer is obsolete; IComparable is the modern standard.',
      'There is no difference; they are interchangeable.'
    ],
    correctAnswer: 0,
    explanation: '`IComparable` (defining `CompareTo`) is typically implemented by the object being sorted to provide its default comparison logic. `IComparer` (defining `Compare`) is implemented by a separate class to provide custom comparison logic.',
    tags: ['IComparable', 'Sorting']
  },
  {
    id: 'TOOP-040',
    paperId: 'topic-csharp-oop',
    category: 'OOP',
    difficulty: 'Easy',
    type: 'single-choice',
    question: 'What is the purpose of namespaces in C#?',
    options: [
      'To manage application memory.',
      'To group related classes together and avoid naming collisions.',
      'To provide security access modifiers to code blocks.',
      'To improve the runtime performance of classes.'
    ],
    correctAnswer: 1,
    explanation: 'Namespaces are used heavily in C# programming to organize code logically and to prevent naming conflicts (e.g. having two classes with the same name in different libraries).',
    tags: ['Namespaces', 'Architecture']
  }
];
