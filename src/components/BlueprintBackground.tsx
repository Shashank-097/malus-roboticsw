
"use client";

import { motion } from "framer-motion";

export default function BlueprintBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Base Blueprint Grid */}

      <div className="absolute inset-0 
      bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),
      linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)]
      bg-[size:60px_60px] opacity-[0.05]" />

      {/* Secondary fine grid */}

      <div className="absolute inset-0 
      bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),
      linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)]
      bg-[size:20px_20px] opacity-[0.03]" />

      {/* Animated scanning line */}

      <motion.div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating blueprint shapes */}

      <motion.div
        className="absolute top-20 left-20 w-40 h-40 border border-cyan-400/20 rounded-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-32 right-32 w-56 h-56 border border-blue-400/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Glow */}

      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-cyan-300/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full" />

    </div>
  );
}
