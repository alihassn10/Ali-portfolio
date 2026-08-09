import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

const About = () => {
  const one = (
    <p>
      I am currently an <b>Associate Game Developer</b> at <b>Gamivision</b>,
      where I ship real-time 3D titles to Android and iOS — profiling
      performance, optimizing rendering pipelines, and building the systems that
      keep live games running. Before that I interned at{" "}
      <b>Fantix Technologies</b> building Android apps in Java and Kotlin, and
      co-organized <b>TechnoCon</b> at UCP Lahore.
    </p>
  );
  const two = (
    <p>
      Games taught me that good code is only half the job — the other half is
      understanding people. I approach development with empathy and from
      multiple perspectives, blending the sciences and the humanities: the
      technical science of making multiplayer systems run smoothly, and the
      human question of what actually makes a game fun to come back to.
    </p>
  );

  const techStack = [
    "Unity",
    "C#",
    "Lua",
    "Blender",
    "Git",
    "HTML5",
    "OOP",
    "Profiling",
    "QA",
  ];

  return (
    <div id="about">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ about me</span>
        </div>
        <div className="about-content">
          <div className="about-description">
            {one}
            {"Here are some technologies I have been working with:"}
            <ul className="tech-stack">
              {techStack.map((techItem, i) => (
                <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                  <li>{techItem}</li>
                </FadeInSection>
              ))}
            </ul>
            {two}
          </div>
          <div className="about-image">
            <img alt="Ali Hassan" src={"/assets/me3.jpeg"} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default About;
