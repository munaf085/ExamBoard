export interface JavaInterviewQuestion {
  id: string;
  moduleId: string;
  question: string;
  expectedAnswer: string;
  followUps: string[];
  keyPoints: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  type: "definition" | "why" | "how" | "difference" | "scenario" | "coding" | "debugging";
  tags: string[];
}

export const javaRound3Questions: JavaInterviewQuestion[] = [
  {
    id: "j3-1",
    moduleId: "spring-boot",
    question: "What is Spring Framework? What problem does it solve?",
    expectedAnswer: "Spring Framework is a powerful, open-source application framework for Java. It simplifies enterprise Java development by providing infrastructure support, allowing developers to focus on business logic rather than plumbing. Its core features, like Dependency Injection and Inversion of Control, decouple components, making applications easier to test, maintain, and scale.",
    followUps: [
      "What is the core container in Spring?",
      "How does Spring help with testing?",
    ],
    keyPoints: [
      "Simplifies enterprise development",
      "Provides Dependency Injection",
      "Reduces boilerplate code",
      "Promotes loose coupling",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "spring",
      "basics",
    ]
  },
  {
    id: "j3-2",
    moduleId: "spring-boot",
    question: "What is Inversion of Control (IoC)?",
    expectedAnswer: "Inversion of Control (IoC) is a design principle where the control of object creation and lifecycle management is transferred from the application code to a container or framework. In Spring, the IoC container instantiates, configures, and manages the objects (beans), reducing tight coupling and making the system more modular.",
    followUps: [
      "What is the Spring IoC container?",
      "How is IoC related to DI?",
    ],
    keyPoints: [
      "Transfers control to framework",
      "Manages bean lifecycle",
      "Promotes loose coupling",
      "Core principle of Spring",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "spring",
      "ioc",
    ]
  },
  {
    id: "j3-3",
    moduleId: "spring-boot",
    question: "What is Dependency Injection? Types of DI?",
    expectedAnswer: "Dependency Injection (DI) is a pattern used to implement IoC, where an object receives its dependencies from external sources rather than creating them itself. Spring supports three main types: Constructor Injection (dependencies passed via constructor, recommended), Setter Injection (via setter methods), and Field Injection (via @Autowired on fields, generally discouraged).",
    followUps: [
      "Why is Constructor Injection preferred over Field Injection?",
      "Can you use multiple DI types together?",
    ],
    keyPoints: [
      "Implements IoC",
      "Constructor Injection (best practice)",
      "Setter Injection",
      "Field Injection (not recommended)",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "spring",
      "di",
    ]
  },
  {
    id: "j3-4",
    moduleId: "spring-boot",
    question: "What is the difference between @Component, @Service, @Repository, @Controller?",
    expectedAnswer: "@Component is a generic stereotype annotation for any Spring-managed component. @Service, @Repository, and @Controller are specializations of @Component. @Service indicates business logic. @Repository indicates data access logic and translates database exceptions into Spring exceptions. @Controller indicates a presentation layer bean handling web requests.",
    followUps: [
      "Can I use @Component instead of @Service?",
      "What special feature does @Repository provide?",
    ],
    keyPoints: [
      "@Component is generic",
      "@Service for business logic",
      "@Repository for data access / exception translation",
      "@Controller for web endpoints",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "spring",
      "annotations",
    ]
  },
  {
    id: "j3-5",
    moduleId: "spring-boot",
    question: "What is Spring Boot? How is it different from Spring?",
    expectedAnswer: "Spring Boot is an extension of the Spring Framework designed to simplify the setup and development of Spring applications. While Spring requires extensive configuration (XML or Java configs), Spring Boot provides opinionated defaults, auto-configuration, and embedded servers (like Tomcat), allowing developers to create standalone apps with minimal setup.",
    followUps: [
      "Does Spring Boot replace Spring?",
      "What is meant by \"opinionated defaults\"?",
    ],
    keyPoints: [
      "Extension of Spring",
      "Opinionated defaults",
      "Auto-configuration",
      "Embedded web servers",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "springboot",
      "basics",
    ]
  },
  {
    id: "j3-6",
    moduleId: "spring-boot",
    question: "What is Spring Boot auto-configuration?",
    expectedAnswer: "Auto-configuration automatically configures a Spring application based on the dependencies present in the classpath. For example, if H2 database is on the classpath, Spring Boot automatically configures an in-memory database. It is enabled by the @EnableAutoConfiguration annotation (usually via @SpringBootApplication).",
    followUps: [
      "How can you disable a specific auto-configuration?",
      "How does it know what to configure?",
    ],
    keyPoints: [
      "Configures based on classpath",
      "Reduces manual configuration",
      "Enabled by @EnableAutoConfiguration",
      "Can be customized or overridden",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "springboot",
      "autoconfig",
    ]
  },
  {
    id: "j3-7",
    moduleId: "spring-boot",
    question: "What are Spring Boot starters?",
    expectedAnswer: "Spring Boot starters are pre-configured dependency descriptors that bundle related dependencies together. For example, `spring-boot-starter-web` includes everything needed for web development (Spring MVC, Jackson, embedded Tomcat). They simplify dependency management in Maven or Gradle by reducing the need to specify multiple individual dependencies.",
    followUps: [
      "Name a few common starters.",
      "Can you create your own custom starter?",
    ],
    keyPoints: [
      "Bundled dependencies",
      "Simplifies Maven/Gradle files",
      "spring-boot-starter-web",
      "spring-boot-starter-data-jpa",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "springboot",
      "starters",
    ]
  },
  {
    id: "j3-8",
    moduleId: "spring-boot",
    question: "What is application.properties used for?",
    expectedAnswer: "application.properties (or application.yml) is a centralized configuration file in Spring Boot. It is used to define application-specific settings like server port, database connections, logging levels, and custom properties. Spring Boot automatically loads this file at startup to configure the application environment.",
    followUps: [
      "How do you read a property from this file in code?",
      "What is the YAML alternative?",
    ],
    keyPoints: [
      "Centralized configuration",
      "Sets server.port, DB credentials",
      "Can use YAML format",
      "Loaded automatically on startup",
    ],
    difficulty: "Easy",
    type: "why",
    tags: [
      "springboot",
      "config",
    ]
  },
  {
    id: "j3-9",
    moduleId: "spring-boot",
    question: "What is a Spring Boot profile?",
    expectedAnswer: "Profiles provide a way to segregate application configurations and activate them for specific environments (e.g., dev, test, prod). You can create files like `application-dev.properties` and activate the profile using a command-line argument or environment variable (`spring.profiles.active=dev`). This allows running the same code with different settings.",
    followUps: [
      "How do you set the active profile?",
      "Can you use @Profile on a bean?",
    ],
    keyPoints: [
      "Environment specific configuration",
      "application-{profile}.properties",
      "spring.profiles.active",
      "Useful for dev/test/prod separation",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "springboot",
      "profiles",
    ]
  },
  {
    id: "j3-10",
    moduleId: "spring-boot",
    question: "What is @RestController vs @Controller?",
    expectedAnswer: "@Controller is a standard Spring MVC annotation used to define a web controller that returns views (like HTML/JSP). @RestController is a convenience annotation that combines @Controller and @ResponseBody, meaning every method in the class automatically serializes the return object into the HTTP response body (usually as JSON), which is ideal for REST APIs.",
    followUps: [
      "Can @Controller return JSON?",
      "What does @ResponseBody do?",
    ],
    keyPoints: [
      "@RestController = @Controller + @ResponseBody",
      "@Controller returns views",
      "@RestController returns data (JSON)",
      "Used for REST APIs",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "spring",
      "mvc",
    ]
  },
  {
    id: "j3-11",
    moduleId: "spring-boot",
    question: "What is @RequestMapping, @GetMapping, @PostMapping?",
    expectedAnswer: "@RequestMapping maps web requests to specific controller methods or classes based on URL and HTTP method. @GetMapping and @PostMapping are composed annotations introduced in Spring 4.3 that act as shortcuts for @RequestMapping(method = RequestMethod.GET) and POST, making the code more readable and concise.",
    followUps: [
      "Can @RequestMapping be used at the class level?",
      "What about PUT and DELETE methods?",
    ],
    keyPoints: [
      "Maps URLs to methods",
      "@GetMapping is for HTTP GET",
      "@PostMapping is for HTTP POST",
      "Improves code readability",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "spring",
      "mvc",
    ]
  },
  {
    id: "j3-12",
    moduleId: "spring-boot",
    question: "What are path variables and query parameters?",
    expectedAnswer: "Path variables are values extracted from the URL path (e.g., /users/{id}) using @PathVariable, typically used to identify specific resources. Query parameters are key-value pairs appended to the end of a URL after a question mark (e.g., /users?role=admin) using @RequestParam, typically used for filtering, sorting, or optional data.",
    followUps: [
      "When should you use a path variable vs query parameter?",
      "Is a path variable optional?",
    ],
    keyPoints: [
      "@PathVariable extracts from URL path",
      "@RequestParam extracts from URL query",
      "Path variables for identifying resources",
      "Query params for filtering/sorting",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "spring",
      "mvc",
    ]
  },
  {
    id: "j3-13",
    moduleId: "spring-boot",
    question: "What are HTTP status codes? (200, 201, 400, 401, 403, 404, 500)",
    expectedAnswer: "HTTP status codes indicate the result of a request. 200 OK (success), 201 Created (resource created successfully). 400 Bad Request (client error/invalid syntax), 401 Unauthorized (missing/invalid authentication), 403 Forbidden (authenticated but lacks permissions), 404 Not Found (resource doesn't exist). 500 Internal Server Error (server crashed or unexpected error).",
    followUps: [
      "What is the difference between 401 and 403?",
      "Which code represents a server error?",
    ],
    keyPoints: [
      "2xx Success",
      "4xx Client Error",
      "5xx Server Error",
      "401 Unauthorized vs 403 Forbidden",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "rest",
      "http",
    ]
  },
  {
    id: "j3-14",
    moduleId: "spring-boot",
    question: "What is a DTO? Why use DTOs?",
    expectedAnswer: "A Data Transfer Object (DTO) is an object used to encapsulate data and send it from one subsystem of an application to another. DTOs are used to hide implementation details (like entity structures) from external clients, reduce the amount of data transferred, and prevent issues like infinite recursion when serializing bi-directional entity relationships.",
    followUps: [
      "What is the difference between a DTO and an Entity?",
      "How do you map Entities to DTOs?",
    ],
    keyPoints: [
      "Data Transfer Object",
      "Hides entity structure from client",
      "Reduces payload size",
      "Prevents serialization loops",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "rest",
      "architecture",
    ]
  },
  {
    id: "j3-15",
    moduleId: "spring-boot",
    question: "How do you validate a request body in Spring Boot?",
    expectedAnswer: "You validate a request body by annotating the DTO fields with validation annotations like @NotNull, @NotBlank, @Size, or @Email from the Jakarta Bean Validation API. Then, you place the @Valid annotation next to the @RequestBody parameter in the controller method. If validation fails, a MethodArgumentNotValidException is thrown.",
    followUps: [
      "What happens if validation fails?",
      "How do you customize the error message?",
    ],
    keyPoints: [
      "Use Jakarta Validation annotations",
      "@Valid on @RequestBody",
      "Throws MethodArgumentNotValidException",
      "Improves API robustness",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "spring",
      "validation",
    ]
  },
  {
    id: "j3-16",
    moduleId: "spring-boot",
    question: "What is @Autowired and how does it work?",
    expectedAnswer: "@Autowired is an annotation used by Spring to automatically inject dependencies into beans. When Spring context is initialized, it scans for beans and resolves dependencies based on type. It can be applied to constructors, fields, or setter methods. If multiple beans of the same type exist, @Qualifier can be used to specify which one to inject.",
    followUps: [
      "What happens if no bean is found for @Autowired?",
      "What is @Qualifier used for?",
    ],
    keyPoints: [
      "Automatic dependency injection",
      "Injects by type",
      "Use @Qualifier for ambiguities",
      "Can be optional with required=false",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "spring",
      "di",
    ]
  },
  {
    id: "j3-17",
    moduleId: "spring-boot",
    question: "What is the difference between Singleton, Prototype, Request scope in Spring?",
    expectedAnswer: "Bean scopes define the lifecycle and visibility of a bean. Singleton (default) creates one instance per Spring container. Prototype creates a new instance every time the bean is requested. Request scope creates a new instance for every HTTP request (web applications only).",
    followUps: [
      "Are singleton beans thread-safe?",
      "When would you use a prototype bean?",
    ],
    keyPoints: [
      "Singleton: one instance per container",
      "Prototype: new instance per request",
      "Request: one instance per HTTP request",
      "Singleton is the default scope",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "spring",
      "beans",
    ]
  },
  {
    id: "j3-18",
    moduleId: "spring-boot",
    question: "What is Spring Data JPA?",
    expectedAnswer: "Spring Data JPA is part of the larger Spring Data family that makes it easy to implement JPA-based repositories. It significantly reduces boilerplate code by allowing developers to write repository interfaces (extending JpaRepository). Spring dynamically provides the implementation at runtime, handling CRUD operations and custom query methods automatically.",
    followUps: [
      "What is JpaRepository?",
      "How does it generate queries from method names?",
    ],
    keyPoints: [
      "Simplifies data access layer",
      "Extends JpaRepository",
      "Auto-generates CRUD operations",
      "Derived query methods",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "springdata",
      "jpa",
    ]
  },
  {
    id: "j3-19",
    moduleId: "spring-boot",
    question: "What is Hibernate? How is it related to JPA?",
    expectedAnswer: "JPA (Jakarta Persistence API) is a specification or set of rules defining object-relational mapping (ORM) in Java. Hibernate is an actual implementation of the JPA specification. While you can use JPA annotations (like @Entity), underneath, Hibernate is the engine doing the actual work of mapping objects to database tables and executing SQL.",
    followUps: [
      "Can you use Hibernate without JPA?",
      "What is ORM?",
    ],
    keyPoints: [
      "JPA is a specification (rules)",
      "Hibernate is the implementation (engine)",
      "Hibernate provides ORM",
      "Reduces manual SQL writing",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "jpa",
      "hibernate",
    ]
  },
  {
    id: "j3-20",
    moduleId: "spring-boot",
    question: "What is @Entity? What is @Id?",
    expectedAnswer: "@Entity marks a Java class as a JPA entity, meaning it maps to a table in the database. @Id marks a field in the entity as the primary key of that table. Typically, @Id is accompanied by @GeneratedValue to indicate how the primary key values are automatically generated (e.g., Identity, Sequence).",
    followUps: [
      "Can an Entity have no @Id?",
      "What is the difference between GenerationType.IDENTITY and AUTO?",
    ],
    keyPoints: [
      "@Entity maps class to table",
      "@Id maps field to primary key",
      "Requires no-args constructor",
      "Often uses @GeneratedValue",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "jpa",
      "annotations",
    ]
  },
  {
    id: "j3-21",
    moduleId: "spring-boot",
    question: "What are the JPA relationship types? (@OneToMany etc.)",
    expectedAnswer: "JPA defines annotations to represent relational database associations: @OneToOne (1 to 1 mapping), @OneToMany (1 record maps to many), @ManyToOne (many records map to 1), and @ManyToMany (many records map to many). These annotations define how tables join together and how foreign keys are managed.",
    followUps: [
      "Which side should own the relationship in bidirectional associations?",
      "What is the mappedBy attribute?",
    ],
    keyPoints: [
      "@OneToOne, @OneToMany, @ManyToOne, @ManyToMany",
      "Represent DB foreign keys",
      "mappedBy indicates inverse side",
      "Defines object relationships",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "jpa",
      "relationships",
    ]
  },
  {
    id: "j3-22",
    moduleId: "spring-boot",
    question: "What is lazy loading vs eager loading?",
    expectedAnswer: "Eager loading fetches all related entities immediately when the parent entity is queried, which can cause performance issues if datasets are huge. Lazy loading delays the fetching of related entities until they are explicitly accessed via a getter method. In JPA, ToMany relationships are Lazy by default, while ToOne relationships are Eager by default.",
    followUps: [
      "What is LazyInitializationException?",
      "How do you change the fetch type?",
    ],
    keyPoints: [
      "Eager fetches immediately",
      "Lazy fetches on-demand",
      "Lazy saves memory/DB calls",
      "Can cause LazyInitializationException",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "jpa",
      "performance",
    ]
  },
  {
    id: "j3-23",
    moduleId: "spring-boot",
    question: "What is the N+1 problem in JPA?",
    expectedAnswer: "The N+1 problem occurs when an application executes 1 query to retrieve a list of N parent entities, and then executes N additional queries to fetch their lazily-loaded child entities. This results in N+1 total queries, severely degrading database performance. It is usually solved using JOIN FETCH in JPQL or Entity Graphs.",
    followUps: [
      "How do you fix the N+1 problem?",
      "Does eager loading prevent N+1?",
    ],
    keyPoints: [
      "1 query for parents, N queries for children",
      "Major performance killer",
      "Solved via JOIN FETCH",
      "Solved via EntityGraph",
    ],
    difficulty: "Hard",
    type: "debugging",
    tags: [
      "jpa",
      "performance",
    ]
  },
  {
    id: "j3-24",
    moduleId: "spring-boot",
    question: "What is JPQL?",
    expectedAnswer: "JPQL (Java Persistence Query Language) is an object-oriented query language defined as part of JPA. It is similar to SQL but operates against entity objects and their attributes rather than database tables and columns. This makes JPQL database-agnostic, meaning the same query works on MySQL, PostgreSQL, etc.",
    followUps: [
      "How is JPQL different from native SQL?",
      "What is @Query annotation used for?",
    ],
    keyPoints: [
      "Object-oriented query language",
      "Queries entities, not tables",
      "Database agnostic",
      "Used inside @Query",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "jpa",
      "queries",
    ]
  },
  {
    id: "j3-25",
    moduleId: "spring-boot",
    question: "What is SQL? What is RDBMS?",
    expectedAnswer: "SQL (Structured Query Language) is the standard language used to interact with databases for managing and querying data. RDBMS (Relational Database Management System) is a database system that stores data in structured tables with rows and columns, and enforces relationships between tables (e.g., MySQL, PostgreSQL, Oracle).",
    followUps: [
      "What is the difference between DDL and DML?",
      "Name some popular RDBMS.",
    ],
    keyPoints: [
      "SQL: language for databases",
      "RDBMS: table-based database system",
      "Enforces data integrity",
      "Uses relational constraints",
    ],
    difficulty: "Easy",
    type: "definition",
    tags: [
      "sql",
      "basics",
    ]
  },
  {
    id: "j3-26",
    moduleId: "spring-boot",
    question: "Explain INNER JOIN vs LEFT JOIN.",
    expectedAnswer: "An INNER JOIN returns only the rows that have matching values in both tables being joined. A LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table. If there is no match, the result will contain NULL values for the right table's columns.",
    followUps: [
      "What is a RIGHT JOIN?",
      "When would you use a LEFT JOIN?",
    ],
    keyPoints: [
      "INNER: matches in both tables only",
      "LEFT: all from left, matches from right",
      "LEFT fills missing right with NULL",
      "Crucial for querying related data",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "sql",
      "joins",
    ]
  },
  {
    id: "j3-27",
    moduleId: "spring-boot",
    question: "What is GROUP BY? How is HAVING different from WHERE?",
    expectedAnswer: "GROUP BY groups rows that have the same values into summary rows (like finding totals or averages). The WHERE clause filters rows BEFORE they are grouped. The HAVING clause was added because WHERE cannot be used with aggregate functions; HAVING filters groups AFTER they have been grouped by GROUP BY.",
    followUps: [
      "Can you use WHERE and HAVING in the same query?",
      "Name 3 aggregate functions.",
    ],
    keyPoints: [
      "GROUP BY aggregates data",
      "WHERE filters before grouping",
      "HAVING filters after grouping",
      "HAVING works with aggregates (SUM, COUNT)",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "sql",
      "aggregates",
    ]
  },
  {
    id: "j3-28",
    moduleId: "spring-boot",
    question: "Write a SQL query to find the second highest salary.",
    expectedAnswer: "A common way to find the second highest salary is to use a subquery: `SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee)`. Alternatively, using LIMIT and OFFSET: `SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1`.",
    followUps: [
      "How to find the Nth highest salary?",
      "What if there are multiple employees with the same top salary?",
    ],
    keyPoints: [
      "Uses subquery with MAX",
      "Can use ORDER BY and LIMIT/OFFSET",
      "Common interview question",
      "Handle duplicates appropriately",
    ],
    difficulty: "Medium",
    type: "coding",
    tags: [
      "sql",
      "queries",
      "coding",
    ]
  },
  {
    id: "j3-29",
    moduleId: "spring-boot",
    question: "What is a database index? Why use it?",
    expectedAnswer: "A database index is a data structure (often a B-tree) that improves the speed of data retrieval operations on a table at the cost of additional storage space and slower writes (inserts/updates/deletes). It works similarly to an index in a book, allowing the database engine to quickly find rows without scanning the entire table.",
    followUps: [
      "What is the disadvantage of having too many indexes?",
      "What is a primary key index?",
    ],
    keyPoints: [
      "Speeds up read queries",
      "Slows down write operations",
      "Consumes extra disk space",
      "Like a book index",
    ],
    difficulty: "Medium",
    type: "why",
    tags: [
      "sql",
      "performance",
    ]
  },
  {
    id: "j3-30",
    moduleId: "spring-boot",
    question: "What is database normalization? Explain 1NF, 2NF, 3NF.",
    expectedAnswer: "Normalization is the process of organizing data to reduce redundancy and improve integrity. 1NF ensures each column holds atomic values. 2NF ensures 1NF and that non-key columns fully depend on the entire primary key. 3NF ensures 2NF and that non-key columns depend ONLY on the primary key (no transitive dependencies).",
    followUps: [
      "What is denormalization and when is it used?",
      "Why do we avoid redundancy?",
    ],
    keyPoints: [
      "Reduces data redundancy",
      "1NF: Atomic values",
      "2NF: Full dependency on primary key",
      "3NF: No transitive dependencies",
    ],
    difficulty: "Hard",
    type: "definition",
    tags: [
      "sql",
      "design",
    ]
  },
  {
    id: "j3-31",
    moduleId: "spring-boot",
    question: "What is a transaction? What are ACID properties?",
    expectedAnswer: "A transaction is a sequence of database operations treated as a single logical unit of work. ACID properties guarantee transaction reliability: Atomicity (all or nothing succeeds), Consistency (database remains in a valid state), Isolation (concurrent transactions don't interfere), and Durability (committed data is permanently saved).",
    followUps: [
      "What does @Transactional do in Spring?",
      "What is a transaction rollback?",
    ],
    keyPoints: [
      "Logical unit of work",
      "Atomicity: All or nothing",
      "Consistency: Valid state",
      "Isolation: No interference, Durability: Saved forever",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "sql",
      "transactions",
    ]
  },
  {
    id: "j3-32",
    moduleId: "spring-boot",
    question: "Difference between DELETE and TRUNCATE.",
    expectedAnswer: "DELETE is a DML command used to remove specific rows from a table based on a WHERE clause; it logs individual row deletions and can be rolled back. TRUNCATE is a DDL command that quickly removes all rows from a table by deallocating the data pages; it is faster, cannot use a WHERE clause, and typically cannot be rolled back.",
    followUps: [
      "Which is faster and why?",
      "Does TRUNCATE reset auto-increment counters?",
    ],
    keyPoints: [
      "DELETE is DML, TRUNCATE is DDL",
      "DELETE can be rolled back",
      "TRUNCATE is faster",
      "TRUNCATE removes all rows",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "sql",
      "commands",
    ]
  },
  {
    id: "j3-33",
    moduleId: "spring-boot",
    question: "What is Spring Security?",
    expectedAnswer: "Spring Security is a powerful, highly customizable authentication and access-control framework for Java applications. It is the de-facto standard for securing Spring-based apps, providing comprehensive support for protecting against common vulnerabilities like CSRF, handling logins, and integrating with OAuth, JWT, and LDAP.",
    followUps: [
      "What is a SecurityFilterChain?",
      "How do you secure specific endpoints?",
    ],
    keyPoints: [
      "Authentication and Authorization framework",
      "Protects against CSRF, Session Fixation",
      "Highly customizable",
      "Integrates easily with Spring Boot",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "security",
      "spring",
    ]
  },
  {
    id: "j3-34",
    moduleId: "spring-boot",
    question: "What is JWT? How is it used for authentication?",
    expectedAnswer: "JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object. In authentication, a server validates user credentials and issues a JWT. The client stores this token and sends it in the Authorization header of subsequent requests. The server verifies the token's signature without needing to look up a session in the database.",
    followUps: [
      "What are the three parts of a JWT?",
      "Is JWT encrypted or just encoded?",
    ],
    keyPoints: [
      "Stateless authentication",
      "Header, Payload, Signature",
      "Client sends in Authorization header",
      "No server-side session required",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "security",
      "jwt",
    ]
  },
  {
    id: "j3-35",
    moduleId: "spring-boot",
    question: "What is CORS?",
    expectedAnswer: "Cross-Origin Resource Sharing (CORS) is a security feature implemented by web browsers that blocks web pages from making requests to a different domain than the one that served the web page. In Spring Boot, you must configure CORS (e.g., using @CrossOrigin) to explicitly allow your frontend application to communicate with your backend API.",
    followUps: [
      "Why do browsers enforce CORS?",
      "How do you configure global CORS in Spring?",
    ],
    keyPoints: [
      "Browser security feature",
      "Prevents unauthorized cross-origin requests",
      "Configured via @CrossOrigin",
      "Uses OPTIONS preflight requests",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "security",
      "web",
    ]
  },
  {
    id: "j3-36",
    moduleId: "spring-boot",
    question: "What is the difference between authentication and authorization?",
    expectedAnswer: "Authentication is the process of verifying WHO a user is (e.g., logging in with a username and password). Authorization is the process of verifying WHAT a user is allowed to do (e.g., checking if the logged-in user has the \"ADMIN\" role to access a specific endpoint). Authentication precedes authorization.",
    followUps: [
      "What HTTP status code is for failed authentication?",
      "Give an example of authorization.",
    ],
    keyPoints: [
      "Authentication = Identity verification",
      "Authorization = Permission checking",
      "401 for AuthN failure",
      "403 for AuthZ failure",
    ],
    difficulty: "Easy",
    type: "difference",
    tags: [
      "security",
      "basics",
    ]
  },
  {
    id: "j3-37",
    moduleId: "spring-boot",
    question: "What is a RESTful API? Principles of REST?",
    expectedAnswer: "REST (Representational State Transfer) is an architectural style for designing networked applications. Key principles include: client-server separation, statelessness (each request contains all needed info), cacheability, uniform interface (using standard HTTP methods like GET, POST, PUT, DELETE), and layered system architecture.",
    followUps: [
      "What does stateless mean in REST?",
      "Is REST a protocol or an architectural style?",
    ],
    keyPoints: [
      "Architectural style, not protocol",
      "Statelessness",
      "Uses standard HTTP methods",
      "Client-Server architecture",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "rest",
      "architecture",
    ]
  },
  {
    id: "j3-38",
    moduleId: "spring-boot",
    question: "What is the difference between PUT and PATCH?",
    expectedAnswer: "Both are HTTP methods used to update resources. PUT replaces the entire resource with the newly provided data (idempotent). PATCH applies partial modifications to a resource, updating only the fields provided in the request body without affecting the rest of the resource.",
    followUps: [
      "What does idempotent mean?",
      "Which one requires sending the full object state?",
    ],
    keyPoints: [
      "PUT is for full replacement",
      "PATCH is for partial update",
      "PUT is strictly idempotent",
      "PATCH saves bandwidth",
    ],
    difficulty: "Medium",
    type: "difference",
    tags: [
      "rest",
      "http",
    ]
  },
  {
    id: "j3-39",
    moduleId: "spring-boot",
    question: "What is Actuator in Spring Boot?",
    expectedAnswer: "Spring Boot Actuator is a sub-project that provides built-in production-ready features. It exposes operational endpoints (like /actuator/health, /actuator/metrics, /actuator/env) that allow you to monitor and manage your application, view application health, check memory usage, and gather metrics without writing custom code.",
    followUps: [
      "Are actuator endpoints secure by default?",
      "What does the /health endpoint do?",
    ],
    keyPoints: [
      "Production-ready monitoring",
      "Exposes health, metrics, env data",
      "Endpoints like /actuator/health",
      "Needs to be secured in production",
    ],
    difficulty: "Medium",
    type: "definition",
    tags: [
      "springboot",
      "actuator",
    ]
  },
  {
    id: "j3-40",
    moduleId: "spring-boot",
    question: "What is Exception Handling in Spring Boot? (@ControllerAdvice, @ExceptionHandler)",
    expectedAnswer: "@ControllerAdvice allows you to handle exceptions globally across the whole application, acting as an interceptor for exceptions thrown by any @Controller. Combined with @ExceptionHandler methods inside it, you can catch specific exceptions (like EntityNotFoundException) and translate them into consistent, structured HTTP error responses.",
    followUps: [
      "Why use global exception handling?",
      "How do you return a custom error JSON?",
    ],
    keyPoints: [
      "Global error handling",
      "@ControllerAdvice intercepts all controllers",
      "@ExceptionHandler handles specific errors",
      "Creates consistent API error responses",
    ],
    difficulty: "Medium",
    type: "how",
    tags: [
      "springboot",
      "exceptions",
    ]
  }
];
