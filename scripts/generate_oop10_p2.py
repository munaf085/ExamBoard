# generate_oop10_p2.py
import json

lessons_p2 = {}

# -------------------------------------------------------------
# LESSON 10.3: Getters, Setters & Defensive Copying
# -------------------------------------------------------------
lessons_p2["getters-setters-defensive-copying"] = {
    "id": "getters-setters-defensive-copying",
    "moduleId": "java-encapsulation",
    "moduleTitle": "10. Encapsulation & Data Hiding",
    "lessonNumber": "Lesson 10.3",
    "title": "Getters, Setters & Defensive Copying",
    "subtitle": "JavaBeans conventions, invariant validation, mutable reference leaks, and defensive copy constructor techniques",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of a museum displaying a priceless 1,000-year-old historic manuscript. The curator does not hand the original parchment to every tourist who walks through the lobby (which would be returning a direct mutable reference, allowing someone to scribble on it with a Sharpie). Instead, if a visitor asks to view the manuscript (calling a getter), the museum hands them a high-resolution color photocopy (a defensive copy). The visitor can mark up, fold, or spill coffee on their copy as much as they want; the original treasure locked in the climate-controlled vault remains completely untouched and pristine. Defensive copying ensures outside callers cannot corrupt your internal state.",
    "interviewTakeaways": [
        "The Mutable Reference Leak: If a private field holds a mutable object (such as an array int[], Date, or custom object) and your getter returns that reference directly, callers can mutate your object's internal state without calling any setter!",
        "Defensive Copying in Getters: Always clone or create a new copy of mutable internal objects before returning them from getter methods: 'return this.items.clone();'.",
        "Defensive Copying in Constructors: Never store mutable references directly passed into constructors; make a fresh defensive copy immediately before setting the field.",
        "JavaBeans Naming Conventions: Getters for non-boolean types must start with 'get' (e.g. getName()), boolean getters start with 'is' (e.g. isActive()), and setters start with 'set' (e.g. setName(String n)).",
        "Eliminating Blind Setters: Only create setters for fields that actually need to change during an object's lifecycle. An object with blind getters and setters for every private field is just a glorified struct with zero encapsulation benefit."
    ],
    "cheatSheet": {
        "summary": "Getters and setters enforce validation invariants and protect state. Returning or storing mutable objects directly breaks encapsulation through reference leaks, requiring defensive copying.",
        "syntaxTemplate": "public class SecureVault {\n    private int balance;\n    private int[] pinHistory;\n\n    public SecureVault(int balance, int[] pins) {\n        setBalance(balance); // enforce invariant validation\n        this.pinHistory = pins.clone(); // defensive copy on input\n    }\n\n    public int[] getPinHistory() {\n        return pinHistory.clone(); // defensive copy on output\n    }\n}",
        "rules": [
            {"rule": "Validate Invariants in Setters", "explanation": "Never blindly assign parameter to field without checking boundaries (e.g. if (age < 0) throw error)."},
            {"rule": "Defensive Copy Inbound Mutables", "explanation": "In constructors or setters taking mutable objects/arrays, copy the elements rather than storing the external reference."},
            {"rule": "Defensive Copy Outbound Mutables", "explanation": "In getters returning mutable objects/arrays, return a newly allocated copy so outside mutations do not alter internal state."},
            {"rule": "Use 'is' Prefix for Booleans", "explanation": "Follow standard JavaBeans conventions: boolean properties use isEnabled(), isAvailable(), whereas setters use setEnabled(boolean b)."},
            {"rule": "Prefer Read-Only Properties", "explanation": "Do not generate setters automatically. If a property should be set once at creation, provide only a getter."}
        ],
        "quickComparison": [
            {"aspect": "Primary Purpose", "optionA": "Getter: Exposes controlled state to callers", "optionB": "Setter: Mutates state while enforcing boundary rules"},
            {"aspect": "Primitive Return", "optionA": "Safe: Primitives pass by value, impossible to leak internal state", "optionB": "Safe: Values are copied into caller's stack frame"},
            {"aspect": "Mutable Array Return", "optionA": "Dangerous: Caller can modify array[0] without setter", "optionB": "Requires defensive copy via array.clone()"},
            {"aspect": "Boolean Getter Naming", "optionA": "isAvailable() (standard idiom)", "optionB": "getAvailable() (non-idiomatic, breaks some frameworks)"}
        ]
    },
    "coreExplanation": [
        "Encapsulation is not merely making fields private; it is about guaranteeing that an object is ALWAYS in a valid, self-consistent state throughout its lifecycle.",
        "Getters provide read-only views into internal state. Setters act as gatekeepers, validating arguments before applying state mutations.",
        "The Mutable Reference Leak Trap occurs when an object exposes a mutable internal reference (like an int[] or char[]). Because Java references point to heap addresses, an external caller can mutate array contents without using a setter.",
        "Defensive Copying solves this by creating an independent duplicate of the mutable data both when receiving it in a constructor/setter and when returning it in a getter.",
        "Primitives (int, double, boolean) never suffer from reference leaks because Java passes primitives strictly by value on the stack. Only reference types (objects, arrays) are vulnerable.",
        "Immutable helper objects (like String) are immune to reference leaks because their internal state cannot be changed anyway. Defensive copying is ONLY required for mutable objects."
    ],
    "diagram": "STACK (Caller)                 HEAP (Internal Object State)\n+-----------------------+       +-------------------------------------+\n| myAccount             |------>| BankAccount Object                  |\n+-----------------------+       |   balance: $500                     |\n                                |   secretPins: [0x999] ------------+ |\n                                +-----------------------------------+ | \n                                                                      |\nLEAK RISK (Without Defensive Copy):                                  v\nmyAccount.getSecretPins()[0] = 9999; ----------> [1111, 2222, 3333] --+\n(DIRECT MUTATION OF INTERNAL STATE!)             HEAP ARRAY (MUTATED!)\n\nSECURE DEFENSIVE COPY:\ngetSecretPins() { return secretPins.clone(); } \nCaller receives CLONE at [0x888] ---------------> [1111, 2222, 3333] (SAFE CLONE)\nOriginal at [0x999] remains 100% UNTOUCHED! -----> [1111, 2222, 3333] (ORIGINAL PROTECTED)",
    "codeSnippet": {
        "title": "Preventing Mutable Reference Leaks with Defensive Copying",
        "code": "public class SecureVault {\n    private int balance;\n    private int[] emergencyCodes;\n\n    public SecureVault(int balance, int[] codes) {\n        this.balance = balance;\n        // Defensive copy on input: prevents caller from mutating array after passing it\n        this.emergencyCodes = (codes != null) ? codes.clone() : new int[0];\n    }\n\n    public int getBalance() {\n        return balance;\n    }\n\n    public void setBalance(int balance) {\n        if (balance < 0) {\n            System.out.println(\"Invalid balance rejected!\");\n            return;\n        }\n        this.balance = balance;\n    }\n\n    // Defensive copy on output: prevents caller from corrupting internal array\n    public int[] getEmergencyCodes() {\n        return emergencyCodes.clone();\n    }\n\n    public static void main(String[] args) {\n        int[] originalCodes = {101, 202, 303};\n        SecureVault vault = new SecureVault(500, originalCodes);\n\n        // Attempt 1: Mutating external array\n        originalCodes[0] = 999;\n        System.out.println(\"Vault code 0 after external change: \" + vault.getEmergencyCodes()[0]);\n\n        // Attempt 2: Mutating returned getter array\n        int[] leakedCodes = vault.getEmergencyCodes();\n        leakedCodes[0] = 888;\n        System.out.println(\"Vault code 0 after getter leak attempt: \" + vault.getEmergencyCodes()[0]);\n    }\n}",
        "lineByLineExplanation": [
            {"line": "this.emergencyCodes = (codes != null) ? codes.clone() : new int[0];", "explanation": "Performs an inbound defensive copy so subsequent changes to originalCodes won't affect vault."},
            {"line": "if (balance < 0) return;", "explanation": "Setter guard clause enforcing the non-negative business invariant."},
            {"line": "return emergencyCodes.clone();", "explanation": "Outbound defensive copy allocates a separate clone array on the heap, keeping internal codes safe."},
            {"line": "originalCodes[0] = 999;", "explanation": "External modification only affects the caller's array, proving inbound defensive copy succeeded."},
            {"line": "leakedCodes[0] = 888;", "explanation": "Modification only changes the temporary clone returned by getter, proving outbound defensive copy succeeded."}
        ],
        "output": "Vault code 0 after external change: 101\nVault code 0 after getter leak attempt: 101"
    },
    "codeExamples": [
        {
            "title": "Validation Invariants in Setters",
            "description": "Demonstrating how setters protect object state by rejecting invalid data like out-of-range student grades.",
            "code": "public class StudentGrade {\n    private String studentName;\n    private int score;\n\n    public StudentGrade(String studentName, int score) {\n        this.studentName = studentName;\n        setScore(score); // Delegate to setter to reuse invariant validation\n    }\n\n    public void setScore(int score) {\n        if (score < 0 || score > 100) {\n            System.out.println(\"Error: Score \" + score + \" is out of bounds (0-100). Defaulting to 0.\");\n            this.score = 0;\n            return;\n        }\n        this.score = score;\n    }\n\n    public int getScore() { return score; }\n    public String getStudentName() { return studentName; }\n\n    public static void main(String[] args) {\n        StudentGrade s1 = new StudentGrade(\"Alex\", 95);\n        System.out.println(s1.getStudentName() + \" score: \" + s1.getScore());\n\n        s1.setScore(150); // Rejection test\n        System.out.println(s1.getStudentName() + \" score: \" + s1.getScore());\n    }\n}",
            "output": "Alex score: 95\nError: Score 150 is out of bounds (0-100). Defaulting to 0.\nAlex score: 0"
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Returning private array fields directly in getters (e.g. 'return this.items;')",
            "whyItHappens": "Developers assume because the field is marked private, the array inside it is safe.",
            "howToFix": "Always return 'items.clone()' so callers receive an isolated heap copy."
        },
        {
            "mistake": "Creating public setters for every field automatically via IDE shortcuts",
            "whyItHappens": "Habit of generating boilerplate getters/setters without considering object lifecycle.",
            "howToFix": "Only create setters if field modification is required by domain logic. Prefer immutability."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: Tracing Array Reference Mutation",
            "problemStatement": "What is printed when the following code executes?",
            "code": "class Account {\n    private int[] log = {10, 20};\n    public int[] getLog() { return log; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Account acc = new Account();\n        int[] ref = acc.getLog();\n        ref[0] = 99;\n        System.out.println(acc.getLog()[0]);\n    }\n}",
            "options": ["10", "99", "20", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Check whether getLog() returns the original array reference or a clone.",
            "solution": "99",
            "explanation": "Because getLog() returns the private log reference directly without defensive copying, mutating ref[0] alters the actual array inside the Account object, printing 99."
        },
        {
            "title": "Puzzle 2: Setter Invariant Enforcement",
            "problemStatement": "What does the console display after running this program?",
            "code": "class Box {\n    private int width = 10;\n    public void setWidth(int w) {\n        if (w > 0) this.width = w;\n    }\n    public int getWidth() { return width; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.setWidth(-5);\n        System.out.println(b.getWidth());\n    }\n}",
            "options": ["-5", "10", "0", "Runtime Error"],
            "correctOptionIndex": 1,
            "hint": "Does -5 pass the condition (w > 0)?",
            "solution": "10",
            "explanation": "-5 fails the guard check (w > 0), so this.width remains at its initial value of 10."
        },
        {
            "title": "Puzzle 3: Defensive Copying with clone()",
            "problemStatement": "What is the output of the following program?",
            "code": "class SafeData {\n    private int[] data = {1, 2, 3};\n    public int[] getData() { return data.clone(); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        SafeData s = new SafeData();\n        s.getData()[0] = 50;\n        System.out.println(s.getData()[0]);\n    }\n}",
            "options": ["50", "1", "0", "ArrayIndexOutOfBoundsException"],
            "correctOptionIndex": 1,
            "hint": "s.getData() produces a brand new cloned array every time it is called.",
            "solution": "1",
            "explanation": "s.getData() returns a fresh clone each time. Assigning to index 0 modifies that temporary clone which is immediately discarded. The next call returns another fresh clone of the unchanged internal array {1, 2, 3}, printing 1."
        },
        {
            "title": "Puzzle 4: String Immutability in Getters",
            "problemStatement": "Does returning a private String in a getter require defensive copying?",
            "code": "class User {\n    private String name = \"Alice\";\n    public String getName() { return name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User();\n        String s = u.getName();\n        s = s.toUpperCase();\n        System.out.println(u.getName());\n    }\n}",
            "options": ["ALICE", "Alice", "null", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Can a String object be modified after creation?",
            "solution": "Alice",
            "explanation": "String is immutable in Java. s.toUpperCase() produces a new String on the heap; it cannot modify the original String object referenced by name, so u.getName() still returns 'Alice'."
        },
        {
            "title": "Puzzle 5: Boolean Getter JavaBeans Convention",
            "problemStatement": "What is the standard getter name for a private boolean field 'isActive'?",
            "code": "class Member {\n    private boolean active;\n    // Standard JavaBean getter?\n}",
            "options": ["getActive()", "isActive()", "hasActive()", "checkActive()"],
            "correctOptionIndex": 1,
            "hint": "JavaBeans specification specifies a special prefix for boolean properties.",
            "solution": "isActive()",
            "explanation": "According to the JavaBeans specification, boolean getters should be named with the 'is' prefix, hence isActive()."
        },
        {
            "title": "Puzzle 6: Constructor Inbound Leak",
            "problemStatement": "What is the result printed by this code?",
            "code": "class Config {\n    private int[] ports;\n    public Config(int[] p) { this.ports = p; }\n    public int getPort() { return ports[0]; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        int[] myPorts = {8080};\n        Config cfg = new Config(myPorts);\n        myPorts[0] = 9090;\n        System.out.println(cfg.getPort());\n    }\n}",
            "options": ["8080", "9090", "0", "NullPointerException"],
            "correctOptionIndex": 1,
            "hint": "Did Config make a defensive copy in its constructor?",
            "solution": "9090",
            "explanation": "Config simply assigned this.ports = p without cloning. Modifying myPorts[0] immediately mutates the array inside cfg, outputting 9090."
        },
        {
            "title": "Puzzle 7: Private Setter Execution",
            "problemStatement": "Can a class invoke its own private setter from within its constructor?",
            "code": "class Engine {\n    private int rpm;\n    private void setRpm(int r) { this.rpm = (r < 0) ? 0 : r; }\n    public Engine(int r) { setRpm(r); }\n    public int getRpm() { return rpm; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Engine e = new Engine(-100);\n        System.out.println(e.getRpm());\n    }\n}",
            "options": ["-100", "0", "Compilation Error: private method cannot be called", "Runtime Error"],
            "correctOptionIndex": 1,
            "hint": "Does private restrict access inside the same class?",
            "solution": "0",
            "explanation": "Private methods are fully accessible anywhere inside their declaring class. Calling private setRpm from the constructor normalizes -100 to 0."
        }
    ],
    "interviewQuestions": [
        {
            "question": "What is a mutable reference leak and how do you prevent it in Java?",
            "answer": "A mutable reference leak occurs when a class holds a reference to a mutable object (like an array, Date, or collection) and either receives that reference in a constructor or returns it from a getter without creating a defensive copy. Because Java passes references by value, external code retains a pointer to the internal heap object and can alter its state directly, bypassing all validation logic. You prevent this by making defensive copies using clone() or copy constructors both on input (in the constructor) and on output (in the getter).",
            "followUp": "Do you need defensive copies when returning primitive fields like int or boolean?",
            "followUpAnswer": "No, primitive types are stored and passed strictly by value on the JVM stack. A copy of the raw bit pattern is passed to the caller, making it physically impossible for the caller to mutate internal state through a primitive getter.",
            "keyPhrases": ["Mutable reference leak", "Defensive copying", "clone()", "Invariant preservation", "Pass by value"]
        },
        {
            "question": "Why is generating getters and setters for all private fields considered bad object-oriented design?",
            "answer": "Blindly generating getters and setters for every private field turns what should be an encapsulated object into an open data structure (an anemic domain model). It exposes internal implementation details and invites external code to pull data out, manipulate it, and push it back in, violating the 'Tell, Don't Ask' principle. Well-designed classes expose high-level domain operations (e.g. account.deposit(100) instead of account.setBalance(account.getBalance() + 100)) and maintain their own invariants internally.",
            "followUp": "When are simple getters and setters acceptable?",
            "followUpAnswer": "Simple getters and setters are acceptable in Data Transfer Objects (DTOs), configuration objects, and entities consumed by serialization libraries and ORM frameworks (like Jackson or Hibernate) that rely on the JavaBeans convention to map database rows or JSON keys.",
            "keyPhrases": ["Anemic domain model", "Tell Don't Ask", "Broken encapsulation", "DTOs and ORM"]
        }
    ],
    "miniQuiz": [
        {"question": "What is the primary vulnerability when returning a private array in a getter?", "options": ["Callers can modify array elements without using a setter", "It causes a StackOverflowError", "The JVM garbage collects the array immediately", "Arrays cannot be declared private"], "correctIndex": 0, "explanation": "Arrays are mutable objects. Returning the direct reference lets callers modify elements directly."},
        {"question": "How do you protect a mutable array field in a getter method?", "options": ["Mark the method static", "Return a defensive copy using array.clone()", "Make the return type void", "Set array to null after return"], "correctIndex": 1, "explanation": "Returning a clone gives the caller a distinct heap copy, keeping the original intact."},
        {"question": "Which field type is inherently safe from reference leaks without defensive copying?", "options": ["int[]", "char[]", "String", "java.util.Date"], "correctIndex": 2, "explanation": "String is immutable in Java, so external callers cannot mutate its characters."},
        {"question": "According to JavaBeans conventions, what should the getter for 'boolean loggedIn' be named?", "options": ["getLoggedIn()", "isLoggedIn()", "hasLoggedIn()", "checkLoggedIn()"], "correctIndex": 1, "explanation": "JavaBeans specification dictates that boolean property getters use the 'is' prefix."},
        {"question": "What does a setter guard clause accomplish?", "options": ["Prevents the method from being compiled", "Validates input arguments to maintain class invariants before assignment", "Locks the object against multithreading", "Deletes old field values"], "correctIndex": 1, "explanation": "A guard clause checks boundary conditions (like age >= 0) and rejects invalid state."},
        {"question": "If you do not want external code to change a field after construction, what should you do?", "options": ["Provide only a getter and no setter", "Provide a private getter", "Make the setter return void", "Declare the class abstract"], "correctIndex": 0, "explanation": "Omitting the setter creates a read-only property that cannot be changed after instantiation."},
        {"question": "When passing an array to a constructor, why should you clone it before assigning to field?", "options": ["To avoid allocating memory", "Because the caller can modify their original array later and corrupt the object", "To convert it to an ArrayList", "Because constructors cannot accept arrays directly"], "correctIndex": 1, "explanation": "Inbound defensive copying prevents external callers from altering the array after the object is created."},
        {"question": "Does defensive copying protect primitive 'double balance' fields?", "options": ["Yes, it is required", "No, primitives are copied by value so they are inherently safe", "Only if balance is negative", "Only if wrapped in Double"], "correctIndex": 1, "explanation": "Primitives pass by value, meaning the caller receives an independent stack copy automatically."},
        {"question": "What is a class invariant?", "options": ["A method that never returns a value", "A business rule condition that must always remain true for an object to be valid", "A variable that cannot be accessed by subclasses", "An error thrown by the compiler"], "correctIndex": 1, "explanation": "An invariant is a truth condition (e.g. balance >= 0, width > 0) guaranteed by encapsulation."},
        {"question": "What is the 'Tell, Don't Ask' principle?", "options": ["Ask objects for their fields and do calculations externally", "Tell an object what operation to perform rather than asking for its data and doing it yourself", "Never write methods with parameters", "Only print text using System.out.println"], "correctIndex": 1, "explanation": "Tell, Don't Ask advises telling an object what to do (e.g. account.withdraw(50)) rather than pulling its data out."}
    ]
}

# -------------------------------------------------------------
# LESSON 10.4: Immutable Class Design Pattern
# -------------------------------------------------------------
lessons_p2["immutable-class-pattern"] = {
    "id": "immutable-class-pattern",
    "moduleId": "java-encapsulation",
    "moduleTitle": "10. Encapsulation & Data Hiding",
    "lessonNumber": "Lesson 10.4",
    "title": "Immutable Class Design Pattern",
    "subtitle": "Designing unmodifiable state objects, final fields, defensive copying in getters/constructors, and with-ers for evolution",
    "estimatedMinutes": 18,
    "beginnerAnalogy": "Think of an official birth certificate stamped by the government. Once issued with your birth date, birth city, and legal parentage, nobody can open a menu and 'update' your birth location to Paris. If you legally change your name later in life, the government does not erase the ink on your historic birth record; instead, they issue a brand new official certificate reflecting the amendment while preserving historical integrity. An immutable object in Java is like that stamped birth certificate: once the constructor completes on the heap, its contents are physically unchangeable for the remainder of program execution.",
    "interviewTakeaways": [
        "The 5 Rules of Immutability (Joshua Bloch): 1) Don't provide mutator methods (no setters), 2) Make class final (prevent subclass override), 3) Make all fields final (enforce single assignment), 4) Make all fields private, 5) Ensure exclusive access to mutable components via defensive copying.",
        "Thread Safety for Free: Immutable objects can be shared across multiple threads without synchronization, locks, or race conditions because their state never changes after construction.",
        "The 'With-er' Pattern: Because immutable objects cannot be mutated, methods that represent changes (like withBalance() or withName()) instantiate and return a BRAND NEW object containing the modified value while leaving the original intact.",
        "Final Reference vs Immutable Object: A 'final int[] arr = {1, 2}' reference cannot point to a new array, but arr[0] CAN still be modified! True immutability requires both reference immutability AND state immutability.",
        "Safe Map Keys and Cache Keys: Immutable objects (like String or Integer) make ideal keys in HashMaps because their hash codes never change, preventing lost entries."
    ],
    "cheatSheet": {
        "summary": "An immutable class guarantees its state cannot change after instantiation. Achieved by final class, private final fields, no setters, defensive copies of mutables, and with-er methods for state evolution.",
        "syntaxTemplate": "public final class ImmutablePoint {\n    private final int x;\n    private final int y;\n\n    public ImmutablePoint(int x, int y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    public int getX() { return x; }\n    public int getY() { return y; }\n\n    public ImmutablePoint withX(int newX) {\n        return new ImmutablePoint(newX, this.y);\n    }\n}",
        "rules": [
            {"rule": "Declare Class Final", "explanation": "Prevents malicious or accidental subclasses from overriding methods and introducing mutable state."},
            {"rule": "Make All Fields Private and Final", "explanation": "Guarantees single initialization in the constructor and prevents direct external writes."},
            {"rule": "No Mutator Methods", "explanation": "Do not provide setters or any methods that alter internal field state."},
            {"rule": "Defensive Copy in Constructors", "explanation": "Clone any mutable objects or arrays passed in so external holders cannot alter them."},
            {"rule": "Defensive Copy in Accessors", "explanation": "Clone any mutable objects or arrays before returning them from getter methods."},
            {"rule": "Use With-ers for Evolution", "explanation": "Return a new instance instead of mutating the current object (e.g. withSalary(double s))."}
        ],
        "quickComparison": [
            {"aspect": "State Mutation", "optionA": "Mutable: Fields modified in-place on existing heap object", "optionB": "Immutable: Unmodifiable; state change creates a new instance"},
            {"aspect": "Thread Safety", "optionA": "Requires explicit locking or synchronization", "optionB": "Inherently 100% thread-safe without locks"},
            {"aspect": "HashMap Key Safety", "optionA": "Hazardous: mutating key breaks hash lookup", "optionB": "Completely safe: hash code never changes"},
            {"aspect": "Memory Usage", "optionA": "Low: reuses existing memory block", "optionB": "May allocate more objects (mitigated by object pooling/escape analysis)"}
        ]
    },
    "coreExplanation": [
        "An immutable object is an object whose internal state remains completely constant after construction completes on the heap.",
        "Java's built-in String and wrapper classes (Integer, Double, Boolean) are premier examples of immutable classes.",
        "Declaring a class `final` is critical for immutability: if a class were non-final, a subclass could extend it, add mutable fields, and override getters to return mutable values, subverting immutability.",
        "All fields should be declared `final` and `private`. The `final` keyword ensures definite assignment during constructor execution and prevents reassignment.",
        "If an immutable class contains fields that reference mutable objects (like arrays `int[]`), defensive copies must be created both when receiving data in the constructor and when exposing data via getters.",
        "To modify an immutable object, implement 'with-er' methods: these methods construct and return a new instance with the desired change while leaving `this` unchanged."
    ],
    "diagram": "MUTABLE OBJECT PATTERN:                                IMMUTABLE 'WITH-ER' PATTERN:\n+----------------------+                                +----------------------+\n| Account (Heap: 0x10) |                                | Money (Heap: 0x10)   |\n| balance: $100        |                                | amount: $100         |\n+----------------------+                                +----------------------+\n         |                                                         |\nacc.deposit(50)                                           m.withAdded(50)\n         |                                                         |\n         v                                                         v\n+----------------------+ (Same object modified)         +----------------------+ (Original untouched!)\n| Account (Heap: 0x10) |                                | Money (Heap: 0x10)   |\n| balance: $150        |                                | amount: $100         |\n+----------------------+                                +----------------------+\n                                                                   +\n                                                        +----------------------+\n                                                        | Money (Heap: 0x20)   | (Brand NEW object!)\n                                                        | amount: $150         |\n                                                        +----------------------+",
    "codeSnippet": {
        "title": "Complete Implementation of an Immutable Value Object",
        "code": "public final class ImmutableLocation {\n    private final String city;\n    private final double latitude;\n    private final double longitude;\n    private final int[] sensorCodes;\n\n    public ImmutableLocation(String city, double lat, double lon, int[] codes) {\n        this.city = city;\n        this.latitude = lat;\n        this.longitude = lon;\n        // Inbound defensive copy for mutable array\n        this.sensorCodes = (codes != null) ? codes.clone() : new int[0];\n    }\n\n    public String getCity() { return city; }\n    public double getLatitude() { return latitude; }\n    public double getLongitude() { return longitude; }\n\n    // Outbound defensive copy\n    public int[] getSensorCodes() { return sensorCodes.clone(); }\n\n    // With-er method: returns brand new instance\n    public ImmutableLocation withCity(String newCity) {\n        return new ImmutableLocation(newCity, this.latitude, this.longitude, this.sensorCodes);\n    }\n\n    public static void main(String[] args) {\n        int[] sensors = {11, 22, 33};\n        ImmutableLocation loc1 = new ImmutableLocation(\"Seattle\", 47.6062, -122.3321, sensors);\n        ImmutableLocation loc2 = loc1.withCity(\"Portland\");\n\n        System.out.println(\"loc1 City: \" + loc1.getCity());\n        System.out.println(\"loc2 City: \" + loc2.getCity());\n        System.out.println(\"loc1 == loc2: \" + (loc1 == loc2));\n    }\n}",
        "lineByLineExplanation": [
            {"line": "public final class ImmutableLocation", "explanation": "Final class modifier guarantees no subclass can ever extend this class and override methods with mutable behavior."},
            {"line": "private final int[] sensorCodes;", "explanation": "Final reference to array; array elements must be defensively cloned to prevent external tampering."},
            {"line": "this.sensorCodes = (codes != null) ? codes.clone() : new int[0];", "explanation": "Inbound defensive copy protects from modifications to caller's original array."},
            {"line": "return new ImmutableLocation(newCity, ...);", "explanation": "With-er constructs and returns a completely new instance on the heap, keeping loc1 immutable."},
            {"line": "System.out.println(\"loc1 == loc2: \" + (loc1 == loc2));", "explanation": "Prints false, confirming that loc1 and loc2 are separate, distinct heap objects."}
        ],
        "output": "loc1 City: Seattle\nloc2 City: Portland\nloc1 == loc2: false"
    },
    "codeExamples": [
        {
            "title": "Immutable Currency Representation",
            "description": "An immutable Money class that supports arithmetic by returning new Money instances.",
            "code": "public final class Money {\n    private final double amount;\n    private final String currency;\n\n    public Money(double amount, String currency) {\n        this.amount = amount;\n        this.currency = currency;\n    }\n\n    public Money add(double val) {\n        return new Money(this.amount + val, this.currency);\n    }\n\n    public double getAmount() { return amount; }\n    public String getCurrency() { return currency; }\n\n    public static void main(String[] args) {\n        Money wallet = new Money(50.0, \"USD\");\n        Money updated = wallet.add(25.0);\n\n        System.out.println(\"Original Wallet: \" + wallet.getAmount() + \" \" + wallet.getCurrency());\n        System.out.println(\"Updated Wallet: \" + updated.getAmount() + \" \" + updated.getCurrency());\n    }\n}",
            "output": "Original Wallet: 50.0 USD\nUpdated Wallet: 75.0 USD"
        }
    ],
    "beginnerMistakes": [
        {
            "mistake": "Thinking 'final int[] arr' makes the array elements immutable",
            "whyItHappens": "Confusing reference immutability (cannot reassign arr) with object immutability (can still alter arr[0]).",
            "howToFix": "Recognize that final only freezes the reference pointer. You must protect elements via private access and defensive cloning."
        },
        {
            "mistake": "Forgetting to make an immutable class 'final'",
            "whyItHappens": "Developers assume having only private final fields is sufficient for immutability.",
            "howToFix": "Always mark the class 'final' to prevent subclasses from adding mutable state or overriding methods."
        }
    ],
    "practiceProblems": [
        {
            "title": "Puzzle 1: Final Array Reference Mutation",
            "problemStatement": "What is printed by the following code?",
            "code": "public class Main {\n    public static void main(String[] args) {\n        final int[] nums = {10, 20, 30};\n        nums[0] = 99;\n        System.out.println(nums[0]);\n    }\n}",
            "options": ["10", "99", "Compilation Error: cannot assign value to final variable", "Runtime Error"],
            "correctOptionIndex": 1,
            "hint": "Does 'final' protect the reference variable or the heap array's contents?",
            "solution": "99",
            "explanation": "'final' prevents reassigning the variable 'nums' to a new array address. It does NOT prevent mutating elements inside the array on the heap. Thus, nums[0] becomes 99."
        },
        {
            "title": "Puzzle 2: With-er Return Value Verification",
            "problemStatement": "What is the output of this program?",
            "code": "final class Color {\n    private final int r;\n    public Color(int r) { this.r = r; }\n    public Color withRed(int red) { return new Color(red); }\n    public int getRed() { return r; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Color c1 = new Color(100);\n        c1.withRed(255);\n        System.out.println(c1.getRed());\n    }\n}",
            "options": ["255", "100", "0", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "Check what happens to the return value of c1.withRed(255).",
            "solution": "100",
            "explanation": "Because Color is immutable, withRed(255) returns a brand new Color object. Because the caller ignores the return value, c1 is completely unchanged, printing 100."
        },
        {
            "title": "Puzzle 3: Safe Sharing Across Objects",
            "problemStatement": "Why can immutable objects be shared freely across multiple instances without copying?",
            "code": "final class Score {\n    private final int points;\n    public Score(int p) { this.points = p; }\n    public int getPoints() { return points; }\n}",
            "options": ["Because they occupy zero bytes in heap memory", "Because their state can never change, so no consumer can corrupt another consumer's view", "Because the JVM compiles them into primitives", "Because they are automatically stored in Metaspace"],
            "correctOptionIndex": 1,
            "hint": "If something cannot change, is there any risk of side effects from sharing it?",
            "solution": "Because their state can never change, so no consumer can corrupt another consumer's view",
            "explanation": "Immutable objects are fundamentally side-effect free. Multiple parts of a program can share the exact same instance with zero risk of unexpected mutation."
        },
        {
            "title": "Puzzle 4: String Concatenation and Immutability",
            "problemStatement": "What does this code print?",
            "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"Java\";\n        s.concat(\" OOP\");\n        System.out.println(s);\n    }\n}",
            "options": ["Java OOP", "Java", "OOP", "Compilation Error"],
            "correctOptionIndex": 1,
            "hint": "String is an immutable class. Does concat() modify 's' in place?",
            "solution": "Java",
            "explanation": "String.concat() returns a new String on the heap. Since 's' was not reassigned (s = s.concat(...)), 's' still references 'Java'."
        },
        {
            "title": "Puzzle 5: Subclass Subversion Risk",
            "problemStatement": "Why must an immutable class be declared with the 'final' keyword?",
            "code": "class NonFinalImmutable {\n    private final int value;\n    public NonFinalImmutable(int v) { this.value = v; }\n    public int getValue() { return value; }\n}",
            "options": ["To force JVM to optimize it", "To prevent a subclass from adding mutable fields or overriding methods to violate immutability", "Because non-final classes cannot have final fields", "To allow it to be stored in the String pool"],
            "correctOptionIndex": 1,
            "hint": "What could an evil subclass do if it extends NonFinalImmutable?",
            "solution": "To prevent a subclass from adding mutable fields or overriding methods to violate immutability",
            "explanation": "If a class is not final, a subclass can extend it, declare mutable fields, and override getters to return altered values, subverting the guarantee of immutability."
        },
        {
            "title": "Puzzle 6: Multiple With-er Chaining",
            "problemStatement": "What does the following snippet print?",
            "code": "final class Dimension {\n    private final int w, h;\n    public Dimension(int w, int h) { this.w = w; this.h = h; }\n    public Dimension withW(int w) { return new Dimension(w, this.h); }\n    public Dimension withH(int h) { return new Dimension(this.w, h); }\n    public int area() { return w * h; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Dimension d1 = new Dimension(5, 10);\n        Dimension d2 = d1.withW(8).withH(2);\n        System.out.println(d1.area() + \" \" + d2.area());\n    }\n}",
            "options": ["50 16", "50 50", "16 16", "80 16"],
            "correctOptionIndex": 0,
            "hint": "Calculate the area for d1 (5 * 10) and the chained new instance d2 (8 * 2).",
            "solution": "50 16",
            "explanation": "d1 remains unchanged (area = 5 * 10 = 50). d2 is a new Dimension with w=8, h=2 (area = 8 * 2 = 16). The output is '50 16'."
        },
        {
            "title": "Puzzle 7: Hash Code Stability in Immutability",
            "problemStatement": "Why are immutable classes preferred as keys in hash-based data structures?",
            "code": "final class Key {\n    private final int id;\n    public Key(int id) { this.id = id; }\n    public int getId() { return id; }\n}",
            "options": ["Their hashCode is guaranteed never to change during runtime", "They consume zero heap memory", "The JVM caches them in Metaspace", "They do not need an equals() method"],
            "correctOptionIndex": 0,
            "hint": "What happens if a key's fields mutate after it is put into a hash map?",
            "solution": "Their hashCode is guaranteed never to change during runtime",
            "explanation": "If a key object mutates after insertion into a hash table, its hash code changes, making it impossible to locate in the original hash bucket. Immutability guarantees permanent hash stability."
        }
    ],
    "interviewQuestions": [
        {
            "question": "What are the rules for creating an immutable class in Java according to Effective Java?",
            "answer": "According to Joshua Bloch in Effective Java, the five rules for designing an immutable class are: 1) Do not provide any mutator methods (no setters). 2) Ensure that the class cannot be extended by marking it 'final'. 3) Make all fields 'final' to enforce single assignment. 4) Make all fields 'private' to prevent direct external access. 5) Ensure exclusive access to any mutable components: if any field points to a mutable object or array, perform defensive copying both in constructors and in getter methods.",
            "followUp": "How do you allow callers to 'modify' an immutable object?",
            "followUpAnswer": "You provide functional 'with-er' methods (e.g. withBalance(double b) or withName(String n)) that instantiate and return a BRAND NEW object with the updated value, leaving the original instance completely unmodified.",
            "keyPhrases": ["Joshua Bloch", "Final class", "Private final fields", "No mutators", "Defensive copying", "With-er pattern"]
        },
        {
            "question": "What is the difference between a final reference and an immutable object?",
            "answer": "A final reference means the variable pointer itself cannot be reassigned to a different memory address on the heap once initialized (e.g. 'final int[] arr = new int[5]; arr = otherArr;' will not compile). However, the contents of the object or array that the reference points to can still be modified (e.g. 'arr[0] = 99;' is completely legal). An immutable object, by contrast, means the internal state of the object itself cannot be altered after creation. True immutability requires both reference immutability and state immutability.",
            "followUp": "Is String in Java both a final class and an immutable class?",
            "followUpAnswer": "Yes. String is declared 'public final class String' so no subclass can subvert its behavior, and its internal byte/char array is private and never exposed directly without copying, guaranteeing 100% immutability.",
            "keyPhrases": ["Final variable vs immutable object", "Pointer vs heap state", "Reassignment prevention", "String immutability"]
        }
    ],
    "miniQuiz": [
        {"question": "Which keyword prevents a class from being subclassed to preserve immutability?", "options": ["static", "final", "abstract", "transient"], "correctIndex": 1, "explanation": "The 'final' keyword on a class header prevents any subclass from inheriting from it."},
        {"question": "What happens when you call a 'with-er' method on an immutable object?", "options": ["The original object's fields are updated directly", "A brand new object is created and returned with the modified value", "The JVM throws an UnsupportedOperationException", "The object is deleted from the heap"], "correctIndex": 1, "explanation": "With-er methods instantiate and return a new instance, leaving the original intact."},
        {"question": "If 'final int[] numbers = {1, 2, 3};', can you do 'numbers[0] = 5;'?", "options": ["No, it fails to compile", "Yes, final freezes the reference pointer, not the array elements", "No, it throws an ArrayImmutableException", "Only inside a static method"], "correctIndex": 1, "explanation": "Final on an array only prevents reassigning 'numbers = ...'; elements remain mutable."},
        {"question": "Why are immutable objects inherently thread-safe?", "options": ["They use synchronized blocks internally", "Their state cannot change after construction, so threads can read them without race conditions", "They run on a dedicated thread in the JVM", "They cannot be accessed by more than one thread"], "correctIndex": 1, "explanation": "Thread-safety issues arise from concurrent mutation. Without mutation, race conditions are impossible."},
        {"question": "Which of the following classes in the Java standard library is immutable?", "options": ["java.lang.StringBuilder", "java.lang.String", "java.lang.StringBuffer", "int[]"], "correctIndex": 1, "explanation": "String is immutable; StringBuilder and StringBuffer are explicitly mutable."},
        {"question": "What is the primary benefit of making all fields 'final' in an immutable class?", "options": ["Ensures fields are assigned exactly once and guarantees thread-safe publication", "Allows fields to be accessed directly without getters", "Makes the fields static", "Reduces bytecode size to zero"], "correctIndex": 0, "explanation": "Final fields must be assigned during construction and JVM guarantees safe publication across threads."},
        {"question": "How should an immutable class handle a Date or array field passed to its constructor?", "options": ["Assign it directly to save memory", "Throw an exception if an array is passed", "Make a defensive copy using clone() or copying elements", "Set it to null"], "correctIndex": 2, "explanation": "Inbound defensive copying prevents external code from mutating the array after constructor exits."},
        {"question": "Can an immutable class have non-private fields?", "options": ["Yes, if they are marked final and primitive", "No, Best practice and encapsulation require all fields to be private", "Yes, all fields should be public for speed", "Only if marked static"], "correctIndex": 1, "explanation": "Best practice and the Joshua Bloch rules require all fields to be private."},
        {"question": "What is an anemic domain model?", "options": ["A class with no fields", "A class that has private fields and blind getters/setters with zero business logic", "A class with too many constructors", "A class that cannot be garbage collected"], "correctIndex": 1, "explanation": "An anemic domain model is a class that acts as a dumb data bag without encapsulating behavior."},
        {"question": "What does Joshua Bloch recommend for classes with immutable design?", "options": ["Classes should be immutable unless there's a very good reason to make them mutable", "Never use immutable classes due to memory overhead", "Only make classes immutable if they have zero fields", "Use mutable classes for all domain models"], "correctIndex": 0, "explanation": "Item 17 of Effective Java states: 'Minimize mutability. Classes should be immutable unless there is a compelling reason to make them mutable.'"}
    ]
}
