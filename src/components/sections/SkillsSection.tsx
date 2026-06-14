"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Icons } from "@/components/icons/TechIcons";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});


const SKILLS = [
  { name: "HTML",           icon: "HTML" },
  { name: "CSS",            icon: "CSS" },
  { name: "JavaScript",     icon: "JavaScript" },
  { name: "Tailwind CSS",    icon: "Tailwind" },
  { name: "React",           icon: "React" },
  { name: "TypeScript",      icon: "TypeScript" },
  { name: "Next.js",         icon: "Next.js" },
  { name: "SQL",             icon: "SQL" },
  { name: "MongoDB",         icon: "MongoDB" },
  { name: "Python",          icon: "Python" },
  { name: "Git",             icon: "Git" },
  { name: "GitHub",          icon: "GitHub" },
];

const PROCESS = [
  { num: "01", label: "Understand", desc: "Define the problem space, user needs, and constraints before writing code." },
  { num: "02", label: "Architect",  desc: "Design data flow, API shape, component hierarchy. No premature optimization." },
  { num: "03", label: "Build",      desc: "Ship iteratively. Prioritize correctness and DX. Refactor with evidence." },
  { num: "04", label: "Polish",     desc: "Performance audit, a11y sweep, edge cases, and that final 10% that matters." },
];

export default function SkillsSection() {
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="skills"
      style={{
        paddingBlock: "var(--section-pad)",
        background: "var(--bg-surface)",
        position: "relative",
      }}
    >
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />

      <div className="page-wrap" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={fadeUp(0)}
          className="section-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            paddingBottom: "1.75rem",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: "0.75rem" }}>Stack &amp; Process</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08 }}>
              How I<br /><span style={{ color: "var(--accent)" }}>build.</span>
            </h2>
          </div>
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
            sys.skills.load()
          </span>
        </motion.div>

        {/* Two-column: skill groups + process */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }} className="skills-layout">

          {/* Left: skill groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp(0)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--bg-border)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid var(--bg-border)",
                background: "var(--bg-primary)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", opacity: 0.9 }} />
                <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Tech Stack
                </span>
              </div>

              {/* Icon grid */}
              <div style={{
                padding: "1.25rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: "0.75rem",
              }}>
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.9rem 0.5rem",
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--bg-border)",
                      borderRadius: 6,
                      cursor: "default",
                      transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                      (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                      (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: "28px" }}>
                      {Icons[skill.icon]}
                    </div>
                    <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.3 }}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: process */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp(0.15)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--bg-border)",
              borderRadius: 8,
              padding: "1.75rem",
              position: "sticky",
              top: "calc(var(--nav-height) + 1.5rem)",
            }}
          >
            <p className="label" style={{ marginBottom: "1.5rem" }}>My Process</p>
            <div>
              {PROCESS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    paddingBlock: "1rem",
                    borderBottom: i < PROCESS.length - 1 ? "1px solid var(--bg-border-subtle)" : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span className="font-mono" style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
                    {step.num}
                  </span>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.3rem" }}>{step.label}</p>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--bg-border-subtle)" }}>
              <p className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>// currently exploring</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {["Rust", "WebAssembly", "LLM Agents"].map((t) => (
                  <span key={t} className="tag" style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-dim)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .skills-layout { grid-template-columns: 1fr !important; }
          .skills-layout > div:last-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
