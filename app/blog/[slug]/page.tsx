import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { useMDXComponents } from "@/mdx-components";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt ?? "Blog post",
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const mdxComponents = useMDXComponents({});
  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
  });

  return (
    <main className="min-h-screen px-[clamp(1rem,4vw,4rem)] pt-[clamp(5rem,9vw,7rem)] pb-[clamp(2rem,5vw,4rem)]">
      <article className="font-brutal-mono mx-auto w-full max-w-[960px] border-4 border-[var(--color-fg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.5rem)] shadow-[12px_12px_0_var(--color-fg)] leading-[1.6] tracking-[0.04em] uppercase">
        <h1 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          {post.title}
        </h1>
        <p className="m-0">[{post.date.replaceAll("-", ".")}]</p>
        <div className="my-5 border-t-4 border-[var(--color-fg)]" />
        {content}
      </article>
    </main>
  );
}
