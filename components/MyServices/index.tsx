"use client";
import React, { useState } from "react";

const tools = [
  {
    name: "Paneflow",
    description: "Build Stunning Slideshows Visually. No Code Required",
    href: "https://paneflow.com",
    background:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "t0ggles",
    description: "Your ultimate multiple projects management tool",
    href: "https://t0ggles.com",
    background:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Swiper Studio",
    description:
      "Create Beautiful And Responsive Swipers Without Writing Any Code",
    href: "https://studio.swiperjs.com",
    background:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "UI Initiative",
    description: "Premium templates & plugins for Swiper and Framework7",
    href: "https://uiinitiative.com",
    background:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Start Page HQ",
    description: "Coming Soon",
    href: "https://startpagehq.com",
    background:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Framework7",
    description:
      "Full featured framework for building iOS, Android & desktop apps",
    href: "https://framework7.io",
    background:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Atropos",
    description: "Stunning touch-friendly 3D parallax hover effects",
    href: "https://atroposjs.com",
    background:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Konsta UI",
    description: "Pixel perfect mobile UI components built with Tailwind CSS",
    href: "https://konstaui.com",
    background:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Section */}
      <div
        className="md:w-[30%] w-full flex flex-wrap justify-start items-start"
        style={{
          columnGap: "5px", // ✅ Only horizontal spacing between cards
          rowGap: "0px",    // ✅ No vertical spacing between rows
        }}
      >
        {tools.map((tool, index) => (
          <button
            key={tool.name}
            onClick={() => setActiveIndex(index)}
            className="relative group w-[calc(50%-2.5px)] h-24 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center text-xs font-medium text-center text-black bg-white"
          >
            {/* Title */}
            <span className="z-10 relative px-2">{tool.name}</span>

            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundImage: `url(${tool.background})` }}
            />
          </button>
        ))}
      </div>

      {/* Right Section */}
      <div className="md:w-[70%] w-full p-6 flex items-center justify-center relative overflow-hidden">
        <div
          key={activeIndex}
          className="transition-all duration-500 ease-in-out opacity-100 transform scale-100"
        >
          {activeIndex !== null ? (
            <div className="max-w-xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                {tools[activeIndex].name}
              </h2>
              <p className="text-gray-700 mb-4">
                {tools[activeIndex].description}
              </p>
              <a
                href={tools[activeIndex].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
              >
                Visit Project
              </a>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>Select a project to view details</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


