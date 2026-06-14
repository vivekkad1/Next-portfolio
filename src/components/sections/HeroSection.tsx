"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";


const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/vivekkad1",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vivekkad/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/vivek_dev",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--nav-height)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "15%",
        width: 480,
        height: 480,
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="page-wrap" style={{ paddingTop: "1rem", paddingBottom: "3rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "center",
          minHeight: "calc(100svh - var(--nav-height) - 4rem)",
        }}
        className="hero-grid"
        >
          {/* ────── Left: Content ────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Status + location row */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div className="status-chip">
                <span className="status-dot" />
                Available for work
              </div>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                // India · IST
              </span>
            </motion.div>

            {/* Name block */}
            <motion.div variants={fadeUp}>
              <p className="label" style={{ marginBottom: "1rem" }}>Next.js Developer</p>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 800,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>Vivek</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                maxWidth: 420,
              }}
            >
              Next.js Developer dedicated to building highly scalable, modern web applications. Focused on writing clean, robust code with a strong emphasis on best practices and continuous learning.
            </motion.p>

            {/* Terminal prompt */}
            <motion.div
              variants={fadeUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                background: "var(--bg-elevated)",
                border: "1px solid var(--bg-border)",
                borderRadius: 4,
                width: "fit-content",
              }}
            >
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--accent)" }}>❯</span>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>npm run</span>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-primary)" }}>build-something-great</span>
              <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--accent)", animation: "blink 1.2s step-end infinite" }}>▋</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href="#work"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("work");
                  if (target) {
                    if ((window as any).lenis) (window as any).lenis.scrollTo(target);
                    else target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View My Work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="#contact"
                className="btn btn-ghost"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("contact");
                  if (target) {
                    if ((window as any).lenis) (window as any).lenis.scrollTo(target);
                    else target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Let's Talk
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 34, height: 34,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid var(--bg-border)",
                    borderRadius: 4,
                    background: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>

            {/* Stack tags */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["React", "Next.js", "TypeScript", "Node.js", "Three.js"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "var(--accent)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile grid override */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
