import Link from "next/link";
import { BrandRail } from "@/components/BrandRail";
import { FadeIn } from "@/components/FadeIn";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { about, homeHighlights, site, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section className="brand-band-green relative overflow-hidden border-y border-glass-border">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <FadeIn>
            <BrandRail className="mb-4" />
            <p className="eyebrow eyebrow-earth">Who we are</p>
            <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              Counsel that strengthens local ownership
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="prose-muted text-base md:text-lg">{about.intro}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-earth transition-all hover:gap-3"
            >
              About CLI-Rwanda
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>
        </div>
      </Section>

      <Section className="brand-band-blue relative overflow-hidden border-b border-glass-border">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <FadeIn>
          <div className="relative mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BrandRail className="mb-4" />
              <p className="eyebrow">Services</p>
              <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
                Support built for local changemakers
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-10 items-center text-sm font-semibold text-accent transition-opacity hover:opacity-80"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>
        <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-5">
          {homeHighlights.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.06} className="h-full">
              <ServiceCard {...service} index={index} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="glass-panel-strong brand-panel-green relative overflow-hidden rounded-[1.75rem] px-6 py-12 text-center sm:rounded-[2rem] sm:px-14 sm:py-14">
            <div className="texture-noise pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <BrandRail className="relative mx-auto mb-5" />
            <p className="eyebrow eyebrow-earth relative">Vision</p>
            <p className="display-title relative mx-auto mt-5 max-w-3xl text-[clamp(1.35rem,3vw,1.875rem)] text-foreground">
              {about.vision}
            </p>
          </div>
        </FadeIn>
      </Section>

      <Section
        id="testimonials"
        className="brand-band-blue relative overflow-hidden border-y border-glass-border"
      >
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <FadeIn>
          <div className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <BrandRail className="mx-auto mb-4" />
            <p className="eyebrow">Testimonials</p>
            <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              Trusted by local changemakers
            </h2>
            <p className="prose-muted mt-4">
              Reflections from organizations and leaders working to create lasting community impact.
            </p>
          </div>
        </FadeIn>

        <div className="relative grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((testimonial, index) => {
            const quoteTone =
              index % 3 === 0 ? "text-earth/45" : index % 3 === 1 ? "text-accent/45" : "text-primary/45";
            return (
              <FadeIn key={`${testimonial.role}-${index}`} delay={index * 0.07} className="h-full">
                <figure className="glass-panel flex h-full flex-col rounded-[1.75rem] p-6 sm:p-8">
                  <span className={`font-display text-5xl leading-none ${quoteTone}`} aria-hidden>
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
            );
          })}
        </div>
      </Section>

      <Section className="!pt-0">
        <FadeIn>
          <div className="glass-panel brand-panel-blue flex flex-col items-start justify-between gap-6 rounded-[1.75rem] px-6 py-8 sm:gap-8 sm:rounded-[2rem] sm:px-12 sm:py-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <BrandRail className="mb-4" />
              <h2 className="display-title text-[clamp(1.5rem,3vw,1.875rem)] text-foreground">
                Ready to strengthen your initiative?
              </h2>
              <p className="prose-muted mt-3">
                Partner with {site.name} for strategic guidance, credible systems, and the right
                resources.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Get in touch
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
