"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";

/* ── reusable animated section wrapper ── */
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── section heading with accent line ── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-[2px] bg-cyan-500" />
        <div className="w-3 h-[2px] bg-cyan-300" />
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{children}</h2>
    </div>
  );
}

/* ── bullet list item ── */
function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-slate-600 leading-relaxed">
      <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-1 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

/* ── numbered process step ── */
function ProcessStep({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: num * 0.08, duration: 0.6 }}
      className="flex items-start gap-5 group"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-cyan-600 transition-colors duration-300 flex items-center justify-center">
        <span className="text-xs font-black text-white">0{num}</span>
      </div>
      <div className="pt-2 text-slate-600 leading-relaxed">{children}</div>
    </motion.li>
  );
}

export default function BigProjectPage() {
  const t = useTranslations("project_assembly");
  const { locale } = useParams();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const objectives = ["obj1","obj2","obj3","obj4","obj5"] as const;
  const scopeA     = ["scope1","scope2","scope3","scope4"] as const;
  const scopeB     = ["scope5","scope6","scope7","scope8"] as const;
  const archA      = ["arch1","arch2","arch3","arch4"] as const;
  const archB      = ["arch5","arch6","arch7","arch8"] as const;
  const process    = ["proc1","proc2","proc3","proc4","proc5","proc6"] as const;
  const results    = ["res1","res2","res3","res4","res5"] as const;

  return (
    <main className="bg-[#f8fafc] text-slate-900 overflow-x-hidden">

      {/* ── HERO TEXT ── */}
      <section className="max-w-7xl mx-auto px-6 pt-36 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Back link */}
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-600 transition mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-cyan-500" />
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-600">{t("eyebrow")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.0] tracking-tight text-slate-900 max-w-5xl">
            {t("h1_line1")}
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t("h1_line2")}
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg text-slate-500 leading-relaxed">{t("hero_desc")}</p>

          {/* Meta pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {(["meta1","meta2","meta3"] as const).map((k) => (
              <div key={k} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
                <ChevronRight className="w-3 h-3 text-cyan-500" />
                <span className="text-xs font-semibold text-slate-500">{t(`${k}_label` as any)}</span>
                <span className="text-xs font-bold text-slate-900">{t(`${k}_val` as any)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── HERO IMAGE (parallax) ── */}
      <div ref={heroRef} className="max-w-7xl mx-auto px-6 mb-36">
        <div className="relative h-[460px] sm:h-[620px] rounded-[32px] overflow-hidden shadow-[0_60px_160px_rgba(0,0,0,0.22)]">
          <motion.div style={{ scale: heroScale }} className="absolute inset-0">
            <Image
              src="/images/robotics.jpg"
              alt="Automotive assembly line automation"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Floating corner badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4"
          >
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Project Status</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-white">Delivered & Operational</span>
            </div>
          </motion.div>

          {/* Top-right corner decorations */}
          <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none" />
        </div>
      </div>

      {/* ── PROJECT SUMMARY ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 mb-36">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Summary text */}
          <div className="lg:col-span-2">
            <SectionHeading>{t("summary_title")}</SectionHeading>
            <p className="text-slate-600 leading-[1.9] text-lg">{t("summary_desc")}</p>
          </div>

          {/* Meta sidebar */}
          <div className="space-y-1">
            {(["meta1","meta2","meta3"] as const).map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-cyan-100 transition-all duration-300"
              >
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                  {t(`${k}_label` as any)}
                </p>
                <p className="font-bold text-slate-900">{t(`${k}_val` as any)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── OBJECTIVES ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 mb-36">
        <SectionHeading>{t("objectives_title")}</SectionHeading>
        <ul className="space-y-4 max-w-3xl">
          {objectives.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
        </ul>
      </RevealSection>

      {/* ── SCOPE OF WORK ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 mb-36">
        <SectionHeading>{t("scope_title")}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          <ul className="space-y-4">
            {scopeA.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
          </ul>
          <ul className="space-y-4">
            {scopeB.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
          </ul>
        </div>
      </RevealSection>

      {/* ── SYSTEM ARCHITECTURE ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 mb-36">
        <SectionHeading>{t("arch_title")}</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[archA, archB].map((group, gi) => (
            <div key={gi} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-4">
              {group.map((k) => (
                <div key={k} className="flex items-start gap-3">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                  <p className="text-slate-600 text-sm leading-relaxed">{t(k)}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── ENGINEERING PROCESS ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 mb-36">
        <SectionHeading>{t("process_title")}</SectionHeading>
        <ol className="space-y-6 max-w-3xl">
          {process.map((k, i) => (
            <ProcessStep key={k} num={i + 1}>{t(k)}</ProcessStep>
          ))}
        </ol>
      </RevealSection>

      {/* ── RESULTS ── */}
      <RevealSection className="max-w-7xl mx-auto px-6 pb-44">
        <SectionHeading>{t("results_title")}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {results.map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-lg hover:border-cyan-100 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-8 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 mb-4 group-hover:w-12 transition-all duration-300" />
              <p className="text-slate-700 text-sm leading-relaxed font-medium">{t(k)}</p>
            </motion.div>
          ))}
        </div>
      </RevealSection>

    </main>
  );
}