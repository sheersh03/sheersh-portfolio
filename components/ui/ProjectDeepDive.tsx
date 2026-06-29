import type { BreakdownSection } from "@/lib/data";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

/**
 * The tentpole deep-dive: four labelled panels (journey / frontend /
 * backend + AI / infra) shown under the headline project card.
 */
export function ProjectDeepDive({
  title,
  sections,
}: {
  title: string;
  sections: BreakdownSection[];
}) {
  return (
    <div className="mt-12">
      <RevealOnScroll className="mb-7 flex items-center gap-4">
        <span className="eyebrow whitespace-nowrap">Inside {title}</span>
        <span className="gold-rule flex-1" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {sections.map((s, i) => (
          <RevealOnScroll key={s.label} delay={i * 0.06} as="div">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 p-6 backdrop-blur-sm transition-colors hover:border-gold/40 md:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-lg leading-none text-gold/60">
                  0{i + 1}
                </span>
                <h4 className="titlecard text-xl leading-tight md:text-2xl">
                  {s.label}
                </h4>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                {s.summary}
              </p>

              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-2.5 text-sm leading-relaxed text-paper-dim"
                  >
                    <span aria-hidden className="mt-1.5 text-gold">
                      ▹
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
