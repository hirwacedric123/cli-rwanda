import Image from "next/image";

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: readonly string[];
};

export function TeamMember({ name, role, image, imageAlt, bio }: TeamMemberProps) {
  return (
    <article className="glass-panel overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35">
      <div className="grid gap-0 md:grid-cols-[minmax(12rem,16rem)_1fr]">
        <div className="relative aspect-[4/5] bg-primary-soft md:aspect-auto md:min-h-[20rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 16rem"
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{role}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {name}
          </h3>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
