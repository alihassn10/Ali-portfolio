import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "intro", label: "Portfolio — 2026" },
  { id: "about", label: "About · Résumé" },
  { id: "work", label: "Selected work" },
  { id: "contact", label: "Contact" },
];

// Fixed top bar. The right-hand label follows the section in view, and inside
// the horizontal work gallery it shows the current chapter.
// Keeps the `navbar` class: game mode measures it to place its floor.
const TopBar = () => {
  const [label, setLabel] = useState(SECTIONS[0].label);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s;
      }
      let next = current.label;
      if (current.id === "work") {
        const mid = window.innerWidth * 0.6;
        document.querySelectorAll(".work-chapter").forEach((c) => {
          if (c.getBoundingClientRect().left <= mid) next = c.dataset.label;
        });
      }
      setLabel(next);
    };
    // two frames: let the work gallery apply its transform before measuring
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => (raf = requestAnimationFrame(update)));
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="navbar topbar">
      <a className="brand" href="#intro">
        <span className="brand-name">Ali Hassan</span>
        <span className="brand-role">Game developer</span>
      </a>
      <nav className="topbar-nav" aria-label="Sections">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
      <span className="topbar-label" aria-live="polite">
        {label}
      </span>
    </header>
  );
};

export default TopBar;
