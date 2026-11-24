import React, { useState, lazy, Suspense } from "react";
import { AVATAR_ENABLED, USE_3D } from "./three/support";
import TopBar from "./components/TopBar";
import Hero, { HeroBackdrop } from "./components/Hero";
import Resume from "./components/Resume";
import Work from "./components/Work";
import Contact from "./components/Contact";
import RobotGame from "./components/RobotGame";
import "./styles/site.css";
import "./styles/RobotGame.css";

// three.js is split into its own chunk so the page text paints first.
const Scene = lazy(() => import("./three/Scene"));

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);

  return (
    <div className={`App${USE_3D ? " App--3d" : ""}${AVATAR_ENABLED ? "" : " App--no-avatar"}`}>
      {/* layer order: backdrop name → 3D avatar → page content */}
      <HeroBackdrop />
      {USE_3D && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <TopBar />

      <div className="game-toggle-fixed">
        <div className="game-toggle-row">
          <button
            className={`game-toggle-btn${gameActive ? " game-toggle-btn--on" : ""}`}
            onClick={() => setGameActive((a) => !a)}
            title={gameActive ? "Disable game mode" : "Enable game mode"}
          >
            <span className="game-toggle-dot" />
            game mode
          </button>
          {gameActive && (
            <button
              className="game-info-btn"
              onMouseEnter={() => setShowGameInfo(true)}
              onMouseLeave={() => setShowGameInfo(false)}
            >
              i
            </button>
          )}
        </div>
        {showGameInfo && gameActive && (
          <div className="robot-game-info">
            <div className="robot-game-info-title">how to play</div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">← →</span>
              <span>move</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">space</span>
              <span>jump</span>
            </div>
            <div className="robot-game-info-row">
              <span className="robot-game-key">scroll</span>
              <span>explore</span>
            </div>
            <div className="robot-game-info-goal">collect your scattered brain cells</div>
          </div>
        )}
      </div>
      <RobotGame active={gameActive} />

      <main id="content">
        <Hero />
        <Resume />
        <Work />
        <Contact />
      </main>
    </div>
  );
}

export default App;
