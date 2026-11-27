// All portfolio copy and project data in one place.
// House style: no dashes in visible copy (use commas, colons or "to").

export const links = {
  email: "mailto:ali.ctrlshift@gmail.com",
  github: "https://github.com/alihassn10",
  linkedin: "https://www.linkedin.com/in/ali-hassan-400717219/",
  itch: "https://aliiih.itch.io/",
};

export const hero = {
  eyebrow: "Gameplay programmer · Lahore",
  desc: "Horror, racing, shooters, platformers, multiplayer. 12+ games shipped. Give me any genre and I'll make it fun to play.",
  now: "Now: Associate Game Developer at Gamivision",
};

export const about = {
  intro:
    "I'm Ali, a gameplay programmer from Lahore. State machines, enemy AI, physics movement, cutscenes: I build the systems players actually feel, in any genre, on any platform.",
  philosophy:
    "Good code is only half the job. The other half is knowing why a player comes back for one more run.",
  toolkit: [
    "Unity 2D / 3D · C#",
    "State machines · Enemy AI",
    "Physics movement · Object pooling",
    "Animator · Timeline · Cinemachine",
    "Multiplayer · Netcode",
    "Editor tools · Profiler",
    "Firebase · Remote Config",
    "Java · Kotlin · JavaScript · Python · Dart · Lua",
    "Git · Code review",
  ],
};

export const experience = [
  {
    period: "Jan 2025 to Now",
    org: "Gamivision",
    mark: "GV",
    role: "Associate Game Developer",
    points: [
      "Shipped 12+ games for Android and iOS from scratch: casual, hyper-casual, simulation, story and PvP, owning gameplay systems end to end.",
      "Built gameplay in C# on state machines, physics-based character and vehicle movement, enemy AI and object pooling.",
      "Brought art to life with Animator controllers, blend trees and Timeline and Cinemachine cutscenes triggered from gameplay.",
      "Wrote Unity Editor tools, profiled 5+ live titles to cut load times and steady frame rates, and tuned economy, difficulty and progression.",
      "Promoted from Junior to Associate.",
    ],
  },
  {
    period: "May 2024 to Now",
    org: "Fiverr",
    mark: "FV",
    role: "Game Developer & Game Tester, Freelance",
    points: [
      "Unity development for clients: core gameplay systems, performance testing, QA passes and critical bug fixes on production builds.",
    ],
  },
  {
    period: "Aug to Oct 2023",
    org: "Fantix Technologies",
    mark: "FX",
    role: "Software Engineer Intern",
    points: ["Built and shipped Android features in Java and Kotlin against Node.js backend services."],
  },
];

export const education = {
  period: "Sep 2021 to Oct 2025",
  school: "University of Central Punjab, Lahore",
  degree: "BS Software Engineering",
};

export const stats = [
  { value: "12+", label: "games shipped" },
  { value: "2.5", label: "years in Unity and C#" },
  { value: "3rd", label: "of 160 final-year projects" },
  { value: "<1ms", label: "per frame in Ashfall's 100k-cell sim" },
];

