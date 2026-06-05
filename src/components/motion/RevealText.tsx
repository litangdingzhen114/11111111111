"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  y = 24,
  as: Tag = "div",
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      if (prefersReducedMotion) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, y: coarsePointer ? Math.min(y, 12) : y },
        {
          opacity: 1,
          y: 0,
          duration: coarsePointer ? 0.42 : 0.58,
          delay: coarsePointer ? Math.min(delay, 0.08) : delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<never>} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
