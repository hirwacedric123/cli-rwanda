import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Fundraising, grant writing, branding, capacity building, and more from CLI-Rwanda.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="hero-atmosphere relative overflow-hidden !pb-16 !pt-16 md:!pt-24">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Services</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Tailored support for NGOs, CBOs, and purpose-driven enterprises
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            From resource mobilization to capacity building, CLI-Rwanda equips local actors with
            strategic guidance, credible systems, and hands-on technical assistance.
          </p>
        </FadeIn>
      </Section>

      <Section className="!pt-4">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={(index % 4) * 0.05}>
              <ServiceCard {...service} href="/contact" index={index} ctaLabel="Get in touch" />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="glass-panel flex flex-col items-start justify-between gap-8 rounded-[2rem] px-8 py-10 sm:flex-row sm:items-center sm:px-12">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Let&apos;s design the right support for your organization
              </h2>
              <p className="mt-3 text-muted">
                Tell us about your initiative — we&apos;ll help bridge ideas with opportunities.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-accent-hover"
            >
              Start a conversation
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
