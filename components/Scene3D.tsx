"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Sparkles, Sphere, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// A floating glass sphere to give a premium 3D center piece
function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[2, 0, -2]}>
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          anisotropy={0.1}
          chromaticAberration={0.03}
          distortion={0.1}
          distortionScale={0.5}
          temporalDistortion={0.0}
          color="#38bdf8"
          transmission={1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

// Background environment
const Scene3DContent: React.FC = () => {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#34d399" />
      
      {/* 3D Elements */}
      <GlassSphere />
      
      {/* Floating particles (premium dust effect) */}
      <Sparkles count={400} scale={12} size={1} speed={0.4} opacity={0.2} color="#57d5ff" />
      
      <Environment preset="city" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
    </>
  );
};

export const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 w-full h-full pointer-events-none bg-zinc-950">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Scene3DContent />
      </Canvas>
    </div>
  );
};

export default Scene3D;
