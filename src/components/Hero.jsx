import React from "react";
import { links } from "../data/content";
import { AVATAR_ENABLED, USE_3D } from "../three/support";

// Giant name that sits *behind* the 3D canvas (rendered outside #content so it
// can be layered under the avatar).
export const HeroBackdrop = () => (
  <div className="hero-backdrop" aria-hidden="true">
    <span>Ali Hassan</span>
  </div>
);

const Hero = () => (
  <section id="intro" className="hero">
    {AVATAR_ENABLED && !USE_3D && (
      <img className="hero-poster" src="/models/character-poster.webp" alt="Cartoon 3D character of Ali" />
    )}

    <div className="hero-copy">
      <p className="eyebrow">Game developer · Lahore</p>
      <h1 className="hero-title">
        hi, I'm <em>Ali</em>.
      </h1>
      <p className="hero-desc">
        I build and ship real-time 3D games for Android and iOS — profiling frame times, tuning
        rendering pipelines, and chasing what makes a game worth coming back to.
      </p>
      <div className="hero-actions">
        <a className="btn btn--solid" href="#work">
          See my work
        </a>
        <a className="btn" href={links.email}>
          Say hi
        </a>
      </div>
    </div>

    <div className="hero-now">
      <span className="dot" /> Now — Associate Game Developer @ Gamivision
    </div>
    <div className="hero-side">Based in Lahore, PK</div>
    <a className="hero-scroll" href="#about">
      Scroll
    </a>
  </section>
);

export default Hero;
