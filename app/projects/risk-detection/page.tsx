"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  UserPlusIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { BottomNav } from "../shared-components/bottom-nav";
import Footer from "../shared-components/footer";

/* Final-design screens sit smaller, matted on the same grey as the flow chart. */
function Shot({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="rounded-lg bg-[#f3f3f5] p-6 md:p-10 flex justify-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full max-w-[600px] h-auto rounded-md border border-gray-200"
      />
    </div>
  );
}

const riskLevelStyles: Record<string, string> = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-rose-50 text-rose-700 border-rose-200",
  Critical: "bg-rose-100 text-rose-800 border-rose-300",
};

function RiskChip({ level }: { level: "Low" | "Medium" | "High" | "Critical" }) {
  return (
    <span
      className={`inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-bold ${riskLevelStyles[level]}`}
    >
      {level}
    </span>
  );
}

/* ── Low-fidelity screen wireframes for the escalation track ── */
/* Access Requests list with the request preview panel open on the right:
   the risky entitlements are visible without leaving the list. */
function WireList({ className = "w-full h-auto" }: { className?: string }) {
  const rows = [81, 97, 113, 129, 145, 161];
  return (
    <svg
      viewBox="0 0 280 210"
      className={`block ${className}`}
      role="img"
      aria-label="Wireframe of the Access Requests list with a request selected: a preview panel on the right shows the requested entitlements and their risk tags, so the risk can be read without opening the request"
    >
      <rect x="1" y="1" width="278" height="208" rx="10" fill="#fff" stroke="#dad3fd" />

      {/* app chrome */}
      <path d="M1,11 a10,10 0 0 1 10,-10 h258 a10,10 0 0 1 10,10 v11 h-278 z" fill="#f4f3f9" />
      <line x1="1" y1="22" x2="279" y2="22" stroke="#eceef3" />
      {[8.4, 10.8, 13.2].map((y) => (
        <rect key={y} x="9" y={y} width="7" height="1.4" rx="0.7" fill="#b9bcc6" />
      ))}
      <rect x="21" y="8.5" width="26" height="6" rx="3" fill="#4923f4" opacity="0.45" />
      <line x1="53" y1="7" x2="53" y2="16" stroke="#dfe1e7" />
      <rect x="58" y="9.5" width="14" height="4" rx="2" fill="#b9bcc6" />
      {[236, 248, 260].map((cx) => (
        <circle key={cx} cx={cx} cy="11.5" r="2.6" fill="#c9ccd4" />
      ))}
      <circle cx="270" cy="11.5" r="4.5" fill="#dfe1e7" />

      {/* the table's name */}
      <text
        x="12"
        y="39"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#5a5a6e"
      >
        Access Requests
      </text>

      <rect x="12" y="50" width="72" height="11" rx="5.5" fill="#fff" stroke="#e3e5ea" />
      <circle cx="19" cy="55.5" r="2.2" fill="none" stroke="#c9ccd4" strokeWidth="0.9" />
      <rect x="25" y="54" width="34" height="3" rx="1.5" fill="#e3e5ea" />
      <rect x="88" y="50" width="12" height="11" rx="3" fill="#fff" stroke="#e3e5ea" />
      <rect x="104" y="50" width="34" height="11" rx="3" fill="#fff" stroke="#e3e5ea" />
      <rect x="110" y="54" width="22" height="3" rx="1.5" fill="#e3e5ea" />

      {/* table header */}
      {[
        [14, 20],
        [44, 26],
        [76, 16],
        [102, 16],
        [126, 18],
        [152, 14],
        [170, 8],
      ].map(([x, w]) => (
        <rect key={x} x={x} y="70" width={w} height="3" rx="1.5" fill="#c9ccd4" />
      ))}
      <line x1="12" y1="77" x2="176" y2="77" stroke="#eceef3" />

      {/* rows — the first is the one being previewed */}
      <rect x="10" y="79" width="168" height="17" rx="4" fill="#fff" stroke="#4923f4" />
      {rows.map((y, i) => (
        <g key={y}>
          {i > 0 && <line x1="12" y1={y + 13} x2="176" y2={y + 13} stroke="#f1f2f5" />}
          <rect x="14" y={y + 5} width="20" height="3" rx="1.5" fill={i === 0 ? "#c9ccd4" : "#d5d7dd"} />
          <rect x="44" y={y + 5} width="26" height="3" rx="1.5" fill="#dfe1e7" />
          <rect x="76" y={y + 5} width="16" height="3" rx="1.5" fill="#e3e5ea" />
          <rect x="102" y={y + 5} width="16" height="3" rx="1.5" fill="#e3e5ea" />
          <rect x="126" y={y + 5} width="18" height="3" rx="1.5" fill="#e3e5ea" />
          <circle cx="152" cy={y + 6.5} r="2" fill="#4923f4" opacity="0.7" />
          <rect x="157" y={y + 5} width="10" height="3" rx="1.5" fill="#dfe1e7" />
          <rect x="170" y={y + 5} width="8" height="3" rx="1.5" fill="#4923f4" opacity="0.55" />
        </g>
      ))}

      {/* preview panel */}
      <rect x="184" y="26" width="90" height="178" rx="6" fill="#fff" stroke="#dad3fd" />
      <path d="M192,32 L189,34.5 L192,37" fill="none" stroke="#b9bcc6" strokeWidth="1.1" strokeLinecap="round" />
      <rect x="207" y="31" width="44" height="3" rx="1.5" fill="#dfe1e7" />
      <rect x="216" y="37" width="26" height="5" rx="2.5" fill="#b9bcc6" />
      <rect x="189" y="54" width="28" height="3" rx="1.5" fill="#c9ccd4" />

      {/* first account — its risky entitlements carry the tags */}
      <circle cx="195" cy="67" r="5.5" fill="#eef0f4" stroke="#dfe1e7" strokeWidth="0.8" />
      <rect x="205" y="62" width="14" height="4" rx="2" fill="#b9bcc6" />
      <rect x="205" y="69" width="46" height="2.6" rx="1.3" fill="#e3e5ea" />
      <rect x="205" y="77" width="24" height="2.6" rx="1.3" fill="#e3e5ea" />
      <rect x="205" y="85" width="28" height="3.2" rx="1.6" fill="#c9ccd4" />
      <rect x="238" y="83" width="30" height="6.4" rx="3.2" fill="#fef3c7" stroke="#fcd34d" />
      <rect x="246" y="92" width="22" height="6.4" rx="3.2" fill="#fee2e2" stroke="#fca5a5" />
      <rect x="205" y="102" width="26" height="3.2" rx="1.6" fill="#c9ccd4" />
      <rect x="246" y="100" width="22" height="6.4" rx="3.2" fill="#fee2e2" stroke="#fca5a5" />
      <rect x="205" y="114" width="22" height="3.2" rx="1.6" fill="#c9ccd4" />

      {/* second account */}
      <circle cx="195" cy="126" r="5.5" fill="#eef0f4" stroke="#dfe1e7" strokeWidth="0.8" />
      <rect x="205" y="124" width="12" height="4" rx="2" fill="#b9bcc6" />
      <rect x="205" y="132" width="22" height="2.6" rx="1.3" fill="#e3e5ea" />
      <rect x="205" y="139" width="26" height="3.2" rx="1.6" fill="#c9ccd4" />
      <rect x="246" y="137" width="22" height="6.4" rx="3.2" fill="#fee2e2" stroke="#fca5a5" />
      <rect x="205" y="150" width="22" height="3.2" rx="1.6" fill="#c9ccd4" />

      {/* one approve action, plus a way into the detail */}
      <rect x="189" y="185" width="46" height="12" rx="6" fill="#4923f4" />
      <rect x="200" y="189.5" width="24" height="3" rx="1.5" fill="#fff" opacity="0.8" />
      <rect x="239" y="185" width="30" height="12" rx="6" fill="#fff" stroke="#4923f4" />
      <rect x="245" y="189.5" width="18" height="3" rx="1.5" fill="#4923f4" opacity="0.55" />
    </svg>
  );
}

