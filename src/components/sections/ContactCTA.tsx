"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";

export default function ContactCTA() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="section-shell">
        <div className="theme-cta-panel relative overflow-hidden rounded-[8px] border border-white/10 text-white">
          <div className="theme-cta-glow absolute inset-0" />
          <div className="theme-cta-grid absolute inset-0 bg-[size:44px_44px]" />

          <div className="relative grid gap-8 p-5 sm:gap-10 sm:p-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-12">
            <RevealText>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--site-accent-2)]">
                Next Project
              </p>
              <h2 className="mt-5 max-w-5xl text-[clamp(2.35rem,10vw,3rem)] font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-8xl">
                想聊 AI 产品、
                <br />
                原型或实习机会？
              </h2>
            </RevealText>

            <RevealText delay={0.12} className="flex flex-col justify-end">
              <p className="text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                如果你想了解这些项目的细节，或者有 AI 产品、前端原型、小程序相关机会，欢迎直接联系我。
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-[var(--site-panel-inverse)] px-6 py-3.5 text-sm font-bold text-[var(--site-inverse-text)] transition-colors"
                  >
                    <Mail size={16} />
                    发起联系
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="mailto:llf374603@gmail.com"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[6px] border border-white/16 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    llf374603@gmail.com
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
                邮箱 / GitHub / 作品集均可联系
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
