"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useSectionInView = (
  sectionRef: React.RefObject<HTMLElement | null>,
  setActive: React.Dispatch<
    React.SetStateAction<"Profile" | "About" | "Projects" | "Skills" | "Experience" | "Contact">
  >,
  sectionName: "Profile" | "About" | "Projects" | "Skills" | "Experience" | "Contact" // Restrict to the valid section names
) => {
  const { ref, inView } = useInView();
  console.log(ref, inView, "murali");
  
  // useEffect(() => {
  //   if (!sectionRef.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setActive(sectionName); // Ensure sectionName is from the valid set
  //       }
  //     },
  //     { threshold: 0.6 }
  //   );
  //   console.log("murlaifoaiufioas,", sectionRef.current);

  //   observer.observe(sectionRef.current);

  //   return () => {
  //     if (sectionRef.current) observer.unobserve(sectionRef.current);
  //   };
  // }, [sectionRef, setActive, sectionName]);
};


