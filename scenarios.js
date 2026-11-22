/*
 * SCENARIO BANK – PressPrep "what would you do if…" questions
 * -----------------------------------------------------------
 * A scenario is a small decision tree. The player starts at `start`, picks options,
 * and ends at an outcome. Every option moves five meters.
 *
 * METERS (each option nudges them by -2 … +2)
 *   speed          how fast the problem is resolved for visitors and the client
 *   security       closes holes, protects credentials and data
 *   stability      avoids downtime, broken features and risky changes on production
 *   rootCause      finds and fixes the real cause, not just the symptom
 *   communication  keeps the client and team informed, documents what happened
 *
 * SCENARIO FIELDS
 *   id, title, s (exam section), level (role), stage (1-3), d (difficulty 1-3)
 *   priorities  weight 1-3 per meter for this scenario (used for the overall score)
 *   intro       the situation shown before step 1
 *   timeNotes   where the time estimates come from (sourced vs judgment)
 *   refs        https links backing the scenario and its times
 *   start       id of the first step
 *   steps       map of step id → step
 *   outcomes    map of outcome id → outcome
 *   ideal       named ideal paths, as lists of "stepId:optionIndex" (multi steps: "stepId:all")
 *
 * STEP FIELDS
 *   type: "single"  → each option has `next` (a step id, or "o:<outcomeId>")
 *   type: "multi"   → "select all that apply"; options have `good` (true/false) and
 *                     optional `critical`. The step has one `next` and a `missPenalty`
 *                     (meter deltas applied once per missed critical option).
 *   Every option: text, m (meter deltas), min (minutes or [from, to], single steps), t, p
 *                 (technical and plain-English feedback).
 *
 * TIME ESTIMATES (min)
 *   Times are rough, comparative estimates, not measurements. The app always shows
 *   the notice "Times are rough estimates for comparison; real times vary by site,
 *   host and experience." When adding or editing a scenario, research realistic
 *   ranges (official docs, host docs, incident write-ups), put the links in the
 *   scenario's refs, and say in timeNotes which times are sourced and which are
 *   reviewer judgment. min can be one number or a range: [15, 60].
 *
 * OUTCOME FIELDS
 *   title, verdict ("good" | "ok" | "mixed" | "bad"), summary, t, p
 *
 * MIXED RESULTS
 *   Final meters are normalised to 0-100. The app shows a profile from the two highest
 *   meters (e.g. speed + stability = "Firefighter", security + rootCause = "Investigator",
 *   communication + any = "Lead", all ≥ 70 = "Senior engineer", speed high + security
 *   low = "Gambler") and the overall score = meters weighted by `priorities`,
 *   capped by the outcome verdict (bad ≤ 40, mixed ≤ 70, ok ≤ 85).
 */
