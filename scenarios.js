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
  },

  {
    id: "staging-gate-after-sync",
    title: "Staging left open after a sync",
    s: "Security",
    level: "Editor",
    stage: 2,
    d: 2,
    priorities: { speed: 1, security: 3, stability: 1, rootCause: 2, communication: 2 },
    intro: "You refreshed a password-protected staging site by copying the live site over it. Staging now holds a full copy of a member directory. The sync finished without errors.",
    timeNotes: "All time estimates are judgment based on typical agency work; none come from host documentation.",
    refs: ["https://wordpress.org/documentation/article/settings-reading-screen/"],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "The sync reports success. What do you do before calling it done?",
        options: [
          {
            text: "Request the home page, /wp-admin/ and /wp-json/ without credentials and confirm each returns 401",
            m: { security: 2, stability: 1 },
            min: [5, 10],
            t: "A sync can replace the files and database that hold the protection setting. Only an anonymous request proves the gate is up; configuration alone doesn't.",
            p: "Test it the way a stranger would. If you can get in without a password, so can anyone.",
            next: "s2"
          },
          {
            text: "Check that the hosting dashboard shows password protection as enabled, then move on",
            m: { speed: 1, security: -2 },
            min: 2,
            t: "A dashboard shows stored configuration, not what the server actually enforces. They can disagree after an overwrite.",
            p: "The control panel saying it's locked isn't the same as the door being locked.",
            next: "o:exposed"
          },
          {
            text: "Tick 'Discourage search engines' to be safe, then move on",
            m: { speed: 1, security: -1 },
            min: 2,
            t: "That setting adds a noindex request and still allows normal visitors. It isn't access control.",
            p: "It asks search engines to stay away but doesn't stop anyone else.",
            next: "o:exposed"
          }
        ]
      },
      s2: {
        type: "single",
        prompt: "The anonymous requests come back 200: the gate is gone, though the dashboard still says it's on. What next?",
        options: [
          {
            text: "Turn protection off and on again, then repeat the anonymous requests until they return 401",
            m: { security: 2, rootCause: 1 },
            min: [5, 15],
            t: "When the stored setting and actual enforcement disagree, re-applying the setting brings them back in line. The anonymous re-test is the proof.",
            p: "Reset the lock and check it again from outside.",
            next: "s3"
          },
          {
            text: "Trust the dashboard; the 200s are probably a cached response",
            m: { security: -2 },
            min: 1,
            t: "Guessing it's the cache without checking leaves the member data public. A cached 200 for anonymous users is an exposure too.",
            p: "Assuming it's fine while the test says otherwise leaves private data on show.",
            next: "o:exposed"
          },
          {
            text: "Delete the staging site now and rebuild it later",
            m: { security: 1, stability: -1, speed: -1 },
            min: [10, 20],
            t: "This ends the exposure but throws away the test environment and any work in progress on it, and it doesn't explain why the gate dropped.",
            p: "It stops the leak, but at the cost of the whole test site and without learning anything.",
            next: "s3"
          }
        ]
      },
      s3: {
        type: "multi",
        prompt: "The gate is back. Which follow-ups do you do? Select all that apply.",
        missPenalty: { rootCause: -1, communication: -1 },
        options: [
          {
            text: "Tell the lead how long the copy was exposed and what data it held",
            good: true,
            critical: true,
            m: { communication: 2 },
            t: "An exposure of personal data needs a timeline and scope so the people responsible can decide what to do next.",
            p: "The people in charge need to know what was visible and for how long."
          },
          {
            text: "Add a standing rule: after every sync onto staging, re-test the gate anonymously",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "The cause is a process gap: the gate was never re-checked after an overwrite. A standing post-sync check closes it.",
            p: "Make re-checking the lock a fixed step every time the copy is refreshed."
          },
          {
            text: "Keep 'Discourage search engines' on for staging as a second signal, knowing it isn't access control",
            good: true,
            m: { security: 1 },
            t: "A noindex setting reduces the chance of a stray copy being indexed, but it never replaces authentication.",
            p: "A useful extra, as long as nobody mistakes it for a lock."
          },
          {
            text: "Rotate the temporary password you shared in chat",
            good: true,
            m: { security: 1 },
            t: "A credential that passed through chat should be treated as exposed and replaced.",
            p: "A password sent over chat isn't secret any more, so change it."
          },
          {
            text: "Delete the access logs so the exposure isn't on record",
            good: false,
            m: { security: -1, communication: -2 },
            t: "Destroying logs removes the only evidence of who accessed the data and undermines trust.",
            p: "Hiding the evidence makes things worse, not better."
          }
        ],
        next: "o:closed"
      }
    },
    outcomes: {
      closed: {
        title: "Gate restored, gap closed",
        verdict: "good",
        summary: "Staging is locked again, the exposure is reported, and every future sync includes an anonymous gate check.",
        t: "Verified by anonymous requests, with a process fix that covers the cause.",
        p: "The copy is private again and the team won't get caught out the same way."
      },
      exposed: {
        title: "Member data left public",
        verdict: "bad",
        summary: "Staging stayed open with a full copy of member records, and nobody knew.",
        t: "Configuration was trusted over measurement, so the gate's removal went unnoticed.",
        p: "Private information stayed on show because nobody checked from the outside."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:0", "s3:all"]
    }
  },

  {
    id: "php-upgrade-fatal-on-clone",
    title: "Fatal error found on an upgrade clone",
    s: "Debugging",
    level: "Author",
    stage: 2,
    d: 2,
    priorities: { speed: 2, security: 1, stability: 3, rootCause: 3, communication: 2 },
    intro: "During a PHP upgrade programme, you clone a client site to staging and switch it to the new PHP version. A crawl shows two landing pages returning 500, with a count() TypeError in the footer template.",
    timeNotes: "All time estimates are judgment; none come from official or host documentation.",
    refs: [
      "https://www.php.net/manual/en/function.count.php",
      "https://www.php.net/manual/en/function.is-countable.php",
      "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Check the live site's error log and PHP version for the same fatal",
            m: { rootCause: 2, stability: 1 },
            min: [5, 10],
            t: "count() has thrown TypeError since PHP 8.0, so a live site on any 8.x release can already be failing. The live logs tell you whether this is new.",
            p: "First find out whether the real site already has this problem.",
            next: "s2"
          },
          {
            text: "Mark the site 'blocked by upgrade' and move on to the next one",
            m: { speed: 1, rootCause: -2 },
            min: 2,
            t: "This blames the upgrade without evidence and leaves a possible live outage unexamined.",
            p: "It assumes the upgrade is at fault and skips the real check.",
            next: "o:hidden-outage"
          },
          {
            text: "Switch staging back to the old PHP version to see if the error clears",
            m: { speed: -1, rootCause: -1 },
            min: [5, 10],
            t: "The error would persist on any PHP 8.x, so this costs time and proves little that the live log wouldn't show directly.",
            p: "A slower way to learn what the live site's log already says.",
            next: "s2"
          }
        ]
      },
      s2: {
        type: "single",
        prompt: "Live, on an older PHP 8.x, has been logging the same fatal hundreds of times a week. Both pages are down for visitors. What now?",
        options: [
          {
            text: "Add an is_countable() guard on staging, lint it, then apply the same one-line edit to live with a backup and rollback note, and tell the client",
            m: { speed: 1, stability: 1, communication: 2 },
            min: [20, 40],
            t: "A minimal guard stops the TypeError without changing behaviour for real arrays. Staging first, plus a backup and a lint check, keeps the live change safe and reversible.",
            p: "Make the smallest safe fix, test it on the copy, apply it to the real site with a way back, and tell the client.",
            next: "s3"
          },
          {
            text: "Turn on WP_DEBUG with on-screen display on live to read the full error",
            m: { security: -2, stability: -1 },
            min: 5,
            t: "The error is already in the log. Showing debug output on production leaks internal paths to visitors and isn't recommended.",
            p: "That shows technical details to the public and tells you nothing new.",
            next: "o:hidden-outage"
          },
          {
            text: "Leave it for next week's upgrade batch",
            m: { speed: -2, communication: -1 },
            min: 0,
            t: "Two revenue pages stay broken for a week for no technical reason.",
            p: "Important pages stay broken while you wait.",
            next: "o:late-fix"
          }
        ]
      },
      s3: {
        type: "multi",
        prompt: "Before closing the task, which checks do you run? Select all that apply.",
        missPenalty: { rootCause: -1 },
        options: [
          {
            text: "Purge the page cache, then fetch both pages with a cache-busting query string",
            good: true,
            critical: true,
            m: { stability: 1 },
            t: "A cached copy can hide whether PHP actually ran. A cache-busted fetch proves the fix live.",
            p: "Make sure you're seeing a fresh page, not an old saved one."
          },
          {
            text: "Fetch a few unaffected pages that use the same template, as a control",
            good: true,
            m: { stability: 1 },
            t: "One template feeds many pages, so check that the edit didn't break the ones that worked.",
            p: "Check the fix didn't break pages that were fine."
          },
          {
            text: "Open a follow-up to find out why the data being counted is empty on just those two pages",
            good: true,
            critical: true,
            m: { rootCause: 2 },
            t: "The guard stops the crash, but the missing data is the real cause and may leave parts of those pages incomplete.",
            p: "The fix stops the crash; you still need to find out why those pages are missing information."
          },
          {
            text: "Treat 'zero deprecation notices' in the log as proof the site is clean",
            good: false,
            m: { rootCause: -1 },
            t: "Deprecation notices only appear if the error-reporting level includes them. Zero can mean they were never logged.",
            p: "An empty list can just mean nobody was writing that kind of note down."
          }
        ],
        next: "o:fixed"
      }
    },
    outcomes: {
      fixed: {
        title: "Outage fixed, cause tracked",
        verdict: "good",
        summary: "Both pages are back, the fix is verified live, and the underlying data problem has its own ticket.",
        t: "Pre-existing fatal identified, guarded safely, verified uncached, with the root cause tracked.",
        p: "The pages work again and the deeper problem is on the list."
      },
      "hidden-outage": {
        title: "Live pages still down",
        verdict: "bad",
        summary: "The live site keeps failing while the upgrade gets the blame.",
        t: "No live-log check, so a production fatal went unnoticed or was handled unsafely.",
        p: "Visitors keep hitting broken pages and nobody knows why."
      },
      "late-fix": {
        title: "Fixed a week late",
        verdict: "mixed",
        summary: "The fix lands eventually, but the client loses a week of traffic on two key pages.",
        t: "Correct diagnosis, wrong urgency.",
        p: "You found it but waited too long to act."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:0", "s3:all"]
    }
  },

  {
    id: "fleet-robots-sitemap-cleanup",
    title: "Cleaning up robots.txt across many sites",
    s: "Change Management",
    level: "Editor",
    stage: 3,
    d: 3,
    priorities: { speed: 1, security: 1, stability: 3, rootCause: 2, communication: 1 },
    intro: "Over twenty client sites list three Sitemap lines in robots.txt: core's /wp-sitemap.xml, an SEO plugin's /sitemap.xml and an HTML sitemap page. You have a small must-use plugin that keeps only one line, and a tool that can deploy it to every site at once.",
    timeNotes: "All time estimates are judgment; none come from official or host documentation.",
    refs: [
      "https://make.wordpress.org/core/2020/07/22/new-xml-sitemaps-functionality-in-wordpress-5-5/",
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "How do you roll it out?",
        options: [
          {
            text: "Survey every site's robots.txt first and group the sites by pattern before choosing targets",
            m: { stability: 2, rootCause: 1, speed: -1 },
            min: [30, 60],
            t: "A read-only survey shows which sites have the core-plus-plugin collision and which list several sitemaps on purpose.",
            p: "Look before you change anything, so you only touch the sites that actually have the problem.",
            next: "s2"
          },
          {
            text: "Deploy to every live site in one run; more than one Sitemap line is always a mistake",
            m: { speed: 2, stability: -2 },
            min: 10,
            t: "Several Sitemap lines can be legitimate: paginated sets or a separate news sitemap. A blanket rule removes real sitemaps.",
            p: "Some sites need more than one line, and this would delete theirs.",
            next: "o:broke-sitemaps"
          },
          {
            text: "Deploy to one site, check it, then deploy to all the rest",
            m: { speed: 1, stability: -1 },
            min: [15, 25],
            t: "A single test site can't reveal the sites whose extra lines are intentional.",
            p: "One test site doesn't tell you about the sites that are different.",
            next: "o:broke-sitemaps"
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The survey finds several patterns. Which sites should get the plugin? Select all that apply.",
        missPenalty: { stability: -1 },
        options: [
          {
            text: "Sites listing core's sitemap plus a plugin's sitemap covering the same content",
            good: true,
            critical: true,
            m: { rootCause: 1 },
            t: "This is the duplicate the plugin exists to fix: core's /wp-sitemap.xml alongside a plugin sitemap.",
            p: "These are the sites with the actual duplicate."
          },
          {
            text: "A site listing /sitemap-1.xml to /sitemap-5.xml as one paginated set",
            good: false,
            m: { stability: -2 },
            t: "Keeping one line would hide four real sitemaps.",
            p: "Those five lines are all needed."
          },
          {
            text: "A site listing a main sitemap plus a separate news sitemap",
            good: false,
            m: { stability: -2 },
            t: "The news sitemap is a distinct, intentional entry.",
            p: "The second line is there on purpose."
          },
          {
            text: "A site your team doesn't host",
            good: false,
            m: { stability: -1, communication: -1 },
            t: "Out of scope: you shouldn't change infrastructure you don't manage.",
            p: "That site isn't yours to change."
          }
        ],
        next: "s3"
      },
      s3: {
        type: "multi",
        prompt: "After deploying, how do you verify? Select all that apply.",
        missPenalty: { rootCause: -1 },
        options: [
          {
            text: "Fetch robots.txt both compressed and uncompressed and count the Sitemap lines",
            good: true,
            critical: true,
            m: { stability: 1 },
            t: "Caches can hold separate copies per Accept-Encoding. Browsers and crawlers ask for compressed responses, so check that copy too.",
            p: "Check the version real visitors get, not just the easiest one to test."
          },
          {
            text: "Confirm the remaining Sitemap URL uses the site's canonical host (www or not)",
            good: true,
            m: { rootCause: 1 },
            t: "A sitemap advertised on the wrong host variant points crawlers at redirects.",
            p: "Make sure the address matches the site's real address."
          },
          {
            text: "Confirm /sitemap.xml still returns 200",
            good: true,
            m: { stability: 1 },
            t: "The plugin changes robots.txt only. The kept sitemap must still resolve.",
            p: "Make sure the sitemap itself still works."
          },
          {
            text: "Check each site once with a plain uncompressed request and call it done",
            good: false,
            m: { rootCause: -2 },
            t: "An uncompressed copy can be fresh while the compressed copy stays stale, so a plain request can show a false pass.",
            p: "The quick check can say it worked when visitors still see the old file."
          }
        ],
        next: "o:clean"
      }
    },
    outcomes: {
      clean: {
        title: "One sitemap where it belongs",
        verdict: "good",
        summary: "Only the duplicate sites changed, verified on the cache copies crawlers actually receive.",
        t: "Survey-driven targeting plus per-encoding verification.",
        p: "The right sites were fixed and the special cases were left alone."
      },
      "broke-sitemaps": {
        title: "Real sitemaps removed",
        verdict: "bad",
        summary: "Sites with intentional extra sitemaps lost them from robots.txt.",
        t: "A blanket rule applied without a survey removed legitimate entries.",
        p: "The fix deleted sitemaps some sites actually needed."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:all", "s3:all"]
    }
  },

  {
    id: "password-reset-sweep",
    title: "Password resets nobody asked for",
    s: "Security",
    level: "Editor",
    stage: 2,
    d: 3,
    priorities: { speed: 2, security: 3, stability: 2, rootCause: 3, communication: 2 },
    intro: "A client site you manage sends a burst of password reset emails in under a minute. Several real staff accounts are affected; the client's office manager is already asking whether they have been hacked. Nothing on the site appears broken.",
    timeNotes: "Minute estimates are judgment calls based on typical agency incident handling, not figures from any vendor documentation. The technical behaviours in the feedback are documented: the must-use plugin loading rules, the default roles, and the enumeration remediation.",
    refs: [
      "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/03-Identity_Management_Testing/04-Testing_for_Account_Enumeration_and_Guessable_User_Account",
      "https://developer.wordpress.org/advanced-administration/plugins/mu-plugins/",
      "https://wordpress.org/documentation/article/roles-and-capabilities/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "First move?",
        options: [
          {
            text: "Pull the web server access logs filtered to that time window and work out what was actually requested, from where",
            m: { speed: 1, rootCause: 2, communication: 1 },
            min: [15, 45],
            t: "The request pattern tells you whether this was one confused user, a credential-stuffing run or an enumeration sweep, and which accounts returned a different response. Every later decision depends on that distinction.",
            p: "Look at the site's visitor records for that minute first. What you do next depends entirely on what actually happened.",
            next: "s2"
          },
          {
            text: "Force a password reset on every user and log everyone out immediately",
            m: { security: 1, stability: -1, rootCause: -1, communication: -1 },
            min: [30, 60],
            t: "This locks out the whole client team mid-working-day on an unverified assumption and removes none of the attacker's actual advantage if the issue is enumeration rather than a compromise. It also burns the trust you need for the real hardening conversation.",
            p: "Big, disruptive, and aimed at a problem you have not confirmed yet. It interrupts the whole team without fixing the cause.",
            next: "s2"
          },
          {
            text: "Assume the host's firewall already stopped it and tell the office manager there is nothing to worry about",
            m: { security: -2, rootCause: -2, communication: -1 },
            min: 5,
            t: "You have asserted a control you have not verified and closed the incident without evidence. If the reset links reached real inboxes, the client's team needed to be told not to click them.",
            p: "You told the client it was fine without checking. If those emails reached real people, they needed a warning today.",
            next: "o:left-open"
          },
          {
            text: "Email every user telling them to change their password straight away",
            m: { communication: 1, speed: -1, rootCause: -1 },
            min: [20, 40],
            t: "Warning people is reasonable, but sent before you know what happened it reads as a breach notice and invites exactly the panicked clicking you want to avoid. Telling the affected users not to click the unexpected links is the more precise message.",
            p: "Warning people is fair, but sending it before you know the facts sounds like a breach and can make things worse.",
            next: "s2"
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "The logs show one source sweeping a list of guessed usernames at the lost-password form, with real accounts answering differently from invalid ones. Which measures do you put in place? Select all that apply.",
        missPenalty: { rootCause: -1 },
        options: [
          {
            text: "Make the lost-password response identical whether or not the account exists",
            good: true,
            critical: true,
            m: { security: 2, rootCause: 2 },
            t: "This closes the enumeration oracle itself, which is the remediation OWASP gives for WSTG-IDNT-04: consistent generic responses regardless of account validity. Accept the cost that a legitimate user who asks twice sees the same confirmation and gets no second email.",
            p: "Make the form give the same answer either way, so it stops confirming which names are real."
          },
          {
            text: "Cut the number of Administrator accounts and move content staff to the Editor role",
            good: true,
            critical: true,
            m: { security: 2, stability: 1 },
            t: "Editor can publish and manage everyone's posts and pages without install_plugins or edit_themes, so it covers what content staff actually do. Nine administrators, several at outside vendors, is the blast radius regardless of how this particular bot did.",
            p: "Fewer people with full control means less damage if any one account is taken over, and content staff lose nothing they need."
          },
          {
            text: "Enable two-factor authentication on the accounts that stay privileged",
            good: true,
            m: { security: 2, speed: -1 },
            t: "Enumeration plus a stolen or reused password is the realistic path to compromise here; a second factor breaks that chain even when the username is known. Do the privileged accounts first rather than waiting for a fleet-wide rollout.",
            p: "A second login step means knowing the username and password is no longer enough."
          },
          {
            text: "Move the login page to a secret URL so the bot cannot find it",
            good: false,
            m: { speed: -1, rootCause: -1 },
            t: "The address is discoverable and the oracle survives the move, so this hides the symptom while leaving the differing responses intact. It also tends to break legitimate integrations that post to the standard endpoint.",
            p: "Hiding the door does not stop the form telling an attacker which names are real, and it often breaks other things."
          }
        ],
        next: "s3"
      },
      s3: {
        type: "single",
        prompt: "Where does the hardening code live?",
        options: [
          {
            text: "A single PHP file placed directly in wp-content/mu-plugins",
            m: { security: 2, stability: 1, rootCause: 1 },
            min: [20, 40],
            t: "Must-use plugins load automatically and cannot be deactivated from wp-admin, so the control survives a compromised administrator account. Keep the file at the top level of that directory, since subdirectories are not scanned without a loader file.",
            p: "Put it in the must-use plugins folder, as a file directly in that folder. It runs automatically and nobody can switch it off from the dashboard.",
            next: "o:closed"
          },
          {
            text: "Included from the child theme's functions.php with require_once",
            m: { security: 1, stability: 0 },
            min: [20, 40],
            t: "This works and survives parent theme updates, but it ties a security control to the active theme and to one site. A theme switch or a redesign silently removes the protection.",
            p: "It works for now, but the protection disappears the day the site changes theme.",
            next: "o:partial"
          },
          {
            text: "Added to the shared parent theme's functions.php on the server so every client site gets it at once",
            m: { security: 1, stability: -2, rootCause: -1 },
            min: [15, 30],
            t: "Patching a shared parent theme in place on a server is how copies diverge in the first place: the change exists nowhere else and is invisible to whoever touches the site next. Enforce the boundary with DISALLOW_FILE_EDIT and ship shared changes through the repository.",
            p: "Editing the shared theme directly on a server is exactly how different sites end up with different code and nobody knowing which is right.",
            next: "o:partial"
          }
        ]
      }
    },
    outcomes: {
      closed: {
        title: "Oracle closed, blast radius smaller",
        verdict: "good",
        summary: "You established what happened from evidence, removed the behaviour that leaked valid usernames, and cut the number of accounts worth attacking.",
        t: "The enumeration path is closed at the source, the privileged account count is down, and the control is in a must-use plugin that a compromised administrator cannot disable. Note for the write-up that per-IP limits are weaker than per-account ones, since a forwarded-for header is client-supplied.",
        p: "You found out what really happened, stopped the form giving away who is real, and reduced how many accounts matter. The protection is somewhere nobody can switch it off."
      },
      partial: {
        title: "Fixed, but it will not stay fixed",
        verdict: "ok",
        summary: "The immediate hole is closed, but the control is attached to something that will change.",
        t: "A theme-bound or server-edited control is one redesign or one deploy away from vanishing, and nothing records that it was ever there. Move it to a must-use plugin and write the decision down.",
        p: "The problem is handled today, but the fix is parked somewhere that will get replaced, and then it is gone without anyone noticing."
      },
      "left-open": {
        title: "Still open, and now on record as fine",
        verdict: "bad",
        summary: "You closed the incident without evidence and told the client there was nothing wrong.",
        t: "The enumeration behaviour is intact, the account list is still discoverable, and the people who received unexpected reset emails were never told not to click them. The next sweep will be cheaper for the attacker than this one.",
        p: "Nothing was fixed and the client was told not to worry. The people who got those emails never found out they should ignore them."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:all", "s3:0"]
    }
  },

  {
    id: "shared-theme-hotfix",
    title: "Four o'clock, client on the phone",
    s: "Change Management",
    level: "Author",
    stage: 2,
    d: 2,
    priorities: { speed: 2, security: 1, stability: 3, rootCause: 3, communication: 2 },
    intro: "A shared parent theme runs on several client sites. It has been copied by hand between projects for years, so no two copies are identical and none is the agreed source of truth. At four in the afternoon a template error breaks the contact page on one site and the client is on the phone.",
    timeNotes: "Minute ranges are judgment based on a small agency's typical turnaround, not vendor figures. The documented points are the parent theme update behaviour, where Additional CSS is stored, and the file editor constant.",
    refs: [
      "https://developer.wordpress.org/themes/advanced-topics/child-themes/",
      "https://developer.wordpress.org/apis/wp-config-php/",
      "https://developer.wordpress.org/reference/functions/wp_get_custom_css_post/"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "The contact page is down. What do you do first?",
        options: [
          {
            text: "Fix it in the repository, get it reviewed, tag it and deploy",
            m: { stability: 2, rootCause: 2, speed: -1 },
            min: [60, 180],
            t: "This is the correct steady-state path and it leaves a reviewable history, but on a broken production page it may be too slow to be the first move. The real signal here is that if the proper route is too slow for an outage, the deploy process is the thing to fix.",
            p: "This is the right way to work normally. During an outage it may simply take too long, which tells you the deploy process needs to be quicker.",
            next: "s2"
          },
          {
            text: "Hotfix on the server to restore the page, then mirror the same change into the repository the same day",
            m: { speed: 2, stability: 1, communication: 1 },
            min: [15, 45],
            t: "An acknowledged emergency path people actually follow beats a strict rule they quietly ignore. The load-bearing part is step two: a hotfix that never reaches the repository recreates the divergence this whole situation came from.",
            p: "Get the page working, then put the same change into the shared code today. Skipping that second step is how the copies drifted apart in the first place.",
            next: "s2"
          },
          {
            text: "Patch it through Appearance then Theme File Editor in the dashboard",
            m: { speed: 1, stability: -2, rootCause: -2 },
            min: [5, 15],
            t: "The change exists on one server, is recorded nowhere, and is invisible to the next person or tool that reads the codebase. Setting DISALLOW_FILE_EDIT in wp-config.php removes this route; DISALLOW_FILE_MODS also blocks dashboard installs and updates.",
            p: "Editing code inside the dashboard leaves a change nobody can find later. Turn that editor off so it stops being an option.",
            next: "o:drift"
          },
          {
            text: "If the breakage is only visual, hide the broken element with Customizer then Additional CSS and fix it properly tomorrow",
            m: { speed: 2, stability: 1, rootCause: -2 },
            min: [5, 20],
            t: "Additional CSS is stored as a custom_css post in the database rather than in a theme file, so it buys time without creating code drift. It is a bandage, not a fix, and on a broken contact form it hides a lead-capture failure rather than resolving it.",
            p: "A styling patch stored in the database buys you the evening without touching any code. It does not fix the fault, and on a contact page the fault may be costing the client enquiries.",
            next: "s2"
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "Before you call this done, which of these do you do? Select all that apply.",
        missPenalty: { rootCause: -1 },
        options: [
          {
            text: "Decide whether the fix is genuinely universal, or one client's need that belongs in that client's child theme",
            good: true,
            critical: true,
            m: { stability: 2, rootCause: 2 },
            t: "A shared parent theme accumulates client-specific hacks precisely because this question is skipped under time pressure. Universal logic and data shaping belong in the parent; anything naming one client, or any markup a designer would change per client, belongs in the child.",
            p: "Work out whether every client needs this change or just this one. One client's fix goes in that client's own theme."
          },
          {
            text: "Check whether the same fault exists in the other copies of the shared theme",
            good: true,
            critical: true,
            m: { rootCause: 2, communication: 1 },
            t: "With copies that have diverged, a bug fixed on one site is still live on the others, and you only learn that by looking. This is also the cheapest way to start building the inventory of differences that reconciliation will need.",
            p: "The same bug is probably sitting on the other sites too. Check now rather than waiting for the next phone call."
          },
          {
            text: "Record what was deployed and why, including the version or commit you put live",
            good: true,
            m: { communication: 2, stability: 1 },
            t: "A recorded deploy reference is what makes a rollback a decision rather than an investigation. It also gives the next person the reasoning, which is the part that is never recoverable from the code itself.",
            p: "Write down what you deployed and why. That record is what lets anyone undo it quickly later."
          },
          {
            text: "Copy the patched file over to the other sites by SFTP while you are in there",
            good: false,
            m: { stability: -2, rootCause: -1 },
            t: "This is the exact mechanism that produced the diverged copies: a change applied directly to several servers, recorded in none of them. Fixing other sites is right; the hand-copy is the part to stop doing.",
            p: "Hand-copying files between servers is how the copies drifted apart. Fixing the other sites is right, but not this way."
          }
        ],
        next: "o:canonical"
      }
    },
    outcomes: {
      canonical: {
        title: "Page up, repository still true",
        verdict: "good",
        summary: "The site was restored quickly and the shared codebase still reflects what is actually running.",
        t: "You kept the emergency path and closed it properly: the change is in the repository, scoped correctly between parent and child, checked against the other copies, and recorded. The structural follow-up is making deploys cheap enough that the dashboard editor stops being tempting at all.",
        p: "The site is back and the shared code matches what is live. The longer-term job is making deploys quick enough that nobody is tempted to edit on the server."
      },
      drift: {
        title: "One more undocumented difference",
        verdict: "bad",
        summary: "The page works and the shared theme now differs from every other copy in a way nobody has recorded.",
        t: "This is how reconciliation becomes a multi-day archaeology exercise rather than a diff: a change that exists on exactly one server, with no record of what it was or why. Switch off the dashboard file editor and route shared changes through the repository.",
        p: "The page works, but this site's code is now different from the others and nobody knows how. Enough of these and no one can tell which version is correct."
      }
    },
    ideal: {
      safest: ["s1:1", "s2:all"]
    }
  },

  {
    id: "email-down-after-dns-cutover",
    title: "No email since this morning's launch",
    s: "Change Management",
    level: "Author",
    stage: 2,
    d: 2,
    priorities: { speed: 2, security: 1, stability: 3, rootCause: 3, communication: 2 },
    intro: "This morning you launched a client site by switching the domain's nameservers to a new DNS host. Two hours later the client's team says nobody has received outside email since. Before launch you exported the old zone's records, but you only recreated the web records at the new host.",
    timeNotes: "The up-to-72-hours figure for MX changes to take effect comes from Google Workspace's MX documentation. Minutes for editing records are judgment.",
    refs: [
      "https://support.google.com/a/answer/6398669",
      "https://support.google.com/a/answer/45679",
      "https://datatracker.ietf.org/doc/html/rfc7208#section-3.2"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "Recreate the MX records from the pre-launch export at the new DNS host, then confirm with a DNS lookup",
            m: { speed: 1, rootCause: 2, stability: 1 },
            min: [10, 20],
            t: "The new zone is authoritative now, so the missing MX records are the direct cause. Restoring them from the export fixes routing without touching the new website records.",
            p: "Email has no forwarding address any more. Put the address back.",
            next: "s2"
          },
          {
            text: "Switch the nameservers back to the old DNS host",
            m: { speed: -1, stability: 1, rootCause: -1 },
            min: [5, 10],
            t: "The old zone still has the mail records, but it also points the website back at the old server. And a nameserver change has to propagate again, so the launch is undone and email still waits.",
            p: "It undoes the whole launch to fix one missing setting, and it takes a while to take effect.",
            next: "o:rolled-back"
          },
          {
            text: "Tell the client DNS changes take up to 48 hours and email will catch up on its own",
            m: { speed: -2, rootCause: -2, communication: -1 },
            min: 5,
            t: "Propagation won't create records that don't exist in the new zone. Mail stays broken however long you wait.",
            p: "Waiting doesn't help when the setting was never copied.",
            next: "o:waited-it-out"
          }
        ]
      },
      s2: {
        type: "multi",
        prompt: "Mail is flowing again. Which other records do you check came across from the export? Select all that apply.",
        missPenalty: { rootCause: -1, stability: -1 },
        options: [
          {
            text: "The SPF TXT record (exactly one v=spf1 record)",
            good: true,
            critical: true,
            m: { rootCause: 1, security: 1 },
            t: "Without SPF, or with two SPF records, receivers may reject or junk outgoing mail. RFC 7208 allows only one SPF record per domain.",
            p: "This record tells other mail servers who may send email for the domain."
          },
          {
            text: "DKIM records (TXT or CNAME at the selector name)",
            good: true,
            critical: true,
            m: { rootCause: 1, security: 1 },
            t: "A missing DKIM key makes signatures fail verification, which hurts deliverability and DMARC alignment.",
            p: "This is the email signature check. Without it, mail looks less trustworthy."
          },
          {
            text: "The DMARC TXT record at _dmarc",
            good: true,
            m: { security: 1 },
            t: "DMARC tells receivers how to handle mail that fails SPF and DKIM and where to send reports; losing it removes that policy.",
            p: "This is the domain's rule for what to do with fake-looking email."
          },
          {
            text: "Other CNAMEs and verification TXT records for mail clients and third-party services",
            good: true,
            m: { rootCause: 1, stability: 1 },
            t: "Autodiscover, service verification and similar records also lived in the old zone and fail quietly when missing.",
            p: "Other tools connected to the domain depend on these too."
          },
          {
            text: "The WordPress siteurl and home options",
            good: false,
            m: { speed: -1 },
            t: "These control the website's URLs, not email routing or authentication.",
            p: "Website settings have nothing to do with email."
          }
        ],
        next: "s3"
      },
      s3: {
        type: "single",
        prompt: "How do you close this out?",
        options: [
          {
            text: "Explain to the client what happened and when it was fixed, ask staff to have key contacts resend anything that bounced, and add 'recreate every exported record before switching nameservers' to the launch checklist",
            m: { communication: 2, rootCause: 1 },
            min: [15, 30],
            t: "Some senders may have had bounces during the outage. Google's guidance for mail-routing changes is to tell contacts to resend bounced messages. The checklist change stops it happening again.",
            p: "Be honest about the gap, help them recover missed mail, and change the process.",
            next: "o:fixed-for-good"
          },
          {
            text: "Say nothing more, since mail is working again",
            m: { communication: -2 },
            min: 0,
            t: "Bounced messages during the outage go unnoticed, and the process gap remains for the next launch.",
            p: "The client may never learn some emails didn't arrive.",
            next: "o:fixed-quietly"
          }
        ]
      }
    },
    outcomes: {
      "fixed-for-good": {
        title: "Fixed, explained and prevented",
        verdict: "good",
        summary: "Mail and authentication records are restored, the client knows what to resend, and the launch checklist now covers the full zone.",
        t: "Restoring records from the export fixed the cause directly; checking SPF, DKIM and DMARC caught the quieter failures.",
        p: "The problem is fixed, the client is in the loop, and it won't happen at the next launch."
      },
      "rolled-back": {
        title: "Launch undone",
        verdict: "mixed",
        summary: "Email recovers once the old nameservers propagate, but the new site is offline and the launch has to be redone.",
        t: "Reverting nameservers restored the old zone in full, including web records, and added another propagation delay.",
        p: "Email came back, but the new website went away with it."
      },
      "waited-it-out": {
        title: "Still no email tomorrow",
        verdict: "bad",
        summary: "The records were never recreated, so mail stays down until someone checks the zone.",
        t: "Propagation only spreads records that exist; the new zone had no MX records to spread.",
        p: "Waiting doesn't fix a missing setting."
      },
      "fixed-quietly": {
        title: "Fixed, but nobody knows",
        verdict: "mixed",
        summary: "Mail works, but bounced messages from the outage are lost and the same gap waits for the next launch.",
        t: "The technical cause is fixed but not the process cause, and the client can't act on what they missed.",
        p: "It works now, but the client is in the dark and it will happen again."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:all", "s3:0"]
    }
  },

  {
    id: "noindex-left-on-after-launch",
    title: "Search traffic vanished after launch",
    s: "Debugging",
    level: "Author",
    stage: 1,
    d: 2,
    priorities: { speed: 2, security: 1, stability: 2, rootCause: 3, communication: 2 },
    intro: "Three weeks after a redesign launched, the client says leads from search have dropped sharply. Search Console shows most pages as \"Excluded by 'noindex' tag\". The production database was copied from the password-protected staging site at launch.",
    timeNotes: "Recrawl time (days to weeks) comes from Google's recrawl documentation. Minutes for checks and setting changes are judgment.",
    refs: [
      "https://make.wordpress.org/core/2019/09/02/changes-to-prevent-search-engines-indexing-sites/",
      "https://developer.wordpress.org/reference/functions/wp_robots_no_robots/",
      "https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl"
    ],
    start: "s1",
    steps: {
      s1: {
        type: "single",
        prompt: "What's your first move?",
        options: [
          {
            text: "View the source of a live page for a robots meta tag, and check Settings > Reading on production",
            m: { speed: 1, rootCause: 2 },
            min: [5, 10],
            t: "Since WordPress 5.3, 'Discourage search engines' outputs a noindex robots meta tag, and the blog_public option travels with a copied database. Checking the HTML confirms what crawlers actually see.",
            p: "Look at what Google sees on the page, then at the setting that usually causes it.",
            next: "s2"
          },
          {
            text: "Add Allow: / to robots.txt",
            m: { speed: -1, rootCause: -2 },
            min: 5,
            t: "robots.txt controls crawling, and the pages are already being crawled; the noindex comes from the page itself.",
            p: "That's the wrong file. The block is on the pages.",
            next: "o:wrong-file"
          },
          {
            text: "Resubmit the sitemap and request indexing for every page",
            m: { speed: -1, rootCause: -2 },
            min: [20, 40],
            t: "Google will recrawl and find the same noindex tag. The requests use up the URL Inspection quota without changing anything.",
            p: "Asking Google to look again doesn't help while the pages still say 'don't list me'.",
            next: "o:resubmitted"
          }
        ]
      },
      s2: {
        type: "single",
        prompt: "The setting is on in production. How do you fix it?",
        options: [
          {
            text: "Turn the setting off on production, purge the page cache and CDN, then confirm the tag is gone from live HTML",
            m: { speed: 1, rootCause: 2, stability: 1 },
            min: [5, 15],
            t: "Changing blog_public removes the tag at render time, but cached HTML can keep serving the old tag until it's purged.",
            p: "Flip the switch, clear the stored copies, and check the live page.",
            next: "s3"
          },
          {
            text: "Copy the staging database to production again, after fixing the setting on staging",
            m: { stability: -2, speed: -1 },
            min: [30, 60],
            t: "Overwriting production discards three weeks of form entries, content edits and users, and it's a far bigger change than one option.",
            p: "That wipes out everything that happened on the live site since launch.",
            next: "o:overwrote-content"
          }
        ]
      },
      s3: {
        type: "multi",
        prompt: "The tag is gone. What else do you do? Select all that apply.",
        missPenalty: { rootCause: -1, communication: -1 },
        options: [
          {
            text: "Request indexing for the most important pages and resubmit the sitemap",
            good: true,
            m: { speed: 1 },
            t: "Google suggests URL Inspection for individual pages and a sitemap for many URLs. Recrawling still takes days to weeks.",
            p: "Now that the block is gone, ask Google to come back."
          },
          {
            text: "Check that no SEO plugin also sets noindex on page types or individual pages",
            good: true,
            m: { rootCause: 1 },
            t: "A second noindex source would keep some pages excluded after the core setting is fixed.",
            p: "Make sure nothing else is still hiding pages."
          },
          {
            text: "Add 'search engine visibility on, noindex absent' to the launch checklist",
            good: true,
            critical: true,
            m: { rootCause: 1, stability: 1 },
            t: "The database copy will carry the setting again at the next launch unless a check catches it.",
            p: "Make sure the next launch can't repeat this."
          },
          {
            text: "Tell the client what happened and that recovery in search will take days to weeks",
            good: true,
            m: { communication: 2 },
            t: "Recrawling and reindexing aren't instant or guaranteed, so set expectations.",
            p: "Be clear that traffic will come back gradually, not overnight."
          },
          {
            text: "Change the permalink structure to force Google to treat the pages as new",
            good: false,
            m: { stability: -2 },
            t: "New URLs throw away existing signals and create a redirect project, with no benefit.",
            p: "That creates a new problem rather than fixing the old one."
          }
        ],
        next: "o:recovered"
      }
    },
    outcomes: {
      recovered: {
        title: "Back in the index",
        verdict: "good",
        summary: "The noindex is gone, Google is recrawling, the client knows the timeline, and the launch checklist catches it next time.",
        t: "Fixing blog_public at the source and purging caches removed the tag. Recrawl requests and the checklist dealt with recovery and prevention.",
        p: "The site is visible again, and the next launch won't repeat the mistake."
      },
      "wrong-file": {
        title: "Still invisible",
        verdict: "bad",
        summary: "robots.txt changes don't touch the meta tag, so pages stay excluded.",
        t: "The noindex lives in each page's HTML, not in robots.txt.",
        p: "The block is still on every page."
      },
      resubmitted: {
        title: "Google looked again and left",
        verdict: "bad",
        summary: "Google recrawled, saw the same noindex, and kept the pages out.",
        t: "Recrawl requests only help after the directive is removed.",
        p: "Asking again doesn't help until the 'don't list me' note is removed."
      },
      "overwrote-content": {
        title: "Fixed one thing, lost three weeks",
        verdict: "bad",
        summary: "The noindex is gone, but recent leads, edits and users on production are lost.",
        t: "A full database copy over a live site discards everything written since the last copy.",
        p: "The site is visible again, but recent work and enquiries are gone."
      }
    },
    ideal: {
      safest: ["s1:0", "s2:0", "s3:all"]
    }
  }
];