// A game with no `href` shows no store link.
export const games = [
  {
    title: "Ashfall",
    kind: "Falling-sand physics puzzle",
    platform: "Browser",
    year: "2025",
    desc: "Built from scratch on HTML5 Canvas, no engine and no libraries. A chunked simulation over a 100,000-cell grid, profiled to under 1 ms per frame.",
    tags: ["JavaScript", "Canvas", "60fps"],
    image: "/assets/games/ashfall.png",
    href: "https://ashfall-gray.vercel.app/",
    code: "https://github.com/alihassn10/ashfall",
    cta: "Play",
  },
  {
    title: "Whispers in the Shadows",
    kind: "First-person horror survival",
    platform: "itch.io",
    badge: "Ranked 3rd / 160",
    desc: "My final-year project: a 3D horror survival game with complex enemy AI and atmospheric environments.",
    tags: ["Unity", "C#", "Blender"],
    image: "/assets/games/whispers-in-the-shadows.png",
    href: "https://aliiih.itch.io/whispers-in-the-shadows",
    cta: "itch.io",
  },
  {
    title: "Co-op Multiplayer Hand Cricket",
    kind: "Real-time multiplayer sports",
    platform: "Android · itch.io",
    desc: "2D real-time multiplayer cricket with batting and bowling mechanics, live scoring and player versus player matches.",
    tags: ["Unity", "C#", "Netcode"],
    image: "/assets/games/hand-cricket.png",
    href: "https://aliiih.itch.io/hand-cricket",
    cta: "itch.io",
  },
  {
    title: "Traffic Bike: Wheelie Moto 3D",
    kind: "Motorcycle stunt game",
    platform: "Android / iOS",
    desc: "Physics-based wheelie and balance mechanics. Players control acceleration and balance through skill-based riding challenges.",
    tags: ["Unity", "C#", "Firebase"],
    image: "/assets/games/traffic-bike.png",
    href: "https://play.google.com/store/apps/details?id=com.gqit.extreme.wheelie.bike",
    cta: "Google Play",
  },
  {
    title: "Obby Tower Rush: Climb & Jump",
    kind: "Tower climbing platformer",
    platform: "Google Play",
    desc: "Jump platform to platform up a tower, collect coins, unlock pets and upgrade outfits on the way to the top.",
    tags: ["Platformer", "Pets", "Outfits"],
    image: "/assets/games/obby-tower-rush.png",
    href: "https://play.google.com/store/apps/details?id=com.climb.jump.tower.game",
    cta: "Google Play",
  },
  {
    title: "Car Mechanic Workshop Sim 2026",
    kind: "3D simulation",
    platform: "Google Play",
    desc: "Inspect vehicles, repair engines, swap damaged parts, then restore and customize cars across hands-on workshop jobs.",
    tags: ["Unity", "C#", "Sim"],
    image: "/assets/games/car-mechanic-workshop.webp",
  },
  {
    title: "No More Zombies: Hell Room",
    kind: "Wave-based shooter",
    platform: "Google Play",
    desc: "Undead hordes, escalating combat missions and fast shooting across rooms, streets and abandoned zones.",
    tags: ["Unity", "C#", "Shooter"],
    image: "/assets/games/no-more-zombies.webp",
    href: "https://play.google.com/store/apps/details?id=com.hrsl.nomore.zombies.room",
    cta: "Google Play",
  },
  {
    title: "Chaotic Gas Station Cars Prank",
    kind: "Sandbox driving",
    platform: "Google Play",
    desc: "Drive and park different cars, pull off pranks and clear quick driving challenges in a busy gas station.",
    tags: ["Unity", "C#", "Driving"],
    image: "/assets/games/gas-station.webp",
    href: "https://play.google.com/store/apps/details?id=com.hrsl.chaotic.gas.station",
    cta: "Google Play",
  },
  {
    title: "I Am Fun Monkey: Zoo Pranks 3D",
    kind: "Casual role-play",
    platform: "Google Play",
    desc: "Interactive animal and human NPCs. I built the task-based gameplay loop and the Firebase integration.",
    tags: ["Unity", "C#", "Firebase"],
    image: "/assets/games/monkey.webp",
  },
  {
    title: "Parkour Runner 3D",
    kind: "Hyper-casual runner",
    platform: "Android / iOS",
    desc: "Character skins, checkpoints and Firebase Remote Config, shipped cross-platform with SDK integrations.",
    tags: ["Unity", "C#", "Remote Config"],
    image: "/assets/games/parkour-runner.jpg",
  },
];

export const software = [
  {
    title: "Yumeter",
    kind: "AI calorie tracker · Android & iOS",
    badge: "In development",
    desc: "Snap a meal and a Gemini vision model estimates calories and macros. Barcode scan, offline logging with background sync, and progress charts for intake and weight.",
    tags: ["Flutter", "Riverpod", "Supabase", "Gemini"],
    image: "/assets/projects/yumeter/icon.png",
    screens: [
      "/assets/projects/yumeter/welcome.png",
      "/assets/projects/yumeter/today.png",
      "/assets/projects/yumeter/progress.png",
    ],
    featured: true,
  },
  {
    title: "Heart Disease Detection",
    kind: "Machine learning",
    desc: "Predicts the likelihood of heart disease from patient indicators, covering data cleaning, feature selection and model evaluation.",
    tags: ["Python", "scikit-learn", "Pandas"],
    code: "https://github.com/alihassn10/Heart-Disease-Prediction-using-Machine-Learining",
  },
];
