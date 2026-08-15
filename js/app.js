/* ============================================================
   NEUROMATCH — app logic
   ============================================================ */
const root = document.getElementById("app");
const STORAGE_KEY = "nm_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveProgress() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      decisions: state.decisions,
      matches: state.matches,
      chatState: state.chatState,
      theme: state.theme,
      achievements: state.achievements,
      reconsiderCount: state.reconsiderCount,
      themeChangedManually: state.themeChangedManually,
    })
  );
}

const saved = loadProgress();

let state = {
  screen: "scan",
  decisions: (saved && saved.decisions) || {}, // id -> 'yes' | 'no'
  matches: (saved && saved.matches) || [], // array of ids
  chatState: (saved && saved.chatState) || {}, // id -> { tone, completed, progressIndex }
  theme: (saved && saved.theme) || "night-court",
  achievements: (saved && saved.achievements) || [], // array of unlocked achievement ids
  reconsiderCount: (saved && saved.reconsiderCount) || 0,
  themeChangedManually: (saved && saved.themeChangedManually) || false,
  activeMatchId: null,
  chatTimers: [],
};

function applyTheme(key) {
  state.theme = key;
  document.getElementById("phone").setAttribute("data-theme", key);
  renderThemeFx(key);
  saveProgress();
}
applyTheme(state.theme);

function renderThemeFx(key) {
  const layer = document.getElementById("theme-fx");
  if (!layer) return;
  layer.replaceChildren();
  void layer.offsetHeight; // force a reflow so old particles are fully gone before new ones mount
  const fx = THEME_FX[key] || THEME_FX.default;
  fx.particles.forEach((emoji) => {
    const span = document.createElement("span");
    span.className = "fx-particle";
    span.textContent = emoji;
    const left = 6 + Math.random() * 88;
    const duration = (12 + Math.random() * 8).toFixed(1);
    const delay = (-Math.random() * duration).toFixed(1);
    const size = (14 + Math.random() * 9).toFixed(0);
    const drift = (Math.random() * 30 - 15).toFixed(0);
    span.style.left = left + "%";
    span.style.fontSize = size + "px";
    span.style.animationDuration = duration + "s";
    span.style.animationDelay = delay + "s";
    span.style.setProperty("--drift", drift + "px");
    layer.appendChild(span);
  });
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function clearChatTimers() {
  state.chatTimers.forEach((t) => clearTimeout(t));
  state.chatTimers = [];
}

function getMatch(id) {
  return MATCHES.find((m) => m.id === id);
}

function photoMarkup(match) {
  if (match.photo) {
    return `<img src="${match.photo}" alt="${match.name}">`;
  }
  return `
    <div class="ph-emoji">${match.emoji}</div>
    <div class="ph-note">PHOTO COMING SOON</div>
  `;
}

function completedCount() {
  return Object.values(state.chatState).filter((c) => c.completed).length;
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
function achievementSatisfied(id) {
  switch (id) {
    case "first-swipe":
      return Object.keys(state.decisions).length >= 1;
    case "first-match":
      return state.matches.length >= 1;
    case "breaking-ice":
      return completedCount() >= 1;
    case "serial-dater":
      return completedCount() >= 5;
    case "heartbreaker":
      return Object.values(state.decisions).filter((d) => d === "no").length >= 5;
    case "second-chances":
      return (state.reconsiderCount || 0) >= 1;
    case "new-look":
      return !!state.themeChangedManually;
    case "full-house":
      return state.matches.length >= MATCHES.length;
    case "truth-comes-out":
      return completedCount() >= CONFIG.REVEAL_UNLOCK_COUNT;
    case "completionist":
      return completedCount() >= MATCHES.length;
    default:
      return false;
  }
}

function checkAchievements() {
  const newlyUnlocked = [];
  ACHIEVEMENTS.forEach((a) => {
    if (!state.achievements.includes(a.id) && achievementSatisfied(a.id)) {
      state.achievements.push(a.id);
      newlyUnlocked.push(a);
    }
  });
  if (newlyUnlocked.length > 0) {
    saveProgress();
    queueAchievementToasts(newlyUnlocked);
  }
}

let toastQueue = [];
let toastShowing = false;
function queueAchievementToasts(list) {
  toastQueue.push(...list);
  if (!toastShowing) showNextToast();
}
function showNextToast() {
  if (toastQueue.length === 0) {
    toastShowing = false;
    return;
  }
  toastShowing = true;
  const a = toastQueue.shift();
  const toast = el(`
    <div class="achievement-toast">
      <div class="at-icon">${a.icon}</div>
      <div>
        <div class="at-label">Achievement Unlocked</div>
        <div class="at-title">${a.title}</div>
      </div>
    </div>
  `);
  const phone = document.getElementById("phone");
  phone.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
      showNextToast();
    }, 400);
  }, 2600);
}

