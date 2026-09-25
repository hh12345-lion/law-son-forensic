import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  imageAlt?: string;
  content: string;
  readingTime: string;
};

function estimateReadingTime(text: string): string {
  const words = text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "",
    updated: (data.updated as string | undefined) || undefined,
    image: (data.image as string | undefined) || undefined,
    imageAlt: (data.imageAlt as string | undefined) || undefined,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllBlogPosts(): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
