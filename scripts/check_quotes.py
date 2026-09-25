with open(r'src/data/java/sublessons/oop/oop14_exercises.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    s = line.strip()
    for prefix in ["problemStatement: '", "hint: '", "title: '", "explanation: '"]:
        if s.startswith(prefix) and s.endswith("',"):
            inner = s[len(prefix):-2]
            # check if inner has unescaped single quotes
            # by replacing escaped quotes \' first
            test = inner.replace(r"\'", "")
            if "'" in test:
                print(f"Line {idx+1}: {line.strip()[:100]}...")
