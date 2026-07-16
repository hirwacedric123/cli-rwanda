import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { about, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Consilium for Local Initiatives (CLI-Rwanda) — vision, mission, and values.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="hero-atmosphere relative overflow-hidden !pb-16 !pt-16 md:!pt-24">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">About</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Consilium for Local Initiatives
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{about.intro}</p>
        </FadeIn>
      </Section>

      <Section narrow className="!pt-8">
        <FadeIn>
          <p className="text-base leading-relaxed text-foreground md:text-lg">{about.etymology}</p>
        </FadeIn>
      </Section>

      <Section className="bg-surface border-y border-border">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <article className="glass-panel h-full rounded-[1.75rem] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Vision</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                What we envision
              </h2>
              <p className="mt-5 leading-relaxed text-muted">{about.vision}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.08}>
            <article className="glass-panel h-full rounded-[1.75rem] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-earth">Mission</p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                How we serve
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                {about.mission.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </article>
          </FadeIn>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our values</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            What the mark represents
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            The CLI-Rwanda emblem reflects collaboration, African grounding, rising opportunity, and
            sustainable growth — the same principles that guide our advisory work.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.05}>
              <div className="glass-panel rounded-[1.5rem] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35">
                <span className="font-display text-sm font-semibold text-earth">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section narrow className="!pt-0">
        <FadeIn>
          <blockquote className="border-l-2 border-accent pl-6 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
            {about.closing}
          </blockquote>
          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-hover"
          >
            Partner with us
          </Link>
        </FadeIn>
      </Section>
    </>
  );
}
