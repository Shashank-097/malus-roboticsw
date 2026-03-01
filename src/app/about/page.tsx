"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

/* ================= CORE VALUES ================= */
const principles = [
  {
    title: "Engineering First",
    description:
      "We approach automation as an engineering discipline — not a product catalog. Every system is designed for reliability, determinism, and long-term performance.",
  },
  {
    title: "Built for Industry",
    description:
      "Our solutions are engineered for real factory floors — continuous operation, harsh environments, and mission-critical production systems.",
  },
  {
    title: "Lifecycle Thinking",
    description:
      "We design systems that scale, evolve, and remain maintainable across years of production — not short-term demos.",
  },
];

/* ================= ABOUT SECTION ================= */
function AboutSection({
  title,
  subtitle,
  content,
}: {
  title: string;
  subtitle?: string;
  content: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={ref}
      className="min-h-[80vh] flex items-center bg-[#f7f9fc]"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-5xl mx-auto px-6"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-cyan-600">
          {subtitle}
        </span>

        <h2 className="mt-6 text-5xl sm:text-6xl font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-8 text-xl text-slate-600 leading-relaxed">
          {content}
        </p>
      </motion.div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function AboutPage() {
  return (
    <main className="bg-[#f7f9fc] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="min-h-[90vh] flex items-center text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.45em] uppercase text-cyan-600"
          >
            About Maluce Robotics
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-8 text-6xl sm:text-7xl font-semibold text-slate-900"
          >
            Engineering
            <br />
            <span className="text-slate-500">Automation Systems</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-10 text-xl text-slate-600"
          >
            We design and deliver industrial automation systems engineered
            for reliability, precision, and long-term production performance.
          </motion.p>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <AboutSection
        subtitle="Who We Are"
        title="An Engineering-Driven Automation Company"
        content="Maluce Robotics is an industrial automation engineering firm focused on designing, programming, and commissioning control systems for modern manufacturing environments. We specialize in PLC programming, robotics integration, motion control, and digitally validated automation systems."
      />

      {/* ================= HOW WE THINK ================= */}
      <AboutSection
        subtitle="How We Think"
        title="Systems, Not Components"
        content="We don’t treat automation as isolated hardware or software. Every project is approached as a complete system — control logic, motion, safety, data, and lifecycle support working together as a single engineered solution."
      />

      {/* ================= PRINCIPLES ================= */}
      <section className="py-32 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs tracking-[0.4em] uppercase text-cyan-600">
            Our Principles
          </span>

          <h2 className="mt-6 text-5xl sm:text-6xl font-semibold text-slate-900">
            How We Engineer
          </h2>

          <div className="mt-20 grid md:grid-cols-3 gap-12">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-blue-500 mb-6" />

                <h3 className="text-xl font-semibold text-slate-900">
                  {p.title}
                </h3>

                <p className="mt-4 text-slate-600">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <p className="text-sm tracking-widest text-slate-500 uppercase">
            Let’s work together
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-semibold text-slate-900">
            Ready to Engineer Your Automation System?
          </h2>

          <Link
            href="/contact"
            className="inline-block mt-10 px-10 py-4 rounded-full bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition"
          >
            Contact Maluce Robotics
          </Link>
        </div>
      </section>
    </main>
  );
}