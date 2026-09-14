"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";

import ex3 from "../../assets/ExperienceImages/Ex3.webp";
import ex4 from "../../assets/ExperienceImages/Ex4.webp";
import ex5 from "../../assets/ExperienceImages/Ex5.webp";
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiCode,
  FiArrowLeft,
  FiList,
  FiMonitor,
  FiCpu,
  FiAward,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

// ── Types
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  stack: string[];
  contributions: string[];
  imageSrc: string;
  imageAlt: string;
  current?: boolean;
  tagline: string;
  employment: string;
  workMode: string;
  industry: string;
}

// ── Data
const experiences: ExperienceItem[] = [
  {
    id: "cognizant",
    role: "Associate Developer",
    company: "Cognizant Technology Solutions",
    period: "Jul 2025 – Present",
    stack: [
      "Sharepoint Framework (SPFx)",
      "Microsoft Sharepoint 365",
      "Sharepoint Lists",
      "Sharepoint Libraries",
      "PNP Js",
      "CAML Query",
      "React.js",
      "TypeScript",
      "JavaScript",
      "React Hooks",
      "React-Router-DOM",
      "Redux",
      "Redux Toolkit",
      "RTK Query",
      "Fluent UI",
      "Bootstrap (Framework)",
      "CSS3",
      "HTML5",
      "REST APIs",
      "Swagger API",
      "Postman API",
      "Azure DevOps Services",
      "Azure Devops",
      "Git",
      "npm",
      "Power Apps",
      "Power Automate",
    ],
    contributions: [
      "Developed custom SharePoint web parts using SPFx (SharePoint Framework) with React.js, translating complex Figma designs into functional components to enhance user experience.",
      "Leveraged modern web development techniques including TypeScript and SASS within the SPFx ecosystem, ensuring robust, scalable, and performance-optimized SharePoint solutions.",
      "Created and managed SharePoint lists and libraries tailored to product requirements, integrating CAML query and PnP JS to interact with SharePoint APIs, enabling efficient retrieval and updates.",
      "Integrated AI capabilities using Azure AI services, developing a standalone AI container library that seamlessly integrates with SharePoint to enhance functionality.",
      "Developed reusable web part components based on design specifications, ensuring consistency and efficiency across different products.",
      "Created and packaged custom SharePoint libraries for deployment, integrating them into products to streamline development processes.",
    ],
    imageSrc: ex3.src,
    imageAlt: "Cognizant logo",
    current: true,
    tagline: "Technology & Software Services",
    employment: "Full-time",
    workMode: "On-site",
    industry: "Enterprise Services",
  },
  {
    id: "convergepoint",
    role: "Software Developer",
    company: "ConvergePoint India Pvt Ltd",
    period: "Feb 2024 – Jul 2025",
    stack: [
      "Sharepoint Framework (SPFx)",
      "Microsoft Sharepoint 365",
      "Sharepoint Lists",
      "Sharepoint Libraries",
      "PNP Js",
      "CAML Query",
      "React.js",
      "TypeScript",
      "JavaScript",
      "React Hooks",
      "React-Router-DOM",
      "Redux",
      "Redux Toolkit",
      "RTK Query",
      "Fluent UI",
      "Bootstrap (Framework)",
      "Griffel.js",
      "CSS3",
      "HTML5",
      "REST APIs",
      "Swagger API",
      "Postman API",
      "Chart.js",
      "PdfHighlighter",
      "LangString",
      "UI Components",
      "Azure DevOps Services",
      "Azure Devops",
      "Git",
      "npm",
      "Power Automate",
    ],
    contributions: [
      "Developed custom SharePoint web parts using SPFx (SharePoint Framework) with React.js, translating complex Figma designs into functional components to enhance user experience.",
      "Leveraged modern web development techniques including TypeScript and SASS within the SPFx ecosystem, ensuring robust, scalable, and performance-optimized SharePoint solutions.",
      "Created and managed SharePoint lists and libraries tailored to product requirements, integrating CAML query and PnP JS to interact with SharePoint APIs, enabling efficient retrieval and updates.",
      "Integrated AI capabilities using Azure AI services, developing a standalone AI container library that seamlessly integrates with SharePoint to enhance functionality.",
      "Developed reusable web part components based on design specifications, ensuring consistency and efficiency across different products.",
      "Created and packaged custom SharePoint libraries for deployment, integrating them into products to streamline development processes.",
    ],
    imageSrc: ex5.src,
    imageAlt: "ConvergePoint logo",
    tagline: "Compliance Management Software",
    employment: "Full-time",
    workMode: "Hybrid",
    industry: "B2B SaaS",
  },
  {
    id: "focuscraft",
    role: "Software Developer",
    company: "Focuscraft Tech Pvt Ltd",
    period: "Nov 2021 – Dec 2023",
    stack: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "React Native",
      "Front-End Development",
      "React Hooks",
      "React-Router-DOM",
      "Redux.js",
      "Redux Thunk",
      "Storybooks",
      "Material-UI",
      "GraphQL",
      "Jest",
      "React Testing Library",
      "HTML5",
      "CSS3",
      "Swagger API",
      "Postman API",
      "i18next",
      "Git",
      "Bitbucket",
      "Jira",
      "npm",
      "Yarn",
    ],
    contributions: [
      "Developed UI components per design specs, integrated third-party APIs, and maintained bug-free performance. Collaborated with teams to create responsive, user-friendly web applications.",
      "Utilized React.js for interactive web elements, enhancing user experience. Ensured API correctness using Swagger UI.",
      "Leveraged Storybook for UI development, creating reusable UI packages. Managed state with Redux and Redux Toolkit, using Redux DevTools for debugging.",
      "Built applications with microservices architecture using React. Ensured application reliability with Jest automated testing.",
      "Designed reusable components with customization capabilities. Troubleshot and debugged front-end issues, ensuring cross-browser compatibility.",
      "Enhanced website performance by optimizing load times and page speed. Managed projects from initiation to completion, ensuring timely delivery.",
    ],
    imageSrc: ex4.src,
    imageAlt: "Focuscraft logo",
    tagline: "Product Engineering Services",
    employment: "Full-time",
    workMode: "Remote",
    industry: "IT Services",
  },
];

