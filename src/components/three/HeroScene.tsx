"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

type ThemeMode = "night" | "day";

const scenePalettes = {
  night: {
    particle: "#a6c7da",
    particleOpacity: 0.46,
    model: "#6668d8",
    roughness: 0.16,
    metalness: 0.88,
    envMapIntensity: 1.18,
    ring: "#49b9c8",
    ringOpacity: 0.22,
    ambient: 0.34,
    directional: { color: "#ddd6fe", intensity: 0.85 },
    lowerLeft: { color: "#79b2cf", intensity: 0.5 },
    upperRight: { color: "#49b9c8", intensity: 0.38 },
    lowerCenter: { color: "#d8b5ff", intensity: 0.22 },
    fallbackA:
      "radial-gradient(circle, rgba(102,104,216,0.42) 0%, rgba(121,178,207,0.22) 42%, transparent 70%)",
    fallbackB:
      "radial-gradient(circle, rgba(73,185,200,0.28) 0%, transparent 62%)",
  },
  day: {
    particle: "#9b9183",
    particleOpacity: 0.1,
    model: "#c9beb0",
    roughness: 0.78,
    metalness: 0.08,
    envMapIntensity: 0.52,
    ring: "#a99d8c",
    ringOpacity: 0.07,
    ambient: 0.84,
    directional: { color: "#fff4df", intensity: 0.82 },
    lowerLeft: { color: "#8f8171", intensity: 0.08 },
    upperRight: { color: "#d4c7b5", intensity: 0.1 },
    lowerCenter: { color: "#b18a60", intensity: 0.06 },
    fallbackA:
      "radial-gradient(circle, rgba(161,145,126,0.12) 0%, rgba(201,190,176,0.1) 42%, transparent 70%)",
    fallbackB:
      "radial-gradient(circle, rgba(177,138,96,0.07) 0%, transparent 62%)",
  },
} as const;

function useThemeMode() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("night");

  useEffect(() => {
    const readThemeMode = () => {
      setThemeMode(
        document.documentElement.dataset.themeMode === "day" ? "day" : "night"
      );
    };

    readThemeMode();
    window.addEventListener("portfolio-accessibility-change", readThemeMode);
    return () =>
      window.removeEventListener("portfolio-accessibility-change", readThemeMode);
  }, []);

  return themeMode;
}

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function Particles({
  color,
  count = 70,
  opacity,
}: {
  color: string;
  count?: number;
  opacity: number;
}) {
  const mesh = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 3) - 0.5) * 20;
      pos[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 20;
      pos[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 20;
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
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

function TorusKnotModel({
  color,
  envMapIntensity,
  metalness,
  roughness,
}: {
  color: string;
  envMapIntensity: number;
  metalness: number;
  roughness: number;
}) {
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
      <mesh ref={meshRef} scale={1.55}>
        <torusKnotGeometry args={[1, 0.34, 84, 18]} />
        <MeshDistortMaterial
          color={color}
          roughness={roughness}
          metalness={metalness}
          distort={0.18}
          speed={2}
          envMapIntensity={envMapIntensity}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ color, opacity }: { color: string; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[3.5, 0.008, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Scene({ themeMode }: { themeMode: ThemeMode }) {
  const palette = scenePalettes[themeMode];

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={palette.directional.intensity}
        color={palette.directional.color}
      />
      <pointLight
        position={[-3, -3, 2]}
        intensity={palette.lowerLeft.intensity}
        color={palette.lowerLeft.color}
      />
      <pointLight
        position={[3, 3, -2]}
        intensity={palette.upperRight.intensity}
        color={palette.upperRight.color}
      />
      <pointLight
        position={[0, -4, 3]}
        intensity={palette.lowerCenter.intensity}
        color={palette.lowerCenter.color}
      />
      <TorusKnotModel
        color={palette.model}
        envMapIntensity={palette.envMapIntensity}
        metalness={palette.metalness}
        roughness={palette.roughness}
      />
      <OrbitRing color={palette.ring} opacity={palette.ringOpacity} />
      <Particles color={palette.particle} opacity={palette.particleOpacity} />
    </>
  );
}

function CSSFallback({ themeMode }: { themeMode: ThemeMode }) {
  const palette = scenePalettes[themeMode];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 h-[min(420px,88vw)] w-[min(420px,88vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background: palette.fallbackA,
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 left-1/3 h-[min(260px,56vw)] w-[min(260px,56vw)] rounded-full opacity-20"
        style={{
          background: palette.fallbackB,
          animation: "pulse-glow 6s ease-in-out infinite reverse",
        }}
      />
    </div>
  );
}

export default function HeroScene() {
  const themeMode = useThemeMode();
  const [shouldRender3D] = useState(() => {
    if (typeof window === "undefined") return false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;
    const memoryNavigator = navigator as Navigator & { deviceMemory?: number };
    const deviceMemory = memoryNavigator.deviceMemory ?? 8;
    const cpuCores = navigator.hardwareConcurrency ?? 8;

    return (
      !prefersReducedMotion && !isMobile && deviceMemory >= 4 && cpuCores >= 4
    );
  });

  if (!shouldRender3D) {
    return <CSSFallback themeMode={themeMode} />;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[0.8, 1.15]}
        performance={{ min: 0.5 }}
        style={{ pointerEvents: "none" }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Scene themeMode={themeMode} />
      </Canvas>
    </div>
  );
}