function goto(screen) {
  clearChatTimers();
  state.screen = screen;
  render();
}

/* ============================================================
   RENDER DISPATCH
   ============================================================ */
function render() {
  root.innerHTML = "";
  const bar = el(`
    <div class="status-bar">
      <span class="brand">${CONFIG.APP_NAME}</span>
      <span>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
    </div>
  `);
  root.appendChild(bar);

  const settingsBtn = el(`<button class="settings-btn" title="Settings">&#9881;&#65039;</button>`);
  settingsBtn.addEventListener("click", openSettings);
  root.appendChild(settingsBtn);

  const screens = {
    scan: renderScan,
    welcome: renderWelcome,
    thinking: renderThinking,
    swipe: renderSwipe,
    matches: renderMatches,
    style: renderStyleSelect,
    chat: renderChat,
    reveal: renderReveal,
  };
  (screens[state.screen] || renderScan)();
}

/* ============================================================
   SETTINGS MODAL — theme picker + full reset
   ============================================================ */
function openSettings() {
  const modal = el(`
    <div class="match-modal settings-modal">
      <div class="settings-head">
        <h1>Settings</h1>
        <button class="close-x" id="settings-close">&#10005;</button>
      </div>
      <div class="section-label" style="margin-top:6px;">App Theme</div>
      <div class="theme-grid" id="theme-grid"></div>
      <div class="section-label">Achievements <span class="ach-count">(${state.achievements.length}/${ACHIEVEMENTS.length})</span></div>
      <div class="achievements-list" id="achievements-list"></div>
      <div class="section-label danger-label">Danger Zone</div>
      <button class="btn btn-ghost btn-block danger-btn" id="settings-reset">Reset All Progress</button>
    </div>
  `);
  document.getElementById("phone").appendChild(modal);
  modal.querySelector("#settings-close").addEventListener("click", () => modal.remove());

  const grid = modal.querySelector("#theme-grid");
  THEMES.forEach((t) => {
    const card = el(`
      <button class="theme-swatch ${state.theme === t.key ? "active" : ""}">
        <span class="swatch-dot" data-swatch="${t.key}"></span>
        <span class="swatch-text">
          <span class="swatch-label">${t.label}</span>
          <span class="swatch-desc">${t.desc}</span>
        </span>
        <span class="swatch-check">&#10003;</span>
      </button>
    `);
    card.addEventListener("click", () => {
      applyTheme(t.key);
      state.themeChangedManually = true;
      checkAchievements();
      grid.querySelectorAll(".theme-swatch").forEach((n) => n.classList.remove("active"));
      card.classList.add("active");
    });
    grid.appendChild(card);
  });

  const achWrap = modal.querySelector("#achievements-list");
  ACHIEVEMENTS.forEach((a) => {
    const unlocked = state.achievements.includes(a.id);
    achWrap.appendChild(el(`
      <div class="ach-row ${unlocked ? "unlocked" : ""}">
        <div class="ach-icon">${unlocked ? a.icon : "\ud83d\udd12"}</div>
        <div class="ach-text">
          <div class="ach-title">${a.title}</div>
          <div class="ach-desc">${a.desc}</div>
        </div>
        ${unlocked ? '<div class="ach-check">&#10003;</div>' : ""}
      </div>
    `));
  });

  modal.querySelector("#settings-reset").addEventListener("click", () => {
    if (confirm("Reset all swipes, matches, and chat progress? This can't be undone.")) {
      localStorage.removeItem(STORAGE_KEY);
      location.reload();
    }
  });
}

