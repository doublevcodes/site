import { BlogConstructionTape } from "@/components/BlogConstructionTape";
import { getAllPosts } from "@/lib/blog";

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BlogConstructionTape />
      <main className="min-h-screen px-[clamp(1rem,4vw,4rem)] pt-[clamp(5rem,9vw,7rem)] pb-[clamp(2rem,5vw,4rem)]">
      <section className="mx-auto w-full max-w-[960px] border-4 border-[var(--color-fg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.5rem)] shadow-[12px_12px_0_var(--color-fg)]">
        <h1 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          Blog
        </h1>
        {posts.length === 0 ? (
          <p className="font-brutal-mono m-0 leading-[1.6] tracking-[0.04em] uppercase">
            NOTHING WRITTEN YET.
          </p>
        ) : (
          <div className="flex flex-col border-t-4 border-[var(--color-fg)]">
            {posts.map((post) => (
              <div
                key={post.slug}
                aria-disabled
                className="font-brutal-mono block cursor-not-allowed border-b-4 border-[var(--color-fg)] px-[0.4rem] py-4 tracking-[0.04em] uppercase opacity-60 select-none"
                title="Under construction"
              >
                [{post.date.replaceAll("-", ".")}] — {post.title}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
    </>
  );
}
