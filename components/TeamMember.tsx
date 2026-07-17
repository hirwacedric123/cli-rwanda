import Image from "next/image";

type TeamMemberProps = {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: readonly string[];
  index?: number;
};

export function TeamMember({ name, role, image, imageAlt, bio, index = 0 }: TeamMemberProps) {
  return (
    <article className="glass-panel interactive-lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] focus-within:border-accent/40">
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden bg-primary-soft sm:aspect-[5/6]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-[center_18%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <span className="font-display text-xs font-semibold tracking-[0.16em] text-white/75">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight drop-shadow-sm">
            {name}
          </h3>
          <p className="mt-1.5 text-sm font-medium leading-snug text-white/90">{role}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 p-6 text-sm leading-relaxed text-muted sm:p-7">
        {bio.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
