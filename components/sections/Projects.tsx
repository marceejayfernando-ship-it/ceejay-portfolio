"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import projects from "@/data/projects";
import SectionWrapper from "@/components/SectionWrapper";

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

import { useState } from "react";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SectionWrapper id="projects" glowPosition="top-right" className="py-24">

      {/* Heading */}
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Projects
          </p>
          <h2 className="text-5xl font-black text-white">
            AI Automation Solutions That Save Businesses Time & Money
          </h2>
          <p className="mx-auto mt-6 mb-16 max-w-2xl text-slate-400">
            Explore AI automation solutions I've built using n8n, Make.com,
            APIs, OpenAI, Gemini, and modern no-code tools to help businesses
            automate repetitive work.
          </p>
        </motion.div>
      </div>

      {/* Swiper — full width outside max-w container */}
      <div className="w-full pb-16">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop={false}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 10,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
            scale: 0.9,
          }}
          pagination={{ clickable: true }}
          navigation
          onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay, Keyboard]}
          className="mySwiper py-10"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.title} style={{ width: "380px" }}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className={`
                  group relative overflow-hidden rounded-3xl border
                  backdrop-blur-xl transition-all duration-500
                  ${
                    index === activeIndex
                      ? "border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.45)]"
                      : "border-slate-700"
                  }
                `}
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="380px"
                    className="z-0 object-cover"
                  />
                  {project.featured && (
                    <span className="absolute top-4 left-4 z-20 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="bg-slate-900 p-5">
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-cyan-400"
                    >
                      Case study
                    </a>
                    <a
                      href={project.workflow}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-cyan-400/40 bg-slate-800 px-4 py-2 text-sm text-white transition hover:border-cyan-400"
                    >
                      Workflow
                    </a>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </SectionWrapper>
  );
}