/* ============================================================
   SCREEN 1 — FAKE FACE SCAN
   ============================================================ */
function renderScan() {
  const s = el(`
    <div class="screen center">
      <div class="scan-frame">
        <div class="corner tl"></div><div class="corner tr"></div>
        <div class="corner bl"></div><div class="corner br"></div>
        <div class="scan-icon">&#128100;</div>
        <div class="scan-line"></div>
      </div>
      <div class="scan-status" id="scan-status">Initializing FaceMatch\u2122 AI...</div>
      <div class="scan-confirmed" id="scan-confirmed"></div>
    </div>
  `);
  root.appendChild(s);

  const statusEl = s.querySelector("#scan-status");
  const confirmedEl = s.querySelector("#scan-confirmed");
  const lines = ["Initializing FaceMatch\u2122 AI...", "Locating face...", "Analyzing features...", "Cross-checking beauty database..."];
  let i = 0;
  const iv = setInterval(() => {
    i++;
    if (i < lines.length) {
      statusEl.textContent = lines[i];
    } else {
      clearInterval(iv);
      statusEl.textContent = "Identity confirmed.";
      confirmedEl.textContent = `\u2728 ${CONFIG.HER_NAME} \u2728`;
      setTimeout(() => goto("welcome"), CONFIG.SCAN_CONFIRM_PAUSE_MS);
    }
  }, CONFIG.SCAN_LINE_INTERVAL_MS);
}

/* ============================================================
   SCREEN 2 — WELCOME
   ============================================================ */
function renderWelcome() {
  const s = el(`
    <div class="screen center">
      <div class="welcome-title">Hello, <span>${CONFIG.HER_NAME}</span>.<br>You look radiant today.</div>
      <div class="welcome-sub">Let me find your top matches. I've already got a few in mind.</div>
      <div class="welcome-desc">${CONFIG.APP_NAME} is the dating service where AI does the messaging for you. Swipe on your matches, pick a vibe, and I'll handle every conversation myself \u2014 flirty, casual, or chaotic. You just sit back and enjoy the ride.</div>
      <button class="btn btn-primary" id="start-btn">Find My Matches</button>
    </div>
  `);
  root.appendChild(s);
  s.querySelector("#start-btn").addEventListener("click", () => goto("thinking"));
}

/* ============================================================
   SCREEN 3 — AI "THINKING" + CHECKLIST
   ============================================================ */
function renderThinking() {
  const s = el(`
    <div class="screen">
      <div class="spacer" style="flex:0.3"></div>
      <div class="think-log" id="think-log"><span class="cursor"></span></div>
      <ul class="checklist" id="checklist"></ul>
      <div class="spacer"></div>
    </div>
  `);
  root.appendChild(s);

  const logEl = s.querySelector("#think-log");
  const listEl = s.querySelector("#checklist");

  CHECKLIST_ITEMS.forEach((text) => {
    const li = el(`<li><div class="tick"></div><div>${text}</div></li>`);
    listEl.appendChild(li);
  });

  let li = 0;
  function nextLine() {
    if (li < THINKING_LINES.length) {
      logEl.innerHTML = `${THINKING_LINES[li]}<span class="cursor"></span>`;
      li++;
      setTimeout(nextLine, CONFIG.THINKING_LINE_INTERVAL_MS);
    } else {
      logEl.innerHTML = `Analysis complete.<span class="cursor"></span>`;
      tickChecklist(0);
    }
  }

  function tickChecklist(idx) {
    if (idx >= listEl.children.length) {
      setTimeout(() => goto("swipe"), CONFIG.THINKING_TO_SWIPE_PAUSE_MS);
      return;
    }
    listEl.children[idx].classList.add("done");
    listEl.children[idx].querySelector(".tick").innerHTML = "&#10003;";
    setTimeout(() => tickChecklist(idx + 1), CONFIG.CHECKLIST_TICK_INTERVAL_MS);
  }

  nextLine();
}

