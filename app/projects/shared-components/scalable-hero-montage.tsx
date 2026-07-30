"use client";

import { useEffect, useRef } from "react";

/**
 * Animated hero for the Scalable Architecture case study, rebuilt from the
 * source PNGs (sharp text, no export watermark) after scalable_hero.mp4:
 *
 *   1. video-1 sits expanded, filling the frame, then collapses like a pop-up
 *      modal into the 2nd visible slot of the middle line.
 *   2. The three lines roll — outer two down, middle up — which lifts every
 *      middle card by one slot and brings video-3 into the 3rd slot.
 *   3. video-3 pops open from that slot to fill the frame on its own.
 *   4. Reset.
 *
 * Both hand-off slots sit inside the frame, so the modals visibly grow out of
 * and shrink back into a page on screen rather than flying in from off-view.
 * The moves overlap: the roll starts before the collapse finishes, and the
 * expand starts before the roll settles.
 */

type Shot = {
  src: string;
  w: number;
  h: number;
  /** Fraction of image height to trim off the bottom — hides baked-in badges. */
  cropBottom?: number;
};

const V1: Shot = { src: "/video-1.png", w: 1650, h: 1236 };
const V3: Shot = { src: "/video-3.png", w: 1080, h: 860 };
const V4: Shot = { src: "/video-4.png", w: 1280, h: 800 };
const V5: Shot = { src: "/video-5.png", w: 1280, h: 800 };
const V6: Shot = { src: "/video-6.png", w: 1280, h: 853 };

/** Nine pages on screen — three per line. */
const LEFT = [V4, V5, V4];
const MIDDLE = [V6, V3, V1];
const RIGHT = [V5, V4, V5];

/** Indices into MIDDLE of the two cards the modals hand off to. */
const IDX_V1 = 2;
const IDX_V3 = 1;

const GAP = 44;
/**
 * Proportions taken from the source clip: each column is ~45% of the frame with
 * a ~7.5% gutter, which makes the board half again as wide as the frame. It is
 * centred so the outer two columns bleed off both edges — the pages read large
 * and the gutters stay tight.
 */
const BOARD_WIDTH = "150%";
const BOARD_LEFT = "-25%";
const COL_BASIS = "30%"; // of the board → 45% of the frame
const COL_GUTTER = "5%"; // of the board → 7.5% of the frame

/**
 * Copies of each line's cards stacked in its track, so a column always covers
 * the frame across the whole roll range and no beige voids open at the top or
 * bottom. Four clears every size this is used at; the tightest is the small
 * home-page card. Copies share one cached image each, so the extra nodes are
 * cheap.
 */
const COPIES = 4;

/**
 * Full cycle. Longer than the source clip only so the modal moves can breathe —
 * the roll keeps its original ~990ms, so it still reads as the quick beat.
 */
const PERIOD_MS = 4300;

/**
 * Beats of the cycle, as fractions of the period. The collapse and the expand
 * are the slow moves; the roll is the short, quick one.
 *
 *   collapse  0.06 ─────────── 0.33          (~1160ms)
 *   roll                       0.33 ────── 0.56   (~990ms, fast)
 *   expand                            0.53 ─────────── 0.80  (~1160ms)
 *
 * The roll must not start before the collapse lands: video-1 is aiming for a
 * slot in the line, and if the line is already moving then that slot has shifted
 * out from under it and the card settles somewhere it never came from. The
 * overlap instead sits on the hand-offs — video-1 keeps riding the line while it
 * fades out, and video-3 fades in before the roll has finished settling.
 */
const B_HOLD1_END = 0.06;
const B_COLLAPSE_END = 0.33;
const B_ROLL_START = 0.33;
const B_MODAL1_GONE = 0.39;
const B_MODAL2_IN = 0.53;
const B_ROLL_END = 0.56;
const B_EXPAND_END = 0.8;
const B_HOLD2_END = 0.95;

/**
 * Card-top positions of the two hand-off slots, as fractions of frame height.
 * With pages this large only one sits fully in frame at a time, so video-1 gets
 * the prominent upper slot and video-3 the lower one it rolls into.
 */
const SLOT_2 = 0.08; // video-1 collapses to here
const SLOT_3 = 0.4; // video-3 opens from here, after the roll

/** Expanded modal is fitted inside the frame with this much breathing room. */
const MODAL_FIT = 0.94;

