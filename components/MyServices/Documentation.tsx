"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    category: "Quick FAQs",
    question: "What technologies do you specialize in?",
    answer:
      "My primary expertise includes React.js, TypeScript, JavaScript (ES6+), SharePoint SPFx, and Microsoft 365 technologies. I also work with tools and libraries such as Redux Toolkit, Tailwind CSS, Material UI, Fluent UI, PnP JS, REST APIs, GraphQL, Power Automate, and Git for building scalable and maintainable applications.",
  },
  {
    category: "Quick FAQs",
    question: "What kind of projects do you build?",
    answer:
      "I build modern web applications, custom SharePoint web parts, enterprise dashboards, and responsive UI components. My work focuses on creating reusable components, scalable architecture, and clean user interfaces that improve user experience and business productivity.",
  },
  {
    category: "Quick FAQs",
    question: "What professional experience do you have?",
    answer:
      "I have worked with companies like Cognizant, ConvergePoint, and FocusCraft Tech as a Software Developer. My experience includes building SharePoint solutions using SPFx, developing React applications, integrating backend APIs, and implementing automation using Power Automate and Power Apps.",
  },
  {
    category: "Quick FAQs",
    question: "Do you have experience with SharePoint development?",
    answer:
      "Yes. I have strong experience developing SharePoint solutions using the SPFx framework with React and TypeScript. I have built custom web parts, integrated SharePoint lists and libraries using PnP JS and CAML queries, and developed automated workflows using Power Automate.",
  },
  {
    category: "Quick FAQs",
    question: "What UI technologies and frameworks do you use?",
    answer:
      "For building modern user interfaces, I use React.js along with UI libraries like Material UI, Fluent UI, and Tailwind CSS. I focus on responsive design using Flexbox, CSS Grid, and media queries to ensure applications work smoothly across different devices.",
  },
  {
    category: "Quick FAQs",
    question: "How do you approach building scalable applications?",
    answer:
      "I follow a component-based architecture and focus on writing clean, reusable, and maintainable code. I use modern development practices such as React Hooks, Redux Toolkit for state management, modular architecture, and API-driven development to ensure applications are scalable and efficient.",
  },
  {
    category: "Quick FAQs",
    question: "What are your current learning goals?",
    answer:
      "I am continuously improving my knowledge in advanced frontend architecture and exploring mobile application development using React Native. I am also interested in integrating AI capabilities into applications using Azure AI services to build smarter digital experiences.",
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="space-y-3">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden
                ${isOpen
                  ? "border-orange-400/30 bg-orange-50/50 dark:bg-orange-500/[0.06] shadow-[0_0_20px_rgba(255,107,43,0.06)]"
                  : "border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] hover:border-orange-400/20 dark:hover:border-orange-400/15"
                }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4">
                  {/* Number badge */}
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300
                    ${isOpen 
                      ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-sm" 
                      : "bg-black/[0.04] dark:bg-white/[0.06] text-slate-400 dark:text-white/30"}`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-semibold text-sm md:text-base transition-colors duration-300
                      ${isOpen
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white"
                      }`}
                  >
                    {item.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isOpen 
                      ? "border-orange-400/30 text-orange-500 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-400/10" 
                      : "border-black/[0.06] dark:border-white/[0.06] text-slate-400 dark:text-white/30"}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </motion.div>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pl-[4.5rem] text-sm leading-relaxed text-slate-600 dark:text-white/50">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;
