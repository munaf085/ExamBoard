import { WrittenQuestion } from '../../types';

export const medium2Questions: WrittenQuestion[] = [
  {
    "id": "M2-CS-001",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Virtual vs override?",
    "options": [
      "Virtual hides",
      "Override modifies base virtual",
      "Same",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Override changes virtual",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-002",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Abstract vs Interface?",
    "options": [
      "Same",
      "Abstract can have implementation",
      "Interface faster",
      "No diff"
    ],
    "correctAnswer": 1,
    "explanation": "Abstract allows shared implementation",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-003",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "List<T> vs ArrayList?",
    "options": [
      "List is generic and type safe",
      "ArrayList is faster",
      "Same",
      "List is deprecated"
    ],
    "correctAnswer": 0,
    "explanation": "Type safety",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-004",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Sealed class?",
    "options": [
      "Can be inherited",
      "Cannot be inherited",
      "Abstract",
      "Static"
    ],
    "correctAnswer": 1,
    "explanation": "Prevents inheritance",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-005",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Static constructor?",
    "options": [
      "Called per instance",
      "Called once before first use",
      "Needs parameters",
      "Public access"
    ],
    "correctAnswer": 1,
    "explanation": "Once per type",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-006",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Delegate?",
    "options": [
      "Type safe function pointer",
      "Class",
      "Interface",
      "Variable"
    ],
    "correctAnswer": 0,
    "explanation": "Function pointer",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-007",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "using block?",
    "options": [
      "Imports namespace",
      "Calls Dispose automatically",
      "Same as try",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "IDisposable pattern",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-CS-008",
    "paperId": "medium-2",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Boxing?",
    "options": [
      "Value to reference",
      "Reference to value",
      "Class to Interface",
      "Copy"
    ],
    "correctAnswer": 0,
    "explanation": "Value type to object",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M2-DO-009",
    "paperId": "medium-2",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "PUT vs PATCH?",
    "options": [
      "Both replace",
      "PUT replaces, PATCH partial",
      "PATCH replaces",
      "Same"
    ],
    "correctAnswer": 1,
    "explanation": "PATCH is partial update",
    "tags": [
      "WebAPI"
    ]
  },
  {
    "id": "M2-WE-010",
    "paperId": "medium-2",
    "category": "WebAPI",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "REST Resource naming?",
    "options": [
      "Verbs",
      "Plural nouns",
      "CamelCase",
      "Random"
    ],
    "correctAnswer": 1,
    "explanation": "Plural nouns /users",
    "tags": [
      "WebAPI"
    ]
  },
  {
    "id": "M2-WE-011",
    "paperId": "medium-2",
    "category": "WebAPI",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Route parameter [Route(\"{id}\")]?",
    "options": [
      "Query string",
      "Path variable",
      "Body",
      "Header"
    ],
    "correctAnswer": 1,
    "explanation": "Extracted from path",
    "tags": [
      "WebAPI"
    ]
  },
  {
    "id": "M2-DO-012",
    "paperId": "medium-2",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Auth vs Authz?",
    "options": [
      "Same",
      "Auth = who, Authz = what they can do",
      "Opposite",
      "Tokens"
    ],
    "correctAnswer": 1,
    "explanation": "Identity vs Permissions",
    "tags": [
      "Security"
    ]
  },
  {
    "id": "M2-DO-013",
    "paperId": "medium-2",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "JWT structure?",
    "options": [
      "Header, Payload, Signature",
      "Header, Body",
      "Token, Key",
      "Payload"
    ],
    "correctAnswer": 0,
    "explanation": "3 parts base64",
    "tags": [
      "Security"
    ]
  },
  {
    "id": "M2-DO-014",
    "paperId": "medium-2",
    "category": "DotNet",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "DbContext?",
    "options": [
      "Connection string",
      "Represents session with DB",
      "Query",
      "Table"
    ],
    "correctAnswer": 1,
    "explanation": "Unit of work session",
    "tags": [
      "EF"
    ]
  },
  {
    "id": "M2-DO-015",
    "paperId": "medium-2",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Repository Pattern?",
    "options": [
      "Abstracts DB layer",
      "UI pattern",
      "Routing",
      "MVC"
    ],
    "correctAnswer": 0,
    "explanation": "Data access abstraction",
    "tags": [
      "Architecture"
    ]
  },
  {
    "id": "M2-SQ-016",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "LEFT JOIN vs INNER JOIN?",
    "options": [
      "Same",
      "LEFT includes unmatched from left",
      "INNER includes unmatched",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Left retains all left rows",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-017",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "sql-analysis",
    "question": "CASE WHEN?",
    "options": [
      "Like Switch",
      "Like For loop",
      "Like While",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Conditional logic",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-018",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "SUBSTRING?",
    "options": [
      "Extracts part of string",
      "Matches string",
      "Converts case",
      "Length"
    ],
    "correctAnswer": 0,
    "explanation": "String extraction",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-019",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "GETDATE()?",
    "options": [
      "Current timestamp",
      "Current year",
      "Input date",
      "String"
    ],
    "correctAnswer": 0,
    "explanation": "System time",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-020",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Stored Proc vs Function?",
    "options": [
      "Func can return table",
      "Proc must return value",
      "Func cannot change data",
      "Same"
    ],
    "correctAnswer": 2,
    "explanation": "Functions generally cannot have side effects",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-021",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "View?",
    "options": [
      "Virtual table based on query",
      "Physical copy",
      "Index",
      "Trigger"
    ],
    "correctAnswer": 0,
    "explanation": "Saved query",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-022",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "3NF?",
    "options": [
      "No repeating groups",
      "No partial dependency",
      "No transitive dependency",
      "Primary key"
    ],
    "correctAnswer": 2,
    "explanation": "Transitive dependency removal",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-SQ-023",
    "paperId": "medium-2",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "LEN()?",
    "options": [
      "Bytes",
      "Characters",
      "Words",
      "Lines"
    ],
    "correctAnswer": 1,
    "explanation": "Character count",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M2-DS-024",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Linked list vs Array?",
    "options": [
      "List is contiguous",
      "Array is contiguous",
      "Same",
      "List is faster for random access"
    ],
    "correctAnswer": 1,
    "explanation": "Arrays have contiguous memory",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-025",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Middle of linked list?",
    "options": [
      "Count then divide",
      "Fast and slow pointers",
      "Hash map",
      "Stack"
    ],
    "correctAnswer": 1,
    "explanation": "Tortoise and hare",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-026",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Queue enqueue/dequeue?",
    "options": [
      "LIFO",
      "FIFO",
      "Random",
      "Priority"
    ],
    "correctAnswer": 1,
    "explanation": "First In First Out",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-027",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "loop-trace",
    "question": "Fibonacci Output?",
    "code": "int a=0, b=1; for(int i=0;i<4;i++){ Console.Write(a+\" \"); int temp=a; a=b; b=temp+b; } Console.Write(a);",
    "options": [
      "1 1 2",
      "0 1 1 2 3",
      "Error",
      "1 2 3"
    ],
    "correctAnswer": 1,
    "explanation": "Fib sequence",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-028",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Character frequency?",
    "options": [
      "Hash map / Array",
      "Stack",
      "Queue",
      "Tree"
    ],
    "correctAnswer": 0,
    "explanation": "Map char to count",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-029",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Missing number 1 to N?",
    "options": [
      "Sum formula N(N+1)/2",
      "Sort",
      "Hash map",
      "Loop"
    ],
    "correctAnswer": 0,
    "explanation": "Expected sum - actual sum",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-DS-030",
    "paperId": "medium-2",
    "category": "DSA",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Sorting stability?",
    "options": [
      "Fast",
      "Equal elements retain relative order",
      "Uses less memory",
      "In-place"
    ],
    "correctAnswer": 1,
    "explanation": "Relative order maintained",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M2-FR-031",
    "paperId": "medium-2",
    "category": "Frontend",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "var vs let?",
    "options": [
      "var is block scoped",
      "let is block scoped",
      "Same",
      "let is global"
    ],
    "correctAnswer": 1,
    "explanation": "let has block scope",
    "tags": [
      "JS"
    ]
  },
  {
    "id": "M2-FR-032",
    "paperId": "medium-2",
    "category": "Frontend",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Box model?",
    "options": [
      "Margin, Border, Padding, Content",
      "Width, Height",
      "Color",
      "Display"
    ],
    "correctAnswer": 0,
    "explanation": "CSS structure",
    "tags": [
      "CSS"
    ]
  },
  {
    "id": "M2-FR-033",
    "paperId": "medium-2",
    "category": "Frontend",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Form validation?",
    "options": [
      "required, minlength",
      "validate",
      "check",
      "valid"
    ],
    "correctAnswer": 0,
    "explanation": "HTML5 attributes",
    "tags": [
      "HTML"
    ]
  },
  {
    "id": "M2-FR-034",
    "paperId": "medium-2",
    "category": "Frontend",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "getElementById?",
    "options": [
      "Selects by class",
      "Selects by id",
      "Selects all",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "ID selection",
    "tags": [
      "JS"
    ]
  },
  {
    "id": "M2-OS-035",
    "paperId": "medium-2",
    "category": "OS",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Virtual Memory?",
    "options": [
      "RAM",
      "Separates logical from physical memory",
      "Cache",
      "Disk"
    ],
    "correctAnswer": 1,
    "explanation": "Abstraction of memory",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M2-OS-036",
    "paperId": "medium-2",
    "category": "OS",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Thrashing?",
    "options": [
      "High CPU",
      "Excessive paging causing low throughput",
      "Fast execution",
      "Disk crash"
    ],
    "correctAnswer": 1,
    "explanation": "Spending more time paging than executing",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M2-OS-037",
    "paperId": "medium-2",
    "category": "OS",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Context Switch?",
    "options": [
      "Saving state of old process and loading new",
      "Closing app",
      "Reboot",
      "User switch"
    ],
    "correctAnswer": 0,
    "explanation": "CPU switches processes",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M2-AG-038",
    "paperId": "medium-2",
    "category": "Agile",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Definition of Done?",
    "options": [
      "Coded",
      "Shared understanding of what it means for work to be complete",
      "Deployed",
      "Tested"
    ],
    "correctAnswer": 1,
    "explanation": "Checklist for completeness",
    "tags": [
      "Agile"
    ]
  },
  {
    "id": "M2-AG-039",
    "paperId": "medium-2",
    "category": "Agile",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Scrum Master?",
    "options": [
      "Boss",
      "Removes impediments and facilitates",
      "Writes code",
      "Tests"
    ],
    "correctAnswer": 1,
    "explanation": "Facilitator",
    "tags": [
      "Agile"
    ]
  },
  {
    "id": "M2-AG-040",
    "paperId": "medium-2",
    "category": "Agile",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Review vs Retrospective?",
    "options": [
      "Review is product, Retro is process",
      "Same",
      "Review is process",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Inspect product vs inspect process",
    "tags": [
      "Agile"
    ]
  }
];
