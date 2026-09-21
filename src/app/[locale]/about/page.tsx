"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const ACCENT = "#00F0FF"; // neon cyan
const DARK_BG = "#0A0A0A";
const DARK_SURFACE = "#111111";
const DARK_BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.38)";
const BODY = "rgba(255,255,255,0.72)";

const NOISE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
};

const GRID: React.CSSProperties = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
  backgroundSize: "80px 80px",
  pointerEvents: "none",
  position: "absolute",
  inset: 0,
};

/* ─────────────────────────────────────────────
   MAGNETIC CURSOR
───────────────────────────────────────────── */
function MagneticCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const sx = useSpring(cx, { stiffness: 500, damping: 40 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40 });
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { cx.set(e.clientX); cy.set(e.clientY); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", () => setPressed(true));
    window.addEventListener("mouseup", () => setPressed(false));
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const base: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 9999,
    translateX: "-50%", translateY: "-50%",
  };

  return (
    <>
      <motion.div style={{ ...base, x: sx, y: sy }} animate={{ scale: pressed ? 0.6 : 1 }} transition={{ duration: 0.15 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", mixBlendMode: "difference" }} />
      </motion.div>
      <motion.div style={{ ...base, x: sx, y: sy, zIndex: 9998 }} animate={{ scale: pressed ? 2.8 : 1, opacity: pressed ? 0.1 : 0.06 }} transition={{ duration: 0.25 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid #fff" }} />
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, background: ACCENT, zIndex: 9997 }} />;
}

/* ─────────────────────────────────────────────
   MARQUEE
───────────────────────────────────────────── */
const TICKER = ["Strategy", "Design Systems", "Product Engineering", "Brand Identity", "Motion Design", "User Research", "Accessibility", "Performance"];

function Marquee() {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${DARK_BORDER}`, borderBottom: `1px solid ${DARK_BORDER}`, background: DARK_SURFACE }}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ display: "flex", whiteSpace: "nowrap" }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, padding: "13px 36px", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: MUTED, fontWeight: 500 }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT, flexShrink: 0, display: "inline-block" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <span style={{ display: "block", width: 20, height: 1, background: ACCENT }} />
      <span style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: ACCENT, fontWeight: 600 }}>{children}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVEAL HEADING (word-by-word)
───────────────────────────────────────────── */
function RevealHead({ text, style = {}, delay = 0 }: { text: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.22em", ...style }}>
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.78, delay: delay + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ACCENT LINE (animated underline)
───────────────────────────────────────────── */
function AccentLine({ delay = 0.3 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 48, height: 2, background: ACCENT, margin: "24px 0 36px", transformOrigin: "left" }}
    />
  );
}

/* ─────────────────────────────────────────────
   PARALLAX METRIC STRIP
───────────────────────────────────────────── */
const METRICS = [
  { value: "1M+", label: "Active users" },
  { value: "50+", label: "Countries" },
  { value: "98%", label: "Satisfaction" },
  { value: "2018", label: "Founded" },
  { value: "$12M", label: "Series A" },
  { value: "200+", label: "Clients" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "72", label: "Avg. NPS" },
];

function MetricStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  return (
    <div ref={ref} style={{ overflow: "hidden", paddingBlock: "72px 56px", background: DARK_BG }}>
      <motion.div style={{ x, display: "flex", gap: 2, willChange: "transform" }}>
        {METRICS.map((m, i) => (
          <div key={i} style={{ flexShrink: 0, minWidth: 210, padding: "36px 36px", border: `1px solid ${DARK_BORDER}`, borderRadius: 2, background: i % 2 === 0 ? DARK_SURFACE : "transparent" }}>
            <p style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, margin: 0 }}>{m.value}</p>
            <p style={{ marginTop: 10, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: MUTED, fontWeight: 500 }}>{m.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TIMELINE
───────────────────────────────────────────── */
const MILESTONES = [
  { year: "2018", title: "Day one.", body: "Two people, one laptop, one conviction: digital products should feel genuinely human. We started in a rented desk in East London." },
  { year: "2019", title: "First clients.", body: "Signed our first 12 clients through word of mouth alone. No ads. No pitch decks. Just work that spoke for itself." },
  { year: "2020", title: "Product launch.", body: "Shipped v1.0 to 50 beta customers. It crashed on day two. We fixed it in four hours. They stayed." },
  { year: "2021", title: "Series A — $12M.", body: "Raised from investors who shared our obsession. Expanded from 4 to 28 people in eleven months." },
  { year: "2022", title: "Global reach.", body: "Opened offices in Berlin and Singapore. Crossed 500,000 active users. The mission grew bigger than we'd planned." },
  { year: "2024", title: "One million.", body: "Over 1M people trust us daily. The product has changed. The obsession hasn't." },
];

function TimelineItem({ year, title, body, index }: typeof MILESTONES[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 56px 1fr", alignItems: "start" }}>
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingRight: 40, paddingBottom: 64, textAlign: "right", opacity: isLeft ? 1 : 0 }}
      >
        {isLeft && (
          <>
            <p style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, fontWeight: 600, marginBottom: 8 }}>{year}</p>
            <p style={{ fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>{title}</p>
            <p style={{ fontSize: 15, color: BODY, lineHeight: 1.8, maxWidth: 300, marginLeft: "auto" }}>{body}</p>
          </>
        )}
      </motion.div>

      {/* SPINE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          style={{ width: 14, height: 14, borderRadius: "50%", background: ACCENT, boxShadow: `0 0 0 4px rgba(0,240,255,0.15),0 0 20px rgba(0,240,255,0.3)`, zIndex: 2, flexShrink: 0, marginTop: 4 }}
        />
        {index < MILESTONES.length - 1 && (
          <div style={{ width: 1, flex: 1, minHeight: 64, background: `linear-gradient(to bottom,rgba(0,240,255,0.3),rgba(255,255,255,0.05))`, marginTop: 6 }} />
        )}
      </div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingLeft: 40, paddingBottom: 64, opacity: !isLeft ? 1 : 0 }}
      >
        {!isLeft && (
          <>
            <p style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ACCENT, fontWeight: 600, marginBottom: 8 }}>{year}</p>
            <p style={{ fontSize: 21, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>{title}</p>
            <p style={{ fontSize: 15, color: BODY, lineHeight: 1.8, maxWidth: 300 }}>{body}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRINCIPLE CARD
───────────────────────────────────────────── */
function PrincipleCard({ number, title, description, index }: { number: string; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "40px 36px",
        border: `1px solid ${hov ? "rgba(0,240,255,0.25)" : DARK_BORDER}`,
        borderRadius: 4,
        background: hov ? "rgba(0,240,255,0.025)" : "transparent",
        transition: "border-color 0.3s,background 0.3s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ opacity: hov ? 1 : 0 }}
        style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: "radial-gradient(circle at top right,rgba(0,240,255,0.1),transparent 70%)", pointerEvents: "none" }}
      />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.32em", color: ACCENT, display: "block", marginBottom: 20 }}>0{number}</span>
      <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ fontSize: 15, color: BODY, lineHeight: 1.82 }}>{description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   TEAM CARD
───────────────────────────────────────────── */
const TEAM = [
  { name: "Alex Chen", role: "Co-founder & CEO", initials: "AC", exp: "12 yrs exp." },
  { name: "Maya Patel", role: "Co-founder & CTO", initials: "MP", exp: "10 yrs exp." },
  { name: "Jordan Lee", role: "Head of Design", initials: "JL", exp: "8 yrs exp." },
  { name: "Sam Rivera", role: "Head of Growth", initials: "SR", exp: "9 yrs exp." },
];

function TeamCard({ name, role, initials, exp, index }: typeof TEAM[0] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "32px 28px",
        border: `1px solid ${hov ? "rgba(0,240,255,0.22)" : DARK_BORDER}`,
        borderRadius: 4,
        transition: "border-color 0.3s",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ scaleY: hov ? 1 : 0 }}
        initial={{ scaleY: 0 }}
        transition={{ duration: 0.32 }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: ACCENT, transformOrigin: "bottom" }}
      />
      <div style={{
        width: 50, height: 50, borderRadius: 4,
        background: "rgba(0,240,255,0.07)",
        border: `1px solid rgba(0,240,255,0.18)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 700, color: ACCENT,
        marginBottom: 20, letterSpacing: "0.06em",
      }}>
        {initials}
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: "-0.01em" }}>{name}</p>
      <p style={{ fontSize: 13, color: MUTED, marginBottom: 18, letterSpacing: "0.02em" }}>{role}</p>
      <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(0,240,255,0.5)", fontWeight: 600 }}>{exp}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PROCESS GRID
