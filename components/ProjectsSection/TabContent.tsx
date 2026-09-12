"use client";
import React from "react";
import { motion } from "framer-motion";

interface DesignHighlight {
  image: string;
  subtitle: string;
  heading: string;
  content: string;
}

interface TabContentProps {
  title: string;
  description: string;
  progress: string;
  image: string;
  designHighlight?: DesignHighlight;
}

const TabContent: React.FC<TabContentProps> = ({
  title,
  description,
  progress,
  image,
  designHighlight,
}) => {
  return (
    <motion.div
      className="tab-content mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title and Description */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 leading-7">{description}</p>
      </div>

      {/* Main Content Section */}
      {/* <div className="flex flex-wrap items-center justify-center gap-8">
        <motion.div
          className="w-full sm:w-1/2 lg:w-1/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={image} alt="service" className="w-full h-auto rounded-md" />
        </motion.div>
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <p className="text-sm text-gray-500 mb-2">
            Progress:{" "}
            <span className="font-semibold text-gray-800">{progress}</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-full"
              style={{ width: progress }}
            ></div>
          </div>
        </div>
      </div> */}

      {/* Design Highlight Section */}
      {designHighlight && (
        <div className="bg-white mt-12 p-8 rounded-lg shadow-md">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Image Section */}
            {designHighlight.image && (
              <div className="hidden lg:block">
                <img
                  src={designHighlight.image}
                  alt={designHighlight.subtitle}
                  className="max-w-xl rounded-3xl mx-auto"
                />
              </div>
            )}
            {/* Text Section */}
            <div>
              <p className="text-blue-500 font-bold text-lg mb-4">
                {designHighlight.subtitle}
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
                {designHighlight.heading}
              </h2>
              <p className="text-gray-700">{designHighlight.content}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TabContent;


