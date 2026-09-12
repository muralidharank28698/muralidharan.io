"use client";
import React, { useRef, useEffect } from "react";
import { motion, Variants, useInView, animate } from "framer-motion";

const STATS = [
  { value: "4+", label: "Years Exp", icon: "📅" },
  { value: "30+", label: "Projects", icon: "🚀" },
  { value: "15+", label: "Apps Built", icon: "📱" },
  { value: "10+", label: "Credentials", icon: "🏆" },
];

const EXPERTISE = [
  {
    title: "Front-End Development",
    description: "Building scalable, secure, and high-performance applications tailored to your needs with React & Next.js.",
    active: false,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: "Microsoft 365 Solutions",
    description: "Creating custom SharePoint environments, intranets, and robust web parts utilizing SPFx, PnP JS, and Fluent UI.",
    active: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7" />
      </svg>
    )
  },
  {
    title: "Business Automation",
    description: "Future-proof your workflows. Automating complex processes and decisions using Power Automate and Power Apps.",
    active: false,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    title: "Mobile App Development",
    description: "From lightweight MVPs to full enterprise apps — no code what you imagine, we code it perfectly using React Native.",
    active: false,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  },
  {
    title: "Azure & AI Integration",
    description: "Automate decisions, forecast trends, and power your product with intelligent data relying on Microsoft Azure AI.",
    active: false,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15zm13.136-11.642a4.5 4.5 0 00-6.273 0" />
      </svg>
    )
  },
  {
    title: "UI/UX Engineering",
    description: "Seamless, human-centered digital experiences that drive engagement through pixel-perfect Tailwind CSS integration.",
    active: false,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395" />
      </svg>
    )
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number = 0) => ({
    opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const VP = { once: true, amount: 0.2 } as const;

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const numericalValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, numericalValue, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, numericalValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <div className="relative py-24 lg:py-32 overflow-hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300">
      
      {/* Ambient Glows */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at top, rgba(255,107,43,0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
        }} 
      />
      <div className="absolute bottom-[10%] right-0 w-[400px] h-[400px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} 
      />

      <section id="story" className="relative px-6 md:px-12 xl:px-16 2xl:px-24 w-full z-10 scroll-mt-28">
        
        {/* ── HERO: Headline + Stats side by side ── */}
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center mb-20 lg:mb-28">
          
          {/* Left: Tag + Headline + Description */}
          <motion.div initial="hidden" whileInView="show" viewport={VP} variants={fadeUp} custom={0}>
            <div className="section-tag mb-6">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
              The Story
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.08] tracking-tight text-slate-900 dark:text-white mb-6 transition-colors duration-300">
              Innovating Tomorrow. <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Building Today.</span>
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-white/50 leading-relaxed max-w-xl transition-colors duration-300">
              Empowering businesses with next-gen technology solutions. From custom software to AI-driven platforms, I engineer your digital success at the intersection of clean engineering and thoughtful design.
            </p>
          </motion.div>

          {/* Right: Stats 2×2 Grid */}
          <motion.div
            initial="hidden" whileInView="show" viewport={VP} variants={staggerContainer}
            className="grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto"
          >
            {STATS.map((s) => (
              <motion.div 
                key={s.label} 
                variants={staggerChild}
                className="relative flex flex-col items-center justify-center text-center p-5 md:p-6 lg:p-8
                  bg-white/60 dark:bg-white/[0.03] 
                  border border-black/[0.06] dark:border-white/[0.06] 
                  rounded-2xl backdrop-blur-sm
                  hover:border-orange-400/30 dark:hover:border-orange-400/20
                  hover:shadow-[0_0_30px_rgba(255,107,43,0.06)]
                  transition-all duration-500 group"
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/0 to-cyan-400/0 group-hover:from-orange-400/[0.03] group-hover:to-cyan-400/[0.03] transition-all duration-500" />
                
                <span className="text-lg mb-2">{s.icon}</span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-800 dark:text-white transition-colors duration-300">
                  <AnimatedStat value={s.value} />
                </span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-white/35 font-semibold mt-1.5 transition-colors duration-300">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Divider with label ── */}
        <motion.div 
          initial="hidden" whileInView="show" viewport={VP} variants={fadeUp} custom={0.2}
          className="max-w-[1300px] mx-auto flex items-center gap-6 mb-14"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-white/25 whitespace-nowrap">What I Do</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
        </motion.div>

        {/* ── 6-CARD GRID ── */}
        <motion.div
           initial="hidden" whileInView="show" viewport={VP} variants={staggerContainer}
           className="flex overflow-x-auto scroll-px-6 snap-x snap-mandatory gap-4 md:gap-5 pb-8 -mx-6 px-6 md:mx-auto md:px-0 md:scroll-px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible max-w-[1300px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
           {EXPERTISE.map((card, i) => (
             <motion.div 
               key={i}
               variants={staggerChild}
               className={`group relative flex flex-col p-7 md:p-8 rounded-2xl border transition-all duration-300
                 w-[82vw] sm:w-[300px] shrink-0 snap-start md:w-auto md:shrink md:snap-align-none overflow-hidden
                 ${card.active 
                   ? 'bg-gradient-to-br from-orange-50 to-amber-50/50 dark:from-orange-500/[0.12] dark:to-amber-500/[0.06] border-orange-400/30 dark:border-orange-400/25 shadow-[0_4px_40px_rgba(255,107,43,0.1)]' 
                   : 'bg-white/60 dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] hover:border-orange-400/20 dark:hover:border-orange-400/15 hover:bg-white dark:hover:bg-white/[0.04]'} 
               `}
             >
                {/* Active card accent line */}
                {card.active && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-amber-400" />
                )}

                {/* Card Header (Icon + Arrow) */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300
                    ${card.active 
                      ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25' 
                      : 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-500 dark:text-white/40 group-hover:text-orange-500 dark:group-hover:text-orange-400'}
                  `}>
                    {card.icon}
                  </div>

                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                    ${card.active 
                      ? 'border-orange-400/30 text-orange-500 dark:text-orange-400' 
                      : 'border-black/[0.06] dark:border-white/[0.06] text-slate-300 dark:text-white/20 group-hover:border-orange-400/30 group-hover:text-orange-500 dark:group-hover:text-orange-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5'}
                  `}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h3 className={`text-base md:text-lg font-bold mb-2 transition-colors duration-300 ${card.active ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-white/85 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                  {card.title}
                </h3>
                <p className={`text-[13px] md:text-sm leading-relaxed transition-colors duration-300 ${card.active ? 'text-slate-600 dark:text-white/60' : 'text-slate-500 dark:text-white/40'}`}>
                  {card.description}
                </p>
             </motion.div>
           ))}
        </motion.div>

      </section>
    </div>
  );
}
