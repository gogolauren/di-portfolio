"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "../shared-components/bottom-nav";
import Footer from "../shared-components/footer";
import s from "./episode.module.css";

function WaveSVG({ playheadPct = 0.13, height = 120 }: { playheadPct?: number; height?: number }) {
  let seed = 7919;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const n = 160;
  const raw: number[] = [];
  for (let i = 0; i < n; i++) {
    const x = i / n;
    // Averaged samples for smooth envelope
    const r = (rnd() + rnd() + rnd()) / 3;
    // Brief dips every ~8% to simulate sentence breaks
    const segPos = (x * 12.5) % 1;
    const segDip = segPos < 0.08 ? segPos / 0.08 : segPos > 0.92 ? (1 - segPos) / 0.08 : 1;
    // Slight natural shape (podcast compression keeps levels consistent)
    const shape = 0.85 + 0.15 * Math.sin(x * Math.PI);
    raw.push(r * segDip * shape);
  }
  const pMax = Math.max(...raw);
  const pMin = Math.min(...raw);
  // Normalize to a consistent visual range
  const peaks = raw.map(p => 0.18 + 0.72 * ((p - pMin) / (pMax - pMin)));
  const mid = height / 2;
  const W = 800;
  const bw = Math.max(1.5, W / n - 1.5);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" style={{ display: "block" }}>
      {peaks.map((p, i) => {
        const bx = (i / n) * W;
        const bh = Math.max(2, p * (height * 0.44));
        return (
          <rect key={i} x={bx} y={mid - bh} width={bw} height={bh * 2} rx={1} fill={(i / n) <= playheadPct ? "#8f9fc0" : "#b8bcc4"} />
        );
      })}
    </svg>
  );
}

