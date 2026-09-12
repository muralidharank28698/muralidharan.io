"use client";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      // className="max-w-4xl leading-8 sm:mb-0 scroll-mt-28 pt-12"
      className="max-w-5xl text-center leading-8 sm:mb-0 scroll-mt-28 pt-12"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      {/* <Fade direction="up" duration={1800} delay={200} damping={0.15}> */}
        <>
          <h1 className="text-3xl font-bold capitalize pt-12">
            About{" "}
            <span className="text-[#57d5ff] dark:text-[#57d5ff]">
              my Journey
            </span>
          </h1>
          <hr className="w-16 h-1 mx-auto my-4 bg-[#57d5ff] border-0" />

          <p className="mb-3">
            With <span className="font-medium">3+ years</span> of professional
            experience, I specialize in{" "}
            <span className="font-medium">front-end development</span> using
            modern JavaScript frameworks, particularly{" "}
            <span className="font-medium">React.js</span>, to build engaging,
            high-performance web applications. I have strong expertise in
            developing{" "}
            <span className="font-medium">cross-platform mobile apps</span> with{" "}
            <span className="font-medium">React Native</span> and extensive
            experience in{" "}
            <span className="font-medium">Microsoft SharePoint 365</span>{" "}
            development, leveraging{" "}
            <span className="font-medium">
              SPFx, PnP JS, CAML Query, Fluent UI, SharePoint lists and
              libraries
            </span>{" "}
            to deliver scalable, enterprise-grade solutions. I am also skilled
            in <span className="font-medium">Microsoft Power Automate</span>,
            creating automated workflows that streamline processes and enhance
            productivity, while integrating{" "}
            <span className="font-medium">Azure AI services</span> to deliver
            intelligent, innovative features. Passionate about transforming
            complex business requirements into robust technical solutions, I
            thrive in collaborative, fast-paced environments and remain
            committed to continuous learning, industry best practices, and
            delivering exceptional user experiences with measurable business
            impact.
          </p>
        </>
      {/* </Fade> */}
    </motion.section>
  );
}


