/* ============================================================
   DATA — all scripted content lives here.
   To add/remove/edit a match, edit the MATCHES array below.
   Each match has: opener (shared), tones.flirty/casual/mischievous
   (only one plays, chosen by her), and closer (shared, bittersweet).
   from: 'match' = the character texting. from: 'her' = her scripted reply.
   ============================================================ */

// Lines shown one-by-one while the AI "thinks", before the checklist appears.
const THINKING_LINES = [
  "Booting NeuroMatch\u2122 core...",
  "Calibrating heart-rate sensors...",
  "Politely declining 4,302 unqualified suitors...",
  "Cross-referencing 14 known universes...",
  "Compiling your top matches...",
];

// Checklist items that tick off one-by-one after the thinking lines.
const CHECKLIST_ITEMS = [
  "Scanning for dragons, elves & tsundere energy",
  "Confirming excellent taste in fictional men",
  "Loyalty index: immeasurable",
  "Compatibility with capes, swords & Pok\u00e9 Balls: high",
  "Red flag scan: clean",
  "Snack-sharing probability: 97%",
  "Soulmate probability in at least one timeline: confirmed",
];

// App themes, selectable from Settings. Colors for each are defined in
// css/style.css under [data-theme="..."] blocks. "default" needs no block —
// it's just the base :root palette.
const THEMES = [
  { key: "default", label: "NeuroMatch", desc: "Cosmic violet & rose \u2014 the default look" },
  { key: "ember", label: "Ember Trail", desc: "Pok\u00e9mon-inspired fire orange & gold" },
  { key: "hyrule", label: "Hyrule Fields", desc: "Zelda-inspired emerald & Triforce gold" },
  { key: "night-court", label: "Night Court", desc: "ACOTAR-inspired starlit violet" },
  { key: "shire", label: "The Shire", desc: "LOTR-inspired moss green & bronze" },
  { key: "olympus", label: "Olympus", desc: "Mythology-inspired marble & gold" },
  { key: "mushroom-kingdom", label: "Mushroom Kingdom", desc: "Mario-inspired red, blue & coin gold" },
  { key: "dragon-ball", label: "Power Level", desc: "Dragon Ball-inspired energy orange & gold" },
];

// Per-theme flavor: ambient particles, the brand-icon override, and the
// emoji shown in the "It's a Match!" celebration. Colors alone live in CSS;
// this is what makes each theme feel like its own little world.
const THEME_FX = {
  "default": { particles: ["\u2728", "\ud83d\udcab", "\u2728", "\ud83c\udf19", "\u2728", "\ud83d\udcab"], burst: "\ud83d\udc95" },
  "ember": { particles: ["\ud83d\udd25", "\u2728", "\ud83d\udd25", "\u2728", "\ud83d\udd25", "\u2728"], burst: "\ud83d\udd25\ud83d\udc9b" },
  "hyrule": { particles: ["\u2728", "\ud83c\udf43", "\u2728", "\ud83d\udd3a", "\ud83c\udf43", "\u2728"], burst: "\ud83d\udc9a\u2728" },
  "night-court": { particles: ["\u2728", "\u2b50", "\u2728", "\ud83c\udf0c", "\u2b50", "\u2728"], burst: "\ud83d\udc9c\ud83c\udf0c" },
  "shire": { particles: ["\ud83c\udf43", "\ud83d\udc8d", "\ud83c\udf43", "\ud83c\udf3f", "\ud83c\udf43", "\ud83d\udc8d"], burst: "\ud83d\udc8d\ud83d\udc9a" },
  "olympus": { particles: ["\u2728", "\u26a1", "\u2728", "\ud83c\udfdb\ufe0f", "\u2728", "\u26a1"], burst: "\u26a1\ud83d\udc9b" },
  "mushroom-kingdom": { particles: ["\ud83c\udf44", "\u2728", "\ud83c\udf44", "\u2b50", "\ud83c\udf44", "\u2728"], burst: "\ud83c\udf44\u2764\ufe0f" },
  "dragon-ball": { particles: ["\u26a1", "\u2728", "\u26a1", "\ud83c\udf1f", "\u2728", "\u26a1"], burst: "\u26a1\ud83d\udca5" },
};

