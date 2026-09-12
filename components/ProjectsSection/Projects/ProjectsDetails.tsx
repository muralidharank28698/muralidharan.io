"use client";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ProjectsDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId } = location.state || {}; // Get sectionId from state

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-10">
      <button
        onClick={handleBack}
        className="flex items-center mb-4 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {/* <span className="">Back</span> */}
      </button>
      {sectionId === "policy-management" && (
        <h1 className="text-3xl font-bold">
          This is Content 1 for SP Policy Center.
        </h1>
      )}
      {sectionId === "contract-management" && (
        <h1 className="text-3xl font-bold">
          This is Content 2 for SP Contract Portal.
        </h1>
      )}
      {sectionId === "incident-management" && (
        <h1 className="text-3xl font-bold">
          This is Content 3 for SP Incident Tracker.
        </h1>
      )}
    </div>
  );
};

// import React from "react";

// export const ProjectsDetails: React.FC = () => {
//   // Parse query parameters
//   const queryParams = new URLSearchParams(window.location.search);
//   const sectionId = queryParams.get("sectionId"); // Get sectionId from query params

//   return (
//     <div className="p-10">
//       <button
//         onClick={() => (window.location.href = "/")} // Navigate back to home page
//         className="flex items-center mb-4 text-blue-500 hover:text-blue-700 transition-all duration-300"
//       >
//         Back
//       </button>
//       {sectionId === "Policy Management" && (
//         <h1 className="text-3xl font-bold">
//           This is Content 1 for Policy Management.
//         </h1>
//       )}
//       {sectionId === "Contract Management" && (
//         <h1 className="text-3xl font-bold">
//           This is Content 2 for Contract Management.
//         </h1>
//       )}
//       {sectionId === "Incident Management" && (
//         <h1 className="text-3xl font-bold">
//           This is Content 3 for Incident Management.
//         </h1>
//       )}
//     </div>
//   );
// };


