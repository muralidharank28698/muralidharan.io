"use client";
import React from "react";
import clsx from "clsx";

interface LinkItem { name: string; }
interface MobileViewMenuProps {
  closeMenu: () => void;
  links: LinkItem[] | any;
  activeSection: string;
  handleScrollToSection: any;
  setActiveSection?: any;
  setIsMenuOpen?: any;
  isMenuOpen?: any;
}

export const MobileViewMenu: React.FC<MobileViewMenuProps> = ({
  closeMenu, links, activeSection, handleScrollToSection, setActiveSection,
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-sm"
        onClick={closeMenu}
      />

      {/* Menu panel */}
      <div
        className="fixed inset-x-4 top-20 z-50 rounded-3xl p-6 origin-top bg-white/95 dark:bg-[#08080E]/95 backdrop-blur-xl border border-black/10 dark:border-white/10"
        style={{
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(255,107,43,0.05)",
        }}
      >
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-black/10 dark:border-white/10 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-all"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav>
          <ul className="flex flex-col gap-1">
            {links.map((link: any, index: number) => {
              const isActive = activeSection === link.name;
              return (
                <li key={index}>
                  <a
                    href={`#${link.name}`}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-orange-400 bg-orange-500/10 border border-orange-400/20"
                        : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection?.(link.name);
                      handleScrollToSection(link.name);
                      closeMenu();
                    }}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />}
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact CTA */}
        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/5">
          <a
            href="#Connect"
            onClick={() => { handleScrollToSection("Connect"); closeMenu(); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white
              bg-gradient-to-r from-orange-500 to-orange-400
              shadow-[0_0_20px_rgba(255,107,43,0.3)]"
          >
            Hire Me 🚀
          </a>
        </div>
      </div>
    </>
  );
};
