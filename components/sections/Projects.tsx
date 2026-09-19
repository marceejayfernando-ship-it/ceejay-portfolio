"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Star, ArrowUpRight, Play } from "lucide-react";

import projects, {
  activeCategories,
  filterProjects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import SectionWrapper from "@/components/SectionWrapper";
import ProjectModal from "@/components/sections/ProjectModal";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Filter = "All" | ProjectCategory;

const FILTERS: Filter[] = ["All", ...activeCategories];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible = useMemo(() => filterProjects(filter), [filter]);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setActiveIndex(0);
  };

  const onKeyNav = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + dir + FILTERS.length) % FILTERS.length;
    btnRefs.current[nextIndex]?.focus();
    changeFilter(FILTERS[nextIndex]);
  };

  return (
    <SectionWrapper id="projects" glowPosition="top-right" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Projects
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Automation &amp; QA projects I&apos;ve built
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-400 md:text-base">
            Self-built and hands-on training projects — Playwright and Tricentis
            Tosca test automation, plus AI and business automation with n8n,
            GoHighLevel, Make, and the OpenAI and Gemini APIs. These are
            portfolio and training builds, not client work. Tap a card for the
            full breakdown.
          </p>
        </motion.div>
      </div>

      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 px-6"
      >
        {FILTERS.map((cat, i) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              aria-pressed={active}
              tabIndex={active ? 0 : -1}
              onClick={() => changeFilter(cat)}
              onKeyDown={(e) => onKeyNav(e, i)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                active
                  ? "border-cyan-400 bg-cyan-500/15 text-cyan-300"
                  : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-slate-500" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      <motion.div
        key={filter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="mt-6 w-full pb-8"
      >
        <Swiper
          key={filter}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop={false}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 8,
            stretch: 60,
            depth: 180,
            modifier: 1,
            slideShadows: false,
            scale: 0.92,
          }}
          pagination={{ clickable: true }}
          navigation
          onSlideChange={(s: SwiperType) => setActiveIndex(s.realIndex)}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Keyboard]}
          className="!px-4 !py-10"
        >
          {visible.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <SwiperSlide key={project.slug} style={{ width: "360px" }}>
                <motion.button
                  type="button"
                  onClick={() => setSelected(project)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  aria-label={`View details for ${project.title}`}
                  className={`group block w-full overflow-hidden rounded-3xl border text-left backdrop-blur-xl transition-all duration-500 ${
                    isActive
                      ? "border-cyan-400/70 shadow-[0_0_45px_rgba(6,182,212,0.30)]"
                      : "border-slate-700"
                  } ${project.featured ? "ring-1 ring-cyan-500/20" : ""}`}
                >
                  <div
                    className={`relative h-40 overflow-hidden ${
                      project.imageFit === "contain" ? "bg-slate-200" : ""
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="360px"
                      className={
                        project.imageFit === "contain"
                          ? "object-contain p-2"
                          : "object-cover transition-transform duration-500 group-hover:scale-105"
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                    {project.video && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                          <Play size={16} className="ml-0.5 fill-white" />
                        </span>
                      </div>
                    )}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500 px-2.5 py-1 text-[11px] font-semibold text-white">
                          <Star size={11} className="fill-white" /> Featured
                        </span>
                      )}
                      <span className="rounded-full bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-5">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                      View details
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </motion.button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}
