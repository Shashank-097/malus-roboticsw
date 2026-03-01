"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b0d10] text-[#c9cdd3]">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-semibold text-white">
              Malus Robotics Pvt. Ltd.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-[#9aa1aa]">
              Engineering intelligent automation systems with robotics,
              PLC control, and digital twin–based virtual commissioning.
            </p>

            <p className="mt-6 text-xs uppercase tracking-widest text-[var(--accent)]">
              Dream It. Design It. Deploy It.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-[#9aa1aa]">
              <li>Robotics Programming & Integration</li>
              <li>PLC & Control Systems</li>
              <li>Virtual Commissioning</li>
              <li>Digital Twin Development</li>
              <li>Turnkey Automation Solutions</li>
              <li>Production Support Services</li>
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">
              Projects
            </h4>
            <ul className="space-y-3 text-sm text-[#9aa1aa]">
              <li>
                <Link href="/projects/automotive-assembly" className="hover:text-white">
                  Automotive Assembly Lines
                </Link>
              </li>
              <li>Paint Shop Automation</li>
              <li>Robotic Workcells</li>
              <li>Virtual Commissioning Systems</li>
              <li>Packaging & Material Handling</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">
              Contact
            </h4>

            <div className="space-y-4 text-sm text-[#9aa1aa]">
              <div>
                <p className="text-white font-medium">India (Engineering HQ)</p>
                <p>Pune, Maharashtra</p>
                <p>support@malusrobotics.com</p>
              </div>

              <div>
                <p className="text-white font-medium">India (Business Unit)</p>
                <p>Greater Noida, Uttar Pradesh</p>
                <p>services@malusrobotics.com</p>
              </div>

              <div>
                <p className="text-white font-medium">Germany (Partner)</p>
                <p>Kranzberg, Germany</p>
                <p>services@malusrobotics.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="mt-16 border-t border-white/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">

          <p className="text-xs text-[#8a9098]">
            © {new Date().getFullYear()} Malus Robotics Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-[#8a9098]">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}