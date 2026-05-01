import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const MANIFEST_FILE = path.join(PROJECTS_DIR, "manifest.json");
const VALID_TYPES = new Set(["hackathon", "startup", "side-project", "open-source", "research"]);

function ensureManifest() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }

  if (!fs.existsSync(MANIFEST_FILE)) {
    fs.writeFileSync(MANIFEST_FILE, "[]\n", "utf8");
  }
}

function readManifest() {
  ensureManifest();
  const raw = fs.readFileSync(MANIFEST_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error("content/projects/manifest.json must be an array.");
  }
  return parsed;
}

function writeManifest(projects) {
  fs.writeFileSync(MANIFEST_FILE, `${JSON.stringify(projects, null, 2)}\n`, "utf8");
}

function validateSlug(slug, existingProjects) {
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    throw new Error("Slug must use lowercase letters, numbers, and hyphens only.");
  }
  if (existingProjects.some((project) => project.slug === slug)) {
    throw new Error(`Slug "${slug}" already exists.`);
  }
}

function validateType(typeRaw) {
  const type = typeRaw.trim().toLowerCase();
  if (!VALID_TYPES.has(type)) {
    throw new Error(
      'Type must be one of: "hackathon", "startup", "side-project", "open-source", "research".'
    );
  }
  return type;
}

async function main() {
  const existingProjects = readManifest();
  const rl = readline.createInterface({ input, output });

  try {
    const slug = (await rl.question("slug (lowercase-hyphen-case): ")).trim();
    validateSlug(slug, existingProjects);

    const title = (await rl.question("title: ")).trim();
    if (!title) throw new Error("Title is required.");

    const description = (await rl.question("description: ")).trim();
    if (!description) throw new Error("Description is required.");

    const type = validateType(
      await rl.question("type (hackathon|startup|side-project|open-source|research): ")
    );

    const url = (await rl.question("live url (optional): ")).trim();
    const repo = (await rl.question("repo url (optional): ")).trim();

    const newProject = {
      slug,
      title,
      description,
      type,
      ...(url ? { url } : {}),
      ...(repo ? { repo } : {}),
    };

    existingProjects.push(newProject);
    writeManifest(existingProjects);

    console.log(`Added project "${title}" to content/projects/manifest.json`);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