export default function EpisodeProject() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [adView, setAdView] = useState<'screen1' | 'customize'>('screen1');
  const [adShowCursor, setAdShowCursor] = useState(false);
  const [adShowScrollCursor, setAdShowScrollCursor] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  useEffect(() => {
    const hasAccess = sessionStorage.getItem("hasAccess");
    if (!hasAccess) {
      router.replace("/projects/project-access");
    }
  }, [router]);

  useEffect(() => {
    const t = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(t);
  }, []);

  // Auto-cycle: show cursor click → open editor → scroll body → return
  useEffect(() => {
    let alive = true;
    const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));
    const cycle = async () => {
      while (alive) {
        await delay(2200);                         // pause on Screen 01
        if (!alive) break;
        setAdShowCursor(true);                     // cursor hovers over Open Editor
        await delay(900);                          // cursor approaches button
        if (!alive) break;
        setAdView('customize');                    // modal opens as cursor clicks (cursor z:30 stays visible above)
        await delay(500);                          // cursor finishes click animation over modal
        if (!alive) break;
        setAdShowCursor(false);                    // click cursor fades away
        await delay(500);                          // let modal settle
        if (!alive) break;
        setAdShowScrollCursor(true);               // scroll cursor appears on modal body
        await delay(6300);                         // CSS body animation plays
        if (!alive) break;
        setAdShowScrollCursor(false);
        setAdView('screen1');
      }
    };
    cycle();
    return () => { alive = false; };
  }, []);

  return (
    <>
      {/* ── Hero image (keep original) ── */}
      <div className="w-full flex justify-center bg-gradient-to-br from-[#EACAF0] to-[#ADB7D9]">
        <Image
          src="/cover-episodeonly.svg"
          alt="Episode Publishing Project"
          width={1920}
          height={400}
          className="w-screen max-w-none h-[300px] md:h-[500px] object-contain"
          priority
        />
      </div>

      <main className={s.page}>
        {/* ── Project header (keep original style) ── */}
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-0">
          <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm border border-blue-shade rounded-full pl-2 pr-3 py-1 text-blue-dark font-bold hover:bg-blue-anchor hover:text-white transition"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 mr-2 rounded-full bg-blue-pink2">
                <svg
                  className="w-3 h-3 text-blue-dark"
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

          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2 flex flex-col mt-4">
              <h1 className="text-[40px] leading-tight font-bold mb-4 text-gray-900">
                Episode Publishing Experience Redesign
              </h1>
              <p className="text-md text-gray-700">
                Consolidating episode editing and scheduling into a single,
                self-serve flow — cutting publishing time and establishing a
                reusable pattern across the product.
              </p>
            </div>
            <aside className="flex flex-col gap-4 border border-gray-200 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900 text-sm">Tags:</span>
                <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">Amazon</span>
                <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">Creator Experience</span>
                <span className="border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">Podcast</span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm">My Role:</span>
                <span className="ml-2 text-gray-700 text-sm">
                  Led the end-to-end UX process: user research, workflow
                  iterations, interaction design, and design system improvements.
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-900 text-sm">Platform:</span>
                <span className="ml-2 text-gray-700 text-sm">Desktop App</span>
              </div>
            </aside>
          </section>
        </div>

        {/* ══════════════════════════════════════════
            01 — OUTCOMES
        ══════════════════════════════════════════ */}
        <section className={s.outcomes}>
          <div className={s.wrap}>
            <p className={s.eyebrow}>01 — Outcomes</p>
            <p className={s.outcomeLead}>
              A simplified single-page flow{" "}
              <b>slashed publishing time</b> — saving users over 7,100 hours in
              the first month alone.
            </p>

            <div className={s.stats}>
              <div className={s.stat}>
                <div className={s.statN}>64%</div>
                <div>
                  <div className={s.statL}>↓ Mean TTP</div>
                  <div className={s.statD}>Average time-to-publish</div>
                </div>
              </div>
              <div className={s.stat}>
                <div className={s.statN}>25%</div>
                <div>
                  <div className={s.statL}>↓ Median TTP</div>
                  <div className={s.statD}>Typical publishing session</div>
                </div>
              </div>
              <div className={s.stat}>
                <div className={s.statN}>7.1k</div>
                <div>
                  <div className={s.statL}>Hours saved</div>
                  <div className={s.statD}>Across users, first month</div>
                </div>
              </div>
            </div>

            <div className={s.inkNote}>
              <span className={s.inkNoteKey}>Why&nbsp;it&nbsp;matters</span>
              <p className={s.inkNoteText}>
                The redesign powers our <b>Self-Serve initiative</b> — letting
                new clients onboard and publish independently. It now serves as
                a <b>scalable UX pattern</b> reused across the product.
              </p>
            </div>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            02 — EXISTING PROBLEMS
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div className={s.secGrid}>
            <div>
              <p className={s.eyebrow}>02 — The Problem</p>
              <h2 className={s.sectionTitle}>Publishing had no path</h2>
              <div className={s.probList}>
                <div className={s.prob}>
                  <span className={s.probN}>01</span>
                  <div>
                    <h3 className={s.probTitle}>Lack of a guided flow</h3>
                    <p className={s.probText}>
                      Users had no clear, linear path for creating and
                      publishing episodes — leading to confusion and drop-off.
                    </p>
                  </div>
                </div>
                <div className={s.prob}>
                  <span className={s.probN}>02</span>
                  <div>
                    <h3 className={s.probTitle}>Unclear episode actions</h3>
                    <p className={s.probText}>
                      Status-changing actions like scheduling or publishing were
                      buried and not easily discoverable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <figure>
              <div className={`${s.figframe} ${s.figframePlain}`}>
                <Image
                  src="/Epi-oldpage.png"
                  alt="The original episode editor — dense, two-column, actions scattered"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-md"
                  style={{ filter: "blur(0.6px)" }}
                />
              </div>
            </figure>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            03 — VISION
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div className={s.secHead}>
            <p className={s.eyebrow}>03 — Vision</p>
            <h2 className={s.sectionTitle}>Three principles to design against</h2>
          </div>
          <div className={s.visionGrid}>
            <div className={s.vcard}>
              <span className={s.vcardN}>01</span>
              <h3 className={s.vcardTitle}>Self-serve flow</h3>
              <p className={s.vcardText}>
                So creators can publish and edit episodes independently, without
                support.
              </p>
            </div>
            <div className={s.vcard}>
              <span className={s.vcardN}>02</span>
              <h3 className={s.vcardTitle}>Sufficient instruction</h3>
              <p className={s.vcardText}>
                Explain configurations clearly, in context, at the moment of
                decision.
              </p>
            </div>
            <div className={s.vcard}>
              <span className={s.vcardN}>03</span>
              <h3 className={s.vcardTitle}>Reduce CX load</h3>
              <p className={s.vcardText}>
                Decrease support tickets by removing ambiguity from the
                experience.
              </p>
            </div>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            04 — PRODUCT SHAPING
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div className={`${s.secGrid} mb-12`} style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
            <div>
              <p className={s.eyebrow}>04 — Shaping</p>
              <h2 className={s.sectionTitle}>A guided flow, sketched fast</h2>
            </div>
            <div>
              <p className={s.bodyText}>
                After researching competitors and similar products — Squarespace,
                Mailchimp — it became clear the straightforward move was a guided
                flow to create and edit episodes.
              </p>
              <p className={s.bodyText}>
                I drew variations of the idea, from a{" "}
                <em style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontStyle: "italic", color: "oklch(0.225 0.015 285)" }}>
                  one-page creation form
                </em>{" "}
                to a{" "}
                <em style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontStyle: "italic", color: "oklch(0.225 0.015 285)" }}>
                  step-by-step
                </em>{" "}
                flow, to pressure-test the structure before committing.
              </p>
            </div>
          </div>
          <figure>
            <div className={s.figframe}>
              <div className="flex gap-3">
                <Image
                  src="/Epi-sketch-1.jpg"
                  alt="Episode sketches — page one"
                  width={800}
                  height={600}
                  className="w-1/2 h-auto rounded-md object-cover"
                />
                <Image
                  src="/Epi-sketch-2.jpg"
                  alt="Episode sketches — page two"
                  width={800}
                  height={600}
                  className="w-1/2 h-auto rounded-md object-cover"
                />
              </div>
            </div>
          </figure>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            05 — EXPLORATION & VALIDATION
        ══════════════════════════════════════════ */}
        <section className={s.section}>
          {/* Section header + Flow 01 text */}
          <div className={s.wrap}>
            <div className={s.secHead}>
              <p className={s.eyebrow}>05 — Exploration &amp; Validation</p>
              <h2 className={s.sectionTitle}>Two flows, one decision</h2>
            </div>
            <div className={s.flowHead}>
              <span className={s.flowTag}>Flow 01</span>
              <div>
                <h3 className={s.flowTitle}>Inline scheduling</h3>
                <p className={s.flowText}>
                  Everything on one page — episode content and scheduling
                  together. Users get two primary actions,{" "}
                  <em>Save as Draft</em> and <em>Publish</em>, supporting a
                  flexible, exploratory workflow where they can leave things
                  unfinished until ready for a definitive step.
                </p>
              </div>
            </div>
          </div>
          {/* Flow 01 image — wide */}
          <figure className={s.wrapWide} style={{ marginTop: "clamp(24px,3vw,40px)" }}>
            <div className={s.figframe}>
              <Image
                src="/Epi-flow-1-updated.png"
                alt="Flow 1 — inline scheduling with release options and date picker on page"
                width={1600}
                height={900}
                className="w-full h-auto rounded-md"
              />
            </div>
          </figure>

          {/* Flow 02 text */}
          <div className={s.wrap} style={{ marginTop: "clamp(48px,6vw,80px)" }}>
            <div className={s.flowHead}>
              <span className={s.flowTag}>Flow 02</span>
              <div>
                <h3 className={s.flowTitle}>Schedule via modal</h3>
                <p className={s.flowText}>
                  The main page focuses solely on episode content. Actions like{" "}
                  <em>Save</em>, <em>Schedule</em>, or <em>Publish Now</em> are
                  triggered through a dedicated modal — a more guided, intentional
                  experience.
                </p>
              </div>
            </div>
          </div>
          {/* Flow 02 image — wide */}
          <figure className={s.wrapWide} style={{ marginTop: "clamp(24px,3vw,40px)" }}>
            <div className={s.figframe}>
              <Image
                src="/Epi-flow-2-updated.png"
                alt="Flow 2 — scheduling handled through a dedicated modal"
                width={1600}
                height={900}
                className="w-full h-auto rounded-md"
              />
            </div>
          </figure>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            06 — A CURVEBALL / COMPARISON TABLE
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrapWide}`}>
          <div className={s.secHeadCenter}>
            <p className={s.eyebrowCenter}>06 — A Curveball</p>
            <h2 className={s.sectionTitleCenter}>Explore extreme simplicity</h2>
            <p className={s.compareIntro}>
              A manager pushed a provocative constraint —{" "}
              <em>avoid contextual buttons that change with an episode&rsquo;s status</em>.
              So we lined up three directions and compared how far we could push
              the interface toward a single, effortless action.
            </p>
          </div>

          <div className={s.compare}>
            <div className={s.compareTable}>
              {/* Header row */}
              <div className={s.ctCorner} />
              <div className={s.ctHead}>
                <h3>Flow 1</h3>
                <span>Standard form</span>
              </div>
              <div className={s.ctHead}>
                <h3>Flow 2</h3>
                <span>Guided / modal</span>
              </div>
              <div className={`${s.ctHead} ${s.ctHeadHl}`}>
                <h3>Simplified Flow 1</h3>
                <span>One &ldquo;Save&rdquo; button</span>
                <span className={s.ctTag}>exploring</span>
              </div>

              {/* Row: Feature */}
              <div className={s.ctLabel}>Feature</div>
              <div className={s.ctCell}>
                A standard, complete form first-time users immediately understand
                — all information and release dates on one page.
              </div>
              <div className={s.ctCell}>
                A guided flow that trims the first glance to episode content,
                surfacing scheduling only in a modal.
              </div>
              <div className={`${s.ctCell} ${s.ctCellHl}`}>
                One button. The system infers status automatically, so users
                focus on content and simply <strong>Save</strong> — the lowest
                cognitive load.
              </div>

              {/* Row: Primary action */}
              <div className={s.ctLabel}>Primary action</div>
              <div className={s.ctCell}>
                <ul className={s.ctActs}>
                  <li>Save as Draft</li>
                  <li>Publish</li>
                </ul>
              </div>
              <div className={s.ctCell}>
                <ul className={s.ctActs}>
                  <li>Save</li>
                  <li>Schedule</li>
                  <li>Publish Now</li>
                </ul>
                <span className={s.ctSub}>In a dedicated modal</span>
              </div>
              <div className={`${s.ctCell} ${s.ctCellHl}`}>
                <ul className={s.ctActs}>
                  <li><strong>Save</strong></li>
                </ul>
                <span className={s.ctSub}>A single primary action</span>
              </div>

              {/* Row: Release dates */}
              <div className={s.ctLabel}>Release dates</div>
              <div className={s.ctCell}>
                Always shown, inline with the content.
              </div>
              <div className={s.ctCell}>
                Surfaced only when the user intends to schedule.
              </div>
              <div className={`${s.ctCell} ${s.ctCellHl}`}>
                Set later — a scheduled episode stays a{" "}
                <strong>Draft</strong> until its date arrives.
              </div>
            </div>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            07 — STATUS MACHINE (moved)
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div className={s.secGrid}>
            <div>
              <p className={s.eyebrow}>07 — System Design</p>
              <h2 className={s.sectionTitle}>An episode status machine</h2>
              <p className={s.bodyText}>Episodes can exist in one of four states:</p>
              <div className={s.badgeRow}>
                <span className={`${s.badge} ${s.badgeDraft}`}>Draft</span>
                <span className={`${s.badge} ${s.badgeSched}`}>Scheduled</span>
                <span className={`${s.badge} ${s.badgePub}`}>Published</span>
                <span className={`${s.badge} ${s.badgeUnpub}`}>Unpublished</span>
              </div>
              <p className={s.bodyText}>
                I defined the logic and criteria for transitioning between
                statuses. This structured model helps handle edge cases and
                error scenarios far more reliably within the experience.
              </p>
            </div>
            <figure>
              <div className={`${s.figframe} ${s.figframePlain}`}>
                <Image
                  src="/Epi-statusmachine.png"
                  alt="Status machine diagram mapping transitions between episode states"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </figure>
          </div>
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            07 — VALIDATION (hidden — unhide when ready)
        ══════════════════════════════════════════ */}
        {false && <section className={`${s.section} ${s.wrap}`}>
          <div className={`${s.secGrid} ${s.secGridNarrow}`}>
            <div>
              <p className={s.eyebrow}>07 — Validation</p>
              <h2 className={s.sectionTitle}>Users favored Flow 1</h2>
            </div>
            <div>
              <p className={s.bodyText}>
                We tested both flows. Users favored{" "}
                <strong>Flow 1</strong> for its simplicity and ease of use —
                especially when making quick changes or ongoing edits.
              </p>
              <p className={s.bodyText}>
                That feedback pointed us firmly toward a{" "}
                <em style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontStyle: "italic", color: "oklch(0.225 0.015 285)" }}>
                  streamlined, single-page interaction model
                </em>{" "}
                for episode management.
              </p>
            </div>
          </div>
        </section>}

        {/* ══════════════════════════════════════════
            08 — AI AD INSERTION POINTS
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrapWide}`}>
          <div className={s.secHeadCenter}>
            <p className={s.eyebrowCenter}>08 — Ad Insertion</p>
            <h2 className={s.sectionTitleCenter}>Edit Audio: AI Suggests Ad Points — Creators Customize</h2>
            <p className={s.compareIntro}>
              Alongside the publishing redesign, we designed an <strong>AI-assisted ad insertion</strong> layer.
              The system analyzes uploaded audio to detect natural pauses and identify host-read ads baked
              into the recording — surfacing candidates before the creator opens the editor.
              Creators can accept AI suggestions, adjust their timing, or add entirely custom
              insertion points — all within the same waveform editor.
            </p>
          </div>

          {/* Two-panel interactive: left nav + right mockup */}
          <div className={s.adNavLayout}>

            {/* ── Left navigation ── */}
            <div className={s.adNavLeft}>
              <button
                className={`${s.adNavItem} ${adView === 'screen1' ? s.adNavItemActive : ''}`}
                onClick={() => setAdView('screen1')}
              >
                <span className={s.adNavTag}>AI-suggested Ad Points</span>
                <span className={s.adNavDesc}>Episode edit page — AI surfaces insertion points on the audio module before the editor opens.</span>
              </button>
              <button
                className={`${s.adNavItem} ${adView === 'customize' ? s.adNavItemActive : ''}`}
                onClick={() => setAdView('customize')}
              >
                <span className={s.adNavTag}>Customize Editor</span>
                <span className={s.adNavDesc}>Configure timing, markers, and brand priorities in the waveform editor.</span>
              </button>
            </div>

            {/* ── Right: mockup frame ── */}
            <div className={s.adNavRight}>
              <div className={s.aiScreenFrame}>
                <div className={s.mockBrowserContent}>
                  <div className={s.mockPageContent}>
                    <div className={s.mockBreadcrumb}>Episodes / 24 Hours / Edit episode</div>
                    <div className={s.mockEpHeading}>24 Hours: 7th Hour</div>
                    <div className={s.mockEpSub}>Draft · Last saved 2 minutes ago</div>

                    {/* Episode information card */}
                    <div className={s.mockInfoCard}>
                      <div className={s.mockInfoCardTitle}>Episode details</div>
                      <div className={s.mockInfoField}>
                        <div className={s.mockInfoFieldLabel}>Episode title</div>
                        <div className={s.mockInfoFieldInput}>24 Hours: 7th Hour</div>
                      </div>
                      <div className={s.mockInfoField}>
                        <div className={s.mockInfoFieldLabel}>Description</div>
                        <div className={s.mockInfoFieldTextarea}>A wide-ranging conversation recorded for the 24 Hours series.</div>
                      </div>
                    </div>

                    {/* Audio & Ad Insertion card */}
                    <div className={s.mockAudioCard}>
                      <div className={s.mockAudioCardHeader}>
                        <span className={s.mockAudioCardTitle}>Audio &amp; Ad Insertion</span>
                        <button className={s.mockAiSugBtn}>+ AI suggested 3 points</button>
                      </div>
                      <div className={s.mockAudioFileSub}>AMSC_6702_Pearlman_DYN.wav · 41:29</div>

                      {/* Waveform with markers */}
                      <div className={s.mockWaveArea}>
                        <div className={s.mockWaveChipRow}>
                          <span className={s.mockWaveChip} style={{left: '0%'}}>● PRE-ROLL</span>
                          <span className={s.mockWaveChip} style={{left: '37%'}}>● MID-ROLL 1</span>
                          <span className={s.mockWaveChip} style={{left: '68%'}}>● MID-ROLL 2</span>
                        </div>
                        <div className={s.mockWaveSvgWrap}>
                          <WaveSVG height={62} playheadPct={0} />
                          <div className={s.mockWaveMarkerLine} style={{left: '0%'}} />
                          <div className={s.mockWaveMarkerLine} style={{left: '37%'}} />
                          <div className={s.mockWaveMarkerLine} style={{left: '68%'}} />
                        </div>
                        <div className={s.mockWaveTimeline}>
                          <span>00:00</span><span>10:00</span><span>20:00</span><span>30:00</span><span>41:29</span>
                        </div>
                      </div>

                      {/* Roll list */}
                      <div className={s.mockRollList}>
                        <div className={s.mockRollRow}>
                          <span className={`${s.mockRollDot} ${s.mockRollDotGray}`} />
                          <span className={s.mockRollName}>Pre-roll</span>
                          <span className={s.mockRollTime}>00:00</span>
                          <span className={s.mockRollDesc}>All Live Read and Spots</span>
                          <span className={`${s.aiTypeTag} ${s.aiTypeSeries}`}>Series setting</span>
                        </div>
                        <div className={s.mockRollRow}>
                          <span className={`${s.mockRollDot} ${s.mockRollDotBlue}`} />
                          <span className={s.mockRollName}>Mid-roll 1</span>
                          <span className={s.mockRollTime}>15:21</span>
                          <span className={s.mockRollDesc}>All Live Read and Spots</span>
                          <span className={`${s.aiTypeTag} ${s.aiTypePause}`}>Natural pause</span>
                        </div>
                        <div className={s.mockRollRow}>
                          <span className={`${s.mockRollDot} ${s.mockRollDotBlue}`} />
                          <span className={s.mockRollName}>Mid-roll 2</span>
                          <span className={s.mockRollTime}>28:37</span>
                          <span className={s.mockRollDesc}>Host-read ad detected (baked in)</span>
                          <span className={`${s.aiTypeTag} ${s.aiTypeHostRead}`}>Host read</span>
                        </div>
                      </div>

                      {/* Footer — Open Editor */}
                      <div className={s.mockAudioCardFooter}>
                        <button className={s.mockOpenBtn} onClick={() => setAdView('customize')}>Open Editor</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Click cursor — hovers over Open Editor button */}
                {adShowCursor && (
                  <div className={s.adMouseCursor}>
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 1.5L2 18L6.5 13.5L9.5 21L12 20L9 12.5H15.5L2 1.5Z" fill="white" stroke="#1e2030" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {/* Scroll cursor — visible on modal body during auto-scroll */}
                {adShowScrollCursor && (
                  <div className={s.adScrollCursor}>
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 1.5L2 18L6.5 13.5L9.5 21L12 20L9 12.5H15.5L2 1.5Z" fill="white" stroke="#1e2030" strokeWidth="1.4" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                {/* ── Editor modal overlay (Customize Editor view) ── */}
                {adView === 'customize' && (
                  <div className={s.adEditorOverlay} onClick={() => setAdView('screen1')}>
                    <div className={s.editorMockModal} onClick={e => e.stopPropagation()}>
                      {/* Sticky header */}
                      <div className={s.editorMockHead}>
                        <span className={s.editorMockTitle}>Audio Upload &amp; Ad Insertion</span>
                        <div className={s.editorMockHeadActions}>
                          <span className={s.editorIconBtn}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg></span>
                          <span className={s.editorIconBtn}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6"/></svg></span>
                          <span className={s.editorIconBtn} style={{cursor:'pointer'}} onClick={() => setAdView('screen1')}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></span>
                        </div>
                      </div>
                      {/* Scrollable body — overflow hidden, inner div animates via CSS */}
                      <div className={s.adEditorBody}>
                      <div className={s.adEditorBodyInner}>

                      {/* File bar */}
                      <div className={s.editorMockFilebar}><b>File Name:</b> AMSC_6702_Pearlman_DYN</div>
                      {/* Waveform */}
                      <div className={s.editorMockWaveWrap}>
                        <div className={s.editorMockZoomBar}>
                          <div className={s.editorMockZoomGroup}>
                            <span className={s.editorMockZoomBtn}>−</span>
                            <span className={s.editorMockZoomBtn}>+</span>
                            <span className={s.editorMockZoomVal}>150%</span>
                          </div>
                        </div>
                        <div className={s.editorMockWaveMain}>
                          <WaveSVG playheadPct={0.13} height={120} />
                          <div className={s.editorMockPlayhead} style={{ left: "13%" }} />
                          <div className={`${s.editorMockMarker} ${s.mkCustom} ${s.mkSel}`} style={{ left: "0.5%" }}>
                            <div className={s.mkLine} /><div className={s.mkFlag}>PRE</div>
                          </div>
                          <div className={`${s.editorMockMarker} ${s.mkAI}`} style={{ left: "13%" }}>
                            <div className={s.mkLine} /><div className={s.mkFlag}>PRE · AI</div>
                          </div>
                          <div className={`${s.editorMockMarker} ${s.mkAI}`} style={{ left: "78.2%" }}>
                            <div className={s.mkLine} /><div className={s.mkFlag}>MID · AI</div>
                          </div>
                          <div className={`${s.editorMockMarker} ${s.mkCustom}`} style={{ left: "94%" }}>
                            <div className={s.mkLine} /><div className={s.mkFlag}>POST</div>
                          </div>
                        </div>
                        {/* Time axis */}
                        <div className={s.editorMockTimeAxis}>
                          {(["00:00","06:00","12:00","18:00","24:00","30:00","36:00"] as const).map((t, i) => (
                            <span key={i} style={{ left: `${(i / 6) * 100}%` }}>{t}</span>
                          ))}
                        </div>
                        {/* Minimap */}
                        <div className={s.editorMockMinimap}>
                          <WaveSVG playheadPct={0.13} height={34} />
                          <div className={s.editorMockMinimapWin} style={{ left: "4%", width: "52%" }} />
                          {([0.5, 13, 78.2, 94] as const).map((pct, i) => (
                            <div key={i} className={`${s.editorMockMiniMk} ${i === 1 || i === 2 ? s.mkAIMini : ""}`} style={{ left: `${pct}%` }} />
                          ))}
                        </div>
                        <div className={s.editorMockTimeRange}>
                          <span>00:00:00.00</span>
                          <span>00:41:29.00</span>
                        </div>
                        {/* Legend */}
                        <div className={s.editorMockLegend}>
                          <div className={s.legendItem}><span className={`${s.legendDot} ${s.legendDotCustom}`} />Custom insertion point</div>
                          <div className={s.legendItem}><span className={`${s.legendDot} ${s.legendDotAI}`} />AI-suggested point</div>
                          <div className={s.legendItem}><span className={`${s.legendDot} ${s.legendDotSel}`} />Selected / open (any type)</div>
                        </div>
                      </div>
                      {/* Transport */}
                      <div className={s.editorMockTransport}>
                        <span className={s.editorMockSpeedBtn}>1x</span>
                        <div className={s.editorMockTCenter}>
                          <span className={s.editorMockTbtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6l-8.5 6L18 18zM7 6H5v12h2z"/></svg></span>
                          <span className={s.editorMockTbtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l-7 6 7 6zM8 6H6.5v12H8z"/></svg></span>
                          <span className={s.editorMockPlayBtn}><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg></span>
                          <span className={s.editorMockTbtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 6l7 6-7 6zM16 6h1.5v12H16z"/></svg></span>
                          <span className={s.editorMockTbtn}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6l8.5 6L6 18zM17 6h2v12h-2z"/></svg></span>
                        </div>
                        <span className={s.editorMockVolBtn}><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M5 9v6h4l5 4V5L9 9H5zm11.5 3a3.5 3.5 0 00-2-3.15v6.3A3.5 3.5 0 0016.5 12z"/></svg></span>
                      </div>
                      {/* Selection row */}
                      <div className={s.editorMockSelrow}>
                        <div style={{ display:"flex", alignItems:"center" }}>
                          <span className={s.editorMockSelLabel}>Selection:</span>
                          <div className={s.editorMockStepper}><span className={s.editorMockStepperVal}>00:05:21.00</span></div>
                        </div>
                        <span className={s.editorMockNewMkBtn}>
                          New Marker
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                        </span>
                      </div>
                      {/* AIP list */}
                      <div className={s.editorMockAipList}>
                        {/* Pre-Roll 1 — custom, EXPANDED */}
                        <div className={`${s.editorMockAip} ${s.editorMockAipOpen}`}>
                          <div className={s.editorMockAipRow}>
                            <span className={s.editorMockAipSq} />
                            <div className={s.editorMockAipMain}>
                              <div className={s.editorMockAipName}>Pre-Roll 1</div>
                              <div className={s.editorMockAipMeta}>00:00:00.00</div>
                            </div>
                            <div style={{ display:"flex", gap:"2px" }}>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg></span>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></span>
                            </div>
                          </div>
                          <div className={s.editorMockAipBody}>
                            <div className={s.editorMockCfgSec}>
                              <span className={s.editorMockCfgLabel}>AIP Type <span style={{ color:"#e2574c" }}>*</span></span>
                              <div className={s.editorMockRadios}>
                                <label className={s.editorMockRadio}>
                                  <span className={`${s.editorMockRadioDot} ${s.editorMockRadioDotChecked}`} />
                                  <span style={{ color:"#2c2f36", fontWeight:600, fontSize:"13px" }}>Pre-Roll</span>
                                </label>
                                <label className={s.editorMockRadio}>
                                  <span className={s.editorMockRadioDot} /><span>Mid-Roll</span>
                                </label>
                                <label className={s.editorMockRadio}>
                                  <span className={s.editorMockRadioDot} /><span>Post-Roll</span>
                                </label>
                              </div>
                            </div>
                            <div className={s.editorMockCfgSec}>
                              <div className={s.editorMockCfgGrid}>
                                <div>
                                  <span className={s.editorMockCfgLabel}>Maximum Total Time</span>
                                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                    <div className={s.editorMockSelectWrap}>
                                      <select className={s.editorMockSelect}><option>120</option></select>
                                      <span className={s.editorMockSelectArrow} />
                                    </div>
                                    <span className={s.editorMockInlineNote}>Seconds</span>
                                  </div>
                                </div>
                                <div>
                                  <span className={s.editorMockCfgLabel}>Maximum Ad Positions</span>
                                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                                    <div className={s.editorMockSelectWrap}>
                                      <select className={s.editorMockSelect}><option>2</option></select>
                                      <span className={s.editorMockSelectArrow} />
                                    </div>
                                    <span className={s.editorMockInlineNote} style={{ fontStyle:"italic", color:"#868d99" }}>(A and B)</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={s.editorMockCfgSec}>
                              <span className={s.editorMockCfgLabel}>Priorities</span>
                              <div className={s.editorMockProw}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color:"#868d99", flexShrink:0 }}><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/></svg>
                                <span style={{ fontSize:"11.5px", color:"#868d99", width:"12px", textAlign:"center" }}>1</span>
                                <select className={s.editorMockProwSelect}><option>All Live Reads and Spots</option></select>
                                <span className={s.editorMockLinkBtn}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
                                  Define Start
                                </span>
                                <span className={s.editorMockLinkBtn}>
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>
                                  Define End
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Mid-Roll 1 — collapsed */}
                        <div className={s.editorMockAip}>
                          <div className={s.editorMockAipRow}>
                            <span className={`${s.editorMockAipSq} ${s.editorMockAipSqAI}`} />
                            <div className={s.editorMockAipMain}>
                              <div className={s.editorMockAipName}>Mid-Roll 1 <span className={s.aiBadge}>AI</span></div>
                              <div className={s.editorMockAipMeta}>00:15:21.00 &nbsp;|&nbsp; Max 120 Secs &amp; 2 Positions &nbsp;|&nbsp; All Live Reads and Spots</div>
                            </div>
                            <div style={{ display:"flex", gap:"2px", opacity:0.4 }}>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg></span>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></span>
                            </div>
                          </div>
                        </div>
                        {/* Mid-Roll 2 — collapsed */}
                        <div className={s.editorMockAip}>
                          <div className={s.editorMockAipRow}>
                            <span className={`${s.editorMockAipSq} ${s.editorMockAipSqAI}`} />
                            <div className={s.editorMockAipMain}>
                              <div className={s.editorMockAipName}>Mid-Roll 2 <span className={s.aiBadge}>AI</span></div>
                              <div className={s.editorMockAipMeta}>00:28:37.00 &nbsp;|&nbsp; Max 120 Secs &amp; 2 Positions &nbsp;|&nbsp; All Live Reads and Spots</div>
                            </div>
                            <div style={{ display:"flex", gap:"2px", opacity:0.4 }}>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg></span>
                              <span className={s.editorMockIconBtn}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></span>
                            </div>
                          </div>
                        </div>
                      </div>{/* editorMockAipList */}
                      </div>{/* adEditorBodyInner */}
                      {/* Fake scrollbar — animates in sync with body drift */}
                      <div className={s.adFakeScrollbar}>
                        <div className={s.adFakeScrollbarThumb} />
                      </div>
                      </div>{/* adEditorBody */}
                      {/* Sticky footer */}
                      <div className={s.adEditorFoot}>
                        <span className={s.editorMockGhostBtn}>Cancel</span>
                        <span className={s.editorMockPrimaryBtn}>Done</span>
                      </div>
                    </div>{/* editorMockModal */}
                  </div>
                )}

              </div>{/* aiScreenFrame */}
            </div>{/* adNavRight */}
          </div>{/* adNavLayout */}
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            10 — FINAL DESIGN
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div
            className={s.secGrid}
            style={{ marginBottom: "clamp(36px,5vw,56px)" }}
          >
            <div>
              <p className={s.eyebrow}>09 — Final Design</p>
              <h2 className={s.sectionTitle}>A clever system, simple choices</h2>
            </div>
            <div>
              <p className={s.bodyText}>
                Based on usability feedback, we moved forward with a{" "}
                <strong>single-page design</strong> holding both episode content
                and scheduling — with the main CTA reduced to just{" "}
                <em style={{ fontFamily: "var(--font-fraunces, Georgia, serif)", fontStyle: "italic", color: "oklch(0.225 0.015 285)" }}>
                  Save
                </em>
                .
              </p>
              <p className={s.bodyText}>
                The system interprets the user&rsquo;s scheduling intent from
                their input:
              </p>
              <ul className={s.logic}>
                <li className={s.logicItem}>
                  <span className={s.logicDot} />
                  <span>
                    No publish date set → the episode is saved as a{" "}
                    <b>Draft</b>.
                  </span>
                </li>
                <li className={s.logicItem}>
                  <span className={s.logicDot} />
                  <span>
                    A future publish date → the episode is{" "}
                    <b>Scheduled</b> for that date.
                  </span>
                </li>
                <li className={s.logicItem}>
                  <span className={s.logicDot} />
                  <span>
                    A publish date of right now → the episode is{" "}
                    <b>Published</b> immediately.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <figure>
            <div
              className={s.window}
              style={{
                boxShadow:
                  "0 40px 100px -55px oklch(0.3 0.04 285 / 0.5)",
              }}
            >
              <div className={s.windowBar}>
                <span className={s.windowDots}>
                  <i /><i /><i />
                </span>
                <span className={s.windowTitle}>
                  ART19 · Edit Episode — single CTA &ldquo;Save&rdquo;
                </span>
              </div>
              <video
                ref={videoRef}
                src="/Epi-screenrecord.mov"
                className="w-full h-auto block"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </figure>
        </section>

        {/* ── Footer nav ── */}
        <div className="w-full flex flex-col items-center">
          <BottomNav
            previousProject="/projects/project-access?target=brand-approval"
            previousProjectName="Brand Approval"
            nextProject="/projects/risk-detection"
            nextProjectName="Risk Detection"
          />
          <Footer customValue="max-w-5xl w-full" dark />
        </div>
      </main>
    </>
  );
}
