"use client";

import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type ThemeMode = "night" | "day";
type Vec3 = [number, number, number];
type PointerRef = MutableRefObject<{ x: number; y: number }>;

interface ScenePalette {
  ambient: number;
  directional: { color: string; intensity: number };
  fillA: { color: string; intensity: number };
  fillB: { color: string; intensity: number };
  particle: string;
  particleOpacity: number;
  panelBg: string;
  panelBgOpacity: number;
  panelBorder: string;
  panelBorderOpacity: number;
  panelLine: string;
  panelMuted: string;
  panelAccent: string;
  panelWarm: string;
  pathA: string;
  pathB: string;
  pathC: string;
  glowA: string;
  glowB: string;
  fallbackBg: string;
  fallbackPanel: string;
  fallbackBorder: string;
  fallbackLine: string;
  fallbackAccent: string;
}

const scenePalettes: Record<ThemeMode, ScenePalette> = {
  night: {
    ambient: 0.62,
    directional: { color: "#e8eeff", intensity: 0.68 },
    fillA: { color: "#5db7a3", intensity: 0.72 },
    fillB: { color: "#8fa3ff", intensity: 0.46 },
    particle: "#d9dde8",
    particleOpacity: 0.2,
    panelBg: "#101722",
    panelBgOpacity: 0.52,
    panelBorder: "#e8eeff",
    panelBorderOpacity: 0.24,
    panelLine: "#dfe6ff",
    panelMuted: "#8d96a6",
    panelAccent: "#8fa3ff",
    panelWarm: "#d6a45f",
    pathA: "#8fa3ff",
    pathB: "#5db7a3",
    pathC: "#d6a45f",
    glowA: "#8fa3ff",
    glowB: "#5db7a3",
    fallbackBg:
      "radial-gradient(circle at 48% 48%, rgba(143,163,255,0.24), transparent 34%), radial-gradient(circle at 60% 54%, rgba(93,183,163,0.16), transparent 38%)",
    fallbackPanel: "rgba(17, 23, 34, 0.66)",
    fallbackBorder: "rgba(232, 238, 255, 0.24)",
    fallbackLine: "rgba(223, 230, 255, 0.48)",
    fallbackAccent: "#8fa3ff",
  },
  day: {
    ambient: 1.05,
    directional: { color: "#fff4df", intensity: 0.88 },
    fillA: { color: "#76c9ba", intensity: 0.42 },
    fillB: { color: "#9ba7e8", intensity: 0.34 },
    particle: "#46515f",
    particleOpacity: 0.14,
    panelBg: "#fffdf7",
    panelBgOpacity: 0.74,
    panelBorder: "#3b4661",
    panelBorderOpacity: 0.22,
    panelLine: "#2d3441",
    panelMuted: "#6b7280",
    panelAccent: "#4f5fb8",
    panelWarm: "#a76532",
    pathA: "#4f5fb8",
    pathB: "#2f7c74",
    pathC: "#a76532",
    glowA: "#b8c4ff",
    glowB: "#9bd8cd",
    fallbackBg:
      "radial-gradient(circle at 48% 48%, rgba(79,95,184,0.18), transparent 34%), radial-gradient(circle at 60% 54%, rgba(47,124,116,0.14), transparent 38%)",
    fallbackPanel: "rgba(255, 253, 247, 0.76)",
    fallbackBorder: "rgba(59, 70, 97, 0.18)",
    fallbackLine: "rgba(45, 52, 65, 0.46)",
    fallbackAccent: "#4f5fb8",
  },
};

const HERO_FRAME_INTERVAL_MS = 1000 / 28;

const panels: Array<{
  id: string;
  position: Vec3;
  rotation: Vec3;
  width: number;
  height: number;
  variant: "agent" | "workflow" | "metrics";
}> = [
  {
    id: "agent-panel",
    position: [-2.78, 0.22, -0.86],
    rotation: [0.02, 0.42, -0.09],
    width: 1.34,
    height: 1.72,
    variant: "agent",
  },
  {
    id: "workflow-panel",
    position: [2.6, 0.06, -0.72],
    rotation: [-0.02, -0.4, 0.08],
    width: 1.52,
    height: 1.42,
    variant: "workflow",
  },
  {
    id: "metrics-panel",
    position: [0.28, -1.86, -1.02],
    rotation: [0.2, -0.03, 0.02],
    width: 2.28,
    height: 0.86,
    variant: "metrics",
  },
];

