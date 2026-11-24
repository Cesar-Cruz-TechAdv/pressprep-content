/*
 * pressprep-data.js – shared rules for PressPrep's question and scenario files.
 * Used by validate.js (command line / CI) and editor.html (browser), so both
 * check content the same way and write files in the same format.
 *
 * Works in Node (module.exports) and in the browser (window.PressPrepData).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PressPrepData = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SECTIONS = ['WordPress Core', 'Custom Development', 'Security', 'Performance',
    'Change Management', 'Debugging', 'Scalability', 'Disaster Recovery'];
  const ROLES = ['Subscriber', 'Contributor', 'Author', 'Editor', 'Administrator'];
  const METERS = ['speed', 'security', 'stability', 'rootCause', 'communication'];
  const METER_LABELS = { speed: 'Speed', security: 'Security', stability: 'Stability', rootCause: 'Root cause', communication: 'Communication' };
  const VERDICTS = ['good', 'ok', 'mixed', 'bad'];

  const isStr = v => typeof v === 'string' && v.trim().length > 0;
  const isInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;

  function report() {
    const errors = [], warnings = [];
    return {
      errors, warnings,
      err: (where, msg) => errors.push({ where, msg }),
      warn: (where, msg) => warnings.push({ where, msg })
    };
  }

  /* ---------- Questions ---------- */
  function validateQuestions(list) {
    const r = report();
    if (!Array.isArray(list)) { r.err('questions', 'QUESTION_BANK is missing or is not a list'); return r; }
    const seenText = new Map(), seenIds = new Set();
    list.forEach((q, i) => {
      const where = `Question ${i + 1}` + (isStr(q && q.q) ? ` ("${q.q.slice(0, 50)}${q.q.length > 50 ? '…' : ''}")` : '');
      if (!q || typeof q !== 'object') { r.err(where, 'is not an object'); return; }
      if (!SECTIONS.includes(q.s)) r.err(where, `section "s" must be one of: ${SECTIONS.join(', ')}`);
      if (!isInt(q.d, 1, 3)) r.err(where, 'difficulty "d" must be 1, 2 or 3');
      if (!isStr(q.q)) r.err(where, 'question text "q" is empty');
      if (!Array.isArray(q.o) || q.o.length < 2 || q.o.length > 6) r.err(where, 'needs 2 to 6 options in "o"');
      else {
        q.o.forEach((o, k) => { if (!isStr(o)) r.err(where, `option ${k + 1} is empty`); });
        const norm = q.o.map(o => String(o).trim().toLowerCase());
        if (new Set(norm).size !== norm.length) r.err(where, 'two options have the same text');
        if (norm.some(o => /^(all|none) of the above$/.test(o))) r.warn(where, '"all/none of the above" doesn\'t work because options are shuffled');
        const n = q.o.length;
        if (Array.isArray(q.a)) {
          if (q.a.length === 0) r.err(where, 'multi-select answer "a" lists no correct options');
          if (q.a.some(x => !isInt(x, 0, n - 1))) r.err(where, `answer "a" has an index outside 0–${n - 1}`);
          if (new Set(q.a).size !== q.a.length) r.err(where, 'answer "a" lists the same option twice');
          if (q.a.length === n) r.warn(where, 'every option is correct, so the question can\'t be failed');
        } else if (!isInt(q.a, 0, n - 1)) r.err(where, `answer "a" must be an index from 0 to ${n - 1}, or a list of them`);
        else {
          // The longest option shouldn't give the answer away.
          const len = q.o.map(o => String(o).length);
          const wrong = Math.max(...len.filter((_, k) => k !== q.a));
          if (len[q.a] > 1.1 * wrong) r.warn(where, `the correct option is ${(len[q.a] / wrong).toFixed(1)}× longer than the longest wrong one, which gives it away; trim it or make the wrong options fuller`);
        }
      }
      if (!isStr(q.t)) r.err(where, 'technical explanation "t" is empty');
      if (!isStr(q.p)) r.err(where, 'plain-English explanation "p" is empty');
      if (q.level !== undefined && !ROLES.includes(q.level)) r.err(where, `level must be one of: ${ROLES.join(', ')}`);
      if (q.stage !== undefined && !isInt(q.stage, 1, 3)) r.err(where, 'stage must be 1, 2 or 3');
      if (q.refs !== undefined && (!Array.isArray(q.refs) || q.refs.some(u => !/^https:\/\//.test(u)))) r.err(where, 'refs must be a list of https:// links');
      if (!isStr(q.id) || !/^q-\d{4,}$/.test(q.id)) r.err(where, 'id must look like "q-0123" (the editor assigns it; never reuse or change one)');
      else { if (seenIds.has(q.id)) r.err(where, `id "${q.id}" is used twice`); seenIds.add(q.id); }
      if (isStr(q.q)) {
        const key = q.q.trim().toLowerCase();
        if (seenText.has(key)) r.err(where, `same question text as question ${seenText.get(key) + 1}`);
        else seenText.set(key, i);
      }
    });
    return r;
  }

  /* ---------- Scenarios ---------- */
  function checkMeters(r, where, m, label) {
    if (!m || typeof m !== 'object') { r.err(where, `${label} is missing`); return; }
    Object.entries(m).forEach(([k, v]) => {
      if (!METERS.includes(k)) r.err(where, `${label} uses unknown meter "${k}" (use ${METERS.join(', ')})`);
      else if (!isInt(v, -2, 2)) r.err(where, `${label}.${k} must be a whole number from -2 to 2`);
    });
  }

  function targetOf(sc, ref) {
    if (typeof ref !== 'string') return null;
    if (ref.startsWith('o:')) return sc.outcomes && sc.outcomes[ref.slice(2)] ? { kind: 'outcome', id: ref.slice(2) } : null;
    return sc.steps && sc.steps[ref] ? { kind: 'step', id: ref } : null;
  }

  function nextsOf(step) {
    if (!step) return [];
    const skip = step.ifMissed ? [step.skipTo] : [];
    if (step.type === 'multi') return [step.next, ...skip];
    return [...(step.options || []).map(o => o.next), ...skip];
  }

  function validateScenarios(list) {
    const r = report();
    if (!Array.isArray(list)) { r.err('scenarios', 'SCENARIO_BANK is missing or is not a list'); return r; }
    const ids = new Set();
    list.forEach((sc, i) => {
      const where = `Scenario ${i + 1}` + (sc && isStr(sc.id) ? ` (${sc.id})` : '');
      if (!sc || typeof sc !== 'object') { r.err(where, 'is not an object'); return; }
      if (!isStr(sc.id) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(sc.id)) r.err(where, 'id must be lower-case words joined by hyphens');
      else if (ids.has(sc.id)) r.err(where, 'id is used twice'); else ids.add(sc.id);
      if (!isStr(sc.title)) r.err(where, 'title is empty');
      if (!SECTIONS.includes(sc.s)) r.err(where, `section "s" must be one of: ${SECTIONS.join(', ')}`);
      if (!ROLES.includes(sc.level)) r.err(where, `level must be one of: ${ROLES.join(', ')}`);
      if (!isInt(sc.stage, 1, 3)) r.err(where, 'stage must be 1, 2 or 3');
      if (!isInt(sc.d, 1, 3)) r.err(where, 'difficulty "d" must be 1, 2 or 3');
      if (!sc.priorities || METERS.some(k => !isInt(sc.priorities[k], 1, 3))) r.err(where, `priorities needs ${METERS.join(', ')}, each 1–3`);
      if (!isStr(sc.intro)) r.err(where, 'intro is empty');
      if (sc.refs !== undefined && (!Array.isArray(sc.refs) || sc.refs.some(u => !/^https:\/\//.test(u)))) r.err(where, 'refs must be a list of https:// links');
      if (sc.timeNotes !== undefined && !isStr(sc.timeNotes)) r.err(where, 'timeNotes must be text');
      else if (sc.timeNotes === undefined) r.warn(where, 'timeNotes is missing: say where the time estimates come from');
      const steps = sc.steps && typeof sc.steps === 'object' ? sc.steps : null;
      const outcomes = sc.outcomes && typeof sc.outcomes === 'object' ? sc.outcomes : null;
      if (!steps || !Object.keys(steps).length) { r.err(where, 'has no steps'); return; }
      if (!outcomes || !Object.keys(outcomes).length) { r.err(where, 'has no outcomes'); return; }
      if (!steps[sc.start]) r.err(where, `start "${sc.start}" is not a step`);

      Object.entries(steps).forEach(([sid, st]) => {
        const w = `${where} › step ${sid}`;
        if (!st || (st.type !== 'single' && st.type !== 'multi')) { r.err(w, 'type must be "single" or "multi"'); return; }
        if (!isStr(st.prompt)) r.err(w, 'prompt is empty');
        if (!Array.isArray(st.options) || st.options.length < 2) { r.err(w, 'needs at least 2 options'); return; }
        if (st.ifMissed !== undefined) {
          const [ms, mk] = String(st.ifMissed).split(':');
          const m = steps[ms];
          if (!m || m.type !== 'multi' || !m.options?.[Number(mk)]) r.err(w, `ifMissed "${st.ifMissed}" must be "<multi step id>:<option index>"`);
          if (!targetOf(sc, st.skipTo)) r.err(w, `skipTo "${st.skipTo}" doesn't point to a step or "o:<outcome>"`);
        }
        if (st.type === 'multi') {
          if (!targetOf(sc, st.next)) r.err(w, `next "${st.next}" doesn't point to a step or "o:<outcome>"`);
          if (st.missPenalty) checkMeters(r, w, st.missPenalty, 'missPenalty');
          if (!st.options.some(o => o.good === true)) r.err(w, 'no option is marked good');
          if (st.options.some(o => o.critical && !o.good)) r.warn(w, 'an option is critical but not good');
          if (st.options.some(o => o.critical) && !st.missPenalty) r.warn(w, 'has critical options but no missPenalty');
        }
        st.options.forEach((o, k) => {
          const wo = `${w} › option ${k + 1}`;
          if (!isStr(o.text)) r.err(wo, 'text is empty');
          checkMeters(r, wo, o.m, 'm');
          if (!isStr(o.t)) r.err(wo, 'technical feedback "t" is empty');
          if (!isStr(o.p)) r.err(wo, 'plain-English feedback "p" is empty');
          if (st.type === 'single') {
            if (!targetOf(sc, o.next)) r.err(wo, `next "${o.next}" doesn't point to a step or "o:<outcome>"`);
            if (o.min !== undefined) {
              const okNum = x => typeof x === 'number' && x >= 0;
              const ok = okNum(o.min) || (Array.isArray(o.min) && o.min.length === 2 && o.min.every(okNum) && o.min[0] <= o.min[1]);
              if (!ok) r.err(wo, 'min must be minutes (0 or more) or a range like [15, 60]');
            }
          } else if (typeof o.good !== 'boolean') r.err(wo, 'good must be true or false');
        });
      });

      Object.entries(outcomes).forEach(([oid, oc]) => {
        const w = `${where} › outcome ${oid}`;
        if (!isStr(oc.title)) r.err(w, 'title is empty');
        if (!VERDICTS.includes(oc.verdict)) r.err(w, `verdict must be one of: ${VERDICTS.join(', ')}`);
        if (!isStr(oc.summary)) r.err(w, 'summary is empty');
        if (!isStr(oc.t) || !isStr(oc.p)) r.err(w, 'needs both explanations "t" and "p"');
      });

      // reachability from start
      const seen = new Set(), outSeen = new Set(), queue = steps[sc.start] ? [sc.start] : [];
      while (queue.length) {
        const sid = queue.shift(); if (seen.has(sid)) continue; seen.add(sid);
        nextsOf(steps[sid]).forEach(ref => {
          const t = targetOf(sc, ref); if (!t) return;
          if (t.kind === 'step') queue.push(t.id); else outSeen.add(t.id);
        });
      }
      Object.keys(steps).forEach(sid => { if (!seen.has(sid)) r.err(where, `step "${sid}" can't be reached from the start`); });
      Object.keys(outcomes).forEach(oid => { if (!outSeen.has(oid)) r.err(where, `outcome "${oid}" can't be reached`); });
      // every reachable step must be able to reach an outcome (no dead loops)
      const canEnd = new Set(); let changed = true;
      while (changed) {
        changed = false;
        Object.keys(steps).forEach(sid => {
          if (canEnd.has(sid)) return;
          if (nextsOf(steps[sid]).some(ref => { const t = targetOf(sc, ref); return t && (t.kind === 'outcome' || canEnd.has(t.id)); })) { canEnd.add(sid); changed = true; }
        });
      }
      seen.forEach(sid => { if (!canEnd.has(sid)) r.err(where, `step "${sid}" never leads to an outcome (loop with no exit)`); });

      // ideal paths
      if (!sc.ideal || !Object.keys(sc.ideal).length) r.warn(where, 'no ideal paths defined');
      else Object.entries(sc.ideal).forEach(([name, path]) => {
        const w = `${where} › ideal path ${name}`;
        if (!Array.isArray(path) || !path.length) { r.err(w, 'is empty'); return; }
        let expected = sc.start, endRef = null;
        for (const entry of path) {
          const [sid, pick] = String(entry).split(':');
          const st = steps[sid];
          if (!st) { r.err(w, `"${entry}" names an unknown step`); return; }
          if (sid !== expected) { r.err(w, `"${entry}" doesn't follow from the previous step (expected ${expected})`); return; }
          let ref;
          if (st.type === 'multi') { if (pick !== 'all') r.warn(w, `"${entry}": use "${sid}:all" for multi-select steps`); ref = st.next; }
          else { const o = st.options[Number(pick)]; if (!o) { r.err(w, `"${entry}" picks an option that doesn't exist`); return; } ref = o.next; }
          let t = targetOf(sc, ref); if (!t) return;
          // Ideal paths pick every good option, so consequence steps for those options are skipped.
          while (t && t.kind === 'step' && steps[t.id].ifMissed) {
            const [ms, mk] = String(steps[t.id].ifMissed).split(':');
            if (!steps[ms]?.options?.[Number(mk)]?.good) break;
            t = targetOf(sc, steps[t.id].skipTo);
          }
          if (!t) return;
          if (t.kind === 'outcome') { endRef = t.id; break; }
          expected = t.id;
        }
        if (!endRef) r.err(w, 'doesn\'t end at an outcome');
        else if (outcomes[endRef] && ['bad', 'mixed'].includes(outcomes[endRef].verdict)) r.warn(w, `ends at a ${outcomes[endRef].verdict} outcome (${endRef})`);
      });
    });
    return r;
  }

  /* ---------- Reading files ---------- */
  // Evaluate a questions.js / scenarios.js file's text and return its array.
  function parseBankFile(text, globalName) {
    const win = {};
    // eslint-disable-next-line no-new-func
    new Function('window', String(text))(win);
    return win[globalName];
  }
  function headerOf(text, globalName) {
    if (!globalName) throw new Error('headerOf(text, globalName): globalName is required');
    const i = String(text).indexOf('window.' + globalName);
    return i > 0 ? String(text).slice(0, i).trimEnd() + '\n' : '';
  }

  /* ---------- Writing files (stable, readable JS) ---------- */
  const keyStr = k => /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
  function lit(v, ind) {
    ind = ind || '';
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    const flat = JSON.stringify(v);
    const nested = Array.isArray(v) ? v.some(x => x && typeof x === 'object') : Object.values(v).some(x => x && typeof x === 'object');
    if (!nested && flat.length <= 100) {
      return Array.isArray(v) ? '[' + v.map(x => lit(x)).join(', ') + ']'
        : '{ ' + Object.entries(v).map(([k, x]) => keyStr(k) + ': ' + lit(x)).join(', ') + ' }';
    }
    const inner = ind + '  ';
    if (Array.isArray(v)) return '[\n' + v.map(x => inner + lit(x, inner)).join(',\n') + '\n' + ind + ']';
    return '{\n' + Object.entries(v).filter(([, x]) => x !== undefined).map(([k, x]) => inner + keyStr(k) + ': ' + lit(x, inner)).join(',\n') + '\n' + ind + '}';
  }

  const Q_ORDER = ['id', 's', 'd', 'level', 'stage', 'q', 'o', 'a', 't', 'p', 'refs'];
  function questionLiteral(q) {
    const keys = Q_ORDER.filter(k => q[k] !== undefined).concat(Object.keys(q).filter(k => !Q_ORDER.includes(k)));
    const lines = [];
    const head = ['s', 'd', 'level', 'stage'].filter(k => q[k] !== undefined).map(k => `${k}: ${lit(q[k])}`).join(', ');
    if (q.id !== undefined) lines.push(`id: ${lit(q.id)}`);
    if (head) lines.push(head);
    keys.filter(k => !['id', 's', 'd', 'level', 'stage'].includes(k)).forEach(k => lines.push(`${keyStr(k)}: ${lit(q[k], '    ')}`));
    return '  {\n' + lines.map(l => '    ' + l).join(',\n') + '\n  }';
  }
  function toQuestionsFile(list, header) {
    return (header || '') + 'window.QUESTION_BANK = [\n' + list.map(questionLiteral).join(',\n') + '\n];\n';
  }
  function toScenariosFile(list, header) {
    return (header || '') + 'window.SCENARIO_BANK = [\n' + list.map(sc => '  ' + lit(sc, '  ')).join(',\n\n') + '\n];\n';
  }

  return { SECTIONS, ROLES, METERS, METER_LABELS, VERDICTS, validateQuestions, validateScenarios,
    parseBankFile, headerOf, toQuestionsFile, toScenariosFile };
});
