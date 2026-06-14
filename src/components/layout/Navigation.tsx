"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = [
  { label: "Projects", href: "#work" },
  { label: "Skills",   href: "#skills" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen]   = useState(false);
  const { theme, toggleTheme }        = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["contact", "about", "skills", "work"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 140 >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const target = document.getElementById(href.replace("#", ""));
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as any }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: "var(--nav-height)",
          background: scrolled ? "var(--surface-glass)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--bg-border)" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-w)",
            marginInline: "auto",
            paddingInline: "var(--gutter)",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <div style={{
              width: 30, height: 30,
              border: "1px solid var(--accent-border)",
              background: "var(--accent-dim)",
              display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 3,
              flexShrink: 0,
            }}>
              <span className="font-mono" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)" }}>V</span>
            </div>
            <span className="font-display" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.02em" }}>
              Vivek
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex desktop-nav">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="underline-hover"
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    transition: "color 0.2s",
                    padding: 0,
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* ── Right Controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: 34, height: 34,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--bg-border)",
                borderRadius: 4,
                background: "var(--bg-elevated)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }}
            >
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="4.5"/>
                  <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Resume button — desktop only */}
            <a
              href="/resume.pdf"
              className="btn btn-ghost hidden md:inline-flex desktop-nav"
              style={{ padding: "7px 16px", fontSize: "0.78rem" }}
            >
              Resume
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden mobile-nav-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                width: 34, height: 34,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--bg-border)",
                borderRadius: 4,
                background: "var(--bg-elevated)",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mobile-menu-container"
            style={{
              position: "fixed",
              top: "var(--nav-height)",
              left: 0, right: 0,
              zIndex: 49,
              background: "var(--surface-glass)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--bg-border)",
            }}
          >
            <div style={{ paddingInline: "var(--gutter)", paddingBlock: "1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    textAlign: "left",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid var(--bg-border-subtle)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: "var(--text-primary)",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <a href="/resume.pdf" className="btn btn-ghost" style={{ marginTop: "1rem", justifyContent: "center" }}>
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
