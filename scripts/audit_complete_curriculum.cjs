const fs = require('fs');

const sublessonDirs = [
  { dir: 'src/data/java/sublessons', prefix: 'Root Sublessons' },
  { dir: 'src/data/java/sublessons/operators', prefix: 'Operators' },
  { dir: 'src/data/java/sublessons/controlFlow', prefix: 'Control Flow' },
  { dir: 'src/data/java/sublessons/strings', prefix: 'Strings' },
  { dir: 'src/data/java/sublessons/arrays', prefix: 'Arrays' },
  { dir: 'src/data/java/sublessons/methods', prefix: 'Methods' },
  { dir: 'src/data/java/sublessons/oop', prefix: 'OOP (Section 2)' },
];

console.log('====================================================');
console.log('   JAVA CURRICULUM AUDIT: SECTION 1 & SECTION 2     ');
console.log('====================================================\n');

let totalLessonsAll = 0;
let totalExercisesAll = 0;

sublessonDirs.forEach(({ dir, prefix }) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
  const lessonFiles = files.filter(f => f.includes('lesson') || f.includes('_lessons') || f.includes('Lessons'));
  const exerciseFiles = files.filter(f => f.includes('exercise') || f.includes('_exercises') || f.includes('Exercises'));

  let dirLessons = 0;
  lessonFiles.forEach(f => {
    const content = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const matches = content.match(/(["']?lessonNumber["']?)\s*:\s*['"][^'"]+['"]/g) || [];
    dirLessons += matches.length;
  });

  let dirExercises = 0;
  exerciseFiles.forEach(f => {
    const content = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const matches = content.match(/(["']?solutionCode["']?)\s*:\s*/g) || [];
    dirExercises += matches.length;
  });

  if (dirLessons > 0 || dirExercises > 0) {
    console.log(`[${prefix}]`);
    console.log(`  Sub-Lessons     : ${dirLessons}`);
    console.log(`  Coding Exercises: ${dirExercises}\n`);
  }

  if (prefix !== 'Root Sublessons') {
    totalLessonsAll += dirLessons;
    totalExercisesAll += dirExercises;
  }
});

console.log('----------------------------------------------------');
console.log(`TOTAL SUB-LESSONS IN CURRICULUM : ${totalLessonsAll}`);
console.log(`TOTAL CODING EXERCISES AUTHORED : ${totalExercisesAll}`);
console.log('====================================================');
