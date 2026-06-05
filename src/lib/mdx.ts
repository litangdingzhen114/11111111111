import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content/projects");

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  description: string;
  role: string;
  stack: string[];
  type: string[];
  year: string;
  customLayout?: boolean;
}

export interface ProjectMDX {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getProjectMDX(slug: string): ProjectMDX | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
