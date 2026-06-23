"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";

export default function ContactCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="theme-cta-panel relative overflow-hidden rounded-[8px] border border-[var(--site-line)] text-[var(--site-text)]">
          <div className="theme-cta-glow absolute inset-0" />
          <div className="theme-cta-grid absolute inset-0 bg-[size:44px_44px]" />

          <div className="relative grid gap-8 p-5 sm:gap-10 sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10">
            <RevealText>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--site-accent-2)]">
                Next Project
              </p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.35rem,10vw,3rem)] font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                想聊项目、
                <br />
                原型或实习机会？
              </h2>
            </RevealText>

            <RevealText delay={0.12} className="flex flex-col justify-end">
              <p className="text-sm leading-7 text-[var(--site-muted)] sm:text-base sm:leading-8">
                如果你对某个项目感兴趣，或者有产品、前端、小程序相关机会，可以直接发我消息。
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="site-primary-cta inline-flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3.5 text-sm font-bold transition-colors"
                  >
                    <Mail size={16} />
                    发起联系
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="mailto:sunmoe.dev@gmail.com"
                    className="site-secondary-cta inline-flex w-full items-center justify-center gap-2 rounded-[6px] border px-6 py-3.5 text-sm font-bold transition-colors"
                  >
                    sunmoe.dev@gmail.com
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-muted)]">
                邮箱和 GitHub 都可以找到我
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
