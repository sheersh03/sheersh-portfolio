"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/cn";

function StatusPill({ status }: { status: Project["status"] }) {
  const live = status === "Live" || status === "In Production" || status === "Scaling";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em]",
        live
          ? "border-gold/40 text-gold"
          : "border-line-strong text-paper-mute"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "bg-gold" : "bg-paper-mute"
        )}
      />
      {status}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const big = project.kind === "tentpole";

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 backdrop-blur-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500",
        "before:shadow-[inset_0_0_0_1px_var(--gold)] hover:before:opacity-60",
        big ? "p-8 md:p-10" : "p-6"
      )}
    >
      {/* top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div>
          {project.role && (
            <span className="eyebrow !text-[0.6rem] !tracking-[0.24em]">
              {project.role}
            </span>
          )}
          <h3
            className={cn(
              "titlecard mt-2 leading-none",
              big
                ? "text-[clamp(2.4rem,6vw,4.5rem)]"
                : "text-3xl md:text-4xl"
            )}
          >
            {project.title}
          </h3>
        </div>
        <StatusPill status={project.status} />
      </div>

      <p
        className={cn(
          "mt-3 font-serif italic text-gold-bright/90",
          big ? "text-lg" : "text-sm"
        )}
      >
        {project.tagline}
      </p>

      <p
        className={cn(
          "mt-4 text-paper-dim leading-relaxed",
          big ? "text-base md:text-lg max-w-2xl" : "text-sm"
        )}
      >
        {project.blurb}
      </p>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-md border border-line px-2.5 py-1 text-[0.7rem] font-medium text-paper-dim"
            >
              {t}
            </li>
          ))}
        </ul>

        {(project.link || project.repo) && (
          <div className="mt-5 flex flex-wrap items-center gap-5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-bright"
              >
                Visit
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-paper-dim transition-colors hover:text-paper"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Code
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
