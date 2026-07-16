"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization || "—"}`,
        "",
        message,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const fieldClass =
    "w-full rounded-xl border border-glass-border bg-white/45 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-xl transition-colors placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:bg-white/[0.04]";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@organization.org"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Organization</span>
        <input
          name="organization"
          autoComplete="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className={fieldClass}
          placeholder="NGO, CBO, or enterprise"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-foreground">Message</span>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldClass} resize-y min-h-[140px]`}
          placeholder="How can we support your initiative?"
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-300 hover:bg-accent-hover hover:shadow-md sm:w-auto"
      >
        Send via email
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Opens your email client with a prefilled message to {site.email}.
      </p>
    </form>
  );
}
