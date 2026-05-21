"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "../shared-components/footer";
import { BottomNav } from "../shared-components/bottom-nav";

const serif = "var(--font-fraunces)";
const mono = "var(--font-geist-mono)";

const tk = {
  ink: "#0e0e10",
  ink2: "#2a2a2e",
  muted: "#6b6b72",
  line: "#e8e6e0",
  line2: "#d9d6cf",
  bgSoft: "#f7f6f3",
  accent: "#2563eb",
  accentInk: "#1d4ed8",
  accentSoft: "#eaf1fc",
  amber: "#f0a13a",
  amberBg: "#fff7ea",
  amberSoft: "#fbeacb",
  rose: "#c25a4f",
  roseSoft: "#f4dcd6",
  green: "#3a7d5b",
};

const WRAP: React.CSSProperties = { maxWidth: "1200px", margin: "0 auto", padding: "0 32px" };
const SEC: React.CSSProperties = { padding: "56px 0" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: tk.muted, display: "inline-flex", alignItems: "center", gap: "10px", margin: "0 0 24px" }}>
      <span style={{ width: "24px", height: "1px", background: tk.ink, display: "inline-block" }} />
      {children}
    </p>
  );
}

function H2({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 24px", color: tk.ink, ...style }}>
      {children}
    </h2>
  );
}