/* ============================================================
   SCREEN 4 — SWIPE DECK
   ============================================================ */
function nextUndecidedIndex(fromIndex) {
  for (let i = fromIndex; i < MATCHES.length; i++) {
    if (!state.decisions[MATCHES[i].id]) return i;
  }
  return -1;
}

function renderSwipe() {
  const idx = nextUndecidedIndex(0);

  const s = el(`
    <div class="screen">
      <div class="deck-header">
        <h2>Your Matches</h2>
        <p id="deck-count"></p>
      </div>
      <div class="deck-wrap" id="deck-wrap"></div>
      <div class="deck-controls" id="deck-controls"></div>
    </div>
  `);
  root.appendChild(s);

  const wrap = s.querySelector("#deck-wrap");
  const countEl = s.querySelector("#deck-count");
  const remaining = MATCHES.filter((m) => !state.decisions[m.id]).length;
  countEl.textContent = idx === -1 ? "All matches reviewed" : `${remaining} left to review`;

  if (idx === -1) {
    wrap.appendChild(el(`<div class="deck-empty">That's everyone the AI found for now.<br>Check your matches below.</div>`));
    s.querySelector("#deck-controls").appendChild(
      buildBtn("View My Matches", "btn-primary", () => goto("matches"))
    );
    sizeDeckWrap(wrap);
    return;
  }

  // render up to 2 cards behind the top card for depth
  const controls = s.querySelector("#deck-controls");
  const stackIds = [];
  for (let i = idx; i < Math.min(idx + 3, MATCHES.length); i++) {
    if (!state.decisions[MATCHES[i].id]) stackIds.push(MATCHES[i].id);
  }
  stackIds
    .slice()
    .reverse()
    .forEach((id, revI) => {
      const depth = stackIds.length - 1 - revI;
      const match = getMatch(id);
      const card = buildCard(match, depth);
      wrap.appendChild(card);
      if (depth === 0) attachSwipeHandlers(card, match);
    });

  const nopeBtn = el(`<button class="circle-btn nope">&#10005;</button>`);
  const likeBtn = el(`<button class="circle-btn like">&#10084;</button>`);
  const matchesBtn = el(`<button class="circle-btn matches">&#9776;</button>`);
  const activeCount = state.matches.length - completedCount();
  if (activeCount > 0) {
    matchesBtn.appendChild(el(`<span class="badge">${activeCount}</span>`));
  }
  nopeBtn.addEventListener("click", () => decide(getMatch(stackIds[0]).id, "no"));
  likeBtn.addEventListener("click", () => decide(getMatch(stackIds[0]).id, "yes"));
  matchesBtn.addEventListener("click", () => goto("matches"));
  controls.appendChild(nopeBtn);
  controls.appendChild(likeBtn);
  controls.appendChild(matchesBtn);

  sizeDeckWrap(wrap);
}

// Percentage heights on absolutely-positioned children of a flex:1
// container are handled inconsistently across browsers. To sidestep that
// entirely: let flex:1 do what it's reliably good at (filling the
// remaining space naturally), measure the result, then lock that in as an
// explicit pixel height so the card's percentage-height has a definite,
// unambiguous value to resolve against.
function sizeDeckWrap(wrap) {
  function lockHeight() {
    if (!wrap.isConnected) {
      window.removeEventListener("resize", lockHeight);
      return;
    }
    wrap.style.height = "";
    const resolved = wrap.getBoundingClientRect().height;
    wrap.style.height = Math.max(280, resolved) + "px";
  }
  lockHeight();
  window.addEventListener("resize", lockHeight);
}

function buildCard(match, depth) {
  const scale = 1 - depth * 0.04;
  const translateY = depth * 14;
  const card = el(`
    <div class="card" style="transform: translateY(${translateY}px) scale(${scale}); z-index:${10 - depth}; opacity:${depth > 1 ? 0.5 : 1};">
      <div class="stamp like">MATCH</div>
      <div class="stamp nope">NOPE</div>
      <div class="photo" style="background: linear-gradient(160deg, ${match.accent}55, #17102299);">
        ${photoMarkup(match)}
      </div>
      <div class="body">
        <div class="name">${match.name}</div>
        <div class="age-line">${match.age}</div>
        <div class="universe">${match.universe}</div>
        <div class="tagline">${match.tagline}</div>
        <div class="tags">${match.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      </div>
    </div>
  `);
  return card;
}