function WireDetails({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 210"
      className={`block ${className}`}
      role="img"
      aria-label="Wireframe of the access request details page: inline risk level labels, one opened to show the explanation and associations between risks, with escalate and approve actions"
    >
      <rect x="1" y="1" width="278" height="208" rx="10" fill="#fff" stroke="#dad3fd" />
      <path d="M1,11 a10,10 0 0 1 10,-10 h258 a10,10 0 0 1 10,10 v20 h-278 z" fill="#f4f3f9" />
      <text
        x="16"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#5a5a6e"
      >
        Access Details
      </text>
      <rect x="16" y="42" width="140" height="5" rx="2.5" fill="#d5d7dd" />
      <rect x="16" y="53" width="90" height="4.5" rx="2.2" fill="#e3e5ea" />
      <rect x="12" y="68" width="256" height="26" rx="6" fill="#fafafc" stroke="#eceef3" />
      <rect x="22" y="78" width="80" height="5" rx="2.5" fill="#c9ccd4" />
      <rect x="206" y="75" width="52" height="12" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <rect x="212" y="79" width="5" height="5" rx="2.5" fill="#34d399" />
      <rect x="222" y="79.5" width="28" height="4" rx="2" fill="#a7f3d0" />
      <rect x="12" y="100" width="256" height="76" rx="6" fill="#fff" stroke="#4923f4" />
      <rect x="22" y="110" width="72" height="5" rx="2.5" fill="#c9ccd4" />
      <rect x="206" y="107" width="52" height="12" rx="6" fill="#fee2e2" stroke="#fca5a5" />
      <rect x="212" y="111" width="5" height="5" rx="2.5" fill="#fb7185" />
      <rect x="222" y="111.5" width="28" height="4" rx="2" fill="#fca5a5" />
      <rect x="22" y="126" width="150" height="4.5" rx="2.2" fill="#dfe1e7" />
      <rect x="22" y="136" width="118" height="4.5" rx="2.2" fill="#e3e5ea" />
      <line x1="40" y1="158" x2="68" y2="158" stroke="#4923f4" strokeWidth="1.2" />
      <line x1="80" y1="158" x2="108" y2="158" stroke="#4923f4" strokeWidth="1.2" />
      <circle cx="34" cy="158" r="6" fill="#fff" stroke="#4923f4" strokeWidth="1.2" />
      <circle cx="74" cy="158" r="6" fill="#fff" stroke="#4923f4" strokeWidth="1.2" />
      <circle cx="114" cy="158" r="6" fill="#fff" stroke="#4923f4" strokeWidth="1.2" />
      <rect x="132" y="155" width="64" height="5" rx="2.5" fill="#dfe1e7" />
      <rect x="132" y="184" width="60" height="15" rx="7.5" fill="#fff" stroke="#4923f4" />
      <rect x="144" y="189" width="36" height="5" rx="2.5" fill="#4923f4" opacity="0.55" />
      <rect x="200" y="184" width="60" height="15" rx="7.5" fill="#4923f4" />
      <rect x="212" y="189" width="36" height="5" rx="2.5" fill="#fff" opacity="0.75" />
    </svg>
  );
}

