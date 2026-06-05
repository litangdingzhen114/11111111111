"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const smoothEase = (t: number) => 1 - Math.pow(1 - t, 4);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const accessibilityPanelOpenRef = useRef(false);

  useEffect(() => {
    let cleanupLenis: (() => void) | null = null;

    const shouldReduceMotion = () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const smallViewport = window.innerWidth < 768;
      return (
        prefersReducedMotion ||
        coarsePointer ||
        smallViewport ||
        document.documentElement.dataset.reducedMotion === "true"
      );
    };

    const destroyLenis = () => {
      cleanupLenis?.();
      cleanupLenis = null;
      lenisRef.current = null;
    };

    const setupLenis = () => {
      if (shouldReduceMotion()) {
        destroyLenis();
        return;
      }
      if (cleanupLenis) return;

      const root = document.documentElement;
      const lenis = new Lenis({
        duration: 0.62,
        easing: smoothEase,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        syncTouch: false,
        overscroll: false,
        stopInertiaOnNavigate: true,
        anchors: {
          offset: -80,
          duration: 0.85,
          easing: smoothEase,
          lock: true,
        },
      });

      lenisRef.current = lenis;
      root.dataset.scrollState = "idle";
      if (accessibilityPanelOpenRef.current) {
        lenis.stop();
      }

      const handleScroll = () => {
        root.dataset.scrollState = lenis.isScrolling ? "moving" : "idle";
        ScrollTrigger.update();
      };

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };

      lenis.on("scroll", handleScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      cleanupLenis = () => {
        lenis.off("scroll", handleScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
        delete root.dataset.scrollState;
        ScrollTrigger.refresh();
      };
    };

    const handleAccessibilityChange = () => {
      if (shouldReduceMotion()) {
        destroyLenis();
      } else {
        setupLenis();
      }
    };

    const handleAccessibilityPanel = (event: Event) => {
      const detail = (event as CustomEvent<{ open?: boolean }>).detail;
      accessibilityPanelOpenRef.current = Boolean(detail?.open);

      if (accessibilityPanelOpenRef.current) {
        lenisRef.current?.stop();
      } else {
        lenisRef.current?.start();
      }
    };

    setupLenis();
    window.addEventListener(
      "portfolio-accessibility-change",
      handleAccessibilityChange
    );
    window.addEventListener(
      "portfolio-accessibility-panel",
      handleAccessibilityPanel
    );
    window.addEventListener("resize", handleAccessibilityChange, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "portfolio-accessibility-change",
        handleAccessibilityChange
      );
      window.removeEventListener(
        "portfolio-accessibility-panel",
        handleAccessibilityPanel
      );
      window.removeEventListener("resize", handleAccessibilityChange);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, {
      immediate: true,
      force: true,
    });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
