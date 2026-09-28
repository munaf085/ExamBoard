import { ProgrammingExercise } from '../../detailedLessons';

// ============================================================
// MODULE 4: DECISION MAKING & BRANCHING CAPSTONE EXERCISES (LESSON 4.4)
// Exactly 10 dedicated coding assignments
// ============================================================
export const cf44_challenge_exercises: Record<string, ProgrammingExercise[]> = {
  "control-flow-challenge": [
    {
      "id": "cfc-1",
      "title": "Exercise 1: Modern Switch Expression Tiered Tax Calculator",
      "difficulty": "Easy",
      "problemStatement": "Implement a method `public static double calculateTaxRate(String taxBracket)` using a modern switch expression (`->`). Return 0.10 for \"LOW\", 0.20 for \"MEDIUM\", 0.35 for \"HIGH\", and 0.0 for \"EXEMPT\" or any other status. Demonstrate with \"MEDIUM\" and \"EXEMPT\".",
      "hint": "Use switch expression syntax returning double directly.",
      "solutionCode": "public class Solution {\n    public static double calculateTaxRate(String taxBracket) {\n        return switch (taxBracket) {\n            case \"LOW\" -> 0.10;\n            case \"MEDIUM\" -> 0.20;\n            case \"HIGH\" -> 0.35;\n            case \"EXEMPT\" -> 0.0;\n            default -> 0.0;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(calculateTaxRate(\"MEDIUM\"));\n        System.out.println(calculateTaxRate(\"EXEMPT\"));\n    }\n}",
      "output": "0.2\n0.0",
      "explanation": "Switch expression evaluates exhaustively and returns double values directly with zero fall-through."
    },
    {
      "id": "cfc-2",
      "title": "Exercise 2: Multi-Statement Switch Expression with Yield",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static int processOrder(String type, int quantity)` using a switch expression. For \"BULK\", if quantity > 100 yield quantity * 8, else yield quantity * 9. For \"RETAIL\", yield quantity * 10. Default yields 0. Test with (\"BULK\", 150) and (\"RETAIL\", 5).",
      "hint": "Use `{ ... yield value; }` inside the \"BULK\" case block.",
      "solutionCode": "public class Solution {\n    public static int processOrder(String type, int quantity) {\n        return switch (type) {\n            case \"BULK\" -> {\n                int unitPrice = (quantity > 100) ? 8 : 9;\n                yield quantity * unitPrice;\n            }\n            case \"RETAIL\" -> quantity * 10;\n            default -> 0;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(processOrder(\"BULK\", 150));\n        System.out.println(processOrder(\"RETAIL\", 5));\n    }\n}",
      "output": "1200\n50",
      "explanation": "The multi-statement block for BULK executes logic and yields the computed total cost."
    },
    {
      "id": "cfc-3",
      "title": "Exercise 3: Definite Assignment Across Branching Paths",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static String evaluateScore(int score)` that initializes a local variable `status` along all branch paths (`>= 90` is \"A\", `>= 80` is \"B\", else \"C\") and returns `status`. Test with 95 and 75.",
      "hint": "Ensure every branch in the if-else ladder assigns `status` so the compiler verifies definite assignment.",
      "solutionCode": "public class Solution {\n    public static String evaluateScore(int score) {\n        String status;\n        if (score >= 90) {\n            status = \"A\";\n        } else if (score >= 80) {\n            status = \"B\";\n        } else {\n            status = \"C\";\n        }\n        return status;\n    }\n    public static void main(String[] args) {\n        System.out.println(evaluateScore(95));\n        System.out.println(evaluateScore(75));\n    }\n}",
      "output": "A\nC",
      "explanation": "Terminal else block guarantees that status is assigned before return, satisfying JLS §16 definite assignment."
    },
    {
      "id": "cfc-4",
      "title": "Exercise 4: Intentional Fall-Through Permission Accumulator",
      "difficulty": "Medium",
      "problemStatement": "Implement a method `public static int getPermissions(int userLevel)` using traditional switch statement fall-through. Level 1 gets READ (1). Level 2 gets WRITE (2) and READ. Level 3 gets ADMIN (4), WRITE, and READ. Default gets 0. Test with level 2 and 3.",
      "hint": "Stack cases backwards: case 3: perms |= 4; case 2: perms |= 2; case 1: perms |= 1; break;.",
      "solutionCode": "public class Solution {\n    public static int getPermissions(int userLevel) {\n        int perms = 0;\n        switch (userLevel) {\n            case 3:\n                perms |= 4;\n            case 2:\n                perms |= 2;\n            case 1:\n                perms |= 1;\n                break;\n            default:\n                perms = 0;\n        }\n        return perms;\n    }\n    public static void main(String[] args) {\n        System.out.println(getPermissions(2));\n        System.out.println(getPermissions(3));\n    }\n}",
      "output": "3\n7",
      "explanation": "Level 2 falls through case 2 and 1: 2 | 1 = 3. Level 3 falls through 3, 2, and 1: 4 | 2 | 1 = 7."
    },
    {
      "id": "cfc-5",
      "title": "Exercise 5: Null-Safe Switch Selector Guard",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static String routeRequest(String path)` that safely handles a null `path` parameter without throwing NullPointerException, returning \"NOT_FOUND\" for null or unknown paths, and \"HOME\" for \"/\". Test with null and \"/\".",
      "hint": "Check `path == null` before the switch statement, or default if null.",
      "solutionCode": "public class Solution {\n    public static String routeRequest(String path) {\n        if (path == null) return \"NOT_FOUND\";\n        return switch (path) {\n            case \"/\" -> \"HOME\";\n            case \"/api\" -> \"API\";\n            default -> \"NOT_FOUND\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(routeRequest(null));\n        System.out.println(routeRequest(\"/\"));\n    }\n}",
      "output": "NOT_FOUND\nHOME",
      "explanation": "Defensive null guard prevents NullPointerException when switching on String references."
    },
    {
      "id": "cfc-6",
      "title": "Exercise 6: Enum Exhaustiveness in Switch Expression",
      "difficulty": "Medium",
      "problemStatement": "Declare an enum `Priority { LOW, MEDIUM, HIGH, CRITICAL }`. Write a method `public static int getSlaHours(Priority p)` that covers all enum values in a switch expression without a default clause. Test with Priority.HIGH and Priority.LOW.",
      "hint": "When all enum constants are covered, default is not required.",
      "solutionCode": "public class Solution {\n    public enum Priority { LOW, MEDIUM, HIGH, CRITICAL }\n    public static int getSlaHours(Priority p) {\n        return switch (p) {\n            case LOW -> 48;\n            case MEDIUM -> 24;\n            case HIGH -> 4;\n            case CRITICAL -> 1;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(getSlaHours(Priority.HIGH));\n        System.out.println(getSlaHours(Priority.LOW));\n    }\n}",
      "output": "4\n48",
      "explanation": "Covering all enum constants satisfies compiler exhaustiveness, allowing omission of default."
    },
    {
      "id": "cfc-7",
      "title": "Exercise 7: Multiple Comma-Separated Labels for Weekend Filter",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static boolean isWeekend(int dayOfWeek)` where 1 is Monday and 7 is Sunday. Use a modern switch expression with comma-separated labels for weekdays (1, 2, 3, 4, 5) and weekends (6, 7). Default returns false. Test with 6 and 2.",
      "hint": "case 6, 7 -> true; case 1, 2, 3, 4, 5 -> false;.",
      "solutionCode": "public class Solution {\n    public static boolean isWeekend(int dayOfWeek) {\n        return switch (dayOfWeek) {\n            case 6, 7 -> true;\n            case 1, 2, 3, 4, 5 -> false;\n            default -> false;\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(isWeekend(6));\n        System.out.println(isWeekend(2));\n    }\n}",
      "output": "true\nfalse",
      "explanation": "Comma-separated case labels group matching states concisely without fall-through."
    },
    {
      "id": "cfc-8",
      "title": "Exercise 8: Leap Year Branching Logic Hierarchy",
      "difficulty": "Medium",
      "problemStatement": "Implement a method `public static boolean isLeapYear(int year)` using nested or chained if-else conditions. A year is leap if divisible by 4, except if divisible by 100 unless also divisible by 400. Test with 2000, 1900, and 2024.",
      "hint": "Check divisible by 400 first, or use (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0).",
      "solutionCode": "public class Solution {\n    public static boolean isLeapYear(int year) {\n        if (year % 400 == 0) {\n            return true;\n        } else if (year % 100 == 0) {\n            return false;\n        } else {\n            return year % 4 == 0;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(isLeapYear(2000));\n        System.out.println(isLeapYear(1900));\n        System.out.println(isLeapYear(2024));\n    }\n}",
      "output": "true\nfalse\ntrue",
      "explanation": "Hierarchical branching tests most specific condition (divisible by 400) before broader century and 4-year rules."
    },
    {
      "id": "cfc-9",
      "title": "Exercise 9: Guarding Unbracketed Dangling Else with Explicit Braces",
      "difficulty": "Easy",
      "problemStatement": "Write a method `public static String verifyUser(boolean isLoggedIn, boolean isAdmin)` using explicit braces `{}` to avoid the dangling-else trap. If logged in, check if admin: return \"Admin User\" if true, \"Standard User\" if false. If not logged in, return \"Guest\". Test with (true, false) and (false, true).",
      "hint": "Use explicit braces for both the outer and inner if statements.",
      "solutionCode": "public class Solution {\n    public static String verifyUser(boolean isLoggedIn, boolean isAdmin) {\n        if (isLoggedIn) {\n            if (isAdmin) {\n                return \"Admin User\";\n            } else {\n                return \"Standard User\";\n            }\n        } else {\n            return \"Guest\";\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(verifyUser(true, false));\n        System.out.println(verifyUser(false, true));\n    }\n}",
      "output": "Standard User\nGuest",
      "explanation": "Explicit braces clearly isolate the inner else to isAdmin and outer else to isLoggedIn."
    },
    {
      "id": "cfc-10",
      "title": "Exercise 10: Character Categorizer Using Switch Expression",
      "difficulty": "Medium",
      "problemStatement": "Write a method `public static String categorizeChar(char c)` using a modern switch expression. Return \"VOWEL\" for 'a','e','i','o','u' (lowercase), \"DIGIT\" for '0','1','2','3','4','5','6','7','8','9', and \"OTHER\" for all other characters. Test with 'e', '7', and 'z'.",
      "hint": "Group characters using comma separated lists.",
      "solutionCode": "public class Solution {\n    public static String categorizeChar(char c) {\n        return switch (c) {\n            case 'a', 'e', 'i', 'o', 'u' -> \"VOWEL\";\n            case '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' -> \"DIGIT\";\n            default -> \"OTHER\";\n        };\n    }\n    public static void main(String[] args) {\n        System.out.println(categorizeChar('e'));\n        System.out.println(categorizeChar('7'));\n        System.out.println(categorizeChar('z'));\n    }\n}",
      "output": "VOWEL\nDIGIT\nOTHER",
      "explanation": "Switch expression classifies primitive char values into discrete categories with zero fall-through."
    }
  ]
};
