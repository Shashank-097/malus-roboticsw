"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ServicesPage() {
  const t = useTranslations("services_page");
  const { locale } = useParams();

  const techStack = ["ROS2", "Machine Vision", "PLC", "Digital Twin", "AI Systems", "Cloud", "Industrial Robotics"];
  const itTags = ["Full-Stack", "AI Platforms", "Enterprise Software", "Cloud Infrastructure"];
  const roboticsTags = ["PLC Programming", "Machine Vision", "Robotics Integration", "Digital Twin"];

  return (
    <main className="relative min-h-screen bg-[#0a0f1c] pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 sm:px-6 overflow-hidden text-white">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-cyan-500/20 blur-[200px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-blue-500/20 blur-[200px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:90px_90px] sm:bg-[size:110px_110px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
          <p className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.45em] uppercase text-cyan-400">{t("eyebrow")}</p>
          <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-semibold leading-tight">
            {t("h1_line1")}<br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{t("h1_line2")}</span>
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-400 px-2">{t("desc")}</p>
        </motion.div>

        <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
          {techStack.map((tech) => (
            <motion.div key={tech} whileHover={{ y: -4, scale: 1.05 }} className="px-4 py-2 sm:px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition">
              {tech}
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 mb-8 sm:mb-10 flex justify-center">
          <div className="w-32 sm:w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid lg:grid-cols-2 gap-10 sm:gap-14">
          <Link href={`/${locale}/services/it`} className="block">
            <motion.div whileHover={{ y: -10 }} className="group relative bg-white/[0.04] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-cyan-400/40 transition cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
              <div className="relative h-[220px] sm:h-[320px]">
                <Image src="/images/it-services.jpg" alt="IT Services" fill className="object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6 sm:p-10">
                <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-cyan-400">{t("it_eyebrow")}</p>
                <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-semibold">{t("it_title")}</h2>
                <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">{t("it_desc")}</p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  {itTags.map((tag) => <span key={tag} className="px-3 py-1 text-xs sm:text-sm rounded-full bg-white/10">{tag}</span>)}
                </div>
                <div className="mt-8 flex items-center text-cyan-400 font-medium">
                  <span>{t("it_explore")}</span>
                  <span className="ml-2 transform transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          </Link>

          <Link href={`/${locale}/services/robotics`} className="block">
            <motion.div whileHover={{ y: -10 }} className="group relative bg-white/[0.04] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:border-cyan-400/40 transition cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
              <div className="relative h-[220px] sm:h-[320px]">
                <Image src="/images/robotics.jpg" alt="Robotics" fill className="object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-6 sm:p-10">
                <p className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-cyan-400">{t("robotics_eyebrow")}</p>
                <h2 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-semibold">{t("robotics_title")}</h2>
                <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">{t("robotics_desc")}</p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  {roboticsTags.map((tag) => <span key={tag} className="px-3 py-1 text-xs sm:text-sm rounded-full bg-white/10">{tag}</span>)}
                </div>
                <div className="mt-8 flex items-center text-cyan-400 font-medium">
                  <span>{t("robotics_explore")}</span>
                  <span className="ml-2 transform transition group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        <div className="relative mt-24 sm:mt-32 text-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-[120px]" />
          <div className="relative">
            <h3 className="text-2xl sm:text-4xl font-semibold">{t("cta_title")}</h3>
            <p className="mt-3 sm:mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">{t("cta_desc")}</p>
            <Link href={`/${locale}/contact`}>
              <button className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm sm:text-base font-semibold hover:scale-105 transition">
                {t("cta_button")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}