const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

console.log('====================================================');
console.log('   JAVA CURRICULUM AUDIT: COMPLETE PLATFORM SUITE   ');
console.log('====================================================\n');

let hasFailure = false;

// 1. Audit Sublessons & Coding Exercises across directories
const sublessonDirs = [
  { dir: 'src/data/java/sublessons', prefix: 'Root Sublessons' },
  { dir: 'src/data/java/sublessons/operators', prefix: 'Operators' },
  { dir: 'src/data/java/sublessons/controlFlow', prefix: 'Control Flow' },
  { dir: 'src/data/java/sublessons/strings', prefix: 'Strings' },
  { dir: 'src/data/java/sublessons/arrays', prefix: 'Arrays' },
  { dir: 'src/data/java/sublessons/methods', prefix: 'Methods' },
  { dir: 'src/data/java/sublessons/oop', prefix: 'OOP (Section 2)' },
];

let totalLessonsAll = 0;
let totalExercisesAll = 0;

sublessonDirs.forEach(({ dir, prefix }) => {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) return;
  const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.ts'));
  const lessonFiles = files.filter(f => f.includes('lesson') || f.includes('_lessons') || f.includes('Lessons'));
  const exerciseFiles = files.filter(f => f.includes('exercise') || f.includes('_exercises') || f.includes('Exercises'));

  let dirLessons = 0;
  lessonFiles.forEach(f => {
    const content = fs.readFileSync(path.join(fullPath, f), 'utf8');
    const matches = content.match(/(["']?lessonNumber["']?)\s*:\s*['"][^'"]+['"]/g) || [];
    dirLessons += matches.length;
  });

  let dirExercises = 0;
  exerciseFiles.forEach(f => {
    const content = fs.readFileSync(path.join(fullPath, f), 'utf8');
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

// 2. Audit Modules in curriculum.ts
const curriculumPath = path.join(ROOT, 'src/data/java/curriculum.ts');
let moduleCount = 0;
let sectionCount = 0;
if (fs.existsSync(curriculumPath)) {
  const content = fs.readFileSync(curriculumPath, 'utf8');
  const modMatches = content.match(/id:\s*['"]java-[a-z0-9\-]+['"]/g) || [];
  moduleCount = modMatches.length;
  const secMatches = content.match(/{\s*id:\s*['"][a-z]+['"],\s*label:/g) || [];
  sectionCount = secMatches.length;
}

// 3. Audit Flashcards
const flashcardsPath = path.join(ROOT, 'src/data/java/javaFlashcards.ts');
let flashcardsCount = 0;
if (fs.existsSync(flashcardsPath)) {
  const content = fs.readFileSync(flashcardsPath, 'utf8');
  const matches = content.match(/id:\s*['"]jf_[0-9]+['"]/g) || [];
  flashcardsCount = matches.length;
}

// 4. Audit Interview Questions
let interviewCount = 0;
const interviewFiles = [
  'src/data/java/interviews/javaInterviewTraps.ts',
  'src/data/java/interviews/javaRound2Questions.ts',
  'src/data/java/interviews/javaRound3Questions.ts',
];
interviewFiles.forEach(rel => {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) {
    const content = fs.readFileSync(full, 'utf8');
    const matches = content.match(/id:\s*['"][a-z0-9\-]+['"],/g) || [];
    interviewCount += matches.length;
  }
});

// 5. Audit Revision Differences & Traps
const revisionPath = path.join(ROOT, 'src/app/java/revision/page.tsx');
let differencesCount = 0;
let trapsCount = 0;
if (fs.existsSync(revisionPath)) {
  const content = fs.readFileSync(revisionPath, 'utf8');
  const diffBlock = content.match(/const DIFFERENCES = \[([\s\S]*?)\];/);
  if (diffBlock) {
    const diffMatches = diffBlock[1].match(/title:\s*['"][^'"]+['"]/g) || [];
    differencesCount = diffMatches.length;
  }
  const trapBlock = content.match(/const TRAPS = \[([\s\S]*?)\];/);
  if (trapBlock) {
    const trapMatches = trapBlock[1].match(/title:\s*['"][^'"]+['"]/g) || [];
    trapsCount = trapMatches.length;
  }
}

console.log('----------------------------------------------------');
console.log('SUMMARY AUDIT RESULTS:');
console.log(`  Modules in Curriculum : ${moduleCount} (Required: 38)`);
console.log(`  Curriculum Sections   : ${sectionCount} (Required: 8)`);
console.log(`  Sub-Lessons Authored  : ${totalLessonsAll} (Required: 77)`);
console.log(`  Coding Exercises      : ${totalExercisesAll} (Required: 671)`);
console.log(`  Flashcards            : ${flashcardsCount} (Required: >= 70)`);
console.log(`  Interview Questions   : ${interviewCount} (Required: >= 80)`);
console.log(`  Differences Matrices  : ${differencesCount} (Required: >= 18)`);
console.log(`  JVM Trap Scenarios    : ${trapsCount} (Required: >= 10)`);
console.log('----------------------------------------------------');

if (moduleCount !== 38) {
  console.error(`[FAIL] Expected 38 modules, found ${moduleCount}`);
  hasFailure = true;
}
if (sectionCount !== 8) {
  console.error(`[FAIL] Expected 8 sections, found ${sectionCount}`);
  hasFailure = true;
}
if (totalLessonsAll < 77) {
  console.error(`[FAIL] Expected >= 77 sublessons, found ${totalLessonsAll}`);
  hasFailure = true;
}
if (totalExercisesAll < 671) {
  console.error(`[FAIL] Expected >= 671 coding exercises, found ${totalExercisesAll}`);
  hasFailure = true;
}
if (flashcardsCount < 70) {
  console.error(`[FAIL] Expected >= 70 flashcards, found ${flashcardsCount}`);
  hasFailure = true;
}
if (interviewCount < 80) {
  console.error(`[FAIL] Expected >= 80 interview questions, found ${interviewCount}`);
  hasFailure = true;
}
if (differencesCount < 18) {
  console.error(`[FAIL] Expected >= 18 differences matrices, found ${differencesCount}`);
  hasFailure = true;
}
if (trapsCount < 10) {
  console.error(`[FAIL] Expected >= 10 traps, found ${trapsCount}`);
  hasFailure = true;
}

if (hasFailure) {
  console.error('\n❌ CURRICULUM AUDIT FAILED: Required content missing or degraded.');
  process.exit(1);
} else {
  console.log('\n✅ ALL CURRICULUM CONTENT VERIFIED INTACT AND PROTECTED.');
  process.exit(0);
}
