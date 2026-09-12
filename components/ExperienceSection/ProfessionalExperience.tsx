"use client";
import React, { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import ExpertiseSection from "./ExpertiseSection";

const expertiseItems = ["Work History", "Tech", "My Contributions"];

const FctData = {
  Tech: [
    { name: "Git" },
    { name: "Redux Thunk" },
    { name: "CSS3" },
    { name: "Swagger API" },
    { name: "Storybooks" },
    { name: "Jira" },
    { name: "Redux.js" },
    { name: "Front-End Development" },
    { name: "React-Router-DOM" },
    { name: "Material-UI" },
    { name: "Yarn" },
    { name: "GraphQL" },
    { name: "React Hooks" },
    { name: "JavaScript" },
    { name: "React.js" },
    { name: "Jest" },
    { name: "React Native" },
    { name: "Postman API" },
    { name: "React Testing Library" },
    { name: "HTML5" },
    { name: "npm" },
    { name: "TypeScript" },
    { name: "i18next" },
    { name: "Bitbucket" },
  ],
  companyDetails: {
    name: "Focuscraft Tech",
    role: "Software Developer | Frontend Developer",
    duration: "Nov 2021 - Dec 2023",
  },
  content: [
    "Developed UI components per design specs, integrated third-party APIs, and maintained bug-free performance. Collaborated with teams to create responsive, user-friendly web applications.",
    "Utilized React.js for interactive web elements, enhancing user experience. Ensured API correctness using Swagger UI.",
    "Leveraged Storybook for UI development, creating reusable UI packages. Managed state with Redux and Redux Toolkit, using Redux DevTools for debugging.",
    "Built applications with microservices architecture using React. Ensured application reliability with Jest automated testing.",
    "Designed reusable components with customization capabilities. Troubleshot and debugged front-end issues, ensuring cross-browser compatibility.",
    "Enhanced website performance by optimizing load times and page speed. Managed projects from initiation to completion, ensuring timely delivery.",
  ],
} as any;

const ConvergePointData = {
  Tech: [
    { name: "Git" },
    { name: "CSS3" },
    { name: "Swagger API" },
    { name: "RTK Query" },
    { name: "Sharepoint Framework (SPFx)" },
    { name: "React-Router-DOM" },
    { name: "PNP Js" },
    { name: "Sharepoint Libraries" },
    { name: "React Hooks" },
    { name: "JavaScript" },
    { name: "LangString" },
    { name: "Azure Devops" },
    { name: "Bootstrap (Framework)" },
    { name: "Redux" },
    { name: "React.js" },
    { name: "Postman API" },
    { name: "Fluent UI" },
    { name: "REST APIs" },
    { name: "Azure DevOps Services" },
    { name: "HTML5" },
    { name: "npm" },
    { name: "Chart.js" },
    { name: "TypeScript" },
    { name: "Sharepoint Lists" },
    { name: "Griffel.js" },
    { name: "CAML Query" },
    { name: "Redux Toolkit" },
    { name: "UI Components" },
    { name: "Microsoft Sharepoint 365" },
    { name: "PdfHighlighter" },
    { name: "Power Automate" },
  ],
  companyDetails: {
    name: "ConvergePoint India",
    role: "Software Developer | Frontend Developer",
    duration: "Feb 2024 - Jul 2025",
  },
  content: [
    "Developed custom SharePoint web parts using SPFx (SharePoint Framework) with React.js, translating complex Figma designs into functional components to enhance user experience.",
    "Leveraged modern web development techniques including TypeScript and SASS within the SPFx ecosystem, ensuring robust, scalable, and performance-optimized SharePoint solutions.",
    "Created and managed SharePoint lists and libraries tailored to product requirements, integrating CAML query and PnP JS to interact with SharePoint APIs, enabling efficient retrieval and updates.",
    "Integrated AI capabilities using Azure AI services, developing a standalone AI container library that seamlessly integrates with SharePoint to enhance functionality.",
    "Developed reusable web part components based on design specifications, ensuring consistency and efficiency across different products.",
    "Created and packaged custom SharePoint libraries for deployment, integrating them into products to streamline development processes.",
  ],
} as any;

const CognizantData = {
  Tech: [
    { name: "Git" },
    { name: "CSS3" },
    { name: "Swagger API" },
    { name: "RTK Query" },
    { name: "Sharepoint Framework (SPFx)" },
    { name: "React-Router-DOM" },
    { name: "PNP Js" },
    { name: "Sharepoint Libraries" },
    { name: "React Hooks" },
    { name: "JavaScript" },
    { name: "Azure Devops" },
    { name: "Bootstrap (Framework)" },
    { name: "Redux" },
    { name: "React.js" },
    { name: "Postman API" },
    { name: "Fluent UI" },
    { name: "REST APIs" },
    { name: "Azure DevOps Services" },
    { name: "HTML5" },
    { name: "npm" },
    { name: "TypeScript" },
    { name: "Sharepoint Lists" },
    { name: "CAML Query" },
    { name: "Redux Toolkit" },
    { name: "Microsoft Sharepoint 365" },
    { name: "Power Apps" },
    { name: "Power Automate" },
  ],
  companyDetails: {
    name: "Cognizant Technology Solutions India",
    role: "Associate Software Developer | Frontend Developer",
    duration: "July 2025 - Present",
  },
  content: [
    "Developed custom SharePoint web parts using SPFx (SharePoint Framework) with React.js, translating complex Figma designs into functional components to enhance user experience.",
    "Leveraged modern web development techniques including TypeScript and SASS within the SPFx ecosystem, ensuring robust, scalable, and performance-optimized SharePoint solutions.",
    "Created and managed SharePoint lists and libraries tailored to product requirements, integrating CAML query and PnP JS to interact with SharePoint APIs, enabling efficient retrieval and updates.",
    "Integrated AI capabilities using Azure AI services, developing a standalone AI container library that seamlessly integrates with SharePoint to enhance functionality.",
    "Developed reusable web part components based on design specifications, ensuring consistency and efficiency across different products.",
    "Created and packaged custom SharePoint libraries for deployment, integrating them into products to streamline development processes.",
  ],
} as any;

export const ProfessionalExperience: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId } = location.state || {};

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 md:p-10">
      <button
        onClick={handleBack}
        onMouseDown={(e) => e.preventDefault()}
        className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl
          bg-white/10 dark:bg-slate-900/40 backdrop-blur-md
          border border-slate-200/60 dark:border-slate-700/50
          shadow-sm hover:shadow-md hover:shadow-sky-500/10
          hover:border-sky-300/60 dark:hover:border-sky-700/50
          hover:bg-sky-50/50 dark:hover:bg-sky-950/30
          transition-all duration-200 cursor-pointer
          focus:outline-none focus:ring-0"
      >
        <IoArrowBackCircleOutline
          size={20}
          className="text-sky-400 group-hover:text-sky-500 group-hover:-translate-x-0.5 transition-all duration-200"
        />
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 tracking-tight transition-colors duration-200">
          Back
        </span>
      </button>
      {sectionId === "Cognizant" && (
        <div className="pt-6">
          <ExpertiseSection
            companyData={CognizantData}
            expertiseItems={expertiseItems}
          />
        </div>
      )}
      {sectionId === "ConvergePoint" && (
        <div className="pt-6">
          <ExpertiseSection
            companyData={ConvergePointData}
            expertiseItems={expertiseItems}
          />
        </div>
      )}
      {sectionId === "FocusCraftTech" && (
        <div className="pt-6">
          <ExpertiseSection
            companyData={FctData}
            expertiseItems={expertiseItems}
          />
        </div>
      )}
    </div>
  );
};
