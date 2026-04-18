import type { Metadata } from "next";
import Image from "next/image";
import { AboutScrollHint } from "@/components/AboutScrollHint";
import { AboutTiltSlab } from "@/components/AboutTiltSlab";
import { BrutalScrollReveal, BrutalStaggerItem } from "@/components/BrutalScrollReveal";
import { ABOUT_LEAD, EDUCATION, STACK } from "@/lib/about";

export const metadata: Metadata = {
  title: "About · VIVAAN",
  description: "About Vivaan.",
};

const sectionBodyClass =
  "font-brutal-mono m-0 text-[0.95rem] leading-[1.65] tracking-[0.03em] sm:text-[1rem]";

const sectionTitleClass =
  "font-display m-0 text-[clamp(1.75rem,4.5vw,3rem)] leading-none uppercase tracking-[0.02em]";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-[clamp(1rem,4vw,4rem)] pb-[clamp(2rem,5vw,4rem)]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-[clamp(1.5rem,4vw,2.5rem)] pt-[clamp(5rem,9vw,7rem)] pb-12">
        <div className="flex min-h-[max(min(68vh,640px),calc(100dvh-clamp(5rem,9vw,7rem)-clamp(1.5rem,4vw,2.5rem)))] w-full flex-col items-stretch pb-[clamp(0.35rem,1.5vw,0.85rem)]">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
            <section className="w-full" aria-labelledby="about-heading">
              <AboutTiltSlab>
                <div className="flex min-h-[clamp(280px,42vh,520px)] w-full items-center justify-center py-[clamp(0.35rem,2vw,1.25rem)]">
                  <div
                    className="grid w-full max-w-[min(100%,56rem)] justify-items-center gap-[clamp(1.5rem,4vw,2.75rem)] sm:justify-items-stretch lg:max-w-none lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:items-center lg:justify-items-stretch lg:gap-x-[clamp(2rem,7vw,4.5rem)] lg:gap-y-0"
                  >
                    <div className="hero-photo-wrap w-[clamp(140px,32vw,220px)] shrink-0 justify-self-center lg:justify-self-end">
                      <Image
                        src="/images/vivaan-portrait.png"
                        alt="Portrait of Vivaan"
                        width={320}
                        height={320}
                        className="hero-photo"
                        priority
                      />
                    </div>
                    <div className="flex w-full min-w-0 max-w-[40rem] flex-col justify-center gap-[clamp(0.85rem,2.2vw,1.35rem)] justify-self-center lg:max-w-none lg:justify-self-stretch">
                      <h1
                        id="about-heading"
                        className="font-display m-0 text-center text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.9] uppercase lg:text-left"
                      >
                        About Me
                      </h1>
                      <p
                        className={`${sectionBodyClass} text-center lg:text-left lg:max-w-[68ch]`}
                      >
                        {ABOUT_LEAD}
                      </p>
                    </div>
                  </div>
                </div>
              </AboutTiltSlab>
            </section>
          </div>
          <AboutScrollHint />
        </div>

        <BrutalScrollReveal
          className="w-full border-4 border-[var(--color-fg)] bg-[var(--color-bg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.25rem)] shadow-[12px_12px_0_var(--color-fg)]"
          aria-labelledby="about-education-heading"
        >
          <h2
            id="about-education-heading"
            className={`brutal-reveal-block-title ${sectionTitleClass}`}
          >
            Education
          </h2>
          <div className="mt-6 border-t-4 border-[var(--color-fg)]">
            {EDUCATION.map((entry, index) => (
              <BrutalStaggerItem
                key={`${entry.institution}-${entry.period}-${index}`}
                as="article"
                index={index}
                className="border-b-4 border-[var(--color-fg)] py-5 last:border-b-0"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                  <h3 className="font-display m-0 text-[1.35rem] leading-tight uppercase sm:text-[1.5rem]">
                    {entry.institution}
                  </h3>
                  <p className="font-brutal-mono m-0 shrink-0 text-[0.78rem] uppercase tracking-[0.1em] text-[color-mix(in_srgb,var(--color-fg)_70%,transparent)] sm:text-[0.82rem]">
                    {entry.period}
                  </p>
                </div>
                {entry.qualification ? (
                  <p
                    className={`${sectionBodyClass} mt-2 text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]`}
                  >
                    {entry.qualification}
                  </p>
                ) : null}
                {entry.details ? (
                  <p className={`${sectionBodyClass} mt-3 max-w-[68ch]`}>{entry.details}</p>
                ) : null}
              </BrutalStaggerItem>
            ))}
          </div>
        </BrutalScrollReveal>

        <BrutalScrollReveal
          className="w-full border-4 border-[var(--color-fg)] bg-[var(--color-bg)] px-[clamp(1.25rem,3vw,2.5rem)] py-[clamp(1.25rem,3vw,2.25rem)] shadow-[12px_12px_0_var(--color-fg)]"
          aria-labelledby="about-stack-heading"
        >
          <h2 id="about-stack-heading" className={`brutal-reveal-block-title ${sectionTitleClass}`}>
            Stack
          </h2>
          <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 border-t-4 border-[var(--color-fg)] p-0 pt-6">
            {STACK.map((item, chipIndex) => (
              <BrutalStaggerItem key={item} as="li" index={chipIndex}>
                <span className="font-brutal-mono inline-block border-2 border-[var(--color-fg)] bg-[var(--color-bg)] px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.08em] sm:text-[0.75rem]">
                  {item}
                </span>
              </BrutalStaggerItem>
            ))}
          </ul>
        </BrutalScrollReveal>
      </div>
    </main>
  );
}
