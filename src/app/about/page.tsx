import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product Manager & Full-stack Developer with 6+ years of experience.",
};

const highlights = [
  { label: "Years Experience", value: "6+" },
  { label: "Projects Shipped", value: "20+" },
  { label: "Industries", value: "10+" },
  { label: "Satisfaction", value: "100%" },
];

const focusAreas = [
  {
    title: "Product Thinking",
    description: "I start with the user and the business problem. Before writing code, I define product strategy and validate assumptions.",
  },
  {
    title: "Frontend Experience",
    description: "Modern, responsive, and performant interfaces using React, Next.js, and TypeScript with deep care for UX and visual polish.",
  },
  {
    title: "Full-stack Delivery",
    description: "I own the entire stack — database design, API development, deployment, and monitoring. I ship end-to-end.",
  },
  {
    title: "AI / SaaS Mindset",
    description: "Built AI-powered products and SaaS platforms from scratch, understanding subscription models and rapid iteration.",
  },
];

const timeline = [
  { year: "2021 – Present", role: "PM & Full-stack Developer", company: "Freelance", description: "Building digital products for startups worldwide." },
  { year: "2019 – 2021", role: "Frontend Developer", company: "Tech Company", description: "Built complex web apps, led frontend architecture." },
  { year: "2018 – 2019", role: "Junior Developer", company: "Digital Agency", description: "Diverse client projects, learned full-stack development." },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">About Me</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Product-minded<br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">full-stack developer</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed">
            I&apos;m a developer who thinks like a product manager. With 6+ years of experience, I&apos;ve learned that great software is about solving the right problems for the right users.
          </p>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            I combine product thinking, frontend craft, and full-stack engineering to turn ideas into usable, scalable web products.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {highlights.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center">
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-2 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="mb-10 text-2xl font-bold text-white">What I Bring to the Table</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {focusAreas.map((a, i) => (
              <div key={a.title} className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all">
                <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400">{a.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="mb-10 text-2xl font-bold text-white">Experience</h2>
          <div className="space-y-10">
            {timeline.map((t) => (
              <div key={t.year} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-purple-500 after:absolute after:left-[3px] after:top-4 after:h-full after:w-[2px] after:bg-white/[0.06] last:after:hidden">
                <p className="text-xs font-mono text-purple-400">{t.year}</p>
                <h3 className="mt-1 text-lg font-bold text-white">{t.role}</h3>
                <p className="text-sm text-gray-500">{t.company}</p>
                <p className="mt-2 text-sm text-gray-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-purple-600/10 to-blue-600/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Want to work together?</h2>
          <p className="mt-3 text-gray-400">I&apos;m currently available for freelance and full-time roles.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-purple-500/20">
              Get In Touch <ArrowRight size={14} />
            </Link>
            <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-8 py-3 text-sm font-semibold text-gray-300 hover:text-white transition-all">
              <Download size={14} /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