function WireOwner({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 210"
      className={`block ${className}`}
      role="img"
      aria-label="Wireframe of the same request opened by a Risk Owner: the complete risk tech spec and risk actions"
    >
      <rect x="1" y="1" width="278" height="208" rx="10" fill="#fff" stroke="#dad3fd" />
      <path d="M1,11 a10,10 0 0 1 10,-10 h258 a10,10 0 0 1 10,10 v20 h-278 z" fill="#ece9fd" />
      <text
        x="16"
        y="18"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#5a5a6e"
      >
        Risk Specs
      </text>
      <rect x="204" y="8" width="60" height="15" rx="7.5" fill="#2b1c89" />
      <rect x="214" y="13" width="40" height="5" rx="2.5" fill="#fff" opacity="0.8" />
      <rect x="12" y="40" width="256" height="128" rx="6" fill="#fafafc" stroke="#eceef3" />
      <rect x="22" y="52" width="60" height="5" rx="2.5" fill="#b9bcc6" />
      {[
        [66, 220],
        [76, 198],
        [86, 228],
        [96, 176],
      ].map(([y, w]) => (
        <rect key={y} x="22" y={y} width={w} height="4.5" rx="2.2" fill="#e3e5ea" />
      ))}
      <rect x="22" y="112" width="50" height="5" rx="2.5" fill="#b9bcc6" />
      {[
        [126, 212],
        [136, 190],
        [146, 150],
      ].map(([y, w]) => (
        <rect key={y} x="22" y={y} width={w} height="4.5" rx="2.2" fill="#e3e5ea" />
      ))}
      <rect x="128" y="180" width="62" height="15" rx="7.5" fill="#fff" stroke="#2b1c89" />
      <rect x="140" y="185" width="38" height="5" rx="2.5" fill="#2b1c89" opacity="0.55" />
      <rect x="198" y="180" width="62" height="15" rx="7.5" fill="#2b1c89" />
      <rect x="210" y="185" width="38" height="5" rx="2.5" fill="#fff" opacity="0.75" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Risk escalation — horizontal track. Two lanes, five steps left→right;
   depth is distance travelled. Escalation is not a step: it is the branch
   between step 3 and step 4.

   DOM order stays chronological (1→5) whatever the grid does, so the flow
   is followable from a screen reader alone. Colour never carries meaning by
   itself — every action chip also has a distinct marker shape and a label.
   The track lays out above 860px; below that it stacks in DOM order.
   ────────────────────────────────────────────────────────────────────────── */
const RULE = "#b9b9c6";
const ARROW = "#9c9cad";

type ActionKind = "decision" | "escalation" | "risk";

const chipStyles: Record<ActionKind, string> = {
  decision: "bg-white border-[#cfcde0] text-purple-dark",
  escalation: "bg-[#efeafe] border-[#c4b6fb] text-purple-anchor",
  risk: "bg-white border-[#b9b2e8] text-purple-dark",
};

/* Each action kind carries a distinct glyph, not just a colour — the shape is
   what makes the three readable without relying on hue. */
function Marker({ kind }: { kind: ActionKind }) {
  if (kind === "escalation") {
    return <UserPlusIcon aria-hidden className="h-3.5 w-3.5 shrink-0 text-purple-anchor" />;
  }
  if (kind === "risk") {
    return <ShieldCheckIcon aria-hidden className="h-3.5 w-3.5 shrink-0 text-purple-dark" />;
  }
  return <CheckCircleIcon aria-hidden className="h-3.5 w-3.5 shrink-0 text-purple-dark" />;
}

function ActionChip({
  kind,
  label,
  className = "",
}: {
  kind: ActionKind;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[7px] rounded-full border px-[11px] py-[5px] ${chipStyles[kind]} ${className}`}
    >
      <Marker kind={kind} />
      <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.06em]">
        {label}
      </span>
    </span>
  );
}

/* Three ticks: how deep into the request this step goes. Step 5 returns to one. */
function DepthMeter({ level, label }: { level: 1 | 2 | 3; label: string }) {
  return (
    <div className="mb-[7px] flex items-center gap-1.5">
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-[3px] w-2.5 rounded-sm ${i <= level ? "bg-purple-anchor" : "bg-[#c7c3e0]"}`}
          />
        ))}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#5a5a6e]">
        <span className="sr-only">Depth {level} of 3 — </span>
        {label}
      </span>
    </div>
  );
}

