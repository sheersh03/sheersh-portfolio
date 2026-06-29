import { PERSON, SOCIALS } from "@/lib/data";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative mx-auto max-w-shell px-6 pb-28 pt-24 text-center md:px-10 md:pb-36"
    >
      <div className="spectrum-rule mx-auto mb-20 w-40 rounded-full opacity-70" />

      <RevealOnScroll>
        <span className="eyebrow">Post-Credits Scene</span>
        <h2 className="titlecard mt-3 text-[clamp(2.4rem,9vw,6.5rem)] leading-[0.85]">
          <span className="gold-text">The Saga</span>
          <span className="block text-paper">Continues</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-paper-dim">
          Building something that needs a deep engineer and a system thinker?
          Let&apos;s talk.
        </p>
      </RevealOnScroll>

      <RevealOnScroll
        delay={0.1}
        className="mx-auto mt-12 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
      >
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex flex-1 items-center justify-between gap-4 rounded-xl border border-line bg-panel/50 px-5 py-4 text-left transition-colors hover:border-gold/50"
          >
            <span>
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-paper-mute">
                {s.label}
              </span>
              <span className="mt-0.5 block text-sm text-paper transition-colors group-hover:text-gold">
                {s.handle}
              </span>
            </span>
            <span
              aria-hidden
              className="text-gold transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ))}
      </RevealOnScroll>

      <p className="mt-20 font-serif text-[0.62rem] uppercase tracking-[0.34em] text-paper-mute">
        {PERSON.name} &middot; Built, not generated
      </p>
    </footer>
  );
}
