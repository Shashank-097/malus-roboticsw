"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const { locale } = useParams();

  const locations = [
    { titleKey: "hq_title" as const, cityKey: "hq_city" as const },
    { titleKey: "bu_title" as const, cityKey: "bu_city" as const },
    { titleKey: "de_title" as const, cityKey: "de_city" as const },
    { titleKey: "usa_title" as const, cityKey: "usa_city" as const },
  ];

  return (
    <footer className="relative bg-[#0a0c10] text-slate-400 overflow-hidden">
      {/* hairline top border instead of glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-10">

          {/* BRAND */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-2xl text-slate-100 tracking-tight">
              Malus <span className="italic text-slate-400">Robotics</span>
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-500 max-w-xs">
              {t("brand_desc")}
            </p>
            <p className="mt-7 text-[0.7rem] uppercase tracking-[0.28em] text-cyan-600/90">
              {t("tagline")}
            </p>
          </div>

          {/* SERVICES */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-medium text-slate-200 mb-5 tracking-[0.18em] uppercase">
              {t("services_title")}
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((k) => (
                <li key={k} className="hover:text-slate-200 transition-colors duration-300">
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>

          {/* PROJECTS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-medium text-slate-200 mb-5 tracking-[0.18em] uppercase">
              {t("projects_title")}
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>
                <Link
                  href={`/${locale}/projects/automotive-assembly`}
                  className="hover:text-slate-200 transition-colors duration-300"
                >
                  {t("p1")}
                </Link>
              </li>
              {(["p2", "p3", "p4", "p5"] as const).map((k) => (
                <li key={k} className="hover:text-slate-200 transition-colors duration-300">
                  {t(k)}
                </li>
              ))}
            </ul>
          </div>

          {/* LOCATIONS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-medium text-slate-200 mb-5 tracking-[0.18em] uppercase">
              {t("locations_title")}
            </h4>
            <ul className="space-y-5 text-sm text-slate-500">
              {locations.map((loc) => (
                <li key={loc.titleKey}>
                  <p className="text-slate-200 font-medium text-[0.85rem]">{t(loc.titleKey)}</p>
                  <p className="mt-0.5 leading-snug">{t(loc.cityKey)}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-medium text-slate-200 mb-5 tracking-[0.18em] uppercase">
              {t("contact_title")}
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: t("hq_title"), email: "support@malusrobotics.com" },
                { label: t("bu_title"), email: "services@malusrobotics.com" },
                { label: t("de_title"), email: "info@malusrobotics.com" },
                { label: t("usa_title"), email: "usa@malusrobotics.com" },
              ].map((c) => (
                <li key={c.email}>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-slate-500 hover:text-cyan-500 transition-colors duration-300 break-all"
                  >
                    {c.email}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/contact`}
              className="inline-block mt-6 text-xs uppercase tracking-[0.18em] text-slate-200 border-b border-slate-700 pb-1 hover:border-cyan-600 hover:text-cyan-500 transition-colors duration-300"
            >
              {t("contact_link")}
            </Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-20 h-px bg-slate-800/80" />

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-slate-600 text-center sm:text-left leading-relaxed">
            <p>
              © {new Date().getFullYear()} Malus Robotics Pvt. Ltd. {t("rights")}
            </p>
            <p className="mt-1">
              {t("designed_by")}{" "}
              <span className="text-slate-400 font-medium">Malus Robotics</span>
            </p>
          </div>
          <div className="flex gap-6 text-xs text-slate-600">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-slate-300 transition-colors duration-300">
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-slate-300 transition-colors duration-300">
              {t("terms")}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-slate-300 transition-colors duration-300">
              {t("contact_link")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}