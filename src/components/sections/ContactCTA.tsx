"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-violet-600/10 to-blue-600/20" />
          <div className="absolute inset-0 bg-[#05050A]/60" />

          {/* Content */}
          <div className="relative px-8 py-20 text-center sm:px-16 lg:py-28">
            <RevealText>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Have a project in mind?
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Let&apos;s work together.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-gray-400">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#05050A] hover:bg-gray-100 transition-colors shadow-xl"
                  >
                    <Mail size={16} />
                    Get In Touch
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="mailto:hello@myportfolio.com"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-gray-300 hover:border-white/20 hover:text-white transition-all"
                  >
                    hello@myportfolio.com
                    <ArrowRight size={14} />
                  </a>
                </MagneticButton>
              </div>
              <p className="mt-6 text-xs text-gray-600">
                Usually reply within 24 hours
              </p>
            </RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
