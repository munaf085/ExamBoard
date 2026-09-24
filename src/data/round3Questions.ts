import { InterviewQuestion } from '../types';

export const round3Questions: InterviewQuestion[] = [
  {
    id: 'R3-001',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Easy',
    question: 'What is ASP.NET Core?',
    followUps: [
      'How does it differ from the legacy .NET Framework?',
      'Is ASP.NET Core cross-platform?'
    ],
    expectedAnswer: 'ASP.NET Core is a cross-platform, high-performance, open-source framework for building modern, cloud-enabled, internet-connected apps. Unlike legacy .NET Framework, it runs on Windows, macOS, and Linux and has built-in dependency injection.',
    keyPoints: [
      'Cross-platform and open-source',
      'High performance',
      'Built-in Dependency Injection',
      'Modular architecture'
    ],
    tags: ['ASP.NET Core', 'Architecture']
  },
  {
    id: 'R3-002',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Easy',
    question: 'What is MVC? Explain the roles of Model, View, and Controller.',
    followUps: [
      'How does data flow between these components?',
      'Why is MVC considered a good design pattern?'
    ],
    expectedAnswer: 'MVC is a design pattern separating an app into three components. The Model represents data and business logic. The View displays the UI. The Controller handles user input, interacts with the Model, and selects the View to render.',
    keyPoints: [
      'Separation of concerns',
      'Model: Data/Business logic',
      'View: User Interface',
      'Controller: Handles requests and coordinates'
    ],
    tags: ['ASP.NET Core', 'MVC']
  },
  {
    id: 'R3-003',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Easy',
    question: 'What is a Controller in ASP.NET Core Web API?',
    followUps: [
      'What base class do API controllers usually inherit from?',
      'What is the [ApiController] attribute used for?'
    ],
    expectedAnswer: 'A Controller is a class that handles incoming HTTP requests and sends responses back to the caller. In Web API, controllers typically inherit from ControllerBase and are decorated with the [ApiController] attribute to enable API-specific behaviors.',
    keyPoints: [
      'Handles HTTP requests (GET, POST, etc.)',
      'Inherits from ControllerBase (not Controller, which includes views)',
      'Uses routing attributes',
      '[ApiController] enables automatic model validation'
    ],
    tags: ['ASP.NET Core', 'Web API', 'Controllers']
  },
  {
    id: 'R3-004',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Medium',
    question: 'What is Routing in ASP.NET Core?',
    followUps: [
      'What is the difference between conventional and attribute routing?',
      'Which one is preferred for Web APIs?'
    ],
    expectedAnswer: 'Routing maps incoming HTTP requests to specific controller actions. Conventional routing uses global patterns defined in Program.cs, while Attribute routing places [Route] attributes directly on controllers and methods. Attribute routing is standard for Web APIs.',
    keyPoints: [
      'Maps URLs to endpoints (actions)',
      'Conventional routing (pattern-based)',
      'Attribute routing (applied directly to classes/methods)',
      'REST APIs primarily use attribute routing'
    ],
    tags: ['ASP.NET Core', 'Routing']
  },
  {
    id: 'R3-005',
    round: 3,
    category: 'Architecture',
    difficulty: 'Medium',
    question: 'What is Dependency Injection (DI) in ASP.NET Core?',
    followUps: [
      'Why is DI useful?',
      'How do you register a service in ASP.NET Core?'
    ],
    expectedAnswer: 'DI is a design pattern used to achieve Inversion of Control between classes and their dependencies. ASP.NET Core has a built-in DI container. It promotes loose coupling, making code more testable and maintainable by injecting dependencies via constructors.',
    keyPoints: [
      'Built-in container in ASP.NET Core',
      'Promotes loose coupling and testability',
      'Injected via constructors',
      'Registered in Program.cs (builder.Services)'
    ],
    tags: ['ASP.NET Core', 'DI', 'Architecture']
  },
  {
    id: 'R3-006',
    round: 3,
    category: 'Architecture',
    difficulty: 'Hard',
    question: 'Explain Transient, Scoped, and Singleton DI lifetimes. Provide a scenario for each.',
    followUps: [
      'Which lifetime is best for Entity Framework DbContext?',
      'What happens if a Singleton service depends on a Transient service?'
    ],
    expectedAnswer: 'Transient creates a new instance every time it is requested (lightweight services). Scoped creates one instance per HTTP request (good for DbContext). Singleton creates one instance for the app\'s lifetime (good for caching services).',
    keyPoints: [
      'Transient: New instance every time',
      'Scoped: One instance per HTTP request',
      'Singleton: One instance globally',
      'Captive Dependency: Singleton shouldn\'t depend on Scoped'
    ],
    tags: ['ASP.NET Core', 'DI']
  },
  {
    id: 'R3-007',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Medium',
    question: 'What is Middleware in ASP.NET Core?',
    followUps: [
      'How does the middleware pipeline work?',
      'What is the difference between app.Use() and app.Run()?'
    ],
    expectedAnswer: 'Middleware is software assembled into an app pipeline to handle requests and responses. Each component can process a request and optionally pass it to the next component using the "next" delegate. Order of registration matters significantly.',
    keyPoints: [
      'Forms the request pipeline',
      'Can short-circuit the pipeline',
      'app.Use() calls next middleware, app.Run() terminates pipeline',
      'Order in Program.cs is critical (e.g., Auth before MVC)'
    ],
    tags: ['ASP.NET Core', 'Middleware']
  },
  {
    id: 'R3-008',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Easy',
    question: 'What is the purpose of appsettings.json?',
    followUps: [
      'How do you handle environment-specific settings?',
      'How do you read values from it in a controller?'
    ],
    expectedAnswer: 'appsettings.json stores application configuration settings, such as database connection strings and API keys. You can have environment-specific files like appsettings.Development.json. Values are accessed using the IConfiguration interface via DI.',
    keyPoints: [
      'Stores configuration key-value pairs',
      'Environment-specific overrides (Development/Production)',
      'Injected via IConfiguration',
      'Can be overridden by environment variables'
    ],
    tags: ['ASP.NET Core', 'Configuration']
  },
  {
    id: 'R3-009',
    round: 3,
    category: 'Web',
    difficulty: 'Easy',
    question: 'What is a Web API?',
    followUps: [
      'What data formats does a Web API typically return?',
      'How does it differ from a standard web application?'
    ],
    expectedAnswer: 'A Web API is an application programming interface for the web that processes HTTP requests and returns data, usually in JSON or XML format, rather than returning HTML views. It allows different systems or client apps (React, mobile) to communicate.',
    keyPoints: [
      'Communicates over HTTP',
      'Returns data (JSON/XML) not HTML',
      'Enables decoupled client-server architecture',
      'Used by frontend SPAs or mobile apps'
    ],
    tags: ['Web API', 'HTTP']
  },
  {
    id: 'R3-010',
    round: 3,
    category: 'Web',
    difficulty: 'Medium',
    question: 'What are the principles of REST?',
    followUps: [
      'What does stateless mean in REST?',
      'How are resources identified?'
    ],
    expectedAnswer: 'REST (Representational State Transfer) is an architectural style. Key principles include being stateless (no client context stored on server between requests), using standard HTTP methods correctly, using URIs to identify resources, and returning standard representations like JSON.',
    keyPoints: [
      'Statelessness',
      'Client-Server separation',
      'Resource-based URIs',
      'Proper use of HTTP verbs (GET, POST, PUT, DELETE)'
    ],
    tags: ['Web API', 'REST']
  },
  {
    id: 'R3-011',
    round: 3,
    category: 'Web',
    difficulty: 'Easy',
    question: 'Explain the standard HTTP Methods: GET, POST, PUT, PATCH, and DELETE.',
    followUps: [
      'What is the difference between PUT and PATCH?',
      'Is GET method idempotent?'
    ],
    expectedAnswer: 'GET retrieves data. POST creates new resources. PUT completely replaces an existing resource. PATCH partially updates a resource. DELETE removes a resource. GET, PUT, and DELETE are idempotent, meaning repeated calls have the same effect.',
    keyPoints: [
      'GET: Read',
      'POST: Create',
      'PUT: Replace completely (Idempotent)',
      'PATCH: Update partially',
      'DELETE: Delete'
    ],
    tags: ['Web API', 'HTTP']
  },
  {
    id: 'R3-012',
    round: 3,
    category: 'Web',
    difficulty: 'Easy',
    question: 'What do HTTP Status Codes 200, 201, 204, 400, 401, 404, and 500 represent?',
    followUps: [
      'When should an API return a 201 Created?',
      'What is the difference between 401 and 403?'
    ],
    expectedAnswer: '2xx means success (200 OK, 201 Created, 204 No Content). 4xx means client error (400 Bad Request, 401 Unauthorized [needs login], 404 Not Found, 403 Forbidden [lacks permissions]). 500 means Internal Server Error (backend crash).',
    keyPoints: [
      '2xx: Success',
      '4xx: Client-side errors (Bad input, Auth)',
      '5xx: Server-side errors',
      '401 vs 403: Authentication vs Authorization'
    ],
    tags: ['Web API', 'HTTP', 'Status Codes']
  },
  {
    id: 'R3-013',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Medium',
    question: 'How does JSON serialization work in .NET Core?',
    followUps: [
      'What is the default library used in modern .NET?',
      'How can you ignore null values during serialization?'
    ],
    expectedAnswer: '.NET Core converts C# objects to JSON (serialization) to send over HTTP, and JSON back to C# objects (deserialization). System.Text.Json is the built-in, high-performance library used by default, replacing Newtonsoft.Json.',
    keyPoints: [
      'Serialization: Object to JSON string',
      'Deserialization: JSON string to Object',
      'System.Text.Json is default',
      'Handled automatically by ASP.NET Core controllers'
    ],
    tags: ['ASP.NET Core', 'JSON']
  },
  {
    id: 'R3-014',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Medium',
    question: 'What is Model Validation and Data Annotations?',
    followUps: [
      'Name some common Data Annotation attributes.',
      'How does an API controller handle validation errors automatically?'
    ],
    expectedAnswer: 'Model Validation ensures that incoming client data is valid. Data Annotations are attributes (like [Required], [MaxLength], [EmailAddress]) applied to C# model properties. Controllers with [ApiController] automatically return a 400 Bad Request if validation fails.',
    keyPoints: [
      'Attributes apply rules to model properties',
      '[Required], [StringLength], [Range]',
      'Checked via ModelState.IsValid (automatic in APIs)',
      'Returns 400 Bad Request on failure'
    ],
    tags: ['ASP.NET Core', 'Validation']
  },
  {
    id: 'R3-015',
    round: 3,
    category: 'Architecture',
    difficulty: 'Medium',
    question: 'What is a DTO (Data Transfer Object) and why do we use it?',
    followUps: [
      'Why not just return database entities directly from the API?',
      'What libraries can help map entities to DTOs?'
    ],
    expectedAnswer: 'A DTO is an object used to carry data between processes. We use DTOs to hide internal database structures (Entities) from clients, reduce payload size by sending only needed fields, and prevent over-posting vulnerabilities. AutoMapper is often used for mapping.',
    keyPoints: [
      'Separates API contracts from Database schemas',
      'Prevents over-posting/mass assignment attacks',
      'Reduces payload size',
      'AutoMapper simplifies Entity <-> DTO mapping'
    ],
    tags: ['Architecture', 'DTO']
  },
  {
    id: 'R3-016',
    round: 3,
    category: 'Database',
    difficulty: 'Easy',
    question: 'What is Entity Framework Core (EF Core)?',
    followUps: [
      'What is an ORM?',
      'What are the advantages of using EF Core over raw SQL?'
    ],
    expectedAnswer: 'EF Core is an Object-Relational Mapper (ORM) for .NET. It allows developers to interact with a database using C# objects and LINQ instead of writing raw SQL queries. It handles connection management, query translation, and data tracking.',
    keyPoints: [
      'ORM (Object-Relational Mapper)',
      'Uses C# objects and LINQ instead of SQL strings',
      'Cross-platform',
      'Improves developer productivity'
    ],
    tags: ['EF Core', 'ORM']
  },
  {
    id: 'R3-017',
    round: 3,
    category: 'Database',
    difficulty: 'Medium',
    question: 'Explain the roles of DbContext and DbSet in EF Core.',
    followUps: [
      'How is DbContext configured with a database string?',
      'What happens when you call SaveChanges()?'
    ],
    expectedAnswer: 'DbContext represents a session with the database and is used to query and save instances of entities. DbSet<T> represents a collection of a specific entity type, corresponding to a table in the database. SaveChanges() executes SQL statements based on tracked changes.',
    keyPoints: [
      'DbContext: Database session/connection manager',
      'DbSet: Represents a specific table',
      'DbContext tracks changes to entities',
      'SaveChanges() writes changes to DB'
    ],
    tags: ['EF Core', 'DbContext']
  },
  {
    id: 'R3-018',
    round: 3,
    category: 'Database',
    difficulty: 'Medium',
    question: 'What is the difference between Code First and Database First approaches?',
    followUps: [
      'What are Migrations in Code First?',
      'When would you choose Database First?'
    ],
    expectedAnswer: 'In Code First, you write C# classes and EF generates the database schema using Migrations. In Database First, the database already exists, and you use scaffolding tools to generate C# classes from the database schema. Code first is preferred for new projects.',
    keyPoints: [
      'Code First: C# drives DB creation (Migrations)',
      'Database First: DB drives C# class generation (Scaffolding)',
      'Code First is better for version control',
      'DB First is needed for legacy databases'
    ],
    tags: ['EF Core', 'Architecture']
  },
  {
    id: 'R3-019',
    round: 3,
    category: 'Database',
    difficulty: 'Medium',
    question: 'What is LINQ and how is it used with EF Core?',
    followUps: [
      'What is IQueryable vs IEnumerable?',
      'How does EF Core translate LINQ queries?'
    ],
    expectedAnswer: 'Language Integrated Query (LINQ) allows writing queries directly in C# syntax. EF Core translates LINQ queries written against DbSets into SQL queries executed on the database. Using IQueryable ensures filtering occurs on the SQL server rather than in memory.',
    keyPoints: [
      'Queries DB using C# syntax',
      'EF translates LINQ to SQL',
      'IQueryable builds SQL queries dynamically',
      'IEnumerable pulls data into memory before filtering'
    ],
    tags: ['EF Core', 'LINQ']
  },
  {
    id: 'R3-020',
    round: 3,
    category: 'CSharp',
    difficulty: 'Hard',
    question: 'Explain Async/Await and the Task class in .NET.',
    followUps: [
      'Why is async/await crucial for Web APIs?',
      'Can a Task run on the same thread?'
    ],
    expectedAnswer: 'Async/await provides non-blocking asynchronous programming. When an "await" is hit, the thread is freed to handle other requests while waiting for an I/O operation (like DB call) to finish. Task represents an asynchronous operation. This greatly improves Web API throughput.',
    keyPoints: [
      'Frees up threads during I/O operations (DB, network)',
      'Prevents thread blocking, improving scalability',
      'Task represents the async operation',
      'Methods return Task or Task<T>'
    ],
    tags: ['CSharp', 'Async', 'Performance']
  },
  {
    id: 'R3-021',
    round: 3,
    category: 'SQL',
    difficulty: 'Easy',
    question: 'What is SQL Server?',
    followUps: [
      'What does RDBMS stand for?',
      'What is the difference between SQL and SQL Server?'
    ],
    expectedAnswer: 'SQL Server is a Relational Database Management System (RDBMS) developed by Microsoft. It stores and retrieves data requested by applications. SQL is the standard query language, while SQL Server is the proprietary database software executing that language.',
    keyPoints: [
      'Relational Database Management System (RDBMS)',
      'Developed by Microsoft',
      'Uses T-SQL (Transact-SQL) dialect',
      'Stores tabular data'
    ],
    tags: ['SQL', 'Database']
  },
  {
    id: 'R3-022',
    round: 3,
    category: 'SQL',
    difficulty: 'Easy',
    question: 'Explain the SELECT, WHERE, and ORDER BY clauses.',
    followUps: [
      'Does ORDER BY sort ascending or descending by default?',
      'Can you use aliases in the WHERE clause?'
    ],
    expectedAnswer: 'SELECT retrieves specific columns. WHERE filters rows based on a condition before grouping or sorting. ORDER BY sorts the final result set in ASC (default) or DESC order. Aliases defined in SELECT usually cannot be used in WHERE.',
    keyPoints: [
      'SELECT: chooses columns',
      'WHERE: filters rows',
      'ORDER BY: sorts results',
      'ASC is default sorting'
    ],
    tags: ['SQL', 'Queries']
  },
  {
    id: 'R3-023',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    followUps: [
      'What does a RIGHT JOIN do?',
      'Write a simple query using LEFT JOIN.'
    ],
    expectedAnswer: 'INNER JOIN returns only rows that have matching values in both tables. LEFT JOIN returns all rows from the left table, and the matched rows from the right table; if there is no match, NULL values are returned for right table columns.',
    keyPoints: [
      'INNER: only matching rows',
      'LEFT: all from left, matched from right (NULL if no match)',
      'Used to combine data from multiple tables',
      'Requires an ON condition'
    ],
    tags: ['SQL', 'Joins']
  },
  {
    id: 'R3-024',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'What is the difference between GROUP BY and HAVING?',
    followUps: [
      'Can you use aggregate functions in the WHERE clause?',
      'Does WHERE execute before or after HAVING?'
    ],
    expectedAnswer: 'GROUP BY aggregates rows with the same values into summary rows (using COUNT, SUM). HAVING is used to filter those grouped records. WHERE filters individual rows before grouping, while HAVING filters aggregated rows after grouping.',
    keyPoints: [
      'WHERE filters before aggregation',
      'GROUP BY groups rows by column values',
      'HAVING filters after aggregation',
      'HAVING works with aggregate functions (SUM, COUNT)'
    ],
    tags: ['SQL', 'Queries']
  },
  {
    id: 'R3-025',
    round: 3,
    category: 'SQL',
    difficulty: 'Hard',
    question: 'Write a SQL query to find the second highest salary in an Employee table.',
    followUps: [
      'How would you find the Nth highest salary?',
      'Can you use a CTE or window function like DENSE_RANK()?'
    ],
    expectedAnswer: 'Using subqueries: SELECT MAX(Salary) FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee). Using ORDER BY and OFFSET (SQL Server): SELECT Salary FROM Employee ORDER BY Salary DESC OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY.',
    keyPoints: [
      'Subquery with MAX() is common for 2nd highest',
      'OFFSET / FETCH is more modern and scalable',
      'DENSE_RANK() OVER (ORDER BY Salary DESC) works for Nth highest',
      'Must handle duplicates properly'
    ],
    tags: ['SQL', 'Queries', 'Practical']
  },
  {
    id: 'R3-026',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'Subquery vs JOIN: When would you use one over the other?',
    followUps: [
      'Which is generally faster?',
      'What is a Correlated Subquery?'
    ],
    expectedAnswer: 'JOINs are generally faster and better optimized by the SQL engine, used when retrieving columns from multiple tables. Subqueries are often easier to read for complex step-by-step logic, but correlated subqueries can cause performance issues as they run per row.',
    keyPoints: [
      'JOINs combine columns, usually faster',
      'Subqueries act as temporary result sets',
      'Modern query optimizers often convert subqueries to JOINs',
      'Correlated subqueries execute once per outer row'
    ],
    tags: ['SQL', 'Performance']
  },
  {
    id: 'R3-027',
    round: 3,
    category: 'SQL',
    difficulty: 'Easy',
    question: 'Explain Primary Key, Foreign Key, and Unique Key.',
    followUps: [
      'Can a Primary Key contain NULL?',
      'Can a table have multiple Unique Keys?'
    ],
    expectedAnswer: 'Primary Key uniquely identifies each row (no NULLs allowed, only one per table). Foreign Key establishes a link between tables referencing a Primary Key. Unique Key ensures all values in a column are distinct, but allows a single NULL and a table can have many.',
    keyPoints: [
      'PK: Uniquely identifies row, no NULLs, one per table',
      'FK: Maintains referential integrity between tables',
      'UK: Ensures uniqueness, allows one NULL, multiple per table'
    ],
    tags: ['SQL', 'Database Design']
  },
  {
    id: 'R3-028',
    round: 3,
    category: 'SQL',
    difficulty: 'Hard',
    question: 'What is Database Normalization? Briefly explain 1NF, 2NF, and 3NF.',
    followUps: [
      'What is Denormalization and when is it used?',
      'What anomaly does normalization prevent?'
    ],
    expectedAnswer: 'Normalization organizes data to reduce redundancy and improve integrity. 1NF ensures atomic values (no repeating groups). 2NF removes partial dependencies (non-key attributes depend on the whole key). 3NF removes transitive dependencies (non-key attributes depend only on the primary key).',
    keyPoints: [
      'Reduces data redundancy and anomalies (insert/update/delete)',
      '1NF: Atomic values',
      '2NF: 1NF + No partial dependencies',
      '3NF: 2NF + No transitive dependencies'
    ],
    tags: ['SQL', 'Database Design', 'Normalization']
  },
  {
    id: 'R3-029',
    round: 3,
    category: 'SQL',
    difficulty: 'Hard',
    question: 'What is the difference between Clustered and Non-Clustered Indexes?',
    followUps: [
      'How many clustered indexes can a table have?',
      'Does creating an index speed up INSERT operations?'
    ],
    expectedAnswer: 'A Clustered Index determines the physical order of data rows in the table (hence only 1 per table), usually the Primary Key. A Non-Clustered Index stores a separate sorted structure pointing to the actual data rows (like a book index), and a table can have many.',
    keyPoints: [
      'Clustered: Sorts actual data rows (1 per table)',
      'Non-Clustered: Separate structure pointing to data (many per table)',
      'Indexes speed up SELECTs but slow down INSERT/UPDATE/DELETE'
    ],
    tags: ['SQL', 'Performance', 'Indexes']
  },
  {
    id: 'R3-030',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'What is the difference between a Stored Procedure and a Function in SQL Server?',
    followUps: [
      'Can you call a Stored Procedure inside a SELECT statement?',
      'Which one can handle transactions?'
    ],
    expectedAnswer: 'A Function must return a value, cannot modify database state (DML), and can be used in SELECT/WHERE clauses. A Stored Procedure may or may not return values, can execute DML (INSERT/UPDATE), manage transactions, but cannot be used in a SELECT statement.',
    keyPoints: [
      'Functions must return a value, SPs do not have to',
      'Functions cannot change data (DML), SPs can',
      'Functions can be used in SELECT, SPs are called via EXEC',
      'SPs support transactions'
    ],
    tags: ['SQL', 'Database Objects']
  },
  {
    id: 'R3-031',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'What are Database Transactions and ACID properties?',
    followUps: [
      'What happens if a transaction fails halfway through?',
      'What does Isolation mean in ACID?'
    ],
    expectedAnswer: 'A transaction is a logical unit of work. ACID stands for Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don\'t interfere), and Durability (committed data is saved permanently, even after power loss).',
    keyPoints: [
      'Atomicity: All operations succeed or fail together (Rollback)',
      'Consistency: Data adheres to constraints',
      'Isolation: Concurrent execution is safe',
      'Durability: Saved permanently'
    ],
    tags: ['SQL', 'Transactions']
  },
  {
    id: 'R3-032',
    round: 3,
    category: 'SQL',
    difficulty: 'Medium',
    question: 'How do you handle NULL values in SQL queries?',
    followUps: [
      'What is the ISNULL or COALESCE function?',
      'Does "column = NULL" work?'
    ],
    expectedAnswer: 'NULL represents missing data. You must use "IS NULL" or "IS NOT NULL" to check for it, rather than "=" or "!=". Functions like ISNULL() (SQL Server) or COALESCE() are used to provide a default value when a NULL is encountered.',
    keyPoints: [
      'Cannot use standard operators (=) to check for NULL',
      'Use IS NULL / IS NOT NULL',
      'COALESCE() returns the first non-null expression',
      'ISNULL() replaces NULL with a specific value'
    ],
    tags: ['SQL', 'Data Types']
  },
  {
    id: 'R3-033',
    round: 3,
    category: 'Frontend',
    difficulty: 'Easy',
    question: 'In JavaScript, what is the difference between var, let, and const?',
    followUps: [
      'What is block scoping?',
      'Can you mutate a const object in JavaScript?'
    ],
    expectedAnswer: '"var" is function-scoped and allows hoisting. "let" is block-scoped (inside {}) and can be reassigned. "const" is block-scoped and cannot be reassigned, though the contents of a const object or array can still be mutated.',
    keyPoints: [
      'var: Function scope, hoisted',
      'let: Block scope, reassignable',
      'const: Block scope, cannot reassign identifier',
      'const objects are still mutable'
    ],
    tags: ['JavaScript', 'Variables']
  },
  {
    id: 'R3-034',
    round: 3,
    category: 'Frontend',
    difficulty: 'Easy',
    question: 'Explain the CSS Box Model.',
    followUps: [
      'What is box-sizing: border-box?',
      'How does margin collapse work?'
    ],
    expectedAnswer: 'The CSS Box Model represents every element as a rectangular box. Moving from inside to outside, it consists of: Content (the text/image), Padding (space around content), Border (line around padding), and Margin (space outside border between elements).',
    keyPoints: [
      'Content -> Padding -> Border -> Margin',
      'Padding is inside the border, Margin is outside',
      'Affects layout dimensions',
      'border-box includes padding/border in element width'
    ],
    tags: ['CSS', 'Layout']
  },
  {
    id: 'R3-035',
    round: 3,
    category: 'Frontend',
    difficulty: 'Medium',
    question: 'What is Flexbox in CSS?',
    followUps: [
      'What is the difference between justify-content and align-items?',
      'How do you center a div perfectly using Flexbox?'
    ],
    expectedAnswer: 'Flexbox is a one-dimensional layout model used for aligning and distributing space among items in a container. It excels at vertical centering and equal spacing. justify-content aligns items on the main axis, while align-items aligns them on the cross axis.',
    keyPoints: [
      'One-dimensional layout (row or column)',
      'display: flex;',
      'justify-content (main axis)',
      'align-items (cross axis)',
      'Center: justify-content: center; align-items: center;'
    ],
    tags: ['CSS', 'Flexbox']
  },
  {
    id: 'R3-036',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Hard',
    question: 'How do you handle Exceptions globally in an ASP.NET Core Web API?',
    followUps: [
      'What is the standard response format for API errors?',
      'What is a custom middleware vs exception filter?'
    ],
    expectedAnswer: 'Global exception handling is usually done using custom Exception Handling Middleware or the built-in UseExceptionHandler middleware. This intercepts unhandled exceptions, logs them, and returns a standard JSON response (like ProblemDetails) with appropriate HTTP status codes.',
    keyPoints: [
      'Prevents server crashes from unhandled errors',
      'Custom Middleware catches exceptions using try/catch',
      'Standardizes API error responses (ProblemDetails)',
      'Keeps controllers clean'
    ],
    tags: ['ASP.NET Core', 'Exceptions']
  },
  {
    id: 'R3-037',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Hard',
    question: 'What is CORS and how do you configure it in ASP.NET Core?',
    followUps: [
      'Why does the browser block requests to different origins?',
      'Is CORS a security feature for the server or the browser?'
    ],
    expectedAnswer: 'Cross-Origin Resource Sharing (CORS) is a browser security feature restricting web pages from making requests to a different domain. In ASP.NET Core, it is configured in Program.cs by adding the CORS service and middleware, specifying allowed origins, headers, and methods.',
    keyPoints: [
      'Browser security feature (Same-Origin Policy)',
      'Server must explicitly allow other domains',
      'Configured via builder.Services.AddCors() and app.UseCors()',
      'Allows frontend apps (like React on port 3000) to call the API'
    ],
    tags: ['ASP.NET Core', 'Security', 'Web API']
  },
  {
    id: 'R3-038',
    round: 3,
    category: 'Architecture',
    difficulty: 'Medium',
    question: 'What is the Repository Pattern?',
    followUps: [
      'Why is it often combined with the Unit of Work pattern?',
      'Do you always need a Repository pattern when using EF Core?'
    ],
    expectedAnswer: 'The Repository Pattern abstracts data access logic behind an interface, acting as a collection of domain objects in memory. It decouples business logic from EF Core, making the application easier to test. However, EF Core already implements a Repository (DbSet) and Unit of Work (DbContext).',
    keyPoints: [
      'Abstracts data access logic',
      'Improves testability via mocking',
      'Decouples business logic from ORM',
      'EF Core DbContext is already a Unit of Work'
    ],
    tags: ['Architecture', 'Patterns']
  },
  {
    id: 'R3-039',
    round: 3,
    category: 'Security',
    difficulty: 'Medium',
    question: 'What is JWT Authentication?',
    followUps: [
      'Where should a client store a JWT?',
      'How does the server validate it without a database query?'
    ],
    expectedAnswer: 'JSON Web Token (JWT) is a standard for securely transmitting information between parties as a JSON object. The server signs the token using a secret key. In APIs, clients send the JWT in the Authorization header. The server validates the signature mathematically without hitting the DB.',
    keyPoints: [
      'Stateless authentication',
      'Contains three parts: Header, Payload, Signature',
      'Sent in Authorization: Bearer header',
      'Validated using a secret key on the server'
    ],
    tags: ['Security', 'Auth', 'Web API']
  },
  {
    id: 'R3-040',
    round: 3,
    category: 'Database',
    difficulty: 'Hard',
    question: 'What is N+1 Query Problem in Entity Framework?',
    followUps: [
      'How does eager loading fix this?',
      'What keyword is used for eager loading in EF Core?'
    ],
    expectedAnswer: 'The N+1 problem occurs when an application executes one query to fetch N parent records, and then executes N additional queries to fetch child records for each parent. This degrades performance. It is solved by Eager Loading using the .Include() method in EF Core.',
    keyPoints: [
      'Causes excessive database queries',
      'Happens with lazy loading or unoptimized loops',
      'Fix by using Eager Loading (.Include())',
      'Fetches related data in a single JOIN query'
    ],
    tags: ['EF Core', 'Performance']
  },
  {
    id: 'R3-041',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Medium',
    question: 'How do you perform logging in ASP.NET Core?',
    followUps: [
      'What is the ILogger interface?',
      'Name some third-party logging providers.'
    ],
    expectedAnswer: 'ASP.NET Core has a built-in logging API. You inject ILogger<T> into constructors to log messages at various levels (Info, Warn, Error). It can route logs to the console, files, or third-party providers like Serilog or NLog for structured logging.',
    keyPoints: [
      'Inject ILogger<T> via DI',
      'Log levels: Trace, Debug, Info, Warn, Error, Critical',
      'Configured in appsettings.json',
      'Serilog is popular for writing to files/databases'
    ],
    tags: ['ASP.NET Core', 'Logging']
  },
  {
    id: 'R3-042',
    round: 3,
    category: 'Frontend',
    difficulty: 'Medium',
    question: 'What are JavaScript Promises?',
    followUps: [
      'How do async/await keywords relate to Promises?',
      'What are the three states of a Promise?'
    ],
    expectedAnswer: 'A Promise represents the eventual completion or failure of an asynchronous operation. It has three states: Pending, Fulfilled, or Rejected. It solves "callback hell" by using .then() and .catch(). Async/await is syntactic sugar over Promises.',
    keyPoints: [
      'Handles asynchronous JS operations (e.g., fetch API)',
      'States: Pending, Fulfilled, Rejected',
      'Uses .then() for success and .catch() for errors',
      'Async/await makes promise code look synchronous'
    ],
    tags: ['JavaScript', 'Async']
  },
  {
    id: 'R3-043',
    round: 3,
    category: 'Security',
    difficulty: 'Medium',
    question: 'What is SQL Injection and how do you prevent it?',
    followUps: [
      'Does Entity Framework protect against SQL Injection?',
      'What are parameterized queries?'
    ],
    expectedAnswer: 'SQL Injection is a vulnerability where malicious SQL statements are inserted into input fields to manipulate the database. It is prevented by using parameterized queries or ORMs like EF Core, which automatically parameterize inputs rather than concatenating strings.',
    keyPoints: [
      'Malicious user input altering SQL queries',
      'Never concatenate user input directly into SQL strings',
      'Use Parameterized Queries or Stored Procedures',
      'EF Core protects by default via LINQ'
    ],
    tags: ['Security', 'SQL']
  },
  {
    id: 'R3-044',
    round: 3,
    category: 'Security',
    difficulty: 'Medium',
    question: 'What is XSS (Cross-Site Scripting)?',
    followUps: [
      'How does ASP.NET Core MVC mitigate this?',
      'How is it different from CSRF?'
    ],
    expectedAnswer: 'XSS occurs when an attacker injects malicious JavaScript into a web page viewed by other users. When executed, it can steal cookies or tokens. Frameworks like ASP.NET Core MVC automatically HTML-encode user output to prevent scripts from running.',
    keyPoints: [
      'Attacker injects malicious scripts into web pages',
      'Aims to steal user data/tokens',
      'Prevented by encoding/sanitizing output',
      'Modern frontend frameworks (React, Angular) auto-escape by default'
    ],
    tags: ['Security', 'Frontend']
  },
  {
    id: 'R3-045',
    round: 3,
    category: 'ASP.NET',
    difficulty: 'Hard',
    question: 'What is a BackgroundService or HostedService in ASP.NET Core?',
    followUps: [
      'When would you use it instead of a Controller?',
      'How does it run relative to HTTP requests?'
    ],
    expectedAnswer: 'IHostedService or BackgroundService allows you to run background tasks in an ASP.NET Core application independent of HTTP requests. It is useful for polling databases, processing queues, or running scheduled tasks while the web server handles normal traffic.',
    keyPoints: [
      'Runs long-running tasks in the background',
      'Inherits from BackgroundService (ExecuteAsync method)',
      'Independent of HTTP request lifecycle',
      'Registered via AddHostedService in DI'
    ],
    tags: ['ASP.NET Core', 'Architecture']
  },
  {
    id: 'R3-046',
    round: 3,
    category: 'Database',
    difficulty: 'Hard',
    question: 'Explain optimistic concurrency in EF Core.',
    followUps: [
      'How does a RowVersion or Timestamp column help?',
      'What exception is thrown when a conflict occurs?'
    ],
    expectedAnswer: 'Optimistic concurrency allows multiple users to read data without locking. When updating, it checks if another user modified the data since it was read. EF Core uses a concurrency token (like a RowVersion column) and throws DbUpdateConcurrencyException if the token changed.',
    keyPoints: [
      'No DB locks during read',
      'Assumes conflicts are rare',
      'Uses Concurrency Token (RowVersion)',
      'Throws DbUpdateConcurrencyException on conflict'
    ],
    tags: ['EF Core', 'Database']
  },
  {
    id: 'R3-047',
    round: 3,
    category: 'Architecture',
    difficulty: 'Hard',
    question: 'What are Microservices?',
    followUps: [
      'How do they communicate with each other?',
      'What is an API Gateway?'
    ],
    expectedAnswer: 'Microservices is an architecture where an application is composed of small, independent services communicating over a network (usually HTTP/REST or Message Queues). They can be developed, deployed, and scaled independently, unlike a monolithic architecture.',
    keyPoints: [
      'Small, independent, loosely coupled services',
      'Independent deployment and scaling',
      'Communicate via HTTP, gRPC, or Message Queues (RabbitMQ)',
      'Each has its own database usually'
    ],
    tags: ['Architecture', 'System Design']
  },
  {
    id: 'R3-048',
    round: 3,
    category: 'Web',
    difficulty: 'Medium',
    question: 'What is SignalR used for?',
    followUps: [
      'What protocol does it prefer to use?',
      'Give an example of an application that needs SignalR.'
    ],
    expectedAnswer: 'SignalR is a library for ASP.NET Core that enables real-time web functionality. It allows the server to push content to connected clients instantly. It automatically uses WebSockets where available, falling back to other techniques if necessary. Used for chat apps or live dashboards.',
    keyPoints: [
      'Enables real-time server-to-client communication',
      'Abstracts away connection management',
      'Uses WebSockets primarily',
      'Great for chat apps, live notifications, gaming'
    ],
    tags: ['ASP.NET Core', 'Web', 'Real-time']
  },
  {
    id: 'R3-049',
    round: 3,
    category: 'SQL',
    difficulty: 'Hard',
    question: 'What is a SQL View?',
    followUps: [
      'Can you insert data into a view?',
      'Does a standard view store data on disk?'
    ],
    expectedAnswer: 'A View is a virtual table based on the result-set of a SQL statement. It does not store data itself (unless it is an Indexed/Materialized View) but simplifies complex queries, encapsulates logic, and can restrict access to specific rows/columns of underlying tables.',
    keyPoints: [
      'Virtual table from a SELECT query',
      'Does not store data (standard view)',
      'Simplifies complex JOINs for the user',
      'Provides an extra layer of security'
    ],
    tags: ['SQL', 'Database Objects']
  },
  {
    id: 'R3-050',
    round: 3,
    category: 'CSharp',
    difficulty: 'Medium',
    question: 'What is the purpose of the IQueryable interface?',
    followUps: [
      'How does it differ from IEnumerable when querying a database?',
      'What namespace does it belong to?'
    ],
    expectedAnswer: 'IQueryable extends IEnumerable and is designed for querying data against a specific data source (like a database via EF Core). LINQ commands applied to IQueryable build an expression tree, which is translated to a single SQL query and executed on the database server.',
    keyPoints: [
      'Builds expression trees',
      'Executes query on the server side (SQL server)',
      'Extends IEnumerable',
      'Best for querying out-of-memory databases'
    ],
    tags: ['CSharp', 'LINQ']
  }
];
