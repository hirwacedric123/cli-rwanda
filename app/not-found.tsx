import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="hero-atmosphere relative overflow-hidden flex min-h-[60svh] items-center">
      <div className="texture-noise pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-[clamp(2.1rem,5vw,3.25rem)] text-primary">
          This page could not be found
        </h1>
        <p className="prose-muted mt-5 text-lg">
          The link may be outdated, or the page may have moved. Head back home or reach out — we are
          happy to help.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </Section>
  );
}
