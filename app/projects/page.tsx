import { getAllProjects } from "@/lib/projects";

function getGithubOgImage(repoUrl?: string, fallback?: string) {
  if (fallback) return fallback;
  if (!repoUrl) return undefined;

  try {
    const parsed = new URL(repoUrl);
    if (parsed.hostname !== "github.com") return undefined;

    const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !repo) return undefined;

    return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
  } catch {
    return undefined;
  }
}

function formatProjectType(type: "hackathon" | "startup" | "side-project" | "open-source" | "research") {
  if (type === "side-project") return "SIDE PROJECT";
  if (type === "open-source") return "OPEN SOURCE";
  return type.toUpperCase();
}

function getProjectTypeClasses(type: "hackathon" | "startup" | "side-project" | "open-source" | "research") {
  if (type === "hackathon") return "border-violet-300 bg-violet-600 text-white";
  if (type === "startup") return "border-sky-300 bg-sky-600 text-white";
  if (type === "side-project") return "border-amber-300 bg-amber-500 text-black";
  if (type === "open-source") return "border-emerald-300 bg-emerald-600 text-white";
  return "border-fuchsia-300 bg-fuchsia-600 text-white";
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <main className="min-h-screen px-[clamp(1rem,5vw,4rem)] pt-[clamp(5rem,9vw,7rem)] pb-[clamp(2rem,5vw,4rem)] sm:px-[clamp(1rem,4vw,4rem)]">
        <section className="mx-auto w-full max-w-[1320px]">
          <h1 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
            Projects
          </h1>
          {projects.length === 0 ? (
            <p className="font-brutal-mono m-0 leading-[1.6] tracking-[0.04em] uppercase">
              NO PROJECTS YET.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 border-t-4 border-[var(--color-fg)] pt-3 sm:grid-cols-2 sm:gap-4 sm:pt-4 xl:grid-cols-3">
              {projects.map((project) => {
                const ogImage = getGithubOgImage(project.repo, project.ogImage);
                const typeClasses = getProjectTypeClasses(project.type);

                return (
                  <article
                    key={project.slug}
                    className="flex h-full flex-col overflow-hidden border-[3px] border-[var(--color-fg)] bg-[var(--color-bg)] shadow-[3px_3px_0_var(--color-fg)] sm:border-4 sm:shadow-[6px_6px_0_var(--color-fg)]"
                  >
                    {ogImage ? (
                    <div className="aspect-[1200/630] w-full border-b-[3px] border-[var(--color-fg)] bg-white p-1 sm:border-b-4 sm:p-1.5">
                        <img
                          src={ogImage}
                          alt={`${project.title} Open Graph preview`}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="flex h-full flex-col gap-3 p-4 sm:gap-3 sm:p-4">
                      <header>
                        <h2 className="font-brutal-mono m-0 text-xl font-black leading-[0.95] tracking-[0.03em] uppercase sm:text-2xl">
                          {project.title}
                        </h2>
                      </header>

                      <p className="font-brutal-mono m-0 text-base leading-[1.55] tracking-[0.03em] uppercase sm:text-lg">
                        {project.description}
                      </p>

                      <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-0">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className={`font-brutal-mono inline-flex items-center border-2 px-2.5 py-1 text-[11px] font-black tracking-[0.04em] uppercase sm:px-2 sm:py-1 sm:text-xs ${typeClasses}`}
                          >
                            {formatProjectType(project.type)}
                          </span>
                        </span>
                        <span className="font-brutal-mono flex flex-wrap items-center gap-2 text-[11px] tracking-[0.04em] uppercase sm:inline-flex sm:justify-end sm:gap-3 sm:text-xs">
                          {project.url ? (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 border-2 border-[var(--color-fg)] px-3 py-1.5 hover:bg-[var(--color-fg)] hover:text-[var(--color-bg)] sm:px-3 sm:py-1"
                            >
                              <span className="relative inline-flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                              </span>
                              LIVE
                            </a>
                          ) : null}
                          {project.repo ? (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 border-2 border-[var(--color-fg)] bg-[var(--color-fg)] px-3 py-1.5 text-[var(--color-bg)] hover:opacity-85 sm:px-3 sm:py-1"
                            >
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 16 16"
                                className="h-3.5 w-3.5 fill-current"
                              >
                                <path d="M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.39 0-.19-.01-.82-.01-1.49-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.98-.82-1.18-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.84.72 1.24 1.87.89 2.33.68.07-.54.28-.89.51-1.09-1.78-.21-3.64-.91-3.64-4.04 0-.89.31-1.62.82-2.19-.08-.21-.36-1.05.08-2.18 0 0 .67-.22 2.2.84.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.06 2.2-.84 2.2-.84.44 1.13.16 1.97.08 2.18.51.57.82 1.29.82 2.19 0 3.14-1.87 3.83-3.65 4.03.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.47.55.39A8.23 8.23 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z" />
                              </svg>
                              REPO
                            </a>
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
