import os

def q(id, mod, q_str, ans, f_ups, k_pts, diff, q_type, tags):
    return {
        'id': id, 'moduleId': mod, 'question': q_str, 'expectedAnswer': ans,
        'followUps': f_ups, 'keyPoints': k_pts, 'difficulty': diff,
        'type': q_type, 'tags': tags
    }

questions2 = [
    q('j3-1', 'spring-boot', 'What is Spring Framework? What problem does it solve?',
      'Spring Framework is a powerful, open-source application framework for Java. It simplifies enterprise Java development by providing infrastructure support, allowing developers to focus on business logic rather than plumbing. Its core features, like Dependency Injection and Inversion of Control, decouple components, making applications easier to test, maintain, and scale.',
      ['What is the core container in Spring?', 'How does Spring help with testing?'],
      ['Simplifies enterprise development', 'Provides Dependency Injection', 'Reduces boilerplate code', 'Promotes loose coupling'],
      'Easy', 'definition', ['spring', 'basics']),
    q('j3-2', 'spring-boot', 'What is Inversion of Control (IoC)?',
      'Inversion of Control (IoC) is a design principle where the control of object creation and lifecycle management is transferred from the application code to a container or framework. In Spring, the IoC container instantiates, configures, and manages the objects (beans), reducing tight coupling and making the system more modular.',
      ['What is the Spring IoC container?', 'How is IoC related to DI?'],
      ['Transfers control to framework', 'Manages bean lifecycle', 'Promotes loose coupling', 'Core principle of Spring'],
      'Medium', 'definition', ['spring', 'ioc']),
    q('j3-3', 'spring-boot', 'What is Dependency Injection? Types of DI?',
      'Dependency Injection (DI) is a pattern used to implement IoC, where an object receives its dependencies from external sources rather than creating them itself. Spring supports three main types: Constructor Injection (dependencies passed via constructor, recommended), Setter Injection (via setter methods), and Field Injection (via @Autowired on fields, generally discouraged).',
      ['Why is Constructor Injection preferred over Field Injection?', 'Can you use multiple DI types together?'],
      ['Implements IoC', 'Constructor Injection (best practice)', 'Setter Injection', 'Field Injection (not recommended)'],
      'Medium', 'definition', ['spring', 'di']),
    q('j3-4', 'spring-boot', 'What is the difference between @Component, @Service, @Repository, @Controller?',
      '@Component is a generic stereotype annotation for any Spring-managed component. @Service, @Repository, and @Controller are specializations of @Component. @Service indicates business logic. @Repository indicates data access logic and translates database exceptions into Spring exceptions. @Controller indicates a presentation layer bean handling web requests.',
      ['Can I use @Component instead of @Service?', 'What special feature does @Repository provide?'],
      ['@Component is generic', '@Service for business logic', '@Repository for data access / exception translation', '@Controller for web endpoints'],
      'Medium', 'difference', ['spring', 'annotations']),
    q('j3-5', 'spring-boot', 'What is Spring Boot? How is it different from Spring?',
      'Spring Boot is an extension of the Spring Framework designed to simplify the setup and development of Spring applications. While Spring requires extensive configuration (XML or Java configs), Spring Boot provides opinionated defaults, auto-configuration, and embedded servers (like Tomcat), allowing developers to create standalone apps with minimal setup.',
      ['Does Spring Boot replace Spring?', 'What is meant by "opinionated defaults"?'],
      ['Extension of Spring', 'Opinionated defaults', 'Auto-configuration', 'Embedded web servers'],
      'Easy', 'difference', ['springboot', 'basics']),
    q('j3-6', 'spring-boot', 'What is Spring Boot auto-configuration?',
      'Auto-configuration automatically configures a Spring application based on the dependencies present in the classpath. For example, if H2 database is on the classpath, Spring Boot automatically configures an in-memory database. It is enabled by the @EnableAutoConfiguration annotation (usually via @SpringBootApplication).',
      ['How can you disable a specific auto-configuration?', 'How does it know what to configure?'],
      ['Configures based on classpath', 'Reduces manual configuration', 'Enabled by @EnableAutoConfiguration', 'Can be customized or overridden'],
      'Medium', 'how', ['springboot', 'autoconfig']),
    q('j3-7', 'spring-boot', 'What are Spring Boot starters?',
      'Spring Boot starters are pre-configured dependency descriptors that bundle related dependencies together. For example, `spring-boot-starter-web` includes everything needed for web development (Spring MVC, Jackson, embedded Tomcat). They simplify dependency management in Maven or Gradle by reducing the need to specify multiple individual dependencies.',
      ['Name a few common starters.', 'Can you create your own custom starter?'],
      ['Bundled dependencies', 'Simplifies Maven/Gradle files', 'spring-boot-starter-web', 'spring-boot-starter-data-jpa'],
      'Easy', 'definition', ['springboot', 'starters']),
    q('j3-8', 'spring-boot', 'What is application.properties used for?',
      'application.properties (or application.yml) is a centralized configuration file in Spring Boot. It is used to define application-specific settings like server port, database connections, logging levels, and custom properties. Spring Boot automatically loads this file at startup to configure the application environment.',
      ['How do you read a property from this file in code?', 'What is the YAML alternative?'],
      ['Centralized configuration', 'Sets server.port, DB credentials', 'Can use YAML format', 'Loaded automatically on startup'],
      'Easy', 'why', ['springboot', 'config']),
    q('j3-9', 'spring-boot', 'What is a Spring Boot profile?',
      'Profiles provide a way to segregate application configurations and activate them for specific environments (e.g., dev, test, prod). You can create files like `application-dev.properties` and activate the profile using a command-line argument or environment variable (`spring.profiles.active=dev`). This allows running the same code with different settings.',
      ['How do you set the active profile?', 'Can you use @Profile on a bean?'],
      ['Environment specific configuration', 'application-{profile}.properties', 'spring.profiles.active', 'Useful for dev/test/prod separation'],
      'Medium', 'definition', ['springboot', 'profiles']),
    q('j3-10', 'spring-boot', 'What is @RestController vs @Controller?',
      '@Controller is a standard Spring MVC annotation used to define a web controller that returns views (like HTML/JSP). @RestController is a convenience annotation that combines @Controller and @ResponseBody, meaning every method in the class automatically serializes the return object into the HTTP response body (usually as JSON), which is ideal for REST APIs.',
      ['Can @Controller return JSON?', 'What does @ResponseBody do?'],
      ['@RestController = @Controller + @ResponseBody', '@Controller returns views', '@RestController returns data (JSON)', 'Used for REST APIs'],
      'Medium', 'difference', ['spring', 'mvc']),
    q('j3-11', 'spring-boot', 'What is @RequestMapping, @GetMapping, @PostMapping?',
      '@RequestMapping maps web requests to specific controller methods or classes based on URL and HTTP method. @GetMapping and @PostMapping are composed annotations introduced in Spring 4.3 that act as shortcuts for @RequestMapping(method = RequestMethod.GET) and POST, making the code more readable and concise.',
      ['Can @RequestMapping be used at the class level?', 'What about PUT and DELETE methods?'],
      ['Maps URLs to methods', '@GetMapping is for HTTP GET', '@PostMapping is for HTTP POST', 'Improves code readability'],
      'Easy', 'definition', ['spring', 'mvc']),
    q('j3-12', 'spring-boot', 'What are path variables and query parameters?',
      'Path variables are values extracted from the URL path (e.g., /users/{id}) using @PathVariable, typically used to identify specific resources. Query parameters are key-value pairs appended to the end of a URL after a question mark (e.g., /users?role=admin) using @RequestParam, typically used for filtering, sorting, or optional data.',
      ['When should you use a path variable vs query parameter?', 'Is a path variable optional?'],
      ['@PathVariable extracts from URL path', '@RequestParam extracts from URL query', 'Path variables for identifying resources', 'Query params for filtering/sorting'],
      'Medium', 'difference', ['spring', 'mvc']),
    q('j3-13', 'spring-boot', 'What are HTTP status codes? (200, 201, 400, 401, 403, 404, 500)',
      'HTTP status codes indicate the result of a request. 200 OK (success), 201 Created (resource created successfully). 400 Bad Request (client error/invalid syntax), 401 Unauthorized (missing/invalid authentication), 403 Forbidden (authenticated but lacks permissions), 404 Not Found (resource doesn\'t exist). 500 Internal Server Error (server crashed or unexpected error).',
      ['What is the difference between 401 and 403?', 'Which code represents a server error?'],
      ['2xx Success', '4xx Client Error', '5xx Server Error', '401 Unauthorized vs 403 Forbidden'],
      'Easy', 'definition', ['rest', 'http']),
    q('j3-14', 'spring-boot', 'What is a DTO? Why use DTOs?',
      'A Data Transfer Object (DTO) is an object used to encapsulate data and send it from one subsystem of an application to another. DTOs are used to hide implementation details (like entity structures) from external clients, reduce the amount of data transferred, and prevent issues like infinite recursion when serializing bi-directional entity relationships.',
      ['What is the difference between a DTO and an Entity?', 'How do you map Entities to DTOs?'],
      ['Data Transfer Object', 'Hides entity structure from client', 'Reduces payload size', 'Prevents serialization loops'],
      'Medium', 'why', ['rest', 'architecture']),
    q('j3-15', 'spring-boot', 'How do you validate a request body in Spring Boot?',
      'You validate a request body by annotating the DTO fields with validation annotations like @NotNull, @NotBlank, @Size, or @Email from the Jakarta Bean Validation API. Then, you place the @Valid annotation next to the @RequestBody parameter in the controller method. If validation fails, a MethodArgumentNotValidException is thrown.',
      ['What happens if validation fails?', 'How do you customize the error message?'],
      ['Use Jakarta Validation annotations', '@Valid on @RequestBody', 'Throws MethodArgumentNotValidException', 'Improves API robustness'],
      'Medium', 'how', ['spring', 'validation']),
    q('j3-16', 'spring-boot', 'What is @Autowired and how does it work?',
      '@Autowired is an annotation used by Spring to automatically inject dependencies into beans. When Spring context is initialized, it scans for beans and resolves dependencies based on type. It can be applied to constructors, fields, or setter methods. If multiple beans of the same type exist, @Qualifier can be used to specify which one to inject.',
      ['What happens if no bean is found for @Autowired?', 'What is @Qualifier used for?'],
      ['Automatic dependency injection', 'Injects by type', 'Use @Qualifier for ambiguities', 'Can be optional with required=false'],
      'Medium', 'how', ['spring', 'di']),
    q('j3-17', 'spring-boot', 'What is the difference between Singleton, Prototype, Request scope in Spring?',
      'Bean scopes define the lifecycle and visibility of a bean. Singleton (default) creates one instance per Spring container. Prototype creates a new instance every time the bean is requested. Request scope creates a new instance for every HTTP request (web applications only).',
      ['Are singleton beans thread-safe?', 'When would you use a prototype bean?'],
      ['Singleton: one instance per container', 'Prototype: new instance per request', 'Request: one instance per HTTP request', 'Singleton is the default scope'],
      'Medium', 'difference', ['spring', 'beans']),
    q('j3-18', 'spring-boot', 'What is Spring Data JPA?',
      'Spring Data JPA is part of the larger Spring Data family that makes it easy to implement JPA-based repositories. It significantly reduces boilerplate code by allowing developers to write repository interfaces (extending JpaRepository). Spring dynamically provides the implementation at runtime, handling CRUD operations and custom query methods automatically.',
      ['What is JpaRepository?', 'How does it generate queries from method names?'],
      ['Simplifies data access layer', 'Extends JpaRepository', 'Auto-generates CRUD operations', 'Derived query methods'],
      'Medium', 'definition', ['springdata', 'jpa']),
    q('j3-19', 'spring-boot', 'What is Hibernate? How is it related to JPA?',
      'JPA (Jakarta Persistence API) is a specification or set of rules defining object-relational mapping (ORM) in Java. Hibernate is an actual implementation of the JPA specification. While you can use JPA annotations (like @Entity), underneath, Hibernate is the engine doing the actual work of mapping objects to database tables and executing SQL.',
      ['Can you use Hibernate without JPA?', 'What is ORM?'],
      ['JPA is a specification (rules)', 'Hibernate is the implementation (engine)', 'Hibernate provides ORM', 'Reduces manual SQL writing'],
      'Medium', 'difference', ['jpa', 'hibernate']),
    q('j3-20', 'spring-boot', 'What is @Entity? What is @Id?',
      '@Entity marks a Java class as a JPA entity, meaning it maps to a table in the database. @Id marks a field in the entity as the primary key of that table. Typically, @Id is accompanied by @GeneratedValue to indicate how the primary key values are automatically generated (e.g., Identity, Sequence).',
      ['Can an Entity have no @Id?', 'What is the difference between GenerationType.IDENTITY and AUTO?'],
      ['@Entity maps class to table', '@Id maps field to primary key', 'Requires no-args constructor', 'Often uses @GeneratedValue'],
      'Easy', 'definition', ['jpa', 'annotations']),
    q('j3-21', 'spring-boot', 'What are the JPA relationship types? (@OneToMany etc.)',
      'JPA defines annotations to represent relational database associations: @OneToOne (1 to 1 mapping), @OneToMany (1 record maps to many), @ManyToOne (many records map to 1), and @ManyToMany (many records map to many). These annotations define how tables join together and how foreign keys are managed.',
      ['Which side should own the relationship in bidirectional associations?', 'What is the mappedBy attribute?'],
      ['@OneToOne, @OneToMany, @ManyToOne, @ManyToMany', 'Represent DB foreign keys', 'mappedBy indicates inverse side', 'Defines object relationships'],
      'Medium', 'definition', ['jpa', 'relationships']),
    q('j3-22', 'spring-boot', 'What is lazy loading vs eager loading?',
      'Eager loading fetches all related entities immediately when the parent entity is queried, which can cause performance issues if datasets are huge. Lazy loading delays the fetching of related entities until they are explicitly accessed via a getter method. In JPA, ToMany relationships are Lazy by default, while ToOne relationships are Eager by default.',
      ['What is LazyInitializationException?', 'How do you change the fetch type?'],
      ['Eager fetches immediately', 'Lazy fetches on-demand', 'Lazy saves memory/DB calls', 'Can cause LazyInitializationException'],
      'Medium', 'difference', ['jpa', 'performance']),
    q('j3-23', 'spring-boot', 'What is the N+1 problem in JPA?',
      'The N+1 problem occurs when an application executes 1 query to retrieve a list of N parent entities, and then executes N additional queries to fetch their lazily-loaded child entities. This results in N+1 total queries, severely degrading database performance. It is usually solved using JOIN FETCH in JPQL or Entity Graphs.',
      ['How do you fix the N+1 problem?', 'Does eager loading prevent N+1?'],
      ['1 query for parents, N queries for children', 'Major performance killer', 'Solved via JOIN FETCH', 'Solved via EntityGraph'],
      'Hard', 'debugging', ['jpa', 'performance']),
    q('j3-24', 'spring-boot', 'What is JPQL?',
      'JPQL (Java Persistence Query Language) is an object-oriented query language defined as part of JPA. It is similar to SQL but operates against entity objects and their attributes rather than database tables and columns. This makes JPQL database-agnostic, meaning the same query works on MySQL, PostgreSQL, etc.',
      ['How is JPQL different from native SQL?', 'What is @Query annotation used for?'],
      ['Object-oriented query language', 'Queries entities, not tables', 'Database agnostic', 'Used inside @Query'],
      'Medium', 'definition', ['jpa', 'queries']),
    q('j3-25', 'spring-boot', 'What is SQL? What is RDBMS?',
      'SQL (Structured Query Language) is the standard language used to interact with databases for managing and querying data. RDBMS (Relational Database Management System) is a database system that stores data in structured tables with rows and columns, and enforces relationships between tables (e.g., MySQL, PostgreSQL, Oracle).',
      ['What is the difference between DDL and DML?', 'Name some popular RDBMS.'],
      ['SQL: language for databases', 'RDBMS: table-based database system', 'Enforces data integrity', 'Uses relational constraints'],
      'Easy', 'definition', ['sql', 'basics']),
    q('j3-26', 'spring-boot', 'Explain INNER JOIN vs LEFT JOIN.',
      'An INNER JOIN returns only the rows that have matching values in both tables being joined. A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table. If there is no match, the result will contain NULL values for the right table\'s columns.',
      ['What is a RIGHT JOIN?', 'When would you use a LEFT JOIN?'],
      ['INNER: matches in both tables only', 'LEFT: all from left, matches from right', 'LEFT fills missing right with NULL', 'Crucial for querying related data'],
      'Medium', 'difference', ['sql', 'joins']),
    q('j3-27', 'spring-boot', 'What is GROUP BY? How is HAVING different from WHERE?',
      'GROUP BY groups rows that have the same values into summary rows (like finding totals or averages). The WHERE clause filters rows BEFORE they are grouped. The HAVING clause was added because WHERE cannot be used with aggregate functions; HAVING filters groups AFTER they have been grouped by GROUP BY.',
      ['Can you use WHERE and HAVING in the same query?', 'Name 3 aggregate functions.'],
      ['GROUP BY aggregates data', 'WHERE filters before grouping', 'HAVING filters after grouping', 'HAVING works with aggregates (SUM, COUNT)'],
      'Medium', 'difference', ['sql', 'aggregates']),
    q('j3-28', 'spring-boot', 'Write a SQL query to find the second highest salary.',
      'A common way to find the second highest salary is to use a subquery: `SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)`. Alternatively, using LIMIT and OFFSET: `SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1`.',
      ['How to find the Nth highest salary?', 'What if there are multiple employees with the same top salary?'],
      ['Uses subquery with MAX', 'Can use ORDER BY and LIMIT/OFFSET', 'Common interview question', 'Handle duplicates appropriately'],
      'Medium', 'coding', ['sql', 'queries', 'coding']),
    q('j3-29', 'spring-boot', 'What is a database index? Why use it?',
      'A database index is a data structure (often a B-tree) that improves the speed of data retrieval operations on a table at the cost of additional storage space and slower writes (inserts/updates/deletes). It works similarly to an index in a book, allowing the database engine to quickly find rows without scanning the entire table.',
      ['What is the disadvantage of having too many indexes?', 'What is a primary key index?'],
      ['Speeds up read queries', 'Slows down write operations', 'Consumes extra disk space', 'Like a book index'],
      'Medium', 'why', ['sql', 'performance']),
    q('j3-30', 'spring-boot', 'What is database normalization? Explain 1NF, 2NF, 3NF.',
      'Normalization is the process of organizing data to reduce redundancy and improve integrity. 1NF ensures each column holds atomic values. 2NF ensures 1NF and that non-key columns fully depend on the entire primary key. 3NF ensures 2NF and that non-key columns depend ONLY on the primary key (no transitive dependencies).',
      ['What is denormalization and when is it used?', 'Why do we avoid redundancy?'],
      ['Reduces data redundancy', '1NF: Atomic values', '2NF: Full dependency on primary key', '3NF: No transitive dependencies'],
      'Hard', 'definition', ['sql', 'design']),
    q('j3-31', 'spring-boot', 'What is a transaction? What are ACID properties?',
      'A transaction is a sequence of database operations treated as a single logical unit of work. ACID properties guarantee transaction reliability: Atomicity (all or nothing succeeds), Consistency (database remains in a valid state), Isolation (concurrent transactions don\'t interfere), and Durability (committed data is permanently saved).',
      ['What does @Transactional do in Spring?', 'What is a transaction rollback?'],
      ['Logical unit of work', 'Atomicity: All or nothing', 'Consistency: Valid state', 'Isolation: No interference, Durability: Saved forever'],
      'Medium', 'definition', ['sql', 'transactions']),
    q('j3-32', 'spring-boot', 'Difference between DELETE and TRUNCATE.',
      'DELETE is a DML command used to remove specific rows from a table based on a WHERE clause; it logs individual row deletions and can be rolled back. TRUNCATE is a DDL command that quickly removes all rows from a table by deallocating the data pages; it is faster, cannot use a WHERE clause, and typically cannot be rolled back.',
      ['Which is faster and why?', 'Does TRUNCATE reset auto-increment counters?'],
      ['DELETE is DML, TRUNCATE is DDL', 'DELETE can be rolled back', 'TRUNCATE is faster', 'TRUNCATE removes all rows'],
      'Medium', 'difference', ['sql', 'commands']),
    q('j3-33', 'spring-boot', 'What is Spring Security?',
      'Spring Security is a powerful, highly customizable authentication and access-control framework for Java applications. It is the de-facto standard for securing Spring-based apps, providing comprehensive support for protecting against common vulnerabilities like CSRF, handling logins, and integrating with OAuth, JWT, and LDAP.',
      ['What is a SecurityFilterChain?', 'How do you secure specific endpoints?'],
      ['Authentication and Authorization framework', 'Protects against CSRF, Session Fixation', 'Highly customizable', 'Integrates easily with Spring Boot'],
      'Medium', 'definition', ['security', 'spring']),
    q('j3-34', 'spring-boot', 'What is JWT? How is it used for authentication?',
      'JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. In authentication, a server validates user credentials and issues a JWT. The client stores this token and sends it in the Authorization header of subsequent requests. The server verifies the token\'s signature without needing to look up a session in the database.',
      ['What are the three parts of a JWT?', 'Is JWT encrypted or just encoded?'],
      ['Stateless authentication', 'Header, Payload, Signature', 'Client sends in Authorization header', 'No server-side session required'],
      'Medium', 'how', ['security', 'jwt']),
    q('j3-35', 'spring-boot', 'What is CORS?',
      'Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers that blocks web pages from making requests to a different domain than the one that served the web page. In Spring Boot, you must configure CORS (e.g., using @CrossOrigin) to explicitly allow your frontend application to communicate with your backend API.',
      ['Why do browsers enforce CORS?', 'How do you configure global CORS in Spring?'],
      ['Browser security feature', 'Prevents unauthorized cross-origin requests', 'Configured via @CrossOrigin', 'Uses OPTIONS preflight requests'],
      'Medium', 'definition', ['security', 'web']),
    q('j3-36', 'spring-boot', 'What is the difference between authentication and authorization?',
      'Authentication is the process of verifying WHO a user is (e.g., logging in with a username and password). Authorization is the process of verifying WHAT a user is allowed to do (e.g., checking if the logged-in user has the "ADMIN" role to access a specific endpoint). Authentication precedes authorization.',
      ['What HTTP status code is for failed authentication?', 'Give an example of authorization.'],
      ['Authentication = Identity verification', 'Authorization = Permission checking', '401 for AuthN failure', '403 for AuthZ failure'],
      'Easy', 'difference', ['security', 'basics']),
    q('j3-37', 'spring-boot', 'What is a RESTful API? Principles of REST?',
      'REST (Representational State Transfer) is an architectural style for designing networked applications. Key principles include: client-server separation, statelessness (each request contains all needed info), cacheability, uniform interface (using standard HTTP methods like GET, POST, PUT, DELETE), and layered system architecture.',
      ['What does stateless mean in REST?', 'Is REST a protocol or an architectural style?'],
      ['Architectural style, not protocol', 'Statelessness', 'Uses standard HTTP methods', 'Client-Server architecture'],
      'Medium', 'definition', ['rest', 'architecture']),
    q('j3-38', 'spring-boot', 'What is the difference between PUT and PATCH?',
      'Both are HTTP methods used to update resources. PUT replaces the entire resource with the newly provided data (idempotent). PATCH applies partial modifications to a resource, updating only the fields provided in the request body without affecting the rest of the resource.',
      ['What does idempotent mean?', 'Which one requires sending the full object state?'],
      ['PUT is for full replacement', 'PATCH is for partial update', 'PUT is strictly idempotent', 'PATCH saves bandwidth'],
      'Medium', 'difference', ['rest', 'http']),
    q('j3-39', 'spring-boot', 'What is Actuator in Spring Boot?',
      'Spring Boot Actuator is a sub-project that provides built-in production-ready features. It exposes operational endpoints (like /actuator/health, /actuator/metrics, /actuator/env) that allow you to monitor and manage your application, view application health, check memory usage, and gather metrics without writing custom code.',
      ['Are actuator endpoints secure by default?', 'What does the /health endpoint do?'],
      ['Production-ready monitoring', 'Exposes health, metrics, env data', 'Endpoints like /actuator/health', 'Needs to be secured in production'],
      'Medium', 'definition', ['springboot', 'actuator']),
    q('j3-40', 'spring-boot', 'What is Exception Handling in Spring Boot? (@ControllerAdvice, @ExceptionHandler)',
      '@ControllerAdvice allows you to handle exceptions globally across the whole application, acting as an interceptor for exceptions thrown by any @Controller. Combined with @ExceptionHandler methods inside it, you can catch specific exceptions (like EntityNotFoundException) and translate them into consistent, structured HTTP error responses.',
      ['Why use global exception handling?', 'How do you return a custom error JSON?'],
      ['Global error handling', '@ControllerAdvice intercepts all controllers', '@ExceptionHandler handles specific errors', 'Creates consistent API error responses'],
      'Medium', 'how', ['springboot', 'exceptions'])
]

