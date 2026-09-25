// ============================================================
// JAVA ENGINEERING, TESTING & DESIGN PATTERNS (Modules 32 - 34)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const ENGINEERING_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 32: Testing with JUnit 5 & Mockito ──────────────
  'java-testing': {
    intro: 'Automated testing guarantees that code functions correctly and prevents regression bugs. In Java enterprise development, JUnit 5 is the standard test framework, and Mockito is the mocking framework used to isolate unit tests from external dependencies.',
    keyConcepts: [
      { term: 'Unit Testing vs Integration Testing', definition: 'Unit tests verify individual methods in isolation using mocks (fast, milliseconds). Integration tests verify multiple components together with real databases/servers (e.g. @SpringBootTest).', example: '@Test vs @SpringBootTest' },
      { term: 'JUnit 5 Annotations', definition: '@Test, @BeforeEach (runs before each test), @AfterEach, @BeforeAll (static, once before class), @ParameterizedTest, @DisplayName.', example: '@Test void shouldCalculateTotal()' },
      { term: 'Assertions (org.junit.jupiter.api.Assertions)', definition: 'assertEquals(), assertTrue(), assertFalse(), assertNotNull(), assertThrows() for verifying expected exceptions.', example: 'assertEquals(expected, actual)' },
      { term: 'Mockito Mocks & Stubs', definition: 'Creating simulated objects with @Mock or mock(Class.class) and stubbing method behaviors using when(...).thenReturn(...).', example: 'when(userRepo.findById(1L)).thenReturn(Optional.of(user));' },
      { term: 'Mockito Verification', definition: 'Verifying that a mock method was actually invoked: verify(mock, times(1)).save(any());', example: 'verify(emailService, times(1)).sendWelcomeEmail(any());' },
      { term: '@InjectMocks', definition: 'Creates an instance of the class under test and automatically injects all fields annotated with @Mock into it.', example: '@InjectMocks private OrderService orderService;' },
    ],
    codeExamples: [
      {
        title: 'Unit Test with JUnit 5 and Mockito',
        code: `package com.example.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnUserWhenUserExists() {
        // Arrange
        User mockUser = new User(1L, "Alice");
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        // Act
        User result = userService.getUserById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("Alice", result.getName());
        verify(userRepository, times(1)).findById(1L);
    }
}`,
        output: 'PASSED: shouldReturnUserWhenUserExists() [12 ms]'
      }
    ],
    commonMistakes: [
      'Testing mock interactions instead of testing actual business logic behavior.',
      'Writing slow unit tests that connect to external network sockets or real databases instead of using mocks.',
    ],
    interviewTips: [
      '"What is the difference between @Mock and @Spy in Mockito?" -> @Mock creates a completely dummy object where all methods return default null/0 unless stubbed. @Spy creates a wrapper around a REAL object where real methods execute unless explicitly stubbed.',
    ],
    interviewQuestions: [
      { q: 'How do you test that a specific exception is thrown using JUnit 5?', a: 'Using Assertions.assertThrows(ExpectedException.class, () -> methodCall()). You can also inspect the returned exception instance to verify error messages or internal status codes.' },
    ],
    revisionPoints: [
      'JUnit 5: @Test, @BeforeEach, @ParameterizedTest, assertThrows',
      'Mockito: @Mock creates fake dependencies; @InjectMocks injects them',
      'Use when(...).thenReturn(...) to stub method calls',
      'verify(...) asserts that a mock method was called',
    ]
  },

  // ── MODULE 33: Design Patterns ─────────────────────────────
  'java-design-patterns': {
    intro: 'Design patterns are battle-tested, reusable architectural solutions to commonly occurring software design problems. The Gang of Four (GoF) classifies patterns into Creational, Structural, and Behavioral.',
    keyConcepts: [
      { term: 'Singleton Pattern (Creational)', definition: 'Ensures a class has only ONE instance and provides a global access point to it. Thread-safe implementation: Double-Checked Locking with volatile, or Enum Singleton.', example: 'Runtime.getRuntime()' },
      { term: 'Factory Pattern (Creational)', definition: 'Defines an interface for creating an object, but lets subclasses decide which concrete class to instantiate.', example: 'LoggerFactory.getLogger(Main.class)' },
      { term: 'Builder Pattern (Creational)', definition: 'Separates the construction of a complex object from its representation, allowing step-by-step object construction and avoiding telescoping constructors.', example: 'User.builder().name("A").age(25).build()' },
      { term: 'Adapter Pattern (Structural)', definition: 'Converts the interface of a class into another interface clients expect, enabling incompatible interfaces to collaborate.', example: 'Arrays.asList()' },
      { term: 'Strategy Pattern (Behavioral)', definition: 'Defines a family of interchangeable algorithms, encapsulates each one, and makes them selectable at runtime.', example: 'PaymentStrategy (CreditCard, PayPal, Crypto)' },
      { term: 'Observer Pattern (Behavioral)', definition: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.', example: 'Spring ApplicationListener, EventBus' },
    ],
    codeExamples: [
      {
        title: 'Thread-Safe Double-Checked Locking Singleton & Builder Pattern',
        code: `public class DatabaseConnection {
    // volatile ensures memory visibility across CPU caches
    private static volatile DatabaseConnection instance;

    // Private constructor prevents external instantiation
    private DatabaseConnection() {
        System.out.println("DatabaseConnection instance created!");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) { // 1st check (no lock overhead)
            synchronized (DatabaseConnection.class) {
                if (instance == null) { // 2nd check (with lock)
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public static void main(String[] args) {
        DatabaseConnection c1 = DatabaseConnection.getInstance();
        DatabaseConnection c2 = DatabaseConnection.getInstance();
        System.out.println("Same instance: " + (c1 == c2)); // true
    }
}`,
        output: `DatabaseConnection instance created!
Same instance: true`
      }
    ],
    commonMistakes: [
      'Implementing Singleton without volatile, leading to race conditions where another thread sees a half-initialized object.',
      'Over-engineering and applying design patterns where simple procedural code would suffice.',
    ],
    interviewTips: [
      '"What is the safest way to implement a Singleton in Java?" -> Using an Enum Singleton (public enum Singleton { INSTANCE; }), because the JVM guarantees thread safety, reflection immunity, and serialization safety automatically.',
    ],
    interviewQuestions: [
      { q: 'Explain the Builder pattern and when you would use it.', a: 'The Builder pattern constructs complex objects step-by-step using a fluent method-chaining API. It is used when an object has many attributes (especially optional ones), avoiding confusing constructors with dozens of arguments ("telescoping constructor anti-pattern") and ensuring immutability.' },
    ],
    revisionPoints: [
      'Singleton: only one instance; use Enum or volatile double-checked locking',
      'Builder: solves telescoping constructors with fluent API',
      'Factory: decouples object creation from client code',
      'Strategy: encapsulates interchangeable algorithms',
    ]
  },

  // ── MODULE 34: Clean Code & SOLID Principles ────────────────
  'java-clean-code': {
    intro: 'Clean code is readable, maintainable, modular, and easy to test. The 5 SOLID design principles established by Robert C. Martin form the gold standard for object-oriented software engineering.',
    keyConcepts: [
      { term: 'S - Single Responsibility Principle (SRP)', definition: 'A class should have one, and only one, reason to change. Each class should focus on a single job (e.g. separate OrderRepository from OrderInvoiceGenerator).', example: 'Don\'t combine business logic and DB queries in one class' },
      { term: 'O - Open/Closed Principle (OCP)', definition: 'Software entities should be OPEN for extension, but CLOSED for modification. Add new features by adding new classes, not altering existing tested code.', example: 'Use interfaces and polymorphism' },
      { term: 'L - Liskov Substitution Principle (LSP)', definition: 'Subtypes must be substitutable for their base types without altering program correctness. A subclass should not break the contracts expected by the superclass.', example: 'Classic Square extending Rectangle violation' },
      { term: 'I - Interface Segregation Principle (ISP)', definition: 'Clients should not be forced to depend upon interfaces they do not use. Split fat interfaces into smaller, role-specific interfaces.', example: 'Printable and Faxable instead of MultiFunctionMachine' },
      { term: 'D - Dependency Inversion Principle (DIP)', definition: 'High-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.', example: 'OrderService depends on PaymentInterface, not PayPalService' },
      { term: 'DRY & KISS', definition: 'DRY (Don\'t Repeat Yourself): avoid duplication. KISS (Keep It Simple, Stupid): prioritize simplicity over clever over-engineering.', example: 'Clean, self-explanatory code' },
    ],
    codeExamples: [
      {
        title: 'Open/Closed and Dependency Inversion in Action',
        code: `// Abstraction (DIP)
interface DiscountStrategy {
    double applyDiscount(double amount);
}

// Open for extension: new discounts can be added without modifying OrderCalculator
class FestivalDiscount implements DiscountStrategy {
    public double applyDiscount(double amount) { return amount * 0.85; }
}

class VipDiscount implements DiscountStrategy {
    public double applyDiscount(double amount) { return amount * 0.80; }
}

// High-level module depends on abstraction (DIP & OCP)
class OrderCalculator {
    private final DiscountStrategy discountStrategy;

    public OrderCalculator(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public double calculateTotal(double amount) {
        return discountStrategy.applyDiscount(amount);
    }
}

public class SolidDemo {
    public static void main(String[] args) {
        OrderCalculator calc = new OrderCalculator(new FestivalDiscount());
        System.out.println("Final total: $" + calc.calculateTotal(100.0));
    }
}`,
        output: 'Final total: $85.0'
      }
    ],
    commonMistakes: [
      'Creating "God Classes" with thousands of lines doing database, business logic, validation, and presentation.',
      'Violating LSP by throwing UnsupportedOperationException in overridden subclass methods.',
    ],
    interviewTips: [
      '"Can you recite and explain all 5 SOLID principles with examples?" -> Practice explaining each letter (S, O, L, I, D) with a concrete 30-second example.',
    ],
    interviewQuestions: [
      { q: 'What is the Liskov Substitution Principle (LSP) and what is the classic violation example?', a: 'LSP states that any subclass must be usable wherever its parent class is expected without breaking functionality. The classic violation is Square extending Rectangle: if you resize width on a Square, height must also change, violating the expectations of a Rectangle caller where width and height can change independently.' },
    ],
    revisionPoints: [
      'S: One class, one responsibility',
      'O: Open for extension, closed for modification',
      'L: Subclasses must fulfill superclass contracts',
      'I: Smaller, specific interfaces over fat interfaces',
      'D: Depend on abstractions, not concrete classes',
    ]
  },
};
