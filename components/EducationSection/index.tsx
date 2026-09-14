"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { motion, Variants } from "framer-motion";

// ── Types
interface EducationItem {
  year: string;
  place: string;
  title: string;
  short: string;
  desc: string;
  grade: string;
  tag: string;
  duration: string;
  color: string;
}

// ── Data
const education: EducationItem[] = [
  {
    year: "2022",
    place: "Puducherry Technological University",
    title: "Master of Computer Applications",
    short: "MCA",
    desc: "Advanced focus on algorithms, system design, software engineering methodologies, and full-stack development.",
    grade: "8.2 CGPA",
    tag: "Post Graduate",
    duration: "2019 – 2022",
    color: "#f97316",
  },
  {
    year: "2019",
    place: "Saradha Gangadharan Arts & Science College",
    title: "Bachelor of Computer Applications",
    short: "BCA",
    desc: "Core foundations in databases, web technologies, object-oriented programming, and software development.",
    grade: "6.12 CGPA",
    tag: "Under Graduate",
    duration: "2016 – 2019",
    color: "#f59e0b",
  },
];

// ── Custom hook
function useInView(
  ref: RefObject<Element | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  });

  return inView;
}

// ── Animation Variants
const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

// ── Timeline Card
function TimelineCard({ edu, index }: { edu: EducationItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* Timeline Column */}
      <div className="flex flex-col items-center shrink-0">
        {/* Dot */}
        <div
          className="relative z-10 w-4 h-4 rounded-full border-[3px] border-white dark:border-[#0a0a14] mt-2"
          style={{
            background: edu.color,
            boxShadow: `0 0 16px ${edu.color}50`,
          }}
        />
        {/* Line */}
        {index < education.length - 1 && (
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-orange-400/30 to-transparent" />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="group relative flex-1 pb-10"
      >
        <div
          className="relative rounded-2xl overflow-hidden
            bg-white/80 dark:bg-white/[0.03]
            backdrop-blur-xl
            border border-black/[0.06] dark:border-white/[0.06]
            hover:border-orange-400/20 dark:hover:border-orange-400/15
            hover:shadow-[0_8px_40px_rgba(255,107,43,0.06)]
            transition-all duration-300"
        >
          {/* Accent bar top */}
          <div
            className="h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
            style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
          />

          <div className="p-6 md:p-7">
            {/* Top meta row */}
            <div className="flex items-center flex-wrap gap-2 mb-4">
              <span
                className="text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-lg"
                style={{
                  background: `${edu.color}12`,
                  color: edu.color,
                  border: `1px solid ${edu.color}25`,
                }}
              >
                {edu.tag}
              </span>

              <span className="text-[10px] font-semibold text-slate-400 dark:text-white/30 flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="11" rx="2" />
                  <path d="M2 7h12M5 1v4M11 1v4" strokeLinecap="round" />
                </svg>
                {edu.duration}
              </span>

              <div className="ml-auto flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: edu.color, boxShadow: `0 0 8px ${edu.color}` }}
                />
                <span className="text-xs font-bold" style={{ color: edu.color }}>
                  {edu.grade}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white mb-1">
              {edu.title}
              <span className="ml-2 text-sm font-semibold" style={{ color: edu.color }}>
                ({edu.short})
              </span>
            </h3>

            {/* Institution */}
            <p className="text-sm font-medium mb-4" style={{ color: edu.color, opacity: 0.8 }}>
              {edu.place}
            </p>

            {/* Divider */}
            <div className="h-px bg-black/[0.04] dark:bg-white/[0.04] mb-4" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-500 dark:text-white/45">
              {edu.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Component
export default function Education() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef);

  return (
    <section
      id="education"
      className="relative pt-8 md:pt-12 pb-16 md:pb-24 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 scroll-mt-28"
    >
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full opacity-[0.04] blur-3xl bg-orange-500" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full opacity-[0.03] blur-3xl bg-amber-400" />
      </div>

      {/* Header Row */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <motion.div initial="hidden" animate={headerInView ? "show" : "hidden"} variants={revealLeft}>
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-3">
            Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Journey.
            </span>
          </h2>
          <p className="text-base text-slate-500 dark:text-white/45 max-w-lg">
            A snapshot of my academic milestones — from undergraduate foundations to post-graduation mastery.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={stagger}
          className="flex gap-3"
        >
          {[
            { label: "Years Studied", value: "6+", icon: "📚" },
            { label: "Degrees", value: "2", icon: "🏅" },
            { label: "Top CGPA", value: "8.2", icon: "⭐" },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="text-center py-4 px-5 rounded-2xl
                bg-white/70 dark:bg-white/[0.03]
                border border-black/[0.06] dark:border-white/[0.06]
                backdrop-blur-xl min-w-[90px]"
            >
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500">
                {s.value}
              </div>
              <div className="text-[10px] text-slate-400 dark:text-white/30 font-semibold mt-0.5 tracking-wider uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Timeline Cards */}
      <div className="max-w-3xl">
        {education.map((edu, i) => (
          <TimelineCard key={i} edu={edu} index={i} />
        ))}
      </div>

      {/* Footer tag */}
      <motion.div
        initial="hidden"
        animate={headerInView ? "show" : "hidden"}
        variants={fadeUp}
        className="mt-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-black/[0.03] dark:bg-white/[0.03]
          border border-black/[0.06] dark:border-white/[0.06]">
          <span className="text-xs">✨</span>
          <span className="text-xs text-slate-400 dark:text-white/30 font-medium">
            Continuously learning · Always building
          </span>
        </div>
      </motion.div>
    </section>
  );
}
