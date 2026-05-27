"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowUpRight, Cpu, GitBranch, Zap } from "lucide-react";

const CARDS = [
  { key: "card1" as const, image: "/images/plc.jpg",           alt: "PLC Automation",      icon: <Cpu className="w-3 h-3" />,       color: "from-cyan-500 to-blue-500" },
  { key: "card2" as const, image: "/images/digital1-twin.jpg", alt: "Digital Twin",         icon: <GitBranch className="w-3 h-3" />, color: "from-blue-500 to-indigo-500" },
  { key: "card3" as const, image: "/images/robotics.jpg",      alt: "Robotics Integration", icon: <Zap className="w-3 h-3" />,       color: "from-indigo-500 to-purple-500" },
];

// Static position/size data per card — keeps JSX clean.
const CARD_POSITIONS = [
  "top-0 left-0 w-[78%] sm:w-[68%] h-[200px] sm:h-[230px]",
  "top-[30%] right-0 w-[82%] sm:w-[72%] h-[210px] sm:h-[240px]",
  "bottom-0 left-[10%] sm:left-[18%] w-[72%] sm:w-[62%] h-[175px] sm:h-[195px]",
];

export default function AboutMalusRobotics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations("about_section");
  const { locale } = useParams();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Text parallax
  const titleY       = useTransform(scrollYProgress, [0, 0.3],  [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Card scroll parallax — used only when reduceMotion is false
  const card1Y = useTransform(scrollYProgress, [0, 1], [80,  -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [20,  -80]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [120, -30]);
  const cardScrollYs = [card1Y, card2Y, card3Y];

  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const bgShift     = useTransform(scrollYProgress, [0, 1],   [0, -40]);

  const words = [t("word1"), t("word2"), t("word3")];

  

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-950 text-white overflow-hidden py-24 sm:py-32 md:py-36 lg:py-44 xl:py-52"
    >

      {/* ── BACKGROUND WATERMARK ── */}
      {/* overflow-hidden on the wrapper prevents the text escaping on large screens */}
      <div className="absolute top-10 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          style={reduceMotion ? {} : { y: bgShift }}
          className="text-[clamp(80px,12vw,200px)] font-black text-white/[0.025] leading-none tracking-tighter"
        >
          AUTOMATION
        </motion.div>
      </div>

      {/* ── ANIMATED GRID + GLOWS ── */}
      {!reduceMotion && (
        <motion.div style={{ opacity: glowOpacity }} className="absolute inset-0 pointer-events-none">

          {/* Scrolling grid */}
          <motion.div
            className="absolute inset-0"
            animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Breathing glows */}
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08], x: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-60 -left-60 w-[900px] h-[900px] bg-cyan-500/20 blur-[220px] rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.06, 0.14, 0.06], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute -bottom-60 -right-60 w-[800px] h-[800px] bg-indigo-500/15 blur-[220px] rounded-full"
          />

          {/* Scan line */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 8, repeat: Infinity, repeatDelay: 12, ease: "linear" }}
            className="absolute top-[45%] left-0 w-[30%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          />
        </motion.div>
      )}

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 xl:gap-32 items-center">

        {/* ── LEFT: TEXT ── */}
        <motion.div style={reduceMotion ? {} : { opacity: titleOpacity, y: titleY }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-[2px] bg-cyan-400 rounded-full"
            />
            <span className="text-[11px] sm:text-xs font-black tracking-[0.55em] text-cyan-400 uppercase">
              {t("label")}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[1.06]">
            {t("heading")}
          </h2>

          {/* Animated gradient words */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}

            {/* Blinking cursor — hidden for reduced-motion users */}
            {!reduceMotion && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.1, repeat: Infinity }}
                aria-hidden="true"
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black text-cyan-400"
              >
                ▍
              </motion.span>
            )}
          </div>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-10 max-w-xl space-y-6"
          >
            <p className="text-lg text-slate-300 leading-[1.85]">{t("para1")}</p>

            {/* Divider with label */}
            <div className="flex items-center gap-3 py-1">
              <span className="w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
              <span className="text-xs tracking-[0.4em] text-cyan-400/80 uppercase font-medium">
                {t("principles_label")}
              </span>
              <span className="flex-1 h-px bg-white/5" />
            </div>

            <p className="text-lg text-slate-300 leading-[1.85]">{t("para2")}</p>
          </motion.div>


          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center gap-4"
          >
            <Link href={`/${locale}/about`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border border-cyan-400/30 bg-white/5 backdrop-blur-lg hover:border-cyan-400/70 hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover shimmer */}
                <motion.span
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
                />
                <span className="relative z-10">{t("read_more")}</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Bottom accent line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "10rem", opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-10 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent rounded-full"
          />
        </motion.div>

        {/* ── RIGHT: FLOATING CARDS ── */}
        <div className="relative h-[440px] sm:h-[500px] lg:h-[560px] xl:h-[600px]">

          {CARDS.map((card, i) => {
            const isHovered = hoveredCard === i;

            return (
              /*
               * FIX 1: style prop conflict resolved — zIndex now lives inside
               * the motion.div style, and the scroll-y transform is applied via
               * a separate inner wrapper so whileHover lift doesn't fight it.
               *
               * FIX 2: whileHover y lift moved to an inner wrapper so it
               * composes with the outer scroll-driven y cleanly.
               */
              <motion.div
                key={card.key}
                style={{
                  y: reduceMotion ? 0 : cardScrollYs[i],
                  zIndex: isHovered ? 20 : 10 - i,
                  position: "absolute",
                }}
                className={`${CARD_POSITIONS[i]} rounded-2xl overflow-hidden`}
              >
                {/* Inner wrapper handles hover lift independently */}
                <motion.div
                  className="relative h-full w-full"
                  animate={{ y: isHovered ? -14 : 0, scale: isHovered ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  // Keyboard accessibility
                  role="img"
                  aria-label={card.alt}
                  tabIndex={0}
                  onFocus={() => setHoveredCard(i)}
                  onBlur={() => setHoveredCard(null)}
                >
                  {/* Outer glow ring on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden="true"
                        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${card.color} opacity-40 blur-[3px] z-0`}
                      />
                    )}
                  </AnimatePresence>

                  {/* Card inner */}
                  {/*
                   * FIX 3: added "group" class so Image's group-hover:scale-110 fires correctly.
                   */}
                  <div className="group relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                    {/* Top accent bar */}
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden="true"
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.color}`}
                    />

                    {/* Bottom label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-20`}>
                          <span className="text-white" aria-hidden="true">{card.icon}</span>
                        </div>
                        <span className="text-[11px] font-bold tracking-[0.3em] text-white/90 uppercase">
                          {t(card.key)}
                        </span>
                      </div>

                      {/* Hover arrow */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            aria-hidden="true"
                            className="text-white/70"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Corner decoration */}
                    <div aria-hidden="true" className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/20 rounded-tr-lg pointer-events-none" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Connecting dots decoration */}
          <div aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-30">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={reduceMotion ? {} : { opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="w-1 h-1 rounded-full bg-cyan-400"
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}