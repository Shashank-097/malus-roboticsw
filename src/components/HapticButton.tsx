"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HapticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={
        reduceMotion
          ? {}
          : {
              scale: 1.015,
              boxShadow: "0 14px 36px rgba(34,211,238,0.45)",
            }
      }
      whileTap={
        reduceMotion
          ? {}
          : {
              scale: 0.985,
              boxShadow: "0 6px 18px rgba(34,211,238,0.25)",
            }
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 28,
        mass: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}