───────────────────────────────────────────── */
const STEPS = ["Research", "Strategy", "Design", "Engineering", "Testing", "Launch"];

function ProcessGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ padding: 2, border: `1px solid ${DARK_BORDER}`, borderRadius: 4, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: DARK_BORDER }}
    >
      {STEPS.map((step, i) => (
        <div key={step} style={{
          padding: "28px 24px",
          background: i === 0 ? "rgba(0,240,255,0.07)" : DARK_BG,
          border: i === 0 ? `1px solid rgba(0,240,255,0.18)` : "none",
          transition: "background 0.25s",
        }}>
          <span style={{ fontSize: 10, letterSpacing: "0.32em", color: i === 0 ? ACCENT : MUTED, textTransform: "uppercase", fontWeight: 600 }}>0{i + 1}</span>
          <p style={{ marginTop: 10, fontSize: 15, fontWeight: 600, color: i === 0 ? "#fff" : BODY }}>{step}</p>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function AboutPage() {
  const t = useTranslations("about_page");
  const { locale } = useParams();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 140]);
  const heroOpacity = useTransform(heroScroll, [0, 0.65], [1, 0]);

  /* live counter */
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 1000000;
    const duration = 2400;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = setTimeout(() => requestAnimationFrame(tick), 600);
    return () => clearTimeout(id);
  }, []);

  const principles = [
    { title: t("p1_title"), description: t("p1_desc") },
    { title: t("p2_title"), description: t("p2_desc") },
    { title: t("p3_title"), description: t("p3_desc") },
  ];

  return (
    <main style={{ background: DARK_BG, color: "#fff", overflowX: "hidden" }}>
      <MagneticCursor />
      <ScrollBar />

      {/* ── HERO ──────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: "100svh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={GRID} />
        <div style={NOISE} />

        {/* giant ghost word */}
        <div aria-hidden style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}>
          <motion.span
            style={{ y: heroY }}
            aria-hidden
            className=""
            style2={{} as any}
          >
            <span style={{
              fontSize: "clamp(120px, 22vw, 280px)", fontWeight: 900,
              letterSpacing: "-0.06em", color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              lineHeight: 0.85, display: "block",
            }}>ABOUT</span>
          </motion.span>
        </div>

        {/* horizontal accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: "linear-gradient(to right,transparent,rgba(0,240,255,0.18),transparent)", transformOrigin: "left", pointerEvents: "none" }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "flex-end" }}>
            {/* copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 32 }}
              >
                <span style={{ width: 28, height: 1, background: ACCENT, display: "block" }} />
                <span style={{ fontSize: 11, letterSpacing: "0.42em", textTransform: "uppercase", color: ACCENT, fontWeight: 600 }}>{t("hero_eyebrow")}</span>
              </motion.div>

              <div style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{ fontSize: "clamp(52px, 8.5vw, 102px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}
                >
                  {t("hero_h1_line1")}
                  <br />
                  <span style={{ color: ACCENT }}>{t("hero_h1_line2")}</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.48 }}
                style={{ marginTop: 32, fontSize: 17, color: BODY, maxWidth: 500, lineHeight: 1.85 }}
              >
                {t("hero_desc")}
              </motion.p>
            </div>

            {/* live counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              style={{ textAlign: "right", paddingBottom: 8, borderRight: `2px solid ${ACCENT}`, paddingRight: 24, flexShrink: 0 }}
            >
              <p style={{ fontSize: "clamp(26px, 3.5vw, 46px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1, margin: 0 }}>
                {count.toLocaleString()}
              </p>
              <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: MUTED, marginTop: 6, fontWeight: 500 }}>Active users</p>
            </motion.div>
          </div>

          {/* meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{ marginTop: 80, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
          >
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {["Est. 2018", "London · Berlin · Singapore", "Series A backed"].map((item) => (
                <span key={item} style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: MUTED, fontWeight: 500 }}>{item}</span>
              ))}
            </div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom,transparent,${ACCENT})` }} />
              <span style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: MUTED }}>Scroll</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MARQUEE ───────────────────────────────── */}
      <Marquee />

      {/* ── WHO WE ARE ────────────────────────────── */}
      <section style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
        <div style={NOISE} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <Label>{t("who_subtitle")}</Label>
            <RevealHead
              text={t("who_title")}
              style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}
            />
            <AccentLine />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ fontSize: 17, color: BODY, lineHeight: 1.85 }}
            >
              {t("who_content")}
            </motion.p>
          </div>

          {/* data aside */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ padding: "44px 40px", border: `1px solid ${DARK_BORDER}`, borderRadius: 4, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: `linear-gradient(to right,${ACCENT},transparent)` }} />
              {[["Products shipped", "47"], ["Industries served", "12"], ["Uptime SLA", "99.98%"], ["Avg. NPS score", "72"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 0", borderBottom: `1px solid ${DARK_BORDER}` }}>
                  <span style={{ fontSize: 13, color: MUTED, letterSpacing: "0.04em" }}>{label}</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── METRIC STRIP ──────────────────────────── */}
      <MetricStrip />

      {/* ── OUR STORY ─────────────────────────────── */}
      <section style={{ padding: "120px 0 80px", position: "relative" }}>
        <div style={GRID} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
          <Label>Our Story</Label>
          <RevealHead
            text="Six years. One obsession."
            style={{ fontSize: "clamp(32px, 4.5vw, 58px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0 }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.3 }}
            style={{ margin: "24px 0 80px", fontSize: 17, color: BODY, maxWidth: 520, lineHeight: 1.85 }}
          >
            From a two-person studio to a global platform — every milestone that shaped who we are.
          </motion.p>

          <div style={{ position: "relative" }}>
            {MILESTONES.map((m, i) => (
              <TimelineItem key={m.year} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ───────────────────────────── */}
      <section style={{ padding: "120px 0", background: DARK_SURFACE, position: "relative", overflow: "hidden" }}>
        <div style={NOISE} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "center", position: "relative", zIndex: 1 }}>
          <ProcessGrid />
          <div>
            <Label>{t("how_subtitle")}</Label>
            <RevealHead
              text={t("how_title")}
              style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}
            />
            <AccentLine />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.32 }}
              style={{ fontSize: 17, color: BODY, lineHeight: 1.85 }}
            >
              {t("how_content")}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ────────────────────────────── */}
      <section style={{ padding: "120px 0", position: "relative" }}>
        <div style={GRID} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <Label>{t("principles_eyebrow")}</Label>
              <RevealHead
                text={t("principles_title")}
                style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ fontSize: 14, color: MUTED, maxWidth: 260, lineHeight: 1.7 }}
            >
              The non-negotiables behind every decision we make.
            </motion.p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {principles.map((p, i) => (
              <PrincipleCard key={p.title} number={String(i + 1)} title={p.title} description={p.description} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────── */}
      <section style={{ padding: "120px 0", background: DARK_SURFACE, position: "relative", overflow: "hidden" }}>
        <div style={NOISE} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <Label>The Team</Label>
            <RevealHead
              text="People behind the work."
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0, justifyContent: "center" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
            {TEAM.map((m, i) => (
              <TeamCard key={m.name} {...m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section style={{ minHeight: "72vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={GRID} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(0,240,255,0.06),transparent 70%)", pointerEvents: "none" }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1, padding: "0 32px" }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Label>{t("cta_eyebrow")}</Label>
          </div>
          <h2 style={{ fontSize: "clamp(40px, 7vw, 90px)", fontWeight: 800, letterSpacing: "-0.045em", color: "#fff", lineHeight: 0.9, margin: "0 0 28px" }}>
            {t("cta_title")}
          </h2>
          <p style={{ fontSize: 18, color: BODY, maxWidth: 440, margin: "0 auto 48px", lineHeight: 1.8 }}>
            No templates. No shortcuts. Just extraordinary work.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={`/${locale}/contact`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 36px", borderRadius: 2,
                background: ACCENT, color: "#0A0A0A",
                fontWeight: 700, fontSize: 14, letterSpacing: "0.04em",
                textDecoration: "none",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              {t("cta_button")}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/work`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "15px 36px", borderRadius: 2,
                border: `1px solid ${DARK_BORDER}`, color: BODY,
                fontWeight: 600, fontSize: 14, letterSpacing: "0.04em",
                textDecoration: "none",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(0,240,255,0.28)"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = DARK_BORDER; el.style.color = BODY; }}
            >
              See our work
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER BAR ────────────────────────────── */}
      <div style={{ padding: "22px 48px", borderTop: `1px solid ${DARK_BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: MUTED, letterSpacing: "0.14em" }}>© {new Date().getFullYear()} — All rights reserved</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT }} />
          <span style={{ fontSize: 11, color: MUTED, letterSpacing: "0.2em", textTransform: "uppercase" }}>All systems operational</span>
        </div>
      </div>
    </main>
  );
}