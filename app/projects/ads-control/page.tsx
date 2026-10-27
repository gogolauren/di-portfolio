"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../shared-components/footer";
import { BottomNav } from "../shared-components/bottom-nav";

const SANS = "font-['Instrument_Sans',system-ui,sans-serif]";
const MONO = "font-['JetBrains_Mono',monospace]";

type Segment = { l: number; r: number; sync?: boolean };

// Ad-flight sync cases for Decision A. Positions are percentages of the timeline width.
const CHARTS: {
  rule: string;
  phase: string;
  today: number;
  li: [number, number];
  before: Segment[];
  after: Segment[];
  bCap: string;
  aCap: string;
}[] = [
  {
    rule: "Sync ⇄ Custom",
    phase: "LI not started · Ad not started",
    today: 12,
    li: [25, 80],
    before: [{ l: 38, r: 64 }],
    after: [{ l: 25, r: 80 }],
    bCap: "Custom window",
    aCap: "Ad flights can be updated freely",
  },
  {
    rule: "Sync → Custom",
    phase: "LI started · Ad same as LI",
    today: 30,
    li: [15, 80],
    before: [{ l: 15, r: 80 }],
    after: [{ l: 15, r: 56 }],
    bCap: "Same as line item",
    aCap: "Updated to custom",
  },
  {
    rule: "Custom → Sync",
    phase: "LI started · Ad custom, started",
    today: 30,
    li: [15, 80],
    before: [{ l: 18, r: 50 }],
    after: [{ l: 18, r: 50 }, { l: 50, r: 80, sync: true }],
    bCap: "Custom flight",
    aCap: "Remaining time syncs",
  },
  {
    rule: "Custom → Sync",
    phase: "LI started · Ad custom, not started",
    today: 30,
    li: [15, 80],
    before: [{ l: 38, r: 60 }],
    after: [{ l: 30, r: 38, sync: true }, { l: 38, r: 60 }, { l: 60, r: 80, sync: true }],
    bCap: "Custom flight",
    aCap: "Syncs from today, around the custom flight",
  },
  {
    rule: "Custom → Sync",
    phase: "LI started · Ad concluded",
    today: 52,
    li: [15, 80],
    before: [{ l: 15, r: 42 }],
    after: [{ l: 15, r: 42 }, { l: 52, r: 80, sync: true }],
    bCap: "Ad already ended",
    aCap: "Resumes from today",
  },
];

const ROLLS = [
  {
    name: "Pre roll",
    bg: "oklch(0.9 0.06 255)",
    fg: "oklch(0.42 0.16 260)",
    count: 10,
    full: true,
    countColor: "oklch(0.55 0.18 25)",
    ads: ["Ad 1", "Ad 2", "+ 8 more ads"],
  },
  {
    name: "Mid roll",
    bg: "oklch(0.9 0.07 300)",
    fg: "oklch(0.42 0.2 300)",
    count: 2,
    full: false,
    countColor: "#7a7a90",
    ads: ["Ad 3", "Ad 4"],
  },
  {
    name: "Post roll",
    bg: "oklch(0.9 0.06 280)",
    fg: "oklch(0.42 0.18 280)",
    count: 1,
    full: false,
    countColor: "#7a7a90",
    ads: ["Ad 5"],
  },
];

const REASONS = [
  {
    title: "Insertion and stitching",
    body: "Each ad has to be decided and stitched into the episode. Many ads per slot could slow delivery or make insertion less reliable.",
  },
  {
    title: "Slot logic",
    body: "Ads compete for a limited number of positions. Weights, priority and position rules get harder to reason about past a certain count.",
  },
  {
    title: "Listener experience",
    body: "Long ad breaks hurt retention, so a cap keeps breaks short.",
  },
  {
    title: "Operations",
    body: "Ten ads per location is a number a person can review, QA and report on.",
  },
];

const SHOWCASE = [
  {
    id: "flights",
    letter: "A",
    tab: "Ad Flights",
    meta: "4 scenarios · 2 edge cases",
    title: "Ad Flights: follow the line item, or set a window inside it",
    src: "/AdLevel-scenarios-flight-chart.png",
    alt: "Ad flight scenarios and edge cases drawn as line item and ad flow diagrams",
    width: 2400,
    height: 1555,
  },
  {
    id: "positions",
    letter: "B",
    tab: "Ad Positional Targeting",
    meta: "3 scenarios · 2 edge cases",
    title: "Ad Positional Targeting: each ad sets its own, validated against its series",
    src: "/AdLevel-scenarios-positionalTarget-chart.png",
    alt: "Ad positional targeting scenarios and edge cases drawn as line item, series and ad flow diagrams",
    width: 2400,
    height: 1549,
  },
];

