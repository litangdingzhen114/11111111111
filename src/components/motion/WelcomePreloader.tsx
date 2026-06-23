"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { projects } from "@/data/projects";

const MIN_VISIBLE_MS = 920;
const EXIT_MS = 340;
const FONT_TIMEOUT_MS = 720;
const IMAGE_TIMEOUT_MS = 2400;
const ROUTE_WARMUP_MS = 180;
const IMAGE_PRELOAD_WIDTH = 1080;
const sessionKey = "sunmaosun-preloader-seen";

interface PreloadTask {
  label: string;
  weight: number;
  run: () => Promise<void>;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function uniqueItems<T>(items: T[]) {
  return Array.from(new Set(items));
}

function withTimeout(task: Promise<unknown>, ms: number) {
  return Promise.race([task, wait(ms)]).then(() => undefined);
}

function getPreloadImageSrc(src: string) {
  if (!src.startsWith("/") || src.startsWith("/_next/image")) return src;
  const encodedSrc = encodeURIComponent(src);
  return `/_next/image?url=${encodedSrc}&w=${IMAGE_PRELOAD_WIDTH}&q=75`;
}

function preloadImage(src: string, timeoutMs = IMAGE_TIMEOUT_MS) {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise<void>((resolve) => {
    const img = new window.Image();
    let settled = false;
    const timeoutId = window.setTimeout(done, timeoutMs);

    function done() {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      resolve();
    }

    img.decoding = "async";
    img.onload = () => {
      const decodePromise = img.decode?.();
      if (decodePromise) {
        void decodePromise.catch(() => undefined).then(done);
        return;
      }
      done();
    };
    img.onerror = done;
    img.src = getPreloadImageSrc(src);
  });
}

function shouldShowPreloaderOnPath() {
  return window.location.pathname === "/";
}

function hasSeenPreloader() {
  try {
    return window.sessionStorage.getItem(sessionKey) === "true";
  } catch {
    return false;
  }
}

function rememberPreloader() {
  try {
    window.sessionStorage.setItem(sessionKey, "true");
  } catch {
    // Storage can be unavailable in embedded browser contexts.
  }
}

function shouldSkipMediaPreload() {
  if (typeof navigator === "undefined") return true;

  const connection = navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  };
  const effectiveType = connection.connection?.effectiveType;

  return (
    Boolean(connection.connection?.saveData) ||
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    effectiveType === "3g"
  );
}

export default function WelcomePreloader() {
  const router = useRouter();
  const pathname = usePathname();
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    []
  );
  const primaryRoutes = useMemo(
    () => [
      "/work",
      ...featuredProjects.map((project) => `/work/${project.slug}`),
    ],
    [featuredProjects]
  );
  const warmupRoutes = useMemo(
    () =>
      uniqueItems([
        "/",
        "/work",
        "/about",
        ...featuredProjects.map((project) => `/work/${project.slug}`),
      ]),
    [featuredProjects]
  );
  const preloadImages = useMemo(
    () => {      return uniqueItems(
        projects
          .filter(project => project.featured)
          .map((project) => project.coverImage)
          .filter(Boolean) as string[]
      );
    },
    []
  );

  const [progress, setProgress] = useState(8);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(pathname === "/");

  useEffect(() => {
    if (pathname !== "/" || hasSeenPreloader()) {
      setIsVisible(false);
    }
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let idleId = 0;
    let timerId: ReturnType<typeof globalThis.setTimeout> | null = null;
    let failSafeId: ReturnType<typeof globalThis.setTimeout> | null = null;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    const prefetchRoutes = (hrefs: string[]) => {
      hrefs.forEach((href) => router.prefetch(href));
    };

    const scheduleRouteWarmup = () => {
      const warmup = () => {
        prefetchRoutes(warmupRoutes);
      };

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(warmup, { timeout: 2400 });
      } else {
        timerId = globalThis.setTimeout(warmup, 900);
      }
    };

    const createTasks = (): PreloadTask[] => {
      const imageTasks = preloadImages.map((src) => ({
        label: src,
        weight: 12,
        run: () => preloadImage(src),
      }));

      return [
        {
          label: "fonts",
          weight: 18,
          run: () =>
            withTimeout(document.fonts?.ready ?? Promise.resolve(), FONT_TIMEOUT_MS),
        },
        {
          label: "routes",
          weight: 22,
          run: async () => {
            prefetchRoutes(primaryRoutes);
            await wait(ROUTE_WARMUP_MS);
          },
        },
        ...imageTasks,
      ];
    };

    const preload = async (onProgress: (value: number) => void) => {
      const tasks = createTasks();
      const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
      let completedWeight = 0;

      const finishTask = (task: PreloadTask) => {
        completedWeight += task.weight;
        onProgress(8 + Math.round((completedWeight / totalWeight) * 88));
      };

      await Promise.all(
        tasks.map(async (task) => {
          try {
            await task.run();
          } catch {
            // Preloading should never block the visitor from entering the site.
          } finally {
            finishTask(task);
          }
        })
      );
    };

    const run = async () => {
      if (!isVisible) {
        scheduleRouteWarmup();
        return;
      }

      const startedAt = performance.now();
      root.style.overflow = "hidden";
      let targetProgress = 12;
      let renderedProgress = 8;
      const preloadPromise = preload((value) => {
        targetProgress = Math.max(targetProgress, Math.min(value, 96));
      });
      failSafeId = globalThis.setTimeout(() => {
        if (cancelled) return;
        root.style.overflow = previousOverflow;
        rememberPreloader();
        setIsVisible(false);
        scheduleRouteWarmup();
      }, MIN_VISIBLE_MS + EXIT_MS + 1800);

      const animateProgress = () => {
        if (cancelled) return;

        renderedProgress += (targetProgress - renderedProgress) * 0.14;
        const next = Math.min(96, Math.round(renderedProgress));
        setProgress((current) => Math.max(current, next));

        frame = window.requestAnimationFrame(animateProgress);
      };

      frame = window.requestAnimationFrame(animateProgress);

      await preloadPromise;

      const elapsed = performance.now() - startedAt;
      if (elapsed < MIN_VISIBLE_MS) {
        await wait(MIN_VISIBLE_MS - elapsed);
      }

      if (cancelled) return;
      targetProgress = 100;
      setProgress(100);
      await wait(620);

      if (cancelled) return;
      setIsExiting(true);
      await wait(EXIT_MS);

      if (!cancelled) {
        if (failSafeId) globalThis.clearTimeout(failSafeId);
        root.style.overflow = previousOverflow;
        rememberPreloader();
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
      if (failSafeId) globalThis.clearTimeout(failSafeId);
      root.style.overflow = previousOverflow;
    };
  }, [isVisible, preloadImages, primaryRoutes, router, warmupRoutes]);

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
          {"Hello,I'm sunmaosun👋"}
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
