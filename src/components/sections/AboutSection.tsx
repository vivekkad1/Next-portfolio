"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});

const PRINCIPLES = [
  "Ship working code, not perfect code.",
  "Performance is a feature, not an afterthought.",
  "Developer experience shapes product quality.",
  "Every interface is a conversation with the user.",
];

const STATS = [
  { label: "Projects built",   value: "10+" },
];

export default function AboutSection() {
  const headerRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="about"
      style={{
        paddingBlock: "var(--section-pad)",
        background: "var(--bg-primary)",
      }}
    >
      <div className="page-wrap">

        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={fadeUp(0)}
          style={{
            marginBottom: "3.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          <p className="label" style={{ marginBottom: "1rem" }}>About</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08 }}>
            The person<br />
            <span style={{ color: "var(--accent)" }}>behind the code.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "4rem", alignItems: "start" }} className="about-grid">

          {/* ── Left: Bio ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0)}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Bio paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--text-primary)" }}>
                I'm a Next.js developer passionate about writing clean, maintainable code and building products that users love. As a fresher, I bring a strong development mindset and a dedication to software engineering best practices.
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                My core expertise revolves around the modern React ecosystem, specifically Next.js, TypeScript, and state management tools. I focus on building responsive, accessible, and performant web applications from the ground up.
              </p>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Right now, I'm focused on mastering advanced Next.js patterns, including Server Components, API routes, and edge computing, to build the next generation of fast, scalable digital products.
              </p>
            </div>

            {/* Current focus callout */}
            <div style={{
              padding: "1.1rem 1.25rem",
              background: "var(--accent-dim)",
              borderRadius: "0 5px 5px 0",
              border: "1px solid var(--bg-border)",
              borderLeft: "2px solid var(--accent)",
            }}>
              <p className="font-mono" style={{ fontSize: "0.62rem", color: "var(--accent)", marginBottom: "0.4rem" }}>
                // current focus
              </p>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                Deepening my knowledge in scalable Next.js architecture, robust type safety with TypeScript, and creating seamless user experiences with modern CSS frameworks.
              </p>
            </div>

            {/* Principles */}
            <div>
              <p className="label" style={{ marginBottom: "1.1rem" }}>Principles</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {PRINCIPLES.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                  >
                    <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--accent)", marginTop: "0.1rem", flexShrink: 0 }}>—</span>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{p}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Stats + Identity ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp(0.12)}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    padding: "1.5rem 1.25rem",
                    background: "var(--bg-card)",
                    border: "1px solid var(--bg-border)",
                    borderRadius: 6,
                  }}
                >
                  <div className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "0.5rem", letterSpacing: "0.05em" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Identity card */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--bg-border)",
              borderRadius: 6,
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{
                padding: "1.1rem 1.5rem",
                borderBottom: "1px solid var(--bg-border)",
                display: "flex",
                alignItems: "center",
                gap: "0.9rem",
              }}>
                <div style={{
                  width: 36, height: 36,
                  border: "1px solid var(--accent-border)",
                  background: "var(--accent-dim)",
                  borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span className="font-display" style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--accent)" }}>VK</span>
                </div>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>Vivek</p>
                  <p className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>Next.js Developer</p>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: "0 1.5rem" }}>
                {[
                  ["Location",   "India 🇮🇳"],
                  ["Focus",      "Next.js & React"],
                  ["Timezone",   "IST (UTC+5:30)"],
                  ["Languages",  "JS, TS, React"],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBlock: "0.85rem",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--bg-border-subtle)" : "none",
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
