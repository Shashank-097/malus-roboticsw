"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Code2, Lightbulb, Globe, ArrowRight, Activity, Zap, ShieldCheck, Binary, Server, Palette, Monitor, Gift, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

export default function ITServicesPage() {
  const t = useTranslations("it_page");
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const metrics = [
    { label: t("metric1_label"), value: t("metric1_val"), icon: <Activity className="w-4 h-4" />, color: "text-emerald-400" },
    { label: t("metric2_label"), value: t("metric2_val"), icon: <Zap className="w-4 h-4" />,      color: "text-amber-400" },
    { label: t("metric3_label"), value: t("metric3_val"), icon: <ShieldCheck className="w-4 h-4" />, color: "text-cyan-400" },
  ];

  const serviceCards = [
    { title: t("s1_title"), desc: t("s1_desc"), icon: <Globe className="w-5 h-5" />,   tag: t("s1_tag"), num: "01" },
    { title: t("s2_title"), desc: t("s2_desc"), icon: <Server className="w-5 h-5" />,  tag: t("s2_tag"), num: "02" },
    { title: t("s3_title"), desc: t("s3_desc"), icon: <Palette className="w-5 h-5" />, tag: t("s3_tag"), num: "03" },
    { title: t("s4_title"), desc: t("s4_desc"), icon: <Lightbulb className="w-5 h-5" />, tag: t("s4_tag"), num: "04" },
  ];

  const technologies = ["Next.js", "React", "Node.js", "Python", "AWS", "PostgreSQL", "Tailwind CSS", "TypeScript", "Docker", "OpenAI"];

  return (
    <main className="relative min-h-screen bg-[#080C10] text-white overflow-x-hidden">

      {/* ── NOISE TEXTURE OVERLAY ── */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.032]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px 128px" }}
      />

      {/* ── PRECISION GRID ── */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── OFFER BANNER ── */}
      <div className="relative z-20 w-full border-b border-white/5 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center gap-4 flex-wrap">
          <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-slate-400 flex items-center gap-2 uppercase">
            <Gift className="w-3.5 h-3.5 text-cyan-400" />
            {t("offer_banner")}
          </p>
          <Link href="/contact"
            className="font-mono text-[10px] uppercase tracking-widest border border-cyan-500/50 text-cyan-400 px-4 py-1.5 hover:bg-cyan-500/10 transition-colors"
          >
            {t("offer_claim")} →
          </Link>
        </div>
      </div>

      <div className="relative z-10">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-32 pb-24 px-6 md:px-16 max-w-[1600px] mx-auto">

          {/* Large background number */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[clamp(180px,22vw,400px)] font-black text-white/[0.018] select-none pointer-events-none leading-none tracking-tighter pr-8">
            IT
          </div>

          <motion.div style={{ y: heroY }} className="relative">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="w-8 h-px bg-cyan-500" />
              <span className="font-mono text-[10px] tracking-[0.5em] text-cyan-400 uppercase">{t("badge")}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">

              {/* Heading */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="font-black text-[clamp(48px,8vw,120px)] leading-[0.88] tracking-tighter"
                >
                  {t("h1_line1")}
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(34,211,238,0.6)" }}>
                    {t("h1_line2")}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="mt-8 text-slate-400 text-lg leading-relaxed max-w-xl font-light"
                >
                  {t("hero_desc")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <Link href="/contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 text-[#080C10] font-black text-sm tracking-wider uppercase hover:bg-cyan-400 transition-colors"
                  >
                    {t("cta_start")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="inline-flex items-center gap-2 px-6 py-4 border border-white/10 text-slate-500 text-xs font-mono">
                    <Binary className="w-3.5 h-3.5 text-cyan-500/60" />
                    {t("secure_stack")}
                  </div>
                </motion.div>
              </div>

              {/* Dashboard card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block border border-white/8 bg-[#0D1117] relative"
              >
                {/* Corner marks */}
                {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                  <span key={i} className={`absolute w-3 h-3 border-cyan-500/50 ${cls}`} />
                ))}

                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-slate-600" />
                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">{t("dashboard_title")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {t("dashboard_stable")}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                      <div className={`flex items-center gap-2 ${m.color}`}>
                        {m.icon}
                        <span className="font-mono text-xs text-slate-500">{m.label}</span>
                      </div>
                      <span className="font-mono text-sm font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 pt-0">
                  <div className="bg-black/40 border border-white/5 p-4 font-mono text-[10px] leading-6">
                    <p className="text-slate-600"># Initializing AI Core...</p>
                    <p className="text-emerald-400">$ node server.js --env production</p>
                    <p className="text-cyan-400">Ready: Port 3000 <span className="text-emerald-400">[OK]</span></p>
                    <p className="text-slate-600 flex items-center gap-1">
                      <span className="inline-block w-2 h-3 bg-cyan-400 animate-pulse" />
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            SERVICE CARDS
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-16 max-w-[1600px] mx-auto pb-40">

          <div className="flex items-end justify-between mb-16 border-b border-white/5 pb-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.4em] text-cyan-400 uppercase mb-3">{t("services_title")}</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                {t("services_subtitle_highlight")}
              </h2>
            </div>
            <p className="hidden md:block text-slate-500 text-sm max-w-xs text-right">{t("services_desc")}</p>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
          >
            {serviceCards.map((service) => (
              <motion.div
                key={service.num}
                variants={fadeInUp}
                className="group relative bg-[#080C10] p-8 hover:bg-[#0D1117] transition-colors duration-300 cursor-default"
              >
                {/* Number */}
                <span className="font-mono text-[10px] text-white/10 mb-6 block">{service.num}</span>

                {/* Icon */}
                <div className="mb-6 text-cyan-500/70 group-hover:text-cyan-400 transition-colors">
                  {service.icon}
                </div>

                {/* Tag */}
                <span className="font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase block mb-3">{service.tag}</span>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            DEMO SECTION
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-16 max-w-[1600px] mx-auto pb-40">

          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-[10px] tracking-[0.4em] text-emerald-400 uppercase">{t("demo_badge")}</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8">
                {t("demo_title1")}{" "}
                <span className="text-cyan-400">{t("demo_title2")}</span>
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(52,211,153,0.5)" }}>
                  {t("demo_title3")}
                </span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">{t("demo_desc")}</p>
              <Link href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-emerald-500/40 text-emerald-400 font-mono text-sm uppercase tracking-widest hover:bg-emerald-500/10 transition-colors"
              >
                {t("demo_claim")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] border border-white/8 overflow-hidden"
            >
              {/* Corner marks */}
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <span key={i} className={`absolute z-10 w-4 h-4 border-emerald-500/60 ${cls}`} />
              ))}

              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1400"
                alt="Employee Desk Demo"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080C10]/80 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="font-mono text-[9px] px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Gift className="w-2.5 h-2.5" /> {t("demo_tag1")}
                </span>
                <span className="font-mono text-[9px] px-2 py-1 bg-black/40 border border-white/10 text-slate-400 uppercase tracking-widest">
                  {t("demo_tag2")}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[9px] tracking-widest text-slate-500 uppercase mb-1">{t("demo_spotlight")}</p>
                <p className="font-black text-xl text-white tracking-tight">{t("demo_project_name")}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TECH STACK
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-16 max-w-[1600px] mx-auto pb-40">
          <p className="font-mono text-[10px] tracking-[0.5em] text-slate-600 uppercase mb-10 text-center">{t("stack_title")}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="px-5 py-2.5 border border-white/8 bg-white/[0.02] font-mono text-xs text-slate-500 hover:border-cyan-500/40 hover:text-cyan-400 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section className="px-6 md:px-16 max-w-[1600px] mx-auto pb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative border border-white/8 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-emerald-500/5 pointer-events-none" />

            {/* Scan line */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 6, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
              className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none"
            />

            {/* Corner marks */}
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
              <span key={i} className={`absolute w-5 h-5 border-cyan-500/40 ${cls}`} />
            ))}

            <div className="relative z-10 py-24 px-12 md:px-24 text-center">
              <p className="font-mono text-[10px] tracking-[0.5em] text-cyan-400/60 uppercase mb-6">Ready to Deploy</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.88] mb-8">
                {t("final_line1")}
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(34,211,238,0.7)" }}>
                  {t("final_line2")}
                </span>
              </h2>
              <p className="text-slate-500 mb-12 max-w-md mx-auto font-light leading-relaxed">{t("final_desc")}</p>
              <Link href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#080C10] font-black uppercase tracking-widest text-sm hover:bg-cyan-400 transition-colors"
              >
                {t("final_cta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="font-mono text-[10px] tracking-[0.5em] text-slate-700 uppercase">{t("footer_copy")}</p>
      </footer>

    </main>
  );
}