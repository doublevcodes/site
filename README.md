# VIVAAN Brutalist Site

Next.js + Tailwind v4 site with a brutalist monochrome landing page, 3D CSS hero tilt, and scaffolded routes for About, Blog, and Projects.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Content editing

- Blog posts: add `.mdx` files in `content/blog/` with frontmatter:
  - `title` (string, required)
  - `date` (YYYY-MM-DD, required)
  - `excerpt` (string, optional)
- Projects:
  - Create `content/projects/manifest.json` as an array of:
    - `slug` (string)
    - `title` (string)
    - `year` (number)
    - `stack` (string[])
    - `status` (`shipped` | `building` | `archived`)
    - `url` (optional string)
    - `repo` (optional string)
  - Or place one JSON file per project in `content/projects/`.

The landing stats strip reads project count from `content/projects`.
