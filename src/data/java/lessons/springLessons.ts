// ============================================================
// JAVA SPRING & MICROSERVICES LESSONS (Modules 27 - 31)
// ============================================================

import { JavaLessonData } from './basicsLessons';

export const SPRING_LESSONS: Record<string, JavaLessonData> = {
  // ── MODULE 27: Spring Core & IoC ───────────────────────────
  'java-spring': {
    intro: 'The Spring Framework is the industry-standard enterprise Java framework. Its foundation is built upon Inversion of Control (IoC) and Dependency Injection (DI), which decouple object creation and lifecycle management from business logic.',
    keyConcepts: [
      { term: 'Inversion of Control (IoC)', definition: 'Design principle where control over object creation, configuration, and lifecycle is inverted from the application code to a central container (IoC Container / ApplicationContext).', example: 'Framework calls your code, not vice-versa' },
      { term: 'Dependency Injection (DI)', definition: 'Pattern implementing IoC where dependencies are injected into a class rather than the class instantiating them itself. 3 types: Constructor injection (recommended), Setter injection, and Field injection (@Autowired).', example: 'public OrderService(PaymentService paymentService)' },
      { term: 'Spring Beans', definition: 'Objects instantiated, assembled, and managed by the Spring IoC container.', example: '@Component, @Service, @Repository, @Configuration' },
      { term: 'Bean Scopes', definition: 'Singleton (default: 1 shared instance per container), Prototype (new instance on every request), Request (1 per HTTP request), Session (1 per HTTP session).', example: '@Scope("prototype")' },
      { term: 'Stereotype Annotations', definition: '@Component (generic bean), @Service (service business layer), @Repository (DAO layer, translates DB exceptions to Spring DataAccessException), @Controller / @RestController (web presentation layer).', example: '@Service public class UserService' },
    ],
    codeExamples: [
      {
        title: 'Constructor Dependency Injection in Spring',
        code: `package com.example.service;

import org.springframework.stereotype.Service;

@Service
public class OrderService {
    private final PaymentGateway paymentGateway; // Immutable dependency

    // Constructor Injection (Best Practice: no @Autowired required in Spring 4.3+)
    public OrderService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void checkout(String orderId, double amount) {
        System.out.println("Processing order: " + orderId);
        paymentGateway.charge(amount);
    }
}`,
        output: `Processing order: ORD-101
Charged: $150.0 via Gateway`,
        note: 'Constructor injection enables easy unit testing with mocks and guarantees immutability.'
      }
    ],
    commonMistakes: [
      'Using Field Injection (@Autowired private MyService myService) which hinders unit testing and violates immutability.',
      'Circular dependency (Bean A requires Bean B which requires Bean A) causing BeanCurrentlyInCreationException.',
    ],
    interviewTips: [
      '"Why is constructor injection preferred over field injection?" -> (1) Guarantees dependencies cannot be null, (2) allows fields to be marked final (immutable), (3) simplifies unit testing with Mockito without needing reflection or Spring context.',
    ],
    interviewQuestions: [
      { q: 'What is the difference between BeanFactory and ApplicationContext?', a: 'BeanFactory is the basic IoC container providing lazy bean loading and dependency injection. ApplicationContext extends BeanFactory with enterprise features: eager initialization, AOP integration, internationalization (i18n), and application event publishing.' },
    ],
    revisionPoints: [
      'IoC inverts object creation to Spring Container',
      'Always prefer Constructor Injection with final fields',
      'Default Bean scope is Singleton',
      '@Repository automatically translates database exceptions',
    ]
  },

  // ── MODULE 28: Spring Boot ─────────────────────────────────
  'java-spring-boot': {
    intro: 'Spring Boot simplifies Spring development by eliminating boilerplate XML/Java configuration through Opinionated Defaults, Starter POM dependencies, and Auto-Configuration, allowing developers to create production-ready applications rapidly.',
    keyConcepts: [
      { term: 'Auto-Configuration', definition: 'Spring Boot scans classpath libraries and conditionally configures Beans automatically (e.g. if H2 is on classpath and no DataSource bean is defined, it automatically configures an in-memory database).', example: '@EnableAutoConfiguration / @SpringBootApplication' },
      { term: '@SpringBootApplication', definition: 'Convenience annotation combining @Configuration (declares beans), @EnableAutoConfiguration (triggers auto-config), and @ComponentScan (scans current package and sub-packages).', example: 'SpringApplication.run(App.class, args);' },
      { term: 'Starter Dependencies', definition: 'Pre-packaged dependency descriptors aggregating compatible versions of libraries (e.g. spring-boot-starter-web bundles Tomcat, Jackson, Spring MVC).', example: 'spring-boot-starter-web' },
      { term: 'Embedded Web Server', definition: 'Spring Boot embeds Tomcat / Jetty / Undertow directly inside the runnable JAR file; no need to deploy external WAR files.', example: 'java -jar app.jar' },
      { term: 'Spring Boot Actuator', definition: 'Production-ready monitoring endpoints exposing application health, metrics, environment, and thread dumps.', example: '/actuator/health, /actuator/metrics' },
    ],
    codeExamples: [
      {
        title: 'Spring Boot Main Application and Custom Configuration',
        code: `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        // Launches embedded Tomcat on port 8080
        SpringApplication.run(Application.class, args);
        System.out.println("Spring Boot Application Started Successfully!");
    }
}`,
        output: 'Spring Boot Application Started Successfully! (Tomcat initialized on port 8080)'
      }
    ],
    commonMistakes: [
      'Placing classes outside the root package of @SpringBootApplication, causing @ComponentScan to miss your beans.',
      'Hardcoding configuration values instead of externalizing them in application.properties or application.yml.',
    ],
    interviewTips: [
      '"How does Spring Boot determine what to auto-configure?" -> Using @ConditionalOnClass, @ConditionalOnMissingBean, and @ConditionalOnProperty annotations inside auto-configuration classes found in spring.factories / AutoConfiguration.imports.',
    ],
    interviewQuestions: [
      { q: 'What are Spring Boot Profiles and how are they used?', a: 'Profiles provide a way to segregate application configuration (database URLs, API keys, credentials) for different environments like dev, test, and prod. Activated via spring.profiles.active=prod in application.properties or CLI arguments.' },
    ],
    revisionPoints: [
      '@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan',
      'Starters bundle compatible libraries and transitive dependencies',
      'Embedded Tomcat enables standalone executable JARs',
      'Actuator provides /actuator/health and monitoring endpoints',
    ]
  },

  // ── MODULE 29: REST APIs with Spring Boot ───────────────────
  'java-rest': {
    intro: 'REST (Representational State Transfer) is the architectural style for web APIs. In Spring Boot, REST APIs are built using Spring MVC with @RestController, handling JSON serialization, HTTP status codes, request validation, and global error handling.',
    keyConcepts: [
      { term: '@RestController', definition: 'Convenience annotation combining @Controller and @ResponseBody. Every action method automatically serializes the returned object into JSON/XML via Jackson.', example: '@RestController @RequestMapping("/api/v1/users")' },
      { term: 'HTTP Methods', definition: 'GET (Retrieve, Idempotent), POST (Create, Non-idempotent), PUT (Full Update/Replace, Idempotent), PATCH (Partial Update), DELETE (Remove, Idempotent).', example: '@GetMapping, @PostMapping, @PutMapping, @DeleteMapping' },
      { term: 'HTTP Status Codes', definition: '200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Error.', example: 'ResponseEntity.status(HttpStatus.CREATED).body(user)' },
      { term: 'DTO Pattern', definition: 'Data Transfer Object: Decouples internal database entities from external API request/response payloads to avoid exposing internal models.', example: 'UserRequestDTO, UserResponseDTO' },
      { term: 'Validation (@Valid)', definition: 'Declarative validation using Jakarta Bean Validation annotations: @NotNull, @NotBlank, @Size, @Email, @Min.', example: '@Valid @RequestBody UserDTO dto' },
      { term: 'Global Exception Handling', definition: 'Using @ControllerAdvice / @RestControllerAdvice with @ExceptionHandler to intercept all exceptions and return standard, structured error JSON responses.', example: '@ExceptionHandler(ResourceNotFoundException.class)' },
    ],
    codeExamples: [
      {
        title: 'Complete REST Controller with Validation and Response Entity',
        code: `package com.example.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

record UserDTO(
    @NotBlank(message = "Name cannot be blank") String name,
    @Email(message = "Invalid email format") String email
) {}

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDto) {
        // Return 201 Created with JSON body
        return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getUser(@PathVariable Long id) {
        if (id == 99) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok("User details for ID: " + id);
    }
}`,
        output: `HTTP/1.1 201 Created
Content-Type: application/json
{"name":"Alice","email":"alice@example.com"}`
      }
    ],
    commonMistakes: [
      'Returning raw database entities directly from controller endpoints instead of DTOs.',
      'Using HTTP GET methods for operations that modify database state.',
      'Returning HTTP 200 OK when a resource was newly created (should return 201 Created).',
    ],
    interviewTips: [
      '"What is the difference between PUT and PATCH?" -> PUT replaces the entire resource representation (idempotent). PATCH applies partial modifications to specific fields.',
    ],
    interviewQuestions: [
      { q: 'How do you handle exceptions globally in Spring Boot REST APIs?', a: 'By creating a centralized class annotated with @RestControllerAdvice. Inside, methods annotated with @ExceptionHandler(CustomException.class) catch specific application exceptions and return standardized ErrorResponse DTOs with appropriate HTTP status codes.' },
    ],
    revisionPoints: [
      '@RestController = @Controller + @ResponseBody',
      'Use proper HTTP Status Codes (200, 201, 400, 404, 500)',
      'Use DTOs with @Valid for request/response payloads',
      '@RestControllerAdvice enables clean global error handling',
    ]
  },

  // ── MODULE 30: Spring Data JPA & Hibernate ──────────────────
  'java-jpa': {
    intro: 'JPA (Jakarta Persistence API) is the standard specification for Object-Relational Mapping (ORM) in Java; Hibernate is the most popular JPA implementation. Spring Data JPA simplifies data access further by generating repository queries automatically from interface method names.',
    keyConcepts: [
      { term: 'ORM (Object-Relational Mapping)', definition: 'Bridging the impedance mismatch between object-oriented models in Java and relational tables/rows in RDBMS.', example: '@Entity class User maps to table "users"' },
      { term: 'Entity Annotations', definition: '@Entity (marks JPA entity), @Table (table name), @Id (primary key), @GeneratedValue (auto-increment strategy), @Column.', example: '@Id @GeneratedValue(strategy = GenerationType.IDENTITY)' },
      { term: 'Entity Relationships', definition: '@OneToOne, @OneToMany, @ManyToOne, @ManyToMany. The entity with the foreign key is the owning side.', example: '@ManyToOne @JoinColumn(name = "dept_id")' },
      { term: 'FetchType: LAZY vs EAGER', definition: 'LAZY: Associated child entities are loaded on-demand when accessed (prevents unnecessary DB reads). EAGER: Loaded immediately via JOIN (can trigger performance issues).', example: '@ManyToOne(fetch = FetchType.LAZY)' },
      { term: 'N+1 Query Problem', definition: 'Fires 1 query to fetch N parent records, and then executes N individual queries to fetch children. Solved using "JOIN FETCH" or "@EntityGraph".', example: 'SELECT DISTINCT p FROM Parent p JOIN FETCH p.children' },
      { term: 'Spring Data Repositories', definition: 'Interfaces extending JpaRepository<Entity, ID> automatically provide CRUD, pagination, and query generation from method names.', example: 'List<User> findByEmailEndingWith(String domain);' },
    ],
    codeExamples: [
      {
        title: 'Spring Data JPA Repository with Custom JPQL Query',
        code: `package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

// JpaRepository provides save(), findById(), delete(), findAll(), etc.
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Derived Query from method name
    List<Product> findByCategoryIgnoreCase(String category);

    // Custom JPQL Query with JOIN FETCH to solve N+1 Problem
    @Query("SELECT p FROM Product p JOIN FETCH p.reviews WHERE p.price <= :maxPrice")
    List<Product> findAffordableWithReviews(@Param("maxPrice") double maxPrice);
}`,
        output: `Hibernate: select p1_0.id,p1_0.name,r1_0.id,r1_0.comment 
from products p1_0 join reviews r1_0 on p1_0.id=r1_0.product_id 
where p1_0.price <= 50.0`,
        note: 'JOIN FETCH retrieves both parent and children in a single SQL query.'
      }
    ],
    commonMistakes: [
      'Using FetchType.EAGER on @OneToMany relationships, leading to catastrophic memory overhead and N+1 queries.',
      'Calling Lazy-loaded child associations outside of an active @Transactional session, triggering LazyInitializationException.',
    ],
    interviewTips: [
      '"How do you solve the N+1 problem in Hibernate?" -> (1) Use JOIN FETCH in JPQL, (2) Use @EntityGraph annotation over repository methods, (3) Configure batch-size with @BatchSize(size = 25).',
    ],
    interviewQuestions: [
      { q: 'What is the purpose of @Transactional in Spring Boot?', a: 'It defines the scope of a single database transaction. If the annotated method completes successfully, Spring commits the transaction. If an unchecked RuntimeException (or configured checked exception) is thrown, Spring automatically rolls back all database operations.' },
    ],
    revisionPoints: [
      'JPA is specification; Hibernate is implementation',
      'Always default to FetchType.LAZY on collections',
      'Solve N+1 query problem with JOIN FETCH or @EntityGraph',
      'JpaRepository generates queries automatically from method signatures',
    ]
  },

  // ── MODULE 31: Spring Security & JWT ────────────────────────
  'java-security': {
    intro: 'Spring Security is the powerful and customizable authentication and access-control framework for Java applications. It protects web endpoints using a Filter Chain architecture and secures REST APIs using JSON Web Tokens (JWT).',
    keyConcepts: [
      { term: 'Authentication vs Authorization', definition: 'Authentication: Verifying identity ("Who are you?"). Authorization: Verifying permissions ("What are you allowed to do?").', example: 'Auth: Username/Password; Authz: Has ROLE_ADMIN' },
      { term: 'SecurityFilterChain', definition: 'A chain of Servlet Filters that intercept incoming HTTP requests to validate credentials, decode tokens, and verify URL permissions.', example: 'http.authorizeHttpRequests(...).build()' },
      { term: 'JWT (JSON Web Token)', definition: 'Stateless authentication token containing Header, Payload (claims like username, roles, expiration), and Cryptographic Signature (HMAC/RSA).', example: 'Header.Payload.Signature' },
      { term: 'Password Hashing (BCrypt)', definition: 'One-way cryptographic hash with built-in salting and work factor, ensuring passwords are never stored in plaintext.', example: 'new BCryptPasswordEncoder().encode(rawPassword)' },
      { term: 'CORS & CSRF', definition: 'CORS (Cross-Origin Resource Sharing): controls frontend domains allowed to call your API. CSRF (Cross-Site Request Forgery): disabled for stateless JWT REST APIs.', example: 'http.csrf(csrf -> csrf.disable())' },
    ],
    codeExamples: [
      {
        title: 'Modern Spring Security 6+ SecurityFilterChain Configuration',
        code: `package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable()) // Disabled for stateless REST APIs
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // 10 rounds of hashing
    }
}`,
        output: 'SecurityFilterChain configured: /api/auth/** permitAll; /api/admin/** requires ADMIN role; Session: Stateless'
      }
    ],
    commonMistakes: [
      'Storing passwords in plain text or using outdated algorithms like MD5 / SHA-1 instead of BCrypt.',
      'Keeping CSRF enabled on stateless JWT APIs where no cookies or sessions are used.',
    ],
    interviewTips: [
      '"How does JWT-based stateless authentication work?" -> User logs in with credentials -> Server validates and signs a JWT -> Client saves JWT -> Client sends "Authorization: Bearer <token>" in subsequent HTTP headers -> Server validates token signature without querying session memory.',
    ],
    interviewQuestions: [
      { q: 'Explain how the Spring Security Filter Chain works.', a: 'When an HTTP request arrives, it passes through a sequence of pre-configured security filters (such as SecurityContextPersistenceFilter, UsernamePasswordAuthenticationFilter, and BearerTokenAuthenticationFilter). Each filter inspects headers, establishes the SecurityContextHolder if authenticated, checks authorities, or rejects with 401/403.' },
    ],
    revisionPoints: [
      'Authentication = Identity; Authorization = Permissions',
      'Use BCryptPasswordEncoder for secure salted password hashing',
      'JWT enables stateless REST authentication via Bearer token',
      'Stateless APIs disable CSRF and use SessionCreationPolicy.STATELESS',
    ]
  },
};