// ── Custom hook
function useInView(
  ref: React.RefObject<HTMLElement | null>,
  options: { threshold?: number; once?: boolean } = {},
): boolean {
  const { threshold = 0.2, once = true } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

// ── Animations
const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// ── Main Section
export default function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { threshold: 0.2 });

  // Modal State
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Work History");

  // Mobile Card Scroll & Indicator State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCardScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.offsetWidth;
    if (width > 0) {
      const index = Math.round(scrollLeft / width);
      setActiveCardIndex(Math.min(Math.max(index, 0), experiences.length - 1));
    }
  };

  const scrollToCardIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    container.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
    setActiveCardIndex(index);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [selectedExp]);

  return (
    <section
      id="Experience"
      className="relative pt-8 md:pt-12 pb-16 md:pb-24 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 scroll-mt-28 font-sans"
    >
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full opacity-[0.04] blur-3xl bg-orange-500" />
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full opacity-[0.03] blur-3xl bg-amber-400" />
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="text-left md:text-center mb-10 md:mb-16 flex flex-col items-start md:items-center"
      >
        <motion.div
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={revealLeft}
        >
          <div className="section-tag mb-4">
            <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Professional Experience
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-4">
            ROLES THAT HAVE <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              SHAPED MY CAREER
            </span>
          </h2>
          <p className="text-base text-slate-600 dark:text-white/60 max-w-2xl mx-0 md:mx-auto">
            From startups to enterprise solutions, here is a timeline of my
            professional journey in software development.
          </p>
        </motion.div>
      </div>

      {/* ── Mobile Top Minimal Indicator Bar (Mobile Only) */}
      <div className="flex md:hidden items-center justify-between max-w-sm mx-auto  mb-3 relative z-10">
        <div className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCardIndex(i)}
              aria-label={`Go to card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeCardIndex === i
                  ? "w-5 bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm"
                  : "w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scrollToCardIndex(Math.max(0, activeCardIndex - 1))}
            disabled={activeCardIndex === 0}
            aria-label="Previous card"
            className="w-7 h-7 rounded-full flex items-center justify-center border bg-white/80 dark:bg-neutral-900/80 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <FiArrowLeft size={12} />
          </button>
          <button
            onClick={() =>
              scrollToCardIndex(
                Math.min(experiences.length - 1, activeCardIndex + 1),
              )
            }
            disabled={activeCardIndex === experiences.length - 1}
            aria-label="Next card"
            className="w-7 h-7 rounded-full flex items-center justify-center border bg-white/80 dark:bg-neutral-900/80 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-white disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <FiArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── 3-Card Responsive Container (1 Full Card at a time on Mobile, 3-Col Grid on Desktop) */}
      <motion.div
        ref={scrollContainerRef}
        onScroll={handleCardScroll}
        initial="hidden"
        animate={headerInView ? "show" : "hidden"}
        variants={stagger}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 mb-12 max-w-sm md:max-w-4xl mx-auto  md:px-4 md:grid md:grid-cols-3 md:overflow-visible items-stretch pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {experiences.map((item) => {
          return (
            <motion.div
              key={item.id}
              onClick={() => {
                setSelectedExp(item);
                setActiveTab("Work History");
              }}
              tabIndex={-1}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative rounded-2xl overflow-hidden p-4 md:p-4.5 cursor-pointer outline-none focus:outline-none transition-all duration-500 ease-out flex flex-col justify-between h-[310px] w-full shrink-0 snap-center md:w-full md:max-w-none md:shrink backdrop-blur-2xl border bg-white/85 dark:bg-[#0c0d14]/95 border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white shadow-lg shadow-slate-200/50 dark:shadow-black/70 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-[0_15px_40px_-10px_rgba(255,107,43,0.2)]"
            >
              {/* Specular Glass Edge Highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/20 dark:via-white/20 to-transparent pointer-events-none z-10" />

              {/* Top Animated Spotlight Line */}
              <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Multi-layered Fluid Glow Orbs */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-700" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-orange-500/5 via-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity duration-700" />

              <div>
                {/* Header Row: Icon + Period Badge + Arrow */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center border shadow-sm p-1 backdrop-blur-md bg-orange-500/10 border-orange-500/20 text-orange-500 dark:bg-orange-500/15 dark:border-orange-500/30 dark:text-orange-400"
                    >
                      <FiBriefcase size={13} />
                    </motion.div>

                    {/* Period Badge with Active Pulse */}
                    <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 backdrop-blur-md shadow-xs bg-slate-100/90 dark:bg-white/10 border-slate-200/80 dark:border-white/15 text-slate-700 dark:text-white/90">
                      {item.current && (
                        <span className="flex h-1.5 w-1.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                      )}
                      {item.period}
                    </span>
                  </div>

                  {/* Animated Interactive Arrow */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="w-6.5 h-6.5 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow"
                  >
                    <FiArrowRight size={12} />
                  </motion.div>
                </div>

                {/* Logo / Cover Display with Specular Glass Frame */}
                <div className="w-full h-24 rounded-xl overflow-hidden mb-3 flex items-center justify-center border relative z-10 backdrop-blur-md shadow-inner bg-slate-100/80 dark:bg-black/40 border-slate-200/80 dark:border-white/10 shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-orange-400/5 pointer-events-none" />
                  <motion.img
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="max-w-[60%] max-h-[60%] object-contain drop-shadow-md relative z-10"
                  />
                </div>
              </div>

              {/* Role, Company & Bottom Stack */}
              <div className="relative z-10 mt-auto pt-1 flex flex-col justify-end">
                <h3
                  className="text-sm font-bold uppercase tracking-wide mb-0.5 transition-colors duration-200 group-hover:text-orange-500 text-slate-900 dark:text-white truncate"
                  title={item.role}
                >
                  {item.role}
                </h3>
                <p
                  className="text-[11px] font-semibold mb-2.5 text-slate-600 dark:text-white/60 truncate"
                  title={item.company}
                >
                  {item.company}
                </p>

                {/* Tech Stack Tags */}
                {item.stack && item.stack.length > 0 && (
                  <div className="flex items-center gap-1 pt-2.5 border-t border-slate-200/80 dark:border-white/10 overflow-hidden">
                    {item.stack.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[9.5px] font-medium px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 backdrop-blur-md truncate max-w-[95px] shrink-0"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.stack.length > 3 && (
                      <span className="text-[9.5px] text-slate-500 dark:text-white/40 font-medium shrink-0 ml-auto">
                        +{item.stack.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial="hidden"
        animate={headerInView ? "show" : "hidden"}
        variants={fadeUp}
        className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-white/85 dark:bg-[#0c0d14]/95 border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white grid grid-cols-3 divide-x divide-slate-200/70 dark:divide-white/10 p-3 sm:p-6 md:p-9 md:flex md:flex-row items-center justify-between gap-2 md:gap-4 md:divide-x-0 shadow-xl shadow-slate-200/60 dark:shadow-black/80 relative backdrop-blur-2xl"
      >
        {/* Specular Edge Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 dark:via-white/20 to-transparent pointer-events-none z-10" />

        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />

        {/* Stat 1 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-1.5 sm:gap-3 md:gap-5 justify-center md:justify-start text-center md:text-left px-1 md:px-0">
          <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
            <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500 mb-0.5">
              3+
            </h4>
            <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-white/70 font-semibold tracking-tight md:tracking-wide">
              <span className="md:hidden">Companies</span>
              <span className="hidden md:inline">Companies Worked</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-slate-200/80 dark:bg-white/10" />

        {/* Stat 2 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-1.5 sm:gap-3 md:gap-5 justify-center md:justify-start text-center md:text-left px-1 md:px-0">
          <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
            <FiCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500 mb-0.5">
              15+
            </h4>
            <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-white/70 font-semibold tracking-tight md:tracking-wide">
              <span className="md:hidden">Projects</span>
              <span className="hidden md:inline">Projects Delivered</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-slate-200/80 dark:bg-white/10" />

        {/* Stat 3 */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-1.5 sm:gap-3 md:gap-5 justify-center md:justify-start text-center md:text-left px-1 md:px-0">
          <div className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/20 text-orange-500 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-xs">
            <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div>
            <h4 className="text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-500 mb-0.5">
              4+
            </h4>
            <p className="text-[10px] sm:text-xs md:text-sm text-slate-600 dark:text-white/70 font-semibold tracking-tight md:tracking-wide">
              <span className="md:hidden">Years Exp.</span>
              <span className="hidden md:inline">Years Experience</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 backdrop-blur-xl overscroll-none"
            onClick={() => setSelectedExp(null)}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Modal Dialog Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[85vh] bg-[#f8fafc] dark:bg-[#090a0f] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/10 flex flex-col md:flex-row relative overscroll-none"
            >
              {/* Subtle Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

              {/* ── LEFT SIDEBAR ── */}
              <div className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0d0e15]/90 backdrop-blur-md flex flex-col shrink-0 z-10">
                {/* Back Button Header */}
                <div className="p-5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 dark:text-white/70 hover:text-orange-500 dark:hover:text-orange-400 bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-orange-500/30 transition-all cursor-pointer"
                  >
                    <FiArrowLeft
                      size={14}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    <span>Back</span>
                  </button>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500 px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20">
                    Experience
                  </span>
                </div>

                {/* Sidebar Navigation */}
                <div className="flex-1 p-4 space-y-1.5 overflow-y-auto overscroll-contain">
                  <div className="text-[10px] font-extrabold text-slate-400 dark:text-white/30 uppercase tracking-widest px-3 py-2">
                    Overview
                  </div>
                  {[
                    {
                      id: "Work History",
                      label: "Work History",
                      icon: FiMonitor,
                    },
                    {
                      id: "Tech Stack",
                      label: `Tech Stack (${selectedExp.stack.length})`,
                      icon: FiCpu,
                    },
                    {
                      id: "My Contributions",
                      label: `My Contributions (${selectedExp.contributions.length})`,
                      icon: FiAward,
                    },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                            : "text-slate-600 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon size={16} />
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sidebar Footer - Availability Badge */}
                <div className="p-4 border-t border-slate-100 dark:border-white/5 hidden md:block">
                  <div className="bg-slate-50 dark:bg-white/[0.03] rounded-2xl p-3.5 border border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Available for work
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-white/40 leading-relaxed">
                      Open to full-time & freelance roles
                    </p>
                  </div>
                </div>
              </div>

              {/* ── RIGHT MAIN PANEL (SCROLLABLE CONTAINER) ── */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-10 relative z-10">
                {/* Company Header Card */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-6 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-sm mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 p-3 flex items-center justify-center shadow-sm shrink-0">
                    <img
                      src={selectedExp.imageSrc}
                      alt={selectedExp.company}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                        {selectedExp.employment}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-white/40 font-semibold flex items-center gap-1">
                        <FiCalendar size={12} className="text-orange-500" />
                        {selectedExp.period}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedExp.company}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 font-medium mt-1">
                      {selectedExp.tagline}
                    </p>
                  </div>
                </div>

                {/* Dynamic Tab Content */}
                <AnimatePresence mode="wait">
                  {/* WORK HISTORY */}
                  {activeTab === "Work History" && (
                    <motion.div
                      key="work-history"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 space-y-3">
                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">
                          Current Role
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">
                          {selectedExp.role}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-white/70 leading-relaxed font-medium">
                          Spearheading modern frontend solutions, design-to-code
                          component engineering, and scalable architecture at{" "}
                          {selectedExp.company}.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-5 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-1">
                            Employment Type
                          </span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            {selectedExp.employment}
                          </span>
                        </div>
                        <div className="p-5 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-1">
                            Work Mode
                          </span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            {selectedExp.workMode}
                          </span>
                        </div>
                        <div className="p-5 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-white/40 block mb-1">
                            Industry
                          </span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            {selectedExp.industry}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TECH STACK */}
                  {activeTab === "Tech Stack" && (
                    <motion.div
                      key="tech-stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            Technologies & Tools
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">
                            Core tech stack, frameworks, APIs, and libraries
                            used at {selectedExp.company}
                          </p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20">
                          {selectedExp.stack.length} Skills
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        {selectedExp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold
                              bg-orange-500/[0.07] dark:bg-orange-500/[0.12]
                              text-orange-600 dark:text-orange-400
                              border border-orange-500/20
                              hover:border-orange-500/50 hover:bg-orange-500/15 hover:-translate-y-0.5
                              transition-all duration-200 cursor-default shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* MY CONTRIBUTIONS */}
                  {activeTab === "My Contributions" && (
                    <motion.div
                      key="contributions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10"
                    >
                      <div className="mb-6">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          Key Contributions & Impact
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">
                          Key responsibilities, deliverables, and engineering
                          milestones achieved
                        </p>
                      </div>

                      <div className="space-y-3.5">
                        {selectedExp.contributions.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-4 p-4.5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 hover:border-orange-500/30 transition-all"
                          >
                            <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-black">
                              0{idx + 1}
                            </div>
                            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-white/80 font-medium pt-1">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
