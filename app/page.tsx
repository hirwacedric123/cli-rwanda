import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { about, homeHighlights, site, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Who we are</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Counsel that strengthens local ownership
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-base leading-relaxed text-muted md:text-lg">{about.intro}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
            >
              About CLI-Rwanda
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>
        </div>
      </Section>

      <Section className="relative overflow-hidden border-y border-glass-border bg-gradient-to-br from-primary-soft/70 via-background to-accent-soft/70">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <FadeIn>
          <div className="relative mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Services</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Support built for local changemakers
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold text-accent transition-opacity hover:opacity-80"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>
        <div className="relative grid gap-5 sm:grid-cols-2">
          {homeHighlights.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.06}>
              <ServiceCard {...service} index={index} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] px-8 py-14 text-center sm:px-14">
            <div className="texture-noise pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Vision
            </p>
            <p className="relative mx-auto mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              {about.vision}
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section
        id="testimonials"
        className="relative scroll-mt-36 overflow-hidden border-y border-glass-border bg-gradient-to-br from-accent-soft/60 via-background to-earth-soft/60"
      >
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <FadeIn>
          <div className="relative mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Testimonials
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Trusted by local changemakers
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Reflections from organizations and leaders working to create lasting community impact.
            </p>
          </div>
        </FadeIn>

        <div className="relative grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={`${testimonial.role}-${index}`} delay={index * 0.07} className="h-full">
              <figure className="glass-panel flex h-full flex-col rounded-[1.75rem] p-7 sm:p-8">
                <span className="font-display text-5xl leading-none text-accent/40" aria-hidden>
                  “
                </span>
                <blockquote className="-mt-1 flex-1 text-base leading-relaxed text-foreground">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-5">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{testimonial.role}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="!pt-0 !pb-28">
        <FadeIn>
          <div className="glass-panel flex flex-col items-start justify-between gap-8 rounded-[2rem] px-8 py-10 sm:flex-row sm:items-center sm:px-12">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Ready to strengthen your initiative?
              </h2>
              <p className="mt-3 text-muted">
                Partner with {site.name} for strategic guidance, credible systems, and the right
                resources.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-accent-hover"
            >
              Get in touch
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
