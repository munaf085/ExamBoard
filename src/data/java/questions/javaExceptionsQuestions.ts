// @ts-nocheck

import { JavaMCQ } from './javaOOPQuestions';

export const javaExceptionsQuestions: JavaMCQ[] = [
  {
    id: 'exc-1',
    moduleId: 'java-exceptions',
    question: 'What is the root class of the Java exception hierarchy?',
    options: [
      'Exception',
      'Error',
      'Throwable',
      'RuntimeException'
    ],
    correctAnswer: 2,
    explanation: 'Throwable is the superclass of all errors and exceptions in the Java language.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['hierarchy']
  },
  {
    id: 'exc-2',
    moduleId: 'java-exceptions',
    question: 'Which of the following is a Checked Exception?',
    options: [
      'NullPointerException',
      'ArrayIndexOutOfBoundsException',
      'IOException',
      'ArithmeticException'
    ],
    correctAnswer: 2,
    explanation: 'IOException is a checked exception. NullPointerException, ArrayIndexOutOfBoundsException, and ArithmeticException are unchecked exceptions (RuntimeExceptions).',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['checked-exceptions']
  },
  {
    id: 'exc-3',
    moduleId: 'java-exceptions',
    question: 'What is the output of the following code?',
    code: `try {
    System.out.println("try");
    return;
} finally {
    System.out.println("finally");
}`,
    options: [
      'try',
      'finally',
      'try, finally',
      'Compilation Error'
    ],
    correctAnswer: 2,
    explanation: 'The finally block will always execute, even if there is a return statement in the try block.',
    difficulty: 'Hard',
    type: 'output',
    tags: ['finally', 'return']
  },
  {
    id: 'exc-4',
    moduleId: 'java-exceptions',
    question: 'In what scenario will a finally block NOT execute?',
    options: [
      'When an exception is thrown in the try block.',
      'When a return statement is encountered in the try block.',
      'When System.exit(0) is called in the try block.',
      'When an unhandled exception occurs.'
    ],
    correctAnswer: 2,
    explanation: 'The finally block will not execute if the JVM exits completely, such as when System.exit() is invoked or if it crashes.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['finally', 'system-exit']
  },
  {
    id: 'exc-5',
    moduleId: 'java-exceptions',
    question: 'How should multiple catch blocks be ordered?',
    options: [
      'From most general Exception to most specific Exception.',
      'From most specific Exception to most general Exception.',
      'Alphabetical order.',
      'It does not matter.'
    ],
    correctAnswer: 1,
    explanation: 'Specific exceptions must be caught before more general ones (like Exception), otherwise the compiler will throw an unreachable code error.',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['catch', 'ordering']
  },
  {
    id: 'exc-6',
    moduleId: 'java-exceptions',
    question: 'What is the keyword used to explicitly throw an exception?',
    options: [
      'throws',
      'throw',
      'catch',
      'try'
    ],
    correctAnswer: 1,
    explanation: 'The "throw" keyword is used to explicitly throw a single exception instance, whereas "throws" is used in method signatures.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['throw', 'throws']
  },
  {
    id: 'exc-7',
    moduleId: 'java-exceptions',
    question: 'Where is the throws keyword used?',
    options: [
      'Inside a catch block.',
      'Inside a try block.',
      'In a method signature to declare that it may throw exceptions.',
      'To throw a custom exception.'
    ],
    correctAnswer: 2,
    explanation: 'The throws keyword is used in a method declaration to indicate that the method might throw one or more exceptions.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['throws', 'method-signature']
  },
  {
    id: 'exc-8',
    moduleId: 'java-exceptions',
    question: 'How do you create a custom checked exception?',
    options: [
      'Extend the Error class.',
      'Extend the RuntimeException class.',
      'Extend the Exception class.',
      'Implement the Throwable interface.'
    ],
    correctAnswer: 2,
    explanation: 'To create a custom checked exception, you should extend the Exception class. To create an unchecked exception, extend RuntimeException.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['custom-exceptions']
  },
  {
    id: 'exc-9',
    moduleId: 'java-exceptions',
    question: 'What does the try-with-resources statement do?',
    options: [
      'Automatically restarts the try block if it fails.',
      'Automatically closes resources that implement AutoCloseable or Closeable at the end of the statement.',
      'Allows executing a try block without a catch or finally block.',
      'Handles all exceptions automatically.'
    ],
    correctAnswer: 1,
    explanation: 'try-with-resources ensures that each resource (which must implement AutoCloseable) is closed automatically at the end of the statement.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['try-with-resources']
  },
  {
    id: 'exc-10',
    moduleId: 'java-exceptions',
    question: 'What is the output of the following code?',
    code: `try {
    int[] arr = new int[5];
    arr[10] = 1;
} catch (NullPointerException e) {
    System.out.println("NPE");
} catch (Exception e) {
    System.out.println("Exception");
}`,
    options: [
      'NPE',
      'Exception',
      'Compilation Error',
      'Runtime Exception stack trace'
    ],
    correctAnswer: 1,
    explanation: 'The array access throws ArrayIndexOutOfBoundsException, which is not caught by NullPointerException but is caught by the general Exception block.',
    difficulty: 'Medium',
    type: 'output',
    tags: ['catch', 'arrayindex']
  },
  {
    id: 'exc-11',
    moduleId: 'java-exceptions',
    question: 'What happens if an exception is thrown in a method but not caught?',
    options: [
      'The program ignores it and continues.',
      'It is propagated up the call stack to the calling method.',
      'The program goes into an infinite loop.',
      'The compiler will automatically fix it.'
    ],
    correctAnswer: 1,
    explanation: 'If an exception is not caught, it propagates up the method call stack. If it reaches the main method and is still uncaught, the program terminates.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['propagation', 'call-stack']
  },
  {
    id: 'exc-12',
    moduleId: 'java-exceptions',
    question: 'Can you have a try block without a catch block?',
    options: [
      'Yes, but it must be followed by a finally block.',
      'Yes, it can stand completely alone.',
      'No, a catch block is strictly required.',
      'Only if it is a try-with-resources block.'
    ],
    correctAnswer: 0,
    explanation: 'A try block must be followed by at least one catch block or a finally block (or both). (Try-with-resources can exist without explicit catch/finally as well).',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['try', 'finally']
  },
  {
    id: 'exc-13',
    moduleId: 'java-exceptions',
    question: 'What is the difference between Error and Exception?',
    options: [
      'They are identical in Java.',
      'Errors are checked, Exceptions are unchecked.',
      'Errors represent severe conditions that reasonable applications should not try to catch, while Exceptions represent conditions applications might want to catch.',
      'Exceptions occur at compile-time, Errors at runtime.'
    ],
    correctAnswer: 2,
    explanation: 'Errors (like OutOfMemoryError) are serious problems the JVM encounters. Applications usually cannot recover from them.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['error', 'exception']
  },
  {
    id: 'exc-14',
    moduleId: 'java-exceptions',
    question: 'What causes a NullPointerException?',
    options: [
      'Accessing an array outside its bounds.',
      'Calling a method or accessing a field on a null object reference.',
      'Dividing an integer by zero.',
      'Trying to cast an object to an incompatible type.'
    ],
    correctAnswer: 1,
    explanation: 'NullPointerException is thrown when an application attempts to use null in a case where an object is required.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['nullpointerexception']
  },
  {
    id: 'exc-15',
    moduleId: 'java-exceptions',
    question: 'What exception is thrown by int x = 10 / 0; ?',
    options: [
      'NumberFormatException',
      'IllegalArgumentException',
      'ArithmeticException',
      'NullPointerException'
    ],
    correctAnswer: 2,
    explanation: 'Dividing an integer by zero throws an ArithmeticException.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['arithmeticexception']
  },
  {
    id: 'exc-16',
    moduleId: 'java-exceptions',
    question: 'What exception is thrown when attempting to cast an object to a subclass of which it is not an instance?',
    options: [
      'ClassCastException',
      'IllegalAccessException',
      'TypeNotPresentException',
      'InvalidCastException'
    ],
    correctAnswer: 0,
    explanation: 'ClassCastException is thrown to indicate that the code has attempted to cast an object to a subclass of which it is not an instance.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['classcastexception']
  },
  {
    id: 'exc-17',
    moduleId: 'java-exceptions',
    question: 'Which of the following is considered best practice when catching exceptions?',
    options: [
      'Catching Throwable or Exception whenever possible.',
      'Catching specific exceptions and providing meaningful handling or logging.',
      'Leaving catch blocks completely empty.',
      'Printing the stack trace and continuing without action.'
    ],
    correctAnswer: 1,
    explanation: 'Best practice dictates catching the most specific exception possible and providing meaningful handling rather than swallowing exceptions or catching generic Exceptions.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['best-practices']
  },
  {
    id: 'exc-18',
    moduleId: 'java-exceptions',
    question: 'Can you re-throw an exception inside a catch block?',
    options: [
      'Yes, by using the throw keyword followed by the exception reference.',
      'No, exceptions can only be thrown once.',
      'Yes, but it will lose its original stack trace completely.',
      'Only if it is a RuntimeException.'
    ],
    correctAnswer: 0,
    explanation: 'You can re-throw an exception using `throw e;` within a catch block to let the caller handle it.',
    difficulty: 'Medium',
    type: 'syntax',
    tags: ['re-throw']
  },
  {
    id: 'exc-19',
    moduleId: 'java-exceptions',
    question: 'What is "Exception Chaining"?',
    options: [
      'Writing multiple catch blocks sequentially.',
      'Wrapping a caught exception inside a new exception to preserve the original cause.',
      'Throwing exceptions in a recursive loop.',
      'A design pattern to handle all errors globally.'
    ],
    correctAnswer: 1,
    explanation: 'Exception chaining allows you to associate one exception with another, keeping the original exception (the cause) when a new one is thrown.',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['exception-chaining']
  },
  {
    id: 'exc-20',
    moduleId: 'java-exceptions',
    question: 'What happens if a finally block throws an exception?',
    options: [
      'It is ignored.',
      'It suppresses the exception originally thrown in the try block.',
      'It causes a compilation error.',
      'It gets caught by the catch block above it.'
    ],
    correctAnswer: 1,
    explanation: 'If a finally block completes abruptly by throwing an exception, any exception previously thrown in the try block is suppressed and lost (unless handled specifically).',
    difficulty: 'Hard',
    type: 'conceptual',
    tags: ['finally', 'exceptions']
  },
  {
    id: 'exc-21',
    moduleId: 'java-exceptions',
    question: 'Can a method declare to throw multiple exceptions?',
    options: [
      'No, only one exception can be declared.',
      'Yes, separated by commas (e.g., throws IOException, SQLException).',
      'Yes, separated by spaces.',
      'Yes, separated by pipes (|).'
    ],
    correctAnswer: 1,
    explanation: 'A method signature can declare multiple exceptions separated by commas using the throws keyword.',
    difficulty: 'Easy',
    type: 'syntax',
    tags: ['throws', 'multiple-exceptions']
  },
  {
    id: 'exc-22',
    moduleId: 'java-exceptions',
    question: 'What feature introduced in Java 7 allows catching multiple exceptions in a single catch block?',
    options: [
      'try-with-resources',
      'multi-catch block using the pipe (|) operator',
      'Exception chaining',
      'Suppressed Exceptions'
    ],
    correctAnswer: 1,
    explanation: 'Java 7 introduced the multi-catch block, allowing multiple exceptions to be caught in one block, separated by a pipe (|). e.g., catch (IOException | SQLException e).',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['multi-catch', 'java-7']
  },
  {
    id: 'exc-23',
    moduleId: 'java-exceptions',
    question: 'What is a RuntimeException also known as?',
    options: [
      'Checked exception',
      'Unchecked exception',
      'Error',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'RuntimeExceptions and their subclasses are known as unchecked exceptions because the compiler does not force the programmer to catch or declare them.',
    difficulty: 'Easy',
    type: 'conceptual',
    tags: ['unchecked-exceptions']
  },
  {
    id: 'exc-24',
    moduleId: 'java-exceptions',
    question: 'If you use try-with-resources, do you still need a finally block to close the resource?',
    options: [
      'Yes, try-with-resources does not close it automatically.',
      'No, the resource is automatically closed.',
      'Only if an exception is thrown.',
      'Only if it is a database connection.'
    ],
    correctAnswer: 1,
    explanation: 'The primary benefit of try-with-resources is that it automatically closes the resources, removing the need for a finally block to do so.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['try-with-resources', 'finally']
  },
  {
    id: 'exc-25',
    moduleId: 'java-exceptions',
    question: 'Which block executes when an exception is successfully caught and handled by a catch block?',
    options: [
      'Only the catch block.',
      'The catch block followed by the finally block (if present).',
      'The finally block, then the catch block.',
      'The rest of the try block, then the finally block.'
    ],
    correctAnswer: 1,
    explanation: 'When an exception is caught, the code inside the catch block executes, and then the finally block (if one exists) executes afterward.',
    difficulty: 'Medium',
    type: 'conceptual',
    tags: ['try-catch-finally']
  }
];

