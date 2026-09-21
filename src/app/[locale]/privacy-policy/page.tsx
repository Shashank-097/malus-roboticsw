"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Mail, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------
   MALÜS ROBOTICS — Privacy Policy
   Copy comes from the "privacy_page" namespace (see
   legal-translations-en.json / legal-translations-de.json).
   Container matches Navbar: max-w-7xl mx-auto px-6.
   pt-28/pt-32 clears the fixed navbar height.
------------------------------------------------------------------- */

const ACCENT = "#06b6d4";
const EFFECTIVE_DATE = "September 14, 2026";

type SectionData = {
  id: string;
  title: string;
  body: string[];
  list?: string[];
};

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
  section: SectionData;
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
        <span className="font-mono text-[13px] tracking-wide min-w-[34px]" style={{ color: ACCENT }}>
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
        {section.list && (
          <ul className="m-0 mb-1 p-0 list-none">
            {section.list.map((item, i) => (
              <li key={i} className="flex gap-2.5 text-[15.5px] leading-7 mb-2.5" style={{ color: "var(--text-muted)" }}>
                <span className="shrink-0" style={{ color: ACCENT }}>—</span>
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
  sections,
  activeId,
  onJump,
}: {
  sections: SectionData[];
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="sticky top-28 flex flex-col gap-0.5">
      {sections.map((s, i) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            className="flex gap-2.5 items-baseline text-left bg-transparent border-0 cursor-pointer px-2.5 py-[7px] border-l-2 transition-colors"
            style={{ borderColor: active ? ACCENT : "var(--steel-dark)" }}
          >
            <span className="font-mono text-[11px] min-w-[20px]" style={{ color: active ? ACCENT : "var(--steel-light)" }}>
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
  const t = useTranslations("privacy_page");
  const { locale } = useParams();

  const SECTIONS: SectionData[] = [
    { id: "overview", title: t("sec_overview_title"), body: [t("sec_overview_body1"), t("sec_overview_body2")] },
    {
      id: "collect",
      title: t("sec_collect_title"),
      body: [t("sec_collect_body1")],
      list: [t("sec_collect_list1"), t("sec_collect_list2"), t("sec_collect_list3"), t("sec_collect_list4")],
    },
    { id: "use", title: t("sec_use_title"), body: [t("sec_use_body1"), t("sec_use_body2")] },
    {
      id: "sharing",
      title: t("sec_sharing_title"),
      body: [t("sec_sharing_body1")],
      list: [
        t("sec_sharing_list1"),
        t("sec_sharing_list2"),
        t("sec_sharing_list3"),
        t("sec_sharing_list4"),
        t("sec_sharing_list5"),
      ],
    },
    { id: "security", title: t("sec_security_title"), body: [t("sec_security_body1")] },
    { id: "retention", title: t("sec_retention_title"), body: [t("sec_retention_body1")] },
    { id: "cookies", title: t("sec_cookies_title"), body: [t("sec_cookies_body1"), t("sec_cookies_body2")] },
    { id: "third-party", title: t("sec_thirdparty_title"), body: [t("sec_thirdparty_body1")] },
    { id: "children", title: t("sec_children_title"), body: [t("sec_children_body1")] },
    { id: "rights", title: t("sec_rights_title"), body: [t("sec_rights_body1")] },
    { id: "transfers", title: t("sec_transfers_title"), body: [t("sec_transfers_body1")] },
    { id: "grievance", title: t("sec_grievance_title"), body: [t("sec_grievance_body1")] },
    { id: "changes", title: t("sec_changes_title"), body: [t("sec_changes_body1")] },
  ];

  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleJump = (id: string) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "var(--bg-main)", color: "var(--text-main)" }} className="min-h-screen">
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
        <header className="pt-28 md:pt-32 pb-9">
          <Bracket>
            <h1 className="text-4xl font-bold mb-2.5 tracking-tight">{t("h1")}</h1>
            <p className="text-[15.5px] max-w-[560px] m-0" style={{ color: "var(--text-muted)" }}>
              {t("subtitle", { date: EFFECTIVE_DATE })}
            </p>
          </Bracket>

          <Link
            href={`/${locale}/terms-and-conditions`}
            className="inline-flex items-center gap-2 mt-6 text-sm no-underline"
            style={{ color: "var(--text-muted)" }}
          >
            {t("cross_link_text")}
            <span className="inline-flex items-center gap-1" style={{ color: ACCENT }}>
              {t("cross_link_cta")} <ArrowRight size={14} />
            </span>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 pb-20">
          <TocRail sections={SECTIONS} activeId={activeId} onJump={handleJump} />

          <div>
            {SECTIONS.map((s, i) => (
              <Section key={s.id} index={i} section={s} refCb={(el) => (sectionRefs.current[s.id] = el)} />
            ))}

            <div className="pt-9">
              <Bracket className="bg-[var(--bg-soft)]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Mail size={16} color={ACCENT} />
                  <span className="text-[14.5px] font-semibold">{t("contact_heading")}</span>
                </div>
                <p className="text-[14.5px] m-0" style={{ color: "var(--text-muted)" }}>
                  {t("contact_body", { email: t("contact_email") })}
                </p>
              </Bracket>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}