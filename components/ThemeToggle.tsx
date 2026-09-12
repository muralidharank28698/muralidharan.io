"use client";
import React from "react";
import { useTheme } from "../context/theme-context";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <BsSun className="text-orange-500 w-4 h-4" />
      ) : (
        <BsMoon className="w-4 h-4" />
      )}
    </button>
  );
}
