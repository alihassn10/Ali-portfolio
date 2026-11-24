import React, { useEffect, useRef } from "react";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import { games, software, stats, links } from "../data/content";

const CHAPTERS = 2;

const Chapter = ({ n, title, sub, meta, count }) => (
  <div className="work-chapter" data-label={`${n} / 0${CHAPTERS} · ${title}`}>
    <span className="chapter-num">{n}</span>
    <div>
      <h3 className="chapter-title">{title}</h3>
      <p className="chapter-sub">{sub}</p>
      <p className="chapter-meta">{meta}</p>
    </div>
    <span className="chapter-count">{count} projects</span>
  </div>
);

const Arrow = () => <span aria-hidden="true">↗</span>;

const GameCard = ({ g }) => (
  <article className="work-card">
    <div className="work-card-media">
      {g.image ? (
        <img src={g.image} alt="" loading="lazy" />
      ) : (
        <div className="media-placeholder">
          <SportsEsportsRoundedIcon sx={{ fontSize: 56 }} />
        </div>
      )}
      {g.badge && <span className="media-badge">{g.badge}</span>}
    </div>
    <div className="work-card-body">
      <div className="work-card-meta">
        <span>{g.platform}</span>
        {g.year && <span>{g.year}</span>}
      </div>
      <h4 className="work-card-title">{g.title}</h4>
      <div className="work-card-kind">{g.kind}</div>
      <p className="work-card-desc">{g.desc}</p>
      <ul className="tags">
        {g.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="work-card-foot">
        <a href={g.href} target="_blank" rel="noopener noreferrer">
          {g.cta} <Arrow />
        </a>
        {g.code && (
          <a href={g.code} target="_blank" rel="noopener noreferrer">
            Code <Arrow />
          </a>
        )}
      </div>
    </div>
  </article>
);

const SoftwareCard = ({ s }) => (
  <article className={`work-card${s.featured ? " work-card--featured" : ""}`}>
    <div className="work-card-media">
      {s.screens ? (
        <div className="screens">
          {s.screens.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
      ) : (
        <div className="media-placeholder media-placeholder--code">{"{ }"}</div>
      )}
      {s.badge && <span className="media-badge">{s.badge}</span>}
    </div>
    <div className="work-card-body">
      <div className="work-card-meta">
        <span>{s.kind}</span>
      </div>
      <h4 className="work-card-title">
        {s.image && <img className="title-icon" src={s.image} alt="" />}
        {s.title}
      </h4>
      <p className="work-card-desc">{s.desc}</p>
      <ul className="tags">
        {s.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {s.code && (
        <div className="work-card-foot">
          <a href={s.code} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow />
          </a>
        </div>
      )}
    </div>
  </article>
);

// Vertical scroll drives a horizontal track while the section is pinned.
// Below 800px the gallery simply stacks.
const Work = () => {
  const section = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    let raf = 0;
    let maxX = 0;
    const mq = window.matchMedia("(max-width: 800px)");

    const measure = () => {
      const sec = section.current;
      const tr = track.current;
      if (!sec || !tr) return;
      if (mq.matches) {
        sec.style.height = "";
        tr.style.transform = "";
        maxX = 0;
        return;
      }
      maxX = Math.max(0, tr.scrollWidth - window.innerWidth);
      sec.style.height = `${maxX + window.innerHeight}px`;
      update();
    };

    const update = () => {
      raf = 0;
      const sec = section.current;
      if (!sec || mq.matches) return;
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      track.current.style.transform = `translate3d(${(-p * maxX).toFixed(1)}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    // images change the track width as they load
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section id="work" className="work" ref={section}>
      <div className="work-sticky">
        <div className="work-track" ref={track}>
          <div className="work-intro">
            <p className="eyebrow">Selected work</p>
            <h2 className="work-heading">Work</h2>
            <p className="work-lead">
              Shipped mobile titles, solo builds and a few apps outside Unity. Every card links to
              something you can play or read.
            </p>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
            <p className="work-hint">Scroll to explore →</p>
          </div>

          <Chapter
            n="01"
            title="Games"
            sub="Shipped titles and solo builds"
            meta="Unity · C# · Firebase · Canvas"
            count={games.length}
          />
          {games.map((g) => (
            <GameCard key={g.title} g={g} />
          ))}

          <Chapter
            n="02"
            title="Software"
            sub="Apps and experiments outside Unity"
            meta="Flutter · Supabase · Python"
            count={software.length}
          />
          {software.map((s) => (
            <SoftwareCard key={s.title} s={s} />
          ))}

          <div className="work-end">
            <p className="eyebrow">More</p>
            <a href={links.itch} target="_blank" rel="noopener noreferrer">
              All games on itch.io <Arrow />
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              Code on GitHub <Arrow />
            </a>
          </div>
        </div>
        <div className="work-progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
};

export default Work;
