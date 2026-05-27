"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function SystemNarrativePinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("process");

  const [active, setActive] = useState(0);
  const [canHover, setCanHover] = useState(false);
  const [prevActive, setPrevActive] = useState(0);

  const steps = [
    { title: t("step1_title"), description: t("step1_desc"), image: "/images/plc.jpg",           tag: "Analysis",   color: "from-cyan-500 to-blue-500",    text: "text-cyan-600",   bg: "bg-cyan-50",   border: "border-cyan-100" },
    { title: t("step2_title"), description: t("step2_desc"), image: "/images/digital1-twin.jpg", tag: "Simulation", color: "from-blue-500 to-indigo-500",   text: "text-blue-600",   bg: "bg-blue-50",   border: "border-blue-100" },
    { title: t("step3_title"), description: t("step3_desc"), image: "/images/robotics.jpg",   tag: "Deployment", color: "from-indigo-500 to-purple-500", text: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
    if (next !== active) {
      setPrevActive(active);
      setActive(next);
    }
  });

  const revealOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const revealY       = useTransform(scrollYProgress, [0, 0.08], [40, 0]);
  const textY         = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const imageY        = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const railScale     = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const mouseY        = useMotionValue(-9999);

  function handleMouseMove(e: React.MouseEvent) {
    if (!canHover || reduceMotion || !railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseY.set(-9999);
  }

  const direction = active > prevActive ? 1 : -1;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8fafc]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden px-6 py-24 space-y-24 max-w-xl mx-auto">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-cyan-500" />
            <span className="text-xs tracking-[0.45em] text-cyan-600 uppercase">{t("eyebrow")}</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 leading-tight">
            How We
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"> Engineer</span>
          </h2>
        </div>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Image */}
            <div className="relative h-[280px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <Image src={step.image} alt={step.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Step pill */}
              <div className={`absolute top-4 left-4 flex items-center gap-2 ${step.bg} border ${step.border} rounded-full px-3 py-1.5 backdrop-blur-md`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                <span className={`text-[10px] tracking-widest uppercase font-black ${step.text}`}>{step.tag}</span>
              </div>

              {/* Step number watermark */}
              <div className="absolute bottom-4 right-5 text-6xl font-black text-white/15 leading-none select-none">
                0{i + 1}
              </div>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r ${step.color}`} />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-6 h-[2px] bg-gradient-to-r ${step.color} rounded-full`} />
                <span className={`text-xs tracking-widest uppercase font-bold ${step.text}`}>{step.tag}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= DESKTOP PINNED ================= */}
      <div className="hidden lg:block h-[320vh]">
        <motion.div
          style={reduceMotion ? {} : { opacity: revealOpacity, y: revealY }}
          className="sticky top-0 h-screen overflow-hidden bg-[#f8fafc]"
        >

          {/* ── LIGHT GRID BACKGROUND ── */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          {/* ── AMBIENT GLOWS (light, subtle) ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={reduceMotion ? {} : { x: [0, 30, 0], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-60 -left-60 w-[700px] h-[700px] bg-cyan-400/20 blur-[180px] rounded-full"
            />
            <motion.div
              animate={reduceMotion ? {} : { x: [0, -30, 0], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-60 -right-60 w-[600px] h-[600px] bg-indigo-400/15 blur-[180px] rounded-full"
            />
            {/* Per-step accent glow */}
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={`absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-l ${steps[active].color} opacity-[0.06] blur-[160px] rounded-full`}
              />
            </AnimatePresence>
          </div>

          {/* ── SCAN LINE ── */}
          {!reduceMotion && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 7, repeat: Infinity, repeatDelay: 10, ease: "linear" }}
              className="absolute top-[42%] left-0 w-[30%] h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent z-20 pointer-events-none"
            />
          )}

          {/* ── LEFT SCROLL RAIL ── */}
          <div className="absolute left-10 top-0 bottom-0 flex items-center z-30">
            <div ref={railRef} className="relative h-[55%] w-px bg-slate-200">

              {/* Animated fill */}
              <motion.div
                style={{ scaleY: railScale, originY: 0 }}
                className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-indigo-400"
              />

              {/* Soft glow on rail */}
              <motion.div
                style={{ scaleY: railScale, originY: 0 }}
                className="absolute top-0 -left-[3px] w-[7px] h-full bg-gradient-to-b from-cyan-400/30 via-blue-400/20 to-transparent blur-[4px]"
              />

              {steps.map((step, i) => {
                const nodeY = (i / (steps.length - 1)) * 100;
                const offset = useTransform(mouseY, (y) => {
                  if (!canHover || !railRef.current) return 0;
                  const nodePx = railRef.current.offsetHeight * (nodeY / 100);
                  const dist = y - nodePx;
                  if (Math.abs(dist) > 80) return 0;
                  return Math.max(-6, Math.min(6, dist * 0.08));
                });

                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{ top: `${nodeY}%`, y: canHover ? offset : 0 }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      animate={{
                        scale: active === i ? [1, 2.2, 1] : 1,
                        opacity: active === i ? [0.3, 0, 0.3] : 0,
                      }}
                      transition={{ duration: 2, repeat: active === i ? Infinity : 0 }}
                      className="absolute inset-0 -m-1.5 rounded-full bg-cyan-400"
                    />
                    {/* Dot */}
                    <motion.span
                      animate={{
                        scale: active === i ? 1.5 : 1,
                        backgroundColor: active === i ? "#06b6d4" : "#cbd5e1",
                        boxShadow: active === i
                          ? "0 0 10px rgba(34,211,238,0.6), 0 0 20px rgba(34,211,238,0.3)"
                          : "none",
                      }}
                      transition={{ duration: 0.4 }}
                      className="block w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── TOP-RIGHT COUNTER ── */}
          <div className="absolute top-8 right-8 z-30 flex items-center gap-4">
            <span className="text-[10px] tracking-[0.45em] text-slate-400 uppercase">{t("eyebrow")}</span>
            <div className="flex gap-2 items-center">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: active === i ? 32 : 8,
                    backgroundColor: active === i ? "#06b6d4" : "#e2e8f0",
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[3px] rounded-full"
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">
              <span className="text-cyan-500 font-black">0{active + 1}</span>
              <span className="mx-1 text-slate-300">/</span>
              0{steps.length}
            </span>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="relative z-10 max-w-7xl mx-auto h-full px-16 grid grid-cols-[1fr_1fr] gap-24 items-center">

            {/* ── TEXT SIDE ── */}
            <motion.div style={reduceMotion ? {} : { y: textY }} className="relative">

              {/* Ghost number */}
              <div className="absolute -top-8 -left-4 select-none pointer-events-none overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[180px] font-black leading-none text-slate-900/[0.04]"
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Step tag pill */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${active}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className={`h-[2px] w-10 rounded-full bg-gradient-to-r ${steps[active].color}`} />
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.4em] uppercase font-black ${steps[active].bg} ${steps[active].border} border ${steps[active].text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${steps[active].color}`} />
                    {steps[active].tag} — {active + 1} / {steps.length}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${active}`}
                  initial={{ opacity: 0, y: direction * 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-5xl xl:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight"
                >
                  {steps[active].title}
                </motion.h2>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${active}`}
                  initial={{ opacity: 0, y: direction * 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -20 }}
                  transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 text-lg text-slate-500 max-w-md leading-[1.8]"
                >
                  {steps[active].description}
                </motion.p>
              </AnimatePresence>

              {/* Animated gradient bar */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bar-${active}`}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 140, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`mt-10 h-[2px] bg-gradient-to-r ${steps[active].color} rounded-full`}
                />
              </AnimatePresence>

              {/* Mini step navigation */}
              <div className="mt-14 space-y-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: active === i ? 1 : 0.35 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 group"
                  >
                    <motion.div
                      animate={{
                        width: active === i ? 24 : 8,
                      }}
                      className={`h-[2px] rounded-full shrink-0 bg-gradient-to-r ${active === i ? step.color : "from-slate-200 to-slate-200"} transition-all duration-300`}
                    />
                    <span className={`text-sm font-semibold transition-colors duration-300 ${active === i ? "text-slate-900" : "text-slate-400"}`}>
                      {step.title}
                    </span>
                    {active === i && (
                      <motion.div
                        layoutId="active-dot"
                        className="w-1 h-1 rounded-full bg-cyan-500 ml-auto"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── IMAGE SIDE ── */}
            <motion.div
              style={reduceMotion ? {} : { y: imageY }}
              className="relative h-[520px] w-full"
            >
              {/* Outer glow ring — light version */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br ${steps[active].color} opacity-20 blur-[3px]`}
                />
              </AnimatePresence>

              {/* Card shadow */}
              <div className="absolute inset-0 rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.15)]" />

              {/* Image container */}
              <div className="relative h-full rounded-[2rem] overflow-hidden border border-slate-200/80">

                {/* Corner accents */}
                <div className="absolute top-4 right-4 z-20 w-10 h-10 border-t-2 border-r-2 border-white/60 rounded-tr-xl pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-20 w-10 h-10 border-b-2 border-l-2 border-white/60 rounded-bl-xl pointer-events-none" />

                {/* Images */}
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.08,
                      filter: active === i ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                  </motion.div>
                ))}

                {/* Caption bar */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caption-${active}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 z-20 p-6"
                  >
                    <div className={`h-px bg-gradient-to-r ${steps[active].color} mb-4 opacity-70`} />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-[0.35em] mb-1">{steps[active].tag}</p>
                        <p className="text-sm font-bold text-white">{steps[active].title}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {steps.map((_, di) => (
                          <motion.div
                            key={di}
                            animate={{
                              opacity: active === di ? 1 : 0.25,
                              scale: active === di ? 1.3 : 1,
                            }}
                            className="w-1 h-1 rounded-full bg-white"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Scan line on image */}
                {!reduceMotion && (
                  <motion.div
                    animate={{ y: ["-10%", "110%"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "linear" }}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* ── BOTTOM PROGRESS BAR ── */}
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="h-px bg-slate-200" />
            <motion.div
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className={`-mt-px h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500`}
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}