"use client";

import React, { useState, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import { LuArrowUpRight, LuExternalLink, LuPlay } from "react-icons/lu";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tag {
  label: string;
  color?: string;
}

export interface ExternalLink {
  label: string;
  url: string;
  icon?: "github" | "demo" | "external";
}

export interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  /** Short description shown on the card */
  des?: string;
  url?: string;
  repoUrl?: string;
  tags?: Tag[];
  links?: ExternalLink[];
  /** Longer description shown only inside the modal */
  longDescription?: string;
  techStack?: string[];
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const MODAL_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const BACKDROP_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  github: <SiGithub size={15} />,
  demo: <LuPlay size={14} />,
  external: <HiOutlineExternalLink size={15} />,
};

// ─── TagPill ──────────────────────────────────────────────────────────────────

function TagPill({ label, color }: Tag) {
  if (color) {
    return (
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide backdrop-blur-sm"
        style={{
          background: `${color}20`,
          color: color,
          border: `1px solid ${color}40`,
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide backdrop-blur-sm
        bg-neutral-100 text-neutral-500 border border-neutral-200
        dark:bg-white/[0.06] dark:text-white/70 dark:border-white/10"
    >
      {label}
    </span>
  );
}

// ─── LinkButton ───────────────────────────────────────────────────────────────

function LinkButton({ label, url, icon = "external" }: ExternalLink) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
        transition-all duration-200 backdrop-blur-sm
        bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 hover:text-neutral-900
        dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20
        dark:text-white/80 dark:hover:text-white"
    >
      {ICON_MAP[icon]}
      {label}
      <LuArrowUpRight
        size={13}
        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      />
    </a>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps extends CardProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  image,
  des,
  longDescription,
  tags,
  links,
  url,
  repoUrl,
  techStack,
}: ModalProps) {
  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            variants={BACKDROP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
            }}
          />

          {/* Modal panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              variants={MODAL_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative w-full max-w-2xl rounded-2xl overflow-hidden
                bg-white border border-neutral-200/80
                dark:bg-[rgba(14,14,22,0.98)] dark:border-white/10
                shadow-xl dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            >
              {/* Ambient top glow — dark only */}
              <div
                className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(87,213,255,0.25) 0%, transparent 70%)",
                }}
              />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-200
                  bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-500 hover:text-neutral-800
                  dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white/60 dark:hover:text-white"
              >
                <IoClose size={16} />
              </button>

              {/* ── Image (reduced height) ── */}
              {image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  {/* Gradient fade — light */}
                  <div
                    className="absolute inset-0 dark:hidden"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 30%, rgba(255,255,255,1) 100%)",
                    }}
                  />
                  {/* Gradient fade — dark */}
                  <div
                    className="absolute inset-0 hidden dark:block"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 30%, rgba(14,14,22,1) 100%)",
                    }}
                  />
                  {/* Project badge */}
                  <div
                    className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-widest uppercase backdrop-blur-sm"
                    style={{
                      background: "rgba(87,213,255,0.15)",
                      border: "1px solid rgba(87,213,255,0.35)",
                      color: "rgb(60,170,210)",
                    }}
                  >
                    Project
                  </div>
                </div>
              )}

              {/* ── Content ── */}
              <div className="relative z-10 px-3 pb-6 pt-3 space-y-4">
                {/* Title + subtitle */}
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                    {title}
                  </h2>
                  {subtitle && (
                    <p className="text-xs mt-0.5 font-medium text-neutral-400 dark:text-white/40">
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                {(longDescription ?? des) && (
                  <p className="text-sm leading-relaxed text-neutral-500 dark:text-white/55">
                    {longDescription ?? des}
                  </p>
                )}

                {/* ── Tech Stack ── */}
                {techStack && techStack.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/30">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.05 }}
                          whileHover={{ scale: 1.06 }}
                          className="inline-flex items-center px-3 rounded-full text-[11px] font-semibold
                            border border-[rgba(87,213,255,0.2)] bg-[rgba(87,213,255,0.06)]
                            text-[rgb(30,155,200)] dark:text-[rgb(87,213,255)]
                            hover:border-[rgba(87,213,255,0.45)] hover:bg-[rgba(87,213,255,0.12)]
                            transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                      <TagPill key={i} {...tag} />
                    ))}
                  </div>
                )}

                <div className="h-px w-full bg-neutral-100 dark:bg-white/[0.06]" />

                {/* CTA */}
                <div className="flex flex-wrap gap-2">
                  {links && links.length > 0 ? (
                    links.map((link, i) => <LinkButton key={i} {...link} />)
                  ) : url ? (
                   <>
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                        transition-all duration-200
                        bg-[rgba(87,213,255,0.1)] hover:bg-[rgba(87,213,255,0.18)]
                        border border-[rgba(87,213,255,0.3)]
                        text-[rgb(30,155,200)] dark:text-[rgb(87,213,255)]"
                    >
                        <LuExternalLink size={13} />
                      GitHub Repo
                    </a>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                        transition-all duration-200
                        bg-[rgba(87,213,255,0.1)] hover:bg-[rgba(87,213,255,0.18)]
                        border border-[rgba(87,213,255,0.3)]
                        text-[rgb(30,155,200)] dark:text-[rgb(87,213,255)]"
                    >
                      <LuPlay size={13} />
                      Live Demo
                    </a>
                   </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export default function Card({
  title,
  subtitle,
  image,
  des,
  url,
  repoUrl,
  tags,
  links,
  longDescription,
  techStack
}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBg = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(87,213,255,0.07), transparent 80%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  return (
    <>
      <motion.div
        onMouseMove={handleMouseMove}
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
        tabIndex={-1}
        className="relative w-full sm:w-[260px] rounded-2xl overflow-hidden cursor-pointer group outline-none focus:outline-none
  transition-shadow duration-300
  bg-white border border-neutral-200/80
  shadow-sm hover:shadow-md
  dark:bg-transparent dark:border-white/[0.08]
  dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      >
        {/* Dark glass background */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl hidden dark:block"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        />

        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 z-10 rounded-2xl pointer-events-none
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: spotlightBg }}
        />

        {/* Top shimmer */}
        <div
          className="absolute inset-x-0 top-0 h-px z-20
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(87,213,255,0.6), transparent)",
          }}
        />

        {/* Image */}
        {image && (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Fade — light */}
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.95) 100%)",
              }}
            />
            {/* Fade — dark */}
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 50%, rgba(10,10,18,0.9) 100%)",
              }}
            />
            {/* "View Details" hover pill */}
            <div
              className="absolute inset-0 flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "rgba(8,8,18,0.65)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(87,213,255,0.35)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                <LuArrowUpRight size={14} className="text-[rgb(87,213,255)]" />
                View Details
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="relative z-10 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold leading-snug truncate text-neutral-900 dark:text-white/90">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs mt-0.5 truncate text-neutral-400 dark:text-white/40">
                  {subtitle}
                </p>
              )}
            </div>

            <div
              className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300
                bg-neutral-100 border border-neutral-200 text-neutral-400
                group-hover:bg-[rgba(87,213,255,0.08)] group-hover:border-[rgba(87,213,255,0.35)] group-hover:text-[rgb(30,155,200)]
                dark:bg-white/5 dark:border-white/10 dark:text-white/40
                dark:group-hover:bg-[rgba(87,213,255,0.08)] dark:group-hover:border-[rgba(87,213,255,0.3)] dark:group-hover:text-[rgb(87,213,255)]"
            >
              <HiOutlineExternalLink size={13} />
            </div>
          </div>

          {des && (
            <p className="text-xs leading-relaxed line-clamp-2 text-neutral-500 dark:text-white/40">
              {des}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, i) => (
                <TagPill key={i} {...tag} />
              ))}
              {tags.length > 3 && (
                <span className="text-[10px] self-center text-neutral-400 dark:text-white/30">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-white/[0.05]">
            <span className="text-[10px] font-medium tracking-wider uppercase text-neutral-400 ">
              Project
            </span>
            <div
              className="flex items-center gap-1 text-xs font-semibold
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                text-[rgb(30,155,200)] dark:text-[rgb(87,213,255)]"
            >
              Explore
              <LuArrowUpRight size={11} />
            </div>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        subtitle={subtitle}
        image={image}
        des={des}
        longDescription={longDescription}
        tags={tags}
        links={links}
        url={url}
        repoUrl={repoUrl}
        techStack={techStack}
      />
    </>
  );
}

