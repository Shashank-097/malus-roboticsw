"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function LookbookSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative bg-[var(--light-bg)] py-40 overflow-hidden">

      {/* ================= BRAND WATERMARK ================= */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.06,
          x: reduceMotion ? 0 : [0, -60, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute inset-0 flex items-center justify-center
          pointer-events-none select-none
        "
      >
        <span
          className="
            text-[12rem] sm:text-[16rem] lg:text-[22rem]
            font-extrabold tracking-tight
            text-[var(--text-dark)]
            whitespace-nowrap
          "
        >
          MALUCE&nbsp;ROBOTICS
        </span>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.35em] text-[var(--accent)]">
            Automation Systems
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text-dark)]">
            Built for
            <br />
            Industrial Reality
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[var(--muted)]">
            Robotics integration, PLC intelligence, and engineered automation
            systems — designed for factories, not demos.
          </p>
        </div>

        {/* Visual */}
        <div className="relative h-[460px] sm:h-[560px] rounded-[28px] overflow-hidden shadow-[0_60px_160px_rgba(0,0,0,0.28)]">
          <Image
            src="/images/robotics.jpg"
            alt="Industrial robotic automation cell"
            fill
            className="object-cover"
            priority
          />

          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Caption */}
          <div className="absolute bottom-6 left-6 backdrop-blur-md bg-black/30 px-5 py-4 rounded-xl border border-white/10">
            <span className="block text-xs uppercase tracking-widest text-[var(--accent)]">
              Integrated Automation
            </span>
            <span className="block mt-1 text-sm text-white">
              Robotics · PLC · System Integration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}