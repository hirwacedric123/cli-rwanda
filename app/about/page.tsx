import type { Metadata } from "next";
import Link from "next/link";
import { BrandRail } from "@/components/BrandRail";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { TeamMember } from "@/components/TeamMember";
import { about, team, values } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Consilium for Local Initiatives (CLI-Rwanda) — vision, mission, values, and team.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="hero-atmosphere relative overflow-hidden !pb-12 !pt-12 md:!pb-16 md:!pt-20">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <BrandRail className="mb-4" />
          <p className="eyebrow">About</p>
          <h1 className="display-title mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.25rem)] text-primary">
            Consilium for Local Initiatives
          </h1>
          <p className="prose-muted mt-6 max-w-2xl text-lg">{about.intro}</p>
        </FadeIn>
      </Section>

      <Section narrow className="!pt-4 !pb-10 sm:!pb-12">
        <FadeIn>
          <p className="prose-muted text-base text-foreground md:text-lg">{about.etymology}</p>
        </FadeIn>
      </Section>

      <Section className="border-y border-border bg-surface">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn>
            <article className="glass-panel brand-panel-blue h-full rounded-[1.75rem] p-6 sm:p-8">
              <BrandRail className="mb-4" />
              <p className="eyebrow">Vision</p>
              <h2 className="display-title mt-3 text-2xl text-foreground">What we envision</h2>
              <p className="prose-muted mt-5">{about.vision}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.08}>
            <article className="glass-panel brand-panel-green h-full rounded-[1.75rem] p-6 sm:p-8">
              <BrandRail className="mb-4" />
              <p className="eyebrow eyebrow-earth">Mission</p>
              <h2 className="display-title mt-3 text-2xl text-foreground">How we serve</h2>
              <div className="prose-muted mt-5 space-y-4">
                {about.mission.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </article>
          </FadeIn>
        </div>
      </Section>

      <Section className="brand-band-green relative overflow-hidden border-b border-glass-border">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <FadeIn>
          <BrandRail className="mb-4" />
          <p className="eyebrow eyebrow-earth">Our values</p>
          <h2 className="display-title mt-3 max-w-2xl text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
            What the mark represents
          </h2>
          <p className="prose-muted mt-4 max-w-2xl">
            The CLI-Rwanda emblem reflects collaboration, African grounding, rising opportunity, and
            sustainable growth — the same principles that guide our advisory work.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {values.map((value, index) => {
            const panel =
              index % 2 === 0 ? "brand-panel-green" : "brand-panel-blue";
            const numberTone = index % 2 === 0 ? "text-earth" : "text-accent";
            return (
              <FadeIn key={value.title} delay={index * 0.05}>
                <div className={`glass-panel interactive-lift ${panel} h-full rounded-[1.5rem] p-6`}>
                  <span className={`font-display text-sm font-semibold ${numberTone}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="prose-muted mt-2 text-sm">{value.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      <Section
        id="team"
        className="brand-band-blue relative overflow-hidden border-b border-glass-border"
      >
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <FadeIn>
          <div className="relative mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <BrandRail className="mx-auto mb-4" />
            <p className="eyebrow">Team</p>
            <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              The people behind the counsel
            </h2>
            <p className="prose-muted mt-4">
              Practitioners in partnerships, communications, and nonprofit leadership — working
              alongside local changemakers across Rwanda and beyond.
            </p>
          </div>
        </FadeIn>
        <div className="relative grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {team.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.07} className="h-full">
              <TeamMember {...member} index={index} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section narrow className="!pt-0">
        <FadeIn>
          <blockquote className="border-l-2 border-earth pl-5 font-display text-xl font-medium leading-snug text-foreground sm:pl-6 md:text-2xl">
            {about.closing}
          </blockquote>
          <Link href="/contact" className="btn-primary mt-10">
            Partner with us
          </Link>
        </FadeIn>
      </Section>
    </>
  );
}