questions3 = [
    q('jt-1', 'java-traps', 'String Pool Trap: == vs .equals()',
      'If you write `String s1 = "A"; String s2 = "A";`, `s1 == s2` is true because both refer to the same object in the String Pool. However, `String s3 = new String("A");`, `s1 == s3` is false because new String() forces creation of a new object in heap memory. Always use .equals() to avoid this trap.',
      ['What happens if you use intern() on s3?', 'Why does Java have a String Pool?'],
      ['Literals go to String Pool', 'new String() goes to Heap', '== compares references', 'Always use .equals() for Strings'],
      'Medium', 'debugging', ['strings', 'traps']),
    q('jt-2', 'java-traps', 'Integer Caching Trap',
      'Java caches Integer objects from -128 to 127. So, `Integer a = 127; Integer b = 127; a == b` is true. But `Integer c = 128; Integer d = 128; c == d` is false. They fall outside the cache range, so distinct objects are created. Always use .equals() for comparing wrapper classes.',
      ['Can you change the Integer cache size?', 'Does this happen with Double or Float?'],
      ['Integer cache range: -128 to 127', 'Outside range creates new objects', '== fails for large numbers', 'Use .equals() for wrapper objects'],
      'Medium', 'debugging', ['primitives', 'traps']),
    q('jt-3', 'java-traps', 'Final does not mean Immutable',
      'Declaring a reference variable as `final` means the reference cannot point to a different object. However, it does NOT make the object itself immutable. For example, a `final List<String> list = new ArrayList<>();` means you cannot reassign `list`, but you can still call `list.add("item")`.',
      ['How do you make a list truly immutable?', 'What is the difference between final and immutable?'],
      ['final locks the reference', 'Object internal state can still change', 'Use List.of() for immutability', 'Common misconception'],
      'Medium', 'why', ['keywords', 'traps']),
    q('jt-4', 'java-traps', 'Static Method Hiding vs Overriding',
      'Static methods cannot be overridden, they are hidden. If a subclass has a static method with the same signature as the parent, calling it via a parent reference will execute the parent\'s method. Polymorphism (dynamic binding) does not apply to static methods, which are resolved at compile-time.',
      ['What happens if you add @Override to a static method?', 'Why are static methods resolved at compile time?'],
      ['Static methods are bound at compile-time', 'Polymorphism does not apply', 'Method hiding, not overriding', 'Calling depends on reference type, not object type'],
      'Hard', 'difference', ['oop', 'traps']),
    q('jt-5', 'java-traps', 'Can a constructor be final, static, or abstract?',
      'No, a constructor cannot be final, static, or abstract. Constructors are not inherited, so final makes no sense. They are tied to object instantiation, so static makes no sense. They must have an implementation to create the object, so abstract makes no sense.',
      ['Can a constructor be private?', 'How do you create objects if constructor is private?'],
      ['Constructors are not inherited', 'Cannot be final', 'Cannot be static', 'Cannot be abstract'],
      'Medium', 'definition', ['constructors', 'traps']),
    q('jt-6', 'java-traps', 'Can an interface have a constructor?',
      'No, an interface cannot have a constructor. Interfaces cannot be instantiated directly, and they do not hold instance state (non-static, non-final fields), so there is nothing for a constructor to initialize. Abstract classes, however, can have constructors.',
      ['Why can abstract classes have constructors but interfaces cannot?', 'How are default methods initialized?'],
      ['Interfaces cannot be instantiated', 'No instance variables to initialize', 'Abstract classes CAN have constructors', 'Interfaces only have abstract/default methods'],
      'Medium', 'why', ['oop', 'traps']),
    q('jt-7', 'java-traps', 'Multiple Inheritance Ambiguity (Diamond Problem)',
      'Java prevents multiple inheritance of state (classes) to avoid the Diamond Problem. However, with Java 8 default methods, a class can implement two interfaces with the same default method. This causes a compile-time error. The class must override the method to resolve the ambiguity.',
      ['How do you call a specific interface\'s default method?', 'Why does Java allow multiple inheritance of interfaces?'],
      ['No multiple inheritance for classes', 'Interfaces can cause method collisions', 'Compiler forces you to override', 'Use InterfaceName.super.method() to resolve'],
      'Medium', 'scenario', ['oop', 'traps']),
    q('jt-8', 'java-traps', 'Finally block with a return statement',
      'If a `try` or `catch` block has a return statement, the `finally` block will still execute before the method actually returns. However, if the `finally` block ALSO has a return statement, it will swallow the original return value (or exception) and return its own value instead. This is a bad practice.',
      ['What happens if finally throws an exception?', 'Does finally run if System.exit() is called?'],
      ['finally always executes', 'finally return overrides try/catch return', 'Swallows exceptions', 'Never put return in finally'],
      'Hard', 'debugging', ['exceptions', 'traps']),
    q('jt-9', 'java-traps', 'Overriding and Exception rules',
      'When overriding a method, the subclass method cannot throw broader or new checked exceptions than the parent method. It can throw narrower (subclasses of the original) checked exceptions, or any unchecked (RuntimeException) exceptions. Throwing new checked exceptions breaks the parent\'s contract.',
      ['Can the overriding method throw NO exceptions?', 'What about constructors?'],
      ['Cannot throw new checked exceptions', 'Can throw subclasses of parent exception', 'Can throw any unchecked exception', 'Preserves Liskov Substitution Principle'],
      'Hard', 'difference', ['exceptions', 'traps']),
    q('jt-10', 'java-traps', 'Autoboxing with == operator',
      'When comparing a primitive to a wrapper class object using `==`, Java automatically unboxes the wrapper class to a primitive and compares their values. E.g., `int a = 10; Integer b = new Integer(10); a == b` is true. But `Integer c = new Integer(10); b == c` is false (reference comparison).',
      ['Can unboxing cause a NullPointerException here?', 'Why is this dangerous?'],
      ['Primitive == Wrapper forces unboxing', 'Wrapper == Wrapper is reference check', 'Can throw NullPointerException if Wrapper is null', 'Always understand what == is comparing'],
      'Medium', 'debugging', ['primitives', 'traps']),
    q('jt-11', 'java-traps', 'Collections.sort vs Arrays.sort',
      'Collections.sort() is used to sort Lists (like ArrayList), while Arrays.sort() is used to sort arrays (like int[] or String[]). Under the hood, Collections.sort() simply dumps the list into an array, calls Arrays.sort(), and then resets the list elements.',
      ['What algorithm does Arrays.sort use?', 'Can you sort a Set?'],
      ['Collections.sort is for Lists', 'Arrays.sort is for arrays', 'Internally uses Dual-Pivot Quicksort or Timsort', 'Sets must be converted to Lists first'],
      'Easy', 'difference', ['collections', 'traps']),
    q('jt-12', 'java-traps', 'Pass-by-value with Objects',
      'Java passes object references by value. If you pass an object to a method and modify its properties, the original object changes. But if you assign a completely new object to that reference variable inside the method (`obj = new Object()`), the original object outside the method remains unchanged.',
      ['Why do people confuse this with pass-by-reference?', 'How do you swap two objects in a method?'],
      ['Object reference is copied', 'Modifying state affects original', 'Reassigning reference does NOT affect original', 'Strictly pass-by-value'],
      'Hard', 'scenario', ['methods', 'traps']),
    q('jt-13', 'java-traps', 'Math.round(-0.5) trap',
      'Math.round() rounds to the closest long or int. For ties (exactly .5), it rounds towards positive infinity. Therefore, `Math.round(0.5)` is 1, but `Math.round(-0.5)` is 0, not -1. This often trips up developers expecting symmetric rounding away from zero.',
      ['What does Math.floor(-0.5) return?', 'What does Math.ceil(-0.5) return?'],
      ['Rounds towards positive infinity on ties', 'Math.round(0.5) == 1', 'Math.round(-0.5) == 0', 'Asymmetric behavior for negative numbers'],
      'Hard', 'debugging', ['core', 'traps']),
    q('jt-14', 'java-traps', 'String concatenation evaluation order',
      'String concatenation evaluates left to right. `1 + 2 + "3"` evaluates as `(1 + 2) + "3"`, resulting in `"33"`. However, `"3" + 1 + 2` evaluates as `("3" + 1) + 2`, converting the numbers to strings immediately, resulting in `"312"`.',
      ['How do you fix the second case to result in "33"?', 'Does this affect performance?'],
      ['Evaluates left to right', 'Math first: 1 + 2 + "3" = "33"', 'String first: "3" + 1 + 2 = "312"', 'Use parentheses to control order'],
      'Medium', 'debugging', ['strings', 'traps']),
    q('jt-15', 'java-traps', 'Null method overloading resolution',
      'If you have two overloaded methods, `print(Object o)` and `print(String s)`, and you call `print(null)`, Java will choose the most specific method, which is `print(String)`. If there is an ambiguity (e.g., `print(String)` and `print(Integer)`), it will result in a compile-time error.',
      ['How do you force it to call print(Object)?', 'What does "most specific method" mean?'],
      ['Chooses most specific subtype', 'null matches any object reference type', 'print(String) chosen over print(Object)', 'Ambiguous signatures cause compile error'],
      'Hard', 'scenario', ['oop', 'traps']),
    q('jt-16', 'java-traps', 'Double Brace Initialization memory leak',
      'Double brace initialization `new ArrayList<String>() {{ add("A"); }}` creates an anonymous inner class with a hidden reference to the enclosing instance. If this list is returned or cached, the entire enclosing class cannot be garbage collected, causing a memory leak. Use List.of() instead.',
      ['Why does it create a hidden reference?', 'Is this still a problem in newer Java versions?'],
      ['Creates an anonymous inner class', 'Holds reference to parent object', 'Causes memory leaks', 'Avoid it; use List.of() or Arrays.asList()'],
      'Hard', 'why', ['collections', 'traps']),
    q('jt-17', 'java-traps', 'Default interface methods and Object methods',
      'An interface cannot provide a default implementation for any of the methods defined in `java.lang.Object` (like equals, hashCode, or toString). This is because class implementations always win over interface default methods, making it meaningless and confusing. The compiler will reject it.',
      ['Why does class implementation always win?', 'How do you enforce equals() contract in an interface?'],
      ['Cannot provide default for Object methods', 'Class methods take precedence', 'Results in compile-time error', 'Interfaces define behavior, not identity'],
      'Medium', 'why', ['oop', 'traps']),
    q('jt-18', 'java-traps', 'Volatile vs Atomic',
      '`volatile` ensures visibility of a variable across threads (reads from main memory, not CPU cache) but does NOT guarantee atomicity. Operations like `count++` are not safe with just `volatile` because they involve read-modify-write. For thread-safe counters, use `AtomicInteger` instead.',
      ['What is a race condition?', 'When is volatile sufficient?'],
      ['volatile guarantees visibility', 'volatile does NOT guarantee atomicity', 'count++ is not atomic', 'Use AtomicInteger for safe counters'],
      'Hard', 'difference', ['concurrency', 'traps']),
    q('jt-19', 'java-traps', 'Iterator.remove() vs Collection.remove()',
      'When iterating through a collection, if you use `list.remove(item)`, it will throw a ConcurrentModificationException because the structural modification counter is updated without the iterator knowing. You MUST use `iterator.remove()` to safely remove items during iteration.',
      ['Does a for-each loop use an iterator?', 'Can you add elements using Iterator?'],
      ['Modifying collection directly throws exception', 'Iterator keeps internal sync state', 'Always use iterator.remove()', 'Affects fail-fast collections'],
      'Medium', 'debugging', ['collections', 'traps']),
    q('jt-20', 'java-traps', 'Thread.run() vs Thread.start()',
      'Calling `thread.start()` creates a new underlying OS thread and then executes the `run()` method inside that new thread. Calling `thread.run()` directly does NOT create a new thread; it simply executes the `run` method sequentially within the current calling thread, defeating the purpose of multithreading.',
      ['What happens if you call start() twice on the same thread?', 'Why implement Runnable instead of extending Thread?'],
      ['start() creates a new thread', 'run() executes in current thread', 'Calling run() directly is a common mistake', 'start() can only be called once'],
      'Medium', 'difference', ['concurrency', 'traps']),
    q('jt-21', 'java-traps', 'Array vs ArrayList typing',
      'Arrays in Java are covariant, meaning `Integer[]` is a subtype of `Number[]`. This can lead to ArrayStoreException at runtime if you try to put a Double into it. Generics are invariant, meaning `List<Integer>` is NOT a subtype of `List<Number>`, which catches type errors at compile-time.',
      ['What is Type Erasure?', 'Why are generics invariant?'],
      ['Arrays are covariant', 'Generics are invariant', 'Arrays check types at runtime (ArrayStoreException)', 'Generics check types at compile-time'],
      'Hard', 'difference', ['core', 'traps']),
    q('jt-22', 'java-traps', 'Hash collision performance',
      'A common trap is implementing a poor `hashCode()` that returns a constant or has many collisions. This turns a HashMap from an O(1) time complexity data structure into a LinkedList with O(n) lookup time. Since Java 8, severe collisions convert the list to a Red-Black tree (O(log n)).',
      ['What is a Red-Black tree?', 'How do you write a good hashCode?'],
      ['Poor hashCode ruins performance', 'Degrades O(1) to O(n) or O(log n)', 'Java 8 mitigates with Trees', 'Always distribute hashes evenly'],
      'Medium', 'performance', ['collections', 'traps']),
    q('jt-23', 'java-traps', 'Floating point arithmetic precision',
      'Using `double` or `float` for exact monetary calculations is a trap. `0.1 + 0.2` in Java does not exactly equal `0.3` due to binary representation of fractions. Always use `BigDecimal` for currency or calculations requiring exact precision.',
      ['Why does binary rounding error occur?', 'Is BigDecimal slower than primitive double?'],
      ['double/float have precision loss', '0.1 + 0.2 != 0.3', 'Use BigDecimal for money', 'Binary cannot represent all decimal fractions'],
      'Easy', 'scenario', ['core', 'traps']),
    q('jt-24', 'java-traps', 'Static block exceptions',
      'If an exception is thrown inside a `static { }` initialization block and not caught, it results in an `ExceptionInInitializerError`. Subsequent attempts to use the class will throw a `NoClassDefFoundError`. It completely breaks the class loading process for the remainder of the JVM lifespan.',
      ['How do you handle exceptions in static blocks?', 'What is the difference between ClassNotFoundException and NoClassDefFoundError?'],
      ['Static blocks run at class loading', 'Uncaught exceptions break class loading', 'Causes ExceptionInInitializerError', 'Followed by NoClassDefFoundError'],
      'Hard', 'debugging', ['core', 'traps']),
    q('jt-25', 'java-traps', 'Optional anti-patterns',
      'Using `Optional` as a field type in a class or as a method parameter is considered an anti-pattern. `Optional` is not Serializable, and it was designed specifically to be used as a method return type to clearly indicate that a value might be missing, forcing the caller to handle it.',
      ['Why shouldn\'t Optional be used as a parameter?', 'What is the alternative to using it as a field?'],
      ['Designed for return types only', 'Not Serializable', 'Do not use as class fields', 'Do not use as method parameters'],
      'Medium', 'best-practice', ['core', 'traps'])
]

