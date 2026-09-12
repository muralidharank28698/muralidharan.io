"use client";
import React, { ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative inline-flex items-center justify-center group">
      {children}

      <span
        className="
        pointer-events-none
        absolute left-1/2 -translate-x-1/2 -top-10
        whitespace-nowrap
        text-xs font-medium
        px-3 py-1.5
        rounded-md
        opacity-0 translate-y-1
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 ease-out
        z-50
        
        backdrop-blur-xl
        bg-white/30 dark:bg-zinc-900/30
        text-zinc-900 dark:text-zinc-100
        
        ring-1 ring-black/5 dark:ring-white/10
        shadow-lg
      "
      >
        {content}
      </span>
    </div>
  );
};

