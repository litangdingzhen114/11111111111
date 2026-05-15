export type ProjectType =
  | "AI / SaaS"
  | "Dashboard"
  | "Web App"
  | "Marketplace"
  | "AI Tool"
  | "Productivity"
  | "Internal Tool"
  | "Product"
  | "Frontend"
  | "Full-stack";

export interface Project {
  slug: string;
  title: string;
  description: string;
  role: string;
  stack: string[];
  type: ProjectType[];
  year: string;
  featured: boolean;
  coverGradient: string;
}

export const projects: Project[] = [
  {
    slug: "ai-analytics-dashboard",
    title: "AI Analytics Dashboard",
    description:
      "An AI-powered analytics platform helping businesses transform raw data into actionable insights with real-time visualizations and predictive models.",
    role: "Product Manager / Full-stack Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "AI API"],
    type: ["AI / SaaS", "Dashboard"],
    year: "2024",
    featured: true,
    coverGradient: "from-violet-600/40 via-purple-600/30 to-blue-600/40",
  },
  {
    slug: "real-estate-platform",
    title: "Real Estate Platform",
    description:
      "A full-featured real estate marketplace with interactive map search, advanced filtering, and a streamlined property listing workflow.",
    role: "Product Strategy / Frontend Lead / Full-stack Developer",
    stack: ["Next.js", "Mapbox", "PostgreSQL", "Prisma", "Tailwind CSS"],
    type: ["Web App", "Marketplace"],
    year: "2024",
    featured: true,
    coverGradient: "from-blue-600/40 via-cyan-600/30 to-emerald-600/40",
  },
  {
    slug: "ai-copywriting-tool",
    title: "AI Copywriting Tool",
    description:
      "A SaaS product that leverages generative AI to help marketers create high-converting copy across email, landing pages, and social media in seconds.",
    role: "Product Manager / Full-stack Developer",
    stack: ["Next.js", "OpenAI API", "Prisma", "Stripe", "Tailwind CSS"],
    type: ["AI Tool", "AI / SaaS"],
    year: "2023",
    featured: true,
    coverGradient: "from-fuchsia-600/40 via-pink-600/30 to-rose-600/40",
  },
  {
    slug: "workflow-automation-app",
    title: "Workflow Automation App",
    description:
      "An internal productivity tool that automates repetitive workflows using rule-based triggers, edge functions, and real-time notifications.",
    role: "Product Manager / Full-stack Developer",
    stack: ["Next.js", "Supabase", "Edge Functions", "Tailwind CSS"],
    type: ["Productivity", "Internal Tool"],
    year: "2023",
    featured: false,
    coverGradient: "from-amber-600/40 via-orange-600/30 to-red-600/40",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectTypes(): string[] {
  const types = new Set<string>();
  projects.forEach((p) => p.type.forEach((t) => types.add(t)));
  return Array.from(types);
}