export default function ScalableArchitectureProject() {
  return (
    <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "17px", lineHeight: "1.6", background: "#fff", color: tk.ink, WebkitFontSmoothing: "antialiased" }}>

      {/* TOP NAV */}
      <header style={{ padding: "28px 0 0" }}>
        <div style={{ ...WRAP, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
          <Link href="/" style={{ fontSize: "14px", color: tk.muted, textDecoration: "none", display: "inline-flex", gap: "8px", alignItems: "center", transition: "color .2s" }} className="hover:text-[#0e0e10]">
            <span style={{ fontFamily: serif, fontSize: "18px" }}>←</span>
            Back to Home
          </Link>
          <span style={{ fontFamily: mono, fontSize: "12px", color: tk.muted, letterSpacing: "0.04em" }}>CASE STUDY · 2026</span>
        </div>
      </header>

      {/* COVER */}
      <div style={WRAP}>
        <div style={{
          margin: "48px 0 80px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #0e0e10 0%, #1c1c20 100%)",
          color: "#fafaf7",
          overflow: "hidden",
          position: "relative",
          padding: "56px 56px 48px",
          minHeight: "380px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 85% 25%, rgba(240,161,58,0.18), transparent 45%), radial-gradient(circle at 15% 90%, rgba(37,99,235,0.18), transparent 50%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: mono, fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", margin: "0 0 12px" }}>
              Information Architecture · B2B SaaS
            </p>
            <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(40px, 5.4vw, 76px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: 0, maxWidth: "16ch" }}>
              Scaling a podcast platform from{" "}
              <em style={{ fontStyle: "italic", color: tk.amber }}>profile-centric</em>{" "}
              to{" "}
              <em style={{ fontStyle: "italic", color: tk.amber }}>task-centric</em>.
            </h1>
          </div>
          <div style={{ display: "flex", gap: "56px", flexWrap: "wrap", marginTop: "40px", position: "relative", zIndex: 1 }}>
            {[
              { label: "My Role", value: "Lead Product Designer" },
              { label: "Platform", value: "Web SaaS · Desktop" },
              { label: "Tags", value: "IA · Scalability · B2B · AdTech" },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <span style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>{label}</span>
                <span style={{ fontSize: "15px", color: "rgba(255,255,255,.92)", fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TLDR STRIP */}
      <section style={{ padding: "32px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", borderTop: `1px solid ${tk.ink}`, borderBottom: `1px solid ${tk.ink}`, padding: "32px 0" }}>
            <div style={{ paddingRight: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.rose }}>The Problem</span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>
                Built for one creator. Broke at <em>50 series</em>.
              </h3>
              <p style={{ fontSize: "14.5px", color: tk.muted, margin: 0 }}>Profile dropdown didn&apos;t scale. Brands duplicated per profile. Admin tasks required pogo-sticking in and out of every show.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: serif, fontSize: "38px", background: tk.ink, color: "#fff", width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
            </div>
            <div style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.green }}>The Shift</span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>
                One <em style={{ fontStyle: "italic", color: tk.green }}>workspace.</em> Apps and entities go global.
              </h3>
              <p style={{ fontSize: "14.5px", color: tk.muted, margin: 0 }}>Replaced the profile model with a task-centric App Hub. Brands, users, and reports live once — referenced everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section style={SEC}>
        <div style={WRAP}>
          <SectionLabel>Outcomes</SectionLabel>
          <H2>From a tool for one creator to an <em style={{ fontStyle: "italic", color: tk.rose }}>enterprise suite</em>.</H2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "32px" }}>
            {[
              { label: "Scale", num: "50", sup: "+", desc: "Series per workspace, across multi-agent networks — up from the dropdown's breaking point." },
              { label: "Data Integrity", num: "1", sup: "×", desc: "One canonical record per brand, referenced everywhere. Cross-agent performance rolls up automatically." },
              { label: "Modularity", num: "+2", sup: "", desc: "New modules (Accounting, Reports) shipping into the App Hub with no navigation rewrites." },
            ].map(({ label, num, sup, desc }) => (
              <div key={label} style={{ border: `1px solid ${tk.line}`, borderRadius: "14px", padding: "28px 24px 32px", background: tk.bgSoft, display: "flex", flexDirection: "column", gap: "16px", minHeight: "220px" }}>
                <span style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.muted }}>{label}</span>
                <div style={{ fontFamily: serif, fontSize: "56px", lineHeight: 1, color: tk.ink }}>
                  {num}{sup && <small style={{ fontSize: "22px", verticalAlign: "super", color: tk.muted, marginLeft: "2px" }}>{sup}</small>}
                </div>
                <p style={{ fontSize: "15px", color: tk.ink2, lineHeight: 1.5, marginTop: "auto", margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Before & After — concept (architecture diagram) + pixels (actual UI)
          ═══════════════════════════════════════ */}
      <section style={{ padding: "56px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            <p style={{ fontFamily: mono, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: tk.muted, display: "inline-flex", alignItems: "center", gap: "10px", margin: 0 }}>
              <span style={{ width: "24px", height: "1px", background: tk.ink, display: "inline-block" }} />
              Before &amp; After
            </p>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.01em", margin: 0, color: tk.ink }}>
              The pivot, in concept and pixels.
            </h2>
            <p style={{ color: tk.muted, lineHeight: 1.6, maxWidth: "60ch", fontSize: "16px", margin: 0 }}>
              Same user, same job — different mental model. The legacy nav forced a profile choice up front; the new design replaces silos with a task-centric App Hub.
            </p>
          </div>

          {/* Before */}
          <div className="mb-8">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "14px", background: "#ebe9e3", color: tk.muted }}>
              <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>01</span> Before · Profile-Centric
            </span>
            <div className="relative flex gap-5 items-start">
              {/* Before image — soft tk.line border + subtle drop shadow, consistent with page palette */}
              <div
                className="shrink-0 rounded-xl overflow-hidden"
                style={{
                  width: "640px",
                  border: `1px solid ${tk.line}`,
                  boxShadow: "0 1px 2px rgba(14, 14, 16, 0.04), 0 8px 24px -8px rgba(14, 14, 16, 0.10)",
                }}
              >
                <Image
                  src="/designs/before-profile-nav.png"
                  alt="Legacy ART19 admin: a profile picker dropdown listing all Series, Networks, and Ad Reps."
                  width={2896}
                  height={1936}
                  className="block w-full h-auto align-top"
                  priority={false}
                />
              </div>

              {/* Right column: top-aligned with image */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                {/* Scrollable Profile Picker callout — Workspace Picker layout, badge #1 */}
                <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-zinc-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                    <span className="text-xs font-bold text-zinc-900">Scrollable Profile Picker</span>
                  </div>
                  <ul className="flex flex-col gap-1 pl-1">
                    {(["Long scroll when the user manages multiple accounts", "One flat dropdown for every series, network, and ad rep", "Identity-as-context — no task focus"] as string[]).map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[11px] text-zinc-700 leading-snug">
                        <span className="mt-1 w-1 h-1 rounded-full bg-[#6b6b72] shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architecture mini-diagram */}
                <div style={{ border: `1px solid ${tk.line}`, borderRadius: "12px", background: tk.bgSoft, padding: "16px 16px 14px" }}>
                  <div style={{ fontFamily: mono, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.rose, marginBottom: "6px" }}>
                    Profile-Centric Model
                  </div>
                  <h4 style={{ fontFamily: serif, fontWeight: 400, fontSize: "16px", margin: "0 0 14px", lineHeight: 1.2, color: tk.ink }}>
                    Each <em style={{ fontStyle: "italic" }}>profile</em> is its own island.
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ border: `1px solid ${tk.line2}`, background: "#fff", borderRadius: "5px", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: tk.ink, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: tk.ink }} /> User
                    </span>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                      {([
                        { name: "Series A", tasks: ["Episodes", "Users", "Analytics"] },
                        { name: "Series B", tasks: ["Episodes", "Users", "Analytics"] },
                        { name: "Network C", tasks: ["Series", "Users", "Analytics"] },
                        { name: "Ad Rep D", tasks: ["Campaigns", "Brands", "Ad Analytics"] },
                      ] as { name: string; tasks: string[] }[]).map(({ name, tasks }) => (
                        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", position: "relative", paddingTop: "8px" }}>
                          <div style={{ position: "absolute", top: 0, left: "50%", width: "1px", height: "8px", background: tk.line2 }} />
                          <span style={{ border: `1px solid ${tk.line2}`, background: "#fff", borderRadius: "5px", padding: "3px 7px", fontSize: "9.5px", fontWeight: 600, color: tk.ink, display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                            <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: tk.rose }} /> Profile: {name}
                          </span>
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignItems: "center", position: "relative", paddingTop: "6px" }}>
                            <div style={{ position: "absolute", top: 0, left: "50%", width: "1px", height: "6px", background: tk.line2 }} />
                            {tasks.map((t) => (
                              <span key={t} style={{ border: `1px solid ${tk.line2}`, background: "#fff", borderRadius: "4px", padding: "2px 6px", fontSize: "9px", fontWeight: 500, color: tk.ink2, display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: tk.muted }} /> {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontFamily: mono, fontSize: "9px", color: tk.rose, letterSpacing: "0.04em", textAlign: "center", margin: "6px 0 0" }}>
                      ↳ Same entity, duplicated <em>n</em> times.
                    </p>
                  </div>
                </div>
              </div>

              {/* Horizontal dashed annotation: dot on dropdown → Scrollable Profile Picker callout box */}
              <svg className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", width: "100%", height: "100%" }}>
                <circle cx="628" cy="50" r="7" fill="#71717a" />
                <path d="M635,50 H660" stroke="#71717a" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.6" />
              </svg>
            </div>
            <p className="text-xs text-[#6b6b72] mt-2 leading-relaxed">
              One dropdown holding every series, network, and ad rep — flat, alphabetical, identity-as-context.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#6b6b72]">became</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          {/* After */}
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "14px", background: tk.green, color: "#fff", boxShadow: "0 4px 12px -4px rgba(58,125,91,.4)" }}>
              <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>02</span> After · Task-Centric
            </span>
            <div className="relative">
              {/* Top row: iframe + right column (Workspace Picker callout + mini-hub) */}
              <div className="flex gap-5 items-start">
                <div className="shrink-0 rounded-xl overflow-hidden border border-[#bfd0da] shadow-md" style={{ width: "832px", height: "555px" }}>
                  <iframe
                    src="/demo/workspace-flow?static=1"
                    title="ART19 Publisher — workspace picker open, series catalog"
                    className="block border-0"
                    style={{ width: "1440px", height: "960px", transform: "scale(0.5778)", transformOrigin: "top left" }}
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col gap-3 flex-1 min-w-0">
                  {/* Workspace Picker callout — line ① target, placed at top. Sky color (swapped with Series List). */}
                  <div className="rounded-xl bg-sky-50 border border-sky-100 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                      <span className="text-xs font-bold text-sky-900">Workspace Picker</span>
                    </div>
                    <ul className="flex flex-col gap-1 pl-1">
                      {(["Focus on one area without distraction", "Switch by category: Publisher, Ads, Accounting", "Role decides what you see"] as string[]).map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-[11px] text-sky-800 leading-snug">
                          <span className="mt-1 w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture mini-hub */}
                  <div style={{ border: "1px solid #d8e3f7", borderRadius: "12px", background: tk.accentSoft, padding: "16px 14px 14px" }}>
                    <div style={{ fontFamily: mono, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.accentInk, marginBottom: "6px" }}>
                      Task-Centric Model
                    </div>
                    <h4 style={{ fontFamily: serif, fontWeight: 400, fontSize: "16px", margin: "0 0 12px", lineHeight: 1.2, color: tk.ink }}>
                      One <em style={{ fontStyle: "italic" }}>hub.</em> Tasks reach everywhere.
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <span style={{ border: `1px solid ${tk.line2}`, background: "#fff", borderRadius: "5px", padding: "4px 8px", fontSize: "10px", fontWeight: 600, color: tk.ink, display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: tk.ink }} /> User
                      </span>
                      <span style={{ border: `1px solid ${tk.accent}`, background: "#fff", borderRadius: "7px", padding: "5px 12px", fontWeight: 700, fontSize: "10.5px", color: tk.accentInk, display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "2px", background: tk.accent }} />
                        Workspace · App Hub
                      </span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", width: "100%", position: "relative", paddingTop: "12px" }}>
                        <div style={{ position: "absolute", top: 0, left: "50%", width: "1px", height: "12px", background: tk.accent }} />
                        {([
                          ["Home", tk.ink],
                          ["Publishers", "#6e6ef2"],
                          ["Ads", tk.amber],
                          ["Setting", tk.muted],
                          ["Deals & Billings", tk.green],
                          ["Reports", tk.rose],
                        ] as [string, string][]).map(([name, color]) => (
                          <div key={name} style={{ border: "1px solid #d8e3f7", background: "#fff", borderRadius: "5px", padding: "5px 4px", fontSize: "9px", fontWeight: 600, color: tk.ink, textAlign: "center" }}>
                            <span style={{ display: "block", width: "9px", height: "9px", borderRadius: "2px", margin: "0 auto 3px", background: color }} />
                            {name}
                          </div>
                        ))}
                        <div style={{ gridColumn: "1 / -1", border: "1px solid #d8e3f7", background: "#fff", borderRadius: "5px", padding: "5px 4px", fontSize: "9px", fontWeight: 600, color: tk.ink, textAlign: "center" }}>
                          <span style={{ display: "block", width: "9px", height: "9px", borderRadius: "2px", margin: "0 auto 3px", background: tk.accentInk }} />
                          User Management
                        </div>
                      </div>
                      <p style={{ fontFamily: mono, fontSize: "9px", color: tk.green, letterSpacing: "0.04em", textAlign: "center", margin: "6px 0 0" }}>
                        ↳ One source of truth. Modular.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row: List of Series/Network callout — right-aligned below iframe, hugs content, vertical bullets, navy color */}
              <div className="mt-3 flex" style={{ width: "832px", justifyContent: "flex-end" }}>
                <div className="rounded-xl bg-[#ebf0f3] border border-[#d9e3e9] p-3" style={{ maxWidth: "832px" }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#004369] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                    <span className="text-xs font-bold text-[#003255]">List of Series, Network to replace profile picker</span>
                  </div>
                  <ul className="flex flex-col gap-1 pl-1">
                    {(["Search across every series instantly", "Bulk-edit metadata and settings", "Central hub — no duplication, no context switching"] as string[]).map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[11px] text-[#004369] leading-snug">
                        <span className="mt-1 w-1 h-1 rounded-full bg-[#80a1b4] shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dashed annotations: ① horizontal from workspace-picker dropdown → Workspace Picker callout; ② vertical-down from series-table dot → List of Series callout */}
              <svg className="absolute inset-0 pointer-events-none" style={{ overflow: "visible", width: "100%", height: "100%" }}>
                <circle cx="222" cy="50" r="7" fill="#0284c7" />
                <path d="M229,50 H862" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.55" />
                <circle cx="815" cy="221" r="7" fill="#004369" />
                <path d="M815,228 V578" stroke="#004369" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.55" />
              </svg>
            </div>
            <p className="text-xs text-[#6b6b72] mt-3 leading-relaxed">
              Role-aware workspace picker + searchable series catalog — no dead ends, no duplication.
            </p>
          </div>
        </div>
      </section>

      {/* RECEIPTS */}
      <section style={SEC}>
        <div style={WRAP}>
          <SectionLabel>Why It Works · Receipts</SectionLabel>
          <H2>Three improvements that <em style={{ fontStyle: "italic", color: tk.rose }}>only exist</em> in the new model.</H2>

          {/* ── Improvement 01: Nike ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", paddingTop: "24px", paddingBottom: "72px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontFamily: serif, fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— Reason 01 · Data Normalization —</span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                From a <em style={{ fontStyle: "italic", color: tk.rose }}>fragmented brand blackout</em> to one source of truth.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Brands like Nike were recreated by hand inside every Ad Agent profile — disconnected copies, no way to aggregate reach or performance.
              </p>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>After:</strong> Brands decoupled from Agent profiles and moved into a <strong>Global Brand Library</strong>. Created once. Shared across the platform. Tracked in aggregate.
              </p>
              <div style={{ display: "flex", gap: "28px", marginTop: "12px", flexWrap: "wrap" }}>
                {[
                  { k: "Single Source of Truth", v: "1", vsub: " brand" },
                  { k: "Incremental Insights", v: "Aggregate", vColor: tk.green },
                  { k: "Operational Efficiency", v: "No duplicates" },
                ].map(({ k, v, vsub, vColor }) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontFamily: serif, fontSize: vsub ? "30px" : "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: vsub ? "0" : "8px" }}>
                      {v}{vsub && <small style={{ fontSize: "16px", color: tk.muted, marginLeft: "2px" }}>{vsub}</small>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Before: Nike duplicated */}
              <div style={{ marginBottom: "22px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: "#ebe9e3", color: tk.muted }}>
                  <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>01</span> Before · Profile-Centric
                </span>
                <div style={{ border: `1px solid ${tk.line}`, borderRadius: "12px", background: "#f1f0ec", padding: "16px", opacity: 0.88 }}>
                  <span style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted, display: "block", marginBottom: "10px" }}>Same brand, duplicated <strong>6×</strong> — disconnected, inconsistent naming</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {[
                      ["Nike", "Wondery USA"], ["Nike Inc.", "Targeted Ads"],
                      ["Nike", "Wondery DE"], ["Nike USA", "Wondery UK"],
                      ["Nike Inc.", "Originals"], ["Nike", "LATAM"],
                    ].map(([name, src]) => (
                      <div key={src} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "6px", fontSize: "12.5px" }}>
                        <span style={{ width: "6px", height: "6px", background: tk.muted, borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontWeight: 700, color: "#5c5c63" }}>{name}</span>
                        <span style={{ color: tk.muted, fontFamily: mono, fontSize: "10.5px", marginLeft: "auto" }}>{src}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "10.5px", color: tk.muted, letterSpacing: "0.04em", paddingTop: "8px" }}>
                    <span style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d9d6cf 0 4px, transparent 4px 8px)" }} />
                    No shared ID · no rollup
                    <span style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d9d6cf 0 4px, transparent 4px 8px)" }} />
                  </div>
                </div>
              </div>

              {/* After: Nike card */}
              <div style={{ position: "relative", paddingTop: "22px", borderTop: `1px dashed ${tk.line2}` }}>
                <span style={{ position: "absolute", top: "-14px", left: "24px", background: tk.ink, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "18px", boxShadow: "0 0 0 4px #fff" }}>↓</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.green, color: "#fff", boxShadow: "0 4px 12px -4px rgba(58,125,91,.4)" }}>
                  <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>02</span> After · Global Brand Library
                </span>
                <div style={{ border: `2px solid ${tk.green}`, borderRadius: "16px", background: "#fff", padding: "28px", boxShadow: "0 30px 60px -25px rgba(58,125,91,.28), 0 0 0 6px rgba(58,125,91,.06)", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: tk.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "22px", fontStyle: "italic" }}>N</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "-0.01em" }}>Nike</div>
                        <div style={{ fontFamily: mono, fontSize: "11px", color: tk.muted, marginTop: "2px" }}>style &amp; fashion · nike.com</div>
                      </div>
                    </div>
                    <span style={{ fontFamily: mono, fontSize: "11px", padding: "4px 8px", borderRadius: "4px", background: tk.amberBg, color: tk.amber, letterSpacing: "0.08em" }}>★ Top Performer</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", borderTop: `1px solid ${tk.line}`, paddingTop: "18px" }}>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>This week</div>
                      <div style={{ fontFamily: serif, fontSize: "32px", lineHeight: 1.1, color: tk.ink }}>9.1M<small style={{ fontSize: "14px", color: tk.green, marginLeft: "4px" }}>▲ +12%</small></div>
                    </div>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>All time</div>
                      <div style={{ fontFamily: serif, fontSize: "32px", lineHeight: 1.1, color: tk.ink }}>142M</div>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${tk.line}`, paddingTop: "16px" }}>
                    <div style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted, marginBottom: "10px" }}>Cross-network rollup</div>
                    {[["Wondery USA", 78, "4.1M"], ["Targeted Ads", 52, "2.8M"], ["Wondery Germany", 28, "1.5M"], ["Wondery+ Originals", 12, "0.7M"]].map(([src, pct, val]) => (
                      <div key={String(src)} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", marginBottom: "8px" }}>
                        <span style={{ flex: 1, fontWeight: 600 }}>{src}</span>
                        <div style={{ flex: 2, height: "8px", borderRadius: "4px", background: tk.bgSoft, overflow: "hidden" }}>
                          <span style={{ display: "block", height: "100%", background: tk.accent, borderRadius: "4px", width: `${pct}%` }} />
                        </div>
                        <span style={{ fontFamily: mono, fontSize: "12px", color: tk.muted, minWidth: "56px", textAlign: "right" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Improvement 02: Bulk Management (flip) ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px", paddingBottom: "72px" }}>
            <div>
              {/* Before: Pogo diagram */}
              <div style={{ marginBottom: "22px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: "#ebe9e3", color: tk.muted }}>
                  <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>01</span> Before · Pogo-Stick Model
                </span>
                <div style={{ border: `1px solid ${tk.line}`, background: "#f1f0ec", borderRadius: "14px", padding: "22px", opacity: 0.92 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px", gap: "12px" }}>
                    <span style={{ fontFamily: serif, fontSize: "18px", lineHeight: 1.2, color: tk.ink }}>One user, five shows.</span>
                    <span style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>5 separate environments</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {["Series A", "Series B", "Series C", "Series D", "Series E"].map((s, i) => (
                      <div key={s}>
                        <div style={{ background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "8px", padding: "9px 12px", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontFamily: mono, fontSize: "10px", color: tk.muted, width: "14px" }}>0{i + 1}</span>
                          <span style={{ fontWeight: 700, flex: 1 }}>{s} · Users</span>
                          <span style={{ fontFamily: mono, fontSize: "10.5px", color: "#6b6b72", padding: "3px 8px", borderRadius: "4px", background: "#e6e4de" }}>+ add Jane Doe</span>
                        </div>
                        {i < 4 && (
                          <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
                            <svg viewBox="0 0 24 18" fill="none" style={{ width: "14px", height: "12px" }}>
                              <line x1="12" y1="2" x2="12" y2="14" stroke="#a0a0a6" strokeWidth="1.6" strokeLinecap="round" />
                              <polyline points="7,9 12,14 17,9" stroke="#a0a0a6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: `1px dashed ${tk.line2}`, display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                    <span style={{ fontFamily: serif, fontSize: "18px", lineHeight: 1.2, letterSpacing: "-0.005em", color: "#6b6b72" }}>10+ clicks per user update</span>
                  </div>
                </div>
              </div>

              {/* After: UMA app */}
              <div style={{ position: "relative", paddingTop: "22px", borderTop: `1px dashed ${tk.line2}` }}>
                <span style={{ position: "absolute", top: "-14px", left: "24px", background: tk.ink, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: "18px", boxShadow: "0 0 0 4px #fff" }}>↓</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: mono, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.green, color: "#fff", boxShadow: "0 4px 12px -4px rgba(58,125,91,.4)" }}>
                  <span style={{ fontFamily: serif, fontSize: "14px", fontWeight: 400 }}>02</span> After · Centralized Workspace App
                </span>
                <div style={{ border: `2px solid ${tk.accent}`, background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 30px 60px -25px rgba(37,99,235,.32), 0 0 0 6px rgba(37,99,235,.07)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 18px", background: tk.accentSoft, borderBottom: "1px solid #d8e3f7" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: tk.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "-0.005em", color: tk.accentInk }}>User Management App</span>
                    <span style={{ fontFamily: mono, fontSize: "10.5px", color: tk.accentInk, letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: "auto", opacity: 0.75 }}>Workspace · Bulk Actions</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(130px, 1fr) 80px minmax(140px, 1fr)", padding: "22px 20px 18px", alignItems: "center" }}>
                    <div style={{ background: tk.accentSoft, border: "1px solid #cdd9ec", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: tk.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>JD</div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: "15px" }}>Jane Doe</div>
                          <div style={{ fontFamily: mono, fontSize: "10.5px", color: tk.accentInk, marginTop: "2px" }}>Ad Ops · new hire</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "relative", height: "100%", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: tk.accent, color: "#fff", fontFamily: mono, fontSize: "9.5px", letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 8px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 1, boxShadow: "0 4px 12px -4px rgba(37,99,235,.4)" }}>Bulk Select</span>
                      <svg viewBox="0 0 90 220" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                        <path d="M 4 110 C 40 110, 50 18, 86 18" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M 4 110 C 40 110, 50 64, 86 64" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M 4 110 L 86 110" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M 4 110 C 40 110, 50 156, 86 156" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M 4 110 C 40 110, 50 202, 86 202" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinecap="round" />
                        <polyline points="80,14 88,18 80,22" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinejoin="round" />
                        <polyline points="80,60 88,64 80,68" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinejoin="round" />
                        <polyline points="80,106 88,110 80,114" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinejoin="round" />
                        <polyline points="80,152 88,156 80,160" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinejoin="round" />
                        <polyline points="80,198 88,202 80,206" fill="none" stroke={tk.accent} strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {["Series A", "Series B", "Series C", "Series D", "Series E"].map(s => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "8px", padding: "8px 12px", fontSize: "13px" }}>
                          <span style={{ width: "16px", height: "16px", borderRadius: "4px", background: tk.green, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0 }}>✓</span>
                          <span style={{ fontWeight: 700, flex: 1 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px dashed #d8e3f7", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", background: "#fafbff" }}>
                    <span style={{ fontFamily: serif, fontSize: "18px", lineHeight: 1.2, letterSpacing: "-0.005em", color: tk.accentInk }}>3 clicks for the entire account</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontFamily: serif, fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— Reason 02 · Operational Velocity —</span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                From <em style={{ fontStyle: "italic", color: tk.rose }}>manual sprints</em> to bulk actions.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Managing access was an exercise in pogo-sticking. Adding one teammate to five shows meant navigating into five separate series environments.
              </p>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>After:</strong> Centralized <strong>Workspace Apps</strong> — User Management, Accounting — decoupling administrative tasks from individual content silos.
              </p>
              <div style={{ display: "flex", gap: "28px", marginTop: "12px", flexWrap: "wrap" }}>
                {[
                  { k: "Unified Bulk Control", v: "Multi-select" },
                  { k: "Onboarding at Scale", v: "Seconds", vColor: tk.green },
                  { k: "Navigation overhead", v: "−90", vsub: "%" },
                ].map(({ k, v, vsub, vColor }) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontFamily: serif, fontSize: vsub ? "30px" : "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: "8px" }}>
                      {v}{vsub && <small style={{ fontSize: "16px", color: tk.muted }}>{vsub}</small>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Improvement 03: Personalization ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontFamily: serif, fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— Reason 03 · Intelligent Personalization —</span>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                Self-serve workspaces, <em style={{ fontStyle: "italic", color: tk.rose }}>shaped by role</em>.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Every user — executives, ad agents, content creators — was funneled through the same flat entry point. Onboarding friction was high.
              </p>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>After:</strong> The App Picker coupled with role definitions builds a dynamic, <strong>self-serve Home Screen</strong> that adapts to who&apos;s logged in.
              </p>
              <div style={{ display: "flex", gap: "28px", marginTop: "12px", flexWrap: "wrap" }}>
                {[
                  { k: "Role-Optimized Cockpits", v: "4 personas" },
                  { k: "Self-Onboarding", v: "Zero-train", vColor: tk.green },
                  { k: "Proactive Summaries", v: "Upfront" },
                ].map(({ k, v, vColor }) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontFamily: serif, fontSize: "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: "8px" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  {
                    name: "Podcast Manager",
                    apps: [
                      { label: "Publisher", bg: "#f0e7fb", border: "#ddc9f3", nameColor: "#6b41a8", items: ["Series", "Networks", "Publisher Settings"] },
                      { label: "User Management", bg: "#e3f1e7", border: "#c3dec9", nameColor: "#2e7548", items: ["User Access", "Roles Definition"] },
                      { label: "Reports", bg: "#fde6e0", border: "#f3cabf", nameColor: "#b14e44", items: ["Podcast Performance"] },
                    ],
                  },
                  {
                    name: "Campaign Manager",
                    apps: [
                      { label: "Ads", bg: "#e3edff", border: "#c8d8f5", nameColor: "#1d4ed8", items: ["Ad Reps", "System Brands", "Agencies", "Creatives"] },
                      { label: "Reports", bg: "#fde6e0", border: "#f3cabf", nameColor: "#b14e44", items: ["Ad Delivery"] },
                    ],
                  },
                  {
                    name: "Account Manager / Sales",
                    apps: [
                      { label: "Ads", bg: "#e3edff", border: "#c8d8f5", nameColor: "#1d4ed8", items: ["Ad Account Management"] },
                      { label: "Deals & Billings", bg: "#fff0d6", border: "#f0d8a4", nameColor: "#9c5715", items: ["Customers", "Publisher Deals", "Insertion Orders"] },
                    ],
                  },
                  {
                    name: "Analyst",
                    apps: [
                      { label: "Reports", bg: "#fde6e0", border: "#f3cabf", nameColor: "#b14e44", items: ["Podcast Performance", "Ad Delivery"] },
                    ],
                  },
                ].map(({ name, apps }) => (
                  <div key={name} style={{ border: `1px solid ${tk.line}`, borderRadius: "12px", background: "#fff", padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ paddingBottom: "10px", borderBottom: `1px solid ${tk.line}` }}>
                      <div style={{ fontFamily: serif, fontSize: "19px", lineHeight: 1.1, color: tk.ink, letterSpacing: "-0.005em" }}>{name}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {apps.map(app => (
                        <div key={app.label} style={{ borderRadius: "8px", padding: "10px 12px 11px", display: "flex", flexDirection: "column", gap: "7px", border: `1px solid ${app.border}`, background: app.bg }}>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 800, letterSpacing: "0.02em", color: app.nameColor }}>{app.label}</span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                            {app.items.map(item => (
                              <span key={item} style={{ fontSize: "11px", padding: "3px 7px", background: "#fff", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.05)", fontWeight: 500, color: tk.ink, whiteSpace: "nowrap" }}>{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL DESIGN */}
      <section style={SEC}>
        <div style={WRAP}>
          <SectionLabel>Final Design</SectionLabel>
          <H2>The workspace, in production.</H2>
          <p style={{ maxWidth: "60ch", color: tk.muted, fontSize: "16px", margin: "0 0 0" }}>
            The Advertisers workspace surfaces system-level metrics that simply couldn&apos;t exist before — total impressions, weekly rollups, and the top brand performer across every network.
          </p>
          <div style={{ marginTop: "24px", borderRadius: "14px", overflow: "hidden", border: `1px solid ${tk.line}`, background: tk.bgSoft, boxShadow: "0 1px 0 rgba(0,0,0,.02), 0 30px 60px -25px rgba(0,0,0,.18)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", background: "#ececec", borderBottom: `1px solid ${tk.line}` }}>
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff6058", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ffbe2f", display: "inline-block" }} />
              <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#2aca44", display: "inline-block" }} />
              <span style={{ flex: 1, marginLeft: "8px", background: "#fff", borderRadius: "6px", padding: "4px 10px", fontFamily: mono, fontSize: "11.5px", color: tk.muted }}>workspace · Advertisers › System Brands</span>
            </div>
            <Image src="/workspace-hub.png" alt="System Brands page inside the Advertisers workspace — final design" width={1200} height={800} style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <p style={{ fontFamily: mono, fontSize: "12px", color: tk.muted, marginTop: "14px", letterSpacing: "0.02em", textAlign: "center" }}>
            FINAL · ADVERTISERS WORKSPACE · GLOBAL BRAND LIBRARY · SYSTEM-LEVEL METRICS
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <div style={WRAP}>
        <BottomNav
          previousProject="/projects/brand-approval"
          previousProjectName="Brand Approval Flow"
          nextProject="/projects/app-onboard"
          nextProjectName="Application Onboarding"
          textColor="text-zinc-700"
          hoverColor="hover:text-zinc-900"
        />
        <Footer customValue="max-w-[1200px]" dark />
      </div>
    </div>
  );
}