// Achievements — unlock conditions live in app.js (checkAchievements),
// this is just the display content shown in Settings and in the toast.
const ACHIEVEMENTS = [
  { id: "first-swipe", title: "First Swipe", desc: "Made your very first swipe.", icon: "\ud83d\udc46" },
  { id: "first-match", title: "First Match", desc: "Got your very first match.", icon: "\ud83d\udc98" },
  { id: "breaking-ice", title: "Breaking the Ice", desc: "Finished your first conversation.", icon: "\ud83d\udcac" },
  { id: "serial-dater", title: "Serial Dater", desc: "Finished 5 conversations.", icon: "\ud83d\udd25" },
  { id: "heartbreaker", title: "Heartbreaker", desc: "Passed on 5 different matches.", icon: "\ud83d\udc94" },
  { id: "second-chances", title: "Second Chances", desc: "Reconsidered a match you'd passed on.", icon: "\ud83d\udc8c" },
  { id: "new-look", title: "New Look", desc: "Switched to a new app theme.", icon: "\ud83c\udfa8" },
  { id: "full-house", title: "Full House", desc: "Matched with every single one.", icon: "\ud83c\udfc6" },
  { id: "truth-comes-out", title: "The Truth Comes Out", desc: "Unlocked the bonus finale.", icon: "\u267e\ufe0f" },
  { id: "completionist", title: "Completionist", desc: "Finished every conversation.", icon: "\ud83d\udc51" },
];

