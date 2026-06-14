"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "vivekkad2002@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=vivekkad2002@gmail.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/vivekkad1",
    href: "https://github.com/vivekkad1",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/vivekkad",
    href: "https://www.linkedin.com/in/vivekkad/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

function ContactRow({
  href, icon, label, value, delay,
}: {
  href: string; icon: React.ReactNode; label: string; value: string; delay: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp(delay)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.1rem 1.4rem",
        background: "var(--bg-card)",
        border: "1px solid var(--bg-border)",
        borderRadius: 6,
        textDecoration: "none",
        transition: "border-color 0.2s, background 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          width: 36, height: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid var(--bg-border)",
          borderRadius: 4,
          color: "var(--accent)",
          background: "var(--accent-dim)",
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <p className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>{label}</p>
          <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{value}</p>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "var(--text-muted)" }}>
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    </motion.a>
  );
}

export default function ContactSection() {
  const headerRef   = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("vivekkad2002@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: "var(--section-pad)",
        paddingBottom: "2rem",
        background: "var(--bg-surface)",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: 600, height: 300,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
      }} />

      <div className="page-wrap" style={{ position: "relative", zIndex: 1 }}>

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
          <p className="label" style={{ marginBottom: "1rem" }}>Contact</p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08 }}>
            Let's build<br />
            <span style={{ color: "var(--accent)" }}>something real.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "4rem", alignItems: "start" }} className="contact-grid">

          {/* ── Left: Links + CTA ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Tagline + availability */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(0)}>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-secondary)", maxWidth: 440, marginBottom: "1.25rem" }}>
                Open to full-time roles, contract projects, and technical collaboration.
                If you're building something ambitious, I'd like to hear about it.
              </p>
              <div className="status-chip" style={{ width: "fit-content" }}>
                <span className="status-dot" />
                Available · Q2 2026
              </div>
            </motion.div>

            {/* Contact links */}
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {CONTACT_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fadeUp(i * 0.08)}
                  style={{
                    width: 44, height: 44,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid var(--bg-border)",
                    borderRadius: 6,
                    background: "var(--bg-card)",
                    color: "var(--accent)",
                    transition: "border-color 0.2s, background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
                  }}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            {/* Copy email */}
            <motion.button
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp(0.25)}
              onClick={copyEmail}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.68rem",
                color: copied ? "var(--accent)" : "var(--text-muted)",
                background: "none", border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Email copied to clipboard!
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  Copy email address
                </>
              )}
            </motion.button>
          </div>

          {/* ── Right: Panel ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp(0.1)}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* What I'm looking for */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--bg-border)",
              borderRadius: 6,
              padding: "1.75rem",
            }}>
              <p className="label" style={{ marginBottom: "1.25rem" }}>What I'm looking for</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  "Next.js frontend engineering roles",
                  "Teams that ship and iterate quickly",
                  "Problems at the intersection of AI + UX",
                  "Contract projects with real technical scope",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", marginTop: "0.45rem", flexShrink: 0 }} />
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume download */}
            <a
              href="/resume.pdf"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.1rem 1.4rem",
                background: "var(--bg-card)",
                border: "1px solid var(--bg-border)",
                borderRadius: 6,
                textDecoration: "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent-border)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--bg-border)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 36, height: 36,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid var(--accent-border)",
                  borderRadius: 4,
                  color: "var(--accent)",
                  background: "var(--accent-dim)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono" style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>Download</p>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>Resume / CV</p>
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}>PDF</span>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp(0.2)}
          style={{
            marginTop: "5rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid var(--bg-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 26, height: 26,
              border: "1px solid var(--accent-border)",
              background: "var(--accent-dim)",
              borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="font-mono" style={{ fontSize: "0.55rem", fontWeight: 600, color: "var(--accent)" }}>V</span>
            </div>
            <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
              Vivek — Next.js Developer
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
            Built with Next.js · Three.js · Framer Motion · © 2026
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
