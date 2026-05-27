"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const { locale } = useParams();

  return (
    <footer className="relative bg-gradient-to-b from-[#050b14] via-[#071422] to-[#02060c] text-cyan-100/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div>
            <h3 className="text-xl font-semibold text-white">Malus Robotics Pvt. Ltd.</h3>
            <p className="mt-5 text-sm leading-relaxed text-cyan-100/70">{t("brand_desc")}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cyan-400">{t("tagline")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider">{t("services_title")}</h4>
            <ul className="space-y-3 text-sm text-cyan-100/70">
              {(["s1","s2","s3","s4","s5","s6"] as const).map((k) => (
                <li key={k} className="hover:text-cyan-300 transition">{t(k)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider">{t("projects_title")}</h4>
            <ul className="space-y-3 text-sm text-cyan-100/70">
              <li><Link href={`/${locale}/projects/automotive-assembly`} className="hover:text-cyan-300 transition">{t("p1")}</Link></li>
              {(["p2","p3","p4","p5"] as const).map((k) => (
                <li key={k} className="hover:text-cyan-300 transition">{t(k)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider">{t("contact_title")}</h4>
            <div className="space-y-5 text-sm text-cyan-100/70">
              {[
                { titleKey: "hq_title" as const, cityKey: "hq_city" as const, email: "support@malusrobotics.com" },
                { titleKey: "bu_title" as const, cityKey: "bu_city" as const, email: "services@malusrobotics.com" },
                { titleKey: "de_title" as const, cityKey: "de_city" as const, email: "info@malusrobotics.com" },
              ].map((loc) => (
                <div key={loc.email}>
                  <p className="text-white font-medium">{t(loc.titleKey)}</p>
                  <p>{t(loc.cityKey)}</p>
                  <a href={`mailto:${loc.email}`} className="text-cyan-300 hover:text-cyan-200 transition">{loc.email}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-cyan-500/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-cyan-100/60 text-center sm:text-left">
            © {new Date().getFullYear()} Malus Robotics Pvt. Ltd. {t("rights")}
            <p className="mt-1">{t("designed_by")} <span className="text-cyan-400 font-medium">Malus Robotics</span></p>
          </div>
          <div className="flex gap-6 text-xs text-cyan-100/60">
            <Link href={`/${locale}/privacy-policy`} className="hover:text-cyan-300 transition">{t("privacy")}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-cyan-300 transition">{t("terms")}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-cyan-300 transition">{t("contact_link")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}