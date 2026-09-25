# assemble_oop12_lessons.py
import json
import sys
sys.path.append('.')
sys.path.append('scripts')

import build_oop12_p1
import build_oop12_p2

target_path = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop12_lessons.ts"

lessons = {}
lessons["compile-vs-runtime-polymorphism"] = build_oop12_p1.lessons_p1["compile-vs-runtime-polymorphism"]
lessons["dynamic-method-dispatch"] = build_oop12_p1.lessons_p1["dynamic-method-dispatch"]
lessons["casting-and-classcastexception"] = build_oop12_p2.lessons_p2["casting-and-classcastexception"]
lessons["instanceof-and-pattern-matching"] = build_oop12_p2.lessons_p2["instanceof-and-pattern-matching"]

content = (
    "import { DetailedLesson } from '../../detailedLessons';\n\n"
    "// ============================================================\n"
    "// MODULE 12: POLYMORPHISM & DISPATCH (LESSONS 12.1 - 12.4)\n"
    "// High-Quality, In-Depth Curriculum for Java Core Concepts\n"
    "// Constraints: Zero forward topics (NO interfaces, NO collections, NO lambdas/streams)\n"
    "// ============================================================\n\n"
    "export const oop12Lessons: Record<string, DetailedLesson> = "
    + json.dumps(lessons, indent=2)
    + ";\n"
)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully generated {len(lessons)} lessons in {target_path}")
