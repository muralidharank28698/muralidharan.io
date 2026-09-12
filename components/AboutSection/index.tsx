"use client";
import React from "react";
import { motion } from "framer-motion";
// import LoginForm from "../LoginForm";

export default function About() {
  return (
    <section className="relative overflow-hidden from-[#f4f9ff] via-transparent to-[#eef6ff] dark:from-[#0f172a] dark:via-[#111827] dark:to-[#0f172a] pt-20">
     {/* <LoginForm /> */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
        About <span className="text-[#57d5ff]">My Journey</span>
        <hr className="w-16 h-1 my-4 bg-[#57d5ff] border-0 mx-auto" />{" "}
      </h1>
      <div
        className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 items-center md:px-4 pt-6 text-center md:text-left overflow-hidden
        md:[mask-image:linear-gradient(to_right,transparent,black_2%,black_90%,transparent)]
        md:[-webkit-mask-image:linear-gradient(to_right,transparent,black_2%,black_90%,transparent)]"
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base font-normal mb-3">
            {/* <p className="max-w-2xl text-base font-normal leading-relaxed text-center md:text-left text-slate-600 dark:text-slate-300"> */}
            With <span className="font-semibold">4+ years</span> of professional
            experience, I specialize in{" "}
            <span className="font-semibold">front-end development</span> using
            modern JavaScript frameworks, particularly{" "}
            <span className="font-semibold">React.js</span>, building
            high-performance web applications.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base font-normal mb-8">
            I develop{" "}
            <span className="font-semibold">cross-platform mobile apps</span>{" "}
            using <span className="font-semibold">React Native</span> and
            deliver enterprise solutions in{" "}
            <span className="font-semibold">Microsoft SharePoint 365</span>{" "}
            using SPFx, PnP JS, CAML Query & Fluent UI. I also automate business
            workflows with <span className="font-semibold">Power Automate</span>{" "}
            and integrate{" "}
            <span className="font-semibold">Azure AI services</span> to create
            intelligent digital experiences.
          </p>

          {/* BUTTONS */}
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <button className="border border-[#57d5ff] text-[#57d5ff] px-6 py-3 rounded-lg font-medium hover:bg-[#57d5ff] hover:text-white transition duration-300">
              Download Resume
            </button>
          </div> */}
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img
              src={require("../../assets/AboutImage/undraw_code-thinking_0vf2-removebg-preview.png")}
              alt="Developer workspace"
              className="w-full max-w-md lg:max-w-lg drop-shadow-lg"
            />

            {/* Decorative Glow - Center Only */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform  -translate-y-1/2 w-72 h-72 bg-[#57d5ff]/10 rounded-full blur-3xl shadow-xl hidden lg:block"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


