"use client";
import React from "react";
import clsx from "clsx";

interface NavigationLinksProps {
  activeSection: string;
  links: any;
  handleScrollToSection: any;
  setActiveSection?: any;
}

export const NavigationLinks: React.FC<NavigationLinksProps> = ({
  activeSection,
  links,
  handleScrollToSection,
  setActiveSection,
}) => {
  return (
    <ul className="flex items-center gap-0.5">
      {links.map((link: any, index: any) => {
        const isActive = activeSection === link.name;
        return (
          <li key={index}>
            <a
              href={`#${link.name}`}
              className={clsx(
                "relative block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer",
                isActive
                  ? "text-slate-900 dark:text-white bg-orange-500/20 border border-orange-400/30"
                  : "text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/5"
              )}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection?.(link.name);
                handleScrollToSection(link.name);
              }}
            >
              {link.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
