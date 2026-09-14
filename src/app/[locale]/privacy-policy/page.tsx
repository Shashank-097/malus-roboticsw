"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   MALÜS ROBOTICS — Privacy Policy
   Container matches Navbar: max-w-7xl mx-auto px-6.
   pt-28/pt-32 clears the fixed navbar height.
------------------------------------------------------------------- */

const ACCENT = "#06b6d4";
const EFFECTIVE_DATE = "September 14, 2026";
const COMPANY = "Malüs Robotics";

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      `${COMPANY} designs and builds robotic systems, and the software and cloud services that run them. This policy explains what information we collect when you buy our hardware, use our apps, or visit our website, and how we handle it.`,
      "You can browse our public site without telling us who you are. We only need information from you at specific points — creating an account, registering a device, or contacting support.",
    ],
  },
  {
    id: "collect",
    title: "Information we collect",
    body: [
      "We collect a few different categories of information, depending on how you interact with us:",
    ],
    list: [
      "Account details — name, email, shipping address, and phone number when you register, order, or contact support.",
      "Device and operational data — telemetry, sensor logs, firmware version, error reports, and diagnostic data sent from your robot to help it run and to help us maintain it.",
      "Usage data — how you interact with our apps and dashboards, including feature usage and session activity.",
      "Site analytics — anonymized traffic and browsing data collected through cookies, described further below.",
    ],
  },
  {
    id: "use",
    title: "How we use it",
    body: [
      "We use collected information to operate, secure, and improve our products: to authenticate your account, deliver firmware and software updates, provide support, monitor device health and safety, and understand how our products are used so we can improve them.",
      "We do not use sensor or telemetry data to build advertising profiles.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing and disclosure",
    body: [`${COMPANY} does not sell your personal information. We share it with non-affiliated companies only:`],
    list: [
      "To provide a product or service you've requested, or with your permission.",
      "With trusted vendors who work on our behalf under confidentiality agreements — for example, cloud hosting or shipping partners. They may not use your data beyond what we've instructed.",
      "In response to a subpoena, court order, or other legal process.",
      "When we believe it's necessary to investigate or prevent fraud, illegal activity, or a threat to anyone's physical safety.",
      "If Malüs Robotics is acquired by, or merges with, another company.",
    ],
  },
  {
    id: "security",
    title: "Data security",
    body: [
      "We apply physical, technical, and administrative safeguards appropriate to the sensitivity of the data involved, including encryption of data in transit, access controls on device and account data, and regular review of our security practices. No system is perfectly secure, and we can't guarantee absolute protection.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    body: [
      "We keep personal and device data for as long as your account is active or as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements. Diagnostic and telemetry logs are retained on a rolling basis and periodically purged.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    body: [
      "Our website and apps use cookies and similar technologies to keep you signed in, remember preferences, and measure aggregate traffic and usage. This information is analyzed at an aggregate level — we don't review it person by person.",
      "You can disable cookies in your browser settings, or opt out of non-essential analytics from your account settings. Some features may not work correctly with cookies disabled.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party links and services",
    body: [
      "Our site and apps may link to, or integrate with, services we don't control — payment processors, mapping providers, or social platforms. Their privacy practices are their own; we encourage you to review them before sharing information.",
    ],
  },
  {
    id: "children",
    title: "Children's privacy",
    body: [
      "Our products and website are not directed at children. We don't knowingly collect personal information from anyone under 13 without parental or guardian supervision.",
    ],
  },
  {
    id: "rights",
    title: "Your rights and choices",
    body: [
      "Depending on where you live, you may have the right to access, correct, export, or delete your personal information, and to withdraw consent you previously gave us. To exercise any of these rights, contact us using the details below — we'll make a sincere effort to respond in a timely manner.",
    ],
  },
  {
    id: "transfers",
    title: "International transfers",
    body: [
      "Because we operate across regions, your information may be processed in a country other than your own. Where we transfer data internationally, we take steps to ensure it receives a comparable level of protection.",
    ],
  },
  {
    id: "grievance",
    title: "Grievance redressal",
    body: [
      "If you have a complaint about how your information has been handled, write to us at the email below and we'll address it as quickly as we reasonably can.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      "We may update this policy from time to time. We won't reduce your rights under this policy without your explicit consent, and we'll post any changes on this page along with a new effective date.",
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
        {"list" in section && section.list && (
          <ul className="m-0 mb-1 p-0 list-none">
            {section.list.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[15.5px] leading-7 mb-2.5" style={{ color: "var(--text-muted)" }}>
                <span className="shrink-0" style={{ color: ACCENT }}>
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
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

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl font-bold mb-2.5 tracking-tight">Privacy policy</h1>
            <p className="text-[15.5px] max-w-[560px] m-0" style={{ color: "var(--text-muted)" }}>
              How we collect, use, and protect information across our robots, apps, and website.
              Effective {EFFECTIVE_DATE}.
            </p>
          </Bracket>

          <Link
            href={`/${locale}/terms-and-conditions`}
            className="inline-flex items-center gap-2 mt-6 text-sm no-underline"
            style={{ color: "var(--text-muted)" }}
          >
            Looking for our Terms &amp; Conditions?
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
                  <span className="text-[14.5px] font-semibold">Questions about this policy?</span>
                </div>
                <p className="text-[14.5px] m-0" style={{ color: "var(--text-muted)" }}>
                  Write to us at <span style={{ color: ACCENT }}>privacy@malusrobotics.com</span> and
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
