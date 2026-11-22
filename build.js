#!/usr/bin/env node
/*
 * build.js – builds the GitHub Pages site in _site/.
 *
 *   node build.js
 *
 * Outputs questions.json, scenarios.json, the original .js files and version.json.
 * The app downloads version.json first and only fetches the content when "hash" changes.
 * Run validate.js first; the Pages workflow does both.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const D = require('./pressprep-data.js');

const out = path.join(__dirname, '_site');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

const read = (file, global) => D.parseBankFile(fs.readFileSync(path.join(__dirname, file), 'utf8'), global);
const questions = read('questions.js', 'QUESTION_BANK');
const scenarios = read('scenarios.js', 'SCENARIO_BANK');

const qJson = JSON.stringify(questions);
const sJson = JSON.stringify(scenarios);
fs.writeFileSync(path.join(out, 'questions.json'), qJson);
fs.writeFileSync(path.join(out, 'scenarios.json'), sJson);
fs.copyFileSync(path.join(__dirname, 'questions.js'), path.join(out, 'questions.js'));
fs.copyFileSync(path.join(__dirname, 'scenarios.js'), path.join(out, 'scenarios.js'));

const hash = crypto.createHash('sha256').update(qJson).update(sJson).digest('hex').slice(0, 16);
const version = {
  schema: 1,
  hash,
  built: new Date().toISOString(),
  questions: questions.length,
  scenarios: scenarios.length,
  files: { questions: 'questions.json', scenarios: 'scenarios.json' }
};
fs.writeFileSync(path.join(out, 'version.json'), JSON.stringify(version, null, 2));

fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>PressPrep content</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: system-ui, sans-serif; max-width: 640px; margin: 40px auto; padding: 0 20px; line-height: 1.5">
<h1>PressPrep content</h1>
<p>Practice questions and interview scenarios used by the PressPrep app. ${questions.length} questions and ${scenarios.length} scenarios, content version <code>${hash}</code>.</p>
<p>Licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. PressPrep is an independent project, not affiliated with or endorsed by the WordPress Foundation, WordPress.org or Automattic.</p>
<ul><li><a href="privacy.html">Privacy policy</a></li><li><a href="version.json">version.json</a></li><li><a href="questions.json">questions.json</a></li><li><a href="scenarios.json">scenarios.json</a></li></ul>
</body></html>`);
if (fs.existsSync(path.join(__dirname, 'privacy.html'))) fs.copyFileSync(path.join(__dirname, 'privacy.html'), path.join(out, 'privacy.html'));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Built _site/: ${questions.length} questions, ${scenarios.length} scenarios, hash ${hash}`);
