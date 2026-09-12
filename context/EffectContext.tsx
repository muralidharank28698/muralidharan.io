"use client";
import React, { useRef, useEffect } from "react";
import { gsap, Elastic } from "gsap";
import './globalStyle.css';

const ParticleSketch = () => {
  const circleRefs = useRef<HTMLDivElement[]>([]);

  const moveCircles = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;

    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        const maxLeft = innerWidth - circle.offsetWidth;
        const maxTop = innerHeight - circle.offsetHeight;

        const duration = 1.5 + (index * 0.3);

        gsap.to(circle, {
          duration,
          ease: Elastic.easeOut.config(1, 0.3),
          left: Math.min(e.pageX, maxLeft),
          top: Math.min(e.pageY, maxTop),
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", moveCircles);

    return () => {
      window.removeEventListener("mousemove", moveCircles);
    };
  }, []);

  return (
    <div className="container">
      <div className="follow follow1" ref={el => { if(el) circleRefs.current[0] = el; }}></div>
      <div className="follow follow2" ref={el => { if(el) circleRefs.current[1] = el; }}></div>
      <div className="follow follow3" ref={el => { if(el) circleRefs.current[2] = el; }}></div>
    </div>
  );
};

export default ParticleSketch;