function attachSwipeHandlers(card, match) {
  let startX = 0,
    startY = 0,
    dx = 0,
    dragging = false;
  const likeStamp = card.querySelector(".stamp.like");
  const nopeStamp = card.querySelector(".stamp.nope");

  function onDown(e) {
    dragging = true;
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX;
    startY = p.clientY;
    card.style.transition = "none";
  }
  function onMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    dx = p.clientX - startX;
    const dy = p.clientY - startY;
    const rot = dx / 18;
    card.style.transform = `translate(${dx}px, ${dy * 0.4}px) rotate(${rot}deg)`;
    const opacity = Math.min(Math.abs(dx) / 100, 1);
    if (dx > 0) {
      likeStamp.style.opacity = opacity;
      nopeStamp.style.opacity = 0;
    } else {
      nopeStamp.style.opacity = opacity;
      likeStamp.style.opacity = 0;
    }
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    card.style.transition = "transform 0.3s ease";
    if (Math.abs(dx) > 100) {
      const dir = dx > 0 ? "yes" : "no";
      flyOff(card, dir, () => decide(match.id, dir));
    } else {
      card.style.transform = "translate(0,0) rotate(0)";
      likeStamp.style.opacity = 0;
      nopeStamp.style.opacity = 0;
    }
    dx = 0;
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  }

  card.addEventListener("mousedown", (e) => {
    onDown(e);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  });
  card.addEventListener("touchstart", onDown, { passive: true });
  card.addEventListener("touchmove", onMove, { passive: true });
  card.addEventListener("touchend", onUp);
}

function flyOff(card, dir, callback) {
  const x = dir === "yes" ? 600 : -600;
  card.style.transform = `translate(${x}px, -40px) rotate(${dir === "yes" ? 30 : -30}deg)`;
  card.style.opacity = "0";
  setTimeout(callback, 260);
}

function decide(id, decision) {
  state.decisions[id] = decision;
  if (decision === "yes") {
    state.matches.push(id);
    saveProgress();
    checkAchievements();
    showMatchModal(getMatch(id));
  } else {
    saveProgress();
    checkAchievements();
    render();
  }
}

function reconsider(id) {
  state.decisions[id] = "yes";
  if (!state.matches.includes(id)) state.matches.push(id);
  state.reconsiderCount = (state.reconsiderCount || 0) + 1;
  saveProgress();
  checkAchievements();
  showMatchModal(getMatch(id));
}

function showMatchModal(match) {
  const fx = THEME_FX[state.theme] || THEME_FX.default;
  const modal = el(`
    <div class="match-modal">
      <div class="burst">${fx.burst}</div>
      <h1>It's a Match!</h1>
      <p>You and ${match.name} liked each other.</p>
      <div class="actions">
        <button class="btn btn-primary btn-block" id="msg-now">Send a Message</button>
        <button class="btn btn-ghost btn-block" id="keep-swiping">Keep Swiping</button>
      </div>
    </div>
  `);
  document.getElementById("phone").appendChild(modal);
  modal.querySelector("#msg-now").addEventListener("click", () => {
    modal.remove();
    openChat(match.id);
  });
  modal.querySelector("#keep-swiping").addEventListener("click", () => {
    modal.remove();
    render();
  });
}

function buildBtn(label, cls, onClick) {
  const b = el(`<button class="btn ${cls} btn-block">${label}</button>`);
  b.addEventListener("click", onClick);
  return b;
}

/* ============================================================
   SCREEN 5 — MATCHES LIST
   ============================================================ */