window.SCENARIO_BANK = [
  {
    id: "reinfected-after-cleanup",
    title: "Hacked again, three days after cleanup",
    s: "Security",
    level: "Author",
    stage: 2,
    d: 3,
    priorities: { speed: 1, security: 3, stability: 1, rootCause: 3, communication: 2 },
    intro: "Three days ago you cleaned malware off a client's site. Today the client says mobile visitors are being redirected to a spam site again.",
    timeNotes: "Restore times follow host documentation (a restore takes a few minutes to a few hours depending on site size). The full fix (remove the backdoor, patch, rotate, clean) follows professional cleanup guides: most infections take under 3 hours, and about 6 hours per site is a common planning figure. Other times are reviewer judgment.",
    refs: [
      "https://pressable.com/knowledgebase/restore-a-site-in-pressable-using-the-automated-restore-tool/",
      "https://www.sitelock.com/help-center/how-long-will-it-take-to-clean-my-website/",
      "https://www.sitelock.com/help-center/malware-clean-timeline-expectations/",
      "https://developer.wordpress.org/advanced-administration/security/hardening/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Restore last week's backup and tell the client it's fixed",
            next: "o:reinfected",
            min: [15, 120],
            m: { speed: 2, security: -2, stability: 1, rootCause: -2, communication: -1 },
            t: "A backup restores files and data, but not the way in. If the entry point is still open, the site gets reinfected. The backup may even predate the cleanup and contain the infection.",
            p: "Rewinding the clock doesn't fix the broken lock, so the burglar walks back in."
          },
          {
            text: "Turn on maintenance mode, take a copy of files and database for investigation, and tell the client you're on it",
            next: "s2",
            min: [15, 45],
            m: { speed: -1, security: 1, stability: -1, rootCause: 2, communication: 2 },
            t: "Containment first: visitors stop seeing the redirect, and the copy preserves evidence (modified files, rogue users, injected options) before anything is changed.",
            p: "Close the shop door, take photos of the mess, and let the owner know before you start cleaning."
          },
          {
            text: "Run a security plugin scan and delete everything it flags",
            next: "s2b",
            min: [20, 60],
            m: { speed: 1, security: 0, stability: -1, rootCause: -1, communication: 0 },
            t: "Scanners catch known signatures but miss custom backdoors, rogue admins and database injections, and blind deletion can remove legitimate files.",
            p: "A metal detector finds some things, but not everything, and you might throw away something you needed."
          }
        ]
      },
      s2b: {
        type: "single",
        prompt: "The scan removed 14 files and the redirect has stopped. Now what?",
        options: [
          {
            text: "Close the ticket",
            next: "o:reinfected",
            min: [1, 5],
            m: { speed: 2, security: -1, stability: 0, rootCause: -2, communication: 0 },
            t: "The symptom is gone but nothing explains how the attacker got back in, so the same hole is still there.",
            p: "The smoke cleared, but nobody found the fire."
          },
          {
            text: "Go back and find how they got in",
            next: "s2",
            min: [5, 10],
            m: { speed: -1, security: 1, stability: 0, rootCause: 2, communication: 1 },
            t: "Good recovery: a reinfection means the entry point or a backdoor survived the first cleanup.",
            p: "If it happened twice, something let them back in. Find it."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "Which of these do you check to find how they got back in?",
        next: "s3",
        missPenalty: { security: -1, rootCause: -2 },
        options: [
          {
            text: "Administrator accounts and application passwords created recently",
            good: true,
            critical: true,
            m: { security: 1, rootCause: 1 },
            t: "Attackers often leave a hidden admin or an application password so they can log back in after a cleanup.",
            p: "Check for spare keys someone cut for themselves."
          },
          {
            text: "The mu-plugins folder and drop-ins like object-cache.php",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "Must-use plugins and drop-ins load automatically and don't appear in the normal plugins list, which makes them a favourite hiding place.",
            p: "Look in the cupboard that most people forget exists."
          },
          {
            text: "Files changed since the cleanup, checked with wp core verify-checksums and wp plugin verify-checksums",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "Checksums compare core and WordPress.org plugin files with the official versions, so injected code stands out.",
            p: "Compare every page with the original printout to spot what was changed."
          },
          {
            text: "Installed plugin and theme versions against known vulnerabilities",
            good: true,
            critical: true,
            m: { security: 2, rootCause: 1 },
            t: "An outdated plugin with a known vulnerability is the most common way in. Finding it tells you what to patch.",
            p: "Find the window with the broken latch."
          },
          {
            text: "wp_options for injected scripts or strange autoloaded values",
            good: true,
            m: { rootCause: 1 },
            t: "Malware often stores payloads in options (widgets, theme mods, custom options) that load on every request.",
            p: "Some of the mess hides in the settings, not the files."
          },
          {
            text: "The theme's colour settings",
            good: false,
            m: { speed: -1 },
            t: "Cosmetic settings don't help find the entry point.",
            p: "Repainting the walls won't show you how they got in."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "You find an outdated form plugin with a known file-upload vulnerability, and a hidden administrator account. How do you fix it?",
        options: [
          {
            text: "Remove the hidden admin, update or replace the plugin, rotate salts and every password (WordPress, application passwords, SFTP, database), then clean the files",
            next: "s4",
            min: [60, 360],
            m: { speed: -1, security: 2, stability: 0, rootCause: 2, communication: 0 },
            t: "Closes the entry point and invalidates everything the attacker may have stolen. New salts log every session out.",
            p: "Fix the lock, change every key, and only then tidy up."
          },
          {
            text: "Clean the files now and update the plugin in next week's maintenance window",
            next: "o:reinfected",
            min: [30, 60],
            m: { speed: 1, security: -2, stability: 1, rootCause: -1, communication: 0 },
            t: "The vulnerable plugin stays exploitable for a week, which is plenty of time to get back in.",
            p: "You know the window is broken and you leave it open for a week."
          },
          {
            text: "Delete the hidden admin account only",
            next: "o:door-open",
            min: [5, 10],
            m: { speed: 1, security: -1, stability: 0, rootCause: -1, communication: 0 },
            t: "Removes one way back in, but the vulnerable plugin can be used to create a new admin at any time.",
            p: "You took back one spare key, but the lock is still broken."
          }
        ]
      },
      s4: {
        type: "single",
        prompt: "Everything is patched and cleaned. Before taking the site out of maintenance mode:",
        options: [
          {
            text: "Verify checksums again, test as a mobile visitor in a private window, set up file-change monitoring, and send the client a short incident report",
            next: "o:secure",
            min: [30, 60],
            m: { speed: -1, security: 1, stability: 1, rootCause: 1, communication: 2 },
            t: "Many redirect injections only fire for mobile user agents or logged-out visitors, so test as one. Monitoring catches a repeat early, and the report builds trust.",
            p: "Double-check like a stranger would see it, set an alarm, and tell the owner what happened."
          },
          {
            text: "Take it out of maintenance mode straight away",
            next: "o:unverified",
            min: [1, 2],
            m: { speed: 1, security: 0, stability: 0, rootCause: 0, communication: -1 },
            t: "Probably fixed, but unverified. Redirects that only target mobile or logged-out users can still be active.",
            p: "You think it's fixed, but you never looked from the visitor's side."
          }
        ]
      }
    },
    outcomes: {
      reinfected: {
        title: "Reinfected within days",
        verdict: "bad",
        summary: "The entry point was never closed, so the attacker came straight back.",
        t: "Reinfection almost always means a surviving backdoor or an unpatched vulnerability. Restoring or scanning treats the symptom only.",
        p: "Same burglar, same open window."
      },
      "door-open": {
        title: "Back online, but the door's still open",
        verdict: "mixed",
        summary: "You removed the attacker's account, but the vulnerability that let them in is still there.",
        t: "Without patching the plugin, an attacker can create a new account through the same upload flaw.",
        p: "They lost their key, but they can still climb in."
      },
      unverified: {
        title: "Fixed, but unverified",
        verdict: "ok",
        summary: "The cause is fixed, but nobody checked the site the way visitors see it.",
        t: "Verification and monitoring are what turn 'probably fixed' into 'fixed'.",
        p: "Good repair, no final inspection."
      },
      secure: {
        title: "Closed, verified and documented",
        verdict: "good",
        summary: "Entry point patched, credentials rotated, checked as a visitor, monitored, and the client informed.",
        t: "This is a complete incident response: contain, investigate, eradicate, recover, and report.",
        p: "Fixed properly, checked properly, and everyone knows what happened."
      }
    },
    ideal: {
      mostSecure: ["s1:1", "s2:all", "s3:0", "s4:0"],
      fastestSafe: ["s1:2", "s2b:1", "s2:all", "s3:0", "s4:1"]
    }
  },

  {
    id: "slow-after-plugin-updates",
    title: "Slow site after this morning's updates",
    s: "Performance",
    level: "Author",
    stage: 1,
    d: 3,
    priorities: { speed: 2, security: 1, stability: 3, rootCause: 2, communication: 1 },
    intro: "You updated 12 plugins on a busy news site this morning. Since then, uncached pages take around 4 seconds to start loading instead of under half a second, and editors are complaining.",
    timeNotes: "Reviewer judgment for a typical small to mid-size site; no published benchmark found. Re-applying updates one at a time scales with the number of plugins.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Roll back all 12 plugins at once",
            next: "s2r",
            min: [20, 60],
            m: { speed: 2, security: -1, stability: 2, rootCause: -1, communication: 0 },
            t: "Fast relief, but you've also undone any security fixes in those updates, and you still don't know which plugin caused it.",
            p: "Undo everything to make the pain stop, including the good changes."
          },
          {
            text: "Profile a slow request with Query Monitor or your APM to see where the time goes",
            next: "s2",
            min: [15, 30],
            m: { speed: 0, security: 0, stability: 0, rootCause: 2, communication: 0 },
            t: "Measuring first tells you whether the time is spent in database queries, remote HTTP calls, or PHP, and which component is responsible.",
            p: "Find out what's slow before you start changing things."
          },
          {
            text: "Add more PHP workers or upgrade the hosting plan",
            next: "o:paying-for-it",
            min: [30, 120],
            m: { speed: 1, security: 0, stability: 1, rootCause: -2, communication: -1 },
            t: "More capacity can hide a slow request, but each page is still slow, and the cost goes up.",
            p: "Buying a bigger engine because the handbrake is on."
          }
        ]
      },
      s2r: {
        type: "single",
        prompt: "The site is fast again, but three of the rolled-back updates contained security fixes. Now what?",
        options: [
          {
            text: "On staging, re-apply the updates one at a time until you find the culprit",
            next: "s2",
            min: [30, 90],
            m: { speed: -1, security: 1, stability: 1, rootCause: 2, communication: 0 },
            t: "Bisecting on staging isolates the problem without risking production, and gets the security fixes back.",
            p: "Test the changes one by one in a safe copy until you find the bad one."
          },
          {
            text: "Leave everything rolled back until next month's maintenance",
            next: "o:fast-but-exposed",
            min: [1, 2],
            m: { speed: 1, security: -2, stability: 0, rootCause: -2, communication: 0 },
            t: "Known vulnerabilities stay unpatched for a month on a busy site.",
            p: "Fast again, but with the doors unlocked."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "Which signals do you look at?",
        next: "s3",
        missPenalty: { rootCause: -2 },
        options: [
          {
            text: "Slow or duplicated database queries, grouped by plugin",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "A new query without an index, or one running on every page, is a classic regression after an update.",
            p: "See which add-on is making the database work hardest."
          },
          {
            text: "Outbound HTTP calls made during the page load and how long they take",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "A remote call to a slow or unreachable API blocks the whole page until it times out.",
            p: "Check whether the site is waiting on someone else's server."
          },
          {
            text: "Object cache hit rate, and whether the cache was flushed by the update",
            good: true,
            m: { rootCause: 1 },
            t: "A flushed or bypassed cache makes everything slower until it warms up again.",
            p: "Check whether the site's short-term memory was wiped."
          },
          {
            text: "Size of autoloaded options after the update",
            good: true,
            m: { rootCause: 1 },
            t: "An update that adds large autoloaded options slows every single request.",
            p: "Check whether something is now carried around on every page."
          },
          {
            text: "The admin colour scheme",
            good: false,
            m: { speed: -1 },
            t: "Not related to performance.",
            p: "Doesn't affect speed."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "You find that one updated plugin now calls a licence-check API on every page load, and that API is timing out after 3 seconds. What do you do?",
        options: [
          {
            text: "Roll back just that plugin, tell the editors, and report it to the vendor",
            next: "s4",
            min: [15, 30],
            m: { speed: 1, security: 0, stability: 2, rootCause: 1, communication: 2 },
            t: "A targeted rollback fixes the symptom without losing the other updates, and the vendor report gets it fixed upstream.",
            p: "Undo only the bad change and tell the people who need to know."
          },
          {
            text: "Add a small mu-plugin that caches the licence response with pre_http_request, and report it to the vendor",
            next: "s4",
            min: [30, 60],
            m: { speed: 1, security: 0, stability: 1, rootCause: 2, communication: 1 },
            t: "Short-circuiting or caching that specific request keeps the update while removing the per-page call. Version-control the mu-plugin so it isn't lost.",
            p: "Keep the new version, but stop it phoning home on every page."
          },
          {
            text: "Edit the plugin's code on production to delete the call",
            next: "o:until-next-update",
            min: [10, 20],
            m: { speed: 2, security: -1, stability: -1, rootCause: 0, communication: -1 },
            t: "The next plugin update overwrites your edit, and editing code on production is untracked and risky.",
            p: "A quick patch that disappears the next time the plugin updates."
          }
        ]
      },
      s4: {
        type: "single",
        prompt: "The site is fast again. Anything else?",
        options: [
          {
            text: "Add an alert for slow responses and test plugin updates on staging before production",
            next: "o:solid",
            min: [30, 60],
            m: { speed: 0, security: 0, stability: 1, rootCause: 1, communication: 1 },
            t: "Prevents the same incident: regressions get caught on staging, and alerts catch anything that slips through.",
            p: "Fix it, then make sure it can't sneak up on you again."
          },
          {
            text: "Move on to the next ticket",
            next: "o:fixed-fragile",
            min: 0,
            m: { speed: 1, security: 0, stability: 0, rootCause: 0, communication: 0 },
            t: "Fixed for now, but the update process that caused it hasn't changed.",
            p: "Solved today, same risk next month."
          }
        ]
      }
    },
    outcomes: {
      "paying-for-it": {
        title: "Faster for now, and paying for it",
        verdict: "mixed",
        summary: "More servers hid the problem, but every page is still slow underneath.",
        t: "Capacity hides latency for a while. The slow remote call is still there.",
        p: "A bigger bill instead of a fix."
      },
      "fast-but-exposed": {
        title: "Fast, but exposed",
        verdict: "bad",
        summary: "Speed is back, but known security fixes are switched off for a month.",
        t: "Rolling back security updates on a high-traffic site is a serious risk.",
        p: "Quick, but unsafe."
      },
      "until-next-update": {
        title: "Fixed until the next update",
        verdict: "mixed",
        summary: "Your edit works today and will be overwritten the next time the plugin updates.",
        t: "Never edit third-party code in place. Use hooks or an mu-plugin under version control.",
        p: "A plaster that falls off on the next update."
      },
      "fixed-fragile": {
        title: "Fixed, but it could happen again",
        verdict: "ok",
        summary: "Cause found and fixed, but nothing changed in how updates are tested.",
        t: "Good diagnosis. Process improvements are what stop the next one.",
        p: "Good fix, no lesson learned."
      },
      solid: {
        title: "Fixed and prevented",
        verdict: "good",
        summary: "Measured, isolated the culprit, fixed it in a maintainable way, and improved the process.",
        t: "Diagnose, fix narrowly, communicate, then prevent.",
        p: "Fixed properly, and the next one gets caught early."
      }
    },
    ideal: {
      mostSecure: ["s1:1", "s2:all", "s3:1", "s4:0"],
      fastestSafe: ["s1:1", "s2:all", "s3:0", "s4:0"]
    }
  },

  {
    id: "critical-error-after-deploy",
    title: "Critical error right after a deploy",
    s: "Change Management",
    level: "Contributor",
    stage: 3,
    d: 2,
    priorities: { speed: 3, security: 1, stability: 3, rootCause: 2, communication: 2 },
    intro: "You deployed a release at 17:00. Five minutes later the client calls: the site shows \"There has been a critical error on this website.\"",
    timeNotes: "Reviewer judgment, assuming a deploy pipeline that can roll back to the previous release. Real times depend on the pipeline and host.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Roll back to the previous release",
            next: "s2",
            min: [2, 10],
            m: { speed: 2, security: 0, stability: 2, rootCause: 0, communication: 0 },
            t: "With atomic deploys, switching back to the previous release takes seconds and restores the site while you investigate.",
            p: "Put the old version back up so visitors are fine, then figure it out."
          },
          {
            text: "Check the PHP error log for the fatal error message",
            next: "s1c",
            min: [5, 10],
            m: { speed: 1, security: 0, stability: 0, rootCause: 2, communication: 0 },
            t: "The log usually names the exact file, line and missing function, which tells you whether a rollback or a one-line fix is right.",
            p: "Read the error message before you choose a fix."
          },
          {
            text: "Turn on WP_DEBUG_DISPLAY on production to see the error on screen",
            next: "s1b",
            min: [2, 5],
            m: { speed: -1, security: -2, stability: -1, rootCause: 1, communication: -1 },
            t: "Showing errors leaks file paths and internals to every visitor, and the site stays down while you debug.",
            p: "You'd be shouting your debugging notes at every visitor."
          }
        ]
      },
      s1b: {
        type: "single",
        prompt: "The error is now visible to every visitor. What next?",
        options: [
          {
            text: "Turn error display off and roll back",
            next: "s2",
            min: [2, 10],
            m: { speed: 1, security: 1, stability: 1, rootCause: 0, communication: 0 },
            t: "Good recovery: stop the leak, restore service, and debug somewhere safe.",
            p: "Stop shouting and put the old version back."
          },
          {
            text: "Keep debugging live until it's fixed",
            next: "o:exposed",
            min: [30, 120],
            m: { speed: -2, security: -2, stability: -1, rootCause: 1, communication: -2 },
            t: "Prolonged downtime with internals exposed, and no communication.",
            p: "Down for longer, and showing everyone the mess."
          }
        ]
      },
      s1c: {
        type: "single",
        prompt: "The log says: \"PHP Fatal error: Uncaught Error: Call to undefined function acme_get_field() in themes/acme/functions.php\". What now?",
        options: [
          {
            text: "Roll back now, then fix it on staging",
            next: "s2",
            min: [5, 15],
            m: { speed: 2, security: 0, stability: 2, rootCause: 1, communication: 0 },
            t: "You know the cause (a function from a plugin that isn't active, or not deployed), and you restore service before fixing it properly.",
            p: "Know what broke, put the old version back, and fix it safely."
          },
          {
            text: "Hotfix it live over SFTP with a function_exists() check",
            next: "o:drift",
            min: [10, 30],
            m: { speed: 2, security: 0, stability: 1, rootCause: -1, communication: -1 },
            t: "The site comes back, but production no longer matches Git, and the missing dependency is hidden rather than fixed.",
            p: "A quick patch only the server knows about."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The previous release is live again. What do you do now?",
        next: "s3",
        missPenalty: { stability: -1, rootCause: -1, communication: -1 },
        options: [
          {
            text: "Tell the client the site is back and you're investigating",
            good: true,
            critical: true,
            m: { communication: 2 },
            t: "A short status update stops panic and repeat calls.",
            p: "Let them know it's fixed before they call again."
          },
          {
            text: "Reproduce the error on staging with the same release",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "Reproducing it proves the cause and lets you test the fix.",
            p: "Break it again somewhere safe, so you can fix it for sure."
          },
          {
            text: "Check whether database migrations ran and need reversing",
            good: true,
            critical: true,
            m: { stability: 2, rootCause: 1 },
            t: "Rolling back code doesn't roll back schema or data changes. Old code on a new schema can break subtly.",
            p: "Putting the old version back doesn't undo changes to the data."
          },
          {
            text: "Add a smoke test to the deploy pipeline that loads the home page",
            good: true,
            m: { stability: 1, rootCause: 1 },
            t: "A simple post-deploy check would have caught this before the client did.",
            p: "Make the pipeline check the site actually loads."
          },
          {
            text: "Delete the failed release from the server right away",
            good: false,
            m: { rootCause: -1 },
            t: "You lose the exact build you need to reproduce and inspect.",
            p: "Throwing away the evidence."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "The fix is ready. How do you redeploy?",
        options: [
          {
            text: "Through the pipeline after testing on staging, at a quiet time, with rollback ready",
            next: "o:clean",
            min: [20, 60],
            m: { speed: -1, security: 0, stability: 2, rootCause: 1, communication: 1 },
            t: "Tested, tracked, low-risk, and reversible.",
            p: "Careful, tested, and easy to undo."
          },
          {
            text: "Straight away, at 17:30, without testing",
            next: "o:second-outage",
            min: [5, 10],
            m: { speed: 1, security: 0, stability: -2, rootCause: -1, communication: -1 },
            t: "An untested fix at peak time risks a second outage.",
            p: "Rushing the fix could break it again."
          }
        ]
      }
    },
    outcomes: {
      exposed: {
        title: "Long outage, internals exposed",
        verdict: "bad",
        summary: "The site stayed down while errors showed to every visitor.",
        t: "Restore first, debug on staging, and never display errors on production.",
        p: "Down for too long, and showing the mess."
      },
      drift: {
        title: "Back up, but production doesn't match Git",
        verdict: "mixed",
        summary: "The hotfix worked, but the server now has code nobody can see in the repository.",
        t: "Untracked hotfixes get overwritten by the next deploy and hide the missing dependency.",
        p: "Fixed in a way only the server knows about."
      },
      "second-outage": {
        title: "Risk of a second outage",
        verdict: "mixed",
        summary: "Good recovery, but the untested redeploy put the site at risk again.",
        t: "Every production change should go through the same tested path.",
        p: "Good save, rushed finish."
      },
      clean: {
        title: "Restored fast, fixed properly",
        verdict: "good",
        summary: "Rolled back in minutes, kept the client informed, found the cause, and redeployed safely.",
        t: "Roll back, communicate, reproduce, fix, and redeploy through the pipeline.",
        p: "Quick to recover and careful to fix."
      }
    },
    ideal: {
      fastestSafe: ["s1:0", "s2:all", "s3:0"],
      mostSecure: ["s1:1", "s1c:0", "s2:all", "s3:0"]
    }
  },

  {
    id: "critical-error-after-plugin-install",
    title: "Critical error after installing a plugin",
    s: "Debugging",
    level: "Subscriber",
    stage: 1,
    d: 1,
    priorities: { speed: 3, security: 1, stability: 2, rootCause: 1, communication: 1 },
    intro: "You installed and activated a plugin a client asked for. Now both the site and wp-admin show \"There has been a critical error on this website.\"",
    timeNotes: "Recovery mode depends on the email reaching the admin address, so allow for delivery time. Renaming the plugin folder is the documented fallback. Other times are reviewer judgment.",
    refs: [
      "https://wordpress.org/documentation/article/recovery-mode/",
      "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What do you try first?",
        options: [
          {
            text: "Use the recovery mode link WordPress emailed to the site's admin address, and deactivate the plugin",
            next: "s2",
            min: [5, 15],
            m: { speed: 2, security: 0, stability: 1, rootCause: 1, communication: 0 },
            t: "Since WordPress 5.2, a fatal error triggers an email to the admin address with a recovery mode link. It lets you log in with the broken plugin paused and deactivate it.",
            p: "WordPress sends you a spare key for exactly this situation."
          },
          {
            text: "Rename the plugin's folder in wp-content/plugins using SFTP or the host's file manager",
            next: "s2",
            min: [5, 15],
            m: { speed: 2, security: 0, stability: 1, rootCause: 0, communication: 0 },
            t: "WordPress can't find a renamed plugin folder, so it deactivates the plugin and the site loads again.",
            p: "Hide the broken plugin from WordPress, and the site comes back."
          },
          {
            text: "Reinstall WordPress from scratch",
            next: "o:overkill",
            min: [60, 240],
            m: { speed: -2, security: 0, stability: -1, rootCause: -1, communication: 0 },
            t: "Reinstalling core doesn't touch plugins, so the fatal error stays, and you risk losing customisations.",
            p: "Rebuilding the house because one light switch is broken."
          }
        ]
      },
      s2: {
        type: "single",
        prompt: "The site is back. What next?",
        options: [
          {
            text: "Check the error log for the exact error, note which plugin it was, and tell the client you'll test it on staging or find an alternative",
            next: "o:good",
            min: [10, 20],
            m: { speed: 0, security: 0, stability: 1, rootCause: 2, communication: 2 },
            t: "The log tells you why it failed (often a PHP version mismatch or a conflict), so you can fix it properly.",
            p: "Find out why it broke, and keep the client in the loop."
          },
          {
            text: "Activate the plugin again to see if it was a one-off",
            next: "o:down-again",
            min: [1, 2],
            m: { speed: -1, security: 0, stability: -2, rootCause: 0, communication: 0 },
            t: "A fatal error is almost never random. Reactivating it on production takes the site down again.",
            p: "Touching the hot stove again to check it's still hot."
          },
          {
            text: "Leave the renamed folder there and move on",
            next: "o:loose-ends",
            min: 0,
            m: { speed: 1, security: 0, stability: 0, rootCause: -1, communication: -1 },
            t: "The site works, but a broken plugin sits on the server and the client still thinks the feature is coming.",
            p: "Fixed, but you left the mess and didn't tell anyone."
          }
        ]
      }
    },
    outcomes: {
      overkill: {
        title: "Hours spent on a five-minute fix",
        verdict: "bad",
        summary: "The reinstall didn't help, because the problem was the plugin.",
        t: "Deactivate the plugin that triggered the error before touching core.",
        p: "Big effort, wrong target."
      },
      "down-again": {
        title: "Down again",
        verdict: "bad",
        summary: "Reactivating the plugin brought the critical error straight back.",
        t: "Reproduce problems on staging, never by repeating them on production.",
        p: "Same mistake, twice."
      },
      "loose-ends": {
        title: "Fixed, with loose ends",
        verdict: "ok",
        summary: "The site works, but nobody knows why the plugin failed and the client wasn't told.",
        t: "Remove the broken plugin, find the cause in the log, and update the client.",
        p: "Good fix, unfinished job."
      },
      good: {
        title: "Fixed in minutes, cause found",
        verdict: "good",
        summary: "You got the site back quickly, found out why, and kept the client informed.",
        t: "Deactivate, read the log, test on staging, and communicate.",
        p: "Quick, careful and clear."
      }
    },
    ideal: {
      fastestSafe: ["s1:1", "s2:0"],
      mostSecure: ["s1:0", "s2:0"]
    }
  },

  {
    id: "404s-after-moving-site",
    title: "Every page shows 404 after a move",
    s: "WordPress Core",
    level: "Subscriber",
    stage: 3,
    d: 1,
    priorities: { speed: 2, security: 1, stability: 3, rootCause: 2, communication: 1 },
    intro: "You moved a client's site to a new server. The home page loads, but every other page and post returns \"404 Not Found\".",
    timeNotes: "Reviewer judgment. Re-importing the database scales with its size.",
    refs: [
      "https://wordpress.org/documentation/article/customize-permalinks/",
      "https://developer.wordpress.org/advanced-administration/upgrade/migrating/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What do you check first?",
        options: [
          {
            text: "The rewrite rules: save Settings → Permalinks, and check that .htaccess (Apache) or the server's rewrite rules (Nginx) came across",
            next: "s2",
            min: [5, 15],
            m: { speed: 2, security: 0, stability: 1, rootCause: 2, communication: 0 },
            t: "Pretty permalinks need server rewrites. A missing .htaccess or Nginx rule means only the home page works. Saving permalinks regenerates WordPress's rules and, on Apache, tries to rewrite .htaccess.",
            p: "The site's signposts didn't make the move. Put them back up."
          },
          {
            text: "Import the database again from the old server",
            next: "o:still-404",
            min: [30, 120],
            m: { speed: -2, security: 0, stability: 0, rootCause: -1, communication: 0 },
            t: "The content is fine. The 404s come from URL rewriting on the server, which the database doesn't control.",
            p: "Moving the same boxes again won't fix the missing signposts."
          },
          {
            text: "Switch permalinks to \"Plain\" for good, so links work",
            next: "o:broken-links",
            min: [1, 5],
            m: { speed: 1, security: 0, stability: -2, rootCause: -1, communication: 0 },
            t: "Plain permalinks (?p=123) work without rewrites, but every existing link, bookmark and search result now points to a 404.",
            p: "Changing every address in town so the post still arrives."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "Pages load again. What else do you check after a move?",
        next: "o:moved",
        missPenalty: { stability: -1 },
        options: [
          {
            text: "siteurl and home point to the new domain and protocol",
            good: true,
            critical: true,
            m: { stability: 1 },
            t: "Wrong values cause redirects to the old server or login loops.",
            p: "Make sure the site knows its new address."
          },
          {
            text: "Old-domain links in content, replaced with wp search-replace rather than a raw SQL replace",
            good: true,
            critical: true,
            m: { stability: 1, rootCause: 1 },
            t: "wp search-replace handles serialized data. A raw replace can corrupt it.",
            p: "Update old addresses safely, without breaking stored settings."
          },
          {
            text: "The uploads folder came across and images load",
            good: true,
            m: { stability: 1 },
            t: "Media files live outside the database and are easy to forget.",
            p: "Check the pictures came with the furniture."
          },
          {
            text: "Scheduled tasks (cron) run on the new server",
            good: true,
            m: { stability: 1 },
            t: "If WP-Cron is replaced by a system cron, that cron job has to be set up again.",
            p: "Check the site's alarm clock still works."
          },
          {
            text: "Delete the old server straight away",
            good: false,
            m: { stability: -2 },
            t: "Keep the old server for a while as a fallback and for anything you missed.",
            p: "Don't burn the old house until you've checked the new one."
          }
        ]
      }
    },
    outcomes: {
      "still-404": {
        title: "Still 404, an hour later",
        verdict: "bad",
        summary: "Re-importing the database didn't touch the real problem.",
        t: "404s on everything except the home page point to rewrites, not content.",
        p: "Right effort, wrong place."
      },
      "broken-links": {
        title: "Works, but every old link is broken",
        verdict: "mixed",
        summary: "Pages load with plain permalinks, but existing links and search rankings point to 404s.",
        t: "Fix the rewrite rules instead of changing the URL structure.",
        p: "The shop opened, but every map shows the wrong address."
      },
      moved: {
        title: "Moved cleanly",
        verdict: "good",
        summary: "Rewrites fixed, settings and links updated safely, and the essentials checked.",
        t: "A complete post-migration checklist prevents slow-burning problems.",
        p: "Moved in, and everything's where it should be."
      }
    },
    ideal: {
      fastestSafe: ["s1:0", "s2:all"],
      mostSecure: ["s1:0", "s2:all"]
    }
  },

  {
    id: "padlock-missing-after-https",
    title: "No padlock after switching to HTTPS",
    s: "Security",
    level: "Contributor",
    stage: 2,
    d: 2,
    priorities: { speed: 1, security: 2, stability: 2, rootCause: 3, communication: 1 },
    intro: "The client's site now has an SSL certificate and loads over https://, but browsers show \"Not secure\" or no padlock on many pages.",
    timeNotes: "Reviewer judgment. A certificate reissue depends on the host's queue and validation, so it varies widely.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/https/"],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Open the browser's developer tools on an affected page and look for mixed content warnings in the Console",
            next: "s2",
            min: [5, 15],
            m: { speed: 1, security: 0, stability: 0, rootCause: 2, communication: 0 },
            t: "A valid certificate plus a missing padlock usually means mixed content: images, scripts or fonts still loaded over http://.",
            p: "Find out which bits of the page are still coming in the insecure way."
          },
          {
            text: "Install a plugin that rewrites http:// to https:// on every page load",
            next: "o:band-aid",
            min: [5, 15],
            m: { speed: 2, security: 1, stability: -1, rootCause: -1, communication: 0 },
            t: "It hides the problem by rewriting output on every request, adds overhead, and leaves the old URLs in the database.",
            p: "Painting over the crack instead of fixing it."
          },
          {
            text: "Ask the host to reissue the SSL certificate",
            next: "o:wrong-tree",
            min: [30, 240],
            m: { speed: -2, security: 0, stability: 0, rootCause: -1, communication: 0 },
            t: "The certificate works, since the site loads over HTTPS. The problem is insecure resources on the page.",
            p: "The lock is fine. It's the open windows."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The Console shows http:// images, a script set in a theme option, and a web font. Which fixes do you apply?",
        next: "s3",
        missPenalty: { rootCause: -2 },
        options: [
          {
            text: "Run wp search-replace from http:// to https:// for the domain, with --dry-run first and a backup",
            good: true,
            critical: true,
            m: { stability: 1, rootCause: 2 },
            t: "Updates URLs in content and settings, including serialized data, safely.",
            p: "Update every old address safely in one go."
          },
          {
            text: "Set siteurl and home to https://",
            good: true,
            critical: true,
            m: { rootCause: 1 },
            t: "WordPress builds many URLs from these settings.",
            p: "Tell WordPress its address starts with https."
          },
          {
            text: "Fix hard-coded http:// URLs in the theme and its options",
            good: true,
            critical: true,
            m: { rootCause: 1 },
            t: "Hard-coded URLs in theme files or options aren't always caught by a search-replace of the domain.",
            p: "Some addresses are written into the theme itself."
          },
          {
            text: "Add a 301 redirect from http to https on the server",
            good: true,
            m: { security: 1, stability: 1 },
            t: "Sends old links and bookmarks to the secure version.",
            p: "Anyone using the old address gets sent to the new one."
          },
          {
            text: "Find and replace in the SQL dump with a text editor",
            good: false,
            m: { stability: -2 },
            t: "Changing string lengths corrupts serialized data.",
            p: "This can quietly break stored settings."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "The padlock is back. One last step:",
        options: [
          {
            text: "Recheck key pages in a private window, then consider HSTS once everything, subdomains included, is HTTPS-only",
            next: "o:secure",
            min: [10, 30],
            m: { speed: 0, security: 2, stability: 1, rootCause: 0, communication: 0 },
            t: "HSTS tells browsers to always use HTTPS. Enable it only when you're sure every page and subdomain works over HTTPS.",
            p: "Double-check, then lock the door for good."
          },
          {
            text: "Turn on HSTS with preload straight away",
            next: "o:hsts-risk",
            min: [2, 5],
            m: { speed: 1, security: 1, stability: -2, rootCause: 0, communication: 0 },
            t: "Preload is very hard to undo. Any subdomain that isn't ready for HTTPS becomes unreachable in browsers.",
            p: "Welding the door shut before checking every room."
          }
        ]
      }
    },
    outcomes: {
      "band-aid": {
        title: "Padlock back, problem hidden",
        verdict: "mixed",
        summary: "The plugin hides the old URLs on every page load instead of fixing them.",
        t: "Fix the stored URLs so no runtime rewriting is needed.",
        p: "It looks fixed, but it isn't."
      },
      "wrong-tree": {
        title: "The certificate was never the problem",
        verdict: "bad",
        summary: "An hour waiting on the host, and the padlock is still missing.",
        t: "Check the Console for mixed content before blaming the certificate.",
        p: "Fixing the wrong thing."
      },
      "hsts-risk": {
        title: "Locked in before you were ready",
        verdict: "mixed",
        summary: "Mixed content is fixed, but HSTS preload went live before every subdomain was checked.",
        t: "Roll out HSTS gradually, with a short max-age first.",
        p: "Right idea, too soon."
      },
      secure: {
        title: "Fully on HTTPS",
        verdict: "good",
        summary: "Found the mixed content, fixed it at the source, redirected HTTP, and checked before hardening.",
        t: "Diagnose, fix the stored URLs, redirect, verify, then harden.",
        p: "Secure, and done properly."
      }
    },
    ideal: {
      fastestSafe: ["s1:0", "s2:all", "s3:0"],
      mostSecure: ["s1:0", "s2:all", "s3:0"]
    }
  },

  {
    id: "viral-traffic-spike",
    title: "A viral article and a traffic spike",
    s: "Scalability",
    level: "Editor",
    stage: 2,
    d: 3,
    priorities: { speed: 3, security: 1, stability: 3, rootCause: 1, communication: 2 },
    intro: "A client's article is trending. Traffic is around 20 times normal, pages are slowing down, and the server is returning some 502 errors.",
    timeNotes: "Reviewer judgment; a host plan change depends on the host.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Check what's getting past the cache: are logged-out visitors getting full-page cache hits, and what is hitting PHP?",
            next: "s2",
            min: [5, 15],
            m: { speed: 1, security: 0, stability: 1, rootCause: 2, communication: 0 },
            t: "Under a spike, the cache hit rate decides everything. A few uncached requests per page view can overload PHP.",
            p: "Find out which visitors are getting past the fast lane."
          },
          {
            text: "Restart PHP and the web server",
            next: "s1r",
            min: [2, 10],
            m: { speed: 1, security: 0, stability: 0, rootCause: -1, communication: 0 },
            t: "Clears stuck workers for a moment, but the same load fills them up again.",
            p: "Turning it off and on again, under the same pressure."
          },
          {
            text: "Put the site in maintenance mode until traffic drops",
            next: "o:lost-moment",
            min: [1, 5],
            m: { speed: -2, security: 0, stability: -1, rootCause: 0, communication: -1 },
            t: "Stops the errors by turning away every visitor, at the moment the client wants them most.",
            p: "Closing the shop on its busiest day."
          }
        ]
      },
      s1r: {
        type: "single",
        prompt: "It recovers for two minutes, then the 502s come back. Now what?",
        options: [
          {
            text: "Check what's getting past the cache",
            next: "s2",
            min: [5, 15],
            m: { speed: 0, security: 0, stability: 1, rootCause: 2, communication: 0 },
            t: "Good recovery: the restart proved it's a capacity problem caused by uncached work.",
            p: "Stop rebooting and find what's using everything up."
          },
          {
            text: "Keep restarting every few minutes",
            next: "o:firefighting",
            min: [30, 120],
            m: { speed: -1, security: 0, stability: -2, rootCause: -2, communication: -1 },
            t: "Each restart drops in-flight requests and fixes nothing.",
            p: "Running in circles."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The article page is cached, but these are hitting PHP on every view. Which do you fix right now?",
        next: "s3",
        missPenalty: { stability: -2 },
        options: [
          {
            text: "A related-posts widget running a heavy query: cache its output in the object cache",
            good: true,
            critical: true,
            m: { speed: 1, stability: 1 },
            t: "Fragment caching removes the query from every uncached render.",
            p: "Make the widget once and reuse it."
          },
          {
            text: "A view counter calling admin-ajax.php on every page view: sample it, batch it, or pause it for now",
            good: true,
            critical: true,
            m: { stability: 2 },
            t: "admin-ajax.php is never page-cached and loads WordPress fully, so one call per view multiplies PHP load by the traffic.",
            p: "A counter that knocks on the server's door for every single visitor."
          },
          {
            text: "Share links with ?utm_source= and similar parameters bypassing the cache: ignore those in the cache key",
            good: true,
            critical: true,
            m: { speed: 2 },
            t: "Many caches treat each query string as a different page, so every shared link becomes a cache miss.",
            p: "Tell the cache that tracking tags don't make it a different page."
          },
          {
            text: "Lengthen the article's cache time, for example with stale-while-revalidate",
            good: true,
            m: { speed: 1, stability: 1 },
            t: "Fewer trips to the server for the most visited page.",
            p: "Keep the popular page ready for longer."
          },
          {
            text: "Purge the whole cache so everyone gets the latest version",
            good: false,
            m: { speed: -1, stability: -2 },
            t: "A full purge mid-spike sends every visitor to PHP at once.",
            p: "Opening the floodgates."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "Things are stable. Before the next wave:",
        options: [
          {
            text: "Tell the client what happened and what you changed, and add alerts for cache hit rate and 5xx errors",
            next: "o:held",
            min: [20, 45],
            m: { speed: 0, security: 0, stability: 1, rootCause: 1, communication: 2 },
            t: "The client learns why it happened, and alerts catch the next spike early.",
            p: "Explain, then set an alarm."
          },
          {
            text: "Ask the host to double the server size permanently",
            next: "o:costly",
            min: [15, 60],
            m: { speed: 1, security: 0, stability: 1, rootCause: -1, communication: 0 },
            t: "More headroom helps, but the uncached patterns cost money on every visit.",
            p: "A bigger bill instead of a lighter site."
          }
        ]
      }
    },
    outcomes: {
      "lost-moment": {
        title: "Safe, but the moment is gone",
        verdict: "bad",
        summary: "No more errors, because no visitors.",
        t: "Under a spike, fix cache misses instead of turning traffic away.",
        p: "Problem solved by losing the opportunity."
      },
      firefighting: {
        title: "Stuck firefighting",
        verdict: "bad",
        summary: "An hour of restarts and the site is still falling over.",
        t: "Restarts treat symptoms. Find the uncached work.",
        p: "Busy, but not fixing anything."
      },
      costly: {
        title: "Stable, but expensive",
        verdict: "ok",
        summary: "The spike is handled, but the hosting bill doubles for good.",
        t: "Remove the waste first, then size the server.",
        p: "It works, at a price."
      },
      held: {
        title: "Held the spike",
        verdict: "good",
        summary: "Found the cache misses, fixed them live, informed the client, and set up alerts.",
        t: "Cache hit rate first, targeted fixes, then communication and monitoring.",
        p: "Busy day, handled well."
      }
    },
    ideal: {
      fastestSafe: ["s1:0", "s2:all", "s3:0"],
      mostSecure: ["s1:0", "s2:all", "s3:0"]
    }
  },

  {
    id: "secrets-pushed-to-public-repo",
    title: "Production secrets pushed to a public repository",
    s: "Security",
    level: "Administrator",
    stage: 3,
    d: 3,
    priorities: { speed: 3, security: 3, stability: 1, rootCause: 2, communication: 2 },
    intro: "A developer on your team accidentally pushed wp-config.php, with the production database password and a payment gateway API key, to a public GitHub repository an hour ago.",
    timeNotes: "Rotation times are reviewer judgment. What makes speed critical is researched: honeypot studies saw leaked keys on public GitHub found and abused within minutes, so hiding the file is not enough. GitHub's guidance is to revoke or rotate the secret first.",
    refs: [
      "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository",
      "https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret",
      "https://www.comparitech.com/blog/information-security/github-honeypot/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Revoke and replace the payment API key, change the database password, and update the site's config",
            next: "s2",
            min: [20, 60],
            m: { speed: 2, security: 2, stability: -1, rootCause: 0, communication: 0 },
            t: "Public repositories are scanned for secrets by automated bots, often within minutes. Treat anything pushed as compromised and rotate it first.",
            p: "Assume the keys are already copied. Change the locks first."
          },
          {
            text: "Delete the file and force-push to remove it from the repository",
            next: "s1b",
            min: [10, 30],
            m: { speed: 1, security: -1, stability: 0, rootCause: 0, communication: 0 },
            t: "Removing it doesn't un-leak it. Forks, clones and secret-scanning bots may already have it.",
            p: "Taking the note off the noticeboard after everyone photographed it."
          },
          {
            text: "Make the repository private",
            next: "s1b",
            min: [1, 5],
            m: { speed: 1, security: -1, stability: 0, rootCause: 0, communication: 0 },
            t: "Limits further exposure, but anyone who copied the secrets in the last hour still has them.",
            p: "Closing the door after the keys were taken."
          }
        ]
      },
      s1b: {
        type: "single",
        prompt: "The file isn't publicly visible any more. Are the secrets safe now?",
        options: [
          {
            text: "No. Rotate everything now",
            next: "s2",
            min: [20, 60],
            m: { speed: -1, security: 1, stability: -1, rootCause: 0, communication: 0 },
            t: "Correct: visibility now says nothing about who copied it before.",
            p: "Change the locks anyway."
          },
          {
            text: "Yes. It was only public for an hour",
            next: "o:compromised",
            min: 0,
            m: { speed: 1, security: -2, stability: 0, rootCause: -1, communication: -1 },
            t: "An hour is plenty of time for automated scanners. The keys must be considered stolen.",
            p: "Hoping nobody noticed isn't a plan."
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The keys are rotated. What else do you do?",
        next: "s3",
        missPenalty: { security: -2 },
        options: [
          {
            text: "Check the payment gateway and database logs for activity since the push",
            good: true,
            critical: true,
            m: { security: 1, rootCause: 2 },
            t: "Tells you whether the secrets were actually used, which decides who you need to notify.",
            p: "Check whether anyone used the stolen keys."
          },
          {
            text: "Change the WordPress salts and any other secrets that were in the file",
            good: true,
            critical: true,
            m: { security: 2 },
            t: "Salts were in the same file. New salts invalidate every login session.",
            p: "Change every key that was on that keyring."
          },
          {
            text: "Add wp-config.php to .gitignore and a secret-scanning check to CI",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "Stops the same mistake reaching a repository again.",
            p: "Make sure it can't happen again."
          },
          {
            text: "Remove the file from Git history, for example with git filter-repo, and have the team re-clone",
            good: true,
            m: { security: 1 },
            t: "Cleans up the history, but only after rotation, since copies may already exist.",
            p: "Tidy up the record, after changing the locks."
          },
          {
            text: "Call out the developer in the team chat",
            good: false,
            m: { communication: -2 },
            t: "Blame discourages people from reporting mistakes quickly. Fix the process instead.",
            p: "Shaming people makes the next mistake get hidden."
          }
        ]
      },
      s3: {
        type: "single",
        prompt: "Do you tell anyone outside the team?",
        options: [
          {
            text: "Tell the client now: what was exposed, for how long, and what you've done. Follow your incident and data-breach process if personal data may have been accessed",
            next: "o:handled",
            min: [20, 60],
            m: { speed: 0, security: 1, stability: 0, rootCause: 0, communication: 2 },
            t: "Prompt disclosure builds trust, and data-protection laws such as GDPR can set strict reporting deadlines when personal data is involved.",
            p: "Be upfront, and follow the rules for reporting."
          },
          {
            text: "Say nothing, since nothing bad seems to have happened",
            next: "o:quiet",
            min: 0,
            m: { speed: 1, security: 0, stability: 0, rootCause: 0, communication: -2 },
            t: "The client owns the risk and may have legal duties. Hiding an incident usually makes things worse.",
            p: "Keeping quiet about a risk that isn't yours to hide."
          }
        ]
      }
    },
    outcomes: {
      compromised: {
        title: "Secrets left live",
        verdict: "bad",
        summary: "The leaked keys still work, and anyone who copied them can use them.",
        t: "Rotation is the only real fix for leaked credentials.",
        p: "The stolen keys still open the doors."
      },
      quiet: {
        title: "Fixed, but kept quiet",
        verdict: "mixed",
        summary: "The technical response was right, but the client wasn't told about the exposure.",
        t: "Incident response includes disclosure to the owner of the risk.",
        p: "Good repair, poor honesty."
      },
      handled: {
        title: "Contained and disclosed",
        verdict: "good",
        summary: "Rotated first, checked for misuse, closed the gap, and told the client.",
        t: "Rotate, investigate, prevent, and disclose.",
        p: "Fast, thorough and honest."
      }
    },
    ideal: {
      fastestSafe: ["s1:0", "s2:all", "s3:0"],
      mostSecure: ["s1:0", "s2:all", "s3:0"]
    }
  }
];