function StepCard({
  n,
  depth,
  depthLabel,
  title,
  body,
  action,
  className = "",
}: {
  n: number;
  depth?: 1 | 2 | 3;
  depthLabel?: string;
  title: string;
  body: string;
  action: { kind: ActionKind; label: string };
  className?: string;
}) {
  return (
    <div className={`pt-3.5 ${className}`}>
      {depth && depthLabel ? <DepthMeter level={depth} label={depthLabel} /> : null}
      <h5 className="mb-1.5 text-[14.5px] font-bold leading-tight text-pretty text-purple-dark">
        <span className="mr-1.5 text-[#4a4a63]">{n}</span>
        {title}
      </h5>
      <p className="mb-[11px] text-[12px] leading-[1.5] text-pretty text-[#55556a]">{body}</p>
      <ActionChip kind={action.kind} label={action.label} />
    </div>
  );
}

/* Optional exit above the rail: the manager can approve and close here. */
function OffRamp({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`hidden flex-col items-center justify-end min-[860px]:flex ${className}`}
    >
      <span
        className="h-0 w-0 border-x-[4px] border-x-transparent border-b-[6px]"
        style={{ borderBottomColor: ARROW }}
      />
      <span className="my-1 text-[10px] font-bold uppercase tracking-[0.07em] text-[#55556a]">
        {label}
      </span>
      <span className="h-3 w-0.5" style={{ background: RULE }} />
    </div>
  );
}

