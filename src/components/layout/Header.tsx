"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/motion/MagneticButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    if (isMobileOpen) {
      root.style.overflow = "hidden";
    }

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          isScrolled
            ? "border-b border-white/[0.06] bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-[var(--site-text)] transition-colors hover:text-primary"
            >
              <span className="text-primary">/</span> sunmaosun
            </Link>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-[var(--site-panel-hover)] text-[var(--site-text)]"
                      : "text-[var(--site-muted)] hover:bg-[var(--site-panel)] hover:text-[var(--site-text)]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <MagneticButton className="ml-4">
                <Link
                  href="/contact"
                  className="site-primary-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                >
                  联系我
                </Link>
              </MagneticButton>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-[var(--site-muted)] transition-colors hover:text-[var(--site-text)] md:hidden"
              aria-label="切换菜单"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 min-h-[100svh] overflow-y-auto bg-background/95 pt-20 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6 px-6 py-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "text-2xl font-semibold transition-colors",
                      pathname === item.href
                        ? "text-[var(--site-text)]"
                        : "text-[var(--site-muted)] hover:text-[var(--site-text)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.22 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="site-primary-cta mt-4 inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-semibold"
                >
                  联系我
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
