"use client";
import React, { useRef } from "react";
import { useActiveSectionContext } from "../context/active-section-context";
import Header from "./HeaderSection";
import Introduction from "./IntroductionSection";
import Skills from "./SkillsSections";
import Education from "./EducationSection";
import Projects from "./ProjectsSection";
import Experience from "./ExperienceSection";
import Contact from "./ContactSection";
import AboutNew from "./AboutSection/AboutNew";
import CanvasScrollSequence from "./CanvasScrollSequence";

const MainComponent: React.FC = () => {
  const { activeSection, setActiveSection } = useActiveSectionContext();

  const introductionRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollHandler = (sectionRef: React.RefObject<HTMLElement | null>) => {
    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        scrollHandler={scrollHandler}
        refs={{
          introductionRef,
          aboutRef,
          skillsRef,
          educationRef,
          projectsRef,
          experienceRef,
          contactRef,
        }}
      />

      {/* ── Hero ── */}
      <section ref={introductionRef}>
        <Introduction
          setActiveSection={setActiveSection}
          scrollHandler={scrollHandler}
        />
      </section>

      {/* ── About ── */}
      <section ref={aboutRef}>
        <AboutNew />
      </section>

      {/* ── Skills ── */}
      <section ref={skillsRef}>
        <Skills />
      </section>

      {/* ── Education ── */}
      <section ref={educationRef}>
        <Education />
      </section>

      {/* ── Experience ── */}
      <section ref={experienceRef}>
        <Experience />
      </section>

      {/* ── Projects ── */}
      <section ref={projectsRef}>
        <Projects />
      </section>

      {/* ── Contact ── */}
      <section ref={contactRef}>
        <Contact />
      </section>
    </>
  );
};

export default MainComponent;
