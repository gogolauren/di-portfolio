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
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", borderTop: `1px solid ${tk.ink}`, borderBottom: `1px solid ${tk.ink}`, padding: "32px 0" }}>
            <div style={{ paddingRight: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: tk.rose }}>The Problem</span>
              <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>
                Built for one creator. Broke at <em>50 series</em>.
              </h3>
              <p style={{ fontSize: "14px", color: tk.muted, margin: 0 }}>Profile dropdown didn&apos;t scale. Brands duplicated per profile. Admin tasks required pogo-sticking in and out of every show.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "38px", background: tk.ink, color: "#fff", width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
            </div>
            <div style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
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
        <div style={WRAP}>
          <SectionLabel>Outcomes</SectionLabel>
          <h3 style={{ fontFamily: "var(--font-instrument-serif)", fontWeight: 400, fontSize: "28px", lineHeight: 1.15, margin: 0, color: tk.ink }}>Won the <span style={{ color: tk.rose }}>1<em>st</em> place </span> in Hackathon.</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "32px" }}>
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
              max-width: 50vw;
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
          <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "80px 40px" }}>
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
          <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "36px 40px", display: "flex", alignItems: "center", gap: "20px" }}>
            <span style={{ flex: 1, height: "1px", background: tk.line2 }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-geist-mono)", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", padding: "9px 18px", borderRadius: "999px", background: "#fff", color: tk.ink, border: `1px solid ${tk.line2}`, boxShadow: "0 14px 30px -12px rgba(0,0,0,.12)" }}>
              Became <span style={{ fontFamily: "var(--font-instrument-serif)", fontStyle: "italic", fontSize: "18px", lineHeight: 1, color: tk.ink }}>↓</span>
            </span>
            <span style={{ flex: 1, height: "1px", background: tk.line2 }} />
          </div>
        </div>

        {/* AFTER band */}
        <div style={{ width: "100%", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 15% 8%, rgba(58,125,91,.14), transparent 55%), radial-gradient(ellipse at 95% 85%, rgba(58,125,91,.06), transparent 60%), linear-gradient(180deg, #f1f6f1 0%, #f7faf6 100%)", borderTop: "1px solid #d8e3d8", borderBottom: "1px solid #d8e3d8" }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "80px 40px" }}>
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
        <div style={WRAP}>
          <SectionLabel>Why It Works</SectionLabel>
          <H2 style={{ fontFamily: "var(--font-instrument-serif)" }}>Three key improvements</H2>

          {/* ── Improvement 01: Nike ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", paddingTop: "24px", paddingBottom: "72px" }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px", paddingBottom: "72px" }}>
            <div>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center", borderTop: `1px solid ${tk.line}`, paddingTop: "72px" }}>
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
