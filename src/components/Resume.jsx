import React from "react";
import FadeInSection from "./FadeInSection";
import { about, education, experience } from "../data/content";

// About + résumé: glass panels in a column on the right while the avatar's
// face holds the left half of the screen.
const Resume = () => (
  <section id="about" className="resume">
    <div className="resume-col">
      <FadeInSection>
        <article className="panel panel--intro">
          <p className="eyebrow">About</p>
          <h2 className="panel-title">About Ali</h2>
          <p className="lead">{about.intro}</p>
        </article>
      </FadeInSection>

      <FadeInSection>
        <h3 className="col-heading">
          Résumé <span>{experience.length} roles</span>
        </h3>
      </FadeInSection>

      {experience.map((job) => (
        <FadeInSection key={job.org}>
          <article className="panel job">
            <div className="job-head">
              <span className="job-mark" aria-hidden="true">
                {job.mark}
              </span>
              <div>
                <div className="job-period">{job.period}</div>
                <h4 className="job-org">{job.org}</h4>
                <div className="job-role">{job.role}</div>
              </div>
            </div>
            <ul className="job-points">
              {job.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </article>
        </FadeInSection>
      ))}

      <FadeInSection>
        <article className="panel job">
          <div className="job-head">
            <span className="job-mark" aria-hidden="true">
              UCP
            </span>
            <div>
              <div className="job-period">{education.period}</div>
              <h4 className="job-org">{education.degree}</h4>
              <div className="job-role">{education.school}</div>
            </div>
          </div>
        </article>
      </FadeInSection>

      <FadeInSection>
        <article className="panel">
          <p className="eyebrow">Toolkit</p>
          <ul className="chips">
            {about.toolkit.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      </FadeInSection>

      <FadeInSection>
        <article className="panel panel--quote">
          <p>{about.philosophy}</p>
        </article>
      </FadeInSection>
    </div>
  </section>
);

export default Resume;
