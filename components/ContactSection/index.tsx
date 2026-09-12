"use client";
import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaSearchLocation } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TiSocialLinkedin } from "react-icons/ti";
import { DiGithubBadge } from "react-icons/di";
import { BiLogoWhatsapp, BiPhone } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import profileImg from "../../assets/Profile/PA3.png";

// ── Types
interface ContactFormData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  message: string;
}
type AlertType = "success" | "error" | "info";
const EMPTY: ContactFormData = {
  firstname: "",
  lastname: "",
  email: "",
  company: "",
  message: "",
};

const revealLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const revealRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const VP = { once: true, amount: 0.2 } as const;

// ── Toast
const Toast: React.FC<{
  type: AlertType;
  message: string;
  onClose: () => void;
}> = ({ type, message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 dark:bg-[rgba(10,10,20,0.95)] border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl max-w-sm">
      <div
        className={`w-2 h-2 rounded-full flex-shrink-0 ${type === "success" ? "bg-emerald-400" : type === "error" ? "bg-red-400" : "bg-orange-400"}`}
      />
      <span className="text-sm font-medium text-slate-900 dark:text-white">
        {message}
      </span>
      <button
        onClick={onClose}
        className="ml-auto text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

// ── Underline Field (matching screenshot style)
const UnderlineField: React.FC<{
  name: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: any;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}> = ({
  name,
  label,
  type = "text",
  value,
  error,
  onChange,
  multiline,
  rows = 3,
  required,
}) => {
  const hasErr = !!error;
  const base =
    "w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 pb-2 pt-1 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/25 transition-all outline-none focus:border-orange-400 dark:focus:border-orange-400";
  const errClass = hasErr ? "border-red-400 focus:border-red-400" : "";

  return (
    <div className="flex flex-col gap-1">
      <label
        className={`text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase ${hasErr ? "text-red-400" : "text-slate-500 dark:text-white/40"}`}
      >
        {hasErr ? error : label}
        {required && <span className="text-orange-400 ml-0.5">*</span>}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value ?? ""}
          rows={rows}
          onChange={onChange}
          placeholder={`Type your ${label.toLowerCase()} here...`}
          className={`${base} ${errClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value ?? ""}
          onChange={onChange}
          placeholder={label}
          className={`${base} ${errClass}`}
          style={{ fontSize: "16px" }}
        />
      )}
    </div>
  );
};

// ── Social Circle Icon
const SocialCircle: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center 
      text-slate-600 dark:text-white/60 
      hover:border-orange-400/50 hover:text-orange-500 dark:hover:text-orange-400 
      hover:shadow-[0_0_12px_rgba(255,107,43,0.15)]
      transition-all duration-300"
  >
    {icon}
  </a>
);

// ── Main
export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({ ...EMPTY });
  const [status, setStatus] = useState("");
  const [alertType, setAlert] = useState<AlertType>("info");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.firstname.trim()) errs.firstname = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Required";

    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setBusy(true);

    emailjs
      .send(
        "service_4sdqvzx",
        "template_y9g94p1",
        { ...form },
        "RwEWjLHQw99_Z6lZQ",
      )
      .then(() => {
        setAlert("success");
        setStatus("Message sent!");
        setForm({ ...EMPTY });
        setBusy(false);
      })
      .catch(() => {
        setAlert("error");
        setStatus("Couldn't send.");
        setBusy(false);
      });
  };

  return (
    <section
      id="Contact"
      className="relative pt-24 pb-8 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 2xl:px-24 scroll-mt-28"
    >
      {/* Section Tag */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP}
        variants={revealLeft}
      >
        <div className="section-tag mb-6">
          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
          Get In Touch
        </div>
      </motion.div>

      {/* Main 2-Column Layout */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 items-stretch">
        {/* ══════════ LEFT: Form ══════════ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={revealLeft}
          className="relative z-10 py-8 lg:py-12 lg:pr-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-slate-900 dark:text-white mb-10">
            Contact
          </h2>

          <div className="space-y-7 max-w-md">
            {/* First + Last Name Row */}
            <div className="grid grid-cols-2 gap-8">
              <UnderlineField
                name="firstname"
                label="First Name"
                value={form.firstname}
                error={errors.firstname}
                onChange={(e: any) =>
                  setForm({ ...form, firstname: e.target.value })
                }
                required
              />
              <UnderlineField
                name="lastname"
                label="Last Name"
                value={form.lastname}
                error={errors.lastname}
                onChange={(e: any) =>
                  setForm({ ...form, lastname: e.target.value })
                }
              />
            </div>

            {/* Email */}
            <UnderlineField
              name="email"
              label="Email Address"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(e: any) => setForm({ ...form, email: e.target.value })}
              required
            />

            {/* Company / Project */}
            <UnderlineField
              name="company"
              label="Company / Project"
              value={form.company}
              error={errors.company}
              onChange={(e: any) =>
                setForm({ ...form, company: e.target.value })
              }
            />

            {/* Message */}
            <UnderlineField
              name="message"
              label="How can I help you?"
              value={form.message}
              error={errors.message}
              onChange={(e: any) =>
                setForm({ ...form, message: e.target.value })
              }
              multiline
              required
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={busy}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm text-white
                bg-gradient-to-r from-orange-500 to-amber-500
                hover:from-orange-400 hover:to-amber-400
                hover:shadow-[0_4px_24px_rgba(255,107,43,0.4)]
                active:scale-[0.97]
                transition-all duration-300 disabled:opacity-50"
            >
              {busy ? "Sending..." : "Submit"}
              {!busy && (
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              )}
            </button>
          </div>
        </motion.div>

        {/* ══════════ RIGHT: Info Card + Decorative Blobs ══════════ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP}
          variants={revealRight}
          className="relative flex items-center justify-center py-12 lg:py-0"
        >
          {/* Decorative Background Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Large blob top-right */}
            <div
              className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full 
              bg-gradient-to-br from-orange-400/20 to-amber-300/10 
              dark:from-orange-500/15 dark:to-amber-500/5
              blur-[2px]"
            />
            {/* Medium blob bottom-left */}
            <div
              className="absolute -bottom-16 -left-8 w-[300px] h-[300px] rounded-full 
              bg-gradient-to-tr from-amber-400/15 to-orange-300/10 
              dark:from-amber-500/10 dark:to-orange-400/5
              blur-[2px]"
            />
            {/* Small accent circle */}
            <div
              className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full 
              bg-orange-400/30 dark:bg-orange-400/20"
            />
          </div>

          {/* Info Card */}
          <div
            className="relative z-10 w-full max-w-sm mx-auto
            bg-white/80 dark:bg-[rgba(15,15,25,0.85)]
            backdrop-blur-2xl rounded-3xl
            border border-black/[0.06] dark:border-white/[0.08]
            shadow-[0_8px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_60px_rgba(0,0,0,0.3)]
            p-8 md:p-10"
          >
            {/* Orange accent line */}
            <div className="w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mb-6" />

            {/* Name & Role */}
            <div className="flex items-center gap-4 mb-8">
              <img
                src={profileImg.src}
                alt="Muralidharan"
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-orange-400/20"
              />
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Muralidharan
                </h3>
                <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold">
                  Full Stack Developer / SharePoint Developer
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                  <FaSearchLocation
                    size={13}
                    className="text-orange-500 dark:text-orange-400"
                  />
                </span>
                <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                  Chennai, Tamil Nadu,
                  <br />
                  India
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                  <BiPhone
                    size={14}
                    className="text-orange-500 dark:text-orange-400"
                  />
                </span>
                <p className="text-sm text-slate-600 dark:text-white/60">
                  +91 80986 33412
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                  <MdEmail
                    size={14}
                    className="text-orange-500 dark:text-orange-400"
                  />
                </span>
                <p className="text-sm text-slate-600 dark:text-white/60">
                  muralidharank28698@gmail.com
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <SocialCircle
                href="https://wa.me/918098633412"
                label="WhatsApp"
                icon={<BiLogoWhatsapp size={16} />}
              />
              <SocialCircle
                href="https://www.linkedin.com/in/muralidharank280698/"
                label="LinkedIn"
                icon={<TiSocialLinkedin size={18} />}
              />
              <SocialCircle
                href="https://github.com/muralidharank28698"
                label="GitHub"
                icon={<DiGithubBadge size={18} />}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-12 relative">
        {/* Gradient Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-400/40 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 pb-8">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-[0_0_16px_rgba(255,107,43,0.3)]">
              M
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Muralidharan
              </p>
              <p className="text-[10px] text-slate-500 dark:text-white/40 tracking-widest uppercase mt-0.5">
                Full Stack Developer · Chennai
              </p>
            </div>
          </div>

          {/* Right: Copyright */}
          <p className="text-[11px] text-slate-400 dark:text-white/25 tracking-wide">
            © 2025 Muralidharan. All rights reserved.
          </p>
        </div>
      </div>

      {/* Toast */}
      {status && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            type={alertType}
            message={status}
            onClose={() => setStatus("")}
          />
        </div>
      )}
    </section>
  );
}
