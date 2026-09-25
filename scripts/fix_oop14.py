with open(r'src/data/java/sublessons/oop/oop14_exercises.ts', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace(
    """username='amara', email='amara@example.com'""",
    """username=\\'amara\\', email=\\'amara@example.com\\'"""
)

text = text.replace(
    """name='Bob'""",
    """name=\\'Bob\\'"""
)

text = text.replace(
    """initialized with space characters ' '.""",
    """initialized with space characters \\' \\'."""
)

text = text.replace(
    """on field 'email']""",
    """on field \\'email\\']"""
)

with open(r'src/data/java/sublessons/oop/oop14_exercises.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Successfully fixed 4 unescaped quote lines in oop14_exercises.ts")