function renderMatches() {
  const s = el(`
    <div class="screen">
      <div class="deck-header" style="margin-bottom:16px;">
        <h2>Your Matches</h2>
        <p>${state.matches.length} connection${state.matches.length === 1 ? "" : "s"} so far</p>
      </div>
      <div class="matches-list" id="matches-list"></div>
      <div class="progress-note" id="progress-note"></div>
      <div id="passed-section"></div>
      <div style="margin-top:18px;">
        <button class="btn btn-ghost btn-block" id="back-swipe">Back to Swiping</button>
      </div>
    </div>
  `);
  root.appendChild(s);
  const list = s.querySelector("#matches-list");

  if (state.matches.length === 0) {
    list.appendChild(el(`<div class="deck-empty">No matches yet. Get swiping!</div>`));
  }

  state.matches.forEach((id) => {
    const match = getMatch(id);
    const cs = state.chatState[id];
    const statusText = !cs ? "New match" : cs.completed ? "Conversation ended" : "In progress";
    const row = el(`
      <div class="match-row ${cs && cs.completed ? "done" : ""}">
        <div class="em-wrap" style="background:${match.accent}33;">${match.emoji}</div>
        <div class="info">
          <div class="n">${match.name}</div>
          <div class="u">${match.universe}</div>
        </div>
        <div class="status">${statusText}</div>
      </div>
    `);
    row.addEventListener("click", () => openChat(id));
    list.appendChild(row);
  });

  const cCount = completedCount();
  if (cCount >= CONFIG.REVEAL_UNLOCK_COUNT) {
    const mystery = el(`
      <div class="match-row mystery-row">
        <div class="em-wrap" style="background:#FFC85733;">&#8734;</div>
        <div class="info">
          <div class="n">${REVEAL.title}</div>
          <div class="u">${REVEAL.subtitle}</div>
        </div>
        <div class="status">?!</div>
      </div>
    `);
    mystery.addEventListener("click", () => goto("reveal"));
    list.appendChild(mystery);
  } else if (state.matches.length > 0) {
    s.querySelector("#progress-note").textContent = `Finish ${CONFIG.REVEAL_UNLOCK_COUNT - cCount} more conversation${CONFIG.REVEAL_UNLOCK_COUNT - cCount === 1 ? "" : "s"} to unlock something else...`;
  }

  const passedIds = Object.keys(state.decisions).filter((id) => state.decisions[id] === "no");
  if (passedIds.length > 0) {
    const passedSection = s.querySelector("#passed-section");
    passedSection.appendChild(el(`<div class="section-label">Passed \u2014 tap to reconsider</div>`));
    const passedList = el(`<div class="matches-list"></div>`);
    passedIds.forEach((id) => {
      const match = getMatch(id);
      const row = el(`
        <div class="passed-row">
          <div class="em-wrap" style="background:${match.accent}22;">${match.emoji}</div>
          <div class="info">
            <div class="n">${match.name}</div>
            <div class="u">${match.universe}</div>
          </div>
          <div class="reconsider">reconsider &#128140;</div>
        </div>
      `);
      row.addEventListener("click", () => reconsider(id));
      passedList.appendChild(row);
    });
    passedSection.appendChild(passedList);
  }

  s.querySelector("#back-swipe").addEventListener("click", () => goto("swipe"));
}

/* ============================================================
   SCREEN 6 — STYLE SELECT
   ============================================================ */
function openChat(id) {
  state.activeMatchId = id;
  const cs = state.chatState[id];
  if (cs && cs.tone) {
    goto("chat");
  } else {
    goto("style");
  }
}

const TONE_INFO = {
  flirty: { label: "Flirty", desc: "A little charged. Blush-worthy, on purpose." },
  casual: { label: "Casual", desc: "Relaxed, easy banter. Low pressure, high charm." },
  mischievous: { label: "Mischievous", desc: "Playful teasing. Expect some chaos." },
};

function renderStyleSelect() {
  const match = getMatch(state.activeMatchId);
  const s = el(`
    <div class="screen">
      <div class="deck-header" style="margin-bottom:0;">
        <h2>How do you want to<br>vibe with ${match.name.split(" ")[0]}?</h2>
      </div>
      <div class="tone-options" id="tone-options"></div>
    </div>
  `);
  root.appendChild(s);
  const wrap = s.querySelector("#tone-options");
  Object.keys(TONE_INFO).forEach((key) => {
    const info = TONE_INFO[key];
    const card = el(`
      <div class="tone-card">
        <div class="t-name">${info.label}</div>
        <div class="t-desc">${info.desc}</div>
      </div>
    `);
    card.addEventListener("click", () => {
      state.chatState[state.activeMatchId] = { tone: key, completed: false };
      saveProgress();
      goto("chat");
    });
    wrap.appendChild(card);
  });
}

