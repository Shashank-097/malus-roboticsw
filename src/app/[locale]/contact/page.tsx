"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("contact_page");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => window.location.reload(), 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData)) });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      e.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff]">
      <div className="absolute -top-32 -left-32 w-[420px] md:w-[520px] h-[420px] md:h-[520px] bg-cyan-400/20 blur-[160px]" />
      <div className="absolute bottom-0 -right-32 w-[420px] md:w-[520px] h-[420px] md:h-[520px] bg-indigo-400/20 blur-[160px]" />

      <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-xs tracking-[0.35em] uppercase text-cyan-600">{t("eyebrow")}</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 leading-tight">
            {t("h1_line1")}<br />
            <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">{t("h1_line2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            {t("hero_desc")}
          </motion.p>
        </div>
      </section>

      <section className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-16 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 rounded-[28px] bg-white/70 backdrop-blur-xl border border-white/40 p-8 sm:p-12 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.12)]">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 md:py-24">
                <h3 className="text-3xl md:text-4xl font-semibold text-slate-900">{t("thank_you")}</h3>
                <p className="mt-6 text-base md:text-lg text-slate-600 max-w-md mx-auto">{t("thank_you_desc")}</p>
                <p className="mt-6 text-sm text-slate-400">{t("refresh_note")}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-8">
                {([
                  [t("label_name"), "name", true],
                  [t("label_company"), "company", false],
                  [t("label_email"), "email", true],
                  [t("label_phone"), "phone", false],
                ] as [string, string, boolean][]).map(([label, name, req]) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-slate-700">{label}</label>
                    <input name={name} required={req} type={name === "email" ? "email" : "text"} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-cyan-500 outline-none" />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">{t("label_service")}</label>
                  <select name="service" className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-cyan-500">
                    <option>{t("service_plc")}</option>
                    <option>{t("service_robotics")}</option>
                    <option>{t("service_motion")}</option>
                    <option>{t("service_scada")}</option>
                    <option>{t("service_smart")}</option>
                    <option>{t("service_consult")}</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">{t("label_message")}</label>
                  <textarea name="message" rows={5} required className="mt-2 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-cyan-500 resize-none" />
                </div>

                <div className="sm:col-span-2 pt-4">
                  <button disabled={loading} className="w-full sm:w-auto px-12 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-medium hover:scale-[1.02] transition disabled:opacity-60">
                    {loading ? t("btn_sending") : t("btn_send")}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">{t("contact_info_title")}</h3>
            <div className="space-y-8">
              {[
                { title: t("hq_title"), city: t("hq_city"), email: "support@malusrobotics.com" },
                { title: t("bu_title"), city: t("bu_city"), email: "services@malusrobotics.com" },
                { title: t("de_title"), city: t("de_city"), email: "germany@malusrobotics.com" },
                { title: t("usa_title"), city: t("usa_city"), email: "usa@malusrobotics.com" },
              ].map((loc) => (
                <div key={loc.email} className="flex gap-4">
                  <MapPin className="text-cyan-600 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-slate-900">{loc.title}</p>
                    <p className="text-slate-600">{loc.city}</p>
                    <a href={`mailto:${loc.email}`} className="flex items-center gap-2 mt-1 text-slate-600 hover:text-cyan-600">
                      <Mail className="w-4 h-4" />{loc.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 text-center">
        <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase text-slate-500">{t("footer_note")}</p>
      </section>
    </main>
  );
}
