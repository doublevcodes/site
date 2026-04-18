/** Copy for the about page. Add more exports here when you add sections. */

export const ABOUT_LEAD =
  "17. London. A-Level student. Heading to Cambridge to study Engineering. Love building with agents. Launched Gamma Prep — an AI-powered exam prep platform for ESAT and TMUA. Exploring agentic fintech solutions. Work ongoing."
/** One row per school / programme. Replace the placeholder with your real experience. */
export type EducationEntry = {
  /** School, sixth form, university, bootcamp, etc. */
  institution: string;
  /** e.g. A Levels, IB, BSc Computer Science */
  qualification?: string;
  /** e.g. "2022 — present" or "2018 — 2023" */
  period: string;
  /** Optional: subjects, focus, awards, links — one short paragraph or line */
  details?: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    institution: "Wilson's School, London",
    qualification: "A-Levels & GCSEs",
    period: "2019 — 2026",
  },
  {
    institution: "Cambridge University",
    qualification: "Engineering",
    period: "2026 —  2029",
  }
];

/** Tools, languages, and platforms — edit freely. Order is display order. */
export const STACK: string[] = [
  "Python",
  "Langchain / Langgraph",
  "TypeScript",
  "Next.js",
  "TailwindCSS",
];