const ribbonSpecs: Array<{
  id: string;
  points: Vec3[];
  color: "pathA" | "pathB" | "pathC";
  thickness: number;
  opacity: number;
  speed: number;
  offset: number;
}> = [
  {
    id: "discovery-to-prototype",
    points: [
      [-3.32, 0.92, -0.92],
      [-1.72, 1.48, -1.18],
      [-0.18, 1.34, -0.72],
      [1.34, 1.42, -1.04],
      [3.22, 0.76, -0.86],
    ],
    color: "pathA",
    thickness: 0.008,
    opacity: 0.46,
    speed: 0.055,
    offset: 0.08,
  },
  {
    id: "agent-feedback-loop",
    points: [
      [-3.14, -0.38, -0.64],
      [-1.78, -1.18, -0.98],
      [0.18, -1.04, -0.6],
      [1.88, -1.16, -0.94],
      [3.04, -0.46, -0.68],
    ],
    color: "pathB",
    thickness: 0.007,
    opacity: 0.42,
    speed: 0.047,
    offset: 0.46,
  },
  {
    id: "metric-rise",
    points: [
      [-1.82, -1.98, -0.72],
      [-0.68, -1.38, -0.92],
      [0.52, -1.3, -0.72],
      [1.5, -0.82, -0.98],
      [2.62, 0.3, -0.78],
    ],
    color: "pathC",
    thickness: 0.006,
    opacity: 0.34,
    speed: 0.04,
    offset: 0.68,
  },
];

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

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;
  const parsed = Number.parseInt(normalized, 16);

  return {
    b: parsed & 255,
    g: (parsed >> 8) & 255,
    r: (parsed >> 16) & 255,
  };
}

function useGlowTexture(color: string) {
  return useMemo(() => {
    const { r, g, b } = hexToRgb(color);
    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 160;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const gradient = context.createRadialGradient(80, 80, 0, 80, 80, 78);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.52)`);
    gradient.addColorStop(0.42, `rgba(${r}, ${g}, ${b}, 0.22)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    context.fillStyle = gradient;
    context.fillRect(0, 0, 160, 160);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [color]);
}

function makeRoundedRectGeometry(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return new THREE.ShapeGeometry(shape, 10);
}

function FrameLimiter({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    let lastFrameAt = 0;

    const tick = (time: number) => {
      if (time - lastFrameAt >= HERO_FRAME_INTERVAL_MS) {
        lastFrameAt = time;
        invalidate();
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, invalidate]);

  return null;
}

function AmbientField({
  color,
  opacity,
}: {
  color: string;
  opacity: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 46;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i * 5) - 0.5) * 7.6;
      pos[i * 3 + 1] = (seededRandom(i * 5 + 1) - 0.5) * 4.8;
      pos[i * 3 + 2] = (seededRandom(i * 5 + 2) - 0.5) * 2.1 - 0.6;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
      />
    </points>
  );
}

function PlaneLine({
  color,
  opacity = 0.44,
  position,
  scale,
}: {
  color: string;
  opacity?: number;
  position: Vec3;
  scale: [number, number];
}) {
  return (
    <mesh position={position}>
      <planeGeometry args={scale} />
      <meshBasicMaterial
        color={color}
        depthWrite={false}
        opacity={opacity}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

function MiniNode({
  color,
  opacity,
  position,
  size = 0.12,
}: {
  color: string;
  opacity: number;
  position: Vec3;
  size?: number;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, 0.018]} />
      <meshBasicMaterial color={color} opacity={opacity} transparent />
    </mesh>
  );
}

function Sparkline({
  color,
  opacity,
  points,
}: {
  color: string;
  opacity: number;
  points: Vec3[];
}) {
  const positions = useMemo(
    () => new Float32Array(points.flatMap((point) => point)),
    [points]
  );

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} opacity={opacity} transparent />
    </line>
  );
}

