"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 123;



const CanvasScrollSequence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load all images into memory for zero-latency playback
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g. 001, 012, 123)
      const formattedNumber = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${formattedNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      imgArray.push(img);
    }
    
    setImages(imgArray);
  }, []);

  const { scrollYProgress } = useScroll(); // Tracks the entire window scroll

  // Map scroll progress (0 to 1) to frame index (0 to 122)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = (index: number) => {
    if (!imagesLoaded || !canvasRef.current || !images[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = images[index];
    
    // Use "contain" strategy: fit the entire image inside the canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;
    
    if (imgRatio > canvasRatio) {
      // Image is wider — fit to canvas width, letterbox top/bottom
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Image is taller — fit to canvas height, pillarbox left/right
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    // Clear canvas and draw new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Darker filter for text visibility
    ctx.filter = "brightness(0.3) saturate(1)";
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Initial draw and handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame
        drawFrame(Math.round(frameIndex.get()));
      }
    };
    
    // Set initial size
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  // Update canvas when frameIndex changes from scrolling
  useMotionValueEvent(frameIndex, "change", (latest) => {
    drawFrame(Math.round(latest));
  });

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-zinc-950 -z-50 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover mix-blend-screen opacity-30"
      />
      
      {/* Loading Indicator */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-white z-50 transition-opacity duration-500">
          <span className="text-sm tracking-widest uppercase font-medium">Loading Sequence...</span>
        </div>
      )}
    </div>
  );
};

export default CanvasScrollSequence;
