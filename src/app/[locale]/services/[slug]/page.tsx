import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ================= SERVICE DATA ================= */
const services = {
  "plc-programming": {
    title: "PLC Programming – Intelligent Control for Industrial Automation",
    heroImage: "/images/plc.jpg",
    description:
      "We design and implement robust PLC control systems that form the backbone of modern industrial automation. Our solutions are engineered for uptime, scalability, and long-term operational stability.",
    highlights: [
      "IEC 61131-3 compliant programming",
      "High-availability control architecture",
      "Modular & scalable logic design",
      "Integration with SCADA & MES systems",
    ],
    industries: ["Automotive", "FMCG", "Pharma", "Heavy Engineering"],
    capabilities: [
      "PLC Logic Development",
      "SCADA / HMI Integration",
      "Alarm & Event Handling",
      "Industrial Networking",
      "On-site Commissioning",
    ],
  },

  "motion-control": {
    title: "Motion Control Engineering & Servo Systems",
    heroImage: "/images/motion-control.jpg",
    description:
      "Precision motion control solutions for high-speed, synchronized, and repeatable industrial operations using servo drives and advanced motion controllers.",
    highlights: [
      "Multi-axis synchronization",
      "High-speed servo tuning",
      "Cam & gearing applications",
      "Energy-efficient motion systems",
    ],
    industries: ["Automotive", "Electronics", "Packaging"],
    capabilities: [
      "Servo Drive Programming",
      "Motion Profile Optimization",
      "Mechanical–Electrical Coordination",
      "System Validation",
    ],
  },

  "quality-control": {
    title: "Automated Quality Control",
    heroImage: "/images/quality-control.jpg",
    description:
      "Automated inspection and quality assurance systems using sensors, vision, and analytics to ensure consistent product quality.",
    highlights: [
      "Vision-based inspection",
      "Inline defect detection",
      "Traceability & reporting",
    ],
    industries: ["Pharma", "Electronics", "Food Processing"],
    capabilities: [
      "Machine Vision Systems",
      "Quality Analytics",
      "Reject & Sorting Systems",
    ],
  },

  "real-time-monitoring": {
    title: "Real-Time Monitoring & Control",
    heroImage: "/images/scada.jpg",
    description:
      "Real-time monitoring and control systems that provide complete operational visibility across machines, production lines, and plants.",
    highlights: [
      "Live production dashboards",
      "Alarm & event monitoring",
      "Downtime and performance tracking",
      "Secure industrial data acquisition",
    ],
    industries: ["Manufacturing", "Energy", "Process Plants"],
    capabilities: [
      "SCADA System Design",
      "HMI Visualization",
      "Industrial Data Logging",
      "Remote Monitoring Solutions",
    ],
  },

  "smart-automation": {
    title: "Smart Automation & Flexibility",
    heroImage: "/images/smart-automation.jpg",
    description:
      "Flexible automation solutions engineered to adapt to changing production demands and enable scalable manufacturing.",
    highlights: [
      "Flexible production architecture",
      "Quick changeover systems",
      "Adaptive control strategies",
      "Data-driven automation",
    ],
    industries: ["Warehousing", "Logistics", "FMCG"],
    capabilities: [
      "Flexible Automation Design",
      "Adaptive PLC Logic",
      "System Scalability Planning",
      "Operational Optimization",
    ],
  },

  "smart-factory": {
    title: "Smart Factory Solutions",
    heroImage: "/images/smart-factory.jpg",
    description:
      "End-to-end smart factory solutions integrating automation, data, and analytics to enable Industry 4.0-ready manufacturing environments.",
    highlights: [
      "Industry 4.0 architecture",
      "Connected machines & systems",
      "Production intelligence",
      "Digital transformation roadmap",
    ],
    industries: ["Automotive", "Electronics", "Industry 4.0"],
    capabilities: [
      "Smart Factory Architecture",
      "System Integration",
      "Production Analytics",
      "Digital Transformation Consulting",
    ],
  },
};

/* ================= STATIC PARAMS ================= */
export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

/* ================= METADATA ================= */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

/* ================= PAGE ================= */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];

  if (!service) notFound();

  return (
    <section className="relative bg-[#f7f9fc] overflow-hidden">
      {/* HERO */}
      <div className="relative h-[420px]">
        <Image
          src={service.heroImage}
          alt={service.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 max-w-6xl w-full px-6">
          <Link
            href="/"
            className="text-sm text-cyan-300 hover:text-cyan-200 transition"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
            {service.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
          {service.description}
        </p>

        {/* HIGHLIGHTS */}
        <div className="mt-20">
          <h2 className="text-2xl font-semibold text-slate-900">
            Key Highlights
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            {service.highlights.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_14px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-500 to-blue-500 mb-4" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAPABILITIES & INDUSTRIES */}
        <div className="mt-24 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Technical Capabilities
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {service.capabilities.map((cap, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 w-2 h-2 bg-cyan-500 rounded-full" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Industries Served
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.industries.map((industry, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-sm border border-cyan-100"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-28 text-center">
          <p className="text-sm tracking-widest text-slate-500 uppercase">
            Ready to get started?
          </p>
          <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-slate-900">
            Let’s Design Your Automation System
          </h3>

          <Link
            href="/contact"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-cyan-600 text-white font-medium hover:bg-cyan-700 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}