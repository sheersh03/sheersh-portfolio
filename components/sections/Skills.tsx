import { TECH_GROUPS } from "@/lib/techStack";
import { TechBadge } from "@/components/ui/TechBadge";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Skills() {
  return (
    <section
      id="abilities"
      className="relative mx-auto max-w-shell px-6 py-28 md:py-36"
    >
      <RevealOnScroll className="text-center">
        <span className="eyebrow">The Toolkit</span>
        <h2 className="titlecard mt-3 text-[clamp(2.2rem,8vw,6rem)] gold-text">
          The Arsenal
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-paper-dim">
          Every weapon in the kit, battle-tested across Audena, Cavebeat, and
          the origin builds.
        </p>
      </RevealOnScroll>

      <div className="mt-14 space-y-10">
        {TECH_GROUPS.map((group, gi) => (
          <RevealOnScroll key={group.label} delay={gi * 0.05} as="div">
            <div className="flex items-center gap-4">
              <span className="whitespace-nowrap font-serif text-xs uppercase tracking-[0.24em] text-gold">
                {group.label}
              </span>
              <span className="gold-rule flex-1" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
              {group.items.map((t) => (
                <TechBadge key={t.name} tech={t} />
              ))}
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
