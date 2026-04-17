import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display mt-[1.2rem] mb-[0.6rem] border-b-4 border-[var(--color-fg)] pb-[0.2rem] text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] uppercase">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display mt-[1.2rem] mb-[0.6rem] border-b-4 border-[var(--color-fg)] pb-[0.2rem] text-[clamp(2rem,5vw,3.4rem)] leading-[0.95] uppercase">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mt-[1.2rem] mb-[0.6rem] border-b-4 border-[var(--color-fg)] pb-[0.2rem] text-[clamp(1.5rem,4vw,2.4rem)] leading-[0.95] uppercase">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="my-3">{children}</p>,
    ul: ({ children }) => <ul className="my-3 pl-5">{children}</ul>,
    li: ({ children }) => <li className="my-3">{children}</li>,
    code: ({ children }) => (
      <code className="font-brutal-mono border-2 border-[var(--color-fg)] px-[0.3rem]">
        {children}
      </code>
    ),
    ...components,
  };
}
