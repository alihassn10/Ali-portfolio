import React from "react";
import "../styles/Projects.css";
import "../styles/Games.css";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

const featured = {
  name: "Yumeter",
  badge: "In development — pre-release",
  desc: "An AI calorie tracker for Android and iOS. Snap a meal and a Gemini vision model estimates calories and macros; scan barcodes or search Open Food Facts for packaged food. Onboarding builds a personalized calorie and macro plan, logging works offline and syncs in the background, and progress charts track intake and weight over time.",
  techStack: "Flutter, Dart, Riverpod, Supabase (Postgres, Edge Functions), Gemini API",
  icon: "/assets/projects/yumeter/icon.png",
  screenshots: [
    { src: "/assets/projects/yumeter/welcome.png", alt: "Yumeter welcome screen" },
    { src: "/assets/projects/yumeter/today.png", alt: "Yumeter daily dashboard" },
    { src: "/assets/projects/yumeter/progress.png", alt: "Yumeter progress charts" },
    { src: "/assets/projects/yumeter/plan.png", alt: "Yumeter personalized plan" },
  ],
};

const projects = {
  "Heart Disease Detection": {
    desc: "A machine learning model that predicts the likelihood of heart disease from patient health indicators, covering data cleaning, feature selection, and model evaluation.",
    techStack: "Python, scikit-learn, Pandas",
    link: "https://github.com/alihassn10/Heart-Disease-Prediction-using-Machine-Learining",
  },
  "ali_coin Cryptocurrency": {
    desc: "A cryptocurrency built from scratch to understand how blockchains actually work — block structure, hashing, proof of work, and transaction validation.",
    techStack: "Python, Blockchain",
    link: "https://github.com/alihassn10/alicoin_cryptocurrency",
  },
};

const Projects = () => {
  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">/ software</span>
        <a
          href="https://github.com/alihassn10"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all projects
        </a>
      </div>
      <div className="project-container">
        <FadeInSection delay="100ms">
          <div className="projects-card featured-card">
            <div className="featured-info">
              <div className="card-header">
                <div className="game-icon">
                  <img src={featured.icon} alt={featured.name} />
                </div>
              </div>
              <div className="card-title">{featured.name}</div>
              <span className="game-badge">{featured.badge}</span>
              <div className="card-desc">{featured.desc}</div>
              <div className="card-tech">{featured.techStack}</div>
            </div>
            <div className="featured-shots">
              {featured.screenshots.map((shot) => (
                <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </FadeInSection>
        <ul className="projects-grid">
          {Object.keys(projects).map((key, i) => (
            <FadeInSection key={i} delay={(i + 2) * 100 + "ms"}>
              <li className="projects-card">
                <div className="card-header">
                  <div className="folder-icon">
                    <FolderOpenRoundedIcon sx={{ fontSize: 35 }} />
                  </div>
                  <ExternalLinks
                    githubLink={projects[key]["link"]}
                    openLink={projects[key]["open"]}
                  />
                </div>

                <div className="card-title">{key}</div>
                <div className="card-desc">{projects[key]["desc"]}</div>
                <div className="card-tech">{projects[key]["techStack"]}</div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
