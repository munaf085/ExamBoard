# assemble_oop10_lessons.py
import json
import build_oop10_p1
import generate_oop10_p2

target_path = r"c:\Users\keert\Mun\ExamBoard\src\data\java\sublessons\oop\oop10_lessons.ts"

lessons = {}
lessons["encapsulation-principles"] = build_oop10_p1.lessons_p1["encapsulation-principles"]
lessons["access-modifiers-deep-dive"] = build_oop10_p1.lessons_p1["access-modifiers-deep-dive"]
lessons["getters-setters-defensive-copying"] = generate_oop10_p2.lessons_p2["getters-setters-defensive-copying"]
lessons["immutable-class-pattern"] = generate_oop10_p2.lessons_p2["immutable-class-pattern"]

content = (
    "import { DetailedLesson } from '../../detailedLessons';\n\n"
    "// ============================================================\n"
    "// MODULE 10: ENCAPSULATION & DATA HIDING (LESSONS 10.1 - 10.4)\n"
    "// High-Quality, In-Depth Curriculum for Java Core Concepts\n"
    "// Constraints: Zero forward topics (NO inheritance, NO interfaces, NO collections)\n"
    "// ============================================================\n\n"
    "export const oop10Lessons: Record<string, DetailedLesson> = "
    + json.dumps(lessons, indent=2)
    + ";\n"
)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Successfully generated {len(lessons)} lessons in {target_path}")
