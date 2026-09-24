import { WrittenQuestion } from '../../types';

export const hard3Questions: WrittenQuestion[] = [
  {
    "id": "H3-CS-001",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int sum = 0;\nfor (int j = 0; j < 5; j++) {\n    for (int k = 0; k < j; k++) {\n        if (k == 2) break;\n        sum++;\n    }\n}\nConsole.Write(sum);",
    "options": [
      "10",
      "5",
      "6",
      "7"
    ],
    "correctAnswer": 3,
    "explanation": "Outer loop j goes 0 to 4. Inner loop k breaks when k==2. For j=1: sum+=1. j=2: sum+=2. j=3: sum+=2 (k=0,1 then breaks). j=4: sum+=2. Total sum = 0 + 1 + 2 + 2 + 2 = 7.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-002",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 0;\nwhile (x++ < 5) {\n    if (x % 2 == 0) continue;\n    x++;\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 2,
    "explanation": "x is evaluated then incremented. Loop 1: x is 0<5 (T), x becomes 1. x%2!=0, x becomes 2. Loop 2: x is 2<5 (T), x becomes 3. x%2!=0, x becomes 4. Loop 3: x is 4<5 (T), x becomes 5. x%2!=0, x becomes 6. Loop 4: x is 6<5 (F), x becomes 7. Loop terminates. Output is 7.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-003",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int i = 0, j = 0;\nfor (; i < 3; i++) {\n    for (; j < 3; j++) {\n        Console.Write($\"{i}{j} \");\n    }\n}",
    "options": [
      "00 01 02 ",
      "00 01 02 10 11 12 20 21 22",
      "00 01 02 10 20",
      "00 01 02 12 22"
    ],
    "correctAnswer": 0,
    "explanation": "Notice j is not re-initialized in the inner loop. For i=0, j goes 0,1,2 and prints 00 01 02. Then j is 3. For i=1, the inner loop condition j<3 is false immediately. Same for i=2. Output is only 00 01 02.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-004",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 2;\nint b = a++ + ++a;\nConsole.Write(b);",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctAnswer": 2,
    "explanation": "a++ uses the value 2 and increments a to 3. ++a increments a to 4 and uses 4. So 2 + 4 = 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-005",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "bool a = false, b = true;\nif (a && (b = false)) { }\nConsole.Write(b);",
    "options": [
      "Compilation error",
      "False",
      "Runtime error",
      "True"
    ],
    "correctAnswer": 3,
    "explanation": "Due to short-circuit evaluation of &&, since a is false, the right side (b = false) is never executed. Thus, b remains true.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-006",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int val = 10;\nswitch(val) {\n    case 5:\n    case 10:\n        val++;\n        break;\n    default:\n        val--;\n        break;\n}\nConsole.Write(val);",
    "options": [
      "10",
      "11",
      "12",
      "9"
    ],
    "correctAnswer": 1,
    "explanation": "C# allows fall-through for empty cases. case 5 falls through to case 10. val is 10, so it matches case 10, executes val++, making it 11, and breaks.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-007",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int count = 0;\nfor(int x = 0; x < 3; x++) {\n    for(int y = x; y < 4; y++) {\n        count++;\n    }\n}\nConsole.Write(count);",
    "options": [
      "10",
      "11",
      "8",
      "9"
    ],
    "correctAnswer": 3,
    "explanation": "Outer loop runs 3 times. Inner loop runs from x to 3. The total count is 9.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-008",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 3;\nfor(int k = 3; k < 8; k++) {\n    res += k;\n}\nConsole.Write(res);",
    "options": [
      "27",
      "28",
      "29",
      "30"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator +, initial 3, ending at 7. Result is 28.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-009",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 4;\nfor(int k = 4; k < 9; k++) {\n    res -= k;\n}\nConsole.Write(res);",
    "options": [
      "-24",
      "-25",
      "-26",
      "-27"
    ],
    "correctAnswer": 2,
    "explanation": "Traces a simple loop with operator -, initial 4, ending at 8. Result is -26.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-010",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 0;\nfor(int k = 0; k < 5; k++) {\n    res *= (k==0?1:k);\n}\nConsole.Write(res);",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator *, initial 0, ending at 4. Result is 0.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-011",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 1;\nfor(int k = 1; k < 6; k++) {\n    res /= (k==0?1:k);\n}\nConsole.Write(res);",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator /, initial 1, ending at 5. Result is 0.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-012",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 2;\nfor(int k = 2; k < 7; k++) {\n    res += k;\n}\nConsole.Write(res);",
    "options": [
      "21",
      "22",
      "23",
      "24"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator +, initial 2, ending at 6. Result is 22.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-013",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 3;\nfor(int k = 3; k < 8; k++) {\n    res -= k;\n}\nConsole.Write(res);",
    "options": [
      "-20",
      "-21",
      "-22",
      "-23"
    ],
    "correctAnswer": 2,
    "explanation": "Traces a simple loop with operator -, initial 3, ending at 7. Result is -22.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-014",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 4;\nfor(int k = 4; k < 9; k++) {\n    res *= (k==0?1:k);\n}\nConsole.Write(res);",
    "options": [
      "26879",
      "26880",
      "26881",
      "26882"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator *, initial 4, ending at 8. Result is 26880.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-015",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "loop-trace",
    "question": "What is the output of the following C# code?",
    "code": "int res = 0;\nfor(int k = 0; k < 5; k++) {\n    res /= (k==0?1:k);\n}\nConsole.Write(res);",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Traces a simple loop with operator /, initial 0, ending at 4. Result is 0.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-016",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 2;\nint b = 1;\nint c = a & b;\nConsole.Write(c);",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 2 & 1 equals 0.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-017",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 3;\nint b = 2;\nint c = a | b;\nConsole.Write(c);",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 3 | 2 equals 3.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-018",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 4;\nint b = 3;\nint c = a & b;\nConsole.Write(c);",
    "options": [
      "-1",
      "0",
      "1",
      "2"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 4 & 3 equals 0.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-019",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 5;\nint b = 4;\nint c = a | b;\nConsole.Write(c);",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 5 | 4 equals 5.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-020",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 1;\nint b = 1;\nint c = a & b;\nConsole.Write(c);",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 1 & 1 equals 1.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-021",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 2;\nint b = 2;\nint c = a | b;\nConsole.Write(c);",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 2 | 2 equals 2.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-022",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 3;\nint b = 3;\nint c = a & b;\nConsole.Write(c);",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 3 & 3 equals 3.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-023",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 4;\nint b = 4;\nint c = a | b;\nConsole.Write(c);",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 4 | 4 equals 4.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-024",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 5;\nint b = 1;\nint c = a & b;\nConsole.Write(c);",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 5 & 1 equals 1.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-025",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int a = 1;\nint b = 2;\nint c = a | b;\nConsole.Write(c);",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Bitwise operation 1 | 2 equals 3.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-026",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 2;\nwhile(x < 7) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-027",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 3;\nwhile(x < 8) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-028",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 0;\nwhile(x < 5) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-029",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 1;\nwhile(x < 6) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-030",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 2;\nwhile(x < 7) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-031",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 3;\nwhile(x < 8) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-032",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 0;\nwhile(x < 5) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-033",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 1;\nwhile(x < 6) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-034",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 2;\nwhile(x < 7) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-035",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 3;\nwhile(x < 8) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-036",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 0;\nwhile(x < 5) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-037",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 1;\nwhile(x < 6) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-038",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 2;\nwhile(x < 7) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-039",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 3;\nwhile(x < 8) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "10",
      "7",
      "8",
      "9"
    ],
    "correctAnswer": 2,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 8.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  },
  {
    "id": "H3-CS-040",
    "paperId": "hard-3",
    "category": "CSharp",
    "difficulty": "Hard",
    "type": "code-output",
    "question": "What is the output of the following C# code?",
    "code": "int x = 0;\nwhile(x < 5) {\n    if (x % 2 == 0) { x += 2; }\n    else { x++; }\n}\nConsole.Write(x);",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "While loop logic incrementing by 2 if even, 1 if odd. Final value is 6.",
    "tags": [
      "CSharp",
      "Logic",
      "Loops"
    ]
  }
];
