/* ============================================================
   CONFIG — edit this file to personalize the app.
   Everything you're most likely to want to change lives here.
   ============================================================ */

const CONFIG = {
  // The name shown during "facial recognition" and the welcome screen.
  HER_NAME: "ARock", // TODO: change to her actual name, e.g. "Sarah"

  // Fake AI brand name shown in the status bar / headers.
  APP_NAME: "CupidAI",

  // How many completed conversations unlock the bonus finale
  // ("Match #∞" — the reveal that it was you all along).
  // There are 14 matches total, so 5 is enough to unlock it
  // without requiring her to finish every single one.
  REVEAL_UNLOCK_COUNT: 5,

  // How fast the AI "reads" a message before replying, in milliseconds.
  // Scales with message length so short texts feel quick and long ones
  // feel like someone's actually typing them out.
  MESSAGE_TYPE_MIN_MS: 1400,
  MESSAGE_TYPE_MAX_MS: 3400,
  MESSAGE_TYPE_MS_PER_CHAR: 32,

  // Random pause between one bubble landing and the next "typing..." starting.
  MESSAGE_GAP_MIN_MS: 1900,
  MESSAGE_GAP_MAX_MS: 3200,

  // Delay before a reaction emoji pops onto a bubble, so it feels like a
  // beat of realization rather than an instant tap-back.
  REACTION_POP_MIN_MS: 1600,
  REACTION_POP_MAX_MS: 3200,

  // Pacing for the fake face-scan and AI "thinking" screens.
  SCAN_LINE_INTERVAL_MS: 1450,
  SCAN_CONFIRM_PAUSE_MS: 1900,
  THINKING_LINE_INTERVAL_MS: 1300,
  CHECKLIST_TICK_INTERVAL_MS: 550,
  THINKING_TO_SWIPE_PAUSE_MS: 1300,

  // Pacing for the "Match #\u221e" bonus reveal scene.
  REVEAL_TRACE_LINE_MS: 1200,
  REVEAL_TYPE_CHAR_MS: 55,

  // Sign-off name used in the bonus finale message at the very end.
  YOUR_SIGNOFF: "Recess", // TODO: change to your name / nickname / inside joke

  // Optional: a real photo of you to show in the finale reveal screen.
  // Drop an image into assets/ and put the filename here, e.g. "assets/us.jpg".
  // Leave as null to use the placeholder heart instead.
  REVEAL_PHOTO: "assets/me_nightcourt.png",

  // Optional custom finale message. Leave as null to use the default
  // written in js/data.js (REVEAL.message).
  REVEAL_MESSAGE_OVERRIDE: null,
};
