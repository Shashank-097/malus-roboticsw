"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Cpu, Box, Eye, Activity, Shield, Network,
  ArrowRight, ChevronRight, Plus,
  Zap, Settings, Radio, BarChart3, Wrench, Layers,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Magnetic button ─────────────────────────────────────── */
function MagneticButton({
  children, className, href,
}: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const move = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, [move, reset]);

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-flex">
      <Link href={href} className={className}>{children}</Link>
    </motion.div>
  );
}

export default function RoboticsPage() {
  const t = useTranslations("robotics_page");
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(heroProgress, [0, 1], [1.08, 1.02]);
  const headY = useTransform(heroProgress, [0, 1], [0, 80]);

  const capabilities = [
    {
      icon: <Cpu className="w-5 h-5" />,
      num: "01",
      title: t("cap1_title"),
      desc: t("cap1_desc"),
      features: ["Siemens S7", "Allen Bradley", "EtherCAT"],
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=900",
    },
    {
      icon: <Box className="w-5 h-5" />,
      num: "02",
      title: t("cap2_title"),
      desc: t("cap2_desc"),
      features: ["Fanuc", "Kuka", "ABB"],
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      num: "03",
      title: t("cap3_title"),
      desc: t("cap3_desc"),
      features: ["Cognex", "Keyence", "Deep Learning"],
      img: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=900",
    },
    {
      icon: <Network className="w-5 h-5" />,
      num: "04",
      title: t("cap4_title"),
      desc: t("cap4_desc"),
      features: ["Process Simulate", "RobotStudio", "Visual Components"],
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=900",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      num: "05",
      title: t("cap5_title"),
      desc: t("cap5_desc"),
      features: ["Assembly Lines", "Indexing Tables", "Pick & Place"],
      img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=900",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      num: "06",
      title: t("cap6_title"),
      desc: t("cap6_desc"),
      features: ["MQTT", "OPC-UA", "OEE Analytics"],
      img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900",
    },
  ];

  const extraServices = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Electrical Engineering",
      desc: "Panel design, power distribution, field instrumentation and full electrical documentation to IEC standards.",
      tags: ["IEC 60204", "EPLAN", "Control Panels"],
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Preventive Maintenance",
      desc: "Scheduled inspection programmes, predictive analytics and spare-parts management to maximise OEE.",
      tags: ["OEE", "CMMS", "Vibration Analysis"],
      img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <Radio className="w-5 h-5" />,
      title: "IIoT & Connectivity",
      desc: "Edge computing, SCADA integration and cloud dashboards bringing real-time visibility to every machine.",
      tags: ["MQTT", "OPC-UA", "AWS IoT"],
      img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Process Optimisation",
      desc: "Data-driven cycle-time analysis, bottleneck elimination and continuous improvement consultancy.",
      tags: ["Lean", "Six Sigma", "MES"],
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Retrofit & Modernisation",
      desc: "Upgrading legacy lines with modern controllers, safety systems and energy-efficiency packages.",
      tags: ["Retrofit", "TIA Portal", "Safety PLC"],
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Digital Twin",
      desc: "High-fidelity virtual commissioning and operator training environments built in Process Simulate.",
      tags: ["Siemens PS", "Unreal", "Unity"],
      img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const process = [
    {
      step: "01",
      label: "Discovery",
      desc: "Requirements audit, site survey and feasibility study.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    },
    {
      step: "02",
      label: "Engineering",
      desc: "Detailed design, simulation and virtual commissioning.",
      img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800",
    },
    {
      step: "03",
      label: "Integration",
      desc: "Build, factory acceptance testing and on-site installation.",
      img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    },
    {
      step: "04",
      label: "Optimise",
      desc: "Go-live support, OEE monitoring and continuous improvement.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    },
  ];

  const technologies = [
    "Siemens TIA", "Allen Bradley", "Fanuc", "Kuka", "ABB",
    "Cognex", "Keyence", "MQTT", "OPC-UA", "AWS IoT",
    "Python", "RobotStudio", "Process Simulate", "EPLAN", "Docker",
  ];

  const ticker = [...capabilities, ...extraServices, ...capabilities, ...extraServices];

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">

      {/* ══════════════════════════════════════════
          HERO — light, full-bleed, no stat boxes
          pt-[nav height] so it never overlaps navbar
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-slate-50"
        style={{ paddingTop: "var(--navbar-height, 72px)" }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.06) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(59,130,246,0.06) 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Soft radial accent — top right */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Soft radial accent — bottom left */}
        <div
          className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[1600px] mx-auto px-8 md:px-16 pt-20 pb-0 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left text */}
            <motion.div style={reduceMotion ? {} : { y: headY }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex items-center gap-3 mb-8"
              >
                <div
                  className="w-7 h-px"
                  style={{ background: "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.3))" }}
                />
                <span className="font-mono text-[9px] tracking-[0.6em] uppercase text-blue-500">
                  Industrial Automation
                </span>
              </motion.div>

              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease }}
                  className="font-black leading-[0.87] tracking-tighter text-slate-900"
                  style={{ fontSize: "clamp(52px,8vw,128px)" }}
                >
                  {t("h1_line1")}
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,#2563EB 0%,#0EA5E9 60%,#06B6D4 100%)",
                    }}
                  >
                    {t("h1_line2")}
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-slate-500 text-lg font-light leading-relaxed max-w-md mb-10"
              >
                {t("desc")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="flex flex-wrap gap-3"
              >
                <MagneticButton
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-4
                    bg-blue-600 text-white font-bold text-[11px] tracking-widest uppercase
                    hover:bg-blue-700 transition-colors duration-300
                    shadow-[0_8px_32px_rgba(37,99,235,0.25)]
                    hover:shadow-[0_12px_40px_rgba(37,99,235,0.35)]"
                >
                  {t("cta_consult")}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton
                  href="/services"
                  className="group inline-flex items-center gap-2.5 px-8 py-4
                    border border-slate-200 text-slate-500 font-mono text-[11px] tracking-widest uppercase
                    hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                    transition-all duration-300"
                >
                  Services
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </MagneticButton>
              </motion.div>

              {/* Badge strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex items-center gap-5 mt-12 pt-8 border-t border-slate-100"
              >
                {["ISO 9001", "IEC 62061", "PROFINET", "Industry 4.0"].map((b) => (
                  <span
                    key={b}
                    className="font-mono text-[9px] tracking-widest uppercase text-slate-400"
                  >
                    {b}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1, ease }}
              className="relative hidden lg:block"
            >
              {/* Main image card */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4/5",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                <Image
                  src="/images/robotics.jpg"
                  alt="Industrial Robotics"
                  fill
                  priority
                  className="object-cover"
                  style={reduceMotion ? {} : undefined}
                />
                {/* Subtle light overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(248,250,252,0.5) 0%, transparent 50%)",
                  }}
                />

                {/* Floating status chip */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="absolute top-6 left-6 flex items-center gap-2.5
                    bg-white/90 backdrop-blur-sm px-4 py-2.5
                    shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-slate-500">
                    Systems Online
                  </span>
                </motion.div>

                {/* Corner marks */}
                <span
                  className="absolute bottom-4 right-4 w-6 h-6"
                  style={{
                    borderBottom: "2px solid rgba(37,99,235,0.3)",
                    borderRight: "2px solid rgba(37,99,235,0.3)",
                  }}
                />
                <span
                  className="absolute top-4 right-4 w-6 h-6"
                  style={{
                    borderTop: "2px solid rgba(37,99,235,0.15)",
                    borderRight: "2px solid rgba(37,99,235,0.15)",
                  }}
                />
              </div>

              {/* Decorative offset block */}
              <div
                className="absolute -bottom-5 -left-5 w-1/2 h-1/3 -z-10"
                style={{ background: "linear-gradient(135deg,#EFF6FF,#DBEAFE)" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="relative z-10 pb-8 mt-16 flex justify-center">
          {!reduceMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative w-px h-10 overflow-hidden">
                <div className="absolute inset-0 bg-slate-200" />
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-0 h-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom,transparent,#3B82F6,transparent)",
                  }}
                />
              </div>
              <span className="font-mono text-[8px] tracking-[0.5em] uppercase text-slate-300">
                Scroll
              </span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-3.5"
        style={{
          background: "#F8FAFC",
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <motion.div
          animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {ticker.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-10">
              <span className="font-mono text-[8px] text-blue-300 tracking-widest">
                {"num" in c ? c.num : "—"}
              </span>
              <span className="font-semibold text-[10px] text-slate-300 tracking-[0.35em] uppercase">
                {c.title}
              </span>
              <span className="text-blue-200">◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          INTRO STRIP — no stats, just trust signals
      ══════════════════════════════════════════ */}
      <div className="border-b border-slate-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "End-to-End Delivery",
                desc: "From concept and simulation right through to commissioning and go-live support.",
                icon: <Layers className="w-5 h-5" />,
              },
              {
                label: "OEM-Agnostic",
                desc: "We work across all major brands — Siemens, Fanuc, ABB, Kuka and beyond.",
                icon: <Cpu className="w-5 h-5" />,
              },
              {
                label: "Safety-First Engineering",
                desc: "Every design certified to IEC 62061 and ISO 13849 functional safety standards.",
                icon: <Shield className="w-5 h-5" />,
              },
              {
                label: "Industry 4.0 Ready",
                desc: "OPC-UA, MQTT and cloud-native architectures built into every solution.",
                icon: <Radio className="w-5 h-5" />,
              },
            ].map(({ label, desc, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group"
              >
                <div
                  className="w-9 h-9 mb-4 flex items-center justify-center text-blue-600"
                  style={{
                    background: "#EFF6FF",
                    border: "1px solid #DBEAFE",
                  }}
                >
                  {icon}
                </div>
                <p className="font-bold text-slate-900 text-sm mb-1.5">{label}</p>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CAPABILITIES — accordion + sticky image
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">

          {/* Section header */}
          <div
            className="mb-20 pb-12 flex items-end gap-10"
            style={{ borderBottom: "1px solid #F1F5F9" }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-7 h-px"
                  style={{ background: "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.2))" }}
                />
                <span className="font-mono text-[9px] tracking-[0.55em] uppercase text-blue-500">
                  Core Capabilities
                </span>
              </div>
              <h2 className="font-black text-5xl md:text-7xl tracking-tighter text-slate-900 leading-[0.88]">
                What We{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#2563EB 0%,#0EA5E9 100%)",
                  }}
                >
                  Engineer
                </span>
              </h2>
            </div>
            <div className="hidden md:block flex-1 max-w-xs">
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {t("capabilities_desc")}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_460px] gap-20 items-start">

            {/* Accordion */}
            <div style={{ borderTop: "1px solid #F1F5F9" }}>
              {capabilities.map((cap, i) => (
                <div key={i} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center gap-6 py-6 text-left group"
                  >
                    <span
                      className="font-mono text-[9px] w-7 shrink-0 transition-colors duration-300"
                      style={{ color: open === i ? "#2563EB" : "#CBD5E1" }}
                    >
                      {cap.num}
                    </span>
                    <span
                      className="shrink-0 transition-colors duration-300"
                      style={{ color: open === i ? "#2563EB" : "#CBD5E1" }}
                    >
                      {cap.icon}
                    </span>
                    <span
                      className="font-black text-2xl md:text-3xl tracking-tight flex-1 transition-colors duration-300"
                      style={{
                        color:
                          open === i
                            ? "#0F172A"
                            : "#94A3B8",
                      }}
                    >
                      {cap.title}
                    </span>
                    <motion.div
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-300"
                      style={{
                        borderColor: open === i ? "#BFDBFE" : "#E2E8F0",
                        color: open === i ? "#2563EB" : "#CBD5E1",
                        background: open === i ? "#EFF6FF" : "transparent",
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pb-10 pl-[52px]">
                          <div
                            className="relative pl-5 mb-6"
                            style={{ borderLeft: "2px solid #BFDBFE" }}
                          >
                            <p className="text-slate-500 leading-relaxed font-light text-[17px]">
                              {cap.desc}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {cap.features.map((f) => (
                              <span
                                key={f}
                                className="font-mono text-[9px] tracking-widest uppercase px-3 py-1.5"
                                style={{
                                  border: "1px solid #BFDBFE",
                                  color: "#2563EB",
                                  background: "#EFF6FF",
                                }}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                          {/* Mobile image */}
                          <div className="aspect-[16/7] relative overflow-hidden lg:hidden shadow-lg mt-6">
                            <Image
                              src={cap.img}
                              alt={cap.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Sticky image panel */}
            <div className="hidden lg:block sticky top-28">
              <AnimatePresence mode="wait">
                {open !== null ? (
                  <motion.div
                    key={open}
                    initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                    transition={{ duration: 0.55, ease }}
                    className="relative aspect-[3/4] overflow-hidden"
                    style={{
                      boxShadow:
                        "0 32px 80px rgba(0,0,0,0.12),0 0 0 1px rgba(0,0,0,0.04)",
                    }}
                  >
                    <Image
                      src={capabilities[open].img}
                      alt={capabilities[open].title}
                      fill
                      className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top,rgba(15,23,42,0.75) 0%,rgba(15,23,42,0.2) 50%,transparent 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div
                        className="w-7 h-px mb-4"
                        style={{
                          background:
                            "linear-gradient(to right,#60A5FA,rgba(96,165,250,0.3))",
                        }}
                      />
                      <p className="font-mono text-[9px] tracking-widest uppercase mb-2 text-blue-300">
                        {capabilities[open].num} / 06
                      </p>
                      <p className="font-black text-2xl text-white tracking-tight mb-4">
                        {capabilities[open].title}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {capabilities[open].features.map((f) => (
                          <span
                            key={f}
                            className="font-mono text-[8px] px-2.5 py-1 uppercase tracking-wider"
                            style={{
                              border: "1px solid rgba(255,255,255,0.15)",
                              color: "rgba(255,255,255,0.55)",
                            }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className="absolute top-4 left-4 w-5 h-5"
                      style={{
                        borderTop: "2px solid rgba(96,165,250,0.5)",
                        borderLeft: "2px solid rgba(96,165,250,0.5)",
                      }}
                    />
                    <span
                      className="absolute bottom-4 right-4 w-5 h-5"
                      style={{
                        borderBottom: "2px solid rgba(96,165,250,0.5)",
                        borderRight: "2px solid rgba(96,165,250,0.5)",
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="aspect-[3/4] flex flex-col items-center justify-center gap-4"
                    style={{
                      border: "2px dashed #E2E8F0",
                      background: "#F8FAFC",
                    }}
                  >
                    <div className="w-8 h-px bg-slate-200" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-slate-300">
                      Select a capability
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL-BLEED STATEMENT — keeps dark for contrast
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "52vh" }}>
        <Image
          src="/images/plc.jpg"
          alt="PLC Automation"
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right,rgba(15,23,42,0.93) 0%,rgba(15,23,42,0.75) 50%,rgba(15,23,42,0.55) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom,rgba(15,23,42,0.4),transparent 30%,transparent 70%,rgba(15,23,42,0.7))",
          }}
        />
        {/* Fine grid on image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)," +
              "linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="h-px mb-8"
              style={{ background: "#60A5FA" }}
            />
            <p
              className="font-black text-white tracking-tight leading-[0.88]"
              style={{ fontSize: "clamp(36px,6vw,88px)" }}
            >
              Engineering
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#60A5FA 0%,#38BDF8 100%)",
                }}
              >
                Precision
              </span>{" "}
              at Scale.
            </p>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.55em] mt-6"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Zero Compromise · Every Project · Every Time
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXTENDED SERVICES — light section
      ══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-28 md:py-40" style={{ borderTop: "1px solid #E2E8F0" }}>
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">

          <div
            className="flex items-end justify-between mb-20 pb-12"
            style={{ borderBottom: "1px solid #E2E8F0" }}
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-7 h-px"
                  style={{ background: "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.2))" }}
                />
                <span className="font-mono text-[9px] tracking-[0.55em] uppercase text-blue-500">
                  Full Service Portfolio
                </span>
              </div>
              <h2 className="font-black text-5xl md:text-7xl tracking-tighter text-slate-900 leading-[0.88]">
                More We{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#2563EB 0%,#0EA5E9 100%)",
                  }}
                >
                  Deliver
                </span>
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden md:inline-flex items-center gap-2 font-mono text-[10px]
                tracking-widest uppercase text-slate-400 hover:text-blue-600 transition-colors"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Desktop hover-image list */}
          <div className="hidden lg:block relative">
            <AnimatePresence>
              {activeService !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, ease }}
                  className="fixed top-1/2 right-24 -translate-y-1/2 w-72 h-52 overflow-hidden z-40 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
                  }}
                >
                  <Image
                    src={extraServices[activeService].img}
                    alt={extraServices[activeService].title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(15,23,42,0.7),transparent)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-bold text-sm text-white">
                      {extraServices[activeService].title}
                    </p>
                  </div>
                  <span
                    className="absolute top-3 left-3 w-4 h-4"
                    style={{
                      borderTop: "1px solid rgba(96,165,250,0.6)",
                      borderLeft: "1px solid rgba(96,165,250,0.6)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {extraServices.map((svc, i) => (
              <motion.div
                key={i}
                onHoverStart={() => setActiveService(i)}
                onHoverEnd={() => setActiveService(null)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7 }}
                className="group flex items-center gap-8 py-7 cursor-default transition-colors duration-300"
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  background: activeService === i ? "#F0F9FF" : "transparent",
                }}
              >
                <span
                  className="font-mono text-[9px] w-7 transition-colors duration-300"
                  style={{
                    color: activeService === i ? "#2563EB" : "#CBD5E1",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  className="shrink-0 transition-colors duration-300"
                  style={{
                    color: activeService === i ? "#2563EB" : "#CBD5E1",
                  }}
                >
                  {svc.icon}
                </span>
                <span
                  className="font-black text-2xl tracking-tight flex-1 transition-colors duration-300"
                  style={{
                    color: activeService === i ? "#0F172A" : "#94A3B8",
                  }}
                >
                  {svc.title}
                </span>
                <p
                  className="text-sm font-light leading-relaxed max-w-sm transition-colors duration-300 hidden xl:block"
                  style={{
                    color: activeService === i ? "#475569" : "#CBD5E1",
                  }}
                >
                  {svc.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 ml-auto">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 transition-all duration-300"
                      style={{
                        border:
                          activeService === i
                            ? "1px solid #BFDBFE"
                            : "1px solid #E2E8F0",
                        color:
                          activeService === i ? "#2563EB" : "#CBD5E1",
                        background:
                          activeService === i ? "#EFF6FF" : "transparent",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ChevronRight
                  className="w-4 h-4 transition-all duration-300"
                  style={{
                    color: activeService === i ? "#2563EB" : "#E2E8F0",
                    transform:
                      activeService === i ? "translateX(4px)" : "translateX(0)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="grid md:grid-cols-2 gap-5 lg:hidden">
            {extraServices.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="group relative overflow-hidden bg-white"
                style={{
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={svc.img}
                    alt={svc.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(15,23,42,0.5),transparent)",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background:
                        "linear-gradient(to right,#2563EB,#0EA5E9)",
                    }}
                  />
                </div>
                <div className="p-6">
                  <div
                    className="mb-3 text-blue-500 transition-colors duration-300"
                  >
                    {svc.icon}
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed mb-4 text-slate-400">
                    {svc.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1"
                        style={{
                          border: "1px solid #BFDBFE",
                          color: "#2563EB",
                          background: "#EFF6FF",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS — light cards
      ══════════════════════════════════════════ */}
      <section
        className="bg-white py-28 md:py-40"
        style={{ borderTop: "1px solid #F1F5F9" }}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex items-center gap-4 mb-20">
            <div
              className="w-7 h-px"
              style={{
                background:
                  "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.2))",
              }}
            />
            <span className="font-mono text-[9px] tracking-[0.55em] uppercase text-blue-500">
              Our Process
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8, ease }}
                className="group relative overflow-hidden bg-white"
                style={{
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.label}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(248,250,252,0.9) 0%,rgba(248,250,252,0.3) 40%,transparent 100%)",
                    }}
                  />
                  <span
                    className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-blue-400"
                  >
                    {p.step}
                  </span>
                </div>
                <div
                  className="relative px-6 py-7"
                  style={{ borderTop: "1px solid #F1F5F9" }}
                >
                  {/* Top accent on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background:
                        "linear-gradient(to right,#2563EB,#0EA5E9)",
                    }}
                  />
                  {/* Ghost number */}
                  <span
                    className="absolute top-2 right-4 font-black text-7xl pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: "#EFF6FF", lineHeight: 1 }}
                  >
                    {p.step}
                  </span>
                  <p className="font-mono text-[9px] tracking-widest mb-3 text-blue-400">
                    {p.step}
                  </p>
                  <p className="font-black text-xl text-slate-900 mb-2">{p.label}</p>
                  <p className="text-sm font-light leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════ */}
      <div
        className="py-20 bg-slate-50"
        style={{
          borderTop: "1px solid #E2E8F0",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase text-center text-slate-300 mb-12">
            Technologies We Work With
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.04 }}
                className="px-5 py-2.5 font-mono text-xs cursor-default
                  bg-white text-slate-400
                  hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                  transition-all duration-200"
                style={{ border: "1px solid #E2E8F0" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CTA — split light + image
      ══════════════════════════════════════════ */}
      <section className="grid lg:grid-cols-2 min-h-[68vh]">

        {/* Image side */}
        <div className="relative h-72 lg:h-auto overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/robotics.jpg"
            alt="Industrial Robotics"
            fill
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left,transparent,rgba(248,250,252,0.9))",
            }}
          />
          {/* Decorative lines */}
          <span
            className="absolute top-6 left-6 w-7 h-7"
            style={{
              borderTop: "2px solid rgba(59,130,246,0.3)",
              borderLeft: "2px solid rgba(59,130,246,0.3)",
            }}
          />
          <span
            className="absolute bottom-6 right-6 w-7 h-7"
            style={{
              borderBottom: "2px solid rgba(59,130,246,0.2)",
              borderRight: "2px solid rgba(59,130,246,0.2)",
            }}
          />
        </div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="bg-white flex flex-col justify-center px-10 md:px-16 py-24 relative overflow-hidden order-1 lg:order-2"
          style={{ borderLeft: "1px solid #F1F5F9" }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.03) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(59,130,246,0.03) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Soft blue orb */}
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-7 h-px"
                style={{
                  background:
                    "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.2))",
                }}
              />
              <span className="font-mono text-[9px] tracking-[0.55em] uppercase text-blue-500">
                Ready to Deploy
              </span>
            </div>

            <h2
              className="font-black tracking-tighter text-slate-900 leading-[0.88] mb-8"
              style={{ fontSize: "clamp(40px,5.5vw,80px)" }}
            >
              {t("cta_title")}
            </h2>

            <p className="text-slate-400 text-[15px] leading-relaxed font-light mb-12 max-w-sm">
              {t("cta_desc")}
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-4
                  bg-blue-600 text-white font-bold text-[11px] tracking-widest uppercase
                  hover:bg-blue-700 transition-colors duration-300
                  shadow-[0_8px_32px_rgba(37,99,235,0.25)]
                  hover:shadow-[0_12px_40px_rgba(37,99,235,0.35)]"
              >
                {t("cta_button")}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </MagneticButton>
              <MagneticButton
                href="/services"
                className="group inline-flex items-center gap-3 px-10 py-4
                  border border-slate-200 text-slate-500 font-mono text-[11px] tracking-widest uppercase
                  hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                  transition-all duration-300"
              >
                All Services <ChevronRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "4rem" }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-16 h-px"
              style={{
                background:
                  "linear-gradient(to right,#3B82F6,rgba(59,130,246,0.2))",
              }}
            />
          </div>
        </motion.div>
      </section>

    </main>
  );
}