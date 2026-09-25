const fs = require('fs');

const lessonFiles = [
  'oop9_lessons.ts', 'oop10_lessons.ts', 'oop11_lessons.ts', 
  'oop12_lessons.ts', 'oop13_lessons.ts', 'oop14_lessons.ts'
];

const exerciseFiles = [
  'oop9_exercises.ts', 'oop10_exercises.ts', 'oop11_exercises.ts', 
  'oop12_exercises.ts', 'oop13_exercises.ts', 'oop14_exercises.ts'
];

console.log('=== AUDITING SECTION 2: OOP SUB-LESSONS ===');
let totalLessons = 0;
lessonFiles.forEach(f => {
  const content = fs.readFileSync('src/data/java/sublessons/oop/' + f, 'utf8');
  const matches = content.match(/(["']?lessonNumber["']?)\s*:\s*['"][^'"]+['"]/g) || [];
  console.log(`${f}: ${matches.length} lesson(s)`);
  totalLessons += matches.length;
});
console.log(`TOTAL SUB-LESSONS: ${totalLessons} (Expected: 24)\n`);

console.log('=== AUDITING SECTION 2: OOP CODING EXERCISES ===');
let totalExercises = 0;
exerciseFiles.forEach(f => {
  const content = fs.readFileSync('src/data/java/sublessons/oop/' + f, 'utf8');
  const matches = content.match(/(["']?solutionCode["']?)\s*:\s*/g) || [];
  console.log(`${f}: ${matches.length} exercise(s)`);
  totalExercises += matches.length;
});
console.log(`TOTAL CODING EXERCISES: ${totalExercises} (Expected: 240)`);
