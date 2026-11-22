#!/usr/bin/env node
/*
 * validate.js – checks questions.js and scenarios.js before they're merged.
 *
 *   node validate.js                 check both files in this folder
 *   node validate.js --format        also rewrite both files in the standard format
 *   node validate.js --strict        treat warnings as errors
 *
 * Exit code 0 = no errors, 1 = errors found. Use it in CI on every pull request.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const D = require('./pressprep-data.js');

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const format = args.includes('--format');
const dir = __dirname;

const files = [
  { file: 'questions.js', global: 'QUESTION_BANK', validate: D.validateQuestions, write: D.toQuestionsFile, label: 'questions' },
  { file: 'scenarios.js', global: 'SCENARIO_BANK', validate: D.validateScenarios, write: D.toScenariosFile, label: 'scenarios' }
];

let errorCount = 0, warnCount = 0;
for (const f of files) {
  const full = path.join(dir, f.file);
  if (!fs.existsSync(full)) { console.log(`✗ ${f.file}: file not found`); errorCount++; continue; }
  const text = fs.readFileSync(full, 'utf8');
  let list;
  try { list = D.parseBankFile(text, f.global); }
  catch (e) { console.log(`✗ ${f.file}: JavaScript syntax error: ${e.message}`); errorCount++; continue; }
  const r = f.validate(list);
  const n = Array.isArray(list) ? list.length : 0;
  const status = r.errors.length ? '✗' : '✓';
  console.log(`${status} ${f.file}: ${n} ${f.label}, ${r.errors.length} errors, ${r.warnings.length} warnings`);
  r.errors.forEach(e => console.log(`   error   ${e.where}: ${e.msg}`));
  r.warnings.forEach(w => console.log(`   warning ${w.where}: ${w.msg}`));
  errorCount += r.errors.length;
  warnCount += r.warnings.length;
  if (format && !r.errors.length) {
    fs.writeFileSync(full, f.write(list, D.headerOf(text, f.global)));
    console.log(`   formatted ${f.file}`);
  }
}

const failed = errorCount > 0 || (strict && warnCount > 0);
console.log(failed ? `\nFailed: ${errorCount} errors, ${warnCount} warnings.` : `\nAll good: ${warnCount} warnings.`);
process.exit(failed ? 1 : 0);
