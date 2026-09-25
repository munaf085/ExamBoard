export interface JavaMCQ {
  id: string;
  moduleId: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export const javaControlFlowQuestions: JavaMCQ[] = [
  {
    id: "controlflow-1",
    moduleId: "java-control-flow",
    question: "What is the output of the following if-else statement?",
    codeSnippet: "int x = 10;\nif (x = 10) {\n    System.out.println(\"A\");\n} else {\n    System.out.println(\"B\");\n}",
    options: ["A", "B", "Compilation Error", "Runtime Error"],
    correctAnswer: "Compilation Error",
    explanation: "In Java, the condition in an if statement must evaluate to a boolean. 'x = 10' is an assignment that evaluates to an int (10), causing a compilation error.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-2",
    moduleId: "java-control-flow",
    question: "What is the output of this code?",
    codeSnippet: "int a = 5;\nint b = (a > 3) ? (a < 10 ? 1 : 2) : 3;\nSystem.out.println(b);",
    options: ["1", "2", "3", "5"],
    correctAnswer: "1",
    explanation: "Since 5 > 3 is true, it evaluates the nested ternary (a < 10 ? 1 : 2). Since 5 < 10 is true, the result is 1.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-3",
    moduleId: "java-control-flow",
    question: "What does the following switch statement output?",
    codeSnippet: "int num = 2;\nswitch (num) {\n    case 1: System.out.print(\"One \");\n    case 2: System.out.print(\"Two \");\n    case 3: System.out.print(\"Three \");\n    default: System.out.print(\"Default \");\n}",
    options: ["Two", "Two Three", "Two Three Default", "Compilation Error"],
    correctAnswer: "Two Three Default",
    explanation: "Because there are no break statements, the switch statement \"falls through\" starting from case 2 and executes all subsequent cases including default.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-4",
    moduleId: "java-control-flow",
    question: "Which of the following is true about a do-while loop in Java?",
    options: [
      "It checks the condition before executing the loop body.",
      "It requires a semicolon after the while condition.",
      "It cannot contain a break statement.",
      "It only executes if the condition is true initially."
    ],
    correctAnswer: "It requires a semicolon after the while condition.",
    explanation: "A do-while loop is structured as 'do { ... } while(condition);'. The semicolon at the end is required. It evaluates the condition after executing the body, ensuring it runs at least once.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-5",
    moduleId: "java-control-flow",
    question: "What is the output of the following loop?",
    codeSnippet: "for (int i = 0; i < 3; i++) {\n    System.out.print(i + \" \");\n}",
    options: ["1 2 3 ", "0 1 2 ", "0 1 2 3 ", "1 2 "],
    correctAnswer: "0 1 2 ",
    explanation: "The loop starts at 0 and increments until i is not less than 3. The values printed are 0, 1, and 2, followed by spaces.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-6",
    moduleId: "java-control-flow",
    question: "What is the result of the following while loop?",
    codeSnippet: "int i = 1;\nwhile (i <= 5) {\n    if (i == 3) {\n        continue;\n    }\n    System.out.print(i + \" \");\n    i++;\n}",
    options: ["1 2 4 5 ", "1 2 3 4 5 ", "1 2 ", "Infinite loop"],
    correctAnswer: "Infinite loop",
    explanation: "When i equals 3, the 'continue' statement skips the rest of the loop, including the 'i++'. Thus, i remains 3 forever, causing an infinite loop.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-7",
    moduleId: "java-control-flow",
    question: "What will this do-while loop output?",
    codeSnippet: "int x = 10;\ndo {\n    System.out.print(x + \" \");\n    x++;\n} while (x < 5);",
    options: ["10 ", "10 11 12 13 14 ", "No output", "Compilation Error"],
    correctAnswer: "10 ",
    explanation: "A do-while loop executes the body once before checking the condition. It prints 10, increments x to 11, and then checks if 11 < 5. Since this is false, the loop terminates.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-8",
    moduleId: "java-control-flow",
    question: "What will be printed?",
    codeSnippet: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 2; j++) {\n        if (i == 1) break;\n        System.out.print(i + \"\" + j + \" \");\n    }\n}",
    options: ["00 01 10 11 20 21 ", "00 01 20 21 ", "00 01 10 20 ", "00 01 20 "],
    correctAnswer: "00 01 20 21 ",
    explanation: "When i=0, prints 00 and 01. When i=1, the inner loop breaks immediately (nothing printed). When i=2, prints 20 and 21.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-9",
    moduleId: "java-control-flow",
    question: "What is the output of this Java 14+ switch expression?",
    codeSnippet: "String day = \"TUE\";\nint length = switch (day) {\n    case \"MON\", \"TUE\", \"WED\" -> 7;\n    case \"THU\", \"FRI\" -> 8;\n    default -> 0;\n};\nSystem.out.println(length);",
    options: ["0", "7", "8", "Compilation Error"],
    correctAnswer: "7",
    explanation: "The arrow (->) syntax in switch expressions doesn't fall through. Since 'day' is 'TUE', it evaluates to 7 and assigns it to 'length'.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-10",
    moduleId: "java-control-flow",
    question: "What will the following code output?",
    codeSnippet: "int count = 0;\nouter: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (j == 1) continue outer;\n        count++;\n    }\n}\nSystem.out.println(count);",
    options: ["3", "6", "9", "0"],
    correctAnswer: "3",
    explanation: "The outer loop runs 3 times (i=0, 1, 2). The inner loop starts j=0, count becomes 1, then j=1, which hits 'continue outer', restarting the outer loop. This happens 3 times, so count is incremented 3 times.",
    difficulty: "Hard"
  },
  {
    id: "controlflow-11",
    moduleId: "java-control-flow",
    question: "What does this enhanced for loop print?",
    codeSnippet: "int[] arr = {1, 2, 3};\nfor (int num : arr) {\n    num = num * 2;\n}\nSystem.out.println(arr[0] + \" \" + arr[1] + \" \" + arr[2]);",
    options: ["1 2 3", "2 4 6", "Compilation Error", "0 0 0"],
    correctAnswer: "1 2 3",
    explanation: "The enhanced for loop uses a local variable 'num' to iterate through the array values. Reassigning 'num' doesn't alter the actual array elements.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-12",
    moduleId: "java-control-flow",
    question: "What is the output?",
    codeSnippet: "if (false)\n    System.out.println(\"A\");\n    System.out.println(\"B\");",
    options: ["A", "B", "A B", "No output"],
    correctAnswer: "B",
    explanation: "Without braces, only the first statement is part of the if block. 'System.out.println(\"A\");' is skipped, but 'System.out.println(\"B\");' is always executed.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-13",
    moduleId: "java-control-flow",
    question: "Which of these is a valid way to exit a loop prematurely?",
    options: ["exit", "halt", "break", "return loop"],
    correctAnswer: "break",
    explanation: "The 'break' statement is used to prematurely exit the closest enclosing loop or switch statement.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-14",
    moduleId: "java-control-flow",
    question: "What is the exact output of this code?",
    codeSnippet: "for (int i = 1; i <= 5; i++) {\n    if (i % 2 == 0) {\n        System.out.print(\"* \");\n    } else {\n        System.out.print(i + \" \");\n    }\n}",
    options: ["1 2 3 4 5 ", "1 * 3 * 5 ", "* 2 * 4 * ", "* * * * * "],
    correctAnswer: "1 * 3 * 5 ",
    explanation: "When i is odd (1, 3, 5), it prints the number followed by a space. When i is even (2, 4), it prints a star (*).",
    difficulty: "Easy"
  },
  {
    id: "controlflow-15",
    moduleId: "java-control-flow",
    question: "What will the following code output?",
    codeSnippet: "int a = 0;\nif (a++ == 0) {\n    System.out.print(a);\n} else {\n    System.out.print(++a);\n}",
    options: ["0", "1", "2", "Compilation Error"],
    correctAnswer: "1",
    explanation: "The condition 'a++ == 0' uses the post-increment operator, so it evaluates to true (0 == 0), and then 'a' is incremented to 1. The if-block prints the new value of 'a', which is 1.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-16",
    moduleId: "java-control-flow",
    question: "Consider this loop. What will it output?",
    codeSnippet: "int x = 0;\nwhile (x++ < 3) {\n    System.out.print(x + \" \");\n}",
    options: ["0 1 2 ", "1 2 3 ", "0 1 2 3 ", "1 2 3 4 "],
    correctAnswer: "1 2 3 ",
    explanation: "x starts at 0. Condition 0 < 3 (true), x becomes 1, prints 1. Then 1 < 3 (true), x becomes 2, prints 2. Then 2 < 3 (true), x becomes 3, prints 3. Then 3 < 3 (false), loop ends.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-17",
    moduleId: "java-control-flow",
    question: "What happens in the following code?",
    codeSnippet: "int x = 10;\nswitch(x) {\n    case 5: System.out.print(\"5\"); break;\n    case 10: System.out.print(\"10\");\n    case 15: System.out.print(\"15\"); break;\n    default: System.out.print(\"D\");\n}",
    options: ["10", "1015", "1015D", "Compilation Error"],
    correctAnswer: "1015",
    explanation: "The switch matches case 10, prints '10', and falls through to case 15 because there is no break. It prints '15' and then hits the break statement.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-18",
    moduleId: "java-control-flow",
    question: "What is the output?",
    codeSnippet: "boolean b = false;\nif (b = true) {\n    System.out.println(\"True\");\n} else {\n    System.out.println(\"False\");\n}",
    options: ["True", "False", "Compilation Error", "Runtime Error"],
    correctAnswer: "True",
    explanation: "The expression 'b = true' assigns true to b and evaluates to true. Since it evaluates to a boolean, it perfectly satisfies the if condition.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-19",
    moduleId: "java-control-flow",
    question: "Can multiple variables be initialized in a for loop?",
    options: [
      "No, only one variable can be initialized.",
      "Yes, if they are separated by commas and are of the same type.",
      "Yes, if they are separated by semicolons.",
      "Yes, any number of variables of different types can be initialized."
    ],
    correctAnswer: "Yes, if they are separated by commas and are of the same type.",
    explanation: "In a for loop initialization, you can declare multiple variables of the same type separated by commas, e.g., 'for(int i=0, j=10; i<j; i++, j--)'.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-20",
    moduleId: "java-control-flow",
    question: "What is the output of the following?",
    codeSnippet: "int i = 0;\nfor ( ; i < 3; i++) {\n    System.out.print(i);\n}\nSystem.out.print(i);",
    options: ["012", "0123", "0122", "Compilation Error"],
    correctAnswer: "0123",
    explanation: "The initialization part of the for loop is empty, which is valid. The loop prints 0, 1, 2. The loop terminates when i=3, and the final print statement prints 3.",
    difficulty: "Medium"
  },
  {
    id: "controlflow-21",
    moduleId: "java-control-flow",
    question: "What is the output of this nested loop snippet?",
    codeSnippet: "int sum = 0;\nfor (int i = 1; i <= 2; i++) {\n    for (int j = 1; j <= 2; j++) {\n        if (i == j) continue;\n        sum += (i + j);\n    }\n}\nSystem.out.println(sum);",
    options: ["3", "6", "9", "4"],
    correctAnswer: "6",
    explanation: "i=1, j=1 (continue); i=1, j=2 (sum+=3); i=2, j=1 (sum+=3); i=2, j=2 (continue). Total sum = 3 + 3 = 6.",
    difficulty: "Hard"
  },
  {
    id: "controlflow-22",
    moduleId: "java-control-flow",
    question: "What does this code print?",
    codeSnippet: "int x = 5;\nswitch(x) {\n    default:\n        System.out.print(\"D\");\n    case 1:\n        System.out.print(\"1\");\n    case 2:\n        System.out.print(\"2\");\n}",
    options: ["D", "D12", "Compilation Error", "No output"],
    correctAnswer: "D12",
    explanation: "Because there is no case 5, it goes to default, prints 'D', then falls through to case 1 ('1') and case 2 ('2') because there are no breaks.",
    difficulty: "Hard"
  },
  {
    id: "controlflow-23",
    moduleId: "java-control-flow",
    question: "Evaluate the output:",
    codeSnippet: "int i = 0;\nfor (; i < 5; i+=2) {\n    i++;\n}\nSystem.out.println(i);",
    options: ["4", "5", "6", "Infinite loop"],
    correctAnswer: "6",
    explanation: "i=0. Cond: 0<5 (T). Body: i++ (i=1). Update: i+=2 (i=3). Cond: 3<5 (T). Body: i++ (i=4). Update: i+=2 (i=6). Cond: 6<5 (F). Prints 6.",
    difficulty: "Hard"
  },
  {
    id: "controlflow-24",
    moduleId: "java-control-flow",
    question: "What is the result of this boolean logic?",
    codeSnippet: "boolean a = true, b = false, c = true;\nif (a && b || c) {\n    System.out.println(\"Yes\");\n} else {\n    System.out.println(\"No\");\n}",
    options: ["Yes", "No", "Compilation Error", "None of the above"],
    correctAnswer: "Yes",
    explanation: "'a && b' is true && false, which is false. Then 'false || c' is false || true, which is true. The condition is true, so it prints 'Yes'.",
    difficulty: "Easy"
  },
  {
    id: "controlflow-25",
    moduleId: "java-control-flow",
    question: "What will this complex switch expression output? (Java 14+)",
    codeSnippet: "int val = 2;\nint result = switch (val) {\n    case 1 -> 10;\n    case 2 -> {\n        int temp = val * 2;\n        yield temp + 1;\n    }\n    default -> 0;\n};\nSystem.out.println(result);",
    options: ["0", "5", "10", "Compilation Error"],
    correctAnswer: "5",
    explanation: "In Java 14+ switch expressions, you use the 'yield' keyword to return a value from a block. Here case 2 evaluates to temp(4) + 1, which yields 5.",
    difficulty: "Hard"
  }
];
