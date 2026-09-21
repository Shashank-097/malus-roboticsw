"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Play, Volume2, VolumeX, ChevronRight } from "lucide-react";

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left
                 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500"
    />
  );
}

/* ══════════════════════════════════════════════
   REVEAL WRAPPER
══════════════════════════════════════════════ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   EYEBROW LABEL
══════════════════════════════════════════════ */
function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-7 h-[2px] ${light ? "bg-cyan-300" : "bg-cyan-500"}`} />
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.45em]
                    ${light ? "text-cyan-300" : "text-cyan-600"}`}
      >
        {children}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   SECTION HEADING
══════════════════════════════════════════════ */
function Heading({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <h2
      className={`text-3xl sm:text-4xl font-black leading-tight mb-10 tracking-tight
                  ${light ? "text-white" : "text-slate-900"}`}
    >
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════
   BULLET ITEM
══════════════════════════════════════════════ */
function BulletItem({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <li className={`flex items-start gap-3 text-sm leading-relaxed
                    ${light ? "text-slate-300" : "text-slate-600"}`}>
      <CheckCircle2
        className={`w-4 h-4 mt-0.5 shrink-0
                    ${light ? "text-cyan-400" : "text-cyan-500"}`}
      />
      <span>{children}</span>
    </li>
  );
}

/* ══════════════════════════════════════════════
   PROCESS STEP
══════════════════════════════════════════════ */
function ProcessStep({ num, children }: { num: number; children: React.ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: num * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-5 group"
    >
      {/* number badge */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600
                   group-hover:from-cyan-400 group-hover:to-indigo-500
                   flex items-center justify-center shadow-md shadow-cyan-100
                   transition-all duration-300"
      >
        <span className="text-[11px] font-black text-white">
          {String(num).padStart(2, "0")}
        </span>
      </div>
      <div className="pt-2.5 text-slate-600 text-sm leading-relaxed">{children}</div>
    </motion.li>
  );
}

/* ══════════════════════════════════════════════
   SIMULATION VIDEO CARD
══════════════════════════════════════════════ */
function SimCard({
  src,
  index,
  accent,
  title,
  desc,
  tag,
}: {
  src: string;
  index: number;
  accent: string;
  title: string;
  desc: string;
  tag: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }
  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.13, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden border border-white/10
                 bg-white/5 backdrop-blur-sm
                 hover:border-white/20 hover:bg-white/8
                 hover:shadow-[0_0_80px_rgba(6,182,212,0.2)]
                 transition-all duration-500"
    >
      {/* top glow accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
      />

      {/* video */}
      <div className="relative aspect-video bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* index chip */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full
                      bg-gradient-to-r ${accent} text-[9px] font-black text-white
                      uppercase tracking-widest shadow-lg z-10`}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* play button */}
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label="Play simulation"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${accent}
                          flex items-center justify-center shadow-2xl
                          scale-95 group-hover:scale-110 transition-transform duration-400`}
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          </button>
        )}

        {/* mute toggle */}
        {playing && (
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50
                       border border-white/10 text-white hover:bg-black/70 transition z-10"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* text */}
      <div className="p-6">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2 block">
          {tag}
        </span>
        <h3 className="text-base font-black text-white mb-2 leading-snug">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        <div className={`mt-5 h-[2px] w-6 bg-gradient-to-r ${accent}
                         group-hover:w-14 transition-all duration-500`} />
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   STAT CARD  (hero area)
══════════════════════════════════════════════ */
function StatCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-0.5 px-5 py-4 bg-white/80 backdrop-blur-sm
                 border border-slate-200 rounded-2xl shadow-sm"
    >
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.35em]">{label}</span>
      <span className="text-sm font-black text-slate-900">{value}</span>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function BigProjectPage() {
  const t = useTranslations("project_assembly");
  const { locale } = useParams();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const objectives = ["obj1","obj2","obj3","obj4","obj5"] as const;
  const scopeA     = ["scope1","scope2","scope3","scope4"] as const;
  const scopeB     = ["scope5","scope6","scope7","scope8"] as const;
  const archA      = ["arch1","arch2","arch3","arch4"] as const;
  const archB      = ["arch5","arch6","arch7","arch8"] as const;
  const process    = ["proc1","proc2","proc3","proc4","proc5","proc6"] as const;
  const results    = ["res1","res2","res3","res4","res5"] as const;

  const simVideos = [
    { src: "/videos/simulation1.mp4", accent: "from-cyan-400 to-blue-500",    titleKey: "sim1_title", descKey: "sim1_desc", tagKey: "sim1_tag" },
    { src: "/videos/simulation2.mp4", accent: "from-violet-400 to-purple-500", titleKey: "sim2_title", descKey: "sim2_desc", tagKey: "sim2_tag" },
    { src: "/videos/simulation3.mp4", accent: "from-emerald-400 to-teal-500", titleKey: "sim3_title", descKey: "sim3_desc", tagKey: "sim3_tag" },
  ] as const;

  return (
    <main className="bg-white text-slate-900 overflow-x-hidden">
      <ScrollBar />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">

        {/* blueprint-grid background pattern */}
        <div className="absolute inset-0 bg-sky-50">
          <svg className="absolute inset-0 w-full h-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0891b2" strokeWidth="0.4"/>
              </pattern>
              <pattern id="blueprint-major" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#0891b2" strokeWidth="0.9"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint)"/>
            <rect width="100%" height="100%" fill="url(#blueprint-major)"/>
          </svg>
        </div>

        {/* diagonal slash accent — the signature element */}
        <div className="absolute top-0 right-0 w-[55%] h-full overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-400/8 to-indigo-300/5"
            style={{ clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0 100%)" }}
          />
        </div>

        {/* hero image — right-side clipped */}
        <div ref={heroRef} className="absolute top-0 right-0 w-[52%] h-full overflow-hidden"
             style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}>
          <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0">
            <Image
              src="/images/robotics.jpg"
              alt="Automotive assembly line automation"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* fade left edge of image */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-50 via-sky-50/20 to-transparent" />
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-sky-50/60 via-transparent to-transparent"
          />
        </div>

        {/* left text panel */}
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-600
                         transition mb-12 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[54%]"
          >
            <Label>{t("eyebrow")}</Label>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.96]
                           tracking-tight text-slate-900 mb-8">
              {t("h1_line1")}
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600
                               bg-clip-text text-transparent">
                {t("h1_line2")}
              </span>
            </h1>

            <p className="text-base text-slate-500 leading-relaxed max-w-lg">
              {t("hero_desc")}
            </p>
          </motion.div>

          {/* stat pills row */}
          <div className="mt-10 flex flex-wrap gap-3">
            {(["meta1","meta2","meta3"] as const).map((k, i) => (
              <StatCard
                key={k}
                label={t(`${k}_label` as any)}
                value={t(`${k}_val` as any)}
                delay={0.5 + i * 0.1}
              />
            ))}

            {/* status */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="flex items-center gap-2 px-5 py-4 bg-emerald-50 border border-emerald-200
                         rounded-2xl shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-emerald-700 uppercase tracking-[0.35em]">
                Delivered & Operational
              </span>
            </motion.div>
          </div>
        </div>

        {/* bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24
                        bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════
          PROJECT SUMMARY
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

            <div className="lg:col-span-2">
              <Label>{t("summary_title")}</Label>
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                {t("summary_title")}
              </h2>
              <p className="text-slate-500 leading-[1.95] text-lg">{t("summary_desc")}</p>
            </div>

            <div className="space-y-3">
              {(["meta1","meta2","meta3"] as const).map((k, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65 }}
                  className="p-5 rounded-2xl border border-slate-100 bg-white
                             shadow-sm hover:shadow-md hover:border-cyan-100
                             transition-all duration-300 group"
                >
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {t(`${k}_label` as any)}
                  </p>
                  <p className="font-bold text-slate-900 text-sm">{t(`${k}_val` as any)}</p>
                  <div className="mt-3 w-4 h-[2px] bg-cyan-400 group-hover:w-8 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          OBJECTIVES  — tinted panel
      ══════════════════════════════════════ */}
      <section className="bg-sky-50 border-y border-sky-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <Label>{t("objectives_title")}</Label>
                <Heading>{t("objectives_title")}</Heading>
                <ul className="space-y-4">
                  {objectives.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
                </ul>
              </div>

              {/* decorative blueprint-corner graphic */}
              <div className="hidden lg:flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-64 h-64 text-cyan-500/20" fill="none" stroke="currentColor">
                  <rect x="20" y="20" width="260" height="260" strokeWidth="1" strokeDasharray="6 4"/>
                  <rect x="50" y="50" width="200" height="200" strokeWidth="0.5"/>
                  <circle cx="150" cy="150" r="80" strokeWidth="0.5" strokeDasharray="4 3"/>
                  <circle cx="150" cy="150" r="40" strokeWidth="1"/>
                  <line x1="150" y1="20" x2="150" y2="280" strokeWidth="0.4" strokeDasharray="2 4"/>
                  <line x1="20"  y1="150" x2="280" y2="150" strokeWidth="0.4" strokeDasharray="2 4"/>
                  <circle cx="150" cy="150" r="5" strokeWidth="2" className="fill-cyan-500/30"/>
                  <text x="156" y="100" fontSize="9" className="fill-cyan-600/50" style={{fontFamily:"monospace"}}>R=80mm</text>
                  <text x="156" y="145" fontSize="9" className="fill-cyan-600/50" style={{fontFamily:"monospace"}}>ORIGIN</text>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SIMULATION VIDEOS  — dark inset
      ══════════════════════════════════════ */}
      <section className="relative bg-slate-950 py-28 px-6 overflow-hidden">

        {/* subtle dot-grid bg */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>

        {/* cyan glow orb */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <Label light>Simulation</Label>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white
                           leading-tight mb-4 tracking-tight">
              Watch It Work —
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Before It Ships
              </span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl mb-14">
              Every system is stress-tested inside a digital twin before a single bolt is turned.
              These recordings capture real operating conditions — not demos.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {simVideos.map((v, i) => (
              <SimCard
                key={v.src}
                src={v.src}
                index={i}
                accent={v.accent}
                title={t(v.titleKey as any)}
                desc={t(v.descKey as any)}
                tag={t(v.tagKey as any)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SCOPE OF WORK
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Label>{t("scope_title")}</Label>
          <Heading>{t("scope_title")}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
            <ul className="space-y-3">
              {scopeA.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
            </ul>
            <ul className="space-y-3">
              {scopeB.map((k) => <BulletItem key={k}>{t(k)}</BulletItem>)}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      {/* ══════════════════════════════════════
          SYSTEM ARCHITECTURE
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Label>{t("arch_title")}</Label>
          <Heading>{t("arch_title")}</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[archA, archB].map((group, gi) => (
              <div
                key={gi}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm p-8 space-y-5
                           hover:shadow-md hover:border-cyan-100 transition-all duration-300"
              >
                {group.map((k) => (
                  <div key={k} className="flex items-start gap-3">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                    <p className="text-slate-600 text-sm leading-relaxed">{t(k)}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
          ENGINEERING PROCESS
      ══════════════════════════════════════ */}
      <section className="bg-sky-50 border-y border-sky-100 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <Label>{t("process_title")}</Label>
                <Heading>{t("process_title")}</Heading>
                <ol className="space-y-5">
                  {process.map((k, i) => (
                    <ProcessStep key={k} num={i + 1}>{t(k)}</ProcessStep>
                  ))}
                </ol>
              </div>

              {/* right: a simple timeline graphic */}
              <div className="hidden lg:block pt-16">
                <div className="relative pl-8 border-l-2 border-dashed border-cyan-200 space-y-10">
                  {process.map((k, i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute -left-[2.35rem] top-0.5 w-4 h-4 rounded-full
                                      bg-white border-2 border-cyan-400 shadow-sm shadow-cyan-100" />
                      <p className="text-xs text-slate-400 font-mono">Phase {String(i + 1).padStart(2,"0")}</p>
                    </motion.div>
                  ))}
                  {/* end dot */}
                  <div className="absolute -left-[0.42rem] bottom-0 w-2 h-2 rounded-full bg-cyan-500" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RESULTS
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 pb-40">
        <Reveal>
          <Label>{t("results_title")}</Label>
          <Heading>{t("results_title")}</Heading>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
          {results.map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6
                         hover:shadow-xl hover:border-cyan-100 hover:-translate-y-1
                         transition-all duration-300 overflow-hidden"
            >
              {/* corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full
                                bg-gradient-to-bl from-cyan-50 to-transparent" />
                <ChevronRight className="absolute top-3 right-3 w-3 h-3 text-cyan-400" />
              </div>

              <div className="w-7 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 mb-4
                              group-hover:w-12 transition-all duration-300" />
              <p className="text-slate-700 text-sm leading-relaxed font-medium">{t(k)}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}