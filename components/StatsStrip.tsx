import { getAllProjects } from "@/lib/projects";

export async function StatsStrip() {
  const projects = await getAllProjects();

  return (
    <section
      className="font-brutal-mono flex flex-wrap items-center justify-center gap-4 border-y-4 border-[var(--color-fg)] px-[clamp(1rem,4vw,3rem)] py-4 text-[clamp(0.8rem,1.3vw,1rem)] tracking-[0.05em] uppercase"
      aria-label="Current build stats"
    >
      <span>PROJECTS: {projects.length}/27</span>
      <span className="hidden sm:inline">—</span>
      <span>STACK: Python / TypeScript / Next.js</span>
      <span className="hidden sm:inline">—</span>
      <span>LOCATION: London</span>
      <span className="hidden sm:inline">—</span>
      <span>STATUS: BUILDING</span>
    </section>
  );
}
