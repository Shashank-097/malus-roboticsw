"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  /* ================= CINEMATIC VIDEO ZOOM ================= */
  useEffect(() => {
    if (reduceMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let scale = 1;
    let rafId: number;

    const animate = () => {
      scale += 0.00025;
      video.style.transform = `scale(${scale})`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [reduceMotion]);

  return (
    <motion.section
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative h-screen w-full bg-[#05070F] text-white overflow-hidden flex items-center"
    >

      {/* ================= VIDEO ================= */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute right-0 top-0 h-full w-[55%] object-cover hidden lg:block
                     will-change-transform transition-transform duration-700"
        >
          <source src="/videos/hero-industrial1.mp4" type="video/mp4" />
        </video>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#05070F] via-[#05070F]/80 to-[#05070F]" />
      </div>

      {/* ================= CYAN LIGHT SWEEP ================= */}
      {!reduceMotion && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 300, opacity: 0.18 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          className="absolute top-0 h-full w-[180px]
                     bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent
                     blur-3xl hidden lg:block"
        />
      )}

      {/* ================= INDUSTRIAL GRID ================= */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.045]">
        <div
          className="absolute inset-0
                     bg-[radial-gradient(circle_at_1px_1px,#64748B_1px,transparent_0)]
                     [background-size:42px_42px]"
        />
      </div>

      {/* ================= SVG NOISE ================= */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-soft-light">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ================= CYAN + STEEL GLOWS ================= */}
      <div className="absolute right-32 top-40 w-[380px] h-[380px] bg-cyan-400/30 blur-[180px] rounded-full" />
      <div className="absolute left-24 bottom-28 w-[260px] h-[260px] bg-slate-400/20 blur-[160px] rounded-full" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 items-center">

        <div>
          {/* Micro Label */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 text-sm tracking-[0.35em] text-slate-400"
          >
            <span className="w-10 h-px bg-cyan-400" />
            ADVANCED AUTOMATION
          </motion.div>

          {/* ================= HEADLINE ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="font-semibold tracking-tight
                       flex flex-wrap gap-x-6
                       text-6xl md:text-7xl lg:text-8xl
                       leading-[1.12]"
          >
            {["Dream It.", "Design It.", "Deploy It."].map((text, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={
                  text === "Design It."
                    ? "bg-gradient-to-r from-cyan-400 via-cyan-300 to-slate-300 bg-clip-text text-transparent"
                    : ""
                }
              >
                {text}
              </motion.span>
            ))}
          </motion.div>

          {/* Cyan underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 160 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
          />

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Engineering intelligent automation systems powered by
            <span className="text-slate-200"> Robotics</span>,
            <span className="text-slate-200"> Digital Twins</span> and
            <span className="text-slate-200"> Virtual Commissioning</span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <button
              className="px-10 py-4 rounded-full font-medium text-black
                         bg-gradient-to-r from-cyan-400 via-cyan-300 to-slate-300
                         hover:scale-105 transition-transform duration-300"
            >
              Explore Capabilities
            </button>

            <button
              className="px-10 py-4 rounded-full border border-slate-600
                         text-slate-200 hover:border-cyan-400 hover:text-cyan-400
                         transition"
            >
              Talk to Our Engineers
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}