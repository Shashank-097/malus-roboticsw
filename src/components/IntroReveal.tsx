"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation"; // next-intl locale-aware Link

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
    <motion.div
      whileHover={reduceMotion ? {} : { scale: 1.02, boxShadow: "0 14px 36px rgba(34,211,238,0.45)" }}
      whileTap={reduceMotion ? {} : { scale: 0.98, boxShadow: "0 6px 18px rgba(34,211,238,0.25)" }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.6 }}
      className="inline-flex"
    >
      {/* next-intl Link handles /en or /de prefix automatically */}
      <Link
        href={href}
        className={`cursor-pointer select-none inline-flex items-center justify-center ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function IntroReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("hero");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textScale    = useTransform(scrollYProgress, [0, 0.28],  [1, 0.7]);
  const textY        = useTransform(scrollYProgress, [0, 0.28],  [0, -120]);
  const textOpacity  = useTransform(scrollYProgress, [0, 0.32],  [1, 0]);
  const textBlur     = useTransform(scrollYProgress, [0, 0.3],   ["blur(0px)", "blur(10px)"]);
  const energyScaleX = useTransform(scrollYProgress, [0.12, 0.38], [0, 1]);
  const energyOpacity= useTransform(scrollYProgress, [0.15, 0.38], [0, 1]);
  const heroOpacity  = useTransform(scrollYProgress, [0.34, 0.6],  [0, 1]);
  const heroY        = useTransform(scrollYProgress, [0.34, 0.6],  [80, 0]);
  const videoParallax= useTransform(scrollYProgress, [0.34, 0.8],  [0, -60]);

  const lines = [t("line1"), t("line2"), t("line3")];

  return (
    <section ref={ref} className="relative min-h-[200vh] bg-[#F8FAFC]">
      <div className="sticky top-0 h-screen overflow-hidden">

        <motion.div
          style={reduceMotion ? {} : { scale: textScale, y: textY, opacity: textOpacity, filter: textBlur }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-[10px] md:text-xs tracking-[0.45em] text-slate-500 mb-5">{t("system_status")}</span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-semibold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.28em] text-slate-900"
          >
            MALÜS ROBOTICS
          </motion.h1>
          <span className="mt-4 text-[10px] md:text-xs tracking-[0.4em] text-slate-400">{t("initialized")}</span>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            className="mt-10 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent"
          />
        </motion.div>

        {!reduceMotion && (
          <motion.div
            style={{ scaleX: energyScaleX, opacity: energyOpacity }}
            className="absolute top-1/2 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-cyan-500 via-cyan-300 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.65)]"
          />
        )}

        {!reduceMotion && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="absolute top-[35%] left-0 w-[40%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 blur-[1px]"
          />
        )}

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[45%] bg-[#F8FAFC]" />
          <div className="w-full lg:w-[55%] relative overflow-hidden h-[32vh] sm:h-[38vh] lg:h-full mt-10 lg:mt-0">
            <motion.video
              style={reduceMotion ? {} : { y: videoParallax }}
              autoPlay loop muted playsInline preload="auto"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/hero-industrial2.mp4" type="video/mp4" />
            </motion.video>
            <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/10" />
          </div>
        </motion.div>

        <motion.div
          style={reduceMotion ? {} : { opacity: heroOpacity, y: heroY }}
          className="relative z-20 h-full flex items-start lg:items-center pt-24 lg:pt-0"
        >
          <div className="relative w-full lg:w-[45%] px-6 sm:px-10 md:px-16 lg:pl-24">
            {!reduceMotion && (
              <motion.div
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-40 top-40 w-[420px] h-[420px] bg-cyan-400/20 blur-[120px] rounded-full"
              />
            )}

            <span className="inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.35em] text-slate-500 whitespace-nowrap">
              <span className="w-10 h-px bg-cyan-500" />
              {t("tag")}
            </span>

            <div className="mt-5 font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl leading-[1.1] text-slate-900">
              {lines.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * i, duration: 0.8 }}
                  className={i === 1 ? "bg-gradient-to-r from-cyan-500 via-cyan-400 to-slate-400 bg-clip-text text-transparent" : ""}
                >
                  {text}
                </motion.div>
              ))}
            </div>

            <p className="mt-5 md:mt-8 max-w-md lg:max-w-lg text-base md:text-lg text-slate-600">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <HapticButton
                href="/services"
                className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-medium shadow-[0_12px_32px_rgba(34,211,238,0.4)]"
              >
                {t("cta_explore")}
              </HapticButton>
              <HapticButton
                href="/contact"
                className="px-8 md:px-10 py-3 md:py-4 rounded-full border border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-600"
              >
                {t("cta_talk")}
              </HapticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}