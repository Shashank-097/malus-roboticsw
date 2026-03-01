"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}