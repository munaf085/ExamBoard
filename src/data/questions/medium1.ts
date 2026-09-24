import { WrittenQuestion } from '../../types';

export const medium1Questions: WrittenQuestion[] = [
  {
    "id": "M1-CS-001",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "code-output",
    "question": "What is the output of nested class instantiation?",
    "code": "public class Outer { public class Inner { public string Get() => \"Inner\"; } } \nOuter.Inner obj = new Outer.Inner();\nConsole.Write(obj.Get());",
    "options": [
      "Inner",
      "Outer",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Nested class access",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M1-CS-002",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "code-output",
    "question": "What is the value of x?",
    "code": "void Modify(ref int val) { val = 10; }\nint x = 5;\nModify(ref x);",
    "options": [
      "5",
      "10",
      "0",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "ref keyword",
    "tags": [
      "C#",
      "ref"
    ]
  },
  {
    "id": "M1-CS-003",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Easy",
    "type": "code-output",
    "question": "In what order are the blocks executed?",
    "code": "try { throw new Exception(); } catch { Console.Write(\"C\"); } finally { Console.Write(\"F\"); }",
    "options": [
      "CF",
      "FC",
      "C",
      "F"
    ],
    "correctAnswer": 0,
    "explanation": "Catch then finally",
    "tags": [
      "C#",
      "exceptions"
    ]
  },
  {
    "id": "M1-CS-004",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Explicit interface implementation syntax?",
    "options": [
      "public void IMyInterface.Method()",
      "void IMyInterface.Method()",
      "explicit void Method()",
      "private void Method()"
    ],
    "correctAnswer": 1,
    "explanation": "No access modifiers on explicit",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M1-CS-005",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Which method is called: Print(int) or Print(double) with Print(5)?",
    "options": [
      "int",
      "double",
      "Error",
      "Runtime"
    ],
    "correctAnswer": 0,
    "explanation": "Exact match resolution",
    "tags": [
      "C#",
      "overload"
    ]
  },
  {
    "id": "M1-CS-006",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Why use StringBuilder over string concatenation?",
    "options": [
      "Immutable",
      "Avoids multiple objects",
      "Faster concatenation",
      "Thread safe"
    ],
    "correctAnswer": 1,
    "explanation": "Modifies buffer",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M1-CS-007",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "code-output",
    "question": "Output?",
    "code": "var nums = new[] { 1, 2, 3 };\nvar res = nums.Where(n => n > 1).Select(n => n * 2);\nConsole.Write(string.Join(\",\", res));",
    "options": [
      "2,4,6",
      "4,6",
      "2,3",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Where >1 then Select *2",
    "tags": [
      "C#",
      "LINQ"
    ]
  },
  {
    "id": "M1-CS-008",
    "paperId": "medium-1",
    "category": "CSharp",
    "difficulty": "Medium",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "for (int i = 1; i <= 3; i++)\n{\n    for (int j = 1; j <= i; j++)\n    {\n        Console.Write(j + \" \");\n    }\n    Console.WriteLine();\n}",
    "options": [
      "1 \\n1 2 \\n1 2 3 \\n",
      "1\\n12\\n123",
      "1 2 3\\n1 2\\n1",
      "1\\n2\\n3"
    ],
    "correctAnswer": 0,
    "explanation": "Nested loop trace",
    "tags": [
      "C#"
    ]
  },
  {
    "id": "M1-DO-009",
    "paperId": "medium-1",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Which DI lifetime creates a new instance per HTTP request?",
    "options": [
      "Transient",
      "Scoped",
      "Singleton",
      "Static"
    ],
    "correctAnswer": 1,
    "explanation": "Scoped is per request",
    "tags": [
      "DI"
    ]
  },
  {
    "id": "M1-WE-010",
    "paperId": "medium-1",
    "category": "WebAPI",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "HTTP status code for resource created?",
    "options": [
      "200",
      "201",
      "204",
      "400"
    ],
    "correctAnswer": 1,
    "explanation": "201 Created",
    "tags": [
      "HTTP"
    ]
  },
  {
    "id": "M1-WE-011",
    "paperId": "medium-1",
    "category": "WebAPI",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Key difference between GET and POST?",
    "options": [
      "GET is idempotent",
      "POST is idempotent",
      "GET has body",
      "No difference"
    ],
    "correctAnswer": 0,
    "explanation": "GET idempotent",
    "tags": [
      "HTTP"
    ]
  },
  {
    "id": "M1-DO-012",
    "paperId": "medium-1",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Controller return type?",
    "options": [
      "string",
      "ActionResult<T>",
      "IActionResult",
      "Both 1 and 2"
    ],
    "correctAnswer": 3,
    "explanation": "ActionResult or IActionResult",
    "tags": [
      "Controllers"
    ]
  },
  {
    "id": "M1-DO-013",
    "paperId": "medium-1",
    "category": "DotNet",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Middleware execution order?",
    "options": [
      "Alphabetical",
      "Registration order",
      "Non-deterministic",
      "Attribute"
    ],
    "correctAnswer": 1,
    "explanation": "Pipeline order",
    "tags": [
      "Middleware"
    ]
  },
  {
    "id": "M1-DO-014",
    "paperId": "medium-1",
    "category": "DotNet",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Model binding not null attribute?",
    "options": [
      "[NotNull]",
      "[Required]",
      "[Mandatory]",
      "[BindRequired]"
    ],
    "correctAnswer": 1,
    "explanation": "Required attribute",
    "tags": [
      "Validation"
    ]
  },
  {
    "id": "M1-WE-015",
    "paperId": "medium-1",
    "category": "WebAPI",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "What does [HttpGet] do?",
    "options": [
      "Maps to GET",
      "Returns 200",
      "JSON response",
      "CORS"
    ],
    "correctAnswer": 0,
    "explanation": "Route to GET",
    "tags": [
      "Routing"
    ]
  },
  {
    "id": "M1-SQ-016",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "sql-analysis",
    "question": "What does query do?",
    "code": "SELECT * FROM Emp e INNER JOIN Dept d ON e.DeptId = d.Id WHERE e.Salary > 50000",
    "options": [
      "Gets all",
      "Filters salary > 50000",
      "Group by",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "INNER JOIN with WHERE",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-017",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Filter groups?",
    "options": [
      "WHERE",
      "HAVING",
      "FILTER",
      "ORDER"
    ],
    "correctAnswer": 1,
    "explanation": "HAVING is for groups",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-018",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Hard",
    "type": "sql-analysis",
    "question": "Second highest salary?",
    "options": [
      "Subquery MAX",
      "LIMIT 2",
      "TOP 2",
      "MIN"
    ],
    "correctAnswer": 0,
    "explanation": "Nested subquery",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-019",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Check NULL?",
    "options": [
      "= NULL",
      "IS NULL",
      "== NULL",
      "NULL()"
    ],
    "correctAnswer": 1,
    "explanation": "IS NULL",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-020",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Clustered index?",
    "options": [
      "Pointer",
      "Physical order",
      "Text",
      "Unique"
    ],
    "correctAnswer": 1,
    "explanation": "Physical order",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-021",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "ACID?",
    "options": [
      "Atomicity, Consistency, Isolation, Durability",
      "Active...",
      "All...",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Transactions",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-022",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Medium",
    "type": "sql-analysis",
    "question": "DISTINCT COUNT?",
    "code": "SELECT COUNT(DISTINCT Department)",
    "options": [
      "Rows",
      "Unique depts",
      "Duplicates",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Counts unique",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-SQ-023",
    "paperId": "medium-1",
    "category": "SQL",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "DELETE vs TRUNCATE?",
    "options": [
      "Faster",
      "Removes structure",
      "No WHERE clause on TRUNCATE",
      "No rollback on DELETE"
    ],
    "correctAnswer": 2,
    "explanation": "TRUNCATE is bulk",
    "tags": [
      "SQL"
    ]
  },
  {
    "id": "M1-DS-024",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "loop-trace",
    "question": "What happens?",
    "code": "for(int i=0; i<arr.Length/2; i++) { int t = arr[i]; arr[i] = arr[arr.Length - 1 - i]; arr[arr.Length - 1 - i] = t; }",
    "options": [
      "Unchanged",
      "Reversed",
      "Error",
      "Throws"
    ],
    "correctAnswer": 1,
    "explanation": "Reverses array",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-025",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "code-debug",
    "question": "Palindrome?",
    "options": [
      "hello",
      "world",
      "racecar",
      "test"
    ],
    "correctAnswer": 2,
    "explanation": "racecar",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-026",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Binary search time?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "correctAnswer": 1,
    "explanation": "O(log n)",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-027",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Stack: push 1, push 2, pop, push 3, pop. Left?",
    "options": [
      "1",
      "2",
      "3",
      "Empty"
    ],
    "correctAnswer": 0,
    "explanation": "Returns 1",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-028",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Nested loops 1 to N?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(1)"
    ],
    "correctAnswer": 2,
    "explanation": "O(N^2)",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-029",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Find duplicates O(N)?",
    "options": [
      "List",
      "Stack",
      "HashSet",
      "Queue"
    ],
    "correctAnswer": 2,
    "explanation": "HashSet is O(1) lookup",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-DS-030",
    "paperId": "medium-1",
    "category": "DSA",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Two pointer?",
    "options": [
      "Sorting",
      "Graphs",
      "Pairs in sorted array",
      "Tree"
    ],
    "correctAnswer": 2,
    "explanation": "Sum pairs",
    "tags": [
      "DSA"
    ]
  },
  {
    "id": "M1-FR-031",
    "paperId": "medium-1",
    "category": "Frontend",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "Closure?",
    "options": [
      "Boolean",
      "Bundled environment",
      "Close window",
      "Loop"
    ],
    "correctAnswer": 1,
    "explanation": "Lexical scope",
    "tags": [
      "JS"
    ]
  },
  {
    "id": "M1-FR-032",
    "paperId": "medium-1",
    "category": "Frontend",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Wait for Promise?",
    "options": [
      "wait",
      "yield",
      "await",
      "pause"
    ],
    "correctAnswer": 2,
    "explanation": "await",
    "tags": [
      "JS"
    ]
  },
  {
    "id": "M1-FR-033",
    "paperId": "medium-1",
    "category": "Frontend",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Highest specificity?",
    "options": [
      "Class",
      "Tag",
      "ID",
      "Inline style"
    ],
    "correctAnswer": 3,
    "explanation": "Inline is highest",
    "tags": [
      "CSS"
    ]
  },
  {
    "id": "M1-FR-034",
    "paperId": "medium-1",
    "category": "Frontend",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "== vs === ?",
    "options": [
      "Same",
      "== checks value/type",
      "=== is strict",
      "Assignment"
    ],
    "correctAnswer": 2,
    "explanation": "=== avoids coercion",
    "tags": [
      "JS"
    ]
  },
  {
    "id": "M1-OS-035",
    "paperId": "medium-1",
    "category": "OS",
    "difficulty": "Hard",
    "type": "scenario",
    "question": "NOT Deadlock condition?",
    "options": [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption",
      "Circular Wait"
    ],
    "correctAnswer": 2,
    "explanation": "No Preemption is the condition",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M1-OS-036",
    "paperId": "medium-1",
    "category": "OS",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Invalid state transition?",
    "options": [
      "Ready->Running",
      "Running->Waiting",
      "Waiting->Running",
      "Running->Terminated"
    ],
    "correctAnswer": 2,
    "explanation": "Must go to Ready",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M1-OS-037",
    "paperId": "medium-1",
    "category": "OS",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Deadlock definition?",
    "options": [
      "Faster",
      "Indefinite wait",
      "Sleep",
      "Memory clear"
    ],
    "correctAnswer": 1,
    "explanation": "Blocked indefinitely",
    "tags": [
      "OS"
    ]
  },
  {
    "id": "M1-AG-038",
    "paperId": "medium-1",
    "category": "Agile",
    "difficulty": "Easy",
    "type": "scenario",
    "question": "Sprint Planning?",
    "options": [
      "Review",
      "Determine work",
      "Deploy",
      "Complain"
    ],
    "correctAnswer": 1,
    "explanation": "Determine upcoming sprint work",
    "tags": [
      "Agile"
    ]
  },
  {
    "id": "M1-AG-039",
    "paperId": "medium-1",
    "category": "Agile",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "Velocity?",
    "options": [
      "Typing speed",
      "Points completed",
      "Bugs",
      "Standup speed"
    ],
    "correctAnswer": 1,
    "explanation": "Points of completed stories",
    "tags": [
      "Agile"
    ]
  },
  {
    "id": "M1-AG-040",
    "paperId": "medium-1",
    "category": "Agile",
    "difficulty": "Medium",
    "type": "scenario",
    "question": "User Story format?",
    "options": [
      "As a... I want... so that...",
      "Given... When... Then...",
      "I need...",
      "To do..."
    ],
    "correctAnswer": 0,
    "explanation": "Role feature benefit",
    "tags": [
      "Agile"
    ]
  }
];
