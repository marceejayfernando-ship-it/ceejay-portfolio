"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { profile } from "@/data/profile";

// Smooth scroll with offset handled via CSS scroll-mt on each section.
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-slate-950/90"
          : "border-transparent bg-slate-950/60"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-cyan-300"
        >
          {profile.firstName}
          <span className="text-cyan-400">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              aria-current={activeId === id ? "true" : undefined}
              className={`cursor-pointer transition-colors duration-200 ${
                activeId === id
                  ? "text-cyan-400"
                  : "text-slate-300 hover:text-cyan-400"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={profile.resumePath}
            download
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-cyan-400 hover:text-cyan-300"
          >
            Download CV
          </a>
          <button
            onClick={() => handleNav("contact")}
            className="rounded-full border border-cyan-400 px-5 py-2 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-500 hover:text-white"
          >
            Hire Me
          </button>
        </div>

        <button
          className="text-slate-300 transition-colors hover:text-cyan-400 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-white/10 bg-slate-950/95 px-6 py-4 backdrop-blur-md md:hidden">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`py-1 text-left font-medium transition-colors duration-200 ${
                activeId === id ? "text-cyan-400" : "text-slate-300 hover:text-cyan-400"
              }`}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => handleNav("contact")}
            className="mt-2 w-full rounded-full border border-cyan-400 py-2.5 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:bg-cyan-500 hover:text-white"
          >
            Hire Me
          </button>

          <a
            href={profile.resumePath}
            download
            className="w-full rounded-full border border-slate-600 py-2.5 text-center text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-cyan-400 hover:text-cyan-400"
            onClick={() => setMenuOpen(false)}
          >
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}
