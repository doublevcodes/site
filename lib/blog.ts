import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  body: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parsePostFromFile(fileName: string): BlogPost | null {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(BLOG_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);

  if (typeof data.title !== "string" || typeof data.date !== "string") {
    return null;
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : undefined,
    body: content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
  const posts = files
    .map(parsePostFromFile)
    .filter((post): post is BlogPost => post !== null);

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePostFromFile(`${slug}.mdx`);
}
