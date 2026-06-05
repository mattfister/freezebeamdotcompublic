// games.js
// To add a game: append one object to this array, commit, and push.
// Images go in images/<slug>/ — reference them as { type: "image", src: "images/<slug>/filename.gif" }
// platforms: array of { name: "itch" | "steam", url: "..." }
// url: primary link used for capsule/title/card click (typically platforms[0].url)
// yearDisplay: optional string override shown in UI (e.g. "2025–?"); year stays numeric for sorting
const GAMES = [
  {
    title: "Realmfold",
    year: 2026,
    url: "https://freezebeam.itch.io/realmfold",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/realmfold" },
    ],
    description: "You've cast the Realmfold! Expand your leyline network and build an infinite wizard realm, but only if you seek arcane geometric perfection.",
    capsule: "images/realmfold/capsule.gif",
    media: [
      { type: "youtube", id: "GcExkB-Dack" },
      { type: "image", src: "images/realmfold/screenshot2.gif" },
      { type: "image", src: "images/realmfold/screenshot3.gif" },
      { type: "image", src: "images/realmfold/screenshot4.gif" },
    ]
  },
  {
    title: "Pandemonium Gems: Refaceted",
    year: 2026,
    url: "https://freezebeam.itch.io/pandemonium-gems-refaceted",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/pandemonium-gems-refaceted" },
    ],
    description: "The gem melting, tile placing, chain reaction puzzler is back! Now with online high scores and a daily mode.",
    capsule: "images/pandemonium-gems-refacted/capsule.gif",
    media: [
      { type: "youtube", id: "mw5P4MpaGEg" },
      { type: "image", src: "images/pandemonium-gems-refacted/screenshot1.gif" },
      { type: "image", src: "images/pandemonium-gems-refacted/screenshot2.gif" },
      { type: "image", src: "images/pandemonium-gems-refacted/screenshot3.gif" },
    ]
  },
  {
    title: "Interdimensional Jet Ski Simulator 2026",
    year: 2026,
    url: "https://freezebeam.itch.io/interdimensional-jet-ski-simulator-2026",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/interdimensional-jet-ski-simulator-2026" },
    ],
    description: "Drive your Jet Ski through infinite procedurally-generated worlds, collecting upgrades and avoiding the evil stare of Gazorax The Unblinking.",
    capsule: "images/jet-ski-sim/capsule.png",
    media: [
      { type: "youtube", id: "MbzTFoL0J5A" },
      { type: "image", src: "images/jet-ski-sim/itch_screenshot_1.png" },
      { type: "image", src: "images/jet-ski-sim/itch_screenshot_3.png" },
      { type: "image", src: "images/jet-ski-sim/itch_screenshot_4.png" },
    ]
  },
  {
    title: "Unseelie Chorus",
    year: 2025,
    url: "https://freezebeam.itch.io/unseelie-chorus",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/unseelie-chorus" },
    ],
    description: "An experimental shmup where the procedurally generated music and enemy attack patterns are connected.",
    capsule: "images/unseelie-chorus/capsule.gif",
    media: [
      { type: "image", src: "images/unseelie-chorus/itchscreen1.gif" },
      { type: "image", src: "images/unseelie-chorus/itchscreen2.gif" },
      { type: "image", src: "images/unseelie-chorus/itchscreen3.gif" },
      { type: "image", src: "images/unseelie-chorus/itchscreen4.gif" },
    ]
  },
  {
    title: "Towerbound",
    year: 2025,
    yearDisplay: "2025–?",
    url: "https://freezebeam.itch.io/towerbound",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/towerbound" },
    ],
    description: "Build your wizard tower during the day and defend it at night in this coffee-break, tower building, tower defending roguelike.",
    capsule: "images/towerbound/capsule.gif",
    media: [
      { type: "youtube", id: "_C257_qxGpg" },
      { type: "image", src: "images/towerbound/steamscreenbuild.png" },
      { type: "image", src: "images/towerbound/steamscreendefend.png" },
      { type: "image", src: "images/towerbound/steamscreenworld.png" },
    ]
  },
  {
    title: "Pandemonium Gems",
    year: 2025,
    url: "https://freezebeam.itch.io/pandemonium-gems",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/pandemonium-gems" },
    ],
    description: "An experiment 16x9 (pixels!) tile placing puzzle game.",
    capsule: "images/pandemonium-gems/capsule.jpg",
    media: [
      { type: "youtube", id: "0rsFs9mAANc" },
      { type: "image", src: "images/pandemonium-gems/screenshot1.gif" },
      { type: "image", src: "images/pandemonium-gems/screenshot2.gif" },
      { type: "image", src: "images/pandemonium-gems/screenshot3.gif" },
    ]
  },
  {
    title: "Escape Wizard",
    year: 2024,
    yearDisplay: "2024–2026",
    url: "https://freezebeam.itch.io/escape-wizard",
    platforms: [
      { name: "itch", url: "https://freezebeam.itch.io/escape-wizard" },
    ],
    description: "Escape Pandemonium alone or with a friend in this retro-hard, cursed arcade game inspired by survivors games and classic shmups.",
    capsule: "images/escape-wizard/escape_wizard_itch_cover_gif.gif",
    media: [
      { type: "youtube", id: "9V4q6p_DQ_4" },
      { type: "image", src: "images/escape-wizard/screenshot1.gif" },
      { type: "image", src: "images/escape-wizard/screenshot2.gif" },
      { type: "image", src: "images/escape-wizard/screenshot3.png" },
    ]
  },
  {
    title: "Evoplasm",
    year: 2024,
    yearDisplay: "2024–?",
    url: "https://store.steampowered.com/app/3010490/Evoplasm/",
    platforms: [
      { name: "steam", url: "https://store.steampowered.com/app/3010490/Evoplasm/" },
      { name: "itch", url: "https://freezebeam.itch.io/evoplasm" },
    ],
    description: "Evolve and fight in this creature building Roguelike.",
    capsule: "images/evoplasm/capsule.png",
    media: [
      { type: "youtube", id: "AdhoRLpLqjI" },
      { type: "image", src: "images/evoplasm/screenshot1.png" },
      { type: "image", src: "images/evoplasm/screenshot2.png" },
      { type: "image", src: "images/evoplasm/screenshot3.png" },
    ]
  },
];
