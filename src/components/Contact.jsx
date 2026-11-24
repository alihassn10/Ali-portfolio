import React from "react";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FadeInSection from "./FadeInSection";
import { links } from "../data/content";

const Contact = () => (
  <section id="contact" className="contact">
    <FadeInSection>
      <div className="panel contact-card">
        <p className="eyebrow">Contact</p>
        <h2 className="contact-title">Got a game in mind?</h2>
        <p className="contact-desc">
          Mobile games, rendering performance, or a prototype that needs to feel just right — I'd
          love to hear about it.
        </p>
        <div className="contact-links">
          <a className="btn btn--solid" href={links.email}>
            <EmailRoundedIcon sx={{ fontSize: 18 }} /> Email
          </a>
          <a className="btn" href={links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon sx={{ fontSize: 18 }} /> LinkedIn
          </a>
          <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon sx={{ fontSize: 18 }} /> GitHub
          </a>
          <a className="btn" href={links.itch} target="_blank" rel="noopener noreferrer">
            <SportsEsportsIcon sx={{ fontSize: 18 }} /> itch.io
          </a>
        </div>
      </div>
    </FadeInSection>
    <footer className="footer">
      <span>Built and designed by Ali Hassan · © 2026</span>
      <span className="footer-3d">3D character textured in Blender, rendered live with three.js</span>
    </footer>
  </section>
);

export default Contact;