function ProductPanel({
  panel,
  palette,
  seed,
}: {
  panel: (typeof panels)[number];
  palette: ScenePalette;
  seed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const panelGeometry = useMemo(
    () => makeRoundedRectGeometry(panel.width, panel.height, 0.075),
    [panel.height, panel.width]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y =
      panel.position[1] + Math.sin(t * 0.48 + seed) * 0.045;
    groupRef.current.rotation.z =
      panel.rotation[2] + Math.sin(t * 0.32 + seed) * 0.01;
  });

  const renderAgentPanel = () => (
    <>
      <PlaneLine
        color={palette.panelAccent}
        opacity={0.68}
        position={[-0.38, 0.68, 0.024]}
        scale={[0.28, 0.035]}
      />
      <PlaneLine
        color={palette.panelLine}
        opacity={0.32}
        position={[0.05, 0.68, 0.024]}
        scale={[0.52, 0.026]}
      />
      <PlaneLine
        color={palette.panelLine}
        opacity={0.24}
        position={[-0.2, 0.36, 0.024]}
        scale={[0.78, 0.07]}
      />
      <PlaneLine
        color={palette.panelWarm}
        opacity={0.52}
        position={[0.2, 0.12, 0.024]}
        scale={[0.68, 0.07]}
      />
      <PlaneLine
        color={palette.panelLine}
        opacity={0.28}
        position={[-0.12, -0.14, 0.024]}
        scale={[0.86, 0.07]}
      />
      <PlaneLine
        color={palette.panelAccent}
        opacity={0.54}
        position={[-0.08, -0.44, 0.024]}
        scale={[0.58, 0.05]}
      />
      <PlaneLine
        color={palette.panelMuted}
        opacity={0.26}
        position={[-0.18, -0.62, 0.024]}
        scale={[0.64, 0.025]}
      />
    </>
  );

  const renderWorkflowPanel = () => (
    <>
      {[
        [-0.44, 0.32, palette.panelLine, 0.34],
        [0.03, 0.3, palette.panelAccent, 0.64],
        [0.46, 0.08, palette.panelLine, 0.3],
        [-0.28, -0.25, palette.panelWarm, 0.54],
        [0.3, -0.42, palette.panelLine, 0.28],
      ].map(([x, y, color, opacity], index) => (
        <MiniNode
          key={index}
          color={color as string}
          opacity={opacity as number}
          position={[x as number, y as number, 0.026]}
          size={index === 1 ? 0.16 : 0.13}
        />
      ))}
      <Sparkline
        color={palette.panelLine}
        opacity={0.34}
        points={[
          [-0.36, 0.32, 0.03],
          [-0.08, 0.3, 0.03],
          [0.12, 0.28, 0.03],
          [0.4, 0.12, 0.03],
          [0.32, -0.34, 0.03],
          [-0.22, -0.24, 0.03],
        ]}
      />
      <PlaneLine
        color={palette.panelLine}
        opacity={0.22}
        position={[0, -0.64, 0.024]}
        scale={[0.92, 0.026]}
      />
    </>
  );

  const renderMetricsPanel = () => (
    <>
      {[-0.75, -0.42, -0.08, 0.26, 0.58].map((x, index) => (
        <mesh key={x} position={[x, -0.14 + index * 0.035, 0.026]}>
          <planeGeometry args={[0.15, 0.24 + index * 0.055]} />
          <meshBasicMaterial
            color={index === 3 ? palette.panelAccent : palette.panelLine}
            opacity={index === 3 ? 0.62 : 0.27}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      ))}
      <Sparkline
        color={palette.panelWarm}
        opacity={0.58}
        points={[
          [-0.9, 0.19, 0.031],
          [-0.55, 0.08, 0.031],
          [-0.24, 0.16, 0.031],
          [0.1, -0.02, 0.031],
          [0.44, 0.22, 0.031],
          [0.86, 0.11, 0.031],
        ]}
      />
      <PlaneLine
        color={palette.panelMuted}
        opacity={0.24}
        position={[0.22, 0.32, 0.024]}
        scale={[1.18, 0.026]}
      />
    </>
  );

  return (
    <group ref={groupRef} position={panel.position} rotation={panel.rotation}>
      <mesh geometry={panelGeometry}>
        <meshStandardMaterial
          color={palette.panelBg}
          metalness={0.12}
          opacity={palette.panelBgOpacity}
          roughness={0.62}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[panelGeometry]} />
        <lineBasicMaterial
          color={palette.panelBorder}
          opacity={palette.panelBorderOpacity}
          transparent
        />
      </lineSegments>
      <PlaneLine
        color={palette.panelLine}
        opacity={0.16}
        position={[0, panel.height / 2 - 0.22, 0.022]}
        scale={[panel.width - 0.24, 0.012]}
      />
      {panel.variant === "agent" && renderAgentPanel()}
      {panel.variant === "workflow" && renderWorkflowPanel()}
      {panel.variant === "metrics" && renderMetricsPanel()}
    </group>
  );
}

