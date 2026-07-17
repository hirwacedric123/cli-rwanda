import type { Metadata } from "next";
import Link from "next/link";
import { BrandRail } from "@/components/BrandRail";
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
      <Section className="hero-atmosphere relative overflow-hidden !pb-12 !pt-12 md:!pb-16 md:!pt-20">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <BrandRail className="mb-4" />
          <p className="eyebrow">Services</p>
          <h1 className="display-title mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.25rem)] text-primary">
            Tailored support for NGOs, CBOs, and purpose-driven enterprises
          </h1>
          <p className="prose-muted mt-6 max-w-2xl text-lg">
            From resource mobilization to capacity building, CLI-Rwanda equips local actors with
            strategic guidance, credible systems, and hands-on technical assistance.
          </p>
        </FadeIn>
      </Section>

      <Section className="brand-band-blue relative overflow-hidden border-y border-glass-border !pt-10">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-5">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={(index % 4) * 0.05} className="h-full">
              <ServiceCard {...service} href="/contact" index={index} ctaLabel="Get in touch" />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section>
        <FadeIn>
          <div className="glass-panel brand-panel-green flex flex-col items-start justify-between gap-6 rounded-[1.75rem] px-6 py-8 sm:gap-8 sm:rounded-[2rem] sm:px-12 sm:py-10 md:flex-row md:items-center">
            <div className="max-w-xl">
              <BrandRail className="mb-4" />
              <h2 className="display-title text-[clamp(1.5rem,3vw,1.875rem)] text-foreground">
                Let&apos;s design the right support for your organization
              </h2>
              <p className="prose-muted mt-3">
                Tell us about your initiative — we&apos;ll help bridge ideas with opportunities.
              </p>
            </div>
            <Link href="/contact" className="btn-primary shrink-0">
              Start a conversation
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
