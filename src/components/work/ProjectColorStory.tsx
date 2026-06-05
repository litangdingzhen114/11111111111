"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const nightPalettes = {
  hero: {
    base: "#05070B",
    glow:
      "radial-gradient(circle at 24% 16%, rgba(155,140,255,0.22), transparent 32%), radial-gradient(circle at 80% 12%, rgba(121,178,207,0.14), transparent 30%)",
  },
  overview: {
    base: "#090B18",
    glow:
      "radial-gradient(circle at 18% 28%, rgba(121,178,207,0.18), transparent 34%), radial-gradient(circle at 74% 64%, rgba(155,140,255,0.16), transparent 32%)",
  },
  problem: {
    base: "#120A18",
    glow:
      "radial-gradient(circle at 24% 30%, rgba(216,181,255,0.12), transparent 36%), radial-gradient(circle at 78% 12%, rgba(155,140,255,0.17), transparent 34%)",
  },
  solution: {
    base: "#061821",
    glow:
      "radial-gradient(circle at 22% 18%, rgba(73,185,200,0.18), transparent 32%), radial-gradient(circle at 82% 58%, rgba(121,178,207,0.16), transparent 34%)",
  },
  build: {
    base: "#07111F",
    glow:
      "radial-gradient(circle at 16% 70%, rgba(121,178,207,0.16), transparent 34%), radial-gradient(circle at 82% 20%, rgba(155,140,255,0.14), transparent 32%)",
  },
  decisions: {
    base: "#100B1F",
    glow:
      "radial-gradient(circle at 20% 22%, rgba(155,140,255,0.16), transparent 34%), radial-gradient(circle at 80% 70%, rgba(73,185,200,0.12), transparent 32%)",
  },
  architecture: {
    base: "#07131B",
    glow:
      "radial-gradient(circle at 26% 18%, rgba(73,185,200,0.16), transparent 34%), radial-gradient(circle at 82% 64%, rgba(155,140,255,0.14), transparent 34%)",
  },
  impact: {
    base: "#130C1D",
    glow:
      "radial-gradient(circle at 18% 22%, rgba(216,181,255,0.14), transparent 34%), radial-gradient(circle at 76% 62%, rgba(121,178,207,0.12), transparent 34%)",
  },
  content: {
    base: "#090B14",
    glow:
      "radial-gradient(circle at 20% 24%, rgba(155,140,255,0.14), transparent 34%), radial-gradient(circle at 82% 58%, rgba(73,185,200,0.1), transparent 34%)",
  },
  next: {
    base: "#05070B",
    glow:
      "radial-gradient(circle at 18% 30%, rgba(155,140,255,0.13), transparent 34%), radial-gradient(circle at 78% 62%, rgba(73,185,200,0.1), transparent 34%)",
  },
} as const;

const dayPalettes = {
  hero: {
    base: "#F5EFE4",
    glow:
      "radial-gradient(circle at 22% 18%, rgba(63,95,122,0.12), transparent 34%), radial-gradient(circle at 80% 16%, rgba(77,119,113,0.1), transparent 32%)",
  },
  overview: {
    base: "#F1E9DC",
    glow:
      "radial-gradient(circle at 18% 28%, rgba(77,119,113,0.11), transparent 34%), radial-gradient(circle at 74% 64%, rgba(154,106,69,0.09), transparent 32%)",
  },
  problem: {
    base: "#F3EADF",
    glow:
      "radial-gradient(circle at 24% 30%, rgba(154,106,69,0.1), transparent 36%), radial-gradient(circle at 78% 12%, rgba(63,95,122,0.1), transparent 34%)",
  },
  solution: {
    base: "#EDF2EE",
    glow:
      "radial-gradient(circle at 22% 18%, rgba(77,119,113,0.12), transparent 32%), radial-gradient(circle at 82% 58%, rgba(63,95,122,0.08), transparent 34%)",
  },
  build: {
    base: "#F4ECE0",
    glow:
      "radial-gradient(circle at 16% 70%, rgba(63,95,122,0.09), transparent 34%), radial-gradient(circle at 82% 20%, rgba(154,106,69,0.08), transparent 32%)",
  },
  decisions: {
    base: "#EFE7D9",
    glow:
      "radial-gradient(circle at 20% 22%, rgba(63,95,122,0.09), transparent 34%), radial-gradient(circle at 80% 70%, rgba(77,119,113,0.08), transparent 32%)",
  },
  architecture: {
    base: "#EEF1E7",
    glow:
      "radial-gradient(circle at 26% 18%, rgba(77,119,113,0.11), transparent 34%), radial-gradient(circle at 82% 64%, rgba(63,95,122,0.08), transparent 34%)",
  },
  impact: {
    base: "#F2E8DD",
    glow:
      "radial-gradient(circle at 18% 22%, rgba(154,106,69,0.09), transparent 34%), radial-gradient(circle at 76% 62%, rgba(63,95,122,0.08), transparent 34%)",
  },
  content: {
    base: "#F5EFE4",
    glow:
      "radial-gradient(circle at 20% 24%, rgba(63,95,122,0.08), transparent 34%), radial-gradient(circle at 82% 58%, rgba(77,119,113,0.07), transparent 34%)",
  },
  next: {
    base: "#F5EFE4",
    glow:
      "radial-gradient(circle at 18% 30%, rgba(63,95,122,0.08), transparent 34%), radial-gradient(circle at 78% 62%, rgba(154,106,69,0.07), transparent 34%)",
  },
} as const;

type PaletteKey = keyof typeof nightPalettes;

function isPaletteKey(value: string | null): value is PaletteKey {
  return value !== null && value in nightPalettes;
}

export default function ProjectColorStory({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTheme, setActiveTheme] = useState<PaletteKey>("hero");
  const [themeMode, setThemeMode] = useState<"night" | "day">("night");
  const palette =
    themeMode === "day" ? dayPalettes[activeTheme] : nightPalettes[activeTheme];

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project-theme]")
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const nextTheme = visible.target.getAttribute("data-project-theme");
        if (isPaletteKey(nextTheme)) {
          setActiveTheme(nextTheme);
        }
      },
      {
        rootMargin: "-38% 0px -42% 0px",
        threshold: [0, 0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

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

  return (
    <div className="relative isolate min-h-[100svh] overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{ backgroundColor: "var(--site-bg)" }}
      />
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeTheme}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            backgroundColor: palette.base,
            backgroundImage: palette.glow,
          }}
        />
      </AnimatePresence>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[size:92px_92px] opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(var(--site-bg-grid) 1px, transparent 1px), linear-gradient(90deg, var(--site-bg-grid) 1px, transparent 1px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            themeMode === "day"
              ? "radial-gradient(circle at center, transparent 0%, rgba(245,239,228,0.12) 58%, rgba(245,239,228,0.64) 100%)"
              : "radial-gradient(circle at center, transparent 0%, rgba(5,7,11,0.28) 58%, rgba(5,7,11,0.86) 100%)",
        }}
      />
      {children}
    </div>
  );
}