function RibbonPulse({
  color,
  curve,
  offset,
  speed,
}: {
  color: string;
  curve: THREE.CatmullRomCurve3;
  offset: number;
  speed: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const progress = (state.clock.elapsedTime * speed + offset) % 1;
    const point = curve.getPoint(progress);
    if (pulseRef.current) pulseRef.current.position.copy(point);
    if (glowRef.current) glowRef.current.position.copy(point);
  });

  return (
    <>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={color}
          depthWrite={false}
          opacity={0.16}
          transparent
        />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.024, 10, 6]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={color}
          depthWrite={false}
          opacity={0.78}
          transparent
        />
      </mesh>
    </>
  );
}

function Ribbon({
  palette,
  spec,
}: {
  palette: ScenePalette;
  spec: (typeof ribbonSpecs)[number];
}) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        spec.points.map((point) => new THREE.Vector3(...point)),
        false,
        "catmullrom",
        0.45
      ),
    [spec.points]
  );
  const color = palette[spec.color];

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 48, spec.thickness, 6, false]} />
        <meshBasicMaterial
          blending={THREE.AdditiveBlending}
          color={color}
          depthWrite={false}
          opacity={spec.opacity}
          transparent
        />
      </mesh>
      <RibbonPulse
        color={color}
        curve={curve}
        offset={spec.offset}
        speed={spec.speed}
      />
    </group>
  );
}

function Halo({
  color,
  opacity,
  position,
  scale,
}: {
  color: string;
  opacity: number;
  position: Vec3;
  scale: [number, number];
}) {
  const texture = useGlowTexture(color);

  useEffect(() => () => texture?.dispose(), [texture]);

  if (!texture) return null;

  return (
    <sprite position={position} scale={[scale[0], scale[1], 1]}>
      <spriteMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={texture}
        opacity={opacity}
        transparent
      />
    </sprite>
  );
}

function PortfolioAtlasScene({
  pointerRef,
  themeMode,
}: {
  pointerRef: PointerRef;
  themeMode: ThemeMode;
}) {
  const palette = scenePalettes[themeMode];
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const pointer = pointerRef.current;
    const targetY = pointer.x * 0.075 + Math.sin(t * 0.11) * 0.025;
    const targetX = -pointer.y * 0.035 + Math.sin(t * 0.09 + 1.2) * 0.018;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.055;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.055;
    groupRef.current.position.y = Math.sin(t * 0.22) * 0.025;
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight
        color={palette.directional.color}
        intensity={palette.directional.intensity}
        position={[4, 4, 5]}
      />
      <pointLight
        color={palette.fillA.color}
        intensity={palette.fillA.intensity}
        position={[-3.6, -1.6, 2.2]}
      />
      <pointLight
        color={palette.fillB.color}
        intensity={palette.fillB.intensity}
        position={[3.4, 2.1, -0.8]}
      />
      <group ref={groupRef} position={[0, -0.04, -0.28]} scale={1.14}>
        <Halo
          color={palette.glowA}
          opacity={themeMode === "day" ? 0.1 : 0.16}
          position={[-2.55, 0.42, -1.18]}
          scale={[1.8, 1.8]}
        />
        <Halo
          color={palette.glowB}
          opacity={themeMode === "day" ? 0.09 : 0.14}
          position={[2.45, -0.02, -1.12]}
          scale={[1.95, 1.95]}
        />
        {ribbonSpecs.map((spec) => (
          <Ribbon key={spec.id} palette={palette} spec={spec} />
        ))}
        {panels.map((panel, index) => (
          <ProductPanel
            key={panel.id}
            palette={palette}
            panel={panel}
            seed={index * 1.6 + 0.4}
          />
        ))}
        <AmbientField color={palette.particle} opacity={palette.particleOpacity} />
      </group>
    </>
  );
}

