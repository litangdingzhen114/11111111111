import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, User, Layers } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { getProjectMDX, getAllProjectSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const mdx = getProjectMDX(slug);

  if (!project || !mdx) notFound();

  // Find prev/next projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Work
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {project.type.map((t) => (
              <span
                key={t}
                className="rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Cover */}
        <div
          className={`aspect-[16/8] rounded-2xl bg-gradient-to-br ${project.coverGradient} flex items-center justify-center mb-12 border border-white/[0.06]`}
        >
          <div className="text-9xl font-black text-white/10 select-none">
            {project.title.charAt(0)}
          </div>
        </div>

        {/* Metadata cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <User size={14} />
              <span className="text-xs uppercase tracking-wider">Role</span>
            </div>
            <p className="text-sm font-medium text-white">{project.role}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Calendar size={14} />
              <span className="text-xs uppercase tracking-wider">Year</span>
            </div>
            <p className="text-sm font-medium text-white">{project.year}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Layers size={14} />
              <span className="text-xs uppercase tracking-wider">Stack</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* MDX Content */}
        <article className="prose-custom">
          <MDXRemote source={mdx.content} />
        </article>

        {/* Prev / Next */}
        <div className="mt-20 pt-8 border-t border-white/[0.06] grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-purple-500/20 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <ArrowLeft size={12} /> Previous
              </span>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-purple-500/20 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-gray-500 mb-1">
                Next <ArrowRight size={12} />
              </span>
              <p className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
