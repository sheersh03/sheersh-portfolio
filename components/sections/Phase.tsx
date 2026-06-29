import type { Phase as PhaseData } from "@/lib/data";
import { PhasePlate } from "@/components/ui/PhasePlate";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectDeepDive } from "@/components/ui/ProjectDeepDive";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Phase({ phase }: { phase: PhaseData }) {
  const headline = phase.projects.filter((p) => p.kind !== "short");
  const shorts = phase.projects.filter((p) => p.kind === "short");
  const hasTentpole = headline.some((p) => p.kind === "tentpole");

  return (
    <section id={phase.id} className="relative mx-auto max-w-shell px-6 py-24 md:py-32">
      <PhasePlate numeral={phase.numeral} title={phase.title} era={phase.era} />

      <RevealOnScroll className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-base leading-relaxed text-paper-dim md:text-lg">
          {phase.logline}
        </p>
      </RevealOnScroll>

      <div
        className={
          hasTentpole
            ? "mt-14 grid grid-cols-1 gap-6"
            : "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        }
      >
        {headline.map((p, i) => (
          <RevealOnScroll key={p.id} delay={i * 0.06} as="div">
            <ProjectCard project={p} />
          </RevealOnScroll>
        ))}
      </div>

      {headline.map((p) =>
        p.breakdown && p.breakdown.length > 0 ? (
          <ProjectDeepDive key={`${p.id}-deep`} title={p.title} sections={p.breakdown} />
        ) : null
      )}

      {shorts.length > 0 && (
        <div className="mt-16">
          <RevealOnScroll className="mb-7 flex items-center gap-4">
            <span className="eyebrow whitespace-nowrap">The Slate</span>
            <span className="gold-rule flex-1" />
          </RevealOnScroll>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shorts.map((p, i) => (
              <RevealOnScroll key={p.id} delay={i * 0.05} as="div">
                <ProjectCard project={p} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
