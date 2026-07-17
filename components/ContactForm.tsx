"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

type Status = "idle" | "ready" | "opened";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete the required fields before sending.");
      return;
    }

    setStatus("ready");
    const subject = encodeURIComponent(`Inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Organization: ${organization.trim() || "—"}`,
        "",
        message.trim(),
      ].join("\n"),
    );

    // Predictive feedback before the mail client handoff.
    window.setTimeout(() => setStatus("opened"), 120);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const fieldClass =
    "w-full min-h-[var(--touch)] rounded-xl border border-glass-border bg-white/45 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur-xl transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 dark:bg-white/[0.04]";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">
            Name <span className="text-accent">*</span>
          </span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-foreground">
            Email <span className="text-accent">*</span>
          </span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
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
        <span className="text-sm font-medium text-foreground">
          Message <span className="text-accent">*</span>
        </span>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          className={`${fieldClass} min-h-[140px] resize-y`}
          placeholder="How can we support your initiative?"
        />
      </label>

      {error ? (
        <p className="rounded-xl border border-primary/30 bg-primary-soft px-4 py-3 text-sm text-foreground" role="alert">
          {error}
        </p>
      ) : null}

      {status === "opened" ? (
        <p
          className="rounded-xl border border-earth/30 bg-earth-soft px-4 py-3 text-sm text-foreground"
          role="status"
        >
          Your email app should be opening with a prefilled message. If nothing appears, email us
          directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-accent underline-offset-2 hover:underline">
            {site.email}
          </a>
          .
        </p>
      ) : null}

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={status === "ready"}
      >
        {status === "ready" ? "Opening email…" : "Send via email"}
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Opens your email client with a prefilled message to {site.email}.
      </p>
    </form>
  );
}
