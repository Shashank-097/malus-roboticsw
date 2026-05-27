"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function LookbookSection() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("lookbook");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1]  as [number, number, number, number]} },
  };

  const cards = [
    {
      image: "/images/plc.jpg",
      eyebrow: t("card2_eyebrow"),
      desc: t("card2_desc"),
      accent: "from-cyan-500 to-blue-500",
    },
    {
      image: "/images/digital1-twin.jpg",
      eyebrow: t("card3_eyebrow"),
      desc: t("card3_desc"),
      accent: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#04080f] py-32 sm:py-40 lg:py-52 overflow-hidden"
    >
      {/* ANIMATED GRID */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        animate={reduceMotion ? {} : { backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* AMBIENT GLOWS */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-60 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-cyan-500/10 blur-[200px] rounded-full pointer-events-none"
      />
      <div className="absolute bottom-0 -right-40 w-[600px] h-[600px] bg-blue-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-indigo-500/8 blur-[160px] rounded-full pointer-events-none" />

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >

        {/* HEADER */}
        <motion.div variants={fadeUp} className="max-w-3xl mb-20 lg:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-cyan-400" />
            <span className="text-xs uppercase tracking-[0.45em] text-cyan-400">{t("eyebrow")}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-white">
            {t("title_line1")}
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {t("title_line2")}
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
            {t("desc")}
          </p>
        </motion.div>

        {/* HERO CARD */}
        <motion.div
          variants={fadeUp}
          className="relative h-[380px] sm:h-[480px] lg:h-[580px] rounded-[32px] overflow-hidden mb-6 group"
        >
          <Image
            src="/images/robotics.jpg"
            alt="Industrial robotics"
            fill
            priority
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />

          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Top-right badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/80 font-medium tracking-widest uppercase">Systems Online</span>
          </motion.div>

          {/* Scan line decoration */}
          {!reduceMotion && (
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "linear" }}
              className="absolute top-[40%] left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
            />
          )}

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
            <div className="flex items-end justify-between gap-6">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 px-6 py-5 rounded-2xl max-w-sm">
                <span className="block text-xs uppercase tracking-[0.35em] text-cyan-300 mb-2">
                  {t("card1_eyebrow")}
                </span>
                <span className="block text-white text-sm leading-relaxed">
                  {t("card1_desc")}
                </span>
              </div>

              {/* Corner accent lines */}
              <div className="hidden sm:flex flex-col items-end gap-1 opacity-40">
                <div className="w-16 h-px bg-cyan-400" />
                <div className="w-10 h-px bg-cyan-400/60" />
                <div className="w-6 h-px bg-cyan-400/30" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* LOWER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative h-[260px] sm:h-[320px] rounded-[24px] overflow-hidden group cursor-default"
            >
              <Image
                src={card.image}
                alt={card.eyebrow}
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
              />

              {/* Hover shimmer */}
              {!reduceMotion && (
                <motion.div
                  initial={{ opacity: 0, x: "-100%" }}
                  whileHover={{ opacity: 1, x: "100%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-10"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Top gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-4 h-[2px] bg-gradient-to-r ${card.accent}`} />
                  <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">{card.eyebrow}</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>

      {/* BOTTOM DIVIDER */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
    </section>
  );
}