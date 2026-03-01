"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

export default function SystemArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  /* ================= SCROLL MAPPING ================= */
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-[#F8FAFC] py-40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ===== SECTION HEADER ===== */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.4em] text-cyan-600">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
            Automation Stack Overview
          </h2>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            A structured automation architecture designed for reliability,
            scalability, and fast commissioning.
          </p>
        </div>

        {/* ===== DIAGRAM ===== */}
        <div className="relative">

          <motion.svg
            viewBox="0 0 1000 360"
            className="w-full h-auto"
          >
            {/* ================= CONNECTION LINES ================= */}
            {!reduceMotion && (
              <>
                <motion.path
                  d="M150 180 L300 180"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  style={{ pathLength: draw }}
                />
                <motion.path
                  d="M450 180 L600 180"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2"
                  style={{ pathLength: draw }}
                />
                <motion.path
                  d="M750 180 L900 180"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  style={{ pathLength: draw }}
                />
              </>
            )}

            {/* ================= NODES ================= */}
            {[
              { x: 100, label: "Field Devices" },
              { x: 350, label: "PLC & Safety" },
              { x: 650, label: "Robotics Cell" },
              { x: 900, label: "Digital Twin / MES" },
            ].map((node, i) => (
              <motion.g
                key={i}
                style={{ opacity: nodeOpacity }}
              >
                {/* Node box */}
                <rect
                  x={node.x - 80}
                  y={120}
                  width={160}
                  height={120}
                  rx={12}
                  fill="#ffffff"
                  stroke="#e2e8f0"
                />

                {/* Status bar */}
                <rect
                  x={node.x - 80}
                  y={120}
                  width={160}
                  height={6}
                  fill={i < 3 ? "#06b6d4" : "#6366f1"}
                />

                {/* Label */}
                <text
                  x={node.x}
                  y={185}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="14"
                  fontWeight="600"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </motion.svg>

          {/* ===== SIGNAL FLOW PULSE ===== */}
          {!reduceMotion && (
            <motion.div
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-0 h-[2px] w-12
                         bg-cyan-400 opacity-70"
            />
          )}
        </div>
      </div>
    </section>
  );
}