# Adding PressPrep questions and scenarios

All content lives in two files in this repository:

| File | What's in it |
|---|---|
| `questions.js` | Single-answer and multi-select questions |
| `scenarios.js` | "What would you do if…" branching scenarios |

The app reads them as data. When they're published, the app picks up new content the next time it opens, without a Play Store update.

## Option 1: the editor (no coding)

1. Open `editor.html` in Chrome, Edge or Firefox. It works straight from your computer.
2. Click **Open questions.js** and/or **Open scenarios.js**.
3. Add or edit content using the forms. The panel on the left lists any problems as you type, such as a missing explanation, an answer index that doesn't exist, or a scenario step that leads nowhere.
4. When the panel says everything passes, click **Download questions.js** or **Download scenarios.js**.
5. Upload the downloaded file to the repository as a pull request. On GitHub: open the file, click the pencil icon, paste or upload, then choose "Create a new branch and start a pull request".

The editor keeps an unsaved draft in your browser, so closing the tab by accident doesn't lose your work.

## Option 2: edit the files directly

Each file starts with a comment explaining every field. Copy an existing block, change it, then run:

```
node validate.js
```

- `node validate.js --format` also rewrites both files in the standard layout, which keeps pull request diffs small.
- `node validate.js --strict` fails on warnings too.

## Question IDs

Every question has a stable `id` such as `q-0123`. The editor gives new questions the next free number. Never change, reuse or renumber an ID, even when you rewrite a question: the app uses it to remember what each player has seen and got wrong, and error reports from the app quote it. To retire a question, delete it; its ID stays unused.

## Review checklist (for the reviewer)

- [ ] The correct answer is right, checked against official documentation (developer.wordpress.org, php.net, the host's or tool's own docs).
- [ ] Wrong answers are plausible, but clearly wrong to someone who knows the topic.
- [ ] Both explanations are accurate. The plain-English one makes sense to a non-developer.
- [ ] Role level and stage fit the difficulty (Subscriber = junior … Administrator = expert).
- [ ] Scenarios: at least one good outcome, at least one bad one, and ideal paths that make sense.
- [ ] Nothing copied from the official exam guide or other copyrighted material.
- [ ] Researched: every fact checked against an official source, with at least one link in `refs` (https only).
- [ ] Scenario times (`min`) are realistic rough ranges, researched where possible. The app labels all times as rough estimates.

## Research rule for new content

Before writing a new question or scenario, look the topic up in official documentation (developer.wordpress.org, wordpress.org/documentation, learn.wordpress.org, php.net, the host's or tool's own docs) and put the page links in `refs`. For scenario times, look for realistic ranges (host documentation, incident write-ups, published runbooks). If you can't find a source, say so in the pull request rather than guessing. All 450 questions and all 8 scenarios carry `refs`. Scenarios also have `timeNotes` saying which time estimates are sourced and which are reviewer judgment.

## Running the check automatically (GitHub Actions)

Save this as `.github/workflows/content.yml`, and every pull request that touches the content will be checked:

```yaml
name: Content check
on:
  pull_request:
    paths: ['questions.js', 'scenarios.js', 'pressprep-data.js']
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node validate.js
```

## Licence

Questions and scenarios are published under Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0): https://creativecommons.org/licenses/by-sa/4.0/. By contributing, you agree your submission is your own work and can be published under that licence. The app code can use a different licence.

## Files

| File | Purpose |
|---|---|
| `pressprep-data.js` | Shared rules: the sections, roles and meters, plus validation and file formatting. Used by both the editor and the command-line check. |
| `validate.js` | Command-line check for CI and local use. |
| `editor.html` | The form-based editor. |