def clean_text(text):
    if not isinstance(text, str):
        return text
    text = text.replace('“', '"').replace('”', '"')
    text = text.replace('‘', "'").replace('’', "'")
    text = text.replace('—', '-')
    text = text.replace('…', '...')
    return "".join([c for c in text if ord(c) < 128])

def write_file(path, var_name, data):
    import os
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='ascii') as f:
        f.write('export interface JavaInterviewQuestion {\n')
        f.write('  id: string;\n')
        f.write('  moduleId: string;\n')
        f.write('  question: string;\n')
        f.write('  expectedAnswer: string;\n')
        f.write('  followUps: string[];\n')
        f.write('  keyPoints: string[];\n')
        f.write('  difficulty: "Easy" | "Medium" | "Hard";\n')
        f.write('  type: "definition" | "why" | "how" | "difference" | "scenario" | "coding" | "debugging";\n')
        f.write('  tags: string[];\n')
        f.write('}\n\n')
        
        f.write(f'export const {var_name}: JavaInterviewQuestion[] = [\n')
        for i, q in enumerate(data):
            f.write('  {\n')
            f.write(f'    id: "{clean_text(q["id"])}",\n')
            f.write(f'    moduleId: "{clean_text(q["moduleId"])}",\n')
            
            q_str = clean_text(q["question"]).replace('"', '\\"')
            ans_str = clean_text(q["expectedAnswer"]).replace('"', '\\"')
            f.write(f'    question: "{q_str}",\n')
            f.write(f'    expectedAnswer: "{ans_str}",\n')
            
            f.write('    followUps: [\n')
            for fu in q['followUps']:
                fu_str = clean_text(fu).replace('"', '\\"')
                f.write(f'      "{fu_str}",\n')
            f.write('    ],\n')
            
            f.write('    keyPoints: [\n')
            for kp in q['keyPoints']:
                kp_str = clean_text(kp).replace('"', '\\"')
                f.write(f'      "{kp_str}",\n')
            f.write('    ],\n')
            
            f.write(f'    difficulty: "{clean_text(q["difficulty"])}",\n')
            
            t = clean_text(q["type"])
            if t == "best-practice" or t == "performance":
                t = "definition"
            f.write(f'    type: "{t}",\n')
            
            f.write('    tags: [\n')
            for tag in q['tags']:
                f.write(f'      "{clean_text(tag)}",\n')
            f.write('    ]\n')
            f.write('  }')
            if i < len(data) - 1:
                f.write(',')
            f.write('\n')
        f.write('];\n')

write_file(r'c:\Users\keert\Mun\ExamBoard\src\data\java\interviews\javaRound3Questions.ts', 'javaRound3Questions', questions2)
write_file(r'c:\Users\keert\Mun\ExamBoard\src\data\java\interviews\javaInterviewTraps.ts', 'javaInterviewTraps', questions3)
print('Done!')
