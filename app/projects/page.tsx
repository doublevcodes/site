import { getAllProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="min-h-screen px-[clamp(1rem,4vw,4rem)] pt-[clamp(5rem,9vw,7rem)] pb-[clamp(2rem,5vw,4rem)]">
      <section className="mx-auto w-full max-w-[960px] border-4 border-[var(--color-fg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.5rem)] shadow-[12px_12px_0_var(--color-fg)]">
        <h1 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          Projects
        </h1>
        {projects.length === 0 ? (
          <p className="font-brutal-mono m-0 leading-[1.6] tracking-[0.04em] uppercase">
            NOTHING SHIPPED YET.
          </p>
        ) : (
          <div className="flex flex-col border-t-4 border-[var(--color-fg)]">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="font-brutal-mono border-b-4 border-[var(--color-fg)] px-[0.4rem] py-[0.85rem] tracking-[0.04em] uppercase"
              >
                {String(index + 1).padStart(2, "0")} [{project.year}] {project.title} —{" "}
                {project.stack.join(" / ")} — {project.status}
                <span className="ml-3 inline-flex gap-3">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b-2 border-[var(--color-fg)] no-underline hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
                    >
                      LIVE
                    </a>
                  ) : null}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="border-b-2 border-[var(--color-fg)] no-underline hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)]"
                    >
                      REPO
                    </a>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
