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

      {/* ── Who We Are ── */}
      <Section className="brand-band-green relative overflow-hidden border-y border-border">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <FadeIn>
            <BrandRail className="mb-5" />
            <p className="eyebrow eyebrow-earth">Who we are</p>
            <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              Counsel that strengthens local ownership
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="prose-muted text-base md:text-lg">{about.intro}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-earth transition-all duration-200 hover:gap-3 hover:opacity-80"
            >
              About CLI-Rwanda
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>
        </div>
      </Section>

      {/* ── Services ── */}
      <Section className="brand-band-blue relative overflow-hidden border-b border-border">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <FadeIn>
          <div className="relative mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <BrandRail className="mb-5" />
              <p className="eyebrow">Services</p>
              <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
                Support built for local changemakers
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex min-h-10 items-center text-sm font-semibold text-accent transition-all duration-200 hover:opacity-75"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>
        <div className="relative grid gap-3.5 sm:grid-cols-2 sm:gap-4">
          {homeHighlights.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.06} className="relative h-full">
              <ServiceCard {...service} index={index} />
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Vision ── */}
      <Section>
        <FadeIn>
          <div
            className="brand-panel-green relative overflow-hidden rounded-[1.875rem] px-6 py-14 text-center sm:rounded-[2.125rem] sm:px-14 sm:py-16"
            style={{
              backdropFilter: "blur(24px) saturate(145%)",
              WebkitBackdropFilter: "blur(24px) saturate(145%)",
            }}
          >
            <div className="texture-noise pointer-events-none absolute inset-0 opacity-35" aria-hidden />
            {/* Top prismatic shine */}
            <div
              className="pointer-events-none absolute inset-x-16 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.80), rgba(201,168,92,0.42), rgba(255,255,255,0.80), transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(28,108,54,0.28), transparent)",
              }}
              aria-hidden
            />
            <BrandRail className="relative mx-auto mb-5" />
            <p className="eyebrow eyebrow-earth relative">Vision</p>
            <p className="display-title relative mx-auto mt-5 max-w-3xl text-[clamp(1.4rem,3vw,1.95rem)] text-foreground">
              {about.vision}
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* ── Testimonials ── */}
      <Section
        id="testimonials"
        className="brand-band-blue relative overflow-hidden border-y border-border"
      >
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <FadeIn>
          <div className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <BrandRail className="mx-auto mb-5" />
            <p className="eyebrow">Testimonials</p>
            <h2 className="display-title mt-3 text-[clamp(1.75rem,3.5vw,2.35rem)] text-foreground">
              Trusted by local changemakers
            </h2>
            <p className="prose-muted mt-4 text-base">
              Reflections from organizations and leaders working to create lasting community impact.
            </p>
          </div>
        </FadeIn>

        <div className="relative grid gap-3.5 md:grid-cols-3 md:gap-4">
          {testimonials.map((testimonial, index) => {
            const quoteColor =
              index % 3 === 0
                ? "text-earth"
                : index % 3 === 1
                  ? "text-accent"
                  : "text-primary";
            return (
              <FadeIn key={`${testimonial.role}-${index}`} delay={index * 0.07} className="h-full">
                <figure className="glass-panel flex h-full flex-col rounded-[1.75rem] p-6 sm:p-8">
                  {/* Decorative quotation mark */}
                  <span
                    className={`font-display text-[3.5rem] leading-none ${quoteColor}`}
                    style={{ opacity: 0.35 }}
                    aria-hidden
                  >
                    "
                  </span>
                  <blockquote className="-mt-2 flex-1 text-[0.9375rem] leading-relaxed text-foreground">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption
                    className="mt-8 pt-5"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <p className="font-semibold tracking-tight text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{testimonial.role}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="!pt-0">
        <FadeIn>
          <div
            className="brand-panel-blue relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-[1.875rem] px-6 py-10 sm:gap-8 sm:rounded-[2.125rem] sm:px-12 sm:py-12 md:flex-row md:items-center"
            style={{
              backdropFilter: "blur(24px) saturate(145%)",
              WebkitBackdropFilter: "blur(24px) saturate(145%)",
            }}
          >
            <div className="texture-noise pointer-events-none absolute inset-0 opacity-35" aria-hidden />
            {/* Top prismatic shine */}
            <div
              className="pointer-events-none absolute inset-x-16 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), rgba(7,105,162,0.35), rgba(255,255,255,0.75), transparent)",
              }}
              aria-hidden
            />
            <div className="relative max-w-xl">
              <BrandRail className="mb-5" />
              <h2 className="display-title text-[clamp(1.5rem,3vw,1.95rem)] text-foreground">
                Ready to strengthen your initiative?
              </h2>
              <p className="prose-muted mt-3">
                Partner with {site.name} for strategic guidance, credible systems, and the right
                resources.
              </p>
            </div>
            <Link href="/contact" className="btn-primary relative shrink-0">
              Get in touch
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
