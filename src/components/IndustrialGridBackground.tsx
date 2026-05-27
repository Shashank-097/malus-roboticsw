"use client";

import { motion } from "framer-motion";

export default function IndustrialGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* GRID */}
      <div
        className="
        absolute inset-0
        bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)]
        bg-[size:120px_120px]
      "
      />

      {/* MOVING SCAN LINE */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 bottom-0 w-[300px]
        bg-gradient-to-r
        from-transparent
        via-cyan-400/20
        to-transparent
        blur-2xl"
      />

      {/* GLOW ORB */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 w-[420px] h-[420px]
        bg-cyan-400/10 blur-[140px] rounded-full"
      />

      {/* SECOND ORB */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px]
        bg-blue-400/10 blur-[160px] rounded-full"
      />

    </div>
  );
}