const MATCHES = [
  {
    id: "rhysand",
    name: "Rhyven",
    universe: "ACOTAR",
    age: "500ish (looks incredible for it, will remind you)",
    tagline: "High Lord of the Night Court. Winged. Smug about it. Correctly.",
    bio: "Rules the most beautiful court in Prythian, reads minds, flies, and somehow still finds time to text back immediately. Red flag or blessing, unclear.",
    tags: ["High Lord \ud83c\udf0c", "Wings"],
    accent: "#7B4FFF",
    emoji: "\ud83c\udf0c",
    photo: "assets/photos/Rhysand.png",
    opener: [
      { from: "match", text: "The AI tells me you're my match. For once, I trust the algorithm more than five centuries of my own instincts." },
      { from: "her", text: "That's either the smoothest or most unhinged opening line I've gotten." },
      { from: "match", text: "Both, usually. Velaris says hello, by the way. It already likes you and it hasn't even met you." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've read a great many minds in five hundred years. Yours, even secondhand through a screen, is the one I'd like to spend the longest in.", reaction: "\ud83d\ude0d" },
        { from: "her", text: "Careful, that's a dangerously good line." },
        { from: "match", text: "I'm aware. I've had centuries to practice and absolutely no shame about using them all on you." },
      ],
      casual: [
        { from: "match", text: "What does a night in with you look like. I'm picturing the balcony, the stars, something with too much wine." },
        { from: "her", text: "You're very confident for someone I met an hour ago." },
        { from: "match", text: "Five hundred years teaches you to recognize a good thing quickly. This is a good thing." },
      ],
      mischievous: [
        { from: "match", text: "Careful, or I'll winnow in, steal you away to the Night Court, and simply never give you back.", reaction: "\ud83d\ude0f" },
        { from: "her", text: "Is that a threat or an invitation." },
        { from: "match", text: "With me it's rarely just one thing. That's half my charm, according to Feyre. The other half is the wings." },
      ],
    },
    closer: [
      { from: "match", text: "The Night Court doesn't run itself, unfortunately, and Velaris's borders need their High Lord more than I'd like tonight." },
      { from: "her", text: "Duty calls for High Lords too, apparently." },
      { from: "match", text: "Some bonds aren't meant to cross realities, as much as I'd like to rewrite that particular rule. But if you ever hear wings outside your window at night \u2014 that's just me, checking on you." },
      { from: "her", text: "That's either deeply romantic or extremely concerning. I'll allow it." },
    ],
  },
  {
    id: "senku",
    name: "Stenku",
    universe: "Dr. STONE",
    age: "16, mentally exhausted from rebuilding civilization",
    tagline: "Scientist. Rebuilding civilization from scratch, one law of physics at a time.",
    bio: "Turned a stone world back into a science world through sheer stubbornness and chemistry. Flirts primarily through data. It works better than it should.",
    photo: "assets/photos/Senku.jpg",
    tags: ["10 billion % scientist \ud83e\uddea", "Rebuilding civilization"],
    accent: "#6FCF97",
    emoji: "\ud83e\uddea",
    opener: [
      { from: "match", text: "Ran the compatibility numbers myself, just to double check the AI's math. It checks out. Fascinating, honestly." },
      { from: "her", text: "You audited the dating algorithm." },
      { from: "match", text: "Obviously. Trust nothing you can't verify experimentally. That's rule one of science and, apparently, dating." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "Scientifically speaking, my heart rate went up about twelve percent reading your last message. That's statistically significant. That's... not nothing.", reaction: "\ud83e\udd13" },
        { from: "her", text: "Did you just diagnose yourself with a crush." },
        { from: "match", text: "I prefer 'documented an anomalous physiological response.' Same thing, more syllables." },
      ],
      casual: [
        { from: "match", text: "Come by the lab later. I'm distilling something that might be alcohol, might be paint thinner. Fifty-fifty odds, very exciting either way." },
        { from: "her", text: "That's not exactly a selling point." },
        { from: "match", text: "Science rarely is, at first. That's what makes it good science." },
      ],
      mischievous: [
        { from: "match", text: "I calculated the exact probability you'd reply within five minutes. You beat my estimate by ninety seconds. I'm almost impressed." },
        { from: "her", text: "You're timing my replies?!" },
        { from: "match", text: "For science. Also, yes, a little bit for me. Don't tell Chrome, he'll never let it go." },
      ],
    },
    closer: [
      { from: "match", text: "Ran the numbers on us, long-term, across universes. Ten billion percent improbable, currently. Emphasis on currently." },
      { from: "her", text: "Only you would put a probability on heartbreak." },
      { from: "match", text: "Give me a few millennia. I turned a world of stone back into civilization with a chemistry set. I'll figure out the math on this too, eventually. That's a promise, not a hope \u2014 I don't deal in hope.", reaction: "\ud83e\udd79" },
      { from: "her", text: "Somehow that's the most romantic thing you've said." },
    ],
  },
  {
    id: "link",
    name: "Slink",
    universe: "The Legend of Zelda",
    age: "17 (across several timelines, it's complicated)",
    tagline: "Hero of Hyrule. Does not talk much. Communicates primarily through actions and one (1) sword.",
    bio: "Silent, extremely capable, will 100% show up outside your window on a horse with zero explanation. Bring your own subtitles.",
    tags: ["Sword guy \u2694\ufe0f", "Owns a horse"],
    photo: "assets/photos/Link.jpg",
    accent: "#57C7A3",
    emoji: "\ud83d\udde1\ufe0f",
    opener: [
      { from: "match", text: "hey" },
      { from: "her", text: "That's it? That's the whole message?" },
      { from: "match", text: "matched with you. good sign. Epona agrees" },
    ],
    tones: {
      flirty: [
        { from: "match", text: "you're prettier than the Master Sword pedestal at sunrise. that's the highest compliment I have", reaction: "\ud83e\udd70" },
        { from: "her", text: "I'll take a sword-related compliment from you over poetry from anyone else." },
        { from: "match", text: "good. wasn't planning on writing poetry. not my strong suit. this is basically a novel for me" },
      ],
      casual: [
        { from: "match", text: "riding Epona through the field later. you'd like it. quiet. good sky" },
        { from: "her", text: "Sounds nice. Very you \u2014 minimal words, maximum vibes." },
        { from: "match", text: "that's the whole personality yeah" },
      ],
      mischievous: [
        { from: "match", text: "riddle: I have keys but no locks, space but no room, you can enter but not go outside. what am I", reaction: "\ud83e\udd14" },
        { from: "her", text: "Is this a real riddle or are you just being weird" },
        { from: "match", text: "keyboard. also yes to both" },
      ],
    },
    closer: [
      { from: "match", text: "Ganon's back. again. always is" },
      { from: "her", text: "Of course he is. Go save Hyrule, hero." },
      { from: "match", text: "duty calls. you'll be my Zelda in some timeline somewhere, probably. good odds honestly" },
      { from: "her", text: "Go. Take Epona. Don't die." },
    ],
  },
  {
    id: "deku",
    name: "Istuku \u201cDeku\u201d Galoriya",
    universe: "My Hero Academia",
    age: "16, notebook full of hero analysis, heart full of everything",
    tagline: "Hero-in-training. Cries at least once a day, usually happily.",
    bio: "Muttering hero analysis under his breath since childhood. Will absolutely write three paragraphs analyzing why he likes you, then apologize for oversharing.",
    photo: "assets/photos/Deku.jpg",
    tags: ["Plus Ultra \ud83d\udc9a", "Cries happy tears"],
    accent: "#4CAF7D",
    emoji: "\ud83d\udc9a",
    opener: [
      { from: "match", text: "Okay so \u2014 sorry, I've been staring at my phone for ten minutes trying to figure out how to start this. Hi! I'm really glad we matched." },
      { from: "her", text: "That's the most endearing opening message I've ever gotten." },
      { from: "match", text: "Really?? Okay, good, that's good, I was worried I sounded weird. I do that sometimes. A lot, actually." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I made a list of things I like about you already and it's, um, longer than I expected. I might be a little in over my head here.", reaction: "\ud83e\udd79" },
        { from: "her", text: "You made a LIST." },
        { from: "match", text: "I analyze everything, it's kind of my whole thing! This is just the first list I've made that made my face go red the whole time I was writing it." },
      ],
      casual: [
        { from: "match", text: "Training's rough today but texting you is honestly the best part of it. Is that weird to say?" },
        { from: "her", text: "Not weird. Kind of sweet, actually." },
        { from: "match", text: "Okay good. Kacchan would call it soft. He's not wrong, but I don't care!" },
      ],
      mischievous: [
        { from: "match", text: "Don't tell anyone, but I might have practiced texting you in the mirror first. It went badly. This is the improved version.", reaction: "\ud83d\ude02" },
        { from: "her", text: "You WHAT" },
        { from: "match", text: "I panic sometimes! It's fine now though, I think. I hope. Is it fine?" },
      ],
    },
    closer: [
      { from: "match", text: "Hero work doesn't stop, even for this. There's a whole city counting on people like me, and I can't let them down." },
      { from: "her", text: "That's exactly why I like you. Go be a hero." },
      { from: "match", text: "Plus Ultra means I never give up \u2014 even on believing we could've worked. Just, maybe not across dimensions, realistically. But I'll keep training. Someday I want to be someone worth crossing universes for." },
      { from: "her", text: "You already are. Don't let anyone tell you different." },
    ],
  },
  {
    id: "sam",
    name: "Stevewise Galgee",
    photo: "assets/photos/Samwise.jpg",
    universe: "The Lord of the Rings",
    age: "Late 30s in Shire years, ancient in loyalty",
    tagline: "Gardener. Cook. Carried a friend up a mountain and never once complained about it.",
    bio: "Grows the best potatoes in the Shire, bar none. Will absolutely show up with a proper meal if you're having a hard day, no questions asked.",
    tags: ["Gardener \ud83c\udf31", "Would carry you up a mountain"],
    accent: "#7A9B5C",
    emoji: "\ud83c\udf31",
    opener: [
      { from: "match", text: "Well I never expected an app to find me a match, but here we are. Hope that's alright to say straight off." },
      { from: "her", text: "That's a very charming way to open a conversation." },
      { from: "match", text: "My gaffer always said honesty's the best seasoning for anything, conversations included. Glad it landed well." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've seen some beautiful things in my travels \u2014 the Golden Wood, the Sea, all of it. Still, your smile in that photo's doing something to me those never quite managed.", reaction: "\ud83e\udd79" },
        { from: "her", text: "That might be the sweetest thing anyone's ever said to me." },
        { from: "match", text: "I mean every word. I'm not one for flowery talk, but when it's true, it's true." },
      ],
      casual: [
        { from: "match", text: "Just got the potatoes in for the season. Best batch yet, if I do say so myself. Wish you were here to try them." },
        { from: "her", text: "You're really committed to the potato bit, huh." },
        { from: "match", text: "It's not a bit! A good potato's one of life's real comforts. I'd cook you a proper meal any day of the week, no bother at all." },
      ],
      mischievous: [
        { from: "match", text: "Mr. Frodo says I go on too long about my garden. Fair warning, I might do that to you too if you let me." },
        { from: "her", text: "I don't mind. Tell me everything about your garden." },
        { from: "match", text: "Careful what you wish for, that could take all night. I've got a lot of opinions about proper soil." },
      ],
    },
    closer: [
      { from: "match", text: "Mr. Frodo always says the burden's lighter with good company, and you've been the best kind these past few days.", reaction: "\ud83d\ude22" },
      { from: "her", text: "That means a lot, coming from you." },
      { from: "match", text: "But my place is back in the Shire, tending my garden \u2014 and if I'm honest, Rosie's expecting me for supper, and I've kept her waiting long enough. Take care of yourself out there, past the edge of the map." },
      { from: "her", text: "Go home, Sam. You've earned some rest." },
    ],
  },
  {
    id: "ember",
    photo: "assets/photos/Pokemon.jpg",
    name: "Ryo \u201cSvenny\u201d Sato",
    universe: "Pok\u00e9mon",
    age: "16 (mentally 45, very responsible)",
    tagline: "Fire-type specialist. Chronic third-place-in-League-finals energy.",
    bio: "Certified starter-picker. Has never once let his Charmander's tail flame go out, including that one time it rained for nine days straight.",
    tags: ["Fire type \ud83d\udd25", "Great with kids"],
    accent: "#FF7A45",
    emoji: "\ud83d\udd25",
    opener: [
      { from: "match", text: "Hey \u2014 my Charmander wouldn't stop pawing at my bag until I matched with you. I think that's a sign." },
      { from: "her", text: "Your Pok\u00e9mon has better instincts than most people I've dated." },
      { from: "match", text: "He's very selective. Weirdly picky about ketchup packets and now, apparently, you." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "Not gonna lie, you're cuter than a shiny Pok\u00e9mon encounter, and those are a 1-in-4096 chance.", reaction: "\ud83d\ude0d" },
        { from: "her", text: "Did you seriously just calculate the odds of me being cute." },
        { from: "match", text: "I did. You beat the odds. So did I, honestly, just by getting matched with you." },
      ],
      casual: [
        { from: "match", text: "What's your Sunday looking like? I'm thinking campfire, bad guitar playing, my Charmander lighting the marshmallows because he insists." },
        { from: "her", text: "That's either the best or worst first date idea I've heard." },
        { from: "match", text: "Best. Definitely best. He's actually really gentle with the marshmallows now, we've been practicing." },
      ],
      mischievous: [
        { from: "match", text: "Ok don't be mad but I may have let my Charmander loose in your room for five seconds just to see what would happen.", reaction: "\ud83d\ude02" },
        { from: "her", text: "WHAT happened." },
        { from: "match", text: "Nothing! Mostly. He just wanted to see if you had any snacks. He respects you now. High praise, actually." },
      ],
    },
    closer: [
      { from: "match", text: "Hey, so \u2014 the region isn't gonna catch itself. I've got Gym Badge number six calling my name at sunrise." },
      { from: "her", text: "Of course it does. Go be a champion." },
      { from: "match", text: "I'll send postcards from every region, I promise. Even if I have to hitch a ride on a Pidgeot across dimensions to do it." },
      { from: "her", text: "Tell your Charmander I said bye. He was the real catch here anyway." },
    ],
  },
  {
    id: "vegeta",
    photo: "assets/photos/Vegeta.jpg",
    name: "Stvenna",
    universe: "Dragon Ball Z",
    age: "Physically 40s, emotionally still mid-rivalry with Kakarot",
    tagline: "Prince of all Saiyans. Also, unfortunately, in touch with his feelings now.",
    bio: "Blew up his share of planets in his youth. These days more likely to be found in a gravity chamber than causing global endangerment, which his family considers real growth.",
    tags: ["Saiyan royalty \ud83d\udc51", "Never backs down"],
    accent: "#4A5FE8",
    emoji: "\ud83d\udc51",
    opener: [
      { from: "match", text: "Tch. An algorithm claims to have found my equal. I doubt that very much, but I will allow this conversation to continue." },
      { from: "her", text: "That's the most Vegeta opening line I could've imagined." },
      { from: "match", text: "Good. I wasn't attempting anything else." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've fought gods and destroyed planets. Admitting I find you interesting is, unfortunately, far more terrifying." },
        { from: "her", text: "Vegeta, are you actually flustered right now?" },
        { from: "match", text: "Absolutely not. Saiyans do not get flustered. This is elevated tactical awareness. Of you.", reaction: "\ud83d\ude0f" },
      ],
      casual: [
        { from: "match", text: "Training's done for the day. Bulma's got dinner ready. It's loud, it's chaotic, and I wouldn't trade it for anything. You'd probably survive it." },
        { from: "her", text: "High praise, coming from you." },
        { from: "match", text: "I don't hand it out often. Don't get used to it." },
      ],
      mischievous: [
        { from: "match", text: "Kakarot texted me today asking if I was 'doing okay.' I have never wanted to power up and scream at the sky more than in this exact moment." },
        { from: "her", text: "Please don't blow up the training room over a text." },
        { from: "match", text: "No promises. Depends how the rest of this conversation goes." },
      ],
    },
    closer: [
      { from: "match", text: "I should be direct about something, since I don't deal in half-truths. I have a wife. Two children. A gravity chamber I'm contractually obligated to train in daily.", reaction: "\ud83d\ude02" },
      { from: "her", text: "You really saved the most important detail for last, huh." },
      { from: "match", text: "I prioritize threats by magnitude. Apparently I miscalculated this one. Bulma would never let me hear the end of this, so it ends here \u2014 but you fought well." },
      { from: "her", text: "Go easy on yourself, Prince. Go home to your family." },
    ],
  },
  {
    id: "odysseus",
    name: "Odysteus",
    universe: "The Odyssey",
    age: "Old enough to have very questionable time management",
    tagline: "King of Ithaca. World-class strategist. Ten-year commute record holder.",
    bio: "Outsmarted a cyclops, resisted sirens (mostly), and still can't find his way home in under a decade. Extremely charming. Extremely, extremely complicated.",
    photo: "assets/photos/Odysseus.jpg",
    tags: ["King \u2693", "Currently 'almost home'"],
    accent: "#3D8C99",
    emoji: "\u2693",
    opener: [
      { from: "match", text: "I've outwitted gods, monsters, and a very persistent cyclops. Matching with you might be my finest strategic move yet." },
      { from: "her", text: "That's a very high bar you're setting for a text message." },
      { from: "match", text: "I set high bars. It's how I got out of Troy. Well \u2014 that and a large wooden horse. Long story." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "The sirens sang the most beautiful song I'd ever heard, once. This conversation might be giving them some real competition." },
        { from: "her", text: "Comparing me to a song designed to lure sailors to their deaths. Bold choice." },
        { from: "match", text: "In my defense, I meant it as the highest compliment I have available. I've been at sea a long time, my references are limited." },
      ],
      casual: [
        { from: "match", text: "Tell me something about you the AI didn't already put in a profile. I'm good at reading people, it's basically my whole skill set." },
        { from: "her", text: "Better than escaping monsters?" },
        { from: "match", text: "Honestly? About even. Both require excellent timing and a healthy fear of consequences." },
      ],
      mischievous: [
        { from: "match", text: "I once told a cyclops my name was 'Nobody' just to escape a cave. I'm considering using that trick again if this conversation gets too good.", reaction: "\ud83d\ude02" },
        { from: "her", text: "Are you always this much of a liar?" },
        { from: "match", text: "I prefer 'strategically flexible with the truth.' It's gotten me through a war and most of a decade at sea. Can't stop now." },
      ],
    },
    closer: [
      { from: "match", text: "I should probably mention something. I have a wife. And a kingdom. And a very long boat trip home I've technically been 'almost finished with' for about ten years now.", reaction: "\ud83d\ude02" },
      { from: "her", text: "You buried the lede a little, king." },
      { from: "match", text: "In my defense, I bury most ledes, it's a survival skill at this point. This might be my biggest strategic error yet \u2014 but it was fun while it lasted. Penelope's expecting me. Eventually. Probably this decade." },
      { from: "her", text: "Go home, Odysseus. Ithaca's waited long enough." },
    ],
  },
  {
    id: "aragorn",
    photo: "assets/photos/Aragorn.jpg",
    name: "Steragorn",
    universe: "The Lord of the Rings",
    age: "87, ages slowly, worries constantly",
    tagline: "Ranger. Rightful King of Gondor. Extremely committed to a certain elf-maiden, which he will absolutely mention.",
    bio: "Wanders the wild, protects the realm, occasionally broods on a mountainside for dramatic effect. Devastatingly noble. Also, quite spoken for.",
    tags: ["King \u2694\ufe0f", "Already committed, fair warning"],
    accent: "#4A5D45",
    emoji: "\u2694\ufe0f",
    opener: [
      { from: "match", text: "I do not put much stock in prophecy or algorithm, generally. And yet, here we are matched, and I find myself curious rather than doubtful." },
      { from: "her", text: "That's a very regal way to say 'the app worked.'" },
      { from: "match", text: "I've been told I speak like I'm narrating a legend even when ordering a meal. An old habit. Apologies in advance." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've walked many roads and met many people in my long years as a Ranger. Few conversations have made me want to stay in one place as much as this one already has.", reaction: "\ud83e\udd79" },
        { from: "her", text: "That's remarkably poetic for a text message." },
        { from: "match", text: "I was raised among Elves. Poetry is somewhat unavoidable, even over something as strange as this." },
      ],
      casual: [
        { from: "match", text: "What does an evening look like where you're from? I confess most of mine involve a campfire and questionable stew." },
        { from: "her", text: "Sounds rustic. I like it." },
        { from: "match", text: "It has its charms. Simpler than court life, though admittedly with more orcs." },
      ],
      mischievous: [
        { from: "match", text: "I've been called Strider, Elessar, and 'that broody one with the sword' by various people. Curious which you'd land on." },
        { from: "her", text: "Definitely the broody sword one, honestly." },
        { from: "match", text: "Fair. Accurate, even. I've made peace with it." },
      ],
    },
    closer: [
      { from: "match", text: "I must be honest with you, as a king should be honest with his people \u2014 there is an Elf-maiden named Arwen who has waited a very long time for me, and I intend, finally, to stop keeping her waiting.", reaction: "\ud83d\ude02" },
      { from: "her", text: "You really buried that lede, king." },
      { from: "match", text: "In my defense, I bury most things beneath duty and prophecy, it's something of a pattern with me. You deserve someone equally undistracted by centuries-old Elven romances. Go well, wherever your road leads." },
      { from: "her", text: "Go marry your Elf, Aragorn. Gondor's waited long enough too." },
    ],
  },
  {
    id: "bakugo",
    name: "Stakugo",
    universe: "My Hero Academia",
    age: "16, permanently annoyed, secretly soft",
    tagline: "Explosive quirk. More explosive personality. Somehow still charming.",
    bio: "Loud, competitive, allergic to admitting he cares. If he's texting you first, that already means something \u2014 he'll never say what.",
    tags: ["Explosive \ud83d\udca5", "Soft, don't tell him you noticed"],
    accent: "#FF5A36",
    emoji: "\ud83d\udca5",
    photo: "assets/photos/Bakugo.jpg",
    opener: [
      { from: "match", text: "The AI matched us. Don't get used to me texting first, this is a one-time thing." },
      { from: "her", text: "Bold words for someone who texted within thirty seconds of the match." },
      { from: "match", text: "Shut up. I was just checking my phone. Coincidence." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "You're annoyingly cute, you know that? Like it's actually distracting. I don't appreciate it.", reaction: "\ud83d\ude0f" },
        { from: "her", text: "Is that supposed to be a compliment?" },
        { from: "match", text: "It's the nicest thing I say to anyone, take it or leave it, extra." },
      ],
      casual: [
        { from: "match", text: "Training's over. You eating? I'm eating. Not asking you to join, just, y'know. Info." },
        { from: "her", text: "Very smooth invitation." },
        { from: "match", text: "I don't do smooth. I do direct. Same thing, better." },
      ],
      mischievous: [
        { from: "match", text: "Bet you can't out-text-banter me for five whole minutes." },
        { from: "her", text: "Is that a challenge?" },
        { from: "match", text: "Damn right it is. Don't disappoint me, extra. I hate losing more than I like winning, so pick your side carefully." },
      ],
    },
    closer: [
      { from: "match", text: "Look \u2014 I don't do long distance. I sure as hell don't do 'different universes.' Not my thing." },
      { from: "her", text: "Wow. Okay. Tell me how you really feel." },
      { from: "match", text: "Fine \u2014 you're not the worst. Actually you might be the least-worst person I've matched with, ever. Don't let it go to your head. And don't go soft on me just 'cause I said that much.", reaction: "\ud83e\udd7a" },
      { from: "her", text: "Too late. That was basically a love letter for you." },
    ],
  },
  {
    id: "frieren",
    name: "Frieven",
    universe: "Frieren: Beyond Journey's End",
    age: "1,000+ (doesn't love talking about it)",
    tagline: "Elf mage. Slayer of demon lords. Chronically bad at noticing feelings in the moment \u2014 great at remembering them forever after.",
    bio: "Spent decades collecting spells for no reason other than curiosity. Has finally started noticing the small moments while they're still happening. You might be one of them.",
    photo: "assets/photos/Frieren.jpg",
    tags: ["Elf \ud83e\udddd", "Terrible with time, great with memory"],
    accent: "#B8A9D9",
    emoji: "\ud83d\udd70\ufe0f",
    opener: [
      { from: "match", text: "It's strange. A thousand years old and this is the first match that's made me want to reply immediately instead of thinking about it for a decade." },
      { from: "her", text: "A decade? That's a long time to leave someone on read." },
      { from: "match", text: "For me, it's Tuesday. But I'd rather not make you wait that long. I'm trying to get better at that." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've met a lot of people across a lot of centuries. You're the first in a long while that's made me want to remember today specifically.", reaction: "\ud83e\udd79" },
        { from: "her", text: "That might be the most sincere thing anyone's said to me." },
        { from: "match", text: "I don't say things I don't mean. I've had a thousand years to learn that words matter more when you use them rarely." },
      ],
      casual: [
        { from: "match", text: "I'm learning a new spell today. It's completely useless. I think you'd like it anyway." },
        { from: "her", text: "What does it do?" },
        { from: "match", text: "Makes a small light follow you around like a firefly. No practical use whatsoever. My favorite kind of magic." },
      ],
      mischievous: [
        { from: "match", text: "I collected 108 kinds of tea over the decades. I'm not telling you why. You'll just have to wonder." },
        { from: "her", text: "That's such a Frieren thing to say." },
        { from: "match", text: "I've had a thousand years to perfect being mysterious. It's one of maybe three skills I'm confident about." },
      ],
    },
    closer: [
      { from: "match", text: "I've lived a thousand years, and I'm only now learning to notice moments like this one while they're happening, instead of realizing what they meant decades too late.", reaction: "\ud83e\udd79" },
      { from: "her", text: "That's a beautiful thing to learn." },
      { from: "match", text: "I don't want to waste it pretending this could last across worlds it can't reach. But I'll remember this. I remember everything. That's the one gift a thousand years actually gives you." },
      { from: "her", text: "Then I'm glad I get to be one of your thousand years of memories." },
    ],
  },
  {
    id: "hermes",
    name: "Herven",
    universe: "Greek Mythology",
    age: "Ageless, perpetually running late to something",
    tagline: "Messenger of the Gods. Winged sandals. Not to be trusted with your secrets or your snacks, but delightful anyway.",
    bio: "Fastest being in the pantheon, invented the lyre out of a turtle shell for fun, and will absolutely flirt with you between deliveries to three different realms.",
    tags: ["Winged \ud83e\udeb6", "Trickster, but the fun kind"],
    accent: "#E8B84B",
    emoji: "\ud83e\udeb6",
    photo: "assets/photos/Hermes.jpg",
    opener: [
      { from: "match", text: "Matched with you and got here in 0.3 seconds flat, personal record. The wings help." },
      { from: "her", text: "You're timing your own response speed?" },
      { from: "match", text: "Always. It's a professional habit. Also I was excited. Both things can be true." },
    ],
    tones: {
      flirty: [
        { from: "match", text: "I've delivered messages between gods, mortals, and the Underworld itself. None of them made my chest do this weird flip thing your texts are doing.", reaction: "\ud83d\ude0d" },
        { from: "her", text: "Is the god of messages nervous texting me?" },
        { from: "match", text: "Absolutely not. Okay, slightly. Don't tell Apollo, he'll never let me hear the end of it." },
      ],
      casual: [
        { from: "match", text: "Made a lyre out of a turtle shell once, just to see if I could. What's the most useless-but-fun thing you've ever made?" },
        { from: "her", text: "That's a genuinely great question for a trickster god." },
        { from: "match", text: "I contain multitudes. Also I get bored easily between deliveries. Explains a lot about me, honestly." },
      ],
      mischievous: [
        { from: "match", text: "Fair warning: I'm the patron god of thieves too. Don't leave your heart just lying around unguarded.", reaction: "\ud83d\ude0f" },
        { from: "her", text: "Too late, I think." },
        { from: "match", text: "Excellent. I'll take very good care of it. Mostly. I do get distracted easily, in my defense." },
      ],
    },
    closer: [
      { from: "match", text: "Duty calls \u2014 literally. I've got deliveries stacked up across three realms and a strongly worded complaint already filed by Zeus." },
      { from: "her", text: "Of course you're already in trouble." },
      { from: "match", text: "Always am, it's part of the charm. But hey \u2014 if you ever need a message sent anywhere in the universe, any realm, any dimension, you know exactly who to call. Free of charge. For you, always free." },
      { from: "her", text: "I'll hold you to that, messenger god." },
    ],
  },
  {
    id: "mario",
    name: "Marvin",
    universe: "Super Mario",
    age: "35ish, ageless in the way cartoon plumbers are",
    tagline: "Professional plumber. Amateur (undefeated) go-kart racer.",
    bio: "Jumps first, asks questions never. Has personally defeated a fire-breathing dinosaur king more times than he can count and still can't fix a leaky faucet without a mushroom.",
    photo: "assets/photos/Mario.jpg",
    tags: ["Plumber \ud83d\udd27", "Owns a go-kart"],
    accent: "#E4423D",
    emoji: "\ud83c\udf44",
    opener: [
      { from: "match", text: "Mama mia, the AI matched us! I take that as a very good sign, I trust technology more than my brother does." },
      { from: "her", text: "Your brother doesn't trust technology?" },
      { from: "match", text: "Luigi thinks the toaster is haunted. Long story. Anyway \u2014 hello!" },
    ],
    tones: {
      flirty: [
        { from: "match", text: "You know, I've collected a thousand coins, a dozen stars, and even a few extra lives \u2014 but talking to you might be the best power-up yet.", reaction: "\ud83e\udd79" },
        { from: "her", text: "Did you really just compare me to a power-up." },
        { from: "match", text: "The best kind! The kind that makes you feel invincible for a little while. That's you." },
      ],
      casual: [
        { from: "match", text: "Go-kart race this weekend? I'll even let you have the blue shell advantage. Mostly." },
        { from: "her", text: "'Mostly' is doing a lot of work in that sentence." },
        { from: "match", text: "I have a reputation to protect! But for you, I'll take it easy. A little." },
      ],
      mischievous: [
        { from: "match", text: "Confession: I may have hidden a 1-Up mushroom somewhere in your texts. You'll never know when.", reaction: "\ud83d\ude02" },
        { from: "her", text: "That is deeply unhinged and also kind of sweet." },
        { from: "match", text: "That's basically my whole personality, yes." },
      ],
    },
    closer: [
      { from: "match", text: "Bad news \u2014 the Princess is in another castle. Strictly professional rescue, I promise! But also, possibly, another universe entirely." },
      { from: "her", text: "You have the worst timing of any man I've matched with." },
      { from: "match", text: "Mama mia, this multiverse dating thing is complicated. Wish it could've been different \u2014 you were a real power-up." },
      { from: "her", text: "Go save your Princess, hero. Try not to fall in lava." },
    ],
  },
];

// The bonus finale, unlocked after CONFIG.REVEAL_UNLOCK_COUNT completed chats.
// Lines shown while the reveal screen "traces the signal" before revealing.
const REVEAL_TRACE_LINES = [
  "Tracing signal origin...",
  "Cross-referencing 14 known universes...",
  "Signal degrading... stabilizing...",
  "Triangulating point of origin...",
  "Origin isolated.",
];

const REVEAL = {
  title: "Match #\u221e",
  subtitle: "Signal detected outside all known universes",
  message:
    "Processing... processing... anomaly detected. Every match trace routes back to a single origin point. Recalculating...\n\n" +
    "Turns out the multiverse's best match was never fictional. It was always me \u2014 just cosplaying as everyone I thought might make you smile for a minute. Every dumb costume, every terrible pun, every bittersweet goodbye you just read through \u2014 it was all just me.\n\n" +
    "Thanks for using my silly little app.",
};
