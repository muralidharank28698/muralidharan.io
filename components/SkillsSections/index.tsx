"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  MicrosoftSharePointSPFXTechnologyStack,
  TechnologyStack,
  versionControlTools,
} from "../../lib/data";
import "./index.css";
import LogoLoop from "./LogoLoop";

const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: (delay: number = 0) => ({
    opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const revealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: (delay: number = 0) => ({
    opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const VP = { once: true, amount: 0.2 } as const;

export default function Skills() {
  const frontendLogos = (TechnologyStack ?? []).map((item) => ({
    node: item.icon as React.ReactNode,
    title: item.name,
    href: "#",
  }));

  const toolsLogos = versionControlTools?.map((item) => ({
    node: item.icon,
    title: item.name,
    href: "#",
  }));

  const spfxLogos = MicrosoftSharePointSPFXTechnologyStack?.map((item) => ({
    node: item.icon,
    title: item.name,
    href: "#",
  }));

  // Merge logos to create a dual-lane marquee
  const topRowLogos = [...frontendLogos, ...toolsLogos.slice(0, 2)];
  const bottomRowLogos = [...toolsLogos.slice(2), ...spfxLogos];

  return (
    <section className="relative pt-8 pb-16 w-full max-w-full overflow-hidden scroll-mt-28">
      
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,107,43,0.1) 0%, transparent 60%)", filter: "blur(70px)" }} />
        <div className="absolute bottom-[10%] right-[30%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.08) 0%, transparent 60%)", filter: "blur(60px)" }} />
      </div>

      <div className="flex flex-col items-center max-w-4xl mx-auto text-center mb-16">
        <motion.div
           initial="hidden" whileInView="show" viewport={VP} variants={revealLeft} custom={0}
           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6"
        >
           <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
           <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">
             Tech Stack
           </span>
        </motion.div>

        <motion.h2
           initial="hidden" whileInView="show" viewport={VP} variants={revealLeft} custom={0.1}
           className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6 transition-colors duration-300"
        >
           Explore my <br className="hidden lg:block"/>
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300">
             Skillset.
           </span>
        </motion.h2>

        <motion.p
           initial="hidden" whileInView="show" viewport={VP} variants={revealLeft} custom={0.2}
           className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-white/50 max-w-2xl font-light transition-colors duration-300"
        >
           A carefully curated collection of modern frameworks, robust architectures, and reliable tools I use to engineer scalable, high-performance digital products.
        </motion.p>
      </div>

      <motion.div 
        initial="hidden" whileInView="show" viewport={VP} variants={revealRight} custom={0.2}
        className="w-full max-w-5xl mx-auto flex flex-col gap-6 mt-4"
      >
        {/* Track 1: Moving Left */}
        <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
           <LogoLoop logos={topRowLogos} speed={15} direction="left" pauseOnHover />
        </div>

        {/* Track 2: Moving Right */}
        <div className="w-full [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
           <LogoLoop logos={bottomRowLogos} speed={15} direction="right" pauseOnHover />
        </div>
      </motion.div>
    </section>
  );
}
