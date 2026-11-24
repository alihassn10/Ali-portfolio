// All portfolio copy and project data in one place.

export const links = {
  email: "mailto:ali.ctrlshift@gmail.com",
  github: "https://github.com/alihassn10",
  linkedin: "https://www.linkedin.com/in/ali-hassan-400717219/",
  itch: "https://aliiih.itch.io/",
};

export const about = {
  intro:
    "I'm Ali — a game developer from Lahore who builds and ships real-time 3D games for Android and iOS. I profile frame times, tune rendering pipelines, and chase the thing that makes a game worth coming back to.",
  philosophy:
    "Games taught me that good code is only half the job — the other half is understanding people. I blend the technical science of making systems run smoothly with the human question of what actually makes a game fun to come back to.",
  toolkit: [
    "Unity · C#",
    "Lua",
    "Blender",
    "Firebase · Remote Config",
    "Android / iOS SDKs · IAP",
    "Profiling · Optimization",
    "HTML5 Canvas · JavaScript",
    "Flutter · Dart",
    "Git · QA",
  ],
};

export const experience = [
  {
    period: "Apr 2025 – Now",
    org: "Gamivision",
    mark: "GV",
    role: "Associate Game Developer",
    points: [
      "Cut load times and stabilized frame rates across 5+ titles by profiling bottlenecks and optimizing rendering pipelines on Android and iOS.",
      "Drove monetization improvements across 3 live titles by redesigning in-game ad placement.",
      "Shipped features faster alongside senior engineers and designers through Git-based workflows.",
      "Promoted from Junior to Associate within the first three months.",
    ],
  },
  {
    period: "Nov 2024",
    org: "TechnoCon · UCP Lahore",
    mark: "TC",
    role: "Co-Organizer",
    points: [
      "Co-organized and hosted TechnoCon, a university-wide tech event.",
      "Coordinated scheduling, logistics and on-site operations across the organizing team.",
    ],
  },
  {
    period: "Aug – Oct 2023",
    org: "Fantix Technologies",
    mark: "FX",
    role: "Software Engineer Intern",
    points: [
      "Built and shipped Android features in Java and Kotlin.",
      "Worked with Node.js services — the full request path from mobile client to API.",
      "Followed team code review and source-control practice alongside senior engineers.",
    ],
  },
];

export const stats = [
  { value: "08", label: "games built and shipped" },
  { value: "06", label: "titles live on Play / App Store" },
  { value: "3rd", label: "of 160 final-year projects" },
  { value: "0.8ms", label: "per frame in Ashfall's 100k-cell sim" },
];

export const games = [
  {
    title: "Ashfall",
    kind: "Falling-sand physics puzzle",
    platform: "Browser",
    year: "2025",
    desc: "Built from scratch on HTML5 Canvas — no engine, no libraries. A chunked dirty-rect simulation over a 100,000-cell grid holding 60fps.",
    tags: ["JavaScript", "Canvas", "60fps"],
    image: "/assets/games/ashfall.png",
    href: "https://alihassn10.github.io/ashfall/",
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
    title: "Car Mechanic Workshop Sim 2026",
    kind: "3D simulation",
    platform: "Google Play",
    desc: "Inspect vehicles, repair engines, swap damaged parts, then restore and customize cars across hands-on workshop jobs.",
    tags: ["Unity", "C#", "Sim"],
    image: "/assets/games/car-mechanic-workshop.webp",
    href: "https://play.google.com/store/apps/details?id=com.sbn.car.mechanic.workshop.sim",
    cta: "Google Play",
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
    href: "https://tinyurl.com/I-Am-Fun-Monkey",
    cta: "Google Play",
  },
  {
    title: "FPS Commando Strike Ops Gun 3D",
    kind: "Cross-platform shooter",
    platform: "Android / iOS",
    desc: "Consumable and non-consumable IAP systems, custom UI screens and third-party controller support.",
    tags: ["Unity", "IAP", "Firebase"],
    image: null,
    href: "https://tinyurl.com/Strike-Ops",
    cta: "Store",
  },
  {
    title: "Parkour Runner 3D",
    kind: "Hyper-casual runner",
    platform: "Android / iOS",
    desc: "Character skins, checkpoints and Firebase Remote Config, shipped cross-platform with SDK integrations.",
    tags: ["Unity", "C#", "Remote Config"],
    image: "/assets/games/parkour-runner.jpg",
    href: "https://www.appbrain.com/appstore/catch-run-steal-braingot/ios-6749070784",
    cta: "App Store",
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
    desc: "Predicts the likelihood of heart disease from patient indicators — data cleaning, feature selection and model evaluation.",
    tags: ["Python", "scikit-learn", "Pandas"],
    code: "https://github.com/alihassn10/Heart-Disease-Prediction-using-Machine-Learining",
  },
  {
    title: "ali_coin",
    kind: "Cryptocurrency from scratch",
    desc: "A blockchain built to understand how they really work — block structure, hashing, proof of work and transaction validation.",
    tags: ["Python", "Blockchain"],
    code: "https://github.com/alihassn10/alicoin_cryptocurrency",
  },
];
