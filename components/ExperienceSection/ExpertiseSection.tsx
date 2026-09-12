"use client";
import  { useState } from "react";
import { motion, Variants } from "framer-motion";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface CompanyDetails {
  name?: string;
  role?: string;
  duration?: string;
}

interface IExpertiseSectionProps {
  companyData?: {
    companyDetails?: CompanyDetails;
    content?: string[];
    Tech?: { name: string }[];
    [key: string]: any;
  };
  expertiseItems?: string[];
}

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────
const Icons = {
  Briefcase: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="3" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Calendar: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2.5" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  User: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Building: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M13 8h2" />
      <path d="M13 12h2" />
      <path d="M13 16h2" />
      <path d="M5 8h2" />
      <path d="M5 12h2" />
      <path d="M5 16h2" />
    </svg>
  ),
  Check: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Zap: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

const ICON_MAP: Record<string, () => React.ReactNode> = {
  "Work History": Icons.Briefcase,
  "Tech": Icons.Code,
  "My Contributions": Icons.Layers,
  "Roles": Icons.Layers,
};

// ─────────────────────────────────────────────
// Animation Variants
// ─────────────────────────────────────────────
const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, y: -14, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.048 } },
};

const chipVariant: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function ExpertiseSection({ companyData, expertiseItems = [] }: IExpertiseSectionProps) {
  const [activeItem, setActiveItem] = useState(expertiseItems[0] ?? "Work History");
  const techList: { name: string }[] = companyData?.[activeItem] || [];

  return (
    <div className="w-full font-sans">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">

        {/* ── SIDEBAR ─────────────────────────────────── */}
        <motion.aside
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-64 xl:w-68 flex-shrink-0"
        >

          {/* ── Mobile: horizontal pill strip ── */}
         <div className="lg:hidden grid grid-cols-2 gap-2.5">
            {expertiseItems.map((item, i) => {
              const Icon = ICON_MAP[item] ?? Icons.Star;
              const isActive = activeItem === item;
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActiveItem(item)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 outline-none focus:outline-none focus:ring-0
                    ${isActive
                      ? "bg-sky-500 text-white shadow-sky-500/30"
                      : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/40 hover:border-sky-300/80 hover:text-sky-600 hover:bg-sky-50/50"
                    }`}
                >
                  <span className={isActive ? "opacity-100" : "opacity-60"}><Icon /></span>
                   <span className="truncate tracking-tight">{item}</span>
                </motion.button>
              );
            })}
          </div>

          {/* ── Desktop: vertical card sidebar ── */}
          <div className="hidden lg:flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">

            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 flex items-center justify-center">
                  <span className="text-sky-500">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  </span>
                </div>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-400 dark:text-slate-500">
                  Overview
                </p>
              </div>
              <p className="text-[12px] text-slate-400 dark:text-slate-600 leading-relaxed mt-2">
                Browse sections of this experience
              </p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent mb-2" />

            {/* Nav items */}
            <nav className="px-3 py-2 flex flex-col gap-1.5">
              {expertiseItems.map((item, i) => {
                const Icon = ICON_MAP[item] ?? Icons.Star;
                const isActive = activeItem === item;
                return (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.09, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={!isActive ? { x: 3 } : {}}
                    onClick={() => setActiveItem(item)}
                    className={`group relative w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 text-left outline-none focus:outline-none focus:ring-0 border-0 appearance-none
                      ${isActive
                        ? "bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                  >
                    {/* Left accent line on active */}
                    {/* {isActive && (
                      <motion.span
                        layoutId="nav-accent-line"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-white/50 rounded-r-full"
                      />
                    )} */}

                    {/* Icon container */}
                    <span className={`w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center transition-all duration-200
                      ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/50 group-hover:text-sky-500"
                      }`}
                    >
                      <Icon />
                    </span>

                    {/* Label */}
                    <span className="flex-1 truncate tracking-tight">{item}</span>

                    {/* Chevron */}
                    <motion.span
                      animate={{
                        opacity: isActive ? 1 : 0,
                        x: isActive ? 0 : -6,
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="flex-shrink-0 text-white/70"
                    >
                      <Icons.ChevronRight />
                    </motion.span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mx-3 mb-3 mt-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 px-4 py-3.5">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <p className="text-[12px] font-semibold text-slate-600 dark:text-slate-300">
                  Available for work
                </p>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
                Open to full-time & freelance roles
              </p>
            </div>

          </div>
        </motion.aside>

        {/* ── CONTENT PANEL ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 min-w-0"
        >
          <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm overflow-hidden">

            {/* Top accent bar */}
            <div className="h-px bg-gradient-to-r from-sky-400 via-sky-300 to-transparent" />

            {/* Subtle background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.06)_0%,_transparent_60%)] pointer-events-none" />

            <div className="relative">
              {/* <AnimatePresence mode="wait"> */}

                {/* ── WORK HISTORY ──────────────────────── */}
                {activeItem === "Work History" && (
                  <motion.div
                    key="work-history"
                    variants={fadeSlideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 lg:p-10"
                  >
                    {/* Section label */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200/70 dark:border-sky-800/50">
                        <span className="text-sky-500"><Icons.Briefcase /></span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-sky-600 dark:text-sky-400">
                          Professional Experience
                        </span>
                      </div>
                    </div>

                    {/* Company card */}
                    <div className="relative rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-2.5 lg:p-8 overflow-hidden">
                      {/* Glow */}
                      <div className="absolute -top-12 -right-12 w-40 h-40 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

                      {/* Company header */}
                      <div className="flex items-start gap-5 mb-6">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                          <span className="text-2xl font-bold text-white">
                            {(companyData?.companyDetails?.name ?? "C")[0]}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-1">
                            {companyData?.companyDetails?.name}{" "}
                            <span className="text-sky-500 font-medium">Private Limited</span>
                          </h2>
                          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Icons.Building />
                            Technology & Software Services
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent mb-6" />

                      {/* Meta badges */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                          <span className="text-sky-500"><Icons.User /></span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {companyData?.companyDetails?.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                          <span className="text-emerald-500"><Icons.Calendar /></span>
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                            {companyData?.companyDetails?.duration}
                          </span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Employment", value: "Full-time", dot: "bg-emerald-400" },
                          { label: "Work Mode", value: "On-site" },
                          { label: "Industry", value: "SaaS / Enterprise" },
                        ].map(({ label, value, dot }) => (
                          <div key={label} className="flex flex-col gap-1">
                            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-600">
                              {label}
                            </p>
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                              {dot && <span className={`w-1.5 h-1.5 rounded-full ${dot} animate-pulse`} />}
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── TECH ──────────────────────────────── */}
                {activeItem === "Tech" && (
                  <motion.div
                    key="tech"
                    variants={fadeSlideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 lg:p-10"
                  >
                    {/* Section label */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200/70 dark:border-sky-800/50">
                        <span className="text-sky-500"><Icons.Code /></span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-sky-600 dark:text-sky-400">
                          Technologies Used
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                        {techList.length} tools
                      </span>
                    </div>

                    <motion.div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {[...techList]
                        .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
                        .map((tech, i) => (
                          <motion.div
                            key={tech.name}
                            variants={chipVariant}
                            whileHover={{ y: -4, scale: 1.04 }}
                            transition={{ type: "spring", stiffness: 380, damping: 18 }}
                            className="group relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl
                              bg-slate-50 dark:bg-slate-800/60
                              border border-slate-200/80 dark:border-slate-700/60
                              hover:bg-sky-50 dark:hover:bg-sky-950/40
                              hover:border-sky-300/70 dark:hover:border-sky-700/60
                              hover:shadow-md hover:shadow-sky-500/10
                              cursor-default transition-colors duration-200"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-sky-400 transition-colors duration-200 flex-shrink-0" />
                            <span className="text-[12.5px] font-medium text-slate-600 dark:text-slate-300 group-hover:text-sky-700 dark:group-hover:text-sky-300 truncate transition-colors duration-200 leading-none">
                              {tech.name}
                            </span>
                          </motion.div>
                        ))}
                    </motion.div>
                  </motion.div>
                )}

                {/* ── ROLES / CONTRIBUTIONS ─────────────── */}
                {activeItem !== "Work History" && activeItem !== "Tech" && (
                  <motion.div
                    key="roles"
                    variants={fadeSlideUp}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-4 lg:p-10"
                  >
                    {/* Section label */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200/70 dark:border-sky-800/50">
                        <span className="text-sky-500"><Icons.Layers /></span>
                        <span className="text-xs font-semibold tracking-widest uppercase text-sky-600 dark:text-sky-400">
                          {activeItem}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
                        {(companyData?.content ?? []).length} items
                      </span>
                    </div>

                    <motion.div
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {(companyData?.content ?? []).map((point: string, idx: number) => (
                        <motion.div
                          key={idx}
                          variants={chipVariant}
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 380, damping: 22 }}
                          className="group flex items-start gap-4 p-2 lg:p-5 rounded-xl
                            bg-slate-50/80 dark:bg-slate-800/40
                            border border-slate-200/80 dark:border-slate-700/50
                            hover:bg-sky-50/60 dark:hover:bg-sky-950/30
                            hover:border-sky-200 dark:hover:border-sky-800/60
                            hover:shadow-sm hover:shadow-sky-500/8
                            transition-colors duration-200 cursor-default"
                        >
                          {/* Index */}
                          <span className="flex-shrink-0 text-[10px] font-bold text-slate-300 dark:text-slate-700 tabular-nums mt-1 w-5 text-right">
                            {String(idx + 1).padStart(2, "0")}
                          </span>

                          {/* Check icon */}
                          <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-md bg-sky-100 dark:bg-sky-900/50 border border-sky-200/80 dark:border-sky-800/60 text-sky-500 dark:text-sky-400 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-white transition-all duration-200">
                            <Icons.Check />
                          </span>

                          {/* Text */}
                          <p className="text-sm lg:text-[14px] text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 leading-relaxed flex-1 transition-colors duration-200">
                            {point}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}

              {/* </AnimatePresence> */}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}