const ROTATE_MS = 6000;

function DesignEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <div className={`${MONO} flex items-center gap-3 text-xs uppercase tracking-[0.08em] text-[oklch(0.5_0.2_262)]`}>
      <span>{number}</span>
      <span className="h-px w-7 bg-current" />
      <span>{label}</span>
    </div>
  );
}

function TimelinePanel({
  label,
  labelClass,
  col,
  today,
  li,
  segs,
  caption,
}: {
  label: string;
  labelClass: string;
  col: number;
  today: number;
  li: [number, number];
  segs: Segment[];
  caption: string;
}) {
  return (
    <div className="flex flex-col gap-2" style={{ gridColumn: col }}>
      <span className={`${MONO} text-[10px] font-semibold uppercase tracking-[0.06em] ${labelClass}`}>{label}</span>
      <div className="relative h-[84px]">
        <div className="absolute bottom-3 top-0 border-l-[1.5px] border-dashed border-[#9a98b0]" style={{ left: `${today}%` }} />
        <span
          className={`${MONO} absolute -top-0.5 translate-x-1 text-[9px] text-[#6a6a80]`}
          style={{ left: `${today}%` }}
        >
          Today
        </span>
        <div
          className="absolute top-[22px] h-4 rounded"
          style={{ left: `${li[0]}%`, width: `${li[1] - li[0]}%`, background: "oklch(0.9 0.05 255)" }}
        />
        {segs.map((s) => (
          <div
            key={`${s.l}-${s.r}`}
            className="absolute top-[44px] h-4 rounded"
            style={{
              left: `${s.l}%`,
              width: `${s.r - s.l}%`,
              ...(s.sync
                ? { background: "oklch(0.95 0.03 255)", border: "1.5px dashed oklch(0.55 0.18 255)" }
                : { background: "#5000FA" }),
            }}
          />
        ))}
        <div className="absolute bottom-3 left-0 right-0 h-px bg-[#cfcde0]" />
      </div>
      <span className={`${SANS} text-xs leading-[1.4] text-[#6a6a80]`}>{caption}</span>
    </div>
  );
}

function TimelineChart({ n, chart }: { n: number; chart: (typeof CHARTS)[number] }) {
  return (
    <div className={`${SANS} flex flex-col gap-4 rounded-2xl border border-[#e3e1ef] bg-white p-[22px] text-[#1a1a2e]`}>
      <div className="flex flex-col gap-1">
        <span className={`${MONO} text-[11px] text-[#7a7a90]`}>
          Chart 0{n} · {chart.phase}
        </span>
        <span className="text-[15px] font-semibold text-[oklch(0.45_0.22_270)]">{chart.rule}</span>
      </div>
      <div className="relative grid grid-cols-[minmax(0,1fr)_20px_minmax(0,1fr)] items-start gap-2">
        <TimelinePanel
          label="Before"
          labelClass="text-[#7a7a90]"
          col={1}
          today={chart.today}
          li={chart.li}
          segs={chart.before}
          caption={chart.bCap}
        />
        <TimelinePanel
          label="After"
          labelClass="text-[oklch(0.48_0.22_285)]"
          col={3}
          today={chart.today}
          li={chart.li}
          segs={chart.after}
          caption={chart.aCap}
        />
        <span className="absolute left-1/2 top-[58px] -translate-x-1/2 text-base text-[oklch(0.5_0.2_262)]">
          {n === 1 ? "⇄" : "→"}
        </span>
      </div>
    </div>
  );
}

// Tabbed showcase. The progress bar under the active tab is the timer: when it fills, the next tab opens.
// It pauses while hovered, stops once a tab is picked, and never rotates for users who prefer reduced motion.
const TICK_MS = 50;

