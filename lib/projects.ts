import fs from "node:fs";
import path from "node:path";

export type ProjectStatus = "shipped" | "building" | "archived";

export type Project = {
  slug: string;
  title: string;
  year: number;
  stack: string[];
  status: ProjectStatus;
  url?: string;
  repo?: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const MANIFEST_FILE = path.join(PROJECTS_DIR, "manifest.json");

function normalizeProject(data: unknown): Project | null {
  if (!data || typeof data !== "object") return null;

  const project = data as Partial<Project>;
  if (
    typeof project.slug !== "string" ||
    typeof project.title !== "string" ||
    typeof project.year !== "number" ||
    !Array.isArray(project.stack) ||
    !project.stack.every((item) => typeof item === "string") ||
    (project.status !== "shipped" &&
      project.status !== "building" &&
      project.status !== "archived")
  ) {
    return null;
  }

  return {
    slug: project.slug,
    title: project.title,
    year: project.year,
    stack: project.stack,
    status: project.status,
    url: typeof project.url === "string" ? project.url : undefined,
    repo: typeof project.repo === "string" ? project.repo : undefined,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  if (fs.existsSync(MANIFEST_FILE)) {
    const raw = fs.readFileSync(MANIFEST_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeProject)
      .filter((project): project is Project => project !== null);
  }

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".json") && file !== "manifest.json");

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
      const parsed = JSON.parse(raw) as unknown;
      return normalizeProject(parsed);
    })
    .filter((project): project is Project => project !== null);
}
