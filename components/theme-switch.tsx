"use client";

import React from "react";
import { useTheme } from "../context/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  console.log("THEME---original", theme);

  return (
    <button
      className={`fixed bottom-5 right-5 w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all focus:outline-none ${
      theme === "light"
        ? "border-[rgb(87,213,255)]"
        : "border-[rgb(64,64,64,0.4)]"
      }`}
      onClick={toggleTheme}
    >
      {theme === "light" ? (
      <BsSun color="rgb(87, 213, 255)" />
      ) : (
      <BsMoon color="rgb(87, 213, 255)" />
      )}
    </button>
  );
}

