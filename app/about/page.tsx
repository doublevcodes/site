export default function AboutPage() {
  return (
    <main className="min-h-screen px-[clamp(1rem,4vw,4rem)] pt-[clamp(5rem,9vw,7rem)] pb-[clamp(2rem,5vw,4rem)]">
      <section className="mx-auto w-full max-w-[960px] border-4 border-[var(--color-fg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.5rem)] shadow-[12px_12px_0_var(--color-fg)]">
        <h1 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          About Me
        </h1>
        <p className="font-brutal-mono m-0 leading-[1.6] tracking-[0.04em] uppercase">
          I BUILD FAST, SHIP EARLY, AND LEARN IN PUBLIC. I AM 17, BASED IN
          LONDON, AND I TREAT EVERY PROJECT LIKE A LIVE ITERATION.
        </p>

        <div className="my-5 border-t-4 border-[var(--color-fg)]" />

        <h2 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          Stack
        </h2>
        <ul className="font-brutal-mono m-0 pl-[1.2rem] tracking-[0.04em] uppercase">
          <li>PYTHON</li>
          <li>TYPESCRIPT</li>
          <li>NEXT.JS</li>
          <li>POSTGRES</li>
        </ul>

        <div className="my-5 border-t-4 border-[var(--color-fg)]" />

        <h2 className="font-display mb-4 mt-0 text-[clamp(3rem,10vw,7rem)] leading-[0.9] uppercase">
          Currently
        </h2>
        <p className="font-brutal-mono m-0 leading-[1.6] tracking-[0.04em] uppercase">
          BUILDING PRODUCTS, WRITING SHIP LOGS, AND EXPANDING FROM SOLO BUILDS
          TO SYSTEMS THAT SCALE.
        </p>
      </section>
    </main>
  );
}
