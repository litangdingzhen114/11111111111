import {
  Lightbulb,
  Code2,
  Server,
  Sparkles,
  Search,
  Target,
  Palette,
  Hammer,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";

/* ─── Capabilities ─────────────────────────── */

export interface Capability {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const capabilities: Capability[] = [
  {
    title: "Product Strategy",
    icon: Lightbulb,
    description:
      "Market research, requirement analysis, MVP planning, roadmaps, and user-centric analytics to shape the right product.",
  },
  {
    title: "Frontend Experience",
    icon: Code2,
    description:
      "React, Next.js, TypeScript, Tailwind CSS — crafting performant, accessible, and visually stunning interfaces.",
  },
  {
    title: "Full-stack Engineering",
    icon: Server,
    description:
      "API design, databases, authentication, serverless functions, and DevOps to deliver end-to-end solutions.",
  },
  {
    title: "AI / SaaS Prototyping",
    icon: Sparkles,
    description:
      "Integrating LLMs, building AI-powered features, and shipping SaaS MVPs from concept to production.",
  },
];

/* ─── Process Steps ────────────────────────── */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    icon: Search,
    description:
      "Understand user needs, business goals, and market context through research and stakeholder interviews.",
  },
  {
    number: "02",
    title: "Define",
    icon: Target,
    description:
      "Define the problem, validate assumptions, and plan the solution with clear requirements and scope.",
  },
  {
    number: "03",
    title: "Design",
    icon: Palette,
    description:
      "Design user flows, wireframes, and high-fidelity prototypes that align UX with product strategy.",
  },
  {
    number: "04",
    title: "Build",
    icon: Hammer,
    description:
      "Write clean, scalable code — build the full product from frontend to backend, ready for users.",
  },
  {
    number: "05",
    title: "Iterate",
    icon: RotateCcw,
    description:
      "Launch, gather feedback, and continuously improve based on real user data and evolving needs.",
  },
];

/* ─── Tech Stack ───────────────────────────── */

export interface TechItem {
  name: string;
  category: string;
}

export const techStack: TechItem[] = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Node.js", category: "Runtime" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "ORM" },
  { name: "Supabase", category: "BaaS" },
  { name: "Vercel", category: "Deploy" },
  { name: "Figma", category: "Design" },
  { name: "Git", category: "VCS" },
  { name: "Docker", category: "DevOps" },
];

/* ─── Stats ────────────────────────────────── */

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export const stats: Stat[] = [
  { value: "20", suffix: "+", label: "Projects Completed" },
  { value: "6", suffix: "+", label: "Years Experience" },
  { value: "10", suffix: "+", label: "Industries Served" },
  { value: "100", suffix: "%", label: "Client Satisfaction" },
];
