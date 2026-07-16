import type { Metadata } from "next";
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
      <Section className="hero-atmosphere relative overflow-hidden !pb-12 !pt-16 md:!pt-24">
        <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Contact</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Let&apos;s strengthen your next initiative
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Trusted partner to local changemakers — bridging ideas with opportunities across Rwanda
            and beyond.
          </p>
        </FadeIn>
      </Section>

      <Section className="!pt-4">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <div className="space-y-8">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Email
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block text-lg font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Phone
                </h2>
                <ul className="mt-2 space-y-2">
                  {site.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/-/g, "")}`}
                        className="text-lg font-semibold text-foreground transition-colors hover:text-accent"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Whether you are a start-up NGO, an established CBO, or a purpose-driven enterprise,
                we are ready to provide tailored counsel.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                Send a message
              </h2>
              <p className="mt-2 mb-8 text-sm text-muted">
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
