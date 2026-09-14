"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, Variants, AnimatePresence } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { LuArrowUpRight, LuPlay } from "react-icons/lu";
import FAQAccordion from "../MyServices/Documentation";

import pf6 from "../../assets/portfolio-images/PF6.png";
import pf7 from "../../assets/portfolio-images/PF7.png";

// ── Animation Variants
const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// ── Project Data
const projectCards = [
  {
    title: "TaskTrackr Pro",
    subtitle: "Productivity App",
    des: "A simple and efficient task tracking app to add, organize, and complete your daily tasks effortlessly.",
    image: pf6.src,
    url: "https://task-trackr-pro.vercel.app/",
    repoUrl: "https://github.com/muralidharank28698/TaskTrackrPro",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    tags: [
      { label: "Full Stack", color: "#f97316" },
      { label: "Live", color: "#34d399" },
    ],
  },
  {
    title: "Zytravo Trvls",
    subtitle: "Car Rental & Booking Platform",
    des: "A modern car booking web application that allows users to browse available cars, view details, and book vehicles easily through a clean and responsive interface.",
    image: pf7.src,
    url: "https://zytravo.vercel.app/",
    repoUrl: "https://github.com/muralidharank28698/travpro",
    techStack: ["Next.js", "React", "Tailwind CSS", "REST API"],
    tags: [
      { label: "Web App", color: "#f59e0b" },
      { label: "Live", color: "#34d399" },
    ],
  },
];

// ── Tabs
const TABS = ["Projects", "FAQs"] as const;
type Tab = (typeof TABS)[number];

// ── Project Card Component (inline, redesigned)
function ProjectCard({ project }: { project: typeof projectCards[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(255,107,43,0.06), transparent 80%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      variants={fadeUp}
      tabIndex={-1}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer outline-none focus:outline-none
        w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink
        bg-white/70 dark:bg-white/[0.02]
        border border-black/[0.06] dark:border-white/[0.06]
        hover:border-orange-400/25 dark:hover:border-orange-400/20
        hover:shadow-[0_8px_40px_rgba(255,107,43,0.08)]
        transition-all duration-300"
    >
      {/* Spotlight hover */}
      <motion.div
        className="absolute inset-0 z-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlightBg }}
      />

      {/* Top accent line on hover */}
      <div className="absolute inset-x-0 top-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

      {/* Image Container with Framing Gap */}
      <div className="p-3 sm:p-3.5 pb-0 relative z-10">
        <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-black/[0.06] dark:border-white/[0.08] bg-slate-100 dark:bg-neutral-900/50 shadow-xs">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Fade overlay — light */}
          <div
            className="absolute inset-0 dark:hidden pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.7) 100%)",
            }}
          />
          {/* Fade overlay — dark */}
          <div
            className="absolute inset-0 hidden dark:block pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, rgba(10,10,18,0.7) 100%)",
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 bg-black/20 backdrop-blur-[2px]">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white backdrop-blur-xl shadow-lg"
              style={{
                background: "rgba(8,8,18,0.75)",
                border: "1px solid rgba(255,107,43,0.35)",
              }}
            >
              <LuArrowUpRight size={14} className="text-orange-400" />
              View Details
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white/90 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-xs mt-0.5 text-slate-400 dark:text-white/35">{project.subtitle}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
            bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.06]
            text-slate-400 dark:text-white/30
            group-hover:bg-orange-500/10 group-hover:border-orange-400/30 group-hover:text-orange-500 dark:group-hover:text-orange-400">
            <HiOutlineExternalLink size={14} />
          </div>
        </div>

        {project.des && (
          <p className="text-xs leading-relaxed line-clamp-2 text-slate-500 dark:text-white/40">
            {project.des}
          </p>
        )}

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech, i) => (
            <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide
              bg-orange-500/[0.07] text-orange-600 dark:text-orange-400 border border-orange-400/15 dark:border-orange-400/10">
              {tech}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide"
              style={{
                background: `${tag.color}15`,
                color: tag.color,
                border: `1px solid ${tag.color}30`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <SiGithub size={13} /> Code
          </a>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
          >
            <LuPlay size={12} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component
const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<Tab>("Projects");

  return (
    <section className="relative pt-24 pb-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 scroll-mt-28">
      
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full opacity-[0.04] blur-3xl bg-orange-500" />
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-[0.03] blur-3xl bg-amber-400" />
      </div>

      {/* Header Row */}
      <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={revealLeft}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
            Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-3">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Projects.
            </span>
          </h2>
          <p className="text-base text-slate-500 dark:text-white/45 max-w-lg">
            A snapshot of my key projects — from concept and design to development and deployment.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={revealLeft}>
          <div className="inline-flex gap-1.5 p-1 rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 outline-none
                  ${activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                    : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white/70"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "Projects" && (
          <motion.div
            key="projects"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="flex overflow-x-auto scroll-px-6 snap-x snap-mandatory gap-5 pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 sm:scroll-px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {projectCards.map((card) => (
              <ProjectCard key={card.title} project={card} />
            ))}
          </motion.div>
        )}

        {activeTab === "FAQs" && (
          <motion.div
            key="faqs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5 }}
          >
            <FAQAccordion />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
