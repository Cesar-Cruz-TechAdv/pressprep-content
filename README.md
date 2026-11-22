# PressPrep content

Practice questions and "what would you do if…" interview scenarios for WordPress developers, used by the PressPrep app.
From first theme to production at scale, across five levels (Subscriber → Administrator), each with three stages.

- **Questions:** `questions.js` (450, every one linked to official documentation)
- **Scenarios:** `scenarios.js` (decision trees with five meters and sourced time notes)
- **Published files:** https://cesar-cruz-techadv.github.io/pressprep-content/version.json
- **Contact:** pressprep.ta@gmail.com

## How the app gets updates

Every push to `main` runs the validator, builds `_site/` with `build.js` and publishes it to GitHub Pages.
The app checks `version.json` on launch and downloads `questions.json` and `scenarios.json` only when `hash` changes.
It always ships with a bundled copy, so it works offline.

## Contributing

- **Not a developer?** Use the Contribute screen in the app. It opens a simple form.
- **On GitHub?** Open an issue with the question, scenario or error-report form, or send a pull request.
- Editing the files directly: see [CONTENT.md](CONTENT.md) for the format, the local editor (`editor.html`), the research rule and the review checklist.

Before opening a pull request, run:

```
node validate.js --format
node validate.js --strict
```

## Licence

Content is licensed under [CC BY-SA 4.0](LICENSE.md). PressPrep is an independent project, not affiliated with or endorsed by
the WordPress Foundation, WordPress.org or Automattic.