/* ============================================================
   SCREEN 7 — CHAT PLAYBACK
   ============================================================ */
function typingDurationFor(text) {
  const raw = CONFIG.MESSAGE_TYPE_MIN_MS + text.length * CONFIG.MESSAGE_TYPE_MS_PER_CHAR;
  return Math.min(CONFIG.MESSAGE_TYPE_MAX_MS, Math.max(CONFIG.MESSAGE_TYPE_MIN_MS, raw));
}

function organicGap() {
  return CONFIG.MESSAGE_GAP_MIN_MS + Math.random() * (CONFIG.MESSAGE_GAP_MAX_MS - CONFIG.MESSAGE_GAP_MIN_MS);
}

function renderChat() {
  const match = getMatch(state.activeMatchId);
  const cs = state.chatState[state.activeMatchId];
  const s = el(`
    <div class="screen" style="padding-bottom:16px;">
      <div class="chat-header">
        <button class="back">&#8592;</button>
        <div class="em-wrap" style="background:${match.accent}33;">${match.emoji}</div>
        <div>
          <div class="n">${match.name}</div>
          <div class="u">${match.universe}</div>
        </div>
      </div>
      <div class="chat-scroll" id="chat-scroll"></div>
      <div class="chat-hint" id="chat-hint">tap to skip ahead</div>
      <div class="chat-done-actions hidden" id="chat-done"></div>
    </div>
  `);
  root.appendChild(s);
  // Leaving the chat (back button, or navigating elsewhere via goto) pauses
  // playback exactly where it is — goto() clears all pending timers, and
  // progressIndex (saved after every message) is what lets us resume later.
  s.querySelector(".back").addEventListener("click", () => goto("matches"));

  const scroll = s.querySelector("#chat-scroll");
  const doneWrap = s.querySelector("#chat-done");
  const hint = s.querySelector("#chat-hint");

  const script = match.opener.concat(match.tones[cs.tone]).concat(match.closer);

  let skip = !!cs.completed;
  s.addEventListener("click", (e) => {
    if (e.target.closest(".chat-header")) return;
    skip = true;
  });

  function scrollBottom() {
    scroll.scrollTop = scroll.scrollHeight;
  }

  function addBubble(msg) {
    const bubble = el(`<div class="bubble ${msg.from}">${msg.text}</div>`);
    scroll.appendChild(bubble);
    if (msg.reaction) {
      const popDelay = skip ? 0 : CONFIG.REACTION_POP_MIN_MS + Math.random() * (CONFIG.REACTION_POP_MAX_MS - CONFIG.REACTION_POP_MIN_MS);
      setTimeout(() => {
        bubble.appendChild(el(`<span class="reaction-badge">${msg.reaction}</span>`));
        scrollBottom();
      }, popDelay);
    }
    scrollBottom();
  }

  function renderEndedFooter() {
    hint.classList.add("hidden");
    scroll.appendChild(el(`<div class="bubble system">connection unstable across dimensions</div>`));
    scrollBottom();
    doneWrap.classList.remove("hidden");
    doneWrap.appendChild(buildBtn("Back to Matches", "btn-primary", () => goto("matches")));
  }

  function finishChat() {
    cs.completed = true;
    cs.progressIndex = script.length;
    saveProgress();
    checkAchievements();
    renderEndedFooter();
  }

  // Instantly restore any messages already shown from a previous visit —
  // no typing delay, this is just re-drawing conversation history.
  const startIndex = Math.min(cs.progressIndex || 0, script.length);
  for (let i = 0; i < startIndex; i++) addBubble(script[i]);

  function playFrom(i) {
    if (i >= script.length) {
      finishChat();
      return;
    }
    const msg = script[i];

    if (skip) {
      addBubble(msg);
      cs.progressIndex = i + 1;
      saveProgress();
      const t = setTimeout(() => playFrom(i + 1), 70);
      state.chatTimers.push(t);
      return;
    }

    const typing = el(`<div class="typing ${msg.from}"><span></span><span></span><span></span></div>`);
    scroll.appendChild(typing);
    scrollBottom();
    const t = setTimeout(() => {
      typing.remove();
      addBubble(msg);
      cs.progressIndex = i + 1;
      saveProgress();
      const t2 = setTimeout(() => playFrom(i + 1), organicGap());
      state.chatTimers.push(t2);
    }, typingDurationFor(msg.text));
    state.chatTimers.push(t);
  }

  if (cs.completed) {
    renderEndedFooter();
  } else {
    playFrom(startIndex);
  }
}

