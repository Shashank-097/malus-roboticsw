"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   MALÜS ROBOTICS — Terms & Conditions
   Container matches Navbar: max-w-7xl mx-auto px-6.
   pt-28/pt-32 clears the fixed navbar height.
------------------------------------------------------------------- */

const ACCENT = "#06b6d4";
const EFFECTIVE_DATE = "September 14, 2026";
const COMPANY = "Malüs Robotics";

const SECTIONS = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      `By purchasing, registering, or using any ${COMPANY} hardware, software, or online service (together, the "Services"), you agree to these Terms and Conditions. If you don't agree, please don't use the Services.`,
    ],
  },
  {
    id: "services",
    title: "Description of services",
    body: [
      `${COMPANY} provides robotic hardware along with companion software, firmware, and a cloud platform used to configure, monitor, and operate that hardware. Features and specifications may change as we improve the Services.`,
    ],
  },
  {
    id: "account",
    title: "Account registration",
    body: [
      "You'll need an account to register a device or access certain features. You're responsible for keeping your login credentials secure and for all activity that happens under your account. Tell us right away if you suspect unauthorized use.",
    ],
  },
  {
    id: "license",
    title: "License and acceptable use",
    body: [
      "We grant you a limited, non-exclusive, non-transferable license to use our software and firmware solely to operate the hardware you've purchased. You agree not to reverse engineer, decompile, or tamper with the firmware in a way that compromises safety, or use the Services for any unlawful purpose.",
    ],
  },
  {
    id: "hardware",
    title: "Hardware, safety, and warranty",
    body: [
      "Our robots are mechanical and electronic systems that carry inherent risks. Follow the safety instructions included with your device — keep clear of moving parts during operation and don't bypass safety interlocks.",
      "Hardware is covered by the limited warranty included with your purchase. Unauthorized modification, misuse, or use outside of documented operating conditions voids that warranty.",
    ],
  },
  {
    id: "updates",
    title: "Software and firmware updates",
    body: [
      "We may release updates that add features, improve performance, or patch security issues. Some updates are required to keep the Services operating safely and correctly, and may be applied automatically.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: [
      `All designs, software, trademarks, and documentation associated with the Services are owned by ${COMPANY} or our licensors. Nothing in these Terms transfers ownership of that intellectual property to you.`,
    ],
  },
  {
    id: "content",
    title: "User content and data",
    body: [
      "Where the Services let you upload content — configurations, recorded sensor data, or support tickets — you retain ownership of it. You grant us a license to use it solely to operate, support, and improve the Services.",
    ],
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    body: [
      'The Services are provided "as is." To the fullest extent permitted by law, we disclaim implied warranties of merchantability and fitness for a particular purpose, and our liability for any claim relating to the Services is limited to the amount you paid us in the twelve months before the claim arose.',
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold us harmless from claims arising out of your misuse of the Services or violation of these Terms.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    body: [
      "We may suspend or terminate your access to the Services if you violate these Terms or misuse the hardware in a way that creates a safety risk. You may stop using the Services at any time.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    body: [
      "These Terms are governed by the laws of the jurisdiction in which Malüs Robotics is incorporated, without regard to conflict-of-law principles. Any disputes will be resolved in the courts of that jurisdiction, unless local law requires otherwise.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these Terms as our Services evolve. Continued use of the Services after an update means you accept the revised Terms. Material changes will be highlighted on this page.",
    ],
  },
];

/* ---------------------------- UI PIECES ---------------------------- */

function Bracket({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const corner = "absolute w-3.5 h-3.5";
  return (
    <div className={`relative px-6 py-5 ${className}`}>
      <span className={`${corner} top-0 left-0 border-t-2 border-l-2`} style={{ borderColor: ACCENT }} />
      <span className={`${corner} top-0 right-0 border-t-2 border-r-2`} style={{ borderColor: ACCENT }} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} style={{ borderColor: ACCENT }} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} style={{ borderColor: ACCENT }} />
      {children}
    </div>
  );
}

function Section({
  index,
  section,
  refCb,
}: {
  index: number;
  section: (typeof SECTIONS)[number];
  refCb: (el: HTMLElement | null) => void;
}) {
  return (
    <section
      id={section.id}
      ref={refCb}
      className="py-9 border-b"
      style={{ borderColor: "var(--steel-dark)" }}
    >
      <div className="flex gap-4 items-baseline mb-3.5">
        <span
          className="font-mono text-[13px] tracking-wide min-w-[34px]"
          style={{ color: ACCENT }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-xl font-semibold m-0" style={{ color: "var(--text-main)" }}>
          {section.title}
        </h3>
      </div>
      <div className="pl-[50px] max-w-[680px]">
        {section.body.map((p, i) => (
          <p key={i} className="text-[15.5px] leading-7 mb-3.5" style={{ color: "var(--text-muted)" }}>
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function TocRail({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="sticky top-28 flex flex-col gap-0.5">
      {SECTIONS.map((s, i) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            className="flex gap-2.5 items-baseline text-left bg-transparent border-0 cursor-pointer px-2.5 py-[7px] border-l-2 transition-colors"
            style={{ borderColor: active ? ACCENT : "var(--steel-dark)" }}
          >
            <span
              className="font-mono text-[11px] min-w-[20px]"
              style={{ color: active ? ACCENT : "var(--steel-light)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[13.5px]" style={{ color: active ? "var(--text-main)" : "var(--text-muted)" }}>
              {s.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ---------------------------- MAIN PAGE ---------------------------- */

export default function TermsAndConditionsPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const { locale } = useParams();

  const handleJump = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "var(--bg-main)", color: "var(--text-main)" }} className="min-h-screen">
      {/* Tech grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(6,182,212,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(6,182,212,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black, transparent 480px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* pt-28/32 clears the fixed navbar */}
        <header className="pt-28 md:pt-32 pb-9">
          <Bracket>
            <h1 className="text-4xl font-bold mb-2.5 tracking-tight">Terms &amp; conditions</h1>
            <p className="text-[15.5px] max-w-[560px] m-0" style={{ color: "var(--text-muted)" }}>
              The terms that govern using our robots, software, and cloud platform. Effective{" "}
              {EFFECTIVE_DATE}.
            </p>
          </Bracket>

          <Link
            href={`/${locale}/privacy-policy`}
            className="inline-flex items-center gap-2 mt-6 text-sm no-underline"
            style={{ color: "var(--text-muted)" }}
          >
            Looking for our Privacy Policy?
            <span className="inline-flex items-center gap-1" style={{ color: ACCENT }}>
              View here <ArrowRight size={14} />
            </span>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 pb-20">
          <TocRail activeId={activeId} onJump={handleJump} />

          <div>
            {SECTIONS.map((s, i) => (
              <Section key={s.id} index={i} section={s} refCb={(el) => (sectionRefs.current[s.id] = el)} />
            ))}

            <div className="pt-9">
              <Bracket className="bg-[var(--bg-soft)]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Mail size={16} color={ACCENT} />
                  <span className="text-[14.5px] font-semibold">Questions about these terms?</span>
                </div>
                <p className="text-[14.5px] m-0" style={{ color: "var(--text-muted)" }}>
                  Write to us at <span style={{ color: ACCENT }}>legal@malusrobotics.com</span> and
                  we&apos;ll get back to you.
                </p>
              </Bracket>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
