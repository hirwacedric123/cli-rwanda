import type { Metadata } from "next";
import { BrandRail } from "@/components/BrandRail";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.email}`,
};

export default function ContactPage() {
  return (
    <>
      <Section className="hero-atmosphere relative overflow-hidden !pb-10 !pt-12 md:!pb-12 md:!pt-20">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <BrandRail className="mb-4" />
          <p className="eyebrow">Contact</p>
          <h1 className="display-title mt-4 max-w-3xl text-[clamp(2.1rem,5vw,3.25rem)] text-primary">
            Let&apos;s strengthen your next initiative
          </h1>
          <p className="prose-muted mt-6 max-w-2xl text-lg">
            Trusted partner to local changemakers — bridging ideas with opportunities across Rwanda
            and beyond.
          </p>
        </FadeIn>
      </Section>

      <Section className="brand-band-green relative overflow-hidden border-y border-glass-border !pt-10">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <div className="space-y-8">
              <div className="brand-chip-blue rounded-2xl px-5 py-4 shadow-soft">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
                  Email
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-flex min-h-11 items-center text-lg font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>

              <div className="brand-chip-green rounded-2xl px-5 py-4 shadow-soft">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">
                  Phone
                </h2>
                <ul className="mt-2 space-y-1">
                  {site.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/-/g, "")}`}
                        className="inline-flex min-h-11 items-center text-lg font-semibold text-foreground transition-colors hover:text-earth"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="prose-muted max-w-sm text-sm">
                Whether you are a start-up NGO, an established CBO, or a purpose-driven enterprise,
                we are ready to provide tailored counsel.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="glass-panel-strong brand-panel-blue rounded-[1.75rem] p-5 sm:rounded-[2rem] sm:p-8">
              <BrandRail className="mb-4" />
              <h2 className="display-title text-2xl text-foreground">Send a message</h2>
              <p className="prose-muted mt-2 mb-8 text-sm">
                Share a few details and we&apos;ll continue the conversation by email.
              </p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
