"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import RevealText from "@/components/motion/RevealText";

const testimonials = [
  {
    quote:
      "He's not just a developer, but a true product thinker. He helped us validate ideas, build the right features, and ship on time. Highly recommended!",
    name: "Sarah Johnson",
    title: "CEO, DataFlow",
    avatar: "SJ",
  },
  {
    quote:
      "Outstanding technical skill combined with deep product understanding. He doesn't just write code — he builds solutions that move the needle for our business.",
    name: "Michael Chen",
    title: "CTO, TechVenture",
    avatar: "MC",
  },
];

const experience = [
  {
    period: "2021 – Present",
    role: "Product Manager & Full-stack Developer",
    company: "Freelance / Contract",
    description:
      "Build and consult on digital products from idea to production, working with startups and SMBs.",
  },
  {
    period: "2019 – 2021",
    role: "Frontend Developer",
    company: "Tech Company",
    description:
      "Built complex web applications and improved performance and user experience across multiple products.",
  },
  {
    period: "2018 – 2019",
    role: "Junior Developer",
    company: "Digital Agency",
    description:
      "Worked on various web projects and learned full-stack development best practices.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Testimonials */}
          <div>
            <RevealText>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                What Clients Say
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Testimonials
              </h2>
            </RevealText>

            <div className="mt-10 space-y-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="fill-purple-400 text-purple-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 italic">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <RevealText>
              <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                Background
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Experience
              </h2>
            </RevealText>

            <div className="mt-10 space-y-8">
              {experience.map((exp, i) => (
                <motion.div
                  key={exp.period}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-purple-500 after:absolute after:left-[3px] after:top-4 after:h-full after:w-[2px] after:bg-white/[0.06] last:after:hidden"
                >
                  <p className="text-xs font-mono text-purple-400">
                    {exp.period}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-gray-500">{exp.company}</p>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
