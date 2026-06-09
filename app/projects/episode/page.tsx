"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomNav } from "../shared-components/bottom-nav";
import Footer from "../shared-components/footer";
import s from "./episode.module.css";

export default function EpisodeProject() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

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
            07 — USABILITY TESTING
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
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
        </section>

        <hr className={s.divider} />

        {/* ══════════════════════════════════════════
            08 — STATUS MACHINE
        ══════════════════════════════════════════ */}
        <section className={`${s.section} ${s.wrap}`}>
          <div className={s.secGrid}>
            <div>
              <p className={s.eyebrow}>08 — System Design</p>
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
            09 — FINAL DESIGN
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
          <div className="max-w-5xl w-full px-4">
            <BottomNav
              previousProject="/projects/project-access?target=brand-approval"
              previousProjectName="Brand Approval"
              nextProject="/projects/risk-detection"
              nextProjectName="Risk Detection"
              textColor="text-blue-dark"
              hoverColor="hover:text-blue-anchor"
              className="max-w-5xl w-full mx-auto px-6"
            />
          </div>
          <Footer customValue="max-w-5xl w-full" dark />
        </div>
      </main>
    </>
  );
}
