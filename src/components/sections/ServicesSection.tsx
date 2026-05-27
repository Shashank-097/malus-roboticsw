"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function ServicesSection() {
  const t = useTranslations("services_section");
  const { locale } = useParams();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const glowLeft = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowRight = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const services = [
    { id: "01", title: t("s1_title"), subtitle: t("s1_subtitle"), slug: "plc-programming",      image: "/images/plc.jpg",            industries: ["Automotive", "FMCG", "Pharma"] },
    { id: "02", title: t("s2_title"), subtitle: t("s2_subtitle"), slug: "motion-control",        image: "/images/motion-control.jpg",  industries: ["Automotive", "Electronics", "Packaging"] },
    { id: "03", title: t("s3_title"), subtitle: t("s3_subtitle"), slug: "quality-control",       image: "/images/quality-control.jpg", industries: ["Pharma", "Electronics"] },
    { id: "04", title: t("s4_title"), subtitle: t("s4_subtitle"), slug: "real-time-monitoring",  image: "/images/scada.jpg",           industries: ["Manufacturing", "Energy"] },
    { id: "05", title: t("s5_title"), subtitle: t("s5_subtitle"), slug: "smart-automation",      image: "/images/smart-automation.jpg",industries: ["Logistics", "FMCG"] },
    { id: "06", title: t("s6_title"), subtitle: t("s6_subtitle"), slug: "smart-factory",         image: "/images/smart-factory.jpg",   industries: ["Automotive", "Electronics"] },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8fafc] py-36 overflow-hidden"
    >
      {/* PARALLAX GRID */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:110px_110px]"
      />

      {/* GLOW ORBS */}
      <motion.div style={{ x: glowLeft }} className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-200/40 blur-[180px] rounded-full" />
      <motion.div style={{ x: glowRight }} className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/40 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-cyan-500" />
            <span className="text-xs tracking-[0.4em] text-cyan-600 uppercase">{t("eyebrow")}</span>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight">
            {t("title_line1")}
            <br />
            <span className="text-slate-400 font-medium">{t("title_line2")}</span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">{t("desc")}</p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={`/${locale}/services/${service.slug}`} className="block h-full">
                <div className="relative h-[460px] rounded-[28px] overflow-hidden bg-white border border-slate-100/80 shadow-[0_20px_60px_rgba(0,0,0,0.07)] transition-all duration-700 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.15)] group-hover:-translate-y-2">

                  {/* IMAGE */}
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* ID + Arrow */}
                    <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                      <span className="text-white/60 text-sm font-mono tracking-widest">{service.id}</span>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2"
                      >
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>

                    {/* Cyan accent line on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-7 flex flex-col justify-between h-[200px]">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1.5 font-medium">{service.subtitle}</p>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {service.industries.map((industry, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-3 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-100 transition-colors duration-300"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>

                    {/* CTA ROW */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          initial={{ width: 24 }}
                          whileInView={{ width: 24 }}
                          whileHover={{ width: 80 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-cyan-600 transition-colors duration-300">
                        {t("read_more")}
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}