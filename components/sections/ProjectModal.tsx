"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, ArrowRight } from "lucide-react";

function GithubGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  const links = project.links ?? {};
  const hasLinks = Boolean(links.demo || links.repo || links.workflow);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400 transition-all hover:border-slate-500 hover:text-white"
          >
            <X size={16} />
          </button>

          <div
            className={`relative h-52 w-full overflow-hidden rounded-t-2xl border-b border-slate-800 ${
              project.imageFit === "contain" ? "bg-slate-200" : ""
            }`}
          >
            {project.video ? (
              <video
                key={project.video}
                controls
                preload="none"
                poster={project.image}
                className="h-full w-full object-cover"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <>
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className={project.imageFit === "contain" ? "object-contain p-2" : "object-cover"}
                />
                <div
                  className={`absolute inset-0 ${
                    project.imageFit === "contain"
                      ? "bg-gradient-to-t from-slate-900/80 to-transparent"
                      : "bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"
                  }`}
                />
              </>
            )}
            <div className="absolute bottom-3 left-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-cyan-300">
                {project.type}
              </span>
              <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-slate-300">
                {project.status}
              </span>
            </div>
          </div>

          <div className="px-6 py-6">
            <h3
              id="project-modal-title"
              className="text-xl font-bold text-white"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>

            <div className="mt-5 space-y-4">
              <Block label="Problem" text={project.problem} />
              <Block label="Solution" text={project.solution} />
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Key features
              </p>
              <ul className="mt-2 space-y-1.5">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-sm leading-6 text-slate-300"
                  >
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Tech stack
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {hasLinks ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {links.demo && (
                  <a
                    href={links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-400"
                  >
                    <ExternalLink size={15} /> Live demo
                  </a>
                )}
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400"
                  >
                    <GithubGlyph /> Code
                  </a>
                )}
                {links.workflow && (
                  <a
                    href={links.workflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400"
                  >
                    <ExternalLink size={15} /> Workflow
                  </a>
                )}
              </div>
            ) : (
              <p className="mt-6 rounded-lg border border-slate-800 bg-slate-800/40 px-4 py-3 text-xs text-slate-400">
                Full write-up, source, and a walkthrough available on request.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}
