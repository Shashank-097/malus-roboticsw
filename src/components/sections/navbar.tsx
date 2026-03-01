"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar({
  logoRef,
}: {
  logoRef: React.RefObject<HTMLDivElement>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background blur trigger
      setScrolled(currentScrollY > 40);

      // hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[999] ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-[var(--border-subtle)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">

          {/* LOGO ANCHOR */}
          <Link href="/" className="flex items-center">
            <div ref={logoRef}>
              <Image
                src="/logo.png"
                alt="Malus Robotics"
                width={260}
                height={100}
                priority
                className="h-14 md:h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium text-[var(--text-primary)]">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="relative group">
                <span className="transition-colors duration-300 group-hover:text-[var(--cyan-main)]">
                  {link.name}
                </span>
                <span
                  className="absolute left-1/2 -bottom-1 h-[2px] w-0
                             bg-gradient-to-r from-[var(--cyan-main)] to-[var(--steel-main)]
                             transition-all duration-300
                             group-hover:w-full group-hover:left-0"
                />
              </Link>
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden md:block">
            <button
              className="px-7 py-2.5 rounded-full font-medium text-white
                         bg-gradient-to-r from-[var(--cyan-main)] to-[#0891B2]
                         hover:scale-105 transition"
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden text-[var(--text-primary)]">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg active:scale-95 transition"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[998] bg-white
                       flex flex-col justify-center items-center gap-10
                       text-[var(--text-primary)] text-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-[var(--cyan-main)]"
              >
                {link.name}
              </Link>
            ))}

            <button
              className="px-10 py-3 rounded-full font-medium text-white
                         bg-gradient-to-r from-[var(--cyan-main)] to-[#0891B2]"
            >
              Get Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}