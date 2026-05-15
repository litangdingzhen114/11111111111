"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Particles ─────────────────────────────── */

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Torus Knot ────────────────────────────── */

function TorusKnotModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.6}>
        <torusKnotGeometry args={[1, 0.35, 128, 32]} />
        <MeshDistortMaterial
          color="#7c3aed"
          roughness={0.15}
          metalness={0.9}
          distort={0.2}
          speed={2}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

/* ─── Orbit Ring ────────────────────────────── */

function OrbitRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[3.5, 0.008, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
    </mesh>
  );
}

/* ─── Scene ─────────────────────────────────── */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e9d5ff" />
      <pointLight position={[-3, -3, 2]} intensity={0.5} color="#818cf8" />
      <pointLight position={[3, 3, -2]} intensity={0.4} color="#c084fc" />
      <TorusKnotModel />
      <OrbitRing />
      <Particles count={150} />
    </>
  );
}

/* ─── CSS Fallback for mobile / reduced motion ─ */

function CSSFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(99,102,241,0.3) 40%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />
      {/* Secondary blob */}
      <div
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 60%)",
          animation: "pulse-glow 6s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

/* ─── HeroScene ─────────────────────────────── */

export default function HeroScene() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    setShouldRender3D(!prefersReducedMotion && !isMobile);
  }, []);

  if (!shouldRender3D) {
    return <CSSFallback />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
