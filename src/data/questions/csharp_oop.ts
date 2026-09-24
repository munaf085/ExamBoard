import { WrittenQuestion } from '../../types';

export const csharpOopQuestions: WrittenQuestion[] = [
  {
    id: "CS-OOP-001",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which of the following is a value type in C#?",
    options: ["string", "class", "interface", "struct"],
    correctAnswer: 3,
    explanation: "Structs are value types in C#, while string, class, and interface are reference types.",
    tags: ["Value Types", "C# Basics"]
  },
  {
    id: "CS-OOP-002",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is the primary difference between an abstract class and an interface?",
    options: [
      "Abstract classes can be instantiated, interfaces cannot.",
      "A class can implement multiple interfaces, but can only inherit from one abstract class.",
      "Interfaces can contain fields, abstract classes cannot.",
      "Abstract classes cannot have non-abstract methods, interfaces can."
    ],
    correctAnswer: 1,
    explanation: "C# does not support multiple inheritance for classes, meaning a class can inherit only one base class (abstract or otherwise). However, a class can implement multiple interfaces.",
    tags: ["Abstraction", "Interfaces"]
  },
  {
    id: "CS-OOP-003",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "What is the output of the following code?",
    code: "class Base { public virtual void Print() { Console.Write(\"Base\"); } }\nclass Derived : Base { public override void Print() { Console.Write(\"Derived\"); } }\nBase obj = new Derived();\nobj.Print();",
    options: ["Base", "Derived", "BaseDerived", "Compile-time error"],
    correctAnswer: 1,
    explanation: "Because the method Print is marked virtual in the base class and overridden in the derived class, runtime polymorphism ensures that the Derived class's Print method is called even when accessed through a Base class reference.",
    tags: ["Polymorphism", "Virtual Methods"]
  },
  {
    id: "CS-OOP-004",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "How does the 'ref' keyword differ from 'out' in C#?",
    options: [
      "Variables passed with 'ref' must be initialized before passing, while 'out' variables do not need initialization before passing.",
      "Variables passed with 'out' must be initialized before passing, while 'ref' variables do not.",
      "There is no difference; they are interchangeable.",
      "'ref' is used for reference types, 'out' is used for value types."
    ],
    correctAnswer: 0,
    explanation: "The 'ref' keyword requires that the variable be initialized before it is passed, whereas 'out' requires the variable to be assigned a value before the method returns.",
    tags: ["Parameters", "Methods"]
  },
  {
    id: "CS-OOP-005",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which access modifier restricts access to the containing class and derived classes only?",
    options: ["public", "internal", "protected", "private"],
    correctAnswer: 2,
    explanation: "The 'protected' access modifier restricts access to the declaring class and any class that derives from it.",
    tags: ["Access Modifiers", "Encapsulation"]
  },
  {
    id: "CS-OOP-006",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which of the following represents an implicit type declaration in C#?",
    options: ["dynamic", "var", "object", "anonymous"],
    correctAnswer: 1,
    explanation: "The 'var' keyword allows the compiler to implicitly determine the type of the variable from its initialization expression.",
    tags: ["C# Basics", "Variables"]
  },
  {
    id: "CS-OOP-007",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is method overloading?",
    options: [
      "Defining multiple methods with the same name but different parameter lists within the same scope.",
      "Replacing a base class method with a new implementation in a derived class.",
      "Providing an implementation for an interface method.",
      "Restricting the number of times a method can be called."
    ],
    correctAnswer: 0,
    explanation: "Method overloading is a form of compile-time polymorphism where multiple methods can share the same name as long as their parameters (type, number, or order) differ.",
    tags: ["Polymorphism", "Methods"]
  },
  {
    id: "CS-OOP-008",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Hard",
    type: "code-output",
    question: "What will happen when executing the following code?",
    code: "string s1 = \"hello\";\nstring s2 = s1;\ns1 += \" world\";\nConsole.WriteLine(s2);",
    options: ["hello world", "hello", "world", "Compile-time error"],
    correctAnswer: 1,
    explanation: "Strings are immutable reference types in C#. Reassigning or modifying 's1' creates a new string object in memory, leaving 's2' pointing to the original 'hello'.",
    tags: ["Strings", "Immutability"]
  },
  {
    id: "CS-OOP-009",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What does the 'base' keyword do in C#?",
    options: [
      "It refers to the base class of the current instance.",
      "It makes a method virtual by default.",
      "It prevents a class from being inherited.",
      "It identifies a class as the root of the hierarchy."
    ],
    correctAnswer: 0,
    explanation: "The 'base' keyword is used to access members of the base class from within a derived class, commonly used in constructors and method overrides.",
    tags: ["Inheritance", "Keywords"]
  },
  {
    id: "CS-OOP-010",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "Consider the use of the 'new' keyword to hide a base class method. What is the output?",
    code: "class A { public void Print() { Console.Write(\"A\"); } }\nclass B : A { public new void Print() { Console.Write(\"B\"); } }\nA obj = new B();\nobj.Print();",
    options: ["A", "B", "AB", "Compile-time error"],
    correctAnswer: 0,
    explanation: "The 'new' keyword hides the base method, it does not override it. Since the reference is of type 'A', the 'Print' method of class 'A' is called (compile-time binding).",
    tags: ["Inheritance", "Method Hiding"]
  },
  {
    id: "CS-OOP-011",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "Can a struct inherit from a class in C#?",
    options: [
      "Yes, a struct can inherit from a class.",
      "Yes, but only if the class is abstract.",
      "No, a struct cannot inherit from another class or struct.",
      "No, but it can inherit from another struct."
    ],
    correctAnswer: 2,
    explanation: "In C#, structs cannot inherit from another class or struct, nor can they be the base of a class. They can only implement interfaces.",
    tags: ["Structs", "Inheritance"]
  },
  {
    id: "CS-OOP-012",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "What is the default access modifier for members of a class?",
    options: ["public", "private", "protected", "internal"],
    correctAnswer: 1,
    explanation: "Class members are 'private' by default if no access modifier is specified.",
    tags: ["Access Modifiers", "Classes"]
  },
  {
    id: "CS-OOP-013",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is a static constructor used for?",
    options: [
      "To initialize static fields and execute code only once before the first instance is created.",
      "To initialize read-only fields for every new object.",
      "To restrict instantiation of a class.",
      "To create singleton patterns automatically."
    ],
    correctAnswer: 0,
    explanation: "A static constructor is used to initialize static data or perform a particular action that needs to be performed only once, before any instances are created or any static members are referenced.",
    tags: ["Constructors", "Static"]
  },
  {
    id: "CS-OOP-014",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "multiple-choice",
    question: "Which of the following statements about private constructors are true? (Select all that apply)",
    options: [
      "They can be used to prevent a class from being instantiated directly.",
      "They are commonly used in the Singleton design pattern.",
      "A class with only a private constructor cannot be inherited.",
      "They can be called from outside the class using reflection."
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: "Private constructors prevent instantiation (except from within the class itself), are used in Singletons, prevent inheritance (unless a nested class derives from it), and can technically be invoked using Reflection.",
    tags: ["Constructors", "Design Patterns"]
  },
  {
    id: "CS-OOP-015",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "How do you specify a multi-line comment in C#?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "''' comment '''"],
    correctAnswer: 2,
    explanation: "The /* */ syntax is used for multi-line comments in C#.",
    tags: ["Syntax", "C# Basics"]
  },
  {
    id: "CS-OOP-016",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is the purpose of the 'sealed' keyword applied to a class?",
    options: [
      "It prevents the class from being modified after compile time.",
      "It restricts object creation to a single instance.",
      "It prevents other classes from inheriting from it.",
      "It makes all properties of the class read-only."
    ],
    correctAnswer: 2,
    explanation: "When applied to a class, the 'sealed' modifier prevents other classes from inheriting from it.",
    tags: ["Keywords", "Inheritance"]
  },
  {
    id: "CS-OOP-017",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Hard",
    type: "code-output",
    question: "What is the output of the following code snippet?",
    code: "int[] arr = new int[3] { 1, 2, 3 };\nref int x = ref arr[1];\nx = 5;\nConsole.WriteLine(arr[1]);",
    options: ["2", "5", "1", "Compile-time error"],
    correctAnswer: 1,
    explanation: "Using 'ref' locals allows you to store a reference to a variable (in this case, an array element). Modifying the 'ref' local directly updates the underlying array element.",
    tags: ["Arrays", "Ref Locals"]
  },
  {
    id: "CS-OOP-018",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "scenario",
    question: "You want to define a contract that multiple unrelated classes can implement to ensure they all provide a specific method 'SaveToDatabase()'. What should you use?",
    options: ["Abstract class", "Base class", "Interface", "Struct"],
    correctAnswer: 2,
    explanation: "Interfaces are ideal for defining contracts across unrelated classes, providing a guarantee that they implement certain methods without forcing them into a specific inheritance hierarchy.",
    tags: ["Interfaces", "Abstraction"]
  },
  {
    id: "CS-OOP-019",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "Which of the following is true regarding C# Enums?",
    options: [
      "Enums can inherit from classes.",
      "The underlying type of an enum can be double.",
      "The default underlying type of an enum is int.",
      "Enums are reference types."
    ],
    correctAnswer: 2,
    explanation: "By default, the underlying type of an enum in C# is int. They are value types and can only have integral underlying types (like byte, short, int, long).",
    tags: ["Enums", "Types"]
  },
  {
    id: "CS-OOP-020",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "Given the code below, what happens when it is executed?",
    code: "abstract class Shape { public abstract void Draw(); }\nclass Circle : Shape { }\nCircle c = new Circle();",
    options: [
      "It successfully creates a Circle object.",
      "It throws a runtime exception.",
      "It results in a compile-time error.",
      "It outputs nothing."
    ],
    correctAnswer: 2,
    explanation: "The code will not compile because the non-abstract class 'Circle' does not implement the inherited abstract member 'Draw()'.",
    tags: ["Abstraction", "Inheritance"]
  },
  {
    id: "CS-OOP-021",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "What is the base class for all exceptions in C#?",
    options: ["ApplicationException", "SystemException", "Exception", "Error"],
    correctAnswer: 2,
    explanation: "All exceptions in C# derive from the System.Exception base class.",
    tags: ["Exceptions", "Base Classes"]
  },
  {
    id: "CS-OOP-022",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "Which of the following statements about C# Properties are true? (Select all that apply)",
    options: [
      "Properties can have different access modifiers for their get and set accessors.",
      "Auto-implemented properties do not require a backing field to be explicitly defined.",
      "Properties must always have both a get and a set accessor.",
      "Properties are compiled into get and set methods."
    ],
    correctAnswer: [0, 1, 3],
    explanation: "Properties can have different accessibilities for get/set, auto-properties generate backing fields invisibly, and they are compiled into get_ and set_ methods. They can be read-only or write-only.",
    tags: ["Properties", "Encapsulation"]
  },
  {
    id: "CS-OOP-023",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Hard",
    type: "code-output",
    question: "What is the output of the following?",
    code: "try { throw new NullReferenceException(); }\ncatch (Exception e) { Console.Write(\"A\"); }\ncatch (NullReferenceException e) { Console.Write(\"B\"); }\nfinally { Console.Write(\"C\"); }",
    options: ["AC", "BC", "ABC", "Compile-time error"],
    correctAnswer: 3,
    explanation: "This results in a compile-time error. In a try-catch block, more specific exceptions (NullReferenceException) must be caught before base exceptions (Exception).",
    tags: ["Exceptions", "Control Flow"]
  },
  {
    id: "CS-OOP-024",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is an extension method in C#?",
    options: [
      "A method added to an abstract class to extend its behavior.",
      "A static method of a static class that can be invoked as if it were an instance method of the extended type.",
      "A method that overrides a base class method.",
      "A method that dynamically adds fields to a runtime object."
    ],
    correctAnswer: 1,
    explanation: "Extension methods allow you to add methods to existing types without creating a new derived type, recompiling, or otherwise modifying the original type. They are declared as static methods in static classes.",
    tags: ["Extension Methods", "Methods"]
  },
  {
    id: "CS-OOP-025",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which type allows storing multiple elements of the same type in a contiguous memory location?",
    options: ["Dictionary", "Array", "HashSet", "Tuple"],
    correctAnswer: 1,
    explanation: "Arrays store elements of the same type in a contiguous block of memory.",
    tags: ["Arrays", "Data Structures"]
  },
  {
    id: "CS-OOP-026",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "When would you prefer a struct over a class?",
    options: [
      "When the object needs to support inheritance.",
      "When creating small, lightweight objects containing mostly value types that do not require identity.",
      "When objects are large and passed around frequently.",
      "When the object needs a destructor."
    ],
    correctAnswer: 1,
    explanation: "Structs (value types) are allocated on the stack and are ideal for small, immutable data structures without complex inheritance or identity requirements.",
    tags: ["Structs", "Performance"]
  },
  {
    id: "CS-OOP-027",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "Analyze the following constructor chaining. What is printed?",
    code: "class Parent { public Parent() { Console.Write(\"1\"); } }\nclass Child : Parent { public Child() : base() { Console.Write(\"2\"); } }\nChild c = new Child();",
    options: ["12", "21", "1", "2"],
    correctAnswer: 0,
    explanation: "When an instance of the derived class is created, the base class constructor is called first. Hence '1' is printed, then '2'.",
    tags: ["Constructors", "Inheritance"]
  },
  {
    id: "CS-OOP-028",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "What does the 'readonly' keyword signify for a field?",
    options: [
      "The field's value is evaluated at compile time and cannot be changed.",
      "The field can only be assigned during declaration or in a constructor.",
      "The field cannot be accessed from outside the class.",
      "The field is static and shared across all instances."
    ],
    correctAnswer: 1,
    explanation: "A 'readonly' field can only be initialized at the time of declaration or within the constructor of the class.",
    tags: ["Keywords", "Variables"]
  },
  {
    id: "CS-OOP-029",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Easy",
    type: "single-choice",
    question: "What principle ensures that the internal state of an object is hidden from the outside?",
    options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    correctAnswer: 2,
    explanation: "Encapsulation is the principle of bundling data and methods that operate on the data within a single unit and restricting direct access to some of an object's components.",
    tags: ["Encapsulation", "OOP Concepts"]
  },
  {
    id: "CS-OOP-030",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is a major difference between 'const' and 'readonly' fields?",
    options: [
      "'const' fields are evaluated at compile time; 'readonly' fields are evaluated at runtime.",
      "'readonly' fields are implicitly static, while 'const' fields are not.",
      "You can assign a value to a 'const' field in a constructor.",
      "'const' fields can be of reference types other than string."
    ],
    correctAnswer: 0,
    explanation: "Constants (const) are evaluated at compile-time and embedded in the IL. Readonly fields are assigned at runtime in the constructor.",
    tags: ["Keywords", "Variables"]
  },
  {
    id: "CS-OOP-031",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "What is the output of the following?",
    code: "interface IWorker { void Work(); }\nclass Robot : IWorker { void IWorker.Work() { Console.Write(\"Robot\"); } }\nRobot r = new Robot();\nr.Work();",
    options: ["Robot", "Compile-time error", "Runtime exception", "No output"],
    correctAnswer: 1,
    explanation: "This produces a compile-time error. 'Work' is implemented explicitly as an interface member. It can only be called by casting the object to the interface: ((IWorker)r).Work();",
    tags: ["Interfaces", "Explicit Implementation"]
  },
  {
    id: "CS-OOP-032",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "What is 'boxing' in C#?",
    options: [
      "Converting a reference type to a value type.",
      "Converting a value type to an object type or an interface type implemented by this value type.",
      "Encapsulating properties in a class.",
      "Using the 'ref' keyword for parameters."
    ],
    correctAnswer: 1,
    explanation: "Boxing is the process of converting a value type to the type object or to any interface type implemented by this value type, allocating a new object on the heap.",
    tags: ["Boxing", "Types"]
  },
  {
    id: "CS-OOP-033",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "scenario",
    question: "You need a method that can take an arbitrary number of integer arguments. Which keyword should you use in the method signature?",
    options: ["ref", "out", "params", "in"],
    correctAnswer: 2,
    explanation: "The 'params' keyword allows a method to accept a variable number of arguments (passed as an array).",
    tags: ["Parameters", "Methods"]
  },
  {
    id: "CS-OOP-034",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "Can an abstract class have constructors?",
    options: [
      "No, because abstract classes cannot be instantiated.",
      "Yes, and they can be public to allow direct instantiation.",
      "Yes, they are called when a derived class is instantiated.",
      "No, only interfaces can have constructors."
    ],
    correctAnswer: 2,
    explanation: "Abstract classes can have constructors. Even though you cannot instantiate an abstract class directly, its constructor is called when a concrete derived class is instantiated.",
    tags: ["Constructors", "Abstraction"]
  },
  {
    id: "CS-OOP-035",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which keyword is used to handle exceptions that were not caught by catch blocks?",
    options: ["finally", "throw", "using", "catch(Exception)"],
    correctAnswer: 0,
    explanation: "The 'finally' block is always executed, whether an exception is caught or not, typically used for cleanup.",
    tags: ["Exceptions", "Control Flow"]
  },
  {
    id: "CS-OOP-036",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Hard",
    type: "code-output",
    question: "What is the result of the following code snippet?",
    code: "public class Logger\n{\n    public static int Count;\n    static Logger() { Count = 10; }\n    public Logger() { Count++; }\n}\nvar l1 = new Logger();\nvar l2 = new Logger();\nConsole.Write(Logger.Count);",
    options: ["10", "11", "12", "Compile-time error"],
    correctAnswer: 2,
    explanation: "The static constructor runs once, setting Count to 10. Then the two instances are created, each incrementing Count by 1, resulting in 12.",
    tags: ["Constructors", "Static"]
  },
  {
    id: "CS-OOP-037",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Medium",
    type: "single-choice",
    question: "What does the 'yield return' statement do?",
    options: [
      "It terminates the loop and returns a single value.",
      "It returns a value and pauses the method execution, resuming from that point on the next iteration.",
      "It catches an exception in an iterator block.",
      "It returns multiple values simultaneously as a Tuple."
    ],
    correctAnswer: 1,
    explanation: "The 'yield' keyword is used to provide custom iteration over a collection, returning one element at a time and preserving state between iterations.",
    tags: ["Yield", "Iteration"]
  },
  {
    id: "CS-OOP-038",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Medium",
    type: "single-choice",
    question: "In C#, a class can inherit from how many base classes?",
    options: ["0", "1", "2", "Unlimited"],
    correctAnswer: 1,
    explanation: "C# only supports single inheritance for classes. A class can inherit from at most one base class.",
    tags: ["Inheritance", "Classes"]
  },
  {
    id: "CS-OOP-039",
    paperId: "csharp-oop-1",
    category: "CSharp",
    difficulty: "Hard",
    type: "code-output",
    question: "Analyze the string formatting. What is printed?",
    code: "string name = \"Alice\";\nint age = 30;\nConsole.WriteLine($\"Name: {name}, Age: {age}\");",
    options: [
      "Name: {name}, Age: {age}",
      "Name: Alice, Age: 30",
      "Compile-time error",
      "Runtime exception"
    ],
    correctAnswer: 1,
    explanation: "The '$' prefix denotes string interpolation, which dynamically substitutes the variable values into the placeholders.",
    tags: ["Strings", "String Interpolation"]
  },
  {
    id: "CS-OOP-040",
    paperId: "csharp-oop-1",
    category: "OOP",
    difficulty: "Easy",
    type: "single-choice",
    question: "Which of the following is true regarding properties in an interface?",
    options: [
      "Interfaces cannot contain properties.",
      "Properties in interfaces must include full get/set implementations.",
      "Interface properties do not have a body, they just define get and/or set.",
      "Interface properties must be static."
    ],
    correctAnswer: 2,
    explanation: "Interfaces can declare properties. They define whether a property should have a get, set, or both, but they do not provide an implementation body.",
    tags: ["Interfaces", "Properties"]
  }
];
