"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      e.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff]">
      
      {/* ===== AMBIENT LIGHT ===== */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-cyan-400/20 blur-[160px]" />
      <div className="absolute bottom-0 -right-32 w-[520px] h-[520px] bg-indigo-400/20 blur-[160px]" />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center">
        <div className="max-w-5xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs tracking-[0.45em] uppercase text-cyan-600"
          >
            Contact Maluce Robotics
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 text-5xl sm:text-6xl lg:text-7xl font-semibold text-slate-900 leading-tight"
          >
            Engineering
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Automation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-10 text-xl text-slate-600 max-w-3xl mx-auto"
          >
            From PLC systems to robotics integration — we design automation
            solutions that scale with your industry.
          </motion.p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="relative pb-36">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-20">

          {/* ===== FORM CARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="
              lg:col-span-2
              rounded-[32px]
              bg-white/70 backdrop-blur-xl
              border border-white/40
              p-12 sm:p-16
              shadow-[0_60px_120px_rgba(0,0,0,0.12)]
            "
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-28"
              >
                <h3 className="text-4xl sm:text-5xl font-semibold text-slate-900">
                  Thank You
                </h3>

                <p className="mt-8 text-lg text-slate-600 max-w-lg mx-auto">
                  Your inquiry has been received.
                  <br />
                  Our engineering team will reach out shortly.
                </p>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  className="
                    inline-flex items-center gap-3 mt-12
                    px-12 py-5 rounded-full
                    bg-gradient-to-r from-green-600 to-emerald-600
                    text-white font-medium
                    hover:scale-[1.03] transition
                  "
                >
                  <MessageCircle />
                  Continue on WhatsApp
                </a>

                <p className="mt-6 text-sm text-slate-400">
                  This page will refresh automatically
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-10">
                {[
                  ["Full Name", "name", true],
                  ["Company / Organization", "company", false],
                  ["Email Address", "email", true],
                  ["Phone (optional)", "phone", false],
                ].map(([label, name, req]) => (
                  <div key={name as string}>
                    <label className="text-sm font-medium text-slate-700">
                      {label}
                    </label>
                    <input
                      name={name as string}
                      required={req as boolean}
                      type={name === "email" ? "email" : "text"}
                      className="
                        mt-3 w-full rounded-2xl
                        border border-slate-200
                        px-5 py-4
                        focus:ring-2 focus:ring-cyan-500
                        outline-none
                      "
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">
                    Service Area
                  </label>
                  <select className="mt-3 w-full rounded-2xl border px-5 py-4 focus:ring-2 focus:ring-cyan-500">
                    <option>PLC Programming</option>
                    <option>Robotics Integration</option>
                    <option>Motion Control</option>
                    <option>SCADA / Monitoring</option>
                    <option>Smart Factory</option>
                    <option>Consultation / Not Sure</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">
                    Project Overview
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-3 w-full rounded-2xl border px-5 py-4 focus:ring-2 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-6">
                  <button
                    disabled={loading}
                    className="
                      px-14 py-5 rounded-full
                      bg-gradient-to-r from-cyan-600 to-indigo-600
                      text-white font-medium
                      hover:scale-[1.03]
                      transition disabled:opacity-60
                    "
                  >
                    {loading ? "Sending…" : "Send Inquiry"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* ===== CONTACT PANEL ===== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <h3 className="text-3xl font-semibold text-slate-900">
              Direct Contact
            </h3>

            <div className="space-y-8 text-slate-700">
              <div className="flex items-center gap-4">
                <Phone className="text-cyan-600" />
                <a href="tel:+919999999999">+91 99999 99999</a>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="text-cyan-600" />
                <a href="mailto:info@malucerobotics.com">
                  info@malucerobotics.com
                </a>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-cyan-600 mt-1" />
                <span>
                  Maluce Robotics
                  <br />
                  Ghaziabad, Uttar Pradesh, India
                </span>
              </div>
            </div>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              className="
                inline-flex items-center gap-3
                px-8 py-5 rounded-2xl
                bg-green-600 text-white font-medium
                hover:bg-green-700 transition
              "
            >
              <MessageCircle />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="pb-24 text-center">
        <p className="text-sm tracking-[0.35em] uppercase text-slate-500">
          Engineering-Driven • Reliable • Scalable
        </p>
      </section>
    </main>
  );
}