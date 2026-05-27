"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

function AboutSection({ title, subtitle, content }: { title: string; subtitle?: string; content: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} className="min-h-[80vh] flex items-center bg-[#f7f9fc]">
      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto px-6">
        <span className="text-xs tracking-[0.4em] uppercase text-cyan-600">{subtitle}</span>
        <h2 className="mt-6 text-5xl sm:text-6xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-8 text-xl text-slate-600 leading-relaxed">{content}</p>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  const t = useTranslations("about_page");
  const { locale } = useParams();

  const principles = [
    { title: t("p1_title"), description: t("p1_desc") },
    { title: t("p2_title"), description: t("p2_desc") },
    { title: t("p3_title"), description: t("p3_desc") },
  ];

  return (
    <main className="bg-[#f7f9fc] overflow-hidden">
      <section className="min-h-[90vh] flex items-center text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs tracking-[0.45em] uppercase text-cyan-600">
            {t("hero_eyebrow")}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }} className="mt-8 text-6xl sm:text-7xl font-semibold text-slate-900">
            {t("hero_h1_line1")}<br /><span className="text-slate-500">{t("hero_h1_line2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.6 }} className="mt-10 text-xl text-slate-600">
            {t("hero_desc")}
          </motion.p>
        </div>
      </section>

      <AboutSection subtitle={t("who_subtitle")} title={t("who_title")} content={t("who_content")} />
      <AboutSection subtitle={t("how_subtitle")} title={t("how_title")} content={t("how_content")} />

      <section className="py-32 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs tracking-[0.4em] uppercase text-cyan-600">{t("principles_eyebrow")}</span>
          <h2 className="mt-6 text-5xl sm:text-6xl font-semibold text-slate-900">{t("principles_title")}</h2>
          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {principles.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }} className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
                <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-blue-500 mb-6" />
                <h3 className="text-xl font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-4 text-slate-600">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <p className="text-sm tracking-widest text-slate-500 uppercase">{t("cta_eyebrow")}</p>
          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold text-slate-900">{t("cta_title")}</h2>
          <Link href={`/${locale}/contact`} className="inline-block mt-10 px-10 py-4 rounded-full bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition">
            {t("cta_button")}
          </Link>
        </div>
      </section>
    </main>
  );
}