function RotatingShowcase() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [picked, setPicked] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const rotating = !picked && !reduced;

  useEffect(() => {
    if (hovered || !rotating) return;
    const id = setInterval(() => setProgress((p) => Math.min(p + (100 * TICK_MS) / ROTATE_MS, 100)), TICK_MS);
    return () => clearInterval(id);
  }, [hovered, rotating]);

  useEffect(() => {
    if (progress < 100) return;
    setActive((a) => (a + 1) % SHOWCASE.length);
    setProgress(0);
  }, [progress]);

  const item = SHOWCASE[active];

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="flex flex-col gap-5">
      <div
        role="tablist"
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}
      >
        {SHOWCASE.map((s, i) => {
          const on = i === active;
          const isB = s.letter === "B";
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={on}
              onClick={() => {
                setActive(i);
                setProgress(0);
                setPicked(true);
              }}
              className={`${SANS} relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-[14px] border px-5 py-[18px] text-left transition-colors ${
                on
                  ? isB
                    ? "border-[#e0d4ff] bg-[#f4f0ff]"
                    : "border-blue-100 bg-blue-50"
                  : "border-[#e3e1ef] bg-white hover:bg-blue-50"
              }`}
            >
              <span className={`${MONO} text-xs ${isB ? "text-[#5000FA]" : "text-[oklch(0.5_0.2_262)]"}`}>{s.letter}</span>
              <span className="text-[15px] font-medium text-[#1a1a2e]">{s.tab}</span>
              {on && (
                <span
                  className={`absolute bottom-0 left-0 h-[3px] ${isB ? "bg-[#5000FA]" : "bg-[oklch(0.5_0.22_270)]"}`}
                  style={{ width: rotating ? `${progress}%` : "100%" }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 rounded-[20px] border border-[#e6e5ef] bg-white p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className={`${SANS} text-[17px] font-semibold text-[#1a1a2e]`}>
            <span className={item.letter === "B" ? "text-[#5000FA]" : "text-[oklch(0.5_0.2_262)]"}>{item.letter}</span>
            {" · "}
            {item.title}
          </h3>
          <span className={`${MONO} text-xs text-[#7a7a90]`}>{item.meta}</span>
        </div>
        <Image src={item.src} alt={item.alt} width={item.width} height={item.height} className="h-auto w-full" />
      </div>
    </div>
  );
}

const OUTCOMES = [
  { value: "35%+", label: "less line item clutter" },
  { value: "8%", label: "fewer CX tickets" },
  { value: "PodcastOne", label: "onboarded with this feature's launch" },
];

const TEST_TASKS = ["Create a line item", "Create ad creatives"];

const TREE_TAGS = {
  io: { label: "Insertion order", bg: "oklch(0.92 0.04 255)", fg: "oklch(0.4 0.14 258)" },
  li: { label: "Line item", bg: "oklch(0.9 0.06 270)", fg: "oklch(0.42 0.18 272)" },
  ad: { label: "Ad", bg: "#5000FA", fg: "#fff" },
} as const;

function TreeNode({ kind, name, children }: { kind: keyof typeof TREE_TAGS; name: string; children?: React.ReactNode }) {
  const tag = TREE_TAGS[kind];
  const isAd = kind === "ad";
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center gap-3 rounded-[10px] border px-4"
        style={{
          paddingTop: isAd ? 11 : 12,
          paddingBottom: isAd ? 11 : 12,
          background: isAd ? "oklch(0.975 0.015 295)" : "#fff",
          borderColor: isAd ? "oklch(0.88 0.06 295)" : "#e6e5ef",
        }}
      >
        <span
          className="rounded-[5px] px-[9px] py-[3px] font-mono text-[11px] font-semibold uppercase tracking-[0.04em]"
          style={{ background: tag.bg, color: tag.fg, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {tag.label}
        </span>
        <span className={`${SANS} text-sm font-semibold text-[#1a1a2e]`}>{name}</span>
      </div>
      {children && <div className="ml-6 flex flex-col gap-3 border-l-[1.5px] border-[#d9d7e8] pl-7">{children}</div>}
    </div>
  );
}

const PROTOTYPE_VIEWS = [
  { id: "line-item", label: "Line item", query: "" },
  { id: "ads", label: "Ads list", query: "?view=ads" },
  { id: "ad", label: "Ad form", query: "?view=ad" },
] as const;

// The view controls sit outside the prototype, so the embedded screen shows only the app itself.
function PrototypeEmbed() {
  const [view, setView] = useState<(typeof PROTOTYPE_VIEWS)[number]["id"]>("line-item");
  const current = PROTOTYPE_VIEWS.find((v) => v.id === view) ?? PROTOTYPE_VIEWS[0];
  const src = `/projects/ads-control/prototype${current.query}`;

  return (
    <div className="relative left-1/2 flex w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 flex-col gap-4">
      <div role="tablist" className="inline-flex gap-1 self-center rounded-full bg-[#efeef6] p-[5px]">
        {PROTOTYPE_VIEWS.map((v) => {
          const on = v.id === view;
          return (
            <button
              key={v.id}
              role="tab"
              aria-selected={on}
              onClick={() => setView(v.id)}
              className={`${SANS} flex cursor-pointer items-center rounded-full px-[18px] py-2.5 text-sm font-semibold transition-all duration-200 ${
                on
                  ? "bg-white text-[#1a1a2e] shadow-[0_1px_2px_rgba(30,20,80,.08),0_4px_14px_-4px_rgba(60,40,160,.18)]"
                  : "bg-transparent text-[#6a6a80] hover:text-[#1a1a2e]"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
        <iframe src={src} title="Ads Control interactive prototype" className="h-[920px] w-full bg-white" />
      </div>
    </div>
  );
}

export default function AdsControlCaseStudy() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("hasAccess")) {
      router.replace("/projects/project-access?target=ads-control");
    }
  }, [router]);

  return (
    <>
      {/* Cover image */}
      <div className="w-full mb-2" style={{ backgroundColor: "#DAE4E6" }}>
        <Image
          src="/cover-adcontrols.png"
          alt="Ad-Level Targeting and Flights cover"
          width={3840}
          height={2400}
          quality={90}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
          priority
        />
      </div>

      <main className="flex min-h-screen flex-col items-center bg-white px-4 py-8">
        {/* Back button */}
        <div className="mb-4 flex w-full max-w-5xl justify-start">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-blue-100 py-1 pl-2 pr-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
          >
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-3 w-3 text-blue-700" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            Back to Home
          </Link>
        </div>

        {/* Title, summary and side column */}
        <section className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
          <div className="mt-4 flex flex-col md:col-span-2">
            <h1 className="mb-4 text-[40px] font-bold leading-tight">
              Ad-Level Targeting and Flights: Ending Line Item Sprawl
            </h1>
            <p className="mb-4 text-gray-900">
              Advertisers were creating a new line item every time one ad needed different targeting or dates. I decided
              on a three-level hierarchy, Insertion Order, Line Item and Ads, and designed ad-level settings that sit
              under the line item, with clear sync rules and limits that protect delivery.
            </p>
          </div>
          <aside className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Tags:</span>
              {["Amazon", "AdTech", "Line Item/Campaign"].map((t) => (
                <span key={t} className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-800">
                  {t}
                </span>
              ))}
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">My Role:</span>
              <span className="ml-2 text-sm text-gray-900">Lead Product Designer</span>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">Platform:</span>
              <span className="ml-2 text-sm text-gray-900">Desktop, Responsive Mobile.</span>
            </div>
          </aside>
        </section>

        {/* Outcome */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-7">
          <div className={`${MONO} flex items-center gap-3 text-xs uppercase tracking-[0.08em] text-[oklch(0.5_0.2_262)]`}>
            <span>Outcome</span>
            <span className="h-px w-6 bg-current" />
          </div>
          <div
            className={`${SANS} grid gap-4 rounded-2xl border border-[#e6e5ef] bg-white px-8 py-7`}
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" }}
          >
            {OUTCOMES.map((o) => (
              <div key={o.label} className="flex flex-col gap-1.5">
                <span className="text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#5000FA] tabular-nums">
                  {o.value}
                </span>
                <span className="text-sm leading-[1.5] text-[#4a4a60]">{o.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Problem */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-8">
          <DesignEyebrow number="01" label="The problem" />
          <div
            className="grid items-end gap-x-14 gap-y-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
          >
            <h2 className={`${SANS} text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance text-[#1a1a2e]`}>
              Every change meant a new line item
            </h2>
            <p className={`${SANS} text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
              To change an ad's targeting or flight during a campaign, users had to create a new line item. Orders filled
              up with near-duplicate line items, and each one had to be managed on its own.
            </p>
          </div>
          <figure>
            <Image
              src="/AdLevel-problems.png"
              alt="Campaigns list where one targeted series is split into separate Pre-roll, Mid-roll and Post-roll line items, with three stats: 5 line items per series, 32% need to swap an ad, 28% need to extend a flight"
              width={3049}
              height={1200}
              className="h-auto w-full"
            />
          </figure>
        </section>

        {/* 2. Research */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-8">
          <DesignEyebrow number="02" label="Research" />
          <div
            className="grid items-end gap-x-14 gap-y-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
          >
            <h2 className={`${SANS} text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance text-[#1a1a2e]`}>
              Why ads sometimes need their own settings
            </h2>
            <p className={`${SANS} text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
              Interviews and support conversations showed that the same line item often needs different settings for
              each ad. These are the main use cases.
            </p>
          </div>
          <figure>
            <Image
              src="/AdLevel-findings.png"
              alt="Four use-case cards: A/B testing ads, swapping ads mid-campaign, custom ads for specific demographics, and ads targeting different rolls or played in sequence"
              width={5460}
              height={1440}
              className="h-auto w-full"
            />
          </figure>
        </section>

        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        {/* 3. Shaping */}
        <section className="mb-20 grid w-full max-w-5xl items-center gap-16 md:grid-cols-2">
          <div className="flex flex-col gap-7">
            <DesignEyebrow number="03" label="Shaping" />
            <div className="relative pt-8">
              <span
                aria-hidden
                className={`${SANS} absolute -left-1 -top-3.5 text-[88px] font-bold leading-none text-[oklch(0.88_0.06_285)]`}
              >
                “
              </span>
              <h2
                className={`${SANS} relative text-[clamp(24px,2.8vw,34px)] font-semibold leading-[1.2] tracking-[-0.02em] text-balance text-[#5000FA]`}
              >
                Added another content structure: creative-level control.
              </h2>
            </div>
            <p className={`${SANS} max-w-[52ch] text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
              I started with hand sketches to test where ad settings should live. The design decision was to give each
              ad its own consolidated card for settings, so a campaign can scale to more creatives while the line item
              stays simple. I then moved these ideas into the team&apos;s wireframes.
            </p>
          </div>
          <figure className="m-0 flex flex-col gap-3.5">
            <div className="relative rotate-[1.2deg] rounded-md bg-white p-2.5 shadow-[0_1px_2px_rgba(30,20,80,.06),0_24px_60px_-20px_rgba(60,40,160,.25)]">
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 -rotate-2 bg-[oklch(0.86_0.07_280/0.7)]"
              />
              <Image
                src="/AdLevel-sketch.jpg"
                alt="Hand sketches of the campaign creation flow, ad placement rules, the single-page ad creation, and bulk edit"
                width={3284}
                height={2168}
                className="h-auto w-full"
              />
            </div>
          </figure>

          <div className="col-span-full flex flex-col gap-7">
            <div
              className="grid items-start gap-x-14 gap-y-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
            >
              <div className="flex flex-col gap-3">
                <span className={`${MONO} text-xs uppercase tracking-[0.08em] text-[oklch(0.5_0.2_262)]`}>
                  Creation hierarchy
                </span>
                <h3 className={`${SANS} text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.3] text-balance text-[#1a1a2e]`}>
                  Three layers, from parent to grandchild
                </h3>
              </div>
              <p className={`${SANS} text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
                Ad creatives become their own layer under the line item. Each layer inherits from its parent and owns
                only what it needs to change.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-10">
              <div
                className="flex flex-[0_1_560px] flex-col gap-3 rounded-[20px] border border-[#e6e5ef] p-8"
                style={{ background: "oklch(0.975 0.012 280)" }}
              >
                <TreeNode kind="io" name="Q4 Brand Awareness">
                  <TreeNode kind="li" name="Holiday Podcast">
                    <TreeNode kind="ad" name="Holiday 30s" />
                    <TreeNode kind="ad" name="Holiday 15s" />
                  </TreeNode>
                </TreeNode>
              </div>
              <div className={`${SANS} flex flex-[1_1_220px] flex-col gap-[18px]`}>
                {[
                  { code: "L1", name: "Insertion order", color: "#1a1a2e", codeColor: "#9a98b0", isNew: false },
                  { code: "L2", name: "Line item (Campaign)", color: "#1a1a2e", codeColor: "#9a98b0", isNew: false },
                  { code: "L3", name: "Ad creatives", color: "#5000FA", codeColor: "#5000FA", isNew: true },
                ].map((l) => (
                  <div key={l.code} className="flex items-center gap-3">
                    <span className={`${MONO} text-xs`} style={{ color: l.codeColor }}>{l.code}</span>
                    <span className="text-[15px] font-semibold" style={{ color: l.color }}>{l.name}</span>
                    {l.isNew && (
                      <span className={`${MONO} rounded-full bg-[#5000FA] px-2 py-0.5 text-[11px] font-semibold text-white`}>New</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Separating ad from line item */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-8">
          <DesignEyebrow number="04" label="Separating ad from line item" />
          <div
            className="grid items-end gap-x-16 gap-y-6"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
          >
            <h2 className={`${SANS} text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.02em] text-balance text-[#1a1a2e]`}>
              Ads get their own flights and positions, within limits the line item sets.
            </h2>
            <p className={`${SANS} text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
              Flights and positional targeting caused most of the complexity, so each got its own set of scenarios and
              edge cases, drawn out and resolved.
            </p>
          </div>
          <RotatingShowcase />
        </section>

        {/* 5. Flexibility vs limits */}
        <section className={`${SANS} mb-20 w-screen bg-[oklch(0.965_0.018_285)] px-10 py-[100px] text-[#1a1a2e]`}>
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[72px]">
            <div className="flex flex-col gap-7">
              <DesignEyebrow number="05" label="Decisions" />
              <h2 className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.03em]">
                <span className="text-[oklch(0.5_0.2_262)]">Allow flexibility</span>
                <span className="text-[#9a98b0]"> vs. </span>
                <span className="text-[#5000FA]">set limits</span>
              </h2>
            </div>

            <div id="decision-a" className="flex scroll-mt-8 flex-col gap-9">
              <div
                className="grid items-end gap-x-16 gap-y-6"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}
              >
                <div className="flex flex-col gap-4">
                  <span className={`${MONO} text-xs uppercase tracking-[0.08em] text-[oklch(0.5_0.2_262)]`}>
                    Decision A · Flexible
                  </span>
                  <h3 className="text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.3] tracking-[-0.015em] text-balance">
                    Ad flights sync with the line item by default. Users can customize them, or sync them back at any time.
                  </h3>
                </div>
                <p className="text-base leading-[1.65] text-pretty text-[#4a4a60]">
                  This makes every valid ad flight use case possible: seasonal ads, flights that change often, and ads
                  extended with their line item.
                </p>
              </div>

              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}
              >
                {CHARTS.map((c, i) => (
                  <TimelineChart key={c.rule + c.phase} n={i + 1} chart={c} />
                ))}
                <div
                  className={`${SANS} flex flex-col justify-center gap-3.5 rounded-2xl border border-[#e3e1ef] bg-white p-[22px] text-sm text-[#4a4a60]`}
                >
                  <span className={`${MONO} text-[11px] uppercase tracking-[0.06em] text-[#6a6a80]`}>Legend</span>
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-[22px] rounded-[3px] bg-[oklch(0.9_0.05_255)]" />
                    Line item flight
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-[22px] rounded-[3px] bg-[#5000FA]" />
                    Ad flight
                  </span>
                  <span className="flex items-center gap-2.5">
                    <span className="h-3 w-[22px] rounded-[3px] border-[1.5px] border-dashed border-[oklch(0.7_0.14_255)] bg-[oklch(0.95_0.03_255)]" />
                    Synced back to line item
                  </span>
                </div>
              </div>

            </div>

            <div id="decision-b" className="flex scroll-mt-8 flex-col gap-9">
              <div
                className="grid items-end gap-x-16 gap-y-6"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))" }}
              >
                <div className="flex flex-col gap-4">
                  <span className={`${MONO} text-xs uppercase tracking-[0.08em] text-[#5000FA]`}>
                    Decision B · Set limits
                  </span>
                  <h3 className="text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.3] tracking-[-0.015em] text-balance">
                    Each roll location is limited to 10 ads.
                  </h3>
                </div>
                <p className="text-base leading-[1.65] text-pretty text-[#4a4a60]">
                  Flexibility stops where delivery, reasoning and listening start to break.
                </p>
              </div>

              <div className="flex flex-wrap items-start gap-4">
                <div className="flex w-full max-w-[380px] flex-[1_1_280px] flex-col gap-3.5 rounded-2xl border border-[#e3e1ef] bg-white p-5">
                  <span className={`${MONO} text-[11px] uppercase tracking-[0.06em] text-[#7a7a90]`}>
                    Ad positions · max 10 per roll
                  </span>
                  {ROLLS.map((r) => (
                    <div key={r.name} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ background: r.bg, color: r.fg }}>
                          {r.name}
                        </span>
                        <span className="h-px flex-1 bg-[#e6e5ef]" />
                        <span className={`${MONO} text-[11px]`} style={{ color: r.countColor }}>
                          {r.count}/10
                        </span>
                      </div>
                      {r.ads.map((a) => (
                        <div
                          key={a}
                          className={`flex items-center justify-between py-1.5 pl-3.5 pr-2 text-sm font-medium ${
                            a.startsWith("+") ? "text-[#7a7a90]" : "text-[#1a1a2e]"
                          }`}
                        >
                          <span>{a}</span>
                          <span className="tracking-[1px] text-[#b0aec2]">···</span>
                        </div>
                      ))}
                      {r.full && (
                        <div className="ml-2 flex items-center gap-2 rounded-lg border border-dashed border-[oklch(0.75_0.12_20)] px-2.5 py-[7px] text-[13px] text-[oklch(0.55_0.18_25)]">
                          × Limit reached — can’t add an 11th ad
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div
                  className="grid flex-[2_1_440px] items-stretch gap-4 self-stretch"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, max(220px, calc(50% - 8px))), 1fr))",
                    gridAutoRows: "1fr",
                  }}
                >
                  {REASONS.map((r, i) => (
                    <div key={r.title} className={`${SANS} flex flex-col gap-3 rounded-2xl border border-[#e3e1ef] bg-white p-6`}>
                      <span className={`${MONO} text-[13px] text-[#5000FA]`}>0{i + 1}</span>
                      <span className="text-base font-semibold">{r.title}</span>
                      <span className="text-sm leading-[1.6] text-pretty text-[#4a4a60]">{r.body}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. User testing */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-8">
          <DesignEyebrow number="06" label="Testing" />
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}>
            <div className={`${SANS} flex flex-col gap-6 rounded-2xl border border-[#e6e5ef] bg-white p-7 text-[#1a1a2e]`}>
              <span className="text-[15px] font-semibold">Task success in usability testing</span>
              {TEST_TASKS.map((t) => (
                <div key={t} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{t}</span>
                    <span className={`${MONO} text-xs text-[#5000FA]`}>100%</span>
                  </div>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, oklch(0.55 0.2 262), oklch(0.5 0.24 295))" }}
                  />
                </div>
              ))}
            </div>
            <div
              className={`${SANS} flex flex-col justify-center gap-4 rounded-2xl px-8 py-7`}
              style={{ background: "oklch(0.965 0.018 285)" }}
            >
              <span aria-hidden className="text-[72px] font-bold leading-[0.6] text-[oklch(0.85_0.07_285)]">“</span>
              <blockquote className="text-[clamp(20px,2.2vw,24px)] font-semibold leading-[1.35] text-[#5000FA]">
                This will be very helpful for us to train a new campaign manager.
              </blockquote>
              <span className={`${MONO} text-xs text-[#6a6a80]`}>Usability test participant</span>
            </div>
          </div>
        </section>

        {/* 7. Dynamic prototype */}
        <section className="mb-20 flex w-full max-w-5xl flex-col gap-8">
          <DesignEyebrow number="07" label="Prototype" />
          <div
            className="grid items-start gap-x-14 gap-y-4"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}
          >
            <h2 className={`${SANS} text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance text-[#1a1a2e]`}>
              Working Prototype
            </h2>
            <p className={`${SANS} text-base leading-[1.65] text-pretty text-[#4a4a60]`}>
              The interactive prototype covers the Ads list, filters, sync states, the ad form for creating and editing,
              and Save, Deactivate and Delete.
            </p>
          </div>
          <PrototypeEmbed />
        </section>

        <BottomNav
          previousProject="/projects/project-access?target=scalable-architecture"
          previousProjectName="Scalable Architecture"
          nextProject="/projects/project-access?target=brand-approval"
          nextProjectName="Brand Approval"
        />
        <Footer customValue="max-w-5xl" dark />
      </main>
    </>
  );
}
