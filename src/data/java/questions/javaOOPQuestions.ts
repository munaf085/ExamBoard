// @ts-nocheck

export interface JavaMCQ {
  id: string;
  moduleId: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'conceptual' | 'output' | 'debugging' | 'syntax';
  tags: string[];
}

export const javaOOPQuestions: JavaMCQ[] = [
  {
    id: 'oop-1',
    moduleId: 'java-oop-basics',
    question: 'What is the primary difference between a class and an object?',
    options: [
      'A class is an instance, while an object is a blueprint.',
      'A class is a blueprint, while an object is an instance of a class.',
      'They are identical concepts in Java.',
      'A class can only hold methods, and an object only holds data.'
    ],
    correctAnswer: 1,
    explanation: 'A class serves as a template or blueprint, while an object is a specific, concrete instance created from that template.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['class', 'object', 'basics']
  },
  {
    id: 'oop-2',
    moduleId: 'java-inheritance',
    question: 'What is the output of the following code?',
    code: `class A {
    A() { System.out.println("A"); }
    A(int x) { this(); System.out.println("A(int)"); }
}
class B extends A {
    B() { super(5); System.out.println("B"); }
}
public class Main {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      'B, A(int), A',
      'A, A(int), B',
      'A(int), A, B',
      'A, B, A(int)'
    ],
    correctAnswer: 1,
    explanation: 'B() calls super(5), which goes to A(int x). A(int x) calls this(), which invokes A(). So "A" prints first, then "A(int)" finishes, then "B" prints.',
    difficulty: 'Hard',
    type: 'output',
    tags: ['constructors', 'inheritance', 'super', 'this']
  },
  {
    id: 'oop-3',
    moduleId: 'java-oop-basics',
    question: 'What happens if a class does not define any constructors?',
    options: [
      'The code will not compile.',
      'Java automatically provides a default no-argument constructor.',
      'You cannot instantiate objects of that class.',
      'The class becomes abstract.'
    ],
    correctAnswer: 1,
    explanation: 'If no constructors are explicitly defined, the Java compiler automatically inserts a default no-argument constructor that calls the superclass no-argument constructor.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['constructors', 'basics']
  },
  {
    id: 'oop-4',
    moduleId: 'java-inheritance',
    question: 'Where must the super() or this() call be placed inside a constructor?',
    options: [
      'Anywhere in the constructor.',
      'At the very end of the constructor.',
      'As the first statement in the constructor.',
      'It cannot be used inside constructors.'
    ],
    correctAnswer: 2,
    explanation: 'Calls to this() or super() must be the very first statement in a constructor body.',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['constructors', 'super', 'this']
  },
  {
    id: 'oop-5',
    moduleId: 'java-oop-basics',
    question: 'Which access modifier allows visibility only within the same package and subclasses in other packages?',
    options: [
      'private',
      'default (package-private)',
      'protected',
      'public'
    ],
    correctAnswer: 2,
    explanation: 'The protected access modifier allows access within the same package, as well as in subclasses located in different packages.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['access-modifiers']
  },
  {
    id: 'oop-6',
    moduleId: 'java-oop-basics',
    question: 'What is the purpose of the Getters/Setters pattern (Encapsulation)?',
    options: [
      'To make variables public for easy access.',
      'To restrict direct access to fields and provide controlled access via methods.',
      'To increase execution speed.',
      'To allow multiple inheritance.'
    ],
    correctAnswer: 1,
    explanation: 'Getters and setters are used to encapsulate data, preventing direct modification of fields and allowing validation or controlled access.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['encapsulation', 'getters', 'setters']
  },
  {
    id: 'oop-7',
    moduleId: 'java-oop-basics',
    question: 'Can a static method directly access an instance variable of the same class?',
    options: [
      'Yes, it can access it just like any other method.',
      'No, static methods cannot access instance variables directly.',
      'Only if the static method is public.',
      'Only if the instance variable is final.'
    ],
    correctAnswer: 1,
    explanation: 'Static methods belong to the class, not to any specific instance. They cannot directly access instance variables or instance methods without an object reference.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['static', 'methods', 'variables']
  },
  {
    id: 'oop-8',
    moduleId: 'java-oop-basics',
    question: 'What is method overloading?',
    options: [
      'Having multiple methods with the same name and the same parameters.',
      'Having multiple methods with the same name but different parameters in the same class.',
      'Overriding a method from a superclass.',
      'Using the @Override annotation.'
    ],
    correctAnswer: 1,
    explanation: 'Method overloading occurs when a class has multiple methods with the same name but different parameter lists (different type, number, or order of parameters).',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['overloading', 'methods']
  },
  {
    id: 'oop-9',
    moduleId: 'java-inheritance',
    question: 'Which of the following is true about method overriding?',
    options: [
      'The overriding method must have a different return type.',
      'The overriding method can reduce the visibility (e.g., from public to protected).',
      'The overriding method must have the exact same signature and return type (or a subtype).',
      'Static methods can be overridden.'
    ],
    correctAnswer: 2,
    explanation: 'Overriding methods must have the same name, parameter list, and a covariant return type. They cannot have more restrictive access modifiers.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['overriding', 'inheritance']
  },
  {
    id: 'oop-10',
    moduleId: 'java-oop-basics',
    question: 'What does the final keyword signify when applied to a class?',
    options: [
      'The class cannot be instantiated.',
      'The class cannot be extended (subclassed).',
      'The class can only have static methods.',
      'The class must be abstract.'
    ],
    correctAnswer: 1,
    explanation: 'A final class cannot be subclassed (extended).',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['final', 'class']
  },
  {
    id: 'oop-11',
    moduleId: 'java-abstraction',
    question: 'Can an abstract class have a constructor?',
    options: [
      'Yes, and it can be called directly using new.',
      'Yes, it is used by subclasses when they are instantiated.',
      'No, abstract classes cannot have constructors.',
      'Only if all its methods are abstract.'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes can have constructors. Although you cannot instantiate an abstract class directly, its constructors are called when a concrete subclass is instantiated.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['abstract-class', 'constructors']
  },
  {
    id: 'oop-12',
    moduleId: 'java-abstraction',
    question: 'Since Java 8, what new feature was added to interfaces?',
    options: [
      'Constructors',
      'Instance variables',
      'Default and static methods with bodies',
      'Protected methods'
    ],
    correctAnswer: 2,
    explanation: 'Java 8 introduced default methods and static methods in interfaces, allowing interfaces to provide method implementations.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['interface', 'java-8']
  },
  {
    id: 'oop-13',
    moduleId: 'java-abstraction',
    question: 'When should you use an abstract class over an interface (pre-Java 8 style)?',
    options: [
      'When you want multiple inheritance.',
      'When you need to share code (fields and non-abstract methods) among closely related classes.',
      'When you want to define a purely behavioral contract.',
      'Abstract classes are always preferred over interfaces.'
    ],
    correctAnswer: 1,
    explanation: 'Abstract classes are best for providing a common base class with shared state (fields) and shared implemented methods for closely related subclasses.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['abstract-class', 'interface']
  },
  {
    id: 'oop-14',
    moduleId: 'java-abstraction',
    question: 'Can a Java class implement multiple interfaces?',
    options: [
      'Yes',
      'No',
      'Only if the interfaces do not have any methods',
      'Only if the class is abstract'
    ],
    correctAnswer: 0,
    explanation: 'Java supports multiple inheritance of type, meaning a single class can implement multiple interfaces.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['interface', 'multiple-inheritance']
  },
  {
    id: 'oop-15',
    moduleId: 'java-inheritance',
    question: 'What is the output of the following code?',
    code: `class Animal {
    public String speak() { return "Animal"; }
}
class Dog extends Animal {
    public String speak() { return "Woof"; }
}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        System.out.println(a.speak());
    }
}`,
    options: [
      'Animal',
      'Woof',
      'Compilation Error',
      'Runtime Exception'
    ],
    correctAnswer: 1,
    explanation: 'Due to runtime polymorphism (dynamic method dispatch), the overridden method in the actual object type (Dog) is called, regardless of the reference type (Animal).',
    difficulty: 'Medium',
    type: 'output',
    tags: ['polymorphism', 'overriding']
  },
  {
    id: 'oop-16',
    moduleId: 'java-inheritance',
    question: 'What does the instanceof operator do?',
    options: [
      'Creates a new instance of a class.',
      'Checks if an object is of a specific type (class or interface).',
      'Compares two objects for equality.',
      'Returns the class name of an object.'
    ],
    correctAnswer: 1,
    explanation: 'The instanceof operator is used to test whether an object is an instance of a specified type (class, subclass, or interface).',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['instanceof']
  },
  {
    id: 'oop-17',
    moduleId: 'java-oop-basics',
    question: 'Which class is the root of the class hierarchy in Java?',
    options: [
      'Class',
      'Main',
      'Object',
      'Root'
    ],
    correctAnswer: 2,
    explanation: 'The Object class is the parent class of all classes in Java by default.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['object-class', 'hierarchy']
  },
  {
    id: 'oop-18',
    moduleId: 'java-oop-basics',
    question: 'Which method of the Object class is used to compare two objects for logical equality?',
    options: [
      '== operator',
      'compareTo()',
      'equals()',
      'hashCode()'
    ],
    correctAnswer: 2,
    explanation: 'The equals() method is intended to be overridden to compare the actual content or logical state of two objects.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['object-class', 'equals']
  },
  {
    id: 'oop-19',
    moduleId: 'java-oop-basics',
    question: 'What is the contract between equals() and hashCode()?',
    options: [
      'If two objects are equal, they must have the same hash code.',
      'If two objects have the same hash code, they must be equal.',
      'They are completely unrelated.',
      'equals() uses hashCode() internally by default.'
    ],
    correctAnswer: 0,
    explanation: 'The contract states that if two objects are equal according to the equals(Object) method, then calling the hashCode method on each of the two objects must produce the same integer result.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['equals', 'hashcode']
  },
  {
    id: 'oop-20',
    moduleId: 'java-oop-basics',
    question: 'What will happen if a class defines a method final void display() and a subclass tries to override it?',
    options: [
      'It will override successfully.',
      'The subclass will hide the parent method.',
      'A compilation error will occur.',
      'A runtime exception will be thrown.'
    ],
    correctAnswer: 2,
    explanation: 'A method declared as final cannot be overridden by subclasses, leading to a compile-time error.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['final', 'methods', 'overriding']
  },
  {
    id: 'oop-21',
    moduleId: 'java-inheritance',
    question: 'What is it called when a subclass has a method with the same signature as a static method in the superclass?',
    options: [
      'Method Overriding',
      'Method Hiding',
      'Method Overloading',
      'Polymorphism'
    ],
    correctAnswer: 1,
    explanation: 'Static methods cannot be overridden. If a subclass defines a static method with the same signature, it "hides" the superclass method, not overrides it.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['static', 'hiding', 'inheritance']
  },
  {
    id: 'oop-22',
    moduleId: 'java-abstraction',
    question: 'Can an interface extend another interface?',
    options: [
      'Yes, using the implements keyword.',
      'Yes, using the extends keyword.',
      'No, interfaces cannot inherit.',
      'Only in Java 8 and above.'
    ],
    correctAnswer: 1,
    explanation: 'An interface can inherit from one or more other interfaces using the extends keyword.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['interface', 'inheritance']
  },
  {
    id: 'oop-23',
    moduleId: 'java-oop-basics',
    question: 'What happens when you print an object reference using System.out.println(obj) without overriding toString()?',
    options: [
      'It prints the memory address directly.',
      'It prints the class name followed by @ and its hashcode in hexadecimal.',
      'It throws a NullPointerException.',
      'It prints nothing.'
    ],
    correctAnswer: 1,
    explanation: 'By default, Object\'s toString() method returns a string consisting of the class name, the at-sign character @, and the unsigned hexadecimal representation of the hash code.',
    difficulty: 'Medium',
    type: 'output',
    tags: ['object-class', 'tostring']
  },
  {
    id: 'oop-24',
    moduleId: 'java-oop-basics',
    question: 'Which of the following modifiers is used to denote that a variable\'s value cannot be changed once assigned?',
    options: [
      'static',
      'volatile',
      'final',
      'const'
    ],
    correctAnswer: 2,
    explanation: 'The final keyword makes a variable a constant, meaning its value cannot be reassigned once initialized.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['final', 'variables']
  },
  {
    id: 'oop-25',
    moduleId: 'java-inheritance',
    question: 'Is it mandatory for an abstract class to have at least one abstract method?',
    options: [
      'Yes, otherwise it cannot be declared abstract.',
      'No, an abstract class can have zero abstract methods.',
      'Yes, but only if it implements an interface.',
      'No, but it must have all concrete methods.'
    ],
    correctAnswer: 1,
    explanation: 'An abstract class is not required to have any abstract methods. However, it still cannot be instantiated.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['abstract-class']
  }
];

