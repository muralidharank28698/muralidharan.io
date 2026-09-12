"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { TiSocialLinkedin } from "react-icons/ti";
import { DiGithubBadge } from "react-icons/di";
import { BiLogoWhatsapp } from "react-icons/bi";
import Typewriter from "typewriter-effect";
import { IconType } from "react-icons";
import profileImg from "../../assets/Profile/PA3.png";

const fadeLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60, filter: "blur(10px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

interface SocialBtnProps { href: string; icon: IconType; label: string; color: string; }
function SocialBtn({ href, icon: Icon, label, color }: SocialBtnProps) {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="flex items-center justify-center w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md transition-all duration-300"
      style={{ color }}
      whileHover={{ scale: 1.1, borderColor: color, backgroundColor: `${color}18` }}
      whileTap={{ scale: 0.92 }}
    >
      <Icon size={18} />
    </motion.a>
  );
}

export default function Introduction({ setActiveSection, scrollHandler }: any) {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { controls.start("visible"); }, [controls]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-32 pb-20 lg:pt-36 lg:pb-24"
    >
      {/* ── Ambient glows ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[40%] left-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(255,107,43,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute top-1/4 right-[10%] w-[360px] h-[360px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.1) 0%, transparent 70%)", filter: "blur(50px)" }} />
        {/* Diagonal line decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(255,107,43,0.5), transparent)", left: "calc(50% - 200px)" }} />
      </div>

      {/* ── Grid layout: left text column | right visual column ─── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-24 grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1.3fr_480px] gap-12 lg:gap-20 items-center">

        {/* ══ LEFT: Text Content ══════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1 pt-4 pb-8 lg:py-0"
        >
          {/* Eyebrow tag */}
          <motion.div variants={fadeLeft}>
            <span className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Available for new projects
            </span>
          </motion.div>

          {/* Big name */}
          <motion.div variants={fadeLeft} className="space-y-1">
            <div className="text-slate-500 dark:text-white/30 text-lg font-medium tracking-wide">Hello, I'm</div>
            <h1 className="font-black leading-none tracking-tight whitespace-nowrap" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              <span className="text-slate-900 dark:text-white">Murali</span>
              <span className="gradient-text">dharan</span>
            </h1>
          </motion.div>

          {/* Role / typewriter */}
          <motion.div variants={fadeLeft} className="flex items-center gap-3">
            <div
              className="w-10 h-0.5 flex-shrink-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #ff6b2b, transparent)" }}
            />
            <div className="text-orange-300 font-semibold text-lg min-w-[220px]">
              <Typewriter
                options={{
                  strings: ["Frontend Developer", "SharePoint SPFx Dev", "React Specialist", "UI/UX Enthusiast"],
                  autoStart: true,
                  loop: true,
                  delay: 65,
                  deleteSpeed: 40,
                  cursor: "|",
                }}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeLeft} className="text-slate-600 dark:text-white/45 text-base leading-relaxed max-w-xl font-light">
            I build <span className="text-slate-900 dark:text-white/80 font-medium">pixel-perfect</span>, high-performance digital
            experiences — clean code that drives{" "}
            <span className="text-orange-400 font-medium">real business impact</span>.
            4+ years across startups and enterprises.
          </motion.p>

          {/* Stats strip */}
          <motion.div variants={fadeLeft} className="flex items-center gap-6 flex-wrap">
            {[
              { value: "4+", label: "Years" },
              { value: "30+", label: "Projects" },
              { value: "3", label: "Companies" },
            ].map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-px h-6 bg-black/10 dark:bg-white/10 flex-shrink-0" />}
                <div>
                  <div className="text-xl font-extrabold text-orange-400 leading-none">{value}</div>
                  <div className="text-xs text-slate-500 dark:text-white/35 font-medium mt-1 tracking-wide">{label}</div>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div variants={fadeLeft} className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="/Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white
                bg-gradient-to-r from-orange-500 to-orange-400
                shadow-[0_0_30px_rgba(255,107,43,0.35)]
                hover:shadow-[0_0_50px_rgba(255,107,43,0.5)]
                hover:from-orange-400 hover:to-orange-300
                transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 16l-5-5 1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zm-7 2h14v2H5v-2z" />
              </svg>
              Download CV
            </a>
            <a
              href="#Connect"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                border border-black/10 dark:border-white/12 text-slate-600 dark:text-white/70 bg-black/5 dark:bg-white/5 backdrop-blur-md
                hover:border-orange-400/40 hover:text-slate-900 dark:hover:text-white
                transition-all duration-300"
            >
              Let's Talk
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeLeft} className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-white/25 mr-1 tracking-wide uppercase font-medium">Follow</span>
            <SocialBtn href="https://www.linkedin.com/in/muralidharank280698/" icon={TiSocialLinkedin} label="LinkedIn" color="#38bdf8" />
            <SocialBtn href="https://github.com/muralidharank28698" icon={DiGithubBadge} label="GitHub" color="#a78bfa" />
            <SocialBtn href="https://wa.me/918098633412" icon={BiLogoWhatsapp} label="WhatsApp" color="#4ade80" />
          </motion.div>
        </motion.div>

        {/* ══ RIGHT: Visual / Profile ═════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center justify-center order-1 lg:order-2 pt-6 pb-2 lg:py-0"
        >
          {/* Profile card */}
          <motion.div
            variants={fadeRight}
            className="relative w-full max-w-[320px] xl:max-w-[360px]"
          >
            {/* Decorative background glow */}
            <div
              className="absolute -inset-4 rounded-3xl opacity-40"
              style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,107,43,0.25), transparent 70%)" }}
            />

            {/* Card */}
            <div
              className="relative rounded-3xl overflow-hidden glass"
              style={{
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Orange top accent line */}
              <div
                className="h-0.5 w-full"
                style={{ background: "linear-gradient(90deg, #ff6b2b, #38bdf8)" }}
              />

              {/* Profile image */}
              <div className="px-8 pt-8 pb-4 flex justify-center">
                <div className="relative w-36 h-36">
                  <div
                    className="absolute inset-[-3px] rounded-full"
                    style={{ background: "linear-gradient(135deg, #ff6b2b, #38bdf8)" }}
                  />
                  <img
                    src={profileImg.src}
                    alt="Muralidharan K"
                    className="relative w-full h-full rounded-full object-cover border-2"
                    style={{ borderColor: "var(--bg-primary)" }}
                  />
                  {/* Spinning ring */}
                  <div className="absolute inset-[-8px] rounded-full border border-dashed border-orange-400/20 animate-spin-slow" />
                  {/* Status dot */}
                  <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2"
                    style={{ borderColor: "var(--bg-primary)", boxShadow: "0 0 10px rgba(74,222,128,0.6)" }} />
                </div>
              </div>

              {/* Name + role */}
              <div className="px-6 pb-4 text-center">
                <div className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Muralidharan K</div>
                <div className="text-orange-400 text-sm font-medium mt-0.5">Software Developer</div>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-black/10 dark:bg-white/5" />

              {/* Skill tags */}
              <div className="px-6 py-5 flex flex-wrap gap-2 justify-center">
                {["React.js", "TypeScript", "SPFx", "Next.js", "TailwindCSS"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{
                      background: "rgba(255,107,43,0.08)",
                      border: "1px solid rgba(255,107,43,0.15)",
                      color: "rgba(255,200,160,0.9)",
                    }}
                  >{s}</span>
                ))}
              </div>

              {/* Location + availability */}
              <div className="mx-6 mb-6 px-4 py-3 rounded-xl flex items-center justify-between glass">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/40">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Chennai, India
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to work
                </div>
              </div>
            </div>

            {/* Floating info chips */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 xl:-left-6 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 dark:text-white z-10 glass"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
            >
              🏆 4+ Years Exp.
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 xl:-right-6 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-900 dark:text-white z-10 glass"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
            >
              ⚡ 30+ Projects
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-12 flex items-center gap-3 text-slate-400 dark:text-white/20"
      >
        <motion.div
          className="w-10 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, rgba(255,107,43,0.6), transparent)" }}
          animate={{ scaleX: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium rotate-0">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