function TrackNode({ n, dark = false, className = "" }: { n: number; dark?: boolean; className?: string }) {
  return (
    <div
      aria-hidden
      className={`z-[1] hidden items-center justify-center min-[860px]:flex ${className}`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white text-[13px] font-bold text-purple-dark ${
          dark ? "border-purple-dark" : "border-[#b9b9c6]"
        }`}
      >
        {n}
      </span>
    </div>
  );
}

function LaneHeader({ name, note, dark = false }: { name: string; note: string; dark?: boolean }) {
  return (
    /* h-8 matches the track's node row, so the trailing rule lands on the same
       centre line as the rail the nodes sit on. */
    <div className="flex h-8 items-center gap-2.5">
      <span
        aria-hidden
        className={`h-2.5 w-2.5 shrink-0 rounded-[2px] ${dark ? "bg-purple-dark" : "bg-purple-anchor"}`}
      />
      <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.12em] text-purple-dark">
        {name}
      </span>
      <span className="whitespace-nowrap text-[11.5px] text-[#55556a]">{note}</span>
      <span aria-hidden className="h-0.5 flex-1 rounded-full" style={{ background: RULE }} />
    </div>
  );
}

function WireCaption({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5a5a6e]">
      {children}
    </div>
  );
}

function EscalationWalkthrough({
  showLegend = false,
  showDepthMeters = true,
  showOfframps = true,
}: {
  showLegend?: boolean;
  showDepthMeters?: boolean;
  showOfframps?: boolean;
}) {
  const depth = (level: 1 | 2 | 3, label: string) =>
    showDepthMeters ? { depth: level, depthLabel: label } : {};

  return (
    <div className="rounded-[18px] bg-[#f3f3f5] p-6 min-[860px]:p-8">
      {/* header + legend */}
      <div className="mb-[26px] flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-[420px]">
          <h4 className="mb-1.5 text-lg font-bold leading-tight text-purple-dark">
            Risk escalation, step by step
          </h4>
          <p className="text-[13.5px] leading-[1.45] text-pretty text-[#55556a]">
            A request travels only as far as its risk requires.
          </p>
        </div>
        {showLegend && (
          <ul className="flex flex-col gap-2">
            {(
              [
                ["decision", "Access decision", "approve or reject"],
                ["escalation", "Escalation", "pulled by the reviewer"],
                ["risk", "Risk action", "mitigate or accept"],
              ] as [ActionKind, string, string][]
            ).map(([kind, name, gloss]) => (
              <li key={name} className="flex items-center gap-[9px]">
                <ActionChip kind={kind} label={name} className="!py-1" />
                <span className="text-[11.5px] text-[#55556a]">{gloss}</span>
              </li>
            ))}
            <li className="mt-0.5 flex items-center gap-[9px]">
              <span aria-hidden className="flex shrink-0 gap-[3px] pl-1">
                {["#34d399", "#fbbf24", "#fb7185"].map((c) => (
                  <span key={c} className="h-[11px] w-[5px] rounded-sm" style={{ background: c }} />
                ))}
              </span>
              <span className="text-[11.5px] text-[#55556a]">
                inside the screens: risk level only
              </span>
            </li>
          </ul>
        )}
      </div>

      <div className="mb-4">
        <LaneHeader
          name="People Manager"
          note="70% of reviewers · owns the decision end to end"
        />
      </div>

      {/* Below 860px this is block flow in DOM order 1→5, decorations hidden. */}
      <div className="relative min-[860px]:grid min-[860px]:grid-cols-5 min-[860px]:gap-x-3.5 min-[860px]:[grid-template-rows:50px_32px_auto_auto_92px_32px_auto_auto]">
        <div
          aria-hidden
          className="relative z-0 hidden min-[860px]:col-span-5 min-[860px]:col-start-1 min-[860px]:row-start-2 min-[860px]:block"
        >
          <div className="absolute inset-x-0 top-[15px] h-0.5 rounded-full" style={{ background: RULE }} />
        </div>

        {/* 1 */}
        {showOfframps && (
          <OffRamp label="Approve & close" className="min-[860px]:col-start-1 min-[860px]:row-start-1" />
        )}
        <TrackNode n={1} className="min-[860px]:col-start-1 min-[860px]:row-start-2" />
        <div className="mb-3 min-[860px]:col-start-1 min-[860px]:row-start-3 min-[860px]:mb-0">
          <WireList />
        </div>
        <StepCard
          className="min-[860px]:col-start-1 min-[860px]:row-start-4"
          n={1}
          {...depth(1, "Surface")}
          title="Preview the risk from the list"
          body="The row shows what the risk contains — enough to clear routine requests unopened."
          action={{ kind: "decision", label: "Approve or reject" }}
        />

        {/* 2 */}
        {showOfframps && (
          <OffRamp label="Approve & close" className="min-[860px]:col-start-2 min-[860px]:row-start-1" />
        )}
        <TrackNode n={2} className="min-[860px]:col-start-2 min-[860px]:row-start-2" />
        {/* Spans both columns because steps 2 and 3 happen on this one screen;
            the frame itself stays one column wide so all three screens match,
            centred between nodes 2 and 3. */}
        <div className="mb-3 min-[860px]:col-span-2 min-[860px]:col-start-2 min-[860px]:row-start-3 min-[860px]:mb-0">
          <div className="min-[860px]:mx-auto min-[860px]:w-[calc(50%-7px)]">
            <WireDetails />
            <WireCaption>One screen — steps 2 and 3</WireCaption>
          </div>
        </div>
        <StepCard
          className="min-[860px]:col-start-2 min-[860px]:row-start-4"
          n={2}
          {...depth(2, "Detail")}
          title="Risk level, inline"
          body="Every access carries its risk level where it is reviewed."
          action={{ kind: "decision", label: "Approve or reject" }}
        />

        {/* 3 */}
        {showOfframps && (
          <OffRamp label="Approve & close" className="min-[860px]:col-start-3 min-[860px]:row-start-1" />
        )}
        <TrackNode n={3} className="min-[860px]:col-start-3 min-[860px]:row-start-2" />
        <StepCard
          className="min-[860px]:col-start-3 min-[860px]:row-start-4"
          n={3}
          {...depth(3, "Explanation")}
          title="Open the label for the why"
          body="What the risk means, and how it relates to the other risks in the request."
          action={{ kind: "decision", label: "Approve or reject" }}
        />

        {/* the escalation branch — not a step, the alternative that leads to step 4 */}
        <div className="relative z-[1] min-[860px]:col-span-2 min-[860px]:col-start-3 min-[860px]:row-start-5">
          {/* The container spans two columns plus the 14px gutter, so 25% is not
              the first column's centre — it is half a column plus a quarter of the
              gutter. Offsetting by 3.5px lands the elbow dead on nodes 3 and 4. */}
          <div
            aria-hidden
            className="absolute left-[calc(25%-3.5px)] top-7 hidden h-[30px] w-0.5 -translate-x-[1px] bg-purple-anchor min-[860px]:block"
          />
          <div
            aria-hidden
            className="absolute left-[calc(25%-3.5px)] top-[56px] hidden h-0.5 w-[calc(50%+7px)] bg-purple-anchor min-[860px]:block"
          />
          <div
            aria-hidden
            className="absolute left-[calc(75%+3.5px)] top-[56px] hidden h-7 w-0.5 -translate-x-[1px] bg-purple-anchor min-[860px]:block"
          />
          <div
            aria-hidden
            className="absolute left-[calc(75%+3.5px)] top-[82px] hidden h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[8px] border-t-purple-anchor min-[860px]:block"
          />
          <ActionChip
            kind="escalation"
            label="Escalate — assign a Risk Owner"
            /* centred on the elbow, between nodes 3 and 4 — sitting under
               step 3's column made it read as a second step-3 action */
            className="mt-6 min-[860px]:absolute min-[860px]:left-1/2 min-[860px]:top-0 min-[860px]:mt-0 min-[860px]:-translate-x-1/2"
          />
        </div>

        {/* Risk Owner lane */}
        {/* spans the full track so its trailing rule is one continuous line,
            the way the manager rail is — node 4 sits on top of it */}
        <div className="mt-7 min-[860px]:col-span-5 min-[860px]:col-start-1 min-[860px]:row-start-6 min-[860px]:mt-0">
          <LaneHeader
            name="Risk Owner"
            note="20–30% of reviews · pulled in for one request only"
            dark
          />
        </div>
        <div
          aria-hidden
          className="relative z-[1] hidden items-center justify-center min-[860px]:col-start-4 min-[860px]:row-start-6 min-[860px]:flex"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-purple-dark bg-white text-[13px] font-bold text-purple-dark">
            4
          </span>
        </div>
        <div className="pt-3 min-[860px]:col-span-3 min-[860px]:col-start-1 min-[860px]:row-start-7">
          <p className="max-w-[280px] border-t border-[#cfcbe6] pt-3 text-[12px] leading-[1.5] text-pretty text-[#55556a]">
            Most requests never reach this lane.
          </p>
        </div>
        <div className="mb-3 min-[860px]:col-start-4 min-[860px]:row-start-7 min-[860px]:mb-0">
          <WireOwner />
          <WireCaption>Same request, full spec</WireCaption>
        </div>
        <StepCard
          className="min-[860px]:col-start-4 min-[860px]:row-start-8"
          n={4}
          title="Decide the risk itself"
          body="The Risk Owner works from the full technical spec, then hands the request back."
          action={{ kind: "risk", label: "Mitigate or accept" }}
        />

        {/* 5 — the mobile-only lane header hands the flow back to the manager */}
        <div className="mt-7 min-[860px]:hidden">
          <LaneHeader name="People Manager" note="again" />
        </div>
        {showOfframps && (
          <OffRamp label="Final close" className="min-[860px]:col-start-5 min-[860px]:row-start-1" />
        )}
        <TrackNode n={5} className="min-[860px]:col-start-5 min-[860px]:row-start-2" />
        <StepCard
          className="min-[860px]:col-start-5 min-[860px]:row-start-4"
          n={5}
          {...depth(1, "Back to surface")}
          title="Back in the manager's queue"
          body="The request returns on its own — no re-submission, no lost thread."
          action={{ kind: "decision", label: "Approve, then close" }}
        />

        {/* automatic return: dashed, because the system moves it, not a person */}
        <div
          aria-hidden
          className="relative z-0 hidden min-[860px]:col-start-5 min-[860px]:row-start-5 min-[860px]:row-end-9 min-[860px]:block"
        >
          <div
            className="absolute bottom-[22px] left-[-14px] h-0 w-[calc(50%+14px)] border-t-2 border-dashed"
            style={{ borderTopColor: ARROW }}
          />
          <div
            className="absolute bottom-[22px] left-1/2 top-2 w-0 -translate-x-[1px] border-l-2 border-dashed"
            style={{ borderLeftColor: ARROW }}
          />
          <div
            className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[8px]"
            style={{ borderBottomColor: ARROW }}
          />
          <div className="absolute left-[56%] top-3.5 w-[42%] text-[10px] font-bold uppercase leading-[1.35] tracking-[0.07em] text-[#55556a]">
            Returns automatically
          </div>
        </div>
      </div>

      <p className="mt-8 border-t border-[#cfcbe6] pt-[18px] text-[13px] leading-[1.55] text-pretty text-[#4a4a5c]">
        Approval stays available at{" "}
        <strong className="text-purple-dark">every</strong> manager step — depth is optional until
        the risk asks for it. Escalation is{" "}
        <strong className="text-purple-dark">pulled</strong> by the reviewer, never{" "}
        <strong className="text-purple-dark">pushed</strong> by the system, and the request always
        comes back.
      </p>
    </div>
  );
}

export default function RiskDetectionProject() {
  useEffect(() => {
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {" "}
      {/* Header image on top */}
      <div className="w-full flex justify-center mb-2 bg-purple-tint1">
        <Image
          src="/cover-risk.png"
          alt="Risk Detection Project"
          width={1920}
          height={400}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
        />
      </div>
      <main className="min-h-screen flex flex-col items-center px-4 py-8 bg-white">
        {/* Back button below header */}
        <div className="max-w-5xl w-full flex justify-start mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm border border-purple-base rounded-full pl-2 pr-3 py-1 text-purple-dark font-bold hover:bg-purple-anchor hover:text-white transition"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-purple-tint1">
              {/* Arrow icon */}
              <svg
                className="w-3 h-3 text-purple-dark"
                fill="none"
                stroke="currentColor"
                strokeWidth={4}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            Back to Home
          </Link>
        </div>

        {/* Title, description, side column for role and tags */}
        <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col mt-4">
            <h1 className="text-[40px] leading-tight font-bold mb-4">
              Discovering the Escalation Use Case in Risk-Enabled Access
              Requests
            </h1>
            <p className="text-md text-gray-900 mb-4">
              Turning on risk detection changed who reviews an access request. A
              second persona surfaced — Risk Owners — and with it an{" "}
              <span className="font-extrabold">escalation use case</span>{" "}
              covering 20–30% of reviews. I designed a single review flow that
              deepens on demand: risk explained at the depth each reviewer can
              act on, and a temporary hand-off to a Risk Owner that always comes
              back.
            </p>
          </div>
          {/* Side column */}
          <aside className="flex flex-col gap-4 border border-gray-200 bg-gray-0 rounded-lg p-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm">Tags:</span>
              <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                SaaS
              </span>
              <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                B2B{" "}
              </span>
              <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                Access Management, IGA & IAM
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">
                My Role:
              </span>
              <span className="ml-2 text-gray-900 text-sm">
                Lead UX Designer, UX Researcher
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 text-sm">
                Platform:
              </span>
              <span className="ml-2 text-gray-900 text-sm">
                Desktop & Mobile
              </span>
            </div>
          </aside>
        </section>

        {/* Outcomes Section*/}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Project Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* the discovery — the figure is what the discovery is worth */}
            <div className="md:col-span-1 rounded-lg bg-purple-dark p-6 flex flex-col">
              <p className="text-[44px] leading-none font-extrabold text-white tabular-nums">
                20–30<span className="text-[26px] align-top">%</span>
              </p>
              <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-purple-base">
                of reviews escalate
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                Discovered both the{" "}
                <span className="font-extrabold text-white">
                  Risk Owner persona
                </span>{" "}
                and the{" "}
                <span className="font-extrabold text-white">
                  escalation use case
                </span>{" "}
                — the reviews a People Manager cannot finish alone.
              </p>
            </div>

            <div className="md:col-span-1 rounded-lg bg-purple-tint1 p-6 flex flex-col">
              <p className="text-[44px] leading-none font-extrabold text-purple-dark tabular-nums">
                2021
              </p>
              <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-purple-anchor">
                release shipped
              </p>
              <p className="mt-4 text-sm leading-relaxed text-purple-dark/85">
                Risk Criticality and the presentation ecosystem were adopted
                across our other security products.
              </p>
            </div>

            <div className="md:col-span-1 rounded-lg bg-purple-tint1 p-6 flex flex-col">
              <p className="text-[44px] leading-none font-extrabold text-purple-dark tabular-nums">
                +30<span className="text-[26px] align-top">%</span>
              </p>
              <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-purple-anchor">
                NPS
              </p>
              <p className="mt-4 text-sm leading-relaxed text-purple-dark/85">
                Across 8 major clients including Shell and BP, reaching 1,000+
                primary users and closing 10+ customer tickets.
              </p>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-12 text-gray-900 text-left">
            Problem
          </h2>
          <div className="relative flex flex-col items-center justify-center">
            <div className="gap-4 border-l-6 border-purple-base bg-gray-0 py-1 px-6 mb-10">
              <p className="text-xl font-bold text-purple-anchor">
                How to Incorporate Risk content into the Request Review flow?
              </p>
            </div>
            <div>
              <p className="text-md text-gray-900 mb-2 text-left">
                Previously, the Request Review flow was designed without risk
                considerations. However, with risk now enabled in our system,
                the review process has become a critical touchpoint for
                presenting and explaining risks to users. By providing relevant
                risk information within the flow, users can make informed
                decisions on whether to approve or reject access requests.
              </p>
            </div>
          </div>
        </section>

        {/* Old Design */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Original Design
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            The original design did not include risk information. The new
            requirement is to incorporate risk details to provide approvers with
            better context, enabling them to make informed risk-based decisions.
          </p>
          <div className="flex gap-4 max-w-3xl mx-auto">
            <Image
              src="/Risk-olddesign.png"
              alt="Old Design"
              width={1000}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Understand User Story */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Understand User Story
          </h2>
          <p className="text-md text-gray-900  mb-8 text-left">
            The project focuses on{" "}
            <span className="font-extrabold">Approvers</span>, who are
            responsible for reviewing employee requests. Approvers are typically
            people managers overseeing their employees' access requests. The
            review process begins when Approvers receive a notification or
            locate a request number in their pending list. It concludes when
            they take appropriate action—either approving or rejecting each
            access request.
          </p>
          <div className="flex gap-4 max-w-3xl mx-auto">
            <Image
              src="/Risk-userstory.png"
              alt="User Story"
              width={700}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* User testing */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            User Testing Results
          </h2>
          <p className="text-md text-gray-900 mb-8 text-left">
            Conducted a moderated usability test with six participants from two
            clients. Organized affinity notes from their feedback and gathered
            key insights for improvements.
          </p>

          <Image
            src="/Risk-test-a.png"
            alt="User Testing Analysis"
            width={800}
            height={400}
            className="mx-auto rounded-lg object-cover"
          />
          <Image
            src="/Risk-test-b.png"
            alt="User Testing Insights"
            width={800}
            height={400}
            className="mx-auto rounded-lg object-cover"
          />
        </section>

        {/* Challenges */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Challenges
          </h2>
          <p className="text-md text-gray-900 text-left">
            The primary challenge lies in balancing technical complexity with
            business simplicity.
          </p>
          <div className="flex gap-4 max-w-5xl mx-auto">
            <Image
              src="/Risk-challenge.png"
              alt="Challenges"
              width={1200}
              height={400}
              className="mx-auto rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Discovered... */}
        <section className="max-w-5xl w-full mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left w-full">
            Discovered...{" "}
          </h2>
          <div className="flex flex-col gap-8  bg-purple-tint1 rounded-lg p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 border border-purple-base bg-white rounded-lg p-6">
                <span className="text-lg font-bold mb-8">
                  👨‍💻 People Managers (70%)
                </span>
                <p>
                  This group has limited knowledge of risk and may not
                  prioritize it. Their primary focus is reviewing requests based
                  on whether an employee’s role should have access.
                </p>
              </div>

              <div className="flex-1 border border-purple-base bg-white rounded-lg p-6">
                <span className="text-lg font-bold mb-8">
                  👩‍⚖️ Risk Owners (30%)
                </span>
                <p>
                  This group is responsible for setting up risk rules, reviewing
                  risks, and ensuring security compliance within the company.
                </p>
              </div>
            </div>
            <p className="text-md text-purple-dark">
              The two personas do not split the work — they{" "}
              <span className="font-extrabold">
                sit at different depths of the same review
              </span>
              . People Managers own every request; Risk Owners are brought in
              only when a request outgrows the manager&apos;s risk knowledge.
              That relationship became the backbone of the design.
            </p>
          </div>
        </section>

        {/* Ideation */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Ideation
          </h2>

          {/* ── Part 1 — the escalation ── */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-sm font-bold text-purple-anchor">
                Part 1
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Ah-ha Moment: it is a Risk Escalation process!
              </h3>
            </div>
            <p className="text-md text-gray-900 mb-6 text-left">
              In interviews, no one decided once. Reviewers went deeper until
              they could act — and when they ran out of knowledge, they asked
              the person who owned the rule. That is not one screen serving two
              personas. It is{" "}
              <span className="font-extrabold">one review that escalates</span>.
            </p>
            <div className="gap-4 border-l-6 border-purple-base bg-gray-0 py-2 px-6 mb-6">
              <p className="text-xl font-bold text-purple-anchor">
                How do we involve both personas in one request — without
                building two products?
              </p>
            </div>
            <p className="text-md text-gray-900 mb-8 text-left">
              <span className="font-extrabold">The answer was re-assignment.</span>{" "}
              The manager reviews as far as their knowledge goes, then hands the
              review to a Risk Owner — temporarily, for this request only. It
              comes back.
            </p>

            {/* Hidden for now — restore by uncommenting this line.
                The component and its wireframes stay in this file. */}
            {/* <EscalationWalkthrough /> */}
          </div>

          {/* ── Part 2 — risk explained at each depth ── */}
          <div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-sm font-bold text-purple-anchor">
                Part 2
              </span>
              <h3 className="text-xl font-bold text-gray-900">
                Designing the risk explanation at each depth
              </h3>
            </div>
            <p className="text-md text-gray-900 mb-4 text-left">
              Sketched the pages depth by depth against one question: how much
              explanation does this reader need before they can act?
            </p>
            <ul className="list-disc pl-6 mb-8">
              <li>
                <span className="font-extrabold">People Managers (70%)</span> —
                know the employee and the job, not the risk model. One line
                carries them: what the risk is, and who it touches.
              </li>
              <li>
                <span className="font-extrabold">Risk Owners (30%)</span> —
                wrote the rules. They need the full spec, and how each risk
                associates with the others.
              </li>
            </ul>
            <Image
              src="/Risk-ideation_sketch.png"
              alt="Hand sketches of the review pages at each depth of risk explanation"
              width={700}
              height={400}
              className="h-auto mx-auto object-cover mb-8"
            />
            <p className="text-md text-gray-900 text-left">
              So the same risk is written twice — a sentence at the surface, the
              full spec underneath. Disclosing everything up front would fail
              both readers: managers cannot use it, and Risk Owners are not
              there yet.
            </p>
          </div>
        </section>

        {/* Final Design */}
        <section className="max-w-5xl w-full mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 text-left">
            Final Design
          </h2>
          {/* Design detail 01 */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-sm font-bold text-purple-anchor">01</span>
              <h3 className="text-xl font-bold text-gray-900">
                Label the risk in the list, and let Safe Approve clear the rest
              </h3>
            </div>
            <p className="text-md text-gray-900 mb-4">
              Every request carries its risk label in the table view — SOD Risk
              (segregation of duty), Outlier Risk — so a reviewer with no risk
              background can triage the queue at a glance. Without opening
              anything, a People Manager can hit{" "}
              <span className="font-extrabold">Safe Approve</span>: it approves
              only the access that carries no risk, and leaves the risky items
              pending.
            </p>
            <Shot
              src="/Risk-final-1.png"
              alt="Review header showing the risk criticality label with a one-line risk summary beneath it"
              width={1366}
              height={768}
            />
          </div>

          {/* Design detail 02 */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-sm font-bold text-purple-anchor">02</span>
              <h3 className="text-xl font-bold text-gray-900">
                Make dangerous approvals harder than safe ones
              </h3>
            </div>
            <p className="text-md text-gray-900 mb-4">
              For <RiskChip level="High" /> and <RiskChip level="Critical" />{" "}
              requests, the inline approve is deliberately withheld. Opening the
              access reveals a single plain-language line: what the risk is, and
              who it affects. If the manager wants the full risk spec — a third
              layer, needed in about 5% of reviews — they can go one level
              deeper, and the approval action repeats there, so no one has to
              climb back out to act. The friction is targeted: it costs nothing
              on the 80% of routine requests and buys real attention on the ones
              that can hurt.
            </p>
            <Shot
              src="/Risk-final-2.png"
              alt="High-risk state: the quick approve is withheld until the risk detail is opened"
              width={1880}
              height={1398}
            />
          </div>

          {/* Design detail 03 */}
          <div className="mb-16">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-sm font-bold text-purple-anchor">03</span>
              <h3 className="text-xl font-bold text-gray-900">
                Escalate to Risk Owners when needed
              </h3>
            </div>
            <p className="text-md text-gray-900 mb-4">
              When the detail view still is not enough, the manager assigns the
              review to a{" "}
              <span className="font-extrabold">Risk Owner</span>, who picks it
              up in the full risk page with the mitigation tools they need. The
              manager keeps visibility of the request and its status the whole
              time, and the decision returns to them.
            </p>
            <Shot
              src="/Risk-final-3.png"
              alt="The Risk Owner's SOD risk specification page: the rule, its conflicting functions and entitlements, a mitigating control, and the mitigate-or-accept risk actions"
              width={1366}
              height={1105}
            />
          </div>
        </section>

        {/* Footer */}
        <BottomNav
          previousProject="/projects/project-access?target=episode"
          previousProjectName="Episode Publishing"
          nextProject="/projects/app-onboard"
          nextProjectName="Application Onboarding"
          textColor="text-purple-anchor"
          hoverColor="hover:text-purple-dark"
        />
        <Footer customValue="max-w-5xl" dark />
      </main>
    </>
  );
}
