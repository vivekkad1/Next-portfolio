"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});

const PROJECTS = [
  {
    id: "01",
    title: "Developer Productivity Hub",
    subtitle: "Unified OS for Software Engineers",
    summary:
      "A comprehensive workspace integrating tasks, habits, learning goals, and developer metrics. Features GitHub sync, LeetCode progress tracking, and developer news aggregation in a cohesive interface.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Auth.js", "Zustand"],
    impact: "Unified developer workflow",
    role: "Full-Stack Dev",
    featured: true,
    link: "https://github.com/vivekkad1/developer-productivity-hub",
    demo: "https://developer-productivity-hub-umber.vercel.app",
  },
  {
    id: "02",
    title: "FlowForge",
    subtitle: "Visual Pipeline Builder",
    summary:
      "Node-based workflow editor with DAG validation. Drag-and-drop interface for building processing pipelines that compile to executable tasks.",
    tech: ["React Flow", "Zustand", "FastAPI", "Python"],
    impact: "500+ active users",
    role: "Creator",
    link: "https://github.com/vivek/flowforge",
    demo: "#",
  },
  {
    id: "03",
    title: "Devboard",
    subtitle: "Engineering Dashboard",
    summary:
      "Real-time system health dashboard aggregating metrics from distributed microservices with custom charting and alert routing.",
    tech: ["React", "WebSocket", "D3.js", "Go", "InfluxDB"],
    impact: "MTTR reduced by 40%",
    role: "Solo Dev",
    link: "https://github.com/vivek/devboard",
    demo: "#",
  },
  {
    id: "04",
    title: "Spectra UI",
    subtitle: "Component Library",
    summary:
      "Production-grade React component library with strict accessibility, CSS custom properties theming, and Storybook documentation.",
    tech: ["React", "TypeScript", "Storybook", "Rollup"],
    impact: "1.2k GitHub stars",
    role: "Author",
    link: "https://github.com/vivek/spectra-ui",
    demo: "#",
  },
];

// ── Shared icon helpers ──────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function IconBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 30, height: 30,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid var(--bg-border)",
        borderRadius: 3,
        color: "var(--text-muted)",
        textDecoration: "none",
        transition: "border-color 0.2s, color 0.2s",
        background: "var(--bg-elevated)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
        (e.currentTarget as HTMLElement).style.color = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
      }}
    >
      {children}
    </a>
  );
}

// ── Featured project ─────────────────────────────────────────────────
function FeaturedCard({ project }: { project: typeof PROJECTS[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp(0)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: 8,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
      }}
      className="featured-card"
    >
      {/* Left content */}
      <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.14em",
            padding: "3px 10px",
            border: "1px solid var(--accent-border)",
            borderRadius: 3,
            background: "var(--accent-dim)",
            color: "var(--accent)",
            textTransform: "uppercase",
          }}>
            Featured
          </span>
          <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
            project_{project.id}
          </span>
        </div>

        <div>
          <h3 className="font-display" style={{ fontSize: "1.9rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
            {project.title}
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--accent)" }}>{project.subtitle}</p>
        </div>

        <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--text-secondary)", maxWidth: 420 }}>
          {project.summary}
        </p>

        <div style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          padding: "0.65rem 1rem",
          borderLeft: "2px solid var(--accent)",
          background: "var(--accent-dim)",
          borderRadius: "0 4px 4px 0",
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--accent)", flexShrink: 0 }}>
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
          <span className="font-mono" style={{ fontSize: "0.68rem", color: "var(--accent)" }}>{project.impact}</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        <div style={{ display: "flex", gap: "0.6rem", marginTop: "auto", paddingTop: "0.5rem" }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: "0.78rem", padding: "9px 20px" }}>
            View on GitHub
            <GithubIcon />
          </a>
          <a href={project.demo} className="btn btn-ghost" style={{ fontSize: "0.78rem", padding: "9px 20px" }}>
            Live Demo
          </a>
        </div>
      </div>

      {/* Right visual panel */}
      <div style={{
        borderLeft: "1px solid var(--bg-border)",
        background: "var(--bg-elevated)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
          <img 
            src="/dev-productivity-hub.png" 
            alt="Developer Productivity Hub preview"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "6px",
              border: "1px solid var(--bg-border)",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)"
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card > div:last-child { display: none !important; }
        }
      `}</style>
    </motion.article>
  );
}

// ── Small project card ───────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp(index * 0.1)}
      className="card card-hover"
      style={{ display: "flex", flexDirection: "column", padding: "1.75rem", gap: "1.25rem", position: "relative", overflow: "hidden" }}
    >
      {/* Window top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {[0.3,0.3,0.3].map((o,i) => (
              <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--bg-border)", opacity: o }} />
            ))}
          </div>
          <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>
            project_{project.id}.tsx
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <IconBtn href={project.link} label="GitHub"><GithubIcon /></IconBtn>
          <IconBtn href={project.demo} label="Live demo"><ExternalIcon /></IconBtn>
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="font-mono" style={{ fontSize: "0.6rem", color: "var(--accent)", marginBottom: "0.4rem" }}>{project.id}</div>
        <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>{project.subtitle}</p>
      </div>

      <p style={{ fontSize: "0.83rem", lineHeight: 1.7, color: "var(--text-secondary)", flexGrow: 1 }}>
        {project.summary}
      </p>

      {/* Impact */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "0.5rem 0.75rem",
        borderLeft: "2px solid var(--accent)",
        background: "var(--accent-dim)",
        borderRadius: "0 3px 3px 0",
      }}>
        <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--accent)" }}>{project.impact}</span>
      </div>

      {/* Tech + Role */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
        {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>

      {/* Role badge */}
      <div style={{ position: "absolute", top: "1.75rem", right: "5.5rem" }}>
        <span className="tag" style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-dim)", fontSize: "0.55rem" }}>
          {project.role}
        </span>
      </div>

      {/* Hover underline */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: 2,
        background: "var(--accent)",
        width: 0, transition: "width 0.5s ease",
      }} className="card-accent-line" />
      <style>{`.card:hover .card-accent-line { width: 100% !important; }`}</style>
    </motion.article>
  );
}

// ── Section ──────────────────────────────────────────────────────────
export default function WorkSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="work"
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
          className="section-header"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--bg-border)",
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: "1rem" }}>Selected Work</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08 }}>
              Projects that<br /><span style={{ color: "var(--accent)" }}>shipped.</span>
            </h2>
          </div>
          <div className="font-mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", textAlign: "right", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <span>{PROJECTS.length} projects</span>
            <span style={{ color: "var(--bg-border)" }}>─────</span>
            <span>Independent Work</span>
          </div>
        </motion.div>

        {/* Featured */}
        <div style={{ marginBottom: "1.5rem" }}>
          <FeaturedCard project={PROJECTS[0]} />
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.25rem",
        }}
        className="project-grid"
        >
          {PROJECTS.slice(1).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .project-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .project-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