const SLOW = "cubic-bezier(0.4, 0, 0.2, 1)"; // expand / collapse
// The roll is stitched from several segments. Its opening segment must only
// accelerate and its closing segment must only decelerate — an ease-in-out on
// either one brakes mid-roll and reads as a stutter.
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";
const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";
// Eased at both ends, so the roll is barely moving where it overlaps the
// modal hand-offs — the overlap stays invisible.
const ROLL = "cubic-bezier(0.65, 0, 0.35, 1)";

const shownH = (s: Shot) => Math.round(s.h * (1 - (s.cropBottom ?? 0)));

const cardStyle = (s: Shot): React.CSSProperties => ({
  display: "block",
  width: "100%",
  aspectRatio: `${s.w} / ${shownH(s)}`,
  objectFit: "cover",
  objectPosition: "top",
  borderRadius: 10,
  boxShadow: "0 1px 0 rgba(0,0,0,.02), 0 18px 40px -22px rgba(0,0,0,.30)",
});

/** A rolling line. Shifting by exactly one copy's height is invisible, which is
 *  what makes the wrap seamless. */
function Line({
  shots,
  basis,
  trackRef,
  cardRef,
}: {
  shots: Shot[];
  basis: string;
  trackRef?: (el: HTMLDivElement | null) => void;
  cardRef?: (copy: number, i: number) => (el: HTMLImageElement | null) => void;
}) {
  return (
    <div style={{ flex: `0 0 ${basis}`, minWidth: 0, alignSelf: "stretch", overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: GAP,
          paddingBottom: GAP,
          willChange: "transform",
        }}
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {shots.map((shot, i) => (
              <img
                key={`${copy}-${i}`}
                ref={cardRef?.(copy, i)}
                src={shot.src}
                alt=""
                aria-hidden
                decoding="async"
                draggable={false}
                style={cardStyle(shot)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScalableHeroMontage({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const midTrack = useRef<HTMLDivElement | null>(null);
  const leftTrack = useRef<HTMLDivElement | null>(null);
  const rightTrack = useRef<HTMLDivElement | null>(null);
  /** Middle-line cards keyed by `copy * MIDDLE.length + index`. */
  const midCards = useRef<(HTMLImageElement | null)[]>([]);
  const modal1 = useRef<HTMLImageElement>(null);
  const modal2 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const board = boardRef.current;
    const mid = midTrack.current;
    const left = leftTrack.current;
    const right = rightTrack.current;
    const ov1 = modal1.current;
    const ov2 = modal2.current;
    if (!host || !board || !mid || !left || !right || !ov1 || !ov2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      board.style.opacity = "1";
      ov1.style.opacity = "0";
      ov2.style.opacity = "0";
      return;
    }

    let anims: Animation[] = [];

    /** Layout position relative to `host`, ignoring transforms. */
    const posInHost = (el: HTMLElement) => {
      let x = 0;
      let y = 0;
      let node: HTMLElement | null = el;
      while (node && node !== host) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };

    const build = () => {
      anims.forEach(a => a.cancel());
      anims = [];

      // video-1 from the first copy; video-3 from the next one, so the line
      // rolls forward between the two hand-offs.
      const cardV1 = midCards.current[IDX_V1];
      const cardV3 = midCards.current[MIDDLE.length + IDX_V3];
      if (!cardV1 || !cardV3) return;

      const F = host.getBoundingClientRect();
      if (!F.width || !F.height || !cardV1.offsetHeight || !cardV3.offsetHeight) return;

      const midPeriod = mid.offsetHeight / COPIES;
      const leftPeriod = left.offsetHeight / COPIES;
      const rightPeriod = right.offsetHeight / COPIES;

      // Place video-1 at slot 2, then video-3 at slot 3 one roll later. Both
      // shifted by whole content periods until the line's top edge is above the
      // frame, otherwise a beige void opens above it.
      let yBefore = SLOT_2 * F.height - posInHost(cardV1).y;
      let yAfter = SLOT_3 * F.height - posInHost(cardV3).y;
      while (yBefore > 0) {
        yBefore -= midPeriod;
        yAfter -= midPeriod;
      }
      const yEnd = yBefore - midPeriod;

      // Size each modal to fit wholly inside the frame and centre it, so the
      // opened page is never cropped and sits dead centre.
      const layOut = (el: HTMLImageElement, shot: Shot) => {
        const ratio = shot.w / shownH(shot);
        const w = Math.min(F.width * MODAL_FIT, F.height * MODAL_FIT * ratio);
        const h = w / ratio;
        el.style.width = `${w.toFixed(1)}px`;
        el.style.left = `${((F.width - w) / 2).toFixed(1)}px`;
        el.style.top = `${((F.height - h) / 2).toFixed(1)}px`;
        return { x: (F.width - w) / 2, y: (F.height - h) / 2, w };
      };
      const box1 = layOut(ov1, V1);
      const box2 = layOut(ov2, V3);

      /** Transform that shrinks an opened modal down onto a card's slot. */
      const collapseTo = (
        card: HTMLImageElement,
        lineY: number,
        box: { x: number; y: number; w: number }
      ) => {
        const p = posInHost(card);
        const s = card.offsetWidth / box.w;
        const dx = p.x - box.x;
        const dy = p.y + lineY - box.y;
        return `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${s.toFixed(4)})`;
      };

      // The modals overlap the roll, so during those windows they have to track
      // the line rather than sit at a fixed spot — otherwise the modal and the
      // card beneath it drift apart and you see a doubled page.
      // Where the line sits at each beat the modals pin to. These have to sit on
      // a natural ease-in-out across the roll — undershooting them makes the line
      // crawl right after video-1 lands and then lurch to catch up.
      const rollAt = (f: number) => yBefore + (yAfter - yBefore) * f;
      // The roll has not started when video-1 lands, so it lands on the line's
      // resting position — its actual slot.
      const AT_COLLAPSE_END = yBefore;
      const AT_MODAL1_GONE = rollAt(0.2);
      const AT_MODAL2_IN = rollAt(0.96);

      const open = "translate(0px, 0px) scale(1)";
      // video-1 lands squarely in slot 2, then rides the line as it fades.
      const shut1a = collapseTo(cardV1, AT_COLLAPSE_END, box1);
      const shut1b = collapseTo(cardV1, AT_MODAL1_GONE, box1);
      // video-3 is picked up in slot 3 as the roll settles.
      const shut2a = collapseTo(cardV3, AT_MODAL2_IN, box2);
      const shut2b = collapseTo(cardV3, yAfter, box2);

      const add = (a: Animation) => anims.push(a);

      // Board: hidden while a modal is open, visible for the collapse + roll.
      add(
        board.animate(
          [
            { offset: 0.0, opacity: 0 },
            { offset: 0.1, opacity: 0 },
            { offset: 0.26, opacity: 1 },
            { offset: 0.6, opacity: 1 },
            { offset: 0.72, opacity: 0 },
            { offset: 1.0, opacity: 0 },
          ],
          { duration: PERIOD_MS, iterations: Infinity, easing: "linear" }
        )
      );

      // video-1 modal: open → collapse into slot 2 → fade out while riding the
      // line, so it stays glued to the card underneath it.
      add(
        ov1.animate(
          [
            { offset: 0.0, transform: open, opacity: 1, easing: SLOW },
            { offset: B_HOLD1_END, transform: open, opacity: 1, easing: SLOW },
            { offset: B_COLLAPSE_END, transform: shut1a, opacity: 1, easing: "linear" },
            { offset: B_MODAL1_GONE, transform: shut1b, opacity: 0, easing: SLOW },
            { offset: 0.64, transform: open, opacity: 0, easing: SLOW }, // reset while hidden
            { offset: B_HOLD2_END, transform: open, opacity: 0, easing: SLOW },
            { offset: 1.0, transform: open, opacity: 1, easing: SLOW },
          ],
          { duration: PERIOD_MS, iterations: Infinity }
        )
      );

      // video-3 modal: fades in on slot 3 while the roll settles — tracking the
      // line as it does — then pops open.
      add(
        ov2.animate(
          [
            { offset: 0.0, transform: shut2a, opacity: 0, easing: "linear" },
            // easing must match the middle line's matching segment, or the modal
            // drifts off the card while it is fading in
            { offset: B_MODAL2_IN, transform: shut2a, opacity: 0, easing: EASE_OUT },
            { offset: B_ROLL_END, transform: shut2b, opacity: 1, easing: SLOW },
            { offset: B_EXPAND_END, transform: open, opacity: 1, easing: SLOW },
            { offset: B_HOLD2_END, transform: open, opacity: 1, easing: SLOW },
            { offset: 1.0, transform: open, opacity: 0, easing: SLOW },
          ],
          { duration: PERIOD_MS, iterations: Infinity }
        )
      );

      // Middle line rolls UP by one slot. The intermediate stops are the exact
      // positions the modals above are pinned to.
      add(
        mid.animate(
          [
            { offset: 0.0, transform: `translateY(${yBefore.toFixed(1)}px)`, easing: ROLL },
            // accelerate only — ROLL's flat start makes the line creep, and an
            // ease-in-out would brake again just as the linear stretch begins
            { offset: B_ROLL_START, transform: `translateY(${yBefore.toFixed(1)}px)`, easing: EASE_IN },
            { offset: B_COLLAPSE_END, transform: `translateY(${AT_COLLAPSE_END.toFixed(1)}px)`, easing: "linear" },
            { offset: B_MODAL1_GONE, transform: `translateY(${AT_MODAL1_GONE.toFixed(1)}px)`, easing: "linear" },
            { offset: B_MODAL2_IN, transform: `translateY(${AT_MODAL2_IN.toFixed(1)}px)`, easing: EASE_OUT },
            { offset: B_ROLL_END, transform: `translateY(${yAfter.toFixed(1)}px)`, easing: SLOW },
            { offset: 0.72, transform: `translateY(${yAfter.toFixed(1)}px)`, easing: SLOW },
            { offset: 1.0, transform: `translateY(${yEnd.toFixed(1)}px)`, easing: SLOW },
          ],
          { duration: PERIOD_MS, iterations: Infinity }
        )
      );

      // Outer lines roll DOWN over the same beats.
      const down = (track: HTMLDivElement, period: number) =>
        add(
          track.animate(
            [
              { offset: 0.0, transform: `translateY(${(-period).toFixed(1)}px)`, easing: ROLL },
              { offset: B_ROLL_START, transform: `translateY(${(-period).toFixed(1)}px)`, easing: EASE_IN },
              { offset: B_ROLL_END, transform: `translateY(${(-period * 0.55).toFixed(1)}px)`, easing: SLOW },
              { offset: 0.72, transform: `translateY(${(-period * 0.55).toFixed(1)}px)`, easing: SLOW },
              { offset: 1.0, transform: "translateY(0px)", easing: SLOW },
            ],
            { duration: PERIOD_MS, iterations: Infinity }
          )
        );
      down(left, leftPeriod);
      down(right, rightPeriod);
    };

    const needed = [
      midCards.current[IDX_V1],
      midCards.current[MIDDLE.length + IDX_V3],
      ov1,
      ov2,
    ].filter(Boolean) as HTMLImageElement[];
    Promise.all(
      needed.map(img =>
        img.complete && img.naturalWidth
          ? Promise.resolve()
          : new Promise<void>(res => {
              img.addEventListener("load", () => res(), { once: true });
              img.addEventListener("error", () => res(), { once: true });
            })
      )
    ).then(build);

    const ro = new ResizeObserver(() => build());
    ro.observe(host);

    return () => {
      ro.disconnect();
      anims.forEach(a => a.cancel());
    };
  }, []);

  // Pre-JS placeholder box; build() replaces left/top/width with a fitted,
  // centred box measured against the actual frame.
  const modalStyle = (s: Shot): React.CSSProperties => ({
    position: "absolute",
    left: "3%",
    top: "3%",
    width: "94%",
    aspectRatio: `${s.w} / ${shownH(s)}`,
    objectFit: "cover",
    objectPosition: "top",
    borderRadius: 12,
    boxShadow: "0 1px 0 rgba(0,0,0,.02), 0 30px 60px -28px rgba(0,0,0,.35)",
    transformOrigin: "0 0",
    willChange: "transform, opacity",
    pointerEvents: "none",
  });

  return (
    <div
      ref={hostRef}
      className={className}
      role="img"
      aria-label="Publishers and Advertisers workspaces alongside the profile-picker and workspace-picker diagrams from the re-architecture."
      style={{ position: "relative", overflow: "hidden", background: "#f5f2e5", ...style }}
    >
      <div
        ref={boardRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: BOARD_LEFT,
          width: BOARD_WIDTH,
          display: "flex",
          gap: COL_GUTTER,
          opacity: 1,
        }}
      >
        <Line shots={LEFT} basis={COL_BASIS} trackRef={el => { leftTrack.current = el; }} />
        <Line
          shots={MIDDLE}
          basis={COL_BASIS}
          trackRef={el => { midTrack.current = el; }}
          cardRef={(copy, i) => el => { midCards.current[copy * MIDDLE.length + i] = el; }}
        />
        <Line shots={RIGHT} basis={COL_BASIS} trackRef={el => { rightTrack.current = el; }} />
      </div>

      <img ref={modal1} src={V1.src} alt="" aria-hidden decoding="async" draggable={false} style={modalStyle(V1)} />
      <img ref={modal2} src={V3.src} alt="" aria-hidden decoding="async" draggable={false} style={{ ...modalStyle(V3), opacity: 0 }} />
    </div>
  );
}
