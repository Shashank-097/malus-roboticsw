"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ================= SERVICES ================= */
const services = [
  {
    slug: "plc-programming",
    kicker: "Control Layer",
    title: "PLC Programming",
    subtitle: "Deterministic industrial control systems",
    description:
      "Robust PLC architectures engineered for uptime, safety, and scalable industrial automation.",
    image: "/images/plc.jpg",
    specs: ["IEC 61131-3", "High Availability", "Modular Logic"],
  },
  {
    slug: "motion-control",
    kicker: "Motion Layer",
    title: "Motion Control",
    subtitle: "High-precision synchronized motion",
    description:
      "Advanced servo and motion control solutions delivering speed, accuracy, and repeatability.",
    image: "/images/motion-control.jpg",
    specs: ["Multi-Axis", "Servo Tuning", "Cam Profiles"],
  },
  {
    slug: "quality-control",
    kicker: "Inspection Layer",
    title: "Quality Control",
    subtitle: "Vision-based inspection systems",
    description:
      "Automated inspection ensuring consistent quality using sensors, vision, and analytics.",
    image: "/images/quality-control.jpg",
    specs: ["Machine Vision", "Inline QC", "Traceability"],
  },
  {
    slug: "real-time-monitoring",
    kicker: "Visibility Layer",
    title: "Real-Time Monitoring",
    subtitle: "Live production visibility",
    description:
      "SCADA and monitoring systems providing real-time insight into machines and plants.",
    image: "/images/scada.jpg",
    specs: ["SCADA", "Dashboards", "Data Logging"],
  },
  {
    slug: "smart-automation",
    kicker: "Adaptation Layer",
    title: "Smart Automation",
    subtitle: "Flexible & adaptive systems",
    description:
      "Automation systems designed to adapt to changing production requirements.",
    image: "/images/smart-automation.jpg",
    specs: ["Flexible Lines", "Scalable Logic", "Optimization"],
  },
  {
    slug: "smart-factory",
    kicker: "Digital Layer",
    title: "Smart Factory",
    subtitle: "Industry 4.0 manufacturing",
    description:
      "End-to-end smart factory architectures integrating automation, data, and analytics.",
    image: "/images/smart-factory.jpg",
    specs: ["Industry 4.0", "Connected Systems", "Analytics"],
  },
];

/* ================= SERVICE BLOCK ================= */
function ServiceBlock({ service }: { service: (typeof services)[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8], [0, 1, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-300/20 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        {/* TEXT */}
        <motion.div style={{ y: textY, opacity }}>
          <span className="text-xs tracking-[0.35em] uppercase text-cyan-600">
            {service.kicker}
          </span>

          <h2 className="mt-6 text-5xl sm:text-6xl font-semibold text-slate-900 leading-tight">
            {service.title}
          </h2>

          <p className="mt-4 text-xl text-slate-500">
            {service.subtitle}
          </p>

          <p className="mt-8 text-lg text-slate-600 max-w-xl">
            {service.description}
          </p>

          {/* specs */}
          <div className="mt-8 flex flex-wrap gap-3">
            {service.specs.map((spec, i) => (
              <motion.span
                key={spec}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-sm border border-cyan-100"
              >
                {spec}
              </motion.span>
            ))}
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="inline-block mt-10 text-cyan-600 font-medium group"
          >
            View Detailed Service
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          style={{ y: imageY, opacity }}
          className="relative h-[520px] rounded-[32px] overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.18)]"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function ServicesPage() {
  return (
    <main className="bg-[#f7f9fc]">
      {/* INTRO */}
      <section className="min-h-[80vh] flex items-center text-center">
        <div className="max-w-5xl mx-auto px-6">
          <span className="text-xs tracking-[0.45em] uppercase text-cyan-600">
            Our Capabilities
          </span>

          <h1 className="mt-8 text-6xl sm:text-7xl font-semibold text-slate-900 leading-tight">
            Automation
            <br />
            <span className="text-slate-500">Layer by Layer</span>
          </h1>

          <p className="mt-10 text-xl text-slate-600">
            Scroll to explore how each automation layer comes together
            to build reliable, future-ready industrial systems.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      {services.map((service) => (
        <ServiceBlock key={service.slug} service={service} />
      ))}

      {/* CTA */}
      <section className="min-h-[70vh] flex items-center justify-center text-center">
        <div>
          <p className="text-sm tracking-widest text-slate-500 uppercase">
            Ready to build?
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-900">
            Let’s Engineer Your Automation System
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