"use client";
import React, { useState, useEffect } from "react";
import { links } from "../../lib/data";
import clsx from "clsx";
import { MobileViewMenu } from "./MobileViewMenu";
import { NavigationLinks } from "./NavigationLinks";
import { GgMenuRight } from "../../assets/icons";
import logoImg from "../../assets/Profile/aaa.png";
import ThemeToggle from "../ThemeToggle";

type SectionName =
  | "Intro"
  | "Story"
  | "Skills"
  | "Education"
  | "Journey"
  | "Work"
  | "Connect";

interface HeaderProps {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
  scrollHandler: (sectionRef: React.RefObject<HTMLElement | null>) => void;
  refs: {
    introductionRef: React.RefObject<HTMLElement | null>;
    aboutRef: React.RefObject<HTMLElement | null>;
    skillsRef: React.RefObject<HTMLElement | null>;
    educationRef: React.RefObject<HTMLElement | null>;
    projectsRef: React.RefObject<HTMLElement | null>;
    experienceRef: React.RefObject<HTMLElement | null>;
    contactRef: React.RefObject<HTMLElement | null>;
  };
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  scrollHandler,
  refs,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToSection = (sectionName: SectionName) => {
    switch (sectionName) {
      case "Intro":
        scrollHandler(refs.introductionRef);
        break;
      case "Story":
        scrollHandler(refs.aboutRef);
        break;
      case "Skills":
        scrollHandler(refs.skillsRef);
        break;
      case "Education":
        scrollHandler(refs.educationRef);
        break;
      case "Journey":
        scrollHandler(refs.experienceRef);
        break;
      case "Work":
        scrollHandler(refs.projectsRef);
        break;
      case "Connect":
        scrollHandler(refs.contactRef);
        break;
    }
  };

  return (
    <>
      {/* ── Floating pill nav ─────────────────────────────────────────── */}
      <header
        className={clsx(
          "fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          "flex items-center justify-center",
        )}
      >
        {/* Desktop nav pill */}
        <div
          className={clsx(
            "hidden md:flex items-center gap-1 px-3 py-2 rounded-full",
            "transition-all duration-500",
            scrolled
              ? "bg-white/80 dark:bg-[rgba(5,5,8,0.85)] backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-[0_0_40px_rgba(255,107,43,0.08)]"
              : "bg-white/50 dark:bg-[rgba(5,5,8,0.55)] backdrop-blur-xl border border-black/5 dark:border-white/5",
          )}
        >
          {/* Logo dot */}
          <a
            href="#Intro"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("Intro");
              handleScrollToSection("Intro");
            }}
            className="flex items-center gap-2 px-3 py-1.5 mr-2"
          >
            <div
              className="w-6 h-6 rounded-full overflow-hidden border border-orange-400/40"
              style={{ boxShadow: "0 0 12px rgba(255,107,43,0.4)" }}
            >
              <img
                src={logoImg.src}
                alt="MK"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">
              MK
            </span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

          {/* Nav links */}
          <NavigationLinks
            activeSection={activeSection}
            links={links}
            handleScrollToSection={handleScrollToSection}
            setActiveSection={setActiveSection}
          />

          {/* CTA */}
          <a
            href="#Connect"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("Connect");
              handleScrollToSection("Connect");
            }}
            className="ml-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide
              text-white transition-all duration-300 whitespace-nowrap shrink-0
              bg-gradient-to-r from-orange-500 to-orange-400
              hover:shadow-[0_0_20px_rgba(255,107,43,0.5)]
              hover:from-orange-400 hover:to-orange-300"
          >
            Hire Me
          </a>

          {/* Theme Toggle (separated by a divider) */}
          <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div
          className="md:hidden flex items-center gap-3 px-4 py-2 rounded-full
          bg-white/80 dark:bg-[rgba(5,5,8,0.85)] backdrop-blur-2xl border border-black/10 dark:border-white/10"
        >
          <a
            href="#Intro"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("Intro");
              handleScrollToSection("Intro");
            }}
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-orange-400/40">
              <img
                src={logoImg.src}
                alt="MK"
                className="w-full h-full object-cover"
              />
            </div>
          </a>
          <span className="text-slate-900 dark:text-white font-bold text-sm">
            MK
          </span>
          <button
            onClick={toggleMenu}
            className="ml-2 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <GgMenuRight width={26} height={26} />
          </button>
          {/* Theme Toggle on mobile */}
          <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileViewMenu
          closeMenu={closeMenu}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          links={links}
          handleScrollToSection={handleScrollToSection}
        />
      )}
    </>
  );
};

export default Header;