/* ============================================================
   SCREEN 8 — BONUS REVEAL
   ============================================================ */
function renderReveal() {
  const message = CONFIG.REVEAL_MESSAGE_OVERRIDE || REVEAL.message;
  const photoInner = CONFIG.REVEAL_PHOTO
    ? `<img src="${CONFIG.REVEAL_PHOTO}" alt="">`
    : "&#128155;";

  const s = el(`
    <div class="screen center">
      <div class="reveal-radar" id="reveal-radar">
        <div class="radar-ring r1"></div>
        <div class="radar-ring r2"></div>
        <div class="radar-sweep"></div>
        <div class="radar-dot"></div>
      </div>
      <div class="reveal-glitch" id="reveal-trace-log"><span class="cursor"></span></div>
      <div class="reveal-final hidden" id="reveal-final">
        <div class="reveal-photo">${photoInner}</div>
        <div class="reveal-title">${REVEAL.title}</div>
        <div class="reveal-sub">${REVEAL.subtitle}</div>
        <div class="reveal-message" id="reveal-message-text"></div>
        <div style="height:26px;"></div>
        <button class="btn btn-primary btn-block" id="reveal-back">Back to Matches</button>
      </div>
    </div>
  `);
  root.appendChild(s);
  s.querySelector("#reveal-back").addEventListener("click", () => goto("matches"));

  const radar = s.querySelector("#reveal-radar");
  const traceLog = s.querySelector("#reveal-trace-log");
  const finalWrap = s.querySelector("#reveal-final");

  // Tap anywhere to skip straight to the full message, for repeat visits.
  let skip = false;
  s.addEventListener("click", (e) => {
    if (e.target.closest(".btn")) return;
    skip = true;
  });

  let li = 0;
  function nextTraceLine() {
    if (skip) {
      transitionToReveal();
      return;
    }
    if (li < REVEAL_TRACE_LINES.length) {
      traceLog.innerHTML = `${REVEAL_TRACE_LINES[li]}<span class="cursor"></span>`;
      li++;
      setTimeout(nextTraceLine, CONFIG.REVEAL_TRACE_LINE_MS);
    } else {
      transitionToReveal();
    }
  }

  function transitionToReveal() {
    radar.style.opacity = "0";
    traceLog.style.opacity = "0";
    setTimeout(() => {
      radar.classList.add("hidden");
      traceLog.classList.add("hidden");
      finalWrap.classList.remove("hidden");
      typeMessage();
    }, skip ? 0 : 400);
  }

  function typeMessage() {
    const target = s.querySelector("#reveal-message-text");
    let i = 0;
    function typeChar() {
      if (skip) {
        target.innerHTML = message.replace(/\n/g, "<br>");
        return;
      }
      if (i <= message.length) {
        target.innerHTML = message.slice(0, i).replace(/\n/g, "<br>") + '<span class="cursor"></span>';
        i += 2;
        setTimeout(typeChar, CONFIG.REVEAL_TYPE_CHAR_MS);
      } else {
        target.innerHTML = message.replace(/\n/g, "<br>");
      }
    }
    typeChar();
  }

  nextTraceLine();
}

/* ============================================================
   BOOT
   ============================================================ */
checkAchievements();
render();
