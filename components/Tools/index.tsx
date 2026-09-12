"use client";
import React from "react";
import "./Tools.css";
import {
  DeviconReact,
  VscodeIconsFileTypeVscode,
  DeviconPostman,
  ReduxDevToolsIcon,
  LogosSwagger,
  // DeviconJavascript,
  // DeviconHtml5,
} from "../../assets/icons";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Tools() {
  return (
    <section className="max-w-4xl text-center leading-8 sm:mb-0 scroll-mt-28 pt-12 pb-12">
      <div className="relative h-full w-full flex items-center justify-center pt-8">
        <div className="profileCard_container relative p-16 border rounded-full border-spacing-4">
          <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border active:scale-95 hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
                <VscodeIconsFileTypeVscode />
              </span>
            </button>
          </div>

          <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border active:scale-95 hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
                <DeviconPostman />
              </span>
            </button>
          </div>

          <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border active:scale-95 transition-all duration-500 flex items-center justify-center">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
                <img
                  src={require("../../assets/icons/redux-devtools.png")}
                  alt="devtools"
                  width={30}
                  height={30}
                />
              </span>
            </button>
          </div>

          <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border border-gray-400/50 active:scale-95 hover:scale-95 transition-all duration-500">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
                <LogosSwagger />
              </span>
            </button>
          </div>

          <div className="orbit-animation">
            <button
              data-tooltip-target="tooltip-hover"
              data-tooltip-trigger="hover"
              className="profile_item rounded-full bg-cover cursor-pointer border border-gray-400/50 active:scale-95 hover:scale-95 transition-all duration-500"
            >
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
                <DeviconReact />
              </span>
            </button>
          </div>

          {/* <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border active:scale-95 hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
              <DeviconReact />
              </span>
            </button>
          </div>

          <div className="orbit-animation">
            <button className="profile_item rounded-full bg-cover cursor-pointer border active:scale-95 hover:scale-105 transition-all duration-500 flex items-center justify-center">
              <span className="block w-[40px] h-[40px] transition-all duration-500 rounded-full z-[2] bg-white p-1 flex items-center justify-center hover:bg-gray-200 hover:shadow-lg transform hover:rotate-12">
              <DeviconReact />
              </span>
            </button>
          </div> */}

          <div
            id="tooltip-hover"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Tooltip content
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          <button className="profile_item w-[200px] h-[200px] p-1 border rounded-full cursor-pointer transition-all duration-500 z-0">
            <div className="w-full h-full flex items-center justify-center flex-col rounded-full active:scale-95 hover:scale-95 transition-all duration-500">
              <div className="mx-auto w-full max-w-xs relative flex flex-col items-center justify-center text-center overflow-visible">
                <p className="font-bold">Development Environment & Tooling</p>
                <div className="w-full relative flex flex-col items-center justify-center">
                  <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm"></div>
                  <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full"></div>
                  <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/2 blur-sm"></div>
                  <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2"></div>
                  <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}


