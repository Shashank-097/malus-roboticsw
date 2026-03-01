"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const steps = [
  {
    title: "Analyze the System",
    description:
      "We study constraints, cycle times, tolerances, and failure modes. Every system is treated as a closed-loop engineering problem.",
    image: "/images/plc.jpg",
  },
  {
    title: "Design & Simulate",
    description:
      "Digital twins and virtual commissioning validate motion, logic, and safety before deployment.",
    image: "/images/digital1-twin.jpg",
  },
  {
    title: "Deploy with Confidence",
    description:
      "We integrate, test, and optimize in real environments to guarantee uptime and determinism.",
    image: "/images/integration.jpg",
  },
];

export default function SystemNarrativePinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [canHover, setCanHover] = useState(false);

  /* ================= POINTER CAPABILITY ================= */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ================= SCROLL ================= */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.33) setActive(0);
    else if (v < 0.66) setActive(1);
    else setActive(2);
  });

  /* ================= SECTION REVEAL ================= */
  const revealOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const revealY = useTransform(scrollYProgress, [0, 0.12], [24, 0]);

  /* ================= MICRO PARALLAX ================= */
  const textY = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 18]);

  /* ================= PROGRESS RAIL ================= */
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* ================= MAGNETIC CURSOR (DESKTOP ONLY) ================= */
  const mouseY = useMotionValue(-9999);

  function handleMouseMove(e: React.MouseEvent) {
    if (!canHover || reduceMotion || !railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseLeave() {
    mouseY.set(-9999);
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[320vh] bg-[#F8FAFC]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ===== PINNED FRAME ===== */}
      <motion.div
        style={reduceMotion ? {} : { opacity: revealOpacity, y: revealY }}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* ===== SCROLL PROGRESS RAIL ===== */}
        <div className="absolute left-6 top-0 bottom-0 flex items-center z-20">
          <div
            ref={railRef}
            className="relative h-[60%] w-px bg-slate-200"
          >
            {/* Active progress */}
            <motion.div
              style={{ scaleY: railScale, originY: 0 }}
              className="absolute top-0 left-0 w-px h-full
                         bg-gradient-to-b from-cyan-500 to-cyan-400"
            />

            {/* Nodes */}
            {steps.map((_, i) => {
              const nodeY = (i / (steps.length - 1)) * 100;

              const offset = useTransform(mouseY, (y) => {
                if (!canHover || !railRef.current) return 0;
                const nodePx =
                  railRef.current.offsetHeight * (nodeY / 100);
                const dist = y - nodePx;
                if (Math.abs(dist) > 80) return 0;
                return Math.max(-6, Math.min(6, dist * 0.08));
              });

              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 -translate-x-1/2
                             w-2 h-2 rounded-full"
                  style={{
                    top: `${nodeY}%`,
                    y: canHover ? offset : 0,
                  }}
                  animate={
                    canHover
                      ? {
                          scale: active === i ? 1.25 : 1,
                        }
                      : {
                          scale: active === i ? [1, 1.35, 1] : 1,
                        }
                  }
                  transition={
                    canHover
                      ? {
                          type: "spring",
                          stiffness: 260,
                          damping: 22,
                        }
                      : {
                          duration: 0.6,
                        }
                  }
                  className={
                    active === i
                      ? "bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                      : "bg-slate-300"
                  }
                />
              );
            })}
          </div>
        </div>

        {/* ===== BACKGROUND ENERGY FIELD ===== */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[620px] h-[620px] bg-cyan-400/10 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-indigo-400/10 blur-[180px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto h-full px-8
                        grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ================= LEFT: TEXT ================= */}
          <motion.div
            style={reduceMotion ? {} : { y: textY }}
            className="relative space-y-12"
          >
            <span className="text-xs tracking-[0.4em] text-cyan-600">
              OUR PROCESS
            </span>

            {steps.map((step, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 0.96,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${
                  i === active
                    ? "relative"
                    : "pointer-events-none select-none"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
                  {step.title}
                </h2>

                <p className="mt-6 text-lg text-slate-600 max-w-md">
                  {step.description}
                </p>

                <div className="mt-8 h-[2px] w-36
                                bg-gradient-to-r from-cyan-500 to-transparent" />
              </motion.div>
            ))}
          </motion.div>

          {/* ================= RIGHT: IMAGE ================= */}
          <motion.div
            style={reduceMotion ? {} : { y: imageY }}
            className="relative h-[440px] w-full rounded-2xl overflow-hidden"
          >
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 1.06,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0
                                bg-gradient-to-l
                                from-black/55 via-black/25 to-transparent" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}