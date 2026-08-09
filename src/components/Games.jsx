import React from "react";
import "../styles/Projects.css";
import "../styles/Games.css";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

const games = {
  Ashfall: {
    desc: "A falling-sand physics puzzle built from scratch on the HTML5 Canvas — no engine, no libraries. Chunked dirty-rect simulation over a 100,000-cell grid, holding 60fps in ~0.8ms per frame.",
    techStack: "JAVASCRIPT (ES6+), HTML5 CANVAS, CSS3",
    open: "https://alihassn10.github.io/ashfall/",
    link: "https://github.com/alihassn10/ashfall",
    platform: "Browser — desktop & mobile",
    image: "/assets/games/ashfall.png",
  },
  "Whispers in the Shadows": {
    desc: "A 3D first-person horror survival game with complex enemy AI and atmospheric environments. Built as my Final Year Project.",
    techStack: "UNITY, C#, BLENDER",
    open: "https://aliiih.itch.io/whispers-in-the-shadows",
    badge: "Ranked 3rd out of 160 projects",
    platform: "itch.io",
    image: "/assets/games/whispers-in-the-shadows.png",
  },
  "I Am Fun Monkey: Zoo Pranks 3D": {
    desc: "A 3D casual role-play game with interactive animal and human NPCs. Built the task-based gameplay loop and Firebase integration.",
    techStack: "UNITY, C#, FIREBASE",
    open: "https://tinyurl.com/I-Am-Fun-Monkey",
    platform: "Android",
    image: "/assets/games/monkey.webp",
  },
  "FPS Commando Strike Ops Gun 3D": {
    desc: "A cross-platform shooter with consumable and non-consumable IAP systems, custom UI screens, and third-party controller integration.",
    techStack: "UNITY, C#, FIREBASE, ANDROID / iOS SDKs",
    open: "https://tinyurl.com/Strike-Ops",
    platform: "Android / iOS",
  },
  "Parkour Runner 3D": {
    desc: "A hyper-casual 3D runner with character skin systems, checkpoint mechanics, and Firebase Remote Config, shipped to Android and iOS with cross-platform SDK integration.",
    techStack: "UNITY, C#, FIREBASE",
    open: "https://www.appbrain.com/appstore/catch-run-steal-braingot/ios-6749070784",
    platform: "Android / iOS",
    image: "/assets/games/parkour-runner.jpg",
  },
  "Car Repair: Mechanic Simulator": {
    desc: "A repair sim with interactive sanding, painting, dent repair, and tire replacement mechanics built on Paint in 3D workflows.",
    techStack: "UNITY, C#, FIREBASE",
    open: "https://tinyurl.com/Mechanic-Simulator",
    platform: "Android",
    image: "/assets/games/car-repair.jpg",
  },
  "Deconstruction Simulator": {
    desc: "A 3D simulation game focused on breaking objects into pieces, digging, picking up trash, and loading it into the truck to discard.",
    techStack: "UNITY, C#, FIREBASE",
    open: "https://apps.apple.com/ca/app/deconstruction-simulator-games/id1438383721",
    platform: "iOS",
    image: "/assets/games/deconstruction.webp",
  },
};

const Games = () => {
  return (
    <div id="games">
      <div className="section-header">
        <span className="section-title">/ games</span>
        <a
          href="https://aliiih.itch.io/"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all on itch.io
        </a>
      </div>
      <div className="project-container">
        <ul className="projects-grid">
          {Object.keys(games).map((key, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li className="projects-card">
                <div className="card-header">
                  {games[key]["image"] ? (
                    <div className="game-icon">
                      <img src={games[key]["image"]} alt={key} />
                    </div>
                  ) : (
                    <div className="game-icon game-icon--placeholder">
                      <SportsEsportsRoundedIcon sx={{ fontSize: 34 }} />
                    </div>
                  )}
                  <ExternalLinks
                    githubLink={games[key]["link"]}
                    openLink={games[key]["open"]}
                  />
                </div>

                <a
                  href={games[key]["open"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-link"
                >
                  <div className="card-title">{key}</div>
                </a>
                {games[key]["badge"] && (
                  <span className="game-badge">{games[key]["badge"]}</span>
                )}
                <div className="card-desc">{games[key]["desc"]}</div>
                {games[key]["platform"] && (
                  <div className="game-platform">{games[key]["platform"]}</div>
                )}
                <div className="card-tech">{games[key]["techStack"]}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Games;