function CSSFallback({ themeMode }: { themeMode: ThemeMode }) {
  const palette = scenePalettes[themeMode];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute left-1/2 top-1/2 h-[min(620px,128vw)] w-[min(620px,128vw)] -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{
          background: palette.fallbackBg,
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute left-[5%] top-[18%] h-56 w-40 -rotate-6 rounded-[10px] border shadow-2xl sm:left-[10%] sm:top-[20%] sm:h-72 sm:w-52"
        style={{
          background: palette.fallbackPanel,
          borderColor: palette.fallbackBorder,
        }}
      >
        <span
          className="absolute left-5 top-6 h-2 w-14 rounded-full"
          style={{ background: palette.fallbackAccent }}
        />
        <span
          className="absolute left-5 top-14 h-2 w-24 rounded-full opacity-70"
          style={{ background: palette.fallbackLine }}
        />
        <span
          className="absolute left-12 top-28 h-3 w-24 rounded-full opacity-70"
          style={{ background: palette.fallbackLine }}
        />
        <span
          className="absolute left-5 top-40 h-3 w-28 rounded-full opacity-40"
          style={{ background: palette.fallbackLine }}
        />
      </div>
      <div
        className="absolute right-[4%] top-[24%] h-48 w-44 rotate-6 rounded-[10px] border shadow-2xl sm:right-[11%] sm:top-[22%] sm:h-60 sm:w-60"
        style={{
          background: palette.fallbackPanel,
          borderColor: palette.fallbackBorder,
        }}
      >
        {[0, 1, 2, 3, 4].map((item) => (
          <span
            key={item}
            className="absolute h-8 w-8 rounded-[5px]"
            style={{
              left: `${17 + item * 16}%`,
              top: `${28 + (item % 2) * 22}%`,
              background: item === 1 ? palette.fallbackAccent : palette.fallbackLine,
              opacity: item === 1 ? 0.72 : 0.42,
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-[12%] left-1/2 h-24 w-[min(480px,76vw)] -translate-x-1/2 rounded-[10px] border shadow-2xl sm:h-32"
        style={{
          background: palette.fallbackPanel,
          borderColor: palette.fallbackBorder,
        }}
      >
        {[0, 1, 2, 3, 4].map((item) => (
          <span
            key={item}
            className="absolute bottom-6 w-8 rounded-t-[5px]"
            style={{
              left: `${17 + item * 16}%`,
              height: `${22 + item * 8}px`,
              background: item === 3 ? palette.fallbackAccent : palette.fallbackLine,
              opacity: item === 3 ? 0.72 : 0.42,
            }}
          />
        ))}
      </div>
      {[22, -18, 148].map((rotation, index) => (
        <span
          key={rotation}
          className="absolute left-1/2 top-1/2 h-px w-[78vw] origin-center rounded-full"
          style={{
            background:
              index === 1
                ? `linear-gradient(90deg, transparent, ${palette.fallbackAccent}, transparent)`
                : `linear-gradient(90deg, transparent, ${palette.fallbackLine}, transparent)`,
            opacity: index === 1 ? 0.45 : 0.28,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroScene() {
  const themeMode = useThemeMode();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [isSceneActive, setIsSceneActive] = useState(true);
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
      !prefersReducedMotion && !isMobile && deviceMemory >= 6 && cpuCores >= 6
    );
  });

  useEffect(() => {
    if (!shouldRender3D) return;

    let isInView = true;

    const updateActiveState = () => {
      setIsSceneActive(isInView && document.visibilityState === "visible");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = Boolean(entry?.isIntersecting);
        updateActiveState();
      },
      { rootMargin: "160px 0px", threshold: 0.01 }
    );

    if (sceneRef.current) {
      observer.observe(sceneRef.current);
    }

    document.addEventListener("visibilitychange", updateActiveState);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateActiveState);
    };
  }, [shouldRender3D]);

  useEffect(() => {
    if (!shouldRender3D || !isSceneActive) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isSceneActive, shouldRender3D]);

  if (!shouldRender3D) {
    return <CSSFallback themeMode={themeMode} />;
  }

  return (
    <div ref={sceneRef} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5.85], fov: 42 }}
        dpr={[0.65, 1]}
        frameloop={isSceneActive ? "demand" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        performance={{ min: 0.45 }}
        style={{ pointerEvents: "none" }}
      >
        <FrameLimiter active={isSceneActive} />
        <PortfolioAtlasScene pointerRef={pointerRef} themeMode={themeMode} />
      </Canvas>
    </div>
  );
}
