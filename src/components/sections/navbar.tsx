"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface NavbarProps {
  logoRef?: React.RefObject<HTMLDivElement>;
}

export default function Navbar({ logoRef }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const t = useTranslations("navbar");
  const { locale } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 40);

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
    { name: t("home"),     href: `/${locale}` },
    { name: t("about"),    href: `/${locale}/about` },
    { name: t("services"), href: `/${locale}/services` },
    { name: t("projects"), href: `/${locale}/project` },
    { name: t("contact"),  href: `/${locale}/contact` },
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
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex items-center justify-between">

          {/* WORDMARK */}
          <Link href={`/${locale}`} className="flex items-center group">
            <div ref={logoRef} className="relative flex items-baseline gap-[0.35em]">
              <span
                className={`wordmark-shimmer font-semibold tracking-[0.02em] text-xl md:text-2xl bg-clip-text text-transparent transition-opacity duration-500 ${
                  scrolled ? "wordmark-shimmer--dark" : "wordmark-shimmer--light"
                }`}
              >
                MALUS
              </span>
              <span className="font-light tracking-[0.34em] text-[0.65rem] md:text-xs uppercase text-cyan-600">
                Robotics
              </span>
              <span className="absolute -bottom-2 left-0 h-px w-full bg-slate-400/60" />
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div
            className={`hidden md:flex items-center space-x-10 text-sm font-medium transition-colors duration-300 ${
              scrolled ? "text-white" : "text-slate-800"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative group"
              >
                <span className="transition-colors duration-300 group-hover:text-cyan-400">
                  {link.name}
                </span>

                <span
                  className="absolute left-1/2 -bottom-1 h-[2px] w-0
                  bg-gradient-to-r from-cyan-400 to-blue-500
                  transition-all duration-300
                  group-hover:w-full group-hover:left-0"
                />
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:block">
            <Link href="https://malus-empdesk.vercel.app/">
              <button
                className="
                px-7 py-2.5
                rounded-full
                font-medium
                text-white
                bg-gradient-to-r from-cyan-500 to-blue-600
                shadow-[0_0_20px_rgba(34,211,238,0.35)]
                hover:shadow-[0_0_40px_rgba(34,211,238,0.55)]
                hover:scale-105
                transition-all duration-300
                "
              >
                Employee Desk
              </button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className={`md:hidden ${
              scrolled ? "text-white" : "text-slate-800"
            }`}
          >
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
            className="fixed inset-0 z-[998] bg-[#0a0f1c]
            flex flex-col justify-center items-center gap-10
            text-white text-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-cyan-400 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <LanguageSwitcher />

            <Link href="https://malus-empdesk.vercel.app/">
              <button
                className="
                px-10 py-3
                rounded-full
                font-medium
                text-white
                bg-gradient-to-r from-cyan-500 to-blue-600
                "
              >
                Employee Desk
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
