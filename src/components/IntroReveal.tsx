"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ================= MICRO-HAPTIC BUTTON ================= */
function HapticButton({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      whileHover={
        reduceMotion
          ? {}
          : {
              scale: 1.015,
              boxShadow: "0 14px 36px rgba(34,211,238,0.45)",
            }
      }
      whileTap={
        reduceMotion
          ? {}
          : {
              scale: 0.985,
              boxShadow: "0 6px 18px rgba(34,211,238,0.25)",
            }
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.6,
      }}
      className={`cursor-pointer select-none inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.a>
  );
}

/* ================= MAIN HERO ================= */
export default function IntroReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [playVideo, setPlayVideo] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* ================= SYSTEM BOOT TEXT ================= */
  const textScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.62]);
  const textY = useTransform(scrollYProgress, [0, 0.28], [0, -180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const textBlur = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["blur(0px)", "blur(12px)"]
  );
  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 0.28],
    ["0.38em", "0.08em"]
  );

  /* ================= ENERGY SCAN ================= */
  const energyScaleX = useTransform(scrollYProgress, [0.12, 0.38], [0, 1]);
  const energyOpacity = useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);

  /* ================= HERO ================= */
  const heroOpacity = useTransform(scrollYProgress, [0.34, 0.6], [0, 1]);
  const heroY = useTransform(scrollYProgress, [0.34, 0.6], [140, 0]);

  /* ================= VIDEO LOAD ================= */
  useEffect(() => {
    const unsub = heroOpacity.on("change", (v) => {
      if (v > 0.65) setPlayVideo(true);
    });
    return () => unsub();
  }, [heroOpacity]);

  return (
    <section ref={ref} className="relative h-[230vh] bg-[#F8FAFC]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ================= SYSTEM BOOT ================= */}
        <motion.div
          style={
            reduceMotion
              ? {}
              : {
                  scale: textScale,
                  y: textY,
                  opacity: textOpacity,
                  letterSpacing,
                  filter: textBlur,
                }
          }
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center"
        >
          <span className="text-[11px] tracking-[0.5em] text-slate-500 mb-5">
            SYSTEM STATUS
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-semibold text-5xl md:text-7xl lg:text-8xl tracking-[0.38em] text-slate-900"
          >
            MALUCE ROBOTICS
          </motion.h1>

          <span className="mt-4 text-[11px] tracking-[0.45em] text-slate-400">
            INITIALIZED
          </span>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 260 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="mt-10 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent"
          />
        </motion.div>

        {/* ================= ENERGY LINE ================= */}
        {!reduceMotion && (
          <motion.div
            style={{ scaleX: energyScaleX, opacity: energyOpacity }}
            className="absolute top-1/2 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-cyan-500 via-cyan-300 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.65)]"
          />
        )}

        {/* ================= BACKGROUND SPLIT ================= */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex">
          <div className="w-full lg:w-[45%] bg-[#F8FAFC]" />

          <div className="hidden lg:block w-[55%] relative overflow-hidden">
            {playVideo && (
              <motion.video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/hero-industrial2.mp4" type="video/mp4" />
              </motion.video>
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/10" />
          </div>
        </motion.div>

        {/* ================= HERO CONTENT ================= */}
        <motion.div
          style={reduceMotion ? {} : { opacity: heroOpacity, y: heroY }}
          className="relative z-20 h-full flex items-center"
        >
          <div className="w-full lg:w-[45%] pl-10 lg:pl-24">

            <span className="inline-flex items-center gap-3 text-xs tracking-[0.4em] text-slate-500">
              <span className="w-10 h-px bg-cyan-500" />
              ADVANCED AUTOMATION
            </span>

            <div className="mt-6 font-semibold text-6xl md:text-7xl lg:text-8xl leading-[1.04] text-slate-900">
              {["Dream It", "Design It", "Deploy It"].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * i, duration: 0.85 }}
                  className={
                    text === "Design It"
                      ? "bg-gradient-to-r from-cyan-500 via-cyan-400 to-slate-400 bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {text}
                </motion.div>
              ))}
            </div>

            <p className="mt-8 max-w-md text-lg text-slate-600">
              Engineering intelligent automation systems powered by
              <span className="text-slate-900"> Robotics</span>,
              <span className="text-slate-900"> Digital Twins</span> and
              <span className="text-slate-900"> Virtual Commissioning</span>.
            </p>

            {/* ================= CLICKABLE CTA ================= */}
            <div className="mt-12 flex gap-6 flex-wrap">
              <HapticButton
                href="/services"
              
                className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-medium shadow-[0_12px_32px_rgba(34,211,238,0.4)]"
              >
                Explore Capabilities
              </HapticButton>

              <HapticButton
                href="/contact"
                className="px-10 py-4 rounded-full border border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-600"
              >
                Talk to Our Engineers
              </HapticButton>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}