"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

const MIN_VISIBLE_MS = 920;
const EXIT_MS = 340;
const sessionKey = "sunmaosun-preloader-seen";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function WelcomePreloader() {
  const router = useRouter();
  const routes = useMemo(
    () => [
      "/",
      "/work",
      "/about",
      "/contact",
      ...projects.map((project) => `/work/${project.slug}`),
    ],
    []
  );

  const [progress, setProgress] = useState(8);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem(sessionKey) !== "true";
  });

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let idleId = 0;
    let timerId: ReturnType<typeof globalThis.setTimeout> | null = null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    const scheduleRouteWarmup = () => {
      const warmup = () => {
        routes.forEach((href) => router.prefetch(href));
      };

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(warmup, { timeout: 2400 });
      } else {
        timerId = globalThis.setTimeout(warmup, 900);
      }
    };

    const preload = async () => {
      await Promise.race([document.fonts?.ready ?? Promise.resolve(), wait(420)]);
    };

    const run = async () => {
      if (!isVisible) {
        scheduleRouteWarmup();
        return;
      }

      const startedAt = performance.now();
      root.style.overflow = "hidden";
      const preloadPromise = preload();

      const animateProgress = () => {
        if (cancelled) return;

        const elapsed = performance.now() - startedAt;
        const next = Math.min(96, 8 + Math.round((elapsed / MIN_VISIBLE_MS) * 88));
        setProgress(next);

        if (next < 96) {
          frame = window.requestAnimationFrame(animateProgress);
        }
      };

      frame = window.requestAnimationFrame(animateProgress);

      await preloadPromise;

      const elapsed = performance.now() - startedAt;
      if (elapsed < MIN_VISIBLE_MS) {
        await wait(MIN_VISIBLE_MS - elapsed);
      }

      if (cancelled) return;
      setProgress(100);
      await wait(620);

      if (cancelled) return;
      setIsExiting(true);
      await wait(EXIT_MS);

      if (!cancelled) {
        root.style.overflow = previousOverflow;
        window.sessionStorage.setItem(sessionKey, "true");
        setIsVisible(false);
        scheduleRouteWarmup();
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      if (idleId) window.cancelIdleCallback?.(idleId);
      if (timerId) globalThis.clearTimeout(timerId);
      root.style.overflow = previousOverflow;
    };
  }, [isVisible, router, routes]);

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={!isExiting}
      className={`site-preloader fixed inset-0 z-[100] grid min-h-[100svh] place-items-center transition-opacity duration-300 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="px-5 text-center">
        <p className="text-[clamp(2.1rem,10vw,4rem)] font-black tracking-tight">
          {"Hello,I'm Nuss👋"}
        </p>
        <p className="mt-4 font-mono text-[clamp(4rem,18vw,7rem)] font-black tabular-nums">
          {progress}
        </p>
        <div className="mx-auto mt-5 h-px w-44 overflow-hidden bg-[var(--site-line)] sm:w-56">
          <div
            className="h-full bg-[var(--site-text)] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div> 
  );
}
