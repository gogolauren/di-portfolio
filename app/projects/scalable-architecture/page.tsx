"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "../shared-components/footer";
import { BottomNav } from "../shared-components/bottom-nav";
import { WorkspacePrototype } from "./WorkspacePrototype";


const tk = {
  ink: "#171717",
  ink2: "#171717",
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
    <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: tk.muted, display: "inline-flex", alignItems: "center", gap: "10px", margin: "0 0 24px" }}>
      <span style={{ width: "24px", height: "1px", background: tk.ink, display: "inline-block" }} />
      {children}
    </p>
  );
}

function H2({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2 style={{ fontWeight: 400, fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.01em", margin: "0 0 24px", color: tk.ink, ...style }}>
      {children}
    </h2>
  );
}

// ── Role-mapping matrix data ──────────────────────────────────────────────────
const RMAP_TASKS: [string, string][] = [
  ["Check", "avails"],
  ["Set up", "campaigns"],
  ["Set up VAST", "campaigns"],
  ["Create & upload", "ads"],
  ["Monitor &", "ensure delivery"],
  ["Add 3p pixels", "to campaigns"],
  ["Report Ad Ops", "insights"],
  ["Track campaign", "performance"],
];

const RMAP_CLUSTER_STRIPES: Record<string, string> = {
  pub: "#8b5dc4",
  sales: "#2563eb",
  ops: "#f0a13a",
  data: "#c25a4f",
};

const RMAP_ROLES: { name: string; blurb: string; cluster: string; cells: string[] }[] = [
  { name: "Social Media & Marketing", blurb: "Grows listenership; promotes show",       cluster: "pub",   cells: ["e","e","e","e","e","e","e","e"] },
  { name: "Monetization",             blurb: "Drives subscriptions + ad revenue",        cluster: "pub",   cells: ["e","e","e","e","e","e","e","e"] },
  { name: "Podcast Data Analyst",     blurb: "Reports show performance",                 cluster: "pub",   cells: ["e","e","e","e","e","e","e","e"] },
  { name: "Account Executive",        blurb: "Sells inventory to brands",                cluster: "sales", cells: ["e","h","h","e","e","e","e","m"] },
  { name: "Account Manager",          blurb: "Implements deals as IOs",                  cluster: "sales", cells: ["h","e","e","e","h","e","e","e"] },
  { name: "Ad Producer",              blurb: "Records + delivers ad creative",           cluster: "ops",   cells: ["e","e","e","h","e","e","e","e"] },
  { name: "Ad Ops Team Lead",         blurb: "Manages structure + assignments",          cluster: "ops",   cells: ["e","e","e","e","e","e","m","m"] },
  { name: "Ad Ops Campaign Manager",  blurb: "Owns delivery end-to-end",                 cluster: "ops",   cells: ["m","h","h","m","h","m","m","m"] },
  { name: "Marketing Manager",        blurb: "Attracts new ad customers",                cluster: "ops",   cells: ["e","e","e","e","e","e","e","m"] },
  { name: "Rev Ops / Yield Ops",      blurb: "Tracks avails + sell-through",             cluster: "data",  cells: ["m","e","e","e","e","e","e","m"] },
  { name: "Data Analyst",             blurb: "Reports performance + insights",           cluster: "data",  cells: ["m","e","e","e","e","e","e","h"] },
];

const RMAP_CLUSTERS: {
  id: string; tag: string; accent: string; tagBg: string;
  title: { prefix: string; em: string; suffix: string };
  roles: string[]; persona: string;
}[] = [
  { id: "pub",   tag: "Cluster 01", accent: "#6b41a8", tagBg: "#f0e7fb", title: { prefix: "Show & ",     em: "growth",  suffix: "." }, roles: ["Social Media & Marketing", "Monetization", "Podcast Data Analyst"],       persona: "Podcast Manager" },
  { id: "sales", tag: "Cluster 02", accent: "#1d4ed8", tagBg: "#eaf1fc", title: { prefix: "Deals & ",    em: "billing", suffix: "." }, roles: ["Account Executive", "Account Manager", "Marketing Manager"],              persona: "Account Manager / Sales" },
  { id: "ops",   tag: "Cluster 03", accent: "#9c5715", tagBg: "#fbeacb", title: { prefix: "Daily ",      em: "ad ops",  suffix: "." }, roles: ["Ad Producer", "Ad Ops Team Lead", "Ad Ops Campaign Manager"],            persona: "Campaign Manager" },
  { id: "data",  tag: "Cluster 04", accent: "#a14a40", tagBg: "#f4dcd6", title: { prefix: "Reporting & ", em: "yield",  suffix: "." }, roles: ["Rev Ops / Yield Ops", "Data Analyst"],                                   persona: "Analyst" },
];
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_DEFS: { id: string; persona: string; perms: { cat: string; tone: string; segs: { items: string; scope: string }[] }[] }[] = [
  {
    id: "Role_1", persona: "Podcast Manager",
    perms: [
      { cat: "Publisher",       tone: "resource", segs: [{ items: "owned Series, owned Network, Publisher Settings", scope: "Edit" }] },
      { cat: "User Management", tone: "identity", segs: [{ items: "User Access", scope: "Edit" }] },
      { cat: "Reports",         tone: "analysis", segs: [{ items: "Performance of owned Series", scope: "Edit" }] },
    ],
  },
  {
    id: "Role_2", persona: "Campaign Manager",
    perms: [
      { cat: "Ads",     tone: "global",   segs: [{ items: "owned Ad Reps", scope: "Edit" }, { items: "System Brands, Agencies, Creatives", scope: "Read" }] },
      { cat: "Reports", tone: "analysis", segs: [{ items: "Performance of owned Ad Reps/campaigns", scope: "Edit" }] },
    ],
  },
];

const PERM_BG: Record<string, string> = {
  resource: "#ece1f9",
  global:   "#d8e6fb",
  identity: "#d3eedd",
  profile:  "#e6e4de",
  analysis: "#f7dcd6",
  deals:    "#fbecc4",
};

const USER_ACCESS: { name: string; account: string; roles: string[]; profiles: string[] }[] = [
  { name: "Amy",    account: "amya@art19.com",    roles: ["Role_1"],           profiles: ["Series a", "Series b", "Series c", "Network a"] },
  { name: "Betty",  account: "bettyb@art19.com",  roles: ["Role_2"],           profiles: ["Ad Rep a", "Ad Rep b", "Ad Rep c"] },
  { name: "Carlos", account: "carlosc@art19.com", roles: ["Role_3"],           profiles: ["Series f", "Network c"] },
  { name: "Daniel", account: "danield@art19.com", roles: ["Role_1", "Role_2"], profiles: ["Series e", "Network b", "Ad Rep d"] },
];

export default function ScalableArchitectureProject() {
  const router = useRouter();
  const beforeBandRef = useRef<HTMLDivElement>(null);
  const afterBandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("hasAccess");
    if (!hasAccess) {
      router.replace("/projects/project-access?target=scalable-architecture");
    }
  }, [router]);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    function setupBand(wrap: HTMLDivElement | null) {
      if (!wrap) return;
      const svg = wrap.querySelector<SVGSVGElement>(".ba2-connectors");
      if (!svg) return;
      const figure = wrap.querySelector<HTMLElement>(".ba2-figure");
      if (!figure) return;
      const imgEl = figure.querySelector<HTMLImageElement>("img");
      if (!imgEl) return;
      let dots: { x: number; y: number; color: string; delay: number }[] = [];
      try { dots = JSON.parse(svg.dataset.dots || "[]"); } catch (e) {}
      if (!dots.length) return;
      function draw() {
        if (window.innerWidth < 980) { svg!.style.display = "none"; return; }
        svg!.style.display = "";
        const wb = wrap!.getBoundingClientRect();
        const ib = imgEl!.getBoundingClientRect();
        svg!.setAttribute("viewBox", `0 0 ${wb.width} ${wb.height}`);
        svg!.setAttribute("preserveAspectRatio", "none");
        const pulse = (cx: number, cy: number, color: string, delay: number) => `
          <circle cx="${cx}" cy="${cy}" r="6" fill="${color}">
            <animate attributeName="r" values="6;26" dur="2s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0" dur="2s" begin="${delay}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${cx}" cy="${cy}" r="6" fill="${color}" opacity="0">
            <animate attributeName="r" values="6;26" dur="2s" begin="${delay + 1}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0" dur="2s" begin="${delay + 1}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${cx}" cy="${cy}" r="8" fill="#fff"/>
          <circle cx="${cx}" cy="${cy}" r="5" fill="${color}"/>
        `;
        svg!.innerHTML = dots.map(d => {
          const x = ib.left - wb.left + ib.width * d.x;
          const y = ib.top - wb.top + ib.height * d.y;
          return pulse(x, y, d.color, d.delay || 0);
        }).join("");
      }
      function ready() {
        draw();
        window.addEventListener("resize", draw);
        const ro = new ResizeObserver(draw);
        ro.observe(wrap!);
        cleanups.push(() => { window.removeEventListener("resize", draw); ro.disconnect(); });
      }
      if (imgEl.complete) ready();
      else imgEl.addEventListener("load", ready);
      if (document.fonts?.ready) document.fonts.ready.then(draw);
    }
    setupBand(beforeBandRef.current);
    setupBand(afterBandRef.current);
    return () => cleanups.forEach(c => c());
  }, []);

  return (
    <div style={{ fontSize: "17px", lineHeight: "1.6", background: "#fff", color: tk.ink, WebkitFontSmoothing: "antialiased" }}>

      {/* ── Global responsive overrides (inline styles need !important to beat) ── */}
      <style>{`
        @media (max-width: 860px) {
          .imp-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding-top: 40px !important; padding-bottom: 48px !important; }
          .imp-visual-flip { order: 2; }
          .ba2-band { padding: 48px 20px !important; }
          .ba2-transition { padding: 28px 20px !important; }
        }
        @media (max-width: 720px) {
          .outcomes-grid { grid-template-columns: 1fr !important; }
          .tldr-grid { grid-template-columns: 1fr !important; gap: 4px !important; }
          .tldr-arrow { transform: rotate(90deg); margin: 6px 0; }
          .tldr-col-l { padding-right: 0 !important; }
          .tldr-col-r { padding-left: 0 !important; }
        }
        @media (max-width: 640px) {
          .wrap { padding-left: 20px !important; padding-right: 20px !important; }
          .move-head-01 { grid-template-columns: 64px minmax(0,1fr) !important; }
          .move-head-01 .move-legend {
            grid-column: 2 !important; grid-row: auto !important; order: 1;
            border-left: none !important; padding-left: 0 !important;
            border-top: 1px solid #e8e6e0; padding-top: 12px; margin-top: 6px;
          }
        }
        @media (max-width: 460px) {
          .persona-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO IMAGE */}
      <div className="w-full flex justify-center mb-2">
        <Image
          src="/cover-scalable-architecture.png"
          alt="From profile-centric to task-centric — IA case study"
          width={1920}
          height={400}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
          style={{ backgroundColor: "#f5f2e5" }}
          priority
        />
      </div>

      {/* TITLE SECTION */}
      <div className="py-8 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 w-full flex justify-start mb-4">
          <Link href="/" className="inline-flex items-center text-sm border border-beige-tint1 rounded-full pl-2 pr-3 py-1 text-golden-dark font-bold hover:bg-beige-anchor hover:text-white transition">
            <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-beige-tint1">
              <svg className="w-3 h-3 text-golden-dark" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            Back to Home
          </Link>
        </div>
        <section className="max-w-[1200px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-2 flex flex-col mt-4">
            <h1 className="text-4xl font-bold mb-4">
              AI Co-Piloting: Re-architect and Scale Enterprise Platform
            </h1>
            <p style={{ fontSize: "16px", color: tk.ink, margin: "0 0 16px" }}>
              Leveraging AI-co-piloted prototyping to resolve three legacy enterprise bottlenecks, I re-architected a dual-sided SaaS platform into a scalable, self-serve application hub. Executed in a rapid 2-week sprint, this structural overhaul won 1st place in the hackathon and was fast-tracked by executive leadership as a top-priority SVP corporate goal for the upcoming roadmap
            </p>
          </div>
          <aside className="flex flex-col gap-4 border border-gray-200 rounded-lg p-6" style={{ color: tk.ink }}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">Tags:</span>
              <span className="border border-gray-200 px-3 py-1 rounded-full text-sm">Vibe Coding</span>
              <span className="border border-gray-200 px-3 py-1 rounded-full text-sm">SaaS Architecture</span>
              <span className="border border-gray-200 px-3 py-1 rounded-full text-sm">Product Strategy</span>
              <span className="border border-gray-200 px-3 py-1 rounded-full text-sm">Hackathon Winner</span>
            </div>
            <div>
              <span className="font-semibold text-sm">My Role:</span>
              <span className="ml-2 text-sm">Lead Product Designer</span>
            </div>
            <div>
              <span className="font-semibold text-sm">Platform:</span>
              <span className="ml-2 text-sm">Web SaaS · Desktop</span>
            </div>
          </aside>
        </section>
      </div>

      {/* TLDR STRIP */}
      <section style={{ padding: "32px 0" }}>
        <div className="wrap" style={WRAP}>
          <div className="tldr-grid" style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", borderTop: `1px solid ${tk.ink}`, borderBottom: `1px solid ${tk.ink}`, padding: "32px 0" }}>
            <div className="tldr-col-l" style={{ paddingRight: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.rose }}>The Problem</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>
                Built for one creator. Broke at <em>50 series</em>.
              </h3>
              <p style={{ fontSize: "14px", color: tk.muted, margin: 0 }}>Profile dropdown didn&apos;t scale. Brands duplicated per profile. Admin tasks required pogo-sticking in and out of every show.</p>
            </div>
            <div className="tldr-arrow" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "38px", background: tk.ink, color: "#fff", width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
            </div>
            <div className="tldr-col-r" style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.green }}>The Shift</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>
                One <em style={{ fontStyle: "italic", color: tk.green }}>workspace.</em> Apps and entities go global.
              </h3>
              <p style={{ fontSize: "14px", color: tk.muted, margin: 0 }}>Replaced the profile model with a task-centric App Hub. Brands, users, and reports live once — referenced everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section style={SEC}>
        <div className="wrap" style={WRAP}>
          <SectionLabel>Outcomes</SectionLabel>
          <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>Won the <span style={{ color: tk.rose }}>1<em>st</em> place </span> in Hackathon.</h3>
          <div className="outcomes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "32px" }}>
            {(
              [
                {
                  icon: "🥇",
                  stat: (
                    <span style={{ display: "inline-flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap" }}>
                      <span>SVP Goal</span>
                    </span>
                  ),
                  desc: "The prototype won 1st place and was fast-tracked by executive leadership as a top-priority SVP Corporate Goal for next year's roadmap.",
                },
                {
                  icon: "🛠️",
                  stat: "3 Legacy Pain Points",
                  desc: (
                    <span>Unstuck long-standing bottlenecks by unlocking <strong style={{ color: tk.muted }}>Bulk User Management</strong>, enabling cross-network <strong style={{ color: tk.muted }}>Brand Analysis</strong>, and introducing <strong style={{ color: tk.muted }}>Automated Onboarding</strong>.</span>
                  ),
                },
                {
                  icon: "⚡",
                  stat: "AI-Coded Velocity",
                  desc: "Proven operational efficiency, using AI code tools to compress complex user role-mapping and high-fidelity prototyping into a rapid 14-day sprint.",
                },
              ] as { icon: string; stat: React.ReactNode; title: string; desc: React.ReactNode }[]
            ).map(({ icon, stat, title, desc }) => (
              <div key={title} style={{ border: `1px solid ${tk.line}`, borderRadius: "14px", padding: "28px 24px 32px", background: tk.bgSoft, display: "flex", flexDirection: "column", gap: "10px", minHeight: "220px" }}>
                <span style={{ fontSize: "22px", lineHeight: 1 }}>{icon}</span>
                <p style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "42px", lineHeight: 1, color: tk.ink, margin: 0 }}>{stat}</p>
                <p style={{ fontWeight: 700, fontSize: "14px", lineHeight: 1.3, color: tk.ink, margin: 0 }}>{title}</p>
                <p style={{ fontSize: "13px", color: tk.muted, lineHeight: 1.55, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          Before & After — Two-Worlds design
          ═══════════════════════════════════════ */}
      <section style={{ padding: "56px 0 0" }}>
        <style>{`
          @media (max-width: 860px) {
            .ba2-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            .ba2-figure {
              max-width: 520px;
              width: 100%;
            }
          }
        `}</style>
        {/* Intro */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 32px" }}>
          <p style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: tk.muted, display: "inline-flex", alignItems: "center", gap: "10px", margin: "0 0 24px" }}>
            <span style={{ width: "24px", height: "1px", background: tk.ink, display: "inline-block" }} />
            Before / After
          </p>
          <h2 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.01em", margin: "0 0 12px", color: tk.ink }}>
            The pivot, in concept and pixels.
          </h2>
          <p style={{ maxWidth: "60ch", color: tk.muted, fontSize: "15px", margin: 0 }}>
            Each profile used to own its own copy of every entity. Now apps are top-level workspaces and entities live globally.
          </p>
        </div>

        {/* BEFORE band */}
        <div style={{ width: "100%", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 12% 8%, rgba(194,90,79,.10), transparent 55%), radial-gradient(ellipse at 95% 85%, rgba(194,90,79,.05), transparent 60%), linear-gradient(180deg, #fbf7f4 0%, #fdfaf7 100%)", borderTop: `1px solid ${tk.line}`, borderBottom: `1px solid ${tk.line}` }}>
          <div className="ba2-band" style={{ maxWidth: "1300px", margin: "0 auto", padding: "80px 40px" }}>
            <div ref={beforeBandRef} className="ba2-grid" style={{ display: "grid", gridTemplateColumns: "minmax(300px, 400px) 1fr", gap: "64px", alignItems: "center", position: "relative" }}>

              {/* Left: notes */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "24px", color: tk.rose }}>
                  <span style={{ width: "32px", height: "1px", background: "currentColor", opacity: 0.55, display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "0.18em", opacity: 0.65 }}>01</span>
                  <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "28px", lineHeight: 1 }}>Before</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                      <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: tk.rose, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", boxShadow: "0 0 0 5px rgba(194,90,79,.12)" }}>1</span>
                      <h4 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "20px", lineHeight: 1.15, letterSpacing: "-0.02em", color: tk.rose, margin: 0 }}>Flat Profile Picker</h4>
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                      {(["Long scroll when the user manages multiple accounts", "One flat dropdown for every series, network, and ad rep", "Identity-as-context — completely change profiles to perform isolated tasks"] as string[]).map(item => (
                        <li key={item} style={{ fontSize: "14px", lineHeight: 1.4, color: tk.ink2, paddingLeft: "16px", position: "relative" }}>
                          <span style={{ position: "absolute", left: "3px", top: "10px", width: "4px", height: "4px", borderRadius: "50%", background: tk.rose, opacity: 0.75 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* Before tree diagram */}
                    <div style={{ marginTop: "22px" }}>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontStyle: "italic", fontWeight: 500, fontSize: "15px", lineHeight: 1.2, color: tk.rose, margin: "0 0 10px", letterSpacing: "0", whiteSpace: "nowrap" }}>Each profile is its own island.</p>
                      <Image src="/chart-before-tree.png" alt="Each profile is its own island — tree diagram" width={1631} height={1010} style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: screenshot */}
              <figure style={{ margin: 0 }} className="ba2-figure">
                <div style={{ borderRadius: "14px", overflow: "hidden", background: "#fff", filter: "saturate(.92)", boxShadow: `0 0 0 1px ${tk.line}, 0 30px 60px -25px rgba(0,0,0,.18), 0 10px 24px -8px rgba(194,90,79,.10)` }}>
                  <Image src="/before-clean.png" alt="ART19 episode page with scrollable profile picker dropdown open" width={1440} height={960} style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
              </figure>

              {/* Connector SVG — pulsing dots injected by useEffect */}
              <svg className="ba2-connectors" aria-hidden="true"
                data-dots={`[{"x":0.94,"y":0.22,"color":"#c25a4f","delay":0}]`}
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, pointerEvents: "none", zIndex: 3, overflow: "visible" }} />
            </div>
          </div>
        </div>

        {/* Transition strip */}
        <div style={{ background: "linear-gradient(180deg, #fdfaf7 0%, #f1f6f1 100%)" }}>
          <div className="ba2-transition" style={{ maxWidth: "1300px", margin: "0 auto", padding: "36px 40px", display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ flex: 1, height: "1px", background: tk.line2 }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", padding: "9px 18px", borderRadius: "999px", background: "#fff", color: tk.ink, border: `1px solid ${tk.line2}`, boxShadow: "0 14px 30px -12px rgba(0,0,0,.12)" }}>
              Became <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "18px", lineHeight: 1, color: tk.ink }}>↓</span>
            </span>
            <span style={{ flex: 1, height: "1px", background: tk.line2 }} />
          </div>
        </div>

        {/* AFTER band */}
        <div style={{ width: "100%", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 15% 8%, rgba(58,125,91,.14), transparent 55%), radial-gradient(ellipse at 95% 85%, rgba(58,125,91,.06), transparent 60%), linear-gradient(180deg, #f1f6f1 0%, #f7faf6 100%)", borderTop: "1px solid #d8e3d8", borderBottom: "1px solid #d8e3d8" }}>
          <div className="ba2-band" style={{ maxWidth: "1300px", margin: "0 auto", padding: "80px 40px" }}>
            <div ref={afterBandRef} className="ba2-grid" style={{ display: "grid", gridTemplateColumns: "1fr minmax(300px, 380px)", gap: "64px", alignItems: "center", position: "relative" }}>

              {/* Left: screenshot */}
              <figure style={{ margin: 0 }} className="ba2-figure">
                <div style={{ borderRadius: "14px", overflow: "hidden", background: "#fff", boxShadow: `0 0 0 1px ${tk.line}, 0 30px 60px -25px rgba(58,125,91,.22), 0 10px 24px -8px rgba(0,0,0,.10)` }}>
                  <Image src="/after-clean.png" alt="New Publishers Workspace with workspace switcher and searchable series and network catalogs" width={1640} height={1300} style={{ display: "block", width: "100%", height: "auto" }} />
                </div>
              </figure>

              {/* Right: notes */}
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "24px", color: tk.green }}>
                  <span style={{ width: "32px", height: "1px", background: "currentColor", opacity: 0.55, display: "inline-block" }} />
                  <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "0.18em", opacity: 0.65 }}>02</span>
                  <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "28px", lineHeight: 1 }}>After</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginTop: "12px" }}>

                  {/* Note 1: Workspace Picker */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                      <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: tk.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", boxShadow: "0 0 0 5px rgba(58,125,91,.12)" }}>1</span>
                      <h4 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "20px", lineHeight: 1.15, letterSpacing: "-0.02em", color: tk.green, margin: 0 }}>Workspace Picker</h4>
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                      {(["Focus on one area without distraction", "Switch by category: Publisher, Ads, Accounting", "Role decides what you see"] as string[]).map(item => (
                        <li key={item} style={{ fontSize: "14px", lineHeight: 1.4, color: tk.ink2, paddingLeft: "16px", position: "relative" }}>
                          <span style={{ position: "absolute", left: "3px", top: "10px", width: "4px", height: "4px", borderRadius: "50%", background: tk.green, opacity: 0.75 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* After flow diagram */}
                    <div style={{ marginTop: "22px", maxWidth: "260px" }}>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontStyle: "italic", fontWeight: 500, fontSize: "15px", lineHeight: 1.2, color: tk.green, margin: "0 0 10px", letterSpacing: "0", whiteSpace: "nowrap" }}>One hub. Tasks reach everywhere.</p>
                      <Image src="/chart-after-hub.png" alt="One hub. Tasks reach everywhere — App Hub flow diagram" width={1032} height={1168} style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                  </div>

                  {/* Note 2: Series / Network List */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                      <span style={{ flexShrink: 0, width: "26px", height: "26px", borderRadius: "50%", background: tk.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "12px", boxShadow: "0 0 0 5px rgba(58,125,91,.12)" }}>2</span>
                      <h4 style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "20px", lineHeight: 1.15, letterSpacing: "-0.02em", color: tk.green, margin: 0 }}>Unified Series / Network List</h4>
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
                      {(["Search across every series instantly", "Bulk-edit metadata and settings", "Central hub — no duplication, no context switching"] as string[]).map(item => (
                        <li key={item} style={{ fontSize: "14px", lineHeight: 1.4, color: tk.ink2, paddingLeft: "16px", position: "relative" }}>
                          <span style={{ position: "absolute", left: "3px", top: "10px", width: "4px", height: "4px", borderRadius: "50%", background: tk.green, opacity: 0.75 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Connector SVG — pulsing dots injected by useEffect */}
              <svg className="ba2-connectors" aria-hidden="true"
                data-dots={`[{"x":0.295,"y":0.275,"color":"#3a7d5b","delay":0},{"x":0.972,"y":0.48,"color":"#3a7d5b","delay":0.4}]`}
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, pointerEvents: "none", zIndex: 3, overflow: "visible" }} />
            </div>
          </div>
        </div>
      </section>

      {/* RECEIPTS */}
      <section style={SEC}>
        <div className="wrap" style={WRAP}>
          <SectionLabel>Why It Works</SectionLabel>
          <H2 style={{ fontFamily: "var(--font-instrument-serif)" }}>Three key improvements</H2>

          {/* ── Improvement 01: Nike ── */}
          <div className="imp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", paddingTop: "24px", paddingBottom: "72px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— 01 · Data Normalization —</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                From a fragmented brand blackout to <em style={{ fontStyle: "italic", color: tk.rose }}>one source of truth</em>.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Brands like Nike were recreated by hand inside every Ad Agent profile — disconnected copies, no way to aggregate reach or performance.
              </p>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>After:</strong> Brands decoupled from Agent profiles and moved into a <strong>Global Brand Library</strong>. Created once. Shared across the platform. Tracked in aggregate for real-time, cross-network ROI.
              </p>
              <div style={{ display: "flex", gap: "28px", marginTop: "12px", flexWrap: "wrap" }}>
                {[
                  { k: "Single Source of Truth", v: "1", vsub: " brand" },
                  { k: "Incremental Insights", v: "Aggregate", vColor: tk.green },
                  { k: "Operational Efficiency", v: "No duplicates" },
                ].map(({ k, v, vsub, vColor }) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontSize: vsub ? "30px" : "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: vsub ? "0" : "8px" }}>
                      {v}{vsub && <small style={{ fontSize: "16px", color: tk.muted, marginLeft: "2px" }}>{vsub}</small>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* Before: Nike duplicated */}
              <div style={{ marginBottom: "22px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.bgSoft, color: tk.ink }}>
                  <span style={{ fontSize: "14px", fontWeight: 400 }}>01</span> Before · Profile-Centric
                </span>
                <div style={{ border: `1px solid ${tk.line}`, borderRadius: "12px", background: "#f1f0ec", padding: "16px", opacity: 0.88 }}>
                  <span style={{ fontSize: "14px", color: tk.ink, display: "block", fontWeight: 600, marginBottom: "10px" }}>Same brand — Disconnected, Inconsistent naming</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                    {[
                      ["Nike", "Wondery USA"], ["Nike Inc.", "Targeted Ads"],
                      ["Nike", "Wondery DE"], ["Nike USA", "Wondery UK"],
                      ["Nike Inc.", "Originals"], ["Nike", "LATAM"],
                    ].map(([name, src]) => (
                      <div key={src} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "7px 10px", background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "6px", fontSize: "13px" }}>
                        <span style={{ width: "6px", height: "6px", background: tk.ink, borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontWeight: 700, color: tk.ink }}>{name}</span>
                        <span style={{ color: tk.ink, fontSize: "12px", marginLeft: "auto" }}>{src}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: tk.muted, letterSpacing: "0.04em", paddingTop: "8px" }}>
                    <span style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d9d6cf 0 4px, transparent 4px 8px)" }} />
                    No shared ID · no rollup
                    <span style={{ flex: 1, height: "1px", background: "repeating-linear-gradient(90deg, #d9d6cf 0 4px, transparent 4px 8px)" }} />
                  </div>
                </div>
              </div>

              {/* After: Nike card */}
              <div style={{ position: "relative", paddingTop: "22px", borderTop: `1px dashed ${tk.line2}` }}>
                <span style={{ position: "absolute", top: "-14px", left: "24px", background: tk.ink, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 0 0 4px #fff" }}>↓</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.green, color: "#fff", boxShadow: "0 4px 12px -4px rgba(58,125,91,.4)" }}>
                  <span style={{ fontSize: "14px", fontWeight: 400 }}>02</span> After · Global Brand Library
                </span>
                <div style={{ border: `2px solid ${tk.green}`, borderRadius: "16px", background: "#fff", padding: "28px", boxShadow: "0 30px 60px -25px rgba(58,125,91,.28), 0 0 0 6px rgba(58,125,91,.06)", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: tk.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontStyle: "italic" }}>N</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "22px", letterSpacing: "-0.01em" }}>Nike</div>
                        <div style={{ fontSize: "12px", color: tk.muted }}>style &amp; fashion · nike.com</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", padding: "4px 8px", borderRadius: "4px", background: tk.amberBg, color: tk.amber, letterSpacing: "0.08em",fontWeight: 600 }}>★ Top Performer</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", borderTop: `1px solid ${tk.line}`, paddingTop: "18px" }}>
                    <div>
                      <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>This week</div>
                      <div style={{ fontSize: "32px", lineHeight: 1.1, color: tk.ink }}>9.1M<small style={{ fontSize: "14px", color: tk.green, marginLeft: "4px" }}>▲ +12%</small></div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>All time</div>
                      <div style={{ fontSize: "32px", lineHeight: 1.1, color: tk.ink }}>142M</div>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${tk.line}`, paddingTop: "16px" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted, marginBottom: "10px" }}>Cross-network Impression</div>
                    {[["Wondery USA", 78, "4.1M"], ["Targeted Ads", 52, "2.8M"], ["Wondery Germany", 28, "1.5M"], ["Wondery+ Originals", 12, "0.7M"]].map(([src, pct, val]) => (
                      <div key={String(src)} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", marginBottom: "8px" }}>
                        <span style={{ flex: 1, fontWeight: 600 }}>{src}</span>
                        <div style={{ flex: 2, height: "8px", borderRadius: "4px", background: tk.bgSoft, overflow: "hidden" }}>
                          <span style={{ display: "block", height: "100%", background: tk.accent, borderRadius: "4px", width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: "12px", color: tk.muted, minWidth: "56px", textAlign: "right" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Improvement 02: Bulk Management (flip) ── */}
          <div className="imp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px", paddingBottom: "72px" }}>
            <div className="imp-visual-flip">
              {/* Before: Pogo diagram */}
              <div style={{ marginBottom: "22px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.bgSoft, color: tk.ink }}>
                  <span style={{ fontSize: "14px", fontWeight: 400 }}>02</span> Before · Pogo-Stick Model
                </span>
                <div style={{ border: `1px solid ${tk.line}`, background: "#f1f0ec", borderRadius: "14px", padding: "22px", opacity: 0.92 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px", gap: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, lineHeight: 1.2, color: tk.ink }}>One new user, add to five shows.</span>
                    <span style={{ fontSize: "10.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>5 separate environments</span>
                  </div> 
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {["Series A", "Series B", "Series C", "Series D", "Series E"].map((s, i) => (
                      <div key={s}>
                        <div style={{ background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "8px", padding: "9px 12px", fontSize: "13px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ fontSize: "10px", color: tk.muted, width: "14px" }}>0{i + 1}</span>
                          <span style={{ fontWeight: 700, flex: 1 }}>{s} · Users</span>
                          <span style={{ fontSize: "12px", color: tk.ink, padding: "3px 8px", borderRadius: "4px", background: "#e6e4de" }}>+ add Jane Doe</span>
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
                    <span style={{ fontSize: "14px", lineHeight: 1.2, letterSpacing: "-0.005em", color: tk.ink }}>10+ clicks per user update</span>
                  </div>
                </div>
              </div>

              {/* After: UMA app */}
              <div style={{ position: "relative", paddingTop: "22px", borderTop: `1px dashed ${tk.line2}` }}>
                <span style={{ position: "absolute", top: "-14px", left: "24px", background: tk.ink, color: "#fff", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 0 0 4px #fff" }}>↓</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "12px", background: tk.green, color: "#fff", boxShadow: "0 4px 12px -4px rgba(58,125,91,.4)" }}>
                  <span style={{ fontSize: "14px", fontWeight: 400 }}>02</span> After · Centralized Workspace App
                </span>
                <div style={{ border: `2px solid ${tk.green}`, background: "#fff", borderRadius: "14px", overflow: "hidden", boxShadow: "0 30px 60px -25px rgba(58,125,91,.28), 0 0 0 6px rgba(58,125,91,.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 18px", background:"rgba(163, 214, 188, 0.28)", borderBottom: "1px solid #d8e3f7" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "5px", background: tk.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
                        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: "14px", letterSpacing: "-0.005em", color: tk.ink}}>User Management App</span>
                    <span style={{ fontSize: "12px", color: tk.ink, letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: "auto", opacity: 0.75 }}>In one Workspace</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(130px, 1fr) 80px minmax(140px, 1fr)", padding: "22px 20px 18px", alignItems: "center" }}>
                    <div style={{ background: tk.accentSoft, border: "1px solid #cdd9ec", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: tk.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px" }}>JD</div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: "15px" }}>Jane Doe</div>
                          <div style={{ fontSize: "12px", color: tk.accentInk, marginTop: "2px" }}>New hire</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ position: "relative", height: "100%", minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: tk.accent, color: "#fff", fontSize: "13px", padding: "4px 12px", borderRadius: "4px", whiteSpace: "nowrap", zIndex: 1, boxShadow: "0 4px 12px -4px rgba(37,99,235,.4)" }}>Bulk Select</span>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {["Series A", "Series B", "Series C", "Series D", "Series E"].map(s => (
                        <div key={s} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", border: `1px solid ${tk.line}`, borderRadius: "8px", padding: "8px 12px", fontSize: "14px" }}>
                          <span style={{ width: "16px", height: "16px", borderRadius: "4px", background: tk.green, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, flexShrink: 0 }}>✓</span>
                          <span style={{ fontWeight: 700, flex: 1 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: "1px dashed #d8e3f7", padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                    <span style={{ fontSize: "14px", lineHeight: 1.2, letterSpacing: "-0.005em", color: tk.ink }}>3 clicks for the entire account</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— 02 · Operational Velocity —</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                From manual sprints to <em style={{ fontStyle: "italic", color: tk.rose }}>bulk actions</em>.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Managing access was a tedious exercise in pogo-sticking. Adding one teammate to five shows meant navigating into five separate series environments.
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
                    <span style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontSize: vsub ? "30px" : "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: "8px" }}>
                      {v}{vsub && <small style={{ fontSize: "16px", color: tk.muted }}>{vsub}</small>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Improvement 03: Personalization ── */}
          <div className="imp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "16px", color: tk.muted, letterSpacing: "0.04em" }}>— 03 · Intelligent Personalization —</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, margin: "0 0 4px", letterSpacing: "-0.005em", color: tk.ink }}>
                Self-serve workspaces, <em style={{ fontStyle: "italic", color: tk.rose }}>shaped by role</em>.
              </h3>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>Before:</strong> Every user — executives, ad agents, content creators — was funneled through the same flat entry point. Onboarding friction was high.
              </p>
              <p style={{ fontSize: "16px", color: tk.ink2, maxWidth: "46ch", margin: 0 }}>
                <strong>After:</strong> The App Picker coupled with role definitions builds a dynamic, <strong>self-serve Home Screen</strong> that surfaces tailored shortcuts, role-optimized cockpits, and immediate data summaries.
              </p>
              <div style={{ display: "flex", gap: "28px", marginTop: "12px", flexWrap: "wrap" }}>
                {[
                  { k: "Role-Optimized Cockpits", v: "20+ personas" },
                  { k: "Self-Onboarding", v: "Zero-train", vColor: tk.green },
                  { k: "Proactive Summaries", v: "Upfront" },
                ].map(({ k, v, vColor }) => (
                  <div key={k} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: tk.muted }}>{k}</span>
                    <span style={{ fontSize: "22px", lineHeight: 1, color: vColor || tk.ink, paddingTop: "8px" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="persona-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
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
                      <div style={{ fontSize: "19px", lineHeight: 1.1, color: tk.ink, letterSpacing: "-0.005em" }}>{name}</div>
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

      {/* RESEARCH & ROLE MAPPING */}
      <section style={{ ...SEC, borderTop: `1px solid ${tk.line}` }}>
        <style>{`
          /* ─── rmap shared grid ─── */
          .rmap-supercat-row, .rmap-tasks-row, .rmap-role-row {
            display: grid;
            grid-template-columns: 180px repeat(8, minmax(0, 1fr)) 54px;
          }
          @media (max-width: 1100px) {
            .rmap-supercat-row, .rmap-tasks-row, .rmap-role-row {
              grid-template-columns: 150px repeat(8, minmax(0, 1fr)) 46px;
            }
          }
          @media (max-width: 820px) {
            .rmap-intro-row { flex-direction: column !important; gap: 16px !important; }
            .rmap-intro-row .rmap-legend-inline { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #e8e6e0; padding-top: 12px; }
          }
          /* ─── move headers ─── */
          .move-head {
            display: grid;
            grid-template-columns: 64px minmax(0, 1fr);
            gap: 4px 22px;
            align-items: start;
            padding-top: 30px;
            margin-top: 40px;
            border-top: 1px solid #e8e6e0;
          }
          .move-n {
            font-family: var(--font-instrument-serif);
            font-weight: 400;
            font-size: 46px;
            line-height: .9;
            color: #6b6b72;
            grid-row: 1 / span 2;
          }
          .move-t {
            font-family: var(--font-instrument-serif);
            font-weight: 400;
            font-size: 28px;
            line-height: 1.06;
            letter-spacing: -0.01em;
            margin: 0 0 7px;
          }
          .move-d {
            font-size: 14.5px;
            line-height: 1.55;
            color: #6b6b72;
            max-width: 62ch;
            margin: 0;
          }
          .move-body { margin-top: 24px; }
          /* ─── move 03 tables ─── */
          .rbac-split { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 30px; margin-top: 8px; align-items: stretch; }
          @media (max-width: 900px) { .rbac-split { grid-template-columns: 1fr; gap: 36px; } }
          .rbac-tcap { display: grid; grid-template-columns: auto 1fr; align-items: baseline; gap: 4px 10px; margin: 0 0 14px; }
          .rbac-tg { font-family: var(--font-geist-mono); font-size: 11px; font-weight: 700; color: #1d4ed8; letter-spacing: .06em; }
          .rbac-tt { font-family: var(--font-instrument-serif); font-weight: 400; font-size: 20px; letter-spacing: -0.005em; line-height: 1.08; }
          .rbac-ts { grid-column: 1 / -1; font-size: 12px; color: #6b6b72; margin: 0; }
          .rbac-newcol {
            grid-column: 1 / -1; justify-self: start;
            display: inline-flex; align-items: center; gap: 6px;
            font-family: var(--font-geist-mono); font-size: 10px; letter-spacing: .06em;
            text-transform: uppercase; color: #2563eb;
            background: #eaf1fc; border: 1px solid #cfe0f7;
            border-radius: 5px; padding: 3px 8px; margin: 2px 0 0;
          }
          .rbac-card { border: 1px solid #e8e6e0; border-radius: 14px; background: #fff; overflow: hidden; box-shadow: 0 1px 0 rgba(0,0,0,.02), 0 20px 50px -34px rgba(0,0,0,.16); }
          .rdef-row { display: grid; grid-template-columns: 60px 104px 1fr; align-items: start; padding: 36px 18px; border-bottom: 1px solid #e8e6e0; gap: 0 14px; }
          .rdef-row .rid { font-family: var(--font-geist-mono); font-size: 13px; font-weight: 700; color: #0e0e10; }
          .rdef-row .rdef-persona { font-weight: 700; font-size: 14px; letter-spacing: -0.005em; }
          .rdef-perms { display: flex; flex-direction: column; align-items: flex-start; gap: 7px; }
          .perm-chip { font-size: 11.5px; line-height: 1.3; padding: 5px 11px; border-radius: 6px; color: #2a2a2e; }
          .perm-chip b { font-weight: 700; }
          .perm-chip .scope { color: rgba(42,42,46,.62); font-weight: 500; }
          .rdef-add { padding: 14px 18px; background: #eef4fc; font-weight: 700; font-size: 13.5px; color: #2563eb; }
          .rbac-rowline { display: grid; grid-template-columns: 1.2fr 1fr 1.5fr; gap: 14px; align-items: start; padding: 16px 18px; border-bottom: 1px solid #e8e6e0; font-size: 13.5px; color: #0e0e10; }
          .rbac-rowline:last-of-type { border-bottom: none; }
          .ucell { display: flex; flex-direction: column; gap: 2px; }
          .ucell .uname { font-weight: 700; }
          .ucell .acct { color: #6b6b72; font-family: var(--font-geist-mono); font-size: 11px; word-break: break-all; }
          .pills { display: flex; flex-wrap: wrap; gap: 5px; }
          .rbac-pill { display: inline-block; font-family: var(--font-geist-mono); font-size: 11px; font-weight: 600; background: #f7f6f3; border: 1px solid #e8e6e0; color: #2a2a2e; padding: 2px 8px; border-radius: 5px; white-space: nowrap; }
          .rbac-pill.is-role { background: #eaf1fc; border-color: #cfe0f7; color: #1d4ed8; }
          .rbac-pill.is-prof { background: #fff; border-color: #d9d6cf; color: #2a2a2e; font-family: inherit; font-weight: 600; letter-spacing: 0; }
          .rbac-moreline { padding: 15px 18px; color: #d9d6cf; font-size: 20px; letter-spacing: .3em; line-height: 1; }
          @media (max-width: 620px) {
            .rdef-row { grid-template-columns: 1fr; gap: 8px; }
            .rbac-rowline { grid-template-columns: 1fr 1fr; gap: 8px 12px; }
          }
        `}</style>
        <div className="wrap" style={WRAP}>
          <SectionLabel>Foundation · Role Mapping</SectionLabel>
          <H2 style={{ fontFamily: "var(--font-instrument-serif)" }}>
            Role mapping: <em style={{ fontStyle: "italic" }}>how I came up with the idea.</em>
          </H2>
          <p style={{ maxWidth: "58ch", color: tk.muted, fontSize: "16px", lineHeight: 1.55, margin: 0 }}>
            Three moves took me from raw user interviews to a permission model the platform could actually enforce.
          </p>

          {/* ── MOVE 01 ── */}
          <div className="move-head move-head-01" style={{ gridTemplateColumns: "64px 1fr auto" }}>
            <span className="move-n">01</span>
            <h3 className="move-t">Interview users, map roles to tasks</h3>
            <div className="move-legend" style={{ gridRow: "1 / span 2", gridColumn: "3", display: "flex", flexDirection: "column", gap: "6px", borderLeft: `1px solid ${tk.line}`, paddingLeft: "20px", alignSelf: "start" }}>
              <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase", color: tk.muted, marginBottom: "2px" }}>Intensity</span>
              {([
                { bg: tk.accentInk, label: "Hvy", desc: "Primary owner — does this daily", dashed: false },
                { bg: "#6da3f0",    label: "Med", desc: "Contributor — touches it weekly", dashed: false },
                { bg: "#fff",       label: "",    desc: "Set & forget — light / none",     dashed: true  },
              ] as const).map(({ bg, label, desc, dashed }, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12.5px", color: tk.ink2 }}>
                  <span style={{ width: "28px", height: "14px", borderRadius: "3px", flexShrink: 0, background: bg, border: dashed ? `1px dashed ${tk.line2}` : "none", fontFamily: "var(--font-geist-mono)", fontSize: "8px", fontStyle: "italic", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", letterSpacing: ".04em" }}>{label}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <p className="move-d">I sat with every team and mapped each role against the tasks in the campaign lifecycle. Two dozen distinct personas surfaced — and once each was scored by how heavily it touches each step, the heavy-touch clusters became impossible to miss.</p>
          </div>
          <div className="move-body">
            {/* Matrix */}
            <div style={{ overflowX: "auto" }}>
              <div style={{ borderRadius: "14px", overflow: "hidden", border: `1px solid ${tk.line}`, background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,.02), 0 20px 50px -30px rgba(0,0,0,.15)", minWidth: "640px" }}>
                {/* Super-category header */}
                <div className="rmap-supercat-row" style={{ background: "#fafaf7", borderBottom: `1px solid ${tk.line}` }}>
                  <div style={{ padding: "11px 16px", fontFamily: "var(--font-geist-mono)", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", background: tk.ink, color: "rgba(255,255,255,.62)", borderRight: `1px solid ${tk.ink}` }}>Task Category →</div>
                  {([
                    { label: "Campaign Creation", span: 4, color: tk.accentInk, bg: "#eef3fc" },
                    { label: "Delivery",          span: 1, color: "#b07a1f",    bg: "#fbf2dc" },
                    { label: "Data & Analytics",  span: 3, color: tk.rose,      bg: "#f9e9e6" },
                  ] as const).map(({ label, span, color, bg }) => (
                    <div key={label} style={{ gridColumn: `span ${span}`, padding: "11px 12px", fontFamily: "var(--font-geist-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", borderRight: `1px solid ${tk.line}`, display: "flex", alignItems: "center", gap: "8px", color, background: bg }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
                      {label}
                    </div>
                  ))}
                  {/* "more" column header */}
                  <div style={{ borderLeft: "1px dashed #d9d6cf", background: "#f1efe9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-geist-mono)", fontSize: "11px", color: tk.muted }} />
                </div>
                {/* Task header */}
                <div className="rmap-tasks-row" style={{ background: "#fff", borderBottom: `1px solid ${tk.line}` }}>
                  <div style={{ padding: "10px 16px", background: tk.ink, color: "#fff", fontFamily: "var(--font-dm-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: ".02em", display: "flex", alignItems: "center", borderRight: `1px solid ${tk.ink}` }}>Role ↓</div>
                  {RMAP_TASKS.map(([line1, line2], i) => (
                    <div key={i} style={{ padding: "9px 8px", fontSize: "11px", fontWeight: 600, color: tk.ink, borderRight: `1px solid ${tk.line}`, lineHeight: 1.25, background: "#fafaf7" }}>
                      {line1}<br />{line2}
                    </div>
                  ))}
                  {/* "more" task cell */}
                  <div style={{ borderLeft: "1px dashed #d9d6cf", background: "repeating-linear-gradient(45deg,transparent 0 6px,rgba(0,0,0,.022) 6px 7px)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-geist-mono)", fontSize: "13px", fontWeight: 700, letterSpacing: ".16em", color: tk.line2 }}>⋯</div>
                </div>
                {/* Role rows */}
                {RMAP_ROLES.map((role) => (
                  <div key={role.name} className="rmap-role-row" style={{ borderBottom: `1px solid ${tk.line}`, alignItems: "stretch", background: "#fff", position: "relative" }}>
                    <div style={{ padding: "9px 16px 9px 20px", borderRight: `1px solid ${tk.line}`, display: "flex", flexDirection: "column", gap: "2px", background: "#fafaf7", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: RMAP_CLUSTER_STRIPES[role.cluster] }} />
                      <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "-0.005em", lineHeight: 1.2 }}>{role.name}</span>
                      <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: "9.5px", color: tk.muted, letterSpacing: ".02em", lineHeight: 1.35 }}>{role.blurb}</span>
                    </div>
                    {role.cells.map((cell, ci) => (
                      <div key={ci} style={{
                        borderRight: `1px solid ${tk.line}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-geist-mono)", fontSize: "9.5px", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: ".08em", fontStyle: "italic",
                        minHeight: "36px",
                        ...(cell === "h"
                          ? { background: tk.accentInk, color: "#fff" }
                          : cell === "m"
                          ? { background: "#6da3f0", color: "#fff" }
                          : { background: "repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,.025) 6px 7px)" }),
                      }}>
                        {cell === "h" ? "Heavy" : cell === "m" ? "Medium" : null}
                      </div>
                    ))}
                    {/* "more" column cell */}
                    <div style={{ borderLeft: "1px dashed #d9d6cf", background: "repeating-linear-gradient(45deg,transparent 0 6px,rgba(0,0,0,.022) 6px 7px)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-geist-mono)", fontSize: "13px", letterSpacing: ".16em", color: tk.line2 }}>⋯</div>
                  </div>
                ))}
                {/* "more" role row */}
                <div className="rmap-role-row" style={{ alignItems: "stretch" }}>
                  <div style={{ padding: "10px 20px", borderRight: `1px solid ${tk.line}`, background: "#fafaf7", display: "flex", alignItems: "center", fontFamily: "var(--font-geist-mono)", fontSize: "14px", letterSpacing: ".3em", color: tk.line2 }}>⋯</div>
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} style={{ borderRight: `1px solid ${tk.line}`, minHeight: "28px", background: "repeating-linear-gradient(45deg,transparent 0 6px,rgba(0,0,0,.018) 6px 7px)" }} />
                  ))}
                  <div style={{ borderLeft: "1px dashed #d9d6cf", minHeight: "28px", background: "repeating-linear-gradient(45deg,transparent 0 6px,rgba(0,0,0,.018) 6px 7px)" }} />
                </div>
              </div>
            </div>
          </div>{/* /move-body 01 */}

          {/* ── MOVE 02 ── */}
          <div className="move-head">
            <span className="move-n">02</span>
            <h3 className="move-t">Map the relationship: user → account → access</h3>
            <p className="move-d">The matrix told me <em>who does what</em>. Next I had to model <em>who can reach what</em>. A user is a person; they log in through an account, and it&apos;s the account that actually holds access — to Series, Networks, Ad Rep, and the tasks inside them.</p>
          </div>
          <div className="move-body">
            <img
              src="/IA-step 2 process.png"
              alt="User logs in through an Account, which has access to Series, Network, Ad Rep (resources) and Tasks & Workspaces (workspace)."
              style={{ display: "block", width: "80%", height: "auto", marginRight: "auto" }}
            />
          </div>{/* /move-body 02 */}

          {/* ── MOVE 03 ── */}
          <div className="move-head">
            <span className="move-n">03</span>
            <h3 className="move-t">Separate role definition from role assignment</h3>
            <p className="move-d">Defining a role and giving it to someone are two different jobs, so I split them into two tables. Assignment then gains one extra column — <strong>Profile Access</strong> — pinning each user to the Series, Networks, or Ad Rep they&apos;re allowed to touch.</p>
          </div>
          <div className="move-body">
            <div className="rbac-split">

              {/* TABLE A: Define the roles */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="rbac-tcap">
                  <span className="rbac-tg">TABLE A</span>
                  <span className="rbac-tt">Define the roles</span>
                  <p className="rbac-ts">24 roles · permission bundles</p>
                </div>
                <div className="rbac-card" style={{ flex: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "60px 104px 1fr", gap: "0 14px", padding: "12px 18px", fontFamily: "var(--font-geist-mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: tk.muted, background: "#fafaf7", borderBottom: `1px solid ${tk.line}` }}>
                    <span>Role</span><span>Persona</span><span>Permissions to Workspace</span>
                  </div>
                  {ROLE_DEFS.map(({ id, persona, perms }) => (
                    <div key={id} className="rdef-row">
                      <span className="rid">{id}</span>
                      <span className="rdef-persona">{persona}</span>
                      <div className="rdef-perms">
                        {perms.map(({ cat, tone, segs }) => (
                          <span key={cat} className="perm-chip" style={{ background: PERM_BG[tone] }}>
                            <b>{cat}:</b>{" "}
                            {segs.map(({ items, scope }, si) => (
                              <span key={si}>{si > 0 && <span style={{ opacity: 0.35, margin: "0 3px" }}>·</span>}{items} <span className="scope">({scope})</span></span>
                            ))}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="rdef-add">+ Add New Role</div>
                </div>
              </div>

              {/* TABLE B: Assign roles to users */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="rbac-tcap">
                  <span className="rbac-tg">TABLE B</span>
                  <span className="rbac-tt">Assign roles to users</span>
                  <p className="rbac-ts">Assign one or more roles per user, then scope their profile access.</p>
                </div>
                <div className="rbac-card" style={{ flex: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.5fr", gap: "14px", padding: "12px 18px", fontFamily: "var(--font-geist-mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: tk.muted, background: "#fafaf7", borderBottom: `1px solid ${tk.line}` }}>
                    <span>User</span><span>Roles</span><span>Profile Access</span>
                  </div>
                  {USER_ACCESS.map(({ name, account, roles, profiles }) => (
                    <div key={name} className="rbac-rowline">
                      <span className="ucell">
                        <span className="uname">{name}</span>
                        <span className="acct">{account}</span>
                      </span>
                      <span className="pills">
                        {roles.map(r => <span key={r} className="rbac-pill is-role">{r}</span>)}
                      </span>
                      <span className="pills">
                        {profiles.map(p => <span key={p} className="rbac-pill is-prof">{p}</span>)}
                      </span>
                    </div>
                  ))}
                  <div className="rbac-moreline">⋯</div>
                </div>
              </div>

            </div>
          </div>{/* /move-body 03 */}

        </div>
      </section>

      {/* FINAL DESIGN */}
      <section style={SEC}>
        <div style={WRAP}>
          <SectionLabel>Final Design</SectionLabel>
          <H2 style={{ fontFamily: "var(--font-instrument-serif)" }}>The workspace, in production.</H2>
          <div style={{ marginTop: "24px" }}>
            <WorkspacePrototype />
          </div>
          <p style={{ fontSize: "12px", color: tk.muted, marginTop: "14px", letterSpacing: "0.02em", textAlign: "center" }}>
            PROTOTYPE · PUBLISHERS → HYSTERICAL EPISODES → ADS
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <div style={WRAP}>
        <BottomNav
          previousProject="/projects/app-onboard"
          previousProjectName="Application Onboarding"
          nextProject="/projects/project-access?target=brand-approval"
          nextProjectName="Brand Approval Flow"
          textColor="text-zinc-700"
          hoverColor="hover:text-zinc-900"
          className="w-full"
        />
        <Footer customValue="w-full" dark style={{ paddingLeft: 0, paddingRight: 0 }} />
      </div>
    </div>
  );
}
