"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/* ================= DATA ================= */
const services = [
  {
    title: "PLC Programming – Intelligent Control for Industrial Automation",
    slug: "plc-programming",
    image: "/images/plc.jpg",
    industries: ["Automotive", "FMCG", "Pharma", "Heavy Engineering"],
  },
  {
    title: "Motion Control Engineering & Servo Systems",
    slug: "motion-control",
    image: "/images/motion-control.jpg",
    industries: ["Automotive", "Electronics", "Packaging"],
  },
  {
    title: "Automated Quality Control",
    slug: "quality-control",
    image: "/images/quality-control.jpg",
    industries: ["Pharma", "Electronics", "Food Processing"],
  },
  {
    title: "Real-Time Monitoring & Control",
    slug: "real-time-monitoring",
    image: "/images/scada.jpg",
    industries: ["Manufacturing", "Energy", "Process Plants"],
  },
  {
    title: "Smart Automation & Flexibility",
    slug: "smart-automation",
    image: "/images/smart-automation.jpg",
    industries: ["Warehousing", "Logistics", "FMCG"],
  },
  {
    title: "Smart Factory Solutions",
    slug: "smart-factory",
    image: "/images/smart-factory.jpg",
    industries: ["Automotive", "Electronics", "Industry 4.0"],
  },
];

/* ================= ANIMATION ================= */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ================= PARALLAX ================= */
  const sheetFar = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const sheetMid = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const gridMove = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const glowLeft = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const glowRight = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f7f9fc] py-32 overflow-hidden"
    >
      {/* ================= BACKGROUND LAYERS ================= */}
      <motion.div
        style={{ y: sheetFar }}
        className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f9fc] to-white"
      />
      <motion.div
        style={{ y: sheetMid }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120%] h-[420px]
                   bg-white/70 rotate-1
                   shadow-[0_30px_80px_rgba(0,0,0,0.04)]"
      />
      <motion.div
        style={{ y: sheetFar }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[380px]
                   bg-white/60 -rotate-1
                   shadow-[0_20px_60px_rgba(0,0,0,0.03)]"
      />
      <motion.div
        style={{ y: gridMove }}
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]
          bg-[size:120px_120px]
          opacity-40
        "
      />
      <motion.div
        style={{ y: glowLeft }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px]
                   bg-cyan-300/20 blur-[180px]"
      />
      <motion.div
        style={{ y: glowRight }}
        className="absolute bottom-0 -right-40 w-[520px] h-[520px]
                   bg-blue-300/20 blur-[180px]"
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs tracking-[0.3em] text-cyan-600 uppercase">
            Our Services
          </span>

          <h2 className="mt-5 text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">
            Automation Services
            <br />
            <span className="text-slate-500">
              Designed for Modern Industry
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Industry-focused automation solutions engineered for performance,
            reliability, and long-term scalability.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {services.map((service, i) => (
            <motion.article
              key={i}
              variants={item}
              className="relative group h-[420px]"
            >
              <Link
                href={`/services/${service.slug}`}
                className="absolute inset-0 z-20 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                aria-label={`View details for ${service.title}`}
              />

              {/* BACK LAYER */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-100/60 to-blue-100/60 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

              {/* MID LAYER */}
              <div className="absolute inset-0 rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] translate-x-1.5 translate-y-1.5 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />

              {/* FRONT CARD */}
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="relative h-full rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.1)] flex flex-col pointer-events-none"
              >
                {/* IMAGE */}
                <div className="relative h-56 shrink-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug group-hover:text-cyan-600 transition-colors">
                      {service.title}
                    </h3>

                    {/* TAGS */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.industries.map((industry, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100"
                        >
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACCENT LINE */}
                  <div className="mt-6 h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-blue-500" />
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}