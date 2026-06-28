"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
// Using this instead of href="#id" so we can offset for the fixed navbar height
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
}

const NAV_LINKS = [
  { label: "About",    id: "about"    },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Contact",  id: "contact"  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Slightly darken navbar once user scrolls past hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNav = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-white/10 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-slate-950/90" : "bg-slate-950/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-cyan-400 tracking-tight hover:text-cyan-300 transition-colors"
        >
          CJ.dev
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-300">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="hover:text-cyan-400 transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA — scrolls to Contact */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("contact")}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-300 hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="text-left text-slate-300 font-medium hover:text-cyan-400 transition-colors duration-200 py-1"
            >
              {label}
            </button>
          ))}

          {/* Hire Me in mobile menu too */}
          <button
            onClick={() => handleNav("contact")}
            className="mt-2 w-full rounded-full border border-cyan-400 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all duration-200"
          >
            Hire Me
          </button>

          {/* Download Resume in mobile menu */}
          <a
            href="/resume.pdf"
            download
            className="w-full rounded-full border border-slate-600 py-2.5 text-center text-sm font-semibold text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
}
