"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutMaluceRobotics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ================= SCROLL MAPPINGS ================= */
  const titleY = useTransform(scrollYProgress, [0, 0.25], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const card1Y = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [100, -20]);

  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const words = ["Industrial", "Automation", "Engineering"];

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 text-white overflow-hidden
                 py-32 sm:py-40 lg:py-48"
    >
      {/* ================= AMBIENT GRID + GLOW ================= */}
      {!reduceMotion && (
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute -top-40 -left-40 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-cyan-500/10 blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-indigo-500/10 blur-[220px] rounded-full" />
        </motion.div>
      )}

      <div
        className="relative z-10 max-w-7xl mx-auto
                   px-6 sm:px-8
                   grid grid-cols-1 lg:grid-cols-2
                   gap-20 lg:gap-32
                   items-center"
      >
        {/* ================= LEFT: KINETIC TEXT ================= */}
        <motion.div
          style={reduceMotion ? {} : { opacity: titleOpacity, y: titleY }}
        >
          <span className="text-xs tracking-[0.45em] text-cyan-400">
            ABOUT US
          </span>

          {/* MAIN HEADING (DESCENDER SAFE) */}
          <h2 className="mt-6 text-4xl sm:text-5xl md:text-6xl
                         font-semibold leading-[1.15] pb-1">
            Maluce Robotics
          </h2>

          {/* ROLE WORDS (DESCENDER SAFE FIX APPLIED) */}
          <div
            className="mt-4 flex flex-wrap gap-x-4
                       text-3xl sm:text-4xl md:text-5xl
                       font-semibold
                       leading-[1.2]
                       pb-2"
          >
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25 + i * 0.15,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400
                           bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}

            {/* TERMINAL CURSOR */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-cyan-400"
            >
              ▍
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 text-base sm:text-lg
                       text-slate-300 max-w-xl leading-relaxed"
          >
            We design, program, and commission
            <span className="text-white font-medium">
              {" "}PLC-controlled automation, robotic cells,
            </span>{" "}
            and digitally validated production systems for modern industry.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-4 text-base sm:text-lg
                       text-slate-300 max-w-xl leading-relaxed"
          >
            Our systems are engineered for
            <span className="text-white font-medium">
              {" "}uptime, precision, and long-term scalability
            </span>{" "}
            — not demos.
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "12rem" }}
            transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12 h-[2px]
                       bg-gradient-to-r from-cyan-400 to-transparent"
          />
        </motion.div>

        {/* ================= RIGHT: FLOATING GLASS CARDS ================= */}
        <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]">

          <motion.div
            style={reduceMotion ? {} : { y: card1Y }}
            whileHover={reduceMotion ? {} : { y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="absolute top-0 left-0 w-[80%] sm:w-[70%]
                       h-[200px] sm:h-[220px]
                       rounded-2xl overflow-hidden
                       bg-white/10 backdrop-blur-xl
                       border border-white/20
                       shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
          >
            <Image src="/images/plc.jpg" alt="PLC Automation" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs sm:text-sm tracking-widest">
              PLC & SCADA
            </span>
          </motion.div>

          <motion.div
            style={reduceMotion ? {} : { y: card2Y }}
            whileHover={reduceMotion ? {} : { y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="absolute top-28 sm:top-36 right-0 w-[85%] sm:w-[75%]
                       h-[220px] sm:h-[240px]
                       rounded-2xl overflow-hidden
                       bg-white/10 backdrop-blur-xl
                       border border-white/20
                       shadow-[0_50px_100px_rgba(0,0,0,0.45)]"
          >
            <Image src="/images/digital1-twin.jpg" alt="Digital Twin" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs sm:text-sm tracking-widest">
              DIGITAL TWIN
            </span>
          </motion.div>

          <motion.div
            style={reduceMotion ? {} : { y: card3Y }}
            whileHover={reduceMotion ? {} : { y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="absolute bottom-0 left-12 sm:left-20 w-[75%] sm:w-[65%]
                       h-[180px] sm:h-[200px]
                       rounded-2xl overflow-hidden
                       bg-white/10 backdrop-blur-xl
                       border border-white/20
                       shadow-[0_40px_90px_rgba(0,0,0,0.4)]"
          >
            <Image src="/images/robotics.jpg" alt="Robotics Integration" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/55 to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs sm:text-sm tracking-widest">
              ROBOTICS INTEGRATION
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}